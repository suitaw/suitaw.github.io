/* 1.5 直流电与交流电 —— 本节内容的唯一真相。
   由 c1-5.html 机械拆分而来（正文一个字未改）。
   book.html 按需载入它；c1-5.html 现在只是个薄壳，也载入它。 */
(function(){
'use strict';
ELEC.reg({
  id: '1.5',
  file: 'c1-5.html',
  title: '1.5 直流电与交流电',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>直流交流</button>
    <button class="tab" data-i="1"><span class="n">2</span>怎么发出来</button>
    <button class="tab" data-i="2"><span class="n">3</span>220 和 380</button>
    <button class="tab" data-i="3"><span class="n">4</span>几根线</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">两者的区别只有一条：方向变不变</div>
    <b>直流（DC）</b>：电流方向<b>始终不变</b>，大小可以变。<br>
    <b>交流（AC）</b>：大小和方向都<b>按周期来回变</b>。
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1mode">
        <button class="btn on" data-m="dc">恒定直流</button>
        <button class="btn" data-m="pdc">脉动直流</button>
        <button class="btn" data-m="ac">交流 50Hz</button>
      </div>
      <div class="rowlab" id="s1hint">干电池、蓄电池给出的就是恒定直流</div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">三种波形分别在哪儿见到</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>波形</th><th>特征</th><th>哪里有</th></tr></thead>
      <tbody>
        <tr><td>恒定直流</td><td>一条平线，方向大小都不变</td><td>干电池、蓄电池、稳压电源</td></tr>
        <tr><td>脉动直流</td><td>大小起伏，但<b>不过零、不反向</b></td><td>交流整流之后、还没滤波时</td></tr>
        <tr><td>交流</td><td>正弦波，<b>过零并反向</b></td><td>市电 220V/50Hz、发电机输出</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>为什么家里用交流、电子产品里却是直流？</b>
      交流<b>好升压好降压</b>（一个变压器就行），适合远距离送电；
      而芯片、LED、电机驱动这些要稳定的直流。<br>
      所以充电器、适配器干的事就是：<b>220V 交流 → 变压器降压 → 整流 → 滤波 → 平稳的直流</b>。
      <span class="sub">书上第 11 页那张图讲的就是这条链路。</span>
    </div>
  </div>

  <div class="bet" data-bet="c15-dc" data-q="手机充电器插在 220V 插座上，输出给手机的是什么电？"
       data-opts="还是 220V 交流|5V 左右的直流|交流，只是电压低了" data-right="1"
       data-after="充电器内部先用变压器把 220V 交流降到低压交流，再用整流二极管变成脉动直流，最后靠电容滤波变成平稳直流。输出标的「5V⎓2A」里那个符号 ——「一条实线，底下三段短横」—— 就是直流的意思（万一你的手机显示成一个方框，就是字体里没有这个符号，它长的就是这个样子）。"></div>
</section>

<!-- ================= 场景 2 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">交流电不是「设计」出来的，是转出来的</div>
    发电机里转子（磁极）一转，定子线圈就切割磁力线产生电动势。
    <b>转子转一圈，输出正好走完一个正弦周期。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns">
        <button class="btn big go" id="s2run">暂停</button>
        <button class="btn sm" id="s2step">走一小步</button>
      </div>
      <div class="rowlab">转速　<b id="s2slab">正常</b></div>
      <input type="range" id="s2spd" min="1" max="10" step="1" value="4">
      <div class="ticks"><span>很慢</span><span>快</span></div>
      <div class="nums">
        <div class="num"><div class="k">转子转过</div><div class="v" id="s2ang">0°</div></div>
        <div class="num hi"><div class="k">这一刻的电动势</div><div class="v" id="s2e">0 V</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">50Hz 是什么意思</div>
    <div id="f2"></div>
    <div class="tip">
      我国市电是 <b>50 Hz</b>：每秒钟来回变化 50 次，一个周期 <b>1 ÷ 50 = 0.02 秒 = 20 毫秒</b>。<br>
      这也意味着：<b>每秒钟电流方向要反转 100 次</b>（一个周期反向两次），
      而且每秒有 100 个瞬间电压正好是 0。
      <span class="sub">日光灯的「频闪」就是这么来的；也是为什么交流触电比同样电压的直流更容易造成心室颤动。</span>
    </div>
  </div>
</section>

<!-- ================= 场景 3 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">为什么是 220 和 380，不是 220 和 440</div>
    三相电的三个绕组，彼此错开 <b>120°</b>。
    两根相线之间的电压不是简单相加 —— <b>点下面的按钮，看波形自己说话。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3pick">
        <button class="btn on" data-p="AN">L1 对零线 N</button>
        <button class="btn" data-p="AB">L1 对 L2</button>
      </div>
      <div class="nums">
        <div class="num hi"><div class="k">有效值（表量到的）</div><div class="v" id="s3rms">220 V</div></div>
        <div class="num"><div class="k">峰值（最高那一下）</div><div class="v" id="s3pk">311 V</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">这两个数怎么来的</div>
    <div id="f3"></div>
    <div class="tip">
      <b>「有效值」是什么？</b>交流电的电压时刻在变，说「多少伏」得有个统一口径。
      有效值的定义是：<b>让同一个电阻发出同样多的热，需要多大的直流电压</b>。
      220V 交流和 220V 直流，烧水一样快 —— 这就是有效值。<br>
      <span class="sub">万用表交流档、铭牌上的 220V/380V，写的全都是有效值。峰值 311V 只在算耐压、选元件时才用。</span>
    </div>
    <div class="tip" style="background:var(--card2)">
      <b>380 ÷ 220 ≈ 1.732 = √3</b>。这个数字来自 120° 的相位差，
      不是凑出来的。<b>三相电动机铭牌上的 380V，指的就是线电压。</b>
    </div>
  </div>

  <div class="bet" data-bet="c15-380" data-q="两根相线之间是 380V，一根相线对零线是 220V。为什么不是 220+220=440V？"
       data-opts="因为有损耗|因为两个正弦峰不在同一时刻，错开了 120°|因为零线也带电" data-right="1"
       data-after="L1 最高的时候 L2 并没有到最低，它们错开 120°。两条正弦相减的结果，幅值是单相的 √3 ≈ 1.732 倍：220 × 1.732 ≈ 380V。"></div>
</section>

<!-- ================= 场景 4 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">从「几根线」看懂一个配电系统</div>
    看图第一件事是数线、认颜色。<b>L 相线（火线）、N 零线、PE 保护地线</b> ——
    这三个字母以后天天见。
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4pick">
        <button class="btn on" data-i="0">单相两线</button>
        <button class="btn" data-i="1">单相三线</button>
      </div>
      <div class="btns">
        <button class="btn" data-i="2">三相四线</button>
        <button class="btn" data-i="3">三相五线</button>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">零线断了，比火线断了危险得多</div>
    火线断了，设备不工作，人一眼就发现。<b>零线断了，设备也不工作，
    可外壳、插座的零线孔上却可能带着接近 220V 的电压</b> ——
    因为它通过设备内部绕组还连着火线。<br>
    书上第 15 页专门提了这条：三相四线制里零线过长、阻抗过大或者断线时，
    <b>零线会带上危险电位</b>，这也是三相五线制要把「工作零线 N」和「保护线 PE」分开的原因。
    <span class="sub">所以「查线路先查零线」是老电工的习惯，不是玄学。</span>
  </div>

  <div class="quiz" data-quiz="c1-5">
    <div class="qz" data-q="下面哪一个是直流电的特征？"
         data-opts="电流方向不随时间做周期性变化|电压一定恒定不变|一定来自电池"
         data-right="0"
         data-why="直流的定义只管方向：方向不变就是直流，大小可以起伏（那叫脉动直流）。直流也可以来自整流电路、直流发电机，不一定是电池。"></div>
    <div class="qz" data-q="我国市电 50Hz，一个周期是多长时间？"
         data-opts="50 秒|0.02 秒|0.5 秒"
         data-right="1"
         data-why="周期 T = 1 ÷ f = 1 ÷ 50 = 0.02 秒，也就是 20 毫秒。频率是「每秒来回多少次」，周期是「一次要多久」，两者互为倒数。"></div>
    <div class="qz" data-q="三相四线制里那根 N 线（零线）的作用是？"
         data-opts="接地保护人身安全|作为工作零线，让单相设备取得 220V|备用，平时不接"
         data-right="1"
         data-why="N 是工作零线，单相 220V 就是相线对它取得的。保护接地是 PE 线的活儿。把两者混为一谈，正是三相五线制要分开 N 和 PE 的原因。"></div>
    <div class="qz" data-q="家里量到火线对地 220V，零线对地却量到 100 多伏。最可能是什么问题？"
         data-opts="正常现象|零线接触不良或断线|电压表坏了"
         data-right="1"
         data-why="正常时零线电位接近 0。量到较高电压，说明零线这条回路断了或接触不良，设备内部把火线的电位「串」到了零线上。这种情况碰零线也会触电，必须先断电再查。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 1 章 1.5 节（书内 P10~P17）<br>波形都是按 50Hz、220V 有效值实时算出来的</div>
</section>`,
  /* EC 由外壳传入：是全局 EC 的副本，只把 loop 换成可停版本。
     这里同名遮蔽，所以正文里的 `= EC` 和 `EC.xxx` 都自动走包装版。 */
  init: function(EC){
'use strict';
const {C, Path, Stage, dots, txt, box, tag, head, node, tw,
       battery, lamp, resistor, switchSym, meter, loop, $} = EC;

const RT2 = Math.SQRT2, PK = 220*RT2;      /* 相电压峰值 ≈ 311V */

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

/* 画一块坐标纸：返回把数值换成像素的两个函数 */
function grid(g, bx, y0, y1, zeroLab){
  box(g, bx.x, bx.y, bx.w, bx.h, 6, C.box, C.boxLine, 1);
  const py = function(v){ return bx.y + bx.h * (1 - (v-y0)/(y1-y0)); };
  g.save(); g.strokeStyle = '#1b232d'; g.lineWidth = 1;
  for(let i=1;i<6;i++){
    const x = bx.x + bx.w*i/6;
    g.beginPath(); g.moveTo(x, bx.y); g.lineTo(x, bx.y+bx.h); g.stroke();
  }
  g.restore();
  /* 0 线 */
  if(y0 < 0){
    g.save(); g.strokeStyle = '#78828d'; g.lineWidth = 1.2;
    g.beginPath(); g.moveTo(bx.x, py(0)); g.lineTo(bx.x+bx.w, py(0)); g.stroke(); g.restore();
    txt(g, zeroLab || '0', bx.x-6, py(0), {sz:9.5, c:C.tx3, al:'right'});
  }
  return py;
}

/* ================================================================
   场景 1：直流 / 脉动直流 / 交流
   ================================================================ */
const S1 = { m:'dc', t:0 };
const st1 = new Stage('cv0', 360, 300);

function draw1(dt){
  const g = st1.g; st1.clear();
  EP.heading(g, 14, 16, '方向变不变');
  S1.t += dt;

  /* ---- 上半：一根导线 + 小球，看方向 ---- */
  const y = 62;
  const wire = new Path([[36,y],[324,y]]);
  wire.stroke(g, 4, C.wire);
  resistor(g, 180, y, {horiz:true, len:36, w:15});
  txt(g, '负载', 180, y-22, {sz:10, c:C.tx3});

  let phase, arrow;
  if(S1.m === 'ac'){
    /* 交流：小球原地来回摆（真实电子就是这样，并不整圈跑） */
    const a = Math.sin(S1.t * 2*Math.PI * 1.0);       /* 放慢到 1Hz 才看得清 */
    phase = a * 26;
    arrow = a;
  }else{
    phase = (S1.t * 60) % 24;
    arrow = 1;
  }
  EP.flow(g, wire, {phase:phase, gap:52, kind:'cur', skip:[[126,162]]});
  if(Math.abs(arrow) > 0.06){
    const dir = arrow > 0 ? 1 : -1;
    head(g, 300, y-20, dir, 0, 7, C.cur);
    head(g, 60,  y-20, dir, 0, 7, C.cur);
    txt(g, dir > 0 ? '电流向右' : '电流向左', 180, y-40, {sz:11, b:1, c:C.cur});
  }else{
    txt(g, '这一瞬间电流为 0，正在换方向', 180, y-40, {sz:11, b:1, c:C.tx3});
  }

  /* ---- 下半：波形 ---- */
  const bx = {x:46, y:112, w:288, h:120};
  const isAC = S1.m === 'ac';
  const py = grid(g, bx, isAC ? -1.25 : -0.25, 1.25, '0');
  g.save();
  g.strokeStyle = isAC ? C.acc : (S1.m === 'pdc' ? '#f0a020' : C.ok);
  g.lineWidth = 2.6; g.lineJoin='round'; g.lineCap='round';
  g.beginPath();
  for(let i=0;i<=200;i++){
    const u = i/200;                         /* 0..1 横向 */
    let v;
    if(S1.m === 'dc') v = 1;
    else if(S1.m === 'pdc') v = Math.abs(Math.sin(u*Math.PI*3)) * 0.55 + 0.42;
    else v = Math.sin(u*Math.PI*4);
    const x = bx.x + bx.w*u;
    if(i===0) g.moveTo(x, py(v)); else g.lineTo(x, py(v));
  }
  g.stroke(); g.restore();

  txt(g, '电压 / 电流', bx.x, bx.y-9, {sz:10, c:C.tx3, al:'left'});
  txt(g, '时间 →', bx.x+bx.w, bx.y+bx.h+13, {sz:10, c:C.tx3, al:'right'});

  const info = {
    dc:  ['恒定直流：一条平线', '大小不变、方向不变。干电池、蓄电池就是这样。', C.ok],
    pdc: ['脉动直流：起伏，但从不越过 0 线', '大小在变，方向始终没变 —— 所以它仍然是直流。', '#f0a020'],
    ac:  ['交流：过零、反向、周而复始', '每 20 毫秒（50Hz）走完一整圈：正半周 → 0 → 负半周 → 0。', C.acc]
  }[S1.m];
  box(g, 20, 248, 320, 42, 6, '#1b232d', C.boxLine, 1);
  txt(g, info[0], 180, 264, {sz:11.5, b:1, c:info[2]});
  txt(g, info[1], 180, 281, {sz:10, c:C.tx2});
}
function note1(){
  const m = {
    dc:['恒定直流（DC）','方向不变、大小也不变。<b>电池是最典型的恒定直流源</b>，'+
        '正极永远是正极。手电筒、遥控器、汽车 12V 蓄电池都是它。',
        '干电池、蓄电池给出的就是恒定直流'],
    pdc:['脉动直流：还是直流','大小在起伏，<b>但一次都没有越过 0 线、没有反向</b>，所以它属于直流。<br>'+
        '交流经过整流二极管之后就是这个样子，再用电容一滤波，就变成平稳的直流了。',
        '整流之后、滤波之前，就是这个波形'],
    ac:['交流（AC）：50 次/秒 来回变','看上面那根导线：小球在<b>原地来回摆</b>，并不是绕着圈跑。'+
        '这正是交流电里电子的真实运动 —— 来回振动，把能量一路传过去。<br>'+
        '我国市电就是 <b>220V / 50Hz</b> 的正弦交流。',
        '市电就是这个：220V、50Hz 正弦波']
  }[S1.m];
  $('n0').innerHTML = '<div class="st">'+m[0]+'</div>'+m[1];
  $('s1hint').textContent = m[2];
}

/* ================================================================
   场景 2：发电机怎么转出正弦
   ================================================================ */
const S2 = { ang:0, run:true, spd:4 };
const st2 = new Stage('cv1', 360, 300);

function draw2(dt){
  const g = st2.g; st2.clear();
  EP.heading(g, 14, 16, '转子转一圈 = 一个周期');
  if(S2.run) S2.ang = (S2.ang + dt * S2.spd * 40) % 360;
  const rad = S2.ang * Math.PI/180;
  const e = Math.sin(rad);

  /* ---- 左：发电机 ---- */
  const cx = 84, cy = 108, R = 56;
  g.save();
  g.beginPath(); g.arc(cx, cy, R, 0, EC.TAU);
  g.fillStyle = '#1b232d'; g.fill();
  g.strokeStyle = C.metalD; g.lineWidth = 2; g.stroke();
  g.beginPath(); g.arc(cx, cy, R-16, 0, EC.TAU);
  g.strokeStyle = '#c3cad2'; g.lineWidth = 1.2; g.stroke();
  g.restore();
  /* 定子线圈（左右两块） */
  [[-1,'A'],[1,'X']].forEach(function(a){
    box(g, cx + a[0]*(R-9) - 7, cy-19, 14, 38, 4, '#d8c07a', '#a8904e', 1.2);
  });
  /* 转子磁极 */
  g.save();
  g.translate(cx, cy); g.rotate(rad);
  box(g, -12, -34, 24, 30, 4, '#ff6a4a', '#e05540', 1.2);
  txt(g, 'N', 0, -19, {sz:12, b:1, c:'#fff'});
  box(g, -12, 4, 24, 30, 4, '#4ea3ff', '#2b7fd0', 1.2);
  txt(g, 'S', 0, 19, {sz:12, b:1, c:'#fff'});
  g.restore();
  txt(g, '转子（磁极）', cx, cy+R+14, {sz:10, c:C.tx3});
  txt(g, '定子线圈', cx, cy-R-12, {sz:10, c:C.tx3});

  /* ---- 右：波形，笔尖跟着转子 ---- */
  const bx = {x:168, y:52, w:166, h:112};
  const py = grid(g, bx, -1.2, 1.2, '0');
  g.save();
  g.strokeStyle = C.acc; g.lineWidth = 2.4; g.lineJoin='round';
  g.beginPath();
  for(let i=0;i<=180;i++){
    const a = i*2;                                   /* 0..360° */
    const x = bx.x + bx.w * a/360;
    if(i===0) g.moveTo(x, py(Math.sin(a*Math.PI/180)));
    else g.lineTo(x, py(Math.sin(a*Math.PI/180)));
  }
  g.stroke(); g.restore();
  const mx = bx.x + bx.w * S2.ang/360, my = py(e);
  g.save(); g.fillStyle = C.cur;
  g.beginPath(); g.arc(mx, my, 5, 0, EC.TAU); g.fill();
  g.setLineDash([3,3]); g.strokeStyle = C.cur; g.lineWidth = 1.2;
  g.beginPath(); g.moveTo(mx, my); g.lineTo(mx, py(0)); g.stroke();
  g.restore();
  ['0°','180°','360°'].forEach(function(s, i){
    txt(g, s, bx.x + bx.w*i/2, bx.y+bx.h+12, {sz:9, c:C.tx3});
  });
  txt(g, '输出电动势', bx.x, bx.y-9, {sz:10, c:C.tx3, al:'left'});

  /* ---- 下：读数与说明 ---- */
  box(g, 20, 188, 320, 44, 6, '#1b232d', C.boxLine, 1);
  txt(g, '转过 ' + S2.ang.toFixed(0) + '°　　这一刻电动势 = ' +
         (e<0?'−':'') + Math.abs(e*PK).toFixed(0) + ' V（峰值 ' + PK.toFixed(0) + ' V）',
      180, 204, {sz:11, b:1, c:C.tx});
  let ph;
  if(S2.ang < 90) ph = '正在往正的最大值走';
  else if(S2.ang < 180) ph = '从正的最大值往回落';
  else if(S2.ang < 270) ph = '已经反向了，往负的最大值走';
  else ph = '从负的最大值回到 0，一圈快走完了';
  txt(g, ph, 180, 222, {sz:10.5, c:C.tx2});

  txt(g, 'N 极转到线圈跟前 → 正半周；S 极转过来 → 负半周', 180, 252, {sz:10, c:C.tx3});
  txt(g, '所以「方向来回变」不是设计出来的，是转子转出来的', 180, 272, {sz:10, c:C.tx3});
  txt(g, '转一圈 = 一个周期 = 20 毫秒（50Hz）', 180, 290, {sz:10, b:1, c:C.acc});
}
function note2(){
  $('s2ang').textContent = S2.ang.toFixed(0) + '°';
  const ev = Math.sin(S2.ang*Math.PI/180)*PK;
  $('s2e').textContent = (ev<0 ? '−' : '') + Math.abs(ev).toFixed(0) + ' V';
  $('s2slab').textContent = ['很慢','慢','偏慢','正常','稍快','快','更快','很快','极快','最快'][S2.spd-1];
  $('n1').innerHTML =
    '<div class="st">一圈 = 一个周期</div>'+
    '转子的 N 极靠近线圈时，感应电动势往一个方向增大；转过 180° 换成 S 极靠近，'+
    '电动势就<b>反过来</b>。转子匀速转，输出的波形就是<b>正弦波</b>。<br>'+
    '<b>点「走一小步」可以一格一格看</b>：0° 时电动势为 0（磁极正好在中间，'+
    '切割最慢），90° 时最大。<span class="sub">书上第 12~13 页画的就是这个过程。</span>';
}

/* ================================================================
   场景 3：220 与 380
   ================================================================ */
const S3 = { p:'AN', t:0 };
const st3 = new Stage('cv2', 360, 306);

function draw3(dt){
  const g = st3.g; st3.clear();
  EP.heading(g, 14, 16, '三相错开 120°');
  S3.t += dt;

  /* ---- 上：三相波形 ---- */
  const bx = {x:44, y:34, w:290, h:104};
  const py = grid(g, bx, -1.9, 1.9, '0');
  const cols = ['#e8b93c', '#4fc04a', '#ff6b6b'];   /* 国标：L1 黄 L2 绿 L3 红 */
  const names = ['L1', 'L2', 'L3'];
  for(let k=0;k<3;k++){
    g.save();
    g.strokeStyle = cols[k];
    g.globalAlpha = (S3.p === 'AN' && k > 0) ? 0.28 : ((S3.p === 'AB' && k === 2) ? 0.28 : 1);
    g.lineWidth = 2.2; g.lineJoin = 'round';
    g.beginPath();
    for(let i=0;i<=240;i++){
      const a = i*3 - k*120;
      const x = bx.x + bx.w*i/240;
      const v = Math.sin(a*Math.PI/180);
      if(i===0) g.moveTo(x, py(v)); else g.lineTo(x, py(v));
    }
    g.stroke(); g.restore();
    txt(g, names[k], bx.x + bx.w - 86 + k*26, bx.y - 9, {sz:10, b:1, c:cols[k], al:'left'});
  }
  /* 选中的那条差值波形 */
  if(S3.p === 'AB'){
    g.save();
    g.strokeStyle = '#b07ce8'; g.lineWidth = 2.8; g.lineJoin='round';
    g.setLineDash([]);
    g.beginPath();
    for(let i=0;i<=240;i++){
      const a = i*3;
      const x = bx.x + bx.w*i/240;
      const v = Math.sin(a*Math.PI/180) - Math.sin((a-120)*Math.PI/180);
      if(i===0) g.moveTo(x, py(v)); else g.lineTo(x, py(v));
    }
    g.stroke(); g.restore();
    txt(g, 'L1−L2 的差', bx.x + bx.w - 4, bx.y - 9, {sz:10, b:1, c:'#b07ce8', al:'right'});
  }

  /* ---- 下：星形接线 ---- */
  const cx = 96, cy = 214, r = 46;
  const ang = [-90, 30, 150];
  ang.forEach(function(a, k){
    const rad = a*Math.PI/180;
    const ex = cx + Math.cos(rad)*r, ey = cy + Math.sin(rad)*r;
    g.save(); g.strokeStyle = cols[k]; g.lineWidth = 3; g.lineCap='round';
    g.beginPath(); g.moveTo(cx, cy); g.lineTo(ex, ey); g.stroke(); g.restore();
    node(g, ex, ey, {r:4, color:cols[k]});
    txt(g, names[k], ex + Math.cos(rad)*15, ey + Math.sin(rad)*13, {sz:10.5, b:1, c:cols[k]});
  });
  node(g, cx, cy, {r:5, color:'#5b6672'});
  txt(g, 'N 中性点', cx, cy+18, {sz:10, c:C.tx2});
  /* 标题只能到 x≈85 —— 再长就撞上正上方那个 L1 标签（截图抓到的）*/
  txt(g, '星形接法', 20, cy-r-16, {sz:10, c:C.tx3, al:'left'});

  /* 右边说明 */
  const on = S3.p === 'AN';
  box(g, 176, 168, 164, 92, 6, on ? '#152536' : '#241a33', on ? C.acc : '#b07ce8', 1.4);
  txt(g, on ? '相电压 U相' : '线电压 U线', 258, 186, {sz:11, b:1, c:on ? C.accD : '#8e5cc8'});
  txt(g, on ? '相线 L1 ↔ 零线 N' : '相线 L1 ↔ 相线 L2', 258, 204, {sz:10, c:C.tx2});
  txt(g, on ? '220 V' : '380 V', 258, 228, {sz:21, b:1, c:on ? C.accD : '#8e5cc8'});
  txt(g, on ? '家里插座就是这个' : '= 220 × √3 = 380', 258, 250, {sz:10, c:C.tx2});

  txt(g, '两条正弦错开 120°，所以差值的幅值是单相的 √3 倍，不是 2 倍',
      180, 282, {sz:10, c:C.tx3});
  txt(g, '√3 ≈ 1.732　　220 × 1.732 ≈ 381 ≈ 380', 180, 300, {sz:10.5, b:1, c:C.tx2});
}
function note3(){
  const on = S3.p === 'AN';
  $('s3rms').textContent = on ? '220 V' : '380 V';
  $('s3pk').textContent  = on ? PK.toFixed(0) + ' V' : (PK*Math.sqrt(3)).toFixed(0) + ' V';
  $('n2').innerHTML = on
    ? '<div class="st">相电压：一根相线对零线</div>'+
      '这就是你家插座上的 <span class="key">220V</span>。'+
      '三相里任意一根火线对零线，都是 220V。<br>'+
      '<b>照明、插座、家电全都接在「一相 + 零线」上</b> —— 所以叫单相 220V。'
    : '<div class="st">线电压：两根相线之间</div>'+
      '紫色那条就是 L1 与 L2 <b>逐时刻相减</b>的结果。'+
      '它的幅值明显比单条大，但<b>远没有两倍</b> —— 有效值是 <span class="key">380V</span>。<br>'+
      '<b>三相电动机、大功率设备接的就是它。</b>'+
      '<span class="sub">看波形：L1 到达最高点时，L2 并不在最低点，而是在半路上。</span>';
}

/* ================================================================
   场景 4：供电制式
   ================================================================ */
const SYS = [
  { n:'单相两线制', lines:[['L','相线（火线）',C.L],['N','零线（淡蓝）','#6fb8ff']],
    d:'最简单的一种：一根相线 + 一根零线，取得 220V。老房子的照明线路常见。',
    warn:'没有 PE 线，设备外壳没法接地 —— 一旦漏电，外壳就带电。现在新装线路不允许这么做。' },
  { n:'单相三线制', lines:[['L','相线（火线）',C.L],['N','零线（淡蓝）','#6fb8ff'],['PE','保护地线',C.PE]],
    d:'在两线基础上加一根 PE 保护地线，接到设备金属外壳。这是现在住宅插座的标准做法。',
    warn:'三孔插座上面那个孔就是 PE。它平时不通电流，专门给漏电电流一条回大地的路，配合漏保跳闸。' },
  { n:'三相四线制', lines:[['L1','相线 1（黄）','#e8b93c'],['L2','相线 2（绿）','#4fc04a'],
                          ['L3','相线 3（红）','#ff6b6b'],['N','零线（淡蓝）','#6fb8ff']],
    d:'三根相线 + 一根零线。相线之间 380V，相线对零线 220V —— 动力和照明可以混合供电。',
    warn:'零线过长、阻抗过大或者断线时，零线会带上危险电位。书上第 15 页专门警示过这一条。' },
  { n:'三相五线制', lines:[['L1','相线 1（黄）','#e8b93c'],['L2','相线 2（绿）','#4fc04a'],
                          ['L3','相线 3（红）','#ff6b6b'],['N','工作零线','#6fb8ff'],['PE','保护零线',C.PE]],
    d:'把零线的两个作用彻底分开：N 只负责走工作电流，PE 只负责保护接地。',
    warn:'这是目前施工现场和新建工程的强制要求。PE 与 N 分开之后，N 上的压降不会串到设备外壳上。' }
];
const S4 = { i:0 };
const st4 = new Stage('cv3', 360, 278);

function draw4(){
  const g = st4.g; st4.clear();
  const s = SYS[S4.i];
  EP.heading(g, 14, 16, s.n, '（数线、认颜色）');

  /* 左：配电箱 */
  box(g, 22, 42, 62, 152, 6, '#1e262f', C.metalD, 1.6);
  txt(g, '配', 53, 96, {sz:12, b:1, c:C.tx2});
  txt(g, '电', 53, 118, {sz:12, b:1, c:C.tx2});
  txt(g, '箱', 53, 140, {sz:12, b:1, c:C.tx2});

  /* 右：用电设备 */
  box(g, 268, 62, 72, 118, 6, '#1e262f', C.metalD, 1.6);
  txt(g, '用电', 304, 106, {sz:11, c:C.tx2});
  txt(g, '设备', 304, 128, {sz:11, c:C.tx2});

  /* 中间的线：一定要落在两个箱子重叠的那段高度里，否则看着没接上 */
  const n = s.lines.length;
  const dy = Math.min(26, 104/n);
  const y0 = 121 - dy*(n-1)/2;
  s.lines.forEach(function(L, i){
    const y = y0 + i*dy;
    g.save();
    g.strokeStyle = L[2]; g.lineWidth = 3.4; g.lineCap='round';
    if(L[0] === 'PE'){                      /* PE 画成黄绿双色 */
      g.strokeStyle = C.PE;
      g.beginPath(); g.moveTo(84, y); g.lineTo(268, y); g.stroke();
      g.setLineDash([7,7]); g.strokeStyle = C.PE2;
      g.beginPath(); g.moveTo(84, y); g.lineTo(268, y); g.stroke();
    }else{
      g.beginPath(); g.moveTo(84, y); g.lineTo(268, y); g.stroke();
    }
    g.restore();
    txt(g, L[0], 176, y-9, {sz:10, b:1, c:L[0]==='PE' ? '#4fc04a' : L[2]});
  });

  /* 图例 */
  let ly = 206;
  s.lines.forEach(function(L, i){
    const x = 26 + (i%2)*168, yy = ly + Math.floor(i/2)*20;
    g.save();
    g.lineWidth = 3.4; g.lineCap='round';
    if(L[0] === 'PE'){                      /* 图例里也画成黄绿双色，和线上保持一致 */
      g.strokeStyle = C.PE;
      g.beginPath(); g.moveTo(x, yy); g.lineTo(x+18, yy); g.stroke();
      g.setLineDash([5,5]); g.strokeStyle = C.PE2;
      g.beginPath(); g.moveTo(x, yy); g.lineTo(x+18, yy); g.stroke();
    }else{
      g.strokeStyle = L[2];
      g.beginPath(); g.moveTo(x, yy); g.lineTo(x+18, yy); g.stroke();
    }
    g.restore();
    txt(g, L[0] + '　' + L[1], x+24, yy, {sz:10, c:C.tx2, al:'left'});
  });

  txt(g, '国标线色：相线 黄/绿/红　零线 淡蓝　保护线 黄绿双色',
      180, 270, {sz:9.5, c:C.tx3});
}
function note4(){
  const s = SYS[S4.i];
  $('n3').innerHTML =
    '<div class="st">'+s.n+'　共 '+s.lines.length+' 根线</div>'+
    s.d + '<br><div class="tip" style="margin-top:8px"><b>要注意的：</b>' + s.warn + '</div>';
}
document.getElementById('s4pick').parentElement.addEventListener('click', function(e){
  const b = e.target.closest('.btn[data-i]'); if(!b) return;
  S4.i = +b.dataset.i;
  document.querySelectorAll('#sc3 .btn[data-i]').forEach(function(x){
    x.classList.toggle('on', +x.dataset.i === S4.i);
  });
  note4(); draw4();
});

/* ================================================================
   绑定
   ================================================================ */
document.getElementById('s1mode').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S1.m = b.dataset.m; S1.t = 0;
  document.querySelectorAll('#s1mode .btn').forEach(function(x){ x.classList.toggle('on', x===b); });
  note1();
});
$('s2run').addEventListener('click', function(){
  S2.run = !S2.run;
  $('s2run').textContent = S2.run ? '暂停' : '继续转';
  $('s2run').classList.toggle('go', !S2.run);
});
$('s2step').addEventListener('click', function(){
  S2.run = false; $('s2run').textContent = '继续转'; $('s2run').classList.add('go');
  S2.ang = (S2.ang + 15) % 360; note2();
});
$('s2spd').addEventListener('input', function(e){ S2.spd = +e.target.value; note2(); });
document.getElementById('s3pick').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S3.p = b.dataset.p;
  document.querySelectorAll('#s3pick .btn').forEach(function(x){ x.classList.toggle('on', x===b); });
  note3();
});

$('f2').innerHTML = ElecUI.formula({
  plain:'周期 = 1 ÷ 频率（转一圈要多久）',
  f:'T = 1 / f',
  vars:[
    {sym:'T',name:'周期',unit:'秒',unitSym:'s',what:'来回变化一整圈所用的时间'},
    'f'
  ],
  note:'f = 50 Hz → T = 1/50 = 0.02 s = 20 ms。日本东部和美国部分地区用 60Hz，周期是 16.7ms。'
});
$('f3').innerHTML = ElecUI.formula({
  plain:'线电压 = 相电压 × 根号3　　（√3 ≈ 1.732）',
  f:'U线 = √3 × U相',
  vars:[
    {sym:'U线',name:'线电压',unit:'伏特',unitSym:'V',what:'两根相线之间的电压，我国是 380V'},
    {sym:'U相',name:'相电压',unit:'伏特',unitSym:'V',what:'一根相线对零线的电压，我国是 220V'}
  ],
  note:'√3 这个系数来自三相彼此错开 120°。380 ÷ 220 = 1.727，和 √3 = 1.732 只差在取整上。'
});

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:1, sec:'1.5'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('1.5');
  let h = '';
  h += nb.prev ? '<a href="'+nb.prev.f+'">‹ '+nb.prev.id+' '+nb.prev.t+'</a>'
               : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next ? '<a class="next" href="'+nb.next.f+'">'+nb.next.id+' '+nb.next.t+' ›</a>'
               : '<span>已经是最后一节</span>';
  $('pager').innerHTML = h;
})();

loop(function(dt){
  if(cur === 0) draw1(dt);
  else if(cur === 1){ draw2(dt); if(S2.run) note2(); }
  else if(cur === 2) draw3(dt);
});
  }
});
})();
