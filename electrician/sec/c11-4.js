/* 11.4 电动机 Y—△ 减压起动 —— 本节内容的唯一真相。
   对应《零基础学电工》第 11 章 11.4 节（书内 P204~P207）。

   四屏：① 每相绕组分到多少伏 ② 接触器就是那几块连接片 ③ 起动全过程 ④ 互锁

   **这一节是整章的高潮**，也是现场最常用的一种减压起动。
   和 11.3 串电阻最本质的区别写在屏 4：**串电阻是「叠加」（KM1 和 KM2 同时吸着），
   星三角是「顶替」（KMY 断了 KM△ 才能通，两只绝不能同时吸合）。**

   书上的原文（别凭记忆改）：
   - 11.4.1 开头：「电动机 Y—△ 减压起动控制电路是指三相交流电动机起动时，
     先由电路控制三相交流电动机定子绕组连接成 Y 形进入减压起动状态，
     待转速达到一定值后，再由电路控制三相交流电动机定子绕组连接成 △ 形，
     进入全压正常运行状态。」
   - **图 11-11 的提示说明（照录）**：「当三相交流电动机绕组采用 Y 联结时，
     三相交流电动机每相绕组承受的电压均为 **220V**；当三相交流电动机绕组采用 △ 联结时，
     三相交流电动机每相绕组承受的电压为 **380V**。」
   - 图 11-10 的器件（照录）：**QF 电源总开关（总断路器）**、**FU1、FU2 熔断器**、
     **FR 热继电器**（触点 FR-1）、**SB1 起动按钮**、**SB2 停止按钮**、
     **K 中间继电器**（触点 K-1 / K-2 / K-3）、**KT 时间继电器**（KT-1 / KT-2）、
     **KMY Y 形减压起动控制接触器**（KMY-1 / KMY-2 / KMY-3）、
     **KM△ △ 形全压运行控制接触器**（KM△-1 ~ KM△-5）、
     **HL1 运行指示灯、HL2 停机指示灯、HL3 起动指示灯**
   - **图 11-12 的工作过程（照录，13 步）**：
     ① 闭合总断路器 QF，接通三相电源，停机指示灯 HL2 点亮
     ② 按下起动按钮 SB1，触头闭合
     ③ 电磁继电器 K 的线圈得电
        ③-1 常闭触头 K-1 断开，停机指示灯 HL2 熄灭
        ③-2 常开触头 K-2 闭合自锁
        ③-3 常开触头 K-3 闭合，接通控制电路供电电源
     ④ 交流接触器 KMY 的线圈得电
        ④-1 KMY 常开主触头 KMY-1 闭合，三相交流电动机以 Y 联结接通电源
        ④-2 KMY 常闭辅助触头 KMY-2 断开，**防止 KM△ 线圈得电，起联锁保护作用**
        ④-3 KMY 常开辅助触头 KMY-3 闭合，起动指示灯 HL3 点亮
     ⑤ 电动机减压起动运转
     ⑥ 时间继电器 KT 线圈得电，开始计时
     ⑦ KT 到达预定时间：⑦-1 KT-1 延时断开　⑦-2 KT-2 延时闭合
     ⑧ 断交流接触器 KMY 的供电，KMY 触头全部复位
     ⑨ 交流接触器 KM△ 的线圈得电
        ⑨-1 KM△-1 闭合，三相交流电动机以 △ 联结接通电源
        ⑨-2 KM△-2 闭合自锁
        ⑨-3 KM△-3 闭合，运行指示灯 HL1 点亮
        ⑨-4 KM△-4 断开，**防止 KMY 线圈得电，起联锁保护作用**
        ⑨-5 KM△-5 断开，**切断 KT 线圈的供电**，触头全部复位
     ⑩ 电动机开始全压运行
     ⑪ 需停机时按下停止按钮 SB2
     ⑫ 电磁继电器 K 线圈失电（K-1 复位闭合 HL2 亮 / K-2 解除自锁 / K-3 切断控制电路供电）
     ⑬ KM△ 线圈失电（⑬-1 停转 / ⑬-2 解除自锁 / ⑬-3 HL1 熄灭 /
        ⑬-4 KM△-4 复位闭合，为下一次减压起动做好准备 /
        ⑬-5 KM△-5 复位闭合，为下一次计时控制做好准备）

   **主电路是「两只接触器」的接法（图 11-10 上确实是这么画的，我逐处对过）**：
   电源经 QF、FR **直接接到绕组的首端 U1 V1 W1**；
   **KMY-1 把三个尾端 U2 V2 W2 短接成星点**（Y）；
   **KM△-1 把每个尾端接回另一相的相线**（△）。
   两只都断开时，绕组尾端悬空、回路不闭合，电动机停转 —— 这正是书上第 ⑬-1 步
   「KM△-1 复位断开，切断三相交流电动机的供电电源」说得通的原因。
   **这一版有个安全上的短处（书上没提，屏 2 里标了口径）**：只要 QF 合着，
   绕组首端一直带电。所以现场更常见的是**三只接触器**（前面多一只主接触器 KM）。

   **书上没给、我补的（文案里全部标了口径）**：
   - 例机沿用 11.3 那台（额定 15 A）。**正常运行是 △ 接**：
     直接合闸（全 △）线电流按 6 倍 = **90 A**，Y 起动降到 **1/3 = 30 A**
   - **线电流和起动转矩都正好降到 1/3**，这条是硬的，算给出来：
     △ 接相电压 380，相电流 380/Z，线电流 = √3 × 380/Z = 658/Z；
     Y 接相电压 220，相电流 = 线电流 = 220/Z；
     两者之比 220 ÷ 658 = **0.334 ≈ 1/3**。
     转矩正比于相电压的平方：(220/380)² = **1/3**。**两个都是 1/3**（2.7 节已经推过一次）
   - 起动转矩：△ 直接起动按额定转矩的 **2.0 倍** 算，Y 起动 **0.67 倍**；
     负载转矩按 **0.6 倍** 额定。**0.67 只比 0.6 高一点点** ——
     这就是「星三角只能空载或轻载起动」的全部原因
   - 屏 3 的控制图**省掉了三个指示灯**（HL1/HL2/HL3 和它们串的 K-1、KMY-3、KM△-3），
     否则一屏塞不下。指示灯怎么接 9.1 整屏讲过。文案里说明了这一点 */
(function(){
'use strict';
ELEC.reg({
  id: '11.4',
  file: 'c11-4.html',
  title: '11.4 星三角减压起动',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>每相多少伏</button>
    <button class="tab" data-i="1"><span class="n">2</span>接触器换接法</button>
    <button class="tab" data-i="2"><span class="n">3</span>起动全过程</button>
    <button class="tab" data-i="3"><span class="n">4</span>为什么要互锁</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">同样三个绕组，换个接法，每相分到的电压就不一样</div>
    这台电动机<b>正常运行是 △ 接</b>，每相绕组承受 <b>380 V</b>。
    起动的时候先把它接成 <b>Y</b>，每相就只承受 <b>220 V</b> —— 电压降下来了，
    <b>而且一分钱额外的电阻、变压器都不用花</b>，只是改了改接线。
    <b>点两个按钮看三个数。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">Y 起动</button>
        <button class="btn sm" data-k="1">△ 运行</button>
      </div>
      <div class="nums three">
        <div class="num hi"><div class="k">每相绕组</div><div class="v" id="s1a">220 V</div></div>
        <div class="num"><div class="k">线电流</div><div class="v" id="s1b">30 A</div></div>
        <div class="num"><div class="k">起动转矩</div><div class="v" id="s1c">0.67 倍</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="bet" data-bet="e114-13" data-q="Y 接起动时，电网看到的电流降到 △ 直接起动的多少？"
    data-opts="1/√3（约 58%）|1/3|一半" data-right="1"
    data-after="正好 1/3。而且起动转矩也正好降到 1/3 —— 两个都是 1/3，这是星三角最好记的一条。"></div>

  <div data-bet-for="e114-13">
    <div class="note" style="margin-top:10px">
      <div class="st">两个 1/3 是怎么算出来的</div>
      <div class="eu-tw"><table class="eu-t">
        <thead><tr><th></th><th>△ 接（直接起动）</th><th>Y 接（减压起动）</th></tr></thead>
        <tbody>
          <tr><td class="eu-s">每相电压</td><td>380 V</td><td><b>220 V</b>（380÷√3）</td></tr>
          <tr><td class="eu-s">每相电流</td><td>380 ÷ Z</td><td>220 ÷ Z</td></tr>
          <tr><td class="eu-s">线电流<br>（电网看到的）</td><td>√3 × 380 ÷ Z<br>= 658 ÷ Z</td>
            <td>220 ÷ Z<br><b>= 前者的 1/3</b></td></tr>
          <tr><td class="eu-s">起动转矩</td><td>正比于 380²</td>
            <td>正比于 220²<br><b>= 前者的 1/3</b></td></tr>
        </tbody>
      </table></div>
      <div class="tip info"><b>△ 接的线电流是相电流的 √3 倍</b>，这一步最容易漏。
        Y 接没有这个问题 —— Y 接的线电流就等于相电流（每根相线上只挂着一个绕组）。
        <b>正是这个 √3 让「电压降到 58%」变成了「电流降到 33%」。</b></div>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">代价还是那一条，而且这次卡得更紧</div>
    <div class="tip"><b>起动转矩只剩 0.67 倍额定，而这台机器的负载要 0.6 倍。</b>
      只富余一点点 —— <b>再重一点就起不来了</b>。所以星三角<b>只能空载或轻载起动</b>：
      风机、水泵（起动时闸门/阀门关着）可以，带满料的破碎机、搅拌机就不行。
      <b>11.3 讲过的那条平方关系，在这一节仍然管用，只是这次电压是被接法定死的 58%，
      不像串电阻还能调。</b></div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">用得上星三角的前提（两条，缺一条都不行）</div>
    <table class="eu-t"><tbody>
      <tr><td class="eu-s">① 正常运行<br>必须是 △ 接</td>
        <td>星三角是<b>「先降一档、再回到本来的接法」</b>。
          本来就 Y 接运行的电动机没得降 —— 铭牌上写着 380V / △ 才能用（<b>2.7 节读过铭牌</b>）</td></tr>
      <tr><td class="eu-s">② 接线盒里<br>必须有六个端子</td>
        <td>要能把 U2 V2 W2 单独引出来。<b>只引出三根线的电动机做不了</b>，
          它的接法在出厂时就已经在盒子里定死了</td></tr>
    </tbody></table>
  </div>
</section>

<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">两只接触器干的，就是 2.7 那几块连接片的活</div>
    <b>2.7 节讲过</b>：接线盒里<b>横着两块连接片＝星形，竖着三块＝三角形</b>。
    星三角起动就是把这两种接法都做出来，用<b>两只接触器</b>去切换 ——
    <b>KMY</b> 干「横着两块」的活，<b>KM△</b> 干「竖着三块」的活。
    <b>点三个按钮看接法怎么变。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">KMY 吸合</button>
        <button class="btn sm" data-k="1">KM△ 吸合</button>
        <button class="btn sm" data-k="2">两只都断</button>
      </div>
      <div class="nums three">
        <div class="num hi"><div class="k">现在的接法</div><div class="v" id="s2a">Y 形</div></div>
        <div class="num"><div class="k">每相绕组</div><div class="v" id="s2b">220 V</div></div>
        <div class="num"><div class="k">电动机</div><div class="v" id="s2c">减压起动</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">对照着记（左边是 2.7 的接线盒，右边是这一节的接触器）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>接法</th><th>接线盒里</th><th>星三角电路里</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">Y 形</td><td><b>横着两块</b>连接片<br>（把 W2 U2 V2 连成一片）</td>
          <td><b>KMY-1</b> 的三对主触头<br>把 U2 V2 W2 接到一个点</td></tr>
        <tr><td class="eu-s">△ 形</td><td><b>竖着三块</b>连接片<br>（U1-W2、V1-U2、W1-V2）</td>
          <td><b>KM△-1</b> 的三对主触头<br>把每个尾端接回另一相</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">所以星三角柜里从电动机拉出来的是<b>六根线</b>（加接地共七根），
      不是三根。<b>接错线是这一步最常见的故障</b>：把 U2 接成了 V2，
      合闸瞬间就是相间短路。<b>接完先一根一根拿万用表通断档核对</b>（3.6b 那一套），
      别指望「先送一下电试试」。</div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">书上这个电路只有两只接触器，有个短处要知道</div>
    <div class="tip"><b>只要 QF 合着，绕组的首端 U1 V1 W1 就一直带 380 V</b> ——
      两只接触器都断开的时候，电动机不转，但它的绕组是<b>带电</b>的。
      所以<b>现场更常见的是三只接触器</b>：前面再串一只主接触器 KM，
      停机时把电源整个切掉。<b>这一条书上没写，是从图上看出来的。</b>
      不管哪一版，<b>检修前一律按 3.5 节那一套来：断开 QF、验电、挂牌</b> ——
      「接触器都释放了」不等于停电。</div>
  </div>
</section>

<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">一整套动作，全靠一只时间继电器排队</div>
    这张控制图比 11.3 多了一只<b>中间继电器 K</b>（它管起动/停止和自锁），
    KT 只管一件事：<b>数到点了，把 KMY 断掉、把 KM△ 接通。</b>
    <b>点「起动 SB1」看整个过程。</b>
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
        <div class="num"><div class="k">吸合的是</div><div class="v" id="s3c">都没有</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">四条支路各管什么（照着上图从左往右看）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>支路</th><th>串了什么</th><th>管什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">K</td><td>FR-1 → SB2 → SB1（K-2 自锁）</td>
          <td>起动和停止<b>只在这一条上</b>。K-3 一闭合，右边三条才有电</td></tr>
        <tr><td class="eu-s">KT</td><td>KM△-5（动断）</td>
          <td>计时。<b>KM△ 一吸合就把 KT 断掉</b>（⑨-5），它的活干完了</td></tr>
        <tr><td class="eu-s">KMY</td><td>KT-1（延时断开）→ KM△-4（动断）</td>
          <td>Y 起动。<b>KT 一到点，KT-1 断开，KMY 立刻释放</b></td></tr>
        <tr><td class="eu-s">KM△</td><td>KT-2（延时闭合）→ KMY-2（动断）</td>
          <td>△ 运行。<b>KMY-2 是这一条的门卫</b>，下一屏专讲</td></tr>
      </tbody>
    </table></div>
    <div class="tip info"><b>图上省掉了三个指示灯</b>（HL1 运行 / HL2 停机 / HL3 起动，
      分别串 KM△-3、K-1、KMY-3），否则一屏塞不下。<b>指示灯怎么接、为什么要装两个以上，
      9.1 整屏讲过</b>，接法完全一样。</div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st good">KT 那两对触点，是这一节最值得看清楚的东西</div>
    <table class="eu-t"><tbody>
      <tr><td class="eu-s">KT-1<br>延时断开的<b>动断</b></td>
        <td>平时闭合 → <b>KMY 一开始就能得电</b>；数到点了断开 → <b>KMY 释放</b></td></tr>
      <tr><td class="eu-s">KT-2<br>延时闭合的<b>动合</b></td>
        <td>平时断开 → <b>KM△ 一开始通不了</b>；数到点了闭合 → <b>KM△ 可以得电</b></td></tr>
    </tbody></table>
    <div class="tip">一只时间继电器、一对动断加一对动合，就把「先断谁、后通谁」办成了。
      <b>2.3 节讲过：判延时触点靠三步 —— 先看线圈类型，再看动合还是动断，再看旁边标的延时值。</b>
      这里两对都是通电延时，区别只在动合动断。</div>
  </div>
</section>

<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">两只接触器要是同时吸合，会怎么样</div>
    这是星三角<b>唯一一件要命的事</b>，也是它和 11.3 串电阻最本质的区别：
    串电阻的 KM1 和 KM2 是<b>叠加</b>，本来就该同时吸着；
    星三角的 KMY 和 KM△ 是<b>顶替</b>，<b>同时吸合就是相间短路。</b>
    <b>点第二个按钮看会发生什么。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">正常：先断后合</button>
        <button class="btn sm" data-k="1">假如同时吸合</button>
      </div>
      <div class="nums three">
        <div class="num hi"><div class="k">结果</div><div class="v" id="s4a">正常运行</div></div>
        <div class="num"><div class="k">尾端</div><div class="v" id="s4b">接回相线</div></div>
        <div class="num"><div class="k">后果</div><div class="v" id="s4c">没事</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">两道电气互锁，互相卡住对方</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>这对触点</th><th>串在哪条支路里</th><th>意思是</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">KMY-2<br>（动断）</td><td>KM△ 的线圈支路</td>
          <td><b>只要 KMY 还吸着，KM△ 就通不了电</b>（书上 ④-2）</td></tr>
        <tr><td class="eu-s">KM△-4<br>（动断）</td><td>KMY 的线圈支路</td>
          <td><b>只要 KM△ 还吸着，KMY 就通不了电</b>（书上 ⑨-4）</td></tr>
      </tbody>
    </table></div>
    <div class="tip"><b>这叫互锁（联锁）。</b>做法就一句话：
      <b>把对方的动断辅助触点，串进自己的线圈支路里。</b>
      9.2 屏 4 提过一次，这里是它第一次真正用上。<b>下一节反接制动、11.6 正反转，
      用的是一模一样的两条。</b></div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">为什么光靠 KT 的「一断一合」还不够</div>
    <div class="tip info">KT-1 断开和 KT-2 闭合是<b>同一刻</b>发生的，可
      <b>接触器的触点是有惯性的</b> —— KMY 的线圈失电之后，衔铁靠弹簧弹回来要几十毫秒，
      这期间它的主触头还闭着。要是这时候 KM△ 已经吸上了，就短路了。
      <b>KMY-2 那对动断触点保证的正是这件事</b>：KMY 的衔铁不完全释放，
      KMY-2 就不闭合，KM△ 的线圈就得不到电。
      <b>「先断后合」不是靠时间赌出来的，是靠机械结构保证的。</b></div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">现场还有一道「机械互锁」</div>
    <div class="tip">好一点的接触器可以装一个<b>机械联锁附件</b>，把两只接触器扣在一起，
      <b>一只吸下去，另一只在物理上就压不下去了</b>。
      电气互锁防的是「控制回路接错或触点粘连」，机械互锁防的是「电气互锁也失效了」。
      <b>星三角、正反转这两种柜子，现场基本都是电气＋机械双重互锁。</b>
      检修换接触器的时候<b>别把这个附件拆了不装回去。</b></div>
  </div>

  <div class="quiz" data-quiz="11.4">
    <div class="qz" data-q="Y 接起动时，电网看到的线电流是 △ 直接起动的多少？"
      data-opts="1/√3（约 58%）|1/3|1/2" data-right="1"
      data-why="正好 1/3。别只算电压：△ 接的线电流是相电流的 √3 倍，Y 接的线电流就等于相电流 —— 正是这个 √3 把「电压降到 58%」变成了「电流降到 33%」。起动转矩同样是 1/3（正比于相电压的平方）。两个都是 1/3。"></div>
    <div class="qz" data-q="什么样的电动机才能做星三角起动？"
      data-opts="任何三相电动机都行|正常运行是 △ 接、且接线盒里引出六个端子的|只有 Y 接运行的" data-right="1"
      data-why="两条缺一不可。星三角是「先降一档、再回到本来的接法」，所以正常运行必须是 △ 接（铭牌上写着 380V/△）；而且必须能把 U2 V2 W2 单独引出来，只引出三根线的电动机做不了。"></div>
    <div class="qz" data-q="KMY 和 KM△ 要是同时吸合，会发生什么？"
      data-opts="电动机转得更快|相间短路|只是起动慢一点" data-right="1"
      data-why="相间短路。KM△ 把三个尾端分别接到了三根不同的相线上，KMY 又把这三个尾端短接在一起 —— 等于把三相电源直接短路了，合闸瞬间就是弧光和跳闸。这是星三角唯一一件要命的事，所以必须互锁。"></div>
    <div class="qz" data-q="电气互锁具体是怎么做的？"
      data-opts="靠时间继电器把两个动作错开|把对方的动断辅助触点串进自己的线圈支路里|靠人操作时注意别按错" data-right="1"
      data-why="把对方的动断辅助触点串进自己的线圈支路：KMY-2 串在 KM△ 支路里，KM△-4 串在 KMY 支路里。这样只要一只还吸着，另一只的线圈就得不到电。光靠时间错开不行 —— 接触器释放有几十毫秒的机械惯性，那段时间正是危险的。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 11 章 11.4 节（书内 P204~P207）</div>
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
/* 控制图零件（和 9.1 / 11.3 同一套） */
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
/* 延时触点：动合/动断 + 一把伞。朝向不拿来教东西（2.3 那条） */
function ktC(g, x, y, on, nc){
  if(nc) ncC(g, x, y, on, 0.95); else noC(g, x, y, on, 0.95);
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.3; g.lineCap = 'round';
  g.beginPath(); g.arc(x - 1, y - 2, 8, Math.PI, Math.PI*2); g.stroke();
  g.beginPath(); g.moveTo(x - 9, y - 2); g.lineTo(x + 7, y - 2); g.stroke();
  g.restore();
}
/* 一个绕组：一段带三个半圆的线（和 EP.coil 不同，这里要能斜着画） */
function wind(g, x0, y0, x1, y1, col){
  const dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy), a = Math.atan2(dy, dx);
  g.save(); g.translate(x0, y0); g.rotate(a);
  g.strokeStyle = col || P.ink; g.lineWidth = 1.8; g.lineCap = 'round';
  const pad = (len - 36) / 2;
  g.beginPath(); g.moveTo(0, 0); g.lineTo(pad, 0); g.stroke();
  for(let i = 0; i < 3; i++){
    g.beginPath(); g.arc(pad + 6 + i * 12, 0, 6, Math.PI, 0, false); g.stroke();
  }
  g.beginPath(); g.moveTo(pad + 36, 0); g.lineTo(len, 0); g.stroke();
  g.restore();
}

/* 触点：沿 ang 方向画一个触点（两个端点 + 一根动臂）。
   绕组图上的触点是斜的，竖向的 noC 用不了，所以另写这一个 */
function contactAt(g, cx, cy, ang, on){
  const ca = Math.cos(ang), sa = Math.sin(ang);
  g.save(); g.translate(cx, cy); g.rotate(ang);
  g.strokeStyle = P.ink; g.lineWidth = 1.7; g.lineCap = 'round';
  g.beginPath(); g.moveTo(-10, 0);
  if(on) g.lineTo(10, 0); else g.lineTo(8, -9);
  g.stroke(); g.restore();
  dot(g, cx - 10*ca, cy - 10*sa, P.ink, 2.3);
  dot(g, cx + 10*ca, cy + 10*sa, P.ink, 2.3);
}

/* ================================================================
   这一节的数字（出处见文件头）
   ================================================================ */
const UD = 380, UY = 220;      /* 每相绕组承受的电压（书上原文） */
const ID = 90, IY = 30;        /* 线电流：△ 直接起动 6 倍额定 / Y 起动 1/3 */
const TD = 2.0, TY = 2.0/3;    /* 起动转矩，相对额定 */
const TL = 0.6;                /* 负载转矩 */

/* ================================================================
   绕组几何：Y 形 / △ 形 / 都断开 / 同时吸合（短路）
   ================================================================
   屏 2 和屏 4 共用。**同样三个绕组，只是接法变了** —— 两种画法的
   三个外接点 A/B/C 位置完全一样，差别才跳得出来（书上图 11-11 也是这么画的）。*/
function triFig(g, kind, dy){
  const A = [56, 72 + dy], B = [284, 72 + dy], Cc = [170, 228 + dy], N = [170, 128 + dy];
  /* 三相引入线：L3 从右边绕下去，不跨任何东西。
     **两只都断的时候这三段要画成警示色** —— 这一档的落点就是「首端一直带电」，
     画成中性灰的话，图就没把那句话说出来 */
  const lc = kind === 'OFF' ? C.warn : C.wire;
  const lw = kind === 'OFF' ? 2.6 : 2;
  seg(g, [[A[0], 40 + dy],[A[0], A[1]]], lc, lw);
  seg(g, [[B[0], 40 + dy],[B[0], B[1]]], lc, lw);
  seg(g, [[330, 40 + dy],[330, 250 + dy],[Cc[0], 250 + dy],[Cc[0], Cc[1]]], lc, lw);
  if(kind === 'OFF') EP.chip(g, '这三段一直带 380 V', 170, 50 + dy, {sz:8.5, b:1, c:C.warn});
  txt(g, 'L1', A[0], 32 + dy, {sz:8.5, b:1, c:C.tx3});
  txt(g, 'L2', B[0], 32 + dy, {sz:8.5, b:1, c:C.tx3});
  txt(g, 'L3', 330, 32 + dy, {sz:8.5, b:1, c:C.tx3});

  function unit(p, q){
    const dx = q[0]-p[0], dy2 = q[1]-p[1], L = Math.hypot(dx, dy2);
    return [dx/L, dy2/L, L];
  }
  if(kind === 'D' || kind === 'SHORT'){
    /* △：三条边各一个绕组，靠一端串一对 KM△-1 的主触头 */
    const edges = [[A, B, B], [B, Cc, Cc], [A, Cc, Cc]];
    edges.forEach(function(e){
      const p = e[0], q = e[1], near = e[2];
      const far = (near === q) ? p : q;
      const u = unit(near, far);
      const cx = near[0] + u[0]*40, cy = near[1] + u[1]*40;
      const wx = near[0] + u[0]*50, wy = near[1] + u[1]*50;
      wind(g, far[0], far[1], wx, wy);
      seg(g, [[cx + u[0]*10, cy + u[1]*10],[wx, wy]], C.wire, 1.8);
      seg(g, [[near[0], near[1]],[cx - u[0]*10, cy - u[1]*10]], C.wire, 1.8);
      contactAt(g, cx, cy, Math.atan2(u[1], u[0]), true);
    });
    EP.chip(g, 'KM△-1', 206, 46 + dy, {sz:8.5, c:C.acc});
    if(kind === 'SHORT'){
      /* KMY 也吸着：三个尾端又被短接到星点 —— 三根相线当场连到了一起 */
      [A, B, Cc].forEach(function(p){
        seg(g, [[p[0], p[1]],[N[0], N[1]]], C.err, 2.4);
      });
      dot(g, N[0], N[1], C.err, 6);
      EP.chip(g, '三相被连到了一起', N[0], N[1] + 22, {sz:9, b:1, c:C.err});
    }
  } else {
    /* Y：三条臂汇到星点，每条臂上一对 KMY-1 的主触头 */
    [A, B, Cc].forEach(function(p){
      const u = unit(p, N);
      const cx = N[0] - u[0]*42, cy = N[1] - u[1]*42;
      const wx = N[0] - u[0]*52, wy = N[1] - u[1]*52;
      wind(g, p[0], p[1], wx, wy);
      seg(g, [[wx, wy],[cx - u[0]*10, cy - u[1]*10]], C.wire, 1.8);
      contactAt(g, cx, cy, Math.atan2(u[1], u[0]), kind === 'Y');
      if(kind === 'Y') seg(g, [[cx + u[0]*10, cy + u[1]*10],[N[0], N[1]]], C.wire, 1.8);
    });
    if(kind === 'Y'){
      dot(g, N[0], N[1], C.acc, 5);
      g.save(); g.setLineDash([2,2]); g.strokeStyle = C.acc; g.lineWidth = .9;
      g.beginPath(); g.moveTo(248, 166); g.lineTo(184, 143); g.stroke(); g.restore();
      EP.chip(g, 'U2 V2 W2 短接成星点', 300, 172, {sz:8.5, c:C.acc, al:'right'});
      g.save(); g.setLineDash([2,2]); g.strokeStyle = C.acc; g.lineWidth = .9;
      g.beginPath(); g.moveTo(122, 172); g.lineTo(157, 170); g.stroke(); g.restore();
      EP.chip(g, 'KMY-1', 92, 172, {sz:8.5, c:C.acc, al:'left'});
    } else {
      EP.chip(g, '三个尾端悬空', N[0], N[1] + 6, {sz:9, b:1, c:C.warn});
    }
  }
  dot(g, A[0], A[1], P.ink, 3); dot(g, B[0], B[1], P.ink, 3); dot(g, Cc[0], Cc[1], P.ink, 3);
  txt(g, 'U1', A[0] + 12, A[1] - 14 + dy*0, {sz:8.5, c:C.tx3, al:'left'});
  txt(g, 'V1', B[0] - 12, B[1] - 14, {sz:8.5, c:C.tx3, al:'right'});
  txt(g, 'W1', Cc[0] - 12, Cc[1] + 12, {sz:8.5, c:C.tx3, al:'right'});
}

/* ================================================================
   场景 1：每相绕组分到多少伏
   ================================================================ */
const st1 = new Stage('cv0', 360, 240);
const S1 = { k:0 };
function draw1(){
  const g = st1.g; st1.clear();
  const y = S1.k === 0;
  EP.heading(g, 14, 16, y ? 'Y 接：每相 220 V' : '△ 接：每相 380 V', '同样三个绕组');

  /* 左边：绕组接法示意（书上图 11-11 那两张） */
  const A = [38, 78], B = [132, 78], Cc = [85, 176], N = [85, 122];
  if(y){
    [A, B, Cc].forEach(function(p){
      const dx = N[0]-p[0], dy = N[1]-p[1], Lz = Math.hypot(dx, dy);
      wind(g, p[0], p[1], N[0] - dx/Lz*6, N[1] - dy/Lz*6, C.acc);
    });
    dot(g, N[0], N[1], C.acc, 4.5);
    EP.chip(g, '220 V', 62, 100, {sz:8.5, c:C.volt, al:'right'});
    EP.chip(g, '380 V', 85, 62, {sz:8.5, c:C.tx2});
  } else {
    wind(g, A[0], A[1], B[0], B[1], C.acc);
    wind(g, B[0], B[1], Cc[0], Cc[1], C.acc);
    wind(g, Cc[0], Cc[1], A[0], A[1], C.acc);
    EP.chip(g, '380 V', 85, 62, {sz:8.5, c:C.volt});
    EP.chip(g, '380 V', 132, 130, {sz:8.5, c:C.volt, al:'left'});
  }
  [A, B, Cc].forEach(function(p, i){ dot(g, p[0], p[1], P.ink, 3.2);
    txt(g, 'L' + (i+1), p[0] + (i===1 ? 12 : (i===0 ? -12 : 12)), p[1] + (i===2 ? 8 : -8),
      {sz:8, c:C.tx3, al: i===0 ? 'right' : 'left'}); });

  /* 右边三个条 */
  const BX0 = 168, BX1 = 302;
  function bar(yy, label, val, frac, col, mark){
    txt(g, label, BX0, yy - 8, {sz:9, c:C.tx2, al:'left'});
    box(g, BX0, yy, BX1 - BX0, 15, 3, C.box, C.boxLine, 1);
    const w = Math.max(2, (BX1 - BX0) * Math.max(0, Math.min(1, frac)));
    box(g, BX0, yy, w, 15, 3, col, null, 0);
    txt(g, val, BX1 + 6, yy + 7, {sz:9.5, b:1, c:col, al:'left'});
    if(mark !== undefined) seg(g, [[BX0 + (BX1-BX0)*mark, yy - 3],[BX0 + (BX1-BX0)*mark, yy + 18]], C.err, 1.4);
  }
  bar(62, '每相绕组承受', (y ? UY : UD) + ' V', (y ? UY : UD)/UD, C.volt);
  bar(112, '线电流', (y ? IY : ID) + ' A', (y ? IY : ID)/ID, C.cur);
  bar(162, '起动转矩', (y ? TY : TD).toFixed(2) + ' 倍', (y ? TY : TD)/TD, C.ok, TL/TD);
  txt(g, '红线 = 负载要的 0.6 倍', BX1 + 6, 186, {sz:8, c:C.err, al:'right'});

  if(y) conc(g, 196, 'acc', 'Y 接：电压 58 % ，但电流和转矩都只剩 1/3',
    '起动转矩 0.67 倍，只比负载要的 0.6 倍高一点点');
  else conc(g, 196, 'ok', '△ 接：这是它正常运行的接法，每相 380 V',
    '直接这么合闸就是直接起动 —— 线电流 90 A，6 倍额定');

  $('s1a').textContent = (y ? UY : UD) + ' V';
  $('s1b').textContent = (y ? IY : ID) + ' A';
  $('s1c').textContent = (y ? TY : TD).toFixed(2) + ' 倍';
}
function note1(){
  $('n0').innerHTML = S1.k === 0
    ? '<b>Y 接（起动用）</b>：三个绕组的尾端接在一起成星点，每相只承受 <b>220 V</b>'
      + '（书上原文）。线电流降到 <b>30 A</b>，起动转矩降到 <b>0.67 倍额定</b> —— '
      + '<b>两个都正好是 1/3。</b> 注意转矩这一条：0.67 只比负载要的 0.6 高一点点，'
      + '<b>再重一点就起不来了。</b>'
    : '<b>△ 接（运行用）</b>：三个绕组首尾相接成三角形，每相承受<b>全部的 380 V</b>'
      + '（书上原文）。这是它铭牌上写的正常接法，转矩、功率都是额定值。'
      + '<b>起动完成后必须切回这一档</b> —— 一直用 Y 接跑，电压只有 58%，'
      + '转矩只有 1/3，带不动额定负载，而且电流会一直偏大、绕组发热。';
}

/* ================================================================
   场景 2：两只接触器就是那几块连接片
   ================================================================ */
const st2 = new Stage('cv1', 360, 302);
const S2 = { k:0 };
const KIND2 = ['Y', 'D', 'OFF'];
function draw2(){
  const g = st2.g; st2.clear();
  const k = KIND2[S2.k];
  EP.heading(g, 14, 16,
    k === 'Y' ? 'KMY 吸合 → Y 形' : (k === 'D' ? 'KM△ 吸合 → △ 形' : '两只都断开'),
    '同样三个绕组');
  triFig(g, k, 0);
  if(k === 'Y') conc(g, 258, 'acc', 'Y 形：三个尾端被 KMY-1 短接成一个星点',
    '每相绕组只承受 220 V —— 减压起动');
  else if(k === 'D') conc(g, 258, 'ok', '△ 形：KM△-1 把每个尾端接回另一相的相线',
    '每相绕组承受 380 V —— 全压运行');
  else conc(g, 258, 'warn', '两只都断：尾端悬空，回路不闭合，电动机停转',
    '但首端 U1 V1 W1 仍然带着 380 V —— 只要 QF 还合着');

  const a = k === 'Y' ? 'Y 形' : (k === 'D' ? '△ 形' : '断开');
  const b = k === 'Y' ? '220 V' : (k === 'D' ? '380 V' : '不通电');
  const c = k === 'Y' ? '减压起动' : (k === 'D' ? '全压运行' : '停转');
  $('s2a').textContent = a; $('s2b').textContent = b; $('s2c').textContent = c;
}
function note2(){
  const k = KIND2[S2.k];
  let h;
  if(k === 'Y') h = '<b>KMY-1 的三对主触头闭合</b>，把 U2、V2、W2 接到一起 —— '
    + '这就是接线盒里<b>横着两块连接片</b>干的活（2.7 节）。'
    + '三个绕组成了星形，每相 <b>220 V</b>，电动机减压起动。';
  else if(k === 'D') h = '<b>KM△-1 的三对主触头闭合</b>，把每个尾端接回另一相 —— '
    + '这就是<b>竖着三块连接片</b>干的活。三个绕组首尾相接成三角形，'
    + '每相 <b>380 V</b>，电动机全压运行。<b>这才是它铭牌上的正常接法。</b>';
  else h = '两只接触器都释放了，<b>三个尾端悬空</b>，绕组回路不闭合，'
    + '所以没有电流、电动机停转。'
    + '<b class="rd">但注意：首端 U1 V1 W1 还接在相线上，一直带着 380 V。</b>'
    + '书上这个电路只有两只接触器，停机时电源并没有被真正切断 —— '
    + '这也是现场更常用<b>三只接触器</b>（前面多一只主接触器）的原因。'
    + '<b>不管哪一版，检修前都得断 QF、验电、挂牌（3.5 节）。</b>';
  $('n1').innerHTML = h;
}

/* ================================================================
   场景 3：控制电路，点起动看全过程
   ================================================================ */
const st3 = new Stage('cv2', 360, 324);
const CT3 = 50, CB3 = 280, SUB = 100;   /* 上母线 / 下母线 / K-3 之后的副母线 */
const KX = 56, K2X = 26, K3X = 150, KTX = 170, KYX = 245, KDX = 315;
const KT_D = 3;
const S3 = { run:false, t:0, done:false };
function w3(g, pts, live, lw){ seg(g, pts, live ? C.acc : C.wire, lw || 1.8); }
function draw3(dt){
  const g = st3.g; st3.clear();
  if(dt && S3.run){
    S3.t = Math.min(KT_D, S3.t + dt);
    if(S3.t >= KT_D && !S3.done){ S3.done = true; note3(); }
  }
  const run = S3.run, ktDone = S3.done;
  const yOn = run && !ktDone, dOn = run && ktDone, ktLive = run && !dOn;
  EP.heading(g, 14, 16, '星三角控制电路', '图 11-12（省掉三个指示灯）');

  w3(g, [[20, CT3],[340, CT3]], true, 2);
  w3(g, [[20, CB3],[340, CB3]], true, 2);
  txt(g, 'FU1', 20, CT3 - 9, {sz:8.5, c:C.tx3, al:'left'});
  txt(g, 'FU2', 20, CB3 - 11, {sz:8.5, c:C.tx3, al:'left'});

  /* ---- K 支路：起动 / 停止 / 自锁 ---- */
  w3(g, [[KX, CT3],[KX, 63]], true);
  ncC(g, KX, 76, false, 0.9);
  txt(g, 'FR-1', 44, 76, {sz:8.5, b:1, c:C.tx3, al:'right'});
  w3(g, [[KX, 89],[KX, 96]], true);
  btn(g, KX, 110, true, false);
  txt(g, 'SB2', 44, 110, {sz:8.5, b:1, c:C.tx3, al:'right'});
  w3(g, [[KX, 124],[KX, 134]], true);
  btn(g, KX, 148, false, false);
  txt(g, 'SB1', 82, 148, {sz:8.5, b:1, c:C.tx3, al:'left'});
  w3(g, [[KX, 132],[K2X, 132],[K2X, 134]], true, 1.6);
  noC(g, K2X, 148, run, 0.9);
  w3(g, [[K2X, 162],[K2X, 164],[KX, 164]], run, 1.6);
  txt(g, 'K-2', K2X, 180, {sz:8.5, b:1, c: run ? C.acc : C.tx3});
  dot(g, KX, 132, C.wire, 2.4); dot(g, KX, 164, C.wire, 2.4);
  w3(g, [[KX, 162],[KX, 180]], run);
  coil(g, KX, 200, run, 'K');
  w3(g, [[KX, 220],[KX, CB3]], run);

  /* ---- K-3 把右边三条支路的电源接通 ---- */
  w3(g, [[K3X, CT3],[K3X, 63]], true);
  noC(g, K3X, 76, run, 0.9);
  txt(g, 'K-3', 162, 76, {sz:8.5, b:1, c: run ? C.acc : C.tx3, al:'left'});
  w3(g, [[K3X, 89],[K3X, SUB],[KDX, SUB]], run, 2);
  dot(g, KTX, SUB, C.wire, 2.4); dot(g, KYX, SUB, C.wire, 2.4);

  /* ---- KT 支路 ---- */
  w3(g, [[KTX, SUB],[KTX, 117]], run);
  ncC(g, KTX, 130, dOn, 0.9);
  txt(g, 'KM△-5', 158, 130, {sz:8.5, b:1, c: dOn ? C.err : C.tx3, al:'right'});
  w3(g, [[KTX, 143],[KTX, 180]], ktLive);
  coil(g, KTX, 200, ktLive, 'KT');
  w3(g, [[KTX, 220],[KTX, CB3]], ktLive);

  /* ---- KMY 支路 ---- */
  w3(g, [[KYX, SUB],[KYX, 117]], run);
  ktC(g, KYX, 130, ktDone, true);
  txt(g, 'KT-1', 233, 130, {sz:8.5, b:1, c: ktDone ? C.err : C.tx3, al:'right'});
  w3(g, [[KYX, 143],[KYX, 157]], run && !ktDone);
  ncC(g, KYX, 170, dOn, 0.9);
  txt(g, 'KM△-4', 233, 170, {sz:8.5, b:1, c: dOn ? C.err : C.tx3, al:'right'});
  w3(g, [[KYX, 183],[KYX, 205]], yOn);
  coil(g, KYX, 225, yOn, 'KMY');
  w3(g, [[KYX, 245],[KYX, CB3]], yOn);

  /* ---- KM△ 支路 ---- */
  w3(g, [[KDX, SUB],[KDX, 117]], run);
  ktC(g, KDX, 130, ktDone, false);
  txt(g, 'KT-2', 303, 130, {sz:8.5, b:1, c: ktDone ? C.acc : C.tx3, al:'right'});
  w3(g, [[KDX, 143],[KDX, 157]], run && ktDone);
  ncC(g, KDX, 170, yOn, 0.9);
  txt(g, 'KMY-2', 303, 170, {sz:8.5, b:1, c: yOn ? C.err : C.tx3, al:'right'});
  w3(g, [[KDX, 183],[KDX, 205]], dOn);
  coil(g, KDX, 225, dOn, 'KM△');
  w3(g, [[KDX, 245],[KDX, CB3]], dOn);

  if(!run) conc(g, 290, 'warn', '停着 —— 按「起动 SB1」看整个过程',
    '注意 KT-1 是动断、KT-2 是动合，一只 KT 就把先后办成了');
  else if(!ktDone) conc(g, 290, 'acc', 'Y 起动中：KMY 吸着，KMY-2 把 KM△ 那条路堵死了',
    'KT 正在数秒，KM△-4 那一头也堵着反方向');
  else conc(g, 290, 'ok', '△ 运行：KT-1 断开让 KMY 释放，KT-2 闭合让 KM△ 吸合',
    'KM△-5 顺手把 KT 也断了 —— 它的活干完了');

  const a = !run ? '停着' : (ktDone ? '△ 运行' : 'Y 起动');
  const b = !run ? '—' : (ktDone ? '到了' : (KT_D - S3.t).toFixed(1) + ' s');
  const c = !run ? '都没有' : (ktDone ? 'KM△' : 'KMY');
  if(S3.la !== a){ S3.la = a; $('s3a').textContent = a; }
  if(S3.lb !== b){ S3.lb = b; $('s3b').textContent = b; }
  if(S3.lc !== c){ S3.lc = c; $('s3c').textContent = c; }
}
function note3(){
  let h;
  if(!S3.run) h = '所有触点画的都是<b>未操作状态</b>（4.3 那条第一原则）。'
    + '看清楚 <b>KT-1 是动断</b>（现在闭着，所以 KMY 一有电就能吸）、'
    + '<b>KT-2 是动合</b>（现在断着，所以 KM△ 一开始通不了）。'
    + '<b>一只时间继电器、一对动断加一对动合，先后顺序就定死了。</b>';
  else if(!S3.done) h = '<b>③④ K 得电 → K-3 闭合 → 右边三条支路有电 → KMY 得电。</b>'
    + '电动机接成 Y 形减压起动，同时 KT 开始数秒。'
    + '<b>注意 KM△ 那条支路上的 KMY-2 已经断开了</b> —— '
    + '只要 KMY 还吸着，KM△ 就绝对通不了电。<b>这就是互锁，下一屏专讲。</b>';
  else h = '<b>⑦⑧⑨ KT 到点了。</b>KT-1（动断）延时断开 → <b>KMY 立刻释放</b>；'
    + 'KT-2（动合）延时闭合 → KMY-2 恢复闭合之后，<b>KM△ 才得电</b>。'
    + '电动机换成 △ 形全压运行。<b>KM△-5 顺手把 KT 的线圈也断了</b>（⑨-5）—— '
    + '它的活干完了，也为下一次起动重新计时做好准备。';
  $('n2').innerHTML = h;
}

/* ================================================================
   场景 4：两只同时吸合会怎么样
   ================================================================ */
const st4 = new Stage('cv3', 360, 302);
const S4 = { k:0 };
function draw4(){
  const g = st4.g; st4.clear();
  const bad = S4.k === 1;
  EP.heading(g, 14, 16, bad ? 'KMY 和 KM△ 同时吸合' : '正常：先断后合', '△ 接法');
  triFig(g, bad ? 'SHORT' : 'D', 0);
  if(bad) conc(g, 258, 'err', '相间短路：三根相线被 KMY 直接连到了一起',
    '合闸那一瞬间就是弧光和跳闸，接触器基本报废');
  else conc(g, 258, 'ok', '正常：KMY 已经完全释放，KM△ 才吸上',
    '两只接触器在任何一刻都不会同时吸着');
  $('s4a').textContent = bad ? '相间短路' : '正常运行';
  $('s4b').textContent = bad ? '又被短接' : '接回相线';
  $('s4c').textContent = bad ? '弧光跳闸' : '没事';
}
function note4(){
  $('n3').innerHTML = S4.k === 1
    ? '<b>看那三条红线。</b>KM△ 已经把 U2 接到了 L2、V2 接到 L3、W2 接到 L1，'
      + '这时候 KMY 又把 U2、V2、W2 短接在一起 —— <b>等于把 L1、L2、L3 三根相线'
      + '直接连到了一个点上。</b>这就是<b>相间短路</b>，'
      + '合闸那一瞬间的电流是几千安，弧光、跳闸、接触器触头当场烧熔。'
      + '<b>星三角柜出的大事故，几乎全是这一条。</b>'
    : '<b>正常的顺序是：KMY 先完全释放，KM△ 才吸合。</b>'
      + '三个尾端只接回相线，没有别的通路，电流规规矩矩地在三角形里走。'
      + '<b>怎么保证「先断后合」？</b>不是靠时间赌 —— 是靠两对动断触点'
      + '（KMY-2 和 KM△-4）互相卡着对方。<b>点另一个按钮看反面例子。</b>';
}

/* ================================================================
   绑定
   ================================================================ */
function pick(id, st, fn){
  $(id).addEventListener('click', function(e){
    const b = e.target.closest('.btn'); if(!b) return;
    st.k = +b.dataset.k;
    document.querySelectorAll('#' + id + ' .btn').forEach(function(t){
      t.classList.toggle('on', +t.dataset.k === st.k);
    });
    fn();
  });
}
pick('s1k', S1, function(){ note1(); draw1(); });
pick('s2k', S2, function(){ note2(); draw2(); });
pick('s4k', S4, function(){ note4(); draw4(); });
$('s3k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  const go = b.dataset.k === 'go';
  S3.run = go; S3.t = 0; S3.done = false;
  document.querySelectorAll('#s3k .btn').forEach(function(t){
    t.classList.toggle('on', t.dataset.k === 'go' && go);
  });
  note3();
});

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会清空。只有屏 3 在 rAF 里，其余三屏必须在这儿补画 */
  draw1(); draw2(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:11, sec:'11.4'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('11.4');
  let h = '';
  h += nb.prev && nb.prev.f ? '<a href="' + nb.prev.f + '">‹ ' + nb.prev.id + ' ' + nb.prev.t + '</a>'
                            : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next && nb.next.f ? '<a class="next" href="' + nb.next.f + '">' + nb.next.id + ' ' + nb.next.t + ' ›</a>'
                            : '<span>下一节还没做</span>';
  $('pager').innerHTML = h;
})();

loop(function(dt){ if(cur === 2) draw3(dt); });
  }
});
})();
