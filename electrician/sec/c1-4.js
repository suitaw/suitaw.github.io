/* 电池那三处用的是 volt:'12V' 不是 label:'12V'：
   EP.cell 的电池**身上本来就印着一个电压**（默认 '1.5V'），
   再挂一个外部标注就是两个数字打架，位置上还正好叠在一起。
/* 1.4 电路的连接方式 —— 本节内容的唯一真相。
   由 c1-4.html 机械拆分而来（正文一个字未改）。
   book.html 按需载入它；c1-4.html 现在只是个薄壳，也载入它。 */
(function(){
'use strict';
ELEC.reg({
  id: '1.4',
  file: 'c1-4.html',
  title: '1.4 电路的连接方式',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>串联</button>
    <button class="tab" data-i="1"><span class="n">2</span>并联</button>
    <button class="tab" data-i="2"><span class="n">3</span>混联</button>
    <button class="tab" data-i="3"><span class="n">4</span>认一认</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">串联：一条路走到黑</div>
    几个负载<b>首尾相接</b>连成一串，电流只有一条路可走。
    <b>点一下任意一个灯泡，把它「拧坏」试试。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns">
        <button class="btn big go" id="s1sw">合上开关</button>
        <button class="btn sm" id="s1fix">全部换新</button>
      </div>
      <div class="rowlab">直接点画面里的灯泡，可以把它弄坏 / 修好</div>
      <div class="nums three">
        <div class="num"><div class="k">每个灯泡分到</div><div class="v" id="s1u">—</div></div>
        <div class="num"><div class="k">电流 I（处处相同）</div><div class="v" id="s1i">—</div></div>
        <div class="num"><div class="k">总电阻</div><div class="v" id="s1r">—</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">串联的三条规矩</div>
    <div id="f1"></div>
    <ol style="margin:8px 0 0;padding-left:20px;font-size:.87rem;line-height:1.95">
      <li><b>电流处处相等</b>：只有一条路，前面流过多少，后面就流过多少。</li>
      <li><b>电压分着用</b>：各段电压加起来等于电源电压。<b>电阻大的分得多。</b></li>
      <li><b>断一处，全灭</b>：任何一点断开，整条路都没电流。</li>
    </ol>
    <div class="tip">
      <b>哪儿见得到串联？</b>开关和它控制的灯就是串联的（所以开关一断，灯就灭）；
      熔断器（保险丝）也串在线路里；老式的串灯（一个坏了整串不亮）也是。
      <span class="sub">串联最要紧的用途，就是「我要能切断你」——开关、熔断器、热继电器，全都串在回路里。</span>
    </div>
  </div>

  <div class="bet" data-bet="c14-ser" data-q="三个一样的灯泡串在 12V 上，每个灯泡两端是多少伏？"
       data-opts="12V，都是电源电压|4V，三个平分|36V，加起来" data-right="1"
       data-after="12 ÷ 3 = 4V。串联是「分」电压，不是每个都拿到全部。也正因为如此，串联的灯比单独接要暗得多——上面画面里它们就是暗的。"></div>
</section>

<!-- ================= 场景 2：并联 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">并联：各走各的路</div>
    几个负载<b>两端都接在同一对线上</b>，各自有独立的通路。
    <b>同样点一下灯泡，弄坏一个看看其他的。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns">
        <button class="btn big go" id="s2sw">合上开关</button>
        <button class="btn sm" id="s2fix">全部换新</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">每个灯泡两端</div><div class="v" id="s2u">—</div></div>
        <div class="num"><div class="k">每支路电流</div><div class="v" id="s2i">—</div></div>
        <div class="num hi"><div class="k">干路总电流</div><div class="v" id="s2it">—</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">并联的三条规矩</div>
    <ol style="margin:6px 0 0;padding-left:20px;font-size:.87rem;line-height:1.95">
      <li><b>电压都一样</b>，都等于电源电压 —— 所以每个灯都够亮。</li>
      <li><b>电流分着走</b>：干路电流 = 各支路之和。<b>电阻小的分得多。</b></li>
      <li><b>坏一个不影响别的</b>，其他支路照常工作。</li>
    </ol>
    <div class="tip">
      <b>你家所有的电器都是并联的。</b>这样每个插座都是 220V，
      关掉电视不会影响冰箱。<br>
      <b>代价是：</b>每多开一件电器，<b>干路电流就往上加一截</b>。
      插排上插满取暖器、电水壶，烧的不是电器，是那根插排的线 ——
      这条以后在「导线载流量」「一机一闸」里还会再遇到。
    </div>
  </div>

  <div class="bet" data-bet="c14-par" data-q="家里同时开的电器越多，总干路电流会怎样？"
       data-opts="不变，反正都是 220V|变大，各支路电流要加起来|变小，被分掉了" data-right="1"
       data-after="并联时电压不变，但每加一件电器就多一条支路，干路要把它们全部加起来。这就是空开会「跳闸」的原因——它管的是干路上那个总电流。"></div>
</section>

<!-- ================= 场景 3：混联 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">混联：又串又并</div>
    实际线路基本都是混联。这就是书上第 9 页那张图：
    <b>EL1-EL2 串成一路，EL3-EL4 串成另一路，两路并联，再和 EL5 串起来。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3sw">
        <button class="btn on" data-s="1">S1（总开关）</button>
        <button class="btn on" data-s="2">S2（上支路）</button>
        <button class="btn on" data-s="3">S3（下支路）</button>
      </div>
      <div class="rowlab">点开关可以断开/合上；也可以直接点灯泡把它弄坏</div>
      <div class="nums">
        <div class="num"><div class="k">干路电流</div><div class="v" id="s3it">—</div></div>
        <div class="num"><div class="k">EL5 两端电压</div><div class="v" id="s3u5">—</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">拆混联的办法：从里往外看</div>
    <ol style="margin:6px 0 0;padding-left:20px;font-size:.87rem;line-height:1.95">
      <li>先找<b>串在一起的</b>：EL1+EL2 是一路，EL3+EL4 是一路。</li>
      <li>再看这两路是<b>并</b>着的 —— 两端接在同两个点上。</li>
      <li>最后整块再和 <b>EL5 串</b>在干路上。</li>
    </ol>
    <div class="tip">
      <b>为什么 EL5 最亮？</b>因为干路的电流全部要经过它，
      而两条支路各自只分到一半。<b>串在干路上的东西「感受」到的是总电流</b> ——
      总开关、总熔断器、电能表都装在干路上，就是这个道理。
    </div>
  </div>
</section>

<!-- ================= 场景 4：认一认 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">拿到图，第一件事是认连接方式</div>
    看不出串并，后面所有分析都无从下手。三个判断口诀：
    <b>能不能各走各的路。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4pick">
        <button class="btn on" data-i="0">例 1</button>
        <button class="btn" data-i="1">例 2</button>
        <button class="btn" data-i="2">例 3</button>
      </div>
      <div class="btns">
        <button class="btn" data-a="ser">这是串联</button>
        <button class="btn" data-a="par">这是并联</button>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">三个一眼认出的办法</div>
    <ol style="margin:6px 0 0;padding-left:20px;font-size:.87rem;line-height:1.95">
      <li><b>顺着电流走一遍</b>：路上没有岔口 → 串联；有岔口分开又汇合 → 并联。</li>
      <li><b>看两端接在哪</b>：两个元件的两头都接在同一对节点上 → 并联。</li>
      <li><b>拿掉一个想一想</b>：拿掉它别的就不工作了 → 串联；别的照常 → 并联。</li>
    </ol>
  </div>

  <div class="quiz" data-quiz="c1-4">
    <div class="qz" data-q="两个阻值相同的灯泡串联接在 220V 上，每个灯泡两端的电压是多少？"
         data-opts="220V|110V|440V"
         data-right="1"
         data-why="串联分压，阻值相同就平分：220 ÷ 2 = 110V。每个灯都只有额定电压的一半，会明显偏暗——这也是判断「是不是被误接成串联」的现象之一。"></div>
    <div class="qz" data-q="家里客厅灯坏了，卧室灯照常亮。这说明两盏灯是？"
         data-opts="串联|并联|说明不了"
         data-right="1"
         data-why="一个坏了不影响另一个，是并联的典型特征。家庭照明和插座全部采用并联，就是为了让每一路都能独立工作、并且都拿到完整的 220V。"></div>
    <div class="qz" data-q="开关和它控制的那盏灯，是什么连接？"
         data-opts="串联|并联|要看开关型号"
         data-right="0"
         data-why="开关必须串在回路里，断开时才能切断这条路的电流。如果把开关并在灯两端，合上开关反而会把灯短路——灯灭了，但电流暴涨，是危险接法。"></div>
    <div class="qz" data-q="并联电路里，哪条支路分到的电流最大？"
         data-opts="电阻最大的那条|电阻最小的那条|都一样大"
         data-right="1"
         data-why="并联时各支路电压相同，I = U/R，R 越小 I 越大。极端情况 R→0 就是短路：电流大到没有上限，正是熔断器和空开要防的事。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 1 章 1.4 节（书内 P7~P9）<br>混联那张图按书上第 9 页的结构画</div>
</section>`,
  /* EC 由外壳传入：是全局 EC 的副本，只把 loop 换成可停版本。
     这里同名遮蔽，所以正文里的 `= EC` 和 `EC.xxx` 都自动走包装版。 */
  init: function(EC){
'use strict';
const {C, Path, Stage, dots, txt, box, tag, head, node, tw,
       battery, lamp, resistor, switchSym, meter, loop, $} = EC;

const E = 12, RL = 8;                 /* 电源 12V，每个灯泡 8Ω */
const PFULL = E*E/RL;                 /* 灯泡拿到全电压时的功率，用来折算亮度 */
function bright(P){ return Math.max(0, Math.min(1, Math.sqrt(P/PFULL))); }

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
   场景 1：串联
   ================================================================ */
const S1 = { on:false, dead:[false,false,false], ph:0 };
const st1 = new Stage('cv0', 360, 250);
const LP1 = [110, 180, 250];          /* 三个灯在上边的 x */
const RC1 = { x0:44, x1:316, y0:70, y1:186 };
const P1 = new Path([[RC1.x0,110],[RC1.x0,RC1.y0],[RC1.x1,RC1.y0],
                     [RC1.x1,RC1.y1],[RC1.x0,RC1.y1],[RC1.x0,128]]);

function calc1(){
  const broken = S1.dead.some(function(d){ return d; });
  const ok = S1.on && !broken;
  const I = ok ? E/(3*RL) : 0;
  return { ok:ok, I:I, U:I*RL, broken:broken };
}
function draw1(dt){
  const g = st1.g; st1.clear();
  EP.heading(g, 20, 22, '实物接线图', '（点灯泡可以把它弄坏）');
  const v = calc1();
  if(v.ok) S1.ph += v.I * 90 * dt;

  P1.stroke(g, 3.2, v.ok ? C.wire : '#9aa4ae');
  if(!S1.on){
    g.save(); g.strokeStyle = C.bg; g.lineWidth = 5;
    g.beginPath(); g.moveTo(162, RC1.y1); g.lineTo(198, RC1.y1); g.stroke(); g.restore();
  }
  /* 坏掉的灯泡：把那一段挖开，表示断路 */
  S1.dead.forEach(function(d, i){
    if(!d) return;
    g.save(); g.strokeStyle = C.bg; g.lineWidth = 6;
    g.beginPath(); g.moveTo(LP1[i]-13, RC1.y0); g.lineTo(LP1[i]+13, RC1.y0); g.stroke(); g.restore();
  });

  const skip = LP1.map(function(x){
    const s = segAt(P1, x, RC1.y0); return [s-17, s+17];
  }).concat([[0,10],[P1.len-10,P1.len],
             [segAt(P1,180,RC1.y1)-20, segAt(P1,180,RC1.y1)+20]]);
  EP.flow(g, P1, {phase:v.ok ? S1.ph : 0, gap:52,
               kind:'cur', skip:skip});

  EP.cell(g, RC1.x0, 119, 44, 21, {horiz:false, pm:false, volt:'12V'});
  EP.knife(g, 180, RC1.y1, S1.on, {w:52, h:22});
  /* 标签放开关**左边**：拨杆是从左端往右上抬的，正上方（原来的位置）必被穿过去，
     正下方又贴着画布底边 —— 左边这一块是回路内部的空白，怎么扳都够不着（截图抓到的）*/
  txt(g, S1.on ? '开关合上' : '开关断开', 148, RC1.y1-16,
      {sz:10.5, b:1, c:S1.on?C.ok:C.err, al:'right'});

  LP1.forEach(function(x, i){
    const dead = S1.dead[i];
    const b = (v.ok && !dead) ? bright(v.I*v.I*RL) : 0;
    EP.lampHolder(g, x, RC1.y0-8, 30, 16);
    EP.bulb(g, x, RC1.y0-27, 13, b);
    txt(g, 'EL' + (i+1), x, RC1.y0+22, {sz:10.5, c:C.tx2});
    if(dead) txt(g, '✕ 坏了', x, RC1.y0+38, {sz:10, b:1, c:C.err});
    else if(v.ok) txt(g, v.U.toFixed(1) + ' V', x, RC1.y0+38, {sz:10.5, b:1, c:C.acc});
  });

  box(g, 20, 208, 320, 30, 6, v.ok ? C.okbg : C.errbg, C.boxLine, 1);
  const msg = !S1.on ? '开关断开 —— 整条路没有电流'
            : v.broken ? '一个灯泡坏了 → 三个全灭（这就是串联的毛病）'
            : '电流处处 ' + v.I.toFixed(2) + ' A，每个灯分到 ' + v.U.toFixed(1) + ' V（三个平分 12V）';
  txt(g, msg, 180, 223, {sz:11, b:1, c:v.ok ? C.ok : C.err});
}
function segAt(path, x, y){
  let best = 0, bd = 1e9;
  for(let s=0; s<=path.len; s+=1){
    const p = path.at(s), d = Math.hypot(p[0]-x, p[1]-y);
    if(d < bd){ bd = d; best = s; }
  }
  return best;
}
st1.cv.addEventListener('click', function(ev){
  const p = st1.pick(ev);
  LP1.forEach(function(x, i){
    if(Math.hypot(p[0]-x, p[1]-RC1.y0) < 24){ S1.dead[i] = !S1.dead[i]; note1(); }
  });
});
function note1(){
  const v = calc1();
  $('s1u').textContent = v.ok ? v.U.toFixed(1) + ' V' : '0 V';
  $('s1i').textContent = v.I.toFixed(2) + ' A';
  $('s1r').textContent = (3*RL) + ' Ω';
  $('n0').innerHTML = !S1.on
    ? '<div class="st">先把开关合上</div>开关也是串在这条路上的 —— 它一断，整条路就断了。'
    : v.broken
      ? '<div class="st bad">一个坏了，三个全灭</div>'+
        '串联只有一条通路，任何一处断开（灯丝烧断、接头松脱、开关断开）都会让<b>整条路的电流变成 0</b>。<br>'+
        '老式串灯就是这么让人头疼的：一整串不亮，得一个一个试过去才知道是哪个坏了。'+
        '<span class="sub">再点一下那个灯泡可以把它换新。</span>'
      : '<div class="st good">通了：电流一条路，电压三家分</div>'+
        '电流处处都是 <span class="key">'+v.I.toFixed(2)+' A</span>（没有岔路，只能这样）；'+
        '12V 被三个灯<b>平分</b>，每个 <span class="key">'+v.U.toFixed(1)+' V</span>。<br>'+
        '所以它们比单独接一个灯要<b>暗得多</b> —— 你在画面上就能看出来。'+
        '<span class="sub">现在点任意一个灯泡，把它弄坏试试。</span>';
}

/* ================================================================
   场景 2：并联
   ================================================================ */
const S2 = { on:false, dead:[false,false,false], ph:0 };
const st2 = new Stage('cv1', 360, 268);
const BR = [96, 176, 256];            /* 三条支路的 x */
const RC2 = { yTop:76, yBot:196, xL:44 };

function calc2(){
  const alive = S2.on ? S2.dead.filter(function(d){ return !d; }).length : 0;
  const Ib = S2.on ? E/RL : 0;
  return { alive:alive, Ib:Ib, It:Ib*alive };
}
function draw2(dt){
  const g = st2.g; st2.clear();
  EP.heading(g, 20, 22, '实物接线图', '（弄坏一个看看别的）');
  const v = calc2();
  if(v.It > 0) S2.ph += 60 * dt;

  /* 干路 */
  const main = new Path([[RC2.xL,120],[RC2.xL,RC2.yTop],[BR[2]+8,RC2.yTop]]);
  const back = new Path([[BR[2]+8,RC2.yBot],[RC2.xL,RC2.yBot],[RC2.xL,138]]);
  main.stroke(g, 3.2, C.wire); back.stroke(g, 3.2, C.wire);
  if(!S2.on){
    g.save(); g.strokeStyle = C.bg; g.lineWidth = 5;
    g.beginPath(); g.moveTo(58, RC2.yTop); g.lineTo(94, RC2.yTop); g.stroke(); g.restore();
  }
  if(v.It > 0){
    EP.flow(g, main, {phase:S2.ph, gap:52, kind:'cur', skip:[[0,10],[6,44]]});
    EP.flow(g, back, {phase:-S2.ph, gap:52, kind:'cur', skip:[[back.len-10,back.len]]});
  }

  EP.cell(g, RC2.xL, 129, 44, 21, {horiz:false, pm:false, volt:'12V'});
  EP.knife(g, 78, RC2.yTop, S2.on, {w:46, h:20});
  /* 同 1.4 屏 1：标签一律挪到闸刀**左侧**，拨杆是往右上抬的，够不着这儿 */
  txt(g, S2.on ? '合上' : '断开', 48, RC2.yTop-12, {sz:10, c:EP.P.inkL, al:'right'});

  /* 三条支路 */
  BR.forEach(function(x, i){
    const dead = S2.dead[i], live = S2.on && !dead;
    const br = new Path([[x,RC2.yTop],[x,RC2.yBot]]);
    br.stroke(g, 3, dead ? '#3a4551' : C.wire);
    if(dead){
      g.save(); g.strokeStyle = C.bg; g.lineWidth = 6;
      g.beginPath(); g.moveTo(x, 122); g.lineTo(x, 148); g.stroke(); g.restore();
    }
    if(live) EP.flow(g, br, {phase:S2.ph, gap:52, kind:'cur', skip:[[18,76]]});
    node(g, x, RC2.yTop); node(g, x, RC2.yBot);
    EP.lampHolder(g, x, 132, 28, 15);
    EP.bulb(g, x, 114, 13, live ? 1 : 0);
    /* 标签一律放支路右边，别居中——居中会被那根竖导线穿过去 */
    txt(g, 'EL' + (i+1), x+15, 112, {sz:10.5, c:C.tx2, al:'left'});
    if(dead) txt(g, '✕ 坏了', x+15, 160, {sz:10, b:1, c:C.err, al:'left'});
    else if(live) txt(g, '12V / ' + v.Ib.toFixed(1) + 'A', x+15, 160, {sz:10, b:1, c:C.acc, al:'left'});
  });

  txt(g, '干路', 48, RC2.yTop-26, {sz:10, c:C.tx3, al:'right'});
  box(g, 20, 214, 320, 44, 6, v.It>0 ? C.okbg : C.card, C.boxLine, 1);
  txt(g, S2.on ? ('亮着 ' + v.alive + ' 个 → 干路电流 = ' +
        (v.alive ? Array(v.alive).fill(v.Ib.toFixed(1)).join(' + ') : '0') +
        ' = ' + v.It.toFixed(1) + ' A')
      : '开关断开', 180, 230, {sz:11, b:1, c:v.It>0 ? C.ok : C.tx2});
  txt(g, '每个灯都拿到完整的 12V —— 所以都是全亮，不像串联那样发暗',
      180, 249, {sz:10, c:C.tx3});
}
st2.cv.addEventListener('click', function(ev){
  const p = st2.pick(ev);
  BR.forEach(function(x, i){
    if(Math.hypot(p[0]-x, p[1]-136) < 24){ S2.dead[i] = !S2.dead[i]; note2(); }
  });
});
function note2(){
  const v = calc2();
  $('s2u').textContent = S2.on ? '12 V' : '0 V';
  $('s2i').textContent = S2.on ? v.Ib.toFixed(1) + ' A' : '0 A';
  $('s2it').textContent = v.It.toFixed(1) + ' A';
  const deadN = S2.dead.filter(function(d){ return d; }).length;
  $('n1').innerHTML = !S2.on
    ? '<div class="st">先把开关合上</div>这个开关在干路上，管着全部三条支路。'
    : deadN
      ? '<div class="st good">坏了 '+deadN+' 个，其他照亮</div>'+
        '这就是并联最大的好处：<b>每条支路互不影响</b>。<br>'+
        '干路电流从 '+(3*v.Ib).toFixed(1)+'A 降到了 <span class="key">'+v.It.toFixed(1)+' A</span> —— '+
        '少了一条支路，少了一份电流。'
      : '<div class="st good">三个都是 12V，都全亮</div>'+
        '并联时每个灯泡两端都是电源电压 <span class="key">12V</span>，各自 '+v.Ib.toFixed(1)+'A；'+
        '干路电流是它们的和：<span class="key">'+v.It.toFixed(1)+' A</span>。<br>'+
        '<b>注意干路那根线</b> —— 它要承受三倍的电流。'+
        '<span class="sub">现在点一个灯泡把它弄坏，看别的会不会灭。</span>';
}

/* ================================================================
   场景 3：混联（书上第 9 页那张图）
   ================================================================ */
const S3 = { s:[true,true,true], dead:[false,false,false,false,false], ph:0 };
const st3 = new Stage('cv2', 360, 286);
/* EL1 EL2 在上支路，EL3 EL4 在下支路，EL5 在干路 */
const M3 = {
  xL:40, xA:150, xB:284, yU:88, yD:158, yMain:236, y5:236,
  up:[[186,88],[236,88]], dn:[[186,158],[236,158]]
};
function calc3(){
  const upOK = S3.s[1] && !S3.dead[0] && !S3.dead[1];
  const dnOK = S3.s[2] && !S3.dead[2] && !S3.dead[3];
  const el5OK = !S3.dead[4];
  if(!S3.s[0] || !el5OK || (!upOK && !dnOK)) return {I:0, upOK:upOK, dnOK:dnOK, el5OK:el5OK, U5:0, Ub:0, Ibr:0};
  const Rp = (upOK && dnOK) ? (2*RL)/2 : 2*RL;      /* 两支并联 or 只剩一支 */
  const Rt = Rp + RL;
  const I = E/Rt;
  return {I:I, upOK:upOK, dnOK:dnOK, el5OK:el5OK, U5:I*RL, Ub:I*Rp, Ibr:I*Rp/(2*RL)};
}
function draw3(dt){
  const g = st3.g; st3.clear();
  EP.heading(g, 20, 20, '实物接线图', '（书上第 9 页那个结构）');
  const v = calc3();
  if(v.I > 0) S3.ph += v.I * 90 * dt;

  /* 干路：电源 → S1 → 分叉点A ... 汇合点B → EL5 → 回电源 */
  const wires = [
    new Path([[M3.xL,150],[M3.xL,M3.yU],[M3.xA,M3.yU]]),        /* 电源+ 到 A（上） */
    new Path([[M3.xA,M3.yU],[M3.xA,M3.yD]]),                     /* A 的竖线 */
    new Path([[M3.xA,M3.yD],[M3.xA,M3.yU]]),
    new Path([[M3.xB,M3.yU],[M3.xB,M3.yD]]),                     /* B 的竖线 */
    new Path([[M3.xB,M3.yU],[M3.xB,M3.yMain],[M3.xL,M3.yMain],[M3.xL,168]]) /* B → EL5 → 电源− */
  ];
  wires.forEach(function(w){ w.stroke(g, 3, C.wire); });
  const upW = new Path([[M3.xA,M3.yU],[M3.xB,M3.yU]]);
  const dnW = new Path([[M3.xA,M3.yD],[M3.xB,M3.yD]]);
  upW.stroke(g, 3, v.upOK ? C.wire : '#3a4551');
  dnW.stroke(g, 3, v.dnOK ? C.wire : '#3a4551');

  /* 开关缺口 */
  if(!S3.s[0]){ gap(g, 92, M3.yU, 1); }
  if(!S3.s[1]){ gap(g, 260, M3.yU, 1); }
  if(!S3.s[2]){ gap(g, 260, M3.yD, 1); }
  [[0,M3.up[0][0],M3.yU],[1,M3.up[1][0],M3.yU],[2,M3.dn[0][0],M3.yD],[3,M3.dn[1][0],M3.yD]]
    .forEach(function(a){ if(S3.dead[a[0]]) gap(g, a[1], a[2], 1); });
  if(S3.dead[4]) gap(g, 162, M3.yMain, 1);

  /* 流动的点 */
  if(v.I > 0){
    EP.flow(g, wires[0], {phase:S3.ph, gap:52, kind:'cur', skip:[[0,12],[42,78]]});
    EP.flow(g, wires[4], {phase:S3.ph, gap:52, kind:'cur',
                       skip:[[wires[4].len-12,wires[4].len],
                             [segAt(wires[4],162,M3.yMain)-20, segAt(wires[4],162,M3.yMain)+20]]});
    const skB = [[20,52],[70,102]];   /* 两个灯泡各占一段，别让点画到灯上 */
    if(v.upOK) EP.flow(g, upW, {phase:S3.ph, gap:52, kind:'cur', skip:skB});
    if(v.dnOK) EP.flow(g, dnW, {phase:S3.ph, gap:52, kind:'cur', skip:skB});
  }

  EP.cell(g, M3.xL, 159, 42, 20, {horiz:false, pm:false, volt:'12V'});

  switchSym(g, 92, M3.yU, S3.s[0], {len:30});
  txt(g, 'S1', 92, M3.yU-15, {sz:10, c:C.tx2});
  switchSym(g, 260, M3.yU, S3.s[1], {len:26});
  txt(g, 'S2', 260, M3.yU-15, {sz:10, c:C.tx2});
  switchSym(g, 260, M3.yD, S3.s[2], {len:26});
  txt(g, 'S3', 260, M3.yD+16, {sz:10, c:C.tx2});

  node(g, M3.xA, M3.yU); node(g, M3.xA, M3.yD);
  node(g, M3.xB, M3.yU); node(g, M3.xB, M3.yD);

  const bU = v.upOK ? bright(v.Ibr*v.Ibr*RL) : 0;
  const bD = v.dnOK ? bright(v.Ibr*v.Ibr*RL) : 0;
  const b5 = (v.I>0 && v.el5OK) ? bright(v.I*v.I*RL) : 0;
  /* EL1/EL2 的名字放灯**下方**：放上方会和「上支路：…」那行字叠在一起（截图抓到的）。
     EL5 的名字放灯**左边**：上方是「下支路：…」那行、下方就是绿色读数条，只剩左边 */
  lampAt(g, M3.up[0][0], M3.yU, bU, 'EL1', S3.dead[0], 1);
  lampAt(g, M3.up[1][0], M3.yU, bU, 'EL2', S3.dead[1], 1);
  lampAt(g, M3.dn[0][0], M3.yD, bD, 'EL3', S3.dead[2], 1);
  lampAt(g, M3.dn[1][0], M3.yD, bD, 'EL4', S3.dead[3], 1);
  lampAt(g, 162, M3.yMain, b5, '', S3.dead[4], -1);
  txt(g, (S3.dead[4] ? '✕ ' : '') + 'EL5（干路）', 130, M3.yMain-18,
      {sz:10, b:S3.dead[4]?1:0, c:S3.dead[4] ? C.err : C.tx2, al:'right'});

  txt(g, '上支路：EL1 与 EL2 串联', 218, 42, {sz:10, c:C.tx3});
  /* y 只能落在 192：再往下就撞 EL5 的灯泡（灯泡上沿 202），再往上就撞 EL3/EL4 的名字（下沿 183）*/
  txt(g, '下支路：EL3 与 EL4 串联', 218, 192, {sz:10, c:C.tx3});

  box(g, 20, 256, 320, 24, 5, v.I>0 ? C.okbg : C.errbg, C.boxLine, 1);
  txt(g, v.I>0
        ? '干路 ' + v.I.toFixed(2) + ' A　EL5 分到 ' + v.U5.toFixed(1) +
          ' V　每条支路 ' + v.Ibr.toFixed(2) + ' A'
        : '这条路走不通 —— 干路上任何一处断开，全部都灭',
      180, 268, {sz:10.5, b:1, c:v.I>0 ? C.ok : C.err});
}
function gap(g, x, y, horiz){
  g.save(); g.strokeStyle = C.bg; g.lineWidth = 6;
  g.beginPath();
  if(horiz){ g.moveTo(x-13, y); g.lineTo(x+13, y); }
  else { g.moveTo(x, y-13); g.lineTo(x, y+13); }
  g.stroke(); g.restore();
}
function lampAt(g, x, y, b, name, dead, side){
  EP.lampHolder(g, x, y-7, 24, 13);
  EP.bulb(g, x, y-23, 11, dead ? 0 : b);
  if(name) txt(g, dead ? '✕ ' + name : name, x, y + (side>0 ? 20 : -40),
      {sz:10, b:dead?1:0, c:dead ? C.err : C.tx2});
}
st3.cv.addEventListener('click', function(ev){
  const p = st3.pick(ev);
  const pts = [[M3.up[0][0],M3.yU,0],[M3.up[1][0],M3.yU,1],
               [M3.dn[0][0],M3.yD,2],[M3.dn[1][0],M3.yD,3],[162,M3.yMain,4]];
  pts.forEach(function(a){
    if(Math.hypot(p[0]-a[0], p[1]-a[1]) < 22){ S3.dead[a[2]] = !S3.dead[a[2]]; note3(); }
  });
});
document.getElementById('s3sw').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  const i = +b.dataset.s - 1;
  S3.s[i] = !S3.s[i];
  b.classList.toggle('on', S3.s[i]);
  note3();
});
function note3(){
  const v = calc3();
  $('s3it').textContent = v.I.toFixed(2) + ' A';
  $('s3u5').textContent = v.U5.toFixed(1) + ' V';
  let body;
  if(v.I === 0){
    body = '<div class="st bad">现在没有电流</div>'+
      '干路上只要断一处（S1 断开、或者 EL5 坏了），<b>全部五个灯都灭</b>；'+
      '两条支路同时不通，也一样。';
  }else if(v.upOK && v.dnOK){
    body = '<div class="st good">五个灯都亮，但 EL5 最亮</div>'+
      '干路电流 <span class="key">'+v.I.toFixed(2)+' A</span> 全部经过 EL5，'+
      '到了分叉点分成两半，每条支路只有 '+v.Ibr.toFixed(2)+' A。<br>'+
      'EL5 分到 <b>'+v.U5.toFixed(1)+' V</b>，两条支路各分到 <b>'+v.Ub.toFixed(1)+' V</b>'+
      '（再由支路里的两个灯平分）。<span class="sub">试试断开 S3，看剩下那条支路会怎样。</span>';
  }else{
    body = '<div class="st warn">只剩一条支路了</div>'+
      '断掉一条支路之后，总电阻变大，<b>干路电流反而变小</b>'+
      '（'+v.I.toFixed(2)+' A）。<br>'+
      '有意思的是：剩下那条支路里的灯<b>比刚才还暗</b> —— '+
      '因为 EL5 和它串在一起，电压重新分配了。'+
      '<span class="sub">这就是混联要一层一层算的原因，不能凭感觉。</span>';
  }
  $('n2').innerHTML = body;
}

/* ================================================================
   场景 4：认一认
   ================================================================ */
const EX = [
  { t:'两个灯泡首尾相接，只有一条路', a:'ser',
    why:'顺着电流走一遍：从电源出来，穿过第一个灯，接着穿第二个，再回电源 —— 全程没有岔口，这就是串联。拿掉任何一个，另一个也灭。' },
  { t:'两个灯泡各自接在同一对线上', a:'par',
    why:'两个灯的两端都接在同一对节点上，电流走到这里分成两股、之后再汇合 —— 并联。拿掉一个，另一个照亮。' },
  { t:'开关和灯泡接在一起', a:'ser',
    why:'开关必须串在回路里才能切断电流。要是把开关并在灯两端，合上开关等于把灯短路 —— 灯灭了，但电流会大到危险。' }
];
const S4 = { i:0, ans:null };
const st4 = new Stage('cv3', 360, 210);

function draw4(){
  const g = st4.g; st4.clear();
  const e = EX[S4.i];
  txt(g, '例 ' + (S4.i+1) + '：' + e.t, 180, 22, {sz:11, b:1, c:C.tx2});

  if(S4.i === 0){
    const P = new Path([[60,110],[60,60],[300,60],[300,160],[60,160],[60,128]]);
    P.stroke(g, 3, C.wire);
    battery(g, 60, 119, {horiz:false, long:18, short:10, gap:8, pm:false});
    lamp(g, 140, 60, 13, 0.5); txt(g, '灯 A', 140, 84, {sz:10, c:C.tx2});
    lamp(g, 230, 60, 13, 0.5); txt(g, '灯 B', 230, 84, {sz:10, c:C.tx2});
    EP.flow(g, P, {phase:0, gap:52, kind:'cur',
                skip:[[0,10],[P.len-10,P.len],
                      [segAt(P,140,60)-17,segAt(P,140,60)+17],
                      [segAt(P,230,60)-17,segAt(P,230,60)+17]]});
  }else if(S4.i === 1){
    const top = new Path([[60,110],[60,60],[280,60]]);
    const bot = new Path([[280,170],[60,170],[60,128]]);
    top.stroke(g, 3, C.wire); bot.stroke(g, 3, C.wire);
    battery(g, 60, 119, {horiz:false, long:18, short:10, gap:8, pm:false});
    [150, 240].forEach(function(x, i){
      const br = new Path([[x,60],[x,170]]);
      br.stroke(g, 3, C.wire);
      node(g, x, 60); node(g, x, 170);
      lamp(g, x, 115, 13, 1);
      txt(g, i ? '灯 B' : '灯 A', x, 140, {sz:10, c:C.tx2});
    });
  }else{
    const P = new Path([[60,110],[60,60],[300,60],[300,160],[60,160],[60,128]]);
    P.stroke(g, 3, C.wire);
    battery(g, 60, 119, {horiz:false, long:18, short:10, gap:8, pm:false});
    switchSym(g, 150, 60, true, {len:34});
    txt(g, '开关', 150, 82, {sz:10, c:C.tx2});
    lamp(g, 250, 60, 13, 0.9); txt(g, '灯', 250, 84, {sz:10, c:C.tx2});
    EP.flow(g, P, {phase:0, gap:52, kind:'cur',
                skip:[[0,10],[P.len-10,P.len],
                      [segAt(P,150,60)-19,segAt(P,150,60)+19],
                      [segAt(P,250,60)-17,segAt(P,250,60)+17]]});
  }

  if(S4.ans){
    const ok = S4.ans === e.a;
    box(g, 24, 178, 312, 24, 5, ok ? C.okbg : C.errbg, ok ? C.ok : C.err, 1.2);
    txt(g, ok ? '✓ 答对了：这是' + (e.a==='ser'?'串联':'并联')
              : '✕ 不对，这是' + (e.a==='ser'?'串联':'并联'),
        180, 190, {sz:11, b:1, c: ok ? C.ok : C.err});
  }
}
function note4(){
  const e = EX[S4.i];
  $('n3').innerHTML = S4.ans
    ? '<div class="st'+(S4.ans===e.a?' good':' bad')+'">'+
      (S4.ans===e.a ? '对了' : '再想想')+'：这是'+(e.a==='ser'?'串联':'并联')+'</div>'+e.why
    : '<div class="st">先自己判断一下</div>看上面的图，'+
      '顺着电流从电源正极走一遍：<b>路上有没有岔口？</b>然后点下面两颗按钮之一。';
}
document.getElementById('s4pick').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S4.i = +b.dataset.i; S4.ans = null;
  document.querySelectorAll('#s4pick .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.i === S4.i);
  });
  note4(); draw4();
});
document.querySelectorAll('#sc3 [data-a]').forEach(function(b){
  b.addEventListener('click', function(){ S4.ans = b.dataset.a; note4(); draw4(); });
});

/* ================================================================
   绑定
   ================================================================ */
$('s1sw').addEventListener('click', function(){
  S1.on = !S1.on;
  $('s1sw').textContent = S1.on ? '断开开关' : '合上开关';
  $('s1sw').classList.toggle('go', !S1.on);
  note1();
});
$('s1fix').addEventListener('click', function(){ S1.dead = [false,false,false]; note1(); });
$('s2sw').addEventListener('click', function(){
  S2.on = !S2.on;
  $('s2sw').textContent = S2.on ? '断开开关' : '合上开关';
  $('s2sw').classList.toggle('go', !S2.on);
  note2();
});
$('s2fix').addEventListener('click', function(){ S2.dead = [false,false,false]; note2(); });

$('f1').innerHTML = ElecUI.formula({
  plain:'串联总电阻 = 各个电阻相加；总电压 = 各段电压相加',
  f:'R总 = R1 + R2 + R3　　U总 = U1 + U2 + U3',
  vars:[
    {sym:'R总',name:'总电阻',unit:'欧姆',unitSym:'Ω',what:'整条串联电路对电流的总阻碍'},
    {sym:'U总',name:'电源电压',unit:'伏特',unitSym:'V',what:'加在整条串联电路两端的电压'}
  ],
  note:'串联电路里电流处处相等，所以谁的电阻大，谁分到的电压就大（U = I·R，I 是共用的）。'
});

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:1, sec:'1.4'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('1.4');
  let h = '';
  h += nb.prev ? '<a href="'+nb.prev.f+'">‹ '+nb.prev.id+' '+nb.prev.t+'</a>'
               : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next ? '<a class="next" href="'+nb.next.f+'">'+nb.next.id+' '+nb.next.t+' ›</a>'
               : '<span>已经是最后一节</span>';
  $('pager').innerHTML = h;
})();

loop(function(dt){
  if(cur === 0) draw1(dt);
  else if(cur === 1) draw2(dt);
  else if(cur === 2) draw3(dt);
});
  }
});
})();
