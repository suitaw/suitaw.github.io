/* 8.3 选多大的断路器和线 —— 本节内容的唯一真相。
   对应《零基础学电工》第 8 章 8.2.1 节里「系统用电负荷的计算」和
   「供配电器件及线缆的选配」两部分（书内 P142~P146）。

   **这一节是第 8 章里唯一能真算的一节**，也是就业优先级里的第 ⑤ 项（选型）。
   四屏：① 一条支路怎么算 ② 总断路器不是简单相加 ③ 线径和断路器怎么配
        ④ 断路器型号怎么读

   数字与说法的出处（书上图 8-10 的五段注文，逐条照录，别凭记忆改）：
   - **厨房支路**：专给厨房中的电器设备（电水壶、电磁炉、微波炉、抽油烟机）供电。
     估计总用电功率约为 **3000 W**，按计算公式 **I = P/U = 3000W/220V ≈ 14A**，
     一般选用 **16A（≥14A）双进双出带漏电保护**的断路器
   - **卫生间支路**：洗衣机、热水器、浴霸、电吹风等。
     估计总用电功率 **1500~3500 W**，**I = 3500W/220V ≈ 16A**，
     一般选用 **16A 双进双出带漏电保护功能**的断路器
   - **普通插座支路**：电视机、计算机、充电器、组合音响、台灯等小功率家电的插座。
     估计总用电功率 **2000~2500 W**，**I = 2500W/220V ≈ 10A**，
     一般选用 **16A 双进双出带漏电保护功能**的断路器
   - **空调支路**：空调器为大功率家用电器，估计总用电功率 **2000~4000 W**，
     **I = 4000W/220V = 18A**，一般选用 **20A 单进单出**断路器
   - **照明支路**：8~10 只节能灯（4~25W）、吊灯（40~100W）、吊顶灯（25~125W）等，
     估计总用电功率 **100~425 W**，**I = 425W/220V ≈ 2A**，
     一般选用 **10A 的单进单出**断路器
   - **总断路器**（书 P145 提示说明原文）：额定电流应大于分支断路器总电流 × 实用系数，
     即 **(16+16+16+20)A × (60%~70%) ≈ 40.8~47.6A**，
     **实际应选大于 47.6A 的总断路器**
   - **按线材配比**（书 P145 原文）：**1.5mm² 配 10A、2.5mm² 配 16A、4mm² 配 20A**；
     为避免因市电电压不稳定、线路过热而导致断路器频繁跳闸，
     可提高配比，**一般选择高配方式：1.5mm² 配 16A、2.5mm² 配 20A、4mm² 配 25A**
   - **表 8-1 铜芯导线载流量**：
     2.5 mm²（直径 1.78 mm）安全载流量 **28 A**，允许长期电流 **16~25 A**；
     4 mm²（2.25 mm）**35 A**，**25~32 A**；
     6 mm²（2.77 mm）**48 A**，**32~40 A**
   - **线缆选配**（书 P145~146）：总配电箱及干线 **10 mm²**、楼层配电箱 **8 mm²**、
     室内支路 **4 或 6 mm²**，**护管直径 25 mm**
   - **导线截面积的选择依据**（书 P146）：按承载用电设备总电流
     （本线路所有常用电器最大功率之和 ÷ 220V ＝ 总电流）的大小
   - **端电压与额定电压不得相差 ±5%**（书 P146）；按允许电压损失选截面的公式
     **S = PL / (γ·ΔUa·Ue²) × 100**（γ 铜 58×10⁻⁶、铝 35×10⁻⁶ 1/Ω·m）——
     这一条只点一句，不做计算：**现场用的是表和配比，不是这个式子**
   - **断路器型号 DZ47-32 3 1 0 / C 25 各段含义**（书上图 8-11）：
     **D** 产品＝断路器；**Z** 类型（W 万能式／WX 万能式限流型／Z 塑料外壳式／
     ZX 塑壳限流型／ZL 漏电保护式／SL 快速断路器／M 灭磁断路器）；
     **47** 设计序号；**32** 架构等级额定电流＝外壳能承受的最大电流；
     **3** 极数（可省略）；**1** 脱扣器类别（0 无／1 热／2 电磁／3 复式）；
     **0** 辅助触头（0 无／2 有）；**C** 应用场合（C 照明保护型／D 动力保护型）；
     **25** 额定电流＝在规定条件下可长期通过脱扣器的最大工作电流 */
(function(){
'use strict';
ELEC.reg({
  id: '8.3',
  file: 'c8-3.html',
  title: '8.3 选多大的断路器和线',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>一条支路</button>
    <button class="tab" data-i="1"><span class="n">2</span>总断路器</button>
    <button class="tab" data-i="2"><span class="n">3</span>线和闸</button>
    <button class="tab" data-i="3"><span class="n">4</span>型号怎么读</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">一条支路只要算一步：I = P ÷ U</div>
    把这条支路上所有电器的功率加起来，除以 220 V，就是这一路的电流。
    <b>算出来之后往上取一档标准值</b> —— 断路器的额定电流必须大于它。
    <b>选一路，拖滑杆改功率，看断路器该选多大。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">厨房</button>
        <button class="btn sm" data-k="1">卫生间</button>
        <button class="btn sm" data-k="2">插座</button>
        <button class="btn sm" data-k="3">空调</button>
        <button class="btn sm" data-k="4">照明</button>
      </div>
      <div class="rowlab">这一路的总功率　<b id="s1pv">3000 W</b></div>
      <input type="range" id="s1p" min="100" max="5000" step="50" value="3000">
      <div class="nums three">
        <div class="num"><div class="k">总功率 P</div><div class="v" id="s1a">3000 W</div></div>
        <div class="num"><div class="k">电流 I</div><div class="v" id="s1b">13.6 A</div></div>
        <div class="num hi"><div class="k">选多大</div><div class="v" id="s1c">16 A</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">书上给的五路（图 8-10 的注，逐条照录）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>支路</th><th>估计功率</th><th>算出的电流</th><th>选的断路器</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">厨房</td><td>约 3000 W</td><td>≈ 14 A</td>
          <td><b>16 A</b> 双进双出<br><span class="sub">带漏电</span></td></tr>
        <tr><td class="eu-s">卫生间</td><td>1500~3500 W</td><td>≈ 16 A</td>
          <td><b>16 A</b> 双进双出<br><span class="sub">带漏电</span></td></tr>
        <tr><td class="eu-s">普通插座</td><td>2000~2500 W</td><td>≈ 10 A</td>
          <td><b>16 A</b> 双进双出<br><span class="sub">带漏电</span></td></tr>
        <tr><td class="eu-s">空调</td><td>2000~4000 W</td><td>= 18 A</td>
          <td><b>20 A</b> 单进单出</td></tr>
        <tr><td class="eu-s">照明</td><td>100~425 W</td><td>≈ 2 A</td>
          <td><b>10 A</b> 单进单出</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>注意插座那一路：算出来才 10 A，却选了 16 A 的断路器。</b>
      <span class="sub">因为插座是<b>不确定负荷</b> —— 谁也不知道下一个插上来的是什么。
      而厨房算出 14 A 也选 16 A、空调算出 18 A 选 20 A，
      都是同一个动作：<b>算出来的值往上取一档标准值</b>。
      标准档位就那么几个：6、10、16、20、25、32、40、63 A。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">断路器选大了，比选小了更危险</div>
    选小了：稍微多开两个电器就跳闸，<b>烦人但安全</b>。
    选大了：<b>线已经烧起来了，闸还没跳。</b>
    <div class="tip">
      <b>断路器保护的从来不是电器，是那根线。</b>
      <span class="sub">电器自己有保险丝、有内部保护；
      而<b>埋在墙里的那根线一旦过载发热，没有任何东西会告诉你</b> ——
      除了这只断路器。所以它的额定电流必须<b>同时满足两个条件</b>：
      大于这一路的计算电流（不误跳），<b>小于这根线的允许载流量</b>（保得住线）。
      屏 3 讲的就是后面那一半。</span>
    </div>
  </div>

  <div class="bet" data-bet="c83-big" data-q="家里空调那一路老跳闸，有人建议把 20 A 的断路器换成 40 A 的。这么做会怎样？"
       data-opts="挺好，不跳了|危险——线还是那根线，载流量没变，现在是线烧了闸也不跳|没区别，断路器只管短路"
       data-right="1"
       data-after="危险。断路器保护的是线不是电器：换大之后，那根按 20 A 配的线（通常 4 mm²）在 30 多安的电流下会持续发热，而闸不会跳。老跳闸的正确处理是先查为什么——是接头松了发热、还是真的加了大功率电器；真要加容量，得连线一起换粗。"></div>
</section>

<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">总断路器不是把各路加起来</div>
    五路加起来 68 A，可总闸不用选 68 A —— 因为<b>它们不会同时满载</b>。
    书上给了一个系数：<b>60%~70%</b>。<b>拖滑杆看这个系数怎么用。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="rowlab">需用系数　<b id="s2kv">65 %</b></div>
      <input type="range" id="s2k" min="50" max="100" step="5" value="65">
      <div class="nums three">
        <div class="num"><div class="k">各路相加</div><div class="v" id="s2a">68 A</div></div>
        <div class="num"><div class="k">乘系数后</div><div class="v" id="s2b">44.2 A</div></div>
        <div class="num hi"><div class="k">总闸选</div><div class="v" id="s2c">50 A</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">书上那一步计算（P145 提示说明，原文照录）</div>
    <div class="tip info" style="margin-top:0">
      <b>「选总断路器的额定电流应大于分支断路器总电流 × 实用系数，
      即（16＋16＋16＋20）A ×（60%~70%）≈ 40.8~47.6 A，
      实际应选大于 47.6 A 的总断路器。」</b>
      <span class="sub">书上这一步只加了四路（16＋16＋16＋20 ＝ 68 A），
      照明那 10 A 没算进去 —— 因为照明功率太小（425 W ≈ 2 A），
      对总电流几乎没影响。<b>算总闸时抓大放小是常规做法。</b></span>
    </div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>步</th><th>算什么</th><th>得数</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">①</td><td>各支路断路器额定电流相加</td><td>16+16+16+20 = <b>68 A</b></td></tr>
        <tr><td class="eu-s">②</td><td>乘需用系数 60%~70%</td><td><b>40.8 ~ 47.6 A</b></td></tr>
        <tr><td class="eu-s">③</td><td>往上取标准档</td><td>大于 47.6 ⇒ 选 <b>50 或 63 A</b></td></tr>
      </tbody>
    </table></div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st good">这个系数为什么是 60%~70%</div>
    因为<b>家里所有电器同时满功率运行，这件事不会发生</b>。
    做饭的时候不开浴霸，看电视的时候电磁炉是关的。
    <div class="tip info">
      <b>这在工程上叫「需用系数」（也叫同时系数），是统计出来的经验值。</b>
      <span class="sub">住宅取 0.6~0.7；要是给一间三班倒的车间配电，
      设备几乎一直都在转，系数就得取到 0.9 以上。
      <b>它的本质是：按最坏情况选，成本高得离谱；按平均选，又会频繁跳闸。</b>
      这个系数就是两者之间那条线。
      <hr>反过来说：<b>要是一户人家真的同时开满所有电器，总闸跳了，那不是故障</b> ——
      是它在正确工作。</span>
    </div>
  </div>

  <div class="bet" data-bet="c83-sum" data-q="五路支路的断路器分别是 16、16、16、20、10 A，总闸该选多大？"
       data-opts="78 A，把它们加起来|50 A 左右——加起来再乘 60%~70% 的需用系数|32 A，取最大那一路的"
       data-right="1"
       data-after="加起来再乘系数。书上的算法：(16+16+16+20)×(60%~70%) ≈ 40.8~47.6 A，选大于 47.6 的标准档，也就是 50 A 或 63 A。直接相加是按「所有电器同时满载」算的，那种情况不会发生，选出来的闸又贵又保护不了什么；取最大那一路更不行——总电流肯定超过任何单独一路。"></div>
</section>

<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">线和闸是配对的，不能单独选</div>
    断路器保护的是<b>线</b>。所以选定了断路器，那根线就不能比它「细」；
    反过来，线定了，断路器也不能比它「大」。
    <b>选一个线径，看该配多大的闸、这根线能扛多少。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on sm" data-k="0">1.5 mm²</button>
        <button class="btn sm" data-k="1">2.5 mm²</button>
        <button class="btn sm" data-k="2">4 mm²</button>
        <button class="btn sm" data-k="3">6 mm²</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">基本配比</div><div class="v" id="s3a">10 A</div></div>
        <div class="num"><div class="k">高配</div><div class="v" id="s3b">16 A</div></div>
        <div class="num hi"><div class="k">安全<br>载流量</div><div class="v" id="s3c">—</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">两套配比（书 P145 原文）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>线径</th><th>基本配比</th><th>高配方式</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">1.5 mm²</td><td>10 A</td><td><b>16 A</b></td></tr>
        <tr><td class="eu-s">2.5 mm²</td><td>16 A</td><td><b>20 A</b></td></tr>
        <tr><td class="eu-s">4 mm²</td><td>20 A</td><td><b>25 A</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>书上说高配是为了什么：</b>
      <span class="sub">「为避免因<b>市电电压不稳定、线路过热</b>而导致断路器
      <b>频繁跳闸</b>，可提高断路器与电线的配比。<b>一般选择高配方式。</b>」
      <hr>注意它给的理由是<b>避免误跳</b>，不是「能多带电器」。
      高配之后线的载流量一点没变 —— <b>能带多少还是看线</b>。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">表 8-1　铜芯导线的载流量（书 P146）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>横截面积</th><th>直径</th><th>安全载流量</th><th>允许长期电流</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">2.5 mm²</td><td>1.78 mm</td><td>28 A</td><td><b>16 ~ 25 A</b></td></tr>
        <tr><td class="eu-s">4 mm²</td><td>2.25 mm</td><td>35 A</td><td><b>25 ~ 32 A</b></td></tr>
        <tr><td class="eu-s">6 mm²</td><td>2.77 mm</td><td>48 A</td><td><b>32 ~ 40 A</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>「安全载流量」和「允许长期电流」是两个数，别混。</b>
      <span class="sub">安全载流量是<b>短时能扛的上限</b>；
      允许长期电流才是<b>可以一直这么用的值</b>。
      选线要按后面那个 —— 前面那个是留给启动电流、短时冲击的余量。
      <hr><b>6.1 那节讲剥线工具时提过 2.25 mm 这个直径</b>，
      就是这张表里 4 mm² 那一行 —— 同一个数，一个用来选剥线工具，
      一个用来算载流量。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">线缆用在哪一级（书 P145~146）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>位置</th><th>截面积</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">总配电箱及干线</td><td><b>10 mm²</b></td></tr>
        <tr><td class="eu-s">楼层配电箱</td><td><b>8 mm²</b></td></tr>
        <tr><td class="eu-s">室内支路</td><td><b>4 或 6 mm²</b></td></tr>
        <tr><td class="eu-s">护管直径</td><td><b>25 mm</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>越往上游越粗</b> —— 和 8.1 屏 2 那条「越往上游，允许通过的电流越大」是同一件事。
      <span class="sub">书上还给了一个按<b>允许电压损失</b>选截面的公式
      （S = PL / (γ·ΔUa·Ue²) × 100，铜的电导率 γ = 58×10⁻⁶ 1/Ω·m），
      要求<b>端电压与额定电压相差不得超过 ±5%</b>。
      <b>那个式子是线路很长时才用的</b>（比如工地临时用电拉几百米），
      户内配电用不上 —— 现场用的是上面这两张表。</span>
    </div>
  </div>
</section>

<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">断路器上印的那一串，一段一段拆开读</div>
    书上图 8-11 拆的是 <b>DZ47-32 3 1 0 / C 25</b>。
    <b>点画布上的任意一段</b>，看它是什么意思。
    最要紧的是<b>最后那个 25</b> —— 那才是额定电流。
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="nums three">
        <div class="num"><div class="k">这一段</div><div class="v" id="s4a">D</div></div>
        <div class="num"><div class="k">是什么</div><div class="v" id="s4b">产品代号</div></div>
        <div class="num hi"><div class="k">要不要<br>记</div><div class="v" id="s4c">认得出</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">九段各是什么（书上图 8-11）</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>段</th><th>含义</th><th>取值</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">D</td><td>产品</td><td>D ＝ 断路器</td></tr>
        <tr><td class="eu-s">Z</td><td>类型</td><td>Z 塑料外壳式／W 万能式／<b>ZL 漏电保护式</b>／
          ZX 塑壳限流／WX 万能限流／SL 快速／M 灭磁</td></tr>
        <tr><td class="eu-s">47</td><td>设计序号</td><td>厂家自定</td></tr>
        <tr><td class="eu-s">32</td><td><b>外壳能承受的最大电流</b><br>
          <span class="sub">架构等级额定电流</span></td><td>32 表示 32 A</td></tr>
        <tr><td class="eu-s">3</td><td>极数（可省略）</td><td>1／2／3／4</td></tr>
        <tr><td class="eu-s">1</td><td>脱扣器类别</td><td>0 无／<b>1 热</b>／2 电磁／3 复式</td></tr>
        <tr><td class="eu-s">0</td><td>辅助触头</td><td>0 无／2 有</td></tr>
        <tr><td class="eu-s">C</td><td>应用场合</td><td><b>C 照明保护型</b>／D 动力保护型</td></tr>
        <tr><td class="eu-s">25</td><td class="rd"><b>额定电流</b><br>
          <span class="sub">可长期通过脱扣器的最大工作电流</span></td>
          <td class="rd"><b>25 A —— 选型看的就是它</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>32 和 25 是两个数，最容易混。</b>
      <span class="sub"><b>32</b> 是<b>外壳</b>（架构）能承受的最大电流 ——
      同一个壳可以装 6A、10A、16A、25A、32A 各种脱扣器；
      <b>25</b> 才是<b>这一只</b>的额定电流，也是屏 1、屏 2 算出来要对照的那个数。
      <hr><b>买断路器报规格时说的是后面那个</b>：
      「DZ47-60 C25」，说的是 25 A。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="8.3">
    <div class="qz" data-q="厨房支路估算总功率 3000 W，220 V 供电。这一路的电流是多少、该选多大的断路器？"
      data-opts="约 14 A，选 16 A|约 14 A，选 10 A|约 3 A，选 6 A"
      data-right="0"
      data-why="I = P/U = 3000W ÷ 220V ≈ 14 A（书上原文就是这一步）。断路器的额定电流必须大于计算电流，所以往上取一档标准值：16 A。选 10 A 会频繁跳闸；标准档位是 6、10、16、20、25、32、40、63 A 这几个，没有 14 A 这一档。厨房还要求双进双出带漏电保护。"></div>
    <div class="qz" data-q="五路支路的断路器是 16、16、16、20 A（照明那 10 A 忽略），总断路器该选多大？"
      data-opts="68 A，把它们加起来|大于 47.6 A，也就是 50 或 63 A|20 A，取最大那一路"
      data-right="1"
      data-why="书上原文的算法：(16+16+16+20)A × (60%~70%) ≈ 40.8~47.6 A，实际应选大于 47.6 A 的总断路器。那个 60%~70% 叫需用系数——家里所有电器同时满功率运行这件事不会发生，做饭时不开浴霸，看电视时电磁炉是关的。直接相加选出来的闸又贵又保护不了什么。"></div>
    <div class="qz" data-q="一根 2.5 mm² 的铜线，按书上的「高配方式」该配多大的断路器？"
      data-opts="16 A|20 A|32 A"
      data-right="1"
      data-why="高配方式：1.5mm² 配 16A、2.5mm² 配 20A、4mm² 配 25A（基本配比则是 10/16/20 A）。书上给高配的理由是「避免因市电电压不稳定、线路过热而导致断路器频繁跳闸」——注意是避免误跳，不是能多带电器。线的载流量一点没变：表 8-1 里 2.5 mm² 的允许长期电流是 16~25 A。"></div>
    <div class="qz" data-q="断路器型号 DZ47-32 3 1 0/C 25 里，「32」和「25」分别是什么？"
      data-opts="32 是额定电流，25 是设计序号|32 是外壳能承受的最大电流（架构等级），25 才是这一只的额定电流|两个都是电流，可以互换着说"
      data-right="1"
      data-why="32 是架构等级额定电流，也就是外壳能承受的最大电流——同一个壳可以装 6A、10A、16A、25A、32A 各种脱扣器；25 才是这一只的额定电流（在规定条件下可长期通过脱扣器的最大工作电流），也是屏 1、屏 2 算出来要对照的那个数。买断路器报规格说的是后面那个。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 8 章 8.2.1 节（书内 P142~P146）</div>
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

function seg(g, pts, c, lw){ new Path(pts).stroke(g, lw || 2.2, c || C.wire); }
const CONC = { ok:['okbg','ok'], err:['errbg','err'], warn:['warnbg','warn'], acc:['accbg','acc'] };
function conc(g, y, kind, l1, l2){
  const m = CONC[kind] || CONC.acc;
  box(g, 16, y, 328, 34, 6, C[m[0]], C[m[1]], 1);
  txt(g, l1, 180, y + 13, {sz:10.5, b:1, c:C[m[1]]});
  txt(g, l2, 180, y + 26, {sz:9, c:C.tx2});
}
/* 断路器的标准档位 —— 算出来的电流一律往上取一档 */
const STD = [6, 10, 16, 20, 25, 32, 40, 50, 63];
function pick(I){
  for(let i = 0; i < STD.length; i++) if(STD[i] >= I) return STD[i];
  return STD[STD.length-1];
}

/* ================================================================
   场景 1：一条支路怎么算
   ================================================================
   一根横条表示这一路的电流，上面标着各档标准值的刻度线；
   **算出来的电流落在哪两档之间，就取右边那一档** —— 这件事画出来最直接 */
const CIR = [
  {n:'厨房',   p0:3000, dev:'电水壶、电磁炉、微波炉、抽油烟机', book:'约 3000 W → ≈14 A → 16 A 双进双出带漏电'},
  {n:'卫生间', p0:3500, dev:'洗衣机、热水器、浴霸、电吹风',     book:'1500~3500 W → ≈16 A → 16 A 双进双出带漏电'},
  {n:'插座',   p0:2500, dev:'电视机、计算机、充电器、音响、台灯', book:'2000~2500 W → ≈10 A → 16 A 双进双出带漏电'},
  {n:'空调',   p0:4000, dev:'空调器',                          book:'2000~4000 W → =18 A → 20 A 单进单出'},
  {n:'照明',   p0:425,  dev:'节能灯、吊灯、吊顶灯',             book:'100~425 W → ≈2 A → 10 A 单进单出'}
];
const S1 = { k:0, p:3000 };
const AX = [40, 330], AY = 140, IMAX = 32;
function ix(I){ return AX[0] + (AX[1]-AX[0]) * Math.min(I, IMAX) / IMAX; }
function draw1(){
  const g = st1.g; st1.clear();
  const c = CIR[S1.k], I = S1.p / 220, sel = pick(I);
  EP.heading(g, 14, 20, c.n + '支路', c.dev);

  /* 电流轴 */
  seg(g, [[AX[0], AY],[AX[1], AY]], C.boxLine, 2);
  STD.forEach(function(v){
    if(v > IMAX) return;
    const x = ix(v);
    seg(g, [[x, AY - 6],[x, AY + 6]], v === sel ? C.ok : C.boxLine, v === sel ? 2.4 : 1.2);
    txt(g, String(v), x, AY + 18, {sz:8, b: v === sel ? 1 : 0, c: v === sel ? C.ok : C.tx3});
  });
  txt(g, '断路器的标准档位 / A', AX[1], AY + 34, {sz:8.5, c:C.tx3, al:'right'});

  /* 算出来的电流：一根从 0 长到 I 的条 */
  g.save(); g.fillStyle = C.acc; g.globalAlpha = .30;
  g.fillRect(AX[0], AY - 30, ix(I) - AX[0], 22); g.restore();
  seg(g, [[ix(I), AY - 34],[ix(I), AY + 8]], C.acc, 2);
  EP.chip(g, I.toFixed(1) + ' A', ix(I), AY - 46, {sz:10, b:1, c:C.acc});
  txt(g, '算出来的电流', AX[0] + 4, AY - 19, {sz:8.5, b:1, c:C.acc, al:'left'});

  /* 选中的那一档 */
  g.save(); g.fillStyle = C.ok; g.globalAlpha = .16;
  g.fillRect(ix(I), AY - 30, ix(sel) - ix(I), 22); g.restore();
  /* 「选 X A」不做成 chip：它和上面那个只差 20 px，必然叠在一起。
     绿色刻度已经把它标出来了，这儿只补一句文字 */
  txt(g, '⇒ 选 ' + sel + ' A', AX[0], AY + 34, {sz:9.5, b:1, c:C.ok, al:'left'});

  /* 公式 */
  txt(g, 'I  =  P ÷ U  =  ' + S1.p + ' W ÷ 220 V  =  ' + I.toFixed(1) + ' A',
      180, 74, {sz:11, b:1, c:C.tx});


  conc(g, 196, 'ok', c.n + '：算出 ' + I.toFixed(1) + ' A ⇒ 选 ' + sel + ' A',
       '书上：' + c.book);
}
function note1(){
  const c = CIR[S1.k], I = S1.p / 220, sel = pick(I);
  $('s1a').textContent = S1.p + ' W';
  $('s1b').textContent = I.toFixed(1) + ' A';
  $('s1c').textContent = sel + ' A';
  let h = '<div class="st">' + c.n + '支路：' + c.dev + '</div>' +
    '书上给这一路的估算是 <b>' + c.book + '</b>。' +
    '<hr>算法只有一步：<b>把这一路上所有电器的功率加起来，除以 220 V</b>。' +
    '现在滑杆停在 <b>' + S1.p + ' W</b>，算出 <b>' + I.toFixed(1) + ' A</b>，' +
    '往上取一档就是 <b>' + sel + ' A</b>。';
  if(S1.k === 2){
    h += '<hr><b>插座这一路要多想一层：算出来才 10 A，书上却选了 16 A。</b>' +
      '<span class="sub">因为插座是<b>不确定负荷</b> —— 今天插台灯，' +
      '明天可能插电暖器。留出余量不是浪费，是给「以后」留的。' +
      '但余量也不能无限留：<b>断路器再大也不能超过那根线的载流量</b>（屏 3）。</span>';
  }
  if(S1.k === 3){
    h += '<hr><b>空调这一路书上选的是单进单出</b>，' +
      '而厨房、卫生间、插座三路都要求<b>双进双出带漏电保护</b>。' +
      '<span class="sub">分别在于<b>会不会有人直接接触</b>：' +
      '插座、潮湿场所（厨卫）人手能碰到，必须有漏电保护；' +
      '空调是固定安装的设备，走的是专线。' +
      '<b>不过现行做法一般也给空调支路配漏电保护</b> —— 外机在室外，容易进水。</span>';
  }
  if(S1.k === 4){
    h += '<hr><b>照明这一路的电流小得出奇：全屋灯加起来才 2 A 左右。</b>' +
      '<span class="sub">书上算的是 425 W ÷ 220 V ≈ 2 A，' +
      '而选的断路器是 10 A —— 差了五倍。' +
      '这不是浪费：<b>10 A 已经是最小的常用档</b>，' +
      '而且照明支路的线一般是 1.5 mm²，配 10 A 正好（屏 3 的基本配比）。</span>';
  }
  $('n0').innerHTML = h;
}

/* ================================================================
   场景 2：总断路器不是简单相加
   ================================================================
   四根支路条堆成一根「相加」的长条，再乘系数缩短 ——
   **「缩短」这个动作画出来，比写一个乘法管用** */
const BR = [{n:'厨房', a:16}, {n:'卫生间', a:16}, {n:'插座', a:16}, {n:'空调', a:20}];
const SUM = 68;
const S2 = { k:65 };
const BX = [40, 330], BMAX = 72;
function bx(v){ return BX[0] + (BX[1]-BX[0]) * v / BMAX; }
function draw2(){
  const g = st2.g; st2.clear();
  const k = S2.k / 100, after = SUM * k, sel = pick(after);
  EP.heading(g, 14, 20, '总断路器', '各路相加 × 需用系数');

  /* 第一根条：四路相加 */
  let x = BX[0];
  const cols = ['#e8b93c', '#4fc04a', '#4ea3ff', '#ff8f4e'];
  BR.forEach(function(b, i){
    const w = bx(b.a) - BX[0];
    g.save(); g.fillStyle = cols[i]; g.globalAlpha = .55;
    g.fillRect(x, 62, w, 26); g.restore();
    g.save(); g.strokeStyle = cols[i]; g.lineWidth = 1.2;
    g.strokeRect(x, 62, w, 26); g.restore();
    if(w > 34) txt(g, b.a + ' A', x + w/2, 75, {sz:9, b:1, c:C.tx});
    txt(g, b.n, x + w/2, 100, {sz:8, c:C.tx3});
    x += w;
  });
  txt(g, '四路相加 = ' + SUM + ' A', BX[0], 50, {sz:9.5, b:1, c:C.tx2, al:'left'});

  /* 第二根条：乘完系数 */
  g.save(); g.fillStyle = C.acc; g.globalAlpha = .35;
  g.fillRect(BX[0], 130, bx(after) - BX[0], 26); g.restore();
  g.save(); g.strokeStyle = C.acc; g.lineWidth = 1.4;
  g.strokeRect(BX[0], 130, bx(after) - BX[0], 26); g.restore();
  txt(g, '× ' + S2.k + '%  =  ' + after.toFixed(1) + ' A', BX[0], 118,
      {sz:9.5, b:1, c:C.acc, al:'left'});
  /* 缩短了多少 —— 画一段虚线补回原长度 */
  g.save(); g.setLineDash([4,3]); g.strokeStyle = C.tx3; g.lineWidth = 1;
  g.strokeRect(bx(after), 130, bx(SUM) - bx(after), 26); g.restore();
  txt(g, '省掉的', (bx(after) + bx(SUM))/2, 143, {sz:8, c:C.tx3});

  /* 标准档位轴 */
  seg(g, [[BX[0], 186],[BX[1], 186]], C.boxLine, 2);
  STD.forEach(function(v){
    if(v > BMAX) return;
    const px = bx(v);
    seg(g, [[px, 180],[px, 192]], v === sel ? C.ok : C.boxLine, v === sel ? 2.4 : 1.2);
    txt(g, String(v), px, 204, {sz:8, b: v === sel ? 1 : 0, c: v === sel ? C.ok : C.tx3});
  });
  seg(g, [[bx(after), 156],[bx(after), 180]], C.acc, 1.6);
  EP.chip(g, '选 ' + sel + ' A', bx(sel), 168, {sz:10, b:1, c:C.ok});

  conc(g, 222, 'ok', SUM + ' A × ' + S2.k + '% = ' + after.toFixed(1) + ' A ⇒ 选 ' + sel + ' A',
       '书上：×（60%~70%）≈ 40.8~47.6 A，实际应选大于 47.6 A 的');
}
function note2(){
  const k = S2.k / 100, after = SUM * k, sel = pick(after);
  $('s2a').textContent = SUM + ' A';
  $('s2b').textContent = after.toFixed(1) + ' A';
  $('s2c').textContent = sel + ' A';
  let h = '<div class="st">需用系数 ' + S2.k + '%</div>' +
    '四路支路断路器加起来 <b>' + SUM + ' A</b>，乘上 <b>' + S2.k + '%</b> ' +
    '得 <b>' + after.toFixed(1) + ' A</b>，往上取标准档就是 <b>' + sel + ' A</b>。';
  if(S2.k <= 70 && S2.k >= 60){
    h += '<hr><b>这就是书上给的范围（60%~70%）。</b>' +
      '<span class="sub">住宅取这一档，因为所有电器同时满功率运行这件事不会发生 ——' +
      '做饭的时候不开浴霸，看电视的时候电磁炉是关的。</span>';
  } else if(S2.k > 70){
    h += '<hr><b>系数取得比书上高了。</b>' +
      '<span class="sub">系数越大，选出来的总闸越大 —— <b>越不容易误跳，' +
      '但对下游的保护也越弱</b>。' +
      '给三班倒的车间配电才会取到 0.9 以上（设备几乎一直在转）；' +
      '住宅取这么高，总闸基本形同虚设：任何一路出问题都轮不到它跳。</span>';
  } else {
    h += '<hr><b>系数取得比书上低了。</b>' +
      '<span class="sub">选出来的总闸偏小，<b>正常用电就可能跳闸</b> ——' +
      '比如冬天同时开浴霸和电暖器。' +
      '总闸一跳是整户黑，比某一路跳麻烦得多。</span>';
  }
  h += '<hr><b>书上那一步只加了四路，照明那 10 A 没算进去</b>' +
    '（照明才 425 W ≈ 2 A，对总电流几乎没影响）。' +
    '<b>算总闸时抓大放小是常规做法。</b>';
  $('n1').innerHTML = h;
}

/* ================================================================
   场景 3：线和闸配对
   ================================================================
   一根按比例画粗细的导线 + 两个配比 + 载流量刻度。
   **线的粗细要真按截面积的平方根来**，不然 1.5 和 6 看着差不多 */
const WIRE = [
  {s:'1.5', base:10, hi:16, dia:null, safe:null, long:null},
  {s:'2.5', base:16, hi:20, dia:'1.78', safe:28, long:'16 ~ 25'},
  {s:'4',   base:20, hi:25, dia:'2.25', safe:35, long:'25 ~ 32'},
  {s:'6',   base:null, hi:null, dia:'2.77', safe:48, long:'32 ~ 40'}
];
const S3 = { k:0 };
function draw3(){
  const g = st3.g; st3.clear();
  const w = WIRE[S3.k];
  EP.heading(g, 14, 20, w.s + ' mm² 铜线', w.dia ? '直径 ' + w.dia + ' mm' : '照明支路常用');

  /* 导线：粗细按截面积开方 */
  const r = 5 + Math.sqrt(parseFloat(w.s)) * 4.2;
  g.save(); g.lineCap = 'round';
  g.strokeStyle = '#2b4a6f'; g.lineWidth = r * 2 + 10;
  g.beginPath(); g.moveTo(56, 84); g.lineTo(230, 84); g.stroke();
  g.strokeStyle = P.copper; g.lineWidth = r * 2;
  g.beginPath(); g.moveTo(56, 84); g.lineTo(304, 84); g.stroke();
  g.restore();
  txt(g, '绝缘层', 120, 84 - r - 14, {sz:8.5, c:C.tx3});
  txt(g, '线芯', 268, 84 - r - 10, {sz:8.5, b:1, c:P.copperL});

  /* 两个配比 */
  const yy = 132;
  if(w.base){
    box(g, 34, yy, 140, 44, 5, C.box, C.boxLine, 1.3);
    txt(g, '基本配比', 104, yy + 15, {sz:9, c:C.tx3});
    txt(g, w.base + ' A', 104, yy + 33, {sz:14, b:1, c:C.tx2});
    box(g, 186, yy, 140, 44, 5, C.accbg, C.acc, 1.6);
    txt(g, '高配（书上推荐）', 256, yy + 15, {sz:9, c:C.acc});
    txt(g, w.hi + ' A', 256, yy + 33, {sz:14, b:1, c:C.acc});
  } else {
    box(g, 34, yy, 292, 44, 5, C.box, C.boxLine, 1.3);
    txt(g, '书上的配比表里没有 6 mm² 这一档', 180, yy + 16, {sz:9.5, b:1, c:C.tx3});
    txt(g, '它在表 8-1 里，用作室内支路或楼层干线', 180, yy + 33, {sz:8.5, c:C.tx3});
  }

  /* 载流量 */
  if(w.safe){
    const y2 = 208;
    seg(g, [[40, y2],[330, y2]], C.boxLine, 2);
    const f = function(v){ return 40 + (330-40) * v / 50; };
    /* 允许长期电流那一段 */
    const lo = parseFloat(w.long.split('~')[0]), hi2 = parseFloat(w.long.split('~')[1]);
    g.save(); g.fillStyle = C.ok; g.globalAlpha = .3;
    g.fillRect(f(lo), y2 - 11, f(hi2) - f(lo), 22); g.restore();
    txt(g, '允许长期电流 ' + w.long + ' A', (f(lo)+f(hi2))/2, y2, {sz:8.5, b:1, c:C.ok});
    seg(g, [[f(w.safe), y2 - 14],[f(w.safe), y2 + 14]], C.warn, 2.2);
    EP.chip(g, '安全载流量 ' + w.safe + ' A', f(w.safe) - 4, y2 + 26,
            {sz:8.5, b:1, c:C.warn, al:'right'});
    [10,20,30,40,50].forEach(function(v){
      txt(g, String(v), f(v), y2 - 22, {sz:7.5, c:C.tx3});
    });
  }

  conc(g, 250, w.base ? 'ok' : 'acc',
    w.base ? (w.s + ' mm²：基本配 ' + w.base + ' A，高配 ' + w.hi + ' A')
           : (w.s + ' mm²：室内支路或楼层干线'),
    w.long ? '这根线允许长期通过 ' + w.long + ' A' : '书上：照明支路配 10 A 单进单出');
}
function note3(){
  const w = WIRE[S3.k];
  $('s3a').textContent = w.base ? w.base + ' A' : '—';
  $('s3b').textContent = w.hi ? w.hi + ' A' : '—';
  $('s3c').textContent = w.safe ? w.safe + ' A' : '—';
  let h = '<div class="st">' + w.s + ' mm² 铜芯线</div>';
  if(w.base){
    h += '书上给了两套配比：<b>基本配比 ' + w.base + ' A</b>，' +
      '<b>高配 ' + w.hi + ' A</b>（书上说「一般选择高配方式」）。' +
      '<hr><b>高配的理由是避免误跳，不是能多带电器</b> ——' +
      '书上原话：「为避免因<b>市电电压不稳定、线路过热</b>而导致断路器' +
      '<b>频繁跳闸</b>，可提高断路器与电线的配比。」' +
      '<b>线的载流量一分没变。</b>';
  } else {
    h += '书上的配比表只列到 4 mm²，<b>6 mm² 不在里面</b>。' +
      '它出现在<b>表 8-1 载流量表</b>和「室内支路使用 4 mm² 或 6 mm² 的线缆」那句话里。';
  }
  if(w.safe){
    h += '<hr><b>表 8-1 给这根线两个数，别混：</b>' +
      '<b>安全载流量 ' + w.safe + ' A</b> 是短时能扛的上限；' +
      '<b>允许长期电流 ' + w.long + ' A</b> 才是可以一直这么用的值。' +
      '<b>选线按后面那个</b>，前面那个是留给启动电流、短时冲击的余量。';
  }
  if(S3.k === 0){
    h += '<hr><b>1.5 mm² 是照明支路的常用线径。</b>' +
      '<span class="sub">屏 1 算过：全屋照明才 2 A 左右，' +
      '而 1.5 mm² 配 10 A（基本）或 16 A（高配），绰绰有余。' +
      '<b>但插座绝对不能用 1.5</b> —— 插座是不确定负荷，' +
      '插上一个 2000 W 的电暖器就是 9 A，再加两个就超了。</span>';
  }
  if(S3.k === 2){
    h += '<hr><b>4 mm² 那个直径 2.25 mm，6.1 那节见过。</b>' +
      '<span class="sub">书上讲剥线工具时给的分界就是它：' +
      '<b>4 mm²（线径 2.25 mm）以下用剥线钳，以上用电工刀</b>。' +
      '同一个数，一个用来选工具，一个用来算载流量。</span>';
  }
  $('n2').innerHTML = h;
}

/* ================================================================
   场景 4：断路器型号怎么读
   ================================================================
   把 DZ47-32 3 1 0 / C 25 一段一段排开，点哪段亮哪段。
   **最后那个 25 用 err 色标出来** —— 选型看的就是它，别看 32 */
const SEGS = [
  {t:'D',  k:'产品代号',   v:'断路器',  need:'认得出',
   d:'<b>D 就是「断路器」</b>。低压电器的型号第一个字母表示产品大类：' +
     'D 断路器、C 接触器、J 继电器、H 刀开关、R 熔断器、L 主令电器（按钮那些）。' +
     '<hr>这一套字母跟 4.2 讲的<b>文字符号</b>不是一回事 ——' +
     '型号里的 D 是产品代号，图纸上的 <b>QF</b> 才是断路器的文字符号。' +
     '<b>同一个东西在型号里叫 D、在图上叫 QF</b>，别混。'},
  {t:'Z',  k:'类型',       v:'塑料外壳式', need:'认得出',
   d:'书上列了七种：<b>W 万能式、WX 万能式限流型、Z 塑料外壳式、ZX 塑壳限流型、' +
     'ZL 漏电保护式、SL 快速断路器（开关）、M 灭磁断路器</b>。' +
     '<hr><b>现场最常见的两个：Z（塑壳）和 ZL（漏电保护式）。</b>' +
     '看到 <b>DZL</b> 开头就知道它带漏电保护 —— 8.2 屏 2 讲的' +
     '「要漏电保护的支路选带漏电功能的双进双出」，买的就是这种。'},
  {t:'47', k:'设计序号',   v:'厂家自定', need:'不用记',
   d:'<b>设计序号，厂家自己编的</b>，没有统一含义。' +
     'DZ47 是最常见的一个系列（家用小型断路器），另外还有 DZ15、DZ20、DZ108 等等。' +
     '<hr><b>不同序号之间不能只看数字大小判断好坏</b>，' +
     '它只表示「这是第几次设计的那个系列」。'},
  {t:'32', k:'架构等级额定电流', v:'外壳能承受的最大电流', need:'★ 别和 25 混',
   d:'<b>外壳（架构）能承受的最大电流</b>，32 表示 32 A。' +
     '<hr><b>同一个壳可以装很多种脱扣器</b>：DZ47-32 这个壳，' +
     '里面可以是 6A、10A、16A、20A、25A、32A 各种规格。' +
     '<b>它标的是这个系列的上限，不是这一只的额定电流。</b>' +
     '<hr>选型时看错这个数，是最常见的一种错。'},
  {t:'3',  k:'极数',       v:'可省略',  need:'看几根线',
   d:'<b>几极就是它同时断几根线。</b>' +
     '<hr>1P 只断相线（8.2 讲的<b>单进单出</b>，普通照明支路用）；' +
     '2P 断相线和零线（<b>双进双出</b>，总闸和带漏电的支路用）；' +
     '3P 断三根相线（三相设备）；4P 断三相加零线（三相总闸）。' +
     '<hr>书上写着<b>「可省略」</b> —— 很多型号里不标极数，' +
     '要靠看实物有几个模块宽来数。'},
  {t:'1',  k:'脱扣器类别', v:'热脱扣器', need:'认得出',
   d:'书上给的四档：<b>0 无脱扣器、1 热脱扣器、2 电磁脱扣器、3 复式脱扣器</b>。' +
     '<hr><b>热脱扣器管过载</b>（双金属片受热弯曲，慢慢来）；' +
     '<b>电磁脱扣器管短路</b>（电磁铁瞬间吸合，几毫秒）；' +
     '<b>复式两个都有</b> —— 家用断路器基本都是复式的。' +
     '<hr>这跟 2.3 讲热继电器时那条线索是同一个：' +
     '<b>过载靠热、短路靠磁，两种保护的响应时间差了几千倍。</b>'},
  {t:'0',  k:'辅助触头',   v:'无',      need:'不用记',
   d:'<b>0 无辅助触头、2 有辅助触头。</b>' +
     '<hr>辅助触头是给<b>信号</b>用的：断路器跳了，' +
     '辅助触头跟着动作，把「跳闸了」这个信号送给 PLC 或报警回路。' +
     '<hr>家用的一律是 0（没有）；' +
     '工业配电柜里那些要往上位机报状态的才用带辅助触头的。'},
  {t:'C',  k:'应用场合',   v:'照明保护型', need:'★ 要看',
   d:'书上给的两档：<b>C 照明保护型、D 动力保护型</b>。' +
     '<hr>分别在于<b>能容忍多大的瞬时冲击电流</b>：' +
     '<b>C 型</b>约 5~10 倍额定电流才瞬时脱扣，用于照明、插座这类冲击小的；' +
     '<b>D 型</b>约 10~20 倍，用于电动机这类<b>启动电流很大</b>的负载。' +
     '<hr><b>给电动机用 C 型的后果：一启动就跳闸</b>，' +
     '而线路和电机都没毛病。这是现场很常见的一次误配。'},
  {t:'25', k:'额定电流',   v:'★ 选型看的就是它', need:'★★ 必须记',
   d:'<b>在规定条件下，可长期通过脱扣器的最大工作电流。</b>' +
     '<hr><b>这才是屏 1、屏 2 算出来要对照的那个数。</b>' +
     '算出支路电流 14 A → 往上取一档 → 买一只 <b>C16</b>；' +
     '算出总电流 47.6 A → 买一只 <b>C50 或 C63</b>。' +
     '<hr><b>和前面那个 32 的区别</b>：32 是外壳的上限（这个系列最大能做到 32 A），' +
     '25 是这一只的额定值。<b>买断路器报规格说的是后面这个</b> ——' +
     '「DZ47-60 C25」，说的是 25 A。'}
];
const S4 = { k:0 };
let SEGBOX = [];                             /* 九段在画布上的 [x, w]，点击判定用 */
function draw4(){
  const g = st4.g; st4.clear();
  const seg4 = SEGS[S4.k];
  EP.heading(g, 14, 20, 'DZ47-32 3 1 0 / C 25', '一段一段拆开读');

  /* 型号排成一行 */
  const W = [26, 26, 32, 34, 22, 22, 22, 26, 34];
  const GAP = 4;
  let total = 0; W.forEach(function(w){ total += w + GAP; });
  let x = 180 - (total - GAP)/2;
  SEGBOX = [];
  SEGS.forEach(function(s, i){
    const on = i === S4.k, w = W[i];
    box(g, x, 66, w, 40, 4,
        on ? C.accbg : C.box, on ? C.acc : C.boxLine, on ? 1.8 : 1.2);
    txt(g, s.t, x + w/2, 86, {sz:14, b:1, c: on ? C.acc : C.tx2});
    SEGBOX.push([x, w]);
    x += w + GAP;
  });
  /* 「/」分隔符画在第 7、8 段之间 */
  txt(g, '/', (SEGBOX[6][0] + SEGBOX[6][1] + SEGBOX[7][0])/2, 86, {sz:12, b:1, c:C.tx3});

  /* 指向说明 */
  const b = SEGBOX[S4.k], cx = b[0] + b[1]/2;
  g.save(); g.setLineDash([3,3]); g.strokeStyle = C.acc; g.lineWidth = 1.2;
  g.beginPath(); g.moveTo(cx, 106); g.lineTo(cx, 124); g.lineTo(180, 124); g.lineTo(180, 138);
  g.stroke(); g.restore();
  EP.chip(g, seg4.k, 180, 150, {sz:11, b:1, c:C.acc});
  txt(g, seg4.v, 180, 176, {sz:10.5, b:1, c:C.tx});

  /* 32 和 25 的对照，永远画着 —— 这两个数最容易混 */
  box(g, 24, 196, 148, 40, 5, C.box, C.boxLine, 1.2);
  txt(g, '32　外壳的上限', 98, 210, {sz:9, c:C.tx3});
  txt(g, '这个系列最大能做到', 98, 226, {sz:8, c:C.tx3});
  box(g, 188, 196, 148, 40, 5, C.errbg, C.err, 1.5);
  txt(g, '25　这一只的额定', 262, 210, {sz:9, b:1, c:C.err});
  txt(g, '选型对照的就是它', 262, 226, {sz:8, c:C.tx2});

  conc(g, 248, S4.k === 8 ? 'err' : 'acc', seg4.t + '　' + seg4.k, seg4.v);
}
function note4(){
  const s = SEGS[S4.k];
  $('s4a').textContent = s.t;
  $('s4b').textContent = s.k.length > 6 ? s.k.slice(0, 6) : s.k;
  $('s4c').textContent = s.need;
  $('n3').innerHTML = '<div class="st' + (S4.k === 8 ? ' good' : '') + '">' +
    s.t + '　—　' + s.k + '</div>' + s.d;
}

/* ================================================================
   舞台、事件、收尾
   ================================================================ */
const st1 = new Stage('cv0', 360, 236);
const st2 = new Stage('cv1', 360, 262);
const st3 = new Stage('cv2', 360, 288);
const st4 = new Stage('cv3', 360, 288);

document.getElementById('s1k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S1.k = +b.dataset.k; S1.p = CIR[S1.k].p0;
  document.getElementById('s1p').value = S1.p;
  $('s1pv').textContent = S1.p + ' W';
  document.querySelectorAll('#s1k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S1.k);
  });
  note1(); draw1();
});
document.getElementById('s1p').addEventListener('input', function(e){
  S1.p = +e.target.value; $('s1pv').textContent = S1.p + ' W';
  note1(); draw1();
});
document.getElementById('s2k').addEventListener('input', function(e){
  S2.k = +e.target.value; $('s2kv').textContent = S2.k + ' %';
  note2(); draw2();
});
document.getElementById('s3k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S3.k = +b.dataset.k;
  document.querySelectorAll('#s3k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S3.k);
  });
  note3(); draw3();
});
st4.cv.addEventListener('click', function(ev){
  const p = st4.pick(ev);
  if(p[1] < 50 || p[1] > 122) return;
  /* 取**最近**的一段，不要求落在框里 —— 九段挤在一行，
     手指点画布本来就不精确 */
  let bd = 1e9;
  SEGBOX.forEach(function(b, i){
    const d = Math.abs(p[0] - (b[0] + b[1]/2));
    if(d < bd){ bd = d; S4.k = i; }
  });
  note4(); draw4();
});

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会重设尺寸并清空。**四屏全是静态的，必须在这儿逐个补画** */
  draw1(); draw2(); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:8, sec:'8.3'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('8.3');
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
