/* 3.6a 万用表（上）—— 本节内容的唯一真相。
   对应《零基础学电工》第 3 章 3.6 节（书内 P58~P61）的前半。

   万用表是就业优先级第三、题库里出现最多的一块，所以拆成上下两节。
   上节只讲**认表 + 测电压 + 测电流**，下节讲电阻/通断/指针表/查故障。

   这一节的眼是两句话：
   - **测电压并联，测电流串联** —— 接反了，一种是量不出来，一种是炸表。
   - **黑笔永远插 COM，换档要换红笔的孔** —— 万用表烧掉十次有九次是这一条没做到。

   数字口径（都在文案里当场标了出处，别再重算）：
   - 数字表电压档输入阻抗 10 MΩ（DT830/DT9205 这一类的标称值）
   - 220 V 灯泡 100 W → R = 220² / 100 = 484 Ω
   - 电压档串进 220 V 回路：I = 220 / (10 MΩ + 484) = 22.0 µA，
     灯上只剩 22.0 µA × 484 Ω = 0.0106 V —— **表照样显示 220 V，灯却是灭的**
   - 12 V / 100 Ω 回路正常电流 120 mA
   - 红笔留在 VΩ 孔去串联：I = 12 / (10 MΩ + 100) = 1.2 µA，读数 0.00 mA
   - mA 档内阻按 1 Ω 估（含保险管）：串进去 I = 12 / 101 = 118.8 mA（接入误差）；
     并在 100 Ω 负载两端时表把负载短接，12 / 1 = 12 A 全从表里过，保险管熔断
   - 3½ 位表最大计数 1999：2V/20V/200V 三档满量程 1.999/19.99/199.9，
     1000V 档分辨率 1 V */
(function(){
'use strict';
ELEC.reg({
  id: '3.6a',
  file: 'c3-6a.html',
  title: '3.6a 万用表（上）',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>认识面板</button>
    <button class="tab" data-i="1"><span class="n">2</span>测电压=并联</button>
    <button class="tab" data-i="2"><span class="n">3</span>测电流=串联</button>
    <button class="tab" data-i="3"><span class="n">4</span>量程与读数</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">一块表四个孔，黑笔永远不动</div>
    数字万用表面板上只有三样东西：<b>显示屏、量程旋钮、下面一排插孔</b>。
    <b>黑表笔永远插 COM</b>，换测量项目时动的只有红表笔。
    <b>点旋钮上的档位，看看这一档该把红笔插哪个孔。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="nums three">
        <div class="num"><div class="k">现在这一档<br>量什么</div><div class="v" id="s1a">直流电压</div></div>
        <div class="num"><div class="k">红笔<br>插哪个孔</div><div class="v" id="s1b">VΩ</div></div>
        <div class="num hi"><div class="k">表怎么<br>接进电路</div><div class="v" id="s1c">并联</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">四个插孔，各管各的</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>插孔</th><th>插什么</th><th>干什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">COM</td><td><b>黑表笔，永远插这里</b></td><td>公共端。所有测量的另一端都是它</td></tr>
        <tr><td class="eu-s">VΩ</td><td>红表笔</td><td>测<b>电压、电阻、通断、二极管</b>都用它</td></tr>
        <tr><td class="eu-s">mA</td><td>红表笔</td><td>测<b>小电流</b>（一般 200 mA 以内，孔里有保险管）</td></tr>
        <tr><td class="eu-s">10A</td><td>红表笔</td><td>测<b>大电流</b>（10 A 以内，多数表这一档不受保护）</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>最常烧表的一步：量完电流，红笔忘了插回 VΩ 孔，接着去量 220 V 电压。</b>
      电流档的内阻只有几欧甚至零点几欧，这一下就是拿表笔把火线和零线短接 ——
      轻则保险管炸，重则表内起弧、人被灼伤。
      <span class="sub">养成一个习惯：<b>量完电流立刻把红笔插回 VΩ</b>，让表永远停在「电压档 + VΩ 孔」这个安全姿势。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">档位符号怎么认</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>符号</th><th>念作</th><th>量什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">V⎓</td><td>直流电压档</td><td>电池、蓄电池、开关电源、PLC 的 24 V</td></tr>
        <tr><td class="eu-s">V~</td><td>交流电压档</td><td>市电 220 V、动力电 380 V、控制变压器输出</td></tr>
        <tr><td class="eu-s">Ω</td><td>电阻档</td><td>线圈、发热丝、绕组（<b>必须停电</b>，下一节细说）</td></tr>
        <tr><td class="eu-s">A⎓ / mA</td><td>直流电流档</td><td>串进电路里量</td></tr>
        <tr><td class="eu-s">OFF</td><td>关</td><td>不用了就转到这儿，别停在电流档上</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>「⎓」是直流，「~」是交流。</b>拿直流档去量 220 V 交流，读数会是接近 0 的一个乱跳数字 ——
      新手常据此判定「这条线没电」，其实是档位选错了。
      <span class="sub">很多表把两者合在一个档位里，靠一颗「SELECT」键切换，屏幕上会显示 DC 或 AC 字样，看屏幕不要看旋钮。</span>
    </div>
  </div>

  <div class="bet" data-bet="c36a-jack" data-q="用万用表测完一个 24V 直流电源的电流，接着要去量 220V 市电电压。这中间必须做的一步是？"
       data-opts="只要把旋钮转到 V~ 档就行|旋钮转到 V~ 档，还必须把红表笔从电流孔拔出来插回 VΩ 孔|换一支表笔" data-right="1"
       data-after="必须换孔。旋钮转到电压档，但红笔还留在 mA 或 10A 孔里的话，表笔之间就是一个几欧的电阻——搭到 220V 上等于把火线零线短接。这是万用表最典型的炸表方式，也是考题最爱考的一条。"></div>
</section>

<!-- ================= 场景 2：测电压 = 并联 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">测电压：表要跨在两点之间，不能串进去</div>
    电压是<b>两点之间的差</b>，所以表笔要<b>跨接在被测的那两个点上</b>（并联），
    电路本身照常工作。<b>点开关能通断，切三种接法看读数。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">灯两端（对）</button>
        <button class="btn sm" data-k="1">串进回路（错）</button>
        <button class="btn sm" data-k="2">开关两端</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">表<br>读数</div><div class="v" id="s2a">220 V</div></div>
        <div class="num"><div class="k">灯两端<br>实际电压</div><div class="v" id="s2b">220 V</div></div>
        <div class="num hi"><div class="k">灯</div><div class="v" id="s2c">亮</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">为什么串进去表还是显示 220 V，灯却灭了</div>
    数字表电压档的<b>输入阻抗约 10 MΩ</b>（一千万欧）—— 这就是它能「并上去不影响电路」的原因。
    可一旦把它<b>串</b>进回路，这 10 MΩ 就成了整条回路的电阻：
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>算式</th><th>结果</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">回路<br>电流</td><td>220 V ÷ (10 MΩ + 484 Ω)</td><td><b>22.0 µA</b>（微安）</td></tr>
        <tr><td class="eu-s">灯上<br>电压</td><td>22.0 µA × 484 Ω</td><td><b>0.011 V</b> —— 灯当然不亮</td></tr>
        <tr><td class="eu-s">表上<br>电压</td><td>220 V − 0.011 V</td><td><b class="rd">220 V</b> —— 表还是显示 220</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>这是万用表最会骗人的一种错法</b>：读数完全正常，但电路被你的表给「断」了。
      现场表现是「一接表设备就停，一拿开又好了」—— 看着像设备毛病，其实是接法错了。
      <span class="sub">灯泡电阻 484 Ω 是这么来的：220 V / 100 W 的灯，R = U² ÷ P = 220² ÷ 100 = 484 Ω。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st good">跨在开关两端：闭合读 0 V，断开读 220 V</div>
    这是查断路最好用的一招。<b>一个好的闭合触点，两端电压差应该是 0</b> ——
    因为它几乎没有电阻。反过来：
    <div class="tip info">
      <b>开关明明是合上的，两端却量到 220 V → 这个触点没接通</b>（触点烧蚀、接触不良、刀口没到位）。
      整条回路的电压，会全部落在那个断开的地方。
      <span class="sub">这个思路叫<b>电压降法</b>，是第 3.6b 节查线路故障的主力手段：
      沿着回路一段一段量，电压「掉」在哪一段，故障就在那一段。</span>
    </div>
  </div>

  <div class="bet" data-bet="c36a-sw" data-q="一条 220V 照明回路，开关合上了灯却不亮。把表笔跨在开关两端，读数 220V。说明什么？"
       data-opts="开关是好的，问题在灯|开关这个触点没接通，整条回路的电压都落在它两端了|电源电压太高" data-right="1"
       data-after="开关触点没接通。好的闭合触点两端应该几乎是 0V；量到 220V，说明电流走不过去，电源电压全落在这个断开点上。接下来就该拆开看刀口/触点有没有烧蚀氧化了。"></div>
</section>

<!-- ================= 场景 3：测电流 = 串联 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">测电流：必须把电路断开，让电流从表里穿过去</div>
    电流是<b>穿过导线的东西</b>，想量它就得<b>把表接成导线的一部分</b>（串联）。
    这意味着<b>先断电、剪断或拆开一个接点，再把表接进去</b>。
    <b>切三种接法看会发生什么。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">断开串入（对）</button>
        <button class="btn sm" data-k="1">红笔还在 VΩ 孔</button>
        <button class="btn sm" data-k="2">并在电阻两端</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">回路<br>电流</div><div class="v" id="s3a">118.8 mA</div></div>
        <div class="num"><div class="k">表<br>读数</div><div class="v" id="s3b">118.8 mA</div></div>
        <div class="num hi"><div class="k">负载</div><div class="v" id="s3c">正常工作</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">三种接法，三个结果</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>接法</th><th>表内阻</th><th>结果</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">断开<br>串入</td><td>约 1 Ω<br>（可忽略）</td><td><b>读 118.8 mA</b>，负载照常工作 ✓</td></tr>
        <tr><td class="eu-s">红笔留<br>在 VΩ</td><td><b>10 MΩ</b></td><td>读 <b>0.00</b>，负载不工作 —— 表把电路断了</td></tr>
        <tr><td class="eu-s">并在<br>负载上</td><td>约 1 Ω</td><td><b class="rd">12 V ÷ 1 Ω = 12 A</b>，负载被短接，保险管当场熔断</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>电流档就是一根导线。</b>把一根导线并在负载两端叫什么？叫<b>短路</b>。
      12 V 上烧掉的只是一根保险管；同样这一下发生在 <b>220 V 或 380 V 上，就是弧光和烧伤</b>。
      <span class="sub">所以电流档只有一条规矩：<b>先想清楚电流该从哪儿穿过去，再动手</b>。
      拿不准就别用万用表量电流 —— 用钳形表（3.7 节），不用断线，也不会接错。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st good">量电流的正确顺序</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>步</th><th>做什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">①</td><td><b>断电</b>，确认没电（第 3.5 节那支笔）</td></tr>
        <tr><td class="eu-s">②</td><td>红笔插 <b>mA</b> 或 <b>10A</b> 孔，旋钮转到对应的电流档</td></tr>
        <tr><td class="eu-s">③</td><td>拆开回路上的一个接点，把两支表笔接在<b>断口的两边</b></td></tr>
        <tr><td class="eu-s">④</td><td>送电，读数</td></tr>
        <tr><td class="eu-s">⑤</td><td>断电，恢复接线，<b>红笔插回 VΩ 孔</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>估不准大小时先用 10A 孔试</b>，读数很小再换到 mA 孔 ——
      反过来（先用 mA 孔）超量程就烧保险管了。
      <span class="sub">mA 孔里那根保险管是消耗品，烧了就得换；很多表的 10A 孔<b>根本没有保险管</b>，接错直接烧线路板。</span>
    </div>
  </div>

  <div class="bet" data-bet="c36a-amp" data-q="把万用表调到电流档、红笔插 10A 孔，然后像量电压那样把两支笔搭在 220V 插座的两个孔上。会发生什么？"
       data-opts="显示插座能提供的电流|表笔之间几乎是一根导线，等于把火线零线短接，弧光炸表|显示 0，因为没有负载" data-right="1"
       data-after="等于短接。电流档的内阻只有几欧甚至零点几欧，搭在 220V 上就是一次短路，瞬间电流几十到几百安。轻则保险管炸开，重则表壳内起弧、手被灼伤、上级断路器跳闸。这就是为什么规矩定成「量完电流立刻把红笔插回 VΩ 孔」。"></div>
</section>

<!-- ================= 场景 4：量程与读数 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">同一个电压，四个档位显示出四个样子</div>
    手动量程表要自己选档。<b>档选小了显示 OL（超量程），选大了看不清小数</b>。
    <b>拖滑杆改被测电压，四个档的读数同时列在下面。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4p">
        <button class="btn sm" data-u="1.5">1.5V 电池</button>
        <button class="btn sm" data-u="12">12V 蓄电池</button>
        <button class="btn sm" data-u="24">24V 电源</button>
        <button class="btn sm" data-u="220">220V 市电</button>
      </div>
      <div class="rowlab" style="margin-top:8px">被测电压　<b id="s4lab">12.0 V</b></div>
      <input type="range" id="s4u" min="0" max="250" step="0.1" value="12">
      <div class="btns" id="s4k" style="margin-top:8px">
        <button class="btn sm" data-k="0">2V 档</button>
        <button class="btn on sm" data-k="1">20V 档</button>
        <button class="btn sm" data-k="2">200V 档</button>
        <button class="btn sm" data-k="3">1000V 档</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">屏上<br>显示</div><div class="v" id="s4a">12.00</div></div>
        <div class="num"><div class="k">这一档<br>最小能分辨</div><div class="v" id="s4b">0.01 V</div></div>
        <div class="num hi"><div class="k">这一档<br>能不能用</div><div class="v" id="s4c">最合适</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">3½ 位表：最大计数 1999</div>
    普通数字万用表屏幕上是<b>「3 位半」</b>：后三位是 0~9 的完整数字，最高位只能是 0 或 1。
    所以<b>一屏最多显示到 1999</b> —— 小数点的位置由档位决定：
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>档位</th><th>最大能读</th><th>最小能分辨</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">2 V</td><td>1.999 V</td><td>0.001 V（1 mV）</td></tr>
        <tr><td class="eu-s">20 V</td><td>19.99 V</td><td>0.01 V</td></tr>
        <tr><td class="eu-s">200 V</td><td>199.9 V</td><td>0.1 V</td></tr>
        <tr><td class="eu-s">1000 V</td><td>1000 V</td><td><b>1 V</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>「OL」或者只亮一个「1」，意思是超量程</b>（Over Load），不是坏了 ——
      往大一档换就行。
      <span class="sub">1.5 V 的干电池用 1000V 档去量，屏上显示「2」：这一档一格就是 1 V，
      1.4 V 和 1.5 V 在它眼里没区别。档位选大了不会烧表，但也基本读不出东西。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">不知道有多大，就从最大档往下切</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>怎么做</th><th>为什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">未知<br>电压</td><td><b>先用最大档</b>，看清数量级再往下换</td><td>先用小档超量程虽不至于烧表，但可能损伤表</td></tr>
        <tr><td class="eu-s">未知<br>电流</td><td><b>先用 10A 孔</b></td><td>先用 mA 孔<b>会烧保险管</b>，这个真会坏</td></tr>
        <tr><td class="eu-s">交直流</td><td>看清屏幕上是 <b>DC 还是 AC</b></td><td>档位选错读数接近 0，会误判成「没电」</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>自动量程表（屏幕上有 AUTO 字样）不用选档</b>，但你仍然要会看手动表 ——
      配电箱里那种便宜的 DT830 遍地都是，而且<b>自动量程表也分不出交直流，那还是得你自己选</b>。
    </div>
  </div>

  <div class="quiz" data-quiz="c3-6a">
    <div class="qz" data-q="用万用表量一台设备的工作电流，表笔像量电压那样跨接在设备两端。会怎样？"
         data-opts="正常读出电流|读数是 0 或很小，因为电流并没有从表里穿过去；如果用的是电流档还会短路设备|读出的是电压"
         data-right="1"
         data-why="电流必须穿过表。跨接（并联）时电流走的是设备那条路，不经过表。如果这时用的是电流档，表的几欧内阻还会把设备两端短接。量电流唯一的接法是断开回路、把表串成导线的一部分。"></div>
    <div class="qz" data-q="把电压档的表笔串进 220V 照明回路里，表显示 220V，但灯不亮。为什么？"
         data-opts="灯泡坏了|表的输入阻抗 10MΩ 成了回路电阻，电流只有 22µA，电压几乎全落在表上|电源电压不够"
         data-right="1"
         data-why="表把电路断了。电压档输入阻抗约 10MΩ，串进回路后 I = 220V ÷ (10MΩ+484Ω) = 22µA，灯上只剩 0.011V。而这 220V 几乎全落在表两端，所以表读数看着完全正常——这正是它骗人的地方。"></div>
    <div class="qz" data-q="用 20V 档去量 220V 市电，屏幕上显示「OL」。这是什么意思？"
         data-opts="表坏了|超量程，换到 1000V 档就能读|这条线没电"
         data-right="1"
         data-why="超量程（Over Load）。3½ 位表 20V 档最多读到 19.99V，220V 远超它，所以只显示 OL 或一个孤零零的「1」。往大一档换即可。反过来，不知道电压多大时应该从最大档开始往下切。"></div>
    <div class="qz" data-q="量完一台 24V 电源的电流后，红表笔应该怎么处理？"
         data-opts="留在 mA 孔里，下次省事|立刻插回 VΩ 孔|拔下来放着"
         data-right="1"
         data-why="立刻插回 VΩ 孔。红笔留在电流孔时，两支表笔之间只有几欧电阻，下一次顺手去量电压就是一次短路——这是万用表最典型的炸表方式。让表永远停在「电压档 + VΩ 孔」这个安全姿势。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 3 章 3.6 节（书内 P58~P61）<br>下一节：3.6b 万用表（下）—— 测电阻、通断、指针表、查故障</div>
</section>`,

  init: function(EC){
'use strict';
const {C, Path, Stage, txt, tw, box, tag, hot, loop, $} = EC;
const P = EP.P, TY = EP.TYPE;

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
   全节共用的小零件
   ================================================================ */
/* 直流记号：一条实线 + 三段短虚线。
   **别写 U+2393 那个「⎓」字符** —— 字体里没有就是一个豆腐块（截图环境实测过）。 */
function dcMark(g, x, y, c){
  g.save();
  g.strokeStyle = c; g.lineWidth = 1.3; g.lineCap = 'butt';
  g.beginPath(); g.moveTo(x-5, y-2.6); g.lineTo(x+5, y-2.6); g.stroke();
  g.beginPath();
  for(let i=0;i<3;i++){ g.moveTo(x-5+i*3.6, y+1.8); g.lineTo(x-5+i*3.6+2.2, y+1.8); }
  g.stroke(); g.restore();
}
/* 交流记号：一个正弦波 */
function acMark(g, x, y, c){
  g.save();
  g.strokeStyle = c; g.lineWidth = 1.4; g.lineCap = 'round';
  g.beginPath();
  for(let i=0;i<=16;i++){
    const px = x - 6.5 + i*13/16, py = y - Math.sin(i/16*Math.PI*2)*3.4;
    i ? g.lineTo(px, py) : g.moveTo(px, py);
  }
  g.stroke(); g.restore();
}
/* 通断档记号：二极管三角 + 两道声波弧 */
function ctMark(g, x, y, c){
  g.save();
  g.strokeStyle = c; g.fillStyle = c; g.lineWidth = 1.3; g.lineJoin = 'round';
  g.beginPath(); g.moveTo(x-7, y-4.2); g.lineTo(x-7, y+4.2); g.lineTo(x-0.5, y); g.closePath(); g.fill();
  g.beginPath(); g.moveTo(x-0.5, y-4.6); g.lineTo(x-0.5, y+4.6); g.stroke();
  g.lineWidth = 1.1;
  for(let i=1;i<=2;i++){
    g.beginPath(); g.arc(x-0.5, y, 2.6+i*2.8, -0.9, 0.9); g.stroke();
  }
  g.restore();
}
function markAt(g, kind, x, y, c){
  if(kind === 'dc') dcMark(g, x, y, c);
  else if(kind === 'ac') acMark(g, x, y, c);
  else if(kind === 'ct') ctMark(g, x, y, c);
}

/* 插孔：黑色 COM 一个样，红色的三个一个样。返回孔心坐标 */
function jack(g, x, y, red, on){
  g.save();
  if(on){
    const gr = g.createRadialGradient(x, y, 3, x, y, 17);
    gr.addColorStop(0, 'rgba(74,144,217,.55)');
    gr.addColorStop(1, 'rgba(74,144,217,0)');
    g.fillStyle = gr;
    g.beginPath(); g.arc(x, y, 17, 0, Math.PI*2); g.fill();
  }
  g.beginPath(); g.arc(x, y, 7.5, 0, Math.PI*2);
  g.fillStyle = red ? '#a8302a' : '#14171b'; g.fill();
  g.strokeStyle = on ? P.blue : '#1b2027'; g.lineWidth = on ? 1.8 : 1.2; g.stroke();
  g.beginPath(); g.arc(x, y, 3, 0, Math.PI*2);
  g.fillStyle = '#0b0e12'; g.fill();
  g.restore();
  return [x, y];
}

/* 一支表笔：笔尖在 (tx,ty)，笔杆朝 ang 方向斜上去 */
function probe(g, tx, ty, ang, red){
  const c = red ? '#c0392b' : '#1b2027', cl = red ? '#e05a4a' : '#3b444f';
  g.save();
  g.translate(tx, ty); g.rotate(ang);
  /* 金属针 */
  g.beginPath(); g.moveTo(0,0); g.lineTo(3, -2.2); g.lineTo(16, -1.5); g.lineTo(16, 1.5); g.lineTo(3, 2.2);
  g.closePath();
  g.fillStyle = P.steel; g.fill();
  g.strokeStyle = P.steelDD; g.lineWidth = 0.9; g.lineJoin = 'round'; g.stroke();
  /* 笔杆 */
  box(g, 15, -5, 30, 10, 3, c, cl, 1.1);
  box(g, 41, -4, 8, 8, 2, cl, cl, 1);
  g.restore();
}

/* 两支表笔的软线：从插孔垂下来 → 横走 → 垂到测点。
   **孔位靠右的那支走上面那条横线**，这样两条线不交叉（试出来的，
   孔序和测点序一致时天然不交叉，反过来就必然打结）。 */
function leadPair(g, rj, bj, tRed, tBlack, yTop, yBot, tipY){
  const redUp = rj[0] > bj[0];
  const pr = drawLead(g, rj, tRed, redUp ? yTop : yBot, true);
  const pb = drawLead(g, bj, tBlack, redUp ? yBot : yTop, false);
  function drawLead(g2, from, tx, my, red){
    const p = new Path([[from[0], from[1]], [from[0], my], [tx, my], [tx, tipY]]);
    EP.wire(g2, p, {color: red ? '#c0392b' : (C.wire), w:2.4});
    return p;
  }
  return [pr, pb];
}

/* ================================================================
   场景 1：认识面板
   ================================================================
   七个档位绕旋钮排一圈（正上方 OFF，顺时针每 50°），
   点档位 → 旋钮指过去 + 该用的两个孔亮起来。 */
const MODES = [
  {t:'OFF', mk:null, what:'关机',          j:-1, conn:'—',   lcd:'',
   st:'用完转回 OFF —— 这是保命习惯',
   b:'表不工作了。<b>很多人用完随手一扔，旋钮停在电流档上</b>；下次拿起来顺手去量电压，两支表笔之间只有几欧，那就是一次短路。'},
  {t:'V',   mk:'ac', what:'交流电压',      j:3,  conn:'并联', lcd:'AC',
   st:'交流电压档：市电 220 V、动力电 380 V',
   b:'表<b>并接</b>在被测的两点上，电路照常工作。交流没有正负之分，两支笔怎么接都行。'},
  {t:'V',   mk:'dc', what:'直流电压',      j:3,  conn:'并联', lcd:'DC',
   st:'直流电压档：电池、24 V 控制电源、开关电源',
   b:'同样是<b>并接</b>。红笔接高电位那一端；<b>接反了只是显示一个负号，不会损坏</b> —— 数字表这一点比指针表宽容得多。'},
  {t:'Ω',   mk:null, what:'电阻',          j:3,  conn:'并联', lcd:'Ω',
   st:'电阻档：必须停电才能用',
   b:'电阻档是<b>表自己往外送一个小电流</b>去量的，电路上还带着电就量不准，也可能烧表。而且被测元件最好拆下一头，否则量到的是它跟旁边一堆东西并联的结果。<b>细节留到 3.6b。</b>'},
  {t:'',    mk:'ct', what:'通断 / 二极管', j:3,  conn:'并联', lcd:'',
   st:'通断档：两笔一碰就响，查线最快的一档',
   b:'电阻小于几十欧时蜂鸣器响 = 这两点是通的。<b>查断线、查熔断器、认线头都靠它</b>，同样<b>必须停电</b>。'},
  {t:'mA',  mk:'dc', what:'直流小电流',    j:1,  conn:'串联', lcd:'mA',
   st:'小电流档：表要串进电路里',
   b:'红笔必须换到 <b>mA 孔</b>。这个孔里有<b>保险管</b>，超过量程（一般 200 mA）就烧管子 —— 管子是消耗品，烧了得换。'},
  {t:'10A', mk:'dc', what:'直流大电流',    j:0,  conn:'串联', lcd:'A',
   st:'大电流档：多数表这个孔没有保护',
   b:'红笔换到 <b>10A 孔</b>。<b>大多数表这一档没有保险管</b>，接错直接烧线路板；说明书上一般还写着「连续测量不超过 10~15 秒」。'}
];
const JACKS = [{x:110,n:'10A',red:1},{x:156,n:'mA',red:1},{x:202,n:'COM',red:0},{x:248,n:'VΩ',red:1}];
const KC = [180, 162], KR = 34, LR = 66;   /* 63 时选中档的蓝底会贴上旋钮边 */          /* 旋钮中心、半径、档位圈半径 */
const S1 = { k:2 };
const st1 = new Stage('cv0', 360, 330);

function modeAng(i){ return (-90 + i*50) * Math.PI / 180; }

function draw1(){
  const g = st1.g; st1.clear();
  const M = MODES[S1.k];
  EP.heading(g, 12, 14, '数字万用表');

  /* 机身 */
  const bx = 84, by = 28, bw = 192, bh = 252;
  g.save();
  EP.rr(g, bx, by, bw, bh, 12);
  g.fillStyle = EP.cyl(g, by, by+bh, '#14171b', P.body, P.bodyL);
  g.fill();
  g.strokeStyle = '#0d1013'; g.lineWidth = 1.4; g.stroke();
  g.fillStyle = '#a8432a';
  EP.rr(g, bx+2, by+bh*0.26, 5, bh*0.40, 3); g.fill();
  EP.rr(g, bx+bw-7, by+bh*0.26, 5, bh*0.40, 3); g.fill();
  g.restore();

  /* LCD */
  EP.readout(g, 104, 40, 152, 42, '- - - -', {sz:22});
  if(M.lcd) txt(g, M.lcd, 112, 50, {sz:9.5, b:1, c:P.lcdInk, al:'left'});
  if(M.mk === 'ct') ctMark(g, 118, 50, P.lcdInk);

  /* 档位标签 */
  MODES.forEach(function(m, i){
    const a = modeAng(i);
    const x = KC[0] + Math.cos(a)*LR, y = KC[1] + Math.sin(a)*LR;
    const on = (i === S1.k);
    const c = on ? '#8fc3ff' : '#c9ced4';
    const wT = m.t ? tw(g, m.t, 11.5, on) : 0;
    const wM = m.mk ? 13 : 0;
    const W = wT + wM + (wT && wM ? 2 : 0);
    if(on){
      g.save();
      EP.rr(g, x - W/2 - 7, y - 10, W + 14, 20, 5);
      g.fillStyle = 'rgba(74,144,217,.22)'; g.fill();
      g.strokeStyle = 'rgba(120,180,255,.55)'; g.lineWidth = 1; g.stroke();
      g.restore();
    }
    if(m.t) txt(g, m.t, x - W/2 + wT/2, y, {sz:11.5, b:on?1:0, c:c});
    if(m.mk) markAt(g, m.mk, x + W/2 - wM/2, y, c);
  });

  /* 旋钮 */
  g.save();
  const kg = g.createRadialGradient(KC[0]-KR*0.4, KC[1]-KR*0.4, KR*0.2, KC[0], KC[1], KR);
  kg.addColorStop(0, '#6b737d'); kg.addColorStop(0.6, '#23272c'); kg.addColorStop(1, '#0d1013');
  g.fillStyle = kg;
  g.beginPath(); g.arc(KC[0], KC[1], KR, 0, Math.PI*2); g.fill();
  g.strokeStyle = '#0a0d10'; g.lineWidth = 1.3; g.stroke();
  /* 指针指向当前档 */
  const a = modeAng(S1.k);
  g.strokeStyle = '#fff'; g.lineWidth = 3; g.lineCap = 'round';
  g.beginPath(); g.moveTo(KC[0], KC[1]);
  g.lineTo(KC[0] + Math.cos(a)*(KR-6), KC[1] + Math.sin(a)*(KR-6));
  g.stroke();
  g.fillStyle = '#c9ced4';
  g.beginPath(); g.arc(KC[0], KC[1], 4, 0, Math.PI*2); g.fill();
  g.restore();
  hot(g, KC[0], KC[1], KR + 9, {a:0.45});

  /* 四个插孔 */
  JACKS.forEach(function(J, i){
    const on = (i === M.j) || (i === 2 && M.j >= 0);
    jack(g, J.x, 254, J.red, on);
    txt(g, J.n, J.x, 268, {sz:8.5, c: on ? '#cfe0f5' : '#9aa3ad'});
  });

  /* 两侧提示 */
  tag(g, '点档位', 44, 150, {sz:9.5, b:1, c:C.acc, line:C.acc});
  txt(g, '黑笔永远', 318, 148, {sz:9.5, c:C.tx3});
  txt(g, '插 COM', 318, 162, {sz:10, b:1, c:C.tx2});

  /* 结论条 */
  const okc = (M.j < 0) ? C.tx3 : (M.conn === '串联' ? C.warn : C.ok);
  const bg  = (M.j < 0) ? C.box : (M.conn === '串联' ? C.warnbg : C.okbg);
  box(g, 18, 290, 324, 32, 6, bg, okc, 1);
  txt(g, M.j < 0 ? '旋钮在 OFF，表不工作'
                 : '黑笔插 COM　红笔插 ' + JACKS[M.j].n + '　表' + M.conn + '接进电路',
      180, 306, {sz:10.5, b:1, c:okc});
}

function note1(){
  const M = MODES[S1.k];
  $('s1a').textContent = M.what;
  $('s1b').textContent = M.j < 0 ? '—' : JACKS[M.j].n;
  $('s1c').textContent = M.conn;
  $('n0').innerHTML = '<div class="st' + (M.conn === '串联' ? ' warn' : '') + '">' + M.st + '</div>' + M.b;
}

st1.cv.addEventListener('click', function(ev){
  const p = st1.pick(ev);
  const dx = p[0] - KC[0], dy = p[1] - KC[1], d = Math.hypot(dx, dy);
  if(d < 14 || d > 96) return;
  const a = Math.atan2(dy, dx);
  let best = 0, bd = 9;
  MODES.forEach(function(m, i){
    const d2 = a - modeAng(i);
    /* 归一化到 [-π,π]：档位角能跑到 210°，直接相减比大小会错 */
    const df = Math.abs(Math.atan2(Math.sin(d2), Math.cos(d2)));
    if(df < bd){ bd = df; best = i; }
  });
  S1.k = best; note1(); draw1();
});

/* 一台小万用表（屏 2、屏 3 共用）。孔在机身底边附近、标签在孔**上方** ——
   标签放下方的话表笔线得从机身里穿出去。返回每个孔的坐标。 */
function meterUnit(g, x, y, w, h, o){
  o = o || {};
  g.save();
  EP.rr(g, x, y, w, h, 9);
  g.fillStyle = EP.cyl(g, y, y+h, '#14171b', P.body, P.bodyL);
  g.fill();
  g.strokeStyle = '#0d1013'; g.lineWidth = 1.3; g.stroke();
  g.fillStyle = '#a8432a';
  EP.rr(g, x+2, y+h*0.26, 4.5, h*0.36, 3); g.fill();
  EP.rr(g, x+w-6.5, y+h*0.26, 4.5, h*0.36, 3); g.fill();
  g.restore();

  /* 读数**右对齐**、档位字左对齐，像真表那样分站两头 ——
     读数居中的话会跟左上角的档位字挤在一起（截图抓到的） */
  const lw = w - 20, lh = h*0.38;
  EP.readout(g, x+10, y+8, lw, lh, '', {});
  const cy = y + 8 + lh/2;
  txt(g, o.reading || '- - - -', x+10+lw-9, cy, {sz:Math.max(13, lh*0.5), b:1, c:P.lcdInk, al:'right'});
  if(o.mode) txt(g, o.mode, x+19, cy, {sz:9, b:1, c:P.lcdInk, al:'left'});

  const js = o.jacks || [], n = js.length, jy = y + h - 14;
  const out = [];
  js.forEach(function(J, i){
    const jx = x + w*(i+1)/(n+1);
    const on = (o.hot != null && o.hot === i) || (J.n === 'COM' && o.hot != null);
    jack(g, jx, jy, J.red, on);
    txt(g, J.n, jx, jy - 13, {sz:8.5, c: on ? '#cfe0f5' : '#9aa3ad'});
    out.push([jx, jy]);
  });
  return out;
}

/* ================================================================
   场景 2：测电压 = 并联
   ================================================================
   220 V / 100 W 灯 → R = 220² ÷ 100 = 484 Ω。
   电压档输入阻抗 10 MΩ：串进去时 I = 220 ÷ (10 MΩ + 484) = 22.0 µA，
   灯上只剩 0.011 V，而表两端仍是 220 V —— 读数正常，灯却灭了。 */
const U2 = 220, RL2 = 484, RM = 1e7;
const S2 = { k:0, on:true, ph:0 };
const st2 = new Stage('cv1', 360, 314);
const WY = 178, WY2 = 258, LX2 = 100, ELX = 250, BRK = 296;
const P2 = new Path([[30,205],[30,WY],[320,WY],[320,WY2],[30,WY2],[30,231]]);

function calc2(){
  const on = S2.on, k = S2.k;
  if(k === 0) return on ? {r:U2, ul:U2, I:U2/RL2} : {r:0, ul:0, I:0};
  if(!on && k === 1) return {r:0, ul:0, I:0};
  if(k === 2 && on) return {r:0, ul:U2, I:U2/RL2};
  /* 串进回路（k=1 合闸）、或跨在断开的开关两端（k=2 断闸）—— 物理上是同一回事：
     表成了回路里的一段 10 MΩ */
  const I = U2/(RM + RL2);
  return {r: U2 - I*RL2, ul: I*RL2, I: I};
}
function fmtV(v){ return (v >= 1 ? v.toFixed(1) : v.toFixed(3)) + ' V'; }

/* 三种接法的两个测点 */
/* 返回 [红笔落点, 黑笔落点]。**红笔一律接右边那个点** ——
   红孔（VΩ）在黑孔（COM）右边，孔序和落点序一致时两条软线才不会打结。 */
function pts2(){
  if(S2.k === 0) return [[ELX+28, WY], [ELX-28, WY]];
  if(S2.k === 1) return [[BRK+10, WY], [BRK-10, WY]];
  /* ±40 不是 ±30：闸刀断开时拨杆往右上抬 0.55 rad，手柄末端能伸到 x≈124，
     红笔放 130 会跟它叠在一起（截图抓到的） */
  return [[LX2+40, WY], [LX2-40, WY]];
}

function draw2(dt){
  const g = st2.g; st2.clear();
  const v = calc2(), flow = v.I > 0.01;
  if(flow) S2.ph += dt * 34;
  /* 副标题必须短：表身从 x=118 起，长了会被机身盖住（截图抓到的） */
  EP.heading(g, 12, 14, '测电压', S2.k === 1 ? '串进去了' : '并联');

  /* 表 */
  const jk = meterUnit(g, 118, 10, 122, 88,
    {mode:'AC', reading: fmtV(v.r), jacks:[{n:'COM',red:0},{n:'VΩ',red:1}], hot:1});

  /* 回路导线 */
  const brk = (S2.k === 1);
  if(brk){
    /* 串进去：上边导线在 BRK 处断开 */
    new Path([[30,205],[30,WY],[BRK-10,WY]]).stroke(g, 2.6, C.wire);
    new Path([[BRK+10,WY],[320,WY],[320,WY2],[30,WY2],[30,231]]).stroke(g, 2.6, C.wire);
  }else{
    P2.stroke(g, 2.6, C.wire);
  }

  /* 电流圆点：圈没闭合就全部静止变灰（全课统一的表达） */
  /* skip 的三个区间是按路径弧长算的：开关 s=97、灯 s=247、断口 s=293
     （起点 (30,205) → 上行 27 → 上边导线自 x=30 起算） */
  EP.flow(g, P2, {gap:52, kind:'cur', dir:1, phase:S2.ph,
                  color: flow ? null : C.tx3,
                  skip:[[71,123],[237,257],[281,305]]});

  /* 交流电源 */
  g.save();
  g.beginPath(); g.arc(30, 218, 13, 0, Math.PI*2);
  g.fillStyle = C.card; g.fill();
  g.strokeStyle = C.wire; g.lineWidth = 1.8; g.stroke();
  g.strokeStyle = C.tx2; g.lineWidth = 1.5; g.lineCap = 'round';
  g.beginPath();
  for(let i=0;i<=20;i++){
    const px = 30 - 7 + i*0.7, py = 218 - Math.sin(i/20*Math.PI*2)*4.2;
    i ? g.lineTo(px, py) : g.moveTo(px, py);
  }
  g.stroke(); g.restore();
  txt(g, '220 V 交流', 50, 212, {sz:9.5, c:C.tx3, al:'left'});
  txt(g, '市电', 50, 226, {sz:10, b:1, c:C.tx2, al:'left'});

  /* 开关（可点） */
  EP.knife(g, LX2, WY, S2.on, {w:46});
  hot(g, LX2, WY - 6, 0, {w:66, h:34, r:8, a:0.4});
  tag(g, S2.on ? '开关 合' : '开关 断', LX2, 200, {sz:9.5, b:1, c:C.tx2});

  /* 灯泡 */
  const b = v.ul / U2;
  EP.lampHolder(g, ELX, WY - 5, 15, 10);
  EP.bulb(g, ELX, WY - 10 - 15, 15, b);
  txt(g, '100 W', ELX, 200, {sz:9.5, c:C.tx3});

  /* 断口 */
  if(brk){
    g.save(); g.strokeStyle = C.tx3; g.lineWidth = 1.2; g.setLineDash([2.5,2.5]);
    g.beginPath(); g.moveTo(BRK-10, WY); g.lineTo(BRK+10, WY); g.stroke(); g.restore();
    txt(g, '断开处', BRK, 200, {sz:9, c:C.tx3});
  }

  /* 表笔 */
  const t = pts2();
  /* 笔杆竖直向上、长约 48：软线接的是笔杆尾端，不是笔尖 —— 接到笔尖上
     线和笔身就断成两截了 */
  leadPair(g, jk[1], jk[0], t[0][0], t[1][0], 112, 124, WY - 48);
  probe(g, t[0][0], t[0][1], -Math.PI/2, true);
  probe(g, t[1][0], t[1][1], -Math.PI/2, false);

  /* 结论条 */
  const good = (S2.k !== 1);
  box(g, 18, 272, 324, 32, 6, good ? C.okbg : C.errbg, good ? C.ok : C.err, 1);
  txt(g, MSG2(), 180, 288, {sz:10.5, b:1, c: good ? C.ok : C.err});
}

function MSG2(){
  const v = calc2();
  if(S2.k === 1) return S2.on ? '表读 ' + fmtV(v.r) + '，看着完全正常 —— 可灯灭了'
                              : '开关断了，表读 0：串进去的表把回路也断了';
  if(S2.k === 2) return S2.on ? '闭合的开关两端 = 0 V，这才是好触点'
                              : '开关断开，它两端 = 全部电源电压 220 V';
  return S2.on ? '并在灯两端：读 220 V，灯照常亮' : '开关断了，灯两端 0 V';
}

function note2(){
  const v = calc2();
  $('s2a').textContent = fmtV(v.r);
  $('s2b').textContent = fmtV(v.ul);
  $('s2c').textContent = v.ul > 60 ? '亮' : '灭';
  let h;
  if(S2.k === 0){
    h = '<div class="st good">这是唯一正确的接法</div>' +
        '表<b>跨接</b>在灯的两端，和灯<b>并联</b>。表的 10 MΩ 内阻比灯的 484 Ω 大两万倍，' +
        '分走的电流可以忽略 —— <b>接上表，电路照常工作</b>，这正是电压档能「带电测量」的原因。' +
        (S2.on ? '' : '<div class="tip" style="margin-top:8px">开关断了，灯两端没有电压差，表读 0。' +
                      '<b>注意：这时候电源还是带电的</b>，只是那 220 V 落在开关两端了 —— 切到第三个按钮看看。</div>');
  }else if(S2.k === 1){
    h = '<div class="st bad">读数是对的，电路是废的</div>' +
        (S2.on
          ? '表串进了回路，它的 <b>10 MΩ</b> 成了整条回路的电阻：电流只剩 <b>22.0 µA</b>，' +
            '灯上只分到 <b>0.011 V</b>。而 220 V 几乎全落在表两端 —— <b>所以表照样显示 220 V。</b>' +
            '<div class="tip" style="margin-top:8px">现场表现是「一接表设备就停，表一拿开又好了」，' +
            '看着像设备毛病，其实是<b>你的表把电路断了</b>。</div>'
          : '开关也断着，整条回路两处断开，表读 0。<b>把开关合上看看</b> —— 那才是这种错法最迷惑人的地方。');
  }else{
    h = '<div class="st">跨在开关两端：查断路的主力手法</div>' +
        (S2.on
          ? '开关闭合，它几乎没有电阻，两端电压差是 <b>0 V</b>，灯正常亮。' +
            '<b>一个好的闭合触点，两端就该是 0。</b>'
          : '开关断开，电流走不过去，<b>220 V 全部落在这个断开点上</b>，表读 220 V，灯灭。' +
            '<div class="tip info" style="margin-top:8px">反过来用：<b>开关明明合上了，两端却量到 220 V</b>' +
            '，说明这个触点根本没接通 —— 触点烧蚀、氧化、刀口没到位。这就是<b>电压降法</b>。</div>');
  }
  $('n1').innerHTML = h;
}

document.getElementById('s2k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S2.k = +b.dataset.k;
  document.querySelectorAll('#s2k .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S2.k);
  });
  note2();
});
st2.cv.addEventListener('click', function(ev){
  const p = st2.pick(ev);
  if(p[0] > LX2-34 && p[0] < LX2+40 && p[1] > WY-36 && p[1] < WY+14){
    S2.on = !S2.on; note2();
  }
});

/* ================================================================
   场景 3：测电流 = 串联
   ================================================================
   12 V / 100 Ω 回路，不接表时 I = 120.0 mA。
   - 断开串入（红笔 mA 孔）：表内阻约 1 Ω → I = 12 ÷ 101 = 118.8 mA（接入误差）
   - 红笔还留在 VΩ 孔：那个孔背后是 10 MΩ → I = 1.2 µA，读 0.00 mA，负载停转
   - 电流档并在电阻两端：表的 1 Ω 把 100 Ω 短接 → 12 A 全从表里过，保险管熔断 */
const U3 = 12, RL3 = 100, RMA = 1, RV = 1e7;
const J3 = [{n:'10A',red:1},{n:'mA',red:1},{n:'COM',red:0},{n:'VΩ',red:1}];
/* jr = 红笔插第几个孔；tR/tB = 红笔黑笔的落点 x */
const CASE3 = [
  {jr:1, tR:286, tB:306, brk:true},
  {jr:3, tR:306, tB:286, brk:true},
  {jr:1, tR:218, tB:282, brk:false}
];
const S3 = { k:0, ph:0 };
const st3 = new Stage('cv2', 360, 322);
const WY3 = 186, WY3B = 266, SX3 = 90, RX3 = 250, BRK3 = 296;
const P3 = new Path([[30,213],[30,WY3],[320,WY3],[320,WY3B],[30,WY3B],[30,239]]);

function calc3(){
  if(S3.k === 0){ const I = U3/(RL3+RMA); return {I:I, im:I, load:1, blow:0}; }
  if(S3.k === 1){ const I = U3/(RL3+RV);  return {I:I, im:I, load:0, blow:0}; }
  const im = U3/RMA;                       /* 流过表的电流：电阻被表短接了 */
  return {I: im + U3/RL3, im: im, load:0, blow:1};
}
function fmtA(a){
  if(a >= 1) return a.toFixed(1) + ' A';
  if(a >= 0.001) return (a*1000).toFixed(1) + ' mA';
  return (a*1000).toFixed(4) + ' mA';
}

function draw3(dt){
  const g = st3.g; st3.clear();
  const K = CASE3[S3.k], v = calc3();
  const fast = v.I > 0.05;
  if(fast) S3.ph += dt * (v.blow ? 90 : 34);
  EP.heading(g, 12, 14, '测电流',
    S3.k === 0 ? '串联' : (S3.k === 1 ? '没换孔' : '并上去了'));

  const jk = meterUnit(g, 110, 8, 140, 96, {
    mode: K.jr === 3 ? 'DC V' : 'DC mA',
    reading: v.blow ? '- - - -' : (S3.k === 1 ? '0.00' : (v.im*1000).toFixed(1)),
    jacks: J3, hot: K.jr
  });

  /* 回路 */
  if(K.brk){
    new Path([[30,213],[30,WY3],[BRK3-10,WY3]]).stroke(g, 2.6, C.wire);
    new Path([[BRK3+10,WY3],[320,WY3],[320,WY3B],[30,WY3B],[30,239]]).stroke(g, 2.6, C.wire);
    g.save(); g.strokeStyle = C.tx3; g.lineWidth = 1.2; g.setLineDash([2.5,2.5]);
    g.beginPath(); g.moveTo(BRK3-10, WY3); g.lineTo(BRK3+10, WY3); g.stroke(); g.restore();
    txt(g, '断开处', BRK3, 208, {sz:9, c:C.tx3});
  }else{
    P3.stroke(g, 2.6, C.wire);
  }
  EP.flow(g, P3, {gap:52, kind:'cur', dir:1, phase:S3.ph,
                  color: fast ? (v.blow ? C.err : null) : C.tx3,
                  skip:[[61,113],[213,305]]});

  /* 电池 + 电阻 + 开关 */
  EC.battery(g, 30, 226, {horiz:false});
  /* 电池符号自带 ＋/− 极性记号，标注挨太近会读成「＋12 V」「−直流」 */
  txt(g, '12 V', 62, 220, {sz:10, b:1, c:C.tx2, al:'left'});
  txt(g, '直流', 62, 234, {sz:9, c:C.tx3, al:'left'});
  EP.knife(g, SX3, WY3, true, {w:44});
  tag(g, '开关 合', SX3, 208, {sz:9.5, b:1, c:C.tx2});
  EP.resistor(g, RX3, WY3, {len:56, dia:20, bands:['#6b4423','#1b2027','#6b4423','#c9a227']});
  txt(g, '100 Ω', RX3, 208, {sz:9.5, c:C.tx3});

  /* 表笔 */
  const lp = leadPair(g, jk[K.jr], jk[2], K.tR, K.tB, 118, 130, WY3 - 48);
  if(v.im > 0.05){
    const col = v.blow ? C.err : null;
    EP.flow(g, lp[0], {gap:46, kind:'cur', dir:-1, phase:S3.ph, color:col});
    EP.flow(g, lp[1], {gap:46, kind:'cur', dir:1,  phase:S3.ph, color:col});
  }
  probe(g, K.tR, WY3, -Math.PI/2, true);
  probe(g, K.tB, WY3, -Math.PI/2, false);

  /* 结论条 */
  const ok = (S3.k === 0);
  box(g, 18, 280, 324, 32, 6, ok ? C.okbg : C.errbg, ok ? C.ok : C.err, 1);
  txt(g, ok ? '电流真的从表里穿过去了：读 ' + (v.im*1000).toFixed(1) + ' mA'
            : (S3.k === 1 ? '10 MΩ 把回路堵死了：读 0.00 mA，负载停了'
                          : '表的 1 Ω 把 100 Ω 短接：' + fmtA(v.im) + ' 从表里过，保险管熔断'),
      180, 296, {sz:10.5, b:1, c: ok ? C.ok : C.err});
}

function note3(){
  const v = calc3();
  $('s3a').textContent = fmtA(v.I);
  $('s3b').textContent = v.blow ? '保险管熔断' : (S3.k === 1 ? '0.00 mA' : fmtA(v.im));
  $('s3c').textContent = v.load ? '正常工作' : (v.blow ? '被表短接' : '不工作');
  let h;
  if(S3.k === 0){
    h = '<div class="st good">正确：断开回路，表成了导线的一部分</div>' +
        '电流从<b>红笔进、黑笔出</b>，穿过表再回到电路。表内阻只有约 <b>1 Ω</b>，' +
        '所以电流从不接表时的 120.0 mA 只掉到 <b>118.8 mA</b>。' +
        '<div class="tip info" style="margin-top:8px">这 1.2 mA 的差叫<b>接入误差</b> —— ' +
        '任何电流表接进电路都会让电流变小一点点。表内阻越小，误差越小，' +
        '这也是电流表内阻必须做得极小的原因（对照 3.6b 会讲的电压表：它反过来要内阻极大）。</div>';
  }else if(S3.k === 1){
    h = '<div class="st bad">旋钮转对了，孔忘了换</div>' +
        '红笔还插在 <b>VΩ</b> 孔里，那个孔背后是 <b>10 MΩ</b>。' +
        '把它串进回路，电流只剩 <b>1.2 µA</b>（0.0012 mA），屏幕上就是 <b>0.00</b>，负载也停了。' +
        '<div class="tip" style="margin-top:8px">现场表现：<b>「量出来电流是 0，以为线断了」</b>，' +
        '于是去查那条根本没毛病的线。<b>看一眼红笔插在哪个孔</b>，两秒钟的事。</div>';
  }else{
    h = '<div class="st bad">最贵的一种手误：电流档并上去了</div>' +
        '想量「电阻上的电流」，就把两支笔跨在电阻两端 —— <b>可电流档本身就是一根导线</b>。' +
        '表的 1 Ω 把 100 Ω 的负载整个短接，<b>12 A</b> 全从表里过，mA 孔的保险管当场熔断。' +
        '<div class="tip" style="margin-top:8px">12 V 上只是烧一根保险管；' +
        '同样这一下发生在 <b>220 V 或 380 V 上，就是弧光和烧伤</b>。' +
        '<span class="sub">量电流只有一种接法：<b>把电路断开，让电流从表里穿过去</b>。' +
        '不想断线就用钳形表（3.7 节）。</span></div>';
  }
  $('n2').innerHTML = h;
}

document.getElementById('s3k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S3.k = +b.dataset.k;
  document.querySelectorAll('#s3k .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S3.k);
  });
  note3();
});

/* ================================================================
   场景 4：量程与读数
   ================================================================
   3½ 位表最大计数 1999：小数点位置由档位决定。
   超量程显示 OL；档位选大了不会坏，但分辨率变粗（1.5 V 在 1000 V 档上显示 2）。 */
const RANGES = [
  {n:'2 V',    full:1.999, res:0.001, dec:3},
  {n:'20 V',   full:19.99, res:0.01,  dec:2},
  {n:'200 V',  full:199.9, res:0.1,   dec:1},
  {n:'1000 V', full:1000,  res:1,     dec:0}
];
const S4 = { u:12, k:1 };
const st4 = new Stage('cv3', 360, 280);

function read4(u, r){
  if(u > r.full + 1e-9) return 'OL';
  return (Math.round(u / r.res) * r.res).toFixed(r.dec);
}
/* 最合适的档 = 不超量程的档里最小的那一个 */
function best4(){
  for(let i = 0; i < RANGES.length; i++) if(S4.u <= RANGES[i].full + 1e-9) return i;
  return -1;
}
function resText(r){
  /* 位数按该档的 dec 来，写死 toFixed(2) 会把 0.1 V 印成「0.10 V」 */
  return r.res >= 1 ? '1 V' : (r.res === 0.001 ? '0.001 V（1 mV）' : r.res.toFixed(r.dec) + ' V');
}

function draw4(){
  const g = st4.g; st4.clear();
  const R = RANGES[S4.k], bi = best4(), rd = read4(S4.u, R);
  const ol = (rd === 'OL');
  EP.heading(g, 12, 14, '同一个电压，四个档', S4.u.toFixed(1) + ' V');

  EP.readout(g, 96, 24, 168, 56, ol ? 'OL' : rd, {sz:30});
  txt(g, 'DC V', 106, 34, {sz:9.5, b:1, c:P.lcdInk, al:'left'});
  txt(g, R.n, 254, 34, {sz:9.5, b:1, c:P.lcdInk, al:'right'});

  RANGES.forEach(function(r, i){
    const y = 98 + i*34, on = (i === S4.k), t = read4(S4.u, r), bad = (t === 'OL');
    box(g, 24, y, 312, 28, 6, on ? C.accbg : C.box, on ? C.acc : C.boxLine, on ? 1.4 : 1);
    txt(g, r.n + ' 档', 36, y+14, {sz:10.5, b:on?1:0, c: on ? C.acc : C.tx2, al:'left'});
    txt(g, '一格 ' + (r.res >= 1 ? '1 V' : r.res.toFixed(r.dec) + ' V'), 128, y+14,
        {sz:9, c:C.tx3, al:'left'});
    if(i === bi && !bad) txt(g, '最合适', 232, y+14, {sz:9, b:1, c:C.ok, al:'left'});
    txt(g, bad ? 'OL' : t, 324, y+14, {sz:13, b:1, c: bad ? C.err : C.tx, al:'right'});
  });

  const c4 = ol ? C.err : (S4.k === bi ? C.ok : C.warn);
  const bg4 = ol ? C.errbg : (S4.k === bi ? C.okbg : C.warnbg);
  box(g, 18, 238, 324, 32, 6, bg4, c4, 1);
  txt(g, ol ? '超量程：换到 ' + RANGES[bi].n + ' 档才读得出来'
            : (S4.k === bi ? '这一档最合适：能分辨到 ' + (R.res >= 1 ? '1 V' : R.res.toFixed(R.dec) + ' V')
                           : '能读，但一格就是 ' + (R.res >= 1 ? '1 V' : R.res.toFixed(R.dec) + ' V') + '，太粗'),
      180, 254, {sz:10.5, b:1, c:c4});
}

function note4(){
  const R = RANGES[S4.k], bi = best4(), rd = read4(S4.u, R), ol = (rd === 'OL');
  $('s4lab').textContent = S4.u.toFixed(1) + ' V';
  $('s4a').textContent = ol ? 'OL' : rd;
  $('s4b').textContent = resText(R);
  $('s4c').textContent = ol ? '超量程' : (S4.k === bi ? '最合适' : '能读，偏粗');
  let h;
  if(ol){
    h = '<div class="st bad">屏幕上的 OL 不是坏了</div>' +
        S4.u.toFixed(1) + ' V 超过了 ' + R.n + ' 档能读的 ' + R.full + ' V，' +
        '屏幕只好显示 <b>OL</b>（有的表是显示一个孤零零的「1」，后面几位空着）。' +
        '<b>往大一档换就行 —— 换到 ' + RANGES[bi].n + ' 档。</b>' +
        '<div class="tip" style="margin-top:8px">所以规矩是：<b>不知道电压多大，就从最大档开始往下切。</b>' +
        '<span class="sub">注意这条规矩对电流档是另一回事：电流档从小档开始会<b>烧保险管</b>，' +
        '那是真的会坏，所以更要先用 10A 孔。</span></div>';
  }else if(S4.k === bi){
    h = '<div class="st good">这一档最合适</div>' +
        '读数 <b>' + rd + '</b>，这一档一格是 <b>' + resText(R) + '</b> —— ' +
        '在不超量程的前提下，<b>档位越小，小数点后能看到的位数越多</b>。' +
        '<div class="tip info" style="margin-top:8px">3½ 位表一屏最多显示到 <b>1999</b>：' +
        '所以 2 V 档读到 1.999、20 V 档读到 19.99、200 V 档读到 199.9 —— ' +
        '数字都是那四位，只是小数点跟着档位挪。</div>';
  }else{
    const B = RANGES[bi];
    h = '<div class="st warn">读得出来，但太粗了</div>' +
        '这一档一格就是 <b>' + resText(R) + '</b>，屏幕显示 <b>' + rd + '</b>。' +
        '换到 <b>' + B.n + ' 档</b>，同一个电压会显示成 <b>' + read4(S4.u, B) + '</b>。' +
        '<div class="tip info" style="margin-top:8px">档位选大了<b>不会烧表</b>，' +
        '但也基本读不出东西 —— 1.5 V 的干电池用 1000 V 档量，屏幕显示「2」，' +
        '一节好电池和一节快没电的电池在它眼里没区别。</div>';
  }
  $('n3').innerHTML = h;
}

function syncBtn4(){
  document.querySelectorAll('#s4k .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S4.k);
  });
  document.querySelectorAll('#s4p .btn').forEach(function(t){
    t.classList.toggle('on', Math.abs(+t.dataset.u - S4.u) < 0.05);
  });
}
document.getElementById('s4k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S4.k = +b.dataset.k; syncBtn4(); note4(); draw4();
});
document.getElementById('s4p').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S4.u = +b.dataset.u;
  $('s4u').value = S4.u;
  /* 换了被测对象就顺手挑一个合适的档 —— 否则一按 220 V 满屏 OL，看不出重点 */
  const bi = best4(); if(bi >= 0) S4.k = bi;
  syncBtn4(); note4(); draw4();
});
$('s4u').addEventListener('input', function(){
  S4.u = +this.value; syncBtn4(); note4(); draw4();
});

/* ================================================================
   绑定
   ================================================================ */
function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会清空画布。屏 2、3 在 rAF 里每帧重画，静态的屏 1、4 必须在这儿补画，
     否则第一次进来是空白（切页签也会再触发一次 fitAll，同样要补） */
  draw1(); draw2(0); draw3(0); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:3, sec:'3.6a'});
ElecUI.bind(document);
note1(); note2(); note3(); note4(); syncBtn4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('3.6a');
  let h = '';
  h += nb.prev ? '<a href="'+nb.prev.f+'">‹ '+nb.prev.id+' '+nb.prev.t+'</a>'
               : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next ? '<a class="next" href="'+nb.next.f+'">'+nb.next.id+' '+nb.next.t+' ›</a>'
               : '<span>3.6b 万用表（下）还没做</span>';
  $('pager').innerHTML = h;
})();

loop(function(dt){
  if(cur === 1) draw2(dt);
  else if(cur === 2) draw3(dt);
});
  }
});
})();
