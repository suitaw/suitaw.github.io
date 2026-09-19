/* lv-book.js —— 全书目录（唯一真相）+ 顶栏目录抽屉
   页码来自书前目录页照片（2026-09-19 从 6 张目录照读的）。
   `结束页` 是下一节起页 −1，是估算值，做到那一节时以实际为准。

   **做完一节只改下面 BOOK 里那一行的 f**（填文件名 = 已做，留空 = 灰的待做）。
   首页课表也是读这份数据铺出来的，不用两头改。

   页面引一行 <script src="lv-book.js"></script> 就有抽屉；
   节页在 body 上写 data-sec="c1-2" 告诉它当前在哪一节（用来高亮）。 */
(function (global) {
'use strict';

var BOOK = [
  { c:1, t:'低压电工基础', secs:[
    { n:1, t:'低压电工安全必知',        f:'c1-1.html', pg:'001' },
    { n:2, t:'电路与识图基础',          f:'c1-2.html', pg:'002–012' },
    { n:3, t:'常用电工仪表的使用',      f:'',          pg:'013–029' },
    { n:4, t:'常用电工材料',            f:'',          pg:'030' }
  ]},
  { c:2, t:'常用低压电器的选用、安装与检测', secs:[
    { n:1,  t:'熔断器',                 f:'', pg:'031–036' },
    { n:2,  t:'按钮开关',               f:'', pg:'037–039' },
    { n:3,  t:'交流接触器',             f:'', pg:'040–046' },
    { n:4,  t:'热继电器',               f:'', pg:'047–048' },
    { n:5,  t:'中间继电器',             f:'', pg:'049–053' },
    { n:6,  t:'时间继电器',             f:'', pg:'054–060' },
    { n:7,  t:'断相和相序综合保护器',   f:'', pg:'061–066' },
    { n:8,  t:'常用开关类低压电器断路器', f:'', pg:'067–073' },
    { n:9,  t:'刀开关',                 f:'', pg:'074–075' },
    { n:10, t:'组合开关与万能转换开关', f:'', pg:'076–079' },
    { n:11, t:'行程开关',               f:'', pg:'080–082' },
    { n:12, t:'电源指示灯',             f:'', pg:'083–084' },
    { n:13, t:'接近开关',               f:'', pg:'085–094' }
  ]},
  { c:3, t:'常用计量仪器接线及应用', secs:[
    { n:1, t:'电压表和电流表',          f:'', pg:'095–098' },
    { n:2, t:'电压互感器和电流互感器',  f:'', pg:'099–105' },
    { n:3, t:'电能表',                  f:'', pg:'106–116' }
  ]},
  { c:4, t:'常用照明电路及接线', secs:[
    { n:1, t:'插座和面板开关接线',      f:'', pg:'117–126' },
    { n:2, t:'红外和人体感应开关接线',  f:'', pg:'127–130' },
    { n:3, t:'常用插头和灯具接线',      f:'', pg:'131–135' },
    { n:4, t:'常用配电线路接线',        f:'', pg:'136–143' },
    { n:5, t:'电气配电线路的安装与接线', f:'', pg:'144–164' }
  ]},
  { c:5, t:'常用低压变压器与电动机', secs:[
    { n:1, t:'常用低压变压器',          f:'', pg:'165–175' },
    { n:2, t:'常用低压电动机',          f:'', pg:'176–186' }
  ]},
  { c:6, t:'电工考证实操常用电路与接线', secs:[
    { n:1, t:'电动机控制电路',          f:'', pg:'187–200' },
    { n:2, t:'综合电路接线',            f:'', pg:'201–206' }
  ]},
  { c:7, t:'附录 · 电工证考试精选试题与答案解析', secs:[
    { n:1, t:'电工作业证考试精选试题与答案解析',     f:'', pg:'207' },
    { n:2, t:'电工作业操作证复审精选试题与答案解析', f:'', pg:'207' },
    { n:3, t:'电工职业资格证精选试题与答案解析',     f:'', pg:'207' }
  ]}
];

/* ── 抽屉样式（注进 head，省得每页都写一遍）── */
var CSS = [
'.bn-btn{flex:none;display:inline-flex;align-items:center;gap:7px;min-height:36px;',
'  padding:6px 13px 6px 11px;border:1px solid var(--line);border-radius:999px;',
'  background:var(--surface);color:var(--ink);font-size:.82rem;font-family:inherit;cursor:pointer;}',
'.bn-btn .bar{display:inline-block;width:13px;height:9px;position:relative;flex:none;}',
'.bn-btn .bar::before,.bn-btn .bar::after{content:"";position:absolute;left:0;right:0;height:1.6px;',
'  background:var(--teal);border-radius:2px;}',
'.bn-btn .bar::before{top:0;box-shadow:0 3.7px 0 var(--teal);}',
'.bn-btn .bar::after{bottom:0;}',
'.bn-ov{position:fixed;inset:0;z-index:80;display:none;background:rgba(10,25,30,.5);}',
'.bn-ov.on{display:block;}',
'.bn-panel{position:absolute;top:0;left:0;bottom:0;width:min(88vw,380px);',
'  background:var(--bg);border-right:1px solid var(--line);display:flex;flex-direction:column;',
'  animation:bnIn .18s ease-out;}',
'@keyframes bnIn{from{transform:translateX(-14px);opacity:.5;}to{transform:none;opacity:1;}}',
'@media (prefers-reduced-motion:reduce){.bn-panel{animation:none;}}',
'.bn-hd{display:flex;align-items:center;gap:9px;padding:13px 14px 11px;border-bottom:1px solid var(--line);}',
'.bn-hd .ti{flex:1;min-width:0;font-weight:700;color:var(--teal);font-size:.97rem;}',
'.bn-hd .ti small{display:block;font-weight:400;font-size:.71rem;color:var(--ink-soft);margin-top:2px;}',
'.bn-x{flex:none;border:1px solid var(--line);background:var(--surface);color:var(--ink-soft);',
'  border-radius:999px;padding:6px 12px;font-size:.78rem;cursor:pointer;font-family:inherit;min-height:34px;}',
'.bn-body{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:8px 8px 22px;}',
'.bn-home{display:block;padding:11px 12px;margin:2px 4px 8px;border-radius:9px;',
'  background:var(--surface);border:1px solid var(--line);color:var(--teal);',
'  text-decoration:none;font-size:.85rem;font-weight:700;}',
'.bn-c{border:1px solid var(--line);border-radius:10px;margin:7px 4px;background:var(--surface);overflow:hidden;}',
'.bn-c>summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:8px;',
'  padding:11px 11px;min-height:46px;}',
'.bn-c>summary::-webkit-details-marker{display:none;}',
'.bn-c .cn{flex:none;font-family:var(--font-mono);font-size:.7rem;font-weight:700;color:#fff;',
'  background:var(--teal);border-radius:6px;padding:3px 7px;}',
'.bn-c .ct{flex:1;min-width:0;font-size:.86rem;font-weight:700;line-height:1.35;}',
'.bn-c .cc{flex:none;font-size:.68rem;color:var(--ink-soft);font-family:var(--font-mono);}',
'.bn-c .cr{flex:none;color:var(--ink-soft);font-size:.68rem;transition:transform .18s;}',
'.bn-c[open] .cr{transform:rotate(90deg);}',
'.bn-c[open]>summary{border-bottom:1px solid var(--line);background:var(--surface-2);}',
'.bn-s{display:flex;align-items:center;gap:7px;padding:10px;min-height:44px;',
'  border-top:1px solid var(--line-soft);text-decoration:none;color:var(--ink);}',
'.bn-s:first-of-type{border-top:none;}',
'.bn-s .sn{flex:none;font-family:var(--font-mono);font-size:.68rem;color:var(--ink-soft);width:2.3em;}',
'.bn-s .st{flex:1;min-width:0;font-size:.82rem;line-height:1.4;}',
'.bn-s .sp{flex:none;font-family:var(--font-mono);font-size:.64rem;color:var(--ink-soft);}',
'.bn-s.todo{color:var(--ink-soft);opacity:.5;pointer-events:none;}',
'.bn-s.cur{background:var(--surface-2);box-shadow:inset 3px 0 0 var(--amber);}',
'.bn-s.cur .st{font-weight:700;color:var(--teal);}',
'@media (prefers-reduced-motion:reduce){.bn-c .cr{transition:none;}}'
].join('\n');

function esc(s){return String(s).replace(/[&<>"]/g,function(c){
  return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}

function allSecs(){
  var out=[];
  BOOK.forEach(function(C){C.secs.forEach(function(S){out.push({C:C,S:S});});});
  return out;
}
function stats(){
  var a=allSecs();
  return {done:a.filter(function(x){return x.S.f}).length, all:a.length};
}
function currentFile(){
  var d=document.body.getAttribute('data-sec');
  if(d) return d.indexOf('.html')>0?d:d+'.html';
  return location.pathname.split('/').pop()||'';
}

function build(){
  var cur=currentFile(), html='';
  html+='<a class="bn-home" href="index.html">⌂ 回到课表首页</a>';
  BOOK.forEach(function(C){
    var hasCur=C.secs.some(function(S){return S.f===cur});
    var done=C.secs.filter(function(S){return S.f}).length;
    var label = C.c===7 ? '附录' : '第'+C.c+'章';
    html+='<details class="bn-c"'+(hasCur?' open':'')+'><summary>'+
      '<span class="cn">'+label+'</span>'+
      '<span class="ct">'+esc(C.c===7?C.t.replace(/^附录 · /,''):C.t)+'</span>'+
      '<span class="cc">'+done+'/'+C.secs.length+'</span>'+
      '<span class="cr">▶</span></summary>';
    C.secs.forEach(function(S){
      var no=(C.c===7?'附':C.c)+'-'+S.n;
      html+= S.f
        ? '<a class="bn-s'+(S.f===cur?' cur':'')+'" href="'+S.f+'">'+
          '<span class="sn">'+no+'</span><span class="st">'+esc(S.t)+'</span>'+
          '<span class="sp">P'+S.pg+'</span></a>'
        : '<span class="bn-s todo"><span class="sn">'+no+'</span>'+
          '<span class="st">'+esc(S.t)+'</span><span class="sp">P'+S.pg+'</span></span>';
    });
    html+='</details>';
  });
  return html;
}

function mount(){
  var st=document.createElement('style'); st.textContent=CSS;
  document.head.appendChild(st);

  var top=document.querySelector('.top');
  if(!top) return;

  /* 顶栏那颗「目录」原本是跳回首页的链接，换成开抽屉的按钮，并放到最左边
     —— 他以前提过「导航放在左边不要放右边，不得劲」 */
  var old=top.querySelector('a.bk');
  var btn=document.createElement('button');
  btn.className='bn-btn'; btn.type='button';
  btn.setAttribute('aria-label','打开目录');
  btn.innerHTML='<span class="bar"></span>目录';
  if(old) old.parentNode.removeChild(old);
  top.insertBefore(btn, top.firstChild);

  var s=stats();
  var ov=document.createElement('div');
  ov.className='bn-ov';
  ov.innerHTML='<div class="bn-panel">'+
    '<div class="bn-hd"><div class="ti">全书目录<small>共 '+s.all+' 节 · 已整理 '+s.done+' 节</small></div>'+
    '<button class="bn-x" type="button">关闭</button></div>'+
    '<div class="bn-body">'+build()+'</div></div>';
  document.body.appendChild(ov);

  function open(){
    ov.classList.add('on');
    document.body.style.overflow='hidden';
    var c=ov.querySelector('.bn-s.cur');
    if(c) c.scrollIntoView({block:'center'});
  }
  function close(){ ov.classList.remove('on'); document.body.style.overflow=''; }

  btn.onclick=open;
  ov.addEventListener('click',function(e){
    if(e.target===ov || e.target.closest('.bn-x')) close();
  });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&ov.classList.contains('on')) close(); });

  global.LVNav={open:open, close:close};
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount);
else mount();

global.LV_BOOK=BOOK;
})(window);
