/* 电工课 · 白天 / 夜间切换（全站共用）
   2026-08-28 加的。在这之前全站是**恒深色**，理由写在 CLAUDE.md 里：
   画布、元件、外壳是一整套，只切 HTML 那一半会让画布和页面对不上。
   所以这个模块的职责不是「改个背景色」，而是**把四套色板一起翻**：

     HTML   ← <html data-theme="light">，各页 CSS 里的 :root[data-theme="light"]
     画布    ← EC.theme()      （elec-canvas.js 的 PAL.dark / PAL.light）
     元件    ← EP.theme()      （elec-parts.js 的材质色板）
     符号    ← ESYM.theme()    （elec-symbols.js 的墨色，题库那 8 道图形题用）

   后三个都是「有就调」—— 题库页没有 EC/EP，课程页没有 ESYM，各引各的。

   用法：<head> 里 <script src="elec-theme.js"></script>（要**早**，晚了会先闪一下深色），
        DOM 好了之后 ETheme.mount(顶栏里的某个元素)。
   偏好存 localStorage 的 elec_theme，同域名下题库和课程页共用同一个值。 */
(function(global){
'use strict';

const KEY = 'elec_theme';
const DEFAULT = 'dark';          /* 默认仍是夜间 —— 他一直在用的就是这个，别一升级就换脸 */

function read(){
  try{ const v = localStorage.getItem(KEY); return (v === 'light' || v === 'dark') ? v : DEFAULT; }
  catch(e){ return DEFAULT; }    /* 隐私模式 / 禁了站点数据时 getItem 会直接抛 */
}
function write(v){ try{ localStorage.setItem(KEY, v); }catch(e){} }

let cur = read();

/* 应用到四套色板。silent=true 时不派事件（页面初始化那一次用，
   那会儿各页自己的初始化还没跑，派了也没人接） */
function apply(v, silent){
  cur = (v === 'light') ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', cur);
  if(global.EC   && EC.theme)   EC.theme(cur);
  if(global.EP   && EP.theme)   EP.theme(cur);
  if(global.ESYM && ESYM.theme) ESYM.theme(cur);
  syncBtns();
  if(silent) return;
  /* 画布那一半要重画。六节课都绑了 window 的 resize → fitAll，
     借它一用，六个模块一个字都不用改；接不到的页面自己听 elec:theme。 */
  global.dispatchEvent(new Event('resize'));
  global.dispatchEvent(new CustomEvent('elec:theme', {detail:{theme:cur}}));
}

const CSS = `
.et-btn{flex:none;display:inline-flex;align-items:center;justify-content:center;
  width:36px;height:36px;padding:0;border-radius:10px;cursor:pointer;
  background:transparent;border:1px solid var(--line,#252f3a);
  color:var(--tx2,#9fadbd);position:relative;-webkit-tap-highlight-color:transparent}
/* 视觉 36px，热区靠 ::after 撑到 44 —— 和全站其它小按钮一个路子 */
.et-btn::after{content:'';position:absolute;inset:-4px}
.et-btn:active{background:var(--card2,var(--card,#141a21))}
.et-btn svg{display:block}
/* 没有顶栏可挂的页面（首页那种）：浮在右上角。
   z-index 要压过吸顶区（.stick 是 20），但别压过全屏覆盖层 */
.et-float{position:fixed;top:9px;right:9px;z-index:60;
  background:var(--card,#141a21);box-shadow:0 2px 10px rgba(0,0,0,.28)}
`;
function injectCSS(){
  if(document.getElementById('et-css')) return;
  const st = document.createElement('style');
  st.id = 'et-css'; st.textContent = CSS;
  (document.head || document.documentElement).appendChild(st);
}

const btns = [];
function icon(){
  /* 按钮画的是**点下去会变成的那个模式**：现在是夜间就显示太阳（点了变白天） */
  const key = (cur === 'dark') ? 'sun' : 'moon';
  if(global.EI && EI.svg) return EI.svg(key, 19);
  /* 没引图标库时的退路，别让按钮变成一个空框 */
  return cur === 'dark' ? '☀' : '☾';
}
function syncBtns(){
  btns.forEach(function(b){
    b.innerHTML = icon();
    b.title = (cur === 'dark') ? '切换到白天模式' : '切换到夜间模式';
    b.setAttribute('aria-label', b.title);
  });
}

function toggle(){ const v = (cur === 'dark') ? 'light' : 'dark'; write(v); apply(v); }

/* 往 host 里塞一颗切换钮。where:'append'（默认）/'prepend' */
function mount(host, where){
  if(typeof host === 'string') host = document.querySelector(host);
  if(!host) return null;
  injectCSS();
  const b = document.createElement('button');
  b.className = 'et-btn'; b.type = 'button';
  b.addEventListener('click', toggle);
  btns.push(b);
  syncBtns();
  if(where === 'prepend') host.insertBefore(b, host.firstChild);
  else host.appendChild(b);
  return b;
}

/* ---- 立即应用一次。**必须排在所有 const 声明之后** ----
   apply() 里会调 syncBtns()，而 syncBtns 读的 `const btns` 如果还没声明，
   就是暂时性死区，整个模块当场中断，报出来是「Cannot access 'btns' before initialization」。
   （和 vocab 的 AGENT_TURNS、cube-solver 的 goHome() 同源，栽第三次了） */
apply(cur, true);

/* ---- 自动挂载 ----
   13 个页面各去改一遍 JS 太碎，所以这里自己找地方挂：
   顶栏 .top（课页/专题页）→ 首页那块 .hd → 都没有就浮在右上角。
   页面自己调过 mount() 的（比如题库，它要插在「掌握 N/537」左边）就跳过 —— 
   判据是 DOM 里已经有 .et-btn 了：DOMContentLoaded 晚于 body 末尾的同步脚本，所以这时候查得准。 */
function autoMount(){
  if(document.querySelector('.et-btn')) return;
  const top = document.querySelector('.top');
  if(top){
    const b = mount(top);
    /* 插在哪儿：优先「整本书」链接左边；再退到 .sub 前面 ——
       lab-circuit 的 .top 是 flex-wrap，而它的 .sub 是 flex:1 1 100%（独占一行），
       直接 append 的话按钮会被挤到第三行去（截图抓到的）。 */
    const anchor = top.querySelector('.bk') || top.querySelector('.sub');
    if(b && anchor) top.insertBefore(b, anchor);
    return;
  }
  const hd = document.querySelector('.hd');
  if(hd){ const b = mount(hd); if(b) b.classList.add('et-float'); return; }
  const b = mount(document.body);
  if(b) b.classList.add('et-float');
}
if(document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', autoMount);
else autoMount();

global.ETheme = {
  get:function(){ return cur; },
  set:function(v){ write(v); apply(v); },
  toggle:toggle, mount:mount, KEY:KEY
};
})(typeof window !== 'undefined' ? window : globalThis);
