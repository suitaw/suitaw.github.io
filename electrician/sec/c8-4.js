/* 8.4 停电了怎么查 —— 本节内容的唯一真相。
   对应《零基础学电工》第 8 章 8.3.2 节「低压供配电线路的检修调试」（书内 P158~P162）。

   **8.3.1 高压供配电线路的检修调试整节不做** —— 高压隔离开关、高压熔断器、
   高压电流互感器，那是高压电工作业证的活（8.1 屏 1 讲过 1000 V 那条线）。
   这一节只做低压那一半，也就是你真会去做的那一半。

   四屏：① 先看范围 ② 五步排查链（主戏）③ 两件工具怎么用 ④ 三个不用工具就能排除的

   数字与说法的出处（书上原文，别凭记忆改）：
   - **检修的基本原则**（图 8-32 右侧说明，原文）：**先查同级线路**，
     若同级线路未发生故障，则应当检查停电线路中的设备和线缆；
     **若同级线路也发生停电故障，则应当检查为其供电的上级线路是否正常**；
     若上级供电线路同样发生故障，则应当检查上级供电线路中的设备和线缆；
     若上级供电线路正常，则应当检查故障线路与同级线路的设备和线缆，
     **依次检查主要部件，即可找到故障设备或故障线缆**
   - **故障分析的三种范围**（图 8-31 的三条注）：
     **若所有线路全部异常，则应检查总配电箱及上一级供电**；
     若只有住户用电线路异常，检查公共照明线路、电梯等用电设备的情况；
     **若有住户用电线路异常，应重点检查该线路中的部件**
   - **第 1 步 检查同级低压线路**（书 P158）：若住户用电线路发生故障，
     应先检查同级低压线路，**如查看楼道照明线路和电梯供电线路是否正常**（图 8-33）
   - **第 2 步 检查电能表的输出**（书 P158，图 8-34）：若楼道内照明灯可正常点亮、
     电梯也可正常运行，说明用户的供电线路有故障，应当**使用钳形表**检查配电箱中的
     线路是否有电流通过，观察电能表是否正常运转。
     **将钳形表的档位调整到「AC 200A」电流档，按下钳形表的钳头扳机，
     钳住经电能表输出的任意一根线缆**，查看钳形表上是否有电流读数
   - **提示说明（书 P160，两个容易漏的）**：当低压供配电系统中的用户线路出现停电现象时，
     **先应从外观上观察电能表及连接线路，看是否有损坏或烧损迹象**；
     另外，**还应考虑是否由于电能表预存电量耗尽引起的** ——
     检测配电盘中的电流前，应当检查电能表中的剩余电量，
     **将用户的购电卡插入电能表的卡槽中，在显示屏上即会显示剩余电量**（图 8-35）
   - **第 3 步 检查配电箱的输出**（书 P161，图 8-36）：电能表有电流通过说明电能表正常，
     继续**使用钳形表检查配电箱中是否有电流输出**，
     钳形表显示屏显示实际测得的数值 —— 书上那次实测是 **05.2**
   - **第 4 步 检查总断路器**（书 P161，图 8-37）：当用户配电箱输出的供电电压正常时，
     应当继续检查用户配电盘中的总断路器，可以**使用电子试电笔（电子验电器）检查**：
     **金属探头搭在导线绝缘皮上**，检测入户线端是否有电压；再检测入户总断路器是否有电压
   - **第 5 步 检查进入配电盘的线路**（书 P162，图 8-38）：若配电盘内的总断路器无电压，
     可**使用电子验电器检测进入配电盘的供电线路是否正常**，
     **找到损坏的线路或部件，修复或更换，排除故障**；
     检测支路断路器是否有电压；**拆卸护罩，更换异常部件**

   **这一节和 7.3 屏 4 是同一套思路的两个尺度**：
   7.3 那边是「不亮的范围有多大，故障就在多大范围的公共部分上」（公共照明）；
   这一节是「先查同级、再查上级」（配电）。**同一条推理，换了个场地。**
   文案里明说了这一点，让两节互相咬住。*/
(function(){
'use strict';
ELEC.reg({
  id: '8.4',
  file: 'c8-4.html',
  title: '8.4 停电了怎么查',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>先看范围</button>
    <button class="tab" data-i="1"><span class="n">2</span>五步排查</button>
    <button class="tab" data-i="2"><span class="n">3</span>两件工具</button>
    <button class="tab" data-i="3"><span class="n">4</span>先别拿表</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">到现场第一句话：还有谁也停了</div>
    这一步不用任何工具，却能一下把范围切掉一大半。
    书上图 8-31 给了三种情况，各走各的路。<b>点一种看该从哪儿查起。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">全楼都停</button>
        <button class="btn sm" data-k="1">只有住户停</button>
        <button class="btn sm" data-k="2">只有这一户停</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">停电范围</div><div class="v" id="s1a">整栋楼</div></div>
        <div class="num"><div class="k">故障在<br>哪一级</div><div class="v" id="s1b">总箱以上</div></div>
        <div class="num hi"><div class="k">先去哪</div><div class="v" id="s1c">总配电箱</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">书上图 8-31 的三条注（原文照录）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>现象</th><th>书上写的</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">所有线路<br>全部异常</td>
          <td>应<b>检查总配电箱及上一级供电</b></td></tr>
        <tr><td class="eu-s">只有住户<br>用电线路异常</td>
          <td>检查<b>公共照明线路、电梯</b>等用电设备的情况</td></tr>
        <tr><td class="eu-s">有住户用电<br>线路异常</td>
          <td>应<b>重点检查该线路中的部件</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>这跟 7.3 屏 4 讲公共照明时那条是同一句话，换了个场地。</b>
      <span class="sub">那边是「<b>不亮的范围有多大，故障就在多大范围的公共部分上</b>」；
      这边是「<b>先查同级、再查上级</b>」。
      推理完全一样：<b>同时停的那些设备，共同经过的那一段就是嫌疑段。</b></span>
    </div>
  </div>

  <div class="bet" data-bet="c84-scope" data-q="住户报修家里没电。你到楼道一看，楼道灯亮着、电梯也在跑。这说明什么？"
       data-opts="说不明什么，还得挨个查|说明主供电、总配电箱、楼层箱全都正常——故障在这一户自己那一段|说明是电梯占用了电"
       data-right="1"
       data-after="说明上游全正常。楼道灯和电梯跟这户共用主供电和总配电箱，它们还在工作，就证明那几级都是好的——一步排除掉三四个部件，而且只用眼睛。书上把「检查同级低压线路」放在五步的第一步，正是这个道理。"></div>
</section>

<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">五步，从外往里一级一级走</div>
    书上给低压检修排了五步，<b>每一步都是「这一级正常吗？正常就往下一级走」</b>。
    <b>点「下一步」走一遍。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns">
        <button class="btn" id="s2p">‹ 上一步</button>
        <button class="btn go" id="s2n">下一步 ›</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">第几步</div><div class="v" id="s2a">1 / 5</div></div>
        <div class="num"><div class="k">查什么</div><div class="v" id="s2b">同级线路</div></div>
        <div class="num hi"><div class="k">拿什么<br>工具</div><div class="v" id="s2c">不用</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">五步一览（书 P158~P162）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>步</th><th>查什么</th><th>用什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">①</td><td>同级低压线路<br>
          <span class="sub">楼道照明、电梯</span></td><td>眼睛</td></tr>
        <tr><td class="eu-s">②</td><td>电能表的输出<br>
          <span class="sub">钳住经电能表输出的任意一根</span></td><td><b>钳形表</b><br>AC 200A 档</td></tr>
        <tr><td class="eu-s">③</td><td>配电箱的输出</td><td><b>钳形表</b></td></tr>
        <tr><td class="eu-s">④</td><td>总断路器<br>
          <span class="sub">入户线端、总断路器</span></td><td><b>电子验电器</b></td></tr>
        <tr><td class="eu-s">⑤</td><td>进入配电盘的线路<br>
          <span class="sub">支路断路器</span></td><td><b>电子验电器</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>注意工具的顺序：眼睛 → 钳形表 → 验电器。</b>
      <span class="sub">这是按<b>「不用断电、不用拆」</b>排的 ——
      钳形表不用断线就能量电流（3.7 那节讲的就是它存在的理由），
      电子验电器隔着绝缘皮就能判断有没有电压。
      <b>整个五步走下来，没有一步需要停电拆线。</b>
      这跟 7.3 屏 3「先排除掉容易排除的」是同一条原则。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">书上那条基本原则（图 8-32 原文）</div>
    <b>先查同级线路</b>，若同级线路未发生故障，则应当检查停电线路中的设备和线缆；
    <b>若同级线路也发生停电故障，则应当检查为其供电的上级线路是否正常</b>；
    若上级供电线路同样发生故障，则应当检查上级供电线路中的设备和线缆；
    若上级供电线路正常，则应当检查故障线路与同级线路的设备和线缆，
    <b>依次检查主要部件，即可找到故障设备或故障线缆</b>。
    <div class="tip">
      <b>这段话绕，但它只说了一件事：范围套范围。</b>
      <span class="sub">同级也停了 ⇒ 故障在<b>更上一级</b>（它们共用的那一段）；
      同级没停 ⇒ 故障在<b>这一条自己</b>身上。
      每问一次，范围就小一半 —— <b>这就是为什么五步能从整栋楼收敛到一个部件。</b></span>
    </div>
  </div>
</section>

<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">两件工具，各管一半</div>
    <b>钳形表量电流</b>（有没有电流在流），<b>电子验电器量电压</b>（有没有电压送到）。
    书上前两步用钳形表、后两步用验电器。<b>点一件看它怎么用、读什么。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">钳形表</button>
        <button class="btn sm" data-k="1">电子验电器</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">量什么</div><div class="v" id="s3a">电流</div></div>
        <div class="num"><div class="k">档位</div><div class="v" id="s3b">AC 200A</div></div>
        <div class="num hi"><div class="k">要不要<br>断电</div><div class="v" id="s3c">不用</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">书上写死的用法（P158、P161）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>工具</th><th>怎么用</th><th>看什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">钳形表</td>
          <td>档位调到 <b>「AC 200A」电流档</b>，<b>按下钳头扳机</b>，
            <b>钳住经电能表输出的任意一根线缆</b></td>
          <td>有没有<b>电流读数</b><br><span class="sub">书上实测 05.2</span></td></tr>
        <tr><td class="eu-s">电子<br>验电器</td>
          <td><b>金属探头搭在导线绝缘皮上</b></td>
          <td>有没有<b>电压</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>「钳住任意一根」这四个字有前提：一次只能钳一根。</b>
      <span class="sub">3.7 那节整节在讲这件事：<b>把相线和零线一起钳进去，
      两根大小相等方向相反，读数是 0.00 A</b> —— 而设备明明在工作。
      现场表现是「钳形表读数为零，可灯还亮着」，
      多半就是把整根电缆钳进去了。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st good">为什么这两件工具排在最前面</div>
    因为它们<b>都不需要停电、不需要拆线</b>。
    <div class="tip info">
      <b>钳形表：不断线就能量电流</b>（钳口是可开合的铁芯，被测导线就是只有一匝的
      一次绕组 —— 3.7 讲过）。
      <b>电子验电器：隔着绝缘皮就能判断有没有电压</b>（感应式，3.5 屏 4 讲过它的两个坑）。
      <span class="sub"><b>但要记住 3.5 那条：感应式验电器用来「找」，不能用来「判定停电」。</b>
      它可能因为邻近电缆耦合而误报，也可能因为线在金属槽盒里而漏报。
      <b>真要动手之前，仍然要按「停电 → 验电 → 挂牌」那一套来。</b></span>
    </div>
  </div>
</section>

<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">拿表之前，先做这三件事</div>
    书上在讲检测之前专门插了一条提示说明：
    <b>先从外观上观察</b>，还要<b>考虑是不是电能表预存电量耗尽</b>。
    <b>点三件各看一遍</b> —— 它们加起来不到两分钟，却能省掉半天。
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">看同级</button>
        <button class="btn sm" data-k="1">看外观</button>
        <button class="btn sm" data-k="2">插卡看电量</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这一件</div><div class="v" id="s4a">看同级</div></div>
        <div class="num"><div class="k">花多久</div><div class="v" id="s4b">一分钟</div></div>
        <div class="num hi"><div class="k">能排除<br>什么</div><div class="v" id="s4c">上游三级</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">书 P160 那条提示说明（原文照录）</div>
    <div class="tip info" style="margin-top:0">
      <b>「当低压供配电系统中的用户线路出现停电现象时，先应从外观上观察电能表及连接线路，
      看是否有损坏或烧损迹象。另外，还应考虑是否由于电能表预存电量耗尽引起的，
      检测配电盘中的电流前，应当检查电能表中的剩余电量，
      将用户的购电卡插入电能表的卡槽中，在显示屏上即会显示剩余电量。」</b>
    </div>
    <div class="tip">
      <b>预付费表电量用完了 —— 这件事每年冬天都要发生很多次。</b>
      <span class="sub">现象和「线路故障」一模一样：整户没电、总闸看着是合的。
      <b>而它根本不是故障。</b>
      8.2 屏 1 讲装楼层箱时那条「要确保电能表卡槽靠近箱门的观察窗」，
      为的就是这一刻 —— 不用开箱门就能插卡、就能看见剩余电量。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">第 8 章走完了，四节串起来是一条线</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>节</th><th>回答的问题</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">8.1</td><td>电从哪来、到你手上要过几级、<b>哪一段你能碰</b></td></tr>
        <tr><td class="eu-s">8.2</td><td>箱里都有什么、<b>哪个端子接哪根</b></td></tr>
        <tr><td class="eu-s">8.3</td><td><b>选多大的闸、配多粗的线</b></td></tr>
        <tr><td class="eu-s">8.4</td><td>停电了<b>怎么一级一级找回去</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>这四节的顺序，正好是你上班第一个月会遇到的顺序。</b>
      <span class="sub">先认清这栋楼的结构（8.1），再打开箱子认物（8.2），
      然后开始换东西、加回路（8.3），最后是接报修（8.4）。
      <hr><b>下一章是电力拖动</b> —— 从「送电」转到「用电」，
      也是就业优先级里的第 ④ 项：接触器控制、自锁互锁正反转。
      那一章跟第 11 章连着，是整门课最厚的一块。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="8.4">
    <div class="qz" data-q="住户报修家里没电。到现场第一件事该做什么？"
      data-opts="打开配电盘，用验电器逐个查断路器|看同级线路——楼道灯亮不亮、电梯动不动|先量电能表的输出电流"
      data-right="1"
      data-why="书上五步的第一步就是「检查同级低压线路，如查看楼道照明线路和电梯供电线路是否正常」。这一步不用工具、不用一分钟，却能一下判定故障在哪一级：楼道灯亮着、电梯在跑，就说明主供电、总配电箱、楼层箱全正常，故障在这一户自己那一段。上来就掏工具，是把最便宜的一步跳过去了。"></div>
    <div class="qz" data-q="用钳形表检查电能表的输出，书上要求把档位调到哪一档、怎么钳？"
      data-opts="AC 200A 电流档，钳住经电能表输出的任意一根线缆|AC 500V 电压档，钳住整根电缆|电阻档，钳住零线"
      data-right="0"
      data-why="书上原话：将钳形表的档位调整到「AC 200A」电流档，按下钳形表的钳头扳机，钳住经电能表输出的任意一根线缆。注意「任意一根」的前提是一次只钳一根——3.7 那节讲过，把相线和零线一起钳进去，两根大小相等方向相反，读数是 0.00 A，而设备明明在工作。另外钳形表量的是电流，没有电压档这一说。"></div>
    <div class="qz" data-q="整户没电，总闸看着是合的，线路外观也没有烧损痕迹。除了线路故障，还该想到什么？"
      data-opts="没别的可能了，只能是线路故障|电能表预存电量耗尽——插卡看一眼剩余电量|一定是电能表坏了"
      data-right="1"
      data-why="书上专门插了一条提示：还应考虑是否由于电能表预存电量耗尽引起的，检测配电盘中的电流前，应当检查电能表中的剩余电量，将购电卡插入卡槽，显示屏上即会显示剩余电量。这件事每年冬天都要发生很多次，现象和线路故障一模一样，而它根本不是故障。8.2 讲装表时要求「卡槽靠近箱门观察窗」，为的就是这一刻。"></div>
    <div class="qz" data-q="书上那条检修基本原则「先查同级线路」，背后的推理是什么？"
      data-opts="同级线路更容易查|同时停的那些线路，共同经过的那一段就是嫌疑段；同级没停就说明故障在这一条自己身上|同级线路的设备更便宜"
      data-right="1"
      data-why="范围套范围。同级也停了 ⇒ 故障在它们共用的更上一级；同级没停 ⇒ 故障在这一条自己身上。每问一次，范围就小一半，所以五步能从整栋楼收敛到一个部件。这跟 7.3 屏 4 讲公共照明时那条「不亮的范围有多大，故障就在多大范围的公共部分上」是同一条推理，只是换了个场地。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 8 章 8.3.2 节（书内 P158~P162）</div>
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
/* 一个「有电／没电」的方块：这两屏满屏都是它 */
function unit(g, x, y, w, h, name, live, sel){
  box(g, x, y, w, h, 4,
      sel ? C.accbg : C.box,
      sel ? C.acc : (live ? C.ok : C.err), sel ? 1.8 : 1.3);
  txt(g, name, x + w/2, y + h/2 - 5, {sz:9, b:1, c: sel ? C.acc : C.tx2});
  txt(g, live ? '正常' : '停电', x + w/2, y + h/2 + 9,
      {sz:8, b:1, c: live ? C.ok : C.err});
}

/* ================================================================
   场景 1：先看范围
   ================================================================
   一根主供电 → 总配电箱 → 三路（公共照明、电梯、住户）。
   三档各让不同的部分变红，**「谁还亮着」这件事一眼就能看出来** */
const S1 = { k:0 };
/* 每一档：[公共照明, 电梯, 住户A, 住户B, 住户C] 谁还有电 */
const SCOPE = [
  {live:[0,0,0,0,0], up:0, n:'整栋楼',   lvl:'总箱以上', go:'总配电箱',
   note:'所有线路全部异常'},
  {live:[1,1,0,0,0], up:1, n:'全部住户', lvl:'住户干线', go:'住户那条干线', short:'住户干线',
   note:'只有住户用电线路异常'},
  {live:[1,1,1,0,1], up:1, n:'这一户',   lvl:'这一户',   go:'这户的配电盘', short:'户内配电盘',
   note:'有住户用电线路异常'}
];
const BRX = [56, 122, 196, 254, 312];
const BRN = ['公共照明', '电梯', '住户 A', '住户 B', '住户 C'];
function draw1(){
  const g = st1.g; st1.clear();
  const sc = SCOPE[S1.k];
  EP.heading(g, 14, 20, sc.n + '停电', sc.note);

  /* 主供电 + 总配电箱 */
  const upLive = sc.up;
  seg(g, [[180, 44],[180, 62]], upLive ? C.ok : C.err, 2.6);
  txt(g, '上一级供电', 194, 50, {sz:8.5, c:C.tx3, al:'left'});
  unit(g, 128, 62, 104, 34, '总配电箱', upLive, S1.k === 0);

  /* 母线 */
  const busLive = sc.live.some(function(v){ return v; }) || upLive;
  seg(g, [[BRX[0], 122],[BRX[4], 122]], upLive ? C.ok : C.err, 2.4);
  seg(g, [[180, 96],[180, 122]], upLive ? C.ok : C.err, 2.4);

  /* 五路 */
  sc.live.forEach(function(v, i){
    const x = BRX[i];
    seg(g, [[x, 122],[x, 150]], v ? C.ok : C.err, 2);
    dot(g, x, 122, upLive ? C.ok : C.err, 3);
    unit(g, x - 30, 150, 60, 40, BRN[i], v, S1.k === 2 && i === 3);
  });
  /* 住户那一组框起来 */
  if(S1.k === 1){
    g.save(); g.setLineDash([5,4]); g.strokeStyle = C.acc; g.lineWidth = 1.4;
    g.strokeRect(160, 138, 186, 64); g.restore();
    EP.chip(g, '住户全停，公共部分还好', 253, 214, {sz:9, b:1, c:C.acc});
  }
  if(S1.k === 0){
    EP.chip(g, '一个都不亮 ⇒ 往上查', 180, 214, {sz:9, b:1, c:C.err});
  }
  if(S1.k === 2){
    EP.chip(g, '只有 B 停 ⇒ 就在 B 自己那一段', 253, 214, {sz:9, b:1, c:C.acc});
  }

  conc(g, 234, S1.k === 0 ? 'err' : 'acc',
       '先去：' + sc.go, '书上：' + sc.note);
}
function note1(){
  const sc = SCOPE[S1.k];
  $('s1a').textContent = sc.n;
  $('s1b').textContent = sc.lvl;
  $('s1c').textContent = sc.short || sc.go;
  const T = [
    ['所有线路全部异常',
     '公共照明不亮、电梯不动、所有住户都没电 —— <b>整栋楼一个都不剩</b>。' +
     '<hr>书上的注写得很直接：<b>若所有线路全部异常，则应检查总配电箱及上一级供电。</b>' +
     '<hr><b>推理很简单：这么多设备不会同时坏。</b>' +
     '它们唯一的共同点是<b>都从总配电箱取电</b>，' +
     '所以故障必然在总配电箱、或者更上一级（进户电缆、变压器那边）。' +
     '<hr>这时候<b>不要打开任何一户的配电盘</b> —— 那是白费工夫。'],
    ['只有住户用电线路异常',
     '公共照明还亮着、电梯还在跑，<b>可所有住户都没电</b>。' +
     '<hr>书上的注：<b>若只有住户用电线路异常，检查公共照明线路、电梯等用电设备的情况。</b>' +
     '<hr><b>公共照明和电梯就是「同级线路」</b> —— 它们跟住户共用主供电和总配电箱。' +
     '它们正常，说明<b>上游那几级全都是好的</b>；' +
     '而所有住户都停，说明故障在<b>住户那条干线</b>自己身上' +
     '（比如住户干线的那只断路器跳了，或者那一段电缆断了）。' +
     '<hr>一次比较，就把范围从「整栋楼」缩到了「一条干线」。'],
    ['有住户用电线路异常',
     '别的住户都正常，<b>只有这一户没电</b>。' +
     '<hr>书上的注：<b>若有住户用电线路异常，应重点检查该线路中的部件。</b>' +
     '<hr>这是最常见的一种报修，也是范围最小的一种：' +
     '<b>故障跑不出「这户的电能表 → 这户的总断路器 → 户内配电盘」这一小段</b>。' +
     '<hr>下一屏那五步，走的就是这一段 —— ' +
     '从电能表输出量起，一级一级往里走到支路断路器。']
  ][S1.k];
  $('n0').innerHTML = '<div class="st">' + T[0] + '</div>' + T[1];
}

/* ================================================================
   场景 2：五步排查链（主戏）
   ================================================================
   一条从楼道到户内的链，走到第几步就把那一级套上 hot 环，
   **已经查过（确认正常）的那几级画成绿色** —— 排查的进度本身要看得见 */
const STEPS = [
  {n:'同级低压线路', tool:'眼睛',      short:'同级线路',
   how:'查看<b>楼道照明线路和电梯供电线路</b>是否正常',
   d:'书上第一步的原话：<b>若住户用电线路发生故障，应先检查同级低压线路，' +
     '如查看楼道照明线路和电梯供电线路是否正常。</b>' +
     '<hr><b>这一步不用工具、不用一分钟</b>，却能一次排除掉主供电、' +
     '总配电箱、楼层箱三级 —— 楼道灯亮着、电梯在跑，那几级就一定是好的。' +
     '<hr>反过来，要是同级也停了，<b>就不用往下走这五步了</b>：' +
     '直接去总配电箱查（屏 1 第一档）。'},
  {n:'电能表的输出', tool:'钳形表',    short:'电能表输出',
   how:'档位调到 <b>AC 200A 电流档</b>，钳住<b>经电能表输出的任意一根线缆</b>',
   d:'书上原话：<b>若楼道内照明灯可正常点亮、电梯也可正常运行，' +
     '说明用户的供电线路有故障</b>，应当使用钳形表检查配电箱中的线路是否有电流通过，' +
     '观察电能表是否正常运转。' +
     '<hr>怎么用（书上写死的）：<b>将钳形表的档位调整到「AC 200A」电流档，' +
     '按下钳形表的钳头扳机，钳住经电能表输出的任意一根线缆</b>，' +
     '查看钳形表上是否有电流读数。' +
     '<hr><b>「任意一根」的前提是一次只钳一根</b> —— 3.7 那节整节在讲这个：' +
     '把相线和零线一起钳进去，读数是 0.00 A，而设备明明在工作。'},
  {n:'配电箱的输出', tool:'钳形表',    short:'配电箱输出',
   how:'继续用钳形表，检查<b>配电箱中是否有电流输出</b>',
   d:'书上原话：<b>电能表有电流通过，说明电能表正常，' +
     '继续使用钳形表检查配电箱中是否有电流输出。</b>' +
     '<hr>书上那次实测，钳形表显示屏上显示的是 <b>05.2</b>（约 5.2 A）—— ' +
     '有读数就说明电流送出来了，这一级正常。' +
     '<hr><b>为什么还要再量一次</b>：电能表和配电箱出线端之间还有一段线和几个端子，' +
     '<b>接头松动、端子烧蚀都发生在这种地方</b>（8.2 屏 4 讲「有条理」时说过：' +
     '松的接头是接触电阻大 → 发热 → 氧化 → 电阻更大）。'},
  {n:'总断路器',     tool:'电子验电器', short:'总断路器',
   how:'<b>金属探头搭在导线绝缘皮上</b>，检测入户线端、再检测总断路器',
   d:'书上原话：<b>当用户配电箱输出的供电电压正常时，' +
     '应当继续检查用户配电盘中的总断路器</b>，可以使用电子试电笔检查。' +
     '<hr>怎么用：<b>将金属探头搭在导线绝缘皮上</b>，' +
     '先检测<b>入户线端</b>是否有电压，再检测<b>入户总断路器</b>是否有电压。' +
     '<hr><b>这一步开始换工具了：从量电流改成量电压。</b>' +
     '前面两步问的是「有没有电流在流」，' +
     '这一步问的是「电压有没有送到这儿」—— ' +
     '因为再往里就是断路器，它断开的时候<b>电流是零，但进线端仍然有电压</b>。'},
  {n:'进入配电盘的线路', tool:'电子验电器', short:'配电盘线路',
   how:'检测<b>进入配电盘的供电线路</b>、<b>支路断路器</b>是否有电压',
   d:'书上原话：<b>若配电盘内的总断路器无电压，' +
     '可使用电子验电器检测进入配电盘的供电线路是否正常</b>，' +
     '<b>找到损坏的线路或部件，修复或更换，排除故障。</b>' +
     '<hr>再往下就是逐路查支路断路器有没有电压，' +
     '<b>拆卸护罩，更换异常部件</b>。' +
     '<hr><b>走到这一步，范围已经从「整栋楼」收敛到了「一个部件」。</b>' +
     '这就是那条基本原则的价值：每问一次，范围就小一半。'}
];
const S2 = { i:0 };
const SY = [50, 90, 130, 170, 210];
function draw2(){
  const g = st2.g; st2.clear();
  const st = STEPS[S2.i];
  EP.heading(g, 14, 20, '第 ' + (S2.i+1) + ' 步', st.n);

  STEPS.forEach(function(s, i){
    const y = SY[i], done = i < S2.i, on = i === S2.i;
    box(g, 44, y - 15, 272, 30, 5,
        on ? C.accbg : (done ? C.okbg : C.box),
        on ? C.acc : (done ? C.ok : C.boxLine), on ? 1.8 : 1.2);
    /* 序号圈 */
    g.save();
    g.fillStyle = on ? C.acc : (done ? C.ok : C.tx3); g.globalAlpha = .2;
    g.beginPath(); g.arc(62, y, 10, 0, Math.PI*2); g.fill(); g.restore();
    txt(g, done ? '✓' : String(i+1), 62, y,
        {sz:9.5, b:1, c: on ? C.acc : (done ? C.ok : C.tx3)});
    txt(g, s.n, 82, y, {sz:10, b:1, c: on ? C.tx : C.tx2, al:'left'});
    txt(g, s.tool, 308, y, {sz:8.5, b:1, c: on ? C.acc : C.tx3, al:'right'});
    if(i < 4){
      seg(g, [[62, y + 15],[62, SY[i+1] - 15]], done ? C.ok : C.boxLine, 1.8);
      EC.head(g, 62, SY[i+1] - 15, 0, 1, 4.5, done ? C.ok : C.boxLine);
    }
    if(on) hot(g, 180, y, 0, {w:288, h:42, r:8});
  });

  conc(g, 238, S2.i === 4 ? 'ok' : 'acc',
       '查' + st.n + '　用' + st.tool,
       S2.i === 4 ? '找到损坏的线路或部件，修复或更换' : '这一级正常就往下一级走');
}
function note2(){
  const st = STEPS[S2.i];
  $('s2a').textContent = (S2.i+1) + ' / 5';
  $('s2b').textContent = st.short;
  $('s2c').textContent = st.tool;
  $('n1').innerHTML = '<div class="st">第 ' + (S2.i+1) + ' 步：' + st.n + '</div>' + st.d +
    '<div class="tip info" style="margin-top:8px"><b>怎么做：</b>' +
    '<span class="sub">' + st.how + '</span></div>';
  $('s2p').disabled = S2.i === 0;
  $('s2n').disabled = S2.i === 4;
}

/* ================================================================
   场景 3：两件工具
   ================================================================
   左边画工具本体、右边画它在测什么。
   **两件的分别是「量电流」和「量电压」** —— 这一点要画出来：
   钳形表钳住一根线，验电器搭在绝缘皮上 */
const S3 = { k:0 };
function draw3(){
  const g = st3.g; st3.clear();
  const k = S3.k;
  EP.heading(g, 14, 20, k ? '电子验电器' : '钳形表',
             k ? '量电压　搭在绝缘皮上' : '量电流　钳住一根线');

  if(k === 0){
    /* 钳形表：钳口 + 机身 + 一根被测线穿过去 */
    const cx = 128, cy = 104, R = 34;
    /* 被测导线 */
    g.save(); g.lineCap = 'round';
    g.strokeStyle = '#2b4a6f'; g.lineWidth = 15;
    g.beginPath(); g.moveTo(40, cy); g.lineTo(300, cy); g.stroke();
    g.strokeStyle = C.L; g.lineWidth = 8;
    g.beginPath(); g.moveTo(40, cy); g.lineTo(300, cy); g.stroke();
    g.restore();
    /* 放 cy-24/-12 会被钳口那道弧压住（老坑），挪到导线上方远一点 */
    txt(g, '经电能表输出的任意一根', 40, cy - 32, {sz:8.5, b:1, c:C.tx3, al:'left'});
    /* 钳口 */
    g.save(); g.strokeStyle = P.steelD; g.lineWidth = 11; g.lineCap = 'round';
    g.beginPath(); g.arc(cx, cy, R, -Math.PI*0.42, Math.PI*1.42); g.stroke();
    g.strokeStyle = P.steel; g.lineWidth = 7;
    g.beginPath(); g.arc(cx, cy, R, -Math.PI*0.42, Math.PI*1.42); g.stroke();
    g.restore();
    /* 机身 */
    box(g, cx - 26, cy + 34, 52, 74, 6, P.bodyD, P.steelDD, 1.4);
    box(g, cx - 20, cy + 42, 40, 22, 3, '#0f2318', '#2f6b45', 1.2);
    txt(g, '05.2', cx, cy + 53, {sz:12, b:1, c:'#4fe08a'});
    txt(g, 'A~', cx, cy + 74, {sz:8, b:1, c:C.tx3});
    /* 旋钮上塞不下「AC 200A」（6.5px 挤成一团），只画旋钮，
       档位写在机身下面那行 */
    g.save(); g.fillStyle = P.bakeliteL;
    g.beginPath(); g.arc(cx, cy + 88, 9, 0, Math.PI*2); g.fill();
    g.strokeStyle = P.bakelite; g.lineWidth = 2; g.lineCap = 'round';
    g.beginPath(); g.moveTo(cx, cy + 88); g.lineTo(cx - 5, cy + 82); g.stroke();
    g.restore();
    txt(g, 'AC 200A 档', cx, cy + 120, {sz:9, b:1, c:C.acc});
    EP.chip(g, '按下扳机，钳住一根', 244, cy + 48, {sz:9, b:1, c:C.acc});
    conc(g, 224, 'ok', '有电流读数 ⇒ 这一级有电流通过',
         '书上实测 05.2　·　钳形表不用断线（3.7 讲过为什么）');
  } else {
    /* 电子验电器：笔身 + 显示 + 探头搭在绝缘皮上。
       py 原来 118，下半屏空一大片；下移并在底下补一条 3.5 的提醒 */
    const py = 132;
    g.save(); g.lineCap = 'round';
    g.strokeStyle = '#2b4a6f'; g.lineWidth = 17;
    g.beginPath(); g.moveTo(36, py); g.lineTo(304, py); g.stroke();
    g.strokeStyle = C.L; g.lineWidth = 9;
    g.beginPath(); g.moveTo(36, py); g.lineTo(304, py); g.stroke();
    g.restore();
    txt(g, '入户线（不用剥开）', 38, py - 26, {sz:8.5, b:1, c:C.tx3, al:'left'});
    /* 笔 */
    /* 笔身连同读数一起转，读数才落在显示窗里（原来写在窗外） */
    g.save(); g.translate(200, py - 12); g.rotate(-0.62);
    box(g, 0, -9, 96, 18, 4, P.bodyD, P.steelDD, 1.3);
    box(g, 12, -6, 44, 12, 2, '#0f2318', '#2f6b45', 1);
    txt(g, '220 V', 34, 0, {sz:8.5, b:1, c:'#4fe08a'});
    g.restore();
    /* 探头 */
    g.save(); g.strokeStyle = P.chrome; g.lineWidth = 3.4; g.lineCap = 'round';
    g.beginPath(); g.moveTo(200, py - 12); g.lineTo(188, py - 4); g.stroke(); g.restore();
    dot(g, 188, py - 4, P.chrome, 3);
    EP.chip(g, '金属探头搭在绝缘皮上', 106, py - 46, {sz:9, b:1, c:C.acc});
    /* 3.5 那条必须一起摆着：这支笔最危险的用法就是拿它判定停电 */
    box(g, 24, 176, 312, 34, 6, C.warnbg, C.warn, 1);
    txt(g, '它用来「找」，不能用来「判定停电」', 180, 189, {sz:10, b:1, c:C.warn});
    txt(g, '可能误报（邻近电缆耦合），也可能漏报（线在金属槽盒里）', 180, 202,
        {sz:8.5, c:C.tx2});
    conc(g, 224, 'ok', '有电压 ⇒ 电送到这儿了',
         '隔着绝缘皮就能判断，不用剥线');
  }
}
function note3(){
  $('s3a').textContent = S3.k ? '电压' : '电流';
  $('s3b').textContent = S3.k ? '—' : 'AC 200A';
  $('s3c').textContent = '不用';
  const T = [
    ['钳形表：量「有没有电流在流」',
     '书上第 2、3 步用的都是它。用法写死了：<b>将钳形表的档位调整到' +
     '「AC 200A」电流档，按下钳形表的钳头扳机，钳住经电能表输出的任意一根线缆</b>，' +
     '查看钳形表上是否有电流读数。' +
     '<hr><b>它为什么排在最前面：不用断线就能量电流。</b>' +
     '3.7 那节讲过原理 —— <b>钳口是可开合的铁芯，被测导线就是只有一匝的一次绕组</b>，' +
     '本质是一个电流互感器。' +
     '<hr><b>最容易犯的错：把整根电缆钳进去。</b>' +
     '相线和零线一起钳，两根大小相等方向相反，<b>读数是 0.00 A</b>，' +
     '而设备明明在工作。所以书上那句「任意一根」的前提是 —— <b>一次只钳一根</b>。'],
    ['电子验电器：量「电压有没有送到」',
     '书上第 4、5 步用的是它。用法：<b>将金属探头搭在导线绝缘皮上</b>，' +
     '检测入户线端、总断路器、支路断路器是否有电压。' +
     '<hr><b>为什么第 4 步要换工具</b>：前面两步问的是「有没有电流在流」，' +
     '到了断路器这儿要问的变成了「电压有没有送到」——' +
     '<b>断路器断开的时候电流是零，但它的进线端仍然有 220 V</b>。' +
     '拿钳形表量断开的断路器，只会读到 0，什么也说明不了。' +
     '<hr><b>但要记住 3.5 屏 4 那条：感应式验电器用来「找」，不能用来「判定停电」。</b>' +
     '它可能因为邻近电缆耦合而<b>误报</b>（已停电却报有电），' +
     '也可能因为线在金属槽盒里而<b>漏报</b>（带电却不报）——' +
     '<b>漏报比误报危险得多</b>。真要动手之前，' +
     '仍然要按「停电 → 验电 → 挂牌」那一套来。']
  ][S3.k];
  $('n2').innerHTML = '<div class="st">' + T[0] + '</div>' + T[1];
}

/* ================================================================
   场景 4：拿表之前先做的三件事
   ================================================================ */
const S4 = { k:0 };
const PRE = [
  {n:'看同级', t:'一分钟', rid:'上游三级',
   d:'楼道灯亮不亮、电梯动不动。<b>这是书上五步的第一步，也是最便宜的一步。</b>' +
     '<hr>亮着、动着，就说明<b>主供电、总配电箱、楼层箱三级全都正常</b> ——' +
     '一次排除掉三个部件，而且只用眼睛。' +
     '<hr>反过来要是同级也停了，那就<b>根本不该走后面那四步</b>：' +
     '故障在更上一级，去总配电箱查（屏 1 第一档）。'},
  {n:'看外观', t:'一分钟', rid:'烧损、脱落',
   d:'书 P160 提示说明的前半句：<b>当低压供配电系统中的用户线路出现停电现象时，' +
     '先应从外观上观察电能表及连接线路，看是否有损坏或烧损迹象。</b>' +
     '<hr>看什么：<b>电能表外壳有没有发黑、变形</b>，' +
     '<b>接线端子有没有烧痕、松脱</b>，<b>导线绝缘有没有熔化</b>。' +
     '<hr><b>烧损的地方一眼就能看见，不用任何工具。</b>' +
     '而且看到烧痕就意味着<b>先别急着送电</b> —— ' +
     '烧的原因还在那儿（多半是接头松动导致接触电阻发热，8.2 屏 4 讲过这条链）。'},
  {n:'插卡看电量', t:'半分钟', rid:'不是故障',
   d:'书 P160 提示说明的后半句：<b>还应考虑是否由于电能表预存电量耗尽引起的，' +
     '检测配电盘中的电流前，应当检查电能表中的剩余电量，' +
     '将用户的购电卡插入电能表的卡槽中，在显示屏上即会显示剩余电量。</b>' +
     '<hr><b>这件事每年冬天都要发生很多次。</b>' +
     '现象和线路故障一模一样：整户没电、总闸看着是合的、外观也没毛病 ——' +
     '<b>而它根本不是故障。</b>' +
     '<hr>8.2 屏 1 讲装楼层配电箱时那条要求' +
     '「<b>要确保电能表卡槽靠近配电箱箱门的观察窗附近</b>」，' +
     '为的就是这一刻：不用开箱门就能插卡、就能看见剩余电量。'}
];
function draw4(){
  const g = st4.g; st4.clear();
  const k = S4.k, p = PRE[k];
  EP.heading(g, 14, 20, p.n, '花 ' + p.t + '，能排除「' + p.rid + '」');

  if(k === 0){
    /* 楼道：一盏灯 + 一部电梯 */
    box(g, 40, 62, 128, 96, 5, C.box, C.boxLine, 1.4);
    txt(g, '楼道', 104, 76, {sz:9, b:1, c:C.tx3});
    EP.lampHolder(g, 104, 96, 22, 9);
    EP.bulb(g, 104, 112, 15, 3, {});
    txt(g, '亮着', 104, 142, {sz:9.5, b:1, c:C.ok});
    box(g, 192, 62, 128, 96, 5, C.box, C.boxLine, 1.4);
    txt(g, '电梯', 256, 76, {sz:9, b:1, c:C.tx3});
    box(g, 226, 88, 60, 44, 3, C.card, C.boxLine, 1.2);
    txt(g, '8', 256, 108, {sz:16, b:1, c:C.ok});
    txt(g, '在运行', 256, 142, {sz:9.5, b:1, c:C.ok});
    conc(g, 176, 'ok', '同级正常 ⇒ 上游三级全是好的',
         '主供电、总配电箱、楼层箱 —— 一次排除三个');
  } else if(k === 1){
    /* 电能表 + 一处烧痕 */
    box(g, 96, 58, 168, 96, 6, C.box, C.boxLine, 1.6);
    box(g, 118, 72, 100, 28, 4, '#0f2318', '#2f6b45', 1.2);
    txt(g, '0 0 0 2 4 . 6', 168, 86, {sz:11, b:1, c:'#4fe08a'});
    /* 端子 + 烧痕 */
    box(g, 112, 122, 136, 24, 3, C.card, C.boxLine, 1.2);
    [136, 168, 200, 232].forEach(function(x, i){
      box(g, x - 8, 126, 16, 16, 2,
          i === 2 ? '#3a1a12' : P.steel, i === 2 ? C.err : P.steelD, i === 2 ? 1.6 : 1);
    });
    g.save(); g.strokeStyle = C.err; g.lineWidth = 1.6; g.setLineDash([3,2]);
    g.beginPath(); g.arc(200, 134, 15, 0, Math.PI*2); g.stroke(); g.restore();
    EP.chip(g, '端子发黑、有烧痕', 272, 134, {sz:9, b:1, c:C.err, al:'left'});
    txt(g, '看外壳、看端子、看绝缘', 180, 172, {sz:9, c:C.tx3});
    conc(g, 188, 'err', '看到烧痕 ⇒ 先别送电',
         '烧的原因还在那儿：多半是接头松动 → 接触电阻发热');
  } else {
    /* 电能表 + 插卡 */
    box(g, 84, 56, 192, 104, 6, C.box, C.boxLine, 1.6);
    box(g, 104, 72, 116, 32, 4, '#0f2318', '#2f6b45', 1.2);
    txt(g, '剩余 0.0 kW·h', 162, 88, {sz:11, b:1, c:'#ff8f6b'});
    /* 卡槽 */
    box(g, 232, 72, 28, 42, 3, C.card, C.boxLine, 1.2);
    txt(g, '卡槽', 246, 126, {sz:8, c:C.tx3});
    /* 一张卡插进去 */
    g.save(); g.translate(246, 96); g.rotate(-0.18);
    box(g, -18, -12, 54, 34, 4, '#2f5f8f', '#4c86bd', 1.2);
    box(g, -6, -4, 14, 11, 2, '#d8b25a', '#a8853c', 1);
    g.restore();
    EP.chip(g, '购电卡插进去', 300, 62, {sz:9, b:1, c:C.acc, al:'right'});
    txt(g, '显示屏上就显示剩余电量', 180, 178, {sz:9, c:C.tx3});
    conc(g, 194, 'warn', '电量耗尽 —— 这根本不是故障',
         '现象和线路故障一模一样：整户没电、总闸合着、外观正常');
  }
}
function note4(){
  const p = PRE[S4.k];
  $('s4a').textContent = p.n;
  $('s4b').textContent = p.t;
  $('s4c').textContent = p.rid;
  $('n3').innerHTML = '<div class="st">' + p.n + '</div>' + p.d;
}

/* ================================================================
   舞台、事件、收尾
   ================================================================ */
const st1 = new Stage('cv0', 360, 280);
const st2 = new Stage('cv1', 360, 284);
const st3 = new Stage('cv2', 360, 270);
const st4 = new Stage('cv3', 360, 236);

['s1k','s3k','s4k'].forEach(function(id, n){
  document.getElementById(id).addEventListener('click', function(e){
    const b = e.target.closest('.btn'); if(!b) return;
    const v = +b.dataset.k;
    [S1, S3, S4][n].k = v;
    document.querySelectorAll('#' + id + ' .btn').forEach(function(x){
      x.classList.toggle('on', +x.dataset.k === v);
    });
    [note1, note3, note4][n]();
    [draw1, draw3, draw4][n]();
  });
});
document.getElementById('s2p').addEventListener('click', function(){
  if(S2.i > 0){ S2.i--; note2(); draw2(); }
});
document.getElementById('s2n').addEventListener('click', function(){
  if(S2.i < 4){ S2.i++; note2(); draw2(); }
});
st2.cv.addEventListener('click', function(ev){
  const p = st2.pick(ev);
  SY.forEach(function(y, i){ if(Math.abs(p[1] - y) < 18) S2.i = i; });
  note2(); draw2();
});

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会重设尺寸并清空。**四屏全是静态的，必须在这儿逐个补画** */
  draw1(); draw2(); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:8, sec:'8.4'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('8.4');
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
