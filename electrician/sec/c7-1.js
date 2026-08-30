/* 7.1 一个灯，几个地方控 —— 本节内容的唯一真相。
   对应《零基础学电工》第 7 章 7.1 节（书内 P121~P125）。

   **这一章书上 15 页，只做两节。** 7.1 讲控制关系，7.2 讲怎么装。
   书上另外那大半（开关安装 10 步、吸顶灯 10 步、LED 灯 11 步、路灯安装）
   全是实物照片流程 —— 打孔、敲膨胀管、扣卡子、拧螺钉，**网页给不了手上的活**
   （和第 3 章跳过 3.1~3.4、第 6 章开头声明的是同一条规矩）。
   书上的卫生间门控（CD4013）和路灯 NE555 光控是电子板子的活，坏了整块换，
   低压电工不修它，只在文案里点一句。

   四屏：① 一开单控 ② 双控（两地）③ 多控（三地及以上）④ 三种接错

   **这一节的眼**：单控开关做的是「通 / 断」，双控开关做的是「换路」。
   一路上不管串进来几个换向开关，每按一次就是**翻转一次** ——
   所以任何一个开关都能改变灯的状态。这一句把三屏串起来了。

   书上的出处（别凭记忆改）：
   - 图 7-1：照明控制线路主要由**照明灯具、控制开关和基本电子元器件**构成；
     控制开关闭合时照明灯具亮，断开时熄灭（书 P121）
   - 图 7-2：异地联控照明控制线路 —— 两只双控开关 SA1、SA3 加一只
     **双控联动开关 SA2**（SA2-1 / SA2-2 两组触点联动），
     「合上断路器 QF，接通交流 220V 电源，照明灯 EL 未点亮时，
     **按下任意开关都可点亮照明灯 EL**」（书 P122）
   - 书 P125：一般卧室要求**在进门和床头都能控制**照明灯，这种线路应设计成
     **两地控制**；客厅一般设有两盏或多盏照明灯，一般设计成**三方控制**线路，
     分别在进门、主卧室门外侧、次卧室门外侧进行控制
   - 图 7-6 照明线路类型设计要求：**一开单控**、**二开单控**（一块面板两个开关
     控两盏灯）、**一开双控**，文字标识都是 **S 或 SA**
   - 图 7-9（书 P127）：预留供电引线的**相线**连接一开单控开关的入线端，
     出线端连接照明灯具预留供电引线的相线；**零线不经过开关**
     （不与开关内接线端子进行任何连接），**直接在接线盒内连接**

   **一处如实标注**：多控开关（中途开关）在图上的标准画法是**两组联动的转换触点**，
   书上画成 SA2-1 / SA2-2 两组。这一节屏 3 画的就是这两组联动触点，
   只是把「直通 / 交叉」这个作用直接标了出来 —— 两种说法是同一件事。
   端子标识（L / L1 / L2 还是 COM / 1 / 2）各厂家印法不同，
   文案里说死了「以面板上印的为准」，不编一条统一规则。 */
(function(){
'use strict';
ELEC.reg({
  id: '7.1',
  file: 'c7-1.html',
  title: '7.1 一个灯，几个地方控',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>单控</button>
    <button class="tab" data-i="1"><span class="n">2</span>双控·两地</button>
    <button class="tab" data-i="2"><span class="n">3</span>多控·三地</button>
    <button class="tab" data-i="3"><span class="n">4</span>三种接错</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">最基本的一路：开关串在相线上</div>
    一条照明回路只有三样东西：<b>开关、灯、两根线</b>。简单到几乎没什么好讲的 ——
    除了一条铁律：<b>开关必须串在相线上，零线不进开关，直接连到灯。</b>
    <b>点画布上的开关，或者点墙上那块面板。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">一开单控</button>
        <button class="btn sm" data-k="1">二开单控</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">开关</div><div class="v" id="s1a">断开</div></div>
        <div class="num"><div class="k">灯</div><div class="v" id="s1b">灭</div></div>
        <div class="num hi"><div class="k">开关几个端子</div><div class="v" id="s1c">2 个</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">书上图 7-6：三种最常见的照明线路</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>叫法</th><th>面板上</th><th>管什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">一开单控</td><td>一个键</td><td>一个地方控一盏灯</td></tr>
        <tr><td class="eu-s">二开单控</td><td>两个键</td><td>一个地方分别控<b>两盏</b>灯</td></tr>
        <tr><td class="eu-s">一开双控</td><td>一个键</td><td><b>两个地方</b>控同一盏灯（下一屏）</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>文字符号都是 S 或 SA。</b>
      <span class="sub">图上区分不出「一开」还是「二开」—— 那是面板的规格，
      看的是<b>图上画了几个开关符号、每个后面挂着哪盏灯</b>。
      二开单控在原理图上就是两条各自独立的支路，共用进来的那一根相线。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">这一屏真正要记住的只有两句</div>
    <b>① 开关断相线。</b>接反了灯照样能开能关，但关掉之后<b>灯座仍然带 220 V</b> ——
    换灯泡的人手一碰就是触电。这条 4.1 屏 3 已经讲过一遍了，这里再钉一次。
    <hr>
    <b>② 零线不进开关。</b>零线从配电箱直接连到灯，中途在接线盒里接好，
    <b>不跟开关里的任何一个端子发生关系</b>（书上图 7-9 的原话）。
    所以开关盒里只会出现<b>两个线头</b>：一根相线进来、一根开关线出去到灯。
    <div class="tip">
      <b>螺口灯座还有一条：螺纹壳接零线，中心那个舌簧接开关来的相线。</b>
      <span class="sub">这是通行规范的做法，书上这一节没写。道理是一样的 ——
      拧灯泡的时候手先碰到的是螺纹那一圈，那一圈必须是零。</span>
    </div>
  </div>

  <div class="bet" data-bet="c71-single" data-q="一个单控开关盒里，应该有几个线头？"
       data-opts="3 个：相线、零线、开关线|2 个：相线进来、开关线出去到灯|4 个，还要加地线"
       data-right="1"
       data-after="2 个。零线不进开关，它从配电箱直接连到灯，在接线盒里接好就行。开关只干一件事：把相线断开或接通。要是你打开开关盒发现里面有一根蓝色的零线还接在开关端子上，那就是接错了 —— 除非那是双控的联络线（下一屏）。"></div>
</section>

<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">进门一个、床头一个，两个都管用</div>
    书上说得很实在：<b>卧室要求在进门和床头都能控制照明灯</b>，这就得用两地控制。
    做法是把两个单控开关换成<b>双控开关</b>，中间拉<b>两根联络线</b>。
    <b>点任意一个开关看通路怎么变。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2b">
        <button class="btn sm" data-w="a">拨 SA1（进门那个）</button>
        <button class="btn sm" data-w="b">拨 SA2（床头那个）</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">SA1 接在</div><div class="v" id="s2a">上联络线</div></div>
        <div class="num"><div class="k">SA2 接在</div><div class="v" id="s2c">上联络线</div></div>
        <div class="num hi"><div class="k">灯</div><div class="v" id="s2d">亮</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">双控开关：三个端子，一进两出</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>端子</th><th>常见印法</th><th>接什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">公共端</td><td><b>L</b> 或 COM 或 C</td>
          <td>SA1 接<b>相线</b>；SA2 接<b>去灯</b>的那根</td></tr>
        <tr><td class="eu-s">换向端</td><td><b>L1</b>、<b>L2</b>（也有印 1、2 的）</td>
          <td>两根<b>联络线</b>，两个开关之间对接</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>各家印法不一样，以面板背面印的为准。</b>
      <span class="sub">拿不准哪个是公共端，就用万用表通断档量：
      <b>拨到一边响、拨到另一边不响</b>的那一对里，
      <b>两次都参与</b>的那个端子就是公共端（3.6b 讲的通断档，这儿正好用上）。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st good">四种组合，一张表看完</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>SA1</th><th>SA2</th><th>灯</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">上</td><td>上</td><td><b>亮</b></td></tr>
        <tr><td class="eu-s">上</td><td>下</td><td>灭</td></tr>
        <tr><td class="eu-s">下</td><td>上</td><td>灭</td></tr>
        <tr><td class="eu-s">下</td><td>下</td><td><b>亮</b></td></tr>
      </tbody>
    </table></div>
    <b>两个拨到同一边就亮，一上一下就灭。</b>
    所以<b>不存在「开」的位置</b> —— 双控开关的键往上往下都可能是亮的，
    取决于另一个在哪儿。装完之后两个面板的方向对不齐是正常的，不是装反了。
  </div>

  <div class="bet" data-bet="c71-two" data-q="双控开关跟单控开关，本质差别在哪？"
       data-opts="双控能承受更大电流|单控做的是「通/断」，双控做的是「换路」——它其实一直是通的，只是通向哪根线在变|双控里面多了一个继电器"
       data-right="1"
       data-after="换路。双控开关（单刀双掷）的公共端永远接着其中一个换向端，从来不会「断开」。它切换的是电流走上面那根联络线还是下面那根。真正决定灯亮不亮的，是两头选的是不是同一根。想通这一句，多控开关就不用再单独理解一遍了。"></div>
</section>

<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">三个地方控一盏灯：中间那个叫多控</div>
    书上讲客厅时说要<b>三方控制</b>：进门、主卧门外、次卧门外各一个。
    两头仍然是双控开关，<b>中间加一只多控开关（也叫中途开关、双控联动开关）</b>。
    它内部是<b>两组联动的换向触点</b>，作用只有一个：让穿过它的两根联络线
    <b>直通</b>或者<b>交叉</b>。<b>点三个开关里的任意一个。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3b">
        <button class="btn sm" data-w="a">拨 SA1</button>
        <button class="btn sm" data-w="m">拨 SA2（多控）</button>
        <button class="btn sm" data-w="b">拨 SA3</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">多控开关</div><div class="v" id="s3a">直通</div></div>
        <div class="num"><div class="k">一共翻转了</div><div class="v" id="s3c">0 次</div></div>
        <div class="num hi"><div class="k">灯</div><div class="v" id="s3d">亮</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st good">整节课的一句话：每个开关都只做「翻转」</div>
    从相线出发数到灯，路上每经过一个开关，它要么<b>保持</b>、要么<b>换到另一根</b>。
    <b>拨一下 = 翻转一次。</b>所以：
    <div class="tip info" style="margin-top:8px">
      <b>翻转了偶数次 → 回到原来那根 → 通 → 灯亮；奇数次 → 灯灭。</b>
      <span class="sub">这就是为什么<b>不管中间串了几个多控开关，任意一个都能控灯</b> ——
      每一个都能把奇偶翻过来。要几个地方控，就在中间串几个多控开关，
      两头永远是两个双控开关。</span>
    </div>
    <b>四地控制</b>就是两头双控 ＋ 中间两个多控，<b>五地</b>就是中间三个，以此类推。
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">多控开关长什么样：四个端子</div>
    两个<b>进</b>、两个<b>出</b>，两根联络线从它身上穿过去。面板上看起来跟双控开关
    一模一样（都是一个键），<b>差别在背面的端子数：双控三个，多控四个</b>。
    <div class="tip">
      <b>买错了是最常见的返工原因。</b>
      <span class="sub">三地控制要买<b>两个双控 ＋ 一个多控</b>，
      买成三个双控是接不出来的。购物页面上多控常被写成
      「中途开关」「双控联动开关」「一开多控」，认端子数最保险。</span>
    </div>
  </div>

  <div class="bet" data-bet="c71-multi" data-q="要在四个地方都能控同一盏灯，怎么配开关？"
       data-opts="四个双控开关|两个双控（放两头）＋ 两个多控（放中间）|一个双控 ＋ 三个多控"
       data-right="1"
       data-after="两头双控、中间全是多控。相线只从一头进、只从另一头出去到灯，这两头必须是「一进两出」的双控；中间每一个都是「两进两出」，必须是多控。所以 N 个地方控一盏灯 = 2 个双控 + (N−2) 个多控。"></div>
</section>

<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">接错了灯照样会亮 —— 这才是危险的地方</div>
    双控的三个端子认错一个，线路往往<b>还能用</b>，只是行为变得莫名其妙，
    或者埋着一个要命的隐患。下面三种是现场最常见的，<b>点按钮切换，再拨开关看结果</b>。
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">① 少接一根</button>
        <button class="btn sm" data-k="1">② 零线进开关</button>
        <button class="btn sm" data-k="2">③ 开关接零线</button>
      </div>
      <div class="btns" id="s4b">
        <button class="btn sm" data-w="a">拨 SA1</button>
        <button class="btn sm" data-w="b">拨 SA2</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">SA1 / SA2</div><div class="v" id="s4a">上 / 上</div></div>
        <div class="num"><div class="k">灯</div><div class="v" id="s4c">亮</div></div>
        <div class="num hi"><div class="k">后果</div><div class="v" id="s4d">正常</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">装之前先数线：盒子里该有几根</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>哪个盒</th><th>单控</th><th>双控</th><th>三地</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">第一个开关盒</td><td>2</td><td><b>3</b></td><td><b>3</b></td></tr>
        <tr><td class="eu-s">中间开关盒</td><td>—</td><td>—</td><td><b>4</b></td></tr>
        <tr><td class="eu-s">末端开关盒</td><td>—</td><td><b>3</b></td><td><b>3</b></td></tr>
        <tr><td class="eu-s">灯位盒</td><td>2</td><td>2</td><td>2</td></tr>
      </tbody>
    </table></div>
    <b>关键是两个开关盒之间那两根联络线。</b>装修埋管的时候只穿了一根，
    双控就做不了 —— 这是事后想改双控最常见的拦路虎，只能重新穿线。
    <div class="tip">
      <b>灯位那 2 根不含 PE。</b>
      <span class="sub">灯具有金属外壳的话还要一根 PE（黄绿双色）单独接到外壳上，
      所以灯位盒实际是 3 根。PE 不进开关，和零线一样。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">书上另外那两个电路，知道有就行</div>
    书上这一节还画了<b>卫生间门控灯</b>（磁控开关 ＋ CD4013 双 D 触发器 ＋ 双向晶闸管）和
    <b>路灯光控</b>（光敏电阻 MG ＋ NE555 时基电路）两张电子电路图。
    <div class="tip info">
      <b>这两块板子不用会修。</b>
      <span class="sub">它们是成品控制模块，现场坏了整块换，
      电工要做的是<b>判断到底是模块坏了还是供电/灯坏了</b> ——
      量模块进线端有没有 220 V、量输出端在触发时有没有电压，
      这两下都是 3.6a 教过的。真要修板子是电子维修的活，不是低压电工的活。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="c7-1">
    <div class="qz" data-q="单控开关必须串在哪根线上？"
         data-opts="零线|相线|哪根都行，能断开就行"
         data-right="1"
         data-why="相线。串在零线上灯一样能开能关，但关掉之后灯座和整个灯具仍然连着相线、带着 220 V，换灯泡的人一碰就触电。零线不进开关，从配电箱直接接到灯。"></div>
    <div class="qz" data-q="双控开关的公共端接什么？"
         data-opts="两个都接联络线|靠电源那一侧的接相线，靠灯那一侧的接去灯的线，两个换向端之间用两根联络线对接|随便接，三个端子是等价的"
         data-right="1"
         data-why="公共端是「一进两出」里的那个「一」。SA1 的公共端接相线，SA2 的公共端接去灯的线，两个开关的 L1 对 L1、L2 对 L2 用两根联络线连起来。三个端子不等价 —— 公共端认错了，两地控制就变成了「两个都得拨对才亮」。"></div>
    <div class="qz" data-q="相线进 SA1 公共端、零线进 SA2 公共端、灯接在两根联络线中间。这样接会怎样？"
         data-opts="完全正常，是双控的另一种接法|两个开关拨到不同边时灯亮，拨到同一边时相线和零线直接碰上——短路跳闸|灯永远不亮"
         data-right="1"
         data-why="四种组合里有两种是直接短路。拨到不同边时灯确实会亮，所以装的时候可能觉得没问题；一旦两个拨到同一边，那根联络线上一头是相线一头是零线，等于把 220 V 直接短接，当场跳闸。零线绝不能进开关，这条在双控上和在单控上是同一条。"></div>
    <div class="qz" data-q="要在五个地方控同一盏灯，开关怎么配？"
         data-opts="五个双控开关|两个双控 ＋ 三个多控|一个双控 ＋ 四个多控"
         data-right="1"
         data-why="两头必须是双控（三个端子，一进两出），中间每一个都是多控（四个端子，两进两出）。N 个地方 = 2 个双控 + (N−2) 个多控，所以五地是 2 + 3。面板上看不出双控和多控的区别，认背面端子数：三个是双控，四个是多控。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 7 章 7.1 节（书内 P121~P125）<br>书上的门控、光控电子电路只作了解；这一节讲的是现场每天都要接的那几种</div>
</section>`,

  init: function(EC){
'use strict';
const {C, Path, Stage, txt, tw, box, tag, hot, dots, glow, loop, $} = EC;
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

/* ================================================================
   共用的小零件
   ================================================================ */
function dot(g, x, y, c, r){
  g.save(); g.fillStyle = c || C.wire;
  g.beginPath(); g.arc(x, y, r || 3, 0, Math.PI*2); g.fill(); g.restore();
}
function seg(g, pts, c, lw){ new Path(pts).stroke(g, lw || 2.2, c || C.wire); }

/* 单极开关（竖着）：上面是动触点的支点，下面是静触点的横杠。
   **合上也要留 4px 斜度** —— 画成笔直的就跟导线重合，一眼看不出这儿有个开关 */
function swV(g, x, y0, y1, on, c){
  const col = c || C.wire;
  g.save(); g.strokeStyle = col; g.lineWidth = 2.6; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x - 6, y1); g.lineTo(x + 7, y1); g.stroke();   /* 静触点横杠 */
  g.beginPath(); g.moveTo(x, y0);
  if(on) g.lineTo(x + 4, y1 - 1);
  else { const L = y1 - y0; g.lineTo(x + Math.sin(0.62)*L, y0 + Math.cos(0.62)*L); }
  g.stroke(); g.restore();
  dot(g, x, y0, col, 2.8);
}

/* 单刀双掷（双控开关）：一个支点 + 两个静触点横杠。
   dir 由 支点/触点 的左右关系自己算出来，SA1 和 SA2 是镜像的 */
function spdt(g, px, py, cx, yT, yB, sel, c){
  const col = c || C.wire, dir = cx > px ? 1 : -1;
  g.save(); g.strokeStyle = col; g.lineWidth = 2.4; g.lineCap = 'round';
  [yT, yB].forEach(function(y){
    g.beginPath(); g.moveTo(cx - dir*5, y); g.lineTo(cx + dir*7, y); g.stroke();
  });
  g.lineWidth = 2.8;
  g.beginPath(); g.moveTo(px, py); g.lineTo(cx - dir*1.5, sel ? yB : yT); g.stroke();
  g.restore();
  dot(g, px, py, col, 2.8);
}

/* 多控（中途）开关：两组**联动**的换向触点，虚线是机械连杆。
   直通 = 上接上、下接下；交叉 = 上接下、下接上（两条动触点在图上真的交叉） */
function xover(g, xi, xo, yT, yB, crossed, c){
  const col = c || C.wire;
  box(g, xi - 16, yT - 20, (xo - xi) + 32, (yB - yT) + 40, 7, C.box, C.boxLine, 1.2);
  g.save(); g.strokeStyle = col; g.lineWidth = 2.4; g.lineCap = 'round';
  [yT, yB].forEach(function(y){
    g.beginPath(); g.moveTo(xo - 5, y); g.lineTo(xo + 7, y); g.stroke();
  });
  g.lineWidth = 2.8;
  g.beginPath(); g.moveTo(xi, yT); g.lineTo(xo - 1.5, crossed ? yB : yT); g.stroke();
  g.beginPath(); g.moveTo(xi, yB); g.lineTo(xo - 1.5, crossed ? yT : yB); g.stroke();
  g.restore();
  dot(g, xi, yT, col, 2.8); dot(g, xi, yB, col, 2.8);
  /* 机械连杆：两条动触点中点之间的虚线 */
  const mx = (xi + xo) / 2;
  g.save(); g.setLineDash([3,3]); g.strokeStyle = C.tx3; g.lineWidth = 1.2;
  g.beginPath(); g.moveTo(mx, (yT + (crossed ? yB : yT))/2); g.lineTo(mx, (yB + (crossed ? yT : yB))/2);
  g.stroke(); g.restore();
}

/* 结论条：四种语气共用一个函数 */
const CONC = { ok:['okbg','ok'], err:['errbg','err'], warn:['warnbg','warn'], acc:['accbg','acc'] };
function conc(g, y, kind, l1, l2){
  const m = CONC[kind] || CONC.acc;
  box(g, 16, y, 328, 34, 6, C[m[0]], C[m[1]], 1);
  txt(g, l1, 180, y + 13, {sz:10.5, b:1, c:C[m[1]]});
  txt(g, l2, 180, y + 26, {sz:9, c:C.tx2});
}

/* ================================================================
   场景 1：一开单控 / 二开单控
   ================================================================
   三段颜色是这一屏的全部立论：**红（相线）到开关为止，
   灰（开关线）从开关到灯，蓝（零线）从灯直接回配电箱**。
   零线那根从头到尾没碰过开关 —— 这就是书上图 7-9 说的那句话 */
const S1 = { k:0, on:[false, false] };
const A_LY = 66, A_NY = 206, A_BX = 26;
const A_SY0 = 98, A_SY1 = 130, A_LAMP = 164, A_LR = 16;
const A_BR = [[204], [156, 268]];

function draw1(t){
  const g = st1.g; st1.clear();
  EP.heading(g, 14, 20, S1.k ? '二开单控' : '一开单控',
             S1.k ? '一块面板两个键，各管一盏灯' : '一个开关控一盏灯');

  const br = A_BR[S1.k], RX = br[br.length - 1];
  /* 两条母线 */
  EP.wire(g, new Path([[A_BX, A_LY],[RX, A_LY]]), {c:'red'});
  EP.wire(g, new Path([[A_BX, A_NY],[RX, A_NY]]), {c:'blue'});
  dot(g, A_BX, A_LY, C.L, 3.4); dot(g, A_BX, A_NY, C.N, 3.4);
  txt(g, 'L 相线', A_BX + 8, A_LY - 13, {sz:9.5, b:1, c:C.L, al:'left'});
  txt(g, 'N 零线', A_BX + 8, A_NY - 13, {sz:9.5, b:1, c:C.N, al:'left'});

  br.forEach(function(bx, i){
    const on = S1.on[i];
    /* 相线段：母线 → 开关支点（红） */
    seg(g, [[bx, A_LY],[bx, A_SY0]], C.L, 2.4);
    if(br.length > 1 || true) dot(g, bx, A_LY, C.L, 3.2);
    /* 开关 */
    swV(g, bx, A_SY0, A_SY1, on);
    /* 开关线段：开关 → 灯（中灰） */
    seg(g, [[bx, A_SY1],[bx, A_LAMP - A_LR]], C.wire, 2.4);
    /* 灯 → 零线母线（蓝） */
    seg(g, [[bx, A_LAMP + A_LR],[bx, A_NY]], C.N, 2.4);
    dot(g, bx, A_NY, C.N, 3.2);
  });

  /* 通电的支路：整条回路发光 + 流动圆点 */
  br.forEach(function(bx, i){
    if(!S1.on[i]) return;
    const p = new Path([[A_BX, A_LY],[bx, A_LY],[bx, A_NY],[A_BX, A_NY]]);
    dots(g, p, {gap:30, r:3, color:C.cur, phase:t * 46,
                skip:[[ (bx - A_BX) + (A_LAMP - A_LR - A_LY), (bx - A_BX) + (A_LAMP + A_LR - A_LY) ]]});
  });

  /* 灯与标注（灯是填充圆，必须画在导线和圆点之上） */
  br.forEach(function(bx, i){
    EC.lamp(g, bx, A_LAMP, A_LR, S1.on[i] ? 1 : 0);
    hot(g, bx + 2, (A_SY0 + A_SY1)/2, 0, {w:34, h:44, r:8});
    txt(g, 'SA' + (br.length > 1 ? (i+1) : ''), bx - 13, (A_SY0 + A_SY1)/2,
        {sz:10, b:1, c:C.tx2, al:'right'});
    txt(g, 'EL' + (br.length > 1 ? (i+1) : ''), bx + A_LR + 6, A_LAMP,
        {sz:10, b:1, c:C.tx2, al:'left'});
  });
  txt(g, '开关线', A_BR[S1.k][0] - 13, A_SY1 + 14, {sz:8.5, c:C.tx3, al:'right'});

  /* 墙上那块面板：图形符号 ↔ 实物，书上图 7-6 就是这么并排给的 */
  wallPanel(g, 52, 96, 48, 50, S1.k ? 2 : 1);
  g.save(); g.setLineDash([3,3]); g.strokeStyle = C.tx3; g.lineWidth = 1.1;
  g.beginPath(); g.moveTo(100, 118); g.lineTo(br[0] - 30, 112); g.stroke(); g.restore();
  txt(g, '墙上的样子', 76, 158, {sz:8.5, c:C.tx3});

  const anyOn = S1.on.slice(0, br.length).some(function(v){ return v; });
  conc(g, 230, anyOn ? 'ok' : 'acc',
       anyOn ? '开关合上：相线接通，灯亮' : '开关断开：相线断在开关这儿，灯灭',
       '零线（蓝）从头到尾没进过开关 —— 它直接从配电箱连到灯');
}
/* 86 型面板：白色底板 + 一或两个键。**不按状态改颜色** ——
   规范里写死了「开关状态只靠机械结构表达，禁止红＝断绿＝合」，
   这块面板画的是「墙上是个什么东西」，不承担状态 */
function wallPanel(g, x, y, w, h, keys){
  box(g, x, y, w, h, 6, P.cream, P.creamD, 1.2);
  const kw = keys === 1 ? 22 : 15, gap = keys === 1 ? 0 : 4;
  const total = keys*kw + (keys-1)*gap, x0 = x + (w - total)/2;
  for(let i=0;i<keys;i++){
    const kx = x0 + i*(kw+gap);
    box(g, kx, y + 9, kw, h - 18, 3, P.creamD, P.steelD, 0.9);
    g.save(); g.globalAlpha = 0.5;
    box(g, kx + 1.5, y + 10.5, kw - 3, (h - 18)/2 - 2, 2, '#ffffff', null, 0);
    g.restore();
  }
}
function note1(){
  const br = A_BR[S1.k], anyOn = S1.on.slice(0, br.length).some(function(v){ return v; });
  $('s1a').textContent = S1.k ? (S1.on[0] ? '合' : '断') + ' / ' + (S1.on[1] ? '合' : '断')
                              : (S1.on[0] ? '闭合' : '断开');
  $('s1b').textContent = S1.k ? (S1.on[0] ? '亮' : '灭') + ' / ' + (S1.on[1] ? '亮' : '灭')
                              : (S1.on[0] ? '亮' : '灭');
  $('s1c').textContent = '2 个';
  let h = '';
  if(S1.k === 0){
    h = '<div class="st">一根线进、一根线出，中间是一对触点</div>' +
      '<b>单控开关只有两个端子</b>：入线端接进来的相线，出线端接去灯的那根（叫<b>开关线</b>）。' +
      '合上就通、断开就断，它做的事只有「通 / 断」两个字。' +
      '<span class="sub">下一屏那个双控开关有三个端子，做的事完全不是这一件 —— ' +
      '它从来不断开，只是把电换到另一根线上去。</span>' +
      '<hr><b>看颜色：红的那一段到开关为止。</b>' +
      '开关断开时，<b>红线（相线）一直带电到开关的入线端</b>，' +
      '出线端往后到灯这一整段是不带电的。这正是「开关必须断相线」的全部意义。';
  }else{
    h = '<div class="st">二开单控＝两条各自独立的支路</div>' +
      '两个键共用<b>进来的那一根相线</b>（图上母线那一段），各自往下走一条支路、' +
      '各管一盏灯。所以<b>开关盒里有三个线头</b>：一根相线进来、两根开关线出去。' +
      '<span class="sub">面板背面通常有一个「桥接片」把两个键的入线端连起来，' +
      '相线只接一处就够了。拆下来的旧面板如果没有桥接片，就得自己短接一根。</span>' +
      '<hr><b>两盏灯互不影响</b> —— 这是并联（1.4 讲过的）。' +
      '要是接成串联，两盏灯会一起亮、一起暗，而且都亮不到额定亮度。';
  }
  $('n0').innerHTML = h;
}

/* ================================================================
   场景 2：双控（两地控制）
   ================================================================
   **不通的时候也要画出「电到了哪儿」**：SA1 选中的那根联络线一直是带电的，
   电走到 SA2 那个没被选中的静触点就为止了。
   光画个「断」字看不出这一层，而这一层正是双控的原理 */
const B = { BX:24, PY:108, YT:76, YB:140, NY:216,
            P1:92, C1:128, C2:216, P2:252, LX:306, LAMP:170, LR:16 };
const S2 = { a:0, b:0 };
function on2(){ return S2.a === S2.b; }

function draw2(t){
  const g = st2.g; st2.clear();
  EP.heading(g, 14, 20, '一开双控 · 两地控制', '进门一个、床头一个');
  const ya = S2.a ? B.YB : B.YT;
  const on = on2();

  /* 相线进 SA1 公共端、SA2 公共端出去到灯、灯回零线 */
  EP.wire(g, new Path([[B.BX, B.PY],[B.P1, B.PY]]), {c:'red'});
  seg(g, [[B.C1, B.YT],[B.C2, B.YT]], C.wire, 2.2);
  seg(g, [[B.C1, B.YB],[B.C2, B.YB]], C.wire, 2.2);
  seg(g, [[B.P2, B.PY],[B.LX, B.PY]], C.wire, 2.2);
  seg(g, [[B.LX, B.PY],[B.LX, B.LAMP - B.LR]], C.wire, 2.2);
  EP.wire(g, new Path([[B.LX, B.LAMP + B.LR],[B.LX, B.NY],[B.BX, B.NY]]), {c:'blue'});
  dot(g, B.BX, B.PY, C.L, 3.4); dot(g, B.BX, B.NY, C.N, 3.4);
  txt(g, 'L 相线', B.BX + 8, B.PY - 13, {sz:9.5, b:1, c:C.L, al:'left'});
  txt(g, 'N 零线', B.BX + 8, B.NY - 13, {sz:9.5, b:1, c:C.N, al:'left'});

  spdt(g, B.P1, B.PY, B.C1, B.YT, B.YB, S2.a);
  spdt(g, B.P2, B.PY, B.C2, B.YT, B.YB, S2.b);

  /* 带电到哪儿 */
  const live = on
    ? new Path([[B.BX,B.PY],[B.P1,B.PY],[B.C1,ya],[B.C2,ya],[B.P2,B.PY],
                [B.LX,B.PY],[B.LX,B.NY],[B.BX,B.NY]])
    : new Path([[B.BX,B.PY],[B.P1,B.PY],[B.C1,ya],[B.C2,ya]]);
  if(!on) glow(g, live, C.warn);
  if(on){
    const sLampTop = live.len - ((B.NY - B.LAMP - B.LR) + (B.LX - B.BX));
    dots(g, live, {gap:30, r:3, color:C.cur, phase:t*46,
                   skip:[[sLampTop, sLampTop + B.LR*2]]});
  }

  EC.lamp(g, B.LX, B.LAMP, B.LR, on ? 1 : 0);
  txt(g, 'EL', B.LX + B.LR + 6, B.LAMP, {sz:10, b:1, c:C.tx2, al:'left'});
  txt(g, '联络线 1', (B.C1 + B.C2)/2, B.YT - 12, {sz:9, c:C.tx3});
  txt(g, '联络线 2', (B.C1 + B.C2)/2, B.YB + 13, {sz:9, c:C.tx3});
  txt(g, 'SA1', 84, 158, {sz:10, b:1, c:C.tx2});
  txt(g, 'SA2', 262, 158, {sz:10, b:1, c:C.tx2});
  hot(g, (B.P1 + B.C1)/2, B.PY + 2, 0, {w:52, h:80, r:8});
  hot(g, (B.P2 + B.C2)/2, B.PY + 2, 0, {w:52, h:80, r:8});
  if(!on) EP.chip(g, '电到这儿为止', B.C2 + 12, ya, {sz:8.5, b:1, c:C.warn, al:'left'});

  conc(g, 228, on ? 'ok' : 'acc',
       on ? '两个都选了同一根联络线 → 通' : '一个选上、一个选下 → 那根线带电，但走不到灯',
       '双控开关从来不「断开」，它只是把电换到另一根线上');
}
function note2(){
  $('s2a').textContent = S2.a ? '下联络线' : '上联络线';
  $('s2c').textContent = S2.b ? '下联络线' : '上联络线';
  $('s2d').textContent = on2() ? '亮' : '灭';
  let h = '<div class="st">' + (on2() ? '通了：两头选的是同一根' : '断了：两头选的不是同一根') + '</div>';
  if(on2()){
    h += '电从相线进 <b>SA1 的公共端</b>，走' + (S2.a ? '下' : '上') +
      '联络线到 <b>SA2</b>，SA2 也正好选着' + (S2.a ? '下' : '上') +
      '联络线，于是接到公共端、送去灯 —— 回路闭合。' +
      '<span class="sub">现在<b>随便拨哪一个</b>都会断开：' +
      '拨 SA1 就换到另一根，拨 SA2 也换到另一根，两头就对不上了。</span>';
  }else{
    h += '电从相线进 SA1，走' + (S2.a ? '下' : '上') + '联络线，' +
      '<b>一直带电到 SA2 那个没被选中的静触点</b>就为止了 —— ' +
      'SA2 现在选的是另一根。<b>断点不在开关里，在两头「选的不是同一根」这件事上。</b>' +
      '<span class="sub">注意那根联络线现在是<b>带电的</b>。' +
      '检修拆开关盒时，两根联络线里必有一根可能带电，不能因为「开关是关的」就当它没电 —— ' +
      '还是那句话：断开断路器、验电、再动手。</span>';
  }
  $('n1').innerHTML = h;
}

/* ================================================================
   场景 3：多控（三地及以上）
   ================================================================ */
const M = { BX:20, PY:112, YT:84, YB:140, NY:218,
            P1:68, C1:100, MI:140, MO:196, C3:236, P3:272, LX:316, LAMP:172, LR:15 };
const S3 = { a:0, m:0, b:0 };
function on3(){ return (S3.a + S3.m + S3.b) % 2 === 0; }

function draw3(t){
  const g = st3.g; st3.clear();
  EP.heading(g, 14, 20, '三地控制', '两头双控 ＋ 中间多控');
  const ya = S3.a ? M.YB : M.YT, r = S3.a ^ S3.m, yr = r ? M.YB : M.YT;
  const on = on3();

  EP.wire(g, new Path([[M.BX, M.PY],[M.P1, M.PY]]), {c:'red'});
  seg(g, [[M.C1, M.YT],[M.MI, M.YT]], C.wire, 2.2);
  seg(g, [[M.C1, M.YB],[M.MI, M.YB]], C.wire, 2.2);
  seg(g, [[M.MO, M.YT],[M.C3, M.YT]], C.wire, 2.2);
  seg(g, [[M.MO, M.YB],[M.C3, M.YB]], C.wire, 2.2);
  seg(g, [[M.P3, M.PY],[M.LX, M.PY],[M.LX, M.LAMP - M.LR]], C.wire, 2.2);
  EP.wire(g, new Path([[M.LX, M.LAMP + M.LR],[M.LX, M.NY],[M.BX, M.NY]]), {c:'blue'});
  dot(g, M.BX, M.PY, C.L, 3.4); dot(g, M.BX, M.NY, C.N, 3.4);
  txt(g, 'L', M.BX + 7, M.PY - 13, {sz:9.5, b:1, c:C.L, al:'left'});
  txt(g, 'N', M.BX + 7, M.NY - 13, {sz:9.5, b:1, c:C.N, al:'left'});

  xover(g, M.MI, M.MO, M.YT, M.YB, !!S3.m);
  spdt(g, M.P1, M.PY, M.C1, M.YT, M.YB, S3.a);
  spdt(g, M.P3, M.PY, M.C3, M.YT, M.YB, S3.b);

  const live = on
    ? new Path([[M.BX,M.PY],[M.P1,M.PY],[M.C1,ya],[M.MI,ya],[M.MO,yr],[M.C3,yr],
                [M.P3,M.PY],[M.LX,M.PY],[M.LX,M.NY],[M.BX,M.NY]])
    : new Path([[M.BX,M.PY],[M.P1,M.PY],[M.C1,ya],[M.MI,ya],[M.MO,yr],[M.C3,yr]]);
  if(!on) glow(g, live, C.warn);
  if(on){
    const sLampTop = live.len - ((M.NY - M.LAMP - M.LR) + (M.LX - M.BX));
    dots(g, live, {gap:30, r:3, color:C.cur, phase:t*46,
                   skip:[[sLampTop, sLampTop + M.LR*2]]});
  }

  EC.lamp(g, M.LX, M.LAMP, M.LR, on ? 1 : 0);
  txt(g, 'EL', M.LX + M.LR + 6, M.LAMP, {sz:10, b:1, c:C.tx2, al:'left'});
  txt(g, 'SA1', 60, 158, {sz:10, b:1, c:C.tx2});
  txt(g, 'SA3', 282, 158, {sz:10, b:1, c:C.tx2});
  txt(g, 'SA2 多控 · ' + (S3.m ? '交叉' : '直通'), (M.MI + M.MO)/2, M.YB + 34,
      {sz:9.5, b:1, c:S3.m ? C.acc : C.tx2});
  hot(g, (M.P1 + M.C1)/2, M.PY - 2, 0, {w:48, h:80, r:8});
  hot(g, (M.MI + M.MO)/2, M.PY, 0, {w:84, h:84, r:8});
  hot(g, (M.P3 + M.C3)/2, M.PY - 2, 0, {w:48, h:80, r:8});
  if(!on) EP.chip(g, '走到这儿为止', M.C3 + 10, yr, {sz:8.5, b:1, c:C.warn, al:'left'});

  const n = S3.a + S3.m + S3.b;
  conc(g, 232, on ? 'ok' : 'acc',
       '翻转了 ' + n + ' 次 —— ' + (on ? '偶数，回到原来那根，灯亮' : '奇数，换到了另一根，灯灭'),
       '拨任意一个开关都会让次数 ±1，奇偶一变，灯就跟着变');
}
function note3(){
  const n = S3.a + S3.m + S3.b;
  $('s3a').textContent = S3.m ? '交叉' : '直通';
  $('s3c').textContent = n + ' 次';
  $('s3d').textContent = on3() ? '亮' : '灭';
  let h = '<div class="st">' + (on3() ? '通：翻转了偶数次' : '断：翻转了奇数次') + '</div>' +
    '把这条路想成一根线，从相线出发数到灯。每经过一个开关，它要么<b>保持</b>、' +
    '要么<b>换到另一根</b>。<b>拨一下就是翻转一次。</b>现在一共翻了 <b>' + n + '</b> 次，' +
    (on3() ? '偶数次相当于没换，两头对得上，灯亮。' : '奇数次等于换到了另一根，两头对不上，灯灭。');
  if(S3.m){
    h += '<hr><b>中间这只多控开关现在是「交叉」</b>：从左边进来走上面那根的，' +
      '出去变成下面那根。它内部是<b>两组联动的换向触点</b>（图上那两条动触点真的交叉了），' +
      '虚线是把它俩连在一起的机械连杆 —— 一个键同时扳动两组。';
  }else{
    h += '<hr><b>中间这只多控开关现在是「直通」</b>：上进上出、下进下出，' +
      '相当于它不在那儿。<b>再拨一下就变成交叉。</b>';
  }
  h += '<span class="sub">书上那张图 7-2 把它写成「双控联动开关 SA2」，' +
    '画成 SA2-1 和 SA2-2 两组触点 —— 说的就是这两组联动触点，和这里是同一件事。</span>';
  $('n2').innerHTML = h;
}

/* ================================================================
   场景 4：三种接错
   ================================================================
   三种全画在**同一个双控骨架**上，只改接线 —— 差别才跳得出来。
   共同点是这一屏的落点：**接错了灯照样会亮**，
   所以「装完试了一下灯能亮」根本不能说明接对了 */
const S4 = { k:0, a:0, b:0 };
function res4(){
  if(S4.k === 0) return { on: (S4.a === 0 && S4.b === 0), short:false };
  if(S4.k === 1) return { on: (S4.a !== S4.b), short: (S4.a === S4.b) };
  return { on: (S4.a === S4.b), short:false };
}
function cross(g, x, y, r, c){
  g.save(); g.strokeStyle = c || C.err; g.lineWidth = 2.6; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x-r, y-r); g.lineTo(x+r, y+r);
  g.moveTo(x+r, y-r); g.lineTo(x-r, y+r); g.stroke(); g.restore();
}
const GAP0 = 166, GAP1 = 182;          /* 屏 4 ① 断在这一段 */
const K1LX = 172;                      /* 屏 4 ② 灯挂在两根联络线中间 */

function draw4(t){
  const g = st4.g; st4.clear();
  const TT = ['① 公共端认错 / 少接一根联络线', '② 零线进了另一个开关', '③ 开关接在零线上'];
  const TS = ['下面那根联络线没接上', '灯挂在两根联络线中间', '相线不经过开关，直通到灯'];
  EP.heading(g, 14, 20, TT[S4.k], TS[S4.k]);
  const ya = S4.a ? B.YB : B.YT, R = res4();
  /* ③ 把两条母线的角色对调 —— 这就是「开关接在零线上」 */
  const topRed = S4.k !== 2;
  const topC = topRed ? 'red' : 'blue', botC = topRed ? 'blue' : 'red';
  const topK = topRed ? C.L : C.N, botK = topRed ? C.N : C.L;

  EP.wire(g, new Path([[B.BX, B.PY],[B.P1, B.PY]]), {c:topC});
  dot(g, B.BX, B.PY, topK, 3.4);
  txt(g, topRed ? 'L 相线' : 'N 零线', B.BX + 8, B.PY - 13, {sz:9.5, b:1, c:topK, al:'left'});

  /* 两根联络线 */
  seg(g, [[B.C1, B.YT],[B.C2, B.YT]], C.wire, 2.2);
  if(S4.k === 0){
    seg(g, [[B.C1, B.YB],[GAP0, B.YB]], C.wire, 2.2);
    seg(g, [[GAP1, B.YB],[B.C2, B.YB]], C.wire, 2.2);
    cross(g, (GAP0 + GAP1)/2, B.YB, 6);
  }else{
    seg(g, [[B.C1, B.YB],[B.C2, B.YB]], C.wire, 2.2);
  }

  if(S4.k === 1){
    /* 灯挂在两根联络线中间；SA2 的公共端接了零线 */
    seg(g, [[K1LX, B.YT],[K1LX, B.PY - B.LR]], C.wire, 2.2);
    seg(g, [[K1LX, B.PY + B.LR],[K1LX, B.YB]], C.wire, 2.2);
    dot(g, K1LX, B.YT, C.wire, 3.2); dot(g, K1LX, B.YB, C.wire, 3.2);
    EP.wire(g, new Path([[B.P2, B.PY],[B.LX, B.PY],[B.LX, B.NY],[B.BX, B.NY]]), {c:'blue'});
    dot(g, B.BX, B.NY, C.N, 3.4);
    txt(g, 'N 零线', B.BX + 8, B.NY - 13, {sz:9.5, b:1, c:C.N, al:'left'});
  }else{
    seg(g, [[B.P2, B.PY],[B.LX, B.PY],[B.LX, B.LAMP - B.LR]], C.wire, 2.2);
    EP.wire(g, new Path([[B.LX, B.LAMP + B.LR],[B.LX, B.NY],[B.BX, B.NY]]), {c:botC});
    dot(g, B.BX, B.NY, botK, 3.4);
    txt(g, topRed ? 'N 零线' : 'L 相线', B.BX + 8, B.NY - 13, {sz:9.5, b:1, c:botK, al:'left'});
  }

  spdt(g, B.P1, B.PY, B.C1, B.YT, B.YB, S4.a);
  spdt(g, B.P2, B.PY, B.C2, B.YT, B.YB, S4.b);

  /* 带电到哪儿 / 短路 */
  if(S4.k === 1 && R.short){
    const p = new Path([[B.BX,B.PY],[B.P1,B.PY],[B.C1,ya],[B.C2,ya],[B.P2,B.PY],
                        [B.LX,B.PY],[B.LX,B.NY],[B.BX,B.NY]]);
    g.save(); g.globalAlpha = 0.55 + 0.45*Math.abs(Math.sin(t*7)); glow(g, p, C.err); g.restore();
    EP.chip(g, '短路 · 跳闸', (B.C1 + B.C2)/2, ya + (ya === B.YT ? -15 : 15),
            {sz:9.5, b:1, c:C.err, al:'center'});
  }else{
    let pts;
    if(S4.k === 1){
      pts = [[B.BX,B.PY],[B.P1,B.PY],[B.C1,ya],[K1LX,ya]];
    }else if(S4.k === 0){
      if(S4.a === 1) pts = [[B.BX,B.PY],[B.P1,B.PY],[B.C1,B.YB],[GAP0,B.YB]];
      else if(R.on) pts = null;
      else pts = [[B.BX,B.PY],[B.P1,B.PY],[B.C1,B.YT],[B.C2,B.YT]];
    }else{
      pts = R.on ? null : [[B.BX,B.PY],[B.P1,B.PY],[B.C1,ya],[B.C2,ya]];
    }
    if(R.on){
      const full = (S4.k === 1)
        ? new Path([[B.BX,B.PY],[B.P1,B.PY],[B.C1,ya],[K1LX,ya],[K1LX, ya===B.YT ? B.YB : B.YT],
                    [B.C2, ya===B.YT ? B.YB : B.YT],[B.P2,B.PY],[B.LX,B.PY],[B.LX,B.NY],[B.BX,B.NY]])
        : new Path([[B.BX,B.PY],[B.P1,B.PY],[B.C1,ya],[B.C2,ya],[B.P2,B.PY],
                    [B.LX,B.PY],[B.LX,B.NY],[B.BX,B.NY]]);
      dots(g, full, {gap:30, r:3, color:C.cur, phase:t*46});
    }else if(pts){
      glow(g, new Path(pts), C.warn);
    }
  }

  /* 灯 */
  if(S4.k === 1){
    EC.lamp(g, K1LX, B.PY, B.LR, R.on ? 1 : 0);
    txt(g, 'EL', K1LX + B.LR + 6, B.PY, {sz:10, b:1, c:C.tx2, al:'left'});
  }else{
    EC.lamp(g, B.LX, B.LAMP, B.LR, R.on ? 1 : 0);
    txt(g, 'EL', B.LX + B.LR + 6, B.LAMP, {sz:10, b:1, c:C.tx2, al:'left'});
    txt(g, '联络线 1', (B.C1 + B.C2)/2, B.YT - 12, {sz:9, c:C.tx3});
    txt(g, '联络线 2', (B.C1 + B.C2)/2, B.YB + (S4.k === 0 ? 24 : 13), {sz:9, c:C.tx3});
  }
  if(S4.k === 2){
    /* 灯座常带电 —— 这一条是这种接法唯一的、也是致命的毛病 */
    hot(g, B.LX, B.LAMP, B.LR + 10, {color:C.err});
    EP.chip(g, '灯座常带 220 V', B.LX - B.LR - 8, B.LAMP + 30, {sz:9, b:1, c:C.err, al:'right'});
  }
  txt(g, 'SA1', 84, 158, {sz:10, b:1, c:C.tx2});
  txt(g, 'SA2', 262, 158, {sz:10, b:1, c:C.tx2});
  hot(g, (B.P1 + B.C1)/2, B.PY + 2, 0, {w:52, h:80, r:8});
  hot(g, (B.P2 + B.C2)/2, B.PY + 2, 0, {w:52, h:80, r:8});

  const CC = [
    R.on ? ['ok', 'SA1、SA2 都在上，这一种情形能亮', '可另外三种组合怎么拨都不亮 —— 两地控制已经废了']
         : ['warn', '拨不亮 —— 电走到断口就停了', '症状：一个开关只在某个位置时，另一个才管用'],
    R.short ? ['err', '两个拨到同一边 → 相线和零线直接碰上', '当场短路跳闸；这种接法有一半的组合是短路']
            : ['warn', '灯亮了 —— 但这是错的接法', '一拨到同一边就跳闸，装的时候很容易以为没问题'],
    R.on ? ['err', '灯亮了，一切「正常」', '可零线在开关这头被断，灯座那头一直连着相线']
         : ['err', '灯灭了，看着也「正常」', '关掉之后灯座仍然带 220 V —— 换灯泡的人一碰就触电']
  ][S4.k];
  conc(g, 228, CC[0], CC[1], CC[2]);
}
function note4(){
  const R = res4();
  $('s4a').textContent = (S4.a ? '下' : '上') + ' / ' + (S4.b ? '下' : '上');
  $('s4c').textContent = R.short ? '—' : (R.on ? '亮' : '灭');
  $('s4d').textContent = R.short ? '短路跳闸' : (S4.k === 2 ? '灯座带电' : (R.on ? '这一种能亮' : '拨不亮'));
  let h = '';
  if(S4.k === 0){
    h = '<div class="st bad">症状：一个开关只在某个位置时，另一个才管用</div>' +
      '下面那根联络线断了（漏接、端子没压紧、盒里少穿了一根都是这个结果）。' +
      '于是只剩<b>一条路</b>可走：<b>SA1 必须选上面那根，SA2 也必须选上面那根</b>，' +
      '四种组合里只有这一种亮。' +
      '<hr><b>把 SA1 的公共端认错，症状一模一样。</b>' +
      '三个端子里公共端接成了换向端，等效于少了一条路 —— ' +
      '所以现场碰到「两个开关得配合着拨才亮」，先查这两处：' +
      '<b>两根联络线通不通、公共端接对没有</b>。' +
      '<span class="sub">查法：断电，把两个开关都拆下来，' +
      '用万用表通断档量两根联络线（3.6b 讲的）。' +
      '再单独量一只开关：拨到一边响、拨到另一边不响，' +
      '<b>两次都参与的那个端子就是公共端</b>。</span>';
  }else if(S4.k === 1){
    h = '<div class="st bad">相线进 SA1、零线进 SA2 —— 一半的组合是短路</div>' +
      '这是最危险的一种，因为<b>它有一半时间是「好的」</b>：' +
      '两个开关拨到不同边时，一根联络线是相线、另一根是零线，灯正好接在中间，<b>它真的亮</b>。' +
      '<hr>可一旦两个拨到<b>同一边</b>，那根联络线上一头接着相线、一头接着零线，' +
      '<b>220 V 直接短接</b>，当场跳闸。' +
      '<span class="sub">装的时候试一下灯能亮，就以为接对了 —— ' +
      '这正是「灯亮不能证明接对」的典型。<b>零线绝不能进开关</b>，' +
      '这条在单控上和在双控上是同一条。</span>';
  }else{
    h = '<div class="st bad">灯能正常开关，但灯座一直带 220 V</div>' +
      '相线不经过开关、直通到灯的一端，开关串在<b>零线</b>那一头。' +
      '<b>灯的开、关完全正常，两地控制也正常</b> —— 从表面上一点毛病都看不出来。' +
      '<hr>问题在于：关掉之后，<b>灯和灯座仍然连着相线</b>。' +
      '换灯泡的人以为断电了，手一碰螺口就是触电。' +
      '<span class="sub">查法很简单：<b>关掉开关，用验电笔点灯座（或灯具的进线端）</b>，' +
      '亮 → 开关接在零线上了。3.5 那支笔就是干这个的。' +
      '真接反了，把开关那两根线和相线的位置对调过来即可。</span>';
  }
  $('n3').innerHTML = h;
}

/* ================================================================
   舞台、交互、绑定
   ================================================================ */
const st1 = new Stage('cv0', 360, 268);
const st2 = new Stage('cv1', 360, 266);
const st3 = new Stage('cv2', 360, 270);
const st4 = new Stage('cv3', 360, 266);

/* 屏 1：点画布上的开关，或者点墙上那块面板（面板对应第一个开关） */
st1.cv.addEventListener('click', function(ev){
  const p = st1.pick(ev), br = A_BR[S1.k];
  if(p[0] > 46 && p[0] < 106 && p[1] > 90 && p[1] < 152){ S1.on[0] = !S1.on[0]; note1(); return; }
  for(let i=0;i<br.length;i++){
    if(Math.abs(p[0] - br[i]) < 26 && p[1] > 84 && p[1] < 146){ S1.on[i] = !S1.on[i]; note1(); return; }
  }
});
document.getElementById('s1k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S1.k = +t.dataset.k;
  document.querySelectorAll('#s1k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S1.k);
  });
  note1();
});

/* 屏 2/3/4 的开关：画布上按 x 分区（宽松一点，手指点得到），按钮也留着 */
function flip2(w){ S2[w] = S2[w] ? 0 : 1; note2(); }
st2.cv.addEventListener('click', function(ev){
  const p = st2.pick(ev); if(p[1] < 56 || p[1] > 166) return;
  flip2(p[0] < 172 ? 'a' : 'b');
});
document.getElementById('s2b').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return; flip2(t.dataset.w);
});

function flip3(w){ S3[w] = S3[w] ? 0 : 1; note3(); }
st3.cv.addEventListener('click', function(ev){
  const p = st3.pick(ev); if(p[1] < 56 || p[1] > 180) return;
  flip3(p[0] < 120 ? 'a' : (p[0] < 224 ? 'm' : 'b'));
});
document.getElementById('s3b').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return; flip3(t.dataset.w);
});

function flip4(w){ S4[w] = S4[w] ? 0 : 1; note4(); }
st4.cv.addEventListener('click', function(ev){
  const p = st4.pick(ev); if(p[1] < 56 || p[1] > 166) return;
  flip4(p[0] < 172 ? 'a' : 'b');
});
document.getElementById('s4b').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return; flip4(t.dataset.w);
});
document.getElementById('s4k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S4.k = +t.dataset.k;
  document.querySelectorAll('#s4k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S4.k);
  });
  note4();
});

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会重设尺寸并清空。四屏都在 rAF 里，但**第一帧之前**也得有东西 */
  draw1(0); draw2(0); draw3(0); draw4(0);
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:7, sec:'7.1'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('7.1');
  let h = '';
  h += nb.prev ? '<a href="'+nb.prev.f+'">‹ '+nb.prev.id+' '+nb.prev.t+'</a>'
               : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next && nb.next.f ? '<a class="next" href="'+nb.next.f+'">'+nb.next.id+' '+nb.next.t+' ›</a>'
               : '<span>下一节还没做</span>';
  $('pager').innerHTML = h;
})();

loop(function(dt, t){
  if(cur === 0) draw1(t);
  else if(cur === 1) draw2(t);
  else if(cur === 2) draw3(t);
  else draw4(t);
});
  }
});
})();
