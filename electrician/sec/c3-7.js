/* 3.7 钳形表 —— 本节内容的唯一真相。
   对应《零基础学电工》第 3 章 3.7 节（书内 P61~P62）。

   3.6a 讲过「测电流必须断开电路把表串进去」——
   可现场大量场合停不了机、拆不了线。**钳形表就是这个问题的答案**：
   钳口一卡，不碰导体、不断线，电流就读出来了。

   原理是电流互感器（CT，第 2 章 2.6 讲过）：钳口是可开合的铁芯，
   **被测导线就是只有一匝的一次绕组**，钳口上的二次绕组感应出成比例的小电流。
   由此推出这一节全部四屏：
   ① 钳口必须闭合干净（磁路）② 只能钳一根（钳两根磁场抵消）
   ③ 钳三根读到的是零序电流（漏电）④ 小电流绕 N 圈、读数 ÷ N

   数字口径（都有出处，别再重算）：
   - 2200 W / 220 V 的单相设备：I = 10.0 A
   - 钳口没合严（有缝隙、铁锈、油污）：磁阻变大，读数**偏小**，本节按 9.2 A 示意
   - 单相回路钳住 L+N：两根电流大小相等方向相反，磁场抵消，读 0.00 A
   - 三相平衡（每相 10 A）：钳 1 根读 10.0；钳 2 根读 10.0（|I1+I2| = |−I3|）；
     钳 3 根读 0.00 —— 三相瞬时值之和恒为零
   - 三相 3 根全钳、又有 0.5 A 漏电流时读 0.50 A ——
     **这正是漏电保护器（零序电流互感器）的原理**
   - 小电流 0.35 A：钳形表 20 A 档分辨率 0.01 A，直接读跳动大；
     绕 5 圈读 1.75 A，÷5 = 0.35 A，等效分辨率提高 5 倍 */
(function(){
'use strict';
ELEC.reg({
  id: '3.7',
  file: 'c3-7.html',
  title: '3.7 钳形表',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>不断线怎么测</button>
    <button class="tab" data-i="1"><span class="n">2</span>只能钳一根</button>
    <button class="tab" data-i="2"><span class="n">3</span>钳三根查漏电</button>
    <button class="tab" data-i="3"><span class="n">4</span>小电流绕几圈</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">不用断线，钳口一卡就读出电流</div>
    上一节说过：<b>万用表量电流必须断开电路、把表串进去</b>。
    可现场大量场合停不了机、也拆不了线。钳形表的钳口是一个<b>可以打开的铁芯</b>，
    卡住导线就成了一台<b>电流互感器</b>。<b>点钳口试试开合。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn sm" data-k="0">钳口张开</button>
        <button class="btn on sm" data-k="1">钳住导线</button>
        <button class="btn sm" data-k="2">没合严</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">导线里<br>真实电流</div><div class="v" id="s1a">10.0 A</div></div>
        <div class="num"><div class="k">表<br>读数</div><div class="v" id="s1b">10.00 A</div></div>
        <div class="num hi"><div class="k">这个数<br>能信吗</div><div class="v" id="s1c">能</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">钳形表就是一台把一次绕组「借」给你的电流互感器</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>在钳形表里是什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">铁芯</td><td><b>钳口</b>那两片可以张开的铁片，合上才是一条完整磁路</td></tr>
        <tr><td class="eu-s">一次<br>绕组</td><td><b>被测的那根导线本身，只有一匝</b> —— 你不用接任何线</td></tr>
        <tr><td class="eu-s">二次<br>绕组</td><td>绕在钳口铁芯上，感应出成比例的小电流，送进表里换算成读数</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      所以它<b>只能测交流电流</b>（互感器靠的是交变磁场）。
      要测直流得用另一种原理（<b>霍尔式</b>）的钳形表，买之前看清楚标的是 AC 还是 AC/DC。
      <span class="sub">多数钳形表还带电压档、电阻档，那些照旧要用表笔 —— 钳口只管电流。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">读数偏小，先看钳口</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>毛病</th><th>后果</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">没合到底</td><td>磁路留了缝，<b>磁阻变大，读数偏小</b></td></tr>
        <tr><td class="eu-s">接合面有<br>锈或油污</td><td>同上。钳口接合面要保持干净，<b>别磕碰变形</b></td></tr>
        <tr><td class="eu-s">导线没<br>放在中间</td><td>贴着钳口边缘时误差变大，<b>尽量让导线居中</b></td></tr>
        <tr><td class="eu-s">旁边有<br>大电流线</td><td>外磁场干扰。<b>尽量把被测线拉开一点再钳</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      安全上有一条硬规矩：<b>钳形表钳的是绝缘导线，不是裸导体。</b>
      测量时手握在<b>护环以下</b>，钳口不要去碰带电的裸露部分；
      高压回路要用相应电压等级的高压钳形表，低压表不能拿去钳高压。
    </div>
  </div>

  <div class="bet" data-bet="c37-why" data-q="钳形表为什么不用断开电路就能测电流？"
       data-opts="它的表笔特别灵敏|钳口是可开合的铁芯，被测导线就是只有一匝的一次绕组，靠电磁感应取信号|它测的其实是电压再换算" data-right="1"
       data-after="它是一台电流互感器。钳口合上就是一条完整的磁路，被测导线穿过去相当于一匝一次绕组，钳口上的二次绕组感应出成比例的小电流。所以它只能测交流——除非是霍尔式的那种 AC/DC 钳形表。"></div>
</section>

<!-- ================= 场景 2：只能钳一根 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">一次只能钳一根线</div>
    这是钳形表<b>最容易犯也最常考</b>的一条。单相回路里火线和零线的电流
    <b>大小相等、方向相反</b>，两根一起钳住，磁场正好抵消。
    <b>切三种钳法看读数。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">只钳火线 L</button>
        <button class="btn sm" data-k="1">只钳零线 N</button>
        <button class="btn sm" data-k="2">两根一起钳</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">钳住了<br>哪几根</div><div class="v" id="s2a">火线 L</div></div>
        <div class="num"><div class="k">表<br>读数</div><div class="v" id="s2b">10.00 A</div></div>
        <div class="num hi"><div class="k">说明</div><div class="v" id="s2c">负载电流</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">为什么两根一起钳会读 0</div>
    钳口读到的是<b>穿过它的所有电流的「和」</b>（要连方向一起算）。
    单相回路里，火线送多少电流出去，零线就送多少回来 —— <b>方向相反，加起来是零</b>。
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>钳住</th><th>读数</th><th>意味着</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">只钳 L</td><td><b>10.0 A</b></td><td>这就是负载电流 ✓</td></tr>
        <tr><td class="eu-s">只钳 N</td><td><b>10.0 A</b></td><td>一样大 —— 电流是「回来的一样多」</td></tr>
        <tr><td class="eu-s">L + N</td><td><b class="rd">0.00 A</b></td><td>抵消了。<b>不是表坏了</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      现场表现：「明明设备在转，钳形表却是 0」—— 十有八九是<b>把整根电缆钳进去了</b>。
      三芯电缆里 L、N（或三根相线）都在同一根护套里，<b>必须把要测的那一根单独剥出来</b>，
      或者在接线端子处一相一相地钳。
      <span class="sub">这也解释了另一件事：<b>钳整根电缆读到不为零的数，反而说明有漏电</b> —— 下一屏细说。</span>
    </div>
  </div>

  <div class="bet" data-bet="c37-two" data-q="用钳形表钳住一台运行中的单相设备的整根两芯电缆，读数是 0.00 A。最可能是什么？"
       data-opts="设备没在工作|火线零线的电流方向相反、正好抵消，应该只钳其中一根|钳形表坏了" data-right="1"
       data-after="抵消了。钳口读到的是穿过它的所有电流的矢量和，单相回路 L 和 N 大小相等方向相反，加起来正好是零。要把其中一根单独剥出来钳，或者在端子排上一根一根钳。"></div>
</section>

<!-- ================= 场景 3：钳三根查漏电 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">把三根一起钳住，读到的是漏掉的那部分</div>
    三相平衡时，三根线的电流<b>瞬时值加起来恒等于零</b>，一起钳住读 0。
    <b>要是读出个不为零的数，那就是从别处漏走的电流。</b>
    <b>切三种钳法看。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">只钳一根</button>
        <button class="btn sm" data-k="1">三根一起钳</button>
        <button class="btn sm" data-k="2">三根一起钳（有漏电）</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">钳住了<br>哪几根</div><div class="v" id="s3a">L1</div></div>
        <div class="num"><div class="k">表<br>读数</div><div class="v" id="s3b">10.00 A</div></div>
        <div class="num hi"><div class="k">说明</div><div class="v" id="s3c">这一相的电流</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st good">漏电保护器就是这么工作的</div>
    漏电保护器（漏电断路器）里面装的正是一个<b>零序电流互感器</b> ——
    一个套住全部相线和零线的铁芯环。
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>状态</th><th>穿过铁芯的电流和</th><th>动作</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">正常</td><td><b>0</b>（去多少回多少）</td><td>不动作</td></tr>
        <tr><td class="eu-s">有人<br>触电</td><td>电流经人体入地，<b>回来的少了</b></td><td><b>差值超过整定值就跳闸</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      家用漏电保护器的整定值一般是 <b>30 mA</b>（0.03 A），动作时间小于 0.1 秒 ——
      这个组合是按<b>人体能承受的电流-时间界限</b>定的。
      <span class="sub">所以<b>零线必须穿过漏电保护器</b>。零线不从里面走，
      正常电流就永远不平衡，一送电就跳闸；反过来，
      <b>保护器出线侧的零线绝对不能再接地</b>，那会造成一部分电流绕过铁芯回去，同样跳闸。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">三相回路的几种钳法</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>钳住</th><th>读数（三相平衡、每相 10 A）</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">1 根</td><td><b>10.0 A</b> —— 这一相的电流</td></tr>
        <tr><td class="eu-s">2 根</td><td><b>10.0 A</b> —— 等于第三相的电流（因为三相之和为零）</td></tr>
        <tr><td class="eu-s">3 根</td><td><b>0.00 A</b> —— 平衡时；不为零就是<b>漏电或不平衡</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      查三相电机<b>缺相、绕组故障、负载不平衡</b>的常规做法是
      <b>三相各钳一次、把三个读数摆在一起比</b>：
      正常时三相基本相等，一相明显偏大或偏小就要停下来查。
      <span class="sub">三相电流不平衡度一般以 <b>10% 左右</b> 作为要警觉的界线（各行业标准不同，以现场规程为准）。
      三相电动机长期在不平衡电流下运行会发热、缩短寿命。</span>
    </div>
  </div>
</section>

<!-- ================= 场景 4：小电流绕几圈 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">电流太小读不准？把导线在钳口里多绕几圈</div>
    钳形表的分辨率是固定的（这一档 <b>0.01 A</b>），电流小的时候读数只有末位那么几格，
    抖一下就差很多。<b>把导线绕 N 圈，读数就放大 N 倍，再除回去。</b>
    <b>拖滑杆改圈数。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="rowlab">导线在钳口里绕　<b id="s4lab">5 圈</b></div>
      <input type="range" id="s4n" min="1" max="6" step="1" value="5">
      <div class="nums three">
        <div class="num"><div class="k">实际<br>电流</div><div class="v" id="s4a">0.35 A</div></div>
        <div class="num"><div class="k">表<br>读数</div><div class="v" id="s4b">1.75 A</div></div>
        <div class="num hi"><div class="k">÷ 圈数<br>＝结果</div><div class="v" id="s4c">0.350 A</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">为什么绕 N 圈读数就是 N 倍</div>
    钳口感应到的是<b>穿过它的总安匝数</b>（电流 × 匝数）。同一根导线绕 5 圈穿过钳口，
    对铁芯来说就是 <b>5 匝一次绕组</b>，安匝数是原来的 5 倍 —— 表按「一匝」去换算，
    读出来自然就是 5 倍。
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>圈数</th><th>表读数</th><th>÷ 圈数</th><th>末位一格代表</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">1 圈</td><td>0.35 A</td><td>0.35 A</td><td>0.01 A（约 3%）</td></tr>
        <tr><td class="eu-s">5 圈</td><td>1.75 A</td><td>0.35 A</td><td><b>0.002 A（约 0.6%）</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>圈数是「穿过钳口几次」，不是「绕了表几圈」</b> —— 数的时候数导线从钳口里过了几趟。
      <span class="sub">绕圈只对<b>小电流</b>有意义。电流本来就大时绕圈会超量程，
      而且大电流的粗电缆也绕不动。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">量程与档位</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>做法</th><th>为什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">不知道<br>多大</td><td><b>先用最大档</b>，再往下切</td><td>和电压档同一条规矩</td></tr>
        <tr><td class="eu-s">读数<br>很小</td><td>换小一档，或者<b>绕几圈</b></td><td>末位分辨率不变，数大了误差占比才小</td></tr>
        <tr><td class="eu-s">测完</td><td>旋钮拨回 <b>OFF 或最大档</b></td><td>随手放着，下次误用小档去钳大电流</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>钳形表和万用表的分工，一句话记住：</b>
      <b>要电流、不想停机 → 钳形表</b>（不断线、只能测交流、精度一般）；
      <b>要电压电阻通断、或者要精确的小电流 → 万用表</b>（要接表笔，测电流得断开串入）。
      <span class="sub">现场最常见的组合就是：万用表量电压找断点，钳形表量电流看负载和漏电。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="c3-7">
    <div class="qz" data-q="钳形表能不用断开电路就测电流，靠的是什么原理？"
         data-opts="欧姆定律|电磁感应——钳口是可开合的铁芯，被测导线相当于一匝一次绕组，它是一台电流互感器|霍尔效应，所有钳形表都一样"
         data-right="1"
         data-why="电流互感器。钳口合上形成完整磁路，被测导线穿过去就是只有一匝的一次绕组，钳口上的二次绕组感应出成比例的小电流。正因为靠交变磁场，普通钳形表只能测交流；要测直流得用霍尔式的 AC/DC 钳形表。"></div>
    <div class="qz" data-q="钳住一台运行中单相设备的整根两芯电缆，读数 0.00 A。为什么？"
         data-opts="设备没工作|L 和 N 的电流大小相等方向相反，磁场抵消了，应该只钳其中一根|电缆断了"
         data-right="1"
         data-why="抵消了。钳口读的是穿过它的所有电流的矢量和；单相回路里火线送出去多少，零线就送回来多少，方向相反加起来为零。必须把要测的那一根单独剥出来钳，或者在端子排上一根一根钳。"></div>
    <div class="qz" data-q="把三相四线全部钳进钳口，读数 0.6 A（三相都在正常运行）。说明什么？"
         data-opts="表坏了|有 0.6A 的电流从别处漏走了——这正是漏电保护器的检测原理|三相不平衡，属于正常"
         data-right="1"
         data-why="有漏电。正常时穿过钳口的电流之和应该是零（去多少回多少），读到不为零的数，说明有一部分电流经外壳、经人体或经绝缘损坏处流进大地、没从零线回来。漏电保护器里的零序电流互感器就是这么工作的，家用整定值一般是 30mA。"></div>
    <div class="qz" data-q="要量一个约 0.3 A 的小电流，钳形表读数跳得厉害。最实用的办法是？"
         data-opts="换一台更贵的表|把导线在钳口里多绕几圈，读数除以圈数|多量几次取平均"
         data-right="1"
         data-why="绕几圈。钳口感应的是安匝数，同一根导线穿过钳口 5 次相当于 5 匝，读数放大 5 倍，再除以 5 就是真实电流——而表的末位分辨率没变，等效精度提高了 5 倍。注意圈数数的是「导线从钳口里过了几趟」。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 3 章 3.7 节（书内 P61~P62）<br>下一节：3.8 绝缘电阻表 —— 兆欧表，量绝缘好不好</div>
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
   钳形表：钳口（可开合的铁芯环）+ 表身
   ================================================================
   canvas 的角度：0=右、π/2=下、π=左。所以下半环是 0→π，上半环是 π→2π。
   **铰链在左端（角度 π 那个点）**，上半环绕它转开 —— 真表就是这么开的。 */
function arcBand(g, cx, cy, R, t, a0, a1, fill, line){
  g.beginPath();
  g.arc(cx, cy, R, a0, a1);
  g.arc(cx, cy, R - t, a1, a0, true);
  g.closePath();
  g.fillStyle = fill; g.fill();
  g.strokeStyle = line; g.lineWidth = 1.2; g.lineJoin = 'round'; g.stroke();
}
/* open：0 = 合严，0.10 = 留了条缝，0.55 = 张开 */
function clampHead(g, cx, cy, R, t, open, o){
  o = o || {};
  const gr = EP.cyl(g, cy - R, cy + R, P.steelDD, P.steel, P.chrome);
  /* 上半环（可动）：绕左端铰链转开 */
  g.save();
  g.translate(cx - R + t/2, cy); g.rotate(-open); g.translate(-(cx - R + t/2), -cy);
  arcBand(g, cx, cy, R, t, Math.PI, Math.PI*2, gr, P.steelDD);
  g.restore();
  /* 下半环（固定） */
  arcBand(g, cx, cy, R, t, 0, Math.PI, gr, P.steelDD);
  /* 二次绕组：绕在下半环上的几匝漆包线 */
  g.save();
  g.strokeStyle = P.copper; g.lineWidth = 1.6; g.lineCap = 'round';
  /* 绕组画在环的**右下**：正下方是表身接进来的地方，会被机身盖掉一半 */
  for(let i = 0; i < 6; i++){
    /* 绕组画在环的**正下方**：外端正好伸进机身顶部，像引线进手柄那样 —— 这是唯一
       不会横跨被测导线的位置（右下、左下在钳大环时都会压到下面那根线，截图抓到的） */
    const a = Math.PI*0.43 + i*Math.PI*0.028;
    g.beginPath();
    g.moveTo(cx + Math.cos(a)*(R + 3.5), cy + Math.sin(a)*(R + 3.5));
    g.lineTo(cx + Math.cos(a)*(R - t - 3.5), cy + Math.sin(a)*(R - t - 3.5));
    g.stroke();
  }
  g.restore();
  /* 磁通：只有合严了才是一条完整磁路 */
  if(o.flux && open < 0.03){
    g.save();
    g.strokeStyle = C.acc; g.lineWidth = 1.4; g.setLineDash([5,4]);
    g.globalAlpha = 0.85;
    g.beginPath(); g.arc(cx, cy, R - t/2, 0, Math.PI*2); g.stroke();
    g.restore();
    [0.4, 1.5, 2.6, 3.7, 4.8, 5.9].forEach(function(a){
      const r = R - t/2;
      EC.head(g, cx + Math.cos(a)*r, cy + Math.sin(a)*r,
              -Math.sin(a), Math.cos(a), 5, C.acc);
    });
  }
  /* 没合严：把那条缝标出来 */
  if(open > 0.03 && open < 0.3){
    const hx = cx + R - t/2, hy = cy;
    g.save();
    g.strokeStyle = C.err; g.lineWidth = 1.6;
    g.beginPath(); g.arc(hx + 4, hy - 6, 9, -1.2, 1.2); g.stroke();
    g.restore();
    /* 放 cy-10 会撞上导线右端那行「去负载 2200 W」，挪到导线下方 */
    txt(g, '有缝', cx + R + 20, cy + 18, {sz:9, b:1, c:C.err, al:'left'});
  }
  return [cx, cy + R];
}
/* 表身：接在下半环的底部 */
function clampBody(g, cx, top, w, h, reading, o){
  o = o || {};
  g.save();
  EP.rr(g, cx - w/2, top, w, h, 9);
  g.fillStyle = EP.cyl(g, top, top + h, '#14171b', P.body, P.bodyL); g.fill();
  g.strokeStyle = '#0d1013'; g.lineWidth = 1.3; g.stroke();
  /* 扳机（推开钳口的那颗） */
  EP.rr(g, cx - w/2 - 5, top + h*0.14, 6, h*0.20, 3);
  g.fillStyle = P.bakeliteL; g.fill(); g.stroke();
  g.restore();
  const lw = w - 14, lh = h*0.34;
  EP.readout(g, cx - lw/2, top + 8, lw, lh, '', {});
  /* 字号按机身宽自适应：机身只有七八十像素，写死字号会让读数溢出机身（截图抓到的）。
     单位不进读数，交给左边那个档位字（A~） */
  const sz = Math.min(lh*0.5, (lw - 16)/(reading.length*0.60));
  txt(g, reading, cx + lw/2 - 7, top + 8 + lh/2,
      {sz:Math.max(10, sz), b:1, c:P.lcdInk, al:'right'});
  if(o.mode) txt(g, o.mode, cx - lw/2 + 7, top + 8 + lh/2, {sz:8.5, b:1, c:P.lcdInk, al:'left'});
  /* 量程旋钮 */
  const ky = top + h*0.66, kr = Math.min(w*0.24, 16);
  g.save();
  const kg = g.createRadialGradient(cx - kr*0.4, ky - kr*0.4, kr*0.2, cx, ky, kr);
  kg.addColorStop(0, '#6b737d'); kg.addColorStop(0.6, '#23272c'); kg.addColorStop(1, '#0d1013');
  g.fillStyle = kg;
  g.beginPath(); g.arc(cx, ky, kr, 0, Math.PI*2); g.fill();
  g.strokeStyle = '#0a0d10'; g.lineWidth = 1.2; g.stroke();
  g.strokeStyle = '#fff'; g.lineWidth = 2.2; g.lineCap = 'round';
  g.beginPath(); g.moveTo(cx, ky); g.lineTo(cx, ky - kr*0.78); g.stroke();
  g.restore();
}

/* ================================================================
   场景 1：不断线怎么测
   ================================================================
   2200 W / 220 V → 10.0 A。钳口没合严时磁阻变大，读数偏小（按 9.2 A 示意）。 */
const I1 = 10.0;
const CASE1 = [
  {t:'钳口张开', open:0.55, read:0, ok:0,
   st:'钳口开着，磁路是断的',
   b:'铁芯没有合上，被测导线周围的磁场<b>没有一条完整的路可走</b>，二次绕组也就感应不到东西。' +
     '钳形表和普通互感器的唯一区别，就是它的铁芯<b>能打开一条缝把导线放进去</b> —— ' +
     '放进去以后必须合严。',
   tip:'扳机就是干这个的：按住扳机钳口张开，套住导线后松手，弹簧把它压回去。'},
  {t:'钳住导线', open:0, read:I1, ok:1,
   st:'合严了：读数就是这根线里的电流',
   b:'铁芯闭合，磁通有了完整通路。被测导线是<b>只有一匝的一次绕组</b>，' +
     '钳口上的二次绕组感应出成比例的小电流，表按变比换算成 <b>10.00 A</b>。' +
     '<b>全程没有断线、没有碰到导体。</b>',
   tip:'尽量让<b>导线落在钳口正中间</b>，贴着边缘时误差会变大。'},
  {t:'没合严', open:0.10, read:9.2, ok:0,
   st:'留了条缝：读数偏小',
   b:'钳口没合到底、接合面有铁锈或油污，磁路上就多了一段<b>空气隙</b>。' +
     '空气的磁阻比铁芯大得多，同样的电流产生的磁通变少，<b>读数偏小</b> —— ' +
     '这里读到 <b>9.2 A</b>，比真实值少了 8%。',
   tip:'<b>读数偏小先看钳口</b>：合到底没有、接合面干不干净、有没有磕碰变形。' +
       '钳口是钳形表最娇气的部分，别拿它当扳手用。'}
];
const S1 = { k:1 };
const st1 = new Stage('cv0', 360, 324);
const CC1 = [180, 86], CR1 = 48, CT1 = 14;

function draw1(){
  const g = st1.g; st1.clear();
  const K = CASE1[S1.k];
  EP.heading(g, 12, 14, '钳形表', K.t);

  /* 被测导线：先画线再画钳口，钳口才盖得住线、看着像穿过去 */
  EP.wire(g, new Path([[14,CC1[1]],[346,CC1[1]]]), {c:'black', kind:'thick'});
  /* 三种情形都要画电流箭头：**导线里的 10 A 一直在流**，钳口张开只是表读不到。
     张开时不画的话，看着像「钳口一开电流就没了」 */
  EP.flow(g, new Path([[14,CC1[1]],[346,CC1[1]]]),
          {gap:64, kind:'cur', dir:1, phase:0, skip:[[110,250]]});
  txt(g, '来自电源', 58, 64, {sz:9, c:C.tx3});
  txt(g, '去负载 2200 W', 292, 64, {sz:9.5, b:1, c:C.tx2});

  clampHead(g, CC1[0], CC1[1], CR1, CT1, K.open, {flux:true});
  clampBody(g, CC1[0], CC1[1] + CR1, 80, 112, K.read.toFixed(2), {mode:'A~'});
  hot(g, CC1[0], CC1[1], CR1 + 10, {a:0.4});

  if(S1.k === 1) EP.chip(g, '磁通有路可走', 282, 128,
                         {sz:9, b:1, c:C.acc, fill:C.accbg, line:C.acc});

  box(g, 18, 282, 324, 32, 6, K.ok ? C.okbg : C.errbg, K.ok ? C.ok : C.err, 1);
  txt(g, K.ok ? '读 10.00 A —— 没断线、没碰导体，电流就量到了'
              : (S1.k === 0 ? '钳口没合上：磁路断了，读 0.00 A'
                            : '钳口留了条缝：磁阻变大，读数偏小到 9.2 A'),
      180, 298, {sz:10.5, b:1, c: K.ok ? C.ok : C.err});
}
function note1(){
  const K = CASE1[S1.k];
  $('s1a').textContent = I1.toFixed(1) + ' A';
  $('s1b').textContent = K.read.toFixed(2) + ' A';
  $('s1c').textContent = K.ok ? '能' : (S1.k === 0 ? '没读数' : '不能，偏小');
  $('n0').innerHTML = '<div class="st' + (K.ok ? ' good' : ' bad') + '">' + K.st + '</div>' +
    K.b + '<div class="tip' + (K.ok ? ' info' : '') + '" style="margin-top:8px">' + K.tip + '</div>';
}
document.getElementById('s1k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S1.k = +b.dataset.k;
  document.querySelectorAll('#s1k .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S1.k);
  });
  note1(); draw1();
});
st1.cv.addEventListener('click', function(ev){
  const p = st1.pick(ev);
  if(Math.hypot(p[0]-CC1[0], p[1]-CC1[1]) < CR1 + 14){
    S1.k = (S1.k === 1) ? 0 : 1;
    document.querySelectorAll('#s1k .btn').forEach(function(t){
      t.classList.toggle('on', +t.dataset.k === S1.k);
    });
    note1(); draw1();
  }
});

/* ================================================================
   场景 2：只能钳一根
   ================================================================
   单相回路 L、N 电流大小相等方向相反，两根一起钳磁场抵消 → 读 0.00 A。 */
const LY = 104, NY = 148, WX0 = 20, WX1 = 292;
const CASE2 = [
  {t:'火线 L', cy:LY,  R:38, read:10, why:'负载电流'},
  {t:'零线 N', cy:NY,  R:38, read:10, why:'一样大'},
  {t:'L + N', cy:126, R:46, read:0,  why:'抵消了'}
];
const S2 = { k:0, ph:0 };
const st2 = new Stage('cv1', 360, 332);
const PL = new Path([[WX0,LY],[WX1,LY]]), PN = new Path([[WX0,NY],[WX1,NY]]);

function draw2(dt){
  const g = st2.g; st2.clear();
  const K = CASE2[S2.k];
  S2.ph += dt * 26;
  EP.heading(g, 12, 14, '单相回路', '钳住 ' + K.t);

  /* 负载 */
  box(g, WX1, 96, 48, 60, 6, C.box, C.boxLine, 1.2);
  txt(g, '负载', WX1 + 24, 116, {sz:9.5, c:C.tx3});
  txt(g, '2200 W', WX1 + 24, 132, {sz:10, b:1, c:C.tx2});

  /* 两根导线：L 向右送出去，N 向左送回来 —— 方向相反是这一屏的全部 */
  EP.wire(g, PL, {c:'red', kind:'thick'});
  EP.wire(g, PN, {c:'black', kind:'thick'});
  EP.flow(g, PL, {gap:58, kind:'cur', dir:1,  phase:S2.ph, skip:[[130,236]]});
  EP.flow(g, PN, {gap:58, kind:'cur', dir:-1, phase:S2.ph, skip:[[130,236]]});
  txt(g, 'L 火线　10 A 出去', 22, 86, {sz:9.5, b:1, c:C.L, al:'left'});
  txt(g, 'N 零线　10 A 回来', 22, 168, {sz:9.5, b:1, c:C.N, al:'left'});

  /* 钳口 + 表身 */
  clampHead(g, 190, K.cy, K.R, 12, 0, {});
  clampBody(g, 190, K.cy + K.R, 72, 84, K.read.toFixed(2), {mode:'A~'});

  const good = (K.read > 0);
  box(g, 18, 290, 324, 32, 6, good ? C.okbg : C.errbg, good ? C.ok : C.err, 1);
  txt(g, S2.k === 2 ? '两根一起钳：10 A 出去 + 10 A 回来 = 0，读 0.00 A'
                    : '读 10.00 A —— 这就是负载电流',
      180, 306, {sz:10.5, b:1, c: good ? C.ok : C.err});
}
function note2(){
  const K = CASE2[S2.k];
  $('s2a').textContent = K.t;
  $('s2b').textContent = K.read.toFixed(2) + ' A';
  $('s2c').textContent = K.why;
  let h;
  if(S2.k === 2){
    h = '<div class="st bad">读 0 不是表坏了，是抵消了</div>' +
        '钳口读到的是<b>穿过它的所有电流的「和」</b>，方向要算进去。' +
        '火线送 10 A 出去、零线送 10 A 回来，<b>方向正好相反，加起来是零</b>。' +
        '<div class="tip" style="margin-top:8px">现场表现是<b>「设备明明在转，钳形表却是 0」</b> —— ' +
        '多半是把整根电缆钳进去了。三芯电缆里几根线都在同一根护套里，' +
        '<b>要把被测的那一根单独剥出来，或者在端子排上一根一根钳</b>。</div>';
  }else{
    h = '<div class="st good">钳一根，读到的就是这根线里的电流</div>' +
        (S2.k === 0
          ? '钳住火线，读 <b>10.00 A</b> —— 这就是负载取用的电流。<b>这是最常用的钳法。</b>'
          : '钳住零线，读数<b>和火线一模一样</b>：单相回路里，' +
            '从火线出去多少，就从零线回来多少。') +
        '<div class="tip info" style="margin-top:8px">' +
        '既然两根都能读到同一个数，<b>钳哪一根都行</b> —— 现场看哪一根好下钳口就钳哪一根。' +
        '但<b>绝不能两根一起</b>，试试第三个按钮。</div>';
  }
  $('n1').innerHTML = h;
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
   场景 3：钳三根查漏电
   ================================================================
   三相瞬时值之和恒为零 → 三根一起钳读 0；读到不为零的数就是漏走的那部分。
   这正是漏电保护器里零序电流互感器的工作方式。 */
const T3 = [84, 116, 148];
const CASE3 = [
  {t:'只钳一根', cy:T3[2], R:30, read:10, leak:0, why:'这一相的电流'},
  {t:'三根一起', cy:T3[1], R:50, read:0,  leak:0, why:'平衡，和为零'},
  {t:'三根一起', cy:T3[1], R:50, read:0.5, leak:1, why:'有漏电'}
];
const S3 = { k:0, ph:0 };
const st3 = new Stage('cv2', 360, 324);

function draw3(dt){
  const g = st3.g; st3.clear();
  const K = CASE3[S3.k];
  S3.ph += dt * 26;
  EP.heading(g, 12, 14, '三相回路', S3.k === 2 ? '有漏电' : K.t);

  /* 电动机 */
  box(g, 292, 72, 48, 100, 6, C.box, C.boxLine, 1.2);
  txt(g, '三相', 316, 104, {sz:9.5, c:C.tx3});
  txt(g, '电动机', 316, 120, {sz:10, b:1, c:C.tx2});

  /* 三根相线 */
  /* 国标三相色：L1 黄 L2 绿 L3 红 —— 和 1.5 那节用的是同一套，别另配 */
  const cols = ['#e8b93c', '#4fc04a', '#ff6b6b'];
  T3.forEach(function(y, i){
    const p = new Path([[20,y],[292,y]]);
    EP.wire(g, p, {color: cols[i], kind:'thick'});
    EP.flow(g, p, {gap:58, kind:'cur', dir:1, phase:S3.ph + i*14, skip:[[120,250]]});
    txt(g, 'L' + (i+1), 14, y - 12, {sz:9.5, b:1, c:C.tx2, al:'left'});
  });
  txt(g, '每相 10 A', 62, 62, {sz:9.5, c:C.tx3, al:'left'});

  /* 漏电：一部分电流从外壳流进大地，没从这三根线回来 */
  if(K.leak){
    const lp = new Path([[316,172],[316,228]]);
    lp.dash(g, 2, C.err, [5,4]);
    EC.head(g, 316, 226, 0, 1, 6, C.err);
    g.save(); g.strokeStyle = C.err; g.lineWidth = 2; g.lineCap = 'round';
    [[11,0],[7.5,4],[4,8]].forEach(function(a){
      g.beginPath(); g.moveTo(316-a[0], 230+a[1]); g.lineTo(316+a[0], 230+a[1]); g.stroke();
    });
    g.restore();
    txt(g, '0.5 A', 306, 200, {sz:9.5, b:1, c:C.err, al:'right'});
    txt(g, '漏进大地', 306, 214, {sz:8.5, c:C.err, al:'right'});
  }

  clampHead(g, 186, K.cy, K.R, 12, 0, {});
  clampBody(g, 186, K.cy + K.R, 72, 80, K.read.toFixed(2), {mode:'A~'});

  const bad = (S3.k === 2);
  box(g, 18, 282, 324, 32, 6, bad ? C.errbg : C.okbg, bad ? C.err : C.ok, 1);
  txt(g, S3.k === 0 ? '钳一根：读 10.00 A，这一相的电流'
                    : (S3.k === 1 ? '三根一起：去多少回多少，和为零 —— 读 0.00 A'
                                  : '三根一起却读到 0.50 A —— 这些电流没从线上回来'),
      180, 298, {sz:10.5, b:1, c: bad ? C.err : C.ok});
}
function note3(){
  const K = CASE3[S3.k];
  $('s3a').textContent = S3.k === 0 ? 'L3 一根' : 'L1 L2 L3';
  $('s3b').textContent = K.read.toFixed(2) + ' A';
  $('s3c').textContent = K.why;
  let h;
  if(S3.k === 0){
    h = '<div class="st good">钳一根，读到的是这一相的电流</div>' +
        '和单相一样。<b>查三相电机最常规的做法就是三相各钳一次、把三个读数摆在一起比</b> —— ' +
        '正常时三相基本相等；一相明显偏大或偏小，就要停下来查缺相、绕组或者负载。' +
        '<div class="tip info" style="margin-top:8px">钳<b>两根</b>会怎样？读数还是 10 A —— ' +
        '因为三相之和为零，两根之和就等于第三根（只是方向相反，表只显示大小）。</div>';
  }else if(S3.k === 1){
    h = '<div class="st good">三根一起钳：平衡时读 0</div>' +
        '三相电流的相位互差 120°，<b>瞬时值加起来恒等于零</b>。' +
        '三根线全部穿过钳口，磁场互相抵消，表读 <b>0.00 A</b>。' +
        '<div class="tip info" style="margin-top:8px">这不是废操作 —— <b>它是一个「查漏电」的动作</b>：' +
        '读数应该是 0，读到不为零的数就说明有电流没从这几根线回来。切到第三个按钮看。</div>';
  }else{
    h = '<div class="st bad">读到 0.50 A：有电流从别处漏走了</div>' +
        '电动机绝缘损坏，一部分电流经<b>外壳流进大地</b>，没从这三根线上回来。' +
        '于是穿过钳口的电流之和不再是零，<b>差多少，表就读多少</b>。' +
        '<div class="tip" style="margin-top:8px">' +
        '<b>漏电保护器里装的正是这样一个套住全部线的铁芯环（零序电流互感器）</b>：' +
        '正常时和为零不动作，一旦差值超过整定值（家用一般 <b>30 mA</b>）就跳闸。' +
        '<span class="sub">所以零线必须穿过漏电保护器，而保护器出线侧的零线绝对不能再接地 —— ' +
        '那会让一部分电流绕过铁芯回去，一送电就跳。</span></div>';
  }
  $('n2').innerHTML = h;
}
document.getElementById('s3k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S3.k = +b.dataset.k;
  document.querySelectorAll('#s3k .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S3.k);
  });
  note3();
});

/* ================================================================
   场景 4：小电流绕几圈
   ================================================================
   钳口感应的是**安匝数**：同一根导线穿过钳口 N 次 = N 匝一次绕组，
   读数放大 N 倍，除回去就是真实电流，而表的末位分辨率没变 —— 等效精度提高 N 倍。 */
const I4 = 0.35, RES4 = 0.01;
const S4 = { n:5 };
const st4 = new Stage('cv3', 360, 300);
const CC4 = [180, 88], CR4 = 50, CT4 = 14;

function draw4(){
  const g = st4.g; st4.clear();
  const n = S4.n, inner = CR4 - CT4;
  EP.heading(g, 12, 14, '小电流', '绕 ' + n + ' 圈');

  /* 导线在钳口里绕 n 圈：n 条水平线穿过钳口，环外交替用半圆连起来 */
  const ys = [];
  for(let i = 0; i < n; i++) ys.push(CC4[1] - inner + (2*inner)*(i + 0.5)/n);
  const XL = 60, XR = 300;
  ys.forEach(function(y){
    EP.wire(g, new Path([[XL, y],[XR, y]]), {c:'black', kind: n > 3 ? 'normal' : 'thick'});
  });
  g.save();
  g.strokeStyle = EP.WIRE_C.black; g.lineWidth = n > 3 ? 2.8 : 4.2; g.lineCap = 'round';
  for(let i = 0; i < n - 1; i++){
    const y0 = ys[i], y1 = ys[i+1], r = (y1 - y0)/2, right = (i % 2 === 0);
    g.beginPath();
    g.arc(right ? XR : XL, (y0 + y1)/2, r, right ? -Math.PI/2 : Math.PI/2,
          right ? Math.PI/2 : Math.PI*1.5);
    g.stroke();
  }
  /* 进线和出线 */
  g.beginPath(); g.moveTo(XL, ys[0]); g.lineTo(20, ys[0]); g.stroke();
  const last = ys[n-1], outRight = ((n - 1) % 2 === 0);
  g.beginPath(); g.moveTo(outRight ? XR : XL, last);
  g.lineTo(outRight ? 340 : 20, last); g.stroke();
  g.restore();
  /* 标注放左下角的空地：放画布顶上会被最上面那圈导线穿过（n 大时导线顶到 y=52） */
  txt(g, '同一根导线', 22, 152, {sz:9.5, c:C.tx3, al:'left'});
  txt(g, '穿过钳口 ' + n + ' 次', 22, 166, {sz:10, b:1, c:C.tx2, al:'left'});

  clampHead(g, CC4[0], CC4[1], CR4, CT4, 0, {});
  clampBody(g, CC4[0], CC4[1] + CR4, 80, 104, (I4*n).toFixed(2), {mode:'A~'});

  /* 换算 */
  const err = RES4/n/I4*100;
  box(g, 18, 258, 324, 32, 6, n > 1 ? C.okbg : C.warnbg, n > 1 ? C.ok : C.warn, 1);
  txt(g, n === 1
        ? '直接钳：读 0.35 A，末位一格就是 0.01 A（约 3%），数字会跳'
        : '读 ' + (I4*n).toFixed(2) + ' A ÷ ' + n + ' 圈 = 0.35 A，'
          + '末位相当于 ' + (RES4/n).toFixed(4).replace(/0+$/,'') + ' A（约 '
          + err.toFixed(1) + '%）',
      180, 274, {sz:10, b:1, c: n > 1 ? C.ok : C.warn});
}
function note4(){
  const n = S4.n;
  $('s4lab').textContent = n + ' 圈';
  $('s4a').textContent = I4.toFixed(2) + ' A';
  $('s4b').textContent = (I4*n).toFixed(2) + ' A';
  $('s4c').textContent = (I4*n/n).toFixed(3) + ' A';
  const err = RES4/n/I4*100;
  $('n3').innerHTML = (n === 1
    ? '<div class="st warn">直接钳：数字在跳</div>' +
      '0.35 A 在这一档上只有 35 个字，<b>末位一格就是 0.01 A</b> —— ' +
      '相当于 <b>3%</b> 的跳动，再加上外界干扰，读数很难稳下来。' +
      '<div class="tip" style="margin-top:8px"><b>把滑杆往右拖</b>，' +
      '让导线在钳口里多绕几圈看看。</div>'
    : '<div class="st good">绕 ' + n + ' 圈，读数放大 ' + n + ' 倍</div>' +
      '钳口感应到的是<b>安匝数</b>（电流 × 匝数）。同一根导线穿过钳口 ' + n + ' 次，' +
      '对铁芯来说就是 <b>' + n + ' 匝</b>，安匝数是原来的 ' + n + ' 倍；' +
      '表按「一匝」换算，读出来就是 <b>' + (I4*n).toFixed(2) + ' A</b>，' +
      '<b>除以 ' + n + ' 才是真实电流 0.35 A</b>。' +
      '<div class="tip info" style="margin-top:8px">好处在精度：表的末位还是 0.01 A，' +
      '但除以 ' + n + ' 之后<b>相当于 ' + (RES4/n).toFixed(4).replace(/0+$/,'') + ' A</b>，' +
      '误差占比从 3% 降到 <b>' + err.toFixed(1) + '%</b>。' +
      '<span class="sub">圈数数的是「导线从钳口里过了几趟」，不是绕了表几圈。' +
      '这招只对小电流有用 —— 电流大时绕圈会超量程，粗电缆也绕不动。</span></div>');
}
$('s4n').addEventListener('input', function(){
  S4.n = +this.value; note4(); draw4();
});

/* ================================================================
   绑定
   ================================================================ */
function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会清空画布。屏 2、3 在 rAF 里每帧重画，静态的屏 1、4 必须在这儿补画 */
  draw1(); draw2(0); draw3(0); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:3, sec:'3.7'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('3.7');
  let h = '';
  h += nb.prev ? '<a href="'+nb.prev.f+'">‹ '+nb.prev.id+' '+nb.prev.t+'</a>'
               : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next ? '<a class="next" href="'+nb.next.f+'">'+nb.next.id+' '+nb.next.t+' ›</a>'
               : '<span>3.8 绝缘电阻表还没做</span>';
  $('pager').innerHTML = h;
})();

loop(function(dt){
  if(cur === 1) draw2(dt);
  else if(cur === 2) draw3(dt);
});
  }
});
})();
