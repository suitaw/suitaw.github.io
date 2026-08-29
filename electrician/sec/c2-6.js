/* 2.6 变压器 —— 本节内容的唯一真相。
   对应《零基础学电工》第 2 章 2.6 节（书内 P42~P43）。

   取舍：书上讲单相/三相两种结构，我按**电柜里真会碰到的**排 ——
   匝数比（原理）→ 四种变压器（重点是「自耦不隔离」这条安全线）
   → 互感器（CT 二次不许开路，这是配电房的头号事故）→ 怎么量、怎么判坏。 */
(function(){
'use strict';
ELEC.reg({
  id: '2.6',
  file: 'c2-6.html',
  title: '2.6 变压器',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>匝数比说了算</button>
    <button class="tab" data-i="1"><span class="n">2</span>电柜里的四种</button>
    <button class="tab" data-i="2"><span class="n">3</span>互感器·两条铁律</button>
    <button class="tab" data-i="3"><span class="n">4</span>怎么量、怎么判坏</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">变压器：靠两组线圈的匝数比换电压</div>
    一次绕组通交流 → 铁芯里产生变化的磁场 → 二次绕组被感应出电压。
    <b>拖两根滑杆改匝数，看下面三对柱子怎么变。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="rowlab">一次绕组匝数 N<sub>1</sub>　<b id="s1n1">1000 匝</b></div>
      <input type="range" id="s1a" min="200" max="2000" step="50" value="1000">
      <div class="rowlab" style="margin-top:6px">二次绕组匝数 N<sub>2</sub>　<b id="s1n2">100 匝</b></div>
      <input type="range" id="s1b" min="20" max="1000" step="10" value="100">
      <div class="btns" id="s1l">
        <button class="btn sm" data-k="0">空载</button>
        <button class="btn on sm" data-k="100">接 100 Ω</button>
        <button class="btn sm" data-k="20">接 20 Ω</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">匝数比<br>N₁ : N₂</div><div class="v" id="s1r">10 : 1</div></div>
        <div class="num hi"><div class="k">二次<br>电压 U₂</div><div class="v" id="s1u">22.0 V</div></div>
        <div class="num"><div class="k">二次<br>电流 I₂</div><div class="v" id="s1i">0.22 A</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">三个比例，一次记住</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>比什么</th><th>关系</th><th>一句话</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">电压</td><td>U₁ : U₂ = <b>N₁ : N₂</b></td><td>匝数多的那边电压高，<b>同方向</b></td></tr>
        <tr><td class="eu-s">电流</td><td>I₁ : I₂ = <b>N₂ : N₁</b></td><td>匝数多的那边电流小，<b>反方向</b></td></tr>
        <tr><td class="eu-s">功率</td><td>P₁ ≈ P₂</td><td>变压器<b>不产生能量</b>，只是换个电压电流的搭配</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>为什么电流是反过来的：</b>功率 = 电压 × 电流，两边功率必须相等。
      电压升上去 10 倍，电流就得降到十分之一，乘出来才一样。<br>
      <b>这条在现场天天用：</b>10 kV 侧只有几十安的电流，到 400 V 侧就是上千安 ——
      所以高压侧的线细、低压侧的母排粗得吓人。
      <span class="sub">真实的变压器有铁损和铜损，效率大概 95%~99%，所以是「约等于」不是「等于」。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">变压器只能变交流，不能变直流</div>
    二次侧有没有电压，靠的是<b>铁芯里的磁场在变</b>（1.6 节那条「磁生电」）。
    直流通进去磁场是恒定的，二次侧一点电压都感应不出来。<br>
    <div class="tip" style="margin-top:8px">
      <b>而且直流接进去会烧。</b>交流时限制电流的主要是感抗，直流下感抗为零，
      只剩绕组那几十欧的直流电阻 —— 220 V ÷ 50 Ω = 4.4 A，几秒就冒烟。
      <span class="sub">「用万用表电阻档量线圈只有几十欧」和这件事是同一个数（2.5 节讲过）。</span>
    </div>
  </div>

  <div class="bet" data-bet="c26-ratio" data-q="一台变压器一次 1000 匝接 220 V，二次 100 匝。二次侧的电流会比一次侧大还是小？"
       data-opts="大 10 倍|一样|小 10 倍" data-right="0"
       data-after="大 10 倍。电压降到 1/10（22 V），功率要守恒，电流就得涨到 10 倍。记法：匝数多的那一侧「电压高、电流小」，两件事总是反着来。"></div>
</section>

<!-- ================= 场景 2：四种变压器 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">同一个电柜里，可能有好几种变压器</div>
    长得像、原理一样，但<b>用途和安全性质完全不同</b>。
    <b>四个挨个点一遍，重点看最后那个「自耦」——它跟前三个有一条本质区别。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">电力变压器</button>
        <button class="btn sm" data-k="1">控制变压器</button>
        <button class="btn sm" data-k="2">隔离变压器</button>
        <button class="btn sm" data-k="3">自耦变压器</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">一次 /<br>二次</div><div class="v" id="s2a">10 kV / 400 V</div></div>
        <div class="num"><div class="k">在哪儿<br>见得到</div><div class="v" id="s2b">配电房</div></div>
        <div class="num hi"><div class="k">两侧<br>隔离吗</div><div class="v" id="s2c">隔离</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">这一节最要紧的一条：自耦变压器不隔离</div>
    前三种的一次和二次是<b>两组分开的绕组</b>，中间只有磁的联系、没有电的联系 ——
    所以二次侧对地是「浮」的，人碰一根线不会构成回路。<br>
    <b>自耦变压器只有一个绕组，中间抽个头</b>，一次和二次<b>直接连在一起</b>。
    <div class="tip" style="margin-top:8px">
      后果：<b>输入侧的火线电位会原样出现在输出侧</b>。
      用自耦调压器（那个手摇的圆盘调压器）给设备供电时，
      <b>输出的「零线」可能带着 220 V 对地电压</b>，碰上去照样电人。
      <span class="sub">所以：<b>需要人身安全隔离的场合（检修用电源、维修台、潮湿场所）必须用隔离变压器，
      不能拿自耦调压器顶替。</b>调压器是用来调电压的，不是用来保命的。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">四种放一起比</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>种类</th><th>干什么</th><th>隔离</th><th>特点</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">电力<br>变压器</td><td>把 10 kV 降成 400/230 V 给整栋楼供电</td><td>是</td><td>三相，容量大（几十~上千 kVA），装在配电房或杆上</td></tr>
        <tr><td class="eu-s">控制<br>变压器</td><td>给电柜里的控制回路供电（380/220 → 110/36/24 V）</td><td>是</td><td>容量小（几十~几百 VA），二次侧一般<b>带保险丝、一端接地</b></td></tr>
        <tr><td class="eu-s">隔离<br>变压器</td><td>只隔离，不变压（1:1）</td><td><b>是，这就是它存在的理由</b></td><td>检修电源、医疗设备、精密仪器</td></tr>
        <tr><td class="eu-s">自耦<br>变压器</td><td>调电压 / 电动机降压启动</td><td><b>否</b></td><td>省铜省铁、体积小，代价是<b>没有安全隔离</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>控制变压器的二次侧为什么要一端接地：</b>接地之后，
      万一绕组绝缘破了、高压串到低压侧，故障电流会直接走地把保险丝烧断，
      而不是让整个控制回路带上高压等着人去碰。
      <span class="sub">接地那一端通常标 <b>0 V / N</b>，另一端才是给按钮、接触器线圈用的那根。</span>
    </div>
  </div>

  <div class="bet" data-bet="c26-auto" data-q="要给一个潮湿环境里的检修插座供电，手边有一台自耦调压器和一台 1:1 隔离变压器。用哪个？"
       data-opts="自耦调压器，还能调电压|隔离变压器|都行" data-right="1"
       data-after="隔离变压器。自耦变压器一次二次是同一个绕组、直接连通的，输入的火线电位会原样带到输出侧——人碰上去照样构成回路。它能调电压，但不提供任何人身安全隔离。"></div>
</section>

<!-- ================= 场景 3：互感器 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">互感器：把大电流大电压「缩小」了给表看</div>
    配电柜上那些电流表电压表不可能直接接到几百安、上万伏上。
    中间垫一层互感器，<b>把量缩小成标准值再送给表</b>。
    <b>点「危险操作」看看接错了会怎样。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on" data-k="0">电流互感器 CT</button>
        <button class="btn" data-k="1">电压互感器 PT</button>
      </div>
      <div class="btns" id="s3d">
        <button class="btn on sm" data-k="0">正常运行</button>
        <button class="btn sm" data-k="1" id="s3btn">危险操作：二次开路</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">一次侧<br>（主回路）</div><div class="v" id="s3a">400 A</div></div>
        <div class="num"><div class="k">二次侧<br>（给表）</div><div class="v" id="s3b">4.0 A</div></div>
        <div class="num hi"><div class="k">状态</div><div class="v" id="s3c">正常</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">两条铁律，背下来</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>铁律</th><th>违反了会怎样</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">CT</td><td><b>二次侧绝对不能开路</b></td><td>一次电流是被主回路强制的，二次一断，铁芯严重饱和，<b>二次两端会出现几百伏到上千伏的尖峰</b>——电死人、烧毁互感器、铁芯永久性损伤</td></tr>
        <tr><td class="eu-s">PT</td><td><b>二次侧绝对不能短路</b></td><td>它相当于一个小电源，短路就是把电源短了，<b>二次电流暴涨烧毁绕组</b>，还可能引起一次侧的保护动作</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>记法：CT 怕开路、PT 怕短路。</b>刚好跟它们各自的「本行」反着 ——
      CT 是电流源的脾气（怕断），PT 是电压源的脾气（怕短）。
      <span class="sub">和第 1 章「电流表串联、电压表并联」是同一条线索：
      <b>CT 一次串在主回路上，PT 一次并在线路上。</b></span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">现场操作规矩</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>要做什么</th><th>正确做法</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">换 CT 二次侧的电流表</td><td><b>先用短接片（或专用短接线）把 CT 二次短接</b>，再拆表。装好表之后<b>最后</b>才拆短接片</td></tr>
        <tr><td class="eu-s">CT 二次侧接地</td><td><b>必须有一点可靠接地</b>（一般是 S2 或 K2 端）。万一一次绝缘击穿，高压会被引到地，不会串到表和人身上</td></tr>
        <tr><td class="eu-s">拧端子</td><td>CT 二次回路的螺丝要<b>拧紧并定期复查</b>——松动就等于慢慢开路</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>额定值是标准化的：</b>CT 二次额定电流一般是 <b>5 A</b>（也有 1 A），
      PT 二次额定电压一般是 <b>100 V</b>。所以柜上那块 400 A 的电流表，
      实际上是一块 5 A 的表，只是表盘按 400/5 的变比重新刻了字。
      <span class="sub">这也意味着<b>表和互感器是配套的</b>，换表要按变比换，不能随便拿一块顶上去。</span>
    </div>
  </div>

  <div class="bet" data-bet="c26-ct" data-q="正在运行的电流互感器，二次侧的电流表要拆下来换新的。第一步做什么？"
       data-opts="直接拆，表本身电流很小|先把 CT 二次侧短接|先把一次侧断电" data-right="1"
       data-after="先短接二次侧。CT 的一次电流由主回路强制决定，二次一开路，铁芯饱和会在二次端子上顶出几百上千伏的尖峰——这是配电房的典型伤亡事故。短接二次不会有任何问题，因为它本来就工作在接近短路的状态。"></div>
</section>

<!-- ================= 场景 4：检测 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">怀疑变压器坏了，量三处就够</div>
    <b>断电、放电、拆开二次侧的负载</b>，然后按下面三步来。
    <b>点三个测点看表上应该读到什么。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">① 一次绕组</button>
        <button class="btn sm" data-k="1">② 二次绕组</button>
        <button class="btn sm" data-k="2">③ 绕组对外壳</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">用什么<br>表</div><div class="v" id="s4a">万用表 Ω</div></div>
        <div class="num hi"><div class="k">好的<br>应该是</div><div class="v" id="s4b">几十~几百 Ω</div></div>
        <div class="num"><div class="k">坏了<br>会是</div><div class="v" id="s4c">∞ 或 0</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">三步检测表</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>量哪儿</th><th>用什么</th><th>好的</th><th>坏的</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">一次绕组<br>两端</td><td>万用表<br>电阻档</td><td>一个不大的电阻值。<b>电压高的那一侧匝数多、线细，阻值大</b>（几十到几百欧）</td><td><b>∞ = 断线</b>；明显偏小 = 匝间短路</td></tr>
        <tr><td class="eu-s">二次绕组<br>两端</td><td>万用表<br>电阻档</td><td>比一次侧<b>小得多</b>（零点几到几欧，24 V 那种甚至接近 0）</td><td>同上。<b>接近 0 是正常的，别误判</b></td></tr>
        <tr><td class="eu-s">绕组之间<br>绕组对外壳</td><td><b>绝缘电阻表</b><br>（兆欧表）</td><td><b>兆欧级</b>。低压设备通常要求不低于 0.5 MΩ</td><td>几百千欧甚至几千欧 = <b>绝缘老化/受潮</b>；接近 0 = 击穿</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>为什么绝缘不能用万用表量：</b>万用表电阻档只送出几伏电压，
      几伏电压下测不出「加上工作电压才会击穿」的隐患。
      绝缘电阻表要送出 <b>500 V 或 1000 V</b>，才是在模拟真实的工作条件。
      <span class="sub">低压设备（≤1000 V）用 500 V 档；具体数值以设备自己的技术条件为准，
      第 3 章会专门讲这块表怎么摇、怎么读。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">通电之前，还有两件事</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>怎么做</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">对一遍<br>铭牌</td><td>额定容量、一次/二次电压、频率、接线组别。<b>50 Hz 的变压器不能接到 60 Hz 电源上长期用</b>（反过来可以）</td></tr>
        <tr><td class="eu-s">确认<br>接线端</td><td>控制变压器常有 <b>380/220 两个一次抽头</b>——接错一档，要么烧、要么二次电压只有一半</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>「二次电压只有一半」是个很常见的报修。</b>多半不是变压器坏了，
      是一次侧接在了 380 V 的抽头上、而实际进线是 220 V。
      量一下一次侧到底接的是哪两个端子，比拆变压器快得多。
    </div>
  </div>

  <div class="quiz" data-quiz="c2-6">
    <div class="qz" data-q="一台变压器一次 220 V / 1000 匝，二次 100 匝。二次电压是多少？"
         data-opts="2200 V|22 V|110 V"
         data-right="1"
         data-why="22 V。电压比等于匝数比：220 × (100/1000) = 22 V。匝数少的那一侧电压低——这一条和电流那一条永远是反着的（那边电流反而大 10 倍）。"></div>
    <div class="qz" data-q="用万用表电阻档量一台 220 V/24 V 控制变压器，二次绕组只有 0.8 Ω。这说明什么？"
         data-opts="二次绕组短路了|正常，低压侧匝数少、线粗，直流电阻本来就很小|表坏了"
         data-right="1"
         data-why="正常。二次侧只有几十匝、导线又粗，直流电阻本来就是零点几欧的量级。判断绕组好坏要看「有没有断（∞）」和「跟同型号的另一台比是不是明显偏小」，不能拿绝对值吓自己。"></div>
    <div class="qz" data-q="运行中的电流互感器，二次侧开路会怎样？"
         data-opts="没事，反正没接负载|二次端子上会出现几百到上千伏的高压，可能伤人和烧毁互感器|二次电流变大"
         data-right="1"
         data-why="出现危险高压。一次电流由主回路强制，二次一开路，磁通失去去磁作用、铁芯严重饱和，在二次侧感应出尖顶波高压。所以拆 CT 二次的表之前必须先短接二次。"></div>
    <div class="qz" data-q="给一个潮湿场所的检修电源供电，为什么必须用隔离变压器而不能用自耦调压器？"
         data-opts="自耦的容量太小|自耦一次二次是同一个绕组、直接连通，没有安全隔离|自耦不能调到 220 V"
         data-right="1"
         data-why="自耦变压器只有一个绕组、中间抽头，一次和二次电气上是通的，输入侧的火线电位会原样带到输出侧。隔离变压器的两个绕组之间只有磁的联系，二次侧对地是浮的，人碰一根线构不成回路。调压是功能，隔离是安全，两件事不能互相顶替。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 2 章 2.6 节（书内 P42~P43）<br>下一节讲电动机</div>
</section>`,

  init: function(EC){
'use strict';
const {C, Path, Stage, txt, tw, box, tag, loop, $} = EC;

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
   共用小零件
   ================================================================ */
/* 竖着的绕组：n 个半圆鼓包。right=true 鼓包朝右。
   相邻两段的端点重合，所以一个 beginPath 连着画就行。 */
function vcoil(g, x, y0, y1, n, right, col){
  const step = (y1-y0)/n, r = step/2;
  g.save();
  g.strokeStyle = col || C.cop; g.lineWidth = 2.8; g.lineCap = 'round';
  g.beginPath();
  for(let i = 0; i < n; i++){
    const cy = y0 + step*(i+0.5);
    g.arc(x, cy, r, right ? -Math.PI/2 : Math.PI/2, right ? Math.PI/2 : Math.PI*1.5, false);
  }
  g.stroke(); g.restore();
}
/* 铁芯：两根竖线（叠片的意思） */
function vcore(g, x, y0, y1){
  g.save(); g.strokeStyle = C.metalD; g.lineWidth = 2.6; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x-3, y0); g.lineTo(x-3, y1);
  g.moveTo(x+3, y0); g.lineTo(x+3, y1); g.stroke(); g.restore();
}
/* 一对横条：同一组里两根按各自比例画，一眼看出「谁高谁矮」 */
function barPair(g, x, y, w, title, rows){
  txt(g, title, x + w/2, y, {sz:10.5, b:1, c:C.tx2});
  const mx = Math.max(rows[0][1], rows[1][1], 1e-12);
  rows.forEach(function(rw, i){
    const by = y + 16 + i*30;
    txt(g, rw[0], x + 4, by, {sz:9, c:C.tx3, al:'left'});
    box(g, x + 4, by + 6, w - 8, 11, 3, C.box, null, 0);
    const fw = Math.max(2, (w-8) * (rw[1]/mx));
    box(g, x + 4, by + 6, fw, 11, 3, rw[2], null, 0);
  });
}

/* ================================================================
   场景 1：匝数比
   ================================================================
   理想变压器：U2 = U1·N2/N1，I1 = I2·N2/N1，P1 = P2。
   U1 固定 220 V。负载三档：空载 / 100 Ω / 20 Ω。 */
const U1 = 220;
const S1 = { n1:1000, n2:100, rl:100 };
const st1 = new Stage('cv0', 360, 300);

function s1calc(){
  const u2 = U1*S1.n2/S1.n1;
  const i2 = S1.rl > 0 ? u2/S1.rl : 0;
  const i1 = i2*S1.n2/S1.n1;
  return {u2:u2, i2:i2, i1:i1, p:u2*i2};
}
function fmtA(a){ return a >= 1 ? a.toFixed(2) + ' A' : (a*1000).toFixed(0) + ' mA'; }

function draw1(){
  const g = st1.g; st1.clear();
  const r = s1calc();
  EP.heading(g, 20, 16, '单相变压器', 'U₁ = 220 V');

  const SX = 52, SY = 104, XP = 118, XS = 156, XL = 276;
  const YT = 62, YB = 146, CY0 = 74, CY1 = 138;
  g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.6; g.lineCap = 'round'; g.lineJoin = 'round';
  g.beginPath();
  g.moveTo(SX, SY-15); g.lineTo(SX, YT); g.lineTo(XP, YT); g.lineTo(XP, CY0);
  g.moveTo(XP, CY1); g.lineTo(XP, YB); g.lineTo(SX, YB); g.lineTo(SX, SY+15);
  g.moveTo(XS, CY0); g.lineTo(XS, YT); g.lineTo(XL, YT); g.lineTo(XL, 86);
  g.moveTo(XL, 126); g.lineTo(XL, YB); g.lineTo(XS, YB); g.lineTo(XS, CY1);
  g.stroke(); g.restore();
  /* 交流源 */
  g.save(); g.strokeStyle = C.wire; g.lineWidth = 2;
  g.beginPath(); g.arc(SX, SY, 15, 0, Math.PI*2); g.stroke();
  g.beginPath();
  for(let i = 0; i <= 20; i++){
    const px = SX - 9 + i*(18/20), py = SY - Math.sin(i/20*Math.PI*2)*5.5;
    i ? g.lineTo(px, py) : g.moveTo(px, py);
  }
  g.stroke(); g.restore();

  vcoil(g, XP, CY0, CY1, 5, false);
  vcore(g, 137, 54, 154);
  vcoil(g, XS, CY0, CY1, 5, true);
  EC.resistor(g, XL, 106, {horiz:false, len:40, w:16});

  txt(g, '220 V', SX, 130, {sz:10, b:1, c:C.tx2});
  txt(g, 'N₁ = ' + S1.n1 + ' 匝', 112, 158, {sz:10, b:1, c:C.acc, al:'right'});
  txt(g, 'N₂ = ' + S1.n2 + ' 匝', 162, 158, {sz:10, b:1, c:C.ok, al:'left'});
  txt(g, 'U₂ = ' + r.u2.toFixed(1) + ' V', XL - 22, 100, {sz:11, b:1, c:C.ok, al:'right'});
  txt(g, S1.rl > 0 ? '负载 ' + S1.rl + ' Ω' : '空载', XL - 22, 114, {sz:9.5, c:C.tx3, al:'right'});
  txt(g, 'I₁ = ' + fmtA(r.i1), 85, 52, {sz:9.5, b:1, c:C.acc});
  txt(g, 'I₂ = ' + fmtA(r.i2), 216, 52, {sz:9.5, b:1, c:C.ok});
  if(S1.rl > 0){
    EP.flow(g, new Path([[SX,SY-15],[SX,YT],[XP,YT],[XP,CY0]]),
            {phase:(Date.now()/16)%1000, gap:44, kind:'cur', size:4.4});
    EP.flow(g, new Path([[XS,CY0],[XS,YT],[XL,YT],[XL,86]]),
            {phase:(Date.now()/16)%1000, gap:44, kind:'cur', size:4.4});
  }

  /* 三对柱子 */
  const cw = 106;
  barPair(g, 20, 190, cw, '匝数',
          [['一次 ' + S1.n1 + ' 匝', S1.n1, C.acc], ['二次 ' + S1.n2 + ' 匝', S1.n2, C.ok]]);
  barPair(g, 127, 190, cw, '电压',
          [['一次 220 V', U1, C.acc], ['二次 ' + r.u2.toFixed(1) + ' V', r.u2, C.ok]]);
  barPair(g, 234, 190, cw, '电流',
          [['一次 ' + fmtA(r.i1), r.i1, C.acc], ['二次 ' + fmtA(r.i2), r.i2, C.ok]]);

  const up = S1.n2 > S1.n1;
  box(g, 20, 256, 320, 32, 6, C.accbg, C.acc, 1);
  txt(g, S1.rl > 0
      ? '匝数和电压：两对柱子一模一样　·　电流：正好反过来'
      : '空载时二次没有电流，一次也只有很小的励磁电流',
      180, 266, {sz:10.5, b:1, c:C.acc});
  txt(g, up ? '这是一台升压变压器（N₂ > N₁）' : '这是一台降压变压器（N₁ > N₂）',
      180, 280, {sz:9.5, c:C.tx3});
}

function note1(){
  const r = s1calc();
  $('s1n1').textContent = S1.n1 + ' 匝';
  $('s1n2').textContent = S1.n2 + ' 匝';
  const k = S1.n1/S1.n2;
  $('s1r').textContent = (k >= 1 ? k.toFixed(k >= 10 ? 0 : 1) + ' : 1'
                                 : '1 : ' + (1/k).toFixed((1/k) >= 10 ? 0 : 1));
  $('s1u').textContent = r.u2.toFixed(1) + ' V';
  $('s1i').textContent = S1.rl > 0 ? fmtA(r.i2) : '0（空载）';
  const up = S1.n2 > S1.n1;
  $('n0').innerHTML =
    '<div class="st' + (up ? ' warn' : ' good') + '">' +
      (up ? '升压：二次匝数比一次多' : '降压：二次匝数比一次少') + '</div>' +
    'U₂ = 220 × ' + S1.n2 + ' ÷ ' + S1.n1 + ' = <b>' + r.u2.toFixed(1) + ' V</b>。' +
    '<b>电压跟着匝数走，一比一地跟。</b><br>' +
    (S1.rl > 0
      ? '接上 ' + S1.rl + ' Ω 之后，二次电流 I₂ = ' + r.u2.toFixed(1) + ' ÷ ' + S1.rl +
        ' = <b>' + fmtA(r.i2) + '</b>；一次侧只需要 <b>' + fmtA(r.i1) + '</b>' +
        '（是二次的 ' + (S1.n2/S1.n1).toFixed(3).replace(/0+$/,'') + ' 倍）。<br>' +
        '两边功率都是 <b>' + r.p.toFixed(2) + ' W</b> —— <b>这个数必须相等</b>，' +
        '变压器不产生能量。<br>' +
        '<span class="sub">' + (up
          ? '升压的代价是电流变小：这就是为什么远距离送电要升压 —— 线上损耗按 I²R 算，电流小一点损耗小一大截（第 1 章那个演示讲的就是这件事）。'
          : '降压之后电流变大：所以低压侧的线要粗得多。控制变压器 24 V 那一侧的线径明显比 220 V 侧粗，就是这个原因。') +
        '</span>'
      : '现在是<b>空载</b>：二次侧没接东西，没有电流。<br>' +
        '一次侧也几乎没有电流（只有一点点<b>励磁电流</b>，用来在铁芯里建立磁场）。<br>' +
        '<span class="sub">这就是为什么变压器空着挂在电网上也不太费电 —— ' +
        '但仍然有铁损（空载损耗），所以长期不用的变压器该断开。点「接 100 Ω」看带载之后有什么不同。</span>');
}
$('s1a').addEventListener('input', function(){ S1.n1 = +this.value; note1(); });
$('s1b').addEventListener('input', function(){ S1.n2 = +this.value; note1(); });
document.getElementById('s1l').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S1.rl = +b.dataset.k;
  document.querySelectorAll('#s1l .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S1.rl);
  });
  note1();
});

/* ================================================================
   场景 2：四种变压器
   ================================================================ */
const S2 = { k:0 };
const st2 = new Stage('cv1', 360, 276);
const T2 = [
  {t:'电力变压器', pri:'10 kV 三相', sec:'400 / 230 V', where:'配电房', short:'10 kV→400 V', feat:'三相，Dyn11，中性点必须可靠接地',
   iso:true, use:'把高压降成整栋楼能用的低压。三相，容量几十到上千 kVA'},
  {t:'控制变压器', pri:'380 / 220 V', sec:'AC 24 V', where:'机床电柜', short:'380→24 V', feat:'一次常有 380/220 两个抽头，二次一端接地',
   iso:true, use:'给按钮、指示灯、接触器线圈这些控制回路供电。容量小，二次侧带保险丝、一端接地'},
  {t:'隔离变压器', pri:'220 V', sec:'220 V（1:1）', where:'检修电源', short:'220→220 V', feat:'1 : 1 不变压，二次侧浮地',
   iso:true, use:'不变压，只隔离。二次侧对地是「浮」的，人碰一根线构不成回路'},
  {t:'自耦变压器', pri:'220 V', sec:'0 ~ 250 V 可调', where:'调压器', short:'220→0~250 V', feat:'只有一个绕组，中间抽头',
   iso:false, use:'一个绕组抽头，省铜省铁体积小。代价是一次二次电气相通，没有安全隔离'}
];

/* 保险丝：一个小方框，中间穿一根线 */
function fuse(g, x, y, horiz){
  g.save(); g.translate(x, y); if(!horiz) g.rotate(-Math.PI/2);
  g.strokeStyle = C.wire; g.lineWidth = 2.2; g.lineCap = 'round';
  g.beginPath(); g.moveTo(-14, 0); g.lineTo(14, 0); g.stroke();
  box(g, -9, -6, 18, 12, 2, C.box, C.wire, 1.6);
  g.restore();
}
/* 接地符号：三条越来越短的横线 */
function gnd(g, x, y){
  g.save(); g.strokeStyle = C.PE || C.ok; g.lineWidth = 2; g.lineCap = 'round';
  [[9, 0], [6, 4], [3, 8]].forEach(function(d){
    g.beginPath(); g.moveTo(x-d[0], y+d[1]); g.lineTo(x+d[0], y+d[1]); g.stroke();
  });
  g.restore();
}

function draw2(){
  const g = st2.g; st2.clear();
  const d = T2[S2.k];
  EP.heading(g, 20, 16, d.t, d.pri + ' → ' + d.sec);
  g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.4; g.lineCap = 'round'; g.lineJoin = 'round';

  if(S2.k === 0){
    /* 三相电力变压器：配电系统图上的双圆符号 */
    g.beginPath(); g.moveTo(180, 44); g.lineTo(180, 66);
    g.moveTo(180, 148); g.lineTo(180, 172); g.stroke();
    g.beginPath(); g.moveTo(172, 58); g.lineTo(188, 50); g.stroke();   /* 三相斜杠 */
    g.beginPath(); g.moveTo(172, 164); g.lineTo(188, 156); g.stroke();
    g.lineWidth = 2;
    g.beginPath(); g.arc(180, 88, 22, 0, Math.PI*2); g.stroke();
    g.beginPath(); g.arc(180, 122, 22, 0, Math.PI*2); g.stroke();
    /* 上圆：三角形接法 Δ */
    g.beginPath(); g.moveTo(180, 78); g.lineTo(190, 96); g.lineTo(170, 96); g.closePath(); g.stroke();
    /* 下圆：星形接法 Y，中性点引出去接地 */
    g.beginPath();
    g.moveTo(180, 122); g.lineTo(180, 112);
    g.moveTo(180, 122); g.lineTo(189, 130);
    g.moveTo(180, 122); g.lineTo(171, 130);
    g.stroke();
    g.beginPath(); g.moveTo(180, 122); g.lineTo(234, 122); g.lineTo(234, 148); g.stroke();
    g.restore();
    gnd(g, 234, 150);
    txt(g, '3', 196, 50, {sz:9.5, b:1, c:C.tx3, al:'left'});
    txt(g, '4', 196, 156, {sz:9.5, b:1, c:C.tx3, al:'left'});
    txt(g, '10 kV 三相进线', 164, 52, {sz:10, b:1, c:C.err, al:'right'});
    txt(g, 'L1 L2 L3 N 出线', 164, 160, {sz:10, b:1, c:C.tx2, al:'right'});
    txt(g, 'Dyn11', 210, 105, {sz:10.5, b:1, c:C.acc, al:'left'});
    txt(g, '高压侧三角形', 210, 88, {sz:9, c:C.tx3, al:'left'});
    txt(g, '低压侧星形带中性点', 210, 138, {sz:9, c:C.tx3, al:'left'});
    txt(g, '中性点接地', 248, 122, {sz:9, c:C.ok, al:'left'});
  } else if(S2.k === 3){
    /* 自耦：只有一个绕组，中间抽头 */
    const X = 178, Y0 = 56, Y1 = 152, TAP = 112;
    g.beginPath();
    g.moveTo(X, Y0); g.lineTo(110, Y0);
    g.moveTo(X, Y1); g.lineTo(110, Y1);
    g.moveTo(X, TAP); g.lineTo(252, TAP);
    g.moveTo(X, Y1); g.lineTo(252, Y1);
    g.stroke(); g.restore();
    vcoil(g, X, Y0, TAP, 3, true);
    vcoil(g, X, TAP, Y1, 2, true, C.err);      /* 公共段：红的 */
    vcore(g, 160, 48, 160);
    EC.node(g, X, TAP);
    txt(g, '一次', 106, Y0 - 12, {sz:10, b:1, c:C.acc, al:'right'});
    txt(g, '220 V', 106, Y0 + 2, {sz:9.5, c:C.tx3, al:'right'});
    txt(g, '二次', 256, TAP - 12, {sz:10, b:1, c:C.ok, al:'left'});
    txt(g, '可调', 256, TAP + 2, {sz:9.5, c:C.tx3, al:'left'});
    txt(g, '抽头', X + 12, TAP + 14, {sz:9, c:C.tx3, al:'left'});
    box(g, 60, 168, 240, 24, 5, C.errbg, C.err, 1);
    txt(g, '红色这一段一次二次共用 —— 两侧电气上是通的', 180, 180, {sz:10, b:1, c:C.err});
  } else {
    /* 控制变压器 / 隔离变压器：两个分开的绕组 */
    const XP = 140, XS = 216, Y0 = 62, Y1 = 146;
    g.beginPath();
    g.moveTo(XP, Y0); g.lineTo(XP, 48); g.lineTo(74, 48);
    g.moveTo(XP, Y1); g.lineTo(XP, 160); g.lineTo(74, 160);
    g.moveTo(XS, Y0); g.lineTo(XS, 48); g.lineTo(286, 48);
    g.moveTo(XS, Y1); g.lineTo(XS, 160); g.lineTo(286, 160);
    g.stroke();
    if(S2.k === 1){ g.beginPath(); g.moveTo(XP, 104); g.lineTo(96, 104); g.stroke(); }
    g.restore();
    vcoil(g, XP, Y0, Y1, 6, false);
    vcoil(g, XS, Y0, Y1, S2.k === 1 ? 3 : 6, true);
    vcore(g, 178, 54, 154);
    fuse(g, 104, 48, true);
    fuse(g, 256, 48, true);
    if(S2.k === 1){
      EC.node(g, XP, 104);
      txt(g, '220 V 抽头', 92, 104, {sz:9.5, b:1, c:C.tx2, al:'right'});
      txt(g, '380 V', 70, 48, {sz:10, b:1, c:C.err, al:'right'});
      txt(g, '0', 70, 160, {sz:10, b:1, c:C.tx2, al:'right'});
      txt(g, 'AC 24 V', 290, 48, {sz:10, b:1, c:C.ok, al:'left'});
      txt(g, '0 V', 290, 160, {sz:10, b:1, c:C.tx2, al:'left'});
      g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.4;
      g.beginPath(); g.moveTo(300, 160); g.lineTo(316, 160); g.lineTo(316, 176); g.stroke(); g.restore();
      gnd(g, 316, 178);
      txt(g, '二次一端接地', 316, 196, {sz:9, c:C.ok});
    } else {
      txt(g, '220 V', 70, 48, {sz:10, b:1, c:C.err, al:'right'});
      txt(g, '220 V', 290, 48, {sz:10, b:1, c:C.ok, al:'left'});
      txt(g, '1 : 1', 178, 172, {sz:11, b:1, c:C.acc});
      txt(g, '二次侧不接地（浮地）', 286, 176, {sz:9, c:C.ok, al:'right'});
    }
  }

  /* 隔离状态条 */
  const ic = d.iso ? C.ok : C.err;
  box(g, 20, 206, 320, 28, 6, d.iso ? C.okbg : C.errbg, ic, 1);
  txt(g, d.iso ? '一次 ⟷ 二次：电气上完全断开（只有磁的联系）'
               : '一次 ⟷ 二次：直接连通，没有安全隔离',
      180, 220, {sz:11, b:1, c:ic});
  box(g, 20, 240, 320, 28, 6, C.box, C.boxLine, 1);
  /* 这一条不重复数字卡里的「在哪儿见得到」，改说接线上的特征 */
  txt(g, d.feat, 180, 254, {sz:10, b:1, c:C.tx2});
}
function note2(){
  const d = T2[S2.k];
  $('s2a').textContent = d.short;
  $('s2b').textContent = d.where;
  $('s2c').textContent = d.iso ? '隔离' : '不隔离';
  $('n1').innerHTML =
    '<div class="st' + (d.iso ? '' : ' bad') + '">' + d.t + '</div>' + d.use + '。<br>' +
    (S2.k === 0
      ? '<b>Dyn11</b> 是接线组别：D = 高压侧三角形接，y = 低压侧星形接，' +
        'n = 中性点引出来（就是零线 N），11 是相位关系。' +
        '<span class="sub">低压电工不用会算组别，但要认得出图上这几个字母，' +
        '并且知道 <b>N 线是从中性点引出来的、而且中性点必须可靠接地</b>。</span>'
      : S2.k === 1
      ? '<b>为什么控制回路要单独降到 24 V：</b>按钮、行程开关这些是人手常碰的东西，' +
        '24 V 属于安全特低电压，碰到不会有危险。<br>' +
        '<span class="sub">一次侧那两个抽头（380 / 220）<b>接错一档是常见故障</b>：' +
        '接 380 抽头而实际进 220 V，二次电压只有一半多点，接触器吸不上；反过来直接烧。</span>'
      : S2.k === 2
      ? '<b>它不改变电压，那要它干什么？</b>要的就是「二次侧对地浮着」这件事：' +
        '正常情况下人单手碰二次侧的任何一根线，都构不成回路。<br>' +
        '<span class="sub">注意<b>只对「碰一根线」有效</b> —— 同时碰两根照样电人。' +
        '而且二次侧线路一长、对地电容一大，隔离效果就打折扣，所以隔离变压器的' +
        '二次回路要尽量短。</span>'
      : '<b>看画面上红色那一段</b>：它既属于一次绕组、又属于二次绕组。' +
        '这意味着<b>输入侧的火线电位会原样出现在输出侧</b>。<br>' +
        '<span class="sub">自耦变压器省材料、效率高、体积小，' +
        '在电动机降压启动柜里很常见；但<b>凡是拿来给人接触的场合都不能用它代替隔离变压器</b>。</span>');
}
document.getElementById('s2k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S2.k = +b.dataset.k;
  document.querySelectorAll('#s2k .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S2.k);
  });
  note2(); draw2();
});

/* ================================================================
   场景 3：互感器
   ================================================================
   CT：一次 400 A、变比 400/5，正常时二次 5 A 满度（这里按 400 A 走 5 A 算）。
       二次开路 → 铁芯饱和，二次端子出现尖顶波高压。
   PT：一次 10 kV、变比 10000/100，正常二次 100 V。二次短路 → 电流暴涨烧绕组。 */
const S3 = { pt:false, bad:false, t:0 };
const st3 = new Stage('cv2', 360, 312);

function draw3(dt){
  const g = st3.g; st3.clear();
  S3.t += dt;
  const pt = S3.pt, bad = S3.bad;
  const blink = bad && (Math.floor(S3.t*3) % 2 === 0);
  EP.heading(g, 20, 16, pt ? '电压互感器 PT（并在线路上）' : '电流互感器 CT（串在主回路上）',
             pt ? '10 kV / 100 V' : '400 A / 5 A');
  g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.6; g.lineCap = 'round'; g.lineJoin = 'round';

  if(!pt){
    /* ---- CT：主母线穿过环形铁芯 ---- */
    g.lineWidth = 5; g.strokeStyle = C.L;
    g.beginPath(); g.moveTo(24, 66); g.lineTo(336, 66); g.stroke();
    g.restore();
    EC.head(g, 320, 66, 1, 0, 7, C.L);
    /* 母线的名字放左端：居中的话正好压在环形铁芯上（截图抓到的） */
    txt(g, '主回路 L1　400 A', 28, 46, {sz:10.5, b:1, c:C.L, al:'left'});
    /* 环形铁芯 */
    g.save(); g.strokeStyle = C.metalD; g.lineWidth = 2.4;
    g.beginPath(); g.ellipse(180, 66, 34, 26, 0, 0, Math.PI*2); g.stroke();
    g.beginPath(); g.ellipse(180, 66, 26, 18, 0, 0, Math.PI*2); g.stroke();
    g.restore();
    /* 二次绕组：铁芯下缘几个鼓包 */
    g.save(); g.strokeStyle = C.cop; g.lineWidth = 2.4;
    [-18, -6, 6, 18].forEach(function(dx){
      g.beginPath(); g.arc(180+dx, 88, 5.5, Math.PI, Math.PI*2, true); g.stroke();
    });
    g.restore();
    /* 二次回路 */
    g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.4; g.lineCap = 'round'; g.lineJoin = 'round';
    g.beginPath();
    g.moveTo(158, 92); g.lineTo(140, 92); g.lineTo(140, 168);
    g.moveTo(202, 92); g.lineTo(220, 92); g.lineTo(220, 168);
    g.moveTo(140, 168); g.lineTo(164, 168);
    if(!bad){ g.moveTo(196, 168); g.lineTo(220, 168); }
    g.stroke(); g.restore();
    EC.meter(g, 180, 168, 16, 'A');
    txt(g, 'S1', 132, 100, {sz:9, c:C.tx3, al:'right'});
    txt(g, 'S2', 228, 100, {sz:9, c:C.tx3, al:'left'});
    if(bad){
      /* 断口 + 高压警示 */
      /* ✗ 要画在**真正断开的那个缺口上**（表右侧那一段没画），
         画在旁边空地上看着像个装饰 */
      g.save(); g.strokeStyle = C.err; g.lineWidth = 3; g.lineCap = 'round';
      g.beginPath(); g.moveTo(202, 174); g.lineTo(214, 162); g.stroke();
      g.beginPath(); g.moveTo(202, 162); g.lineTo(214, 174); g.stroke();
      g.restore();
      if(blink){
        tag(g, '几百 ~ 上千伏', 276, 130,
            {sz:10, b:1, c:C.err, fill:C.errbg, line:C.err});
      }
    } else {
      EP.flow(g, new Path([[158,92],[140,92],[140,168],[164,168]]),
              {phase:(Date.now()/16)%1000, gap:40, kind:'cur', size:4.2});
    }
    txt(g, bad ? '二次开路' : '二次闭合回路', 180, 196, {sz:10, b:1, c: bad ? C.err : C.ok});
  } else {
    /* ---- PT：并在两根母线之间 ----
       两根母线拉得很开、整台 PT 画在它们中间 —— 早先母线挨着画，
       二次那圈回路会横穿过母线，看着像接在上面（截图抓到的）。 */
    g.lineWidth = 4; g.strokeStyle = C.L;
    g.beginPath(); g.moveTo(24, 52); g.lineTo(336, 52); g.stroke();
    g.strokeStyle = C.N;
    g.beginPath(); g.moveTo(24, 180); g.lineTo(336, 180); g.stroke();
    g.restore();
    txt(g, 'L1', 28, 42, {sz:10, b:1, c:C.L, al:'left'});
    txt(g, 'L2', 28, 192, {sz:10, b:1, c:C.N, al:'left'});
    txt(g, '10 kV 线路', 336, 42, {sz:10, b:1, c:C.L, al:'right'});
    g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.4; g.lineCap = 'round'; g.lineJoin = 'round';
    g.beginPath();
    g.moveTo(130, 52); g.lineTo(130, 70);
    g.moveTo(130, 162); g.lineTo(130, 180);
    g.moveTo(190, 90); g.lineTo(190, 76); g.lineTo(268, 76); g.lineTo(268, 100);
    g.moveTo(190, 142); g.lineTo(190, 156); g.lineTo(268, 156); g.lineTo(268, 132);
    g.stroke(); g.restore();
    EC.node(g, 130, 52); EC.node(g, 130, 180);
    vcoil(g, 130, 70, 162, 5, false);
    vcore(g, 160, 64, 168);
    vcoil(g, 190, 90, 142, 2, true);
    EC.meter(g, 268, 116, 16, 'V');
    if(bad){
      g.save(); g.strokeStyle = C.err; g.lineWidth = 4; g.lineCap = 'round';
      g.beginPath(); g.moveTo(230, 76); g.lineTo(230, 156); g.stroke(); g.restore();
      if(blink) tag(g, '短路！电流暴涨', 230, 116,
                    {sz:10, b:1, c:C.err, fill:C.errbg, line:C.err});
    }
    txt(g, bad ? '二次被短接' : '二次接电压表', 190, 170, {sz:10, b:1, c: bad ? C.err : C.ok});
    txt(g, '一次', 118, 116, {sz:9.5, b:1, c:C.acc, al:'right'});
  }

  /* 结论条 */
  const ec = bad ? C.err : C.ok;
  box(g, 20, 206, 320, 46, 6, bad ? C.errbg : C.okbg, ec, 1);
  const L1 = bad ? (pt ? 'PT 二次短路：相当于把一个电源短掉了'
                       : 'CT 二次开路：铁芯严重饱和，二次端子顶出高压')
                 : (pt ? '正常：二次 100 V，电压表按 10 kV 刻度显示'
                       : '正常：二次 4.0 A，电流表按 400 A 刻度显示');
  const L2 = bad ? (pt ? '二次绕组会被烧毁，还可能引起一次侧保护动作'
                       : '电死人、烧毁互感器、铁芯永久损伤')
                 : (pt ? 'PT 工作在接近空载的状态 —— 所以它怕短路'
                       : 'CT 工作在接近短路的状态 —— 所以它怕开路');
  txt(g, L1, 180, 222, {sz:10.5, b:1, c:ec});
  txt(g, L2, 180, 238, {sz:9.5, c: bad ? C.err : C.tx2});
  box(g, 20, 260, 320, 40, 6, C.box, C.boxLine, 1);
  txt(g, pt ? 'PT 一次「并」在线路上，像电压表' : 'CT 一次「串」在主回路上，像电流表',
      180, 274, {sz:10, b:1, c:C.tx2});
  txt(g, pt ? '记：PT 怕短路' : '记：CT 怕开路', 180, 290, {sz:10, b:1, c:C.acc});
}

function note3(){
  const pt = S3.pt, bad = S3.bad;
  $('s3a').textContent = pt ? '10 kV' : '400 A';
  $('s3b').textContent = bad ? (pt ? '短路电流' : '高压尖峰') : (pt ? '100 V' : '4.0 A');
  $('s3c').textContent = bad ? '危险！' : '正常';
  $('s3btn').textContent = pt ? '危险操作：二次短路' : '危险操作：二次开路';
  $('n2').innerHTML = !bad
    ? '<div class="st good">' + (pt ? '电压互感器正常工作' : '电流互感器正常工作') + '</div>' +
      (pt
        ? '一次绕组<b>并联</b>在两根母线之间（跟电压表一个接法），二次按 100 V 输出。' +
          '柜上那块电压表其实是一块 100 V 的表，只是刻度按 10 kV 重新印过。<br>' +
          '<b>它工作在接近空载的状态</b>：二次只接一块内阻很大的电压表，几乎不取电流。' +
          '<span class="sub">所以最怕的是短路 —— 那等于把一个小电源直接短掉。</span>'
        : '一次就是那根主母线本身（<b>串</b>在回路里），二次绕几十上百匝、接电流表。' +
          '400 A 的一次电流对应 5 A 满度，现在 400 A 走出来是 4.0 A。<br>' +
          '<b>它工作在接近短路的状态</b>：二次接的是内阻很小的电流表，' +
          '二次电流产生的磁通正好抵消掉一次的大部分磁通，铁芯里磁通很小。' +
          '<span class="sub">所以最怕的是开路 —— 抵消没了，磁通一下子全上来。</span>') +
      '<br><b>点右边那颗按钮试试。</b>'
    : '<div class="st bad">' + (pt ? '这是在把电源短路' : '这是配电房里最典型的伤亡事故') + '</div>' +
      (pt
        ? '二次一被短接，PT 就像一个被短路的小变压器，<b>二次电流不受限制地涨上去</b>，' +
          '绕组几秒钟就烧。严重时一次侧的熔断器也会跟着熔断，造成计量和保护回路失效。<br>' +
          '<span class="sub">所以 PT 二次回路必须<b>装熔断器</b>，而且不允许在二次侧做任何短接试验。</span>'
        : '一次电流是被<b>主回路强制</b>的 —— 它不会因为二次断了就变小。' +
          '二次那个抵消磁通的作用一没了，铁芯里的磁通猛增到饱和，' +
          '而二次有几十上百匝，<b>在磁通过零附近感应出又尖又高的电压</b>。<br>' +
          '<b>后果：端子上出现几百到上千伏，人碰到会电死；</b>' +
          '互感器本身也会因为铁损剧增而发热烧毁，铁芯还可能被永久磁化、精度报废。<br>' +
          '<span class="sub">所以规矩是：<b>动 CT 二次回路之前，先用短接片把二次短接。</b>' +
          '短接对 CT 完全无害 —— 它本来就工作在接近短路的状态。</span>');
}
document.getElementById('s3k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S3.pt = b.dataset.k === '1';
  document.querySelectorAll('#s3k .btn').forEach(function(t){
    t.classList.toggle('on', (t.dataset.k === '1') === S3.pt);
  });
  note3();
});
document.getElementById('s3d').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S3.bad = b.dataset.k === '1';
  document.querySelectorAll('#s3d .btn').forEach(function(t){
    t.classList.toggle('on', (t.dataset.k === '1') === S3.bad);
  });
  note3();
});

/* ================================================================
   场景 4：检测
   ================================================================ */
const S4 = { k:0 };
const st4 = new Stage('cv3', 360, 288);
const T4 = [
  {t:'一次绕组两端', meter:'万用表 Ω', good:'几十~几百 Ω', bad:'∞ 或 0',
   rd:'286.4', unit:'Ω', a:[110,70], b:[110,136],
   why:'电压高的那一侧匝数多、线细，直流电阻大。读到 ∞ 就是断线，明显偏小是匝间短路。'},
  {t:'二次绕组两端', meter:'万用表 Ω', good:'零点几~几 Ω', bad:'∞',
   rd:'0.8', unit:'Ω', a:[250,70], b:[250,136],
   why:'二次侧匝数少、线粗，本来就只有零点几欧。读到接近 0 是正常的，别当成短路。'},
  {t:'绕组对外壳', meter:'兆欧表 500 V', good:'≥ 0.5 MΩ', bad:'几百 kΩ',
   rd:'> 500', unit:'MΩ', a:[110,70], b:[180,164],
   why:'这一步万用表干不了：它只送几伏电压，测不出「加上工作电压才击穿」的隐患。'}
];

function draw4(){
  const g = st4.g; st4.clear();
  const d = T4[S4.k];
  EP.heading(g, 20, 16, '量三处判好坏', '断电、放电、拆掉二次负载之后');

  /* 变压器外壳 + 两个绕组 */
  box(g, 110, 48, 140, 110, 8, C.card, C.metalD, 1.6);
  vcoil(g, 150, 62, 144, 6, false);
  vcore(g, 180, 56, 150);
  vcoil(g, 210, 62, 144, 6, true);
  g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.4; g.lineCap = 'round';
  g.beginPath();
  g.moveTo(110, 70); g.lineTo(150, 70);
  g.moveTo(110, 136); g.lineTo(150, 136);
  g.moveTo(250, 70); g.lineTo(210, 70);
  g.moveTo(250, 136); g.lineTo(210, 136);
  g.moveTo(180, 158); g.lineTo(180, 164);
  g.stroke(); g.restore();
  EP.terminal(g, 110, 70, 4.4); EP.terminal(g, 110, 136, 4.4);
  EP.terminal(g, 250, 70, 4.4); EP.terminal(g, 250, 136, 4.4);
  EP.terminal(g, 180, 164, 4.4);
  txt(g, '一次', 100, 62, {sz:9.5, b:1, c:C.acc, al:'right'});
  txt(g, '二次', 260, 62, {sz:9.5, b:1, c:C.ok, al:'left'});
  txt(g, '外壳（金属）', 260, 152, {sz:9, c:C.tx3, al:'left'});

  /* 表笔：红黑两根引到选中的两个点 */
  const MX = 180, MY = 232;
  /* 表笔线要**绕着外壳走**，不能斜着穿过绕组（截图抓到的）：
     左边的点走 x=80 那条道，右边的点走 x=280，底下那个接地端直上直下 */
  [[d.a, C.err, -34], [d.b, C.tx2, 34]].forEach(function(q){
    const px = q[0][0], py = q[0][1];
    const lane = py > 150 ? px : (px < 180 ? 80 : 280);
    g.save(); g.strokeStyle = q[1]; g.lineWidth = 2.2; g.lineCap = 'round'; g.lineJoin = 'round';
    g.beginPath();
    g.moveTo(MX + q[2], MY - 22);
    g.lineTo(MX + q[2], 190);
    g.lineTo(lane, 190);
    g.lineTo(lane, py);
    g.lineTo(px, py);
    g.stroke(); g.restore();
    g.save(); g.fillStyle = q[1];
    g.beginPath(); g.arc(q[0][0], q[0][1], 3.4, 0, Math.PI*2); g.fill(); g.restore();
  });
  /* 表 */
  box(g, 108, MY - 22, 144, 52, 8, C.box, C.boxLine, 1.4);
  EP.readout(g, 118, MY - 14, 124, 26, d.rd + ' ' + d.unit);
  txt(g, d.meter, 180, MY + 22, {sz:9.5, b:1, c:C.tx2});

  box(g, 20, MY + 34, 320, 26, 6, C.okbg, C.ok, 1);
  txt(g, '好的应该是：' + d.good, 180, MY + 47, {sz:10.5, b:1, c:C.ok});
}
function note4(){
  const d = T4[S4.k];
  $('s4a').textContent = d.meter;
  $('s4b').textContent = d.good;
  $('s4c').textContent = d.bad;
  $('n3').innerHTML = '<div class="st">' + (S4.k+1) + '　' + d.t + '</div>' +
    d.why + '<br>' +
    (S4.k === 2
      ? '<b>这一步是判断「能不能通电」的关键。</b>绕组电阻正常不代表能用 ——' +
        '受潮的变压器电阻照样正常，一通电就跳闸甚至冒烟。<br>' +
        '<span class="sub">受潮的变压器在<b>烘干</b>之后绝缘往往能恢复，' +
        '不一定要换。但烘干要按规程来，不能拿喷灯烤。</span>'
      : '<b>量之前一定要把二次侧的负载拆掉</b>，' +
        '否则量到的是「绕组并上负载」的等效值，比真实值小，容易误判成匝间短路。<br>' +
        '<span class="sub">拿不准就跟<b>同型号的另一台</b>比 —— ' +
        '绝对值记不住，但两台差一大截一眼就看得出来。</span>');
}
document.getElementById('s4k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S4.k = +b.dataset.k;
  document.querySelectorAll('#s4k .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S4.k);
  });
  note4(); draw4();
});

/* ================================================================
   绑定
   ================================================================ */
function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会重设画布尺寸并清空内容。场景 1/3 在 rAF 循环里每帧重画，
     静态的那几屏必须在这儿补画一次 —— 否则第一次进来是**空白画布**
     （切页签也会再触发一次 fitAll，同样要补）。截图抓到的。 */
  draw2(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:2, sec:'2.6'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('2.6');
  let h = '';
  h += nb.prev ? '<a href="'+nb.prev.f+'">‹ '+nb.prev.id+' '+nb.prev.t+'</a>'
               : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next ? '<a class="next" href="'+nb.next.f+'">'+nb.next.id+' '+nb.next.t+' ›</a>'
               : '<span>后面几节还没做</span>';
  $('pager').innerHTML = h;
})();

loop(function(dt){
  if(cur === 0) draw1();
  else if(cur === 2) draw3(dt);
});
  }
});
})();
