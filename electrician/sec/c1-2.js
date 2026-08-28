/* 1.2 欧姆定律 —— 本节内容的唯一真相。
   由 c1-2.html 机械拆分而来（正文一个字未改）。
   book.html 按需载入它；c1-2.html 现在只是个薄壳，也载入它。 */
(function(){
'use strict';
ELEC.reg({
  id: '1.2',
  file: 'c1-2.html',
  title: '1.2 欧姆定律',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>加大电压</button>
    <button class="tab" data-i="1"><span class="n">2</span>换大电阻</button>
    <button class="tab" data-i="2"><span class="n">3</span>水管比喻</button>
    <button class="tab" data-i="3"><span class="n">4</span>会算会用</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">整章最有用的一个公式</div>
    电流 I、电压 U、电阻 R 三个量，只要知道两个就能算出第三个。
    这一屏先固定电阻不动，<b>只拧电压</b>，看电流怎么跟着走。
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="rowlab">电源电压 U　<b id="s1ulab">25 V</b>　（电阻固定 10 Ω 不动）</div>
      <input type="range" id="s1u" min="5" max="30" step="1" value="25">
      <div class="ticks"><span>5 V</span><span>30 V</span></div>
      <div class="rowlab">书上第 4 页那三档，点一下直接跳过去：</div>
      <div class="btns" id="s1p">
        <button class="btn" data-u="25">原始电路 25V</button>
        <button class="btn" data-u="30">电压提高 30V</button>
        <button class="btn" data-u="10">电压降低 10V</button>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">这就是欧姆定律</div>
    <div id="f1"></div>
    <div class="tip">
      <b>“成正比”是什么意思？</b>就是一个变成 2 倍，另一个也变成 2 倍。
      上面把 25V 换成 30V（1.2 倍），电流也从 2.5A 变成 3A（正好也是 1.2 倍）。
      <b>不是“电压大电流就大一点”，而是严格按倍数走</b> —— 这一点很多人一直没弄清。
    </div>
  </div>

  <div class="bet" data-bet="c12-double" data-q="电阻不动，把电压从 10V 加到 40V（4 倍），电流会变成原来的几倍？"
       data-opts="2 倍|4 倍|16 倍" data-right="1"
       data-after="I = U/R，分母没变、分子变成 4 倍，结果就是 4 倍。注意：电流是 4 倍，但发热量会变成 16 倍 —— 那是下一节焦耳定律的事。"></div>
</section>

<!-- ================= 场景 2 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">反过来：电压不动，换电阻</div>
    电阻是<b>“拦路的程度”</b>。拦得越狠，同样的电压推出来的电流就越小 —— 这叫<b>成反比</b>。
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="rowlab">电阻 R　<b id="s2rlab">10 Ω</b>　（电压固定 25 V 不动）</div>
      <input type="range" id="s2r" min="5" max="30" step="1" value="10">
      <div class="ticks"><span>5 Ω</span><span>30 Ω</span></div>
      <div class="rowlab">书上第 5 页那三档：</div>
      <div class="btns" id="s2p">
        <button class="btn" data-r="10">原始 10 Ω</button>
        <button class="btn" data-r="20">电阻升高 20 Ω</button>
        <button class="btn" data-r="5">电阻减小 5 Ω</button>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">反比和正比，图形长得不一样</div>
    上一屏那条线是<b>直的</b>（正比）；这一屏是<b>往下弯的曲线</b>（反比）。
    看图的时候记住：<span class="key">直线 = 成正比</span>，
    <span class="key">越来越平的下坡 = 成反比</span>。<br>
    <span class="sub">曲线右边越来越平，说明电阻已经很大时，再加大一点电阻，电流也降不了多少了。</span>
  </div>
</section>

<!-- ================= 场景 3 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">看不见的电，用看得见的水来想</div>
    这个比喻不是随便打的：水塔越高水压越大、管子越细越难流，
    和电压、电阻的关系一模一样。<b>拖下面的滑杆，两边会同时动。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="rowlab">水塔高度 ＝ 电压 U　<b id="s3ulab">25 V</b></div>
      <input type="range" id="s3u" min="5" max="30" step="1" value="25">
      <div class="rowlab" style="margin-top:6px">管子粗细 ＝ 电阻 R　<b id="s3rlab">10 Ω</b>　<span class="sub">（管子越细＝电阻越大）</span></div>
      <input type="range" id="s3r" min="5" max="30" step="1" value="10">
      <div class="nums">
        <div class="num hi"><div class="k">水流量 ＝ 电流 I</div><div class="v" id="s3i">2.50 A</div></div>
        <div class="num"><div class="k">U ÷ R</div><div class="v" id="s3f">25 ÷ 10</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">对应关系，记这三条就够</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>水这边</th><th>电这边</th><th>一句话</th></tr></thead>
      <tbody>
        <tr><td>水塔高度（水压）</td><td class="eu-s">电压 U</td><td>推动力，越高推得越猛</td></tr>
        <tr><td>管子粗细</td><td class="eu-s">电阻 R</td><td>拦阻，管子越细拦得越狠</td></tr>
        <tr><td>每秒流过多少水</td><td class="eu-s">电流 I</td><td>被推出来的结果</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>比喻到哪儿为止？</b>水管里的水会因为管子破了漏到地上，
      电路里的电荷<b>不会漏走</b>，必须绕成一个闭合的圈才流得动 ——
      这就是上一节说的「圈断了，整圈都不动」。
      比喻能帮你想明白大小关系，但<b>“必须成回路”这件事只有电有</b>。
    </div>
  </div>
</section>

<!-- ================= 场景 4 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">一个公式，三种用法</div>
    知道任意两个，就能求第三个。用下面这个三角形：<b>把要求的那个盖住</b>，
    剩下的样子就是算法。
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="rowlab">点一下要求的那个量（或者直接点上面三角形里的字）</div>
      <div class="btns" id="s4pick">
        <button class="btn on" data-k="I">求电流 I</button>
        <button class="btn" data-k="U">求电压 U</button>
        <button class="btn" data-k="R">求电阻 R</button>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">三道拿来就用的算式</div>
    <ol style="margin:6px 0 0;padding-left:20px;font-size:.87rem;line-height:2">
      <li>一个 1100 Ω 的电热丝接在 220V 上：<b>I = 220 ÷ 1100 = 0.2 A</b></li>
      <li>电流 5A 流过某设备，两端量得 220V：<b>R = 220 ÷ 5 = 44 Ω</b></li>
      <li>0.5A 的电流流过 12 Ω 的电阻，两端有多少电压？<b>U = 0.5 × 12 = 6 V</b></li>
    </ol>
    <div class="tip">
      <b>算之前先统一单位。</b>公式里必须是 <b>伏特 V / 安培 A / 欧姆 Ω</b>。
      给的是毫安（mA）要先除以 1000，给的是千欧（kΩ）要先乘以 1000 ——
      单位没换算就代进去，是初学者最常见的错。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">用这个公式算一次触电</div>
    人体也是一个电阻。<b>干燥皮肤大致按 1000~2000 Ω 估，手上有汗或者站在水里会低得多。</b>
    <span class="sub">（这是安全培训里常用的估算范围，不是精确值 —— 人体电阻随皮肤、接触面积、电压高低变化很大。）</span><br>
    按 1000 Ω 算，摸到 220V 火线：<br>
    <div style="font-size:1rem;font-weight:700;color:var(--err);margin:6px 0">I = 220 ÷ 1000 = 0.22 A = 220 mA</div>
    而<b>大约 50 mA 的电流通过人体就可能致命</b>，220 mA 是它的四倍多。
    <span class="sub">所以“摸一下试试有没有电”这个动作，是拿命在赌。第 3 章讲验电器，就是为了让你永远不用手去试。</span>
  </div>

  <div class="quiz" data-quiz="c1-2">
    <div class="qz" data-q="电压不变，把电阻从 10 Ω 换成 20 Ω，电流会怎样？"
         data-opts="也变成 2 倍|变成一半|不变"
         data-right="1"
         data-why="I = U/R，分母翻倍、分子不动，结果就是一半。电阻和电流是反比，一个大另一个就小。"></div>
    <div class="qz" data-q="某电阻两端 12V，流过 0.4A，它的阻值是多少？"
         data-opts="4.8 Ω|30 Ω|0.03 Ω"
         data-right="1"
         data-why="R = U ÷ I = 12 ÷ 0.4 = 30 Ω。注意是电压除以电流，不是相乘（相乘得到的 4.8 是功率的单位瓦，不是欧姆）。"></div>
    <div class="qz" data-q="题目给的是「电阻 2 kΩ，电压 10 V」，代公式前要先做什么？"
         data-opts="把 2 kΩ 换成 2000 Ω|把 10 V 换成 10000 mV|什么都不用做"
         data-right="0"
         data-why="公式里三个量必须都用基本单位：V、A、Ω。2 kΩ = 2000 Ω，所以 I = 10 ÷ 2000 = 0.005 A = 5 mA。"></div>
    <div class="qz" data-q="同样是 220V，为什么湿手触电比干手危险得多？"
         data-opts="湿手时电压会变高|湿手时人体电阻变小，电流变大|湿手时电流方向会反过来"
         data-right="1"
         data-why="电压是电网给的，不会因为你手湿就变。变的是你自己的电阻：水让电阻大幅下降，按 I = U/R，R 变小电流就变大 —— 这正是「潮湿场所必须用漏电保护、必须用安全电压」的原因。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 1 章 1.2 节（书内 P4~P5）<br>书上那六组数值都在页面里可以复现</div>
</section>`,
  /* EC 由外壳传入：是全局 EC 的副本，只把 loop 换成可停版本。
     这里同名遮蔽，所以正文里的 `= EC` 和 `EC.xxx` 都自动走包装版。 */
  init: function(EC){
'use strict';
const {C, Path, Stage, dots, txt, box, tag, head, node, tw,
       battery, lamp, resistor, switchSym, meter, loop, $} = EC;

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

/* ---------- 小折线图：两屏共用 ----------
   box = {x,y,w,h}，f(x) 给曲线，mark 是当前那个点 */
function chart(g, bx, o){
  box(g, bx.x, bx.y, bx.w, bx.h, 6, '#fff', C.boxLine, 1);
  /* 网格 */
  g.save(); g.strokeStyle = '#e8ecf1'; g.lineWidth = 1;
  for(let i=1;i<4;i++){
    const y = bx.y + bx.h*i/4;
    g.beginPath(); g.moveTo(bx.x, y); g.lineTo(bx.x+bx.w, y); g.stroke();
  }
  for(let i=1;i<4;i++){
    const x = bx.x + bx.w*i/4;
    g.beginPath(); g.moveTo(x, bx.y); g.lineTo(x, bx.y+bx.h); g.stroke();
  }
  g.restore();
  /* 曲线 */
  const px = function(v){ return bx.x + bx.w * (v-o.x0)/(o.x1-o.x0); };
  const py = function(v){ return bx.y + bx.h * (1 - (v-o.y0)/(o.y1-o.y0)); };
  g.save(); g.strokeStyle = C.acc; g.lineWidth = 2.4; g.lineJoin='round'; g.lineCap='round';
  g.beginPath();
  for(let i=0;i<=60;i++){
    const xv = o.x0 + (o.x1-o.x0)*i/60, yv = Math.min(o.y1, o.f(xv));
    if(i===0) g.moveTo(px(xv), py(yv)); else g.lineTo(px(xv), py(yv));
  }
  g.stroke(); g.restore();
  /* 当前点 */
  const mx = px(o.mx), my = py(Math.min(o.y1, o.f(o.mx)));
  g.save();
  g.setLineDash([4,3]); g.strokeStyle = C.cur; g.lineWidth = 1.3;
  g.beginPath(); g.moveTo(bx.x, my); g.lineTo(mx, my); g.lineTo(mx, bx.y+bx.h); g.stroke();
  g.restore();
  g.save(); g.fillStyle = C.cur;
  g.beginPath(); g.arc(mx, my, 5, 0, EC.TAU); g.fill(); g.restore();
  /* 轴名 */
  txt(g, o.xlab, bx.x+bx.w/2, bx.y+bx.h+13, {sz:10, c:C.tx3});
  txt(g, o.ylab, bx.x, bx.y-9, {sz:10, c:C.tx3, al:'left'});
}

/* ================================================================
   场景 1：电压对电流的影响（R 固定 10Ω）
   ================================================================ */
const S1 = { U:25, phase:0 };
const st1 = new Stage('cv0', 360, 300);
const L1 = { x0:60, x1:300, y0:44, y1:150 };
const P1 = new Path([[L1.x0,88],[L1.x0,L1.y0],[L1.x1,L1.y0],[L1.x1,L1.y1],[L1.x0,L1.y1],[L1.x0,106]]);

function draw1(dt){
  const g = st1.g; st1.clear();
  EP.heading(g, 20, 18, '固定电阻，只拧电压');
  const I = S1.U / 10;
  S1.phase += I * 30 * dt;

  P1.stroke(g, 3.2, C.wire);
  const sM = 60, sR = 300;
  EP.flow(g, P1, {phase:S1.phase, gap:52, kind:'cur',
               skip:[[0,10],[P1.len-10,P1.len],
                     [segAt(P1,218,L1.y0)-36, segAt(P1,218,L1.y0)+36],
                     [segAt(P1,L1.x1,97)-24, segAt(P1,L1.x1,97)+24]]});

  /* 实物元件：可调直流电源（画成电池组）+ 色环电阻 + 指针电流表 */
  EP.cell(g, L1.x0, 97, 46, 22, {horiz:false, pm:false});
  txt(g, '＋', L1.x0-15, 82, {sz:11, b:1, c:C.err});
  txt(g, '−',  L1.x0-15, 112, {sz:13, b:1, c:C.tx2});
  EP.callout(g, L1.x0+10, 97, L1.x0+26, 92, 'U = ' + S1.U + ' V', '电源电压',
             {al:'left', color:EP.P.blueD});

  EP.panelMeter(g, 176, L1.y0-26, 84, 58, {
    val:I, max:3.2, label:'电流表', valText:I.toFixed(2) + ' A', valSz:12, ticks:4
  });

  EP.resistor(g, L1.x1, 97, {horiz:false, len:40, dia:17,
    bands:['#6b4423', '#1b1b1b', '#1b1b1b', EP.BAND.gold]});
  EP.callout(g, L1.x1-10, 108, L1.x1-26, 126, 'R = 10 Ω', '固定电阻，不动',
             {al:'right', color:EP.P.ink});

  chart(g, {x:46, y:196, w:286, h:84}, {
    x0:0, x1:30, y0:0, y1:3.2, mx:S1.U,
    f:function(u){ return u/10; },
    xlab:'电压 U（V）', ylab:'电流 I（A）　—— 直线，说明成正比'
  });
  txt(g, '0', 46, 292, {sz:9.5, c:C.tx3});
  txt(g, '30V', 332, 292, {sz:9.5, c:C.tx3, al:'right'});
  txt(g, '3.2A', 40, 196, {sz:9.5, c:C.tx3, al:'right'});
}

function segAt(path, x, y){
  let best = 0, bd = 1e9;
  for(let s=0; s<=path.len; s+=1){
    const p = path.at(s), d = Math.hypot(p[0]-x, p[1]-y);
    if(d < bd){ bd = d; best = s; }
  }
  return best;
}

function note1(){
  const I = S1.U/10;
  $('s1ulab').textContent = S1.U + ' V';
  $('n0').innerHTML =
    '<div class="st">现在 U = '+S1.U+' V，R = 10 Ω</div>'+
    'I = U ÷ R = '+S1.U+' ÷ 10 = <span class="key">'+I.toFixed(2)+' A</span>。<br>'+
    '电压拧大一点，下面图上那个橙点就往右上方走 —— 它<b>永远落在那条直线上</b>，'+
    '这就是「成正比」的样子。';
}

/* ================================================================
   场景 2：电阻对电流的影响（U 固定 25V）
   ================================================================ */
const S2 = { R:10, phase:0 };
const st2 = new Stage('cv1', 360, 300);

function draw2(dt){
  const g = st2.g; st2.clear();
  EP.heading(g, 20, 18, '固定电压，只换电阻');
  const I = 25 / S2.R;
  S2.phase += I * 30 * dt;

  P1.stroke(g, 3.2, C.wire);
  EP.flow(g, P1, {phase:S2.phase, gap:52, kind:'cur',
               skip:[[0,10],[P1.len-10,P1.len],
                     [segAt(P1,218,L1.y0)-36, segAt(P1,218,L1.y0)+36],
                     [segAt(P1,L1.x1,97)-24, segAt(P1,L1.x1,97)+24]]});

  EP.cell(g, L1.x0, 97, 46, 22, {horiz:false, pm:false});
  txt(g, '＋', L1.x0-15, 82, {sz:11, b:1, c:C.err});
  txt(g, '−',  L1.x0-15, 112, {sz:13, b:1, c:C.tx2});
  EP.callout(g, L1.x0+10, 97, L1.x0+26, 92, 'U = 25 V', '电源电压，不动',
             {al:'left', color:EP.P.ink});

  EP.panelMeter(g, 176, L1.y0-26, 84, 58, {
    val:I, max:5.2, label:'电流表', valText:I.toFixed(2) + ' A', valSz:12, ticks:4
  });

  /* 阻值越大画得越粗，看得见「拦得越狠」；色环也跟着换 */
  const wR = 12 + S2.R*0.5;
  const b3 = S2.R < 10 ? '#1b1b1b' : (S2.R < 20 ? '#6b4423' : '#c0392b');
  EP.resistor(g, L1.x1, 97, {horiz:false, len:40, dia:wR,
    bands:['#6b4423', '#1b1b1b', b3, EP.BAND.gold]});
  EP.callout(g, L1.x1-10, 108, L1.x1-26, 126, 'R = ' + S2.R + ' Ω', '拖滑杆换阻值',
             {al:'right', color:EP.P.blueD});

  chart(g, {x:46, y:196, w:286, h:84}, {
    x0:5, x1:30, y0:0, y1:5.2, mx:S2.R,
    f:function(r){ return 25/r; },
    xlab:'电阻 R（Ω）', ylab:'电流 I（A）　—— 下弯的曲线，说明成反比'
  });
  txt(g, '5Ω', 46, 292, {sz:9.5, c:C.tx3});
  txt(g, '30Ω', 332, 292, {sz:9.5, c:C.tx3, al:'right'});
  txt(g, '5.2A', 40, 196, {sz:9.5, c:C.tx3, al:'right'});
}

function note2(){
  const I = 25/S2.R;
  $('s2rlab').textContent = S2.R + ' Ω';
  $('n1').innerHTML =
    '<div class="st">现在 U = 25 V，R = '+S2.R+' Ω</div>'+
    'I = 25 ÷ '+S2.R+' = <span class="key">'+I.toFixed(2)+' A</span>。'+
    '注意看右边那个电阻，阻值越大画得越厚 —— <b>拦得越狠，流过去的越少</b>。<br>'+
    '<span class="sub">书上第 5 页：10Ω 时 2.5A，20Ω 时 1.25A，5Ω 时 5A。点上面三档对一对。</span>';
}

/* ================================================================
   场景 3：水管比喻
   ================================================================ */
const S3 = { U:25, R:10, ph:0 };
const st3 = new Stage('cv2', 360, 300);

function draw3(dt){
  const g = st3.g; st3.clear();
  const I = S3.U / S3.R;
  S3.ph += I * 24 * dt;

  txt(g, '水这边', 92, 20, {sz:11, b:1, c:C.tx2});
  txt(g, '电这边', 270, 20, {sz:11, b:1, c:C.tx2});
  g.save(); g.strokeStyle = '#e2e7ec'; g.lineWidth = 1.2;
  g.beginPath(); g.moveTo(182, 28); g.lineTo(182, 286); g.stroke(); g.restore();

  /* ---- 左：水塔 + 管子 ---- */
  const gy = 234;                       /* 地面 */
  const hh = 20 + S3.U * 4.2;           /* 水塔高度随 U */
  const tx0 = 34, tw0 = 46;
  g.save(); g.fillStyle = '#c9d6e2';
  g.fillRect(tx0, gy-hh, tw0, hh); g.restore();
  g.save(); g.fillStyle = '#4a9ad8';
  g.fillRect(tx0+3, gy-hh+8, tw0-6, hh-11); g.restore();
  box(g, tx0, gy-hh, tw0, hh, 3, null, '#8fa3b5', 1.4);
  txt(g, S3.U + ' V', tx0+tw0/2, gy-hh-11, {sz:10.5, b:1, c:C.acc});
  txt(g, '水塔越高＝电压越大', 92, gy-hh-26, {sz:9.5, c:C.tx3});

  /* 管子：粗细随 R 反着来 */
  const pipeW = Math.max(5, 26 - S3.R*0.62);
  const py0 = gy - 26;
  const pipeL = 88;
  g.save(); g.fillStyle = '#dfe6ec';
  g.fillRect(tx0+tw0, py0-pipeW/2, pipeL, pipeW); g.restore();
  g.save(); g.strokeStyle = '#a8b6c3'; g.lineWidth = 1.2;
  g.strokeRect(tx0+tw0, py0-pipeW/2, pipeL, pipeW); g.restore();
  /* 水流小球 */
  const pipe = new Path([[tx0+tw0+4, py0],[tx0+tw0+pipeL, py0]]);
  dots(g, pipe, {phase:S3.ph, gap:16, r:Math.min(3.4, pipeW/2-0.8), color:'#2f86c9'});
  txt(g, '管子越细＝电阻越大', 104, gy+14, {sz:9.5, c:C.tx3});

  g.save(); g.strokeStyle = '#b9a184'; g.lineWidth = 2;
  g.beginPath(); g.moveTo(20, gy); g.lineTo(174, gy); g.stroke(); g.restore();

  /* ---- 右：电路 ---- */
  const ex0 = 208, ex1 = 330, ey0 = 62, ey1 = 236;
  const PE = new Path([[ex0,140],[ex0,ey0],[ex1,ey0],[ex1,ey1],[ex0,ey1],[ex0,158]]);
  PE.stroke(g, 3, C.wire);
  EP.flow(g, PE, {phase:S3.ph, gap:52, kind:'cur',
               skip:[[0,10],[PE.len-10,PE.len],
                     [segAt(PE,ex1,149)-22, segAt(PE,ex1,149)+22]]});
  battery(g, ex0, 149, {horiz:false, long:19, short:10, gap:9, pm:false});
  txt(g, S3.U + ' V', ex0+14, 149, {sz:10.5, b:1, c:C.acc, al:'left'});
  resistor(g, ex1, 149, {horiz:false, len:32, w:Math.max(8, 8+S3.R*0.5)});
  txt(g, S3.R + ' Ω', ex1-16, 149, {sz:10.5, b:1, c:C.tx, al:'right'});

  /* 底部读数 */
  box(g, 20, 262, 320, 30, 6, '#eef2f6', C.boxLine, 1);
  txt(g, '水流量 ＝ 电流 I ＝ ' + S3.U + ' ÷ ' + S3.R + ' ＝ ' + I.toFixed(2) + ' A',
      180, 277, {sz:12, b:1, c:C.cur});
}

function note3(){
  const I = S3.U/S3.R;
  $('s3ulab').textContent = S3.U + ' V';
  $('s3rlab').textContent = S3.R + ' Ω';
  $('s3i').textContent = I.toFixed(2) + ' A';
  $('s3f').textContent = S3.U + ' ÷ ' + S3.R;
  $('n2').innerHTML =
    '<div class="st">两边是同一件事</div>'+
    '把水塔加高（电压变大），水流变急；把管子换细（电阻变大），水流变小。'+
    '<b>电流 = 电压 ÷ 电阻</b>，和你对水的直觉完全一致。<br>'+
    '<span class="sub">现在：'+S3.U+' V ÷ '+S3.R+' Ω = '+I.toFixed(2)+' A。'+
    '试试把水塔拉到最矮、管子拉到最细 —— 水几乎不流了。</span>';
}

/* ================================================================
   场景 4：三角形记忆法
   ================================================================ */
const S4 = { k:'I' };
const st4 = new Stage('cv3', 360, 250);
/* 三角形三个字的位置 */
const TRI = { U:{x:180,y:82}, I:{x:132,y:168}, R:{x:228,y:168} };

function draw4(){
  const g = st4.g; st4.clear();

  /* 三角形外框 */
  const ax = 180, ay = 44, bx = 84, by = 210, cx = 276, cy = 210;
  g.save();
  g.beginPath(); g.moveTo(ax,ay); g.lineTo(bx,by); g.lineTo(cx,cy); g.closePath();
  g.fillStyle = '#f2f6fa'; g.fill();
  g.strokeStyle = C.boxLine; g.lineWidth = 1.6; g.lineJoin='round'; g.stroke();
  /* 中间横线 + 竖线：U 在上，I × R 在下 */
  g.strokeStyle = C.boxLine; g.lineWidth = 1.4;
  g.beginPath(); g.moveTo(112, 128); g.lineTo(248, 128); g.stroke();
  g.beginPath(); g.moveTo(180, 128); g.lineTo(180, 210); g.stroke();
  g.restore();

  ['U','I','R'].forEach(function(k){
    const t = TRI[k], hide = (k === S4.k);
    if(hide){
      box(g, t.x-24, t.y-20, 48, 40, 8, '#d8e4f2', C.acc, 2);
      txt(g, '?', t.x, t.y, {sz:20, b:1, c:C.acc});
    }else{
      txt(g, k, t.x, t.y, {sz:26, b:1, c:C.tx});
    }
  });

  /* 结论条 */
  const f = S4.k === 'I' ? 'I = U ÷ R' : (S4.k === 'U' ? 'U = I × R' : 'R = U ÷ I');
  const w = tw(g, f, 17, true) + 34;
  box(g, 180-w/2, 222, w, 24, 6, C.accbg==='#e8f1fc'?'#e8f1fc':'#e8f1fc', C.acc, 1.4);
  txt(g, f, 180, 234, {sz:15, b:1, c:C.accD});

  txt(g, '盖住要求的那个，剩下的样子就是算法', 180, 24, {sz:10.5, c:C.tx2});
  /* 提示：上下关系 */
  txt(g, '上下 → 除', 316, 100, {sz:9.5, c:C.tx3});
  txt(g, '并排 → 乘', 316, 180, {sz:9.5, c:C.tx3});
}
st4.cv.addEventListener('click', function(ev){
  const p = st4.pick(ev);
  let hit = null;
  ['U','I','R'].forEach(function(k){
    if(Math.abs(p[0]-TRI[k].x) < 34 && Math.abs(p[1]-TRI[k].y) < 30) hit = k;
  });
  if(hit) setPick(hit);
});
function setPick(k){
  S4.k = k;
  document.querySelectorAll('#s4pick .btn').forEach(function(b){ b.classList.toggle('on', b.dataset.k===k); });
  note4(); draw4();
}
document.getElementById('s4pick').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(b) setPick(b.dataset.k);
});
function note4(){
  const m = {
    I:['求电流：把 I 盖住，剩下 U 在上、R 在下 —— 上下就是除',
       'I = U ÷ R', '知道电压和电阻，算这条线路会走多大电流。选线径、选空开都靠它。'],
    U:['求电压：把 U 盖住，剩下 I 和 R 并排 —— 并排就是乘',
       'U = I × R', '知道电流和电阻，算某一段上会掉多少电压（叫「压降」，第 8 章讲长线路时天天用）。'],
    R:['求电阻：把 R 盖住，剩下 U 在上、I 在下',
       'R = U ÷ I', '量出电压和电流，反推这个东西的电阻 —— 判断设备是不是内部短路/断路的常用手段。']
  }[S4.k];
  $('n3').innerHTML = '<div class="st">'+m[0]+'</div>'+
    '<div style="font-size:1.05rem;font-weight:700;color:var(--acc);margin:6px 0">'+m[1]+'</div>'+m[2];
}

/* ================================================================
   绑定
   ================================================================ */
$('s1u').addEventListener('input', function(e){ S1.U = +e.target.value; note1(); });
document.getElementById('s1p').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S1.U = +b.dataset.u; $('s1u').value = S1.U; note1();
});
$('s2r').addEventListener('input', function(e){ S2.R = +e.target.value; note2(); });
document.getElementById('s2p').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S2.R = +b.dataset.r; $('s2r').value = S2.R; note2();
});
$('s3u').addEventListener('input', function(e){ S3.U = +e.target.value; note3(); });
$('s3r').addEventListener('input', function(e){ S3.R = +e.target.value; note3(); });

$('f1').innerHTML = ElecUI.formula({
  plain:'电流 = 电压 ÷ 电阻',
  f:'I = U / R',
  vars:['I','U','R'],
  note:'三个量必须用基本单位：伏特 V、安培 A、欧姆 Ω。给的是 mA 或 kΩ，先换算再代入。'
});

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:1, sec:'1.2'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('1.2');
  let h = '';
  h += nb.prev ? '<a href="'+nb.prev.f+'">‹ '+nb.prev.id+' '+nb.prev.t+'</a>'
               : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next ? '<a class="next" href="'+nb.next.f+'">'+nb.next.id+' '+nb.next.t+' ›</a>'
               : '<span>已经是最后一节</span>';
  $('pager').innerHTML = h;
})();

loop(function(dt){
  if(cur === 0) draw1(dt);
  else if(cur === 1) draw2(dt);
  else if(cur === 2) draw3(dt);
});
  }
});
})();
