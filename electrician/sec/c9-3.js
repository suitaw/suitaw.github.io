/* 9.3 控制箱怎么装怎么接 —— 本节内容的唯一真相。
   对应《零基础学电工》第 9 章 9.2.4 节「控制箱的安装与接线」（书内 P172~P174）。

   **9.2.2、9.2.3 整两节不做**（电动机与被拖动设备的安装连接、固定）：
   吊装、对中、装联轴器防护罩、挖基坑、浇混凝土、埋地脚螺栓 ——
   **全是手上的活，网页教不了**，和第 6 章开头、7.2、8.2 那几条声明是同一条。
   这一节做的是 9.2.4，因为它有两样能教的：**箱内布置的道理**和**布线工艺五条**。

   四屏：① 控制箱由什么组成 ② 器件怎么摆 ③ 布线工艺五条 ④ 箱子怎么固定

   数字与说法的出处（书上原文，别凭记忆改）：
   - 「控制箱是电力拖动线路中的重要组成部分，线路中的**控制部件、保护部件及这些部件
     之间的电气连接**等都集中在控制箱内，以便于操作人员**集中安装、维护和操作**」
   - 「安装控制箱前，首先根据控制要求，**将所用电气部件准备齐全**。
     整个安装过程分为**箱内部件的安装与接线、控制箱的固定**两个环节」
   - 「控制箱主要是由**箱体、箱门和箱芯**组成的。控制箱的**箱芯用来安装电气部件**。
     该部分**可以从控制箱内取出**，**根据电气部件的数量确定控制箱外形的尺寸**」
   - 图 9-14 的注：**箱芯主要由立柱和电气安装轨构成**
   - 「在安装过程中，应**先对电气部件进行布置和安装**，然后**根据电路图使用导线
     对各电气部件进行连接**」
   - 「根据电动机控制线路中主、辅电路的连接特点，**以方便接线为原则**，
     确定熔断器、接触器、继电器、热继电器、按钮等部件在控制箱中的位置」
   - 图 9-15 的两条注（原文照录）：
     **「在电力拖动线路中电气部件不太多的情况下，接触器、熔断器等部件比较适合在
     安装板中间按从左到右顺序一字排开，比较容易布线，也不会出现交叉线的情况」**
     **「确定合理的电气部件位置是做好接线工艺的基础，部件位置的布置是否合理将影响到
     后序接线的工艺过程，以及接线后整体板面是否美观」**
   - **布线工艺五条（图 9-16 提示说明原文照录）**：
     · **布线通道应尽可能少，同路并行导线应单层平行密排，按主电路、控制电路分类集中**
     · **布线应横平竖直，分布均匀，垂直转向。同一平面的导线应高低一致或前后一致，
       不能交叉**
     · **布线时可以接触器为中心，按先控制后主电路的顺序进行**
     · **在导线的两端应套上编码套管**，…不宜露铜芯过长
     · **一个元器件接线端子上的连接导线不得多于两根，每节接线端子板上的连接导线连接一根**
   - 图 9-17 控制箱的固定（原文照录）：
     「一般来说，控制箱适合于**墙壁式安装或是落地式安装**，确定安装位置后，
     将控制箱固定孔用**规格合适的螺栓固定或底座固定**即可」
     「在进行**墙壁式**安装时，根据环境的不同，**安装的高度可以为 0.8m、1.2m 或 1.5m**，
     并**与墙壁贴紧**；在进行**落地式**安装时，要尽量保证与地面垂直安装时，
     **其倾斜度也不可以超过 5°**，并且要**做好防水措施**」
     图上还标着：**距离地面不低于 0.8m**

   **一处书上印刷/识别有出入、按现场通行做法教并注明的（屏 3 第 4 条）**：
   布线工艺第 4 条书上那句读作「在导线的两端应套上编码套管，电线压另线绝缘层，
   也不宜露铜芯过长」——**中间那半句文字有出入**。
   按现场通行做法，这一条说的是：**接线端子必须压住铜芯，不能压在绝缘层上；
   同时铜芯也不能露出来太长**。文案里两样都写出来并标明了口径。*/
(function(){
'use strict';
ELEC.reg({
  id: '9.3',
  file: 'c9-3.html',
  title: '9.3 控制箱怎么装怎么接',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>箱子的三块</button>
    <button class="tab" data-i="1"><span class="n">2</span>器件怎么摆</button>
    <button class="tab" data-i="2"><span class="n">3</span>布线五条</button>
    <button class="tab" data-i="3"><span class="n">4</span>怎么固定</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">箱体、箱门、箱芯 —— 能拿出来的是箱芯</div>
    书上把控制箱拆成三块，其中<b>箱芯是能从箱子里整个取出来的那一块</b>，
    电气部件全装在它上面。<b>点一块看它是什么。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">箱体</button>
        <button class="btn sm" data-k="1">箱门</button>
        <button class="btn sm" data-k="2">箱芯</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这一块</div><div class="v" id="s1a">箱体</div></div>
        <div class="num"><div class="k">能不能<br>取出来</div><div class="v" id="s1b">不能</div></div>
        <div class="num hi"><div class="k">上面装<br>什么</div><div class="v" id="s1c">—</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">控制箱是干什么的（书上原话）</div>
    「控制箱是电力拖动线路中的重要组成部分，线路中的
    <b>控制部件、保护部件及这些部件之间的电气连接</b>等都集中在控制箱内，
    以便于操作人员<b>集中安装、维护和操作</b>。」
    <div class="tip info">
      <b>「集中」这两个字是关键。</b>
      <span class="sub">9.1 图 9-1 那张也说过同一件事：
      「按钮开关、指示灯、接触器、继电器、熔断器、接线端子等电气部件
      <b>按照一定的控制关系集中安装在控制箱内</b>」。
      <hr>集中的好处是<b>维护时只需要开一个门</b>；
      代价是<b>箱子里那点空间要装下所有东西</b> ——
      这就是下一屏「器件怎么摆」要解决的问题。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">安装分两个环节（书上原话）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>环节</th><th>做什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">①</td><td><b>箱内部件的安装与接线</b><br>
          <span class="sub">先布置和安装电气部件，然后根据电路图用导线连接</span></td></tr>
        <tr><td class="eu-s">②</td><td><b>控制箱的固定</b><br>
          <span class="sub">墙壁式或落地式，屏 4 讲</span></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>顺序不能反：先布置、再接线。</b>
      <span class="sub">书上写得很明确：「应<b>先对电气部件进行布置和安装</b>，
      然后<b>根据电路图使用导线对各电气部件进行连接</b>」。
      <hr>还有一句在最前面：<b>「安装控制箱前，首先根据控制要求，
      将所用电气部件准备齐全」</b> ——
      装到一半发现少一只接触器，前面接好的线多半要拆。</span>
    </div>
  </div>
</section>

<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">摆得好不好，决定后面接线累不累</div>
    书上给了一条很具体的建议：<b>部件不太多时，接触器、熔断器等在安装板中间
    按从左到右顺序一字排开</b> —— 这样<b>容易布线，也不会出现交叉线</b>。
    <b>点两种摆法对比。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">一字排开</button>
        <button class="btn sm" data-k="1">随手摆</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这种摆法</div><div class="v" id="s2a">一字排开</div></div>
        <div class="num"><div class="k">交叉线</div><div class="v" id="s2b">0 处</div></div>
        <div class="num hi"><div class="k">好不好<br>接线</div><div class="v" id="s2c">好接</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">图 9-15 的两条注（书上原文照录）</div>
    <div class="tip info" style="margin-top:0">
      <b>「在电力拖动线路中电气部件不太多的情况下，接触器、熔断器等部件比较适合在
      安装板中间按从左到右顺序一字排开，比较容易布线，也不会出现交叉线的情况。」</b>
    </div>
    <div class="tip info">
      <b>「确定合理的电气部件位置是做好接线工艺的基础，部件位置的布置是否合理
      将影响到后序接线的工艺过程，以及接线后整体板面是否美观。」</b>
    </div>
    <div class="tip">
      <b>注意第一条的前提：「电气部件不太多的情况下」。</b>
      <span class="sub">部件多了排不下一行，就要分层 —— 那时候的原则变成
      <b>「按主电路、控制电路分类集中」</b>（下一屏布线五条的第一条）：
      主电路的器件排一层，控制回路的排另一层。
      <hr>另外「以方便接线为原则」这句话是书上明写的：
      <b>确定熔断器、接触器、继电器、热继电器、按钮等部件在控制箱中的位置，
      以方便接线为原则。</b></span>
    </div>
  </div>
</section>

<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">布线工艺五条，条条能拿去对照验收</div>
    这五条是书上图 9-16 的提示说明，<b>一字不差都是可以拿去检查的判据</b>。
    <b>点一条看它管什么、违反了会怎样。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">① 分类集中</button>
        <button class="btn sm" data-k="1">② 横平竖直</button>
        <button class="btn sm" data-k="2">③ 先控后主</button>
      </div>
      <div class="btns" id="s3k2">
        <button class="btn sm" data-k="3">④ 编码套管</button>
        <button class="btn sm" data-k="4">⑤ 不超两根</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这一条</div><div class="v" id="s3a">分类集中</div></div>
        <div class="num"><div class="k">管什么</div><div class="v" id="s3b">走线通道</div></div>
        <div class="num hi"><div class="k">违反了<br>会怎样</div><div class="v" id="s3c">乱</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">五条原文（书上图 9-16 提示说明）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>条</th><th>书上写的</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">①</td><td><b>布线通道应尽可能少，同路并行导线应单层平行密排，
          按主电路、控制电路分类集中</b></td></tr>
        <tr><td class="eu-s">②</td><td><b>布线应横平竖直，分布均匀，垂直转向。
          同一平面的导线应高低一致或前后一致，不能交叉</b></td></tr>
        <tr><td class="eu-s">③</td><td><b>布线时可以接触器为中心，
          按先控制后主电路的顺序进行</b></td></tr>
        <tr><td class="eu-s">④</td><td><b>在导线的两端应套上编码套管</b>，
          端子压铜芯不压绝缘层，<b>也不宜露铜芯过长</b></td></tr>
        <tr><td class="eu-s">⑤</td><td><b>一个元器件接线端子上的连接导线不得多于两根，
          每节接线端子板上的连接导线连接一根</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>第 ④ 条书上那句的中间半句印得不清楚，按现场通行做法写在这儿：</b>
      <span class="sub"><b>接线端子必须压住铜芯，不能压在绝缘层上</b>
      （压绝缘层等于根本没接上，而且外观看起来是接好的）；
      <b>同时铜芯也不能露出来太长</b>（露出来的部分会碰到旁边的端子或箱壁）。
      <hr>这两条 6.3 讲连接头加工时给过具体尺寸，可以对照着用。</span>
    </div>
  </div>
</section>

<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">两种装法，各有各的数</div>
    <b>墙壁式</b>：高度 0.8m / 1.2m / 1.5m，与墙壁贴紧。
    <b>落地式</b>：倾斜度不超过 5°，做好防水。
    <b>点一种，拖滑杆看是否合格。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">墙壁式</button>
        <button class="btn sm" data-k="1">落地式</button>
      </div>
      <div class="rowlab" id="s4lab">安装高度　<b id="s4v">1.20 m</b></div>
      <input type="range" id="s4s" min="30" max="200" step="5" value="120">
      <div class="nums three">
        <div class="num"><div class="k">这种装法</div><div class="v" id="s4a">墙壁式</div></div>
        <div class="num"><div class="k">当前</div><div class="v" id="s4b">1.20 m</div></div>
        <div class="num hi"><div class="k">合不合格</div><div class="v" id="s4c">合格</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">图 9-17 的原文</div>
    「一般来说，控制箱适合于<b>墙壁式安装或是落地式安装</b>，确定安装位置后，
    将控制箱固定孔用<b>规格合适的螺栓固定或底座固定</b>即可。」
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>装法</th><th>书上给的数</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">墙壁式</td>
          <td>根据环境的不同，安装的高度可以为 <b>0.8m、1.2m 或 1.5m</b>，
            并<b>与墙壁贴紧</b>；图上另标着<b>距离地面不低于 0.8m</b></td></tr>
        <tr><td class="eu-s">落地式</td>
          <td>尽量保证与地面垂直安装，<b>其倾斜度也不可以超过 5°</b>，
            并且要<b>做好防水措施</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>0.8m 这个下限和 8.2 讲的配电盘 1.9m 不是一回事。</b>
      <span class="sub">配电盘装 1.9m 是因为里面是<b>带电的断路器</b>，
      要防止人随手碰到；控制箱的门上是<b>按钮和指示灯</b>，
      操作工要天天按，太高反而不好用。
      <hr>0.8m 的下限是防<b>地面积水、防人踢到、防清扫时被水冲</b> ——
      跟落地式那条「做好防水措施」是同一个考虑。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="9.3">
    <div class="qz" data-q="控制箱由箱体、箱门和箱芯组成。哪一块是能从箱子里整个取出来的？"
      data-opts="箱体|箱门|箱芯——电气部件全装在它上面，它主要由立柱和电气安装轨构成"
      data-right="2"
      data-why="书上原话：控制箱主要是由箱体、箱门和箱芯组成的。控制箱的箱芯用来安装电气部件，该部分可以从控制箱内取出，根据电气部件的数量确定控制箱外形的尺寸。图 9-14 的注还说明了它的结构：箱芯主要由立柱和电气安装轨构成。能取出来这一点很实用——装配和接线可以在工作台上做，比钻进箱子里方便得多。"></div>
    <div class="qz" data-q="书上说部件不太多时，接触器、熔断器等适合怎么摆？"
      data-opts="按功能分层，主电路一层、控制回路一层|在安装板中间按从左到右顺序一字排开——容易布线，也不会出现交叉线|沿箱体四周围一圈"
      data-right="1"
      data-why="书上原话：在电力拖动线路中电气部件不太多的情况下，接触器、熔断器等部件比较适合在安装板中间按从左到右顺序一字排开，比较容易布线，也不会出现交叉线的情况。注意前提是「部件不太多」——多到排不下一行才分层，那时候的原则变成布线五条第一条的「按主电路、控制电路分类集中」。"></div>
    <div class="qz" data-q="布线工艺里，一个元器件的接线端子上最多能接几根导线？"
      data-opts="不限，接得下就行|不得多于两根；每节接线端子板上连接一根|只能一根"
      data-right="1"
      data-why="书上原话：一个元器件接线端子上的连接导线不得多于两根，每节接线端子板上的连接导线连接一根。为什么限制根数——一个端子压两根以上，螺钉很难把每根都压实，总有一根是松的；而松的接头就是接触电阻大→发热→氧化→电阻更大那条链的起点（8.2 屏 4 讲过）。真要接多根，用端子排分开。"></div>
    <div class="qz" data-q="控制箱做墙壁式安装，书上给的高度是多少？"
      data-opts="1.9 m|0.8m、1.2m 或 1.5m，根据环境选，且距地面不低于 0.8m|随便，能操作就行"
      data-right="1"
      data-why="书上原话：在进行墙壁式安装时，根据环境的不同，安装的高度可以为 0.8m、1.2m 或 1.5m，并与墙壁贴紧；图上另标着距离地面不低于 0.8m。1.9 m 是 8.2 讲的用户配电盘的高度，那是因为盘里是带电的断路器要防人随手碰；控制箱门上是按钮和指示灯，操作工天天按，装太高反而不好用。0.8m 的下限是防地面积水、防踢到、防清扫时被水冲。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 9 章 9.2.4 节（书内 P172~P174）</div>
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
function seg(g, pts, c, lw){ new Path(pts).stroke(g, lw || 2, c || C.wire); }
const CONC = { ok:['okbg','ok'], err:['errbg','err'], warn:['warnbg','warn'], acc:['accbg','acc'] };
function conc(g, y, kind, l1, l2){
  const m = CONC[kind] || CONC.acc;
  box(g, 16, y, 328, 34, 6, C[m[0]], C[m[1]], 1);
  txt(g, l1, 180, y + 13, {sz:10.5, b:1, c:C[m[1]]});
  txt(g, l2, 180, y + 26, {sz:9, c:C.tx2});
}
/* 一个电气部件的小方块（DIN 导轨上那种） */
function part(g, x, y, w, h, name, col, slim){
  box(g, x, y, w, h, 3, C.card, col || P.creamD, 1.3);
  if(slim){
    /* 端子排：一排小竖格，不画上下银条（高度小的时候银条会把文字压没）*/
    g.save(); g.strokeStyle = P.steelD; g.lineWidth = 0.8;
    for(let i = 1; i * 12 < w; i++){
      g.beginPath(); g.moveTo(x + i*12, y + 2); g.lineTo(x + i*12, y + h - 2); g.stroke();
    }
    g.restore();
  } else {
    box(g, x + 2, y + 3, w - 4, 5, 1, P.steel, P.steelD, 0.7);
    box(g, x + 2, y + h - 8, w - 4, 5, 1, P.steel, P.steelD, 0.7);
  }
  if(name) txt(g, name, x + w/2, y + h/2, {sz:7.5, b:1, c:C.tx2});
}

/* ================================================================
   场景 1：箱体、箱门、箱芯
   ================================================================
   画一个打开门的箱子：箱体（外壳）、箱门（右边那扇）、箱芯（里面那块板）。
   **箱芯要画成能抽出来的** —— 这是这一屏唯一要记住的事 */
const S1 = { k:0 };
const BOX3 = [
  {n:'箱体', out:'不能', has:'—',
   d:'箱子的外壳，<b>固定在墙上或地上的那一部分</b>。' +
     '<hr>8.2 讲配电箱时给过箱体的三条硬要求，控制箱同理：' +
     '<b>要有产品合格证和耐压检测证明、冷轧钢板或阻燃绝缘材料、连接部位做防锈处理</b>。' +
     '<hr><b>箱体是接地的</b> —— 万一箱内某根相线碰到箱壁，' +
     '靠它把故障电流导走让保护动作。所以<b>箱体的接地螺钉必须接好</b>，' +
     '这一条在验收时是要查的。'},
  {n:'箱门', out:'开合', has:'按钮、指示灯',
   d:'门上装的是<b>要给人操作和看的东西</b>：按钮开关、指示灯。' +
     '9.1 屏 3 讲两个指示灯时说过 —— <b>门是关着的，' +
     '指示灯回答的正是「我现在能不能开门」</b>。' +
     '<hr>门和箱芯之间的连线要留出<b>足够的余量</b>，' +
     '而且开合处要用<b>软线</b>（多股）：' +
     '开门关门几千次之后，单股硬线会在弯折处断掉。' +
     '<hr>这也是 6.1 讲导线时那条区分的实际用途：' +
     '<b>固定敷设用单股，要活动的地方用多股软线。</b>'},
  {n:'箱芯', out:'能取出', has:'全部电气部件',
   d:'书上原话：<b>控制箱的箱芯用来安装电气部件。该部分可以从控制箱内取出，' +
     '根据电气部件的数量确定控制箱外形的尺寸。</b>' +
     '图 9-14 的注还说明了它的结构：<b>箱芯主要由立柱和电气安装轨构成。</b>' +
     '<hr><b>「可以取出」这一点非常实用</b>：' +
     '装配和接线可以<b>在工作台上做</b>，比钻进箱子里、举着胳膊拧螺钉方便得多；' +
     '检修时也能整块换下来。' +
     '<hr>「电气安装轨」就是 <b>DIN 导轨</b>，' +
     '断路器、接触器、端子排全是卡在它上面的 —— ' +
     '这也是 8.3 讲断路器型号时那些模块化器件能一排排卡上去的原因。'}
];
function draw1(){
  const g = st1.g; st1.clear();
  const k = S1.k;
  EP.heading(g, 14, 20, '控制箱', '箱体 ＋ 箱门 ＋ 箱芯');

  /* 箱体 */
  box(g, 40, 52, 176, 152, 5, C.box, k === 0 ? C.acc : C.boxLine, k === 0 ? 2 : 1.5);
  /* 箱芯（里面那块板，画成往右抽出来一点） */
  const cxOff = 0;                     /* 平移会被斜着的箱门挡住，改用 hot 环标 */
  box(g, 56 + cxOff, 66, 144, 124, 4,
      k === 2 ? C.accbg : C.card, k === 2 ? C.acc : C.boxLine, k === 2 ? 2 : 1.3);
  /* 电气安装轨 + 几个部件 */
  [92, 130, 168].forEach(function(y){
    seg(g, [[62 + cxOff, y],[194 + cxOff, y]], P.steelD, 3);
  });
  [[68, 78, 24], [98, 78, 24], [128, 78, 24], [162, 78, 30]].forEach(function(a){
    part(g, a[0] + cxOff, a[1], a[2], 24, '');
  });
  [[68, 116, 30], [104, 116, 30], [140, 116, 24], [170, 116, 24]].forEach(function(a){
    part(g, a[0] + cxOff, a[1], a[2], 24, '');
  });
  part(g, 68 + cxOff, 154, 126, 22, '接线端子排', null, true);
  if(k === 2) hot(g, 128, 128, 0, {w:152, h:132, r:8});
  /* 箱门（右边那扇，开着） */
  g.save();
  g.translate(216, 52);
  g.transform(1, 0, -0.34, 1, 0, 0);
  box(g, 0, 0, 62, 152, 4, C.box, k === 1 ? C.acc : C.boxLine, k === 1 ? 2 : 1.5);
  /* 门上的按钮和指示灯 */
  g.save(); g.fillStyle = C.ok; g.globalAlpha = .55;
  g.beginPath(); g.arc(31, 34, 9, 0, Math.PI*2); g.fill(); g.restore();
  g.save(); g.fillStyle = C.err; g.globalAlpha = .55;
  g.beginPath(); g.arc(31, 62, 9, 0, Math.PI*2); g.fill(); g.restore();
  g.save(); g.fillStyle = C.warn; g.globalAlpha = .45;
  g.beginPath(); g.arc(31, 100, 7, 0, Math.PI*2); g.fill(); g.restore();
  g.save(); g.fillStyle = C.tx3; g.globalAlpha = .35;
  g.beginPath(); g.arc(31, 124, 7, 0, Math.PI*2); g.fill(); g.restore();
  g.restore();
  txt(g, '箱门', 268, 224, {sz:8.5, b:1, c: k === 1 ? C.acc : C.tx3});
  txt(g, '按钮 ＋ 指示灯', 268, 238, {sz:7.5, c:C.tx3});
  txt(g, '箱体', 48, 224, {sz:8.5, b:1, c: k === 0 ? C.acc : C.tx3, al:'left'});
  txt(g, '箱芯', 132, 224, {sz:8.5, b:1, c: k === 2 ? C.acc : C.tx3});
  txt(g, '立柱 ＋ 电气安装轨', 132, 238, {sz:7.5, c:C.tx3});

  const b = BOX3[k];
  conc(g, 254, k === 2 ? 'ok' : 'acc', b.n + '：' + (k === 2 ? '可以从控制箱内取出' :
    (k === 1 ? '装按钮开关和指示灯' : '固定在墙上或地上的外壳')),
    k === 2 ? '书上：根据电气部件的数量确定控制箱外形的尺寸' :
      (k === 1 ? '门是关着的 —— 指示灯就是为这一刻装的' : '箱体是接地的，接地螺钉必须接好'));
}
function note1(){
  const b = BOX3[S1.k];
  $('s1a').textContent = b.n;
  $('s1b').textContent = b.out;
  $('s1c').textContent = b.has;
  $('n0').innerHTML = '<div class="st">' + b.n + '</div>' + b.d;
}

/* ================================================================
   场景 2：器件怎么摆
   ================================================================
   左右两块安装板：一字排开 vs 随手摆。**连线画出来才看得出交叉**，
   所以两边都要画同样的三条连线 */
const S2 = { k:0 };
/* [x, y, w, 名字]；两种摆法的坐标不同，连线关系一样 */
const LAY = [
  /* 一字排开 */
  [[34, 96, 40, 'QF'], [86, 96, 40, 'FU'], [138, 96, 46, 'KM'], [196, 96, 40, 'FR'],
   [248, 96, 44, '端子']],
  /* 随手摆 */
  [[38, 62, 40, 'QF'], [206, 130, 40, 'FU'], [98, 148, 46, 'KM'], [150, 62, 40, 'FR'],
   [252, 66, 44, '端子']]
];
function draw2(){
  const g = st2.g; st2.clear();
  const k = S2.k, L = LAY[k];
  EP.heading(g, 14, 20, k ? '随手摆' : '一字排开',
             k ? '连线到处交叉' : '书上推荐的摆法');

  box(g, 22, 46, 316, 148, 5, C.box, C.boxLine, 1.4);
  /* 一字排开那种画一条导轨 */
  if(!k) seg(g, [[30, 108],[330, 108]], P.steelD, 4);

  /* 连线：QF→FU→KM→FR→端子，按顺序连 */
  const cross = [];
  for(let i = 0; i + 1 < L.length; i++){
    const a = L[i], b = L[i+1];
    const ax = a[0] + a[2], ay = a[1] + 12, bx = b[0], by = b[1] + 12;
    const mid = (ax + bx) / 2;
    new Path([[ax, ay],[mid, ay],[mid, by],[bx, by]]).stroke(g, 2, k ? C.err : C.ok);
    if(k) cross.push([mid, (ay + by)/2]);
  }
  L.forEach(function(a){ part(g, a[0], a[1], a[2], 24, a[3], k ? C.err : C.ok); });
  if(k){
    /* 交叉点画一圈 */
    [[148, 100],[196, 130]].forEach(function(c){
      g.save(); g.setLineDash([3,3]); g.strokeStyle = C.err; g.lineWidth = 1.4;
      g.beginPath(); g.arc(c[0], c[1], 12, 0, Math.PI*2); g.stroke(); g.restore();
    });
    EP.chip(g, '交叉了', 172, 176, {sz:8.5, b:1, c:C.err});
  } else {
    EP.chip(g, '一条直线走完，不用绕', 180, 176, {sz:8.5, b:1, c:C.ok});
  }

  conc(g, 206, k ? 'err' : 'ok',
    k ? '连线到处绕、还交叉' : '接触器、熔断器等从左到右一字排开',
    k ? '布线五条第 ② 条：同一平面的导线…不能交叉' :
        '书上：比较容易布线，也不会出现交叉线的情况');
}
function note2(){
  const k = S2.k;
  $('s2a').textContent = k ? '随手摆' : '一字排开';
  $('s2b').textContent = k ? '2 处' : '0 处';
  $('s2c').textContent = k ? '难接' : '好接';
  const T = [
    ['一字排开：按电流走的顺序摆',
     '书上原话：<b>在电力拖动线路中电气部件不太多的情况下，' +
     '接触器、熔断器等部件比较适合在安装板中间按从左到右顺序一字排开，' +
     '比较容易布线，也不会出现交叉线的情况。</b>' +
     '<hr><b>「从左到右」指的是电流走的顺序</b>：' +
     '总断路器 → 熔断器 → 接触器 → 热继电器 → 端子排。' +
     '按这个顺序摆，<b>连线就是一条直线走完，一根都不用绕</b>。' +
     '<hr>还有一句是书上明写的原则：' +
     '<b>确定各部件在控制箱中的位置，以方便接线为原则</b>。' +
     '<hr><b>前提是「部件不太多」</b> —— 多到一行排不下就要分层，' +
     '那时候的原则变成下一屏第 ① 条的' +
     '<b>「按主电路、控制电路分类集中」</b>。'],
    ['随手摆：接线时全是账',
     '器件位置一乱，连线就得<b>来回绕、上下穿</b>，' +
     '最后必然出现<b>交叉</b> —— 而交叉正是布线五条第 ② 条明令禁止的。' +
     '<hr>书上那句说得很实在：<b>「确定合理的电气部件位置是做好接线工艺的基础，' +
     '部件位置的布置是否合理将影响到后序接线的工艺过程，' +
     '以及接线后整体板面是否美观。」</b>' +
     '<hr><b>「美观」不只是好看。</b>8.2 屏 4 讲配电盘时说过三个实打实的理由：' +
     '① 缠成一团的线<b>查故障时追不出哪根接哪儿</b>；' +
     '② 线挤在一起<b>散热差</b>，加速绝缘老化；' +
     '③ <b>关箱门时挤压到线，绝缘破损了你也看不见</b>。' +
     '<hr>这一屏真正的教训是：<b>布线难不难，在摆器件那一刻就定了。</b>' +
     '等到接线时才发现绕不开，只能拆了重排。']
  ][k];
  $('n1').innerHTML = '<div class="st' + (k ? ' bad' : '') + '">' + T[0] + '</div>' + T[1];
}

/* ================================================================
   场景 3：布线工艺五条
   ================================================================
   每一条画一张对照小图（对 / 错），下面配原文 */
const S3 = { k:0 };
const RULE = [
  {n:'分类集中', what:'走线通道', bad:'乱',
   txt:'布线通道应尽可能少，同路并行导线应<b>单层平行密排</b>，' +
     '按<b>主电路、控制电路分类集中</b>',
   d:'三件事，一件一件拆：' +
     '<hr><b>「布线通道应尽可能少」</b> —— 线不要东一条西一条，' +
     '归拢成几条固定的通道走。' +
     '<hr><b>「同路并行导线应单层平行密排」</b> —— 走同一条路的线，' +
     '<b>排成一层、平行、挨紧</b>，不要叠在一起。' +
     '叠着的坏处：散热差、下面那根想抽出来得先拆上面的。' +
     '<hr><b>「按主电路、控制电路分类集中」</b> —— ' +
     '主电路的线走一路，控制回路的线走另一路，<b>不混着走</b>。' +
     '<hr>为什么要分开：<b>粗细不同、电压不同、查故障时关注的对象也不同</b>。' +
     '主电路那几根是 380V 大电流的粗线，控制回路是细线；' +
     '混在一起既难看又难查。'},
  {n:'横平竖直', what:'走线形状', bad:'交叉',
   txt:'布线应<b>横平竖直，分布均匀，垂直转向</b>。' +
     '同一平面的导线应<b>高低一致或前后一致，不能交叉</b>',
   d:'<b>「横平竖直、垂直转向」</b>：线要么横着走要么竖着走，' +
     '转弯时拐<b>直角</b>，不要斜着抄近路。' +
     '<hr>斜着走看着省线，实际有三个问题：' +
     '<b>后来的线没法沿着它走</b>（破坏了通道）、' +
     '<b>查线时眼睛跟不住</b>、<b>不好固定</b>。' +
     '<hr><b>「不能交叉」是这一条的硬判据</b> —— ' +
     '而交叉往往不是接线的问题，是<b>器件位置摆得不合理</b>（屏 2 讲的）。' +
     '<hr>「同一平面的导线应高低一致或前后一致」说的是<b>整齐</b>：' +
     '几根并排走的线，要么都在同一高度，要么都在同一前后位置。'},
  {n:'先控后主', what:'接线顺序', bad:'够不着',
   txt:'布线时可<b>以接触器为中心</b>，按<b>先控制后主电路</b>的顺序进行',
   d:'<b>为什么以接触器为中心</b>：控制回路和主电路<b>在接触器这里交汇</b> ——' +
     '它的线圈和辅助触点属于控制回路，主触头属于主电路。' +
     '从它开始向两边接，路径最短。' +
     '<hr><b>为什么先控制后主电路</b>：' +
     '控制回路的线细、接线端子小、位置往往更靠里；' +
     '<b>主电路那几根粗线一旦先接上，就会挡住里面的操作空间</b>。' +
     '<hr>这是纯粹的手上经验，但它有一个通用的形式：' +
     '<b>先接够不着的，再接够得着的</b>。' +
     '拆的时候反过来 —— 先拆外面的粗线。'},
  {n:'编码套管', what:'端子和线头', bad:'认不出',
   txt:'在导线的<b>两端应套上编码套管</b>；端子压铜芯不压绝缘层，' +
     '<b>也不宜露铜芯过长</b>',
   d:'<b>编码套管</b>就是套在线头上、印着编号的小管子。' +
     '<b>两端都要套，而且是同一个号</b> ——' +
     '这样从任意一头都能查到另一头接在哪儿。' +
     '<hr>4.5 讲原理图↔接线图时那条<b>「接线看编号不看位置」</b>，' +
     '前提就是这些编号真的套上去了。' +
     '<b>没有编码套管的柜子，查一根线要用万用表一根根量。</b>' +
     '<hr><b>第二半句书上印得不太清楚，按现场通行做法说：</b>' +
     '<b>接线端子必须压住铜芯，不能压在绝缘层上</b> ——' +
     '压绝缘层等于根本没接上，可外观看起来是接好的，' +
     '是最难查的一种故障。' +
     '<b>同时铜芯也不能露出来太长</b>，露出来的部分会碰到旁边的端子或箱壁。' +
     '<hr>具体尺寸 6.3 那节给过，可以对照着用。'},
  {n:'不超两根', what:'一个端子接几根', bad:'压不实',
   txt:'<b>一个元器件接线端子上的连接导线不得多于两根</b>，' +
     '<b>每节接线端子板上的连接导线连接一根</b>',
   d:'<b>为什么限根数：压不实。</b>' +
     '一个端子里塞三根线，螺钉压下去总有一根被架空 ——' +
     '而<b>松的接头就是「接触电阻大 → 发热 → 氧化 → 电阻更大」那条链的起点</b>' +
     '（8.2 屏 4 讲过）。' +
     '<hr>更麻烦的是这种故障<b>不会立刻出现</b>：' +
     '装的时候一切正常，运行几个月之后才开始时好时坏、端子发黑。' +
     '<hr><b>真要接多根怎么办：用端子排分开。</b>' +
     '书上后半句写得很死 —— <b>每节接线端子板上的连接导线连接一根</b>。' +
     '端子排就是为这件事存在的：把一个点分成好几节，一节接一根。'}
];
function draw3(){
  const g = st3.g; st3.clear();
  const k = S3.k, r = RULE[k];
  EP.heading(g, 14, 20, '第 ' + (k+1) + ' 条', r.n);

  /* 左错右对两块小图 */
  [[26, false], [190, true]].forEach(function(a){
    const x0 = a[0], okk = a[1];
    EP.chip(g, okk ? '对' : '错', x0 + 72, 44, {sz:9, b:1, c: okk ? C.ok : C.err});
    box(g, x0, 56, 144, 104, 5, C.box, C.boxLine, 1.2);
    const col = okk ? C.ok : C.err;
    if(k === 0){
      /* 分类集中：错=混着走，对=分两条通道 */
      if(!okk){
        [[10, 74],[10, 92],[10, 110],[10, 128]].forEach(function(p, i){
          new Path([[x0+p[0], p[1]],[x0+50, p[1] + (i%2?14:-8)],
                    [x0+96, p[1] + (i%2?-6:12)],[x0+134, p[1]]]).stroke(g, 2, i<2?C.L:C.acc);
        });
      } else {
        [76, 88].forEach(function(y){ seg(g, [[x0+10, y],[x0+134, y]], C.L, 2); });
        [122, 134].forEach(function(y){ seg(g, [[x0+10, y],[x0+134, y]], C.acc, 2); });
        txt(g, '主电路', x0 + 72, 104, {sz:7.5, b:1, c:C.L});
        txt(g, '控制回路', x0 + 72, 148, {sz:7.5, b:1, c:C.acc});
      }
    } else if(k === 1){
      /* 横平竖直：错=斜线交叉，对=直角 */
      if(!okk){
        new Path([[x0+14, 74],[x0+130, 140]]).stroke(g, 2, col);
        new Path([[x0+14, 140],[x0+130, 74]]).stroke(g, 2, col);
        g.save(); g.setLineDash([3,3]); g.strokeStyle = C.err; g.lineWidth = 1.4;
        g.beginPath(); g.arc(x0+72, 107, 12, 0, Math.PI*2); g.stroke(); g.restore();
      } else {
        new Path([[x0+14, 78],[x0+72, 78],[x0+72, 140]]).stroke(g, 2, col);
        new Path([[x0+14, 96],[x0+96, 96],[x0+96, 140]]).stroke(g, 2, col);
        new Path([[x0+14, 114],[x0+120, 114],[x0+120, 140]]).stroke(g, 2, col);
      }
    } else if(k === 2){
      /* 先控后主：错=粗线先接挡住里面 */
      part(g, x0 + 50, 92, 44, 30, 'KM', col);
      if(!okk){
        [72, 78, 84].forEach(function(y){ seg(g, [[x0+8, y],[x0+136, y]], C.L, 3.4); });
        EP.chip(g, '粗线先接　挡住了', x0 + 72, 140, {sz:7.5, b:1, c:C.err});
      } else {
        [136, 142].forEach(function(y){ seg(g, [[x0+8, y],[x0+136, y]], C.acc, 1.8); });
        EP.chip(g, '先接控制回路', x0 + 72, 74, {sz:7.5, b:1, c:C.ok});
      }
    } else if(k === 3){
      /* 编码套管 + 压铜芯 */
      const wy = 96;
      g.save(); g.lineCap = 'round';
      g.strokeStyle = '#2b4a6f'; g.lineWidth = 13;
      g.beginPath(); g.moveTo(x0+16, wy); g.lineTo(x0+96, wy); g.stroke();
      g.strokeStyle = P.copper; g.lineWidth = 6;
      g.beginPath(); g.moveTo(x0+90, wy); g.lineTo(x0 + (okk ? 118 : 134), wy); g.stroke();
      g.restore();
      /* 端子 */
      box(g, x0 + 96, wy - 13, 26, 26, 3, P.steel, P.steelD, 1.2);
      if(!okk){
        EP.chip(g, '压在绝缘层上', x0 + 72, 132, {sz:7.5, b:1, c:C.err});
        EP.chip(g, '铜芯露太长', x0 + 96, 62, {sz:7.5, b:1, c:C.err});
      } else {
        box(g, x0 + 34, wy - 9, 26, 18, 3, C.card, C.ok, 1.4);
        txt(g, '12', x0 + 47, wy, {sz:8, b:1, c:C.ok});
        EP.chip(g, '编码套管', x0 + 47, 68, {sz:7.5, b:1, c:C.ok});
        EP.chip(g, '压住铜芯', x0 + 100, 132, {sz:7.5, b:1, c:C.ok});
      }
    } else {
      /* 一个端子几根线 */
      const ty = 104;
      box(g, x0 + 52, ty - 16, 40, 32, 3, P.steel, P.steelD, 1.3);
      const n = okk ? 2 : 4;
      for(let i = 0; i < n; i++){
        const yy = ty - 12 + i * (24 / (n - 1));
        seg(g, [[x0 + 8, yy],[x0 + 52, yy]], col, 2.4);
      }
      txt(g, n + ' 根', x0 + 30, ty + 34, {sz:9, b:1, c: col});
      if(okk){
        seg(g, [[x0 + 92, ty],[x0 + 136, ty]], C.ok, 2.4);
        EP.chip(g, '最多两根', x0 + 72, 66, {sz:7.5, b:1, c:C.ok});
      } else {
        EP.chip(g, '总有一根压不实', x0 + 72, 66, {sz:7.5, b:1, c:C.err});
      }
    }
  });

  conc(g, 176, 'ok', '第 ' + (k+1) + ' 条　' + r.n, r.txt.replace(/<\/?b>/g, ''));
}
function note3(){
  const r = RULE[S3.k];
  $('s3a').textContent = r.n;
  $('s3b').textContent = r.what;
  $('s3c').textContent = r.bad;
  $('n2').innerHTML = '<div class="st">第 ' + (S3.k+1) + ' 条：' + r.n + '</div>' +
    '<b>书上原话：</b>' + r.txt + '<hr>' + r.d;
}

/* ================================================================
   场景 4：控制箱怎么固定
   ================================================================
   墙壁式：拖高度滑杆；落地式：拖倾斜度滑杆。**判据都来自书上那几个数** */
const S4 = { k:0, h:120, a:0 };
function ok4(){
  if(S4.k === 0) return S4.h >= 80;          /* 距地面不低于 0.8m */
  return S4.a <= 5;                          /* 倾斜度不超过 5° */
}
function best4(){ return S4.k === 0 && [80, 120, 150].indexOf(S4.h) >= 0; }
function draw4(){
  const g = st4.g; st4.clear();
  const k = S4.k;
  EP.heading(g, 14, 20, k ? '落地式' : '墙壁式',
             k ? '倾斜度不可以超过 5°' : '0.8m / 1.2m / 1.5m');

  const GY = 210, PXM = 78;                  /* 地面 y，1 米多少像素 */
  seg(g, [[20, GY],[340, GY]], C.boxLine, 2.6);
  /* 放地面线上方会被「做好防水措施」那个框压住，挪到线下方 */
  txt(g, '地面', 334, GY + 14, {sz:8.5, c:C.tx3, al:'right'});

  if(k === 0){
    /* 墙 */
    box(g, 40, 40, 18, GY - 40, 0, C.box, C.boxLine, 1.4);
    txt(g, '墙', 49, 56, {sz:8.5, b:1, c:C.tx3});
    const y = GY - S4.h / 100 * PXM;
    const good = ok4();
    box(g, 58, y - 34, 74, 68, 5, C.box, good ? C.ok : C.err, 1.8);
    g.save(); g.fillStyle = C.ok; g.globalAlpha = .5;
    g.beginPath(); g.arc(95, y - 14, 6, 0, Math.PI*2); g.fill(); g.restore();
    g.save(); g.fillStyle = C.err; g.globalAlpha = .5;
    g.beginPath(); g.arc(95, y + 6, 6, 0, Math.PI*2); g.fill(); g.restore();
    /* 尺寸线 */
    const dx = 168;
    g.save(); g.strokeStyle = good ? C.ok : C.err; g.lineWidth = 1.2;
    g.beginPath(); g.moveTo(dx - 5, GY); g.lineTo(dx + 5, GY);
    g.moveTo(dx - 5, y); g.lineTo(dx + 5, y);
    g.moveTo(dx, GY); g.lineTo(dx, y); g.stroke(); g.restore();
    EC.head(g, dx, y, 0, -1, 4.6, good ? C.ok : C.err);
    EC.head(g, dx, GY, 0, 1, 4.6, good ? C.ok : C.err);
    EP.chip(g, (S4.h/100).toFixed(2) + ' m', dx, (y + GY)/2, {sz:9.5, b:1, c: good ? C.ok : C.err});
    g.save(); g.setLineDash([3,3]); g.strokeStyle = C.tx3; g.lineWidth = 1;
    g.beginPath(); g.moveTo(132, y); g.lineTo(dx, y); g.stroke(); g.restore();
    /* 书上那三档画成刻度 */
    [80, 120, 150].forEach(function(v){
      const yy = GY - v / 100 * PXM;
      seg(g, [[214, yy],[228, yy]], C.acc, 1.6);
      txt(g, (v/100).toFixed(1) + ' m', 234, yy, {sz:8, b:1, c:C.acc, al:'left'});
    });
    txt(g, '书上给的三档', 214, GY - 1.72*PXM, {sz:8, c:C.tx3, al:'left'});
    conc(g, 238, best4() ? 'ok' : (ok4() ? 'acc' : 'err'),
      best4() ? '正好是书上给的一档' : (ok4() ? '高于 0.8 m，可以' : '低于 0.8 m —— 不合格'),
      '书上：安装高度可以为 0.8m、1.2m 或 1.5m，距离地面不低于 0.8m');
  } else {
    /* 落地式：一个箱子立在地上，可以倾斜 */
    const good = ok4();
    g.save();
    g.translate(150, GY);
    g.rotate(-S4.a * Math.PI / 180);
    box(g, -44, -128, 88, 128, 5, C.box, good ? C.ok : C.err, 1.8);
    g.save(); g.fillStyle = C.ok; g.globalAlpha = .5;
    g.beginPath(); g.arc(0, -96, 7, 0, Math.PI*2); g.fill(); g.restore();
    g.save(); g.fillStyle = C.err; g.globalAlpha = .5;
    g.beginPath(); g.arc(0, -72, 7, 0, Math.PI*2); g.fill(); g.restore();
    g.restore();
    /* 垂直参考线 */
    g.save(); g.setLineDash([4,4]); g.strokeStyle = C.tx3; g.lineWidth = 1.2;
    g.beginPath(); g.moveTo(150, GY); g.lineTo(150, GY - 140); g.stroke(); g.restore();
    txt(g, '垂直', 150, GY - 150, {sz:8, c:C.tx3});
    /* 角度弧 */
    g.save(); g.strokeStyle = good ? C.ok : C.err; g.lineWidth = 1.6;
    g.beginPath(); g.arc(150, GY, 60, -Math.PI/2, -Math.PI/2 + S4.a * Math.PI/180); g.stroke();
    g.restore();
    EP.chip(g, S4.a.toFixed(0) + '°', 196, GY - 48, {sz:10, b:1, c: good ? C.ok : C.err});
    /* 5° 界线 */
    g.save(); g.strokeStyle = C.acc; g.lineWidth = 1.2; g.setLineDash([3,3]);
    g.beginPath(); g.moveTo(150, GY);
    g.lineTo(150 + Math.sin(5*Math.PI/180)*150, GY - Math.cos(5*Math.PI/180)*150);
    g.stroke(); g.restore();
    txt(g, '5° 界线', 232, GY - 132, {sz:8, b:1, c:C.acc, al:'left'});
    /* 防水 */
    box(g, 250, GY - 46, 80, 34, 4, C.warnbg, C.warn, 1.2);
    txt(g, '做好防水措施', 290, GY - 29, {sz:8.5, b:1, c:C.warn});
    conc(g, 238, good ? 'ok' : 'err',
      good ? ('倾斜 ' + S4.a.toFixed(0) + '° —— 在 5° 以内') :
             ('倾斜 ' + S4.a.toFixed(0) + '° —— 超过 5° 了'),
      '书上：尽量保证与地面垂直安装，其倾斜度也不可以超过 5°');
  }
}
function note4(){
  const k = S4.k;
  $('s4a').textContent = k ? '落地式' : '墙壁式';
  $('s4b').textContent = k ? (S4.a.toFixed(0) + '°') : ((S4.h/100).toFixed(2) + ' m');
  $('s4c').textContent = ok4() ? (best4() ? '正好' : '合格') : '不合格';
  let h;
  if(k === 0){
    h = '<div class="st">墙壁式安装</div>' +
      '书上原话：<b>在进行墙壁式安装时，根据环境的不同，' +
      '安装的高度可以为 0.8m、1.2m 或 1.5m，并与墙壁贴紧</b>；' +
      '图上另标着<b>距离地面不低于 0.8m</b>。' +
      '<hr><b>为什么给三档而不是一个数：「根据环境的不同」。</b>' +
      '操作工站着按按钮，1.2~1.5m 最顺手；' +
      '要是箱子上方有管道、或者操作的人是坐着的，就往低了装。' +
      '<hr><b>0.8m 是下限，理由很实际</b>：' +
      '防地面积水、防人踢到、防清扫时被水冲 ——' +
      '跟落地式那条「做好防水措施」是同一个考虑。' +
      '<hr><b>「与墙壁贴紧」也是硬要求</b>：' +
      '箱子和墙之间有缝，进灰进水进小动物，而且固定螺栓受力不均。';
    if(!ok4()) h += '<div class="tip" style="margin-top:8px"><b>现在这个高度低于 0.8 m。</b>' +
      '<span class="sub">书上图 9-17 上明确标着「距离地面不低于 0.8m」。</span></div>';
    else if(best4()) h += '<div class="tip info" style="margin-top:8px">' +
      '<b>正好落在书上给的三档之一。</b></span></div>';
  } else {
    h = '<div class="st">落地式安装</div>' +
      '书上原话：<b>在进行落地式安装时，要尽量保证与地面垂直安装，' +
      '其倾斜度也不可以超过 5°，并且要做好防水措施。</b>' +
      '<hr><b>为什么限 5°</b>：箱子里的器件（尤其是接触器）' +
      '<b>是按垂直安装设计的</b> —— 衔铁靠自重复位、灭弧罩靠热气上升排气。' +
      '歪得太多，动作会变得不可靠。' +
      '<hr>另外倾斜的箱子<b>重心偏出底座</b>，' +
      '长期振动下固定螺栓会松。' +
      '<hr><b>「做好防水措施」在落地式里格外重要</b>：' +
      '箱子直接坐在地上，冲洗地面的水、雨水、积水都会往里渗。' +
      '常见做法是<b>做一个高出地面的基础</b>，再把箱子固定在基础上。';
    if(!ok4()) h += '<div class="tip" style="margin-top:8px"><b>现在倾斜超过 5° 了。</b>' +
      '<span class="sub">书上写死的：其倾斜度也不可以超过 5°。</span></div>';
  }
  $('n3').innerHTML = h;
}

/* ================================================================
   舞台、事件、收尾
   ================================================================ */
const st1 = new Stage('cv0', 360, 296);
const st2 = new Stage('cv1', 360, 248);
const st3 = new Stage('cv2', 360, 218);
const st4 = new Stage('cv3', 360, 280);

['s1k','s2k'].forEach(function(id, n){
  document.getElementById(id).addEventListener('click', function(e){
    const b = e.target.closest('.btn'); if(!b) return;
    const v = +b.dataset.k;
    [S1, S2][n].k = v;
    document.querySelectorAll('#' + id + ' .btn').forEach(function(x){
      x.classList.toggle('on', +x.dataset.k === v);
    });
    [note1, note2][n]();
    [draw1, draw2][n]();
  });
});
/* 布线五条分成两排按钮，两排一起同步 */
['s3k','s3k2'].forEach(function(id){
  document.getElementById(id).addEventListener('click', function(e){
    const b = e.target.closest('.btn'); if(!b) return;
    S3.k = +b.dataset.k;
    document.querySelectorAll('#s3k .btn, #s3k2 .btn').forEach(function(x){
      x.classList.toggle('on', +x.dataset.k === S3.k);
    });
    note3(); draw3();
  });
});
document.getElementById('s4k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S4.k = +b.dataset.k;
  document.querySelectorAll('#s4k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S4.k);
  });
  syncS4();
});
const sl4 = document.getElementById('s4s');
sl4.addEventListener('input', function(e){
  if(S4.k === 0) S4.h = +e.target.value;
  else S4.a = +e.target.value / 10;
  syncS4(true);
});
function syncS4(fromSlider){
  if(!fromSlider){
    /* 换装法时把滑杆换成这一档的量纲 */
    if(S4.k === 0){ sl4.min = 30; sl4.max = 200; sl4.step = 5; sl4.value = S4.h;
      $('s4lab').innerHTML = '安装高度　<b id="s4v">' + (S4.h/100).toFixed(2) + ' m</b>'; }
    else { sl4.min = 0; sl4.max = 150; sl4.step = 5; sl4.value = S4.a * 10;
      $('s4lab').innerHTML = '倾斜度　<b id="s4v">' + S4.a.toFixed(0) + '°</b>'; }
  } else {
    $('s4v').textContent = S4.k === 0 ? (S4.h/100).toFixed(2) + ' m' : S4.a.toFixed(0) + '°';
  }
  note4(); draw4();
}

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会重设尺寸并清空。**四屏全是静态的，必须在这儿逐个补画** */
  draw1(); draw2(); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:9, sec:'9.3'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('9.3');
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
