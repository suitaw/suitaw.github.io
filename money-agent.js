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

/* Key 必须按 provider 分开存。
   原来只有 `apikey` 一个槽，五个服务商共用 —— 切到 Claude 还在拿 DeepSeek 的 Key 发请求，
   必然失败。（vocab-ai-v5 早就修过这个，我抄过来的时候把修复丢了。）
   `cfg.apikey` 保留成「当前 provider 那把」的镜像，其余代码照旧读它。 */
let cfg={provider:'deepseek',apikey:'',keys:{},models:{}};
function loadCfg(){
  let dirty=false;
  try{
    const own=JSON.parse(localStorage.getItem(CFG_KEY)||'null');
    if(own)cfg=Object.assign(cfg,own);
    cfg.keys=cfg.keys||{};
    // 迁移旧的单一 apikey：那会儿存的是当时选中那个 provider 的
    if(cfg.apikey&&cfg.provider&&!cfg.keys[cfg.provider]){
      cfg.keys[cfg.provider]=cfg.apikey; dirty=true;
    }
    // 缺的从词汇应用继承 —— 它那边也是按 provider 分开存的，逐个补，别整份覆盖
    const v=JSON.parse(localStorage.getItem(VOCAB_CFG)||'null');
    if(v){
      const vk=Object.assign({},v.keys||{});
      if(v.apikey&&v.provider&&!vk[v.provider])vk[v.provider]=v.apikey;
      Object.keys(vk).forEach(k=>{ if(!cfg.keys[k]&&vk[k]){cfg.keys[k]=vk[k];dirty=true;} });
      if(!own){
        if(v.provider&&MODELS[v.provider])cfg.provider=v.provider;
        if(v.models)cfg.models=Object.assign({},v.models,cfg.models);
      }
    }
  }catch(e){}
  cfg.keys=cfg.keys||{};
  cfg.apikey=cfg.keys[cfg.provider]||'';
  // 迁移/继承的结果要立刻落盘。只留在内存里的话，下次进来又得重做一遍，
  // 而词汇应用那边万一把 Key 删了，这边继承来的也就跟着没了
  if(dirty)saveCfg();
}
function saveCfg(){
  cfg.keys=cfg.keys||{};
  if(cfg.provider)cfg.keys[cfg.provider]=cfg.apikey||'';
  try{localStorage.setItem(CFG_KEY,JSON.stringify(cfg));}catch(e){}
}
function hasKey(p){return !!(cfg.keys&&cfg.keys[p]);}
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
    catch(e){
      // 连都没连上，标成 noStream 让外面用非流式再试一次。
      // 流式是一条长连接，VPN、公司代理、某些运营商会把它挡掉或掐断，
      // 而同一个接口用普通请求反而通得过。不回退的话，他看到的就是一句
      // 「连不上（Failed to fetch）」，而其实换个方式就能用
      throw Object.assign(
        new Error(e.name==='AbortError'?'超时了，网络或服务商没响应':'连不上（'+e.message+'）'),
        {noStream:true});
    }
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
.ma-hd{display:flex;flex-wrap:nowrap;align-items:center;gap:2px;padding:10px 4px 10px 14px;
  border-bottom:1px solid #2e3350;}
/* 标题必须单行：课程全名太长会折成两行，把本来就紧的面板又吃掉一截 */
/* 别给它 display:flex —— flex 容器上的 text-overflow:ellipsis 不生效，
   标题就不缩了，320px 宽时会把右边四颗按钮挤到第二行去 */
.ma-hd .ti{flex:1;min-width:0;font-size:14px;font-weight:600;color:#e8e9f0;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer;}
.ma-hd .ti .car{font-size:11px;color:#8890a8;margin-left:4px;}
/* 标题下面滑出来的课程条：一点就切到那一课的对话。
   默认收着 —— 常驻要吃掉 48px，而他多数时候只在当前这一课里聊 */
.ma-lessons{display:none;gap:7px;padding:9px 12px;overflow-x:auto;
  border-bottom:1px solid #2e3350;background:#12141c;
  -webkit-overflow-scrolling:touch;scrollbar-width:none;}
.ma-lessons::-webkit-scrollbar{display:none;}
.ma-lessons.on{display:flex;}
.ma-lessons button{flex:0 0 auto;min-height:44px;padding:0 13px;border-radius:10px;
  border:1px solid #2e3350;background:#1a1d27;color:#a8b0c8;
  font-family:inherit;font-size:13px;white-space:nowrap;}
.ma-lessons button.on{border-color:#e8a84c;background:rgba(232,168,76,.12);color:#e8a84c;
  font-weight:600;}
.ma-lessons button.has::after{content:'';display:inline-block;width:5px;height:5px;
  border-radius:50%;background:#e8a84c;margin-left:6px;vertical-align:2px;}
.ma-lessons button.off{opacity:.34;}
.ma-hd button{flex:0 0 auto;width:40px;min-height:44px;border:none;background:none;
  color:#8890a8;font-size:17px;font-family:inherit;cursor:pointer;}
#maNewTop{font-size:20px;color:#e8a84c;}
.ma-msgs{flex:1;min-height:110px;overflow-y:auto;padding:12px 14px;
  display:flex;flex-direction:column;gap:10px;}
/* 设置和历史各自独占一屏：叠在对话上面会看成两个页面糊在一起 */
.ma-panel.setting .ma-msgs,
.ma-panel.setting .ma-tips,
.ma-panel.setting .ma-in,
.ma-panel.histing .ma-msgs,
.ma-panel.histing .ma-tips,
.ma-panel.histing .ma-in{display:none;}
.ma-hist{padding:12px 14px 16px;display:none;overflow-y:auto;flex:1;}
.ma-hist.on{display:block;}
.ma-new{width:100%;min-height:48px;border:1px dashed #4a5170;border-radius:11px;
  background:transparent;color:#e8a84c;font-size:15px;font-weight:600;font-family:inherit;
  margin-bottom:6px;}
.ma-gh{font-size:12px;color:#8890a8;margin:16px 2px 7px;}
.ma-gh i{font-style:normal;color:#e8a84c;}
.ma-hit{display:flex;align-items:center;gap:8px;min-height:56px;padding:9px 4px 9px 12px;
  margin-bottom:6px;border-radius:11px;background:#1a1d27;border:1px solid #2e3350;}
.ma-hit.on{border-color:#e8a84c;background:rgba(232,168,76,.09);}
.ma-hit .tx{flex:1;min-width:0;}
.ma-hit .t1{display:block;font-size:14px;color:#e8e9f0;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.ma-hit.on .t1{color:#e8a84c;}
.ma-hit .t2{display:block;font-size:12px;color:#6b7391;margin-top:2px;}
.ma-hit .del{flex:0 0 auto;width:44px;min-height:44px;border:none;background:none;
  color:#6b7391;font-size:15px;font-family:inherit;}
.ma-m{max-width:88%;padding:10px 13px;border-radius:13px;font-size:14.5px;line-height:1.7;}
.ma-m.me{align-self:flex-end;background:#e8a84c;color:#1a1206;border-bottom-right-radius:4px;}
.ma-m.ai{align-self:flex-start;background:#22263a;color:#e8e9f0;border-bottom-left-radius:4px;}
.ma-m.ai b{color:#e8a84c;}
.ma-m.sys{align-self:center;background:none;color:#8890a8;font-size:12.5px;text-align:center;
  padding:2px 0;max-width:100%;}
.ma-when{align-self:center;font-size:12px;color:#6b7391;padding:4px 0 2px;}
/* 翻别课的对话时顶上那条说明 */
.ma-cross{align-self:stretch;padding:10px 12px;border-radius:10px;
  background:rgba(130,170,255,.09);border:1px solid rgba(130,170,255,.3);
  font-size:12.5px;line-height:1.65;color:#a8b8dd;}
.ma-cross b{color:#c9d8ff;}
.ma-cross button{display:block;width:100%;min-height:44px;margin-top:9px;border-radius:9px;
  border:1px solid rgba(130,170,255,.45);background:rgba(130,170,255,.12);
  color:#c9d8ff;font-family:inherit;font-size:13.5px;font-weight:600;}
/* 流式时跟在文字后面的光标，表示还在写 */
.ma-cur{display:inline-block;width:2px;height:15px;margin-left:2px;vertical-align:-3px;
  background:#e8a84c;animation:ma-blink 1s steps(2,start) infinite;}
@keyframes ma-blink{to{visibility:hidden;}}
.ma-m.err{align-self:center;background:rgba(232,92,92,.12);border:1px solid rgba(232,92,92,.35);
  color:#e2b5b5;font-size:13px;max-width:100%;text-align:center;}
.ma-retry{margin-top:8px;min-height:44px;padding:0 18px;border-radius:10px;
  border:1px solid rgba(232,92,92,.5);background:rgba(232,92,92,.14);color:#ffc9c9;
  font-family:inherit;font-size:14px;font-weight:600;}
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
.ma-keyrow{display:flex;gap:8px;}
.ma-keyrow input{flex:1;min-width:0;}
.ma-keyrow button{flex:0 0 auto;min-height:44px;padding:0 14px;border-radius:10px;
  border:1px solid #2e3350;background:#22263a;color:#a8b0c8;
  font-family:inherit;font-size:13.5px;}
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
      <div class="ti" id="maTitle">助教 · ${esc(shortName)}<span class="car">▾</span></div>
      <button id="maNewTop" title="开一条新对话">＋</button>
      <button id="maHist" title="历史对话">☰</button>
      <button id="maGear" title="设置">⚙</button>
      <button id="maClose" title="收起">⌄</button>
    </div>
    <div class="ma-lessons" id="maLessons"></div>
    <div class="ma-set" id="maSet"></div>
    <div class="ma-hist" id="maHistPane"></div>
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
      set:ov.querySelector('#maSet'),hist:ov.querySelector('#maHistPane'),
      lessons:ov.querySelector('#maLessons'),title:ov.querySelector('#maTitle')};

  el.panel=ov.querySelector('.ma-panel');
  ov.querySelector('#maClose').onclick=()=>{
    if(view!=='chat')setView('chat'); else show(false);      // 先退回对话，再退才是收起
  };
  ov.querySelector('#maGear').onclick=()=>setView(view==='set'?'chat':'set');
  ov.querySelector('#maHist').onclick=()=>setView(view==='hist'?'chat':'hist');
  // 「新对话」提到标题栏。原来埋在 对话→☰历史→＋新对话 的第三级，
  // 而「重开一条」是高频动作，不该翻两层
  ov.querySelector('#maNewTop').onclick=()=>{
    if(busy){push('sys','正在跑，等它结束再开新的');return;}
    setView('chat'); newChat(); renderLessons();
  };
  el.title.onclick=()=>toggleLessons();
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
  migrate();
  /* 一次页面加载 = 一个新对话（刷新就从头开始，他要的）。
     例外是带 #chat=<id> 进来的 —— 那是从历史里点了别课的对话跳过来的。
     用完把 hash 抹掉，否则他再刷新又落回那条，「刷新＝新开」就不成立了。
     注意用 window.history：模块里的 history 是喂模型的那个数组，名字撞了。 */
  const h=(location.hash||'').match(/chat=([A-Za-z0-9_-]+)/);
  if(h){
    try{ window.history.replaceState(null,'',location.pathname+location.search); }catch(e){}
  }
  if(!(h&&openChat(h[1])))newChat();
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
/* 三个视图互斥、各自独占一屏：对话 / 设置 / 历史。
   叠在一起会看成两个页面糊在一块（设置那次已经栽过）。 */
let view='chat';
function setView(v){
  view=v;
  if(v!=='chat')toggleLessons(false);      // 进设置/历史时把课程条收起来
  el.panel.classList.toggle('setting',v==='set');
  el.panel.classList.toggle('histing',v==='hist');
  el.set.classList.toggle('on',v==='set');
  el.hist.classList.toggle('on',v==='hist');
  if(v==='set')renderSet();
  else if(v==='hist')renderHist();
  else scrollBottom();
}

/* ---------- 标题栏下面那条课程条 ----------
   点标题展开，一点就切到那一课的对话。
   原来切课得走 对话→☰历史→翻到那一课的组→点某条，三层。 */
function toggleLessons(v){
  const on = v===undefined ? !el.lessons.classList.contains('on') : !!v;
  el.lessons.classList.toggle('on',on);
  el.title.querySelector('.car').textContent=on?'▴':'▾';
  if(on){renderLessons();
    // 把当前这一课滚进视野，八课横着排，第 6 课在屏幕外
    const cur=el.lessons.querySelector('button.on');
    if(cur)cur.scrollIntoView({inline:'center',block:'nearest'});
  }
}
function renderLessons(){
  const nav=window.MoneyNav;
  const list=(nav&&nav.lessons)||[];
  const items=readIdx();
  const my=HOST.lessonNo||0;
  const here=chatLesson||my;
  el.lessons.innerHTML=list.map(L=>{
    const n=items.filter(x=>x.lesson===L.n).length;
    const cls=[ 'lesson-chip',
                L.n===here?'on':'',
                n?'has':'',
                L.f?'':'off' ].filter(Boolean).join(' ');
    return '<button class="'+cls+'" data-n="'+L.n+'" data-f="'+esc(L.f||'')+'">'+
      '第'+L.n+'课'+(n?' '+n:'')+'</button>';
  }).join('');
  el.lessons.querySelectorAll('button').forEach(b=>b.onclick=()=>{
    const n=+b.dataset.n, f=b.dataset.f;
    if(!f){push('sys','第'+n+'课还没做');return;}
    if(busy){push('sys','正在跑，等它结束再切');return;}
    // 那一课有聊过的，就地打开最近一条（跨课的话 crossBar 会说明）；
    // 一条都没有，就跳到那一课去开新的 —— 在这一页开一条挂在别课名下的空对话，
    // 问出来的东西读到的还是这一页的数字，没意义
    const mine=readIdx().filter(x=>x.lesson===n);
    if(mine.length){
      if(openChat(mine[0].id)){toggleLessons(false);setView('chat');renderLessons();}
      return;
    }
    if(n===(HOST.lessonNo||0)){newChat();toggleLessons(false);setView('chat');renderLessons();return;}
    location.href=f;
  });
}

function renderHist(){
  const items=readIdx();
  const my=HOST.lessonNo||0;
  const nav=window.MoneyNav;
  const lessonName=n=>{
    const L=nav&&nav.get?nav.get(n):null;
    return L?('第'+n+'课 · '+L.t):(n?'第'+n+'课':'其它');
  };
  // 按课分组，组内按时间倒序（items 本来就是倒序的）
  const groups=[];
  items.forEach(it=>{
    let g=groups.find(x=>x.n===it.lesson);
    if(!g){g={n:it.lesson,rows:[]};groups.push(g);}
    g.rows.push(it);
  });
  // 当前这一课排最前，其余按课号
  groups.sort((a,b)=>(a.n===my?-1:b.n===my?1:a.n-b.n));

  let html='<button class="ma-new" id="maNew">＋ 新对话</button>';
  if(!items.length){
    html+='<div class="note" style="text-align:center;padding:22px 0">还没有存下来的对话。<br>'+
          '聊过之后会自动出现在这儿，按课分开。</div>';
  }
  groups.forEach(g=>{
    html+='<div class="ma-gh">'+esc(lessonName(g.n))+(g.n===my?'　<i>当前这课</i>':'')+'</div>';
    g.rows.forEach(it=>{
      const cur=it.id===chatId;
      html+='<div class="ma-hit'+(cur?' on':'')+'" data-id="'+esc(it.id)+'" data-l="'+it.lesson+'">'+
        '<span class="tx"><span class="t1">'+esc(it.title)+'</span>'+
        '<span class="t2">'+esc(whenText(it.at))+' · '+it.n+' 条'+
        (cur?' · 正在看':(it.lesson!==my?' · 别的课':''))+'</span></span>'+
        '<button class="del" data-del="'+esc(it.id)+'" title="删掉">✕</button></div>';
    });
  });
  html+='<button class="ma-done" id="maHDone">回到对话</button>';
  el.hist.innerHTML=html;

  el.hist.querySelector('#maNew').onclick=()=>{
    if(busy){push('sys','正在跑，等它结束再开新的');setView('chat');return;}
    newChat(); setView('chat');
  };
  el.hist.querySelector('#maHDone').onclick=()=>setView('chat');
  el.hist.querySelectorAll('.ma-hit').forEach(row=>{
    row.onclick=e=>{
      if(e.target.closest('[data-del]'))return;              // 点的是删除
      if(busy){push('sys','正在跑，等它结束再切');setView('chat');return;}
      const id=row.dataset.id, l=+row.dataset.l;
      if(id===chatId){setView('chat');return;}
      // 别课的对话也**就地打开**，不再硬跳页面 —— 翻记录是高频动作，
      // 为了看一眼旧对话就整页刷新太重。但接着聊会读到这一页的数字，
      // 所以顶上挂一条提醒 + 一颗「去那一课」，见 crossBar()
      if(openChat(id))setView('chat');
    };
  });
  el.hist.querySelectorAll('[data-del]').forEach(b=>{
    b.onclick=e=>{
      e.stopPropagation();
      const id=b.dataset.del;
      if(busy&&id===chatId){push('sys','这条正在跑，等它结束再删');return;}
      if(confirm('删掉这条对话？删了找不回来。')){dropChat(id);renderHist();}
    };
  });
}
let keyShown=false;
/* 填完 Key 要就地更新「哪个配过」和「存了几把」。
   整块重绘会把输入框的光标弄丢，所以只改这两处的文字。 */
function refreshKeyHints(){
  const sel=el.set.querySelector('#maProv');
  if(sel)[...sel.options].forEach(o=>{
    o.textContent=PROV_NAME[o.value]+(hasKey(o.value)?'　✓ 已配':'　（没配 Key）');
  });
  const n=el.set.querySelector('#maKeyN');
  if(n)n.textContent=Object.keys(cfg.keys||{}).filter(k=>cfg.keys[k]).length;
}
function renderSet(){
  // 下拉里直接标出哪个服务商配过 Key —— 不标的话，切过去发一条才发现没配
  const provOpts=Object.keys(MODELS).map(p=>
    '<option value="'+p+'"'+(p===cfg.provider?' selected':'')+'>'+
    PROV_NAME[p]+(hasKey(p)?'　✓ 已配':'　（没配 Key）')+'</option>').join('');
  const mdlOpts=(MODELS[cfg.provider]||[]).map(m=>
    '<option value="'+m[0]+'"'+(m[0]===curModel()?' selected':'')+'>'+esc(m[1])+'</option>').join('');
  const nk=Object.keys(cfg.keys||{}).filter(k=>cfg.keys[k]).length;
  el.set.innerHTML=
    '<label>服务商</label><select id="maProv">'+provOpts+'</select>'+
    '<label>模型</label><select id="maMdl">'+mdlOpts+'</select>'+
    '<label>'+PROV_NAME[cfg.provider]+' 的 API Key</label>'+
    '<div class="ma-keyrow">'+
      '<input id="maKey" type="'+(keyShown?'text':'password')+'" placeholder="粘贴 key" '+
      'autocomplete="off" spellcheck="false" value="'+esc(cfg.apikey)+'">'+
      '<button id="maEye" type="button">'+(keyShown?'隐藏':'显示')+'</button>'+
    '</div>'+
    '<div class="note"><b style="color:#a8b0c8">每个服务商各存一把 Key</b>，'+
      '换服务商会自动带出它自己那把（现在存了 <b id="maKeyN" style="color:#a8b0c8">'+
      nk+'</b> 把）。<br>'+
      'Key 只存在这台手机的浏览器里，不上传别处。'+
      '和词汇应用共用同一个域名，那边配过的会自动带过来。</div>'+
    '<label>对话记录</label>'+
    '<div class="note" style="margin-top:0">当前这条对话 '+countMsg(shown)+' 句，一共存了 '+
      readIdx().length+' 条对话，都在这台手机上。点标题栏的 ☰ 翻历史、新开、删除。</div>'+
    '<button class="ma-wipe" id="maWipe">删掉全部对话记录</button>'+
    '<button class="ma-done" id="maDone">完成</button>';
  el.set.querySelector('#maDone').onclick=()=>setView('chat');
  el.set.querySelector('#maWipe').onclick=()=>{
    if(busy){push('sys','正在跑，等它结束再删');return;}
    if(confirm('删掉全部 '+readIdx().length+' 条对话记录？删了找不回来。')){
      readIdx().forEach(it=>{try{localStorage.removeItem(ITEM_KEY(it.id));}catch(e){}});
      writeIdx([]);
      newChat(); setView('chat');
    }
  };
  el.set.querySelector('#maProv').onchange=e=>{
    // 顺序要紧：先把手上这把存回它原来的槽，再换 provider，再带出新的那把。
    // 直接 saveCfg() 的话，会把旧服务商的 Key 写进新服务商的槽里
    cfg.keys=cfg.keys||{};
    cfg.keys[cfg.provider]=cfg.apikey||'';
    cfg.provider=e.target.value;
    cfg.apikey=cfg.keys[cfg.provider]||'';
    saveCfg(); renderSet();
  };
  el.set.querySelector('#maMdl').onchange=e=>{
    cfg.models=cfg.models||{}; cfg.models[cfg.provider]=e.target.value; saveCfg();};
  el.set.querySelector('#maKey').oninput=e=>{
    cfg.apikey=e.target.value.trim(); saveCfg();
    refreshKeyHints();     // 不能整块重绘 —— 那样光标会跳没
  };
  el.set.querySelector('#maEye').onclick=()=>{
    // 只切 type，不重画整块 —— 重画会把光标和已选中的文字弄丢
    keyShown=!keyShown;
    const i=el.set.querySelector('#maKey');
    i.type=keyShown?'text':'password';
    el.set.querySelector('#maEye').textContent=keyShown?'隐藏':'显示';
  };
}

function show(v){
  open=v;
  el.ov.classList.toggle('on',v);
  el.fab.style.display=v?'none':'';
  // 打开时**不要** focus 输入框：手机上一进来软键盘就弹出来占掉半屏，
  // 而他多半是先来看之前聊的内容。要打字自己点输入框就行
  if(v){hideBar();scrollBottom();}
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

/* 出错就地挂一颗「重试」。原来报了错那条就死在那儿，他得把问题重新打一遍 ——
   而断网、Key 一时抽风、服务商 503 这些，重试一下多半就过去了。
   err 走 tmp（不入档）：重试成功之后，存档里不该留着一条失败记录。
   history 的最后一条还是他那个问题，所以直接再跑一遍 loop 就行。 */
function pushErr(msg,retryable){
  const d=push('err',msg,true);
  if(retryable){
    const b=document.createElement('button');
    b.className='ma-retry';
    b.textContent='重试';
    b.onclick=()=>{ if(busy)return; d.remove(); loop(); };
    d.appendChild(document.createElement('br'));
    d.appendChild(b);
  }
  return d;
}

/* ---------- 对话存档（多会话） ----------
   一次页面加载 = 一个新对话（他要的：刷新就从头开始）；
   面板收起再打开还是当前这个（内存里没变，天然成立）。
   旧的都在「☰ 历史」里点得回来，按课分组。

   **空对话不落盘** 是这套规则能成立的前提：手机上切页面、被系统回收重载
   都会走一次「新开」，不拦住的话历史里会攒出一堆空壳。所以 id 是
   第一条真消息发出时才分配的。

   两份都要存 —— shown 是屏幕上看到的，history 是喂模型的上下文；
   只存 shown 的话，回来接着问「那第二个呢」它根本不知道第一个是什么。 */
const IDX_KEY='money_agent_chats';
const ITEM_KEY=id=>'money_agent_chat_v2_'+id;
const KEEP_SHOWN=60, KEEP_HIST=16, MAX_CHATS=40;
let chatId=null;

function readIdx(){
  try{const d=JSON.parse(localStorage.getItem(IDX_KEY)||'null');
    if(d&&d.v===2&&Array.isArray(d.items))return d.items;}catch(e){}
  return [];
}
function writeIdx(items){
  try{localStorage.setItem(IDX_KEY,JSON.stringify({v:2,items}));}catch(e){}
}
function titleOf(list){
  const m=(list||[]).find(x=>x.who==='me');
  const t=m?String(m.text).replace(/\s+/g,' ').trim():'（还没说话）';
  return t.length>18?t.slice(0,18)+'…':t;
}
const countMsg=list=>(list||[]).filter(m=>m.who==='me'||m.who==='ai').length;

/* 旧版是一课一条固定 key（money_agent_chat_<课号>）。搬进新结构，
   别让他已经聊过的记录凭空消失。搬完删掉旧 key，只跑这一次。 */
function migrate(){
  if(localStorage.getItem(IDX_KEY))return;
  const items=[];
  for(let n=1;n<=8;n++){
    const k='money_agent_chat_'+n;
    let d=null; try{ d=JSON.parse(localStorage.getItem(k)||'null'); }catch(e){}
    if(!d||!Array.isArray(d.shown)||!countMsg(d.shown)){
      try{localStorage.removeItem(k);}catch(e){}
      continue;
    }
    const id='m'+n, at=d.at||Date.now();
    try{
      localStorage.setItem(ITEM_KEY(id),JSON.stringify({
        id,lesson:n,at,shown:d.shown,history:d.history||[]}));
      localStorage.removeItem(k);
      items.push({id,lesson:n,at,title:titleOf(d.shown),n:countMsg(d.shown)});
    }catch(e){}
  }
  writeIdx(items.sort((a,b)=>b.at-a.at));
}

/* 存 history 前把【当前状态】那一大段剥掉。
   这段是每轮现读页面拼的，存下来明天就过期了 —— 他滑杆早改了，
   模型却看着一份旧数字，还会跟新一轮带的真状态打架。留纯对话就行，
   状态每次 submit 都会重新附一份最新的。顺带也省下大半存储空间。 */
function stripState(c){
  const i=String(c).indexOf('【当前状态】');
  return i>0?String(c).slice(0,i).trim():String(c);
}
let saveTimer=null;
function saveChat(){ clearTimeout(saveTimer); saveTimer=setTimeout(doSave,300); }
function doSave(){
  const n=countMsg(shown);
  if(!n)return;                          // 空对话不落盘，见上面那段注释
  if(!chatId)chatId='c'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
  // 归哪一课看它从哪一课开起的，不看现在停在哪一页 ——
  // 否则他在第三课翻开第一课那条聊两句，它就从第一课组里消失了
  const lesson=chatLesson||HOST.lessonNo||0, at=Date.now();
  try{
    localStorage.setItem(ITEM_KEY(chatId),JSON.stringify({
      id:chatId, lesson, at,
      shown:shown.slice(-KEEP_SHOWN),
      history:history.slice(-KEEP_HIST).map(h=>({role:h.role,content:stripState(h.content)}))
    }));
  }catch(e){ return; }                   // 配额满了就算了，对话没了总比页面崩了强
  const items=readIdx().filter(x=>x.id!==chatId);
  items.unshift({id:chatId,lesson,at,title:titleOf(shown),n});
  items.sort((a,b)=>b.at-a.at);
  while(items.length>MAX_CHATS){
    const gone=items.pop();
    try{localStorage.removeItem(ITEM_KEY(gone.id));}catch(e){}
  }
  writeIdx(items);
  // 课程条开着的时候，上面那个条数得跟着变，不然刚聊完的这条不算数
  if(el&&el.lessons&&el.lessons.classList.contains('on'))renderLessons();
}
function openChat(id){
  let d=null; try{ d=JSON.parse(localStorage.getItem(ITEM_KEY(id))||'null'); }catch(e){}
  if(!d||!Array.isArray(d.shown))return false;
  clearTimeout(saveTimer);
  chatId=id;
  chatLesson=d.lesson||0;
  shown=d.shown.filter(m=>m&&m.who&&m.text)
               .map(m=>({who:m.who,text:m.text,t:m.t||d.at||Date.now()}));
  history=Array.isArray(d.history)?d.history.filter(h=>h&&h.role&&h.content):[];
  el.msgs.innerHTML='';
  crossBar();
  shown.forEach((m,i)=>paint(m,shown[i-1]));
  updateTips(); scrollBottom();
  return true;
}
/* 打开的是别课的对话时，顶上挂一条说明。
   不挂的话会出一件很怪的事：他接着问「这个数怎么算的」，
   而助教读到的是**当前这一页**的数字，答的却是另一课的问题。 */
function crossBar(){
  const old=el.msgs.querySelector('.ma-cross');
  if(old)old.remove();
  const my=HOST.lessonNo||0;
  if(!chatLesson||chatLesson===my)return;
  const nav=window.MoneyNav;
  const L=nav&&nav.get?nav.get(chatLesson):null;
  const name=L?('第'+chatLesson+'课 · '+L.t):('第'+chatLesson+'课');
  const d=document.createElement('div');
  d.className='ma-cross';
  d.innerHTML='<span>这是<b>'+esc(name)+'</b>的对话。看没问题，'+
    '但在这一页接着问，我读到的是<b>第'+my+'课</b>的数字。</span>'+
    (L&&L.f?'<button id="maGoLesson">去'+esc(name.split(' · ')[0])+'接着聊</button>':'');
  el.msgs.appendChild(d);
  const b=d.querySelector('#maGoLesson');
  if(b)b.onclick=()=>{ location.href=L.f+'#chat='+encodeURIComponent(chatId); };
}
let chatLesson=0;
function newChat(){
  clearTimeout(saveTimer);              // 干掉在飞的那次写入，否则会写到新对话名下
  chatId=null; chatLesson=HOST.lessonNo||0; shown=[]; history=[];
  el.msgs.innerHTML='';
  updateTips();
  greet();
}
function dropChat(id){
  try{localStorage.removeItem(ITEM_KEY(id));}catch(e){}
  writeIdx(readIdx().filter(x=>x.id!==id));
  if(id===chatId)newChat();
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
    setView('set'); return;
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
        pushErr((e&&e.message)||'调用失败',true);
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
  _clear(){ newChat(); },
  _chatId(){ return chatId; },
  _idx(){ return readIdx(); },
  _open(id){ return openChat(id); }
};
})();
