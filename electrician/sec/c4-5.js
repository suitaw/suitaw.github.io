/* 4.5 原理图 ↔ 接线图 —— 本节内容的唯一真相。
   对应《零基础学电工》第 4 章（书内 P76~P78，图 4-19「符号 ↔ 实物」那一段）。

   这一节是整章的落点，也是**新手最大的坎**：
   原理图上 KM 的线圈、主触头、辅助触点分散画在三个地方，
   可**实物就是柜子里的一只接触器**。看得懂原理图、却接不上线，卡的就是这一步。

   四屏：
   ① 一个器件，图上三处   原理图那三处 ↔ 接触器实物上的三组端子
   ② 端子编号自己会说话   1/2·3/4·5/6 主触头，A1/A2 线圈，
                          **个位 1、2 ＝ 动断，个位 3、4 ＝ 动合**（EN 50005 的规则）
   ③ 接线图长什么样       按位置画 / 同一器件画在一起 / 端子排是柜内外的分界
   ④ 照着图接一遍         先主后控 → 按端子号核对 → 送电前四查

   **屏 2 是这一节最值钱的一屏**，也是唯一一屏「背下来就能直接用」的：
   辅助触点的两位数编号里，**十位是序号、个位是功能** ——
   个位 1、2 是动断，个位 3、4 是动合。所以 13/14 一定是动合、21/22 一定是动断，
   **不用查手册、不用拿表量**。热继电器的 95/96（动断）、97/98（动合）也是同一套。
   这条规则出自 EN 50005 / IEC 60947，各品牌通用。

   **不同品牌接触器的端子位置不一样，但编号一样** —— 所以接线时看编号，不看位置。
   这句是屏 2 和屏 4 共同的落点。

   画法上：接线图那张（屏 3、4 共用 `panel()`）画的是**配电箱里的实际摆放**，
   器件是一个个方块、同一个器件只有一个方块，导线按实际走向连 ——
   和原理图「按功能画、同一器件拆开画」正好相反，这个对比就是这一节的全部。 */
(function(){
'use strict';
ELEC.reg({
  id: '4.5',
  file: 'c4-5.html',
  title: '4.5 原理图 ↔ 接线图',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>一个器件三处</button>
    <button class="tab" data-i="1"><span class="n">2</span>端子编号</button>
    <button class="tab" data-i="2"><span class="n">3</span>接线图</button>
    <button class="tab" data-i="3"><span class="n">4</span>照着接一遍</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">图上画了三处，柜子里只有一只</div>
    上一节那张图里，<b>KM 出现在三个地方</b>：控制电路里的线圈、主电路里的三个主触头、
    还有并在启动按钮两端的自锁触点。<b>可柜子里就一只接触器</b> ——
    那三处全在它身上。<b>点一处，看它在实物的哪儿。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">KM 线圈</button>
        <button class="btn sm" data-k="1">KM-1 主触头</button>
        <button class="btn sm" data-k="2">KM-2 自锁触点</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">图上这处</div><div class="v" id="s1a">KM 线圈</div></div>
        <div class="num"><div class="k">在实物上</div><div class="v" id="s1b">两个小端子</div></div>
        <div class="num hi"><div class="k">端子号</div><div class="v" id="s1c">A1 / A2</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">两种图，两种画法，一个都不能少</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>原理图</th><th>接线图</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">按什么<br>排</td><td><b>按功能</b>排 —— 哪个先动作画在前面</td>
          <td><b>按位置</b>排 —— 器件在柜里怎么摆就怎么画</td></tr>
        <tr><td class="eu-s">同一个<br>器件</td><td><b>拆开画在好几处</b>（线圈、主触头、辅助触点）</td>
          <td><b>画成一个方块</b>，端子标在方块上</td></tr>
        <tr><td class="eu-s">用来<br>干嘛</td><td><b>看懂它怎么工作</b>、查故障时顺着推</td>
          <td><b>照着接线</b>、照着找哪根线接哪儿</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>两张图配套使用</b>：先用原理图搞明白「为什么这么接」，再用接线图动手接。
      <span class="sub">只看接线图，就是照葫芦画瓢，一出故障两眼一抹黑；
      只看原理图，接线时根本不知道那根线该拧到哪个螺丝上。</span>
    </div>
  </div>

  <div class="bet" data-bet="c45-one" data-q="原理图上标着 KM、KM-1、KM-2 三处，柜子里应该装几个接触器？"
       data-opts="三个|一个——那三处是同一只接触器的线圈、主触头、辅助触点|两个，KM-1 和 KM-2 合成一个" data-right="1"
       data-after="一个。带横杠的写法（KM-1、KM-2）表示同一个器件被拆开画的几个部分，4.2 那一节讲过。接线时你会在实物上找到：两个标 A1/A2 的小端子（线圈）、三对标 1-2/3-4/5-6 的大端子（主触头）、还有几个标 13/14 或 21/22 的小端子（辅助触点）。"></div>
</section>

<!-- ================= 场景 2：端子编号 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">端子上那两位数，自己就把功能说清楚了</div>
    接触器和按钮上的辅助触点，端子号都是<b>两位数</b>。这两位数不是随便编的：
    <b>十位是「这是第几个触点」，个位是「它是动合还是动断」。</b>
    <b>记住个位那一位，一辈子不用再查手册。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">主触头</button>
        <button class="btn sm" data-k="1">线圈</button>
        <button class="btn sm" data-k="2">辅助触点</button>
        <button class="btn sm" data-k="3">热继电器</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这一组</div><div class="v" id="s2a">主触头</div></div>
        <div class="num"><div class="k">端子号</div><div class="v" id="s2b">1-2 3-4 5-6</div></div>
        <div class="num hi"><div class="k">怎么记</div><div class="v" id="s2c">单进双出</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st good">这一屏只要记住一句话</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>个位</th><th>是什么</th><th>例子</th></tr></thead>
      <tbody>
        <tr><td class="eu-s"><b>1、2</b></td><td><b>动断</b>（常闭）</td>
          <td>11-12、21-22、31-32　热继 <b>95-96</b></td></tr>
        <tr><td class="eu-s"><b>3、4</b></td><td><b>动合</b>（常开）</td>
          <td>13-14、23-24、43-44　热继 <b>97-98</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>十位只是序号</b>：13/14 和 23/24 都是动合，只是「第 1 个」和「第 2 个」的区别。
      <span class="sub">所以拿到一只接触器，<b>看一眼端子上印的数字就知道哪对是动合、哪对是动断</b>，
      不用拆、不用量、不用查型号手册。这条规则出自 EN 50005，各家品牌通用。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">不同品牌，端子位置不一样，编号一样</div>
    有的接触器辅助触点在顶上，有的在侧面，有的要另外卡一个辅助触点模块上去。
    <b>照着「位置」记必错，照着「编号」找永远对。</b>
    <div class="tip info">
      所以接线图上标的也是<b>端子编号</b>，不是「左边第三个螺丝」。
      <span class="sub">换一台同规格不同品牌的接触器，接线图一个字都不用改 ——
      这正是端子编号存在的意义。</span>
    </div>
  </div>

  <div class="bet" data-bet="c45-num" data-q="接触器侧面有一对端子标着 21 和 22。不用量，你知道它是动合还是动断吗？"
       data-opts="不知道，得拿万用表量|动断——个位是 1、2 就是动断，十位 2 只表示它是第 2 个辅助触点|动合，因为 2 大于 1" data-right="1"
       data-after="动断。个位 1、2 ＝ 动断，个位 3、4 ＝ 动合；十位只是序号。所以 21/22 是第 2 个辅助触点、动断，13/14 是第 1 个、动合。这一条能省掉现场无数次拿表去量的功夫，而且各品牌通用。"></div>
</section>

<!-- ================= 场景 3：接线图 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">接线图画的是「柜子里长什么样」</div>
    同一个电路，接线图的画法和原理图完全不同：<b>器件按它在柜里的实际位置摆</b>，
    <b>同一个器件只画一个方块</b>，导线按实际走向连，端子上标着编号。
    <b>切一块看它管什么。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">箱里有什么</button>
        <button class="btn sm" data-k="1">端子排 XT</button>
        <button class="btn sm" data-k="2">主电路怎么走</button>
        <button class="btn sm" data-k="3">控制线怎么走</button>
      </div>
      <div class="nums">
        <div class="num"><div class="k">这一块</div><div class="v" id="s3a">箱里有什么</div></div>
        <div class="num hi"><div class="k">要点</div><div class="v" id="s3b">一个器件一个方块</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">端子排 XT —— 柜里柜外的分界线</div>
    箱子里的器件之间怎么接，是厂里接好的；<b>要拉到箱子外面去的每一根线，
    都先接到端子排上</b>，再从端子排接出去。
    <div class="tip info">
      <b>好处是拆装和查故障都方便</b>：换一台电动机，只要在端子排上松开几个螺丝；
      查故障时也有了一个固定的、够得着的测量点 ——
      <span class="sub">3.6b 那一屏的电压降法，量的多半就是端子排上的这些点。</span>
    </div>
  </div>

  <div class="bet" data-bet="c45-xt" data-q="原理图上，KM 的线圈画在右下角，主触头画在左边中间，隔着大半张图。接线图上呢？"
       data-opts="也隔着，位置一样|画在同一个方块上——接线图按位置画，一个器件就是一个方块，端子标在上面|接线图上不画线圈" data-right="1"
       data-after="画在同一个方块上。接线图按位置画：柜子里那只接触器就是一个方块，A1/A2（线圈）、1-2/3-4/5-6（主触头）、13/14（辅助触点）全部标在这一个方块的边上。原理图把它拆开是为了看清工作过程，接线图把它合起来是为了照着接线——两张图各有各的用处。"></div>
</section>

<!-- ================= 场景 4：照着接一遍 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">拿着两张图，怎么真的接出来</div>
    顺序是固定的：<b>先接主电路，再接控制电路，接完按端子号逐根核对，送电前再查四样。</b>
    这个顺序不是讲究，是<b>为了出错的时候容易找回来</b>。
    <b>一步一步点下去。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">① 先接主电路</button>
        <button class="btn sm" data-k="1">② 再接控制</button>
        <button class="btn sm" data-k="2">③ 逐根核对</button>
        <button class="btn sm" data-k="3">④ 送电前四查</button>
      </div>
      <div class="nums">
        <div class="num"><div class="k">这一步</div><div class="v" id="s4a">先接主电路</div></div>
        <div class="num hi"><div class="k">为什么</div><div class="v" id="s4b">粗线先定位</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">网页教不了的那一半</div>
    <b>压接、剥线、拧紧力矩、线槽走线、标号管，这些只有上手才学得会。</b>
    这一屏讲的是「照着图接线的思路和顺序」，<b>不等于会接线</b>。
    <div class="tip">
      几条能先记住的：<b>多股线要压冷压端头</b>，不能直接把散股塞进螺丝下面；
      <b>一个端子一般只压一根线</b>（要压两根得用专门的双线端头）；
      <b>螺丝要按力矩拧</b>，太松会发热烧端子，太紧会滑丝。
      <span class="sub">第 6 章「线路的加工与连接」整章讲这些手上的活。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="c4-5">
    <div class="qz" data-q="原理图上 KM 出现在三个地方（线圈、主触头、自锁触点）。接线图上它是几个方块？"
         data-opts="三个方块，一一对应|一个方块——接线图按位置画，同一个器件只画一个，端子编号标在方块边上|两个"
         data-right="1"
         data-why="一个方块。这正是两张图最大的差别：原理图按功能拆开画（为了看清工作过程），接线图按位置合起来画（为了照着接线）。柜子里就一只接触器，A1/A2、1-2/3-4/5-6、13/14 这些端子全在它身上。"></div>
    <div class="qz" data-q="接触器上有一对端子标着 13、14。它是动合还是动断？"
         data-opts="动断|动合——个位 3、4 是动合，个位 1、2 才是动断|要看是哪个品牌"
         data-right="1"
         data-why="动合。辅助触点的两位数编号里，十位是序号（第几个触点）、个位是功能：个位 1、2 ＝ 动断，个位 3、4 ＝ 动合。所以 13/14 是第 1 个动合触点，21/22 是第 2 个动断触点。热继电器的 95/96 是动断、97/98 是动合，同一套规则，各品牌通用。"></div>
    <div class="qz" data-q="端子排 XT 是干什么用的？"
         data-opts="固定导线用的，没别的作用|柜内外的分界：要拉到箱子外面去的线先接到它上面，拆装和查故障都有了固定的接点|给端子编号用的"
         data-right="1"
         data-why="柜内外的分界。箱内器件之间的线厂里接好；凡是要出箱的线（去电动机、去按钮盒、去外部电源）都先落到端子排上，再从端子排接出去。这样换设备只需在端子排上松几个螺丝，查故障也有了一组固定、够得着的测量点——电压降法量的多半就是这些点。"></div>
    <div class="qz" data-q="接线为什么要「先主后控」？"
         data-opts="没有原因，习惯而已|主电路线粗、位置难调，先把它走定；控制线细好绕，后接可以顺着走。而且出错时范围容易缩小|因为主电路更重要"
         data-right="1"
         data-why="主电路的线又粗又硬，弯不了几个弯，得先把它的走向和位置定下来；控制线细、好绕，后接可以顺着主线的走向排。另一个好处是分段可查：主电路接完可以先单独核对一遍，控制电路接完再核对一遍，出错时范围小一半。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 4 章（书内 P76~P78）<br>端子编号规则出自 EN 50005 / IEC 60947，各品牌通用；压接、走线这些手上的活在第 6 章</div>
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

const CANH = 320;
function dot(g, x, y, c, r){
  g.save(); g.fillStyle = c; g.beginPath(); g.arc(x, y, r||2.6, 0, Math.PI*2); g.fill(); g.restore();
}
/* 端子：一个小空心圆 + 旁边的编号（接线图上端子一律画空心圆，4.3 屏 4 讲过） */
function term(g, x, y, n, o){
  o = o || {};
  g.save();
  g.strokeStyle = o.color || C.wire; g.lineWidth = 1.6;
  g.beginPath(); g.arc(x, y, 4, 0, Math.PI*2);
  g.fillStyle = o.on ? C.accbg : C.bg; g.fill(); g.stroke();
  g.restore();
  if(n) txt(g, n, x + (o.dx == null ? 0 : o.dx), y + (o.dy == null ? -11 : o.dy),
            {sz:8, b:1, c: o.on ? C.acc : C.tx3});
}
/* 竖直动合触点（原理图那半用） */
function cNO(g, x, y, on, c, h){
  h = h || 22;
  const yt = y - h/2, yb = y + h/2;
  g.save();
  g.strokeStyle = c; g.lineWidth = 1.9; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x, yb); g.lineTo(x + (on ? 4 : 11), yt + (on ? 0 : 5)); g.stroke();
  g.restore();
  dot(g, x, yt, c); dot(g, x, yb, c);
}

/* ================================================================
   场景 1：一个器件，图上三处
   ================================================================
   左边画原理图上那三处（只画 KM 相关的那几笔，别的一律省掉），
   右边画一只接触器实物的正面，三组端子。选中的两边同时套环。 */
const KMPART = [
  {t:'KM 线圈', card:'线圈', real:'两个小端子', num:'A1 / A2',
   bar:['线圈 —— 控制电路接在这儿', '两根细线，接 A1 和 A2。不分正负（交流线圈）']},
  {t:'KM-1 主触头', card:'KM-1', real:'三对大端子', num:'1/2 3/4 5/6',
   bar:['主触头 —— 电动机的电从这儿过', '上面三个接进线，下面三个接出线，粗线']},
  {t:'KM-2 自锁触点', card:'KM-2', real:'一对小端子', num:'13 / 14',
   bar:['辅助触点 —— 自锁那根线接在这儿', '个位 3、4 ＝ 动合，正是自锁要的那种']}
];
const S1 = { k:0 };
const st1 = new Stage('cv0', 360, CANH);

function draw1(){
  const g = st1.g; st1.clear();
  const it = KMPART[S1.k];
  EP.heading(g, 12, 14, '同一只接触器', '左边是图，右边是实物');
  txt(g, '原理图上', 78, 36, {sz:9.5, b:1, c:C.tx2});
  txt(g, '柜子里', 268, 36, {sz:9.5, b:1, c:C.tx2});

  /* ---------- 左：原理图上那三处 ---------- */
  const on0 = S1.k === 0, on1 = S1.k === 1, on2 = S1.k === 2;
  /* 主触头（三个） */
  const MX = [34, 60, 86];
  MX.forEach(function(x){
    new Path([[x,58],[x,76]]).stroke(g, 2.4, C.wire);
    new Path([[x,98],[x,118]]).stroke(g, 2.4, C.wire);
    cNO(g, x, 87, false, on1 ? C.acc : C.wire);
  });
  txt(g, 'KM-1', 60, 130, {sz:9.5, b:1, c: on1 ? C.acc : C.tx});
  if(on1) hot(g, 62, 87, 0, {w:82, h:52, r:8});

  /* 线圈 */
  box(g, 40, 168, 40, 22, 2, C.box, on0 ? C.acc : C.wire, 2);
  new Path([[60,152],[60,168]]).stroke(g, 1.8, C.wire);
  new Path([[60,190],[60,206]]).stroke(g, 1.8, C.wire);
  txt(g, 'KM', 60, 202, {sz:9.5, b:1, c: on0 ? C.acc : C.tx, bl:'top'});
  if(on0) hot(g, 60, 179, 0, {w:58, h:40, r:8});

  /* 自锁触点 */
  new Path([[34,240],[34,252]]).stroke(g, 1.8, C.wire);
  new Path([[34,274],[34,286]]).stroke(g, 1.8, C.wire);
  cNO(g, 34, 263, false, on2 ? C.acc : C.wire, 22);
  txt(g, 'KM-2', 66, 263, {sz:9.5, b:1, c: on2 ? C.acc : C.tx, al:'left'});
  if(on2) hot(g, 40, 263, 0, {w:52, h:44, r:8});

  /* 「这一处 → 对应到实物的哪儿」：只画选中那一条，画三条会糊成一团 */
  const fromY = [179, 87, 263][S1.k];
  g.save();
  g.strokeStyle = C.acc; g.lineWidth = 1.3; g.setLineDash([4,4]); g.globalAlpha = .7;
  g.beginPath(); g.moveTo(112, fromY); g.lineTo(160, fromY); g.lineTo(160, 157); g.lineTo(180, 157);
  g.stroke();
  g.restore();
  EC.head(g, 184, 157, 1, 0, 5, C.acc);
  txt(g, '同一只', 154, 143, {sz:8.5, c:C.acc, al:'right'});

  /* ---------- 右：接触器实物正面 ---------- */
  const BX = 190, BY = 62, BW = 150, BH = 190;
  box(g, BX, BY, BW, BH, 8, P.bakelite || C.box, C.boxLine, 1.6);
  box(g, BX + 30, BY + 44, BW - 60, 102, 4, C.box, C.boxLine, 1.2);
  txt(g, 'CJX2-1810', BX + BW/2, BY + 88, {sz:9, b:1, c:C.tx3});
  txt(g, '接触器', BX + BW/2, BY + 104, {sz:8.5, c:C.tx3});

  /* 四组端子各站一边，别挤在一起：
     主触头上下各三个、线圈 A1/A2 一左一右、辅助 13/14 也一左一右（低一档） */
  const TX = [BX + 34, BX + 75, BX + 116];
  ['1','3','5'].forEach(function(n, i){ term(g, TX[i], BY + 20, n, {on:on1}); });
  ['2','4','6'].forEach(function(n, i){ term(g, TX[i], BY + 170, n, {on:on1, dy:12}); });
  if(on1){
    hot(g, BX + BW/2, BY + 20, 0, {w:126, h:28, r:8});
    hot(g, BX + BW/2, BY + 170, 0, {w:126, h:28, r:8});
  }
  term(g, BX + 12, BY + 62, 'A1', {on:on0, dx:-3, dy:-12});
  term(g, BX + BW - 12, BY + 62, 'A2', {on:on0, dx:3, dy:-12});
  if(on0) hot(g, BX + BW/2, BY + 62, 0, {w:150, h:26, r:8});
  term(g, BX + 12, BY + 128, '13', {on:on2, dx:-3, dy:13});
  term(g, BX + BW - 12, BY + 128, '14', {on:on2, dx:3, dy:13});
  if(on2) hot(g, BX + BW/2, BY + 128, 0, {w:150, h:26, r:8});

  EC.box(g, 18, 274, 324, 38, 6, C.accbg, C.acc, 1);
  txt(g, it.bar[0], 180, 287, {sz:10.5, b:1, c:C.acc});
  txt(g, it.bar[1], 180, 302, {sz:9, c:C.tx2});
}
function note1(){
  const it = KMPART[S1.k];
  $('s1a').textContent = it.card;
  $('s1b').textContent = it.real;
  $('s1c').textContent = it.num;
  let h = '';
  if(S1.k === 0) h =
    '<div class="st">线圈 —— 实物上就两个小端子，标着 A1 和 A2</div>' +
    '原理图上那个矩形，在实物上是<b>藏在壳子里的一个电磁铁线圈</b>，' +
    '只把两个接线端子露在外面：<b>A1、A2</b>。控制回路那两根细线就拧在这儿。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>交流线圈不分正负</b>，A1、A2 谁接哪根都行。但<b>电压等级绝对不能接错</b> ——' +
    '线圈上印着 AC 380V 还是 AC 220V 或 DC 24V，' +
    '<span class="sub">接错的话轻则不吸合、重则当场烧线圈（220V 的线圈接 380V，几秒就冒烟）。' +
    '换接触器时这是第一个要核对的东西。</span></div>';
  else if(S1.k === 1) h =
    '<div class="st">主触头 —— 三对大端子，上进下出</div>' +
    '原理图上主电路里那三个触点，在实物上是<b>接触器上下各三个大号接线柱</b>：' +
    '上面 <b>1、3、5</b> 接进线，下面 <b>2、4、6</b> 接出线（去热继电器、再去电动机）。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>它们比别的端子大一圈</b>，因为要过几十安的电流。' +
    '<span class="sub">有的品牌标成 <b>L1/L2/L3</b>（进）和 <b>T1/T2/T3</b>（出），' +
    '意思一样 —— L 是 Line（电源侧）、T 是 Terminal（负载侧）。' +
    '这和 4.2 那节 L1L2L3 是电源侧、UVW 是设备侧是同一条思路。</span></div>';
  else h =
    '<div class="st good">辅助触点 —— 自锁那根线接的就是它</div>' +
    '4.4 那一屏并在启动按钮两端的 KM-2，在实物上是<b>一对标着 13、14 的小端子</b>。' +
    '<b>个位 3、4 就说明它是动合触点</b> —— 正是自锁需要的那一种（线圈得电它才闭合）。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>基本款接触器一般自带一两对辅助触点</b>；不够用的话，' +
    '可以往侧面卡一个<b>辅助触点模块</b>上去，编号接着往下排（23/24、31/32…）。' +
    '<span class="sub">下一屏专讲这些编号怎么读。</span></div>';
  $('n0').innerHTML = h;
}
document.getElementById('s1k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S1.k = +t.dataset.k;
  document.querySelectorAll('#s1k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S1.k);
  });
  note1(); draw1();
});

/* ================================================================
   场景 2：端子编号
   ================================================================
   画一张「端子号 → 是什么」的大卡，选中那一组高亮。
   重点全在辅助触点那一档：**个位 1、2 动断，个位 3、4 动合**。 */
const TERMG = [
  {t:'主触头', num:'1-2  3-4  5-6', memo:'单进双出',
   hi:-1,
   rows:[['1  3  5','上排 —— 接电源侧'],['2  4  6','下排 —— 接负载侧'],
         ['L1 L2 L3','有的品牌这么标（进）'],['T1 T2 T3','有的品牌这么标（出）']],
   bar:['三对大端子，过几十安的电流', '单数在上接进线，双数在下接出线']},
  {t:'线圈', num:'A1 / A2', memo:'认准电压等级',
   hi:2,
   rows:[['A1','线圈的一端'],['A2','线圈的另一端'],
         ['AC 380V','线圈电压 —— 印在线圈上，接错就烧'],['交流不分正负','A1 A2 谁接哪根都行']],
   bar:['线圈只有两个端子：A1 和 A2', '交流不分正负，但电压等级绝对不能接错']},
  {t:'辅助触点', num:'两位数', memo:'个位说功能',
   hi:3,
   rows:[['13 - 14','第 1 个　动合'],['21 - 22','第 2 个　动断'],
         ['43 - 44','第 4 个　动合'],['个位 1、2 ＝ 动断','个位 3、4 ＝ 动合']],
   bar:['十位是序号，个位是功能', '个位 1、2 → 动断　　个位 3、4 → 动合']},
  {t:'热继电器', num:'95-96 / 97-98', memo:'同一套规则',
   hi:1,
   rows:[['1-2 3-4 5-6','主回路，串在接触器和电动机之间'],
         ['95 - 96','动断 —— 串进控制回路，过载就断'],
         ['97 - 98','动合 —— 过载时闭合，去点报警灯'],
         ['接错这两对','平时是断的，电动机根本起不来']],
   bar:['热继电器的辅助触点也是两位数', '95-96 动断（去断控制回路）　97-98 动合（去点报警灯）']}
];
const S2 = { k:0 };
const st2 = new Stage('cv1', 360, CANH);

function draw2(){
  const g = st2.g; st2.clear();
  const it = TERMG[S2.k];
  EP.heading(g, 12, 14, '端子编号', it.memo);

  /* 四行大卡 */
  it.rows.forEach(function(r, i){
    const y = 46 + i * 50;
    /* 高亮哪一行由数据说了算 —— 一律高亮最后一行的话，
       「有的品牌这么标（出）」会被强调成这一屏的重点（截图抓到的） */
    const last = i === it.hi;
    box(g, 20, y, 320, 42, 7, last ? C.accbg : C.box, last ? C.acc : C.boxLine, last ? 1.6 : 1.1);
    txt(g, r[0], 38, y + 21, {sz: last ? 11 : 13, b:1, c:C.acc, al:'left'});
    txt(g, r[1], 176, y + 21, {sz:10, c:C.tx, al:'left'});
  });

  EC.box(g, 18, 254, 324, 42, 6, C.okbg, C.ok, 1);
  txt(g, it.bar[0], 180, 269, {sz:10.5, b:1, c:C.ok});
  txt(g, it.bar[1], 180, 285, {sz:9, c:C.tx2});
}
function note2(){
  const it = TERMG[S2.k];
  $('s2a').textContent = it.t;
  $('s2b').textContent = it.num;
  $('s2c').textContent = it.memo;
  let h = '';
  if(S2.k === 0) h =
    '<div class="st">主触头：单数在上，双数在下</div>' +
    '三对端子 <b>1-2、3-4、5-6</b>。<b>单数（1 3 5）在上排接电源侧，' +
    '双数（2 4 6）在下排接负载侧</b>。' +
    '<div class="tip info" style="margin-top:8px">' +
    '有的品牌标 <b>L1/L2/L3</b>（进）和 <b>T1/T2/T3</b>（出）—— L 是 Line，T 是 Terminal。' +
    '<span class="sub">这一对进出关系反了会怎样？其实交流接触器<b>反接也能用</b>，' +
    '但图纸和别人的习惯都是上进下出，<b>反着接会让下一个来修的人看半天</b>。</span></div>';
  else if(S2.k === 1) h =
    '<div class="st bad">线圈：端子简单，但电压等级要命</div>' +
    '就 <b>A1、A2</b> 两个端子，交流线圈不分正负。' +
    '<b>真正要命的是线圈电压</b>：同一个型号的接触器有 AC 380V、AC 220V、AC 110V、DC 24V 好几种线圈，' +
    '<b>外观几乎一样</b>，靠线圈上印的字区分。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>220V 的线圈接到 380V 上，几秒钟就冒烟。</b>' +
    '反过来 380V 线圈接 220V，吸不上或者吸合了发出嗡嗡的响声（吸力不够，衔铁在抖）。' +
    '<span class="sub">换接触器时<b>第一件事就是核对线圈电压</b>，比核对电流规格还要紧。</span></div>';
  else if(S2.k === 2) h =
    '<div class="st good">辅助触点：这一屏最值钱的一条规则</div>' +
    '两位数：<b>十位是序号（第几个触点），个位是功能</b>。' +
    '<b>个位 1、2 ＝ 动断；个位 3、4 ＝ 动合。</b>' +
    '所以 13-14 是第 1 个动合、21-22 是第 2 个动断、43-44 是第 4 个动合。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>拿到一只接触器，看一眼端子上印的数字就知道哪对能用来自锁（要动合），' +
    '哪对能用来互锁（要动断）</b> —— 不用拆、不用量、不用查手册。' +
    '<span class="sub">这套编号出自 EN 50005，各品牌通用。' +
    '按钮上也是这套：11-12 动断（停止按钮）、13-14 动合（启动按钮）。</span></div>';
  else h =
    '<div class="st">热继电器：同一套规则，只是数字大一点</div>' +
    '主回路那三对（<b>1-2、3-4、5-6</b>）串在接触器和电动机之间，电动机的电流从这儿过。' +
    '辅助触点两对：<b>95-96 动断</b>、<b>97-98 动合</b>。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>95-96 那对串进控制回路</b>（4.4 屏 4 讲的那处），过载时它断开、线圈失电、电动机停。' +
    '<b>97-98 那对是动合的</b>，过载时它闭合 —— 拿去点一盏报警灯或者给 PLC 一个信号。' +
    '<span class="sub">现场接线最常见的错是<b>把 97-98 当成 95-96 接进了控制回路</b>：' +
    '平时是断的，结果电动机根本启动不了。</span></div>';
  $('n1').innerHTML = h;
}
document.getElementById('s2k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S2.k = +t.dataset.k;
  document.querySelectorAll('#s2k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S2.k);
  });
  note2(); draw2();
});

/* ================================================================
   接线图 —— 屏 3、4 共用
   ================================================================
   配电箱一个虚线框，器件一个个方块（**同一器件只有一个方块**），
   端子排 XT 竖在右边当柜内外的分界，箱外是电动机和按钮盒。 */
const BOXX = 16, BOXY = 44, BOXW = 236, BOXH = 208;
const DEV = {
  qs: {x:42,  y:56,  w:78, h:30, n:'QS'},
  fu: {x:136, y:56,  w:62, h:30, n:'FU1~3'},
  km: {x:28,  y:104, w:120,h:56, n:'KM'},
  fr: {x:28,  y:180, w:120,h:38, n:'FR'},
  xt: {x:206, y:100, w:30, h:130,n:'XT'}
};
function devBox(g, d, litKey, key){
  const lit = litKey === key;
  box(g, d.x, d.y, d.w, d.h, 5, lit ? C.accbg : C.box, lit ? C.acc : C.boxLine, lit ? 1.8 : 1.2);
  txt(g, d.n, d.x + d.w/2, d.y + d.h/2, {sz:11, b:1, c: lit ? C.acc : C.tx});
}
function panel(g, hiKey, showWire){
  /* 配电箱 */
  g.save();
  g.strokeStyle = C.boxLine; g.lineWidth = 1.4; g.setLineDash([6,5]);
  box(g, BOXX, BOXY, BOXW, BOXH, 8, null, C.boxLine, 1.4);
  g.restore();
  /* 标签放框外上方 —— 放框内左上角正好被 QS 那个方块压住（截图抓到的） */
  txt(g, '配电箱', BOXX + 4, BOXY - 8, {sz:9, b:1, c:C.tx3, al:'left'});

  /* 器件 */
  devBox(g, DEV.qs, hiKey, 'qs');
  devBox(g, DEV.fu, hiKey, 'fu');
  devBox(g, DEV.fr, hiKey, 'fr');
  /* 接触器方块上标端子 */
  const k = DEV.km, lit = hiKey === 'km';
  box(g, k.x, k.y, k.w, k.h, 5, lit ? C.accbg : C.box, lit ? C.acc : C.boxLine, lit ? 1.8 : 1.2);
  txt(g, 'KM', k.x + k.w/2, k.y + k.h/2 - 3, {sz:11, b:1, c: lit ? C.acc : C.tx});
  txt(g, '1 3 5 / 2 4 6 · A1 A2 · 13 14', k.x + k.w/2, k.y + k.h/2 + 14,
      {sz:7.5, c: lit ? C.acc : C.tx3});
  /* 端子排 */
  const x = DEV.xt, xlit = hiKey === 'xt';
  box(g, x.x, x.y, x.w, x.h, 4, xlit ? C.accbg : C.box, xlit ? C.acc : C.boxLine, xlit ? 1.8 : 1.2);
  txt(g, 'XT', x.x + x.w/2, x.y - 10, {sz:9.5, b:1, c: xlit ? C.acc : C.tx});
  for(let i = 0; i < 6; i++){
    term(g, x.x + x.w/2, x.y + 16 + i*20, null, {on:xlit});
    txt(g, String(i+1), x.x + x.w/2 - 11, x.y + 16 + i*20, {sz:7.5, c:C.tx3});
  }

  /* 箱外：电动机 + 按钮盒 */
  g.save();
  g.beginPath(); g.arc(302, 214, 19, 0, Math.PI*2);
  g.fillStyle = C.box; g.fill(); g.lineWidth = 2; g.strokeStyle = C.wire; g.stroke();
  g.restore();
  txt(g, 'M', 302, 210, {sz:13, b:1, c:C.tx});
  txt(g, '3~', 302, 223, {sz:8, c:C.tx2});
  box(g, 276, 108, 54, 54, 5, C.box, C.boxLine, 1.2);
  txt(g, '按钮盒', 303, 126, {sz:9, b:1, c:C.tx});
  txt(g, 'SB1', 303, 141, {sz:8, c:C.tx3});
  txt(g, 'SB2', 303, 153, {sz:8, c:C.tx3});

  /* 导线 */
  if(showWire === 'main'){
    g.save(); g.strokeStyle = C.acc; g.lineWidth = 2.6; g.lineCap = 'round';
    /* 进线 → QS → FU → KM → FR → XT → M */
    line(g, [[BOXX-6,71],[DEV.qs.x,71]]);
    line(g, [[DEV.qs.x+DEV.qs.w,71],[DEV.fu.x,71]]);
    line(g, [[DEV.fu.x+DEV.fu.w/2,86],[DEV.fu.x+DEV.fu.w/2,96],[DEV.km.x+DEV.km.w/2,96],
             [DEV.km.x+DEV.km.w/2,DEV.km.y]]);
    line(g, [[DEV.km.x+DEV.km.w/2,DEV.km.y+DEV.km.h],[DEV.km.x+DEV.km.w/2,DEV.fr.y]]);
    line(g, [[DEV.fr.x+DEV.fr.w,199],[DEV.xt.x,199]]);
    line(g, [[DEV.xt.x+DEV.xt.w,199],[283,199],[283,208]]);
    g.restore();
    /* 标注放进线段**上方**：写在左边 al:'right' 会向左延伸出画布被裁掉 */
    txt(g, '进线', 12, 60, {sz:8.5, c:C.acc, al:'left'});
  }
  if(showWire === 'ctrl'){
    g.save(); g.strokeStyle = C.warn; g.lineWidth = 1.8; g.lineCap = 'round';
    /* 按钮盒 → XT → KM 线圈 */
    line(g, [[276,135],[DEV.xt.x+DEV.xt.w,135]]);
    line(g, [[DEV.xt.x,135],[196,135],[196,132],[DEV.km.x+DEV.km.w,132]]);
    line(g, [[DEV.fr.x+DEV.fr.w,186],[190,186],[190,150],[DEV.km.x+DEV.km.w,150]]);
    g.restore();
    txt(g, '控制线', 306, 172, {sz:8.5, c:C.warn});
  }
}
function line(g, pts){
  g.beginPath(); g.moveTo(pts[0][0], pts[0][1]);
  for(let i=1;i<pts.length;i++) g.lineTo(pts[i][0], pts[i][1]);
  g.stroke();
}

/* ================================================================
   场景 3：接线图长什么样
   ================================================================ */
const WIRE3 = [
  {t:'箱里有什么', memo:'一个器件一个方块', hi:'km', w:null,
   bar:['同一个器件只画一个方块', 'KM 的线圈、主触头、辅助触点全标在这一个方块上']},
  {t:'端子排 XT', memo:'柜内外的分界', hi:'xt', w:null,
   bar:['要出箱的线，先落到端子排上', '换设备只松几个螺丝　查故障有了固定测量点']},
  {t:'主电路怎么走', memo:'粗线，进线到电动机', hi:null, w:'main',
   bar:['进线 → QS → FU → KM → FR → XT → 电动机', '一条粗线走到底，中间不分叉']},
  {t:'控制线怎么走', memo:'细线，绕按钮盒一圈', hi:null, w:'ctrl',
   bar:['按钮盒的线也要经过端子排', '箱外的每一根线都在 XT 上有一个落点']}
];
const S3 = { k:0 };
const st3 = new Stage('cv2', 360, CANH);

function draw3(){
  const g = st3.g; st3.clear();
  const it = WIRE3[S3.k];
  EP.heading(g, 12, 14, '接线图', '按位置画，一个器件一个方块');
  panel(g, it.hi, it.w);
  EC.box(g, 18, 266, 324, 40, 6, C.accbg, C.acc, 1);
  txt(g, it.bar[0], 180, 280, {sz:10.5, b:1, c:C.acc});
  txt(g, it.bar[1], 180, 296, {sz:9, c:C.tx2});
}
function note3(){
  const it = WIRE3[S3.k];
  $('s3a').textContent = it.t;
  $('s3b').textContent = it.memo;
  let h = '';
  if(S3.k === 0) h =
    '<div class="st">接线图上，一个器件就是一个方块</div>' +
    '柜子里有什么，图上就画什么，<b>而且摆的位置和实际位置一样</b>：' +
    'QS 在最上面、旁边是熔断器、下面是接触器、再下面是热继电器。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>KM 这个方块上标着一串端子号</b>：1 3 5 / 2 4 6（主触头）、A1 A2（线圈）、' +
    '13 14（辅助触点）。<b>原理图上分散在三处的东西，在这儿全挤在一个方块上。</b>' +
    '<span class="sub">这就是两张图的根本差别：原理图按功能拆开（为了看懂），' +
    '接线图按位置合起来（为了动手接）。</span></div>';
  else if(S3.k === 1) h =
    '<div class="st good">端子排 XT —— 柜内外的分界线</div>' +
    '箱子里器件之间怎么接，是装配时接好的；<b>凡是要拉到箱子外面去的线</b>' +
    '（去电动机的、去按钮盒的、外部电源进来的），<b>一律先接到端子排上</b>，' +
    '再从端子排另一侧接出去。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>两个好处</b>：换设备时只要在端子排上松几个螺丝，不用拆箱内的线；' +
    '查故障时有了一组<b>固定的、够得着的测量点</b>。' +
    '<span class="sub">3.6b 那一屏的电压降法，现场量的多半就是端子排上这些点 ——' +
    '一根表笔搭 XT 的某个号，就知道电有没有送到箱外。</span></div>';
  else if(S3.k === 2) h =
    '<div class="st">主电路：一条粗线从进线走到电动机</div>' +
    '<b>进线 → QS → FU1~3 → KM 主触头 → FR 热元件 → 端子排 → 电动机</b>。' +
    '和原理图上那一串<b>顺序完全一样</b>，只是这儿画的是「线实际怎么走」。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>接线图上看不出「为什么」</b>：为什么熔断器在接触器前面、' +
    '为什么热继电器在接触器后面 —— 这些得回原理图上看。' +
    '<span class="sub">所以两张图要配着用：<b>原理图回答为什么，接线图回答接哪儿。</b></span></div>';
  else h =
    '<div class="st">控制线：绕出箱子一圈再回来</div>' +
    '按钮装在箱外的按钮盒上（人要够得着），所以<b>控制线要出箱</b>：' +
    'KM 线圈 → 端子排 → 按钮盒 → 端子排 → 回到线圈。' +
    '<b>箱外的每一根线，在端子排上都有一个落点。</b>' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>热继电器那对 95-96 也串在这条线上</b>（图上是从 FR 出来那一根）。' +
    '<span class="sub">现场接线时，端子排上每个号接哪根线，图纸上都标得清清楚楚 ——' +
    '<b>接线基本就是在照着号码表拧螺丝</b>，难的不是接，是接完怎么核对。下一屏讲这个。</span></div>';
  $('n2').innerHTML = h;
}
document.getElementById('s3k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S3.k = +t.dataset.k;
  document.querySelectorAll('#s3k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S3.k);
  });
  note3(); draw3();
});

/* ================================================================
   场景 4：照着接一遍
   ================================================================ */
const STEP4 = [
  {t:'先接主电路', why:'粗线先定位', hi:null, w:'main',
   bar:['① 主电路：进线 → QS → FU → KM → FR → XT → 电动机', '粗线又硬又难弯，先把它的走向定死']},
  {t:'再接控制线', why:'细线好绕，顺着主线排', hi:null, w:'ctrl',
   bar:['② 控制线：KM 线圈 ↔ 端子排 ↔ 按钮盒', '细线跟着主线走，不要横穿箱子']},
  {t:'逐根核对', why:'按端子号，不按位置', hi:'xt', w:null,
   bar:['③ 拿着图，一根一根念端子号核对', '「这根从 KM 的 A1 到 XT 的 3 号」—— 念出来再看']},
  {t:'送电前四查', why:'查完再合闸', hi:null, w:null,
   bar:['④ 查绝缘 · 查短路 · 查线圈电压 · 查接地', '这四样查完才能合闸，一样都不能省']}
];
const S4 = { k:0 };
const st4 = new Stage('cv3', 360, CANH);

function draw4(){
  const g = st4.g; st4.clear();
  const it = STEP4[S4.k];
  EP.heading(g, 12, 14, '照着接一遍', '第 ' + (S4.k+1) + ' 步 / 共 4 步');
  if(S4.k !== 3) panel(g, it.hi, it.w);
  if(S4.k === 3){
    /* 第四步没有具体走线，画四个检查项压在箱子上 */
    const items = [['绝缘', '兆欧表 ≥0.5 MΩ'], ['短路', '万用表通断档'],
                   ['线圈电压', '对上铭牌'], ['接地', 'PE 接外壳']];
    items.forEach(function(r, i){
      const y = 62 + i * 46;
      box(g, 30, y, 300, 38, 6, C.warnbg, C.warn, 1.2);
      txt(g, (i+1) + '　' + r[0], 46, y + 19, {sz:11, b:1, c:C.warn, al:'left'});
      txt(g, r[1], 320, y + 19, {sz:9.5, c:C.tx, al:'right'});
    });
  }
  const kind = S4.k === 3 ? 'warn' : 'acc';
  EC.box(g, 18, 266, 324, 40, 6, kind === 'warn' ? C.warnbg : C.accbg,
         kind === 'warn' ? C.warn : C.acc, 1);
  txt(g, it.bar[0], 180, 280, {sz:10, b:1, c: kind === 'warn' ? C.warn : C.acc});
  txt(g, it.bar[1], 180, 296, {sz:9, c:C.tx2});
}
function note4(){
  const it = STEP4[S4.k];
  $('s4a').textContent = it.t;
  $('s4b').textContent = it.why;
  let h = '';
  if(S4.k === 0) h =
    '<div class="st">① 先接主电路</div>' +
    '主电路的线又<b>粗</b>又<b>硬</b>，弯不了几个弯，得先把它的走向和位置定下来；' +
    '控制线细、好绕，后接可以顺着主线排。' +
    '<div class="tip info" style="margin-top:8px">' +
    '<b>另一个好处是分段可查</b>：主电路接完先单独核对一遍，控制电路接完再核对一遍 ——' +
    '出错时范围小一半。<span class="sub">反过来先接控制线的话，' +
    '后面塞粗线时会把细线挤得乱七八糟，还容易压伤绝缘。</span></div>';
  else if(S4.k === 1) h =
    '<div class="st">② 再接控制线</div>' +
    '控制线跟着主线的走向排，<b>不要横穿箱子</b>。' +
    '要出箱的那几根（去按钮盒的）先落到端子排上。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>每根线两头都要套线号管</b>，号码和图纸上一致。' +
    '<span class="sub">这一步现场最容易偷懒，可<b>不套号的线，下次修的人（多半还是你）</b>' +
    '得一根一根拽着找 —— 一台设备十几根控制线，找一遍就是半小时。</span></div>';
  else if(S4.k === 2) h =
    '<div class="st good">③ 逐根核对 —— 按端子号念出来</div>' +
    '拿着接线图，<b>一根一根念</b>：「这根，从 KM 的 A1，到 XT 的 3 号」，' +
    '念完再看实物对不对。<b>照编号核对，不要照位置核对</b> ——' +
    '不同品牌的端子位置不一样，编号才是唯一可靠的。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>特别要核对的两处</b>：<b>接触器线圈的电压等级</b>（对上铭牌），' +
    '<b>热继电器接的是 95-96 那对（动断）</b>而不是 97-98。' +
    '<span class="sub">接成 97-98 的话平时是断的，电动机根本启动不了 ——' +
    '而且这种错怎么看图都看不出来，只能靠核对端子号。</span></div>';
  else h =
    '<div class="st bad">④ 送电前四查 —— 一样都不能省</div>' +
    '<b>① 查绝缘</b>：绝缘电阻表量相间和对地，<b>≥ 0.5 MΩ</b>（3.8 节讲过）。' +
    '<b>② 查短路</b>：万用表通断档量相间，不该响的地方响了就是接错或碰线。' +
    '<b>③ 查线圈电压</b>：接触器线圈铭牌上的电压，和你接进去的电压对得上。' +
    '<b>④ 查接地</b>：PE 线接到箱体和电动机外壳，量一下通不通。' +
    '<div class="tip" style="margin-top:8px">' +
    '<b>查完再合闸，而且合闸时人站在侧面、别正对柜门。</b>' +
    '<span class="sub">还有一条：<b>第一次送电先只送控制电路</b>（主电路那三个熔断器先不装），' +
    '按一下启动看接触器吸不吸合、松手会不会自锁 —— ' +
    '确认控制逻辑对了，再装主熔断器带电动机试。这样万一接错，' +
    '烧的是几毛钱的熔断器，不是电动机。</span></div>';
  $('n3').innerHTML = h;
}
document.getElementById('s4k').addEventListener('click', function(e){
  const t = e.target.closest('.btn'); if(!t) return;
  S4.k = +t.dataset.k;
  document.querySelectorAll('#s4k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S4.k);
  });
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

ElecNav.init({ch:4, sec:'4.5'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('4.5');
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
