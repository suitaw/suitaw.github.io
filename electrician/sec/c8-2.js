/* 8.2 配电箱里都有什么 —— 本节内容的唯一真相。
   对应《零基础学电工》第 8 章 8.2 节（书内 P143~P153 里能教的那一半）。

   **书上 8.2 有一大半教不了**：楼道总配电箱的安装、楼层配电箱的安装、
   用户配电盘的安装，全是实物照片流程（放箱体、垫木块、装绝缘木板、
   加木条、挂电能表、拧端子）。**打孔、垫平、拧到什么程度算紧，网页给不了。**
   这一节教的是另一半：**箱里都有什么、哪个端子接哪根、什么样算接错。**

   四屏：① 柜／箱／盘三个词 ② 盘里必须分设的两块端子板 ③ 电能表 1、3 进 2、4 出
        ④ 左零右相与线色

   数字与说法的出处（书上原文，别凭记忆改）：
   - 配电箱应选用**带有产品合格证和耐压检测证明**的产品；
     采用**冷轧钢板或阻燃绝缘材料**制作，**箱体钢板厚度不得小于 1.5 mm**；
     箱体表面及内部的连接部位、器件等应做好**防锈处理**
   - **配电盘是集中、切换、分配电能的设备**；应选用带有产品合格证的产品，
     应具有一定的**机械强度和耐压能力**；
     **配电盘内必须分设 N 线端子板和 PE 线端子板**
   - 断路器**额定电流一定要大于所对应线路的总电流**；
     **总配电箱中的断路器应选用三相断路器**；
     楼层配电箱和配电盘中的**总断路器一般选用双进双出的断路器（32 A）**；
     支路中需要实现漏电保护的线路（如卫生间供电线路，因环境潮湿需要漏电保护）
     一般选用**带漏电保护功能的双进双出断路器**；
     **支路断路器选用单进单出的（10 A）即可**
   - **选用电能表的最大额定电流要大于总断路器的额定电流**；
     根据用电负荷计算，电能表可选用 **15(60) A** 的规格
   - 楼层配电箱里待安装的是**单相电子式预付费式电能表**；
     需确保**电能表卡槽靠近配电箱箱门的观察窗附近**，
     根据配电箱深度和电能表厚度比较**适当增加底板厚度**（一般在底板上加装木条）
   - 电能表接线原则：**「1、3 进，2、4 出」**（书 P148 原文，图 8-18）
   - 用户配电盘**距离地面的高度应在 1.9 m 左右**（书 P152，图 8-19）
   - 配电盘内断路器全部装完后，按照**「左零右相」**原则连接供电线路（书 P152）
   - 连接导线时**应按顺序有条理地放置导线，不可随意将导线缠绕在一起**（图 8-21 ②）
   - 从总断路器出线端引出相线和零线，分别接到支路断路器和零线接线柱上；
     从支路断路器出线端分别引出相线、零线，从接地端子上引出地线，
     相线、零线、地线引出到线管中（图 8-21 ②③）
   - 最后**在护盖下部标记各支路控制功能的名称**，方便操作、控制和后期维修（图 8-21 ④）
   - 线色（书 P146 原文）：**相线 L1 黄、L2 绿、L3 红，零线 N 蓝，地线 PE 黄绿，
     单相供电中的相线为红色，零线依然为蓝色**
   - 线缆截面（书 P145~146）：总配电箱及干线 **10 mm²**、楼层配电箱 **8 mm²**、
     室内支路 **4 或 6 mm²**，**护管直径 25 mm**

   **一处书上写得含糊、我按国标教并注明的地方（屏 3）**：
   书 P148 那句原话是「将电能表第 1、3 接线端子分别连接入户线的相线和零线；
   将第 2、4 接线端子分别连接总断路器的**零线和相线**接线端」——
   后半句的顺序和国标接法（2 出相线、4 出零线）对不上，
   多半是列举时没严格对应。**「1、3 进，2、4 出」这条原则本身是对的、也是加粗的**，
   所以屏 3 教的是：**1 相线进、2 相线出、3 零线进、4 零线出**，
   并在文案里钉死一句现场规矩：**以表盖内侧印的接线图为准**。*/
(function(){
'use strict';
ELEC.reg({
  id: '8.2',
  file: 'c8-2.html',
  title: '8.2 配电箱里都有什么',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>柜箱盘</button>
    <button class="tab" data-i="1"><span class="n">2</span>两块端子板</button>
    <button class="tab" data-i="2"><span class="n">3</span>电能表接线</button>
    <button class="tab" data-i="3"><span class="n">4</span>左零右相</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">柜、箱、盘，是三个东西</div>
    这三个词天天混着说，但书上分得很清楚：<b>柜</b>在一楼、<b>箱</b>在楼道或楼层、
    <b>盘</b>在你家进门。<b>点一个看它是什么、书上对它有什么硬要求。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">配电柜</button>
        <button class="btn sm" data-k="1">配电箱</button>
        <button class="btn sm" data-k="2">配电盘</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">装在哪</div><div class="v" id="s1a">一楼</div></div>
        <div class="num"><div class="k">管多大<br>范围</div><div class="v" id="s1b">整栋楼</div></div>
        <div class="num hi"><div class="k">里面的<br>总闸</div><div class="v" id="s1c">三相</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">买箱子的三条硬要求（书 P143 原文）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>要求</th><th>书上写的</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">证</td><td>应选用带有<b>产品合格证和耐压检测证明</b>的产品</td></tr>
        <tr><td class="eu-s">材料</td><td>采用<b>冷轧钢板或阻燃绝缘材料</b>制作，
          <b>箱体钢板厚度不得小于 1.5 mm</b></td></tr>
        <tr><td class="eu-s">防锈</td><td>箱体表面及内部的<b>连接部位、器件等应做好防锈处理</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>1.5 mm 这个数是记得住也用得上的。</b>
      <span class="sub">薄板箱子拧螺钉时会变形，门关不严、导轨装不平；
      更要紧的是 —— <b>配电箱本身是接地的金属外壳</b>，
      万一箱内某根相线碰到箱壁，靠的就是它把故障电流导走让保护动作。
      薄了、锈了、接地没做好，这层保护就没了。</span>
    </div>
  </div>

  <div class="bet" data-bet="c82-nam" data-q="「配电盘内必须分设 N 线端子板和 PE 线端子板」——这句话是在说什么？"
       data-opts="零线和地线要各自有一排接线柱，不能混在一起|零线和地线要用不同颜色|盘里要留出两个空位"
       data-right="0"
       data-after="零线和地线各有一排端子，不能混。这是书上对配电盘的硬要求，也是下一屏整屏在讲的事——N 和 PE 一旦并到一起，漏电保护就永远不动作，而灯照亮、插座照用，从表面上完全看不出问题。"></div>
</section>

<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">两排端子长得一样，混了就出人命</div>
    书上对配电盘只提了一条结构性的硬要求：
    <b>盘内必须分设 N 线端子板和 PE 线端子板。</b>
    <b>点画布上的接法看会怎样。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">分开接（对）</button>
        <button class="btn sm" data-k="1">并到一起（错）</button>
        <button class="btn sm" data-k="2">人碰到外壳</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">N 和 PE</div><div class="v" id="s2a">分开</div></div>
        <div class="num"><div class="k">漏保能<br>动作吗</div><div class="v" id="s2b">能</div></div>
        <div class="num hi"><div class="k">平时看<br>得出来吗</div><div class="v" id="s2c">看不出</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">配电盘里的断路器怎么选（书 P143 原文）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>位置</th><th>选什么</th><th>额定</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">总配电箱</td><td>应选用<b>三相断路器</b></td><td>按总电流</td></tr>
        <tr><td class="eu-s">楼层箱／<br>配电盘的总闸</td><td>一般选用<b>双进双出</b>的断路器</td><td><b>32 A</b></td></tr>
        <tr><td class="eu-s">要漏电保护<br>的支路</td><td><b>带漏电保护功能的双进双出</b>断路器<br>
          <span class="sub">如卫生间：环境潮湿</span></td><td>按支路电流</td></tr>
        <tr><td class="eu-s">普通支路</td><td><b>单进单出</b>的即可</td><td><b>10 A</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>「双进双出」「单进单出」说的是它同时断几根线。</b>
      <span class="sub">双进双出＝相线和零线一起断（两个极）；单进单出＝只断相线（一个极）。
      <b>总闸和带漏电的支路必须双进双出</b> —— 检修时要把零线也断开才安全，
      漏电保护本身也要同时检测两根线上的电流差。
      普通照明支路单进单出就够，断掉相线灯就灭了。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">为什么 N 和 PE 混接是「看不出来的错」</div>
    N（零线）平时是<b>载流</b>的，PE（地线）平时<b>一点电流都没有</b>。
    漏电保护器判断的正是「进去的电流和回来的电流差了多少」。
    <div class="tip">
      <b>把 PE 并到 N 上之后：漏的那部分电流顺着 PE 又流回了零线，
      两边一减还是零 —— 漏电保护永远不动作。</b>
      <span class="sub">而灯照亮、插座照用、设备外壳也确实接着地，
      <b>从表面上什么都看不出来</b>，直到有人摸到漏电的外壳。
      这就是为什么书上把「必须分设两块端子板」写成硬要求，
      而不是「建议分开」。</span>
    </div>
  </div>
</section>

<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">1、3 进，2、4 出</div>
    单相电能表底下四个接线端子，书上给了一条口诀：
    <b>「1、3 进，2、4 出」</b>。<b>拖动看四根线各接哪个端子。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">正确接法</button>
        <button class="btn sm" data-k="1">进出接反</button>
        <button class="btn sm" data-k="2">相零接反</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这么接</div><div class="v" id="s3a">对</div></div>
        <div class="num"><div class="k">表转不转</div><div class="v" id="s3b">正常</div></div>
        <div class="num hi"><div class="k">有什么<br>后果</div><div class="v" id="s3c">没事</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">四个端子（国标接法）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>端子</th><th>接什么</th><th>去哪</th></tr></thead>
      <tbody>
        <tr><td class="eu-s"><b>1</b></td><td class="rd">相线　<b>进</b></td><td>从入户线来</td></tr>
        <tr><td class="eu-s"><b>2</b></td><td class="rd">相线　<b>出</b></td><td>去用户总断路器</td></tr>
        <tr><td class="eu-s"><b>3</b></td><td>零线　<b>进</b></td><td>从入户线来</td></tr>
        <tr><td class="eu-s"><b>4</b></td><td>零线　<b>出</b></td><td>去用户总断路器</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>现场只认一条规矩：以表盖内侧印的接线图为准。</b>
      <span class="sub">「1、3 进，2、4 出」是书上加粗写的原则，也是最常见的排法；
      但不同厂家、不同表型（三相表、互感器接入式）端子定义并不一样，
      <b>每块表的接线图都印在表盖内侧或端子盖上</b>。
      装之前掀开看一眼，比背任何口诀都可靠 —— 这跟 4.5 讲的
      「接线看编号不看位置」是同一条思路。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">选表：最大额定电流要大于总断路器（书 P145）</div>
    书上原话：<b>选用电能表的最大额定电流要大于总断路器的额定电流</b>；
    按用电负荷计算，可选 <b>15(60) A</b> 的规格。
    <div class="tip info">
      <b>括号外 15 A 是标定电流，括号里 60 A 是最大电流。</b>
      <span class="sub">总断路器 32 A ＜ 表的最大 60 A，所以这块表配得住 ——
      <b>顺序不能反</b>：要是表的最大电流比断路器还小，
      断路器还没跳，表先烧了。选型的通则也是这条：
      <b>越往上游，允许通过的电流越大</b>。</span>
    </div>
  </div>
</section>

<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">左零右相，还有一整套线色</div>
    配电盘里的断路器都装好之后，书上给了接线的规矩：
    <b>按「左零右相」原则连接</b>，而且<b>导线要按顺序有条理地放置，
    不可随意缠绕在一起</b>。<b>点四条规矩各看一遍。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">左零右相</button>
        <button class="btn sm" data-k="1">线色</button>
        <button class="btn sm" data-k="2">有条理</button>
        <button class="btn sm" data-k="3">贴标签</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这一条</div><div class="v" id="s4a">左零右相</div></div>
        <div class="num"><div class="k">出处</div><div class="v" id="s4b">书 P152</div></div>
        <div class="num hi"><div class="k">不照做<br>会怎样</div><div class="v" id="s4c">下次难查</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">整个工程的线色，书上统一定死了（P146 原文）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>线</th><th>颜色</th><th>什么时候用</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">L1</td><td><b>黄</b></td><td rowspan="3">三相供电</td></tr>
        <tr><td class="eu-s">L2</td><td><b>绿</b></td></tr>
        <tr><td class="eu-s">L3</td><td><b>红</b></td></tr>
        <tr><td class="eu-s">相线</td><td><b>红</b></td><td>单相供电</td></tr>
        <tr><td class="eu-s">N 零线</td><td><b>蓝</b></td><td>都是蓝</td></tr>
        <tr><td class="eu-s">PE 地线</td><td><b>黄绿双色</b></td><td>只有它能用这个色</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>黄绿双色是 PE 的专用色，任何别的线都不许用它。</b>
      <span class="sub">这一条是全世界通行的（4.2 讲文字符号时也提过：
      颜色代号 <b>GNYE</b> 就是 PE 专用）。
      反过来说：<b>在箱里看到一根黄绿线接在别的地方，那一定是接错了</b>，
      不用再想别的可能。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st good">最后那一步：在护盖下面写清楚哪一路管什么</div>
    书上装配电盘的最后一句：将绝缘护盖装到箱体上，
    <b>并在护盖下部标记各支路控制功能的名称</b>，
    方便用户操作、控制和后期维修、维护。
    <div class="tip info">
      <b>这是整节里最省事、也最容易被跳过的一步。</b>
      <span class="sub">没标签的配电盘，下次跳闸时得一路一路试；
      标了的话，用户自己就能合上那一路。
      这跟 8.1 屏 2 讲的「三级配电、跳哪一级就知道是谁的事」是一套 ——
      <b>标签是把这套结构写给下一个人看的</b>，那个人可能是三年后的你。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="8.2">
    <div class="qz" data-q="书上对配电盘提了一条结构性的硬要求，是什么？"
      data-opts="必须用冷轧钢板|盘内必须分设 N 线端子板和 PE 线端子板|必须装在离地 1.9 m 处"
      data-right="1"
      data-why="书上原话：配电盘内必须分设 N 线端子板和 PE 线端子板。这是硬要求不是建议——N 和 PE 一旦并到一起，漏电的电流会顺着 PE 流回零线，两边一减还是零，漏电保护永远不动作。而灯照亮、插座照用，表面上完全看不出问题。（冷轧钢板 1.5 mm 那条说的是配电箱箱体；1.9 m 是配电盘的安装高度，都不是这一条。）"></div>
    <div class="qz" data-q="配电盘里，普通照明支路的断路器该选哪种？"
      data-opts="三相断路器|双进双出的|单进单出的（10 A）即可"
      data-right="2"
      data-why="书上原话：支路断路器选用单进单出的（10 A）即可。单进单出只断相线，断掉相线灯就灭了，够用。总闸和需要漏电保护的支路（如卫生间）才必须双进双出——检修时要把零线也断开，漏电保护本身也要同时检测两根线的电流差。三相断路器是总配电箱用的。"></div>
    <div class="qz" data-q="单相电能表的接线原则「1、3 进，2、4 出」，具体是哪根线接哪个端子？"
      data-opts="1 相线进、2 相线出、3 零线进、4 零线出|1 零线进、2 零线出、3 相线进、4 相线出|随便接，只要进出分开"
      data-right="0"
      data-why="1 相线进、2 相线出、3 零线进、4 零线出——这是国标的排法。不过现场只认一条规矩：以表盖内侧印的接线图为准。不同厂家、不同表型（三相表、互感器接入式）端子定义并不一样，装之前掀开看一眼比背口诀可靠，这跟 4.5 讲的「接线看编号不看位置」是同一条思路。"></div>
    <div class="qz" data-q="在配电箱里看到一根黄绿双色的线接在某个支路断路器的出线端上。该怎么判断？"
      data-opts="可能是这一路的零线，看具体接法|一定接错了——黄绿双色是 PE 地线的专用色，任何别的线都不许用|正常，颜色只是习惯"
      data-right="1"
      data-why="一定接错了。黄绿双色是 PE 的专用色，全世界通行（4.2 讲文字符号时那个颜色代号 GNYE 就是它）。零线是蓝色，相线是红/黄/绿。所以在箱里看到黄绿线接在 PE 端子板以外的任何地方，不用再想别的可能——那就是接错了，而且是最危险的那类错，因为它意味着有一根本该不带电的线现在带电了。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 8 章 8.2 节（书内 P143~P153）</div>
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
/* 断路器模块：DIN 导轨上那种小方块，上下各一个接线端 */
function mcb(g, x, y, w, h, o){
  o = o || {};
  box(g, x, y, w, h, 3, o.fill || P.cream, o.line || P.creamD, 1.2);
  box(g, x + 2, y + 4, w - 4, 8, 1.5, P.steel, P.steelD, 0.8);
  box(g, x + 2, y + h - 12, w - 4, 8, 1.5, P.steel, P.steelD, 0.8);
  /* 手柄 */
  box(g, x + w/2 - 4, y + h/2 - 7, 8, 14, 2, o.hd || P.bakelite, P.steelDD, 0.9);
  if(o.label) txt(g, o.label, x + w/2, y + h + 10, {sz:7.5, c:C.tx3});
}
/* 端子板：一排接线柱 */
function busbar(g, x, y, w, h, n, col, label){
  box(g, x, y, w, h, 3, C.card, col, 1.5);
  for(let i = 0; i < n; i++){
    const cx = x + w*(i + 0.5)/n;
    box(g, cx - 4, y + 3, 8, h - 6, 1.5, P.steel, P.steelD, 0.8);
  }
  if(label) txt(g, label, x + w/2, y - 9, {sz:9, b:1, c:col});
}

/* ================================================================
   场景 1：柜、箱、盘
   ================================================================
   三个画在同一位置换着看（差别才跳得出来），
   尺寸从大到小、里面的东西从粗到细 —— 这本身就是「一级管一级」的样子 */
const KBP = [
  {n:'配电柜', where:'一楼／配电间', scope:'整栋楼', main:'三相',
   w:150, h:180, rows:3},
  {n:'配电箱', where:'楼道／楼层',   scope:'一层／一户', main:'双进双出',
   w:126, h:120, rows:2},
  {n:'配电盘', where:'你家进门',     scope:'家里各支路', main:'双进双出 32 A',
   w:150, h:86, rows:1}
];
const S1 = { k:0 };
function draw1(){
  const g = st1.g; st1.clear();
  const k = S1.k, d = KBP[k];
  EP.heading(g, 14, 20, d.n, d.where);

  const cx = 180, cy = 126;
  const x0 = cx - d.w/2, y0 = cy - d.h/2;
  box(g, x0, y0, d.w, d.h, 5, C.box, C.boxLine, 1.6);
  /* 门缝 */
  g.save(); g.strokeStyle = C.boxLine; g.lineWidth = 1;
  g.beginPath(); g.moveTo(cx, y0 + 4); g.lineTo(cx, y0 + d.h - 4); g.stroke(); g.restore();

  if(k === 0){
    /* 柜：三相母线 + 几组三相断路器 */
    [0,1,2].forEach(function(j){
      seg(g, [[x0 + 12, y0 + 20 + j*7],[x0 + d.w - 12, y0 + 20 + j*7]],
          ['#e8b93c','#4fc04a','#ff6b6b'][j], 2);
    });
    txt(g, '三相母线', cx, y0 + 52, {sz:8, c:C.tx3});
    [0,1,2].forEach(function(j){
      mcb(g, x0 + 16 + j*44, y0 + 66, 32, 54, {});
    });
    txt(g, '三相断路器', cx, y0 + 134, {sz:8.5, b:1, c:C.acc});
  } else if(k === 1){
    box(g, x0 + 12, y0 + 12, 44, 32, 3, C.card, C.boxLine, 1);
    txt(g, 'Wh', x0 + 34, y0 + 28, {sz:9, b:1, c:C.tx2});
    txt(g, '电能表', x0 + 34, y0 + 54, {sz:8, c:C.tx3});
    mcb(g, x0 + 76, y0 + 12, 34, 46, {label:'总闸'});
    txt(g, '每户一表一闸', cx, y0 + d.h - 16, {sz:8.5, b:1, c:C.acc});
  } else {
    mcb(g, x0 + 10, y0 + 14, 24, 44, {label:'总'});
    for(let j = 0; j < 5; j++) mcb(g, x0 + 44 + j*20, y0 + 14, 16, 44, {});
    txt(g, '总闸 ＋ 各支路', cx + 14, y0 + d.h - 12, {sz:8.5, b:1, c:C.acc});
  }
  hot(g, cx, cy, 0, {w:d.w + 16, h:d.h + 16, r:9});

  conc(g, 236, 'acc', d.n + '　装在' + d.where, '管的范围：' + d.scope);
}
function note1(){
  const d = KBP[S1.k];
  $('s1a').textContent = d.where.split('／')[0];
  $('s1b').textContent = d.scope;
  $('s1c').textContent = d.main;
  const T = [
    ['配电柜：整栋楼的源头',
     '一楼或专门的配电间里那个一人多高的柜子。8.1 屏 4 三种楼的图里，' +
     '干线都是从它出发的。' +
     '<hr>里面是<b>三相母线</b>和几组<b>三相断路器</b> —— 书上原话：' +
     '<b>总配电箱中的断路器应选用三相断路器</b>。' +
     '<hr><b>它一跳，整栋楼黑。</b>所以它的保护整定值必须比下面各级都大，' +
     '这就是 8.1 讲过的分级整定：<b>上级大、下级小，才有选择性</b>。'],
    ['配电箱：楼道里或楼层上',
     '楼道总配电箱里是<b>三相电能表 ＋ 带漏电保护的总断路器</b>；' +
     '楼层配电箱里是<b>每户一块单相电能表 ＋ 该户的总断路器</b>。' +
     '<hr>书上对箱体提了三条硬要求（下面那张表）：' +
     '<b>要有产品合格证和耐压检测证明</b>、' +
     '<b>冷轧钢板或阻燃绝缘材料、钢板厚度不小于 1.5 mm</b>、' +
     '<b>连接部位和器件要做防锈处理</b>。' +
     '<hr>装楼层箱还有一条很具体的：<b>电能表卡槽要靠近箱门的观察窗</b>' +
     '（预付费表要插卡），必要时<b>在底板上加木条把表垫出来</b>。'],
    ['配电盘：你家进门那一块',
     '书上给的定义：<b>配电盘是集中、切换、分配电能的设备</b>，' +
     '应<b>具有一定的机械强度和耐压能力</b>。' +
     '安装高度<b>距地面 1.9 m 左右</b>。' +
     '<hr>里面是<b>一只总断路器 ＋ 一排支路断路器</b>，' +
     '外加<b>两块端子板（N 和 PE）</b>—— 那两块是下一屏整屏要讲的东西，' +
     '也是书上对配电盘唯一一条结构性的硬要求。' +
     '<hr><b>这一级是你唯一能自己动的</b>（表后归你），' +
     '也是家里出问题时第一个该打开看的地方。']
  ][S1.k];
  $('n0').innerHTML = '<div class="st">' + T[0] + '</div>' + T[1];
}

/* ================================================================
   场景 2：N 端子板和 PE 端子板
   ================================================================
   三档：分开接（对）／并到一起（错）／人碰到外壳。
   **第三档才是这一屏的落点** —— 前两档只是摆出结构，
   要等有人碰到外壳，那个「看不出来的错」才显出后果 */
const S2 = { k:0 };
const NB = [56, 176], PB = [214, 176];       /* 两块端子板的 x, y */
function draw2(){
  const g = st2.g; st2.clear();
  const k = S2.k;
  EP.heading(g, 14, 20, k === 1 ? 'N 和 PE 并到一起' : (k === 2 ? '有人碰到外壳' : 'N 和 PE 分开'),
             k === 0 ? '书上的硬要求' : (k === 1 ? '看不出来的错' : '后果'));

  /* 总断路器 */
  mcb(g, 150, 46, 40, 50, {});
  txt(g, '总断路器', 198, 62, {sz:8.5, b:1, c:C.tx3, al:'left'});
  seg(g, [[160, 40],[160, 46]], C.L, 2.2);
  seg(g, [[180, 40],[180, 46]], C.N, 2.2);
  txt(g, 'L', 160, 32, {sz:8.5, b:1, c:C.L});
  txt(g, 'N', 180, 32, {sz:8.5, b:1, c:C.N});

  /* 两块端子板 */
  busbar(g, NB[0], NB[1], 92, 22, 4, C.N, 'N 线端子板');
  busbar(g, PB[0], PB[1], 92, 22, 4, C.PE, 'PE 线端子板');

  /* 一路支路 + 一台设备 */
  mcb(g, 60, 100, 30, 42, {});
  txt(g, '支路', 75, 92, {sz:8.5, b:1, c:C.tx3});
  seg(g, [[160, 96],[160, 116],[90, 116]], C.L, 2);
  seg(g, [[180, 96],[180, 130],[102, 130],[102, 176]], C.N, 2);

  /* 设备：外壳 + PE */
  box(g, 254, 96, 62, 48, 4, C.box, C.boxLine, 1.4);
  txt(g, '设备', 285, 120, {sz:9, b:1, c:C.tx2});
  seg(g, [[75, 142],[75, 158],[250, 158],[250, 120]], C.L, 2);
  seg(g, [[286, 144],[286, 176]], C.PE, 2.2);
  txt(g, 'PE', 300, 160, {sz:8, b:1, c:C.PE, al:'left'});

  if(k >= 1){
    /* 错接：一根线把两块板并起来 */
    seg(g, [[148, 187],[214, 187]], C.err, 2.6);
    EP.chip(g, '这一根不该有', 181, 204, {sz:9, b:1, c:C.err});
  }
  if(k === 2){
    /* 设备漏电，人碰外壳 */
    g.save(); g.strokeStyle = C.err; g.lineWidth = 2; g.setLineDash([4,3]);
    g.beginPath(); g.moveTo(262, 108); g.lineTo(276, 122); g.stroke(); g.restore();
    EP.chip(g, '绝缘破损', 268, 88, {sz:8.5, b:1, c:C.err});
    const h = EP.handFlat(g, 330, 120, true, {s:0.5});
    seg(g, [[316, 120],[322, 120]], C.err, 2);
    EP.chip(g, '外壳带电', 300, 66, {sz:9, b:1, c:C.err});
  }

  const CC = [
    ['ok', 'N 和 PE 各接各的端子板', '书上原话：配电盘内必须分设 N 线端子板和 PE 线端子板'],
    ['err', '并起来之后，一切照常工作', '灯照亮、插座照用 —— 这正是它危险的地方'],
    ['err', '漏电保护不会动作，外壳一直带电', '漏走的电流顺着 PE 回到零线，两边一减还是零']
  ][k];
  conc(g, 224, CC[0], CC[1], CC[2]);
}
function note2(){
  $('s2a').textContent = ['分开','并了','并了'][S2.k];
  $('s2b').textContent = ['能','不能','不能'][S2.k];
  $('s2c').textContent = ['看不出','看不出','出事才知道'][S2.k];
  const T = [
    ['分开接：书上唯一那条结构性硬要求',
     '书上对配电盘的要求里，只有这一条是关于<b>结构</b>的：' +
     '<b>配电盘内必须分设 N 线端子板和 PE 线端子板。</b>' +
     '<hr>两块板长得一模一样，都是一排铜接线柱。' +
     '分别在于<b>它们连到哪儿</b>：N 端子板往上接总断路器的零线出线端，' +
     'PE 端子板往上接进户的那根地线（8.1 屏 2 里 <b>BV-1×35</b> 那根）。' +
     '<hr><b>平时 N 上有电流，PE 上一点电流都没有</b> ——' +
     '这是它俩最根本的区别，也是下一档要出事的原因。'],
    ['并到一起：装完那一刻什么毛病都没有',
     '把一根线把两块端子板连起来（或者干脆把 PE 线接到 N 板上），' +
     '<b>整个盘照常工作</b>：灯亮、插座有电、设备外壳也确实接着地。' +
     '验收时拿万用表量、拿验电笔点，<b>全都正常</b>。' +
     '<hr><b>这就是它危险的地方 —— 它不是一个「会报错」的错。</b>' +
     '书上把这一条写成硬要求而不是建议，正因为它在现场发现不了：' +
     '要么装的时候就分开，要么可能一直错到出事。' +
     '<hr>那么它到底坏在哪？<b>点第三档看后果。</b>'],
    ['出事的时候：漏电保护一动不动',
     '设备内部绝缘破损，相线碰到了金属外壳。' +
     '<b>正常情况下</b>：漏走的电流从 PE 线流回配电盘的 PE 端子板、' +
     '再流回进户地线，<b>而它不经过总断路器里的漏电检测</b> ——' +
     '进去的电流和回来的电流对不上了，<b>漏电保护立刻跳闸</b>。' +
     '<hr><b>并到一起之后</b>：漏走的电流顺着 PE 走到 N 板上，' +
     '又变成零线电流流了回去。<b>进去多少、回来多少，一分不差</b> ——' +
     '漏电保护认为一切正常，<b>一动不动</b>。' +
     '<hr><b>结果就是外壳一直带着电，等着人去摸。</b>' +
     '3.5 那节讲过验电笔为什么会亮：人站在地上就是一条回路。' +
     '这时候摸上去，人体就是唯一那条没被短接掉的路径。']
  ][S2.k];
  $('n1').innerHTML = '<div class="st' + (S2.k ? ' bad' : ' good') + '">' + T[0] + '</div>' + T[1];
}

/* ================================================================
   场景 3：电能表 1、3 进 2、4 出
   ================================================================
   表画在中间，四个端子在底部一排；左边入户线、右边去总断路器。
   三档：正确／进出接反／相零接反 —— **后两档都要说清「表还转不转」**，
   因为「装完看表在转」是最常见的误判 */
const S3 = { k:0 };
const TX = [96, 264];                        /* 表体 x 范围 */
const TERM = [126, 166, 206, 246];           /* 四个端子的 x */
const TY = 148;                              /* 端子 y */
function draw3(){
  const g = st3.g; st3.clear();
  const k = S3.k;
  EP.heading(g, 14, 20, '单相电能表', ['1、3 进，2、4 出', '进出接反了', '相线零线接反了'][k]);

  /* 表体 */
  box(g, TX[0], 52, TX[1]-TX[0], 96, 6, C.box, C.boxLine, 1.6);
  box(g, TX[0] + 22, 66, 124, 30, 4, '#0f2318', '#2f6b45', 1.2);
  txt(g, '0 0 0 2 4 . 6', 180, 81, {sz:12, b:1, c:'#4fe08a'});
  txt(g, 'kW·h', 236, 104, {sz:8, c:C.tx3});
  txt(g, '15(60) A', 128, 104, {sz:8.5, b:1, c:C.tx3});
  box(g, TX[1] - 34, 60, 24, 34, 3, C.card, C.boxLine, 1);
  txt(g, '卡', TX[1] - 22, 77, {sz:8.5, b:1, c:C.tx2});

  /* 端子盒 */
  box(g, TX[0] + 14, TY - 14, 140, 28, 3, C.card, C.boxLine, 1.3);
  TERM.forEach(function(x, i){
    box(g, x - 8, TY - 10, 16, 20, 2, P.steel, P.steelD, 1);
    /* 编号画在端子块**里面**：放下方会被从端子引出去的导线盖住（截图抓到的） */
    txt(g, String(i+1), x, TY, {sz:9, b:1, c:P.bakelite});
  });

  /* 接线：k=0 正确 / k=1 进出反 / k=2 相零反 */
  const inL  = k === 2 ? TERM[2] : TERM[0];   /* 相线进 */
  const inN  = k === 2 ? TERM[0] : TERM[2];   /* 零线进 */
  const outL = k === 1 ? TERM[0] : TERM[1];
  const outN = k === 1 ? TERM[2] : TERM[3];
  const yIn = 208, yOut = 236;
  if(k === 1){
    /* 进出接反：入户接到 2、4，出线接到 1、3 */
    seg(g, [[30, yIn],[TERM[1], yIn],[TERM[1], TY + 10]], C.L, 2.4);
    seg(g, [[30, yOut],[TERM[3], yOut],[TERM[3], TY + 10]], C.N, 2.4);
    seg(g, [[TERM[0], TY + 10],[TERM[0], yIn + 14],[330, yIn + 14]], C.L, 2.4);
    seg(g, [[TERM[2], TY + 10],[TERM[2], yOut + 14],[330, yOut + 14]], C.N, 2.4);
  } else {
    seg(g, [[30, yIn],[inL, yIn],[inL, TY + 10]], C.L, 2.4);
    seg(g, [[30, yOut],[inN, yOut],[inN, TY + 10]], C.N, 2.4);
    seg(g, [[outL, TY + 10],[outL, yIn + 14],[330, yIn + 14]], C.L, 2.4);
    seg(g, [[outN, TY + 10],[outN, yOut + 14],[330, yOut + 14]], C.N, 2.4);
  }
  txt(g, '入户线', 26, yIn - 12, {sz:9, b:1, c:C.tx3, al:'left'});
  txt(g, '去总断路器', 334, yOut + 26, {sz:9, b:1, c:C.tx3, al:'right'});

  if(k) EP.chip(g, ['','进出反了','相零反了'][k], 300, 118, {sz:9, b:1, c:C.err});

  const CC = [
    ['ok', '1 相线进　2 相线出　3 零线进　4 零线出', '书上原话：按「1、3 进，2、4 出」的接线原则'],
    ['err', '表照样转、电照样有 —— 但计量方向反了', '有的电子表会报「反向」，有的干脆不计费'],
    ['err', '相线零线互换：表转，可开关断的却是零线', '灯座、插座常带电 —— 和 7.1 屏 4 第三种接错一模一样']
  ][k];
  conc(g, 268, CC[0], CC[1], CC[2]);
}
function note3(){
  $('s3a').textContent = ['对','错','错'][S3.k];
  $('s3b').textContent = ['正常','转','转'][S3.k];
  $('s3c').textContent = ['没事','计量出错','灯座带电'][S3.k];
  const T = [
    ['1、3 进，2、4 出',
     '书 P148 的原文就是这一句：<b>按照「1、3 进，2、4 出」的接线原则，' +
     '将电能表第 1、3 接线端子分别连接入户线的相线和零线</b>，' +
     '第 2、4 端子接到用户总断路器上。' +
     '<hr>展开就是：<b>1 相线进、2 相线出、3 零线进、4 零线出</b> ——' +
     '奇数进、偶数出，前两个是相线、后两个是零线。' +
     '<hr><b>现场只认一条规矩：以表盖内侧印的接线图为准。</b>' +
     '不同厂家、不同表型（三相表、互感器接入式）端子定义并不一样，' +
     '掀开表盖看一眼比背口诀可靠 ——' +
     '这跟 4.5 讲的<b>「接线看编号不看位置」</b>是同一条思路。'],
    ['进出接反：表转，但方向不对',
     '入户线接到了 2、4，出线接到了 1、3。' +
     '<hr><b>电路上完全通</b>：电照样过表、照样送到用户那边，' +
     '<b>灯亮、插座有电、表也在走字</b>。' +
     '<hr>问题出在<b>计量</b>上：电能表是有方向的，它按「从进端流向出端」计费。' +
     '接反之后，机械表会倒转（老式表），' +
     '<b>电子表一般会报「反向」或者干脆不计费</b>。' +
     '<hr><b>这是「装完看表在转就以为对了」最典型的翻车方式。</b>' +
     '验收要看的不是表转不转，是<b>端子编号和表盖上的图对不对得上</b>。'],
    ['相零接反：最危险的那一种',
     '相线接到了本该接零线的端子上（1 和 3 互换）。' +
     '<hr>表照样转、电照样有 —— <b>但整个下游的相线和零线全反了</b>。' +
     '于是<b>用户总断路器和所有支路断路器断的都是零线</b>，' +
     '相线一路带电到底：<b>关掉开关，灯座里那根舌簧仍然是 220 V。</b>' +
     '<hr><b>这和 7.1 屏 4 讲的第三种接错是一模一样的后果</b>，' +
     '只是这次错在表这一级，影响的是整户。' +
     '<hr><b>查法也一样</b>：关掉开关，拿验电笔点灯座（或插座的 L 孔）——' +
     '还亮就是接反了。3.5 那节讲过，这一步只要几秒钟。']
  ][S3.k];
  $('n2').innerHTML = '<div class="st' + (S3.k ? ' bad' : ' good') + '">' + T[0] + '</div>' + T[1];
}

/* ================================================================
   场景 4：左零右相 + 线色 + 有条理 + 贴标签
   ================================================================ */
const S4 = { k:0 };
function draw4(){
  const g = st4.g; st4.clear();
  const k = S4.k;
  EP.heading(g, 14, 20, ['左零右相','线色','有条理','贴标签'][k],
             ['书 P152 原则','整个工程统一','不可随意缠绕','护盖下部'][k]);

  /* 配电盘轮廓 */
  box(g, 26, 46, 308, 148, 6, C.box, C.boxLine, 1.6);
  /* 总断路器 + 五个支路 */
  /* 这一屏的 label 会被下面画的导线盖住，不传 */
  mcb(g, 44, 66, 28, 48, {});
  for(let j = 0; j < 5; j++) mcb(g, 92 + j*44, 66, 30, 48, {});
  /* 零线端子板（左）和相线母线（右）—— 「左零右相」 */
  if(k === 0){
    busbar(g, 44, 140, 72, 20, 4, C.N, '');
    txt(g, '零线端子板　左', 80, 172, {sz:9, b:1, c:C.N});
    seg(g, [[240, 140],[318, 140]], C.L, 3);
    txt(g, '相线　右', 280, 172, {sz:9, b:1, c:C.L});
    [0,1,2,3,4].forEach(function(j){
      seg(g, [[107 + j*44, 114],[107 + j*44, 130],[80, 130],[80, 140]], C.N, 1.6);
      seg(g, [[97 + j*44, 114],[97 + j*44, 124],[280, 124],[280, 140]], C.L, 1.6);
    });
  } else if(k === 1){
    /* 线色一览 */
    const CL = [['L1','#e8b93c'],['L2','#4fc04a'],['L3','#ff6b6b'],
                ['N', C.N],['PE', null]];
    CL.forEach(function(c, i){
      const y = 132 + 0;
      const x = 46 + i*60;
      if(c[1]) { g.save(); g.strokeStyle = c[1]; g.lineWidth = 7; g.lineCap = 'round';
        g.beginPath(); g.moveTo(x, y); g.lineTo(x + 42, y); g.stroke(); g.restore(); }
      else {
        /* PE 黄绿双色：两段交替 */
        g.save(); g.lineWidth = 7; g.lineCap = 'butt';
        for(let t = 0; t < 6; t++){
          g.strokeStyle = t % 2 ? '#4fc04a' : '#e8b93c';
          g.beginPath(); g.moveTo(x + t*7, y); g.lineTo(x + t*7 + 7, y); g.stroke();
        }
        g.restore();
      }
      txt(g, c[0], x + 21, y + 18, {sz:9, b:1, c:C.tx2});
    });
    txt(g, '黄绿双色是 PE 专用，别的线一律不许用', 180, 176, {sz:9, b:1, c:C.warn});
  } else if(k === 2){
    /* 左边：缠成一团；右边：有条理 */
    g.save(); g.strokeStyle = C.err; g.lineWidth = 2;
    for(let t = 0; t < 7; t++){
      g.beginPath();
      g.moveTo(56 + t*4, 128);
      g.bezierCurveTo(110 - t*6, 150 + t*3, 60 + t*8, 172 - t*2, 150, 150 + (t%3)*6);
      g.stroke();
    }
    g.restore();
    EP.chip(g, '随意缠绕　✗', 104, 182, {sz:9, b:1, c:C.err});
    g.save(); g.strokeStyle = C.ok; g.lineWidth = 2; g.lineJoin = 'round';
    for(let t = 0; t < 5; t++){
      g.beginPath();
      g.moveTo(200 + t*22, 122); g.lineTo(200 + t*22, 140 + t*5); g.lineTo(316, 140 + t*5);
      g.stroke();
    }
    g.restore();
    EP.chip(g, '按顺序放置　✓', 262, 182, {sz:9, b:1, c:C.ok});
  } else {
    /* 护盖 + 标签 */
    box(g, 36, 122, 288, 46, 4, C.card, C.boxLine, 1.4);
    ['照明','插座','厨房','卫生间','空调'].forEach(function(s, j){
      box(g, 46 + j*57, 130, 48, 14, 2, C.box, C.boxLine, 1);
      txt(g, s, 70 + j*57, 155, {sz:8.5, b:1, c:C.acc});
    });
    txt(g, '绝缘护盖　＋　各支路的名称', 180, 180, {sz:9, b:1, c:C.acc});
  }

  const CC = [
    ['acc', '零线在左，相线在右', '书上原话：按照「左零右相」原则连接供电线路'],
    ['acc', '整个工程线色统一', 'L1黄 L2绿 L3红　N蓝　PE黄绿　单相相线红'],
    ['ok', '按顺序有条理地放置导线', '书上原话：不可随意将导线缠绕在一起'],
    ['ok', '在护盖下部标记各支路控制功能的名称', '方便用户操作、控制和后期维修、维护']
  ][k];
  conc(g, 202, CC[0], CC[1], CC[2]);
}
function note4(){
  $('s4a').textContent = ['左零右相','线色','有条理','贴标签'][S4.k];
  $('s4b').textContent = ['书 P152','书 P146','图 8-21','图 8-21'][S4.k];
  $('s4c').textContent = ['下次难查','认错线','下次难查','要一路路试'][S4.k];
  const T = [
    ['左零右相：一条让下一个人能看懂的约定',
     '书上装配电盘那一段的原话：断路器全部安装完成后，' +
     '<b>按照「左零右相」原则连接供电线路</b>。' +
     '<hr><b>这条规矩本身不影响电路能不能用</b> —— 反着接照样亮。' +
     '它管的是<b>可读性</b>：所有配电盘都按同一个方向排，' +
     '任何一个电工打开箱门，<b>不用量就知道哪一排是零线</b>。' +
     '<hr>这跟 4.5 讲的端子编号、8.1 讲的线色是一类东西：' +
     '<b>约定的价值在于所有人都守。</b>' +
     '你自己家那一盘反着接，下次来修的人就得多花十分钟、还可能判断错。'],
    ['线色：整个工程必须统一',
     '书 P146 原话：<b>整个工程中相线、零线线缆的颜色应统一</b>，' +
     '相线 <b>L1 黄、L2 绿、L3 红</b>，零线 <b>N 蓝</b>，地线 <b>PE 黄绿</b>；' +
     '<b>单相供电中的相线为红色，零线依然为蓝色</b>。' +
     '<hr><b>黄绿双色是 PE 的专用色，任何别的线都不许用它。</b>' +
     '4.2 讲文字符号时提过颜色代号：<b>GNYE</b> 就是它。' +
     '<hr>所以在箱里看到一根黄绿线接在 PE 端子板以外的地方，' +
     '<b>不用再想别的可能 —— 那就是接错了</b>，' +
     '而且是最危险的那类：一根本该不带电的线现在带电了。'],
    ['有条理：不是为了好看',
     '书上原话（图 8-21 ②的注）：<b>连接导线时，应按顺序有条理地放置导线，' +
     '不可随意将导线缠绕在一起。</b>' +
     '<hr><b>三个实打实的理由：</b>' +
     '① 缠成一团的线，<b>查故障时根本追不出哪根接哪儿</b>，' +
     '要一根根拽着找；' +
     '② 线挤在一起<b>散热差</b>，长期发热会加速绝缘老化；' +
     '③ 关箱门时挤压到线，<b>绝缘破损了你也看不见</b>。' +
     '<hr>做法很简单：<b>零线走一侧、相线走另一侧（左零右相）</b>，' +
     '同类的线并排走、拐直角、用扎带固定。'],
    ['贴标签：把这套结构写给下一个人',
     '书上装配电盘的最后一句：将绝缘护盖装到箱体上，' +
     '<b>并在护盖下部标记各支路控制功能的名称</b>，' +
     '方便用户操作、控制和后期维修、维护。' +
     '<hr><b>这是整节里最省事、也最容易被跳过的一步。</b>' +
     '没标签的配电盘，下次跳闸时得一路一路试着合；' +
     '标了的话，用户自己就能合上那一路，都不用叫人。' +
     '<hr>往深里说：8.1 屏 2 讲的「三级配电、跳哪一级就知道是谁的事」，' +
     '前提是<b>你知道每一路管什么</b>。' +
     '<b>标签就是把这套结构写下来给下一个人看</b> —— ' +
     '那个人可能是三年后的你自己。']
  ][S4.k];
  $('n3').innerHTML = '<div class="st">' + T[0] + '</div>' + T[1];
}

/* ================================================================
   舞台、事件、收尾
   ================================================================ */
const st1 = new Stage('cv0', 360, 276);
const st2 = new Stage('cv1', 360, 264);
const st3 = new Stage('cv2', 360, 308);
const st4 = new Stage('cv3', 360, 242);

['s1k','s2k','s3k','s4k'].forEach(function(id, n){
  document.getElementById(id).addEventListener('click', function(e){
    const b = e.target.closest('.btn'); if(!b) return;
    const v = +b.dataset.k;
    [S1, S2, S3, S4][n].k = v;
    document.querySelectorAll('#' + id + ' .btn').forEach(function(x){
      x.classList.toggle('on', +x.dataset.k === v);
    });
    [note1, note2, note3, note4][n]();
    [draw1, draw2, draw3, draw4][n]();
  });
});

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会重设尺寸并清空。**四屏全是静态的，必须在这儿逐个补画** */
  draw1(); draw2(); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:8, sec:'8.2'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('8.2');
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
