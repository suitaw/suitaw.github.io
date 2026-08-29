/* 3.8 绝缘电阻表（兆欧表 / 摇表）—— 本节内容的唯一真相。
   对应《零基础学电工》第 3 章 3.8 节（书内 P61~P63）。第 3 章最后一节。

   **这一节要回答的只有一个问题：万用表都有电阻档了，为什么还要单独一台表？**
   两条理由：
   ① 量程不够 —— 好的绝缘是几百 MΩ 到几千 MΩ，万用表最大 200 MΩ，量到头只有一个 OL
   ② **测试电压不够** —— 万用表靠表内几伏的电池，几伏下「过得去」的绝缘，
      在 380 V 工作电压下可能早就击穿了。绝缘电阻这个量，定义上就是
      「在规定的直流试验电压下」测得的值

   数字口径（都有出处，别再重算）：
   - 低压设备/线路的绝缘电阻判据：**≥ 0.5 MΩ**（这是低压电工最常用的一条）
   - 电压等级选择：500 V 以下设备用 **500 V** 表；500~3000 V 用 1000 V；3000 V 以上用 2500 V
   - 手摇发电机额定转速 **120 r/min**，摇满 **1 分钟** 读数
   - 吸收比 R60 ÷ R15 ≥ 1.3 用来判受潮（这一条只点一句，属于更高一级的内容）
   - 测完的残压按 500 V 算；电缆等效电容 1 µF 时储能 ½CU² = 0.125 J —— 足够电人一下

   **拿不准的地方如实留白**：指针兆欧表的刻度方向（0 在左还是在右）各厂家画法有出入，
   所以课文里不对刻度方向下断言，只讲读数和判据。画面上按最常见的「左 0 右 ∞」画。 */
(function(){
'use strict';
ELEC.reg({
  id: '3.8',
  file: 'c3-8.html',
  title: '3.8 绝缘电阻表',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>万用表量不出来</button>
    <button class="tab" data-i="1"><span class="n">2</span>怎么接怎么摇</button>
    <button class="tab" data-i="2"><span class="n">3</span>电压等级与判据</button>
    <button class="tab" data-i="3"><span class="n">4</span>测完必须放电</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">同一段绝缘，两台表给出两个答案</div>
    绝缘电阻说的是<b>导体和外皮（或外壳、大地）之间的电阻</b>。
    一段受潮的电缆，用万用表电阻档量显示 <b>OL</b>，看着完美；
    换 500 V 兆欧表一量，只有 <b>0.3 MΩ</b>。<b>点两台表比一比。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">万用表电阻档</button>
        <button class="btn sm" data-k="1">兆欧表 500 V</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">加在绝缘上<br>的电压</div><div class="v" id="s1a">约 3 V</div></div>
        <div class="num"><div class="k">读数</div><div class="v" id="s1b">OL</div></div>
        <div class="num hi"><div class="k">这段绝缘<br>合格吗</div><div class="v" id="s1c">看不出来</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">万用表为什么不行 —— 两条理由</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>万用表电阻档</th><th>兆欧表</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">测试<br>电压</td><td><b>表内电池，几伏</b></td><td><b>500 / 1000 / 2500 V 直流</b>，接近甚至高于工作电压</td></tr>
        <tr><td class="eu-s">量程</td><td>最大 200 MΩ 左右</td><td>几百到几千 MΩ</td></tr>
        <tr><td class="eu-s">能回答<br>什么</td><td>「通不通」</td><td><b>「在工作电压下扛不扛得住」</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>这不是哪台表不准。</b>绝缘层里的受潮通道、微裂纹，在几伏下泄漏电流小到测不出来；
      加上几百伏，泄漏就出来了。<b>绝缘电阻这个量，定义上就是「在规定的直流试验电压下」测得的值</b> ——
      不说电压，这个数就没有意义。
      <span class="sub">反过来也要记住：<b>万用表量到几百千欧甚至更低，那是真的坏了</b>，
      这种情况下不用再上兆欧表也能下结论。</span>
    </div>
  </div>

  <div class="bet" data-bet="c38-why" data-q="用万用表电阻档量一台电机的绕组对外壳，显示 OL。能说明绝缘合格吗？"
       data-opts="能，OL 说明电阻无穷大|不能，万用表只有几伏测试电压、量程也不够，得用兆欧表在 500V 下再测一次|不能，应该用钳形表" data-right="1"
       data-after="不能。OL 只说明「在几伏电压下电阻超过了万用表的量程」。绝缘的毛病（受潮、微裂纹）往往要加到几百伏才暴露，而且好绝缘本来就有几百 MΩ，万用表量到头也是 OL——这个读数几乎不含信息。"></div>
</section>

<!-- ================= 场景 2：怎么接怎么摇 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">L 接线路、E 接外壳，摇到 120 转再读</div>
    兆欧表上有<b>三个接线柱：L（线路）、E（接地）、G（屏蔽）</b>。
    手摇发电机要摇到<b>额定 120 r/min</b>、保持 <b>1 分钟</b> 才读数。
    <b>切两种转速看输出电压。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn sm" data-k="0">慢摇 60 r/min</button>
        <button class="btn on sm" data-k="1">额定 120 r/min</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">摇柄<br>转速</div><div class="v" id="s2a">120 r/min</div></div>
        <div class="num"><div class="k">输出<br>电压</div><div class="v" id="s2b">500 V</div></div>
        <div class="num hi"><div class="k">这次<br>测量</div><div class="v" id="s2c">有效</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">三个接线柱</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>柱子</th><th>接哪儿</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">L<br>线路</td><td><b>被测的导体</b>：绕组、线芯、母线</td><td>输出高压的那一端</td></tr>
        <tr><td class="eu-s">E<br>接地</td><td><b>外壳、铠装、大地</b></td><td>回路的另一端</td></tr>
        <tr><td class="eu-s">G<br>屏蔽</td><td>被测物<b>表面</b>的脏污潮湿层</td><td>把表面泄漏电流「引开」，平时<b>不用接</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>G 柱平时空着就行。</b>只有在电缆端头脏污受潮、表面爬电严重、
      要单独测「体积绝缘电阻」时才用到它 —— 把电缆端头绝缘层上缠一圈裸线接到 G，
      表面泄漏的那部分电流就不经过测量回路了。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">摇的规矩</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>做法</th><th>为什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">转速</td><td><b>120 r/min，匀速</b></td><td>转速不够，输出电压达不到额定值</td></tr>
        <tr><td class="eu-s">时间</td><td><b>摇满 1 分钟再读</b></td><td>刚加压时有充电电流，读数会一直往上爬</td></tr>
        <tr><td class="eu-s">测试线</td><td>两根线<b>分开走，别绞在一起</b></td><td>线间也有绝缘电阻，绞着会把读数拉低</td></tr>
        <tr><td class="eu-s">摆放</td><td>表<b>放平、远离强磁场</b></td><td>指针式表是磁电系仪表</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>吸收比</b>：摇到第 15 秒读一次（R15）、第 60 秒读一次（R60），
      <b>R60 ÷ R15 ≥ 1.3</b> 说明绝缘干燥。受潮的绝缘充电快、两个读数差不多，比值接近 1。
      <span class="sub">这一条属于更高一级的内容，低压电工日常看 60 秒那个读数就够了。</span>
    </div>
  </div>
</section>

<!-- ================= 场景 3：电压等级与判据 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">表的电压等级要配设备，读数看 0.5 兆欧这条线</div>
    兆欧表分 <b>500 V / 1000 V / 2500 V</b> 几种。
    <b>电压选高了会把好绝缘击穿，选低了考不出问题。</b>
    <b>切三种搭配看后果，再拖滑杆看判定。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">500V 表测 380V 电机</button>
        <button class="btn sm" data-k="1">2500V 表测 220V 线路</button>
        <button class="btn sm" data-k="2">500V 表测 10kV 电缆</button>
      </div>
      <div class="rowlab" style="margin-top:8px">测出来的绝缘电阻　<b id="s3lab">15 MΩ</b></div>
      <input type="range" id="s3r" min="0" max="18" step="1" value="11">
      <div class="nums three">
        <div class="num"><div class="k">表的<br>电压等级</div><div class="v" id="s3a">500 V</div></div>
        <div class="num"><div class="k">配得<br>上吗</div><div class="v" id="s3b">配得上</div></div>
        <div class="num hi"><div class="k">读数<br>判定</div><div class="v" id="s3c">合格</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">选表：按被测设备的额定电压来</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>设备额定电压</th><th>用几伏的表</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">500 V 以下</td><td><b>500 V</b>（低压电工最常用的就是这一台）</td></tr>
        <tr><td class="eu-s">500 ~ 3000 V</td><td>1000 V</td></tr>
        <tr><td class="eu-s">3000 V 以上</td><td>2500 V（及以上，按规程）</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>电压选高了是会把设备测坏的</b> —— 拿 2500 V 表去摇 220 V 的照明线路、
      或者去摇带电子板的设备，绝缘可能当场被击穿，本来好的东西被你测出个窟窿。
      <span class="sub"><b>带电子元件的设备（变频器、PLC、带电容的回路）测之前先断开或短接保护</b>，
      几百伏直流会把里面的半导体打穿。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st good">判据：低压设备 0.5 兆欧</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>读数</th><th>判定</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">&lt; 0.5 MΩ</td><td><b class="rd">不合格</b>，不能送电，查受潮/破损/进水</td></tr>
        <tr><td class="eu-s">0.5 ~ 1 MΩ</td><td>刚过线，<b>要记录、要复查</b>，别当成没事</td></tr>
        <tr><td class="eu-s">几 MΩ 以上</td><td>合格。新装设备一般能到几十上百 MΩ</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>0.5 MΩ 是低压电工最该背下来的一个数。</b>
      不同设备、不同场合还有各自更严的要求（潮湿场所、高压设备、电缆敷设后），
      <b>具体以现场规程和设备说明书为准</b> —— 这里给的是低压通用的那条底线。
      <span class="sub">另外<b>要跟上一次的记录比</b>：同一台设备从 50 MΩ 掉到 5 MΩ，
      虽然还合格，但已经在明显劣化了。</span>
    </div>
  </div>

  <div class="bet" data-bet="c38-pick" data-q="要测一条 220V 照明线路的绝缘，手边有 500V 和 2500V 两台兆欧表。用哪台？"
       data-opts="2500V，电压高测得准|500V，2500V 可能把这条线路的绝缘直接击穿|哪台都行" data-right="1"
       data-after="用 500V。兆欧表的电压等级要按被测设备的额定电压选：500V 以下的设备用 500V 表。拿 2500V 去摇 220V 线路，加的电压远超它的绝缘设计值，可能当场击穿——本来好好的线路被你测出个窟窿。"></div>
</section>

<!-- ================= 场景 4：测完必须放电 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">测完，被测设备上还带着几百伏</div>
    兆欧表往设备上加了 500 V 直流，电缆和绕组本身就是<b>电容</b>，
    停止摇动之后这些电荷<b>不会自己马上跑掉</b>。
    <b>点三种做法看后果。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">刚停止摇动</button>
        <button class="btn sm" data-k="1">直接用手拆线</button>
        <button class="btn sm" data-k="2">先放电再拆线</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">设备上<br>残留电压</div><div class="v" id="s4a">500 V</div></div>
        <div class="num"><div class="k">存的<br>电能</div><div class="v" id="s4b">0.125 J</div></div>
        <div class="num hi"><div class="k">安全吗</div><div class="v" id="s4c">危险</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">收尾的顺序不能乱</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>步</th><th>做什么</th><th>为什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">①</td><td><b>先把 L 线从被测设备上取下</b></td><td>再停摇，防止设备的电容电流倒灌回表里把表打坏</td></tr>
        <tr><td class="eu-s">②</td><td>然后停止摇动手柄</td><td>—</td></tr>
        <tr><td class="eu-s">③</td><td><b>对被测设备放电</b>（放电棒 / 接地线短接）</td><td>把电容里的电荷导走</td></tr>
        <tr><td class="eu-s">④</td><td>确认没电了再拆线、再动手</td><td>—</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>越长的电缆、越大的电机，电容越大，存的电越多。</b>
      500 V、1 µF 的储能是 <b>0.125 J</b> —— 数字看着小，但它会在接触的一瞬间全放掉，
      足以让人一激灵；<b>真正的危险常常是被电到之后的二次伤害</b>（从梯子上摔下来、手撞到运动部件）。
      <span class="sub">放电要用<b>带绝缘杆的放电棒或接地线</b>，不是拿螺丝刀去短一下 ——
      那会打出电弧、烧坏触点，也伤眼睛。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">测之前也有三件事</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>做法</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">断电</td><td><b>绝对不能带电测绝缘</b> —— 表会烧，人会伤</td></tr>
        <tr><td class="eu-s">验电</td><td>用验电器确认真的没电了（3.5 节那支笔）</td></tr>
        <tr><td class="eu-s">放电</td><td>被测设备<b>先放一次电</b>，把残余电荷和感应电压导走</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      顺手记一条<b>表本身的自检</b>：两根测试线<b>开路</b>摇动，指针应指向 <b>∞</b>；
      两根线<b>短接</b>轻摇一下，指针应指向 <b>0</b>。两样都对，表才是好的。
      <span class="sub">短接测试只需轻摇几下，别一直摇 —— 相当于让发电机一直短路。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="c3-8">
    <div class="qz" data-q="用万用表电阻档量电机绕组对地显示 OL，还有必要用兆欧表再测一次吗？"
         data-opts="没必要，OL 就是绝缘良好|有必要——万用表只有几伏测试电压、量程也只到 200MΩ，很多绝缘缺陷要加到几百伏才暴露|有必要，因为万用表不准"
         data-right="1"
         data-why="有必要。绝缘电阻的定义就是「在规定的直流试验电压下」测得的值。万用表靠表内几伏的电池，受潮通道和微裂纹在几伏下几乎不漏电；而且好绝缘本来就有几百 MΩ，超过万用表量程，OL 这个读数几乎不含信息。"></div>
    <div class="qz" data-q="要测一台 380V 三相电动机的绝缘，该用哪种兆欧表？判据是多少？"
         data-opts="2500V 表，≥ 5 MΩ|500V 表，≥ 0.5 MΩ|1000V 表，≥ 1 MΩ"
         data-right="1"
         data-why="500V 表、0.5 MΩ。电压等级按被测设备额定电压选：500V 以下的设备用 500V 表。低压设备绝缘电阻的通用底线是 0.5 MΩ——这是低压电工最该背下来的一个数。用 2500V 去摇 380V 电机有击穿绝缘的风险。"></div>
    <div class="qz" data-q="兆欧表上的 G（屏蔽）接线柱，日常测量时该怎么用？"
         data-opts="必须接到设备外壳|平时空着不用，只在被测物表面脏污受潮、要排除表面泄漏时才接|接到大地"
         data-right="1"
         data-why="平时空着。L 接被测导体、E 接外壳或大地，这两个就够了。G 是屏蔽端，只在电缆端头脏污受潮、表面爬电严重时才用——在绝缘层表面缠一圈裸线接到 G，把表面泄漏的那部分电流引开，测到的才是真正的体积绝缘电阻。"></div>
    <div class="qz" data-q="测完绝缘，正确的收尾顺序是？"
         data-opts="停止摇动 → 拆线 → 直接干活|先把 L 线从设备上取下 → 停止摇动 → 对设备放电 → 再拆线动手|停止摇动 → 放电 → 拆线"
         data-right="1"
         data-why="先取下 L 线再停摇，是为了防止设备电容里的电荷倒灌回表里把表打坏；然后必须对被测设备放电——电缆和绕组本身就是电容，500V 的电荷不会自己马上跑掉，直接上手会被电到。放电要用带绝缘杆的放电棒或接地线，不是拿螺丝刀去短一下。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 3 章 3.8 节（书内 P61~P63）<br>第 3 章到这儿就完了 —— 验电笔、万用表、钳形表、兆欧表，四件吃饭的家伙</div>
</section>`,

  init: function(EC){
'use strict';
const {C, Path, Stage, txt, tw, box, tag, hot, loop, $} = EC;
const P = EP.P, TY = EP.TYPE;

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
   兆欧表：胶木盒 + 指针表盘 + 手摇发电机曲柄 + 三个接线柱
   ================================================================
   刻度按 t = R/(R+10) 铺（中心值 10 MΩ），所以**右端非常密** —— 真表就是这样，
   低阻值那一头反而分得开。0.5 MΩ 的判据落在最左边一点点，画一个红标记。
   刻度方向各厂家画法有出入，这里按最常见的「左 0 右 ∞」画，课文里不对方向下断言。 */
const MEG_BIG = [0, 1, 5, 10, 50, '∞'];
const MEG_SMALL = [0.5, 2, 3, 20, 30, 100, 200];
const MSPAN = 0.95;
function megT(v){ return (v === '∞') ? 1 : v/(v + 10); }
function megA(t){ return (t*2 - 1)*MSPAN - Math.PI/2; }

function megger(g, x, y, w, h, o){
  o = o || {};
  /* 胶木盒 */
  g.save();
  EP.rr(g, x, y, w, h, 8);
  g.fillStyle = EP.cyl(g, y, y + h, '#14171b', P.bakelite, P.bakeliteL); g.fill();
  g.strokeStyle = '#0d1013'; g.lineWidth = 1.3; g.stroke();
  g.restore();

  /* 表盘 */
  const cx = x + w*0.34, cy = y + h*0.78, R = Math.min(h*0.56, w*0.30);
  box(g, x + 6, y + 5, w*0.60, h*0.84, 5, '#e8e2d0', '#b9ae8e', 1.2);
  g.save();
  g.strokeStyle = '#3a3527'; g.lineWidth = 1.3;
  g.beginPath(); g.arc(cx, cy, R, megA(0), megA(1)); g.stroke();
  MEG_SMALL.forEach(function(v){
    const a = megA(megT(v));
    g.beginPath();
    g.moveTo(cx + Math.cos(a)*R, cy + Math.sin(a)*R);
    g.lineTo(cx + Math.cos(a)*(R-4.5), cy + Math.sin(a)*(R-4.5));
    g.stroke();
  });
  g.lineWidth = 1.8;
  MEG_BIG.forEach(function(v){
    const a = megA(megT(v));
    g.beginPath();
    g.moveTo(cx + Math.cos(a)*R, cy + Math.sin(a)*R);
    g.lineTo(cx + Math.cos(a)*(R-9), cy + Math.sin(a)*(R-9));
    g.stroke();
    if(o.labels !== false)
      txt(g, String(v), cx + Math.cos(a)*(R-18), cy + Math.sin(a)*(R-18),
          {sz: v === '∞' ? 11 : 8.5, b:1, c:'#3a3527'});
  });
  /* 0.5 MΩ 判据标记 */
  const a5 = megA(megT(0.5));
  g.strokeStyle = C.err; g.lineWidth = 2;
  g.beginPath();
  g.moveTo(cx + Math.cos(a5)*(R+1), cy + Math.sin(a5)*(R+1));
  g.lineTo(cx + Math.cos(a5)*(R+7), cy + Math.sin(a5)*(R+7));
  g.stroke();
  g.restore();
  /* MΩ 只能放白框右上角：弧顶正上方是「10」那个刻度数字的位置 */
  if(o.labels !== false) txt(g, 'MΩ', x + w*0.60 - 14, y + 20, {sz:10, b:1, c:'#3a3527'});

  /* 指针 */
  if(o.val != null){
    const a = megA(megT(o.val));
    g.save();
    g.strokeStyle = '#c8422f'; g.lineWidth = 2.1; g.lineCap = 'round';
    g.beginPath(); g.moveTo(cx, cy);
    g.lineTo(cx + Math.cos(a)*(R-5), cy + Math.sin(a)*(R-5));
    g.stroke();
    g.fillStyle = '#3a3527';
    g.beginPath(); g.arc(cx, cy, 4, 0, Math.PI*2); g.fill();
    g.restore();
  }

  /* 手摇发电机的曲柄 */
  const kx = x + w*0.81, ky = y + h*0.46, kr = Math.min(h*0.24, w*0.13);
  g.save();
  g.beginPath(); g.arc(kx, ky, kr, 0, Math.PI*2);
  g.fillStyle = EP.cyl(g, ky-kr, ky+kr, '#1b2027', P.bodyD, P.bodyL); g.fill();
  g.strokeStyle = '#0a0d10'; g.lineWidth = 1.2; g.stroke();
  const ha = o.ang || 0;
  const hx = kx + Math.cos(ha)*kr*0.78, hy = ky + Math.sin(ha)*kr*0.78;
  g.strokeStyle = P.steel; g.lineWidth = 3.4; g.lineCap = 'round';
  g.beginPath(); g.moveTo(kx, ky); g.lineTo(hx, hy); g.stroke();
  g.beginPath(); g.arc(hx, hy, 4.2, 0, Math.PI*2);
  g.fillStyle = P.bakeliteL; g.fill();
  g.strokeStyle = '#0d1013'; g.lineWidth = 1; g.stroke();
  g.restore();
  if(o.labels !== false) txt(g, '摇柄', kx, ky + kr + 12, {sz:8.5, c:P.inkL});

  /* 三个接线柱：L 线路 / E 接地 / G 屏蔽 */
  const jy = y + h - 9, out = [];
  ['L','E','G'].forEach(function(n, i){
    const jx = x + w*0.13 + i*w*0.15;
    g.save();
    g.beginPath(); g.arc(jx, jy, 5.2, 0, Math.PI*2);
    g.fillStyle = (o.hot && o.hot.indexOf(n) >= 0) ? '#a8302a' : P.steelD; g.fill();
    g.strokeStyle = (o.hot && o.hot.indexOf(n) >= 0) ? C.acc : '#3b444f';
    g.lineWidth = (o.hot && o.hot.indexOf(n) >= 0) ? 1.8 : 1.1;
    g.stroke();
    g.restore();
    /* 柱名放柱子**左边**：上方是白表盘的底边（字压上去看不清），
       正下方是测试线垂下来的路径（线会盖住字）—— 只剩左边这一处 */
    if(o.labels !== false) txt(g, n, jx - 11, jy, {sz:9, b:1, c:P.ink, al:'right'});
    out.push([jx, jy]);
  });
  return out;
}

/* 一段电缆的侧视：线芯 → 绝缘层 → 铠装，左端阶梯剥开。
   **绝缘电阻量的就是「线芯 ↔ 铠装」之间那一层**，画成剥头一眼看得懂。 */
function cableSide(g, cy, o){
  o = o || {};
  const X1 = 312;
  g.save();
  /* 铠装/外皮 */
  EP.rr(g, 124, cy - 22, X1 - 124, 44, 4);
  g.fillStyle = EP.cyl(g, cy - 22, cy + 22, P.steelDD, P.steelD, P.steel); g.fill();
  g.strokeStyle = '#3b444f'; g.lineWidth = 1.1; g.stroke();
  /* 绝缘层 */
  EP.rr(g, 92, cy - 15, X1 - 92, 30, 3);
  g.fillStyle = EP.cyl(g, cy - 15, cy + 15, '#2a2118', '#4a3a26', '#6b5638'); g.fill();
  g.strokeStyle = '#241c14'; g.lineWidth = 1; g.stroke();
  /* 线芯 */
  EP.rr(g, 56, cy - 6, X1 - 56, 12, 3);
  g.fillStyle = EP.cyl(g, cy - 6, cy + 6, P.copperD, P.copper, P.copperL); g.fill();
  g.strokeStyle = '#6b3f10'; g.lineWidth = 1; g.stroke();
  g.restore();
  txt(g, '线芯', 74, cy - 16, {sz:8.5, c:P.copperL});
  txt(g, '绝缘层', 108, cy + 26, {sz:8.5, c:'#a8895c'});
  txt(g, '铠装', 150, cy - 30, {sz:8.5, c:P.inkL});
  /* 泄漏电流：从线芯穿过绝缘层到铠装 */
  if(o.leak){
    g.save();
    g.strokeStyle = C.err; g.lineWidth = 1.4; g.setLineDash([3,3]);
    for(let i = 0; i < o.leak; i++){
      const lx = 200 + i*32;
      g.beginPath(); g.moveTo(lx, cy - 6); g.lineTo(lx, cy - 20); g.stroke();
    }
    g.restore();
    for(let i = 0; i < o.leak; i++) EC.head(g, 200 + i*32, cy - 20, 0, -1, 5, C.err);
    txt(g, '泄漏电流', 200 + (o.leak-1)*16, cy - 34, {sz:9, b:1, c:C.err});
  }
  return {core:[56, cy], armor:[240, cy - 22]};
}

/* ================================================================
   场景 1：万用表量不出来
   ================================================================ */
const S1 = { k:0 };
const st1 = new Stage('cv0', 360, 322);
const CY1 = 222;

function draw1(){
  const g = st1.g; st1.clear();
  const meg = (S1.k === 1);
  /* 标题要短：表的机身从 x≈84 就开始了 */
  EP.heading(g, 12, 14, meg ? '兆欧表' : '万用表', meg ? '500 V' : '几伏');

  let jL, jE;
  if(meg){
    const js = megger(g, 84, 8, 192, 112, {val:0.3, ang:0.6, hot:['L','E']});
    jL = js[0]; jE = js[1];
  }else{
    const js = EP.meterUnit(g, 110, 8, 140, 88,
      {mode:'Ω', reading:'OL', rsz:16, jacks:[{n:'COM',red:0},{n:'VΩ',red:1}], hot:1});
    jE = js[0]; jL = js[1];
  }

  /* 电缆 */
  const cb = cableSide(g, CY1, {leak: meg ? 4 : 0});
  /* 铠装接地 */
  new Path([[270,CY1+22],[270,254]]).stroke(g, 2, C.wire);
  g.save(); g.strokeStyle = C.PE; g.lineWidth = 2; g.lineCap = 'round';
  [[10,0],[7,4],[4,8]].forEach(function(a){
    g.beginPath(); g.moveTo(270-a[0], 254+a[1]); g.lineTo(270+a[0], 254+a[1]); g.stroke();
  });
  g.restore();

  /* 两根测试线：一根到线芯，一根到铠装 */
  EP.wire(g, new Path([[jL[0],jL[1]],[jL[0],150],[40,150],[40,CY1],[56,CY1]]),
          {color:'#c0392b', w:2.4});
  EP.wire(g, new Path([[jE[0],jE[1]],[jE[0],176],[218,176],[218,CY1-22]]),
          {color:C.wire, w:2.4});

  const ok = meg;
  box(g, 18, 280, 324, 32, 6, ok ? C.okbg : C.warnbg, ok ? C.ok : C.warn, 1);
  txt(g, meg ? '500 V 加上去：泄漏出来了，只有 0.3 MΩ —— 不合格'
             : '几伏的测试电压：读 OL，这段绝缘的真实状况根本没考出来',
      180, 296, {sz:10.5, b:1, c: ok ? C.ok : C.warn});
}
function note1(){
  const meg = (S1.k === 1);
  $('s1a').textContent = meg ? '500 V' : '约 3 V';
  $('s1b').textContent = meg ? '0.3 MΩ' : 'OL';
  $('s1c').textContent = meg ? '不合格' : '看不出来';
  $('n0').innerHTML = meg
    ? '<div class="st bad">0.3 MΩ —— 低于 0.5 MΩ，不能送电</div>' +
      '500 V 直流加到线芯和铠装之间，绝缘层里的受潮通道被「考」出来了：' +
      '有明显的<b>泄漏电流</b>穿过绝缘层，表指到 <b>0.3 MΩ</b>。' +
      '<div class="tip" style="margin-top:8px">低压设备的通用底线是 <b>0.5 MΩ</b>，' +
      '这条线以下不能送电。要查的是受潮、进水、绝缘破损、端头脏污。' +
      '<span class="sub">同一段绝缘，几伏下「看着好」、几百伏下「不合格」，' +
      '两个结论并不矛盾 —— 绝缘的泄漏随电压增加得很快，这正是要用高压去测的原因。</span></div>'
    : '<div class="st warn">OL —— 这个读数几乎不含信息</div>' +
      '万用表电阻档靠的是<b>表内那节几伏的电池</b>。绝缘层里的受潮通道在几伏下几乎不漏电，' +
      '再加上万用表量程只到 200 MΩ 左右，<b>好绝缘和这段受潮的绝缘，量出来都是 OL</b>。' +
      '<div class="tip" style="margin-top:8px"><b>切到兆欧表看看。</b>' +
      '<span class="sub">反过来说：万用表量到几百千欧甚至更低，那是真的坏了，' +
      '这种情况不用再上兆欧表也能下结论。</span></div>';
}
document.getElementById('s1k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S1.k = +b.dataset.k;
  document.querySelectorAll('#s1k .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S1.k);
  });
  note1(); draw1();
});

/* ================================================================
   场景 2：怎么接怎么摇
   ================================================================
   转速决定输出电压：120 r/min → 500 V；60 r/min → 约 250 V。
   **兆欧表内部是比率计，读数本身对转速不敏感** —— 但电压达不到额定值，
   这次测量就不算数（绝缘电阻的判据是「在额定试验电压下」的值）。 */
const S2 = { k:1, ang:0 };
const st2 = new Stage('cv1', 360, 342);

function draw2(dt){
  const g = st2.g; st2.clear();
  const rpm = S2.k ? 120 : 60, volt = S2.k ? 500 : 250;
  S2.ang += dt * (rpm/60) * Math.PI*2 * 0.5;   /* 画面上放慢一半，不然糊成一片 */
  EP.heading(g, 12, 14, '接线与摇动', rpm + ' r/min');

  const js = megger(g, 44, 28, 272, 148, {val:15, ang:S2.ang, hot:['L','E']});
  /* 被测：一台电动机，L 接绕组、E 接外壳 */
  const MC = [256, 242];
  g.save();
  g.beginPath(); g.arc(MC[0], MC[1], 30, 0, Math.PI*2);
  g.fillStyle = EP.cyl(g, MC[1]-30, MC[1]+30, '#1b2027', P.bodyD, P.bodyL); g.fill();
  g.strokeStyle = P.ink; g.lineWidth = 1.4; g.stroke();
  g.restore();
  txt(g, 'M', MC[0], MC[1], {sz:15, b:1, c:P.ink});
  /* 标注放电机右边：放正下方会被接地线和接地符号穿过 */
  txt(g, '电动机', MC[0] + 36, MC[1] + 6, {sz:9.5, c:C.tx3, al:'left'});
  /* 外壳接地 */
  new Path([[MC[0],MC[1]+30],[MC[0],284]]).stroke(g, 2, C.wire);
  g.save(); g.strokeStyle = C.PE; g.lineWidth = 2; g.lineCap = 'round';
  [[10,0],[7,4],[4,8]].forEach(function(a){
    g.beginPath(); g.moveTo(MC[0]-a[0], 284+a[1]); g.lineTo(MC[0]+a[0], 284+a[1]); g.stroke();
  });
  g.restore();

  /* L → 绕组（画到电机左侧的接线端），E → 外壳 */
  EP.wire(g, new Path([[js[0][0],js[0][1]],[js[0][0],200],[MC[0]-30,200],[MC[0]-30,MC[1]-10]]),
          {color:'#c0392b', w:2.4});
  EP.wire(g, new Path([[js[1][0],js[1][1]],[js[1][0],216],[MC[0]-46,216],[MC[0]-46,MC[1]+20],[MC[0]-28,MC[1]+20]]),
          {color:C.wire, w:2.4});
  txt(g, 'L → 绕组', 96, 194, {sz:9, b:1, c:C.err, al:'left'});
  txt(g, 'E → 外壳', 96, 228, {sz:9, b:1, c:C.tx3, al:'left'});

  /* 输出电压牌 */
  EP.chip(g, '输出 ' + volt + ' V', 62, 262,
          {sz:10, b:1, c: S2.k ? C.ok : C.warn,
           fill: S2.k ? C.okbg : C.warnbg, line: S2.k ? C.ok : C.warn});

  box(g, 18, 300, 324, 32, 6, S2.k ? C.okbg : C.warnbg, S2.k ? C.ok : C.warn, 1);
  txt(g, S2.k ? '摇到 120 转：输出 500 V，摇满 1 分钟再读数'
              : '只摇到 60 转：输出才 250 V，这次测量不作数',
      180, 316, {sz:10.5, b:1, c: S2.k ? C.ok : C.warn});
}
function note2(){
  $('s2a').textContent = (S2.k ? 120 : 60) + ' r/min';
  $('s2b').textContent = (S2.k ? 500 : 250) + ' V';
  $('s2c').textContent = S2.k ? '有效' : '不作数';
  $('n1').innerHTML = S2.k
    ? '<div class="st good">额定转速：输出 500 V</div>' +
      '手摇发电机摇到 <b>120 r/min</b> 才能输出额定的 500 V。' +
      '接线是 <b>L 接被测导体（绕组）、E 接外壳</b>，G 空着。' +
      '<div class="tip info" style="margin-top:8px">摇起来之后<b>要摇满 1 分钟再读</b>：' +
      '刚加压时绝缘在充电，读数会一直往上爬，太早读会读到一个偏小的数。' +
      '<span class="sub">摇的时候两根测试线要分开走，别绞在一起 —— 线与线之间也有绝缘电阻。</span></div>'
    : '<div class="st warn">转速不够，输出只有 250 V</div>' +
      '手摇发电机的输出电压跟转速走，只摇到 60 转，加到设备上的只有 <b>约 250 V</b>。' +
      '<div class="tip" style="margin-top:8px">' +
      '<b>指针指到哪儿不是重点 —— 重点是这次测量不作数。</b>' +
      '兆欧表内部是比率计，读数本身对转速不算敏感；' +
      '但<b>绝缘电阻的判据是「在额定试验电压下」测得的值</b>，' +
      '电压只有一半，那些要几百伏才暴露的缺陷就考不出来。' +
      '<span class="sub">所以规程写的是「摇到额定转速并保持 1 分钟」，两个条件缺一不可。</span></div>';
}
document.getElementById('s2k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S2.k = +b.dataset.k;
  document.querySelectorAll('#s2k .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S2.k);
  });
  note2();
});

/* ================================================================
   场景 3：电压等级与判据
   ================================================================ */
const RVALS = [0.05,0.1,0.2,0.3,0.5,0.8,1,2,3,5,10,15,25,40,60,100,200,500,1000];
const CASE3 = [
  {t:'500 V 表　380 V 电机', v:500, dev:'380 V 电动机', ok:1, motor:1,
   st:'配得上：500 V 以下的设备就用 500 V 表',
   b:'被测设备额定 380 V，属于「500 V 以下」这一档，<b>用 500 V 兆欧表正合适</b>。' +
     '试验电压接近工作电压，考出来的结果才有意义。',
   tip:'低压电工手里最常用的就是这一台 500 V 的表 —— 配电箱、照明线路、' +
       '低压电机、家用设备，全归它管。'},
  {t:'2500 V 表　220 V 线路', v:2500, dev:'220 V 照明线路', ok:0, motor:0,
   st:'电压选高了：可能把好绝缘直接击穿',
   b:'220 V 的线路，绝缘按几百伏设计。拿 <b>2500 V</b> 去摇，' +
     '加的电压远超它扛得住的范围，<b>绝缘可能当场被击穿</b> —— ' +
     '本来好好的线路，被你测出个窟窿。',
   tip:'<b>带电子元件的设备更要小心</b>（变频器、PLC、带电容的回路）：' +
       '几百伏直流会把里面的半导体打穿，测之前要先断开或按说明书短接保护。'},
  {t:'500 V 表　10 kV 电缆', v:500, dev:'10 kV 高压电缆', ok:0, motor:0,
   st:'电压选低了：考不出问题',
   b:'10 kV 电缆的绝缘要在上万伏下工作。用 <b>500 V</b> 去摇，' +
     '相当于只用了工作电压的二十分之一去「考」它 —— ' +
     '<b>读数可能很漂亮，可它在 10 kV 下未必扛得住</b>。',
   tip:'3000 V 以上的设备要用 <b>2500 V 及以上</b> 的表，而且高压设备的试验' +
       '有专门的规程和资格要求。<b>低压电工作业证的范围是 1000 V 以下</b>，' +
       '这一条写在这儿只是让你知道界线在哪。'}
];
const S3 = { k:0, ri:11 };
const st3 = new Stage('cv2', 360, 292);

function judge3(r){ return r < 0.5 ? 'bad' : (r < 1 ? 'edge' : 'ok'); }
function fmtM(r){ return r >= 1 ? r + ' MΩ' : (r*1000) + ' kΩ'; }
/* 数轴：0.05 ~ 1000 MΩ 走对数 */
function axX(r){
  const t = (Math.log10(r) - Math.log10(0.05)) / (Math.log10(1000) - Math.log10(0.05));
  return 40 + t*(330 - 40);
}

function draw3(){
  const g = st3.g; st3.clear();
  const K = CASE3[S3.k], r = RVALS[S3.ri], jd = judge3(r);
  EP.heading(g, 12, 14, '选表与判定', K.v + ' V 表');

  /* 表（只画壳和摇柄，不要刻度数字，太小了看不清） */
  megger(g, 24, 34, 132, 76, {val:r, ang:0.9, labels:false});
  EP.chip(g, K.v + ' V', 90, 122, {sz:10, b:1, c:P.ink, fill:C.box, line:C.boxLine});

  /* 被测设备 */
  const DX = 268, DY = 68;
  if(K.motor){
    g.save();
    g.beginPath(); g.arc(DX, DY, 26, 0, Math.PI*2);
    g.fillStyle = EP.cyl(g, DY-26, DY+26, '#1b2027', P.bodyD, P.bodyL); g.fill();
    g.strokeStyle = P.ink; g.lineWidth = 1.3; g.stroke();
    g.restore();
    txt(g, 'M', DX, DY, {sz:14, b:1, c:P.ink});
  }else{
    box(g, DX-30, DY-24, 60, 48, 5, C.box, C.boxLine, 1.2);
    txt(g, S3.k === 1 ? '220 V' : '10 kV', DX, DY - 6, {sz:10, b:1, c:C.tx2});
    txt(g, S3.k === 1 ? '照明' : '电缆', DX, DY + 10, {sz:9, c:C.tx3});
  }
  txt(g, K.dev, DX, DY + 40, {sz:9, c:C.tx3});

  /* 试验电压箭头 */
  const ac = K.ok ? C.ok : C.err;
  new Path([[164,DY],[228,DY]]).stroke(g, 2, ac);
  EC.head(g, 228, DY, 1, 0, 7, ac);
  txt(g, K.v + ' V 直流', 196, DY - 12, {sz:9, b:1, c:ac});
  if(S3.k === 1){
    /* 击穿：在设备上打一道红裂纹 */
    g.save();
    g.strokeStyle = C.err; g.lineWidth = 2.2; g.lineCap = 'round'; g.lineJoin = 'round';
    g.beginPath();
    g.moveTo(DX-14, DY-20); g.lineTo(DX-2, DY-4); g.lineTo(DX-10, DY+2); g.lineTo(DX+6, DY+20);
    g.stroke(); g.restore();
    EP.chip(g, '绝缘被击穿', DX, DY + 56, {sz:9.5, b:1, c:C.err, fill:C.errbg, line:C.err});
  }

  /* 判据数轴 */
  const AY = 178;
  new Path([[40,AY],[330,AY]]).stroke(g, 1.6, C.boxLine);
  [0.05, 0.1, 1, 10, 100, 1000].forEach(function(v){
    const x = axX(v);
    g.save(); g.strokeStyle = C.boxLine; g.lineWidth = 1;
    g.beginPath(); g.moveTo(x, AY-4); g.lineTo(x, AY+4); g.stroke(); g.restore();
    txt(g, v >= 1 ? String(v) : String(v), x, AY + 14, {sz:8.5, c:C.tx3});
  });
  txt(g, 'MΩ', 332, AY - 16, {sz:8.5, c:C.tx3, al:'right'});   /* 放 AY+14 会跟「1000」叠字 */
  /* 0.5 MΩ 合格线 */
  const x5 = axX(0.5);
  g.save(); g.strokeStyle = C.err; g.lineWidth = 1.6; g.setLineDash([4,3]);
  g.beginPath(); g.moveTo(x5, AY-26); g.lineTo(x5, AY+6); g.stroke(); g.restore();
  txt(g, '0.5 合格线', x5, AY - 34, {sz:9, b:1, c:C.err});
  /* 当前读数 */
  const cx3 = axX(r), cc = jd === 'bad' ? C.err : (jd === 'edge' ? C.warn : C.ok);
  g.save();
  g.beginPath(); g.arc(cx3, AY, 6, 0, Math.PI*2);
  g.fillStyle = cc; g.fill(); g.restore();
  EP.chip(g, fmtM(r), cx3, AY + 34, {sz:10, b:1, c:cc, fill:C.box, line:cc});

  const good = K.ok && jd === 'ok';
  box(g, 18, 248, 324, 32, 6, good ? C.okbg : (jd === 'bad' || !K.ok ? C.errbg : C.warnbg),
      good ? C.ok : (jd === 'bad' || !K.ok ? C.err : C.warn), 1);
  txt(g, !K.ok ? K.st
               : (jd === 'bad' ? '低于 0.5 MΩ —— 不合格，不能送电'
                               : (jd === 'edge' ? '刚过 0.5 MΩ 这条线 —— 要记录、要复查'
                                                : '在 0.5 MΩ 以上 —— 合格')),
      180, 264, {sz:10.5, b:1,
      c: good ? C.ok : (jd === 'bad' || !K.ok ? C.err : C.warn)});
}
function note3(){
  const K = CASE3[S3.k], r = RVALS[S3.ri], jd = judge3(r);
  $('s3lab').textContent = fmtM(r);
  $('s3a').textContent = K.v + ' V';
  $('s3b').textContent = K.ok ? '配得上' : (S3.k === 1 ? '太高了' : '太低了');
  $('s3c').textContent = jd === 'bad' ? '不合格' : (jd === 'edge' ? '临界' : '合格');
  $('n2').innerHTML = '<div class="st' + (K.ok ? ' good' : ' bad') + '">' + K.st + '</div>' +
    K.b + '<div class="tip' + (K.ok ? ' info' : '') + '" style="margin-top:8px">' + K.tip + '</div>';
}
document.getElementById('s3k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S3.k = +b.dataset.k;
  document.querySelectorAll('#s3k .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S3.k);
  });
  note3(); draw3();
});
$('s3r').addEventListener('input', function(){
  S3.ri = +this.value; note3(); draw3();
});

/* ================================================================
   场景 4：测完必须放电
   ================================================================
   电缆和绕组本身就是电容，500 V 的电荷不会自己马上跑掉。
   1 µF 时储能 ½CU² = 0.5 × 1e-6 × 500² = 0.125 J。 */
const S4 = { k:0, ph:0 };
const st4 = new Stage('cv3', 360, 292);
const CY4 = 146;

function draw4(dt){
  const g = st4.g; st4.clear();
  const done = (S4.k === 2), shock = (S4.k === 1);
  S4.ph += dt * 4;
  EP.heading(g, 12, 14, '收尾', done ? '已放电' : '还带着电');

  /* 电缆（沿用屏 1 那段） */
  cableSide(g, CY4, {});
  /* 铠装接地 */
  new Path([[292,CY4+22],[292,184]]).stroke(g, 2, C.wire);
  g.save(); g.strokeStyle = C.PE; g.lineWidth = 2; g.lineCap = 'round';
  [[10,0],[7,4],[4,8]].forEach(function(a){
    g.beginPath(); g.moveTo(292-a[0], 184+a[1]); g.lineTo(292+a[0], 184+a[1]); g.stroke();
  });
  g.restore();

  /* 残压 */
  const v = done ? 0 : 500;
  EP.chip(g, done ? '0 V　安全' : '+ ' + v + ' V　残压',
          128, 84, {sz:11, b:1, c: done ? C.ok : C.err,
                     fill: done ? C.okbg : C.errbg, line: done ? C.ok : C.err});
  /* 电容示意：线芯和铠装之间存着电 */
  if(!done){
    g.save();
    g.strokeStyle = C.err; g.lineWidth = 1.3; g.globalAlpha = 0.55 + Math.sin(S4.ph)*0.25;
    g.setLineDash([3,3]);
    for(let i = 0; i < 3; i++){
      const lx = 180 + i*34;
      g.beginPath(); g.moveTo(lx, CY4 - 6); g.lineTo(lx, CY4 - 20); g.stroke();
    }
    g.restore();
    /* 「铠装」那个标注就在 CY4-30 上，这一行必须右移＋缩短，否则叠字 */
    txt(g, '两边存着电荷', 252, CY4 - 32, {sz:9, c:C.err});
  }

  if(shock){
    /* 一只手去碰线芯 —— 电荷经人体放掉 */
    /* 手指尖要够到线芯，闪电从线芯下沿连到指尖 —— 手悬空的话看不出是碰到了 */
    EP.handFlat(g, 78, 214, false, {s:0.55});
    g.save();
    g.strokeStyle = C.err; g.lineWidth = 2.4; g.lineCap = 'round'; g.lineJoin = 'round';
    g.beginPath();
    g.moveTo(70, 154); g.lineTo(80, 166); g.lineTo(70, 172); g.lineTo(82, 188);
    g.stroke(); g.restore();
    EP.chip(g, '电击', 32, 200, {sz:10, b:1, c:C.err, fill:C.errbg, line:C.err});
  }
  if(done){
    /* 放电棒：绝缘杆 + 金属钩 + 接地线 */
    g.save();
    g.strokeStyle = P.bakeliteL; g.lineWidth = 7; g.lineCap = 'round';
    g.beginPath(); g.moveTo(46, 232); g.lineTo(48, 192); g.stroke();
    g.strokeStyle = P.steel; g.lineWidth = 3.4;
    g.beginPath(); g.moveTo(48, 192); g.lineTo(52, 156); g.lineTo(60, 146); g.stroke();
    g.restore();
    EP.wire(g, new Path([[46,232],[46,252],[292,252],[292,192]]), {c:'yellow', w:2.2});
    txt(g, '放电棒', 62, 224, {sz:9, b:1, c:C.ok, al:'left'});   /* 放 y=246 会被结论条压住 */
  }

  const c4 = done ? C.ok : C.err;
  box(g, 18, 250, 324, 32, 6, done ? C.okbg : C.errbg, c4, 1);
  txt(g, done ? '用放电棒把电荷导走：0 V，这时候才能动手'
              : (shock ? '直接上手：那 500 V 全从你身上放掉'
                       : '刚停摇：线芯和铠装之间还存着 500 V，不会自己跑掉'),
      180, 266, {sz:10.5, b:1, c:c4});
}
function note4(){
  const done = (S4.k === 2), shock = (S4.k === 1);
  $('s4a').textContent = done ? '0 V' : '500 V';
  $('s4b').textContent = done ? '0 J' : '0.125 J';
  $('s4c').textContent = done ? '安全' : (shock ? '电到人了' : '危险');
  $('n3').innerHTML = done
    ? '<div class="st good">放电之后才算完</div>' +
      '用<b>带绝缘杆的放电棒</b>（或接地线）把线芯短接到地，电荷导走，残压降到 0。' +
      '<b>这时候才能拆线、才能动手。</b>' +
      '<div class="tip info" style="margin-top:8px">别拿螺丝刀去短一下 —— ' +
      '那会打出电弧、烧坏触点，也伤眼睛。' +
      '<span class="sub">越长的电缆、越大的电机，电容越大，越要认真放。</span></div>'
    : (shock
      ? '<div class="st bad">这 500 V 是从你身上放掉的</div>' +
        '电缆的线芯和铠装之间就是一个<b>电容</b>，刚才那 500 V 全存在里面。' +
        '手一碰线芯，电荷就找到了一条经过你身体到地的路。' +
        '<div class="tip" style="margin-top:8px">1 µF、500 V 的储能是 <b>0.125 J</b> —— ' +
        '数字看着小，可它在接触的一瞬间全放掉。<b>真正的危险常常是被电之后的二次伤害</b>：' +
        '从梯子上摔下来、手撞到运动部件。</div>'
      : '<div class="st warn">停了摇，电还在</div>' +
        '兆欧表往设备上加了 500 V 直流。电缆和绕组本身就是<b>电容</b>，' +
        '停止摇动之后这些电荷<b>不会自己马上跑掉</b>，绝缘越好跑得越慢。' +
        '<div class="tip" style="margin-top:8px">收尾的顺序是：' +
        '<b>先把 L 线从设备上取下 → 再停止摇动 → 对设备放电 → 确认没电了再动手</b>。' +
        '<span class="sub">先取 L 线是为了防止设备电容里的电荷倒灌回表里，把表打坏。</span></div>');
}
document.getElementById('s4k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S4.k = +b.dataset.k;
  document.querySelectorAll('#s4k .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S4.k);
  });
  note4();
});

/* ================================================================
   绑定
   ================================================================ */
function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会清空画布。屏 2、4 在 rAF 里每帧重画，静态的屏 1、3 必须在这儿补画 */
  draw1(); draw2(0); draw3(); draw4(0);
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:3, sec:'3.8'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('3.8');
  let h = '';
  h += nb.prev ? '<a href="'+nb.prev.f+'">‹ '+nb.prev.id+' '+nb.prev.t+'</a>'
               : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next ? '<a class="next" href="'+nb.next.f+'">'+nb.next.id+' '+nb.next.t+' ›</a>'
               : '<a class="next" href="index.html">第 3 章完 · 回课程首页 ›</a>';
  $('pager').innerHTML = h;
})();

loop(function(dt){
  if(cur === 1) draw2(dt);
  else if(cur === 3) draw4(dt);
});
  }
});
})();
