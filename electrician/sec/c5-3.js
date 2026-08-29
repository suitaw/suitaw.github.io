/* 5.3 接触器与继电器的检测 —— 本节内容的唯一真相。
   对应《零基础学电工》第 5 章 5.3 节（书内 P83~P85）。

   四屏：
   ① 先认端子     量之前得先知道哪两个脚是一对（4.5 屏 2 那套编号在这儿落地）
   ② 量线圈       A1-A2，**有一定阻值才正常**；0Ω 是匝间短路、∞ 是断线
   ③ 量触点       不通电时主触头 ∞、动断触点 0Ω；**用手按下去强制吸合再量一遍**
   ④ 继电器       同一套路，小一号

   **屏 3 那个「用手按下去」是这一节最值钱的一招**（书 P84 原文）：
   接触器是电磁驱动的，不通电时主触头本来就是断开的，量出 ∞ 说明不了任何问题。
   **按住接触器上端的活动部分强制让触头闭合，再量一次** —— 这时候才知道触点通不通。
   不用接 380 V、不用装到柜子里，一只手一支表就能把一只接触器验完。

   数字口径（书上原文，别凭记忆改）：
   - 端子标识：**1、2 是 L1 相，3、4 是 L2 相，5、6 是 L3 相，13、14 是辅助触头，
     A1、A2 是线圈**（书 P84 图 5-8 的提示说明，和 4.5 屏 2 那套编号完全一致）
   - **交流接触器线圈实测 1.694 kΩ**（书 P84 图 5-9，380 V 线圈）
   - 常开触头断开时 ∞（书上实测显示 OL），按下强制闭合后 **0Ω**
   - 继电器：**常闭触头间 0Ω、常开触头间 ∞、线圈有一定阻值**（书 P83 提示说明）
   - 判据四条（书 P84~85）：线圈阻值 ∞ 或 0 → 线圈损坏；断开时 0Ω → 触点粘连；
     闭合时 ∞ → 触点断路；**4 组开关任一组坏 → 整只坏**

   画法上一条硬规矩：**每个端子都画一小段引出线伸到器件外面，表笔搭在引出线上**。
   直接搭在机身上的端子的话，EP.leads 那条竖段会纵穿整只接触器（5.2 那节试出来的教训）。 */
(function(){
'use strict';
ELEC.reg({
  id: '5.3',
  file: 'c5-3.html',
  title: '5.3 接触器与继电器的检测',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>先认端子</button>
    <button class="tab" data-i="1"><span class="n">2</span>量线圈</button>
    <button class="tab" data-i="2"><span class="n">3</span>量触点</button>
    <button class="tab" data-i="3"><span class="n">4</span>继电器</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">量之前，先知道哪两个脚是一对</div>
    一只接触器上有十几个接线端子。<b>不知道哪两个是一对，表笔往哪儿搭都是白搭。</b>
    好在这些端子上都印着号，<b>号码本身就把话说清楚了</b>（4.5 那一节讲过这套编号）。
    <b>点一组看看它是哪两个脚。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">线圈 A1-A2</button>
        <button class="btn sm" data-k="1">主触头 1-2</button>
        <button class="btn sm" data-k="2">主触头 3-4</button>
        <button class="btn sm" data-k="3">主触头 5-6</button>
        <button class="btn sm" data-k="4">辅助 13-14</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这一对</div><div class="v" id="s1a">A1 - A2</div></div>
        <div class="num"><div class="k">是什么</div><div class="v" id="s1b">线圈</div></div>
        <div class="num hi"><div class="k">正常读数</div><div class="v" id="s1c">1.694 kΩ</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">一只接触器上的端子，一张表看完</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>端子</th><th>是什么</th><th>不通电时量出来</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">A1<br>A2</td><td><b>线圈</b>（控制电路接这儿）</td>
          <td><b>一定的阻值</b>，几百欧到几千欧</td></tr>
        <tr><td class="eu-s">1-2<br>3-4<br>5-6</td><td><b>三对主触头</b>（分别是 L1、L2、L3 相）</td>
          <td><b>∞</b> —— 它们是动合触点，不通电就是断的</td></tr>
        <tr><td class="eu-s">13<br>14</td><td><b>辅助动合触点</b>（个位 3、4 ＝ 动合）</td>
          <td><b>∞</b></td></tr>
        <tr><td class="eu-s">21<br>22</td><td>辅助<b>动断</b>触点（个位 1、2 ＝ 动断）</td>
          <td><b>0Ω</b> —— 它不通电时本来就是通的</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>「不通电时量出来是什么」这一列，才是判断好坏的基准。</b>
      量到不该有的数才叫坏 —— 比如主触头不通电就量到 0Ω（粘连），
      或者动断触点不通电却是 ∞（断路）。
      <span class="sub">编号规则见 4.5 屏 2：主触头单数在上、双数在下；
      辅助触点两位数，个位 1、2 是动断，个位 3、4 是动合。</span>
    </div>
  </div>

  <div class="bet" data-bet="c53-pair" data-q="表笔搭在接触器的 1 号和 3 号端子上，读数是 ∞。这说明接触器坏了吗？"
       data-opts="坏了，应该是通的|说明不了任何问题——1 和 3 根本不是一对，它们分属 L1 相和 L2 相|说明线圈断了" data-right="1"
       data-after="说明不了任何问题。1-2 是一对（L1 相的主触头），3-4 是另一对（L2 相）。1 和 3 分属两相，本来就不相通，量到 ∞ 是理所当然的。量之前先看清端子号是一对，这是第一步。"></div>
</section>

<!-- ================= 场景 2：量线圈 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">线圈：有一定阻值才正常</div>
    线圈就是一大卷漆包线，<b>量出来应该是几百欧到几千欧的一个具体数</b>。
    量到 <b>0Ω</b> 或者 <b>∞</b>，两种都是坏的。
    <b>切一种情况看看。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">正常</button>
        <button class="btn sm" data-k="1">线圈断线</button>
        <button class="btn sm" data-k="2">匝间短路</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">读数</div><div class="v" id="s2a">1.694 kΩ</div></div>
        <div class="num"><div class="k">判定</div><div class="v" id="s2b">正常</div></div>
        <div class="num hi"><div class="k">现场表现</div><div class="v" id="s2c">吸合正常</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">线圈阻值多少才算对</div>
    <b>没有一个通用的标准值</b> —— 它取决于线圈的额定电压和接触器的容量。
    大致的规律是：<b>线圈电压越高，匝数越多，阻值越大</b>。
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>读数</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">一个<br>具体数</td><td class="ok"><b>正常</b>。书上那只 380 V 线圈实测 <b>1.694 kΩ</b>；
          同型号 220 V 的会小不少</td></tr>
        <tr><td class="eu-s">∞</td><td><b>线圈断线</b>。现场表现：按启动<b>一点动静都没有</b>，
          接触器不吸合也不响</td></tr>
        <tr><td class="eu-s">0Ω 或<br>特别小</td><td><b>匝间短路</b>（漆包线绝缘破了，几圈搭在一起）。
          现场表现：<b>通电就发烫、冒烟，甚至跳闸</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>拿不准是不是正常值，就找一只同型号的量一下比。</b>
      两只同型号同电压的接触器，线圈阻值应该很接近。
      <span class="sub">2.5a 讲过一条：<b>量线圈量出几十欧、几百欧不要慌</b> ——
      那是铜线的直流电阻，不是短路。线圈工作时靠的是交流阻抗，比直流电阻大得多。</span>
    </div>
  </div>

  <div class="bet" data-bet="c53-coil" data-q="接触器不吸合，量 A1-A2 读数是 ∞。除了线圈本身断线，还有什么可能？"
       data-opts="只可能是线圈断了|也可能是表笔没搭牢、或者端子螺丝下面压着漆皮没刮干净|一定是电压不够" data-right="1"
       data-after="也可能是接触问题。量到 ∞ 之前先确认：表笔尖是不是真的碰到金属了（端子上可能有漆或氧化层）、表笔线本身有没有断（两支笔碰一起看是不是 0Ω）。排除这些之后再判线圈断线。这个习惯能省掉很多冤枉的更换。"></div>
</section>

<!-- ================= 场景 3：量触点 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">不通电量触点，量出 ∞ 说明不了什么</div>
    主触头是<b>动合</b>的 —— 不通电本来就是断的，量到 ∞ 完全正常，
    <b>可它到底能不能接通，这么量是量不出来的。</b>
    办法很简单：<b>用手按住接触器上端的活动部分，强制让触头闭合，再量一次。</b>
    <b>切「按下去」试试。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3p">
        <button class="btn on sm" data-p="0">不按</button>
        <button class="btn sm" data-p="1">用手按住</button>
      </div>
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">主触头 1-2</button>
        <button class="btn sm" data-k="1">辅助动合 13-14</button>
        <button class="btn sm" data-k="2">辅助动断 21-22</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">量哪一对</div><div class="v" id="s3a">1 - 2</div></div>
        <div class="num"><div class="k">现在</div><div class="v" id="s3b">没按</div></div>
        <div class="num hi"><div class="k">读数</div><div class="v" id="s3c">OL</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st good">按下去再量 —— 一只手一支表就能验完一只接触器</div>
    接触器不通电时衔铁是被弹簧顶开的，<b>用手指按住上端那块活动的塑料件</b>，
    衔铁被压下去，所有触点跟着动作 —— 和线圈得电时一模一样。
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>那一对</th><th>不按</th><th>按住</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">主触头<br>1-2 3-4 5-6</td><td>∞</td><td class="ok"><b>0Ω</b></td></tr>
        <tr><td class="eu-s">辅助动合<br>13-14</td><td>∞</td><td class="ok"><b>0Ω</b></td></tr>
        <tr><td class="eu-s">辅助动断<br>21-22</td><td class="ok"><b>0Ω</b></td><td>∞</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>四组开关（三对主触头 + 辅助）任何一组不对，整只接触器就得换。</b>
      <span class="sub">最常见的是主触头烧蚀：合上了却接触不良，量出来不是 0Ω 而是几欧、
      十几欧。这种接触器装上去电动机会缺相或者带不动负载，
      而且那个触点会越烧越厉害。</span>
    </div>
  </div>

  <div class="bet" data-bet="c53-press" data-q="按住接触器强制闭合后，量主触头 1-2 得到 8Ω。正常吗？"
       data-opts="正常，有点电阻很自然|不正常——闭合后应该接近 0Ω，8Ω 说明触点烧蚀、接触不良|不正常，说明线圈坏了" data-right="1"
       data-after="不正常。触头闭合就是两块银合金压在一起，正常应该是 0.0~0.1Ω 那个量级。8Ω 说明接触面已经烧蚀氧化得很厉害了。装上去会怎样：这一相电压掉一大截、电动机缺相或带不动，而且那 8Ω 上会持续发热，越烧越糟。这只接触器该换了。"></div>
</section>

<!-- ================= 场景 4：继电器 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">继电器：同一套路，小一号</div>
    中间继电器、时间继电器、各种小型继电器，<b>结构和接触器是一回事</b>：
    一个线圈带动一组触点。所以<b>检测方法也一模一样</b> ——
    量线圈有没有阻值，量触点在两种状态下通不通。
    <b>点一处量一量。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">线圈</button>
        <button class="btn sm" data-k="1">常闭触头</button>
        <button class="btn sm" data-k="2">常开触头</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">量哪儿</div><div class="v" id="s4a">线圈</div></div>
        <div class="num"><div class="k">正常读数</div><div class="v" id="s4b">有阻值</div></div>
        <div class="num hi"><div class="k">不正常就是</div><div class="v" id="s4c">0 或 ∞</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">继电器的三条判据（书上原文）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>量哪儿</th><th>正常</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">常闭触头<br>之间</td><td class="ok"><b>0Ω</b></td></tr>
        <tr><td class="eu-s">常开触头<br>之间</td><td class="ok"><b>∞</b></td></tr>
        <tr><td class="eu-s">线圈<br>两引脚间</td><td class="ok"><b>有一定的阻值</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>小型继电器多半是插在底座上的</b>，拔下来量最方便 —— 而且拔下来量的是继电器本身，
      不会被外部电路串进来的其他支路影响（3.6b 讲的「在路测电阻只会偏小」那条）。
      <span class="sub">继电器外壳上一般印着<b>内部接线图</b>和线圈电压，
      哪两个脚是线圈、哪几个是触点，照着图找就行。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">量得出触点和线圈，量不出「动作是否可靠」</div>
    电阻档能查出断线、短路、粘连、断路这些<b>硬故障</b>，
    但查不出<b>吸合不牢、动作迟缓、衔铁有异物卡滞</b>这类毛病。
    <div class="tip">
      这些只能<b>给线圈通上额定电压听声音、看动作</b>：
      吸合应该干脆利落一声"啪"，<b>持续嗡嗡响</b>就是吸合不到位
      （电压不够、衔铁有脏东西、短路环断了 —— 2.2 节讲过短路环）。
      <span class="sub">通电试的时候注意：<b>线圈电压必须对上铭牌</b>，
      220 V 的线圈接 380 V，几秒钟就冒烟。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="c5-3">
    <div class="qz" data-q="不通电时量接触器主触头 1-2，读数是 ∞。这说明什么？"
         data-opts="触点断路，接触器坏了|正常——主触头是动合触点，不通电本来就是断的；要用手按住强制闭合再量一次才知道它能不能接通|说明线圈断了"
         data-right="1"
         data-why="正常。主触头是动合（常开）触点，线圈不得电时本来就是断开的，量到 ∞ 是理所当然的，说明不了好坏。要验它能不能接通，就用手按住接触器上端的活动部分强制让衔铁吸合，再量一次——这时应该是 0Ω。一只手一支表就能把一只接触器验完，不用接 380V。"></div>
    <div class="qz" data-q="量接触器线圈 A1-A2，读数是 0Ω。什么毛病？"
         data-opts="正常，线圈就是一根导线|匝间短路——漆包线绝缘破了几圈搭在一起；现场表现是通电就发烫冒烟甚至跳闸|线圈断线"
         data-right="1"
         data-why="匝间短路。线圈是一大卷漆包线，正常应该量出几百欧到几千欧的一个具体数（书上那只 380V 线圈实测 1.694kΩ）。量到 0Ω 说明绝缘破损、几圈铜线搭在一起，等效匝数大减、电流猛增，通电就发烫冒烟。量到 ∞ 则是断线，表现是按启动一点动静都没有。"></div>
    <div class="qz" data-q="按住接触器强制闭合后，量辅助触点 21-22 得到 ∞。正常吗？"
         data-opts="不正常，应该是 0Ω|正常——21-22 个位是 1、2，是动断触点，按下去本来就该断开|看不出来"
         data-right="1"
         data-why="正常。个位 1、2 是动断（常闭）触点，它不通电时是通的（0Ω），动作后才断开（∞）。所以动断触点的判据和动合正好反过来：不按 0Ω、按下 ∞。这也是为什么量之前一定要先看清端子号——号码告诉你它是动合还是动断，你才知道该期待什么读数。"></div>
    <div class="qz" data-q="继电器线圈和触点量下来都正常，可通电后一直嗡嗡响、吸不牢。电阻档能查出这个毛病吗？"
         data-opts="能，再量一次就出来了|不能——电阻档只能查断线、短路、粘连、断路这类硬故障，吸合不牢要通电听声音看动作|能，量线圈电流"
         data-right="1"
         data-why="不能。电阻档查的是通断和阻值这些静态的东西，而吸合不牢、动作迟缓、衔铁卡滞属于机械和磁路问题。只能给线圈通上额定电压去听：正常是干脆一声「啪」，持续嗡嗡响说明吸合不到位——可能是电压不够、衔铁有脏东西、或者短路环断了（2.2 节讲过短路环的作用就是让吸力不再过零）。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 5 章 5.3 节（书内 P83~P85）<br>端子编号那套规则在 4.5 屏 2；「用手按住强制吸合」是书 P84 明写的方法</div>
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

const CANH = 296;
/* 接触器机身 26..166，万用表 212..340（孔 x 255/297 都在机身之外）——
   这样 EP.leads 的竖段不会纵穿器件。**每个端子都往器件外拉一小段引出线**，
   表笔搭在引出线端点上（5.2 那节试出来的规矩） */
const BX = 26, BY = 38, BW = 140, BH = 152;
const MT = {x:212, y:96, w:128, h:92};
const TOPY = 24, BOTY = 204, LFTX = 14, RGTX = 178;
const MAIN_X = [58, 96, 134];        /* 三对主触头的 x */
const YA = 78, YB = 134;             /* 线圈那一行 / 辅助那一行 */

function dot(g, x, y, c, r){
  g.save(); g.fillStyle = c; g.beginPath(); g.arc(x, y, r||2.6, 0, Math.PI*2); g.fill(); g.restore();
}
function tip(g, x, y, red){
  const c = red ? C.err : C.tx;
  g.save();
  g.fillStyle = c; g.beginPath(); g.arc(x, y, 3.6, 0, Math.PI*2); g.fill();
  g.globalAlpha = .45; g.strokeStyle = c; g.lineWidth = 1.4;
  g.beginPath(); g.arc(x, y, 7, 0, Math.PI*2); g.stroke();
  g.restore();
}
function term(g, x, y, n, on, dx, dy){
  g.save();
  g.strokeStyle = on ? C.acc : C.wire; g.lineWidth = 1.6;
  g.beginPath(); g.arc(x, y, 4.2, 0, Math.PI*2);
  g.fillStyle = on ? C.accbg : C.bg; g.fill(); g.stroke();
  g.restore();
  if(n) txt(g, n, x + (dx||0), y + (dy||-11), {sz:8, b:1, c: on ? C.acc : C.tx3});
}
/* 一只交流接触器的正面：机身 + 四组端子 + 每个端子一小段引出线 */
function contactor(g, o){
  o = o || {};
  const hi = o.hi;    /* 'coil' | 'm0' | 'm1' | 'm2' | 'aux' | 'nc' */
  box(g, BX, BY, BW, BH, 8, P.bakelite || C.box, C.boxLine, 1.5);
  box(g, BX + 26, BY + 52, BW - 52, 52, 4, C.box, C.boxLine, 1.1);
  txt(g, 'CJX2-1810', BX + BW/2, BY + 70, {sz:8.5, b:1, c:C.tx3});
  txt(g, o.pressed ? '按住了' : '不通电', BX + BW/2, BY + 88,
      {sz:8.5, c: o.pressed ? C.acc : C.tx3});

  /* 上端那块能按下去的活动件 */
  const py = o.pressed ? BY + 4 : BY - 4;
  box(g, BX + 40, py, BW - 80, 12, 3, o.pressed ? C.accbg : C.box,
      o.pressed ? C.acc : C.metalD, 1.4);

  /* 主触头：上排 1/3/5、下排 2/4/6，各拉一段引出线 */
  ['1','3','5'].forEach(function(n, i){
    const x = MAIN_X[i], on = hi === 'm' + i;
    new Path([[x, TOPY],[x, BY + 16]]).stroke(g, 2.2, on ? C.acc : C.wire);
    term(g, x, BY + 16, n, on);
  });
  ['2','4','6'].forEach(function(n, i){
    const x = MAIN_X[i], on = hi === 'm' + i;
    new Path([[x, BY + BH - 16],[x, BOTY]]).stroke(g, 2.2, on ? C.acc : C.wire);
    term(g, x, BY + BH - 16, n, on, 0, 13);
  });
  /* 线圈 A1 / A2：左右两侧 */
  const onC = hi === 'coil';
  new Path([[LFTX, YA],[BX + 14, YA]]).stroke(g, 1.8, onC ? C.acc : C.wire);
  new Path([[BX + BW - 14, YA],[RGTX, YA]]).stroke(g, 1.8, onC ? C.acc : C.wire);
  term(g, BX + 14, YA, 'A1', onC, -4, -12);
  term(g, BX + BW - 14, YA, 'A2', onC, 4, -12);
  /* 辅助 13 / 14（动合）或 21 / 22（动断），共用同一行 */
  const onA = hi === 'aux' || hi === 'nc';
  const nm = hi === 'nc' ? ['21','22'] : ['13','14'];
  new Path([[LFTX, YB],[BX + 14, YB]]).stroke(g, 1.8, onA ? C.acc : C.wire);
  new Path([[BX + BW - 14, YB],[RGTX, YB]]).stroke(g, 1.8, onA ? C.acc : C.wire);
  term(g, BX + 14, YB, nm[0], onA, -4, 13);
  term(g, BX + BW - 14, YB, nm[1], onA, 4, 13);
}
/* 表笔 + 万用表：pts 是 [[红x,红y],[黑x,黑y]] */
function meter(g, reading, pts, mode){
  const jacks = EP.meterUnit(g, MT.x, MT.y, MT.w, MT.h,
    {mode:mode || 'Ω', reading:reading, rsz:15,
     jacks:[{n:'COM'}, {n:'VΩ', red:true}], hot:1});
  if(pts){
    EP.leads(g, jacks[1], jacks[0], pts[0][0], pts[1][0],
             {yTop:TOPY - 10, yBot:BOTY, tipYR:pts[0][1], tipYB:pts[1][1]});
    tip(g, pts[0][0], pts[0][1], true);
    tip(g, pts[1][0], pts[1][1], false);
  }
}
function bar(g, l1, l2, kind){
  const bg = kind === 'ok' ? C.okbg : kind === 'err' ? C.errbg : C.accbg;
  const fg = kind === 'ok' ? C.ok : kind === 'err' ? C.err : C.acc;
  EC.box(g, 18, 250, 324, 38, 6, bg, fg, 1);
  txt(g, l1, 180, 263, {sz:10.5, b:1, c:fg});
  txt(g, l2, 180, 278, {sz:9, c:C.tx2});
}
/* 各组的测点坐标 */
function ptsOf(key){
  if(key === 'coil' || key === 'aux' || key === 'nc'){
    const y = (key === 'coil') ? YA : YB;
    return [[LFTX, y], [RGTX, y]];
  }
  const i = +key.slice(1);
  return [[MAIN_X[i], TOPY], [MAIN_X[i], BOTY]];
}

/* ================================================================
   场景 1：先认端子
   ================================================================ */
const PAIR = [
  {k:'coil', t:'A1 - A2', what:'线圈', read:'1.694 kΩ',
   bar:['A1 和 A2 是线圈的两个脚', '控制电路那两根细线就拧在这儿，交流线圈不分正负']},
  {k:'m0', t:'1 - 2', what:'主触头 L1 相', read:'∞（不通电）',
   bar:['1 和 2 是 L1 相的一对主触头', '单数在上接进线，双数在下接出线']},
  {k:'m1', t:'3 - 4', what:'主触头 L2 相', read:'∞（不通电）',
   bar:['3 和 4 是 L2 相的一对主触头', '三相各一对，一共三对']},
  {k:'m2', t:'5 - 6', what:'主触头 L3 相', read:'∞（不通电）',
   bar:['5 和 6 是 L3 相的一对主触头', '这三对是过大电流的，端子比别的大一圈']},
  {k:'aux', t:'13 - 14', what:'辅助动合触点', read:'∞（不通电）',
   bar:['13 和 14 是一对辅助触点', '个位 3、4 ＝ 动合，自锁那根线接的就是它']}
];
const S1 = { k:0 };
const st1 = new Stage('cv0', 360, CANH);

function draw1(){
  const g = st1.g; st1.clear();
  const it = PAIR[S1.k];
  EP.heading(g, 12, 14, '交流接触器', '先认端子，再动表笔');
  contactor(g, {hi:it.k});
  meter(g, '- - - -', null);
  bar(g, it.bar[0], it.bar[1]);
}
function note1(){
  const it = PAIR[S1.k];
  $('s1a').textContent = it.t;
  $('s1b').textContent = it.what;
  $('s1c').textContent = it.read;
  let h = '';
  if(S1.k === 0) h =
    '<div class="st">A1 / A2 —— 线圈的两个脚</div>' +
    '这两个端子直接通到<b>壳子里那卷漆包线</b>。' +
    '控制回路的两根细线接在这儿，线圈得电，衔铁吸合，所有触点跟着动。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>它是唯一一对「正常应该量出一个具体数」的端子</b> ——' +
    '别的端子要么 0Ω 要么 ∞，只有线圈是几百欧到几千欧。' +
    '<span class="sub">交流线圈不分正负，A1 A2 谁接哪根都行；但线圈电压绝对不能接错' +
    '（4.5 屏 2 讲过：220 V 线圈接 380 V，几秒就冒烟）。</span></div>';
  else if(S1.k === 4) h =
    '<div class="st">13 / 14 —— 辅助动合触点</div>' +
    '<b>两位数编号，个位 3、4 就是动合</b>（4.5 屏 2 那条规则）。' +
    '不通电时它是断的，线圈一得电跟着闭合 —— <b>4.4 那节的自锁触点接的就是它</b>。' +
    '<div class="tip info" style="margin-top:8px">' +
    '要是这只接触器还有 <b>21 / 22</b>，那就是一对<b>动断</b>触点（个位 1、2）：' +
    '不通电时是通的，得电才断开。<b>正反转互锁用的就是它。</b>' +
    '<span class="sub">基本款接触器一般自带一两对辅助触点，不够用可以往侧面卡一个辅助触点模块。</span></div>';
  else h =
    '<div class="st">' + it.t + ' —— ' + it.what + '</div>' +
    '三对主触头 <b>1-2、3-4、5-6</b> 分别对应 <b>L1、L2、L3</b> 三相。' +
    '<b>单数（1 3 5）在上排接进线，双数（2 4 6）在下排接出线。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>它们是动合触点</b>：不通电时全是断的，量出来 ∞ 才对。' +
    '端子比别的大一圈，因为要过几十安的电流。' +
    '<span class="sub">量的时候一定要认准是<b>同一对</b>（1 和 2、3 和 4），' +
    '搭在 1 和 3 上永远是 ∞ —— 它们本来就分属两相。</span></div>';
  $('n0').innerHTML = h;
}
document.getElementById('s1k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S1.k = +t.dataset.k;
  document.querySelectorAll('#s1k .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.k === S1.k); });
  note1(); draw1();
});

/* ================================================================
   场景 2：量线圈
   ================================================================ */
const COIL = [
  {read:'1.694', unit:'kΩ', judge:'正常', sym:'吸合正常', kind:'ok'},
  {read:'OL',    unit:'',   judge:'线圈断线', sym:'一点动静都没有', kind:'err'},
  {read:'0.0',   unit:'Ω',  judge:'匝间短路', sym:'通电就发烫冒烟', kind:'err'}
];
const S2 = { k:0 };
const st2 = new Stage('cv1', 360, CANH);

function draw2(){
  const g = st2.g; st2.clear();
  const it = COIL[S2.k];
  EP.heading(g, 12, 14, '量线圈', 'A1 - A2');
  contactor(g, {hi:'coil'});
  meter(g, it.read, ptsOf('coil'));
  bar(g, it.judge === '正常' ? '量出一个具体数 —— 线圈正常' : '这个读数不对 —— ' + it.judge,
      it.judge === '正常' ? '书上那只 380 V 线圈实测 1.694 kΩ；同型号 220 V 的会小不少'
                          : '现场表现：' + it.sym,
      it.kind);
}
function note2(){
  const it = COIL[S2.k];
  $('s2a').textContent = it.read === 'OL' ? 'OL（∞）' : it.read + ' ' + it.unit;
  $('s2b').textContent = it.judge;
  $('s2c').textContent = it.sym;
  let h = '';
  if(S2.k === 0) h =
    '<div class="st good">正常：量出一个具体的阻值</div>' +
    '线圈是<b>一大卷漆包线</b>，量出来就是这卷线的直流电阻。' +
    '书上那只交流接触器（380 V 线圈）<b>实测 1.694 kΩ</b>。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>没有通用的标准值</b> —— 不同容量、不同线圈电压的接触器阻值差得远。' +
    '大致规律：<b>线圈电压越高，匝数越多，阻值越大</b>。' +
    '<span class="sub">拿不准就找一只同型号同电压的量一下比。' +
    '两只应该很接近，差一大截就是有问题。</span></div>';
  else if(S2.k === 1) h =
    '<div class="st bad">∞ —— 线圈断线</div>' +
    '漆包线在里面断了，或者引出线焊点脱开。' +
    '<b>现场表现：按启动按钮一点动静都没有</b>，接触器既不吸合也不响。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>判定之前先排除接触问题</b>：表笔尖是不是真的碰到金属了' +
    '（端子上可能有漆或氧化层）、表笔线本身有没有断' +
    '（两支笔碰一起看是不是 0Ω）。' +
    '<span class="sub">这个习惯能省掉很多冤枉的更换 —— ' +
    '「量到 ∞」有一半的时候是表笔没搭牢。</span></div>';
  else h =
    '<div class="st bad">0Ω —— 匝间短路</div>' +
    '漆包线的绝缘漆破了，<b>相邻几圈铜线搭在一起</b>，等效匝数大减。' +
    '<b>现场表现：一通电就发烫、冒烟，严重的直接把上级熔断器或断路器带跳。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '匝间短路多半是<b>长期过热</b>造成的：环境温度高、线圈电压偏高、' +
    '或者衔铁吸合不到位（长期嗡嗡响，电流一直是启动电流那么大）。' +
    '<span class="sub">所以听到接触器持续嗡嗡响不要当没事 ——' +
    '那是在慢慢烧线圈（2.2 节短路环那一屏讲过为什么会响）。</span></div>';
  $('n1').innerHTML = h;
}
document.getElementById('s2k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S2.k = +t.dataset.k;
  document.querySelectorAll('#s2k .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.k === S2.k); });
  note2(); draw2();
});

/* ================================================================
   场景 3：量触点 + 用手按下去
   ================================================================ */
const CT = [
  {k:'m0',  t:'1 - 2',   name:'主触头',     no:true},
  {k:'aux', t:'13 - 14', name:'辅助动合',   no:true},
  {k:'nc',  t:'21 - 22', name:'辅助动断',   no:false}
];
const S3 = { k:0, press:0 };
const st3 = new Stage('cv2', 360, CANH);

function read3(){
  const it = CT[S3.k];
  const closed = it.no ? !!S3.press : !S3.press;   /* 动合按下才通，动断按下才断 */
  return closed ? '0.0' : 'OL';
}
function draw3(){
  const g = st3.g; st3.clear();
  const it = CT[S3.k];
  EP.heading(g, 12, 14, '量触点', S3.press ? '用手按住上端' : '不通电、不按');
  contactor(g, {hi:it.k, pressed:!!S3.press});
  meter(g, read3(), ptsOf(it.k));
  if(S3.press) hot(g, BX + BW/2, BY + 6, 0, {w:BW - 60, h:26, r:8});
  const closed = read3() === '0.0';
  bar(g, closed ? it.name + '现在是通的（0Ω）' : it.name + '现在是断的（∞）',
      S3.press ? '按住上端那块活动件，衔铁被压下去 —— 和线圈得电时一样'
               : '不通电时的样子。动合触点断、动断触点通',
      closed ? 'ok' : null);
}
function note3(){
  const it = CT[S3.k];
  $('s3a').textContent = it.t;
  $('s3b').textContent = S3.press ? '按住了' : '没按';
  $('s3c').textContent = read3() === 'OL' ? 'OL（∞）' : read3() + ' Ω';
  let h = '';
  if(!S3.press && it.no) h =
    '<div class="st">不按的时候是 ∞ —— 这说明不了好坏</div>' +
    '<b>' + it.name + '是动合触点</b>，不通电时本来就是断的。' +
    '量到 ∞ 完全正常，<b>可它到底能不能接通，这么量是量不出来的。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>切到「用手按住」试试。</b>接触器不通电时衔铁被弹簧顶开，' +
    '用手指按住上端那块活动的塑料件，衔铁就被压下去了 —— ' +
    '所有触点跟着动作，和线圈得电时一模一样。' +
    '<span class="sub">这一招是书上明写的（P84）：不用接 380 V、不用装到柜子里，' +
    '一只手一支表就能把一只接触器验完。</span></div>';
  else if(S3.press && it.no) h =
    '<div class="st good">按住之后变成 0Ω —— 这一对触点是好的</div>' +
    '衔铁被压下去，动静触头压在一起，量出来接近 <b>0Ω</b>' +
    '（实际是零点几欧的接触电阻）。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>按住之后如果读到几欧、十几欧，那就是触点烧蚀了。</b>' +
    '装上去这一相电压会掉一大截，电动机缺相或者带不动负载，' +
    '而且那几欧上会持续发热，越烧越糟。' +
    '<span class="sub"><b>三对主触头 + 辅助触点，一组一组都按一遍量一遍。</b>' +
    '任何一组不对，整只接触器就得换。</span></div>';
  else if(!S3.press) h =
    '<div class="st good">动断触点：不按的时候就是通的</div>' +
    '<b>21-22 个位是 1、2，是动断（常闭）触点</b> —— ' +
    '线圈不得电时它本来就闭合着，量出来 <b>0Ω</b> 才对。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>所以动断触点的判据和动合正好反过来</b>：不按 0Ω、按下 ∞。' +
    '<span class="sub">这就是为什么量之前一定要先看清端子号 ——' +
    '号码告诉你它是动合还是动断，你才知道该期待什么读数。' +
    '不看号的话，量到 0Ω 你会以为是粘连。</span></div>';
  else h =
    '<div class="st good">按下去之后断开 —— 动断触点正常</div>' +
    '衔铁一动，动断触点被顶开，读数从 0Ω 变成 <b>∞</b>。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>正反转控制里的互锁用的就是这对触点</b>：' +
    '正转接触器一吸合，它的动断触点断开，把反转接触器的线圈回路切断 ——' +
    '两个接触器物理上不可能同时吸合。' +
    '<span class="sub">这叫接触器互锁，第 11 章会连着按钮互锁一起讲。</span></div>';
  $('n2').innerHTML = h;
}
function sync3(){ note3(); draw3(); }
document.getElementById('s3p').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S3.press = +t.dataset.p;
  document.querySelectorAll('#s3p .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.p === S3.press); });
  sync3();
});
document.getElementById('s3k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S3.k = +t.dataset.k;
  document.querySelectorAll('#s3k .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.k === S3.k); });
  sync3();
});

/* ================================================================
   场景 4：继电器
   ================================================================
   小型继电器：一个方壳 + 底下八个插脚，外壳上印着内部接线图。 */
const RY = [
  {t:'线圈', read:'0.42', unit:'kΩ', ok:'有一定的阻值', pins:[8,1],
   bar:['线圈 —— 应该量出一个具体阻值', '和接触器一样：0Ω 是匝间短路，∞ 是断线']},
  {t:'常闭触头', read:'0.0', unit:'Ω', ok:'0Ω', pins:[3,4],
   bar:['常闭触头 —— 不通电时应该是通的', '量到 ∞ 就是触点断路（烧蚀、氧化、机构卡住）']},
  {t:'常开触头', read:'OL', unit:'', ok:'∞', pins:[5,6],
   bar:['常开触头 —— 不通电时应该是断的', '量到 0Ω 就是触点粘连，这只继电器不能用了']}
];
const S4 = { k:0 };
const st4 = new Stage('cv3', 360, CANH);

function draw4(){
  const g = st4.g; st4.clear();
  const it = RY[S4.k];
  EP.heading(g, 12, 14, '小型继电器', '同一套路，小一号');
  /* 继电器本体 */
  const RX = 44, RYY = 52, RW = 108, RH = 96;
  box(g, RX, RYY, RW, RH, 6, P.bakelite || C.box, C.boxLine, 1.5);
  box(g, RX + 14, RYY + 14, RW - 28, 40, 3, C.box, C.boxLine, 1.1);
  txt(g, 'DC 24V', RX + RW/2, RYY + 28, {sz:8.5, b:1, c:C.tx3});
  txt(g, '8 脚', RX + RW/2, RYY + 43, {sz:8.5, c:C.tx3});
  /* 八个插脚：上下各四个 */
  const pinPos = {};
  /* 脚号标在引线**侧面**，标在端点上方／下方会被表笔尖那个圆点盖住（截图抓到的） */
  [1,2,3,4].forEach(function(n, i){
    const x = RX + 14 + i*27, y = RYY + RH, on = it.pins.indexOf(n) >= 0;
    new Path([[x, y],[x, y + 16]]).stroke(g, 2, on ? C.acc : C.wire);
    txt(g, String(n), x + 8, y + 8, {sz:8, b:1, c: on ? C.acc : C.tx3, al:'left'});
    pinPos[n] = [x, y + 16];
  });
  [8,7,6,5].forEach(function(n, i){
    const x = RX + 14 + i*27, y = RYY, on = it.pins.indexOf(n) >= 0;
    new Path([[x, y - 16],[x, y]]).stroke(g, 2, on ? C.acc : C.wire);
    txt(g, String(n), x + 8, y - 8, {sz:8, b:1, c: on ? C.acc : C.tx3, al:'left'});
    pinPos[n] = [x, y - 16];
  });

  /* 万用表 + 表笔：一个脚在上排、一个在下排的话线好走；同排的话走同一侧 */
  const a = pinPos[it.pins[0]], b = pinPos[it.pins[1]];
  const jacks = EP.meterUnit(g, MT.x, MT.y, MT.w, MT.h,
    {mode:'Ω', reading:it.read, rsz:15,
     jacks:[{n:'COM'}, {n:'VΩ', red:true}], hot:1});
  /* **横线走哪一条要按两个测点在上排还是下排来定**：
     一条线从下方的孔往上走到 y=14 再横过来，会纵穿整只继电器（截图抓到的）。
     两个点都在上排 → 两条横线都走机身上方；都在下排 → 都走下方；一上一下 → 各走一边 */
  const upA = it.pins[0] >= 5, upB = it.pins[1] >= 5;
  const yT = upA ? 14 : 190, yB = upB ? 28 : 204;
  EP.leads(g, jacks[1], jacks[0], a[0], b[0],
           {yTop:yT, yBot:yB, tipYR:a[1], tipYB:b[1]});
  tip(g, a[0], a[1], true);
  tip(g, b[0], b[1], false);

  bar(g, it.bar[0], it.bar[1], it.read === '0.0' || it.k === 0 ? 'ok' : null);
}
function note4(){
  const it = RY[S4.k];
  $('s4a').textContent = it.t;
  $('s4b').textContent = it.ok;
  $('s4c').textContent = S4.k === 0 ? '0 或 ∞' : (S4.k === 1 ? '∞（断路）' : '0Ω（粘连）');
  let h = '';
  if(S4.k === 0) h =
    '<div class="st">继电器的线圈 —— 和接触器一模一样的判据</div>' +
    '量出一个<b>具体阻值</b>才正常。小型继电器的线圈阻值一般比接触器小，' +
    '几百欧到一两千欧都有，<b>取决于线圈电压</b>（DC 24 V 的比 AC 220 V 的小得多）。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>哪两个脚是线圈，看外壳上印的内部接线图。</b>' +
    '常见的 8 脚小型继电器一般是 <b>13-14 脚</b>（或者按厂家编号的 1-8 脚）。' +
    '<span class="sub">拔下来量最方便：不会被外部电路串进来的其他支路影响' +
    '（3.6b 讲的「在路测电阻只会偏小」）。</span></div>';
  else if(S4.k === 1) h =
    '<div class="st good">常闭触头：不通电时 0Ω</div>' +
    '书上原话：<b>常闭触头间的电阻值为 0Ω</b>。' +
    '它在线圈不得电时就是接通的，所以量出来接近零。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>量到 ∞ 就是触点断路</b> —— 触点烧蚀、氧化，或者内部机构卡住了。' +
    '<span class="sub">小型继电器的触点很小，切换感性负载（比如另一个接触器的线圈）' +
    '时会拉弧，用久了烧蚀是常事。所以它多半做成<b>插拔式</b>，坏了直接换一只。</span></div>';
  else h =
    '<div class="st good">常开触头：不通电时 ∞</div>' +
    '书上原话：<b>常开触头间的电阻值为无穷大</b>。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>量到 0Ω 就是触点粘连</b>，这只继电器不能用了 ——' +
    '它会让被它控制的那一路一直接通，关都关不掉。' +
    '<span class="sub">和接触器一样，想验它「能不能接通」，得<b>给线圈通上额定电压</b>' +
    '（小型继电器多是 DC 24 V，安全），听「啪」一声再量一次触点。' +
    '继电器体积小，没有接触器那种能用手按的活动件。</span></div>';
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

ElecNav.init({ch:5, sec:'5.3'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('5.3');
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
