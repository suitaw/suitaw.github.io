/* 2.2 接触器 —— 本节内容的唯一真相。
   book.html 按需载入它；c2-2.html 是薄壳，也载入它。
   对应《零基础学电工》第 2 章 2.2 节（书内 P22~P24）。 */
(function(){
'use strict';
ELEC.reg({
  id: '2.2',
  file: 'c2-2.html',
  title: '2.2 接触器',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>它怎么动</button>
    <button class="tab" data-i="1"><span class="n">2</span>四种触点</button>
    <button class="tab" data-i="2"><span class="n">3</span>失压保护</button>
    <button class="tab" data-i="3"><span class="n">4</span>交流·直流·铭牌</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">一个电磁铁，替你去扳那把刀</div>
    上一节那三种开关，都得<b>人站在跟前用手扳</b>。接触器不用 ——
    <b>给线圈通一点小电流，它自己把主触点合上。</b>
    点下面的按钮，盯住中间那块衔铁。
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns">
        <button class="btn big" id="s1on">给线圈通电</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">线圈这一路<br>（控制回路）</div><div class="v" id="s1a">0 W</div></div>
        <div class="num"><div class="k">主触点这一路<br>（主电路）</div><div class="v" id="s1b">0 kW</div></div>
        <div class="num hi"><div class="k">相差<br>多少倍</div><div class="v" id="s1c">—</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">动作过程，四步</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>第几步</th><th>发生了什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">① 线圈通电</td><td>电流流过线圈，铁芯变成电磁铁（1.6 节讲的电生磁）</td></tr>
        <tr><td class="eu-s">② 吸住衔铁</td><td>电磁吸力把衔铁拉向铁芯，气隙合上</td></tr>
        <tr><td class="eu-s">③ 带动触点</td><td>衔铁通过一根连杆，把三对主触点<b>同时</b>压合</td></tr>
        <tr><td class="eu-s">④ 断电复位</td><td>吸力消失，<b>反力弹簧</b>把衔铁顶回去，触点跟着断开</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>注意第 ④ 步：靠的是弹簧，不是反向电流。</b>
      接触器没有「反着通电就断开」这回事 —— <b>通电吸合、断电释放</b>，只有这两个状态。
      所以线路一失电，它必然全部断开。这一条到第 3 屏会变成一个很重要的保护功能。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">那条虚线是整张图纸的关键</div>
    画面中间那条<b>竖着的虚线</b>，意思是「机械联动」：
    衔铁和三对主触点<b>是同一个机构</b>，衔铁动，它们必然一起动。<br>
    在原理图上，这条虚线会画成<b>横着的一条</b>，把线圈和它带动的所有触点串起来。
    <span class="sub">下一屏就是原理图的画法 —— 到时候你会看到，同一个 KM 的触点可能散落在图纸的各个角落，
    全靠这条虚线和「KM」这两个字母认亲。</span>
  </div>

  <div class="bet" data-bet="c22-power" data-q="线圈那一路才十几瓦，主电路那一路好几千瓦。这中间多出来的能量是接触器变出来的吗？"
       data-opts="是，电磁铁把能量放大了|不是，主电路的能量本来就来自三相电源，接触器只是个开关|不是，是电动机自己发出来的" data-right="1"
       data-after="不是。接触器一点能量都不产生，它只是决定「那条大电流的路通不通」。用一点小能量去控制一大堆能量的通断——这叫「控制」，不叫「放大能量」。整个电气控制这门课，讲的都是这一件事。"></div>
</section>

<!-- ================= 场景 2：四种触点 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">同一个 KM，触点有好几副，脾气还不一样</div>
    这一屏是<b>原理图的画法</b>。左边是线圈，右边是它带动的触点。
    <b>点按钮让线圈得电，看四列各自怎么动。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns">
        <button class="btn big" id="s2on">给线圈 KM 通电</button>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">「常开 / 常闭」说的是线圈<u>没</u>通电时的样子</div>
    这是初学者第一个卡住的地方。<b>「常」＝平常＝线圈没得电的时候。</b>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>叫法</th><th>线圈断电时</th><th>线圈得电后</th><th>别名</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">动合触点</td><td>断开</td><td><b>闭合</b></td><td>常开、NO</td></tr>
        <tr><td class="eu-s">动断触点</td><td>闭合</td><td><b>断开</b></td><td>常闭、NC</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>记法：「动」字后面那个字，说的是通电后要去干的事。</b>
      动<b>合</b> ＝ 得电后去<b>合</b>上；动<b>断</b> ＝ 得电后去<b>断</b>开。
      这个记法比背「常开常闭」可靠得多 —— 「常开」这三个字里没有任何信息告诉你它得电后干什么。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">主触点和辅助触点，别用混</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>主触点</th><th>辅助触点</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">接在哪</td><td>主电路（电动机那一路）</td><td>控制电路（按钮、指示灯那一路）</td></tr>
        <tr><td class="eu-s">过多大电流</td><td>几安到几百安</td><td>几安以下</td></tr>
        <tr><td class="eu-s">几对</td><td>一般 3 对（三相）</td><td>几对，动合动断都有</td></tr>
        <tr><td class="eu-s">有没有灭弧罩</td><td><b>有</b>，断大电流会拉弧</td><td>没有</td></tr>
        <tr><td class="eu-s">图上怎么标</td><td>KM</td><td>KM-1、KM-2…</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>拿辅助触点去接电动机，是会烧东西的。</b>辅助触点又小又没有灭弧罩，
      过一次几十安的起动电流就可能粘死（触点熔焊在一起，从此断不开）。
      反过来，拿主触点去接一个指示灯倒是不烧，但那是浪费。
    </div>
  </div>

  <div class="bet" data-bet="c22-nc" data-q="一个动断（常闭）辅助触点，接了一只指示灯。线圈得电后，这只灯会怎样？"
       data-opts="亮|灭|一直不变" data-right="1"
       data-after="灭。动断触点平常是闭合的，灯亮着；线圈一得电它就断开，灯灭。书上图 2-9 里那只「停机指示灯 HL2」就是这么接的——机器一起动，「停机」的灯就自己灭了。"></div>
</section>

<!-- ================= 场景 3：失压保护 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">这一屏是接触器真正不可替代的地方</div>
    左边用闸刀开关直接控制电动机，右边用接触器。<b>两台机器现在都在转。</b>
    然后 —— <b>点「来一次停电」，看来电之后各自发生了什么。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns">
        <button class="btn big" id="s3cut">⚡ 来一次停电</button>
      </div>
      <div class="btns">
        <button class="btn" id="s3start">按 SB1 起动</button>
        <button class="btn" id="s3stop">按 SB2 停止</button>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">这叫失压保护（也叫零压保护、欠压释放）</div>
    道理简单得出奇：<b>接触器靠电磁吸力保持闭合，电一没就自己松开了。</b>
    来电时线圈那一路是断的（起动按钮早就弹回去了），所以它<b>不会自己合上</b>。
    <div class="tip" style="margin-top:8px">
      <b>为什么这条能救命：</b>停电了，人以为机器停了，伸手去掏卡住的料、去清铁屑、
      去换刀。这时候来电 —— 用闸刀的那台<b>当场自己转起来</b>。
      车间里的断手事故，很多就是这么来的。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">自锁：为什么松开起动按钮机器还在转</div>
    起动按钮 SB1 是<b>点动</b>的，手一松就弹回去、线圈那一路就断了。
    可机器还在转 —— 因为线圈一得电，它自己的一个<b>动合辅助触点 KM-1</b>
    也闭合了，这个触点<b>并联在 SB1 两边</b>，替 SB1 把这条路接着通下去。
    <div class="tip info" style="margin-top:8px">
      <b>「自己锁住自己」，所以叫自锁（也叫自保持）。</b>
      这是电气控制里第一个、也是最重要的一个套路，第 11 章整章都建在它上面。
      现在只要记住那条并联的支路长什么样就够了。<br>
      停止按钮 SB2 是<b>串</b>在这条路里的动断按钮：一按，整条路断，线圈失电，
      KM-1 跟着断开 —— 自锁被打破，松手也回不去了。
    </div>
  </div>

  <div class="bet" data-bet="c22-lock" data-q="把自锁触点 KM-1 拆掉，其余不动。按住 SB1 不放，机器转不转？松手呢？"
       data-opts="按住转，松手就停|按住不转|按住转，松手也一直转" data-right="0"
       data-after="按住转，松手就停 —— 这正是「点动」。有些场合就是要点动（比如对刀、调试时挪一下），所以点动电路是真实存在的一种接法。自锁触点就是把「点动」变成「起动」的那一个零件。"></div>
</section>

<!-- ================= 场景 4：交流 / 直流 / 铭牌 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">买一个、换一个，看铭牌上哪几个数</div>
    交流接触器和直流接触器长得像，里面不一样。
    <b>最要命的一个数是线圈电压 —— 接错当场烧。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4p">
        <button class="btn on" data-k="0">交流接触器</button>
        <button class="btn" data-k="1">直流接触器</button>
        <button class="btn" data-k="2">看铭牌</button>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">两种接触器的差别</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>交流接触器</th><th>直流接触器</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">用在</td><td>交流电路（最常见，你多半只会碰到它）</td><td>直流电路</td></tr>
        <tr><td class="eu-s">铁芯</td><td><b>硅钢片叠成</b>（挡涡流，不然铁芯自己发热）</td><td>可以是整块软铁</td></tr>
        <tr><td class="eu-s">短路环</td><td><b>有</b>，嵌在铁芯端面</td><td>不需要</td></tr>
        <tr><td class="eu-s">线圈</td><td>匝数少、线粗、扁平</td><td>匝数多、线细、细长</td></tr>
        <tr><td class="eu-s">书上强调的保护</td><td>欠电压保护、零电压释放保护</td><td>低电压释放保护</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>短路环解决的是「嗡嗡响」。</b>交流电每个周期有两次过零，磁通过零、吸力也过零，
      衔铁就会在每秒 100 次的节奏上松一下、吸一下 —— 表现出来就是振动和嗡嗡声，
      时间长了触点会打坏。短路环里感应出的电流产生一个<b>错开相位</b>的磁通，
      两个磁通的吸力峰谷错开，合起来就不再过零了。<br>
      <span class="sub">现场判断：接触器一直嗡嗡响，常见原因就是<b>短路环断了</b>、
      铁芯端面有油污脏物贴合不严、或者线圈电压偏低。第 5 章讲怎么测。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">线圈电压接错，是新手最贵的一个错</div>
    线圈上写着 <span class="rd">AC 220V</span> 的，接到 380V 上，
    <b>几秒钟就冒烟</b>。反过来把 380V 的线圈接到 220V 上，吸力不够，
    衔铁半吸不吸地抖 —— 这种状态下线圈电流比正常吸合时大得多，同样会烧。
    <span class="sub">同一个型号的接触器，线圈电压有 AC36V / AC110V / AC220V / AC380V / DC24V 好几种，
    <b>外观完全一样</b>，只能看线圈上那行小字。换件之前先抄下来。</span>
  </div>

  <div class="quiz" data-quiz="c2-2">
    <div class="qz" data-q="接触器的线圈断电之后，主触点靠什么回到断开位置？"
         data-opts="靠反向通电|靠反力弹簧把衔铁顶回去|靠触点自身的重量"
         data-right="1"
         data-why="靠反力弹簧。接触器只有「通电吸合、断电释放」两个状态，没有反向通电这回事。正因为断电必然释放，才有了失压保护这个附带的好处。"></div>
    <div class="qz" data-q="一个动断（常闭）辅助触点，在线圈得电后处于什么状态？"
         data-opts="闭合|断开|保持原状"
         data-right="1"
         data-why="断开。「常闭」说的是线圈没得电时的状态，得电后它就要去做「断」这件事。记法：动断 = 得电后去断开。"></div>
    <div class="qz" data-q="用闸刀开关直接控制的电动机，停电后又来电了，会怎样？"
         data-opts="要重新合闸才转|自己就转起来了|烧掉"
         data-right="1"
         data-why="自己就转起来了——闸刀一直合着，来电就通。这就是它不能用在电动机主电路上的根本原因。接触器不会：它靠电磁力保持，一停电就释放，来电时线圈那一路是断的，必须重新按起动按钮。"></div>
    <div class="qz" data-q="现场一台接触器合上后一直「嗡嗡」响，最该先怀疑哪一个？"
         data-opts="主触点烧蚀了|铁芯端面的短路环断了、或者端面有脏物贴合不严|电动机缺相"
         data-right="1"
         data-why="短路环 / 铁芯贴合。交流磁通每周两次过零，吸力跟着过零，衔铁就会抖——短路环存在的意义就是把这个抖动抹掉。它断了、或者铁芯端面脏了合不严，都会重新响起来。线圈电压偏低也会。主触点烧蚀表现为发热和接触不良，不是嗡嗡声。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 2 章 2.2 节（书内 P22~P24）<br>下一节讲继电器：同样是线圈带触点，但它管的是「什么时候该动」</div>
</section>`,

  init: function(EC){
'use strict';
const {C, Path, Stage, txt, box, tag, loop, $} = EC;

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

/* 这两个数都是**示意量级**，不是某个具体型号的实测值 —— 文案里也是这么说的。
   要的是那个倍数关系：控制回路十几瓦，主电路好几千瓦。 */
const COIL_W = 11, MAIN_KW = 7.9;

/* ================================================================
   场景 1：机构怎么动
   ================================================================ */
const S1 = { on:false, k:0, spin:0, ph:0 };
const st1 = new Stage('cv0', 360, 392);

/* E 形静铁芯（硅钢片叠的那种） */
function core(g, cx, y0, h){
  const w = 74, legW = 15;
  g.save();
  g.fillStyle = '#7c8590'; g.strokeStyle = '#4b535c'; g.lineWidth = 1;
  /* 底轭 */
  box(g, cx-w/2, y0+h-16, w, 16, 2, '#7c8590', '#4b535c', 1);
  /* 三根柱 */
  [-w/2, -legW/2, w/2-legW].forEach(function(dx){
    box(g, cx+dx, y0, legW, h-16, 2, '#8b949e', '#4b535c', 1);
  });
  g.restore();
  /* 叠片纹理 */
  g.save(); g.globalAlpha = .35; g.strokeStyle = '#3a424b'; g.lineWidth = 1;
  for(let i=1;i<7;i++){
    const yy = y0 + (h-16)*i/7;
    g.beginPath(); g.moveTo(cx-w/2, yy); g.lineTo(cx-w/2+legW, yy); g.stroke();
    g.beginPath(); g.moveTo(cx+w/2-legW, yy); g.lineTo(cx+w/2, yy); g.stroke();
  }
  g.restore();
}

function draw1(dt){
  const g = st1.g; st1.clear();
  EP.heading(g, 20, 16, '交流接触器', '剖开看');

  const tk = S1.on ? 1 : 0;
  S1.k += (tk - S1.k) * Math.min(1, dt*16);
  const k = S1.k, on = k > 0.5;
  if(on) S1.spin += dt*4.6;
  if(on) S1.ph += dt*70;

  const XS = [76, 116, 156];
  const CT = 108;                       /* 触点铰接点 y */
  const CB = 150;                       /* 触点下端 y */

  /* ---- 主电路：三相进线 → 主触点 → 电动机 ---- */
  const PC = ['#e8d34a', '#4fc04a', '#ff5f52'];
  g.save(); g.lineCap = 'round';
  XS.forEach(function(x, i){
    g.strokeStyle = PC[i]; g.lineWidth = 2.6;
    g.beginPath(); g.moveTo(x, 44); g.lineTo(x, CT); g.stroke();
    txt(g, 'L' + (i+1), x, 34, {sz:9.5, c:C.tx3});
  });
  g.restore();
  /* 触点：断开时斜着，闭合时竖直 */
  const ang = (1-k) * 0.62;
  XS.forEach(function(x){
    g.save(); g.lineCap = 'round';
    g.translate(x, CT); g.rotate(-ang);
    g.strokeStyle = EP.P.copperD; g.lineWidth = 5.2;
    g.beginPath(); g.moveTo(0,0); g.lineTo(0, CB-CT); g.stroke();
    g.strokeStyle = EP.P.copper; g.lineWidth = 3.2;
    g.beginPath(); g.moveTo(0,0); g.lineTo(0, CB-CT); g.stroke();
    g.restore();
    EP.terminal(g, x, CT, 4.2);
    EP.terminal(g, x, CB, 4.2);
  });
  /* 出线 → 电动机 */
  g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.6; g.lineCap = 'round';
  XS.forEach(function(x){
    g.beginPath(); g.moveTo(x, CB); g.lineTo(x, 176); g.stroke();
    g.beginPath(); g.moveTo(x, 176); g.lineTo(116, 190); g.stroke();
  });
  g.restore();
  EP.motor(g, 116, 214, 21, {spin: on ? S1.spin : 0});
  txt(g, on ? '电动机在转' : '电动机停着', 116, 250,
      {sz:10, b:1, c: on ? C.ok : C.tx3});
  if(on){
    XS.forEach(function(x){
      EP.flow(g, new Path([[x,44],[x,CT]]), {phase:S1.ph, gap:40, kind:'cur', size:5});
    });
  }
  EP.callout(g, 68, 129, 66, 96, '主触点', 'KM，3 对', {al:'right'});

  /* ---- 机械联动虚线 ---- */
  g.save();
  g.setLineDash([5,4]); g.strokeStyle = C.tx3; g.lineWidth = 1.4;
  g.beginPath(); g.moveTo(62, 128); g.lineTo(200, 128); g.stroke();
  g.beginPath(); g.moveTo(200, 128); g.lineTo(200, 252 + k*10); g.stroke();
  g.restore();
  txt(g, '机械联动', 206, 118, {sz:9, c:C.tx3, al:'left'});

  /* ---- 电磁机构 ---- */
  const BX = 148, BW = 108, BY = 236, BH = 96;
  box(g, BX, BY, BW, BH, 6, '#232a32', '#151a20', 1.3);
  const cx = BX + BW/2;
  /* 静铁芯 + 线圈 */
  core(g, cx, BY + 42, 54);
  g.save();
  g.strokeStyle = on ? '#d08a3c' : EP.P.copperD; g.lineWidth = 3.4;
  for(let i=0;i<5;i++){
    const yy = BY + 48 + i*7;
    g.beginPath(); g.ellipse(cx, yy, 17, 3.6, 0, 0, EC.TAU); g.stroke();
  }
  g.restore();
  txt(g, '线圈', BX + BW + 6, BY + 62, {sz:9.5, c:C.tx3, al:'left'});
  /* 衔铁：吸合时下移 10px */
  const ay = BY + 16 + k*10;
  box(g, cx-40, ay, 80, 13, 2, '#8b949e', '#4b535c', 1.2);
  /* 名字写在衔铁自己身上：左边是电动机、右边是弹簧和线圈的标注，没地方放了 */
  txt(g, '衔铁', cx, ay + 6, {sz:8.5, b:1, c:'#2b3038'});
  /* 气隙 */
  const gap = (BY + 42) - (ay + 13);
  if(gap > 1.5){
    g.save(); g.setLineDash([2,2]); g.strokeStyle = C.warn; g.lineWidth = 1.2;
    g.beginPath(); g.moveTo(cx+44, ay+13); g.lineTo(cx+44, BY+42); g.stroke();
    g.restore();
    txt(g, '气隙', cx + 48, (ay+13+BY+42)/2, {sz:8.5, c:C.warn, al:'left'});
  }
  /* 反力弹簧（衔铁两侧） */
  [cx-32, cx+32].forEach(function(sx){
    g.save(); g.strokeStyle = EP.P.steel; g.lineWidth = 1.8; g.lineJoin='round';
    g.beginPath();
    const y0 = BY + 2, y1 = ay;
    for(let i=0;i<=5;i++){
      const yy = y0 + (y1-y0)*i/5;
      const xx = sx + ((i%2) ? 4 : -4);
      i ? g.lineTo(xx, yy) : g.moveTo(xx, yy);
    }
    g.stroke(); g.restore();
  });
  txt(g, '反力弹簧', BX + BW + 6, BY + 10, {sz:9, c:C.tx3, al:'left'});
  /* 吸力箭头 */
  if(on){
    g.save(); g.globalAlpha = .9;
    EC.head(g, cx, ay + 20, 0, 1, 6, C.acc);
    g.restore();
  }

  /* ---- 控制回路小闭环 ---- */
  const A1 = cx - 18, A2 = cx + 18;
  const CY = BY + BH;                       /* 壳体底边 = 332 */
  const CP = new Path([[A1, CY],[A1, 350],[110, 350],[110, 374],[288, 374],[288, 350],[A2, 350],[A2, CY]]);
  CP.stroke(g, 2.4, C.wire);
  EP.terminal(g, A1, CY, 4);
  EP.terminal(g, A2, CY, 4);
  txt(g, 'A1', A1 - 9, CY + 10, {sz:8.5, c:C.tx3, al:'right'});
  txt(g, 'A2', A2 + 9, CY + 10, {sz:8.5, c:C.tx3, al:'left'});
  box(g, 136, 362, 62, 24, 5, C.box, C.boxLine, 1);
  txt(g, '～220V', 167, 374, {sz:10, b:1, c:C.tx2});
  EC.switchSym(g, 248, 374, S1.on, {len:26});
  txt(g, '控制电源与开关', 288, 358, {sz:8.5, c:C.tx3, al:'right'});
  if(on) EP.flow(g, CP, {phase:S1.ph*0.6, gap:44, r:2.6});

  /* ---- 右上读数 ---- */
  box(g, 250, 44, 100, 60, 6, C.box, C.boxLine, 1);
  txt(g, '控制回路', 300, 58, {sz:9.5, c:C.tx3});
  txt(g, on ? COIL_W + ' W' : '0 W', 300, 78, {sz:15, b:1, c:on ? C.acc : C.tx3});
  txt(g, '一只灯泡的量', 300, 94, {sz:8.5, c:C.tx3});
  box(g, 250, 168, 100, 60, 6, C.box, C.boxLine, 1);
  txt(g, '主电路', 300, 182, {sz:9.5, c:C.tx3});
  txt(g, on ? MAIN_KW + ' kW' : '0 kW', 300, 202, {sz:15, b:1, c:on ? C.cur : C.tx3});
  txt(g, '一台中型电动机', 300, 218, {sz:8.5, c:C.tx3});
}

function note1(){
  const on = S1.on;
  const ratio = Math.round(MAIN_KW*1000/COIL_W);
  $('s1on').textContent = on ? '把线圈断电' : '给线圈通电';
  $('s1a').textContent = on ? COIL_W + ' W' : '0 W';
  $('s1b').textContent = on ? MAIN_KW + ' kW' : '0 kW';
  $('s1c').textContent = on ? '约 ' + ratio + ' 倍' : '—';
  $('n0').innerHTML = on
    ? '<div class="st good">吸合了</div>'+
      '线圈里的小电流让铁芯变成电磁铁，一把把衔铁拽了下来（气隙没了）。'+
      '衔铁通过那根连杆，<b>把三对主触点同时压合</b>，几千瓦的电动机就转起来了。<br>'+
      '<b>左边这一路 '+COIL_W+' W，右边那一路 '+MAIN_KW+' kW，差了约 '+ratio+' 倍。</b>'+
      '你在控制柜门上按的那个小按钮，走的就是左边这一路 —— '+
      '所以按钮可以做得又小又轻，还可以装在离电动机几十米远的地方。'+
      '<span class="sub">（这两个数是量级示意，不同型号差别很大，以铭牌为准。）</span>'
    : '<div class="st">现在线圈没电，反力弹簧把衔铁顶着</div>'+
      '三对主触点是<b>断开</b>的，气隙看得见（黄色虚线那一小段）。<br>'+
      '注意：<b>这是它的「自然状态」</b> —— 没人管它、断了电、线断了，它都在这个状态。'+
      '一台机器最安全的默认状态就应该是「停」，接触器天生满足这一条。<br>'+
      '<span class="sub">点上面的按钮通电，盯住衔铁和那道气隙。</span>';
}
$('s1on').addEventListener('click', function(){ S1.on = !S1.on; note1(); });

/* ================================================================
   场景 2：四种触点（原理图画法）
   ================================================================ */
const S2 = { on:false, k:0 };
const st2 = new Stage('cv1', 360, 306);
const COLS = [
  {x:132, t:'',       s:'',   main:true,  nc:false},
  {x:172, t:'主触点', s:'KM', main:true,  nc:false},
  {x:212, t:'',       s:'',   main:true,  nc:false},
  {x:262, t:'辅助动合', s:'KM-1', main:false, nc:false},
  {x:316, t:'辅助动断', s:'KM-2', main:false, nc:true}
];

function draw2(dt){
  const g = st2.g; st2.clear();
  EP.heading(g, 20, 16, '一个线圈，带动它名下所有触点');
  const tk = S2.on ? 1 : 0;
  S2.k += (tk - S2.k) * Math.min(1, dt*16);
  const k = S2.k, on = k > 0.5;

  const Y0 = 60, YT = 118, YB = 160, Y1 = 216;

  /* 线圈符号 */
  const cx = 56, cy = 138;
  box(g, cx-20, cy-15, 40, 30, 3, on ? C.accbg : C.box, on ? C.acc : C.boxLine, on ? 2 : 1.4);
  txt(g, 'KM', cx, cy, {sz:12, b:1, c: on ? C.acc : C.tx2});
  g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.2; g.lineCap='round';
  g.beginPath(); g.moveTo(cx, cy-15); g.lineTo(cx, Y0); g.stroke();
  g.beginPath(); g.moveTo(cx, cy+15); g.lineTo(cx, Y1); g.stroke();
  g.restore();
  txt(g, '线圈', cx, cy + 30, {sz:9.5, c:C.tx3});
  txt(g, on ? '得电' : '没电', cx, cy + 44, {sz:10, b:1, c: on ? C.acc : C.tx3});

  /* 机械联动虚线 */
  g.save();
  g.setLineDash([5,4]); g.strokeStyle = on ? C.acc : C.tx3; g.lineWidth = 1.4;
  g.beginPath(); g.moveTo(cx+20, cy-6); g.lineTo(336, cy-6); g.stroke();
  g.restore();

  COLS.forEach(function(col){
    const x = col.x;
    /* 动断触点：得电后断开，所以摆动方向反过来 */
    const closed = col.nc ? (k < 0.5) : (k > 0.5);
    const a = col.nc ? (0.55 * k) : (0.55 * (1-k));
    g.save(); g.strokeStyle = C.wire; g.lineWidth = col.main ? 2.6 : 2; g.lineCap='round';
    g.beginPath(); g.moveTo(x, Y0); g.lineTo(x, YT); g.stroke();
    g.beginPath(); g.moveTo(x, YB); g.lineTo(x, Y1); g.stroke();
    g.restore();
    /* 触点臂 */
    g.save(); g.lineCap='round';
    g.translate(x, YT); g.rotate(-a);
    g.strokeStyle = col.main ? EP.P.copperD : '#8b949e'; g.lineWidth = col.main ? 5 : 3.6;
    g.beginPath(); g.moveTo(0,0); g.lineTo(0, YB-YT); g.stroke();
    if(col.main){
      g.strokeStyle = EP.P.copper; g.lineWidth = 3;
      g.beginPath(); g.moveTo(0,0); g.lineTo(0, YB-YT); g.stroke();
    }
    g.restore();
    /* 动断的那一横：国标里动断触点臂上带一小横杠 */
    if(col.nc){
      g.save(); g.strokeStyle = '#b7c1cc'; g.lineWidth = 1.8; g.lineCap='round';
      g.translate(x, YT); g.rotate(-a);
      g.beginPath(); g.moveTo(-7, YB-YT); g.lineTo(7, YB-YT); g.stroke();
      g.restore();
    }
    EP.terminal(g, x, YT, 4);
    EP.terminal(g, x, YB, 4);
    if(col.t){
      txt(g, col.t, x, 40, {sz:9.5, c:C.tx3});
      txt(g, col.s, x, 232, {sz:10, b:1, c:C.tx2});
    }
    /* 状态字 */
    txt(g, closed ? '通' : '断', x, 250,
        {sz:11, b:1, c: closed ? C.ok : C.tx3});
  });
  txt(g, '（3 对）', 172, 54, {sz:8.5, c:C.tx3});

  /* 结论条 */
  box(g, 20, 268, 320, 30, 6, on ? C.accbg : C.box, on ? C.acc : C.boxLine, 1.2);
  txt(g, on ? '线圈得电：动合的全合上，动断的全断开'
            : '线圈没电：动合的断着，动断的通着（这就是「常」的意思）',
      180, 283, {sz:10.5, b:1, c: on ? C.acc : C.tx2});
}
function note2(){
  const on = S2.on;
  $('s2on').textContent = on ? '把线圈 KM 断电' : '给线圈 KM 通电';
  $('n1').innerHTML = on
    ? '<div class="st good">线圈得电，五副触点同时动作</div>'+
      '三对主触点（粗的那三根，接电动机）<b>合上</b>；'+
      '辅助动合 KM-1 <b>合上</b>；辅助动断 KM-2 <b>断开</b>。<br>'+
      '<b>它们是被同一块衔铁带着动的</b>，所以图上用那条虚线连起来 —— '+
      '实际图纸里这几副触点可能画在完全不同的位置，甚至不同的页上，'+
      '<b>靠 KM 这两个字母认亲</b>。'
    : '<div class="st">线圈没电时的样子，就是「常态」</div>'+
      '动合的三对主触点和 KM-1 都<b>断着</b>，动断的 KM-2 <b>通着</b>。<br>'+
      '仔细看最右边那一列：它的触点臂上多了<b>一小横杠</b>，还搭在竖线上 —— '+
      '这就是国标里动断（常闭）触点的画法。<b>认图时先找这一横。</b>';
}
$('s2on').addEventListener('click', function(){ S2.on = !S2.on; note2(); });

/* ================================================================
   场景 3：失压保护
   ================================================================ */
const S3 = { power:true, km:true, t:0, phase:'', spinL:0, spinR:0, msg:'' };
const st3 = new Stage('cv2', 360, 342);

function motorBlock(g, x, on, spin, label){
  EP.motor(g, x, 258, 20, {spin: on ? spin : 0});
  txt(g, on ? '在转' : '停着', x, 296, {sz:10.5, b:1, c: on ? C.ok : C.tx3});
  txt(g, label, x, 312, {sz:9, c:C.tx3});
}
/* 水平放的动合触点（控制回路里常见的画法）。closed 决定合不合。 */
function noC(g, x, y, closed, live){
  const w = 18, col = closed ? (live ? C.ok : C.tx2) : C.tx3;
  g.save(); g.strokeStyle = col; g.lineWidth = 2; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x-w/2-7, y); g.lineTo(x-w/2, y); g.stroke();
  g.beginPath(); g.moveTo(x+w/2, y); g.lineTo(x+w/2+7, y); g.stroke();
  g.translate(x-w/2, y); g.rotate(closed ? 0 : -0.5);
  g.beginPath(); g.moveTo(0,0); g.lineTo(w,0); g.stroke();
  g.restore();
}
/* 动断触点：同样的臂，末端多一小横杠（国标记号） */
function ncC(g, x, y, closed, live){
  noC(g, x, y, closed, live);
  const w = 18, col = closed ? (live ? C.ok : C.tx2) : C.tx3;
  g.save(); g.strokeStyle = col; g.lineWidth = 1.8; g.lineCap = 'round';
  g.translate(x-w/2, y); g.rotate(closed ? 0 : -0.5);
  g.beginPath(); g.moveTo(w, -6); g.lineTo(w, 6); g.stroke();
  g.restore();
}

function draw3(dt){
  const g = st3.g; st3.clear();

  /* 停电 → 复电的时序 */
  if(S3.phase === 'off'){
    S3.t -= dt;
    if(S3.t <= 0){ S3.power = true; S3.phase = 'back'; S3.t = 2.6; note3(); }
  }else if(S3.phase === 'back'){
    S3.t -= dt;
    if(S3.t <= 0){ S3.phase = ''; note3(); }
  }
  const leftOn  = S3.power;                 /* 闸刀一直合着，有电就转 */
  const rightOn = S3.power && S3.km;
  if(leftOn)  S3.spinL += dt*4.6;
  if(rightOn) S3.spinR += dt*4.6;

  /* 顶部电源条 */
  box(g, 20, 24, 320, 26, 6, S3.power ? C.okbg : C.errbg,
      S3.power ? C.ok : C.err, 1.3);
  txt(g, S3.power ? '电网：有电' : '电网：停电中…', 180, 37,
      {sz:11, b:1, c: S3.power ? C.ok : C.err});

  g.save(); g.strokeStyle = C.boxLine; g.lineWidth = 1;
  g.beginPath(); g.moveTo(176, 60); g.lineTo(176, 322); g.stroke(); g.restore();

  /* ---------- 左：闸刀开关直接控制 ---------- */
  txt(g, '闸刀开关直接控制', 92, 72, {sz:10.5, b:1, c:C.tx2});
  new Path([[92,90],[92,236]]).stroke(g, 2.6, C.wire);
  /* 闸刀竖着装（回路是竖的，横着画的话线会从开关身上穿过去） */
  g.save(); g.translate(92, 140); g.rotate(-Math.PI/2);
  EP.knife(g, 0, 0, true, {w:44});
  g.restore();
  txt(g, '一直合着', 128, 140, {sz:9, c:C.tx3, al:'left'});
  if(leftOn) EP.flow(g, new Path([[92,180],[92,236]]), {phase: S3.spinL*20, gap:34, kind:'cur'});
  motorBlock(g, 92, leftOn, S3.spinL, '有电就转');

  /* ---------- 右：接触器 + 起停按钮 ---------- */
  txt(g, '接触器 + 起停按钮', 264, 72, {sz:10.5, b:1, c:C.tx2});
  const live = S3.power, kmOn = rightOn;
  box(g, 188, 88, 156, 100, 6, C.box, C.boxLine, 1);
  const Y = 140;
  g.save(); g.strokeStyle = live ? C.tx2 : C.tx3; g.lineWidth = 2; g.lineCap = 'round';
  g.beginPath(); g.moveTo(198, Y); g.lineTo(206, Y); g.stroke();       /* L 进 */
  g.beginPath(); g.moveTo(237, Y); g.lineTo(244, Y); g.stroke();
  /* 并联段的两条支路 */
  g.beginPath(); g.moveTo(244, Y); g.lineTo(244, 118); g.lineTo(250, 118); g.stroke();
  g.beginPath(); g.moveTo(244, Y); g.lineTo(244, 162); g.lineTo(250, 162); g.stroke();
  g.beginPath(); g.moveTo(286, 118); g.lineTo(292, 118); g.lineTo(292, Y); g.stroke();
  g.beginPath(); g.moveTo(286, 162); g.lineTo(292, 162); g.lineTo(292, Y); g.stroke();
  g.beginPath(); g.moveTo(292, Y); g.lineTo(300, Y); g.stroke();
  g.beginPath(); g.moveTo(328, Y); g.lineTo(336, Y); g.stroke();       /* N 出 */
  g.restore();
  txt(g, 'L', 196, 128, {sz:9, c:C.tx3});
  txt(g, 'N', 338, 128, {sz:9, c:C.tx3});
  ncC(g, 222, Y, true, live);           /* SB2 停止：动断按钮，没按就是通的 */
  txt(g, 'SB2 停止', 222, 122, {sz:8.5, c:C.tx3});
  noC(g, 268, 118, false, live);        /* SB1 起动：点动按钮，手一松就断 */
  txt(g, 'SB1 起动（松手就弹开）', 268, 102, {sz:8.5, c:C.tx3});
  noC(g, 268, 162, kmOn, live);         /* KM-1 自锁触点 */
  txt(g, 'KM-1 自锁', 268, 178, {sz:8.5, b:1, c: kmOn ? C.acc : C.tx3});
  box(g, 300, 132, 28, 16, 3, kmOn ? C.accbg : C.box, kmOn ? C.acc : C.boxLine, 1.3);
  txt(g, 'KM', 314, 140, {sz:9, b:1, c: kmOn ? C.acc : C.tx3});
  txt(g, '线圈', 314, 156, {sz:8.5, c:C.tx3});

  /* 主触点 + 电动机 */
  new Path([[264,196],[264,236]]).stroke(g, 2.6, C.wire);
  g.save(); g.lineCap = 'round';
  g.translate(264, 200); g.rotate(kmOn ? 0 : -0.6);
  g.strokeStyle = EP.P.copperD; g.lineWidth = 5;
  g.beginPath(); g.moveTo(0,0); g.lineTo(0, 26); g.stroke();
  g.strokeStyle = EP.P.copper; g.lineWidth = 3;
  g.beginPath(); g.moveTo(0,0); g.lineTo(0, 26); g.stroke();
  g.restore();
  EP.terminal(g, 264, 200, 4); EP.terminal(g, 264, 226, 4);
  txt(g, '主触点', 300, 212, {sz:9, c:C.tx3, al:'left'});
  if(kmOn) EP.flow(g, new Path([[264,226],[264,236]]), {phase: S3.spinR*20, gap:34, kind:'cur'});
  motorBlock(g, 264, rightOn, S3.spinR, S3.km ? '线圈得电才转' : '线圈没电，不转');

  if(S3.msg) EP.chip(g, S3.msg, 180, 332, {sz:10, b:1, c: S3.power ? C.err : C.tx2});
}

function note3(){
  let h;
  if(!S3.power){
    S3.msg = '停电了，两台都停';
    h = '<div class="st">停电中</div>两边都停了 —— 到这里为止，两种接法看不出差别。'+
        '<b>差别在来电的那一刻。</b>';
  }else if(S3.phase === 'back'){
    S3.msg = '来电了！左边自己转起来了';
    h = '<div class="st bad">来电了 —— 左边那台自己转起来了</div>'+
        '闸刀开关一直合着，它<b>不知道刚才停过电</b>，电一来就通。'+
        '如果这会儿有人正把手伸在机器里，就出事了。<br>'+
        '右边那台<b>没动</b>：停电时接触器线圈失电、衔铁被弹簧顶开、'+
        '自锁触点 KM-1 也跟着断了。来电时线圈那一路是断的，'+
        '<b>必须有人重新按一次 SB1</b>。';
  }else if(S3.km){
    S3.msg = '';
    h = '<div class="st good">两台都在转</div>'+
        '左边：闸刀合着，直通。<br>'+
        '右边：按过 SB1 之后线圈得电，自锁触点 KM-1 闭合，替 SB1 把这条路保持住 —— '+
        '所以你早就松手了，它还在转。<br>'+
        '<span class="sub">现在点「⚡ 来一次停电」。</span>';
  }else{
    S3.msg = '';
    h = '<div class="st">右边停着，等人按起动</div>'+
        '接触器线圈没电，主触点断开。<b>它不会自己合上</b> —— '+
        '这既是「失压保护」，也是为什么每次来电都得有人去按一下起动按钮。<br>'+
        '<span class="sub">点「按 SB1 起动」把它开起来。</span>';
  }
  $('n2').innerHTML = h;
}
$('s3cut').addEventListener('click', function(){
  S3.power = false; S3.km = false; S3.phase = 'off'; S3.t = 1.6; note3();
});
$('s3start').addEventListener('click', function(){
  if(!S3.power) return;
  S3.km = true; S3.phase = ''; note3();
});
$('s3stop').addEventListener('click', function(){
  S3.km = false; S3.phase = ''; note3();
});

/* ================================================================
   场景 4：交流 / 直流 / 铭牌
   ================================================================ */
const S4 = { k:0, t:0 };
const st4 = new Stage('cv3', 360, 300);
const PLATE = [
  ['型号', 'CJX2-1210', '厂家的产品型号，换件时先抄这一行'],
  ['约定发热电流', '25 A', '触点长期能过的电流上限'],
  ['额定工作电流', '12 A / AC-3', 'AC-3 是「控制笼型电动机」这一类工况，选型看这一档'],
  ['线圈电压', 'AC 220 V 50Hz', '最要命的一个数：接错当场烧'],
  ['触点配置', '3 主 + 1 动合辅助', '辅助触点不够用要另加辅助触头组']
];

function draw4(dt){
  const g = st4.g; st4.clear();
  S4.t += dt;
  if(S4.k === 2){
    EP.heading(g, 20, 16, '接触器铭牌', '点上面的按钮换回结构图');
    box(g, 30, 34, 300, 236, 8, '#39424d', '#151a20', 1.4);
    box(g, 42, 44, 276, 30, 4, '#8b949e', '#5b6672', 1);
    txt(g, '交流接触器  AC CONTACTOR', 180, 59, {sz:11, b:1, c:'#1c222a'});
    PLATE.forEach(function(row, i){
      const y = 88 + i*36;
      const hot = (row[0] === '线圈电压');
      box(g, 42, y, 276, 30, 4, hot ? C.errbg : '#2b333c',
          hot ? C.err : '#4b535c', hot ? 1.6 : 1);
      txt(g, row[0], 52, y+10, {sz:9.5, c:C.tx3, al:'left'});
      txt(g, row[1], 52, y+22, {sz:11.5, b:1, c: hot ? C.err : '#e7ebf0', al:'left'});
      txt(g, row[2], 310, y+16, {sz:8.5, c:C.tx3, al:'right'});
    });
    txt(g, '（示例铭牌，具体数值以你手上那一个为准）', 180, 286, {sz:9, c:C.tx3});
    return;
  }

  const ac = (S4.k === 0);
  EP.heading(g, 20, 16, ac ? '交流接触器的铁芯' : '直流接触器的铁芯',
             ac ? '硅钢片叠 + 短路环' : '整块软铁 + 细长线圈');

  const cx = 150, y0 = 66;
  /* 铁芯 */
  const w = 96, h = 92, legW = 20;
  box(g, cx-w/2, y0+h-20, w, 20, 2, '#7c8590', '#4b535c', 1.2);
  [-w/2, -legW/2, w/2-legW].forEach(function(dx){
    box(g, cx+dx, y0, legW, h-20, 2, '#8b949e', '#4b535c', 1.2);
  });
  if(ac){
    /* 叠片纹理 */
    g.save(); g.globalAlpha = .45; g.strokeStyle = '#3a424b'; g.lineWidth = 1;
    for(let i=1;i<9;i++){
      const yy = y0 + (h-20)*i/9;
      [-w/2, -legW/2, w/2-legW].forEach(function(dx){
        g.beginPath(); g.moveTo(cx+dx, yy); g.lineTo(cx+dx+legW, yy); g.stroke();
      });
    }
    g.restore();
    /* 短路环：嵌在两根边柱的端面上 */
    [-w/2+4, w/2-legW+4].forEach(function(dx){
      box(g, cx+dx, y0, 11, 7, 2, EP.P.copper, EP.P.copperD, 1.2);
    });
    EP.callout(g, cx-w/2+9, y0+3, cx-w/2-14, y0-16, '短路环', '铜的，嵌在端面',
               {al:'right', color:EP.P.copper});
  }
  /* 线圈 */
  g.save();
  g.strokeStyle = EP.P.copper; g.lineWidth = ac ? 4.2 : 2.4;
  const n = ac ? 5 : 11, rx = ac ? 22 : 15;
  for(let i=0;i<n;i++){
    const yy = y0 + 16 + i*(ac ? 11 : 5.6);
    g.beginPath(); g.ellipse(cx, yy, rx, ac ? 5 : 3, 0, 0, EC.TAU); g.stroke();
  }
  g.restore();
  EP.callout(g, cx+rx, y0+40, cx+w/2+16, y0+40,
             ac ? '线圈：粗、少' : '线圈：细、多', ac ? '扁平' : '细长',
             {al:'left'});

  /* 吸力波形：交流的会过零，加了短路环就不过零 */
  const bw = 300, bx = 30, by = 200, bh = 76;
  box(g, bx, by, bw, bh, 6, C.box, C.boxLine, 1);
  txt(g, ac ? '电磁吸力随时间的样子' : '直流：吸力是恒定的一条直线',
      180, by-8, {sz:9.5, c:C.tx3});
  g.save();
  g.strokeStyle = C.boxLine; g.lineWidth = 1;
  g.beginPath(); g.moveTo(bx, by+bh-8); g.lineTo(bx+bw, by+bh-8); g.stroke();
  g.restore();
  g.save(); g.lineJoin='round'; g.lineWidth = 2;
  if(ac){
    /* 只有主磁通：F ∝ sin²，每周两次到零 */
    g.strokeStyle = C.tx3; g.setLineDash([4,3]);
    g.beginPath();
    for(let i=0;i<=120;i++){
      const t = i/120, ph = t*Math.PI*4;
      const v = Math.sin(ph)*Math.sin(ph);
      const px = bx + bw*t, py = by+bh-8 - v*(bh-20);
      i ? g.lineTo(px,py) : g.moveTo(px,py);
    }
    g.stroke(); g.setLineDash([]);
    /* 加短路环之后：两个错相的磁通叠加，谷底抬起来了 */
    g.strokeStyle = C.acc;
    g.beginPath();
    for(let i=0;i<=120;i++){
      const t = i/120, ph = t*Math.PI*4;
      const a = Math.sin(ph)*Math.sin(ph), b = Math.sin(ph-1.1)*Math.sin(ph-1.1);
      const v = (a*0.62 + b*0.5);
      const px = bx + bw*t, py = by+bh-8 - v*(bh-20);
      i ? g.lineTo(px,py) : g.moveTo(px,py);
    }
    g.stroke();
  }else{
    g.strokeStyle = C.acc;
    g.beginPath(); g.moveTo(bx+6, by+22); g.lineTo(bx+bw-6, by+22); g.stroke();
  }
  g.restore();
  if(ac){
    EP.legend(g, 180, by+bh+12, [['没有短路环：每秒 100 次掉到零', C.tx3, 'bar'],
                                 ['有短路环：不再过零', C.acc, 'bar']]);
  }
}
function setK4(k){
  S4.k = k;
  document.querySelectorAll('#s4p .btn').forEach(function(b){ b.classList.toggle('on', +b.dataset.k===k); });
  note4();
}
document.getElementById('s4p').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(b) setK4(+b.dataset.k);
});
function note4(){
  const m = [
    ['交流接触器：为什么铁芯要叠、端面要嵌一个铜环',
     '<b>叠片</b>：交流磁通一直在变，整块铁里会感应出打转的涡流，白白发热。'+
     '切成一片片、片间刷绝缘漆，涡流的路被切断了。<br>'+
     '<b>短路环</b>：交流吸力每秒有 100 次掉到零（灰色虚线），衔铁就会跟着抖、发出嗡嗡声。'+
     '短路环里感应出的电流产生一个<b>相位错开</b>的磁通，两者的吸力峰谷错开，'+
     '合成的那条蓝线<b>再也不过零</b> —— 安静了。'],
    ['直流接触器：没有那两个麻烦',
     '直流磁通不变，<b>没有涡流</b>，铁芯可以是整块软铁；'+
     '<b>吸力恒定</b>，不会抖，也就不需要短路环。<br>'+
     '代价在别处：直流没有「电流过零」这个天然灭弧时机，'+
     '<b>断开时的电弧比交流难灭得多</b>，所以直流接触器的灭弧装置往往做得更讲究。<br>'+
     '<span class="sub">线圈匝数多、线细，也是因为直流下没有感抗，全靠导线电阻限流。</span>'],
    ['铭牌上这五行，够你换一个件了',
     '<b>红色那一行是线圈电压</b>，接错当场烧，换件前一定先抄下来。<br>'+
     '「约定发热电流」和「额定工作电流」是两个数：前者是触点长期能过的上限，'+
     '后者按<b>工况类别</b>给 —— 控制电动机看 <b>AC-3</b> 那一档。'+
     '同一个接触器控制电阻炉（AC-1）能过的电流比控制电动机（AC-3）大，'+
     '因为电动机起动电流是额定的好几倍。<br>'+
     '<span class="sub">辅助触点不够用时不用换整个接触器，加一个「辅助触头组」卡上去就行。</span>']
  ][S4.k];
  $('n3').innerHTML = '<div class="st">'+m[0]+'</div>'+m[1];
}

/* ================================================================
   绑定
   ================================================================ */
function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:2, sec:'2.2'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('2.2');
  let h = '';
  h += nb.prev ? '<a href="'+nb.prev.f+'">‹ '+nb.prev.id+' '+nb.prev.t+'</a>'
               : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next ? '<a class="next" href="'+nb.next.f+'">'+nb.next.id+' '+nb.next.t+' ›</a>'
               : '<span>已经是最后一节</span>';
  $('pager').innerHTML = h;
})();

loop(function(dt){
  if(cur === 0) draw1(dt);
  else if(cur === 1) draw2(dt);
  else if(cur === 2) draw3(dt);
  else draw4(dt);
});
  }
});
})();
