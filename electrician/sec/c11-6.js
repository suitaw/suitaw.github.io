/* 11.6 电动机正/反转控制 —— 本节内容的唯一真相。
   对应《零基础学电工》第 11 章 11.6 节（书内 P210~P211）。

   四屏：① 单相靠什么转 ② 单相怎么反转 ③ 三相：换两相 ④ 双重互锁

   **这一节一半照书、一半是补的，口径写在这里，文案里也说了**：
   - **书上 11.6 讲的是「单相」交流电动机的正反转**（图 11-15 / 11-16），
     靠改辅助线圈和主线圈的连接方式换向。屏 1、屏 2 照书讲。
   - **三相电动机的正反转（换两相 ＋ 互锁），书上第 11 章没有单独讲**。
     但那是维修电工最常修的一种控制柜，10.3 屏 2 和 11.5 屏 2 都埋了线索，
     所以屏 3、屏 4 补上，并在文案里注明是补的。
   - **11.2「起停控制」判为不做时说过，它唯一的新东西「单相起动电容」并到这一节** ——
     就是屏 1。

   书上的原文（别凭记忆改）：
   - 11.6.1 开头：「电动机正/反转控制电路是指对电动机的转动方向进行控制。
     典型**单相**交流电动机正/反转控制电路的结构组成如图 11-15 所示。该电路
     **通过改变单相交流电动机辅助线圈和主线圈的连接方式**来改变电动机的转动方向。」
   - 图 11-15 的器件（照录）：AC220V（L、N）、**QS 电源总开关**、**FR 过热保护继电器**、
     **FU1／FU2 熔断器**、**SB1 起动按钮**、**SB2 停止按钮**、**SA 旋转开关**、
     **KM1／KM2 单相交流接触器**（KM1-1 主触头、KM1-2 常开辅助触头；
     KM2-1 常闭触头、KM2-2 常开触头）、**单相交流电动机 ＋ 起动电容器 C**
   - **图 11-15 里关于旋转开关的那段注（照录）**：「旋转开关是一种旋转式闸开关，
     可用来接通或切断电路，切换电源或照明。当旋转开关触头闭合时，处于**锁定状态**；
     当旋转开关触头断开时，处于**解除锁定状态**。通常，旋转开关多为解除锁定状态。」
   - **图 11-16 的工作过程（照录 7 步）**：
     ① 合上电源总开关 QS，接通单相电源
     ② 按下起动按钮 SB1，接通控制线路
     ②→③ 交流接触器 KM1 线圈得电
        ③-1 常开辅助触头 KM1-2 闭合，实现自锁功能
        ③-2 常开主触头 KM1-1 闭合，电动机主线圈接通电源相序 L、N，
             **电流经起动电容器 C 和辅助线圈形成回路**，电动机正向起动运转
     ④ 按下开关 SA，内部常开触头闭合
     ④→⑤ 交流接触器 KM2 得电
        ⑤-1 常闭触头 KM2-1 断开
        ⑤-2 常开触头 KM2-2 闭合，电动机主线圈接通电源相序 L、N，
             **电流经辅助线圈和起动电容器 C 形成回路**，电动机开始反向运转
     ⑥ 需停机时按下停止按钮 SB2
     ⑥→⑦ KM1 线圈失电：KM1-2 复位断开解除自锁；KM1-1 复位断开切断供电，停转

   **书上写得含糊的一处，文案里当场挑明了**：③-2 写「电流经**起动电容器 C 和辅助线圈**
   形成回路」，⑤-2 写「电流经**辅助线圈和起动电容器 C**形成回路」——
   这两句话字面上只差了词序，光读文字看不出正反转的区别。
   **真正的差别在图上的接线方向**：KM1-1 和 KM2-2 把「电容＋辅助绕组」这一串
   **接成了首尾相反的两个方向**，于是辅助绕组里的电流方向反了，
   它和主绕组的相位关系跟着反过来，旋转磁场就掉头了。屏 2 画的就是这件事。

   **书上没给、我补的（文案里全部标了口径）**：
   - 电容让辅助绕组的电流**超前主绕组约 90°**，两个绕组在空间上也差 90°，
     合成出旋转磁场。**没有电容，只剩一个脉动磁场，电动机自己起不来**
     （用手拨一下往哪边它就往哪边转）—— 屏 1 的第三档演的就是这个
   - 三相正反转的**双重互锁**（接触器互锁 ＋ 按钮互锁）是我补的，
     现场标准做法。**接触器互锁保命，按钮互锁只是图方便** —— 屏 4 的落点 */
(function(){
'use strict';
ELEC.reg({
  id: '11.6',
  file: 'c11-6.html',
  title: '11.6 正反转控制',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>单相靠什么转</button>
    <button class="tab" data-i="1"><span class="n">2</span>单相怎么反转</button>
    <button class="tab" data-i="2"><span class="n">3</span>三相：换两相</button>
    <button class="tab" data-i="3"><span class="n">4</span>双重互锁</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">单相电动机为什么非要一个电容</div>
    单相电源只有一路电，光靠一个绕组只能产生<b>来回脉动</b>的磁场 ——
    它不会转，电动机也就自己起不来。所以单相电动机里有<b>两个</b>绕组：
    主绕组直接接电，<b>辅助绕组串一个电容再接电</b>。
    电容让辅助绕组里的电流<b>超前</b>一步，两个绕组一前一后，磁场就转起来了。
    <b>点第三个按钮把电容拿掉看看。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">正转</button>
        <button class="btn sm" data-k="1">反转</button>
        <button class="btn sm" data-k="2">拿掉电容</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">辅助绕组</div><div class="v" id="s1a">超前 90°</div></div>
        <div class="num hi"><div class="k">磁场</div><div class="v" id="s1b">顺时针转</div></div>
        <div class="num"><div class="k">能自己起动</div><div class="v" id="s1c">能</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">两个绕组，两处「差 90°」</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>差在哪</th><th>怎么做到的</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">空间上<br>差 90°</td>
          <td>两个绕组在定子里<b>互相垂直</b>地嵌进去 —— 这是出厂时绕好的，改不了</td></tr>
        <tr><td class="eu-s">时间上<br>差 90°</td>
          <td><b>靠电容</b>。电容里电流超前电压 90°（2.5 节讲过电容的这个脾气），
            所以辅助绕组的电流比主绕组早到一步</td></tr>
      </tbody>
    </table></div>
    <div class="tip">两处都差 90°，合成出来的就是一个匀速旋转的磁场 ——
      和三相电动机靠三相电流<b>天生</b>差 120° 得到旋转磁场是同一个道理，
      只是单相要靠电容<b>人工制造</b>出这个相位差。
      <b>所以电容坏了，单相电动机的典型现象是：通电嗡嗡响、不转，用手一拨就转起来</b>，
      而且往哪边拨就往哪边转。</div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">现场怎么判电容坏没坏</div>
    <div class="tip"><b>先断电、再给电容放电</b>（两端短接一下），然后拿万用表电阻档量 ——
      <b>3.6b 讲过</b>：好电容会看到读数从小往大爬（充电），最后到 OL；
      <b>一直是 0 就是击穿，一直 OL 就是开路</b>。
      有电容档的表直接量容量，和外壳上印的标称值比（一般允许 ±10% 上下）。
      <b>鼓包、漏液、外壳发烫的一律直接换，不用量。</b></div>
  </div>
</section>

<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">把辅助绕组那一串，接个头</div>
    书上原话是「<b>通过改变单相交流电动机辅助线圈和主线圈的连接方式</b>来改变转动方向」。
    具体怎么改？<b>主绕组一直照原样接着不动，把「电容 ＋ 辅助绕组」这一串的两头对调。</b>
    KM1 按一个方向接，KM2 按相反的方向接。<b>点两个按钮看那两对触点。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">KM1 正转</button>
        <button class="btn sm" data-k="1">KM2 反转</button>
        <button class="btn sm" data-k="2">都断开</button>
      </div>
      <div class="nums three">
        <div class="num hi"><div class="k">吸合的是</div><div class="v" id="s2a">KM1</div></div>
        <div class="num"><div class="k">辅助那一串</div><div class="v" id="s2b">左接 L</div></div>
        <div class="num"><div class="k">转向</div><div class="v" id="s2c">正转</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">书上这一处写得含糊，说清楚</div>
    <div class="tip info">书上第 ③-2 步写「电流经<b>起动电容器 C 和辅助线圈</b>形成回路」，
      第 ⑤-2 步写「电流经<b>辅助线圈和起动电容器 C</b>形成回路」——
      <b>这两句话字面上只差了词序</b>，光读文字根本看不出正反转的区别在哪。
      <b>区别在图上：</b>KM1-1 和 KM2-2 把「电容 ＋ 辅助绕组」这一串
      <b>接成了首尾相反的两个方向</b>。辅助绕组里的电流方向反了，
      它跟主绕组的相位关系就从「超前」变成了「滞后」，旋转磁场跟着掉头。
      <b>这是我从图上读出来的，书上没用文字写死。</b></div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">书上那个「旋转开关 SA」（原文照录）</div>
    <div class="tip">「旋转开关是一种旋转式闸开关，可用来接通或切断电路，切换电源或照明。
      当旋转开关触头闭合时，处于<b>锁定状态</b>；当旋转开关触头断开时，
      处于<b>解除锁定状态</b>。通常，旋转开关多为解除锁定状态。」
      <b>这一段说的是它「拧到位会卡住、不像按钮会自己弹回来」</b> ——
      所以在这个电路里它当反转的「档位开关」用，拧过去就一直保持着。
      <b>4.3 节讲过转换开关的符号</b>，和这个是一类东西。</div>
  </div>
</section>

<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">三相的正反转，简单得多</div>
    <b class="rd">下面这两屏书上第 11 章没有</b>，是我补的 ——
    但三相正反转柜是维修电工最常修的东西之一，不能不讲。
    原理 <b>11.5 屏 2 已经讲透了：调换任意两根相线，旋转磁场就反过来转。</b>
    所以三相正反转只要<b>两只接触器</b>：一只照原样接，另一只接线时就把两相调过来。
    <b>点三个按钮，特别是第三个。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">KM1 正转</button>
        <button class="btn sm" data-k="1">KM2 反转</button>
        <button class="btn sm" data-k="2">同时吸合</button>
      </div>
      <div class="nums three">
        <div class="num hi"><div class="k">吸合的是</div><div class="v" id="s3a">KM1</div></div>
        <div class="num"><div class="k">进线相序</div><div class="v" id="s3b">L1L2L3</div></div>
        <div class="num"><div class="k">结果</div><div class="v" id="s3c">正转</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">接线上要注意的一条</div>
    <div class="tip"><b>两只接触器的下桩头（出线端）是并在一起接到电动机的</b>，
      上桩头（进线端）一只按 L1-L2-L3 接、另一只按 L3-L2-L1 接。
      <b>现场装柜时，这三根「交叉线」是最容易接错的地方</b> ——
      接成了完全一样的相序，表现是「按正转能转、按反转也是同一个方向」；
      接成了三根全换，表现是「反转按钮没反应或者方向还是不对」。
      <b>装完先不接电动机，用万用表通断档一对一对量过去</b>（3.6b 那一套），
      比通电试快得多也安全得多。</div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">同时吸合 = 相间短路（和 11.4、11.5 同一条）</div>
    <div class="tip">KM1 把 L1 送到电动机的 U 端，KM2 把 L3 送到同一个 U 端 ——
      两只都吸合，<b>L1 和 L3 就在这个接线点上直接短接了</b>。
      这已经是本章第三次遇到同一件事：<b>11.4 星三角、11.5 反接制动、11.6 正反转，
      三处的两只接触器都绝对不能同时吸合，防的办法也完全一样。</b>
      下一屏专门讲这个「办法」。</div>
  </div>
</section>

<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">两道互锁，各管一件事</div>
    <b>接触器互锁</b>：把对方的动断辅助触点串进自己的线圈支路（11.4、11.5 都用过）。
    <b>按钮互锁</b>：起动按钮用带两对触点的复合按钮，按下正转的同时，
    它那对动断触点把反转支路断掉。
    <b>点按钮操作看看 —— 特别试试从正转直接按反转。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn sm" data-k="f">正转 SB1</button>
        <button class="btn sm" data-k="r">反转 SB2</button>
        <button class="btn sm" data-k="s">停止 SB3</button>
      </div>
      <div class="nums three">
        <div class="num hi"><div class="k">现在</div><div class="v" id="s4a">停着</div></div>
        <div class="num"><div class="k">吸合的是</div><div class="v" id="s4b">都没有</div></div>
        <div class="num"><div class="k">对方那条路</div><div class="v" id="s4c">通着</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st good">两道互锁，分工完全不同</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>这一道怎么做</th><th>管什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s"><b>接触器互锁</b><br>KM2-3（动断）串在 KM1 支路<br>KM1-3（动断）串在 KM2 支路</td>
          <td><b>保命的那一道。</b>只要一只还吸着，另一只的线圈就得不到电 ——
            <b>不管你按了什么</b></td></tr>
        <tr><td class="eu-s"><b>按钮互锁</b><br>复合按钮，SB1 的动断串 KM2 支路<br>SB2 的动断串 KM1 支路</td>
          <td><b>图方便的那一道。</b>让你能从正转<b>直接</b>按到反转，
            不用先按停止再换向</td></tr>
      </tbody>
    </table></div>
    <div class="tip"><b>只有按钮互锁、没有接触器互锁的电路是危险的</b>：
      按钮只管「按下去的那一瞬间」，可要是 <b>KM1 的主触头粘连了</b>
      （吸合时的电弧把银触点烧熔粘住，是接触器最常见的坏法），
      它的线圈虽然断了电、机械上却没释放 —— 这时候按反转，KM2 照样吸上，当场短路。
      <b>接触器互锁靠的是「机械上真的释放了，那对动断触点才闭合」，
      所以粘连时它也拦得住。</b></div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">还有第三道：机械互锁</div>
    <div class="tip info">好一点的接触器可以加装<b>机械联锁附件</b>，
      把两只扣在一起，<b>一只吸下去，另一只在物理上就压不下去了</b>。
      <b>11.4 提过一次，正反转柜同样是标配。</b>
      检修换接触器时别把它拆了不装回去 —— 那是最后一道防线。</div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">这一章的两只接触器，三次都是同一件事</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>哪一节 · 哪两只</th><th>同时吸合会</th></tr></thead>
      <tbody>
        <tr><td class="eu-s"><b>11.4 星三角</b><br>KMY / KM△</td><td>三个尾端被短接到相线上 → 相间短路</td></tr>
        <tr><td class="eu-s"><b>11.5</b><br><b>反接制动</b><br>KM1 / KM2</td><td>被对调的那两相直接短接 → 相间短路</td></tr>
        <tr><td class="eu-s"><b>11.6 正反转</b><br>KM1 / KM2</td><td>L1 和 L3 在接线点上短接 → 相间短路</td></tr>
      </tbody>
    </table></div>
    <div class="tip"><b>记一条就够了：两只接触器接同一台电动机、相序不同，就必须互锁。</b>
      做法永远是那一句 —— <b>把对方的动断辅助触点串进自己的线圈支路里。</b></div>
  </div>

  <div class="quiz" data-quiz="11.6">
    <div class="qz" data-q="单相电动机里的电容是干什么用的？"
      data-opts="省电|让辅助绕组的电流超前主绕组，造出旋转磁场|降低电压保护绕组" data-right="1"
      data-why="单相电源只有一路电，一个绕组只能产生脉动磁场，不会转。电容让辅助绕组里的电流超前主绕组约 90°，加上两个绕组在空间上本来就差 90°，合成出旋转磁场，电动机才能自己起动。电容坏了的典型现象：通电嗡嗡响不转，用手一拨就转，而且往哪边拨往哪边转。"></div>
    <div class="qz" data-q="三相电动机怎么反转？"
      data-opts="把三根相线全部对调|调换任意两根相线|把电压降一半" data-right="1"
      data-why="调换任意两根。L1L2、L2L3、L1L3 换哪一对都行，效果一样。但三根一起轮换（L1→L2→L3→L1）是不变的 —— 那只是换了个起点，相序没变。这条 10.3 测相序、11.5 反接制动、11.6 正反转都用得上。"></div>
    <div class="qz" data-q="只做按钮互锁、不做接触器互锁，危险在哪？"
      data-opts="操作不方便|接触器主触头粘连时，另一只照样能吸上，当场短路|电动机会转得慢" data-right="1"
      data-why="按钮只管按下去的那一瞬间。接触器最常见的坏法是主触头被电弧烧熔粘连 —— 线圈断电了，机械上却没释放。这时候按反转，按钮互锁已经复位、拦不住，KM2 照样吸上，两个相序当场短接。接触器互锁靠的是「机械上真释放了，那对动断触点才闭合」，粘连时它也拦得住。"></div>
    <div class="qz" data-q="按钮互锁存在的意义是什么？"
      data-opts="防短路|让人能从正转直接按到反转，不用先按停止|代替热继电器" data-right="1"
      data-why="纯粹是为了操作方便。只有接触器互锁的电路，正转时 KM1 吸着、KM2-2…KM1 的动断触点把反转支路断着，你按反转按钮没有任何反应，必须先按停止让 KM1 释放。加了按钮互锁，按下反转按钮的同时它的动断触点先把 KM1 断掉，KM1 释放后 KM2 就能吸上了。防短路是接触器互锁的活。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 11 章 11.6 节（书内 P210~P211）　屏 3、屏 4 是补的</div>
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
function btn(g, x, y, nc, pressed, s){
  if(nc) ncC(g, x, y, pressed, s); else noC(g, x, y, pressed, s);
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
/* 绕组：一段带三个半圆的线，能斜着画 */
function wind(g, x0, y0, x1, y1, col){
  const dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy), a = Math.atan2(dy, dx);
  g.save(); g.translate(x0, y0); g.rotate(a);
  g.strokeStyle = col || P.ink; g.lineWidth = 1.8; g.lineCap = 'round';
  const pad = (len - 36) / 2;
  g.beginPath(); g.moveTo(0, 0); g.lineTo(pad, 0); g.stroke();
  for(let i = 0; i < 3; i++){
    g.beginPath(); g.arc(pad + 6 + i * 12, 0, 6, Math.PI, 0, false); g.stroke();
  }
  g.beginPath(); g.moveTo(pad + 36, 0); g.lineTo(len, 0); g.stroke();
  g.restore();
}
/* 电容：两条平行短线（横着画时是两条竖线） */
function cap(g, x, y, vert){
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 2; g.lineCap = 'round';
  if(vert){
    g.beginPath(); g.moveTo(x - 9, y - 3); g.lineTo(x + 9, y - 3); g.stroke();
    g.beginPath(); g.moveTo(x - 9, y + 3); g.lineTo(x + 9, y + 3); g.stroke();
  } else {
    g.beginPath(); g.moveTo(x - 3, y - 9); g.lineTo(x - 3, y + 9); g.stroke();
    g.beginPath(); g.moveTo(x + 3, y - 9); g.lineTo(x + 3, y + 9); g.stroke();
  }
  g.restore();
}

/* ================================================================
   场景 1：单相电动机靠什么转（书上 11.2 的起动电容并到这儿）
   ================================================================ */
const st1 = new Stage('cv0', 360, 250);
const S1 = { k:0, t:0 };
function draw1(dt){
  const g = st1.g; st1.clear();
  if(dt) S1.t += dt;
  const k = S1.k, noCap = k === 2;
  EP.heading(g, 14, 16,
    noCap ? '把电容拿掉' : (k === 1 ? '反转接法' : '正转接法'), '单相电动机');

  /* 左边：两个绕组的接法 */
  const LX = 32, NX = 112;
  seg(g, [[LX, 56],[LX, 190]], C.wire, 2);
  seg(g, [[NX, 56],[NX, 190]], C.wire, 2);
  txt(g, 'L', LX, 46, {sz:9, b:1, c:C.tx3});
  txt(g, 'N', NX, 46, {sz:9, b:1, c:C.tx3});
  wind(g, LX, 92, NX, 92);
  dot(g, LX, 92, C.wire, 2.6); dot(g, NX, 92, C.wire, 2.6);
  txt(g, '主绕组', 72, 78, {sz:8.5, c:C.tx2});
  /* 辅助支路：电容 ＋ 辅助绕组 */
  seg(g, [[LX, 152],[46, 152]], noCap ? C.tx3 : C.wire, 2);
  if(noCap){
    g.save(); g.strokeStyle = C.err; g.lineWidth = 2.2; g.lineCap = 'round';
    g.beginPath(); g.moveTo(50, 146); g.lineTo(62, 158);
    g.moveTo(62, 146); g.lineTo(50, 158); g.stroke(); g.restore();
  } else cap(g, 56, 152, false);
  seg(g, [[66, 152],[72, 152]], noCap ? C.tx3 : C.wire, 2);
  wind(g, 72, 152, NX, 152, noCap ? C.tx3 : null);
  dot(g, LX, 152, C.wire, 2.6); dot(g, NX, 152, C.wire, 2.6);
  txt(g, noCap ? '电容没了' : 'C', 56, 136, {sz:8.5, b:1, c: noCap ? C.err : C.tx2});
  txt(g, '辅助绕组', 92, 172, {sz:8.5, c:C.tx2});

  /* 右边：定子里的合成磁场 */
  const CXx = 250, CYy = 118, R = 54;
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.8;
  g.beginPath(); g.arc(CXx, CYy, R, 0, Math.PI*2); g.stroke();
  g.restore();
  /* 四个极：左右是主绕组，上下是辅助绕组 */
  [[0, C.tx2],[Math.PI, C.tx2],[-Math.PI/2, C.warn],[Math.PI/2, C.warn]].forEach(function(a){
    const x = CXx + Math.cos(a[0]) * (R - 7), y = CYy + Math.sin(a[0]) * (R - 7);
    g.save(); g.translate(x, y); g.rotate(a[0]);
    g.fillStyle = a[1]; g.globalAlpha = .55;
    g.fillRect(-4, -11, 8, 22); g.restore();
  });
  txt(g, '主', CXx - R - 8, CYy, {sz:8.5, b:1, c:C.tx2, al:'right'});
  txt(g, '辅', CXx, CYy - R - 10, {sz:8.5, b:1, c:C.warn});
  /* 合成磁场 */
  const w = S1.t * 2.0;
  let ang, len;
  if(noCap){ const c0 = Math.cos(w); ang = c0 >= 0 ? 0 : Math.PI; len = (R - 18) * Math.abs(c0); }
  else { ang = k === 1 ? -w : w; len = R - 18; }
  if(len > 6){
    const ax = CXx + Math.cos(ang) * len, ay = CYy + Math.sin(ang) * len;
    seg(g, [[CXx, CYy],[ax, ay]], C.ok, 3.2);
    EC.head(g, ax, ay, CXx, CYy, 9, C.ok);
  }
  dot(g, CXx, CYy, C.tx2, 3);
  txt(g, noCap ? '只在左右方向来回胀缩' : '合成磁场在转', CXx, CYy + R + 16,
    {sz:8.5, b:1, c: noCap ? C.err : C.ok});

  if(noCap) conc(g, 200, 'err', '没有电容：磁场只在一条线上来回，不会转',
    '通电只会嗡嗡响 —— 用手拨一下，往哪边拨就往哪边转');
  else conc(g, 200, k === 1 ? 'acc' : 'ok',
    k === 1 ? '反转：辅助绕组的电流变成滞后，磁场跟着掉头' : '正转：辅助绕组的电流超前，磁场顺时针转',
    '两个绕组空间差 90°、电流时间差 90°，合起来就是旋转磁场');

  const a = noCap ? '没接' : (k === 1 ? '滞后 90°' : '超前 90°');
  const b = noCap ? '来回脉动' : (k === 1 ? '逆时针转' : '顺时针转');
  const c = noCap ? '不能' : '能';
  if(S1.la !== a){ S1.la = a; $('s1a').textContent = a; }
  if(S1.lb !== b){ S1.lb = b; $('s1b').textContent = b; }
  if(S1.lc !== c){ S1.lc = c; $('s1c').textContent = c; }
}
function note1(){
  const k = S1.k;
  let h;
  if(k === 2) h = '<b class="rd">电容一拿掉，就只剩主绕组这一条回路了。</b>'
    + '一路电流只能产生一个<b>在固定方向上来回胀缩</b>的磁场（看那根绿箭头，'
    + '它只在左右方向变长变短、还会调头，但不会转）。'
    + '这种磁场对静止的转子<b>不产生起动转矩</b> —— 通上电只会嗡嗡响。'
    + '<b>但只要用手拨一下，它就能顺着那个方向转起来</b>，这正是判断电容坏掉的现场手法。';
  else if(k === 1) h = '<b>反转接法</b>：辅助绕组那一串被接了个头，'
    + '它里面的电流方向反了，跟主绕组的相位关系从「超前」变成了「滞后」，'
    + '<b>合成磁场就朝相反方向转</b>。<b>主绕组一个字都没动。</b> 下一屏画的就是怎么接。';
  else h = '<b>正转接法</b>：主绕组直接接在 L 和 N 上；'
    + '辅助绕组<b>串了一个电容</b>再接上去。电容里电流超前电压 90°（2.5 节讲过电容的脾气），'
    + '所以辅助绕组的电流比主绕组早到一步。'
    + '<b>两个绕组在定子里本来就互相垂直（空间差 90°），电流又差 90°</b> —— '
    + '合成出来的就是一个匀速旋转的磁场，转子被它拖着转。';
  $('n0').innerHTML = h;
}

/* ================================================================
   场景 2：单相怎么反转（书上图 11-15 / 11-16）
   ================================================================
   四对触点搭成一个换向桥：KM1 让 A 接 L、B 接 N；KM2 反过来 A 接 N、B 接 L。
   「把辅助绕组那一串接个头」在图上就是这么回事。 */
const st2 = new Stage('cv1', 360, 292);
const S2 = { k:0 };
const AX = 120, BX = 220, LY = 112, NY = 232, MY = 170;
function draw2(){
  const g = st2.g; st2.clear();
  const k = S2.k, km1 = k === 0, km2 = k === 1;
  EP.heading(g, 14, 16,
    km1 ? 'KM1 吸合 → 正转' : (km2 ? 'KM2 吸合 → 反转' : '都断开'), '图 11-15');

  seg(g, [[40, 56],[40, LY]], C.wire, 2);
  seg(g, [[300, 56],[300, NY]], C.wire, 2);
  txt(g, 'L', 40, 46, {sz:9, b:1, c:C.tx3});
  txt(g, 'N', 300, 46, {sz:9, b:1, c:C.tx3});
  /* 主绕组：一直接在 L 和 N 上，什么都不动 */
  wind(g, 40, 70, 300, 70);
  dot(g, 40, 70, C.wire, 2.6); dot(g, 300, 70, C.wire, 2.6);
  txt(g, '主绕组（接法一直不变）', 170, 58, {sz:8.5, c:C.tx2});
  /* 两条横母线 */
  seg(g, [[40, LY],[BX, LY]], C.wire, 2);
  seg(g, [[AX, NY],[300, NY]], C.wire, 2);
  txt(g, '这条来自 L', 46, LY - 9, {sz:8, c:C.tx3, al:'left'});
  txt(g, '这条回 N', 294, NY + 10, {sz:8, c:C.tx3, al:'right'});
  /* 辅助支路：电容 ＋ 辅助绕组，两端是 A 和 B */
  seg(g, [[AX, MY],[140, MY]], C.wire, 2);
  cap(g, 150, MY, false);
  seg(g, [[160, MY],[170, MY]], C.wire, 2);
  wind(g, 170, MY, BX, MY);
  txt(g, 'C', 150, MY - 16, {sz:8.5, b:1, c:C.tx2});
  txt(g, '辅助绕组', 195, MY + 18, {sz:8.5, c:C.tx2});
  txt(g, 'A', AX - 10, MY - 4, {sz:9, b:1, c:C.acc, al:'right'});
  txt(g, 'B', BX + 10, MY - 4, {sz:9, b:1, c:C.acc, al:'left'});
  /* 四对触点 */
  seg(g, [[AX, LY],[AX, 128]], C.wire, 1.8);
  noC(g, AX, 140, km1, 0.85);
  seg(g, [[AX, 152],[AX, MY]], C.wire, 1.8);
  txt(g, 'KM1-1', AX - 12, 140, {sz:8.5, b:1, c: km1 ? C.acc : C.tx3, al:'right'});
  seg(g, [[BX, LY],[BX, 128]], C.wire, 1.8);
  noC(g, BX, 140, km2, 0.85);
  seg(g, [[BX, 152],[BX, MY]], C.wire, 1.8);
  txt(g, 'KM2-2', BX + 12, 140, {sz:8.5, b:1, c: km2 ? C.acc : C.tx3, al:'left'});
  seg(g, [[AX, MY],[AX, 190]], C.wire, 1.8);
  noC(g, AX, 202, km2, 0.85);
  seg(g, [[AX, 214],[AX, NY]], C.wire, 1.8);
  txt(g, 'KM2-2', AX - 12, 202, {sz:8.5, b:1, c: km2 ? C.acc : C.tx3, al:'right'});
  seg(g, [[BX, MY],[BX, 190]], C.wire, 1.8);
  noC(g, BX, 202, km1, 0.85);
  seg(g, [[BX, 214],[BX, NY]], C.wire, 1.8);
  txt(g, 'KM1-1', BX + 12, 202, {sz:8.5, b:1, c: km1 ? C.acc : C.tx3, al:'left'});
  dot(g, AX, LY, C.wire, 2.4); dot(g, BX, LY, C.wire, 2.4);
  dot(g, AX, NY, C.wire, 2.4); dot(g, BX, NY, C.wire, 2.4);
  dot(g, AX, MY, C.wire, 2.6); dot(g, BX, MY, C.wire, 2.6);

  if(km1) conc(g, 248, 'ok', 'KM1：A 接 L、B 接 N —— 电流从 A 流向 B',
    '辅助绕组的电流超前主绕组，正转');
  else if(km2) conc(g, 248, 'acc', 'KM2：A 接 N、B 接 L —— 电流从 B 流向 A',
    '同一串东西接了个头，电流方向反了，反转');
  else conc(g, 248, 'warn', '两只都断：辅助支路悬空，只剩主绕组',
    '这时候通电只有脉动磁场，起不来 —— 屏 1 演过');

  $('s2a').textContent = km1 ? 'KM1' : (km2 ? 'KM2' : '都没有');
  $('s2b').textContent = km1 ? '左接 L' : (km2 ? '左接 N' : '悬空');
  $('s2c').textContent = km1 ? '正转' : (km2 ? '反转' : '不转');
}
function note2(){
  const k = S2.k;
  let h;
  if(k === 0) h = '<b>KM1 吸合</b>：左上和右下那两对触点闭合 —— '
    + '<b>A 端接到 L，B 端接到 N</b>。电流从 A 进、经电容和辅助绕组、从 B 出。'
    + '<b>主绕组那一条从头到尾没动过</b>，它一直直接挂在 L 和 N 上。';
  else if(k === 1) h = '<b>KM2 吸合</b>：换成右上和左下那两对 —— '
    + '<b>A 端接到 N，B 端接到 L</b>，正好跟刚才反过来。'
    + '同样一串「电容 ＋ 辅助绕组」，<b>被接了个头</b>，里面的电流方向就反了。'
    + '这就是书上那句「改变辅助线圈和主线圈的连接方式」的实际做法。'
    + '<b>看这四对触点搭出来的形状 —— 它是个换向桥</b>，'
    + '电动机、电磁阀、直流电机换向，用的都是这一套。';
  else h = '两只接触器都释放，<b>辅助支路两头都断开、悬空了</b>，'
    + '只剩主绕组还挂在电源上。这时候通电只有脉动磁场（屏 1 第三档演过），'
    + '<b>电动机不会自己起动</b>。'
    + '注意主绕组这条<b>仍然是带电的</b> —— 和 11.4 那个两接触器星三角是同一件事，'
    + '<b>停机不等于停电，检修前一律断 QS、验电</b>。';
  $('n1').innerHTML = h;
}

/* ================================================================
   场景 3：三相正反转 —— 换两相（书上第 11 章没写，补的）
   ================================================================
   KM1 直通：L1→U、L2→V、L3→W；KM2 交叉：L1→W、L2→V、L3→U。
   两只同时吸合，L1 和 L3 就在 U（和 W）那个接线点上直接短接。 */
const st3 = new Stage('cv2', 360, 306);
const S3 = { k:0 };
const BY3 = [52, 66, 80];        /* L1 L2 L3 三条母线 */
const CL3 = [70, 92, 114];       /* 三根竖线 = 电动机的 U / V / W */
const K2X = [180, 202, 224];     /* KM2 的三个下引点 */
const RY3 = [164, 178, 192];     /* KM2 的三条横跨线 */
const K2T = [2, 1, 0];           /* KM2 第 i 相接到第 K2T[i] 根竖线 */
const CY3 = 106, MY3 = 214;
function w3(g, pts, kind, lw){
  seg(g, pts, kind === 2 ? C.err : (kind === 1 ? C.acc : C.wire), lw || 1.8);
}
function draw3(){
  const g = st3.g; st3.clear();
  const k = S3.k, km1 = k === 0 || k === 2, km2 = k === 1 || k === 2, bad = k === 2;
  /* 每根竖线的通电状态：短路的那两根画红 */
  const col = [0,1,2].map(function(i){ return bad ? (i === 1 ? 1 : 2) : ((km1 || km2) ? 1 : 0); });
  EP.heading(g, 14, 16,
    bad ? '两只同时吸合' : (k === 1 ? 'KM2 吸合' : 'KM1 吸合'), '三相主电路');

  /* ---- 三条母线 ---- */
  BY3.forEach(function(y, i){
    seg(g, [[24, y],[238, y]], C.wire, 2);
    txt(g, 'L' + (i+1), 20, y, {sz:8.5, b:1, c:C.tx3, al:'right'});
  });

  /* ---- KM1：直通 ---- */
  CL3.forEach(function(x, i){
    w3(g, [[x, BY3[i]],[x, CY3 - 12]], 1);
    dot(g, x, BY3[i], C.wire, 2.6);
    noC(g, x, CY3, km1, 0.85);
    w3(g, [[x, CY3 + 12],[x, MY3]], km1 ? col[i] : 0);
    txt(g, ['U','V','W'][i], x - 4, 134, {sz:9, b:1, c: bad && i !== 1 ? C.err : C.tx2, al:'right'});
  });
  EP.chip(g, 'KM1 直通', 58, CY3, {sz:8.5, b:1, c: km1 ? C.acc : C.tx3, al:'right'});

  /* ---- KM2：交叉 ---- */
  K2X.forEach(function(x, i){
    const t = K2T[i], y = RY3[i], tx = CL3[t];
    w3(g, [[x, BY3[i]],[x, CY3 - 12]], 1);
    dot(g, x, BY3[i], C.wire, 2.6);
    noC(g, x, CY3, km2, 0.85);
    const kk = km2 ? col[t] : 0;
    w3(g, [[x, CY3 + 12],[x, y],[tx, y]], kk);
    if(km2) dot(g, tx, y, kk === 2 ? C.err : C.acc, 2.8);
    else dot(g, tx, y, C.wire, 2.6);
  });
  EP.chip(g, 'KM2 交叉', 168, CY3, {sz:8.5, b:1, c: km2 ? C.acc : C.tx3, al:'right'});
  txt(g, 'L1→W', 150, RY3[0] - 8, {sz:8, c:C.tx3});
  txt(g, 'L3→U', 236, RY3[2] + 9, {sz:8, c:C.tx3, al:'right'});

  /* ---- 电动机 ---- */
  const MX = 92, MCY = 236, MR = 17;
  seg(g, [[CL3[0], MY3],[MX - 14, MCY - 10]], col[0] === 2 ? C.err : (col[0] ? C.acc : C.wire), 1.8);
  seg(g, [[CL3[1], MY3],[MX, MCY - MR]], col[1] ? C.acc : C.wire, 1.8);
  seg(g, [[CL3[2], MY3],[MX + 14, MCY - 10]], col[2] === 2 ? C.err : (col[2] ? C.acc : C.wire), 1.8);
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.8; g.fillStyle = C.card;
  g.beginPath(); g.arc(MX, MCY, MR, 0, Math.PI*2); g.fill(); g.stroke(); g.restore();
  txt(g, 'M', MX, MCY - 4, {sz:11, b:1, c:C.tx});
  txt(g, '3~', MX, MCY + 7, {sz:8, c:C.tx2});

  /* ---- 短路标记 ---- */
  if(bad){
    [[CL3[0], RY3[2]], [CL3[2], RY3[0]]].forEach(function(p){
      hot(g, p[0], p[1], 13, {color:C.err, a:.9});
    });
    EP.chip(g, 'L1 撞 L3', 126, 206, {sz:8.5, b:1, c:C.err, al:'left'});
  }

  /* ---- 右边：两只接触器各把哪一相送到哪 ---- */
  box(g, 244, 46, 108, 86, 5, C.box, C.boxLine, 1);
  txt(g, 'KM1（正转）', 298, 60, {sz:8.5, b:1, c: km1 ? (bad ? C.err : C.acc) : C.tx3});
  txt(g, 'U←L1 V←L2 W←L3', 298, 74, {sz:7.5, c: km1 ? C.tx : C.tx3});
  txt(g, 'KM2（反转）', 298, 96, {sz:8.5, b:1, c: km2 ? (bad ? C.err : C.acc) : C.tx3});
  txt(g, 'U←L3 V←L2 W←L1', 298, 110, {sz:7.5, c: km2 ? C.tx : C.tx3});

  if(bad) conc(g, 262, 'err', 'U 端同时接上了 L1 和 L3 —— 相间短路',
    '这就是两只接触器必须互锁的全部理由，下一屏讲怎么锁');
  else if(km2) conc(g, 262, 'acc', 'KM2 把 L1 和 L3 调了个个儿，相序变成 L3L2L1',
    '旋转磁场掉头，电动机反转 —— 中间那一相 L2 从来不用动');
  else conc(g, 262, 'ok', 'KM1 按原样接：L1→U、L2→V、L3→W',
    '这是正转，也是 11.3、11.4、11.5 一直在用的那一台');

  $('s3a').textContent = bad ? '两只都吸' : (km2 ? 'KM2' : 'KM1');
  $('s3b').textContent = bad ? '撞在一起' : (km2 ? 'L3L2L1' : 'L1L2L3');
  $('s3c').textContent = bad ? '相间短路' : (km2 ? '反转' : '正转');
}
function note3(){
  const k = S3.k;
  let h;
  if(k === 0) h = '<b>KM1 是「直通」的那一只</b>：上桩头按 L1-L2-L3 接进来，'
    + '下桩头就按 U-V-W 出去，一根都不交叉。'
    + '<b>看右边那张小表</b> —— 它记的就是「哪一相送到电动机的哪个端子」，'
    + '正反转柜的全部秘密就在这两行里。';
  else if(k === 1) h = '<b>KM2 是「交叉」的那一只</b>：L1 接到了 W，L3 接到了 U，'
    + '<b>中间那一相 L2 原样不动</b>。'
    + '电动机看到的相序从 L1L2L3 变成了 L3L2L1，<b>旋转磁场跟着掉头</b>（11.5 屏 2 演过）。'
    + '<b>换哪两相都行</b> —— L1L2 换、L2L3 换、L1L3 换，效果完全一样；'
    + '习惯上换外侧那两根，因为接线时中间那根不用拆。';
  else h = '<b class="rd">两只同时吸合 = 相间短路。</b>'
    + '顺着线看：KM1 把 <b>L1</b> 送到 U 端，KM2 把 <b>L3</b> 也送到同一个 U 端 —— '
    + '两根相线在这个接线点上<b>直接碰在了一起</b>（W 端同理，那儿是 L3 撞 L1）。'
    + '380 V 线电压加在几乎为零的电阻上，<b>短路电流是几千安培</b>，'
    + '轻则熔断器炸、接触器报废，重则弧光伤人。'
    + '<b>这已经是本章第三次遇到同一件事了</b>（11.4 星三角、11.5 反接制动），'
    + '防的办法也是同一个：<b>互锁</b>。';
  $('n2').innerHTML = h;
}

/* ================================================================
   场景 4：双重互锁的控制电路（补的，现场标准做法）
   ================================================================
   SB1 正转（复合：SB1-1 动合进 KM1 支路，SB1-2 动断进 KM2 支路）
   SB2 反转（复合：SB2-1 动合进 KM2 支路，SB2-2 动断进 KM1 支路）
   SB3 停止（动断，串在总进线上）
   KM1-3 / KM2-3 是两只的动断辅助触点，互相串进对方的线圈支路 —— 这一道保命。 */
const st4 = new Stage('cv3', 360, 344);
const CT4 = 54, SUB4 = 140, CB4 = 292;
const F4 = 110, R4 = 250, FL4 = 64, RL4 = 304;
const SETL4 = 0.32;                  /* 对方的动断触点机械复位要这么久 */
const S4 = { ph:'stop', pk:null, pt:0 };
function w4(g, pts, live, lw){ seg(g, pts, live ? C.acc : C.wire, lw || 1.8); }
/* 当前这一刻各触点／线圈的状态 */
function state4(){
  const pk = S4.pk;
  const sb1 = pk === 'f', sb2 = pk === 'r', sb3 = pk === 's';
  let km1 = S4.ph === 'f', km2 = S4.ph === 'r';
  if(sb3){ km1 = false; km2 = false; }
  if(sb1) km2 = false;                 /* SB1-2 动断，先把反转那条断掉 */
  if(sb2) km1 = false;                 /* SB2-2 动断，先把正转那条断掉 */
  const settled = S4.pt >= SETL4;      /* 等对方的动断触点机械复位 */
  if(sb1 && settled) km1 = true;
  if(sb2 && settled) km2 = true;
  return {km1:km1, km2:km2, sb1:sb1, sb2:sb2, sb3:sb3, settled:settled};
}
function draw4(dt){
  const g = st4.g; st4.clear();
  if(dt && S4.pk){
    S4.pt += dt;
    /* 跨过 SETL4 的那一帧补一次讲解 —— 阈值必须和 state4() 用的是同一个，
       不然画布已经翻成「吸合了」，底下的讲解还停在「换向中」 */
    if(S4.pt >= SETL4 && S4.pt - dt < SETL4) note4();
    if(S4.pt >= 0.9){
      S4.ph = S4.pk === 's' ? 'stop' : S4.pk;
      S4.pk = null; S4.pt = 0; note4();
    }
  }
  const s = state4(), km1 = s.km1, km2 = s.km2;
  EP.heading(g, 14, 16, '正反转控制电路', '双重互锁');

  w4(g, [[20, CT4],[340, CT4]], true, 2);
  w4(g, [[20, CB4],[340, CB4]], true, 2);
  txt(g, 'FU1', 20, CT4 - 9, {sz:8.5, c:C.tx3, al:'left'});
  txt(g, 'FU2', 20, CB4 - 9, {sz:8.5, c:C.tx3, al:'left'});

  /* ---- 总进线：FR-1 ＋ 停止按钮 SB3 ---- */
  w4(g, [[40, CT4],[40, 71]], true);
  ncC(g, 40, 84, false, 0.9);
  txt(g, 'FR-1', 30, 84, {sz:8.5, b:1, c:C.tx3, al:'right'});
  w4(g, [[40, 97],[40, 105]], true);
  btn(g, 40, 118, true, s.sb3, 0.9);
  txt(g, 'SB3 停止', 74, 118, {sz:8.5, b:1, c: s.sb3 ? C.err : C.tx3, al:'left'});
  w4(g, [[40, 131],[40, SUB4],[R4, SUB4]], !s.sb3, 2);
  dot(g, F4, SUB4, C.wire, 2.4);

  /* ---- KM1（正转）支路 ---- */
  w4(g, [[F4, SUB4],[F4, 150]], !s.sb3);
  btn(g, F4, 163, false, s.sb1, 0.9);
  txt(g, 'SB1-1', F4 + 16, 180, {sz:8.5, b:1, c: s.sb1 ? C.acc : C.tx3, al:'left'});
  w4(g, [[F4, 148],[FL4, 148],[FL4, 152]], !s.sb3, 1.6);
  noC(g, FL4, 165, km1, 0.85);
  w4(g, [[FL4, 178],[FL4, 186],[F4, 186]], km1, 1.6);
  txt(g, 'KM1-2', FL4 - 12, 165, {sz:8.5, b:1, c: km1 ? C.acc : C.tx3, al:'right'});
  dot(g, F4, 148, C.wire, 2.4); dot(g, F4, 186, C.wire, 2.4);
  w4(g, [[F4, 176],[F4, 197]], km1 || (s.sb1 && !s.sb3));
  ncC(g, F4, 210, s.sb2, 0.85);
  txt(g, 'SB2-2', F4 + 12, 210, {sz:8.5, b:1, c: s.sb2 ? C.err : C.tx3, al:'left'});
  w4(g, [[F4, 223],[F4, 231]], km1 || (s.sb1 && !s.sb2 && !s.sb3));
  ncC(g, F4, 244, km2, 0.85);
  txt(g, 'KM2-3', F4 + 12, 244, {sz:8.5, b:1, c: km2 ? C.err : C.tx3, al:'left'});
  w4(g, [[F4, 257],[F4, 262]], km1);
  coil(g, F4, 274, km1, 'KM1');
  w4(g, [[F4, 286],[F4, CB4]], km1);

  /* ---- KM2（反转）支路 ---- */
  w4(g, [[R4, SUB4],[R4, 150]], !s.sb3);
  btn(g, R4, 163, false, s.sb2, 0.9);
  txt(g, 'SB2-1', R4 - 16, 180, {sz:8.5, b:1, c: s.sb2 ? C.acc : C.tx3, al:'right'});
  w4(g, [[R4, 148],[RL4, 148],[RL4, 152]], !s.sb3, 1.6);
  noC(g, RL4, 165, km2, 0.85);
  w4(g, [[RL4, 178],[RL4, 186],[R4, 186]], km2, 1.6);
  txt(g, 'KM2-2', RL4 + 12, 165, {sz:8.5, b:1, c: km2 ? C.acc : C.tx3, al:'left'});
  dot(g, R4, 148, C.wire, 2.4); dot(g, R4, 186, C.wire, 2.4);
  w4(g, [[R4, 176],[R4, 197]], km2 || (s.sb2 && !s.sb3));
  ncC(g, R4, 210, s.sb1, 0.85);
  txt(g, 'SB1-2', R4 + 12, 210, {sz:8.5, b:1, c: s.sb1 ? C.err : C.tx3, al:'left'});
  w4(g, [[R4, 223],[R4, 231]], km2 || (s.sb2 && !s.sb1 && !s.sb3));
  ncC(g, R4, 244, km1, 0.85);
  txt(g, 'KM1-3', R4 + 12, 244, {sz:8.5, b:1, c: km1 ? C.err : C.tx3, al:'left'});
  w4(g, [[R4, 257],[R4, 262]], km2);
  coil(g, R4, 274, km2, 'KM2');
  w4(g, [[R4, 286],[R4, CB4]], km2);

  /* ---- 两道互锁的说明 ---- */
  txt(g, '按钮互锁', 188, 210, {sz:8.5, b:1, c:C.warn});
  txt(g, '接触器互锁', 188, 244, {sz:8.5, b:1, c:C.err});

  if(S4.pk && !s.settled) conc(g, 302, 'warn', '换向的那一瞬间：先把对方断开，两边都没吸合',
    '按钮的动断触点先动作 —— 这就是按钮互锁在干的活');
  else if(km1) conc(g, 302, 'ok', '正转：KM1 吸着，KM1-3 把反转那条路断死了',
    '这会儿按反转按钮，靠的是 SB2-2 先把 KM1 断掉');
  else if(km2) conc(g, 302, 'acc', '反转：KM2 吸着，KM2-3 把正转那条路断死了',
    '两只接触器在电气上永远不可能同时得电');
  else conc(g, 302, 'warn', '停着 —— 所有触点画的都是未操作状态',
    '两个动断触点都闭着，哪条路都通，就等按钮');

  const a = (S4.pk && !s.settled) ? '换向中' : (km1 ? '正转' : (km2 ? '反转' : '停着'));
  const b = km1 ? 'KM1' : (km2 ? 'KM2' : '都没有');
  const c = (km1 || km2) ? '被断开' : '通着';
  if(S4.la !== a){ S4.la = a; $('s4a').textContent = a; }
  if(S4.lb !== b){ S4.lb = b; $('s4b').textContent = b; }
  if(S4.lc !== c){ S4.lc = c; $('s4c').textContent = c; }
}
function note4(){
  const s = state4();
  let h;
  if(S4.pk === 's') h = '<b>按下停止 SB3。</b>它串在总进线上，一断，'
    + '<b>两条支路一起失电</b>。自锁触点跟着复位，松手也起不来了。'
    + '<b>停止按钮用动断触点</b>是 4.3 讲过的失效安全：线断了、端子松了，'
    + '效果和按下停止一样，设备立刻停。';
  else if(S4.pk && !s.settled) h = '<b class="key">看这一瞬间：两边都没吸合。</b>'
    + '复合按钮按下去的时候，<b>它的动断触点先断、动合触点后合</b>，'
    + '所以对方的线圈先失电、开始释放，等它<b>机械上真的弹回来</b>，'
    + '那对动断辅助触点才闭合，这一边才吸得上。'
    + '<b>这零点几秒的空档，就是「不许两只同时吸合」在电路上的落实。</b>';
  else if(s.km1) h = '<b>正转运行。</b>顺着这条路看：'
    + '<b>KM1-2 闭合自锁</b>（松手也不停）→ <b>SB2-2 是动断的，现在闭着</b> → '
    + '<b>KM2-3 也是动断的，KM2 没吸合所以也闭着</b> → KM1 线圈得电。'
    + '同时看右边那条：<b>KM1-3 断开了，KM2 的线圈被断死</b> —— '
    + '<b>这会儿不管谁去按反转按钮的动合触点，KM2 都吸不上。</b>'
    + '这就是接触器互锁。<b>试试直接按反转。</b>';
  else if(s.km2) h = '<b>反转运行</b>，整条路和正转完全对称：'
    + 'KM2-2 自锁、SB1-2 闭着、KM1-3 闭着，KM2 线圈得电；'
    + '而 <b>KM2-3 断开，把正转那条路断死</b>。'
    + '<b>两只接触器的线圈，在电气上永远不可能同时得电</b> —— '
    + '这正是屏 3 那个相间短路被挡住的地方。';
  else h = '停着。<b>所有触点画的都是未操作状态</b>（4.3 那条第一原则）：'
    + '两个 <b>SB 的动断触点</b>闭着、两个 <b>KM 的动断触点</b>也闭着，'
    + '两条路都是通的，就差起动按钮那一下。'
    + '<b>注意主电路（屏 3）这时候仍然带电到接触器的上桩头</b> —— '
    + '停机不等于停电，检修前一律断总开关、验电。';
  $('n3').innerHTML = h;
}

/* ================================================================
   绑定
   ================================================================ */
function pick(id, st, fn){
  $(id).addEventListener('click', function(e){
    const b = e.target.closest('.btn'); if(!b) return;
    st.k = +b.dataset.k;
    document.querySelectorAll('#' + id + ' .btn').forEach(function(t){
      t.classList.toggle('on', +t.dataset.k === st.k);
    });
    fn();
  });
}
pick('s1k', S1, function(){ S1.t = 0; note1(); });
pick('s2k', S2, function(){ note2(); draw2(); });
pick('s3k', S3, function(){ note3(); draw3(); });
$('s4k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S4.pk = b.dataset.k; S4.pt = 0;
  note4();
});

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* 屏 2、屏 3 是静态的，必须在这儿补画（屏 1、屏 4 在 rAF 里） */
  draw2(); draw3();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:11, sec:'11.6'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('11.6');
  let h = '';
  h += nb.prev && nb.prev.f ? '<a href="' + nb.prev.f + '">‹ ' + nb.prev.id + ' ' + nb.prev.t + '</a>'
                            : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next && nb.next.f ? '<a class="next" href="' + nb.next.f + '">' + nb.next.id + ' ' + nb.next.t + ' ›</a>'
                            : '<span>下一节还没做</span>';
  $('pager').innerHTML = h;
})();

loop(function(dt){
  if(cur === 0) draw1(dt);
  else if(cur === 3) draw4(dt);
});
  }
});
})();
