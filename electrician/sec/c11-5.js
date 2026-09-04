/* 11.5 电动机反接制动 —— 本节内容的唯一真相。
   对应《零基础学电工》第 11 章 11.5 节（书内 P207~P209）。

   四屏：① 松开电闸它还要转很久 ② 换两相，转矩就反过来了
         ③ 速度继电器：转速一到就得撒手 ④ 控制电路全过程

   **屏 2 是 11.6 正反转的地基**，也是 10.3 屏 2 那条线索的落点
   （书上 10.3：「若电源相序与相序仪接线相反，则可任意调换一对电源线后，通电再测试」）。
   **屏 4 的互锁和 11.4 是同一条**：KM1 和 KM2 同时吸合 = 相间短路。

   书上的原文（别凭记忆改）：
   - 11.5.1 开头：「电动机反接制动控制电路是指**通过反接电动机的供电相序改变电动机的
     旋转方向**，降低电动机转速，最终达到停机的目的。电动机在反接制动过程中，
     电路会改变电动机定子绕组的电源相序，**使之有反转趋势而产生较大制动力矩**，
     使电动机的转速降低，**最后通过速度继电器自动切断制动电源，确保电动机不会反转**。」
   - 图 11-13 的器件（照录）：**QS 电源总开关**、**SB2 起动按钮**、**SB1 制动按钮**、
     **KM1／KM2 交流接触器**、**KT 时间继电器**、**KS 速度继电器**、三相交流电动机
   - **图 11-14 的工作过程（照录，7 步）**：
     ① 合上电源总开关 QS，接通三相电源
     ② 按下起动按钮 SB2，常开触头闭合
     ③ 交流接触器 KM1 线圈得电
        ③-1 常开主触头 KM1-1 闭合，三相交流电动机**按 L1、L2、L3 的相序**接通三相电源，
             开始正向起动运转
        ③-2 常开辅助触头 KM1-2 闭合，实现自锁功能
        ③-3 常闭触头 KM1-3 断开，**防止 KT 线圈得电**
     ④ 如需制动停机，按下制动按钮 SB1
        ④-1 常闭触头 SB1-2 断开，交流接触器 KM1 线圈失电，触头全部复位
        ④-2 常开触头 SB1-1 闭合，时间继电器 KT 线圈得电
     ⑤ 当达到时间继电器 KT 预先设定的时间时，常开触头 KT-1 延时闭合
     ⑥ 交流接触器 KM2 线圈得电
        ⑥-1 常开触头 KM2-2 闭合自锁
        ⑥-2 常闭触头 KM2-3 断开，**防止交流接触器 KM1 线圈得电**
        ⑥-3 常开触头 KM2-1 闭合，**改变电动机中定子绕组电源相序**，电动机有反转趋势，
             产生较大的制动力矩，开始制动减速
     ⑦ 当电动机转速减小到一定值时，**速度继电器 KS 断开**，KM2 线圈失电，触头全部复位，
        切断电动机的制动电源，电动机停止运转

   **书上没给、我补的（文案里全部标了口径）**：
   - 例机转速取 **1440 r/min**（2.7 节那台 4 极机，60f/p = 1500 减去 4% 转差）
   - **自由停车约 20 秒、反接制动约 2 秒**，都是**示意值**：
     自由停车按 n = 1440·e^(−t/6) 画，反接制动按恒定制动转矩线性降到零（2.2 秒到零）。
     **真实时间完全取决于转动惯量和摩擦**，书上没给任何数
   - **速度继电器一般在 100 r/min 上下断开**（JY1 那一类的动作/复位转速常见是
     120 / 100 r/min 左右）。**这是通行数据，书上只写了「转速减小到一定值时」**，
     具体值以继电器铭牌为准
   - **KT 的延时在现场设得很短**（零点几秒，只要够 KM1 完全释放）。
     演示里放大成 1.5 秒才看得见，画布上写明了
   - **能耗制动**只在最后一张卡里点一句作对比，**书上这一节没讲**，标了口径 */
(function(){
'use strict';
ELEC.reg({
  id: '11.5',
  file: 'c11-5.html',
  title: '11.5 反接制动',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>停不下来</button>
    <button class="tab" data-i="1"><span class="n">2</span>换两相</button>
    <button class="tab" data-i="2"><span class="n">3</span>速度继电器</button>
    <button class="tab" data-i="3"><span class="n">4</span>控制电路</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">断了电，它还要转很久</div>
    电动机断电之后没有任何力去拦它，只能靠轴承摩擦和风阻慢慢停 ——
    带飞轮、带大砂轮、带皮带盘的设备，<b>转个二三十秒是常事</b>。
    对机床、起重机这类要「说停就停」的设备，这不行。
    <b>点两个按钮，比一比两条曲线。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">自由停车</button>
        <button class="btn sm" data-k="1">反接制动</button>
        <button class="btn sm" data-k="2">▶ 再放一遍</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这一刻</div><div class="v" id="s1a">0.0 s</div></div>
        <div class="num hi"><div class="k">转速</div><div class="v" id="s1b">1440</div></div>
        <div class="num"><div class="k">停下来要</div><div class="v" id="s1c">约 20 s</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">这两条曲线是示意的，说明一下口径</div>
    <div class="tip info"><b>书上没给任何时间数字</b>，只说「降低电动机转速，最终达到停机」。
      这里自由停车按指数衰减画（约 20 秒），反接制动按<b>恒定制动转矩</b>画
      （线性降到零，约 2 秒）。<b>真实时间完全取决于设备的转动惯量和摩擦</b> ——
      同一台电动机，空轴和带着大飞轮，能差十倍以上。
      要看的是<b>两条曲线的形状差别</b>，不是具体秒数。</div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">为什么反接制动那条是直的</div>
    <div class="tip">自由停车只靠摩擦，<b>转得越慢摩擦力矩越小</b>，所以尾巴拖得特别长 ——
      指数曲线。反接制动是主动给一个<b>方向相反的电磁转矩</b>，
      这个转矩在整个过程里基本不变，<b>所以转速是匀速往下掉的，是一条直线</b>。
      而且它<b>越到后面越有效</b>，这正好补上了自由停车最弱的那一段。</div>
  </div>
</section>

<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">把两根相线对调，旋转磁场就反过来转</div>
    <b>10.3 节埋过这条线索</b>：书上讲测相序时说「可任意调换一对电源线后，通电再测试」。
    这就是它的用处 —— <b>三相电动机的转向，只由进线的相序决定</b>。
    调换任意两根，磁场就反着转。<b>点两个按钮看磁场箭头。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">KM1：正常相序</button>
        <button class="btn sm" data-k="1">KM2：换两相</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">进线相序</div><div class="v" id="s2a">L1L2L3</div></div>
        <div class="num hi"><div class="k">磁场转向</div><div class="v" id="s2b">顺时针</div></div>
        <div class="num"><div class="k">转子</div><div class="v" id="s2c">跟着转</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st good">这一条会用三次，记牢它</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>用在哪</th><th>怎么用</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">10.3 测相序</td><td>相序仪显示反了，<b>随便调换一对电源线</b>再测</td></tr>
        <tr><td class="eu-s">11.5 反接制动<br>（这一节）</td>
          <td>正转着的时候突然换两相，<b>磁场反过来推它</b>，产生制动力矩</td></tr>
        <tr><td class="eu-s">11.6 正反转<br>（下一节）</td>
          <td>两只接触器，一只按正常相序接，另一只<b>接线时就把两相调过来</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip"><b>调哪两根都行</b>，L1L2、L2L3、L1L3 效果一样，都是反转。
      但<b>三根一起轮换（L1→L2→L3→L1）是不变的</b> —— 那只是换了个起点，相序没变。
      现场装完新电动机试车，转向不对就停电、调两根线、再试，就这么简单。</div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">反接制动为什么「猛」</div>
    <div class="tip">正常起动时，转子从静止追磁场，转差是 1；
      <b>反接的这一瞬间，磁场掉头反转，而转子还在原方向高速转着 ——
      转子相对磁场的转差接近 2</b>，比起动那一下还大。
      所以<b>反接制动的电流比起动电流还大</b>，转矩也大，制动才快。
      代价是：<b>冲击大、发热猛</b>，所以功率大一些的电动机做反接制动时，
      主电路里常常要<b>串几个限流电阻</b>（书上这个电路没画，现场很常见）。</div>
  </div>
</section>

<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">谁来喊「停」</div>
    反接制动有个天生的麻烦：<b>它不会自己停在零。</b>
    转速降到零的那一刻，如果制动电源还接着，电动机就会<b>接着反方向起动起来</b> ——
    而且是全压直接起动。所以必须有个东西盯着转速，<b>到点了把 KM2 断掉</b>。
    这个东西就是<b>速度继电器 KS</b>。<b>点三个档看三种情况。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">正常断开</button>
        <button class="btn sm" data-k="1">断得太早</button>
        <button class="btn sm" data-k="2">没断开</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">KS 断开点</div><div class="v" id="s3a">100</div></div>
        <div class="num hi"><div class="k">结果</div><div class="v" id="s3b">正常停住</div></div>
        <div class="num"><div class="k">用时</div><div class="v" id="s3c">约 2 s</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">速度继电器是怎么知道转速的</div>
    <div class="tip info"><b>它装在电动机的轴上</b>（书上图 11-13 里 KS 就画在电动机旁边，
      用一根虚线连着轴）。里面是一块跟着轴转的永磁转子和一个能摆动的定子 ——
      转子转起来带动定子偏一个角度，<b>转速够高，定子就把触点推合上；转速降下来，
      触点靠弹簧复位断开</b>。原理上就是个小小的感应电动机。
      <b>2.3 节列过它</b>：KS，速度继电器。</div>
    <div class="tip"><b>「一定值」是多少，书上没写。</b>通行的一类
      （JY1 那种）动作转速在 <b>120 r/min</b> 上下、复位在 <b>100 r/min</b> 上下，
      <b>具体以继电器铭牌为准</b>。这一屏按 100 r/min 画。</div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">这一条是这一节最要命的地方</div>
    <div class="tip">书上原话把它写得很清楚：<b>「最后通过速度继电器自动切断制动电源，
      确保电动机不会反转」</b>。<b>KS 坏了 = 制动变成了反向起动。</b>
      对机床主轴、卷扬机这种设备，这不是「停不下来」，是<b>反着冲出去</b>。
      检修时<b>速度继电器和它的触点要单独查一遍</b>：
      手动盘一下轴，用万用表通断档听触点通没通（3.6b 那一套）。</div>
  </div>
</section>

<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">三条支路，两道互锁，一道延时</div>
    <b>KM1 正转、KM2 反接，这两只接触器绝对不能同时吸合</b> ——
    它们接的是同一组电源、同一台电动机，只是相序不同，同时吸上就是<b>相间短路</b>
    （和 11.4 星三角完全一样的道理）。
    <b>点「起动」再点「制动」，看整个过程。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn sm" data-k="go">起动 SB2</button>
        <button class="btn sm" data-k="br">制动 SB1</button>
        <button class="btn sm" data-k="rst">复位</button>
      </div>
      <div class="nums three">
        <div class="num hi"><div class="k">现在</div><div class="v" id="s4a">停着</div></div>
        <div class="num"><div class="k">转速</div><div class="v" id="s4b">0</div></div>
        <div class="num"><div class="k">吸合的是</div><div class="v" id="s4c">都没有</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">书上那七步（图 11-14，照录）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>步</th><th>书上原话</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">②③</td><td>按下起动按钮 SB2 → KM1 线圈得电：
          KM1-1 闭合<b>按 L1、L2、L3 的相序</b>接通电源正向起动；
          KM1-2 闭合自锁；<b>KM1-3 断开，防止 KT 线圈得电</b></td></tr>
        <tr><td class="eu-s">④</td><td>按下制动按钮 SB1：
          <b>SB1-2 断开</b>，KM1 线圈失电，触头全部复位；
          <b>SB1-1 闭合</b>，时间继电器 KT 线圈得电</td></tr>
        <tr><td class="eu-s">⑤⑥</td><td>KT 延时到 → KT-1 闭合 → KM2 线圈得电：
          KM2-2 闭合自锁；<b>KM2-3 断开，防止 KM1 线圈得电</b>；
          <b>KM2-1 闭合，改变定子绕组电源相序</b>，产生制动力矩</td></tr>
        <tr><td class="eu-s">⑦</td><td>转速减小到一定值时，<b>速度继电器 KS 断开</b>，
          KM2 线圈失电，切断制动电源，电动机停止运转</td></tr>
      </tbody>
    </table></div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st good">三道保险，各防一件事</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>这一道</th><th>防的是</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">KM1-3<br>（动断，在 KT 支路）</td>
          <td><b>正转着的时候 KT 不许起来</b> —— 不然计时一到 KM2 就吸了，
            那会儿 KM1 还吸着</td></tr>
        <tr><td class="eu-s">KM2-3<br>（动断，在 KM1 支路）</td>
          <td><b>制动的时候 KM1 不许起来</b> —— 有人这时候去按起动按钮也没用</td></tr>
        <tr><td class="eu-s">KT 的延时</td>
          <td><b>给 KM1 留出完全释放的时间</b>。触点断开靠弹簧弹回来，
            要几十毫秒，这段时间里两只都还「半吸着」</td></tr>
      </tbody>
    </table></div>
    <div class="tip info"><b>和 11.4 星三角对照着记：</b>那边是 KMY-2 和 KM△-4 两对动断，
      靠 KT 的一断一合排先后；这边是 KM1-3 和 KM2-3 两对动断，靠 KT 的延时排先后。
      <b>做法一模一样：把对方的动断触点串进自己的线圈支路里。</b>
      <b>下一节正反转，还是这两条。</b></div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">还有一种制动方式，这一节没讲</div>
    <div class="tip info"><b>能耗制动</b>：断开三相电源之后，往定子绕组里<b>通直流电</b>，
      产生一个不转的磁场，转子在里面转就会感应出电流、受到阻力，把动能变成热耗掉。
      <b>特点是平稳、没有反转的风险、也不用速度继电器</b>，但要一套直流电源，
      而且低速时制动力矩很小。<b>书上这一节只讲了反接制动，能耗制动是我补的一句对比</b>，
      现场两种都常见。</div>
  </div>

  <div class="quiz" data-quiz="11.5">
    <div class="qz" data-q="反接制动靠什么产生制动力矩？"
      data-opts="给绕组通直流电|把三相电源里的任意两根对调，让旋转磁场反过来|把电源断开靠摩擦" data-right="1"
      data-why="调换任意两根相线，旋转磁场就反向了。这时转子还在原方向高速转着，磁场反过来推它，就产生了制动力矩。书上原话是「通过反接电动机的供电相序改变电动机的旋转方向……使之有反转趋势而产生较大制动力矩」。通直流电的那种叫能耗制动，是另一回事。"></div>
    <div class="qz" data-q="速度继电器 KS 在这个电路里管什么？"
      data-opts="控制起动快慢|转速降到一定值时切断制动电源，防止电动机反转|测量转速给人看" data-right="1"
      data-why="书上原话：「最后通过速度继电器自动切断制动电源，确保电动机不会反转」。反接制动不会自己停在零 —— 转速到零那一刻如果制动电源还接着，电动机就会反方向全压起动起来。KS 坏了，制动就变成了反向起动。"></div>
    <div class="qz" data-q="KM1 和 KM2 要是同时吸合会怎么样？"
      data-opts="制动更快|相间短路|电动机转得更稳" data-right="1"
      data-why="相间短路。两只接触器接的是同一组三相电源、同一台电动机，只是相序不同 —— 同时吸上，被对调的那两相就直接短接了。和 11.4 星三角同时吸合是完全一样的道理，防的办法也一样：把对方的动断触点串进自己的线圈支路（KM1-3、KM2-3）。"></div>
    <div class="qz" data-q="时间继电器 KT 在这个电路里为什么必须有？"
      data-opts="控制制动持续多久|给 KM1 留出完全释放的时间，再让 KM2 吸合|让电动机先滑行一会儿" data-right="1"
      data-why="接触器的触点断开靠弹簧弹回来，要几十毫秒。按下 SB1 那一刻 KM1 只是失电，还没完全释放；这时候 KM2 要是马上吸上就短路了。KT 的延时就是等这几十毫秒 —— 现场设得很短，零点几秒。制动持续多久是 KS 说了算，不是 KT。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 11 章 11.5 节（书内 P207~P209）</div>
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
function noC(g, x, y, on, s){
  s = s || 1;
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.6; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x, y - 14*s); g.lineTo(x, y - 8*s); g.stroke();
  g.beginPath(); g.moveTo(x, y + 8*s); g.lineTo(x, y + 14*s); g.stroke();
  g.beginPath(); g.moveTo(x, y - 8*s);
  if(on) g.lineTo(x, y + 8*s); else g.lineTo(x + 9*s, y + 7*s);
  g.stroke(); g.restore();
  dot(g, x, y - 8*s, P.ink, 1.8); dot(g, x, y + 8*s, P.ink, 1.8);
}
function ncC(g, x, y, on, s){
  s = s || 1;
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.6; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x, y - 14*s); g.lineTo(x, y - 8*s); g.stroke();
  g.beginPath(); g.moveTo(x, y + 8*s); g.lineTo(x, y + 14*s); g.stroke();
  g.beginPath(); g.moveTo(x - 7*s, y + 8*s); g.lineTo(x + 11*s, y + 8*s); g.stroke();
  g.beginPath(); g.moveTo(x, y - 8*s);
  if(on) g.lineTo(x + 9*s, y + 7*s); else g.lineTo(x, y + 8*s);
  g.stroke(); g.restore();
  dot(g, x, y - 8*s, P.ink, 1.8);
}
function btn(g, x, y, nc, pressed){
  if(nc) ncC(g, x, y, pressed); else noC(g, x, y, pressed);
  g.save(); g.setLineDash([2.5,2.5]); g.strokeStyle = P.ink; g.lineWidth = 1;
  g.beginPath(); g.moveTo(x + 4, y); g.lineTo(x + 22, y); g.stroke(); g.restore();
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.8; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x + 22, y - 6); g.lineTo(x + 22, y + 6); g.stroke(); g.restore();
}
function coil(g, x, y, live, label){
  box(g, x - 15, y - 11, 30, 22, 2, live ? C.accbg : C.card,
      live ? C.acc : P.ink, live ? 1.8 : 1.4);
  seg(g, [[x, y - 20],[x, y - 11]], C.wire, 1.8);
  seg(g, [[x, y + 11],[x, y + 20]], C.wire, 1.8);
  if(label) txt(g, label, x - 20, y, {sz:9, b:1, c: live ? C.acc : C.tx2, al:'right'});
}
function ktC(g, x, y, on){
  noC(g, x, y, on, 0.95);
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.3; g.lineCap = 'round';
  g.beginPath(); g.arc(x - 1, y - 2, 8, Math.PI, Math.PI*2); g.stroke();
  g.beginPath(); g.moveTo(x - 9, y - 2); g.lineTo(x + 7, y - 2); g.stroke();
  g.restore();
}

/* ================================================================
   这一节的数字（示意值，出处和口径见文件头）
   ================================================================ */
const N0 = 1440;        /* 额定转速 r/min（4 极机） */
const T_FREE = 6;       /* 自由停车的时间常数 s：n = N0·e^(−t/T_FREE) */
const T_BRK = 2.2;      /* 反接制动线性降到零用的时间 s */
const KS_N = 100;       /* 速度继电器断开转速 r/min（通行值，书上只写「一定值」） */
function nFree(t){ return N0 * Math.exp(-t / T_FREE); }
function nBrake(t){ return Math.max(0, N0 * (1 - t / T_BRK)); }

/* ================================================================
   场景 1：自由停车 vs 反接制动
   ================================================================ */
const st1 = new Stage('cv0', 360, 256);
const S1 = { k:0, t:0 };
const X0 = 52, X1 = 340, Y0 = 44, Y1 = 170, TM = 24, NM = 1500;
function px1(t){ return X0 + (X1 - X0) * t / TM; }
function py1(n){ return Y1 - (Y1 - Y0) * Math.min(n, NM) / NM; }
function draw1(dt){
  const g = st1.g; st1.clear();
  if(dt && S1.t < TM) S1.t = Math.min(TM, S1.t + dt);
  const brk = S1.k === 1;
  EP.heading(g, 14, 16, brk ? '反接制动' : '自由停车', '示意曲线');

  box(g, X0, Y0, X1 - X0, Y1 - Y0, 4, C.box, C.boxLine, 1);
  [0, 500, 1000, 1440].forEach(function(n){
    const y = py1(n);
    seg(g, [[X0, y],[X1, y]], C.boxLine, n === 1440 ? 1.1 : .7);
    txt(g, String(n), X0 - 6, y, {sz:8.5, c:C.tx3, al:'right'});
  });
  txt(g, 'r/min', X0 - 6, Y0 - 14, {sz:8.5, c:C.tx3, al:'right'});
  for(let s = 0; s <= TM; s += 6){
    const x = px1(s);
    seg(g, [[x, Y1],[x, Y1 + 4]], C.boxLine, .8);
    txt(g, s + ' s', x, Y1 + 13, {sz:8.5, c:C.tx3});
  }
  function curve(fn, col, lw){
    const pts = [];
    for(let s = 0; s <= TM + 0.001; s += 0.15) pts.push([px1(s), py1(fn(s))]);
    new Path(pts).stroke(g, lw, col);
  }
  g.save(); g.globalAlpha = brk ? .3 : 1; curve(nFree, C.cur, brk ? 1.6 : 2.6); g.restore();
  g.save(); g.globalAlpha = brk ? 1 : .3; curve(nBrake, C.acc, brk ? 2.6 : 1.6); g.restore();

  const t = S1.t, n = brk ? nBrake(t) : nFree(t);
  const xN = px1(t), yN = py1(n);
  g.save(); g.setLineDash([2,3]); g.strokeStyle = C.tx3; g.lineWidth = 1;
  g.beginPath(); g.moveTo(xN, Y1); g.lineTo(xN, yN); g.stroke(); g.restore();
  dot(g, xN, yN, brk ? C.acc : C.cur, 4.5);

  EP.legend(g, 180, 199, [['自由停车', C.cur, 'bar'], ['反接制动', C.acc, 'bar']]);
  if(brk) conc(g, 212, 'ok', '反接制动：一条直线，约 2 秒到零',
    '制动转矩基本不变，所以转速是匀速往下掉的');
  else conc(g, 212, 'warn', '自由停车：只靠摩擦，尾巴拖得特别长',
    '转得越慢摩擦力矩越小 —— 最后那几百转最磨人');

  const a = t.toFixed(1) + ' s', b = String(Math.round(n)),
        c = brk ? '约 2 s' : '约 20 s';
  if(S1.la !== a){ S1.la = a; $('s1a').textContent = a; }
  if(S1.lb !== b){ S1.lb = b; $('s1b').textContent = b; }
  if(S1.lc !== c){ S1.lc = c; $('s1c').textContent = c; }
}
function note1(){
  $('n0').innerHTML = S1.k === 1
    ? '<b>反接制动（蓝）</b>：从 1440 到零走的是一条<b>直线</b>，约 2 秒。'
      + '因为制动转矩是电磁产生的、基本恒定，所以每秒掉的转速也基本一样。'
      + '<b>它最强的地方正好在低速段</b> —— 那正是自由停车最没辙的地方。'
    : '<b>自由停车（橙）</b>：断电之后没有任何力去拦它，全靠轴承摩擦和风阻。'
      + '<b>转得越慢，摩擦力矩越小</b>，所以曲线是个长尾巴：'
      + '前 6 秒掉了一多半，可最后那几百转要磨十几秒。'
      + '带飞轮、带砂轮的设备还要更久。';
}

/* ================================================================
   场景 2：换两相，磁场就反过来
   ================================================================ */
const st2 = new Stage('cv1', 360, 244);
const S2 = { k:0, a:0, ar:0 };
function draw2(dt){
  const g = st2.g; st2.clear();
  const rev = S2.k === 1;
  if(dt){ S2.a += (rev ? -1 : 1) * 2.2 * dt; S2.ar += 1.9 * dt; }
  EP.heading(g, 14, 16, rev ? 'KM2：L2 和 L3 对调' : 'KM1：正常相序', '');

  /* 左边：三根相线 → 三个接线端子 */
  const YS = [76, 106, 136], TX = 122;
  YS.forEach(function(y, i){
    seg(g, [[30, y],[92, y]], C.wire, 2);
    txt(g, 'L' + (i+1), 26, y, {sz:8.5, b:1, c:C.tx3, al:'right'});
  });
  /* 对调的是 L2 和 L3 —— 交叉处不打点（4.1 那条规矩，这儿天然出现） */
  const map = rev ? [0, 2, 1] : [0, 1, 2];
  YS.forEach(function(y, i){
    seg(g, [[92, y],[TX, YS[map[i]]]], rev && i > 0 ? C.warn : C.wire, 2);
  });
  ['U', 'V', 'W'].forEach(function(s, i){
    dot(g, TX, YS[i], P.ink, 3.2);
    txt(g, s, TX, YS[i] - 11, {sz:9, b:1, c:C.tx2});
    seg(g, [[TX, YS[i]],[140, YS[i]]], C.wire, 2);
  });
  const EDGE = [[203, 98],[200, 116],[203, 134]];
  YS.forEach(function(y, i){ seg(g, [[140, y], EDGE[i]], C.wire, 1.8); });
  if(rev) EP.chip(g, '这两根换了', 74, 158, {sz:8.5, b:1, c:C.warn});

  /* 右边：定子圆 + 旋转磁场 + 转子 */
  const CXx = 252, CYy = 116, R = 52;
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.8;
  g.beginPath(); g.arc(CXx, CYy, R, 0, Math.PI*2); g.stroke();
  g.beginPath(); g.arc(CXx, CYy, R - 12, 0, Math.PI*2); g.stroke();
  g.restore();
  /* 磁场：一根从圆心指出去的绿箭头 */
  const ax = CXx + Math.cos(S2.a) * (R - 20), ay = CYy + Math.sin(S2.a) * (R - 20);
  seg(g, [[CXx, CYy],[ax, ay]], C.ok, 3);
  EC.head(g, ax, ay, CXx, CYy, 8, C.ok);
  /* 转子：一根过圆心的橙杠 */
  const rx = Math.cos(S2.ar) * (R - 26), ry = Math.sin(S2.ar) * (R - 26);
  seg(g, [[CXx - rx, CYy - ry],[CXx + rx, CYy + ry]], C.cur, 5);
  dot(g, CXx, CYy, C.tx2, 3);
  /* 转向弧箭头，画在圆外 */
  g.save(); g.strokeStyle = C.ok; g.lineWidth = 2;
  g.beginPath();
  if(rev) g.arc(CXx, CYy, R + 12, 0.5, -0.9, true);
  else g.arc(CXx, CYy, R + 12, -0.9, 0.5, false);
  g.stroke(); g.restore();
  /* 箭头一律画在这一段弧的**终点**上，指着扫过来的方向 */
  const ea = rev ? -0.9 : 0.5, eb = ea + (rev ? 0.3 : -0.3);
  EC.head(g, CXx + Math.cos(ea) * (R + 12), CYy + Math.sin(ea) * (R + 12),
    CXx + Math.cos(eb) * (R + 12), CYy + Math.sin(eb) * (R + 12), 9, C.ok);
  EP.legend(g, 252, 190, [['旋转磁场', C.ok, 'bar'], ['转子', C.cur, 'bar']]);

  if(rev) conc(g, 200, 'err', '磁场掉头逆时针转，可转子还在顺时针转',
    '磁场反着推它 —— 这就是制动力矩');
  else conc(g, 200, 'ok', '磁场顺时针转，转子跟着它转（慢一点点）',
    '那一点点差就是转差，2.7 节讲过');

  $('s2a').textContent = rev ? 'L1L3L2' : 'L1L2L3';
  $('s2b').textContent = rev ? '逆时针' : '顺时针';
  $('s2c').textContent = rev ? '还在正转' : '跟着转';
}
function note2(){
  $('n1').innerHTML = S2.k === 1
    ? '<b>只把 L2 和 L3 对调了一下</b>，别的什么都没动 —— 绿箭头（旋转磁场）立刻反过来转。'
      + '而转子有惯性，<b>还在按原来的方向转</b>。'
      + '磁场朝一边、转子朝另一边，<b>转子受到的电磁力就是反着的</b>，这就是制动力矩。'
      + '<b>它比起动转矩还大</b>：起动时转子相对磁场差一整圈，现在差了将近两圈。'
    : '<b>正常相序 L1-L2-L3</b>：三相电流依次达到峰值，合成出一个匀速旋转的磁场（绿箭头），'
      + '转子被它拖着转，<b>比磁场慢一点点</b> —— 那一点点就是转差（2.7 节讲过，这台是 4%）。'
      + '<b>转向完全由相序决定</b>，跟电压高低、负载大小都没关系。';
}

/* ================================================================
   场景 3：速度继电器什么时候撒手
   ================================================================
   纵轴要能画到负值 —— 「没断开」那一档的落点就是转速穿过零、反向起动起来。 */
const st3 = new Stage('cv2', 360, 240);
const S3 = { k:0 };
const G0 = 52, G1 = 340, H0 = 44, H1 = 166, TM3 = 4, NMAX = 1500, NMIN = -800;
function px3(t){ return G0 + (G1 - G0) * t / TM3; }
function py3(n){ return H1 - (H1 - H0) * (Math.max(NMIN, Math.min(NMAX, n)) - NMIN) / (NMAX - NMIN); }
const OFFN = [KS_N, 500, -1e9];        /* 三档各在多少转速断开 */
function n3(t, k){
  const off = OFFN[k];
  const tOff = T_BRK * (1 - off / N0);
  if(k === 2 || t < tOff) return N0 * (1 - t / T_BRK);
  /* 断开之后不再有制动转矩，剩下的自己滑行 */
  return off * Math.exp(-(t - tOff) / (k === 0 ? 0.6 : T_FREE));
}
function draw3(){
  const g = st3.g; st3.clear();
  const k = S3.k;
  EP.heading(g, 14, 16,
    k === 0 ? 'KS 在 100 转断开' : (k === 1 ? 'KS 在 500 转就断了' : 'KS 一直没断开'), '');

  box(g, G0, H0, G1 - G0, H1 - H0, 4, C.box, C.boxLine, 1);
  [1440, 1000, 500, 0, -500].forEach(function(n){
    const y = py3(n);
    seg(g, [[G0, y],[G1, y]], n === 0 ? C.tx3 : C.boxLine, n === 0 ? 1.3 : .7);
    txt(g, String(n), G0 - 6, y, {sz:8.5, c: n === 0 ? C.tx2 : C.tx3, al:'right'});
  });
  txt(g, 'r/min', G0 - 6, H0 - 14, {sz:8.5, c:C.tx3, al:'right'});
  for(let s = 0; s <= TM3; s += 1){
    const x = px3(s);
    seg(g, [[x, H1],[x, H1 + 4]], C.boxLine, .8);
    txt(g, s + ' s', x, H1 + 13, {sz:8.5, c:C.tx3});
  }
  /* 别的两档画淡，当前这档画粗 */
  [0, 1, 2].forEach(function(j){
    const pts = [];
    for(let s = 0; s <= TM3 + 0.001; s += 0.04) pts.push([px3(s), py3(n3(s, j))]);
    g.save(); g.globalAlpha = j === k ? 1 : .22;
    new Path(pts).stroke(g, j === k ? 2.6 : 1.4,
      j === k ? (j === 2 ? C.err : (j === 1 ? C.warn : C.ok)) : C.tx3);
    g.restore();
  });
  /* 断开那一点 */
  if(k !== 2){
    const off = OFFN[k], tOff = T_BRK * (1 - off / N0);
    const x = px3(tOff), y = py3(off);
    g.save(); g.setLineDash([3,3]); g.strokeStyle = C.tx3; g.lineWidth = 1;
    g.beginPath(); g.moveTo(x, H0); g.lineTo(x, H1); g.stroke(); g.restore();
    dot(g, x, y, k === 1 ? C.warn : C.ok, 4.5);
    EP.chip(g, 'KS 断开', x + 5, y - 14, {sz:8.5, c: k === 1 ? C.warn : C.ok, al:'left'});
  } else {
    EP.chip(g, '反着起动起来了', 300, py3(-620), {sz:9, b:1, c:C.err, al:'right'});
  }

  if(k === 0) conc(g, 196, 'ok', '正常：降到 100 转，KS 把 KM2 断掉，剩下一点点自己停',
    '全程约 2 秒 —— 这就是反接制动该有的样子');
  else if(k === 1) conc(g, 196, 'warn', '断早了：500 转就撒手，剩下的只能自由滑行',
    '制动等于只做了一半，还要再拖十几秒');
  else conc(g, 196, 'err', '没断开：转速穿过零，电动机反着起动起来',
    '这不是「停不下来」，是反着冲出去 —— 书上专门写了这一条');

  $('s3a').textContent = k === 0 ? '100' : (k === 1 ? '500' : '不断开');
  $('s3b').textContent = k === 0 ? '正常停住' : (k === 1 ? '停得慢' : '反转起来');
  $('s3c').textContent = k === 0 ? '约 2 s' : (k === 1 ? '十几秒' : '停不住');
}
function note3(){
  const k = S3.k;
  let h;
  if(k === 0) h = '<b>转速降到 100 r/min，KS 的触点靠弹簧复位断开</b>，KM2 线圈失电，'
    + '主触头切断制动电源。剩下那一百来转靠惯性，眨眼就没了。'
    + '<b>整个过程约 2 秒，而自由停车要 20 秒</b>（屏 1 那两条曲线）。';
  else if(k === 1) h = '<b>断早了会怎么样：制动只做了一半。</b>'
    + '500 转的时候就把 KM2 断掉，剩下的 500 转没人管，只能自由滑行 —— '
    + '而<b>低速段正是自由停车最慢的那一段</b>，又得拖十几秒。'
    + '现场表现是「制动了一下，然后还在慢慢转」。<b>速度继电器的动作值一般是可调的</b>，'
    + '调低一点就好了。';
  else h = '<b class="rd">KS 没断开，是这一节最危险的故障。</b>'
    + '转速降到零之后制动电源还接着，那就是一台按反向相序<b>全压直接起动</b>的电动机 —— '
    + '它会一路反向加速到额定转速。'
    + '书上把这一条写进了定义里：<b>「最后通过速度继电器自动切断制动电源，'
    + '确保电动机不会反转」</b>。'
    + '对卷扬机、机床主轴这类设备，反着冲出去比停不下来严重得多。';
  $('n2').innerHTML = h;
}

/* ================================================================
   场景 4：控制电路（书上图 11-14）
   ================================================================ */
const st4 = new Stage('cv3', 360, 336);
const CT4 = 52, SUB4 = 100, CB4 = 286;
const B1 = 90, LK1 = 52, B2 = 200, B3 = 300, LK2 = 252;
const KT_D4 = 1.5;
const S4 = { ph:'stop', t:0, n:0 };
function w4(g, pts, live, lw){ seg(g, pts, live ? C.acc : C.wire, lw || 1.8); }
function draw4(dt){
  const g = st4.g; st4.clear();
  if(dt){
    if(S4.ph === 'delay'){
      S4.t += dt;
      if(S4.t >= KT_D4){ S4.ph = 'brake'; S4.t = 0; note4(); }
    } else if(S4.ph === 'brake'){
      S4.t += dt;
      S4.n -= N0 / T_BRK * dt;
      if(S4.n <= KS_N){ S4.n = 0; S4.ph = 'stop'; note4(); }
    }
  }
  const km1 = S4.ph === 'run', ktL = S4.ph === 'delay', km2 = S4.ph === 'brake';
  const ks = S4.n > KS_N, sb1 = ktL;
  const kt1 = km2 && S4.t < 0.6;   /* 只在交接那一下闭合 */
  EP.heading(g, 14, 16, '反接制动控制电路', '图 11-14（主电路见屏 2）');

  w4(g, [[20, CT4],[340, CT4]], true, 2);
  w4(g, [[20, CB4],[340, CB4]], true, 2);
  txt(g, 'FU1', 20, CT4 - 9, {sz:8.5, c:C.tx3, al:'left'});
  txt(g, 'FU2', 20, CB4 - 11, {sz:8.5, c:C.tx3, al:'left'});
  /* FR-1 串在总进线上，三条支路都归它管 */
  w4(g, [[44, CT4],[44, 69]], true);
  ncC(g, 44, 82, false, 0.9);
  txt(g, 'FR-1', 32, 82, {sz:8.5, b:1, c:C.tx3, al:'right'});
  w4(g, [[44, 95],[44, SUB4],[B3, SUB4]], true, 2);
  dot(g, B1, SUB4, C.wire, 2.4); dot(g, B2, SUB4, C.wire, 2.4);

  /* ---- KM1（正转）支路 ---- */
  w4(g, [[B1, SUB4],[B1, 112]], true);
  btn(g, B1, 126, true, sb1);
  txt(g, 'SB1-2', 78, 126, {sz:8.5, b:1, c: sb1 ? C.err : C.tx3, al:'right'});
  w4(g, [[B1, 140],[B1, 152]], !sb1);
  btn(g, B1, 166, false, false);
  txt(g, 'SB2', 120, 166, {sz:8.5, b:1, c:C.tx3, al:'left'});
  w4(g, [[B1, 150],[LK1, 150],[LK1, 153]], !sb1, 1.6);
  noC(g, LK1, 166, km1, 0.9);
  w4(g, [[LK1, 179],[LK1, 190],[B1, 190]], km1, 1.6);
  txt(g, 'KM1-2', 30, 166, {sz:8.5, b:1, c: km1 ? C.acc : C.tx3, al:'right'});
  dot(g, B1, 150, C.wire, 2.4); dot(g, B1, 190, C.wire, 2.4);
  w4(g, [[B1, 180],[B1, 201]], km1);
  ncC(g, B1, 214, km2, 0.9);
  txt(g, 'KM2-3', 78, 214, {sz:8.5, b:1, c: km2 ? C.err : C.tx3, al:'right'});
  w4(g, [[B1, 227],[B1, 234]], km1);
  coil(g, B1, 254, km1, 'KM1');
  w4(g, [[B1, 274],[B1, CB4]], km1);

  /* ---- KT 支路 ---- */
  w4(g, [[B2, SUB4],[B2, 112]], true);
  btn(g, B2, 126, false, sb1);
  txt(g, 'SB1-1', 188, 126, {sz:8.5, b:1, c: sb1 ? C.acc : C.tx3, al:'right'});
  w4(g, [[B2, 140],[B2, 151]], sb1);
  ncC(g, B2, 164, km1, 0.9);
  txt(g, 'KM1-3', 188, 164, {sz:8.5, b:1, c: km1 ? C.err : C.tx3, al:'right'});
  w4(g, [[B2, 177],[B2, 214]], ktL);
  coil(g, B2, 234, ktL, 'KT');
  w4(g, [[B2, 254],[B2, CB4]], ktL);

  /* ---- KM2（反接）支路 ---- */
  w4(g, [[B3, SUB4],[B3, 112]], true);
  ktC(g, B3, 126, kt1);
  txt(g, 'KT-1', 318, 126, {sz:8.5, b:1, c: kt1 ? C.acc : C.tx3, al:'left'});
  w4(g, [[B3, 112],[LK2, 112],[LK2, 113]], true, 1.6);
  noC(g, LK2, 126, km2, 0.9);
  w4(g, [[LK2, 139],[LK2, 148],[B3, 148]], km2, 1.6);
  txt(g, 'KM2-2', LK2, 158, {sz:8.5, b:1, c: km2 ? C.acc : C.tx3});
  dot(g, B3, 112, C.wire, 2.4); dot(g, B3, 148, C.wire, 2.4);
  w4(g, [[B3, 140],[B3, 165]], km2 || S4.ph === 'brake');
  noC(g, B3, 178, ks, 0.9);
  txt(g, 'KS', 318, 178, {sz:8.5, b:1, c: ks ? C.acc : C.tx3, al:'left'});
  w4(g, [[B3, 191],[B3, 214]], km2);
  coil(g, B3, 234, km2, 'KM2');
  w4(g, [[B3, 254],[B3, CB4]], km2);

  if(S4.ph === 'stop') conc(g, 296, 'warn', '停着 —— 按「起动 SB2」，转起来再按「制动 SB1」',
    'KS 现在是断的：转速为零，速度继电器的触点没被推合上');
  else if(km1) conc(g, 296, 'ok', '正转运行：KM1 吸着，KM1-3 把 KT 那条路堵死了',
    '正转的时候不许计时 —— 不然 KM2 会在 KM1 还吸着的时候吸上');
  else if(ktL) conc(g, 296, 'acc', 'KM1 已经断电，KT 在数那几十毫秒',
    '这段延时就是等 KM1 的触头完全弹回来');
  else conc(g, 296, 'err', '反接制动中：KM2 吸着，KM2-3 反过来把 KM1 堵死',
    'KS 还闭着 —— 转速一掉到 100 它就撒手');

  const a = S4.ph === 'stop' ? '停着' : (km1 ? '正转运行' : (ktL ? 'KT 延时中' : '反接制动'));
  const b = String(Math.round(S4.n));
  const c = km1 ? 'KM1' : (km2 ? 'KM2' : '都没有');
  if(S4.la !== a){ S4.la = a; $('s4a').textContent = a; }
  if(S4.lb !== b){ S4.lb = b; $('s4b').textContent = b; }
  if(S4.lc !== c){ S4.lc = c; $('s4c').textContent = c; }
}
function note4(){
  let h;
  if(S4.ph === 'stop') h = '所有触点画的都是<b>未操作状态</b>。'
    + '注意 <b>KS 现在是断开的</b> —— 速度继电器装在轴上，转速为零时它的触点是弹开的。'
    + '所以<b>停着的时候就算有人误碰 KT-1，KM2 也吸不上</b>，这是白送的一道保险。';
  else if(S4.ph === 'run') h = '<b>②③ KM1 得电，按 L1L2L3 的相序正转起动。</b>'
    + 'KM1-2 闭合自锁，松手也停不了；<b>KM1-3 断开，把 KT 那条支路堵住</b> —— '
    + '正转的时候绝不能让 KT 起来计时。这会儿转速已经上来，<b>KS 的触点也被推合上了</b>，'
    + '为一会儿制动做好了准备。';
  else if(S4.ph === 'delay') h = '<b>④ 按下制动按钮 SB1。</b>它有两对触点：'
    + '<b>SB1-2（动断）断开，KM1 立刻失电</b>；<b>SB1-1（动合）闭合，KT 开始计时</b>。'
    + '这段延时不是为了让电动机滑行，<b>是在等 KM1 的触头完全弹回来</b> —— '
    + '现场设得很短，零点几秒（这里放大成 1.5 秒才看得见）。';
  else h = '<b>⑥ KT-1 延时闭合，KM2 得电。</b>KM2-1 把两相对调，'
    + '磁场反过来推转子（屏 2 那一下），产生制动力矩。'
    + '<b>KM2-3 断开，反过来把 KM1 堵死。</b>'
    + '<b class="key">注意看 KT-1 已经又弹回去断开了</b> —— 松开制动按钮，'
    + 'SB1-1 复位，KT 跟着失电，它的延时触点当然要复位。'
    + '<b>这会儿维持 KM2 的是 KM2-2 那条自锁</b>，这正是 KM2-2 存在的理由。'
    + '接下来就等 <b>KS</b>：转速掉到 100 它一撒手，KM2 失电，全部复位。';
  $('n3').innerHTML = h;
}

/* ================================================================
   绑定
   ================================================================ */
function pick(id, st, fn){
  $(id).addEventListener('click', function(e){
    const b = e.target.closest('.btn'); if(!b) return;
    if(b.dataset.k === '2' && id === 's1k'){ S1.t = 0; return; }
    st.k = +b.dataset.k;
    document.querySelectorAll('#' + id + ' .btn').forEach(function(t){
      t.classList.toggle('on', +t.dataset.k === st.k);
    });
    fn();
  });
}
pick('s1k', S1, function(){ S1.t = 0; note1(); });
pick('s2k', S2, function(){ note2(); });
pick('s3k', S3, function(){ note3(); draw3(); });
$('s4k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  const k = b.dataset.k;
  if(k === 'go'){ S4.ph = 'run'; S4.n = N0; S4.t = 0; }
  else if(k === 'br'){ if(S4.ph === 'run'){ S4.ph = 'delay'; S4.t = 0; } }
  else { S4.ph = 'stop'; S4.n = 0; S4.t = 0; }
  note4();
});

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* 屏 3 是静态的，必须在这儿补画（屏 1/2/4 在 rAF 里） */
  draw3();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:11, sec:'11.5'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('11.5');
  let h = '';
  h += nb.prev && nb.prev.f ? '<a href="' + nb.prev.f + '">‹ ' + nb.prev.id + ' ' + nb.prev.t + '</a>'
                            : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next && nb.next.f ? '<a class="next" href="' + nb.next.f + '">' + nb.next.id + ' ' + nb.next.t + ' ›</a>'
                            : '<span>下一节还没做</span>';
  $('pager').innerHTML = h;
})();

loop(function(dt){
  if(cur === 0) draw1(dt);
  else if(cur === 1) draw2(dt);
  else if(cur === 3) draw4(dt);
});
  }
});
})();
