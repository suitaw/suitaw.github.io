/* 电工课 · 全书课表（所有课页共用）
   宿主页面只要：<script src="elec-nav.js"></script> + ElecNav.init({ch:1,sec:'1.1'})
   顶栏那行标题就地变成入口（加 ▾ + 绑 click），宿主 HTML 一个字都不用改。
   点开是从底部升起的全书目录：16 章，当前这一章展开到节。

   —— 这一份同时是**全书课表的唯一真相**，首页 index.html 也读它来铺课表。
   做完一节就把那一节的 f 填上，别的地方都不用改。

   页码一律是**书内页码**（《零基础学电工》韩雪涛主编，机械工业出版社 2018）。
   要翻 PDF 的话 **PDF 页 = 书内页 + 14**。 */
(function(){
'use strict';

const BOOK = [
{part:'基础篇', chs:[
  {n:1, t:'电工基础知识', p:1, d:'电流、电压、欧姆定律、串并联、交直流、电磁',
   secs:[
     {id:'1.1', f:'c1-1.html', t:'电路基础',       d:'电流、电动势、电位与电压', p:1},
     {id:'1.2', f:'c1-2.html', t:'欧姆定律',       d:'电压和电阻怎么决定电流',   p:4},
     {id:'1.3', f:'c1-3.html', t:'电功率和焦耳定律', d:'电费怎么来的、电线为什么发热', p:5},
     {id:'1.4', f:'c1-4.html', t:'电路的连接方式',  d:'串联、并联、混联',        p:7},
     {id:'1.5', f:'c1-5.html', t:'直流电与交流电',  d:'220V/380V 和几种供电制式', p:10},
     {id:'1.6', f:'c1-6.html', t:'电磁现象及规律',  d:'电生磁、磁生电',          p:17}
   ]},
  {n:2, t:'常用电器和电子元器件', p:20, d:'开关、接触器、继电器、传感器、变压器、电动机'},
  {n:3, t:'常用工具和仪表的功能与使用', p:48, d:'钳子、螺钉旋具、验电器、万用表、钳形表、绝缘电阻表'},
  {n:4, t:'电工识图', p:64, d:'文字符号、图形符号、识图步骤'}
]},
{part:'实操篇', chs:[
  {n:5,  t:'电气部件与电子元器件的检测', p:79,  d:'开关、断路器、漏电保护器、接触器、电动机的检测'},
  {n:6,  t:'线路的加工与连接', p:101, d:'剥线、缠绕、并头、焊接、绝缘恢复'},
  {n:7,  t:'照明控制线路的安装与维护', p:121, d:'室内与公共照明的控制关系、安装、检修'},
  {n:8,  t:'供配电线路的安装与维护', p:139, d:'高低压供配电、配电箱、配电盘'},
  {n:9,  t:'电力拖动系统的安装与维护', p:163, d:'交直流电动机控制电路的安装与检修'},
  {n:10, t:'电动机的拆装与维护应用', p:181, d:'拆卸、安装、日常保养与检查'}
]},
{part:'进阶篇', chs:[
  {n:11, t:'电动机常用控制电路的特点与应用', p:196, d:'起停、串电阻减压、星三角、反接制动、正反转、调速、定时'},
  {n:12, t:'变频器的使用与调试', p:220, d:'种类结构、变频电路原理、操作面板、调试'},
  {n:13, t:'PLC 技术与编程', p:239, d:'种类结构、技术特点、编程语言与方式'}
]},
{part:'综合应用篇', chs:[
  {n:14, t:'机电设备的自动化应用控制', p:258, d:'工业与农机电气控制电路'},
  {n:15, t:'变频电路的综合控制应用', p:275, d:'制冷设备、电动机设备中的变频控制'},
  {n:16, t:'PLC 的综合控制应用', p:292, d:'通风报警、交通信号灯、工控机床'}
]}
];

/* 拍平成一串节，用来算「上一节 / 下一节」*/
function flatSecs(){
  const out = [];
  BOOK.forEach(P=>P.chs.forEach(ch=>{
    (ch.secs||[]).forEach(s=>out.push(Object.assign({ch:ch.n}, s)));
  }));
  return out;
}
function chapter(n){
  for(const P of BOOK) for(const ch of P.chs) if(ch.n===n) return ch;
  return null;
}
function section(id){
  return flatSecs().find(s=>s.id===id) || null;
}
function neighbors(id){
  const all = flatSecs().filter(s=>s.f);
  const i = all.findIndex(s=>s.id===id);
  return { prev: i>0 ? all[i-1] : null, next: (i>=0 && i<all.length-1) ? all[i+1] : null };
}

const CSS = `
.en-hd{cursor:pointer;position:relative;display:inline-flex;align-items:center;gap:5px}
/* 标题本身才 16px 高：视觉不动，用 ::after 把热区往外撑到 44px */
.en-hd::after{content:'';position:absolute;inset:-14px -10px}
.en-hd .en-car{font-size:11px;color:var(--tx3,#8b949e);transform:translateY(1px)}
.en-ov{position:fixed;inset:0;z-index:80;background:rgba(10,14,20,.55);display:none}
.en-ov.on{display:block}
.en-sh{position:absolute;left:0;right:0;bottom:0;max-height:86vh;overflow-y:auto;
  -webkit-overflow-scrolling:touch;background:var(--card,#fff);
  border-radius:16px 16px 0 0;padding:12px 12px calc(14px + env(safe-area-inset-bottom));
  transform:translateY(100%);transition:transform .22s}
@supports (height:1dvh){.en-sh{max-height:86dvh}}
.en-ov.on .en-sh{transform:none}
.en-grip{width:38px;height:4px;border-radius:2px;background:var(--line,#dde2e8);margin:0 auto 11px}
.en-ti{font-size:.8rem;color:var(--tx3,#8b949e);margin:0 3px 9px;line-height:1.5}
.en-ti b{color:var(--tx2,#5d6773)}
.en-part{font-size:.72rem;font-weight:700;letter-spacing:.08em;color:var(--acc,#1a6fd4);
  background:var(--accbg,#e8f1fc);border-radius:5px;padding:3px 7px;
  display:inline-block;margin:10px 0 6px}
.en-ch{display:flex;gap:9px;align-items:flex-start;width:100%;min-height:48px;
  text-align:left;padding:9px 10px;margin-bottom:5px;border-radius:10px;
  border:1px solid transparent;background:var(--card2,#f7f9fb);color:inherit;
  font:inherit;text-decoration:none}
.en-ch .en-n{flex:none;width:23px;height:23px;border-radius:6px;
  background:var(--line,#dde2e8);color:var(--tx2,#5d6773);font-size:.72rem;font-weight:700;
  display:flex;align-items:center;justify-content:center;margin-top:1px}
.en-ch .en-t{display:block;font-size:.87rem;font-weight:600;line-height:1.4}
.en-ch .en-d{display:block;font-size:.75rem;color:var(--tx3,#8b949e);margin-top:2px;line-height:1.45}
.en-ch .en-p{flex:none;font-size:.7rem;color:var(--tx3,#8b949e);padding-top:3px;white-space:nowrap}
.en-ch.cur{border-color:var(--acc,#1a6fd4);background:var(--accbg,#e8f1fc)}
.en-ch.cur .en-n{background:var(--acc,#1a6fd4);color:#fff}
.en-ch.off{opacity:.5}
.en-ch.off .en-d::after{content:'　还没做';color:var(--warn,#a86200)}
.en-secs{margin:0 0 8px 12px;padding-left:10px;border-left:2px solid var(--line,#dde2e8)}
.en-sec{display:flex;gap:8px;align-items:center;width:100%;min-height:44px;
  text-align:left;padding:6px 9px;margin-bottom:4px;border-radius:9px;
  border:1px solid transparent;background:none;color:inherit;font:inherit;text-decoration:none}
.en-sec .en-i{flex:none;font-size:.75rem;font-weight:700;color:var(--acc,#1a6fd4);
  font-family:ui-monospace,Menlo,Consolas,monospace;width:26px}
.en-sec .en-si{flex:none;width:28px;height:28px;border-radius:8px;
  display:flex;align-items:center;justify-content:center;
  background:var(--card,#fff);color:var(--tx2,#5d6773);border:1px solid var(--line,#dde2e8)}
.en-sec.cur .en-si{color:var(--acc,#1a6fd4);border-color:var(--acc,#1a6fd4)}
.en-ch .en-n svg{display:block}
.en-sec .en-t{display:block;font-size:.84rem;font-weight:600}
.en-sec .en-d{display:block;font-size:.73rem;color:var(--tx3,#8b949e);margin-top:1px;line-height:1.4}
.en-sec.cur{background:var(--accbg,#e8f1fc);border-color:var(--acc,#1a6fd4)}
.en-sec.off{opacity:.45}
.en-cl{width:100%;min-height:46px;margin-top:8px;border:1px solid var(--line,#dde2e8);
  border-radius:11px;background:var(--card2,#f7f9fb);color:var(--tx2,#5d6773);font:inherit;font-size:.88rem}
`;

let ov = null;
function open(){ if(ov) ov.classList.add('on'); }
function close(){ if(ov) ov.classList.remove('on'); }

function init(host){
  host = host || {};
  const chNo = host.ch|0, secId = host.sec || '';

  document.head.appendChild(Object.assign(document.createElement('style'),{textContent:CSS}));

  const h1 = document.querySelector('.top h1');
  if(h1){
    h1.classList.add('en-hd');
    h1.insertAdjacentHTML('beforeend','<span class="en-car">▾</span>');
    h1.addEventListener('click', open);
  }

  let html = '';
  BOOK.forEach(P=>{
    html += '<div class="en-part">'+P.part+'</div>';
    P.chs.forEach(ch=>{
      const done = !!(ch.secs && ch.secs.some(s=>s.f));
      const cur  = ch.n === chNo;
      /* 有 elec-icons.js 就画图标，没引也不会坏 —— 退回原来的章号数字 */
      const chIc = window.EI ? EI.svg(EI.forChapter(ch.n), 15) : ch.n;
      const inner = '<span class="en-n">'+chIc+'</span>'+
        '<span style="flex:1;min-width:0"><span class="en-t">'+ch.t+'</span>'+
        '<span class="en-d">'+ch.d+'</span></span>'+
        '<span class="en-p">P'+ch.p+'</span>';
      html += '<div class="en-ch'+(cur?' cur':'')+(done?'':' off')+'">'+inner+'</div>';
      if(cur && ch.secs){
        html += '<div class="en-secs">';
        ch.secs.forEach(s=>{
          const sIc = window.EI
            ? '<span class="en-si">'+EI.svg(EI.forSection(s.id), 16)+'</span>' : '';
          const si = sIc+'<span class="en-i">'+s.id+'</span>'+
            '<span style="flex:1;min-width:0"><span class="en-t">'+s.t+'</span>'+
            '<span class="en-d">'+s.d+'</span></span>';
          if(!s.f)            html += '<div class="en-sec off">'+si+'</div>';
          else if(s.id===secId) html += '<div class="en-sec cur">'+si+'</div>';
          else                html += '<a class="en-sec" href="'+s.f+'">'+si+'</a>';
        });
        html += '</div>';
      }
    });
  });

  ov = document.createElement('div');
  ov.className = 'en-ov';
  ov.innerHTML = '<div class="en-sh"><div class="en-grip"></div>'+
    '<div class="en-ti">《零基础学电工》全 16 章 · <b>正在做第 1 章</b>　'+
    '<a href="index.html" style="color:var(--acc,#1a6fd4)">回课程首页</a></div>'+
    html + '<button class="en-cl" id="enClose">关掉</button></div>';
  document.body.appendChild(ov);

  ov.addEventListener('click', e=>{ if(e.target===ov) close(); });
  ov.querySelector('#enClose').addEventListener('click', close);
}

window.ElecNav = { init:init, open:open, close:close,
  BOOK:BOOK, flatSecs:flatSecs, chapter:chapter, section:section, neighbors:neighbors };
})();
