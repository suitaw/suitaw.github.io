/* 5.5 变压器的检测 —— 本节内容的唯一真相。
   对应《零基础学电工》第 5 章 5.5 节（书内 P87~P89）。

   四屏：① 先选对表 ② 量绝缘电阻 ③ 量绕组阻值 ④ 量输入输出电压

   **和 3.8 节的分工**：3.8 讲的是「绝缘电阻表这台仪表本身怎么用」
   （怎么接、怎么摇、测完必须放电）；这一节讲的是「测变压器要测哪三处、
   按什么电压等级选表、三相不平衡怎么算」。两节配着看，不重复。

   数字口径（书上原文与原表，别凭记忆改）：
   - **表 5-1 绝缘电阻表规格**（书 P88）：
     100 V 以下 → 250 V 表、50 MΩ 及以上；100~500 V → 500 V 表、100 MΩ 及以上；
     500~3000 V → 1000 V 表、2000 MΩ 及以上；3000~10000 V → 2500 V 表、10000 MΩ 及以上；
     10000 V 及以上 → 5000 V 表、10000 MΩ 及以上
   - 摇速 **120 r/min**，读 **15 s 和 1 min** 两个读数（书 P87）
   - 测前要断开电源、拆除外接电缆，用绝缘棒对变压器**充分放电（约 5 min）**（书 P88）
   - 测试线**必须用单股线分开独立连接**，不得用双股绝缘线或绞线（书 P88）
   - **收尾顺序**：先把「电路」端试验引线与测试桩头分开，**再降低摇速** ——
     反过来会烧坏绕组（书 P88）
   - 三相不平衡度 **ΔR% = [(Rmax − Rmin) / Rp] × 100%**，
     其中 **Rp = (Rmax + Rmin + Rc) / 3**（书 P89）
   - 温度换算到 20 ℃：**R20 = Rt · K，K = (T + 20)/(T + t)**，
     常数 T：**铜导线 234.5、铝导线 225**（书 P89）
   - 书上直流电桥实测三相绕组均为 **0.433 × 10 Ω ≈ 4.33 Ω**（图 5-20）
   - 电源变压器铭牌：**输入 220 V 50 Hz（红），输出 蓝 22 V、黄 12 V**；
     实测输入 **220.3 V**，属于正常范围（书 P89 图 5-16）

   **不平衡度的限值书上没给**，所以课文里只给公式和「三相应基本相等、差得越小越好」，
   不编一个限值出来 —— 具体限值要看那台设备的技术条件。 */
(function(){
'use strict';
ELEC.reg({
  id: '5.5',
  file: 'c5-5.html',
  title: '5.5 变压器的检测',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>先选对表</button>
    <button class="tab" data-i="1"><span class="n">2</span>量绝缘</button>
    <button class="tab" data-i="2"><span class="n">3</span>量绕组</button>
    <button class="tab" data-i="3"><span class="n">4</span>量电压</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">量绝缘之前，先按电压等级选表</div>
    绝缘电阻表有 250 V、500 V、1000 V、2500 V、5000 V 好几种规格。
    <b>选高了会把好绝缘击穿，选低了考不出问题</b>（3.8 节讲过）。
    书上给了一张对照表，<b>按被测设备和回路的电压等级选</b>。
    <b>切一个电压等级看该用哪一种。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">100 V 以下</button>
        <button class="btn sm" data-k="1">100~500 V</button>
        <button class="btn sm" data-k="2">500~3000 V</button>
        <button class="btn sm" data-k="3">3000~10 kV</button>
        <button class="btn sm" data-k="4">10 kV 及以上</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">设备电压</div><div class="v" id="s1a">100 V 以下</div></div>
        <div class="num"><div class="k">选这种表</div><div class="v" id="s1b">250 V</div></div>
        <div class="num hi"><div class="k">量程要求</div><div class="v" id="s1c">50 MΩ 以上</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">表 5-1　不同电气设备及回路的电压等级应选择的绝缘电阻表规格</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>设备及回路电压</th><th>绝缘电阻表</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">100 V 以下</td><td>250 V，50 MΩ 及以上</td></tr>
        <tr><td class="eu-s">100~500 V</td><td><b>500 V，100 MΩ 及以上</b></td></tr>
        <tr><td class="eu-s">500~3000 V</td><td>1000 V，2000 MΩ 及以上</td></tr>
        <tr><td class="eu-s">3000~10000 V</td><td>2500 V，10000 MΩ 及以上</td></tr>
        <tr><td class="eu-s">10000 V 及以上</td><td>5000 V，10000 MΩ 及以上</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>低压电工天天碰的是第二行</b>：380 V / 220 V 的设备和线路，
      用 <b>500 V 的绝缘电阻表</b>，判据 <b>≥ 0.5 MΩ</b>（3.8 节那个要背下来的数）。
      <span class="sub">表里那个「100 MΩ 及以上」说的是<b>表本身的量程</b>要够，
      不是判据 —— 两回事，别混。</span>
    </div>
  </div>

  <div class="bet" data-bet="c55-pick" data-q="要测一台 380V 的电动机对地绝缘，该用哪种绝缘电阻表？"
       data-opts="250 V 的，电压低更安全|500 V 的——380 V 落在「100~500 V」那一档|2500 V 的，越高越保险" data-right="1"
       data-after="500 V 的。380 V 落在表 5-1 的「100~500V」那一档，对应 500V 绝缘电阻表。选 250V 的话试验电压不够，考不出真实的绝缘状况；选 2500V 的话可能把本来还能用的绝缘直接击穿——那就是人为制造故障了。"></div>
</section>

<!-- ================= 场景 2：量绝缘 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">一台变压器要量三个地方</div>
    不是量一次就完了。三相变压器的绝缘电阻分三部分测：
    <b>低压绕组对外壳、高压绕组对外壳、高压绕组对低压绕组。</b>
    <b>点一处看接线怎么接。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">低压对外壳</button>
        <button class="btn sm" data-k="1">高压对外壳</button>
        <button class="btn sm" data-k="2">高压对低压</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">L 线路端</div><div class="v" id="s2a">低压绕组</div></div>
        <div class="num"><div class="k">E 接地端</div><div class="v" id="s2b">外壳</div></div>
        <div class="num hi"><div class="k">读数</div><div class="v" id="s2c">1500 MΩ</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">测之前和测之后，各有一套必须做的事</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>做什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">测之前</td><td>断开电源 → 拆除或断开外接电缆 →
          <b>用绝缘棒对变压器充分放电（约 5 min）</b></td></tr>
        <tr><td class="eu-s">接线时</td><td><b>必须用单股线分开独立连接</b>，
          不得使用双股绝缘线或绞线</td></tr>
        <tr><td class="eu-s">摇的时候</td><td><b>120 r/min</b>，读 <b>15 s 和 1 min</b> 两个读数</td></tr>
        <tr><td class="eu-s">收尾</td><td><b>先把 L 端引线和桩头分开，再降低摇速</b> ——
          反过来会烧坏绕组</td></tr>
        <tr><td class="eu-s">测完</td><td><b>对测试桩头充分放电之后才允许拆线</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>为什么测试线不能用双股线或绞线</b>：两根线绞在一起，它们之间本身就有绝缘电阻和分布电容，
      会串进测量结果里 —— 你量的就不只是变压器的绝缘了。
      <span class="sub">同理，测试线不要拖在地上、不要缠在一起，两根分开独立走。</span>
    </div>
  </div>

  <div class="bet" data-bet="c55-order" data-q="摇完绝缘电阻表，正确的收尾顺序是什么？"
       data-opts="先停摇，再拆线|先把 L 端引线和测试桩头分开，再降低摇速，最后对设备放电|先拆 E 端，再停摇" data-right="1"
       data-after="先分开 L 端引线，再降低摇速。反过来的话，设备电容里存的电荷会在摇速降低时倒灌回表里，把发电机绕组烧坏（3.8 节讲过同一条：先取下 L 线 → 再停摇 → 对设备放电 → 才动手）。放电这一步也不能省，变压器绕组的电容能存下相当可观的电荷。"></div>
</section>

<!-- ================= 场景 3：量绕组 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">三相绕组的阻值，比的是「平不平衡」</div>
    量绕组阻值不是为了看它等于多少，是为了看<b>三相之间差多少</b> ——
    差得多说明有匝间短路、接头焊接不良或者分接开关接触不好。
    <b>切一种情况，看不平衡度怎么算出来。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">三相基本相等</button>
        <button class="btn sm" data-k="1">一相偏小</button>
        <button class="btn sm" data-k="2">一相断路</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">三相阻值</div><div class="v" id="s3a">4.33 ~ 4.33</div></div>
        <div class="num"><div class="k">不平衡度</div><div class="v" id="s3b">0.0%</div></div>
        <div class="num hi"><div class="k">判定</div><div class="v" id="s3c">正常</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">两个公式（书上原文）</div>
    <b>不平衡度</b>：<span class="key">ΔR% = [(R<sub>max</sub> − R<sub>min</sub>) / R<sub>p</sub>] × 100%</span>，
    其中 <span class="key">R<sub>p</sub> = (R<sub>max</sub> + R<sub>min</sub> + R<sub>c</sub>) / 3</span>
    是三相实测的平均值。
    <div class="tip info" style="margin-top:8px">
      <b>把这次的读数和上次比之前，要先换算到同一个温度</b>（铜的电阻随温度变）：
      <span class="key">R<sub>20℃</sub> = R<sub>t</sub> · K</span>，
      <span class="key">K = (T + 20) / (T + t)</span>，
      常数 <b>T：铜导线 234.5、铝导线 225</b>，<b>t 是测量时的温度</b>。
      <span class="sub">例：30 ℃ 时量到 4.33 Ω 的铜绕组，
      K = (234.5+20)/(234.5+30) = 0.962，换算到 20 ℃ 是 <b>4.17 Ω</b>。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">用什么表量</div>
    绕组阻值多在<b>零点几欧到几欧</b>这个量级，<b>普通万用表的电阻档分辨不出来</b>
    （表笔本身就有零点几欧）。所以书上用的是<b>直流电桥</b>（万用电桥）——
    书上那台实测三相都是 <b>0.433 × 10 Ω ≈ 4.33 Ω</b>。
    <div class="tip">
      <b>用万用表只能做粗判</b>：看有没有明显的断路（∞）或者短路（0）。
      要判「三相差 1%」这种，非用电桥不可。
      <span class="sub">电桥的用法：估计阻值 → 选倍率 → 灵敏度旋钮先调到最低 →
      按电源钮充电 → 按检流计钮 → 调测量臂让指针回零 →
      <b>阻值 = 倍率 × 测量臂读数</b>。测有电感的东西时
      <b>先按检流计钮再放开电源钮</b>，不然会打坏检流计。</span>
    </div>
  </div>

  <div class="bet" data-bet="c55-bal" data-q="三相绕组量下来是 4.33、4.33、4.10 Ω。不平衡度是多少？"
       data-opts="约 5.4%|约 5.4%——(4.33−4.10)÷4.253×100%，其中 4.253 是三相平均值|约 0.23%" data-right="1"
       data-after="约 5.4%。平均值 Rp = (4.33+4.33+4.10)÷3 = 4.253Ω，不平衡度 = (4.33−4.10)÷4.253×100% ≈ 5.4%。注意分母是三相平均值不是最大值。至于多少算超标，要看那台设备的技术条件——书上没给统一限值，别自己编一个。"></div>
</section>

<!-- ================= 场景 4：量电压 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">通上电，量进去多少、出来多少</div>
    前面两屏都是断电测。这一屏是<b>通电测</b>：在正常情况下，
    <b>输入端应为电源电压，输出端应为变换后的电压</b>，
    和铭牌上标的对一遍就知道好坏。<b>点一处量一量。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">输入 220 V</button>
        <button class="btn sm" data-k="1">输出 22 V（蓝）</button>
        <button class="btn sm" data-k="2">输出 12 V（黄）</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">量哪儿</div><div class="v" id="s4a">输入端</div></div>
        <div class="num"><div class="k">铭牌标的</div><div class="v" id="s4b">220 V</div></div>
        <div class="num hi"><div class="k">实测</div><div class="v" id="s4c">220.3 V</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">书上那台电源变压器的铭牌</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>铭牌</th><th>实测</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">输入</td><td>220 V　50 Hz（红线）</td><td class="ok"><b>220.3 V</b>　正常范围</td></tr>
        <tr><td class="eu-s">输出 1</td><td>22 V（蓝线）</td><td>按变比对应</td></tr>
        <tr><td class="eu-s">输出 2</td><td>12 V（黄线）</td><td>按变比对应</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>量交流电压，红黑表笔不分正负。</b>输出端也是交流，一样不分。
      <span class="sub">铭牌上引线的颜色（红 = 输入、蓝 = 22 V、黄 = 12 V）是厂家标的，
      <b>换一台可能就不是这个颜色</b> —— 以铭牌上印的字为准，别照着颜色记。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">输出不对，先别急着判变压器坏</div>
    <b>输入正常、输出偏低或没有</b>，可能是：绕组匝间短路、二次侧接了过重的负载、
    整流滤波那边有短路把它拖住了。
    <div class="tip">
      <b>把二次侧的负载断开，空载再量一次</b> —— 空载输出正常就说明变压器没事，
      问题在后面的负载上。<span class="sub">2.5b 讲过一条相关的：
      <b>12 V 变压器在整流滤波之后量出 15 V 不是坏了</b>，
      带电容滤波本来就是 1.2~1.4 倍。量交流要量在变压器输出端，不是整流之后。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="c5-5">
    <div class="qz" data-q="测 380V 设备的绝缘电阻，该选哪种规格的绝缘电阻表？"
         data-opts="250 V 的|500 V 的——380V 落在表 5-1 的「100~500V」那一档|2500 V 的"
         data-right="1"
         data-why="500V 的。表 5-1：100V 以下用 250V 表、100~500V 用 500V 表、500~3000V 用 1000V 表、3000~10000V 用 2500V 表、10000V 及以上用 5000V 表。选低了试验电压不够考不出问题，选高了可能把本来还能用的绝缘击穿。低压电工天天碰的就是 500V 表这一档，判据 ≥0.5MΩ。"></div>
    <div class="qz" data-q="摇完绝缘电阻表，为什么必须「先分开 L 端引线，再降低摇速」？"
         data-opts="习惯问题|设备电容里存的电荷会在摇速降低时倒灌回表里，把发电机绕组烧坏|为了读数准确"
         data-right="1"
         data-why="防止电荷倒灌烧表。变压器绕组和电缆的电容能存下可观的电荷，测量时被充上高压。如果先降摇速，表内发电机的输出电压掉下来，那些电荷就会反过来往表里灌，烧坏绕组。正确顺序：先取下 L 线 → 再停摇 → 对设备放电 → 才动手拆线。"></div>
    <div class="qz" data-q="三相绕组量到 4.33、4.33、4.10 Ω，不平衡度公式的分母用哪个数？"
         data-opts="最大值 4.33|三相实测的平均值 Rp=(4.33+4.33+4.10)÷3=4.253|最小值 4.10"
         data-right="1"
         data-why="三相平均值。ΔR% = [(Rmax − Rmin) / Rp] × 100%，其中 Rp = (Rmax + Rmin + Rc)/3。这一组算出来是 (4.33−4.10)÷4.253×100% ≈ 5.4%。另外，把这次读数和上次比之前要先换算到同一温度：R20 = Rt·K，K = (T+20)/(T+t)，铜取 T=234.5、铝取 225。"></div>
    <div class="qz" data-q="一台 220V/12V 的电源变压器，输入量到 220V 正常，输出只有 6V。最该先做什么？"
         data-opts="直接判变压器坏了，换一台|把二次侧的负载断开，空载再量一次——空载正常就说明问题在负载那边|加大输入电压"
         data-right="1"
         data-why="先空载量一次。输出偏低有几种可能：绕组匝间短路（变压器自己的毛病）、二次侧接了过重的负载、后面的整流滤波电路有短路把它拖住了。断开负载空载再量，输出恢复正常就说明变压器没事，问题在后面。这一步能省掉一次冤枉的更换。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 5 章 5.5 节（书内 P87~P89）<br>表 5-1 的规格、120 r/min、15 s 与 1 min、不平衡度与温度换算公式都是书上原文</div>
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

const CANH = 286;
function bar(g, l1, l2, kind, y){
  const Y = y || 240;
  const bg = kind === 'ok' ? C.okbg : kind === 'err' ? C.errbg : kind === 'warn' ? C.warnbg : C.accbg;
  const fg = kind === 'ok' ? C.ok : kind === 'err' ? C.err : kind === 'warn' ? C.warn : C.acc;
  EC.box(g, 18, Y, 324, 38, 6, bg, fg, 1);
  txt(g, l1, 180, Y + 13, {sz:10.5, b:1, c:fg});
  txt(g, l2, 180, Y + 28, {sz:9, c:C.tx2});
}
function tip(g, x, y, red){
  const c = red ? C.err : C.tx;
  g.save();
  g.fillStyle = c; g.beginPath(); g.arc(x, y, 3.4, 0, Math.PI*2); g.fill();
  g.globalAlpha = .45; g.strokeStyle = c; g.lineWidth = 1.3;
  g.beginPath(); g.arc(x, y, 6.6, 0, Math.PI*2); g.stroke();
  g.restore();
}

/* ================================================================
   场景 1：选表 —— 五行对照，选中那行高亮
   ================================================================ */
const PICK = [
  {v:'100 V 以下',   m:'250 V',  r:'50 MΩ 以上'},
  {v:'100~500 V',    m:'500 V',  r:'100 MΩ 以上'},
  {v:'500~3000 V',   m:'1000 V', r:'2000 MΩ 以上'},
  {v:'3000~10000 V', m:'2500 V', r:'10000 MΩ 以上'},
  {v:'10000 V 及以上', m:'5000 V', r:'10000 MΩ 以上'}
];
const S1 = { k:0 };
const st1 = new Stage('cv0', 360, CANH);

function draw1(){
  const g = st1.g; st1.clear();
  EP.heading(g, 12, 14, '选绝缘电阻表', '按被测设备的电压等级');
  PICK.forEach(function(it, i){
    const y = 36 + i * 38, on = S1.k === i;
    box(g, 20, y, 320, 32, 6, on ? C.accbg : C.box, on ? C.acc : C.boxLine, on ? 1.6 : 1.1);
    txt(g, it.v, 36, y + 16, {sz:10, b:on?1:0, c: on ? C.acc : C.tx, al:'left'});
    txt(g, it.m, 214, y + 16, {sz:11, b:1, c: on ? C.acc : C.tx, al:'right'});
    txt(g, it.r, 328, y + 16, {sz:8.5, c: on ? C.tx : C.tx3, al:'right'});
  });
  txt(g, '设备电压', 36, 30, {sz:8, c:C.tx3, al:'left'});
  txt(g, '选这种表', 214, 30, {sz:8, c:C.tx3, al:'right'});
  txt(g, '量程要求', 328, 30, {sz:8, c:C.tx3, al:'right'});
  bar(g, S1.k === 1 ? '低压电工天天碰的就是这一档' : PICK[S1.k].v + ' → 用 ' + PICK[S1.k].m + ' 的表',
      S1.k === 1 ? '380 V / 220 V 的设备和线路，500 V 表，判据 ≥ 0.5 MΩ'
                 : '选高了会击穿好绝缘，选低了考不出问题',
      S1.k === 1 ? 'ok' : null, 240);
}
function note1(){
  const it = PICK[S1.k];
  $('s1a').textContent = it.v;
  $('s1b').textContent = it.m;
  $('s1c').textContent = it.r;
  $('n0').innerHTML = S1.k === 1 ?
    '<div class="st good">100~500 V —— 低压电工的主战场</div>' +
    '380 V 的电动机、220 V 的照明线路、配电箱里的一切，都落在这一档：' +
    '<b>用 500 V 的绝缘电阻表</b>。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>判据是 ≥ 0.5 MΩ</b>（3.8 节那个要背下来的数）。' +
    '注意表里那个「100 MΩ 及以上」说的是<b>表本身的量程要够</b>，不是合格判据 ——' +
    '<span class="sub">量程不够的话，好绝缘会直接顶到表头顶端，你分不出是 100 MΩ 还是 500 MΩ。</span></div>'
    :
    '<div class="st">' + it.v + ' → ' + it.m + ' 的绝缘电阻表</div>' +
    '试验电压要和设备的工作电压匹配。<b>绝缘电阻这个量本身就是「在规定的直流试验电压下测得的值」</b> ——' +
    '不说电压这个数就没有意义（3.8 节讲过）。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>选高了</b>：2500 V 去摇 220 V 的线路，可能把本来还能用的绝缘直接击穿，' +
    '人为制造一个故障。<b>选低了</b>：500 V 去摇 10 kV 电缆，' +
    '试验电压远低于它的工作电压，<b>藏在里面的缺陷根本暴露不出来</b>。' +
    '<span class="sub">量程那一列也别忽略：表的上限要够高，否则好绝缘全顶到头，读不出差别。</span></div>';
}
document.getElementById('s1k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S1.k = +t.dataset.k;
  document.querySelectorAll('#s1k .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.k === S1.k); });
  note1(); draw1();
});

/* ================================================================
   场景 2：量绝缘的三个部位
   ================================================================ */
const INS = [
  {L:'低压绕组', E:'外壳', r:'1500', hi:'lo', gnd:true,
   bar:['L 端接低压侧绕组桩头，E 端接外壳并接地', '低压侧的几个桩头要先用短接线连在一起']},
  {L:'高压绕组', E:'外壳', r:'2800', hi:'hi', gnd:true,
   bar:['L 端接高压侧绕组桩头，E 端接外壳并接地', '同样先把高压侧几个桩头短接起来']},
  {L:'高压绕组', E:'低压绕组', r:'2100', hi:'hi', gnd:false,
   bar:['L 端接高压侧，E 端接低压侧，屏蔽端接外壳', '这一次量的是两个绕组之间的绝缘']}
];
const S2 = { k:0 };
const st2 = new Stage('cv1', 360, CANH);

function draw2(){
  const g = st2.g; st2.clear();
  const it = INS[S2.k];
  EP.heading(g, 12, 14, '变压器绝缘电阻', '三处，一处一处量');
  /* 变压器外壳 + 两侧绕组桩头 */
  const TX = 46, TY = 46, TW = 150, TH = 96;
  box(g, TX, TY, TW, TH, 8, P.bakelite || C.box, C.boxLine, 1.5);
  txt(g, '电力变压器', TX + TW/2, TY + TH/2, {sz:10, b:1, c:C.tx3});
  /* 高压侧三个桩头（上）/ 低压侧三个（下） */
  const hiOn = it.hi === 'hi', loOn = it.hi === 'lo' || S2.k === 2;
  const HX = [TX + 32, TX + 75, TX + 118];
  HX.forEach(function(x){
    new Path([[x, TY - 16],[x, TY]]).stroke(g, 2, hiOn ? C.err : C.wire);
    g.save(); g.fillStyle = hiOn ? C.err : C.metal;
    g.beginPath(); g.arc(x, TY - 16, 4, 0, Math.PI*2); g.fill(); g.restore();
  });
  HX.forEach(function(x){
    new Path([[x, TY + TH],[x, TY + TH + 16]]).stroke(g, 2, (S2.k === 0 || S2.k === 2) ? C.acc : C.wire);
    g.save(); g.fillStyle = (S2.k === 0 || S2.k === 2) ? C.acc : C.metal;
    g.beginPath(); g.arc(x, TY + TH + 16, 4, 0, Math.PI*2); g.fill(); g.restore();
  });
  txt(g, '高压侧', TX - 8, TY - 16, {sz:8.5, c: hiOn ? C.err : C.tx3, al:'right'});
  txt(g, '低压侧', TX - 8, TY + TH + 16, {sz:8.5, c: (S2.k===0||S2.k===2) ? C.acc : C.tx3, al:'right'});
  /* 短接线 */
  const sy = hiOn ? TY - 16 : TY + TH + 16;
  g.save(); g.strokeStyle = C.warn; g.lineWidth = 2; g.setLineDash([4,3]);
  g.beginPath(); g.moveTo(HX[0], sy); g.lineTo(HX[2], sy); g.stroke(); g.restore();
  /* 高压那一档的短接线在画布最上边，标注放正上方会撞 heading 的副标题 —— 挪到右边 */
  if(hiOn) txt(g, '短接线', HX[2] + 14, sy, {sz:8, c:C.warn, al:'left'});
  else txt(g, '短接线', HX[1], sy + 13, {sz:8, c:C.warn});
  /* 接地符号：画在变压器左下角，别占中间那一格 —— 中间要放「短接线」的标注 */
  if(it.gnd){
    const gx = TX + 22, gy = TY + TH + 30;
    g.save(); g.strokeStyle = C.PE; g.lineWidth = 2.2; g.lineCap = 'round';
    g.beginPath(); g.moveTo(gx, TY + TH); g.lineTo(gx, gy); g.stroke();
    [20,13,6].forEach(function(w, i){
      g.beginPath(); g.moveTo(gx - w/2, gy + i*6); g.lineTo(gx + w/2, gy + i*6); g.stroke();
    });
    g.restore();
  }
  /* 绝缘电阻表 */
  const MX = 224, MY = 46, MW = 116, MH = 92;
  box(g, MX, MY, MW, MH, 8, P.bakelite || C.box, C.boxLine, 1.5);
  box(g, MX + 12, MY + 12, MW - 24, 38, 4, '#f4f6f8', C.boxLine, 1.2);
  txt(g, it.r, MX + MW/2, MY + 26, {sz:16, b:1, c:'#1b2027'});
  txt(g, 'MΩ', MX + MW/2, MY + 42, {sz:9, b:1, c:'#5a6674'});
  ['L','E','G'].forEach(function(n, i){
    const x = MX + 24 + i*34, y = MY + MH - 16;
    g.save(); g.fillStyle = (n === 'L' || n === 'E') ? C.accbg : C.box;
    g.strokeStyle = (n === 'L' || n === 'E') ? C.acc : C.boxLine; g.lineWidth = 1.4;
    g.beginPath(); g.arc(x, y, 6, 0, Math.PI*2); g.fill(); g.stroke(); g.restore();
    txt(g, n, x, y, {sz:8.5, b:1, c: (n==='L'||n==='E') ? C.acc : C.tx3});
  });
  txt(g, '120 r/min　读 15 s 和 1 min', MX + MW/2, MY + MH + 12, {sz:8, c:C.tx3});

  txt(g, 'L → ' + it.L + '　　E → ' + it.E, 180, 208, {sz:10, b:1, c:C.acc});
  bar(g, it.bar[0], it.bar[1], null, 224);
}
function note2(){
  const it = INS[S2.k];
  $('s2a').textContent = it.L;
  $('s2b').textContent = it.E;
  $('s2c').textContent = it.r + ' MΩ';
  const H = [
    '<div class="st">低压绕组对外壳</div>' +
    '<b>先把低压侧那几个绕组桩头用短接线连在一起</b>，' +
    '再把绝缘电阻表的 <b>L（线路）端</b>接上去，<b>E（接地）端</b>接变压器外壳并接地。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>为什么要短接</b>：三相绕组各自对外壳都有绝缘，短接起来量的是「整个低压侧对外壳」，' +
    '一次就够；不短接的话要一相一相量三次，而且量的时候另外两相是悬空的，读数不准。' +
    '<span class="sub">按 120 r/min 摇，读 <b>15 s 和 1 min</b> 两个读数 ——' +
    '两个数的比值（吸收比）能看出绕组受没受潮（3.8 节点过这条，属更高一级内容）。</span></div>',

    '<div class="st">高压绕组对外壳</div>' +
    '和上一处同一个做法，只是<b>把 L 端换到高压侧的绕组桩头上</b>，E 端仍然接外壳并接地。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>高压侧那几个桩头也要先短接。</b>' +
    '<span class="sub">这一处最能反映变压器整体的绝缘状况，因为高压绕组的绝缘' +
    '本来就承受着最高的电场强度，受潮和老化先从这儿显出来。</span></div>',

    '<div class="st">高压绕组对低压绕组</div>' +
    '这一次两端都接绕组：<b>L 端接高压侧、E 端接低压侧</b>，' +
    '「屏蔽」端接变压器外壳。量的是<b>两个绕组之间</b>那层绝缘。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>这层绝缘一旦坏了，高压会窜到低压侧</b> —— ' +
    '接在低压侧的所有设备和人都会碰到高压，是变压器最危险的一种故障。' +
    '<span class="sub">屏蔽端（G）接外壳的作用是把表面泄漏电流引走，' +
    '让读数只反映绕组之间真正的体积绝缘。</span></div>'
  ];
  $('n1').innerHTML = H[S2.k];
}
document.getElementById('s2k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S2.k = +t.dataset.k;
  document.querySelectorAll('#s2k .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.k === S2.k); });
  note2(); draw2();
});

/* ================================================================
   场景 3：绕组阻值与不平衡度
   ================================================================ */
const WIND = [
  {r:[4.33, 4.33, 4.33], t:'三相基本相等', kind:'ok'},
  {r:[4.33, 4.33, 4.10], t:'一相偏小', kind:'warn'},
  {r:[4.33, 4.33, 0],    t:'一相断路', kind:'err'}
];
const S3 = { k:0 };
const st3 = new Stage('cv2', 360, CANH);

function calc3(){
  const r = WIND[S3.k].r;
  if(r[2] === 0) return {p:0, d:0, inf:true};
  const mx = Math.max.apply(null, r), mn = Math.min.apply(null, r);
  const p = (r[0] + r[1] + r[2]) / 3;
  return {p:p, d:(mx - mn) / p * 100, inf:false};
}
function draw3(){
  const g = st3.g; st3.clear();
  const it = WIND[S3.k], c = calc3();
  EP.heading(g, 12, 14, '三相绕组阻值', '比的是平不平衡');
  const GX = 30, GY = 44, GW = 300, GH = 110;
  box(g, GX, GY, GW, GH, 6, C.box, C.boxLine, 1);
  const names = ['U', 'V', 'W'];
  const maxR = 5;
  it.r.forEach(function(rv, i){
    const bw = 56, bx = GX + 34 + i * 88;
    const bh = rv === 0 ? 0 : (GH - 34) * rv / maxR;
    if(rv === 0){
      g.save(); g.strokeStyle = C.err; g.lineWidth = 2; g.setLineDash([4,3]);
      g.beginPath(); g.moveTo(bx, GY + GH - 20); g.lineTo(bx + bw, GY + GH - 20); g.stroke(); g.restore();
      txt(g, '∞', bx + bw/2, GY + GH - 34, {sz:16, b:1, c:C.err});
    }else{
      box(g, bx, GY + GH - 20 - bh, bw, bh, 3,
          S3.k === 1 && i === 2 ? C.warn : C.acc, null, 0);
      txt(g, rv.toFixed(2), bx + bw/2, GY + GH - 26 - bh, {sz:9.5, b:1, c:C.tx});
    }
    txt(g, names[i] + ' 相', bx + bw/2, GY + GH - 8, {sz:9, c:C.tx2});
  });
  txt(g, '单位 Ω', GX + GW - 12, GY + 12, {sz:8, c:C.tx3, al:'right'});

  /* 计算过程 */
  box(g, 20, 164, 320, 64, 6, C.box, C.boxLine, 1);
  if(c.inf){
    txt(g, 'W 相量到 ∞ —— 绕组断路，不用算不平衡度了', 180, 186, {sz:10, b:1, c:C.err});
    txt(g, '断路的原因：绕组断线、接头脱焊、分接开关接触不良', 180, 206, {sz:9, c:C.tx2});
  }else{
    txt(g, 'Rp = (' + it.r.map(function(x){return x.toFixed(2);}).join(' + ') + ') ÷ 3 = ' +
           c.p.toFixed(3) + ' Ω', 180, 182, {sz:9.5, c:C.tx});
    txt(g, 'ΔR% = (' + Math.max.apply(null,it.r).toFixed(2) + ' − ' +
           Math.min.apply(null,it.r).toFixed(2) + ') ÷ ' + c.p.toFixed(3) + ' × 100% = ' +
           c.d.toFixed(1) + '%', 180, 202, {sz:9.5, b:1, c: c.d > 2 ? C.warn : C.ok});
    txt(g, '差得越小越好　具体限值看那台设备的技术条件', 180, 220, {sz:8.5, c:C.tx3});
  }
  bar(g, it.t, c.inf ? '这一相根本不通，先查断在哪儿'
                     : (c.d < 0.5 ? '三相一致，绕组没有匝间短路或接触不良'
                                  : '有一相偏小 —— 怀疑匝间短路或接头接触不良'),
      it.kind, 240);
}
function note3(){
  const it = WIND[S3.k], c = calc3();
  /* 三个数并排会把卡撑成两行，只给最大~最小 */
  $('s3a').textContent = c.inf ? '一相 ∞'
    : Math.max.apply(null,it.r).toFixed(2) + ' ~ ' + Math.min.apply(null,it.r).toFixed(2);
  $('s3b').textContent = c.inf ? '算不了' : c.d.toFixed(1) + '%';
  $('s3c').textContent = it.t;
  const H = [
    '<div class="st good">三相基本相等 —— 正常</div>' +
    '书上用直流电桥实测这台变压器，<b>三相都是 0.433 × 10 Ω ≈ 4.33 Ω</b>。' +
    '不平衡度算出来接近 0。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>为什么要用电桥不用万用表</b>：绕组阻值多在零点几欧到几欧，' +
    '而万用表的表笔本身就有零点几欧 —— <b>要判「三相差 1%」这种，普通万用表分辨不出来</b>。' +
    '<span class="sub">万用表在这儿只能做粗判：看有没有明显的断路（∞）或短路（0）。</span></div>',

    '<div class="st bad">一相偏小 —— 怀疑匝间短路</div>' +
    '三相绕组是同样的线、同样的匝数绕出来的，<b>阻值本来就该一样</b>。' +
    '有一相明显偏小，最常见的原因是<b>匝间短路</b>（几圈线搭在一起，等效匝数少了）。' +
    '<div class="tip" style="margin-top:8px">' +
    '另外两种可能：<b>接头焊接不良</b>（这个通常让阻值偏大）、' +
    '<b>分接开关某个位置接触不好</b>（把开关来回扳几次再量，读数会变）。' +
    '<span class="sub">和上次的数据比之前，记得<b>先换算到同一温度</b>：' +
    'R20 = Rt·K，K = (T+20)/(T+t)，铜 T=234.5、铝 T=225。' +
    '不换算的话，冬夏两次测量能差出好几个百分点。</span></div>',

    '<div class="st bad">一相 ∞ —— 绕组断路</div>' +
    '这一相根本不通。<b>不用算不平衡度了，先查断在哪儿。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '常见的断点：<b>绕组内部断线</b>（多半是过热烧断）、' +
    '<b>引出线接头脱焊</b>、<b>分接开关的触头没接上</b>。' +
    '<span class="sub">先从最容易查的开始：把分接开关来回扳几次再量，' +
    '再检查引出线接头 —— 这两处不用拆变压器就能查。</span></div>'
  ];
  $('n2').innerHTML = H[S3.k];
}
document.getElementById('s3k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S3.k = +t.dataset.k;
  document.querySelectorAll('#s3k .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.k === S3.k); });
  note3(); draw3();
});

/* ================================================================
   场景 4：输入输出电压
   ================================================================ */
const VOLT = [
  {t:'输入端', name:'220 V', got:'220.3', wire:'红', y:70},
  {t:'输出 1', name:'22 V',  got:'22.1',  wire:'蓝', y:110},
  {t:'输出 2', name:'12 V',  got:'12.0',  wire:'黄', y:146}
];
const S4 = { k:0 };
const st4 = new Stage('cv3', 360, CANH);

function draw4(){
  const g = st4.g; st4.clear();
  const it = VOLT[S4.k];
  EP.heading(g, 12, 14, '输入输出电压', '和铭牌对一遍');
  /* 变压器 + 三组引线 */
  const TX = 60, TY = 54, TW = 76, TH = 108;
  box(g, TX, TY, TW, TH, 6, P.bakelite || C.box, C.boxLine, 1.5);
  txt(g, '电源', TX + TW/2, TY + TH/2 - 8, {sz:9.5, b:1, c:C.tx3});
  txt(g, '变压器', TX + TW/2, TY + TH/2 + 8, {sz:9.5, b:1, c:C.tx3});
  const COL = {'红':C.err, '蓝':C.N, '黄':'#e8b93c'};
  VOLT.forEach(function(v, i){
    const on = S4.k === i, side = i === 0 ? -1 : 1;
    const x0 = i === 0 ? TX : TX + TW, x1 = i === 0 ? 26 : 196;
    new Path([[x0, v.y],[x1, v.y]]).stroke(g, on ? 3 : 2, on ? COL[v.wire] : C.wireL);
    txt(g, v.wire + '　' + v.name, i === 0 ? 30 : 200, v.y - 12,
        {sz:8.5, b:on?1:0, c: on ? COL[v.wire] : C.tx3, al:'left'});
    if(on) tip(g, i === 0 ? 40 : 182, v.y, true);
  });
  /* 万用表 */
  const jacks = EP.meterUnit(g, 216, 176, 126, 84,
    {mode:'ACV', reading:it.got, rsz:16,
     jacks:[{n:'COM'}, {n:'VΩ', red:true}], hot:1});
  txt(g, '交流电压档　红黑表笔不分正负', 180, 168, {sz:8.5, c:C.tx3});

  bar(g, '铭牌标 ' + it.name + '　实测 ' + it.got + ' V',
      S4.k === 0 ? '书上实测输入 220.3 V，属于正常范围' : '和铭牌对得上，这一路输出正常',
      'ok', 240);
}
function note4(){
  const it = VOLT[S4.k];
  $('s4a').textContent = it.t;
  $('s4b').textContent = it.name;
  $('s4c').textContent = it.got + ' V';
  $('n3').innerHTML = S4.k === 0 ?
    '<div class="st">输入端：应该就是电源电压</div>' +
    '铭牌上印着 <b>INPUT 220 V 50 Hz（RED）</b>，量出来 <b>220.3 V</b> ——' +
    '书上说这属于正常范围。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>输入正常是往下查的前提</b>：输入就不对的话，问题在前面的线路上，' +
    '跟变压器没关系。<span class="sub">电网电压本来就在额定值上下浮动，' +
    '220 V 的线路量到 210~235 V 都很常见，不用大惊小怪。</span></div>'
    :
    '<div class="st">输出端：应该是变换后的电压</div>' +
    '铭牌上这一路标着 <b>' + it.name + '（' + it.wire + '线）</b>，' +
    '量出来 <b>' + it.got + ' V</b>，对得上。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>引线颜色是厂家标的，换一台可能就不是这个颜色</b> —— 以铭牌上印的字为准。' +
    '<span class="sub"><b>输出偏低或没有，先把二次侧负载断开空载再量一次</b>：' +
    '空载正常就说明变压器没事，问题在后面的负载或整流电路上。' +
    '另外 2.5b 讲过：12 V 变压器在整流滤波之后量出 15 V 不是坏了，' +
    '带电容滤波本来就是 1.2~1.4 倍 —— 量交流要量在变压器输出端。</span></div>';
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

ElecNav.init({ch:5, sec:'5.5'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('5.5');
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
