/* 9.5 三个真实案例 —— 本节内容的唯一真相。
   对应《零基础学电工》第 9 章 9.3.3 节「常见电动机控制电路故障的检修操作」
   （书内 P176~P180）。

   **这一节是整章的落点，也是整本书里少见的「带实测数据的完整案例」。**
   三个案例各走一条完整的排查路径，**每一步的读数都是书上实测的**。
   四屏：① 案例一（不起动）② 案例二（过热）③ 案例三（起动跳闸）④ 三条路对照

   数字与说法的出处（书上原文，别凭记忆改）：

   ===== 案例一：通电后电动机不起动（P176~178，图 9-20~9-22）=====
   - 电路是**三相交流电动机点动控制电路**（图 9-20）：
     L1 L2 L3 AC380V、**QF 总断路器**、**FU1~FU3 熔断器**、
     **KM-1 交流接触器触头**、**M 3~ 三相交流电动机**、
     **SB 点动按钮开关**、**KM 交流接触器线圈**
   - 「接通交流电动机控制电路的电源开关后，按下点动按钮，发现电动机不起动，
     经检查，**供电电源正常，电路内接线牢固，无松动现象**，
     说明电路内部或电动机损坏」
   - 图 9-21：按下点动按钮，**使用万用表检测电动机接线柱是否有电压，
     任意两接线柱之间的电压应为 380V**。
     「将万用表的红、黑表笔任意搭在电动机的接线柱上」（U1 V1 W1）；
     「观察万用表的显示屏，**读出实测数值为 0V**」
     ⇒ **经检测，发现电动机没有供电电压，说明控制电路中有器件发生断路故障**
   - **图 9-22 的八步（原文照录，每一步的读数都在）**：
     ① 将万用表的红、黑表笔分别搭在**待测断路器的输出接线端子**上
     ② **断路器处于断开状态时，测得断路器输出的电压应为 0**；
        **处于闭合状态时，测得断路器输出的电压为交流 380V**
     ③ 将表笔搭在**熔断器的输入端**接线端子上检测输入电压，
        搭在**输出端**接线端子上检测输出电压
     ④ 经检测，**熔断器的输入端有电压，输出端也有电压，说明熔断器良好**
     ⑤ **断开按钮开关的连接引线**，将万用表的表笔搭在按钮的两个接线柱上，**用手按压开关**
     ⑥ **用手按压按钮开关时，可测得阻值为 0**；**松开按钮开关时，可测得阻值为无穷大**，
        说明点动开关正常
     ⑦ 将表笔分别搭在**交流接触器的线圈两端**，**实测为 380V 交流电压**，
        说明接触器线圈已得电
     ⑧ 将表笔分别搭在**交流接触器常开主触头输入端或输出端**，
        **在正常情况下也可测得 380V 交流电压**
   - **结论（原文）**：「经检测，断路器、熔断器和按钮开关均正常，但实测时，
     **交流接触器线圈得电后，其主触头闭合，但触头无法接通电路供电
     （检测触头出线端无任何电压），说明接触器已损坏，需要更换**。
     使用相同规格的接触器代换后，接通电源，电动机可正常起动运行，排除故障。」

   ===== 案例二：运行一段时间后电动机过热（P178~179，图 9-23~9-25）=====
   - 「交流电动机控制电路运行一段时间后，电动机外壳温度过高，并且经常出现这种现象，
     因此**先检测控制电路中的电流量大小，查找故障原因**」
   - 图 9-23：**将钳形表的档位设置在「200」交流电流档**，按下钳头扳机，
     **将钳头套在所测电路中的其中一根供电线上**（电动机的供电引线）
   - 「经检测，**发现电流量为 3.4A，与电动机铭牌上的额定电流标识值相同**，
     说明控制电路中的电流量正常」
   - 「控制电路中的电流正常，**怀疑交流电动机内部出现部件摩擦、老化情况**，
     致使电动机温度过高。将电动机外壳拆开后，**仔细检查电动机的轴承及轴承的连接等部位**」
   - 图 9-24：① **检查轴承与端盖的连接部位，查看轴承与端盖之间的距离是否过紧**。
     经检查，**轴承与端盖的松紧度适中，无需调整**。
     ② 经检查，**轴承与转轴的连接部位没有明显的磨损痕迹**，说明松紧度适合
   - 图 9-25：「将轴承从电动机上拆下，**检测轴承内的钢珠是否磨损**。
     经检查，**轴承内的钢珠有明显的磨损痕迹，说明润滑脂已经干涸**。
     使用新的钢珠代换后，在轴承内涂抹润滑脂，
     **润滑脂涂抹应适量，最好不超过轴承内容积的 70%**」
   - **提示说明（原文照录）**：「**皮带过紧或联轴器安装不当，会引起轴承发热**，
     需要调整皮带的松紧度，校正联轴器等传动装置。
     若是因为**电动机转轴的弯曲**而引起轴承过热，则可校正转轴或更换转子。
     **轴承内有杂物时，轴承转动不灵活，可造成发热**，应清洗并更换润滑油。
     **轴承间隙不均匀，过大或过小都会造成轴承不正常转动**，可更换新轴承，排除故障。」

   ===== 案例三：起动后跳闸（P179~180，图 9-26~9-27）=====
   - 「交流电动机控制电路通电后，起动电动机时，电源供电箱出现跳闸现象，
     经过检查，控制电路内的接线正常，**此时应重点检测热继电器和电动机**」
   - 图 9-26 热继电器的检测：① **将万用表的表笔分别搭在热继电器三组触点的接线柱上
     （L1和T1、L2和T2、L3和T3）**。② 观察万用表表盘，结合档位设置
     **读出实测阻值极小，说明热继电器正常**
   - 图 9-27 检测绕组间绝缘阻值（四步，原文照录）：
     ① 检测前，**先将接线盒中绕组接线端的金属片取下**，使电动机绕组无连接关系，
        为独立的三个绕组
     ② 电动机绕组间的**绝缘性能不好，会使电动机内部出现短路现象**，严重时可能将电动机烧坏，
        将表笔分别搭在绕组的接线端上，**测量结果均为无穷大，说明绕组间绝缘性能良好**
     ③ 将万用表表笔搭在**同一组绕组的两个接线柱上（U1和U2、V1和V2、W1和W2）**
     ④ 经检测，**发现电动机 U 相和 V 相绕组有一个固定值，说明这两相绕组正常，
        而 W 相绕组阻值为无穷大，说明有断路故障**，重新绕制绕组或更换电动机后，故障被排除

   **三个案例的共同结构（屏 4 讲的）**：
   现象 → 先排除掉整片的（供电、接线）→ 沿着一条路一步步量 → 最后落到一个部件。
   **三次的落点分别是：接触器主触头、轴承钢珠、W 相绕组** ——
   都不是最先怀疑的那个。*/
(function(){
'use strict';
ELEC.reg({
  id: '9.5',
  file: 'c9-5.html',
  title: '9.5 三个真实案例',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>不起动</button>
    <button class="tab" data-i="1"><span class="n">2</span>过热</button>
    <button class="tab" data-i="2"><span class="n">3</span>起动跳闸</button>
    <button class="tab" data-i="3"><span class="n">4</span>三条路对照</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">案例一：按了点动按钮，电动机不转</div>
    书上这个案例走了完整的八步，<b>每一步的读数都实测记着</b>。
    最后落在一个你不太会先怀疑的地方。<b>点「下一步」走一遍。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns">
        <button class="btn" id="s1p">‹ 上一步</button>
        <button class="btn go" id="s1n">下一步 ›</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">第几步</div><div class="v" id="s1a">1 / 6</div></div>
        <div class="num"><div class="k">量哪儿</div><div class="v" id="s1b">电动机接线柱</div></div>
        <div class="num hi"><div class="k">读数</div><div class="v" id="s1c">0 V</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">这个案例的电路：三相点动控制（图 9-20）</div>
    <b>QF 总断路器 → FU1~FU3 熔断器 → KM-1 接触器主触头 → M 电动机</b>；
    控制回路只有<b>一个点动按钮 SB 串着 KM 线圈</b> —— 没有自锁、没有停止按钮。
    <div class="tip info">
      <b>为什么书上挑一个点动电路来举例：它是最简的那种。</b>
      <span class="sub">9.1 屏 2 讲过，现场那张图比点动图多了自锁、停止按钮、
      控制熔断器、指示灯四样。<b>拿最简的电路讲排查，路径最清楚</b>；
      多出来的那几样只是让链条更长，方法完全一样。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">最后的结论：线圈得电、主触头也吸合了，可就是不通电</div>
    书上原话：「经检测，断路器、熔断器和按钮开关均正常，但实测时，
    <b>交流接触器线圈得电后，其主触头闭合，但触头无法接通电路供电
    （检测触头出线端无任何电压），说明接触器已损坏，需要更换。</b>」
    <div class="tip">
      <b>这是接触器最容易被漏掉的一种坏法。</b>
      <span class="sub">你按下按钮，<b>听到"啪"的一声吸合</b>，
      从声音判断接触器是好的 —— 于是转头去怀疑电动机。
      <hr>可吸合只说明<b>线圈和衔铁</b>没问题；
      <b>主触头能不能通电是另一回事</b>：触点烧蚀、氧化、
      或者动触点桥断裂，都会让它「吸合了但不通」。
      <hr><b>判据只有一个：量触头出线端有没有 380V。</b>
      书上第 ⑧ 步写的就是这件事 ——
      「将表笔分别搭在交流接触器常开主触头输入端或输出端，
      <b>在正常情况下也可测得 380V 交流电压</b>」。</span>
    </div>
  </div>
</section>

<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">案例二：电流正常，可电动机就是烫</div>
    这个案例的转折点在<b>第一步</b>：钳形表量出来的电流<b>和铭牌一模一样</b>。
    电流正常 ⇒ 问题不在电路上。<b>点「下一步」看它往哪儿走。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns">
        <button class="btn" id="s2p">‹ 上一步</button>
        <button class="btn go" id="s2n">下一步 ›</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">第几步</div><div class="v" id="s2a">1 / 4</div></div>
        <div class="num"><div class="k">查什么</div><div class="v" id="s2b">工作电流</div></div>
        <div class="num hi"><div class="k">结果</div><div class="v" id="s2c">3.4 A 正常</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">钳形表怎么用（图 9-23 原文）</div>
    <b>将钳形表的档位设置在「200」交流电流档</b>，按下钳头扳机，
    <b>将钳头套在所测电路中的其中一根供电线上</b>。
    经检测，<b>发现电流量为 3.4A，与电动机铭牌上的额定电流标识值相同</b>。
    <div class="tip info">
      <b>「其中一根」——一次只能钳一根</b>（3.7 那节整节在讲这件事）。
      <span class="sub">把三根一起钳进去，三相平衡时读数是 0.00 A。
      <hr>还有一条：<b>量出来要跟铭牌比，不是跟一个「正常值」比</b>。
      每台电动机的额定电流都不一样，<b>铭牌就是标准</b>
      （2.7 那节讲过怎么读铭牌）。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">书上那条提示说明：轴承发热还有四个原因</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>原因</th><th>怎么处理</th></tr></thead>
      <tbody>
        <tr><td class="eu-s"><b>皮带过紧</b>或<br>联轴器安装不当</td>
          <td>调整皮带的松紧度，校正联轴器等传动装置</td></tr>
        <tr><td class="eu-s">电动机<b>转轴弯曲</b></td>
          <td>校正转轴或更换转子</td></tr>
        <tr><td class="eu-s">轴承内<b>有杂物</b></td>
          <td>轴承转动不灵活造成发热 —— <b>清洗并更换润滑油</b></td></tr>
        <tr><td class="eu-s">轴承<b>间隙不均匀</b></td>
          <td>过大或过小都会造成不正常转动 —— 更换新轴承</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>第一条「皮带过紧或联轴器安装不当」，根子在装的时候。</b>
      <span class="sub">9.2 那两节（电动机与被拖动设备的安装连接、固定）讲的正是这个：
      <b>联轴器要对中、转轴中心线要在一条水平线上</b>。
      装的时候差一点，运行几个月就表现成轴承发热。
      <hr>这也是 9.4 屏 4 那条「异常振动 ⇒ 先查安装」的另一面 ——
      <b>同一个安装问题，可以表现成振动，也可以表现成发热。</b></span>
    </div>
  </div>
</section>

<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">案例三：一起动就跳闸</div>
    跳闸说明有短路性故障。书上说<b>此时应重点检测热继电器和电动机</b> ——
    <b>先量热继电器（正常），再量电动机绕组</b>。
    <b>点「下一步」走一遍。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns">
        <button class="btn" id="s3p">‹ 上一步</button>
        <button class="btn go" id="s3n">下一步 ›</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">第几步</div><div class="v" id="s3a">1 / 4</div></div>
        <div class="num"><div class="k">量什么</div><div class="v" id="s3b">热继电器</div></div>
        <div class="num hi"><div class="k">读数</div><div class="v" id="s3c">阻值极小</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">量绕组之前那一步：取下连接片（图 9-27 ①）</div>
    书上原话：<b>检测前，先将接线盒中绕组接线端的金属片取下，
    使电动机绕组无连接关系，为独立的三个绕组</b>，
    为检测绕组间绝缘阻值和绕组本身阻值做好准备。
    <div class="tip">
      <b>不取连接片，量到的不是绕组，是几个绕组连在一起的结果。</b>
      <span class="sub">2.7 那节讲过接线盒：<b>横着两块连接片＝星形，
      竖着三块＝三角形</b>。连接片在的时候，三个绕组是连通的 ——
      量任意两个接线柱，量到的都是「两相串联」或者「一相并联另两相串联」。
      <hr>5.6 那节也有同一条：<b>量绕组间绝缘必须先取下连接片</b>，
      否则量的是一根导线。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">两次测量，问的是两件事</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>量哪儿</th><th>问什么</th><th>正常应该是</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">绕组<b>之间</b><br>
          <span class="sub">U1和V1、V1和W1…</span></td>
          <td>三个绕组<b>互相绝缘</b>吗</td>
          <td><b>无穷大</b><br><span class="sub">书上实测：均为无穷大</span></td></tr>
        <tr><td class="eu-s">同一组绕组的<br><b>两端</b><br>
          <span class="sub">U1和U2、V1和V2、W1和W2</span></td>
          <td>这一相<b>通不通</b></td>
          <td><b>一个固定值</b><br><span class="sub">书上：U、V 相正常，W 相 ∞</span></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>两次测量的期望值正好相反，别搞混。</b>
      <span class="sub">绕组<b>之间</b>要<b>不通</b>（无穷大＝绝缘好）；
      同一相的<b>两端</b>要<b>通</b>（有固定阻值＝绕组完整）。
      <hr>2.7 那节给过这个固定值的量级：<b>三相绕组电阻要平衡</b>，
      书上实测三相都是 <b>4.33 Ω</b>。
      <b>哪一相偏大或无穷大，问题就在那一相</b> —— 这个案例里是 W 相。</span>
    </div>
  </div>
</section>

<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">三条路，同一个结构</div>
    三个案例的现象完全不同，走的路也不同，
    但<b>结构是同一个</b>：先排除掉整片的 → 沿一条路一步步量 → 落到一个部件。
    <b>而三次的落点，都不是最先会怀疑的那个。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">三条路</button>
        <button class="btn sm" data-k="1">共同结构</button>
        <button class="btn sm" data-k="2">落点</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">案例一</div><div class="v" id="s4a">接触器</div></div>
        <div class="num"><div class="k">案例二</div><div class="v" id="s4b">轴承</div></div>
        <div class="num hi"><div class="k">案例三</div><div class="v" id="s4c">W 相绕组</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">三个案例对照</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>现象</th><th>关键一步</th><th>落点</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">一</td><td>按了不转</td>
          <td>量电动机接线柱 <b>0 V</b><br><span class="sub">⇒ 电根本没送到</span></td>
          <td><b>接触器主触头</b><br><span class="sub">吸合了但不通</span></td></tr>
        <tr><td class="eu-s">二</td><td>运行发烫</td>
          <td>钳形表量到 <b>3.4 A</b><br><span class="sub">和铭牌一致 ⇒ 电路正常</span></td>
          <td><b>轴承钢珠磨损</b><br><span class="sub">润滑脂干涸</span></td></tr>
        <tr><td class="eu-s">三</td><td>一起动就跳</td>
          <td>热继电器<b>阻值极小</b><br><span class="sub">⇒ 它是好的</span></td>
          <td><b>W 相绕组断路</b><br><span class="sub">阻值无穷大</span></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>注意「关键一步」那一列：三次都是靠一个读数把方向定下来的。</b>
      <span class="sub">案例一量到 0 V ⇒ <b>往电源侧一路查回去</b>；
      案例二量到 3.4 A 正常 ⇒ <b>掉头去查机械部分</b>；
      案例三热继电器正常 ⇒ <b>越过它去查电动机</b>。
      <hr><b>没有这三个读数，后面每一步都是在猜。</b></span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st good">第 9 章走完了</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>节</th><th>回答的问题</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">9.1</td><td>现场那张控制图上都有什么、比课本多了什么</td></tr>
        <tr><td class="eu-s">9.2</td><td>设计时的<b>六条原则</b>——为什么这么接而不那么接</td></tr>
        <tr><td class="eu-s">9.3</td><td>控制箱怎么装、<b>布线工艺五条</b></td></tr>
        <tr><td class="eu-s">9.4</td><td>坏了怎么<b>缩小范围</b>（五步 ＋ 四种现象）</td></tr>
        <tr><td class="eu-s">9.5</td><td>三个真实案例，每一步的读数都在</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>下一章是第 10 章「电动机的拆装与维护」。</b>
      <span class="sub">按 2026-08-30 定的调子，<b>那一章大半不做</b>——
      拆端盖、抽转子、绕线圈、浸漆全是手上的活，
      <b>只留日常检查和判据</b>那一部分。
      <hr>真正接着这一章往下走的是<b>第 11 章「电动机常用控制电路」</b>：
      正反转、星三角、串电阻减压启动、反接制动 ——
      9.1 屏 4 那个「按时间分级」和 9.2 屏 4 那个「联锁」，
      到那一章才展开。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="9.5">
    <div class="qz" data-q="案例一里，按下点动按钮后量电动机接线柱，读数 0 V。这说明什么？"
      data-opts="电动机烧了|电根本没送到电动机——控制电路中有器件发生断路故障，要往电源侧一路查回去|按钮坏了"
      data-right="1"
      data-why="书上原话：经检测，发现电动机没有供电电压，说明控制电路中有器件发生断路故障。这一步的价值是定方向——量到 0 V 就说明问题在电动机之前的某个环节，接下来才是从断路器、熔断器、按钮、接触器一路查回去。要是量到 380V，方向就完全反过来了（电送到了，该怀疑电动机本身）。"></div>
    <div class="qz" data-q="案例一最后查到的故障是什么？"
      data-opts="熔断器熔断|接触器线圈烧了|接触器线圈得电、主触头也吸合了，但触头无法接通电路供电"
      data-right="2"
      data-why="书上原话：交流接触器线圈得电后，其主触头闭合，但触头无法接通电路供电（检测触头出线端无任何电压），说明接触器已损坏。这是接触器最容易被漏掉的一种坏法——你听到「啪」的吸合声，就以为它是好的。可吸合只说明线圈和衔铁没问题，主触头能不能通电是另一回事（触点烧蚀、氧化、动触点桥断裂）。判据只有一个：量触头出线端有没有 380V。"></div>
    <div class="qz" data-q="案例二里，钳形表量到电流 3.4 A，和铭牌上的额定电流一致。下一步该往哪个方向查？"
      data-opts="继续查电路，可能是电压不对|电流正常说明电路没问题，掉头去查机械部分——轴承、传动装置|换一只热继电器"
      data-right="1"
      data-why="掉头查机械。书上原话：控制电路中的电流正常，怀疑交流电动机内部出现部件摩擦、老化情况，致使电动机温度过高。这一步是整个案例的转折点——电流正常这个读数把「电路」整片排除掉了，剩下的只能是机械原因。最后查到的是轴承内钢珠磨损、润滑脂干涸。"></div>
    <div class="qz" data-q="量电动机绕组之前，为什么必须先把接线盒里的连接片取下来？"
      data-opts="怕触电|不取的话三个绕组是连通的，量到的是几个绕组串并联的结果，不是单个绕组|方便表笔搭上去"
      data-right="1"
      data-why="书上原话：检测前，先将接线盒中绕组接线端的金属片取下，使电动机绕组无连接关系，为独立的三个绕组。2.7 讲过接线盒：横着两块连接片＝星形，竖着三块＝三角形，连接片在的时候三个绕组是连通的。5.6 那节也有同一条：量绕组间绝缘必须先取下连接片，否则量的是一根导线。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 9 章 9.3.3 节（书内 P176~P180）</div>
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
/* 一块万用表读数牌 —— 三个案例都要显示实测值，统一画法 */
function meter(g, x, y, w, h, val, unit, good){
  box(g, x, y, w, h, 5, P.bodyD, P.steelDD, 1.4);
  box(g, x + 6, y + 6, w - 12, h - 24, 3, '#0f2318', '#2f6b45', 1.2);
  txt(g, val, x + w/2, y + 6 + (h - 24)/2,
      {sz: val.length > 5 ? 12 : 15, b:1, c: good === false ? '#ff8f6b' : '#4fe08a'});
  txt(g, unit, x + w/2, y + h - 9, {sz:8, b:1, c:C.tx3});
}
/* 排查链的一格 */
function node(g, x, y, w, h, name, state){
  /* state: 0 未走到 / 1 当前 / 2 走过且正常 / 3 走过且是故障点 */
  const col = state === 3 ? C.err : (state === 1 ? C.acc : (state === 2 ? C.ok : C.boxLine));
  const bg  = state === 3 ? C.errbg : (state === 1 ? C.accbg : (state === 2 ? C.okbg : C.box));
  box(g, x, y, w, h, 5, bg, col, state ? 1.7 : 1.1);
  txt(g, name, x + w/2, y + h/2, {sz:8.5, b:1, c: state ? col : C.tx3});
}

/* ================================================================
   场景 1：案例一（不起动）
   ================================================================
   六步：量电动机接线柱 → 断路器 → 熔断器 → 按钮 → 线圈 → 主触头。
   **每一步都带书上的实测读数** */
const CASE1 = [
  {n:'电动机接线柱', val:'0', unit:'V ~', good:false, res:'电根本没送到',
   d:'按下点动按钮，<b>使用万用表检测电动机接线柱是否有电压，' +
     '任意两接线柱之间的电压应为 380V</b>（图 9-21）。' +
     '<hr><b>实测读数：0 V。</b>' +
     '书上的结论：<b>经检测，发现电动机没有供电电压，' +
     '说明控制电路中有器件发生断路故障。</b>' +
     '<hr><b>这一步定的是方向</b>：量到 0 V ⇒ 问题在电动机<b>之前</b>，' +
     '接下来从电源侧一路查回去；要是量到 380V，方向就完全反过来了' +
     '（电送到了，该怀疑电动机本身）。'},
  {n:'断路器输出端', val:'380', unit:'V ~', good:true, res:'正常',
   d:'书上第 ①② 步：将万用表的红、黑表笔分别搭在<b>待测断路器的输出接线端子</b>上。' +
     '<hr><b>断路器处于断开状态时，测得输出的电压应为 0；' +
     '处于闭合状态时，测得输出的电压为交流 380V。</b>' +
     '<hr><b>注意这是两个状态都要试</b> —— 9.4 屏 1 第二步讲过：' +
     '开关有两种坏法，「合上去不通」和「断开了还通」，' +
     '<b>只试一个状态查不全</b>。' +
     '<hr>实测：闭合时 380V ⇒ 断路器正常。'},
  {n:'熔断器进出端', val:'380', unit:'V ~', good:true, res:'正常',
   d:'书上第 ③④ 步：将表笔搭在<b>熔断器的输入端</b>接线端子上检测输入电压，' +
     '搭在<b>输出端</b>接线端子上检测输出电压。' +
     '<hr><b>经检测，熔断器的输入端有电压，输出端也有电压，说明熔断器良好。</b>' +
     '<hr><b>进出都要量，是这一步的关键。</b>' +
     '只量输入端，量到 380V 什么也说明不了 —— 熔体断了输入端照样有电压。' +
     '<b>「进有出也有」才说明它是通的。</b>' +
     '<hr>这跟 8.4 讲低压检修时那条「量电能表输出、再量配电箱输出」' +
     '是同一个道理：<b>每一级都要量出口。</b>'},
  {n:'点动按钮', val:'0 / ∞', unit:'Ω', good:true, res:'正常',
   d:'书上第 ⑤⑥ 步：<b>断开按钮开关的连接引线</b>，' +
     '将万用表的表笔搭在按钮的两个接线柱上，<b>用手按压开关</b>。' +
     '<hr><b>用手按压按钮开关时，可测得阻值为 0；' +
     '松开按钮开关时，可测得阻值为无穷大</b>，说明点动开关正常。' +
     '<hr><b>「断开连接引线」这一步不能省</b>：不拆的话量到的是' +
     '整个回路的通断，而不是这个按钮自己。' +
     '（7.3 屏 3 量单控开关时也是同一条规矩。）' +
     '<hr>另外这里换成了<b>电阻档</b> —— 前面几步量电压，' +
     '到了按钮这儿量通断，<b>而量电阻必须断电</b>（3.6b 讲过）。'},
  {n:'接触器线圈', val:'380', unit:'V ~', good:true, res:'已得电',
   d:'书上第 ⑦ 步：将表笔分别搭在<b>交流接触器的线圈两端</b>，' +
     '<b>实测为 380V 交流电压，说明接触器线圈已得电。</b>' +
     '<hr><b>到这一步为止，控制回路全是通的</b>：' +
     '电从断路器、熔断器、按钮一路送到了线圈上。' +
     '<hr>按常理，线圈得电 ⇒ 衔铁吸合 ⇒ 主触头闭合 ⇒ 电动机转。' +
     '<b>可它没转。</b>所以还剩最后一处没量 —— 主触头本身。'},
  {n:'主触头出线端', val:'0', unit:'V ~', good:false, res:'★ 故障点',
   d:'书上第 ⑧ 步：将表笔分别搭在<b>交流接触器常开主触头输入端或输出端</b>，' +
     '<b>在正常情况下也可测得 380V 交流电压。</b>' +
     '<hr><b>实测：出线端无任何电压。</b>' +
     '书上的结论：<b>交流接触器线圈得电后，其主触头闭合，' +
     '但触头无法接通电路供电，说明接触器已损坏，需要更换。</b>' +
     '<hr><b>这是接触器最容易被漏掉的一种坏法。</b>' +
     '你按下按钮听到「啪」的吸合声，就以为它是好的 ——' +
     '可<b>吸合只说明线圈和衔铁没问题</b>，' +
     '主触头能不能通电是另一回事（触点烧蚀、氧化、动触点桥断裂）。' +
     '<hr>换一只<b>相同规格</b>的接触器，接通电源，电动机正常起动，故障排除。'}
];
const S1 = { i:0 };
function drawChain(g, list, i, yTop){
  /* 竖排链，返回每一格的 y */
  const H = 30, GAP = 8;
  list.forEach(function(a, k){
    const y = yTop + k * (H + GAP);
    const st = k < i ? (a.good === false && k > 0 ? 3 : 2) : (k === i ? 1 : 0);
    /* 当前这一步如果读数就是异常的（故障点），要画成红的而不是蓝的 */
    node(g, 26, y, 150, H,
         a.n, k === i ? (a.good === false ? 3 : 1) : (k < i ? (a.good ? 2 : 3) : 0));
    if(k < list.length - 1){
      seg(g, [[101, y + H],[101, y + H + GAP]], k < i ? C.ok : C.boxLine, 1.6);
    }
    /* 读数：走过的和当前的才显示 */
    if(k <= i){
      const gd = a.good !== false;
      txt(g, a.val + ' ' + a.unit, 196, y + H/2,
          {sz:9, b:1, c: gd ? C.ok : C.err, al:'left'});
      /* res 只画走过的那几行：当前这一行右边被读数牌占着（截图抓到的）*/
      if(k < i) txt(g, a.res, 268, y + H/2, {sz:8, c: gd ? C.tx3 : C.err, al:'left'});
    }
  });
}
function draw1(){
  const g = st1.g; st1.clear();
  const c = CASE1[S1.i];
  EP.heading(g, 14, 20, '案例一　按了不转', '第 ' + (S1.i+1) + ' 步 · ' + c.n);
  drawChain(g, CASE1, S1.i, 44);
  /* 当前这一步的读数牌 */
  meter(g, 246, 44 + S1.i * 38 - 4, 76, 46, c.val, c.unit, c.good);
  conc(g, 288, S1.i === 5 ? 'err' : (c.good === false ? 'warn' : 'acc'),
    c.n + '　实测 ' + c.val + ' ' + c.unit,
    S1.i === 5 ? '接触器已损坏，需要更换' : c.res);
}
function note1(){
  const c = CASE1[S1.i];
  $('s1a').textContent = (S1.i+1) + ' / 6';
  $('s1b').textContent = c.n.length > 5 ? c.n.slice(0, 5) : c.n;
  $('s1c').textContent = c.val + ' ' + c.unit;
  $('n0').innerHTML = '<div class="st' + (S1.i === 5 ? ' bad' : '') + '">第 ' +
    (S1.i+1) + ' 步：' + c.n + '</div>' + c.d;
  $('s1p').disabled = S1.i === 0;
  $('s1n').disabled = S1.i === 5;
}

/* ================================================================
   场景 2：案例二（过热）
   ================================================================ */
const CASE2 = [
  {n:'钳形表量工作电流', val:'3.4', unit:'A ~', good:true, res:'和铭牌一致',
   d:'书上第一步就是它：<b>将钳形表的档位设置在「200」交流电流档</b>，' +
     '按下钳头扳机，<b>将钳头套在所测电路中的其中一根供电线上</b>。' +
     '<hr><b>实测：3.4 A，与电动机铭牌上的额定电流标识值相同</b>，' +
     '说明控制电路中的电流量正常。' +
     '<hr><b>这一个读数就把「电路」整片排除掉了。</b>' +
     '9.4 屏 2 讲过，书上给「电动机过热」的原因只有两个：' +
     '<b>电流异常、负载过大</b>。电流正常 ⇒ 剩下的只能往机械上找。' +
     '<hr>用法上两条要记住：<b>一次只钳一根</b>（3.7 那节）；' +
     '<b>量出来要跟铭牌比，不是跟一个「正常值」比</b>（2.7 讲怎么读铭牌）。'},
  {n:'轴承与端盖', val:'适中', unit:'松紧度', good:true, res:'无需调整',
   d:'电流正常，<b>怀疑交流电动机内部出现部件摩擦、老化情况</b>，' +
     '致使电动机温度过高。拆开外壳后，先查轴承和端盖。' +
     '<hr>书上第 ① 项：<b>检查轴承与端盖的连接部位，' +
     '查看轴承与端盖之间的距离是否过紧。</b>' +
     '<b>经检查，轴承与端盖的松紧度适中，无需调整。</b>' +
     '<hr><b>为什么先查这儿</b>：端盖压得过紧会让轴承转动受阻，' +
     '直接表现成发热 —— 而且这是<b>不用拆轴承就能看的</b>。'},
  {n:'轴承与转轴', val:'无痕', unit:'磨损', good:true, res:'松紧合适',
   d:'书上第 ② 项：<b>经检查，轴承与转轴的连接部位没有明显的磨损痕迹</b>，' +
     '说明轴承与转轴的连接部位松紧度适合。' +
     '<hr>这一步和上一步是一对：<b>轴承的外圈跟端盖配合，内圈跟转轴配合</b>，' +
     '哪一头过紧或过松都会发热。' +
     '<hr>两头都正常 ⇒ 问题在轴承<b>内部</b>。下一步要把它拆下来。'},
  {n:'轴承内钢珠', val:'磨损', unit:'★ 故障点', good:false, res:'润滑脂干涸',
   d:'书上：<b>将轴承从电动机上拆下，检测轴承内的钢珠是否磨损。</b>' +
     '<hr><b>经检查，轴承内的钢珠有明显的磨损痕迹，说明润滑脂已经干涸。</b>' +
     '<hr>处理：<b>使用新的钢珠代换后，在轴承内涂抹润滑脂</b>，' +
     '而且书上给了一个具体的量：' +
     '<b>润滑脂涂抹应适量，最好不超过轴承内容积的 70%</b>。' +
     '<hr><b>为什么不能涂满</b>：润滑脂本身在转动时会被搅动生热，' +
     '塞满了反而散不出去 —— <b>涂太多和涂太少都会让轴承发热</b>。' +
     '<b>70% 这个数是可以直接记住拿去用的。</b>'}
];
const S2 = { i:0 };
function draw2(){
  const g = st2.g; st2.clear();
  const c = CASE2[S2.i];
  EP.heading(g, 14, 20, '案例二　运行发烫', '第 ' + (S2.i+1) + ' 步 · ' + c.n);
  drawChain(g, CASE2, S2.i, 48);
  meter(g, 246, 48 + S2.i * 38 - 4, 76, 46, c.val, c.unit, c.good);
  /* 第一步那个分岔画出来 */
  if(S2.i === 0){
    EP.chip(g, '电流正常 ⇒ 掉头查机械', 180, 208, {sz:9, b:1, c:C.acc});
  }
  conc(g, 232, S2.i === 3 ? 'err' : 'acc',
    c.n + '　' + c.val + (c.unit === '松紧度' || c.unit === '磨损' ? '' : ' ' + c.unit),
    S2.i === 3 ? '换新钢珠 ＋ 涂润滑脂，不超过轴承内容积的 70%' : c.res);
}
function note2(){
  const c = CASE2[S2.i];
  $('s2a').textContent = (S2.i+1) + ' / 4';
  $('s2b').textContent = ['工作电流','轴承端盖','轴承转轴','钢珠'][S2.i];
  $('s2c').textContent = ['3.4 A 正常','松紧适中','无磨损','磨损了'][S2.i];
  $('n1').innerHTML = '<div class="st' + (S2.i === 3 ? ' bad' : '') + '">第 ' +
    (S2.i+1) + ' 步：' + c.n + '</div>' + c.d;
  $('s2p').disabled = S2.i === 0;
  $('s2n').disabled = S2.i === 3;
}

/* ================================================================
   场景 3：案例三（起动跳闸）
   ================================================================ */
const CASE3 = [
  {n:'热继电器三组触点', val:'极小', unit:'Ω', good:true, res:'正常',
   d:'跳闸说明有短路性故障（9.4 屏 2）。书上说' +
     '<b>此时应重点检测热继电器和电动机</b> —— 先从热继电器查起。' +
     '<hr>怎么量（图 9-26）：<b>将万用表的表笔分别搭在热继电器' +
     '三组触点的接线柱上（L1和T1、L2和T2、L3和T3）</b>。' +
     '<hr><b>观察万用表表盘，结合档位设置读出实测阻值极小，说明热继电器正常。</b>' +
     '<hr>注意量的是<b>主电路那三组热元件</b>（进出各一个端子），' +
     '不是控制回路里那对 FR-1 触点。' +
     '<b>热元件本来就是一小段电阻丝，阻值极小才是正常的。</b>'},
  {n:'取下连接片', val:'—', unit:'准备', good:true, res:'三个独立绕组',
   d:'书上图 9-27 第 ① 步：<b>检测前，先将接线盒中绕组接线端的金属片取下，' +
     '使电动机绕组无连接关系，为独立的三个绕组</b>，' +
     '为检测绕组间绝缘阻值和绕组本身阻值做好准备。' +
     '<hr><b>不取连接片，量到的就不是单个绕组。</b>' +
     '2.7 那节讲过接线盒：<b>横着两块连接片＝星形，竖着三块＝三角形</b> ——' +
     '连接片在的时候三个绕组是连通的，' +
     '量任意两个接线柱得到的都是「两相串联」或者「一相并联另两相串联」。' +
     '<hr>5.6 那节也有同一条：<b>量绕组间绝缘必须先取下连接片</b>，' +
     '否则量的是一根导线。'},
  {n:'绕组之间的绝缘', val:'∞', unit:'Ω', good:true, res:'绝缘良好',
   d:'书上第 ② 步：电动机绕组间的<b>绝缘性能不好，会使电动机内部出现短路现象</b>，' +
     '严重时可能将电动机烧坏。' +
     '将表笔分别搭在绕组的接线端上，<b>测量结果均为无穷大，' +
     '说明电动机绕组间绝缘性能良好</b>。' +
     '<hr><b>这一步量的是「三个绕组互相之间通不通」，期望是「不通」。</b>' +
     '要是量到有阻值，那就是<b>绕组间短路</b> ——' +
     '正好对上 9.4 屏 2 那张表里「通电跳闸」的原因栏：' +
     '<b>热保护继电器或电动机短路、绕组间短路</b>。' +
     '<hr>结果是好的，所以还得往下查。'},
  {n:'每一相绕组本身', val:'W 相 ∞', unit:'★ 故障点', good:false, res:'W 相断路',
   d:'书上第 ③④ 步：<b>将万用表表笔搭在同一组绕组的两个接线柱上' +
     '（U1和U2、V1和V2、W1和W2）</b>。' +
     '<hr><b>经检测，发现电动机 U 相和 V 相绕组有一个固定值，' +
     '说明这两相绕组正常，而 W 相绕组阻值为无穷大，说明有断路故障</b>，' +
     '重新绕制绕组或更换电动机后，故障被排除。' +
     '<hr><b>注意这两次测量的期望值正好相反</b>：' +
     '绕组<b>之间</b>要<b>不通</b>（∞ ＝ 绝缘好）；' +
     '同一相的<b>两端</b>要<b>通</b>（有固定阻值 ＝ 绕组完整）。' +
     '<hr>2.7 那节给过这个固定值的量级：<b>三相绕组电阻要平衡</b>，' +
     '书上实测三相都是 <b>4.33 Ω</b>。' +
     '<b>哪一相偏大或无穷大，问题就在那一相。</b>'}
];
const S3 = { i:0 };
function draw3(){
  const g = st3.g; st3.clear();
  const c = CASE3[S3.i];
  EP.heading(g, 14, 20, '案例三　一起动就跳', '第 ' + (S3.i+1) + ' 步 · ' + c.n);
  drawChain(g, CASE3, S3.i, 48);
  meter(g, 246, 48 + S3.i * 38 - 4, 76, 46, c.val, c.unit, c.good);
  /* 最后一步把三相绕组画出来 */
  if(S3.i === 3){
    ['U','V','W'].forEach(function(n, i){
      const x = 62 + i*84, on = i < 2;
      box(g, x, 214, 66, 30, 5, on ? C.okbg : C.errbg, on ? C.ok : C.err, 1.6);
      txt(g, n + ' 相', x + 33, 224, {sz:8.5, b:1, c: on ? C.ok : C.err});
      txt(g, on ? '有固定值' : '∞ 断路', x + 33, 237, {sz:8.5, b:1, c: on ? C.ok : C.err});
    });
  }
  conc(g, S3.i === 3 ? 254 : 232, S3.i === 3 ? 'err' : 'acc',
    c.n + '　' + c.val + (c.unit === 'Ω' ? ' Ω' : ''),
    S3.i === 3 ? 'W 相绕组断路 —— 重新绕制或更换电动机' : c.res);
}
function note3(){
  const c = CASE3[S3.i];
  $('s3a').textContent = (S3.i+1) + ' / 4';
  $('s3b').textContent = ['热继电器','取连接片','绕组之间','每一相'][S3.i];
  $('s3c').textContent = ['阻值极小','准备好了','无穷大','W 相 ∞'][S3.i];
  $('n2').innerHTML = '<div class="st' + (S3.i === 3 ? ' bad' : '') + '">第 ' +
    (S3.i+1) + ' 步：' + c.n + '</div>' + c.d;
  $('s3p').disabled = S3.i === 0;
  $('s3n').disabled = S3.i === 3;
}

/* ================================================================
   场景 4：三条路对照
   ================================================================ */
const S4 = { k:0 };
function draw4(){
  const g = st4.g; st4.clear();
  const k = S4.k;
  EP.heading(g, 14, 20, ['三条路','共同结构','三个落点'][k],
             ['现象不同，走法不同','先排除整片，再一步步走','都不是最先怀疑的那个'][k]);

  if(k === 0){
    /* 三条路并排 */
    const P3 = [
      ['按了不转', ['接线柱 0V','断路器','熔断器','按钮','线圈','主触头 ✕']],
      ['运行发烫', ['电流 3.4A','端盖','转轴','钢珠 ✕']],
      ['起动跳闸', ['热继电器','取连接片','绕组间 ∞','W 相 ✕']]
    ];
    P3.forEach(function(a, i){
      const x = 22 + i*112;
      EP.chip(g, a[0], x + 50, 44, {sz:8.5, b:1, c:C.acc});
      a[1].forEach(function(n, j){
        const y = 62 + j*30, last = j === a[1].length - 1;
        box(g, x, y, 100, 24, 4, last ? C.errbg : C.box, last ? C.err : C.boxLine, last ? 1.6 : 1.1);
        txt(g, n, x + 50, y + 12, {sz:7.5, b: last ? 1 : 0, c: last ? C.err : C.tx3});
        if(!last) seg(g, [[x + 50, y + 24],[x + 50, y + 30]], C.boxLine, 1.4);
      });
    });
    conc(g, 254, 'acc', '三条路长短不一，但都是一步一个读数',
         '案例一走了六步，案例二和三各四步');
  } else if(k === 1){
    /* 共同结构：三段 */
    const ST = [
      ['① 先排除整片的', '供电正常、接线牢固　⇒ 不用一根根查', C.acc],
      ['② 一步一个读数', '每一步都有实测值，不是「看着像」', C.ok],
      ['③ 落到一个部件', '换掉它，故障排除', C.warn]
    ];
    ST.forEach(function(a, i){
      const y = 56 + i*62;
      box(g, 26, y, 308, 50, 6, C.box, a[2], 1.4);
      txt(g, a[0], 40, y + 18, {sz:10.5, b:1, c:a[2], al:'left'});
      txt(g, a[1], 40, y + 36, {sz:8.5, c:C.tx2, al:'left'});
      if(i < 2){
        EC.head(g, 180, y + 56, 0, 1, 6, C.boxLine);
      }
    });
    conc(g, 250, 'ok', '三个案例的结构完全一样',
         '不同的只是「哪一步的读数把方向定下来」');
  } else {
    /* 三个落点 */
    const F = [
      ['案例一', '接触器主触头', '吸合了但不通电', '你听到「啪」就以为它好'],
      ['案例二', '轴承钢珠磨损', '润滑脂干涸', '电流正常就以为电机没事'],
      ['案例三', 'W 相绕组断路', '阻值无穷大', '跳闸先想到的是短路不是断路']
    ];
    F.forEach(function(a, i){
      const y = 50 + i*68;
      box(g, 24, y, 312, 56, 6, C.errbg, C.err, 1.4);
      txt(g, a[0], 40, y + 16, {sz:9, b:1, c:C.tx3, al:'left'});
      txt(g, a[1], 96, y + 16, {sz:10.5, b:1, c:C.err, al:'left'});
      txt(g, a[2], 328, y + 16, {sz:8.5, c:C.tx2, al:'right'});
      txt(g, '为什么容易漏：' + a[3], 40, y + 40, {sz:8, c:C.tx3, al:'left'});
    });
    conc(g, 262, 'err', '三次的落点都不是最先会怀疑的那个',
         '所以每一步都要量，不能凭「看着像」跳过去');
  }
}
function note4(){
  const k = S4.k;
  $('s4a').textContent = '接触器';
  $('s4b').textContent = '轴承';
  $('s4c').textContent = 'W 相绕组';
  const T = [
    ['三条路：现象不同，走法完全不同',
     '<b>案例一走了六步</b>（从电动机接线柱一路查回电源侧），' +
     '<b>案例二和案例三各四步</b>。' +
     '<hr>路径长短取决于<b>第一个读数把范围切成了多大</b>：' +
     '<hr>案例一量到 <b>0 V</b> ⇒ 只知道「电没送到」，' +
     '中间那一长串器件全是嫌疑，只能一个个量过去。' +
     '<hr>案例二量到 <b>3.4 A 和铭牌一致</b> ⇒ ' +
     '一下把整个电路排除掉了，直接掉头查机械。' +
     '<hr>案例三先量热继电器 <b>阻值极小（正常）</b> ⇒ 越过它去查电动机。' +
     '<hr><b>所以第一步量哪儿，很大程度决定了后面要走多远。</b>'],
    ['共同结构：三段',
     '<b>① 先排除掉整片的。</b>' +
     '案例一开头书上就写着「<b>供电电源正常，电路内接线牢固，无松动现象</b>」；' +
     '案例三开头写着「<b>控制电路内的接线正常</b>」。' +
     '<b>这些不是废话 —— 是把一大片可能性一次性排除掉。</b>' +
     '<hr><b>② 一步一个读数。</b>' +
     '三个案例里没有一步是靠「看着像」下的结论，' +
     '每一步都有实测值：380V、0V、0Ω、∞、3.4A…' +
     '<b>而且书上把「正常应该是多少」也写出来了</b>，' +
     '所以你能判断这一步过没过。' +
     '<hr><b>③ 落到一个部件。</b>' +
     '最后都是「换掉它，故障排除」 ——' +
     '接触器、钢珠、绕组，都是能拿在手上的东西。' +
     '<hr>这个结构 8.4 和 7.3 也用过，<b>只是那两节的对象是线路，这一节是设备</b>。'],
    ['三个落点，都不是最先会怀疑的那个',
     '<b>案例一：接触器主触头。</b>' +
     '你按下按钮<b>听到「啪」的吸合声</b>，几乎一定会认为接触器是好的 ——' +
     '于是转头去怀疑电动机。可吸合只说明线圈和衔铁没问题。' +
     '<hr><b>案例二：轴承钢珠。</b>' +
     '电动机发烫，第一反应是电流大了、负载重了 ——' +
     '而钳形表量出来<b>电流跟铭牌一模一样</b>。' +
     '这时候要有勇气<b>掉头去查机械</b>，而不是反复量电路。' +
     '<hr><b>案例三：W 相绕组断路。</b>' +
     '跳闸的第一反应是<b>短路</b>（9.4 那张表里写的也是短路性故障），' +
     '可实际查到的是<b>断路</b> —— 缺一相运行导致堵转、电流暴涨、跳闸。' +
     '<hr><b>共同的教训：每一步都要量，不能凭「看着像」跳过去。</b>' +
     '三个案例里但凡有一步跳过去，都会得出错误结论。']
  ][k];
  $('n3').innerHTML = '<div class="st">' + T[0] + '</div>' + T[1];
}

/* ================================================================
   舞台、事件、收尾
   ================================================================ */
const st1 = new Stage('cv0', 360, 336);
const st2 = new Stage('cv1', 360, 280);
const st3 = new Stage('cv2', 360, 302);
const st4 = new Stage('cv3', 360, 302);

[['s1p','s1n', S1, 5, function(){ note1(); draw1(); }],
 ['s2p','s2n', S2, 3, function(){ note2(); draw2(); }],
 ['s3p','s3n', S3, 3, function(){ note3(); draw3(); }]].forEach(function(a){
  document.getElementById(a[0]).addEventListener('click', function(){
    if(a[2].i > 0){ a[2].i--; a[4](); }
  });
  document.getElementById(a[1]).addEventListener('click', function(){
    if(a[2].i < a[3]){ a[2].i++; a[4](); }
  });
});
document.getElementById('s4k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S4.k = +b.dataset.k;
  document.querySelectorAll('#s4k .btn').forEach(function(x){
    x.classList.toggle('on', +x.dataset.k === S4.k);
  });
  note4(); draw4();
});
/* 三屏的链条也能直接点某一步 */
[[st1, S1, CASE1, 44, function(){ note1(); draw1(); }],
 [st2, S2, CASE2, 48, function(){ note2(); draw2(); }],
 [st3, S3, CASE3, 48, function(){ note3(); draw3(); }]].forEach(function(a){
  a[0].cv.addEventListener('click', function(ev){
    const p = a[0].pick(ev);
    if(p[0] > 180) return;
    a[2].forEach(function(_, k){
      const y = a[3] + k * 38;
      if(p[1] >= y && p[1] <= y + 30) a[1].i = k;
    });
    a[4]();
  });
});

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会重设尺寸并清空。**四屏全是静态的，必须在这儿逐个补画** */
  draw1(); draw2(); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:9, sec:'9.5'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('9.5');
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
