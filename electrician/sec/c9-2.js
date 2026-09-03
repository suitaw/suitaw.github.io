/* 9.2 六条设计原则 —— 本节内容的唯一真相。
   对应《零基础学电工》第 9 章 9.2.1 节「电力拖动系统的规划设计」（书内 P167~P170）。

   **这一节是整章里最「图纸」的一节**，书上给了六条原则、每条配一张改前／改后对比图
   （图 9-6 ~ 9-11）。天生适合做成「点一条，左右看对比」。

   六条分到四屏：
   屏 1「省」= ① 减少导线 ② 减少部件和触头
   屏 2「顺」= ③ 动作的合理性
   屏 3「别接错」= ④ 触头的接法 ⑤ 线圈的接法（这两条接错真会出事）
   屏 4「保」= ⑥ 保护措施 ＋ 设计的两个阶段

   六条原则的原文（书上标题和正文照录，别凭记忆改）：

   **① 尽量减小导线的数量和缩短导线的长度**
   「在设计控制线路时，应考虑到各个元器件之间的实际连接和布线，
   **特别应注意电气箱、操作台和行程开关之间的连接导线**。
   通常，**启动按钮与停止按钮是直接连接的**，这样的连接方式可以减少导线，缩短导线的长度。」
   图 9-6 的注：**对照电路图将起动按钮与停止按钮直接连接，可以减少导线的数量**

   **② 尽量减少电气部件的数量和线路的触头**
   「在设计电力拖动系统时，**应减少电气部件的数量，简化电路，提高线路的可靠性**。
   使用电气部件时，应尽量**采用标准的和同型号的电气设备**。
   为了使控制线路简化，**在功能不变的情况下**，应对控制线路进行整理，**尽量减少触头的使用**。」

   **③ 尽量保证电气部件动作的合理性**
   「在控制线路中，应尽量使电气部件的**动作顺序合理化**，
   **避免经过多个电气部件依次动作后，才可以接通另一个电气部件的情况**。」
   图 9-8 改前的注：**电路中的 KM3 线圈需要等到 SB1、SB2、SB3 相继动作后才可以得电**；
   改后的注：**当闭合 SB1 时，KM1~KM3 同时得电**

   **④ 正确连接电气部件的触头**
   「有些电气部件**同时具有常开和常闭触头，且触头位置很远**。在连接该类部件时，
   应将**共用电源的所有接触器、继电器及执行部件的线圈端均接电源一侧，
   控制触头接电源另一侧**，以免由于**触头断开时产生的电弧造成电源短路**的现象。」

   **⑤ 正确连接电气部件的线圈**
   「交流控制电路常常使用交流接触器，在使用时要注意额定工作电压及控制关系，
   **若两个交流接触器的线圈串联在电路中，则一个接触器断路，两个接触器均不能工作，
   而且会使工作电流不足，引起故障**。」
   图 9-10 的注：**将两个串联的线圈改为并联，使每个线圈承受额定电压**

   **⑥ 设置必要的保护措施**
   「控制电路在事故情况下应能保证**操作人员、电气设备、生产机械**的安全，
   并能**有效地制止事故的扩大**。为此，在控制电路中应采取一定的保护措施。
   常用的有**漏电保护开关、过载、短路、过电流、过电压、失电压、联锁与行程保护**等措施，
   **必要时还可设置相应的指示信号**。」

   **设计的两个阶段（书 P170 提示说明原文）**：
   「在进行电力拖动系统设计时，**首先是对供电部分的设计**，该阶段的设计内容主要是
   **整理、绘制电力拖动系统各主要部件的供电连接关系**；**第二阶段是完成控制部分的设计**，
   该阶段的设计内容是结合实际工作情况**在原本供电系统的架构上增添接触器、继电器、
   按钮开关等控制部件**，以完善整个电力拖动系统的控制功能。另外，
   **对于较重要的电力拖动系统，为确保维修方便，使用安全，应在电路中设置隔离器，
   以便停电检修**。」*/
(function(){
'use strict';
ELEC.reg({
  id: '9.2',
  file: 'c9-2.html',
  title: '9.2 六条设计原则',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>省</button>
    <button class="tab" data-i="1"><span class="n">2</span>顺</button>
    <button class="tab" data-i="2"><span class="n">3</span>别接错</button>
    <button class="tab" data-i="3"><span class="n">4</span>保</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">前两条都在说一件事：能少就少</div>
    <b>① 少用导线　② 少用部件和触头。</b>
    少不是为了省钱 —— 是<b>每多一根线、每多一对触头，就多一个会松、会脏、会坏的地方</b>。
    <b>点一条，左右对比看。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">① 少用导线</button>
        <button class="btn sm" data-k="1">② 少用触头</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这一条</div><div class="v" id="s1a">少用导线</div></div>
        <div class="num"><div class="k">改前</div><div class="v" id="s1b">4 根</div></div>
        <div class="num hi"><div class="k">改后</div><div class="v" id="s1c">3 根</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">① 尽量减小导线的数量和缩短导线的长度（书上原话）</div>
    「在设计控制线路时，应考虑到各个元器件之间的<b>实际连接和布线</b>，
    <b>特别应注意电气箱、操作台和行程开关之间的连接导线</b>。
    通常，<b>启动按钮与停止按钮是直接连接的</b>，
    这样的连接方式可以减少导线，缩短导线的长度。」
    <div class="tip info">
      <b>关键在「实际连接」这四个字。</b>
      <span class="sub">画原理图的时候，起动按钮和停止按钮是两个分开的符号；
      <b>可实物上它们装在同一个操作盒里，相距几厘米</b>。
      在盒子里把它们直接连起来，就省掉了一根从盒子拉回控制箱的长线。
      <hr>这一条 4.5 讲过的道理反过来用：<b>原理图上离得远的，实物上可能挨着</b>。
      设计的时候要同时想着两张图。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">② 尽量减少电气部件的数量和线路的触头（书上原话）</div>
    「应<b>减少电气部件的数量，简化电路，提高线路的可靠性</b>。
    使用电气部件时，应尽量<b>采用标准的和同型号的电气设备</b>。
    为了使控制线路简化，<b>在功能不变的情况下</b>，应对控制线路进行整理，
    <b>尽量减少触头的使用</b>。」
    <div class="tip">
      <b>「在功能不变的情况下」是前提 —— 不能为了少而砍功能。</b>
      <span class="sub">另外「尽量采用标准的和同型号的电气设备」这半句很实际：
      <b>同型号意味着备件通用</b>。柜里五只接触器都是同一型号，
      备件柜里放两只就够；五只各不相同，就得备五只。
      <hr>触头也一样：<b>每一对触头都是一个会氧化、会积灰、会接触不良的点</b>。
      能用一对完成的事，别用两对。</span>
    </div>
  </div>
</section>

<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">③ 别让一个动作等前面三个</div>
    书上原话：<b>避免经过多个电气部件依次动作后，才可以接通另一个电气部件的情况。</b>
    <b>点「按下 SB1」看两种接法的差别</b> ——
    左边要等三个按钮相继动作，右边一下全通。
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">初始</button>
        <button class="btn sm" data-k="1">按下 SB1</button>
        <button class="btn sm" data-k="2">再按 SB2</button>
        <button class="btn sm" data-k="3">再按 SB3</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">按了几个</div><div class="v" id="s2a">0</div></div>
        <div class="num"><div class="k">改前<br>得电几个</div><div class="v" id="s2b">0 / 3</div></div>
        <div class="num hi"><div class="k">改后<br>得电几个</div><div class="v" id="s2c">0 / 3</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">③ 尽量保证电气部件动作的合理性（书上原话）</div>
    「在控制线路中，应尽量使电气部件的<b>动作顺序合理化</b>，
    <b>避免经过多个电气部件依次动作后，才可以接通另一个电气部件的情况</b>。」
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>书上的注</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">改前</td>
          <td>电路中的 <b>KM3 线圈需要等到 SB1、SB2、SB3 相继动作后</b>才可以得电</td></tr>
        <tr><td class="eu-s">改后</td>
          <td><b>当闭合 SB1 时，KM1~KM3 同时得电</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>串成一串的坏处不只是慢，是「中间任何一环出问题，后面全废」。</b>
      <span class="sub">改前那种接法里，<b>SB2 的触点脏了一点</b>，
      KM3 就永远得不了电 —— 而你查故障时会先去看 KM3 自己。
      <hr>并联之后，三条支路各走各的：<b>某一条坏了只影响那一条</b>，
      而且一眼就能定位。这跟 8.1 讲配电接线方式时那条
      「<b>断一根，谁跟着停</b>」是同一个思路，
      只是从配电搬到了控制回路上。</span>
    </div>
  </div>
</section>

<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">这两条接错了，是会出事的</div>
    前三条错了顶多是「不好用」，<b>这两条错了会短路、会烧线圈</b>。
    <b>④ 触头怎么接　⑤ 线圈怎么接。</b>
    <b>点一条看左右对比。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">④ 触头的接法</button>
        <button class="btn sm" data-k="1">⑤ 线圈的接法</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这一条</div><div class="v" id="s3a">触头接法</div></div>
        <div class="num"><div class="k">接错的<br>后果</div><div class="v" id="s3b">电源短路</div></div>
        <div class="num hi"><div class="k">怎么接<br>才对</div><div class="v" id="s3c">线圈同侧</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">④ 正确连接电气部件的触头（书上原话）</div>
    「有些电气部件<b>同时具有常开和常闭触头，且触头位置很远</b>。在连接该类部件时，
    应将<b>共用电源的所有接触器、继电器及执行部件的线圈端均接电源一侧，
    控制触头接电源另一侧</b>，以免由于<b>触头断开时产生的电弧造成电源短路</b>的现象。」
    <div class="tip">
      <b>「触头位置很远」是这条的前提。</b>
      <span class="sub">行程开关那种器件，两对触头在同一个开关体上，
      但接到控制箱里可能隔着好几米线。
      <b>要是一对接电源这一侧、另一对接另一侧</b>，
      两对触头之间那段线就<b>跨在电源两端</b> ——
      触头断开时拉出的电弧正好把两端连通，<b>就是一次电源短路</b>。
      <hr>正确接法一句话：<b>所有线圈都挂在同一侧，所有控制触头都在另一侧。</b></span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">⑤ 正确连接电气部件的线圈（书上原话）</div>
    「交流控制电路常常使用交流接触器，在使用时要注意<b>额定工作电压及控制关系</b>，
    <b>若两个交流接触器的线圈串联在电路中，则一个接触器断路，两个接触器均不能工作，
    而且会使工作电流不足，引起故障</b>。」
    图 9-10 的注：<b>将两个串联的线圈改为并联，使每个线圈承受额定电压。</b>
    <div class="tip">
      <b>两个 380V 的线圈串在 380V 上，每个只分到 190V。</b>
      <span class="sub">后果是<b>两个都吸不动</b>（或者吸合了但压不紧，
      触点发热、嗡嗡响）—— 这就是书上说的「工作电流不足，引起故障」。
      <hr>还有更隐蔽的一条：<b>串联意味着一个断路两个都不工作</b>。
      查故障时你会看到「两个接触器同时坏了」这种极不合理的现象，
      而真相是其中一个断了、把另一个也拖下水。
      <b>并联之后各走各的，每个线圈都拿到额定电压。</b></span>
    </div>
  </div>
</section>

<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">⑥ 保护措施：书上列了七种</div>
    <b>漏电保护、过载、短路、过电流、过电压、失电压、联锁与行程保护</b> ——
    「必要时还可设置相应的指示信号」。
    <b>点画布上的任意一张卡</b>，看它由哪个器件实现、9.1 那张图上是谁。
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="nums three">
        <div class="num"><div class="k">这一种</div><div class="v" id="s4a">短路</div></div>
        <div class="num"><div class="k">靠谁</div><div class="v" id="s4b">熔断器</div></div>
        <div class="num hi"><div class="k">反应<br>多快</div><div class="v" id="s4c">毫秒级</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">⑥ 设置必要的保护措施（书上原话）</div>
    「控制电路在事故情况下应能保证<b>操作人员、电气设备、生产机械</b>的安全，
    并能<b>有效地制止事故的扩大</b>。为此，在控制电路中应采取一定的保护措施。
    常用的有<b>漏电保护开关、过载、短路、过电流、过电压、失电压、联锁与行程保护</b>等措施，
    <b>必要时还可设置相应的指示信号</b>。」
    <div class="tip info">
      <b>注意书上把保护的目标写成三样，而且是有顺序的：</b>
      <span class="sub"><b>操作人员 → 电气设备 → 生产机械</b>。
      人排在最前面。
      <hr>还有「<b>有效地制止事故的扩大</b>」这半句 ——
      保护装置的价值不只是「出事时切断」，更是<b>把事故关在最小的范围里</b>。
      这跟 8.1 讲三级配电、8.2 讲分级整定是同一条线索。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">设计分两个阶段（书 P170 提示说明，原文照录）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>阶段</th><th>做什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">第一<br>阶段</td>
          <td><b>对供电部分的设计</b><br>
            <span class="sub">整理、绘制电力拖动系统各主要部件的供电连接关系</span></td></tr>
        <tr><td class="eu-s">第二<br>阶段</td>
          <td><b>完成控制部分的设计</b><br>
            <span class="sub">结合实际工作情况，在原本供电系统的架构上
            增添接触器、继电器、按钮开关等控制部件</span></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>书上还专门加了一句关于检修的：</b>
      <span class="sub">「对于较重要的电力拖动系统，<b>为确保维修方便，使用安全，
      应在电路中设置隔离器，以便停电检修</b>。」
      <hr><b>隔离器和断路器不是一回事</b>（4.3 讲图形符号时区分过）：
      断路器管的是「出事时自动断开」，<b>隔离器管的是「检修时看得见地断开」</b> ——
      它断开后有明显的可见断口，你站在柜前一眼就能确认这一段确实没电了。
      这跟 3.5 讲的「停电 → 验电 → 挂牌」是配套的。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="9.2">
    <div class="qz" data-q="书上说「通常，启动按钮与停止按钮是直接连接的」，为什么？"
      data-opts="因为电路上必须这么接|因为它们实物上装在同一个操作盒里，直接连能省掉一根拉回控制箱的长线|因为这样更安全"
      data-right="1"
      data-why="为了减少导线。原理图上起动和停止是两个分开的符号，可实物上它们装在同一个操作盒里、相距几厘米。在盒子里直接连起来，就省掉一根从操作盒拉回控制箱的长线。书上这一条的关键是「应考虑到各个元器件之间的实际连接和布线」——设计时要同时想着原理图和实物两张图。"></div>
    <div class="qz" data-q="书上第三条原则说要「避免经过多个电气部件依次动作后，才可以接通另一个电气部件」。串成一串最主要的坏处是什么？"
      data-opts="慢|中间任何一环出问题，后面全废——而且查故障时会先去看最后那个|费电"
      data-right="1"
      data-why="中间任何一环出问题后面全废。SB2 的触点脏了一点，KM3 就永远得不了电，而你查故障时会先去看 KM3 自己。并联之后三条支路各走各的，某一条坏了只影响那一条，而且一眼能定位。这跟 8.1 讲配电接线方式时「断一根，谁跟着停」是同一个思路。"></div>
    <div class="qz" data-q="两个交流接触器的线圈串联在 380V 控制回路里，会怎样？"
      data-opts="正常工作|每个线圈只分到约 190V，两个都吸不动；而且一个断路两个都不工作|会烧掉线圈"
      data-right="1"
      data-why="书上原话：若两个交流接触器的线圈串联在电路中，则一个接触器断路，两个接触器均不能工作，而且会使工作电流不足，引起故障。两个 380V 的线圈串在 380V 上，每个分到一半电压，吸不动或者吸合了压不紧（触点发热、嗡嗡响）。改成并联，每个线圈都承受额定电压。"></div>
    <div class="qz" data-q="书上说「对于较重要的电力拖动系统…应在电路中设置隔离器，以便停电检修」。隔离器和断路器的分别是什么？"
      data-opts="没什么分别，就是叫法不同|断路器管「出事时自动断开」，隔离器管「检修时看得见地断开」——它有明显的可见断口|隔离器能承受更大电流"
      data-right="1"
      data-why="断路器是保护电器，出事时自动跳闸；隔离器是为检修准备的，断开后有明显的可见断口，站在柜前一眼就能确认这一段确实没电。这跟 3.5 讲的「停电 → 验电 → 挂牌」是配套的：光把断路器扳到断开位置，你没法用眼睛确认它内部真的断开了。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 9 章 9.2.1 节（书内 P167~P170）</div>
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

function dot(g, x, y, c, r){
  g.save(); g.fillStyle = c || C.wire;
  g.beginPath(); g.arc(x, y, r || 3, 0, Math.PI*2); g.fill(); g.restore();
}
function seg(g, pts, c, lw){ new Path(pts).stroke(g, lw || 2, c || C.wire); }
const CONC = { ok:['okbg','ok'], err:['errbg','err'], warn:['warnbg','warn'], acc:['accbg','acc'] };
function conc(g, y, kind, l1, l2){
  const m = CONC[kind] || CONC.acc;
  box(g, 16, y, 328, 34, 6, C[m[0]], C[m[1]], 1);
  txt(g, l1, 180, y + 13, {sz:10.5, b:1, c:C[m[1]]});
  txt(g, l2, 180, y + 26, {sz:9, c:C.tx2});
}
/* 触点／线圈／按钮 —— 和 9.1 同一套画法，尺寸缩小一档（这一节要左右并排放两张图）*/
function noC(g, x, y, on, s){
  s = s || 0.8;
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.5; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x, y - 13*s); g.lineTo(x, y - 7*s); g.stroke();
  g.beginPath(); g.moveTo(x, y + 7*s); g.lineTo(x, y + 13*s); g.stroke();
  g.beginPath(); g.moveTo(x, y - 7*s);
  if(on) g.lineTo(x, y + 7*s); else g.lineTo(x + 8*s, y + 6*s);
  g.stroke(); g.restore();
  dot(g, x, y - 7*s, P.ink, 1.6); dot(g, x, y + 7*s, P.ink, 1.6);
}
function ncC(g, x, y, on, s){
  s = s || 0.8;
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.5; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x, y - 13*s); g.lineTo(x, y - 7*s); g.stroke();
  g.beginPath(); g.moveTo(x, y + 7*s); g.lineTo(x, y + 13*s); g.stroke();
  g.beginPath(); g.moveTo(x - 6*s, y + 7*s); g.lineTo(x + 10*s, y + 7*s); g.stroke();
  g.beginPath(); g.moveTo(x, y - 7*s);
  if(on) g.lineTo(x + 8*s, y + 6*s); else g.lineTo(x, y + 7*s);
  g.stroke(); g.restore();
  dot(g, x, y - 7*s, P.ink, 1.6);
}
function btn(g, x, y, nc, pressed, s){
  s = s || 0.8;
  if(nc) ncC(g, x, y, pressed, s); else noC(g, x, y, pressed, s);
  g.save(); g.setLineDash([2.5,2.5]); g.strokeStyle = P.ink; g.lineWidth = 1;
  g.beginPath(); g.moveTo(x + 3, y); g.lineTo(x + 18, y); g.stroke(); g.restore();
  g.save(); g.strokeStyle = pressed ? C.acc : P.ink; g.lineWidth = 2; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x + 18, y - 5); g.lineTo(x + 18, y + 5); g.stroke(); g.restore();
}
function coil(g, x, y, live, label, lc){
  box(g, x - 13, y - 9, 26, 18, 2, live ? C.accbg : C.card,
      live ? C.acc : P.ink, live ? 1.8 : 1.3);
  if(label) txt(g, label, x, y, {sz:8, b:1, c: live ? C.acc : C.tx2});
  if(lc) txt(g, lc, x, y + 20, {sz:7.5, b:1, c: live ? C.acc : C.tx3});
}
/* 两条母线 */
function rails(g, x0, x1, yt, yb, dim){
  const c = dim ? C.tx3 : C.wire, w = dim ? 1.3 : 2;
  seg(g, [[x0, yt],[x1, yt]], c, w);
  seg(g, [[x0, yb],[x1, yb]], c, w);
}
/* 「改前 / 改后」两块的标题 */
function pane(g, cx, y, ok, t){
  EP.chip(g, t, cx, y, {sz: t.length > 8 ? 7.5 : 9, b:1, c: ok ? C.ok : C.err});
}

/* ================================================================
   场景 1：① 少用导线　② 少用触头
   ================================================================
   左右并排两块。① 那一档画的是**实物布局**（操作盒 ＋ 控制箱），
   因为这一条讲的正是「原理图上分开的东西，实物上挨着」*/
const S1 = { k:0 };
function draw1(){
  const g = st1.g; st1.clear();
  const k = S1.k;
  EP.heading(g, 14, 20, k ? '② 少用部件和触头' : '① 少用导线',
             k ? '功能不变的前提下' : '起动和停止按钮直接连');

  if(k === 0){
    /* 实物布局：左边操作盒、右边控制箱，数中间几根线 */
    [[26, '改前', false, 4], [190, '改后', true, 3]].forEach(function(a){
      const x0 = a[0], okk = a[2], n = a[3];
      pane(g, x0 + 72, 44, okk, a[1] + '　' + n + ' 根线');
      /* 操作盒 */
      box(g, x0, 66, 56, 74, 5, C.box, C.boxLine, 1.4);
      txt(g, '操作盒', x0 + 28, 152, {sz:8, b:1, c:C.tx3});
      g.save(); g.fillStyle = C.ok; g.globalAlpha = .5;
      g.beginPath(); g.arc(x0 + 28, 86, 8, 0, Math.PI*2); g.fill(); g.restore();
      txt(g, 'SB1', x0 + 28, 86, {sz:7, b:1, c:C.tx});
      g.save(); g.fillStyle = C.err; g.globalAlpha = .5;
      g.beginPath(); g.arc(x0 + 28, 120, 8, 0, Math.PI*2); g.fill(); g.restore();
      txt(g, 'SB2', x0 + 28, 120, {sz:7, b:1, c:C.tx});
      /* 控制箱 */
      box(g, x0 + 108, 66, 36, 74, 5, C.box, C.boxLine, 1.4);
      txt(g, '控制箱', x0 + 126, 152, {sz:8, b:1, c:C.tx3});
      /* 中间的线 */
      if(okk){
        /* 改后：盒内先把两个按钮串起来，只有 3 根出去 */
        seg(g, [[x0 + 36, 86],[x0 + 44, 86],[x0 + 44, 120],[x0 + 36, 120]], C.ok, 2);
        /* 四个字的 chip 会压到操作盒左边框，缩成两个字 */
        EP.chip(g, '直连', x0 + 44, 103, {sz:7.5, b:1, c:C.ok});
        [86, 103, 120].forEach(function(y){
          seg(g, [[x0 + 52, y],[x0 + 108, y]], C.wire, 1.8);
        });
      } else {
        [78, 94, 112, 128].forEach(function(y){
          seg(g, [[x0 + 56, y],[x0 + 108, y]], C.wire, 1.8);
        });
      }
    });
    conc(g, 172, 'ok', '把起动和停止按钮在盒内直接连起来',
         '书上原话：通常，启动按钮与停止按钮是直接连接的');
  } else {
    /* ② 少用触头：左边两条支路各用一对，右边共用一对 */
    [[24, '改前', false, 4], [190, '改后', true, 3]].forEach(function(a){
      const x0 = a[0], okk = a[2];
      pane(g, x0 + 72, 44, okk, a[1] + '　' + a[3] + ' 对触头');
      rails(g, x0, x0 + 144, 62, 156);
      if(!okk){
        /* 两条支路，各自一对 SB ＋ 一对 KM 触点 */
        [[x0 + 40, 'KM1'], [x0 + 104, 'KM2']].forEach(function(b, i){
          const x = b[0];
          seg(g, [[x, 62],[x, 76]], C.wire, 1.6);
          noC(g, x, 88, false, 0.7);
          txt(g, 'SB' + (i+1), x + 12, 88, {sz:7, b:1, c:C.tx3, al:'left'});
          seg(g, [[x, 98],[x, 108]], C.wire, 1.6);
          noC(g, x, 120, false, 0.7);
          txt(g, 'KM' + (i+1) + '-1', x + 12, 120, {sz:7, b:1, c:C.tx3, al:'left'});
          seg(g, [[x, 130],[x, 138]], C.wire, 1.6);
          coil(g, x, 147, false, b[1], '');
          dot(g, x, 62, C.wire, 2.4); dot(g, x, 156, C.wire, 2.4);
        });
      } else {
        /* 共用一对：SB1 在总干上，两条支路只剩线圈 */
        const cx = x0 + 72;
        seg(g, [[cx, 62],[cx, 76]], C.wire, 1.6);
        noC(g, cx, 88, false, 0.7);
        txt(g, 'SB1', cx + 12, 88, {sz:7, b:1, c:C.ok, al:'left'});
        seg(g, [[cx, 98],[cx, 108]], C.wire, 1.6);
        seg(g, [[x0 + 40, 108],[x0 + 104, 108]], C.wire, 1.6);
        dot(g, cx, 108, C.wire, 2.4);
        [[x0 + 40, 'KM1'], [x0 + 104, 'KM2']].forEach(function(b){
          const x = b[0];
          seg(g, [[x, 108],[x, 138]], C.wire, 1.6);
          coil(g, x, 147, false, b[1], '');
          dot(g, x, 156, C.wire, 2.4);
        });
        dot(g, cx, 62, C.wire, 2.4);
      }
    });
    conc(g, 172, 'ok', '功能不变，触头从 4 对减到 3 对',
         '每一对触头都是一个会氧化、会积灰、会接触不良的点');
  }
}
function note1(){
  const k = S1.k;
  $('s1a').textContent = k ? '少用触头' : '少用导线';
  $('s1b').textContent = k ? '4 对' : '4 根';
  $('s1c').textContent = k ? '3 对' : '3 根';
  const T = [
    ['① 少用导线：把「实物上挨着的」在实物上连起来',
     '书上原话：应考虑到各个元器件之间的<b>实际连接和布线</b>，' +
     '<b>特别应注意电气箱、操作台和行程开关之间的连接导线</b>。' +
     '<hr><b>起动按钮和停止按钮在原理图上是两个分开的符号</b>，' +
     '一个在回路上端、一个在下端；<b>可实物上它们装在同一个操作盒里，相距几厘米</b>。' +
     '<hr>在盒子里把它们直接串起来，出线就从 4 根变成 3 根 ——' +
     '<b>省的那一根是从操作盒拉回控制箱的长线</b>，可能有十几米。' +
     '<hr>这一条真正教的是：<b>设计时脑子里要同时有两张图</b>' +
     '（4.5 那节讲的原理图 ↔ 接线图）。' +
     '只看原理图，永远想不到这一步。'],
    ['② 少用触头：不是为了省钱，是为了少一个故障点',
     '书上原话：应<b>减少电气部件的数量，简化电路，提高线路的可靠性</b>；' +
     '为了使控制线路简化，<b>在功能不变的情况下</b>，' +
     '应对控制线路进行整理，<b>尽量减少触头的使用</b>。' +
     '<hr><b>「在功能不变的情况下」是前提</b> —— 不能为了少而砍掉功能。' +
     '图上这个例子：两条支路本来各用一对 SB 触点，' +
     '整理之后<b>共用一对</b>，功能一样但少了一对触头。' +
     '<hr><b>为什么值得为一对触头较劲：每一对触头都会氧化、积灰、接触不良。</b>' +
     '一台设备的控制回路里有二三十对触头，' +
     '<b>它们串在一起，任何一对出问题整条回路就断了</b>。' +
     '<hr>还有半句很实际：<b>尽量采用标准的和同型号的电气设备</b> ——' +
     '同型号意味着<b>备件通用</b>。柜里五只接触器都一样，备两只就够；' +
     '五只各不相同，就得备五只。']
  ][k];
  $('n0').innerHTML = '<div class="st">' + T[0] + '</div>' + T[1];
}

/* ================================================================
   场景 2：③ 动作的合理性
   ================================================================
   左：三个按钮串成一串，KM3 要等三个都动作；右：SB1 一个管三个。
   **按钮按下的顺序用 k 表示**，0 = 都没按，1/2/3 = 已按下几个 */
const S2 = { k:0 };
function draw2(){
  const g = st2.g; st2.clear();
  const k = S2.k;
  EP.heading(g, 14, 20, '③ 动作的合理性', '按了 ' + k + ' 个按钮');

  /* ---- 改前：串成一串 ---- */
  const XA = 26, WA = 140;
  pane(g, XA + WA/2, 44, false, '改前　串成一串');
  rails(g, XA, XA + WA, 62, 186);
  const cx = XA + 56;
  seg(g, [[cx, 62],[cx, 74]], C.wire, 1.6);
  [0,1,2].forEach(function(i){
    const y = 84 + i*36, pressed = k > i;
    btn(g, cx, y, false, pressed, 0.7);
    txt(g, 'SB' + (i+1), cx - 12, y, {sz:7.5, b:1, c: pressed ? C.acc : C.tx3, al:'right'});
    /* 串联链：这个按钮的下端接到下一个按钮的上端；
       中间那个节点再引一条横线到本级的线圈。
       **第一版横线是从触点正中引出去的，电路上讲不通**（截图抓到的）*/
    const on = k > i;
    const ny = y + 14;                 /* 节点 */
    if(i < 2) seg(g, [[cx, y + 10],[cx, y + 26]], C.wire, 1.6);
    else seg(g, [[cx, y + 10],[cx, ny]], C.wire, 1.6);
    dot(g, cx, ny, C.wire, 2.2);
    seg(g, [[cx, ny],[XA + 116, ny]], on ? C.ok : C.tx3, on ? 2 : 1.2);
    coil(g, XA + 116, ny, on, 'KM' + (i+1), '');
    seg(g, [[XA + 116, ny + 9],[XA + 116, 186]], on ? C.ok : C.tx3, on ? 1.8 : 1.2);
    dot(g, XA + 116, 186, C.wire, 2.2);
  });
  dot(g, cx, 62, C.wire, 2.4);
  if(k < 3) EP.chip(g, 'KM3 还没得电', XA + WA/2, 202, {sz:8, b:1, c:C.err});
  else EP.chip(g, '按了三个才全通', XA + WA/2, 202, {sz:8, b:1, c:C.tx3});

  /* ---- 改后：一个管三个 ---- */
  const XB = 196, WB = 140;
  pane(g, XB + WB/2, 44, true, '改后　并联');
  rails(g, XB, XB + WB, 62, 186);
  const bx = XB + WB/2, on1 = k >= 1;
  seg(g, [[bx, 62],[bx, 74]], C.wire, 1.6);
  btn(g, bx, 86, false, on1, 0.7);
  txt(g, 'SB1', bx - 12, 86, {sz:7.5, b:1, c: on1 ? C.acc : C.tx3, al:'right'});
  seg(g, [[bx, 96],[bx, 112]], on1 ? C.ok : C.wire, on1 ? 2 : 1.6);
  seg(g, [[XB + 26, 112],[XB + 114, 112]], on1 ? C.ok : C.wire, on1 ? 2 : 1.6);
  dot(g, bx, 112, C.wire, 2.4);
  [XB + 26, bx, XB + 114].forEach(function(x, i){
    seg(g, [[x, 112],[x, 136]], on1 ? C.ok : C.tx3, on1 ? 1.8 : 1.2);
    coil(g, x, 146, on1, 'KM' + (i+1), '');
    seg(g, [[x, 155],[x, 186]], on1 ? C.ok : C.tx3, on1 ? 1.8 : 1.2);
    dot(g, x, 186, C.wire, 2.2);
  });
  dot(g, bx, 62, C.wire, 2.4);
  EP.chip(g, on1 ? '一下全通' : '按 SB1 试试', XB + WB/2, 202,
          {sz:8, b:1, c: on1 ? C.ok : C.tx3});

  conc(g, 216, k >= 1 ? 'ok' : 'acc',
    k === 0 ? '两种接法，功能一样' : ('改前得电 ' + k + ' / 3　改后得电 3 / 3'),
    k === 0 ? '点「按下 SB1」看差别' :
      (k < 3 ? '书上：KM3 需要等到 SB1、SB2、SB3 相继动作后才可以得电'
             : '书上：当闭合 SB1 时，KM1~KM3 同时得电'));
}
function note2(){
  const k = S2.k;
  $('s2a').textContent = String(k);
  $('s2b').textContent = k + ' / 3';
  $('s2c').textContent = (k >= 1 ? 3 : 0) + ' / 3';
  let h = '<div class="st">③ 尽量保证电气部件动作的合理性</div>';
  if(k === 0){
    h += '两种接法<b>最终效果一样</b>：都能让 KM1、KM2、KM3 得电。' +
      '差别在<b>过程</b> —— 点「按下 SB1」看一眼。' +
      '<hr>书上这一条的原话是：应尽量使电气部件的<b>动作顺序合理化</b>，' +
      '<b>避免经过多个电气部件依次动作后，才可以接通另一个电气部件的情况</b>。';
  } else if(k < 3){
    h += '<b>改前那边只得电 ' + k + ' 个</b>：' +
      'KM' + (k+1) + ' 还在等 SB' + (k+1) + ' 动作。' +
      '<b>改后那边已经三个全得电了</b> —— 一个 SB1 就够。' +
      '<hr><b>串成一串的坏处不只是慢。</b>' +
      '真正要命的是：<b>中间任何一环出问题，后面全废</b>。' +
      'SB2 的触点脏了一点点，KM3 就永远得不了电 ——' +
      '而你查故障时，第一反应会是去看 KM3 自己。' +
      '<hr>并联之后三条支路各走各的：<b>某一条坏了只影响那一条</b>，' +
      '而且一眼就能定位。' +
      '<hr>这跟 8.1 讲配电接线方式时那条<b>「断一根，谁跟着停」</b>' +
      '是同一个思路，只是从配电搬到了控制回路上。';
  } else {
    h += '按满三个，两边都全得电了 —— <b>结果一样，代价不一样。</b>' +
      '<hr>改前那种接法，操作工要<b>按三次</b>，而且顺序不能错；' +
      '改后<b>按一次</b>。' +
      '<hr>更关键的是可靠性：串联那条链上有 <b>3 对按钮触头 ＋ 2 对中间连线</b>，' +
      '任何一处接触不良整条就断；并联的三条支路<b>互不影响</b>。' +
      '<hr>书上两条注写得很直接：改前是' +
      '<b>「KM3 线圈需要等到 SB1、SB2、SB3 相继动作后才可以得电」</b>，' +
      '改后是<b>「当闭合 SB1 时，KM1~KM3 同时得电」</b>。';
  }
  $('n1').innerHTML = h;
}

/* ================================================================
   场景 3：④ 触头的接法　⑤ 线圈的接法
   ================================================================
   这两条错了会短路、会烧线圈，所以「改前」那半边要用 err 色标出来 */
const S3 = { k:0 };
function draw3(){
  const g = st3.g; st3.clear();
  const k = S3.k;
  EP.heading(g, 14, 20, k ? '⑤ 线圈的接法' : '④ 触头的接法',
             k ? '串联 ⇒ 每个只分到一半电压' : '触头位置很远的那种器件');

  if(k === 0){
    /* ④ 触头接法：同一个行程开关的两对触头 */
    [[24, '改前　两对触头分接两侧', false], [190, '改后　触头在上、线圈在下', true]].forEach(function(a){
      const x0 = a[0], okk = a[2];
      pane(g, x0 + 72, 44, okk, a[1]);
      rails(g, x0, x0 + 144, 64, 178);
      if(!okk){
        /* 错：一对触头接上母线、另一对接下母线，中间夹着两个线圈 */
        const xa = x0 + 42, xb = x0 + 104;
        seg(g, [[xa, 64],[xa, 78]], C.wire, 1.6);
        noC(g, xa, 90, false, 0.7);
        txt(g, 'SQ-1', xa - 11, 90, {sz:7, b:1, c:C.tx3, al:'right'});
        seg(g, [[xa, 100],[xa, 112]], C.wire, 1.6);
        coil(g, xa, 122, false, 'KM1', '');
        seg(g, [[xa, 131],[xa, 178]], C.wire, 1.6);
        seg(g, [[xb, 64],[xb, 112]], C.wire, 1.6);
        coil(g, xb, 122, false, 'KM2', '');
        seg(g, [[xb, 131],[xb, 142]], C.wire, 1.6);
        noC(g, xb, 154, false, 0.7);
        txt(g, 'SQ-2', xb + 11, 154, {sz:7, b:1, c:C.tx3, al:'left'});
        seg(g, [[xb, 164],[xb, 178]], C.wire, 1.6);
        /* 两对触头之间那段线跨在电源两端 */
        g.save(); g.setLineDash([4,3]); g.strokeStyle = C.err; g.lineWidth = 1.6;
        g.beginPath(); g.moveTo(xa + 8, 90); g.lineTo(xb - 8, 154); g.stroke(); g.restore();
        /* chip 放中间会压住 KM1 的框，改成左下角空地一行小字 */
        txt(g, '虚线：同一个器件的两对触头', x0 + 4, 172, {sz:7, c:C.err, al:'left'});
        dot(g, xa, 64, C.wire, 2.2); dot(g, xb, 64, C.wire, 2.2);
        dot(g, xa, 178, C.wire, 2.2); dot(g, xb, 178, C.wire, 2.2);
      } else {
        /* 对：两对触头都在上侧，两个线圈都在下侧 */
        const xa = x0 + 42, xb = x0 + 104;
        [[xa, 'XK-1', 'KM1'], [xb, 'XK-2', 'KM2']].forEach(function(b){
          const x = b[0];
          seg(g, [[x, 64],[x, 78]], C.wire, 1.6);
          noC(g, x, 90, false, 0.7);
          txt(g, b[1], x + 11, 90, {sz:7, b:1, c:C.ok, al:'left'});
          seg(g, [[x, 100],[x, 122]], C.wire, 1.6);
          coil(g, x, 132, false, b[2], '');
          seg(g, [[x, 141],[x, 178]], C.wire, 1.6);
          dot(g, x, 64, C.wire, 2.2); dot(g, x, 178, C.wire, 2.2);
        });
        txt(g, '触头都在上侧、线圈都在下侧', x0 + 4, 172, {sz:7, c:C.ok, al:'left'});
      }
    });
    conc(g, 196, 'err', '触头断开时的电弧会把电源两端连通',
         '书上：以免由于触头断开时产生的电弧造成电源短路的现象');
  } else {
    /* ⑤ 线圈接法：串联 vs 并联 */
    [[24, '改前　串联', false], [190, '改后　并联', true]].forEach(function(a){
      const x0 = a[0], okk = a[2];
      pane(g, x0 + 72, 44, okk, a[1]);
      rails(g, x0, x0 + 144, 64, 178);
      const cx = x0 + 72;
      seg(g, [[cx, 64],[cx, 76]], C.wire, 1.6);
      noC(g, cx, 88, false, 0.7);
      txt(g, 'SB1', cx - 11, 88, {sz:7, b:1, c:C.tx3, al:'right'});
      dot(g, cx, 64, C.wire, 2.2);
      if(!okk){
        seg(g, [[cx, 98],[cx, 108]], C.wire, 1.6);
        coil(g, cx, 118, false, 'KM1', '');
        seg(g, [[cx, 127],[cx, 138]], C.wire, 1.6);
        coil(g, cx, 148, false, 'KM2', '');
        seg(g, [[cx, 157],[cx, 178]], C.wire, 1.6);
        dot(g, cx, 178, C.wire, 2.2);
        EP.chip(g, '各分到 190 V', cx, 133, {sz:7.5, b:1, c:C.err});
      } else {
        seg(g, [[cx, 98],[cx, 116]], C.wire, 1.6);
        seg(g, [[x0 + 40, 116],[x0 + 104, 116]], C.wire, 1.6);
        dot(g, cx, 116, C.wire, 2.4);
        [[x0 + 40, 'KM1'], [x0 + 104, 'KM2']].forEach(function(b){
          const x = b[0];
          seg(g, [[x, 116],[x, 134]], C.wire, 1.6);
          coil(g, x, 144, false, b[1], '');
          seg(g, [[x, 153],[x, 178]], C.wire, 1.6);
          dot(g, x, 178, C.wire, 2.2);
        });
        EP.chip(g, '各拿到 380 V', cx, 168, {sz:7.5, b:1, c:C.ok});
      }
    });
    conc(g, 196, 'err', '串联：一个断路，两个都不工作',
         '书上：而且会使工作电流不足，引起故障');
  }
}
function note3(){
  const k = S3.k;
  $('s3a').textContent = k ? '线圈接法' : '触头接法';
  $('s3b').textContent = k ? '都吸不动' : '电源短路';
  $('s3c').textContent = k ? '并联' : '线圈同侧';
  const T = [
    ['④ 所有线圈挂同一侧，所有控制触头挂另一侧',
     '书上原话：有些电气部件<b>同时具有常开和常闭触头，且触头位置很远</b>。' +
     '在连接该类部件时，应将<b>共用电源的所有接触器、继电器及执行部件的线圈端' +
     '均接电源一侧，控制触头接电源另一侧</b>，' +
     '以免由于<b>触头断开时产生的电弧造成电源短路</b>的现象。' +
     '<hr><b>「触头位置很远」是这一条的前提。</b>' +
     '行程开关那种器件，两对触头长在同一个开关体上，' +
     '但接回控制箱可能隔着好几米线。' +
     '<hr><b>接错了会怎样</b>（左边那张图）：一对触头接在上母线一侧、' +
     '另一对接在下母线一侧 —— 于是<b>两对触头之间那段线正好跨在电源两端</b>。' +
     '触头断开的一瞬间会拉出电弧，<b>电弧是导电的</b>，' +
     '两边一搭就是一次<b>电源短路</b>。' +
     '<hr>正确接法一句话记住：<b>线圈都在一侧，控制触头都在另一侧。</b>'],
    ['⑤ 两个线圈要并联，不能串联',
     '书上原话：<b>若两个交流接触器的线圈串联在电路中，' +
     '则一个接触器断路，两个接触器均不能工作，' +
     '而且会使工作电流不足，引起故障</b>。' +
     '图 9-10 的注：<b>将两个串联的线圈改为并联，使每个线圈承受额定电压。</b>' +
     '<hr><b>两个 380V 的线圈串在 380V 上，每个只分到约 190V。</b>' +
     '后果是两个都吸不动 —— 或者更糟：<b>吸合了但压不紧</b>，' +
     '触点接触电阻大、发热、嗡嗡响，用不了多久就烧。' +
     '这就是书上说的「工作电流不足，引起故障」。' +
     '<hr><b>还有一条更隐蔽的：串联意味着一个断路，两个都停。</b>' +
     '查故障时你会看到「两个接触器同时坏了」这种极不合理的现象，' +
     '而真相是其中一个断了、把另一个也拖下水。' +
     '<hr>并联之后各走各的，<b>每个线圈都拿到额定电压</b>，' +
     '而且一个坏了另一个照常工作 —— 这跟屏 2 那条「并联比串联可靠」是同一个道理。']
  ][k];
  $('n2').innerHTML = '<div class="st bad">' + T[0] + '</div>' + T[1];
}

/* ================================================================
   场景 4：⑥ 保护措施
   ================================================================
   六种保护画成一排卡片，选中的那个在下面画出「它在 9.1 那张图上是谁」 */
const S4 = { k:0 };
const PROT = [
  {n:'短路', dev:'熔断器 FU', fast:'毫秒级',
   where:'主电路 FU1~FU3　控制回路 FU4、FU5',
   d:'两根线直接碰上了，电流瞬间几百上千安。<b>只有熔断器（或断路器的电磁脱扣）快得过它</b> ——' +
     '熔体在几毫秒内熔断。' +
     '<hr>2.3 讲热继电器时那条线索在这儿再用一次：' +
     '<b>短路靠磁（或熔断）、过载靠热，两种保护的响应时间差了几千倍。</b>' +
     '<hr>9.1 那张图上主电路三只 FU1~FU3、控制回路两只 FU4、FU5，' +
     '<b>分开装是因为额定值差太多</b>（9.1 屏 2 讲过）。'},
  {n:'过载', dev:'热继电器 FR', fast:'几分钟',
   where:'主电路热元件 FR　控制回路触点 FR-1',
   d:'电流没到短路那么大，但持续超过额定值 —— 比如皮带太紧、轴承卡住、负载加大了。' +
     '<b>这种情况熔断器不会动</b>（它的额定值要留出启动电流的余量），' +
     '得靠热继电器。' +
     '<hr>2.3 那节给过它的动作曲线：<b>1.05 倍永不动作、1.2 倍约 5 分钟、' +
     '1.5 倍约 1.8 分钟</b>。慢是故意的 —— 电动机短时过载是正常的，' +
     '真过热才需要停。' +
     '<hr>它的执行方式很特别：<b>热元件在主电路里感受电流，' +
     '真正切断的是控制回路里那对 FR-1 触点</b>。'},
  {n:'失电压', dev:'自锁触点 KM-2', fast:'瞬间',
   where:'控制回路　并在起动按钮两端',
   d:'停电了，来电之后设备<b>不应该自己转起来</b>。' +
     '<hr><b>这个保护是白送的 —— 自锁的副产品。</b>' +
     '停电时 KM 线圈失电、KM-2 跟着断开；来电之后线圈还是没电（SB1 没人按），' +
     '所以<b>必须有人再按一次起动按钮</b>。' +
     '<hr>想象一下车间里几十台设备在来电瞬间同时启动 ——' +
     '<b>正在检修的人、手边的工件、电网本身，都受不了。</b>' +
     '这就是 2.2 讲接触器时说的「失压保护」，也是接触器比刀开关高一级的地方。'},
  {n:'漏电', dev:'漏电保护开关', short:'漏保', fast:'0.1 秒内',
   where:'上一级配电箱　（不在控制箱里）',
   d:'设备外壳带电、人碰上去 —— 这时候主电路的电流并没有异常' +
     '（漏走的那点电流跟额定值比微不足道），<b>熔断器和热继电器都不会动</b>。' +
     '<hr>漏电保护器测的是<b>进去的电流和回来的电流差了多少</b>' +
     '（3.7 讲钳形表时那个零序电流互感器）。' +
     '<hr>整定值 8.1 屏 2 讲过：<b>保人用 30 mA，保线路用 300 mA 以上</b>。' +
     '<b>8.2 屏 2 讲的 N 和 PE 混接，会让这个保护彻底失效</b> ——' +
     '而且从表面上完全看不出来。'},
  {n:'联锁', dev:'互锁触点', fast:'瞬间',
   where:'控制回路　两个接触器互串对方的动断触点',
   d:'两个动作<b>绝对不能同时发生</b>时用它。最典型的是<b>正转和反转</b>：' +
     '两个接触器要是同时吸合，<b>主电路上就是相间短路</b>。' +
     '<hr>做法：在正转接触器的线圈回路里<b>串一对反转接触器的动断触点</b>，' +
     '反过来也一样。<b>一个吸合了，另一个就被物理上锁死</b>。' +
     '<hr>书上这一节只列了名字，<b>具体电路要到第 11 章</b>' +
     '（正反转控制）才展开 —— 那一章是这一章的直接下游。'},
  {n:'行程', dev:'行程开关 SQ', fast:'瞬间',
   where:'装在机械行程的终点上',
   d:'运动部件走到头了要自动停 —— 行车、闸门、机床工作台都用它。' +
     '<b>它是唯一一个「装在机械上而不是柜里」的保护</b>。' +
     '<hr>2.4 讲传感器那节提过接近开关，行程开关是它的机械版：' +
     '<b>靠部件撞上去把触点顶开</b>。' +
     '<hr>这一条和 ④ 那条（触头的接法）连着：' +
     '书上说<b>「特别应注意电气箱、操作台和行程开关之间的连接导线」</b>，' +
     '正因为行程开关<b>装得远、触头位置分散</b>，最容易接出问题。'}
];
function draw4(){
  const g = st4.g; st4.clear();
  const p = PROT[S4.k];
  EP.heading(g, 14, 20, '⑥ 保护措施', '书上列了七种，这儿挑六种常用的');

  /* 六张小卡排两行 */
  PROT.forEach(function(a, i){
    const cx = 66 + (i % 3) * 114, cy = 62 + Math.floor(i / 3) * 56;
    const on = i === S4.k;
    box(g, cx - 52, cy - 20, 104, 40, 6,
        on ? C.accbg : C.box, on ? C.acc : C.boxLine, on ? 1.8 : 1.2);
    txt(g, a.n, cx, cy - 6, {sz:10, b:1, c: on ? C.acc : C.tx2});
    txt(g, a.dev, cx, cy + 9, {sz:8, c: on ? C.tx2 : C.tx3});
  });

  /* 选中的那一种：画它在回路里的位置 */
  const yy = 186;
  box(g, 20, yy - 18, 320, 62, 6, C.box, C.boxLine, 1.2);
  txt(g, '装在哪', 180, yy - 2, {sz:8.5, c:C.tx3});
  txt(g, p.where, 180, yy + 15, {sz:9.5, b:1, c:C.acc});
  txt(g, '反应速度　' + p.fast, 180, yy + 32, {sz:8.5, c:C.tx3});

  conc(g, 258, 'ok', p.n + '保护　靠 ' + p.dev, '书上：必要时还可设置相应的指示信号');
}
function note4(){
  const p = PROT[S4.k];
  $('s4a').textContent = p.n;
  $('s4b').textContent = p.short || p.dev.split(' ')[0];
  $('s4c').textContent = p.fast;
  $('n3').innerHTML = '<div class="st">' + p.n + '保护　·　' + p.dev + '</div>' + p.d;
}

/* ================================================================
   舞台、事件、收尾
   ================================================================ */
const st1 = new Stage('cv0', 360, 216);
const st2 = new Stage('cv1', 360, 260);
const st3 = new Stage('cv2', 360, 240);
const st4 = new Stage('cv3', 360, 302);

['s1k','s2k','s3k'].forEach(function(id, n){
  document.getElementById(id).addEventListener('click', function(e){
    const b = e.target.closest('.btn'); if(!b) return;
    const v = +b.dataset.k;
    [S1, S2, S3][n].k = v;
    document.querySelectorAll('#' + id + ' .btn').forEach(function(x){
      x.classList.toggle('on', +x.dataset.k === v);
    });
    [note1, note2, note3][n]();
    [draw1, draw2, draw3][n]();
  });
});
/* 屏 4 没有按钮组 —— 六张卡直接画在画布上点（六个按钮在 390 宽下会换行）*/
st4.cv.addEventListener('click', function(ev){
  const p = st4.pick(ev);
  PROT.forEach(function(a, i){
    const cx = 66 + (i % 3) * 114, cy = 62 + Math.floor(i / 3) * 56;
    if(Math.abs(p[0] - cx) < 54 && Math.abs(p[1] - cy) < 22) S4.k = i;
  });
  note4(); draw4();
});

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会重设尺寸并清空。**四屏全是静态的，必须在这儿逐个补画** */
  draw1(); draw2(); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:9, sec:'9.2'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('9.2');
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
