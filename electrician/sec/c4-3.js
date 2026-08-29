/* 4.3 图形符号 —— 本节内容的唯一真相。
   对应《零基础学电工》第 4 章 4.2 节（书内 P69~P73）。

   书上这一节是四张大表（电子元器件 / 低压电器 / 高压电器 / 功能部件），
   照表抄一遍没用 —— 背不下来，也不是识图真正卡人的地方。
   我按**「图上这一笔为什么这么画」**排四屏：

   ① 触点三兄弟   动合 / 动断 / 转换。眼是那条第一原则：**图上画的是没人碰它的样子**
   ② 线圈与按钮   线圈都是同一个矩形，靠文字符号分是谁；按钮上那根**虚线不是导线**
   ③ 保护与测量   三极开关三兄弟 / 熔断器 / 热继电器 / 位置·速度 / 仪表
   ④ 负载·电源·接地·连线   最后一屏把剩下的常见符号收齐，重点是「打点＝相连」

   **这一节的眼在屏 1**：动合触点在图上画成断开的，不是因为线路坏了，
   是因为**电气图纸一律画「未操作状态」** —— 线圈没通电、没人按按钮、
   没有外力作用。这条不讲清楚，后面读原理图每一步都会卡。
   由它直接推出「停止按钮为什么画成闭合的」，以及那条失效安全的道理：
   **停止回路用动断触点，线断了设备也会停**。

   屏 3 的符号**直接用 elec-symbols.js 的 SYMS**（ESYM.drawKey），
   不另画一份 —— 那套图正是 quiz 里 8 道图形题（id 530~537）的选项，
   课上看到的和考试上看到的是同一张图。屏 1/2/4 要跟着状态动，SYMS 是静态的，
   所以那三屏的符号是这一节自己画的。

   拿不准的地方如实留白（和 2.3 延时触点那把「伞」同样处理）：
   - 考证题库把 contact-link（带机械联动虚线那张）也归进「热继电器的电气图形」，
     而通行画法里那个标记多用于位置开关一类。**两种说法都写出来，注明考试按题库**
   - 老图纸上导线交叉用半圆跨接表示「不相连」，现行画法是直接交叉不打点。
     两种都画了，但明说现行标准是后者
   - 接地符号和接机壳符号是两个不同的符号，别混 —— 这条有把握，写死了 */
(function(){
'use strict';
ELEC.reg({
  id: '4.3',
  file: 'c4-3.html',
  title: '4.3 图形符号',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>触点三兄弟</button>
    <button class="tab" data-i="1"><span class="n">2</span>线圈与按钮</button>
    <button class="tab" data-i="2"><span class="n">3</span>保护与测量</button>
    <button class="tab" data-i="3"><span class="n">4</span>负载·电源·连线</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">图上画的，永远是「没人碰它」的样子</div>
    这是识图的第一条规矩，比认识任何一个符号都重要：<b>电气图纸上每个触点画的都是
    未操作状态</b> —— 线圈没通电、没人按按钮、机械没碰上去。
    所以图上一个触点画成断开的，<b>不是线路坏了</b>，是它平时就该断着。
    <b>下面切「线圈得电」看这三种触点各自怎么动。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1s">
        <button class="btn on sm" data-s="0">没人碰它（图上的样子）</button>
        <button class="btn sm" data-s="1">线圈得电</button>
      </div>
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">动合触点</button>
        <button class="btn sm" data-k="1">动断触点</button>
        <button class="btn sm" data-k="2">转换触点</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这一种</div><div class="v" id="s1a">动合 NO</div></div>
        <div class="num"><div class="k">图上画成</div><div class="v" id="s1b">断开</div></div>
        <div class="num hi"><div class="k">动作之后</div><div class="v" id="s1c">接通</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">「常开」「常闭」的那个「常」，指的是什么时候</div>
    <b>指原始状态：线圈没通电、没人按、没有外力。</b>不是「大部分时间」，
    也不是「正常工作时」—— 一台设备运行起来之后，图上那些「常开」触点多半都是闭着的。
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>叫法</th><th>原始状态</th><th>动作后</th><th>图上常见的</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">动合<br>（常开）</td><td><b>断开</b></td><td>接通</td>
          <td>启动按钮、接触器主触头、自锁触点</td></tr>
        <tr><td class="eu-s">动断<br>（常闭）</td><td><b>接通</b></td><td>断开</td>
          <td>停止按钮、急停、热继电器触点、互锁触点</td></tr>
        <tr><td class="eu-s">转换</td><td>接在<b>一头</b></td><td>切到另一头</td>
          <td>转换开关 SA、行程开关</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      国标里叫<b>动合、动断</b>，老资料和现场口语里叫<b>常开（NO）、常闭（NC）</b>，
      说的是同一件事。<span class="sub">NO ＝ Normally Open，NC ＝ Normally Closed，
      那个 Normally 就是这里说的「原始状态」。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">停止按钮为什么要用动断的</div>
    按一下就断开，线圈失电，设备停 —— 这只是表面理由。<b>真正的理由是安全：</b>
    停止回路串的是动断触点，<b>那根线万一断了、端子松了、按钮坏了，效果和「按下停止」一模一样，
    设备立刻停。</b>
    <div class="tip">
      反过来想：要是停止按钮用动合触点（按下才接通去发停止命令），
      <b>线一断，这个停止按钮就永远按不动了</b> —— 而你根本不会发现，
      直到出事那天要停停不下来。
      <span class="sub">这套思路叫<b>失效安全</b>：坏了要往安全的那一边坏。
      急停按钮、热继电器触点、安全门开关，用的全是动断触点，都是这个道理。</span>
    </div>
  </div>

  <div class="bet" data-bet="c43-nc" data-q="一张原理图上，停止按钮 SB1 画成「接通」的样子。这说明什么？"
       data-opts="画错了，按钮平时应该是断开的|它是动断触点——平时接通，按下才断开，这正是停止按钮该有的画法|说明这台设备正在运行" data-right="1"
       data-after="它是动断（常闭）触点。图纸画的是未操作状态，停止按钮没人按的时候本来就是接通的，按下去才断开、让线圈失电。要是画成断开的，那台设备一上电就永远启动不了。"></div>
</section>

<!-- ================= 场景 2：线圈与按钮 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">线圈是发命令的，触点是干活的</div>
    接触器、中间继电器、时间继电器的线圈<b>画出来一模一样，都是一个矩形</b> ——
    靠旁边的文字符号（KM / KA / KT）才分得出是谁。而按钮旁边那根<b>虚线</b>是
    最容易认错的一笔：<b>它不是导线，是机械推杆</b>。
    <b>切一档看看。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">线圈 ＋ 触点组</button>
        <button class="btn sm" data-k="1">启动按钮</button>
        <button class="btn sm" data-k="2">停止与急停</button>
        <button class="btn sm" data-k="3">复合按钮</button>
      </div>
      <div class="nums">
        <div class="num"><div class="k">这个符号</div><div class="v" id="s2a">线圈</div></div>
        <div class="num hi"><div class="k">怎么记</div><div class="v" id="s2b">矩形 ＋ 两根引线</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">图上有两种线，别搞混</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>画法</th><th>是什么</th><th>会不会导电</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">实线</td><td><b>导线</b> —— 电真的从这儿走</td><td>会</td></tr>
        <tr><td class="eu-s">虚线</td><td><b>机械联动</b> —— 一根杆、一个连杆，
          表示「这几个东西是连在一起动的」</td><td><b>不会</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>按钮上那根虚线、几个触点顶上那条贯穿的虚线，都是机械联动，不是电路。</b>
      顺着虚线找过去，能看出<b>按下一个按钮到底同时动了哪几对触点</b> ——
      这在读复合按钮和多触点接触器时是必须的。
      <span class="sub">上一屏三个触点顶上那条虚线也是它：一只接触器的线圈得电，
      它身上所有触点同时动作。</span>
    </div>
  </div>

  <div class="bet" data-bet="c43-coil" data-q="图上两个一模一样的矩形线圈符号，一个旁边标 KM，一个标 KA。它们有什么不同？"
       data-opts="符号一样就是同一种器件，只是编号不同|一个是接触器、一个是中间继电器——线圈符号相同，靠文字符号区分|KA 是 KM 的备用线圈" data-right="1"
       data-after="KM 是接触器、KA 是中间继电器。各种线圈的图形符号都是这个矩形，图上要区分只能看文字符号。这也是 4.2 那一节非学不可的原因：图形符号告诉你「这是个线圈」，文字符号才告诉你「是哪一种」。"></div>
</section>

<!-- ================= 场景 3：保护与测量 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">长得很像的几张图，差别就在那一小笔上</div>
    三极开关有三张图，区别只是刀身上多了个 <b>×</b>、或者下面多了个小方框 ——
    可它们分别是<b>隔离开关、断路器、熔断器式开关</b>，能干的事完全不同。
    <b>下面这几张图就是考证题里会考的那几张。切一组看。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">三极开关</button>
        <button class="btn sm" data-k="1">熔断器</button>
        <button class="btn sm" data-k="2">热继电器</button>
        <button class="btn sm" data-k="3">位置·速度</button>
        <button class="btn sm" data-k="4">仪表</button>
      </div>
      <div class="nums">
        <div class="num"><div class="k">这一组</div><div class="v" id="s3a">三极开关</div></div>
        <div class="num hi"><div class="k">差别在</div><div class="v" id="s3b">刀身上那一笔</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">隔离开关和断路器，差的不只是一个 ×</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>图上</th><th>能干什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">QS<br>隔离<br>开关</td><td>光溜溜三把刀</td>
          <td><b>只能空载分合</b>。作用是「断开之后看得见一道明显的断口」，
          检修时靠它保证不会突然来电</td></tr>
        <tr><td class="eu-s">QF<br>断路器</td><td>刀身上一个 <b>×</b></td>
          <td><b>能带着负荷分合，还能自动跳闸</b>（过载、短路时自己断开）。
          那个 × 就是「自动脱扣机构」的记号</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>带着负荷去拉隔离开关会拉出电弧</b>，轻则烧触头、重则弧光短路伤人。
      正确顺序是<b>先断断路器、再断隔离开关</b>；送电反过来。
      <span class="sub">这条第 12 章倒闸操作还会细讲，先记住图上这两个符号别认错。</span>
    </div>
  </div>

  <div class="bet" data-bet="c43-qf" data-q="配电柜图纸上一个三极开关符号，刀身中间画了个小 ×。这是什么？"
       data-opts="表示这个开关坏了、已停用|断路器 QF——× 是自动脱扣机构的记号|表示这里要打三个孔" data-right="1"
       data-after="断路器 QF。× 表示它带自动脱扣机构，能在过载、短路时自己跳闸。没有 × 的那张是刀开关／隔离开关，只能空载分合。这两张图在考证题里正面反面各考了一道。"></div>
</section>

<!-- ================= 场景 4：负载·电源·接地·连线 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">剩下的常见符号，一屏收齐</div>
    前三屏讲的是「会动的」那些器件，这一屏是图上剩下的东西：<b>用电的、供电的、
    接地的，以及导线本身怎么画</b>。
    其中<b>导线连接那一组最要紧</b> —— 两根线交叉，有没有那个黑点，
    意思是完全相反的。<b>切一组看。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">负载与元件</button>
        <button class="btn sm" data-k="1">电源与接地</button>
        <button class="btn sm" data-k="2">导线连接</button>
        <button class="btn sm" data-k="3">变压器与互感器</button>
      </div>
      <div class="nums">
        <div class="num"><div class="k">这一组</div><div class="v" id="s4a">负载与元件</div></div>
        <div class="num hi"><div class="k">最该记的</div><div class="v" id="s4b">圈里 3~ ＝ 三相</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">接地和接机壳是两个符号，不是一回事</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>符号</th><th>叫什么</th><th>接到哪儿</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">三条<br>递减<br>横线</td><td><b>接地</b></td>
          <td>真的接到大地（接地极、接地网）。<b>PE 线最终连的就是它</b></td></tr>
        <tr><td class="eu-s">横线<br>下带<br>斜纹</td><td><b>接机壳</b><br>（接外壳、接底板）</td>
          <td>接到设备的金属外壳或底板 —— <b>外壳本身不一定接地</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>把这两个当成一回事，是要出人命的。</b>信号地、机壳地接在一起很常见，
      但<b>「接机壳」只是说这一点连到外壳上，并不保证外壳连到了大地</b>。
      设备的保护接地必须有一根真正的 PE 线接到接地极。
      <span class="sub">第 3.5 节验电笔那一屏画的那条「脚 → 大地 → 变压器中性点」，
      对应的就是「接地」这个符号。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">一句话把这一章的符号串起来</div>
    <b>图形符号说「这是个什么东西」，文字符号说「是哪一个」。</b>
    圆圈里一个 M 告诉你这是电动机，旁边的 M1、M2 才告诉你是哪一台；
    一个矩形告诉你这是线圈，旁边的 KM 才告诉你它是接触器。
    <div class="tip info">
      <b>两样都认得，才算看得懂一张图。</b>下一节（4.4）就拿一张完整的原理图
      从头读一遍：<b>先分主电路和控制电路，再顺着电流走一遍</b>，
      看这些符号连起来到底在讲一件什么事。
    </div>
  </div>

  <div class="quiz" data-quiz="c4-3">
    <div class="qz" data-q="原理图上接触器 KM 的一个触点画成断开的。设备正在正常运行，这个触点实际上是断的还是通的？"
         data-opts="断的，图上画什么就是什么|不一定——图画的是「线圈没通电」时的状态，设备运行时 KM 线圈得电，这个动合触点已经闭合了|图画错了"
         data-right="1"
         data-why="通的。电气图纸一律画未操作状态（线圈没电、没人按、没有外力），所以动合触点在图上永远画成断开的。设备一运行，KM 线圈得电，它身上所有动合触点闭合、动断触点断开。看图时要在脑子里做这个「动一下」的推演，这正是 4.4 节要练的事。"></div>
    <div class="qz" data-q="控制回路里停止按钮用动断（常闭）触点，除了「按一下就断」，还有一个更要紧的理由是什么？"
         data-opts="动断触点便宜|失效安全——那根线断了、端子松了，效果和按下停止一样，设备会停；要是用动合触点，线一断这个停止按钮就永远按不动了|动断触点接触电阻小"
         data-right="1"
         data-why="失效安全：坏了要往安全的那一边坏。停止回路串动断触点，任何断线、松动都会让线圈失电、设备停下来，而且你马上就会发现。急停按钮、热继电器触点、安全门开关用的都是动断触点，全是这个道理。"></div>
    <div class="qz" data-q="三极开关符号中，刀身上带一个 × 的是哪一种？"
         data-opts="隔离开关 QS|断路器 QF——× 表示自动脱扣机构，能带负荷分合、能自动跳闸|熔断器 FU"
         data-right="1"
         data-why="断路器 QF。光溜溜三把刀是刀开关／隔离开关 QS，只能空载分合；刀身加 × 表示带自动脱扣机构，就是断路器；刀下面再加一个小方框，是熔断器式的开关组合。带负荷去拉隔离开关会拉弧，顺序必须是先断路器后隔离开关。"></div>
    <div class="qz" data-q="图上两根导线交叉，交叉处没有画黑点。这两根线是什么关系？"
         data-opts="相连，黑点可以省略|不相连——只是画面上交叉过去，实际上是两根各走各的线|画得不规范，看不出来"
         data-right="1"
         data-why="不相连。现行画法是：交叉处画一个实心黑点＝这两根线在这里接在一起；没有黑点＝只是图面上交叉，实际互不相干。所以那个小黑点绝对不能随手加、也不能漏掉——4.1 节照明回路那张接线图上，端子排成 PE/N/L 就是为了让开关的那根绕线不跟别的线交叉。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 4 章 4.2 节（书内 P69~P73）<br>屏 3 那几张图和考证题库里 8 道图形题用的是同一套画法</div>
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
   这一节自己画的一套符号（屏 1 / 2 / 4 用）
   ================================================================
   屏 3 用的是 elec-symbols.js 里那套（考证题库同款），静态；
   这里这套要跟着状态动（闭合/断开、切换到哪一头），所以得自己画。
   一律竖着画：上端 top、下端 bot，动触点臂从下端往上斜。 */
const TOP = 74, BOT = 206, PY = 128;   /* 静触点端点 y / 动触点根部在 BOT */

function dot(g, x, y, c, r){
  g.save(); g.fillStyle = c; g.beginPath(); g.arc(x, y, r || 2.4, 0, Math.PI*2); g.fill(); g.restore();
}
/* 动合触点：上引线到 PY，动臂从 BOT 斜上来。on 时立起来贴住 */
function contactNO(g, x, on, o){
  o = o || {};
  const c = o.color || C.wire, top = o.top == null ? TOP : o.top, bot = o.bot == null ? BOT : o.bot;
  const py = o.py == null ? PY : o.py;
  g.save();
  g.strokeStyle = c; g.lineWidth = 2.2; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x, top); g.lineTo(x, py); g.stroke();
  g.beginPath(); g.moveTo(x, bot); g.lineTo(x, py + 34); g.stroke();
  g.beginPath();
  g.moveTo(x, py + 34);
  if(on) g.lineTo(x + 3, py);
  else   g.lineTo(x + 14, py + 6);
  g.stroke();
  g.restore();
  dot(g, x, py, c); dot(g, x, py + 34, c);
  if(on) dot(g, x, py, C.ok, 3.4);
}
/* 动断触点：静触点端上加一条横杠，动臂常态压在横杠上；动作后摆下来脱开 */
function contactNC(g, x, on, o){
  o = o || {};
  const c = o.color || C.wire, top = o.top == null ? TOP : o.top, bot = o.bot == null ? BOT : o.bot;
  const py = o.py == null ? PY : o.py;
  g.save();
  g.strokeStyle = c; g.lineWidth = 2.2; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x, top); g.lineTo(x, py); g.stroke();
  /* 动断特有的那一横：动触点压在它上面。
     横杠要比动臂顶点**两头都长出来**，否则常态时整条被臂盖住，
     而「认它就认那一横」正是这一屏教的判据（截图抓到的） */
  g.beginPath(); g.moveTo(x - 6, py); g.lineTo(x + 19, py); g.stroke();
  g.beginPath(); g.moveTo(x, bot); g.lineTo(x, py + 34); g.stroke();
  g.beginPath();
  g.moveTo(x, py + 34);
  if(on) g.lineTo(x + 17, py + 13);        /* 动作后：摆下来，离开横杠 */
  else   g.lineTo(x + 8,  py + 1);         /* 常态：顶住横杠（顶在横杠中间） */
  g.stroke();
  g.restore();
  dot(g, x, py + 34, c);
  if(!on) dot(g, x + 8, py + 1, C.ok, 3.4);
}
/* 转换触点：一个公共动触点 + 两个静触点，常态接左边那个 */
function contactCO(g, x, on, o){
  o = o || {};
  const c = o.color || C.wire, top = o.top == null ? TOP : o.top, bot = o.bot == null ? BOT : o.bot;
  const py = o.py == null ? PY : o.py, d = 14;
  g.save();
  g.strokeStyle = c; g.lineWidth = 2.2; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x - d, top); g.lineTo(x - d, py); g.stroke();
  g.beginPath(); g.moveTo(x + d, top); g.lineTo(x + d, py); g.stroke();
  g.beginPath(); g.moveTo(x, bot); g.lineTo(x, py + 34); g.stroke();
  g.beginPath();
  g.moveTo(x, py + 34);
  g.lineTo(on ? x + d : x - d, py + 3);
  g.stroke();
  g.restore();
  dot(g, x - d, py, c); dot(g, x + d, py, c); dot(g, x, py + 34, c);
  dot(g, on ? x + d : x - d, py + 3, C.ok, 3.4);
}
/* 线圈：一个矩形 + 两根引线。所有线圈都长这样 */
function coilSym(g, x, y, o){
  o = o || {};
  const w = o.w || 34, h = o.h || 22, c = o.color || C.wire;
  box(g, x - w/2, y - h/2, w, h, 2, o.fill || C.box, c, 2.2);
  g.save();
  g.strokeStyle = c; g.lineWidth = 2.2; g.lineCap = 'round';
  if(o.horiz){
    g.beginPath(); g.moveTo(x - w/2 - 16, y); g.lineTo(x - w/2, y);
    g.moveTo(x + w/2, y); g.lineTo(x + w/2 + 16, y); g.stroke();
  }else{
    g.beginPath(); g.moveTo(x, y - h/2 - 16); g.lineTo(x, y - h/2);
    g.moveTo(x, y + h/2); g.lineTo(x, y + h/2 + 16); g.stroke();
  }
  g.restore();
}
/* 机械联动虚线：横着一条，把几个触点串起来 */
function linkLine(g, x0, x1, y, c){
  g.save();
  g.strokeStyle = c || C.tx3; g.lineWidth = 1.2; g.setLineDash([4,4]);
  g.beginPath(); g.moveTo(x0, y); g.lineTo(x1, y); g.stroke();
  g.restore();
}
/* 按钮的推杆：从触点臂往左一条虚线，接一根竖杆，顶上一个帽
   kind: 'flat' 普通按钮帽 / 'mush' 蘑菇头（急停） */
function pushRod(g, x, y, kind, c){
  c = c || C.wire;
  g.save();
  g.strokeStyle = C.tx3; g.lineWidth = 1.2; g.setLineDash([4,4]);
  /* 虚线要够长（40 而不是 26）：短了的话按钮帽几乎贴在静触点那根竖线上，
     「推杆是另外一根东西」这层意思就没了 */
  g.beginPath(); g.moveTo(x, y); g.lineTo(x - 40, y); g.stroke();
  g.restore();
  g.save();
  g.strokeStyle = c; g.lineWidth = 2.2; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x - 40, y); g.lineTo(x - 40, y - 26); g.stroke();
  if(kind === 'mush'){
    g.beginPath(); g.arc(x - 40, y - 26, 11, Math.PI, 0); g.stroke();
    g.beginPath(); g.moveTo(x - 51, y - 26); g.lineTo(x - 29, y - 26); g.stroke();
  }else{
    g.beginPath(); g.moveTo(x - 51, y - 26); g.lineTo(x - 29, y - 26); g.stroke();
  }
  g.restore();
}

/* ================================================================
   场景 1：触点三兄弟
   ================================================================
   左边一个线圈，一条机械联动虚线往右串起三个触点 —— 这正是现实：
   一只接触器的线圈得电，它身上所有触点同时动作。
   三个触点中心 x = 140 / 220 / 300，转换触点要 ±14，所以最右那个到 314，
   画布 360 宽还剩 46 的余量。 */
const KIND1 = [
  {n:'动合触点', alias:'常开 · NO', sym:'KM-1', off:'断开', on:'接通',
   card:'动合 NO', offS:'断开', onS:'接通',
   memo:'启动按钮、接触器主触头'},
  {n:'动断触点', alias:'常闭 · NC', sym:'KM-2', off:'接通', on:'断开',
   card:'动断 NC', offS:'接通', onS:'断开',
   memo:'停止按钮、急停、热继电器触点'},
  {n:'转换触点', alias:'切换 · CO', sym:'SA', off:'接在左边', on:'切到右边',
   card:'转换 CO', offS:'接左边', onS:'切右边',
   memo:'转换开关、行程开关'}
];
const CX1 = [140, 220, 300];
const S1 = { k:0, on:0 };
const st1 = new Stage('cv0', 360, 302);

function draw1(){
  const g = st1.g; st1.clear();
  EP.heading(g, 12, 14, '触点三兄弟', S1.on ? '线圈得电，三个同时动' : '图纸上的样子');

  /* 线圈（左） */
  const cc = S1.on ? C.acc : C.wire;
  coilSym(g, 44, PY + 17, {horiz:false, color:cc, w:36, h:24});
  txt(g, 'KM', 44, PY - 20, {sz:10.5, b:1, c: S1.on ? C.acc : C.tx});
  txt(g, S1.on ? '得电' : '没电', 44, PY + 58, {sz:9, c: S1.on ? C.acc : C.tx3});

  /* 机械联动虚线：线圈 → 三个触点 */
  linkLine(g, 44, 314, PY + 46, S1.on ? C.acc : C.tx3);
  txt(g, '虚线 ＝ 机械联动，不导电', 96, 40, {sz:8.5, c:C.tx3, al:'left'});

  /* 三个触点 */
  const draws = [contactNO, contactNC, contactCO];
  for(let i = 0; i < 3; i++){
    const x = CX1[i], sel = S1.k === i;
    draws[i](g, x, !!S1.on, {color: sel ? C.acc : C.wire});
    txt(g, KIND1[i].sym, x, 60, {sz:9.5, b:1, c: sel ? C.acc : C.tx2});
    /* 通 / 断标签：转换触点没有「通断」，写它接在哪一头 */
    let s, ok;
    if(i === 2){ s = S1.on ? '接右' : '接左'; ok = true; }
    else { const t = S1.on ? KIND1[i].on : KIND1[i].off; s = t; ok = (t === '接通'); }
    tag(g, s, x, 228, {sz:9.5, b:1, c: ok ? C.ok : C.tx2,
                       fill: ok ? C.okbg : C.box, line: ok ? C.ok : C.boxLine});
    txt(g, KIND1[i].n, x, 250, {sz:9, c: sel ? C.acc : C.tx3});
    if(sel) hot(g, x + 4, PY + 14, 0, {w:56, h:140, r:10});
  }

  const it = KIND1[S1.k];
  EC.box(g, 18, 262, 324, 34, 6, C.accbg, C.acc, 1);
  txt(g, it.n + '（' + it.alias + '）　图上画成「' + it.off + '」',
      180, 273, {sz:10.5, b:1, c:C.acc});
  txt(g, '动作之后 → ' + it.on + '　·　' + it.memo, 180, 288, {sz:9, c:C.tx2});
}
function note1(){
  const it = KIND1[S1.k];
  $('s1a').textContent = it.card;
  $('s1b').textContent = it.offS;
  $('s1c').textContent = it.onS;
  let h = '';
  if(S1.k === 0) h =
    '<div class="st">动合触点 —— 图上永远画成断开的</div>' +
    '两条竖线中间空着一道缝，动触点那根斜臂没搭上去。' +
    '<b>这就是它「没人碰、线圈没电」时的样子。</b>线圈一得电，斜臂立起来贴上去，接通。' +
    '<div class="tip info" style="margin-top:8px">' +
    '图上最常见的动合触点有三处：<b>启动按钮</b>（按下才通）、' +
    '<b>接触器的主触头</b>（KM-1，通断电动机的大电流）、<b>自锁触点</b>（4.4 节讲）。' +
    '<span class="sub">所以别看到一张原理图上到处是断口就以为设备是断的 ——' +
    '那是纸面上的原始状态，运行起来这些口全闭上了。</span></div>';
  else if(S1.k === 1) h =
    '<div class="st bad">动断触点 —— 多出来的那一横是它的记号</div>' +
    '静触点端上多画了<b>一条短横杠</b>，动触点那根斜臂<b>压在横杠上</b> ——' +
    '这就是「平时是通的」的画法。动作之后斜臂摆下来、离开横杠，断开。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>认它就认那一横</b>：有横杠、臂压在上面 ＝ 动断；没横杠、臂空着 ＝ 动合。' +
    '<span class="sub">停止按钮、急停按钮、热继电器的触点、正反转的互锁触点，' +
    '用的全是动断触点 —— 下面那张卡讲的失效安全就是原因。</span></div>';
  else h =
    '<div class="st">转换触点 —— 一个动触点，两个去处</div>' +
    '底下一根公共动触点，上面<b>两个静触点</b>。它<b>不存在「断开」这个状态</b>：' +
    '不是接在这头，就是接在那头。' +
    '<div class="tip info" style="margin-top:8px">' +
    '也叫<b>切换触点</b>。转换开关 SA（手动打到哪一档）、行程开关（机械碰到就切换）' +
    '常用它。<span class="sub">现场接线时那三个端子通常印着 <b>COM / NC / NO</b>：' +
    'COM 是公共端，NC 是平时接通的那头，NO 是动作后接通的那头 ——' +
    '正好对上上面两屏的名字。</span></div>';
  $('n0').innerHTML = h;
}
function setK1(k){
  if(k === S1.k) return;
  S1.k = k;
  document.querySelectorAll('#s1k .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S1.k);
  });
  note1(); draw1();
}
document.getElementById('s1k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  setK1(+t.dataset.k);
});
document.getElementById('s1s').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S1.on = +t.dataset.s;
  document.querySelectorAll('#s1s .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.s === S1.on);
  });
  note1(); draw1();
});
st1.cv.addEventListener('click', function(ev){
  const p = st1.pick(ev), x = p[0], y = p[1];
  if(y < 60 || y > 246) return;
  for(let i = 0; i < 3; i++) if(Math.abs(x - CX1[i] - 4) < 34) setK1(i);
});

/* ================================================================
   场景 2：线圈与按钮
   ================================================================
   档 0 画「一只接触器」的全貌：一个线圈 + 三个主触点 + 一个辅助触点，
   用一个大虚线框圈住 —— 4.2 那条「KM 和 KM-1 是同一只器件」在这儿有了图。
   档 1~3 画单个按钮符号放大，重点是那根**虚线推杆**。 */
const BTN2 = [
  {t:'线圈', memo:'矩形 ＋ 两根引线'},
  {t:'启动按钮', memo:'动合 ＋ 推杆'},
  {t:'停止与急停', memo:'动断 ＋ 推杆'},
  {t:'复合按钮', memo:'一根杆带两对触点'}
];
const S2 = { k:0 };
const st2 = new Stage('cv1', 360, 300);

function draw2(){
  const g = st2.g; st2.clear();
  const it = BTN2[S2.k];

  if(S2.k === 0){
    EP.heading(g, 12, 14, '一只接触器', '线圈和触点分开画');
    /* 大虚线框 */
    g.save();
    g.strokeStyle = C.acc; g.lineWidth = 1.3; g.setLineDash([5,5]); g.globalAlpha = .6;
    box(g, 20, 46, 320, 168, 8, null, C.acc, 1.3);
    g.restore();
    txt(g, 'KM　一只接触器（实物就一个）', 30, 60, {sz:9.5, b:1, c:C.acc, al:'left'});

    coilSym(g, 60, 140, {horiz:false, color:C.wire, w:36, h:24});
    txt(g, 'KM', 60, 96, {sz:11, b:1, c:C.tx});
    txt(g, '线圈', 60, 196, {sz:9, c:C.tx2});

    linkLine(g, 60, 314, 162, C.tx3);

    const xs = [148, 190, 232, 292];
    xs.forEach(function(x, i){
      contactNO(g, x, false, {top:86, bot:186, py:120, color: i === 3 ? C.warn : C.wire});
    });
    txt(g, 'KM-1', 190, 76, {sz:10, b:1, c:C.tx});
    txt(g, '三个主触头', 190, 200, {sz:9, c:C.tx2});
    txt(g, 'KM-2', 292, 76, {sz:10, b:1, c:C.warn});
    txt(g, '辅助触头', 292, 200, {sz:9, c:C.warn});

    EC.box(g, 18, 228, 324, 58, 6, C.accbg, C.acc, 1);
    txt(g, '实物是一只接触器，图上却分散在好几个地方', 180, 244, {sz:10.5, b:1, c:C.acc});
    txt(g, '线圈画在控制电路里，主触头画在主电路里，', 180, 262, {sz:9.5, c:C.tx2});
    txt(g, '靠 KM / KM-1 / KM-2 这串文字符号认亲', 180, 276, {sz:9.5, c:C.tx2});
    return;
  }

  if(S2.k === 1){
    EP.heading(g, 12, 14, '启动按钮 SB', '动合触点 ＋ 推杆');
    contactNO(g, 200, false, {top:70, bot:196, py:118, color:C.wire});
    pushRod(g, 200 + 8, 130, 'flat', C.wire);
    txt(g, 'SB', 200, 56, {sz:11, b:1, c:C.tx});
    txt(g, '按钮帽', 152, 88, {sz:9, c:C.tx3, al:'right'});
    txt(g, '推杆：虚线＝机械，不导电', 152, 150, {sz:9, c:C.tx3, al:'right'});
    txt(g, '这道缝 ＝ 平时是断的', 232, 118, {sz:9, c:C.tx2, al:'left'});
    txt(g, '松手自己弹回来', 232, 178, {sz:9, c:C.tx3, al:'left'});

    EC.box(g, 18, 216, 324, 70, 6, C.accbg, C.acc, 1);
    txt(g, '动合触点 ＋ 一根推杆 ＝ 启动按钮', 180, 234, {sz:10.5, b:1, c:C.acc});
    txt(g, '按下去 → 推杆把动触点压上去 → 接通', 180, 254, {sz:9.5, c:C.tx2});
    txt(g, '松手 → 弹簧把它弹回来 → 又断开（这叫「不自持」）', 180, 270, {sz:9.5, c:C.tx2});
    return;
  }

  if(S2.k === 2){
    EP.heading(g, 12, 14, '停止与急停', '都是动断触点');
    /* 左：普通停止按钮 */
    contactNC(g, 124, false, {top:74, bot:190, py:120, color:C.wire});
    pushRod(g, 124 + 8, 134, 'flat', C.wire);
    txt(g, 'SB', 124, 60, {sz:10.5, b:1, c:C.tx});
    txt(g, '停止按钮', 124, 208, {sz:9.5, c:C.tx2});
    /* 右：急停（蘑菇头） */
    contactNC(g, 282, false, {top:74, bot:190, py:120, color:C.err});
    pushRod(g, 282 + 8, 134, 'mush', C.err);
    txt(g, 'SB', 282, 60, {sz:10.5, b:1, c:C.err});
    txt(g, '急停（蘑菇头）', 282, 208, {sz:9.5, c:C.err});

    EC.box(g, 18, 224, 324, 62, 6, C.errbg, C.err, 1);
    txt(g, '两个都画成「接通」—— 动断触点平时就是通的', 180, 242, {sz:10.5, b:1, c:C.err});
    txt(g, '急停多一个蘑菇头：好拍、拍下去自己保持住，', 180, 262, {sz:9.5, c:C.tx2});
    txt(g, '要旋一下才复位 —— 这样没人能顺手把它按回去', 180, 277, {sz:9.5, c:C.tx2});
    return;
  }

  EP.heading(g, 12, 14, '复合按钮', '一根杆，同时管两对触点');
  contactNC(g, 150, false, {top:74, bot:190, py:120, color:C.wire});
  contactNO(g, 264, false, {top:74, bot:190, py:120, color:C.wire});
  /* 一根共用推杆：竖杆在左，虚线往右串起两对触点 */
  g.save();
  g.strokeStyle = C.tx3; g.lineWidth = 1.2; g.setLineDash([4,4]);
  g.beginPath(); g.moveTo(72, 134); g.lineTo(272, 134); g.stroke();
  g.restore();
  g.save();
  g.strokeStyle = C.wire; g.lineWidth = 2.2; g.lineCap = 'round';
  g.beginPath(); g.moveTo(72, 134); g.lineTo(72, 104); g.stroke();
  g.beginPath(); g.moveTo(61, 104); g.lineTo(83, 104); g.stroke();
  g.restore();
  txt(g, '一根推杆', 72, 88, {sz:9, c:C.tx3});
  txt(g, '动断（平时通）', 150, 60, {sz:9.5, b:1, c:C.tx2});
  txt(g, '动合（平时断）', 264, 60, {sz:9.5, b:1, c:C.tx2});
  txt(g, '按下去：这对先断', 150, 208, {sz:9, c:C.tx3});
  txt(g, '接着这对才通', 264, 208, {sz:9, c:C.tx3});

  EC.box(g, 18, 224, 324, 62, 6, C.accbg, C.acc, 1);
  txt(g, '同一根杆上的触点，一定同时动作', 180, 242, {sz:10.5, b:1, c:C.acc});
  txt(g, '顺着那条虚线找过去，就知道按一下', 180, 262, {sz:9.5, c:C.tx2});
  txt(g, '到底同时动了哪几对触点 —— 正反转互锁全靠它', 180, 277, {sz:9.5, c:C.tx2});
}
function note2(){
  const it = BTN2[S2.k];
  $('s2a').textContent = it.t;
  $('s2b').textContent = it.memo;
  let h = '';
  if(S2.k === 0) h =
    '<div class="st">线圈的符号就一个：矩形</div>' +
    '接触器 KM、中间继电器 KA、时间继电器 KT、电压继电器 KV —— ' +
    '<b>它们的线圈画出来一模一样，都是这个矩形加两根引线</b>。' +
    '图上要分清是哪一种，<b>只能看旁边的文字符号</b>。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>一只接触器在图上是分散的</b>：线圈画在控制电路里（那根 KM），' +
    '三个主触头画在主电路里（KM-1），辅助触头又在别处（KM-2）。' +
    '<b>它们之间没有一根导线相连</b> —— 联系是机械的：' +
    '线圈一得电，衔铁吸合，把所有触点一起带动。' +
    '<span class="sub">2.2 节那个接触器演示台演的就是这一下。第 4.5 节讲怎么在实物上找到它们。</span></div>';
  else if(S2.k === 1) h =
    '<div class="st">启动按钮 ＝ 动合触点 ＋ 一根推杆</div>' +
    '触点本身是<b>动合</b>的（平时断），左边那根<b>虚线加一根竖杆带个帽</b>就是按钮的操作机构。' +
    '按下去，推杆把动触点压上去，接通。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>松手就弹回来</b>，所以光靠按钮只能实现「按住才转」（这就是 4.2 那张图上的点动）。' +
    '想松手也接着转，得让接触器自己的一个动合辅助触点<b>并在按钮两边</b>把回路接住 ——' +
    '<b>那就是自锁，4.4 节整整一屏在讲它。</b></div>';
  else if(S2.k === 2) h =
    '<div class="st bad">停止按钮和急停，都是动断的</div>' +
    '两个符号的触点部分完全一样：<b>静触点端有一横，动臂压在上面</b> —— 平时接通。' +
    '差别只在操作机构：急停是个<b>蘑菇头</b>。' +
    '<div class="tip" style="margin-top:8px">' +
    '蘑菇头有两个用意：<b>手掌一拍就能拍到</b>（紧急时来不及找按钮），' +
    '<b>拍下去自己保持住、要旋一下才复位</b>。' +
    '<b>这个「保持」很要紧</b> —— 有人拍了急停去处理故障，' +
    '要是按钮会自动弹回来，别人一开机他就在里面。' +
    '<span class="sub">现场急停按钮一律是红色蘑菇头配黄色底板，这也是硬规矩。</span></div>';
  else h =
    '<div class="st">复合按钮 ＝ 一根杆同时带一对动断和一对动合</div>' +
    '按下去，<b>动断的那一对先断开，动合的那一对随后接通</b>（中间有一小段两对都断开的时间）。' +
    '图上就靠那条<b>贯穿两对触点的虚线</b>表示「它们是一根杆带的」。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>为什么要先断后通</b>：电动机正反转控制里，按「正转」按钮的同时' +
    '得先把「反转」那一路切断，两个接触器绝不能同时吸合（会相间短路）。' +
    '复合按钮那个「先断后通」的时间差，正好保证这一点 ——' +
    '<span class="sub">这叫按钮互锁，第 11 章会连着接触器互锁一起讲。</span></div>';
  $('n1').innerHTML = h;
}
document.getElementById('s2k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S2.k = +t.dataset.k;
  document.querySelectorAll('#s2k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S2.k);
  });
  note2(); draw2();
});

/* ================================================================
   场景 3：保护与测量 —— 直接用 elec-symbols.js 那套
   ================================================================
   ESYM.drawKey(g,key,W,H,pad) 在 (0,0)-(W,H) 的局部坐标里等比缩放居中，
   所以每一格 translate 过去再调。三格并排，格宽 116。
   pad 分档给：仪表那档的盒子只有 48×48，pad 小了会撑成一个大圆。 */
const GRP3 = [
  {t:'三极开关', memo:'刀身上那一笔',
   pad:12,
   k:[['sym:switch3-plain','刀开关 / 隔离开关','QS', 0],
      ['sym:switch3-trip','断路器（× ＝ 自动脱扣）','QF', 1],
      ['sym:switch3-fuse','熔断器式开关组合','QS + FU', 0]]},
  {t:'熔断器', memo:'长方框 ＋ 一条贯穿线',
   pad:24,
   k:[['sym:fuse-thin','窄框画法','FU', 0],
      ['sym:fuse-wide','熔断器（常见画法）','FU', 1],
      ['sym:fuse-diode','这是二极管，不是熔断器','VD', 0]]},
  {t:'热继电器', memo:'触点臂上多个小方块',
   pad:18,
   k:[['sym:contact-heater','热元件（串在主电路）','FR', 1],
      ['sym:contact-link','带机械联动虚线的画法','—', 0],
      ['sym:contact-plain','普通动合触点（不是它）','—', 0]]},
  {t:'位置·速度', memo:'方框里写 n ＝ 转速',
   pad:18,
   k:[['sym:contact-link','位置（行程）开关','SQ', 0],
      ['sym:contact-label-n','速度继电器（n ＝ 转速）','KS', 1],
      ['sym:contact-loop','带检测机构的画法','KS', 0]]},
  {t:'仪表', memo:'圆圈 ＋ 一个字母',
   pad:30,
   k:[['sym:ammeter','电流表（串进去量）','PA', 1],
      ['sym:voltmeter','电压表（并上去量）','PV', 0],
      ['sym:ohmmeter','欧姆表','—', 0]]}
];
const S3 = { k:0 };
const st3 = new Stage('cv2', 360, 300);
const CW3 = 116, SY3 = 34, SH3 = 150;

function draw3(){
  const g = st3.g; st3.clear();
  const gr = GRP3[S3.k];
  EP.heading(g, 12, 14, gr.t, gr.memo);

  gr.k.forEach(function(it, i){
    const x0 = 6 + i * CW3;
    if(it[3]) hot(g, x0 + CW3/2, SY3 + SH3/2, 0, {w:CW3 - 8, h:SH3 + 6, r:10});
    g.save();
    g.translate(x0, SY3);
    if(window.ESYM) ESYM.drawKey(g, it[0], CW3, SH3, gr.pad);
    g.restore();
    /* 名称最多两行：一格只有 116 宽，长句子必须拆 */
    const c = it[3] ? C.acc : C.tx2;
    const parts = wrap3(g, it[1], CW3 - 8);
    parts.forEach(function(s, j){
      txt(g, s, x0 + CW3/2, SY3 + SH3 + 16 + j*13, {sz:9, c:c});
    });
    txt(g, it[2], x0 + CW3/2, SY3 + SH3 + 16 + parts.length*13 + 3,
        {sz:10, b:1, c: it[3] ? C.acc : C.tx3});
  });

  EC.box(g, 18, 258, 324, 36, 6, C.accbg, C.acc, 1);
  txt(g, gr.note1 || CONC3[S3.k][0], 180, 270, {sz:10.5, b:1, c:C.acc});
  txt(g, CONC3[S3.k][1], 180, 285, {sz:9, c:C.tx2});
}
const CONC3 = [
  ['三把刀都一样，差别全在附加标记上', '× ＝ 能自动跳闸　方框 ＝ 带熔断器　什么都没有 ＝ 只能空载分合'],
  ['熔断器 ＝ 一个长方框，中间一条线贯穿', '实心三角配一条横杠的那个是二极管，别认错'],
  ['热继电器在图上是两处', '热元件串在主电路（这张图），动断触点串在控制电路'],
  ['靠附加标记认出「是什么让它动的」', '虚线拐角 ＝ 机械碰的　方框里写 n ＝ 转速带的'],
  ['圆圈里那个字母就是它量什么', 'A 电流、V 电压、Ω 电阻；文字符号一律 P 打头（PA、PV）']
];
/* 简单折行：中文按字数切，够用 */
function wrap3(g, s, maxW){
  if(tw(g, s, 9) <= maxW) return [s];
  for(let i = Math.ceil(s.length/2); i < s.length; i++){
    if(tw(g, s.slice(0, i), 9) > maxW){
      return [s.slice(0, i-1), s.slice(i-1)];
    }
  }
  return [s];
}
function note3(){
  const gr = GRP3[S3.k];
  $('s3a').textContent = gr.t;
  $('s3b').textContent = gr.memo;
  let h = '';
  if(S3.k === 0) h =
    '<div class="st">三张图长得几乎一样，能干的事完全不同</div>' +
    '三把斜刀 + 顶上一条联动虚线 —— <b>这是「三极开关」的通用骨架</b>，' +
    '表示三相同时通断。差别在于刀身上加了什么：' +
    '<b>什么都不加</b> ＝ 刀开关／隔离开关 QS；<b>加一个 ×</b> ＝ 断路器 QF；' +
    '<b>刀下面加个小方框</b> ＝ 里面带熔断器的开关组合。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>那个 × 就是「自动脱扣机构」</b>：过载、短路时它自己把开关打开。' +
    '有 × 的能带负荷分合、能自动跳；没 × 的<b>只能在不带负荷时拉合</b>。' +
    '<span class="sub">这两张图在考证题里正反面各考了一道，认错的人很多。</span></div>';
  else if(S3.k === 1) h =
    '<div class="st">熔断器 ＝ 长方框 ＋ 一条贯穿的线</div>' +
    '方框是熔断器的外壳，中间那条线是熔丝。' +
    '框画宽画窄各家习惯不同，<b>只要是「方框被一条线穿过」就是它</b>。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>别跟二极管认错</b>：二极管是<b>一个实心三角形顶着一条竖杠</b>，' +
    '三角形的尖指向哪边，电流就只能往哪边走（2.5b 讲过）。' +
    '两者在图上都是「一小段线上多个东西」，扫一眼很像。' +
    '<span class="sub">文字符号也不一样：熔断器 FU，二极管 VD。</span></div>';
  else if(S3.k === 2) h =
    '<div class="st">热继电器在图上分两处画</div>' +
    '<b>热元件</b>串在主电路里，电动机的电流从它身上过、把它烤热（左边那张，' +
    '触点臂上那个小方块就是发热元件的记号）；' +
    '<b>动断触点</b>串在控制电路里，热到一定程度它断开，接触器失电、电动机停。' +
    '<div class="tip" style="margin-top:8px">' +
    '两处都标 <b>FR</b>，靠文字符号认亲 —— 和接触器的 KM / KM-1 是同一个路子。' +
    '<span class="sub">考证题库把中间那张（带机械联动虚线的）也归进了' +
    '「热继电器的电气图形」，而通行画法里那个标记多用在位置开关一类。' +
    '<b>考试按题库答，现场只要记住：热继电器 ＝ 主电路上一个热元件 ＋ 控制电路上一对动断触点。</b></span></div>';
  else if(S3.k === 3) h =
    '<div class="st">靠附加标记看出「是什么让它动的」</div>' +
    '触点本身还是那个触点，<b>旁边多出来的那一小笔告诉你它靠什么动作</b>：' +
    '<b>一条虚线拐个角</b> ＝ 有东西机械地碰它（位置开关 SQ，工件走到位就压下去）；' +
    '<b>一个方框里写着 n</b> ＝ 靠转速动作（速度继电器 KS，n 就是转速）。' +
    '<div class="tip info" style="margin-top:8px">' +
    '速度继电器用在<b>反接制动</b>上：电动机还在转它就闭合，转速掉到接近零它断开 ——' +
    '刚好在停住的那一刻把反接的电切掉，不然电动机会反过来转。' +
    '<span class="sub">2.3 节继电器那一屏的图鉴里见过它。</span></div>';
  else h =
    '<div class="st">仪表 ＝ 一个圆圈 ＋ 它量什么</div>' +
    '圆圈里写 <b>A</b> 是电流表、<b>V</b> 是电压表、<b>Ω</b> 是欧姆表，' +
    '还有 <b>W</b> 功率表、<b>kWh</b> 电能表（电度表）。' +
    '<b>文字符号一律 P 打头</b>：PA 电流表、PV 电压表、PJ 电能表。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>怎么接，第 3 章已经讲透了</b>：电流表<b>串</b>进回路里（图上它在导线中间，' +
    '线从它身上穿过去），电压表<b>并</b>在两点之间（图上它挂在两根线之间）。' +
    '<span class="sub">配电柜上的电流表多半接在电流互感器 TA 的二次侧，' +
    '不是直接串进主回路 —— 2.6 节讲过，<b>下一屏最后一档</b>就是变压器和互感器。</span></div>';
  $('n2').innerHTML = h;
}
document.getElementById('s3k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S3.k = +t.dataset.k;
  document.querySelectorAll('#s3k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S3.k);
  });
  note3(); draw3();
});

/* ================================================================
   场景 4：负载 / 电源与接地 / 导线连接 / 变压器互感器
   ================================================================
   统一用「格子」布局：每格画一个符号 + 下面名称 + 文字符号。
   两行 × 三列，格中心 x = 66/180/294，y = 92/188。 */
function motorSym(g, x, y, r, phase){
  g.save();
  g.beginPath(); g.arc(x, y, r, 0, Math.PI*2);
  g.fillStyle = C.box; g.fill();
  g.lineWidth = 2.2; g.strokeStyle = C.wire; g.stroke();
  g.restore();
  txt(g, 'M', x, y - (phase ? 5 : 0), {sz:15, b:1, c:C.tx});
  if(phase) txt(g, phase, x, y + 10, {sz:9.5, c:C.tx2});
}
function lampX(g, x, y, r){
  g.save();
  g.beginPath(); g.arc(x, y, r, 0, Math.PI*2);
  g.fillStyle = C.box; g.fill();
  g.lineWidth = 2.2; g.strokeStyle = C.wire; g.stroke();
  const d = r * 0.72;
  g.beginPath();
  g.moveTo(x - d, y - d); g.lineTo(x + d, y + d);
  g.moveTo(x + d, y - d); g.lineTo(x - d, y + d);
  g.stroke();
  g.restore();
}
function resBox(g, x, y){
  box(g, x - 24, y - 10, 48, 20, 2, C.box, C.wire, 2.2);
  g.save();
  g.strokeStyle = C.wire; g.lineWidth = 2.2; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x - 40, y); g.lineTo(x - 24, y);
  g.moveTo(x + 24, y); g.lineTo(x + 40, y); g.stroke();
  g.restore();
}
function buzzerSym(g, x, y, r){
  g.save();
  g.beginPath(); g.arc(x, y + r/2, r, Math.PI, 0); g.closePath();
  g.fillStyle = C.box; g.fill();
  g.lineWidth = 2.2; g.strokeStyle = C.wire; g.stroke();
  g.beginPath(); g.moveTo(x - r, y + r/2 + 14); g.lineTo(x - r, y + r/2);
  g.moveTo(x + r, y + r/2); g.lineTo(x + r, y + r/2 + 14); g.stroke();
  g.restore();
}
function acSrc(g, x, y, r){
  g.save();
  g.beginPath(); g.arc(x, y, r, 0, Math.PI*2);
  g.fillStyle = C.box; g.fill();
  g.lineWidth = 2.2; g.strokeStyle = C.wire; g.stroke();
  g.lineWidth = 2; g.beginPath();
  for(let i = 0; i <= 20; i++){
    const t = i/20, px = x - r*0.6 + t*r*1.2, py = y - Math.sin(t*Math.PI*2)*r*0.34;
    if(i === 0) g.moveTo(px, py); else g.lineTo(px, py);
  }
  g.stroke();
  g.restore();
}
function dcSrc(g, x, y, r){
  g.save();
  g.beginPath(); g.arc(x, y, r, 0, Math.PI*2);
  g.fillStyle = C.box; g.fill();
  g.lineWidth = 2.2; g.strokeStyle = C.wire; g.stroke();
  g.restore();
  /* EP.dcMark 是给标注用的固定小尺寸，塞进 r=18 的圈里太小，放大一倍多 */
  g.save(); g.translate(x, y); g.scale(1.9, 1.9);
  EP.dcMark(g, 0, 0, C.wire);
  g.restore();
}
/* 电池：EC.battery 只画极板，两头补引线才像图上的符号 */
function batSym(g, x, y){
  g.save();
  g.strokeStyle = C.wire; g.lineWidth = 2.2; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x - 34, y); g.lineTo(x - 6, y);
  g.moveTo(x + 6, y); g.lineTo(x + 34, y); g.stroke();
  g.restore();
  EC.battery(g, x, y, {long:26, short:14, gap:9, lw:2.6});
}
function earthSym(g, x, y){
  g.save();
  g.strokeStyle = C.PE; g.lineWidth = 2.4; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x, y - 20); g.lineTo(x, y); g.stroke();
  const ws = [22, 14, 7];
  ws.forEach(function(w, i){
    g.beginPath(); g.moveTo(x - w/2, y + i*7); g.lineTo(x + w/2, y + i*7); g.stroke();
  });
  g.restore();
}
function chassisSym(g, x, y){
  g.save();
  g.strokeStyle = C.metal; g.lineWidth = 2.4; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x, y - 20); g.lineTo(x, y); g.stroke();
  g.beginPath(); g.moveTo(x - 13, y); g.lineTo(x + 13, y); g.stroke();
  g.lineWidth = 1.9;
  for(let i = -1; i <= 1; i++){
    g.beginPath(); g.moveTo(x + i*10 - 3, y + 10); g.lineTo(x + i*10 + 4, y); g.stroke();
  }
  g.restore();
}
function joinSym(g, x, y){
  g.save();
  g.strokeStyle = C.wire; g.lineWidth = 2.4; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x - 30, y); g.lineTo(x + 30, y); g.stroke();
  g.beginPath(); g.moveTo(x, y); g.lineTo(x, y + 26); g.stroke();
  g.restore();
  dot(g, x, y, C.ok, 4.2);
}
function crossSym(g, x, y){
  g.save();
  g.strokeStyle = C.wire; g.lineWidth = 2.4; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x - 30, y); g.lineTo(x + 30, y); g.stroke();
  g.beginPath(); g.moveTo(x, y - 20); g.lineTo(x, y + 26); g.stroke();
  g.restore();
}
function crossJoinSym(g, x, y){
  g.save();
  g.strokeStyle = C.wire; g.lineWidth = 2.4; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x - 30, y); g.lineTo(x + 30, y); g.stroke();
  g.beginPath(); g.moveTo(x, y - 20); g.lineTo(x, y + 26); g.stroke();
  g.restore();
  dot(g, x, y, C.ok, 4.2);
}
/* 电容器：两条平行短线 + 引线。跟电阻的长方框一眼分得开 */
function capSym(g, x, y){
  g.save();
  g.strokeStyle = C.wire; g.lineWidth = 2.6; g.lineCap = 'butt';
  g.beginPath(); g.moveTo(x - 4, y - 14); g.lineTo(x - 4, y + 14);
  g.moveTo(x + 4, y - 14); g.lineTo(x + 4, y + 14); g.stroke();
  g.lineWidth = 2.2; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x - 34, y); g.lineTo(x - 4, y);
  g.moveTo(x + 4, y); g.lineTo(x + 34, y); g.stroke();
  g.restore();
}
/* 老图纸上表示「不相连」的跨接半圆 */
function hopSym(g, x, y){
  g.save();
  g.strokeStyle = C.wire; g.lineWidth = 2.4; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x - 30, y); g.lineTo(x - 9, y); g.stroke();
  g.beginPath(); g.arc(x, y, 9, Math.PI, 0); g.stroke();
  g.beginPath(); g.moveTo(x + 9, y); g.lineTo(x + 30, y); g.stroke();
  g.beginPath(); g.moveTo(x, y - 18); g.lineTo(x, y + 22); g.stroke();
  g.restore();
}
/* 实线 ＝ 导线，虚线 ＝ 机械联动。上下并排画，一眼看出是两种线 */
function lineKindSym(g, x, y){
  g.save();
  g.strokeStyle = C.wire; g.lineWidth = 2.4; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x - 30, y); g.lineTo(x + 30, y); g.stroke();
  g.setLineDash([4,4]); g.lineWidth = 1.4; g.strokeStyle = C.tx3;
  g.beginPath(); g.moveTo(x - 30, y + 22); g.lineTo(x + 30, y + 22); g.stroke();
  g.restore();
}
/* 一根线代表多根：线上打一条斜划，旁边标根数 */
function multiSym(g, x, y){
  g.save();
  g.strokeStyle = C.wire; g.lineWidth = 2.4; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x - 30, y); g.lineTo(x + 30, y); g.stroke();
  g.lineWidth = 2;
  g.beginPath(); g.moveTo(x - 7, y + 9); g.lineTo(x + 7, y - 9); g.stroke();
  g.restore();
  txt(g, '3', x + 4, y - 15, {sz:11, b:1, c:C.tx});
}
function terminalSym(g, x, y){
  g.save();
  g.strokeStyle = C.wire; g.lineWidth = 2.4; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x - 30, y); g.lineTo(x - 6, y); g.stroke();
  g.beginPath(); g.moveTo(x + 6, y); g.lineTo(x + 30, y); g.stroke();
  g.beginPath(); g.arc(x, y, 5.4, 0, Math.PI*2);
  g.fillStyle = C.bg; g.fill(); g.stroke();
  g.restore();
}
/* 仪表：圆圈 + 一个字母。EC.meter 画的是白表盘（真实材质色），
   混在一堆线条符号里会变成一个白饼，所以这里自己画一个符号版 */
function meterCircle(g, x, y, r, ch){
  g.save();
  g.beginPath(); g.arc(x, y, r, 0, Math.PI*2);
  g.fillStyle = C.box; g.fill();
  g.lineWidth = 2.2; g.strokeStyle = C.wire; g.stroke();
  g.restore();
  txt(g, ch, x, y + 1, {sz:r*0.95, b:1, c:C.tx});
}

/* 变压器：两组半圆绕组，中间两条竖线是铁芯 */
function trafoSym(g, x, y, o){
  o = o || {};
  g.save();
  g.strokeStyle = C.cop; g.lineWidth = 2.2; g.lineCap = 'round';
  for(let s = -1; s <= 1; s += 2){
    const bx = x + s*20;
    g.beginPath();
    for(let i = 0; i < 3; i++){
      g.arc(bx, y - 14 + i*14, 7, -Math.PI/2, Math.PI/2, s < 0);
    }
    g.stroke();
    g.beginPath();
    g.moveTo(bx, y - 26); g.lineTo(bx + s*(-13), y - 26);
    g.moveTo(bx, y + 26); g.lineTo(bx + s*(-13), y + 26);
    g.stroke();
  }
  if(o.core !== false){
    g.strokeStyle = C.metal; g.lineWidth = 2;
    g.beginPath(); g.moveTo(x - 4, y - 28); g.lineTo(x - 4, y + 28);
    g.moveTo(x + 4, y - 28); g.lineTo(x + 4, y + 28); g.stroke();
  }
  g.restore();
}
/* 自耦变压器：**一个**绕组，中间引出一个抽头 —— 一次二次共用那一段，
   所以没有电气隔离（2.6 节那一屏讲的就是这条）。
   原来这一格写的是「两组绕组不画铁芯」，那是错的，自耦不是那么画的 */
function autoSym(g, x, y){
  g.save();
  g.strokeStyle = C.cop; g.lineWidth = 2.2; g.lineCap = 'round';
  g.beginPath();
  for(let i = 0; i < 4; i++) g.arc(x, y - 21 + i*14, 7, -Math.PI/2, Math.PI/2);
  g.stroke();
  g.beginPath();
  g.moveTo(x, y - 28); g.lineTo(x - 24, y - 28);
  g.moveTo(x, y + 28); g.lineTo(x - 24, y + 28);
  g.stroke();
  /* 中间抽头 */
  g.strokeStyle = C.err; g.lineWidth = 2.2;
  g.beginPath(); g.moveTo(x + 7, y + 7); g.lineTo(x + 26, y + 7); g.stroke();
  g.restore();
  txt(g, '抽头', x + 30, y + 7, {sz:8, c:C.err, al:'left'});
}
/* 电流互感器：一条粗的一次导线穿过一个环（二次绕组） */
function ctSym(g, x, y){
  g.save();
  g.strokeStyle = C.wire; g.lineWidth = 4; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x - 44, y); g.lineTo(x + 44, y); g.stroke();
  g.strokeStyle = C.cop; g.lineWidth = 2.2;
  g.beginPath(); g.arc(x, y + 16, 14, 0, Math.PI*2); g.stroke();
  g.beginPath(); g.moveTo(x - 6, y + 30); g.lineTo(x - 6, y + 38);
  g.moveTo(x + 6, y + 30); g.lineTo(x + 6, y + 38); g.stroke();
  g.restore();
}

const GRP4 = [
  {t:'负载与元件', memo:'圈里 3~ ＝ 三相', cols:3,
   k:[[function(g,x,y){ motorSym(g,x,y,20,'3~'); }, '三相电动机', 'M'],
      [function(g,x,y){ lampX(g,x,y,17); }, '灯（照明／信号）', 'EL / HL'],
      [function(g,x,y){ resBox(g,x,y); }, '电阻·电热元件', 'R / EH'],
      [function(g,x,y){ motorSym(g,x,y,20,'—'); }, '直流电动机', 'MD'],
      [function(g,x,y){ buzzerSym(g,x,y,15); }, '蜂鸣器', 'HA'],
      [function(g,x,y){ capSym(g,x,y); }, '电容器', 'C']]},
  {t:'电源与接地', memo:'接地 ≠ 接机壳', cols:3,
   k:[[function(g,x,y){ acSrc(g,x,y,18); }, '交流电源', 'AC'],
      [function(g,x,y){ dcSrc(g,x,y,18); }, '直流电源', 'DC'],
      [function(g,x,y){ batSym(g,x,y); }, '电池', 'GB'],
      [function(g,x,y){ earthSym(g,x,y-10); }, '接地', 'PE'],
      [function(g,x,y){ chassisSym(g,x,y-10); }, '接机壳', '—'],
      [function(g,x,y){ terminalSym(g,x,y); }, '端子（空心圆）', 'XT']]},
  {t:'导线连接', memo:'有点相连，没点不连', cols:3,
   k:[[function(g,x,y){ joinSym(g,x,y-8); }, 'T 形连接：打点', '相连'],
      [function(g,x,y){ crossJoinSym(g,x,y-8); }, '十字连接：打点', '相连'],
      [function(g,x,y){ crossSym(g,x,y-8); }, '交叉不打点', '不相连'],
      [function(g,x,y){ hopSym(g,x,y-8); }, '老图纸：半圆跨过去', '不相连'],
      [function(g,x,y){ lineKindSym(g,x,y-6); }, '实线导线／虚线联动', '—'],
      [function(g,x,y){ multiSym(g,x,y-8); }, '一根线代表三根', '—']]},
  {t:'变压器与互感器', memo:'两组绕组＋铁芯', cols:2,
   k:[[function(g,x,y){ trafoSym(g,x,y); }, '变压器（双绕组）', 'TM / TC'],
      [function(g,x,y){ ctSym(g,x,y-16); }, '电流互感器', 'TA'],
      [function(g,x,y){ autoSym(g,x,y); }, '自耦变压器<br>（一次二次直接通着）', 'T'],
      [function(g,x,y){ meterCircle(g,x,y,17,'A'); }, '电流表（接 TA 二次侧）', 'PA']]}
];
const S4 = { k:0 };
const st4 = new Stage('cv3', 360, 320);

function draw4(){
  const g = st4.g; st4.clear();
  const gr = GRP4[S4.k];
  EP.heading(g, 12, 14, gr.t, gr.memo);

  const cols = gr.cols, rows = Math.ceil(gr.k.length / cols);
  const cw = 360 / cols;
  /* 变压器那一档（cols 2）符号本身就高，行心要比三列那几档再拉开一点，
     否则第一行的名称正好压在第二行符号的上引线上（截图抓到的） */
  const ry = rows === 2 ? (cols === 2 ? [82, 190] : [86, 186]) : [120];
  gr.k.forEach(function(it, i){
    const cx = cw * (i % cols) + cw/2, cy = ry[Math.floor(i / cols)];
    it[0](g, cx, cy);
    /* 名称可能折行，文字符号得按**实际画了几行**往下排，
       按 lines.length 排的话折行时会被压住 */
    let row = 0;
    String(it[1]).split('<br>').forEach(function(s){
      wrap3(g, s, cw - 12).forEach(function(p){
        txt(g, p, cx, cy + 34 + row*12, {sz:8.5, c:C.tx2});
        row++;
      });
    });
    txt(g, it[2], cx, cy + 34 + row*12 + 4, {sz:9.5, b:1, c:C.tx3});
  });

  EC.box(g, 18, 268, 324, 44, 6, C.accbg, C.acc, 1);
  txt(g, CONC4[S4.k][0], 180, 283, {sz:10.5, b:1, c:C.acc});
  txt(g, CONC4[S4.k][1], 180, 300, {sz:9, c:C.tx2});
}
const CONC4 = [
  ['圆圈里那个字母就是它是什么', 'M 电动机、EL 灯；圈里的 3~ 表示三相交流，一条横线表示直流'],
  ['接地 ＝ 三条递减横线，接机壳 ＝ 横线下带斜纹', '两个符号不能互相代替：接机壳不保证外壳真的接了地'],
  ['那个小黑点决定两根线连不连', '打点 ＝ 接在一起；没点 ＝ 只是画面上交叉过去，各走各的'],
  ['两组绕组画在一起 ＝ 变压器', '自耦只有一组绕组带个抽头 —— 一次二次直接通着，没有安全隔离']
];
function note4(){
  const gr = GRP4[S4.k];
  $('s4a').textContent = gr.t;
  $('s4b').textContent = gr.memo;
  let h = '';
  if(S4.k === 0) h =
    '<div class="st">负载与元件 —— 圆圈里那个字母就是答案</div>' +
    '<b>M</b> 是电动机，圈里再写 <b>3~</b> 表示三相交流、写一条横线表示直流。' +
    '<b>圆圈里打个叉</b>是灯：照明灯写 <b>EL</b>、信号指示灯写 <b>HL</b> —— ' +
    '<b>符号一样，靠文字符号分</b>。' +
    '<div class="tip info" style="margin-top:8px">' +
    '一个<b>长方框</b>是电阻，接在电路里当负载时也可能是电热元件（EH）。' +
    '半圆是蜂鸣器 HA，<b>两条平行短线</b>是电容器 C（严格说它不是负载，' +
    '放在这一组是因为图上常和这些画在一起）。' +
    '<span class="sub">4.1 那张照明回路图上那盏灯，画的就是这个圆圈打叉。</span></div>';
  else if(S4.k === 1) h =
    '<div class="st bad">接地和接机壳，是两个符号</div>' +
    '<b>接地</b>是一根竖线接三条越来越短的横线 —— 真的接到大地。' +
    '<b>接机壳</b>是一根竖线接一条横线、横线下面几道斜纹 —— 接到设备的金属外壳或底板。' +
    '<b>外壳不一定接了地。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '电源那边：<b>圆圈里一条波浪线</b>是交流源、<b>圆圈里一实线加三段虚线</b>是直流源，' +
    '长短线相间的是电池 GB（长的是正极）。' +
    '<span class="sub">端子画成一个<b>空心小圆</b>：表示这里是可以拆开、可以量的一个接点。' +
    '接线图上端子排 XT 上每个孔就是一个空心圆，4.5 节要靠它把原理图和实物对起来。</span></div>';
  else if(S4.k === 2) h =
    '<div class="st bad">那个小黑点，是全图信息量最大的一笔</div>' +
    '<b>交叉处画一个实心黑点 ＝ 这两根线在这里接在一起；' +
    '没有黑点 ＝ 只是图面上交叉过去，实际互不相干。</b>' +
    '一张稍复杂的图上有几十个交叉，<b>全靠这个点区分</b>。' +
    '<div class="tip" style="margin-top:8px">' +
    '所以<b>这个点不能随手加、也不能漏</b>。画图时能绕开就绕开：' +
    '4.1 节那张接线图把端子排成 PE / N / L，就是为了让开关那根绕线不跟别的线交叉。' +
    '<span class="sub">老图纸上还能见到用<b>半圆跨过去</b>表示「不相连」的画法，' +
    '现行标准是直接交叉、不打点。碰到老图先翻图例。</span></div>';
  else h =
    '<div class="st">变压器与互感器</div>' +
    '<b>两组绕组画在一起</b>就是变压器：每组是几个连着的半圆（那就是线圈），' +
    '中间两条竖线是<b>铁芯</b>。电力变压器 TM、控制变压器 TC 用的是同一个符号。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>电流互感器 TA</b> 长得不一样：一条粗线（一次，主回路那根导线）<b>穿过</b>' +
    '一个环（二次绕组）。配电柜上的电流表就接在它的二次侧 ——' +
    '<b>所以柜门上那块表量的不是真电流，是按变比折算出来的</b>。' +
    '<span class="sub">2.6 节那两条铁律还记得吗：<b>CT 二次不许开路、PT 二次不许短路</b>。</span></div>';
  $('n3').innerHTML = h;
}
document.getElementById('s4k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S4.k = +t.dataset.k;
  document.querySelectorAll('#s4k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S4.k);
  });
  note4(); draw4();
});

/* ================================================================
   绑定
   ================================================================ */
function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* 四屏全是静态的（没有 rAF 循环），fit() 会清空画布，
     所以四个 draw 都得在这儿补画一次，否则第一次进来是一片空白 */
  draw1(); draw2(); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:4, sec:'4.3'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('4.3');
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
