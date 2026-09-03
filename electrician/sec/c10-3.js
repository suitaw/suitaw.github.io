/* 10.3 装一台电动机：方式、相序、接线 —— 本节内容的唯一真相。
   对应《零基础学电工》第 10 章 10.3 节（书内 P186~P190）。

   **第 10 章大半不做**（2026-08-30 拍板的）：
   10.1 直流电动机的拆卸、10.2 交流电动机的拆卸 —— 整两节全是实物照片流程
   （拧螺钉、撬端盖、抽转子、取电刷）；10.3.1 里的**机座安装**（挖基坑、浇混凝土）
   和**联轴器安装**（千分表对中）也一样。**网页教不了手上的活。**
   这一节留的是 10.3 里两块纯知识：**安装方式代号**和**相序判定**。

   四屏：① 五种安装方式 ② 电源相序怎么定 ③ 绕组相序怎么定 ④ 接线与通电检查

   数字与说法的出处（书上原文，别凭记忆改）：

   - 「电动机的安装一般分为**机械安装和电气安装**两个环节」
   - **安装方式代号（书 P186 原文）**：三相交流电动机的安装方式主要可以分为
     **卧式安装（IMBxx）**和**立式安装（IMVxx）**两类。其中，
     **IM 是国际通用的安装方式代号；B 表示卧式（电动机轴线水平），
     V 表示立式（电动机轴线竖直）；xx 为 1~2 位数字，表示具体安装形式**。
     卧式常见的有 **B3、B5、B35**；立式常见的有 **V1、V3**
   - 图 10-11 的五条注（原文照录）：
     **B3：有底座；不直连安装法兰盘**
     **B5：无底座；有直连安装法兰盘**
     **B35：有底座，有直连安装法兰盘**
     **V1：无底座，传动轴伸向下**
     **V3：无底座，传动轴伸向上**
   - 机械安装（P187，**这一段不做成屏，只在文案里点一句**）：
     根据电动机规格确定基坑的体积，挖好基坑，夯实坑底，坑底铺一层石子，
     用水淋透并夯实后注入混凝土。**三相交流电动机较重，工作时会产生振动，
     因此不能将电动机直接放置在地面上，应固定在混凝土基座或木板上**。
     联轴器**由两个法兰盘构成**；将电动机与被驱动机构的转轴调整到**同一高度**后
     拧紧联轴器的固定螺钉，**为确保偏心度和平行度符合要求，需使用千分表配合安装**
   - **电气安装的前提（P187 原文）**：**电动机的旋转方向与电源的相序有关**，
     正确的旋转方向是**按电源相序与电动机绕组相序相同**的前提下提出的，
     因此在进行电动机的电气安装时，需**使用相序仪确定正确的电源相序并进行标记**
   - **图 10-14 确定电源相序**：
     ① 将相序表的三根检测线分别连接待检测的三条线缆（黄 A、绿 B、红 C）
     ② 查看相序仪指示灯，判断电源相序 ——
     **若相序仪「正」端的指示灯比「反」端的指示灯亮，则说明电源相序与相序仪接线相同**；
     若相序仪「反」端的指示灯亮，则说明电源相序与相序仪接线相反。
     **若电源相序与相序仪接线相反，则可任意调换一对电源线后，通电再测试**，
     直至电源相序确定，用**字母（U、V、W）、数字（1、2、3）或黄、绿、红三种不同颜色
     标记在电源线上**
   - **图 10-15 确定电动机绕组相序（五步，原文照录）**：
     ① 将电动机**三相绕组连接成 Y 形**，并在电动机的**轴伸端端盖上做标记**
     ② 将万用表量程调整至**直流档**，用表笔分别连接**中性点和 U1 端**，
        **顺时针转动轴伸端**
     ③ 在电动机转动一周时，记下万用表**指针从 0 开始向正方向摆动**时
        轴伸圆周方向与端盖标记相对应的位置，如标记数字「1」
     ④ 再将表笔连接到**中性点和 V1 端**，用上述方法标记数字「2」；
        将表笔连接**中性点和 W1 端**，标记数字「3」
     ⑤ **轴伸端所做的标记「1、2、3」为逆时针顺序排列**。
        电动机出线端 U1、V1、W1 分别与电源 L1、L2、L3 连接相连接时，
        **主轴旋转方向应为顺时针；反之，则为逆时针**
   - **图 10-16 电动机与电源线的连接（四步）**：
     ① 将电源相线从接线盒电源线孔中穿出，拧松接线柱的螺钉，
        **将电源相线 L1 连接到电动机接线柱 U1 端**
     ② 借助扳手，将电动机接线盒中绕组接线端与电源线连接端子拧紧，
        **确保安装牢固、可靠**
     ③ 采用同样的方法，将电源相线 **L2、L3 连接到电动机接线柱 V1、W1 端**
     ④ **最后连接黄、绿接地线**，注意查看接线端子，**固定好接地标记牌**
   - **图 10-17 电气安装后的检查**：电动机的电气安装完成后，
     **需要通电检查起动和转向是否正常**。按预先连接的电源线（**Y 形或 △ 形**）
     接通电源，**用钳形电流表测量电源线的电流**。通电后，
     **查看电动机启动电流值和轴的旋转方向是否正常**

   **屏 3 那五步的原理，书上没解释，文案里标了口径**：
   转动转子时，转子的剩磁在定子绕组里感应出电动势 —— 这就是万用表指针摆动的原因。
   指针**从 0 开始向正方向摆动**的那一刻，说明那一相绕组的轴线正好转到了某个位置。
   三相各测一次，就把三个绕组在空间上的先后顺序标了出来。*/
(function(){
'use strict';
ELEC.reg({
  id: '10.3',
  file: 'c10-3.html',
  title: '10.3 装一台电动机',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>五种安装方式</button>
    <button class="tab" data-i="1"><span class="n">2</span>电源相序</button>
    <button class="tab" data-i="2"><span class="n">3</span>绕组相序</button>
    <button class="tab" data-i="3"><span class="n">4</span>接线与通电</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">铭牌上那个 B3、B5、V1，是安装方式</div>
    <b>IM 是国际通用的安装方式代号</b>：<b>B ＝ 卧式</b>（轴线水平）、
    <b>V ＝ 立式</b>（轴线竖直），后面的数字表示具体形式。
    <b>选一种看它长什么样、什么时候用。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">B3</button>
        <button class="btn sm" data-k="1">B5</button>
        <button class="btn sm" data-k="2">B35</button>
        <button class="btn sm" data-k="3">V1</button>
        <button class="btn sm" data-k="4">V3</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这一种</div><div class="v" id="s1a">B3</div></div>
        <div class="num"><div class="k">卧还是立</div><div class="v" id="s1b">卧式</div></div>
        <div class="num hi"><div class="k">有没有<br>底座</div><div class="v" id="s1c">有</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">五种常见安装方式（书上图 10-11 的注，原文照录）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>代号</th><th>书上写的</th><th>怎么记</th></tr></thead>
      <tbody>
        <tr><td class="eu-s"><b>B3</b></td><td><b>有底座；不直连安装法兰盘</b></td>
          <td>最常见的一种<br><span class="sub">靠底座固定，靠联轴器带负载</span></td></tr>
        <tr><td class="eu-s"><b>B5</b></td><td><b>无底座；有直连安装法兰盘</b></td>
          <td>整台挂在负载上<br><span class="sub">法兰盘直接对接</span></td></tr>
        <tr><td class="eu-s"><b>B35</b></td><td><b>有底座，有直连安装法兰盘</b></td>
          <td><b>3 和 5 都有</b><br><span class="sub">代号本身就是提示</span></td></tr>
        <tr><td class="eu-s"><b>V1</b></td><td><b>无底座，传动轴伸向下</b></td>
          <td rowspan="2">立式两种<br><span class="sub">差别只在轴朝哪</span></td></tr>
        <tr><td class="eu-s"><b>V3</b></td><td><b>无底座，传动轴伸向上</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>B35 这个代号本身就是记忆法：3 和 5 都有 ＝ 底座和法兰盘都有。</b>
      <span class="sub">现场用处很直接：<b>换电动机时安装方式必须一样</b>，
      不然装不上去 —— 底座的螺孔位置、法兰盘的直径和螺孔都是配套的。
      <hr>报型号的时候要连安装方式一起报：
      「Y132S-4，B3」，不然订回来一台 B5 的没法装。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">机械安装那一半，这门课不做</div>
    书上 10.3.1 还讲了机座安装（<b>挖基坑、铺石子、夯实、浇混凝土</b>）
    和联轴器安装（<b>用千分表校偏心度和平行度</b>）—— <b>全是手上的活。</b>
    <div class="tip">
      <b>但有两条判据能记住：</b>
      <span class="sub">① <b>三相交流电动机较重，工作时会产生振动，
      因此不能将电动机直接放置在地面上，应固定在混凝土基座或木板上</b>（书上原话）。
      <hr>② 联轴器<b>由两个法兰盘构成</b>；安装时要把电动机和被驱动机构的转轴
      <b>调整到同一高度</b>，<b>为确保偏心度和平行度符合要求，需使用千分表配合安装</b>。
      <hr>没对中的后果 9.5 屏 2 讲过：<b>联轴器安装不当会引起轴承发热</b>，
      运行几个月之后表现成「电动机过热」，那时候查起来要费很大工夫。</span>
    </div>
  </div>
</section>

<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">转得对不对，看相序对不对</div>
    书上一句话把这件事定死了：<b>电动机的旋转方向与电源的相序有关。</b>
    所以电气安装的第一步是<b>用相序仪确定电源相序并做标记</b>。
    <b>点看两种结果各怎么办。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">「正」端亮</button>
        <button class="btn sm" data-k="1">「反」端亮</button>
        <button class="btn sm" data-k="2">调换一对再测</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">哪端亮</div><div class="v" id="s2a">正</div></div>
        <div class="num"><div class="k">说明</div><div class="v" id="s2b">相序相同</div></div>
        <div class="num hi"><div class="k">怎么办</div><div class="v" id="s2c">做标记</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">图 10-14 的两步（书上原文）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>步</th><th>做什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">①</td><td>将相序表的<b>三根检测线分别连接待检测的三条线缆</b>
          <br><span class="sub">图上是黄 A、绿 B、红 C</span></td></tr>
        <tr><td class="eu-s">②</td><td>查看相序仪指示灯，判断电源相序：<br>
          <b>「正」端的指示灯比「反」端的亮</b> ⇒ 电源相序与相序仪接线<b>相同</b><br>
          <b>「反」端的指示灯亮</b> ⇒ 电源相序与相序仪接线<b>相反</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>相序反了怎么办：任意调换一对电源线，通电再测。</b>
      <span class="sub">书上原话就是这一句。<b>只要换两根，第三根不动</b> ——
      三相里任意交换两相，旋转方向就反过来。
      <hr>这条在第 11 章「正反转控制」里就是全部原理：
      <b>正转接触器和反转接触器接的是不同的相序</b>，
      换的正是其中两相。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">相序确定后要做标记（书上原话）</div>
    「直至电源相序确定，用<b>字母（U、V、W）、数字（1、2、3）或黄、绿、红
    三种不同颜色标记在电源线上</b>。」
    <div class="tip">
      <b>标记不是走过场 —— 下一个人全靠它。</b>
      <span class="sub">8.2 屏 4 讲过线色：<b>L1 黄、L2 绿、L3 红</b>，
      正好对上书上这句「黄、绿、红三种不同颜色」。
      <hr>4.2 讲文字符号时那条也在这儿：
      <b>L1/L2/L3 是电源侧的三相，U/V/W 是设备侧的三相</b> ——
      同一根线两头两个名字。所以标记时要说清楚标的是哪一头。</span>
    </div>
  </div>
</section>

<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">绕组相序：拿万用表和一只手就能定</div>
    电源相序定完了，还得知道<b>电动机自己三个绕组的先后顺序</b>。
    书上给了一套只用万用表的办法（图 10-15，五步）——
    <b>不用通电，转子用手转。点「下一步」走一遍。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns">
        <button class="btn" id="s3p">‹ 上一步</button>
        <button class="btn go" id="s3n">下一步 ›</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">第几步</div><div class="v" id="s3a">1 / 5</div></div>
        <div class="num"><div class="k">这一步</div><div class="v" id="s3b">接成 Y 形</div></div>
        <div class="num hi"><div class="k">表笔接<br>哪儿</div><div class="v" id="s3c">还没接</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">图 10-15 的五步（书上原文照录）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>步</th><th>书上写的</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">①</td><td>将电动机<b>三相绕组连接成 Y 形</b>，
          并在电动机的<b>轴伸端端盖上做标记</b></td></tr>
        <tr><td class="eu-s">②</td><td>将万用表量程调整至<b>直流档</b>，
          用表笔分别连接<b>中性点和 U1 端</b>，<b>顺时针转动轴伸端</b></td></tr>
        <tr><td class="eu-s">③</td><td>在电动机转动一周时，记下万用表
          <b>指针从 0 开始向正方向摆动</b>时轴伸圆周方向与端盖标记相对应的位置，
          标记数字「<b>1</b>」</td></tr>
        <tr><td class="eu-s">④</td><td>再将表笔连接<b>中性点和 V1 端</b>，
          同样方法标记「<b>2</b>」；连接<b>中性点和 W1 端</b>，标记「<b>3</b>」</td></tr>
        <tr><td class="eu-s">⑤</td><td><b>轴伸端所做的标记「1、2、3」为逆时针顺序排列</b>。
          U1、V1、W1 分别与 L1、L2、L3 相连时，<b>主轴旋转方向应为顺时针</b>；
          反之则为逆时针</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>为什么转子一转，万用表指针就会摆 —— 书上没解释，补一句：</b>
      <span class="sub">转子上有<b>剩磁</b>。用手转动它的时候，
      这点微弱的磁场扫过定子绕组，<b>在绕组里感应出电动势</b>（1.6 讲的电磁感应）——
      这就是指针摆动的来源。
      <hr>指针<b>从 0 开始向正方向摆动</b>的那一刻，说明转子磁极正好转到了
      那一相绕组的某个固定位置。<b>三相各测一次，就把三个绕组在空间上的
      先后顺序标出来了。</b></span>
    </div>
  </div>
</section>

<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">接线四步，最后一步是接地线</div>
    相序都定完了，才轮到接线。书上给了四步，
    <b>最后一步单独列出来：连接黄、绿接地线，固定好接地标记牌。</b>
    <b>点「下一步」走一遍，最后有一次通电检查。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns">
        <button class="btn" id="s4p">‹ 上一步</button>
        <button class="btn go" id="s4n">下一步 ›</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">第几步</div><div class="v" id="s4a">1 / 5</div></div>
        <div class="num"><div class="k">接哪根</div><div class="v" id="s4b">L1 → U1</div></div>
        <div class="num hi"><div class="k">接了几根</div><div class="v" id="s4c">1 / 4</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">图 10-16 接线四步 ＋ 图 10-17 通电检查</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>步</th><th>书上写的</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">①</td><td>将电源相线从接线盒电源线孔中穿出，拧松接线柱的螺钉，
          <b>将电源相线 L1 连接到电动机接线柱 U1 端</b></td></tr>
        <tr><td class="eu-s">②</td><td>借助扳手，将绕组接线端与电源线连接端子拧紧，
          <b>确保安装牢固、可靠</b></td></tr>
        <tr><td class="eu-s">③</td><td>采用同样的方法，将电源相线
          <b>L2、L3 连接到电动机接线柱 V1、W1 端</b></td></tr>
        <tr><td class="eu-s">④</td><td><b>最后连接黄、绿接地线</b>，注意查看接线端子，
          <b>固定好接地标记牌</b></td></tr>
        <tr><td class="eu-s">检查</td><td>按预先连接的电源线（<b>Y 形或 △ 形</b>）接通电源，
          <b>用钳形电流表测量电源线的电流</b>；
          <b>查看电动机启动电流值和轴的旋转方向是否正常</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>接地线排在最后，但它不是「顺手做一下」的事。</b>
      <span class="sub">2.7 讲过接线盒里那几块连接片，
      5.6 讲过<b>绕组对地绝缘要 ≥ 0.5 MΩ</b> ——
      而这些保护的前提是<b>外壳真的接了地</b>。
      <hr>8.2 屏 2 那个「N 和 PE 混接」的后果在这儿也成立：
      <b>接地线接错地方，漏电保护永远不动作，而外壳一直带电。</b>
      「固定好接地标记牌」是为了让下一个人不接错。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="10.3">
    <div class="qz" data-q="电动机铭牌上标着「B35」，这是什么意思？"
      data-opts="功率等级|安装方式：卧式，有底座、也有直连安装法兰盘|防护等级"
      data-right="1"
      data-why="安装方式代号。IM 是国际通用的安装方式代号，B 表示卧式（轴线水平）、V 表示立式（轴线竖直），后面的数字表示具体形式。B3 是有底座、不直连法兰盘；B5 是无底座、有直连法兰盘；B35 就是两样都有——代号本身就是记忆法。换电动机时安装方式必须一样，不然螺孔对不上装不进去。"></div>
    <div class="qz" data-q="用相序仪测电源，发现「反」端的指示灯亮。该怎么办？"
      data-opts="换一台相序仪|任意调换一对电源线后，通电再测试，直到相序确定|把三根线全部换位置"
      data-right="1"
      data-why="书上原话：若电源相序与相序仪接线相反，则可任意调换一对电源线后，通电再测试。三相里任意交换两相，旋转方向就反过来——只要换两根，第三根不动。这条在第 11 章「正反转控制」里就是全部原理：正转和反转两个接触器接的是不同的相序，换的正是其中两相。"></div>
    <div class="qz" data-q="确定绕组相序时，为什么用手转动转子，万用表指针就会摆动？"
      data-opts="因为绕组里本来就有电|转子上有剩磁，转动时磁场扫过定子绕组，在绕组里感应出电动势|因为万用表接触不良"
      data-right="1"
      data-why="电磁感应（1.6 讲过）。转子上有剩磁，用手转动它时这点微弱磁场扫过定子绕组，在绕组里感应出电动势——这就是指针摆动的来源。指针从 0 开始向正方向摆动的那一刻，说明转子磁极正好转到那一相绕组的某个固定位置；三相各测一次，就把三个绕组在空间上的先后顺序标出来了。这个原理书上没写，是补充的。"></div>
    <div class="qz" data-q="电动机接线四步里，最后一步是什么？"
      data-opts="拧紧所有端子|连接黄、绿接地线，并固定好接地标记牌|通电试转"
      data-right="1"
      data-why="书上第 ④ 步：最后连接黄、绿接地线，注意查看接线端子，固定好接地标记牌。接地排在最后但不是「顺手做一下」的事——5.6 讲的绝缘判据、8.2 讲的漏电保护，全都以「外壳真的接了地」为前提。接地线接错地方，漏电保护永远不动作，而外壳一直带电。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 10 章 10.3 节（书内 P186~P190）</div>
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
/* 一台电动机的侧视剪影：机身 + 接线盒 + 轴。**方向靠 vert 和 flip 控制** */
function motorBody(g, cx, cy, w, h, o){
  o = o || {};
  g.save();
  g.translate(cx, cy);
  if(o.vert) g.rotate(-Math.PI/2 * (o.up ? 1 : -1));
  /* 机身 */
  box(g, -w/2, -h/2, w, h, 8, C.box, C.boxLine, 1.6);
  /* 散热筋 */
  g.save(); g.strokeStyle = C.boxLine; g.lineWidth = 0.9;
  for(let x = -w/2 + 9; x < w/2 - 6; x += 8){
    g.beginPath(); g.moveTo(x, -h/2 + 5); g.lineTo(x, h/2 - 5); g.stroke();
  }
  g.restore();
  /* 接线盒 */
  box(g, -12, -h/2 - 13, 26, 14, 3, C.card, C.boxLine, 1.2);
  /* 轴（伸出右边） */
  g.save(); g.strokeStyle = P.chrome; g.lineWidth = 8; g.lineCap = 'round';
  g.beginPath(); g.moveTo(w/2, 0); g.lineTo(w/2 + 26, 0); g.stroke(); g.restore();
  g.restore();
}
/* 法兰盘：一个带螺孔的圆环，画在轴根部 */
function flange(g, x, y, r, vert){
  g.save(); g.translate(x, y);
  if(vert) g.rotate(-Math.PI/2);
  g.strokeStyle = P.steelD; g.fillStyle = P.steel; g.lineWidth = 1.4;
  g.beginPath(); g.rect(-4, -r, 8, r*2); g.fill(); g.stroke();
  g.fillStyle = C.bg;
  [-r + 7, 0, r - 7].forEach(function(dy){
    if(dy === 0) return;
    g.beginPath(); g.arc(0, dy, 2.6, 0, Math.PI*2); g.fill();
  });
  g.restore();
}
/* 底座：机身底下那两块脚 */
function feet(g, cx, cy, w, h){
  box(g, cx - w/2 - 8, cy + h/2, w + 16, 9, 2, P.steel, P.steelD, 1.2);
  [-1, 1].forEach(function(s){
    dot(g, cx + s * (w/2 - 4), cy + h/2 + 4.5, C.bg, 2.4);
  });
}

/* ================================================================
   场景 1：五种安装方式
   ================================================================
   一台电动机，按代号换姿势 —— **底座、法兰盘、轴的朝向三样组合**
   就是这五种代号的全部含义 */
const IM = [
  {n:'B3',  vert:0, up:0, base:1, fl:0, t:'卧式', b:'有', f:'无',
   d:'书上原话：<b>B3：有底座；不直连安装法兰盘。</b>' +
     '<hr><b>最常见的一种。</b>电动机靠底座上那几个螺孔固定在混凝土基座或木板上，' +
     '轴伸出来通过<b>联轴器</b>带动负载。' +
     '<hr>9.5 屏 2 那个案例、9.4 屏 4 那条「异常振动 ⇒ 先查安装」，' +
     '说的都是这种装法：<b>底座没固定牢、联轴器没对中，都会表现成振动或轴承发热。</b>'},
  {n:'B5',  vert:0, up:0, base:0, fl:1, t:'卧式', b:'无', f:'有',
   d:'书上原话：<b>B5：无底座；有直连安装法兰盘。</b>' +
     '<hr><b>整台电动机挂在负载设备上</b> —— 靠轴根部那个法兰盘' +
     '直接跟负载的机壳对接，用一圈螺栓拧紧。' +
     '<hr>常见于<b>水泵、减速机</b>这类跟电动机做成一体的设备：' +
     '不用另找地方装底座，也不用对中（法兰盘对接本身就保证了同心）。' +
     '<hr>代价是<b>整台电动机的重量都压在那圈螺栓上</b>，' +
     '所以法兰盘的规格和螺孔位置是有标准的，换机器必须一样。'},
  {n:'B35', vert:0, up:0, base:1, fl:1, t:'卧式', b:'有', f:'有',
   d:'书上原话：<b>B35：有底座，有直连安装法兰盘。</b>' +
     '<hr><b>代号本身就是记忆法：3 和 5 都有。</b>' +
     '既能用底座固定，也能用法兰盘直连 —— <b>两种方式都支持</b>。' +
     '<hr>好处是安装灵活：法兰盘保证同心，底座再分担一部分重量和振动。' +
     '大功率、或者振动大的场合常用。' +
     '<hr>选型时它是最保险的一种 —— <b>B35 的机器能装在原本用 B3 或 B5 的位置上</b>，' +
     '反过来不行。'},
  {n:'V1',  vert:1, up:0, base:0, fl:1, t:'立式', b:'无', f:'有',
   d:'书上原话：<b>V1：无底座，传动轴伸向下。</b>' +
     '<hr>电动机<b>竖着装，轴朝下</b>，靠顶上（相对电动机来说是轴那一端）' +
     '的法兰盘吊挂在负载设备上。' +
     '<hr>典型场合：<b>立式水泵、搅拌机</b> —— 负载在下面，电动机骑在上面。' +
     '<hr><b>立式安装对轴承的要求不一样</b>：' +
     '卧式时转子的重量由两端轴承径向承担，' +
     '<b>立式时整个转子的重量压在下面那个轴承上（轴向力）</b>，' +
     '所以立式电动机用的是能承受轴向力的轴承，不能拿卧式的随便改立着装。'},
  {n:'V3',  vert:1, up:1, base:0, fl:1, t:'立式', b:'无', f:'有',
   d:'书上原话：<b>V3：无底座，传动轴伸向上。</b>' +
     '<hr>和 V1 的差别<b>只有一处：轴朝上</b>。' +
     '电动机蹲在下面，负载在上面。' +
     '<hr>这种装法有一个现场必须注意的地方：<b>轴朝上意味着接线盒和轴伸端都朝上</b>，' +
     '<b>水、油、灰会顺着轴往轴承里进</b>。' +
     '所以 V3 安装的电动机一般要加防护罩或者甩水环。' +
     '<hr>10.4 讲维护时那条「轴承间隙、润滑脂」在这种装法下检查得更勤。'}
];
const S1 = { k:0 };
function draw1(){
  const g = st1.g; st1.clear();
  const m = IM[S1.k];
  EP.heading(g, 14, 20, 'IM' + m.n, m.t + '　' + (m.b === '有' ? '有底座' : '无底座') +
             '　' + (m.f === '有' ? '有法兰盘' : '无法兰盘'));

  const cx = 128, cy = 132;
  if(!m.vert){
    motorBody(g, cx, cy, 96, 62, {});
    if(m.base) feet(g, cx, cy, 96, 62);
    if(m.fl) flange(g, cx + 50, cy, 26, false);
    /* 负载设备 */
    if(m.fl){
      box(g, cx + 62, cy - 30, 46, 60, 5, C.card, C.boxLine, 1.3);
      txt(g, '负载', cx + 85, cy, {sz:8.5, b:1, c:C.tx3});
    } else {
      /* 联轴器 + 负载 */
      box(g, cx + 62, cy - 8, 16, 16, 2, P.steel, P.steelD, 1.2);
      txt(g, '联轴器', cx + 70, cy + 22, {sz:7.5, c:C.tx3});
      box(g, cx + 84, cy - 26, 44, 52, 5, C.card, C.boxLine, 1.3);
      txt(g, '负载', cx + 106, cy, {sz:8.5, b:1, c:C.tx3});
    }
    /* 地面 */
    seg(g, [[20, cy + 42],[336, cy + 42]], C.boxLine, 2.4);
    txt(g, m.fl ? '法兰盘直接对接负载' : '联轴器带负载', 180, cy + 58,
        {sz:8, c:C.tx3});
  } else {
    /* 立式：轴朝上或朝下。**整体压缩到 y=56~190 之间** ——
       原来负载框会穿进下面那一排特征卡里（截图抓到的）*/
    const my = m.up ? cy + 18 : cy - 24;
    motorBody(g, cx, my, 80, 58, {vert:1, up: m.up});
    const fy = m.up ? my - 44 : my + 44;
    flange(g, cx, fy, 24, true);
    const ly = m.up ? fy - 28 : fy + 28;
    box(g, cx - 30, ly - 18, 60, 36, 5, C.card, C.boxLine, 1.3);
    txt(g, '负载', cx, ly, {sz:8.5, b:1, c:C.tx3});
    EC.head(g, cx + 52, fy, 0, m.up ? -1 : 1, 7, C.acc);
    txt(g, m.up ? '轴伸向上' : '轴伸向下', cx + 64, fy, {sz:8.5, b:1, c:C.acc, al:'left'});
  }

  /* 三个特征标签 */
  const F = [['底座', m.b], ['法兰盘', m.f], ['姿势', m.t]];
  F.forEach(function(a, i){
    const x = 44 + i*104;
    const on = a[1] === '有' || a[1] === '立式' || a[1] === '卧式';
    box(g, x - 40, 208, 80, 32, 5, C.box, C.boxLine, 1.1);
    txt(g, a[0], x, 218, {sz:8, c:C.tx3});
    txt(g, a[1], x, 232, {sz:10, b:1, c: a[1] === '有' ? C.ok : C.tx2});
  });

  conc(g, 250, 'acc', 'IM' + m.n + '　' + m.t,
       (m.b === '有' ? '有底座' : '无底座') + '；' +
       (m.f === '有' ? '有直连安装法兰盘' : '不直连安装法兰盘'));
}
function note1(){
  const m = IM[S1.k];
  $('s1a').textContent = m.n;
  $('s1b').textContent = m.t;
  $('s1c').textContent = m.b;
  $('n0').innerHTML = '<div class="st">IM' + m.n + '</div>' + m.d;
}

/* ================================================================
   场景 2：电源相序
   ================================================================
   相序仪画成一个盒子 + 两个指示灯（正 / 反）+ 三根检测线。
   **三根线的颜色按国标：黄 绿 红**（8.2 屏 4 讲过） */
const S2 = { k:0 };
const PHC = ['#e8b93c', '#4fc04a', '#ff6b6b'];
function draw2(){
  const g = st2.g; st2.clear();
  const k = S2.k;
  EP.heading(g, 14, 20, '相序仪',
    ['「正」端亮 —— 相序相同', '「反」端亮 —— 相序相反', '调换一对，再测一次'][k]);

  /* 相序仪本体 */
  const bx = 42, by = 62, bw = 118, bh = 132;
  box(g, bx, by, bw, bh, 6, C.box, C.boxLine, 1.6);
  txt(g, '相序表', bx + bw/2, by + bh - 14, {sz:9, b:1, c:C.tx3});
  /* 两个指示灯 */
  const on0 = k !== 1;               /* 「正」端亮？ */
  [['正', on0], ['反', !on0]].forEach(function(a, i){
    const lx = bx + 34 + i*50, ly = by + 40;
    g.save();
    if(a[1]){ g.globalAlpha = .3; g.fillStyle = C.warn;
      g.beginPath(); g.arc(lx, ly, 20, 0, Math.PI*2); g.fill(); g.globalAlpha = 1; }
    g.fillStyle = a[1] ? C.warn : C.box;
    g.strokeStyle = a[1] ? C.warn : C.boxLine; g.lineWidth = 1.6;
    g.beginPath(); g.arc(lx, ly, 11, 0, Math.PI*2); g.fill(); g.stroke(); g.restore();
    txt(g, a[0], lx, ly + 26, {sz:9.5, b:1, c: a[1] ? C.warn : C.tx3});
  });

  /* 三根检测线 */
  const NM = k === 2 ? ['A','C','B'] : ['A','B','C'];
  [0,1,2].forEach(function(i){
    const y = by + 22 + i*36;
    /* 换过的那两根画成交叉 */
    if(k === 2 && i < 2){
      const y2 = by + 22 + (1-i)*36;
      new Path([[bx + bw, y],[bx + bw + 30, y],[bx + bw + 58, y2],
                [bx + bw + 92, y2]]).stroke(g, 2.4, PHC[i]);
    } else {
      seg(g, [[bx + bw, y],[bx + bw + 92, y]], PHC[i], 2.4);
    }
    dot(g, bx + bw, y, PHC[i], 3);
    txt(g, NM[i], bx + bw + 100, by + 22 + i*36, {sz:9, b:1, c:PHC[i], al:'left'});
  });
  txt(g, '三条待测线缆', 306, by + 4, {sz:8, c:C.tx3, al:'right'});
  if(k === 2){
    EP.chip(g, '调换了一对', bx + bw + 58, by + 4, {sz:8.5, b:1, c:C.acc});
  }

  const CC = [
    ['ok',  '「正」端比「反」端亮', '电源相序与相序仪接线相同 ⇒ 做好标记'],
    ['err', '「反」端的指示灯亮', '电源相序与相序仪接线相反'],
    ['ok',  '任意调换一对电源线，通电再测', '直至电源相序确定，再用字母/数字/颜色标记']
  ][k];
  conc(g, 216, CC[0], CC[1], CC[2]);
}
function note2(){
  const k = S2.k;
  $('s2a').textContent = ['正','反','再测'][k];
  $('s2b').textContent = ['相序相同','相序相反','要重测'][k];
  $('s2c').textContent = ['做标记','换一对','做标记'][k];
  const T = [
    ['「正」端亮：相序对上了',
     '书上原话：<b>若相序仪「正」端的指示灯比「反」端的指示灯亮，' +
     '则说明电源相序与相序仪接线相同。</b>' +
     '<hr>接下来就是做标记：<b>用字母（U、V、W）、数字（1、2、3）' +
     '或黄、绿、红三种不同颜色标记在电源线上</b>。' +
     '<hr><b>为什么非要先测相序</b>：书上一句话说死了 ——' +
     '<b>电动机的旋转方向与电源的相序有关</b>。' +
     '接错了电动机会反转，轻则设备不工作，' +
     '重则<b>水泵反转打空、风机反转吹反、机床刀具反着走</b>。'],
    ['「反」端亮：相序反了',
     '书上原话：<b>若相序仪「反」端的指示灯亮，' +
     '则说明电源相序与相序仪接线相反。</b>' +
     '<hr>这不是「坏了」，只是<b>这三根线接进相序仪的顺序</b>和实际相序不一致。' +
     '<hr>处理方法就是下一档：<b>任意调换一对电源线，通电再测试</b>。' +
     '<hr><b>注意「任意一对」这三个字</b>：三相里换哪两根都行，' +
     '效果一样 —— 都会让相序反过来。<b>但不能三根一起换位置</b>，' +
     '那等于绕一圈回到原样（A→B→C→A 还是同一个循环顺序）。'],
    ['调换一对之后再测',
     '书上原话：<b>若电源相序与相序仪接线相反，则可任意调换一对电源线后，' +
     '通电再测试，直至电源相序确定</b>，' +
     '用字母（U、V、W）、数字（1、2、3）或黄、绿、红三种不同颜色标记在电源线上。' +
     '<hr><b>「换两根就反过来」这条，是第 11 章正反转控制的全部原理。</b>' +
     '那一章里正转接触器和反转接触器接的是不同的相序 ——' +
     '<b>反转那只接触器把其中两相调换了一下</b>，' +
     '所以两只接触器绝对不能同时吸合（会相间短路），' +
     '必须用<b>互锁</b>（9.2 屏 4 讲的六种保护之一）锁死。'],
  ][k];
  $('n1').innerHTML = '<div class="st">' + T[0] + '</div>' + T[1];
}

/* ================================================================
   场景 3：绕组相序（五步）
   ================================================================
   一个端盖圆 + 三个标记位置 + 一块指针表。
   **走到第几步就画出到那一步为止的标记** */
const S3 = { i:0 };
const WSTEP = [
  {n:'接成 Y 形，端盖做标记', probe:'还没接', mark:0,
   d:'书上第 ① 步：<b>将电动机三相绕组连接成 Y 形，' +
     '并在电动机的轴伸端端盖上做标记。</b>' +
     '<hr><b>为什么要接成 Y 形</b>：Y 形有一个<b>中性点</b>' +
     '（三个绕组的尾端接在一起），' +
     '而下面几步都要<b>把一支表笔接在中性点上</b>，另一支去接各相的首端。' +
     '<hr>2.7 屏 3 讲过接线盒的连接片：' +
     '<b>横着两块 ＝ 星形（Y），竖着三块 ＝ 三角形（△）</b>。' +
     '<hr><b>端盖上那个标记是「参照零点」</b> —— ' +
     '后面记录的三个位置都是相对它来说的。'},
  {n:'表笔接中性点和 U1', probe:'中性点 — U1', mark:0,
   d:'书上第 ② 步：<b>将万用表量程调整至直流档，' +
     '用表笔分别连接中性点和 U1 端，顺时针转动轴伸端。</b>' +
     '<hr><b>为什么用直流档</b>：手转转子产生的是很慢变化的感应电动势，' +
     '而且要看<b>指针往哪个方向摆</b> —— 交流档看不出方向。' +
     '<hr><b>为什么用指针表而不是数字表</b>：这一步看的是' +
     '「指针从 0 开始向正方向摆动的那一刻」，' +
     '<b>指针的连续摆动比数字跳变直观得多</b>。' +
     '3.6b 讲指针表时说过这类场合正是它的用武之地。'},
  {n:'记下位置，标「1」', probe:'中性点 — U1', mark:1,
   d:'书上第 ③ 步：在电动机转动一周时，记下万用表' +
     '<b>指针从 0 开始向正方向摆动</b>时，' +
     '轴伸圆周方向与端盖标记相对应的位置，<b>标记数字「1」</b>。' +
     '<hr><b>指针为什么会摆，书上没解释，补一句</b>：' +
     '转子上有<b>剩磁</b>。用手转它的时候，' +
     '这点微弱磁场扫过定子绕组，<b>在绕组里感应出电动势</b>（1.6 讲的电磁感应）。' +
     '<hr><b>「从 0 开始向正方向摆动」的那一刻</b>，' +
     '说明转子磁极正好转到了 U 相绕组的某个固定位置 ——' +
     '把这个位置在圆周上标出来，就记录下了 U 相在空间上的方位。'},
  {n:'换 V1、W1，标「2」「3」', probe:'中性点 — V1 / W1', mark:3,
   d:'书上第 ④ 步：<b>再将表笔连接到中性点和 V1 端，' +
     '用上述方法标记数字「2」；将表笔连接电动机的中性点和 W1 端，标记数字「3」。</b>' +
     '<hr>同样的动作重复两遍，就得到了三个标记。' +
     '<hr><b>这三个标记记录的是三个绕组在定子圆周上的先后顺序</b> ——' +
     '而这个顺序，决定了通电之后旋转磁场往哪个方向转（2.7 屏 1 讲的旋转磁场）。'},
  {n:'读顺序，定转向', probe:'看三个标记', mark:3, done:1,
   d:'书上第 ⑤ 步：<b>轴伸端所做的标记「1、2、3」为逆时针顺序排列。</b>' +
     '<hr>结论：电动机出线端 <b>U1、V1、W1 分别与电源 L1、L2、L3 连接</b>时，' +
     '<b>主轴旋转方向应为顺时针；反之，则为逆时针。</b>' +
     '<hr><b>到这一步，两件事都定完了</b>：' +
     '屏 2 定了电源那三根线谁是 L1、L2、L3；' +
     '这一屏定了电动机这三个接线柱谁是 U1、V1、W1。' +
     '<b>一一对应接上，转向就是确定的</b>，不用通电试。' +
     '<hr><b>现场当然也可以「点动试一下看转向」</b>，' +
     '但那要求负载允许反转一瞬间 —— 水泵、风机可以，' +
     '有些机床和输送带不行，那就只能靠这套办法先定下来。'}
];
function draw3(){
  const g = st3.g; st3.clear();
  const st = WSTEP[S3.i];
  EP.heading(g, 14, 20, '第 ' + (S3.i+1) + ' 步', st.n);

  /* 端盖圆 */
  const cx = 96, cy = 130, R = 54;
  g.save(); g.strokeStyle = C.boxLine; g.lineWidth = 2;
  g.beginPath(); g.arc(cx, cy, R, 0, Math.PI*2); g.stroke(); g.restore();
  g.save(); g.fillStyle = P.chrome; g.strokeStyle = P.steelD; g.lineWidth = 1.4;
  g.beginPath(); g.arc(cx, cy, 13, 0, Math.PI*2); g.fill(); g.stroke(); g.restore();
  txt(g, '轴伸端端盖', cx, cy + R + 14, {sz:8.5, c:C.tx3});
  /* 端盖上的参照标记（正上方） */
  seg(g, [[cx, cy - R - 6],[cx, cy - R + 8]], C.acc, 2.4);
  txt(g, '参照标记', cx, cy - R - 16, {sz:8, b:1, c:C.acc});
  /* 三个位置标记：逆时针 1 2 3 */
  const AN = [-Math.PI/2, -Math.PI/2 - Math.PI*2/3, -Math.PI/2 - Math.PI*4/3];
  for(let i = 0; i < st.mark; i++){
    const a = AN[i], mx = cx + Math.cos(a)*(R - 16), my = cy + Math.sin(a)*(R - 16);
    g.save(); g.fillStyle = C.ok; g.globalAlpha = .22;
    g.beginPath(); g.arc(mx, my, 12, 0, Math.PI*2); g.fill(); g.restore();
    txt(g, String(i+1), mx, my, {sz:11, b:1, c:C.ok});
  }
  /* 逆时针箭头 */
  if(st.mark >= 3){
    g.save(); g.strokeStyle = C.ok; g.lineWidth = 1.8; g.setLineDash([4,3]);
    g.beginPath(); g.arc(cx, cy, R - 30, -Math.PI/2, -Math.PI/2 - Math.PI*1.4, true);
    g.stroke(); g.restore();
    txt(g, '逆时针', cx, cy + 4, {sz:8, b:1, c:C.ok});
  }
  /* 顺时针转动的手势提示 */
  if(S3.i === 1 || S3.i === 2){
    g.save(); g.strokeStyle = C.acc; g.lineWidth = 2;
    g.beginPath(); g.arc(cx, cy, R + 14, -0.6, 0.8); g.stroke(); g.restore();
    EC.head(g, cx + Math.cos(0.8)*(R+14), cy + Math.sin(0.8)*(R+14), -0.72, 0.7, 6, C.acc);
    EP.chip(g, '顺时针转', cx + R + 26, cy - 30, {sz:8.5, b:1, c:C.acc});
  }

  /* 指针表 */
  const swing = S3.i === 2 ? 0.5 : (S3.i === 1 ? 0.12 : 0);
  EC.dial(g, 208, 74, 128, 96,
    {val: swing, max:1, unit:'', label:'直流档', ticks:5, bipolar:true, show:false});
  if(S3.i >= 1){
    txt(g, st.probe, 272, 186, {sz:9, b:1, c:C.acc});
  }
  if(S3.i === 2){
    EP.chip(g, '从 0 向正方向摆', 272, 204, {sz:8.5, b:1, c:C.ok});
  }

  conc(g, 228, st.done ? 'ok' : 'acc',
    st.done ? 'U1V1W1 接 L1L2L3 ⇒ 主轴顺时针' : ('第 ' + (S3.i+1) + ' 步　' + st.n),
    st.done ? '书上：标记「1、2、3」为逆时针顺序排列' :
      ['三个绕组接成 Y 形，露出中性点', '万用表调直流档，顺时针转动轴伸端',
       '指针从 0 向正方向摆动那一刻的位置，就是「1」',
       '同样方法标出「2」和「3」'][S3.i]);
}
function note3(){
  const st = WSTEP[S3.i];
  $('s3a').textContent = (S3.i+1) + ' / 5';
  $('s3b').textContent = ['接成 Y 形','接 U1','标「1」','标 2、3','读顺序'][S3.i];
  $('s3c').textContent = st.probe;
  $('n2').innerHTML = '<div class="st' + (S3.i === 4 ? ' good' : '') + '">第 ' +
    (S3.i+1) + ' 步：' + st.n + '</div>' + st.d;
  $('s3p').disabled = S3.i === 0;
  $('s3n').disabled = S3.i === 4;
}

/* ================================================================
   场景 4：接线四步 ＋ 通电检查
   ================================================================
   接线盒画成六个接线柱（U1V1W1 / W2U2V2），走到第几步就接上几根 */
const S4 = { i:0 };
const WIRE4 = [
  {n:'L1 → U1', cnt:1, pe:0,
   d:'书上第 ① 步：<b>将电源相线从接线盒电源线孔中穿出，拧松接线柱的螺钉，' +
     '将电源相线 L1 连接到电动机接线柱 U1 端。</b>' +
     '<hr><b>顺序是 L1→U1、L2→V1、L3→W1，一一对应。</b>' +
     '前面两屏做的全部工作，就是为了这一刻能对得上号：' +
     '屏 2 定了哪根电源线是 L1，屏 3 定了哪个接线柱是 U1。' +
     '<hr>4.2 讲文字符号时那条在这儿用上了：' +
     '<b>L1/L2/L3 是电源侧的三相，U/V/W 是设备侧的三相</b> —— ' +
     '同一根线两头两个名字，接的时候按位置对应，不是按名字相同。'},
  {n:'拧紧端子', cnt:1, pe:0, tight:1,
   d:'书上第 ② 步：<b>借助扳手，将电动机接线盒中绕组接线端与电源线连接端子拧紧，' +
     '确保安装牢固、可靠。</b>' +
     '<hr><b>这一步单独列出来，是因为松动的端子是电动机故障的主要来源之一。</b>' +
     '<hr>9.4 屏 2 那张故障表里，「不起动」的原因栏反复出现<b>「接线松脱」</b>；' +
     '屏 3 讲的<b>缺一相嗡嗡响</b>，最常见的起因就是某个端子松了。' +
     '<hr>8.2 屏 4 讲过那条链：' +
     '<b>松 → 接触电阻大 → 发热 → 氧化 → 电阻更大 → 烧掉端子</b>。' +
     '拧紧之后<b>轻轻拽一下每根线</b>，拽得动就是没拧到位。'},
  {n:'L2 → V1、L3 → W1', cnt:3, pe:0,
   d:'书上第 ③ 步：<b>采用同样的方法，将电源相线 L2、L3 连接到' +
     '电动机接线柱 V1、W1 端。</b>' +
     '<hr>三根相线接完了。<b>注意接线盒里那三块连接片还在</b> ——' +
     '它们决定这台电动机是 Y 接还是 △ 接（2.7 屏 3）：' +
     '<b>横着两块 ＝ 星形，竖着三块 ＝ 三角形</b>。' +
     '<hr><b>接线之前必须先确认接法对不对</b>：' +
     '按 Y 接的电动机误接成 △，每相绕组承受的电压从 220 V 变成 380 V，' +
     '<b>电流暴涨，很快就烧</b>。铭牌上标着该用哪种。'},
  {n:'接地线', cnt:3, pe:1,
   d:'书上第 ④ 步：<b>最后连接黄、绿接地线，注意查看接线端子，' +
     '固定好接地标记牌。</b>' +
     '<hr><b>接地排在最后，但它不是「顺手做一下」的事。</b>' +
     '<hr>8.2 屏 4 讲过：<b>黄绿双色是 PE 的专用色，任何别的线都不许用它</b>。' +
     '接地端子在接线盒外壳上（或盒内单独一个），<b>有一个接地符号</b>。' +
     '<hr><b>为什么这一根这么要紧</b>：9.4 屏 4 那条「电动机漏电」' +
     '（引出线碰壳、绝缘下降、绝缘老化）——' +
     '真发生的时候，<b>靠的就是这根线把故障电流导走、让漏电保护动作</b>。' +
     '没接地，外壳就一直带着电等人去摸。' +
     '<hr>「固定好接地标记牌」是为了让下一个人不接错。'},
  {n:'通电检查', cnt:3, pe:1, chk:1,
   d:'图 10-17：电动机的电气安装完成后，<b>需要通电检查起动和转向是否正常</b>。' +
     '<hr>书上给的做法：<b>按预先连接的电源线（Y 形或 △ 形）接通电源，' +
     '用钳形电流表测量电源线的电流</b>。通电后，' +
     '<b>查看电动机启动电流值和轴的旋转方向是否正常</b>。' +
     '<hr><b>两件事一起看：电流和转向。</b>' +
     '<hr><b>电流</b> —— 3.7 讲过钳形表<b>一次只钳一根</b>；' +
     '9.5 屏 2 那个案例讲过<b>要跟铭牌上的额定电流比</b>。' +
     '起动瞬间电流会是额定的好几倍，那是正常的；' +
     '<b>看的是稳定之后的运行电流</b>。' +
     '<hr><b>转向</b> —— 要是转反了，回到屏 2 那条：' +
     '<b>任意调换一对电源线</b>。'}
];
const TERM = [
  ['W2', 78], ['U2', 138], ['V2', 198]           /* 上排 */
];
const TERM2 = [
  ['U1', 78], ['V1', 138], ['W1', 198]           /* 下排 */
];
function draw4(){
  const g = st4.g; st4.clear();
  const st = WIRE4[S4.i];
  EP.heading(g, 14, 20, '第 ' + (S4.i+1) + ' 步', st.n);

  /* 接线盒 */
  box(g, 52, 76, 176, 96, 6, C.box, C.boxLine, 1.6);
  txt(g, '接线盒', 56, 68, {sz:9, b:1, c:C.tx3, al:'left'});
  /* 六个接线柱 */
  TERM.forEach(function(a){
    box(g, a[1] - 14, 92, 28, 20, 3, P.steel, P.steelD, 1.2);
    txt(g, a[0], a[1], 102, {sz:8, b:1, c:P.bakelite});
  });
  TERM2.forEach(function(a){
    box(g, a[1] - 14, 136, 28, 20, 3, P.steel, P.steelD, 1.2);
    txt(g, a[0], a[1], 146, {sz:8, b:1, c:P.bakelite});
  });
  /* 三块连接片（横着两块 = 星形） */
  /* 连接片画在端子块**上沿**（y=92），不要横穿端子里的字（截图抓到的）*/
  g.save(); g.strokeStyle = P.chrome; g.lineWidth = 4.5; g.lineCap = 'round';
  g.beginPath(); g.moveTo(78, 88); g.lineTo(198, 88); g.stroke();
  g.restore();
  [78, 138, 198].forEach(function(x){ dot(g, x, 88, P.steelDD, 2.4); });
  txt(g, '连接片　横着两块 ＝ 星形', 226, 68, {sz:7.5, c:C.tx3, al:'right'});

  /* 已接上的相线 */
  for(let i = 0; i < st.cnt; i++){
    const t = TERM2[i];
    const y = 176 + i*13;
    seg(g, [[t[1], 156],[t[1], y],[262, y]], PHC[i], 2.4);
    /* 标签写在这一段横线的**左端上方**，不要放右端（那儿是钳形表）*/
    txt(g, ['L1','L2','L3'][i], t[1] + 12, y - 7, {sz:8.5, b:1, c:PHC[i], al:'left'});
    dot(g, t[1], 156, PHC[i], 3);
  }
  /* 接地线 */
  if(st.pe){
    /* 黄绿双色：先铺一层黄，再用虚线盖一层绿 */
    const pe = new Path([[52, 128],[30, 128],[30, 206]]);
    pe.stroke(g, 3.4, '#e8b93c');
    g.save(); g.setLineDash([6,6]); pe.stroke(g, 3.4, '#4fc04a'); g.restore();
    /* 接地符号 */
    [0,1,2].forEach(function(i){
      const w = 18 - i*6;
      seg(g, [[30 - w/2, 208 + i*5],[30 + w/2, 208 + i*5]], C.PE, 2);
    });
    txt(g, 'PE', 30, 194, {sz:8.5, b:1, c:C.PE});
    EP.chip(g, '黄绿双色', 30, 118, {sz:8, b:1, c:C.PE});
  }
  /* 拧紧提示 */
  if(st.tight) EP.chip(g, '拧紧　拽一下拽不动', 130, 224, {sz:9, b:1, c:C.acc});
  /* 通电检查 */
  if(st.chk){
    /* 钳形表钳住一根 */
    g.save(); g.strokeStyle = P.steelD; g.lineWidth = 8; g.lineCap = 'round';
    g.beginPath(); g.arc(300, 176, 20, -Math.PI*0.42, Math.PI*1.42); g.stroke();
    g.strokeStyle = P.steel; g.lineWidth = 5;
    g.beginPath(); g.arc(300, 176, 20, -Math.PI*0.42, Math.PI*1.42); g.stroke();
    g.restore();
    box(g, 284, 196, 32, 34, 4, P.bodyD, P.steelDD, 1.3);
    box(g, 288, 200, 24, 14, 2, '#0f2318', '#2f6b45', 1);
    txt(g, '3.4', 300, 207, {sz:8.5, b:1, c:'#4fe08a'});
    txt(g, 'A~', 300, 224, {sz:7, c:C.tx3});
    EP.chip(g, '钳一根量电流', 300, 148, {sz:8, b:1, c:C.acc});
  }

  conc(g, 244, S4.i === 4 ? 'ok' : 'acc',
    st.n, ['电源相线 L1 接到接线柱 U1 端', '确保安装牢固、可靠',
      'L2、L3 接到 V1、W1 端', '注意查看接线端子，固定好接地标记牌',
      '查看启动电流值和轴的旋转方向是否正常'][S4.i]);
}
function note4(){
  const st = WIRE4[S4.i];
  $('s4a').textContent = (S4.i+1) + ' / 5';
  $('s4b').textContent = ['L1 → U1','拧紧','L2 L3','接地线','通电查'][S4.i];
  $('s4c').textContent = st.cnt + ' / 3' + (st.pe ? ' ＋PE' : '');
  $('n3').innerHTML = '<div class="st' + (S4.i === 3 ? ' bad' : '') + '">第 ' +
    (S4.i+1) + ' 步：' + st.n + '</div>' + st.d;
  $('s4p').disabled = S4.i === 0;
  $('s4n').disabled = S4.i === 4;
}

/* ================================================================
   舞台、事件、收尾
   ================================================================ */
const st1 = new Stage('cv0', 360, 292);
const st2 = new Stage('cv1', 360, 258);
const st3 = new Stage('cv2', 360, 272);
const st4 = new Stage('cv3', 360, 286);

['s1k','s2k'].forEach(function(id, n){
  document.getElementById(id).addEventListener('click', function(e){
    const b = e.target.closest('.btn'); if(!b) return;
    const v = +b.dataset.k;
    [S1, S2][n].k = v;
    document.querySelectorAll('#' + id + ' .btn').forEach(function(x){
      x.classList.toggle('on', +x.dataset.k === v);
    });
    [note1, note2][n]();
    [draw1, draw2][n]();
  });
});
[['s3p','s3n', S3, 4, function(){ note3(); draw3(); }],
 ['s4p','s4n', S4, 4, function(){ note4(); draw4(); }]].forEach(function(a){
  document.getElementById(a[0]).addEventListener('click', function(){
    if(a[2].i > 0){ a[2].i--; a[4](); }
  });
  document.getElementById(a[1]).addEventListener('click', function(){
    if(a[2].i < a[3]){ a[2].i++; a[4](); }
  });
});

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会重设尺寸并清空。**四屏全是静态的，必须在这儿逐个补画** */
  draw1(); draw2(); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:10, sec:'10.3'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('10.3');
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
