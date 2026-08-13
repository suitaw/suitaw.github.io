/* 理财课 · 课程目录（八课共用）
   宿主页面只要：<script src="money-nav.js"></script> + MoneyNav.init({no:3})
   顶栏那行标题会变成可点的，点开从底部升起的目录，随时跳课 ——
   不用走完这一课才有下一课的入口。 */
(function(){
'use strict';

/* 加新课就往这儿添一行，f 留空表示还没做（列表里灰掉不可点） */
const LESSONS=[
  {n:1,f:'learn-money.html',   t:'复利与通胀',    d:'钱自己会长，时间才是主力'},
  {n:2,f:'learn-money-2.html', t:'风险到底是什么', d:'那条平滑的曲线其实不存在'},
  {n:3,f:'learn-money-3.html', t:'钱该放哪儿',    d:'存款、债券、股票凭什么给不同回报'},
  {n:4,f:'',t:'分散',          d:'鸡蛋和篮子，到底怎么分才算分散'},
  {n:5,f:'',t:'手续费',        d:'每年 1%，三十年吃掉你多少'},
  {n:6,f:'',t:'贷款的真实利率', d:'月供背后，你实际付的利率是多少'},
  {n:7,f:'',t:'保险',          d:'该买什么，不该买什么'},
  {n:8,f:'',t:'我的配置表',    d:'把前七课变成一张自己的表'}
];

const CSS=`
.mn-hd{cursor:pointer;position:relative;display:inline-flex;align-items:center;gap:6px;}
/* 标题本身只有 16px 高，视觉不动，用 ::after 把热区往外撑到 44px */
.mn-hd::after{content:'';position:absolute;inset:-14px -10px;}
.mn-hd .mn-car{font-size:12px;color:var(--dim);transform:translateY(1px);}
.mn-ov{position:fixed;inset:0;z-index:70;background:rgba(8,9,13,.62);display:none;}
.mn-ov.on{display:block;}
.mn-sheet{position:absolute;left:0;right:0;bottom:0;max-height:86vh;overflow-y:auto;
  background:var(--surface);border:1px solid var(--border);border-bottom:none;
  border-radius:16px 16px 0 0;padding:14px 14px calc(14px + env(safe-area-inset-bottom));
  transform:translateY(100%);transition:transform .22s;}
@supports (height:1dvh){.mn-sheet{max-height:86dvh;}}
.mn-ov.on .mn-sheet{transform:none;}
.mn-grip{width:38px;height:4px;border-radius:2px;background:var(--border);margin:0 auto 12px;}
.mn-ti{font-size:13px;color:var(--dim);margin:0 4px 10px;}
.mn-it{display:flex;gap:11px;align-items:flex-start;width:100%;min-height:56px;
  text-align:left;padding:11px 12px;margin-bottom:7px;border-radius:12px;
  border:1px solid transparent;background:var(--surface2);color:inherit;
  font-family:inherit;text-decoration:none;}
.mn-it .mn-n{flex:none;width:24px;height:24px;border-radius:50%;background:var(--border);
  color:var(--dim);font-size:12px;font-weight:700;display:flex;
  align-items:center;justify-content:center;margin-top:1px;}
/* 这两个必须 block —— span 默认 inline，课名和说明会糊成一行 */
.mn-it .mn-t{display:block;font-size:14.5px;font-weight:600;color:#e8e9f0;}
.mn-it .mn-d{display:block;font-size:12.5px;color:var(--dim);margin-top:2px;line-height:1.45;}
.mn-it.on{border-color:var(--accent);background:rgba(232,168,76,.09);}
.mn-it.on .mn-n{background:var(--accent);color:#1a1206;}
.mn-it.on .mn-t{color:var(--accent);}
.mn-it.off{opacity:.42;}
.mn-it.off .mn-d::after{content:'　还没做';color:var(--accent);}
.mn-cl{width:100%;min-height:46px;margin-top:6px;border:1px solid var(--border);
  border-radius:11px;background:transparent;color:var(--dim);
  font-family:inherit;font-size:14px;}
`;

let ov=null;

function open(){ov.classList.add('on');}
function close(){ov.classList.remove('on');}

function init(host){
  host=host||{};
  const no=host.no|0;

  document.head.appendChild(Object.assign(document.createElement('style'),{textContent:CSS}));

  // 顶栏标题就地变成入口，宿主页面的 HTML 一个字都不用改
  const h1=document.querySelector('.top h1');
  if(h1){
    h1.classList.add('mn-hd');
    h1.insertAdjacentHTML('beforeend','<span class="mn-car">▾</span>');
    h1.addEventListener('click',open);
  }

  ov=document.createElement('div');
  ov.className='mn-ov';
  const rows=LESSONS.map(L=>{
    const cur=L.n===no, ok=!!L.f;
    const cls='mn-it'+(cur?' on':'')+(ok?'':' off');
    const inner='<span class="mn-n">'+L.n+'</span><span><span class="mn-t">'+L.t+
      '</span><span class="mn-d">'+L.d+'</span></span>';
    // 当前这一课不做成链接，点了只是关掉目录
    if(cur||!ok) return '<div class="'+cls+'">'+inner+'</div>';
    return '<a class="'+cls+'" href="'+L.f+'">'+inner+'</a>';
  }).join('');
  ov.innerHTML='<div class="mn-sheet"><div class="mn-grip"></div>'+
    '<div class="mn-ti">八课，随时跳着看</div>'+rows+
    '<button class="mn-cl" id="mnClose">关掉</button></div>';
  document.body.appendChild(ov);

  ov.addEventListener('click',e=>{ if(e.target===ov) close(); });   // 点遮罩关
  ov.querySelector('#mnClose').addEventListener('click',close);
}

window.MoneyNav={init,open,close,lessons:LESSONS,
  get(n){return LESSONS.find(L=>L.n===n);}};
})();
