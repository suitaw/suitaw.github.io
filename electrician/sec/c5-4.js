/* 5.4 传感器的检测 —— 本节内容的唯一真相。
   对应《零基础学电工》第 5 章 5.4 节（书内 P85~P87）。

   四屏：① 变量法（这一节唯一的方法）② 温度传感器 ③ 湿敏与光敏 ④ 气敏与通则

   **这一节和前两节根本不同**：断路器、接触器那些器件有明确的应有读数
   （∞ 或 0Ω 或线圈那个具体阻值），量出来一比就知道好坏。
   传感器**没有**这样的标准值 —— 同一颗热敏电阻在 20 ℃ 和 30 ℃ 下量出来就是两个数。
   所以书上四小节讲的其实是同一件事：**改变它该感知的那个条件，看阻值动不动**。
   这就是屏 1 那条通则，后面三屏只是换了个条件（温度／湿度／光照／气体浓度）。

   数字口径（书上实测值，别凭记忆改）：
   - 热敏电阻常温（接近 25 ℃）实测 **350 Ω 左右**，接近标称值即为常温下正常（书 P85）
   - **阻值随温度升高而增大 → PTC（正温度系数）；随温度升高而减小 → NTC（负温度系数）**（书 P85）
   - 湿敏电阻：一般湿度 **756 Ω** → 明显增加湿度后 **334 Ω**（书 P86 图 5-11 的两个读数）
   - 光敏电阻：一般光照 **5.00 kΩ** → 较暗环境 **14.00 kΩ**（书 P86 图 5-12 的两个读数）
   - 气敏电阻：接入电路后测输出电压，书上实测 **6.20 V**（P87 图 5-13）

   曲线模型（都是按书上那两个实测点反解出来的，检查点在下面）：
   - NTC：B 值模型 `R = 350·exp(3950·(1/T − 1/298.15))`，T 为绝对温度。
     25 ℃ → 350 Ω（对上书上实测）；0 ℃ → 约 1.18 kΩ；50 ℃ → 约 125 Ω
   - PTC：沿用 2.4 节那个 DIN 44081 模型 `R = 80 + 300·exp((T−120)/3.5)`。
     **它和上面那颗 NTC 数值差很远是对的** —— 本来就是两种不同的器件
     （那是电动机埋置式热保护 PTC，Tref = 120 ℃）
   - 湿敏：`R = 2945·exp(−0.0272·RH)` Ω。**50 %RH → 756 Ω、80 %RH → 334 Ω**，
     正好是书上那两个实测点（这两个数就是拿来反解 A 和 k 的）
   - 光敏：`R = 5·(100/E)^0.65` kΩ。**100 lx → 5.00 kΩ、20 lx → 14.0 kΩ**，
     同样对上书上那两个读数 */
(function(){
'use strict';
ELEC.reg({
  id: '5.4',
  file: 'c5-4.html',
  title: '5.4 传感器的检测',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>变量法</button>
    <button class="tab" data-i="1"><span class="n">2</span>温度</button>
    <button class="tab" data-i="2"><span class="n">3</span>湿度与光照</button>
    <button class="tab" data-i="3"><span class="n">4</span>气敏与通则</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">传感器没有「应该是多少」，只有「该不该变」</div>
    断路器量出 ∞ 或 0Ω 就能定好坏，<b>传感器不行</b> ——
    同一颗热敏电阻在 20 ℃ 和 30 ℃ 下量出来就是两个数，哪个都不算错。
    所以检测传感器只有一个办法：<b>改变它该感知的那个条件，看阻值动不动。</b>
    <b>拖下面的滑杆改变温度试试。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">好的传感器</button>
        <button class="btn sm" data-k="1">灵敏度下降</button>
        <button class="btn sm" data-k="2">已经损坏</button>
      </div>
      <div class="rowlab">环境温度　<b id="s1t">25 ℃</b></div>
      <input type="range" id="s1r" min="0" max="80" step="1" value="25">
      <div class="nums three">
        <div class="num"><div class="k">现在读数</div><div class="v" id="s1a">350 Ω</div></div>
        <div class="num"><div class="k">变化</div><div class="v" id="s1b">跟着动</div></div>
        <div class="num hi"><div class="k">判定</div><div class="v" id="s1c">正常</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st good">一条通则，四种传感器通用</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>改变条件后</th><th>结论</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">阻值跟着<br>明显变化</td><td class="ok"><b>性能良好</b></td></tr>
        <tr><td class="eu-s">变化不明显<br>或几乎不变</td><td><b>灵敏度下降</b>或本身性能不良 —— 该换了</td></tr>
        <tr><td class="eu-s">趋于 0<br>或 ∞</td><td><b>已经损坏</b>（内部短路或断路）</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>「明显变化」是相对的</b>：热敏电阻从 350 Ω 变到 200 Ω 是明显，
      从 350 变到 348 就是不明显。<span class="sub">拿不准就<b>找一颗同型号的好件量一遍比</b> ——
      同样的条件变化，两颗的变化幅度应该差不多。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">怎么「改变条件」，用现场有的东西就行</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>传感器</th><th>怎么改变条件</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">温度</td><td><b>吹风机吹热</b>（书上就是这么做的）、手心捂、或者拿开放凉</td></tr>
        <tr><td class="eu-s">湿度</td><td>对着<b>哈口气</b>、拿湿棉签靠近</td></tr>
        <tr><td class="eu-s">光照</td><td>用手或纸片<b>遮光</b>、拿手电筒照</td></tr>
        <tr><td class="eu-s">气敏</td><td>需要<b>接入电路</b>，加上工作电压后再测（下面第 4 屏讲）</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>用指针表看这个「变」比数字表直观得多</b>：升温的过程中指针会<b>连续摆动</b>，
      一眼看出它在跟着走。数字表跳数字，反而不容易看出趋势。
      <span class="sub">书上那一段原话就是「万用表的指针随温度的变化而摆动，
      表明该热敏电阻基本正常」。</span>
    </div>
  </div>

  <div class="bet" data-bet="c54-var" data-q="量一颗热敏电阻，室温下读数 350Ω。这能说明它是好的吗？"
       data-opts="能，350Ω 接近标称值就是好的|不能——只能说明它常温下的阻值正常，还得改变温度看它动不动|不能，还要量绝缘" data-right="1"
       data-after="不能。350Ω 接近标称值只说明「常温下这一点」是对的，可传感器的本事是「随条件变化」。有一种坏法就是阻值卡在某个值上不动了——单点量完全看不出来。所以必须用吹风机吹热或者手心捂一下，看阻值跟不跟着走。"></div>
</section>

<!-- ================= 场景 2：温度传感器 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">升温之后往哪边走，决定了它是哪一种</div>
    热敏电阻分两种，<b>靠「升温后阻值往哪边走」来分</b>：
    <b>阻值随温度升高而减小是 NTC（负温度系数），随温度升高而增大是 PTC（正温度系数）。</b>
    <b>切一种，拖滑杆升温看看。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">NTC 负温度系数</button>
        <button class="btn sm" data-k="1">PTC 正温度系数</button>
      </div>
      <div class="rowlab">温度　<b id="s2t">25 ℃</b></div>
      <input type="range" id="s2r" min="0" max="140" step="1" value="25">
      <div class="nums three">
        <div class="num"><div class="k">这一颗</div><div class="v" id="s2a">NTC</div></div>
        <div class="num"><div class="k">现在阻值</div><div class="v" id="s2b">350 Ω</div></div>
        <div class="num hi"><div class="k">升温后</div><div class="v" id="s2c">变小</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">书上那次实测</div>
    <b>常温（接近 25 ℃）下测得的阻值约 350 Ω</b>，接近标称值，说明常温下正常。
    <b>然后用吹风机升高环境温度</b>，万用表的指针随温度变化而摆动 —— 基本正常。
    <div class="tip">
      <b>要是温度变化时阻值没变化或者变化不明显</b>，就是这颗热敏电阻
      <b>感应温度变化的灵敏度降低</b>或者本身性能不良了。
      <span class="sub">2.4 节画过四种温度传感器的曲线（NTC / PTC / Pt100 / 热电偶）——
      那一节讲的是「它们各自长什么样」，这一节讲的是「怎么用一支表把它验出来」。</span>
    </div>
  </div>

  <div class="bet" data-bet="c54-ntc" data-q="用吹风机吹热一颗热敏电阻，万用表读数从 350Ω 涨到 900Ω。这是哪一种？"
       data-opts="NTC，负温度系数|PTC，正温度系数——阻值随温度升高而增大|坏了，阻值不该涨" data-right="1"
       data-after="PTC，正温度系数。判别方法就这一句：升温后阻值变大是 PTC，变小是 NTC。这两种用途完全不同——NTC 常用来测温和做温度补偿，PTC 常埋在电动机绕组里做过热保护（超过居里点阻值陡增几十倍，控制电路一看就知道电动机过热了）。"></div>
</section>

<!-- ================= 场景 3：湿敏与光敏 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">换个条件，还是那一套</div>
    湿敏电阻感的是湿度，光敏电阻感的是光照。<b>检测方法一个字都不用改</b>：
    改变条件，看阻值动不动。<b>切一种，拖滑杆改变条件。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">湿敏电阻</button>
        <button class="btn sm" data-k="1">光敏电阻</button>
      </div>
      <div class="rowlab"><b id="s3lab">相对湿度</b>　<b id="s3t">50 %RH</b></div>
      <input type="range" id="s3r" min="0" max="100" step="1" value="50">
      <div class="nums three">
        <div class="num"><div class="k">这一颗</div><div class="v" id="s3a">湿敏电阻</div></div>
        <div class="num"><div class="k">现在阻值</div><div class="v" id="s3b">756 Ω</div></div>
        <div class="num hi"><div class="k">条件变强</div><div class="v" id="s3c">阻值变小</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">书上那两组实测数</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>器件</th><th>条件 A</th><th>条件 B</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">湿敏<br>电阻</td><td>一般湿度环境<br><b>756 Ω</b></td>
          <td>明显增加湿度<br><b>334 Ω</b></td></tr>
        <tr><td class="eu-s">光敏<br>电阻</td><td>一般光照强度<br><b>5.00 kΩ</b></td>
          <td>较暗环境<br><b>14.00 kΩ</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>这两颗都是「条件变强、阻值变小」</b>：湿度越大阻值越小，光照越强阻值越小。
      <span class="sub">和热敏电阻一样，也有<b>正</b>湿度系数的（阻值随湿度升高而增大），
      书上专门提了一句。所以判好坏看的仍然是<b>变不变</b>，不是往哪边变。</span>
    </div>
  </div>

  <div class="bet" data-bet="c54-ldr" data-q="遮住光敏电阻，读数从 5kΩ 变成 14kΩ；松开手又回到 5kΩ。这颗是好的吗？"
       data-opts="不好，阻值不稳定|好的——光照变强阻值变小、变暗阻值变大，跟着条件走就是好的|看不出来" data-right="1"
       data-after="好的。光敏电阻本来就是「光照越强阻值越小」，遮住变暗、阻值涨到 14kΩ，松开又回到 5kΩ——说明它对光的变化反应灵敏，而且能恢复。要是遮住之后阻值几乎不变，那就是灵敏度下降；要是一直是 0 或 ∞，那就是已经坏了。"></div>
</section>

<!-- ================= 场景 4：气敏与通则 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">气敏电阻要接进电路才测得了</div>
    前面三种直接量阻值就行，<b>气敏电阻不一样</b>：它需要一定的工作条件
    （内部有加热丝，要通电预热），所以<b>得先把它接进电路、加上工作电压</b>，
    再量电路里的<b>输出电压</b>随气体浓度怎么变。<b>拖滑杆改变气体浓度。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="rowlab">可燃气体浓度　<b id="s4t">很低</b></div>
      <input type="range" id="s4r" min="0" max="100" step="1" value="8">
      <div class="nums three">
        <div class="num"><div class="k">输出电压</div><div class="v" id="s4a">0.9 V</div></div>
        <div class="num"><div class="k">气敏阻值</div><div class="v" id="s4b">几十 kΩ</div></div>
        <div class="num hi"><div class="k">判定</div><div class="v" id="s4c">正常</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">这一节的四种传感器，一张表收尾</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>传感器</th><th>怎么测</th><th>好的表现</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">温度</td><td>直接量阻值，用吹风机升温</td><td>阻值跟着温度变（NTC 减／PTC 增）</td></tr>
        <tr><td class="eu-s">湿度</td><td>直接量阻值，哈气或用湿棉签</td><td>阻值跟着湿度变</td></tr>
        <tr><td class="eu-s">光照</td><td>直接量阻值，遮光或打手电</td><td>阻值跟着光照变</td></tr>
        <tr><td class="eu-s">气敏</td><td><b>接入电路加工作电压</b>，量输出电压</td><td>输出电压跟着气体浓度变</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>共同点只有一条：看它对条件的变化有没有反应。</b>
      <span class="sub">2.4 节讲过这些传感器在电路里怎么接、NPN 和 PNP 接近开关怎么选，
      那是「怎么用」；这一节是「怎么验」。两节配着看。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">在路测传感器，读数只会偏小</div>
    传感器多半已经焊在板子上或者接在电路里，<b>旁边并着别的元件</b>。
    这时量出来的是<b>它和旁边那些东西的并联值，一定比真值小</b>（3.6b 屏 1 讲过）。
    <div class="tip">
      所以：<b>量到偏小的值不能直接下结论</b>，得拆下一头再量；
      <b>量到偏大或者 ∞ 倒是可以直接判它断了</b> —— 并联只会让读数变小，
      不可能让它变大。
      <span class="sub">小型传感器（热敏、光敏）多是两个引脚，<b>拆一头就够了</b>，
      不用整个拆下来。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="c5-4">
    <div class="qz" data-q="传感器的检测和断路器、接触器的检测，最根本的差别是什么？"
         data-opts="传感器更小更精密|断路器有明确的应有读数（∞ 或 0Ω），传感器没有——只能改变它该感知的条件，看阻值动不动|传感器要用专用仪表"
         data-right="1"
         data-why="有没有「应有读数」。断路器断开就该是 ∞、闭合就该是 0Ω，量出来一比就知道。传感器不行：同一颗热敏电阻在 20℃ 和 30℃ 下量出来就是两个数，哪个都不算错。所以只能用变量法——改变温度／湿度／光照，看阻值跟不跟着动。"></div>
    <div class="qz" data-q="用吹风机吹热一颗热敏电阻，阻值从 350Ω 降到 120Ω。这是哪一种，好还是坏？"
         data-opts="NTC，好的——阻值随温度升高而减小，而且跟着条件明显变化|PTC，好的|坏了，阻值不该降这么多"
         data-right="0"
         data-why="NTC（负温度系数），而且是好的。判别就一句：升温后阻值变小是 NTC，变大是 PTC。至于好坏，看的是「有没有明显变化」——从 350 降到 120 是很明显的变化，说明它对温度反应灵敏。要是吹了半天还是 348Ω，那才是灵敏度下降。"></div>
    <div class="qz" data-q="气敏电阻为什么不能像热敏电阻那样直接拿表量阻值？"
         data-opts="它阻值太大，表量不了|它需要一定的工作条件（内部有加热丝要预热），得接进电路加上工作电压后，量电路的输出电压变化|它是数字输出的"
         data-right="1"
         data-why="它需要工作条件。气敏电阻内部有加热丝，要通电预热到工作温度才对气体敏感。所以检测时要把它接进一个电路、加上工作电压，然后在普通环境和高浓度气体环境下分别量电路的输出电压，看它变不变（书上那次实测是 6.20V）。"></div>
    <div class="qz" data-q="一颗热敏电阻还焊在板子上，量出来 180Ω，比标称的 350Ω 小不少。能判它坏了吗？"
         data-opts="能，偏离标称值太多|不能——在路测量到的是它和旁边元件的并联值，一定偏小；得拆一头再量|能，一定是短路了"
         data-right="1"
         data-why="不能。在路测电阻，旁边并联的支路会把读数拉小（3.6b 屏 1 讲过：并联只会让读数变小）。所以量到偏小不能下结论，要拆一头再量。反过来，量到偏大或者 ∞ 倒是可以直接判它断了——并联不可能让读数变大。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 5 章 5.4 节（书内 P85~P87）<br>湿敏 756/334 Ω、光敏 5.00/14.00 kΩ、热敏常温 350 Ω、气敏输出 6.20 V 都是书上的实测值</div>
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

const CANH = 268;

/* ================================================================
   四个模型 —— 都是拿书上那两个实测点反解出来的
   ================================================================ */
function rNTC(t){ return 350 * Math.exp(3950 * (1/(t + 273.15) - 1/298.15)); }
function rPTC(t){ return 80 + 300 * Math.exp((t - 120) / 3.5); }
function rHum(rh){ return 2945 * Math.exp(-0.0272 * rh); }       /* 50→756Ω  80→334Ω */
function rLux(e){ return 5 * Math.pow(100 / Math.max(e, 1), 0.65); }  /* 100lx→5kΩ 20lx→14kΩ */

function fmtR(r){
  if(r >= 1000) return (r/1000).toFixed(2) + ' kΩ';
  return Math.round(r) + ' Ω';
}
function fmtRs(r){   /* 给 LCD 用的短写法 */
  if(r >= 1000) return (r/1000).toFixed(2);
  return r >= 100 ? Math.round(r) + '' : r.toFixed(1);
}
function unitOf(r){ return r >= 1000 ? 'kΩ' : 'Ω'; }

function tip(g, x, y, red){
  const c = red ? C.err : C.tx;
  g.save();
  g.fillStyle = c; g.beginPath(); g.arc(x, y, 3.4, 0, Math.PI*2); g.fill();
  g.globalAlpha = .45; g.strokeStyle = c; g.lineWidth = 1.3;
  g.beginPath(); g.arc(x, y, 6.6, 0, Math.PI*2); g.stroke();
  g.restore();
}
/* 一颗两脚小元件（热敏／湿敏／光敏都长这样，只是本体不同） */
function part(g, cx, cy, o){
  o = o || {};
  g.save();
  g.strokeStyle = P.steel || C.metal; g.lineWidth = 2.2; g.lineCap = 'round';
  g.beginPath(); g.moveTo(cx - 46, cy); g.lineTo(cx - 13, cy);
  g.moveTo(cx + 13, cy); g.lineTo(cx + 46, cy); g.stroke();
  g.restore();
  if(o.disc){
    /* 圆片状（热敏、光敏） */
    g.save();
    g.beginPath(); g.arc(cx, cy, 13, 0, Math.PI*2);
    g.fillStyle = o.fill || (P.ceramic || C.box); g.fill();
    g.strokeStyle = C.boxLine; g.lineWidth = 1.2; g.stroke();
    if(o.grid){
      /* 光敏电阻表面那条蛇形光敏层 */
      g.strokeStyle = o.grid; g.lineWidth = 1.4;
      for(let i = -1; i <= 1; i++){
        g.beginPath(); g.moveTo(cx - 8, cy + i*5); g.lineTo(cx + 8, cy + i*5); g.stroke();
      }
    }
    g.restore();
  }else{
    box(g, cx - 15, cy - 9, 30, 18, 3, o.fill || (P.cream || C.box), C.boxLine, 1.2);
  }
  if(o.name) txt(g, o.name, cx, cy + 26, {sz:9, b:1, c:C.tx2});
  return [[cx - 42, cy], [cx + 42, cy]];
}
/* 条件示意：一根温度计柱／一排光线／几滴水 */
function gauge(g, x, y, w, h, frac, color, label, val){
  box(g, x, y, w, h, 4, C.box, C.boxLine, 1.1);
  const fh = Math.max(2, (h - 4) * Math.max(0, Math.min(1, frac)));
  box(g, x + 2, y + h - 2 - fh, w - 4, fh, 3, color, null, 0);
  txt(g, label, x + w/2, y - 10, {sz:8.5, c:C.tx3});
  txt(g, val, x + w/2, y + h + 12, {sz:9.5, b:1, c:color});
}
function bar(g, l1, l2, kind, y){
  const Y = y || 222;
  const bg = kind === 'ok' ? C.okbg : kind === 'err' ? C.errbg : kind === 'warn' ? C.warnbg : C.accbg;
  const fg = kind === 'ok' ? C.ok : kind === 'err' ? C.err : kind === 'warn' ? C.warn : C.acc;
  EC.box(g, 18, Y, 324, 38, 6, bg, fg, 1);
  txt(g, l1, 180, Y + 13, {sz:10.5, b:1, c:fg});
  txt(g, l2, 180, Y + 28, {sz:9, c:C.tx2});
}
/* 万用表：这一节固定摆在右边 */
const MT = {x:216, y:104, w:126, h:88};
function meter(g, read, unit, pts){
  const jacks = EP.meterUnit(g, MT.x, MT.y, MT.w, MT.h,
    {mode:unit, reading:read, rsz:16,
     jacks:[{n:'COM'}, {n:'VΩ', red:true}], hot:1});
  if(pts){
    EP.leads(g, jacks[1], jacks[0], pts[0][0], pts[1][0],
             {yTop:26, yBot:196, tipY:pts[0][1]});
    tip(g, pts[0][0], pts[0][1], true);
    tip(g, pts[1][0], pts[1][1], false);
  }
}

/* ================================================================
   场景 1：变量法
   ================================================================ */
const S1 = { k:0, t:25 };
const st1 = new Stage('cv0', 360, CANH);

/* k=0 好的（跟着变）/ 1 灵敏度下降（只动一点点）/ 2 坏了（卡在一个值） */
function val1(){
  const good = rNTC(S1.t);
  if(S1.k === 0) return good;
  if(S1.k === 1) return 350 + (good - 350) * 0.06;
  return 0;
}
function draw1(){
  const g = st1.g; st1.clear();
  const r = val1();
  EP.heading(g, 12, 14, '热敏电阻', '改变温度，看阻值动不动');
  const pins = part(g, 108, 88, {disc:true, fill:'#2a2f36', name:'热敏电阻 NTC'});
  gauge(g, 26, 44, 16, 92, S1.t/80, S1.t > 45 ? C.err : C.acc, '温度', S1.t + ' ℃');
  meter(g, S1.k === 2 ? '0.0' : fmtRs(r), S1.k === 2 ? 'Ω' : unitOf(r), pins);
  /* 变化条：以 25 ℃ 时为基准，画出偏离多少 */
  const base = S1.k === 2 ? 0 : (S1.k === 1 ? 350 : 350);
  const dev = S1.k === 2 ? 0 : Math.abs(r - base) / base;
  /* 这条变化条只能占万用表左边那一半 —— 铺满 26~342 正好盖住表身（截图抓到的） */
  box(g, 26, 156, 176, 26, 5, C.box, C.boxLine, 1);
  const fw = Math.min(1, dev / 2) * 172;
  if(fw > 2) box(g, 28, 158, fw, 22, 4, S1.k === 0 ? C.ok : C.warn, null, 0);
  txt(g, S1.k === 2 ? '一直是 0Ω' : '比 25 ℃ 变了 ' + Math.round(dev * 100) + '%',
      114, 169, {sz:9.5, b:1, c:C.tx});
  const T = [['阻值跟着温度明显变化', '这颗传感器是好的'],
             ['温度变了阻值几乎不动', '灵敏度下降或本身性能不良 —— 该换了'],
             ['阻值趋于 0，怎么变都不动', '已经损坏（内部短路）']];
  bar(g, T[S1.k][0], T[S1.k][1], S1.k === 0 ? 'ok' : 'err');
}
function note1(){
  const r = val1();
  $('s1t').textContent = S1.t + ' ℃';
  $('s1a').textContent = S1.k === 2 ? '0 Ω' : fmtR(r);
  $('s1b').textContent = S1.k === 0 ? '跟着动' : (S1.k === 1 ? '几乎不动' : '完全不动');
  $('s1c').textContent = S1.k === 0 ? '正常' : (S1.k === 1 ? '灵敏度下降' : '已损坏');
  let h = '';
  if(S1.k === 0) h =
    '<div class="st good">好的传感器：阻值跟着温度走</div>' +
    '常温 25 ℃ 时约 <b>350 Ω</b>（书上实测的就是这个数），' +
    '温度一升，阻值明显往下掉。<b>「明显」这两个字才是判据</b>。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>用指针表看这个过程比数字表直观</b>：吹风机一吹，指针连续往一边摆，' +
    '一眼看出它在跟着走。<span class="sub">书上原话：「万用表的指针随温度的变化而摆动，' +
    '表明该热敏电阻基本正常」。</span></div>';
  else if(S1.k === 1) h =
    '<div class="st bad">灵敏度下降：温度变了，阻值几乎不动</div>' +
    '常温下量出来还是 350 Ω 左右，<b>单看这一个数完全正常</b> ——' +
    '可吹热了半天，读数才动了几欧。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>这就是为什么不能只量一次。</b>这颗传感器装回去，' +
    '温度真的升高时它也不会给出正确的信号，<b>该报警的时候不报警</b>。' +
    '<span class="sub">书上原话：「若温度变化时阻值不变化，' +
    '则说明该热敏电阻感应温度变化的灵敏度降低或性能不良」。</span></div>';
  else h =
    '<div class="st bad">已损坏：阻值趋于 0（或 ∞），怎么变都不动</div>' +
    '内部短路了（趋于 0）或者断了（趋于 ∞）。' +
    '<b>这种最容易判断</b> —— 读数是个极端值，而且完全不随条件变化。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>不过要先排除表笔和接线</b>：读到 0Ω 之前先把两支表笔分开看是不是回到 ∞，' +
    '读到 ∞ 之前先把两支笔碰一起看是不是回到 0Ω。' +
    '<span class="sub">表笔线内部断了、鳄鱼夹咬在绝缘皮上，都会给出一模一样的假象。</span></div>';
  $('n0').innerHTML = h;
}
function sync1(){ note1(); draw1(); }
document.getElementById('s1k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S1.k = +t.dataset.k;
  document.querySelectorAll('#s1k .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.k === S1.k); });
  sync1();
});
document.getElementById('s1r').addEventListener('input', function(e){ S1.t = +e.target.value; sync1(); });

/* ================================================================
   场景 2：NTC / PTC
   ================================================================ */
const S2 = { k:0, t:25 };
const st2 = new Stage('cv1', 360, CANH);
function val2(){ return S2.k === 0 ? rNTC(S2.t) : rPTC(S2.t); }

function draw2(){
  const g = st2.g; st2.clear();
  const r = val2(), ntc = S2.k === 0;
  EP.heading(g, 12, 14, ntc ? 'NTC 热敏电阻' : 'PTC 热敏电阻',
             ntc ? '升温 → 阻值变小' : '升温 → 阻值变大');
  const pins = part(g, 108, 88, {disc:true, fill:'#2a2f36', name: ntc ? 'NTC' : 'PTC'});
  gauge(g, 26, 44, 16, 92, S2.t/140, S2.t > 80 ? C.err : C.acc, '温度', S2.t + ' ℃');
  meter(g, fmtRs(r), unitOf(r), pins);
  /* 一条小曲线：把 0~140 ℃ 的走势画出来，当前点标一个圈 */
  const GX = 26, GY = 152, GW = 316, GH = 46;
  box(g, GX, GY, GW, GH, 5, C.box, C.boxLine, 1);
  const f = ntc ? rNTC : rPTC;
  let mx = 0;
  for(let t = 0; t <= 140; t += 4) mx = Math.max(mx, Math.log10(f(t) + 1));
  let mn = 99;
  for(let t = 0; t <= 140; t += 4) mn = Math.min(mn, Math.log10(f(t) + 1));
  g.save();
  g.strokeStyle = C.acc; g.lineWidth = 2; g.lineJoin = 'round'; g.beginPath();
  for(let t = 0; t <= 140; t += 2){
    const px = GX + 4 + (GW - 8) * t / 140;
    const py = GY + GH - 5 - (GH - 10) * (Math.log10(f(t) + 1) - mn) / (mx - mn || 1);
    if(t === 0) g.moveTo(px, py); else g.lineTo(px, py);
  }
  g.stroke(); g.restore();
  const cx = GX + 4 + (GW - 8) * S2.t / 140;
  const cy = GY + GH - 5 - (GH - 10) * (Math.log10(r + 1) - mn) / (mx - mn || 1);
  g.save(); g.fillStyle = C.warn; g.beginPath(); g.arc(cx, cy, 4, 0, Math.PI*2); g.fill(); g.restore();
  txt(g, '0 ℃', GX + 12, GY + GH - 6, {sz:7.5, c:C.tx3});
  txt(g, '140 ℃', GX + GW - 16, GY + GH - 6, {sz:7.5, c:C.tx3});
  txt(g, '阻值（对数刻度）', GX + GW/2, GY + 9, {sz:7.5, c:C.tx3});

  bar(g, ntc ? '升温阻值变小 —— 负温度系数 NTC' : '升温阻值变大 —— 正温度系数 PTC',
      ntc ? '常用来测温、做温度补偿' : '常埋在电动机绕组里做过热保护', 'ok');
}
function note2(){
  const r = val2(), ntc = S2.k === 0;
  $('s2t').textContent = S2.t + ' ℃';
  $('s2a').textContent = ntc ? 'NTC' : 'PTC';
  $('s2b').textContent = fmtR(r);
  $('s2c').textContent = ntc ? '变小' : '变大';
  $('n1').innerHTML = ntc ?
    '<div class="st">NTC：温度越高，阻值越小</div>' +
    '<b>负温度系数（Negative Temperature Coefficient）。</b>' +
    '常温 25 ℃ 约 350 Ω，升到 50 ℃ 大概剩一百多欧，降到 0 ℃ 能涨到一千多欧。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>它是最常见的一种</b>，用来测温度（阻值换算成温度）、做温度补偿、' +
    '还有电源里的<b>抑制浪涌</b>（刚上电时它是凉的、阻值大，限制冲击电流；' +
    '通电一会儿自己发热、阻值降下来，不影响正常工作）。' +
    '<span class="sub">2.4 节画过它的完整曲线（那一节用的是 R25 = 10 kΩ 的一颗，' +
    '和这里 350 Ω 这颗是不同规格，形状一样）。</span></div>'
    :
    '<div class="st">PTC：温度越高，阻值越大</div>' +
    '<b>正温度系数（Positive Temperature Coefficient）。</b>' +
    '常温下阻值很低（几十欧），<b>过了某个温度（居里点）阻值会陡增几十倍上百倍</b> ——' +
    '把滑杆拖到 120 ℃ 以上看那条曲线怎么翘起来。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>正因为这个陡增，它特别适合做过热保护</b>：埋在电动机绕组里，' +
    '绕组一过热它的阻值就跳上去，控制电路一看就知道该停机了。' +
    '<span class="sub">这里画的是电动机埋置式热保护 PTC（Tref = 120 ℃，' +
    '2.4 节按 DIN 44081 那几个检查点凑过参数）。<b>它和上面那颗 NTC 数值差很远是对的</b> ——' +
    '本来就是两种不同的器件。</span></div>';
}
function sync2(){ note2(); draw2(); }
document.getElementById('s2k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S2.k = +t.dataset.k;
  document.querySelectorAll('#s2k .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.k === S2.k); });
  sync2();
});
document.getElementById('s2r').addEventListener('input', function(e){ S2.t = +e.target.value; sync2(); });

/* ================================================================
   场景 3：湿敏与光敏
   ================================================================ */
const S3 = { k:0, v:50 };
const st3 = new Stage('cv2', 360, CANH);
function val3(){
  if(S3.k === 0) return rHum(S3.v);
  /* 光照：滑杆 0~100 映射到 5~500 lx */
  return rLux(5 + S3.v * 4.95) * 1000;
}
function lux3(){ return Math.round(5 + S3.v * 4.95); }

function draw3(){
  const g = st3.g; st3.clear();
  const r = val3(), hum = S3.k === 0;
  EP.heading(g, 12, 14, hum ? '湿敏电阻' : '光敏电阻', '条件变强 → 阻值变小');
  const pins = part(g, 108, 88,
    hum ? {fill:'#2b3540', name:'湿敏电阻'} : {disc:true, fill:'#2f2a20', grid:'#c8a02e', name:'光敏电阻'});
  gauge(g, 26, 44, 16, 92, hum ? S3.v/100 : (lux3()/500),
        hum ? C.N : C.lamp, hum ? '湿度' : '光照',
        hum ? S3.v + '%' : lux3() + ' lx');
  meter(g, fmtRs(r), unitOf(r), pins);

  /* 书上那两个实测点，标在一条数轴上 */
  const GX = 26, GY = 152, GW = 316, GH = 46;
  box(g, GX, GY, GW, GH, 5, C.box, C.boxLine, 1);
  const A = hum ? [50, 756, '一般湿度'] : [100, 5000, '一般光照'];
  const B = hum ? [80, 334, '增加湿度'] : [20, 14000, '较暗环境'];
  txt(g, A[2] + '　' + fmtR(A[1]), GX + GW*0.27, GY + 17, {sz:9, b:1, c:C.tx2});
  txt(g, B[2] + '　' + fmtR(B[1]), GX + GW*0.73, GY + 17, {sz:9, b:1, c:C.tx2});
  txt(g, '书上这两个实测数，就是上面那条曲线的两个锚点', GX + GW/2, GY + 35, {sz:8, c:C.tx3});

  bar(g, hum ? '湿度越大，阻值越小' : '光照越强，阻值越小',
      '判好坏看的是「变不变」，不是往哪边变 —— 也有正系数的器件', 'ok');
}
function note3(){
  const r = val3(), hum = S3.k === 0;
  $('s3lab').textContent = hum ? '相对湿度' : '光照强度';
  $('s3t').textContent = hum ? (S3.v + ' %RH') : (lux3() + ' lx');
  $('s3a').textContent = hum ? '湿敏电阻' : '光敏电阻';
  $('s3b').textContent = fmtR(r);
  $('s3c').textContent = '阻值变小';
  $('n2').innerHTML = hum ?
    '<div class="st">湿敏电阻：哈口气就能验</div>' +
    '书上那次实测：<b>一般湿度环境 756 Ω，明显增加湿度后 334 Ω</b>。' +
    '现场不用什么设备 —— <b>对着它哈口气</b>，或者拿湿棉签靠近，读数就该往下走。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>阻值随湿度升高而减小的叫负湿度系数，反过来叫正湿度系数</b>，两种都有。' +
    '所以判好坏看的是<b>变不变</b>，不是往哪边变。' +
    '<span class="sub">若湿度变了阻值无变化或变化不明显，多为灵敏度降低或性能异常；' +
    '若阻值趋于零或无穷大，则已经损坏 —— 书上原话。</span></div>'
    :
    '<div class="st">光敏电阻：用手一遮就能验</div>' +
    '书上那次实测：<b>一般光照强度 5.00 kΩ，较暗环境 14.00 kΩ</b>。' +
    '拿手或者一张纸<b>遮住它</b>，读数应该明显往上涨；拿手电筒照，往下掉。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>光敏电阻表面那几道弯弯曲曲的线</b>就是光敏材料（硫化镉之类），' +
    '做成蛇形是为了在小面积上做出足够长的感光路径。' +
    '<span class="sub">若光照强度变化时阻值无变化或变化不明显，' +
    '多为感应光线变化的灵敏度降低或本身性能不良 —— 书上原话。</span></div>';
}
function sync3(){ note3(); draw3(); }
document.getElementById('s3k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S3.k = +t.dataset.k;
  S3.v = S3.k === 0 ? 50 : 20;
  document.getElementById('s3r').value = S3.v;
  document.querySelectorAll('#s3k .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.k === S3.k); });
  sync3();
});
document.getElementById('s3r').addEventListener('input', function(e){ S3.v = +e.target.value; sync3(); });

/* ================================================================
   场景 4：气敏
   ================================================================
   气敏电阻接在 12 V 电路里：R1 串气敏、R2 取样，量 R2 上的电压。
   浓度越高 → 气敏阻值越小 → 分压给 R2 的越多 → 输出电压越高。
   书上实测输出 6.20 V，对应这里滑杆约 55% 的位置。 */
const S4 = { v:8 };
const st4 = new Stage('cv3', 360, 300);
function volt4(){
  /* 气敏阻值 30 kΩ（洁净）→ 1 kΩ（高浓度），对数插值；R2 = 4.7 kΩ */
  const rg = 30000 * Math.pow(1/30, S4.v/100);
  return 12 * 4700 / (rg + 4700);
}
function draw4(){
  const g = st4.g; st4.clear();
  const v = volt4();
  EP.heading(g, 12, 14, '气敏电阻', '接进电路，量输出电压');
  /* 一个简单的分压电路 */
  const LX = 40, RX = 150, TY = 48, BY = 140;
  new Path([[LX,TY],[RX,TY]]).stroke(g, 2, C.wire);
  new Path([[LX,BY],[RX,BY]]).stroke(g, 2, C.wire);
  new Path([[LX,TY],[LX,BY]]).stroke(g, 2, C.wire);
  new Path([[RX,TY],[RX,84]]).stroke(g, 2, C.wire);
  new Path([[RX,110],[RX,BY]]).stroke(g, 2, C.wire);
  /* 电源 */
  EC.battery(g, LX, (TY+BY)/2, {horiz:false, long:22, short:12, gap:8});
  txt(g, '12 V', LX - 8, (TY+BY)/2, {sz:9, b:1, c:C.tx2, al:'right'});
  /* 气敏电阻在上面那一段 */
  box(g, RX - 15, 62, 30, 22, 3, '#2b3540', C.boxLine, 1.2);
  txt(g, '气敏', RX + 22, 73, {sz:8.5, b:1, c:C.tx2, al:'left'});
  /* 取样电阻 R2 */
  box(g, RX - 15, 106, 30, 22, 3, P.cream || C.box, C.boxLine, 1.2);
  txt(g, 'R2', RX + 22, 117, {sz:8.5, b:1, c:C.tx2, al:'left'});
  /* 浓度示意：放最右边，别压到「气敏」「R2」那两个标注 */
  gauge(g, 230, 50, 14, 84, S4.v/100, S4.v > 40 ? C.err : C.ok, '浓度',
        S4.v < 15 ? '很低' : (S4.v < 45 ? '中等' : '很高'));
  /* 万用表量 R2 两端。**档位字不能写 ⎓（U+2393）** —— 截图环境里是豆腐块，
     全站的老规矩（c00 那次栽过），直接写 DCV */
  const jacks = EP.meterUnit(g, 216, 152, 126, 82,
    {mode:'DCV', reading:v.toFixed(2), rsz:16,
     jacks:[{n:'COM'}, {n:'VΩ', red:true}], hot:1});
  EP.leads(g, jacks[1], jacks[0], RX, RX,
           {yTop:26, yBot:146, tipYR:95, tipYB:BY});
  tip(g, RX, 95, true); tip(g, RX, BY, false);

  bar(g, '输出电压跟着气体浓度变 —— 这颗气敏电阻是好的',
      '浓度越高 → 气敏阻值越小 → R2 分到的电压越高', 'ok', 254);
}
function note4(){
  const v = volt4();
  $('s4a').textContent = v.toFixed(2) + ' V';
  $('s4b').textContent = S4.v < 20 ? '几十 kΩ' : (S4.v < 60 ? '几 kΩ' : '不到 1 kΩ');
  $('s4c').textContent = '正常';
  $('s4t').textContent = S4.v < 15 ? '很低' : (S4.v < 45 ? '中等' : '很高');
  $('n3').innerHTML =
    '<div class="st">气敏电阻：不能直接量阻值</div>' +
    '它内部有一根<b>加热丝</b>，要通电预热到工作温度才对气体敏感。' +
    '所以检测时得<b>先把它接进电路、加上工作电压</b>，' +
    '再在<b>普通环境</b>和<b>目标气体浓度较大的环境</b>下分别量电路的输出电压。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>书上那次实测输出电压是 6.20 V</b>（图 5-13）。' +
    '判据还是那一条：<b>换了环境读数跟着变，就是好的</b>；' +
    '不管什么环境读数都一样，就是灵敏度没了。' +
    '<span class="sub">现场做法：拿打火机放一点气（别点着）靠近它，' +
    '或者用酒精棉靠近，看输出跳不跳。<b>做完通风散气，别在密闭空间里试。</b></span></div>';
}
document.getElementById('s4r').addEventListener('input', function(e){
  S4.v = +e.target.value; note4(); draw4();
});

/* ================================================================
   绑定
   ================================================================ */
function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  draw1(); draw2(); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:5, sec:'5.4'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('5.4');
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
