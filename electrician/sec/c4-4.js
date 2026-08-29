/* 4.4 读一张原理图 —— 本节内容的唯一真相。
   对应《零基础学电工》第 4 章 4.3 节「基本识图方法」（书内 P74~P78）。

   书上这一节给的是**识图五要领 + 识图七步骤**（区分电路类型 → 明确用途 →
   建立对应关系·划分电路 → 寻找工作条件 → 寻找控制部件 → 确立控制关系 →
   理清信号流程），例图是**电动机点动控制**（图 4-17~4-22）。
   步骤照抄一遍没用 —— 那是一张检查表，不是一次阅读。所以四屏做成
   **真的把一张图从头读一遍**：

   ① 先分成两块     主电路（粗线·大电流）／控制电路（细线·小电流）—— 书上七步骤的第 3 步
   ② 顺着电流走一遍  五步连锁：合闸 → 按下 SB2 → 线圈得电 → 主触头闭合 → 电动机转
   ③ 自锁是怎么回事  点动 ↔ 自锁对比，**松手之后还转不转**
   ④ 停止与保护      停止按钮／热继电器／熔断器／隔离开关，各断在哪一环

   **四屏画的是同一张图**（`plant()` 一处画法，四屏都调它）——
   和 4.1 那节「同一个照明回路贯穿四屏」是同一条规矩。而且这张图会**逐屏长出来**：
   屏 1、2 是书上那张点动图（最简单的），屏 3 在它两端并上一个自锁触点，屏 4 用长齐的完整图。

   **书上没有自锁**（要到第 11 章才讲），屏 3 是我加的 ——
   理由是：光会读点动图，读不了现场任何一台设备的图，**自锁是控制电路的最小完整形态**。
   文案里注明了这一条。

   电路状态是**真算出来的**，不是按屏写死的（`ctrlOn()`）：
       控制回路通 = 合闸 && 熔断器好 && 热继没跳 && 没按停止 && ( 按着启动 || (有自锁 && 线圈已吸合) )
       线圈吸合   = 控制回路通
       主回路通   = 合闸 && 熔断器好 && 线圈吸合
   最后那个「线圈已吸合」用的是**上一刻的值**，所以自锁的正反馈是自然出现的，
   不用另写分支 —— 屏 3「松手还转」和屏 4「断哪一环都停」共用这一个函数。

   数字口径：三相 AC 380 V，控制回路从 L1、L3 两相之间取电，所以是 **380 V 控制回路**
   （现场也常见用控制变压器降到 220 V 或 24 V，文案里点了一句，图上按书上的画）。 */
(function(){
'use strict';
ELEC.reg({
  id: '4.4',
  file: 'c4-4.html',
  title: '4.4 读一张原理图',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>先分两块</button>
    <button class="tab" data-i="1"><span class="n">2</span>顺着走一遍</button>
    <button class="tab" data-i="2"><span class="n">3</span>自锁</button>
    <button class="tab" data-i="3"><span class="n">4</span>停止与保护</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">拿到一张图，第一件事是把它切成两块</div>
    不管图上有多少个符号，先只问一句：<b>哪些是走大电流的，哪些是走小电流的。</b>
    走大电流那一块叫<b>主电路</b>（线画得粗），走小电流那一块叫<b>控制电路</b>（线画得细）。
    <b>这两块各读各的，一下就不乱了。</b>切一块看看。
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">主电路</button>
        <button class="btn sm" data-k="1">控制电路</button>
        <button class="btn sm" data-k="2">两块怎么配合</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这一块</div><div class="v" id="s1a">主电路</div></div>
        <div class="num"><div class="k">走多大电流</div><div class="v" id="s1b">几十安级</div></div>
        <div class="num hi"><div class="k">串着什么</div><div class="v" id="s1c">电动机</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">两块怎么分，三条判据</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>主电路</th><th>控制电路</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">线</td><td><b>画得粗</b></td><td>画得细</td></tr>
        <tr><td class="eu-s">串着<br>什么</td><td><b>电动机、加热器</b>这些真干活的</td>
          <td><b>线圈、按钮、触点</b>这些发命令的</td></tr>
        <tr><td class="eu-s">电流</td><td>几安到几百安</td><td>通常不到 1 安</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>位置也有习惯：主电路画在左边（或上面），控制电路画在右边（或下面）。</b>
      <span class="sub">但习惯归习惯，靠不住 —— <b>真正可靠的判据是「这条线上串着什么」</b>：
      串着电动机就是主电路，串着线圈就是控制电路。</span>
    </div>
  </div>

  <div class="bet" data-bet="c44-split" data-q="一张图上，某条支路串着一个接触器的线圈和两个按钮。这是主电路还是控制电路？"
       data-opts="主电路，因为接触器是个大家伙|控制电路——线圈和按钮都是「发命令的」，走的电流很小|看不出来，要量了才知道" data-right="1"
       data-after="控制电路。判据不是器件大不大，是这条线上串着什么：串着电动机、加热器这类真干活的，是主电路；串着线圈、按钮、触点这类发命令的，是控制电路。接触器本身横跨两块——它的线圈在控制电路里，主触头在主电路里（4.2 那条 KM / KM-1 就是说的这件事）。"></div>
</section>

<!-- ================= 场景 2：顺着电流走一遍 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">分完块，就顺着电流走一遍</div>
    读原理图不是一个符号一个符号地认，是<b>顺着电流从头走到尾，看它一路上被谁挡着、被谁放行</b>。
    这张点动控制图，从合闸到电动机转，中间是<b>五步连锁</b>。
    <b>一步一步点下去。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">① 合闸</button>
        <button class="btn sm" data-k="1">② 按 SB2</button>
        <button class="btn sm" data-k="2">③ 线圈得电</button>
        <button class="btn sm" data-k="3">④ 触头闭合</button>
        <button class="btn sm" data-k="4">⑤ 电动机转</button>
      </div>
      <div class="nums">
        <div class="num"><div class="k">这一步</div><div class="v" id="s2a">合上 QS</div></div>
        <div class="num hi"><div class="k">电动机</div><div class="v" id="s2b">不转</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">这五步里，第 ③④ 步之间是整张图的转折</div>
    前两步都在控制电路里（小电流），后两步都在主电路里（大电流）。
    <b>把这两块连起来的，就是接触器</b>：线圈在控制电路里得电 → 衔铁吸合 →
    它带动的主触头在主电路里闭合。
    <div class="tip">
      <b>「用小电流控大电流」这句话，在图上就是这一跳。</b>
      按钮上走的电流不到 1 安，一根细线、一个小按钮就够；
      而它间接接通的是几十安的电动机电流。
      <span class="sub">2.2 节那个接触器演示台演的就是这一下的机构动作。</span>
    </div>
  </div>

  <div class="bet" data-bet="c44-trace" data-q="这张图上，控制电路的电是从哪儿来的？"
       data-opts="另外接了一路电源|就从 L1 和 L3 两根相线之间取的，所以控制回路上是 380 V|从电动机上引出来的" data-right="1"
       data-after="从 L1 和 L3 之间取的，两相之间是 380 V。所以这张图的控制回路工作在 380 V——按钮、线圈都得是 380 V 的。现场也常见另加一个控制变压器把它降到 220 V 或 24 V，那样按钮上就没有 380 V 了，更安全；图上会多出一个变压器 TC。"></div>
</section>

<!-- ================= 场景 3：自锁 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">松手就停，还是松手接着转</div>
    上一屏那张图有个毛病：<b>手一松，电动机就停</b>（这叫点动）。
    想让它松手也接着转，只要加<b>一个触点</b> —— 把接触器自己的一个动合辅助触点
    <b>并在启动按钮的两端</b>。
    <b>下面切「有／没有」那个触点，再按一下、松一下。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">没有自锁触点（点动）</button>
        <button class="btn sm" data-k="1">并上自锁触点</button>
      </div>
      <div class="btns" id="s3p">
        <button class="btn sm" data-p="1">按住启动按钮</button>
        <button class="btn on sm" data-p="0">松手</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">现在</div><div class="v" id="s3a">松着手</div></div>
        <div class="num"><div class="k">线圈</div><div class="v" id="s3b">没电</div></div>
        <div class="num hi"><div class="k">电动机</div><div class="v" id="s3c">不转</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">自锁就是「它自己把自己的电接住了」</div>
    按下 SB2 的那一瞬间，电流从按钮走，线圈得电；线圈一得电，它的<b>辅助触点 KM-2 跟着闭合</b>，
    而这个触点正好<b>跨在按钮两端</b> —— 于是电流多了一条路可以走。
    这时候松开按钮，按钮那条路断了，<b>电流改走 KM-2 这条路，线圈照样有电</b>。
    <div class="tip">
      <b>关键在于：让线圈保持得电的那个触点，正是线圈自己带的。</b>
      所以它叫「自锁」，也叫「自保持」。
      <span class="sub">一旦线圈因为任何原因失电（按停止、热继电器跳、停电），
      KM-2 立刻断开，<b>这条自己接住自己的路也就没了</b> ——
      来电之后不会自己重新启动，必须再按一次 SB2。这叫<b>失压保护</b>，2.2 节讲过。</span>
    </div>
  </div>

  <div class="bet" data-bet="c44-lock" data-q="自锁触点必须是接触器自己的触点吗？换成一个普通开关并在按钮两端行不行？"
       data-opts="行，只要能把电接住就一样|不行——必须是它自己的触点，否则停电再来电时设备会自己启动|不行，普通开关电流不够" data-right="1"
       data-after="必须是它自己的触点。用普通开关的话，你合上它电动机就一直转，停电再来电它自己就启动了——人可能正在里面修。用接触器自己的辅助触点，线圈一失电触点跟着断开，来电后必须有人再按一次启动按钮。这个特性叫失压（欠压）保护，是自锁白送的一条安全性。"></div>
</section>

<!-- ================= 场景 4：停止与保护 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">让它停下来的，一共有四个地方</div>
    电动机现在转着。<b>能让它停的每一个环节，在图上都是控制回路里的一个断点</b>——
    找到这些断点，等于找到了「设备为什么停」的全部答案。
    <b>点一个环节，让它动作看看。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">停止按钮 SB1</button>
        <button class="btn sm" data-k="1">热继电器 FR</button>
        <button class="btn sm" data-k="2">熔断器 FU4</button>
        <button class="btn sm" data-k="3">隔离开关 QS</button>
      </div>
      <div class="btns" id="s4t">
        <button class="btn on sm" data-t="0">正常运行</button>
        <button class="btn sm" data-t="1">让它动作</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这一环</div><div class="v" id="s4a">停止按钮</div></div>
        <div class="num"><div class="k">断在哪</div><div class="v" id="s4b">控制回路</div></div>
        <div class="num hi"><div class="k">电动机</div><div class="v" id="s4c">转</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">四个环节断的位置不一样，后果也不一样</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>环节</th><th>断在哪</th><th>断了之后主电路</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">SB1<br>停止</td><td>控制回路</td>
          <td><b>仍然带电</b>（QS、FU、KM 上口都有 380 V），只是主触头弹开了</td></tr>
        <tr><td class="eu-s">FR<br>热继</td><td>控制回路</td>
          <td>同上。<b>热继电器不切断大电流</b>，它只是让线圈失电</td></tr>
        <tr><td class="eu-s">FU4<br>熔断器</td><td>控制回路</td>
          <td>同上。<b>主电路那三个 FU1~3 是另一回事</b>，它们断了主电路才真断</td></tr>
        <tr><td class="eu-s">QS<br>隔离</td><td><b>总进线</b></td>
          <td><b>整张图都没电了</b> —— 只有这一个能做到</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>「按了停止 ≠ 可以动手」，这条要记死。</b>
      按下停止按钮，电动机是不转了，可 QS 下口、FU、KM 主触头上口全都还是 380 V。
      <span class="sub">检修必须走完整套：<b>断开隔离开关（或断路器）→ 验电 → 放电 → 挂牌上锁</b>。
      3.5 节那句「不亮≠没电」说的是同一件事的另一半。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">热继电器为什么把触点串在控制回路，而不是直接断主电路</div>
    因为<b>控制回路的电流小</b>，一对小触点就够；要直接断几十安的主电流，
    那得做成一个接触器那么大的东西。
    <b>让线圈失电，主触头自己会弹开 —— 大电流交给接触器去断，这才是分工。</b>
    <div class="tip info">
      同一个道理解释了这张图上几乎所有的安排：<b>按钮、热继电器触点、自锁触点</b>
      全都在控制回路里，<b>只有接触器的主触头</b>站在主电路上真刀真枪地断大电流。
    </div>
  </div>

  <div class="quiz" data-quiz="c4-4">
    <div class="qz" data-q="一张原理图上，怎么一眼把主电路和控制电路分开？"
         data-opts="左边的是主电路，右边的是控制电路|看这条线上串着什么：串着电动机这类真干活的是主电路，串着线圈、按钮的是控制电路|看线的颜色"
         data-right="1"
         data-why="看串着什么。位置（主电路在左/上、控制电路在右/下）和线的粗细都是习惯，多数时候对，但靠不住；可靠的判据是「这条线上串着什么」。接触器本身横跨两块——线圈在控制电路，主触头在主电路，这正是它作为「桥」的位置。"></div>
    <div class="qz" data-q="按下启动按钮后松手，电动机继续转。靠的是什么？"
         data-opts="按钮是自锁式的，按下去弹不回来|接触器自己的一个动合辅助触点并在启动按钮两端，线圈一得电它就闭合，把按钮那条路替下来|电动机有惯性"
         data-right="1"
         data-why="靠接触器自己的动合辅助触点（KM-2）并在启动按钮两端。线圈一得电，这个触点闭合，给电流开了第二条路；松开按钮后电流改走这条路，线圈照样有电。因为用的是它自己的触点，一旦线圈失电触点就断开——所以停电再来电不会自己启动，这是白送的失压保护。"></div>
    <div class="qz" data-q="热继电器的触点为什么串在控制回路里，而不是直接串在主电路上切断大电流？"
         data-opts="因为热继电器装不下那么粗的线|控制回路电流小，一对小触点就够；让线圈失电，主触头自己会弹开——大电流交给接触器去断|因为国标规定热继电器只能接控制回路"
         data-right="1"
         data-why="分工问题。要直接断几十安的主电流，触点得做得跟接触器一样大、一样贵。串在控制回路里只需要一对小触点，断掉线圈的电，主触头自己就弹开了。这张图上按钮、热继电器触点、自锁触点全在控制回路，只有接触器主触头站在主电路上断大电流。"></div>
    <div class="qz" data-q="按下停止按钮，电动机停了。现在可以动手拆接线盒了吗？"
         data-opts="可以，已经停了|不可以——停止按钮只断了控制回路，QS 下口、熔断器、主触头上口仍然是 380 V；必须断开隔离开关、验电、放电、挂牌|先用手背碰一下试试"
         data-right="1"
         data-why="不可以。停止按钮断的是控制回路，主电路从进线一直到接触器主触头上口全都还带着 380 V，只是主触头弹开了而已。四个环节里只有 QS（隔离开关）断的是总进线，能让整张图没电。检修必须走完整套：断开隔离开关或断路器 → 验电 → 放电 → 挂牌上锁。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 4 章 4.3 节·基本识图方法（书内 P74~P78）<br>书上那张例图是点动控制，屏 3 的自锁是加的（书上第 11 章才讲），但不会自锁就读不了现场任何一张图</div>
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

/* ================================================================
   几何：四屏共用的一张电动机控制原理图
   ================================================================
   主电路在左（三条竖线，粗），控制电路在右（一个回路，细）——
   这是图纸的通行摆法，屏 1 讲的就是它。
   三条相线的横线里，**L2 在自己的下引点就终止**（和 4.2 那张图同一个处理），
   省掉两处交叉；剩下的交叉一律不打点，丁字才打点（4.1、4.3 讲过的规矩）。 */
const Y1 = 36, Y2 = 50, Y3 = 64;            /* 三条相线 */
const MX = [56, 78, 100];                   /* 主电路三条竖线 */
const QSY = 84, FUY = 118, KMY = 152, FRY = 186;
const MJOIN = 225, MOTY = 252, MOTR = 20;
const CLX = 228, CRX = 330;                 /* 控制回路：下行 / 回线 */
const CFU = 86, CFR = 118, CSB1 = 152, CSB2 = 190;
const LKX = 302, LKY0 = 172, LKY1 = 208;    /* 自锁支路 */
const COILY = 260, COILX = 279, COILW = 40;
const LWM = 2.8, LWC = 1.8;                 /* 主电路粗、控制电路细 —— 这本身是识图判据 */

/* **导线要分段画，把每个元件占的那一段让出来**。
   一根到底的话，触点断开了底下的线还连着，图就自己打自己的嘴（4.1 那条坑）。
   每段的端点必须和元件的上下端严丝合缝地对上 */
const SEG_M = [[QSY-13, FUY-5], [FUY+5, KMY-12], [KMY+12, FRY-9], [FRY+9, MJOIN]];
const SEG_C = [[Y1, CFU-5], [CFU+5, CFR-10], [CFR+10, CSB1-10],
               [CSB1+10, CSB2-10], [CSB2+10, COILY]];
function vsegs(g, x, segs, lw){
  segs.forEach(function(a){ new Path([[x,a[0]],[x,a[1]]]).stroke(g, lw, C.wire); });
}

/* 流动路径：控制回路两段（线圈把它断成左右两半），主电路三条 */
const PMAIN = MX.map(function(x, i){
  return new Path([[x, [Y1,Y2,Y3][i]], [x, MJOIN], [[66,78,90][i], 232]]);
});
const PC_A  = new Path([[CLX,Y1],[CLX,COILY],[COILX-COILW/2,COILY]]);
const PC_LK = new Path([[CLX,Y1],[CLX,LKY0],[LKX,LKY0],[LKX,LKY1],[CLX,LKY1],
                        [CLX,COILY],[COILX-COILW/2,COILY]]);
const PC_B  = new Path([[COILX+COILW/2,COILY],[CRX,COILY],[CRX,Y3]]);

/* ================================================================
   这一节自己画的几个符号（要跟着状态开合，ESYM 那套是静态的）
   ================================================================ */
function dot(g, x, y, c, r){
  g.save(); g.fillStyle = c; g.beginPath(); g.arc(x, y, r || 2.6, 0, Math.PI*2); g.fill(); g.restore();
}
/* 三极隔离开关：三把**竖着**的斜刀（这张图三条主线是竖的）+ 一根虚线连杆。
   合闸时刀立直，断开时往右上抬 —— 断口一眼看得见，这正是隔离开关存在的理由 */
function knife3V(g, xs, y, on, c, lw, a){
  const yt = y - 13, yb = y + 13;
  g.save();
  g.strokeStyle = c; g.lineWidth = lw; g.lineCap = 'round'; g.globalAlpha = a;
  xs.forEach(function(x){
    g.beginPath(); g.moveTo(x, yb);
    /* 合闸也留 4px 的斜度 —— 画成笔直的话刀和导线重合，一眼看不出这儿有个开关 */
    if(on) g.lineTo(x + 4, yt); else g.lineTo(x + 12, yt + 4);
    g.stroke();
    g.fillStyle = c;
    g.beginPath(); g.arc(x, yt, 3, 0, Math.PI*2); g.fill();
    g.beginPath(); g.arc(x, yb, 3, 0, Math.PI*2); g.fill();
  });
  g.restore();
  linkDash(g, xs[0] + (on?4:12), xs[2] + (on?4:12), yt + 4, c, a);
}
/* 三个触点顶上那条机械联动虚线（表示三极同时动） */
function linkDash(g, x0, x1, y, c, a){
  g.save();
  g.strokeStyle = c; g.lineWidth = 1.1; g.setLineDash([3,3]); g.globalAlpha = (a==null?1:a) * .8;
  g.beginPath(); g.moveTo(x0, y); g.lineTo(x1, y); g.stroke();
  g.restore();
}
/* 熔断器：方框 + 一条贯穿线。先填底色盖住导线，再补中间那条 */
function fuseH(g, x, y, c, blown){
  const L = 20, W = 9;
  box(g, x - L/2, y - W/2, L, W, 1.5, C.box, c, 1.5);
  g.save();
  g.strokeStyle = blown ? C.err : c; g.lineWidth = 1.3;
  if(blown){
    g.beginPath(); g.moveTo(x - L/2, y); g.lineTo(x - 3, y);
    g.moveTo(x + 3, y); g.lineTo(x + L/2, y); g.stroke();
    g.lineWidth = 1.8;
    g.beginPath(); g.moveTo(x - 3.5, y - 3.5); g.lineTo(x + 3.5, y + 3.5);
    g.moveTo(x + 3.5, y - 3.5); g.lineTo(x - 3.5, y + 3.5); g.stroke();
  }else{
    g.beginPath(); g.moveTo(x - L/2, y); g.lineTo(x + L/2, y); g.stroke();
  }
  g.restore();
}
/* 竖直动合触点。on 时立起来贴住，画一个绿点表示接通 */
function cNO(g, x, y, on, c, lw, h){
  h = h || 24;
  const yt = y - h/2, yb = y + h/2;
  g.save();
  g.strokeStyle = c; g.lineWidth = lw; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x, yb);
  if(on) g.lineTo(x + 4, yt); else g.lineTo(x + 11, yt + 5);
  g.stroke();
  g.restore();
  dot(g, x, yt, c); dot(g, x, yb, c);
  if(on) dot(g, x, yt, C.ok, 3.4);
}
/* 竖直动断触点：静触点端多一条横杠，动臂常态压在上面（4.3 屏 1 讲过的记号） */
function cNC(g, x, y, open, c, lw, h){
  h = h || 24;
  const yt = y - h/2, yb = y + h/2;
  g.save();
  g.strokeStyle = c; g.lineWidth = lw; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x, yt - 0.5); g.lineTo(x, yt); g.stroke();
  g.beginPath(); g.moveTo(x - 6, yt); g.lineTo(x + 15, yt); g.stroke();
  g.beginPath(); g.moveTo(x, yb);
  if(open) g.lineTo(x + 15, yt + 13); else g.lineTo(x + 7, yt + 1);
  g.stroke();
  g.restore();
  dot(g, x, yb, c);
  if(!open) dot(g, x + 7, yt + 1, C.ok, 3.4);
}
/* 按钮 = 触点 + 一根虚线推杆（虚线是机械联动，不导电 —— 4.3 屏 2 的规矩） */
/* 推杆只往左伸 14px：伸 26 的话 T 形帽正好压在「KM-1  主触头」那行标注上 */
function rod(g, x, y, c, a){
  g.save(); g.globalAlpha = a;
  g.strokeStyle = C.tx3; g.lineWidth = 1.1; g.setLineDash([3.5,3.5]);
  g.beginPath(); g.moveTo(x, y); g.lineTo(x - 14, y); g.stroke();
  g.restore();
  g.save(); g.globalAlpha = a;
  g.strokeStyle = c; g.lineWidth = 1.6; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x - 14, y); g.lineTo(x - 14, y - 13); g.stroke();
  g.beginPath(); g.moveTo(x - 20, y - 13); g.lineTo(x - 8, y - 13); g.stroke();
  g.restore();
}
/* 热元件：串在主电路上的一个小方框（热继电器的发热部分） */
function heater(g, x, y, c, lw){
  box(g, x - 7, y - 9, 14, 18, 2, C.box, c, lw);
  g.save();
  g.strokeStyle = c; g.lineWidth = 1.2;
  g.beginPath();
  g.moveTo(x - 4, y - 5); g.lineTo(x + 4, y - 1); g.lineTo(x - 4, y + 3); g.lineTo(x + 4, y + 7);
  g.stroke();
  g.restore();
}
/* 线圈：一个矩形，水平串在底部那条线上 */
function coil(g, x, y, c, lit){
  box(g, x - COILW/2, y - 11, COILW, 22, 2, lit ? C.accbg : C.box, c, 2);
}
function motor(g, x, y, c, spin, t, a){
  g.save(); g.globalAlpha = (a == null ? 1 : a);
  g.beginPath(); g.arc(x, y, MOTR, 0, Math.PI*2);
  g.fillStyle = C.box; g.fill();
  g.lineWidth = 2.2; g.strokeStyle = c; g.stroke();
  if(spin){
    /* 转起来：圈里一段弧扫一圈，比写「转」两个字直观 */
    g.strokeStyle = C.ok; g.lineWidth = 2.4; g.lineCap = 'round';
    const a = (t || 0) * 3.2;
    g.beginPath(); g.arc(x, y, MOTR - 5, a, a + 1.5); g.stroke();
    g.beginPath(); g.arc(x, y, MOTR - 5, a + Math.PI, a + Math.PI + 1.5); g.stroke();
  }
  g.restore();
  txt(g, 'M', x, y - 5, {sz:14, b:1, c:c, a:a});
  txt(g, '3~', x, y + 9, {sz:9, c: spin ? C.ok : C.tx2, a:a});
}

/* ================================================================
   状态求解 —— 四屏共用，别在各屏里另写一套
   ================================================================
   最后那个 s.km 用的是**上一刻的值**，自锁的正反馈就是这么自然出现的。 */
function ctrlOn(s){
  if(!s.qs || !s.fu) return false;
  if(s.fr || s.sb1) return false;
  return !!(s.sb2 || (s.lock && s.km));
}
function step(s){ s.km = ctrlOn(s); return s; }
function mainOn(s){ return !!(s.qs && s.fu && s.km); }

/* ================================================================
   plant() —— 整张图的唯一画法，四屏都调它
   ================================================================
   o.s    状态 {qs,fu,fr,sb1,sb2,lock,km}
   o.dim  'main' | 'ctrl' —— 要变淡的那一半（屏 1 分块用）
   o.ph   流动相位（秒）
   o.hot  [ [x,y,r] 或 {x,y,w,h} ] —— 要套虚线环的地方
   o.t    时间，电动机转动用 */
function plant(g, o){
  o = o || {};
  const s = o.s, ph = (o.ph || 0) * 46;
  const cOn = ctrlOn(s), mOn = mainOn(s);
  const dimM = o.dim === 'main' ? .26 : 1;
  const dimC = o.dim === 'ctrl' ? .26 : 1;

  /* ---------- 三条相线（两块共用，永远不变淡） ---------- */
  g.save();
  new Path([[24,Y1],[CLX,Y1]]).stroke(g, LWM, C.wire);
  new Path([[24,Y2],[MX[1],Y2]]).stroke(g, LWM, C.wire);
  new Path([[24,Y3],[CRX,Y3]]).stroke(g, LWM, C.wire);
  txt(g, 'L1', 20, Y1, {sz:9, b:1, c:C.tx2, al:'right'});
  txt(g, 'L2', 20, Y2, {sz:9, b:1, c:C.tx2, al:'right'});
  txt(g, 'L3', 20, Y3, {sz:9, b:1, c:C.tx2, al:'right'});
  /* 丁字打点，交叉不打点 —— 4.1 / 4.3 讲过的规矩，这张图上一次用全 */
  dot(g, MX[0], Y1, C.wire, 3); dot(g, MX[2], Y3, C.wire, 3);
  g.restore();

  /* ---------- 主电路 ---------- */
  g.save(); g.globalAlpha = dimM;
  MX.forEach(function(x, i){
    new Path([[x, [Y1,Y2,Y3][i]], [x, QSY-13]]).stroke(g, LWM, C.wire);
    vsegs(g, x, SEG_M, LWM);
  });
  new Path([[MX[0],MJOIN],[66,232]]).stroke(g, LWM, C.wire);
  new Path([[MX[1],MJOIN],[MX[1],232]]).stroke(g, LWM, C.wire);
  new Path([[MX[2],MJOIN],[90,232]]).stroke(g, LWM, C.wire);
  if(mOn) PMAIN.forEach(function(p){ EC.dots(g, p, {gap:26, r:2.6, color:C.cur, phase:ph}); });
  knife3V(g, MX, QSY, !!s.qs, s.qs ? C.wire : C.err, LWM, dimM);
  MX.forEach(function(x){ fuseH(g, x, FUY, C.wire, false); });
  MX.forEach(function(x){ cNO(g, x, KMY, !!s.km, C.wire, LWM); });
  linkDash(g, MX[0] + (s.km?4:11), MX[2] + (s.km?4:11), KMY - 12, C.wire, dimM);
  MX.forEach(function(x){ heater(g, x, FRY, s.fr ? C.warn : C.wire, LWM); });
  motor(g, MX[1], MOTY, C.wire, mOn, o.t, dimM);
  /* 主电路标注：右边那一片是三相图天然的空地。
     **a 必须逐个传** —— EC.txt 内部把 globalAlpha 硬设成 1，外层的 g.globalAlpha 盖不住它 */
  txt(g, 'QS', 116, QSY, {sz:9.5, b:1, c:C.tx, al:'left', a:dimM});
  txt(g, 'FU1~FU3', 116, FUY, {sz:9.5, b:1, c:C.tx, al:'left', a:dimM});
  txt(g, 'KM-1  主触头', 116, KMY, {sz:9.5, b:1, c:C.tx, al:'left', a:dimM});
  txt(g, 'FR  热元件', 116, FRY, {sz:9.5, b:1, c:C.tx, al:'left', a:dimM});
  txt(g, '三相电动机', 110, MOTY, {sz:9.5, b:1, c:C.tx, al:'left', a:dimM});
  g.restore();

  /* ---------- 控制电路 ---------- */
  g.save(); g.globalAlpha = dimC;
  vsegs(g, CLX, SEG_C, LWC);
  new Path([[CLX,COILY],[COILX-COILW/2,COILY]]).stroke(g, LWC, C.wire);
  new Path([[COILX+COILW/2,COILY],[CRX,COILY],[CRX,Y3]]).stroke(g, LWC, C.wire);
  if(s.lock){
    new Path([[CLX,LKY0],[LKX,LKY0],[LKX,LKY0+8]]).stroke(g, LWC, C.wire);
    new Path([[LKX,LKY1-8],[LKX,LKY1],[CLX,LKY1]]).stroke(g, LWC, C.wire);
    dot(g, CLX, LKY0, C.wire, 3); dot(g, CLX, LKY1, C.wire, 3);
  }
  if(cOn){
    const via = (s.sb2 || !s.lock) ? PC_A : PC_LK;
    EC.dots(g, via, {gap:24, r:2.4, color:C.cur, phase:ph});
    EC.dots(g, PC_B, {gap:24, r:2.4, color:C.cur, phase:ph});
  }
  fuseH(g, CLX, CFU, C.wire, !s.fu);
  cNC(g, CLX, CFR, !!s.fr, s.fr ? C.warn : C.wire, LWC, 20);
  cNC(g, CLX, CSB1, !!s.sb1, C.wire, LWC, 20);
  rod(g, CLX, CSB1 - 9, C.wire, dimC);
  cNO(g, CLX, CSB2, !!s.sb2, C.wire, LWC, 20);
  rod(g, CLX, CSB2 - 9, C.wire, dimC);
  if(s.lock) cNO(g, LKX, (LKY0+LKY1)/2, !!s.km, C.wire, LWC, 20);
  coil(g, COILX, COILY, C.wire, cOn);
  /* 控制电路标注：一律放元件右边，那儿到回线还有 90px */
  txt(g, 'FU4', 244, CFU, {sz:9.5, b:1, c:C.tx, al:'left', a:dimC});
  txt(g, 'FR  动断', 244, CFR, {sz:9.5, b:1, c:C.tx, al:'left', a:dimC});
  txt(g, 'SB1  停止', 244, CSB1, {sz:9.5, b:1, c:C.tx, al:'left', a:dimC});
  txt(g, 'SB2  启动', 244, CSB2, {sz:9.5, b:1, c:C.tx, al:'left', a:dimC});
  if(s.lock) txt(g, 'KM-2', LKX, LKY1 + 12, {sz:9.5, b:1, c:C.tx, a:dimC});
  txt(g, 'KM  线圈', COILX, COILY - 20, {sz:9.5, b:1, c:C.tx, a:dimC});
  g.restore();

  /* ---------- 可点提示 ---------- */
  (o.hot || []).forEach(function(h){
    if(h.w) hot(g, h.x, h.y, 0, {w:h.w, h:h.h, r:8});
    else hot(g, h[0], h[1], h[2]);
  });
}
/* 结论条：四屏统一放在画布最底下 */
function bar(g, l1, l2, kind){
  const bg = kind === 'ok' ? C.okbg : kind === 'err' ? C.errbg : C.accbg;
  const fg = kind === 'ok' ? C.ok : kind === 'err' ? C.err : C.acc;
  EC.box(g, 18, 284, 324, 38, 6, bg, fg, 1);
  txt(g, l1, 180, 297, {sz:10.5, b:1, c:fg});
  txt(g, l2, 180, 312, {sz:9, c:C.tx2});
}
const CANH = 330;

/* ================================================================
   场景 1：先分成两块
   ================================================================ */
const SPLIT = [
  {t:'主电路', cur:'几十安级', has:'电动机',
   dim:'ctrl', bar:['主电路 —— 真干活的那一块', '线画得粗　串着电动机　从 QS 一路到 M']},
  {t:'控制电路', cur:'不到 1 安', has:'线圈和按钮',
   dim:'main', bar:['控制电路 —— 发命令的那一块', '线画得细　串着按钮和线圈　只管让接触器吸不吸合']},
  {t:'两块一起', cur:'一大一小', has:'接触器横跨两块',
   dim:null, bar:['接触器是两块之间的桥', '线圈在控制电路里　主触头在主电路里　同一只器件']}
];
const S1 = { k:0 };
const st1 = new Stage('cv0', 360, CANH);

function draw1(){
  const g = st1.g; st1.clear();
  const it = SPLIT[S1.k];
  EP.heading(g, 12, 14, '电动机点动控制', '三相 AC 380 V');
  const s = step({qs:1, fu:1, fr:0, sb1:0, sb2:0, lock:0, km:0});
  const hots = [];
  if(S1.k === 2){ hots.push({x:MX[1], y:KMY, w:74, h:34}); hots.push({x:COILX, y:COILY, w:52, h:30}); }
  plant(g, {s:s, dim:it.dim, hot:hots});
  if(S1.k !== 1) EP.chip(g, '主电路', 160, 214, {sz:9.5, b:1, c:C.acc});
  if(S1.k !== 0) EP.chip(g, '控制电路', 294, 100, {sz:9.5, b:1, c:C.acc});
  bar(g, it.bar[0], it.bar[1]);
}
function note1(){
  const it = SPLIT[S1.k];
  $('s1a').textContent = it.t;
  $('s1b').textContent = it.cur;
  $('s1c').textContent = it.has;
  let h = '';
  if(S1.k === 0) h =
    '<div class="st">主电路 —— 从进线一路到电动机</div>' +
    '顺着看下来就是：<b>三相进线 L1 L2 L3 → QS 隔离开关 → FU1~FU3 熔断器 → ' +
    'KM-1 主触头 → FR 热元件 → 电动机 M</b>。' +
    '<b>这一串全是串联的</b>，中间任何一处断了，电动机就转不了。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>三条线并排走、每一处元件都是三个一组</b>，这是三相电路的样子 ——' +
    '一眼看出「这是给三相电动机供电的」。<span class="sub">线画得比右边粗，' +
    '这不是随手画的：<b>粗线＝主电路</b>是制图的通行做法。</span></div>';
  else if(S1.k === 1) h =
    '<div class="st">控制电路 —— 一个回路，串着几个开关和一个线圈</div>' +
    '它从 <b>L1 和 L3 两根相线之间</b>取电，绕一圈回去：' +
    '<b>FU4 熔断器 → FR 动断触点 → SB1 停止 → SB2 启动 → KM 线圈 → 回 L3</b>。' +
    '<b>这一串也全是串联的</b>，断一处线圈就没电。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>控制回路里的电流很小</b>（线圈也就零点几安），所以线细、按钮小、触点也小。' +
    '<span class="sub">这张图的控制回路是<b>两相之间的 380 V</b>。现场也常见另加一个' +
    '控制变压器 TC 降到 220 V 或 24 V —— 按钮上就没有 380 V 了，安全得多。</span></div>';
  else h =
    '<div class="st good">两块之间只靠一样东西连着：接触器</div>' +
    '两块电路<b>没有一根导线相通</b>。把它们连起来的是接触器这个器件本身：' +
    '<b>KM 线圈</b>在控制电路里（图上右下角那个方框），' +
    '<b>KM-1 主触头</b>在主电路里（图上中间那三个触点）—— <b>实物是同一只接触器</b>。' +
    '<div class="tip" style="margin-top:8px">' +
    '线圈一得电，衔铁吸合，把主触头一起带闭合。<b>「用小电流控大电流」在图上就是这一跳。</b>' +
    '<span class="sub">4.2 那一节讲的 KM 和 KM-1 为什么是同一只器件，说的就是这里；' +
    '4.5 节会去实物上把它们找出来。</span></div>';
  $('n0').innerHTML = h;
}
document.getElementById('s1k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S1.k = +t.dataset.k;
  document.querySelectorAll('#s1k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S1.k);
  });
  note1(); draw1();
});

/* ================================================================
   场景 2：顺着电流走一遍（五步连锁）
   ================================================================ */
const STEPS = [
  {t:'合上 QS', run:'不转', s:{qs:1,sb2:0,km:0},
   hot:[{x:MX[1],y:QSY,w:56,h:34}],
   bar:['电送到主触头上口就停住了', 'KM-1 是断开的 —— 图上画的就是「线圈没电」的样子']},
  {t:'按下 SB2', run:'不转', s:{qs:1,sb2:1,km:0},
   hot:[{x:CLX+8,y:CSB2,w:52,h:32}],
   bar:['控制回路接通了', '电流从 L1 → FU4 → FR → SB1 → SB2 → 线圈 → 回 L3']},
  {t:'线圈得电', run:'不转', s:{qs:1,sb2:1,km:0},
   hot:[{x:COILX,y:COILY,w:56,h:32}],
   bar:['KM 线圈得电，衔铁吸合', '这是控制电路能做的全部 —— 它只负责让接触器吸合']},
  {t:'触头闭合', run:'不转', s:{qs:1,sb2:1,km:1},
   hot:[{x:MX[1],y:KMY,w:74,h:34}],
   bar:['主触头 KM-1 跟着闭合', '线圈和主触头之间没有导线，是机械带动的']},
  {t:'电动机转', run:'转', s:{qs:1,sb2:1,km:1},
   hot:[{x:MX[1],y:MOTY,w:56,h:56}],
   bar:['主电路通了，电动机转', '松开 SB2 就停 —— 这叫点动，下一屏解决它']}
];
const S2 = { k:0 };
const st2 = new Stage('cv1', 360, CANH);

function draw2(t){
  const g = st2.g; st2.clear();
  const it = STEPS[S2.k];
  EP.heading(g, 12, 14, '顺着电流走一遍', '第 ' + (S2.k+1) + ' 步 / 共 5 步');
  const s = {qs:it.s.qs, fu:1, fr:0, sb1:0, sb2:it.s.sb2, lock:0, km:it.s.km};
  plant(g, {s:s, ph:t, t:t, hot:it.hot});
  bar(g, it.bar[0], it.bar[1], S2.k === 4 ? 'ok' : null);
}
function note2(){
  const it = STEPS[S2.k];
  $('s2a').textContent = it.t;
  $('s2b').textContent = it.run;
  const H = [
    '<div class="st">① 合上 QS —— 电只到得了一半</div>' +
    '隔离开关一合，三相电就送进来了，可<b>电动机不会动</b>。' +
    '因为往下走到 <b>KM-1 主触头</b>那儿是断开的 —— <b>图上画的就是它没通电时的样子</b>（4.3 屏 1 那条规矩）。' +
    '<div class="tip info" style="margin-top:8px">同时，电也进了右边的控制回路：' +
    'L1 那条线一直通到 FU4。<b>控制回路里也是断的</b>，因为 SB2 启动按钮没人按。' +
    '<span class="sub">所以合闸之后什么都不会发生 —— 这是对的，也是安全的。</span></div>',

    '<div class="st">② 按下 SB2 —— 控制回路这才闭合</div>' +
    '启动按钮是<b>动合</b>触点，按下去才接通。这一按，控制回路整圈通了：' +
    '<b>L1 → FU4 → FR 动断 → SB1 停止 → SB2 → KM 线圈 → 回 L3</b>。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>注意这一串里前三个都是「平时就通的」</b>：熔断器是通的、FR 动断触点是通的、' +
    'SB1 停止按钮也是动断（通的）。<b>整圈就差 SB2 这一个口子</b> ——' +
    '<span class="sub">反过来说，这四样任意一个断了，按 SB2 都没用。查故障就从这四处挨个量。</span></div>',

    '<div class="st">③ 线圈得电 —— 控制电路的活干完了</div>' +
    '电流流过 KM 线圈，线圈产生磁力把衔铁吸下来。' +
    '<b>到这一步为止，控制电路能做的全部就是「让接触器吸合」</b>，它管不到电动机。' +
    '<div class="tip info" style="margin-top:8px">' +
    '线圈电流很小（零点几安），所以按钮和线都可以做得很细 ——' +
    '<b>这就是为什么不直接用一个大开关去接电动机</b>：那样的开关要能断几十安，又大又贵，' +
    '还得装在人够得着的地方。<span class="sub">2.2 节接触器那一节讲的就是这件事。</span></div>',

    '<div class="st good">④ 主触头闭合 —— 两块电路在这儿接上头</div>' +
    '衔铁吸合，<b>机械地</b>带动三个主触头 KM-1 一起闭合。' +
    '<b>线圈和主触头之间没有任何一根导线</b>，它们隔着大半张图，靠的是同一只接触器的机构。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>这一跳就是整张图的转折</b>：前面全在控制电路（小电流），后面全在主电路（大电流）。' +
    '<span class="sub">图上认出这一跳，靠的是文字符号：控制电路里那个 KM，' +
    '和主电路里那个 KM-1，横杠说明它们是同一只器件的两个部分（4.2 讲过）。</span></div>',

    '<div class="st good">⑤ 主电路通了 —— 电动机转</div>' +
    '三相电从 QS → FU1~3 → KM-1 → FR 热元件 → 电动机，一路通到底。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>但是松开 SB2 就停</b>：按钮一松，控制回路又断了，线圈失电，主触头弹开。' +
    '这种「按着才转」的接法叫<b>点动</b>，检修时点着试转很有用，' +
    '<b>可正经干活不能这么用</b> —— 总不能一直按着按钮。' +
    '<span class="sub">下一屏加一个触点就解决了。</span></div>'
  ];
  $('n1').innerHTML = H[S2.k];
}
document.getElementById('s2k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S2.k = +t.dataset.k;
  document.querySelectorAll('#s2k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S2.k);
  });
  note2();
});

/* ================================================================
   场景 3：自锁
   ================================================================
   状态是真算的：松手时 sb2=0，有自锁且 km 已经吸合，ctrlOn 仍然为真。 */
const S3 = { lock:0, press:0, s:{qs:1,fu:1,fr:0,sb1:0,sb2:0,lock:0,km:0} };
const st3 = new Stage('cv2', 360, CANH);

function sync3(){
  S3.s.lock = S3.lock;
  S3.s.sb2 = S3.press;
  step(S3.s);
  /* 切到「没有自锁」时，原来靠自锁保持着的那一路当场没了 */
  if(!S3.lock && !S3.press) S3.s.km = false;
}
function draw3(t){
  const g = st3.g; st3.clear();
  EP.heading(g, 12, 14, S3.lock ? '加了自锁触点' : '点动（没有自锁）',
             S3.press ? '按住启动按钮' : '松着手');
  const run = mainOn(S3.s);
  plant(g, {s:S3.s, ph:t, t:t,
            hot: S3.lock ? [{x:LKX, y:(LKY0+LKY1)/2, w:44, h:44}] : []});
  if(run) bar(g, '电动机转着', S3.press ? '按住不放，电流从 SB2 走' : '手已经松开，电流改走 KM-2 那条路', 'ok');
  else if(S3.lock) bar(g, '电动机停着', '自锁触点也是断的 —— 得先按一次 SB2 才把它「接住」');
  else bar(g, S3.press ? '电动机转着' : '电动机停了', S3.press ? '手一松就停' : '点动：松手即停',
           S3.press ? 'ok' : 'err');
}
function note3(){
  const run = mainOn(S3.s);
  $('s3a').textContent = S3.press ? '按住启动按钮' : '松着手';
  $('s3b').textContent = ctrlOn(S3.s) ? '得电' : '没电';
  $('s3c').textContent = run ? '转' : '不转';
  let h = '';
  if(!S3.lock) h =
    '<div class="st">点动：手一松就停</div>' +
    '控制回路里，<b>SB2 是唯一能接通的那个口子</b>。手按着，回路通、线圈得电、电动机转；' +
    '手一松，SB2 弹回断开，回路断、线圈失电、主触头弹开、电动机停。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>点动不是没用</b>：检修时点一下看转向对不对、听听有没有异响，正是要它松手就停。' +
    '<span class="sub">但正经干活不能这么接 —— 于是有了下面这一手：' +
    '<b>给电流再开一条路，而且这条路由接触器自己控制。</b></span></div>';
  else if(!run && !S3.press) h =
    '<div class="st">停着的时候，自锁触点也是断的</div>' +
    '<b>KM-2 是接触器自己的动合触点</b>，线圈没电它就断着。' +
    '所以现在两条路都不通：SB2 没人按，KM-2 也没闭合。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>要先按一次 SB2「把它接住」</b>：按下去 → 线圈得电 → KM-2 跟着闭合 →' +
    '这时候再松手，电流就改走 KM-2 了。<b>试试「按住启动按钮」再「松手」。</b>' +
    '<span class="sub">停电之后也是这个状态 —— 来电不会自己启动，必须有人再按一次。</span></div>';
  else if(S3.press) h =
    '<div class="st good">按下的这一刻，两条路都通了</div>' +
    '电流从 SB2 走进线圈，线圈一得电，<b>KM-2 立刻闭合</b> ——' +
    '于是按钮那条路旁边多了一条并联的路。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>现在松手看看。</b>按钮那条路会断，但 KM-2 这条路还通着，线圈照样有电，' +
    'KM-2 也就继续闭合 —— <b>它自己把自己的电接住了。</b></div>';
  else h =
    '<div class="st good">松手了，还在转 —— 这就是自锁</div>' +
    '按钮已经弹回断开，可电流<b>改走 KM-2 那条路</b>进线圈。' +
    '线圈有电 → KM-2 保持闭合 → 线圈继续有电，<b>这个圈自己转起来了</b>。' +
    '<div class="tip" style="margin-top:8px">' +
    '所以这个触点叫<b>自锁触点</b>（也叫自保持触点）。它必须是<b>接触器自己的</b>触点 ——' +
    '换成一个普通开关的话，停电再来电设备会自己启动，<b>人可能正在里面修</b>。' +
    '<span class="sub">用它自己的触点，线圈一失电触点跟着断开，' +
    '这条路也就没了 —— 这叫<b>失压保护</b>，是自锁白送的一条安全性。</span></div>';
  $('n2').innerHTML = h;
}
document.getElementById('s3k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S3.lock = +t.dataset.k;
  document.querySelectorAll('#s3k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S3.lock);
  });
  sync3(); note3();
});
document.getElementById('s3p').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S3.press = +t.dataset.p;
  document.querySelectorAll('#s3p .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.p === S3.press);
  });
  sync3(); note3();
});

/* ================================================================
   场景 4：停止与保护
   ================================================================ */
const LINK = [
  {t:'停止按钮', where:'控制回路', key:'sb1',
   hot:{x:CLX+8, y:CSB1, w:52, h:32}},
  {t:'热继电器', where:'控制回路', key:'fr',
   hot:{x:CLX+8, y:CFR, w:52, h:32}},
  {t:'熔断器 FU4', where:'控制回路', key:'fu',
   hot:{x:CLX, y:CFU, w:34, h:26}},
  {t:'隔离开关', where:'总进线', key:'qs',
   hot:{x:MX[1], y:QSY, w:56, h:34}}
];
const S4 = { k:0, trip:0 };
const st4 = new Stage('cv3', 360, CANH);

function state4(){
  const s = {qs:1, fu:1, fr:0, sb1:0, sb2:0, lock:1, km:1};
  if(S4.trip){
    const key = LINK[S4.k].key;
    if(key === 'qs') s.qs = 0;
    else if(key === 'fu') s.fu = 0;
    else if(key === 'fr') s.fr = 1;
    else s.sb1 = 1;
  }
  step(s);
  return s;
}
function draw4(t){
  const g = st4.g; st4.clear();
  const it = LINK[S4.k];
  EP.heading(g, 12, 14, '停止与保护', S4.trip ? it.t + ' 动作了' : '正常运行中');
  const s = state4();
  plant(g, {s:s, ph:t, t:t, hot:[it.hot]});
  if(!S4.trip) bar(g, '电动机转着（靠 KM-2 自锁保持）', '四个环节全是通的', 'ok');
  else if(it.key === 'qs') bar(g, '整张图都没电了', '只有 QS 断的是总进线 —— 检修必须断到这一级', 'err');
  else bar(g, '电动机停了，可主电路仍然带电',
           'QS 下口、FU、KM 主触头上口还是 380 V —— 断的只是控制回路', 'err');
}
function note4(){
  const it = LINK[S4.k];
  const s = state4();
  $('s4a').textContent = it.t;
  $('s4b').textContent = it.where;
  $('s4c').textContent = mainOn(s) ? '转' : '停';
  let h = '';
  if(S4.k === 0) h =
    '<div class="st">停止按钮 SB1 —— 动断触点，串在控制回路里</div>' +
    '它平时是<b>接通</b>的（图上画的就是接通的样子），按下去才断开。' +
    '一断，线圈失电，<b>连 KM-2 自锁触点也跟着断开</b>，所以松手之后也不会自己恢复。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>为什么停止用动断：那根线断了、端子松了，效果和按下停止一样，设备立刻停。</b>' +
    '要是用动合触点，线一断这个停止按钮就<b>永远按不动了而且没人发现</b>。' +
    '<span class="sub">这叫失效安全，4.3 屏 1 讲过。</span></div>';
  else if(S4.k === 1) h =
    '<div class="st">热继电器 FR —— 图上是两处，断的是控制回路那一处</div>' +
    '<b>热元件</b>串在主电路里（图上左边那三个小方框），电动机的电流从它身上过、把它烤热；' +
    '<b>动断触点</b>串在控制回路里（图上右边那个），热到一定程度它断开。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>热继电器自己不切断大电流</b>，它只是让线圈失电，剩下的交给接触器主触头去断。' +
    '<span class="sub">因为控制回路电流小，一对小触点就够；要直接断几十安，' +
    '那得做成接触器那么大。2.3 节讲过它的动作时间：1.05 倍不动作、1.2 倍约 5 分钟、' +
    '1.5 倍不到 2 分钟。</span></div>';
  else if(S4.k === 2) h =
    '<div class="st">熔断器 FU4 —— 控制回路的短路保护</div>' +
    '它断了，线圈直接失电，电动机停。' +
    '<b>但主电路那三个 FU1~FU3 是另一回事</b>：它们保护的是电动机那几十安的大电流，' +
    '断了主电路才是真断。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>现场碰到「按启动没反应、也听不见接触器响」，先量 FU4</b> ——' +
    '控制回路熔断器断了是最常见的一种，而且从外面看什么都正常。' +
    '<span class="sub">量法就是 3.6b 那一屏的电压降法：顺着控制回路挨段量，' +
    '<b>电压掉在哪一段，断点就在那一段</b>。</span></div>';
  else h =
    '<div class="st bad">隔离开关 QS —— 四个里唯一能让整张图没电的</div>' +
    '它断在<b>总进线</b>上，一断，主电路和控制电路<b>同时</b>没电。' +
    '前面三个断的都只是控制回路，<b>主电路照旧带着 380 V</b>。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>「按了停止 ≠ 可以动手」。</b>按下停止，电动机是不转了，' +
    '可 QS 下口、熔断器、主触头上口全都还是 380 V，只是主触头弹开了。' +
    '<span class="sub">检修必须走完整套：<b>断开隔离开关（或断路器）→ 验电 → 放电 → 挂牌上锁</b>。' +
    '而且隔离开关<b>只能空载分合</b>（4.3 屏 3 讲过）—— 先按停止让接触器断掉负荷，' +
    '再拉 QS。</span></div>';
  $('n3').innerHTML = h;
}
document.getElementById('s4k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S4.k = +t.dataset.k;
  document.querySelectorAll('#s4k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S4.k);
  });
  note4();
});
document.getElementById('s4t').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S4.trip = +t.dataset.t;
  document.querySelectorAll('#s4t .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.t === S4.trip);
  });
  note4();
});

/* ================================================================
   绑定
   ================================================================ */
function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会清空画布。屏 1 是静态的必须在这儿补画；
     屏 2/3/4 有流动粒子、在 rAF 里每帧重画，但**第一次进来那一帧之前**
     也得有东西，所以一并画一次 */
  draw1(); draw2(0); draw3(0); draw4(0);
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:4, sec:'4.4'});
ElecUI.bind(document);
sync3();
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('4.4');
  let h = '';
  h += nb.prev ? '<a href="'+nb.prev.f+'">‹ '+nb.prev.id+' '+nb.prev.t+'</a>'
               : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next && nb.next.f ? '<a class="next" href="'+nb.next.f+'">'+nb.next.id+' '+nb.next.t+' ›</a>'
               : '<span>下一节还没做</span>';
  $('pager').innerHTML = h;
})();

loop(function(dt, t){
  if(cur === 1) draw2(t);
  else if(cur === 2) draw3(t);
  else if(cur === 3) draw4(t);
});
  }
});
})();
