/* 5.7 常用电子元器件的检测 —— 本节内容的唯一真相。
   对应《零基础学电工》第 5 章 5.7 节（书内 P95~P100）。

   四屏：① 电阻·电容·电感 ② 二极管与 LED ③ 晶体管与场效应管 ④ 晶闸管

   **和 2.5a / 2.5b 的分工**：那两节讲的是这些元件**是什么、在电路里干什么**
   （读色环、RC 充放电、反电动势、整流、晶体管当开关、晶闸管调压）；
   这一节讲的是**拿一支表怎么把它验出来**。有几处会互相印证，文案里都点了出处。

   数字口径（书上实测值与原文，别凭记忆改）：
   - 电阻器：色环「红 黄 棕 金」→ 标称 **240 Ω ±5%**；量程选 R×10，
     读数 **24 × 10 = 240 Ω**，正常（书 P96 图 5-25）
   - 电解电容：检测前先识别引脚极性，**用电阻器放电**，再用数字表电容档测；
     实测 **100.9 µF**（标称 100 µF）（书 P96~97 图 5-26、5-27）
   - **哪些算大容量、必须放电**（书 P96 提示说明）：工作电压在 **200 V 以上**的；
     或者电压不高但容量高于 **300 µF** 的。常见的大容量电解电容：
     **1000 µF/50 V、60 µF/400 V、300 µF/50 V、60 µF/200 V**
   - 电感器：用万用表附加测试器的 Lx 插孔，实测 **0.114 mH = 114 µH**，
     与标称基本相符（书 P97 图 5-28）
   - 整流二极管：**正向导通电压 0.2~0.3 V → 锗材料；0.6~0.7 V → 硅材料**；
     **反向没有导通电压（显示 OL）**。书上那次实测正向 **0.510 V**（书 P98 图 5-29）
   - 发光二极管：R×1k 档，**正向：二极管发光，阻值约 20 kΩ；反向：不发光，阻值 ∞**。
     正反都 ∞ → 断路；正反都趋于 0 → 击穿短路（书 P98 图 5-30）
   - 晶体管：数字表放大倍数档 + 附加测试器，按 NPN/PNP 标识插入，
     实测 **hFE = 80**，正常（书 P99 图 5-31）
   - 结型场效应管：指针表 R×1k 档，**黑表笔接漏极 D、红表笔接源极 S**，
     实测 **5 kΩ**；用螺钉旋具接触栅极 G，**指针产生较大的摆动 → 有放大能力**。
     摆动幅度越大放大能力越好；螺钉旋具碰 G 时指针不动 → 已失去放大能力（书 P99 图 5-32）
   - **绝缘栅型场效应管测栅极时尽量不要用手碰引脚**，要借助螺钉旋具 ——
     人体感应电压过高或人体静电会击穿它（书 P99 提示说明）
   - 单向晶闸管：指针表 R×1 档，**黑笔接阳极 A、红笔接阴极 K，阻值为 ∞**；
     黑笔同时搭在**阳极和控制极 G**（两引脚短接）→ 指针向右大范围摆动，说明已被正向触发导通；
     **保持红笔不动、黑笔脱开 G 只接 A，指针仍指示低阻值 → 有触发能力**（书 P100 图 5-33） */
(function(){
'use strict';
ELEC.reg({
  id: '5.7',
  file: 'c5-7.html',
  title: '5.7 电子元器件的检测',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>阻容感</button>
    <button class="tab" data-i="1"><span class="n">2</span>二极管</button>
    <button class="tab" data-i="2"><span class="n">3</span>晶体管</button>
    <button class="tab" data-i="3"><span class="n">4</span>晶闸管</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">这三种，量的是「参数对不对得上标称值」</div>
    电阻、电容、电感都有一个印在身上（或者用色环标出来）的<b>标称值</b>。
    检测就是<b>量出实际值，和标称值比一比</b>。
    <b>切一种看看量法和实测数。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">电阻器</button>
        <button class="btn sm" data-k="1">电解电容</button>
        <button class="btn sm" data-k="2">电感器</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">标称</div><div class="v" id="s1a">240 Ω ±5%</div></div>
        <div class="num"><div class="k">实测</div><div class="v" id="s1b">240 Ω</div></div>
        <div class="num hi"><div class="k">用什么档</div><div class="v" id="s1c">R×10</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">大容量电解电容，测之前必须放电</div>
    电容工作时存着电荷，<b>直接拿表去测会产生很强的电流，损坏万用表，也可能引发触电</b>。
    <b>用一个阻值较小的电阻，把它的两个引脚短接一下</b>就放完了。
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>什么算大容量</th><th>常见的</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">工作电压<br>200 V 以上</td>
          <td rowspan="2"><b>1000 µF/50 V</b>　<b>60 µF/400 V</b><br>
              <b>300 µF/50 V</b>　<b>60 µF/200 V</b></td></tr>
        <tr><td class="eu-s">电压不高但<br>容量 &gt; 300 µF</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>别用螺丝刀直接短接</b> —— 会打出很响的火花、烧出坑，大容量的还可能伤人。
      用电阻慢慢放才对。
      <span class="sub">电解电容有极性，<b>外壳上标着「−」的那一侧是负极</b>，
      负极引脚一般也更短。放电和测量都要先认清极性。</span>
    </div>
  </div>

  <div class="bet" data-bet="c57-cap" data-q="一个 1000µF/50V 的电解电容，工作电压只有 50V。测之前要不要放电？"
       data-opts="不用，50V 不算高|要——容量高于 300µF 就算大容量，电压不高也一样要放|要，所有电容都要放" data-right="1"
       data-after="要。书上的判据有两条，满足任一条就算大容量：工作电压在 200V 以上的；或者电压不高但容量高于 300µF 的。1000µF 远超 300µF，属于第二条。放电用一个阻值较小的电阻把两个引脚短接一下就行——别用螺丝刀直接短接，会打火花烧出坑。"></div>
</section>

<!-- ================= 场景 2：二极管与 LED ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">二极管：正反各量一次，看导通电压</div>
    整流二极管靠的是<b>单向导电</b>，所以量法就是正反各量一次：
    <b>正接有一个导通电压，反接没有（显示 OL）</b>。
    而那个导通电压的具体数值，还告诉你它是<b>硅管还是锗管</b>。
    <b>切一种情况看。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">整流管 · 正接</button>
        <button class="btn sm" data-k="1">整流管 · 反接</button>
        <button class="btn sm" data-k="2">LED · 正接</button>
        <button class="btn sm" data-k="3">LED · 反接</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">怎么接</div><div class="v" id="s2a">正接</div></div>
        <div class="num"><div class="k">读数</div><div class="v" id="s2b">0.510 V</div></div>
        <div class="num hi"><div class="k">说明</div><div class="v" id="s2c">正常·硅管</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">导通电压说出材料（书上原文）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>正向导通电压</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">0.2 ~ 0.3 V</td><td>这只整流二极管是<b>锗材料</b>制作的</td></tr>
        <tr><td class="eu-s">0.6 ~ 0.7 V</td><td>这只是<b>硅材料</b>制作的</td></tr>
        <tr><td class="eu-s">反向　OL</td><td>正常 —— <b>正常的整流二极管没有反向导通电压</b></td></tr>
        <tr><td class="eu-s">正反都不对</td><td>该整流二极管不良</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>发光二极管用的是另一套：R×1k 电阻档</b>（不是二极管档）。
      正向<b>会发光</b>、阻值约 <b>20 kΩ</b>；反向不发光、阻值 <b>∞</b>。
      <span class="sub">为什么 LED 要用 R×1k：指针表在这一档的内部电压比较高，
      足以点亮 LED；二极管档的电流太小，多半点不亮。
      正反都 ∞ 是断路，正反都趋于 0 是击穿短路。</span>
    </div>
  </div>

  <div class="bet" data-bet="c57-d" data-q="量一只整流二极管，正接 0.25V、反接 OL。这只管子怎么样？"
       data-opts="坏了，正向电压太低|好的，而且是锗管——0.2~0.3V 是锗材料，反向 OL 正是正常表现|坏了，反向应该也有读数" data-right="1"
       data-after="好的，是锗管。正向导通电压 0.2~0.3V 说明是锗材料，0.6~0.7V 才是硅材料——两种都正常，只是材料不同。反向显示 OL（没有导通电压）正是正常的整流二极管该有的表现，因为它单向导电。正反都不对才叫不良。"></div>
</section>

<!-- ================= 场景 3：晶体管与场效应管 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">这两种量的是「还有没有放大能力」</div>
    晶体管和场效应管的核心本事是<b>放大</b>。所以检测它们不是量通断，
    是<b>看它还能不能放大</b>：晶体管用数字表的 <b>hFE 插孔</b>直接读出放大倍数，
    场效应管用指针表看<b>碰一下栅极指针摆不摆</b>。<b>切一种看。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">晶体管 hFE</button>
        <button class="btn sm" data-k="1">场效应管 · 碰栅极</button>
        <button class="btn sm" data-k="2">场效应管 · 不摆</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">量什么</div><div class="v" id="s3a">放大倍数</div></div>
        <div class="num"><div class="k">读数</div><div class="v" id="s3b">80</div></div>
        <div class="num hi"><div class="k">判定</div><div class="v" id="s3c">正常</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">测绝缘栅型场效应管的栅极，别用手碰</div>
    书上专门提示：<b>绝缘栅型场效应管的栅极输入阻抗极高</b>，
    <b>人体感应电压过高或人体静电会把它击穿</b>。
    所以测栅极时<b>尽量不要用手触碰引脚，要借助螺钉旋具去碰</b>。
    <div class="tip">
      <b>为什么用螺钉旋具</b>：金属杆能把栅极上积累的电荷导走一部分，
      而且不像手指那样把人体的静电和感应电压直接加上去。
      <span class="sub">同样的道理：<b>场效应管平时要用金属箔或导电海绵把引脚短接着存放</b>，
      焊接时烙铁要接地。这类管子最常见的损坏原因就是静电击穿 ——
      而且击穿了外表一点看不出来。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">场效应管这一招的完整步骤（书上原文）</div>
    ① 万用表量程调到 <b>R×1k</b> 电阻档；
    ② <b>黑表笔搭在漏极 D、红表笔搭在源极 S</b>（书上那次实测 <b>5 kΩ</b>）；
    ③ <b>用螺钉旋具接触栅极 G</b>，看指针摆不摆。
    <div class="tip info">
      <b>指针产生较大的摆动 → 有放大能力，摆动幅度越大放大能力越好。</b>
      <b>螺钉旋具碰 G 时指针不动 → 已失去放大能力。</b>
      <span class="sub">还有一条实用的：<b>第一次测量时摆动、再测就不动了，也是正常的</b> ——
      那是因为第一次测量时 G、S 之间的结电容积累了电荷。
      想让指针再次摆动，<b>测量后短接一下 G、S 极</b>就行（书上原话）。</span>
    </div>
  </div>

  <div class="bet" data-bet="c57-fet" data-q="测一只场效应管，第一次碰栅极指针大幅摆动，再碰一次却不动了。坏了吗？"
       data-opts="坏了，应该每次都摆|没坏——第一次测量时 G、S 之间的结电容积累了电荷；短接一下 G、S 极再测就又会摆|表坏了" data-right="1"
       data-after="没坏。这是书上专门提到的一条：第一次测量时 G、S 之间的结电容积累了电荷，所以再碰栅极就不摆了。测量后短接一下 G、S 极把电荷放掉，再测又能摆。不知道这一条的话很容易把好管子判成坏的。"></div>
</section>

<!-- ================= 场景 4：晶闸管 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">晶闸管量的是「触发能力」，不是阻值</div>
    书上说得很直接：<b>晶闸管采用阻值检测方法无法判断内部开路状态</b>，
    所以一般不直接用万用表测阻值判断，而是<b>借助万用表检测它的触发能力</b>。
    三步走。<b>点一步看一步。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">① 黑笔 A、红笔 K</button>
        <button class="btn sm" data-k="1">② 黑笔同时碰 A 和 G</button>
        <button class="btn sm" data-k="2">③ 黑笔脱开 G</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这一步</div><div class="v" id="s4a">黑 A 红 K</div></div>
        <div class="num"><div class="k">读数</div><div class="v" id="s4b">∞</div></div>
        <div class="num hi"><div class="k">说明</div><div class="v" id="s4c">还没触发</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">三步下来该看到的三个现象（书上原文）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>步骤</th><th>正常表现</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">① 黑笔接阳极 A<br>红笔接阴极 K</td>
          <td>阻值为 <b>∞</b>（R×1 档）</td></tr>
        <tr><td class="eu-s">② 黑笔同时搭在<br>A 和控制极 G</td>
          <td>指针<b>向右大范围摆动</b> —— 已被正向触发导通</td></tr>
        <tr><td class="eu-s">③ 红笔不动<br>黑笔脱开 G 只接 A</td>
          <td>指针<b>仍指示低阻值</b> —— 说明<b>维持导通</b>，有触发能力</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>第 ③ 步才是关键。</b>晶闸管的特性就是「触发一下就一直导通，
      直到电流小到维持不住为止」—— 第 ③ 步验的正是这个<b>维持</b>能力。
      <span class="sub">2.5b 那一节讲过它在调压电路里怎么用（改变触发角就改变输出电压），
      这一节是「怎么验它还能不能触发」。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">双向晶闸管，同一个路子（书上原文）</div>
    用 <b>R×1</b> 档（输出电流大）：
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>接法</th><th>正常表现</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">红笔 T1<br>黑笔 T2</td><td>阻值为 <b>∞</b></td></tr>
        <tr><td class="eu-s">黑笔同时<br>碰 T2 和 G</td><td>指针<b>向右大范围摆动</b> —— 已导通（方向 T2 → T1）</td></tr>
        <tr><td class="eu-s">表笔对换<br>再来一次</td><td>指针同样大范围摆动 —— 说明<b>另一方向也能导通</b>（T1 → T2）</td></tr>
        <tr><td class="eu-s">黑笔脱开 G<br>只接 T1</td><td>指针<b>仍指示低阻值</b> —— 有触发能力</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>双向晶闸管两个方向都要试</b>，这是它和单向晶闸管唯一的差别。
      <span class="sub">2.5b 讲过：真正的调光器用的是双向晶闸管，
      正负半周都能导通，所以能调到满功率；单向的只能用半个周期，
      调到最亮也只有一半。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="c5-7">
    <div class="qz" data-q="一个 1000µF/50V 的电解电容，测之前要不要放电？"
         data-opts="不用，工作电压只有 50V|要——大容量的判据有两条：工作电压 200V 以上，或者电压不高但容量高于 300µF。1000µF 属于第二条|所有电容都不用放电"
         data-right="1"
         data-why="要放电。判据满足任一条就算大容量：工作电压 200V 以上；或者电压不高但容量高于 300µF。1000µF 远超 300µF。不放电直接测会产生很强的电流损坏万用表，也可能引发触电。放电用一个阻值较小的电阻把两个引脚短接一下——别用螺丝刀直接短，会打火花烧出坑。"></div>
    <div class="qz" data-q="整流二极管正接量到 0.25V，反接 OL。这只管子怎么样？"
         data-opts="坏了|好的，而且是锗管——0.2~0.3V 是锗材料、0.6~0.7V 是硅材料，反向 OL 正是正常表现|好的，是硅管"
         data-right="1"
         data-why="好的，锗管。正向导通电压的数值告诉你材料：0.2~0.3V 是锗、0.6~0.7V 是硅，两种都正常。反向显示 OL（没有反向导通电压）正是单向导电该有的表现。正反都不对才叫不良。注意发光二极管用的是另一套：R×1k 电阻档，正向发光且约 20kΩ、反向 ∞。"></div>
    <div class="qz" data-q="测绝缘栅型场效应管的栅极，为什么要用螺钉旋具去碰而不用手？"
         data-opts="手指太粗碰不准|栅极输入阻抗极高，人体感应电压过高或人体静电会把它击穿|为了读数准确"
         data-right="1"
         data-why="防静电击穿。绝缘栅型场效应管的栅极输入阻抗极高，人体的感应电压和静电足以把栅极的绝缘层击穿——而且击穿了外表一点看不出来。所以书上专门提示：测栅极时尽量不要用手触碰引脚，借助螺钉旋具去碰。同理，这类管子存放时要用金属箔或导电海绵把引脚短接着。"></div>
    <div class="qz" data-q="检测单向晶闸管的触发能力，三步里哪一步最关键？"
         data-opts="第①步，量 A-K 之间是不是 ∞|第③步，黑笔脱开 G 只接 A 之后指针仍指示低阻值——这验的是「维持导通」的能力|第②步，看指针摆不摆"
         data-right="1"
         data-why="第③步。晶闸管的特性是「触发一下就一直导通，直到电流小到维持不住」。第②步只能说明它被触发了，第③步脱开控制极之后仍然保持低阻值，才说明它有真正的触发和维持能力。书上也说了：晶闸管用阻值检测方法无法判断内部开路状态，所以要测的是触发能力而不是阻值。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 5 章 5.7 节（书内 P95~P100）—— 第 5 章到此结束<br>240 Ω、100.9 µF、0.114 mH、0.510 V、20 kΩ、hFE=80、5 kΩ 都是书上的实测值</div>
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

const CANH = 276;
function bar(g, l1, l2, kind, y){
  const Y = y || 230;
  const bg = kind === 'ok' ? C.okbg : kind === 'err' ? C.errbg : kind === 'warn' ? C.warnbg : C.accbg;
  const fg = kind === 'ok' ? C.ok : kind === 'err' ? C.err : kind === 'warn' ? C.warn : C.acc;
  EC.box(g, 18, Y, 324, 38, 6, bg, fg, 1);
  txt(g, l1, 180, Y + 13, {sz:10.5, b:1, c:fg});
  txt(g, l2, 180, Y + 28, {sz:9, c:C.tx2});
}
function tip2(g, x, y, red){
  const c = red ? C.err : C.tx;
  g.save();
  g.fillStyle = c; g.beginPath(); g.arc(x, y, 3.4, 0, Math.PI*2); g.fill();
  g.globalAlpha = .45; g.strokeStyle = c; g.lineWidth = 1.3;
  g.beginPath(); g.arc(x, y, 6.6, 0, Math.PI*2); g.stroke();
  g.restore();
}
/* 四屏共用：元件画在左上、表在右下，表笔线不穿元件 */
const MT = {x:200, y:132, w:140, h:88};
function meter(g, mode, read, rsz, pts, yT, yB){
  const jacks = EP.meterUnit(g, MT.x, MT.y, MT.w, MT.h,
    {mode:mode, reading:read, rsz:rsz || 16,
     jacks:[{n:'COM'}, {n:'VΩ', red:true}], hot:1});
  if(pts){
    EP.leads(g, jacks[1], jacks[0], pts[0][0], pts[1][0],
             {yTop:yT == null ? 24 : yT, yBot:yB == null ? 118 : yB,
              tipYR:pts[0][1], tipYB:pts[1][1]});
    tip2(g, pts[0][0], pts[0][1], true);
    tip2(g, pts[1][0], pts[1][1], false);
  }
  return jacks;
}

/* ================================================================
   场景 1：电阻 / 电容 / 电感
   ================================================================ */
const RCL = [
  {t:'电阻器', nom:'240 Ω ±5%', got:'240', unit:'Ω', mode:'Ω', dial:'R×10',
   bar:['色环「红 黄 棕 金」＝ 240 Ω ±5%', '选 R×10 档，读 24 × 10 = 240 Ω，和标称对得上']},
  {t:'电解电容', nom:'100 µF', got:'100.9', unit:'µF', mode:'µF', dial:'电容档',
   bar:['测之前先放电，再插进电容专用插孔', '实测 100.9 µF，和标称 100 µF 基本相符']},
  {t:'电感器', nom:'114 µH', got:'0.114', unit:'mH', mode:'mH', dial:'电感档',
   bar:['0.114 mH × 10³ = 114 µH', '和色环电感的标称量基本相符，说明性能良好']}
];
const S1 = { k:0 };
const st1 = new Stage('cv0', 360, CANH);

function draw1(){
  const g = st1.g; st1.clear();
  const it = RCL[S1.k];
  EP.heading(g, 12, 14, it.t, '实测值 vs 标称值');
  const cy = 66;
  if(S1.k === 0){
    EP.resistor(g, 90, cy, {len:64, dia:22, bands:['#c0392b','#e8b93c','#8a5a2b','#c8a02e'], wide:true});
    txt(g, '红　黄　棕　金', 90, cy + 26, {sz:9, c:C.tx2});
  }else if(S1.k === 1){
    /* 电解电容：一个圆柱 + 负极标识 */
    box(g, 66, cy - 26, 48, 52, 6, '#2b3540', C.boxLine, 1.4);
    g.save(); g.fillStyle = C.tx3;
    g.fillRect(70, cy - 22, 10, 44); g.restore();
    txt(g, '−', 75, cy, {sz:14, b:1, c:'#0d1013'});
    txt(g, '100 µF', 96, cy - 8, {sz:9, b:1, c:C.tx2});
    txt(g, '10 V', 96, cy + 8, {sz:8.5, c:C.tx3});
    g.save(); g.strokeStyle = P.steel || C.metal; g.lineWidth = 2.2; g.lineCap = 'round';
    g.beginPath(); g.moveTo(78, cy + 26); g.lineTo(78, cy + 46);
    g.moveTo(102, cy + 26); g.lineTo(102, cy + 40); g.stroke(); g.restore();
    txt(g, '负极引脚更短', 128, cy + 40, {sz:8, c:C.tx3, al:'left'});
  }else{
    EP.inductor(g, 90, cy, {len:60, r:9, n:5, core:true});
    txt(g, '色环电感', 90, cy + 26, {sz:9, c:C.tx2});
  }
  /* 标称 vs 实测 */
  box(g, 22, 108, 156, 46, 6, C.box, C.boxLine, 1);
  txt(g, '标称', 100, 122, {sz:8.5, c:C.tx3});
  txt(g, it.nom, 100, 140, {sz:11, b:1, c:C.tx});
  meter(g, it.mode, it.got, 17, null);
  txt(g, it.dial, MT.x + MT.w/2, MT.y - 10, {sz:9, b:1, c:C.acc});
  bar(g, it.bar[0], it.bar[1], 'ok');
}
function note1(){
  const it = RCL[S1.k];
  $('s1a').textContent = it.nom;
  $('s1b').textContent = it.got + ' ' + it.unit;
  $('s1c').textContent = it.dial;
  const H = [
    '<div class="st">电阻器：先读色环，再选量程</div>' +
    '书上那只：色环从左向右依次是 <b>红、黄、棕、金</b>，' +
    '对照色环文表格可知标称阻值 <b>240 Ω</b>、允许偏差 <b>±5%</b>。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>选量程要和识读数值相近</b>：240 Ω 选 <b>R×10</b> 档，' +
    '指针停在 24 的位置，<b>24 × 10 = 240 Ω</b>，正常。' +
    '<span class="sub">指针表<b>换一次倍率就要重新欧姆调零</b>（3.6b 讲过）。' +
    '色环怎么读见 2.5a —— 那一节有个色环读数器，四个下拉一选就出阻值。</span></div>',

    '<div class="st bad">电解电容：先认极性，再放电，最后才测</div>' +
    '① <b>识别引脚极性</b>：外壳上标着「<b>−</b>」的那一侧是负极，负极引脚一般也更短；' +
    '② <b>用一个阻值较小的电阻</b>把两个引脚短接放电；' +
    '③ 把两个引脚<b>按极性对应插入附加测试器的插孔</b>，用电容档读数。' +
    '<div class="tip" style="margin-top:8px">' +
    '书上实测 <b>100.9 µF</b>，标称 100 µF，基本相符，说明性能良好。' +
    '<span class="sub"><b>放电不能省</b>：电容工作时存着电荷，直接测会产生很强的电流，' +
    '损坏万用表也可能引发触电。<b>也别用螺丝刀直接短接</b> ——' +
    '会打出很响的火花、在引脚上烧出坑。</span></div>',

    '<div class="st">电感器：直接读电感量</div>' +
    '把引脚插进万用表附加测试器的 <b>Lx 电感量插孔</b>，读电感量。' +
    '书上实测 <b>0.114 mH</b>，换算一下：<b>1 µH = 10⁻³ mH</b>，' +
    '所以 0.114 mH × 10³ = <b>114 µH</b>，与色环电感的标称量基本相符。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>若测得的电感量与标称值相差较大，则说明电感器性能不良，可能已损坏。</b>' +
    '<span class="sub">没有电感档的表怎么办？只能用电阻档做个粗判：' +
    '量出几欧到几十欧是正常的（那是铜线的直流电阻），∞ 就是断了。' +
    '<b>量出几十欧不代表短路</b> —— 2.5a 专门讲过这条。</span></div>'
  ];
  $('n0').innerHTML = H[S1.k];
}
document.getElementById('s1k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S1.k = +t.dataset.k;
  document.querySelectorAll('#s1k .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.k === S1.k); });
  note1(); draw1();
});

/* ================================================================
   场景 2：二极管与 LED
   ================================================================ */
const DIO = [
  {t:'正接', led:false, fwd:true, read:'0.510', mode:'⊢⊣', say:'正常·硅管',
   bar:['正向有导通电压 0.510 V', '0.6~0.7 V 是硅管，0.2~0.3 V 是锗管 —— 这只偏硅']},
  {t:'反接', led:false, fwd:false, read:'OL', mode:'⊢⊣', say:'正常',
   bar:['反向显示 OL —— 没有反向导通电压', '这正是正常整流二极管该有的表现：单向导电']},
  {t:'LED 正接', led:true, fwd:true, read:'20', mode:'kΩ', say:'正常·发光',
   bar:['R×1k 档，二极管发光，阻值约 20 kΩ', '用电阻档不用二极管档 —— 那一档电流太小，点不亮']},
  {t:'LED 反接', led:true, fwd:false, read:'OL', mode:'kΩ', say:'正常·不亮',
   bar:['反向不发光，阻值为 ∞', '正反都 ∞ 是断路，正反都趋于 0 是击穿短路']}
];
const S2 = { k:0 };
const st2 = new Stage('cv1', 360, CANH);

function draw2(){
  const g = st2.g; st2.clear();
  const it = DIO[S2.k];
  EP.heading(g, 12, 14, it.led ? '发光二极管' : '整流二极管',
             it.fwd ? '正接（黑笔接负极侧）' : '反接');
  const cy = 68, dx = 92;
  /* 元件：正接时阳极在红笔那侧 */
  if(it.led){
    EP.led(g, dx, cy, {r:13, on: it.fwd, color:C.err});
  }else{
    EP.diode(g, dx, cy, {len:46, dia:17, horiz:true, flip: !it.fwd});
  }
  /* 引线 */
  new Path([[36, cy],[dx - 26, cy]]).stroke(g, 2.2, C.wire);
  new Path([[dx + 26, cy],[152, cy]]).stroke(g, 2.2, C.wire);
  txt(g, it.fwd ? '红笔 → 正极' : '红笔 → 负极', 92, cy + 30, {sz:9, c: it.fwd ? C.ok : C.tx2});
  if(it.led && it.fwd){
    g.save(); g.globalAlpha = .5; g.fillStyle = C.err;
    g.beginPath(); g.arc(dx, cy, 24, 0, Math.PI*2); g.fill(); g.restore();
    txt(g, '发光', dx, cy - 30, {sz:9, b:1, c:C.err});
  }
  meter(g, it.mode === '⊢⊣' ? 'V' : it.mode, it.read, 17,
        [[44, cy], [144, cy]], 26, 112);
  txt(g, it.led ? 'R×1k 电阻档' : '二极管档', MT.x + MT.w/2, MT.y - 10, {sz:9, b:1, c:C.acc});
  bar(g, it.bar[0], it.bar[1], 'ok');
}
function note2(){
  const it = DIO[S2.k];
  $('s2a').textContent = it.t;
  $('s2b').textContent = it.read === 'OL' ? 'OL（∞）' : it.read + (it.led ? ' kΩ' : ' V');
  $('s2c').textContent = it.say;
  const H = [
    '<div class="st good">正接：有一个导通电压，数值说出材料</div>' +
    '万用表调到<b>二极管测量档</b>，红、黑表笔分别搭在二极管的正、负极。' +
    '书上那次实测 <b>0.510 V</b>。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>0.2~0.3 V 是锗管，0.6~0.7 V 是硅管</b> —— 两种都正常，只是材料不同。' +
    '<span class="sub">2.5b 那一节还讲过一条：<b>指针表的红表笔是表内电池的负极</b>，' +
    '所以用指针表判极性时和数字表<b>正好相反</b>。数字表红笔是正极。</span></div>',

    '<div class="st good">反接：显示 OL，这是对的</div>' +
    '保持档位不变，把两支表笔<b>调换</b>再测一次。' +
    '<b>正常的整流二极管没有反向导通电压</b>，所以显示 OL。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>正反两次都要做</b>：只做正接的话，一只已经击穿短路的管子' +
    '正向也会给出一个很小的读数，看着像"导通电压偏低"；' +
    '<b>反接一测就露馅了 —— 击穿的管子反向也导通。</b>' +
    '<span class="sub">若实测的正、反向电压都不正常，则说明该整流二极管不良。</span></div>',

    '<div class="st good">LED 正接：发光 + 约 20 kΩ</div>' +
    '<b>档位选 R×1k 电阻档</b>（不是二极管档），并欧姆调零。' +
    '黑表笔搭在正极引脚、红表笔搭在负极引脚（指针表红笔是电池负极）。' +
    '<b>正常时二极管发光，测得正向阻值约 20 kΩ。</b>' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>为什么用 R×1k 而不是二极管档</b>：指针表在这一档的内部电压比较高，' +
    '足以点亮 LED；二极管档的测试电流太小，多半点不亮，' +
    '<b>而"亮不亮"正是这个测法最直观的判据</b>。</div>',

    '<div class="st good">LED 反接：不亮，阻值 ∞</div>' +
    '两支笔对调，LED 不发光，测得反向阻值为无穷大。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>两种坏法（书上原文）</b>：' +
    '<b>正向阻值和反向阻值都趋于无穷大 → 存在断路故障</b>；' +
    '<b>正向和反向阻值都趋于 0 → 存在击穿短路</b>。' +
    '<span class="sub">还有一种：正反阻值数值都很小，也可以断定已被击穿。</span></div>'
  ];
  $('n1').innerHTML = H[S2.k];
}
document.getElementById('s2k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S2.k = +t.dataset.k;
  document.querySelectorAll('#s2k .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.k === S2.k); });
  note2(); draw2();
});

/* ================================================================
   场景 3：晶体管与场效应管
   ================================================================ */
const S3 = { k:0 };
const st3 = new Stage('cv2', 360, 236);

function draw3(){
  const g = st3.g; st3.clear();
  if(S3.k === 0){
    EP.heading(g, 12, 14, '晶体管', 'hFE 插孔直接读放大倍数');
    /* 一只 TO-92 小晶体管 + 三个脚 */
    const cx = 92, cy = 62;
    g.save();
    g.beginPath(); g.arc(cx, cy, 17, Math.PI*0.15, Math.PI*0.85, true);
    g.lineTo(cx - 16, cy + 12); g.lineTo(cx + 16, cy + 12); g.closePath();
    g.fillStyle = '#1b2027'; g.fill();
    g.strokeStyle = C.boxLine; g.lineWidth = 1.3; g.stroke();
    g.restore();
    ['e','b','c'].forEach(function(n, i){
      const x = cx - 12 + i*12;
      g.save(); g.strokeStyle = P.steel || C.metal; g.lineWidth = 2; g.lineCap = 'round';
      g.beginPath(); g.moveTo(x, cy + 12); g.lineTo(x, cy + 30); g.stroke(); g.restore();
      txt(g, n, x, cy + 38, {sz:8, c:C.tx3});
    });
    txt(g, 'NPN 型', cx, cy - 26, {sz:9, b:1, c:C.tx2});
    /* hFE 插孔 */
    box(g, 176, 44, 164, 60, 6, C.box, C.boxLine, 1.2);
    txt(g, 'hFE 插孔（附加测试器）', 258, 58, {sz:8.5, c:C.tx3});
    ['E','B','C'].forEach(function(n, i){
      const x = 210 + i*32;
      g.save(); g.fillStyle = C.accbg; g.strokeStyle = C.acc; g.lineWidth = 1.3;
      g.beginPath(); g.arc(x, 82, 7, 0, Math.PI*2); g.fill(); g.stroke(); g.restore();
      txt(g, n, x, 82, {sz:8, b:1, c:C.acc});
    });
    txt(g, 'NPN', 306, 82, {sz:8.5, b:1, c:C.tx3});
    EP.meterUnit(g, 106, 118, 150, 58,
      {mode:'hFE', reading:'80', rsz:20, jacks:[{n:'放大倍数档'}], hot:-1});
    bar(g, '实测 hFE = 80 —— 放大倍数正常',
        '把待测晶体管按 NPN / PNP 标识对应插入附加测试器的插孔', 'ok', 182);
  }else{
    const ok = S3.k === 1;
    EP.heading(g, 12, 14, '结型场效应管', ok ? '碰栅极：指针大幅摆动' : '碰栅极：指针不动');
    const cx = 84, cy = 66;
    g.save();
    box(g, cx - 18, cy - 16, 36, 32, 3, '#1b2027', C.boxLine, 1.3);
    g.restore();
    ['G','S','D'].forEach(function(n, i){
      const x = cx - 12 + i*12;
      g.save(); g.strokeStyle = P.steel || C.metal; g.lineWidth = 2; g.lineCap = 'round';
      g.beginPath(); g.moveTo(x, cy + 16); g.lineTo(x, cy + 32); g.stroke(); g.restore();
      txt(g, n, x, cy + 40, {sz:8, b:1, c: n === 'G' ? C.warn : C.tx3});
    });
    /* 螺钉旋具碰 G */
    g.save();
    g.strokeStyle = P.steel || C.metal; g.lineWidth = 4; g.lineCap = 'round';
    g.beginPath(); g.moveTo(cx - 12, cy + 34); g.lineTo(cx - 34, cy + 56); g.stroke();
    g.strokeStyle = C.err; g.lineWidth = 7;
    g.beginPath(); g.moveTo(cx - 34, cy + 56); g.lineTo(cx - 48, cy + 70); g.stroke();
    g.restore();
    txt(g, '用螺钉旋具碰 G', cx + 14, cy + 58, {sz:8.5, c:C.warn, al:'left'});
    /* 指针摆动示意 */
    const GX = 186, GY = 40, GW = 154, GH = 74;
    box(g, GX, GY, GW, GH, 6, C.box, C.boxLine, 1);
    const midX = GX + GW/2, pivY = GY + GH - 8;
    g.save();
    g.strokeStyle = C.boxLine; g.lineWidth = 1;
    g.beginPath(); g.arc(midX, pivY, GH - 22, Math.PI*1.15, Math.PI*1.85); g.stroke();
    g.strokeStyle = ok ? C.warn : C.tx3; g.lineWidth = 2.4; g.lineCap = 'round';
    const ang = ok ? Math.PI*1.72 : Math.PI*1.28;
    g.beginPath(); g.moveTo(midX, pivY);
    g.lineTo(midX + Math.cos(ang)*(GH-24), pivY + Math.sin(ang)*(GH-24));
    g.stroke();
    if(ok){
      g.globalAlpha = .3; g.strokeStyle = C.warn;
      g.beginPath(); g.moveTo(midX, pivY);
      g.lineTo(midX + Math.cos(Math.PI*1.28)*(GH-24), pivY + Math.sin(Math.PI*1.28)*(GH-24));
      g.stroke();
    }
    g.restore();
    txt(g, ok ? '指针大幅摆动' : '指针纹丝不动', midX, GY + 14,
        {sz:9, b:1, c: ok ? C.warn : C.tx3});
    txt(g, 'R×1k 档　黑笔 D　红笔 S　实测 5 kΩ', 180, 156, {sz:9, c:C.tx2});
    bar(g, ok ? '指针产生较大摆动 —— 有放大能力' : '螺钉旋具碰 G 时指针不动 —— 已失去放大能力',
        ok ? '摆动幅度越大，放大能力越好' : '不过先试一次：短接 G、S 极放掉结电容的电荷再测',
        ok ? 'ok' : 'err', 182);
  }
}
function note3(){
  const T = ['放大倍数', '摆动幅度', '摆动幅度'];
  $('s3a').textContent = T[S3.k];
  $('s3b').textContent = S3.k === 0 ? '80' : (S3.k === 1 ? '大幅摆动' : '不动');
  $('s3c').textContent = S3.k === 2 ? '失去放大能力' : '正常';
  const H = [
    '<div class="st">晶体管：数字表直接读出放大倍数</div>' +
    '<b>放大能力是晶体管最基本的性能之一。</b>把数字万用表的档位旋钮调到' +
    '<b>放大倍数测量档</b>，在表上对应安装附加测试器，' +
    '把待测晶体管<b>按 NPN / PNP 标识的引脚插孔对应插入</b>。' +
    '<div class="tip info" style="margin-top:8px">' +
    '书上实测 <b>hFE = 80</b>，正常。' +
    '<span class="sub">hFE 就是电流放大倍数 β。同型号的管子这个数会有分散性' +
    '（几十到几百都有），<b>关键是「有没有」而不是「等于多少」</b> ——' +
    '读到 0 或者极小，就说明它已经不放大了。</span></div>',

    '<div class="st good">场效应管：碰一下栅极，看指针摆不摆</div>' +
    '① 量程调到 <b>R×1k</b> 电阻档；' +
    '② <b>黑表笔搭在漏极 D、红表笔搭在源极 S</b>（书上实测 <b>5 kΩ</b>）；' +
    '③ <b>用螺钉旋具接触栅极 G</b>。' +
    '<b>指针产生较大的摆动 → 有放大能力，摆动幅度越大放大能力越好。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>为什么会摆</b>：碰一下栅极相当于给它加了一个微小的输入信号，' +
    '管子把它放大成 D-S 之间电阻的明显变化 —— 指针一摆，放大能力就摆出来了。' +
    '<span class="sub"><b>绝缘栅型的不要用手碰栅极</b>：栅极输入阻抗极高，' +
    '人体感应电压过高或静电会把它击穿（书上专门提示的）。</span></div>',

    '<div class="st bad">指针不动 —— 但先别急着扔</div>' +
    '螺钉旋具碰 G 时指针不动，<b>说明该结型场效应晶体管已失去放大能力</b>。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>不过书上还有一条</b>：<b>第一次测量时摆动、再测就不动了，也是正常的</b> ——' +
    '那是因为第一次测量时 <b>G、S 之间的结电容积累了电荷</b>。' +
    '<b>想让指针再次摆动，测量后短接一下 G、S 极</b>把电荷放掉就行。' +
    '<span class="sub">不知道这一条的话，很容易把一只好管子判成坏的。' +
    '所以：<b>短接 G、S 再测一次，还是不动，才判它失去放大能力。</b></span></div>'
  ];
  $('n2').innerHTML = H[S3.k];
}
document.getElementById('s3k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S3.k = +t.dataset.k;
  document.querySelectorAll('#s3k .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.k === S3.k); });
  note3(); draw3();
});

/* ================================================================
   场景 4：晶闸管
   ================================================================ */
const SCR = [
  {t:'黑 A 红 K', read:'∞', say:'还没触发', ang:1.20, gOn:false,
   bar:['黑笔接阳极 A、红笔接阴极 K —— 阻值为 ∞', 'R×1 档。这一步只说明它没有被误导通']},
  {t:'黑笔碰 A + G', read:'低阻', say:'被触发导通', ang:1.76, gOn:true,
   bar:['黑笔同时搭在阳极和控制极上 —— 指针向右大范围摆动', '由表内电压给控制极提供正向触发信号']},
  {t:'黑笔脱开 G', read:'低阻', say:'维持导通·有触发能力', ang:1.74, gOn:false,
   bar:['保持红笔不动，黑笔脱开 G 只接 A —— 指针仍指示低阻值', '说明晶闸管维持导通状态，有触发能力']}
];
const S4 = { k:0 };
const st4 = new Stage('cv3', 360, 236);

function draw4(){
  const g = st4.g; st4.clear();
  const it = SCR[S4.k];
  EP.heading(g, 12, 14, '单向晶闸管', '第 ' + (S4.k+1) + ' 步 / 共 3 步');
  /* 晶闸管本体 + 三个脚 */
  const cx = 84, cy = 60;
  box(g, cx - 20, cy - 16, 40, 32, 3, '#1b2027', C.boxLine, 1.3);
  const names = ['K','G','A'];
  const px = [cx - 14, cx, cx + 14];
  names.forEach(function(n, i){
    const on = (n === 'A') || (n === 'G' && it.gOn) || (n === 'K');
    g.save();
    g.strokeStyle = (n === 'G' && it.gOn) ? C.warn : (P.steel || C.metal);
    g.lineWidth = 2.2; g.lineCap = 'round';
    g.beginPath(); g.moveTo(px[i], cy + 16); g.lineTo(px[i], cy + 34); g.stroke(); g.restore();
    txt(g, n, px[i], cy + 42, {sz:8.5, b:1, c: (n === 'G' && it.gOn) ? C.warn : C.tx3});
  });
  /* 表笔：黑笔在 A（右），红笔在 K（左）；第 2 步黑笔同时碰 A 和 G */
  tip2(g, px[0], cy + 34, true);
  tip2(g, px[2], cy + 34, false);
  if(it.gOn){
    g.save(); g.strokeStyle = C.tx; g.lineWidth = 2.6; g.lineCap = 'round';
    g.beginPath(); g.moveTo(px[1], cy + 34); g.lineTo(px[2], cy + 34); g.stroke(); g.restore();
    tip2(g, px[1], cy + 34, false);
    txt(g, '黑笔同时碰 A 和 G', cx, cy + 72, {sz:8.5, c:C.warn});
  }
  txt(g, '红笔 → K', px[0] - 8, cy + 58, {sz:8, c:C.err, al:'right'});
  txt(g, '黑笔 → A', px[2] + 8, cy + 58, {sz:8, c:C.tx2, al:'left'});
  /* 指针表 */
  const GX = 190, GY = 42, GW = 150, GH = 78;
  box(g, GX, GY, GW, GH, 6, '#f4f6f8', C.boxLine, 1.2);
  const midX = GX + GW/2, pivY = GY + GH - 8;
  g.save();
  g.strokeStyle = '#8d97a2'; g.lineWidth = 1.2;
  g.beginPath(); g.arc(midX, pivY, GH - 24, Math.PI*1.15, Math.PI*1.85); g.stroke();
  g.strokeStyle = '#b3261e'; g.lineWidth = 2.4; g.lineCap = 'round';
  g.beginPath(); g.moveTo(midX, pivY);
  g.lineTo(midX + Math.cos(Math.PI*it.ang)*(GH-26), pivY + Math.sin(Math.PI*it.ang)*(GH-26));
  g.stroke(); g.restore();
  txt(g, '∞', GX + 16, GY + 30, {sz:9, c:'#5a6674'});
  txt(g, '0', GX + GW - 16, GY + 30, {sz:9, c:'#5a6674'});
  txt(g, it.read, midX, GY + 16, {sz:10, b:1, c:'#1b2027'});
  txt(g, 'R×1 档', midX, GY + GH + 12, {sz:8.5, c:C.tx3});

  txt(g, '书上原话：晶闸管采用阻值检测方法无法判断内部开路状态', 180, 154,
      {sz:8.5, c:C.tx3});
  bar(g, it.bar[0], it.bar[1], S4.k === 2 ? 'ok' : null, 172);
}
function note4(){
  const it = SCR[S4.k];
  $('s4a').textContent = it.t;
  $('s4b').textContent = it.read;
  $('s4c').textContent = it.say;
  const H = [
    '<div class="st">① 黑笔接 A、红笔接 K —— 阻值为 ∞</div>' +
    '万用表调到 <b>R×1</b> 电阻档（这一档输出电流大）。' +
    '<b>黑表笔搭在单向晶闸管的阳极 A、红表笔搭在阴极 K</b>，测得的阻值应为无穷大。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>这一步只说明它没有被误导通</b>，还说明不了好坏 ——' +
    '一只内部开路的晶闸管，这一步量出来也是 ∞。' +
    '<span class="sub">这正是书上那句话的意思：<b>晶闸管采用阻值检测方法' +
    '无法判断内部开路状态</b>，所以要往下走第 ② ③ 步测触发能力。</span></div>',

    '<div class="st good">② 黑笔同时碰 A 和 G —— 指针大范围右摆</div>' +
    '把黑表笔同时搭在<b>阳极和控制极</b>两个引脚上（等于把 A 和 G 短接），' +
    '<b>由万用表内电压为控制极提供正向触发信号</b>。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>指针向右大范围摆动</b>，说明这只单向晶闸管已被正向触发导通。' +
    '<span class="sub">指针表的<b>黑表笔是表内电池的正极</b>，' +
    '所以黑笔接 A、红笔接 K 正好给晶闸管加了正向阳极电压；' +
    '再把黑笔碰一下 G，触发信号就到了。</span></div>',

    '<div class="st good">③ 黑笔脱开 G —— 指针仍是低阻，这才算合格</div>' +
    '<b>保持红表笔不动</b>，把黑表笔从控制极上脱开、只接阳极。' +
    '<b>指针仍指示低阻值</b>，说明该单向晶闸管<b>维持导通状态</b>，有触发能力。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>第 ③ 步才是关键。</b>晶闸管的特性就是「触发一下就一直导通，' +
    '直到电流小到维持不住为止」—— 第 ③ 步验的正是这个<b>维持</b>能力。' +
    '<span class="sub">要是黑笔一离开 G 指针就弹回 ∞，说明它触发不住 ——' +
    '装在调压电路里会时通时断。<b>双向晶闸管同一个路子，只是两个方向都要试一遍。</b>' +
    '（2.5b 讲过它在调压、软启动、固态继电器里怎么用。）</span></div>'
  ];
  $('n3').innerHTML = H[S4.k];
}
document.getElementById('s4k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S4.k = +t.dataset.k;
  document.querySelectorAll('#s4k .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.k === S4.k); });
  note4(); draw4();
});

/* ================================================================
   绑定
   ================================================================ */
function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  draw1(); draw2(); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:5, sec:'5.7'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('5.7');
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
