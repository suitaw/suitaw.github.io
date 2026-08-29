/* 1.1 电路基础 —— 本节内容的唯一真相。
   由 c1-1.html 机械拆分而来（正文一个字未改）。
   book.html 按需载入它；c1-1.html 现在只是个薄壳，也载入它。 */
(function(){
'use strict';
ELEC.reg({
  id: '1.1',
  file: 'c1-1.html',
  title: '1.1 电路基础',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>电流</button>
    <button class="tab" data-i="1"><span class="n">2</span>电动势</button>
    <button class="tab" data-i="2"><span class="n">3</span>电位</button>
    <button class="tab" data-i="3"><span class="n">4</span>电压</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">先说一句人话</div>
    电线里跑的是<b>电子</b>。电子挤着往一个方向走，这件事本身就叫<b>电流</b>。
    下面这个圈就是书上第 1 页那张图：电池、开关、灯泡。
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns vsw">
        <button class="btn on" data-v="real">实物接线图</button>
        <button class="btn" data-v="sym">电路原理图</button>
      </div>
      <div class="btns">
        <button class="btn big go" id="s1sw">合上开关</button>
        <button class="btn sm" id="s1rst">秒表归零</button>
      </div>
      <div class="rowlab">电流大小　<b id="s1ilab">2 A</b></div>
      <input type="range" id="s1i" min="1" max="5" step="1" value="2">
      <div class="ticks"><span>1 A</span><span>5 A</span></div>
      <label class="chk"><input type="checkbox" id="s1ele" checked>显示电子（蓝色，真正在动的东西）</label>
      <label class="chk"><input type="checkbox" id="s1cur" checked>显示电流方向（橙色，人为规定的）</label>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">电流强度：怎么把“电流大不大”变成一个数</div>
    <div id="f1"></div>
    <div class="tip">
      <b>为什么小球是一颗颗的？</b>因为电荷本来就是一颗颗的。
      1 库仑（C）大约是 62 亿亿个电子所带的电荷 —— 数字大得没法想象，
      所以我们不数电子，只数“库仑”。上面那个圈里，每个小球就当成 1 库仑。
    </div>
    <div class="tip" style="background:var(--card2)">
      <b>安培（A）不是唯一的尺子。</b>
      量小电流用毫安（mA）、微安（μA），量大电流用千安（kA）：<br>
      1 kA = 1000 A　　1 mA = 0.001 A　　1 μA = 0.000001 A<br>
      <span class="sub">手机充电器约 2 A；家里一个空开 16~32 A；人体触电 50 mA 就可能致命 —— 这条第 3 章还会再算一遍。</span>
    </div>
  </div>

  <div class="bet" data-bet="c11-dir" data-q="电子从电池负极出发往外跑，那书上标的“电流方向”是哪一边？"
       data-opts="跟电子同一个方向|跟电子正好相反|两个方向都有" data-right="1"
       data-after="早在人们知道电子之前，就先把电流方向定死成“正电荷流动的方向”了。后来发现真正在动的是带负电的电子 —— 方向正好反了，但规定已经用了一百多年，改不动，就一直沿用到今天。"></div>
  <div data-bet-for="c11-dir">
    <div class="note">
      <div class="st good">所以记住这一条就够了</div>
      <b>电流方向 = 电子实际运动方向的反方向。</b>
      在外电路（电池外面那一圈）里，电流是从<b>正极</b>流出、经过灯泡、回到<b>负极</b>；
      而电子恰好反着走。<br>
      <span class="sub">干活时你用的永远是“电流方向”这一套，电子怎么走不用管 ——
      但知道它是反的，以后看到“电子流”三个字才不会懵。</span>
    </div>
  </div>
</section>

<!-- ================= 场景 2：电动势 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">这一屏回答一个问题</div>
    同样一节 1.5V 的电池，为什么<b>接的东西越费电、量出来的电压反而越低</b>？
    答案在电池<b>里面</b>：它自己也有电阻。
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns vsw">
        <button class="btn on" data-v="real">实物接线图</button>
        <button class="btn" data-v="sym">电路原理图</button>
      </div>
      <div class="rowlab">外面接的电阻 R　<b id="s2rlab">5.0 Ω</b>　<span id="s2hint">（数值越小＝越费电）</span></div>
      <input type="range" id="s2r" min="2" max="60" step="1" value="50">
      <div class="ticks"><span>0.2 Ω 很费电</span><span>6 Ω 很省电</span></div>
      <div class="btns">
        <button class="btn" id="s2open">断开开关看看</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">电流 I</div><div class="v" id="s2i">—</div></div>
        <div class="num hi"><div class="k">路端电压 U路</div><div class="v" id="s2u">—</div></div>
        <div class="num"><div class="k">内部损耗 U内</div><div class="v" id="s2ur">—</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">电动势 E：电池的“本事”，不是它给出去的电压</div>
    <div id="f2"></div>
    <div id="f2b" style="margin-top:8px"></div>
    <div class="tip">
      <b>一句话分清 E 和 U。</b>
      E 是电池<b>本来能给</b>的（1.5V 就是 1.5V，用不完就是这么多）；
      U路 是<b>实际送出门</b>的。中间被自家内阻 r 吃掉的那一口，就是 U内。<br>
      电池用旧了内阻 r 会变大 —— 空载量还是 1.5V，一接上灯泡电压就垮下来，
      <b>这就是“电池没劲了”的物理原因</b>。
    </div>
  </div>

  <div class="bet" data-bet="c11-emf" data-q="把开关断开（外面什么都不接），这时候用表量电池两端，读数是多少？"
       data-opts="0V，没接东西当然没电压|1.5V，正好等于电动势|比 1.5V 小一点" data-right="1"
       data-after="断开时电流为 0，内阻上就不损耗（U内 = I × r = 0），于是 U路 = E = 1.5V。所以“空载电压”量出来最漂亮，接上负载才见真章。"></div>
</section>

<!-- ================= 场景 3：电位 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">这一屏是全章最容易绕晕的地方</div>
    <b>电位（φ）没有绝对值，全看你把哪一点当 0。</b>
    就像说“三楼”—— 从地面数是三楼，从地下车库数就是五楼，楼还是那栋楼。
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns vsw">
        <button class="btn on" data-v="real">实物接线图</button>
        <button class="btn" data-v="sym">电路原理图</button>
      </div>
      <div class="rowlab">把哪一点当作 <b>0 V 参考点</b>（书上叫“零电位点”）</div>
      <div class="btns" id="s3ref">
        <button class="btn on" data-p="A">A 点</button>
        <button class="btn" data-p="B">B 点</button>
        <button class="btn" data-p="C">C 点</button>
        <button class="btn" data-p="D">D 点</button>
      </div>
      <div class="nums">
        <div class="num"><div class="k">D 点电位 φ<sub>D</sub></div><div class="v" id="s3d">—</div></div>
        <div class="num"><div class="k">C 点电位 φ<sub>C</sub></div><div class="v" id="s3c">—</div></div>
        <div class="num"><div class="k">B 点电位 φ<sub>B</sub></div><div class="v" id="s3b">—</div></div>
        <div class="num"><div class="k">A 点电位 φ<sub>A</sub></div><div class="v" id="s3a">—</div></div>
      </div>
      <div class="num hi" style="margin-top:8px">
        <div class="k">不管选哪个参考点，D 和 A 之间的电压 U<sub>DA</sub></div>
        <div class="v" id="s3u">1.5 V（永远不变）</div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="bet" data-bet="c11-phi" data-q="以 C 点作参考点时，A 点的电位是多少？（先自己在上面那张图上数一数）"
       data-opts="+1 V|−1 V|0.5 V" data-right="1"
       data-after="A 比 C 低两个电阻，也就是低 1V，所以写作 −1V。比参考点低的点要写成负数 —— 这是书上明确列出的易错点，不能写成 1V 再口头说“低”。"></div>
  <div data-bet-for="c11-phi">
    <div class="note">
      <div class="st warn">这一条以后天天用</div>
      电工干活时，<b>大地（或者说零线、机壳）就是那个默认的 0V 参考点</b>。
      说“火线 220V”，完整说法是“<b>火线相对大地</b>是 220V”。<br>
      所以站在地上摸火线会触电，而鸟站在一根线上不会 —— 不是电线没电，
      是<b>鸟两只脚之间</b>那一小段的电位差几乎为零。<span class="sub">（这一条在「回路、大地与触电」那一课里有专门的动画）</span>
    </div>
  </div>
</section>

<!-- ================= 场景 4：电压 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">电压是“两点之间”的事</div>
    问“这里电压多少”是一句没说完的话 —— 必须问<b>哪两点之间</b>。
    下面把两支表笔拖到不同的点上试试，这正是万用表的用法。
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns vsw">
        <button class="btn on" data-v="real">实物接线图</button>
        <button class="btn" data-v="sym">电路原理图</button>
      </div>
      <div class="rowlab"><b>用手指拖动红、黑两支表笔</b>，松手会自动吸附到最近的接线点</div>
      <div class="btns">
        <button class="btn" data-set="C,A">测整个电池（C→A）</button>
        <button class="btn" data-set="C,B">只测 R1（C→B）</button>
      </div>
      <div class="btns">
        <button class="btn" data-set="B,A">只测 R2（B→A）</button>
        <button class="btn" data-set="A,C">红黑反着接</button>
      </div>
      <div class="nums">
        <div class="num hi"><div class="k">万用表读数 U = φ<sub>红</sub> − φ<sub>黑</sub></div><div class="v" id="s4u">—</div></div>
        <div class="num"><div class="k">红笔在　/　黑笔在</div><div class="v" id="s4p">—</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">这一节的三句话</div>
    <div id="f3"></div>
    <ol style="margin:8px 0 0;padding-left:20px;font-size:.86rem;line-height:1.85">
      <li><b>电流</b>是电荷在跑，方向规定成电子的反方向，单位安培（A）。</li>
      <li><b>电动势 E</b> 是电源的本事；<b>路端电压 U路</b> 才是它实际送出来的，差的那口被内阻吃了。</li>
      <li><b>电位</b>是相对的，<b>电压</b>是两个电位之差 —— 电压永远问“哪两点之间”。</li>
    </ol>
  </div>

  <div class="quiz" data-quiz="c1-1">
    <div class="qz" data-q="导线里真正在移动的是什么？"
         data-opts="正电荷|电子（带负电）|电流本身是一种物质"
         data-right="1"
         data-why="金属导线里能自由跑的是电子，带负电。“电流”不是一种东西，它是“电荷在定向移动”这件事的量度。"></div>
    <div class="qz" data-q="一节新电池空载量得 1.5V，接上小灯泡后量只有 1.2V。最可能的原因是？"
         data-opts="表坏了|电池内阻上损耗掉了 0.3V|灯泡把电压吃掉了一半"
         data-right="1"
         data-why="接上负载后电路里有了电流，电流流过电池自身的内阻 r 就会产生内压降 U内 = I×r。E = U路 + U内，1.5 = 1.2 + 0.3。电池越旧 r 越大，这个差值越明显。"></div>
    <div class="qz" data-q="有人说“这根线上的电位是 220V”。这句话缺了什么？"
         data-opts="没说是交流还是直流|没说以哪一点作 0V 参考|没说电流多大"
         data-right="1"
         data-why="电位是相对的，不说参考点就没有意义。工程上默认以大地为 0V，所以完整的说法是“这根线相对大地是 220V”。"></div>
    <div class="qz" data-q="1.5V 电池带两个阻值相同的电阻串联。把红表笔搭在中点、黑表笔搭在电池负极，读数是多少？"
         data-opts="1.5V|0.75V|0V"
         data-right="1"
         data-why="两个相同的电阻平分 1.5V，各 0.75V。表读的是“红笔电位 − 黑笔电位”，中点比负极高 0.75V。这就是场景 4 里「只测 R2」那一档。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 1 章 1.1 节（书内 P1~P4）<br>公式与数值都照书核对过</div>
</section>`,
  /* EC 由外壳传入：是全局 EC 的副本，只把 loop 换成可停版本。
     这里同名遮蔽，所以正文里的 `= EC` 和 `EC.xxx` 都自动走包装版。 */
  init: function(EC){
'use strict';
const {C, Path, Stage, dots, flowArrows, txt, box, tag, head, node,
       battery, lamp, resistor, switchSym, meter, dimV, loop, $} = EC;

/* ================= 标签页 ================= */
let cur = 0;
const scenes = [$('sc0'), $('sc1'), $('sc2'), $('sc3')];
document.getElementById('tabs').addEventListener('click', e=>{
  const b = e.target.closest('.tab'); if(!b) return;
  cur = +b.dataset.i;
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('on', +t.dataset.i===cur));
  scenes.forEach((s,i)=>s.classList.toggle('on', i===cur));
  window.scrollTo(0,0);
  fitAll();
});

/* ================================================================
   场景 1：电流 —— 实物接线图 / 电路原理图 两个视图
   书上每张图都是 a) 实物连接 + b) 电路原理两张并排，这里做成可以切。
   实物那半用 elec-parts.js 里的真元件画（干电池、灯泡带灯丝、闸刀开关、
   带绝缘皮的导线），符号那半是标准电路符号 —— 上班拿到手的是后者。
   ================================================================ */
const S1 = { on:false, I:2, phase:0, t:0, Q:0, ele:true, cur:true };
const st1 = new Stage('cv0', 360, 336);

/* ---------- 实物版的走线（真接线那样拐直角）---------- */
const RB = {x:98, y:214, len:78, dia:30};              /* 干电池 */
/* ================================================================
   实物接线图 / 电路原理图
   ================================================================
   他的第 3 条：「只有实物图，没有电路原理图……只要有电路实物图的地方，
   就要有电路原理图」。这一节原来只有场景 1 能切（还是自己一套 S1.view），
   场景 2/3/4 一直只有实物图。

   现在四屏共用**一个模块级 VIEW**，和 1.2/1.3/1.4 一个路子：
   只换元件的画法，位置 / 导线 / 电流点 / 标注一个都不动 ——
   同一个电路摆在同一个地方，两种画法一一对得上，识图练的就是这个。 */
let VIEW = 'real';
function isReal(){ return VIEW === 'real'; }
function vCell(g, x, y, w, h, o){
  o = o || {};
  if(isReal()) EP.cell(g, x, y, w, h, Object.assign({horiz:false, pm:false}, o));
  else battery(g, x, y, {horiz:false, long:20, short:11, gap:10, pm:false});
}
function vRes(g, x, y, len, dia, bands){
  if(isReal()) EP.resistor(g, x, y, {horiz:false, len:len, dia:dia, bands:bands});
  else resistor(g, x, y, {horiz:false, len:len + 8, w:15});
}
function vSw(g, x, y, on, w){
  if(isReal()) EP.knife(g, x, y, on, {w:w});
  else switchSym(g, x, y, on, {len:w*0.7});
}

const RK = {x:150, y:62, w:64, h:26};                  /* 闸刀开关 */
const RL = {x:288, y:96, r:21};                        /* 灯泡 */
const RH = {x:288, y:120, w:36, h:17};                 /* 灯座 */
const KX0 = 150-64/2+10;      /* 闸刀左端接线柱 */
const W1 = [[RB.x+RB.len/2, RB.y], [KX0, RB.y], [KX0, RK.y]];
const W2 = [[RK.x+RK.w/2-10, RK.y], [232, RK.y], [232, RH.y+RH.h-5], [RH.x-RH.w/2+6, RH.y+RH.h-5]];
const W3 = [[RH.x+RH.w/2-6, RH.y+RH.h-5], [336, RH.y+RH.h-5], [336, 256], [RB.x-RB.len/2, 256],
            [RB.x-RB.len/2, RB.y]];
const PR1 = new Path(W1), PR2 = new Path(W2), PR3 = new Path(W3);
const PALL = new Path(W1.concat(W2).concat(W3));
/* 三段导线首尾之间的两处跳变（开关、灯座），小球要跳过它们 */
function endGap(a, b){
  const p = a[a.length-1], q = b[0];
  return Math.hypot(q[0]-p[0], q[1]-p[1]);
}
const GAP1 = [PR1.len, PR1.len + endGap(W1, W2)];
const GAP2 = [GAP1[1] + PR2.len, GAP1[1] + PR2.len + endGap(W2, W3)];

/* ---------- 符号版的回路 ---------- */
const R1 = { x0:56, x1:302, y0:68, y1:196 };
const BY = 132;
const P1 = new Path([
  [R1.x0, BY-9], [R1.x0, R1.y0], [R1.x1, R1.y0],
  [R1.x1, R1.y1], [R1.x0, R1.y1], [R1.x0, BY+9]
]);
const SWX = 128, LPX = 240, CUTX = 176;

function segAt(path, x, y){
  let best = 0, bd = 1e9;
  for(let s=0; s<=path.len; s+=1){
    const p = path.at(s), d = Math.hypot(p[0]-x, p[1]-y);
    if(d < bd){ bd = d; best = s; }
  }
  return best;
}
const sSw = segAt(P1, SWX, R1.y0), sLp = segAt(P1, LPX, R1.y0);

function draw1(dt){
  const g = st1.g; st1.clear();
  if(S1.on){
    S1.phase += S1.I * 26 * dt;
    S1.t += dt; S1.Q = S1.I * S1.t;
  }
  (isReal() ? drawReal1 : drawSym1)(g);
  panel1(g);
}

/* ================= 实物接线图 ================= */
function drawReal1(g){
  const b = S1.on ? 0.42 + 0.12*S1.I : 0;

  EP.heading(g, 20, 24, '实物接线图', '（电子真实在动）');

  /* 导线用实验室里的真实颜色：接正极那根红、回负极那根黑。
     通电不改变导线颜色 —— 通电只体现在粒子和灯丝上（设计规范定死的） */
  EP.wire(g, PR1, {c:'red'});
  EP.wire(g, PR2, {c:'black'});
  EP.wire(g, PR3, {c:'black'});

  /* 电子（蓝点，实际方向）和电流（琥珀箭头，规定方向）分开画、错开半格 */
  const skip = [GAP1, GAP2];
  if(S1.ele)
    EP.flow(g, PALL, {phase:S1.on ? -S1.phase : 0, kind:'ele', gap:56, r:3.4,
                      color:S1.on ? EP.P.ele : '#c3cad2', skip:skip});
  if(S1.cur)
    EP.flow(g, PALL, {phase:S1.on ? S1.phase + 28 : 15, kind:'cur', gap:56,
                      color:S1.on ? EP.P.amber : '#3a4551', skip:skip});

  /* 元件 */
  EP.cell(g, RB.x, RB.y, RB.len, RB.dia, {horiz:true});
  EP.callout(g, RB.x - 8, RB.y - RB.dia/2, RB.x - 34, RB.y - 40,
             '1.5 V', '干电池', {al:'right', color:EP.P.ink});

  EP.knife(g, RK.x, RK.y, S1.on, {w:RK.w});
  EC.hot(g, RK.x, RK.y, 30);
  /* 标签放开关**下方**：断开时拨杆往右上抬，放上面必被穿过去（截图抓到的）。
     下面压着那根竖导线，所以用 tag —— 它自带深色底板，压在线上也读得清。 */
  tag(g, '开关', RK.x, RK.y + 22, {sz:10.5, b:1, c:EP.P.inkL});
  tag(g, S1.on ? '闭合 · 拨杆接实' : '断开 · 留着空气间隙', RK.x, RK.y + 42,
      {sz:9.5, c:EP.P.inkLL});

  EP.lampHolder(g, RH.x, RH.y, RH.w, RH.h);
  EP.bulb(g, RL.x, RL.y, RL.r, b);
  EP.callout(g, RL.x - RL.r*0.7, RL.y + RL.r*0.6, RL.x - 54, RL.y + 46,
             '灯泡', S1.on ? '正在发光' : '没通电', {al:'right', color:EP.P.ink});

  /* 截面标记 */
  const cx = 214;
  g.save();
  g.strokeStyle = S1.on ? EP.P.blue : EP.P.inkLL; g.lineWidth = 1.4; g.setLineDash([4,3]);
  g.beginPath(); g.moveTo(cx, 240); g.lineTo(cx, 272); g.stroke();
  g.restore();
  EP.chip(g, '截面', cx, 236, {sz:9.5, c:EP.P.inkL});
}

/* ================= 电路原理图 ================= */
function drawSym1(g){
  EP.heading(g, 20, 24, '电路原理图', '（上班拿到手的就是这种）');

  P1.stroke(g, 2.8, EP.P.ink);
  if(!S1.on){
    g.save(); g.strokeStyle = C.bg; g.lineWidth = 5;
    g.beginPath(); g.moveTo(SWX-17, R1.y0); g.lineTo(SWX+17, R1.y0); g.stroke(); g.restore();
  }
  g.save();
  g.strokeStyle = S1.on ? EP.P.blue : EP.P.inkLL; g.lineWidth = 1.4; g.setLineDash([4,3]);
  g.beginPath(); g.moveTo(CUTX, R1.y1-12); g.lineTo(CUTX, R1.y1+12); g.stroke();
  g.restore();
  EP.chip(g, '截面', CUTX, R1.y1+24, {sz:9.5, c:EP.P.inkL});

  const skip = [[sSw-18, sSw+18], [sLp-19, sLp+19], [0, 9], [P1.len-9, P1.len]];
  if(S1.ele)
    EP.flow(g, P1, {phase:S1.on ? -S1.phase : 0, kind:'ele', gap:56, r:3.4,
                    color:S1.on ? EP.P.ele : '#c3cad2', skip:skip});
  if(S1.cur)
    EP.flow(g, P1, {phase:S1.on ? S1.phase + 28 : 15, kind:'cur', gap:56,
                    color:S1.on ? EP.P.amber : '#3a4551', skip:skip});

  battery(g, R1.x0, BY, {horiz:false, long:19, short:10, gap:9, pm:false});
  txt(g, '＋', 42, BY-11, {sz:11, b:1, c:EP.P.red});
  txt(g, '−',  42, BY+11, {sz:13, b:1, c:EP.P.inkL});
  EP.callout(g, R1.x0, BY, R1.x0 + 22, BY, '1.5 V', '电池', {al:'left'});

  switchSym(g, SWX, R1.y0, S1.on, {len:34});
  EC.hot(g, SWX, R1.y0, 26);
  /* 标注放**下方**：断开时刀片从左端往右上抬，正上方那一片全被它扫过
     （和闸刀开关 EP.knife 那条坑同源） */
  txt(g, '开关', SWX, R1.y0 + 18, {sz:10.5, b:1, c:EP.P.inkL});
  txt(g, S1.on ? '（闭合）' : '（断开）', SWX, R1.y0 + 31,
      {sz:10, c: EP.P.inkL});

  lamp(g, LPX, R1.y0, 15, S1.on ? 0.42 + 0.12*S1.I : 0);
  txt(g, '灯泡 EL', LPX, R1.y0+34, {sz:10, c:EP.P.inkL});
}

/* ================= 读数面板 + 图例（两个视图共用）================= */
function panel1(g){
  /* 图例：蓝点=电子，琥珀箭头=电流 */
  const items = [];
  if(S1.ele) items.push(['电子（真实在动）', EP.P.ele, 'dot']);
  if(S1.cur) items.push(['电流方向（规定）', EP.P.amber, 'arrow']);
  if(items.length) EP.legend(g, 180, 278, items);

  box(g, 16, 292, 328, 40, 8, S1.on ? C.accbg : C.card, C.boxLine, 1);
  if(S1.on){
    txt(g, 'I = ' + S1.Q.toFixed(1) + ' C ÷ ' + S1.t.toFixed(1) + ' s = ' + S1.I + ' A',
        180, 306, {sz:13.5, b:1, c:EP.P.blueD});
    txt(g, '秒表 ' + S1.t.toFixed(1) + ' 秒　·　通过截面 ' + S1.Q.toFixed(1) + ' 库仑',
        180, 322, {sz:EP.TYPE.name.sz, c:EP.TYPE.name.c});
  }else{
    txt(g, '电路是断开的　I = 0 A', 180, 306, {sz:13.5, b:1, c:EP.P.red});
    txt(g, '整圈电荷原地不动', 180, 322, {sz:EP.TYPE.name.sz, c:EP.TYPE.name.c});
  }
}

function note1(){
  const v = isReal()
    ? '<span class="sub">现在看的是<b>实物接线图</b> —— 干电池、闸刀开关、灯泡和带绝缘皮的导线，'+
      '跟你在配电箱里见到的东西对得上。切到「电路原理图」看同一个电路的标准画法。</span>'
    : '<span class="sub">现在看的是<b>电路原理图</b> —— 每个元件换成了标准符号。'+
      '上班拿到的图纸全都是这种，<b>两种图能对上号是识图的第一步</b>。</span>';
  $('n0').innerHTML = (S1.on
    ? '<div class="st good">通了 —— 这一圈叫「通路」</div>'+
      '开关一合上，圈就闭合了，电子被电池推着<b>整圈一起动</b>（不是从电池慢慢爬到灯泡），'+
      '所以按下开关灯是立刻亮的。<br>'+
      '现在电流是 <span class="key">'+S1.I+' A</span>：意思是<b>每一秒</b>有 '+S1.I+
      ' 库仑的电荷挤过导线的那个截面。把滑杆拉大，小球又密又快 —— 那就是电流变大。<br>'
    : '<div class="st bad">断了 —— 这叫「断路」</div>'+
      '注意看：圈一断，<b>整圈的电荷全部停住</b>，不是只有断点附近停。'+
      '电荷是被“推”的，推不动就哪儿都不动，所以断一处等于整条路作废。<br>'
  ) + v;
}

/* ================================================================
   场景 2：电动势 E = U路 + U内
   ================================================================ */
const S2 = { R:5.0, open:false, phase:0 };
const E0 = 1.5, r0 = 0.5;
const st2 = new Stage('cv1', 360, 306);
const R2 = { x0:62, x1:300, y0:52, y1:168 };
const P2 = new Path([[R2.x0,95],[R2.x0,R2.y0],[R2.x1,R2.y0],[R2.x1,R2.y1],[R2.x0,R2.y1],[R2.x0,113]]);
const SW2 = 180;

function calc2(){
  if(S2.open) return { I:0, Ur:0, Ui:0 };
  const I = E0 / (S2.R + r0);
  return { I:I, Ur:I*S2.R, Ui:I*r0 };
}

function draw2(dt){
  const g = st2.g; st2.clear();
  const v = calc2();
  if(!S2.open) S2.phase += v.I * 46 * dt;

  EP.heading(g, 20, 24, '电池内部也有电阻', '（看它吃掉多少）');

  /* 导线 */
  EP.wire(g, P2, {c:'black'});
  if(S2.open){
    g.save(); g.strokeStyle = C.bg; g.lineWidth = 6;
    g.beginPath(); g.moveTo(SW2-20, R2.y0); g.lineTo(SW2+20, R2.y0); g.stroke(); g.restore();
  }

  const sSw2 = segAt(P2, SW2, R2.y0), sR = segAt(P2, R2.x1, 110);
  const skip = [[0,14],[P2.len-14,P2.len],[sSw2-22,sSw2+22],[sR-26,sR+26]];
  if(!S2.open){
    EP.flow(g, P2, {phase:-S2.phase, kind:'ele', gap:56, r:3.4, skip:skip});
    EP.flow(g, P2, {phase:S2.phase + 28, kind:'cur', gap:56, skip:skip});
  }

  /* 电池内部：虚线框把「电动势 + 内阻」圈起来 */
  g.save();
  g.setLineDash([5,4]); g.strokeStyle = 'rgba(74,144,217,.8)'; g.lineWidth = 1.3;
  EP.rr(g, 36, 74, 56, 96, 8); g.stroke();
  g.restore();
  EP.chip(g, '电池内部', 64, 74, {sz:9.5, c:EP.P.blueD, fill:C.accbg, line:'rgba(74,144,217,.6)'});

  /* 旁边那条 callout 已经写了 E = 1.5 V，元件身上再印一遍就是同一个数出现两次 */
  vCell(g, R2.x0, 104, 42, 20, {volt:false});
  txt(g, '＋', 80, 88, {sz:12, b:1, c:EP.P.red});
  txt(g, '−',  80, 121, {sz:13, b:1, c:EP.P.inkL});
  EP.callout(g, R2.x0+10, 104, 106, 100, 'E = 1.5 V', '电池电动势', {al:'left'});

  vRes(g, R2.x0, 148, 26, 13);
  EP.callout(g, R2.x0+8, 148, 106, 148, 'r = 0.5 Ω', '电池内阻',
             {al:'left', color:EP.P.red});

  /* 开关 + 外部电阻 */
  vSw(g, SW2, R2.y0, !S2.open, 46);
  EC.hot(g, SW2, R2.y0, 26);
  txt(g, S2.open ? '开关断开' : '开关闭合', SW2, R2.y0 + 18,
      {sz:10.5, c: EP.P.inkL});

  vRes(g, R2.x1, 110, 44, 18);
  EP.callout(g, R2.x1-10, 110, 276, 106, 'R = ' + S2.R.toFixed(1) + ' Ω', '外部电阻',
             {al:'right', color:EP.P.blueD});

  /* 1.5V 分给了谁：两段色条，每段两行字 */
  const bx = 28, bw = 304, by = 198, bh = 34;
  txt(g, '电动势 E 这 1.5 V 分给了谁', 180, 188, {sz:10.5, c:EP.P.inkL});
  g.save();
  EP.rr(g, bx, by, bw, bh, 6); g.fillStyle = C.box; g.fill();
  g.strokeStyle = C.boxLine; g.lineWidth = 1; g.stroke();
  g.restore();
  if(!S2.open){
    const wU = bw * (v.Ur/E0), wI = bw - wU;
    g.save();
    EP.rr(g, bx, by, bw, bh, 6); g.clip();
    g.fillStyle = EP.cyl(g, by, by+bh, EP.P.blueD, EP.P.blue, '#7fb3e8');
    g.fillRect(bx, by, wU, bh);
    g.fillStyle = EP.cyl(g, by, by+bh, '#e8a030', EP.P.amber, '#ffd27a');
    g.fillRect(bx+wU, by, wI, bh);
    g.restore();
    if(wU > 96){
      txt(g, '送出去 ' + v.Ur.toFixed(2) + ' V', bx+wU/2, by+12, {sz:11.5, b:1, c:'#fff'});
      txt(g, '外部电路拿到的电压', bx+wU/2, by+25, {sz:9, c:'rgba(255,255,255,.85)'});
    }
    if(wI > 92){
      txt(g, v.Ui.toFixed(2) + ' V', bx+wU+wI/2, by+12, {sz:11.5, b:1, c:'#5a3a00'});
      txt(g, '电池内部损耗', bx+wU+wI/2, by+25, {sz:9, c:'rgba(60,40,0,.75)'});
    }else{
      EP.callout(g, bx+wU+wI/2, by, bx+bw, by-16,
                 v.Ui.toFixed(2) + ' V', '电池内部损耗', {al:'right', color:'#d09828'});
    }
  }else{
    g.save();
    EP.rr(g, bx, by, bw, bh, 6); g.clip();
    g.fillStyle = EP.cyl(g, by, by+bh, EP.P.blueD, EP.P.blue, '#7fb3e8');
    g.fillRect(bx, by, bw, bh);
    g.restore();
    txt(g, '全部 1.5 V 都留在两端', 180, by+12, {sz:11.5, b:1, c:'#fff'});
    txt(g, '没有电流 → 内阻上一点也不损耗', 180, by+25, {sz:9, c:'rgba(255,255,255,.85)'});
  }
  txt(g, '0 V', bx+2, by+bh+12, {sz:9, c:EP.P.inkLL, al:'left'});
  txt(g, '1.5 V', bx+bw-2, by+bh+12, {sz:9, c:EP.P.inkLL, al:'right'});

  EP.legend(g, 180, 286, [['电子（真实在动）', EP.P.ele, 'dot'],
                          ['电流方向（规定）', EP.P.amber, 'arrow']]);
}

function note2(){
  const v = calc2();
  $('s2i').textContent  = S2.open ? '0 A' : v.I.toFixed(2) + ' A';
  $('s2u').textContent  = (S2.open ? E0 : v.Ur).toFixed(2) + ' V';
  $('s2ur').textContent = S2.open ? '0 V' : v.Ui.toFixed(2) + ' V';
  $('s2rlab').textContent = S2.open ? '（开关断开）' : S2.R.toFixed(1) + ' Ω';
  $('n1').innerHTML = S2.open
    ? '<div class="st">空载：量到的就是电动势本身</div>'+
      '开关一断，电流为 0，内阻 r 上一点也不损耗，'+
      '所以两端量出来正好是 <span class="key">1.5 V</span> = 电动势 E。<br>'+
      '<b>这就是为什么“电池量着有电、装上就不转”</b> —— 空载电压骗人，得带上负载再量。'
    : '<div class="st">R 越小 → 电流越大 → 内耗越多 → 送出去的越少</div>'+
      '现在外面接了 <span class="key">'+S2.R.toFixed(1)+' Ω</span>，'+
      '电流 '+v.I.toFixed(2)+' A，电池自己的 0.5 Ω 吃掉 <span class="rd">'+v.Ui.toFixed(2)+' V</span>，'+
      '真正送到外面的只剩 <span class="key">'+v.Ur.toFixed(2)+' V</span>。<br>'+
      '把滑杆拉到最左边（0.2 Ω，差不多等于短路），看那根条 —— '+
      '<b>红色那一段会把蓝色挤没</b>：电全在电池自己身上发热了，这就是短路危险的根子。';
}

/* ================================================================
   场景 3：电位是相对的
   左边一把电位刻度尺（0 线跟着参考点走），中间电路，右边四个电位牌
   ================================================================ */
const S3 = { ref:'A', shown:{A:0,B:0.5,C:1.0,D:1.5} };
const st3 = new Stage('cv2', 360, 284);
const PY = { D:64, C:118, B:172, A:226 };
const PX  = 196;
const BX3 = 104;
const AX  = 52;

function draw3(){
  const g = st3.g; st3.clear();
  const base = S3.shown[S3.ref];

  const P3 = new Path([[PX,PY.D],[BX3,PY.D],[BX3,PY.A],[PX,PY.A]]);
  P3.stroke(g, 3, C.wire);
  g.save(); g.strokeStyle = C.wire; g.lineWidth = 3;
  g.beginPath(); g.moveTo(PX, PY.D); g.lineTo(PX, PY.A); g.stroke(); g.restore();

  g.save(); g.strokeStyle = C.bg; g.lineWidth = 5;
  g.beginPath(); g.moveTo(BX3, 134); g.lineTo(BX3, 156); g.stroke(); g.restore();
  vCell(g, BX3, 145, 42, 19);
  txt(g, '＋', BX3+15, 132, {sz:11, b:1, c:C.err});
  txt(g, '−',  BX3+15, 159, {sz:13, b:1, c:C.tx2});

  [['R1',PY.D,PY.C],['R2',PY.C,PY.B],['R3',PY.B,PY.A]].forEach(function(a){
    const my = (a[1]+a[2])/2;
    vRes(g, PX, my, 32, 14, ['#2f9e44','#1b1b1b','#1b1b1b',EP.BAND.gold]);
    txt(g, a[0] + ' · 0.5V', PX-14, my, {sz:10, c:C.tx2, al:'right'});
  });

  g.save(); g.strokeStyle = C.metalD; g.lineWidth = 1.3;
  g.beginPath(); g.moveTo(AX, PY.D-14); g.lineTo(AX, PY.A+14); g.stroke(); g.restore();
  ['D','C','B','A'].forEach(function(k){
    const y = PY[k], v = S3.shown[k] - base;
    g.save(); g.strokeStyle = C.metalD; g.lineWidth = 1.3;
    g.beginPath(); g.moveTo(AX-5, y); g.lineTo(AX+5, y); g.stroke(); g.restore();
    txt(g, (v>0?'+':'') + v.toFixed(1), AX-9, y, {sz:10, c:C.tx3, al:'right'});
  });
  txt(g, '电位', AX, PY.D-26, {sz:10, c:C.tx3});

  const zy = PY[S3.ref];
  g.save(); g.setLineDash([5,4]); g.strokeStyle = C.acc; g.lineWidth = 1.6;
  g.beginPath(); g.moveTo(AX, zy); g.lineTo(PX-4, zy); g.stroke(); g.restore();
  txt(g, '0 V 基准', 70, zy-11, {sz:9.5, b:1, c:C.acc});

  ['D','C','B','A'].forEach(function(k){
    const y = PY[k], v = S3.shown[k] - base, isRef = (k === S3.ref);
    node(g, PX, y, {r:4.5, color:isRef ? C.acc : C.wire});
    txt(g, k, PX+13, y-14, {sz:12, b:1, c:isRef ? C.acc : C.tx});
    const sv = (v>0?'+':'') + v.toFixed(1) + ' V';
    tag(g, isRef ? sv + ' ← 0 点' : sv, PX+26, y,
        {al:'l', sz:11, b:1, c:isRef ? '#fff' : C.tx,
         fill:isRef ? C.acc : C.box, line:isRef ? C.acc : C.boxLine});
  });

  txt(g, '换参考点：四个数一起平移，谁比谁高多少没变', 180, 262, {sz:10.5, c:C.tx2});
}

function note3(){
  const base = S3.shown[S3.ref];
  const f = function(k){ const v = S3.shown[k]-base; return (v>0?'+':'') + v.toFixed(1) + ' V'; };
  $('s3d').textContent = f('D'); $('s3c').textContent = f('C');
  $('s3b').textContent = f('B'); $('s3a').textContent = f('A');
  $('n2').innerHTML =
    '<div class="st">现在以 <span class="key">'+S3.ref+' 点</span>为 0V</div>'+
    '四个点分别是 D '+f('D')+'、C '+f('C')+'、B '+f('B')+'、A '+f('A')+'。'+
    '换一个参考点再看 —— <b>所有数字整体上下平移，谁比谁高多少一点没变</b>。<br>'+
    '<span class="sub">这就是书上那句「电位的值是相对的，和参考点的选择有关」。'+
    '而 D 和 A 之间永远差 1.5V，那个差值才是电压。</span>';
}

/* ================================================================
   场景 4：电压 = 电位差（拖两支表笔）
   ================================================================ */
const S4 = { red:'C', blk:'A', drag:null, rp:null, bp:null };
const st4 = new Stage('cv3', 360, 300);
/* 万用表占了画面左边 16..112，电路整体右移，别让表压住线 */
const Q4 = { C:{x:272,y:96,v:1.5}, B:{x:272,y:168,v:0.75}, A:{x:272,y:240,v:0} };
const LX4 = 150;

function draw4(){
  const g = st4.g; st4.clear();

  const P4 = new Path([[Q4.C.x,Q4.C.y],[LX4,Q4.C.y],[LX4,Q4.A.y],[Q4.A.x,Q4.A.y]]);
  P4.stroke(g, 3, C.wire);
  g.save(); g.strokeStyle = C.wire; g.lineWidth = 3;
  g.beginPath(); g.moveTo(Q4.C.x, Q4.C.y); g.lineTo(Q4.C.x, Q4.A.y); g.stroke(); g.restore();

  g.save(); g.strokeStyle = C.bg; g.lineWidth = 5;
  g.beginPath(); g.moveTo(LX4, 157); g.lineTo(LX4, 179); g.stroke(); g.restore();
  vCell(g, LX4, 168, 46, 21);
  txt(g, '＋', LX4+16, 154, {sz:11, b:1, c:C.err});
  txt(g, '−',  LX4+16, 183, {sz:13, b:1, c:C.tx2});

  vRes(g, Q4.C.x, 132, 36, 15, ['#6b4423','#1b1b1b','#e0c020',EP.BAND.gold]);
  txt(g, 'R1 · 0.75V', Q4.C.x+16, 132, {sz:10, c:C.tx2, al:'left'});
  vRes(g, Q4.C.x, 204, 36, 15, ['#6b4423','#1b1b1b','#e0c020',EP.BAND.gold]);
  txt(g, 'R2 · 0.75V', Q4.C.x+16, 204, {sz:10, c:C.tx2, al:'left'});

  ['C','B','A'].forEach(function(k){
    const q = Q4[k];
    node(g, q.x, q.y, {r:4.5});
    txt(g, k, q.x+14, q.y-13, {sz:12, b:1, c:C.tx});
    txt(g, 'φ = ' + q.v.toFixed(2) + ' V', q.x+26, q.y-13, {sz:9.5, c:C.tx3, al:'left'});
  });
  txt(g, '（以 A 点为 0V）', 300, 264, {sz:9.5, c:C.tx3});

  const rp = S4.rp || rest(S4.red, -1);
  const bp = S4.bp || rest(S4.blk, 1);
  /* 表笔线从万用表的两个插孔拉出来 */
  lead4(g, [16+96*0.62, 14+128-12], rp, '#e0554a');
  lead4(g, [16+96*0.32, 14+128-12], bp, '#3d444d');
  probe(g, rp.x, rp.y, Q4[S4.red], C.err, '红');
  probe(g, bp.x, bp.y, Q4[S4.blk], '#3d444d', '黑');

  const U = Q4[S4.red].v - Q4[S4.blk].v;
  if(isReal()){
    EP.multimeter(g, 16, 14, 96, 128, {
      /* 不传 mode：让 multimeter 自己**画**直流记号。
         传 'V⎓' 的话那个字符字体里没有就是豆腐块。 */
      reading:(U>=0?'':'−') + Math.abs(U).toFixed(2), unit:'V'
    });
    txt(g, '数字万用表', 20, 154, {sz:9.5, c:C.tx3, al:'left'});
    txt(g, '直流电压档', 20, 167, {sz:9.5, c:C.tx3, al:'left'});
  }else{
    /* 原理图里电压表就是圈里一个 V。**插孔坐标要和实物版对齐**
       （表笔线是从 MM.com / MM.hot 引出来的），所以圈画在同一块地方 */
    meter(g, 64, 74, 22, 'V');
    txt(g, (U>=0?'':'−') + Math.abs(U).toFixed(2) + ' V', 64, 110,
        {sz:12.5, b:1, c:C.tx});
    txt(g, '电压表（并联接法）', 64, 128, {sz:9.5, c:C.tx3});
    txt(g, 'COM', 46, 152, {sz:8.5, c:C.tx3});
    txt(g, 'V', 82, 152, {sz:8.5, c:C.tx3});
  }
}

/* 表笔线：从插孔垂下来再拐向表笔，像真的软线 */
function lead4(g, from, to, color){
  g.save();
  g.strokeStyle = color; g.lineWidth = 2.6; g.lineCap = 'round'; g.lineJoin = 'round';
  g.beginPath();
  g.moveTo(from[0], from[1]);
  g.bezierCurveTo(from[0], from[1] + 46, to.x - 40, to.y + 30, to.x, to.y);
  g.stroke();
  g.restore();
}

/* 表笔：引线画成虚线，免得看着像「这段导线变红了」 */
function probe(g, x, y, target, color, lab){
  g.save();
  g.strokeStyle = color; g.lineWidth = 1.8; g.setLineDash([5,4]); g.lineCap = 'round';
  g.beginPath(); g.moveTo(x, y); g.lineTo(target.x, target.y); g.stroke();
  g.restore();
  g.save(); g.fillStyle = color;
  g.beginPath(); g.arc(x, y, 10, 0, EC.TAU); g.fill();
  g.restore();
  txt(g, lab, x, y, {sz:10, b:1, c:'#fff'});
}

/* 表笔的停靠位：回路内侧，红笔偏上、黑笔偏下，免得压在导线上 */
function rest(k, sign){ return {x:Q4[k].x-60, y:Q4[k].y + sign*26}; }
function hit4(p){
  const rp = S4.rp || rest(S4.red, -1);
  const bp = S4.bp || rest(S4.blk, 1);
  if(Math.hypot(p[0]-rp.x, p[1]-rp.y) < 24) return 'red';
  if(Math.hypot(p[0]-bp.x, p[1]-bp.y) < 24) return 'blk';
  return null;
}
function snap4(p){
  let best = null, bd = 1e9;
  ['C','B','A'].forEach(function(k){
    const d = Math.hypot(p[0]-Q4[k].x, p[1]-Q4[k].y);
    if(d < bd){ bd = d; best = k; }
  });
  return best;
}
/* 这块画布要两个方向自由拖表笔，所以单独关掉 touch-action
   （全局默认是 pan-y，把竖向让给页面滚动） */
st4.cv.style.touchAction = 'none';
st4.cv.addEventListener('pointerdown', function(ev){
  const p = st4.pick(ev), h = hit4(p);
  if(h){ S4.drag = h; st4.cv.setPointerCapture(ev.pointerId); ev.preventDefault(); }
});
st4.cv.addEventListener('pointermove', function(ev){
  if(!S4.drag) return;
  const p = st4.pick(ev);
  const o = {x:Math.max(20,Math.min(340,p[0])), y:Math.max(20,Math.min(280,p[1]))};
  if(S4.drag === 'red') S4.rp = o; else S4.bp = o;
  const k = snap4(p);
  if(S4.drag === 'red') S4.red = k; else S4.blk = k;
  note4(); draw4();
  ev.preventDefault();
});
function endDrag(){
  if(!S4.drag) return;
  if(S4.drag === 'red') S4.rp = null; else S4.bp = null;
  S4.drag = null; note4(); draw4();
}
st4.cv.addEventListener('pointerup', endDrag);
st4.cv.addEventListener('pointercancel', endDrag);

function note4(){
  const U = Q4[S4.red].v - Q4[S4.blk].v;
  $('s4u').textContent = (U>=0?'':'−') + Math.abs(U).toFixed(2) + ' V';
  $('s4p').textContent = '红 ' + S4.red + '　/　黑 ' + S4.blk;
  let body;
  if(S4.red === S4.blk){
    body = '<div class="st warn">两支笔搭在同一点</div>'+
      '读数是 <span class="key">0 V</span>。同一点跟自己当然没有电位差 —— '+
      '<b>这也是判断「两个点是不是同一根导线上」的办法</b>：量出来 0V，说明中间是通的。';
  }else if(U < 0){
    body = '<div class="st">红黑接反了：读数变负</div>'+
      '现在红笔在电位低的 '+S4.red+'、黑笔在电位高的 '+S4.blk+'，'+
      '所以读数是 <span class="rd">'+U.toFixed(2)+' V</span>。<br>'+
      '数值一样，只是符号反了。<b>数字表显示负号，老式指针表则会往左打，容易打弯指针</b> —— '+
      '所以用指针表前要先想清楚哪头电位高。';
  }else{
    const nm = (S4.red==='C'&&S4.blk==='A') ? '整个电池两端' :
               (S4.red==='C'&&S4.blk==='B') ? 'R1 两端' :
               (S4.red==='B'&&S4.blk==='A') ? 'R2 两端' : (S4.red+' 和 '+S4.blk+' 之间');
    body = '<div class="st good">正在量的是 '+nm+'</div>'+
      'U = φ<sub>'+S4.red+'</sub> − φ<sub>'+S4.blk+'</sub> = '+
      Q4[S4.red].v.toFixed(2)+' − '+Q4[S4.blk].v.toFixed(2)+' = <span class="key">'+U.toFixed(2)+' V</span>。<br>'+
      '两个电阻一样大，所以 1.5V 被<b>平分</b>成两个 0.75V。'+
      '<span class="sub">这就是下一节「串联分压」的雏形。</span>';
  }
  $('n3').innerHTML = body;
}
document.querySelectorAll('[data-set]').forEach(function(b){
  b.addEventListener('click', function(){
    const a = b.dataset.set.split(',');
    S4.red = a[0]; S4.blk = a[1]; S4.rp = null; S4.bp = null; note4(); draw4();
  });
});

/* ================================================================
   绑定 / 公式 / 循环
   ================================================================ */
/* 开合抽成具名函数：下面那颗按钮和**画布上直接点开关**走同一条路 */
function toggleS1(){
  S1.on = !S1.on;
  $('s1sw').textContent = S1.on ? '断开开关' : '合上开关';
  $('s1sw').classList.toggle('go', !S1.on);
  if(!S1.on){ S1.t = 0; S1.Q = 0; }
  note1();
}
$('s1sw').addEventListener('click', toggleS1);
/* 场景 1 的画布：点开关（实物图和原理图两个位置都认） */
st1.cv.addEventListener('click', function(ev){
  const p = st1.pick(ev);
  const sw = isReal() ? [RK.x, RK.y] : [SWX, R1.y0];
  if(Math.hypot(p[0]-sw[0], p[1]-sw[1]) < 30) toggleS1();
});
$('s1rst').addEventListener('click', ()=>{ S1.t = 0; S1.Q = 0; });
/* 「实物接线图 / 电路原理图」这两颗原来**没绑事件** —— drawSym1 早就写好了，
   按钮却点不动（2026-08-28 他截图报的）。S1.view 一直只被读、从来没被写过。 */
document.querySelectorAll('.vsw').forEach(function(row){
  row.addEventListener('click', function(e){
    const b = e.target.closest('.btn'); if(!b) return;
    VIEW = b.dataset.v;
    document.querySelectorAll('.vsw .btn').forEach(function(t){
      t.classList.toggle('on', t.dataset.v === VIEW);
    });
    /* 场景 1、2 在 rAF 循环里，静态的 3、4 要手动重画 */
    note1(); draw3(); draw4();
  });
});
$('s1i').addEventListener('input', e=>{
  S1.I = +e.target.value; $('s1ilab').textContent = S1.I + ' A';
  S1.t = 0; S1.Q = 0; note1();
});
$('s1ele').addEventListener('change', e=>{ S1.ele = e.target.checked; });
$('s1cur').addEventListener('change', e=>{ S1.cur = e.target.checked; });

$('s2r').addEventListener('input', e=>{
  S2.R = +e.target.value / 10; S2.open = false; note2();
});
function toggleS2(){
  S2.open = !S2.open;
  $('s2open').textContent = S2.open ? '合上开关' : '断开开关看看';
  $('s2open').classList.toggle('on', S2.open);
  note2();
}
$('s2open').addEventListener('click', toggleS2);
st2.cv.addEventListener('click', function(ev){
  const p = st2.pick(ev);
  if(Math.hypot(p[0]-SW2, p[1]-R2.y0) < 28) toggleS2();
});
document.getElementById('s3ref').addEventListener('click', e=>{
  const b = e.target.closest('.btn'); if(!b) return;
  S3.ref = b.dataset.p;
  document.querySelectorAll('#s3ref .btn').forEach(x=>x.classList.toggle('on', x===b));
  /* draw3() 一定要跟着调 —— 这一屏是静态的，不在 rAF 循环里。
     原来只调 note3()，于是数字卡立刻变了、画布还停在上一个参考点，
     要等下一次 resize/切页签触发 fitAll 才更新（他报的「延迟半分钟以上」）。 */
  note3(); draw3();
});

$('f1').innerHTML = ElecUI.formula({
  plain:'电流强度 = 通过的电荷量 ÷ 用掉的时间',
  f:'I = Q / t',
  vars:['I','Q','t'],
  note:'读作「每秒钟过去多少电荷」。上面动画里 2 秒过去 4 库仑，那么 I = 4 ÷ 2 = 2 安。'
});
$('f2').innerHTML = ElecUI.formula({
  plain:'电动势 = 电源做功 ÷ 搬运的电荷量',
  f:'E = W / Q',
  vars:[{sym:'E',name:'电动势',unit:'伏特',unitSym:'V',what:'电源把 1 库仑电荷从负极搬到正极所做的功'},'W','Q'],
  note:'干电池 E=1.5V、铅酸蓄电池 12V、家用市电有效值 220V —— 都是这个「本事」的大小。'
});
$('f2b').innerHTML = ElecUI.formula({
  plain:'电源的本事 = 送出去的电压 ＋ 自己内部损耗掉的电压',
  f:'E = U路 + U内 = I·R + I·r',
  vars:[
    {sym:'E',name:'电动势',unit:'伏特',unitSym:'V',what:'电源本来能给多少'},
    {sym:'U路',name:'路端电压',unit:'伏特',unitSym:'V',what:'电源两端实际量到的电压'},
    {sym:'U内',name:'内电压',unit:'伏特',unitSym:'V',what:'被电源自身内阻吃掉的那一口'},
    'I',
    {sym:'R',name:'外电阻',unit:'欧姆',unitSym:'Ω',what:'外面接的负载'},
    {sym:'r',name:'内阻',unit:'欧姆',unitSym:'Ω',what:'电源自己的电阻，电池越旧越大'}
  ]
});
$('f3').innerHTML = ElecUI.formula({
  plain:'两点间的电压 = 前一点的电位 − 后一点的电位',
  f:'U(A→B) = φA − φB',
  vars:[
    {sym:'U',name:'电压',unit:'伏特',unitSym:'V',what:'也叫电位差、电势差'},
    {sym:'φ',name:'电位',unit:'伏特',unitSym:'V',what:'某点相对 0V 参考点高多少，希腊字母读「fai」'}
  ],
  note:'注意 φ 是希腊字母 phi，不是 P，也不是功率那个 P。'
});

function fitAll(){
  [st1, st2, st3, st4].forEach(s=>s.fit());
  draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:1, sec:'1.1'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

/* 底部翻页 */
(function(){
  const nb = ElecNav.neighbors('1.1');
  let h = '';
  h += nb.prev ? '<a href="'+nb.prev.f+'">‹ '+nb.prev.id+' '+nb.prev.t+'</a>'
               : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next ? '<a class="next" href="'+nb.next.f+'">'+nb.next.id+' '+nb.next.t+' ›</a>'
               : '<span>已经是最后一节</span>';
  $('pager').innerHTML = h;
})();

loop(dt=>{
  if(cur === 0) draw1(dt);
  else if(cur === 1) draw2(dt);
});
  }
});
})();
