/* 2.1 低压开关 —— 本节内容的唯一真相。
   book.html 按需载入它；c2-1.html 是薄壳，也载入它。
   对应《零基础学电工》第 2 章 2.1 节（书内 P20~P22）。 */
(function(){
'use strict';
ELEC.reg({
  id: '2.1',
  file: 'c2-1.html',
  title: '2.1 低压开关',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>闸刀开关</button>
    <button class="tab" data-i="1"><span class="n">2</span>铁壳开关</button>
    <button class="tab" data-i="2"><span class="n">3</span>组合开关</button>
    <button class="tab" data-i="3"><span class="n">4</span>认符号·怎么选</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">最老、最简单的一种开关</div>
    闸刀开关（书上叫<b>开启式负荷开关</b>）就是一块瓷底板 ＋ 一把铜刀 ＋ 一根熔丝。
    <b>点画面上那把刀，或者用下面的按钮，合一次闸。</b>
    然后把负载电流往大里拖，看那根熔丝什么时候断。
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns">
        <button class="btn big" id="s1sw">合闸</button>
        <button class="btn sm" id="s1fx">⟳ 换新熔丝</button>
      </div>
      <div class="rowlab">负载电流　<b id="s1ilab">8 A</b>　（这根熔丝的额定值是 15 A）</div>
      <input type="range" id="s1i" min="1" max="26" step="1" value="8">
      <div class="ticks"><span>1 A</span><span>26 A</span></div>
      <div class="rowlab">电源接在哪一端？<span class="sub">这是安全规矩，不是随便接的</span></div>
      <div class="btns" id="s1wire">
        <button class="btn on" data-w="1">电源接上端（规范）</button>
        <button class="btn" data-w="0">电源接下端（错）</button>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">拆开看：身上就这几个零件</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>零件</th><th>干什么的</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">瓷底座</td><td>绝缘的底板，所有零件都装在它上面</td></tr>
        <tr><td class="eu-s">静插座</td><td>固定不动的那一对铜夹子，刀就插进它里面</td></tr>
        <tr><td class="eu-s">触刀</td><td>会动的那把铜刀，插进去＝接通，拔出来＝断开</td></tr>
        <tr><td class="eu-s">熔丝</td><td><b>保护</b>：电流一大就自己烧断，把线路切掉</td></tr>
        <tr><td class="eu-s">进线 / 出线端子</td><td>接线的地方，上进下出</td></tr>
        <tr><td class="eu-s">胶盖</td><td>盖住带电部分，防止手指碰到、也挡一点电弧</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>「负荷开关」这个名字要当心。</b>它的意思是「能在带着负载的情况下通断」，
      <b>不是「能保护」</b>。它身上唯一的保护就是那根熔丝，而熔丝只管
      <b>电流过大</b>这一种毛病 —— 漏电、过载轻微发热、缺相，它一概不管。
      现在新装的线路早就不用它了，用断路器（第 5 章讲）。你会遇到它，
      主要是<b>去修老房子、老车间</b>。
    </div>
  </div>

  <div class="bet" data-bet="c21-live" data-q="电源规规矩矩接在上端，现在已经拉闸。手柄和触刀带不带电？"
       data-opts="带电|不带电|要看负载关没关" data-right="1"
       data-after="不带电。拉闸切断的正好是「电源 → 触刀」这一路，触刀、手柄、熔丝、出线全都在负载侧，没有电源顶着它们。这就是「电源必须接上端」的全部理由 —— 上面那两个按钮切到「电源接下端」再拉一次闸，画面会告诉你差别有多大。"></div>
</section>

<!-- ================= 场景 2：铁壳开关 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">同一把刀，装进铁盒子里</div>
    铁壳开关（<b>封闭式负荷开关</b>）是闸刀开关的改进版：加了铁外壳、加了熔断器、
    加了一根<b>速断弹簧</b>。试试<b>先开外壳、再去合闸</b> —— 看它让不让你合。
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns">
        <button class="btn big" id="s2lv">扳手柄合闸</button>
        <button class="btn" id="s2dr">打开外壳</button>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">速断弹簧一个零件，办了三件事</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>它干的事</th><th>为什么要这样</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">让触头<b>快速</b>分断</td>
          <td>断开的一瞬间会拉出电弧，弧烧触头。分得越快弧越短 ——
              「速断」这个名字就是这么来的</td></tr>
        <tr><td class="eu-s">分断速度<b>与手快慢无关</b></td>
          <td>弹簧攒够劲才「啪」地一下动作。新手慢慢扳，触头照样是猛地弹开的</td></tr>
        <tr><td class="eu-s">外壳打开就<b>合不了闸</b></td>
          <td>书上写死的那一条：机械联锁。防止有人开着盖子送电</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>还有反过来的一道锁。</b>铁壳开关通常在合闸状态下<b>打不开箱盖</b> ——
      要开盖，先拉闸。两道锁合起来是一句话：<b>盖子开着不能送电，送着电不能开盖子</b>。
      这套思路你在第 8 章的配电箱、第 12 章的变频器柜上还会一再见到。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">铭牌上要看的两个数</div>
    书上给的适用范围是：<span class="key">额定电压 &lt; 500 V</span>、
    <span class="key">额定电流 &lt; 200 A</span>。<br>
    选型时这两个数<b>都不能比线路的实际值小</b>：电压不够会击穿，电流不够会发热烧触头。
    <span class="sub">额定电流指的是开关触头长期能过的电流，跟里面那根熔断器的额定值是两回事 ——
    熔断器的额定值要按线路的保护要求单独选，通常比开关的额定电流小。</span>
  </div>

  <div class="bet" data-bet="c21-spring" data-q="那根速断弹簧，主要是干什么的？"
       data-opts="让手柄自己弹回原位|让触头猛地分开、缩短拉弧，顺带做机械联锁|把熔断器压紧" data-right="1"
       data-after="第二个。断开瞬间触头之间会拉出电弧，电弧烧触头也可能引燃周围，所以要分得越快越好。弹簧把「分断速度」从人手里拿走了 —— 你扳得再慢，它也是攒够劲一下弹开。同一根弹簧的机构顺带实现了「盖子开着合不上闸」。"></div>
</section>

<!-- ================= 场景 3：组合开关 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">一个手柄，管好几路的通断组合</div>
    组合开关又叫<b>转换开关</b>。里面是好几层触片叠在同一根转轴上，
    <b>转到不同的角度，闭合的是不同的那几层。</b>
    下面这个是最常见的用法：市电 / 断 / 备用电源，三选一。
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="rowlab">转动手柄（也可以直接点画面上那个旋钮）</div>
      <div class="btns" id="s3p">
        <button class="btn on" data-k="0">0　断开</button>
        <button class="btn" data-k="1">1　市电</button>
        <button class="btn" data-k="2">2　备用</button>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st good">它最值钱的一点：互锁是天生的</div>
    两路电源<b>绝对不可能同时接上</b> —— 不是靠谁小心，是靠结构：
    两层触片装在<b>同一根转轴</b>上，凸轮的缺口错开了角度，
    转轴转到哪儿，就只有那一层能闭合。<b>做不到同时闭合，是几何决定的。</b>
    <div class="tip info" style="margin-top:8px">
      两路电源同时接上叫<b>「并列运行」</b>，两边相位对不上就是一次相间短路。
      所以凡是切换电源的场合，「互锁」这两个字永远排第一。
      第 11 章的电动机正反转也是同一个问题 —— 那里没有共用转轴，
      就得用接触器的触点互相把对方的线圈掐断（叫<b>电气互锁</b>）。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">还会在哪儿见到它</div>
    <b>机床的电源引入开关</b>（一转，三相同时进来）、
    <b>万用表的量程旋钮</b>（同一个原理，只是电流小得多）、
    <b>老式电风扇的调速</b>（1/2/3 档接不同的绕组抽头）。
    看见「一个旋钮 + 好几层触片」，多半就是它。
  </div>

  <div class="bet" data-bet="c21-cam" data-q="用组合开关做双电源切换，转得快一点会不会出现两路同时接通的一瞬间？"
       data-opts="会，转快了就可能|不会，转轴上各层凸轮的缺口错开了角度，结构上做不到|得再加一个联锁继电器才行" data-right="1"
       data-after="不会。这正是转换开关的价值所在：互锁写在机械结构里，不依赖操作的人。你转得多快都一样 —— 一层的凸轮缺口对准的时候，另一层的凸轮正顶着触片。"></div>
</section>

<!-- ================= 场景 4：符号与选型 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">图纸上它们长这样</div>
    上班拿到手的是<b>原理图</b>，不是实物照片。这四个符号很像，
    <b>差别就在那几笔多出来的小记号上</b>。点一个看说明。
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4p">
        <button class="btn on" data-k="0">刀开关</button>
        <button class="btn" data-k="1">熔断器式</button>
      </div>
      <div class="btns">
        <button class="btn" data-k="2">熔断器</button>
        <button class="btn" data-k="3">断路器</button>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">那个 × 是断路器的记号，别看串了</div>
    带 <b>×</b> 的刀片表示<b>「有自动脱扣机构」</b>——
    出故障时它<b>自己</b>会跳，不用人扳。刀开关、铁壳开关都没有这个本事，
    所以它们的符号上<b>不该有 ×</b>。
    <span class="sub">（考证题库里有两道题，铁壳开关和断路器给的是同一张带 × 的图。
    按国标那张图是断路器。考试照题库答，脑子里要记对的。）</span>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">文字符号：图纸上标在符号旁边的字母</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>字母</th><th>是什么</th><th>本节 / 后面哪儿讲</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">QS</td><td>刀开关、隔离开关、转换开关</td><td>本节三种都是 QS</td></tr>
        <tr><td class="eu-s">FU</td><td>熔断器（保险丝）</td><td>本节；第 5 章讲检测</td></tr>
        <tr><td class="eu-s">QF</td><td>断路器（俗称空开）</td><td>第 5 章</td></tr>
        <tr><td class="eu-s">KM</td><td>接触器</td><td>下一节 2.2</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>Q 打头的是「主电路里的开关」，K 打头的是「靠线圈动作的」。</b>
      记住这个分类，第 4 章看整张原理图时能省一半力气。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">三种低压开关，一张表分清楚</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>闸刀开关</th><th>铁壳开关</th><th>组合开关</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">书上叫</td><td>开启式负荷开关</td><td>封闭式负荷开关</td><td>转换开关</td></tr>
        <tr><td class="eu-s">带不带保护</td><td>熔丝</td><td>熔断器</td><td>一般不带</td></tr>
        <tr><td class="eu-s">有没有外壳</td><td>只有胶盖</td><td>整个铁壳＋联锁</td><td>有塑壳</td></tr>
        <tr><td class="eu-s">最能干的事</td><td>便宜、看得见断口</td><td>安全防护好</td><td>一柄多路、天生互锁</td></tr>
        <tr><td class="eu-s">常见在</td><td>老房子、临时用电</td><td>老车间、农机</td><td>机床、仪表</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>「看得见断口」不是小事。</b>检修前要确认真的断电了，
      刀开关拉开后那个可见的空气间隙，本身就是一种「看得见的安全」——
      这也是「隔离开关」这个叫法的由来。
      不过<b>看得见断口 ≠ 可以直接上手</b>，规矩仍然是：拉闸 → 验电 → 挂牌上锁。
    </div>
  </div>

  <div class="quiz" data-quiz="c2-1">
    <div class="qz" data-q="闸刀开关的电源线应该接在哪一端？"
         data-opts="接上端（静插座那一端）|接下端（出线端子那一端）|两端都行，接反了也不影响用"
         data-right="0"
         data-why="必须接上端。这样一拉闸，触刀、手柄、熔丝、下端全都变成不带电的负载侧，检修的人碰到也没事。接到下端的话，拉了闸手柄和刀片照样是带电的 —— 电路照样能用，所以这个错很难被发现，直到有人挨一下。"></div>
    <div class="qz" data-q="闸刀开关里那根熔丝，管的是哪一类毛病？"
         data-opts="漏电|电流过大（过载、短路）|电压不稳"
         data-right="1"
         data-why="只管电流过大。熔丝的原理就是「电流大→发热→自己烧断」。漏电要靠漏电保护器，电压问题要靠电压继电器，这两样它一概不知道。把熔丝当成「万能保险」是最危险的误会。"></div>
    <div class="qz" data-q="铁壳开关的外壳开着，这时候扳手柄合闸，会怎样？"
         data-opts="正常合闸，能看见里面动作|合不上，被机械联锁挡住了|合上了但没有电"
         data-right="1"
         data-why="合不上。速断弹簧那套机构带机械联锁：外壳打开状态下合不了闸，这是书上明写的一条。反过来通常也成立——合着闸打不开盖子。要看里面，先拉闸、再开盖、再验电。"></div>
    <div class="qz" data-q="车间要用一个手柄在「市电 / 备用电源」之间切换，两路绝对不能同时接上。选哪种？"
         data-opts="装两个闸刀开关，注意别同时合|一个组合开关（转换开关）|一个铁壳开关"
         data-right="1"
         data-why="组合开关。两路的触片装在同一根转轴上、凸轮缺口错开角度，同时闭合在结构上就做不到——互锁不依赖操作的人小心。装两个闸刀开关的方案，安全性完全押在「别手滑」上，迟早出事。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 2 章 2.1 节（书内 P20~P22）<br>下一节讲接触器：同样是通断，但让电磁铁替你去扳那把刀</div>
</section>`,

  init: function(EC){
'use strict';
const {C, Path, Stage, txt, box, tag, loop, $} = EC;

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
   场景 1：闸刀开关（开启式负荷开关）
   ================================================================ */
const S1 = { on:false, a:0.62, load:8, fuse:true, heat:0, top:true, ph:0 };
const st1 = new Stage('cv0', 360, 344);
const LX = 118, RX = 292, TY = 44, BY = 284;
const RATED = 15;                    /* 这根熔丝的额定电流 */
const PIV = 176, BL = 80;            /* 触刀转轴 y、刀长 */

/* 主回路：出线端子往下 → 右 → 上 → 顶横 → 回到静插座。
   触刀和熔丝那一段是元件自己画的，不走这条 Path。
   分段长：112 / 174 / 240 / 174 / 52，累计 112 / 286 / 526 / 700 / 752 */
const P1 = new Path([[LX,PIV],[LX,BY],[RX,BY],[RX,TY],[LX,TY],[LX,96]]);
/* 灯泡在 (205,BY) → s = 112 + 87 = 199；电源在 (205,TY) → s = 526 + 87 = 613 */
const SKIP1 = [[0,70],[173,225],[579,647]];

function redGlow(g, pts, lw){
  const p = new Path(pts);
  g.save();
  g.globalAlpha = .16; p.stroke(g, (lw||3.2)+9, C.err);
  g.globalAlpha = .34; p.stroke(g, (lw||3.2)+4, C.err);
  g.globalAlpha = 1;
  g.restore();
}

/* 熔丝：瓷管 + 两个铜帽 + 里面一根细丝 */
function fuseBody(g, x, y0, y1, ok, heat){
  const w = 19;
  box(g, x-w/2, y0, w, y1-y0, 3, '#e6dfd0', '#b3a88e', 1.2);
  /* 铜帽 */
  [y0, y1-9].forEach(function(cy){
    box(g, x-w/2-1.5, cy, w+3, 9, 2, EP.P.brass, EP.P.brassD, 1);
  });
  /* 里面那根丝 */
  g.save(); g.lineCap = 'round';
  if(ok){
    g.strokeStyle = heat > 0.35 ? '#ff7a45' : '#8a7a5e';
    g.lineWidth = 1.8;
    g.beginPath(); g.moveTo(x, y0+9); g.lineTo(x, y1-9); g.stroke();
    if(heat > 0.35){
      g.globalAlpha = Math.min(0.6, (heat-0.35)*1.4);
      g.strokeStyle = '#ffd76a'; g.lineWidth = 5;
      g.beginPath(); g.moveTo(x, y0+9); g.lineTo(x, y1-9); g.stroke();
    }
  }else{
    g.strokeStyle = '#5a5348'; g.lineWidth = 1.8;
    g.beginPath(); g.moveTo(x, y0+9); g.lineTo(x, y0+20); g.stroke();
    g.beginPath(); g.moveTo(x, y1-20); g.lineTo(x, y1-9); g.stroke();
    /* 烧断后管壁发黑 */
    g.globalAlpha = .55; g.fillStyle = '#2a2620';
    g.beginPath(); g.arc(x, (y0+y1)/2, 7, 0, EC.TAU); g.fill();
  }
  g.restore();
}

function drawKnife(g, I){
  /* 瓷底座（真实材质色，不跟主题走） */
  const gr = g.createLinearGradient(LX-24, 0, LX+24, 0);
  gr.addColorStop(0, '#b3a88e'); gr.addColorStop(0.34, '#e6dfd0'); gr.addColorStop(1, '#b8ad93');
  box(g, LX-24, 70, 48, 186, 5, gr, '#9c917a', 1.2);

  /* 静插座：两片银色铜夹 */
  [-6.5, 6.5].forEach(function(dx){
    box(g, LX+dx-2.7, 88, 5.4, 24, 2, EP.P.steel, EP.P.steelDD, 1);
  });

  /* 触刀 */
  const a = S1.a;
  const tx = LX + Math.sin(a)*BL, ty = PIV - Math.cos(a)*BL;
  g.save(); g.lineCap = 'round';
  g.strokeStyle = EP.P.copperD; g.lineWidth = 7.2;
  g.beginPath(); g.moveTo(LX, PIV); g.lineTo(tx, ty); g.stroke();
  g.strokeStyle = EP.P.copper; g.lineWidth = 4.8;
  g.beginPath(); g.moveTo(LX, PIV); g.lineTo(tx, ty); g.stroke();
  g.globalAlpha = .45; g.strokeStyle = EP.P.copperL; g.lineWidth = 1.5;
  g.beginPath(); g.moveTo(LX, PIV); g.lineTo(tx, ty); g.stroke();
  g.restore();
  /* 胶木手柄：装在刀身侧面，不去挡静插座 */
  const hx = LX + Math.sin(a)*BL*0.62, hy = PIV - Math.cos(a)*BL*0.62;
  g.save(); g.translate(hx, hy); g.rotate(a);
  box(g, 5, -13, 12, 26, 5, EP.P.bakeliteL, '#0d1013', 1.1);
  g.restore();

  /* 端子与转轴 */
  EP.terminal(g, LX, 80, 5.4);
  EP.terminal(g, LX, PIV, 5.4);
  EP.terminal(g, LX, 246, 5.4);

  /* 熔丝 */
  fuseBody(g, LX, 192, 238, S1.fuse, S1.heat);

  /* 通电时刀身上跑一点电子 */
  if(I > 0){
    const seg = new Path([[LX,PIV],[LX,100]]);
    EP.flow(g, seg, {phase:-S1.ph, gap:34, r:2.8});
  }
}

function draw1(dt){
  const g = st1.g; st1.clear();
  EP.heading(g, 20, 18, '闸刀开关', '开启式负荷开关　QS');

  /* 刀的动作 */
  const ta = S1.on ? 0 : 0.62;
  S1.a += (ta - S1.a) * Math.min(1, dt*15);

  const I = (S1.on && S1.fuse) ? S1.load : 0;
  /* 反时限：越过载烧得越快。这是演示用的简化模型，真实熔断体按厂家曲线 */
  if(I > RATED){
    S1.heat += dt * ((I/RATED)*(I/RATED) - 1) / 2.0;
    if(S1.heat >= 1){ S1.heat = 0; S1.fuse = false; note1(); }
  }else{
    S1.heat = Math.max(0, S1.heat - dt*0.7);
  }
  S1.ph += I * 26 * dt;

  /* 导线与电流 */
  P1.stroke(g, 3.2, C.wire);
  if(I > 0) EP.flow(g, P1, {phase:S1.ph, gap:52, kind:'cur', skip:SKIP1});

  /* 电源 */
  box(g, 171, 31, 68, 26, 5, C.box, C.boxLine, 1);
  txt(g, '～ 220 V', 205, 44, {sz:11, b:1, c:C.tx2});

  /* 负载：一只灯泡装在灯座上 */
  EP.lampHolder(g, 205, BY-8, 30, 16);
  EP.bulb(g, 205, BY-27, 13, Math.min(1, I/20));
  txt(g, '负载', 205, BY+22, {sz:9.5, c:EP.P.inkL});

  drawKnife(g, I);

  /* 标注：一律放左边 —— 触刀拉开时会扫过右上那一整片 */
  const upName = S1.top ? '电源从上端进来' : '接反了：这儿接了负载';
  const dnName = S1.top ? '负载从下端走' : '接反了：这儿接了电源';
  EP.callout(g, LX-14, 80,  86, 74,  S1.top ? '进线端子' : '出线端子', upName, {al:'right'});
  EP.callout(g, LX-13, 140, 86, 132, '触刀', '手柄向上＝合闸', {al:'right'});
  EP.callout(g, LX-11, 214, 86, 206, '熔丝', '过流就熔断', {al:'right'});
  EP.callout(g, LX-14, 246, 86, 254, S1.top ? '出线端子' : '进线端子', dnName, {al:'right'});

  /* 拉闸之后，哪一段还带电 */
  if(!S1.on){
    if(S1.top){
      redGlow(g, [[LX,TY],[LX,74]]);
      EP.chip(g, '只有这一小段还带电', 240, 80, {sz:9.5, c:C.err});
    }else{
      redGlow(g, [[LX,246],[LX,BY],[172,BY]]);
      redGlow(g, [[LX,PIV],[LX+Math.sin(S1.a)*BL, PIV-Math.cos(S1.a)*BL]], 6);
      EP.chip(g, '拉了闸，刀和手柄还带电！', 232, 152, {sz:10, b:1, c:C.err});
    }
  }

  /* 底部读数 */
  box(g, 20, 302, 320, 34, 6, C.box, C.boxLine, 1);
  txt(g, S1.on ? '合闸' : '拉闸', 56, 319, {sz:11.5, b:1, c:S1.on ? C.ok : C.tx3});
  txt(g, '电流 ' + I.toFixed(0) + ' A', 140, 319, {sz:11.5, b:1, c:I===0 ? C.tx3 : (I>RATED ? C.err : C.cur)});
  txt(g, S1.fuse ? '熔丝完好' : '熔丝已熔断', 246, 319,
      {sz:11.5, b:1, c:S1.fuse ? C.ok : C.err});
  /* 熔丝正在发热时给一条进度 */
  if(S1.fuse && S1.heat > 0.02){
    box(g, 200, 328, 92, 4, 2, C.errbg, null, 0);
    box(g, 200, 328, 92*Math.min(1,S1.heat), 4, 2, C.err, null, 0);
  }
}

function note1(){
  const I = (S1.on && S1.fuse) ? S1.load : 0;
  $('s1sw').textContent = S1.on ? '拉闸' : '合闸';
  $('s1ilab').textContent = S1.load + ' A';
  let h = '';
  if(!S1.fuse){
    h = '<div class="st bad">熔丝烧断了</div>'+
        '刚才那个电流是 <span class="rd">'+S1.load+' A</span>，超过了熔丝的额定值 15 A。'+
        '熔丝自己烧断，把整条线路切掉了 —— <b>它就是拿来当牺牲品的</b>。<br>'+
        '<span class="sub">注意：现在就算再合闸，灯也不会亮 —— 回路是断的。'+
        '点「⟳ 换新熔丝」换一根。现实里换之前必须先<b>查清楚为什么会过流</b>，'+
        '不查原因直接换、或者拿铜丝铁丝去顶替，是电气火灾最常见的起因。</span>';
  }else if(!S1.on){
    h = '<div class="st">现在是拉闸状态</div>'+
        (S1.top
          ? '电源接在上端。断开的地方在<b>电源和触刀之间</b>，所以触刀、手柄、熔丝、'+
            '下端全都不带电 —— 画面上只有最上面那一小段是红的。<b>这才是规范接法。</b>'
          : '<span class="rd">电源接在了下端。</span>断开的地方在<b>触刀和负载之间</b>，'+
            '于是电源顶着下端一路上来，把熔丝、转轴、触刀、连同你手要抓的那个手柄'+
            '<b>全都变成带电体</b>。电路照样能用，所以这个错平时看不出来 —— '+
            '直到有人拉了闸伸手去擦灰。')+
        '<br><span class="sub">拖动上面的滑杆改负载电流，然后合闸看熔丝。</span>';
  }else{
    const over = S1.load > RATED;
    h = '<div class="st'+(over?' warn':' good')+'">合闸了，电流 '+S1.load+' A</div>'+
        '铜刀插进静插座，回路接通，电流从上端进、经过触刀和熔丝、从下端出去到负载。'+
        (over
          ? '<br><b>但这个电流已经超过熔丝的 15 A 了。</b>熔丝正在发热（看画面下面那条红条），'+
            '再等一会儿就会断。<b>超得越多，断得越快</b> —— 这叫反时限：'+
            '短路时电流是额定的几十倍，几乎是瞬间就断。'
          : '<br>电流没超过 15 A，熔丝只是微微发热，不会断。'+
            '<b>试试把滑杆拖到 20 A 以上</b>，看它多久烧断，再拖到 26 A 比一比快慢。');
  }
  $('n0').innerHTML = h;
}

st1.cv.addEventListener('click', function(ev){
  const p = st1.pick(ev);
  /* 点刀身那一片就当扳手柄 */
  if(p[0] > LX-30 && p[0] < LX+60 && p[1] > 84 && p[1] < 186){ toggle1(); }
});
function toggle1(){ S1.on = !S1.on; note1(); }

/* ================================================================
   场景 2：铁壳开关（封闭式负荷开关）
   ================================================================ */
const S2 = { door:0, doorT:0, lever:0, leverT:0, blade:0, msg:'', flash:0, spin:0 };
const st2 = new Stage('cv1', 360, 354);
/* 箱体往右让出 120px：门是往左开的，开到位得有地方放它 */
const BX0 = 148, BX1 = 300, BY0 = 52, BY1 = 238, BW = BX1 - BX0;
const XS = [180, 224, 268];

function spring(g, x, y0, y1, n, stretch){
  g.save();
  g.strokeStyle = EP.P.steel; g.lineWidth = 2.2; g.lineJoin = 'round';
  g.beginPath();
  const w = 7 - stretch*2.6;
  for(let i=0;i<=n;i++){
    const y = y0 + (y1-y0)*i/n;
    const x2 = x + ((i%2) ? w : -w);
    i ? g.lineTo(x2, y) : g.moveTo(x2, y);
  }
  g.stroke(); g.restore();
}
/* 编号小圆点。**只在门开着时画** —— EC.txt 内部会把 globalAlpha 顶回 1，
   靠外层 alpha 淡化整块内部结构对文字不起作用，数字会透过关着的门露出来 */
function numDot(g, s, x, y){
  g.save(); g.fillStyle = C.accbg; g.strokeStyle = C.acc; g.lineWidth = 1;
  g.beginPath(); g.arc(x, y, 8, 0, EC.TAU); g.fill(); g.stroke(); g.restore();
  txt(g, s, x, y, {sz:9.5, b:1, c:C.acc});
}

function draw2(dt){
  const g = st2.g; st2.clear();
  EP.heading(g, 20, 16, '铁壳开关', '封闭式负荷开关');

  S2.door  += (S2.doorT  - S2.door)  * Math.min(1, dt*8);
  S2.lever += (S2.leverT - S2.lever) * Math.min(1, dt*7);
  /* 速断：手柄匀速扳过去，触头却是攒够劲一下弹开的 —— 刀跟得比手柄快得多 */
  const bt = S2.lever > 0.5 ? 1 : 0;
  if(Math.abs(bt - S2.blade) > 0.01) S2.flash = 0.24;
  S2.blade += (bt - S2.blade) * Math.min(1, dt*30);
  if(S2.flash > 0) S2.flash = Math.max(0, S2.flash - dt);

  const on = S2.blade > 0.5;
  if(on) S2.spin += dt * 4.6;

  /* 三相进线按国标线色（黄绿红），出线走中灰 */
  const PC = ['#e8d34a', '#4fc04a', '#ff5f52'];
  g.save(); g.lineCap = 'round';
  XS.forEach(function(x, i){
    g.strokeStyle = PC[i]; g.lineWidth = 2.6;
    g.beginPath(); g.moveTo(x, 36); g.lineTo(x, BY0+6); g.stroke();
    txt(g, 'L' + (i+1), x, 27, {sz:9.5, c:C.tx3});
  });
  g.strokeStyle = C.wire; g.lineWidth = 2.6;
  XS.forEach(function(x){
    g.beginPath(); g.moveTo(x, BY1-6); g.lineTo(x, 268); g.stroke();
  });
  g.restore();

  /* 铁壳本体 */
  const bgr = g.createLinearGradient(0, BY0, 0, BY1);
  bgr.addColorStop(0, '#39424d'); bgr.addColorStop(0.5, '#2b333c'); bgr.addColorStop(1, '#20262d');
  box(g, BX0, BY0, BW, BY1-BY0, 6, bgr, '#151a20', 1.4);

  /* ---- 内部结构 ---- */
  g.save(); g.globalAlpha = Math.max(0.04, S2.door);
  XS.forEach(function(x){
    box(g, x-9, 66, 18, 32, 3, '#e6dfd0', '#b3a88e', 1.1);      /* 熔断器瓷管 */
    box(g, x-10, 66, 20, 6, 2, EP.P.brass, EP.P.brassD, 1);
    box(g, x-10, 92, 20, 6, 2, EP.P.brass, EP.P.brassD, 1);
    box(g, x-8, 126, 16, 7, 2, EP.P.steel, EP.P.steelDD, 1);    /* 静触头 */
  });
  /* 动触头：三把刀装在同一根轴上，一起动。**往左倒**，右边要留给速断弹簧 */
  const ba = (1 - S2.blade) * 0.55;
  XS.forEach(function(x){
    const ty = 186, L = 56;
    const ex2 = x - Math.sin(ba)*L, ey2 = ty - Math.cos(ba)*L;
    g.save(); g.lineCap = 'round';
    g.strokeStyle = EP.P.copperD; g.lineWidth = 5.4;
    g.beginPath(); g.moveTo(x, ty); g.lineTo(ex2, ey2); g.stroke();
    g.strokeStyle = EP.P.copper; g.lineWidth = 3.4;
    g.beginPath(); g.moveTo(x, ty); g.lineTo(ex2, ey2); g.stroke();
    g.restore();
    EP.terminal(g, x, ty, 4.4);
  });
  /* 出线端子：动触头轴 → 端子 → 穿出箱底 */
  g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.4; g.lineCap = 'round';
  XS.forEach(function(x){ g.beginPath(); g.moveTo(x, 186); g.lineTo(x, 222); g.stroke(); });
  g.restore();
  XS.forEach(function(x){ EP.terminal(g, x, 222, 4.4); });
  spring(g, 282, 132, 182, 8, S2.blade);
  g.restore();
  if(S2.door > 0.55){
    numDot(g, '1', 224, 112); numDot(g, '2', 282, 116);
    numDot(g, '3', 158, 176); numDot(g, '4', 202, 206);
  }

  /* ---- 门：铰链在左边，往左开到 140° ---- */
  {
    const th = S2.door * 2.45;
    const fx = BX0 + BW * Math.cos(th);        /* 自由边：关着＝BX1，开到位＝BX0-117 */
    const sk = Math.abs(BW * Math.sin(th)) * 0.10;
    g.save();
    g.beginPath();
    g.moveTo(BX0, BY0); g.lineTo(fx, BY0 - sk);
    g.lineTo(fx, BY1 + sk); g.lineTo(BX0, BY1);
    g.closePath();
    const dgr = g.createLinearGradient(Math.min(fx,BX0), 0, Math.max(fx,BX0), 0);
    dgr.addColorStop(0, '#4a545f'); dgr.addColorStop(1, '#2f3841');
    g.fillStyle = dgr; g.fill();
    g.strokeStyle = '#151a20'; g.lineWidth = 1.4; g.stroke();
    g.restore();
    /* 关着的时候才看得到外观：铭牌 + 三个敲落孔 */
    if(S2.door < 0.10){
      box(g, BX0+18, BY0+28, 116, 26, 3, '#8b949e', '#5b6672', 1);
      txt(g, 'HH  380V  60A', BX0+76, BY0+41, {sz:10, b:1, c:'#1c222a'});
      XS.forEach(function(x){
        g.save(); g.strokeStyle = '#151a20'; g.lineWidth = 1.2;
        g.beginPath(); g.arc(x, BY1-30, 7, 0, EC.TAU); g.stroke(); g.restore();
      });
      txt(g, '外壳（关着）', BX0+76, BY1-62, {sz:9.5, c:'#8b949e'});
    }
  }

  /* ---- 手柄：装在铁壳右侧，上＝合、下＝分 ---- */
  const px = BX1, py = 145, RR = 30;
  const la = (1 - S2.lever) * 2.1 - 1.05;
  const hx2 = px + Math.cos(la)*RR, hy2 = py + Math.sin(la)*RR;
  g.save(); g.lineCap = 'round';
  g.strokeStyle = '#151a20'; g.lineWidth = 8;
  g.beginPath(); g.moveTo(px, py); g.lineTo(hx2, hy2); g.stroke();
  g.strokeStyle = EP.P.steelD; g.lineWidth = 5.4;
  g.beginPath(); g.moveTo(px, py); g.lineTo(hx2, hy2); g.stroke();
  g.restore();
  box(g, hx2-6, hy2-9, 12, 18, 5, EP.P.bakeliteL, '#0d1013', 1.1);
  g.save(); g.fillStyle = EP.P.steelDD;
  g.beginPath(); g.arc(px, py, 7, 0, EC.TAU); g.fill(); g.restore();
  txt(g, '5', px, py, {sz:9.5, b:1, c:'#e7ebf0'});
  txt(g, on ? '合' : '分', hx2 + 11, hy2, {sz:10.5, b:1, c:on ? C.ok : C.tx3, al:'left'});

  /* 速断的那一下：整排触头闪一圈 */
  if(S2.flash > 0 && S2.door > 0.55){
    g.save(); g.globalAlpha = Math.min(1, S2.flash * 3.6);
    box(g, BX0+8, 118, 136, 80, 8, null, C.warn, 2);
    g.restore();
  }

  /* 负载：一台三相电动机，转不转一眼看得见 */
  EP.motor(g, 224, 290, 17, {spin: on ? S2.spin : 0});
  txt(g, on ? '电动机在转' : '电动机停着', 224, 334,
      {sz:10, b:1, c: on ? C.ok : C.tx3});

  if(S2.msg) EP.chip(g, S2.msg, 84, 292, {sz:10, b:1, c:C.err});

  txt(g, '① 熔断器　② 速断弹簧　③ 静 / 动触头　④ 出线端子　⑤ 手柄',
      180, 350, {sz:9.5, c:C.tx3});
}

function note2(){
  const on = S2.leverT > 0.5, open = S2.doorT > 0.5;
  $('s2lv').textContent = on ? '扳手柄分闸' : '扳手柄合闸';
  $('s2dr').textContent = open ? '关上外壳' : '打开外壳';
  let h;
  if(S2.msg){
    h = '<div class="st bad">'+S2.msg+'</div>'+
        (open
          ? '这就是<b>机械联锁</b>：外壳一打开，速断弹簧那套机构就把合闸的路挡死了。'+
            '想合闸，先把盖子关上。<br>'+
            '<span class="sub">书上原话：「速断弹簧保证了外壳在打开的状态下，不能进行合闸。」</span>'
          : '合着闸的时候盖子打不开。想看里面、想换熔断器，规矩是：'+
            '<b>先拉闸 → 再开盖 → 再验电</b>。<br>'+
            '<span class="sub">这两道锁合起来就是一句话：盖子开着不能送电，送着电不能开盖子。</span>');
  }else if(on){
    h = '<div class="st good">合闸了</div>'+
        '注意刚才那一下：<b>你的手柄是匀速扳过去的，里面三把刀却是「啪」地一下同时到位的。</b>'+
        '那是速断弹簧干的 —— 它先攒劲，攒够了才放。<br>'+
        '<b>为什么要这么急？</b>触头分开的一瞬间会拉出电弧，弧温几千度，会把触头烧出麻点。'+
        '分得越快，弧越短、烧得越轻。<b>把分断速度从人手里拿走</b>，是这个零件的全部意义。';
  }else if(open){
    h = '<div class="st">盖子开了，里面就这些东西</div>'+
        '<b>①</b> 三个熔断器（过流保护，和闸刀里那根熔丝是一回事，只是做成了管状）、'+
        '<b>②</b> 速断弹簧、<b>③</b> 三对静触头和三把动触头（三相一起通断）、'+
        '<b>④</b> 出线端子、<b>⑤</b> 手柄。<br>'+
        '<span class="sub">现在试试直接扳手柄合闸 —— 看它让不让你合。</span>';
  }else{
    h = '<div class="st">分闸状态，盖子也关着</div>'+
        '从外面看它就是个铁盒子：一块铭牌、几个进出线的敲落孔、右边一个手柄。'+
        '<b>能看的东西全在里面</b>，所以先点「打开外壳」。<br>'+
        '<span class="sub">铭牌上那两个数（380V / 60A）就是额定电压和额定电流，选型时都不能比线路的实际值小。</span>';
  }
  $('n1').innerHTML = h;
}

$('s2lv').addEventListener('click', function(){
  if(S2.doorT > 0.5 && S2.leverT < 0.5){
    S2.msg = '外壳开着，合不了闸'; note2(); return;
  }
  S2.msg = ''; S2.leverT = S2.leverT > 0.5 ? 0 : 1; note2();
});
$('s2dr').addEventListener('click', function(){
  if(S2.leverT > 0.5 && S2.doorT < 0.5){
    S2.msg = '合着闸，箱盖打不开'; note2(); return;
  }
  S2.msg = ''; S2.doorT = S2.doorT > 0.5 ? 0 : 1; note2();
});

/* ================================================================
   场景 3：组合开关（转换开关）
   ================================================================ */
const S3 = { k:0, a:0, ph:0 };
const st3 = new Stage('cv2', 360, 300);
/* 三档手柄角度（从正上方顺时针算，弧度） */
const KA = [0, 1.05, 2.10];
/* 每一档哪几层闭合 */
const LAYER = [
  {t:'① 市电进线', on:[false,true,false]},
  {t:'② 备用电源进线', on:[false,false,true]},
  {t:'③ 辅助触点（送电指示）', on:[false,true,true]}
];
const KNOB = {x:74, y:148, r:46};
const XL = 214, XR = 306, YS = [78, 148, 218];

function draw3(dt){
  const g = st3.g; st3.clear();
  EP.heading(g, 20, 18, '组合开关', '转换开关　QS');

  S3.a += (KA[S3.k] - S3.a) * Math.min(1, dt*11);
  S3.ph += 60 * dt;

  /* ---- 旋钮 ---- */
  const K = KNOB;
  g.save();
  const kg = g.createRadialGradient(K.x-K.r*0.4, K.y-K.r*0.4, K.r*0.1, K.x, K.y, K.r);
  kg.addColorStop(0, '#69737e'); kg.addColorStop(0.6, '#39424d'); kg.addColorStop(1, '#1e242b');
  g.fillStyle = kg;
  g.beginPath(); g.arc(K.x, K.y, K.r, 0, EC.TAU); g.fill();
  g.strokeStyle = '#12171c'; g.lineWidth = 1.4; g.stroke();
  g.restore();
  ['0','1','2'].forEach(function(sname, i){
    const ang = -Math.PI/2 + KA[i];
    const rx = K.x + Math.cos(ang)*(K.r+15), ry = K.y + Math.sin(ang)*(K.r+15);
    const hit = (S3.k === i);
    txt(g, sname, rx, ry, {sz:hit?12.5:11, b:1, c:hit ? C.acc : C.tx3});
    g.save(); g.strokeStyle = hit ? C.acc : C.boxLine; g.lineWidth = hit ? 2 : 1.2;
    g.beginPath();
    g.moveTo(K.x + Math.cos(ang)*(K.r+2), K.y + Math.sin(ang)*(K.r+2));
    g.lineTo(K.x + Math.cos(ang)*(K.r+7), K.y + Math.sin(ang)*(K.r+7));
    g.stroke(); g.restore();
  });
  const ha = -Math.PI/2 + S3.a;
  g.save(); g.translate(K.x, K.y); g.rotate(ha);
  box(g, -7, -K.r+6, 14, K.r-2, 6, '#c0392b', '#7e1f16', 1.2);
  g.globalAlpha = .35; box(g, -4.4, -K.r+10, 3, K.r-12, 2, '#ffffff', null, 0);
  g.restore();
  g.save(); g.fillStyle = EP.P.steelDD;
  g.beginPath(); g.arc(K.x, K.y, 6.5, 0, EC.TAU); g.fill(); g.restore();
  txt(g, '手柄（点一下转一档）', K.x, K.y + K.r + 32, {sz:9.5, c:C.tx3});

  /* ---- 三层触片 ----
     动触片一头铰在左边那个静触点上，断开时**往下倒**。
     往上倒的话会撞到自己这一行的标签、还会伸进上一行里去（截图抓到的）。 */
  YS.forEach(function(y, i){
    const on = LAYER[i].on[S3.k];
    txt(g, LAYER[i].t, 160, y - 26, {sz:10, c:on ? C.acc : C.tx3, al:'left'});
    g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.4; g.lineCap = 'round';
    g.beginPath(); g.moveTo(160, y); g.lineTo(XL, y); g.stroke();
    g.beginPath(); g.moveTo(XR, y); g.lineTo(346, y); g.stroke();
    g.restore();
    EP.terminal(g, XL, y, 5);
    EP.terminal(g, XR, y, 5);
    g.save(); g.lineCap = 'round';
    g.translate(XL, y); g.rotate(on ? 0 : 0.32);
    g.strokeStyle = EP.P.copperD; g.lineWidth = 6;
    g.beginPath(); g.moveTo(0,0); g.lineTo(XR-XL, 0); g.stroke();
    g.strokeStyle = EP.P.copper; g.lineWidth = 3.8;
    g.beginPath(); g.moveTo(0,0); g.lineTo(XR-XL, 0); g.stroke();
    g.restore();
    if(on){
      EP.highlight(g, XL-8, y-9, XR-XL+16, 18, {r:9});
      EP.flow(g, new Path([[160,y],[346,y]]), {phase:S3.ph, gap:46, kind:'cur'});
    }
  });

  const msg = ['全部断开：两路电源都没接上', '接通市电（层①③闭合，层②断开）',
               '接通备用电源（层②③闭合，层①断开）'][S3.k];
  box(g, 20, 260, 320, 28, 6, S3.k ? C.accbg : C.box, S3.k ? C.acc : C.boxLine, 1.2);
  txt(g, msg, 180, 274, {sz:11, b:1, c:S3.k ? C.acc : C.tx2});
}

function note3(){
  const rows = LAYER.map(function(L, i){
    return '<tr><td class="eu-s">'+L.t+'</td>'+
      [0,1,2].map(function(k){
        const on = L.on[k];
        return '<td>'+(on ? '<b style="color:var(--ok)">闭合</b>' : '断开')+'</td>';
      }).join('')+'</tr>';
  }).join('');
  const tip = ['现在两路都断着 —— 这一档就是「停电检修位」，看得见的断口在这儿。',
               '现在走的是市电。<b>层②（备用电源）是断开的</b>，转轴上那一层的凸轮正顶着触片。',
               '现在走的是备用电源。<b>层①（市电）断开了。</b>你没做任何额外操作，它自己就断了。'][S3.k];
  $('n2').innerHTML =
    '<div class="st">当前在 '+S3.k+' 档</div>'+
    '<div class="eu-tw"><table class="eu-t"><thead><tr><th>哪一层</th>'+
      '<th>0 档</th><th>1 档</th><th>2 档</th></tr></thead><tbody>'+rows+'</tbody></table></div>'+
    '<div style="margin-top:8px">'+tip+'</div>';
}
function setK(k){
  S3.k = k;
  document.querySelectorAll('#s3p .btn').forEach(function(b){ b.classList.toggle('on', +b.dataset.k===k); });
  note3();
}
document.getElementById('s3p').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(b) setK(+b.dataset.k);
});
st3.cv.addEventListener('click', function(ev){
  const p = st3.pick(ev);
  if(Math.hypot(p[0]-KNOB.x, p[1]-KNOB.y) < KNOB.r + 16) setK((S3.k+1)%3);
});

/* ================================================================
   场景 4：符号
   ================================================================ */
const S4 = { k:0 };
const st4 = new Stage('cv3', 360, 274);
const SYM = [
  {key:'switch3-plain', t:'刀开关 QS'},
  {key:'switch3-fuse',  t:'熔断器式刀开关'},
  {key:'fuse-wide',     t:'熔断器 FU'},
  {key:'switch3-trip',  t:'断路器 QF'}
];
const CELL = [[14,30],[184,30],[14,152],[184,152]];
const CW = 162, CH = 96;

function draw4(){
  const g = st4.g; st4.clear();
  EP.heading(g, 20, 16, '四个符号，差别就在小记号上');
  SYM.forEach(function(s, i){
    const c = CELL[i];
    box(g, c[0], c[1], CW, CH, 8, C.card, S4.k===i ? C.acc : C.boxLine, S4.k===i ? 1.8 : 1);
    if(window.ESYM){
      g.save(); g.translate(c[0], c[1]);
      ESYM.drawKey(g, s.key, CW, CH, 10);
      g.restore();
    }else{
      txt(g, '（符号库没载入）', c[0]+CW/2, c[1]+CH/2, {sz:10, c:C.tx3});
    }
    txt(g, s.t, c[0]+CW/2, c[1]+CH+14, {sz:10.5, b:S4.k===i?1:0, c:S4.k===i ? C.acc : C.tx2});
  });
}
function setSym(k){
  S4.k = k;
  document.querySelectorAll('#s4p .btn').forEach(function(b){ b.classList.toggle('on', +b.dataset.k===k); });
  note4(); draw4();
}
document.getElementById('s4p').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(b) setSym(+b.dataset.k);
});
st4.cv.addEventListener('click', function(ev){
  const p = st4.pick(ev);
  CELL.forEach(function(c, i){
    if(p[0]>c[0] && p[0]<c[0]+CW && p[1]>c[1] && p[1]<c[1]+CH) setSym(i);
  });
});
function note4(){
  const m = [
    ['刀开关 QS（三极）',
     '三根竖线＝三相，每相一片斜着的刀。顶上那条<b>虚线</b>是「机械联动」——'+
     '意思是三片刀装在同一根轴上，<b>要动一起动</b>，不会只断一相。<br>'+
     '<span class="sub">闸刀开关、组合开关在图纸上都长这样。少了那条虚线就变成三个各管各的独立开关，含义完全不同。</span>'],
    ['熔断器式刀开关（铁壳开关那一类）',
     '在刀开关的基础上，每相下面多了一个<b>小方框</b>—— 那是<b>熔断器</b>。'+
     '一个符号说了两件事：既能手动通断，又带过流保护。<br>'+
     '<span class="sub">上面那个空心小圆是铰接点。铁壳开关在图纸上就画成这个样子。</span>'],
    ['熔断器 FU',
     '一个长方框，中间一条线穿过去 —— 就这么简单。<b>它自己不会动</b>，'+
     '只会在电流过大时烧断。<br>'+
     '<span class="sub">画在哪儿很有讲究：熔断器永远画在它要保护的那一段的<b>电源侧</b>。'+
     '第 4 章看整张图时，顺着熔断器往下找，就知道它保的是谁。</span>'],
    ['断路器 QF（俗称空气开关、空开）',
     '刀片上多了一个 <b>×</b>。这个记号的意思是<b>「有自动脱扣机构」</b>——'+
     '过载、短路时它<b>自己</b>会跳闸，跳完还能再合上，不用换零件。<br>'+
     '<span class="sub">这正是它取代闸刀开关的原因：熔丝断了要换，断路器跳了推上去就行。第 5 章讲怎么测它好坏。</span>']
  ][S4.k];
  $('n3').innerHTML = '<div class="st">'+m[0]+'</div>'+m[1];
}

/* ================================================================
   绑定
   ================================================================ */
$('s1sw').addEventListener('click', toggle1);
$('s1fx').addEventListener('click', function(){ S1.fuse = true; S1.heat = 0; note1(); });
$('s1i').addEventListener('input', function(e){ S1.load = +e.target.value; note1(); });
document.getElementById('s1wire').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S1.top = b.dataset.w === '1';
  document.querySelectorAll('#s1wire .btn').forEach(function(x){ x.classList.toggle('on', x===b); });
  note1();
});

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:2, sec:'2.1'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('2.1');
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
