/* book-nav.js —— 全书目录（唯一真相）+ 顶栏抽屉
   他的原话：「界面竖屏下来非常不方便，找章节很麻烦」——
   原来每页只有一个"回目录"链接，跳别的章要先回首页再滚着找，41 节铺开很长。
   现在任何一页点顶栏 ☰ 就能直接跳。

   **加新节只改下面 BOOK 里那一行**：f 填文件名就是"已做"，留空就是灰的没做。
   index.html 的课表也是用这份数据渲染的，不用两头改。

   页面只要引一行 <script src="book-nav.js"></script> 就有抽屉；
   笔记页在 body 上写 data-sec="p1c1-2" 告诉它当前是哪一节（用来高亮 + 生成本节小目录）。 */
(function (global) {
'use strict';

var BOOK = [
  { p: 1, t: '马克思主义理论', chapters: [
    { c: 1, t: '马克思主义基本原理', secs: [
      { n: 1, t: '马克思主义是关于无产阶级和人类解放的科学', f: 'p1c1-1.html', pg: '4–8' },
      { n: 2, t: '世界的物质性及发展规律', f: 'p1c1-2.html', pg: '8–15' },
      { n: 3, t: '实践与认识及其发展规律', f: 'p1c1-3.html', pg: '15–19' },
      { n: 4, t: '人类社会及其发展规律', f: 'p1c1-4.html', pg: '20–24' },
      { n: 5, t: '资本主义的本质及规律', f: 'p1c1-5.html', pg: '24–30' },
      { n: 6, t: '资本主义的发展及其趋势', f: 'p1c1-6.html', pg: '30–36' },
      { n: 7, t: '社会主义的发展及其规律', f: 'p1c1-7.html', pg: '36–39' },
      { n: 8, t: '共产主义崇高理想及其最终实现', f: 'p1c1-8.html', pg: '39–42' }
    ]},
    { c: 2, t: '毛泽东思想', secs: [
      { n: 1, t: '毛泽东思想及其历史地位', f: 'p1c2-1.html', pg: '43–48' },
      { n: 2, t: '新民主主义革命理论', f: 'p1c2-2.html', pg: '48–54' },
      { n: 3, t: '社会主义改造理论', f: 'p1c2-3.html', pg: '54–56' },
      { n: 4, t: '社会主义革命和建设中取得的独创性理论成果', f: 'p1c2-4.html', pg: '56–58' }
    ]},
    { c: 3, t: '中国特色社会主义理论体系', secs: [
      { n: 1, t: '中国特色社会主义理论体系的形成发展', f: '', pg: '59–62' },
      { n: 2, t: '邓小平理论', f: '', pg: '62–65' },
      { n: 3, t: '"三个代表"重要思想', f: '', pg: '65–66' },
      { n: 4, t: '科学发展观', f: '', pg: '66' }
    ]},
    { c: 4, t: '习近平新时代中国特色社会主义思想', secs: [
      { n: 1, t: '是党和国家必须长期坚持的指导思想', f: '', pg: '66–70' },
      { n: 2, t: '主要内容', f: '', pg: '70–73' },
      { n: 3, t: '世界观和方法论', f: '', pg: '73–79' }
    ]}
  ]},
  { p: 2, t: '人文与社会', chapters: [
    { c: 1, t: '中国历史', secs: [
      { n: 1, t: '中国古代史', f: '', pg: '92–107' },
      { n: 2, t: '中国近现代史', f: '', pg: '107–130' }
    ]},
    { c: 2, t: '文化常识', secs: [
      { n: 1, t: '文化概述', f: '', pg: '131–134' },
      { n: 2, t: '中华文化', f: '', pg: '134–165' },
      { n: 3, t: '外域文化', f: '', pg: '165–171' }
    ]},
    { c: 3, t: '思想道德', secs: [
      { n: 1, t: '人生观', f: 'p2c3-1.html', pg: '172–173' },
      { n: 2, t: '理想信念', f: 'p2c3-2.html', pg: '173–176' },
      { n: 3, t: '中国精神', f: 'p2c3-3.html', pg: '175–176' },
      { n: 4, t: '社会主义核心价值观', f: 'p2c3-4.html', pg: '176–177' },
      { n: 5, t: '道德规范', f: 'p2c3-5.html', pg: '178–181' }
    ]},
    { c: 4, t: '法治知识', secs: [
      { n: 1, t: '社会主义法律的特征和运行', f: 'p2c4-1.html', pg: '182–185' },
      { n: 2, t: '全面依法治国', f: 'p2c4-2.html', pg: '185–189' },
      { n: 3, t: '宪法及宪法权威', f: 'p2c4-3.html', pg: '190–204' },
      { n: 4, t: '法治素养与民事权利', f: 'p2c4-4.html', pg: '205–209' },
      { n: 5, t: '与国防和军队相关的法律法规', f: 'p2c4-5.html', pg: '209–225' }
    ]},
    { c: 5, t: '科学技术', secs: [
      { n: 1, t: '当代科学技术发展', f: '', pg: '237–239' },
      { n: 2, t: '科学技术与社会', f: '', pg: '239–259' },
      { n: 3, t: '军事高科技', f: '', pg: '259–261' }
    ]}
  ]},
  { p: 3, t: '国防和军队', chapters: [
    { c: 1, t: '国情国力', secs: [
      { n: 1, t: '我国国情概况', f: '', pg: '273–275' },
      { n: 2, t: '我国国情国力', f: '', pg: '275–281' }
    ]},
    { c: 2, t: '中国国防', secs: [
      { n: 1, t: '国防概述', f: '', pg: '282–293' },
      { n: 2, t: '中华人民共和国武装力量', f: '', pg: '293–298' },
      { n: 3, t: '新时代中国防御性国防政策', f: '', pg: '298–300' }
    ]},
    { c: 3, t: '人民军队', secs: [
      { n: 1, t: '人民军队概述', f: '', pg: '301–306' },
      { n: 2, t: '新时代人民军队建设', f: '', pg: '306–314' },
      { n: 3, t: '军队安全保密', f: '', pg: '314–319' }
    ]}
  ]}
];

var CSS = [
'.bn-btn{flex:none;background:var(--surface-2);border:1px solid var(--line);border-radius:9px;',
'  min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center;gap:5px;',
'  color:var(--navy);font-size:.8rem;font-weight:700;cursor:pointer;padding:0 11px;font-family:inherit;}',
'.bn-btn .bar{display:block;width:15px;height:2px;background:currentColor;border-radius:2px;position:relative;}',
'.bn-btn .bar::before,.bn-btn .bar::after{content:"";position:absolute;left:0;width:15px;height:2px;background:currentColor;border-radius:2px;}',
'.bn-btn .bar::before{top:-5px;}.bn-btn .bar::after{top:5px;}',
'.bn-ov{position:fixed;inset:0;z-index:80;background:rgba(20,18,14,.38);display:none;}',
'.bn-ov.on{display:block;}',
/* 抽屉从左边滑出 —— 和左上角那颗按钮同一侧，手指从按钮直接落到列表上 */
'.bn-panel{position:absolute;left:0;top:0;bottom:0;width:min(74vw,330px);background:var(--bg);',
'  display:flex;flex-direction:column;box-shadow:6px 0 30px rgba(0,0,0,.22);',
'  transform:translateX(-100%);transition:transform .22s ease;}',
'.bn-ov.on .bn-panel{transform:translateX(0);}',
'@media (prefers-reduced-motion:reduce){.bn-panel{transition:none;}}',
'.bn-hd{flex:none;display:flex;align-items:center;gap:10px;padding:13px 16px 10px;border-bottom:1px solid var(--line);}',
'.bn-hd .ti{flex:1;min-width:0;font-family:var(--font-display);font-size:1rem;font-weight:700;color:var(--navy);}',
'.bn-hd .ti small{display:block;font-family:var(--font-body);font-size:.72rem;font-weight:400;color:var(--ink-soft);margin-top:2px;}',
'.bn-x{flex:none;min-width:44px;min-height:38px;border:1px solid var(--line);background:var(--surface);',
'  border-radius:8px;color:var(--ink-soft);font-size:.98rem;cursor:pointer;font-family:inherit;}',
'.bn-body{overflow-y:auto;-webkit-overflow-scrolling:touch;padding:6px 9px calc(18px + env(safe-area-inset-bottom,0px));}',
'.bn-home{display:block;text-align:center;margin:8px 4px 12px;padding:11px;border-radius:9px;',
'  background:var(--navy);color:#fbf8f0;text-decoration:none;font-size:.86rem;font-weight:700;}',
'.bn-p{font-family:var(--font-display);font-size:.82rem;letter-spacing:.05em;color:var(--brass);',
'  margin:16px 4px 6px;padding-bottom:5px;border-bottom:1px dashed var(--line);}',
'.bn-c{margin-bottom:5px;border:1px solid var(--line);border-radius:10px;overflow:hidden;background:var(--surface);}',
'.bn-c>summary{list-style:none;cursor:pointer;padding:11px 10px;display:flex;align-items:center;gap:7px;min-height:44px;}',
'.bn-c>summary::-webkit-details-marker{display:none;}',
'.bn-c .cn{flex:none;font-family:var(--font-mono);font-size:.72rem;font-weight:700;color:var(--navy);',
'  background:var(--surface-2);border-radius:6px;padding:3px 7px;}',
'.bn-c .ct{flex:1;min-width:0;font-size:.88rem;font-weight:700;}',
'.bn-c .cc{flex:none;font-size:.7rem;color:var(--ink-soft);font-family:var(--font-mono);}',
'.bn-c .cr{flex:none;color:var(--ink-soft);font-size:.7rem;transition:transform .18s;}',
'.bn-c[open] .cr{transform:rotate(90deg);}',
'.bn-c[open]>summary{border-bottom:1px solid var(--line);background:var(--surface-2);}',
'.bn-s{display:flex;align-items:center;gap:7px;padding:10px 10px;min-height:44px;',
'  border-top:1px solid var(--line-soft);text-decoration:none;color:var(--ink);}',
'.bn-s:first-of-type{border-top:none;}',
'.bn-s .sn{flex:none;font-family:var(--font-mono);font-size:.7rem;color:var(--ink-soft);width:2.1em;}',
'.bn-s .st{flex:1;min-width:0;font-size:.82rem;line-height:1.4;}',
'.bn-s .sp{flex:none;font-family:var(--font-mono);font-size:.66rem;color:var(--ink-soft);}',
'.bn-s.todo{color:var(--ink-soft);opacity:.5;pointer-events:none;}',
'.bn-s.cur{background:var(--surface-2);}',
'.bn-s.cur .st{font-weight:700;color:var(--navy);}',
'.bn-s.cur{box-shadow:inset 3px 0 0 var(--crimson);}',
/* 本节小目录：长页面在竖屏下滚很久，给个页内跳转 */
'.bn-inner{margin:4px 4px 2px;padding:10px 12px;background:var(--surface-2);border:1px solid var(--line);border-radius:10px;}',
'.bn-inner .lb{display:block;font-size:.7rem;color:var(--brass);font-weight:700;letter-spacing:.06em;margin-bottom:6px;}',
'.bn-inner a{display:block;padding:8px 4px;min-height:40px;font-size:.83rem;color:var(--ink);',
'  text-decoration:none;border-top:1px solid var(--line-soft);line-height:1.4;}',
'.bn-inner a:first-of-type{border-top:none;}',
/* ── 大标题折叠 ── */
'.fold{border:1px solid var(--line);border-radius:11px;margin:12px 0;background:var(--surface);overflow:hidden;}',
'.fold>summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:10px;',
'  padding:13px 14px;min-height:48px;font-weight:700;font-size:.95rem;color:var(--ink);}',
'.fold>summary::-webkit-details-marker{display:none;}',
'.fold[open]>summary{border-bottom:1px solid var(--line);background:var(--surface-2);}',
'.fold .fc{flex:none;color:var(--brass);font-size:.72rem;transition:transform .18s;}',
'.fold[open] .fc{transform:rotate(90deg);}',
'.fold .ft{flex:1;min-width:0;line-height:1.4;}',
'.fold .fn{flex:none;font-family:var(--font-mono);font-size:.66rem;color:var(--ink-soft);}',
'.fold-body{padding:2px 14px 14px;}',
'.foldbar{display:flex;gap:8px;margin:14px 0 4px;}',
'.foldbar button{flex:1;min-height:42px;border:1px solid var(--line);background:var(--surface);',
'  border-radius:9px;color:var(--navy);font-size:.82rem;font-weight:700;cursor:pointer;font-family:inherit;}',
'@media (prefers-reduced-motion:reduce){.fold .fc{transition:none;}}'
].join('\n');

function esc(s){return String(s).replace(/[&<>"]/g,function(c){
  return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}

function allSecs(){
  var out=[];
  BOOK.forEach(function(P){P.chapters.forEach(function(C){C.secs.forEach(function(S){
    out.push({P:P,C:C,S:S});});});});
  return out;
}
function stats(){
  var a=allSecs();
  return {done:a.filter(function(x){return x.S.f}).length, all:a.length};
}

/* 当前页是哪一节：优先 body[data-sec]，否则看文件名 */
function currentFile(){
  var d=document.body.getAttribute('data-sec');
  if(d) return d.indexOf('.html')>0?d:d+'.html';
  var m=location.pathname.split('/').pop();
  return m||'';
}

function build(){
  var cur=currentFile(), st=stats(), html='';
  html+='<a class="bn-home" href="index.html">⌂ 回到首页</a>';
  BOOK.forEach(function(P){
    html+='<div class="bn-p">第'+'一二三四五六七八九'.charAt(P.p-1)+'篇 · '+esc(P.t)+'</div>';
    P.chapters.forEach(function(C){
      var hasCur=C.secs.some(function(S){return S.f===cur});
      var done=C.secs.filter(function(S){return S.f}).length;
      html+='<details class="bn-c"'+(hasCur?' open':'')+'><summary>'+
        '<span class="cn">第'+C.c+'章</span>'+
        '<span class="ct">'+esc(C.t)+'</span>'+
        '<span class="cc">'+done+'/'+C.secs.length+'</span>'+
        '<span class="cr">▶</span></summary>';
      C.secs.forEach(function(S){
        var isCur=(S.f===cur);
        html+=S.f
          ? '<a class="bn-s'+(isCur?' cur':'')+'" href="'+S.f+'">'+
            '<span class="sn">'+C.c+'-'+S.n+'</span><span class="st">'+esc(S.t)+'</span>'+
            '<span class="sp">P'+S.pg+'</span></a>'
          : '<span class="bn-s todo"><span class="sn">'+C.c+'-'+S.n+'</span>'+
            '<span class="st">'+esc(S.t)+'</span><span class="sp">P'+S.pg+'</span></span>';
      });
      html+='</details>';
    });
  });
  return {html:html, st:st, cur:cur};
}

/* 本节小目录：抓正文里的 h4，做成页内跳转 */
/* 把每个 h4 连同它下面的内容包成一个可折叠块。
   他的原话：「一长篇下来，看的很累，比如说每节一个折叠」——
   1-2 那节整页近 20000px，竖屏一路滚确实累。
   **默认收起**：一进来先看这一节的骨架（3~9 行），点开才读正文。
   必背卡在第一个 h4 之前，不受影响、永远展开。 */
function makeFolds(){
  var sec=document.querySelector('.section');
  if(!sec) return 0;
  var hs=Array.prototype.slice.call(sec.children).filter(function(el){return el.tagName==='H4'});
  if(hs.length<2) return 0;          // 只有一个大标题就不折了，没意义

  hs.forEach(function(h,i){
    var d=document.createElement('details');
    d.className='fold';
    var sm=document.createElement('summary');
    sm.innerHTML='<span class="fc">▶</span><span class="ft"></span>'+
                 '<span class="fn">'+(i+1)+'/'+hs.length+'</span>';
    sm.querySelector('.ft').textContent=h.textContent;
    d.appendChild(sm);
    var body=document.createElement('div');
    body.className='fold-body';
    d.appendChild(body);
    /* 标题已经搬到 summary 上，但 id 要留给页内跳转用 */
    if(h.id) d.id=h.id;
    h.parentNode.insertBefore(d,h);
    var n=h.nextSibling;
    h.parentNode.removeChild(h);
    while(n){
      var next=n.nextSibling;
      if(n.nodeType===1&&n.tagName==='H4') break;
      body.appendChild(n);
      n=next;
    }
  });

  var first=sec.querySelector('.fold');
  if(first){
    var bar=document.createElement('div');
    bar.className='foldbar';
    bar.innerHTML='<button type="button" data-fold="open">展开全部</button>'+
                  '<button type="button" data-fold="close">收起全部</button>';
    sec.insertBefore(bar,first);
    bar.addEventListener('click',function(e){
      var b=e.target.closest('button[data-fold]'); if(!b) return;
      var on=b.dataset.fold==='open';
      sec.querySelectorAll('.fold').forEach(function(d){d.open=on});
    });
  }
  return hs.length;
}

function innerToc(){
  var hs=document.querySelectorAll('.section h4');
  if(hs.length<2) return '';
  var out='<div class="bn-inner"><span class="lb">本节内容</span>';
  Array.prototype.forEach.call(hs,function(h,i){
    if(!h.id) h.id='sec-'+i;
    out+='<a href="#'+h.id+'" data-jump="1">'+esc(h.textContent)+'</a>';
  });
  return out+'</div>';
}

/* 页内跳转落到折叠块上时，要先把它展开，否则跳过去是一条收起的标题 */
function openTarget(hash){
  if(!hash) return;
  var el=document.getElementById(hash.replace('#',''));
  if(el&&el.classList&&el.classList.contains('fold')) el.open=true;
}

function mount(){
  var st=document.createElement('style'); st.textContent=CSS;
  document.head.appendChild(st);

  var top=document.querySelector('.top');
  if(!top) return;

  /* 顶栏原来那颗「目录」是跳回 index.html 的链接，换成打开抽屉的按钮 */
  var old=top.querySelector('a.bk');
  var btn=document.createElement('button');
  btn.className='bn-btn'; btn.type='button';
  btn.setAttribute('aria-label','打开目录');
  btn.innerHTML='<span class="bar"></span>目录';
  /* 他要求放左边：「导航放在左边不要放右边。不得劲」——
     原来的 a.bk 在顶栏右侧，直接替换会继承那个位置，所以先删掉再插到最前面。 */
  if(old) old.parentNode.removeChild(old);
  top.insertBefore(btn, top.firstChild);

  var b=build();
  /* 小目录必须在 makeFolds 之前生成 —— 折叠之后 h4 就被搬进 summary 了 */
  var toc=innerToc();
  makeFolds();
  var ov=document.createElement('div');
  ov.className='bn-ov';
  ov.innerHTML='<div class="bn-panel">'+
    '<div class="bn-hd"><div class="ti">全书目录<small>共 '+b.st.all+' 节 · 已整理 '+b.st.done+' 节</small></div>'+
    '<button class="bn-x" type="button">关闭</button></div>'+
    '<div class="bn-body">'+toc+b.html+'</div></div>';
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
    if(e.target===ov || e.target.closest('.bn-x')) { close(); return; }
    /* 页内跳转点完要把抽屉收起来，否则跳了也看不见 */
    var j=e.target.closest('a[data-jump]');
    if(j){ openTarget(j.getAttribute('href')); setTimeout(close,60); }
  });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') close(); });

  global.BookNav={BOOK:BOOK, open:open, close:close, stats:stats, allSecs:allSecs};
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount);
else mount();

global.JWZ_BOOK=BOOK;
})(window);
