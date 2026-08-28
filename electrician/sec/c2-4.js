/* 2.4 传感器 —— 本节内容的唯一真相。
   book.html 按需载入它；c2-4.html 是薄壳，也载入它。
   对应《零基础学电工》第 2 章 2.4 节（书内 P28~P29）。 */
(function(){
'use strict';
ELEC.reg({
  id: '2.4',
  file: 'c2-4.html',
  title: '2.4 传感器',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>它干什么</button>
    <button class="tab" data-i="1"><span class="n">2</span>测温度</button>
    <button class="tab" data-i="2"><span class="n">3</span>光·湿·气</button>
    <button class="tab" data-i="3"><span class="n">4</span>接近开关怎么接</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">把「不是电」的东西，变成电</div>
    温度、光线、湿气、烟雾 —— 这些都不是电，电路读不懂。
    <b>传感器就是那个翻译：一头接物理世界，一头吐出电阻或电压。</b>
    选一种，然后拖滑杆改变被测的那个量。
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1p">
        <button class="btn on" data-k="0">温度</button>
        <button class="btn" data-k="1">光照</button>
        <button class="btn" data-k="2">湿度</button>
      </div>
      <div class="rowlab">被测的量　<b id="s1vlab">25 ℃</b></div>
      <input type="range" id="s1v" min="0" max="100" step="1" value="25">
      <div class="ticks"><span id="s1t0">0 ℃</span><span id="s1t1">100 ℃</span></div>
      <div class="nums three">
        <div class="num"><div class="k">输入<br>（物理量）</div><div class="v" id="s1a">25 ℃</div></div>
        <div class="num"><div class="k">输出<br>（电阻）</div><div class="v" id="s1b">10.0 kΩ</div></div>
        <div class="num hi"><div class="k">后面的电路<br>读到的</div><div class="v" id="s1c">中等</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">一个传感器里面有两段</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>哪一段</th><th>干什么</th><th>举例</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">敏感元件</td><td>直接跟被测的量打交道，自己的某个性质跟着变</td><td>热敏电阻的阻值随温度变</td></tr>
        <tr><td class="eu-s">转换电路</td><td>把那个变化<b>变成好用的电信号</b>（电压、电流、开关量）</td><td>接成分压电路 → 输出 0~10V</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>传感器不产生信息，它只做翻译。</b>
      温度本来就在那儿，传感器只是把「25 ℃」这件事翻译成「10 千欧」或者「4 毫安」，
      让后面的电路、仪表、PLC 能读。<br>
      <span class="sub">所以传感器坏了，读数会「假」—— 机器照样按那个假数字干活。
      这是排故时很容易漏掉的一环：先怀疑传感器，别一上来就拆控制器。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">输出有三种，接法完全不同</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>输出是什么</th><th>典型</th><th>后面接什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">开关量</td><td>到没到、有没有、够不够 —— 只有通和断两种</td><td>直接进 PLC 输入 / 继电器线圈</td></tr>
        <tr><td class="eu-s">模拟量</td><td><b>4~20 mA</b> 或 0~10 V，连续变化</td><td>进模拟量输入模块 / 变送器</td></tr>
        <tr><td class="eu-s">电阻 / 毫伏</td><td>Pt100 的欧姆、热电偶的毫伏</td><td>要专门的温度模块或变送器</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>为什么工业上爱用 4~20 mA 而不是 0~10 V：</b>
      ① <b>0 是有意义的</b> —— 正常最小也有 4 mA，读到 0 mA 说明<b>线断了</b>，一眼看出故障；
      ② 电流信号在长线上<b>不怕压降</b>，电压信号拉几十米就掉一截。
      <span class="sub">这条到第 12、13 章接变频器和 PLC 时会天天用。</span>
    </div>
  </div>

  <div class="bet" data-bet="c24-what" data-q="一台机器的温控显示 25 ℃，实际炉膛已经 300 ℃ 了。最该先查什么？"
       data-opts="控制器坏了|传感器或它那两根线|加热管坏了" data-right="1"
       data-after="先查传感器和它的线。控制器只是照着送进来的数字干活——传感器断线、接错、装错位置，送进去的就是假数字，控制器再好也没用。这也是「传感器不产生信息，只做翻译」的现实后果。"></div>
</section>

<!-- ================= 场景 2：测温度 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">测温度是电工最常碰到的一类</div>
    电动机绕组、变压器油温、配电柜内温度、炉温 —— 都要测。
    <b>四种器件，先看它们的脾气差在哪。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2p">
        <button class="btn on" data-k="0">NTC 热敏</button>
        <button class="btn" data-k="1">PTC 热敏</button>
        <button class="btn" data-k="2">Pt100</button>
        <button class="btn" data-k="3">热电偶</button>
      </div>
      <div class="rowlab">温度　<b id="s2tlab">25 ℃</b></div>
      <input type="range" id="s2t" min="-20" max="200" step="1" value="25">
      <div class="ticks"><span>−20 ℃</span><span>200 ℃</span></div>
      <div class="nums three">
        <div class="num"><div class="k">当前温度</div><div class="v" id="s2a">25 ℃</div></div>
        <div class="num"><div class="k">它输出<br>什么</div><div class="v" id="s2b">10.0 kΩ</div></div>
        <div class="num hi"><div class="k">温度升高<br>它怎么变</div><div class="v" id="s2c">变小</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">四种，各管一段</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>输出</th><th>温度升高</th><th>常用范围</th><th>典型用途</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">NTC 热敏</td><td>电阻</td><td><b>阻值变小</b></td><td>−50~150 ℃</td><td>测温、抑制开机浪涌电流</td></tr>
        <tr><td class="eu-s">PTC 热敏</td><td>电阻</td><td><b>阻值变大</b></td><td>常温~居里点</td><td>电动机绕组过热保护、自恢复保险</td></tr>
        <tr><td class="eu-s">Pt100</td><td>电阻</td><td>阻值变大（很线性）</td><td>−200~600 ℃</td><td>工业标准测温</td></tr>
        <tr><td class="eu-s">热电偶</td><td><b>毫伏电压</b></td><td>电压变大</td><td>可到 1000 ℃ 以上</td><td>炉温这类高温</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>「N」和「P」怎么记：</b>N＝Negative（负），温度和阻值<b>反着走</b>；
      P＝Positive（正），温度和阻值<b>一块儿走</b>。
      <span class="sub">Pt100 的名字也自带信息：<b>Pt</b> 是铂，<b>100</b> 是它在 0 ℃ 时的阻值 100 Ω。
      同系列还有 Pt1000（0 ℃ 时 1000 Ω）。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">上手要知道的三件事</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>怎么回事</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">三线制</td><td>Pt100 常见三根线，多的那一根是<b>补偿线</b> —— 用来抵消引线本身的电阻。线拉长了不补偿，读数会偏高</td></tr>
        <tr><td class="eu-s">冷端补偿</td><td>热电偶量的是<b>两端的温差</b>，不是绝对温度。所以必须知道冷端（接仪表那头）多少度，仪表内部会自动补</td></tr>
        <tr><td class="eu-s">补偿导线</td><td>热电偶延长<b>不能用普通铜线</b>，要用对应型号的补偿导线，而且<b>极性不能接反</b>——接反了温度越高读数越低</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>电动机里埋的那个多半是 PTC。</b>绕组温度一超过居里点，PTC 阻值<b>陡增几百倍</b>，
      配套的热保护模块一看阻值跳了就切断接触器 —— 这就是 2.3 节末尾说的「温度继电器」那条路。
      它和热继电器一起装，一个测电流、一个测绕组本身。
    </div>
  </div>

  <div class="bet" data-bet="c24-ntc" data-q="一只标着「10 kΩ」的 NTC 热敏电阻，你用万用表量它是 10 kΩ 左右。这说明现在大概多少度？"
       data-opts="0 ℃ 左右|25 ℃ 左右|100 ℃ 左右" data-right="1"
       data-after="25 ℃ 左右。热敏电阻标的那个阻值是「25 ℃ 时的阻值」（写作 R25），这是行业约定，跟 Pt100 标的是 0 ℃ 阻值不一样——买件、换件时看清楚标的是哪个温度点。"></div>
</section>

<!-- ================= 场景 3：光 · 湿 · 气 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">同一个套路，换一样被测的东西</div>
    书上这一节还讲了光电、湿敏、气敏三类。
    <b>原理都一样：某个性质跟着变，再把它变成电信号。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3p">
        <button class="btn on" data-k="0">光敏电阻</button>
        <button class="btn" data-k="1">光电开关</button>
        <button class="btn" data-k="2">湿敏</button>
        <button class="btn" data-k="3">气敏</button>
      </div>
      <div class="rowlab"><span id="s3vname">光照强度</span>　<b id="s3vlab">50%</b></div>
      <input type="range" id="s3v" min="0" max="100" step="1" value="50">
      <div class="ticks"><span id="s3t0">全黑</span><span id="s3t1">强光</span></div>
      <div class="nums three">
        <div class="num"><div class="k">被测的量</div><div class="v" id="s3a">50%</div></div>
        <div class="num"><div class="k">它输出</div><div class="v" id="s3b">1.0 kΩ</div></div>
        <div class="num hi"><div class="k">后面那一路</div><div class="v" id="s3c">没动作</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">这四样在现场都是干什么的</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>怎么变</th><th>在哪见过</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">光敏电阻</td><td><b>越亮阻值越小</b>（暗电阻可以是亮电阻的几百倍）</td><td>路灯自动开关、楼道声光控灯</td></tr>
        <tr><td class="eu-s">光电开关</td><td>发射端发光、接收端收光，<b>被挡住就动作</b></td><td>流水线计数、卷帘门防夹、料位检测</td></tr>
        <tr><td class="eu-s">湿敏</td><td>吸了潮气，阻值或电容跟着变</td><td>除湿机、配电柜加热除湿、大棚</td></tr>
        <tr><td class="eu-s">气敏</td><td>碰到目标气体，表面电阻突降</td><td>燃气报警器、烟感、地下室排风联动</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>光电开关有三种玩法，选错了装上也不好用：</b><br>
      <b>对射式</b>——发射和接收分两头，中间挡住就动作，最可靠、距离最远；<br>
      <b>反射式</b>——发射接收在一起，对面装一块反光板；<br>
      <b>漫反射式</b>——不用反光板，靠物体本身把光反回来，<b>但深色、透明、发亮的物体容易测不到</b>。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">气敏那一类，装的位置决定它有没有用</div>
    <b>天然气比空气轻，往上飘 → 报警器装在<u>高处</u>（离顶 30 cm 左右）；
    液化石油气比空气重，往下沉 → 装在<u>低处</u>（离地 30 cm 左右）。</b>
    装反了等于没装。
    <span class="sub">这不是电工的本行，但配电、排风联动经常连着它，装的时候顺口提醒一句是本事。</span>
  </div>

  <div class="bet" data-bet="c24-photo" data-q="一只光电开关装在流水线上数瓶子，用的是漫反射式。换成黑色瓶身之后经常数漏。为什么？"
       data-opts="开关坏了|黑色把光吸掉了，反不回来|瓶子跑太快" data-right="1"
       data-after="黑色吸光。漫反射式靠物体自己把光反回接收端，深色、透明、镜面的物体都容易反不够。改成对射式（两头分装、中间挡光）就跟颜色无关了——选型的时候先问「测的东西是什么颜色、什么材质」。"></div>
</section>

<!-- ================= 场景 4：接近开关怎么接 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">这一屏是这节里最该练熟的</div>
    工厂里的传感器，十个有八个是<b>三线制接近开关 / 光电开关</b>。
    棕、蓝、黑三根线，<b>NPN 和 PNP 接法不一样，接错了不动作</b>。
    <b>先选一种，再点「让金属靠近」。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4p">
        <button class="btn on" data-k="0">NPN（漏型）</button>
        <button class="btn" data-k="1">PNP（源型）</button>
      </div>
      <div class="btns">
        <button class="btn big" id="s4go">让金属靠近</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">检测到了吗</div><div class="v" id="s4a">没有</div></div>
        <div class="num"><div class="k">黑线（信号）<br>现在是</div><div class="v" id="s4b">高电平</div></div>
        <div class="num hi"><div class="k">负载</div><div class="v" id="s4c">没动作</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">三根线的颜色是国际通用的，先背死</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>颜色</th><th>是什么</th><th>接哪</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">棕 BN</td><td>电源正</td><td>＋24V</td></tr>
        <tr><td class="eu-s">蓝 BU</td><td>电源负</td><td>0V</td></tr>
        <tr><td class="eu-s">黑 BK</td><td><b>输出信号</b></td><td>负载 / PLC 输入</td></tr>
        <tr><td class="eu-s">白 WH</td><td>第二路输出（四线制才有，常是常闭那一路）</td><td>另一个负载</td></tr>
      </tbody>
    </table></div>
    <div class="tip warn">
      <b>棕蓝接反 = 当场烧。</b>大多数接近开关有反接保护，但别赌。
      通电前先拿万用表确认哪根是 24V 正、哪根是 0V，再对着这张表接。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">NPN 和 PNP，差别只有一句话</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>NPN（漏型 / 低电平输出）</th><th>PNP（源型 / 高电平输出）</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">动作时黑线</td><td>被接到 <b>0V</b>（蓝线）</td><td>被接到 <b>＋24V</b>（棕线）</td></tr>
        <tr><td class="eu-s">负载另一端</td><td>接 <b>＋24V</b></td><td>接 <b>0V</b></td></tr>
        <tr><td class="eu-s">电流方向</td><td>从负载<b>流进</b>开关（sink，吸电流）</td><td>从开关<b>流出</b>到负载（source，供电流）</td></tr>
        <tr><td class="eu-s">谁在用</td><td>国内设备多见</td><td>欧美设备、西门子 PLC 多见</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>记法：看名字最后那个字母。</b>NP<b>N</b> → 输出接<b>负</b>（Negative，0V）；
      PN<b>P</b> → 输出接<b>正</b>（Positive，24V）。<br>
      <b>选型不是随便挑的，要看 PLC 那一头。</b>PLC 输入端有个公共端（S/S 或 COM）：
      这个公共端<b>接了 ＋24V，就得配 NPN</b>；<b>接了 0V，就得配 PNP</b>。
      买错了型号，接上去灯不亮、PLC 也没输入 —— 而且<b>不会烧</b>，所以很难一眼看出问题在哪。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">还有一种「两线制」，别跟三线制搞混</div>
    两线制只有棕蓝两根，<b>整个开关像一个开关一样串在负载回路里</b>，不分 NPN/PNP，接线最省事。
    代价是两条：<br>
    ① <b>有漏电流</b>（不动作时也有零点几到几毫安流过），带高阻抗的 PLC 输入可能<b>关不断</b>；<br>
    ② <b>有压降</b>（自己要吃掉几伏），负载电压不够就动作不可靠。
    <span class="sub">所以接 PLC 一般优先选三线制。两线制多用来直接驱动继电器、指示灯这类。</span>
  </div>

  <div class="quiz" data-quiz="c2-4">
    <div class="qz" data-q="三线制接近开关，棕蓝黑三根线分别接什么？"
         data-opts="棕→0V，蓝→＋24V，黑→信号|棕→＋24V，蓝→0V，黑→信号|棕→信号，蓝→＋24V，黑→0V"
         data-right="1"
         data-why="棕＝＋24V、蓝＝0V、黑＝输出信号。这是国际通用色标，四线制多出的白线是第二路输出。棕蓝接反有烧掉的风险，通电前先拿表确认。"></div>
    <div class="qz" data-q="一只 NPN 型接近开关，检测到金属时它的黑线被接到哪里？"
         data-opts="＋24V|0V|悬空"
         data-right="1"
         data-why="0V。NPN 是漏型、低电平输出——动作时把黑线拉到 0V（蓝线）。记法：NPN 最后那个字母 N＝Negative＝接负。所以负载的另一端必须接 ＋24V，电流才有路走。"></div>
    <div class="qz" data-q="PLC 输入的公共端（S/S 或 COM）接的是 0V。该配哪种接近开关？"
         data-opts="NPN|PNP|都行"
         data-right="1"
         data-why="PNP。公共端接 0V 时，PLC 输入点需要有人往里「送」＋24V 才算得电，这活儿得由 PNP（源型）来干。反过来公共端接 ＋24V 就配 NPN。选错了不会烧，但就是没输入——最难查的那一类问题。"></div>
    <div class="qz" data-q="Pt100 上标的「100」是什么意思？"
         data-opts="最高能测 100 ℃|0 ℃ 时它的阻值是 100 Ω|它的精度是 100 分之一"
         data-right="1"
         data-why="0 ℃ 时阻值 100 Ω。Pt 是铂。注意跟热敏电阻的习惯不一样：热敏电阻标的「10 kΩ」指的是 25 ℃ 时的阻值（R25）。两种器件标的温度点不同，换件时看清楚。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 2 章 2.4 节（书内 P28~P29）<br>下一节讲电子元器件：电阻、电容、电感</div>
</section>`,

  init: function(EC){
'use strict';
const {C, Path, Stage, txt, box, tag, loop, $} = EC;

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

/* 画一条曲线图：横轴 x0~x1，纵轴按 f() 的值域自动定，当前值处画一个橙点。
   ylog=true 时纵轴取对数 —— 光敏、热敏的阻值动辄差几百倍，线性画出来是一条贴地的线。 */
function curve(g, r, o){
  box(g, r.x, r.y, r.w, r.h, 6, C.box, C.boxLine, 1);
  const N = 90, xs = [], ys = [];
  for(let i=0;i<=N;i++){
    const x = o.x0 + (o.x1-o.x0)*i/N;
    xs.push(x); ys.push(o.f(x));
  }
  let lo = Infinity, hi = -Infinity;
  ys.forEach(function(v){ if(v<lo) lo=v; if(v>hi) hi=v; });
  const tr = o.ylog
    ? function(v){ return (Math.log(Math.max(v,1e-6)) - Math.log(Math.max(lo,1e-6))) /
                          (Math.log(Math.max(hi,1e-6)) - Math.log(Math.max(lo,1e-6)) || 1); }
    : function(v){ return (v - lo) / ((hi - lo) || 1); };
  const px = function(x){ return r.x + 10 + (r.w-20)*(x-o.x0)/(o.x1-o.x0); };
  const py = function(v){ return r.y + r.h - 14 - (r.h-28)*tr(v); };
  g.save(); g.strokeStyle = C.acc; g.lineWidth = 2.2; g.lineJoin='round';
  g.beginPath();
  for(let i=0;i<=N;i++){ const a=px(xs[i]), b=py(ys[i]); i?g.lineTo(a,b):g.moveTo(a,b); }
  g.stroke(); g.restore();
  /* 当前点：一条竖虚线牵到横轴，免得看不出对应的是哪个横坐标 */
  const cxp = px(o.mx), cyp = py(o.f(o.mx));
  g.save(); g.setLineDash([3,3]); g.strokeStyle = C.cur; g.lineWidth = 1.2;
  g.beginPath(); g.moveTo(cxp, cyp); g.lineTo(cxp, r.y + r.h - 6); g.stroke();
  g.restore();
  g.save(); g.fillStyle = C.cur;
  g.beginPath(); g.arc(cxp, cyp, 4.6, 0, EC.TAU); g.fill(); g.restore();
  if(o.xlab) txt(g, o.xlab, r.x + r.w/2, r.y + r.h + 12, {sz:9, c:C.tx3});
  if(o.ylab) txt(g, o.ylab, r.x + 4, r.y - 10, {sz:9, c:C.tx3, al:'left'});
  if(o.hiLab) txt(g, o.hiLab, r.x + r.w - 4, r.y - 10, {sz:9, c:C.tx3, al:'right'});
}

/* 被测的那个物理量画成一个小图标，场景 1 和场景 3 共用 */
function inputIcon(g, x, y, kind, t){
  t = Math.max(0, Math.min(1, t));
  if(kind === 'temp'){
    /* 温度计：玻璃管 + 液柱高度跟着走 */
    box(g, x-7, y-38, 14, 54, 7, C.box, C.boxLine, 1.3);
    g.save(); g.fillStyle = C.hot;
    g.beginPath(); g.arc(x, y+18, 10, 0, EC.TAU); g.fill();
    g.fillRect(x-4, y+10 - 44*t, 8, 44*t);       /* 液柱：从球顶往上长，别起在球肚子里 */
    g.restore();
  }else if(kind === 'light'){
    const R = 13;
    g.save();
    const gr = g.createRadialGradient(x, y, R*0.6, x, y, R*2.6);
    gr.addColorStop(0, 'rgba(255,215,106,'+(0.10+0.42*t).toFixed(3)+')');
    gr.addColorStop(1, 'rgba(255,215,106,0)');
    g.fillStyle = gr;
    g.beginPath(); g.arc(x, y, R*2.6, 0, EC.TAU); g.fill(); g.restore();
    g.save(); g.fillStyle = t > 0.06 ? C.lamp : C.lampOff;
    g.beginPath(); g.arc(x, y, R, 0, EC.TAU); g.fill(); g.restore();
    g.save(); g.strokeStyle = t > 0.06 ? C.lamp : C.lampOff; g.lineWidth = 2; g.lineCap='round';
    for(let i=0;i<8;i++){
      const a = i*Math.PI/4;
      g.beginPath();
      g.moveTo(x+Math.cos(a)*(R+4), y+Math.sin(a)*(R+4));
      g.lineTo(x+Math.cos(a)*(R+6+8*t), y+Math.sin(a)*(R+6+8*t));
      g.stroke();
    }
    g.restore();
  }else if(kind === 'humid'){
    /* 水滴，数量跟着湿度走 */
    const n = 1 + Math.round(t*5);
    for(let i=0;i<n;i++){
      const dx = ((i%3)-1)*13, dy = (i<3 ? -10 : 12) + ((i%2)?3:0);
      g.save(); g.fillStyle = C.acc; g.globalAlpha = 0.55 + 0.45*t;
      g.beginPath();
      g.moveTo(x+dx, y+dy-9);
      g.bezierCurveTo(x+dx+7, y+dy-1, x+dx+6, y+dy+7, x+dx, y+dy+7);
      g.bezierCurveTo(x+dx-6, y+dy+7, x+dx-7, y+dy-1, x+dx, y+dy-9);
      g.fill(); g.restore();
    }
  }else if(kind === 'gas'){
    const n = 2 + Math.round(t*6);
    g.save(); g.globalAlpha = 0.28 + 0.5*t; g.fillStyle = C.warn;
    for(let i=0;i<n;i++){
      const a = i*1.7, rr = 5 + (i%3)*3;
      g.beginPath(); g.arc(x + Math.cos(a)*16, y + Math.sin(a)*14, rr, 0, EC.TAU); g.fill();
    }
    g.restore();
  }
}

/* ================================================================
   场景 1：传感器干什么 —— 非电量进去，电信号出来
   ================================================================ */
const KINDS = [
  { t:'温度', icon:'temp', unit:' ℃', v0:0,  v1:100, def:25,
    t0:'0 ℃', t1:'100 ℃', out:'电阻',
    /* NTC 的 B 值模型：R = R25·exp(B(1/T − 1/298.15))，R25 = 10 kΩ、B = 3950
       —— 都是市面上最常见的那一档，量级对得上，具体型号以规格书为准 */
    f:function(v){ return 10 * Math.exp(3950*(1/(v+273.15) - 1/298.15)); },
    fmt:function(r){ return r >= 10 ? r.toFixed(1) + ' kΩ' : r.toFixed(2) + ' kΩ'; },
    up:'温度越高，阻值越小' },
  { t:'光照', icon:'light', unit:'%', v0:0, v1:100, def:50,
    t0:'全黑', t1:'强光', out:'电阻',
    f:function(v){ return 500 * Math.pow(0.001, v/100); },
    fmt:function(r){ return r >= 100 ? Math.round(r) + ' kΩ' : (r >= 1 ? r.toFixed(1) + ' kΩ' : (r*1000).toFixed(0) + ' Ω'); },
    up:'越亮，阻值越小' },
  { t:'湿度', icon:'humid', unit:'%RH', v0:0, v1:100, def:50,
    t0:'很干', t1:'很潮', out:'电阻',
    f:function(v){ return 800 * Math.pow(0.004, v/100); },
    fmt:function(r){ return r >= 100 ? Math.round(r) + ' kΩ' : (r >= 1 ? r.toFixed(1) + ' kΩ' : (r*1000).toFixed(0) + ' Ω'); },
    up:'越潮，阻值越小' }
];
const S1 = { k:0, v:25 };
const st1 = new Stage('cv0', 360, 300);

function draw1(){
  const g = st1.g; st1.clear();
  const K = KINDS[S1.k];
  EP.heading(g, 20, 16, '传感器把「' + K.t + '」翻译成「' + K.out + '」');

  const t = (S1.v - K.v0) / (K.v1 - K.v0);
  /* 左：被测的东西 */
  inputIcon(g, 60, 92, K.icon, t);
  txt(g, S1.v + K.unit, 60, 140, {sz:12.5, b:1, c:C.tx});
  txt(g, '被测的量', 60, 154, {sz:9, c:C.tx3});
  /* 中：传感器 */
  box(g, 118, 60, 118, 66, 6, C.card, C.acc, 1.6);
  txt(g, '敏感元件', 177, 78, {sz:10.5, b:1, c:C.acc});
  g.save(); g.strokeStyle = C.boxLine; g.lineWidth = 1;
  g.beginPath(); g.moveTo(126, 92); g.lineTo(228, 92); g.stroke(); g.restore();
  txt(g, '转换电路', 177, 108, {sz:10.5, b:1, c:C.tx2});
  txt(g, '传感器', 177, 140, {sz:10.5, b:1, c:C.tx2});
  txt(g, '一头接物理世界，一头吐电信号', 177, 154, {sz:9, c:C.tx3});
  EC.head(g, 110, 93, 1, 0, 6, C.acc);
  EC.head(g, 250, 93, 1, 0, 6, C.acc);
  /* 右：输出 */
  const R = K.f(S1.v);
  EP.readout(g, 258, 74, 82, 38, K.fmt(R), {sz:13});
  txt(g, '输出', 299, 140, {sz:10.5, b:1, c:C.tx2});
  txt(g, K.out, 299, 154, {sz:9, c:C.tx3});

  curve(g, {x:24, y:186, w:312, h:96}, {
    x0:K.v0, x1:K.v1, mx:S1.v, f:K.f, ylog:true,
    xlab:'← ' + K.t0 + '　　' + K.t + '　　' + K.t1 + ' →',
    ylab:'输出阻值（对数刻度）', hiLab:K.up
  });
}
function note1(){
  const K = KINDS[S1.k], R = K.f(S1.v);
  $('s1vlab').textContent = S1.v + K.unit;
  $('s1t0').textContent = K.t0; $('s1t1').textContent = K.t1;
  $('s1a').textContent = S1.v + K.unit;
  $('s1b').textContent = K.fmt(R);
  const lo = Math.log(Math.min(K.f(K.v0), K.f(K.v1)));
  const hi = Math.log(Math.max(K.f(K.v0), K.f(K.v1)));
  const q = (Math.log(R) - lo) / ((hi - lo) || 1);
  $('s1c').textContent = q < 0.33 ? '偏小' : (q < 0.67 ? '中等' : '偏大');
  $('n0').innerHTML =
    '<div class="st">现在：' + S1.v + K.unit + ' → ' + K.fmt(R) + '</div>' +
    '拖滑杆的时候盯住下面那条曲线：<b>' + K.up + '</b>。<br>' +
    '<b>纵轴是对数刻度</b> —— 不这么画的话看不出名堂，因为这类元件的阻值'+
    '从一头到另一头能差<b>几百上千倍</b>，线性画出来大半段全贴在底下。<br>' +
    '<span class="sub">曲线是<b>弯的</b>，不是直线 —— 所以后面的电路不能简单地'+
    '「阻值×一个系数」就当成温度用，要么查表、要么用专门的变送器。'+
    'Pt100 之所以贵一点，就是因为它<b>够直</b>（下一屏对比给你看）。</span>';
}
document.getElementById('s1p').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S1.k = +b.dataset.k;
  document.querySelectorAll('#s1p .btn').forEach(function(t){ t.classList.toggle('on', +t.dataset.k===S1.k); });
  const K = KINDS[S1.k];
  S1.v = K.def;
  const sl = $('s1v'); sl.min = K.v0; sl.max = K.v1; sl.value = K.def;
  note1(); draw1();
});
$('s1v').addEventListener('input', function(){ S1.v = +this.value; note1(); draw1(); });

/* ================================================================
   场景 2：测温度的四种器件
   ================================================================
   四条曲线都用公开的标准式或典型参数，量级对得上，别当成某个具体型号的实测值：
   - NTC：B 值模型，R25 = 10 kΩ、B = 3950（最常见的一档）
   - PTC：按 DIN 44081（电动机埋置式热保护）那几个检查点凑的，Tref = 120 ℃。
     算出来 100 ℃ 时 82 Ω、115 ℃ 时 152 Ω、125 ℃ 时 1330 Ω、135 ℃ 时两万多欧 ——
     标准要求 Tref−20K ≤250、Tref−5K ≤550、Tref+5K ≥1330、Tref+15K ≥4000，都卡住了
   - Pt100：Callendar–Van Dusen 正温段 R = 100(1 + 3.9083e−3·T − 5.775e−7·T²)。
     **这是标准公式，别凭记忆改数**。查一个点：100 ℃ → 138.5 Ω
   - K 型热电偶：E ≈ 0.041·T 毫伏（线性近似）。100 ℃ 约 4.1 mV、200 ℃ 约 8.2 mV */
const DEV = [
  { t:'NTC 热敏电阻', sym:'ntc', out:'电阻', trend:'阻值变小', ylab:'阻值（对数刻度）',
    f:function(T){ return 10 * Math.exp(3950*(1/(T+273.15) - 1/298.15)); },
    fmt:function(r){ return r >= 100 ? Math.round(r) + ' kΩ'
                          : (r >= 1 ? r.toFixed(1) + ' kΩ' : (r*1000).toFixed(0) + ' Ω'); } },
  { t:'PTC 热敏电阻', sym:'ptc', out:'电阻', trend:'阻值变大', ylab:'阻值（对数刻度）',
    f:function(T){ return Math.min(100, (80 + 300*Math.exp((T-120)/3.5))/1000); },
    fmt:function(r){ return r >= 100 ? '> 100 kΩ'
                          : (r >= 1 ? r.toFixed(1) + ' kΩ' : (r*1000).toFixed(0) + ' Ω'); } },
  { t:'Pt100 铂电阻', sym:'pt', out:'电阻', trend:'阻值变大（很直）', ylab:'阻值（线性刻度）',
    f:function(T){ return 100*(1 + 3.9083e-3*T - 5.775e-7*T*T); },
    fmt:function(r){ return r.toFixed(1) + ' Ω'; }, lin:true },
  { t:'K 型热电偶', sym:'tc', out:'毫伏电压', trend:'电压变大', ylab:'输出（线性刻度）',
    f:function(T){ return 0.041*T; },
    fmt:function(v){ return v.toFixed(2) + ' mV'; }, lin:true }
];
const S2 = { k:0, T:25 };
const st2 = new Stage('cv1', 360, 300);

function draw2(){
  const g = st2.g; st2.clear();
  const D = DEV[S2.k];
  EP.heading(g, 20, 16, D.t, '（温度 → ' + D.out + '）');
  const cx = 180, cy = 96;

  if(D.sym === 'ntc' || D.sym === 'ptc'){
    /* 国标热敏电阻：电阻矩形 + 一根斜穿过去的线，斜线端上标 θ */
    g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.4; g.lineCap='round';
    g.beginPath(); g.moveTo(cx-72, cy); g.lineTo(cx-24, cy); g.stroke();
    g.beginPath(); g.moveTo(cx+24, cy); g.lineTo(cx+72, cy); g.stroke();
    g.restore();
    box(g, cx-24, cy-13, 48, 26, 3, C.box, C.wire, 2);
    g.save(); g.strokeStyle = C.acc; g.lineWidth = 2.2; g.lineCap='round';
    g.beginPath(); g.moveTo(cx-34, cy+20); g.lineTo(cx+30, cy-22); g.stroke();
    g.restore();
    txt(g, 'θ', cx+36, cy-26, {sz:12, b:1, c:C.acc});
    /* 标在矩形**外面**：写在正中会被那条斜线穿过去（截图抓到的） */
    txt(g, D.sym === 'ntc' ? '−t°' : '+t°', cx+30, cy+24, {sz:11, b:1, c:C.tx2, al:'left'});
    EP.terminal(g, cx-72, cy, 4); EP.terminal(g, cx+72, cy, 4);
    txt(g, D.sym === 'ntc' ? 'NTC：负温度系数' : 'PTC：正温度系数',
        cx, cy+44, {sz:10.5, b:1, c:C.tx2});
    txt(g, D.sym === 'ntc' ? '（温度↑ 阻值↓，反着走）' : '（温度↑ 阻值↑，一块儿走）',
        cx, cy+58, {sz:9, c:C.tx3});
  }else if(D.sym === 'pt'){
    g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.4; g.lineCap='round';
    g.beginPath(); g.moveTo(cx-72, cy); g.lineTo(cx-26, cy); g.stroke();
    g.beginPath(); g.moveTo(cx+26, cy); g.lineTo(cx+72, cy); g.stroke();
    /* 三线制那第三根：补偿线 */
    g.beginPath(); g.moveTo(cx+26, cy); g.lineTo(cx+50, cy); g.lineTo(cx+50, cy+30);
    g.lineTo(cx+72, cy+30); g.stroke();
    g.restore();
    box(g, cx-26, cy-13, 52, 26, 3, C.box, C.wire, 2);
    txt(g, 'Pt100', cx, cy, {sz:11, b:1, c:C.tx2});
    EP.terminal(g, cx-72, cy, 4); EP.terminal(g, cx+72, cy, 4);
    EP.terminal(g, cx+72, cy+30, 4);
    txt(g, '0 ℃ 时正好 100 Ω', cx, cy+58, {sz:10.5, b:1, c:C.acc});
    txt(g, '第三根是补偿线，用来抵消引线电阻', cx, cy+72, {sz:9, c:C.tx3});
  }else{
    /* 热电偶：两种金属焊在一起，测量端在左、冷端接仪表在右 */
    g.save(); g.lineCap='round'; g.lineWidth = 2.6;
    g.strokeStyle = EP.P.copper;
    g.beginPath(); g.moveTo(cx-66, cy); g.lineTo(cx+6, cy-14); g.stroke();
    g.strokeStyle = EP.P.steel;
    g.beginPath(); g.moveTo(cx-66, cy); g.lineTo(cx+6, cy+14); g.stroke();
    g.restore();
    g.save(); g.fillStyle = C.hot;
    g.beginPath(); g.arc(cx-66, cy, 6, 0, EC.TAU); g.fill(); g.restore();
    txt(g, '测量端（热端）', cx-66, cy+26, {sz:9, c:C.tx3});
    txt(g, '两种不同的金属', cx-24, cy-30, {sz:9, c:C.tx3});
    g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.2; g.lineCap='round';
    g.beginPath(); g.moveTo(cx+6, cy-14); g.lineTo(cx+40, cy-14); g.stroke();
    g.beginPath(); g.moveTo(cx+6, cy+14); g.lineTo(cx+40, cy+14); g.stroke();
    g.restore();
    EC.meter(g, cx+58, cy, 17, 'mV');
    txt(g, '冷端在这头，仪表要自动补偿', cx+6, cy+50, {sz:9, c:C.tx3});
  }

  curve(g, {x:24, y:196, w:312, h:86}, {
    x0:-20, x1:200, mx:S2.T, f:D.f, ylog:!D.lin,
    xlab:'← −20 ℃　　温度　　200 ℃ →',
    ylab:D.ylab, hiLab:'温度升高 → ' + D.trend
  });
}
function note2(){
  const D = DEV[S2.k], v = D.f(S2.T);
  $('s2tlab').textContent = S2.T + ' ℃';
  $('s2a').textContent = S2.T + ' ℃';
  $('s2b').textContent = D.fmt(v);
  $('s2c').textContent = D.trend;
  const extra = [
    '它<b>不直</b> —— 曲线是往下弯的，所以测温要查表或者用带线性化的模块。'+
    '好处是<b>灵敏、便宜</b>：几十度的变化阻值能差好几倍。'+
    '<span class="sub">另一个常见用法跟测温无关：串在电源入口当<b>浪涌抑制</b> —— '+
    '刚上电时它是凉的、阻值大，挡住冲击电流；通着通着自己热了、阻值掉下来，不怎么耗电。</span>',
    '<b>它不是用来「测多少度」的，是用来「到没到」的。</b>'+
    '看曲线：120 ℃ 之前几乎是平的（都是一两百欧），一过 120 ℃ <b>直接窜上去几千几万欧</b>。'+
    '<span class="sub">所以埋在电动机绕组里最合适：平时保护模块什么都读不到，'+
    '一超温阻值陡增，模块立刻切接触器。这就是 2.3 节说的「温度继电器」那条路。</span>',
    '<b>看这条曲线有多直</b> —— 这就是它值钱的地方，也是工业上把它当标准的原因。'+
    '0 ℃ 正好 100 Ω，100 ℃ 是 ' + DEV[2].f(100).toFixed(1) + ' Ω。<br>'+
    '<span class="sub">现场三根线的居多：多的那根是<b>补偿线</b>。'+
    '两线制在线拉长之后，引线本身那点电阻会被当成温度算进去，<b>读数偏高</b>。</span>',
    '<b>它自己会发电</b>，不用外接电源 —— 两种金属接在一起，两端有温差就出电压（塞贝克效应）。'+
    '所以它量的是<b>温差</b>不是绝对温度，仪表必须知道冷端多少度再补回来，这叫<b>冷端补偿</b>。<br>'+
    '<span class="sub">输出只有<b>毫伏级</b>（200 ℃ 才 ' + DEV[3].f(200).toFixed(2) + ' mV），'+
    '所以特别怕干扰、怕接触电阻。延长必须用配套的<b>补偿导线</b>，而且极性不能反。</span>'
  ][S2.k];
  $('n1').innerHTML = '<div class="st">' + D.t + '：' + S2.T + ' ℃ → ' + D.fmt(v) + '</div>' + extra;
}
document.getElementById('s2p').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S2.k = +b.dataset.k;
  document.querySelectorAll('#s2p .btn').forEach(function(t){ t.classList.toggle('on', +t.dataset.k===S2.k); });
  note2(); draw2();
});
$('s2t').addEventListener('input', function(){ S2.T = +this.value; note2(); draw2(); });

/* ================================================================
   场景 3：光 · 湿 · 气
   ================================================================ */
const PH = [
  { t:'光敏电阻', name:'光照强度', t0:'全黑', t1:'强光', def:50,
    f:function(v){ return 500 * Math.pow(0.001, v/100); },
    fmt:function(r){ return r >= 100 ? Math.round(r)+' kΩ' : (r>=1 ? r.toFixed(1)+' kΩ' : (r*1000).toFixed(0)+' Ω'); },
    thr:20, below:true, act:'路灯亮了', idle:'路灯不亮', act2:'天黑到一定程度才亮' },
  { t:'光电开关', name:'遮挡程度', t0:'没挡住', t1:'完全挡住', def:0,
    f:function(v){ return v; }, fmt:function(v){ return v >= 50 ? '输出接通' : '输出断开'; },
    thr:50, below:false, act:'检测到物体', idle:'没检测到', act2:'挡住光束就动作' },
  { t:'湿敏元件', name:'相对湿度', t0:'很干', t1:'很潮', def:50,
    f:function(v){ return 800 * Math.pow(0.004, v/100); },
    fmt:function(r){ return r >= 100 ? Math.round(r)+' kΩ' : (r>=1 ? r.toFixed(1)+' kΩ' : (r*1000).toFixed(0)+' Ω'); },
    thr:70, below:false, act:'除湿机起动', idle:'除湿机停着', act2:'潮到一定程度才起动' },
  { t:'气敏元件', name:'气体浓度', t0:'没有', t1:'很浓', def:0,
    f:function(v){ return 200 * Math.pow(0.01, v/100); },
    fmt:function(r){ return r >= 100 ? Math.round(r)+' kΩ' : (r>=1 ? r.toFixed(1)+' kΩ' : (r*1000).toFixed(0)+' Ω'); },
    thr:30, below:false, act:'报警器响了', idle:'安静', act2:'超过设定浓度就报警' }
];
const S3 = { k:0, v:50 };
const st3 = new Stage('cv2', 360, 290);
function s3Act(){
  const P = PH[S3.k];
  return P.below ? (S3.v < P.thr) : (S3.v >= P.thr);
}

function draw3(){
  const g = st3.g; st3.clear();
  const P = PH[S3.k], on = s3Act(), t = S3.v/100;
  EP.heading(g, 20, 16, P.t, '（' + P.act2 + '）');

  if(S3.k === 1){
    /* 光电开关：发射 → 光束 → 接收，中间伸进来一块挡板 */
    box(g, 40, 76, 36, 42, 4, EP.P.body, EP.P.bakeliteL, 1.3);
    txt(g, '发射', 58, 130, {sz:9, c:C.tx3});
    box(g, 284, 76, 36, 42, 4, EP.P.body, EP.P.bakeliteL, 1.3);
    txt(g, '接收', 302, 130, {sz:9, c:C.tx3});
    /* 光束：被挡掉的那一段不画 */
    const x0 = 76, x1 = 284, cut = x0 + (x1-x0)*(1 - t);
    g.save(); g.strokeStyle = C.lamp; g.lineWidth = 3; g.lineCap='round';
    g.globalAlpha = 0.85;
    g.beginPath(); g.moveTo(x0, 97); g.lineTo(Math.max(x0, cut), 97); g.stroke();
    g.restore();
    if(t > 0.01){
      box(g, cut - 2, 52, 30, 46, 3, EP.P.steelD, EP.P.steelDD, 1.2);
      txt(g, '物体', cut + 13, 42, {sz:9, c:C.tx3});
    }
  }else{
    inputIcon(g, 62, 92, S3.k === 0 ? 'light' : (S3.k === 2 ? 'humid' : 'gas'), t);
    txt(g, S3.v + '%', 62, 138, {sz:12, b:1, c:C.tx});
    /* 敏感元件符号：电阻矩形 + 两根斜箭头（受光/受气影响） */
    const cx = 180, cy = 96;
    g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.4; g.lineCap='round';
    g.beginPath(); g.moveTo(cx-56, cy); g.lineTo(cx-22, cy); g.stroke();
    g.beginPath(); g.moveTo(cx+22, cy); g.lineTo(cx+56, cy); g.stroke();
    g.restore();
    box(g, cx-22, cy-13, 44, 26, 3, C.box, C.wire, 2);
    g.save(); g.lineCap='round';
    [0, 1].forEach(function(i){
      EC.head(g, cx-10+i*14, cy-18, 0.7, 0.7, 5.5, C.acc);
      g.strokeStyle = C.acc; g.lineWidth = 1.6;
      g.beginPath(); g.moveTo(cx-24+i*14, cy-32); g.lineTo(cx-13+i*14, cy-21); g.stroke();
    });
    g.restore();
    EP.terminal(g, cx-56, cy, 4); EP.terminal(g, cx+56, cy, 4);
    txt(g, P.fmt(P.f(S3.v)), cx, cy+34, {sz:12.5, b:1, c:C.acc});
    txt(g, '当前阻值', cx, cy+48, {sz:9, c:C.tx3});
  }

  /* 右边：后面那一路动没动 */
  const lx = 306, ly = 176;
  g.save();
  if(on){
    g.globalAlpha = .28; g.fillStyle = C.ok;
    g.beginPath(); g.arc(lx, ly, 22, 0, EC.TAU); g.fill(); g.globalAlpha = 1;
  }
  g.fillStyle = on ? C.ok : C.lampOff;
  g.beginPath(); g.arc(lx, ly, 11, 0, EC.TAU); g.fill();
  g.restore();
  txt(g, on ? P.act : P.idle, lx, ly + 26, {sz:10, b:1, c: on ? C.ok : C.tx3, al:'center'});

  /* 阈值条：当前值 + 设定的动作点 */
  const bx = 24, bw = 250, by = 200, bh = 18;
  txt(g, P.name, bx, 188, {sz:9, c:C.tx3, al:'left'});
  box(g, bx, by, bw, bh, 5, C.box, C.boxLine, 1);
  box(g, bx+2, by+2, Math.max(3, (bw-4)*t), bh-4, 4, on ? C.ok : C.acc, null, 0);
  const tx = bx + bw*P.thr/100;
  g.save(); g.strokeStyle = C.warn; g.lineWidth = 2; g.setLineDash([3,2]);
  g.beginPath(); g.moveTo(tx, by-6); g.lineTo(tx, by+bh+6); g.stroke(); g.restore();
  /* 动作点靠左时把标注甩到虚线右边，不然会和条左端的说明叠在一起 */
  txt(g, '动作点 ' + P.thr + '%', tx + (P.thr < 30 ? 6 : 0), by+bh+16,
      {sz:8.5, c:C.warn, al: P.thr < 30 ? 'left' : 'center'});
  txt(g, P.t1, bx+bw, 188, {sz:8.5, c:C.tx3, al:'right'});

  box(g, 20, 244, 320, 30, 6, on ? C.okbg : C.box, on ? C.ok : C.boxLine, 1.2);
  txt(g, on ? '越过动作点了 —— ' + P.act : '还没到动作点 —— ' + P.idle,
      180, 259, {sz:10.5, b:1, c: on ? C.ok : C.tx2});
}
function note3(){
  const P = PH[S3.k], on = s3Act();
  $('s3vname').textContent = P.name;
  $('s3vlab').textContent = S3.v + '%';
  $('s3t0').textContent = P.t0; $('s3t1').textContent = P.t1;
  $('s3a').textContent = S3.v + '%';
  $('s3b').textContent = P.fmt(P.f(S3.v));
  $('s3c').textContent = on ? P.act : P.idle;
  const body = [
    '光照越强，阻值越小 —— 全黑时几百千欧，强光下只剩几百欧，<b>差上千倍</b>。<br>'+
    '路灯自动开关就是拿它串一个分压电路：天黑 → 阻值涨 → 分压点电压变化 → 推动继电器。<br>'+
    '<span class="sub">注意动作点两边要留<b>回差</b>，不然天刚擦黑的时候灯会一开一关地抖。</span>',
    '它输出的是<b>开关量</b>，不是阻值 —— 通和断两个状态，直接送进 PLC 输入或继电器线圈。<br>'+
    '<b>这一屏演的是对射式</b>：发射和接收分两头装，中间挡住就动作，最可靠、距离最远。<br>'+
    '<span class="sub">下一屏讲它的三根线怎么接 —— 那才是现场最容易接错的地方。</span>',
    '吸了潮气之后阻值（或电容）跟着变。配电柜里常配<b>加热除湿</b>：湿度一高就通电加热，'+
    '把柜内湿气赶走 —— 潮气会让绝缘下降、端子生锈，是低压柜最常见的隐患之一。',
    '碰到目标气体，敏感层表面的阻值<b>陡降</b>。燃气报警、烟感、地下车库排风联动都用它。<br>'+
    '<b>装的位置比选型还重要：</b>天然气比空气轻要装高处，液化气比空气重要装低处。<br>'+
    '<span class="sub">它有寿命（一般几年）也会漂移，是要定期标定和更换的器件，不是装上就不管了。</span>'
  ][S3.k];
  $('n2').innerHTML = '<div class="st' + (on ? ' good' : '') + '">' +
    P.t + '：' + S3.v + '% → ' + (on ? P.act : P.idle) + '</div>' + body;
}
document.getElementById('s3p').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S3.k = +b.dataset.k;
  document.querySelectorAll('#s3p .btn').forEach(function(t){ t.classList.toggle('on', +t.dataset.k===S3.k); });
  S3.v = PH[S3.k].def; $('s3v').value = S3.v;
  note3();
});
$('s3v').addEventListener('input', function(){ S3.v = +this.value; note3(); });

/* ================================================================
   场景 4：三线制接近开关，NPN 和 PNP 怎么接
   ================================================================
   两种接法只差一处：**负载的另一端接哪根母线**。
   画面上其余全都一样，就是为了让这一处差别自己跳出来。 */
const S4 = { pnp:false, near:false, k:0, ph:0 };
const st4 = new Stage('cv3', 360, 346);
const V24 = 48, V0 = 300;                 /* 两根母线的 y */
const SW = { x:70, y:152, w:76, h:92 };   /* 开关本体 */

function draw4(dt){
  const g = st4.g; st4.clear();
  const tk = S4.near ? 1 : 0;
  S4.k += (tk - S4.k) * Math.min(1, dt*14);
  const on = S4.k > 0.5;                  /* 检测到 = 输出管导通 */
  if(on) S4.ph += dt*70;
  const pnp = S4.pnp;
  EP.heading(g, 20, 16, pnp ? 'PNP（源型）接法' : 'NPN（漏型）接法',
             pnp ? '动作时黑线接到 ＋24V' : '动作时黑线接到 0V');

  /* ---- 两根母线 ---- */
  g.save(); g.lineCap='round';
  g.strokeStyle = EP.WIRE_C.red; g.lineWidth = 2.8;
  g.beginPath(); g.moveTo(36, V24); g.lineTo(340, V24); g.stroke();
  g.strokeStyle = EP.WIRE_C.blue;
  g.beginPath(); g.moveTo(36, V0); g.lineTo(340, V0); g.stroke();
  g.restore();
  txt(g, '＋24V', 36, V24-12, {sz:10, b:1, c:EP.WIRE_C.red, al:'left'});
  /* 0V 标注要放母线**上方**：放下面会被底下那条结论条盖住（截图抓到的） */
  txt(g, '0V', 36, V0-12, {sz:10, b:1, c:EP.WIRE_C.blue, al:'left'});

  /* ---- 接近开关本体 ---- */
  box(g, SW.x, SW.y, SW.w, SW.h, 6, EP.P.body, EP.P.bakeliteL, 1.4);
  /* 检测面朝上，那一条黄边就是感应面 */
  box(g, SW.x+4, SW.y-4, SW.w-8, 8, 3, on ? C.lamp : EP.P.brassD, EP.P.brassD, 1);
  /* 这两行字靠**右**排，内部走线走**左**边 —— 都居中的话竖线正好从字中间穿过去 */
  txt(g, '接近开关', SW.x+SW.w-6, SW.y+SW.h-13, {sz:9.5, b:1, c:EP.P.ink, al:'right'});
  txt(g, pnp ? 'PNP' : 'NPN', SW.x+SW.w-6, SW.y+SW.h-29, {sz:11, b:1, c:C.acc, al:'right'});
  /* 金属块：靠近时压到感应面上 */
  const my = 106 + S4.k*30;      /* 靠近时正好压到感应面上 */
  box(g, SW.x+14, my, 48, 24, 3, EP.P.steel, EP.P.steelDD, 1.2);
  txt(g, '金属', SW.x+38, my+12, {sz:9, b:1, c:EP.P.bakelite});
  if(on){
    g.save(); g.globalAlpha = .5; g.strokeStyle = C.lamp; g.lineWidth = 2;
    for(let i=1;i<=2;i++){
      g.beginPath(); g.arc(SW.x+SW.w/2, SW.y, 12+i*9, -Math.PI*0.85, -Math.PI*0.15); g.stroke();
    }
    g.restore();
  }

  /* ---- 三根线 ---- */
  /* 内部输出管那条线要往上让，不然和本体上「NPN / 接近开关」两行字挤成一团 */
  const BNy = SW.y+18, BKy = SW.y+44, BUy = SW.y+SW.h;
  /* 棕：左侧出去，上到 +24V */
  const bn = new Path([[SW.x, BNy],[46, BNy],[46, V24]]);
  bn.stroke(g, 2.6, '#a06a3c');            /* 棕线：真实线色，不跟主题走 */
  txt(g, '棕', 52, BNy-11, {sz:9, b:1, c:'#c08040', al:'left'});
  /* 蓝：底部出去，下到 0V。出口对齐内部走线那条竖线（INX），别走正中 */
  const INX = SW.x + 16;
  const bu = new Path([[INX, BUy],[INX, V0]]);
  bu.stroke(g, 2.6, EP.WIRE_C.blue);
  txt(g, '蓝', INX+7, V0-16, {sz:9, b:1, c:EP.WIRE_C.blue, al:'left'});
  /* 黑：右侧出去，到负载 */
  const bk = new Path([[SW.x+SW.w, BKy],[206, BKy]]);
  bk.stroke(g, 2.6, C.wire);
  txt(g, '黑（信号）', 152, BKy-12, {sz:9, b:1, c:C.tx2, al:'left'});

  /* ---- 内部输出管：接哪一头，就是 NPN / PNP 的全部区别 ---- */
  const midx = SW.x+SW.w/2;
  g.save(); g.strokeStyle = on ? C.ok : C.tx3; g.lineWidth = 2; g.lineCap='round';
  g.beginPath();
  g.moveTo(SW.x+SW.w, BKy); g.lineTo(midx+15, BKy);
  g.stroke();
  g.beginPath();
  g.moveTo(midx-15, BKy); g.lineTo(INX, BKy);
  if(pnp){ g.lineTo(INX, BNy); g.lineTo(SW.x, BNy); }
  else    { g.lineTo(INX, BUy); }
  g.stroke(); g.restore();
  EC.switchSym(g, midx, BKy, on, {len:30, color: on ? C.ok : C.tx3});

  /* ---- 负载 ---- */
  const LX = 206, LW = 106, LY = BKy-24;
  box(g, LX, LY, LW, 48, 6, on ? C.okbg : C.box, on ? C.ok : C.boxLine, 1.4);
  txt(g, 'PLC 输入 / KA', LX+LW/2, LY+18, {sz:10.5, b:1, c: on ? C.ok : C.tx2});
  txt(g, on ? '得电了' : '没得电', LX+LW/2, LY+34, {sz:10, b:1, c: on ? C.ok : C.tx3});
  /* 负载的另一端：NPN 往上接 ＋24V，PNP 往下接 0V —— **全部区别就在这一根线** */
  const rx = LX+LW;
  g.save(); g.lineCap='round'; g.lineWidth = 2.6;
  g.strokeStyle = pnp ? EP.WIRE_C.blue : EP.WIRE_C.red;
  g.beginPath(); g.moveTo(rx, BKy); g.lineTo(330, BKy);
  g.lineTo(330, pnp ? V0 : V24); g.stroke(); g.restore();
  EC.node(g, 330, pnp ? V0 : V24);
  EP.chip(g, pnp ? '负载另一端 → 0V' : '负载另一端 → ＋24V', 268, pnp ? 268 : 82,
          {sz:9.5, b:1, c: pnp ? EP.WIRE_C.blue : EP.WIRE_C.red});

  /* ---- 导通时把整条回路的电流点跑起来 ---- */
  if(on){
    const loopPath = pnp
      ? new Path([[46,V24],[46,BNy],[SW.x,BNy],[INX,BNy],[INX,BKy],
                  [SW.x+SW.w,BKy],[LX,BKy],[rx,BKy],[330,BKy],[330,V0]])
      : new Path([[330,V24],[330,BKy],[rx,BKy],[LX,BKy],[SW.x+SW.w,BKy],
                  [INX,BKy],[INX,V0]]);
    EP.flow(g, loopPath, {phase:S4.ph, gap:44, kind:'cur', size:5});
  }

  box(g, 20, 314, 320, 26, 6, on ? C.okbg : C.box, on ? C.ok : C.boxLine, 1.2);
  txt(g, on
        ? (pnp ? '黑线被接到 ＋24V → 电流从开关流出去、穿过负载回 0V'
               : '黑线被接到 0V → 电流从 ＋24V 穿过负载、流进开关')
        : '没检测到 —— 输出管断开，负载那一路不通',
      180, 327, {sz:10, b:1, c: on ? C.ok : C.tx2});
}
function note4(){
  const on = S4.near, pnp = S4.pnp;
  $('s4go').textContent = on ? '让金属离开' : '让金属靠近';
  $('s4a').textContent = on ? '检测到了' : '没有';
  $('s4b').textContent = on ? (pnp ? '＋24V（高）' : '0V（低）')
                            : (pnp ? '悬空（低）' : '悬空（高）');
  $('s4c').textContent = on ? '得电了' : '没动作';
  $('n3').innerHTML = on
    ? '<div class="st good">' + (pnp ? 'PNP：开关往外「供」电流' : 'NPN：开关往里「吸」电流') + '</div>'+
      (pnp
        ? '输出管把<b>黑线接到了棕线（＋24V）</b>，于是电流：'+
          '＋24V → 棕线 → 开关内部 → 黑线 → <b>负载</b> → 0V。<br>'+
          '<b>所以负载的另一端必须接 0V</b>。接成 ＋24V 的话两头都是 24V，没有电位差，不动作。'
        : '输出管把<b>黑线接到了蓝线（0V）</b>，于是电流：'+
          '＋24V → <b>负载</b> → 黑线 → 开关内部 → 蓝线 → 0V。<br>'+
          '<b>所以负载的另一端必须接 ＋24V</b>。接成 0V 的话两头都是 0V，不动作。')+
      '<br><span class="sub">对着画面数一遍那条橙色路线：起点是 ＋24V，终点是 0V，'+
      '中间必须<b>穿过负载</b>才算数。这就是全部道理。</span>'
    : '<div class="st">现在输出管是断的</div>'+
      '棕线和蓝线一直有电（那是给开关自己供电的），<b>黑线这一路是断的</b>，负载不动作。<br>'+
      '<b>先看清楚一件事：两种接法的差别只有一根线</b> —— 画面右边那根从负载引出去的线，'+
      'NPN 往上接 ＋24V，PNP 往下接 0V。其余部分一模一样。<br>'+
      '<span class="sub">点上面的按钮让金属靠近，看电流从哪儿走到哪儿。</span>';
}
document.getElementById('s4p').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S4.pnp = (+b.dataset.k === 1);
  document.querySelectorAll('#s4p .btn').forEach(function(t){
    t.classList.toggle('on', (+t.dataset.k === 1) === S4.pnp);
  });
  note4();
});
$('s4go').addEventListener('click', function(){ S4.near = !S4.near; note4(); });

/* ================================================================
   绑定
   ================================================================ */
function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:2, sec:'2.4'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('2.4');
  let h = '';
  h += nb.prev ? '<a href="'+nb.prev.f+'">‹ '+nb.prev.id+' '+nb.prev.t+'</a>'
               : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next ? '<a class="next" href="'+nb.next.f+'">'+nb.next.id+' '+nb.next.t+' ›</a>'
               : '<span>后面几节还没做</span>';
  $('pager').innerHTML = h;
})();

loop(function(dt){
  if(cur === 0) draw1();
  else if(cur === 1) draw2();
  else if(cur === 2) draw3();
  else draw4(dt);
});
  }
});
})();
