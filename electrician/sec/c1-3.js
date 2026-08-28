/* 1.3 电功率和焦耳定律 —— 本节内容的唯一真相。
   由 c1-3.html 机械拆分而来（正文一个字未改）。
   book.html 按需载入它；c1-3.html 现在只是个薄壳，也载入它。 */
(function(){
'use strict';
ELEC.reg({
  id: '1.3',
  file: 'c1-3.html',
  title: '1.3 电功率和焦耳定律',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>电费</button>
    <button class="tab" data-i="1"><span class="n">2</span>三种算法</button>
    <button class="tab" data-i="2"><span class="n">3</span>为什么烫</button>
    <button class="tab" data-i="3"><span class="n">4</span>铭牌</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">先从你每个月都在付的那笔钱说起</div>
    电费单上的「度」，就是这一节要讲的<b>电功 W</b>。
    <b>1 度 = 1 千瓦的东西用 1 小时</b>。下面挑一件家电试试。
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1pick">
        <button class="btn on" data-i="0">LED 灯 10W</button>
        <button class="btn" data-i="1">电视 100W</button>
        <button class="btn" data-i="2">电饭煲 800W</button>
      </div>
      <div class="btns">
        <button class="btn" data-i="3">空调 1200W</button>
        <button class="btn" data-i="4">电热水壶 1800W</button>
      </div>
      <div class="rowlab">每天用　<b id="s1hlab">2.0 小时</b></div>
      <input type="range" id="s1h" min="1" max="48" step="1" value="4">
      <div class="ticks"><span>0.5 小时</span><span>24 小时</span></div>
      <div class="nums three">
        <div class="num"><div class="k">每天</div><div class="v" id="s1d">—</div></div>
        <div class="num hi"><div class="k">每月（30 天）</div><div class="v" id="s1m">—</div></div>
        <div class="num"><div class="k">电费（0.6 元/度）</div><div class="v" id="s1y">—</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">电功 W 和电功率 P，差一个「时间」</div>
    <div id="f1"></div>
    <div id="f1b" style="margin-top:8px"></div>
    <div class="tip">
      <b>为什么电费单上不用焦耳（J）？</b>因为焦耳太小了。
      1 度 = 1 千瓦·时 = 3 600 000 焦耳 —— 一个月用 200 度，写成焦耳是 7.2 亿，没法看。
      所以生活里用「度」，做题和讲物理时用「焦耳」，<b>是同一个东西的两把尺子</b>。
    </div>
    <div class="tip" style="background:var(--card2)">
      功率还有几种写法：<b>1 kW = 1000 W</b>，<b>1 mW = 0.001 W</b>。
      老一辈说电机「几匹马力」：<b>1 马力 ≈ 0.735 kW</b>，反过来 <b>1 kW ≈ 1.36 马力</b>。
      <span class="sub">马力不是标准单位，铭牌上看到的是 kW。</span>
    </div>
  </div>

  <div class="bet" data-bet="c13-cost" data-q="1800W 的电热水壶烧水 10 分钟，和 10W 的 LED 灯亮一整晚（10 小时），哪个更费电？"
       data-opts="电热水壶|LED 灯|差不多" data-right="0"
       data-after="电热水壶：1.8kW × (1/6)h = 0.3 度。LED：0.01kW × 10h = 0.1 度。壶烧 10 分钟就顶灯亮 30 小时。<b>凡是「用电来发热」的东西都是电老虎</b>——电热水壶、电暖气、电饭煲、热水器，功率都是照明的一两百倍。"></div>
</section>

<!-- ================= 场景 2：三种算法 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">一个功率，三个公式，答案永远一样</div>
    P = U·I 是根本；把欧姆定律 U = I·R 代进去，就变出另外两个。
    <b>给你什么条件，就用哪一个</b>。
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns vsw">
        <button class="btn on" data-v="real">实物接线图</button>
        <button class="btn" data-v="sym">电路原理图</button>
      </div>
      <div class="rowlab">电压 U　<b id="s2ulab">220 V</b></div>
      <input type="range" id="s2u" min="12" max="240" step="4" value="220">
      <div class="rowlab" style="margin-top:6px">电阻 R　<b id="s2rlab">44 Ω</b></div>
      <input type="range" id="s2r" min="10" max="200" step="2" value="44">
      <div class="nums">
        <div class="num"><div class="k">电流 I = U ÷ R</div><div class="v" id="s2i">—</div></div>
        <div class="num hi"><div class="k">功率 P</div><div class="v" id="s2p">—</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">什么时候用哪一个</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>手上有什么</th><th>用哪个公式</th><th>典型场合</th></tr></thead>
      <tbody>
        <tr><td>电压和电流</td><td class="eu-s">P = U·I</td><td>钳形表量到电流，电压是已知的 220V</td></tr>
        <tr><td>电流和电阻</td><td class="eu-s">P = I²·R</td><td>算导线上白白损耗掉多少（第 8 章）</td></tr>
        <tr><td>电压和电阻</td><td class="eu-s">P = U²/R</td><td>算电热丝、电阻器实际发多少热</td></tr>
      </tbody>
    </table></div>
  </div>
</section>

<!-- ================= 场景 3：焦耳定律 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">同一根线上，为什么灯丝烫得发光、电线却不怎么热？</div>
    书上第 6 页问的就是这个。答案在焦耳定律里：<b>电流一样，谁的电阻大，谁就发热多。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns vsw">
        <button class="btn on" data-v="real">实物接线图</button>
        <button class="btn" data-v="sym">电路原理图</button>
      </div>
      <div class="rowlab">电流 I　<b id="s3ilab">1.0 A</b>　<span class="sub">（拖大看两边热量怎么变）</span></div>
      <input type="range" id="s3i" min="2" max="30" step="1" value="10">
      <div class="ticks"><span>0.2 A</span><span>3 A</span></div>
      <div class="nums">
        <div class="num"><div class="k">灯丝上（R = 400 Ω）每秒发热</div><div class="v" id="s3qa">—</div></div>
        <div class="num"><div class="k">导线上（R = 0.2 Ω）每秒发热</div><div class="v" id="s3qb">—</div></div>
      </div>
      <div class="btns" style="margin-top:8px">
        <button class="btn" id="s3x2">电流翻一倍试试</button>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">焦耳定律</div>
    <div id="f3"></div>
    <div class="tip">
      <b>注意那个平方。</b>电流变成 2 倍，热量变成 <b>4 倍</b>；变成 3 倍，热量变成 <b>9 倍</b>。
      电线烧起来往往不是慢慢来的 —— 私接一台大功率电器，电流可能只涨了一倍，
      导线上的发热却翻了两番，这就是<b>电气火灾最常见的起因</b>。
    </div>
    <div class="tip" style="background:var(--card2)">
      <b>热效应有用的一面：</b>电饭煲、电烤箱、电磁炉、电熨斗、电暖气 —— 都是故意让电流去发热。<br>
      <b>没用的一面：</b>电动机、电视机外壳发烫，输电线路上白白损耗的电 ——
      这些热量是浪费掉的，还得想办法散出去。<span class="sub">（怎么少损耗？把电压升高、电流降下来 —— 高压输电就是这么来的。）</span>
    </div>
  </div>

  <div class="bet" data-bet="c13-joule" data-q="一根导线上的电流从 10A 变成 20A，导线上的发热量变成原来的几倍？"
       data-opts="2 倍|4 倍|20 倍" data-right="1"
       data-after="Q = I²Rt，电流进公式时是平方。2 的平方是 4。—— 这就是为什么导线要按最大电流选粗细，「差不多能用」在电工这儿不成立。"></div>
</section>

<!-- ================= 场景 4：铭牌 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">铭牌上的 1200W，是「在 220V 下」才成立的</div>
    电器上标的叫<b>额定功率</b>，意思是「在额定电压下工作时的功率」。
    电压不够，功率立刻掉下来 —— 这是修家电时最常用的一条判断。
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="rowlab">实际加在它两端的电压　<b id="s4ulab">220 V</b></div>
      <input type="range" id="s4u" min="150" max="250" step="2" value="220">
      <div class="ticks"><span>150 V</span><span>250 V</span></div>
      <div class="btns">
        <button class="btn" data-u="220">额定 220V</button>
        <button class="btn" data-u="190">电压偏低 190V</button>
        <button class="btn" data-u="240">电压偏高 240V</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">实际功率</div><div class="v" id="s4p">—</div></div>
        <div class="num"><div class="k">占额定的</div><div class="v" id="s4pct">—</div></div>
        <div class="num"><div class="k">电流</div><div class="v" id="s4i">—</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">这一节的四句话</div>
    <ol style="margin:6px 0 0;padding-left:20px;font-size:.87rem;line-height:1.95">
      <li><b>功率 P = U·I</b>，单位瓦（W）；<b>电功 W = P·t</b>，生活里用「度」。</li>
      <li>1 度 = 1 kW·h = 3 600 000 J。</li>
      <li><b>Q = I²Rt</b>：电流平方决定发热。电流翻倍，热量四倍。</li>
      <li>铭牌功率是<b>额定电压下</b>的功率；电压变了，实际功率按 <b>U²/R</b> 变。</li>
    </ol>
  </div>

  <div class="quiz" data-quiz="c1-3">
    <div class="qz" data-q="一台 2000W 的电暖气，每天开 5 小时，一个月（30 天）用多少度电？"
         data-opts="30 度|300 度|3000 度"
         data-right="1"
         data-why="2000W = 2kW；2 × 5 = 10 度/天；10 × 30 = 300 度。按 0.6 元/度就是 180 元一个月——电热类电器是家里最大的电老虎。"></div>
    <div class="qz" data-q="导线上的损耗为什么用 P = I²R 算，而不是 P = U²/R？"
         data-opts="两个公式算出来不一样，I²R 更准|导线上已知的是流过的电流，不是它两端的电压|U²/R 只能用于交流"
         data-right="1"
         data-why="三个公式永远得出同一个数，选哪个只看「你手上有什么条件」。导线是串在电路里的，流过它的电流是已知的，而它两端那点小压降通常没量过，所以用 I²R 最顺手。"></div>
    <div class="qz" data-q="一个标着「220V 1100W」的电炉，接到 110V 上会怎样？"
         data-opts="功率变成一半 550W|功率变成四分之一 275W|完全不工作"
         data-right="1"
         data-why="P = U²/R，电阻不变、电压减半，功率变成 1/4，即 275W。电压和功率不是成正比，是平方关系——这也是为什么电压稍低一点，电热水壶就烧得特别慢。"></div>
    <div class="qz" data-q="下面哪种说法是对的？"
         data-opts="额定功率大的设备，实际耗电一定大|实际功率由设备两端的实际电压和实际电流决定|额定功率就是它每小时的耗电度数"
         data-right="1"
         data-why="额定功率只是「在额定电压下能到多大」，实际耗多少要看它实际工作在什么电压、拉多大电流，还要看开了多久。书上第 6 页最后一句就是这个意思。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 1 章 1.3 节（书内 P5~P7）<br>页面里的家电功率是常见量级估算，具体以你家电器铭牌为准</div>
</section>`,
  /* EC 由外壳传入：是全局 EC 的副本，只把 loop 换成可停版本。
     这里同名遮蔽，所以正文里的 `= EC` 和 `EC.xxx` 都自动走包装版。 */
  init: function(EC){
'use strict';
const {C, Path, Stage, dots, txt, box, tag, head, node, tw,
       battery, lamp, resistor, switchSym, meter, loop, $} = EC;

/* ================= 实物接线图 / 电路原理图 =================
   和 1.2 / 1.4 同一个路子：只换元件画法，位置和标注全不动。
   这一节只有第 2、3 屏是「电路」，第 1 屏（电费柱状图）和第 4 屏（铭牌）不涉及。 */
let VIEW = 'real';
function isReal(){ return VIEW === 'real'; }
function vHead(g, x, y, title){
  EP.heading(g, x, y, title, isReal() ? '（实物接线图）' : '（电路原理图 · 标准符号）');
}
function vCell(g, x, y, w, h){
  if(isReal()) EP.cell(g, x, y, w, h, {horiz:false, pm:false, volt:false});
  else battery(g, x, y, {horiz:false, long:19, short:10, gap:9, pm:false});
}
function vResistor(g, x, y, dia){
  if(isReal()) EP.resistor(g, x, y, {horiz:false, len:38, dia:dia});
  else resistor(g, x, y, {horiz:false, len:38, w:15});
}

let cur = 0;
const scenes = [$('sc0'), $('sc1'), $('sc2'), $('sc3')];
document.getElementById('tabs').addEventListener('click', function(e){
  const b = e.target.closest('.tab'); if(!b) return;
  cur = +b.dataset.i;
  document.querySelectorAll('.tab').forEach(function(t){ t.classList.toggle('on', +t.dataset.i===cur); });
  scenes.forEach(function(s,i){ s.classList.toggle('on', i===cur); });
  window.scrollTo(0,0);
  fitAll();
});
function segAt(path, x, y){
  let best = 0, bd = 1e9;
  for(let s=0; s<=path.len; s+=1){
    const p = path.at(s), d = Math.hypot(p[0]-x, p[1]-y);
    if(d < bd){ bd = d; best = s; }
  }
  return best;
}

/* ================================================================
   场景 1：电费 —— 同样用一小时，谁最费电
   ================================================================ */
const APP = [
  {n:'LED 灯',    w:10,   c:'#5eb0ff', k:'led'},
  {n:'电视',      w:100,  c:'#5eb0ff', k:'tv'},
  {n:'电饭煲',    w:800,  c:'#ff9840', k:'rice'},
  {n:'空调',      w:1200, c:'#ff9840', k:'ac'},
  {n:'电热水壶',  w:1800, c:'#ff6b6b', k:'kettle'}
];
const S1 = { i:0, h:2 };
const st1 = new Stage('cv0', 360, 250);

function draw1(){
  const g = st1.g; st1.clear();
  EP.heading(g, 14, 18, '一个月要多少度电',
             '（每天用 ' + S1.h.toFixed(1) + ' 小时）');

  const maxKwh = 1.8 * S1.h * 30;               /* 电热水壶那根最长 */
  const x0 = 100, x1 = 340, top = 40, bh = 26, gap = 10;
  APP.forEach(function(a, i){
    const y = top + i*(bh+gap);
    const kwh = a.w/1000 * S1.h * 30;
    const w = Math.max(3, (x1-x0) * kwh / maxKwh);
    const on = (i === S1.i);
    box(g, x0, y, x1-x0, bh, 5, C.box, null);
    /* 未选中那几根**不能压到 40% 不透明度**：浅底上混出来是淡橙，
       深底上混出来是暗棕，五根柱子看着像生锈了。深底上要保住色相，
       弱化靠的是「比选中的暗一档」而不是「透出背景」。 */
    box(g, x0, y, w, bh, 5, on ? a.c : a.c + 'bf', null);
    EP.appliance(g, 26, y+bh/2, 0.72, a.k);          /* 画个像那么回事的小图标 */
    txt(g, a.n, x0-8, y+bh/2, {sz:10.5, b:on, c:on ? C.tx : C.tx2, al:'right'});
    const s = kwh.toFixed(1) + ' 度';
    if(w > 60) txt(g, s, x0+w-8, y+bh/2, {sz:10.5, b:1, c:'#fff', al:'right'});
    else       txt(g, s, x0+w+6, y+bh/2, {sz:10.5, b:on, c:C.tx2, al:'left'});
    if(on) head(g, x0-58, y+bh/2, 1, 0, 5, a.c);   /* 左边一个小三角指着选中那行 */
  });

  const a = APP[S1.i];
  const kwh = a.w/1000 * S1.h * 30;
  box(g, 20, 212, 320, 30, 6, C.box, C.boxLine, 1);
  txt(g, a.n + '　' + a.w + ' W × ' + S1.h.toFixed(1) + ' h × 30 天 = ' +
         kwh.toFixed(1) + ' 度 ≈ ' + yuan(kwh*0.6) + ' 元',
      180, 227, {sz:11.5, b:1, c:C.tx});
}

function yuan(v){ return v < 10 ? v.toFixed(1) : v.toFixed(0); }
function note1(){
  const a = APP[S1.i];
  const kwh = a.w/1000 * S1.h;
  $('s1hlab').textContent = S1.h.toFixed(1) + ' 小时';
  $('s1d').textContent = kwh.toFixed(2) + ' 度';
  $('s1m').textContent = (kwh*30).toFixed(1) + ' 度';
  $('s1y').textContent = yuan(kwh*30*0.6) + ' 元';
  const ratio = (APP[4].w / APP[0].w).toFixed(0);
  $('n0').innerHTML =
    '<div class="st">'+a.n+'：'+a.w+' W，每天 '+S1.h.toFixed(1)+' 小时</div>'+
    '每天 '+kwh.toFixed(2)+' 度，一个月约 <span class="key">'+(kwh*30).toFixed(1)+' 度</span>，'+
    '按 0.6 元/度大约 <b>'+yuan(kwh*30*0.6)+' 元</b>。<br>'+
    '看上面那五根条：<b>电热水壶的功率是 LED 灯的 '+ratio+' 倍</b>，条子长度差距一目了然。'+
    '<span class="sub">这就是「电功率」这个量的意义 —— 它决定了你每一秒钟在烧掉多少电。</span>';
}

/* ================================================================
   场景 2：P = UI = I²R = U²/R
   ================================================================ */
const S2 = { U:220, R:44 };
const st2 = new Stage('cv1', 360, 268);

function draw2(){
  const g = st2.g; st2.clear();
  vHead(g, 14, 18, '同一个功率，三种算法');
  const I = S2.U / S2.R, P = S2.U * I;

  /* 电路 */
  const L = { x0:56, x1:300, y0:44, y1:130 };
  const P2 = new Path([[L.x0,78],[L.x0,L.y0],[L.x1,L.y0],[L.x1,L.y1],[L.x0,L.y1],[L.x0,96]]);
  P2.stroke(g, 3, C.wire);
  EP.flow(g, P2, {phase:0, gap:52, kind:'cur',
               skip:[[0,10],[P2.len-10,P2.len],
                     [segAt(P2,L.x1,87)-22, segAt(P2,L.x1,87)+22]]});
  vCell(g, L.x0, 87, 40, 19);
  EP.callout(g, L.x0+9, 87, L.x0+24, 82, 'U = ' + S2.U + ' V', '电源电压',
             {al:'left', color:EP.P.blueD});
  vResistor(g, L.x1, 87, 16);
  EP.callout(g, L.x1-9, 87, L.x1-24, 108, 'R = ' + S2.R + ' Ω', '负载电阻',
             {al:'right', color:EP.P.ink});
  EP.chip(g, 'I = ' + I.toFixed(2) + ' A', 178, L.y0-14, {sz:11, b:1, c:EP.P.amber});

  /* 三行算式，各占一行，绝不并排 */
  const rows = [
    ['P = U × I',  S2.U + ' × ' + I.toFixed(2)],
    ['P = I² × R', I.toFixed(2) + '² × ' + S2.R],
    ['P = U² ÷ R', S2.U + '² ÷ ' + S2.R]
  ];
  rows.forEach(function(r, i){
    const y = 158 + i*32;
    box(g, 20, y, 320, 26, 5, i===0 ? C.accbg : C.card, C.boxLine, 1);
    txt(g, r[0], 30, y+13, {sz:11, b:1, c:C.accD, al:'left'});
    txt(g, r[1], 152, y+13, {sz:11, c:C.tx2, al:'left'});
    txt(g, '= ' + fmtP(P), 330, y+13, {sz:11.5, b:1, c:C.cur, al:'right'});
  });
  txt(g, '三行的答案永远一样 —— 它们是同一个公式换了个样子', 180, 258, {sz:10, c:C.tx3});
}
function fmtP(p){
  return p >= 1000 ? (p/1000).toFixed(2) + ' kW' : p.toFixed(1) + ' W';
}

function note2(){
  const I = S2.U / S2.R, P = S2.U * I;
  $('s2ulab').textContent = S2.U + ' V';
  $('s2rlab').textContent = S2.R + ' Ω';
  $('s2i').textContent = I.toFixed(2) + ' A';
  $('s2p').textContent = fmtP(P);
  $('n1').innerHTML =
    '<div class="st">U = '+S2.U+' V，R = '+S2.R+' Ω</div>'+
    '先用欧姆定律求电流：I = '+S2.U+' ÷ '+S2.R+' = <b>'+I.toFixed(2)+' A</b>；'+
    '再算功率：P = '+S2.U+' × '+I.toFixed(2)+' = <span class="key">'+fmtP(P)+'</span>。<br>'+
    '上面三行分别用三个公式算，<b>结果一个字都不差</b> —— 因为把 U = I·R 代进 P = U·I，'+
    '得到的就是另外两个式子。';
}

/* ================================================================
   场景 3：焦耳定律 —— 灯丝烫、导线不烫
   ================================================================ */
const S3 = { I:1.0 };
const RA = 400, RB = 0.2;         /* 灯丝 / 导线 */
const st3 = new Stage('cv2', 360, 276);

function draw3(){
  const g = st3.g; st3.clear();
  vHead(g, 14, 18, '同一根回路，谁烫谁不烫');
  const qa = S3.I*S3.I*RA, qb = S3.I*S3.I*RB;

  /* 一条串联电路：电源 — 导线 — 灯丝 — 导线 */
  const y = 112;
  const wire = new Path([[36,y],[324,y]]);
  /* 导线按发热程度上色 */
  const hb = Math.min(1, qb/2.4);
  wire.stroke(g, 5, mixHot(hb));
  EP.flow(g, wire, {phase:0, gap:52, kind:'cur', skip:[[90,196]]});

  /* 中间那一段是灯泡本体：灯丝就在玻璃壳里 */
  const ha = Math.min(1, qa/900);
  if(isReal()){
    EP.lampHolder(g, 160, y-6, 30, 15);
    EP.bulb(g, 160, y-26, 15, ha);
  }else lamp(g, 160, y, 15, ha);
  txt(g, '灯泡（灯丝 R = 400 Ω）', 196, y-34, {sz:10.5, b:1, c:C.tx, al:'left'});
  txt(g, '导线 R = 0.2 Ω', 36, y+26, {sz:10.5, c:C.tx2, al:'left'});
  txt(g, '同一根回路，电流处处相同：I = ' + S3.I.toFixed(1) + ' A', 180, 40, {sz:11.5, b:1, c:C.cur});
  txt(g, '（电流一样，热量却差 2000 倍 —— 差在电阻上）', 180, 60, {sz:10, c:C.tx3});

  /* 两根热量条 */
  const bx = 96, bw = 214, hmax = Math.max(qa, 1);
  [['灯丝', qa, '#ff6b6b'], ['导线', qb, '#5eb0ff']].forEach(function(r, i){
    const yy = 156 + i*38;
    txt(g, r[0], bx-8, yy+11, {sz:10.5, c:C.tx2, al:'right'});
    box(g, bx, yy, bw, 22, 5, C.box, null);
    const w = Math.max(2, bw * r[1]/hmax);
    box(g, bx, yy, w, 22, 5, r[2], null);
    const s = r[1] >= 10 ? r[1].toFixed(0) + ' J/s' : r[1].toFixed(2) + ' J/s';
    if(w > 66) txt(g, s, bx+w-8, yy+11, {sz:10.5, b:1, c:'#fff', al:'right'});
    else       txt(g, s, bx+w+6, yy+11, {sz:10.5, b:1, c:C.tx2, al:'left'});
  });
  txt(g, '每秒发出的热量（J/s，也就是瓦）', 180, 246, {sz:10, c:C.tx3});
  txt(g, '灯丝烫到发光，导线只是微温 —— 这就是书上第 6 页那个问题的答案', 180, 264, {sz:9.5, c:C.tx3});
}
/* 冷 → 热 的颜色过渡 */
function mixHot(t){
  t = Math.max(0, Math.min(1, t));
  const r = Math.round(126 + 106*t), gg = Math.round(139 - 69*t), b = Math.round(152 - 112*t);
  return 'rgb('+r+','+gg+','+b+')';
}

function note3(){
  const qa = S3.I*S3.I*RA, qb = S3.I*S3.I*RB;
  $('s3ilab').textContent = S3.I.toFixed(1) + ' A';
  $('s3qa').textContent = qa.toFixed(0) + ' J';
  $('s3qb').textContent = qb.toFixed(2) + ' J';
  $('n2').innerHTML =
    '<div class="st">电流 '+S3.I.toFixed(1)+' A 时</div>'+
    '灯丝每秒发热 <span class="rd">'+qa.toFixed(0)+' 焦耳</span>，'+
    '同一根回路上的导线每秒只发热 <span class="key">'+qb.toFixed(2)+' 焦耳</span>。'+
    '两边电流<b>一模一样</b>，差别全在电阻上（400 Ω 比 0.2 Ω 大 2000 倍）。<br>'+
    '<span class="sub">按「电流翻一倍」那颗按钮：两边的热量都会变成原来的 4 倍，不是 2 倍。</span>';
}

/* ================================================================
   场景 4：额定 vs 实际
   ================================================================ */
const S4 = { U:220 };
const PN = 1200, UN = 220;
const R4 = UN*UN/PN;                 /* ≈ 40.33 Ω */
const st4 = new Stage('cv3', 360, 272);

function draw4(){
  const g = st4.g; st4.clear();
  const P = S4.U*S4.U/R4, pct = P/PN;
  EP.heading(g, 14, 14, '铭牌功率 vs 实际功率');

  /* 铭牌 */
  box(g, 22, 28, 150, 92, 6, C.card, C.metalD, 1.6);
  txt(g, '产 品 铭 牌', 97, 44, {sz:10, c:C.tx3});
  g.save(); g.strokeStyle = C.boxLine; g.lineWidth = 1;
  g.beginPath(); g.moveTo(32, 53); g.lineTo(162, 53); g.stroke(); g.restore();
  txt(g, '额定电压  220 V', 34, 68, {sz:11, c:C.tx, al:'left'});
  txt(g, '额定功率  1200 W', 34, 86, {sz:11, b:1, c:C.tx, al:'left'});
  txt(g, '（电热类，电阻约 40 Ω）', 34, 104, {sz:9, c:C.tx3, al:'left'});

  /* 右边：实际电压表 */
  box(g, 190, 28, 150, 92, 6, '#20262c', '#20262c', 1);
  txt(g, '实际电压', 265, 46, {sz:10, c:C.tx3});
  txt(g, S4.U + ' V', 265, 70, {sz:21, b:1, c:'#5ce08a'});
  txt(g, '实际功率 ' + P.toFixed(0) + ' W', 265, 100, {sz:11.5, b:1, c:'#f0b429'});

  /* 功率条 */
  const bx = 30, bw = 300, by = 138, bh = 24;
  txt(g, '实际功率占额定功率的比例', 180, 128, {sz:10.5, c:C.tx2});
  box(g, bx, by, bw, bh, 5, C.box, C.boxLine, 1);
  const w = Math.min(bw, bw * pct / 1.4);
  const col = pct < 0.85 ? '#5eb0ff' : (pct > 1.12 ? '#ff6b6b' : '#3ecf8e');
  box(g, bx, by, w, bh, 5, col, null);
  txt(g, (pct*100).toFixed(0) + '%', bx + Math.min(bw-30, w) - 8, by+bh/2,
      {sz:11.5, b:1, c:w > 50 ? '#fff' : C.tx2, al:'right'});
  /* 100% 刻度线 */
  const x100 = bx + bw/1.4;
  g.save(); g.strokeStyle = C.tx2; g.lineWidth = 1.4; g.setLineDash([4,3]);
  g.beginPath(); g.moveTo(x100, by-4); g.lineTo(x100, by+bh+4); g.stroke(); g.restore();
  txt(g, '额定 100%', x100, by+bh+15, {sz:9.5, c:C.tx2});

  /* 结论行 */
  let s, c;
  if(pct < 0.85){ s = '电压不够 → 烧不开水、烤不熟、电机带不动负载'; c = C.acc; }
  else if(pct > 1.12){ s = '电压偏高 → 发热超标，寿命大幅缩短甚至烧毁'; c = C.err; }
  else { s = '在额定附近工作，正常'; c = C.ok; }
  txt(g, s, 180, 204, {sz:11, b:1, c:c});
  txt(g, 'P = U² ÷ R = ' + S4.U + '² ÷ ' + R4.toFixed(1) + ' = ' + P.toFixed(0) + ' W',
      180, 228, {sz:11, c:C.tx2});
  /* 这一句原来是写死的「220→190」—— 滑杆停在 220V 时屏幕上就在说一件没发生的事。
     现在按当前电压实算（190V 时仍然是 14% / 25%，和书上对得上）。*/
  const dU = Math.round(Math.abs(S4.U - 220) / 220 * 100);
  const dP = Math.round(Math.abs(pct - 1) * 100);
  txt(g, S4.U === 220
        ? '电压每偏离 1%，功率就偏离约 2% —— 平方关系'
        : '电压' + (S4.U < 220 ? '掉' : '高') + '了 ' + dU + '%（220 → ' + S4.U + '），功率'
          + (S4.U < 220 ? '掉' : '涨') + '了 ' + dP + '% —— 平方关系',
      180, 248, {sz:9.5, c:C.tx3});
}

function note4(){
  const P = S4.U*S4.U/R4, I = S4.U/R4;
  $('s4ulab').textContent = S4.U + ' V';
  $('s4p').textContent = P.toFixed(0) + ' W';
  $('s4pct').textContent = (P/PN*100).toFixed(0) + '%';
  $('s4i').textContent = I.toFixed(2) + ' A';
  const near = Math.abs(P-PN)/PN < 0.05;
  $('n3').innerHTML =
    '<div class="st">实际电压 '+S4.U+' V 时'+
      (near ? '，正好在额定的 1200 W 附近' : '，它只剩 '+P.toFixed(0)+' W')+'</div>'+
    '这台电器的电阻是固定的（约 '+R4.toFixed(0)+' Ω），所以功率跟着电压走：'+
    'P = U² ÷ R。<b>电压是平方进去的</b> —— 220V 掉到 190V（少了 14%），'+
    '功率从 1200W 掉到 '+(190*190/R4).toFixed(0)+'W（少了 25%）。<br>'+
    '<span class="sub">修家电时这条很常用：「加热慢、力气小」先量电压，别急着换零件。</span>';
}

/* ================================================================
   绑定
   ================================================================ */
/* 注意作用域要限死在本场景内：页签也带 data-i，全局选会把页签一起点亮 */
document.getElementById('sc0').addEventListener('click', function(e){
  const b = e.target.closest('.btn[data-i]'); if(!b) return;
  S1.i = +b.dataset.i;
  document.querySelectorAll('#sc0 .btn[data-i]').forEach(function(x){
    x.classList.toggle('on', +x.dataset.i === S1.i);
  });
  note1(); draw1();
});
$('s1h').addEventListener('input', function(e){
  S1.h = +e.target.value / 2; note1(); draw1();
});
$('s2u').addEventListener('input', function(e){ S2.U = +e.target.value; note2(); draw2(); });
$('s2r').addEventListener('input', function(e){ S2.R = +e.target.value; note2(); draw2(); });
$('s3i').addEventListener('input', function(e){ S3.I = +e.target.value/10; note3(); draw3(); });
$('s3x2').addEventListener('click', function(){
  S3.I = Math.min(3, S3.I*2); $('s3i').value = Math.round(S3.I*10); note3(); draw3();
});
$('s4u').addEventListener('input', function(e){ S4.U = +e.target.value; note4(); draw4(); });
document.querySelectorAll('#sc3 [data-u]').forEach(function(b){
  b.addEventListener('click', function(){
    S4.U = +b.dataset.u; $('s4u').value = S4.U; note4(); draw4();
  });
});

$('f1').innerHTML = ElecUI.formula({
  plain:'电功率 = 电压 × 电流（每秒钟用掉多少电能）',
  f:'P = U × I',
  vars:['P','U','I'],
  note:'铭牌上的「1200W」说的就是这个 P。'
});
$('f1b').innerHTML = ElecUI.formula({
  plain:'电功（一共用了多少电）= 功率 × 时间',
  f:'W = U × I × t = P × t',
  vars:['W','P','t'],
  note:'1 度 = 1 千瓦·时 = 3 600 000 焦耳。电费单上的度数就是这么算出来的。'
});
$('f3').innerHTML = ElecUI.formula({
  plain:'发热量 = 电流的平方 × 电阻 × 通电时间',
  f:'Q = I² × R × t',
  vars:[
    {sym:'Q',name:'热量',unit:'焦耳',unitSym:'J',what:'这段时间里发出来的热'},
    'I','R','t'
  ],
  note:'1840 年焦耳做了大量实验后确定的关系。注意 I 是平方 —— 这是整条公式最要命的地方。'
});

document.querySelectorAll('.vsw').forEach(function(row){
  row.addEventListener('click', function(e){
    const b = e.target.closest('.btn'); if(!b) return;
    VIEW = b.dataset.v;
    document.querySelectorAll('.vsw .btn').forEach(function(t){
      t.classList.toggle('on', t.dataset.v === VIEW);
    });
    draw2(); draw3();          /* 这两屏是「按状态重画」的，不在 rAF 里连续跑 */
  });
});

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  draw1(); draw2(); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:1, sec:'1.3'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('1.3');
  let h = '';
  h += nb.prev ? '<a href="'+nb.prev.f+'">‹ '+nb.prev.id+' '+nb.prev.t+'</a>'
               : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next ? '<a class="next" href="'+nb.next.f+'">'+nb.next.id+' '+nb.next.t+' ›</a>'
               : '<span>已经是最后一节</span>';
  $('pager').innerHTML = h;
})();
  }
});
})();
