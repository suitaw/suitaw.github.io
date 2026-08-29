/* 4.1 图有哪几种 —— 本节内容的唯一真相。
   对应《零基础学电工》第 4 章（书内 P75~P76「区分电路类型」那一段，
   其余三种图是按就业需要补的：上班拿到手的图纸里这四种都会出现）。

   **这一章我按「能看懂一张真图」排，不按书的条目排。** 书上第 4 章的顺序是
   文字符号（P64~69）→ 图形符号（P69~73）→ 识图方法与七步骤（P74~78）；
   我把「图有哪几种」提到最前面，因为不先分清手上这张是什么图，
   后面认再多符号也是白认 —— 拿系统图去问「灯装在哪儿」，
   得到的结论只会是「这图上什么都没有」。

   **这一节的眼：同一套设备有四张图，各回答一个不同的问题。**
   所以四屏画的**必须是同一个回路**：一个卧室照明 ——
   配电箱里的断路器 QF1 → 墙上的开关 SA → 屋顶的灯 EL。换电路讲就白讲了。

   四屏 = 四种图：
   ① 系统图（单线图）  电从哪来、分几路、每路多大
   ② 电路原理图        按下开关之后，电按什么顺序流过哪些元件
   ③ 安装接线图        哪根线从哪个端子接到哪个端子
   ④ 照明平面图        东西装在房间的什么位置、线怎么走

   数字口径（都有出处，别再重算）：
   - 这盏灯按 **40 W / 220 V** 算，回路电流 40 ÷ 220 = **0.18 A**
   - 照明回路 **BV-3×2.5**（相、零、PE 三根 2.5 mm²）配 **C10** 断路器；
     插座回路 BV-3×4 配 C16 带漏电保护；空调回路 BV-3×4 配 C20
   - 线路标注 **BV-3×2.5-PC16-CC**：BV 铜芯聚氯乙烯绝缘电线 / 3 根 2.5 mm² /
     穿 φ16 硬塑料导管 / 暗敷在顶板内
   - 敷设方式代号：SC 焊接钢管、PC 硬塑料导管、MT 电线管、CT 桥架
     敷设部位代号：CC 暗敷顶板内、WC 暗敷墙内、FC 暗敷地面内、CE 沿顶棚面明敷、WS 沿墙面明敷

   **屏 3 的安全点是这一节的落点**：开关必须断相线。开关接在零线上，
   灯照样能开能关，可关了灯之后灯座上仍然是 220 V —— 换灯泡就会被电。
   这条第 7 章「照明控制线路」还要再用一次。 */
(function(){
'use strict';
ELEC.reg({
  id: '4.1',
  file: 'c4-1.html',
  title: '4.1 图有哪几种',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>系统图</button>
    <button class="tab" data-i="1"><span class="n">2</span>原理图</button>
    <button class="tab" data-i="2"><span class="n">3</span>接线图</button>
    <button class="tab" data-i="3"><span class="n">4</span>平面图</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">同一套设备，四张图，各回答一个问题</div>
    这一节从头到尾只画<b>一个回路</b>：卧室照明 —— 配电箱里的断路器 <b>QF1</b> →
    墙上的开关 <b>SA</b> → 屋顶的灯 <b>EL</b>，只是换四种画法。
    第一种是<b>系统图</b>，它只回答一句话：<b>电从哪来、分几路、每路多大</b>。
    <b>点一路（图上或下面的按钮）看它的规格。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">WL1 照明</button>
        <button class="btn sm" data-k="1">WL2 插座</button>
        <button class="btn sm" data-k="2">WL3 空调</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">回路<br>编号</div><div class="v" id="s1a">WL1</div></div>
        <div class="num"><div class="k">断路器</div><div class="v" id="s1b">C10</div></div>
        <div class="num hi"><div class="k">导线</div><div class="v" id="s1c">BV-3×2.5</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">系统图上有什么、没有什么</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>内容</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">有</td><td>电源怎么进来、总开关、<b>分成几路</b>、每路的<b>回路编号</b>、断路器规格、导线型号截面、这一路供给谁</td></tr>
        <tr><td class="eu-s">没有</td><td>元件装在<b>房间哪个位置</b>（那是平面图）、<b>哪根线接哪个端子</b>（那是接线图）、开关按下去<b>怎么动作</b>（那是原理图）</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>系统图是「单线画法」</b>：一路上明明有三根线（相、零、PE），图上也只画一根。
      因为这张图关心的是「分几路、每路多大」，画三根反而看不清结构。
      <span class="sub">三相回路也一样只画一根线，根数写在旁边的文字标注里。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">回路编号 WL 是什么意思</div>
    <b>W</b> 表示「线路」，后面那个字母表示用途：<span class="key">WL 照明</span>
    <span class="key">WP 动力</span> <span class="key">WC 控制</span>
    <span class="key">WE 应急</span>，再跟一个数字就是第几路。
    <span class="sub">所以 WL1、WL2 都是照明系统里的第 1、第 2 路；不同图纸的习惯略有出入，
    以那张图自己的图例为准 —— <b>看图先看图例</b>。</span>
  </div>

  <div class="bet" data-bet="c41-sys" data-q="看着这张系统图，能不能知道卧室那盏灯装在房间哪个位置？"
       data-opts="能，图上画着灯|不能——位置是平面图管的事，系统图只管分几路、每路多大|能，量一下导线长度就知道" data-right="1"
       data-after="不能。系统图上那条竖线不代表任何一根真实导线的走向，它只表示「有这么一路」。拿系统图去问位置，只会觉得「这图上什么都没有」——不是图画得不好，是问错了图。"></div>
</section>

<!-- ================= 场景 2：电路原理图 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">原理图只讲电气关系，不讲位置</div>
    把刚才那一路 WL1 摊开画：相线 <b>L</b> 进来，经过断路器 <b>QF1</b>、开关 <b>SA</b>，
    到灯 <b>EL</b>，再从零线 <b>N</b> 回去。<b>点图上的开关（或下面的按钮）合一下。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">开关断开</button>
        <button class="btn sm" data-k="1">开关闭合</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">开关 SA</div><div class="v" id="s2a">断开</div></div>
        <div class="num"><div class="k">灯 EL<br>40 W</div><div class="v" id="s2b">不亮</div></div>
        <div class="num hi"><div class="k">回路<br>电流</div><div class="v" id="s2c">0 A</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">顺着电流走一遍 —— 原理图就是拿来这么读的</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>顺序</th><th>元件</th><th>作用</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">①</td><td><b>L 相线</b></td><td>电从这儿来（对地 220 V）</td></tr>
        <tr><td class="eu-s">②</td><td><b>QF1</b> 断路器</td><td>保护：过载、短路时自己跳开</td></tr>
        <tr><td class="eu-s">③</td><td><b>SA</b> 开关</td><td>控制：人在这儿决定通不通</td></tr>
        <tr><td class="eu-s">④</td><td><b>EL</b> 灯</td><td>负载：把电变成光和热</td></tr>
        <tr><td class="eu-s">⑤</td><td><b>N 零线</b></td><td>电从这儿回去，回路才闭合</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      这五步就是第 4.4 节要练的「顺着电流走一遍」。<b>只要回路上任何一处断开，
      灯就不亮</b> —— 这也是查故障的全部依据（3.6b 那节的电压降法）。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">图上的位置 ≠ 实物的位置</div>
    原理图上开关画在灯的<b>左边</b>，那只是为了「读起来顺」。真实的房间里，
    开关在门口墙上离地 1.3 米，灯在屋顶正中，两者隔着三米。
    <b>原理图上元件摆在哪儿，跟它装在墙上哪儿完全无关。</b>
    <span class="sub">想知道装在哪儿，得翻平面图（第 4 屏）；想知道线怎么接，得翻接线图（第 3 屏）。</span>
  </div>

  <div class="bet" data-bet="c41-pos" data-q="原理图上开关画在灯的左边。装修的时候，开关一定要装在灯的左边吗？"
       data-opts="一定要，图上怎么画就怎么装|不一定，原理图不表示位置，装哪边由平面图定|一定要，不然接线会反" data-right="1"
       data-after="不一定。原理图只表达「谁和谁在电气上连着、按什么顺序」。同一个原理图，开关装门左边、门右边、甚至装在隔壁房间，画出来都是这一张。位置由平面图定。"></div>
</section>

<!-- ================= 场景 3：安装接线图 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">接线图管的是「哪根线接哪个端子」</div>
    场景：<b>关了灯，准备换灯泡。</b>同一路 WL1，这回画成接线图 ——
    相线 L 先进开关、再从开关出来到灯；零线 N 和 PE 直接到灯，不经过开关。
    <b>切到「开关接在零线上」，看灯座还带不带电。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">正确：开关断相线</button>
        <button class="btn sm" data-k="1">错误：开关断零线</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">开关<br>状态</div><div class="v" id="s3a">断开</div></div>
        <div class="num"><div class="k">灯座<br>对地</div><div class="v" id="s3b">0 V</div></div>
        <div class="num hi"><div class="k">换灯泡</div><div class="v" id="s3c">安全</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">硬规矩：开关必须串在相线上</div>
    两种接法灯都能开能关，<b>用起来一模一样</b>，所以这个错误装完当时根本发现不了。
    差别只在断开之后：
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>开关接在</th><th>关灯后灯座对地</th><th>换灯泡</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">相线<br>（对）</td><td><b>0 V</b>，相线被切断在配电箱那一侧</td><td>安全</td></tr>
        <tr><td class="eu-s">零线<br>（错）</td><td><b>仍是 220 V</b>，相线一直顶到灯座</td><td><b>会电人</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>怎么查：</b>关掉开关，用验电笔点灯座的两个触点。<b>正确接法两个都不亮</b>；
      有一个亮，就是开关接反了 —— 必须停电改过来。
      <span class="sub">但记住 3.5 节那条：<b>笔不亮不等于没电</b>。真要动手，
      还得在配电箱把这一路的断路器断开并挂牌。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">接线图上要看的三样</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>看什么</th><th>怎么看</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">端子</td><td>每个盒子边上那一排点，就是<b>实物上真的能拧螺丝的地方</b>，图上有编号，实物上也有</td></tr>
        <tr><td class="eu-s">导线</td><td>一根线从哪个端子到哪个端子，<b>颜色和根数都按实物画</b>（相红、零蓝、PE 黄绿）</td></tr>
        <tr><td class="eu-s">交叉</td><td><b>交叉处有黑点＝接在一起；没有黑点＝只是画面上叠过去，互不相连</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>接线图照着接就能接对，但它不解释原理。</b>反过来，原理图讲得清原理，
      却不告诉你线该拧到哪颗螺丝上。<b>两张图配着用</b> —— 这正是第 4.5 节的事。
    </div>
  </div>

  <div class="bet" data-bet="c41-sw" data-q="把开关接在零线上，灯照样能开能关。关了灯之后，灯座上还有没有电？"
       data-opts="没有了，开关都断开了|有——相线一直顶到灯座，对地仍是 220 V|要看灯泡有没有取下来" data-right="1"
       data-after="有，仍是 220 V。开关断的是回来的那根零线，相线从配电箱一路顶到灯座上没有任何东西挡着。灯不亮只是因为回路不闭合，不代表没电——这时候换灯泡，手碰到灯座就成了新的回路。"></div>
</section>

<!-- ================= 场景 4：照明平面图 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">平面图告诉你东西装在哪儿、线怎么走</div>
    还是这一路 WL1，画到房间平面上：配电箱在门边墙上、灯在屋顶正中、开关在门口。
    线上那串字母是<b>线路标注</b>。<b>点图上的东西（或下面的按钮）看它是什么。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">配电箱</button>
        <button class="btn sm" data-k="1">灯具</button>
        <button class="btn sm" data-k="2">开关</button>
        <button class="btn sm" data-k="3">线路标注</button>
      </div>
      <div class="nums">
        <div class="num"><div class="k">这是什么</div><div class="v" id="s4a">配电箱</div></div>
        <div class="num hi"><div class="k">怎么认</div><div class="v" id="s4b">半涂黑的方块</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">线路标注怎么拆　BV-3×2.5-PC16-CC</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>段</th><th>意思</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">BV</td><td>导线型号：<b>铜芯、聚氯乙烯绝缘、单芯硬线</b>（B 布电线，V 聚氯乙烯）</td></tr>
        <tr><td class="eu-s">3×2.5</td><td><b>3 根，每根 2.5 mm²</b>（相、零、PE）</td></tr>
        <tr><td class="eu-s">PC16</td><td>敷设方式：穿 <b>φ16 硬塑料导管</b></td></tr>
        <tr><td class="eu-s">CC</td><td>敷设部位：<b>暗敷在顶板内</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      不同图纸的标注格式略有出入（有的把回路编号 WL1 也写在最前面），
      但<b>「型号 - 根数×截面 - 管子 - 敷在哪儿」这个顺序是通用的</b>。
      <span class="sub">看不懂就翻图纸首页的<b>图例和说明</b>，那上面一定有这套代号的解释。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">常见代号（记这几个就够用）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>类别</th><th>代号</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">穿什么<br>管</td><td><span class="key">SC 焊接钢管</span> <span class="key">PC 硬塑料导管</span>
          <span class="key">MT 电线管</span> <span class="key">CT 桥架</span></td></tr>
        <tr><td class="eu-s">敷在<br>哪儿</td><td><span class="key">CC 暗敷顶板内</span> <span class="key">WC 暗敷墙内</span>
          <span class="key">FC 暗敷地面内</span> <span class="key">CE 沿顶棚明敷</span> <span class="key">WS 沿墙明敷</span></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>C 结尾的都是「暗敷」</b>（concealed，埋在墙里／板里），
      <b>E/S 结尾的是「明敷」</b>（沿着表面走，看得见）。
      记住这一条，剩下的字母猜也猜得出来。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st good">四种图一览 —— 这一节的全部</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>图</th><th>回答什么</th><th>什么时候翻它</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">系统图</td><td>电从哪来、分几路、每路多大</td><td>查这台设备归哪个断路器管、能不能再加负载</td></tr>
        <tr><td class="eu-s">原理图</td><td>按下开关之后电怎么流、谁控制谁</td><td><b>查故障、分析动作</b></td></tr>
        <tr><td class="eu-s">接线图</td><td>哪根线接哪个端子</td><td><b>装线、改线、对号入座</b></td></tr>
        <tr><td class="eu-s">平面图</td><td>装在房间什么位置、线怎么走</td><td>定位、开槽穿管、找埋在墙里的线</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>拿错图问错问题，就会觉得「这图上什么都没有」。</b>
      到手一张图，第一件事不是认符号，是先认出<b>这是哪一种图</b>。
    </div>
  </div>

  <div class="quiz" data-quiz="c4-1">
    <div class="qz" data-q="师傅让你查一下这个房间的灯是从配电箱里哪个断路器来的，该看哪张图？"
         data-opts="平面图|系统图|接线图"
         data-right="1"
         data-why="系统图。它把「电怎么进来、分成几路、每路是什么规格、供给谁」画在一张图上，回路编号和断路器规格都在上面。平面图只管位置，接线图只管端子对端子。"></div>
    <div class="qz" data-q="要在墙上定出开关暗盒的位置、并算出要开多长的槽，该看哪张图？"
         data-opts="平面图|原理图|系统图"
         data-right="0"
         data-why="平面图。只有它按房间的实际比例画出元件装在哪儿、线沿什么路径走，还带着「穿什么管、暗敷在哪儿」的线路标注。原理图上元件的位置是随便摆的，跟实物位置无关。"></div>
    <div class="qz" data-q="照明回路里，开关必须串在哪根线上？为什么？"
         data-opts="零线，这样更安全|相线，否则关了灯灯座上仍然是 220 V，换灯泡会电人|哪根都行，反正灯都能开关"
         data-right="1"
         data-why="必须串相线。两种接法灯都能开能关，用起来一模一样，所以装错了当时发现不了。差别在断开之后：开关断相线，灯座对地 0 V；开关断零线，相线一路顶到灯座，对地仍是 220 V——换灯泡手一碰就成了新的回路。"></div>
    <div class="qz" data-q="平面图上标着 BV-3×2.5-PC16-CC，其中 PC16 和 CC 是什么意思？"
         data-opts="PC16 是导线型号，CC 是回路编号|PC16 是穿 φ16 硬塑料导管，CC 是暗敷在顶板内|PC16 是 16 A 断路器，CC 是铜芯"
         data-right="1"
         data-why="PC 是硬塑料导管、16 是管径 φ16 mm；CC 是敷设部位「暗敷在顶板内」。整串按「型号 - 根数×截面 - 穿什么管 - 敷在哪儿」读：铜芯聚氯乙烯绝缘线，3 根 2.5 mm²，穿 φ16 硬塑料管，暗敷在顶板里。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 4 章（书内 P75~P76「区分电路类型」）<br>系统图和平面图是按上班会碰到的图纸补的，书上没有单独讲</div>
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

/* ================================================================
   断路器符号（单极）
   ================================================================
   一段引线 + 一根动触点臂 + 固定触点上一个 ×。**× 就是断路器 QF 的记号**
   （题库里那两道图形题考的正是它，铁壳开关 QS 不该有 ×）。
   竖着画；o.horiz 时整体转 90°，上端变成左端 —— 这样电流从左往右走。
   o.on = true 时动触点臂贴在引线上（合闸），false 是符号的标准画法（断开）。 */
function qfSym(g, x, y, o){
  o = o || {};
  const h = o.h || 26, c = o.color || C.wire, lw = o.lw || 2.1;
  const y0 = -h/2, y1 = h/2, ct = y0 + 4.5, cb = y1 - 4.5;
  g.save();
  g.translate(x, y);
  if(o.horiz) g.rotate(-Math.PI/2);
  g.strokeStyle = c; g.lineWidth = lw; g.lineCap = 'round';
  g.beginPath(); g.moveTo(0, y0); g.lineTo(0, ct); g.stroke();
  g.beginPath(); g.moveTo(0, y1); g.lineTo(0, cb); g.stroke();
  /* 动触点臂 */
  g.beginPath(); g.moveTo(0, cb);
  if(o.on) g.lineTo(0, ct); else g.lineTo(9.5, ct + 1);
  g.stroke();
  /* × 记号画在固定触点那一头 */
  g.lineWidth = 1.7; const m = 3.6;
  g.beginPath();
  g.moveTo(-m, ct - m); g.lineTo(m, ct + m);
  g.moveTo(m, ct - m); g.lineTo(-m, ct + m);
  g.stroke();
  g.fillStyle = c;
  g.beginPath(); g.arc(0, cb, 2.2, 0, Math.PI*2); g.fill();
  g.restore();
}

/* 竖直开关：EC.switchSym 只画横的，转 90° 用。上端是固定触点，刀往右下摆 */
function swVert(g, x, y, on, len){
  g.save(); g.translate(x, y); g.rotate(Math.PI/2);
  EC.switchSym(g, 0, 0, on, {len: len || 34});
  g.restore();
}

/* ================================================================
   场景 1：配电系统图（单线）
   ================================================================
   三路都挂在同一条母线上。选中的那一路整条变蓝 + 套一圈可点提示环。 */
const BRANCH = [
  {x:106, id:'WL1', use:'照明', qf:'C10',  wire:'BV-3×2.5', feed:'卧室照明 1 盏 40 W',
   extra:'照明回路电流小，2.5 mm² 的线配 10 A 的断路器足够。'},
  {x:190, id:'WL2', use:'插座', qf:'C16',  wire:'BV-3×4',
   feed:'房间插座（带漏电保护）',
   extra:'插座回路必须带<b>漏电保护</b>：人会直接接触插上去的电器。'},
  {x:274, id:'WL3', use:'空调', qf:'C20',  wire:'BV-3×4', feed:'空调专用',
   extra:'空调功率大、启动电流冲击大，<b>单独走一路</b>，不和插座混用。'}
];
const S1 = { k:0 };
const st1 = new Stage('cv0', 360, 300);

function draw1(){
  const g = st1.g; st1.clear();
  EP.heading(g, 12, 14, '配电系统图', '单线画法');

  /* 配电箱外框 */
  g.save();
  g.strokeStyle = C.boxLine; g.lineWidth = 1.2; g.setLineDash([5,4]);
  EC.box(g, 28, 58, 304, 118, 6, null, C.boxLine, 1.2);
  g.restore();
  /* 「配电箱」不能放框的左上角 —— 那儿正是 QF0 的 × 记号（截图抓到的），挪到右上角 */
  txt(g, '配电箱', 324, 69, {sz:9.5, c:C.tx3, al:'right'});

  /* 进线 + 总断路器 */
  new Path([[52,38],[52,69]]).stroke(g, 2.4, C.wire);
  txt(g, '进户　单相 220 V', 64, 44, {sz:9, c:C.tx2, al:'left'});
  qfSym(g, 52, 84, {h:26});
  txt(g, 'QF0　C40', 68, 84, {sz:9.5, c:C.tx2, al:'left'});
  new Path([[52,97],[52,112]]).stroke(g, 2.4, C.wire);

  /* 母线 */
  new Path([[52,112],[300,112]]).stroke(g, 3.4, C.wire);

  BRANCH.forEach(function(b, i){
    const on = (i === S1.k), col = on ? C.acc : C.wire;
    new Path([[b.x,112],[b.x,192]]).stroke(g, on ? 3 : 2.2, col);
    qfSym(g, b.x, 140, {h:26, color:col, lw: on ? 2.5 : 2.1});
    txt(g, b.qf, b.x + 15, 140, {sz:8.5, c: on ? C.acc : C.tx3, al:'left'});
    EC.head(g, b.x, 192, 0, 1, 5.5, col);
    txt(g, b.id, b.x, 208, {sz:11, b:1, c: on ? C.acc : C.tx});
    txt(g, b.use, b.x, 222, {sz:9.5, c: on ? C.acc : C.tx3});
    if(on) hot(g, b.x + 4, 140, 24);
  });

  const b = BRANCH[S1.k];
  EC.box(g, 18, 246, 324, 40, 6, C.accbg, C.acc, 1);
  txt(g, '系统图回答的：电从哪来、分几路、每路多大', 180, 259, {sz:10.5, b:1, c:C.acc});
  txt(g, '它不说位置、不说端子、不说动作顺序', 180, 274, {sz:9.5, c:C.tx2});
  return b;
}
function note1(){
  const b = BRANCH[S1.k];
  $('s1a').textContent = b.id;
  $('s1b').textContent = b.qf;
  $('s1c').textContent = b.wire;
  $('n0').innerHTML =
    '<div class="st">' + b.id + '　' + b.use + '　' + b.feed + '</div>' +
    '这一路从母线上分出来，先过一个 <b>' + b.qf + '</b> 的断路器，' +
    '再用 <b>' + b.wire + '</b> 的导线送到用电点。' + b.extra +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>整张图上，一路就是一根竖线加一个断路器加一行字。</b>' +
    '想知道这一路的线怎么走、灯装在哪儿、开关怎么接 —— 这张图一个字都不会告诉你，' +
    '那是后面三张图的事。' +
    '<span class="sub">但反过来，「这个插座跳闸了该去拉哪个断路器」' +
    '只有这张图答得最快。</span></div>';
}
document.getElementById('s1k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S1.k = +t.dataset.k;
  document.querySelectorAll('#s1k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S1.k);
  });
  note1(); draw1();
});
st1.cv.addEventListener('click', function(ev){
  const p = st1.pick(ev), x = p[0], y = p[1];
  if(y < 100 || y > 236) return;
  for(let i = 0; i < BRANCH.length; i++){
    if(Math.abs(x - BRANCH[i].x) < 40 && i !== S1.k){
      S1.k = i;
      document.querySelectorAll('#s1k .btn').forEach(function(t){
        t.classList.toggle('on', +t.dataset.k === S1.k);
      });
      note1(); draw1();
      return;
    }
  }
});

/* ================================================================
   场景 2：电路原理图
   ================================================================
   L 母线在上、N 母线在下，中间一条竖支路：QF1 → SA → EL。
   竖着排是为了「从上往下读＝电流方向」。 */
const S2 = { on:false, ph:0 };
const st2 = new Stage('cv1', 360, 310);
const LY = 64, NY = 232, BX = 180;
const P2 = new Path([[40,LY],[BX,LY],[BX,NY],[40,NY]]);

function draw2(dt){
  const g = st2.g; st2.clear();
  if(S2.on) S2.ph += (dt || 0) * 46;
  EP.heading(g, 12, 14, '电路原理图', '只画电气关系');

  /* 两条母线 */
  new Path([[40,LY],[300,LY]]).stroke(g, 2.6, C.L);
  new Path([[40,NY],[300,NY]]).stroke(g, 2.6, C.N);
  txt(g, 'L　相线', 40, 50, {sz:9.5, b:1, c:C.L, al:'left'});
  txt(g, 'N　零线', 40, 246, {sz:9.5, b:1, c:C.N, al:'left'});

  /* 支路 */
  new Path([[BX,LY],[BX,NY]]).stroke(g, 2.4, C.wire);
  EC.node(g, BX, LY); EC.node(g, BX, NY);

  qfSym(g, BX, 96, {h:28, on:true});
  txt(g, 'QF1　断路器 C10', BX + 18, 96, {sz:10, b:1, c:C.tx, al:'left'});

  swVert(g, BX, 146, S2.on, 34);
  txt(g, 'SA　开关', BX - 20, 146, {sz:10, b:1, c:C.tx, al:'right'});
  hot(g, BX, 146, 25);

  EC.lamp(g, BX, 196, 14, S2.on ? 1 : 0);
  txt(g, 'EL　灯 40 W', BX + 22, 196, {sz:10, b:1, c:C.tx, al:'left'});

  /* 电流：从 L 母线进来，走完支路，从 N 母线出去 */
  const skip = [[166,198],[214,250],[262,302]];
  if(S2.on){
    EC.dots(g, P2, {gap:26, r:3.2, color:C.cur, phase:S2.ph, skip:skip});
  }else{
    EC.dots(g, P2, {gap:26, r:3.0, color:C.wireL, phase:0, skip:skip});
  }
  EC.dimV(g, 272, LY, NY, '220 V', {dash:[4,4]});

  const ok = S2.on;
  EC.box(g, 18, 264, 324, 36, 6, ok ? C.okbg : C.box, ok ? C.ok : C.boxLine, 1);
  txt(g, ok ? '回路闭合：L → QF1 → SA → EL → N，灯亮'
           : '开关断开：回路不闭合，电流为 0，圆点全部停住',
      180, 276, {sz:10.5, b:1, c: ok ? C.ok : C.tx2});
  txt(g, '原理图回答的：电按什么顺序流过哪些元件', 180, 291, {sz:9.5, c:C.tx3});
}
function setSw(v){
  S2.on = v;
  document.querySelectorAll('#s2k .btn').forEach(function(t){
    t.classList.toggle('on', (+t.dataset.k === 1) === S2.on);
  });
  note2();
}
function note2(){
  $('s2a').textContent = S2.on ? '闭合' : '断开';
  $('s2b').textContent = S2.on ? '亮' : '不亮';
  $('s2c').textContent = S2.on ? '0.18 A' : '0 A';
  $('n1').innerHTML = S2.on
    ? '<div class="st good">回路闭合了 —— 电流 0.18 A</div>' +
      '40 W 的灯接在 220 V 上，电流 <b>40 ÷ 220 = 0.18 A</b>。' +
      '电从 L 相线进来，依次经过 <b>QF1 → SA → EL</b>，再从 N 零线回去 —— ' +
      '<b>这一圈就是「顺着电流走一遍」</b>，也是第 4.4 节读原理图的基本功。' +
      '<div class="tip info" style="margin-top:8px">' +
      '注意这张图上<b>没有一根线是按实际长度画的</b>。' +
      '开关离灯三米还是三十厘米，图上都是这么一段。' +
      '<b>原理图不表示距离，也不表示位置。</b></div>'
    : '<div class="st">开关断开：圆点全部停住</div>' +
      '这一节沿用前面几节的画法：<b>回路没闭合，电流为零，圆点就全部静止变灰</b> —— ' +
      '不是「流到断点才停下」。电流要么整条回路一起流，要么一点都不流。' +
      '<div class="tip" style="margin-top:8px"><b>点一下图上的开关（或按上面的按钮）合上它。</b>' +
      '<span class="sub">这也正是查故障的依据：回路上任何一处断开，' +
      '整条回路的电流都是 0，灯就不亮。</span></div>';
}
document.getElementById('s2k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  setSw(+t.dataset.k === 1);
});
st2.cv.addEventListener('click', function(ev){
  const p = st2.pick(ev);
  if(Math.abs(p[0] - BX) < 34 && Math.abs(p[1] - 146) < 30) setSw(!S2.on);
});

/* ================================================================
   场景 3：安装接线图
   ================================================================
   三个盒子（配电箱 / 开关盒 / 灯），线按实物的颜色和根数画。
   端子顺序特意排成 **PE / N / L**（上→下）：相线在最下面，
   要绕一趟开关再上来，正好不跟 PE、N 两条横线交叉。
   换成「开关接零线」之后，绕路的变成 N，它就必然要跨过 L 那条横线 ——
   于是画面上出现两个交叉点，「交叉处没有黑点＝不相连」这条规矩当场用得上。 */
const S3 = { k:0 };
const st3 = new Stage('cv2', 360, 344);
const DBX = 106, LPX = 252;
const PY = 74, NY3 = 96, LY3 = 118;

const W_PE  = new Path([[DBX,PY],[LPX,PY]]);
const W_STR = function(y){ return new Path([[DBX,y],[LPX,y]]); };
const W_DN  = function(y){ return new Path([[DBX,y],[128,y],[128,186],[170,186],[170,212]]); };
const W_UP  = function(y){ return new Path([[214,212],[214,194],[240,194],[240,y],[LPX,y]]); };

function draw3(){
  const g = st3.g; st3.clear();
  const bad = (S3.k === 1);
  EP.heading(g, 12, 14, '安装接线图', '谁接到谁');

  /* 三个盒子 */
  box(g, 14, 40, 92, 94, 6, C.box, C.boxLine, 1.3);
  txt(g, '配电箱', 22, 54, {sz:10, b:1, c:C.tx, al:'left'});
  txt(g, 'WL1 出线端', 22, 68, {sz:8.5, c:C.tx3, al:'left'});

  box(g, LPX, 40, 94, 94, 6, C.box, C.boxLine, 1.3);
  txt(g, '灯 EL', 260, 54, {sz:10, b:1, c:C.tx, al:'left'});
  EC.lamp(g, 318, 102, 12, 0);

  box(g, 148, 212, 88, 60, 6, C.box, C.boxLine, 1.3);
  new Path([[170,212],[170,242]]).stroke(g, 2, C.wire);
  new Path([[214,212],[214,242]]).stroke(g, 2, C.wire);
  EC.switchSym(g, 192, 242, false, {len:44});
  txt(g, '开关 SA', 192, 262, {sz:9.5, b:1, c:C.tx});

  /* 导线 */
  EP.wire(g, W_PE, {color:C.PE, w:2.6});
  if(bad){
    EP.wire(g, W_STR(LY3), {color:C.L, w:2.6});
    EP.wire(g, W_DN(NY3),  {color:C.N, w:2.6});
    EP.wire(g, W_UP(NY3),  {color:C.N, w:2.6});
    /* 说明文字放左下那块空地：横着写会穿过两根竖线，右端还顶到「灯座仍有 220 V」 */
    hot(g, 128, LY3, 10, {color:C.tx3, a:0.75});
    hot(g, 240, LY3, 10, {color:C.tx3, a:0.75});
    txt(g, '圈住的两处是交叉，', 20, 152, {sz:8.5, c:C.tx3, al:'left'});
    txt(g, '没有黑点＝不相连', 20, 166, {sz:8.5, c:C.tx3, al:'left'});
  }else{
    EP.wire(g, W_STR(NY3), {color:C.N, w:2.6});
    EP.wire(g, W_DN(LY3),  {color:C.L, w:2.6});
    EP.wire(g, W_UP(LY3),  {color:C.L, w:2.6});
  }

  /* 端子（画在导线上面，免得被线压住） */
  [[DBX,PY],[DBX,NY3],[DBX,LY3],[LPX,PY],[LPX,NY3],[LPX,LY3]].forEach(function(t){
    EP.terminal(g, t[0], t[1], 4.6);
  });
  EP.terminal(g, 170, 212, 4.6); EP.terminal(g, 214, 212, 4.6);
  txt(g, 'PE', 98, PY,  {sz:9, b:1, c:C.PE, al:'right'});
  txt(g, 'N',  98, NY3, {sz:9, b:1, c:C.N,  al:'right'});
  txt(g, 'L',  98, LY3, {sz:9, b:1, c:C.L,  al:'right'});
  txt(g, '外壳', 260, PY,  {sz:8.5, c:C.tx3, al:'left'});
  txt(g, '零线', 260, NY3, {sz:8.5, c:C.tx3, al:'left'});
  txt(g, '相线', 260, LY3, {sz:8.5, c:C.tx3, al:'left'});

  /* 灯座上还有没有电 */
  tag(g, bad ? '灯座仍有 220 V' : '灯座 0 V', 299, 160,
      {sz:10, b:1, c: bad ? C.err : C.ok, line: bad ? C.err : C.ok,
       fill: bad ? C.errbg : C.okbg});

  EP.legend(g, 180, 290, [['相线 L', C.L, 'bar'], ['零线 N', C.N, 'bar'], ['PE 保护地', C.PE, 'bar']]);

  EC.box(g, 18, 300, 324, 38, 6, bad ? C.errbg : C.okbg, bad ? C.err : C.ok, 1);
  txt(g, bad ? '开关串在零线上：灯照样开关，可关灯后灯座仍是 220 V'
             : '开关串在相线上：关了灯，灯座对地 0 V，换灯泡是安全的',
      180, 313, {sz:10.5, b:1, c: bad ? C.err : C.ok});
  txt(g, '接线图回答的：哪根线从哪个端子接到哪个端子', 180, 328, {sz:9.5, c:C.tx2});
}
function note3(){
  const bad = (S3.k === 1);
  $('s3a').textContent = '断开';
  $('s3b').textContent = bad ? '220 V' : '0 V';
  $('s3c').textContent = bad ? '会电人' : '安全';
  $('n2').innerHTML = bad
    ? '<div class="st bad">开关断的是零线 —— 相线一路顶到灯座</div>' +
      '开关装在回来的那根<b>零线</b>上。断开之后回路不闭合，灯确实不亮，' +
      '<b>可相线从配电箱一路顶到灯座，中间没有任何东西挡着</b> —— ' +
      '灯座对地仍然是 220 V。' +
      '<div class="tip" style="margin-top:8px"><b>这时候上手换灯泡，手一碰灯座就成了新的回路：' +
      '相线 → 灯座 → 你的身体 → 大地 → 变压器中性点。</b>' +
      '和 3.5 节验电笔那一屏画的是同一条路，区别只在于那时候你手里拿的是笔。' +
      '<span class="sub">再看一眼图上那两个交叉点：交叉处<b>没有黑点</b>，' +
      '表示两根线只是画面上叠过去，并没有接在一起。</span></div>'
    : '<div class="st good">开关断相线 —— 断开后灯座是死的</div>' +
      '相线 L 从配电箱出来，<b>先拐到开关</b>，从开关另一个端子出来<b>再去灯</b>；' +
      '零线 N 和 PE <b>直接到灯，不经过开关</b>。' +
      '<div class="tip info" style="margin-top:8px">' +
      '所以断开开关＝<b>在灯的上游把相线切断了</b>，灯座上剩下的只有零线，对地 0 V。' +
      '<span class="sub">图上每一个小圆点都是实物上真能拧螺丝的端子；' +
      '线的颜色也按实物画 —— <b>照着这张图就能把线接对，但它不解释为什么。</b>' +
      '　切到「开关断零线」看看差别。</span></div>';
}
document.getElementById('s3k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S3.k = +t.dataset.k;
  document.querySelectorAll('#s3k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S3.k);
  });
  note3(); draw3();
});

/* ================================================================
   场景 4：照明平面图
   ================================================================ */
const ITEM = [
  {n:'配电箱', s:'一个方块，一半涂黑'},
  {n:'灯具 EL', s:'圆圈里打一个叉'},
  {n:'开关 SA', s:'实心点加一根短斜杠'},
  {n:'线路标注', s:'BV-3×2.5-PC16-CC'}
];
const S4 = { k:0 };
const st4 = new Stage('cv3', 360, 318);

function draw4(){
  const g = st4.g; st4.clear();
  EP.heading(g, 12, 14, '照明平面图', '装在哪儿、线怎么走');

  /* 房间：地面 + 四面墙（下面留一个门洞） */
  g.save(); g.fillStyle = C.box; g.fillRect(32, 54, 296, 182); g.restore();
  const wall = C.wireL;
  new Path([[30,52],[330,52]]).stroke(g, 5, wall);
  new Path([[30,52],[30,238]]).stroke(g, 5, wall);
  new Path([[330,52],[330,238]]).stroke(g, 5, wall);
  new Path([[30,238],[96,238]]).stroke(g, 5, wall);
  new Path([[146,238],[330,238]]).stroke(g, 5, wall);
  /* 门：一条门扇 + 一段开启弧线 */
  g.save();
  g.strokeStyle = C.tx3; g.lineWidth = 1.6;
  g.beginPath(); g.moveTo(96, 238); g.lineTo(96, 190); g.stroke();
  g.setLineDash([4,4]);
  g.beginPath(); g.arc(96, 238, 48, -Math.PI/2, 0); g.stroke();
  g.restore();
  txt(g, '门', 120, 252, {sz:9, c:C.tx3});
  txt(g, '卧室', 318, 66, {sz:10, c:C.tx3, al:'right'});

  /* 线路 */
  const wireCol = (S4.k === 3) ? C.acc : C.tx3;
  new Path([[70,107],[200,107],[200,127]]).stroke(g, 1.8, wireCol);
  new Path([[200,153],[200,214],[162,214],[162,232]]).stroke(g, 1.8, wireCol);
  txt(g, 'BV-3×2.5-PC16-CC', 130, 97, {sz:8.5, b:1, c: S4.k === 3 ? C.acc : C.tx2});
  txt(g, 'PC16-WC', 196, 206, {sz:8.5, c: S4.k === 3 ? C.acc : C.tx2, al:'right'});

  /* 配电箱：方块，右半涂黑 */
  /* 配电箱要离左墙远一点：贴着画的话，选中时那圈虚线提示环会骑在墙线上 */
  box(g, 42, 96, 28, 22, 2, C.card, C.tx2, 1.6);
  g.save(); g.fillStyle = C.tx2; g.fillRect(56, 96, 14, 22); g.restore();
  txt(g, '配电箱', 58, 130, {sz:9, c: S4.k === 0 ? C.acc : C.tx2});

  /* 灯 */
  EC.lamp(g, 200, 140, 13, 0);
  /* 灯的名字放右边：放正下方会被那根竖导线从字中间穿过去（截图抓到的） */
  txt(g, 'EL　40 W', 218, 140, {sz:9, c: S4.k === 1 ? C.acc : C.tx2, al:'left'});

  /* 开关：实心点 + 一根短斜杠 */
  g.save();
  g.fillStyle = C.tx; g.beginPath(); g.arc(162, 238, 3.8, 0, Math.PI*2); g.fill();
  g.strokeStyle = C.tx; g.lineWidth = 1.6; g.lineCap = 'round';
  g.beginPath(); g.moveTo(162, 238); g.lineTo(173, 225); g.stroke();
  g.beginPath(); g.moveTo(169, 222); g.lineTo(177, 229); g.stroke();
  g.restore();
  txt(g, 'SA', 162, 256, {sz:9, c: S4.k === 2 ? C.acc : C.tx2});

  /* 选中提示 */
  if(S4.k === 0) hot(g, 56, 107, 0, {w:42, h:34, r:6});
  if(S4.k === 1) hot(g, 200, 140, 22);
  if(S4.k === 2) hot(g, 166, 233, 0, {w:34, h:30, r:6});
  if(S4.k === 3) hot(g, 130, 97, 0, {w:104, h:20, r:6});

  EC.box(g, 18, 272, 324, 38, 6, C.accbg, C.acc, 1);
  txt(g, '平面图回答的：东西装在房间什么位置、线沿什么路径走', 180, 285, {sz:10.5, b:1, c:C.acc});
  txt(g, '它不讲原理，也不告诉你线接在哪个端子上', 180, 300, {sz:9.5, c:C.tx2});
}
function note4(){
  const it = ITEM[S4.k];
  $('s4a').textContent = it.n;
  $('s4b').textContent = it.s;
  let h = '';
  if(S4.k === 0) h =
    '<div class="st">配电箱 —— 一个方块，一半涂黑</div>' +
    '画在门边的墙上，因为实物就装在那儿。<b>第 1 屏那张系统图，画的就是这个方块里面的东西</b>：' +
    '总断路器、母线、WL1／WL2／WL3 三路。' +
    '<div class="tip info" style="margin-top:8px">平面图上一个方块，系统图上一整页 —— ' +
    '<b>两张图讲的是同一个箱子，粗细不同而已。</b></div>';
  else if(S4.k === 1) h =
    '<div class="st">灯具 —— 圆圈里打一个叉</div>' +
    '画在屋顶正中，旁边标着它是什么灯、多大功率。' +
    '<b>这个 ⊗ 和原理图上那个 ⊗ 是同一个符号</b>，只是这里表示「装在这个位置」，' +
    '在原理图上表示「电气上串在这个位置」。' +
    '<div class="tip info" style="margin-top:8px">' +
    '同一个符号，在不同的图上说的是不同的事 —— <b>先认出这是哪种图，再去认符号。</b></div>';
  else if(S4.k === 2) h =
    '<div class="st">开关 —— 实心点加一根短斜杠</div>' +
    '画在门口的墙上（实物一般装在离地 1.3 m 左右、开门那一侧）。' +
    '斜杠上的短横表示这是<b>单极单控</b>开关，一个开关管一路。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>注意开关在图上离灯很远，而原理图上它俩挨着。</b>' +
    '两张图都没错 —— 一张说位置，一张说电气关系。' +
    '<span class="sub">开关到灯那一段标着 <b>PC16-WC</b>：穿 φ16 硬塑料管、' +
    '暗敷在墙里。装修开槽就是照着这条线开的。</span></div>';
  else h =
    '<div class="st">线路标注 —— 这串字母是整张平面图上信息量最大的地方</div>' +
    '<b>BV-3×2.5-PC16-CC</b>：铜芯聚氯乙烯绝缘线，3 根 2.5 mm²（相、零、PE），' +
    '穿 φ16 硬塑料导管，暗敷在顶板内。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>没有这行字，图上那条线什么也不是</b> —— 既不知道用多粗的线，也不知道该开多大的槽、穿什么管。' +
    '下面「线路标注怎么拆」那张表逐段讲了一遍。' +
    '<span class="sub">开关那一段是 <b>PC16-WC</b>，同样的管子，' +
    '只是敷设部位从顶板（CC）变成了墙里（WC）。</span></div>';
  $('n3').innerHTML = h;
}
function setItem(k){
  if(k === S4.k) return;
  S4.k = k;
  document.querySelectorAll('#s4k .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S4.k);
  });
  note4(); draw4();
}
document.getElementById('s4k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  setItem(+t.dataset.k);
});
st4.cv.addEventListener('click', function(ev){
  const p = st4.pick(ev), x = p[0], y = p[1];
  if(x < 78 && y > 88 && y < 136) setItem(0);
  else if(Math.abs(x - 200) < 26 && Math.abs(y - 140) < 26) setItem(1);
  else if(Math.abs(x - 166) < 28 && y > 216 && y < 264) setItem(2);
  else if(y > 86 && y < 112 && x > 78 && x < 186) setItem(3);
});

/* ================================================================
   绑定
   ================================================================ */
function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会清空画布。屏 2 在 rAF 里每帧重画，静态的屏 1、3、4 必须在这儿补画 */
  draw1(); draw2(0); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:4, sec:'4.1'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('4.1');
  let h = '';
  h += nb.prev ? '<a href="'+nb.prev.f+'">‹ '+nb.prev.id+' '+nb.prev.t+'</a>'
               : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next && nb.next.f ? '<a class="next" href="'+nb.next.f+'">'+nb.next.id+' '+nb.next.t+' ›</a>'
               : '<span>下一节还没做</span>';
  $('pager').innerHTML = h;
})();

loop(function(dt){ if(cur === 1) draw2(dt); });
  }
});
})();
