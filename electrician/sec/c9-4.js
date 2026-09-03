/* 9.4 故障怎么缩小范围 —— 本节内容的唯一真相。
   对应《零基础学电工》第 9 章 9.3.1、9.3.2 节（书内 P174~P176）。

   四屏：① 交流：五步排查链 ② 交流：四种现象对照表 ③ 直流：多出来的那一步
        ④ 排查的通用原则

   数字与说法的出处（书上原文，别凭记忆改）：

   - 9.3 开头：「当电动机控制电路出现异常时，会影响到电动机的工作，
     **检修调试之前，先要做好电路的故障分析，为检修调试做好铺垫**」
   - 9.3.1：「当交流电动机控制电路出现故障时，**可以通过故障现象分析整个控制电路**，
     **缩小故障范围，锁定故障器件**」

   - **图 9-18 的五步（交流，原文照录）**：
     ① **检查 AC380V 供电电压是否正常，若无，则应检查电源供电线路**
     ② **检查电源总开关，看能否对线路的通、断进行控制，若损坏，则应更换**
     ③ **检查起动和停止按钮是否正常，若损坏，应更换**
     ④ **检查交流接触器的线圈及触头，看能否正常动作和控制，若损坏，应更换**
     ⑤ **检查电动机的连接是否良好，电动机本身是否损坏，若损坏，应更换**

   - **交流电动机控制线路的常见故障分析表（图 9-18 续，原文照录）**：
     | 通电跳闸 | 闭合总开关后跳闸；按下起动按钮后跳闸
       | 电路中存在短路性故障；热保护继电器或电动机短路、绕组间短路 |
     | 电动机不起动 | 按下起动按钮后电动机不起动；电动机通电不起动并伴有"嗡嗡"声
       | 电源供电异常、电动机损坏、接线松脱（至少有两相）、控制器件损坏、保护器件损坏；
         电源供电异常、电动机损坏、接线松脱（一相）、控制器件损坏、保护器件损坏 |
     | 运行停机 | 运行过程中无故停机，热保护断开
       | 熔断器熔断、控制器件损坏、保护器件损坏；电流异常、过热保护继电器损坏、负载过大 |
     | 电动机过热 | 电动机运行正常，但温度过高 | 电流异常、负载过大 |

   - **图 9-19 的六步（直流）**：前五步和交流基本一样（供电电压 → 熔断器 →
     按钮开关 → 直流接触器的线圈及触点 → 电动机），
     **多出来的第 ⑥ 步：若电动机转速没有提升，则应检查时间继电器**

   - **直流电动机控制线路的常见故障分析表（图 9-19 续，原文照录）**：
     | 电动机不起动 | 按下起动按钮后，电动机不起动；电动机通电不起动并伴有"嗡嗡"声
       | 电源供电异常、电动机损坏、接线松脱（至少有两相）、控制器件损坏、保护器件损坏；
         电动机损坏、起动电流过小、线路电压过低 |
     | 电动机转速异常 | 转速过快、过慢或不稳定
       | 接线松脱、接线错误、电动机损坏、电源电压异常 |
     | 电动机过热 | 电动机运行正常，温度过高 | 电流异常、负载过大、电动机损坏 |
     | 电动机异常振动 | 电动机运行时，振动频繁或过大 | 电动机损坏、安装不稳 |
     | 电动机漏电 | 电动机停机或运行时，外壳带电
       | 引出线碰壳、绝缘电阻下降、绝缘层老化 |

   **「嗡嗡声」那一条是全表最值钱的**（书上两处都写了，交流直流都有）：
   交流那张表里，「不起动」和「不起动并伴有嗡嗡声」被列成**两种不同的现象**，
   原因也不同 —— 前者是**至少有两相**接线松脱，后者是**一相**。
   这条区分现场极其有用：**有嗡嗡声说明定子还有磁场（缺一相），
   完全没声音说明彻底没通电（缺两相或更多）**。*/
(function(){
'use strict';
ELEC.reg({
  id: '9.4',
  file: 'c9-4.html',
  title: '9.4 故障怎么缩小范围',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>五步排查</button>
    <button class="tab" data-i="1"><span class="n">2</span>四种现象</button>
    <button class="tab" data-i="2"><span class="n">3</span>嗡嗡声</button>
    <button class="tab" data-i="3"><span class="n">4</span>直流那一套</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">顺着电走一遍，走到哪儿断了就是哪儿</div>
    书上图 9-18 给了五步，<b>顺序就是电流从电源到电动机的顺序</b>。
    每一步只问一件事：<b>电到这儿了吗？这个器件能不能正常动作？</b>
    <b>点「下一步」走一遍。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns">
        <button class="btn" id="s1p">‹ 上一步</button>
        <button class="btn go" id="s1n">下一步 ›</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">第几步</div><div class="v" id="s1a">1 / 5</div></div>
        <div class="num"><div class="k">查什么</div><div class="v" id="s1b">供电电压</div></div>
        <div class="num hi"><div class="k">坏了<br>怎么办</div><div class="v" id="s1c">查供电线路</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">图 9-18 的五步（书上原文照录）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>步</th><th>书上写的</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">①</td><td>检查 <b>AC380V 供电电压</b>是否正常，
          <b>若无，则应检查电源供电线路</b></td></tr>
        <tr><td class="eu-s">②</td><td>检查<b>电源总开关</b>，
          看<b>能否对线路的通、断进行控制</b>，若损坏，则应更换</td></tr>
        <tr><td class="eu-s">③</td><td>检查<b>起动和停止按钮</b>是否正常，若损坏，应更换</td></tr>
        <tr><td class="eu-s">④</td><td>检查<b>交流接触器的线圈及触头</b>，
          看<b>能否正常动作和控制</b>，若损坏，应更换</td></tr>
        <tr><td class="eu-s">⑤</td><td>检查<b>电动机的连接是否良好，电动机本身是否损坏</b>，
          若损坏，应更换</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>注意第 ② 步问的不是「它坏没坏」，是「能不能对线路的通、断进行控制」。</b>
      <span class="sub">开关有两种坏法：<b>合上去不通</b>（触点烧蚀、接触不良），
      和<b>断开了还通</b>（触点粘连）。后一种更危险 ——
      你以为断电了，实际上还带着电。
      <hr>所以这一步要<b>合、断各试一次</b>，两个状态都对才算好。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">这五步和 8.4 那五步是同一个套路</div>
    8.4 讲低压配电检修时也是五步：同级线路 → 电能表输出 → 配电箱输出 →
    总断路器 → 进配电盘的线路。
    <div class="tip info">
      <b>共同点：都是「顺着电流的方向，一级一级往下走」。</b>
      <span class="sub">每一步的问法都一样：<b>这一级正常吗？正常就往下一级。</b>
      <hr>不同的是<b>这一章多了「控制回路」这一层</b>：
      配电只有一条路（电源 → 负载），而电动机控制有两条
      （主电路 ＋ 控制回路），<b>而且控制回路才是出问题最多的地方</b>——
      按钮、接触器线圈、辅助触点，全在那儿。</span>
    </div>
  </div>
</section>

<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">四种现象，各指向不同的一组原因</div>
    书上那张表把交流电动机控制线路的常见故障归成四种现象。
    <b>先看现象，再查对应的那一组</b> —— 这比从头到尾查一遍快得多。
    <b>点一种现象。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">通电跳闸</button>
        <button class="btn sm" data-k="1">不起动</button>
        <button class="btn sm" data-k="2">运行停机</button>
        <button class="btn sm" data-k="3">电动机过热</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">现象</div><div class="v" id="s2a">通电跳闸</div></div>
        <div class="num"><div class="k">先怀疑</div><div class="v" id="s2b">短路</div></div>
        <div class="num hi"><div class="k">危险<br>程度</div><div class="v" id="s2c">高</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">常见故障分析表（书上原文照录）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>现象</th><th>具体表现</th><th>可能的原因</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">通电<br>跳闸</td>
          <td>闭合总开关后跳闸<hr>按下起动按钮后跳闸</td>
          <td>电路中存在<b>短路性故障</b><hr>热保护继电器或电动机短路、<b>绕组间短路</b></td></tr>
        <tr><td class="eu-s">电动机<br>不起动</td>
          <td>按下起动按钮后电动机不起动<hr>电动机通电不起动<b>并伴有"嗡嗡"声</b></td>
          <td>电源供电异常、电动机损坏、<b>接线松脱（至少有两相）</b>、
            控制器件损坏、保护器件损坏<hr>电源供电异常、电动机损坏、
            <b>接线松脱（一相）</b>、控制器件损坏、保护器件损坏</td></tr>
        <tr><td class="eu-s">运行<br>停机</td>
          <td>运行过程中无故停机<hr>热保护断开</td>
          <td>熔断器熔断、控制器件损坏、保护器件损坏<hr>电流异常、
            过热保护继电器损坏、<b>负载过大</b></td></tr>
        <tr><td class="eu-s">电动机<br>过热</td>
          <td>电动机运行正常，但温度过高</td>
          <td>电流异常、<b>负载过大</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>「通电跳闸」是四种里唯一不能反复试的。</b>
      <span class="sub">跳闸说明电路里有短路性故障，<b>每合一次闸就是让短路电流再过一次</b>——
      触点、导线、电动机绕组都在受损伤。
      <hr>正确做法是<b>断电之后用万用表查</b>：量绕组之间、绕组对地的绝缘
      （9.5 屏 3 那个案例走的就是这条路）。</span>
    </div>
  </div>
</section>

<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">有没有「嗡嗡声」，差着一整相</div>
    书上把「不起动」拆成两条列在表里：<b>不起动</b>，和<b>不起动并伴有"嗡嗡"声</b>。
    原因栏里那半句括号是关键：<b>一条写「至少有两相」，另一条写「一相」</b>。
    <b>点两种情况对比。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">正常：三相都通</button>
        <button class="btn sm" data-k="1">缺一相：嗡嗡响</button>
        <button class="btn sm" data-k="2">缺两相：没声音</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">通着几相</div><div class="v" id="s3a">3</div></div>
        <div class="num"><div class="k">有没有<br>声音</div><div class="v" id="s3b">正常运转</div></div>
        <div class="num hi"><div class="k">转不转</div><div class="v" id="s3c">转</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">缺一相比完全不通电更危险</div>
    完全不通电，电动机是<b>凉的</b>；缺一相时它<b>通着电、发着热、却不转</b> ——
    堵转电流是额定的好几倍，<b>绕组几分钟就能烧掉</b>。
    <div class="tip">
      <b>所以听到「嗡嗡声」要立刻断电，不能让它继续响着。</b>
      <span class="sub">现场判断很简单：<b>按下起动，如果有嗡嗡声但轴不转，
      马上按停止</b>，然后去量三相电压／三相绕组电阻。
      <hr>2.7 那节讲过量法：<b>三相绕组电阻要平衡</b>
      （书上实测三相都是 4.33 Ω）；哪一相偏大或无穷大，问题就在那一相。
      <hr>热继电器本该保护这种情况，但它有个<b>动作时间</b>
      （2.3 讲过：1.5 倍额定要 1.8 分钟）——
      在它动作之前，绕组已经热了很久了。</span>
    </div>
  </div>
</section>

<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">直流那一套，多一步、多两种现象</div>
    直流电动机控制电路的排查流程跟交流基本一样，
    但<b>末尾多了第 ⑥ 步</b>，故障表里也<b>多了两种交流那边没有的现象</b>。
    <b>点看多出来的是什么。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">第 ⑥ 步</button>
        <button class="btn sm" data-k="1">转速</button>
        <button class="btn sm" data-k="2">振动</button>
        <button class="btn sm" data-k="3">漏电</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这一条</div><div class="v" id="s4a">第 ⑥ 步</div></div>
        <div class="num"><div class="k">交流那边<br>有没有</div><div class="v" id="s4b">没有</div></div>
        <div class="num hi"><div class="k">查谁</div><div class="v" id="s4c">时间继电器</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">直流的常见故障分析表（书上原文照录）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>现象</th><th>可能的原因</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">电动机<br>不起动</td>
          <td>电源供电异常、电动机损坏、接线松脱（至少有两相）、控制器件损坏、
            保护器件损坏<hr>电动机损坏、<b>起动电流过小</b>、<b>线路电压过低</b></td></tr>
        <tr><td class="eu-s rd">转速<br>异常</td>
          <td>转速过快、过慢或不稳定：<b>接线松脱、接线错误、电动机损坏、电源电压异常</b></td></tr>
        <tr><td class="eu-s">电动机<br>过热</td>
          <td>电流异常、负载过大、电动机损坏</td></tr>
        <tr><td class="eu-s rd">异常<br>振动</td>
          <td>振动频繁或过大：<b>电动机损坏、安装不稳</b></td></tr>
        <tr><td class="eu-s rd">电动机<br>漏电</td>
          <td>停机或运行时外壳带电：<b>引出线碰壳、绝缘电阻下降、绝缘层老化</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>红色标的三种是交流那张表里没有的。</b>
      <span class="sub">其中<b>「电动机漏电」这一条对任何电动机都成立</b> ——
      书上把它列在直流表里，但引出线碰壳、绝缘电阻下降、绝缘层老化
      这三个原因跟交直流没关系。
      <hr>查法 2.7 和 5.6 都讲过：<b>用绝缘电阻表量绕组对地，
      低压设备判据 ≥ 0.5 MΩ</b>。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="9.4">
    <div class="qz" data-q="书上图 9-18 那五步排查，第二步「检查电源总开关」要看的是什么？"
      data-opts="看它有没有烧黑|看它能否对线路的通、断进行控制——合、断各试一次，两个状态都对才算好|看它的额定电流够不够"
      data-right="1"
      data-why="书上原话：检查电源总开关，看能否对线路的通、断进行控制，若损坏，则应更换。开关有两种坏法：合上去不通（触点烧蚀），和断开了还通（触点粘连）。后一种更危险——你以为断电了，实际上还带着电。所以要合、断各试一次。"></div>
    <div class="qz" data-q="电动机通电不起动，并伴有「嗡嗡」声。按书上那张表，最该怀疑什么？"
      data-opts="接线松脱（至少有两相）|接线松脱（一相）——有声音说明定子还有磁场，只是缺了一相|电源完全没电"
      data-right="1"
      data-why="缺一相。书上把「不起动」和「不起动并伴有嗡嗡声」列成两条，原因栏里那半句括号正是区别：前者写「至少有两相」，后者写「一相」。有嗡嗡声说明定子还通着电、还有磁场，只是三相不平衡转不起来；完全没声音说明彻底没通电。这条区分现场极其有用。"></div>
    <div class="qz" data-q="听到电动机嗡嗡响但轴不转，为什么要立刻断电？"
      data-opts="声音吵|它通着电、发着热、却不转——堵转电流是额定的好几倍，绕组几分钟就能烧掉|怕吓到人"
      data-right="1"
      data-why="缺一相比完全不通电危险得多。完全不通电时电动机是凉的；缺一相时它通着电、堵转，电流是额定的好几倍，绕组几分钟就能烧。热继电器本该保护这种情况，但它有动作时间（1.5 倍额定要 1.8 分钟），在它动作之前绕组已经热了很久。所以听到嗡嗡声要马上按停止，再去量三相电压和三相绕组电阻。"></div>
    <div class="qz" data-q="直流电动机控制电路的排查流程，比交流那五步多了哪一步？"
      data-opts="多一步查熔断器|多第 ⑥ 步：若电动机转速没有提升，则应检查时间继电器|多一步查绝缘"
      data-right="1"
      data-why="书上图 9-19 的第 ⑥ 步：若电动机转速没有提升，则应检查时间继电器。因为直流那张图（9.1 屏 4）里有两级起动电阻，靠 KT1、KT2 按时间一级一级短掉。时间继电器不动作，电阻就一直串着，电动机转速上不来——现象是「能转但转不快」，而主电路和控制回路都是好的。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 9 章 9.3.1、9.3.2 节（书内 P174~P176）</div>
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

/* ================================================================
   场景 1：五步排查链
   ================================================================
   五级竖排，走到第几步就套 hot 环，**走过的画绿** —— 排查进度要看得见
   （和 8.4 屏 2 同一个路子，那边是配电、这边是电动机控制）*/
const STEP = [
  {n:'AC380V 供电电压', short:'供电电压', bad:'查供电线路',
   d:'书上第一步：<b>检查 AC380V 供电电压是否正常，若无，则应检查电源供电线路。</b>' +
     '<hr><b>先量电源，是所有排查的起点</b> —— 后面四步全建立在「电送到了」这个前提上。' +
     '<hr>怎么量：万用表交流 500V 档，<b>任意两相之间应该是 380V</b>' +
     '（3.6a 讲过为什么不能用 200V 档）。' +
     '三相之间两两量，<b>三个读数都要接近</b>；缺一相的话有一对会明显偏低。'},
  {n:'电源总开关', short:'总开关', bad:'更换',
   d:'书上第二步：<b>检查电源总开关，看能否对线路的通、断进行控制，若损坏，则应更换。</b>' +
     '<hr><b>注意问的不是「它坏没坏」，是「能不能控制通断」。</b>' +
     '开关有两种坏法：<b>合上去不通</b>（触点烧蚀、接触不良），' +
     '和<b>断开了还通</b>（触点粘连）。' +
     '<hr>后一种更危险 —— <b>你以为断电了，实际上还带着电</b>。' +
     '所以这一步要<b>合、断各试一次</b>，两个状态都对才算好。' +
     '<hr>量法 5.2 讲过：<b>断开时 ∞，闭合时 0 Ω</b>。'},
  {n:'起动和停止按钮', short:'按钮', bad:'更换',
   d:'书上第三步：<b>检查起动和停止按钮是否正常，若损坏，应更换。</b>' +
     '<hr>两个按钮的判据不一样，因为触点类型不同：' +
     '<b>起动按钮（动合）</b>—— 不按时 ∞，按下时 0 Ω；' +
     '<b>停止按钮（动断）</b>—— 不按时 0 Ω，按下时 ∞。' +
     '<hr><b>量之前必须断开它的接线引线</b>，' +
     '否则量到的是整个回路的通断（9.5 屏 1 那个案例里书上就是这么做的）。' +
     '<hr>按钮是控制回路里<b>动作次数最多的器件</b>，' +
     '一天按几十次、几年下来几万次，触点磨损是常事。'},
  {n:'接触器的线圈及触头', short:'接触器', bad:'更换',
   d:'书上第四步：<b>检查交流接触器的线圈及触头，看能否正常动作和控制，若损坏，应更换。</b>' +
     '<hr><b>「线圈」和「触头」是两件事，要分开查：</b>' +
     '<b>线圈</b> —— 量电阻（5.3 讲过实测约 <b>1.694 kΩ</b>），' +
     '或者直接量它两端有没有 380V；' +
     '<b>触头</b> —— 线圈得电吸合后，量主触头的进出线端。' +
     '<hr><b>最容易漏的一种坏法：线圈好、能吸合，但主触头接不通电。</b>' +
     '9.5 屏 1 那个真实案例查到最后就是这一种 ——' +
     '<b>听到"啪"的吸合声不代表触头通了</b>。' +
     '<hr>5.3 还给过一个不用接 380V 的办法：' +
     '<b>用手按住接触器上端强制吸合，再量触头</b>。'},
  {n:'电动机本身', short:'电动机', bad:'更换',
   d:'书上第五步：<b>检查电动机的连接是否良好，电动机本身是否损坏，若损坏，应更换。</b>' +
     '<hr><b>排在最后，是因为它最贵、最难换、拆开最费事。</b>' +
     '前四步把「电送不到」的可能全排除掉了，才轮到怀疑它。' +
     '<hr>查什么（2.7、5.6 都讲过）：' +
     '<b>接线盒里的连接片和端子有没有松</b>（这就是「连接是否良好」）；' +
     '<b>三相绕组电阻是否平衡</b>（书上实测三相都是 4.33 Ω）；' +
     '<b>绕组对地绝缘是否 ≥ 0.5 MΩ</b>。' +
     '<hr>9.5 屏 3 那个案例查的就是这一步。'}
];
const S1 = { i:0 };
const SY = [50, 90, 130, 170, 210];
function draw1(){
  const g = st1.g; st1.clear();
  const st = STEP[S1.i];
  EP.heading(g, 14, 20, '第 ' + (S1.i+1) + ' 步', st.n);

  STEP.forEach(function(s, i){
    const y = SY[i], done = i < S1.i, on = i === S1.i;
    box(g, 40, y - 15, 280, 30, 5,
        on ? C.accbg : (done ? C.okbg : C.box),
        on ? C.acc : (done ? C.ok : C.boxLine), on ? 1.8 : 1.2);
    g.save();
    g.fillStyle = on ? C.acc : (done ? C.ok : C.tx3); g.globalAlpha = .2;
    g.beginPath(); g.arc(58, y, 10, 0, Math.PI*2); g.fill(); g.restore();
    txt(g, done ? '✓' : String(i+1), 58, y,
        {sz:9.5, b:1, c: on ? C.acc : (done ? C.ok : C.tx3)});
    txt(g, s.n, 78, y, {sz:9.5, b:1, c: on ? C.tx : C.tx2, al:'left'});
    if(i < 4){
      seg(g, [[58, y + 15],[58, SY[i+1] - 15]], done ? C.ok : C.boxLine, 1.8);
      EC.head(g, 58, SY[i+1] - 15, 0, 1, 4.5, done ? C.ok : C.boxLine);
    }
    if(on) hot(g, 180, y, 0, {w:296, h:42, r:8});
  });

  conc(g, 238, S1.i === 4 ? 'ok' : 'acc',
    '查' + st.short + '　坏了就' + st.bad,
    S1.i === 4 ? '前四步都正常，才轮到怀疑电动机本身' : '这一级正常就往下一级走');
}
function note1(){
  const st = STEP[S1.i];
  $('s1a').textContent = (S1.i+1) + ' / 5';
  $('s1b').textContent = st.short;
  $('s1c').textContent = st.bad;
  $('n0').innerHTML = '<div class="st">第 ' + (S1.i+1) + ' 步：' + st.n + '</div>' + st.d;
  $('s1p').disabled = S1.i === 0;
  $('s1n').disabled = S1.i === 4;
}

/* ================================================================
   场景 2：四种现象
   ================================================================
   四张卡横排两行，选中的下面画出「它指向哪一组原因」*/
const S2 = { k:0 };
const SYM = [
  {n:'通电跳闸', first:'短路', risk:'高', kind:'err',
   show:'闭合总开关后跳闸／按下起动按钮后跳闸',
   why:'电路中存在<b>短路性故障</b>；热保护继电器或电动机短路、<b>绕组间短路</b>',
   d:'<b>这是四种里唯一不能反复试的。</b>' +
     '跳闸说明电路里有短路性故障，<b>每合一次闸就是让短路电流再过一次</b> ——' +
     '触点、导线、电动机绕组都在受损伤。' +
     '<hr><b>两种跳法指向不同的地方：</b>' +
     '<b>闭合总开关就跳</b> ⇒ 短路在主电路上（总开关之后到接触器之间）；' +
     '<b>按下起动按钮才跳</b> ⇒ 接触器一吸合才短路，' +
     '嫌疑在接触器主触头之后、包括电动机绕组。' +
     '<hr>正确做法是<b>断电之后用万用表查</b>：' +
     '量绕组之间、绕组对地的绝缘（9.5 屏 3 那个案例走的就是这条路）。'},
  {n:'不起动', first:'看有没有嗡嗡声', risk:'中', kind:'warn',
   show:'按下起动按钮后不起动／通电不起动并伴有"嗡嗡"声',
   why:'电源供电异常、电动机损坏、<b>接线松脱</b>、控制器件损坏、保护器件损坏',
   d:'书上把它拆成两条，<b>原因栏里那半句括号是关键</b>：' +
     '<b>不起动 → 接线松脱（至少有两相）</b>；' +
     '<b>不起动并伴有"嗡嗡"声 → 接线松脱（一相）</b>。' +
     '<hr>屏 3 整屏讲这一条。简单说：<b>有声音说明定子还有磁场（缺一相），' +
     '完全没声音说明彻底没通电（缺两相或更多）</b>。' +
     '<hr>这一种是五步排查的典型用例 —— 从供电电压查到电动机，' +
     '一步一步把范围缩下来。'},
  {n:'运行停机', first:'熔断器和热继电器', risk:'中', kind:'warn',
   show:'运行过程中无故停机／热保护断开',
   why:'熔断器熔断、控制器件损坏、保护器件损坏；<b>电流异常、过热保护继电器损坏、负载过大</b>',
   d:'<b>先分清是「无故停机」还是「热保护断开」</b> ——' +
     '书上把它们列成两行，原因也不同。' +
     '<hr><b>热保护断开</b>（热继电器跳了）：说明电流确实超了，' +
     '要查<b>负载是不是过大</b>（皮带太紧、被拖动设备卡住）、' +
     '或者<b>缺相运行</b>。' +
     '<b>直接把热继电器复位再开机是最坏的做法</b> ——' +
     '原因还在那儿，下次照跳，而且每跳一次绕组就多热一次。' +
     '<hr><b>无故停机</b>（热保护没动）：熔断器熔断、控制回路某个器件坏了。' +
     '9.1 屏 3 讲的<b>「两个指示灯都不亮」</b>在这儿是现成的线索。'},
  {n:'电动机过热', first:'电流和负载', risk:'中', kind:'warn',
   show:'电动机运行正常，但温度过高',
   why:'<b>电流异常、负载过大</b>',
   d:'注意书上给这一条的表现是<b>「运行正常，但温度过高」</b> ——' +
     '<b>它还在转，只是烫</b>。这跟前面三种不一样，' +
     '前三种都是「停了」或者「跳了」。' +
     '<hr>书上给的原因只有两个：<b>电流异常、负载过大</b>。' +
     '所以查法很直接：<b>先用钳形表量工作电流，跟铭牌上的额定电流比</b>。' +
     '<hr><b>电流正常但还是烫，说明问题不在电路上</b>——' +
     '9.5 屏 2 那个真实案例走的就是这条路：' +
     '钳形表量到 3.4 A 和铭牌一致，于是拆开电机查轴承，' +
     '最后发现是<b>轴承钢珠磨损、润滑脂干涸</b>。'}
];
function draw2(){
  const g = st2.g; st2.clear();
  const y0 = SYM[S2.k];
  EP.heading(g, 14, 20, '四种现象', '先看现象，再查对应的那一组');

  SYM.forEach(function(a, i){
    const cx = 96 + (i % 2) * 168, cy = 60 + Math.floor(i / 2) * 52;
    const on = i === S2.k;
    box(g, cx - 76, cy - 20, 152, 40, 6,
        on ? C[CONC[a.kind][0]] : C.box, on ? C[CONC[a.kind][1]] : C.boxLine,
        on ? 1.8 : 1.2);
    txt(g, a.n, cx, cy - 5, {sz:10, b:1, c: on ? C[CONC[a.kind][1]] : C.tx2});
    txt(g, '先怀疑　' + a.first, cx, cy + 10, {sz:7.5, c: on ? C.tx2 : C.tx3});
  });

  /* 选中的那一种：表现和原因 */
  const yy = 168;
  box(g, 20, yy, 320, 76, 6, C.box, C.boxLine, 1.2);
  txt(g, '具体表现', 34, yy + 16, {sz:8, b:1, c:C.tx3, al:'left'});
  txt(g, y0.show, 180, yy + 34, {sz:8.5, c:C.tx2});
  txt(g, '可能的原因', 34, yy + 54, {sz:8, b:1, c:C.tx3, al:'left'});
  txt(g, y0.why.replace(/<\/?b>/g, ''), 180, yy + 66, {sz:8, c:C.tx2});

  conc(g, 256, y0.kind, y0.n + '　先怀疑 ' + y0.first,
    S2.k === 0 ? '这一种不能反复合闸试 —— 每合一次短路电流就再过一次' :
      '书上那张表：先看现象，再查对应的那一组原因');
}
function note2(){
  const a = SYM[S2.k];
  $('s2a').textContent = a.n;
  $('s2b').textContent = a.first.length > 5 ? a.first.slice(0, 5) : a.first;
  $('s2c').textContent = a.risk;
  $('n1').innerHTML = '<div class="st' + (S2.k === 0 ? ' bad' : '') + '">' + a.n + '</div>' +
    '<b>书上写的表现：</b>' + a.show + '<br><b>可能的原因：</b>' + a.why + '<hr>' + a.d;
}

/* ================================================================
   场景 3：有没有嗡嗡声
   ================================================================
   三相定子画成三个绕组，缺相的那一相画灰。
   **转子转不转、有没有声音、烫不烫，三样一起显示** */
const S3 = { k:0 };
function draw3(){
  const g = st3.g; st3.clear();
  const k = S3.k;
  const live = [true, true, true];
  if(k >= 1) live[2] = false;
  if(k >= 2) live[1] = false;
  EP.heading(g, 14, 20,
    ['三相都通','缺一相','缺两相'][k],
    ['正常运转','嗡嗡响，转不动','没声音，凉的'][k]);

  /* 三相进线 */
  const LX = [70, 100, 130];
  ['L1','L2','L3'].forEach(function(n, i){
    const on = live[i];
    seg(g, [[LX[i], 46],[LX[i], 96]], on ? C.L : C.tx3, on ? 2.4 : 1.4);
    txt(g, n, LX[i], 38, {sz:8, b:1, c: on ? C.tx2 : C.tx3});
    if(!on){
      g.save(); g.strokeStyle = C.err; g.lineWidth = 2.2; g.lineCap = 'round';
      g.beginPath();
      g.moveTo(LX[i] - 6, 62); g.lineTo(LX[i] + 6, 74);
      g.moveTo(LX[i] + 6, 62); g.lineTo(LX[i] - 6, 74);
      g.stroke(); g.restore();
    }
  });

  /* 定子：一个大圆 + 三个绕组 */
  const cx = 100, cy = 146, R = 44;
  g.save(); g.strokeStyle = P.ink; g.lineWidth = 1.8;
  g.beginPath(); g.arc(cx, cy, R, 0, Math.PI*2); g.stroke(); g.restore();
  [0, 1, 2].forEach(function(i){
    const a = -Math.PI/2 + i * Math.PI*2/3;
    const wx = cx + Math.cos(a) * (R - 14), wy = cy + Math.sin(a) * (R - 14);
    g.save();
    g.strokeStyle = live[i] ? C.L : C.tx3; g.lineWidth = live[i] ? 3.2 : 2;
    g.beginPath(); g.arc(wx, wy, 9, 0, Math.PI*2); g.stroke(); g.restore();
    seg(g, [[LX[i], 96],[LX[i], 106],[wx, wy - 12]], live[i] ? C.L : C.tx3,
        live[i] ? 1.8 : 1.2);
  });
  /* 转子 */
  const spin = k === 0;
  g.save();
  g.fillStyle = spin ? C.okbg : (k === 1 ? C.errbg : C.box);
  g.strokeStyle = spin ? C.ok : (k === 1 ? C.err : C.tx3); g.lineWidth = 1.8;
  g.beginPath(); g.arc(cx, cy, 16, 0, Math.PI*2); g.fill(); g.stroke(); g.restore();
  if(spin){
    /* 转动箭头 */
    g.save(); g.strokeStyle = C.ok; g.lineWidth = 2;
    g.beginPath(); g.arc(cx, cy, 24, -0.9, 0.9); g.stroke(); g.restore();
    EC.head(g, cx + Math.cos(0.9)*24, cy + Math.sin(0.9)*24, -0.78, 0.62, 5.5, C.ok);
  }
  txt(g, spin ? '转' : '不转', cx, cy, {sz:9, b:1, c: spin ? C.ok : C.tx3});

  /* 右边三个状态 */
  const RX = 250;
  [['转不转', spin ? '转' : '不转', spin ? C.ok : C.err],
   ['有没有声音', k === 1 ? '嗡嗡响' : (k === 0 ? '正常运转声' : '没声音'),
     k === 1 ? C.err : C.tx2],
   ['烫不烫', k === 1 ? '几分钟就烧' : (k === 0 ? '正常' : '凉的'),
     k === 1 ? C.err : C.ok]].forEach(function(a, i){
    const y = 92 + i*44;
    box(g, RX - 74, y - 17, 148, 34, 5, C.box, C.boxLine, 1.1);
    txt(g, a[0], RX - 64, y - 4, {sz:7.5, c:C.tx3, al:'left'});
    txt(g, a[1], RX, y + 10, {sz:10, b:1, c:a[2]});
  });

  const CC = [
    ['ok',  '三相都通 —— 正常运转', '定子磁场旋转，转子跟着转（2.7 讲过转差）'],
    ['err', '缺一相：嗡嗡响，转不动', '书上：接线松脱（一相）　⇒ 立刻断电'],
    ['warn','缺两相：完全没声音', '书上：接线松脱（至少有两相）　⇒ 电动机是凉的']
  ][k];
  conc(g, 236, CC[0], CC[1], CC[2]);
}
function note3(){
  const k = S3.k;
  $('s3a').textContent = [3, 2, 1][k];
  $('s3b').textContent = ['正常运转', '嗡嗡响', '没声音'][k];
  $('s3c').textContent = ['转', '不转', '不转'][k];
  const T = [
    ['三相都通：正常',
     '三相电流在定子里造出一个<b>旋转磁场</b>，转子跟着它转（2.7 屏 1 那个动画）。' +
     '<hr>这一档是参照系 —— 下面两档要跟它比。'],
    ['缺一相：嗡嗡响，而且几分钟就能烧',
     '书上表里这一条写的是：<b>电动机通电不起动并伴有"嗡嗡"声</b>，' +
     '原因栏里那半句括号是<b>「接线松脱（一相）」</b>。' +
     '<hr><b>为什么会响：还有两相通着电，定子里还有磁场</b> ——' +
     '只是这个磁场不再旋转（三相少了一相就转不起来了），' +
     '而是在原地脉动。<b>脉动的磁场让铁芯以 50Hz 振动，这就是那个嗡嗡声。</b>' +
     '<hr><b>为什么危险：它通着电、发着热、却不转。</b>' +
     '转子不转 ⇒ 没有反电动势 ⇒ <b>电流是额定的好几倍</b>（堵转电流），' +
     '而这些电流全变成了热，<b>绕组几分钟就能烧掉</b>。' +
     '<hr><b>热继电器保护不了这一下</b>：它有动作时间（2.3 讲过，' +
     '1.5 倍额定要 1.8 分钟），在它动作之前绕组已经热了很久。' +
     '<hr><b>所以听到嗡嗡声要立刻按停止</b>，然后量三相电压和三相绕组电阻' +
     '（2.7 讲过：三相绕组电阻要平衡，书上实测都是 4.33 Ω）。'],
    ['缺两相：完全没声音，电动机是凉的',
     '书上表里这一条是<b>「按下起动按钮后电动机不起动」</b>（没提声音），' +
     '原因栏里写的是<b>「接线松脱（至少有两相）」</b>。' +
     '<hr>缺两相之后<b>定子里根本形不成回路</b>，没有电流、没有磁场、也没有振动 ——' +
     '所以既不转也没声音，而且<b>电动机是凉的</b>。' +
     '<hr><b>反过来说：摸一下电动机烫不烫，就能大致分出是哪一种。</b>' +
     '烫的（或者刚才响过）⇒ 缺一相；凉的 ⇒ 彻底没通电。' +
     '<hr>危险程度上<b>这一档反而比缺一相安全</b> ——' +
     '不通电就不发热，你有时间慢慢查。']
  ][k];
  $('n2').innerHTML = '<div class="st' + (k === 1 ? ' bad' : '') + '">' + T[0] + '</div>' + T[1];
}

/* ================================================================
   场景 4：直流那一套多出来的
   ================================================================ */
const S4 = { k:0 };
const DC = [
  {n:'第 ⑥ 步', has:'没有', who:'时间继电器',
   t:'若电动机转速没有提升，则应检查时间继电器',
   d:'书上图 9-19 在交流那五步之后多了这一条：' +
     '<b>若电动机转速没有提升，则应检查时间继电器。</b>' +
     '<hr><b>为什么直流那边多这一步</b>：9.1 屏 4 讲过，' +
     '直流控制电路里有<b>两级起动电阻 R1、R2</b>，' +
     '靠 <b>KT1、KT2 两只时间继电器按时间一级一级短掉</b>。' +
     '<hr>时间继电器不动作，电阻就一直串在回路里 ——' +
     '现象是<b>「能转，但转不快」</b>，' +
     '而主电路和控制回路查下来都是好的。' +
     '<hr><b>这是一种「五步全过、故障还在」的情况</b>，' +
     '所以书上专门把它列成第 ⑥ 步。'},
  {n:'转速异常', has:'没有', who:'接线和电源',
   t:'转速过快、过慢或不稳定',
   d:'书上给的原因：<b>接线松脱、接线错误、电动机损坏、电源电压异常。</b>' +
     '<hr><b>交流那张表里没有这一条</b>，因为交流异步电动机的转速' +
     '基本由<b>电源频率和极数</b>定死了（2.7 讲的 n₀ = 60f/p），' +
     '除了转差率会随负载小幅变化，<b>转速本身是没法「异常」的</b>。' +
     '<hr>直流电动机不一样：<b>它的转速跟电枢电压、励磁电流都有关</b>，' +
     '任何一个变了转速就变。所以接线错、电压不稳都会直接表现成转速问题。' +
     '<hr>「不稳定」这一条还要多想一层：<b>电刷和换向器接触不良</b>' +
     '也会造成转速忽快忽慢 —— 那是直流电动机独有的部件。'},
  {n:'异常振动', has:'没有', who:'安装不稳',
   t:'电动机运行时，振动频繁或过大',
   d:'书上给的原因只有两个：<b>电动机损坏、安装不稳。</b>' +
     '<hr><b>「安装不稳」正好接上 9.2 那两节没做的内容</b>' +
     '（电动机与被拖动设备的安装连接、固定）：' +
     '地脚螺栓没拧紧、垫片没垫平、联轴器没对中、底板没固定牢，' +
     '<b>都会表现成运行时振动</b>。' +
     '<hr>那两节全是手上的活网页教不了，' +
     '但<b>「振动 ⇒ 先查安装」这个判断是能记住的</b>。' +
     '<hr>「电动机损坏」那一半：轴承磨损、转子不平衡、' +
     '转轴弯曲 —— 9.5 屏 2 那个案例讲的就是轴承。'},
  {n:'电动机漏电', has:'表上没有<br>但同样成立', who:'绝缘',
   t:'电动机停机或运行时，外壳带电',
   d:'书上给的原因：<b>引出线碰壳、绝缘电阻下降、绝缘层老化。</b>' +
     '<hr><b>这一条书上列在直流表里，但它跟交直流没关系</b> ——' +
     '任何电动机都可能漏电，原因也是这三个。' +
     '<hr><b>查法 2.7 和 5.6 都讲过</b>：用绝缘电阻表量<b>绕组对地</b>，' +
     '低压设备的判据是<b>≥ 0.5 MΩ</b>。' +
     '量绕组之间的绝缘时，<b>必须先取下接线盒里的连接片</b>' +
     '（5.6 那条，否则量的是一根导线）。' +
     '<hr><b>外壳带电最直接的防线是接地和漏电保护</b>' +
     '（9.2 屏 4 那六种保护里的两种）—— ' +
     '8.2 屏 2 讲的 N 和 PE 混接会让后者彻底失效。'}
];
function draw4(){
  const g = st4.g; st4.clear();
  const d = DC[S4.k];
  EP.heading(g, 14, 20, '直流那一套', '多一步、多三种现象');

  /* 六步链，第六步高亮 */
  const y0 = 52;
  ['供电电压','熔断器','按钮开关','接触器','电动机','时间继电器'].forEach(function(n, i){
    const on = (S4.k === 0 && i === 5);
    const extra = i === 5;
    box(g, 26, y0 + i*26 - 10, 150, 21, 4,
        on ? C.accbg : C.box, on ? C.acc : (extra ? C.warn : C.boxLine), on ? 1.8 : 1.1);
    txt(g, (i+1) + '. ' + n, 36, y0 + i*26, {sz:8, b:1,
        c: on ? C.acc : (extra ? C.warn : C.tx3), al:'left'});
  });

  /* 右边：多出来的三种现象 */
  ['转速异常', '异常振动', '电动机漏电'].forEach(function(n, i){
    const on = S4.k === i + 1;
    box(g, 196, y0 + i*44 - 14, 148, 34, 5,
        on ? C.accbg : C.box, on ? C.acc : C.boxLine, on ? 1.8 : 1.1);
    txt(g, n, 270, y0 + i*44 + 2, {sz:9.5, b:1, c: on ? C.acc : C.tx2});
  });
  txt(g, '交流那张表里没有的', 270, y0 + 3*44 - 6, {sz:7.5, c:C.tx3});

  conc(g, 200, 'acc', d.n + '　' + d.t.slice(0, 18),
    S4.k === 0 ? '直流那边有两级起动电阻，靠时间继电器一级一级短掉' :
      '书上：' + ['','接线松脱、接线错误、电动机损坏、电源电压异常',
        '电动机损坏、安装不稳', '引出线碰壳、绝缘电阻下降、绝缘层老化'][S4.k]);
}
function note4(){
  const d = DC[S4.k];
  $('s4a').textContent = d.n.replace(/<br>/g, '');
  $('s4b').innerHTML = d.has;
  $('s4c').textContent = d.who;
  $('n3').innerHTML = '<div class="st">' + d.n.replace(/<br>/g, '') + '　·　' + d.t + '</div>' + d.d;
}

/* ================================================================
   舞台、事件、收尾
   ================================================================ */
const st1 = new Stage('cv0', 360, 286);
const st2 = new Stage('cv1', 360, 304);
const st3 = new Stage('cv2', 360, 284);
const st4 = new Stage('cv3', 360, 248);

document.getElementById('s1p').addEventListener('click', function(){
  if(S1.i > 0){ S1.i--; note1(); draw1(); }
});
document.getElementById('s1n').addEventListener('click', function(){
  if(S1.i < 4){ S1.i++; note1(); draw1(); }
});
st1.cv.addEventListener('click', function(ev){
  const p = st1.pick(ev);
  SY.forEach(function(y, i){ if(Math.abs(p[1] - y) < 16) S1.i = i; });
  note1(); draw1();
});
['s2k','s3k','s4k'].forEach(function(id, n){
  document.getElementById(id).addEventListener('click', function(e){
    const b = e.target.closest('.btn'); if(!b) return;
    const v = +b.dataset.k;
    [S2, S3, S4][n].k = v;
    document.querySelectorAll('#' + id + ' .btn').forEach(function(x){
      x.classList.toggle('on', +x.dataset.k === v);
    });
    [note2, note3, note4][n]();
    [draw2, draw3, draw4][n]();
  });
});

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会重设尺寸并清空。**四屏全是静态的，必须在这儿逐个补画** */
  draw1(); draw2(); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:9, sec:'9.4'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('9.4');
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
