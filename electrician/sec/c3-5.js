/* 3.5 验电器 —— 本节内容的唯一真相。
   对应《零基础学电工》第 3 章 3.5 节（书内 P56~P58）。

   这一节的眼是一句话：**验电笔不亮，不等于没电。**
   书上讲的是「怎么拿、怎么插」，但现场出人命的从来不是不会拿笔，
   而是笔不亮就当停电了。所以四屏排成：
   为什么会亮（回路） → 怎么用（插座三个孔） → 什么时候不亮但有电 → 感应笔的坑与高压验电。

   数字口径（都在文案里当场标了出处）：
   - 氖管起辉约 60V，低压验电笔量程 60~500V（题库 6-A 组两道题就考这个区间的两头）
   - 笔内限流电阻常见 1~2 MΩ，本节按 1 MΩ 算：220V ÷ 1 MΩ = 0.22 mA
   - 人体电阻按干燥条件 2 kΩ 估：没有那个电阻的话 220V ÷ 2 kΩ = 110 mA，是致命量级 */
(function(){
'use strict';
ELEC.reg({
  id: '3.5',
  file: 'c3-5.html',
  title: '3.5 验电器',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>为什么会亮</button>
    <button class="tab" data-i="1"><span class="n">2</span>插座三个孔</button>
    <button class="tab" data-i="2"><span class="n">3</span>不亮≠没电</button>
    <button class="tab" data-i="3"><span class="n">4</span>感应笔与高压</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">验电笔亮，是因为电流从你身上过去了</div>
    笔尖搭在火线上，电流经过<b>笔内的限流电阻 → 氖管 → 你的手 → 身体 → 脚 → 大地</b>，
    回到变压器的接地点。<b>这是一个真正闭合的回路，你就是其中一段导线。</b>
    <b>点三种握法，看回路通不通。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">手指抵住尾部</button>
        <button class="btn sm" data-k="1">没抵住尾部</button>
        <button class="btn sm" data-k="2">站在绝缘垫上</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">流过<br>你的电流</div><div class="v" id="s1a">0.22 mA</div></div>
        <div class="num"><div class="k">氖管</div><div class="v" id="s1b">亮</div></div>
        <div class="num hi"><div class="k">你有<br>感觉吗</div><div class="v" id="s1c">没有</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">笔里那个电阻，就是你的命</div>
    验电笔内部串了一个 <b>1~2 MΩ 的限流电阻</b>。整个回路的电阻几乎全是它 ——
    人体那点电阻（干燥时约 2 kΩ）跟 1 MΩ 比可以直接忽略。
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>回路电阻</th><th>流过人体的电流</th><th>后果</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">有限流<br>电阻</td><td>约 1 MΩ</td><td><b>0.22 mA</b></td><td>低于感知阈值，一点感觉都没有</td></tr>
        <tr><td class="eu-s">电阻<br>坏了</td><td>只剩人体 2 kΩ</td><td><b class="rd">110 mA</b></td><td><b>远超致命电流，当场出人命</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      所以<b>验电笔摔过、进过水、笔身有裂纹的一律不能用</b>，也<b>绝对不能自己拆开改装</b>。
      这不是「工具坏了换一支」的事 —— 那个电阻一旦短路，你握着的就是一根 220V 的裸线。
      <span class="sub">参考量级：人能感觉到约 0.5~1 mA，能自己甩开的极限约 10 mA，50 mA 就可能致命。</span>
    </div>
  </div>

  <div class="bet" data-bet="c35-mat" data-q="站在干燥的绝缘胶垫上，用验电笔去测火线，笔会亮吗？"
       data-opts="会亮，火线就是带电的|不亮或很微弱，因为回路没通过大地闭合|会更亮" data-right="1"
       data-after="不亮或很微弱。验电笔要靠「人 → 大地」这一段把回路闭合，站在绝缘垫上这一段就断了。配电室里铺着绝缘胶垫，穿绝缘鞋、站在木梯上作业时都会碰到这个情况——笔不亮，但线是带电的。"></div>
</section>

<!-- ================= 场景 2：插座三个孔 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">插座三个孔，笔在哪个孔会亮</div>
    国标三孔插座：<b>上面是保护地 PE，左零右火</b>（面对插座）。
    <b>点一个孔试试；再打开「零线断了」看看会出什么事。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">右孔 L 火线</button>
        <button class="btn sm" data-k="1">左孔 N 零线</button>
        <button class="btn sm" data-k="2">上孔 PE 地线</button>
      </div>
      <div class="btns" style="margin-top:8px">
        <button class="btn sm" id="s2b">零线断了：<b id="s2bt">没断</b></button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这个孔<br>是什么</div><div class="v" id="s2a">相线 L</div></div>
        <div class="num"><div class="k">对地<br>电压</div><div class="v" id="s2c">220 V</div></div>
        <div class="num hi"><div class="k">笔的<br>反应</div><div class="v" id="s2d">亮</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">握法：食指抵住尾部金属，手别碰笔尖</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>怎么做</th><th>为什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">尾部</td><td><b>食指（或拇指）压住尾端的金属</b></td><td>那是回路的一端，不接触就不亮</td></tr>
        <tr><td class="eu-s">笔尖</td><td><b>手指绝不能碰到笔尖金属</b></td><td>碰到就绕过了限流电阻，直接触电</td></tr>
        <tr><td class="eu-s">姿势</td><td>笔尖<b>垂直插到底</b>，只插一个孔</td><td>没插到底接触不上，会误判成没电</td></tr>
        <tr><td class="eu-s">环境</td><td>光线太亮时<b>用手背挡一下</b></td><td>氖管很暗，大太阳底下看不出来</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>电子验电笔还多一颗「直测按钮」</b>：按住它、笔尖接触被测点，
      显示屏才显示电压。不按只靠感应的那种读数<b>不能当作判定依据</b>（第 4 屏细说）。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">零线断了，零线孔也会亮 —— 最隐蔽的一种</div>
    零线断在了配电箱到插座之间，而插座上还接着用电器：
    <b>电流走不通，但零线这一头经过用电器的电阻被「拉」到接近相电压</b>。
    <div class="tip">
      这时候<b>零线孔一样会让验电笔亮</b>，用电器却不工作。
      新手往往判断成「插座坏了」就直接上手 —— 而那根被当成零线的线上有接近 220V。
      <span class="sub"><b>判据：用电器不工作，但火线零线两个孔笔都亮 → 先怀疑零线断路，别碰。</b>
      三相系统里零线断了更严重，会让三相不平衡的那一相电压飙到接近 380V，一排设备一起烧。</span>
    </div>
  </div>
</section>

<!-- ================= 场景 3：不亮 ≠ 没电 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">这一节最要紧的一句：笔不亮，不等于没电</div>
    氖管要<b>大约 60V 才起辉</b>，低了根本点不亮。
    <b>拖滑杆改对地电压，看氖管什么时候才亮。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="rowlab">被测点的对地电压　<b id="s3lab">220 V</b></div>
      <input type="range" id="s3u" min="0" max="600" step="5" value="220">
      <div class="nums three">
        <div class="num"><div class="k">氖管</div><div class="v" id="s3a">亮</div></div>
        <div class="num"><div class="k">在不在<br>量程内</div><div class="v" id="s3b">在</div></div>
        <div class="num hi"><div class="k">这支笔<br>能说明</div><div class="v" id="s3c">有电</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">低压验电笔：60 到 500 伏，低了不亮，高了不能碰</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>对地电压</th><th>氖管</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">&lt; 60 V</td><td><b>不亮</b></td><td>没到起辉电压。<b>36V 安全电压、感应电压都不亮</b></td></tr>
        <tr><td class="eu-s">60~500 V</td><td>亮</td><td><b>这才是它的量程</b></td></tr>
        <tr><td class="eu-s">&gt; 500 V</td><td>—</td><td><b class="rd">不能用</b>，会击穿伤人。500V 以上要用高压验电器</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      考试就考这个区间的两头：<b>「50V 时氖泡就该亮」是错的</b>（没到 60V）；
      <b>「500V 以下都能验」也是错的</b>（漏了下限）。
      <span class="sub">电子式验电笔的显示档位一般从 12V 起（12/36/55/110/220V），
      比氖管低得多 —— 但那是<b>另一种笔</b>，考题问的是氖泡式。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">笔不亮的六种原因，只有一种是「真没电」</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>不亮的原因</th><th>实际上</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">真的停电了</td><td>没电 ✓</td></tr>
        <tr><td class="eu-s">电压低于 60V</td><td><b>有电</b>（36V、直流、感应电压）</td></tr>
        <tr><td class="eu-s">氖管坏了 / 电阻断了</td><td><b>有电</b></td></tr>
        <tr><td class="eu-s">笔尖没插到底、接触面有漆/氧化层</td><td><b>有电</b></td></tr>
        <tr><td class="eu-s">手指没抵住尾部金属</td><td><b>有电</b></td></tr>
        <tr><td class="eu-s">站在绝缘垫、绝缘鞋、木梯上</td><td><b>有电</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>所以规程要求：验电前后都要在已知带电的地方试一下笔本身是好的。</b>
      顺序是 <b>先在带电处试笔 → 验被测点 → 再回到带电处试笔</b>。
      中间那一步不亮，只有在前后两次都亮的前提下才说明「真没电」。
      <span class="sub">这一条不是形式主义：笔就是在你验电的那几秒里坏掉的，也完全可能。</span>
    </div>
  </div>

  <div class="bet" data-bet="c35-notlit" data-q="用验电笔测一根线，不亮。可以直接上手了吗？"
       data-opts="可以，不亮就是没电|不行，先回到已知带电处试笔，确认笔是好的|摸一下试试" data-right="1"
       data-after="不行。「不亮」有六种原因，只有一种是真没电。必须回到已知带电的地方再试一次笔——前后两次都亮，中间那次不亮，才说明被测点真的没电。这就是规程里「验电前后试笔」的由来。"></div>
</section>

<!-- ================= 场景 4：感应笔与高压验电器 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">感应笔用来「找」，不能用来「判定停电」</div>
    非接触的感应式测电笔靠电场感应报警，方便，但<b>误报和漏报都会发生</b>。
    <b>点三种情形对比看。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">真的带电</button>
        <button class="btn sm" data-k="1">已停电，旁边有带电电缆</button>
        <button class="btn sm" data-k="2">带电，但线在金属槽盒里</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">感应笔<br>（非接触）</div><div class="v" id="s4a">报警</div></div>
        <div class="num"><div class="k">接触式<br>验电笔</div><div class="v" id="s4b">亮</div></div>
        <div class="num hi"><div class="k">这根线<br>到底带不带电</div><div class="v" id="s4c">带电</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">感应电压是什么，为什么会让感应笔误报</div>
    两根电缆平行敷设、或者一根长导线停电后仍和带电线并排走，
    它们之间隔着绝缘就是一个<b>很小的电容</b>。带电那根上的交流电压会<b>耦合</b>到停电这根上，
    在它上面感应出<b>几伏到几十伏</b>的电压 —— 没有带负载能力，但足够触发感应笔。
    <div class="tip info">
      <b>反过来判断也有用：</b>用万用表量到几十伏、但一接负载电压就塌到接近零，
      多半就是感应电压而不是真的带电。
      <span class="sub">这也是为什么<b>停电检修必须挂接地线</b>（停电作业五步的第三步）——
      接地线把感应电压直接短路到地，人才是真安全的。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">停电作业五步，顺序不能乱</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>步</th><th>做什么</th><th>要点</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">① 停电</td><td>断开各方向电源</td><td>断开点要有<b>明显断开点</b>，防止远程/自动合闸</td></tr>
        <tr><td class="eu-s">② 验电</td><td>用合格验电器逐相验</td><td><b>前后要在带电处试笔</b></td></tr>
        <tr><td class="eu-s">③ 装接<br>地线</td><td>先接接地端，再接导体端</td><td>把残余电荷和感应电压导走</td></tr>
        <tr><td class="eu-s">④ 挂<br>标示牌</td><td>「禁止合闸，有人工作」</td><td><b>谁停的闸谁送</b></td></tr>
        <tr><td class="eu-s">⑤ 装<br>遮栏</td><td>把还带电的部分隔开</td><td>防止误碰邻近带电体</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>验电排在第二步，不是第一步</b> —— 先停电再验电。
      也不是最后一步 —— <b>没验电就去装接地线，等于赤手接一根可能带电的线。</b>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">高压验电器：500V 以上才用它</div>
    分<b>接触式</b>（金属感应探头直接接触被测线缆）和<b>非接触式</b>（感应测试端靠近，
    用声光报警）两种。用法上有几条硬规矩：
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>规矩</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">手</td><td><b>戴绝缘手套，手绝不能越过护环</b></td></tr>
        <tr><td class="eu-s">杆长</td><td>不够长时用绝缘物延长手柄，<b>不许凑近</b></td></tr>
        <tr><td class="eu-s">判定</td><td>发出声光报警 = <b>该线缆带电</b>（报警是「有电」不是「正常」）</td></tr>
        <tr><td class="eu-s">试验</td><td>同样要<b>先在带电处试验验电器完好</b></td></tr>
        <tr><td class="eu-s">监护</td><td>高压验电<b>必须两人</b>，一人操作一人监护</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>低压验电笔绝对不能拿去验高压</b> —— 它的量程上限是 500V，
      碰高压会直接击穿，人在回路里。
      <span class="sub">低压电工作业证的范围是 1000V 以下，高压作业要另外的证。
      这一条写在这里只是让你认得出它、知道不该自己上。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="c3-5">
    <div class="qz" data-q="站在绝缘胶垫上用氖泡验电笔测火线，笔不亮。这说明什么？"
         data-opts="线没电|说明不了，回路没通过大地闭合，笔本来就不会亮|绝缘垫坏了"
         data-right="1"
         data-why="说明不了。氖泡验电笔要靠「笔 → 手 → 人体 → 脚 → 大地」这一段把回路闭合，站在绝缘垫上这一段是断的，有电也不亮。配电室铺绝缘胶垫、穿绝缘鞋、站木梯上作业时都会遇到。"></div>
    <div class="qz" data-q="氖泡式低压验电器的测量范围是？"
         data-opts="12~500V|60~500V|0~1000V"
         data-right="1"
         data-why="60~500V。下限是氖管的起辉电压约 60V，低于它点不亮——所以 36V 安全电压、感应电压它都不亮；上限 500V，再高会击穿伤人，要用高压验电器。考试从上下限两头考同一个区间。"></div>
    <div class="qz" data-q="插座上的用电器不工作，但左孔右孔用验电笔测都亮。最该怀疑什么？"
         data-opts="用电器坏了|零线断路，零线经过用电器被拉到接近相电压|插座两个孔接反了"
         data-right="1"
         data-why="零线断路。零线断在配电箱到插座之间时，电流走不通，但零线这一头经过用电器的电阻被拉到接近相电压，所以两个孔笔都亮。这时候那根「零线」上有接近 220V，不能当零线碰。"></div>
    <div class="qz" data-q="用非接触的感应笔靠近一根已经停电的电缆，笔报警了。为什么？"
         data-opts="停电没停干净，还带电|多半是旁边带电电缆耦合过来的感应电压，要用接触式验电器复核|感应笔坏了"
         data-right="1"
         data-why="多半是感应电压。平行敷设的电缆之间隔着绝缘就是个小电容，带电那根会把电压耦合到停电这根上，几伏到几十伏，没有带负载能力但足够触发感应笔。所以感应笔只能用来「找」，判定停电要用接触式验电器，而且停电检修必须挂接地线把感应电压导走。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 3 章 3.5 节（书内 P56~P58）<br>下一节起是万用表 —— 就业方向上最要紧的一块</div>
</section>`,

  init: function(EC){
'use strict';
const {C, Path, Stage, txt, tw, box, tag, loop, $} = EC;
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

/* 全节共用：画一支氖管验电笔（水平放，笔尖朝左）
   x0 是笔尖，x1 是尾部金属的右端 */
function penBody(g, x0, x1, y, lit){
  const H = 15;
  /* 笔尖金属 */
  g.save();
  poly(g, [[x0, y], [x0+15, y-4.4], [x0+15, y+4.4]], P.steel, P.steelDD, 1);
  g.restore();
  box(g, x0+13, y-H/2, 12, H, 2, P.steel, P.steelDD, 1.1);
  /* 透明笔身 */
  box(g, x0+25, y-H/2, x1-x0-40, H, 3, 'rgba(150,178,205,.15)', 'rgba(190,209,228,.75)', 1.1);
  /* 尾部金属 */
  box(g, x1-15, y-H/2, 15, H, 2, P.steel, P.steelDD, 1.1);
  /* 内部：限流电阻 + 氖管 + 弹簧 */
  const rx = x0+34;
  box(g, rx, y-4.5, 26, 9, 2, P.cream, P.creamD, 1);
  g.save(); g.fillStyle = '#6b4423';
  g.fillRect(rx+5, y-4.5, 2.6, 9); g.fillRect(rx+10, y-4.5, 2.6, 9);
  g.restore();
  const nx = rx + 36;
  if(lit){
    const gr = g.createRadialGradient(nx+11, y, 2, nx+11, y, 17);
    gr.addColorStop(0, 'rgba(255,140,60,.85)');
    gr.addColorStop(1, 'rgba(255,140,60,0)');
    g.save(); g.fillStyle = gr;
    g.beginPath(); g.arc(nx+11, y, 17, 0, Math.PI*2); g.fill(); g.restore();
  }
  box(g, nx, y-5, 22, 10, 4, lit ? '#ff9840' : C.lampOff, P.steelDD, 1);
  /* 弹簧 */
  g.save(); g.strokeStyle = P.steelD; g.lineWidth = 1.4;
  g.beginPath();
  for(let i = 0; i <= 12; i++){
    const px = nx + 26 + i*(x1 - 15 - nx - 26)/12;
    i ? g.lineTo(px, y + (i%2 ? 4 : -4)) : g.moveTo(px, y);
  }
  g.stroke(); g.restore();
  return { tip:[x0, y], tail:[x1, y], neon:[nx+11, y], res:[rx+13, y] };
}

function poly(g, pts, fill, line, lw){
  g.beginPath();
  pts.forEach(function(p,i){ i ? g.lineTo(p[0],p[1]) : g.moveTo(p[0],p[1]); });
  g.closePath();
  if(fill){ g.fillStyle = fill; g.fill(); }
  if(line){ g.strokeStyle = line; g.lineWidth = lw || 1.2; g.lineJoin = 'round'; g.stroke(); }
}

/* 断开处画一个缺口 + 红叉 —— 「圈没闭合」的统一画法 */
function breakMark(g, x, y, label){
  g.save();
  g.strokeStyle = C.err; g.lineWidth = 2.4; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x-6, y-6); g.lineTo(x+6, y+6);
  g.moveTo(x+6, y-6); g.lineTo(x-6, y+6); g.stroke();
  g.restore();
  if(label) tag(g, label, x, y - 20, {sz:9.5, b:1, c:C.err, line:C.err});
}

/* ================================================================
   场景 1：为什么会亮 —— 回路真的从你身上过去
   ================================================================
   回路：变压器 → 火线 → 笔尖 → 限流电阻 → 氖管 → 尾部 → 手 → 身体 →
         脚 → 大地 → 变压器中性点接地。
   限流电阻 1 MΩ 占了全部电阻，人体那 2 kΩ 忽略不计。 */
const RLIM = 1e6, RBODY = 2000, UL = 220;
const S1 = { k:0, ph:0 };
const st1 = new Stage('cv0', 360, 300);

/* 回路路径：断点位置按状态不同，dots 只画到 upto 为止 —— 但这一节采用
   「圈没闭合就全部静止」的画法（circuit-basics 定下的表达），所以断了就不动 */
const P1 = new Path([[28,150],[28,72],[132,72],[262,72],[276,78],[288,104],[288,150],
                     [284,212],[284,236],[28,236],[28,196]]);

function draw1(dt){
  const g = st1.g; st1.clear();
  const ok = S1.k === 0;
  if(ok) S1.ph += dt * 26;
  EP.heading(g, 20, 16, '验电笔的回路', ok ? '电流正在流' : '回路断了，电流为零');

  /* 大地：用中性面板底 + 斜纹。别用 okbg —— 那是「成功绿」，
     一大片绿会被读成「这里是安全的」，跟这一屏要讲的正相反 */
  g.save();
  g.fillStyle = C.box;
  g.fillRect(0, 212, 360, 44);
  g.strokeStyle = C.boxLine; g.lineWidth = 1;
  for(let x = -20; x < 380; x += 22){
    g.beginPath(); g.moveTo(x, 212); g.lineTo(x - 13, 226); g.stroke();
  }
  g.strokeStyle = C.tx3; g.lineWidth = 1.4;
  g.beginPath(); g.moveTo(0, 212); g.lineTo(360, 212); g.stroke();
  g.restore();
  txt(g, '大地', 170, 222, {sz:10, c:C.tx3});

  /* 回路导线 */
  P1.stroke(g, 2.6, ok ? C.wire : C.wireL);
  /* 电源：变压器绕组 + 中性点接地 */
  g.save();
  g.beginPath(); g.arc(28, 130, 14, 0, Math.PI*2);
  g.fillStyle = C.card; g.fill();
  g.strokeStyle = C.wire; g.lineWidth = 1.8; g.stroke();
  g.strokeStyle = C.tx2; g.lineWidth = 1.6; g.lineCap = 'round';
  g.beginPath();
  for(let i = 0; i <= 20; i++){
    const px = 28 - 8 + i*0.8, py = 130 - Math.sin(i/20*Math.PI*2)*4.5;
    i ? g.lineTo(px, py) : g.moveTo(px, py);
  }
  g.stroke(); g.restore();
  txt(g, '变压器二次侧', 48, 124, {sz:9.5, c:C.tx3, al:'left'});
  txt(g, '220 V', 48, 138, {sz:10, b:1, c:C.tx2, al:'left'});
  g.save(); g.strokeStyle = C.PE; g.lineWidth = 2.2; g.lineCap = 'round';
  [[10,0],[7,4],[4,8]].forEach(function(a){
    g.beginPath(); g.moveTo(28-a[0], 198+a[1]); g.lineTo(28+a[0], 198+a[1]); g.stroke();
  });
  g.restore();
  txt(g, '中性点接地', 44, 202, {sz:9, c:C.tx3, al:'left'});

  /* 火线标注 */
  txt(g, 'L 火线', 74, 62, {sz:9.5, b:1, c:C.L});

  /* 笔 */
  const pen = penBody(g, 132, 262, 72, ok);
  EP.callout(g, pen.res[0], pen.res[1]+8, 150, 116, '1 MΩ', '限流电阻', {al:'left'});
  EP.callout(g, pen.neon[0], pen.neon[1]+8, 232, 150, ok ? '亮' : '不亮', '氖管', {al:'left'});

  /* 人 */
  const HX = 288;
  g.save();
  g.strokeStyle = ok ? C.skin : C.tx3; g.lineWidth = 2.6; g.lineCap = 'round';
  g.beginPath(); g.arc(HX, 96, 9, 0, Math.PI*2); g.stroke();
  g.beginPath(); g.moveTo(HX, 105); g.lineTo(HX, 152); g.stroke();
  g.beginPath(); g.moveTo(HX, 152); g.lineTo(276, 212); g.moveTo(HX, 152); g.lineTo(300, 212); g.stroke();
  /* 手臂伸向笔尾 */
  g.beginPath(); g.moveTo(HX, 116); g.lineTo(268, 78); g.stroke();
  g.restore();
  txt(g, '人体 约 2 kΩ', 306, 132, {sz:9, c:C.tx3, al:'left'});

  /* 三种状态的断点 */
  if(S1.k === 1) breakMark(g, 268, 76, '手指没抵住');
  if(S1.k === 2){
    box(g, 262, 210, 52, 8, 2, C.warn, null, 0);
    breakMark(g, 288, 214, '绝缘垫');
  }

  /* 电流圆点：闭合才动，断了全部静止变灰 */
  EC.dots(g, P1, {gap:26, r:3, phase:S1.ph, color: ok ? C.cur : C.tx3,
                  skip:[[P1.len*0.30, P1.len*0.44]]});

  const I = ok ? UL/(RLIM + RBODY) * 1000 : 0;
  box(g, 20, 262, 320, 30, 6, ok ? C.accbg : C.errbg, ok ? C.acc : C.err, 1);
  txt(g, ok ? 'I = 220 V ÷ 1 MΩ = ' + I.toFixed(2) + ' mA　—— 低于能感觉到的 0.5 mA'
            : (S1.k === 1 ? '回路没闭合 → 电流为零 → 氖管不亮（但线还是带电的）'
                          : '脚下绝缘 → 回路没闭合 → 不亮（但线还是带电的）'),
      180, 277, {sz:10.5, b:1, c: ok ? C.acc : C.err});
}

function note1(){
  const ok = S1.k === 0;
  const I = ok ? (UL/(RLIM + RBODY) * 1000) : 0;
  $('s1a').textContent = I.toFixed(2) + ' mA';
  $('s1b').textContent = ok ? '亮' : '不亮';
  $('s1c').textContent = ok ? '没有' : '没电流';
  const T = [
    { st:'回路通了，笔亮', b:'电流从火线出发，穿过笔里的 1 MΩ 电阻和氖管，' +
        '再经过你的手、身体、脚进入大地，最后回到变压器的中性点接地。' +
        '<b>整个回路里 99.8% 的电阻是笔里那个电阻</b>，所以电流被限制在 0.22 mA，' +
        '连感觉都没有。',
      tip:'<b>你是回路的一部分</b> —— 这不是比喻。所以笔的绝缘和那个电阻一旦出问题，' +
        '限制电流的东西就没了。' },
    { st:'手指没抵住尾部 —— 不亮', b:'尾部那截金属是回路的一端。手指不压住它，' +
        '电流就走不到人身上，<b>回路是断的，氖管当然不亮</b>。',
      tip:'<b>这时候「不亮」跟「没电」长得一模一样。</b>新手最常见的误判就是这个：' +
        '握姿不对，测什么都不亮，于是以为整条线都停电了。' },
    { st:'站在绝缘垫上 —— 不亮', b:'脚和大地之间被绝缘垫隔开，' +
        '<b>「人 → 大地」这一段断了</b>，回路照样闭合不了。',
      tip:'<b>配电室的地面本来就铺着绝缘胶垫</b>，穿绝缘鞋、站在木梯或干燥木地板上' +
        '也是同一回事。在这些地方验电笔可能完全不亮，而线是带电的。' }
  ][S1.k];
  $('n0').innerHTML = '<div class="st' + (S1.k ? ' bad' : '') + '">' + T.st + '</div>' +
    T.b + '<div class="tip' + (S1.k ? '' : ' info') + '" style="margin-top:8px">' + T.tip + '</div>';
}

document.getElementById('s1k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S1.k = +b.dataset.k;
  document.querySelectorAll('#s1k .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S1.k);
  });
  note1();
});

/* ================================================================
   场景 2：插座三个孔
   ================================================================
   国标三孔插座：上 PE、左 N、右 L（面对插座）。
   「零线断了」那一档是现场最隐蔽的一种 —— 零线经过用电器被拉到接近相电压，
   两个孔笔都亮，而用电器不工作。 */
const S2 = { k:0, cut:false };
const st2 = new Stage('cv1', 360, 312);

const HOLES = [
  { id:'L',  x:214, y:150, a:-0.42, n:'相线 L', d:'火线，正常就该有 220 V' },
  { id:'N',  x:146, y:150, a:0.42,  n:'零线 N', d:'正常时对地接近 0 V' },
  { id:'PE', x:180, y:98,  a:0,     n:'保护地 PE', d:'接大地，任何时候都该是 0 V' }
];

function s2state(){
  const h = HOLES[S2.k];
  if(h.id === 'L')  return { u:220, lit:true,  why:'火线对地 220 V，笔亮 —— 这是正常的' };
  if(h.id === 'PE') return { u:0,   lit:false, why:'保护地对地 0 V，笔不亮 —— 亮了就是大事故' };
  return S2.cut
    ? { u:215, lit:true,  why:'零线断了：它经过用电器被拉到接近 220 V，笔也亮了' }
    : { u:0,   lit:false, why:'零线对地接近 0 V，笔不亮 —— 这是正常的' };
}

function hole(g, h, on){
  g.save(); g.translate(h.x, h.y); g.rotate(h.a);
  box(g, -4.5, -13, 9, 26, 2.5, C.box, on ? C.acc : C.boxLine, on ? 1.8 : 1.2);
  g.restore();
  txt(g, h.id, h.x, h.y + (h.id === 'PE' ? -24 : 26), {sz:10, b:1, c: on ? C.acc : C.tx3});
}

function draw2(){
  const g = st2.g; st2.clear();
  const h = HOLES[S2.k], s = s2state();
  EP.heading(g, 20, 16, '三孔插座', '面对插座：上 PE、左 N、右 L');

  /* 面板 */
  box(g, 86, 60, 188, 140, 14, P.panel, P.panelD, 1.4);
  box(g, 96, 70, 168, 120, 10, EP.shade(P.panel, -0.06), P.panelD, 1);
  HOLES.forEach(function(x){ hole(g, x, x.id === h.id); });

  /* 笔：从孔位斜着往右上伸出来 */
  g.save();
  g.translate(h.x, h.y);
  g.rotate(h.id === 'PE' ? -0.36 : -0.52);
  penBody(g, 0, 128, 0, s.lit);
  g.restore();

  /* 下面这条示意：零线是怎么被「拉」到 215 V 的 */
  const BY = 232;
  g.save(); g.strokeStyle = C.boxLine; g.lineWidth = 1; g.setLineDash([3,3]);
  g.beginPath(); g.moveTo(20, BY - 26); g.lineTo(340, BY - 26); g.stroke();
  g.restore();
  txt(g, '插座背后这条线路', 20, BY - 40, {sz:9.5, c:C.tx3, al:'left'});

  const wire = new Path([[36, BY], [140, BY], [220, BY], [324, BY]]);
  wire.stroke(g, 2.6, S2.cut ? C.wireL : C.wire);
  EC.resistor(g, 180, BY, {len:36, w:15, label:'用电器', ly:-16, sz:9.5});
  txt(g, 'L', 36, BY - 13, {sz:10, b:1, c:C.L});
  txt(g, 'N', 324, BY - 13, {sz:10, b:1, c:C.N});
  txt(g, '配电箱', 36, BY + 16, {sz:9, c:C.tx3});
  txt(g, '插座 N 孔', 320, BY + 16, {sz:9, c:C.tx3});
  if(S2.cut){
    breakMark(g, 268, BY, '断了');
    txt(g, '这一段没电流，但它的电位被用电器拉到了接近 220 V',
        180, BY + 32, {sz:9.5, b:1, c:C.err});
  }else{
    txt(g, '电流走得通，零线一头在配电箱接地，所以是 0 V',
        180, BY + 32, {sz:9.5, c:C.tx3});
  }

  const bad = (h.id === 'N' && S2.cut);
  box(g, 20, 276, 320, 30, 6, bad ? C.errbg : C.okbg, bad ? C.err : C.ok, 1);
  txt(g, s.why, 180, 291, {sz:10.5, b:1, c: bad ? C.err : C.ok});
}

function note2(){
  const h = HOLES[S2.k], s = s2state();
  $('s2a').textContent = h.n;
  $('s2c').textContent = s.u + ' V';
  $('s2d').textContent = s.lit ? '亮' : '不亮';
  $('s2bt').textContent = S2.cut ? '断了' : '没断';
  let body = '<div class="st">' + h.n + '</div>' + h.d + '。';
  let tip = '';
  if(h.id === 'L'){
    body += '<br>笔亮说明这个孔<b>对地有 60 V 以上的电压</b>，也就是通常说的「有电」。';
    tip = '<b>验电笔判的是「对地电压」，不是「相不相」。</b>它只有一个接触点，' +
      '另一端是你和大地 —— 所以它量的永远是被测点和大地之间的电位差。';
  }else if(h.id === 'PE'){
    body += '<br>笔不亮是正常的。';
    tip = '<b class="rd">PE 孔如果让笔亮了，是很严重的故障</b>：' +
      '要么某台设备外壳漏电把 PE 拉高了，要么 PE 和相线接反/接错。' +
      '这时候所有接地的金属外壳都可能带电，<b>立刻停电查，别继续用</b>。';
  }else if(S2.cut){
    body = '<div class="st bad">零线断了 —— 零线孔也亮</div>' +
      '零线断在配电箱和插座之间，<b>电流走不通，用电器不工作</b>；' +
      '但零线这一头经过用电器的电阻，电位被<b>拉到接近相电压</b>，所以笔照样亮。';
    tip = '<b>判据：用电器不工作，可火线零线两个孔笔都亮 → 先怀疑零线断路。</b>' +
      '这时候那根「零线」上有接近 220 V，<b>不能当零线去碰</b>。' +
      '<span class="sub">三相系统里零线断了后果更大：三相不平衡时，负载轻的那一相电压会飙到接近 380 V，一排设备一起烧。</span>';
  }else{
    body += '<br>笔不亮，是因为它对地几乎没有电位差。';
    tip = '<b>零线不亮 ≠ 零线安全。</b>零线在正常运行时是<b>有电流流过</b>的，' +
      '断开它的瞬间照样会打火；而且一旦某处断了，断点后面那一段就会带上接近相电压' +
      '（把上面那个开关打开看看）。';
  }
  $('n1').innerHTML = body + '<div class="tip' +
    (h.id === 'L' ? ' info' : '') + '" style="margin-top:8px">' + tip + '</div>';
}

document.getElementById('s2k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S2.k = +b.dataset.k;
  document.querySelectorAll('#s2k .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S2.k);
  });
  note2(); draw2();
});
document.getElementById('s2b').addEventListener('click', function(){
  S2.cut = !S2.cut;
  this.classList.toggle('on', S2.cut);
  note2(); draw2();
});

/* ================================================================
   场景 3：不亮 ≠ 没电
   ================================================================
   氖管起辉约 60V，量程上限 500V。题库 6-A 组两道题就考这个区间的两头。 */
const S3 = { u:220 };
const st3 = new Stage('cv2', 360, 268);
const UMAX = 600, BX = 34, BW = 300, BY = 108;

function draw3(){
  const g = st3.g; st3.clear();
  const u = S3.u, lit = u >= 60 && u <= 500, over = u > 500;
  EP.heading(g, 20, 16, '氖管什么时候才亮', '量程 60~500 V');

  const px = function(v){ return BX + BW*v/UMAX; };
  /* 三段：点不亮 / 量程内 / 不能用 */
  box(g, BX, BY, px(60)-BX, 26, 4, C.box, C.boxLine, 1);
  box(g, px(60), BY, px(500)-px(60), 26, 4, C.okbg, C.ok, 1);
  box(g, px(500), BY, px(UMAX)-px(500), 26, 4, C.errbg, C.err, 1);
  txt(g, '点不亮', (BX+px(60))/2, BY+13, {sz:9, c:C.tx3});
  txt(g, '正常量程', (px(60)+px(500))/2, BY+13, {sz:10, b:1, c:C.ok});
  txt(g, '不能用', (px(500)+px(UMAX))/2, BY+13, {sz:9, b:1, c:C.err});
  /* 刻度 */
  [0, 60, 220, 380, 500, 600].forEach(function(v){
    g.save(); g.strokeStyle = C.boxLine; g.lineWidth = 1;
    g.beginPath(); g.moveTo(px(v), BY+26); g.lineTo(px(v), BY+31); g.stroke(); g.restore();
    txt(g, String(v), px(v), BY+39, {sz:8.5, c:C.tx3});
  });
  txt(g, '对地电压 V', BX, BY-12, {sz:9.5, c:C.tx3, al:'left'});
  /* 当前值的指针 */
  const cx = px(u);
  g.save(); g.fillStyle = C.acc;
  g.beginPath(); g.moveTo(cx, BY-3); g.lineTo(cx-6, BY-13); g.lineTo(cx+6, BY-13);
  g.closePath(); g.fill(); g.restore();
  tag(g, u + ' V', cx, BY-25, {sz:10, b:1, c:C.acc, line:C.acc});

  /* 氖管 */
  const NY = 196;
  if(lit){
    const gr = g.createRadialGradient(180, NY, 3, 180, NY, 32);
    gr.addColorStop(0, 'rgba(255,140,60,.8)');
    gr.addColorStop(1, 'rgba(255,140,60,0)');
    g.save(); g.fillStyle = gr;
    g.beginPath(); g.arc(180, NY, 32, 0, Math.PI*2); g.fill(); g.restore();
  }
  box(g, 156, NY-11, 48, 22, 9, lit ? '#ff9840' : C.lampOff, P.steelDD, 1.2);
  txt(g, lit ? '亮' : '不亮', 180, NY, {sz:11, b:1, c: lit ? '#3a2410' : C.tx3});
  txt(g, '氖管', 180, NY+24, {sz:9.5, c:C.tx3});

  const msg = over ? '超过 500 V —— 低压验电笔不能碰，要用高压验电器'
            : (lit ? '在量程内，笔亮 = 这一点对地有电'
                   : '低于起辉电压 60 V，氖管点不亮 —— 但这里可能有电');
  box(g, 20, 230, 320, 30, 6,
      over ? C.errbg : (lit ? C.okbg : C.warnbg),
      over ? C.err : (lit ? C.ok : C.warn), 1);
  txt(g, msg, 180, 245, {sz:10.5, b:1, c: over ? C.err : (lit ? C.ok : C.warn)});
}

function note3(){
  const u = S3.u, lit = u >= 60 && u <= 500, over = u > 500;
  $('s3lab').textContent = u + ' V';
  $('s3a').textContent = lit ? '亮' : '不亮';
  $('s3b').textContent = over ? '超上限' : (u < 60 ? '低于下限' : '在');
  $('s3c').textContent = over ? '别用它' : (lit ? '有电' : '什么都说明不了');
  let h;
  if(over){
    h = '<div class="st bad">' + u + ' V 已经超出这支笔的量程</div>' +
      '低压验电笔的上限是 <b>500 V</b>。拿它去碰更高的电压，' +
      '<b>笔身或氖管会被击穿</b> —— 而你正握在回路的另一端。' +
      '<div class="tip" style="margin-top:8px"><b>500 V 以上一律用高压验电器</b>，' +
      '而且要戴绝缘手套、手不越过护环、两人作业。' +
      '<span class="sub">低压电工作业证的范围是 1000 V 以下，高压那部分不是你该自己上的活。</span></div>';
  }else if(lit){
    h = '<div class="st good">' + u + ' V —— 笔亮，这一点确实有电</div>' +
      '在 60~500 V 这个区间里，氖管亮就说明<b>被测点对地有电压</b>。' +
      '<div class="tip info" style="margin-top:8px"><b>注意「亮」是可信的，「不亮」才不可信。</b>' +
      '亮了几乎一定有电（除非是很强的感应电压）；不亮却有六七种可能，' +
      '<b>只有一种是真没电</b>。</div>';
  }else{
    h = '<div class="st bad">' + u + ' V —— 氖管不亮，可这里有电</div>' +
      '氖管要<b>约 60 V 才起辉</b>。' + u + ' V 点不亮它，' +
      '但这个电压<b>照样能让人触电</b>（安全特低电压的界限是交流 50 V 以下，' +
      '而且潮湿环境下这个界限还要往下压）。' +
      '<div class="tip" style="margin-top:8px"><b>典型的「有电但不亮」：</b>' +
      '36 V 行灯电路、直流回路、平行敷设产生的感应电压、二次侧控制回路。' +
      '<span class="sub">要判定这些，靠的是万用表，不是验电笔。下一节就讲万用表。</span></div>';
  }
  $('n2').innerHTML = h;
}

document.getElementById('s3u').addEventListener('input', function(){
  S3.u = +this.value; note3(); draw3();
});

/* ================================================================
   场景 4：感应笔的误报与漏报
   ================================================================
   三种情形：真带电 / 停电但邻近耦合出感应电压 / 带电但被金属槽盒屏蔽。
   结论钉死：感应笔用来「找」，判定停电必须用接触式并前后试笔。 */
const S4 = { k:0 };
const st4 = new Stage('cv3', 360, 248);

const CASES = [
  { t:'真的带电', ind:true, con:true, hot:true, near:false, box:false,
    st:'两支都报 —— 确实带电',
    b:'感应笔报警、接触式验电笔也亮。<b>两个证据一致，判定带电。</b>',
    tip:'这是最简单的情形。麻烦的是下面两种 —— 两支笔说的不一样。' },
  { t:'已停电，旁边有带电电缆', ind:true, con:false, hot:false, near:true, box:false,
    st:'感应笔误报 —— 线其实已经停电了',
    b:'这根线已经停电，但它和旁边那根带电电缆<b>平行敷设</b>，' +
      '中间隔着绝缘就是一个很小的电容。带电那根上的交流电压<b>耦合</b>过来，' +
      '在这根上感应出<b>几伏到几十伏</b>。<b>感应笔只看电场，于是报警了。</b>',
    tip:'<b>感应电压带不动负载</b> —— 接一个小灯泡电压立刻塌到接近零。' +
      '万用表量到几十伏、一加负载就没了，基本可以判定是感应电压。' +
      '<span class="sub">但这不代表可以徒手上：停电检修必须挂接地线，' +
      '把感应电压直接短路到地。</span>' },
  { t:'带电，但线在金属槽盒里', ind:false, con:true, hot:true, near:false, box:true,
    st:'感应笔漏报 —— 线是带电的',
    b:'金属槽盒（或屏蔽层、金属软管）把电场挡住了，<b>感应笔一点反应都没有</b>。' +
      '而接触式验电笔一碰导体就亮 —— <b>线是带电的</b>。',
    tip:'<b>漏报比误报危险得多。</b>除了屏蔽，还有几种常见的漏报：' +
      '笔的电池没电、隔着厚绝缘层或线管、手握的位置不对、灵敏度调低了。' +
      '<b>所以感应笔的「不响」永远不能当成停电的依据。</b>' }
];

function draw4(){
  const g = st4.g; st4.clear();
  const K = CASES[S4.k];
  EP.heading(g, 20, 16, K.t, '');

  /* 邻近那根带电电缆（只有情形 2 有） */
  if(K.near){
    const nb = new Path([[36, 52], [324, 52]]);
    nb.stroke(g, 6, C.L);
    tag(g, '带电 220 V', 330, 34, {sz:9.5, b:1, c:C.L, line:C.L, al:'r'});
    /* 耦合示意：几条竖虚线，压在电缆左段的空地上 —— 别放中间，
       那儿要留给两支笔和它们的标签 */
    g.save(); g.strokeStyle = C.volt; g.lineWidth = 1.2; g.setLineDash([3,3]);
    [44, 62, 80].forEach(function(x){
      g.beginPath(); g.moveTo(x, 58); g.lineTo(x, 140); g.stroke();
    });
    g.restore();
    tag(g, '耦合', 62, 120, {sz:9.5, b:1, c:C.volt, line:C.volt});
  }

  /* 主电缆 */
  const MY = 150;
  if(K.box){
    box(g, 30, 134, 300, 32, 4, C.box, P.steelD, 1.6);
  }
  const mb = new Path([[36, MY], [324, MY]]);
  mb.stroke(g, 6, K.hot ? C.L : C.wireL);
  txt(g, K.hot ? '被测线：带电' : '被测线：已停电',
      36, MY + 22, {sz:10, b:1, c: K.hot ? C.L : C.tx3, al:'left'});
  if(K.box) txt(g, '金属槽盒把电场屏蔽掉了', 36, MY + 38,
                {sz:9.5, b:1, c:P.steelD, al:'left'});

  /* 感应笔：悬在电缆上方，不接触 */
  const IX = 150, IY = 106;
  g.save(); g.translate(IX, IY); g.rotate(-0.5);
  poly(g, [[-11, 0], [0, -6], [0, 6]], P.steel, P.ink, 1);
  box(g, 0, -7, 72, 14, 4, P.body, P.ink, 1.1);
  box(g, 58, -4.5, 12, 9, 3, K.ind ? C.err : C.lampOff, P.ink, 1);
  g.restore();
  if(K.ind){
    g.save(); g.strokeStyle = C.err; g.lineWidth = 1.6;
    for(let i = 1; i <= 3; i++){
      g.beginPath();
      g.arc(IX + 52, IY - 28, i*7, -Math.PI*0.9, -Math.PI*0.1);
      g.stroke();
    }
    g.restore();
  }
  tag(g, K.ind ? '感应笔：响' : '感应笔：不响', 220, 70,
      {sz:9.5, b:1, c: K.ind ? C.err : C.tx3, line: K.ind ? C.err : C.boxLine, al:'l'});
  g.save(); g.strokeStyle = C.boxLine; g.lineWidth = 1; g.setLineDash([2,2]);
  g.beginPath(); g.moveTo(IX - 4, IY + 10); g.lineTo(IX - 4, K.box ? 132 : 142); g.stroke();
  g.restore();
  txt(g, '不接触', IX + 4, 128, {sz:8.5, c:C.tx3, al:'left'});

  /* 接触式笔：笔尖真的搭在线上 */
  g.save(); g.translate(262, MY); g.rotate(-0.66);
  penBody(g, 0, 92, 0, K.con);
  g.restore();
  tag(g, K.con ? '接触式：亮' : '接触式：不亮', 330, 176,
      {sz:9.5, b:1, c: K.con ? C.warn : C.ok, line: K.con ? C.warn : C.ok, al:'r'});

  const agree = (K.ind === K.con);
  box(g, 20, 202, 320, 34, 6, agree ? C.okbg : C.errbg, agree ? C.ok : C.err, 1);
  txt(g, agree ? '两支笔说的一致' : '两支笔说的不一样 —— 以接触式为准',
      180, 214, {sz:10.5, b:1, c: agree ? C.ok : C.err});
  txt(g, K.hot ? '结论：这根线带电' : '结论：这根线已停电，笔响的是感应电压',
      180, 229, {sz:9.5, c:C.tx2});
}

function note4(){
  const K = CASES[S4.k];
  $('s4a').textContent = K.ind ? '报警' : '不响';
  $('s4b').textContent = K.con ? '亮' : '不亮';
  $('s4c').textContent = K.hot ? '带电' : '不带电';
  $('n3').innerHTML = '<div class="st' + (S4.k ? ' bad' : ' good') + '">' + K.st + '</div>' +
    K.b + '<div class="tip' + (S4.k ? '' : ' info') + '" style="margin-top:8px">' + K.tip + '</div>';
}

document.getElementById('s4k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S4.k = +b.dataset.k;
  document.querySelectorAll('#s4k .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S4.k);
  });
  note4(); draw4();
});

/* ================================================================
   绑定
   ================================================================ */
function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会清空画布。场景 1 在 rAF 里每帧重画，静态的这三屏必须补画，
     否则第一次进来是空白（切页签也会再触发一次 fitAll，同样要补） */
  draw2(); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:3, sec:'3.5'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('3.5');
  let h = '';
  h += nb.prev ? '<a href="'+nb.prev.f+'">‹ '+nb.prev.id+' '+nb.prev.t+'</a>'
               : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next ? '<a class="next" href="'+nb.next.f+'">'+nb.next.id+' '+nb.next.t+' ›</a>'
               : '<span>3.6 万用表还没做</span>';
  $('pager').innerHTML = h;
})();

loop(function(dt){
  if(cur === 0) draw1(dt);
});
  }
});
})();
