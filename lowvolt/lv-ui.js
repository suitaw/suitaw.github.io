/* lv-ui.js —— 页面运行时
   解决的是他提的那件事：「不能光看文字，然后看不到图」。

   三条路都通向同一张图（数据只有 lv-figs.js 那一份）：
   ① 正文流里 <div data-figbox="1-21"></div> → 就地铺一张完整图卡
   ② 正文行内 <a data-fig="1-21">图 1-21</a> → 变芯片，点一下图从底部滑出来，不用滚走
   ③ 图卡右下「放大」/ 面板里「放大」→ 全屏，可横向拖着看细节

   另外两件：
   - <div data-symlib></div> → 铺出 77 个电气符号，带搜索（表1-2 照抄成表格没法在手机上看）
   - h2.h-cn 自动折叠，默认只展开第一块（第二节有 11 页，一路滚到底太累）
*/
(function (global) {
'use strict';

var FIGS = global.LV_FIGS || {};

function el(tag, cls, html){
  var d=document.createElement(tag);
  if(cls) d.className=cls;
  if(html!=null) d.innerHTML=html;
  return d;
}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){
  return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}

/* ══════════ ① 正文流里的图卡 ══════════ */
function renderFigBoxes(){
  var boxes=document.querySelectorAll('[data-figbox]');
  Array.prototype.forEach.call(boxes,function(box){
    var id=box.getAttribute('data-figbox'), f=FIGS[id];
    if(!f){ box.innerHTML='<p style="color:var(--red)">缺图：'+esc(id)+'</p>'; return; }
    var fig=el('figure','fig');
    fig.id='fig-'+id;
    fig.innerHTML=
      '<div class="canvas">'+f.s+'</div>'+
      '<figcaption><span class="fignum">图 '+esc(f.n)+'</span>'+
      '<span class="ft">'+esc(f.t)+'</span>'+
      '<button class="fig-zoom" type="button" data-zoom="'+esc(id)+'">放大 ⤢</button></figcaption>'+
      (f.r ? '<div class="fig-read"><b>怎么看这张图：</b>'+f.r+'</div>' : '');
    box.parentNode.replaceChild(fig,box);
  });
}

/* ══════════ ② 行内图号芯片 ══════════ */
function markRefs(){
  var refs=document.querySelectorAll('[data-fig]');
  Array.prototype.forEach.call(refs,function(a){
    if(a.classList.contains('figref')) return;
    a.classList.add('figref');
    a.setAttribute('role','button');
    a.setAttribute('tabindex','0');
    if(!a.querySelector('.ic')) a.insertAdjacentHTML('beforeend','<span class="ic">◱</span>');
  });
}

/* ══════════ 底部滑出图板 ══════════ */
var sheet, sheetCur=null;
function ensureSheet(){
  if(sheet) return sheet;
  sheet=el('div','fs');
  sheet.innerHTML='<div class="panel">'+
    '<div class="hd"><span class="fignum" data-role="num"></span>'+
    '<span class="ft" data-role="title"></span>'+
    '<button class="x" type="button" data-role="close">关闭</button></div>'+
    '<div class="body"><div class="canvas" data-role="canvas"></div>'+
    '<div class="fig-read" data-role="read"></div>'+
    '<div class="foldbar" style="margin-top:14px">'+
    '<button type="button" data-role="zoom">放大看 ⤢</button>'+
    '<button type="button" data-role="goto">在正文中定位</button>'+
    '</div></div></div>';
  document.body.appendChild(sheet);
  sheet.addEventListener('click',function(e){
    if(e.target===sheet || e.target.closest('[data-role="close"]')){ closeSheet(); return; }
    if(e.target.closest('[data-role="zoom"]')){ openZoom(sheetCur); return; }
    if(e.target.closest('[data-role="goto"]')){
      var id=sheetCur; closeSheet();
      var target=document.getElementById('fig-'+id);
      if(target){
        /* 图可能埋在两层折叠里，所有祖先都要打开 */
        openAncestors(target);
        setTimeout(function(){ target.scrollIntoView({block:'center',behavior:'smooth'}); },60);
      }
    }
  });
  return sheet;
}
function openSheet(id){
  var f=FIGS[id]; if(!f) return;
  var s=ensureSheet();
  sheetCur=id;
  s.querySelector('[data-role="num"]').textContent='图 '+f.n;
  s.querySelector('[data-role="title"]').textContent=f.t;
  s.querySelector('[data-role="canvas"]').innerHTML=f.s;
  var rd=s.querySelector('[data-role="read"]');
  if(f.r){ rd.innerHTML='<b>怎么看这张图：</b>'+f.r; rd.style.display=''; }
  else rd.style.display='none';
  /* 正文里没有这张图卡时，「在正文中定位」没意义，藏掉 */
  s.querySelector('[data-role="goto"]').style.display =
    document.getElementById('fig-'+id) ? '' : 'none';
  s.classList.add('on');
  document.body.style.overflow='hidden';
}
function closeSheet(){
  if(!sheet) return;
  sheet.classList.remove('on');
  if(!zoom || !zoom.classList.contains('on')) document.body.style.overflow='';
}

/* ══════════ ③ 全屏放大 ══════════ */
var zoom;
function ensureZoom(){
  if(zoom) return zoom;
  zoom=el('div','zm');
  zoom.innerHTML='<div class="zhd"><span class="fignum" data-role="num"></span>'+
    '<span class="ft" data-role="title"></span>'+
    '<button class="x" type="button" data-role="zclose">关闭</button></div>'+
    '<div class="zbody" data-role="zbody"></div>'+
    '<div class="tip">图比屏幕宽时可以左右拖动</div>';
  document.body.appendChild(zoom);
  zoom.addEventListener('click',function(e){
    if(e.target.closest('[data-role="zclose"]')) closeZoom();
  });
  return zoom;
}
function openZoom(id){
  var f=FIGS[id]; if(!f) return;
  var z=ensureZoom();
  z.querySelector('[data-role="num"]').textContent='图 '+f.n;
  z.querySelector('[data-role="title"]').textContent=f.t;
  /* 放大：撑到 1.5 倍视口宽。
     第一版用 1.9 倍 + 滚到中间，截图一看图 1-21 只剩中间一截、电池和灯泡都在屏外，
     反而不如不放大。1.5 倍 + 从最左边开始看，拖一下就到头。 */
  var body=z.querySelector('[data-role="zbody"]');
  body.innerHTML=f.s;
  var svg=body.querySelector('svg');
  if(svg){
    var vb=(svg.getAttribute('viewBox')||'0 0 100 100').split(/\s+/);
    var w=parseFloat(vb[2])||100, h=parseFloat(vb[3])||100;
    var target=Math.max(window.innerWidth*1.5, 540);
    svg.setAttribute('width', Math.round(target));
    svg.setAttribute('height', Math.round(target*h/w));
    svg.style.maxWidth='none';
  }
  z.classList.add('on');
  document.body.style.overflow='hidden';
  body.scrollLeft=0;
}
function closeZoom(){
  if(!zoom) return;
  zoom.classList.remove('on');
  if(!sheet || !sheet.classList.contains('on')) document.body.style.overflow='';
}

/* ══════════ ④ 符号库 ══════════ */
function renderSymLib(){
  var host=document.querySelector('[data-symlib]');
  if(!host) return;
  var SYMS=global.LV_SYMS||[], G=global.LV_SYM_GROUPS||{};
  if(!SYMS.length){ host.innerHTML='<p style="color:var(--red)">符号库没载入</p>'; return; }

  var bar=el('div','symbar');
  bar.innerHTML='<input type="search" placeholder="搜符号：常开 / KM / 接触器 / 熔断器…" '+
    'aria-label="搜索电气符号"><span class="cnt"></span>';
  var grid=el('div','symgrid');

  var cards=SYMS.map(function(x){
    var d=el('div','sym');
    d.innerHTML='<div class="pic">'+x.s+'</div>'+
      '<div class="nm">'+esc(x.n)+'</div>'+
      (x.t ? '<div class="lt">'+esc(x.t)+'</div>' : '<div class="lt none">无文字符号</div>');
    /* 搜索用的索引串：名称 + 文字符号 + 关键词 + 组名 */
    d._idx=(x.n+' '+(x.t||'')+' '+(x.k||'')+' '+(G[x.g]||'')).toLowerCase();
    grid.appendChild(d);
    return d;
  });
  var empty=el('div','symempty','没找到这个符号，换个说法试试（比如搜「常闭」「KT」「延时」）');
  empty.style.display='none';
  grid.appendChild(empty);

  var cnt=bar.querySelector('.cnt');
  function apply(q){
    q=(q||'').trim().toLowerCase();
    var hit=0;
    cards.forEach(function(d){
      var ok = !q || d._idx.indexOf(q)>=0;
      d.classList.toggle('hide',!ok);
      if(ok) hit++;
    });
    empty.style.display = hit ? 'none' : '';
    cnt.textContent = q ? hit+'/'+cards.length : cards.length+' 个';
  }
  bar.querySelector('input').addEventListener('input',function(e){apply(e.target.value);});
  apply('');

  host.appendChild(bar);
  host.appendChild(grid);
  host.removeAttribute('data-symlib');
}

/* ══════════ ⑤ 折叠：两级 ══════════
   他的原话：「把知识点分得细一点，比如说第一节电路的组成及其应用、
   第二节那个电路图啥的，把它分得细一点，可折叠」。
   所以外层按「一、二、三」折，每一块里面再按「1. 2.」折第二层。
   每个折叠条下面列出它里面有什么（下一级的标题），不点开也知道里面装的啥。 */

function isH2(e){ return e.nodeType===1 && e.tagName==='H2' && e.classList.contains('h-cn'); }
function isH3(e){ return e.nodeType===1 && e.tagName==='H3' && e.classList.contains('h-num'); }
function isH4(e){ return e.nodeType===1 && e.tagName==='H4' && e.classList.contains('h-par'); }

/* 把 container 的直接子元素按 isHead 切成若干折叠块 */
function wrapFolds(container, isHead, cls, minCount){
  var hs=Array.prototype.slice.call(container.children).filter(isHead);
  if(hs.length<minCount) return [];
  var made=[];
  hs.forEach(function(h,i){
    var d=el('details',cls);
    var sm=el('summary','',
      '<span class="fc">▶</span>'+
      '<span class="ft"><span class="ft-t"></span></span>'+
      '<span class="fn">'+(i+1)+'/'+hs.length+'</span>');
    sm.querySelector('.ft-t').textContent=h.textContent;
    d.appendChild(sm);
    var body=el('div','fold-body');
    d.appendChild(body);
    if(h.id) d.id=h.id;
    h.parentNode.insertBefore(d,h);
    var n=h.nextSibling;
    h.parentNode.removeChild(h);
    while(n){
      var next=n.nextSibling;
      if(isHead(n)) break;
      body.appendChild(n);
      n=next;
    }
    made.push(d);
  });
  return made;
}

/* 折叠条的副标题：列出它里面下一级的标题，如「(1) 电源 · (2) 负载 · …」 */
function addPreview(d){
  var body=d.querySelector('.fold-body');
  if(!body) return;
  var kids=Array.prototype.slice.call(body.children);
  var names=kids.filter(isH3).map(function(h){return h.textContent.replace(/^\d+\.\s*/,'');});
  if(!names.length) names=kids.filter(isH4).map(function(h){return h.textContent;});
  /* 已经折过的第二层：从它们的标题里取 */
  if(!names.length){
    names=kids.filter(function(e){return e.classList&&e.classList.contains('fold-in');})
      .map(function(f){
        var t=f.querySelector('.ft-t');
        return t?t.textContent.replace(/^\d+\.\s*/,''):'';
      }).filter(Boolean);
  }
  var txt='';
  if(names.length>=2) txt=names.join(' · ');
  else {
    /* 没有小标题的块（如「2. 电路图」），就报里面有哪些图 / 有没有符号库，
       让折叠条始终能告诉他里面装的是什么 */
    var figs=Array.prototype.map.call(d.querySelectorAll('.fold-body figure.fig .fignum'),
      function(n){return n.textContent.trim();});
    var bits=[];
    if(figs.length) bits.push('含 '+figs.join('、'));
    if(d.querySelector('.fold-body .symgrid')) bits.push('77 个电气符号，可搜索');
    if(d.querySelector('.fold-body table')) bits.push('含表格');
    txt=bits.join(' · ');
  }
  if(!txt) return;
  var s=el('span','ft-s', esc(txt));
  d.querySelector('.ft').appendChild(s);
}

function makeFolds(){
  var sec=document.querySelector('.section');
  if(!sec) return;

  var outer=wrapFolds(sec, isH2, 'fold', 2);
  if(!outer.length) return;

  outer.forEach(function(d,i){
    var body=d.querySelector('.fold-body');
    var inner=wrapFolds(body, isH3, 'fold fold-in', 2);
    inner.forEach(function(f){ addPreview(f); f.open=false; });
    addPreview(d);
    /* 外层默认只展开第一块——一进来看到的是骨架，不是一片空白也不是一堵墙 */
    d.open = (i===0);
  });

  var first=sec.querySelector('.fold');
  if(first){
    var bar=el('div','foldbar',
      '<button type="button" data-fold="open">展开全部</button>'+
      '<button type="button" data-fold="close">收起全部</button>');
    sec.insertBefore(bar,first);
    bar.addEventListener('click',function(e){
      var b=e.target.closest('button[data-fold]'); if(!b) return;
      var on=b.getAttribute('data-fold')==='open';
      sec.querySelectorAll('details.fold').forEach(function(d){d.open=on;});
    });
  }
}

/* 目标可能嵌在两层折叠里，得把所有祖先都打开 */
function openAncestors(node){
  var p=node;
  while(p && p!==document.body){
    if(p.tagName==='DETAILS') p.open=true;
    p=p.parentElement;
  }
}

/* ══════════ 事件委托（折叠后 DOM 会搬家，所以绑在 document 上）══════════ */
function bind(){
  document.addEventListener('click',function(e){
    var ref=e.target.closest('[data-fig]');
    if(ref){ e.preventDefault(); openSheet(ref.getAttribute('data-fig')); return; }
    var z=e.target.closest('[data-zoom]');
    if(z){ e.preventDefault(); openZoom(z.getAttribute('data-zoom')); return; }
    /* 页内锚点：目标可能躺在收起的折叠块里，跳过去会是一条收起的标题，先展开 */
    var a=e.target.closest('a[href^="#"]');
    if(a){
      var id=a.getAttribute('href').slice(1);
      if(!id) return;
      var target=document.getElementById(id);
      if(!target) return;
      e.preventDefault();
      openAncestors(target);
      setTimeout(function(){ target.scrollIntoView({block:'start',behavior:'smooth'}); },50);
    }
  });
  /* 芯片是 <a role=button>，键盘也要能开 */
  document.addEventListener('keydown',function(e){
    if(e.key==='Enter'||e.key===' '){
      var ref=document.activeElement && document.activeElement.closest &&
              document.activeElement.closest('[data-fig]');
      if(ref){ e.preventDefault(); openSheet(ref.getAttribute('data-fig')); }
    }
    if(e.key==='Escape'){
      if(zoom&&zoom.classList.contains('on')) closeZoom();
      else if(sheet&&sheet.classList.contains('on')) closeSheet();
    }
  });
}

function init(){
  renderFigBoxes();   /* 先铺图卡，folds 会把它们搬进折叠块 */
  markRefs();
  renderSymLib();
  makeFolds();
  bind();
  global.LVUI={openFig:openSheet, zoomFig:openZoom, figs:FIGS};
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
else init();
})(window);
