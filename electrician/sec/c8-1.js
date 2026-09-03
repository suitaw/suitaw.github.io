/* 8.1 电是怎么送到你家的 —— 本节内容的唯一真相。
   对应《零基础学电工》第 8 章 8.1 节（书内 P139~P142）。

   **第 8 章的排法（2026-09-03 定）**：书上分三节（8.1 特点与控制关系 /
   8.2 设计安装 / 8.3 检修调试），但 8.2 有一大半是安装流程实物照片
   （打孔、装绝缘木板、挂电能表、拧端子），**网页教不了手上的活**。
   8.3.1 高压检修**整节不做** —— 低压电工作业证的范围是交流 1 kV 以下，
   高压隔离开关、高压熔断器、高压电流互感器不是你能碰的东西，屏 1 点一句就够。
   所以重排成四节：8.1 电是怎么送到你家的 / 8.2 配电箱里都有什么 /
   8.3 选多大的断路器和线 / 8.4 停电了怎么查。

   四屏：① 一条链，你能碰哪一段 ② 进了楼分三级 ③ 四种接线方式 ④ 三种楼怎么配

   数字与说法的出处（书上原文，别凭记忆改）：
   - **高压供配电线路是指 6~10 kV 的供电和配电线路**，主要实现将电力系统中
     **35~110 kV** 供电电压降为 6~10 kV 的高压配电电压，供给高压变电所、
     车间变电所及高压用电设备等使用（书 P139 原文）
   - **低压供配电线路是指 380V/220V 的供电和配电线路**，主要实现交流电压的
     传输和分配；主要由各种低压供配电器件和设备按照一定的控制关系连接构成（书 P140）
   - 图 8-1 的两条标注：**高压供配电部分主要用来传输电能** /
     **高压配电线路主要用来分配电能** —— 「供」和「配」的分别就在这两句里
   - 图 8-1 的铭牌与器件：电力变压器 T1 **6300 kV·A　Yd11　35/10 kV**；
     配电变压器 T2 **50 kV·A　Yyn0　10/0.4 kV**；母线 WB；
     避雷器 F、高压隔离开关 QS、高压断路器 QF、高压熔断器 FU、
     电压互感器 TV、电流互感器 TA。
     图注：**高压断路器是高压供配电线路中的保护装置，当负载线路中发生短路故障时，
     高压断路器会自行断开进行保护**
   - 书 P139 提示说明（做成了屏 1 的一张卡）：供配电线路**连接关系比较简单**，
     电压或电流传输的**方向也比较单一**，基本上都是按照顺序关系
     **从上到下或从左到右传输**，且大部分组成部件**只是简单地实现接通与断开
     两种状态，没有复杂的变换、控制和信号处理电路**
   - 图 8-2 低压侧：进线 **YJV-4×70 + BV-1×35　FPC32**；
     **QF1　RCD-4300,160A　I∆n = 300~500 mA**（图注：带漏电保护的断路器
     **对接地故障所引起的电击事故的防范具有很高的灵敏度**）；
     电能表 **DDS×××-4　15(60) A**；总断路器 QF2 **32 A**；
     户内支路 QF6~QF11 各 **20 A**、QF12 **25 A**、QF13 **32 A**
     （后两个 I∆n = **300 mA**）；用途行：照明1 照明2 空调1 空调2 空调3 备用
     厨房插座 客厅插座 卧室插座
   - 图 8-6 四种连接方式（提示说明原文）：
     **放射式**一般在较重要的负荷配电时使用；**树干式**一般在照明场所配电时使用；
     **混合式**是一种介于放射和树干之间的配电方式；
     **链式**一般在设备距离配电箱较远，而设备之间距离较近的不重要的小容量设备
     配电时使用，**连接台数不宜超过 4 台**。
     并且：**很少有单独使用基本接线方式的**，大多根据实际需求综合运用各种连接方式
   - 图 8-3 多层建筑：**采用混合式接线，由低压配电柜为各楼层的配电箱供电**
   - 图 8-4 多单元住宅楼：**各单元由单元内的总配电箱向各楼层的配电箱供电**
   - 图 8-5 高层建筑：**用电不均匀的部分采用增设分区配电箱配电的方式**；
     **照明配电线路多采用树干式接线方式**

   自己加的、书上没写的两处，文案里都标了口径：
   - **交流 1000 V 是高压/低压的分界**，低压电工作业证管 1 kV 以下 ——
     出处是特种作业人员管理规定里对低压电工作业的定义，不是这本书；题库里也考
   - **30 mA 是保人的、300 mA 以上是保线路的**（分级整定）。书上图 8-2 里
     户内插座支路标的是 I∆n=300 mA，而现行住宅规范要求插座回路不大于 30 mA。
     按老规矩处理：**照书记，但把真相写出来**（和题库第 527 题同样的办法）*/
(function(){
'use strict';
ELEC.reg({
  id: '8.1',
  file: 'c8-1.html',
  title: '8.1 电是怎么送到你家的',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>一条链</button>
    <button class="tab" data-i="1"><span class="n">2</span>进楼分三级</button>
    <button class="tab" data-i="2"><span class="n">3</span>四种接线</button>
    <button class="tab" data-i="3"><span class="n">4</span>三种楼</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">这一屏最重要的不是那几个电压</div>
    是记住<b>哪一段你能碰、哪一段不能</b>。低压电工作业证管的是
    <b>交流 1000 V 以下</b>，上面那几级是另一个证的活。
    <b>点链条上的任意一级，看它是干什么的。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="nums three">
        <div class="num"><div class="k">这一级</div><div class="v" id="s1a">电力系统</div></div>
        <div class="num"><div class="k">电压</div><div class="v" id="s1b">35~110 kV</div></div>
        <div class="num hi"><div class="k">你能碰吗</div><div class="v" id="s1c">不能</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">「供」和「配」是两件事，章名里两个字各有所指</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>字</th><th>干什么</th><th>图上长什么样</th></tr></thead>
      <tbody>
        <tr><td class="eu-s"><b>供</b>电</td><td>把电<b>送过来</b><br><span class="sub">传输电能</span></td>
          <td>一路进　→　一路出<br><span class="sub">中间是变压器、断路器</span></td></tr>
        <tr><td class="eu-s"><b>配</b>电</td><td>把电<b>分出去</b><br><span class="sub">分配电能</span></td>
          <td>一路进　→　好几路出<br><span class="sub"><b>母线就是分界点</b></span></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      书上图 8-1 上并排贴着两条标注：<b>「高压供配电部分主要用来传输电能」</b>、
      <b>「高压配电线路主要用来分配电能」</b>。
      <span class="sub">看图时找母线（那根横着的粗线）：<b>母线以前是供，母线以后是配。</b>
      这条在低压侧一样成立 —— 配电箱里那排接线端子板就是低压的母线。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st good">供配电图比第 4 章那种原理图好读得多</div>
    书 P139 的原话：供配电线路<b>连接关系比较简单</b>，电压或电流传输的
    <b>方向也比较单一</b>，基本上都是<b>按顺序从上到下或从左到右传输</b>，
    且大部分部件<b>只是简单地实现接通与断开两种状态，没有复杂的变换、控制和信号处理电路</b>。
    <div class="tip info">
      <b>所以读供配电图不用像 4.4 那样分主／控两块、找自锁。</b>
      <span class="sub">顺着电往下走一遍就读完了：从哪进来 → 经过谁 → 分成几路 → 各去哪儿。
      难的地方不在读图，在<b>记住每一级的额定值和整定值</b>，那是 8.3 的事。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">1000 V 这条线，是法律画的不是技术画的</div>
    <b>低压电工作业证的范围是交流 1 kV 以下</b>，上面四级全是高压电工的活 ——
    高压隔离开关、高压熔断器、高压电流互感器，那是另一个证。
    <div class="tip">
      <b>这一条不是「小心点就行」，是无证操作违法。</b>
      <span class="sub">出处是特种作业人员管理规定里对低压电工作业的定义，
      不是这本教材；题库里也考。书上 8.3.1 那一整节高压检修，这门课不做，
      认得出图上那几个符号就够了。</span>
    </div>
  </div>

  <div class="bet" data-bet="c81-hv" data-q="书上说的「高压供配电线路」是多少千伏？"
       data-opts="35 ~ 110 kV|6 ~ 10 kV|380 V / 220 V"
       data-right="1"
       data-after="6~10 kV。书上定义写死了：高压供配电线路是指 6~10 kV 的供电和配电线路，它要做的事就是把电力系统那边 35~110 kV 的电降下来，变成 6~10 kV 送给高压变电所、车间变电所和高压用电设备。所以 35~110 kV 是它的上一级（电网），不是它本身。"></div>
</section>

<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">跳闸了，先看是哪一级跳的</div>
    电进了楼要过<b>三道闸</b>：楼道总配电箱 → 楼层配电箱 → 你家配电盘。
    每一级管的范围不一样，<b>哪一级跳，就知道是谁的事</b>。
    <b>点某一级看它里面有什么、归谁管。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="nums three">
        <div class="num"><div class="k">这一级</div><div class="v" id="s2a">进户</div></div>
        <div class="num"><div class="k">跳了<br>影响谁</div><div class="v" id="s2b">整栋楼</div></div>
        <div class="num hi"><div class="k">归谁管</div><div class="v" id="s2c">物业</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">三级配电，一级管一级（数据取自书上图 8-2）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>这一级</th><th>里面装了什么</th><th>额定</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">进户</td><td>低压电缆　<b>YJV-4×70 + BV-1×35</b>　穿 FPC32</td><td>AC 380 V</td></tr>
        <tr><td class="eu-s">楼道<br>总配电箱</td><td>三相电能表<br><b>QF1 带漏电保护</b>　RCD-4300</td>
          <td><b>160 A</b><br>I∆n 300~500 mA</td></tr>
        <tr><td class="eu-s">楼层<br>配电箱</td><td>每户一块单相电能表　DDS×××-4<br>该户总断路器 QF2</td>
          <td>表 <b>15(60) A</b><br>QF2 <b>32 A</b></td></tr>
        <tr><td class="eu-s">户内<br>配电盘</td><td>总断路器 QF3<br>各支路 QF6 ~ QF13</td>
          <td>照明／空调 <b>20 A</b><br>插座 25、32 A</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>15(60) A 是电能表的写法</b>，不是断路器。
      <span class="sub">括号外 15 A 是<b>标定电流</b>（计费准确度按它保证），
      括号里 60 A 是<b>最大电流</b>（短时能过这么大而不烧）。
      挑电能表看的是括号里那个数够不够大，挑断路器看的是脱扣电流。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">书上标的 300 mA 和你听过的 30 mA，不冲突</div>
    图 8-2 里户内插座支路标着 <b>I∆n = 300 mA</b>，总进线那一级标着 <b>300~500 mA</b>。
    可 3.7 那节讲过<b>家用漏电保护一般整定 30 mA</b> —— 这两个数管的不是同一件事：
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>整定值</th><th>保什么</th><th>装在哪</th></tr></thead>
      <tbody>
        <tr><td class="eu-s"><b>30 mA</b></td><td><b>保人</b><br><span class="sub">人摸到了要在出人命之前跳</span></td>
          <td>插座回路、末端<br><span class="sub">现行住宅规范的要求</span></td></tr>
        <tr><td class="eu-s"><b>300 mA<br>以上</b></td><td>保线路<br><span class="sub">防电气火灾，做后备</span></td>
          <td>总进线、上一级</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>上级大、下级小，才有选择性。</b>
      <span class="sub">都设成 30 mA 的话，某一户漏电会把整栋楼跳掉 —— 这叫越级跳闸。
      书上那张图里插座支路写的是 300 mA，<b>按现行规范偏大了</b>；
      考试和看图按书上的记，<b>自己家装修按 30 mA 要求</b>。</span>
    </div>
  </div>

  <div class="bet" data-bet="c81-trip" data-q="家里空调一开就跳，跳的是户内配电盘上空调那一路的断路器。该先怀疑什么？"
       data-opts="整栋楼电压有问题|就在空调那一路上：过载、线径不够、或者空调本身漏电|楼道总箱的漏电保护坏了"
       data-right="1"
       data-after="就在那一路。三级配电的意义就在这儿——跳哪一级，故障就在那一级管的范围里。空调支路跳，问题跑不出「这条支路 + 挂在它上面的设备」；要是整栋楼的总箱跳了，才轮到去查上一级。这条思路 8.4「停电了怎么查」整节都在用。"></div>
</section>

<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">同样是一柜带四箱，断一根的后果差很多</div>
    书上图 8-6 给了四种连接方式。<b>它们的区别不在省不省线，在断一根谁跟着停。</b>
    <b>选一种方式，然后点画布上的任意一段导线把它断开。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3t">
        <button class="btn on sm" data-t="0">放射式</button>
        <button class="btn sm" data-t="1">树干式</button>
        <button class="btn sm" data-t="2">混合式</button>
        <button class="btn sm" data-t="3">链式</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">断了</div><div class="v" id="s3a">0 处</div></div>
        <div class="num"><div class="k">还有电</div><div class="v" id="s3b">4 个</div></div>
        <div class="num hi"><div class="k">停电</div><div class="v" id="s3c">0 个</div></div>
      </div>
      <div class="btns"><button class="btn" id="s3r">↺ 全部接回去</button></div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">四种方式各用在哪儿（书上图 8-6 提示说明原文）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>方式</th><th>书上原话</th><th>断一根的后果</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">放射式</td><td>一般在<b>较重要的负荷</b>配电时使用</td>
          <td>只停那一个<br><span class="sub">代价是线最多</span></td></tr>
        <tr><td class="eu-s">树干式</td><td>一般在<b>照明场所</b>配电时使用</td>
          <td>干线断哪儿，<b>下游全停</b></td></tr>
        <tr><td class="eu-s">混合式</td><td><b>介于放射和树干之间</b></td>
          <td>断干线停一组<br>断分支停一个</td></tr>
        <tr><td class="eu-s">链式</td><td>设备<b>离配电箱远</b>、设备之间<b>距离近</b>、
          <b>不重要的小容量</b>设备；<b>连接台数不宜超过 4 台</b></td>
          <td>断中间，<b>后面全停</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>实际工程里很少单用一种。</b>
      <span class="sub">书上原话是「很少有单独使用基本接线方式的，大多根据实际需求
      综合运用各种连接方式」。所以现场看图别急着给它归类，
      <b>要问的是「这一段断了，谁会停」</b> —— 那才是接线方式真正的意义。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">链式为什么限死 4 台</div>
    链式是<b>后一台的电从前一台身上过</b>。台数越多，最前面那一段要扛的电流越大，
    而且<b>前面任何一台出问题，后面全部跟着停</b>。
    <div class="tip">
      <b>所以书上把它限在「不重要的小容量设备」和「不超过 4 台」。</b>
      <span class="sub">现场看到一串链下去五六台，那是不合规的接法 ——
      不光是容量问题，排查故障时你会发现最后一台没电，
      却要从第一台开始一台一台往下找。</span>
    </div>
  </div>

  <div class="bet" data-bet="c81-topo" data-q="车间里有四台重要设备，停一台就得停整条产线。该用哪种接线？"
       data-opts="链式，最省线|放射式，各走各的，一根断了只停一台|树干式，照明场所常用的那种"
       data-right="1"
       data-after="放射式。书上原话就是「一般在较重要的负荷配电时使用」——它的代价是线最多、配电箱出线端子最多，换来的是互不牵连。反过来，走道照明那种「停了也只是暗一会儿」的负荷才用树干式，一根干线串下去，省线。"></div>
</section>

<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">你上班那栋楼，干线是怎么走的</div>
    书上给了三种典型：<b>多层建筑</b>、<b>多单元住宅楼</b>、<b>高层建筑</b>。
    看这一屏是为了回答一个很实际的问题 ——
    <b>某一层没电了，该去哪个箱子看。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4t">
        <button class="btn on sm" data-t="0">多层建筑</button>
        <button class="btn sm" data-t="1">多单元住宅</button>
        <button class="btn sm" data-t="2">高层建筑</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">接线方式</div><div class="v" id="s4a">混合式</div></div>
        <div class="num"><div class="k">干线从哪<br>出发</div><div class="v" id="s4b">配电柜</div></div>
        <div class="num hi"><div class="k">中间还有<br>没有箱</div><div class="v" id="s4c">没有</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">三种楼的干线走法（书上图 8-3 ~ 8-5）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>楼型</th><th>书上原话</th><th>没电了先去哪</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">多层<br>建筑</td>
          <td>采用<b>混合式</b>接线，由低压配电柜为各楼层的配电箱供电</td>
          <td>本层配电箱<br>→ 一楼配电柜</td></tr>
        <tr><td class="eu-s">多单元<br>住宅楼</td>
          <td>各单元由<b>单元内的总配电箱</b>向各楼层的配电箱供电</td>
          <td>本层箱 → <b>本单元总箱</b><br>→ 配电柜</td></tr>
        <tr><td class="eu-s">高层<br>建筑</td>
          <td>用电不均匀的部分采用<b>增设分区配电箱</b>配电的方式；
            照明配电线路<b>多采用树干式</b></td>
          <td>本层箱 → <b>分区箱</b><br>→ 总箱</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>多单元和高层多出来的那个中间箱，是这一屏唯一要记住的东西。</b>
      <span class="sub">整层没电，在多层楼里就是「本层箱 → 一楼柜」两步；
      在多单元楼里要先去<b>本单元</b>的总配电箱（别跑到隔壁单元去）；
      在高层里要先想清楚这一层归哪个<b>分区</b>。走错箱子白跑一趟。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">高层为什么要加分区配电箱</div>
    书上的理由只有一句：<b>用电不均匀</b>。三十层的楼要是从一楼一根干线串到顶，
    那根干线得按<b>全楼总电流</b>选，粗到没法敷设；而且底下几层用电大、
    上面几层用电小，一根干线两头都不合适。
    <div class="tip info">
      分区之后，每个分区一根自己的干线，<b>各按各的负荷选线</b>。
      <span class="sub">这跟 8.3 要讲的「按电流选线径」是同一件事，
      只是放大到了整栋楼的尺度。另外分区箱还顺带把故障范围切小了 ——
      一个分区出事，别的分区不受影响。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="8.1">
    <div class="qz" data-q="书上定义的「高压供配电线路」和「低压供配电线路」，电压各是多少？"
      data-opts="高压 35~110 kV，低压 380V/220V|高压 6~10 kV，低压 380V/220V|高压 10 kV，低压 220V"
      data-right="1"
      data-why="书上写死了：高压供配电线路是指 6~10 kV 的供电和配电线路；低压供配电线路是指 380V/220V 的供电和配电线路。35~110 kV 是电力系统那一级的电压，高压供配电线路要做的正是把它降到 6~10 kV。"></div>
    <div class="qz" data-q="看一张供配电图，怎么一眼分出哪一段是「供」、哪一段是「配」？"
      data-opts="看电压高低，高的是供、低的是配|看母线：母线之前是把电送过来（供），母线之后是把电分出去（配）|看有没有变压器"
      data-right="1"
      data-why="供 = 传输电能（送过来），配 = 分配电能（分出去）。图上一路进、一路出的那一段是供；到了母线，一路进、好几路出，往后就是配。跟电压高低无关——高压侧有供也有配，低压侧同样。"></div>
    <div class="qz" data-q="走道照明有 8 个灯位，停一会儿也没大碍。按书上的说法该用哪种接线方式？"
      data-opts="放射式，每个灯位单独一根|树干式，一根干线串下去|链式，一个接一个"
      data-right="1"
      data-why="书上原话：树干式配电一般在照明场所配电时使用。照明是「停了也只是暗一会儿」的负荷，用不着为它每个灯位拉一根线；放射式留给重要负荷，代价是线最多。链式限死在「不重要的小容量设备、不超过 4 台」，8 个灯位也超了。"></div>
    <div class="qz" data-q="某户报修家里全黑。你到楼层配电箱，发现这户的总断路器 QF2 合着，量它出线端有 220 V。下一步该去哪？"
      data-opts="回去查楼道总配电箱的 QF1|去这户的户内配电盘，问题在 QF2 后面|直接判定是电能表坏了"
      data-right="1"
      data-why="三级配电，一级管一级。QF2 合着、出线端有电，说明这一级和它上面全都正常——故障必然在它下游，也就是从这户进户线到户内配电盘那一段。往上查是白跑，往下查才对。这条正是 8.4「停电了怎么查」的主线：先确认这一级是好的，再往下一级走。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 8 章 8.1 节（书内 P139~P142）</div>
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
function seg(g, pts, c, lw){ new Path(pts).stroke(g, lw || 2.2, c || C.wire); }
const CONC = { ok:['okbg','ok'], err:['errbg','err'], warn:['warnbg','warn'], acc:['accbg','acc'] };
function conc(g, y, kind, l1, l2){
  const m = CONC[kind] || CONC.acc;
  box(g, 16, y, 328, 34, 6, C[m[0]], C[m[1]], 1);
  txt(g, l1, 180, y + 13, {sz:10.5, b:1, c:C[m[1]]});
  txt(g, l2, 180, y + 26, {sz:9, c:C.tx2});
}
/* 配电柜／配电箱：机身 + 一道门缝 + 一个把手。**尺寸靠传参**，
   屏 2 屏 3 屏 4 都用它，别各画各的 */
function cab(g, x, y, w, h, o){
  o = o || {};
  box(g, x, y, w, h, 4, o.fill || C.box, o.line || C.boxLine, o.lw || 1.4);
  g.save(); g.strokeStyle = o.line || C.boxLine; g.lineWidth = 1;
  g.beginPath(); g.moveTo(x + w/2, y + 3); g.lineTo(x + w/2, y + h - 3); g.stroke();
  g.restore();
  dot(g, x + w/2 - 4, y + h/2, o.line || C.tx3, 1.8);
}
/* 断路器：一段引线 + 动触点臂 + 固定触点上一个 ×。
   **× 是记号不是指示灯，一律墨色**；合闸／断开只靠动臂的角度 */
function qfSym(g, x, y, on, s){
  s = s || 1;
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.6*s; g.lineJoin = 'round'; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x, y - 17*s); g.lineTo(x, y - 11*s); g.stroke();
  g.beginPath(); g.moveTo(x, y + 11*s); g.lineTo(x, y + 17*s); g.stroke();
  g.beginPath(); g.moveTo(x, y - 11*s);
  if(on) g.lineTo(x, y + 11*s); else g.lineTo(x + 9*s, y + 10*s);
  g.stroke();
  g.lineWidth = 1.5*s;
  g.beginPath();
  g.moveTo(x - 4*s, y + 7*s); g.lineTo(x + 4*s, y + 15*s);
  g.moveTo(x + 4*s, y + 7*s); g.lineTo(x - 4*s, y + 15*s);
  g.stroke(); g.restore();
}

/* ================================================================
   场景 1：一条链
   ================================================================
   五级竖着排，**分界线画在第 4 级和第 5 级之间** —— 那是 1000 V。
   ①~④ 用 err 描边（不许碰），⑤ 用 ok（你的地盘）。
   颜色在这儿表达的是「归谁管」，不是元件状态，所以用语义色是对的 */
const CHAIN = [
  {n:'电力系统',     v:'35 ~ 110 kV',   hv:1, dev:'输电铁塔、架空线'},
  {n:'高压变电所',   v:'降到 6~10 kV',  hv:1, dev:'避雷器 F、隔离开关 QS、断路器 QF、电力变压器 T1'},
  {n:'高压配电线路', v:'6 ~ 10 kV',     hv:1, dev:'母线 WB、隔离开关 QS、高压熔断器 FU、互感器 TV/TA'},
  {n:'配电变压器',   v:'10 kV → 0.4 kV', hv:1, dev:'T2　50 kV·A　Yyn0'},
  {n:'低压配电线路', v:'380 / 220 V',   hv:0, dev:'配电柜、配电箱、配电盘、断路器、电能表'}
];
const CY = [32, 78, 124, 170, 234];
const DIV = 202;                                   /* 1000 V 那条线 */
const S1 = { k:0 };
function draw1(){
  const g = st1.g; st1.clear();
  CHAIN.forEach(function(c, i){
    const y = CY[i], on = i === S1.k, col = c.hv ? C.err : C.ok;
    box(g, 40, y - 16, 274, 32, 6, on ? C.accbg : C.box, col, on ? 1.8 : 1.2);
    g.save(); g.fillStyle = col; g.globalAlpha = .18;
    g.beginPath(); g.arc(58, y, 9, 0, Math.PI*2); g.fill(); g.restore();
    txt(g, String(i+1), 58, y, {sz:9.5, b:1, c:col});
    txt(g, c.n, 76, y, {sz:10.5, b:1, c: on ? C.tx : C.tx2, al:'left'});
    txt(g, c.v, 302, y, {sz:9.5, b:1, c:col, al:'right'});
    if(on) hot(g, 177, y, 0, {w:288, h:44, r:9});
    if(i < 4){
      const y1 = y + 16, y2 = CY[i+1] - 16;
      seg(g, [[100, y1],[100, y2]], C.wire, 2);
      EC.head(g, 100, y2, 0, 1, 5, C.wire);
    }
  });
  /* 1000 V 分界 */
  g.save(); g.setLineDash([6,4]); g.strokeStyle = C.err; g.lineWidth = 1.4;
  g.beginPath(); g.moveTo(14, DIV); g.lineTo(346, DIV); g.stroke(); g.restore();
  EP.chip(g, '交流 1000 V', 292, DIV, {sz:9, b:1, c:C.err});
  /* 放 x=22 会被 x=100 那根竖导线从字中间穿过去（老坑），挪到导线右边 */
  txt(g, '以上：高压电工的活', 128, DIV - 11, {sz:8.5, c:C.err, al:'left'});
  txt(g, '以下：低压电工作业证', 128, DIV + 12, {sz:8.5, c:C.ok, al:'left'});

  const c = CHAIN[S1.k];
  conc(g, 266, c.hv ? 'err' : 'ok',
       c.n + '　' + c.v,
       c.hv ? '这一级你不能碰 —— 需要高压电工作业证' : '你的活全在这一段');
}
function note1(){
  const c = CHAIN[S1.k];
  $('s1a').textContent = c.n;
  $('s1b').textContent = c.v;
  $('s1c').textContent = c.hv ? '不能' : '能';
  const T = [
    ['电网送过来的那一级',
     '<b>35 ~ 110 kV</b> 是电力系统的输电电压。' +
     '<b>严格说这一级还不算「供配电线路」，它是电网。</b>' +
     '书上给高压供配电线路的定义里，它是被降压的那个对象：' +
     '「主要实现将电力系统中 <b>35~110 kV</b> 供电电压降为 6~10 kV 的高压配电电压」。' +
     '<hr>你在野外看到的那些铁塔和几串长长的绝缘子，就是这一级。'],
    ['第一次降压：35~110 kV → 6~10 kV',
     '高压变电所干的活。书上图 8-1 里这一级的器件（认得出符号就够了）：' +
     '<b>避雷器 F、高压隔离开关 QS、高压断路器 QF、电力变压器 T1</b>' +
     '（铭牌 <b>6300 kV·A　Yd11　35/10 kV</b>）、电压互感器 TV、电流互感器 TA。' +
     '<hr>图上给高压断路器贴了一条注：<b>它是高压供配电线路中的保护装置，' +
     '当负载线路中发生短路故障时会自行断开进行保护</b> —— ' +
     '作用和你家配电盘里那排小断路器完全一样，只是电压差了几十倍。'],
    ['高压配电线路：把电分出去',
     '书上的定义：<b>高压供配电线路是指 6~10 kV 的供电和配电线路</b>，' +
     '降下来的电送给<b>高压变电所、车间变电所及高压用电设备</b>。' +
     '<hr><b>这一级是「配」的典型</b>：电从变压器出来上了<b>母线 WB</b>，' +
     '母线上并排挂着好几路出线，每一路一组<b>隔离开关 QS ＋ 高压熔断器 FU</b>。' +
     '图上那条注写得很直白：<b>「高压配电线路主要用来分配电能」</b>。'],
    ['配电变压器：10 kV 变成 400 V',
     '书上图 8-1 里的 <b>T2，50 kV·A，Yyn0，10/0.4 kV</b>。' +
     '过了它，电压才降到你天天面对的量级。' +
     '<hr><b>它的低压侧中性点是接地的，那就是你家零线的源头。</b>' +
     '3.5 那节讲「验电笔为什么会亮」，电流最后回到的正是这个接地点 ——' +
     '整个回路到这儿闭合。' +
     '<span class="sub">铭牌上写 0.4 kV（400 V）而习惯说 380 V：' +
     '400 是空载电压，带上负载有压降，标称就叫 380。</span>'],
    ['低压供配电线路：你的地盘',
     '书上的定义：<b>低压供配电线路是指 380V/220V 的供电和配电线路</b>，' +
     '主要实现交流电压的<b>传输和分配</b>，' +
     '由各种低压供配电器件和设备按一定的控制关系连接构成。' +
     '<hr><b>低压电工作业证管的就是这一段（交流 1 kV 以下）。</b>' +
     '接下来三屏、以及 8.2~8.4 三节，讲的全是这一级里面的事：' +
     '配电柜怎么分到配电箱、箱里都有什么、断路器和线怎么选、停电了怎么查。']
  ][S1.k];
  $('n0').innerHTML = '<div class="st' + (c.hv ? ' bad' : ' good') + '">' + T[0] + '</div>' +
    T[1] + '<div class="tip info" style="margin-top:8px"><b>这一级都有什么：</b>' +
    '<span class="sub">' + c.dev + '</span></div>';
}

/* ================================================================
   场景 2：进了楼分三级
   ================================================================
   四格竖排：进户 → 楼道总箱 → 楼层箱 → 户内盘。
   户内盘那一格要画出一排支路小断路器 —— 「越往下管得越细」这件事，
   画出来比写一句管用 */
const LV = [
  {n:'进户',       who:'供电／物业', hit:'整栋楼',
   inside:'低压电缆 YJV-4×70 + BV-1×35，穿 FPC32 管',
   rated:'AC 380 V'},
  {n:'楼道总配电箱', who:'物业',      hit:'整栋楼',
   inside:'三相电能表 ＋ 带漏电保护的总断路器 QF1（RCD-4300）',
   rated:'160 A　I∆n 300~500 mA'},
  {n:'楼层配电箱',  who:'物业／供电', hit:'这一户',
   inside:'每户一块单相电能表 DDS×××-4 ＋ 该户总断路器 QF2',
   rated:'表 15(60) A　QF2 32 A'},
  {n:'户内配电盘',  who:'你自己',     hit:'一条支路',
   inside:'总断路器 QF3 ＋ 支路 QF6~QF13（照明／空调／插座）',
   rated:'20 A ／ 25 A ／ 32 A'}
];
const LY2 = [40, 96, 156, 226];
const LH2 = [30, 40, 40, 60];
const S2 = { k:0 };
function draw2(){
  const g = st2.g; st2.clear();
  EP.heading(g, 14, 20, '三级配电', '一级管一级');

  LV.forEach(function(v, i){
    const y = LY2[i], h = LH2[i], on = i === S2.k;
    cab(g, 46, y - h/2, 262, h, {fill: on ? C.accbg : C.box,
                                 line: on ? C.acc : C.boxLine, lw: on ? 1.8 : 1.3});
    txt(g, v.n, 60, y - h/2 + 12, {sz:10, b:1, c: on ? C.acc : C.tx2, al:'left'});
    if(i === 0){
      /* 进户线：三相四线 */
      [0,1,2,3].forEach(function(j){
        seg(g, [[168 + j*14, y - 8],[168 + j*14, y + 8]],
            [C.L, '#e8b93c', '#4fc04a', C.N][j], 2.2);
      });
      txt(g, 'AC 380 V', 296, y, {sz:9, b:1, c:C.tx3, al:'right'});
    } else if(i === 1){
      box(g, 176, y - 12, 34, 24, 3, C.card, C.boxLine, 1);
      txt(g, 'Wh', 193, y, {sz:8.5, b:1, c:C.tx2});
      qfSym(g, 246, y, true, 0.7);
      txt(g, 'QF1', 268, y, {sz:8.5, b:1, c:C.tx3, al:'left'});
      txt(g, '160 A', 296, y + 14, {sz:8, c:C.tx3, al:'right'});
    } else if(i === 2){
      [0,1].forEach(function(j){
        box(g, 150 + j*56, y - 12, 30, 24, 3, C.card, C.boxLine, 1);
        txt(g, 'Wh', 165 + j*56, y, {sz:8, b:1, c:C.tx2});
      });
      qfSym(g, 262, y, true, 0.7);
      txt(g, '每户一块表 ＋ 一只 QF2', 60, y + 14, {sz:8, c:C.tx3, al:'left'});
    } else {
      /* 四层排开：标签(y-18) → 支路母线(y-8) → 断路器(y+8) → 支路名(y+26)。
         母线原来画在 y-20，正好压住「户内配电盘」那个标签 */
      seg(g, [[68, y - 8],[300, y - 8]], C.wire, 1.8);
      qfSym(g, 76, y + 8, true, 0.6);
      txt(g, 'QF3', 76, y + 26, {sz:8, c:C.tx3});
      for(let j = 0; j < 6; j++){
        const x = 122 + j*32;
        qfSym(g, x, y + 8, true, 0.55);
        txt(g, ['照明','照明','空调','空调','厨房','卧室'][j], x, y + 26, {sz:7.5, c:C.tx3});
      }
    }
    if(i < 3) EC.head(g, 177, LY2[i] + h/2 + 8, 0, 1, 5, C.wire);
    if(i < 3) seg(g, [[177, y + h/2],[177, LY2[i+1] - LH2[i+1]/2]], C.wire, 2);
  });

  const v = LV[S2.k];
  conc(g, 268, S2.k === 3 ? 'ok' : 'acc',
       v.n + ' 跳了 ⇒ 影响 ' + v.hit, '归 ' + v.who + ' 管　·　' + v.rated);
}
function note2(){
  const v = LV[S2.k];
  $('s2a').textContent = v.n.replace('配电', '').replace('楼道总箱','总箱');
  $('s2b').textContent = v.hit;
  $('s2c').textContent = v.who;
  const T = [
    ['进户：一根电缆进来，先过一道总闸',
     '书上图 8-2 标的进线是 <b>YJV-4×70 + BV-1×35</b>，穿 <b>FPC32</b> 管。' +
     '拆开读（4.1 讲过这套标注）：<b>YJV</b> 交联聚乙烯绝缘电力电缆，' +
     '<b>4×70</b> 四芯每芯 70 mm²（三相 ＋ 中性），' +
     '<b>BV-1×35</b> 另配一根 35 mm² 的单芯线（PE），' +
     '<b>FPC32</b> 穿 φ32 的半硬塑料管。' +
     '<hr><b>为什么 PE 单独一根、还细一截</b>：它平时不载流，' +
     '只在故障那一瞬间过电流，所以允许比相线细。'],
    ['楼道总配电箱：整栋楼的总闸',
     '里面是<b>三相电能表</b>和<b>带漏电保护的总断路器 QF1</b>' +
     '（书上标 <b>RCD-4300，160 A，I∆n = 300~500 mA</b>）。' +
     '图上给它贴了一条注：<b>带漏电保护的断路器对接地故障所引起的电击事故的' +
     '防范具有很高的灵敏度</b>。' +
     '<hr><b>这一级跳，整栋楼黑。</b>所以它的漏电整定值必须设得比下面各级都大' +
     '（300~500 mA）—— 否则某一户漏一点电就把全楼跳掉。' +
     '这就是下面那张表要讲的<b>分级整定</b>。'],
    ['楼层配电箱：一户一块表、一只闸',
     '每户在这儿有<b>一块单相电能表</b>（<b>DDS×××-4，15(60) A</b>）' +
     '和<b>一只总断路器 QF2</b>（<b>32 A</b>）。' +
     '<hr><b>产权分界一般就在电能表这儿</b>：表前归供电部门／物业，表后归你。' +
     '<span class="sub">各地规定不一样，以当地供电部门的说法为准 —— ' +
     '但有一条是通的：<b>表前的东西别自己动</b>，那属于窃电嫌疑，不只是技术问题。</span>' +
     '<hr>这一级跳，只黑这一户 —— 所以家里全黑、邻居正常时，' +
     '第一个该去看的就是它（8.4 会整节讲这条路怎么走）。'],
    ['户内配电盘：分成好几路，各管各的',
     '进门一只<b>总断路器 QF3</b>，往后分成若干支路：' +
     '书上图 8-2 里 <b>QF6~QF11 各 20 A</b>（照明×2、空调×3、备用×1），' +
     '<b>QF12 25 A</b>（厨房插座）、<b>QF13 32 A</b>（卧室插座），' +
     '后两个带漏电（图上标 I∆n = 300 mA）。' +
     '<hr><b>分路的意义就是把故障关在小范围里。</b>' +
     '空调那一路跳了，照明还亮着 —— 你能开着灯去查。' +
     '要是全屋一只闸，任何一个毛病都让整户黑掉。' +
     '<hr>每一路选多大的断路器、配多粗的线，是 <b>8.3</b> 整节的内容。']
  ][S2.k];
  $('n1').innerHTML = '<div class="st">' + T[0] + '</div>' + T[1] +
    '<div class="tip info" style="margin-top:8px"><b>这一级里面是：</b>' +
    '<span class="sub">' + v.inside + '</span></div>';
}

/* ================================================================
   场景 3：四种接线方式 —— 断一根谁跟着停
   ================================================================
   每种方式定义成「节点 ＋ 边」，点画布断掉一条边，
   再从电源 's' 做一次连通性搜索，到不了的箱就停电。
   **四种共用同一套判定** —— 差别全在拓扑本身，这正是这一屏要教的 */
const TOPO = [
  { name:'放射式', use:'较重要的负荷',
    boxes:[[250,56],[250,106],[250,156],[250,206]],
    edges:[
      {a:'s', b:'b0', pts:[[76,108],[120,108],[120,56],[233,56]]},
      {a:'s', b:'b1', pts:[[76,122],[140,122],[140,106],[233,106]]},
      {a:'s', b:'b2', pts:[[76,136],[160,136],[160,156],[233,156]]},
      {a:'s', b:'b3', pts:[[76,150],[180,150],[180,206],[233,206]]}
    ]},
  { name:'树干式', use:'照明场所',
    boxes:[[120,196],[180,196],[240,196],[300,196]],
    edges:[
      {a:'s',  b:'j0', pts:[[76,110],[120,110]]},
      {a:'j0', b:'j1', pts:[[120,110],[180,110]]},
      {a:'j1', b:'j2', pts:[[180,110],[240,110]]},
      {a:'j2', b:'j3', pts:[[240,110],[300,110]]},
      {a:'j0', b:'b0', pts:[[120,110],[120,183]]},
      {a:'j1', b:'b1', pts:[[180,110],[180,183]]},
      {a:'j2', b:'b2', pts:[[240,110],[240,183]]},
      {a:'j3', b:'b3', pts:[[300,110],[300,183]]}
    ]},
  { name:'混合式', use:'介于两者之间',
    boxes:[[150,52],[150,200],[300,52],[300,200]],
    edges:[
      {a:'s',  b:'j0', pts:[[76,126],[150,126]]},
      {a:'j0', b:'j1', pts:[[150,126],[300,126]]},
      {a:'j0', b:'b0', pts:[[150,126],[150,65]]},
      {a:'j0', b:'b1', pts:[[150,126],[150,187]]},
      {a:'j1', b:'b2', pts:[[300,126],[300,65]]},
      {a:'j1', b:'b3', pts:[[300,126],[300,187]]}
    ]},
  { name:'链式', use:'离得远、容量小、不重要',
    boxes:[[118,126],[184,126],[250,126],[316,126]],
    edges:[
      {a:'s',  b:'b0', pts:[[76,126],[101,126]]},
      {a:'b0', b:'b1', pts:[[135,126],[167,126]]},
      {a:'b1', b:'b2', pts:[[201,126],[233,126]]},
      {a:'b2', b:'b3', pts:[[267,126],[299,126]]}
    ]}
];
const S3 = { t:0, cut:{} };
function key3(i){ return S3.t + ':' + i; }
/* 从电源出发，看哪几个箱还连得上 */
function live3(){
  const T = TOPO[S3.t], seen = {s:1};
  let grew = true;
  while(grew){
    grew = false;
    T.edges.forEach(function(e, i){
      if(S3.cut[key3(i)]) return;
      if(seen[e.a] && !seen[e.b]){ seen[e.b] = 1; grew = true; }
      if(seen[e.b] && !seen[e.a]){ seen[e.a] = 1; grew = true; }
    });
  }
  return T.boxes.map(function(_, i){ return !!seen['b' + i]; });
}
/* 点到折线的距离 —— 用来判断点中了哪条边 */
function distToPts(p, pts){
  let best = 1e9;
  for(let i = 0; i + 1 < pts.length; i++){
    const a = pts[i], b = pts[i+1];
    const dx = b[0]-a[0], dy = b[1]-a[1], L2 = dx*dx + dy*dy;
    let t = L2 ? ((p[0]-a[0])*dx + (p[1]-a[1])*dy) / L2 : 0;
    t = Math.max(0, Math.min(1, t));
    const qx = a[0] + dx*t, qy = a[1] + dy*t;
    best = Math.min(best, Math.hypot(p[0]-qx, p[1]-qy));
  }
  return best;
}
function draw3(){
  const g = st3.g; st3.clear();
  const T = TOPO[S3.t], on = live3();
  const nCut = T.edges.filter(function(_, i){ return S3.cut[key3(i)]; }).length;
  const nOff = on.filter(function(v){ return !v; }).length;
  EP.heading(g, 14, 20, T.name, T.use);

  /* 配电柜 */
  cab(g, 30, 90, 46, 72, {});
  txt(g, '配电柜', 53, 174, {sz:9, b:1, c:C.tx3});

  /* 边 */
  T.edges.forEach(function(e, i){
    const broken = S3.cut[key3(i)];
    const path = new Path(e.pts);
    path.stroke(g, broken ? 1.6 : 2.4, broken ? C.tx3 : C.wire);
    if(broken){
      /* ✗ 画在这条边的中点上 */
      const m = path.at(path.len/2);
      g.save(); g.strokeStyle = C.err; g.lineWidth = 2.2; g.lineCap = 'round';
      g.beginPath();
      g.moveTo(m[0]-6, m[1]-6); g.lineTo(m[0]+6, m[1]+6);
      g.moveTo(m[0]+6, m[1]-6); g.lineTo(m[0]-6, m[1]+6);
      g.stroke(); g.restore();
    }
  });
  /* 接点上的黑点（只有树干式和混合式才有接点） */
  if(S3.t === 1 || S3.t === 2){
    T.edges.forEach(function(e){
      if(e.b[0] === 'j' || e.a[0] === 'j'){
        const p = e.a[0] === 'j' ? e.pts[0] : e.pts[e.pts.length-1];
        dot(g, p[0], p[1], C.wire, 3);
      }
    });
  }

  /* 配电箱 */
  T.boxes.forEach(function(b, i){
    cab(g, b[0]-17, b[1]-13, 34, 26,
        {fill: on[i] ? C.okbg : C.box, line: on[i] ? C.ok : C.tx3, lw: on[i] ? 1.5 : 1.2});
    txt(g, on[i] ? '有电' : '停电', b[0], b[1] + 24,
        {sz:8, b:1, c: on[i] ? C.ok : C.err});
  });

  if(nCut === 0){
    conc(g, 232, 'acc', '点画布上的任意一段导线，把它断开',
         T.name + '：书上说它用在' + T.use);
  } else {
    conc(g, 232, nOff ? 'err' : 'ok',
      '断了 ' + nCut + ' 处 ⇒ ' + nOff + ' 个箱停电',
      nOff === 0 ? '这一段断了也没人受影响' :
      (nOff === 1 ? '只影响它自己 —— 这正是放射式的价值' :
       '一根线牵着 ' + nOff + ' 个箱'));
  }
}
function note3(){
  const T = TOPO[S3.t], on = live3();
  const nCut = T.edges.filter(function(_, i){ return S3.cut[key3(i)]; }).length;
  const nOff = on.filter(function(v){ return !v; }).length;
  $('s3a').textContent = nCut + ' 处';
  $('s3b').textContent = (4 - nOff) + ' 个';
  $('s3c').textContent = nOff + ' 个';
  const D = [
    ['放射式：一箱一根，各走各的',
     '书上原话：<b>放射式配电一般在较重要的负荷配电时使用。</b>' +
     '<hr>从配电柜给每个配电箱单独拉一根线，' +
     '<b>断哪一根就只停哪一个</b>，别的箱一点不受影响。' +
     '代价很直接：<b>线最多、配电柜的出线端子最多、造价最高</b>。' +
     '<hr>车间里那种「停一台就得停整条产线」的设备，用的就是它。'],
    ['树干式：一根干线串下去',
     '书上原话：<b>树干式配电一般在照明场所配电时使用。</b>' +
     '<hr>一根干线从配电柜拉出去，各配电箱<b>就近从干线上 T 接</b>下来。' +
     '省线、省端子，代价是<b>干线断在哪儿，它下游的全停</b>。' +
     '<hr><b>试试断在不同位置</b>：断最靠近柜的那一段 → 四个全黑；' +
     '断最末一段 → 只黑最后一个。<b>越靠上游，影响面越大</b> ——' +
     '这也是 8.4 排查时「先看不亮的范围有多大」的道理。' +
     '<hr>断某个箱的<b>分支</b>（那根往下引的短线）就只停那一个 ——' +
     '干线本身没坏。'],
    ['混合式：干线串起几组放射',
     '书上原话：<b>混合式配电是一种介于放射和树干之间的配电方式。</b>' +
     '<hr>一根干线拉出去，在几个点上各分出一组放射。' +
     '<b>断干线 ⇒ 停掉那个点往后的一整组；断分支 ⇒ 只停一个。</b>' +
     '<hr>实际工程里用得最多的就是它。书上专门交代了一句：' +
     '<b>很少有单独使用基本接线方式的，大多根据实际需求综合运用各种连接方式。</b>' +
     '所以现场看图别急着给它归类，<b>要问的是「这一段断了，谁会停」</b>。'],
    ['链式：后一台的电从前一台身上过',
     '书上原话：<b>链式配电一般在设备距离配电箱较远，而设备之间距离较近的' +
     '不重要的小容量设备配电时使用，连接台数不宜超过 4 台。</b>' +
     '<hr>它省线省到极致 —— 但<b>断在第几个，后面全停</b>；' +
     '而且前面任何一台设备出问题，后面全跟着遭殃。' +
     '<hr><b>「不超过 4 台」这个数要记住</b>：台数越多，' +
     '最前面那一段要扛的电流越大（所有台的电流都从它过），' +
     '排查时也越难 —— 最后一台没电，你得从第一台开始一台台往下找。']
  ][S3.t];
  let h = '<div class="st">' + D[0] + '</div>' + D[1];
  if(nCut){
    h += '<div class="tip' + (nOff ? '' : ' info') + '" style="margin-top:8px">' +
      '<b>现在断了 ' + nCut + ' 处，' + nOff + ' 个箱停电。</b>' +
      '<span class="sub">' + (nOff === 0
        ? '这一段本来就没带负载 —— 说明它不在任何一条通往配电箱的路上。'
        : '停电的那几个箱，共同点是「从配电柜出发，走不到它们了」。' +
          '现场判断故障范围用的就是这个反过来的推理：<b>哪几个停了，' +
          '故障就在它们共同经过的那一段上</b>。') + '</span></div>';
  }
  $('n2').innerHTML = h;
}

/* ================================================================
   场景 4：三种楼的干线怎么走
   ================================================================
   楼层画成横带，配电箱画成带上的小方块，干线是竖线。
   **要看的只有一件事：从柜到你那一层，中间还隔着几个箱** */
const S4 = { t:0 };
function floor(g, y, x0, x1, name){
  box(g, x0, y - 11, x1 - x0, 22, 2, C.box, C.boxLine, 1);
  /* 层名画在带的**右端内部**：放左边会被干线引出来的那根横线穿过去（老坑） */
  if(name) txt(g, name, x1 - 8, y, {sz:8, c:C.tx3, al:'right'});
}
function fbox(g, x, y, on){
  box(g, x - 11, y - 8, 22, 16, 2, on ? C.accbg : C.card,
      on ? C.acc : C.boxLine, on ? 1.5 : 1);
}
function draw4(){
  const g = st4.g; st4.clear();
  const t = S4.t;
  EP.heading(g, 14, 20,
    ['多层建筑','多单元住宅楼','高层建筑'][t],
    ['混合式接线','各单元一个总配电箱','增设分区配电箱'][t]);

  if(t === 0){
    /* 五层，一根干线从一楼配电柜上去，各层一个配电箱 */
    const Y = [222, 190, 158, 126, 94];
    Y.forEach(function(y, i){ floor(g, y, 86, 336, (i+1) + ' 层'); });
    cab(g, 22, 208, 44, 34, {});
    txt(g, '低压配电柜', 44, 252, {sz:8.5, b:1, c:C.tx3});
    seg(g, [[44, 208],[44, 94]], C.wire, 2.4);
    Y.forEach(function(y){
      seg(g, [[44, y],[114, y]], C.wire, 2);
      fbox(g, 126, y, true);
      dot(g, 44, y, C.wire, 2.6);
    });
    txt(g, '楼层配电箱', 200, 222, {sz:8.5, b:1, c:C.acc, al:'left'});
    conc(g, 268, 'acc', '低压配电柜 → 各楼层配电箱',
         '书上原话：采用混合式接线，由低压配电柜为各楼层的配电箱供电');
  } else if(t === 1){
    /* 三个单元，各有一个单元总配电箱 */
    const UX = [[20,116],[132,228],[244,340]];
    const Y = [186, 152, 118];
    UX.forEach(function(u, k){
      Y.forEach(function(y){ floor(g, y, u[0], u[1], ''); });
      txt(g, (k+1) + ' 单元', (u[0]+u[1])/2, 100, {sz:8.5, b:1, c:C.tx3});
      /* 单元总配电箱 */
      const cx = (u[0]+u[1])/2;
      cab(g, cx - 18, 208, 36, 26, {fill:C.accbg, line:C.acc, lw:1.5});
      seg(g, [[cx, 208],[cx, 118]], C.wire, 2);
      Y.forEach(function(y){ dot(g, cx, y, C.wire, 2.6); fbox(g, cx + 26, y, true); });
      seg(g, [[cx, 234],[cx, 250]], C.wire, 2);
    });
    seg(g, [[50, 250],[292, 250]], C.wire, 2.6);
    cab(g, 20, 236, 30, 28, {});
    txt(g, '配电柜', 35, 274, {sz:8, b:1, c:C.tx3});
    EP.chip(g, '单元总配电箱', 180, 200, {sz:8.5, b:1, c:C.acc});
    conc(g, 268, 'acc', '配电柜 → 单元总配电箱 → 各楼层配电箱',
         '书上原话：各单元由单元内的总配电箱向各楼层的配电箱供电');
  } else {
    /* 高层：低区直供，高区经分区配电箱。
       **两段干线共用同一个 x（84）**，中间被分区箱打断 ——
       「高区的电要经过分区箱」这件事，画成一条被打断的线最直白 */
    const LO = [[236,'1 层'],[208,'2 层'],[180,'3 层']];
    const HI = [[120,'9 层'],[92,'10 层'],[64,'11 层']];
    LO.concat(HI).forEach(function(f){ floor(g, f[0], 124, 336, f[1]); });
    txt(g, '⋯', 230, 150, {sz:15, b:1, c:C.tx3});
    cab(g, 20, 222, 46, 28, {});
    txt(g, '总配电箱', 43, 262, {sz:8, b:1, c:C.tx3});
    /* 低区：柜 → 干线下段 → 1/2/3 层 */
    seg(g, [[66, 236],[84, 236],[84, 180]], C.wire, 2.2);
    LO.forEach(function(f){ seg(g, [[84, f[0]],[128, f[0]]], C.wire, 2);
      dot(g, 84, f[0], C.wire, 2.6); fbox(g, 140, f[0], true); });
    /* 高区：柜 → 一根单独的干线 → 分区箱 */
    seg(g, [[43, 222],[43, 148],[58, 148]], C.wire, 2.4);
    cab(g, 58, 136, 52, 24, {fill:C.warnbg, line:C.warn, lw:1.6});
    txt(g, '分区配电箱', 118, 148, {sz:9, b:1, c:C.warn, al:'left'});
    /* 分区箱 → 干线上段 → 9/10/11 层 */
    seg(g, [[84, 136],[84, 64]], C.wire, 2.2);
    HI.forEach(function(f){ seg(g, [[84, f[0]],[128, f[0]]], C.wire, 2);
      dot(g, 84, f[0], C.wire, 2.6); fbox(g, 140, f[0], true); });
    conc(g, 268, 'warn', '高区多出一个分区配电箱',
         '书上原话：用电不均匀的部分采用增设分区配电箱配电的方式');
  }
}
function note4(){
  $('s4a').textContent = ['混合式','树干＋放射','树干式'][S4.t];
  $('s4b').textContent = ['配电柜','配电柜','总配电箱'][S4.t];
  $('s4c').textContent = ['没有','单元总箱','分区箱'][S4.t];
  const T = [
    ['多层建筑：柜 → 各层箱，中间不再有箱',
     '书上图 8-3 的注写得很直接：<b>采用混合式接线，由低压配电柜为各楼层的配电箱供电。</b>' +
     '<hr>「混合式」在这儿的意思是：<b>一根干线沿楼梯间上去（树干），' +
     '各层从干线上分出去（放射到各户）</b>。' +
     '<hr><b>排查路径最短：本层配电箱 → 一楼配电柜，两步。</b>' +
     '整层没电就去看本层箱；整栋楼没电就去一楼柜。'],
    ['多单元住宅楼：先找本单元的总箱',
     '书上图 8-4 的注：<b>各单元由单元内的总配电箱向各楼层的配电箱供电。</b>' +
     '<hr><b>比多层楼多了一级 —— 单元总配电箱。</b>' +
     '低压配电柜先把电分给三个单元的总箱，' +
     '每个单元的总箱再往上给本单元各层的配电箱供电。' +
     '<hr><b>这一级是排查时最容易跑错的地方。</b>' +
     '2 单元 3 楼没电，要去 <b>2 单元</b>的总配电箱看 ——' +
     '跑到 1 单元去是白跑，那两个单元的电根本不走同一条干线。' +
     '<span class="sub">好处也在这儿：一个单元的干线出问题，另外两个单元照常。</span>'],
    ['高层建筑：先想清楚这一层归哪个分区',
     '书上图 8-5 的注：<b>用电不均匀的部分采用增设分区配电箱配电的方式</b>；' +
     '另外照明配电线路<b>多采用树干式接线方式</b>。' +
     '<hr><b>为什么高层非要分区</b>：三十层的楼要是从一楼一根干线串到顶，' +
     '那根干线得按<b>全楼总电流</b>选，粗到没法敷设；' +
     '而且底下几层用电大、上面几层用电小，一根线两头都不合适。' +
     '<b>分区之后每个分区一根自己的干线，各按各的负荷选线</b>——' +
     '这跟 8.3 「按电流选线径」是同一件事，只是放大到整栋楼。' +
     '<hr><b>排查要多走一站：本层箱 → 分区箱 → 总箱。</b>' +
     '分区箱一般在设备层或中间某一层的电井里，' +
     '<b>上班第一天就该问清楚：这栋楼分了几个区、分区箱在哪几层。</b>']
  ][S4.t];
  $('n3').innerHTML = '<div class="st">' + T[0] + '</div>' + T[1];
}

/* ================================================================
   舞台、事件、收尾
   ================================================================ */
const st1 = new Stage('cv0', 360, 306);
const st2 = new Stage('cv1', 360, 308);
const st3 = new Stage('cv2', 360, 278);
const st4 = new Stage('cv3', 360, 308);

st1.cv.addEventListener('click', function(ev){
  const p = st1.pick(ev);
  CY.forEach(function(y, i){ if(Math.abs(p[1] - y) < 20) S1.k = i; });
  note1(); draw1();
});
st2.cv.addEventListener('click', function(ev){
  const p = st2.pick(ev);
  LY2.forEach(function(y, i){ if(Math.abs(p[1] - y) < LH2[i]/2 + 6) S2.k = i; });
  note2(); draw2();
});
document.getElementById('s3t').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S3.t = +b.dataset.t;
  document.querySelectorAll('#s3t .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.t === S3.t);
  });
  note3(); draw3();
});
st3.cv.addEventListener('click', function(ev){
  const p = st3.pick(ev);
  let best = -1, bd = 15;
  TOPO[S3.t].edges.forEach(function(e, i){
    const d = distToPts(p, e.pts);
    if(d < bd){ bd = d; best = i; }
  });
  if(best >= 0){
    const k = key3(best);
    if(S3.cut[k]) delete S3.cut[k]; else S3.cut[k] = 1;
    note3(); draw3();
  }
});
document.getElementById('s3r').addEventListener('click', function(){
  S3.cut = {}; note3(); draw3();
});
document.getElementById('s4t').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S4.t = +b.dataset.t;
  document.querySelectorAll('#s4t .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.t === S4.t);
  });
  note4(); draw4();
});

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会重设尺寸并清空。**四屏全是静态的，必须在这儿逐个补画** */
  draw1(); draw2(); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:8, sec:'8.1'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('8.1');
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
