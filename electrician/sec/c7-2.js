/* 7.2 照明回路怎么装 —— 本节内容的唯一真相。
   对应《零基础学电工》第 7 章 7.2 节（书内 P125~P134）。

   **这一章的定位（7.1 开头说过一遍，这里是它的另一半）**：
   书上 7.2 全是实物照片流程 —— 开关安装 10 步、吸顶灯 10 步、LED 灯 11 步、
   路灯安装。**打孔、敲膨胀管、扣卡子、拧螺钉，网页教不会。**
   这一节教的是能记住、能拿去核对的那一半：**尺寸、顺序、接哪根、什么样算错**。

   四屏：① 开关装在哪儿 ② 接线盒里的六个动作 ③ 灯具那一头 ④ 公共照明

   数字口径（书上原文，别凭记忆改）：
   - 室内控制开关**距离地面 1.3 m**，**与门框的距离 0.15~0.2 m**，
     距离过大或过小都会影响使用及美观（书 P127）
   - 剥线后**线芯长度 50 mm 左右，若过长可将多余部分剪掉**（图 7-10 ①）
   - 电源供电零线与照明灯具供电线路中的零线（蓝色）**并头连接**（②），
     再用绝缘胶带处理，**不可有裸露的线芯**（③）
   - 相线穿入接线柱**一般先接入线端，再连接出线端**，**避免将线芯裸露在外部**（④）
   - 拧紧固定螺钉，**连接必须牢固，不可出现松脱情况**（⑤）
   - 导线**归纳在接线盒内**，再次确认牢固、无裸露、绝缘良好（⑥）
   - 操作面板**有红色标记的一侧向上**（⑨）；护板卡紧，按下时**听到「咔」声**（⑩）
   - 吸顶灯：钻孔个数根据灯座固定孔确定，**一般不少于三个**（图 7-12 ③）；
     **通电时不要触摸灯座内任何部位**（⑩）
   - LED 灯管：**一体化灯管及支架三孔插头中间黄色线为地线，
     地线绝不能与预留相线或零线连接；若无预留地线可不接；
     三孔插头两侧白色线分别与相线 L、零线 N 连接即可**（图 7-14 ⑦）——
     **这一条是书上原话，也是这一节最值钱的一句**
   - LED 灯管：**孔距要小于灯管支架长度**（①）；
     确保**工作人员均已离开作业现场后**，通电检查（⑪）
   - 楼道：1 号楼 10 层，**每层配一个控制开关和一个照明灯**，
     **楼层支路并联在照明干线上**；照明配电箱中的照明断路器引出相线和零线供电；
     进线 **AC 380 V**（图 7-8）
   - 楼道选型：**手动开关（触摸开关）设在楼梯口，自动开关（如声控开关）设在照明灯附近**（书 P127）
   - 路灯控制器：**左侧两个引脚为供电端，右侧两个引脚为负载端（照明灯），
     探头连接在侧面的插孔中，用于检测户外光线的亮度**；**探头固定在配电柜的侧面**；
     固定时**确保周围有足够的空间使其散热**（图 7-11）
   - 路灯：**灯杆高度可选择 5 m，路灯之间的距离 25 m 左右**，主干道采用对称排列（图 7-15）
   - 规划：卧室要求**进门和床头都能控制** → 两地；客厅一般设计成**三方控制**（书 P125）*/
(function(){
'use strict';
ELEC.reg({
  id: '7.2',
  file: 'c7-2.html',
  title: '7.2 照明回路怎么装',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>装在哪儿</button>
    <button class="tab" data-i="1"><span class="n">2</span>接线盒里</button>
    <button class="tab" data-i="2"><span class="n">3</span>灯具那一头</button>
    <button class="tab" data-i="3"><span class="n">4</span>公共照明</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">两个尺寸，书上给死了</div>
    开关装高装低、离门远近，不是随手比划的。书上写死了两个数：
    <b>距地面 1.3 m</b>、<b>距门框 0.15~0.2 m</b>。
    <b>拖两根滑杆看什么位置算合格。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="rowlab">距地面高度　<b id="s1hv">1.30 m</b></div>
      <input type="range" id="s1h" min="80" max="180" step="5" value="130">
      <div class="rowlab" style="margin-top:8px">距门框　<b id="s1dv">0.18 m</b></div>
      <input type="range" id="s1d" min="3" max="45" step="1" value="18">
      <div class="nums three">
        <div class="num"><div class="k">离地</div><div class="v" id="s1a">1.30 m</div></div>
        <div class="num"><div class="k">距门框</div><div class="v" id="s1b">0.18 m</div></div>
        <div class="num hi"><div class="k">这个位置</div><div class="v" id="s1c">合格</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">这间房该设计成几地控制（书 P125）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>场所</th><th>几个地方控</th><th>控制点在哪</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">卧室</td><td><b>两地</b></td><td>进门　＋　床头</td></tr>
        <tr><td class="eu-s">客厅</td><td><b>三方</b></td><td>进门　＋　主卧门外　＋　次卧门外</td></tr>
        <tr><td class="eu-s">楼道</td><td>每层一个</td><td>楼梯口（手动）／灯附近（声控）</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>这一步定完，7.1 那三种开关就该买了。</b>
      <span class="sub">两地 ＝ 两个双控；三方 ＝ 两个双控 ＋ 一个多控。
      <b>而且必须在埋管阶段就定下来</b> —— 两个开关盒之间那两根联络线是那时候穿的，
      墙封上再改就得重新开槽。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">这一节有一半是网页教不会的</div>
    书上 7.2 全是实物照片流程：<b>打孔、敲膨胀管、扣卡子、拧螺钉、走线</b>。
    这一节教的是<b>另一半</b> —— 尺寸、顺序、接哪根、什么样算错。
    <div class="tip">
      <b>手上那一半只能真去装一只。</b>
      <span class="sub">装的时候拿这几屏的尺寸和判据去对照，
      比蒙着头装快得多 —— 至少你知道什么样算做对了。</span>
    </div>
  </div>

  <div class="bet" data-bet="c72-h" data-q="开关装在离地 0.9 m 处（比书上矮 40 cm），会怎样？"
       data-opts="没关系，能按到就行|书上说距离过大或过小都会影响使用及美观——1.3 m 大约是手自然抬起的高度|会不安全，容易触电"
       data-right="1"
       data-after="影响使用和美观。1.3 m 大致是成年人手臂自然抬起、不用弯腰也不用够的高度，进门顺手一按就到。装矮了要弯腰，装高了小孩够不着；一排开关高低不齐更难看。这不是安全问题，是「装得对不对」的问题——但验收是要看的。"></div>
</section>

<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">开关只接两根，盒子里却有四根</div>
    这是新手打开接线盒时最懵的一件事。<b>开关的端子永远只有两个</b>（相线进、开关线出），
    盒子里另外那两根<b>零线是路过的</b> —— 在盒里并头接好，
    <b>不碰开关的任何一个端子</b>。<b>点「下一步」走一遍六个动作。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns">
        <button class="btn" id="s2prev">‹ 上一步</button>
        <button class="btn go" id="s2next">下一步 ›</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">第几步</div><div class="v" id="s2a">1 / 6</div></div>
        <div class="num"><div class="k">盒里几根线</div><div class="v" id="s2b">4 根</div></div>
        <div class="num hi"><div class="k">开关接几根</div><div class="v" id="s2c">2 根</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">六个动作，照着做（书上图 7-10）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>第几步</th><th>做什么</th><th>判据</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">1</td><td>剥绝缘层</td><td>线芯露 <b>50 mm 左右</b>，长了剪掉</td></tr>
        <tr><td class="eu-s">2</td><td>两根零线<b>并头</b></td><td>用尖嘴钳绞紧，不进开关</td></tr>
        <tr><td class="eu-s">3</td><td>绝缘处理</td><td><b>不可有裸露的线芯</b></td></tr>
        <tr><td class="eu-s">4</td><td>相线穿进接线柱</td><td><b>先接入线端，再接出线端</b></td></tr>
        <tr><td class="eu-s">5</td><td>拧紧固定螺钉</td><td>必须牢固，<b>不可松脱</b></td></tr>
        <tr><td class="eu-s">6</td><td>归纳 ＋ 装面板</td><td>面板<b>有红色标记的一侧向上</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>护板扣上去要听到「咔」一声。</b>
      <span class="sub">没听到就是没卡到位，用久了会翘边、掉下来。
      装底座时还要确认<b>底板与墙壁之间紧密</b>，中间有缝说明接线盒没埋平或者线塞得太满。</span>
    </div>
  </div>

  <div class="bet" data-bet="c72-box" data-q="打开一个单控开关盒，看见里面有四根线头，其中两根是蓝色的。这正常吗？"
       data-opts="不正常，开关盒只该有两根|正常——那两根蓝色是路过的零线，在盒里并头接好，不碰开关|不正常，蓝色线不该出现在开关盒里"
       data-right="1"
       data-after="正常。这个盒子既是开关盒也是过路盒：电源的相线和零线都从这里进来，零线在盒内并头之后直接去灯，只有相线绕进开关再出来。关键是看那两根蓝线接没接到开关的端子上——接了就是错的。开关的端子永远只有两个。"></div>
</section>

<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">灯具那一头：两根还是三根</div>
    吸顶灯多半只有<b>两根</b>（L、N）；LED 灯管的一体化支架带一个<b>三孔插头</b>，
    三条线里<b>中间那根黄色的是地线</b>。
    书上对这根黄线有一句原话，是这一节最值钱的：
    <b>地线绝不能与预留相线或零线连接。</b><b>点按钮把黄线接到不同的地方试试。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3t">
        <button class="btn on sm" data-t="0">吸顶灯（两根）</button>
        <button class="btn sm" data-t="1">LED 灯管（三根）</button>
      </div>
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">黄线接 PE</button>
        <button class="btn sm" data-k="1">黄线接 L</button>
        <button class="btn sm" data-k="2">黄线接 N</button>
        <button class="btn sm" data-k="3">黄线不接</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">灯具几根线</div><div class="v" id="s3a">2 根</div></div>
        <div class="num"><div class="k">黄线接在</div><div class="v" id="s3b">—</div></div>
        <div class="num hi"><div class="k">结果</div><div class="v" id="s3c">正常</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st good">书上那句原话，一个字不改</div>
    <div class="tip info">
      <b>「一体化灯管及支架三孔插头中间黄色线为地线，地线绝不能与预留相线或零线连接；
      若无预留地线可不接；三孔插头两侧白色线分别与相线 L、零线 N 连接即可。」</b>
      <span class="sub">注意后半句：<b>没有预留地线，这根黄线宁可不接</b>，
      也不能凑合接到零线上。老房子改造经常碰到 —— 顶上就两根线，
      那就把黄线单独包好绝缘，别让它碰到任何东西。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">吸顶灯那几步里，网页能教的部分</div>
    装吸顶灯的顺序是：拆开面罩灯管底座 → 底座按在位置上用铅笔画螺钉孔 →
    电钻打孔 → 敲入塑料膨胀管 → 预留导线穿过进电线孔 → 拧螺钉固定底座 →
    接线并绝缘 → 装灯管和辉光启动器 → 通电检查 → 扣灯罩。
    <hr>
    这里面能记住的判据只有三条：
    <b>① 打孔个数按灯座的固定孔来，一般不少于三个</b>；
    <b>② 螺钉不要拧过紧</b>（先都拧上、调正了再逐个拧紧）；
    <b>③ 通电检查时不要触摸灯座内任何部位。</b>
    <div class="tip">
      <b>安装前先检查灯管、镇流器、连接线是否完好。</b>
      <span class="sub">装完才发现灯管是坏的，就得把灯罩灯管全部再拆一遍。
      LED 灯管那边还有一条同类的：<b>孔距要小于灯管支架长度</b> ——
      孔打宽了支架卡不上去，只能重打。</span>
    </div>
  </div>

  <div class="bet" data-bet="c72-pe" data-q="顶上只预留了相线和零线两根，LED 灯管却是三孔插头。那根黄线怎么办？"
       data-opts="接到零线上，反正零线也接地|单独包好绝缘不接——书上写着「若无预留地线可不接」|随便找根金属管接上"
       data-right="1"
       data-after="包好不接。零线是工作电流走的线，正常运行时它上面就有电压降；把外壳接到零线上，外壳跟着零线一起浮动，而且一旦零线在前面某处断了，外壳会通过灯具带上相电压。书上写死了：地线绝不能与预留相线或零线连接，没有预留地线可不接。"></div>
</section>

<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">楼道和路灯：控制方式不一样</div>
    公共照明跟家里的最大区别是<b>没人专门去关它</b>，所以控制部件是主角：
    楼道靠<b>声控 / 触摸开关</b>，路灯靠<b>光控控制器</b>。
    <b>切两档看：楼道每层怎么并上去，路灯控制器四个脚怎么接。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4t">
        <button class="btn on sm" data-t="0">楼道照明</button>
        <button class="btn sm" data-t="1">路灯控制器</button>
      </div>
      <div class="btns" id="s4p">
        <button class="btn on sm" data-p="0">探头装箱外侧面</button>
        <button class="btn sm" data-p="1">探头装在箱子里</button>
      </div>
      <div class="rowlab" id="s4lab">天色（户外照度）　<b id="s4nv">120 lx</b></div>
      <input type="range" id="s4n" min="0" max="200" step="2" value="120">
      <div class="nums three">
        <div class="num"><div class="k" id="s4k1">楼层数</div><div class="v" id="s4a">4 层</div></div>
        <div class="num"><div class="k" id="s4k2">每层几件</div><div class="v" id="s4b">1 灯 1 开关</div></div>
        <div class="num hi"><div class="k" id="s4k3">支路怎么接</div><div class="v" id="s4c">全部并联</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">开关装哪儿，按「谁来触发它」定（书 P127）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>开关类型</th><th>装在哪</th><th>为什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">手动<br>（触摸开关）</td><td><b>楼梯口</b></td><td>人先到楼梯口，伸手就要够得着</td></tr>
        <tr><td class="eu-s">自动<br>（声控开关）</td><td><b>照明灯附近</b></td><td>它要收声、收光，离灯太远就误动作</td></tr>
        <tr><td class="eu-s">光控探头<br>（路灯）</td><td><b>配电柜侧面</b></td><td>要测的是<b>户外</b>光线，装箱里永远是黑的</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>照明灯大都装在楼道或走廊的中间。</b>
      <span class="sub">空间较大的话平均设置多盏。楼层支路<b>并联</b>在照明干线上，
      所以<b>一层的灯坏了不影响其他层</b> —— 这是 1.4 讲的并联，
      到这儿变成了一条设计要求。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">路灯的三个数（书上图 7-7、图 7-15）</div>
    <b>灯杆高度 5 m　·　灯杆间距 25 m 左右　·　主干道对称排列。</b>
    小区路灯设在<b>小区边界或园区内道路的两侧</b>；设计时要让路面有较高的亮度和
    <b>均匀度</b>，并<b>尽量限制眩光</b>；道路口多、分叉多的地方要多放几盏，
    起视觉指引作用。
    <div class="tip">
      <b>装控制器还有一条容易忘：周围要留出散热空间。</b>
      <span class="sub">控制器塞在控制箱角落、四周贴满线，夏天箱内温度上去就死机或误动作。
      书上专门写了「确保其周围有足够的空间使其散热」。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="c7-2">
    <div class="qz" data-q="室内控制开关距离地面应该多高？"
         data-opts="0.9 m|1.3 m|1.8 m"
         data-right="1"
         data-why="1.3 m，距门框 0.15~0.2 m。书上说距离过大或过小都会影响使用及美观。1.3 m 大致是成年人手臂自然抬起的高度，进门顺手就按到；装矮了要弯腰，装高了小孩够不着。"></div>
    <div class="qz" data-q="单控开关盒里的两根零线该怎么处理？"
         data-opts="各接一个开关端子|在盒内并头连接、绝缘处理，不碰开关的任何端子|其中一根接开关，另一根剪掉"
         data-right="1"
         data-why="在盒里并头接好、用绝缘胶带处理，不与开关内的接线端子发生任何连接。开关的端子永远只有两个：相线进、开关线出。零线只是从这个盒子路过，直接去灯。"></div>
    <div class="qz" data-q="LED 灯管三孔插头中间那根黄线，接哪儿？"
         data-opts="接地线 PE；没有预留地线就包好不接|接零线 N，效果一样|接相线 L"
         data-right="0"
         data-why="接 PE 地线。书上原话：地线绝不能与预留相线或零线连接，若无预留地线可不接。接到 L 上外壳直接带电，有漏保会当场跳闸；接到 N 上表面能用，但零线上有电压降，而且一旦零线断了，外壳会通过灯具带上相电压。"></div>
    <div class="qz" data-q="路灯控制器的光控探头，应该固定在哪儿？"
         data-opts="控制箱内部，防止被雨淋|配电柜的侧面（箱外），用来检测户外光线的亮度|装在路灯灯杆顶上"
         data-right="1"
         data-why="配电柜侧面。探头是拿来测户外光线亮度的，装在箱子里永远是黑的——控制器会判定「天黑了」，白天也把灯全打开。这属于装完之后功能全错但看不出接线毛病的那一类，很难查。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 7 章 7.2 节（书内 P125~P134）<br>打孔、膨胀管、扣卡子这些手上的活网页教不会；这一节给的是尺寸、顺序和判据</div>
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
/* 尺寸线：两端各一条短横（界线）＋ 中间带箭头的主线，技术制图那套 */
function dimV(g, x, y0, y1, label, c){
  const col = c || C.acc;
  g.save(); g.strokeStyle = col; g.lineWidth = 1.1;
  g.beginPath(); g.moveTo(x - 5, y0); g.lineTo(x + 5, y0);
  g.moveTo(x - 5, y1); g.lineTo(x + 5, y1);
  g.moveTo(x, y0); g.lineTo(x, y1); g.stroke(); g.restore();
  EC.head(g, x, y0, 0, (y1 > y0 ? -1 : 1), 4.6, col);
  EC.head(g, x, y1, 0, (y1 > y0 ? 1 : -1), 4.6, col);
  EP.chip(g, label, x, (y0 + y1)/2, {sz:9, b:1, c:col});
}

/* ================================================================
   场景 1：开关装在哪儿
   ================================================================ */
const PXM = 62, FLOOR = 222, CEIL = Math.round(FLOOR - 2.7*PXM);
const DOOR_R = 90, DOOR_T = Math.round(FLOOR - 2.0*PXM);
const S1 = { h:130, d:18 };
function ok1h(){ return S1.h >= 125 && S1.h <= 135; }
function ok1d(){ return S1.d >= 15 && S1.d <= 20; }

function draw1(){
  const g = st1.g; st1.clear();
  EP.heading(g, 14, 20, '开关装在哪儿', '距地 1.3 m　距门框 0.15~0.2 m');

  /* 墙、地、天花板 */
  box(g, 18, CEIL, 324, FLOOR - CEIL, 0, C.box, null, 0);
  seg(g, [[18, CEIL],[342, CEIL]], C.boxLine, 2.4);
  seg(g, [[18, FLOOR],[342, FLOOR]], C.boxLine, 2.8);
  txt(g, '天花板', 336, CEIL - 9, {sz:8.5, c:C.tx3, al:'right'});
  txt(g, '地面', 336, FLOOR - 12, {sz:8.5, c:C.tx3, al:'right'});

  /* 门框 */
  box(g, 34, DOOR_T, DOOR_R - 34, FLOOR - DOOR_T, 0, C.card, C.boxLine, 2);
  txt(g, '门', 62, DOOR_T + 26, {sz:9.5, b:1, c:C.tx3});

  /* 人（只做比例参照，画得很淡） */
  g.save(); g.globalAlpha = 0.20; g.fillStyle = C.tx3;
  const px = 206, ph = FLOOR - 1.7*PXM;
  g.beginPath(); g.arc(px, ph + 11, 11, 0, Math.PI*2); g.fill();
  EP.rr(g, px - 13, ph + 24, 26, 60, 10); g.fill();
  g.fillRect(px - 11, ph + 82, 8, FLOOR - (ph + 82));
  g.fillRect(px + 3, ph + 82, 8, FLOOR - (ph + 82));
  g.restore();
  txt(g, '身高 1.7 m', px + 22, ph + 40, {sz:8.5, c:C.tx3, al:'left'});

  /* 灯 */
  seg(g, [[300, CEIL],[300, 79]], C.wire, 2);
  EC.lamp(g, 300, 92, 13, 0.85);

  /* 开关 */
  const sx = DOOR_R + S1.d/100 * PXM, sy = FLOOR - S1.h/100 * PXM;
  box(g, sx, sy - 12, 24, 24, 4, P.cream, P.creamD, 1.2);
  box(g, sx + 6, sy - 7, 12, 14, 2, P.creamD, P.steelD, 0.9);
  hot(g, sx + 12, sy, 0, {w:36, h:36, r:8});

  /* 尺寸标注 */
  dimV(g, 152, FLOOR, sy, (S1.h/100).toFixed(2) + ' m', ok1h() ? C.ok : C.warn);
  g.save(); g.setLineDash([3,3]); g.strokeStyle = C.tx3; g.lineWidth = 1;
  g.beginPath(); g.moveTo(sx + 24, sy); g.lineTo(152, sy); g.stroke(); g.restore();
  EP.callout(g, DOOR_R + 2, sy - 22, DOOR_R + 26, sy - 48,
             (S1.d/100).toFixed(2) + ' m', '距门框',
             {al:'left', color: ok1d() ? C.ok : C.warn});

  const good = ok1h() && ok1d();
  let l1, l2;
  if(good){ l1 = '这个位置合格'; l2 = '距地 1.3 m、距门框 0.15~0.2 m —— 书上给死的两个数'; }
  else if(!ok1h() && !ok1d()){ l1 = '高度和距门框都不对'; l2 = '书上：距离过大或过小，都可能影响使用及美观'; }
  else if(!ok1h()){
    l1 = S1.h > 135 ? '装高了' : '装矮了';
    l2 = S1.h > 135 ? '手要举起来，小孩够不着' : '要弯腰去按，一排开关还会高低不齐';
  }else{
    l1 = S1.d > 20 ? '离门框太远' : '离门框太近';
    l2 = S1.d > 20 ? '进门要多走两步才够得着，看着也散' : '贴着门框，装底盒时容易碰到门套、门开合会蹭到';
  }
  conc(g, 232, good ? 'ok' : 'warn', l1, l2);
}
function note1(){
  $('s1hv').textContent = (S1.h/100).toFixed(2) + ' m';
  $('s1dv').textContent = (S1.d/100).toFixed(2) + ' m';
  $('s1a').textContent = (S1.h/100).toFixed(2) + ' m';
  $('s1b').textContent = (S1.d/100).toFixed(2) + ' m';
  const good = ok1h() && ok1d();
  $('s1c').textContent = good ? '合格' : (!ok1h() ? (S1.h > 135 ? '装高了' : '装矮了')
                                                  : (S1.d > 20 ? '离门框远' : '离门框近'));
  let h = '<div class="st' + (good ? ' good' : ' warn') + '">' +
    (good ? '这两个数就是验收要看的' : '书上：距离过大或过小，都可能会影响使用及美观') + '</div>';
  h += '<b>距地面 1.3 m</b>大致是成年人手臂自然抬起、不用弯腰也不用够的高度 —— ' +
    '进门顺手一按就到。<b>距门框 0.15~0.2 m</b> 是一只手掌的宽度左右：' +
    '再近会碰到门套、门开合时容易蹭到；再远进门得多走两步。';
  h += '<hr><b>整个屋子的开关要装在同一个高度上。</b>' +
    '单看一只开关高低两三厘米看不出来，一面墙上三四只不齐就很扎眼。' +
    '现场的做法是<b>弹一条水平线，所有底盒按这条线埋</b>。' +
    '<span class="sub">插座是另一套高度（一般贴地装，空调、洗衣机那种另算），' +
    '书上这一节没给数，按图纸走。</span>';
  $('n0').innerHTML = h;
}

/* ================================================================
   场景 2：接线盒里的六个动作
   ================================================================
   **走线是按「不交叉」倒推出来的**：盒里有三条通路 ——
   电源L→开关入线端（横穿全盒）、开关出线端→去灯（先横后竖）、电源N→并头→去灯（先横后竖）。
   只要把「横穿全盒」那条放在**最下面**，另外两条往上走就都不会跨过它；
   再把两个向上的出口按 x 排好（N 在左、开关线在右），三条线一个交叉都没有。
   这一屏本身就是 4.1 那条「交叉不打点、丁字才打点」的正面示范 */
const BOX = { x0:44, x1:204, y0:76, y1:196 };
const SWX = 230, SWX1 = 312, SWY0 = 100, SWY1 = 192;
const T_OUT = 124, T_IN = 166;          /* 出线端在上、入线端在下 */
const NJ = [96, 100], SWL = 152, TOPY = 48;
const S2 = { k:0 };
const STEP2 = [
  ['剥绝缘层', '线芯露 50 mm 左右，长了剪掉'],
  ['两根零线并头', '用尖嘴钳绞紧 —— 它们不进开关'],
  ['并头处绝缘处理', '不可有裸露的线芯'],
  ['相线穿进入线端', '先接入线端，再接出线端'],
  ['接出线端 ＋ 拧紧', '连接必须牢固，不可松脱'],
  ['归纳整理 ＋ 装面板', '面板有红色标记的一侧向上']
];

function bare(g, x0, y0, x1, y1){
  seg(g, [[x0,y0],[x1,y1]], P.copper, 2.6);
  dot(g, x1, y1, P.copperL, 2);
}
function draw2(){
  const g = st2.g; st2.clear(); const k = S2.k;
  EP.heading(g, 14, 20, '第 ' + (k+1) + ' 步：' + STEP2[k][0], STEP2[k][1]);

  /* 接线盒 */
  box(g, BOX.x0, BOX.y0, BOX.x1-BOX.x0, BOX.y1-BOX.y0, 8, C.box, C.boxLine, 1.6);
  txt(g, '接线盒', BOX.x0 + 8, BOX.y1 - 12, {sz:9, c:C.tx3, al:'left'});

  /* 开关本体 */
  box(g, SWX, SWY0, SWX1-SWX, SWY1-SWY0, 6, P.bakelite, P.bakeliteL, 1.4);
  [[T_OUT,'出线端'],[T_IN,'入线端']].forEach(function(t){
    box(g, SWX - 4, t[0] - 7, 16, 14, 3, P.steel, P.steelD, 1);
    txt(g, t[1], SWX1 + 4, t[0], {sz:8.5, c:C.tx3, al:'left'});
  });
  txt(g, '单控开关', (SWX+SWX1)/2, SWY1 - 14, {sz:9, b:1, c:C.tx3});

  /* 去灯的两根（顶上出去） */
  txt(g, 'N（去灯）', NJ[0] - 6, 38, {sz:8.5, c:C.N, al:'right'});
  txt(g, '开关线（去灯）', SWL + 6, 38, {sz:8.5, c:C.tx3, al:'left'});
  txt(g, '电源 N', 14, 88, {sz:9, b:1, c:C.N, al:'left'});
  txt(g, '电源 L', 14, 154, {sz:9, b:1, c:C.L, al:'left'});

  /* ① 电源 N ＋ 去灯 N */
  if(k === 0){
    EP.wire(g, new Path([[10, NJ[1]],[78, NJ[1]]]), {c:'blue'});
    bare(g, 78, NJ[1], 90, NJ[1]);
    EP.wire(g, new Path([[NJ[0], TOPY],[NJ[0], 100]]), {c:'blue'});
    bare(g, NJ[0], 100, NJ[0], 112);
  }else{
    EP.wire(g, new Path([[10, NJ[1]],[NJ[0], NJ[1]]]), {c:'blue'});
    EP.wire(g, new Path([[NJ[0], TOPY],[NJ[0], NJ[1]]]), {c:'blue'});
    if(k === 1){
      /* 绞合的线头 */
      g.save(); g.strokeStyle = P.copper; g.lineWidth = 2.4; g.lineCap='round';
      for(let i=0;i<4;i++){
        g.beginPath(); g.moveTo(NJ[0]-16+i*7, NJ[1]-6); g.lineTo(NJ[0]-11+i*7, NJ[1]+6); g.stroke();
      }
      g.restore();
      hot(g, NJ[0] - 3, NJ[1], 0, {w:42, h:26, r:6});
    }
    if(k >= 2){
      box(g, NJ[0]-20, NJ[1]-9, 40, 18, 4, P.bakeliteL, P.bakelite, 1);
      g.save(); g.strokeStyle = P.bakelite; g.lineWidth = 1; g.globalAlpha = 0.8;
      for(let i=0;i<5;i++){
        g.beginPath(); g.moveTo(NJ[0]-18+i*9, NJ[1]+8); g.lineTo(NJ[0]-11+i*9, NJ[1]-8); g.stroke();
      }
      g.restore();
      if(k === 2) hot(g, NJ[0], NJ[1], 0, {w:48, h:28, r:6});
    }
  }

  /* ② 电源 L → 入线端 */
  if(k < 3){
    EP.wire(g, new Path([[10, T_IN],[198, T_IN]]), {c:'red'});
    bare(g, 198, T_IN, 212, T_IN);
  }else{
    EP.wire(g, new Path([[10, T_IN],[SWX, T_IN]]), {c:'red'});
    if(k === 3) hot(g, SWX + 4, T_IN, 0, {w:40, h:30, r:6});
  }

  /* ③ 开关出线端 → 去灯 */
  if(k < 4){
    EP.wire(g, new Path([[SWL, TOPY],[SWL, 112]]), {});
    bare(g, SWL, 112, SWL, 126);
  }else{
    EP.wire(g, new Path([[SWL, TOPY],[SWL, T_OUT],[SWX, T_OUT]]), {});
    if(k === 4) hot(g, SWX + 4, T_OUT, 0, {w:40, h:30, r:6});
  }

  /* ④ 面板 */
  if(k === 5){
    box(g, SWX - 8, SWY0 - 8, (SWX1-SWX) + 16, (SWY1-SWY0) + 16, 7, P.cream, P.creamD, 1.4);
    box(g, SWX + 14, SWY0 + 20, 42, 52, 4, P.creamD, P.steelD, 1);
    g.save(); g.fillStyle = C.err;
    g.fillRect(SWX + 14, SWY0 + 20, 42, 4); g.restore();
    txt(g, '红色标记这一侧向上', SWX + 35, SWY0 + 4, {sz:8, c:C.err});
  }

  if(k === 0){
    EP.callout(g, 90, NJ[1] + 5, 58, 136, '50 mm', '线芯露多长',
               {al:'left', color:C.acc});
  }
  const CC = [
    ['acc', '四个线头，先都剥出来', '线芯露 50 mm 左右 —— 剥长了不要将就，剪掉'],
    ['acc', '两根零线并头，它们不进开关', '电源零线 ＋ 去灯零线，用尖嘴钳绞紧'],
    ['ok',  '并头处包好，不可有裸露的线芯', '这一步偷懒，盒子里迟早碰上'],
    ['acc', '相线穿进入线端，先接这一个', '书上：一般先接入线端，再连接出线端'],
    ['ok',  '出线端接开关线，两个螺钉都要拧到位', '导线的连接必须牢固，不可出现松脱情况'],
    ['ok',  '归纳进盒、装面板，护板按到「咔」一声', '装完再确认一遍：牢固、无裸露、绝缘良好']
  ][k];
  conc(g, 208, CC[0], CC[1], CC[2]);
}
function note2(){
  $('s2a').textContent = (S2.k + 1) + ' / 6';
  $('s2b').textContent = '4 根';
  $('s2c').textContent = '2 根';
  const T = [
    ['剥出来的线芯长度是有讲究的',
     '<b>50 mm 左右</b>。短了塞进接线柱夹不住、拧螺钉时线容易脱出来；' +
     '长了在盒里绕成一团，铜露在外面到处碰。<b>剥长了不要将就，直接剪掉多余部分。</b>' +
     '<span class="sub">用什么工具剥、45° 怎么下刀，6.1 讲过了。' +
     '这里只强调一条：<b>剥完的线芯必须完整无损，有伤就重新剥。</b></span>'],
    ['两根零线在盒里并头，不进开关',
     '电源来的零线和去灯的零线，用尖嘴钳<b>绞紧成一股</b>。' +
     '<b>它们跟开关没有任何关系</b> —— 书上原话是「零线不经过开关，' +
     '不与开关内接线端子进行任何连接，直接在接线盒内连接」。' +
     '<hr>这就回答了开头那个问题：<b>盒里四根、开关只接两根</b>。' +
     '另外那两根蓝的是路过的。'],
    ['绝缘处理：不可有裸露的线芯',
     '并头绞好之后用<b>绝缘胶带</b>把整个接头包起来，或者套热缩管（6.4 讲的）。' +
     '<b>一点铜都不能露在外面。</b>' +
     '<span class="sub">接线盒是个铁盒或塑料盒，线塞进去要弯折、要挤压，' +
     '露一点铜就可能碰到别的线头或盒壁。这一步偷懒，问题不会当场出现，' +
     '要过很久才以「莫名其妙跳闸」的形式冒出来。</span>'],
    ['相线先接入线端',
     '把电源来的相线线芯<b>穿进接线柱</b>。书上写的是「一般<b>先接入线端，再连接出线端</b>」——' +
     '顺序本身不影响电路，影响的是操作：先接靠里那个，手和螺丝刀还有地方伸进去。' +
     '<hr><b>穿进去之后要检查线芯有没有露在外面。</b>' +
     '接线柱只夹得住一段，多出来那截露在压板外面就是隐患。'],
    ['出线端接开关线，然后拧紧',
     '第二根（去灯的那根，叫<b>开关线</b>）接到出线端。两个螺钉都要用螺丝刀<b>拧紧</b>：' +
     '<b>导线的连接必须牢固，不可出现松脱情况。</b>' +
     '<span class="sub">松的接头是照明线路最常见的故障源：接触电阻大 → 发热 → ' +
     '氧化 → 电阻更大，最后烧掉接线柱。装完轻轻拽一下每根线，拽得动就是没拧紧。</span>'],
    ['归纳、装底座、扣面板',
     '把导线<b>归纳在接线盒内</b>，再确认一遍：连接牢固、无裸露线芯、绝缘处理良好。' +
     '然后底座的螺钉孔对准接线盒按下、拧紧，<b>确认底板与墙壁之间紧密</b>；' +
     '装操作面板时<b>有红色标记的一侧向上</b>；最后扣护板，<b>按下时要听到「咔」声</b>。' +
     '<hr><b>没听到「咔」就是没卡到位</b>，用久了会翘边甚至掉下来。' +
     '底板和墙之间有缝，多半是线塞得太满或者接线盒没埋平。']
  ][S2.k];
  $('n1').innerHTML = '<div class="st">' + T[0] + '</div>' + T[1];
}

/* ================================================================
   场景 3：灯具那一头
   ================================================================
   左边三个端子的顺序故意排成 **L / PE / N** ——
   跟三孔插头的「白 / 黄 / 白」一一对上，接对了就是三条平行的横线，
   **接错了立刻变成一条斜线**。判据画成图形，比写一句话管用 */
const LX0 = 110, LX1 = 214, PLG0 = 246, PLG1 = 292, TUBE0 = 296, TUBE1 = 344;
const R2 = [118, 186];                     /* 吸顶灯两根 */
const R3 = [92, 148, 204];                 /* LED 三根：L / PE / N */
const S3 = { t:0, k:0 };
function res3(){
  if(S3.t === 0) return {kind:'ok', s:'正常'};
  return [{kind:'ok', s:'正常'}, {kind:'err', s:'外壳带电'},
          {kind:'warn', s:'违规'}, {kind:'ok', s:'可以'}][S3.k];
}
function draw3(){
  const g = st3.g; st3.clear();
  const led = S3.t === 1, R = res3();
  EP.heading(g, 14, 20, led ? 'LED 灯管（三根）' : '吸顶灯（两根）',
             led ? '中间那根黄的是地线' : '顶上只有相线和零线');
  txt(g, '天花板预留', 34, 52, {sz:9, b:1, c:C.tx3, al:'left'});
  txt(g, led ? '三孔插头' : '灯座接线端子', PLG1 + 2, 52, {sz:9, b:1, c:C.tx3, al:'right'});

  if(!led){
    /* 灯座 ＋ 吸顶灯 */
    box(g, PLG0, 100, PLG1-PLG0, 104, 6, P.bakelite, P.bakeliteL, 1.4);
    seg(g, [[PLG1, 152],[TUBE0 + 2, 152]], P.steel, 3);
    g.save(); g.fillStyle = P.cream; g.strokeStyle = P.creamD; g.lineWidth = 1.4;
    g.beginPath(); g.arc(TUBE0 + 4, 152, 26, Math.PI*0.5, Math.PI*1.5, true);
    g.closePath(); g.fill(); g.stroke(); g.restore();
    txt(g, '吸顶灯', TUBE0 + 12, 190, {sz:9, c:C.tx3});
    R2.forEach(function(y, i){
      const col = i ? C.N : C.L;
      EP.wire(g, new Path([[30, y],[LX0, y]]), {c: i ? 'blue' : 'red'});
      dot(g, LX0, y, col, 3.4);
      EP.wire(g, new Path([[LX0, y],[PLG0, y]]), {c: i ? 'blue' : 'red'});
      box(g, PLG0 - 5, y - 7, 16, 14, 3, P.steel, P.steelD, 1);
      txt(g, i ? 'N 零线' : 'L 相线', 34, y - 13, {sz:9, b:1, c:col, al:'left'});
    });
    txt(g, '缠绕连接后用绝缘胶带包好', 180, 232, {sz:9, c:C.tx3});
    conc(g, 244, 'ok', '吸顶灯只有两根：相线、零线', '灯具没有金属外露部分时不强制接地线');
    return;
  }

  /* ===== LED 灯管 ===== */
  box(g, PLG0, 76, PLG1-PLG0, 144, 6, P.bakelite, P.bakeliteL, 1.4);
  box(g, TUBE0, 132, TUBE1-TUBE0, 30, 8, P.cream, P.creamD, 1.4);
  seg(g, [[PLG1, 147],[TUBE0, 147]], P.steel, 3);
  txt(g, '灯管', (TUBE0+TUBE1)/2, 174, {sz:9, c:C.tx3});

  const NAME = ['L 相线', 'PE 地线', 'N 零线'];
  const WC = ['red', 'yellow', 'blue'];
  const KC = [C.L, C.PE, C.N];
  /* 天花板预留的三根（第 4 档：顶上根本没有 PE） */
  R3.forEach(function(y, i){
    if(i === 1 && S3.k === 3){
      g.save(); g.setLineDash([5,4]); g.strokeStyle = C.tx3; g.lineWidth = 1.6;
      g.beginPath(); g.moveTo(30, y); g.lineTo(LX0, y); g.stroke(); g.restore();
      txt(g, '没有预留地线', 34, y - 13, {sz:9, b:1, c:C.tx3, al:'left'});
      return;
    }
    EP.wire(g, new Path([[30, y],[LX0, y]]), {c:WC[i]});
    dot(g, LX0, y, KC[i], 3.4);
    txt(g, NAME[i], 34, y - 13, {sz:9, b:1, c:KC[i], al:'left'});
  });
  /* 插头的三条线 */
  ['白','黄','白'].forEach(function(s, i){
    EP.wire(g, new Path([[LX1, R3[i]],[PLG0, R3[i]]]), {c: i===1 ? 'yellow' : 'black'});
    txt(g, s, LX1 + 6, R3[i] - 13, {sz:9, b:1, c: i===1 ? C.PE : C.tx2, al:'left'});
  });
  /* 中间那一段：接到哪儿 */
  EP.wire(g, new Path([[LX0, R3[0]],[LX1, R3[0]]]), {c:'red'});
  EP.wire(g, new Path([[LX0, R3[2]],[LX1, R3[2]]]), {c:'blue'});
  if(S3.k === 0){
    EP.wire(g, new Path([[LX0, R3[1]],[LX1, R3[1]]]), {c:'yellow'});
  }else if(S3.k === 1){
    new Path([[LX1, R3[1]],[LX0, R3[0]]]).stroke(g, 3.2, C.err);
    hot(g, (TUBE0+TUBE1)/2, 147, 0, {w:64, h:46, r:10, color:C.err});
    EP.chip(g, '外壳带电', (TUBE0+TUBE1)/2, 196, {sz:9, b:1, c:C.err});
  }else if(S3.k === 2){
    new Path([[LX1, R3[1]],[LX0, R3[2]]]).stroke(g, 3.2, C.warn);
    EP.chip(g, '外壳接到了零线上', 162, 236, {sz:9, b:1, c:C.warn});
  }else{
    /* 包好不接：黄线端头套一段绝缘 */
    box(g, LX1 - 34, R3[1] - 8, 30, 16, 4, P.bakeliteL, P.bakelite, 1);
    EP.chip(g, '单独包好，不碰任何东西', 150, 236, {sz:9, b:1, c:C.ok});
  }
  const CC = [
    ['ok',  '白 → L，白 → N，黄 → PE', '三条平行的横线，一根都不斜 —— 这就是接对了'],
    ['err', '地线接到了相线上', 'PE 在配电箱和 N 是接通的，这一下就是 L 短接到 N'],
    ['warn','地线接到了零线上：能用，但违规', '零线上有电压降；零线一断，外壳就带上相电压'],
    ['ok',  '顶上没有 PE，这根黄线包好不接', '书上原话：若无预留地线可不接 —— 但绝不能改接零线']
  ][S3.k];
  conc(g, 244, CC[0], CC[1], CC[2]);
}
function note3(){
  const R = res3();
  $('s3a').textContent = S3.t ? '3 根' : '2 根';
  $('s3b').textContent = S3.t ? ['PE 地线','L 相线','N 零线','没接'][S3.k] : '—';
  $('s3c').textContent = S3.t ? R.s : '正常';
  let h;
  if(S3.t === 0){
    h = '<div class="st">两根线的情形最简单</div>' +
      '顶上预留的<b>相线</b>和<b>零线</b>分别接到灯座的两个接线端子上，' +
      '缠绕连接之后用<b>绝缘胶带</b>包好（6.2、6.4 讲的那一套）。' +
      '<hr><b>顺序不影响亮不亮</b> —— 但接反了（相线接到了不经过开关的那一路）' +
      '就变成 7.1 屏 4 的第三种接错：灯照样开关，灯座却一直带电。' +
      '<b>判断方法还是那一个：关掉开关，用验电笔点灯座。</b>' +
      '<span class="sub">灯具带金属外壳的话仍然要接 PE，只是吸顶灯多数是塑料罩，' +
      '书上这一步没画地线。</span>';
  }else if(S3.k === 0){
    h = '<div class="st good">这就是书上要的接法</div>' +
      '<b>三孔插头两侧的白线分别接相线 L 和零线 N，中间的黄线接地线 PE。</b>' +
      '图上三条线全是平的、一根都不斜 —— 接对了长这样。' +
      '<hr>黄线接的是灯管支架的<b>金属外壳</b>。它平时不通电流，' +
      '只有在灯具内部绝缘坏掉、外壳带上电的那一刻才起作用：' +
      '<b>把故障电流引到地里去，让漏电保护器跳闸</b>，而不是等着人去碰它。';
  }else if(S3.k === 1){
    h = '<div class="st bad">最严重的一种：外壳直接带电</div>' +
      '黄线接到了<b>相线</b>上，等于把 220 V 直接送到灯管支架的金属外壳上。' +
      '<hr>而且它多半<b>当场就跳闸</b>：PE 和 N 在配电箱（或进户处）是接通的，' +
      '相线接到 PE 就是<b>相线短接到零线</b>。' +
      '<span class="sub">跳闸反而是好事 —— 说明保护起作用了。' +
      '真正可怕的是那种<b>没跳、灯还亮着</b>的情况（比如 PE 那一路本身就是断的），' +
      '外壳就一直带着 220 V 等人去摸。</span>';
  }else if(S3.k === 2){
    h = '<div class="st bad">接到零线上：表面能用，实际违规</div>' +
      '灯确实会亮，验收时也看不出来 —— 这正是它的危险之处。两个问题：' +
      '<hr><b>① 零线上有电压降。</b>零线是工作电流走的线，' +
      '负载越重、线越长，零线对地的电位越高，外壳跟着一起浮起来。' +
      '<hr><b>② 零线一断，外壳立刻带相电压。</b>' +
      '前面某处零线断了，电流会经过灯具、从外壳这条路找回去，' +
      '<b>外壳直接变成 220 V 的带电体</b>。' +
      '<span class="sub">这就是「PE 和 N 不能混接」的由来。' +
      '书上把它和接相线并列写进了同一句禁令。</span>';
  }else{
    h = '<div class="st good">没有预留地线：包好，不接</div>' +
      '书上原话是<b>「若无预留地线可不接」</b>。' +
      '老房子顶上常常只有两根线，这时候把黄线<b>单独包好绝缘</b>，' +
      '让它不碰到任何东西 —— <b>包括不碰零线</b>。' +
      '<hr>为什么宁可不接也不能接零线？见上一档：' +
      '零线上有电压降，而且零线一断外壳就带相电压。' +
      '<b>不接只是「没有保护」，接错是「制造了一个带电的外壳」</b>，两者差得远。' +
      '<span class="sub">真要补地线，正确做法是从配电箱的 PE 排单独引一根过来，' +
      '不是就近找一根凑合。</span>';
  }
  $('n2').innerHTML = h;
}

/* ================================================================
   场景 4：公共照明
   ================================================================ */
const FLY = [72, 106, 140, 174];         /* 四层 */
const RL = 118, RN = 310;                /* 照明干线：L 在左、N 在右 */
const SWA = 166, SWB = 196, ELX = 252;
const S4 = { t:0, fl:[true, true, false, true], p:0, lux:120 };

function draw4a(g){
  EP.heading(g, 14, 20, '楼道照明', '每层一灯一开关，全部并联在干线上');
  /* 配电箱 */
  box(g, 96, 190, 234, 38, 6, C.box, C.boxLine, 1.4);
  txt(g, '照明配电箱', 262, 209, {sz:9.5, b:1, c:C.tx3});
  EC.head(g, 90, 209, 1, 0, 6, C.tx3);
  EP.chip(g, 'AC 380 V', 18, 209, {sz:8.5, b:1, c:C.tx3, al:'left'});
  /* 两条干线 */
  EP.wire(g, new Path([[RL, 190],[RL, 58]]), {c:'red'});
  EP.wire(g, new Path([[RN, 190],[RN, 58]]), {c:'blue'});
  txt(g, '干线 L', RL + 5, 44, {sz:9, b:1, c:C.L, al:'left'});
  txt(g, 'N', RN + 5, 44, {sz:9, b:1, c:C.N, al:'left'});
  /* 断路器（画在箱内的 L 干线上） */
  box(g, RL - 9, 196, 18, 26, 3, C.card, C.boxLine, 1.2);
  seg(g, [[RL, 200],[RL + 5, 218]], C.wire, 2.2);
  txt(g, '照明断路器', RL + 16, 209, {sz:8.5, c:C.tx3, al:'left'});

  FLY.forEach(function(y, i){
    const on = S4.fl[i];
    txt(g, (FLY.length - i) + 'F', 100, y, {sz:9, b:1, c:C.tx3, al:'right'});
    seg(g, [[RL, y],[SWA, y]], C.L, 2.2);
    /* 单极开关（横着） */
    g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.6; g.lineCap='round';
    g.beginPath(); g.moveTo(SWB, y - 6); g.lineTo(SWB, y + 6); g.stroke();
    g.beginPath(); g.moveTo(SWA, y);
    if(on) g.lineTo(SWB - 1, y - 4); else g.lineTo(SWB - 4, y - 15);
    g.stroke(); g.restore();
    dot(g, SWA, y, C.wire, 2.8);
    seg(g, [[SWB, y],[ELX - 12, y]], C.wire, 2.2);
    seg(g, [[ELX + 12, y],[RN, y]], C.N, 2.2);
    dot(g, RL, y, C.L, 3); dot(g, RN, y, C.N, 3);
    if(on){
      const p = new Path([[RL, y],[SWA, y],[SWB - 1, y - 4],[SWB, y],[ELX - 12, y]]);
      dots(g, p, {gap:36, r:2.8, color:C.cur, phase:14});
    }
    EC.lamp(g, ELX, y, 12, on ? 1 : 0);
    hot(g, (SWA + SWB)/2, y - 2, 0, {w:44, h:28, r:6});
  });
  txt(g, 'SA', (SWA+SWB)/2, FLY[0] - 14, {sz:8.5, c:C.tx3});
  txt(g, 'EL', ELX, FLY[0] - 14, {sz:8.5, c:C.tx3});

  const n = S4.fl.filter(function(v){ return v; }).length;
  conc(g, 236, 'ok', '每层一条支路，全部并联在照明干线上',
       '现在 ' + n + ' 层亮着 —— 关掉哪一层都不影响别层，这就是并联');
}

/* 路灯控制器：四个脚 ＋ 一个探头。**探头装在哪儿决定它看见什么** */
const CB = { x0:46, x1:250, y0:76, y1:226 };
const MD = { x0:84, x1:212, y0:104, y1:180 };
const PIN_A = 132, PIN_B = 164, JACKX = 148;
function lampsOn(){ return (S4.p === 1 ? 0 : S4.lux) < 10; }

function draw4b(g){
  EP.heading(g, 14, 20, '路灯控制器', '左两脚进电，右两脚出去接灯');
  /* 户外光线 */
  const b = Math.min(1, S4.lux / 160);
  box(g, 18, 40, 324, 18, 4, C.box, C.boxLine, 1);
  g.save(); g.globalAlpha = 0.10 + b * 0.55;
  box(g, 19, 41, 322, 16, 4, '#cfe0f2', null, 0); g.restore();
  txt(g, '户外　' + S4.lux + ' lx　' + (S4.lux < 10 ? '天黑了' : (S4.lux < 40 ? '傍晚' : '白天')),
      180, 49, {sz:9, b:1, c: b > 0.45 ? C.tx : C.tx2});

  box(g, CB.x0, CB.y0, CB.x1-CB.x0, CB.y1-CB.y0, 8, C.box, C.boxLine, 1.6);
  txt(g, '控制箱', CB.x0 + 8, CB.y1 - 12, {sz:9, c:C.tx3, al:'left'});
  box(g, MD.x0, MD.y0, MD.x1-MD.x0, MD.y1-MD.y0, 5, P.body, P.bodyL, 1.4);
  txt(g, '路灯控制器', (MD.x0+MD.x1)/2, MD.y0 + 18, {sz:9.5, b:1, c:P.inkLL});

  [[PIN_A,'red',C.L,'L'], [PIN_B,'blue',C.N,'N']].forEach(function(t){
    EP.wire(g, new Path([[10, t[0]],[MD.x0, t[0]]]), {c:t[1]});
    box(g, MD.x0 - 5, t[0] - 6, 14, 12, 2, P.steel, P.steelD, 1);
    txt(g, t[3], 16, t[0] - 12, {sz:9, b:1, c:t[2], al:'left'});
    box(g, MD.x1 - 9, t[0] - 6, 14, 12, 2, P.steel, P.steelD, 1);
    EP.wire(g, new Path([[MD.x1, t[0]],[300, t[0]]]), {c:t[1]});
  });
  txt(g, '供电端', MD.x0 + 4, MD.y0 - 9, {sz:8.5, c:C.tx3, al:'left'});
  txt(g, '负载端', MD.x1 - 4, MD.y0 - 9, {sz:8.5, c:C.tx3, al:'right'});
  /* 照明灯跨在两根出线之间 —— 原来单画一盏浮在右上角，看着跟线断了一样 */
  seg(g, [[300, PIN_A],[300, PIN_B]], C.wire, 2.2);
  txt(g, '→ 照明灯', 300, 96, {sz:9, b:1, c:C.tx2});
  EC.lamp(g, 300, (PIN_A + PIN_B)/2, 13, lampsOn() ? 1 : 0);

  /* 探头 */
  box(g, JACKX - 7, MD.y1 - 4, 14, 8, 2, P.steel, P.steelD, 1);
  const inside = S4.p === 1;
  const px = inside ? 150 : 252, py = inside ? 190 : 188;
  seg(g, inside ? [[JACKX, MD.y1 + 4],[JACKX, py + 10],[px, py + 10]]
                : [[JACKX, MD.y1 + 4],[JACKX, py + 10],[px, py + 10]], C.wire, 2);
  box(g, px, py, 34, 22, 5, P.body, P.bodyL, 1.2);
  g.save(); g.fillStyle = inside ? C.tx3 : (b > 0.3 ? C.warn : C.tx3);
  g.beginPath(); g.arc(px + 17, py + 11, 5, 0, Math.PI*2); g.fill(); g.restore();
  txt(g, '探头', px + 17, py + 32, {sz:8.5, b:1, c: inside ? C.err : C.ok});

  const wrong = inside && S4.lux >= 10;
  conc(g, 236, wrong ? 'err' : (lampsOn() ? 'ok' : 'acc'),
       inside ? (wrong ? '探头装在箱子里：白天也把灯全打开了' : '探头装在箱里，这回碰巧对了')
              : (lampsOn() ? '天黑了，控制器把灯打开' : '天还亮，控制器让灯灭着'),
       inside ? '箱里永远是黑的 —— 控制器一直以为是夜里'
              : '探头要固定在配电柜侧面，测的是户外光线的亮度');
}
function draw4(){
  const g = st4.g; st4.clear();
  if(S4.t === 0) draw4a(g); else draw4b(g);
}
function note4(){
  const led = S4.t === 1;
  $('s4k1').textContent = led ? '户外照度' : '楼层数';
  $('s4k2').textContent = led ? '探头装在' : '每层几件';
  $('s4k3').textContent = led ? '路灯' : '支路怎么接';
  $('s4a').textContent = led ? (S4.lux + ' lx') : '4 层';
  $('s4b').textContent = led ? (S4.p ? '箱子里' : '箱外侧面') : '1 灯 1 开关';
  $('s4c').textContent = led ? (lampsOn() ? '亮' : '灭') : '全部并联';
  let h;
  if(!led){
    const n = S4.fl.filter(function(v){ return v; }).length;
    h = '<div class="st">干线 ＋ 支路：楼道照明的骨架</div>' +
      '照明配电箱里的<b>照明断路器</b>引出一相和零线，' +
      '沿楼梯间往上敷设成<b>照明干线</b>；每层从干线上分出一条<b>支路</b>，' +
      '接一个控制开关和一盏灯。现在 <b>' + n + '</b> 层亮着。' +
      '<hr><b>每层支路是并联的</b>，所以某一层的灯坏了、开关坏了，' +
      '其他层照常。要是串起来，一层灯丝断了整栋楼全黑 —— ' +
      '1.4 讲的那条规律，到这儿变成了一条设计要求。' +
      '<span class="sub">进线是 <b>AC 380 V</b> 三相，' +
      '每条照明支路取<b>一相 ＋ 零线 ＝ 220 V</b>。' +
      '楼层多的时候三相要<b>轮着分配</b>，不然一相带得多、另两相闲着，' +
      '零线上的电流就下不去。</span>';
  }else{
    h = '<div class="st">' + (S4.p ? '探头装在箱子里 —— 这是个装错的典型' : '四个脚：左边进、右边出') + '</div>';
    if(!S4.p){
      h += '<b>左侧两个引脚是供电端</b>（相线、零线进来），' +
        '<b>右侧两个引脚是负载端</b>（出去接照明灯）。' +
        '<b>探头接在侧面的插孔上</b>，用来检测户外光线的亮度。' +
        '<hr>现在户外 <b>' + S4.lux + ' lx</b>，' +
        (lampsOn() ? '低于控制器的动作门限，它把负载端接通，路灯全亮。'
                   : '还够亮，控制器让负载端断着，路灯不亮。') +
        '<b>拖滑杆把天色调暗，看它什么时候动作。</b>';
    }else{
      h += '控制器本身没坏、线也没接错，可<b>探头装进了控制箱里面</b>。' +
        '箱里永远是黑的，探头一直报告「天黑了」，于是' +
        '<b>控制器白天也把灯全打开</b>。' +
        '<hr>这一类故障特别难查：<b>接线挑不出毛病，测量也全正常</b>，' +
        '毛病在「传感器装错了位置」。' +
        '<span class="sub">书上写死了：<b>探头固定在配电柜的侧面。</b>' +
        '同一条道理，2.4 讲传感器时说过 —— 传感器没有「应有读数」，' +
        '只能改变条件看它动不动。这里改变的条件就是遮住 / 露出探头。</span>';
    }
    h += '<hr><b>装控制器还有一条：周围要留出散热空间。</b>' +
      '书上原话是「确保其周围有足够的空间使其散热」——' +
      '塞在角落、四周贴满线，夏天箱内温度上去就死机或误动作。';
  }
  $('n3').innerHTML = h;
}

/* ================================================================
   舞台、交互、绑定
   ================================================================ */
const st1 = new Stage('cv0', 360, 272);
const st2 = new Stage('cv1', 360, 248);
const st3 = new Stage('cv2', 360, 284);
const st4 = new Stage('cv3', 360, 276);

/* 屏 1 */
function sync1(){ note1(); draw1(); }
document.getElementById('s1h').addEventListener('input', function(e){ S1.h = +e.target.value; sync1(); });
document.getElementById('s1d').addEventListener('input', function(e){ S1.d = +e.target.value; sync1(); });

/* 屏 2 */
function go2(d){
  S2.k = Math.max(0, Math.min(5, S2.k + d));
  document.getElementById('s2prev').disabled = (S2.k === 0);
  document.getElementById('s2next').disabled = (S2.k === 5);
  note2(); draw2();
}
document.getElementById('s2prev').addEventListener('click', function(){ go2(-1); });
document.getElementById('s2next').addEventListener('click', function(){ go2(1); });
st2.cv.addEventListener('click', function(){ go2(S2.k === 5 ? -5 : 1); });

/* 屏 3 */
function sync3(){
  document.getElementById('s3k').style.display = S3.t ? '' : 'none';
  note3(); draw3();
}
document.getElementById('s3t').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S3.t = +t.dataset.t;
  document.querySelectorAll('#s3t .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.t === S3.t);
  });
  sync3();
});
document.getElementById('s3k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S3.k = +t.dataset.k;
  document.querySelectorAll('#s3k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S3.k);
  });
  sync3();
});

/* 屏 4 */
function sync4(){
  const led = S4.t === 1;
  document.getElementById('s4p').style.display = led ? '' : 'none';
  document.getElementById('s4lab').style.display = led ? '' : 'none';
  document.getElementById('s4n').style.display = led ? '' : 'none';
  note4(); draw4();
}
document.getElementById('s4t').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S4.t = +t.dataset.t;
  document.querySelectorAll('#s4t .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.t === S4.t);
  });
  sync4();
});
document.getElementById('s4p').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S4.p = +t.dataset.p;
  document.querySelectorAll('#s4p .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.p === S4.p);
  });
  sync4();
});
document.getElementById('s4n').addEventListener('input', function(e){
  S4.lux = +e.target.value; $('s4nv').textContent = S4.lux + ' lx'; sync4();
});
st4.cv.addEventListener('click', function(ev){
  if(S4.t !== 0) return;
  const p = st4.pick(ev);
  FLY.forEach(function(y, i){
    if(Math.abs(p[1] - y) < 17 && p[0] > 138 && p[0] < 226){ S4.fl[i] = !S4.fl[i]; }
  });
  sync4();
});

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会重设尺寸并清空。**四屏全是静态的，必须在这儿逐个补画** */
  draw1(); draw2(); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:7, sec:'7.2'});
ElecUI.bind(document);
document.getElementById('s2prev').disabled = true;
note1(); note2(); sync3(); sync4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('7.2');
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
