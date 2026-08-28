/* elec-top.js —— 专题页 / 配套页的「返回电工课」入口（全站共用）
   2026-08-28 加的。起因：他从课程首页左下角点进考证题库，**回不来** ——
   circuit-basics / magnet-field / lab-circuit / quiz 这四个页面的顶栏里
   压根没有返回链接，只能按浏览器的后退键，而他是从首页直接点开的新标签。

   为什么不各页各写一行 <a>：这四个页面的顶栏样式各写各的（都是内联 CSS、
   没引 elec-page.css），各加一份就意味着以后改文案要改四处。
   走的是和 elec-theme.js 的 autoMount 同一个路子：
   自己找 .top → .hd → 都没有就浮在左上角。

   用法：<script src="elec-top.js"></script>
        子目录里的页面要指明首页在哪：
        <script src="../elec-top.js" data-home="../index.html"></script>
        想改文案：data-label="题库" */
(function(global){
'use strict';

const me = document.currentScript;
const HOME  = (me && me.dataset.home)  || 'index.html';
const LABEL = (me && me.dataset.label) || '电工课';

const CSS = `
.eb-home{flex:none;position:relative;display:inline-flex;align-items:center;gap:3px;
  font-size:.78rem;line-height:1;color:var(--tx3,#71808f);text-decoration:none;
  margin-right:9px;-webkit-tap-highlight-color:transparent}
.eb-home b{font-weight:400;font-size:1.05em;transform:translateY(-.5px)}
/* 视觉才 12px 高，热区靠 ::after 撑到 44 —— 和全站其它小按钮一个路子 */
.eb-home::after{content:'';position:absolute;inset:-16px -10px}
.eb-home:active{color:var(--acc,#4ea3ff)}
/* 没有顶栏可挂的页面：浮在左上角。z-index 要压过吸顶区（.stick 是 20），
   但别压过全屏覆盖层；也别和 .et-float 那颗主题钮撞（那颗在右上角） */
.eb-float{position:fixed;top:9px;left:9px;z-index:60;
  padding:8px 11px;border-radius:10px;
  background:var(--card,#141a21);border:1px solid var(--line,#252f3a);
  box-shadow:0 2px 10px rgba(0,0,0,.28)}
`;
function injectCSS(){
  if(document.getElementById('eb-css')) return;
  const st = document.createElement('style');
  st.id = 'eb-css'; st.textContent = CSS;
  (document.head || document.documentElement).appendChild(st);
}

function make(){
  const a = document.createElement('a');
  a.className = 'eb-home';
  a.href = HOME;
  a.title = '返回' + LABEL;
  a.innerHTML = '<b>‹</b>' + LABEL;
  return a;
}

function mount(){
  if(document.querySelector('.eb-home')) return;          /* 别挂两颗 */
  injectCSS();
  const top = document.querySelector('.top');
  if(top){
    /* 页面本来就有回首页的链接（c00 的 ‹、parts 的「课表」）就别再加一个 */
    if(top.querySelector('a[href$="index.html"]')) return;
    top.insertBefore(make(), top.firstChild);             /* 返回入口一律在最左 */
    return;
  }
  const hd = document.querySelector('.hd');
  if(hd){ hd.insertBefore(make(), hd.firstChild); return; }
  const a = make(); a.classList.add('eb-float');
  document.body.appendChild(a);
}

if(document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', mount);
else mount();

global.ElecTop = { mount:mount, HOME:HOME };
})(typeof window !== 'undefined' ? window : globalThis);
