/* 6.1 线缆的剥线加工 —— 本节内容的唯一真相。
   对应《零基础学电工》第 6 章 6.1 节（书内 P101~P105）。

   **这一章的定位要先说清楚**：剥线、缠绕、压接这些是手上的活，
   **网页教不会**（CLAUDE.md 从第一天就钉死的一条）。
   所以这一章教的是**能记住、能拿去核对的那一半**：
   什么截面积用什么工具、剥多长、缠几圈、什么样算合格、什么样必须重做。
   手感那一半，只能拿真线真钳子去练。每一节的末尾都写了这句。

   四屏：① 按截面积选工具 ② 钢丝钳与剥线钳 ③ 电工刀 ④ 软导线与护套线

   数字口径（书上原文，别凭记忆改）：
   - **横截面积 4 mm² 及以下**的塑料硬导线，绝缘层一般用**剥线钳、钢丝钳或斜口钳**剥削；
     **横截面积 4 mm² 及以上**的，通常用**电工刀或剥线钳**剥削（书 P103 图 6-5）
   - 线径大于 **2.25 mm**（横截面积在 4 mm² 以上）的塑料硬导线可借助剥线钳／电工刀（书 P101、P102）
   - 电工刀剥削时**以 45° 角倾斜切入**塑料绝缘层（书 P102 图 6-4）
   - **剥削出的线芯应保持完整无损，如有损伤应重新剥削**（书 P101 图 6-2）
   - 用钢丝钳时**不可在刀口处用剪切力**，否则会切伤线芯（书 P101 提示说明）
   - 用剥线钳时**切不可选择小于剥离线缆的刀口**，否则会导致软导线多根线芯
     与绝缘层一同被剥落（书 P104 图 6-7）
   - 塑料软导线的线芯是多股铜（铝）丝组成的，**不适宜用电工刀剥削绝缘层**，
     实际操作中多使用剥线钳和斜口钳（书 P103）
   - 塑料护套线要**先剥削护套层，再分别剥削里面两根导线的绝缘层**；
     用电工刀**从线缆的中间下刀**，下刀时找准中间位置，以免损伤内部线芯；
     **切忌从线缆的一侧下刀**，否则会导致内部的线缆损坏（书 P104~105 图 6-8） */
(function(){
'use strict';
ELEC.reg({
  id: '6.1',
  file: 'c6-1.html',
  title: '6.1 线缆的剥线加工',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>选工具</button>
    <button class="tab" data-i="1"><span class="n">2</span>钳子</button>
    <button class="tab" data-i="2"><span class="n">3</span>电工刀</button>
    <button class="tab" data-i="3"><span class="n">4</span>软线与护套线</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">先看截面积，再决定用什么工具</div>
    剥绝缘层是线缆加工的第一步。<b>方法不当或者操作失误，很容易在操作过程中损伤线芯</b> ——
    而损伤过的线芯必须重新剥，不能将就。选工具的分界线只有一个数：<b>4 mm²</b>。
    <b>拖滑杆改变导线截面积看该用什么。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="rowlab">导线横截面积　<b id="s1v">2.5 mm²</b></div>
      <input type="range" id="s1r" min="0" max="7" step="1" value="2">
      <div class="nums three">
        <div class="num"><div class="k">截面积</div><div class="v" id="s1a">2.5 mm²</div></div>
        <div class="num"><div class="k">线径约</div><div class="v" id="s1b">1.8 mm</div></div>
        <div class="num hi"><div class="k">用什么剥</div><div class="v" id="s1c">剥线钳/钢丝钳</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">这张分界表（书上图 6-5）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>横截面积</th><th>可以用</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">4 mm²<br>及以下</td>
          <td><b>剥线钳</b>、<b>钢丝钳</b>或<b>斜口钳</b></td></tr>
        <tr><td class="eu-s">4 mm²<br>及以上</td>
          <td><b>电工刀</b>或<b>剥线钳</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>剥线钳两边都能用</b> —— 它是唯一一个不挑截面积的（只要选对刀口孔径）。
      <span class="sub">4 mm² 对应的线径大约是 <b>2.25 mm</b>，书上是拿这个线径说的：
      「线径大于 2.25 mm（横截面积在 4 mm² 以上）的塑料硬导线可借助剥线钳剥除绝缘层」。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">这一章有一半是网页教不会的</div>
    <b>剥线、缠绕、压接、拧紧力矩、走线，全是手上的活。</b>
    这一章能教的是<b>另一半</b>：什么截面积用什么工具、剥多长、缠几圈、
    什么样算合格、什么样必须重做 —— <b>这些是能记住、能拿去核对的</b>。
    <div class="tip">
      <b>手感那一半，只能拿真线真钳子去练。</b>
      <span class="sub">练的时候按这一章的尺寸和判据去对照，
      比蒙着头练快得多 —— 至少你知道什么样算做对了。</span>
    </div>
  </div>

  <div class="bet" data-bet="c61-tool" data-q="一根 6 mm² 的塑料硬导线要剥绝缘层，用什么工具？"
       data-opts="钢丝钳，随手就有|电工刀或剥线钳——4 mm² 及以上用这两种|斜口钳" data-right="1"
       data-after="电工刀或剥线钳。书上的分界是 4 mm²：4 mm² 及以下用剥线钳、钢丝钳或斜口钳；4 mm² 及以上用电工刀或剥线钳。粗线用钢丝钳很难剥干净，硬来就会在刀口处使上剪切力，把线芯切伤。"></div>
</section>

<!-- ================= 场景 2：钳子 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">钢丝钳：旋一周，往外剥，不能剪</div>
    钢丝钳剥硬导线的动作是两步：<b>刀口钳住绝缘层轻轻旋转一周</b>，
    <b>再用钳头钳住要去掉的绝缘层向外用力剥</b>。
    <b>整个过程都不能在刀口处用剪切力</b> —— 那一下就把线芯切伤了。
    <b>切一种情况看。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">① 旋转一周</button>
        <button class="btn sm" data-k="1">② 向外剥</button>
        <button class="btn sm" data-k="2">✗ 用了剪切力</button>
      </div>
      <div class="nums">
        <div class="num"><div class="k">这一步</div><div class="v" id="s2a">刀口旋转一周</div></div>
        <div class="num hi"><div class="k">要点</div><div class="v" id="s2b">只切断绝缘层</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">剥线钳：选对刀口比什么都重要</div>
    剥线钳的钳口上有<b>好几个不同孔径的刀口</b>。
    <b>要选择与剥削导线适合的刀口</b> —— 握住导线，把需剥削的位置放进合适的刀口中，
    握住手柄轻轻用力，就切断了需剥削处的绝缘层。
    <div class="tip">
      <b>切不可选择小于剥离线缆的刀口</b>（书上专门提示的）。
      刀口选小了，钳口会连线芯一起咬进去 ——
      <b>软导线会有好几根线芯跟着绝缘层一起被剥掉</b>，
      <span class="sub">剩下的线芯变少，这根线的载流能力就下降了，
      接上去那一段会发热。而这种损伤从外面根本看不出来。</span>
    </div>
  </div>

  <div class="bet" data-bet="c61-cut" data-q="用钢丝钳剥线时，在刀口处使了剪切力。会怎样？"
       data-opts="没事，剥得更快|会切伤线芯——剥出来的线芯必须完整无损，有损伤要重新剥|钳子会坏" data-right="1"
       data-after="会切伤线芯。书上原话：不可在钢丝钳刀口处用剪切力，否则会切伤线芯；剥削出的线芯应保持完整无损，如有损伤应重新剥削。切伤的线芯截面变小，接上去那一处会发热，而且弯折几次就断了——最要命的是从外面看不出来。"></div>
</section>

<!-- ================= 场景 3：电工刀 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">电工刀：45° 斜着切，不能垂直下刀</div>
    粗一点的硬导线（4 mm² 以上）用电工刀剥。关键是那个角度：
    <b>以 45° 角倾斜切入塑料绝缘层</b>。
    <b>垂直下刀会直接切到线芯</b>，斜着切只会削掉绝缘层。
    <b>一步一步点下去。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">① 45° 切入</button>
        <button class="btn sm" data-k="1">② 削出线芯</button>
        <button class="btn sm" data-k="2">③ 扳翻切去</button>
        <button class="btn sm" data-k="3">✗ 垂直下刀</button>
      </div>
      <div class="nums">
        <div class="num"><div class="k">这一步</div><div class="v" id="s3a">45° 斜切入</div></div>
        <div class="num hi"><div class="k">为什么</div><div class="v" id="s3b">斜着只削绝缘层</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">电工刀剥硬导线的完整五步（书上图 6-4）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>步</th><th>做什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">①</td><td>在剥削处用电工刀<b>以 45° 角倾斜切入</b>塑料绝缘层</td></tr>
        <tr><td class="eu-s">②</td><td>剥削完成后，导线的<b>一侧露出部分线芯</b></td></tr>
        <tr><td class="eu-s">③</td><td>将剩余的绝缘层<b>向下与线芯分离</b></td></tr>
        <tr><td class="eu-s">④</td><td>将多余的绝缘层<b>向后扳翻</b></td></tr>
        <tr><td class="eu-s">⑤</td><td>用电工刀<b>切下剩余的绝缘层</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>注意第 ③④ 步：不是一刀切一圈。</b>先斜切开一侧、露出线芯，
      再把剩下那半圈绝缘层<b>扳到后面去</b>，最后齐根切掉。
      <span class="sub">这个顺序是为了让刀刃始终<b>背着线芯</b>走 ——
      不管哪一刀走偏，都不会切到铜。</span>
    </div>
  </div>

  <div class="bet" data-bet="c61-knife" data-q="用电工刀剥绝缘层，为什么必须斜着 45° 切入而不是垂直下刀？"
       data-opts="斜着省力|垂直下刀刀刃直接对着线芯，一用力就切进铜里；斜着切刀刃是擦着绝缘层走的|习惯而已" data-right="1"
       data-after="垂直下刀刀刃正对着线芯，力稍微大一点就切进铜里了。45° 斜切时刀刃是擦着绝缘层走的，切到线芯表面就会打滑，切不进去。后面几步「向下分离、向后扳翻、齐根切掉」也是同一个思路：让刀刃始终背着线芯走。"></div>
</section>

<!-- ================= 场景 4：软导线与护套线 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">这两种各有一条不能犯的错</div>
    <b>塑料软导线</b>的线芯是多股细铜丝，<b>不适宜用电工刀剥</b> —— 一刀下去就切断几根。
    <b>塑料护套线</b>里面包着两根导线，<b>必须从缝隙处下刀</b>，从一侧下刀会切坏里面的线。
    <b>切一种看。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">软导线 · 对</button>
        <button class="btn sm" data-k="1">软导线 · 刀口选小了</button>
        <button class="btn sm" data-k="2">护套线 · 对</button>
        <button class="btn sm" data-k="3">护套线 · 从一侧下刀</button>
      </div>
      <div class="nums">
        <div class="num"><div class="k">这一种</div><div class="v" id="s4a">软导线</div></div>
        <div class="num hi"><div class="k">结果</div><div class="v" id="s4b">线芯完整</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">护套线要剥两层，顺序不能反</div>
    塑料护套线是<b>把两根带绝缘层的导线用护套层包裹在一起</b>。剥的时候
    <b>先剥削护套层，再分别剥削里面两根导线的绝缘层</b>。
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>步</th><th>做什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">①</td><td>在线头所需的长度处，<b>用电工刀从线缆的中间下刀</b>；
          下刀时找准中间位置，以免损伤内部线芯</td></tr>
        <tr><td class="eu-s">②</td><td>用刀尖在<b>两根导线的缝隙处</b>划开护套层</td></tr>
        <tr><td class="eu-s">③</td><td>向后<b>扳翻</b>护套层</td></tr>
        <tr><td class="eu-s">④</td><td>用电工刀把护套层<b>齐根切去</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>切忌从线缆的一侧下刀。</b>护套线里面两根导线是并排贴着的，
      一侧下刀刀刃正对着其中一根，<b>划开护套的同时就把里面那根的绝缘层也划开了</b> ——
      <span class="sub">而这道伤在护套层剥掉之前你根本看不见。
      装上去之后两根线在护套里慢慢碰上，就是一次短路。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="c6-1">
    <div class="qz" data-q="一根 6 mm² 的塑料硬导线，用什么工具剥绝缘层？"
         data-opts="钢丝钳|电工刀或剥线钳——书上的分界是 4 mm²，及以上用这两种|斜口钳"
         data-right="1"
         data-why="电工刀或剥线钳。书上图 6-5 那张分界图：横截面积 4 mm² 及以下用剥线钳、钢丝钳或斜口钳；4 mm² 及以上用电工刀或剥线钳。4 mm² 对应线径约 2.25 mm。粗线用钢丝钳很难剥干净，硬来就会在刀口处使上剪切力，把线芯切伤。"></div>
    <div class="qz" data-q="用电工刀剥绝缘层，刀应该怎么切入？"
         data-opts="垂直下刀，一刀切断|以 45° 角倾斜切入——斜着切刀刃是擦着绝缘层走的，碰到线芯会打滑|沿着导线纵向划"
         data-right="1"
         data-why="45° 角倾斜切入。垂直下刀刀刃正对着线芯，力稍微大一点就切进铜里。斜切时刀刃擦着绝缘层走，碰到线芯表面会打滑切不进去。后面几步（向下分离、向后扳翻、齐根切掉）也是同一个思路：让刀刃始终背着线芯走。"></div>
    <div class="qz" data-q="塑料软导线为什么不适合用电工刀剥？"
         data-opts="太软了刀切不动|它的线芯是多股细铜丝，一刀下去就切断几根；应该用剥线钳或斜口钳|电工刀太钝"
         data-right="1"
         data-why="线芯是多股细铜丝。硬导线的线芯是一根粗铜，刀擦过去顶多留个印；软导线是几十根细丝，刀刃碰上就切断好几根。断了几根之后载流能力下降、那一段会发热，而且从外面看不出来。所以软导线要用剥线钳（选对刀口）或斜口钳。"></div>
    <div class="qz" data-q="剥塑料护套线的护套层，刀该从哪儿下？"
         data-opts="从一侧下刀，顺着划开|从线缆中间、两根导线的缝隙处下刀|从端头往里劈"
         data-right="1"
         data-why="从中间缝隙处下刀。护套线里面两根导线并排贴着，中间有一条缝，刀尖沿缝走碰不到任何一根线芯。从一侧下刀的话刀刃正对着其中一根，划开护套的同时把那一根的绝缘层也划开了——而这道伤在护套剥掉之前看不见，装上去之后两根线慢慢碰上就是一次短路。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 6 章 6.1 节（书内 P101~P105）<br>这一章教的是尺寸、工具、顺序和判据；手上的活只能拿真线真钳子去练</div>
</section>`,

  init: function(EC){
'use strict';
const {C, Path, Stage, txt, tw, box, tag, hot, loop, $} = EC;
const P = EP.P;

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

const CANH = 252;
function bar(g, l1, l2, kind, y){
  const Y = y || 206;
  const bg = kind === 'ok' ? C.okbg : kind === 'err' ? C.errbg : kind === 'warn' ? C.warnbg : C.accbg;
  const fg = kind === 'ok' ? C.ok : kind === 'err' ? C.err : kind === 'warn' ? C.warn : C.acc;
  EC.box(g, 18, Y, 324, 38, 6, bg, fg, 1);
  txt(g, l1, 180, Y + 13, {sz:10.5, b:1, c:fg});
  txt(g, l2, 180, Y + 28, {sz:9, c:C.tx2});
}
/* 一根导线：绝缘层（彩色套管）+ 线芯（铜色）。cut 是绝缘层右端 x */
function wire(g, x0, x1, cy, cut, o){
  o = o || {};
  const R = o.r || 11, cr = o.cr || 4.6;
  /* 线芯（整根都有） */
  g.save();
  g.strokeStyle = o.hurt ? C.err : (P.copper || C.cop); g.lineWidth = cr*2; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x0 + 6, cy); g.lineTo(x1, cy); g.stroke();
  if(o.strand){
    /* 多股：画几条细丝 */
    g.strokeStyle = P.copperL || C.cop; g.lineWidth = 1;
    for(let i = -2; i <= 2; i++){
      g.beginPath(); g.moveTo(cut, cy + i*1.9); g.lineTo(x1, cy + i*2.6); g.stroke();
    }
  }
  g.restore();
  /* 绝缘层 */
  if(cut > x0){
    box(g, x0, cy - R, cut - x0, R*2, R*0.6, o.ins || C.L, null, 0);
  }
  if(o.label) txt(g, o.label, (x0 + cut)/2, cy, {sz:8.5, b:1, c:'#fff'});
}
/* 尺寸标注：一条带两端箭头的线 + 中间的数值 */
function dim(g, x0, x1, y, s, c){
  c = c || C.acc;
  g.save();
  g.strokeStyle = c; g.lineWidth = 1.1;
  g.beginPath(); g.moveTo(x0, y - 4); g.lineTo(x0, y + 4);
  g.moveTo(x1, y - 4); g.lineTo(x1, y + 4);
  g.moveTo(x0, y); g.lineTo(x1, y); g.stroke();
  g.restore();
  EC.head(g, x0, y, -1, 0, 4, c);
  EC.head(g, x1, y, 1, 0, 4, c);
  const w = tw(g, s, 8.5, true) + 8;
  box(g, (x0+x1)/2 - w/2, y - 7, w, 14, 3, C.bg, null, 0);
  txt(g, s, (x0+x1)/2, y, {sz:8.5, b:1, c:c});
}

/* ================================================================
   场景 1：按截面积选工具
   ================================================================ */
const SEC = [
  {a:'0.5', d:'0.8'}, {a:'1.5', d:'1.38'}, {a:'2.5', d:'1.78'}, {a:'4', d:'2.25'},
  {a:'6', d:'2.76'}, {a:'10', d:'3.57'}, {a:'16', d:'4.51'}, {a:'25', d:'5.64'}
];
const S1 = { i:2 };
const st1 = new Stage('cv0', 360, CANH);
function big1(){ return +SEC[S1.i].a >= 4; }

function draw1(){
  const g = st1.g; st1.clear();
  const it = SEC[S1.i], big = big1();
  EP.heading(g, 12, 14, '选剥线工具', '分界线：4 mm²');
  /* 导线粗细跟着截面积变 */
  const r = 6 + Math.sqrt(+it.a) * 2.6;
  wire(g, 24, 200, 62, 128, {r:r, cr:r*0.42});
  txt(g, it.a + ' mm²', 76, 62 + r + 14, {sz:9.5, b:1, c:C.tx});
  txt(g, '线径约 ' + it.d + ' mm', 168, 62 + r + 14, {sz:8.5, c:C.tx3});

  /* 三种工具，能用的高亮 */
  const TOOL = [
    {n:'剥线钳', ok:true},
    {n:'钢丝钳', ok:!big},
    {n:'斜口钳', ok:!big},
    {n:'电工刀', ok:big}
  ];
  TOOL.forEach(function(t, i){
    const x = 22 + i * 80, y = 108;
    box(g, x, y, 74, 40, 6, t.ok ? C.okbg : C.box, t.ok ? C.ok : C.boxLine, t.ok ? 1.6 : 1);
    txt(g, t.n, x + 37, y + 16, {sz:10, b:1, c: t.ok ? C.ok : C.tx3});
    txt(g, t.ok ? '可以用' : '不合适', x + 37, y + 31, {sz:8, c: t.ok ? C.ok : C.tx3});
  });
  /* 分界指示 */
  box(g, 22, 158, 316, 26, 5, C.box, C.boxLine, 1);
  txt(g, big ? '4 mm² 及以上 → 电工刀 或 剥线钳' : '4 mm² 及以下 → 剥线钳、钢丝钳 或 斜口钳',
      180, 171, {sz:10, b:1, c: big ? C.warn : C.acc});
  bar(g, it.a + ' mm²　线径约 ' + it.d + ' mm',
      big ? '粗线用钢丝钳剥不干净，硬来就会在刀口使上剪切力切伤线芯'
          : '剥线钳最省事，钢丝钳和斜口钳也行 —— 但都不能用剪切力',
      big ? 'warn' : 'ok');
}
function note1(){
  const it = SEC[S1.i], big = big1();
  $('s1v').textContent = it.a + ' mm²';
  $('s1a').textContent = it.a + ' mm²';
  $('s1b').textContent = it.d + ' mm';
  $('s1c').textContent = big ? '电工刀/剥线钳' : '剥线钳/钢丝钳';
  $('n0').innerHTML = big ?
    '<div class="st">4 mm² 及以上 —— 电工刀或剥线钳</div>' +
    '这个粗细的硬导线，绝缘层厚、线芯粗，<b>钢丝钳的刀口很难一次旋断绝缘层</b>，' +
    '硬来的话人会不自觉地使上剪切力 —— <b>那一下就把线芯切伤了</b>。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>剥线钳仍然可以用</b>，只要它有这个孔径的刀口。' +
    '<span class="sub">书上是拿线径说的：「线径大于 <b>2.25 mm</b>' +
    '（横截面积在 4 mm² 以上）的塑料硬导线可借助剥线钳／电工刀剥除绝缘层」。</span></div>'
    :
    '<div class="st good">4 mm² 及以下 —— 剥线钳、钢丝钳或斜口钳</div>' +
    '这是配电箱里最常见的几个规格：<b>1.5 mm² 照明、2.5 mm² 插座、4 mm² 空调</b>' +
    '（4.1 节那张系统图上就是这三个）。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>剥线钳最省事</b>：选对孔径的刀口，握一下手柄就断了，不会伤线芯。' +
    '钢丝钳和斜口钳也能剥，<b>但都必须「旋一周再往外剥」，不能直接剪</b>。' +
    '<span class="sub">下一屏讲这两下具体怎么做。</span></div>';
}
document.getElementById('s1r').addEventListener('input', function(e){
  S1.i = +e.target.value; note1(); draw1();
});

/* ================================================================
   场景 2：钳子
   ================================================================ */
const PLI = [
  {t:'刀口旋转一周', memo:'只切断绝缘层', ok:true,
   bar:['左手捏住导线，右手用钢丝钳刀口钳住线', '轻轻旋转一周，只把绝缘层切开，不碰线芯']},
  {t:'钳头向外剥', memo:'向外用力，不是剪', ok:true,
   bar:['换成钳头钳住要去掉的那一截绝缘层', '向外用力剥下来 —— 全程不在刀口使剪切力']},
  {t:'在刀口使了剪切力', memo:'线芯被切伤', ok:false,
   bar:['刀口一夹一剪，线芯当场被切出一道口子', '剥出的线芯必须完整无损，有损伤要重新剥']}
];
const S2 = { k:0 };
const st2 = new Stage('cv1', 360, CANH);

function draw2(){
  const g = st2.g; st2.clear();
  const it = PLI[S2.k];
  EP.heading(g, 12, 14, '钢丝钳剥硬导线', it.ok ? '第 ' + (S2.k+1) + ' 步' : '错误操作');
  const cy = 74, cut = S2.k === 1 ? 150 : 210;
  wire(g, 24, 300, cy, cut, {r:12, cr:5, hurt: !it.ok});
  /* 钳子示意：两片钳口夹在 cut 处 */
  const jx = S2.k === 1 ? 236 : 210;
  g.save();
  g.fillStyle = it.ok ? C.metalD : C.err;
  g.beginPath(); g.moveTo(jx - 16, cy - 34); g.lineTo(jx + 16, cy - 34);
  g.lineTo(jx + 5, cy - 12); g.lineTo(jx - 5, cy - 12); g.closePath(); g.fill();
  g.beginPath(); g.moveTo(jx - 16, cy + 34); g.lineTo(jx + 16, cy + 34);
  g.lineTo(jx + 5, cy + 12); g.lineTo(jx - 5, cy + 12); g.closePath(); g.fill();
  g.restore();
  /* 动作提示 */
  if(S2.k === 0){
    g.save(); g.strokeStyle = C.acc; g.lineWidth = 2; g.lineCap = 'round';
    g.beginPath(); g.arc(jx, cy, 26, -2.4, 1.0); g.stroke(); g.restore();
    EC.head(g, jx + 14, cy + 22, 0.8, 0.6, 6, C.acc);
    txt(g, '旋转一周', jx, cy + 48, {sz:9, b:1, c:C.acc});
  }else if(S2.k === 1){
    EC.head(g, 300, cy, 1, 0, 8, C.acc);
    txt(g, '向外剥', 274, cy - 26, {sz:9, b:1, c:C.acc});
  }else{
    /* 线芯上一道伤口 */
    g.save(); g.strokeStyle = C.err; g.lineWidth = 2.4; g.lineCap = 'round';
    g.beginPath(); g.moveTo(jx - 6, cy - 8); g.lineTo(jx + 6, cy + 8); g.stroke(); g.restore();
    txt(g, '线芯被切伤', jx, cy + 48, {sz:9, b:1, c:C.err});
  }
  /* 合格判据 */
  box(g, 22, 132, 316, 46, 6, it.ok ? C.okbg : C.errbg, it.ok ? C.ok : C.err, 1.2);
  txt(g, it.ok ? '剥削出的线芯应保持完整无损' : '线芯有损伤 —— 必须剪掉重新剥',
      180, 148, {sz:10.5, b:1, c: it.ok ? C.ok : C.err});
  txt(g, it.ok ? '这是书上对每一种剥线方法的共同要求' : '切伤的线芯截面变小，接上去会发热，弯几次就断',
      180, 166, {sz:8.5, c:C.tx2});
  bar(g, it.bar[0], it.bar[1], it.ok ? 'ok' : 'err');
}
function note2(){
  const it = PLI[S2.k];
  $('s2a').textContent = it.t;
  $('s2b').textContent = it.memo;
  const H = [
    '<div class="st">① 刀口钳住，轻轻旋转一周</div>' +
    '<b>应使用左手捏住线缆</b>，在需要剥落绝缘层处，' +
    '<b>用钢丝钳的刀口钳住绝缘层轻轻旋转一周</b>。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>「轻轻」两个字是关键</b>：这一下只要把绝缘层切开一圈就够了，' +
    '力大了刀口就直接咬到线芯上。' +
    '<span class="sub">旋转一周而不是从一侧切，是为了让绝缘层<b>整圈断开</b>，' +
    '下一步才拉得下来。</span></div>',

    '<div class="st">② 钳头钳住，向外用力剥</div>' +
    '换成<b>钳头</b>（不是刀口）钳住要去掉的那一截绝缘层，' +
    '<b>向外用力剥去绝缘层</b>即可。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>用钳头不用刀口</b>，因为钳头是平的、只夹不切。' +
    '<span class="sub">这一步如果拉不动，说明第 ① 步那一圈没旋断，' +
    '<b>回去补旋一下，别硬拉</b> —— 硬拉会把线芯拽细甚至拉断几根。</span></div>',

    '<div class="st bad">✗ 在刀口处用了剪切力</div>' +
    '书上专门提示：<b>在剥去绝缘层时，不可在钢丝钳刀口处用剪切力，否则会切伤线芯。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>剥削出的线芯应保持完整无损，如有损伤，应重新剥削。</b>' +
    '<span class="sub">切伤的线芯截面积变小，<b>接上去那一处电阻变大、会发热</b>；' +
    '而且伤口处一弯就断。最麻烦的是<b>这种损伤装好之后完全看不见</b> ——' +
    '所以宁可剪掉那一截重新剥，也别将就。</span></div>'
  ];
  $('n1').innerHTML = H[S2.k];
}
document.getElementById('s2k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S2.k = +t.dataset.k;
  document.querySelectorAll('#s2k .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.k === S2.k); });
  note2(); draw2();
});

/* ================================================================
   场景 3：电工刀
   ================================================================ */
const KNI = [
  {t:'45° 斜切入', memo:'斜着只削绝缘层', ang:-0.79, ok:true,
   bar:['在剥削处用电工刀以 45° 角倾斜切入塑料绝缘层', '刀刃擦着绝缘层走，碰到线芯会打滑，切不进去']},
  {t:'削出线芯', memo:'一侧露出线芯', ang:-0.79, ok:true, peel:1,
   bar:['剥削完成后，导线的一侧露出部分线芯', '把剩余的绝缘层向下与线芯分离']},
  {t:'扳翻切去', memo:'向后扳翻，齐根切', ang:-0.79, ok:true, peel:2,
   bar:['将多余的绝缘层向后扳翻，再用电工刀切下', '这个顺序让刀刃始终背着线芯走']},
  {t:'垂直下刀', memo:'刀刃正对线芯', ang:-1.57, ok:false,
   bar:['刀刃正对着线芯，力大一点就切进铜里', '这是新手最常见的一种伤线芯的方式']}
];
const S3 = { k:0 };
const st3 = new Stage('cv2', 360, CANH);

function draw3(){
  const g = st3.g; st3.clear();
  const it = KNI[S3.k];
  EP.heading(g, 12, 14, '电工刀剥硬导线', it.ok ? '第 ' + (S3.k+1) + ' 步' : '错误操作');
  const cy = 76, cut = 200;
  wire(g, 24, 306, cy, it.peel ? 200 : 300, {r:13, cr:5.4, hurt: !it.ok});
  /* 扳翻的那半圈绝缘层 */
  if(it.peel === 2){
    g.save(); g.fillStyle = C.L; g.globalAlpha = .8;
    g.beginPath();
    g.moveTo(200, cy - 13); g.quadraticCurveTo(232, cy - 40, 196, cy - 46);
    g.lineTo(188, cy - 34); g.quadraticCurveTo(214, cy - 32, 190, cy - 13);
    g.closePath(); g.fill(); g.restore();
    txt(g, '向后扳翻', 210, cy - 54, {sz:8.5, c:C.tx2});
  }
  /* 刀 */
  const kx = it.peel ? 200 : 210;
  g.save();
  g.translate(kx, cy - 26); g.rotate(it.ang);
  g.fillStyle = it.ok ? (P.steelDD || C.metalD) : C.err;
  g.beginPath(); g.moveTo(0, 0); g.lineTo(7, -10); g.lineTo(7, -52); g.lineTo(-4, -52);
  g.lineTo(-4, -10); g.closePath(); g.fill();
  g.restore();
  txt(g, it.ok ? '45°' : '90°', kx + (it.ok ? 26 : 16), cy - 34,
      {sz:9.5, b:1, c: it.ok ? C.acc : C.err, al:'left'});
  if(!it.ok){
    g.save(); g.strokeStyle = C.err; g.lineWidth = 2.4; g.lineCap = 'round';
    g.beginPath(); g.moveTo(kx - 6, cy - 6); g.lineTo(kx + 6, cy + 6); g.stroke(); g.restore();
    txt(g, '切进铜里了', kx, cy + 34, {sz:9, b:1, c:C.err});
  }
  box(g, 22, 132, 316, 46, 6, it.ok ? C.okbg : C.errbg, it.ok ? C.ok : C.err, 1.2);
  txt(g, it.ok ? '刀刃始终背着线芯走' : '刀刃正对线芯 —— 一用力就切进去',
      180, 148, {sz:10.5, b:1, c: it.ok ? C.ok : C.err});
  txt(g, it.ok ? '45° 切入 → 一侧露芯 → 向下分离 → 向后扳翻 → 齐根切去'
               : '垂直下刀是新手最常见的一种伤线芯的方式',
      180, 166, {sz:8.5, c:C.tx2});
  bar(g, it.bar[0], it.bar[1], it.ok ? 'ok' : 'err');
}
function note3(){
  const it = KNI[S3.k];
  $('s3a').textContent = it.t;
  $('s3b').textContent = it.memo;
  const H = [
    '<div class="st">① 45° 角倾斜切入</div>' +
    '书上原话：<b>在剥削处用电工刀以 45° 角倾斜切入塑料绝缘层。</b>' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>为什么是斜着</b>：刀刃斜着走的时候，它是<b>擦着</b>绝缘层前进的，' +
    '碰到线芯表面会打滑，切不进去。垂直下刀就完全不同了 ——' +
    '刀刃正对着铜，力大一点就进去了。' +
    '<span class="sub">这一条和钢丝钳那条「不能用剪切力」是同一个道理：' +
    '<b>永远不要让刀刃正对着线芯。</b></span></div>',

    '<div class="st">② 剥削完成，一侧露出线芯</div>' +
    '斜切一刀之后，<b>导线的一侧露出部分线芯</b>，' +
    '剩下的绝缘层还挂在另一侧。<b>把它向下与线芯分离。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>注意不是一刀切一整圈。</b>电工刀这套动作从头到尾只斜切了一次，' +
    '剩下的靠扳、靠翻、靠齐根切。' +
    '<span class="sub">切一整圈的话，刀刃必然有一段是正对着线芯的。</span></div>',

    '<div class="st good">③ 向后扳翻，齐根切去</div>' +
    '<b>将多余的绝缘层向后扳翻</b>，然后<b>用电工刀切下剩余的绝缘层</b>。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>扳翻这一步的意义</b>：绝缘层被翻到后面之后，' +
    '刀刃切它的时候是<b>背着线芯</b>的 —— 就算切过头，也切在空气里。' +
    '<span class="sub">整套五步（45° 切入 → 一侧露芯 → 向下分离 → 向后扳翻 → 齐根切去）' +
    '的设计意图只有一个：<b>让刀刃从头到尾都不正对线芯。</b></span></div>',

    '<div class="st bad">✗ 垂直下刀</div>' +
    '刀刃正对着线芯，<b>力稍微大一点就切进铜里</b>。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>这是新手最常见的一种伤线芯的方式</b>，而且很难自己发现 ——' +
    '因为切进去的那一下手感和切绝缘层差不多，' +
    '<b>要等剥完仔细看线芯才知道</b>。' +
    '<span class="sub">发现了就剪掉重新剥。剥线的返工成本很低，' +
    '把一根伤了的线装上去的代价高得多。</span></div>'
  ];
  $('n2').innerHTML = H[S3.k];
}
document.getElementById('s3k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S3.k = +t.dataset.k;
  document.querySelectorAll('#s3k .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.k === S3.k); });
  note3(); draw3();
});

/* ================================================================
   场景 4：软导线与护套线
   ================================================================ */
const SOFT = [
  {t:'软导线', ok:true, sheath:false,
   res:'线芯完整', bar:['选和线径合适的刀口，握手柄轻轻用力', '剥下来之后所有线芯都在，一根不少']},
  {t:'软导线', ok:false, sheath:false,
   res:'几根线芯被剥掉', bar:['刀口选小了，钳口连线芯一起咬进去', '好几根线芯跟着绝缘层一起被剥掉 —— 从外面看不出来']},
  {t:'护套线', ok:true, sheath:true,
   res:'内部导线完好', bar:['从线缆中间、两根导线的缝隙处下刀', '刀尖沿缝走，碰不到任何一根线芯']},
  {t:'护套线', ok:false, sheath:true,
   res:'内部绝缘被划伤', bar:['从一侧下刀 —— 刀刃正对着里面那一根', '划开护套的同时把它的绝缘层也划开了']}
];
const S4 = { k:0 };
const st4 = new Stage('cv3', 360, CANH);

function draw4(){
  const g = st4.g; st4.clear();
  const it = SOFT[S4.k];
  EP.heading(g, 12, 14, it.sheath ? '塑料护套线' : '塑料软导线', it.ok ? '正确做法' : '错误操作');
  const cy = 76;
  if(!it.sheath){
    /* 软导线：多股线芯 */
    wire(g, 24, 306, cy, 190, {r:12, cr:5, strand:true, hurt:false});
    if(!it.ok){
      /* 掉了几根：画几根断在绝缘层外的线 */
      g.save(); g.strokeStyle = C.err; g.lineWidth = 1.4; g.lineCap = 'round';
      for(let i = 0; i < 3; i++){
        g.beginPath(); g.moveTo(196, cy - 6 + i*6); g.lineTo(228, cy - 22 + i*10); g.stroke();
      }
      g.restore();
      txt(g, '几根线芯被一起剥掉了', 250, cy - 30, {sz:9, b:1, c:C.err});
    }
    /* 剥线钳刀口 */
    const jx = 190;
    g.save(); g.fillStyle = it.ok ? C.metalD : C.err;
    g.beginPath(); g.moveTo(jx - 18, cy - 36); g.lineTo(jx + 18, cy - 36);
    g.lineTo(jx + (it.ok ? 7 : 3), cy - (it.ok ? 8 : 3));
    g.lineTo(jx - (it.ok ? 7 : 3), cy - (it.ok ? 8 : 3)); g.closePath(); g.fill();
    g.beginPath(); g.moveTo(jx - 18, cy + 36); g.lineTo(jx + 18, cy + 36);
    g.lineTo(jx + (it.ok ? 7 : 3), cy + (it.ok ? 8 : 3));
    g.lineTo(jx - (it.ok ? 7 : 3), cy + (it.ok ? 8 : 3)); g.closePath(); g.fill();
    g.restore();
    txt(g, it.ok ? '刀口 = 线径' : '刀口 < 线径', jx, cy + 50,
        {sz:9, b:1, c: it.ok ? C.ok : C.err});
  }else{
    /* 护套线：外面一层护套，里面两根 */
    box(g, 24, cy - 22, 290, 44, 14, '#3a4653', null, 0);
    wire(g, 30, 300, cy - 10, 180, {r:8, cr:3.4, ins:C.L});
    wire(g, 30, 300, cy + 10, 180, {r:8, cr:3.4, ins:C.N});
    txt(g, '护套层', 60, cy - 32, {sz:8.5, c:C.tx3});
    /* 刀的位置：中间缝隙 vs 一侧 */
    const ky = it.ok ? cy : cy - 10;
    g.save();
    g.fillStyle = it.ok ? (P.steelDD || C.metalD) : C.err;
    g.beginPath(); g.moveTo(172, ky); g.lineTo(177, ky - 10); g.lineTo(177, ky - 42);
    g.lineTo(169, ky - 42); g.lineTo(169, ky - 10); g.closePath(); g.fill();
    g.restore();
    txt(g, it.ok ? '从中间缝隙下刀' : '从一侧下刀', 210, ky - 44,
        {sz:9, b:1, c: it.ok ? C.ok : C.err, al:'left'});
    if(!it.ok){
      g.save(); g.strokeStyle = C.err; g.lineWidth = 2.2; g.lineCap = 'round';
      g.beginPath(); g.moveTo(166, cy - 16); g.lineTo(178, cy - 4); g.stroke(); g.restore();
      txt(g, '里面那根的绝缘层被划开', 180, cy + 40, {sz:9, b:1, c:C.err});
    }
  }
  box(g, 22, 132, 316, 46, 6, it.ok ? C.okbg : C.errbg, it.ok ? C.ok : C.err, 1.2);
  txt(g, it.res, 180, 148, {sz:11, b:1, c: it.ok ? C.ok : C.err});
  txt(g, it.sheath ? '护套线要先剥护套层，再分别剥里面两根的绝缘层'
                   : '软导线的线芯是多股细铜丝，不适宜用电工刀剥',
      180, 166, {sz:8.5, c:C.tx2});
  bar(g, it.bar[0], it.bar[1], it.ok ? 'ok' : 'err');
}
function note4(){
  const it = SOFT[S4.k];
  $('s4a').textContent = it.t;
  $('s4b').textContent = it.res;
  const H = [
    '<div class="st good">软导线：用剥线钳，选对刀口</div>' +
    '塑料软导线的线芯是<b>多股铜（铝）丝</b>组成的，' +
    '<b>不适宜用电工刀剥削绝缘层</b> —— 一刀下去就切断好几根。' +
    '实际操作中多使用<b>剥线钳和斜口钳</b>。' +
    '<div class="tip info" style="margin-top:8px">' +
    '用手握住导线，<b>根据软导线的直径选择合适的刀口</b>，' +
    '然后把导线放置在剥线钳刀口处，握住手柄轻轻用力，切断需剥削处的绝缘层。</div>',

    '<div class="st bad">✗ 刀口选小了</div>' +
    '书上专门提示：<b>切不可选择小于剥离线缆的刀口，' +
    '否则会导致软导线多根线芯与绝缘层一同被剥落。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '刀口比线径小，钳口合上时就<b>连线芯一起咬进去了</b>。' +
    '<span class="sub">断了几根之后：这根线的<b>载流能力下降</b>，' +
    '接上去那一段会发热；而且<b>从外面完全看不出来</b> ——' +
    '绝缘层剥掉了，谁会去数还剩几根丝？' +
    '所以选刀口这一下要认真，宁可选大一号再补一下。</span></div>',

    '<div class="st good">护套线：从中间缝隙下刀</div>' +
    '塑料护套线是<b>把两根带绝缘层的导线用护套层包裹在一起</b>。' +
    '剥的时候先剥护套层：<b>在线头所需的长度处，用电工刀从线缆的中间下刀，' +
    '下刀时找准中间位置，以免损伤内部线芯。</b>' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>为什么中间安全</b>：两根导线并排贴着，中间天然有一条缝，' +
    '<b>刀尖沿这条缝走，碰不到任何一根线芯</b>。' +
    '<span class="sub">下完刀，用刀尖在导线缝隙处划开护套层 → 向后扳翻 → 齐根切去，' +
    '和电工刀剥硬导线是同一套动作。</span></div>',

    '<div class="st bad">✗ 从一侧下刀</div>' +
    '书上原话：<b>切忌从线缆的一侧下刀，否则会导致内部的线缆损坏。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '一侧下刀，<b>刀刃正对着里面那一根导线</b> ——' +
    '划开护套的同时，把它的绝缘层也划开了。' +
    '<span class="sub"><b>而这道伤在护套层剥掉之前你根本看不见。</b>' +
    '装上去之后，护套里两根线慢慢碰上，就是一次短路 ——' +
    '而且故障点藏在护套里面，查起来非常费劲。</span></div>'
  ];
  $('n3').innerHTML = H[S4.k];
}
document.getElementById('s4k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S4.k = +t.dataset.k;
  document.querySelectorAll('#s4k .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.k === S4.k); });
  note4(); draw4();
});

/* ================================================================
   绑定
   ================================================================ */
function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  draw1(); draw2(); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:6, sec:'6.1'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('6.1');
  let h = '';
  h += nb.prev ? '<a href="'+nb.prev.f+'">‹ '+nb.prev.id+' '+nb.prev.t+'</a>'
               : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next && nb.next.f ? '<a class="next" href="'+nb.next.f+'">'+nb.next.id+' '+nb.next.t+' ›</a>'
               : '<span>下一节还没做</span>';
  $('pager').innerHTML = h;
})();
  }
});
})();
