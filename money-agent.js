/* ===================================================================
   money-agent.js —— 理财课的 AI 助教
   给 learn-money*.html 共用。宿主页面调 MoneyAgent.init({...}) 注册
   自己的状态读取器和动作，其余（UI / 多轮循环 / API 调用）都在这儿。

   为什么是多轮循环而不是单轮：
   单轮时模型永远不知道自己那条动作干成了什么，就没机会补下一步。
   这里把每个动作的执行结果字符串回喂给它，它才能接着做。
   （和 vocab-ai-v5 的 agentRunLoop 同一个路子）

   API Key 复用 vocab-ai-v5 的 vocab_v5_cfg —— 同域名下 localStorage 是通的，
   他在词汇应用里配过就不用再填一遍。
=================================================================== */
(function(){
'use strict';

const CFG_KEY='money_agent_cfg';
const VOCAB_CFG='vocab_v5_cfg';      // 借用词汇应用已配好的 key
const MAX_TURNS=6;                   // 动作都是一步到位的本地操作，6 轮够

const MODELS={
  deepseek:[['deepseek-v4-flash','V4 Flash（快）'],['deepseek-v4-pro','V4 Pro（强）']],
  kimi:[['kimi-k2.6','Kimi K2.6（快）'],['kimi-k3','Kimi K3（强·慢）']],
  anthropic:[['claude-haiku-4-5-20251001','Haiku 4.5（快）'],['claude-sonnet-5','Sonnet 5（强）']],
  openai:[['gpt-5.6-luna','GPT-5.6 Luna（快）'],['gpt-5.6-terra','GPT-5.6 Terra（均衡）']],
  openrouter:[['anthropic/claude-haiku-4.5','Haiku 4.5（快）'],
              ['anthropic/claude-sonnet-5','Sonnet 5（强）'],
              ['deepseek/deepseek-chat','DeepSeek V4（便宜）']]
};
const PROV_NAME={deepseek:'DeepSeek',kimi:'Kimi',anthropic:'Claude',
                 openai:'ChatGPT',openrouter:'OpenRouter'};

let cfg={provider:'deepseek',apikey:'',models:{}};
function loadCfg(){
  try{
    const own=JSON.parse(localStorage.getItem(CFG_KEY)||'null');
    if(own&&own.apikey){cfg=Object.assign(cfg,own);return;}
    const v=JSON.parse(localStorage.getItem(VOCAB_CFG)||'null');   // 继承词汇应用的
    if(v&&v.apikey)cfg=Object.assign(cfg,{provider:v.provider,apikey:v.apikey,models:v.models||{}});
    if(own)cfg=Object.assign(cfg,own);
  }catch(e){}
}
function saveCfg(){try{localStorage.setItem(CFG_KEY,JSON.stringify(cfg));}catch(e){}}
function curModel(){
  const list=MODELS[cfg.provider]||MODELS.deepseek;
  const s=cfg.models&&cfg.models[cfg.provider];
  return (s&&list.some(m=>m[0]===s))?s:list[0][0];
}

/* ---------- API 调用（非流式，五个 provider） ---------- */
async function callAI(messages,sys,maxTokens=1200){
  if(!cfg.apikey)throw new Error('还没填 API Key');
  const p=cfg.provider;
  let url,headers,body,read;
  if(p==='anthropic'){
    url='https://api.anthropic.com/v1/messages';
    headers={'Content-Type':'application/json','x-api-key':cfg.apikey,
      'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'};
    body={model:curModel(),max_tokens:maxTokens,messages};
    if(sys)body.system=sys;
    read=d=>(d.content||[]).filter(b=>b.type==='text').map(b=>b.text).join('');
  }else{
    url = p==='deepseek' ? 'https://api.deepseek.com/v1/chat/completions'
        : p==='kimi'     ? 'https://api.moonshot.cn/v1/chat/completions'
        : p==='openai'   ? 'https://api.openai.com/v1/chat/completions'
        :                  'https://openrouter.ai/api/v1/chat/completions';
    headers={'Content-Type':'application/json','Authorization':'Bearer '+cfg.apikey};
    body={model:curModel(),messages:sys?[{role:'system',content:sys}].concat(messages):messages};
    // GPT-5.x 是推理模型：推理 token 也从额度里扣，不留余量会把答案挤没
    if(p==='openai'&&/^gpt-5/.test(curModel())){
      body.max_completion_tokens=maxTokens+6000; body.reasoning_effort='low';
    }else if(p==='openai'){ body.max_completion_tokens=maxTokens; }
    else { body.max_tokens=maxTokens; }
    if(p==='kimi')body.thinking={type:'disabled'};
    read=d=>d.choices&&d.choices[0]&&d.choices[0].message&&d.choices[0].message.content;
  }
  const ctl=new AbortController();
  const timer=setTimeout(()=>ctl.abort(),60000);
  let r,d;
  try{ r=await fetch(url,{method:'POST',headers,body:JSON.stringify(body),signal:ctl.signal}); }
  catch(e){ clearTimeout(timer);
    throw new Error(e.name==='AbortError'?'超时了，网络或服务商没响应':'连不上（'+e.message+'）'); }
  clearTimeout(timer);
  try{ d=await r.json(); }catch(e){ throw new Error('接口返回的不是 JSON，HTTP '+r.status); }
  if(!r.ok)throw new Error((d&&d.error&&d.error.message)||('接口报错 HTTP '+r.status));
  if(d.error)throw new Error(d.error.message||'接口报错');
  const t=read(d);
  if(!t)throw new Error('模型返回了空的内容');
  return t;
}

/* ---------- 宿主注册 ---------- */
let HOST=null;
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
// 只认 **加粗** 和换行，其余原样（内容来自模型，不能直接塞 innerHTML）
function rich(s){
  return esc(s).replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>').replace(/\n/g,'<br>');
}

/* ---------- UI ---------- */
let el={}, open=false, busy=false, stopWanted=false;
let history=[];      // {role, content} 给模型的
let shown=[];        // {who:'me'|'ai'|'sys', text}

function css(){
  const s=document.createElement('style');
  s.textContent=`
.ma-fab{position:fixed;right:14px;z-index:40;width:52px;height:52px;border-radius:50%;
  background:#e8a84c;color:#1a1206;border:none;font-size:22px;cursor:pointer;
  box-shadow:0 6px 20px rgba(0,0,0,.45);bottom:calc(var(--dock-h,74px) + 18px);}
.ma-bar{position:fixed;left:10px;right:10px;z-index:41;display:none;gap:9px;align-items:center;
  bottom:calc(var(--dock-h,74px) + 18px);background:#22263a;border:1px solid #e8a84c;
  border-radius:12px;padding:10px 12px;box-shadow:0 6px 20px rgba(0,0,0,.5);}
.ma-bar.on{display:flex;}
.ma-bar .t{flex:1;font-size:13px;line-height:1.5;color:#e8e9f0;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.ma-bar button{flex:0 0 auto;min-height:36px;padding:0 12px;border-radius:9px;
  border:1px solid #2e3350;background:#1a1d27;color:#8890a8;font-size:13px;font-family:inherit;}
.ma-bar button.p{background:#e8a84c;color:#1a1206;border:none;font-weight:700;}
.ma-ov{position:fixed;inset:0;z-index:60;background:rgba(8,9,13,.6);display:none;}
.ma-ov.on{display:block;}
.ma-panel{position:absolute;left:0;right:0;bottom:0;max-height:82vh;display:flex;flex-direction:column;
  background:#14161f;border-top:1px solid #2e3350;border-radius:16px 16px 0 0;}
/* dvh 会跟着软键盘缩，vh 不会 —— 不用 dvh 的话键盘一弹出对话区就被挤没 */
@supports (height:1dvh){.ma-panel{max-height:82dvh;}}
.ma-hd{display:flex;align-items:center;gap:4px;padding:10px 6px 10px 14px;
  border-bottom:1px solid #2e3350;}
/* 标题必须单行：课程全名太长会折成两行，把本来就紧的面板又吃掉一截 */
.ma-hd .ti{flex:1;min-width:0;font-size:14px;font-weight:600;color:#e8e9f0;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.ma-hd button{flex:0 0 auto;width:44px;min-height:44px;border:none;background:none;
  color:#8890a8;font-size:17px;font-family:inherit;cursor:pointer;}
.ma-msgs{flex:1;min-height:110px;overflow-y:auto;padding:12px 14px;
  display:flex;flex-direction:column;gap:10px;}
/* 设置是独占的一屏：叠在对话上面会看成两个页面糊在一起 */
.ma-panel.setting .ma-msgs,
.ma-panel.setting .ma-tips,
.ma-panel.setting .ma-in{display:none;}
.ma-m{max-width:88%;padding:10px 13px;border-radius:13px;font-size:14.5px;line-height:1.7;}
.ma-m.me{align-self:flex-end;background:#e8a84c;color:#1a1206;border-bottom-right-radius:4px;}
.ma-m.ai{align-self:flex-start;background:#22263a;color:#e8e9f0;border-bottom-left-radius:4px;}
.ma-m.ai b{color:#e8a84c;}
.ma-m.sys{align-self:center;background:none;color:#8890a8;font-size:12.5px;text-align:center;
  padding:2px 0;max-width:100%;}
.ma-m.err{align-self:center;background:rgba(232,92,92,.12);border:1px solid rgba(232,92,92,.35);
  color:#e2b5b5;font-size:13px;max-width:100%;}
.ma-tips{display:flex;flex-wrap:wrap;gap:7px;padding:0 14px 10px;}
.ma-tips button{min-height:38px;padding:0 12px;border-radius:9px;border:1px solid #2e3350;
  background:#1a1d27;color:#a8b0c8;font-size:13px;font-family:inherit;cursor:pointer;}
.ma-in{display:flex;gap:8px;padding:10px 12px 14px;border-top:1px solid #2e3350;}
.ma-in textarea{flex:1;min-height:46px;max-height:110px;resize:none;border-radius:11px;
  border:1px solid #2e3350;background:#0f1117;color:#e8e9f0;padding:12px;
  font-family:inherit;font-size:15px;line-height:1.5;}
.ma-in button{flex:0 0 auto;min-width:60px;min-height:46px;border:none;border-radius:11px;
  background:#e8a84c;color:#1a1206;font-weight:700;font-size:15px;font-family:inherit;cursor:pointer;}
.ma-in button:disabled{opacity:.35;}
.ma-set{padding:12px 14px 16px;display:none;overflow-y:auto;}
.ma-set.on{display:block;}
.ma-done{width:100%;min-height:48px;margin-top:16px;border:none;border-radius:11px;
  background:#e8a84c;color:#1a1206;font-weight:700;font-size:15px;font-family:inherit;}
.ma-set label{display:block;font-size:12px;color:#8890a8;margin:9px 0 4px;}
.ma-set select,.ma-set input{width:100%;min-height:44px;border-radius:10px;border:1px solid #2e3350;
  background:#0f1117;color:#e8e9f0;padding:0 11px;font-family:inherit;font-size:14px;}
.ma-set .note{font-size:12px;color:#8890a8;line-height:1.6;margin-top:9px;}`;
  document.head.appendChild(s);
}

function build(){
  css();
  const fab=document.createElement('button');
  fab.className='ma-fab'; fab.textContent='💬'; fab.title='问助教';
  fab.onclick=()=>show(true);
  document.body.appendChild(fab);

  const bar=document.createElement('div');
  bar.className='ma-bar';
  bar.innerHTML='<div class="t" id="maBarT"></div>'+
    '<button id="maBarStop">停止</button><button class="p" id="maBarOpen">展开</button>';
  document.body.appendChild(bar);

  const ov=document.createElement('div');
  ov.className='ma-ov';
  // 只取「第二课」这一段，全名带副标题会长到折行
  const shortName=String(HOST.lesson||'理财课').split(/\s*·\s*/)[0];
  ov.innerHTML=`<div class="ma-panel">
    <div class="ma-hd">
      <div class="ti">助教 · ${esc(shortName)}</div>
      <button id="maGear" title="设置">⚙</button>
      <button id="maClose" title="关闭">✕</button>
    </div>
    <div class="ma-set" id="maSet"></div>
    <div class="ma-msgs" id="maMsgs"></div>
    <div class="ma-tips" id="maTips"></div>
    <div class="ma-in">
      <textarea id="maIn" rows="1" placeholder="问点什么，或让我帮你调参数…"></textarea>
      <button id="maSend">发送</button>
    </div>
  </div>`;
  document.body.appendChild(ov);
  ov.addEventListener('click',e=>{if(e.target===ov)show(false);});

  el={fab,bar,ov,barT:bar.querySelector('#maBarT'),
      msgs:ov.querySelector('#maMsgs'),tips:ov.querySelector('#maTips'),
      input:ov.querySelector('#maIn'),send:ov.querySelector('#maSend'),
      set:ov.querySelector('#maSet')};

  el.panel=ov.querySelector('.ma-panel');
  ov.querySelector('#maClose').onclick=()=>{
    if(el.panel.classList.contains('setting'))toggleSet(false); else show(false);
  };
  ov.querySelector('#maGear').onclick=()=>toggleSet();
  el.send.onclick=()=>submit();
  el.input.addEventListener('keydown',e=>{
    if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();submit();}
  });
  // 键盘弹出会把面板压矮，不滚一下最后几条就看不见了
  el.input.addEventListener('focus',()=>setTimeout(scrollBottom,300));
  bar.querySelector('#maBarStop').onclick=()=>{stopWanted=true;setBar('停下了，这一轮做完就收手');};
  bar.querySelector('#maBarOpen').onclick=()=>show(true);

  renderTips();
  if(!cfg.apikey)push('sys','还没配 API Key。点右上角 ⚙ 填一个，或者去词汇应用里配过的会自动拿来用。');
  else push('sys','问概念、问这一页的数字都行，也可以直接让我帮你把滑杆调成某种情况。');
}

function renderTips(){
  const t=(HOST.suggestions||[]).map((s,i)=>'<button data-i="'+i+'">'+esc(s)+'</button>').join('');
  el.tips.innerHTML=t;
  el.tips.querySelectorAll('button').forEach(b=>
    b.onclick=()=>{el.input.value=HOST.suggestions[+b.dataset.i];submit();});
}
// 建议按钮只是开场白，聊起来之后它占的两行比对话本身还高
function updateTips(){
  el.tips.style.display=shown.some(m=>m.who==='me'||m.who==='ai')?'none':'';
}
function toggleSet(on){
  const v = on===undefined ? !el.panel.classList.contains('setting') : !!on;
  el.panel.classList.toggle('setting',v);
  el.set.classList.toggle('on',v);
  if(v)renderSet(); else scrollBottom();
}
function renderSet(){
  const provOpts=Object.keys(MODELS).map(p=>
    '<option value="'+p+'"'+(p===cfg.provider?' selected':'')+'>'+PROV_NAME[p]+'</option>').join('');
  const mdlOpts=(MODELS[cfg.provider]||[]).map(m=>
    '<option value="'+m[0]+'"'+(m[0]===curModel()?' selected':'')+'>'+esc(m[1])+'</option>').join('');
  el.set.innerHTML=
    '<label>服务商</label><select id="maProv">'+provOpts+'</select>'+
    '<label>模型</label><select id="maMdl">'+mdlOpts+'</select>'+
    '<label>API Key</label><input id="maKey" type="password" placeholder="粘贴 key" value="'+
      esc(cfg.apikey)+'">'+
    '<div class="note">Key 只存在这台手机的浏览器里，不上传别处。'+
      '和词汇应用共用同一个域名，那边配过的会自动带过来。</div>'+
    '<button class="ma-done" id="maDone">完成</button>';
  el.set.querySelector('#maDone').onclick=()=>toggleSet(false);
  el.set.querySelector('#maProv').onchange=e=>{cfg.provider=e.target.value;saveCfg();renderSet();};
  el.set.querySelector('#maMdl').onchange=e=>{
    cfg.models=cfg.models||{}; cfg.models[cfg.provider]=e.target.value; saveCfg();};
  el.set.querySelector('#maKey').oninput=e=>{cfg.apikey=e.target.value.trim();saveCfg();};
}

function show(v){
  open=v;
  el.ov.classList.toggle('on',v);
  el.fab.style.display=v?'none':'';
  if(v){el.bar.classList.remove('on');scrollBottom();setTimeout(()=>el.input.focus(),60);}
  else if(busy)el.bar.classList.add('on');
}
function setBar(t){el.barT.textContent=t;el.bar.classList.add('on');}
function push(who,text){
  shown.push({who,text});
  const d=document.createElement('div');
  d.className='ma-m '+who;
  d.innerHTML=who==='me'?esc(text):rich(text);
  el.msgs.appendChild(d);
  updateTips();
  scrollBottom();
  return d;
}
function scrollBottom(){requestAnimationFrame(()=>{el.msgs.scrollTop=el.msgs.scrollHeight;});}

/* ---------- 系统提示词 ---------- */
function sysPrompt(){
  const tools=(HOST.tools||[]).map(t=>'  - '+t.name+'：'+t.desc+
    (t.args?'　参数：'+t.args:'')).join('\n');
  return `你是一个理财入门课的助教。学生是零基础的自学开发者，不懂金融，但逻辑好、能看懂数字。

【当前页面】${HOST.lesson}
${HOST.outline||''}

【整个课程八课】
1 复利与通胀　2 风险到底是什么　3 存款/债券/股票凭什么给不同回报　4 分散
5 手续费　6 贷款真实利率　7 保险　8 把前七课变成自己的规则
（目前只做到第 ${HOST.lessonNo||1} 课，后面的还没做，别说得像已经能点开）

【你能做的动作】
${tools||'（这一页没有可执行的动作）'}

【怎么回话】
- 用中文，直接给结论，不要"这是个好问题"这类铺垫，不要长篇总结
- 学生看不懂行话，出现术语必须当场用大白话解释一次
- 页面上的真实数字在下面的【当前状态】里，**引用数字只能用那里的，绝对不要自己编**
- 不确定就说不确定。金融里很多事没有确定答案，别编一个听起来合理的
- 可以解释概念、机制、怎么算；**不要推荐具体的股票、基金或产品**，
  也不要预测涨跌。学生问了就说明为什么不给这类建议
- 回答控制在 200 字以内，除非他明确要求展开

【动作怎么用】
学生说"帮我调成…""如果…会怎样""带我看看…"这类，就用动作去改页面，让他直接看见变化，
比你用文字描述有用得多。改完页面后，用一句话说你改了什么、让他看哪里。

【回复格式】必须是纯 JSON，不要加代码块标记：
{"say":"给学生看的话","actions":[{"t":"动作名","...参数"}]}
- 不需要操作页面时，actions 写成空数组 []
- **空数组是正常的结束方式**。想说的话说完了就给空数组，不要为了凑动作而动作
- 每次执行完动作，我会把结果告诉你，你再决定下一步；确实做完了就回空数组收尾`;
}
function stateText(){
  let s='【当前状态】\n'+(HOST.getState?HOST.getState():'（无）');
  return s;
}

/* ---------- 解析模型输出 ---------- */
function parseReply(raw){
  let t=String(raw||'').trim();
  t=t.replace(/^```(?:json)?\s*/i,'').replace(/```\s*$/,'').trim();
  // 模型有时会在 JSON 前后附一句话，抠出最外层花括号
  const a=t.indexOf('{'), b=t.lastIndexOf('}');
  if(a>=0&&b>a)t=t.slice(a,b+1);
  try{
    const o=JSON.parse(t);
    return {say:String(o.say||''),actions:Array.isArray(o.actions)?o.actions:[]};
  }catch(e){
    // 解析失败就当成纯文字回答，别把整轮废掉
    return {say:String(raw||'').trim(),actions:[]};
  }
}

/* ---------- 执行动作 ----------
   必须返回结果字符串，失败也要返回：模型要靠它改参数重试。 */
function exec(a){
  const tool=(HOST.tools||[]).find(t=>t.name===a.t);
  if(!tool)return '没有叫「'+a.t+'」的动作，可用的是：'+
    (HOST.tools||[]).map(t=>t.name).join('、');
  try{
    const r=tool.run(a);
    return r==null?'done':String(r);
  }catch(e){
    return '执行失败：'+(e&&e.message?e.message:String(e));
  }
}

/* ---------- 主循环 ---------- */
async function submit(){
  const q=el.input.value.trim();
  if(!q)return;
  if(busy){push('sys','上一条还在跑，等它结束');return;}
  if(!cfg.apikey){
    push('err','还没填 API Key。点右上角 ⚙ 填一个。');
    toggleSet(true); return;
  }
  el.input.value='';
  push('me',q);
  history.push({role:'user',content:q+'\n\n'+stateText()});
  await loop();
}

async function loop(){
  busy=true; stopWanted=false;
  el.send.disabled=true;
  const thinking=push('sys','想一下…');

  try{
    for(let turn=0;turn<MAX_TURNS;turn++){
      if(stopWanted){push('sys','停下了');break;}
      let raw;
      try{ raw=await callAI(history,sysPrompt()); }
      catch(e){
        if(thinking.parentNode)thinking.remove();
        push('err',(e&&e.message)||'调用失败');
        break;
      }
      if(thinking.parentNode)thinking.remove();
      history.push({role:'assistant',content:raw});
      const {say,actions}=parseReply(raw);

      if(say)push('ai',say);

      if(!actions.length)break;                 // 空 actions 是唯一的正常出口

      // 有动作 → 让开，否则改完的页面被面板盖着，等于没改
      if(open)show(false);
      setBar(say?say.split('\n')[0]:'正在调整页面…');

      const results=[];
      for(const a of actions){
        if(stopWanted){results.push('用户按了停止，后面的动作没执行');break;}
        results.push(a.t+' → '+exec(a));
        await new Promise(r=>setTimeout(r,260));   // 让他看得见一步步在变
      }
      history.push({role:'user',content:
        '执行结果：\n'+results.join('\n')+'\n\n'+stateText()+
        '\n\n如果已经做完了，回 {"say":"…","actions":[]} 收尾。'});

      if(turn===MAX_TURNS-1)push('sys','到轮数上限了，先停在这儿');
      if(stopWanted)break;
    }
  } finally {
    busy=false;
    el.send.disabled=false;
    if(thinking.parentNode)thinking.remove();
    if(!open){
      const last=shown.filter(m=>m.who==='ai').pop();
      setBar(last?('✓ '+last.text.split('\n')[0]):'✓ 做完了');
      el.bar.querySelector('#maBarStop').style.display='none';
    }else{
      el.bar.classList.remove('on');
    }
    // 停止按钮只在跑的时候有意义，下一轮开始前恢复
    setTimeout(()=>{el.bar.querySelector('#maBarStop').style.display='';},50);
    // 历史太长会越烧越多 token，只留最近的
    if(history.length>16)history=history.slice(-16);
  }
}

/* ---------- 对外 ---------- */
window.MoneyAgent={
  init(host){
    HOST=host;
    loadCfg();
    if(document.readyState==='loading')
      document.addEventListener('DOMContentLoaded',build);
    else build();
  },
  open(){show(true);},
  // 测试钩子：打桩掉真实 API，用脚本驱动整个循环
  // （不这么做就得拿真 Key 才能验多轮/回喂/让开/上限）
  _mockAI(fn){ callAI=fn; cfg.apikey=cfg.apikey||'test'; },
  _state(){ return {busy,open,history:history.slice(),shown:shown.slice()}; }
};
})();
