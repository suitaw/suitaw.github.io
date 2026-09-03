/* 3.1 手上的工具：哪把干哪个活 —— 本节内容的唯一真相。
   对应《零基础学电工》第 3 章 3.1~3.4 节（书内 P48~P56），四节合成一节。

   **这一节 2026-09-03 补做，原来是整个跳过的。**
   原判断：「考纲里工具只值四道常识题，而手上的劲网页教不了」——
   **那个判断漏了里面纯知识的那一层**。回头看题库 7-C 组那五道题：
   钢丝钳四个部位各干什么／钳柄耐压 500V／手柄绝不能敲／尖嘴钳 150mm 指总长／
   剥线钳刃口比线径稍大 —— **没有一道考手法**，全是「选哪把、用哪处、多大尺寸」。
   这跟 7.3 那次是同一个错：**拿「手法教不了」否定整节，把里面能教的一层一起扔了。**

   所以这一节只教三样：**哪把干哪个活 / 哪个部位干什么 / 什么样算用错了**。
   手上的活（推削的劲、压接的力道、扳手的角度）仍然不教；
   剥线的尺寸和判据在 **6.1**，电工刀 45° 那一条两边都写，因为两处都要用。

   四屏：① 钢丝钳的四个部位 ② 六把钳子对六个活 ③ 螺钉旋具与电工刀 ④ 扳手与五个考点

   数字与说法的出处：
   【书上原文】
   - 钢丝钳**又叫老虎钳**，用于线缆的剪切、绝缘层的剥削、线芯的弯折、螺母的松动和紧固；
     钳头又可分为**钳口、齿口、刀口和铡口**，**钳柄外是由绝缘套保护**
   - 使用钢丝钳一般多采用右手操作，**使钢丝钳的钳口朝内**，便于控制切的部位。
     **钳口弯绞导线，齿口用于紧固或拧松螺母，刀口用于修剪导线以及拔取铁钉，
     铡口可用于铡切较硬的导线或金属丝**
   - 斜口钳**又叫偏口钳**，用于线缆绝缘皮的剥削或线缆的剪切，钳头为**偏斜式的刀口**，
     可贴近导线或金属的根部切割。使用时**将偏斜式刀口正面朝上，背面靠近需要切割导线的位置**
   - 尖嘴钳**钳头部分较细，可以在较小的空间里进行操作**，分带刀口和无刀口两种。
     使用时**用右手握住钳柄，不可以将钳头对向自己**
   - 剥线钳用来剥除线缆的绝缘层，分**压接式剥线钳和自动剥线钳**两种
   - 压线钳用于**线缆与连接头的加工**，压接连接件大小不同，**内置的压线孔也有所不同**
   - 网线钳**专用于网线水晶头与电话线水晶头的加工**
   - 螺钉旋具**又称螺丝刀，俗称改锥**，由螺钉旋具头与手柄构成。
     一字槽的头部为**薄楔形头**；十字槽的刀头由**两个薄楔形片十字交叉构成**
   - **要确保螺钉旋具的绝缘手柄性能良好，不可在操作过程中用手触碰螺钉旋具的金属部分**
   - 电工刀由**刀柄与刀片**两部分组成，分普通电工刀和多功能电工刀
     （多功能的除切削外还增添了锯、锉、钻等功能，带有锯条、锥子等）；
     **普通电工刀的刀片可以弯折入刀柄中**
   - 用电工刀剥削绝缘层：**一只手握住刀柄，将刀口朝外，使刀刃与线缆绝缘层成 45° 切入**，
     切入后**将刀刃略翘起一些（约 25°），用力向线端推削**，
     **一定注意不要切削到线芯**
   - 活扳手由**扳口、蜗轮和手柄**组成，**推动蜗轮时即可调整、改变扳口的大小**
   - 呆扳手两端带有开口的夹柄，**夹柄的大小与扳口的大小成正比**，
     **呆扳手的尺寸与螺母的尺寸是相对应的**
   - 梅花棘轮扳手两端是**环形的六角孔或十二角孔**的工作端，
     **工作端不可以进行改变，所以使用时需要配置整套**
   - 用呆扳手时**与螺母成水平状态**转动；用活扳手时**大拇指拨动蜗轮**调节扳口

   【题库 7-C 组，五道题五个数】
   - 第 236 题：带塑料套柄的钢丝钳，**耐压等级 500 V 以上**（题库口径。
     市面产品常印 1000V，那是按更高要求做的，**考试按 500V 答**）
   - 第 250 题：钢丝钳的用途**不包括「手柄用来敲击螺栓」** ——
     手柄只负责绝缘和握持
   - 第 238 题：尖嘴钳「150mm」指的是**总长度**（钳类工具标的尺寸一律是全长）
   - 第 237 题：剥线钳应选比导线直径**稍大**的刃口
     （相同会削伤线芯，较大则剥不掉绝缘）
   - 第 240 题：**电烙铁用于锡焊**（锡熔点约 232 ℃；铜焊铁焊上千度，电烙铁达不到）*/
(function(){
'use strict';
ELEC.reg({
  id: '3.1',
  file: 'c3-1.html',
  title: '3.1 手上的工具',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>钢丝钳四处</button>
    <button class="tab" data-i="1"><span class="n">2</span>六把钳子</button>
    <button class="tab" data-i="2"><span class="n">3</span>旋具与电工刀</button>
    <button class="tab" data-i="3"><span class="n">4</span>扳手与考点</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">一把钳子上有四个口，各干各的活</div>
    钢丝钳（又叫<b>老虎钳</b>）的钳头分成<b>钳口、齿口、刀口、铡口</b>四处，
    书上给每一处都定死了用途。<b>还有第五处 —— 手柄，它什么活都不干。</b>
    <b>点画布上的任意一处。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="nums three">
        <div class="num"><div class="k">这一处</div><div class="v" id="s1a">钳口</div></div>
        <div class="num"><div class="k">干什么</div><div class="v" id="s1b">弯绞导线</div></div>
        <div class="num hi"><div class="k">能不能<br>干别的</div><div class="v" id="s1c">不能</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">四个口，书上一处一句（P50 原文）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>位置</th><th>书上写的用途</th><th>在哪儿</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">钳口</td><td><b>弯绞导线</b>、钳夹导线线头</td><td>最前端，平口</td></tr>
        <tr><td class="eu-s">齿口</td><td><b>紧固或拧松螺母</b></td><td>钳口后面，带齿</td></tr>
        <tr><td class="eu-s">刀口</td><td><b>修剪导线</b>、剖绝缘层、<b>拔取铁钉</b></td><td>再往后，一条刃</td></tr>
        <tr><td class="eu-s">铡口</td><td><b>铡切较硬的导线或金属丝</b></td><td>最靠近轴心，力最大</td></tr>
        <tr><td class="eu-s rd">手柄</td><td class="rd"><b>只负责绝缘和握持</b>，什么都不敲</td><td>外面那层绝缘套</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>铡口为什么在最里面：越靠近轴心，力越大。</b>
      <span class="sub">钳子是个杠杆，手握的地方到轴心是动力臂，口到轴心是阻力臂。
      铡口离轴心最近，阻力臂最短，同样的手劲能铡断更硬的东西。
      拿钳口去铡钢丝，除了铡不断，还会把钳口硌出豁口。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">手柄绝不能拿来敲东西（考点，第 250 题）</div>
    题库那道题问「钢丝钳的用途<b>不包括</b>哪个」，答案就是
    <b>「手柄用来敲击螺栓」</b>。这不是抠字眼：
    <div class="tip">
      <b>敲一下，塑料套里面就可能裂了，而从外面看不出来。</b>
      <span class="sub">钳柄那层绝缘套是按<b>耐压 500 V 以上</b>做的（题库口径，
      第 236 题），它是你带电作业时手和电之间唯一的东西。
      <b>裂了的绝缘套外观完好，下次带电用它的时候才发现</b> —— 那时候已经晚了。
      同理：钳子不能当锤子、不能撬东西、掉过地上的要检查绝缘套。</span>
    </div>
  </div>

  <div class="bet" data-bet="c31-jaw" data-q="要铡断一根较硬的钢丝，该用钢丝钳的哪一处？"
       data-opts="钳口，最前面好对准|铡口，它最靠近轴心，同样的手劲力最大|刀口，那是专门用来切的"
       data-right="1"
       data-after="铡口。书上原话就是「铡口可用于铡切较硬的导线或金属丝」。道理在杠杆上：铡口离轴心最近，阻力臂最短，同样的手劲能使出最大的力。刀口是修剪导线用的，拿它铡钢丝会崩刃；钳口是平的，根本切不断。"></div>
</section>

<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">六把钳子，六个活，别拿错</div>
    书上 3.1 一节列了六把：<b>钢丝钳、斜口钳、尖嘴钳、剥线钳、压线钳、网线钳</b>。
    <b>点一个活，看该用哪把。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">剪硬线</button>
        <button class="btn sm" data-k="1">贴根剪</button>
        <button class="btn sm" data-k="2">伸小空间</button>
        <button class="btn sm" data-k="3">剥绝缘</button>
        <button class="btn sm" data-k="4">压端子</button>
        <button class="btn sm" data-k="5">做网线</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这个活</div><div class="v" id="s2a">剪硬线</div></div>
        <div class="num"><div class="k">用哪把</div><div class="v" id="s2b">钢丝钳</div></div>
        <div class="num hi"><div class="k">用哪一处</div><div class="v" id="s2c">刀口</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">六把钳子的分工（书 P48~P49）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>名字</th><th>书上写的用途</th><th>认它靠什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">钢丝钳<br><span class="sub">老虎钳</span></td>
          <td>剪切、剥绝缘层、弯折线芯、松紧螺母</td><td>钳头厚，四个口都有</td></tr>
        <tr><td class="eu-s">斜口钳<br><span class="sub">偏口钳</span></td>
          <td>剥绝缘皮、剪线，<b>可贴近根部切割</b></td><td><b>偏斜式刀口</b></td></tr>
        <tr><td class="eu-s">尖嘴钳</td>
          <td><b>可以在较小的空间里操作</b>；分带刀口和无刀口</td><td>钳头细长</td></tr>
        <tr><td class="eu-s">剥线钳</td>
          <td>剥除绝缘层；分<b>压接式</b>和<b>自动</b>两种</td><td>一排不同尺寸的剥线口</td></tr>
        <tr><td class="eu-s">压线钳</td>
          <td>线缆与<b>连接头</b>的加工</td><td>内置几个不同直径的压线孔</td></tr>
        <tr><td class="eu-s">网线钳</td>
          <td><b>专用于</b>网线／电话线<b>水晶头</b>的加工</td><td>钳头有水晶头加工口</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>尖嘴钳标的「150mm」是总长度，不是钳口开多大</b>（考点，第 238 题）。
      <span class="sub">钳类工具标的尺寸<b>一律是全长</b>，钢丝钳的 150／175／200 也一样。
      记法：买钳子说「六寸钳」，说的就是它整个多长。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">剥线钳的刃口要比线径「稍大」（考点，第 237 题）</div>
    这道题三个选项在考<b>分寸</b>：
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>选</th><th>结果</th></tr></thead>
      <tbody>
        <tr><td class="eu-s rd">相同</td><td>刃口正好卡住线芯，一拉<b>把铜丝也切断或拉细了</b></td></tr>
        <tr><td class="eu-s"><b>稍大</b> ✓</td><td>只切断绝缘皮，<b>不伤铜芯</b></td></tr>
        <tr><td class="eu-s rd">较大</td><td>绝缘皮切不断，<b>白拉一下</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>这正是剥线钳有那么多档孔径的原因</b> —— 按线径选对应的那个孔。
      <span class="sub">6.1 里那条「按截面积选工具，<b>4 mm²（线径 2.25 mm）是分界</b>」
      说的是另一层：多粗的线该用剥线钳、多粗的该用电工刀。
      两条一起用：先定用哪种工具，再定用哪个孔。</span>
    </div>
  </div>
</section>

<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">一字、十字，和一把 45° 下刀的电工刀</div>
    螺钉旋具（<b>螺丝刀，俗称改锥</b>）看着最简单，却有一条硬规矩；
    电工刀那三个角度是<b>书上写死的数</b>。<b>点四个步骤看一遍。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">一字槽</button>
        <button class="btn sm" data-k="1">十字槽</button>
        <button class="btn sm" data-k="2">45° 切入</button>
        <button class="btn sm" data-k="3">翘 25° 推削</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">现在讲</div><div class="v" id="s3a">一字槽</div></div>
        <div class="num"><div class="k">书上的数</div><div class="v" id="s3b">薄楔形头</div></div>
        <div class="num hi"><div class="k">最要命的</div><div class="v" id="s3c">别碰金属</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">螺钉旋具唯一那条硬规矩（书 P53 原文）</div>
    <b>「要确保螺钉旋具的绝缘手柄性能良好，不可在操作过程中用手触碰螺钉旋具的金属部分。」</b>
    <div class="tip">
      <b>在配电箱里拧端子的时候，这句话是保命的。</b>
      <span class="sub">你的一只手握着绝缘柄，另一只手很自然会去扶一下刀杆 ——
      那根杆此刻可能正搭在带电的端子上。
      现在市面上大多数电工螺丝刀的杆上有一层塑料套，只露出头部一小截，
      就是为这个做的。<b>杆全裸的那种别拿进配电箱。</b></span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">电工刀的三个数（书 P53 原文，6.1 也用这一条）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>步</th><th>书上写的</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">拿</td><td><b>一只手握住刀柄，将刀口朝外</b></td></tr>
        <tr><td class="eu-s">切入</td><td>使刀刃与线缆绝缘层成 <b>45°</b> 切入</td></tr>
        <tr><td class="eu-s">推</td><td>切入后<b>将刀刃略翘起一些（约 25°）</b>，用力<b>向线端推削</b></td></tr>
        <tr><td class="eu-s rd">底线</td><td class="rd"><b>一定注意不要切削到线芯</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>为什么要先 45° 切进去、再翘到 25° 推 —— 两个角度管两件事。</b>
      <span class="sub">45° 是<b>切得进去</b>的角度：太平了划不破绝缘层，太陡了一刀扎到铜。
      切进去之后把刀刃放平到约 25°，刀刃就<b>贴着线芯表面往前滑</b>，
      削掉的是绝缘层、碰不到铜。<b>刀口朝外</b>是因为推削的方向是离开身体的，
      万一打滑刀不会往手上带。</span>
    </div>
  </div>

  <div class="bet" data-bet="c31-knife" data-q="用电工刀剥绝缘层，切进去之后为什么要把刀刃翘起来放平（约 25°）？"
       data-opts="这样省力|放平之后刀刃是贴着线芯表面往前滑的，削掉绝缘层却碰不到铜；一直保持 45° 会扎进线芯|为了切口好看"
       data-right="1"
       data-after="为了不切到线芯。45° 是「切得进去」的角度，切进去之后目的就变了——要沿着线芯往前削。放平到约 25°，刀刃贴着铜的表面滑过去，削的是绝缘层。一直保持 45° 往前推，那就是往铜里扎。书上给这两个数，讲的正是同一把刀在两个阶段的两个任务。"></div>
</section>

<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">扳手三种，和考试一定会考的五个数</div>
    扳手这一节能记的只有一条：<b>哪一种能调、哪一种要配整套</b>。
    后半屏是这一章工具部分<b>全部的考点</b> —— 题库 7-C 组就那五道题。
    <b>点三把扳手各看一眼。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">活扳手</button>
        <button class="btn sm" data-k="1">呆扳手</button>
        <button class="btn sm" data-k="2">梅花棘轮</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这一把</div><div class="v" id="s4a">活扳手</div></div>
        <div class="num"><div class="k">扳口能<br>不能调</div><div class="v" id="s4b">能调</div></div>
        <div class="num hi"><div class="k">要不要<br>配整套</div><div class="v" id="s4c">不用</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">三把扳手的分别（书 P54~P55）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>名字</th><th>结构</th><th>能不能调</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">活扳手</td><td><b>扳口 + 蜗轮 + 手柄</b>，
          <b>推动蜗轮即可改变扳口大小</b></td><td><b>能</b>，一把顶一堆</td></tr>
        <tr><td class="eu-s">呆扳手</td><td>两端带开口的夹柄，
          <b>夹柄大小与扳口大小成正比</b>；上面标着尺寸</td>
          <td>不能，<b>尺寸与螺母相对应</b></td></tr>
        <tr><td class="eu-s">梅花<br>棘轮</td><td>两端是<b>环形的六角孔或十二角孔</b></td>
          <td>不能，<b>工作端不可改变<br>→ 要配整套</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>能调的那把最方便，也最容易打滑。</b>
      <span class="sub">活扳手的扳口是靠蜗轮夹住的，调不紧就会在螺母上滑动，
      把六角边磨圆（俗称「打滑」「滚牙」）。所以书上用它的第一步是
      <b>看清螺母大小，卡住，再用大拇指拨蜗轮调到位</b>。
      梅花扳手是整圈套住螺母的，六个角同时受力，最不容易滑 ——
      代价就是<b>一个尺寸一把，得配整套</b>。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st good">工具这一部分，考试就考这五个（题库 7-C 组）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>问的是</th><th>答案</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">带塑料套柄的钢丝钳，耐压等级</td><td><b>500 V 以上</b></td></tr>
        <tr><td class="eu-s">钢丝钳的用途<b>不包括</b></td><td><b>手柄用来敲击螺栓</b></td></tr>
        <tr><td class="eu-s">尖嘴钳「150mm」指的是</td><td><b>总长度</b></td></tr>
        <tr><td class="eu-s">剥线钳选多大的刃口</td><td>比导线直径<b>稍大</b></td></tr>
        <tr><td class="eu-s">电烙铁用于</td><td><b>锡焊</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>判别口诀：凡是「用手柄敲」「拿钳子当锤子」的选项，一律是错的。</b>
      <span class="sub">另外那道耐压题：<b>题库按 500 V 记</b>。
      市面上很多电工钳柄上印着「1000V」，那是按更高要求做的产品 ——
      <b>考试按题库答 500 V，现场选工具当然是耐压标得越高越好。</b>
      电烙铁那道：锡的熔点约 232 ℃，电烙铁三四百度刚好熔得动；
      铜焊铁焊要上千度，它根本达不到。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="3.1">
    <div class="qz" data-q="钢丝钳的钳口、齿口、刀口、铡口，哪一处是用来拧螺母的？"
      data-opts="钳口|齿口|铡口"
      data-right="1"
      data-why="书上原话：钳口弯绞导线，齿口用于紧固或拧松螺母，刀口用于修剪导线以及拔取铁钉，铡口可用于铡切较硬的导线或金属丝。四个口一处一句，别记混——齿口带齿，正好咬住六角螺母。"></div>
    <div class="qz" data-q="带塑料套柄的钢丝钳，题库里那道题的耐压等级答案是多少？"
      data-opts="1000 V 以上|500 V 以上|380 V 以上"
      data-right="1"
      data-why="题库按 500 V 记（第 236 题）。市面上很多钳子柄上印着 1000V，那是按更高要求做的产品，不影响这道题的答案。考试答 500V，现场选工具当然是标得越高越好。"></div>
    <div class="qz" data-q="用剥线钳剥一根 1.5 mm² 的线，刃口该选多大？"
      data-opts="和导线直径相同的那个口|比导线直径稍大的那个口|随便哪个都行，用力控制就好"
      data-right="1"
      data-why="稍大（第 237 题）。选相同的口，刃口正好卡住线芯，一拉就把铜丝切断或拉细了；选太大的口，绝缘皮根本切不断。剥线钳有一排不同孔径就是为这个——按线径选对应的那个孔，靠工具保证分寸，不靠手上控制。"></div>
    <div class="qz" data-q="用电工刀剥绝缘层，书上给了两个角度：45° 和约 25°。它们分别是干什么的？"
      data-opts="45° 是切入的角度，切进去之后翘到约 25° 贴着线芯往前推削|45° 是推削角度，25° 是切入角度|两个角度可以互换，看顺手"
      data-right="1"
      data-why="45° 切入、约 25° 推削。45° 是「切得进去」的角度，太平划不破绝缘层、太陡一刀扎到铜；切进去之后把刀刃放平到约 25°，刀刃贴着线芯表面往前滑，削掉的是绝缘层却碰不到铜。另外刀口要朝外——推削是离开身体的方向，打滑时刀不会往手上带。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 3 章 3.1~3.4 节（书内 P48~P56）</div>
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

function seg(g, pts, c, lw){ new Path(pts).stroke(g, lw || 2.2, c || C.wire); }
const CONC = { ok:['okbg','ok'], err:['errbg','err'], warn:['warnbg','warn'], acc:['accbg','acc'] };
function conc(g, y, kind, l1, l2){
  const m = CONC[kind] || CONC.acc;
  box(g, 16, y, 328, 34, 6, C[m[0]], C[m[1]], 1);
  txt(g, l1, 180, y + 13, {sz:10.5, b:1, c:C[m[1]]});
  txt(g, l2, 180, y + 26, {sz:9, c:C.tx2});
}
/* 钳柄：金属芯 + 外面那层绝缘套（套是真实材质色的红，不是语义红） */
function handle(g, x0, y0, x1, y1, sel){
  g.save(); g.lineCap = 'round';
  g.strokeStyle = P.steelD; g.lineWidth = 9;
  g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
  const t = 0.34;                                  /* 绝缘套从这儿起 */
  const mx = x0 + (x1-x0)*t, my = y0 + (y1-y0)*t;
  g.strokeStyle = sel ? C.err : '#b3402f'; g.lineWidth = 13;
  g.beginPath(); g.moveTo(mx, my); g.lineTo(x1, y1); g.stroke();
  g.strokeStyle = 'rgba(255,255,255,.16)'; g.lineWidth = 3;
  g.beginPath(); g.moveTo(mx + 3, my - 4); g.lineTo(x1 - 6, y1 - 4); g.stroke();
  g.restore();
}

/* ================================================================
   场景 1：钢丝钳的四个口
   ================================================================
   钳头画成上下两片，中间一条缝；沿缝从尖端往轴心依次是
   钳口 → 齿口 → 刀口 → 铡口。**顺序不能改** —— 这一屏教的就是它。
   第五个可点的是钳柄（手柄），它什么活都不干 */
const PIV = [206, 118];                            /* 轴心 */
const JAW = [
  {k:'钳口', x0:54,  x1:92,  use:'弯绞导线、钳夹线头', no:'不能拿它铡钢丝，会硌出豁口'},
  {k:'齿口', x0:92,  x1:130, use:'紧固或拧松螺母',     no:'不是用来夹导线的'},
  {k:'刀口', x0:130, x1:166, use:'修剪导线、拔取铁钉', no:'别拿它铡硬钢丝，会崩刃'},
  {k:'铡口', x0:166, x1:196, use:'铡切较硬的导线或金属丝', no:'离轴心最近，力最大'},
  {k:'手柄', x0:230, x1:340, use:'只负责绝缘和握持',   no:'绝对不能敲东西'}
];
const S1 = { k:0 };
function draw1(){
  const g = st1.g; st1.clear();
  const k = S1.k, sel = JAW[k];
  EP.heading(g, 14, 20, '钢丝钳', '又叫老虎钳');

  /* 两条钳柄 */
  handle(g, PIV[0], PIV[1], 344, 92,  k === 4);
  handle(g, PIV[0], PIV[1], 344, 150, k === 4);

  /* 钳头：上下两片，中间一条缝 */
  const YM = 118;
  g.save();
  g.fillStyle = P.steel; g.strokeStyle = P.steelD; g.lineWidth = 1.3;
  g.beginPath();
  g.moveTo(52, YM - 11); g.lineTo(150, YM - 20); g.lineTo(200, YM - 31);
  g.lineTo(200, YM - 3); g.lineTo(52, YM - 3); g.closePath();
  g.fill(); g.stroke();
  g.beginPath();
  g.moveTo(52, YM + 11); g.lineTo(150, YM + 20); g.lineTo(200, YM + 31);
  g.lineTo(200, YM + 3); g.lineTo(52, YM + 3); g.closePath();
  g.fill(); g.stroke();
  g.restore();

  /* 齿口的齿、刀口的刃、铡口的方缺，各画一个记号 */
  g.save(); g.strokeStyle = P.steelDD; g.lineWidth = 1;
  for(let x = 96; x < 128; x += 7){
    g.beginPath(); g.moveTo(x, YM - 3); g.lineTo(x + 3.5, YM - 9); g.stroke();
    g.beginPath(); g.moveTo(x, YM + 3); g.lineTo(x + 3.5, YM + 9); g.stroke();
  }
  g.lineWidth = 1.8;
  g.beginPath(); g.moveTo(132, YM - 3); g.lineTo(164, YM - 3); g.stroke();
  g.beginPath(); g.moveTo(132, YM + 3); g.lineTo(164, YM + 3); g.stroke();
  g.restore();
  box(g, 170, YM - 9, 18, 18, 2, C.bg, P.steelDD, 1.3);

  /* 轴心 */
  g.save(); g.fillStyle = P.chrome; g.strokeStyle = P.steelDD; g.lineWidth = 1.2;
  g.beginPath(); g.arc(PIV[0], PIV[1], 7, 0, Math.PI*2); g.fill(); g.stroke(); g.restore();
  txt(g, '轴心', PIV[0] + 18, PIV[1] - 30, {sz:8.5, c:C.tx3});

  /* 四个口的名字：交错上下排，不然挤在一起 */
  JAW.slice(0, 4).forEach(function(j, i){
    const cx = (j.x0 + j.x1)/2, up = i % 2 === 0;
    const on = i === k;
    txt(g, j.k, cx, up ? YM - 40 : YM + 42, {sz:9.5, b:1, c: on ? C.acc : C.tx3});
    g.save(); g.setLineDash([3,3]);
    g.strokeStyle = on ? C.acc : C.boxLine; g.lineWidth = 1;
    g.beginPath();
    g.moveTo(cx, up ? YM - 34 : YM + 36); g.lineTo(cx, up ? YM - 16 : YM + 16);
    g.stroke(); g.restore();
  });
  txt(g, '手柄　绝缘套', 300, 68, {sz:9.5, b:1, c: k === 4 ? C.err : C.tx3});

  /* 选中的那一处 */
  if(k < 4) hot(g, (sel.x0 + sel.x1)/2, YM, 0, {w: sel.x1 - sel.x0 + 10, h:34, r:7});
  else      hot(g, 292, 121, 0, {w:112, h:78, r:10});

  conc(g, 214, k === 4 ? 'err' : 'acc', sel.k + '：' + sel.use, sel.no);
}
function note1(){
  const T = [
    ['钳口 —— 弯绞导线', '弯绞导线', '不能',
     '钳头最前端那一段<b>平口</b>。书上给它的活是<b>弯绞导线、钳夹导线线头</b>。' +
     '<hr>做单股线的接线环（6.3 那一节）、把两根线头绞在一起，用的都是这儿。' +
     '<b>它是平的，切不断东西</b> —— 拿它去夹钢丝硬拧，只会在钳口上硌出豁口，' +
     '以后夹细线就夹不住了。'],
    ['齿口 —— 拧螺母', '拧螺母', '不能',
     '钳口后面那一小段<b>带齿的弧形口</b>，专门咬六角螺母。' +
     '书上原话：<b>齿口用于紧固或拧松螺母</b>。' +
     '<hr>它是<b>应急用的</b>：手边没有扳手、螺母又不大的时候拧一下。' +
     '<b>正经拧螺母还是要用扳手</b>（屏 4）—— 齿口只咬住两个面，' +
     '劲大了容易把六角边磨圆。'],
    ['刀口 —— 剪线、拔钉', '剪线、拔钉', '不能',
     '再往里那一条<b>刃</b>。书上给它两个活：<b>修剪导线</b>，以及<b>拔取铁钉</b>' +
     '（用刃根卡住钉帽往外撬）。剖开绝缘层也是它。' +
     '<hr><b>别拿刀口去铡硬钢丝</b> —— 刃口薄，一铡就崩，' +
     '崩了以后剪细线会留毛刺。硬的东西交给下一处。'],
    ['铡口 —— 铡硬东西', '铡硬线', '力最大',
     '最靠近轴心的那个方口。书上原话：<b>铡口可用于铡切较硬的导线或金属丝</b>。' +
     '<hr><b>为什么最硬的活给最里面那个口：钳子是一根杠杆。</b>' +
     '手握的位置到轴心是动力臂，口到轴心是阻力臂。' +
     '<b>铡口离轴心最近，阻力臂最短，同样的手劲能使出最大的力。</b>' +
     '这也是钳口铡不断钢丝的原因 —— 不是你劲不够，是那个位置力矩不够。'],
    ['手柄 —— 什么活都不干', '只管绝缘', '不能敲',
     '这一处是<b>考点</b>（题库第 250 题）：问「钢丝钳的用途<b>不包括</b>哪个」，' +
     '答案是<b>「手柄用来敲击螺栓」</b>。' +
     '<hr><b>钳柄外面那层塑料套，是按耐压 500 V 以上做的</b>（题库口径，第 236 题）——' +
     '它是你带电作业时手和电之间唯一的东西。' +
     '<b>敲一下，里面可能就裂了，而从外面完全看不出来。</b>' +
     '<hr>同一条道理延伸出去：钳子不能当锤子、不能撬东西、' +
     '<b>掉过地上的要检查绝缘套</b>。绝缘工具的损坏几乎都是看不见的。']
  ][S1.k];
  $('s1a').textContent = JAW[S1.k].k;
  $('s1b').textContent = T[1];
  $('s1c').textContent = T[2];
  $('n0').innerHTML = '<div class="st' + (S1.k === 4 ? ' bad' : '') + '">' + T[0] + '</div>' + T[3];
}

/* ================================================================
   场景 2：六把钳子对六个活
   ================================================================
   六把钳子画成一排剪影（靠钳头形状区分），点一个活，对应那把亮起来。
   **形状差别要能一眼分出来** —— 这一屏教的就是「认哪把」*/
const PLIER = [
  {n:'钢丝钳', sub:'老虎钳',  head:'thick'},
  {n:'斜口钳', sub:'偏口钳',  head:'slant'},
  {n:'尖嘴钳', sub:'',        head:'thin'},
  {n:'剥线钳', sub:'',        head:'strip'},
  {n:'压线钳', sub:'',        head:'crimp'},
  {n:'网线钳', sub:'',        head:'rj45'}
];
const JOBS = [
  {j:'剪一根 2.5 mm² 的硬线', i:0, part:'刀口', full:'刀口',
   why:'钢丝钳的<b>刀口</b>。书上给钢丝钳的活里第一个就是<b>线缆的剪切</b>，' +
       '钳头厚、刃口硬，剪硬导线正合适。' +
       '<hr>要是这根线特别硬（或者是钢丝），就往里换一处 —— 用<b>铡口</b>。'},
  {j:'贴着接线柱根部剪掉多余的线头', i:1, part:'偏斜刀口', full:'偏斜式刀口',
   why:'<b>斜口钳</b>（又叫偏口钳）。书上原话：钳头为<b>偏斜式的刀口</b>，' +
       '<b>可以贴近导线或金属的根部进行切割</b>。' +
       '<hr>钢丝钳的刀口是正的，够不到根部，剪完总会留一小截。' +
       '用法上还有一条：<b>把偏斜式刀口的正面朝上、背面靠近要切的位置</b>，' +
       '这样切口才准。'},
  {j:'伸进接线盒里夹一个小线头', i:2, part:'细钳头', full:'细长的钳头',
   why:'<b>尖嘴钳</b>。书上原话：<b>钳头部分较细，可以在较小的空间里进行操作</b>。' +
       '它分带刀口和无刀口两种，带刀口的能顺手剪一下。' +
       '<hr>用法上书上专门交代了一句：<b>不可以将钳头对向自己</b>。' +
       '<hr><b>顺带一个考点</b>：尖嘴钳标的「150mm」是<b>总长度</b>，' +
       '不是钳口张多大（第 238 题）。钳类工具标的尺寸一律是全长。'},
  {j:'剥掉一段绝缘皮，不能伤铜芯', i:3, part:'对应的口', full:'对应线径的那个刃口',
   why:'<b>剥线钳</b>。它分<b>压接式</b>和<b>自动</b>两种。' +
       '<hr><b>关键在选哪个口</b>（考点，第 237 题）：要选比导线直径' +
       '<b>稍大</b>的刃口 —— 一样大会把铜丝也切断或拉细，' +
       '太大则绝缘皮根本切不断。<b>剥线钳有一排不同孔径，就是为这个。</b>' +
       '<hr>多粗的线用剥线钳、多粗的改用电工刀，那条分界在 <b>6.1</b>：' +
       '<b>4 mm²（线径 2.25 mm）</b>。'},
  {j:'把一个冷压端子压到线上', i:4, part:'对应的孔', full:'对应规格的压线孔',
   why:'<b>压线钳</b>。书上原话：用于<b>线缆与连接头的加工</b>，' +
       '<b>压接连接件的大小不同，内置的压线孔也有所不同</b>。' +
       '<hr>选孔的道理和剥线钳一样 —— <b>按端子的规格选对应那个孔</b>。' +
       '压接的手上功夫（压到什么程度算到位）网页教不了，' +
       '但有一条判据可以记：<b>压完拽一下，拽得动就是没压实</b>。'},
  {j:'做一根网线，装水晶头', i:5, part:'水晶头口', full:'水晶头加工口',
   why:'<b>网线钳</b>。书上原话：<b>专用于网线水晶头与电话线水晶头的加工</b>。' +
       '钳头上有 RJ45／RJ11 的加工口，还带一个剥线槽和一个刀口。' +
       '<hr>「专用」两个字是重点 —— <b>它压不了电工的冷压端子</b>，' +
       '那是压线钳的活。反过来压线钳也做不了水晶头。'}
];
const S2 = { k:0 };
const PX = [46, 96, 146, 196, 246, 300];           /* 六把的中心 x */
function plierIcon(g, x, y, kind, on){
  /* **选中不改元件的真实颜色**（规范里写死的）：钢就是钢、绝缘套就是红。
     选中只靠外面那圈 hot 虚线环和下面的名字变色 */
  const c = P.steel, cd = P.steelD;
  g.save(); g.strokeStyle = cd; g.fillStyle = c; g.lineWidth = 1.3; g.lineJoin = 'round';
  g.strokeStyle = '#b3402f'; g.lineWidth = 7; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x - 7, y + 8);  g.lineTo(x - 11, y + 42); g.stroke();
  g.beginPath(); g.moveTo(x + 7, y + 8);  g.lineTo(x + 11, y + 42); g.stroke();
  g.strokeStyle = cd; g.lineWidth = 1.3;
  g.fillStyle = P.chrome;
  g.beginPath(); g.arc(x, y + 6, 4, 0, Math.PI*2); g.fill(); g.stroke();
  g.fillStyle = c;
  if(kind === 'thick'){
    g.beginPath(); g.moveTo(x-9, y+4); g.lineTo(x-7, y-24); g.lineTo(x+7, y-24);
    g.lineTo(x+9, y+4); g.closePath(); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(x, y-24); g.lineTo(x, y+2); g.stroke();
  } else if(kind === 'slant'){
    g.beginPath(); g.moveTo(x-9, y+4); g.lineTo(x-10, y-18); g.lineTo(x+8, y-24);
    g.lineTo(x+9, y+4); g.closePath(); g.fill(); g.stroke();
    g.lineWidth = 1.8;
    g.beginPath(); g.moveTo(x-10, y-18); g.lineTo(x+8, y-24); g.stroke();
  } else if(kind === 'thin'){
    g.beginPath(); g.moveTo(x-9, y+4); g.lineTo(x-2, y-30); g.lineTo(x+2, y-30);
    g.lineTo(x+9, y+4); g.closePath(); g.fill(); g.stroke();
  } else if(kind === 'strip'){
    g.beginPath(); g.moveTo(x-11, y+4); g.lineTo(x-11, y-20); g.lineTo(x+11, y-20);
    g.lineTo(x+11, y+4); g.closePath(); g.fill(); g.stroke();
    g.strokeStyle = C.bg; g.lineWidth = 1.2;
    [-7,-2,3,8].forEach(function(dx, i){
      g.beginPath(); g.arc(x + dx, y - 10, 1.2 + i*0.5, 0, Math.PI*2); g.stroke();
    });
  } else if(kind === 'crimp'){
    g.beginPath(); g.moveTo(x-11, y+4); g.lineTo(x-9, y-22); g.lineTo(x+9, y-22);
    g.lineTo(x+11, y+4); g.closePath(); g.fill(); g.stroke();
    g.strokeStyle = C.bg; g.lineWidth = 1.4;
    [-5, 1, 7].forEach(function(dx){
      g.beginPath(); g.arc(x + dx, y - 11, 2.4, 0, Math.PI*2); g.stroke();
    });
  } else {
    g.beginPath(); g.moveTo(x-12, y+4); g.lineTo(x-12, y-24); g.lineTo(x+12, y-24);
    g.lineTo(x+12, y+4); g.closePath(); g.fill(); g.stroke();
    g.strokeStyle = C.bg; g.lineWidth = 1.2;
    g.strokeRect(x - 7, y - 20, 14, 11);
    for(let i = 0; i < 4; i++){
      g.beginPath(); g.moveTo(x - 5 + i*3.4, y - 20); g.lineTo(x - 5 + i*3.4, y - 14); g.stroke();
    }
  }
  g.restore();
}
function draw2(){
  const g = st2.g; st2.clear();
  const job = JOBS[S2.k];
  EP.heading(g, 14, 20, '这个活用哪把', job.j);

  PLIER.forEach(function(p, i){
    const on = i === job.i;
    plierIcon(g, PX[i], 96, p.head, on);
    txt(g, p.n, PX[i], 156, {sz:9, b:1, c: on ? C.acc : C.tx3});
    if(p.sub) txt(g, p.sub, PX[i], 168, {sz:8, c:C.tx3});
    if(on) hot(g, PX[i], 104, 0, {w:40, h:96, r:9});
  });

  conc(g, 186, 'ok', '用 ' + PLIER[job.i].n + '　·　' + job.full,
       PLIER[job.i].sub ? '书上又管它叫「' + PLIER[job.i].sub + '」' : '书上 3.1 一节六把钳子之一');
}
function note2(){
  const job = JOBS[S2.k];
  $('s2a').textContent = ['剪硬线','贴根剪','伸小空间','剥绝缘','压端子','做网线'][S2.k];
  $('s2b').textContent = PLIER[job.i].n;
  $('s2c').textContent = job.part;
  $('n1').innerHTML = '<div class="st">' + job.j + '</div>' + job.why;
}

/* ================================================================
   场景 3：螺钉旋具与电工刀
   ================================================================
   前两档画螺钉旋具（一字／十字，重点是绝缘手柄和那截裸露的金属杆），
   后两档画电工刀切绝缘层的两个角度 —— **角度是真按 45°／25° 画的** */
const S3 = { k:0 };
function draw3(){
  const g = st3.g; st3.clear();
  const k = S3.k;
  EP.heading(g, 14, 20,
    k < 2 ? '螺钉旋具' : '电工刀',
    k < 2 ? '螺丝刀　俗称改锥' : (k === 2 ? '45° 切入' : '翘起约 25° 推削'));

  if(k < 2){
    /* 手柄 + 刀杆 + 头 */
    const y = 108, x0 = 40, x1 = 200, x2 = 322;
    g.save(); g.lineCap = 'round';
    g.strokeStyle = k === 0 ? '#2f7d4f' : '#b3402f'; g.lineWidth = 30;
    g.beginPath(); g.moveTo(x0 + 14, y); g.lineTo(x1, y); g.stroke();
    g.strokeStyle = 'rgba(255,255,255,.14)'; g.lineWidth = 7;
    g.beginPath(); g.moveTo(x0 + 20, y - 8); g.lineTo(x1 - 10, y - 8); g.stroke();
    g.strokeStyle = P.chrome; g.lineWidth = 9;
    g.beginPath(); g.moveTo(x1, y); g.lineTo(x2 - 14, y); g.stroke();
    g.restore();
    /* 头部 */
    g.save(); g.fillStyle = P.chrome; g.strokeStyle = P.steelDD; g.lineWidth = 1.2;
    if(k === 0){
      g.beginPath();
      g.moveTo(x2 - 16, y - 5); g.lineTo(x2, y - 7); g.lineTo(x2, y + 7);
      g.lineTo(x2 - 16, y + 5); g.closePath(); g.fill(); g.stroke();
    } else {
      g.beginPath();
      g.moveTo(x2 - 16, y - 5); g.lineTo(x2 - 4, y - 8); g.lineTo(x2, y);
      g.lineTo(x2 - 4, y + 8); g.lineTo(x2 - 16, y + 5); g.closePath();
      g.fill(); g.stroke();
      g.lineWidth = 1.6;
      g.beginPath(); g.moveTo(x2 - 10, y - 6); g.lineTo(x2 - 10, y + 6); g.stroke();
    }
    g.restore();
    txt(g, '绝缘手柄', (x0 + x1)/2 + 6, y - 26, {sz:9.5, b:1, c:C.ok});
    txt(g, k === 0 ? '薄楔形头' : '两个薄楔形片十字交叉',
        x2 - 6, y + 30, {sz:9.5, b:1, c:C.acc, al:'right'});
    /* 裸露的金属杆 —— 这一屏的警示点 */
    hot(g, (x1 + x2 - 14)/2, y, 0, {w: x2 - x1 - 6, h:30, r:7});
    EP.chip(g, '这一截是金属，操作时不可用手触碰', 250, y - 30, {sz:9, b:1, c:C.err});
    conc(g, 200, 'err', '绝缘手柄性能良好，不可触碰金属部分',
         '书 P53 原话 —— 在配电箱里拧端子时，这句话是保命的');
    return;
  }

  /* 电工刀切绝缘层 */
  const wy = 150, wx0 = 44, wx1 = 268;
  /* 导线：绝缘层 + 线芯 */
  box(g, wx0, wy - 13, wx1 - wx0, 26, 8, '#2b4a6f', '#3d6494', 1.3);
  g.save(); g.strokeStyle = P.copper; g.lineWidth = 5; g.lineCap = 'round';
  g.beginPath(); g.moveTo(wx0 + 8, wy); g.lineTo(wx1 + 46, wy); g.stroke(); g.restore();
  txt(g, '绝缘层', wx0 + 40, wy - 24, {sz:9, b:1, c:C.tx3});
  txt(g, '线芯', wx1 + 30, wy - 16, {sz:9, b:1, c:P.copperL});

  /* 刀：按真实角度画 */
  const ang = k === 2 ? -45 : -25;
  const cx = k === 2 ? 150 : 196, cy = wy - (k === 2 ? 10 : 7);
  g.save();
  g.translate(cx, cy); g.rotate(ang * Math.PI / 180);
  g.fillStyle = P.chrome; g.strokeStyle = P.steelDD; g.lineWidth = 1.2;
  g.beginPath();
  g.moveTo(0, 0); g.lineTo(14, -13); g.lineTo(92, -13); g.lineTo(92, 3); g.lineTo(6, 3);
  g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#6b4a2f'; g.strokeStyle = '#4a3120';
  EP.rr(g, 92, -15, 62, 20, 4); g.fill(); g.stroke();
  g.restore();
  txt(g, '刀口朝外', cx + 96, cy - 44, {sz:9, b:1, c:C.ok, al:'left'});

  /* 角度弧 */
  g.save(); g.strokeStyle = C.acc; g.lineWidth = 1.4;
  g.beginPath(); g.arc(cx, cy, 34, ang * Math.PI/180, 0); g.stroke();
  g.setLineDash([3,3]); g.lineWidth = 1;
  g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + 46, cy); g.stroke();
  g.restore();
  EP.chip(g, k === 2 ? '45°' : '约 25°', cx + 44, cy - 18, {sz:10, b:1, c:C.acc});

  if(k === 3){
    EC.head(g, wx1 + 30, wy + 30, 1, 0, 7, C.ok);
    EP.chip(g, '用力向线端推削', 150, wy + 30, {sz:9, b:1, c:C.ok});
  }
  conc(g, 214, k === 2 ? 'acc' : 'ok',
    k === 2 ? '刀刃与绝缘层成 45° 切入' : '切入后翘起约 25°，向线端推削',
    k === 2 ? '太平了划不破，太陡了一刀扎到铜' : '刀刃贴着线芯表面滑，削的是绝缘层');
}
function note3(){
  const T = [
    ['一字槽螺钉旋具', '薄楔形头', '别碰金属',
     '书上原话：螺钉旋具<b>又称螺丝刀，俗称改锥</b>，由<b>螺钉旋具头与手柄</b>构成。' +
     '一字槽的<b>头部为薄楔形头</b>，是电工操作中使用比较广泛的一种。' +
     '<hr><b>用法只有一条要记：</b>根据固定螺钉的规格和尺寸选相应的旋具，' +
     '刀头<b>垂直插入</b>螺钉的卡槽中再转动。' +
     '<b>刀头比槽小会打滑，把螺钉槽拧花；比槽大插不进去。</b>'],
    ['十字槽螺钉旋具', '两片十字交叉', '别碰金属',
     '书上原话：十字槽的刀头由<b>两个薄楔形片十字交叉构成</b>，' +
     '<b>不同型号</b>的十字槽螺钉旋具可以紧固或拆卸与其相对应型号的固定螺钉。' +
     '<hr>「相对应型号」这四个字是重点：十字槽有 PH0/PH1/PH2… 之分，' +
     '<b>拿错一号就会打滑</b>，滑几下螺钉槽就废了。' +
     '配电箱里的端子螺钉大多是 PH1~PH2。'],
    ['45°：切得进去的角度', '45° 切入', '别切到铜',
     '书上原话：<b>一只手握住刀柄，将刀口朝外，使刀刃与线缆绝缘层成 45° 切入</b>。' +
     '<hr><b>为什么是 45°：太平了划不破绝缘层，太陡了一刀扎进铜里。</b>' +
     '45° 是这两者之间那个能「切得进去又不扎穿」的角度。' +
     '<hr><b>刀口朝外</b>也是硬规矩 —— 推削的方向是离开身体的，' +
     '万一打滑，刀不会往握线的那只手上带。'],
    ['25°：贴着线芯滑的角度', '约 25° 推削', '别切到铜',
     '书上原话：切入绝缘层后，<b>将刀刃略翘起一些（约 25°），用力向线端推削</b>，' +
     '<b>一定注意不要切削到线芯</b>。' +
     '<hr><b>两个角度管两件事</b>：45° 管「切进去」，25° 管「往前削」。' +
     '放平之后刀刃是<b>贴着线芯表面滑过去</b>的，削掉的是绝缘层、碰不到铜。' +
     '一直保持 45° 往前推，那就是往铜里扎。' +
     '<hr>什么时候用电工刀、什么时候用剥线钳，那条分界在 <b>6.1</b>：' +
     '<b>4 mm²（线径 2.25 mm）</b>以上才轮到电工刀。' +
     '<b>线芯有伤就必须重新剥</b> —— 伤过的地方是将来断线和发热的起点。']
  ][S3.k];
  $('s3a').textContent = ['一字槽','十字槽','45° 切入','25° 推削'][S3.k];
  $('s3b').textContent = T[1];
  $('s3c').textContent = T[2];
  $('n2').innerHTML = '<div class="st">' + T[0] + '</div>' + T[3];
}

/* ================================================================
   场景 4：三把扳手
   ================================================================
   三把画在同一位置换着看（差别才跳得出来），
   下半屏固定放那五个考点 —— 这一章工具部分全部要考的东西 */
const WRENCH = [
  {n:'活扳手', adj:'能调', set:'不用',
   part:'扳口 + 蜗轮 + 手柄',
   why:'书上原话：活扳手由<b>扳口、蜗轮和手柄</b>等组成，' +
       '<b>推动蜗轮时，即可调整、改变扳口的大小</b>。' +
       '活扳手也有尺寸之分：小的用于狭小空间，大的用于较大的螺钉和螺母。' +
       '<hr><b>一把顶一堆，代价是最容易打滑。</b>' +
       '扳口靠蜗轮夹住，没调紧就会在螺母上滑动，' +
       '把六角边磨圆（俗称「打滑」「滚牙」），磨圆之后什么扳手都拧不动了。' +
       '<hr>所以书上的用法第一步是：<b>查看需要紧固和拆卸的螺母大小，' +
       '将活扳手卡住螺母，然后使用大拇指拨动蜗轮</b>，调到扳口和螺母尺寸相符。'},
  {n:'呆扳手', adj:'不能调', set:'按尺寸买',
   part:'两端开口的夹柄',
   why:'书上原话：呆扳手的两端通常带有开口的夹柄，' +
       '<b>夹柄的大小与扳口的大小成正比</b>；上面带有尺寸的标识，' +
       '<b>呆扳手的尺寸与螺母的尺寸是相对应的</b>。' +
       '<hr>所以它只能用于<b>与其卡口相对应的螺母</b> —— 认准扳手上印的那个号。' +
       '用法：夹柄夹住螺母，<b>与螺母成水平状态</b>，转动手柄。' +
       '<hr><b>「水平状态」不是讲究，是受力。</b>' +
       '歪着扳，力就只压在螺母的一个角上，那个角会先被压塌。'},
  {n:'梅花棘轮扳手', short:'梅花棘轮', adj:'不能调', set:'必须配整套',
   part:'环形六角孔或十二角孔',
   why:'书上原话：两端通常带有<b>环形的六角孔或十二角孔</b>的工作端，' +
       '<b>工作端不可以进行改变，所以在使用时需要配置整套的梅花棘轮扳手</b>。' +
       '<hr><b>它是三把里最不容易打滑的</b>：环形整圈套住螺母，' +
       '六个（或十二个）角同时受力，力分散开了。' +
       '拧得很紧的螺母、或者已经有点磨圆的螺母，用它最稳。' +
       '<hr>棘轮的好处是<b>不用每次把扳手取下来重新套</b> —— ' +
       '来回摆动手柄就能一点点拧，狭小空间里特别有用。' +
       '代价就是书上那句：<b>一个尺寸一把，得配整套。</b>'}
];
const S4 = { k:0 };
function draw4(){
  const g = st4.g; st4.clear();
  const k = S4.k, w = WRENCH[k];
  EP.heading(g, 14, 20, w.n, w.part);

  const cy = 104;
  g.save();
  g.fillStyle = P.chrome; g.strokeStyle = P.steelDD; g.lineWidth = 1.4; g.lineJoin = 'round';
  if(k === 0){
    /* 活扳手：一个厚头 + 一根柄，头上挖一个朝左的开口（＝扳口），
       开口下沿那块是活动颚，蜗轮嵌在头的下缘。
       **第一版画成了几个白方块，认不出是扳手** —— 重画过（截图抓到的） */
    EP.rr(g, 150, cy - 9, 180, 18, 7); g.fill(); g.stroke();   /* 柄 */
    EP.rr(g, 96, cy - 28, 62, 56, 6); g.fill(); g.stroke();    /* 头 */
    /* 挖出扳口 */
    g.save();
    g.fillStyle = C.bg;
    EP.rr(g, 86, cy - 11, 46, 22, 3); g.fill();
    g.restore();
    g.strokeStyle = P.steelDD; g.lineWidth = 1.2;
    g.beginPath(); g.moveTo(86, cy - 11); g.lineTo(132, cy - 11);
    g.lineTo(132, cy + 11); g.lineTo(86, cy + 11); g.stroke();
    /* 活动颚：开口下沿到头底那一块，画一条竖缝表示它能滑 */
    g.save(); g.setLineDash([3,2]); g.lineWidth = 1;
    g.beginPath(); g.moveTo(132, cy + 11); g.lineTo(132, cy + 28); g.stroke();
    g.restore();
    /* 蜗轮 */
    g.fillStyle = P.steelD; g.strokeStyle = P.steelDD; g.lineWidth = 1.2;
    g.beginPath(); g.arc(150, cy + 24, 12, 0, Math.PI*2); g.fill(); g.stroke();
    g.lineWidth = 1;
    for(let a = 0; a < 8; a++){
      const t = a * Math.PI/4;
      g.beginPath();
      g.moveTo(150 + Math.cos(t)*7, cy + 24 + Math.sin(t)*7);
      g.lineTo(150 + Math.cos(t)*12, cy + 24 + Math.sin(t)*12); g.stroke();
    }
    g.restore();
    txt(g, '扳口', 106, cy - 38, {sz:9, b:1, c:C.acc});
    txt(g, '活动颚', 118, cy + 40, {sz:8.5, c:C.tx3});
    txt(g, '蜗轮　拨它调扳口', 214, cy + 30, {sz:9, b:1, c:C.acc, al:'left'});
    hot(g, 150, cy + 24, 17);
  } else if(k === 1){
    /* 呆扳手：两端开口 */
    EP.rr(g, 108, cy - 7, 148, 14, 5); g.fill(); g.stroke();
    [96, 268].forEach(function(x, i){
      const s = i ? 15 : 13;
      g.beginPath();
      g.moveTo(x + (i? -8 : 8), cy - s); g.lineTo(x + (i? 16 : -16), cy - s);
      g.lineTo(x + (i? 16 : -16), cy - s + 7); g.lineTo(x + (i? 4 : -4), cy - s + 7);
      g.lineTo(x + (i? 4 : -4), cy + s - 7); g.lineTo(x + (i? 16 : -16), cy + s - 7);
      g.lineTo(x + (i? 16 : -16), cy + s); g.lineTo(x + (i? -8 : 8), cy + s);
      g.closePath(); g.fill(); g.stroke();
    });
    g.restore();
    txt(g, '18', 160, cy, {sz:10, b:1, c:P.steelDD});
    txt(g, '尺寸标识 —— 和螺母尺寸一一对应', 180, cy + 34, {sz:9, b:1, c:C.acc});
    hot(g, 160, cy, 0, {w:44, h:22, r:5});
  } else {
    /* 梅花棘轮：两端环形孔 */
    EP.rr(g, 116, cy - 7, 132, 14, 5); g.fill(); g.stroke();
    [100, 264].forEach(function(x){
      g.beginPath(); g.arc(x, cy, 20, 0, Math.PI*2); g.fill(); g.stroke();
    });
    g.fillStyle = C.bg; g.strokeStyle = P.steelDD; g.lineWidth = 1.2;
    [100, 264].forEach(function(x){
      g.beginPath();
      for(let a = 0; a < 6; a++){
        const t = a * Math.PI/3 + Math.PI/6;
        const px = x + Math.cos(t)*12, py = cy + Math.sin(t)*12;
        if(a) g.lineTo(px, py); else g.moveTo(px, py);
      }
      g.closePath(); g.fill(); g.stroke();
    });
    g.restore();
    txt(g, '环形六角孔', 100, cy + 36, {sz:9, b:1, c:C.acc});
    txt(g, '工作端不可改变', 264, cy + 36, {sz:9, b:1, c:C.err});
    hot(g, 264, cy, 25);
  }

  conc(g, 176, k === 2 ? 'warn' : 'acc',
    w.n + '：扳口' + w.adj,
    k === 2 ? '所以使用时需要配置整套（书上原话）' :
    (k === 0 ? '推动蜗轮即可改变扳口的大小' : '尺寸与螺母的尺寸相对应，认准印的那个号'));
}
function note4(){
  const w = WRENCH[S4.k];
  $('s4a').textContent = w.short || w.n;
  $('s4b').textContent = w.adj;
  $('s4c').textContent = w.set;
  $('n3').innerHTML = '<div class="st">' + w.n + '　·　' + w.part + '</div>' + w.why;
}

/* ================================================================
   舞台、事件、收尾
   ================================================================ */
const st1 = new Stage('cv0', 360, 256);
const st2 = new Stage('cv1', 360, 228);
const st3 = new Stage('cv2', 360, 256);
const st4 = new Stage('cv3', 360, 218);

st1.cv.addEventListener('click', function(ev){
  const p = st1.pick(ev);
  JAW.forEach(function(j, i){
    if(p[0] >= j.x0 - 6 && p[0] <= j.x1 + 6 && p[1] > 60 && p[1] < 180) S1.k = i;
  });
  note1(); draw1();
});
document.getElementById('s2k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S2.k = +b.dataset.k;
  document.querySelectorAll('#s2k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S2.k);
  });
  note2(); draw2();
});
document.getElementById('s3k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S3.k = +b.dataset.k;
  document.querySelectorAll('#s3k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S3.k);
  });
  note3(); draw3();
});
document.getElementById('s4k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S4.k = +b.dataset.k;
  document.querySelectorAll('#s4k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S4.k);
  });
  note4(); draw4();
});

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会重设尺寸并清空。**四屏全是静态的，必须在这儿逐个补画** */
  draw1(); draw2(); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:3, sec:'3.1'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('3.1');
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
