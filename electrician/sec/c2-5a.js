/* 2.5 电子元器件（上）—— 本节内容的唯一真相。
   book.html 按需载入它；c2-5a.html 是薄壳，也载入它。
   对应《零基础学电工》第 2 章 2.5 节前半（书内 P30~P36）：电阻器、电容器、电感器。 */
(function(){
'use strict';
ELEC.reg({
  id: '2.5a',
  file: 'c2-5a.html',
  title: '2.5 电子元器件（上）',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>电阻·读色环</button>
    <button class="tab" data-i="1"><span class="n">2</span>电容·充放电</button>
    <button class="tab" data-i="2"><span class="n">3</span>电感·反电动势</button>
    <button class="tab" data-i="3"><span class="n">4</span>符号·怎么量</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">电阻器：认它的第一件事是读出多少欧</div>
    小电阻上印不下字，就用<b>色环</b>把阻值涂在身上。
    <b>下面四个下拉框换一换颜色，看阻值怎么变。</b>
    读法就一句：前两环是数字，第三环是后面添几个零，第四环是允许差多少。
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1sel"></div>
      <div class="btns">
        <button class="btn" id="s1rnd">随机出一只</button>
        <button class="btn" id="s1k">调成 1 kΩ</button>
        <button class="btn sm" id="s1m">4.7 kΩ</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">读出来<br>是多少</div><div class="v" id="s1a">1 kΩ</div></div>
        <div class="num"><div class="k">允许<br>差多少</div><div class="v" id="s1b">±5%</div></div>
        <div class="num hi"><div class="k">实际可能<br>在这个区间</div><div class="v" id="s1c">950~1050 Ω</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">四环怎么读（最常见的一种）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>第几环</th><th>它说什么</th><th>例：棕 黑 红 金</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">第 1 环</td><td>十位数字</td><td>棕 = 1</td></tr>
        <tr><td class="eu-s">第 2 环</td><td>个位数字</td><td>黑 = 0</td></tr>
        <tr><td class="eu-s">第 3 环</td><td><b>后面添几个零</b>（倍率）</td><td>红 = 添 2 个零</td></tr>
        <tr><td class="eu-s">第 4 环</td><td>允许差多少（误差）</td><td>金 = ±5%</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>先分清哪头是第 1 环</b>：误差环（金 / 银）离另外三环<b>远一点</b>，而且它一定在末尾。
      把金色或银色那一头朝右，从左往右读就对了。<br>
      <span class="sub">五环的是精密电阻：<b>前三环是数字</b>、第四环倍率、第五环误差，
      多出来的那一位是为了表示 4.75 kΩ 这种带小数的值。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">除了阻值，选件还要看两个数</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>怎么回事</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">额定功率</td><td>它一秒能安全散掉多少热（1/4 W、1/2 W、1 W、5 W…）。<b>算出来 P = I²R 超了就会烧</b>，选件一般留一倍余量</td></tr>
        <tr><td class="eu-s">类型</td><td>碳膜（便宜）、金属膜（准、噪声小）、<b>线绕 / 水泥（能扛大功率）</b>、可调（电位器）</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>电阻烧掉之后色环会被烤糊，读不出来了。</b>这时候别猜 ——
      找同一块板上对称位置的那一只、或者看板子上的丝印（R12 旁边常印着阻值），
      再不行查图纸。<b>换错阻值比不换更糟。</b>
    </div>
  </div>

  <div class="bet" data-bet="c25a-band" data-q="一只电阻的色环是「红 红 棕 金」。它是多少欧？"
       data-opts="22 Ω|220 Ω|2.2 kΩ" data-right="1"
       data-after="220 Ω。红=2、红=2 → 22；棕=添 1 个零 → 220；金 = ±5%。上面那只电阻现在就调成这个给你看。"></div>
</section>

<!-- ================= 场景 2：电容 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">电容器：一个能存电的小水池</div>
    它<b>不导直流</b>，但充电、放电的那一下有电流。
    <b>点「充电」，盯住下面那两条曲线</b> —— 电压慢慢爬、电流却是一上来最大然后掉下去。
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2m">
        <button class="btn big" data-k="1">充电</button>
        <button class="btn" data-k="2">放电</button>
        <button class="btn sm" data-k="0">断开</button>
      </div>
      <div class="rowlab">电阻 R　<b id="s2rlab">22 kΩ</b></div>
      <input type="range" id="s2r" min="2" max="100" step="2" value="22">
      <div class="rowlab" style="margin-top:6px">电容 C　<b id="s2clab">100 μF</b></div>
      <input type="range" id="s2c" min="10" max="470" step="10" value="100">
      <div class="nums three">
        <div class="num"><div class="k">时间常数<br>τ = R×C</div><div class="v" id="s2a">2.2 s</div></div>
        <div class="num"><div class="k">电容电压<br>Uc</div><div class="v" id="s2b">0.0 V</div></div>
        <div class="num hi"><div class="k">充满还要<br>多久</div><div class="v" id="s2c2">11 s</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">一句话记住它的脾气</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>怎么回事</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">隔直通交</td><td>直流稳定之后一点电流都不过；交流一直在变，它就一直在充放电，看起来「能通过」</td></tr>
        <tr><td class="eu-s">电压不能突变</td><td>要改变它两端的电压，必须先搬电荷进去或出来，<b>而搬电荷要时间</b></td></tr>
        <tr><td class="eu-s">τ = R × C</td><td>时间常数。<b>经过 1 个 τ 充到 63%，5 个 τ 基本就满了</b>（99.3%）</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>为什么电流是「一上来最大、然后掉下去」：</b>
      刚合上的那一刻电容还是空的、两端电压是 0，整个电源电压全加在电阻上，
      所以电流 = E ÷ R，最大。充着充着电容电压升上来，加在电阻上的就少了，电流跟着掉。
      <span class="sub">这也是为什么<b>大电容的设备开机瞬间电流很大</b>（浪涌）——
      2.4 节讲 NTC 时提过一句，抑制的就是这个。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">上手最要紧的一条：断了电，电容里还有电</div>
    变频器、开关电源、电容补偿柜里都有大电容。<b>断电之后它还带着几百伏，
    直接上手会被打，严重的会伤人。</b>
    <div class="tip" style="margin-top:8px">
      <b>规矩是：断电 → 等（看设备标的放电时间，常见 5~10 分钟）→ 验电 → 必要时用放电棒放电 → 再动手。</b>
      设备上那句「Wait 10 minutes / 断电后等 10 分钟」不是客套。<br>
      <b>不要拿螺丝刀直接短接放电</b> —— 大电容那一下能把刀口打出坑、火花伤眼，
      要用带电阻的专用放电棒。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">选件看三个数</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>说明</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">容量</td><td>pF → nF → μF → F，<b>每档差 1000 倍</b>。1 μF = 1000 nF = 1000000 pF</td></tr>
        <tr><td class="eu-s">耐压</td><td><b>必须高于实际工作电压</b>，一般留 1.5~2 倍余量。超压会击穿，电解电容会鼓包甚至炸</td></tr>
        <tr><td class="eu-s">极性</td><td><b>电解电容分正负</b>（外壳上那条带「−」的银条是负极），接反会鼓包爆浆。瓷片、涤纶这些无极性</td></tr>
      </tbody>
    </table></div>
  </div>

  <div class="bet" data-bet="c25a-cap" data-q="τ = 2 秒的 RC 电路，从零开始充电。2 秒之后电容电压大约到了电源电压的百分之多少？"
       data-opts="100%|63%|50%" data-right="1"
       data-after="63%。这就是「时间常数」的定义：一个 τ 充到 63%（准确说是 1−1/e）。再一个 τ 补上剩下的 63%，如此下去——5 个 τ 到 99.3%，工程上就当充满了。"></div>
</section>

<!-- ================= 场景 3：电感 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">电感器：一根绕成圈的导线，脾气跟电容正好相反</div>
    电容是「电压不能突变」，电感是「<b>电流不能突变</b>」。
    <b>先合闸看电流怎么慢慢爬起来，再断闸 —— 盯住线圈两端那个电压。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns">
        <button class="btn big" id="s3sw">合闸</button>
      </div>
      <label class="chk"><input type="checkbox" id="s3d">线圈两端并一只续流二极管</label>
      <div class="rowlab">电感 L　<b id="s3llab">2.0 H</b>　（回路电阻固定 2 Ω）</div>
      <input type="range" id="s3l" min="5" max="50" step="1" value="20">
      <div class="ticks"><span>0.5 H</span><span>5 H</span></div>
      <div class="nums three">
        <div class="num"><div class="k">时间常数<br>τ = L÷R</div><div class="v" id="s3a">1.0 s</div></div>
        <div class="num"><div class="k">现在的<br>电流</div><div class="v" id="s3b">0.0 A</div></div>
        <div class="num hi"><div class="k">线圈两端<br>电压</div><div class="v" id="s3c">0 V</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">通直阻交，和电容正好反过来</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>电容 C</th><th>电感 L</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">不能突变的是</td><td><b>电压</b></td><td><b>电流</b></td></tr>
        <tr><td class="eu-s">对直流</td><td>隔断（充满就没电流了）</td><td>畅通（就是一根导线）</td></tr>
        <tr><td class="eu-s">对交流</td><td>频率越高越容易过</td><td>频率越高越难过</td></tr>
        <tr><td class="eu-s">时间常数</td><td>τ = R × C</td><td>τ = L ÷ R</td></tr>
        <tr><td class="eu-s">存能量在</td><td>电场里</td><td>磁场里</td></tr>
      </tbody>
    </table></div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">断电那一下的高压，是电工每天都在跟它打交道的东西</div>
    电感<b>拼命想维持原来的电流</b>。你一断闸，电流被强行切断，
    它就在自己两端顶出一个<b>反向的高电压</b>（自感电动势 e = −L·di/dt）——
    断得越快，顶得越高，几百伏是常事。
    <div class="tip" style="margin-top:8px">
      <b>这一条解释了三件你已经见过的事：</b><br>
      ① <b>接触器、继电器断开时触点会拉弧</b>（1.6 节和 2.2 节讲过）——
      那个电弧就是被这个高压点着的，也是触点烧蚀的主要原因；<br>
      ② 所以控制回路里<b>继电器线圈两端要并吸收元件</b>：直流用<b>续流二极管</b>，
      交流用 RC 阻容吸收；<br>
      ③ <b>拔线圈的插头前先断电</b>，不然那一下高压可能打到你或者打坏 PLC 输出点。
      <span class="sub">上面那个勾选框打开，看尖峰是怎么被二极管吃掉的。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">现场见到的电感长什么样</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>在哪</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">空心线圈</td><td>高频电路、滤波</td></tr>
        <tr><td class="eu-s">带铁芯</td><td><b>加了铁芯电感量大很多</b>（1.6 节讲过）—— 接触器线圈、变压器、扼流圈</td></tr>
        <tr><td class="eu-s">电抗器</td><td>变频器进出线上那个大铁疙瘩，用来抑制谐波和电流冲击</td></tr>
        <tr><td class="eu-s">镇流器</td><td>老式日光灯上那个会嗡嗡响的铁盒子，就是一个电感</td></tr>
      </tbody>
    </table></div>
  </div>

  <div class="bet" data-bet="c25a-ind" data-q="控制柜里一只直流继电器，线圈两端并了一只二极管。这只二极管是干什么的？"
       data-opts="整流，把交流变直流|吃掉断电瞬间的反电动势，保护触点和 PLC 输出|限流，防止线圈烧掉" data-right="1"
       data-after="吃掉反电动势。它叫续流二极管：平时反着接、不导通；线圈一断电，自感电动势方向反过来，正好把二极管打通，电流在「线圈+二极管」这个小圈里慢慢耗掉，尖峰就没了。接的时候方向不能反——反了就是把电源短路。"></div>
</section>

<!-- ================= 场景 4：符号与万用表 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">图上认得出，手上量得了</div>
    这一屏两件事：<b>三种元件的标准符号</b>，和<b>拿万用表怎么判断它好不好</b>。
    挨个点一遍。
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4p">
        <button class="btn on" data-k="0">电阻 R</button>
        <button class="btn" data-k="1">电容 C</button>
        <button class="btn" data-k="2">电感 L</button>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">量之前，这三条先记死</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>为什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">必须断电</td><td>电阻档、电容档都是<b>表自己往外送电</b>的。带电测量轻则读数全错，重则烧表</td></tr>
        <tr><td class="eu-s">大电容先放电</td><td>它存着电，直接接表可能<b>把表打坏</b>。先按上一屏那套规矩放干净</td></tr>
        <tr><td class="eu-s">在路测不准</td><td>元件焊在板上时，旁边并联的东西会一起被量进去。<b>拿不准就拆一条腿</b>再量</td></tr>
      </tbody>
    </table></div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">怎么判断好坏</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>用什么档</th><th>好的应该是</th><th>坏了会是</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">电阻</td><td>电阻档 Ω</td><td>跟标称值差在误差范围内</td><td>读数无穷大（断了）／差很多（变值）</td></tr>
        <tr><td class="eu-s">电容</td><td>电容档 F<br>（没有就用电阻档看趋势）</td><td>容量接近标称；电阻档能看到<b>读数从小往大爬</b>（充电过程）</td><td>一直是 0 Ω（击穿短路）／一上来就无穷大且不变（开路、干了）</td></tr>
        <tr><td class="eu-s">电感</td><td>电阻档 Ω</td><td><b>一个很小的电阻</b>（几欧到几十欧，就是铜线本身的电阻）</td><td>无穷大（线断了）／几乎 0 Ω 且发烫（匝间短路）</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>「电感量得出一个小电阻」这条最容易搞错。</b>
      很多人量接触器线圈，看到只有几十欧就以为短路了 —— 不是，
      <b>那本来就是铜线的直流电阻</b>。线圈靠的是交流下的感抗，直流电阻本来就小。
      <span class="sub">判断线圈好坏要跟<b>同型号的另一只</b>比，或者查产品手册上的线圈电阻值。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="c2-5a">
    <div class="qz" data-q="色环「棕 黑 红 金」的电阻是多少？"
         data-opts="10 Ω|100 Ω|1 kΩ"
         data-right="2"
         data-why="1 kΩ。棕=1、黑=0 → 10；红=添 2 个零 → 1000 Ω = 1 kΩ；金 = ±5% 误差。读的时候把金/银那一头朝右。"></div>
    <div class="qz" data-q="RC 电路的时间常数 τ = 2 秒。大约多久电容才算充满？"
         data-opts="2 秒|5 秒|10 秒"
         data-right="2"
         data-why="约 5 个 τ，也就是 10 秒（到 99.3%）。一个 τ 只充到 63%。这个「5τ」是工程上通用的估算，判断设备放电要等多久也用它。"></div>
    <div class="qz" data-q="直流继电器线圈两端为什么要并一只续流二极管？"
         data-opts="给线圈整流|吃掉断电瞬间的自感电动势，保护触点和输出器件|提高线圈的吸合力"
         data-right="1"
         data-why="吃掉反电动势。电感断电时会顶出几百伏的反向高压，会烧触点、打坏 PLC 输出。二极管平时反接不导通，断电那一刻正好被打通，让电流在小回路里耗掉。交流回路不能用二极管，要用 RC 阻容吸收。"></div>
    <div class="qz" data-q="用万用表电阻档量一只交流接触器线圈，读数是 40 Ω 左右。这说明什么？"
         data-opts="线圈短路了|多半是正常的，那是铜线的直流电阻|线圈断了"
         data-right="1"
         data-why="多半正常。线圈的直流电阻本来就只有几十欧——它靠的是交流下的感抗，不是直流电阻。断了会是无穷大，匝间短路会明显偏小并且通电发烫。判断要跟同型号的另一只比，或查手册。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 2 章 2.5 节前半（书内 P30~P36）<br>下一节讲二极管、晶体管、场效应管、晶闸管</div>
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

/* ================================================================
   场景 1：读色环
   ================================================================ */
const COL = [
  {n:'黑', v:0, c:EP.BAND[0], tol:null},
  {n:'棕', v:1, c:EP.BAND[1], tol:1},
  {n:'红', v:2, c:EP.BAND[2], tol:2},
  {n:'橙', v:3, c:EP.BAND[3], tol:null},
  {n:'黄', v:4, c:EP.BAND[4], tol:null},
  {n:'绿', v:5, c:EP.BAND[5], tol:0.5},
  {n:'蓝', v:6, c:EP.BAND[6], tol:0.25},
  {n:'紫', v:7, c:EP.BAND[7], tol:0.1},
  {n:'灰', v:8, c:EP.BAND[8], tol:null},
  {n:'白', v:9, c:EP.BAND[9], tol:null},
  {n:'金', v:-1, c:EP.BAND.gold,   tol:5},
  {n:'银', v:-2, c:EP.BAND.silver, tol:10}
];
const S1 = { b:[1,0,2,10] };           /* 默认棕黑红金 = 1 kΩ ±5% */
const st1 = new Stage('cv0', 360, 306);

function ohm(){
  const d = COL[S1.b[0]].v*10 + COL[S1.b[1]].v;
  return d * Math.pow(10, COL[S1.b[2]].v);
}
function fmtR(r){
  if(r >= 1e6) return (r/1e6 >= 10 ? (r/1e6).toFixed(0) : (r/1e6).toFixed(1)) + ' MΩ';
  if(r >= 1e3) return (r/1e3 >= 10 ? (r/1e3).toFixed(0) : (r/1e3).toFixed(1)) + ' kΩ';
  return (r >= 10 ? r.toFixed(0) : r.toFixed(1)) + ' Ω';
}
function tolOf(){ return COL[S1.b[3]].tol; }
/* 区间要用**同一个单位**写，950 Ω ~ 1.1 kΩ 这种混着写既难比也会把数字卡撑成两行 */
function rangeText(R, tol){
  const lo = R*(1-tol/100), hi = R*(1+tol/100);
  const u = R >= 1e6 ? ['MΩ', 1e6] : (R >= 1e3 ? ['kΩ', 1e3] : ['Ω', 1]);
  const f = function(v){ const x = v/u[1]; return x >= 100 ? x.toFixed(0) : x.toFixed(x >= 10 ? 1 : 2); };
  return f(lo) + ' ~ ' + f(hi) + ' ' + u[0];
}

function draw1(){
  const g = st1.g; st1.clear();
  EP.heading(g, 20, 16, '色环电阻', '（把金 / 银那一头朝右，从左往右读）');
  const bands = S1.b.map(function(i){ return COL[i].c; });
  EP.resistor(g, 180, 70, {len:206, dia:56, bands:bands, wide:true});

  /* 逐环解读：色块 → 它代表什么 */
  const BX = [70, 130, 190, 250];
  const cap = ['第1环', '第2环', '第3环', '第4环'];
  const mean = [
    String(COL[S1.b[0]].v),
    String(COL[S1.b[1]].v),
    COL[S1.b[2]].v >= 0 ? '添 ' + COL[S1.b[2]].v + ' 个零' : '×' + Math.pow(10, COL[S1.b[2]].v),
    tolOf() != null ? '±' + tolOf() + '%' : '（不能当误差环）'
  ];
  BX.forEach(function(x, i){
    txt(g, cap[i], x, 118, {sz:9, c:C.tx3});
    box(g, x-20, 126, 40, 18, 4, COL[S1.b[i]].c, C.boxLine, 1);
    txt(g, COL[S1.b[i]].n, x, 154, {sz:10.5, b:1, c:C.tx2});
    txt(g, mean[i], x, 170, {sz:9.5, c: i===3 ? C.warn : C.acc});
  });

  /* 结果 */
  const R = ohm(), tl = tolOf();
  box(g, 20, 184, 320, 34, 6, C.accbg, C.acc, 1.4);
  txt(g, fmtR(R) + (tl != null ? '　±' + tl + '%' : ''), 180, 201,
      {sz:15, b:1, c:C.acc});

  /* 颜色对照表：两行六列，正在用的那几个描一圈 */
  txt(g, '颜色 → 数字（前两环用）', 24, 232, {sz:9, c:C.tx3, al:'left'});
  COL.forEach(function(c, i){
    const cx = 30 + (i%6)*54, cy = 244 + Math.floor(i/6)*30;
    box(g, cx, cy, 46, 22, 4, c.c, C.boxLine, 1);
    const used = S1.b.indexOf(i) >= 0;
    if(used){
      g.save(); g.strokeStyle = C.acc; g.lineWidth = 2;
      EP.rr(g, cx-2, cy-2, 50, 26, 6); g.stroke(); g.restore();
    }
    /* 深色的色块上写白字、浅色的写黑字 —— 白/银/金上写白字看不见 */
    const light = (i === 9 || i === 10 || i === 11 || i === 8 || i === 4);
    txt(g, c.n + (c.v >= 0 ? ' ' + c.v : ''), cx+23, cy+11,
        {sz:9.5, b:1, c: light ? '#1b1f24' : '#f2f5f8'});
  });
}

function note1(){
  const R = ohm(), tl = tolOf();
  $('s1a').textContent = fmtR(R);
  $('s1b').textContent = tl != null ? '±' + tl + '%' : '不合法';
  $('s1c').textContent = (tl != null && R > 0) ? rangeText(R, tl) : '—';
  const names = S1.b.map(function(i){ return COL[i].n; }).join(' ');
  $('n0').innerHTML = '<div class="st">' + names + ' → ' + fmtR(R) +
      (tl != null ? '（±' + tl + '%）' : '') + '</div>' +
    '读法一步一步来：<b>' + COL[S1.b[0]].n + ' = ' + COL[S1.b[0]].v + '</b>、'+
    '<b>' + COL[S1.b[1]].n + ' = ' + COL[S1.b[1]].v + '</b> → 两位数字凑成 <b>' +
    (COL[S1.b[0]].v*10 + COL[S1.b[1]].v) + '</b>；' +
    '第 3 环 <b>' + COL[S1.b[2]].n + '</b> 说' +
    (COL[S1.b[2]].v >= 0 ? '后面添 <b>' + COL[S1.b[2]].v + '</b> 个零'
                         : '要除以 <b>' + Math.pow(10, -COL[S1.b[2]].v) + '</b>') +
    ' → <span class="key">' + fmtR(R) + '</span>。<br>' +
    (tl != null
      ? '第 4 环 <b>' + COL[S1.b[3]].n + '</b> 是误差 <b>±' + tl + '%</b> —— '+
        '意思是这只电阻实际可能在 <b>' + rangeText(R, tl) +
        '</b> 之间，<b>量出来在这个区间里就是好的</b>，不用怀疑。'
      : '<b>第 4 环选了「' + COL[S1.b[3]].n + '」，但这个颜色不表示误差</b> —— '+
        '常见的误差环只有金(±5%)、银(±10%)、棕(±1%)、红(±2%) 这几种。'+
        '真在实物上看到这种组合，多半是你把方向读反了，把第 1 环当成第 4 环了。') +
    '<span class="sub">拿不准哪头是第 1 环？<b>误差环离另外三环远一点</b>，把它朝右。</span>';
}
/* 四个下拉：改任意一个立刻重算 */
(function(){
  const host = document.getElementById('s1sel');
  const opts = COL.map(function(c, i){ return '<option value="'+i+'">'+c.n+'</option>'; }).join('');
  host.innerHTML = [0,1,2,3].map(function(i){
    return '<label class="rowlab" style="flex:1 1 0;min-width:0;margin:0">第'+(i+1)+'环'+
      '<select data-i="'+i+'" style="width:100%;min-height:38px;margin-top:3px;'+
      'border-radius:8px;padding:4px 6px;font:inherit;'+
      'background:var(--card2);color:var(--tx);border:1px solid var(--line)">'+opts+'</select></label>';
  }).join('');
  host.addEventListener('change', function(e){
    const s = e.target.closest('select'); if(!s) return;
    S1.b[+s.dataset.i] = +s.value; note1(); draw1();
  });
})();
function syncSel(){
  document.querySelectorAll('#s1sel select').forEach(function(s){
    s.value = S1.b[+s.dataset.i];
  });
}
function setBands(a){ S1.b = a.slice(); syncSel(); note1(); draw1(); }
$('s1rnd').addEventListener('click', function(){
  /* 只从合法的组合里随机：前两环用 0~9，倍率 0~5，误差环只给金/银/棕/红 */
  const tolIdx = [10, 11, 1, 2];
  setBands([1 + Math.floor(Math.random()*9), Math.floor(Math.random()*10),
            Math.floor(Math.random()*6), tolIdx[Math.floor(Math.random()*4)]]);
});
$('s1k').addEventListener('click', function(){ setBands([1,0,2,10]); });
$('s1m').addEventListener('click', function(){ setBands([4,7,1,10]); });

/* ================================================================
   场景 2：电容充放电
   ================================================================
   一阶 RC：充电 dUc/dt = (E−Uc)/(RC)，放电 dUc/dt = −Uc/(RC)。
   E 取 12 V。τ = R·C，5τ 到 99.3% —— 文案里那个「5 个 τ」就是这么来的。 */
const EC_E = 12;
const S2 = { mode:0, R:22000, C:100e-6, uc:0, buf:[], lastUc:'' };
const st2 = new Stage('cv1', 360, 340);

function draw2(dt){
  const g = st2.g; st2.clear();
  const tau = S2.R * S2.C;
  /* 推进电压。dt 封顶，切页回来时别一帧跳过去一大截 */
  const d = Math.min(dt, 0.05);
  let i = 0;
  if(S2.mode === 1){ S2.uc += (EC_E - S2.uc)/tau * d; i = (EC_E - S2.uc)/S2.R; }
  else if(S2.mode === 2){ S2.uc += (-S2.uc)/tau * d; i = -S2.uc/S2.R; }
  if(S2.uc < 0) S2.uc = 0;
  S2.buf.push([S2.uc, i*1000]);
  if(S2.buf.length > 240) S2.buf.shift();
  const ucTxt = S2.uc.toFixed(1) + ' V';
  if(ucTxt !== S2.lastUc){ S2.lastUc = ucTxt; $('s2b').textContent = ucTxt; }

  EP.heading(g, 20, 16, '充放电回路', 'E = 12 V');
  /* ---- 电路 ---- */
  const Y = 56, YB = 140, XL = 46, XR = 288;
  g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.6; g.lineCap='round';
  g.beginPath(); g.moveTo(XL, 82); g.lineTo(XL, Y); g.lineTo(XR, Y); g.stroke();
  g.beginPath(); g.moveTo(XR, 112); g.lineTo(XR, YB); g.lineTo(XL, YB); g.lineTo(XL, 108); g.stroke();
  g.restore();
  EC.battery(g, XL, 95, {horiz:false, long:20, short:11, gap:10, pm:false});
  txt(g, '＋', XL-13, 84, {sz:11, b:1, c:C.err, al:'right'});
  txt(g, '−',  XL-13, 106, {sz:13, b:1, c:C.tx2, al:'right'});
  txt(g, '12 V', XL+13, 95, {sz:10, b:1, c:C.tx2, al:'left'});
  EC.switchSym(g, 120, Y, S2.mode !== 0, {len:32});
  txt(g, S2.mode === 0 ? '断开' : (S2.mode === 1 ? '充电' : '放电'), 120, Y-16,
      {sz:10, b:1, c: S2.mode === 0 ? C.tx3 : (S2.mode === 1 ? C.ok : C.warn)});
  EC.resistor(g, 210, Y, {horiz:true, len:40, w:15});
  txt(g, 'R = ' + (S2.R/1000).toFixed(0) + ' kΩ', 210, Y-18, {sz:10, b:1, c:C.tx2});
  /* 电容符号：两条平行短线 */
  g.save(); g.strokeStyle = C.wire; g.lineWidth = 3; g.lineCap='butt';
  g.beginPath(); g.moveTo(XR-15, 94); g.lineTo(XR+15, 94); g.stroke();
  g.beginPath(); g.moveTo(XR-15, 102); g.lineTo(XR+15, 102); g.stroke();
  g.restore();
  /* 两行都摆到电容**左边**：放右边会顶出画布，放正下方会被那根竖导线穿过去 */
  txt(g, 'Uc = ' + S2.uc.toFixed(2) + ' V', XR-22, 88, {sz:11, b:1, c:C.acc, al:'right'});
  txt(g, 'C = ' + Math.round(S2.C*1e6) + ' μF', XR-22, 108, {sz:10, b:1, c:C.tx2, al:'right'});
  if(S2.mode !== 0 && Math.abs(i) > 1e-9){
    const p = S2.mode === 1
      ? new Path([[XL,82],[XL,Y],[XR,Y],[XR,94]])
      : new Path([[XR,102],[XR,YB],[XL,YB],[XL,108]]);
    EP.flow(g, p, {phase:(Date.now()/16)%1000, gap:46, kind:'cur', size:5});
  }

  /* ---- 走纸图 ---- */
  EC.strip(g, 24, 172, 312, 104, S2.buf,
    [{i:0, color:C.acc, scale:1/(EC_E*1.1)},
     {i:1, color:C.cur, auto:true, floor:0.05}], {n:240});
  EC.stripLegend(g, 32, 288, [['电容电压 Uc', C.acc], ['电流 i', C.cur]]);

  const pct = S2.uc/EC_E*100;
  box(g, 20, 302, 320, 30, 6, C.box, C.boxLine, 1);
  txt(g, 'τ = R×C = ' + tau.toFixed(2) + ' s　·　已充到 ' + pct.toFixed(0) +
        '%　·　充满约需 ' + (5*tau).toFixed(1) + ' s',
      180, 317, {sz:10.5, b:1, c:C.tx2});
}
function note2(){
  const tau = S2.R*S2.C;
  $('s2rlab').textContent = (S2.R/1000).toFixed(0) + ' kΩ';
  $('s2clab').textContent = Math.round(S2.C*1e6) + ' μF';
  $('s2a').textContent = tau.toFixed(2) + ' s';
  $('s2c2').textContent = (5*tau).toFixed(1) + ' s';
  const m = S2.mode;
  $('n1').innerHTML = m === 1
    ? '<div class="st good">正在充电</div>'+
      '看那两条曲线：<b>蓝色（电压）从下往上爬，橙色（电流）一上来最大、然后一路掉。</b><br>'+
      '刚合上的一瞬间电容是空的，两端电压 0，<b>整个 12V 全落在电阻上</b>，'+
      '所以电流是最大的 '+(EC_E/S2.R*1000).toFixed(2)+' mA。'+
      '充着充着电容电压升起来，落在电阻上的就少了，电流跟着掉。<br>'+
      '<b>τ = R×C = '+tau.toFixed(2)+' 秒</b> —— 一个 τ 充到 63%，5 个 τ（约 '+
      (5*tau).toFixed(1)+' 秒）就当充满了。'+
      '<span class="sub">把 R 或 C 调大，τ 变大，整条曲线就变缓 —— 这两个数任意一个翻倍，时间就翻倍。</span>'
    : m === 2
    ? '<div class="st warn">正在放电</div>'+
      '电流<b>反过来流</b>（橙线掉到中线以下），电压往下掉，同样是 τ 决定快慢。<br>'+
      '<b>放电和充电是一样的时间尺度</b> —— 这就是设备上「断电后等 N 分钟」的由来：'+
      '厂家按最大的那个 τ 算好，再留足余量。<br>'+
      '<span class="sub">注意曲线是<b>越来越平</b>的：最后那一点点电压掉得非常慢，'+
      '所以「等一会儿就没电了」这种感觉靠不住，必须验电。</span>'
    : '<div class="st">开关断开，电容保持着现在的电压</div>'+
      '现在既不充也不放，<b>电容两端的电压就停在那儿不动</b>（理想情况下）。<br>'+
      '<b>这正是电容危险的地方</b>：设备断电了，它照样带着电，而且没有任何外在迹象。<br>'+
      '<span class="sub">点「充电」看它怎么涨起来，再点「放电」看它怎么掉下去。</span>';
}
document.getElementById('s2m').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S2.mode = +b.dataset.k;
  document.querySelectorAll('#s2m .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S2.mode);
  });
  note2();
});
$('s2r').addEventListener('input', function(){ S2.R = (+this.value)*1000; note2(); });
$('s2c').addEventListener('input', function(){ S2.C = (+this.value)*1e-6; note2(); });

/* ================================================================
   场景 3：电感通断电与反电动势
   ================================================================
   一阶 RL：合闸 di/dt = (E − i·R)/L，稳态 i = E/R。R 固定 2 Ω、E = 12 V → 稳态 6 A。
   断闸分两种：
   - 不加二极管：电流被强行切断，用一个很短的「弧时间」τa = 20 ms 模拟，
     UL = −L·di/dt 就冲到几百伏。**这是量级示意** ——
     真实数值取决于断开速度和杂散参数，几百伏是常见量级
   - 加续流二极管：电流在「线圈 + 二极管」小回路里按 τ = L/R 衰减，UL 被钳在约 −0.7 V */
const RL_R = 2, RL_E = 12, ARC_T = 0.02;
const S3 = { on:false, L:2, diode:false, i:0, uL:0, buf:[], peak:0, dirty:false, lastI:'', lastU:'' };
const st3 = new Stage('cv2', 360, 340);

function draw3(dt){
  const g = st3.g; st3.clear();
  const d = Math.min(dt, 0.03);
  const tau = S3.L / RL_R;
  let di;
  if(S3.on){
    di = (RL_E - S3.i*RL_R)/S3.L;
    S3.i += di*d;
    S3.uL = RL_E - S3.i*RL_R;
  }else{
    if(S3.i > 1e-4){
      if(S3.diode){ di = -S3.i*RL_R/S3.L; S3.uL = -0.7; }
      else        { di = -S3.i/ARC_T;     S3.uL = S3.L*di; }
      S3.i += di*d;
      if(S3.i < 0) S3.i = 0;
    }else{ S3.i = 0; S3.uL = 0; }
  }
  /* 峰值只在**断闸且没加二极管**时记 —— 合闸那一刻 uL 本来就是 12V，
     混进来的话讲解里会写成「峰值到了 12 V」（截图抓到的）。
     而且尖峰是断闸之后几帧才出现的，note3() 在点按钮那一刻调用时还没发生，
     所以要等电流泄完再补调一次。 */
  if(!S3.on && !S3.diode){
    if(Math.abs(S3.uL) > Math.abs(S3.peak)){ S3.peak = S3.uL; S3.dirty = true; }
    if(S3.dirty && S3.i <= 1e-4){ S3.dirty = false; note3(); }
  }
  S3.buf.push([S3.i, S3.uL]);
  if(S3.buf.length > 240) S3.buf.shift();
  const iTxt = S3.i.toFixed(2) + ' A';
  const uTxt = (Math.abs(S3.uL) >= 10 ? Math.round(S3.uL) : S3.uL.toFixed(1)) + ' V';
  if(iTxt !== S3.lastI){ S3.lastI = iTxt; $('s3b').textContent = iTxt; }
  if(uTxt !== S3.lastU){ S3.lastU = uTxt; $('s3c').textContent = uTxt; }

  EP.heading(g, 20, 16, '线圈通断电', 'E = 12 V，回路电阻 2 Ω');
  /* ---- 电路 ---- */
  const Y = 56, YB = 142, XL = 46, XR = 296;
  g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.6; g.lineCap='round';
  g.beginPath(); g.moveTo(XL, 82); g.lineTo(XL, Y); g.lineTo(XR, Y); g.stroke();
  g.beginPath(); g.moveTo(XR, Y); g.lineTo(XR, YB); g.lineTo(XL, YB); g.lineTo(XL, 108); g.stroke();
  g.restore();
  EC.battery(g, XL, 95, {horiz:false, long:20, short:11, gap:10, pm:false});
  txt(g, '12 V', XL+13, 95, {sz:10, b:1, c:C.tx2, al:'left'});
  EC.switchSym(g, 118, Y, S3.on, {len:32});
  txt(g, S3.on ? '合闸' : '断开', 118, Y-16, {sz:10, b:1, c: S3.on ? C.ok : C.tx3});
  EC.resistor(g, 200, Y, {horiz:true, len:36, w:14});
  txt(g, 'R = 2 Ω', 200, Y-18, {sz:10, b:1, c:C.tx2});
  /* 电感符号：竖着的四个半圆 */
  g.save(); g.strokeStyle = EP.P.copper; g.lineWidth = 3; g.lineCap='round';
  for(let k=0;k<4;k++){
    g.beginPath(); g.arc(XR, 78 + k*13, 6.5, -Math.PI/2, Math.PI/2); g.stroke();
  }
  g.restore();
  txt(g, 'L = ' + S3.L.toFixed(1) + ' H', XR-16, 100, {sz:10, b:1, c:C.tx2, al:'right'});
  /* 续流二极管：并在线圈两端，反着接 */
  if(S3.diode){
    const dx = XR + 34;
    g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.2; g.lineCap='round';
    g.beginPath(); g.moveTo(XR, 72); g.lineTo(dx, 72); g.lineTo(dx, 82); g.stroke();
    g.beginPath(); g.moveTo(dx, 116); g.lineTo(dx, 128); g.lineTo(XR, 128); g.stroke();
    g.restore();
    /* 三角形朝上 + 一横（阴极在上，所以平时反偏不导通） */
    const live = !S3.on && S3.i > 1e-4;
    g.save(); g.fillStyle = live ? C.ok : C.tx2;
    g.beginPath(); g.moveTo(dx-8, 110); g.lineTo(dx+8, 110); g.lineTo(dx, 92); g.closePath(); g.fill();
    g.strokeStyle = live ? C.ok : C.tx2; g.lineWidth = 2.4; g.lineCap='round';
    g.beginPath(); g.moveTo(dx-8, 92); g.lineTo(dx+8, 92); g.stroke();
    g.restore();
    txt(g, '续流二极管', dx+12, 101, {sz:9, c: live ? C.ok : C.tx3, al:'left'});
  }
  /* 断开瞬间画个电弧 */
  if(!S3.on && !S3.diode && S3.i > 0.05){
    g.save(); g.strokeStyle = C.warn; g.lineWidth = 1.8; g.lineCap='round';
    for(let k=0;k<3;k++){
      g.beginPath();
      g.moveTo(104, Y);
      g.lineTo(110 + Math.random()*6, Y - 5 + Math.random()*10);
      g.lineTo(118 + Math.random()*6, Y - 4 + Math.random()*8);
      g.lineTo(132, Y);
      g.stroke();
    }
    g.restore();
    EP.chip(g, '拉弧！', 118, Y-32, {sz:10, b:1, c:C.warn});
  }
  if(S3.on && S3.i > 1e-3){
    EP.flow(g, new Path([[XL,82],[XL,Y],[XR,Y],[XR,YB],[XL,YB],[XL,108]]),
            {phase:(Date.now()/14)%1000, gap:46, kind:'cur', size:5});
  }

  EC.strip(g, 24, 168, 312, 106, S3.buf,
    [{i:0, color:C.cur, auto:true, floor:1},
     {i:1, color:C.volt, auto:true, floor:14}], {n:240});
  EC.stripLegend(g, 32, 286, [['电流 i', C.cur], ['线圈两端电压 UL', C.volt]]);

  box(g, 20, 300, 320, 32, 6, Math.abs(S3.uL) > 50 ? C.errbg : C.box,
      Math.abs(S3.uL) > 50 ? C.err : C.boxLine, 1.2);
  txt(g, Math.abs(S3.uL) > 50
        ? '断开瞬间线圈两端顶到了 ' + Math.round(S3.uL) + ' V —— 电源才 12 V！'
        : 'τ = L÷R = ' + tau.toFixed(2) + ' s　·　i = ' + S3.i.toFixed(2) +
          ' A　·　UL = ' + S3.uL.toFixed(1) + ' V',
      180, 316, {sz:10.5, b:1, c: Math.abs(S3.uL) > 50 ? C.err : C.tx2});
}
function note3(){
  const tau = S3.L/RL_R;
  $('s3llab').textContent = S3.L.toFixed(1) + ' H';
  $('s3a').textContent = tau.toFixed(2) + ' s';
  $('n2').innerHTML = S3.on
    ? '<div class="st good">合闸了 —— 电流是「爬」上去的，不是一下就到</div>'+
      '橙线在慢慢往上爬，最后停在 <b>' + (RL_E/RL_R) + ' A</b>（12V ÷ 2Ω）。'+
      '<b>τ = L÷R = ' + tau.toFixed(2) + ' 秒</b>，同样是 5 个 τ 到位。<br>'+
      '刚合闸那一刻线圈两端电压最高（紫线），因为<b>电流变化最快</b>；'+
      '电流爬到头之后 di/dt = 0，线圈就退化成一根普通导线，两端电压只剩它自己的铜阻压降。<br>'+
      '<span class="sub">现在断闸，盯住紫线那一下。</span>'
    : (S3.diode
      ? '<div class="st good">加了续流二极管：尖峰没了</div>'+
        '断开之后电流<b>没有被强行切断</b> —— 它拐进「线圈 + 二极管」这个小圈里，'+
        '按 τ = L÷R 慢慢耗掉。线圈两端的电压被二极管<b>钳在 −0.7V 左右</b>，'+
        '紫线几乎是平的。<br>'+
        '<b>触点和 PLC 输出点因此保住了。</b>代价是继电器释放会<b>慢一点</b>（几毫秒到几十毫秒），'+
        '对速度要求高的场合会改用「二极管 + 稳压管」或者 RC 吸收。<br>'+
        '<span class="sub"><b>方向不能接反</b>：正常是阴极（那一横）朝电源正极，平时不导通。'+
        '接反了就是把电源直接短路。</span>'
      : '<div class="st bad">断闸：线圈顶出了几百伏</div>'+
        '电感<b>拼命想维持原来的电流</b>，你一断，它就在两端顶出反向高压 '+
        '（e = −L·di/dt，<b>断得越快顶得越高</b>）。刚才那一下峰值到了 <b>' +
        Math.round(Math.abs(S3.peak)) + ' V</b> 左右，而电源才 12 V。<br>'+
        '<b>这就是触点拉弧、烧蚀的根源，也是打坏 PLC 输出点的常见原因。</b><br>'+
        '<span class="sub">把上面那个勾选框打开，再合一次闸、断一次，看尖峰怎么被二极管吃掉。'+
        '（画面上那个数是量级示意，真实值取决于断开速度和杂散参数。）</span>');
}
$('s3sw').addEventListener('click', function(){
  S3.on = !S3.on;
  $('s3sw').textContent = S3.on ? '断闸' : '合闸';
  if(S3.on) S3.peak = 0;
  note3();
});
$('s3d').addEventListener('change', function(){ S3.diode = this.checked; note3(); });
$('s3l').addEventListener('input', function(){ S3.L = (+this.value)/10; note3(); });

/* ================================================================
   场景 4：符号 + 万用表怎么量
   ================================================================ */
const S4 = { k:0, t:0 };
const st4 = new Stage('cv3', 360, 316);
const MM = [
  { t:'电阻 R', dial:'Ω 电阻档', read:'1.002 kΩ',
    good:'跟标称差在误差范围内 → 好',
    bad:['读数「1」或 OL（无穷大）→ 断了', '跟标称差很多 → 变值了'],
    syms:[['固定电阻','res'], ['可变电阻 / 电位器','rheo']] },
  { t:'电容 C', dial:'电容档（或 Ω 档看趋势）', read:'99.4 μF',
    good:'容量接近标称 → 好',
    bad:['一直 0 Ω → 击穿短路了', '一上来就无穷大且纹丝不动 → 开路 / 干了'],
    syms:[['无极性电容','cap'], ['电解电容（分正负）','ecap']] },
  { t:'电感 L', dial:'Ω 电阻档', read:'41.6 Ω',
    good:'一个很小的电阻（几欧到几十欧）→ 正常',
    bad:['无穷大 → 线断了', '几乎 0 Ω 且通电发烫 → 匝间短路'],
    syms:[['空心电感','ind'], ['带铁芯电感','indc']] }
];

function drawSym(g, kind, x, y){
  g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.4; g.lineCap='round';
  if(kind === 'res' || kind === 'rheo'){
    g.beginPath(); g.moveTo(x-40, y); g.lineTo(x-18, y); g.stroke();
    g.beginPath(); g.moveTo(x+18, y); g.lineTo(x+40, y); g.stroke();
    g.restore();
    box(g, x-18, y-9, 36, 18, 2, C.box, C.wire, 2);
    if(kind === 'rheo'){
      g.save(); g.strokeStyle = C.acc; g.lineWidth = 2;
      g.beginPath(); g.moveTo(x-24, y+16); g.lineTo(x+20, y-16); g.stroke();
      EC.head(g, x+20, y-16, 0.8, -0.6, 6, C.acc);
      g.restore();
    }
    return;
  }
  if(kind === 'cap' || kind === 'ecap'){
    g.beginPath(); g.moveTo(x-40, y); g.lineTo(x-6, y); g.stroke();
    g.beginPath(); g.moveTo(x+6, y); g.lineTo(x+40, y); g.stroke();
    g.lineWidth = 3.2; g.lineCap='butt';
    g.beginPath(); g.moveTo(x-6, y-13); g.lineTo(x-6, y+13); g.stroke();
    if(kind === 'cap'){
      g.beginPath(); g.moveTo(x+6, y-13); g.lineTo(x+6, y+13); g.stroke();
    }else{
      /* 电解电容：另一极画成一段弧，正极那边标 ＋ */
      g.beginPath(); g.arc(x+22, y, 18, Math.PI*0.72, Math.PI*1.28); g.stroke();
    }
    g.restore();
    if(kind === 'ecap') txt(g, '＋', x-14, y-20, {sz:12, b:1, c:C.err});
    return;
  }
  /* 电感：四个半圆 */
  g.beginPath(); g.moveTo(x-46, y); g.lineTo(x-26, y); g.stroke();
  g.beginPath(); g.moveTo(x+26, y); g.lineTo(x+46, y); g.stroke();
  g.strokeStyle = EP.P.copper; g.lineWidth = 3;
  for(let k=0;k<4;k++){
    g.beginPath(); g.arc(x-19.5 + k*13, y, 6.5, Math.PI, 0); g.stroke();
  }
  if(kind === 'indc'){
    g.strokeStyle = C.wire; g.lineWidth = 2;
    g.beginPath(); g.moveTo(x-26, y+6); g.lineTo(x+26, y+6); g.stroke();
    g.beginPath(); g.moveTo(x-26, y+10); g.lineTo(x+26, y+10); g.stroke();
  }
  g.restore();
}

function draw4(dt){
  const g = st4.g; st4.clear();
  S4.t += dt;
  const M = MM[S4.k];
  EP.heading(g, 20, 16, M.t, '（图上怎么画 · 手上怎么量）');

  /* 左半：两种符号 */
  M.syms.forEach(function(s, i){
    drawSym(g, s[1], 96, 66 + i*70);
    txt(g, s[0], 96, 66 + i*70 + 30, {sz:9.5, c:C.tx3});
  });

  /* 右半：一块万用表 */
  const MX = 208, MY = 44, MW = 128, MH = 132;
  box(g, MX, MY, MW, MH, 8, EP.P.bodyD, EP.P.ink, 1.4);
  EP.readout(g, MX+10, MY+12, MW-20, 34, M.read, {sz:14});
  /* 旋钮 */
  g.save();
  g.fillStyle = '#1b2027';
  g.beginPath(); g.arc(MX+MW/2, MY+90, 24, 0, EC.TAU); g.fill();
  g.strokeStyle = EP.P.steelDD; g.lineWidth = 1.4; g.stroke();
  g.strokeStyle = C.acc; g.lineWidth = 3.4; g.lineCap='round';
  const a = -Math.PI/2 + (S4.k-1)*0.55;
  g.beginPath(); g.moveTo(MX+MW/2, MY+90);
  g.lineTo(MX+MW/2 + Math.cos(a)*17, MY+90 + Math.sin(a)*17); g.stroke();
  g.restore();
  txt(g, M.dial, MX+MW/2, MY+124, {sz:9.5, b:1, c:C.acc});
  /* 两根表笔 */
  g.save(); g.lineCap='round'; g.lineWidth = 2.6;
  g.strokeStyle = EP.WIRE_C.red;
  g.beginPath(); g.moveTo(MX+40, MY+MH); g.lineTo(MX+30, MY+MH+22); g.stroke();
  g.strokeStyle = EP.WIRE_C.black;
  g.beginPath(); g.moveTo(MX+88, MY+MH); g.lineTo(MX+98, MY+MH+22); g.stroke();
  g.restore();

  box(g, 20, 200, 320, 44, 6, C.okbg, C.ok, 1.2);
  txt(g, '好的', 32, 214, {sz:9, c:C.tx3, al:'left'});
  txt(g, M.good, 32, 230, {sz:10.5, c:C.ok, al:'left'});
  box(g, 20, 252, 320, 56, 6, C.errbg, C.err, 1.2);
  txt(g, '坏了', 32, 265, {sz:9, c:C.tx3, al:'left'});
  M.bad.forEach(function(line, i){
    txt(g, line, 32, 282 + i*17, {sz:10, c:C.err, al:'left'});
  });
}
function note4(){
  const body = [
    '<b>符号就是一个长方框</b>，简单到没什么可认的 —— 要留意的是旁边的<b>标注</b>：'+
    '图纸上一般写成 <b>R12  1k</b> 这样，前面是位号（板子上也丝印着它），后面是阻值。<br>'+
    '<b>可变电阻 / 电位器</b>在方框上加一个斜箭头，表示这一头能动。'+
    '<span class="sub">量的时候记住：<b>断电</b>，而且在路测量会把并联的东西一起量进去，'+
    '拿不准就拆一条腿。</span>',
    '<b>两条平行线</b>就是电容。<b>电解电容的一边画成弧线</b>（或者在直线那边标 ＋），'+
    '因为它<b>分正负、接反会炸</b>。<br>'+
    '数字表有电容档最省事。<b>只有电阻档时看趋势</b>：接上去读数会从小往大爬（表在给它充电），'+
    '爬到无穷大就说明它能存电、是好的；<b>一直是 0 Ω 说明击穿了，一上来就无穷大且纹丝不动说明开路</b>。<br>'+
    '<span class="sub">量之前一定先放电，尤其是大电容。</span>',
    '<b>几个半圆</b>就是电感；<b>底下加两条平行线表示带铁芯</b>（铁芯让电感量大很多）。<br>'+
    '<b>量它只会得到一个很小的电阻</b> —— 那是铜线本身的直流电阻，不是坏了。'+
    '接触器线圈量出几十欧完全正常。<br>'+
    '<b>判断好坏靠对比</b>：跟同型号的另一只比，或者查手册上的线圈电阻。'+
    '<span class="sub">无穷大＝线断了；明显偏小又通电发烫＝匝间短路（这种最难判，'+
    '万用表常常看不出来，得靠发热和吸合无力这些现象）。</span>'
  ][S4.k];
  $('n3').innerHTML = '<div class="st">' + MM[S4.k].t + '</div>' + body;
}
document.getElementById('s4p').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S4.k = +b.dataset.k;
  document.querySelectorAll('#s4p .btn').forEach(function(t){ t.classList.toggle('on', +t.dataset.k===S4.k); });
  note4();
});

/* ================================================================
   绑定
   ================================================================ */
function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:2, sec:'2.5a'});
ElecUI.bind(document);
syncSel(); note1(); note2(); note3(); note4();
draw1();
fitAll();

(function(){
  const nb = ElecNav.neighbors('2.5a');
  let h = '';
  h += nb.prev ? '<a href="'+nb.prev.f+'">‹ '+nb.prev.id+' '+nb.prev.t+'</a>'
               : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next ? '<a class="next" href="'+nb.next.f+'">'+nb.next.id+' '+nb.next.t+' ›</a>'
               : '<span>后面几节还没做</span>';
  $('pager').innerHTML = h;
})();

loop(function(dt){
  if(cur === 0) draw1();
  else if(cur === 1) draw2(dt);
  else if(cur === 2) draw3(dt);
  else draw4(dt);
});
  }
});
})();
