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

/* ---------- 请求参数（流式和非流式共用一份，别抄两遍） ---------- */
function buildReq(messages,sys,maxTokens,stream){
  if(!cfg.apikey)throw new Error('还没填 API Key');
  const p=cfg.provider;
  let url,headers,body;
  if(p==='anthropic'){
    url='https://api.anthropic.com/v1/messages';
    headers={'Content-Type':'application/json','x-api-key':cfg.apikey,
      'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'};
    body={model:curModel(),max_tokens:maxTokens,messages};
    if(sys)body.system=sys;
  }else{
    url = p==='deepseek' ? 'https://api.deepseek.com/v1/chat/completions'
        : p==='kimi'     ? 'https://api.moonshot.cn/v1/chat/completions'
        : p==='openai'   ? 'https://api.openai.com/v1/chat/completions'
        :                  'https://openrouter.ai/api/v1/chat/completions';
    headers={'Content-Type':'application/json','Authorization':'Bearer '+cfg.apikey};
    body={model:curModel(),messages:sys?[{role:'system',content:sys}].concat(messages):messages};
    if(p==='openai'&&/^gpt-5/.test(curModel())){
      body.max_completion_tokens=maxTokens+6000; body.reasoning_effort='low';
    }else if(p==='openai'){ body.max_completion_tokens=maxTokens; }
    else { body.max_tokens=maxTokens; }
    if(p==='kimi')body.thinking={type:'disabled'};
  }
  if(stream)body.stream=true;
  return {url,headers,body};
}

/* ---------- 流式 ----------
   onText 每次收到的是**到目前为止的全文**，不是增量 —— 调用方用 `=` 不是 `+=`。
   （vocab-ai-v5 的 callAIStream 也是这个约定，两边保持一致，免得来回改时踩错） */
async function callAIStream(messages,sys,onText,maxTokens=1200){
  const {url,headers,body}=buildReq(messages,sys,maxTokens,true);
  const ctl=new AbortController();
  streamAbort=ctl;
  // 流式不能像非流式那样卡死超时：只要还在往外吐字就算活着，静默 60 秒才断
  let lastBeat=Date.now();
  const beat=setInterval(()=>{if(Date.now()-lastBeat>60000)ctl.abort();},5000);
  let acc='', got=false;
  try{
    let r;
    try{ r=await fetch(url,{method:'POST',headers,body:JSON.stringify(body),signal:ctl.signal}); }
    catch(e){ throw new Error(e.name==='AbortError'?'超时了，网络或服务商没响应'
                                                  :'连不上（'+e.message+'）'); }
    if(!r.ok){
      let msg='接口报错 HTTP '+r.status;
      try{const d=await r.json();if(d&&d.error&&d.error.message)msg=d.error.message;}catch(e){}
      throw new Error(msg);
    }
    if(!r.body||!r.body.getReader)throw Object.assign(new Error('这个环境读不了流'),{noStream:true});

    const reader=r.body.getReader(), dec=new TextDecoder();
    let buf='';
    for(;;){
      const {done,value}=await reader.read();
      if(done)break;
      lastBeat=Date.now();
      buf+=dec.decode(value,{stream:true});
      // SSE 一行一条，最后一行可能是半截，留到下一块
      const lines=buf.split('\n');
      buf=lines.pop();
      for(const raw of lines){
        const line=raw.trim();
        if(!line||line.startsWith(':')||!line.startsWith('data:'))continue;
        const payload=line.slice(5).trim();
        if(payload==='[DONE]')continue;
        let d; try{ d=JSON.parse(payload); }catch(e){ continue; }
        const piece = cfg.provider==='anthropic'
          ? (d.type==='content_block_delta'&&d.delta&&(d.delta.text||''))
          : (d.choices&&d.choices[0]&&d.choices[0].delta&&d.choices[0].delta.content);
        if(d.error)throw new Error(d.error.message||'接口报错');
        if(piece){ acc+=piece; got=true; if(onText)onText(acc); }
      }
    }
  } finally { clearInterval(beat); streamAbort=null; }
  if(!acc)throw Object.assign(new Error('模型返回了空的内容'),{noStream:!got});
  return acc;
}
let streamAbort=null;

/* 从半截 JSON 里抠出 say 已经流到哪儿了。
   模型输出的是 {"say":"…","actions":[…]}，流式拿到的是逐渐长出来的 JSON 文本，
   照原样贴屏幕上就是一堆花括号和引号。 */
function partialSay(raw){
  let t=String(raw||'').replace(/^\s*```(?:json)?\s*/i,'');
  const k=t.search(/"say"\s*:\s*"/);
  // 还没流到 say 就先别显示；模型偶尔不给 JSON 直接说人话，那就原样显示
  if(k<0)return /^\s*[{[]/.test(t)?'':t;
  let i=t.indexOf('"',t.indexOf(':',k)+1)+1;
  let out='';
  while(i<t.length){
    const c=t[i];
    if(c==='\\'){
      const n=t[i+1];
      if(n===undefined)break;              // 转义只写了一半，等下一块
      if(n==='u'){
        if(t.length<i+6)break;
        out+=String.fromCharCode(parseInt(t.slice(i+2,i+6),16)||0); i+=6; continue;
      }
      out += n==='n'?'\n' : n==='t'?'\t' : n==='r'?'' : n;
      i+=2; continue;
    }
    if(c==='"')break;                      // 闭引号，say 到头了
    out+=c; i++;
  }
  return out;
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

/* 统一入口。流式一个字都没吐出来就回退到非流式再试一次 ——
   某个 provider 不给流、或者环境读不了 body 时，不该让助教整个不能用。
   已经吐出字之后再失败，那是真的网络断了，如实报错。 */
let noStream=false;
async function ask(messages,sys,onText){
  if(mocked)return callAI(messages,sys);          // 打桩时不走网络
  if(!noStream){
    try{ return await callAIStream(messages,sys,onText); }
    catch(e){
      if(!e.noStream)throw e;
      noStream=true;                              // 这个环境/服务商不支持，以后都别试了
    }
  }
  return callAI(messages,sys);
}

/* ---------- 宿主注册 ---------- */
let HOST=null, mocked=false;
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
/* 全屏。原来是 82dvh 的底部抽屉，一半屏幕给了看不见的背景，对话区被挤得很小。
   全屏不跟「有动作就让开」冲突：那是执行时自动 show(false)，让开的时机没变。 */
.ma-ov{position:fixed;inset:0;z-index:60;background:#14161f;display:none;}
.ma-ov.on{display:block;}
.ma-panel{position:absolute;inset:0;display:flex;flex-direction:column;background:#14161f;
  padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom);}
/* dvh 会跟着软键盘缩，vh 不会 —— 不用 dvh 的话键盘一弹出输入框就被顶到屏幕外 */
@supports (height:1dvh){.ma-panel{height:100dvh;}}
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
.ma-when{align-self:center;font-size:12px;color:#6b7391;padding:4px 0 2px;}
/* 流式时跟在文字后面的光标，表示还在写 */
.ma-cur{display:inline-block;width:2px;height:15px;margin-left:2px;vertical-align:-3px;
  background:#e8a84c;animation:ma-blink 1s steps(2,start) infinite;}
@keyframes ma-blink{to{visibility:hidden;}}
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
.ma-wipe{width:100%;min-height:46px;margin-top:10px;border-radius:11px;
  border:1px solid rgba(232,92,92,.4);background:rgba(232,92,92,.1);color:#e2b5b5;
  font-size:14px;font-family:inherit;}
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
      <button id="maClose" title="收起">⌄</button>
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
  // 停止要真的掐断在飞的那次请求，否则字还在一个个往外冒，看着像没停下
  bar.querySelector('#maBarStop').onclick=()=>{
    stopWanted=true;
    if(streamAbort)try{streamAbort.abort();}catch(e){}
    setBar('停下了，这一轮做完就收手');
  };
  bar.querySelector('#maBarOpen').onclick=()=>show(true);

  renderTips();
  // 有存档就把上次聊的摆回来，没有才说开场白
  if(!loadChat())greet();
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
    '<label>这一课的对话</label>'+
    '<div class="note" style="margin-top:0">共 '+shown.filter(m=>m.who==='me'||m.who==='ai').length+
      ' 条，存在这台手机上，按课分开。切到别的课再回来还在。</div>'+
    '<button class="ma-wipe" id="maWipe">清空这一课的对话</button>'+
    '<button class="ma-done" id="maDone">完成</button>';
  el.set.querySelector('#maDone').onclick=()=>toggleSet(false);
  el.set.querySelector('#maWipe').onclick=()=>{
    if(busy){push('sys','正在跑，等它结束再清');return;}
    if(confirm('清空这一课的全部对话？清了就找不回来了。')){clearChat();toggleSet(false);}
  };
  el.set.querySelector('#maProv').onchange=e=>{cfg.provider=e.target.value;saveCfg();renderSet();};
  el.set.querySelector('#maMdl').onchange=e=>{
    cfg.models=cfg.models||{}; cfg.models[cfg.provider]=e.target.value; saveCfg();};
  el.set.querySelector('#maKey').oninput=e=>{cfg.apikey=e.target.value.trim();saveCfg();};
}

function show(v){
  open=v;
  el.ov.classList.toggle('on',v);
  el.fab.style.display=v?'none':'';
  if(v){hideBar();scrollBottom();setTimeout(()=>el.input.focus(),60);}
  else if(busy)el.bar.classList.add('on');
}
/* 完成态的条子必须会自己消失。原来做完只是把文案换成「✓ …」就一直挂在那儿，
   要重新打开面板才清得掉（show(true) 里那句 remove）—— 屏幕上留一条
   「事情早做完了」的横幅，旁边还有颗没用的「停止」。 */
let barTimer=null;
function setBar(t,done){
  clearTimeout(barTimer);
  el.barT.textContent=t;
  el.bar.classList.add('on');
  el.bar.querySelector('#maBarStop').style.display=done?'none':'';
  if(done)barTimer=setTimeout(()=>el.bar.classList.remove('on'),4500);
}
function hideBar(){clearTimeout(barTimer);el.bar.classList.remove('on');}

/* tmp=true 的不进 shown（「想一下…」那条，删 DOM 就完事，不该被存下来）。
   带 t 时间戳是为了恢复对话时插日期分隔。 */
function push(who,text,tmp){
  const m={who,text,t:Date.now()};
  const prev=shown[shown.length-1];        // 先取，push 之后取到的就是自己了
  if(!tmp)shown.push(m);
  const d=paint(m,prev,tmp);
  updateTips();
  scrollBottom();
  if(!tmp)saveChat();
  return d;
}
function paint(m,prev,noWhen){
  // 隔太久就插一条时间，不然昨天的对话和今天的接在一起看不出断层
  if(!noWhen&&(!prev||m.t-prev.t>30*60*1000)){
    const s=document.createElement('div');
    s.className='ma-when';
    s.textContent=whenText(m.t);
    el.msgs.appendChild(s);
  }
  const d=document.createElement('div');
  d.className='ma-m '+m.who;
  d.innerHTML=m.who==='me'?esc(m.text):rich(m.text);
  el.msgs.appendChild(d);
  return d;
}
function whenText(ts){
  const d=new Date(ts), now=new Date();
  const hm=String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');
  const day=x=>x.getFullYear()+'-'+x.getMonth()+'-'+x.getDate();
  if(day(d)===day(now))return hm;
  const y=new Date(now.getTime()-864e5);
  if(day(d)===day(y))return '昨天 '+hm;
  return (d.getMonth()+1)+'月'+d.getDate()+'日 '+hm;
}
function scrollBottom(){requestAnimationFrame(()=>{el.msgs.scrollTop=el.msgs.scrollHeight;});}

/* ---------- 对话存档 ----------
   按课分开存：他在第一课问的东西，切到第二课再回来还得在。
   两份都要存 —— shown 是屏幕上看到的，history 是喂模型的上下文；
   只存 shown 的话，回来接着问「那第二个呢」它根本不知道第一个是什么。 */
function chatKey(){return 'money_agent_chat_'+(HOST.lessonNo||0);}
const KEEP_SHOWN=60, KEEP_HIST=16;

/* 存 history 前把【当前状态】那一大段剥掉。
   这段是每轮现读页面拼的，存下来明天就过期了 —— 他滑杆早改了，
   模型却看着一份旧数字，还会跟新一轮带的真状态打架。留纯对话就行，
   状态每次 submit 都会重新附一份最新的。顺带也省下大半存储空间。 */
function stripState(c){
  const i=String(c).indexOf('【当前状态】');
  return i>0?String(c).slice(0,i).trim():String(c);
}
let saveTimer=null;
function saveChat(){
  clearTimeout(saveTimer);
  saveTimer=setTimeout(()=>{
    try{
      localStorage.setItem(chatKey(),JSON.stringify({
        v:1, at:Date.now(),
        shown:shown.slice(-KEEP_SHOWN),
        history:history.slice(-KEEP_HIST).map(h=>({role:h.role,content:stripState(h.content)}))
      }));
    }catch(e){ /* 配额满了就算了，对话没了总比页面崩了强 */ }
  },300);
}
function loadChat(){
  let d=null;
  try{ d=JSON.parse(localStorage.getItem(chatKey())||'null'); }catch(e){}
  if(!d||!Array.isArray(d.shown)||!d.shown.length)return false;
  shown=d.shown.filter(m=>m&&m.who&&m.text).map(m=>({who:m.who,text:m.text,t:m.t||d.at||Date.now()}));
  history=Array.isArray(d.history)?d.history.filter(h=>h&&h.role&&h.content):[];
  shown.forEach((m,i)=>paint(m,shown[i-1]));
  updateTips();
  return true;
}
function clearChat(){
  clearTimeout(saveTimer);          // 干掉在飞的那次写入，否则刚删完又被写回来
  shown=[]; history=[];
  el.msgs.innerHTML='';
  try{localStorage.removeItem(chatKey());}catch(e){}
  updateTips();
  greet();
}
/* 开场白一律 tmp —— 它是每次进来按当前有没有 Key 现生成的。
   存进档的话，等他后来配好了 Key，还会一直显示「还没配 API Key」。 */
function greet(){
  if(!cfg.apikey)push('sys','还没配 API Key。点右上角 ⚙ 填一个，或者去词汇应用里配过的会自动拿来用。',true);
  else push('sys','问概念、问这一页的数字都行，也可以直接让我帮你把滑杆调成某种情况。',true);
}

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
- 【当前状态】后面还附了他此刻屏幕上显示的讲解原文、数字块和图注。
  他说"这段话""这个图""这些数字"指的就是那些，直接照着讲，别反问他在说哪一段
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
/* 读屏。宿主的 getState 给的是滑杆值和算出来的数，
   但学生问得最多的是「这段话什么意思」「这个图什么意思」——
   指的是屏幕上那几块文字，不喂进去模型根本看不见他在指什么。
   按 class/id 抓，八课结构一样，加新课不用改这里。 */
function screenText(){
  const grab=(sel,label)=>{
    const e=document.querySelector(sel);
    if(!e)return '';
    const t=(e.innerText||'').trim().replace(/[ \t]+\n/g,'\n').replace(/\n{2,}/g,'\n');
    return t?('【'+label+'】\n'+t):'';
  };
  return [
    grab('#lessonCard','他屏幕上这一步的讲解原文（他问「这段话」指的就是这个）'),
    grab('.stats','屏幕上那几个数字块'),
    grab('.legend','图例'),
    grab('.howto','图下面的看图说明')
  ].filter(Boolean).join('\n\n');
}
function stateText(){
  const scr=screenText();
  return '【当前状态】\n'+(HOST.getState?HOST.getState():'（无）')+(scr?'\n\n'+scr:'');
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
  const thinking=push('sys','想一下…',true);   // 临时的，不进存档

  try{
    for(let turn=0;turn<MAX_TURNS;turn++){
      if(stopWanted){push('sys','停下了');break;}
      let raw;
      // 边流边显示。这个气泡是临时的（tmp），流完删掉换成正式那条 ——
      // 免得存档里留下半截文字，也免得 shown 里出现两条一样的
      let live=null;
      const onText=acc=>{
        const s=partialSay(acc);
        if(!s)return;
        if(thinking.parentNode)thinking.remove();
        if(!live)live=push('ai','',true);
        live.innerHTML=rich(s)+'<i class="ma-cur"></i>';
        scrollBottom();
      };
      try{ raw=await ask(history,sysPrompt(),onText); }
      catch(e){
        if(thinking.parentNode)thinking.remove();
        if(live)live.remove();
        push('err',(e&&e.message)||'调用失败');
        break;
      }
      if(thinking.parentNode)thinking.remove();
      if(live)live.remove();
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
      // 让开着的时候得报一声做完了，但这条会自己消失（setBar 的 done）
      const last=shown.filter(m=>m.who==='ai').pop();
      setBar(last?('✓ '+last.text.split('\n')[0]):'✓ 做完了',true);
    }else{
      hideBar();
    }
    // 历史太长会越烧越多 token，只留最近的
    if(history.length>KEEP_HIST)history=history.slice(-KEEP_HIST);
    saveChat();
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
  _mockAI(fn){ callAI=fn; mocked=true; cfg.apikey=cfg.apikey||'test'; },
  // 打桩流式：fn(messages,sys,onText) 自己决定分几块吐，用来验边流边显示
  _mockStream(fn){ callAIStream=fn; mocked=false; noStream=false;
                   cfg.apikey=cfg.apikey||'test'; },
  _partialSay(raw){ return partialSay(raw); },
  _state(){ return {busy,open,history:history.slice(),shown:shown.slice(),
                    bar:el&&el.bar.classList.contains('on')}; },
  _clear(){ clearChat(); }
};
})();
