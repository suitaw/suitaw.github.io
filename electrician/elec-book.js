/* elec-book.js —— 单页站运行时。
   book.html（左侧目录 + 右侧正文）和六个薄壳页 c1-N.html 都用它。

   一节的内容住在 sec/c1-N.js 里，形如 ELEC.reg({id,title,tabs,html,init})。
   这里负责：按需载入、挂载、切走时收干净。

   「收干净」是这套东西能成立的前提，两件事各有各的坑：
   - 每节尾部都有 rAF 循环。不停掉的话，翻过三节就有三个循环在后台跑，手机会烫。
     所以 EC.loop 改成返回 {stop()}，这里把句柄收集起来。
   - 每节还各有一个 window.addEventListener('resize')。它绑在 window 上，
     换 DOM 收不回来，切走后仍会触发、去摸已经卸载的 canvas。
     所以 init 期间临时拦截 addEventListener 把注册记下来，切走时统一解绑。
   两条都不改那六个模块一个字。 */
(function(global){
'use strict';

const mods   = {};      /* id -> 模块 */
const loaded = {};      /* id -> true，script 已插入过 */
let curId = null;       /* 当前挂载的节 */
let loops = [];         /* 当前节的 rAF 句柄 */
let winEvts = [];       /* 当前节注册的 window 事件 */
let hostTabs = null, hostBody = null, onSwitch = null;
let pendingId = null;   /* 声明必须早于 reg：这项目被 const/let 的暂时性死区坑过两次 */

/* ---------- 注册（模块文件末尾调用） ---------- */
function reg(m){
  mods[m.id] = m;
  if(pendingId === m.id){ const id = pendingId; pendingId = null; mount(id); }
}

/* ---------- 载入 ---------- */
function fileOf(id){
  const s = global.ElecNav && global.ElecNav.section(id);
  return s && s.f ? 'sec/' + s.f.replace(/\.html$/, '.js') : null;
}
function load(id, cb){
  if(mods[id]) return cb && cb(true);
  const src = fileOf(id);
  if(!src) return cb && cb(false);
  if(loaded[id]) return cb && cb(!!mods[id]);
  loaded[id] = true;
  const sc = document.createElement('script');
  sc.src = src;
  /* 动态 script 标签不受 file:// 的 CORS 限制，本地双击打开也能用 ——
     这是没走 fetch 载 HTML 片段的原因 */
  sc.onload  = function(){ cb && cb(!!mods[id]); };
  sc.onerror = function(){ cb && cb(false); };
  document.head.appendChild(sc);
}

/* ---------- 卸载当前节 ---------- */
function teardown(){
  loops.forEach(function(h){ try{ h && h.stop && h.stop(); }catch(e){} });
  loops = [];
  winEvts.forEach(function(a){
    try{ global.removeEventListener(a[0], a[1], a[2]); }catch(e){}
  });
  winEvts = [];
  curId = null;
}

/* 传给模块的 EC：只把 loop 换成会记账的版本，其余原样。
   模块里 init 的形参就叫 EC，同名遮蔽，所以 `= EC` 解构和裸用 `EC.xxx` 都走这份。 */
function ctx(){
  const EC = global.EC;
  const o = {};
  for(const k in EC) o[k] = EC[k];
  o.loop = function(fn){ const h = EC.loop(fn); loops.push(h); return h; };
  return o;
}

/* ---------- 挂载 ---------- */
function mount(id){
  const m = mods[id];
  if(!m || !hostBody) return false;
  teardown();

  /* tabs 和正文都换成全新节点：模块把监听器绑在 #tabs 元素本身，
     只换 innerHTML 的话旧监听器会一路累积下去 */
  const tabs = document.createElement('div');
  tabs.className = 'tabs'; tabs.id = 'tabs';
  tabs.innerHTML = m.tabs;
  hostTabs.replaceWith(tabs); hostTabs = tabs;

  const body = document.createElement('div');
  body.id = 'secBody';
  body.innerHTML = m.html;
  hostBody.replaceWith(body); hostBody = body;

  curId = id;

  const origAdd = global.addEventListener;
  global.addEventListener = function(t, f, o){
    winEvts.push([t, f, o]);
    return origAdd.call(global, t, f, o);
  };
  try{ m.init(ctx()); }
  catch(e){ console.error('[' + id + '] init 失败', e); }
  finally{ global.addEventListener = origAdd; }

  if(onSwitch) onSwitch(id, m);
  return true;
}

/* ---------- 对外：切到某一节 ---------- */
function go(id, cb){
  if(id === curId) return cb && cb(true);
  load(id, function(ok){
    if(!ok){ console.error('载不到 ' + id); return cb && cb(false); }
    if(mods[id]) mount(id); else pendingId = id;
    cb && cb(true);
  });
}

function init(opt){
  hostTabs = opt.tabs; hostBody = opt.body; onSwitch = opt.onSwitch || null;
}

global.ELEC = { reg:reg, go:go, init:init, cur:function(){ return curId; },
                mods:mods, teardown:teardown };
})(typeof window !== 'undefined' ? window : globalThis);
