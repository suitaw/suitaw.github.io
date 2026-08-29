/* 5.2 保护器件的检测 —— 本节内容的唯一真相。
   对应《零基础学电工》第 5 章 5.1 + 5.2 节（书内 P79~P83）。

   **书上的 5.1「电器开关的检测」没有单独做一节**（和第 3 章 3.1 手动工具同样的处理）：
   那一节讲的是开启式／封闭式负荷开关的**直接观察法**（看熔丝断没断、触刀接触好不好），
   一没有可交互的东西，二那两种开关现在的新装场合基本见不到了。
   它的要点（观察熔丝／触刀／接线，封闭式最常见的故障是手柄带电和夹座过热）
   并进了屏 1 当作「开关类器件的通用套路」的一部分。

   四屏：
   ① 一条套路管所有开关   **断开 ∞、闭合 0Ω** —— 开关类器件的检测就这一句
   ② 低压断路器           三组都要测，四条判据
   ③ 漏电保护器           万用表只能测通断，**试验按钮才是查漏电功能的唯一手段**
   ④ 熔断器               观察法 + 万用表，**带电不能测**，换之前先找原因

   数字口径（书上原文，别凭记忆改）：
   - 低压断路器／漏电保护器：**断开状态阻值应为无穷大，闭合状态应为 0Ω**，
     三组开关都要测；有任一组坏了就是整只坏了（书 P81、P82 提示说明）
   - 熔断器：**阻值很小或趋于零为正常，无穷大为已熔断**；
     **带电状态下不能测量熔断器电阻**（书 P82 提示说明）
   - 漏电保护器动作电流 30 mA、动作时间 0.1 s 是家用常见整定值（3.7 节钳形表那一屏用过同一个数）
   - 万用表测出来的只是「触点通不通」，**测不出漏电保护功能好不好** ——
     这一条书上没明说，但它是这一节最要紧的一句：现场唯一能查漏电功能的是**按试验按钮**

   画法：四屏共用一套「被测器件在左上、万用表在右下」的摆法。
   **万用表的孔 x 必须落在器件 x 范围之外**（器件 30~180、孔 257/298），
   这样 EP.leads 那两条软线的竖段就不会穿过被测器件 —— 3.6a 那节试出来的规矩。 */
(function(){
'use strict';
ELEC.reg({
  id: '5.2',
  file: 'c5-2.html',
  title: '5.2 保护器件的检测',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>一条套路</button>
    <button class="tab" data-i="1"><span class="n">2</span>断路器</button>
    <button class="tab" data-i="2"><span class="n">3</span>漏电保护器</button>
    <button class="tab" data-i="3"><span class="n">4</span>熔断器</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">开关类的器件，检测就一句话</div>
    刀开关、断路器、漏电保护器、接触器的触点 —— 这些东西的共同点是
    <b>要么通、要么断</b>。所以万用表量它们只有一条套路：
    <b>断开的时候应该是 ∞，闭合的时候应该是 0Ω。</b>
    量出来不是这两个数，就是它坏了。<b>下面切开关状态和好坏看看。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1p">
        <button class="btn on sm" data-p="0">开关断开</button>
        <button class="btn sm" data-p="1">开关闭合</button>
      </div>
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">正常</button>
        <button class="btn sm" data-k="1">触点粘连</button>
        <button class="btn sm" data-k="2">触点断路</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">现在</div><div class="v" id="s1a">断开</div></div>
        <div class="num"><div class="k">应该是</div><div class="v" id="s1b">∞</div></div>
        <div class="num hi"><div class="k">实测</div><div class="v" id="s1c">OL</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">量之前先断电，这不是提醒是前提</div>
    <b>电阻档和通断档都是靠表内电池往外送电的</b>（3.6b 讲过）。
    被测电路带着电去量，轻则读数全是错的，重则把表烧了。
    <div class="tip">
      正确顺序：<b>断开上级电源 → 验电 → 确认没电 → 再拿表量</b>。
      <span class="sub">4.4 屏 4 那句「按了停止 ≠ 可以动手」说的是同一件事的另一半 ——
      要量的这个器件，它上口很可能还带着电。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">书上 5.1 讲的负荷开关，用的是「看」</div>
    开启式负荷开关（胶盖闸刀）和封闭式负荷开关（铁壳开关）这两种老式开关，
    书上教的是<b>直接观察法</b>：打开看<b>熔丝断没断、触刀接触好不好、内部接线松没松</b>。
    <div class="tip info">
      <b>封闭式负荷开关最常见的两种故障</b>：<b>操作手柄带电</b>（外壳没接地或接地线松脱、
      进出线绝缘破损碰到外壳）、<b>夹座（静触头）过热或烧坏</b>（夹座压力不足、负载过大）。
      <span class="sub">书上还有一条接线规矩：<b>电源进线接在静夹座一边，负载引线接在熔断器一边</b>，
      而且进出线都必须穿过开关的进出线孔。分合闸时<b>站在开关手柄侧，不准面对开关</b> ——
      万一故障电流让开关爆炸，铁壳会飞出伤人。</span>
    </div>
  </div>

  <div class="bet" data-bet="c52-rule" data-q="量一个断路器，扳到断开位置，万用表电阻档读数是 0Ω。这说明什么？"
       data-opts="正常，断路器就该是通的|坏了——断开状态应该是 ∞，读到 0Ω 说明内部触点粘连了|表坏了" data-right="1"
       data-after="坏了，触点粘连。断开状态应该是无穷大（OL），量到 0Ω 说明动静触头黏在一起分不开了——这种断路器最危险：你以为拉闸断电了，其实电还在。触点粘连多半是因为断过大短路电流、或者长期过载烧蚀。"></div>
</section>

<!-- ================= 场景 2：低压断路器 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">三极断路器，三组都要量</div>
    一只三极断路器里面是<b>三组独立的触点</b>，靠一根连杆一起动。
    <b>任何一组坏了，整只断路器就得换</b> —— 所以三组都要量，不能量一组就算完。
    <b>点一组量一量。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2p">
        <button class="btn on sm" data-p="0">断开</button>
        <button class="btn sm" data-p="1">闭合</button>
      </div>
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">量第 1 组</button>
        <button class="btn sm" data-k="1">量第 2 组</button>
        <button class="btn sm" data-k="2">量第 3 组</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这一组</div><div class="v" id="s2a">第 1 组</div></div>
        <div class="num"><div class="k">读数</div><div class="v" id="s2b">OL</div></div>
        <div class="num hi"><div class="k">判定</div><div class="v" id="s2c">正常</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">四条判据（书上原文）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>三组的读数</th><th>结论</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">断开全 ∞<br>闭合全 0Ω</td><td class="ok"><b>正常</b></td></tr>
        <tr><td class="eu-s">断开时是 0Ω</td><td>内部<b>触点粘连</b>损坏 —— 拉了闸电还在，最危险的一种</td></tr>
        <tr><td class="eu-s">闭合时是 ∞</td><td>内部<b>触点断路</b>损坏 —— 表现是这一相没电（缺相）</td></tr>
        <tr><td class="eu-s">任一组不对</td><td><b>整只断路器损坏</b>，换掉，不要只想着修那一组</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      量不出问题、可现场表现又不对劲的话，还可以<b>拆开外壳看内部触头和操作手柄</b>
      有没有明显烧蚀、变形。<span class="sub">不过拆过的断路器一般就不该再装回去用了。</span>
    </div>
  </div>

  <div class="bet" data-bet="c52-3p" data-q="三极断路器量下来：第 1、2 组断开 ∞ 闭合 0Ω，第 3 组闭合时是 ∞。怎么办？"
       data-opts="只有一相坏，凑合用两相|整只换掉——任一组坏了这只断路器就不能用了|把第 3 组的线并到第 2 组上" data-right="1"
       data-after="整只换掉。第 3 组闭合时是无穷大，说明它的触点断路了——接上去电动机会缺相运行，很快就会烧。断路器是一个整体，三组靠一根连杆联动，一组坏了没法单独修。"></div>
</section>

<!-- ================= 场景 3：漏电保护器 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">万用表量得出触点，量不出漏电功能</div>
    漏电保护器的触点部分，量法和断路器<b>一模一样</b>（断开 ∞、闭合 0Ω）。
    但这只能说明它<b>作为一个开关是好的</b> ——
    <b>它到底还能不能在漏电时跳闸，万用表一点办法都没有。</b>
    <b>切「按试验按钮」看看。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">量触点通断</button>
        <button class="btn sm" data-k="1">按试验按钮 · 正常</button>
        <button class="btn sm" data-k="2">按试验按钮 · 不跳</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">在做什么</div><div class="v" id="s3a">量触点</div></div>
        <div class="num"><div class="k">能查出</div><div class="v" id="s3b">触点通断</div></div>
        <div class="num hi"><div class="k">查不出</div><div class="v" id="s3c">漏电功能</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st good">试验按钮：唯一能验漏电功能的手段，而且不用工具</div>
    面板上那颗标着 <b>T</b> 或「试验」的按钮，内部串了一个电阻，
    <b>人为造一个约 30 mA 的漏电流</b>。按下去应该<b>立刻跳闸</b>。
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>按下去</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">立刻跳闸</td><td class="ok"><b>漏电保护功能正常</b>。合上继续用</td></tr>
        <tr><td class="eu-s">不跳</td><td><b>保护功能已经失效</b> —— 这时候它只是个普通开关，
          漏电、触电都不会跳。<b>必须立即更换</b></td></tr>
        <tr><td class="eu-s">合不上</td><td>线路上真有漏电，或者保护器本身坏了。<b>先查线路</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>规范要求每月按一次试验按钮。</b>漏电保护器里是有机械机构和电子元件的，
      放着不动几年，脱扣机构可能已经卡死了 —— <b>而你完全看不出来</b>，
      直到真出事那天它不动作。
      <span class="sub">家用常见整定值是 <b>30 mA / 0.1 s</b>（3.7 节钳形表那一屏算过：
      三根线一起钳，读到的就是漏电流）。</span>
    </div>
  </div>

  <div class="bet" data-bet="c52-rcd" data-q="用万用表量一只漏电保护器，断开 ∞、闭合 0Ω，全部正常。能说明它是好的吗？"
       data-opts="能，读数都对|不能——这只说明它作为开关是好的，漏电保护功能还得按试验按钮才知道|不能，还要量绝缘" data-right="1"
       data-after="不能。万用表量的是触点通不通，而漏电保护器的核心功能是「检测到漏电流就跳闸」，那是零序电流互感器加脱扣机构干的事，万用表碰不到。唯一能验的是按试验按钮——它内部串一个电阻人为造出约 30mA 的漏电流，按下去必须立刻跳。规范要求每月按一次。"></div>
</section>

<!-- ================= 场景 4：熔断器 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">熔断器：先用眼睛，再用表</div>
    很多熔断器<b>看一眼就知道</b> —— 玻璃管的能直接看见熔丝断没断，
    管体发黑、外表有烧蚀痕迹的也不用量了。看不出来的再用万用表：
    <b>阻值趋于零是好的，无穷大就是已经熔断。</b>
    <b>切一个看看。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">好的</button>
        <button class="btn sm" data-k="1">熔丝断了</button>
        <button class="btn sm" data-k="2">管体发黑</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">看上去</div><div class="v" id="s4a">熔丝完整</div></div>
        <div class="num"><div class="k">量出来</div><div class="v" id="s4b">0.2 Ω</div></div>
        <div class="num hi"><div class="k">判定</div><div class="v" id="s4c">正常</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">带电状态下不能测熔断器电阻</div>
    这是书上专门提示的一条。<b>熔断器串在带电的线路里，两端本来就有电压</b>；
    电阻档是靠表内电池工作的，外面有电压进来读数没有意义，还可能烧表。
    <div class="tip">
      <b>要么断电后量，要么把熔断器取下来单独量。</b>
      <span class="sub">带电时想判断它通不通，正确做法是量<b>电压</b>：
      跨在熔断器两端量电压 —— 有电压说明它断了（电压全落在它身上），
      没电压说明它是通的。这就是 3.6b 那一屏的电压降法。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">换之前，先想清楚它为什么断</div>
    <b>熔断器不会无缘无故熔断。</b>它断了，说明线路上刚刚发生过短路或者长时间过载。
    <b>不查原因直接换一个新的，多半马上又断</b>，运气不好会把故障扩大。
    <div class="tip">
      更糟的做法是<b>换一个电流规格更大的</b>，或者<b>拿铜丝铁丝代替熔丝</b> ——
      这等于把保护拆掉了，接下来烧的就是电缆和设备，甚至起火。
      <span class="sub"><b>换熔断器的规矩：同型号、同规格、同额定电流。</b>
      顺便检查一下熔断器座的夹片有没有烧蚀、压紧力够不够 ——
      接触不良会让它发热，慢慢就"莫名其妙"地断了。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="c5-2">
    <div class="qz" data-q="用万用表量开关类器件（断路器、漏电保护器、接触器触点），正常的读数应该是什么？"
         data-opts="断开和闭合都是 0Ω|断开时 ∞、闭合时 0Ω|断开时 0Ω、闭合时 ∞"
         data-right="1"
         data-why="断开 ∞、闭合 0Ω。这是所有「要么通要么断」的器件的通用套路。断开时读到 0Ω 说明触点粘连（拉了闸电还在，最危险）；闭合时读到 ∞ 说明触点断路（那一相没电，缺相）。三极的器件三组都要量，任一组不对就整只换。"></div>
    <div class="qz" data-q="一只漏电保护器，万用表量下来触点全部正常。它的漏电保护功能一定好吗？"
         data-opts="一定好|不一定——万用表只能量触点通断，漏电保护功能只能靠按试验按钮来验|不一定，还要量线圈"
         data-right="1"
         data-why="不一定。漏电保护的核心是零序电流互感器加脱扣机构，万用表碰不到。唯一的验证手段是按面板上那颗试验按钮（T），它内部串一个电阻人为造出约 30mA 的漏电流，按下去必须立刻跳闸。不跳就说明保护已经失效，这时它只是个普通开关。规范要求每月按一次。"></div>
    <div class="qz" data-q="线路带着电，想知道一个熔断器通不通。怎么做？"
         data-opts="直接用电阻档量它两端|不能用电阻档；用电压档跨在它两端量——有电压说明它断了，没电压说明它是通的|用手摸一下烫不烫"
         data-right="1"
         data-why="带电时绝对不能用电阻档（电阻档靠表内电池工作，外面有电压进来读数没意义还可能烧表）。正确做法是用电压档跨在熔断器两端：熔断器是通的话它两端几乎没有压降，读数接近 0；断了的话电源电压全落在它身上，读到 220V 或 380V。这就是电压降法。"></div>
    <div class="qz" data-q="换熔断器时，下面哪种做法是对的？"
         data-opts="换一个电流规格大一号的，省得老断|先查清楚它为什么断，再换同型号同规格同额定电流的|临时用铜丝代替，等有空再换"
         data-right="1"
         data-why="先查原因，再换同规格的。熔断器熔断说明刚发生过短路或过载，不查原因直接换多半马上又断。换大一号或者拿铜丝铁丝代替，等于把保护拆掉——接下来烧的就是电缆和设备，甚至起火。换完顺便检查熔断器座的夹片有没有烧蚀，接触不良也会让它发热然后「莫名其妙」地断。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 5 章 5.1~5.2 节（书内 P79~P83）<br>书上 5.1 讲的负荷开关用的是观察法，要点并进了屏 1</div>
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

const CANH = 324;
/* 四屏共用的摆法：被测器件在左上（x 30~180），万用表在右下（孔 x 257/298）。
   **孔的 x 必须落在器件 x 范围之外**，EP.leads 那两条软线的竖段才不会穿过器件 */
const MT = {x:216, y:168, w:124, h:96};
const YTOP = 20, YBOT = 152;

function dot(g, x, y, c, r){
  g.save(); g.fillStyle = c; g.beginPath(); g.arc(x, y, r||2.6, 0, Math.PI*2); g.fill(); g.restore();
}
/* 表笔尖：一个小圆点 + 一圈外环。
   **不用 EP.probe** —— 那支笔整支长 49，这个布局里不管朝哪个方向画
   都会伸出画布或者压到器件、标题上（截图抓到的） */
function tip(g, x, y, red){
  const c = red ? C.err : C.tx;
  g.save();
  g.fillStyle = c; g.beginPath(); g.arc(x, y, 3.6, 0, Math.PI*2); g.fill();
  g.globalAlpha = .45; g.strokeStyle = c; g.lineWidth = 1.4;
  g.beginPath(); g.arc(x, y, 7, 0, Math.PI*2); g.stroke();
  g.restore();
}
/* 断路器 / 漏电保护器的机身：一个模数化外壳 + 上下端子 + 一个操作手柄 */
function breaker(g, x, y, w, h, o){
  o = o || {};
  const n = o.poles || 3, on = !!o.on;
  box(g, x, y, w, h, 4, P.bakelite || C.box, C.boxLine, 1.4);
  /* 分极的竖缝 */
  g.save();
  g.strokeStyle = C.boxLine; g.lineWidth = 1;
  for(let i = 1; i < n; i++){
    const px = x + w*i/n;
    g.beginPath(); g.moveTo(px, y + 4); g.lineTo(px, y + h - 4); g.stroke();
  }
  g.restore();
  /* 手柄：一根小拨杆，合闸朝下、分闸朝上 */
  const hx = x + w/2, hy = y + h/2;
  box(g, hx - 11, hy - 13, 22, 26, 3, C.box, C.metalD, 1.2);
  g.save();
  g.strokeStyle = on ? C.metalL : C.metal; g.lineWidth = 4; g.lineCap = 'round';
  g.beginPath(); g.moveTo(hx, hy); g.lineTo(hx, hy + (on ? 8 : -8)); g.stroke();
  g.restore();
  txt(g, on ? 'ON' : 'OFF', hx, hy + (on ? -9 : 10), {sz:7, b:1, c:C.tx3});
  return [];
}

/* ================================================================
   屏 1 / 2 / 3 共用：画器件 + 表笔 + 万用表读数
   ================================================================ */
const DX = 30, DY = 40, DW = 150, DH = 90;
const POLE = [DX + DW/6, DX + DW/2, DX + DW*5/6];   /* 三极的 x */

function rig(g, o){
  o = o || {};
  /* 上下引线 */
  const xs = o.xs || POLE;
  xs.forEach(function(px){
    new Path([[px, 24],[px, DY]]).stroke(g, 2.4, C.wire);
    new Path([[px, DY+DH],[px, DY+DH+18]]).stroke(g, 2.4, C.wire);
    dot(g, px, DY, C.wire); dot(g, px, DY+DH, C.wire);
  });
  breaker(g, DX, DY, DW, DH, {poles:xs.length, on:o.on});
  /* 器件的名字交给 heading 的主标题 —— 画在器件上方会和 heading 撞（截图抓到的） */

  /* 万用表 */
  const jacks = EP.meterUnit(g, MT.x, MT.y, MT.w, MT.h,
    {mode:'Ω', reading:o.reading, rsz:15,
     jacks:[{n:'COM'}, {n:'VΩ', red:true}], hot:1});
  /* 表笔：红接上引线、黑接下引线 */
  const tx = o.probeX;
  if(tx != null){
    EP.leads(g, jacks[1], jacks[0], tx, tx,
             {yTop:YTOP, yBot:YBOT, tipYR:30, tipYB:DY+DH+12});
    tip(g, tx, 30, true);
    tip(g, tx, DY+DH+12, false);
  }
  return jacks;
}
function bar(g, l1, l2, kind){
  const bg = kind === 'ok' ? C.okbg : kind === 'err' ? C.errbg : kind === 'warn' ? C.warnbg : C.accbg;
  const fg = kind === 'ok' ? C.ok : kind === 'err' ? C.err : kind === 'warn' ? C.warn : C.acc;
  EC.box(g, 18, 278, 324, 38, 6, bg, fg, 1);
  txt(g, l1, 180, 291, {sz:10.5, b:1, c:fg});
  txt(g, l2, 180, 306, {sz:9, c:C.tx2});
}

/* ================================================================
   场景 1：一条套路
   ================================================================ */
const S1 = { on:0, k:0 };
const st1 = new Stage('cv0', 360, CANH);

/* 实测读数：k=0 正常 / 1 粘连（永远 0Ω）/ 2 断路（永远 ∞） */
function read1(){
  if(S1.k === 1) return '0.0';
  if(S1.k === 2) return 'OL';
  return S1.on ? '0.0' : 'OL';
}
function good1(){ return read1() === (S1.on ? '0.0' : 'OL'); }

function draw1(){
  const g = st1.g; st1.clear();
  EP.heading(g, 12, 14, '三极开关', '断开 ∞　闭合 0Ω');
  rig(g, {on:S1.on, probeX:POLE[1], reading:read1()});
  const ok = good1();
  bar(g, ok ? '读数和应该的一致 —— 这一组正常' : '读数不对 —— 这只器件坏了',
      S1.on ? '闭合状态：应该是 0Ω' : '断开状态：应该是 ∞（表上显示 OL）',
      ok ? 'ok' : 'err');
}
function note1(){
  const r = read1(), ok = good1();
  $('s1a').textContent = S1.on ? '闭合' : '断开';
  $('s1b').textContent = S1.on ? '0Ω' : '∞';
  $('s1c').textContent = r === 'OL' ? 'OL（∞）' : r + ' Ω';
  let h = '';
  if(S1.k === 0) h =
    '<div class="st good">正常的器件，读数跟着开关状态走</div>' +
    '扳到<b>断开</b>，触点分开，表读 <b>OL</b>（就是无穷大，量程内量不到）；' +
    '扳到<b>闭合</b>，触点接上，表读 <b>0.0Ω</b>（实际是零点几欧的接触电阻，' +
    '数字表多半直接显示 0.0 或 0.1）。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>两个状态都要量</b>：只量闭合状态的话，粘连的触点也是 0Ω，看不出毛病；' +
    '只量断开状态的话，断路的触点也是 ∞，同样看不出来。' +
    '<span class="sub">扳一下、量一下，扳回来、再量一下 —— 一共两次。</span></div>';
  else if(S1.k === 1) h =
    '<div class="st bad">触点粘连：断开状态量到 0Ω</div>' +
    '扳到断开位置，表还是读 <b>0.0Ω</b> —— 说明动静触头<b>黏在一起分不开了</b>。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>这是最危险的一种坏法</b>：手柄扳到了 OFF，看上去断电了，' +
    '<b>可电还在往下走</b>。有人就是这么在"已经断电"的线路上被电到的。' +
    '<span class="sub">粘连多半是因为断过一次大短路电流，触头瞬间熔化又焊在一起；' +
    '长期过载烧蚀也会。<b>所以停电检修一定要验电，不能只看开关在什么位置</b>' +
    '（3.5 节那一屏讲的就是这个）。</span></div>';
  else h =
    '<div class="st bad">触点断路：闭合状态量到 ∞</div>' +
    '扳到闭合位置，表还是 <b>OL</b> —— 说明触点<b>接不上了</b>。' +
    '<div class="tip" style="margin-top:8px">' +
    '现场表现是<b>这一相没电</b>。如果这是三相里的一相，电动机就会<b>缺相运行</b>：' +
    '嗡嗡响、转不动或者转得很吃力，几分钟就烧。' +
    '<span class="sub">原因多半是触头烧蚀严重、接触面氧化、或者内部机构变形卡住。' +
    '2.7 节那一屏「嗡嗡响转不动先查电源侧」，查的就是这类东西。</span></div>';
  $('n0').innerHTML = h;
}
function sync1(){ note1(); draw1(); }
document.getElementById('s1p').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S1.on = +t.dataset.p;
  document.querySelectorAll('#s1p .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.p === S1.on); });
  sync1();
});
document.getElementById('s1k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S1.k = +t.dataset.k;
  document.querySelectorAll('#s1k .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.k === S1.k); });
  sync1();
});

/* ================================================================
   场景 2：低压断路器 —— 三组，第 3 组是坏的
   ================================================================ */
const S2 = { on:0, k:0 };
const st2 = new Stage('cv1', 360, CANH);
const BAD2 = 2;   /* 第 3 组触点断路：闭合时也是 ∞ */

function read2(){
  if(S2.k === BAD2) return 'OL';
  return S2.on ? '0.0' : 'OL';
}
function good2(){ return !(S2.k === BAD2 && S2.on); }

function draw2(){
  const g = st2.g; st2.clear();
  EP.heading(g, 12, 14, '低压断路器', '三组都要量');
  rig(g, {on:S2.on, probeX:POLE[S2.k], reading:read2()});
  const ok = good2();
  bar(g, ok ? '第 ' + (S2.k+1) + ' 组：读数正常' : '第 ' + (S2.k+1) + ' 组：闭合了却还是 ∞',
      ok ? '三组都量完、两个状态都量过，才算量完一只断路器'
         : '触点断路 —— 这一相不通，整只断路器都得换',
      ok ? 'ok' : 'err');
}
function note2(){
  $('s2a').textContent = '第 ' + (S2.k+1) + ' 组';
  $('s2b').textContent = read2() === 'OL' ? 'OL（∞）' : read2() + ' Ω';
  $('s2c').textContent = good2() ? '正常' : '触点断路';
  let h = '';
  if(!good2()) h =
    '<div class="st bad">找到了：第 3 组触点断路</div>' +
    '手柄已经扳到闭合，这一组却还是 <b>OL</b>。' +
    '<b>整只断路器报废</b> —— 三组靠一根连杆联动，没法单独修一组。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>接上去会怎样</b>：电动机三相里少了一相，成了<b>缺相运行</b>。' +
    '电动机会嗡嗡响、转矩大跌、剩下两相电流猛增，<b>几分钟就把绕组烧了</b>。' +
    '<span class="sub">而且这种故障从外面看一切正常 —— 手柄合上了、指示也对，' +
    '只有量过才知道。</span></div>';
  else if(S2.on) h =
    '<div class="st good">闭合状态：应该是 0Ω</div>' +
    '这一组接通了，两端之间就是一段导体，阻值接近零。' +
    '<b>数字表上多半显示 0.0 或 0.1 —— 那零点几欧是触点的接触电阻加表笔电阻。</b>' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>量之前先把两支表笔碰在一起看一眼</b>：表笔本身就有零点几欧，' +
    '心里有个底，量出来的数才好判断。' +
    '<span class="sub">指针表在这儿要先调零（3.6b 讲过：换一次倍率就得重新调）。</span></div>';
  else h =
    '<div class="st">断开状态：应该是 ∞</div>' +
    '手柄在 OFF，这一组的动静触头分开着，中间是空气，所以阻值是无穷大。' +
    '<b>表上显示 OL 或者 1 —— 意思都是「量程内量不到」。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>断开状态如果量到 0Ω，就是触点粘连</b>，这只断路器必须马上换掉：' +
    '你以为拉了闸，其实电还在往下走。' +
    '<span class="sub">量完这一组记得<b>把手柄扳到闭合再量一遍</b>，' +
    '然后换下一组 —— 三组 × 两个状态，一共六次。</span></div>';
  $('n1').innerHTML = h;
}
function sync2(){ note2(); draw2(); }
document.getElementById('s2p').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S2.on = +t.dataset.p;
  document.querySelectorAll('#s2p .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.p === S2.on); });
  sync2();
});
document.getElementById('s2k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S2.k = +t.dataset.k;
  document.querySelectorAll('#s2k .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.k === S2.k); });
  sync2();
});

/* ================================================================
   场景 3：漏电保护器
   ================================================================ */
const S3 = { k:0 };
const st3 = new Stage('cv2', 360, CANH);

function draw3(){
  const g = st3.g; st3.clear();
  const test = S3.k > 0;
  EP.heading(g, 12, 14, '漏电保护器', test ? '按试验按钮' : '万用表量触点');
  /* 试验按钮那两档：跳闸了手柄弹到 OFF */
  const on = test ? (S3.k === 1 ? 0 : 1) : 1;
  rig(g, {on:on, probeX: test ? null : POLE[1],
          reading: test ? '- - - -' : '0.0'});
  /* 面板上那颗试验按钮 */
  const bx = DX + DW - 26, by = DY + DH - 20;
  g.save();
  g.beginPath(); g.arc(bx, by, 8, 0, Math.PI*2);
  g.fillStyle = test ? C.err : C.errbg; g.fill();
  g.strokeStyle = C.err; g.lineWidth = 1.4; g.stroke();
  g.restore();
  txt(g, 'T', bx, by, {sz:9, b:1, c: test ? '#fff' : C.err});
  if(test) hot(g, bx, by, 15);
  /* 标注放按钮左边 —— 放下方正好压在器件底边和下引线上（截图抓到的） */
  txt(g, '试验按钮', bx - 14, by, {sz:8.5, c:C.err, al:'right'});

  if(S3.k === 0) bar(g, '触点量下来正常 —— 但这只说明它是个好开关',
                     '漏电保护功能查不出来，万用表碰不到那部分');
  else if(S3.k === 1) bar(g, '按下去立刻跳闸 —— 漏电保护功能正常',
                          '试验按钮内部串一个电阻，人为造出约 30 mA 的漏电流', 'ok');
  else bar(g, '按下去不跳 —— 保护功能已经失效',
           '这时它只是个普通开关，漏电、触电都不会跳。必须立即更换', 'err');
}
function note3(){
  const T = ['量触点', '按试验按钮', '按试验按钮'];
  $('s3a').textContent = T[S3.k];
  $('s3b').textContent = S3.k === 0 ? '触点通断' : '漏电功能';
  $('s3c').textContent = S3.k === 0 ? '漏电功能' : '—';
  let h = '';
  if(S3.k === 0) h =
    '<div class="st">触点部分：量法和断路器一模一样</div>' +
    '断开 <b>∞</b>、闭合 <b>0Ω</b>，几组都要量。判据也一样：' +
    '断开时 0Ω 是粘连，闭合时 ∞ 是断路，任一组坏了整只换。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>但量完这些，你只知道它作为一个开关是好的。</b>' +
    '漏电保护器的核心是里面那个<b>零序电流互感器</b>加一套脱扣机构 ——' +
    '<b>万用表根本碰不到那部分。</b>' +
    '<span class="sub">3.7 节讲过零序电流互感器长什么样：三根线一起穿过一个环，' +
    '正常时三相电流之和为零，漏了电就不为零。</span></div>';
  else if(S3.k === 1) h =
    '<div class="st good">按下试验按钮，立刻跳闸 —— 这才叫好的</div>' +
    '那颗按钮内部串了一个电阻，<b>从相线上引一点电流绕过互感器直接回零线</b>，' +
    '人为制造一个约 <b>30 mA</b> 的不平衡。保护器检测到了，就跳。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>规范要求每月按一次。</b>里面有机械脱扣机构和电子元件，' +
    '放着几年不动，机构可能已经卡死或者电子件已经失效 —— ' +
    '<b>而你从外面完全看不出来</b>，直到真出事那天它不动作。' +
    '<span class="sub">按完记得把手柄合回去，别让人以为停电了。</span></div>';
  else h =
    '<div class="st bad">按了不跳 —— 立即更换，没有第二种处理</div>' +
    '试验按钮按下去手柄纹丝不动，说明<b>漏电保护功能已经失效</b>。' +
    '这时候它<b>还能当开关用</b>（触点是好的），也正因为这样，' +
    '<b>没人会发现它已经不保护了</b>。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>不要试图修</b>，也不要"先用着以后再说" —— ' +
    '装漏电保护器就是为了漏电和触电那一下，平时它一点用处都没有，' +
    '<b>失效之后和没装是一样的</b>。' +
    '<span class="sub">还有一种情况：<b>合不上闸</b>。那多半是线路上真有漏电，' +
    '先分段拉开各回路找出是哪一路，别怀疑保护器。</span></div>';
  $('n2').innerHTML = h;
}
document.getElementById('s3k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S3.k = +t.dataset.k;
  document.querySelectorAll('#s3k .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.k === S3.k); });
  note3(); draw3();
});

/* ================================================================
   场景 4：熔断器
   ================================================================ */
const FU = [
  {look:'熔丝完整', read:'0.2', judge:'正常', kind:'ok'},
  {look:'熔丝已断', read:'OL', judge:'已熔断', kind:'err'},
  {look:'管体发黑', read:'OL', judge:'已熔断', kind:'err'}
];
const S4 = { k:0 };
const st4 = new Stage('cv3', 360, CANH);

/* 玻璃管熔断器：两头金属帽 + 中间透明管 + 一根熔丝 */
function fuseTube(g, x, y, w, h, state){
  const r = h/2;
  /* 玻璃管 */
  box(g, x, y, w, h, r, state === 2 ? '#2a2118' : C.box, C.boxLine, 1.2);
  /* 金属帽 */
  box(g, x - 12, y - 2, 16, h + 4, 2, P.steel || C.metal, C.boxLine, 1);
  box(g, x + w - 4, y - 2, 16, h + 4, 2, P.steel || C.metal, C.boxLine, 1);
  /* 熔丝 */
  g.save();
  g.strokeStyle = state === 0 ? (P.steelD || C.metalD) : C.err;
  g.lineWidth = 1.8; g.lineCap = 'round';
  if(state === 0){
    g.beginPath(); g.moveTo(x + 2, y + r); g.lineTo(x + w - 2, y + r); g.stroke();
  }else{
    g.beginPath(); g.moveTo(x + 2, y + r); g.lineTo(x + w*0.42, y + r - 3); g.stroke();
    g.beginPath(); g.moveTo(x + w*0.58, y + r + 3); g.lineTo(x + w - 2, y + r); g.stroke();
  }
  g.restore();
  if(state === 2){
    /* 管体发黑：内壁一层烟 */
    g.save(); g.globalAlpha = .55;
    box(g, x + 4, y + 2, w - 8, h - 4, r - 2, '#0d0a07', null, 0);
    g.restore();
  }
}
function draw4(){
  const g = st4.g; st4.clear();
  const it = FU[S4.k];
  EP.heading(g, 12, 14, '熔断器', '先用眼睛，再用表');
  /* 熔断器画在器件区中间 */
  const fx = 52, fy = 74, fw = 108, fh = 26;
  new Path([[24, fy + fh/2],[fx - 12, fy + fh/2]]).stroke(g, 2.4, C.wire);
  new Path([[fx + fw + 12, fy + fh/2],[196, fy + fh/2]]).stroke(g, 2.4, C.wire);
  fuseTube(g, fx, fy, fw, fh, S4.k);
  txt(g, it.look, fx + fw/2, fy - 18, {sz:9.5, b:1, c: S4.k ? C.err : C.ok});
  hot(g, fx + fw/2, fy + fh/2, 0, {w:fw + 34, h:fh + 20, r:10});

  /* 万用表 + 表笔（跨在熔断器两端） */
  const jacks = EP.meterUnit(g, MT.x, MT.y, MT.w, MT.h,
    {mode:'Ω', reading:it.read, rsz:15,
     jacks:[{n:'COM'}, {n:'VΩ', red:true}], hot:1});
  EP.leads(g, jacks[1], jacks[0], fx - 22, fx + fw + 22,
           {yTop:26, yBot:150, tipY:fy + fh/2});
  tip(g, fx - 22, fy + fh/2, true);
  tip(g, fx + fw + 22, fy + fh/2, false);

  txt(g, '断电后量，或者取下来单独量', 150, 178, {sz:9, c:C.warn});

  bar(g, it.kind === 'ok' ? '阻值趋于零 —— 熔断器是好的' : '阻值无穷大 —— 已经熔断',
      it.kind === 'ok' ? '熔丝就是一小段细导体，正常时两端几乎没有电阻'
                       : '换之前先查清楚它为什么断，同型号同规格同额定电流',
      it.kind);
}
function note4(){
  const it = FU[S4.k];
  $('s4a').textContent = it.look;
  $('s4b').textContent = it.read === 'OL' ? 'OL（∞）' : it.read + ' Ω';
  $('s4c').textContent = it.judge;
  let h = '';
  if(S4.k === 0) h =
    '<div class="st good">好的熔断器：阻值趋于零</div>' +
    '熔丝就是<b>一小段特意做细的导体</b>，正常时它只是一段导线，' +
    '两端量出来<b>零点几欧</b>（数字表多半显示 0.0~0.5）。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>玻璃管的熔断器直接看就行</b> —— 熔丝完整、管内干净，基本就没问题。' +
    '陶瓷管的看不见里面，那才需要量。' +
    '<span class="sub">还有一种<b>带熔断指示</b>的：熔断后顶端会弹出一个红点或者小旗，' +
    '一排熔断器里哪个断了一眼就看见。</span></div>';
  else if(S4.k === 1) h =
    '<div class="st bad">熔丝断了：阻值无穷大</div>' +
    '玻璃管里那根熔丝<b>中间断开了一截</b>，表读 <b>OL</b>。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>断得干干净净、管子还很清亮，多半是长时间过载慢慢烧断的。</b>' +
    '<span class="sub">这种情况要去查<b>负载是不是超了</b>：' +
    '是不是加了新设备、电动机是不是带不动、是不是有一相接触不良让另两相电流变大。' +
    '光换熔断器解决不了。</span></div>';
  else h =
    '<div class="st bad">管体发黑：断得很猛，多半是短路</div>' +
    '管内壁一层黑 —— 熔丝<b>瞬间汽化</b>了，金属蒸气镀在玻璃上。' +
    '这说明<b>刚才过去的是短路电流</b>，不是慢慢过载。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>必须先找到短路点再换</b>：查电缆有没有破皮碰壳、端子有没有搭在一起、' +
    '设备内部有没有击穿。<b>不查就换，新的马上又炸。</b>' +
    '<span class="sub">查法：断电后用万用表通断档量相间和相对地 ——' +
    '不该响的地方响了就是短路点。4.5 屏 4 那条「送电前查短路」用的是同一招。</span></div>';
  $('n3').innerHTML = h;
}
document.getElementById('s4k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S4.k = +t.dataset.k;
  document.querySelectorAll('#s4k .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.k === S4.k); });
  note4(); draw4();
});

/* ================================================================
   绑定
   ================================================================ */
function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  draw1(); draw2(); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:5, sec:'5.2'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('5.2');
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
