/* 6.2 线缆的连接 —— 本节内容的唯一真相。
   对应《零基础学电工》第 6 章 6.2 节（书内 P105~P115）。

   书上这一节有八个小节（单股对接／单股 T 形／多股对接／多股 T 形／X 形绞接／
   两根并头／三根及以上并头／线夹连接）。**照做八屏没人翻得完**，
   所以按「接法的四大类」压成四屏：
   ① 单股对接（含 X 形绞接）② 单股 T 形 ③ 多股对接与 T 形 ④ 并头与线夹

   **这一屏的价值全在数字上**：缠多长、缠几圈、留多少、距绝缘层多远。
   这些是能背下来、能拿卷尺去量、能在验收时对照的东西 ——
   手上那点缠绕的功夫只能真去练（这一章开头就说清楚了）。

   数字口径（书上原文，一个都别凭记忆改）：
   - **单股缠绕式对接**（书 P106 提示说明）：
     导线直径 **5 mm** → 缠绕长度应为 **60 mm**；直径 **大于 5 mm** → 缠绕长度应为 **90 mm**。
     将导线缠绕好后，还要在**两端的导线上各自再缠绕 8~10 mm（5 圈）**的长度
   - **单股缠绕式 T 形连接**（书 P106 图 6-10）：支路线芯与主路线芯**中心十字相交**，
     按顺时针方向紧靠主路线芯缠绕支路线芯，**缠绕 6~8 圈**，
     再用钢丝钳将剩余支路线芯剪断并钳平接口
   - **横截面积较小的单股硬导线 T 形**（书 P107 图 6-11）：
     支路线芯先在主路线芯上**环绕扣结**，然后沿干线线芯顺时针贴绕；
     **缠绕长度为线芯直径的 8~10 倍**，紧密缠绕 **6~8 圈**；
     若两线横截面积都较大，两线交叉后可**直接在干线上紧密缠绕 5~6 圈**
   - **X 形绞接**（书 P110~111 图 6-14）：两根线芯呈 **X 形相交**，
     互相绞绕 **2~3 圈**，扳直两根线芯，固定一端、另一端贴绕 **6 圈左右**，
     **左右线芯各贴绕 6 圈**，剪掉多余线芯。**连接导线的规格必须相同**
   - **多股缠绕式对接**（书 P107~108 图 6-12）：
     靠近绝缘层 **1/3** 处绞紧线芯，余下 **2/3** 线芯分散成伞状；
     **交叉部分为线芯长度的 1/3**；将一端线芯**平均分成 3 组**，
     第 1 组扳起垂直于线芯、按顺时针方向紧压平的线芯缠绕**两圈**，
     并将余下的线芯与其他线芯扳平行方向扳平；第 2、3 组依次扳起垂直、**各缠绕 3 圈**
   - **多股缠绕式 T 形**（书 P109 图 6-13）：主路线芯中心用一字槽螺钉旋具插开；
     支路在**距绝缘层 1/8 处**将线芯绞紧，余下 **7/8** 分为两组排列；
     一组插入主路线芯中间、另一组放前面，各沿主路顺时针**缠绕 3~4 圈**
   - **两根塑料硬导线并头**（书 P111~112 图 6-15）：两导线绝缘层均剥去约 **50 mm**；
     在**距离绝缘层 15 mm 处**将两根线芯**扭绞 3 圈**，留适当长度，
     剪掉多余线芯，并将**余线折回压紧**（图上标 ≈10 mm）
   - **三根及以上并头**（书 P112~113 图 6-16）：绝缘层根部对齐剥去，剥 **50 mm**，
     卷绕线芯留 **150 mm**；在**距离绝缘层约 15 mm 处**，
     其中一根线芯（**剥除绝缘层长度是被缠绕线芯的 3 倍以上**）缠绕其他线芯
     **至少 5 圈**后剪断，把其他线芯的余头并齐折回压紧的缠绕线上；
     卷绕线芯先**倾斜弯曲 60°**，再向上**弯成约 90°**，然后紧密缠绕 **5 圈**；
     被绕线芯**预留 10 mm** 折回压紧
   - **GB 50303—2015 规定**（书 P113 提示说明）：导线连接时，铜与铜连接，
     **在室外、高温且潮湿的室内连接时，搭接面要搪锡**，在**干燥的室内可不搪锡**；
     **所有接头相互缠绕必须在 5 圈以上**，保证连接紧密，连接后接头处需要进行绝缘处理
   - **线夹连接**（书 P114 图 6-18）：硬线剥去绝缘层约 **20 mm**；
     根据导线直径选择线夹型号（小／中／大）；
     **线夹与硬导线绝缘层的间距为 3~5 mm**，绝缘层部分**不得深入线夹**；
     夹紧后用钢丝钳切去多余线芯，**线芯余留 2~3 mm**，
     或**余留 10 mm 后将线芯回折**，可更加紧固
   - 不合格的线夹连接（书 P115 图 6-19）：线夹损坏、绝缘层被夹、线头弯曲、
     裸线露出过长、两线错位、夹线位置不良 */
(function(){
'use strict';
ELEC.reg({
  id: '6.2',
  file: 'c6-2.html',
  title: '6.2 线缆的连接',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>单股对接</button>
    <button class="tab" data-i="1"><span class="n">2</span>单股 T 形</button>
    <button class="tab" data-i="2"><span class="n">3</span>多股</button>
    <button class="tab" data-i="3"><span class="n">4</span>并头与线夹</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">缠多长，书上给了具体的毫米数</div>
    两根较粗的单股硬导线对接，用<b>缠绕式</b>：另借一根较细的同类型导线，
    把对接的两根缠起来。<b>缠多长不是凭感觉 —— 按导线直径查</b>。
    <b>切一种直径看该缠多长。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">直径 5 mm</button>
        <button class="btn sm" data-k="1">直径 &gt; 5 mm</button>
        <button class="btn sm" data-k="2">X 形绞接</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">导线直径</div><div class="v" id="s1a">5 mm</div></div>
        <div class="num"><div class="k">缠绕长度</div><div class="v" id="s1b">60 mm</div></div>
        <div class="num hi"><div class="k">两端各加</div><div class="v" id="s1c">8~10 mm</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">单股缠绕式对接的尺寸表（书上原文）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>导线直径</th><th>中间缠绕长度</th><th>两端各再缠</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">5 mm</td><td><b>60 mm</b></td>
          <td rowspan="2"><b>8~10 mm</b><br>（约 <b>5 圈</b>）</td></tr>
        <tr><td class="eu-s">大于 5 mm</td><td><b>90 mm</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>「两端各再缠 8~10 mm」这一步不能省。</b>中间那一段是把两根线绑在一起，
      两端这两小段是<b>把细线自己的头固定住</b> —— 不然一受力就松。
      <span class="sub">缠绕用的那根细导线要和被连接的导线<b>同类型</b>（都是铜或都是铝），
      不同金属绞在一起会电化学腐蚀。</span>
    </div>
  </div>

  <div class="bet" data-bet="c62-len" data-q="两根直径 6 mm 的单股硬导线做缠绕式对接，中间应该缠多长？"
       data-opts="60 mm|90 mm——直径大于 5 mm 的用 90 mm|越长越好，能缠多长缠多长" data-right="1"
       data-after="90 mm。书上给的是两档：直径 5 mm 缠 60 mm，直径大于 5 mm 缠 90 mm。另外别忘了两端的导线上还要各自再缠绕 8~10 mm（约 5 圈）把细线的头固定住——不然中间缠得再长，一受力还是会松。"></div>
</section>

<!-- ================= 场景 2：单股 T 形 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">T 形：先十字相交，再顺时针缠 6~8 圈</div>
    从一根主路上分出一根支路，用 <b>T 形连接</b>。
    做法是<b>支路线芯与主路线芯中心十字相交</b>，然后按顺时针方向紧靠主路缠绕。
    <b>截面积小的还要先打一个扣结。</b><b>切一种看。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">一般：十字相交</button>
        <button class="btn sm" data-k="1">截面积小：先扣结</button>
        <button class="btn sm" data-k="2">两线都粗：直接缠</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这一种</div><div class="v" id="s2a">十字相交</div></div>
        <div class="num"><div class="k">缠几圈</div><div class="v" id="s2b">6~8 圈</div></div>
        <div class="num hi"><div class="k">缠绕长度</div><div class="v" id="s2c">—</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">三种情形，三套数（书上原文）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>情形</th><th>做法</th><th>圈数／长度</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">一般</td><td>支路与主路<b>中心十字相交</b>，
          顺时针紧靠主路缠绕支路</td><td><b>6~8 圈</b></td></tr>
        <tr><td class="eu-s">横截面积<br>较小</td><td>支路先在主路上<b>环绕扣结</b>，
          再沿干线顺时针贴绕</td><td><b>6~8 圈</b><br>缠绕长度＝<b>线芯直径的 8~10 倍</b></td></tr>
        <tr><td class="eu-s">两线都<br>较粗</td><td>两线交叉后<b>直接</b>在干线上紧密缠绕</td>
          <td><b>5~6 圈</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>那个「扣结」是给细线用的防脱手段</b>：细线缠上去容易被拽脱，
      先打一个环绕扣结，等于先勾住，再缠就不会滑。
      <span class="sub">缠完一律<b>用钢丝钳把剩余支路线芯剪断并钳平接口</b> ——
      留个毛刺出来会扎破后面包的绝缘胶带。</span>
    </div>
  </div>

  <div class="bet" data-bet="c62-t" data-q="一根细的单股硬导线做支路，接到主路上。为什么要先打一个环绕扣结？"
       data-opts="为了好看|细线直接缠容易被拽脱，扣结等于先勾住，再缠就不会滑|规范要求，没有原因" data-right="1"
       data-after="防脱。细线芯缠上去的摩擦力小，一受力就顺着主路滑脱了。先在主路上环绕打一个扣结，等于把支路先勾住，再顺时针贴绕 6~8 圈（缠绕长度为线芯直径的 8~10 倍）。两根都比较粗的话就不用扣结，交叉后直接紧密缠 5~6 圈。"></div>
</section>

<!-- ================= 场景 3：多股 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">多股线要先分组，再一组一组缠</div>
    多股软导线不能整把拧在一起 —— 那样连接处松、接触电阻大。
    正确做法是<b>把线芯分散开、分成几组，一组一组按顺序缠</b>。
    <b>切对接／T 形看各自的分组比例。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">多股对接</button>
        <button class="btn sm" data-k="1">多股 T 形</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">绞紧到哪</div><div class="v" id="s3a">靠绝缘层 1/3</div></div>
        <div class="num"><div class="k">分几组</div><div class="v" id="s3b">3 组</div></div>
        <div class="num hi"><div class="k">各缠几圈</div><div class="v" id="s3c">2 圈 / 3 圈</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">两种多股接法的关键数（书上原文）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>绞紧的位置</th><th>分组与圈数</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">对接</td><td>靠近绝缘层 <b>1/3</b> 处绞紧，
          余下 <b>2/3</b> 分散成伞状；<b>交叉部分为线芯长度的 1/3</b></td>
          <td>一端线芯<b>平均分成 3 组</b>；第 1 组缠 <b>2 圈</b>，
          第 2、3 组各缠 <b>3 圈</b></td></tr>
        <tr><td class="eu-s">T 形</td><td>支路在<b>距绝缘层 1/8 处</b>绞紧，
          余下 <b>7/8</b> 分为两组</td>
          <td>一组插入主路中间、另一组放前面，各沿主路顺时针缠 <b>3~4 圈</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>多股 T 形还有一步专门的准备</b>：<b>用一字槽螺钉旋具插入主路多股导线
      去掉绝缘层的线芯中心</b>，把主路的线芯撑开一条缝 —— 支路的一组线芯要插进这条缝里。
      <span class="sub">这样支路是「嵌」进主路里的，不是贴在外面，
      接触面积大得多、也更不容易被拽脱。</span>
    </div>
  </div>

  <div class="bet" data-bet="c62-multi" data-q="多股导线对接，为什么要把线芯分散成伞状、再分成 3 组分别缠？"
       data-opts="为了好看|整把拧在一起接触面积小、连接松；分组缠能让每一股都压实，接触电阻小|为了省线" data-right="1"
       data-after="为了压实。整把拧在一起看着紧，实际上里面的线芯并没有互相压紧，接触电阻大、受力一拉就松。分散成伞状交叉，再分 3 组依次缠绕（第 1 组 2 圈、第 2、3 组各 3 圈），每一组都压在前一组上面，整个接头才是实心的。"></div>
</section>

<!-- ================= 场景 4：并头与线夹 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">并头连接：照明开关、插座盒里最常见的一种</div>
    <b>并头</b>是把要连接的几根线芯并排摆放，用其中一根缠在其余线芯上。
    <b>照明控制开关里零线的连接、电源插座内同相导线的连接，用的都是它。</b>
    <b>切一种看尺寸。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">两根并头</button>
        <button class="btn sm" data-k="1">三根及以上</button>
        <button class="btn sm" data-k="2">线夹连接</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">剥多长</div><div class="v" id="s4a">约 50 mm</div></div>
        <div class="num"><div class="k">从哪儿开始</div><div class="v" id="s4b">距绝缘层 15 mm</div></div>
        <div class="num hi"><div class="k">缠几圈</div><div class="v" id="s4c">3 圈</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st good">GB 50303—2015 那三条（书上提示说明）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>规定</th><th>内容</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">搪锡</td><td>铜与铜连接，<b>在室外、高温且潮湿的室内</b>连接时，
          <b>搭接面要搪锡</b>；在<b>干燥的室内可不搪锡</b></td></tr>
        <tr><td class="eu-s">圈数</td><td><b>所有接头相互缠绕必须在 5 圈以上</b>，保证连接紧密</td></tr>
        <tr><td class="eu-s">绝缘</td><td>连接后<b>接头处需要进行绝缘处理</b>（下一节讲）</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>「5 圈以上」是可以拿去验收的硬指标。</b>做完数一数，不够就重做。
      <span class="sub">为什么潮湿和室外要搪锡：铜裸露在潮气里会氧化，
      氧化层电阻大，接头会越来越热。搪一层锡把铜封住就不氧化了。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="c6-2">
    <div class="qz" data-q="两根直径 6 mm 的单股硬导线做缠绕式对接，中间缠绕长度应该是多少？"
         data-opts="60 mm|90 mm——书上分两档：直径 5 mm 缠 60 mm，大于 5 mm 缠 90 mm|随便，缠满就行"
         data-right="1"
         data-why="90 mm。书上给了两档：导线直径 5 mm 时缠绕长度应为 60 mm；直径大于 5 mm 时应为 90 mm。另外两端的导线上还要各自再缠绕 8~10 mm（约 5 圈），把缠绕用那根细线自己的头固定住——不做这一步，中间缠得再长受力也会松。"></div>
    <div class="qz" data-q="两根塑料硬导线并头连接，从距绝缘层多远的位置开始扭绞？扭几圈？"
         data-opts="从绝缘层根部开始，扭 1 圈|距绝缘层 15 mm 处，扭绞 3 圈，留适当长度剪掉多余线芯并把余线折回压紧|从线头开始，扭 10 圈"
         data-right="1"
         data-why="距绝缘层 15 mm 处扭绞 3 圈。两根导线的绝缘层先均剥去约 50 mm，在距绝缘层 15 mm 处把两根线芯扭绞 3 圈，剪掉多余线芯，再把余线（约 10 mm）折回压紧。留那 15 mm 是为了后面包绝缘时有地方压住。"></div>
    <div class="qz" data-q="GB 50303—2015 对导线连接的缠绕圈数是怎么规定的？"
         data-opts="至少 3 圈|所有接头相互缠绕必须在 5 圈以上|没有具体规定"
         data-right="1"
         data-why="5 圈以上。GB 50303—2015《建筑电气工程施工质量验收规范》规定：所有接头相互缠绕必须在 5 圈以上，保证连接紧密。同一条还规定：铜与铜连接，在室外、高温且潮湿的室内连接时搭接面要搪锡，干燥的室内可不搪锡；连接后接头处需要进行绝缘处理。这是可以拿去验收的硬指标。"></div>
    <div class="qz" data-q="用线夹连接硬导线，线夹和绝缘层之间该留多少间距？"
         data-opts="紧贴着，不留间距|3~5 mm，而且绝缘层部分不得深入线夹|越远越好"
         data-right="1"
         data-why="3~5 mm。线夹与硬导线绝缘层的间距为 3~5 mm，绝缘层部分不得深入线夹——绝缘被夹进去的话，夹住的是塑料不是铜，接触不良。另外硬线要先剥去绝缘层约 20 mm，夹紧后切去多余线芯、余留 2~3 mm，或者余留 10 mm 后把线芯回折可以更紧固。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 6 章 6.2 节（书内 P105~P115）<br>书上八个小节按接法压成四屏；所有毫米数和圈数都是书上原文</div>
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

const CANH = 256;
function bar(g, l1, l2, kind, y){
  const Y = y || 210;
  const bg = kind === 'ok' ? C.okbg : kind === 'err' ? C.errbg : kind === 'warn' ? C.warnbg : C.accbg;
  const fg = kind === 'ok' ? C.ok : kind === 'err' ? C.err : kind === 'warn' ? C.warn : C.acc;
  EC.box(g, 18, Y, 324, 38, 6, bg, fg, 1);
  txt(g, l1, 180, Y + 13, {sz:10.5, b:1, c:fg});
  txt(g, l2, 180, Y + 28, {sz:9, c:C.tx2});
}
/* 尺寸标注：两端短竖线 + 箭头 + 中间数值 */
function dim(g, x0, x1, y, s, c){
  c = c || C.acc;
  g.save();
  g.strokeStyle = c; g.lineWidth = 1.1;
  g.beginPath(); g.moveTo(x0, y - 5); g.lineTo(x0, y + 5);
  g.moveTo(x1, y - 5); g.lineTo(x1, y + 5);
  g.moveTo(x0, y); g.lineTo(x1, y); g.stroke();
  g.restore();
  if(x1 - x0 > 26){ EC.head(g, x0, y, -1, 0, 4, c); EC.head(g, x1, y, 1, 0, 4, c); }
  const w = tw(g, s, 8.5, true) + 8;
  box(g, (x0+x1)/2 - w/2, y - 7, w, 14, 3, C.bg, null, 0);
  txt(g, s, (x0+x1)/2, y, {sz:8.5, b:1, c:c});
}
/* 一段缠绕：在 x0..x1 之间画 n 圈斜线，像绕上去的线 */
function coilSeg(g, x0, x1, cy, r, n, c){
  g.save();
  g.strokeStyle = c || (P.copper || C.cop); g.lineWidth = 2.2; g.lineCap = 'round';
  const step = (x1 - x0) / n;
  for(let i = 0; i < n; i++){
    const x = x0 + i*step;
    g.beginPath();
    g.moveTo(x, cy + r); g.quadraticCurveTo(x + step*0.5, cy - r*1.5, x + step, cy - r);
    g.stroke();
  }
  g.restore();
}
/* 一根带绝缘层的硬导线（水平），cut 之后是裸线芯 */
function wire(g, x0, x1, cy, cut, o){
  o = o || {};
  const R = o.r || 9, cr = o.cr || 3.8;
  g.save();
  g.strokeStyle = P.copper || C.cop; g.lineWidth = cr*2; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x0 + 4, cy); g.lineTo(x1, cy); g.stroke();
  g.restore();
  /* o.flip：绝缘层在**右**侧（cut 是绝缘层的左端）。
     不给这个开关的话，右边那根线的绝缘层宽度会算成负数，整段画不出来（截图抓到的） */
  if(o.flip){ if(cut < x1) box(g, cut, cy - R, x1 - cut, R*2, R*0.6, o.ins || C.L, null, 0); }
  else if(cut > x0) box(g, x0, cy - R, cut - x0, R*2, R*0.6, o.ins || C.L, null, 0);
}

/* ================================================================
   场景 1：单股对接
   ================================================================ */
const OPP = [
  {t:'直径 5 mm', mid:'60 mm', end:'8~10 mm', n:14,
   bar:['直径 5 mm → 中间缠绕长度 60 mm', '两端的导线上还要各自再缠 8~10 mm（约 5 圈）']},
  {t:'直径 > 5 mm', mid:'90 mm', end:'8~10 mm', n:20,
   bar:['直径大于 5 mm → 中间缠绕长度 90 mm', '线越粗，缠得越长才夹得住']},
  {t:'X 形绞接', mid:'左右各 6 圈', end:'先绞 2~3 圈', n:12,
   bar:['两根线芯 X 形相交，互相绞绕 2~3 圈，再左右各贴绕 6 圈', '连接导线的规格必须相同']}
];
const S1 = { k:0 };
const st1 = new Stage('cv0', 360, CANH);

function draw1(){
  const g = st1.g; st1.clear();
  const it = OPP[S1.k];
  EP.heading(g, 12, 14, S1.k === 2 ? '绞接（X 形）连接' : '单股缠绕式对接',
             S1.k === 2 ? '两根规格相同的细硬导线' : '另借一根细导线缠');
  const cy = 76;
  if(S1.k < 2){
    /* 两根粗线对接 + 中间一段缠绕 */
    wire(g, 20, 200, cy, 88);
    wire(g, 160, 340, cy, 272, {ins:C.N, flip:true});
    /* 中间的缠绕段 */
    const w0 = S1.k === 0 ? 118 : 96, w1 = S1.k === 0 ? 242 : 264;
    coilSeg(g, w0, w1, cy, 8, it.n, P.copperD || C.copD);
    dim(g, w0, w1, cy + 30, it.mid);
    /* 两端各再缠 8~10mm */
    coilSeg(g, w0 - 22, w0, cy, 7, 5, C.warn);
    coilSeg(g, w1, w1 + 22, cy, 7, 5, C.warn);
    dim(g, w0 - 22, w0, cy - 34, '8~10', C.warn);
    dim(g, w1, w1 + 22, cy - 34, '8~10', C.warn);
    txt(g, '两端各 5 圈', 180, cy - 46, {sz:9, b:1, c:C.warn});
  }else{
    /* X 形：两根线芯交叉绞绕 */
    const cx = 180;
    wire(g, 20, cx + 10, cy, 78);
    wire(g, cx - 10, 340, cy, 282, {ins:C.N, flip:true});
    coilSeg(g, cx - 54, cx - 4, cy, 7, 6, P.copperD || C.copD);
    coilSeg(g, cx + 4, cx + 58, cy, 7, 6, P.copperD || C.copD);
    /* 中间的 X 交叉 */
    g.save();
    g.strokeStyle = P.copper || C.cop; g.lineWidth = 3; g.lineCap = 'round';
    g.beginPath(); g.moveTo(cx - 12, cy - 9); g.lineTo(cx + 12, cy + 9);
    g.moveTo(cx - 12, cy + 9); g.lineTo(cx + 12, cy - 9); g.stroke(); g.restore();
    dim(g, cx - 54, cx - 4, cy + 30, '左 6 圈');
    dim(g, cx + 4, cx + 58, cy + 30, '右 6 圈');
    txt(g, '中间先互相绞 2~3 圈', cx, cy - 34, {sz:9, b:1, c:C.warn});
  }
  box(g, 22, 138, 316, 44, 6, C.accbg, C.acc, 1.2);
  txt(g, S1.k === 2 ? '互相绞 2~3 圈 → 扳直 → 左右各贴绕 6 圈'
                    : '中间缠 ' + it.mid + '　＋　两端各缠 8~10 mm（5 圈）',
      180, 154, {sz:10.5, b:1, c:C.acc});
  txt(g, S1.k === 2 ? '连接导线的规格必须相同' : '缠绕用的细导线要和被连接的导线同类型（都铜或都铝）',
      180, 172, {sz:8.5, c:C.tx2});
  bar(g, it.bar[0], it.bar[1], 'ok');
}
function note1(){
  const it = OPP[S1.k];
  $('s1a').textContent = S1.k === 2 ? '规格相同' : it.t.replace('直径 ', '');
  $('s1b').textContent = it.mid;
  $('s1c').textContent = it.end;
  const H = [
    '<div class="st">直径 5 mm → 缠 60 mm</div>' +
    '这是书上给的第一档。<b>缠绕的那根是另借的一根较细的同类型导线</b>，' +
    '把对接的两根粗导线绑在一起。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>两端各再缠 8~10 mm（5 圈）这一步不能省</b>：' +
    '中间那 60 mm 是把两根线绑在一起，' +
    '两端这两小段是<b>把细线自己的头固定在各自的导线上</b> ——' +
    '不做的话，细线的两个头是自由的，一受力整段就松了。</div>',

    '<div class="st">直径大于 5 mm → 缠 90 mm</div>' +
    '线越粗，接触面越大、受力也越大，<b>缠绕段就得更长才夹得住</b>。' +
    '<div class="tip info" style="margin-top:8px">' +
    '两端仍然是各再缠 <b>8~10 mm（5 圈）</b>，这个数不随直径变。' +
    '<span class="sub">书上没给更粗的档位。<b>再粗的导线现场一般不这么接了</b> ——' +
    '会用线夹、压接管或者接线端子（下一屏讲线夹）。</span></div>',

    '<div class="st">X 形绞接：两根细硬导线的接法</div>' +
    '<b>连接两根横截面积较小的单股铜芯硬导线</b>可采用绞接（X 形）连接。' +
    '去掉两根线芯的绝缘层，<b>呈 X 形相交</b>，<b>互相绞绕 2~3 圈</b>，' +
    '然后扳直两根线芯，固定一端、把另一端贴绕 <b>6 圈</b>左右，' +
    '<b>左右线芯各贴绕 6 圈</b>，剪掉多余线芯。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>注意连接导线的规格必须相同。</b>' +
    '<span class="sub">粗细不同的两根绞在一起，细的那根会被压扁、接触面反而变小；' +
    '而且受力时应力全集中在细线上。</span></div>'
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
   场景 2：单股 T 形
   ================================================================ */
const TEE = [
  {t:'十字相交', n:'6~8 圈', len:'—', knot:false,
   bar:['支路线芯与主路线芯中心十字相交', '按顺时针方向紧靠主路缠绕支路线芯 6~8 圈']},
  {t:'先打扣结', n:'6~8 圈', len:'线芯直径的 8~10 倍', knot:true,
   bar:['横截面积较小的：支路先在主路上环绕扣结', '再沿干线顺时针贴绕，缠绕长度为线芯直径的 8~10 倍']},
  {t:'直接缠', n:'5~6 圈', len:'—', knot:false,
   bar:['两线横截面积都较大：交叉后直接在干线上缠', '紧密缠绕 5~6 圈就够 —— 粗线本身摩擦力就大']}
];
const S2 = { k:0 };
const st2 = new Stage('cv1', 360, CANH);

function draw2(){
  const g = st2.g; st2.clear();
  const it = TEE[S2.k];
  EP.heading(g, 12, 14, '单股 T 形连接', it.t);
  const cy = 68, cx = 172;
  /* 主路：横着一根 */
  wire(g, 20, 340, cy, 92);
  wire(g, 20, 340, cy, 250, {ins:C.N, flip:true});
  /* 支路：竖着下来 */
  const by = 150;
  g.save();
  g.strokeStyle = P.copper || C.cop; g.lineWidth = 7; g.lineCap = 'round';
  g.beginPath(); g.moveTo(cx, cy + 4); g.lineTo(cx, by - 24); g.stroke(); g.restore();
  box(g, cx - 9, by - 24, 18, 30, 5, C.N, null, 0);
  txt(g, '支路', cx, by + 16, {sz:9, c:C.tx2});
  txt(g, '主路', 60, cy - 22, {sz:9, c:C.tx2});
  /* 缠绕段 */
  const w0 = cx - 6, w1 = cx + (S2.k === 2 ? 48 : 62);
  coilSeg(g, w0, w1, cy, 8, S2.k === 2 ? 6 : 8, P.copperD || C.copD);
  dim(g, w0, w1, cy - 34, it.n);
  if(it.knot){
    /* 扣结：一个小环 */
    g.save();
    g.strokeStyle = C.warn; g.lineWidth = 2.6;
    g.beginPath(); g.arc(cx - 16, cy, 9, 0, Math.PI*2); g.stroke(); g.restore();
    txt(g, '先环绕扣结', cx - 16, cy + 30, {sz:9, b:1, c:C.warn});
    dim(g, w0, w1, cy + 52, '长度＝线芯直径的 8~10 倍', C.warn);
  }
  box(g, 22, 168, 316, 32, 6, C.accbg, C.acc, 1.2);
  txt(g, '缠 ' + it.n + (it.len !== '—' ? '　长度＝' + it.len : '　然后剪断并钳平接口'),
      180, 184, {sz:10, b:1, c:C.acc});
  bar(g, it.bar[0], it.bar[1], 'ok', 208);
}
function note2(){
  const it = TEE[S2.k];
  $('s2a').textContent = it.t;
  $('s2b').textContent = it.n;
  $('s2c').textContent = it.len;
  const H = [
    '<div class="st">一般情形：中心十字相交，顺时针缠 6~8 圈</div>' +
    '书上原话：<b>将去除绝缘层的支路线芯与主路线芯中心十字相交</b>，' +
    '<b>按照顺时针的方向紧靠主路线芯缠绕支路线芯</b>，缠 <b>6~8 圈</b>，' +
    '最后<b>使用钢丝钳将剩余支路线芯剪断并钳平接口</b>。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>「中心十字相交」是起手式</b>：两根线的裸线芯正中间交叉，' +
    '这样支路两边的长度差不多，缠起来受力才均匀。' +
    '<span class="sub"><b>剪断之后一定要钳平接口</b> ——' +
    '留个毛刺出来会扎破后面包的绝缘胶带，那就等于白包了。</span></div>',

    '<div class="st">横截面积较小：先打一个环绕扣结</div>' +
    '细线芯缠上去<b>摩擦力小、容易被拽脱</b>，所以书上给了一个额外的步骤：' +
    '<b>将支路线芯在主路线芯上环绕扣结，然后沿干线线芯顺时针贴绕。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>缠绕长度为线芯直径的 8~10 倍</b>，紧密缠绕 <b>6~8 圈</b>。' +
    '<span class="sub">「线芯直径的 8~10 倍」是个相对量 —— 线越细缠得越短，' +
    '但圈数不变。这比给一个绝对毫米数合理，因为细线一圈本来就占得少。</span></div>',

    '<div class="st">两线都较粗：交叉后直接缠 5~6 圈</div>' +
    '书上原话：<b>如果连接导线的横截面积较大，则两线交叉后，' +
    '直接在干线上紧密缠绕 5~6 圈即可。</b>' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>粗线不用扣结</b>：线芯本身硬、摩擦力大，' +
    '缠上去就压得很实，不会滑脱。' +
    '<span class="sub">注意 <b>5~6 圈</b>这个数正好卡在 GB 50303 的' +
    '「所有接头相互缠绕必须在 5 圈以上」这条线上 —— 不能再少了。</span></div>'
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
   场景 3：多股
   ================================================================ */
const S3 = { k:0 };
const st3 = new Stage('cv2', 360, CANH);

function draw3(){
  const g = st3.g; st3.clear();
  const opp = S3.k === 0;
  EP.heading(g, 12, 14, opp ? '多股缠绕式对接' : '多股缠绕式 T 形连接',
             opp ? '1/3 绞紧，2/3 散成伞状' : '1/8 绞紧，7/8 分两组');
  const cy = 74;
  if(opp){
    /* 两根多股线，中间散成伞状交叉 */
    [0,1].forEach(function(side){
      const dir = side ? -1 : 1;
      const xi = side ? 250 : 110;
      if(side) wire(g, 250, 340, cy, 278, {ins:C.N, cr:4.4, flip:true});
      else     wire(g, 20, 110, cy, 82, {ins:C.L, cr:4.4});
      /* 绞紧的 1/3 */
      coilSeg(g, side ? xi - 26 : xi, side ? xi : xi + 26, cy, 6, 4, P.copperD || C.copD);
      /* 散开的 2/3：三组 */
      g.save();
      g.strokeStyle = P.copper || C.cop; g.lineWidth = 2; g.lineCap = 'round';
      const bx = side ? xi - 26 : xi + 26;
      for(let i = -1; i <= 1; i++){
        g.beginPath(); g.moveTo(bx, cy);
        g.lineTo(bx + dir*44, cy + i*15);
        g.stroke();
      }
      g.restore();
    });
    dim(g, 82, 136, cy + 40, '绞紧 1/3');
    dim(g, 140, 220, cy + 40, '交叉 1/3', C.warn);
    /* 三组标注 */
    txt(g, '余下 2/3 散成伞状，平均分 3 组', 180, cy - 42, {sz:9, b:1, c:C.tx2});
    box(g, 22, 128, 316, 44, 6, C.accbg, C.acc, 1.2);
    txt(g, '第 1 组缠 2 圈　　第 2、3 组各缠 3 圈', 180, 144, {sz:10.5, b:1, c:C.acc});
    txt(g, '每组扳起垂直于线芯，顺时针紧压平的线芯缠绕，缠完与其他线芯扳平', 180, 162,
        {sz:8.5, c:C.tx2});
  }else{
    /* T 形：主路横、支路竖，支路分两组 */
    const cx = 176;
    wire(g, 20, 340, cy, 88, {cr:4.4});
    wire(g, 20, 340, cy, 262, {ins:C.N, cr:4.4, flip:true});
    /* 螺钉旋具插开主路中心 */
    g.save();
    g.strokeStyle = P.steelDD || C.metalD; g.lineWidth = 4; g.lineCap = 'round';
    g.beginPath(); g.moveTo(cx + 34, cy - 40); g.lineTo(cx + 34, cy - 8); g.stroke(); g.restore();
    txt(g, '一字螺钉旋具插开主路中心', cx + 44, cy - 30, {sz:8.5, c:C.tx3, al:'left'});
    /* 支路 */
    g.save();
    g.strokeStyle = P.copper || C.cop; g.lineWidth = 6; g.lineCap = 'round';
    g.beginPath(); g.moveTo(cx, cy + 6); g.lineTo(cx, 132); g.stroke(); g.restore();
    box(g, cx - 9, 132, 18, 26, 5, C.N, null, 0);
    coilSeg(g, cx - 34, cx + 34, cy, 8, 8, P.copperD || C.copD);
    dim(g, cx - 34, cx + 34, cy + 36, '各缠 3~4 圈');
    txt(g, '距绝缘层 1/8 处绞紧，余下 7/8 分两组', 180, 124, {sz:9, b:1, c:C.tx2});
    box(g, 22, 140, 316, 44, 6, C.accbg, C.acc, 1.2);
    txt(g, '一组插进主路中间，另一组放在前面', 180, 156, {sz:10.5, b:1, c:C.acc});
    txt(g, '两组各沿主路线芯按顺时针方向缠绕 3~4 圈', 180, 174, {sz:8.5, c:C.tx2});
  }
  bar(g, opp ? '分散成伞状再分组缠，接头才是实心的'
             : '支路一组插进主路中心那条缝里，不是贴在外面',
      opp ? '整把拧在一起看着紧，实际接触电阻大、一拉就松'
          : '嵌进去的接触面积大得多，也更不容易被拽脱', 'ok');
}
function note3(){
  const opp = S3.k === 0;
  $('s3a').textContent = opp ? '靠绝缘层 1/3' : '距绝缘层 1/8';
  $('s3b').textContent = opp ? '3 组' : '2 组';
  $('s3c').textContent = opp ? '2 圈 / 3 圈' : '各 3~4 圈';
  $('n2').innerHTML = opp ?
    '<div class="st">多股对接：1/3 绞紧，2/3 散开，分 3 组</div>' +
    '① 把两根多股导线的线芯散开拉直，绞紧线芯；' +
    '② <b>靠近绝缘层 1/3 处绞紧线芯，余下 2/3 线芯分散成伞状</b>；' +
    '③ 两边伞状交叉，<b>交叉部分为线芯长度的 1/3</b>，捋平两端对叉的线芯。' +
    '<div class="tip" style="margin-top:8px">' +
    '④ <b>将一端线芯平均分成 3 组</b>：第 1 组扳起垂直于线芯，' +
    '按顺时针方向紧压平的线芯<b>缠绕两圈</b>，并将余下的线芯与其他线芯扳平行方向扳平；' +
    '<b>第 2、3 组依次扳起垂直，各缠绕 3 圈</b>。' +
    '⑤ 多余的线芯从根部切断，钳平线端。另一端用同样方法。' +
    '<span class="sub"><b>为什么要这么麻烦</b>：整把拧在一起看着紧，' +
    '实际上里面的线芯并没有互相压紧，接触电阻大、一拉就松。' +
    '分组缠让每一组都压在前一组上面，整个接头才是实心的。</span></div>'
    :
    '<div class="st">多股 T 形：把支路嵌进主路里</div>' +
    '① 把主路和支路连接部位的绝缘层去除；' +
    '② <b>用一字槽螺钉旋具插入主路多股导线的线芯中心</b>，把主路线芯撑开一条缝；' +
    '③ 支路<b>在距绝缘层 1/8 处将线芯绞紧，余下 7/8 分为两组排列</b>。' +
    '<div class="tip info" style="margin-top:8px">' +
    '④ <b>将一组支路线芯插入主路线芯中间，另一组放在前面</b>；' +
    '⑤⑥ 前面那组沿主路按顺时针方向弯折缠绕，<b>继续缠 3~4 圈</b>；' +
    '⑦ 用偏口钳剪掉多余线芯；⑧~⑪ 另一组用同样方法向另一侧缠绕。' +
    '<span class="sub"><b>插进缝里这一步是关键</b>：支路是「嵌」在主路里的，' +
    '不是贴在外面 —— 接触面积大得多，也更不容易被拽脱。</span></div>';
}
document.getElementById('s3k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S3.k = +t.dataset.k;
  document.querySelectorAll('#s3k .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.k === S3.k); });
  note3(); draw3();
});

/* ================================================================
   场景 4：并头与线夹
   ================================================================ */
const JOIN = [
  {t:'两根并头', strip:'约 50 mm', from:'距绝缘层 15 mm', n:'3 圈',
   bar:['两导线绝缘层均剥去约 50 mm，距绝缘层 15 mm 处扭绞 3 圈', '剪掉多余线芯，余线（约 10 mm）折回压紧']},
  {t:'三根及以上', strip:'约 50 mm', from:'距绝缘层约 15 mm', n:'至少 5 圈',
   bar:['其中一根缠绕其余线芯至少 5 圈后剪断', '那一根剥出的长度要是被缠绕线芯的 3 倍以上']},
  {t:'线夹连接', strip:'约 20 mm', from:'线夹距绝缘层 3~5 mm', n:'压接',
   bar:['剥 20 mm，选对线夹型号，线夹距绝缘层 3~5 mm', '夹紧后线芯余留 2~3 mm，或余留 10 mm 折回更紧固']}
];
const S4 = { k:0 };
const st4 = new Stage('cv3', 360, CANH);

function draw4(){
  const g = st4.g; st4.clear();
  const it = JOIN[S4.k];
  EP.heading(g, 12, 14, it.t, S4.k === 2 ? '压接，不用缠' : '并排摆放，一根缠其余');
  const cy = 68;
  if(S4.k < 2){
    const n = S4.k === 0 ? 2 : 3;
    const cols = [C.L, C.N, '#4fc04a'];
    for(let i = 0; i < n; i++){
      const y = cy + i * 20;
      wire(g, 20, 316, y, 150, {ins:cols[i], r:8, cr:3.4});
    }
    /* 绞绕段 */
    coilSeg(g, 176, S4.k === 0 ? 236 : 268, cy + (n-1)*10, 9 + n*3,
            S4.k === 0 ? 3 : 5, P.copperD || C.copD);
    dim(g, 150, 176, cy - 30, '15');
    dim(g, 176, S4.k === 0 ? 236 : 268, cy - 30, it.n);
    /* 余线折回 */
    g.save();
    g.strokeStyle = P.copper || C.cop; g.lineWidth = 2.6; g.lineCap = 'round';
    const ex = S4.k === 0 ? 236 : 268;
    g.beginPath(); g.moveTo(ex, cy + (n-1)*10);
    g.quadraticCurveTo(ex + 26, cy + (n-1)*10 - 20, ex + 6, cy + (n-1)*10 - 22);
    g.stroke(); g.restore();
    txt(g, '余线折回压紧', ex + 14, cy + (n-1)*10 - 34, {sz:8.5, c:C.warn, al:'left'});
    dim(g, 20, 150, cy + (n-1)*20 + 30, '剥去约 50 mm');
  }else{
    /* 线夹：两根线插进一个线夹 */
    wire(g, 20, 190, cy - 8, 128, {ins:C.L, r:8, cr:3.4});
    wire(g, 20, 190, cy + 8, 128, {ins:C.N, r:8, cr:3.4});
    /* 线夹本体 */
    box(g, 196, cy - 22, 46, 44, 8, '#3ca8d8', null, 0);
    box(g, 242, cy - 14, 16, 28, 4, '#2b7fa8', null, 0);
    txt(g, '线夹', 219, cy + 38, {sz:9, b:1, c:C.tx2});
    dim(g, 128, 196, cy - 40, '3~5');
    txt(g, '绝缘层不得深入线夹', 162, cy - 58, {sz:8.5, c:C.warn});
    dim(g, 20, 128, cy + 40, '剥去约 20 mm');
    /* 余留 */
    dim(g, 258, 274, cy - 40, '2~3', C.warn);
  }
  box(g, 22, S4.k < 2 ? 152 : 148, 316, 44, 6, C.accbg, C.acc, 1.2);
  txt(g, S4.k === 2 ? '线夹与绝缘层间距 3~5 mm，线芯余留 2~3 mm'
                    : '距绝缘层 ' + (S4.k === 0 ? '15 mm 扭绞 3 圈' : '约 15 mm，缠至少 5 圈'),
      180, S4.k < 2 ? 168 : 164, {sz:10.5, b:1, c:C.acc});
  txt(g, S4.k === 2 ? '或者余留 10 mm 后把线芯回折，可更加紧固'
                    : 'GB 50303—2015：所有接头相互缠绕必须在 5 圈以上',
      180, S4.k < 2 ? 186 : 182, {sz:8.5, c:C.tx2});
  bar(g, it.bar[0], it.bar[1], 'ok');
}
function note4(){
  const it = JOIN[S4.k];
  $('s4a').textContent = it.strip;
  $('s4b').textContent = it.from;
  $('s4c').textContent = it.n;
  const H = [
    '<div class="st">两根塑料硬导线并头</div>' +
    '<b>并头</b>是把需要连接的导线线芯部分<b>并排摆放</b>，' +
    '然后用其中一根导线线芯<b>绕接在其余线芯上</b>的一种连接方法。' +
    '<div class="tip" style="margin-top:8px">' +
    '① 两根导线的绝缘层均剥去约 <b>50 mm</b>；' +
    '② 用钢丝钳夹在导线切口处，将导线弯成约 <b>90°</b>；' +
    '③ 用手或借助尖嘴钳把两根线芯<b>扭绞在一起</b>；' +
    '④ 在<b>距离绝缘层 15 mm 处</b>把两根线芯<b>扭绞 3 圈</b>；' +
    '⑤ 留余线适当长度（约 <b>10 mm</b>）后<b>折回压紧</b>。' +
    '<span class="sub"><b>照明控制开关中零线的连接、电源插座内同相导线的连接</b>' +
    '用的都是这种接法 —— 是家装电工天天做的活。</span></div>',

    '<div class="st">三根及以上并头</div>' +
    '<b>把连接导线绝缘层并齐合拢</b>，在<b>距离绝缘层约 15 mm 处</b>，' +
    '<b>将其中一根线芯缠绕其他线芯至少 5 圈后剪断</b>，' +
    '把其他线芯的余头并齐折回压紧在缠绕线上。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>那根用来缠的线要留长一些</b>：书上写' +
    '「绕线线芯剥除绝缘层长度是<b>被缠绕线芯的 3 倍以上</b>」' +
    '（图上标的是被卷绕 50 mm、卷绕线芯 150 mm）。' +
    '<span class="sub">具体动作：卷绕线芯先<b>倾斜弯曲 60°</b>，' +
    '再向上<b>弯成约 90°</b>，然后一圈接一圈紧密缠绕 <b>5 圈</b>，' +
    '被绕线芯<b>预留 10 mm</b> 折回压紧。</span></div>',

    '<div class="st good">线夹连接：不用缠，压一下就行</div>' +
    '<b>操作简单，安装牢固可靠</b>，现场用得越来越多。' +
    '① 硬线剥去绝缘层约 <b>20 mm</b>；' +
    '② <b>根据导线直径选择线夹型号</b>（小／中／大）；' +
    '③ 线夹插入压线钳口至中部，确认位置；' +
    '④ 把线芯平行插入线夹，<b>线夹与绝缘层的间距为 3~5 mm</b>，用力夹紧。' +
    '<div class="tip" style="margin-top:8px">' +
    '⑤ 用钢丝钳切去多余线芯，<b>线芯余留 2~3 mm</b>；' +
    '<b>或者余留 10 mm 后把线芯回折</b>，可更加紧固。' +
    '<span class="sub"><b>绝缘层部分不得深入线夹</b> ——' +
    '夹住的是塑料不是铜，接触不良。书上还画了六种不合格：' +
    '线夹损坏、绝缘层被夹、线头弯曲、裸线露出过长、两线错位、夹线位置不良。' +
    '<b>不合格就剪掉线夹重新连接</b>，别将就。</span></div>'
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

ElecNav.init({ch:6, sec:'6.2'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('6.2');
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
