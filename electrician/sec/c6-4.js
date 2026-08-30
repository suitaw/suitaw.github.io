/* 6.4 线缆焊接与绝缘层恢复 —— 本节内容的唯一真相。
   对应《零基础学电工》第 6 章 6.4 节（书内 P118~P120）。**这是第 6 章最后一节。**

   四屏：① 焊接的四步 ② 三种焊法的强度 ③ 绝缘恢复：220 V 与 380 V ④ 包缠的手法

   **屏 3 那两行是这一节最该背下来的**：
   220 V 线路 —— 先包一层黄蜡带，再包一层绝缘胶带；
   380 V 线路 —— 先包两三层黄蜡带，再包两层绝缘胶带。
   现场包绝缘时没人会去翻书，但这两行必须张口就来。

   数字口径（书上原文，别凭记忆改）：
   - 焊接四步（书 P118 图 6-25）：将需要焊接线缆的绝缘层剥除 → 在剥离绝缘层的线缆上
     <b>套热收缩管</b> → 把线芯按缠绕连接的方法连接在一起，用加热后的电烙铁
     在需要焊接的地方上锡焊接在一起 → 待热收缩管套在线缆焊接的地方，
     <b>确保焊接部位完全被热收缩管套住</b>，完成焊接
   - 三种焊法（书 P119 提示说明）：
     <b>绕焊</b>：把导线绕在接线端子上再焊，**强度最高**（书上说钩焊的强度低于绕焊）；
     <b>钩焊</b>：将导线弯成钩形钩在接线端子上，用钳子夹紧后再焊接，
       **强度低于绕焊，操作简便**；
     <b>搭焊</b>：用焊锡把导线搭接在接线端子上直接焊接，
       **仅用于临时连接或不便于缠、钩的地方及某些接插件**，
       **这种连接最方便，但强度及可靠性最差**
   - 绝缘恢复的总要求（书 P119）：线缆连接或绝缘层遭到破坏后，
     **必须恢复绝缘性能才可以正常使用**，并且**恢复后强度应不低于原有绝缘层**
   - 两种恢复方法：**热收缩管** / **绝缘材料包缠法**（黄蜡带、涤纶膜带、胶带）
   - **220 V 线路**恢复导线绝缘时：**先包缠一层黄蜡带（或涤纶薄膜带），
     再包缠一层绝缘胶带**（书 P120 提示说明）
   - **380 V 线路**恢复绝缘时：**先包缠两三层黄蜡带（或涤纶薄膜带），
     再包缠两层绝缘胶带**（书 P120 提示说明）
   - 包缠的手法（书 P119 图 6-27、P120）：
     包缠时**须从完整绝缘层处开始包缠**，一般从**距连接点两根带宽**的绝缘层位置包缠，
     背对线端缠绕包缠至另一端；缠绕时**每圈的绝缘胶带应覆盖住前一圈胶带一半的位置**；
     在包裹线缆时，**间距应为 1/2 带宽**
   - 分支点的包缠（书 P120 图 6-29）：**离分支点两根带宽处**，
     **以与导线倾斜 55° 角、每层压 1/2 带宽的方式开始缠绕**，
     缠绕至分支点时**紧贴线芯沿支路缠绕**；
     **超出支路连接处两个带宽后向回包缠**，再沿主路继续包缠至另一端 */
(function(){
'use strict';
ELEC.reg({
  id: '6.4',
  file: 'c6-4.html',
  title: '6.4 线缆焊接与绝缘层恢复',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>焊接四步</button>
    <button class="tab" data-i="1"><span class="n">2</span>三种焊法</button>
    <button class="tab" data-i="2"><span class="n">3</span>220 与 380</button>
    <button class="tab" data-i="3"><span class="n">4</span>怎么包</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">焊接：热收缩管要在焊之前套上去</div>
    焊接是把两段及以上的线缆通过焊接的方式连在一起。
    四步里有一步特别容易忘：<b>热收缩管必须在焊接之前就套到线上</b> ——
    焊完了才想起来，套不进去了。<b>一步一步点下去。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">① 剥绝缘层</button>
        <button class="btn sm" data-k="1">② 套热收缩管</button>
        <button class="btn sm" data-k="2">③ 连接并焊锡</button>
        <button class="btn sm" data-k="3">④ 套住加热</button>
      </div>
      <div class="nums">
        <div class="num"><div class="k">这一步</div><div class="v" id="s1a">剥绝缘层</div></div>
        <div class="num hi"><div class="k">要点</div><div class="v" id="s1b">先剥再套管</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">四步（书上图 6-25）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>步</th><th>做什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">①</td><td>将需要焊接线缆的<b>绝缘层剥除</b></td></tr>
        <tr><td class="eu-s">②</td><td>在剥离绝缘层的线缆上<b>套热收缩管</b>
          —— <b>这一步不能等到焊完</b></td></tr>
        <tr><td class="eu-s">③</td><td>把线芯<b>按缠绕连接的方法连接在一起</b>，
          用加热后的电烙铁在需要焊接的地方<b>上锡</b>焊接在一起</td></tr>
        <tr><td class="eu-s">④</td><td>把热收缩管<b>套到焊接的地方</b>并加热，
          <b>确保焊接部位完全被热收缩管套住</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>注意第 ③ 步：焊之前先按缠绕的方法连好。</b>
      焊锡的作用是<b>把已经连好的接头封住、让它不氧化、更导电</b>，
      <b>不是靠焊锡把两根线粘在一起</b> —— 那样的接头一拽就开。
      <span class="sub">6.2 那些缠绕方法（对接、T 形、并头）在这儿全用得上。</span>
    </div>
  </div>

  <div class="bet" data-bet="c64-tube" data-q="焊完之后才想起来热收缩管没套。怎么办？"
       data-opts="用胶带缠一下就行|只能把接头拆开重焊——热收缩管是套管，焊完的接头比线粗，套不进去了|再买一根粗一点的套上" data-right="1"
       data-after="只能拆开重来（或者改用绝缘胶带包缠法恢复绝缘）。热收缩管是一根管子，必须从线端穿过去，焊完之后接头那一坨比线粗，穿不过去。所以书上把「套热收缩管」放在第 ② 步——剥完绝缘层马上套，套好推到一边去，焊完再推回来。"></div>
</section>

<!-- ================= 场景 2：三种焊法 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">绕焊最牢，搭焊最方便，中间是钩焊</div>
    把导线焊到接线端子上，有三种做法。<b>强度和方便程度正好是反着的</b>：
    <b>绕焊强度最高、搭焊最方便但强度和可靠性最差</b>。
    <b>切一种看它用在哪。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">绕焊</button>
        <button class="btn sm" data-k="1">钩焊</button>
        <button class="btn sm" data-k="2">搭焊</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这一种</div><div class="v" id="s2a">绕焊</div></div>
        <div class="num"><div class="k">强度</div><div class="v" id="s2b">最高</div></div>
        <div class="num hi"><div class="k">用在哪</div><div class="v" id="s2c">正式连接</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">三种焊法的对比（书上原文）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>焊法</th><th>怎么做</th><th>强度</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">绕焊</td><td>把导线<b>绕在</b>接线端子上再焊</td>
          <td class="ok"><b>最高</b></td></tr>
        <tr><td class="eu-s">钩焊</td><td>把导线<b>弯成钩形钩在</b>接线端子上，
          <b>用钳子夹紧后</b>再焊接</td><td><b>低于绕焊</b>，操作简便</td></tr>
        <tr><td class="eu-s">搭焊</td><td>用焊锡把导线<b>搭接</b>在接线端子上直接焊接</td>
          <td><b>最差</b> —— 强度及可靠性都最差</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>搭焊仅用于临时连接、或者不便于缠和钩的地方及某些接插件</b>（书上原话）。
      <span class="sub">道理和上一屏那条一样：<b>焊锡不是胶水</b>。
      绕和钩提供的是<b>机械强度</b>，焊锡提供的是<b>电气连接和防氧化</b> ——
      两件事，缺一不可。搭焊只有后者。</span>
    </div>
  </div>

  <div class="bet" data-bet="c64-solder" data-q="为什么搭焊的强度和可靠性最差？"
       data-opts="焊锡质量不好|它完全靠焊锡把导线粘在端子上，没有任何机械固定；绕焊和钩焊靠缠或钩提供机械强度|端子太小" data-right="1"
       data-after="因为它没有机械固定。绕焊是把导线绕在端子上（机械咬合）、钩焊是弯成钩钩住再用钳子夹紧，焊锡只是在此基础上封住接触面；搭焊则完全靠焊锡本身的强度撑着——而焊锡又软又脆，一振动一受力就开。所以搭焊只用于临时连接或者实在没法缠、钩的地方。"></div>
</section>

<!-- ================= 场景 3：220 与 380 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">这两行必须张口就来</div>
    线缆连接或绝缘层被破坏之后，<b>必须恢复绝缘性能才可以正常使用</b>，
    而且<b>恢复后的强度应不低于原有绝缘层</b>。
    包多少层不是随便定的 —— <b>看这条线路是 220 V 还是 380 V</b>。
    <b>切一种看层数。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">220 V 线路</button>
        <button class="btn sm" data-k="1">380 V 线路</button>
        <button class="btn sm" data-k="2">热收缩管</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这条线路</div><div class="v" id="s3a">220 V</div></div>
        <div class="num"><div class="k">黄蜡带</div><div class="v" id="s3b">一层</div></div>
        <div class="num hi"><div class="k">绝缘胶带</div><div class="v" id="s3c">一层</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st good">要背下来的那两行（书上提示说明）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>线路</th><th>先包</th><th>再包</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">220 V</td><td><b>一层</b>黄蜡带<br>（或涤纶薄膜带）</td>
          <td><b>一层</b>绝缘胶带</td></tr>
        <tr><td class="eu-s">380 V</td><td><b>两三层</b>黄蜡带<br>（或涤纶薄膜带）</td>
          <td><b>两层</b>绝缘胶带</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>为什么要两种带子叠着包</b>：<b>黄蜡带绝缘性能好但不粘、机械强度差</b>；
      <b>绝缘胶带粘、耐磨，但单靠它绝缘裕度不够</b>。
      里面一层管绝缘、外面一层管固定和保护。
      <span class="sub">电压高一倍，绝缘层就要厚好几倍 —— 这不是线性的，
      所以 380 V 要包两三层黄蜡带。<b>严格按规范缠绕</b>，别省。</span>
    </div>
  </div>

  <div class="bet" data-bet="c64-layer" data-q="一条 380V 线路的接头要恢复绝缘，该包几层？"
       data-opts="和 220V 一样，各一层|先包两三层黄蜡带，再包两层绝缘胶带|只包绝缘胶带，包厚一点" data-right="1"
       data-after="先两三层黄蜡带，再两层绝缘胶带。220V 的是各一层。电压高一倍绝缘要求不是高一倍——所以 380V 明显要厚。而且必须是两种带子叠着包：黄蜡带绝缘性能好但不粘、机械强度差；绝缘胶带粘且耐磨，但单靠它绝缘裕度不够。"></div>
</section>

<!-- ================= 场景 4：怎么包 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">从哪儿起、压多少、分支点怎么绕</div>
    包缠有三个手法上的规矩：<b>从距连接点两根带宽的完整绝缘层处开始</b>、
    <b>每圈压住前一圈一半</b>、分支点要<b>以 55° 角起缠</b>。
    <b>切一种看。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">从哪儿起</button>
        <button class="btn sm" data-k="1">压 1/2 带宽</button>
        <button class="btn sm" data-k="2">T 形分支点</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">起点</div><div class="v" id="s4a">两根带宽</div></div>
        <div class="num"><div class="k">每圈压</div><div class="v" id="s4b">1/2 带宽</div></div>
        <div class="num hi"><div class="k">分支点角度</div><div class="v" id="s4c">55°</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">三条手法（书上原文）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>规矩</th><th>说法</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">从哪起</td><td>包缠时须<b>从完整绝缘层处开始包缠</b>，
          一般从<b>距连接点两根带宽</b>的绝缘层位置包缠，背对线端缠绕包缠至另一端</td></tr>
        <tr><td class="eu-s">压多少</td><td>缠绕时，<b>每圈的绝缘胶带应覆盖住前一圈胶带一半的位置</b>；
          在包裹线缆时，间距应为 <b>1/2 带宽</b></td></tr>
        <tr><td class="eu-s">分支点</td><td>离分支点<b>两根带宽处</b>，
          <b>以与导线倾斜 55° 角、每层压 1/2 带宽</b>的方式开始缠绕，
          缠绕至分支点时<b>紧贴线芯沿支路缠绕</b>；
          <b>超出支路连接处两个带宽后向回包缠</b>，再沿主路继续包缠至另一端</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>「从完整绝缘层处开始」这一条最容易被忽略。</b>
      从裸线那儿开始缠的话，起点那一圈下面就是铜 ——
      <b>带子的边缘一翘，铜就露出来了</b>。
      <span class="sub">压住原有绝缘层两根带宽，等于把新旧绝缘搭接起来，
      这才叫「恢复」。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="c6-4">
    <div class="qz" data-q="线缆焊接的四步里，「套热收缩管」是第几步？为什么？"
         data-opts="最后一步，焊完再套|第二步（剥完绝缘层就套）——焊完的接头比线粗，管子穿不过去了|第一步，剥线之前套"
         data-right="1"
         data-why="第二步。热收缩管是一根管子，必须从线端穿过去。焊完之后接头那一坨比线粗，穿不进去了。所以书上的顺序是：剥绝缘层 → 套热收缩管（推到一边） → 线芯按缠绕方法连接并上锡焊接 → 把管推回焊接处加热收缩，确保焊接部位完全被套住。"></div>
    <div class="qz" data-q="绕焊、钩焊、搭焊三种，哪种强度最差？为什么？"
         data-opts="绕焊|搭焊——它完全靠焊锡把导线粘在端子上，没有任何机械固定|钩焊"
         data-right="1"
         data-why="搭焊。绕焊是把导线绕在端子上、钩焊是弯成钩钩住再用钳子夹紧，这两种都有机械咬合，焊锡只是封住接触面；搭焊完全靠焊锡本身撑着，而焊锡又软又脆。所以书上说搭焊「这种连接最方便，但强度及可靠性最差」，仅用于临时连接或不便于缠、钩的地方及某些接插件。"></div>
    <div class="qz" data-q="380V 线路的接头恢复绝缘，该包几层？"
         data-opts="先一层黄蜡带，再一层绝缘胶带（和 220V 一样）|先两三层黄蜡带，再两层绝缘胶带|只包三层绝缘胶带"
         data-right="1"
         data-why="先两三层黄蜡带（或涤纶薄膜带），再两层绝缘胶带。220V 的是各一层。两种带子叠着包各有分工：黄蜡带绝缘性能好但不粘、机械强度差；绝缘胶带粘且耐磨，但单靠它绝缘裕度不够。另外一条总要求：恢复后的强度应不低于原有绝缘层。"></div>
    <div class="qz" data-q="包缠绝缘胶带，应该从哪儿开始缠？"
         data-opts="从裸露的线芯那一头开始|从完整绝缘层处开始——一般从距连接点两根带宽的绝缘层位置起缠|从接头正中间往两边缠"
         data-right="1"
         data-why="从完整绝缘层处开始，一般是距连接点两根带宽的位置。从裸线那儿起缠的话，起点那一圈下面就是铜，带子边缘一翘铜就露出来了。压住原有绝缘层两根带宽，等于把新旧绝缘搭接起来。另外每圈要覆盖住前一圈一半（间距 1/2 带宽），分支点要以与导线倾斜 55° 角起缠。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 6 章 6.4 节（书内 P118~P120）—— 第 6 章到此结束<br>三种焊法、220/380 的层数、两根带宽、1/2 带宽、55° 都是书上原文</div>
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

/* ================================================================
   场景 1：焊接四步
   ================================================================ */
const WELD = [
  {t:'剥绝缘层', memo:'先剥再套管',
   bar:['将需要焊接线缆的绝缘层剥除', '剥多长按 6.1 那一节的规矩来']},
  {t:'套热收缩管', memo:'这一步不能等',
   bar:['在剥离绝缘层的线缆上套热收缩管，推到一边去', '焊完的接头比线粗，那时候再套就套不进去了']},
  {t:'连接并焊锡', memo:'先缠好，再上锡',
   bar:['线芯按缠绕连接的方法连接在一起，用电烙铁上锡焊接', '焊锡是封住接头、防氧化，不是靠它把两根线粘住']},
  {t:'套住加热', memo:'完全被套住',
   bar:['把热收缩管推回焊接处加热收缩', '确保焊接部位完全被热收缩管套住']}
];
const S1 = { k:0 };
const st1 = new Stage('cv0', 360, CANH);

function draw1(){
  const g = st1.g; st1.clear();
  const it = WELD[S1.k];
  EP.heading(g, 12, 14, '线缆的焊接', '第 ' + (S1.k+1) + ' 步 / 共 4 步');
  const cy = 80;
  /* 两根线，中间接头 */
  const cut = 150, cut2 = 210;
  g.save();
  g.strokeStyle = P.copper || C.cop; g.lineWidth = 6; g.lineCap = 'round';
  g.beginPath(); g.moveTo(cut - 4, cy); g.lineTo(cut2 + 4, cy); g.stroke(); g.restore();
  box(g, 30, cy - 11, cut - 30, 22, 7, C.L, null, 0);
  box(g, cut2, cy - 11, 300 - cut2, 22, 7, C.N, null, 0);

  if(S1.k >= 1){
    /* 热收缩管：黑色套管，先在旁边 */
    const tx = S1.k >= 3 ? 154 : 236;
    box(g, tx, cy - 15, 52, 30, 8, '#2b3038', '#4a525c', 1.2);
    txt(g, '热收缩管', tx + 26, cy - 26, {sz:8.5, c:C.tx3});
  }
  if(S1.k >= 2 && S1.k < 3){
    /* 焊锡 + 烙铁 */
    g.save(); g.fillStyle = P.metalL || C.metalL;
    g.beginPath(); g.ellipse(180, cy, 16, 9, 0, 0, Math.PI*2); g.fill(); g.restore();
    g.save();
    g.strokeStyle = C.err; g.lineWidth = 6; g.lineCap = 'round';
    g.beginPath(); g.moveTo(180, cy - 20); g.lineTo(204, cy - 52); g.stroke();
    g.strokeStyle = P.steelDD || C.metalD; g.lineWidth = 4;
    g.beginPath(); g.moveTo(204, cy - 52); g.lineTo(240, cy - 74); g.stroke();
    g.restore();
    txt(g, '电烙铁上锡', 252, cy - 66, {sz:9, b:1, c:C.err, al:'left'});
  }
  if(S1.k === 3){
    /* 加热收缩：套住接头 */
    g.save(); g.strokeStyle = C.warn; g.lineWidth = 1.6; g.setLineDash([3,3]);
    for(let i = 0; i < 4; i++){
      g.beginPath(); g.moveTo(150 + i*20, cy - 34); g.lineTo(156 + i*20, cy - 20); g.stroke();
    }
    g.restore();
    txt(g, '电吹风加热', 240, cy - 34, {sz:9, b:1, c:C.warn, al:'left'});
  }
  box(g, 22, 128, 316, 50, 6, C.accbg, C.acc, 1.2);
  txt(g, '剥绝缘层 → 套热收缩管 → 连接并焊锡 → 套住加热', 180, 145, {sz:10, b:1, c:C.acc});
  txt(g, '第 ② 步不能等到焊完 —— 接头变粗，管子穿不过去', 180, 165, {sz:8.5, c:C.tx2});
  bar(g, it.bar[0], it.bar[1], S1.k === 3 ? 'ok' : null);
}
function note1(){
  const it = WELD[S1.k];
  $('s1a').textContent = it.t;
  $('s1b').textContent = it.memo;
  const H = [
    '<div class="st">① 剥绝缘层</div>' +
    '把需要焊接的两段线缆的绝缘层剥掉。<b>剥多长、用什么工具，' +
    '按 6.1 那一节的规矩来</b>（4 mm² 分界，别用剪切力，别伤线芯）。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>焊接用在哪儿</b>：需要长期可靠、又不方便用端子的地方 ——' +
    '比如设备内部的线束、传感器引线、印制板上的接线。' +
    '<span class="sub">配电箱、端子排上的接线一般<b>不焊</b>，用压接端头，' +
    '因为要能拆能换。</span></div>',

    '<div class="st bad">② 套热收缩管 —— 这一步千万别忘</div>' +
    '<b>在剥离绝缘层的线缆上套热收缩管</b>，套好之后推到旁边去，' +
    '等焊完再推回来。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>热收缩管是一种遇热即收缩的套管</b>，' +
    '主要用于线缆焊接完成后的绝缘处理（书上原话）。' +
    '<span class="sub"><b>它是一根管子，必须从线端穿过去。</b>' +
    '焊完之后接头那一坨比线粗，穿不进去了 —— 只能把接头拆开重来，' +
    '或者改用绝缘胶带包缠法。<b>忘了套管是焊接时最常见的返工原因。</b></span></div>',

    '<div class="st">③ 线芯先连好，再上锡</div>' +
    '<b>把线缆的线芯按缠绕连接的方法连接在一起</b>，' +
    '使用加热后的电烙铁在需要焊接的地方<b>上锡焊接在一起</b>。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>顺序不能反。</b>焊锡的作用是<b>封住已经连好的接头、防止氧化、' +
    '让接触更充分</b> —— <b>不是靠焊锡把两根线粘在一起</b>。' +
    '<span class="sub">纯靠焊锡粘的接头一拽就开（下一屏那个「搭焊」讲的就是这件事）。' +
    '6.2 那些缠绕方法在这儿全用得上。</span></div>',

    '<div class="st good">④ 把管推回来加热</div>' +
    '<b>待热收缩管套在线缆焊接的地方，确保焊接部位完全被热收缩管套住</b>，' +
    '用电吹风的热风口对准热收缩管加热，使其缩到与线缆并贴合。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>「完全被套住」是判据</b>：两端都要压住原有的绝缘层，' +
    '不能有裸铜露在管子外面。' +
    '<span class="sub">加热要<b>均匀转着烤</b>，别对着一处猛吹 ——' +
    '一处烤过头会烧穿，别处又没缩紧。</span></div>'
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
   场景 2：三种焊法
   ================================================================ */
const SOL = [
  {t:'绕焊', s:'最高', use:'正式连接', lv:3,
   bar:['把导线绕在接线端子上再焊', '机械咬合 + 焊锡封住 —— 强度最高']},
  {t:'钩焊', s:'低于绕焊', use:'操作简便处', lv:2,
   bar:['把导线弯成钩形钩在接线端子上，用钳子夹紧后再焊', '强度低于绕焊，但操作简便']},
  {t:'搭焊', s:'最差', use:'临时连接', lv:1,
   bar:['用焊锡把导线搭接在接线端子上直接焊接', '最方便，但强度及可靠性最差 —— 仅用于临时连接']}
];
const S2 = { k:0 };
const st2 = new Stage('cv1', 360, CANH);

function draw2(){
  const g = st2.g; st2.clear();
  const it = SOL[S2.k];
  EP.heading(g, 12, 14, it.t, '强度：' + it.s);
  const cy = 76, px = 200;
  /* 接线端子：一根竖着的柱 */
  g.save(); g.fillStyle = P.brass || C.cop;
  g.fillRect(px - 5, cy - 34, 10, 68); g.restore();
  txt(g, '接线端子', px, cy + 48, {sz:8.5, c:C.tx3});
  /* 导线 */
  g.save();
  g.strokeStyle = P.copper || C.cop; g.lineWidth = 5; g.lineCap = 'round';
  if(S2.k === 0){
    g.beginPath(); g.moveTo(70, cy); g.lineTo(px - 14, cy); g.stroke();
    for(let i = 0; i < 3; i++){
      const y = cy - 8 + i * 8;
      g.beginPath(); g.ellipse(px, y, 12, 4, 0, 0, Math.PI*2); g.stroke();
    }
  }else if(S2.k === 1){
    g.beginPath(); g.moveTo(70, cy); g.lineTo(px - 16, cy);
    g.arc(px, cy, 16, Math.PI, 0, true); g.stroke();
  }else{
    g.beginPath(); g.moveTo(70, cy); g.lineTo(px + 14, cy); g.stroke();
  }
  g.restore();
  box(g, 24, cy - 10, 46, 20, 7, C.L, null, 0);
  /* 焊锡 */
  g.save(); g.fillStyle = P.metalL || C.metalL; g.globalAlpha = .85;
  g.beginPath(); g.ellipse(px, cy, S2.k === 2 ? 15 : 18, S2.k === 2 ? 8 : 13, 0, 0, Math.PI*2);
  g.fill(); g.restore();
  txt(g, '焊锡', px + 28, cy - 26, {sz:8.5, c:C.tx3, al:'left'});

  /* 强度条 */
  box(g, 22, 132, 316, 46, 6, C.box, C.boxLine, 1);
  txt(g, '强度', 40, 155, {sz:9, c:C.tx3, al:'left'});
  for(let i = 0; i < 3; i++){
    const on = i < it.lv;
    box(g, 78 + i * 84, 144, 74, 22, 4,
        on ? (it.lv === 3 ? C.okbg : it.lv === 2 ? C.accbg : C.errbg) : C.box,
        on ? (it.lv === 3 ? C.ok : it.lv === 2 ? C.acc : C.err) : C.boxLine, on ? 1.5 : 1);
  }
  txt(g, it.s, 300, 155, {sz:10, b:1,
      c: it.lv === 3 ? C.ok : it.lv === 2 ? C.acc : C.err, al:'right'});
  bar(g, it.bar[0], it.bar[1], it.lv === 3 ? 'ok' : it.lv === 1 ? 'err' : null);
}
function note2(){
  const it = SOL[S2.k];
  $('s2a').textContent = it.t;
  $('s2b').textContent = it.s;
  $('s2c').textContent = it.use;
  const H = [
    '<div class="st good">绕焊：强度最高</div>' +
    '<b>把导线绕在接线端子上再焊。</b>' +
    '导线先在端子上绕几圈，<b>机械上已经咬住了</b>，焊锡再把接触面封起来。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>两件事分工明确</b>：绕提供<b>机械强度</b>（拉不开），' +
    '焊锡提供<b>电气连接和防氧化</b>（不接触不良）。' +
    '<span class="sub">正式的、要长期可靠的连接都用这一种。</span></div>',

    '<div class="st">钩焊：强度低于绕焊，但操作简便</div>' +
    '书上原话：<b>钩焊是将导线弯成钩形钩在接线端子上，' +
    '用钳子夹紧后再焊，这种方法的强度低于绕焊，操作简便。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>关键是「用钳子夹紧」这一步</b> —— 钩上去不夹紧的话，' +
    '钩就是个松套，和搭焊没什么区别。' +
    '<span class="sub">夹紧之后钩和端子之间就有了机械咬合，' +
    '虽然不如绕几圈那么牢，但省事很多。</span></div>',

    '<div class="st bad">搭焊：最方便，也最不可靠</div>' +
    '书上原话：<b>搭焊是用焊锡把导线搭接在接线端子上直接焊接，' +
    '仅用于临时连接或不便于缠、钩的地方及某些接插件，' +
    '这种连接最方便，但强度及可靠性最差。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>它完全靠焊锡本身撑着</b> —— 而焊锡又软又脆，' +
    '振动几下、受一点拉力就开裂。' +
    '<span class="sub">开裂之后往往<b>不是完全断开，而是接触时好时坏</b> ——' +
    '这种间歇性故障最难查。所以除非实在没法缠、没法钩，别用搭焊。</span></div>'
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
   场景 3：220 与 380
   ================================================================ */
const REC = [
  {t:'220 V', wax:1, tape:1,
   bar:['先包缠一层黄蜡带（或涤纶薄膜带），再包缠一层绝缘胶带', '恢复后的强度应不低于原有绝缘层']},
  {t:'380 V', wax:3, tape:2,
   bar:['先包缠两三层黄蜡带（或涤纶薄膜带），再包缠两层绝缘胶带', '电压高一倍，绝缘要厚好几倍 —— 这不是线性的']},
  {t:'热收缩管', wax:0, tape:0,
   bar:['另一种恢复方法：套热收缩管，用电吹风加热收缩', '简便、高效，能有效保护连接处，避免受潮污垢和腐蚀']}
];
const S3 = { k:0 };
const st3 = new Stage('cv2', 360, CANH);

function draw3(){
  const g = st3.g; st3.clear();
  const it = REC[S3.k];
  EP.heading(g, 12, 14, '绝缘层的恢复', it.t);
  const cy = 84;
  /* 线芯 */
  g.save();
  g.strokeStyle = P.copper || C.cop; g.lineWidth = 8; g.lineCap = 'round';
  g.beginPath(); g.moveTo(40, cy); g.lineTo(320, cy); g.stroke(); g.restore();
  box(g, 24, cy - 13, 60, 26, 8, C.L, null, 0);
  box(g, 276, cy - 13, 60, 26, 8, C.N, null, 0);
  if(S3.k === 2){
    /* 热收缩管 */
    box(g, 92, cy - 17, 176, 34, 10, '#2b3038', '#4a525c', 1.4);
    txt(g, '热收缩管', 180, cy, {sz:10, b:1, c:C.tx2});
  }else{
    /* 一层一层往外包 */
    let r = 12;
    for(let i = 0; i < it.wax; i++){
      r += 6;
      box(g, 92 - i*4, cy - r, 176 + i*8, r*2, r*0.55, '#c8a02e', null, 0);
    }
    for(let i = 0; i < it.tape; i++){
      r += 6;
      box(g, 88 - i*4, cy - r, 184 + i*8, r*2, r*0.55, '#22262c', '#3a4048', 1);
    }
    txt(g, it.wax + ' 层黄蜡带', 180, cy - r - 12, {sz:9, b:1, c:'#c8a02e'});
    txt(g, it.tape + ' 层绝缘胶带', 180, cy + r + 16, {sz:9, b:1, c:C.tx2});
  }
  box(g, 22, 148, 316, 40, 6, S3.k === 1 ? C.warnbg : C.accbg,
      S3.k === 1 ? C.warn : C.acc, 1.2);
  txt(g, S3.k === 2 ? '热收缩管：套上去，用电吹风加热收缩'
                    : it.t + ' → ' + it.wax + ' 层黄蜡带 ＋ ' + it.tape + ' 层绝缘胶带',
      180, 163, {sz:11, b:1, c: S3.k === 1 ? C.warn : C.acc});
  txt(g, '恢复后的强度应不低于原有绝缘层', 180, 180, {sz:8.5, c:C.tx2});
  bar(g, it.bar[0], it.bar[1], S3.k === 1 ? 'warn' : 'ok');
}
function note3(){
  const it = REC[S3.k];
  $('s3a').textContent = it.t;
  $('s3b').textContent = S3.k === 2 ? '—' : (it.wax === 1 ? '一层' : '两三层');
  $('s3c').textContent = S3.k === 2 ? '—' : (it.tape === 1 ? '一层' : '两层');
  const H = [
    '<div class="st">220 V：各一层</div>' +
    '书上原话：<b>在一般情况下，220 V 线路恢复导线绝缘时，' +
    '应先包缠一层黄蜡带（或涤纶薄膜带），再包缠一层绝缘胶带。</b>' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>为什么要两种带子叠着包</b>：' +
    '<b>黄蜡带绝缘性能好，但不粘、机械强度差</b>；' +
    '<b>绝缘胶带粘、耐磨，但单靠它绝缘裕度不够</b>。' +
    '<span class="sub">里面一层管绝缘，外面一层管固定和保护 —— 缺一层都不行。</span></div>',

    '<div class="st bad">380 V：两三层黄蜡带 + 两层绝缘胶带</div>' +
    '书上原话：<b>380 V 线路恢复绝缘时，先包缠两三层黄蜡带（或涤纶薄膜带），' +
    '再包缠两层绝缘胶带，同时，应严格按照规范缠绕。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>电压高一倍，绝缘层要厚好几倍</b> —— 这不是线性关系。' +
    '<span class="sub">「应严格按照规范缠绕」这句是书上加重的：' +
    '380 V 的接头一旦绝缘不够，击穿就是相间短路，' +
    '<b>那是弧光和跳闸，不是漏一点电的问题</b>。</span></div>',

    '<div class="st good">另一种：热收缩管</div>' +
    '书上原话：<b>使用热收缩管恢复线缆的绝缘层是一种简便、高效的操作方法，' +
    '可以有效地保护连接处，避免受潮、污垢和腐蚀。</b>' +
    '<div class="tip info" style="margin-top:8px">' +
    '做法：<b>将热收缩管滑至线缆的连接处 → 用电吹风机的热风口对准热收缩管加热，' +
    '使其缩至与线缆贴合。</b>' +
    '<span class="sub"><b>限制是它必须提前套上去</b>（上一屏那条）。' +
    '已经接好的接头没法补套 —— 那时候只能用包缠法。</span></div>'
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
   场景 4：怎么包
   ================================================================ */
const WRAP = [
  {t:'从哪儿起',
   bar:['从完整绝缘层处开始，距连接点两根带宽的位置', '从裸线那儿起缠的话，带子边缘一翘铜就露出来了']},
  {t:'压 1/2 带宽',
   bar:['每圈的绝缘胶带应覆盖住前一圈胶带一半的位置', '包裹线缆时间距应为 1/2 带宽 —— 这样才没有缝']},
  {t:'T 形分支点',
   bar:['离分支点两根带宽处，以与导线倾斜 55° 角开始缠', '缠到分支点时紧贴线芯沿支路缠，超出两个带宽后向回包']}
];
const S4 = { k:0 };
const st4 = new Stage('cv3', 360, CANH);

function draw4(){
  const g = st4.g; st4.clear();
  const it = WRAP[S4.k];
  EP.heading(g, 12, 14, '包缠的手法', it.t);
  const cy = 84;
  if(S4.k < 2){
    /* 一根线，中间是接头 */
    g.save();
    g.strokeStyle = P.copper || C.cop; g.lineWidth = 8; g.lineCap = 'round';
    g.beginPath(); g.moveTo(120, cy); g.lineTo(240, cy); g.stroke(); g.restore();
    box(g, 24, cy - 13, 96, 26, 8, C.L, null, 0);
    box(g, 240, cy - 13, 96, 26, 8, C.N, null, 0);
    if(S4.k === 0){
      dim(g, 84, 120, cy + 34, '两根带宽');
      g.save(); g.fillStyle = '#22262c'; g.strokeStyle = '#4a525c'; g.lineWidth = 1;
      g.fillRect(84, cy - 16, 18, 32); g.strokeRect(84, cy - 16, 18, 32); g.restore();
      txt(g, '从这儿起缠', 84, cy - 30, {sz:9, b:1, c:C.acc});
      txt(g, '完整绝缘层上', 60, cy + 54, {sz:8.5, c:C.tx3});
    }else{
      /* 压 1/2 带宽：一圈一圈叠 */
      for(let i = 0; i < 11; i++){
        const x = 84 + i * 16;
        g.save(); g.globalAlpha = .88;
        g.fillStyle = i % 2 ? '#2b3038' : '#22262c';
        g.strokeStyle = '#4a525c'; g.lineWidth = 1;
        g.fillRect(x, cy - 17, 30, 34); g.strokeRect(x, cy - 17, 30, 34);
        g.restore();
      }
      dim(g, 84, 114, cy + 38, '一根带宽');
      dim(g, 100, 130, cy + 60, '压 1/2', C.warn);
    }
  }else{
    /* T 形分支 */
    g.save();
    g.strokeStyle = P.copper || C.cop; g.lineWidth = 8; g.lineCap = 'round';
    g.beginPath(); g.moveTo(30, cy); g.lineTo(330, cy); g.stroke();
    g.beginPath(); g.moveTo(180, cy); g.lineTo(180, cy + 66); g.stroke(); g.restore();
    /* 胶带：主路一段 + 55° 起缠 */
    for(let i = 0; i < 7; i++){
      const x = 96 + i * 14;
      g.save(); g.globalAlpha = .85;
      g.translate(x, cy); g.rotate(-0.61);   /* 55° 与导线的夹角 */
      g.fillStyle = '#22262c'; g.strokeStyle = '#4a525c'; g.lineWidth = 1;
      g.fillRect(-13, -22, 26, 44); g.strokeRect(-13, -22, 26, 44);
      g.restore();
    }
    dim(g, 68, 96, cy - 44, '两根带宽');
    txt(g, '55°', 122, cy - 32, {sz:10, b:1, c:C.warn});
    txt(g, '缠到分支点时', 200, cy + 40, {sz:9, c:C.tx2, al:'left'});
    txt(g, '紧贴线芯沿支路缠', 200, cy + 54, {sz:9, c:C.tx2, al:'left'});
    txt(g, '支路', 168, cy + 56, {sz:8.5, c:C.tx3, al:'right'});
  }
  /* T 形那一档不再画中间那个说明条 —— 它和底下的结论条讲的是同一句话（截图抓到的） */
  if(S4.k !== 2){
    box(g, 22, 152, 316, 40, 6, C.accbg, C.acc, 1.2);
    txt(g, S4.k === 0 ? '从完整绝缘层处开始，距连接点两根带宽'
                      : '每圈覆盖住前一圈一半 —— 间距 1/2 带宽',
        180, 167, {sz:10.5, b:1, c:C.acc});
    txt(g, '背对线端缠绕，包缠至另一端', 180, 183, {sz:8.5, c:C.tx2});
  }
  bar(g, it.bar[0], it.bar[1], 'ok', S4.k === 2 ? 176 : 206);
}
function note4(){
  const it = WRAP[S4.k];
  $('s4a').textContent = '两根带宽';
  $('s4b').textContent = '1/2 带宽';
  $('s4c').textContent = '55°';
  const H = [
    '<div class="st">① 从完整绝缘层处开始，距连接点两根带宽</div>' +
    '书上原话：<b>包缠时须从完整绝缘层处开始包缠，' +
    '一般从距连接点两根带宽的绝缘层位置包缠，背对线端缠绕包缠至另一端。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>这一条最容易被忽略。</b>从裸线那儿开始缠的话，' +
    '起点那一圈下面就是铜 —— <b>带子的边缘一翘，铜就露出来了</b>。' +
    '<span class="sub">压住原有绝缘层两根带宽，等于把新旧绝缘搭接起来，' +
    '这才叫「恢复」。<b>两端都要这么做。</b></span></div>',

    '<div class="st">② 每圈压住前一圈的一半</div>' +
    '书上原话：<b>缠绕时，每圈的绝缘胶带应覆盖住前一圈胶带一半的位置；' +
    '在包裹线缆时，间距应为 1/2 带宽。</b>' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>为什么必须压一半</b>：不压的话圈与圈之间会有缝，' +
    '缝里就是裸铜；压得太多又太费带子、接头变得很粗。' +
    '<b>压 1/2 正好让每一处都被两层带子覆盖。</b>' +
    '<span class="sub">这也是为什么算层数时说「一层」——' +
    '按压 1/2 缠一遍，实际厚度已经是两层带子了。</span></div>',

    '<div class="st">③ 分支点：55° 起缠，超出两个带宽后回缠</div>' +
    '书上原话：<b>离分支点两根带宽处，以与导线倾斜 55° 角、每层压 1/2 带宽的方式开始缠绕，' +
    '缠绕至分支点时紧贴线芯沿支路缠绕；超出支路连接处两个带宽后向回包缠，' +
    '再沿主路继续包缠至另一端。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>那个 55° 是为了让带子在拐弯处贴得住</b>：' +
    '垂直缠到分支点就拐不过去了，斜着缠才能顺着支路的方向滑过去。' +
    '<span class="sub">T 形和十字形分支的走法书上都画了（图 6-29）：' +
    '<b>过去一遍、回来一遍</b>，分支点那一处会被缠好几层 ——' +
    '那正是最需要保护的地方。</span></div>'
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

ElecNav.init({ch:6, sec:'6.4'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('6.4');
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
