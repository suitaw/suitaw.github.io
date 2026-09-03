/* 7.3 装完怎么验，坏了怎么查 —— 本节内容的唯一真相。
   对应《零基础学电工》第 7 章 7.3 节（书内 P134~P138）。

   **这一节差点被跳过，2026-09-03 补做的。** 原来的判断是「7.3 全是
   万用表测通断和量电压，3.6b 已经讲透」—— 那个判断只看到了**测量手法**那一层。
   重读之后发现书上这一节有两样别处没有的东西：
   ① **表 7-1「室内照明线路调试时的状态」** —— 13 个开关 12 盏灯逐条对应，
      那是一张**验收清单**，不是测量方法；
   ② **公共照明的故障树** —— 全不亮／一条支路不亮／单盏不亮，各走各的排查路。
   两样都是「装完怎么验、坏了怎么找」，跟「表怎么用」是两回事。

   四屏：① 通电之前 ② 通电调试（主戏）③ 一盏灯不亮 ④ 公共照明的故障树

   数字与说法的出处（书上原文，别凭记忆改）：
   - 调试分**断电调试**和**通电调试**两方面（书 P135 提示说明）。
     断电调试：**按动照明线路中各控制开关，检查开关动作是否灵活**；
     **观察照明灯具安装是否到位，固定是否牢靠**。
     通电调试：**闭合室内配电盘中的照明断路器，接通电源**
   - 线路安装完成后，**首先根据电路图、接线图逐级检查线路有无错接、漏接等情况**，
     并逐一检查各控制开关的开关动作是否灵活（书 P134~135）
   - **表 7-1 的通电调试栏（原文照录，屏 2 的判据全部来自它）**：
       按动 SA1 ：闭合 EL1 亮；断开 EL1 灭
       按动 SA2 ：初始 EL2、EL3 亮，按动后灯灭
       按动 SA3 ：初始 EL2、EL3 灭，按动后灯亮
       按动 SA4 ：初始 EL4、EL5、EL6 灭，按动后灯亮
       按动 SA5 ：初始 EL4、EL5、EL6 亮，按动后灯灭
       按动 SA7 ：闭合 EL7 亮；断开 EL7 灭
       按动 SA8 ：闭合 EL8 亮；断开 EL8 灭
       按动 SA9 ：闭合 EL9 亮；断开 EL9 灭
       按动 SA10：闭合 EL10 亮；断开 EL10 灭
       按动 SA11：闭合 EL11 亮；断开 EL11 灭
       按动 SA12：初始 EL12 亮，按动后灯灭
       按动 SA13：初始 EL12 灭，按动后灯亮
     **书上表里和图 7-16 上都没有 SA6，是跳号，别自己补一个。**
   - 图 7-16 的房间与灯具：玄关节能灯 EL1／客厅吊灯 EL2 EL3／客厅射灯 EL4 EL5 EL6／
     阳台荧光灯 EL7／书房顶灯 EL8／厨房节能灯 EL9／厕所顶灯 EL10／厕所射灯 EL11／
     卧室吊灯 EL12。配电盘上标着 L、N、PE
   - 检修单控开关（书 P136 提示说明原文）：**将单控开关从墙上卸下来，切断该线路总电源**，
     使用万用表**蜂鸣档**或**断开连接使用电阻档**测量开关内触头的通断。
     正常情况下，单控开关处于接通状态时蜂鸣器应发出蜂鸣声；处于断开状态时不响。
     **实际检测单控开关闭合状态下，内部触点无法接通（阻值为无穷大）**，
     说明开关内的触头出现故障，更换即可
   - 替换法（书 P136 正文）：书房顶灯 EL8 不亮，**断电后检查照明灯具无明显损坏情况，
     采用替换法更换灯内的节能灯管、辉光启动器等均无法排除故障**，才怀疑控制开关损坏
   - 公共照明故障树（书 P137 正文原话，屏 4 完全照它做）：
     **若全部无法点亮 → 检查主供电线路；主供电线路正常 → 查看路灯控制器；
     控制器正常 → 检查断路器；控制器和断路器都正常 → 检查供电线路；
     若支路中有一盏无法点亮 → 检查该照明路灯是否发生故障；
     路灯正常 → 检查支路供电线路；线路有故障 → 更换线路**
   - 检查主供电线路：**使用万用表在照明路灯 EL3 处检查线路中的电压，若无电压则说明
     主供电线缆有故障**；用交流电压档检测支路供电线路上的电压，
     **量程调至交流电压 500V 档**，**正常情况下万用表应能检测到 221V**（图 7-19）
   - 更换损坏部件：若供电线路正常但路灯仍无法点亮，**多为路灯本身异常**，
     **更换相同型号的路灯灯泡**即可排除故障（书 P138）

   **屏 2 的教学眼（自己提炼的，书上没明写但表里摆着）**：
   表 7-1 里有两种写法 —— 「闭合亮／断开灭」和「初始…按动后…」。
   **写法不同不是随手写的，是因为后者控制的是双控开关。**
   双控开关做的是换路、它从来不断开（7.1 讲过），所以它没有固定的「合」和「断」，
   只能说「按一下变成什么样」。**照着表验收时，这三对就是最容易验错的地方。** */
(function(){
'use strict';
ELEC.reg({
  id: '7.3',
  file: 'c7-3.html',
  title: '7.3 装完怎么验，坏了怎么查',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>通电之前</button>
    <button class="tab" data-i="1"><span class="n">2</span>通电调试</button>
    <button class="tab" data-i="2"><span class="n">3</span>一盏灯不亮</button>
    <button class="tab" data-i="3"><span class="n">4</span>公共照明</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">调试分两步，第一步不通电</div>
    书上把调试拆成<b>断电调试</b>和<b>通电调试</b>两方面。
    断电那一步不是走过场 —— <b>错接漏接、开关卡涩、灯具没固定牢，
    这三样通了电反而更难查</b>，而且带电查是拿命换。
    <b>点四个检查项各看一遍。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">① 对图纸</button>
        <button class="btn sm" data-k="1">② 按开关</button>
        <button class="btn sm" data-k="2">③ 看灯具</button>
        <button class="btn sm" data-k="3">④ 量通断</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">总断路器</div><div class="v" id="s1a">断开</div></div>
        <div class="num"><div class="k">这一步<br>查什么</div><div class="v" id="s1b">错接漏接</div></div>
        <div class="num hi"><div class="k">要不要<br>拿工具</div><div class="v" id="s1c">只要图纸</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">断电调试的三件事（书 P134~135 原文）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>查什么</th><th>怎么查</th><th>不查会怎样</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">错接<br>漏接</td>
          <td><b>根据电路图、接线图逐级检查</b>线路有无错接、漏接</td>
          <td>7.1 屏 4 那三种接错，<b>通了电也照样亮</b></td></tr>
        <tr><td class="eu-s">开关<br>动作</td>
          <td><b>按动各控制开关，检查开关动作是否灵活</b></td>
          <td>卡涩的开关装上墙才发现，要拆面板重来</td></tr>
        <tr><td class="eu-s">灯具<br>固定</td>
          <td><b>观察照明灯具安装是否到位，固定是否牢靠</b></td>
          <td>吊灯掉下来是伤人的事故</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>「断电」是指断开室内配电盘里那只照明断路器。</b>
      <span class="sub">通电调试那一步书上写得很明确：<b>闭合室内配电盘中的照明断路器，接通电源</b> ——
      反过来说，断电调试的整个过程它都是断开的。要卸开关下来量通断，
      光断开关不算，<b>必须切断该线路的总电源</b>（书 P136 原话）。</span>
    </div>
  </div>

  <div class="bet" data-bet="c73-off" data-q="装完想验一下开关有没有接反，哪一步能在不通电的情况下查出来？"
       data-opts="都查不出来，必须通电才知道|对照电路图和接线图逐级检查接线，这一步就能查出错接漏接|用验电笔点一下开关"
       data-right="1"
       data-after="对照图纸逐级检查。这是书上断电调试的第一件事，也是唯一能在通电前发现「接错了」的手段——因为 7.1 屏 4 讲过，三种典型接错里有两种通电后灯照样亮，光看灯亮不亮验不出来。至于验电笔：断了电它什么都不亮，查不了接线对错。"></div>
</section>

<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">照着表一条一条按过去</div>
    书上表 7-1 把这间房 <b>13 个开关、12 盏灯</b>逐条列了出来：
    按哪个开关、哪几盏灯该怎么变。<b>点画布上的任意一个开关，
    看它管的灯对不对得上表。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="nums three">
        <div class="num"><div class="k">刚按的</div><div class="v" id="s2a">—</div></div>
        <div class="num"><div class="k">亮着几盏</div><div class="v" id="s2b">0 / 12</div></div>
        <div class="num hi"><div class="k">这一路<br>是几控</div><div class="v" id="s2c">还没按</div></div>
      </div>
      <div class="btns"><button class="btn" id="s2r">↺ 全部关掉</button></div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">表 7-1 通电调试栏（书上原文照录）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>按动</th><th>书上写的状态</th><th>几控</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">SA1</td><td>闭合 EL1 亮；断开 EL1 灭</td><td>单控</td></tr>
        <tr><td class="eu-s">SA2</td><td><b>初始</b> EL2、EL3 亮，<b>按动后</b>灯灭</td><td class="rd">双控</td></tr>
        <tr><td class="eu-s">SA3</td><td><b>初始</b> EL2、EL3 灭，<b>按动后</b>灯亮</td><td class="rd">双控</td></tr>
        <tr><td class="eu-s">SA4</td><td><b>初始</b> EL4、EL5、EL6 灭，<b>按动后</b>灯亮</td><td class="rd">双控</td></tr>
        <tr><td class="eu-s">SA5</td><td><b>初始</b> EL4、EL5、EL6 亮，<b>按动后</b>灯灭</td><td class="rd">双控</td></tr>
        <tr><td class="eu-s">SA7</td><td>闭合 EL7 亮；断开 EL7 灭</td><td>单控</td></tr>
        <tr><td class="eu-s">SA8</td><td>闭合 EL8 亮；断开 EL8 灭</td><td>单控</td></tr>
        <tr><td class="eu-s">SA9</td><td>闭合 EL9 亮；断开 EL9 灭</td><td>单控</td></tr>
        <tr><td class="eu-s">SA10</td><td>闭合 EL10 亮；断开 EL10 灭</td><td>单控</td></tr>
        <tr><td class="eu-s">SA11</td><td>闭合 EL11 亮；断开 EL11 灭</td><td>单控</td></tr>
        <tr><td class="eu-s">SA12</td><td><b>初始</b> EL12 亮，<b>按动后</b>灯灭</td><td class="rd">双控</td></tr>
        <tr><td class="eu-s">SA13</td><td><b>初始</b> EL12 灭，<b>按动后</b>灯亮</td><td class="rd">双控</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>书上没有 SA6</b>，图 7-16 和表 7-1 里都跳过去了。
      <span class="sub">照着教材学的时候碰到这种跳号别慌，也别自己补一个 ——
      现场的图纸同样会有这种情况（改过设计、删掉过一个开关位）。
      <b>以图上实际画着的为准。</b></span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st good">表里两种写法，暴露了哪几个是双控</div>
    仔细看那张表：有的写<b>「闭合亮；断开灭」</b>，有的写<b>「初始…，按动后…」</b>。
    这不是随手写的两种说法 —— <b>后者控制的全是双控开关。</b>
    <div class="tip info">
      <b>因为双控开关做的是换路，它从来不断开</b>（7.1 屏 2 那句话）。
      <span class="sub">它没有固定的「合」位和「断」位，所以说不出「闭合亮」，
      只能说「按一下变成什么样」。<b>SA2/SA3、SA4/SA5、SA12/SA13 这三对，
      就是验收时最容易漏掉的地方</b> —— 单独按一个看着都正常，
      要两个交叉着按四种组合才验得完（7.1 屏 4 那种「少接一根联络线」，
      就只有一种组合会露馅）。</span>
    </div>
  </div>

  <div class="bet" data-bet="c73-tbl" data-q="表里 SA12 写「初始 EL12 亮，按动后灯灭」，SA13 写「初始 EL12 灭，按动后灯亮」。为什么同一盏灯的两条写反了？"
       data-opts="书上印错了|它俩是一对双控，表是按各自的初始位置写的——这一条正好说明卧室吊灯是两地控制|SA13 是备用开关"
       data-right="1"
       data-after="它俩是一对双控（卧室吊灯 EL12 两地控制）。表里记录的是「按这个开关之前灯是什么样、按完变成什么样」，而两个双控开关的初始位置本来就一个使灯亮、一个使灯灭。所以两条看着相反，其实说的是同一件事：任意一个开关都能改变这盏灯的状态——这正是双控的定义。"></div>
</section>

<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">先换最便宜、最容易换的那个</div>
    书上那个例子：书房顶灯 EL8 不亮。<b>断电 → 看灯具有没有明显损坏 →
    换灯管 → 换辉光启动器 → 都不行才怀疑开关。</b>
    这个顺序不是随便排的。<b>点每一步看它为什么排在这个位置。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">① 断电看</button>
        <button class="btn sm" data-k="1">② 换灯管</button>
        <button class="btn sm" data-k="2">③ 换启辉器</button>
        <button class="btn sm" data-k="3">④ 量开关</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这一步</div><div class="v" id="s3a">看外观</div></div>
        <div class="num"><div class="k">要不要<br>拿工具</div><div class="v" id="s3b">不用</div></div>
        <div class="num hi"><div class="k">表上读数</div><div class="v" id="s3c">—</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">量单控开关：书上写死的四句话（P136 提示说明）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>动作</th><th>书上原话</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">拆</td><td><b>将单控开关从墙上卸下来，切断该线路总电源</b></td></tr>
        <tr><td class="eu-s">量</td><td>使用万用表<b>蜂鸣档</b>，或<b>断开连接使用电阻档</b>测量开关内触头的通断</td></tr>
        <tr><td class="eu-s">好的</td><td>接通状态<b>蜂鸣器发出蜂鸣声</b>；断开状态<b>不响</b></td></tr>
        <tr><td class="eu-s">坏的</td><td>闭合状态下<b>内部触点无法接通（阻值为无穷大）</b> → 触头故障，更换</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>「切断该线路总电源」这五个字是这一段的重点，不是客套话。</b>
      <span class="sub">通断档和电阻档都要靠表内的电池往被测物送电（3.6b 讲过），
      <b>带电测电阻会把表打坏，量到的数也全是假的</b>。
      而且开关卸下来之后，两根线头就露在墙洞里 —— 只断开关不断总电源，
      那两个线头有一个是带电的。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st good">为什么是这个顺序：按「几分钟能排除掉」排</div>
    替换法排在前面，不是因为它更科学，是因为它<b>快、便宜、不用工具</b>。
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>步</th><th>要花的工夫</th><th>能排除掉什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">① 看</td><td>几十秒，不用工具</td><td>灯具烧黑、断裂、接头脱开</td></tr>
        <tr><td class="eu-s">② 换灯管</td><td>一两分钟</td><td>灯管本身寿命到了（最常见）</td></tr>
        <tr><td class="eu-s">③ 换启辉器</td><td>一两分钟</td><td>启辉器坏（荧光灯特有）</td></tr>
        <tr><td class="eu-s">④ 量开关</td><td>要断电、拆面板、拿表</td><td>开关内部触头</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>反过来做也能查出故障，但要多花十几倍工夫。</b>
      <span class="sub">现场排查的通用原则就是这条：<b>先排除掉容易排除的</b>。
      8.4「停电了怎么查」还会用同一条思路 —— 只不过到那儿变成了
      「先查同级线路」，一个道理：先看代价最小的那一步。</span>
    </div>
  </div>
</section>

<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">先看不亮的有几盏，路就分岔了</div>
    小区路灯报修，第一句话要问的不是「哪盏坏了」，是
    <b>「不亮的是全部、一整条、还是就那一盏」</b> ——
    这三种现象走的是完全不同的三条路。<b>选一种现象，一步一步走完。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4t">
        <button class="btn on sm" data-t="0">全部不亮</button>
        <button class="btn sm" data-t="1">一条支路不亮</button>
        <button class="btn sm" data-t="2">就一盏不亮</button>
      </div>
      <div class="btns">
        <button class="btn" id="s4p">‹ 上一步</button>
        <button class="btn go" id="s4n">下一步 ›</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">走到第几步</div><div class="v" id="s4a">1 / 4</div></div>
        <div class="num"><div class="k">现在查</div><div class="v" id="s4b">主供电线路</div></div>
        <div class="num hi"><div class="k">怎么查</div><div class="v" id="s4c">量电压</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">书 P137 那段话，拆成一棵树</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>现象</th><th>书上原话的排查顺序</th></tr></thead>
      <tbody>
        <tr><td class="eu-s"><b>全部</b><br>无法点亮</td>
          <td>检查<b>主供电线路</b> → 正常则查<b>路灯控制器</b> →
            控制器正常则查<b>断路器</b> → 都正常则查<b>供电线路</b></td></tr>
        <tr><td class="eu-s"><b>一盏</b><br>无法点亮</td>
          <td>检查<b>该照明路灯</b>是否发生故障 → 路灯正常则查<b>支路供电线路</b> →
            线路有故障则<b>更换线路</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>「一整条支路不亮」书上没单列，但它就在这两条中间。</b>
      <span class="sub">全部不亮 ⇒ 问题在所有路灯的公共部分（主线、控制器、断路器）；
      一盏不亮 ⇒ 问题在这盏灯自己或它那一小段线；
      <b>一整条不亮 ⇒ 问题在这条支路的公共部分</b> ——
      支路断路器、支路电缆。三条路的分岔逻辑是同一个：
      <b>不亮的范围有多大，故障就在多大范围的公共部分上。</b></span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">量电压的几个具体数（图 7-19 原文）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>项</th><th>书上写的</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">量哪</td><td>在照明路灯 <b>EL3 处</b>检查线路中的电压，<b>若无电压则说明主供电线缆有故障</b></td></tr>
        <tr><td class="eu-s">档位</td><td>将万用表的量程调至<b>交流电压 500 V 档</b></td></tr>
        <tr><td class="eu-s">读数</td><td>正常情况下万用表应能检测到 <b>221 V</b></td></tr>
        <tr><td class="eu-s">表笔</td><td>将红、黑表笔分别搭在路灯 EL3 的<b>供电引接端</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>221 V 是书上那次实测的读数，不是标准值。</b>
      <span class="sub">220 V 的线路量到 215~230 都算正常，供电电压本来就在波动。
      这一步要判的是<b>「有没有电」</b>，不是「是不是刚好 220」——
      量到 0 V 才是结论（这一段断了），量到 221 只说明电送到这儿了。
      为什么选 500 V 档而不是 200 V 档：<b>220 V 超过 200 V 档的量程</b>，
      3.6a 屏 4 讲过。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="7.3">
    <div class="qz" data-q="线路装完，通电前的断电调试要做哪三件事？"
      data-opts="量绝缘、量导通、量电压|对照电路图和接线图查有无错接漏接；按动各控制开关看动作是否灵活；观察灯具安装是否到位、固定是否牢靠|只要看灯具装牢了就行"
      data-right="1"
      data-why="书上原文写死的三件：①根据电路图、接线图逐级检查线路有无错接、漏接；②按动各控制开关，检查开关动作是否灵活；③观察照明灯具安装是否到位，固定是否牢靠。这三件的共同点是——都不需要通电，而且通了电以后反而更难查、更危险。"></div>
    <div class="qz" data-q="表 7-1 里，为什么有的开关写「闭合亮；断开灭」，有的写「初始…，按动后…」？"
      data-opts="书上写得不统一，没什么讲究|写「初始…按动后…」的那几个是双控开关——它做的是换路，没有固定的「合」位和「断」位，所以只能说按一下变成什么样|后一种是声控开关"
      data-right="1"
      data-why="双控开关从来不断开，它做的是换路（7.1 屏 2）。所以它没有「闭合」这个固定状态，说不出「闭合亮」，只能记录「按之前什么样、按之后什么样」。表 7-1 里 SA2/SA3、SA4/SA5、SA12/SA13 这三对全是这种写法——反过来，看到这种写法就知道那是一对双控。"></div>
    <div class="qz" data-q="用万用表通断档量单控开关，为什么必须先切断该线路的总电源？"
      data-opts="怕开关烧掉|通断档和电阻档要靠表内电池往被测物送电，带电测会打坏表、读数也是假的；而且开关卸下来后墙洞里那两个线头有一个是带电的|规定要求，没有实际原因"
      data-right="1"
      data-why="两个理由都是实打实的。一是 3.6b 讲过的：电阻/通断档靠表内电池工作，外面来的电压会把它打坏，量到的数也没有意义。二是安全：开关一卸下来，接线盒里的相线线头就裸露在墙洞里——只把开关拨到断开位置，那个线头照样带电。书上原话是「将单控开关从墙上卸下来，切断该线路总电源」。"></div>
    <div class="qz" data-q="小区路灯报修，到现场看到一整条路的路灯全不亮，另外几条路正常。最该先查什么？"
      data-opts="挨盏检查这条路上的每一个灯泡|这条支路的公共部分——支路断路器和支路电缆|路灯控制器"
      data-right="1"
      data-why="不亮的范围有多大，故障就在多大范围的公共部分上。整条支路不亮、别的支路正常，说明主供电、控制器、总断路器全都正常（否则别的支路也该黑），问题必然在这条支路自己的公共部分：它的断路器和它的电缆。挨盏查灯泡是把范围搞反了——十几盏灯同时坏的概率远低于一个断路器跳闸。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 7 章 7.3 节（书内 P134~P138）</div>
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
/* 断路器：一段引线 + 动触点臂 + 固定触点上一个 ×（4.1 那个 qfSym 的简版，竖着画） */
function qfSym(g, x, y, on){
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.6; g.lineJoin = 'round'; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x, y - 17); g.lineTo(x, y - 11); g.stroke();
  g.beginPath(); g.moveTo(x, y + 11); g.lineTo(x, y + 17); g.stroke();
  g.beginPath();
  g.moveTo(x, y - 11);
  if(on) g.lineTo(x, y + 11); else g.lineTo(x + 9, y + 10);
  g.stroke();
  /* × 是断路器的记号，不是指示灯 —— 一律墨色。
     合闸／断开只靠动触点臂的角度表达（「开关状态只靠机械结构」那条规矩） */
  g.strokeStyle = P.ink; g.lineWidth = 1.5;
  g.beginPath();
  g.moveTo(x - 4, y + 7); g.lineTo(x + 4, y + 15);
  g.moveTo(x + 4, y + 7); g.lineTo(x - 4, y + 15);
  g.stroke(); g.restore();
}

/* ================================================================
   场景 1：通电之前
   ================================================================
   一面墙 + 配电盘（断路器断开）+ 一个开关 + 一盏灯，
   四个检查项各自高亮图上不同的位置。**总断路器全程画成断开的** ——
   这一屏的全部前提就是「还没通电」*/
const S1 = { k:0 };
const PANEL = [30, 62, 62, 78];          /* 配电盘 x,y,w,h */
const SW1 = [176, 150];                  /* 开关中心 */
const LAMP1 = [292, 96];                 /* 灯中心 */
function draw1(){
  const g = st1.g; st1.clear();
  const k = S1.k;
  EP.heading(g, 14, 20, '通电之前', '总断路器全程断开');

  /* 墙与地 */
  seg(g, [[14, 214],[346, 214]], C.boxLine, 2.4);
  txt(g, '地面', 340, 206, {sz:8.5, c:C.tx3, al:'right'});

  /* 配电盘 */
  box(g, PANEL[0], PANEL[1], PANEL[2], PANEL[3], 5, C.box, C.boxLine, 1.4);
  qfSym(g, PANEL[0] + 31, PANEL[1] + 40, false);
  txt(g, '配电盘', PANEL[0] + 31, PANEL[1] - 9, {sz:9, b:1, c:C.tx3});
  EP.chip(g, '照明断路器　断开', PANEL[0] + 31, PANEL[1] + PANEL[3] + 12,
          {sz:8.5, b:1, c:C.err});

  /* 导线：配电盘 → 开关 → 灯（没电，全程灰） */
  const wc = C.wire;
  seg(g, [[PANEL[0]+31, PANEL[1]], [PANEL[0]+31, 40], [SW1[0], 40], [SW1[0], SW1[1]-14]], wc, 2.4);
  seg(g, [[SW1[0], SW1[1]+14], [SW1[0], 190], [LAMP1[0], 190], [LAMP1[0], LAMP1[1]+16]], wc, 2.4);

  /* 开关 */
  box(g, SW1[0]-13, SW1[1]-14, 26, 28, 4, P.cream, P.creamD, 1.3);
  box(g, SW1[0]-6, SW1[1]-8, 12, 16, 2, P.creamD, P.steelD, 0.9);
  /* 放开关正下方会被那根竖导线从字中间穿过去（老坑），挪到左边 */
  txt(g, 'SA', SW1[0] - 20, SW1[1] + 4, {sz:9, b:1, c:C.tx3, al:'right'});

  /* 灯（一律不亮） */
  EP.lampHolder(g, LAMP1[0], LAMP1[1] + 16, 22, 9);
  EP.bulb(g, LAMP1[0], LAMP1[1], 15, 0, {});
  txt(g, 'EL', LAMP1[0] + 26, LAMP1[1], {sz:9, b:1, c:C.tx3, al:'left'});

  /* 这一步查哪儿 */
  if(k === 0){
    /* 对图纸：整条线路都圈起来 */
    g.save(); g.setLineDash([5,4]); g.strokeStyle = C.acc; g.lineWidth = 1.3;
    g.strokeRect(20, 30, 316, 176); g.restore();
    /* 放 178 会压住 heading 的副标题「总断路器全程断开」，挪到右边空地 */
    EP.chip(g, '整条线路逐级对图', 258, 24, {sz:9, b:1, c:C.acc});
  }
  if(k === 1) hot(g, SW1[0], SW1[1], 0, {w:44, h:46, r:8});
  if(k === 2) hot(g, LAMP1[0], LAMP1[1] + 6, 0, {w:52, h:60, r:10});
  if(k === 3){
    /* 量通断：开关卸下来了，两个线头露在墙洞里 */
    box(g, SW1[0]-15, SW1[1]-16, 30, 32, 4, C.errbg, C.err, 1.3);
    txt(g, '卸', SW1[0], SW1[1], {sz:10, b:1, c:C.err});
    dot(g, SW1[0], SW1[1]-14, C.L, 3.6);
    dot(g, SW1[0], SW1[1]+14, C.wireL, 3.4);
    EP.chip(g, '这个线头带电', SW1[0] + 4, SW1[1] - 30, {sz:8.5, b:1, c:C.err, al:'left'});
    hot(g, PANEL[0] + 31, PANEL[1] + 40, 0, {w:50, h:52, r:9});
  }

  const CC = [
    ['acc', '拿着图纸，一段一段对过去', '错接漏接只有这一步查得出来 —— 通了电灯照样会亮'],
    ['acc', '每个开关都按一遍，手感要干脆', '卡涩的开关等装上墙才发现，就要拆面板重来'],
    ['acc', '每盏灯都推一推、看一看', '书上原话：安装是否到位，固定是否牢靠'],
    ['err', '要量通断，先切断该线路总电源', '开关一卸下来，墙洞里那个相线线头就露着']
  ][k];
  conc(g, 226, CC[0], CC[1], CC[2]);
}
function note1(){
  const T = [
    ['看图纸，不看墙', '错接、漏接',  '只要图纸',
     '书上第一句就是<b>「根据电路图、接线图逐级检查线路有无错接、漏接等情况」</b>。' +
     '这一步不需要任何工具，也不需要通电，可它是<b>唯一能在通电前发现接错的手段</b>。' +
     '<hr>为什么非它不可：7.1 屏 4 那三种典型接错里，' +
     '<b>「相线零线各进一个开关」和「开关串在零线上」通了电灯都照样亮</b> —— ' +
     '光看灯亮不亮，这两种永远验不出来。<b>灯亮不等于接对了。</b>'],
    ['按每一个开关', '开关灵不灵活', '不用',
     '书上原话：<b>按动照明线路中各控制开关，检查开关动作是否灵活</b>。' +
     '手感应该是干脆的一声「咔」，中间不该有滞涩、卡顿、回弹不到位。' +
     '<hr>这一步排在通电前，理由很实际：<b>开关这会儿还没上墙、或者面板还没扣死</b>，' +
     '发现问题换一只就完了；等装完通了电才发现按不动，' +
     '得断电、拆护板、拆底座重来一遍。'],
    ['推一推每盏灯', '装牢没有', '不用',
     '书上原话：<b>观察照明灯具安装是否到位，固定是否牢靠</b>。' +
     '<hr>前一条是「好不好用」，这一条是<b>安全</b>：' +
     '吊灯、吸顶灯掉下来是会砸伤人的事故。7.2 屏 3 讲吸顶灯时说过' +
     '<b>钻孔个数一般不少于三个</b>，就是为了这一刻能推得动、晃不动。'],
    ['要拿表了，先断总电源', '触头通不通', '表 + 螺丝刀',
     '这是四步里唯一要动工具的。书上原话：<b>将单控开关从墙上卸下来，切断该线路总电源</b>，' +
     '然后用<b>蜂鸣档</b>（或断开连接用<b>电阻档</b>）量开关内触头的通断。' +
     '<hr><b>「切断该线路总电源」不是客套话，有两个实打实的理由：</b>' +
     '① 通断档和电阻档靠表内电池往被测物送电（3.6b），带电量会把表打坏、读数也是假的；' +
     '② 开关一卸下来，接线盒里那两个线头就露在墙洞里，<b>其中一个是相线</b>。'
    ]
  ][S1.k];
  $('s1a').textContent = '断开';
  $('s1b').textContent = T[1];
  $('s1c').textContent = T[2];
  $('n0').innerHTML = '<div class="st">' + T[0] + '</div>' + T[3];
}

/* ================================================================
   场景 2：通电调试 —— 表 7-1 那间房
   ================================================================
   九行 = 图 7-16 里的九路照明。**开关名的排列跟书上图一致**
   （客厅那两路图上是 SA3 在前 SA2 在后），别按数字大小重排。
   双控那三对画成「两个开关 + 中间一条联动短横线」，
   点其中任意一个都翻转这一路 —— 这就是双控的定义 */
const ROWS = [
  {room:'玄关',     sw:['SA1'],         el:'EL1',           n:'节能灯'},
  {room:'客厅吊灯', sw:['SA3','SA2'],   el:'EL2 EL3',       n:'吊灯',   dual:1},
  {room:'客厅射灯', sw:['SA5','SA4'],   el:'EL4 EL5 EL6',   n:'射灯',   dual:1},
  {room:'阳台',     sw:['SA7'],         el:'EL7',           n:'荧光灯'},
  {room:'书房',     sw:['SA8'],         el:'EL8',           n:'顶灯'},
  {room:'厨房',     sw:['SA9'],         el:'EL9',           n:'节能灯'},
  {room:'厕所顶灯', sw:['SA10'],        el:'EL10',          n:'顶灯'},
  {room:'厕所射灯', sw:['SA11'],        el:'EL11',          n:'射灯'},
  {room:'卧室',     sw:['SA13','SA12'], el:'EL12',          n:'吊灯',   dual:1}
];
const NLAMP = [1,2,3,1,1,1,1,1,1];        /* 每一路管几盏，加起来 12 */
const RY0 = 46, RDY = 26;
const S2 = { on: ROWS.map(function(){ return false; }), last:-1, lastSw:'' };
function rowY(i){ return RY0 + i*RDY; }
function swX(r, j){ return r.dual ? (j ? 104 : 76) : 88; }
function lit2(){
  let n = 0;
  S2.on.forEach(function(v, i){ if(v) n += NLAMP[i]; });
  return n;
}
function draw2(){
  const g = st2.g; st2.clear();
  EP.heading(g, 14, 20, '照着表按一遍', '13 个开关　12 盏灯');

  ROWS.forEach(function(r, i){
    const y = rowY(i), on = S2.on[i], sel = S2.last === i;
    if(sel){ box(g, 10, y - 12, 340, 24, 5, C.accbg, null, 0); }
    txt(g, r.room, 14, y, {sz:8.5, b:1, c: sel ? C.acc : C.tx3, al:'left'});

    /* 开关 */
    r.sw.forEach(function(nm, j){
      const x = swX(r, j);
      /* 宽 22 不是 18：SA10/SA11/SA12/SA13 是四个字符，18 塞不下（截图抓到的） */
      box(g, x - 11, y - 8, 22, 16, 3, P.cream, r.dual ? C.acc : P.creamD, r.dual ? 1.3 : 1);
      txt(g, nm, x, y, {sz: nm.length > 3 ? 7 : 7.5, b:1, c:P.bakelite});
    });
    if(r.dual){ seg(g, [[87, y],[93, y]], C.acc, 1.2); }

    /* 连线 —— 通了才有颜色 */
    const x0 = r.dual ? 115 : 99;
    seg(g, [[x0, y],[214, y]], on ? C.L : C.wire, on ? 2.2 : 1.6);

    /* 灯 */
    g.save();
    g.fillStyle = on ? C.lamp : C.lampOff;
    g.strokeStyle = on ? C.lamp : C.boxLine; g.lineWidth = 1.2;
    g.beginPath(); g.arc(228, y, 6.5, 0, Math.PI*2); g.fill(); g.stroke();
    if(on){ g.globalAlpha = .22; g.beginPath(); g.arc(228, y, 12, 0, Math.PI*2); g.fill(); }
    g.restore();
    txt(g, r.el, 242, y, {sz:8.5, c: on ? C.tx2 : C.tx3, al:'left'});
    txt(g, on ? '亮' : '灭', 344, y, {sz:9, b:1, c: on ? C.warn : C.tx3, al:'right'});
  });

  const n = lit2();
  if(S2.last < 0){
    conc(g, 266, 'acc', '点任意一个开关', '带蓝框、中间有连杆的那三对是双控');
  } else {
    const r = ROWS[S2.last];
    conc(g, 266, r.dual ? 'ok' : 'acc',
      '按了 ' + S2.lastSw + '　' + r.room + (S2.on[S2.last] ? ' 亮了' : ' 灭了'),
      r.dual ? '这一路是双控：另一个开关也能改变它' : '单控：闭合亮、断开灭，一句话说完');
  }
  txt(g, '亮着 ' + n + ' / 12 盏', 344, 30, {sz:9, b:1, c:C.tx3, al:'right'});
}
function note2(){
  $('s2a').textContent = S2.lastSw || '—';
  $('s2b').textContent = lit2() + ' / 12';
  $('s2c').textContent = S2.last < 0 ? '还没按' : (ROWS[S2.last].dual ? '双控' : '单控');
  if(S2.last < 0){
    $('n1').innerHTML = '<div class="st">先看一眼画布上哪几路带蓝框</div>' +
      '九路照明里有<b>三路是双控</b>（客厅吊灯、客厅射灯、卧室吊灯），' +
      '画成了两个开关中间连一根短杆。<b>点它们中的任意一个，这一路都会翻转</b> —— ' +
      '这就是双控的定义，也是 7.1 屏 2 那句「双控开关做的是换路」的直接后果。' +
      '<hr>其余六路是单控，一个开关管一路。' +
      '<b>先随便按几个，再回头看下面那张表 7-1，两种写法的分别就跳出来了。</b>';
    return;
  }
  const r = ROWS[S2.last], on = S2.on[S2.last];
  let h = '<div class="st">' + S2.lastSw + '　' + r.room + '（' + r.el + '）</div>';
  if(r.dual){
    /* 书上写的方向和屏幕上未必一致 —— 那正是这一路值得讲的地方，
       别把它当成对不上的 bug 遮过去 */
    const bookOn = S2.lastSw !== r.sw[0];      /* 表里这一条的「初始」是亮还是灭 */
    h += '书上表 7-1 里这一路是这么写的：<b>「初始 ' + r.el.replace(/ /g, '、') +
      (bookOn ? ' 亮，按动后灯灭」' : ' 灭，按动后灯亮」') + '</b>。' +
      '<hr><b>注意它没说「闭合亮、断开灭」</b> —— 因为双控开关根本没有「闭合」和「断开」' +
      '这两个固定位置，它做的是<b>换路</b>：把相线从一条联络线甩到另一条上，' +
      '它自己从来不断开（7.1 屏 2）。所以表里只能记「按之前什么样、按之后什么样」。';
    if(bookOn !== !on){
      h += '<hr><b>你刚才按出来的方向，跟表里那一条正好相反</b>（屏幕上是' +
        (on ? '灭 → 亮' : '亮 → 灭') + '，表里写的是' + (bookOn ? '亮 → 灭' : '灭 → 亮') + '）。' +
        '<b>这不是对不上，恰恰是双控的要害：</b>那个「初始」不是这盏灯的固定属性，' +
        '它取决于<b>另一个开关这会儿在哪一边</b>。' +
        '书上记的是那一次调试时的实际情况，换个人按、换个顺序按，两栏就会调过来。' +
        '<span class="sub">单控就没有这个问题 —— 它的「闭合」和「断开」是写死在开关上的。</span>';
    }
    h += '<hr><b>所以验收这一路要按四种组合，不是两种。</b>' +
      '两个开关各有两个位置，组合起来四种，' +
      '<b>四种全对才算接对了</b> —— 7.1 屏 4 那种「少接一根联络线」的接错，' +
      '四种组合里有三种表现正常，只有一种露馅。';
  } else {
    h += '书上表 7-1 里这一路是这么写的：<b>「闭合 ' + r.el + ' 亮；断开 ' + r.el + ' 灭」</b>。' +
      '一句话说完，因为它是单控 —— 开关有明确的合位和断位。' +
      '<hr>现在这一路是<b>' + (on ? '亮' : '灭') + '</b>的。' +
      '验收时对着表逐条按过去，<b>对不上的那一条就是接线出了问题</b>：' +
      '按了没反应 ⇒ 这一路断了（或开关坏）；按了别的灯亮 ⇒ 接串了；' +
      '一直亮着按不灭 ⇒ 开关没接在相线上、或者被短接了。';
  }
  $('n1').innerHTML = h;
}

/* ================================================================
   场景 3：一盏灯不亮 —— 替换法排在前面，量表排在最后
   ================================================================
   书上那个例子：书房顶灯 EL8。一具荧光灯（灯管 + 启辉器 + 灯座）+ 墙上的 SA8。
   第 ④ 步开关被卸下来接到表上，**表笔线不许跨过灯具** —— 表画在右下角，
   开关也在右侧，两条软线一直往右走 */
const S3 = { k:0 };
const TUBE = [92, 84, 236, 22];          /* 灯管 x,y,w,h */
const STA  = [200, 122];                 /* 启辉器 */
const SW3  = [292, 176];                 /* 开关 SA8 */
function draw3(){
  const g = st3.g; st3.clear();
  const k = S3.k;
  EP.heading(g, 14, 20, k === 3 ? '④ 量开关' : '一盏灯不亮',
             k === 3 ? '开关已卸下　灯具这一步不画' : '书房顶灯 EL8');

  /* 第 ④ 步只画「卸下来的开关 + 表」：灯具在前三步已经排除掉了，
     再画着它，表笔那条横线必然从灯具框里穿过去（截图抓到的） */
  if(k === 3){ draw3meter(g); return; }

  /* 天花板 */
  seg(g, [[14, 52],[346, 52]], C.boxLine, 2.2);
  txt(g, '天花板', 340, 44, {sz:8.5, c:C.tx3, al:'right'});

  /* 灯具支架 */
  box(g, TUBE[0] - 10, TUBE[1] - 12, TUBE[2] + 20, TUBE[3] + 46, 5, C.box, C.boxLine, 1.3);
  seg(g, [[TUBE[0]+40, 52],[TUBE[0]+40, TUBE[1]-12]], C.wire, 2);
  seg(g, [[TUBE[0]+180, 52],[TUBE[0]+180, TUBE[1]-12]], C.wire, 2);

  /* 灯管 —— 全程不亮（这一屏讲的就是它不亮） */
  g.save();
  g.fillStyle = k === 1 ? C.warnbg : C.box;
  g.strokeStyle = k === 1 ? C.warn : C.boxLine; g.lineWidth = 1.4;
  EP.rr(g, TUBE[0], TUBE[1], TUBE[2], TUBE[3], 11); g.fill(); g.stroke();
  g.restore();
  box(g, TUBE[0]-6, TUBE[1]+3, 10, TUBE[3]-6, 2, P.steel, P.steelD, 1);
  box(g, TUBE[0]+TUBE[2]-4, TUBE[1]+3, 10, TUBE[3]-6, 2, P.steel, P.steelD, 1);
  txt(g, '灯管', TUBE[0] + 46, TUBE[1] + TUBE[3]/2, {sz:9, b:1, c:C.tx3});

  /* 启辉器 */
  g.save();
  g.fillStyle = k === 2 ? C.warnbg : C.box;
  g.strokeStyle = k === 2 ? C.warn : C.boxLine; g.lineWidth = 1.4;
  EP.rr(g, STA[0]-11, STA[1]-11, 22, 22, 4); g.fill(); g.stroke(); g.restore();
  txt(g, '启辉器', STA[0] + 18, STA[1], {sz:8.5, c:C.tx3, al:'left'});

  /* 墙上的开关 */
  box(g, SW3[0]-13, SW3[1]-14, 26, 28, 4, P.cream, P.creamD, 1.3);
  box(g, SW3[0]-6, SW3[1]-8, 12, 16, 2, P.creamD, P.steelD, 0.9);
  txt(g, 'SA8', SW3[0], SW3[1] + 26, {sz:9, b:1, c:C.tx3});
  seg(g, [[TUBE[0]+180, TUBE[1]+TUBE[3]+34],[SW3[0], TUBE[1]+TUBE[3]+34],
          [SW3[0], SW3[1]-14]], C.wire, 2.2);

  if(k === 0){
    g.save(); g.setLineDash([5,4]); g.strokeStyle = C.acc; g.lineWidth = 1.3;
    g.strokeRect(TUBE[0]-16, TUBE[1]-18, TUBE[2]+32, TUBE[3]+58); g.restore();
    EP.chip(g, '烧黑？断裂？接头脱开？', 178, TUBE[1] + TUBE[3] + 48, {sz:9, b:1, c:C.acc});
  }
  if(k === 1 || k === 2){
    const t = k === 1 ? [TUBE[0]+TUBE[2]/2, TUBE[1]-24] : [STA[0], STA[1]-30];
    EC.head(g, t[0], t[1] + 14, 0, 1, 6, C.warn);
    EP.chip(g, '换一个试试', t[0], t[1], {sz:9, b:1, c:C.warn});
  }

  const CC = [
    ['acc', '断电，先用眼睛看一遍', '烧黑、断裂、接头脱开 —— 几十秒，不用任何工具'],
    ['acc', '换一根同规格的灯管', '灯管寿命到了是最常见的一种，一两分钟就排除掉'],
    ['acc', '换一个启辉器', '荧光灯特有的一件小东西，同样一两分钟'],
    ['err', '前面都排除掉了，才轮到量开关', '要断电、拆面板、拿表 —— 代价最大的放最后']
  ][k];
  conc(g, 232, CC[0], CC[1], CC[2]);
}
/* ④ 量开关：只有卸下来的开关和表。开关在左、表在右下，
   两条软线一路往右走，中间没有别的东西挡着 */
function draw3meter(g){
  const bx = 116, by = 146;
  box(g, bx-27, by-21, 54, 42, 5, P.cream, P.creamD, 1.4);
  box(g, bx-8, by-12, 16, 24, 3, P.creamD, P.steelD, 1);
  txt(g, 'SA8', bx, by + 32, {sz:9, b:1, c:C.tx3});
  /* chip 放开关下方会被黑表笔那条横线压住（截图抓到的）；
     上方那一片是空的（红线在 y=60，开关顶在 125） */
  EP.chip(g, '已卸下　该线路总电源已切断', bx, by - 42, {sz:8.5, b:1, c:C.ok});
  const t1 = [bx - 27, by], t2 = [bx + 27, by];
  dot(g, t1[0], t1[1], P.steelD, 3.4);
  dot(g, t2[0], t2[1], P.steelD, 3.4);
  const M = EP.meterUnit(g, 238, 92, 100, 82,
    {mode:'通断', reading:'OL', rsz:15, jacks:[{n:'COM'},{n:'VΩ', red:1}]});
  EP.leads(g, M[1], M[0], t2[0], t1[0], {yTop:60, yBot:206, tipY:by});
  EP.probe(g, t2[0], t2[1], -0.6, true);
  EP.probe(g, t1[0], t1[1], -2.5, false);
  conc(g, 232, 'err', '闭合状态下不响、阻值无穷大',
       '⇒ 开关内部触头坏了，换一只同规格的');
}
function note3(){
  const T = [
    ['① 断电，用眼睛看', '看外观', '不用', '—',
     '书上原话：<b>断电后检查照明灯具无明显损坏情况</b>。' +
     '看什么：<b>灯管两端有没有发黑</b>（荧光灯寿命将尽的典型样子）、' +
     '玻璃有没有裂、<b>灯座的两个接头有没有松脱或烧痕</b>、支架里的线有没有断。' +
     '<hr>这一步几十秒，不用工具，却能一眼定掉相当一部分故障。' +
     '<b>「断电」是前提</b> —— 手要伸进灯具里去摸接头。'],
    ['② 换一根灯管', '换灯管', '不用', '—',
     '书上原话：<b>采用替换法更换灯内的节能灯管</b>。' +
     '<hr><b>为什么排第二：灯管坏是这类故障里概率最高的一种</b>，' +
     '而换它只要一两分钟、成本几块钱、不需要任何仪表。' +
     '换上一根<b>确认是好的</b>灯管，亮了就结束了 —— 连故障原因都不用推理。' +
     '<span class="sub">替换法的唯一要求：拿来换的那个必须是好的。' +
     '拿另一个也坏了的去换，会把你引到完全错误的方向上。</span>'],
    ['③ 换启辉器', '换启辉器', '不用', '—',
     '书上原话里跟灯管并列的是<b>辉光启动器</b>（就是启辉器，那个小圆罐）。' +
     '它是传统荧光灯启动电路里的一件消耗品，坏了的典型表现是' +
     '<b>灯管两头一闪一闪就是不亮</b>。' +
     '<hr>同样是一两分钟、几块钱的事，所以排在量表之前。' +
     '<span class="sub">现在的 LED 灯管（7.2 屏 3 装的那种）没有启辉器，' +
     '这一步跳过 —— 换 LED 灯管本身就是第 ② 步。</span>'],
    ['④ 量开关内部触头', '量通断', '表 + 螺丝刀', 'OL 无穷大',
     '前三步都排除掉了，才轮到怀疑开关。书上原话：' +
     '<b>将单控开关从墙上卸下来，切断该线路总电源</b>，' +
     '用<b>蜂鸣档</b>（或断开连接用<b>电阻档</b>）量开关内触头的通断。' +
     '<hr><b>判据（书上写死的）：</b>' +
     '正常时接通状态<b>蜂鸣器发出蜂鸣声</b>、断开状态<b>不响</b>；' +
     '书上那次实际检测<b>闭合状态下内部触点无法接通（阻值为无穷大）</b>，' +
     '说明触头坏了，<b>更换同规格开关</b>即可排除故障。' +
     '<hr><b>拨到闭合位却不响，才是「开关坏了」的结论。</b>' +
     '别忘了先把两个位置都试一遍 —— 断开位不响是正常的，' +
     '只测了断开位就下结论会把好开关当坏的换掉。']
  ][S3.k];
  $('s3a').textContent = T[1];
  $('s3b').textContent = T[2];
  $('s3c').textContent = T[3];
  $('n2').innerHTML = '<div class="st">' + T[0] + '</div>' + T[4];
}

/* ================================================================
   场景 4：公共照明的故障树
   ================================================================
   一个路灯控制箱（控制器 + 断路器）→ 主供电线缆 → 三条支路，每条三盏。
   三种现象各走一条排查链，当前这一步在图上套 hot 环。
   **不亮的灯画成灰的、亮的画暖黄** —— 一眼看出「不亮的范围有多大」*/
const COL = [124, 214, 304];              /* 三条支路的 x */
const LY  = [154, 190, 226];              /* 每条支路三盏灯的 y */
const MAINY = 90;                         /* 主供电线缆 */
const S4 = { t:0, i:0 };
const TREE = [
  { name:'全部不亮', dead:'all', steps:[
    ['主供电线路', '量电压', 'main',
     '书上第一步就是它：<b>若全部无法点亮，应当检查主供电线路是否有故障</b>。' +
     '<hr>怎么查（图 7-19 原文）：<b>使用万用表在照明路灯 EL3 处检查线路中的电压</b>，' +
     '量程调到<b>交流电压 500 V 档</b>，红黑表笔分别搭在该路灯的<b>供电引接端</b>。' +
     '正常应能量到 <b>221 V</b>；<b>若无电压，则说明主供电线缆有故障</b>。' +
     '<span class="sub">为什么从最远那一盏量起：量到有电，说明整条主线都是通的，' +
     '一步就把最长的那一段排除掉了。</span>'],
    ['路灯控制器', '看指示、试手动', 'ctrl',
     '主供电正常，往回走一级：<b>当主供电线路正常时，应当查看路灯控制器是否有故障</b>。' +
     '<hr>路灯控制器就是 7.1 屏 4 提过的那个东西 —— <b>光控（探头装在配电柜侧面）' +
     '或时控</b>，天黑了它闭合、天亮了它断开。' +
     '<b>它坏在断开状态，全部路灯就都不亮</b>，而线路本身一点毛病没有。' +
     '<span class="sub">现场快速判断：控制器一般有手动/自动切换，' +
     '<b>切到手动强制合闸，灯亮了就是控制器（或它的探头）的问题</b>。</span>'],
    ['断路器', '看有没有跳、量出线端', 'qf',
     '<b>若路灯控制器正常，应当检查断路器是否正常。</b>' +
     '<hr>两件事一起看：<b>手柄在不在合闸位</b>（跳了就是它保护动作了，' +
     '要先找原因再送电，别反复合闸），以及<b>合着但出线端没电</b>' +
     '（触点烧蚀接触不良，5.2 讲过怎么量）。' +
     '<span class="sub"><b>跳闸和坏掉是两回事</b>：跳了说明下游有过载或短路，' +
     '故障不在断路器身上；合着却没电才是断路器自己坏了。</span>'],
    ['供电线路', '分段量电压', 'cable',
     '<b>若路灯控制器和断路器都正常，应当检查供电线路是否有故障。</b>' +
     '前面三步把「电源侧」全排除掉了，剩下的只能是线本身。' +
     '<hr>查法就是 3.6b 屏 4 那个<b>电压降法</b>：' +
     '从控制箱出线端往外，一段一段量电压，' +
     '<b>电压掉在哪一段，断点就在那一段</b>。' +
     '室外埋地电缆常见的断点在<b>接头处和穿路管口</b>。']
  ]},
  { name:'一条支路不亮', dead:'br', steps:[
    ['先确认别的支路正常', '用眼睛看', 'other',
     '<b>这一条书上没单列，它在「全部不亮」和「一盏不亮」中间。</b>' +
     '但第一步是白送的：<b>别的支路还亮着</b>，就说明主供电线缆、路灯控制器、' +
     '总断路器<b>全都是好的</b> —— 它们要是坏了，别的支路也该跟着黑。' +
     '<hr><b>一步排除掉三个部件，而且只用眼睛。</b>' +
     '这就是为什么到现场先问「不亮的有几盏」：' +
     '范围本身就是最便宜的诊断信息。'],
    ['这条支路的断路器', '看有没有跳', 'brqf',
     '范围锁定在「这条支路的公共部分」，先看它的<b>支路断路器</b>。' +
     '<hr>整条支路同时不亮，最常见的原因就是<b>它的支路断路器跳了</b> ——' +
     '这条线上某一处对地短路、或者进水受潮引起漏电。' +
     '<span class="sub"><b>合上去又立刻跳，别硬合第三次。</b>' +
     '那说明故障还在，反复合闸是在拿触点和电缆去试短路电流。</span>'],
    ['这条支路的电缆', '分段量电压', 'brcable',
     '断路器合着、出线端有电，那问题只剩这条支路自己的电缆了。' +
     '<hr>同样用<b>电压降法</b>：沿这条支路一盏一盏往外量，' +
     '<b>从有电的那一盏到没电的那一盏，断点就在这两盏之间的那一段</b>。' +
     '<span class="sub">室外支路电缆最容易断在<b>灯杆底部的接线仓</b>里 ——' +
     '那儿容易进水、接头容易锈蚀，正是 6.4 讲绝缘恢复时说的那种场合。</span>']
  ]},
  { name:'就一盏不亮', dead:'one', steps:[
    ['这盏路灯本身', '换个灯泡试试', 'lamp',
     '书上原话：<b>若照明支路中有一盏照明路灯无法点亮，应当检查该照明路灯是否发生故障。</b>' +
     '<hr>同一条支路上别的灯都亮着 ⇒ 电送到这一带了 ⇒ ' +
     '<b>问题跑不出这盏灯自己和它那一小段引线</b>。' +
     '先用最便宜的一步：<b>更换相同型号的路灯灯泡</b>（书 P138 原话）。' +
     '<span class="sub">这跟屏 3 那个「先换灯管」是同一条原则 ——' +
     '先排除掉容易排除的。</span>'],
    ['它那一小段支路线', '量灯座上有没有电', 'onecable',
     '<b>若照明路灯正常，应当检查支路供电线路是否有故障。</b>' +
     '<hr>换了灯泡还不亮，就把表搭到<b>这盏灯的供电引接端</b>上量：' +
     '<b>量到 220 V ⇒ 电送到了，灯具本体（灯座、镇流器、内部接线）坏了；' +
     '量到 0 V ⇒ 是从上一盏到这一盏的那段线断了。</b>' +
     '<span class="sub">这一步是整条排查链里唯一能把' +
     '「灯的问题」和「线的问题」分开的判据，别跳过。</span>'],
    ['线坏了就换线', '换', 'fix',
     '书上最后一句：<b>若线路有故障，应当更换线路。</b>' +
     '<hr>室外照明的线断了，一般不做接续修补 —— ' +
     '<b>接头就是下一次故障的起点</b>（进水、锈蚀、绝缘老化）。' +
     '真要接，6.4 那节讲的规矩一条都不能少：' +
     '<b>缠绕 5 圈以上、搪锡、热收缩管、绝缘恢复到位</b>。' +
     '<span class="sub">室外、潮湿场合书上明确要求<b>搪锡</b>，' +
     '干燥室内才可以不搪。</span>']
  ]}
];
/* 数字卡只有一列宽，长名会折两行（老坑）。画布和讲解卡用全名，卡片用短名 */
const SHORT4 = {
  '先确认别的支路正常':'别的支路', '这条支路的断路器':'支路断路器',
  '这条支路的电缆':'支路电缆', '它那一小段支路线':'那一小段线',
  '线坏了就换线':'换线'
};
function dead4(){
  /* 返回哪几盏不亮：[列, 行] 的判据 */
  const t = S4.t;
  return function(c, r){
    if(t === 0) return true;
    if(t === 1) return c === 0;
    return c === 0 && r === 2;          /* EL3：第一条支路最外那一盏 */
  };
}
function draw4(){
  const g = st4.g; st4.clear();
  const tr = TREE[S4.t], st = tr.steps[S4.i], isDead = dead4();
  EP.heading(g, 14, 20, tr.name, '第 ' + (S4.i+1) + ' 步 · ' + st[0]);

  /* 控制箱 */
  box(g, 20, 58, 58, 76, 5, C.box, C.boxLine, 1.4);
  txt(g, '路灯控制箱', 49, 48, {sz:8.5, b:1, c:C.tx3});
  box(g, 30, 66, 38, 24, 3, C.card, C.boxLine, 1);
  txt(g, '控制器', 49, 78, {sz:7.5, b:1, c:C.tx2});
  qfSym(g, 49, 114, true);

  /* 主供电线缆。**导线一律中性灰** —— 这一屏讲的是排查路径，不是通电状态；
     画成相线红会和「灯全灭」自相矛盾（图自己打自己的嘴）*/
  seg(g, [[78, MAINY],[336, MAINY]], C.wire, 2.6);
  seg(g, [[49, 90],[49, 97]], C.wire, 2.2);
  txt(g, '主供电线缆', 336, MAINY - 24, {sz:8.5, c:C.tx3, al:'right'});

  /* 三条支路 */
  COL.forEach(function(x, c){
    seg(g, [[x, MAINY],[x, LY[0] - 12]], C.wire, 2.2);
    dot(g, x, MAINY, C.wire, 3.2);
    qfSym(g, x, MAINY + 30, !(S4.t === 1 && c === 0));
    LY.forEach(function(y, r){
      if(r) seg(g, [[x, LY[r-1] + 11],[x, y - 11]], C.wire, 2);
      const off = isDead(c, r);
      g.save();
      g.fillStyle = off ? C.lampOff : C.lamp;
      g.strokeStyle = off ? C.boxLine : C.lamp; g.lineWidth = 1.2;
      g.beginPath(); g.arc(x, y, 8, 0, Math.PI*2); g.fill(); g.stroke();
      if(!off){ g.globalAlpha = .2; g.beginPath(); g.arc(x, y, 15, 0, Math.PI*2); g.fill(); }
      g.restore();
      txt(g, 'EL' + (c*3 + r + 1), x + 12, y, {sz:8, c: off ? C.tx3 : C.tx2, al:'left'});
    });
    txt(g, '支路 ' + (c+1), x, LY[2] + 22, {sz:8.5, b:1, c:C.tx3});
  });

  /* 当前这一步指到哪儿 */
  const W = st[2];
  if(W === 'main')     hot(g, 207, MAINY, 0, {w:266, h:26, r:7});
  if(W === 'ctrl')     hot(g, 49, 78, 0, {w:50, h:34, r:7});
  if(W === 'qf')       hot(g, 49, 114, 0, {w:42, h:44, r:7});
  if(W === 'cable')    hot(g, 100, MAINY, 0, {w:60, h:26, r:7});
  if(W === 'other')    hot(g, 259, 186, 0, {w:150, h:104, r:10});
  if(W === 'brqf')     hot(g, COL[0], MAINY + 30, 0, {w:42, h:44, r:7});
  if(W === 'brcable')  hot(g, COL[0], 190, 0, {w:44, h:110, r:9});
  if(W === 'lamp')     hot(g, COL[0], LY[2], 0, {w:34, h:34, r:9});
  if(W === 'onecable') hot(g, COL[0], (LY[1]+LY[2])/2, 0, {w:26, h:52, r:8});
  if(W === 'fix')      hot(g, COL[0], (LY[1]+LY[2])/2, 0, {w:26, h:52, r:8});

  conc(g, 256, S4.i === tr.steps.length - 1 ? 'ok' : 'acc',
    '第 ' + (S4.i+1) + ' / ' + tr.steps.length + ' 步　' + st[0],
    st[1] + '　' + (S4.i === tr.steps.length - 1 ? '—— 这条链走完了' : '正常就往下一步'));
}
function note4(){
  const tr = TREE[S4.t], st = tr.steps[S4.i];
  $('s4a').textContent = (S4.i+1) + ' / ' + tr.steps.length;
  $('s4b').textContent = SHORT4[st[0]] || st[0];
  $('s4c').textContent = st[1];
  $('n3').innerHTML = '<div class="st">' + tr.name + '　·　第 ' + (S4.i+1) + ' 步：' + st[0] + '</div>' + st[3];
  $('s4p').disabled = S4.i === 0;
  $('s4n').disabled = S4.i === tr.steps.length - 1;
}

/* ================================================================
   舞台、事件、收尾
   ================================================================ */
const st1 = new Stage('cv0', 360, 268);
const st2 = new Stage('cv1', 360, 310);
const st3 = new Stage('cv2', 360, 274);
const st4 = new Stage('cv3', 360, 296);

document.getElementById('s1k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S1.k = +b.dataset.k;
  document.querySelectorAll('#s1k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S1.k);
  });
  note1(); draw1();
});

st2.cv.addEventListener('click', function(ev){
  const p = st2.pick(ev);
  ROWS.forEach(function(r, i){
    if(Math.abs(p[1] - rowY(i)) > 13) return;
    r.sw.forEach(function(nm, j){
      if(Math.abs(p[0] - swX(r, j)) > 12) return;
      S2.on[i] = !S2.on[i]; S2.last = i; S2.lastSw = nm;
    });
  });
  note2(); draw2();
});
document.getElementById('s2r').addEventListener('click', function(){
  S2.on = ROWS.map(function(){ return false; });
  S2.last = -1; S2.lastSw = '';
  note2(); draw2();
});

document.getElementById('s3k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S3.k = +b.dataset.k;
  document.querySelectorAll('#s3k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S3.k);
  });
  note3(); draw3();
});

document.getElementById('s4t').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S4.t = +b.dataset.t; S4.i = 0;
  document.querySelectorAll('#s4t .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.t === S4.t);
  });
  note4(); draw4();
});
document.getElementById('s4p').addEventListener('click', function(){
  if(S4.i > 0){ S4.i--; note4(); draw4(); }
});
document.getElementById('s4n').addEventListener('click', function(){
  if(S4.i < TREE[S4.t].steps.length - 1){ S4.i++; note4(); draw4(); }
});

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会重设尺寸并清空。**四屏全是静态的，必须在这儿逐个补画**
     （2.6/2.7 那次栽过：静态屏第一次进来是一片空白） */
  draw1(); draw2(); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:7, sec:'7.3'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('7.3');
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
