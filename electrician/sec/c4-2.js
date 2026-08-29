/* 4.2 文字符号 —— 本节内容的唯一真相。
   对应《零基础学电工》第 4 章 4.1 节（书内 P64~P69）。

   书上这一节分四小段：基本文字符号（单字母/双字母，23 大类）、辅助文字符号、
   组合文字符号（字母＋数字）、专用文字符号（相序、端子、导线颜色、仪表）。
   我按**「图上那串字母怎么念」**排四屏：

   ① 字母＋数字的规则   拿一张点动控制图，点元件看它的编号怎么来的
   ② 基本文字符号       六个大类的派生树：双字母 = 大类字母 + 一个补充字母
   ③ 辅助文字符号       ST / STP / ON / OFF / FW / AC / DC / PE 这一类
   ④ 专用文字符号       L1L2L3 vs UVW、N 与 PE、导线颜色代号

   **这一节的眼在屏 1 那条规则**（书上 P67~68 讲的组合文字符号）：
   - **FU1 / FU2 / FU3** —— 直接跟数字，是**同一类里的第 1、2、3 个**，
     数字的最大值就是这张图上这类器件的总数
   - **KM / KM-1 / KM-2** —— 带横杠，是**同一个器件被拆开画的几个部分**
     （KM 是线圈、KM-1 是主触头、KM-2 是辅助触头，实物是同一个接触器）
   这条直接给 4.5「原理图 ↔ 接线图」打底，也是新手在图上最容易看岔的地方。
   **不同图纸的标注习惯略有出入**（有的把第一个接触器写 KM1、它的触头写 KM1-1），
   所以文案里钉了一句「以那张图自己的图例为准」。

   数字口径与出处（书上都有原图，别凭记忆改）：
   - 单字母把电气设备划分为 **23 大类**（书 P64 提示说明）
   - 双字母 = **表示种类的单字母在前** + 另一个字母。书上举的例：
     G 电源类 → GB 蓄电池（B = Battery）；T 变压器类 → TA 电流互感器（A = Ammeter）
   - 辅助文字符号由英文单词前一两位字母构成，**一般不超过三个字母**；
     **START 取 ST，STOP 就必须取 STP** —— 因为 ST 已经被启动占了（书 P66 原文）
   - 可以单独使用的辅助符号：**N 中性线、DC 直流、AC 交流、PE 保护接地**（书 P66 原文）
   - 专用符号：**L1/L2/L3 是交流系统电源的三相，U/V/W 是交流系统设备的三相**（书 P68 图 4-6）
   - 颜色代号：RD 红 / YE 黄 / GN 绿 / BU 蓝 / BK 黑 / BN 棕 / GNYE 绿黄 / WH 白（书 P68 图 4-7）

   **各字母对应的器件一律照书上的图取，没把握的不写**：
   KM 接触器、KA 中间继电器、KT 时间继电器、KV 电压继电器、KS 速度继电器、KP 压力继电器
   都能在书上图 4-11 / 4-12 的标注里直接找到；FR 热继电器在图 4-11 上明写着。
   图 4-2 那张大表里有几格中文名和文字符号的对应关系印得很挤、读不确定，
   那些**没有写进课文**。 */
(function(){
'use strict';
ELEC.reg({
  id: '4.2',
  file: 'c4-2.html',
  title: '4.2 文字符号',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>字母＋数字</button>
    <button class="tab" data-i="1"><span class="n">2</span>基本符号</button>
    <button class="tab" data-i="2"><span class="n">3</span>辅助符号</button>
    <button class="tab" data-i="3"><span class="n">4</span>专用符号</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">字母表示种类，数字表示第几个</div>
    这是一张<b>电动机点动控制</b>的原理图 —— 第 4.4 节要整张读的就是它，先在这儿混个脸熟。
    图上每个器件旁边都有一串字母数字，<b>那不是随便编的号</b>。
    <b>点图上的器件（或下面的按钮）看它怎么念。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">QS</button>
        <button class="btn sm" data-k="1">FU1~FU3</button>
        <button class="btn sm" data-k="2">KM / KM-1</button>
        <button class="btn sm" data-k="3">SB</button>
        <button class="btn sm" data-k="4">M</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">字母<br>是什么</div><div class="v" id="s1a">Q 电力开关</div></div>
        <div class="num"><div class="k">数字<br>是什么</div><div class="v" id="s1b">没有数字</div></div>
        <div class="num hi"><div class="k">这个<br>器件</div><div class="v" id="s1c">隔离开关</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">数字有两种写法，意思完全不同</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>写法</th><th>例</th><th>意思</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">直接<br>跟数字</td><td><b>FU1 FU2 FU3</b></td>
          <td>同一类里的<b>第 1、2、3 个</b>。<b>数字的最大值＝这张图上这类器件一共有几个</b></td></tr>
        <tr><td class="eu-s">带一<br>道横杠</td><td><b>KM　KM-1　KM-2</b></td>
          <td>同一个器件<b>被拆开画的几个部分</b>：KM 是线圈、KM-1 是主触头、KM-2 是辅助触头 ——
          <b>实物是同一个接触器</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>「同一个器件画在图上两个地方」是新手最大的坎。</b>
      线圈画在控制电路里、主触头画在主电路里，隔着大半张图，可它们是同一只接触器上的东西 ——
      线圈一得电，那边的主触头就跟着闭合。<b>第 4.5 节整节都在讲这件事。</b>
      <span class="sub">不同图纸的习惯略有出入（有的把第一个接触器写 KM1、它的触头写 KM1-1）。
      <b>拿到图先翻图例</b>，以那张图自己的说明为准。</span>
    </div>
  </div>

  <div class="bet" data-bet="c42-num" data-q="一张图上出现了 KA1、KA2、KA3 三个文字符号。这说明什么？"
       data-opts="是同一个继电器的三个触头|这张图上一共有三个中间继电器|KA3 是 KA1 的备用件" data-right="1"
       data-after="三个不同的继电器。直接跟数字＝同一类里的第几个，所以数字最大值 3 就是这张图上中间继电器的总数。要是写成 KA1、KA1-1、KA1-2，那才是同一个继电器 KA1 的线圈和两个触头。"></div>
</section>

<!-- ================= 场景 2：基本文字符号 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">先记住大类字母，剩下的就能猜</div>
    书上把电气设备分成 <b>23 大类</b>，每类一个大写字母。两个字母的符号是
    <b>「大类字母 + 一个补充字母」</b>，而且<b>大类字母永远在前面</b> ——
    所以看到 K 打头就知道是继电器接触器一类，看到 Q 打头就知道是主电路上的开关。
    <b>切一个大类看它派生出什么。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">Q</button>
        <button class="btn sm" data-k="1">F</button>
        <button class="btn sm" data-k="2">K</button>
        <button class="btn sm" data-k="3">S</button>
        <button class="btn sm" data-k="4">M</button>
        <button class="btn sm" data-k="5">T</button>
      </div>
      <div class="nums">
        <div class="num"><div class="k">这一类是</div><div class="v" id="s2a">电力电路的开关</div></div>
        <div class="num hi"><div class="k">怎么记</div><div class="v" id="s2b">主电路上的开关</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">Q 和 S 都是开关，差别在哪儿</div>
    这是这套字母里最容易混的一对，<b>分法不看长相，看它在哪条电路上</b>：
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>管什么</th><th>常见的</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">Q</td><td><b>主电路</b>上的开关 —— 直接通断电动机、设备的大电流</td>
          <td>QF 断路器、QS 隔离开关</td></tr>
        <tr><td class="eu-s">S</td><td><b>控制电路</b>上的开关和选择器 —— 只走很小的信号电流</td>
          <td>SB 按钮、SA 转换开关、SQ 行程开关</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      同一个道理：<b>KM 的线圈在控制电路里，KM-1 主触头在主电路里</b> ——
      接触器就是这两条电路之间的桥（第 2.2 节讲过「用小电流控大电流」）。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">另外几个天天见的</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>字母</th><th>这一类</th><th>常见的</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">E</td><td>杂项</td><td><b>EL 照明灯</b>（4.1 那盏灯就是它）、EH 发热器件</td></tr>
        <tr><td class="eu-s">H</td><td>信号器件</td><td><b>HL 指示灯</b>、HA 声响报警器</td></tr>
        <tr><td class="eu-s">R</td><td>电阻器</td><td>RP 电位器、RT 热敏电阻、RV 压敏电阻</td></tr>
        <tr><td class="eu-s">C</td><td>电容器</td><td>C 电容器</td></tr>
        <tr><td class="eu-s">G</td><td>电源、发电机</td><td>GB 蓄电池（B ＝ Battery）</td></tr>
        <tr><td class="eu-s">X</td><td>端子插头<br>插座</td><td><b>XT 端子板</b>、XP 插头、XS 插座</td></tr>
        <tr><td class="eu-s">W</td><td>线路</td><td><b>WL 照明线路</b>、WP 动力线路（4.1 那张系统图上就是它）</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>补充字母多半是英文单词的首字母</b>，知道了就好记：
      <span class="key">GB 蓄电池 ← Battery</span> <span class="key">TA 电流互感器 ← Ammeter</span>
      <span class="key">FU 熔断器 ← Fuse</span>。
      <span class="sub">但不是每个都能这么拆，拆不出来的就直接记住 —— 常用的也就十几个。</span>
    </div>
  </div>

  <div class="bet" data-bet="c42-qs" data-q="图上有个器件标着 SQ。不查表，你能判断出它大概是什么吗？"
       data-opts="不能，字母是随便编的|能——S 打头，是控制电路上的开关或选择器一类|能，S 表示速度" data-right="1"
       data-after="能猜个大概。S 是「控制电路的开关、选择器」这一大类，所以 SQ 一定是控制电路上的某种开关——它是位置开关（行程开关），机械碰到它就动作。记住大类字母，遇到没见过的双字母也不至于两眼一抹黑。"></div>
</section>

<!-- ================= 场景 3：辅助文字符号 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">基本符号说「是什么」，辅助符号说「干什么、什么状态」</div>
    两个按钮长得一模一样，都是 <b>SB</b>；一个是启动、一个是停止，靠<b>后面跟的辅助符号</b>分开：
    <b>SB ST</b> 和 <b>SB STP</b>。辅助符号取英文单词的前一两位，<b>一般不超过三个字母</b>。
    <b>切一组看看。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">启动与停止</button>
        <button class="btn sm" data-k="1">开关·输入输出</button>
        <button class="btn sm" data-k="2">方向</button>
        <button class="btn sm" data-k="3">能单独用的</button>
      </div>
      <div class="nums">
        <div class="num"><div class="k">这一组</div><div class="v" id="s3a">启动与停止</div></div>
        <div class="num hi"><div class="k">最该记的</div><div class="v" id="s3b">ST / STP</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">为什么停止要写三个字母</div>
    <b>START 和 STOP 的前两位都是 ST。</b>启动先占了 <b>ST</b>，
    停止只好往后多取一位，写成 <b>STP</b>。
    <div class="tip">
      这不是特例，是这套符号的通则：<b>取前一两位，撞车了就多取一位，最多三个字母</b>。
      <span class="sub">所以图上看见 <b>ST</b> 一律是启动、看见 <b>STP</b> 一律是停止，
      不会有第三种可能 —— 这两个是维修时按错就出事的地方，记死。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">四个能自己单独站着的</div>
    大部分辅助符号要跟在基本符号后面（SB ST、KM FW），
    但下面这四个<b>本身意思就完整，可以单独标在图上</b>：
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>符号</th><th>意思</th><th>在图上长这样</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">AC</td><td>交流电</td><td>电源标注写 <b>AC 380 V</b></td></tr>
        <tr><td class="eu-s">DC</td><td>直流电</td><td>控制电源写 <b>DC 24 V</b></td></tr>
        <tr><td class="eu-s">PE</td><td>保护接地</td><td>接地那根线标 <b>PE</b></td></tr>
        <tr><td class="eu-s">N</td><td>中性线</td><td>零线标 <b>N</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>PE 和 N 下一屏还要细讲</b> —— 它们既算辅助文字符号，也算专用文字符号，
      书上两处都列了。<span class="sub">别纠结它归哪一类，记住它标在哪根线上就行。</span>
    </div>
  </div>

  <div class="bet" data-bet="c42-stp" data-q="控制柜面板上两个按钮，一个标 SB1(ST)、一个标 SB2(STP)。哪个是停止？"
       data-opts="SB1，编号小的是停止|SB2——STP 取自 STOP，ST 取自 START|看不出来，得拆开量" data-right="1"
       data-after="SB2。ST 是 START 的前两位＝启动，STP 是 STOP 多取一位＝停止（因为 ST 已经被启动占了）。编号 1、2 只表示这是图上第 1 个、第 2 个按钮，跟功能没关系——功能全在括号里那个辅助符号上。"></div>
</section>

<!-- ================= 场景 4：专用文字符号 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">同一根线，两头叫的名字不一样</div>
    从配电箱出来的三根相线叫 <b>L1 L2 L3</b>，接到电动机接线盒上却标着 <b>U V W</b>。
    <b>它们是同一根线的两头</b> —— 前者是「电源侧」的叫法，后者是「设备侧」的叫法。
    <b>点图上的端子（或下面的按钮）看每一组。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">电源侧 L1L2L3</button>
        <button class="btn sm" data-k="1">设备侧 UVW</button>
        <button class="btn sm" data-k="2">N 与 PE</button>
        <button class="btn sm" data-k="3">导线颜色代号</button>
      </div>
      <div class="nums">
        <div class="num"><div class="k">这一组</div><div class="v" id="s4a">L1 L2 L3</div></div>
        <div class="num hi"><div class="k">用在哪一头</div><div class="v" id="s4b">电源侧</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">这一屏最值钱的一张表</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>符号</th><th>是什么</th><th>在哪一头</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">L1<br>L2<br>L3</td><td>交流系统<b>电源</b>的第一、二、三相</td>
          <td>配电箱、断路器、母线 —— <b>来电的那一侧</b></td></tr>
        <tr><td class="eu-s">U<br>V<br>W</td><td>交流系统<b>设备</b>的第一、二、三相</td>
          <td>电动机接线盒、变频器输出 —— <b>用电的那一侧</b></td></tr>
        <tr><td class="eu-s">N</td><td>中性线（零线）</td><td>单相设备要用；<b>三相电动机不接</b></td></tr>
        <tr><td class="eu-s">PE</td><td>保护接地</td><td><b>接设备金属外壳</b>，任何时候都要接</td></tr>
        <tr><td class="eu-s">PEN</td><td>保护接地与中性线<b>共用一根</b></td>
          <td>老式 TN-C 系统里有；新装一律分开走</td></tr>
        <tr><td class="eu-s">L+<br>L−</td><td>直流电源正极 / 负极</td><td>直流回路、PLC 的 24 V 电源</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>第 2.7 节那个电动机接线盒上印的就是 U1 V1 W1 / U2 V2 W2</b> ——
      现在知道那些字母是哪来的了：<b>U V W 是设备侧的三相</b>，
      下标 1、2 分别是每相绕组的头和尾（星形、三角形就是靠它们连出来的）。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">导线颜色代号 —— 黑白图纸上用字母代替颜色</div>
    图纸大多是黑白印的，颜色分不出来，于是<b>用字母标在线旁边</b>：
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>代号</th><th>颜色</th><th>常用在</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">YE</td><td>黄</td><td rowspan="3">三相相线 L1 L2 L3<br>（黄 绿 红）</td></tr>
        <tr><td class="eu-s">GN</td><td>绿</td></tr>
        <tr><td class="eu-s">RD</td><td>红</td></tr>
        <tr><td class="eu-s">BU</td><td>蓝</td><td>中性线 N</td></tr>
        <tr><td class="eu-s">GNYE</td><td>绿／黄<br>双色</td><td><b>保护接地 PE 专用</b> —— 这一种颜色不许挪作他用</td></tr>
        <tr><td class="eu-s">BK</td><td>黑</td><td>设备内部接线</td></tr>
        <tr><td class="eu-s">BN</td><td>棕</td><td>单相相线常见</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>绿黄双色线只能做 PE，这是硬规矩。</b>拿它当相线或零线用，
      下一个来修的人会照颜色判断「这是地线，安全」，然后被电。
      <span class="sub">代号基本是英文颜色词的头两个字母：RD red、YE yellow、GN green、
      BU blue、BK black、BN brown、WH white。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="c4-2">
    <div class="qz" data-q="图上标着 KM、KM-1、KM-2 三处。这是几个器件？"
         data-opts="三个不同的接触器|一个接触器——KM 是线圈，KM-1、KM-2 是它的触头，只是画在了图上不同的地方|两个：KM 和 KM-1，KM-2 是备用"
         data-right="1"
         data-why="一个。带横杠的写法表示「同一个器件被拆开画的几个部分」：KM 是线圈（画在控制电路里）、KM-1 是主触头（画在主电路里）、KM-2 是辅助触头。线圈一得电，那两处触头同时动作。要是三个不同的接触器，写法应该是 KM1、KM2、KM3——直接跟数字。"></div>
    <div class="qz" data-q="一张图上熔断器编到了 FU5。这说明什么？"
         data-opts="这个熔断器是 5 A 的|这张图上一共有 5 个熔断器|这是第 5 张图上的熔断器"
         data-right="1"
         data-why="一共有 5 个。直接跟数字表示同一类里的第几个，所以数字的最大值就是这类器件在这张图上的总数。规格（多少安）不写在文字符号里，那是另外标注的。"></div>
    <div class="qz" data-q="按钮标着 SB2(STP)，括号里的 STP 是什么意思？为什么不写 ST？"
         data-opts="STP 是型号|STP 取自 STOP＝停止；ST 已经被 START（启动）占了，只好多取一位|STP 表示三极"
         data-right="1"
         data-why="STP＝停止。辅助文字符号取英文单词前一两位、一般不超过三个字母；START 和 STOP 前两位都是 ST，启动先占了 ST，停止就多取一位写成 STP。所以图上 ST 一律是启动、STP 一律是停止。"></div>
    <div class="qz" data-q="从配电箱拉三根线到电动机。配电箱那头标 L1 L2 L3，电动机那头该标什么？"
         data-opts="还是 L1 L2 L3|U V W——L1L2L3 是电源侧的叫法，U V W 是设备侧的叫法，说的是同三根线|A B C"
         data-right="1"
         data-why="U V W。L1/L2/L3 是「交流系统电源」的三相，U/V/W 是「交流系统设备」的三相——同一根线，两头的叫法不同。第 2.7 节电动机接线盒上印的 U1 V1 W1 / U2 V2 W2 就是这么来的：U V W 是三相，下标 1、2 是每相绕组的头和尾。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 4 章 4.1 节（书内 P64~P69）<br>书上那几张大表列了 23 大类的全部，这一节只挑了图纸上真会碰到的</div>
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
   屏 1 要用的几个符号（都是这一节自己画的，EC 里没有）
   ================================================================ */
/* 熔断器：矩形 + 一条贯穿的线。先填 C.box 盖住底下的导线，再补画中间那条 */
function fuseH(g, x, y, o){
  o = o || {};
  const L = 20, W = 9, c = o.color || C.wire;
  box(g, x - L/2, y - W/2, L, W, 1.5, C.box, c, 1.5);
  g.save();
  g.strokeStyle = c; g.lineWidth = 1.3;
  g.beginPath(); g.moveTo(x - L/2, y); g.lineTo(x + L/2, y); g.stroke();
  g.restore();
}
/* 竖直动合触点（KM 的主触头）：上下两个触点 + 一根斜臂。
   点动控制图是「没按按钮」的状态，所以一律画断开 —— 图纸上的符号本来就画未操作状态 */
function contactV(g, x, y, o){
  o = o || {};
  const h = o.h || 24, c = o.color || C.wire;
  const yt = y - h/2, yb = y + h/2;
  g.save();
  g.strokeStyle = c; g.lineWidth = o.lw || 2; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x, yb); g.lineTo(x + 9, yt + 2); g.stroke();
  g.fillStyle = c;
  g.beginPath(); g.arc(x, yt, 2.2, 0, Math.PI*2); g.fill();
  g.beginPath(); g.arc(x, yb, 2.2, 0, Math.PI*2); g.fill();
  g.restore();
}
/* 竖直动合按钮：动合触点 + 左边一根虚线推杆 */
function buttonV(g, x, y, o){
  o = o || {};
  const c = o.color || C.wire;
  contactV(g, x, y, {h:22, color:c, lw:o.lw});
  g.save();
  g.strokeStyle = c; g.lineWidth = 1.2; g.setLineDash([3,3]);
  g.beginPath(); g.moveTo(x + 3, y - 2); g.lineTo(x - 13, y - 2); g.stroke();
  g.restore();
  g.save();
  g.strokeStyle = c; g.lineWidth = 2; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x - 13, y - 8); g.lineTo(x - 13, y + 4); g.stroke();
  g.restore();
}
/* 三极隔离开关：三把斜刀 + 一根虚线连杆（表示三把刀是联动的） */
function knife3(g, x, ys, o){
  o = o || {};
  const c = o.color || C.wire;
  g.save();
  g.strokeStyle = c; g.lineWidth = 2; g.lineCap = 'round';
  ys.forEach(function(y){
    g.beginPath(); g.moveTo(x - 8, y); g.lineTo(x + 12, y - 11); g.stroke();
    g.fillStyle = c;
    g.beginPath(); g.arc(x - 8, y, 2.2, 0, Math.PI*2); g.fill();
    g.beginPath(); g.arc(x + 12, y, 2.2, 0, Math.PI*2); g.fill();
  });
  g.restore();
  g.save();
  g.strokeStyle = c; g.lineWidth = 1.1; g.setLineDash([3,3]);
  g.beginPath(); g.moveTo(x + 12, ys[0] - 11); g.lineTo(x + 12, ys[ys.length-1] - 11); g.stroke();
  g.restore();
}

/* ================================================================
   场景 1：点动控制图上的文字符号
   ================================================================
   三相主电路的横线在上、竖线下引，是标准三相图的画法 ——
   **下引线必然要横穿下面几条相线，交叉处一律不打点**（4.1 刚讲过这条规矩）。
   为了不让「打点 / 不打点」混在一起看不清，L2 的横线在它自己的下引点就终止了，
   控制回路借 L1 和 L3 两条继续往右延伸的横线，两端都接成**拐角**而不是丁字。 */
const Y1 = 54, Y2 = 76, Y3 = 98;        /* 三条相线 */
const D1 = 176, D2 = 194, D3 = 212;     /* 三条下引线 */
const CX = 262, RX = 300;               /* 控制回路：下行 / 回线 */
const MY = 246;                         /* 电动机圆心 y */
const ITEM1 = [
  {n:'QS',      a:'Q　电力开关',   b:'没有数字',       c:'隔离开关',   f:'隔离开关（电源总开关）'},
  {n:'FU1~FU3', a:'F　保护器件',   b:'第 1、2、3 个',  c:'熔断器',     f:'熔断器　三相各一个'},
  {n:'KM/KM-1', a:'K　继电接触器', b:'横杠＝同一器件', c:'接触器',     f:'接触器（线圈 ＋ 主触头）'},
  {n:'SB',      a:'S　控制开关',   b:'没有数字',       c:'按钮',       f:'按钮'},
  {n:'M',       a:'M　电动机',     b:'3~ 是三相交流',  c:'三相电动机', f:'三相异步电动机'}
];
const S1 = { k:0 };
const st1 = new Stage('cv0', 360, 320);

function hi1(i){ return S1.k === i ? C.acc : C.wire; }
function hiT(i){ return S1.k === i ? C.acc : C.tx; }

function draw1(){
  const g = st1.g; st1.clear();
  EP.heading(g, 12, 14, '电动机点动控制', '三相 AC 380 V');

  /* 三条相线：L2 在自己的下引点就断，省掉两处交叉 */
  new Path([[42,Y1],[CX,Y1]]).stroke(g, 2.2, C.wire);
  new Path([[42,Y2],[D2,Y2]]).stroke(g, 2.2, C.wire);
  new Path([[42,Y3],[RX,Y3]]).stroke(g, 2.2, C.wire);
  txt(g, 'L1', 36, Y1, {sz:9.5, b:1, c:C.tx2, al:'right'});
  txt(g, 'L2', 36, Y2, {sz:9.5, b:1, c:C.tx2, al:'right'});
  txt(g, 'L3', 36, Y3, {sz:9.5, b:1, c:C.tx2, al:'right'});

  /* QS 三极隔离开关 */
  knife3(g, 64, [Y1,Y2,Y3], {color:hi1(0)});
  txt(g, 'QS', 64, 28, {sz:11, b:1, c:hiT(0)});

  /* FU1~FU3：三个熔断器错开 x 排，标注才有地方放 */
  const FU = [[100,Y1,'FU1',40],[122,Y2,'FU2',64],[144,Y3,'FU3',86]];
  FU.forEach(function(f){
    fuseH(g, f[0], f[1], {color:hi1(1)});
    txt(g, f[2], f[0], f[3], {sz:9.5, b:1, c:hiT(1)});
  });

  /* 三条下引线 */
  new Path([[D1,Y1],[D1,216]]).stroke(g, 2.2, C.wire);
  new Path([[D2,Y2],[D2,216]]).stroke(g, 2.2, C.wire);
  new Path([[D3,Y3],[D3,216]]).stroke(g, 2.2, C.wire);
  EC.node(g, D1, Y1); EC.node(g, D3, Y3);   /* 丁字要打点；D2 是横线端点，拐角不打点 */

  /* KM-1 三个主触头 */
  [D1,D2,D3].forEach(function(x){ contactV(g, x, 156, {color:hi1(2)}); });
  g.save();
  g.strokeStyle = hi1(2); g.lineWidth = 1.1; g.setLineDash([3,3]);
  g.beginPath(); g.moveTo(D1+9, 146); g.lineTo(D3+9, 146); g.stroke();
  g.restore();
  /* KM-1 的标注只能放三个触头**左边**：右边是控制回路那条竖线和 KM 线圈 */
  txt(g, 'KM-1', 152, 156, {sz:10, b:1, c:hiT(2), al:'right'});
  /* 左下角那一大片是三相图的天然空白，拿来标一句主/控分区（第 4.4 节的伏笔） */
  txt(g, '左边三条 ＝ 主电路', 26, 186, {sz:9, c:C.tx3, al:'left'});
  txt(g, '右边一条 ＝ 控制电路', 26, 200, {sz:9, c:C.tx3, al:'left'});

  /* 电动机 */
  new Path([[D1,216],[180,MY-20]]).stroke(g, 2.2, C.wire);
  new Path([[D2,216],[D2,MY-20]]).stroke(g, 2.2, C.wire);
  new Path([[D3,216],[208,MY-20]]).stroke(g, 2.2, C.wire);
  g.save();
  g.beginPath(); g.arc(D2, MY, 20, 0, Math.PI*2);
  g.fillStyle = C.box; g.fill();
  g.lineWidth = 2; g.strokeStyle = hi1(4); g.stroke();
  g.restore();
  txt(g, 'M', D2, MY - 5, {sz:15, b:1, c:hiT(4)});
  txt(g, '3~', D2, MY + 10, {sz:10, c:hiT(4)});

  /* 控制回路：L1 端点下行 → SB → KM 线圈 → 回线上行 → L3 端点 */
  new Path([[CX,Y1],[CX,190],[RX,190],[RX,Y3]]).stroke(g, 2.2, C.wire);
  buttonV(g, CX, 110, {color:hi1(3)});
  txt(g, 'SB', 244, 110, {sz:10, b:1, c:hiT(3), al:'right'});
  box(g, CX-14, 148, 28, 16, 2, C.box, hi1(2), 2);
  txt(g, 'KM', CX, 132, {sz:10, b:1, c:hiT(2)});

  /* 选中提示 */
  if(S1.k === 0) hot(g, 64, 73, 0, {w:44, h:64, r:8});
  if(S1.k === 1) FU.forEach(function(f){ hot(g, f[0], f[1], 16); });
  if(S1.k === 2){ hot(g, D2, 156, 0, {w:70, h:40, r:8}); hot(g, CX, 156, 0, {w:40, h:30, r:6}); }
  if(S1.k === 3) hot(g, CX - 4, 110, 22);
  if(S1.k === 4) hot(g, D2, MY, 27);

  const it = ITEM1[S1.k];
  EC.box(g, 18, 276, 324, 38, 6, C.accbg, C.acc, 1);
  txt(g, it.n + '　—　' + it.f, 180, 289, {sz:11, b:1, c:C.acc});
  txt(g, it.a + '　·　' + it.b, 180, 304, {sz:9.5, c:C.tx2});
}
function note1(){
  const it = ITEM1[S1.k];
  $('s1a').textContent = it.a;
  $('s1b').textContent = it.b;
  $('s1c').textContent = it.c;
  let h = '';
  if(S1.k === 0) h =
    '<div class="st">QS —— Q 是主电路上的开关</div>' +
    '<b>Q</b> 这一大类是「电力电路的开关器件」，也就是<b>直接通断大电流的那些</b>：' +
    'QF 断路器、QS 隔离开关。这张图上 QS 就是<b>电源总开关</b>，合上它三相电才进得来。' +
    '<div class="tip info" style="margin-top:8px"><b>它后面没有数字</b>，' +
    '因为整张图上这类器件只有一个。<b>只有一个就不用编号</b> —— 有第二个的时候才会变成 QS1、QS2。</div>';
  else if(S1.k === 1) h =
    '<div class="st">FU1 FU2 FU3 —— 数字最大值 3 ＝ 一共三个</div>' +
    '<b>F</b> 是「保护器件」这一大类，<b>FU</b> 是其中的熔断器（熔断器的英文是 fuse）。' +
    '三相各串一个，所以编成 FU1、FU2、FU3。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>数字直接跟在字母后面，表示同一类里的第几个</b>；' +
    '反过来，<b>看到最大的那个数字，就知道这张图上这类器件一共有几个</b>。' +
    '<span class="sub">这个「数一数」的本事在查故障时很实用：图上编到 FU5，' +
    '你就知道该去柜子里找五个熔断器，少一个说明看漏了。</span></div>';
  else if(S1.k === 2) h =
    '<div class="st bad">KM 和 KM-1 是同一只接触器</div>' +
    '<b>K</b> 是「继电器·接触器」这一大类，<b>KM</b> 是接触器。图上它出现在<b>两个地方</b>：' +
    '右边控制电路里那个小方框是它的<b>线圈</b>（标 KM），' +
    '左边主电路里那三个触点是它的<b>主触头</b>（标 KM-1）。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>横杠后面的数字表示「同一个器件的第几个部分」</b>，不是第几个器件。' +
    '按下 SB，线圈 KM 得电 → 主触头 KM-1 闭合 → 电动机转。' +
    '<b>线圈和触头隔着大半张图，可它们是同一只接触器上的东西。</b>' +
    '<span class="sub">这是新手在原理图上最容易看岔的一处，第 4.5 节整节都在讲它。</span></div>';
  else if(S1.k === 3) h =
    '<div class="st">SB —— S 是控制电路上的开关</div>' +
    '<b>S</b> 这一大类是「控制电路的开关、选择器」，<b>SB</b> 是按钮。' +
    '它串在控制回路里，走的电流只够让线圈动作，<b>很小</b>。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>Q 和 S 都是开关，分法是看它在哪条电路上</b>：' +
    'Q 在主电路（通断电动机的大电流），S 在控制电路（只走小信号）。' +
    '<span class="sub">这张图叫「点动」，就是因为 SB 按住才转、松手就停 ——' +
    '按钮一松，线圈断电，主触头跟着弹开。想让它松手也接着转，就得加自锁（第 4.4 节）。</span></div>';
  else h =
    '<div class="st">M —— 电动机，圈里那个 3~ 是关键</div>' +
    '<b>M</b> 这一大类就是电动机。圆圈里的 <b>3~</b> 表示<b>三相交流</b>：' +
    '数字 3 是相数，波浪线 ~ 是交流。' +
    '<div class="tip info" style="margin-top:8px">' +
    '直流电动机圈里画的是一条横线而不是波浪线，文字符号写 <b>MD</b>；' +
    '同步电动机写 <b>MS</b>。<span class="sub">现场 95% 是三相异步电动机（第 2.7 节讲过），' +
    '所以图上多半就是这个 M 加 3~。</span></div>';
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
st1.cv.addEventListener('click', function(ev){
  const p = st1.pick(ev), x = p[0], y = p[1];
  if(x > 42 && x < 86 && y > 30 && y < 108) setK1(0);
  else if(x > 88 && x < 158 && y > 42 && y < 110) setK1(1);
  else if(x > 162 && x < 228 && y > 136 && y < 178) setK1(2);
  else if(x > 242 && x < 282 && y > 128 && y < 172) setK1(2);
  else if(x > 242 && x < 282 && y > 92 && y < 126) setK1(3);
  else if(Math.abs(x - D2) < 30 && Math.abs(y - MY) < 30) setK1(4);
});

/* ================================================================
   场景 2：基本文字符号的派生树
   ================================================================
   左边一个大类字母，右边挂五个双字母。**大类字母永远在前面**是这一屏唯一要记的事。
   字母卡上那个 30px 的大字是「图形内容」不是标注，所以没走 EP.TYPE 那四档。 */
const CLS = [
  {L:'Q', t:'电力电路开关', memo:'主电路上的开关', k:[
    ['QF','断路器'],['QS','隔离开关'],['QK','刀开关'],['QL','负荷开关'],['QM','电动机保护开关']]},
  {L:'F', t:'保护器件', memo:'出事时它先动', k:[
    ['FU','熔断器'],['FR','热继电器'],['FV','限压保护器件'],
    ['FA','瞬时限流保护'],['FS','瞬时＋延时限流保护']]},
  {L:'K', t:'继电接触器', memo:'用小电流控大电流', k:[
    ['KM','接触器'],['KA','中间继电器'],['KT','时间继电器'],
    ['KV','电压继电器'],['KS','速度继电器']]},
  {L:'S', t:'控制电路开关', memo:'只走小信号', k:[
    ['SB','按钮'],['SA','转换开关'],['SQ','位置（行程）开关'],
    ['SP','压力传感器'],['ST','温度传感器']]},
  {L:'M', t:'电动机', memo:'圈里 3~ 就是它', k:[
    ['M','（一般）电动机'],['MD','直流电动机'],['MS','同步电动机'],
    ['MC','笼型电动机'],['MG','可作发电机用的']]},
  {L:'T', t:'变压器', memo:'两头电压不一样', k:[
    ['TM','电力变压器'],['TC','控制电路电源用'],['TA','电流互感器'],
    ['TV','电压互感器'],['TS','整流变压器']]}
];
const S2 = { k:0 };
const st2 = new Stage('cv1', 360, 308);
const ROWY = [64, 106, 148, 190, 232];

function draw2(){
  const g = st2.g; st2.clear();
  const cl = CLS[S2.k];
  EP.heading(g, 12, 14, '基本文字符号', '大类字母 ＋ 一个补充字母');

  /* 连线先画，卡片后画，接口才藏在卡片下面 */
  g.save();
  g.strokeStyle = C.boxLine; g.lineWidth = 1.3;
  ROWY.forEach(function(cy){
    g.beginPath();
    g.moveTo(84, 148); g.lineTo(106, 148); g.lineTo(106, cy); g.lineTo(128, cy);
    g.stroke();
  });
  g.restore();

  /* 大类卡 */
  txt(g, cl.t, 54, 106, {sz:9, c:C.tx2});
  box(g, 24, 118, 60, 60, 10, C.accbg, C.acc, 1.8);
  txt(g, cl.L, 54, 148, {sz:30, b:1, c:C.acc});

  /* 五张派生卡 */
  cl.k.forEach(function(it, i){
    const cy = ROWY[i];
    box(g, 128, cy - 17, 214, 34, 7, C.box, C.boxLine, 1.1);
    txt(g, it[0], 142, cy, {sz:14, b:1, c:C.acc, al:'left'});
    txt(g, it[1], 178, cy, {sz:10, c:C.tx, al:'left'});
  });

  EC.box(g, 18, 262, 324, 38, 6, C.accbg, C.acc, 1);
  txt(g, '两个字母的，第一个永远是大类', 180, 275, {sz:10.5, b:1, c:C.acc});
  txt(g, '看见 ' + cl.L + ' 打头 ＝「' + cl.t + '」这一类', 180, 290, {sz:9.5, c:C.tx2});
}
function note2(){
  const cl = CLS[S2.k];
  $('s2a').textContent = cl.t;
  $('s2b').textContent = cl.memo;
  $('n1').innerHTML =
    '<div class="st">' + cl.L + '　' + cl.t + '</div>' +
    '这一类里最常见的五个都在图上了。<b>第一个字母 ' + cl.L + ' 定了大类，' +
    '第二个字母才是具体是哪一种</b> —— 所以图上冒出一个没见过的 ' + cl.L +
    '× 符号，至少能判断出它是「' + cl.t + '」这一类的东西。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>记法：' + cl.memo + '。</b>' +
    '<span class="sub">书上把电气设备分成 23 大类，全表在书内 P64~P66。' +
    '日常图纸上真会碰到的就十来个，这一屏六个 + 下面表格里七个，基本够用了。</span></div>';
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
   场景 3：辅助文字符号
   ================================================================
   六张卡：符号 / 中文 / 英文原词。英文那一列是为了「知道来历就好记」，
   太长的（counterclockwise 那种）只取看得出来历的一段。 */
const AUX = [
  {t:'启动与停止', memo:'ST / STP',
   ex:['SB ST　＝ 启动按钮', 'SB STP　＝ 停止按钮'],
   k:[['ST','START','启动'],['STP','STOP','停止'],['RES','RESERVE','备用'],
      ['RST','RESET','复位'],['SET','SET','置位·定位'],['EM','EMERGENCY','紧急']]},
  {t:'开关·输入输出', memo:'ON / OFF',
   ex:['SA ON　＝ 转换开关的「合」位', 'IN / OUT　＝ 输入端 / 输出端'],
   k:[['ON','ON','闭合'],['OFF','OFF','断开'],['IN','INPUT','输入'],
      ['OUT','OUTPUT','输出'],['AUT','AUTOMATIC','自动'],['MAN','MANUAL','手动']]},
  {t:'方向', memo:'FW / BW',
   ex:['KM FW　＝ 管正转的那个接触器', 'KM BW　＝ 管反转的那个接触器'],
   k:[['FW','FORWARD','正·向前'],['BW','BACKWARD','向后'],['CW','CLOCKWISE','顺时针'],
      ['CCW','COUNTER CW','逆时针'],['INC','INCREASE','增'],['DEC','DECREASE','减']]},
  {t:'能单独用的', memo:'AC / DC / PE / N',
   ex:['电源标注直接写 AC 380 V', '接地那根线上直接标 PE'],
   k:[['AC','ALTERNATING','交流'],['DC','DIRECT','直流'],['PE','PROTECTIVE','保护接地'],
      ['N','NEUTRAL','中性线'],['E','EARTH','接地'],['PEN','','PE 与 N 共用']]}
];
const S3 = { k:0 };
const st3 = new Stage('cv2', 360, 274);
const CARDX = [20, 188], CARDY = [62, 116, 170];

function draw3(){
  const g = st3.g; st3.clear();
  const a = AUX[S3.k];
  EP.heading(g, 12, 14, '辅助文字符号', '说明功能、状态、特征');

  a.k.forEach(function(it, i){
    const bx = CARDX[i % 2], cy = CARDY[Math.floor(i / 2)];
    box(g, bx, cy - 23, 152, 46, 7, C.box, C.boxLine, 1.1);
    txt(g, it[0], bx + 16, cy - 10, {sz:14, b:1, c:C.acc, al:'left'});
    txt(g, it[2], bx + 16, cy + 11, {sz:10, c:C.tx, al:'left'});
    if(it[1]) txt(g, it[1], bx + 140, cy + 11, {sz:8, c:C.tx3, al:'right'});
  });

  EC.box(g, 18, 206, 324, 58, 6, C.accbg, C.acc, 1);
  txt(g, a.ex[0], 180, 224, {sz:10.5, b:1, c:C.acc});
  txt(g, a.ex[1], 180, 246, {sz:10.5, b:1, c:C.acc});
}
function note3(){
  const a = AUX[S3.k];
  $('s3a').textContent = a.t;
  $('s3b').textContent = a.memo;
  let h = '';
  if(S3.k === 0) h =
    '<div class="st">同样是 SB，靠后面这两三个字母分开</div>' +
    '基本符号只说「这是个按钮」，<b>它到底管什么，全在后面跟的这两三个字母上</b>。' +
    '实物也是这么标的：控制柜面板上印着 SB1、SB2，' +
    '旁边的小铭牌才写「启动」「停止」—— <b>图纸上那两三个字母就是那块小铭牌</b>。' +
    '<div class="tip info" style="margin-top:8px">图上另外四个也常见：' +
    '<b>RES 备用</b>（预留的位置、备用回路）、<b>RST 复位</b>（故障排除后按它清报警）、' +
    '<b>SET 置位·定位</b>、<b>EM 紧急</b>（EM 打头的多半跟急停有关）。' +
    '<span class="sub">ST 和 STP 为什么差一个字母，下面那张卡专门讲。</span></div>';
  else if(S3.k === 1) h =
    '<div class="st">开／关、进／出</div>' +
    '<b>ON 闭合、OFF 断开</b>是转换开关、选择开关的档位标注；' +
    '<b>IN 输入、OUT 输出</b>标在端子和接线柱上，接线时靠它分清哪边进哪边出。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>AUT 自动 / MAN 手动</b>是控制柜面板上的常客：一个旋钮两个档位，' +
    '标着 AUT 和 MAN。<span class="sub">查故障之前先看这个旋钮在哪一档 ——' +
    '「设备不动」有时候只是被人切到手动了。</span></div>';
  else if(S3.k === 2) h =
    '<div class="st">方向：正转、反转</div>' +
    '<b>FW 正／向前，BW 向后</b>。电动机正反转控制里有两个接触器，' +
    '一个管正转、一个管反转，图上就靠这两个辅助符号（或者直接编 KM1、KM2）区分。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>CW 顺时针 / CCW 逆时针</b>说的是从某一头看过去的旋转方向 ——' +
    '电动机铭牌和联轴器上会标，接反了设备就倒着转。' +
    '<span class="sub">正反转的原理（换任意两相）第 2.7 节提过，控制电路第 11 章讲。</span></div>';
  else h =
    '<div class="st">这几个自己就是完整意思</div>' +
    '大部分辅助符号得跟在基本符号后面才有意义（SB ST、KM FW），' +
    '但 <b>AC、DC、PE、N</b> 这几个<b>可以单独标在图上</b>：' +
    '电源标注写 <b>AC 380 V</b>、接地线上标 <b>PE</b>、零线上标 <b>N</b>。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>PEN</b> 是「保护接地与中性线共用一根」—— 老式 TN-C 系统里有，' +
    '一根线既当零线又当地线。<b>新装的线路一律把 PE 和 N 分开走</b>，' +
    '因为 PEN 一旦断了，设备外壳就直接带上了电。' +
    '<span class="sub">下一屏细讲 N 和 PE。</span></div>';
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
   场景 4：专用文字符号 —— 电源侧 L1L2L3 ↔ 设备侧 UVW
   ================================================================
   三相线色按国标画（黄绿红），和 1.5 / 3.7 两节用的是同一套；
   PE 是绿黄双色 —— 先铺一层黄，再叠一层绿虚线。 */
const PH = ['#e8b93c', '#4fc04a', '#ff6b6b'];
const SPEC = [
  {t:'L1 L2 L3', side:'电源侧'},
  {t:'U V W',    side:'设备侧'},
  {t:'N 与 PE',  side:'零线与地线'},
  {t:'YE GN RD BU GNYE', side:'黑白图纸上代替颜色'}
];
const S4 = { k:0 };
const st4 = new Stage('cv3', 360, 314);
const WY = [98, 122, 146, 170, 194];   /* L1 L2 L3 N PE 五根线的 y */

function draw4(){
  const g = st4.g; st4.clear();
  EP.heading(g, 12, 14, '电源侧 ↔ 设备侧', '同一根线，两头两个名字');

  /* 两个盒子 */
  box(g, 20, 48, 78, 164, 6, C.box, C.boxLine, 1.3);
  txt(g, '配电箱', 59, 62, {sz:10, b:1, c:C.tx});
  txt(g, '电源侧', 59, 76, {sz:8.5, c: S4.k === 0 ? C.acc : C.tx3});
  box(g, 262, 48, 78, 164, 6, C.box, C.boxLine, 1.3);
  txt(g, '电动机', 301, 62, {sz:10, b:1, c:C.tx});
  txt(g, '设备侧', 301, 76, {sz:8.5, c: S4.k === 1 ? C.acc : C.tx3});

  /* 三根相线 */
  const CODE = ['YE', 'GN', 'RD'];
  const LEFT = ['L1', 'L2', 'L3'], RIGHT = ['U', 'V', 'W'];
  for(let i = 0; i < 3; i++){
    new Path([[98,WY[i]],[262,WY[i]]]).stroke(g, 2.6, PH[i]);
    txt(g, LEFT[i],  90, WY[i], {sz:10, b:1, c: S4.k === 0 ? C.acc : C.tx, al:'right'});
    txt(g, RIGHT[i], 270, WY[i], {sz:10, b:1, c: S4.k === 1 ? C.acc : C.tx, al:'left'});
    txt(g, CODE[i], 180, WY[i] - 9, {sz:8.5, b:1, c: S4.k === 3 ? C.acc : C.tx3});
  }
  /* N：三相电动机不接，所以画成断头 */
  new Path([[98,WY[3]],[164,WY[3]]]).stroke(g, 2.6, C.N);
  txt(g, 'N',  90, WY[3], {sz:10, b:1, c: S4.k === 2 ? C.acc : C.tx, al:'right'});
  txt(g, 'BU', 131, WY[3] - 9, {sz:8.5, b:1, c: S4.k === 3 ? C.acc : C.tx3});
  g.save();
  g.strokeStyle = C.err; g.lineWidth = 2; g.lineCap = 'round';
  g.beginPath(); g.moveTo(169, WY[3]-5); g.lineTo(179, WY[3]+5);
  g.moveTo(179, WY[3]-5); g.lineTo(169, WY[3]+5); g.stroke();
  g.restore();
  txt(g, '三相电动机不接 N', 188, WY[3], {sz:9, c: S4.k === 2 ? C.acc : C.tx2, al:'left'});
  /* PE：绿黄双色 —— 铺一层黄，再叠一层绿虚线 */
  const pe = new Path([[98,WY[4]],[262,WY[4]]]);
  pe.stroke(g, 2.8, C.PE2);
  g.save(); g.setLineDash([7,7]); pe.stroke(g, 2.8, C.PE); g.restore();
  txt(g, 'PE', 90, WY[4], {sz:10, b:1, c: S4.k === 2 ? C.acc : C.tx, al:'right'});
  txt(g, 'PE', 270, WY[4], {sz:10, b:1, c: S4.k === 2 ? C.acc : C.tx, al:'left'});
  txt(g, 'GNYE', 180, WY[4] - 9, {sz:8.5, b:1, c: S4.k === 3 ? C.acc : C.tx3});

  /* 电动机 */
  g.save();
  g.beginPath(); g.arc(301, 244, 18, 0, Math.PI*2);
  g.fillStyle = C.box; g.fill();
  g.lineWidth = 2; g.strokeStyle = C.wire; g.stroke();
  g.restore();
  txt(g, 'M', 301, 239, {sz:14, b:1, c:C.tx});
  txt(g, '3~', 301, 253, {sz:9, c:C.tx2});
  new Path([[301,212],[301,226]]).stroke(g, 2, C.wire);

  if(S4.k === 0) hot(g, 98, 122, 0, {w:44, h:74, r:8});
  if(S4.k === 1) hot(g, 262, 122, 0, {w:44, h:74, r:8});
  if(S4.k === 2) hot(g, 180, 182, 0, {w:200, h:56, r:8});
  if(S4.k === 3) hot(g, 180, 146, 0, {w:174, h:120, r:8});

  const sp = SPEC[S4.k];
  EC.box(g, 18, 270, 324, 38, 6, C.accbg, C.acc, 1);
  txt(g, sp.t, 180, 283, {sz:11, b:1, c:C.acc});
  txt(g, sp.side, 180, 298, {sz:9.5, c:C.tx2});
}
function note4(){
  const sp = SPEC[S4.k];
  $('s4a').textContent = sp.t;
  $('s4b').textContent = sp.side;
  let h = '';
  if(S4.k === 0) h =
    '<div class="st">L1 L2 L3 —— 电源侧的三相</div>' +
    '配电箱、断路器、母线上标的都是这一组，指的是<b>交流系统电源的第一、二、三相</b>。' +
    '国标线色是<b>黄、绿、红</b>（1.5 节那张供电制式图上用的就是这一套）。' +
    '<div class="tip info" style="margin-top:8px">' +
    '老图纸上还能见到 <b>A B C</b> 相的写法，说的是同一件事，' +
    '现行标准是 L1 L2 L3。<span class="sub">直流那边对应的是 <b>L+ 正极、L− 负极</b>。</span></div>';
  else if(S4.k === 1) h =
    '<div class="st good">U V W —— 设备侧的三相，和左边是同三根线</div>' +
    '接到电动机、变频器输出端上，标的就变成了 <b>U V W</b>：' +
    '它是<b>交流系统设备</b>的第一、二、三相。' +
    '<b>L1 接 U、L2 接 V、L3 接 W —— 同一根线，两头两个名字。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>第 2.7 节那个接线盒上印的 U1 V1 W1 / U2 V2 W2 就是这么来的</b>：' +
    'U V W 是三相，下标 1、2 是每相绕组的<b>头和尾</b> —— 星形和三角形就是靠它们连出来的。' +
    '<span class="sub">顺带一条：任意<b>对调两相</b>（比如 L1、L2 换个位置），电动机就反转。</span></div>';
  else if(S4.k === 2) h =
    '<div class="st">N 是干活的，PE 是保命的</div>' +
    '<b>N 中性线（零线）</b>：单相设备要靠它构成回路，<b>正常工作时有电流流过</b>。' +
    '三相电动机三相平衡，<b>不需要接 N</b>，所以图上那根到一半就断了。' +
    '<b>PE 保护接地</b>：接设备的金属外壳，<b>正常时一点电流都没有</b>，' +
    '只有绝缘坏了才把漏电流导走。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>这两根绝对不能混用、不能互相代替。</b>' +
    '把外壳接到 N 上，零线一断，外壳立刻带电。' +
    '<span class="sub"><b>PEN</b> 是老式 TN-C 系统里两者共用一根的做法，新装线路一律分开走 —— ' +
    '道理就在这儿。</span></div>';
  else h =
    '<div class="st">颜色代号 —— 黑白图纸上用字母代替颜色</div>' +
    '图纸大多黑白印刷，线的颜色印不出来，于是<b>把颜色写成字母标在线旁边</b>：' +
    '<b>YE 黄 / GN 绿 / RD 红</b>是三相，<b>BU 蓝</b>是零线，' +
    '<b>GNYE 绿黄双色</b>是保护地。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>绿黄双色线只能做 PE，这是硬规矩</b> —— 拿它当相线用，' +
    '下一个来修的人会照颜色判断「这是地线，安全」，然后被电。' +
    '<span class="sub">代号基本是英文颜色词的头两个字母：red、yellow、green、blue、' +
    'black、brown、white。记住这条就不用背表。</span></div>';
  $('n3').innerHTML = h;
}
function setK4(k){
  if(k === S4.k) return;
  S4.k = k;
  document.querySelectorAll('#s4k .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S4.k);
  });
  note4(); draw4();
}
document.getElementById('s4k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  setK4(+t.dataset.k);
});
st4.cv.addEventListener('click', function(ev){
  const p = st4.pick(ev), x = p[0], y = p[1];
  if(y > 158 && y < 210) setK4(2);
  else if(x < 110 && y > 86 && y < 158) setK4(0);
  else if(x > 250 && y > 86 && y < 158) setK4(1);
  else if(y > 86 && y < 158) setK4(3);
});

/* ================================================================
   绑定
   ================================================================ */
function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* 这一节四屏全是静态的（没有 rAF 循环），所以四个 draw 都得在这儿补画一次，
     否则 fit() 清空之后第一次进来是一片空白 */
  draw1(); draw2(); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:4, sec:'4.2'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('4.2');
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
