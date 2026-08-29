/* 5.6 电动机的检测 —— 本节内容的唯一真相。
   对应《零基础学电工》第 5 章 5.6 节（书内 P90~P95）。

   四屏：① 量绕组阻值 ② 量绝缘电阻 ③ 量空载电流 ④ 量转速与判极数

   **和 2.7 节的分工**：2.7 屏 4 已经讲过「三相绕组电阻平衡 + 对地绝缘」这两件事
   （那是作为电动机这个器件的一部分讲的）；这一节按书上的顺序把四项检测做全，
   补上**空载电流**和**转速／极数**这两项 —— 那两项是 2.7 没有的。

   数字口径（书上原文与实测值，别凭记忆改）：
   - 直流电动机：R×10 档，实测 **100 Ω**，属于正常范围（书 P90 图 5-17）
   - 单相交流电动机：运行绕组 **232.8 Ω**、起动绕组 **256.3 Ω**、两绕组串联 **489.3 Ω**
     （书 P90~91 图 5-18，最后那个显示的是 0.489 kΩ）。
     判据：**三个读数里有 2 个之和等于第 3 个（R1 + R2 = R3）**（书 P91 图 5-19）
   - 三相交流电动机：**任意两根引线之间的 3 个读数应相等（R1 = R2 = R3）**；
     任一为 ∞ 说明绕组内部断路（书 P91）。图 5-19 画的例子：
     **△ 联结每两根之间 4 Ω、Y 联结每两根之间 12 Ω**
   - 万用电桥精确测三相绕组：**0.433 × 10 Ω ≈ 4.33 Ω**，三相一致（书 P92 图 5-20）
   - 绝缘电阻：绕组对外壳、绕组对绕组，**均大于 1 MΩ 为正常**；
     远小于 1 MΩ 说明绝缘性能不良或内部导电部分与外壳之间有漏电（书 P92~93）
   - 空载电流：**约为额定电流的 40%~55%**（书 P93 提示说明）。
     书上例子：2 极、1.5 kW 的电动机，**I = P/U = 1500/380 ≈ 3.9 A**，
     钳形表实测三根引线空载电流均为 **1.7 A**（图 5-22）
   - 转速与极数（书 P95 图 5-24 那张表）：
     **2 极：同步 3000、异步 >2800 r/min；4 极：1500、>1400；6 极：1000、>900**
   - 没铭牌时判极数：万用表调到 **0.05 mA 档**，表笔搭在某一绕组两端，
     匀速转动主轴一周，**指针摆动 1 次是 2 极、2 次是 4 极、3 次是 6 极**（书 P95）

   **书上那个 I = P/U 是简化算法**（三相额定电流严格说要按 P = √3·U·I·cosφ·η 反算）。
   课文里照书给这个数，同时注明一句「铭牌上直接印着额定电流，以铭牌为准」——
   现场本来也不用自己算。 */
(function(){
'use strict';
ELEC.reg({
  id: '5.6',
  file: 'c5-6.html',
  title: '5.6 电动机的检测',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>量绕组</button>
    <button class="tab" data-i="1"><span class="n">2</span>量绝缘</button>
    <button class="tab" data-i="2"><span class="n">3</span>空载电流</button>
    <button class="tab" data-i="3"><span class="n">4</span>转速与极数</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">三根引线，两两量三次</div>
    三相电动机的三个绕组接在接线盒里，从外面能碰到的就是三根引线。
    <b>两两一量，一共三个读数</b> —— 三相电动机这三个数<b>应该相等</b>；
    单相电动机则是<b>其中两个之和等于第三个</b>。
    <b>切一种看看。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">三相 · 正常</button>
        <button class="btn sm" data-k="1">三相 · 一相断路</button>
        <button class="btn sm" data-k="2">单相电动机</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">三个读数</div><div class="v" id="s1a">4.33 齐平</div></div>
        <div class="num"><div class="k">该满足</div><div class="v" id="s1b">三个相等</div></div>
        <div class="num hi"><div class="k">判定</div><div class="v" id="s1c">正常</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">两条判据，一条给三相一条给单相（书上原文）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>电动机</th><th>三个读数应满足</th><th>不满足说明</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">三相<br>交流</td><td><b>R1 = R2 = R3</b>（三个相等）</td>
          <td>任一为 <b>∞</b> → 绕组内部断路</td></tr>
        <tr><td class="eu-s">单相<br>交流</td><td><b>R1 + R2 = R3</b>（两个之和等于第三个）</td>
          <td>任一为 <b>∞</b> → 绕组内部断路</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>单相那条是这么来的</b>：单相电动机有<b>起动绕组</b>和<b>运行绕组</b>两个绕组，
      共用一个公共端，一共引出三根线。两两量的时候，
      量到「公共端 ↔ 起动端」是起动绕组、「公共端 ↔ 运行端」是运行绕组，
      而「起动端 ↔ 运行端」量到的是<b>两个绕组串在一起</b>的阻值 —— 自然就等于前两个之和。
      <span class="sub">书上实测：运行绕组 <b>232.8 Ω</b>、起动绕组 <b>256.3 Ω</b>、
      串联 <b>489.3 Ω</b>。232.8 + 256.3 = 489.1，对得上。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">要判「三相差百分之几」，得用电桥</div>
    万用表的电阻档只能做<b>粗判</b>：看有没有明显的断路（∞）或短路（0）。
    <b>绕组阻值多在几欧这个量级</b>，而表笔本身就有零点几欧。
    <div class="tip">
      书上用<b>万用电桥</b>精确测这台三相电动机，三相都是
      <b>0.433 × 10 Ω ≈ 4.33 Ω</b>（阻值 ＝ 倍率 × 测量臂读数）。
      <span class="sub">图 5-19 还给了两个例子：<b>△ 联结</b>的电动机每两根引线之间约 <b>4 Ω</b>，
      <b>Y 联结</b>的约 <b>12 Ω</b> —— 同一台机子接法不同，量出来的数不一样，
      因为你量到的是「两相串联」还是「一相并两相串联」（2.7 节讲过星角接法）。</span>
    </div>
  </div>

  <div class="bet" data-bet="c56-w" data-q="单相电动机三根线两两量，得到 232.8Ω、256.3Ω、489.3Ω。正常吗？"
       data-opts="不正常，三个数应该相等|正常——单相的判据是「两个之和等于第三个」：232.8+256.3=489.1，对上了|看不出来" data-right="1"
       data-after="正常。单相电动机有起动绕组和运行绕组两个，共用一个公共端引出三根线，所以量到的三个数里必然有一个是另外两个串联的和。三个数相等那条判据是给三相电动机的——它三个绕组一样，两两量出来自然一致。"></div>
</section>

<!-- ================= 场景 2：量绝缘 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">绝缘也要量两处，判据是同一个数</div>
    <b>绕组与外壳之间</b>、<b>绕组与绕组之间</b>，两处都要量，
    <b>都要大于 1 MΩ</b>。远小于 1 MΩ 就说明绝缘不良，或者内部导电部分和外壳之间有漏电。
    <b>点一处看接线。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">绕组对外壳 · 正常</button>
        <button class="btn sm" data-k="1">绕组对外壳 · 受潮</button>
        <button class="btn sm" data-k="2">绕组对绕组</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">量哪两处</div><div class="v" id="s2a">绕组 ↔ 外壳</div></div>
        <div class="num"><div class="k">读数</div><div class="v" id="s2b">120 MΩ</div></div>
        <div class="num hi"><div class="k">判定</div><div class="v" id="s2c">正常</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">量绕组之间的绝缘，必须先打开接线盒取下连接片</div>
    电动机接线盒里那三块<b>连接片</b>把三个绕组连成了星形或三角形。
    <b>连接片不取下来，三个绕组是连通的</b> —— 量出来当然是 0，那不是绝缘坏了，
    是你在量一根导线。
    <div class="tip">
      <b>取下连接片，确认三个绕组之间没有任何连接关系，再量。</b>
      <span class="sub">量完记得<b>按原来的接法装回去</b> ——
      2.7 节讲过：横着两块是星形、竖着三块是三角形，装错了电动机会烧。
      拆之前先拍张照。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">摇的时候看指针，别只看最后那个数</div>
    书上原话：<b>应匀速转动绝缘电阻表的手柄，并观察指针的摆动情况</b>。
    为确保准确，测完一处要<b>等指针慢慢回到初始位置</b>，再顺时针摇下一处。
    <div class="tip info">
      <b>指针慢慢往上爬</b>是正常的（绝缘的电容在充电）；
      <b>爬上去又往回掉</b>，多半是受潮 —— 这就是 3.8 节点过的「吸收比」在说的事。
      <span class="sub">判据仍然是那一句：<b>均大于 1 MΩ 为正常</b>。
      低压电工日常那个 <b>≥ 0.5 MΩ</b> 是线路和一般设备的通用底线，
      电动机这儿书上给的是 1 MΩ，按更严的来。</span>
    </div>
  </div>

  <div class="bet" data-bet="c56-ins" data-q="量电动机绕组之间的绝缘，读数是 0Ω。第一件该做的事是什么？"
       data-opts="判定绕组间短路，拆电机|先看接线盒里的连接片取下来没有——没取的话三个绕组本来就是连通的|换一台绝缘电阻表" data-right="1"
       data-after="先看连接片。接线盒里那三块连接片把三个绕组连成了星形或三角形，不取下来量出来必然是 0——那是在量一根导线，不是绝缘坏了。取下连接片、确认三个绕组之间没有任何连接关系，再量一次。量完按原样装回去（拆之前拍张照）。"></div>
</section>

<!-- ================= 场景 3：空载电流 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">空载电流应该是额定电流的四到五成</div>
    电动机不带任何负载空转时，绕组里流的那个电流叫<b>空载电流</b>。
    正常情况下它<b>约为额定电流的 40%~55%</b>。
    用钳形表钳住三根引线中的每一根量一遍 —— <b>三根应该基本相等</b>。
    <b>拖滑杆看不同的空载电流意味着什么。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="rowlab">实测空载电流　<b id="s3v">1.7 A</b></div>
      <input type="range" id="s3r" min="8" max="34" step="1" value="17">
      <div class="nums three">
        <div class="num"><div class="k">额定电流</div><div class="v" id="s3a">3.9 A</div></div>
        <div class="num"><div class="k">占额定</div><div class="v" id="s3b">44%</div></div>
        <div class="num hi"><div class="k">判定</div><div class="v" id="s3c">正常</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">书上那台电动机的算法</div>
    <b>2 极、1.5 kW 的三相电动机</b>，书上按 <span class="key">I = P / U = 1500 / 380 ≈ 3.9 A</span>
    估出额定电流，钳形表实测三根引线的空载电流都是 <b>1.7 A</b> ——
    1.7 ÷ 3.9 ≈ <b>44%</b>，落在 40%~55% 里，正常。
    <div class="tip">
      <b>这是个简化算法。</b>三相电动机的额定电流严格说要按
      <span class="key">P = √3 · U · I · cosφ · η</span> 反算，
      算出来会比 P/U 大一些。<b>不过现场根本不用自己算 —— 铭牌上直接印着额定电流</b>，
      以铭牌为准。
      <span class="sub">书上这个估算法胜在简单，用来做「是不是差得离谱」的快速判断够用了。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">空载电流过大或三相不均衡，说明什么（书上原文）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>原因</th><th>怎么回事</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">铁心不良</td><td>硅钢片之间绝缘破坏、涡流损耗变大</td></tr>
        <tr><td class="eu-s">气隙过大</td><td>转子与定子之间的间隙过大 —— 多半是<b>轴承磨损</b>让转子偏了</td></tr>
        <tr><td class="eu-s">匝数过少</td><td>线圈匝数不足（重绕过的电动机最容易出这个问题）</td></tr>
        <tr><td class="eu-s">接错线</td><td><b>绕组连接错误</b> —— 该接星形的接成了三角形</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>三相空载电流不均衡</b>也是同一批原因，另外还要怀疑<b>某一相绕组匝间短路</b>。
      <span class="sub">钳形表的用法见 3.7 节：<b>一次只能钳一根</b>，
      钳两根量出来是第三相的电流，三根一起钳读到的是漏电流。</span>
    </div>
  </div>

  <div class="bet" data-bet="c56-noload" data-q="一台铭牌额定电流 3.9A 的电动机，空载电流量到 3.2A。正常吗？"
       data-opts="正常，比额定小就行|不正常——3.2÷3.9≈82%，远超 40%~55% 的正常范围，该查铁心、气隙、接线|正常，空载本来就该接近额定" data-right="1"
       data-after="不正常。空载电流约为额定电流的 40%~55% 才是正常的，82% 说明电动机空转时就在吃掉大半的额定电流。常见原因：铁心不良、转子与定子气隙过大（轴承磨损）、线圈匝数过少（重绕过）、绕组接错（该星形接成了三角形）。"></div>
</section>

<!-- ================= 场景 4：转速与极数 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">铭牌掉了，也能把极数问出来</div>
    转速要和铭牌上的额定转速比 —— <b>远高于额定是超速，远低于额定是过载或堵转</b>。
    可要是<b>铭牌掉了</b>呢？书上有一招：<b>万用表调到 0.05 mA 档，手转一圈数指针摆几次</b>。
    <b>切一种极数看看。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">摆动 1 次</button>
        <button class="btn sm" data-k="1">摆动 2 次</button>
        <button class="btn sm" data-k="2">摆动 3 次</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">转一圈摆</div><div class="v" id="s4a">1 次</div></div>
        <div class="num"><div class="k">这是</div><div class="v" id="s4b">2 极</div></div>
        <div class="num hi"><div class="k">额定转速</div><div class="v" id="s4c">&gt; 2800</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">极数 → 转速对照（书上图 5-24 那张表）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>极数</th><th>同步转速</th><th>异步电动机</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">2 极</td><td>3000 r/min</td><td><b>&gt; 2800 r/min</b></td></tr>
        <tr><td class="eu-s">4 极</td><td>1500 r/min</td><td><b>&gt; 1400 r/min</b></td></tr>
        <tr><td class="eu-s">6 极</td><td>1000 r/min</td><td><b>&gt; 900 r/min</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>同步转速 n₀ = 60f / p</b>（2.7 节讲过），50 Hz 下只有 3000 / 1500 / 1000 / 750 这几个值。
      异步电动机永远比同步转速慢一点点（那个差叫<b>转差</b>），
      所以铭牌上写 1440 就知道它是 <b>4 极</b>机。
      <span class="sub">反过来用：量出转速 1450，对照表就知道该是 4 极、同步 1500 ——
      转差 3.3%，正常。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">转速表怎么用（书上原文）</div>
    <b>把测试头对准转轴中心的凹点，并顶住轴心。</b>
    电动机运行 <b>1 min</b> 后停止检测，此时转速表显示的读数就是每秒钟的实际转速。
    <div class="tip">
      <b>把实测转速和铭牌上的额定转速比</b>：
      实际转速远高于额定 → <b>超速运转</b>；远低于额定 → <b>负载过重或堵转</b>。
      <span class="sub">堵转很危险：转子不转，电流会窜到额定的好几倍，
      几十秒就能把绕组烧了。热继电器就是防这个的（2.3 节讲过它的动作时间）。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="c5-6">
    <div class="qz" data-q="三相电动机三根引线两两量，得到 4.33、4.33、∞。什么毛病？"
         data-opts="正常，∞ 是因为那两根不是一对|有一相绕组内部断路——三相的判据是三个读数相等，出现 ∞ 就是断路|接线盒的连接片没取"
         data-right="1"
         data-why="一相绕组断路。三相电动机三个绕组一样，两两量出来的三个读数应该相等（书上实测 4.33Ω 三相一致）。任何一个是 ∞ 就说明那一路不通——绕组内部断线、引出线脱焊、或者接线盒端子松了。注意单相电动机的判据不一样：是「两个之和等于第三个」。"></div>
    <div class="qz" data-q="量电动机绕组与绕组之间的绝缘电阻，正确的准备工作是什么？"
         data-opts="直接量就行|打开接线盒取下连接片，确认三个绕组之间没有任何连接关系|先给电动机通电预热"
         data-right="1"
         data-why="取下连接片。接线盒里那三块连接片把三个绕组连成了星形或三角形，不取下来的话三个绕组本来就是连通的，量出来必然是 0——那是在量一根导线。取下之后再量，绕组对外壳、绕组对绕组都要大于 1MΩ。量完按原样装回去（横着两块是星形、竖着三块是三角形，拆之前拍张照）。"></div>
    <div class="qz" data-q="电动机空载电流正常应该是额定电流的多少？"
         data-opts="10% 以下|40%~55%|接近 100%"
         data-right="1"
         data-why="40%~55%。电动机空转时也要建立旋转磁场（励磁电流）、克服铁损和机械摩擦，所以空载电流并不小。远超这个范围说明有问题：铁心不良、转子与定子气隙过大（轴承磨损）、线圈匝数过少、或者绕组接错（该星形接成三角形）。三相空载电流之间还应基本相等，不均衡要怀疑匝间短路。"></div>
    <div class="qz" data-q="铭牌掉了，怎么判断一台三相异步电动机是几极的？"
         data-opts="拆开数定子槽数|万用表调 0.05mA 档，表笔搭在一个绕组两端匀速转一圈主轴，数指针摆动次数：1 次是 2 极、2 次是 4 极、3 次是 6 极|按电动机外形大小估"
         data-right="1"
         data-why="数指针摆动次数。转子上有剩磁，手转主轴时会在定子绕组里感应出微弱的电流，万用表在最灵敏的 0.05mA 档上能看出指针左右摆动。转一整圈摆 1 次是 2 极、2 次是 4 极、3 次是 6 极。知道极数就知道额定转速：2 极 >2800、4 极 >1400、6 极 >900 r/min。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 5 章 5.6 节（书内 P90~P95）<br>单相 232.8/256.3/489.3 Ω、三相 4.33 Ω、绝缘 &gt;1 MΩ、空载 40%~55%、极数-转速表都是书上的数</div>
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

const CANH = 282;
function bar(g, l1, l2, kind, y){
  const Y = y || 236;
  const bg = kind === 'ok' ? C.okbg : kind === 'err' ? C.errbg : kind === 'warn' ? C.warnbg : C.accbg;
  const fg = kind === 'ok' ? C.ok : kind === 'err' ? C.err : kind === 'warn' ? C.warn : C.acc;
  EC.box(g, 18, Y, 324, 38, 6, bg, fg, 1);
  txt(g, l1, 180, Y + 13, {sz:10.5, b:1, c:fg});
  txt(g, l2, 180, Y + 28, {sz:9, c:C.tx2});
}
/* 电动机简画：机身 + 接线盒 + 三根引出线 */
function motor(g, x, y, w, h, o){
  o = o || {};
  box(g, x, y, w, h, 8, P.bakelite || C.box, C.boxLine, 1.5);
  /* 散热筋 */
  g.save(); g.strokeStyle = C.boxLine; g.lineWidth = 1;
  for(let i = 1; i < 6; i++){
    const px = x + w*i/6;
    g.beginPath(); g.moveTo(px, y + 6); g.lineTo(px, y + h - 6); g.stroke();
  }
  g.restore();
  /* 接线盒 */
  box(g, x + w/2 - 26, y - 16, 52, 18, 3, C.box, C.boxLine, 1.2);
  txt(g, '接线盒', x + w/2, y - 7, {sz:8, c:C.tx3});
  txt(g, o.name || 'M  3~', x + w/2, y + h/2, {sz:11, b:1, c:C.tx3});
  /* 转轴 */
  box(g, x + w, y + h/2 - 5, 22, 10, 2, P.steel || C.metal, C.boxLine, 1);
  return [x + w/2 - 18, x + w/2, x + w/2 + 18];
}

/* ================================================================
   场景 1：绕组阻值
   ================================================================ */
const WD = [
  {t:'三相 · 正常', r:[4.33, 4.33, 4.33], three:true, unit:'Ω',
   lbl:['U-V','V-W','W-U'], judge:'正常', kind:'ok',
   bar:['三个读数相等 —— 三相绕组正常', '书上用万用电桥实测：0.433 × 10 Ω ≈ 4.33 Ω，三相一致']},
  {t:'三相 · 一相断路', r:[4.33, 4.33, null], three:true, unit:'Ω',
   lbl:['U-V','V-W','W-U'], judge:'一相断路', kind:'err',
   bar:['有一个读数是 ∞ —— 绕组内部断路', '绕组断线、引出线脱焊，或者接线盒端子松了']},
  {t:'单相电动机', r:[232.8, 256.3, 489.3], three:false, unit:'Ω',
   lbl:['公共-运行','公共-起动','运行-起动'], judge:'正常', kind:'ok',
   bar:['232.8 + 256.3 = 489.1 —— 两个之和等于第三个', '单相电动机有起动和运行两个绕组，共用一个公共端']}
];
const S1 = { k:0 };
const st1 = new Stage('cv0', 360, CANH);

function draw1(){
  const g = st1.g; st1.clear();
  const it = WD[S1.k];
  EP.heading(g, 12, 14, it.three ? '三相电动机绕组' : '单相电动机绕组',
             it.three ? '三个读数应相等' : 'R1 + R2 = R3');
  const GX = 24, GY = 40, GW = 312, GH = 116;
  box(g, GX, GY, GW, GH, 6, C.box, C.boxLine, 1);
  const mx = it.three ? 5.5 : 560;
  it.r.forEach(function(rv, i){
    const bw = 62, bx = GX + 36 + i * 88;
    if(rv == null){
      g.save(); g.strokeStyle = C.err; g.lineWidth = 2; g.setLineDash([4,3]);
      g.beginPath(); g.moveTo(bx, GY + GH - 24); g.lineTo(bx + bw, GY + GH - 24); g.stroke(); g.restore();
      txt(g, '∞', bx + bw/2, GY + GH - 40, {sz:17, b:1, c:C.err});
    }else{
      const bh = (GH - 44) * rv / mx;
      box(g, bx, GY + GH - 24 - bh, bw, bh, 3,
          (!it.three && i === 2) ? C.ok : C.acc, null, 0);
      txt(g, rv.toFixed(rv < 10 ? 2 : 1), bx + bw/2, GY + GH - 30 - bh, {sz:9.5, b:1, c:C.tx});
    }
    txt(g, it.lbl[i], bx + bw/2, GY + GH - 10, {sz:8.5, c:C.tx2});
  });
  txt(g, '单位 Ω', GX + GW - 10, GY + 12, {sz:8, c:C.tx3, al:'right'});
  /* 判据条 */
  box(g, 24, 166, 312, 30, 5, C.box, C.boxLine, 1);
  txt(g, it.three ? 'R1 = R2 = R3　　三个读数应该相等'
                  : '232.8 + 256.3 = 489.1 ≈ 489.3　　两个之和等于第三个',
      180, 181, {sz:9.5, b:1, c: it.kind === 'err' ? C.err : C.ok});
  bar(g, it.bar[0], it.bar[1], it.kind, 204);
}
function note1(){
  const it = WD[S1.k];
  $('s1a').textContent = S1.k === 0 ? '4.33 齐平' : (S1.k === 1 ? '有一个 ∞' : '232.8/256.3/489.3');
  $('s1b').textContent = it.three ? '三个相等' : 'R1+R2=R3';
  $('s1c').textContent = it.judge;
  const H = [
    '<div class="st good">三相：三个读数相等就对了</div>' +
    '三个绕组是同样的线、同样的匝数绕的，两两量出来自然一致。' +
    '书上用<b>万用电桥</b>精确测这台，三相都是 <b>0.433 × 10 Ω ≈ 4.33 Ω</b>。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>接法不同，读到的数不一样</b>：书上图 5-19 给了两个例子 ——' +
    '<b>△ 联结每两根之间约 4 Ω，Y 联结约 12 Ω</b>。' +
    '因为你量到的是「两相串联」还是「一相并上两相串联」（2.7 节讲过星角接法）。' +
    '<span class="sub">所以不能拿别人机子的数来对，只能自己三相互相比。</span></div>',

    '<div class="st bad">出现 ∞ —— 那一路绕组断了</div>' +
    '三个读数里有一个是无穷大，说明这两根引线之间不通。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>从最容易查的开始</b>：先看接线盒里的<b>端子螺丝有没有松</b>、' +
    '<b>引出线接头有没有脱焊</b> —— 这两处不用拆电动机。' +
    '都好的话，就是<b>绕组内部断线</b>了，得拆开重绕或者换电动机。' +
    '<span class="sub">现场表现：三相里少一相，电动机嗡嗡响转不动或者带不动负载，' +
    '剩下两相电流猛增，几分钟就烧（2.7 节讲过）。</span></div>',

    '<div class="st">单相：两个之和等于第三个</div>' +
    '单相电动机里有<b>起动绕组</b>和<b>运行绕组</b>两个，共用一个公共端，一共引出三根线。' +
    '所以两两量的三个数里，必然有一个是另外两个<b>串联</b>的和。' +
    '<div class="tip" style="margin-top:8px">' +
    '书上实测：<b>运行绕组 232.8 Ω、起动绕组 256.3 Ω、串联 489.3 Ω</b>' +
    '（232.8 + 256.3 = 489.1，对得上）。' +
    '<span class="sub"><b>顺带能认出哪根是哪根</b>：阻值最大的那两根之间是「起动 ↔ 运行」，' +
    '剩下那根就是公共端。<b>起动绕组的阻值一般比运行绕组大</b>（线更细、匝数更多）。</span></div>'
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
   场景 2：绝缘电阻
   ================================================================ */
const INS = [
  {t:'绕组 ↔ 外壳', r:'120', ok:true, kind:'ok',
   bar:['120 MΩ，远大于 1 MΩ —— 绝缘良好', 'L 端接任一相绕组的出线端，E 端接电动机接地端']},
  {t:'绕组 ↔ 外壳', r:'0.2', ok:false, kind:'err',
   bar:['0.2 MΩ，远小于 1 MΩ —— 绝缘不良', '多半是受潮；也可能是绕组绝缘老化、内部有导电部分碰壳']},
  {t:'绕组 ↔ 绕组', r:'95', ok:true, kind:'ok',
   bar:['先取下接线盒里的连接片，再量', '不取的话三个绕组本来就是连通的，量出来必然是 0']}
];
const S2 = { k:0 };
const st2 = new Stage('cv1', 360, CANH);

function draw2(){
  const g = st2.g; st2.clear();
  const it = INS[S2.k];
  EP.heading(g, 12, 14, '电动机绝缘电阻', '两处都要 > 1 MΩ');
  const pins = motor(g, 36, 62, 130, 76, {});
  /* 三根引出线 */
  const wire = S2.k === 2 ? [C.err, C.acc, C.wire] : [C.err, C.wire, C.wire];
  pins.forEach(function(px, i){
    new Path([[px, 46],[px, 62]]).stroke(g, 2.2, wire[i] || C.wire);
    g.save(); g.fillStyle = wire[i] || C.wire;
    g.beginPath(); g.arc(px, 46, 3.6, 0, Math.PI*2); g.fill(); g.restore();
  });
  txt(g, S2.k === 2 ? '连接片已取下' : '三相引出线', 101, 34, {sz:8.5, c: S2.k === 2 ? C.warn : C.tx3});
  /* 接地 */
  if(S2.k !== 2){
    const gx = 46, gy = 152;
    g.save(); g.strokeStyle = C.PE; g.lineWidth = 2.2; g.lineCap = 'round';
    g.beginPath(); g.moveTo(gx, 138); g.lineTo(gx, gy); g.stroke();
    [20,13,6].forEach(function(w, i){
      g.beginPath(); g.moveTo(gx - w/2, gy + i*6); g.lineTo(gx + w/2, gy + i*6); g.stroke();
    });
    g.restore();
    txt(g, '接地端', gx + 16, gy + 6, {sz:8, c:C.PE, al:'left'});
  }
  /* 绝缘电阻表 */
  const MX = 202, MY = 56, MW = 132, MH = 96;
  box(g, MX, MY, MW, MH, 8, P.bakelite || C.box, C.boxLine, 1.5);
  box(g, MX + 14, MY + 12, MW - 28, 40, 4, '#f4f6f8', C.boxLine, 1.2);
  txt(g, it.r, MX + MW/2, MY + 26, {sz:17, b:1, c: it.ok ? '#1b2027' : '#b3261e'});
  txt(g, 'MΩ', MX + MW/2, MY + 43, {sz:9, b:1, c:'#5a6674'});
  ['L','E'].forEach(function(n, i){
    const x = MX + 40 + i*52, y = MY + MH - 16;
    g.save(); g.fillStyle = C.accbg; g.strokeStyle = C.acc; g.lineWidth = 1.4;
    g.beginPath(); g.arc(x, y, 7, 0, Math.PI*2); g.fill(); g.stroke(); g.restore();
    txt(g, n, x, y, {sz:9, b:1, c:C.acc});
  });
  txt(g, '判据：> 1 MΩ', MX + MW/2, MY + MH + 14, {sz:9, b:1, c: it.ok ? C.ok : C.err});

  bar(g, it.bar[0], it.bar[1], it.kind, 196);
}
function note2(){
  const it = INS[S2.k];
  $('s2a').textContent = it.t;
  $('s2b').textContent = it.r + ' MΩ';
  $('s2c').textContent = it.ok ? '正常' : '绝缘不良';
  const H = [
    '<div class="st good">绕组对外壳：120 MΩ，远大于 1 MΩ</div>' +
    '<b>L（线路）端</b>接任意一相绕组的出线端，<b>E（接地）端</b>接电动机的接地端（外壳）。' +
    '书上原话：<b>绝缘电阻实测值大于 1 MΩ，正常</b>。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>三相都要量一遍</b>：量完一相，等指针慢慢回到初始位置，再顺时针摇下一相。' +
    '<span class="sub">摇的时候<b>看指针的摆动情况</b>，别只盯最后那个数 ——' +
    '往上爬是正常的（绝缘的电容在充电），爬上去又往回掉多半是受潮。</span></div>',

    '<div class="st bad">0.2 MΩ —— 远小于 1 MΩ，绝缘不良</div>' +
    '书上原话：<b>若检测结果远小于 1 MΩ，则说明电动机绝缘性能不良，' +
    '或内部导电部分与外壳之间有漏电情况。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>最常见的原因是受潮</b>：电动机长期停用、放在潮湿的地方、或者被水淋过。' +
    '受潮的电动机可以<b>烘干处理</b>，烘完再量，多半能恢复。' +
    '<b>但绝缘老化、绕组碰壳这两种是修不回来的</b>，只能重绕。' +
    '<span class="sub">别抱侥幸：0.2 MΩ 的电动机通电，外壳带电的风险很实在 ——' +
    '这时候 PE 线和漏电保护器就是最后一道防线。</span></div>',

    '<div class="st">绕组对绕组：先取下连接片</div>' +
    '接线盒里那三块<b>连接片</b>把三个绕组连成了星形或三角形。' +
    '<b>不取下来，三个绕组是连通的</b> —— 量出来是 0，那不是绝缘坏了，是你在量一根导线。' +
    '<div class="tip" style="margin-top:8px">' +
    '书上原话：<b>需要打开电动机接线盒，取下连接片，' +
    '确保电动机绕组之间没有任何连接关系。</b>' +
    '若测得绕组之间的绝缘电阻为零或阻值较小，则说明绕组之间存在短路。' +
    '<span class="sub">量完<b>按原来的接法装回去</b> —— 2.7 节讲过：' +
    '横着两块是星形、竖着三块是三角形。<b>拆之前先拍张照。</b></span></div>'
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
   场景 3：空载电流
   ================================================================ */
const IN_RATED = 3.9;
const S3 = { i:17 };   /* 滑杆是 0.1 A 为单位 */
const st3 = new Stage('cv2', 360, CANH);
function amp3(){ return S3.i / 10; }
function pct3(){ return amp3() / IN_RATED * 100; }

function draw3(){
  const g = st3.g; st3.clear();
  const a = amp3(), p = pct3();
  const ok = p >= 40 && p <= 55;
  EP.heading(g, 12, 14, '空载电流', '应为额定的 40%~55%');
  /* 电动机 + 钳形表钳住一根引线 */
  /* 电动机要压低：钳口那个圆画在引线上，和接线盒挤在一起（截图抓到的） */
  motor(g, 28, 92, 104, 58, {});
  const px = 80;
  new Path([[px, 44],[px, 92]]).stroke(g, 2.6, C.L);
  /* 钳口 */
  g.save();
  g.strokeStyle = C.cop; g.lineWidth = 4; g.lineCap = 'round';
  g.beginPath(); g.arc(px, 58, 13, 0, Math.PI*2); g.stroke();
  g.restore();
  txt(g, '一次只钳一根', px + 22, 58, {sz:8.5, c:C.tx3, al:'left'});
  /* 读数 */
  EP.meterUnit(g, 196, 44, 142, 72,
    {mode:'A~', reading:a.toFixed(1), rsz:18,
     jacks:[{n:'钳形表'}], hot:-1});

  /* 百分比条：40~55 那一段画成绿色的合格带 */
  const GX = 24, GY = 162, GW = 312, GH = 44;
  box(g, GX, GY, GW, GH, 6, C.box, C.boxLine, 1);
  const x0 = GX + 6, w0 = GW - 12;
  box(g, x0 + w0*0.40, GY + 8, w0*0.15, 20, 3, C.okbg, C.ok, 1);
  txt(g, '40%', x0 + w0*0.40, GY + 36, {sz:8, c:C.ok});
  txt(g, '55%', x0 + w0*0.55, GY + 36, {sz:8, c:C.ok});
  const cx = x0 + w0 * Math.max(0, Math.min(1, p/100));
  g.save();
  g.fillStyle = ok ? C.ok : C.err;
  g.beginPath(); g.moveTo(cx, GY + 6); g.lineTo(cx - 5, GY - 2); g.lineTo(cx + 5, GY - 2);
  g.closePath(); g.fill();
  g.fillRect(cx - 1.4, GY + 6, 2.8, 24);
  g.restore();
  txt(g, p.toFixed(0) + '%', cx, GY - 10, {sz:10, b:1, c: ok ? C.ok : C.err});

  bar(g, ok ? a.toFixed(1) + ' A ÷ ' + IN_RATED + ' A = ' + p.toFixed(0) + '%　落在正常范围里'
            : a.toFixed(1) + ' A ÷ ' + IN_RATED + ' A = ' + p.toFixed(0) + '%　' +
              (p < 40 ? '偏低' : '偏高'),
      ok ? '书上那台 2 极 1.5 kW 的电动机实测就是 1.7 A'
         : (p < 40 ? '偏低不多见，先确认是不是真的空载、钳形表量程对不对'
                   : '铁心不良／气隙过大／匝数过少／绕组接错，四个方向去查'),
      ok ? 'ok' : 'err', 216);
}
function note3(){
  const a = amp3(), p = pct3(), ok = p >= 40 && p <= 55;
  $('s3v').textContent = a.toFixed(1) + ' A';
  $('s3a').textContent = IN_RATED + ' A';
  $('s3b').textContent = p.toFixed(0) + '%';
  $('s3c').textContent = ok ? '正常' : (p < 40 ? '偏低' : '偏高');
  $('n2').innerHTML = ok ?
    '<div class="st good">' + p.toFixed(0) + '% —— 落在 40%~55% 里，正常</div>' +
    '书上那台是 <b>2 极、1.5 kW</b> 的三相电动机，按 <b>I = P/U = 1500/380 ≈ 3.9 A</b> ' +
    '估额定电流，钳形表实测三根引线的空载电流都是 <b>1.7 A</b>，占 44%。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>空载电流为什么这么大</b>：电动机空转时也要建立旋转磁场（这部分叫励磁电流）、' +
    '克服铁损和轴承摩擦。<b>这些和带不带负载没关系</b>，所以空载电流不可能很小。' +
    '<span class="sub"><b>三根引线都要钳一遍</b>，三相应该基本相等 ——' +
    '书上那台三次量出来都是 1.7 A。</span></div>'
    :
    '<div class="st bad">' + p.toFixed(0) + '% —— 超出 40%~55%</div>' +
    (p > 55 ?
      '空载电流过大，书上给了四个方向：<b>电动机内部铁心不良</b>、' +
      '<b>转子与定子之间的间隙过大</b>、<b>电动机线圈的匝数过少</b>、' +
      '<b>电动机绕组连接错误</b>。' +
      '<div class="tip" style="margin-top:8px">' +
      '<b>最常见也最好查的是后两个</b>：重绕过的电动机匝数可能不足；' +
      '<b>该接星形的接成了三角形</b>，电流会大得离谱 —— 打开接线盒看一眼连接片就知道。' +
      '<span class="sub">气隙过大多半是<b>轴承磨损</b>让转子偏了，' +
      '转起来还会有异响和振动。</span></div>'
      :
      '空载电流偏低不多见。<b>先确认两件事</b>：' +
      '电动机是不是真的完全空载（联轴器脱开了没有），' +
      '钳形表的量程和档位对不对（3.7 节：小电流要在钳口上绕几圈再除以圈数）。' +
      '<div class="tip" style="margin-top:8px">' +
      '<b>都确认过还是偏低的话</b>，可能是电源电压偏低，或者这台电动机的实际额定电流' +
      '比按 P/U 估的那个数小 —— <b>以铭牌上印的额定电流为准</b>。</div>');
}
document.getElementById('s3r').addEventListener('input', function(e){
  S3.i = +e.target.value; note3(); draw3();
});

/* ================================================================
   场景 4：转速与极数
   ================================================================ */
const POLE = [
  {sw:1, p:'2 极', n0:3000, n:'> 2800'},
  {sw:2, p:'4 极', n0:1500, n:'> 1400'},
  {sw:3, p:'6 极', n0:1000, n:'> 900'}
];
const S4 = { k:0 };
const st4 = new Stage('cv3', 360, CANH);

function draw4(){
  const g = st4.g; st4.clear();
  const it = POLE[S4.k];
  EP.heading(g, 12, 14, '判极数', '万用表 0.05 mA 档，手转一圈');
  /* 电动机 + 手转主轴 */
  motor(g, 26, 62, 118, 68, {});
  g.save();
  g.strokeStyle = C.acc; g.lineWidth = 2; g.lineCap = 'round';
  g.beginPath(); g.arc(158, 96, 16, -1.9, 1.2); g.stroke();
  g.restore();
  EC.head(g, 160, 112, 0.6, 0.8, 6, C.acc);
  txt(g, '手转一周', 158, 130, {sz:8.5, c:C.acc});
  /* 指针摆动示意：一条时间轴上画 sw 个尖峰 */
  const GX = 190, GY = 52, GW = 150, GH = 76;
  box(g, GX, GY, GW, GH, 6, C.box, C.boxLine, 1);
  const midY = GY + GH/2;
  g.save();
  g.strokeStyle = C.boxLine; g.lineWidth = 1;
  g.beginPath(); g.moveTo(GX + 6, midY); g.lineTo(GX + GW - 6, midY); g.stroke();
  g.strokeStyle = C.warn; g.lineWidth = 2; g.lineJoin = 'round';
  g.beginPath();
  const n = 120;
  for(let i = 0; i <= n; i++){
    const t = i/n;
    const px = GX + 6 + (GW - 12) * t;
    const py = midY - Math.sin(t * Math.PI * 2 * it.sw) * (GH/2 - 12);
    if(i === 0) g.moveTo(px, py); else g.lineTo(px, py);
  }
  g.stroke(); g.restore();
  txt(g, '指针摆动 ' + it.sw + ' 次', GX + GW/2, GY + GH - 6, {sz:8.5, b:1, c:C.warn});
  txt(g, '0.05 mA 档', GX + GW/2, GY + 10, {sz:8, c:C.tx3});

  /* 极数对照 */
  POLE.forEach(function(q, i){
    const y = 146 + i * 28, on = S4.k === i;
    box(g, 24, y, 312, 24, 4, on ? C.accbg : C.box, on ? C.acc : C.boxLine, on ? 1.5 : 1);
    txt(g, '摆 ' + q.sw + ' 次', 44, y + 12, {sz:9, b:on?1:0, c: on ? C.acc : C.tx2, al:'left'});
    txt(g, q.p, 140, y + 12, {sz:10, b:1, c: on ? C.acc : C.tx, al:'left'});
    txt(g, '同步 ' + q.n0, 226, y + 12, {sz:9, c: on ? C.tx : C.tx3, al:'left'});
    txt(g, q.n, 326, y + 12, {sz:9.5, b:1, c: on ? C.acc : C.tx3, al:'right'});
  });
  bar(g, '转一整圈摆 ' + it.sw + ' 次 → ' + it.p,
      '同步转速 ' + it.n0 + ' r/min，异步电动机额定转速 ' + it.n + ' r/min', 'ok', 238);
}
function note4(){
  const it = POLE[S4.k];
  $('s4a').textContent = it.sw + ' 次';
  $('s4b').textContent = it.p;
  $('s4c').textContent = it.n;
  $('n3').innerHTML =
    '<div class="st">转一圈摆 ' + it.sw + ' 次 → ' + it.p + '</div>' +
    '把万用表调到 <b>0.05 mA 档</b>（最灵敏的那一档），' +
    '两支表笔搭在某一绕组的两端，<b>匀速转动电动机主轴一周</b>，' +
    '数指针左右摆动了几次。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>原理</b>：转子上有剩磁，手转的时候磁场扫过定子绕组，感应出微弱的电流。' +
    '<b>转子转一圈，磁极扫过绕组的次数就等于极对数</b> ——' +
    '所以摆 1 次是 2 极、2 次是 4 极、3 次是 6 极。' +
    '<div style="margin-top:6px"><b>做之前先把各绕组之间的连接金属片取下来</b>，' +
    '使各绕组之间保持绝缘（书上原话）。</div>' +
    '<span class="sub">知道极数就知道额定转速：<b>同步转速 n₀ = 60f/p</b>，' +
    '50 Hz 下只有 3000 / 1500 / 1000 / 750 这几个值，' +
    '异步电动机永远比它慢一点点（2.7 节讲过转差）。</span></div>';
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

ElecNav.init({ch:5, sec:'5.6'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('5.6');
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
