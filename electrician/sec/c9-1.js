/* 9.1 现场那张图多了什么 —— 本节内容的唯一真相。
   对应《零基础学电工》第 9 章 9.1 节（书内 P163~P167）。

   **这一节和 4.4「读一张原理图」不能重复。**
   4.4 那张是书上第 4 章的**点动控制图**（四屏：分主/控两块 / 顺着电流走五步 /
   自锁 / 停止与保护各断在哪一环），自锁已经在那儿讲过了。
   这一节讲的是图 9-2 那张**现场图**比它多出来的东西：
   **两个指示灯（各串一对辅助触点）、控制回路单独的熔断器 FU4/FU5、
   热继电器的触点 FR-1**。差距就是「能亮能转」和「能看出状态、能保护、能检修」的差距。

   四屏：① 六类器件各管什么 ② 比点动图多了什么 ③ 两个指示灯怎么接 ④ 直流那一款

   数字与说法的出处（书上原文，别凭记忆改）：
   - 图 9-1 的注：电动机控制电路的**按钮开关、指示灯、接触器、继电器、熔断器、
     接线端子**等电气部件按照一定的控制关系**集中安装在控制箱内**
   - 9.1 正文：在电动机控制电路中，**由控制按钮发送人工控制指令**，
     **通过接触器、继电器及相应的控制部件控制电动机的起、停运转**，
     **指示灯指示当前系统的工作状态**，**保护器件负责电路安全**，
     各电气部件与电动机根据设计需要，按照一定的控制关系连接在一起实现相应的功能
   - 9.1.1：**交流电动机控制电路主要由交流电动机（单相或三相）、控制部件和保护部件构成**；
     「了解交流电动机控制电路的控制关系，需先熟悉电路的结构组成。
     只有知晓交流电动机控制电路的功能、结构及电气部件的作用后，才能清晰地理清电路控制关系」
   - **图 9-2 的全部器件与标识（照录）**：AC380V / L1 L2 L3；
     **QS 电源总开关**；**FU1~FU3 熔断器**（主电路）、**FU4、FU5**（控制电路）；
     **KM-1 交流接触器主触头**；**FR 热继电器**；**M 3~ 三相交流电动机（U V W）**；
     **SB1 起动按钮**、**SB2 停止按钮**；**KM 交流接触器（线圈）**；
     **KM-2**（自锁触点）；**KM-3、KM-4 交流接触器辅助触头**；**FR-1**（热继电器触点）；
     **HL1 运行指示灯**、**HL2 停机指示灯**
   - 「交流电动机控制电路通过连线清晰地表达了各主要部件的连接关系，
     控制电路中的主要部件**用规范的电路图形符号和标识来表示**。
     为了更好地理解交流电动机控制电路的结构关系，**可以将电路图还原成电路接线图**」（图 9-3）
   - 9.1.2 直流：**直流电动机控制电路的主要特点是由直流电源供电，
     由控制部件和执行部件协同作用，控制直流电动机的起、停等工作状态**
   - **图 9-4 的器件（照录）**：**QS1 电源总开关**；**FU1、FU2 熔断器**；
     **KM1-1 主触点**；**M 直流电动机**；**L1、L2 WS 励磁绕组**；
     **R1、R2 起动电阻器**；**KM2-1、KM3-1**（短接起动电阻的触点）；
     **SB1 起动按钮**、**SB2 停止按钮**；**KM1-2**（自锁）、**KM1-3**；
     **KT1、KT2 时间继电器**、**KT1-1、KT2-1**（延时触点）；
     **KM1、KM2、KM3 线圈**

   **一处从图上读出来、书上没用文字写死的（屏 3，文案里标了口径）**：
   图 9-2 里 HL1（运行）和 HL2（停机）各串一对接触器辅助触头（KM-4、KM-3）。
   **书上没有一句话说明哪一对是动合、哪一对是动断**，但从「运行灯」「停机灯」这两个名字
   加上图上画的触点符号可以确定：**运行灯串动合（KM 吸合才亮），停机灯串动断（KM 没吸合才亮）**。
   这样两个灯永远一亮一灭。文案里按这个教，并注明是从图和名字推出来的。*/
(function(){
'use strict';
ELEC.reg({
  id: '9.1',
  file: 'c9-1.html',
  title: '9.1 现场那张图多了什么',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>六类器件</button>
    <button class="tab" data-i="1"><span class="n">2</span>多了什么</button>
    <button class="tab" data-i="2"><span class="n">3</span>两个指示灯</button>
    <button class="tab" data-i="3"><span class="n">4</span>直流那一款</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">一张控制图上只有六类东西</div>
    器件看着多，其实按<b>作用</b>分只有六类：<b>供电、保护、控制、执行、指示、负载</b>。
    书上图 9-2 那张图，每个器件都能归进其中一类。
    <b>点画布上的任意一个器件</b>，看它归哪一类、管什么。
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="nums three">
        <div class="num"><div class="k">这个器件</div><div class="v" id="s1a">QS</div></div>
        <div class="num"><div class="k">归哪一类</div><div class="v" id="s1b">供电</div></div>
        <div class="num hi"><div class="k">在主还是<br>在控</div><div class="v" id="s1c">主电路</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">六类器件（书上 9.1 那段话拆开）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>这一类</th><th>书上怎么说</th><th>图 9-2 里是谁</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">供电</td><td>把三相电送进来</td><td>QS 电源总开关</td></tr>
        <tr><td class="eu-s">保护</td><td><b>保护器件负责电路安全</b></td>
          <td>FU1~FU5 熔断器<br>FR 热继电器</td></tr>
        <tr><td class="eu-s">控制</td><td><b>由控制按钮发送人工控制指令</b></td>
          <td>SB1 起动、SB2 停止</td></tr>
        <tr><td class="eu-s">执行</td><td><b>通过接触器、继电器控制电动机的起、停运转</b></td>
          <td>KM 线圈 ＋ 它的各对触点</td></tr>
        <tr><td class="eu-s">指示</td><td><b>指示灯指示当前系统的工作状态</b></td>
          <td>HL1 运行、HL2 停机</td></tr>
        <tr><td class="eu-s">负载</td><td>真正干活的那个</td><td>M 三相交流电动机</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>书上把交流电动机控制电路的组成写成三样：</b>
      <span class="sub">「主要由<b>交流电动机（单相或三相）、控制部件和保护部件</b>构成」——
      上面那六类是把「控制部件」再拆细的结果。
      <b>认器件的时候按作用归类，比按名字背管用</b>：
      看到一个没见过的器件，先问它是管保护、管控制还是管指示。</span>
    </div>
  </div>

  <div class="bet" data-bet="c91-cls" data-q="热继电器 FR 在图上出现了两次：主电路里一个热元件，控制回路里一对触点。它归哪一类？"
       data-opts="控制类，因为它能让电路停下来|保护类——它是「保护器件负责电路安全」里的那个，只在过载时才动作|执行类，跟接触器一样"
       data-right="1"
       data-after="保护类。它和控制类的分别在于「谁下的命令」：控制类（按钮）是人主动按的，保护类（熔断器、热继电器）是电路自己在出事时动作的。至于它为什么画在两处——主电路里那三个热元件是「感受电流」的，控制回路里那对 FR-1 触点才是「切断电源」的，2.3 那节讲热继电器时说过这套结构。"></div>
</section>

<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">和 4.4 那张点动图比一比</div>
    4.4 那节读的是<b>点动控制图</b>：按住转、松手停。
    现场这张图在它基础上多了<b>四样东西</b>，每一样都是为了「能用」而加的。
    <b>点一样看它解决什么问题。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">① 自锁触点</button>
        <button class="btn sm" data-k="1">② 停止按钮</button>
        <button class="btn sm" data-k="2">③ 控制熔断器</button>
        <button class="btn sm" data-k="3">④ 指示灯</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">多的这个</div><div class="v" id="s2a">KM-2</div></div>
        <div class="num"><div class="k">解决什么</div><div class="v" id="s2b">松手就停</div></div>
        <div class="num hi"><div class="k">没它<br>会怎样</div><div class="v" id="s2c">按着不放</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">点动图 → 现场图，多了这四样</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>多的</th><th>解决的问题</th><th>符号</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">自锁触点</td><td>点动要按着不放，松手就停</td><td><b>KM-2</b> 动合<br>并在 SB1 两端</td></tr>
        <tr><td class="eu-s">停止按钮</td><td>自锁之后要有办法停下来</td><td><b>SB2</b> 动断<br>串在回路里</td></tr>
        <tr><td class="eu-s">控制回路<br>熔断器</td><td>控制回路出问题不该牵连主电路</td><td><b>FU4、FU5</b></td></tr>
        <tr><td class="eu-s">两个<br>指示灯</td><td>隔着柜门看不出设备在不在跑</td><td><b>HL1</b> 运行<br><b>HL2</b> 停机</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>这四样加起来，就是「实验室的图」和「柜子里的图」的全部差距。</b>
      <span class="sub">4.4 那张点动图能讲清「电流怎么走一圈」，
      但拿它去装一台设备，你会发现：<b>手要一直按着、按错了停不下来、
      控制回路一短路整台机器跳闸、而且隔着柜门根本不知道它在不在转</b>。
      这一节这张图，把这四件事一次解决了。</span>
    </div>
  </div>

  <div class="bet" data-bet="c91-fu" data-q="主电路已经有 FU1~FU3 了，为什么控制回路还要单独装 FU4、FU5？"
       data-opts="多一层保险，没什么特别的|主电路的熔断器是按电动机的大电流选的，控制回路只有几百毫安——它烧不断|因为控制回路电压不一样"
       data-right="1"
       data-after="因为选型不匹配。主电路的熔断器要让电动机能正常启动（启动电流是额定的好几倍），所以额定值很大；而控制回路只有接触器线圈那点电流，几百毫安。控制回路真短路了，那点电流根本熔不断主电路那几只熔断器，只会让线一直烧。所以必须单独配一只小的——这也是 8.3「越往下游额定值越小」那条规律在控制回路上的体现。"></div>
</section>

<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">两个灯永远一亮一灭</div>
    图 9-2 里 <b>HL1 运行灯</b>和 <b>HL2 停机灯</b>各串一对接触器的辅助触点。
    <b>关键在这两对触点一个是动合、一个是动断</b> ——
    所以它俩永远一亮一灭，绝不会同时亮或同时灭。
    <b>点「按下起动」看两个灯怎么换。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">停机状态</button>
        <button class="btn sm" data-k="1">按下起动</button>
        <button class="btn sm" data-k="2">两个都不亮</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">KM 线圈</div><div class="v" id="s3a">没电</div></div>
        <div class="num"><div class="k">HL1 运行</div><div class="v" id="s3b">灭</div></div>
        <div class="num hi"><div class="k">HL2 停机</div><div class="v" id="s3c">亮</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">两对触点，一动合一动断</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>灯</th><th>串的触点</th><th>KM 没电时</th><th>KM 得电后</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">HL1<br>运行</td><td><b>KM-4</b> 动合</td>
          <td>触点断开 ⇒ <b>灭</b></td><td>触点闭合 ⇒ <b>亮</b></td></tr>
        <tr><td class="eu-s">HL2<br>停机</td><td><b>KM-3</b> 动断</td>
          <td>触点闭合 ⇒ <b>亮</b></td><td>触点断开 ⇒ <b>灭</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>这一条是从图和名字推出来的，书上没用文字写死。</b>
      <span class="sub">图 9-2 上只标了「交流接触器辅助触头 KM-3、KM-4」和两个灯的名字。
      但「运行指示灯」「停机指示灯」这两个名字加上 4.3 讲的
      <b>「图纸上每个触点画的都是未操作状态」</b>，答案就唯一了：
      运行灯要在 KM 吸合后才亮 ⇒ 串动合；停机灯要在 KM 没吸合时亮 ⇒ 串动断。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st good">为什么值得为两个灯多接四根线</div>
    <b>因为控制箱的门是关着的。</b>
    <div class="tip info">
      <b>指示灯回答的是「我现在能不能开门」。</b>
      <span class="sub">运行灯亮着 ⇒ 主电路带电、电动机在转，<b>这时候不能开柜门</b>；
      停机灯亮着 ⇒ 接触器已经释放。
      <hr><b>更值钱的是「两个都不亮」这个状态</b>（点第三档看）：
      它不是正常状态里的任何一个，<b>说明控制回路本身没电了</b> ——
      FU5 熔断、FR-1 跳开、或者控制回路某处断线。
      <b>一个灯给不了这个信息，两个灯才能。</b></span>
    </div>
  </div>
</section>

<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">直流那一款：靠时间继电器分级切电阻</div>
    书上 9.1.2 给了直流电动机的控制电路（图 9-4）。
    <b>它多了一样交流那边没有的东西：起动电阻 R1、R2，
    还有两只时间继电器 KT1、KT2 负责按时间把它们一级一级短掉。</b>
    <b>点「起动」看三级怎么切。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">停机</button>
        <button class="btn sm" data-k="1">刚起动</button>
        <button class="btn sm" data-k="2">KT1 到时</button>
        <button class="btn sm" data-k="3">KT2 到时</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">串在回路<br>里的电阻</div><div class="v" id="s4a">—</div></div>
        <div class="num"><div class="k">转速</div><div class="v" id="s4b">0</div></div>
        <div class="num hi"><div class="k">这一级<br>谁短的</div><div class="v" id="s4c">—</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">图 9-4 的器件（书上照录）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>器件</th><th>作用</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">QS1 / FU1、FU2</td><td>电源总开关 / 熔断器</td></tr>
        <tr><td class="eu-s">M ＋ L1、L2 WS</td><td>直流电动机 ＋ <b>励磁绕组</b></td></tr>
        <tr><td class="eu-s"><b>R1、R2</b></td><td><b>起动电阻器</b></td></tr>
        <tr><td class="eu-s">KM1 ＋ KM1-1/2/3</td><td>主接触器：主触点 ＋ 自锁 ＋ 一对辅助</td></tr>
        <tr><td class="eu-s"><b>KM2-1、KM3-1</b></td><td><b>分别短接 R1、R2</b> 的触点</td></tr>
        <tr><td class="eu-s"><b>KT1、KT2</b></td><td><b>时间继电器</b>，各带一对延时触点</td></tr>
        <tr><td class="eu-s">SB1 / SB2</td><td>起动 / 停止按钮</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>书上给直流控制电路的定性只有一句：</b>
      <span class="sub">「主要特点是<b>由直流电源供电</b>，
      <b>由控制部件和执行部件协同作用</b>，控制直流电动机的<b>起、停等工作状态</b>。」
      <hr>结构上跟交流那张是一个路子（总开关 → 熔断器 → 接触器 → 电动机，
      控制回路里按钮 ＋ 自锁），<b>差别就在那两级起动电阻和两只时间继电器</b>。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">现场 95% 是三相异步 —— 但这套思路第 11 章还要用</div>
    2.7 那节说过：<b>直流电动机现场少见，绝大多数是三相异步电动机。</b>
    这一屏值得看的不是直流本身，是<b>「按时间分级」这个套路</b>。
    <div class="tip info">
      <b>第 11 章「串电阻减压启动」用的是同一套：</b>
      <span class="sub">起动的瞬间串一个电阻把电流压下来，
      等转速上来了再用时间继电器把电阻<b>一级一级短掉</b>。
      <hr>为什么要这么麻烦：<b>电动机刚起动时电流是额定的好几倍</b>
      （2.7 讲空载电流时提过这个量级差），直接起动会让电网电压跌一下、
      也会让机械部分猛地一顿。串电阻就是把这一下缓开。
      <b>时间继电器（2.3 讲过）在这儿的作用就是「隔多久切一级」。</b></span>
    </div>
  </div>

  <div class="quiz" data-quiz="9.1">
    <div class="qz" data-q="书上说交流电动机控制电路主要由哪三样构成？"
      data-opts="电动机、按钮、指示灯|交流电动机（单相或三相）、控制部件和保护部件|接触器、熔断器、热继电器"
      data-right="1"
      data-why="书上原话：交流电动机控制电路主要由交流电动机（单相或三相）、控制部件和保护部件构成。按作用再拆细就是六类：供电（QS）、保护（FU、FR）、控制（SB）、执行（KM）、指示（HL）、负载（M）。认器件时按作用归类比按名字背管用。"></div>
    <div class="qz" data-q="主电路已经有 FU1~FU3，为什么控制回路还要单独装 FU4、FU5？"
      data-opts="规范要求，没有实际原因|主电路熔断器是按电动机的大电流选的，控制回路只有几百毫安，短路了那点电流熔不断它|因为控制回路是 220V"
      data-right="1"
      data-why="选型不匹配。主电路熔断器要让电动机能正常启动（启动电流是额定的好几倍），额定值很大；控制回路只有接触器线圈那点电流。控制回路真短路了，那点电流熔不断主电路的熔断器，只会让线一直烧。这是 8.3「越往下游额定值越小」在控制回路上的体现。"></div>
    <div class="qz" data-q="HL1 运行指示灯和 HL2 停机指示灯各串一对接触器辅助触点。这两对触点是什么类型？"
      data-opts="都是动合触点|运行灯串动合（KM 吸合才亮），停机灯串动断（KM 没吸合才亮）|都是动断触点"
      data-right="1"
      data-why="一动合一动断，所以两个灯永远一亮一灭。这一条书上没用文字写死，是从图和名字推出来的：4.3 讲过「图纸上每个触点画的都是未操作状态」，运行灯要在 KM 吸合后才亮就得串动合，停机灯要在 KM 没吸合时亮就得串动断。要是两个都是动合，停机时两个灯都灭，那就没法区分「停机」和「控制回路断了」。"></div>
    <div class="qz" data-q="控制箱面板上运行灯和停机灯「两个都不亮」，说明什么？"
      data-opts="设备停机了，正常状态|控制回路本身没电了——FU5 熔断、FR-1 跳开、或者控制回路某处断线|设备在运行"
      data-right="1"
      data-why="控制回路没电。正常状态只有两种：运行灯亮（KM 吸合）或停机灯亮（KM 释放）。两个都不亮不属于任何一种，说明给这两个灯供电的那条控制回路断了。这正是装两个灯而不是一个灯的价值——一个灯给不了这个信息。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 9 章 9.1 节（书内 P163~P167）</div>
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

/* ================================================================
   画控制图的一套零件 —— 四屏共用，别各画各的
   ================================================================
   一律「中心点 + 尺寸」，方向靠参数。**触点画的是未操作状态**（4.3 那条第一原则），
   所以 on 参数表示的是「现在被操作了没有」，不是「是动合还是动断」 */
/* 动合触点（竖向）：一根斜臂，闭合时立起来 */
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
/* 动断触点（竖向）：斜臂 + 那一横。**认它就认那一横**（4.3 栽过的坑：横被臂盖住） */
function ncC(g, x, y, on, s){
  s = s || 1;
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.6; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x, y - 14*s); g.lineTo(x, y - 8*s); g.stroke();
  g.beginPath(); g.moveTo(x, y + 8*s); g.lineTo(x, y + 14*s); g.stroke();
  /* 那一横：两头都要露出来 */
  g.beginPath(); g.moveTo(x - 7*s, y + 8*s); g.lineTo(x + 11*s, y + 8*s); g.stroke();
  g.beginPath(); g.moveTo(x, y - 8*s);
  if(on) g.lineTo(x + 9*s, y + 7*s); else g.lineTo(x, y + 8*s);
  g.stroke(); g.restore();
  dot(g, x, y - 8*s, P.ink, 1.8);
}
/* 按钮：触点 + 一条推杆虚线 + 按钮帽 */
function btn(g, x, y, nc, pressed){
  if(nc) ncC(g, x, y, pressed); else noC(g, x, y, pressed);
  g.save(); g.setLineDash([2.5,2.5]); g.strokeStyle = P.ink; g.lineWidth = 1;
  g.beginPath(); g.moveTo(x + 4, y); g.lineTo(x + 22, y); g.stroke(); g.restore();
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.8; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x + 22, y - 6); g.lineTo(x + 22, y + 6); g.stroke(); g.restore();
}
/* 线圈：一个矩形 */
function coil(g, x, y, live, label){
  box(g, x - 15, y - 11, 30, 22, 2, live ? C.accbg : C.card,
      live ? C.acc : P.ink, live ? 1.8 : 1.4);
  seg(g, [[x, y - 20],[x, y - 11]], C.wire, 1.8);
  seg(g, [[x, y + 11],[x, y + 20]], C.wire, 1.8);
  if(label) txt(g, label, x - 20, y, {sz:9, b:1, c: live ? C.acc : C.tx2, al:'right'});
}
/* 熔断器：一个细长方框 */
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
/* 指示灯：一个带叉的圆 */
function hlamp(g, x, y, on, col){
  const c = on ? (col || C.lamp) : C.lampOff;
  g.save();
  if(on){ g.globalAlpha = .22; g.fillStyle = c;
    g.beginPath(); g.arc(x, y, 17, 0, Math.PI*2); g.fill(); g.globalAlpha = 1; }
  g.strokeStyle = on ? c : C.boxLine; g.lineWidth = 1.6;
  g.beginPath(); g.arc(x, y, 9, 0, Math.PI*2); g.stroke();
  const d = 9 * 0.707;
  g.beginPath();
  g.moveTo(x - d, y - d); g.lineTo(x + d, y + d);
  g.moveTo(x + d, y - d); g.lineTo(x - d, y + d);
  g.stroke(); g.restore();
  seg(g, [[x, y - 18],[x, y - 9]], C.wire, 1.8);
  seg(g, [[x, y + 9],[x, y + 18]], C.wire, 1.8);
}

/* ================================================================
   场景 1：图 9-2 全图，点器件
   ================================================================
   主电路竖着画在左边（x 44/66/88），控制回路在右边（两条横母线 y=60 / y=268）。
   **控制回路的引线要横穿主电路那两三根竖线 —— 交叉一律不打点**
   （4.1 讲过的规矩，这儿天然出现）*/
const L = [44, 66, 88];              /* 三相主电路的 x */
const CT = 60, CB = 268;             /* 控制回路上下母线的 y */
const CL = 160, CR = 340;            /* 控制回路左右边界 */
const BX = 196, HX2 = 262, HX3 = 318;  /* 主控支路 / 停机灯 / 运行灯 的 x */
/* 可点的器件：[名字, 中心x, 中心y, 半宽, 半高, 类别, 在主还是在控] */
const DEV = [
  ['QS',   66, 64,  34, 16, '供电', '主电路', '电源总开关'],
  ['FU1~FU3', 66, 98, 34, 14, '保护', '主电路', '主电路熔断器'],
  ['KM-1', 66, 148, 34, 16, '执行', '主电路', '交流接触器主触头'],
  ['FR',   66, 182, 34, 14, '保护', '主电路', '热继电器（热元件）'],
  ['M',    66, 228, 20, 20, '负载', '主电路', '三相交流电动机'],
  ['FU4',  128, 86, 12, 14, '保护', '控制回路', '控制回路熔断器'],
  ['FU5',  144, 168, 12, 14, '保护', '控制回路', '控制回路熔断器'],
  ['SB2',  196, 96,  22, 15, '控制', '控制回路', '停止按钮（动断）'],
  ['SB1',  196, 140, 22, 15, '控制', '控制回路', '起动按钮（动合）'],
  ['KM-2', 166, 140, 12, 15, '执行', '控制回路', '自锁触点（动合）'],
  ['KM',   196, 192, 18, 13, '执行', '控制回路', '交流接触器线圈'],
  ['FR-1', 196, 232, 14, 15, '保护', '控制回路', '热继电器触点（动断）'],
  ['KM-3', 262, 110, 14, 15, '执行', '控制回路', '辅助触头（动断）'],
  ['HL2',  262, 180, 12, 12, '指示', '控制回路', '停机指示灯'],
  ['KM-4', 318, 110, 14, 15, '执行', '控制回路', '辅助触头（动合）'],
  ['HL1',  318, 180, 12, 12, '指示', '控制回路', '运行指示灯']
];
const CLSC = { 供电:'acc', 保护:'err', 控制:'warn', 执行:'ok', 指示:'warn', 负载:'acc' };
const S1 = { k:0 };
function draw1(){
  const g = st1.g; st1.clear();
  const d = DEV[S1.k];

  /* ---- 主电路 ---- */
  L.forEach(function(x, i){
    seg(g, [[x, 40],[x, 200]], C.wire, 2);
    txt(g, 'L' + (i+1), x, 32, {sz:8, b:1, c:C.tx3});
  });
  txt(g, 'AC 380V', 44, 20, {sz:9, b:1, c:C.tx3, al:'left'});
  /* QS 三把刀 */
  L.forEach(function(x){
    g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.6; g.lineCap = 'round';
    g.beginPath(); g.moveTo(x, 56); g.lineTo(x + 8, 70); g.stroke(); g.restore();
    dot(g, x, 56, P.ink, 1.8); dot(g, x, 72, P.ink, 1.8);
  });
  txt(g, 'QS', 22, 64, {sz:8.5, b:1, c:C.tx3, al:'right'});
  /* FU1~3 */
  L.forEach(function(x){ fuse(g, x, 98); });
  txt(g, 'FU1', 22, 98, {sz:8.5, b:1, c:C.tx3, al:'right'});
  /* KM-1 三对主触头 */
  L.forEach(function(x){ noC(g, x, 148, false, 0.9); });
  txt(g, 'KM-1', 22, 148, {sz:8.5, b:1, c:C.tx3, al:'right'});
  /* FR 热元件 */
  box(g, 32, 172, 68, 20, 2, C.card, P.ink, 1.3);
  L.forEach(function(x){
    g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.4;
    g.beginPath(); g.moveTo(x - 4, 177); g.lineTo(x + 4, 177);
    g.lineTo(x - 4, 182); g.lineTo(x + 4, 182); g.lineTo(x - 4, 187); g.stroke(); g.restore();
  });
  txt(g, 'FR', 22, 182, {sz:8.5, b:1, c:C.tx3, al:'right'});
  /* 电动机 */
  L.forEach(function(x){ seg(g, [[x, 192],[x, 206],[66, 212]], C.wire, 1.8); });
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.6;
  g.beginPath(); g.arc(66, 228, 17, 0, Math.PI*2); g.stroke(); g.restore();
  txt(g, 'M', 66, 223, {sz:11, b:1, c:C.tx2});
  txt(g, '3~', 66, 235, {sz:8, c:C.tx3});
  txt(g, 'U V W', 66, 256, {sz:7.5, c:C.tx3});

  /* ---- 控制回路的两根引线（横穿主电路，交叉不打点）---- */
  seg(g, [[L[0], 112],[128, 112],[128, CT],[CR, CT]], C.wire, 2);
  dot(g, L[0], 112, C.wire, 2.6);
  seg(g, [[L[1], 130],[144, 130],[144, CB],[CR, CB]], C.wire, 2);
  dot(g, L[1], 130, C.wire, 2.6);
  seg(g, [[CL, CT],[CR, CT]], C.wire, 2);
  fuse(g, 128, 86);
  txt(g, 'FU4', 138, 86, {sz:8, b:1, c:C.tx3, al:'left'});
  fuse(g, 144, 168);
  txt(g, 'FU5', 154, 168, {sz:8, b:1, c:C.tx3, al:'left'});

  /* ---- 主控支路 ---- */
  seg(g, [[BX, CT],[BX, 82]], C.wire, 1.8);
  btn(g, BX, 96, true, false);
  txt(g, 'SB2', BX - 12, 78, {sz:8, b:1, c:C.tx3, al:'right'});
  seg(g, [[BX, 110],[BX, 126]], C.wire, 1.8);
  btn(g, BX, 140, false, false);
  /* 放正下方会被自锁那条横线（y=156）压住，挪到按钮帽右边 */
  txt(g, 'SB1', BX + 30, 140, {sz:8, b:1, c:C.tx3, al:'left'});
  /* 自锁：并在 SB1 两端 */
  seg(g, [[BX, 126],[166, 126],[166, 132]], C.wire, 1.6);
  noC(g, 166, 140, false, 0.9);
  seg(g, [[166, 148],[166, 156],[BX, 156]], C.wire, 1.6);
  txt(g, 'KM-2', 150, 140, {sz:8, b:1, c:C.tx3, al:'right'});
  seg(g, [[BX, 154],[BX, 172]], C.wire, 1.8);
  coil(g, BX, 192, false, 'KM');
  seg(g, [[BX, 212],[BX, 218]], C.wire, 1.8);
  ncC(g, BX, 232, false, 0.9);
  txt(g, 'FR-1', BX - 12, 250, {sz:8, b:1, c:C.tx3, al:'right'});
  seg(g, [[BX, 245],[BX, CB]], C.wire, 1.8);

  /* ---- 两条指示灯支路 ---- */
  [[HX2, 'KM-3', 'HL2', true], [HX3, 'KM-4', 'HL1', false]].forEach(function(a){
    const x = a[0];
    seg(g, [[x, CT],[x, 96]], C.wire, 1.8);
    if(a[3]) ncC(g, x, 110, false, 0.9); else noC(g, x, 110, false, 0.9);
    txt(g, a[1], x + 14, 100, {sz:8, b:1, c:C.tx3, al:'left'});
    seg(g, [[x, 123],[x, 162]], C.wire, 1.8);
    hlamp(g, x, 180, a[3]);
    txt(g, a[2], x + 14, 196, {sz:8, b:1, c:C.tx3, al:'left'});
    seg(g, [[x, 198],[x, CB]], C.wire, 1.8);
    dot(g, x, CT, C.wire, 2.6); dot(g, x, CB, C.wire, 2.6);
  });
  dot(g, BX, CT, C.wire, 2.6); dot(g, BX, CB, C.wire, 2.6);

  /* 主 / 控 两块的分界 */
  g.save(); g.setLineDash([4,4]); g.strokeStyle = C.boxLine; g.lineWidth = 1;
  g.beginPath(); g.moveTo(112, 34); g.lineTo(112, 274); g.stroke(); g.restore();
  txt(g, '主电路', 60, 282, {sz:8.5, b:1, c:C.tx3});
  txt(g, '控制回路', 240, 282, {sz:8.5, b:1, c:C.tx3});

  /* 选中的那个 */
  hot(g, d[1], d[2], 0, {w: d[3]*2 + 10, h: d[4]*2 + 10, r:6});
  const kind = CLSC[d[5]];
  conc(g, 300, kind, d[0] + '　' + d[7], d[5] + '类　·　在' + d[6]);
}
function note1(){
  const d = DEV[S1.k];
  $('s1a').textContent = d[0];
  $('s1b').textContent = d[5];
  $('s1c').textContent = d[6] === '主电路' ? '主电路' : '控制回路';
  const D = {
    'QS':'<b>电源总开关。</b>整张图的电从它进来 —— 它一断，主电路和控制回路一起没电。' +
      '<hr>注意<b>控制回路的两根引线是从 QS 之后引出来的</b>（图上在 FU1~FU3 附近）：' +
      '这样断开 QS 就能同时切断两边，检修时才安全。要是从 QS 之前引，' +
      '总开关断了控制回路还带着电，那是隐患。',
    'FU1~FU3':'<b>主电路的熔断器，三相各一只。</b>它保护的是主电路 —— ' +
      '电动机绕组短路、KM 主触头粘连造成的相间短路，都归它管。' +
      '<hr><b>它的额定值是按电动机选的，很大</b>（要让电动机能正常启动，' +
      '而启动电流是额定的好几倍）。所以它保不了控制回路那点小电流 —— ' +
      '这就是为什么还要有 FU4、FU5。',
    'KM-1':'<b>交流接触器的主触头，三对，串在三相主电路里。</b>' +
      '<hr><b>这三对触头是「大电流那一头」</b>：电动机的工作电流全从这儿过，' +
      '所以触头做得又大又厚（2.2 那节讲接触器结构时看过）。' +
      '<hr>它们由控制回路里那个 <b>KM 线圈</b>控制：线圈得电 → 衔铁吸合 → ' +
      '这三对触头同时闭合。<b>「用小电流控大电流」，接触器的全部意义就在这儿。</b>',
    'FR':'<b>热继电器的热元件，三相各一个，串在主电路里。</b>' +
      '它的作用是<b>感受电流</b> —— 电流大了，双金属片受热弯曲。' +
      '<hr><b>但它自己不切断主电路</b>：切断的是控制回路里那对 <b>FR-1</b> 触点。' +
      '弯曲到一定程度把 FR-1 顶开 → KM 线圈失电 → 主触头释放 → 电动机停。' +
      '<hr>2.3 那节整节讲过它：<b>1.05 倍永不动作、1.2 倍 5 分钟、1.5 倍 1.8 分钟</b> ——' +
      '它管的是<b>过载</b>（慢慢来），短路那种瞬间的事归熔断器管。',
    'M':'<b>三相交流电动机，整张图上唯一真正干活的那个。</b>' +
      '<hr>接线柱标着 <b>U V W</b> —— 2.7 那节讲过接线盒：' +
      '<b>横着两块连接片 ＝ 星形，竖着三块 ＝ 三角形</b>。' +
      '<hr>图上画的是符号 <b>M 3~</b>，「3~」表示三相交流。' +
      '整张控制图存在的意义，就是让它<b>安全地起、停、并且在出事时被保护</b>。',
    'FU4':'<b>控制回路的熔断器。</b>它和 FU5 一起，专门保护控制回路。' +
      '<hr><b>为什么主电路有了还要单独装：额定值差太多。</b>' +
      'FU1~FU3 是按电动机的大电流选的；控制回路只有接触器线圈那点电流，几百毫安。' +
      '<b>控制回路真短路了，那点电流熔不断主电路的熔断器</b>，只会让线一直烧到冒烟。' +
      '<hr>这跟 8.3 讲的<b>「越往下游，额定值越小」</b>是同一条规律。',
    'FU5':'<b>控制回路的另一只熔断器。</b>控制回路是两根线（两相之间），' +
      '所以两根上各装一只。' +
      '<hr><b>这一只熔断了的典型现象</b>：整个控制回路没电 —— ' +
      '按起动按钮没反应、<b>两个指示灯都不亮</b>（屏 3 讲的那个状态）。' +
      '而主电路是好的，QS 也合着。',
    'SB2':'<b>停止按钮，用的是动断触点</b>（图上那一横）。' +
      '<hr><b>为什么停止用动断：失效安全。</b>4.3 那节讲过这条 ——' +
      '线断了、端子松了，效果和按下停止一样，设备立刻停；' +
      '要是用动合，<b>线一断这个停止按钮就永远按不动了，而且没人发现</b>。' +
      '<hr>急停、热继电器触点、安全门开关，全是动断，同一个道理。',
    'SB1':'<b>起动按钮，用的是动合触点。</b>按下它，控制回路接通，KM 线圈得电。' +
      '<hr><b>但松手它就弹回来了</b> —— 光有它就是「点动」：按着转、松手停。' +
      '所以旁边必须并一对<b>自锁触点 KM-2</b>（点它看）。' +
      '<hr>另外书上 9.2.1 第一条设计原则专门说了：' +
      '<b>「通常，启动按钮与停止按钮是直接连接的」</b> ——' +
      '这两个按钮多半装在同一个操作盒里，直接连能省一根线。9.2 那节会展开。',
    'KM-2':'<b>自锁触点：KM 自己的一对动合辅助触点，并在起动按钮两端。</b>' +
      '<hr><b>它是整张图最精巧的一处。</b>按下 SB1 → KM 线圈得电 → ' +
      'KM-2 跟着闭合 → <b>这时候松开 SB1，电流改从 KM-2 走，线圈继续得电</b>。' +
      '<b>接触器把自己「锁」住了。</b>' +
      '<hr>4.4 屏 3 整屏讲的就是这个。它还顺带给了一个白送的功能：' +
      '<b>失压保护</b> —— 停电时 KM 释放、KM-2 断开，' +
      '来电后不会自己转起来，必须有人再按一次 SB1。',
    'KM':'<b>交流接触器的线圈</b>，整个控制回路的终点。' +
      '<hr>它得电 → 衔铁吸合 → <b>所有触点同时动作</b>：' +
      '主电路的 KM-1 闭合（电动机转）、KM-2 闭合（自锁）、' +
      'KM-4 闭合（运行灯亮）、KM-3 断开（停机灯灭）。' +
      '<hr><b>一个线圈带动四组触点，这就是接触器的价值。</b>' +
      '5.3 那节讲过怎么量它：实测约 <b>1.694 kΩ</b>，' +
      '而且可以<b>用手按住接触器上端强制吸合再量一次</b>，不用接 380V。',
    'FR-1':'<b>热继电器的触点，动断，串在控制回路里。</b>' +
      '<hr>主电路里那三个热元件感受到过载 → 双金属片弯曲 → ' +
      '把这对触点<b>顶开</b> → KM 线圈失电 → 电动机停。' +
      '<hr><b>热继电器就是靠这一对触点起作用的</b>，它自己不切断主电路。' +
      '所以现场量热继电器（5.3、9.5 都会用到）量的是这对触点通不通。' +
      '<hr>还有一条：<b>它跳闸后要等凉透了才能复位</b>（2.3 讲过），' +
      '按不动复位键不是坏了，是还热着。',
    'KM-3':'<b>接触器的一对动断辅助触点，串着停机指示灯 HL2。</b>' +
      '<hr>KM 没得电时它是闭合的 ⇒ <b>停机灯亮</b>；' +
      'KM 一吸合它就断开 ⇒ 停机灯灭。' +
      '<hr>「动断」这件事在图上就是那一横（4.3 讲的判据）。' +
      '<b>书上没有一句话说明它是动断，是从「停机指示灯」这个名字推出来的</b> ——' +
      '要让它在停机时亮，就只能串动断。',
    'HL2':'<b>停机指示灯。</b>它亮着表示接触器已经释放、主电路不带电。' +
      '<hr><b>它的价值在于「控制箱的门是关着的」</b>：' +
      '不用开门就知道里面是什么状态。' +
      '<hr>更值钱的是<b>它和运行灯「两个都不亮」的那个状态</b>（屏 3 第三档）：' +
      '那不属于任何正常状态，说明<b>控制回路本身没电了</b>。',
    'KM-4':'<b>接触器的一对动合辅助触点，串着运行指示灯 HL1。</b>' +
      '<hr>KM 得电吸合 → 它闭合 ⇒ <b>运行灯亮</b>。' +
      '<hr>它和 KM-3 是一对：<b>一个动合、一个动断，所以两个灯永远一亮一灭。</b>' +
      '<hr>顺带一提：4.5 那节讲的<b>端子编号规则</b>在这儿用得上 ——' +
      '接触器辅助触点的两位数编号里，<b>个位 1、2 是动断，个位 3、4 是动合</b>。' +
      '现场分不清哪对是哪对，看端子上印的数字就行。',
    'HL1':'<b>运行指示灯。</b>它亮着表示 KM 已经吸合、主电路带电、电动机在转。' +
      '<hr><b>这时候绝对不能开柜门。</b>指示灯回答的正是「我现在能不能动手」这个问题。' +
      '<hr>颜色上现场一般是<b>红灯表示运行（带电，危险）、绿灯表示停机（安全）</b> ——' +
      '和交通灯的直觉正好相反，因为这儿说的是「设备带不带电」不是「能不能走」。' +
      '各厂习惯不同，<b>以柜上标的为准</b>。'
  }[d[0]];
  $('n0').innerHTML = '<div class="st">' + d[0] + '　' + d[7] + '</div>' + D;
}

/* ================================================================
   场景 2：比点动图多了什么
   ================================================================
   只画控制回路（放大），四档各圈一处 ——
   主电路那部分和这一屏要讲的事无关，画了只会挤 */
const S2 = { k:0 };
const T2 = 56, B2 = 226;             /* 这一屏的控制母线 */
const X2 = 128;                      /* 主控支路 */
function draw2(){
  const g = st2.g; st2.clear();
  const k = S2.k;
  EP.heading(g, 14, 20, '控制回路', ['自锁触点','停止按钮','控制回路熔断器','两个指示灯'][k]);

  seg(g, [[40, T2],[340, T2]], C.wire, 2);
  seg(g, [[40, B2],[340, B2]], C.wire, 2);
  txt(g, '控制回路　两根母线', 40, 42, {sz:8.5, b:1, c:C.tx3, al:'left'});

  /* 两只控制熔断器画在母线两端 */
  fuse(g, 62, T2, true);
  txt(g, 'FU4', 62, T2 - 14, {sz:8, b:1, c: k === 2 ? C.acc : C.tx3});
  fuse(g, 62, B2, true);
  txt(g, 'FU5', 84, B2, {sz:8, b:1, c: k === 2 ? C.acc : C.tx3, al:'left'});

  /* 主控支路 */
  seg(g, [[X2, T2],[X2, 74]], C.wire, 1.8);
  btn(g, X2, 88, true, false);
  txt(g, 'SB2', X2 - 12, 70, {sz:8, b:1, c: k === 1 ? C.acc : C.tx3, al:'right'});
  seg(g, [[X2, 102],[X2, 118]], C.wire, 1.8);
  btn(g, X2, 132, false, false);
  txt(g, 'SB1', X2 + 30, 132, {sz:8, b:1, c:C.tx3, al:'left'});
  seg(g, [[X2, 118],[96, 118],[96, 124]], C.wire, 1.6);
  noC(g, 96, 132, false, 0.9);
  seg(g, [[96, 140],[96, 148],[X2, 148]], C.wire, 1.6);
  txt(g, 'KM-2', 80, 132, {sz:8, b:1, c: k === 0 ? C.acc : C.tx3, al:'right'});
  seg(g, [[X2, 146],[X2, 162]], C.wire, 1.8);
  coil(g, X2, 182, false, 'KM');
  seg(g, [[X2, 202],[X2, B2]], C.wire, 1.8);
  dot(g, X2, T2, C.wire, 2.6); dot(g, X2, B2, C.wire, 2.6);

  /* 两条指示灯支路 */
  [[232, 'KM-3', 'HL2', true], [300, 'KM-4', 'HL1', false]].forEach(function(a){
    const x = a[0];
    seg(g, [[x, T2],[x, 82]], C.wire, 1.8);
    if(a[3]) ncC(g, x, 96, false, 0.9); else noC(g, x, 96, false, 0.9);
    txt(g, a[1], x + 14, 86, {sz:8, b:1, c: k === 3 ? C.acc : C.tx3, al:'left'});
    seg(g, [[x, 109],[x, 146]], C.wire, 1.8);
    hlamp(g, x, 164, a[3]);
    txt(g, a[2], x + 14, 180, {sz:8, b:1, c: k === 3 ? C.acc : C.tx3, al:'left'});
    seg(g, [[x, 182],[x, B2]], C.wire, 1.8);
    dot(g, x, T2, C.wire, 2.6); dot(g, x, B2, C.wire, 2.6);
  });

  /* 圈出这一档讲的东西 */
  if(k === 0) hot(g, 96, 132, 0, {w:34, h:40, r:7});
  if(k === 1) hot(g, X2 + 8, 88, 0, {w:56, h:34, r:7});
  if(k === 2){ hot(g, 62, T2, 0, {w:44, h:26, r:6}); hot(g, 62, B2, 0, {w:44, h:26, r:6}); }
  if(k === 3) hot(g, 266, 130, 0, {w:130, h:112, r:9});

  const CC = [
    ['ok',  '自锁：松手也不停', '按下 SB1 → KM 得电 → KM-2 闭合 → 电流改从 KM-2 走'],
    ['ok',  '停止按钮：用动断，失效安全', '线断了效果和按下停止一样 —— 设备立刻停'],
    ['err', '控制回路单独一对熔断器', '主电路那几只是按电动机的大电流选的，熔不断这点电流'],
    ['warn','两个指示灯：隔着柜门看状态', '一动合一动断，所以永远一亮一灭']
  ][k];
  conc(g, 244, CC[0], CC[1], CC[2]);
}
function note2(){
  const T = [
    ['KM-2', '松手就停', '按着不放',
     '<div class="st">① 自锁触点 KM-2</div>' +
     '点动图里只有一个起动按钮：<b>按住转、松手停</b>。' +
     '真装一台设备这样根本没法用 —— 总不能让操作工按着按钮站一天。' +
     '<hr><b>解法是并一对接触器自己的动合触点在起动按钮两端。</b>' +
     '按下 SB1 → KM 线圈得电 → KM-2 跟着闭合 → ' +
     '<b>这时候松开 SB1，电流改从 KM-2 走，线圈继续得电</b>。接触器把自己锁住了。' +
     '<hr><b>白送的一个功能：失压保护。</b>' +
     '停电时 KM 释放、KM-2 断开；来电之后线圈是没电的，' +
     '<b>设备不会自己转起来</b>，必须有人再按一次 SB1。' +
     '<span class="sub">这一条 2.2 讲接触器时提过：失压保护是自锁的副产品，' +
     '却是它最重要的安全价值 —— 想象一下车间里几十台设备来电瞬间同时启动。</span>'],
    ['SB2', '停不下来', '只能拉总闸',
     '<div class="st">② 停止按钮 SB2（动断）</div>' +
     '有了自锁就必须有停止按钮 —— <b>不然锁上了就下不来</b>，只能去拉总闸。' +
     '<hr><b>它用的是动断触点</b>（图上那一横），串在控制回路里。' +
     '平时闭合让电流通过，按下就把回路断开 → KM 失电 → KM-2 跟着断 → ' +
     '<b>松手之后 SB2 恢复闭合，但 KM 已经释放了，自锁没了，所以不会自己起来。</b>' +
     '<hr><b>为什么停止一定要用动断：失效安全</b>（4.3 那节讲的）。' +
     '线断了、端子松了，效果和按下停止一样，设备立刻停；' +
     '要是用动合，<b>线一断这个停止按钮就永远按不动了，而且平时完全看不出来</b>。'],
    ['FU4 FU5', '控制回路烧线', '牵连主电路',
     '<div class="st">③ 控制回路的熔断器 FU4、FU5</div>' +
     '主电路已经有 FU1~FU3 了，为什么还要单独装两只？' +
     '<hr><b>因为额定值差太多。</b>' +
     'FU1~FU3 是按电动机选的：要让电动机能正常启动，' +
     '而<b>启动电流是额定电流的好几倍</b>，所以它们的额定值必须很大。' +
     '<hr>控制回路呢？只有<b>接触器线圈那点电流，几百毫安</b>。' +
     '<b>控制回路真短路了，那点电流根本熔不断主电路那几只熔断器</b> ——' +
     '结果是控制回路那根细线一直烧，直到冒烟起火。' +
     '<hr>这跟 8.3 讲的<b>「越往下游，额定值越小」</b>是同一条规律，' +
     '只是从配电支路搬到了控制回路上。'],
    ['HL1 HL2', '看不出状态', '得开柜门',
     '<div class="st">④ 两个指示灯 HL1、HL2</div>' +
     '前三样解决的是「能不能用」，这一样解决的是<b>「能不能看」</b>。' +
     '<hr><b>控制箱的门是关着的。</b>' +
     '不装指示灯的话，想知道设备在不在转就得开门看接触器吸没吸合 ——' +
     '而<b>运行时开柜门是危险动作</b>。' +
     '<hr>两个灯各串一对接触器辅助触点：<b>运行灯 HL1 串动合、停机灯 HL2 串动断</b>，' +
     '所以永远一亮一灭。屏 3 整屏讲这个。' +
     '<hr>书上 9.1 那段话把它单列成一项功能：' +
     '<b>「指示灯指示当前系统的工作状态」</b> ——' +
     '和「控制按钮发送指令」「保护器件负责安全」并列。']
  ][S2.k];
  $('s2a').textContent = T[0];
  $('s2b').textContent = T[1];
  $('s2c').textContent = T[2];
  $('n1').innerHTML = T[3];
}

/* ================================================================
   场景 3：两个指示灯
   ================================================================
   只画线圈 + 两对触点 + 两个灯，放大到能看清那一横。
   三档：停机 / 运行 / 两个都不亮 —— **第三档才是这一屏的落点** */
const S3 = { k:0 };
function draw3(){
  const g = st3.g; st3.clear();
  const k = S3.k;
  const live = k === 1;               /* KM 得电？ */
  const dead = k === 2;               /* 控制回路整个没电？ */
  EP.heading(g, 14, 20,
    ['停机状态','运行状态','两个都不亮'][k],
    ['KM 没得电','KM 吸合了','控制回路本身断了'][k]);

  const TT = 56, BB = 214;
  seg(g, [[36, TT],[334, TT]], dead ? C.tx3 : C.wire, dead ? 1.4 : 2.2);
  seg(g, [[36, BB],[334, BB]], dead ? C.tx3 : C.wire, dead ? 1.4 : 2.2);
  if(dead){
    g.save(); g.strokeStyle = C.err; g.lineWidth = 2.4; g.lineCap = 'round';
    g.beginPath();
    g.moveTo(52, TT - 8); g.lineTo(64, TT + 8);
    g.moveTo(64, TT - 8); g.lineTo(52, TT + 8);
    g.stroke(); g.restore();
    EP.chip(g, 'FU5 熔断 / FR-1 跳开 / 断线', 178, 38, {sz:9, b:1, c:C.err});
  } else {
    txt(g, '控制回路　有电', 36, 40, {sz:8.5, b:1, c:C.tx3, al:'left'});
  }

  /* KM 线圈那一支 */
  seg(g, [[76, TT],[76, 100]], dead ? C.tx3 : C.wire, 1.8);
  coil(g, 76, 120, live, '');
  txt(g, 'KM', 76, 148, {sz:9, b:1, c: live ? C.acc : C.tx2});
  txt(g, live ? '得电' : '没电', 76, 162, {sz:8.5, b:1, c: live ? C.acc : C.tx3});
  seg(g, [[76, 140],[76, BB]], dead ? C.tx3 : C.wire, 1.8);
  dot(g, 76, TT, C.wire, 2.6); dot(g, 76, BB, C.wire, 2.6);

  /* 两个灯 */
  [[192, 'KM-3', 'HL2', '停机灯', true], [292, 'KM-4', 'HL1', '运行灯', false]].forEach(function(a){
    const x = a[0], isNC = a[4];
    /* 亮不亮：动断触点在 KM 没得电时导通、动合在得电时导通；控制回路断了都不亮 */
    const cond = isNC ? !live : live;
    const on = cond && !dead;
    seg(g, [[x, TT],[x, 76]], dead ? C.tx3 : C.wire, 1.8);
    if(isNC) ncC(g, x, 92, live); else noC(g, x, 92, live);
    txt(g, a[1], x + 18, 80, {sz:8.5, b:1, c:C.tx3, al:'left'});
    txt(g, isNC ? '动断' : '动合', x + 18, 94, {sz:8, c: isNC ? C.warn : C.ok, al:'left'});
    txt(g, cond ? '闭合' : '断开', x + 18, 106, {sz:8, b:1, c: cond ? C.ok : C.tx3, al:'left'});
    seg(g, [[x, 106],[x, 138]], dead ? C.tx3 : C.wire, 1.8);
    hlamp(g, x, 156, on);
    /* 灯名两行画在灯正下方、状态单独放灯右边 ——
       原来「HL2　停机灯」一整串居中，和下面那个「灭」看着不像一组（截图抓到的） */
    /* 亮着时光晕半径 17（到 y=173），灯名放 180 会被糊住 */
    txt(g, a[2], x, 185, {sz:9, b:1, c: on ? C.warn : C.tx2});
    txt(g, a[3], x, 198, {sz:8, c:C.tx3});
    txt(g, on ? '亮' : '灭', x + 22, 156, {sz:11, b:1, c: on ? C.warn : C.tx3, al:'left'});
    seg(g, [[x, 174],[x, BB]], dead ? C.tx3 : C.wire, 1.8);
    dot(g, x, TT, C.wire, 2.6); dot(g, x, BB, C.wire, 2.6);
  });

  const CC = [
    ['acc', '停机灯亮、运行灯灭', 'KM 没得电 ⇒ 动断闭合、动合断开'],
    ['ok',  '运行灯亮、停机灯灭', 'KM 吸合 ⇒ 两对触点同时翻转'],
    ['err', '两个都不亮 —— 不是正常状态', '说明控制回路本身没电了，赶紧查 FU5 和 FR-1']
  ][k];
  conc(g, 234, CC[0], CC[1], CC[2]);
}
function note3(){
  const k = S3.k;
  $('s3a').textContent = ['没电','得电','没电'][k];
  $('s3b').textContent = ['灭','亮','灭'][k];
  $('s3c').textContent = ['亮','灭','灭'][k];
  const T = [
    ['停机状态：停机灯亮着',
     'KM 线圈没得电 → 衔铁没吸合 → 所有触点都在<b>未操作状态</b>（4.3 那条第一原则）：' +
     '<b>KM-3 动断，未操作时是闭合的 ⇒ 停机灯 HL2 亮</b>；' +
     '<b>KM-4 动合，未操作时是断开的 ⇒ 运行灯 HL1 灭</b>。' +
     '<hr>这时候主电路的 KM-1 也是断开的，<b>电动机不转、主电路不带电</b>。' +
     '停机灯亮着就是在告诉你这件事。'],
    ['运行状态：两对触点同时翻转',
     '按下 SB1 → KM 线圈得电 → 衔铁吸合 → <b>它带动的所有触点同时动作</b>：' +
     '<hr>主电路的 <b>KM-1 闭合</b>（电动机转起来）、' +
     '<b>KM-2 闭合</b>（自锁上了）、' +
     '<b>KM-4 闭合</b>（运行灯亮）、' +
     '<b>KM-3 断开</b>（停机灯灭）。' +
     '<hr><b>一个线圈带动四组触点，这就是接触器的价值。</b>' +
     '注意 KM-3 和 KM-4 是<b>同时</b>动作的 —— ' +
     '所以两个灯的切换是一瞬间完成的，不会出现「都亮」的中间状态。'],
    ['两个都不亮：这才是这一屏的重点',
     '<b>这不属于任何一种正常状态。</b>正常只有两种：停机灯亮，或者运行灯亮。' +
     '<hr>两个都不亮，说明<b>给这两个灯供电的那条控制回路断了</b>。常见的三个原因：' +
     '<b>FU5（或 FU4）熔断</b>、<b>FR-1 跳开了</b>（热继电器动作过，' +
     '还没复位或者没凉透）、<b>控制回路某处断线</b>。' +
     '<hr><b>这就是为什么要装两个灯而不是一个。</b>' +
     '只装运行灯的话，灯不亮有两种可能：设备停着（正常），或者控制回路断了（故障）——' +
     '<b>你分不出来</b>。加一个停机灯，两个灯的四种组合里，' +
     '两种是正常、一种是故障、还有一种（都亮）在物理上不可能出现。' +
     '<hr>9.4 讲故障排查时，<b>「两个灯都不亮」就是一条现成的线索</b>：' +
     '直接跳到控制回路去查，不用管主电路。']
  ][k];
  $('n2').innerHTML = '<div class="st' + (k === 2 ? ' bad' : '') + '">' + T[0] + '</div>' + T[1];
}

/* ================================================================
   场景 4：直流那一款（图 9-4 简化）
   ================================================================
   四档：停机 / 刚起动（R1+R2 都串着）/ KT1 到时（短掉 R1）/ KT2 到时（短掉 R2）。
   **转速条要跟着变** —— 「电阻越切越少、转速越来越高」这件事画出来才看得懂 */
const S4 = { k:0 };
const RS = [
  {r:'—',       n:0,   who:'—',    spd:0},
  {r:'R1 + R2', n:2,   who:'—',    spd:0.34},
  {r:'只剩 R2', n:1,   who:'KM2-1', spd:0.66},
  {r:'全短掉',   n:0,   who:'KM3-1', spd:1}
];
function draw4(){
  const g = st4.g; st4.clear();
  const k = S4.k, st = RS[k];
  EP.heading(g, 14, 20, ['停机','刚起动','KT1 到时','KT2 到时'][k],
             ['KM1 没得电','两级电阻都串着','短掉 R1','短掉 R2，全速'][k]);

  /* 直流电源两根母线 */
  const TT = 54, BB = 206;
  seg(g, [[34, TT],[336, TT]], C.wire, 2.2);
  seg(g, [[34, BB],[336, BB]], C.wire, 2.2);
  txt(g, '＋', 28, TT, {sz:11, b:1, c:C.L, al:'right'});
  txt(g, '－', 28, BB, {sz:11, b:1, c:C.N, al:'right'});
  txt(g, '直流供电', 40, 40, {sz:8.5, b:1, c:C.tx3, al:'left'});

  /* 电枢回路：KM1-1 → M → R1 → R2 */
  const AX = 106;
  seg(g, [[AX, TT],[AX, 68]], C.wire, 1.8);
  noC(g, AX, 82, k > 0, 0.9);
  txt(g, 'KM1-1', AX + 14, 82, {sz:8, b:1, c:C.tx3, al:'left'});
  seg(g, [[AX, 90],[AX, 99]], C.wire, 1.8);
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.6;
  g.beginPath(); g.arc(AX, 112, 13, 0, Math.PI*2); g.stroke(); g.restore();
  txt(g, 'M', AX, 112, {sz:10, b:1, c:C.tx2});
  seg(g, [[AX, 125],[AX, 136]], C.wire, 1.8);
  /* 两级起动电阻，各配一条**旁路** —— 旁路上串一对动合触点，闭合就把电阻短掉。
     第一版把旁路画成一个包住电阻的方框，看着像电阻自己变了颜色（截图抓到的） */
  [[136, 'R1', 'KM2-1', k >= 2], [170, 'R2', 'KM3-1', k >= 3]].forEach(function(a){
    const y = a[0], shorted = a[3];
    box(g, AX - 15, y, 30, 14, 2, C.card, P.ink, 1.3);
    txt(g, a[1], AX, y + 7, {sz:8, b:1, c:C.tx2});
    const bx = AX - 48, y0 = y - 4, y1 = y + 18;
    const col = shorted ? C.ok : C.tx3, lw = shorted ? 2.2 : 1.3;
    seg(g, [[AX, y0],[bx, y0],[bx, y0 + 5]], col, lw);
    seg(g, [[bx, y1 - 5],[bx, y1],[AX, y1]], col, lw);
    noC(g, bx, (y0 + y1)/2, shorted, 0.62);
    dot(g, AX, y0, C.wire, 2.2); dot(g, AX, y1, C.wire, 2.2);
    txt(g, a[2], bx - 10, (y0 + y1)/2, {sz:7.5, b:1, c: col, al:'right'});
    if(shorted) EP.chip(g, '短掉了', AX + 22, y + 7, {sz:8, b:1, c:C.ok, al:'left'});
  });
  seg(g, [[AX, 188],[AX, BB]], C.wire, 1.8);
  dot(g, AX, TT, C.wire, 2.6); dot(g, AX, BB, C.wire, 2.6);

  /* 控制回路：KM1 线圈 + 两只时间继电器 */
  [[212, 'KM1', k > 0], [268, 'KT1', k > 0], [316, 'KT2', k >= 2]].forEach(function(a){
    const x = a[0], on = a[2];
    seg(g, [[x, TT],[x, 96]], C.wire, 1.8);
    coil(g, x, 116, on, '');
    txt(g, a[1], x, 142, {sz:9, b:1, c: on ? C.acc : C.tx2});
    seg(g, [[x, 136],[x, BB]], C.wire, 1.8);
    dot(g, x, TT, C.wire, 2.6); dot(g, x, BB, C.wire, 2.6);
  });
  txt(g, '时间继电器', 292, 158, {sz:8, c:C.tx3});

  /* 转速条 */
  const sy = 228;
  box(g, 34, sy, 302, 16, 3, C.box, C.boxLine, 1);
  g.save(); g.fillStyle = C.ok; g.globalAlpha = .55;
  g.fillRect(35, sy + 1, 300 * st.spd, 14); g.restore();
  txt(g, '转速', 34, sy - 10, {sz:8.5, b:1, c:C.tx3, al:'left'});
  txt(g, Math.round(st.spd * 100) + ' %', 336, sy - 10, {sz:8.5, b:1, c:C.ok, al:'right'});

  conc(g, 254, k === 3 ? 'ok' : 'acc',
    k === 0 ? '停机：KM1 没得电' : ('串在回路里的电阻：' + st.r),
    k === 0 ? '按下 SB1 才开始' : (k === 1 ? '两级电阻都在，把起动电流压住' :
      ('由 ' + st.who + ' 短掉一级 —— 时间继电器到时了')));
}
function note4(){
  const k = S4.k, st = RS[k];
  $('s4a').textContent = st.r;
  $('s4b').textContent = Math.round(st.spd * 100) + ' %';
  $('s4c').textContent = st.who;
  const T = [
    ['停机：和交流那张一个样',
     'QS1 合着、控制回路有电，但 <b>KM1 线圈没得电</b>，主触点 KM1-1 断开，' +
     '电动机不转。' +
     '<hr>结构上跟交流那张图是同一个路子：' +
     '<b>总开关 → 熔断器 → 接触器主触点 → 电动机</b>，' +
     '控制回路里<b>起动按钮 SB1、停止按钮 SB2、自锁触点 KM1-2</b>。' +
     '<hr>差别只在两处：<b>电源是直流</b>，' +
     '而且电枢回路里<b>串了两级起动电阻 R1、R2</b>。'],
    ['刚起动：两级电阻都串着',
     '按下 SB1 → KM1 得电 → KM1-1 闭合，电流开始流。' +
     '<b>但这时候 R1 和 R2 都还串在回路里。</b>' +
     '<hr><b>为什么要串电阻：把起动电流压下来。</b>' +
     '电动机刚起动时转速为零，反电动势也是零，' +
     '<b>这一瞬间的电流是额定电流的好几倍</b>。' +
     '直接起动会让电网电压跌一下，机械部分也会猛地一顿。' +
     '<hr>串上电阻之后电流小了，代价是<b>转矩也小、转得慢</b> ——' +
     '所以电阻不能一直串着，要在转速上来之后<b>一级一级切掉</b>。' +
     '<b>切的时机由时间继电器 KT1、KT2 决定。</b>'],
    ['KT1 到时：短掉第一级',
     'KM1 得电的同时 KT1 也开始计时。<b>到时之后 KT1 的延时触点动作 → ' +
     'KM2 线圈得电 → KM2-1 闭合，把 R1 短掉。</b>' +
     '<hr>回路里只剩 R2 了 ⇒ 电流上升 ⇒ 转矩上升 ⇒ <b>转速继续往上爬</b>。' +
     '<hr><b>为什么用时间继电器而不是人工去切</b>：' +
     '这个过程只有几秒，人反应不过来，而且每次都要一样快。' +
     '2.3 那节讲过时间继电器的两种方式：' +
     '<b>通电延时</b>和<b>断电延时</b> —— 这儿用的是通电延时。'],
    ['KT2 到时：全部短掉，进入全速',
     'KT1 之后 KT2 接着计时，到时 → <b>KM3 得电 → KM3-1 闭合，把 R2 也短掉</b>。' +
     '<hr>这下电枢回路里没有额外电阻了，电动机<b>进入正常运行状态</b>。' +
     '整个起动过程分成了<b>三级</b>：两级电阻 → 一级电阻 → 无电阻。' +
     '<hr><b>这套「按时间分级」的思路，第 11 章还要用一遍。</b>' +
     '那儿讲的是三相异步电动机的<b>串电阻减压启动</b>和<b>星三角启动</b>，' +
     '道理完全一样：<b>起动时先压一下，等转速上来再放开</b>，' +
     '切换的时机交给时间继电器。' +
     '<hr>2.7 那节说过<b>现场 95% 是三相异步电动机</b>，' +
     '直流的现在少见 —— 这一屏值得记住的不是直流本身，是这个套路。']
  ][k];
  $('n3').innerHTML = '<div class="st">' + T[0] + '</div>' + T[1];
}

/* ================================================================
   舞台、事件、收尾
   ================================================================ */
const st1 = new Stage('cv0', 360, 342);
const st2 = new Stage('cv1', 360, 288);
const st3 = new Stage('cv2', 360, 280);
const st4 = new Stage('cv3', 360, 298);

st1.cv.addEventListener('click', function(ev){
  const p = st1.pick(ev);
  let bd = 1e9, hit = -1;
  DEV.forEach(function(d, i){
    if(Math.abs(p[0] - d[1]) > d[3] + 8 || Math.abs(p[1] - d[2]) > d[4] + 8) return;
    const dd = Math.hypot(p[0] - d[1], p[1] - d[2]);
    if(dd < bd){ bd = dd; hit = i; }
  });
  if(hit >= 0){ S1.k = hit; note1(); draw1(); }
});
['s2k','s3k','s4k'].forEach(function(id, n){
  document.getElementById(id).addEventListener('click', function(e){
    const b = e.target.closest('.btn'); if(!b) return;
    const v = +b.dataset.k;
    [S2, S3, S4][n].k = v;
    document.querySelectorAll('#' + id + ' .btn').forEach(function(x){
      x.classList.toggle('on', +x.dataset.k === v);
    });
    [note2, note3, note4][n]();
    [draw2, draw3, draw4][n]();
  });
});

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会重设尺寸并清空。**四屏全是静态的，必须在这儿逐个补画** */
  draw1(); draw2(); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:9, sec:'9.1'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('9.1');
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
