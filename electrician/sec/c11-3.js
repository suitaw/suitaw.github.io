/* 11.3 电动机串电阻减压起动 —— 本节内容的唯一真相。
   对应《零基础学电工》第 11 章 11.3 节（书内 P202~P204）。

   四屏：① 起动电流有多大 ② 串电阻怎么降的 ③ 电路怎么自动切换 ④ 延时设多久

   **这一节是第 11 章的第一节**，因为 11.1、11.2 判为不做（读完 P196~P201 之后判的）：
   图 11-3 的结构组成和 9.1 讲的图 9-2 是同一张图、图 11-4 接线图是 4.5 讲的事、
   自锁 4.4 讲过、两个指示灯 9.1 讲过。11.2 唯一的新东西「单相起动电容」并进 11.6。

   书上的原文（别凭记忆改）：
   - 11.3.1 开头：「电动机串电阻减压启动控制电路是指在电动机定子电路中串入电阻器，
     起动时，利用串入的电阻器起到**降压、限流**的作用，当电动机起动完毕后，
     **再通过电路将串联的电阻短接**，使电动机进入全压正常运行状态。」
   - 图 11-7 的器件（照录）：**QS 电源总开关**、**SB1 起动按钮**、**SB2 停止按钮**、
     **KM1／KM2 交流接触器**、**KT 时间继电器**、**FU1~FU3 熔断器**（另有 FU4、FU5）、
     **R1~R3 电阻器**、**FR 过热保护继电器**、三相交流电动机
   - 图 11-9 的工作过程（照录七步）：
     ① 合上电源总开关 QS，接通三相电源。
     ② 按下起动按钮 SB1，常开触头闭合。
     ③ 交流接触器 KM1 线圈得电，时间继电器 KT 线圈得电。
        ③-1 常开辅助触头 KM1-2 闭合，实现自锁功能。
        ③-2 常开主触头 KM1-1 闭合，电源经电阻器 R1、R2、R3 为三相交流电动机 M 供电，
             三相交流电动机减压起动。
     ④ 当时间继电器 KT 达到预定的延时时间后，常开触头 KT-1 延时闭合。
     ⑤ 交流接触器 KM2 线圈得电，常开主触头 KM2-1 闭合，**短接电阻器 R1、R2、R3**，
        三相交流电动机在全压状态下运行。
     ⑥ 当需要三相交流电动机停机时，按下停止按钮 SB2，交流接触器 KM1、KM2 和
        时间继电器 KT 线圈均失电，触头全部复位。
     ⑦ KM1、KM2 的常开主触头 KM1-1、KM2-1 复位断开，切断三相交流电动机供电电源，
        三相交流电动机停止运转。

   **书上没给、我补的（文案里全部标了口径）**：
   - **起动电流是额定的 4~7 倍** —— 通行数据，书上这一节只写了「降压、限流」四个字，
     没给倍数。文案里注明「这是通行说法，书上没写死」
   - 例机取 **7.5 kW / 380 V / Y 接**，额定电流 **15 A**，相电压 **220 V**，
     直接起动按 **6 倍 = 90 A** 算。堵转等效阻抗 Z = 220 ÷ 90 = **2.44 Ω**
   - **串电阻按纯电阻近似算**（I = 220 ÷ (R + 2.44)）。真实电动机起动时是感性负载，
     阻抗要按矢量相加，**实际降压效果比这样算出来的小一些** ——
     这也正是现场串电阻起动用得比星三角少的原因之一。文案里说了这一条
   - **转矩正比于电压的平方**（这条是硬的，2.7 节讲星三角时用过同一条）：
     电压降到 50%，电流降到 50%，**转矩只剩 25%**。这是本节屏 2 的眼
   - 直接起动转矩按 **额定转矩的 2 倍** 算（通行 1.5~2.2 倍），负载转矩按 0.6 倍额定
   - 起动/切换曲线是**示意曲线**：I(t) = In + (I0 − In)·f(t)，f(t) = 1/(1+(t/T0)^4)，
     直接起动 T0 = 2.2 s，串电阻起动 T0 = 2.6 s，转速 n(t) = 1 − f(t)。
     切换发生在 t = TSW，之后 I = In + (I0−In)·f(TSW)·h(t−TSW)，h(u) = 1/(1+(u/1.3)^4)。
     画布上写明了是示意曲线、真实形状取决于负载
   - 屏 4 的电阻发热是**数值积分真算的**（Q = ∫3I²R dt，步长 0.05 s），
     显示成「相对 6 秒那一档的倍数」。**具体允许通电时间看电阻器铭牌**，书上没给 */
(function(){
'use strict';
ELEC.reg({
  id: '11.3',
  file: 'c11-3.html',
  title: '11.3 串电阻减压起动',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>电流有多大</button>
    <button class="tab" data-i="1"><span class="n">2</span>串电阻怎么降</button>
    <button class="tab" data-i="2"><span class="n">3</span>怎么自动切换</button>
    <button class="tab" data-i="3"><span class="n">4</span>延时设多久</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">起动那一下，电流是平时的好几倍</div>
    电动机刚合闸的一瞬间，转子还没转，绕组里几乎不产生反电动势 ——
    这时候它对电网来说就是一团<b>很小的阻抗</b>，电流会冲到额定的<b>好几倍</b>。
    等它转起来，电流自己就掉下去了。<b>问题不在「大」，在「大的这几秒」。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">直接起动</button>
        <button class="btn sm" data-k="1">串电阻起动</button>
        <button class="btn sm" data-k="2">▶ 再放一遍</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这一刻</div><div class="v" id="s1a">0.0 s</div></div>
        <div class="num hi"><div class="k">电流</div><div class="v" id="s1b">90 A</div></div>
        <div class="num"><div class="k">转速</div><div class="v" id="s1c">0 %</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">这台例机（后面三屏都用它）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>项</th><th>值</th><th>怎么来的</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">功率</td><td>7.5 kW</td><td>380 V 三相，Y 接</td></tr>
        <tr><td class="eu-s">额定电流</td><td>15 A</td><td>铭牌上写着（2.7 节读过铭牌）</td></tr>
        <tr><td class="eu-s">起动电流</td><td>90 A</td><td>额定的 <b>6 倍</b></td></tr>
        <tr><td class="eu-s">相电压</td><td>220 V</td><td>Y 接：380 ÷ √3</td></tr>
      </tbody>
    </table></div>
    <div class="tip info"><b>4~7 倍这个范围是通行说法，书上这一节没写死。</b>
      书上只写了串电阻起“<b>降压、限流</b>”的作用这四个字。
      具体倍数看电动机的型号和设计，铭牌上有的会直接标出起动电流比。</div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">起动电流大，坏在哪儿</div>
    <table class="eu-t"><tbody>
      <tr><td class="eu-s">电网被拉垮</td><td>同一台变压器上的其他设备电压跟着掉 ——
        灯闪一下、别的电动机转矩下降甚至停转</td></tr>
      <tr><td class="eu-s">保护误动作</td><td>断路器、熔断器要是按额定电流选的，
        起动这一下就跳了（<b>8.3 讲过：电动机回路的保护要按起动电流选</b>）</td></tr>
      <tr><td class="eu-s">机械冲击</td><td>转矩也跟着冲，皮带、联轴器、齿轮箱都要受一下</td></tr>
    </tbody></table>
    <div class="tip">所以功率大到一定程度的电动机不许直接起动，必须<b>先把电压压下来</b>。
      压电压有三条路：<b>串电阻</b>（这一节）、<b>星三角</b>（下一节）、自耦变压器。</div>
  </div>
</section>

<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">串一个电阻进去，电压就分掉一部分</div>
    这就是 1.4 讲的<b>串联分压</b>，没有新东西：电阻和电动机串在一起，
    电源那 220 V 被两个人分。<b>拖下面的滑杆改电阻</b>，看三个数一起动。
    重点看第三个 —— 它掉得最快。
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="rowlab">串进去的电阻　<b id="s2lab">1.0 Ω</b>（每相）</div>
      <input type="range" id="s2r" min="0" max="25" step="1" value="10">
      <div class="nums three">
        <div class="num"><div class="k">起动电流</div><div class="v" id="s2a">64 A</div></div>
        <div class="num"><div class="k">电动机端压</div><div class="v" id="s2b">156 V</div></div>
        <div class="num hi"><div class="k">起动转矩</div><div class="v" id="s2c">1.0 倍</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="bet" data-bet="e113-t" data-q="电压降到一半，起动转矩会变成原来的多少？"
    data-opts="一半|四分之一|还是一样" data-right="1"
    data-after="四分之一。转矩正比于电压的平方 —— 电压 ×0.5，转矩 ×0.25。这是减压起动全部代价的来源。"></div>

  <div data-bet-for="e113-t">
    <div class="note" style="margin-top:10px">
      <div class="st bad">代价：转矩掉得比电流快</div>
      <div class="eu-tw"><table class="eu-t">
        <thead><tr><th>电动机端压</th><th>起动电流</th><th>起动转矩</th></tr></thead>
        <tbody>
          <tr><td class="eu-s">100 %（直接）</td><td>100 %（90 A）</td><td>100 %（2.0 倍额定）</td></tr>
          <tr><td class="eu-s">80 %</td><td>80 %</td><td><b>64 %</b></td></tr>
          <tr><td class="eu-s">70 %</td><td>70 %</td><td><b>49 %</b></td></tr>
          <tr><td class="eu-s">50 %</td><td>50 %</td><td><b>25 %</b>（0.5 倍额定）</td></tr>
        </tbody>
      </table></div>
      <div class="tip"><b>所有减压起动方式都吃这一条</b>，不是串电阻特有的：
        只要把电压压下去，转矩就按平方掉。所以减压起动<b>只能轻载或空载起动</b> ——
        起动转矩必须大过负载转矩，不然通上电它根本不动，就在那儿嗡嗡响（<b>9.4 讲过那个声音</b>）。</div>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">这三个数是怎么算的</div>
    <div id="fml1"></div>
    <div class="tip info"><b>这里按纯电阻近似算，说明一下口径。</b>
      真实电动机起动时是<b>感性负载</b>，串进去的电阻和它的阻抗要按矢量相加，
      不是简单相减 —— 所以<b>实际降压效果比这样算出来的还要小一些</b>。
      这也正是现场串电阻起动用得比星三角少的原因之一：<b>电阻要串得很大才压得下来，
      而电阻本身还要发热耗电。</b></div>
  </div>
</section>

<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">谁来决定「什么时候把电阻短接掉」</div>
    <b>时间继电器 KT。</b>这是这一节全部的机关：起动时 KM1 和 KT <b>同时</b>得电，
    KT 开始数秒；数到了，它的延时触点 KT-1 闭合，让 KM2 得电，
    KM2 的主触头<b>把三个电阻短接掉</b>，电动机进入全压运行。
    <b>点「起动」看整个过程。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn sm" data-k="go">起动 SB1</button>
        <button class="btn sm" data-k="stop">停止 SB2</button>
      </div>
      <div class="nums three">
        <div class="num hi"><div class="k">现在</div><div class="v" id="s3a">停着</div></div>
        <div class="num"><div class="k">KT 还差</div><div class="v" id="s3b">—</div></div>
        <div class="num"><div class="k">三个电阻</div><div class="v" id="s3c">串着</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">书上那七步（图 11-9，照录）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>步</th><th>书上原话</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">①</td><td>合上电源总开关 QS，接通三相电源</td></tr>
        <tr><td class="eu-s">②</td><td>按下起动按钮 SB1，常开触头闭合</td></tr>
        <tr><td class="eu-s">③</td><td>交流接触器 <b>KM1</b> 线圈得电，时间继电器 <b>KT</b> 线圈得电<br>
          　③-1 常开辅助触头 KM1-2 闭合，<b>实现自锁</b><br>
          　③-2 常开主触头 KM1-1 闭合，电源<b>经 R1、R2、R3</b> 供电，减压起动</td></tr>
        <tr><td class="eu-s">④</td><td>当 KT 达到预定的延时时间后，常开触头 <b>KT-1 延时闭合</b></td></tr>
        <tr><td class="eu-s">⑤</td><td>KM2 线圈得电，主触头 KM2-1 闭合，<b>短接 R1、R2、R3</b>，全压运行</td></tr>
        <tr><td class="eu-s">⑥</td><td>按下 SB2，KM1、KM2、KT 线圈<b>均失电</b>，触头全部复位</td></tr>
        <tr><td class="eu-s">⑦</td><td>KM1-1、KM2-1 复位断开，切断供电电源，电动机停转</td></tr>
      </tbody>
    </table></div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st good">三个「同时」，是读这张图的关键</div>
    <table class="eu-t"><tbody>
      <tr><td class="eu-s">KM1 和 KT<br>同时得电</td>
        <td>它们并联在同一个节点上。<b>按下 SB1 的那一刻，起动和计时一起开始</b> ——
          KT 数的就是「起动用了多久」</td></tr>
      <tr><td class="eu-s">KM2 得电后<br>KM1 不断</td>
        <td>KM1 一直吸着（它的主触头是电动机的供电通路）。
          <b>KM2 只是并联上去把电阻短接掉</b>，不是接替 KM1</td></tr>
      <tr><td class="eu-s">SB2 一按<br>三个全松</td>
        <td>KM1、KM2、KT 都挂在自锁那条支路下面，
          <b>把它断了三个一起失电</b>，下一次起动又从头来（KT 重新计时）</td></tr>
    </tbody></table>
    <div class="tip info"><b>和 11.4 星三角的最大区别就在第二行。</b>
      星三角是 KMY 和 KM△ <b>互相顶替</b>（一个断了另一个才能通，绝不能同时吸合）；
      这里的 KM1 和 KM2 是<b>叠加</b>，本来就该同时吸着。别把两张图记混。</div>
  </div>
</section>

<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">KT 该设几秒</div>
    书上只说「达到预定的延时时间」，<b>预定多少没说</b> —— 那是装的人按机器定的。
    设短了等于白减压，设长了把电阻烧了。<b>点三个档看两个后果。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn sm" data-k="0">2 秒</button>
        <button class="btn on sm" data-k="1">6 秒</button>
        <button class="btn sm" data-k="2">20 秒</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">延时设定</div><div class="v" id="s4a">6 秒</div></div>
        <div class="num hi"><div class="k">切换冲击</div><div class="v" id="s4b">1.2 倍</div></div>
        <div class="num"><div class="k">电阻发热</div><div class="v" id="s4c">1.0 倍</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">判据一句话</div>
    <div class="tip"><b>延时要设在「电动机差不多转起来了」那一刻。</b>
      现场做法是：先估一个（一般几秒），起动时拿钳形表看电流 ——
      <b>切换那一下电流几乎不跳，就说明设对了</b>（3.7 节的钳形表正好用在这儿：
      不用停机、不用拆线，套住一根主电路导线就能看）。</div>
    <div class="tip info"><b>起动电阻是「短时工作制」的</b>：它就是拿来烧那几秒的，
      不能长时间通电。<b>具体允许通电多久看电阻器铭牌，书上没给这个数</b> ——
      上面那个「发热倍数」是拿这一节的模型算出来的相对值，用来看趋势，不是绝对值。</div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">现场最容易出的两个故障，都在这一节里</div>
    <table class="eu-t"><tbody>
      <tr><td class="eu-s">电阻烧了</td>
        <td>KM2 没吸合（线圈坏、KT-1 触点接触不良、KT 本身坏），电阻<b>一直串着</b>。
          现象：电动机转是转，但<b>没劲、转速偏低</b>，过一会儿电阻那儿冒烟。
          <b>量一下 KM2 线圈两端有没有电压</b>，就知道是 KT 侧还是 KM2 侧的问题（5.3 那一套）</td></tr>
      <tr><td class="eu-s">起动就跳闸</td>
        <td>延时设太短，切换那一下电流又冲到四五倍，把上级断路器带跳了。
          <b>这个最容易误判成「电动机坏了」</b>，其实只要把 KT 往长了调几秒就好</td></tr>
    </tbody></table>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">串电阻和另外两种减压起动，摆一起看</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>方式</th><th>怎么降的</th><th>代价</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">串电阻</td><td>电阻分掉一部分电压</td>
          <td>电阻要<b>发热耗电</b>，个头大；降压效果还打折扣</td></tr>
        <tr><td class="eu-s">星三角<br>（下一节）</td><td>把绕组从 △ 改接成 Y，每相电压 380 → 220</td>
          <td>只能用在<b>正常运行时是 △ 接</b>的电动机上；电压固定降到 58%，不可调</td></tr>
        <tr><td class="eu-s">自耦变压器</td><td>用变压器抽头把电压降下来（2.6 节那个自耦）</td>
          <td>贵、重；<b>没有安全隔离</b>（2.6 节讲过）</td></tr>
      </tbody>
    </table></div>
    <div class="tip info"><b>现场最常见的是星三角</b>，因为它不额外耗电、不用装大电阻，
      而且很多电动机本来就是 △ 接运行的，改一改接线就能做。<b>下一节整节讲它。</b></div>
  </div>

  <div class="quiz" data-quiz="11.3">
    <div class="qz" data-q="三相异步电动机直接起动时，起动电流大约是额定电流的几倍？"
      data-opts="1~2 倍|4~7 倍|20 倍以上" data-right="1"
      data-why="通行说法是 4~7 倍（本节例机按 6 倍算）。书上这一节只写了串电阻起「降压、限流」的作用，没写死倍数。记住量级就够了：起动那几秒电流是平时的好几倍，所以电动机回路的保护不能按额定电流选。"></div>
    <div class="qz" data-q="串入电阻后电动机端电压降到 50%，起动转矩变成原来的多少？"
      data-opts="50%|25%|75%" data-right="1"
      data-why="25%。转矩正比于电压的平方，0.5 的平方是 0.25。这是所有减压起动方式共同的代价，不是串电阻特有的 —— 也正因为如此，减压起动只能轻载或空载起动。"></div>
    <div class="qz" data-q="起动完成后，为什么一定要把 R1~R3 短接掉？"
      data-opts="省电|电阻会烧，而且电动机达不到额定转矩和转速|让接触器有事干" data-right="1"
      data-why="两条都要。起动电阻是短时工作制的，长时间通电会发热烧毁；而且电阻一直串着，电动机端电压永远上不去，转矩和转速都到不了额定值 —— 现象就是「转是转，但没劲」。"></div>
    <div class="qz" data-q="KT 的延时设得太短，会出现什么现象？"
      data-opts="电动机起不来|切换那一下电流又冲到好几倍，可能把上级断路器带跳|电阻会更凉快" data-right="1"
      data-why="电动机还没转起来就被切到全压，等于直接起动，冲击照旧。这个最容易被误判成「电动机坏了」，其实只要把 KT 往长了调几秒。判据是拿钳形表看：切换那一下电流几乎不跳，就说明设对了。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 11 章 11.3 节（书内 P202~P204）</div>
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

/* ---------- 小工具（几节课共用的那一套，照 9.1 抄） ---------- */
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

/* ---------- 控制图零件（和 9.1 同一套，触点画的是未操作状态） ---------- */
function noC(g, x, y, on, s){
  s = s || 1;
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.6; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x, y - 14*s); g.lineTo(x, y - 8*s); g.stroke();
  g.beginPath(); g.moveTo(x, y + 8*s); g.lineTo(x, y + 14*s); g.stroke();
  g.beginPath(); g.moveTo(x, y - 8*s);
  if(on) g.lineTo(x, y + 8*s); else g.lineTo(x + 9*s, y + 7*s);
  g.stroke(); g.restore();
  dot(g, x, y - 8*s, P.ink, 1.8); dot(g, x, y + 8*s, P.ink, 1.8);
}
function ncC(g, x, y, on, s){
  s = s || 1;
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.6; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x, y - 14*s); g.lineTo(x, y - 8*s); g.stroke();
  g.beginPath(); g.moveTo(x, y + 8*s); g.lineTo(x, y + 14*s); g.stroke();
  g.beginPath(); g.moveTo(x - 7*s, y + 8*s); g.lineTo(x + 11*s, y + 8*s); g.stroke();
  g.beginPath(); g.moveTo(x, y - 8*s);
  if(on) g.lineTo(x + 9*s, y + 7*s); else g.lineTo(x, y + 8*s);
  g.stroke(); g.restore();
  dot(g, x, y - 8*s, P.ink, 1.8);
}
function btn(g, x, y, nc, pressed){
  if(nc) ncC(g, x, y, pressed); else noC(g, x, y, pressed);
  g.save(); g.setLineDash([2.5,2.5]); g.strokeStyle = P.ink; g.lineWidth = 1;
  g.beginPath(); g.moveTo(x + 4, y); g.lineTo(x + 22, y); g.stroke(); g.restore();
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.8; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x + 22, y - 6); g.lineTo(x + 22, y + 6); g.stroke(); g.restore();
}
function coil(g, x, y, live, label){
  box(g, x - 15, y - 11, 30, 22, 2, live ? C.accbg : C.card,
      live ? C.acc : P.ink, live ? 1.8 : 1.4);
  seg(g, [[x, y - 20],[x, y - 11]], C.wire, 1.8);
  seg(g, [[x, y + 11],[x, y + 20]], C.wire, 1.8);
  if(label) txt(g, label, x - 20, y, {sz:9, b:1, c: live ? C.acc : C.tx2, al:'right'});
}
function fuse(g, x, y, horiz){
  g.save(); g.fillStyle = C.card; g.strokeStyle = P.ink; g.lineWidth = 1.3;
  if(horiz){ g.fillRect(x - 11, y - 5, 22, 10); g.strokeRect(x - 11, y - 5, 22, 10);
    seg(g, [[x - 18, y],[x - 11, y]], C.wire, 1.8);
    seg(g, [[x + 11, y],[x + 18, y]], C.wire, 1.8);
  } else { g.fillRect(x - 5, y - 11, 10, 22); g.strokeRect(x - 5, y - 11, 10, 22);
    seg(g, [[x, y - 18],[x, y - 11]], C.wire, 1.8);
    seg(g, [[x, y + 11],[x, y + 18]], C.wire, 1.8);
  }
  g.restore();
}
/* 时间继电器的延时闭合动合触点：动合触点 + 一把「伞」。
   **朝向不拿来教东西**（2.3 那条：各版本画法有出入），只标 KT-1 和「延时闭合」 */
function ktC(g, x, y, on){
  noC(g, x, y, on);
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.3; g.lineCap = 'round';
  g.beginPath(); g.arc(x - 1, y - 2, 8, Math.PI, Math.PI*2); g.stroke();
  g.beginPath(); g.moveTo(x - 9, y - 2); g.lineTo(x + 7, y - 2); g.stroke();
  g.restore();
}
/* 竖着的起动电阻（个头大的瓷管电阻，画个方框就够） */
function resV(g, x, y, live){
  box(g, x - 8, y - 12, 16, 24, 2, C.card, P.ink, 1.4);
  seg(g, [[x, y - 20],[x, y - 12]], C.wire, 2);
  seg(g, [[x, y + 12],[x, y + 20]], C.wire, 2);
}
/* 三相刀开关 QS：三根线上各一把刀 */
function knife3(g, xs, y, on){
  xs.forEach(function(x){
    seg(g, [[x, y - 16],[x, y - 8]], C.wire, 2);
    seg(g, [[x, y + 8],[x, y + 16]], C.wire, 2);
    dot(g, x, y - 8, P.ink, 2); dot(g, x, y + 8, P.ink, 2);
    g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.8; g.lineCap = 'round';
    g.beginPath(); g.moveTo(x, y + 8);
    if(on) g.lineTo(x + 3, y - 8); else g.lineTo(x + 11, y - 4);
    g.stroke(); g.restore();
  });
  g.save(); g.setLineDash([2.5,2.5]); g.strokeStyle = P.inkL; g.lineWidth = 1;
  g.beginPath(); g.moveTo(xs[0] + (on?3:11), y - (on?8:4));
  g.lineTo(xs[2] + (on?3:11), y - (on?8:4)); g.stroke(); g.restore();
}

/* ================================================================
   这一节的数字模型（出处见文件头注释）
   ================================================================ */
const IN = 15;          /* 额定电流 A */
const I0 = 90;          /* 直接起动电流 A（额定的 6 倍） */
const UPH = 220;        /* 相电压 V（Y 接：380 ÷ √3） */
const ZM = UPH / I0;    /* 堵转等效阻抗 Ω = 2.44 */
const TQ0 = 2.0;        /* 直接起动转矩，相对额定转矩 */
const TQL = 0.6;        /* 负载转矩，相对额定转矩 */
/* 示意曲线：f(t) 既是「电流的高出部分」也是「还差多少转速」，两者天生互为镜像 */
function fDir(t){ return 1 / (1 + Math.pow(t / 2.2, 4)); }
function fRes(t){ return 1 / (1 + Math.pow(t / 2.6, 4)); }
function hAft(u){ return 1 / (1 + Math.pow(u / 1.3, 4)); }

/* ================================================================
   场景 1：起动电流曲线
   ================================================================ */
const st1 = new Stage('cv0', 360, 256);
const S1 = { mode:0, t:0, TSW:3 };
const X0 = 48, X1 = 340, Y0 = 44, Y1 = 170, TMAX = 8, IMAX = 100;
function px1(t){ return X0 + (X1 - X0) * t / TMAX; }
function py1(i){ return Y1 - (Y1 - Y0) * Math.min(i, IMAX) / IMAX; }
function curDir(t){ return IN + (I0 - IN) * fDir(t); }
function curRes(t){
  if(t < S1.TSW) return 0.5 * (IN + (I0 - IN) * fRes(t));
  return IN + (I0 - IN) * fRes(S1.TSW) * hAft(t - S1.TSW);
}
function spdDir(t){ return 1 - fDir(t); }
function spdRes(t){
  if(t < S1.TSW) return 1 - fRes(t);
  return 1 - fRes(S1.TSW) * hAft(t - S1.TSW);
}
function draw1(dt){
  const g = st1.g; st1.clear();
  if(dt && S1.t < TMAX) S1.t = Math.min(TMAX, S1.t + dt);
  EP.heading(g, 14, 16, S1.mode ? '串电阻起动' : '直接起动', '示意曲线');

  box(g, X0, Y0, X1 - X0, Y1 - Y0, 4, C.box, C.boxLine, 1);
  /* 纵轴刻度：0 / 15(额定) / 45 / 90 */
  [[0,'0'],[15,'15'],[45,'45'],[90,'90']].forEach(function(a){
    const y = py1(a[0]);
    seg(g, [[X0, y],[X1, y]], C.boxLine, a[0]===15 ? 1.2 : 0.7);
    txt(g, a[1], X0 - 6, y, {sz:8.5, c:C.tx3, al:'right'});
  });
  txt(g, 'A', X0 - 6, Y0 - 4, {sz:8.5, c:C.tx3, al:'right'});
  txt(g, '额定 15 A', X1 - 4, py1(15) - 8, {sz:8.5, c:C.tx3, al:'right'});
  /* 横轴 */
  for(let s = 0; s <= TMAX; s += 2){
    const x = px1(s);
    seg(g, [[x, Y1],[x, Y1 + 4]], C.boxLine, 0.8);
    txt(g, s + ' s', x, Y1 + 13, {sz:8.5, c:C.tx3});
  }

  /* 两条曲线，当前模式那条画粗 */
  function curve(fn, col, lw){
    const pts = [];
    for(let s = 0; s <= TMAX + 0.001; s += 0.08) pts.push([px1(s), py1(fn(s))]);
    new Path(pts).stroke(g, lw, col);
  }
  g.save(); g.globalAlpha = S1.mode ? .3 : 1;
  curve(curDir, C.cur, S1.mode ? 1.6 : 2.6); g.restore();
  g.save(); g.globalAlpha = S1.mode ? 1 : .3;
  curve(curRes, C.acc, S1.mode ? 2.6 : 1.6); g.restore();

  /* 串电阻那条上的切换点 */
  if(S1.mode){
    const xs = px1(S1.TSW);
    g.save(); g.setLineDash([3,3]); g.strokeStyle = C.warn; g.lineWidth = 1;
    g.beginPath(); g.moveTo(xs, Y0); g.lineTo(xs, Y1); g.stroke(); g.restore();
    EP.chip(g, 'KM2 短接电阻', xs + 4, Y0 + 11, {sz:8.5, c:C.warn, al:'left'});
  }

  /* 当前这一刻 */
  const t = S1.t;
  const iNow = S1.mode ? curRes(t) : curDir(t);
  const nNow = S1.mode ? spdRes(t) : spdDir(t);
  const xN = px1(t), yN = py1(iNow);
  g.save(); g.setLineDash([2,3]); g.strokeStyle = C.tx3; g.lineWidth = 1;
  g.beginPath(); g.moveTo(xN, Y1); g.lineTo(xN, yN); g.stroke(); g.restore();
  dot(g, xN, yN, S1.mode ? C.acc : C.cur, 4.5);

  EP.legend(g, 180, 199, [['直接起动', C.cur, 'bar'], ['串电阻起动', C.acc, 'bar']]);

  if(S1.mode) conc(g, 212, 'acc', '起动那一下 45 A（3 倍），但切换时还会冲一下',
    '电阻把电压压掉一半，电流也就掉一半 —— 代价在下一屏');
  else conc(g, 212, 'warn', '起动那一下 90 A，是平时的 6 倍',
    '转起来它自己就掉下去了 —— 麻烦的是「大的这几秒」');

  /* 每帧在变的量，必须每帧写进数字卡（老坑） */
  const a = t.toFixed(1) + ' s', b = Math.round(iNow) + ' A', c = Math.round(nNow*100) + ' %';
  if(S1.la !== a){ S1.la = a; $('s1a').textContent = a; }
  if(S1.lb !== b){ S1.lb = b; $('s1b').textContent = b; }
  if(S1.lc !== c){ S1.lc = c; $('s1c').textContent = c; }
}
function note1(){
  $('n0').innerHTML = S1.mode
    ? '<b>串电阻这条（蓝）</b>：起动那一刻只有 <b>45 A</b>，是直接起动的一半。'
      + '但看 3 秒那条黄虚线 —— <b>KM2 把电阻短接掉的那一下，电流又冲了一次</b>。'
      + '冲多高，取决于那时候电动机转起来了没有。<b>第 4 屏专门算这一下。</b>'
    : '<b>直接起动这条（橙）</b>：合闸瞬间 <b>90 A</b>，一直维持到转速上来才掉下去，'
      + '整个过程几秒钟。<b>转速那一栏和电流是镜像的</b> —— 电流大正是因为还没转起来，'
      + '转子一转起来，绕组里就产生反电动势把电流顶回去了（<b>1.6 讲的电磁感应</b>）。';
}

/* ================================================================
   场景 2：串电阻怎么降的（串联分压）
   ================================================================ */
const st2 = new Stage('cv1', 360, 238);
const S2 = { r:1.0 };
function calc2(){
  const I = UPH / (S2.r + ZM);
  const Um = I * ZM;
  const k = Um / UPH;
  return { I:I, Um:Um, k:k, T: TQ0 * k * k, Ur: I * S2.r };
}
function draw2(){
  const g = st2.g; st2.clear();
  const d = calc2();
  EP.heading(g, 14, 16, '串联分压', '每相');

  /* 左边：电源 → 电阻 → 电动机绕组 → 中性点 */
  const CX = 64;
  seg(g, [[CX, 66],[CX, 88]], C.wire, 2);
  seg(g, [[CX, 112],[CX, 136]], C.wire, 2);
  seg(g, [[CX, 164],[CX, 186]], C.wire, 2);
  /* 交流电源符号 */
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.5;
  g.beginPath(); g.arc(CX, 54, 12, 0, Math.PI*2); g.stroke();
  g.beginPath();
  for(let i = -7; i <= 7; i++){
    const y = 54 - 4 * Math.sin(i / 7 * Math.PI);
    if(i === -7) g.moveTo(CX + i, y); else g.lineTo(CX + i, y);
  }
  g.stroke(); g.restore();
  txt(g, '220 V', CX - 18, 54, {sz:9, b:1, c:C.tx2, al:'right'});
  /* 电阻 */
  box(g, CX - 10, 88, 20, 24, 2, C.card, P.ink, 1.4);
  txt(g, 'R', CX, 100, {sz:10.5, b:1, c:C.tx});
  EP.chip(g, S2.r.toFixed(1) + ' Ω', CX + 16, 94, {sz:8.5, c:C.acc, al:'left'});
  EP.chip(g, '分掉 ' + Math.round(d.Ur) + ' V', CX + 16, 108, {sz:8.5, c:C.tx2, al:'left'});
  /* 电动机绕组 */
  box(g, CX - 14, 136, 28, 28, 3, C.card, P.ink, 1.4);
  txt(g, 'M', CX, 150, {sz:11, b:1, c:C.tx});
  EP.chip(g, ZM.toFixed(2) + ' Ω', CX + 20, 144, {sz:8.5, c:C.tx2, al:'left'});
  EP.chip(g, '得到 ' + Math.round(d.Um) + ' V', CX + 20, 158, {sz:8.5, c:C.ok, al:'left'});
  /* 中性点 */
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.4;
  [0,1,2].forEach(function(i){
    const w = 14 - i * 5;
    g.beginPath(); g.moveTo(CX - w, 186 + i * 4); g.lineTo(CX + w, 186 + i * 4); g.stroke();
  });
  g.restore();
  txt(g, 'N', CX + 20, 190, {sz:8.5, c:C.tx3, al:'left'});

  /* 右边三条：一律 x 从 BX0 到 BX1 */
  const BX0 = 168, BX1 = 338;
  function bar(y, label, val, frac, col, mark){
    txt(g, label, BX0, y - 8, {sz:9, c:C.tx2, al:'left'});
    txt(g, val, BX1, y - 8, {sz:10.5, b:1, c:col, al:'right'});
    box(g, BX0, y, BX1 - BX0, 15, 3, C.box, C.boxLine, 1);
    const w = Math.max(2, (BX1 - BX0) * Math.max(0, Math.min(1, frac)));
    box(g, BX0, y, w, 15, 3, col, null, 0);
    if(mark !== undefined){
      const mx = BX0 + (BX1 - BX0) * mark;
      seg(g, [[mx, y - 3],[mx, y + 18]], C.err, 1.4);
    }
  }
  bar(62, '电动机端电压（满格 220 V）', Math.round(d.Um) + ' V', d.k, C.volt);
  bar(112, '起动电流（满格 90 A）', d.I.toFixed(0) + ' A', d.I / I0, C.cur);
  bar(162, '起动转矩（满格 2 倍额定）', d.T.toFixed(2) + ' 倍', d.T / TQ0, C.ok, TQL / TQ0);
  txt(g, '红线 = 负载要的 0.6 倍', BX1, 186, {sz:8.5, c:C.err, al:'right'});

  if(d.T < TQL) conc(g, 196, 'err', '起动转矩已经不够了：' + d.T.toFixed(2) + ' 倍 < 负载要的 0.6 倍',
    '通上电它不会转，只会嗡嗡响 —— 电阻串过头了');
  else conc(g, 196, 'acc', '电压 ' + Math.round(d.k*100) + ' % ，电流 ' + Math.round(d.k*100)
    + ' % ，转矩只剩 ' + Math.round(d.k*d.k*100) + ' %',
    '电压和电流是一比一，转矩是按平方掉的');
}
function note2(){
  const d = calc2();
  $('s2lab').textContent = S2.r.toFixed(1) + ' Ω';
  $('s2a').textContent = d.I.toFixed(0) + ' A';
  $('s2b').textContent = Math.round(d.Um) + ' V';
  $('s2c').textContent = d.T.toFixed(2) + ' 倍';
  let h = '串 <b>' + S2.r.toFixed(1) + ' Ω</b> 的时候：电流 <b>' + d.I.toFixed(0)
    + ' A</b>，电动机自己拿到 <b>' + Math.round(d.Um) + ' V</b>（满电压的 '
    + Math.round(d.k*100) + '%），起动转矩 <b>' + d.T.toFixed(2) + ' 倍额定</b>。';
  if(S2.r === 0) h += ' 这就是<b>直接起动</b> —— 电阻为零，等于没串。';
  else if(d.T < TQL) h += ' <b class="rd">转矩已经小于负载了。</b>'
    + '这时候通电，电动机根本转不起来，就在那儿嗡嗡响、电流一直是几十安 ——'
    + ' <b>9.4 讲过这个声音，几分钟就能把绕组烧掉。</b>';
  else h += ' 转矩还够（负载要 0.6 倍），转得起来。'
    + ' 注意看：<b>电压和电流是一比一往下掉的，转矩掉得比它们快得多。</b>';
  $('n1').innerHTML = h;
}

/* ================================================================
   场景 3：完整原理图（书上图 11-9），点起动看四步
   ================================================================
   几何照 9.1 那套验证过的：主电路竖着画在左边、控制回路在右边两条横母线之间。
   **控制回路的两根引线横穿主电路的竖线 —— 交叉一律不打点**（4.1 那条规矩）。
   这一节比 9.1 多两样：R1~R3 起动电阻，和并在它两端的 KM2-1 短接触点。 */
const st3 = new Stage('cv2', 360, 340);
const L = [46, 80, 114], PB = 17;          /* 三相主电路的 x，PB = 短接支路的偏移 */
const CT = 66, CB = 288, CR = 344;         /* 控制回路上下母线 */
const BX = 200, SLX = 170, KTX = 268, K2X = 324;
const KT_D = 3;                            /* 演示用的延时，秒 */
const S3 = { run:false, t:0, km2:false, ph:0 };
function w3(g, pts, live, lw){ seg(g, pts, live ? C.acc : C.wire, lw || 1.8); }
function draw3(dt){
  const g = st3.g; st3.clear();
  if(dt){
    if(S3.run){
      S3.t = Math.min(KT_D, S3.t + dt);
      if(S3.t >= KT_D && !S3.km2){ S3.km2 = true; note3(); }
      S3.ph += dt * 46;
    }
  }
  const run = S3.run, km2 = S3.km2;
  EP.heading(g, 14, 16, '串电阻减压起动电路', 'AC 380 V · 图 11-9');

  /* ---------- 主电路 ---------- */
  L.forEach(function(x, i){
    seg(g, [[x, 40],[x, 210]], C.wire, 2);
    txt(g, 'L' + (i+1), x, 32, {sz:8.5, b:1, c:C.tx3});
  });
  /* QS：合闸状态（下面有电流在流，画成断开就自打嘴巴 —— 4.1 那条） */
  L.forEach(function(x){
    g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.6; g.lineCap = 'round';
    g.beginPath(); g.moveTo(x, 56); g.lineTo(x + 8, 70); g.stroke(); g.restore();
    dot(g, x, 56, P.ink, 1.8); dot(g, x, 72, P.ink, 1.8);
  });
  txt(g, 'QS', 26, 64, {sz:8.5, b:1, c:C.tx3, al:'right'});
  L.forEach(function(x){ fuse(g, x, 96); });
  txt(g, 'FU1~3', 26, 96, {sz:8.5, b:1, c:C.tx3, al:'right'});
  L.forEach(function(x){ noC(g, x, 126, run, 0.9); });
  txt(g, 'KM1-1', 26, 126, {sz:8.5, b:1, c: run ? C.acc : C.tx3, al:'right'});
  /* 三个起动电阻 + 并在两端的 KM2-1 */
  L.forEach(function(x){
    const bx = x + PB;
    g.save(); g.globalAlpha = km2 ? .34 : 1;
    box(g, x - 8, 152, 16, 24, 2, C.card, P.ink, 1.4);
    g.restore();
    seg(g, [[x, 146],[bx, 146]], C.wire, 1.6);
    seg(g, [[bx, 146],[bx, 151]], C.wire, 1.6);
    noC(g, bx, 164, km2, 0.9);
    seg(g, [[bx, 177],[bx, 182]], C.wire, 1.6);
    seg(g, [[bx, 182],[x, 182]], C.wire, 1.6);
    dot(g, x, 146, C.wire, 2.4); dot(g, x, 182, C.wire, 2.4);
  });
  txt(g, 'R1~R3', 26, 162, {sz:8.5, b:1, c:C.tx3, al:'right'});
  txt(g, 'KM2-1', 26, 182, {sz:8.5, b:1, c: km2 ? C.acc : C.tx3, al:'right'});
  g.save(); g.setLineDash([2,2]); g.strokeStyle = C.tx3; g.lineWidth = .9;
  g.beginPath(); g.moveTo(30, 181); g.lineTo(57, 176); g.stroke(); g.restore();
  /* FR 热元件 */
  box(g, 34, 190, 92, 20, 2, C.card, P.ink, 1.3);
  L.forEach(function(x){
    g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.4;
    g.beginPath(); g.moveTo(x - 4, 195); g.lineTo(x + 4, 195);
    g.lineTo(x - 4, 200); g.lineTo(x + 4, 200); g.lineTo(x - 4, 205); g.stroke(); g.restore();
  });
  txt(g, 'FR', 26, 200, {sz:8.5, b:1, c:C.tx3, al:'right'});
  /* 电动机 */
  L.forEach(function(x){ seg(g, [[x, 210],[x, 224],[80, 230]], C.wire, 1.8); });
  g.save(); g.strokeStyle = run ? C.acc : P.ink; g.lineWidth = 1.6;
  g.beginPath(); g.arc(80, 246, 17, 0, Math.PI*2); g.stroke(); g.restore();
  txt(g, 'M', 80, 241, {sz:11, b:1, c: run ? C.acc : C.tx2});
  txt(g, '3~', 80, 253, {sz:8.5, c:C.tx3});

  /* ---------- 主电路里的电流（走得通的完整回路，缺一段就是凭空出现） ---------- */
  if(run){
    L.forEach(function(x){
      const bx = x + PB;
      const pts = km2
        ? [[x,40],[x,146],[bx,146],[bx,182],[x,182],[x,210],[80,230]]
        : [[x,40],[x,210],[80,230]];
      EC.dots(g, new Path(pts), {gap:38, r:2.6, color:C.cur, phase:S3.ph});
    });
  }

  /* ---------- 控制回路的两根引线（横穿主电路，不打点） ---------- */
  w3(g, [[L[0], 110],[138, 110],[138, CT],[CR, CT]], true, 2);
  dot(g, L[0], 110, C.wire, 2.6);
  w3(g, [[L[1], 142],[146, 142],[146, CB],[CR, CB]], true, 2);
  dot(g, L[1], 142, C.wire, 2.6);
  fuse(g, 138, 86);
  txt(g, 'FU4', 148, 86, {sz:8.5, b:1, c:C.tx3, al:'left'});
  fuse(g, 146, 240);
  txt(g, 'FU5', 156, 240, {sz:8.5, b:1, c:C.tx3, al:'left'});

  /* ---------- 主控支路 ---------- */
  w3(g, [[BX, CT],[BX, 78]], true);
  ncC(g, BX, 92, false, 0.9);
  txt(g, 'FR-1', 214, 92, {sz:8.5, b:1, c:C.tx3, al:'left'});
  w3(g, [[BX, 105],[BX, 118]], true);
  btn(g, BX, 132, true, false);
  txt(g, 'SB2', 188, 118, {sz:8.5, b:1, c:C.tx3, al:'right'});
  w3(g, [[BX, 146],[BX, 154]], true);
  btn(g, BX, 168, false, false);
  txt(g, 'SB1', 230, 168, {sz:8.5, b:1, c:C.tx3, al:'left'});
  /* 自锁：并在 SB1 两端 */
  w3(g, [[BX, 152],[SLX, 152],[SLX, 155]], true, 1.6);
  noC(g, SLX, 168, run, 0.9);
  w3(g, [[SLX, 181],[SLX, 192],[BX, 192]], run, 1.6);
  txt(g, 'KM1-2', SLX, 146, {sz:8.5, b:1, c: run ? C.acc : C.tx3});
  dot(g, BX, 152, C.wire, 2.4); dot(g, BX, 192, C.wire, 2.4);
  /* 从节点 B 引出去的那条横线 */
  w3(g, [[BX, 182],[BX, 192]], run, 1.8);
  w3(g, [[BX, 192],[K2X, 192]], run, 1.8);
  dot(g, KTX, 192, C.wire, 2.4);
  /* 三条线圈支路 */
  w3(g, [[BX, 192],[BX, 202]], run);
  coil(g, BX, 222, run, 'KM1');
  w3(g, [[BX, 242],[BX, CB]], run);
  w3(g, [[KTX, 192],[KTX, 202]], run);
  coil(g, KTX, 222, run, 'KT');
  w3(g, [[KTX, 242],[KTX, CB]], run);
  w3(g, [[K2X, 192],[K2X, 199]], run);
  ktC(g, K2X, 212, km2);
  txt(g, 'KT-1', K2X, 184, {sz:8.5, b:1, c: km2 ? C.acc : C.tx3});
  w3(g, [[K2X, 225],[K2X, 234]], km2);
  coil(g, K2X, 254, km2, 'KM2');
  w3(g, [[K2X, 274],[K2X, CB]], km2);

  /* ---------- 结论条 ---------- */
  if(!run) conc(g, 300, 'warn', '停着 —— 按「起动 SB1」看整个过程',
    'KM1 和 KT 同时得电，KT 数到点了才轮到 KM2');
  else if(!km2) conc(g, 300, 'acc', '减压起动中：电流经 R1~R3 进电动机，KT 还在数秒',
    'KM1-2 已经自锁，松手也断不了');
  else conc(g, 300, 'ok', '全压运行：KM2-1 把三个电阻短接掉了',
    'KM1 一直吸着 —— KM2 是叠加上去的，不是接替它');

  const a = !run ? '停着' : (km2 ? '全压运行' : '减压起动');
  const b = !run ? '—' : (km2 ? '到了' : (KT_D - S3.t).toFixed(1) + ' s');
  const c = km2 ? '短接了' : '串着';
  if(S3.la !== a){ S3.la = a; $('s3a').textContent = a; }
  if(S3.lb !== b){ S3.lb = b; $('s3b').textContent = b; }
  if(S3.lc !== c){ S3.lc = c; $('s3c').textContent = c; }
}
function note3(){
  let h;
  if(!S3.run) h = '现在是<b>停着</b>的状态。图上所有触点画的都是<b>未操作状态</b>'
    + '（4.3 那条第一原则）：KM1-1、KM1-2、KM2-1、KT-1 都是动合，所以都画成断开的；'
    + 'SB2 和 FR-1 是动断，画成闭合的。<b>看到断开的触点不等于线路坏了。</b>';
  else if(!S3.km2) h = '<b>③ KM1 和 KT 同时得电了。</b>KM1-1 闭合，'
    + '电流经 <b>R1、R2、R3</b> 进电动机 —— 减压起动。同时 KM1-2 闭合<b>自锁</b>，'
    + '手可以松开了。<b>KT 正在数秒</b>，数到了才轮到下一步。'
    + '注意 KT 是和 KM1 <b>同时</b>得电的，它数的就是「起动用了多久」。';
  else h = '<b>④⑤ KT-1 延时闭合，KM2 得电。</b>KM2-1 的三对主触头把 R1~R3 <b>短接掉了</b>，'
    + '电流不再走电阻，电动机进入<b>全压运行</b>。'
    + '看清楚：<b>KM1 并没有断</b> —— 它的主触头还是电动机唯一的供电通路，'
    + 'KM2 只是在电阻两边并了一条近路。<b>这一点和下一节的星三角正好相反。</b>';
  $('n2').innerHTML = h;
}

/* ================================================================
   场景 4：KT 该设几秒
   ================================================================
   切换冲击 = 切换那一刻的转速对应的**全压**电流（电阻一短接，电压立刻回到 380 V）。
   电阻发热是数值积分真算的：Q = ∫ 3·I²·R dt，步长 0.05 s，显示成相对 6 秒那档的倍数。 */
const st4 = new Stage('cv3', 360, 276);
const DLY = [2, 6, 20];
const S4 = { k:1 };
function shock4(T){ return IN + (I0 - IN) * fRes(T); }
function heat4(T){
  let q = 0;
  for(let t = 0; t < T; t += 0.05){
    const i = 0.5 * (IN + (I0 - IN) * fRes(t));
    q += 3 * i * i * ZM * 0.05;
  }
  return q;
}
const HEAT0 = heat4(6);
const G0 = 46, G1 = 340, H0 = 44, H1 = 150, T4MAX = 22;
function px4(t){ return G0 + (G1 - G0) * t / T4MAX; }
function draw4(){
  const g = st4.g; st4.clear();
  const T = DLY[S4.k];
  EP.heading(g, 14, 16, '转速上来了没有', '示意曲线');

  box(g, G0, H0, G1 - G0, H1 - H0, 4, C.box, C.boxLine, 1);
  [[0,'0'],[0.5,'50'],[1,'100']].forEach(function(a){
    const y = H1 - (H1 - H0) * a[0];
    seg(g, [[G0, y],[G1, y]], C.boxLine, 0.7);
    txt(g, a[1], G0 - 6, y, {sz:8.5, c:C.tx3, al:'right'});
  });
  txt(g, '转速 %', G0 - 6, H0 - 14, {sz:8.5, c:C.tx3, al:'right'});
  for(let s = 0; s <= T4MAX; s += 5){
    const x = px4(s);
    seg(g, [[x, H1],[x, H1 + 4]], C.boxLine, 0.8);
    txt(g, s + ' s', x, H1 + 12, {sz:8.5, c:C.tx3});
  }
  /* 串着电阻时的转速曲线 */
  const pts = [];
  for(let s = 0; s <= T4MAX + 0.001; s += 0.15)
    pts.push([px4(s), H1 - (H1 - H0) * (1 - fRes(s))]);
  new Path(pts).stroke(g, 2.4, C.acc);

  /* 三个切换点 */
  DLY.forEach(function(d, i){
    const x = px4(d), on = i === S4.k;
    const y = H1 - (H1 - H0) * (1 - fRes(d));
    g.save(); g.setLineDash([3,3]);
    g.strokeStyle = on ? C.warn : C.tx3; g.lineWidth = on ? 1.4 : .8;
    g.beginPath(); g.moveTo(x, H0); g.lineTo(x, H1); g.stroke(); g.restore();
    dot(g, x, y, on ? C.warn : C.tx3, on ? 4.5 : 3);
    if(on){
      const rt = d > 12;
      EP.chip(g, d + ' 秒切换', x + (rt ? -5 : 5), H1 - 14,
        {sz:8.5, c:C.warn, al: rt ? 'right' : 'left'});
    }
  });

  const BX0 = 118, BX1 = 300;
  function bar4(y, label, val, frac, col){
    txt(g, label, 14, y + 7, {sz:9, c:C.tx2, al:'left'});
    box(g, BX0, y, BX1 - BX0, 15, 3, C.box, C.boxLine, 1);
    const w = Math.max(2, (BX1 - BX0) * Math.max(0, Math.min(1, frac)));
    box(g, BX0, y, w, 15, 3, col, null, 0);
    txt(g, val, BX1 + 6, y + 7, {sz:9, b:1, c:col, al:'left'});
  }
  const sh = shock4(T), hv = heat4(T) / HEAT0;
  bar4(170, '切换那一下的电流', (sh / IN).toFixed(1) + ' 倍', sh / (5 * IN),
    sh / IN > 2.5 ? C.err : C.ok);
  bar4(204, '电阻累计发热', hv.toFixed(1) + ' 倍', hv / 2, hv > 1.4 ? C.err : C.ok);

  if(S4.k === 0) conc(g, 232, 'err', '设短了：才转到 ' + Math.round((1-fRes(T))*100)
    + ' %，切换那一下电流冲到 ' + (sh/IN).toFixed(1) + ' 倍',
    '等于白减压 —— 冲击照旧，上级断路器可能跟着跳');
  else if(S4.k === 2) conc(g, 232, 'warn', '设长了：6 秒就转到位了，后面 14 秒纯属白等',
    '这 14 秒电动机一直在低压下带着载，电阻也一直在烧');
  else conc(g, 232, 'ok', '刚好：转到 ' + Math.round((1-fRes(T))*100)
    + ' %，切换那一下几乎不跳（' + (sh/IN).toFixed(1) + ' 倍）',
    '判据就是这个 —— 拿钳形表看，切换时电流不跳就说明设对了');

  $('s4a').textContent = T + ' 秒';
  $('s4b').textContent = (sh / IN).toFixed(1) + ' 倍';
  $('s4c').textContent = hv.toFixed(1) + ' 倍';
}
function note4(){
  const T = DLY[S4.k], sh = shock4(T), hv = heat4(T) / HEAT0;
  let h = '延时设 <b>' + T + ' 秒</b>：切换那一刻电动机转到 <b>'
    + Math.round((1 - fRes(T)) * 100) + '%</b>，'
    + '电阻一短接，电压立刻回到 380 V，电流跳到 <b>' + Math.round(sh) + ' A（'
    + (sh/IN).toFixed(1) + ' 倍额定）</b>。';
  if(S4.k === 0) h += ' <b class="rd">这就白减压了。</b>'
    + '电动机才转到四分之一，切过去和直接起动没什么两样，'
    + '该跳的闸照样跳、该冲的机械照样冲。<b>「起动就跳闸」十有八九是这个原因</b>，'
    + '而不是电动机坏了。';
  else if(S4.k === 2) h += ' 冲击确实是最小的，发热也只多了 <b>'
    + Math.round((hv-1)*100) + '%</b> —— <b>看着好像设长点没什么坏处。</b>'
    + '<b class="rd">但这条示意曲线假定了电动机顺利转起来。</b>'
    + '真实带载的时候，减压状态下转矩只有一小半（屏 2 那条平方关系），'
    + '电动机很可能<b>卡在某个转速上不去、电流一直下不来</b> —— '
    + '那才是电阻真正被烧掉的场景，而这条曲线画不出来。'
    + '起动电阻是<b>短时工作制</b>的，它就是拿来烧那几秒的。'
    + '<b>所以规矩仍然是：转起来了就赶紧切，不要白等。</b>';
  else h += ' <b>这一档是合适的。</b>转速已经上到 ' + Math.round((1 - fRes(T)) * 100)
    + '%，剩下那一点点让全压去补，'
    + '切换几乎感觉不到。<b>现场就照这个判：起动时拿钳形表套住一根主电路导线，'
    + '看切换那一下电流跳不跳。</b>';
  $('n3').innerHTML = h;
}

/* ================================================================
   绑定
   ================================================================ */
$('s1k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  const k = b.dataset.k;
  if(k === '2'){ S1.t = 0; return; }
  S1.mode = +k; S1.t = 0;
  document.querySelectorAll('#s1k .btn').forEach(function(t){
    t.classList.toggle('on', t.dataset.k === k);
  });
  note1();
});
$('s2r').addEventListener('input', function(e){
  S2.r = (+e.target.value) / 10;
  note2(); draw2();
});
$('s3k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  if(b.dataset.k === 'go'){ S3.run = true; S3.t = 0; S3.km2 = false; }
  else { S3.run = false; S3.t = 0; S3.km2 = false; }
  document.querySelectorAll('#s3k .btn').forEach(function(t){
    t.classList.toggle('on', t.dataset.k === b.dataset.k && S3.run);
  });
  note3();
});
$('s4k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S4.k = +b.dataset.k;
  document.querySelectorAll('#s4k .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S4.k);
  });
  note4(); draw4();
});

$('fml1').innerHTML = ElecUI.formula({
  plain:'电源那 220 V 被电阻和电动机分掉：串进去的电阻越大，留给电动机的电压越少，电流也跟着变小。',
  f:'I = U ÷ (R + Z)',
  vars:['I','U','R'],
  note:'Z 是电动机起动那一刻的等效阻抗（这台是 2.44 Ω）。电动机自己拿到的电压 = I × Z，转矩正比于这个电压的平方。'
});

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会重设尺寸并清空。屏 2、屏 4 是静态的，必须在这儿补画 */
  draw2(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:11, sec:'11.3'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('11.3');
  let h = '';
  h += nb.prev && nb.prev.f ? '<a href="' + nb.prev.f + '">‹ ' + nb.prev.id + ' ' + nb.prev.t + '</a>'
                            : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next && nb.next.f ? '<a class="next" href="' + nb.next.f + '">' + nb.next.id + ' ' + nb.next.t + ' ›</a>'
                            : '<span>下一节还没做</span>';
  $('pager').innerHTML = h;
})();

loop(function(dt){
  if(cur === 0) draw1(dt);
  else if(cur === 2) draw3(dt);
});
  }
});
})();
