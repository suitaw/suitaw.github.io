/* 6.3 线缆连接头的加工 —— 本节内容的唯一真相。
   对应《零基础学电工》第 6 章 6.3 节（书内 P115~P118）。

   四屏：① 硬导线接线环怎么做 ② 合格与四种不合格 ③ 软导线三种连接头 ④ 环形连接头

   **屏 2 是这一节最值钱的一屏**（书上图 6-21）：接线环做大了、做小了、
   重叠了、线露长了各会出什么事 —— **这四种都是肉眼一看就知道的**，
   而且都要「剪掉重新加工」。判据比手法好教，也更有用。

   数字口径（书上原文，别凭记忆改）：
   - 硬导线接线环（书 P115 图 6-20）：
     用左手捏住导线的一端，右手持钳<b>在距绝缘层 5 mm 处</b>夹紧并弯折；
     使用钢丝钳在<b>距线头部 5 mm 处</b>将线头部弯折成直角，
     <b>弯折方向与之前弯折方向相反</b>；
     再钳住线头部所弯折的部分朝最初弯折的方向扭动，使线芯弯折成圆环；
     加工成圆圈形状后把多余的线芯剪掉，
     <b>线芯露出的部分至圆圈处约有 5 mm 的距离</b>，<b>插口直径为 3.5~4 mm</b>
   - 不合格的四种（书 P116 图 6-21）：
     **环圈不足** → 易造成连接不牢固，易诱发短路；
     **环圈重叠** → 会引起接触不良；
     **连接线露出过长** → 有漏电危险；
     **环圈过大** → 易造成接触不良，甚至有短路危险
   - 软导线连接头三种（书 P116~118）：
     **绞绕式**：一只手握住线缆绝缘层处，另一只手捻住线芯，向一个方向旋转，
       使线芯紧密整齐即可；绞绕好的软导线通常与压接螺钉连接
     **缠绕式**：在绞绕的基础上，把其中一根线芯沿一个方向<b>由绝缘层处开始向上缠绕，
       直至缠绕到顶端</b>；这么做是为了<b>使导线能插入连接孔</b>
       （多股软导线的线芯过细，直接插插不进去）
     **环形**：<b>距绝缘层根部 1/2 处</b>的线芯绞绕紧，然后弯折，
       把弯折的线芯与线缆并紧，<b>将弯折线芯的 1/3 拉起</b>，环绕其余线芯与线缆；
       将拉起的线芯<b>顺时针方向缠绕 2 圈</b>，剪掉多余线芯 */
(function(){
'use strict';
ELEC.reg({
  id: '6.3',
  file: 'c6-3.html',
  title: '6.3 线缆连接头的加工',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>接线环</button>
    <button class="tab" data-i="1"><span class="n">2</span>合格与不合格</button>
    <button class="tab" data-i="2"><span class="n">3</span>软导线三种</button>
    <button class="tab" data-i="3"><span class="n">4</span>环形连接头</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">要压在螺钉底下，就得先弯成一个环</div>
    塑料硬导线一般可以直接接，<b>但要压在接线端子的螺钉底下时，
    就得先把线芯弯成一个大小合适的圆环</b> —— 这样螺钉一拧，环就被压死在端子上。
    <b>弯这个环有三个尺寸要卡。</b><b>一步一步点下去。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">① 距绝缘层 5 mm 弯折</button>
        <button class="btn sm" data-k="1">② 反向再弯一次</button>
        <button class="btn sm" data-k="2">③ 扭成圆环</button>
        <button class="btn sm" data-k="3">④ 剪掉多余</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">距绝缘层</div><div class="v" id="s1a">5 mm</div></div>
        <div class="num"><div class="k">插口直径</div><div class="v" id="s1b">3.5~4 mm</div></div>
        <div class="num hi"><div class="k">露出长度</div><div class="v" id="s1c">约 5 mm</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">三个要卡的尺寸（书上原文）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>尺寸</th><th>多少</th><th>为什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">第一次<br>弯折处</td><td><b>距绝缘层 5 mm</b></td>
          <td>留一小段直的，压上去之后绝缘层不会被螺钉压住</td></tr>
        <tr><td class="eu-s">插口<br>直径</td><td><b>3.5~4 mm</b></td>
          <td>正好套得进常见的 M4 螺钉，又不会晃</td></tr>
        <tr><td class="eu-s">露出<br>长度</td><td>线芯露出部分至圆圈处<br><b>约 5 mm</b></td>
          <td>短了不好弯，长了裸铜露在外面有漏电危险</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>第二次弯折的方向要和第一次相反。</b>两次反向弯，线头才会朝着圆心那一边转，
      最后一扭正好合成一个圆。
      <span class="sub">同方向弯两次的话，弯出来是个「L 加 L」的方角，不是圆环。</span>
    </div>
  </div>

  <div class="bet" data-bet="c63-ring" data-q="加工硬导线接线环，插口直径该做多大？"
       data-opts="越大越好，好套进去|3.5~4 mm——正好套得进常见的螺钉又不会晃|和线芯一样粗" data-right="1"
       data-after="3.5~4 mm。做大了螺钉压不住整个环，接触面积小、容易松，书上说「易造成接触不良，甚至有短路危险」；做小了套不进螺钉，硬撑会把环撑变形。另外两个尺寸：第一次弯折在距绝缘层 5 mm 处，线芯露出部分至圆圈处约 5 mm。"></div>
</section>

<!-- ================= 场景 2：合格与不合格 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">这四种不合格，一眼就能看出来</div>
    书上专门画了一张「合格与不合格」的对照图。<b>这四种全是肉眼可判的</b>，
    而且处理方式都一样：<b>剪掉，重新加工</b>。
    <b>切一种看它会出什么事。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">合格</button>
        <button class="btn sm" data-k="1">环圈不足</button>
        <button class="btn sm" data-k="2">环圈重叠</button>
        <button class="btn sm" data-k="3">露出过长</button>
        <button class="btn sm" data-k="4">环圈过大</button>
      </div>
      <div class="nums">
        <div class="num"><div class="k">这一种</div><div class="v" id="s2a">合格</div></div>
        <div class="num hi"><div class="k">后果</div><div class="v" id="s2b">可以用</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">四种不合格与它们的后果（书上原文）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>不合格</th><th>后果</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">环圈不足</td><td>易造成<b>连接不牢固</b>，<b>易诱发短路</b></td></tr>
        <tr><td class="eu-s">环圈重叠</td><td>会引起<b>接触不良</b></td></tr>
        <tr><td class="eu-s">连接线<br>露出过长</td><td>有<b>漏电危险</b></td></tr>
        <tr><td class="eu-s">环圈过大</td><td>易造成<b>接触不良</b>，甚至有<b>短路危险</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>「若出现不合格的连接头时，需要剪断，重新加工」</b> —— 书上原话。
      <span class="sub">这一步的返工成本非常低（剪掉几厘米线，重新弯一个），
      而装上去之后出问题的代价高得多：接触不良的地方会发热，
      裸露过长的地方会碰到隔壁的端子。</span>
    </div>
  </div>

  <div class="bet" data-bet="c63-bad" data-q="接线环做得比螺钉大一圈，能凑合用吗？"
       data-opts="能，反正套得进去|不能——环圈过大易造成接触不良甚至短路危险，要剪掉重做|能，拧紧一点就行" data-right="1"
       data-after="不能。环圈过大的话，螺钉垫片压不住整个环，实际接触面积很小、还容易松动；环的边缘还可能翘出端子，碰到隔壁那一相。书上给这种情况的判语是「易造成接触不良，甚至有短路危险」，处理方式是剪断重新加工。"></div>
</section>

<!-- ================= 场景 3：软导线三种 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">软导线三种连接头，用在三种地方</div>
    多股软导线的线芯太散，不加工根本没法接。书上给了三种做法：
    <b>绞绕式</b>（压接螺钉用）、<b>缠绕式</b>（要插进连接孔时用）、
    <b>环形</b>（压在螺钉底下时用）。<b>切一种看。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">绞绕式</button>
        <button class="btn sm" data-k="1">缠绕式</button>
        <button class="btn sm" data-k="2">环形</button>
      </div>
      <div class="nums">
        <div class="num"><div class="k">这一种</div><div class="v" id="s3a">绞绕式</div></div>
        <div class="num hi"><div class="k">用在哪</div><div class="v" id="s3b">压接螺钉</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">三种各自解决什么问题</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>做法</th><th>怎么做</th><th>用在哪</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">绞绕式</td><td>一手握绝缘层，一手捻线芯，
          <b>向一个方向旋转</b>，使线芯紧密整齐</td><td>与<b>压接螺钉</b>连接</td></tr>
        <tr><td class="eu-s">缠绕式</td><td>在绞绕的基础上，把<b>其中一根线芯</b>
          由绝缘层处开始向上缠绕，<b>直至缠绕到顶端</b></td>
          <td>要<b>插入连接孔</b>时 —— 散头插不进去</td></tr>
        <tr><td class="eu-s">环形</td><td>绞绕后弯折成环，
          用拉起的那 1/3 线芯<b>顺时针缠 2 圈</b>固定</td><td>压在<b>螺钉</b>底下</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>为什么软线一定要先加工</b>：多股线芯是散的，直接塞进端子里，
      <b>拧螺钉时会有几根被挤出来</b> —— 挤出来的那几根裸露在外面，
      而且真正被压住的线芯变少了、载流能力下降。
      <span class="sub">最稳妥的做法是<b>压冷压端头（管形／叉形／针形）</b>，
      这在 4.5 屏 4 提过。书上这三种是没有端头时的手工做法。</span>
    </div>
  </div>

  <div class="bet" data-bet="c63-soft" data-q="多股软导线要插进一个连接孔里，为什么绞绕之后还要再缠一层？"
       data-opts="为了好看|绞绕之后线头还是散的、插不进去；用一根线芯从绝缘层缠到顶端，把整个线头裹成一根光滑的棒|为了增加截面积" data-right="1"
       data-after="为了能插进去。绞绕只是把线芯拧紧了，端头仍然会有翘出来的丝，插孔时会卡住或者散开。缠绕式是在绞绕的基础上，用其中一根线芯沿一个方向从绝缘层处一直缠到顶端，把整个线头裹成一根光滑的棒——书上原话就是「主要是为了使导线能插入连接孔」。"></div>
</section>

<!-- ================= 场景 4：环形连接头 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">软导线的环形连接头：1/2、1/3、2 圈</div>
    这一种做法有三个比例要记：<b>距绝缘层根部 1/2 处</b>绞紧、
    <b>把弯折线芯的 1/3 拉起</b>、拉起的那部分<b>顺时针缠 2 圈</b>。
    <b>一步一步点下去。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">① 绞绕紧</button>
        <button class="btn sm" data-k="1">② 弯折并紧</button>
        <button class="btn sm" data-k="2">③ 拉起 1/3</button>
        <button class="btn sm" data-k="3">④ 缠 2 圈</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">绞到哪</div><div class="v" id="s4a">距根部 1/2</div></div>
        <div class="num"><div class="k">拉起多少</div><div class="v" id="s4b">1/3</div></div>
        <div class="num hi"><div class="k">缠几圈</div><div class="v" id="s4c">2 圈</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">四步的完整说法（书上原文）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>步</th><th>做什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">①</td><td>握住线缆绝缘层处，捻住线芯向一个方向旋转；
          <b>旋转绞接线芯的长度应为总线芯长度的 1/2</b>（距绝缘层根部 1/2 处），
          绞接应紧密整齐</td></tr>
        <tr><td class="eu-s">②</td><td>将线芯<b>弯折为环形</b>，并将线芯<b>并紧</b></td></tr>
        <tr><td class="eu-s">③</td><td>将弯折线芯的 <b>1/3</b> 拉起，
          在 1/3 处向外折角后弯曲成圆弧</td></tr>
        <tr><td class="eu-s">④</td><td>把拉起的线芯<b>顺时针方向缠绕 2 圈</b>，
          剪掉多余线芯，完成连接头的加工</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>缠那 2 圈是为了把环锁住。</b>软导线弯成环之后，如果不用一段线芯把根部箍住，
      环会在拧螺钉的时候被带着转开。
      <span class="sub">硬导线不用这一步，因为它本身就硬、弯成什么形状就是什么形状。
      <b>软和硬的加工差别，根子上就在这儿。</b></span>
    </div>
  </div>

  <div class="quiz" data-quiz="c6-3">
    <div class="qz" data-q="硬导线接线环的插口直径应该做多大？"
         data-opts="越大越好|3.5~4 mm|和线芯一样粗"
         data-right="1"
         data-why="3.5~4 mm。书上给了三个尺寸：第一次弯折在距绝缘层 5 mm 处、插口直径 3.5~4 mm、线芯露出部分至圆圈处约 5 mm。做大了螺钉垫片压不住整个环，接触面积小容易松，还可能碰到隔壁端子；做小了套不进螺钉。"></div>
    <div class="qz" data-q="接线环做出来发现环圈重叠了。怎么办？"
         data-opts="用钳子压平就行|剪断重新加工——书上给的四种不合格情况，处理方式都是剪掉重做|凑合用，反正能套上"
         data-right="1"
         data-why="剪断重新加工。书上原话：若出现不合格的连接头时，需要剪断，重新加工。四种不合格各自的后果：环圈不足→连接不牢固易诱发短路；环圈重叠→接触不良；连接线露出过长→漏电危险；环圈过大→接触不良甚至短路危险。返工成本很低，装上去出问题的代价高得多。"></div>
    <div class="qz" data-q="多股软导线绞绕之后，为什么有时还要再缠一层（缠绕式）？"
         data-opts="为了增加截面积|为了使导线能插入连接孔——绞绕后端头仍有翘出的丝，插孔会卡住或散开|为了防锈"
         data-right="1"
         data-why="为了能插进连接孔。绞绕只是把线芯拧紧，端头仍会有翘出来的丝。缠绕式是在绞绕的基础上，用其中一根线芯从绝缘层处沿一个方向一直缠到顶端，把整个线头裹成一根光滑的棒。书上原话：主要是为了使导线能插入连接孔。"></div>
    <div class="qz" data-q="软导线做环形连接头，最后为什么要用拉起的线芯缠 2 圈？"
         data-opts="为了美观|把环锁住——软导线弯成环之后不箍住根部，拧螺钉时环会被带着转开|为了增加接触面积"
         data-right="1"
         data-why="锁住这个环。软导线是散的、没有形状记忆，弯成环之后根部是松的，拧螺钉的时候环会跟着螺钉转开。用拉起的那 1/3 线芯顺时针缠 2 圈把根部箍死，环才定型。硬导线不需要这一步，因为它本身硬、弯成什么形状就保持什么形状。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 6 章 6.3 节（书内 P115~P118）<br>5 mm、3.5~4 mm、1/2、1/3、2 圈都是书上原文</div>
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

const CANH = 252;
function bar(g, l1, l2, kind, y){
  const Y = y || 206;
  const bg = kind === 'ok' ? C.okbg : kind === 'err' ? C.errbg : kind === 'warn' ? C.warnbg : C.accbg;
  const fg = kind === 'ok' ? C.ok : kind === 'err' ? C.err : kind === 'warn' ? C.warn : C.acc;
  EC.box(g, 18, Y, 324, 38, 6, bg, fg, 1);
  txt(g, l1, 180, Y + 13, {sz:10.5, b:1, c:fg});
  txt(g, l2, 180, Y + 28, {sz:9, c:C.tx2});
}
function dim(g, x0, x1, y, s, c){
  c = c || C.acc;
  g.save();
  g.strokeStyle = c; g.lineWidth = 1.1;
  g.beginPath(); g.moveTo(x0, y - 5); g.lineTo(x0, y + 5);
  g.moveTo(x1, y - 5); g.lineTo(x1, y + 5);
  g.moveTo(x0, y); g.lineTo(x1, y); g.stroke();
  g.restore();
  const w = tw(g, s, 8.5, true) + 8;
  box(g, (x0+x1)/2 - w/2, y - 7, w, 14, 3, C.bg, null, 0);
  txt(g, s, (x0+x1)/2, y, {sz:8.5, b:1, c:c});
}
/* 一根硬导线（横），绝缘层在左，裸线芯在右 */
function lead(g, x0, xIns, x1, cy, o){
  o = o || {};
  g.save();
  g.strokeStyle = o.hurt ? C.err : (P.copper || C.cop);
  g.lineWidth = o.w || 7; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x0 + 4, cy); g.lineTo(x1, cy); g.stroke();
  g.restore();
  box(g, x0, cy - 11, xIns - x0, 22, 7, o.ins || C.L, null, 0);
}
/* 一个接线环：圆环 + 一小段直的引出 */
function ring(g, cx, cy, r, o){
  o = o || {};
  const c = o.c || (P.copper || C.cop), w = o.w || 6;
  g.save();
  g.strokeStyle = c; g.lineWidth = w; g.lineCap = 'round';
  g.beginPath();
  const gap = o.gap == null ? 0.45 : o.gap;    /* 环口的缺口 */
  g.arc(cx, cy, r, Math.PI*0.5 + gap, Math.PI*0.5 - gap);
  g.stroke();
  g.restore();
  if(o.tail){
    g.save();
    g.strokeStyle = c; g.lineWidth = w; g.lineCap = 'round';
    g.beginPath(); g.moveTo(cx, cy + r); g.lineTo(cx - o.tail, cy + r);
    g.stroke(); g.restore();
  }
}

/* ================================================================
   场景 1：接线环四步
   ================================================================ */
const STEP1 = [
  {t:'距绝缘层 5 mm 弯折', bar:['用左手捏住导线，右手持钳在距绝缘层 5 mm 处夹紧并弯折',
    '留这一小段直的，压上去之后绝缘层不会被螺钉压住']},
  {t:'反向再弯一次', bar:['在距线头部 5 mm 处再弯折成直角，方向与之前相反',
    '两次反向弯，线头才会朝着圆心那一边转']},
  {t:'扭成圆环', bar:['钳住线头部弯折的那一段，朝最初弯折的方向扭动',
    '线芯就合成了一个圆环 —— 插口直径要做到 3.5~4 mm']},
  {t:'剪掉多余', bar:['加工成圆圈形状后把多余的线芯剪掉',
    '线芯露出的部分至圆圈处约有 5 mm 的距离']}
];
const S1 = { k:0 };
const st1 = new Stage('cv0', 360, CANH);

function draw1(){
  const g = st1.g; st1.clear();
  const it = STEP1[S1.k];
  EP.heading(g, 12, 14, '硬导线接线环', '第 ' + (S1.k+1) + ' 步 / 共 4 步');
  const cy = 84;
  if(S1.k === 0){
    lead(g, 40, 150, 300, cy);
    g.save(); g.strokeStyle = P.copper || C.cop; g.lineWidth = 7; g.lineCap = 'round';
    g.beginPath(); g.moveTo(170, cy); g.lineTo(170, cy - 44); g.stroke(); g.restore();
    dim(g, 150, 170, cy + 26, '5');
    txt(g, '第一次弯折 90°', 200, cy - 40, {sz:9, b:1, c:C.acc, al:'left'});
  }else if(S1.k === 1){
    lead(g, 40, 150, 170, cy);
    g.save(); g.strokeStyle = P.copper || C.cop; g.lineWidth = 7; g.lineCap = 'round';
    g.beginPath(); g.moveTo(170, cy); g.lineTo(170, cy - 44); g.lineTo(214, cy - 44);
    g.stroke(); g.restore();
    dim(g, 170, 214, cy - 62, '5');
    txt(g, '方向和第一次相反', 230, cy - 44, {sz:9, b:1, c:C.warn, al:'left'});
  }else if(S1.k === 2){
    lead(g, 40, 150, 168, cy);
    ring(g, 190, cy - 24, 22, {gap:0.5});
    g.save(); g.strokeStyle = P.copper || C.cop; g.lineWidth = 7; g.lineCap = 'round';
    g.beginPath(); g.moveTo(168, cy); g.lineTo(180, cy); g.stroke(); g.restore();
    dim(g, 168, 212, cy + 26, '插口直径 3.5~4');
    txt(g, '朝最初弯折的方向扭', 236, cy - 44, {sz:9, b:1, c:C.acc, al:'left'});
  }else{
    lead(g, 40, 150, 168, cy);
    ring(g, 190, cy - 24, 22, {gap:0.16});
    g.save(); g.strokeStyle = P.copper || C.cop; g.lineWidth = 7; g.lineCap = 'round';
    g.beginPath(); g.moveTo(168, cy); g.lineTo(180, cy); g.stroke(); g.restore();
    dim(g, 150, 168, cy + 26, '5');
    txt(g, '多余线芯剪掉', 236, cy - 44, {sz:9, b:1, c:C.ok, al:'left'});
    /* 装到端子上 */
    box(g, 250, cy - 40, 76, 62, 5, '#8a5a2b', null, 0);
    g.save(); g.fillStyle = P.steel || C.metal;
    g.beginPath(); g.arc(288, cy - 10, 12, 0, Math.PI*2); g.fill(); g.restore();
    txt(g, '接线端子', 288, cy + 32, {sz:8.5, c:C.tx3});
  }
  box(g, 22, 132, 316, 48, 6, C.accbg, C.acc, 1.2);
  txt(g, '距绝缘层 5 mm　·　插口直径 3.5~4 mm　·　露出约 5 mm',
      180, 148, {sz:10, b:1, c:C.acc});
  txt(g, '这三个尺寸卡住了，接线环就是合格的', 180, 166, {sz:8.5, c:C.tx2});
  bar(g, it.bar[0], it.bar[1], 'ok');
}
function note1(){
  $('s1a').textContent = '5 mm';
  $('s1b').textContent = '3.5~4 mm';
  $('s1c').textContent = '约 5 mm';
  const H = [
    '<div class="st">① 距绝缘层 5 mm 处夹紧弯折</div>' +
    '<b>用左手捏住导线的一端，右手持钳在距绝缘层 5 mm 处夹紧并弯折。</b>' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>为什么要留这 5 mm</b>：环压到端子上之后，' +
    '这一小段直的正好在螺钉外面 —— <b>绝缘层不会被螺钉压住</b>。' +
    '<span class="sub">绝缘层被压住的话，实际接触的是塑料不是铜，' +
    '和 6.2 那条「绝缘层不得深入线夹」是同一个道理。</span></div>',

    '<div class="st">② 在距线头部 5 mm 处反向再弯一次</div>' +
    '<b>使用钢丝钳在距线头部 5 mm 处将线头部弯折成直角，' +
    '弯折方向与之前弯折方向相反。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>「相反」这两个字是关键。</b>两次反向弯，线头才会朝着圆心那一边转，' +
    '最后一扭正好合成一个圆。' +
    '<span class="sub">同方向弯两次的话，弯出来是个方角的「L 加 L」，' +
    '不管怎么扭都合不成圆环。</span></div>',

    '<div class="st">③ 扭成圆环，插口直径 3.5~4 mm</div>' +
    '<b>钳住线头部所弯折的部分，朝最初弯折的方向扭动，使线芯弯折成圆环。</b>' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>插口直径 3.5~4 mm</b> —— 这是全节最该记的一个数。' +
    '正好套得进常见的 M4 螺钉，又不会在里面晃。' +
    '<span class="sub">做大了：螺钉垫片压不住整个环，接触面积小、容易松，' +
    '边缘还可能翘出端子碰到隔壁。做小了：套不进螺钉，硬撑会把环撑变形。</span></div>',

    '<div class="st good">④ 剪掉多余，露出约 5 mm</div>' +
    '<b>加工成圆圈形状后，将多余的线芯剪掉，' +
    '线芯露出的部分至圆圈处约有 5 mm 的距离。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '做好之后<b>把线端与电气设备接线端子连接，用螺钉压紧即可</b>。' +
    '<span class="sub">拧的时候注意：<b>环的开口方向要朝着拧紧的方向</b>' +
    '（螺钉顺时针拧，环口就朝顺时针那一侧）—— 这样拧紧时环是被越箍越紧的，' +
    '反过来会被拧开。</span></div>'
  ];
  $('n0').innerHTML = H[S1.k];
}
document.getElementById('s1k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S1.k = +t.dataset.k;
  document.querySelectorAll('#s1k .btn').forEach(function(x){ x.classList.toggle('on', +x.dataset.k === S1.k); });
  note1(); draw1();
});

/* ================================================================
   场景 2：合格与不合格
   ================================================================ */
const JUD = [
  {t:'合格', r:22, gap:0.16, tail:26, bad:'', ok:true,
   res:'可以用', bar:['环圈合适、不重叠、露出长度合适', '插口直径 3.5~4 mm，露出约 5 mm']},
  {t:'环圈不足', r:22, gap:1.5, tail:26, ok:false,
   res:'连接不牢固', bar:['环圈没有绕满，缺一大截', '易造成连接不牢固，易诱发短路']},
  {t:'环圈重叠', r:22, gap:-0.7, tail:26, ok:false,
   res:'接触不良', bar:['线芯绕过了头，两头叠在一起', '会引起接触不良']},
  {t:'露出过长', r:22, gap:0.16, tail:76, ok:false,
   res:'漏电危险', bar:['线芯露出的那一段太长了', '有漏电危险 —— 裸铜可能碰到隔壁的端子']},
  {t:'环圈过大', r:36, gap:0.16, tail:26, ok:false,
   res:'接触不良', bar:['环圈做得比螺钉大一大圈', '易造成接触不良，甚至有短路危险']}
];
const S2 = { k:0 };
const st2 = new Stage('cv1', 360, CANH);

function draw2(){
  const g = st2.g; st2.clear();
  const it = JUD[S2.k];
  EP.heading(g, 12, 14, '接线环', it.ok ? '合格' : '不合格：' + it.t);
  const cx = 150, cy = 82;
  /* 螺钉（参照物） */
  g.save(); g.fillStyle = P.steelD || C.metalD;
  g.beginPath(); g.arc(cx, cy, 11, 0, Math.PI*2); g.fill();
  g.strokeStyle = P.steelDD || C.metalD; g.lineWidth = 2;
  g.beginPath(); g.moveTo(cx - 6, cy); g.lineTo(cx + 6, cy); g.stroke();
  g.restore();
  /* 环 */
  ring(g, cx, cy, it.r, {gap:it.gap, c: it.ok ? (P.copper || C.cop) : C.err, w:6});
  /* 引出的那一段 + 绝缘层 */
  const tx = cx - it.tail - it.r;
  g.save(); g.strokeStyle = it.ok ? (P.copper || C.cop) : C.err;
  g.lineWidth = 6; g.lineCap = 'round';
  g.beginPath(); g.moveTo(cx - it.r, cy + 4); g.lineTo(tx + 10, cy + 4); g.stroke(); g.restore();
  box(g, tx - 60, cy - 7, 70, 22, 7, C.L, null, 0);
  if(S2.k === 3) dim(g, tx + 10, cx - it.r, cy + 30, '露出过长', C.err);
  else if(S2.k === 4) dim(g, cx - it.r, cx + it.r, cy - 52, '环圈过大', C.err);
  else if(S2.k === 1) txt(g, '缺一大截', cx + it.r + 16, cy, {sz:9, b:1, c:C.err, al:'left'});
  else if(S2.k === 2) txt(g, '两头叠在一起', cx + it.r + 16, cy, {sz:9, b:1, c:C.err, al:'left'});
  else txt(g, '正好套住螺钉', cx + it.r + 16, cy, {sz:9, b:1, c:C.ok, al:'left'});

  box(g, 22, 138, 316, 44, 6, it.ok ? C.okbg : C.errbg, it.ok ? C.ok : C.err, 1.2);
  txt(g, it.ok ? '合格 —— 可以装' : it.t + ' → ' + it.res,
      180, 154, {sz:11, b:1, c: it.ok ? C.ok : C.err});
  txt(g, it.ok ? '插口直径 3.5~4 mm，露出约 5 mm' : '需要剪断，重新加工',
      180, 172, {sz:8.5, c:C.tx2});
  bar(g, it.bar[0], it.bar[1], it.ok ? 'ok' : 'err');
}
function note2(){
  const it = JUD[S2.k];
  $('s2a').textContent = it.t;
  $('s2b').textContent = it.res;
  const H = [
    '<div class="st good">合格的接线环</div>' +
    '环圈<b>刚好绕满一圈、不重叠</b>，<b>插口直径 3.5~4 mm</b>正好套住螺钉，' +
    '<b>线芯露出部分至圆圈处约 5 mm</b>。' +
    '<div class="tip info" style="margin-top:8px">' +
    '这三条同时满足才算合格。<b>装的时候还有一条</b>：' +
    '环的开口方向要朝着螺钉拧紧的方向，' +
    '<span class="sub">这样拧紧时环是被越箍越紧的，反过来会被拧开。</span></div>',

    '<div class="st bad">环圈不足</div>' +
    '线芯没有绕满一圈，环是缺口的。' +
    '<b>书上给的后果：易造成连接不牢固，易诱发短路。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>为什么会诱发短路</b>：环没绕满，螺钉压不住它，' +
    '一振动线就从螺钉底下滑出来了 —— 一根带电的裸线在端子排里乱动，' +
    '碰到哪儿都是事故。<span class="sub">剪断，重新加工。</span></div>',

    '<div class="st bad">环圈重叠</div>' +
    '线芯绕过了头，两头叠在一起。<b>书上给的后果：会引起接触不良。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>为什么会接触不良</b>：重叠的那一处比别处厚，' +
    '螺钉垫片压下来时<b>只压在这个凸起上</b>，' +
    '环的其余部分反而悬空了 —— 实际接触面积比正常的还小。' +
    '<span class="sub">接触电阻大 → 那一点发热 → 氧化 → 电阻更大，恶性循环。</span></div>',

    '<div class="st bad">连接线露出过长</div>' +
    '线芯露出的那一段太长了。<b>书上给的后果：有漏电危险。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '端子排上相邻两个端子之间只有几毫米，<b>裸露过长的那一截很容易碰到隔壁</b>；' +
    '就算暂时没碰上，柜门一关、线一挤也会碰上。' +
    '<span class="sub">书上给的合格尺寸是<b>约 5 mm</b> ——' +
    '刚好够弯，又不至于露太多。</span></div>',

    '<div class="st bad">环圈过大</div>' +
    '环做得比螺钉大一大圈。<b>书上给的后果：易造成接触不良，甚至有短路危险。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>两个问题一起来</b>：螺钉垫片压不住整个环，' +
    '实际接触的只有靠近螺钉那一小段（接触不良）；' +
    '环的边缘还可能<b>翘出端子外面碰到隔壁那一相</b>（短路）。' +
    '<span class="sub">所以插口直径这个数不是随便定的：' +
    '<b>3.5~4 mm 是按常见螺钉的直径来的</b>。</span></div>'
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
   场景 3：软导线三种
   ================================================================ */
const SOFT3 = [
  {t:'绞绕式', use:'压接螺钉',
   bar:['一手握绝缘层，一手捻线芯，向一个方向旋转', '使线芯紧密整齐 —— 绞绕好的通常与压接螺钉连接']},
  {t:'缠绕式', use:'插入连接孔',
   bar:['在绞绕的基础上，用其中一根线芯从绝缘层处缠到顶端', '把整个线头裹成一根光滑的棒，才插得进连接孔']},
  {t:'环形', use:'压在螺钉底下',
   bar:['绞绕后弯成环，用拉起的 1/3 线芯顺时针缠 2 圈', '缠这 2 圈是为了把环锁住 —— 软线没有形状记忆']}
];
const S3 = { k:0 };
const st3 = new Stage('cv2', 360, CANH);

function draw3(){
  const g = st3.g; st3.clear();
  const it = SOFT3[S3.k];
  EP.heading(g, 12, 14, '软导线连接头', it.t);
  const cy = 82;
  box(g, 24, cy - 11, 96, 22, 7, C.L, null, 0);
  if(S3.k === 0){
    /* 绞绕：一段拧紧的线 */
    g.save();
    g.strokeStyle = P.copper || C.cop; g.lineWidth = 2; g.lineCap = 'round';
    for(let i = -2; i <= 2; i++){
      g.beginPath();
      for(let x = 120; x <= 250; x += 4){
        const y = cy + Math.sin((x - 120) / 12 + i) * 4.2;
        if(x === 120) g.moveTo(x, y); else g.lineTo(x, y);
      }
      g.stroke();
    }
    g.restore();
    txt(g, '向一个方向捻紧', 186, cy - 32, {sz:9, b:1, c:C.acc});
  }else if(S3.k === 1){
    /* 缠绕：一段绞绕 + 外面一根线缠满 */
    g.save();
    g.strokeStyle = P.copperD || C.copD; g.lineWidth = 8; g.lineCap = 'round';
    g.beginPath(); g.moveTo(120, cy); g.lineTo(256, cy); g.stroke(); g.restore();
    g.save();
    g.strokeStyle = P.copper || C.cop; g.lineWidth = 2.4; g.lineCap = 'round';
    for(let i = 0; i < 15; i++){
      const x = 122 + i * 9;
      g.beginPath();
      g.moveTo(x, cy + 6); g.quadraticCurveTo(x + 4.5, cy - 10, x + 9, cy - 6);
      g.stroke();
    }
    g.restore();
    txt(g, '从绝缘层处一直缠到顶端', 186, cy - 32, {sz:9, b:1, c:C.acc});
    /* 连接孔 */
    box(g, 274, cy - 22, 52, 44, 5, '#3a4653', null, 0);
    g.save(); g.fillStyle = C.bg;
    g.beginPath(); g.arc(300, cy, 10, 0, Math.PI*2); g.fill(); g.restore();
    txt(g, '连接孔', 300, cy + 34, {sz:8.5, c:C.tx3});
  }else{
    /* 环形 */
    g.save();
    g.strokeStyle = P.copper || C.cop; g.lineWidth = 5; g.lineCap = 'round';
    g.beginPath(); g.moveTo(120, cy); g.lineTo(168, cy); g.stroke(); g.restore();
    ring(g, 200, cy - 4, 24, {gap:0.2, w:5});
    /* 缠 2 圈的那一小段 */
    g.save();
    g.strokeStyle = C.warn; g.lineWidth = 2.4; g.lineCap = 'round';
    for(let i = 0; i < 2; i++){
      const x = 164 + i * 9;
      g.beginPath(); g.moveTo(x, cy + 7); g.quadraticCurveTo(x + 4.5, cy - 11, x + 9, cy - 7);
      g.stroke();
    }
    g.restore();
    txt(g, '拉起的 1/3 缠 2 圈', 240, cy + 34, {sz:9, b:1, c:C.warn, al:'left'});
  }
  box(g, 22, 138, 316, 44, 6, C.accbg, C.acc, 1.2);
  txt(g, it.t + ' —— 用在「' + it.use + '」', 180, 154, {sz:11, b:1, c:C.acc});
  txt(g, '多股线芯是散的，不加工直接塞进端子会有几根被挤出来', 180, 172, {sz:8.5, c:C.tx2});
  bar(g, it.bar[0], it.bar[1], 'ok');
}
function note3(){
  const it = SOFT3[S3.k];
  $('s3a').textContent = it.t;
  $('s3b').textContent = it.use;
  const H = [
    '<div class="st">绞绕式：最基本的一种</div>' +
    '<b>用一只手握住线缆绝缘层处，另一只手捻住线芯，向一个方向旋转，' +
    '使线芯紧密整齐即可。</b>' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>绞绕好的软导线通常与压接螺钉连接</b> ——' +
    '就是那种线塞进端子、从侧面拧一颗螺钉压住的接法。' +
    '<span class="sub"><b>只能朝一个方向捻。</b>来回捻的话线芯会互相磨，' +
    '细丝会断；而且捻松了塞进去照样有丝翘出来。</span></div>',

    '<div class="st">缠绕式：为了插得进连接孔</div>' +
    '<b>塑料软导线插入连接孔时，由于多股软导线的线芯过细，无法插入</b>，' +
    '所以要在绞绕的基础上，<b>将其中一根线芯沿一个方向由绝缘层处开始向上缠绕，' +
    '直至缠绕到顶端。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '缠完之后整个线头就是<b>一根光滑的棒</b>，端头没有翘出来的丝，' +
    '插进去不会卡也不会散。' +
    '<span class="sub">现场更常见的做法是<b>压一个针形或管形冷压端头</b>，' +
    '效果更好也更快 —— 书上这个是没有端头时的手工办法。</span></div>',

    '<div class="st">环形：软导线也能压在螺钉底下</div>' +
    '和硬导线的接线环是同一个用途，但做法不同：软线没有形状记忆，' +
    '<b>弯成环之后必须用一段线芯把根部箍住</b>，否则拧螺钉时环会被带着转开。' +
    '<div class="tip info" style="margin-top:8px">' +
    '三个比例：<b>距绝缘层根部 1/2 处</b>绞紧 → 弯折并紧 →' +
    '<b>把弯折线芯的 1/3 拉起</b> → 顺时针<b>缠 2 圈</b> → 剪掉多余。' +
    '<span class="sub">下一屏一步一步过一遍。</span></div>'
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
   场景 4：环形连接头四步
   ================================================================ */
const RING4 = [
  {t:'绞绕紧', bar:['握住绝缘层，捻住线芯向一个方向旋转', '旋转绞接线芯的长度应为总线芯长度的 1/2']},
  {t:'弯折并紧', bar:['把线芯弯折为环形，并将线芯并紧', '这时环还是松的，一碰就变形']},
  {t:'拉起 1/3', bar:['将弯折线芯的 1/3 拉起', '在 1/3 处向外折角后弯曲成圆弧']},
  {t:'缠 2 圈', bar:['把拉起的线芯顺时针方向缠绕 2 圈，剪掉多余线芯', '这 2 圈把环的根部箍死，环才定型']}
];
const S4 = { k:0 };
const st4 = new Stage('cv3', 360, CANH);

function draw4(){
  const g = st4.g; st4.clear();
  const it = RING4[S4.k];
  EP.heading(g, 12, 14, '软导线环形连接头', '第 ' + (S4.k+1) + ' 步 / 共 4 步');
  const cy = 82;
  box(g, 24, cy - 11, 88, 22, 7, C.L, null, 0);
  if(S4.k === 0){
    g.save();
    g.strokeStyle = P.copper || C.cop; g.lineWidth = 2; g.lineCap = 'round';
    for(let i = -2; i <= 2; i++){
      g.beginPath();
      for(let x = 112; x <= 210; x += 4){
        const y = cy + Math.sin((x - 112) / 11 + i) * 4;
        if(x === 112) g.moveTo(x, y); else g.lineTo(x, y);
      }
      g.stroke();
    }
    /* 剩下 1/2 还是散的 */
    g.strokeStyle = P.copperL || C.cop; g.lineWidth = 1.4;
    for(let i = -2; i <= 2; i++){
      g.beginPath(); g.moveTo(210, cy); g.lineTo(300, cy + i*9); g.stroke();
    }
    g.restore();
    dim(g, 112, 210, cy + 34, '绞紧 1/2');
    dim(g, 210, 300, cy + 34, '余下 1/2', C.tx3);
  }else{
    g.save();
    g.strokeStyle = P.copper || C.cop; g.lineWidth = 5; g.lineCap = 'round';
    g.beginPath(); g.moveTo(112, cy); g.lineTo(160, cy); g.stroke(); g.restore();
    ring(g, 194, cy - 4, 24, {gap: S4.k === 1 ? 0.5 : 0.2, w:5});
    if(S4.k >= 2){
      /* 拉起的那 1/3 */
      g.save();
      g.strokeStyle = C.warn; g.lineWidth = 3; g.lineCap = 'round';
      g.beginPath(); g.moveTo(170, cy + 16);
      if(S4.k === 2) g.lineTo(148, cy + 40); else g.lineTo(156, cy + 8);
      g.stroke(); g.restore();
      txt(g, S4.k === 2 ? '拉起 1/3' : '', 132, cy + 48, {sz:9, b:1, c:C.warn});
    }
    if(S4.k === 3){
      g.save();
      g.strokeStyle = C.warn; g.lineWidth = 2.6; g.lineCap = 'round';
      for(let i = 0; i < 2; i++){
        const x = 156 + i * 10;
        g.beginPath(); g.moveTo(x, cy + 8); g.quadraticCurveTo(x + 5, cy - 12, x + 10, cy - 8);
        g.stroke();
      }
      g.restore();
      txt(g, '顺时针缠 2 圈', 240, cy + 34, {sz:9, b:1, c:C.warn, al:'left'});
    }
    if(S4.k === 1) txt(g, '环还是松的', 240, cy - 24, {sz:9, c:C.tx3, al:'left'});
  }
  box(g, 22, 138, 316, 44, 6, C.accbg, C.acc, 1.2);
  txt(g, '距根部 1/2 绞紧　·　拉起 1/3　·　顺时针缠 2 圈', 180, 154, {sz:10.5, b:1, c:C.acc});
  txt(g, '这三个比例是这一种做法的全部要点', 180, 172, {sz:8.5, c:C.tx2});
  bar(g, it.bar[0], it.bar[1], S4.k === 3 ? 'ok' : null);
}
function note4(){
  const it = RING4[S4.k];
  $('s4a').textContent = '距根部 1/2';
  $('s4b').textContent = '1/3';
  $('s4c').textContent = '2 圈';
  const H = [
    '<div class="st">① 绞绕紧，绞到总线芯长度的 1/2</div>' +
    '<b>握住线缆绝缘层处，捻住线芯向一个方向旋转；' +
    '旋转绞接线芯的长度应为总线芯长度的 1/2（距绝缘层根部 1/2 处），' +
    '绞接应紧密整齐。</b>' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>为什么只绞一半</b>：剩下那一半要留着弯环和缠圈用。' +
    '绞太多了没有余量，绞太少了根部不结实。</div>',

    '<div class="st">② 弯折成环，把线芯并紧</div>' +
    '<b>将线芯弯折为环形，并将线芯并紧。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>这时候环还是松的</b> —— 软线没有形状记忆，' +
    '手一放它就想弹回去。所以后面必须有一步把它锁住。</div>',

    '<div class="st">③ 把弯折线芯的 1/3 拉起</div>' +
    '<b>将弯折线芯的 1/3 拉起，在 1/3 处向外折角后弯曲成圆弧。</b>' +
    '<div class="tip info" style="margin-top:8px">' +
    '拉起这 1/3 就是<b>留出来用来缠圈的那一段</b>。' +
    '<span class="sub">剩下的 2/3 和线缆并在一起，' +
    '等下就是被缠的那一部分。</span></div>',

    '<div class="st good">④ 顺时针缠 2 圈，剪掉多余</div>' +
    '<b>将拉起的线芯顺时针方向缠绕 2 圈，剪掉多余线芯，完成连接头的加工。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>这 2 圈把环的根部箍死，环才定型。</b>' +
    '<span class="sub">做完之后这个环就和硬导线的接线环一样用了 ——' +
    '套进螺钉、压紧。<b>装的时候同样注意环口朝着拧紧的方向。</b></span></div>'
  ];
  $('n3').innerHTML = H[S4.k];
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

ElecNav.init({ch:6, sec:'6.3'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('6.3');
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
