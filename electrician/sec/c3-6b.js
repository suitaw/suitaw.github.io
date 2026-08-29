/* 3.6b 万用表（下）—— 本节内容的唯一真相。
   对应《零基础学电工》第 3 章 3.6 节（书内 P58~P61）的后半。

   上节讲「怎么接」，这节讲「怎么用它把毛病找出来」。四屏：
   测电阻（必须停电、必须拆一头）→ 通断与二极管 → 指针表 → 一条回路怎么查。
   **第 4 屏是这两节的落点**：电压降法 —— 电压掉在哪一段，断点就在那一段。

   数字口径（都有出处，别再重算）：
   - 在路测电阻：R1 = 1 kΩ，旁路 R2 = 2 kΩ，并联 = 1000×2000÷3000 = 666.7 Ω，
     **读数比真值小 33%**
   - 通断档一般在 30~50 Ω 以下才响（各表不同，说明书为准）
   - 硅二极管正向压降 0.5~0.7 V（本节取 0.55 V），锗管 0.2~0.3 V，LED 1.6~3 V；
     反向 OL。正反都 OL = 断路，正反都很小 = 击穿
   - 指针表欧姆档：偏转比例 t = Rc ÷ (Rc + R)，Rc 是该档的**中心值**（＝表内阻）。
     本节按 MF47 那一类取 ×1 档中心值 15，所以 Rc = 15 × 倍率。
     1500 Ω 用 ×100 档时 t = 0.5 —— 指针正好落在刻度正中间，读数最准
   - 第 4 屏：220 V 回路，故障段承担全部电源电压，其余段 0 V */
(function(){
'use strict';
ELEC.reg({
  id: '3.6b',
  file: 'c3-6b.html',
  title: '3.6b 万用表（下）',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>测电阻</button>
    <button class="tab" data-i="1"><span class="n">2</span>通断与二极管</button>
    <button class="tab" data-i="2"><span class="n">3</span>指针表</button>
    <button class="tab" data-i="3"><span class="n">4</span>查一条回路</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">测电阻：先停电，再拆下一头</div>
    电阻档是<b>表自己往外送一个小电流</b>去量的。电路上还带着电，这个电流就被冲乱了；
    元件还连在电路里，量到的是<b>它和旁边一堆东西并联</b>的结果。
    <b>切三种做法看读数。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k">
        <button class="btn on sm" data-k="0">停电＋拆一头</button>
        <button class="btn sm" data-k="1">不拆，在路量</button>
        <button class="btn sm" data-k="2">带电量</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">R1<br>真实值</div><div class="v" id="s1a">1.000 kΩ</div></div>
        <div class="num"><div class="k">表<br>读数</div><div class="v" id="s1b">1.000 kΩ</div></div>
        <div class="num hi"><div class="k">这个数<br>能信吗</div><div class="v" id="s1c">能</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">「在路测量」是新手最容易上的当</div>
    R1 是 1 kΩ，可它两端还并着一条 2 kΩ 的路。表分不清哪个是你要量的：
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>算式</th><th>读数</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">拆下<br>一头</td><td>只剩 R1</td><td><b>1.000 kΩ</b> ✓ 就是它本身</td></tr>
        <tr><td class="eu-s">不拆</td><td>1000 × 2000 ÷ (1000+2000)</td><td><b class="rd">667 Ω</b> —— 小了 33%</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      现场表现是「量出来的阻值总是偏小，还以为元件坏了」。
      <b>并联的东西只会让读数变小，永远不会变大</b> —— 所以在路量到的值<b>偏小</b>时不能下结论，
      量到的值<b>偏大或者 OL</b> 时倒是可以：那说明它本身就断了。
      <span class="sub">「拆一头」是指把元件的一个引脚从电路板/接线端子上脱开，让它只剩下被表笔夹住这一条路。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">带电测电阻：读数没有意义，还可能烧表</div>
    电阻档的原理是<b>表内电池送出一个已知的小电流，再量元件两端的压降</b>，按欧姆定律反算电阻。
    外面要是还有电压，这个压降就是两个电源叠在一起的结果 —— <b>读数乱跳，一个字都不能信</b>。
    <div class="tip">
      电压高一点（比如 220 V）还会<b>直接烧掉电阻档的输入电路</b>，
      不少表这一档没有保护。<b>量电阻之前的第一件事永远是：断电、验电、放电。</b>
      <span class="sub">带电容的电路还要多一步<b>放电</b> —— 电容上存着的电，会在你以为已经停电之后继续把表冲乱。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">电阻档也要选量程</div>
    手动量程表的电阻档一般是 <b>200Ω / 2k / 20k / 200k / 2M</b>，规矩和电压档一样：
    <b>超量程显示 OL，换大一档；档位太大则读不出小数</b>。
    <div class="tip info">
      两支表笔<b>不碰在一起时显示 OL 是正常的</b>（空气的电阻是无穷大），
      这也是最快的自检：<b>两笔一碰，读数应该接近 0</b>；碰了还是 OL，就是表笔线断了。
      <span class="sub">量小电阻（几欧以下）时，表笔线本身的零点几欧也算在里面 ——
      精确测量要先记下两笔短接的读数，再从结果里减掉。</span>
    </div>
  </div>

  <div class="bet" data-bet="c36b-inline" data-q="在电路板上直接量一个标称 1 kΩ 的电阻，读数 667 Ω。最可能是什么情况？"
       data-opts="电阻变值了，该换|旁边有别的支路和它并联，读数被拉低了|表不准" data-right="1"
       data-after="旁边有并联支路。并联只会让读数变小，不会变大。把电阻的一头拆下来再量，才是它本身的值。反过来，如果在路量到的值比标称还大、或者直接 OL，那倒可以直接判它断了。"></div>
</section>

<!-- ================= 场景 2：通断与二极管 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">通断档：查线最快的一档，两笔一碰就知道</div>
    电阻小到一定程度（一般 <b>30~50 Ω 以下</b>）蜂鸣器就响。
    查熔断器、查断线、认线头全靠它。<b>点四种被测件看反应。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">好的熔断器</button>
        <button class="btn sm" data-k="1">断的熔断器</button>
        <button class="btn sm" data-k="2">二极管正接</button>
        <button class="btn sm" data-k="3">二极管反接</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">表<br>显示</div><div class="v" id="s2a">0.2 Ω</div></div>
        <div class="num"><div class="k">蜂鸣器</div><div class="v" id="s2b">响</div></div>
        <div class="num hi"><div class="k">结论</div><div class="v" id="s2c">是通的</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">通断档的三条规矩</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>规矩</th><th>为什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">停电</td><td><b>必须断电才能用</b></td><td>和电阻档同一个道理，它也是靠表内电池</td></tr>
        <tr><td class="eu-s">拆一头</td><td>查某一段线时，<b>把一头脱开</b></td><td>否则可能是绕了一大圈通的，不是这一段通</td></tr>
        <tr><td class="eu-s">试表</td><td>用之前<b>两笔碰一下，听见响</b></td><td>笔线断了的话，什么都不响，你会全判成「断路」</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>响 ≠ 完好。</b>蜂鸣器只说明「电阻很小」——
      一根发热丝正常是 40 Ω，它响；短路成 0.1 Ω，它也响。
      <b>要区分就得看具体读数，不能只听声音。</b>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">二极管档：读的是正向压降，不是电阻</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>正接</th><th>反接</th><th>结论</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">0.5~0.7 V</td><td>OL</td><td><b>好的硅二极管</b>（锗管 0.2~0.3 V，LED 1.6~3 V）</td></tr>
        <tr><td class="eu-s">OL</td><td>OL</td><td><b class="rd">断路</b>，已经坏了</td></tr>
        <tr><td class="eu-s">很小</td><td>很小</td><td><b class="rd">击穿短路</b>，已经坏了</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>数字表二极管档：读数正常（0.5~0.7 V）的那一次，红笔接的就是正极。</b>
      因为表内电池的正极是从<b>红笔</b>送出去的。
      <span class="sub"><b>指针表正好相反 —— 它的红表笔接的是表内电池的负极</b>，
      用指针表判极性时，电阻小的那一次是<b>黑笔</b>接正极。这条下一屏细说，也是考题的常客。</span>
    </div>
  </div>

  <div class="bet" data-bet="c36b-buzz" data-q="用通断档量一个电热管，蜂鸣器响了。能说明它是好的吗？"
       data-opts="能，响就是通的|不能，响只说明电阻很小；正常的电热管有几十欧，响反而可能是内部短路|不能，通断档不能量电热管" data-right="1"
       data-after="不能。蜂鸣器只判「电阻小于三五十欧」。一根 2000W/220V 的电热管正常电阻约 24 欧，本来就在响的范围里；可它要是内部短路成 0.1 欧，照样响。要区分只能看具体读数——用电阻档，把数字读出来跟 U²÷P 算出来的值比一比。"></div>
</section>

<!-- ================= 场景 3：指针表 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">指针表：刻度是反的，每换一档都要重新调零</div>
    电柜里还有大量指针表（万用表、绝缘电阻表都是）。它的欧姆刻度
    <b>右边是 0、左边是 ∞，而且疏密不均</b>。
    <b>换倍率、拖被测电阻，看指针落在哪儿。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn sm" data-k="1">×1</button>
        <button class="btn sm" data-k="10">×10</button>
        <button class="btn on sm" data-k="100">×100</button>
        <button class="btn sm" data-k="1000">×1k</button>
      </div>
      <div class="btns" style="margin-top:8px">
        <button class="btn sm" id="s3s">两笔短接：<b id="s3st">松开</b></button>
        <button class="btn sm" id="s3z">欧姆调零</button>
      </div>
      <div class="rowlab" style="margin-top:8px">被测电阻　<b id="s3lab">1500 Ω</b></div>
      <input type="range" id="s3r" min="0" max="24" step="1" value="13">
      <div class="nums three">
        <div class="num"><div class="k">刻度上<br>读到</div><div class="v" id="s3a">15</div></div>
        <div class="num"><div class="k">× 倍率<br>＝阻值</div><div class="v" id="s3b">1500 Ω</div></div>
        <div class="num hi"><div class="k">指针<br>位置</div><div class="v" id="s3c">正中间，最准</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">读数 = 刻度值 × 倍率</div>
    指针表的欧姆刻度只有一条，倍率旋钮决定它代表多大。
    刻度<b>正中间那个数就是这一档的「中心值」</b>（本表按 15 算）：
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>倍率</th><th>中心值</th><th>适合量</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">×1</td><td>15 Ω</td><td>几欧到几十欧：绕组、发热丝</td></tr>
        <tr><td class="eu-s">×10</td><td>150 Ω</td><td>几十到几百欧</td></tr>
        <tr><td class="eu-s">×100</td><td>1.5 kΩ</td><td>几百欧到几千欧</td></tr>
        <tr><td class="eu-s">×1k</td><td>15 kΩ</td><td>几千欧以上</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>挑档位的标准是「让指针落在刻度中段」</b>（大约在中心值的 1/5 到 5 倍之间）。
      指针挤在左边（靠 ∞ 那头）时，刻度密得根本读不出来；挤在右边也一样。
      <span class="sub">这就是指针表和数字表最大的手感差别：数字表选错档只是显示粗一点或 OL，
      指针表选错档是<b>压根读不准</b>。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">两条一定要记住的规矩</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>规矩</th><th>后果 / 用处</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">调零</td><td><b>每换一次倍率，都要两笔短接、重新调零</b></td><td>表内电池会变老，不调零读数整体偏大</td></tr>
        <tr><td class="eu-s">极性</td><td><b>红表笔接的是表内电池的负极</b></td><td>判二极管极性时<b>和数字表相反</b>：电阻小的那次，<b>黑笔</b>接正极</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      指针表也有它的长处：<b>看「变化」比数字表直观得多</b> ——
      电容充电时指针慢慢摆过去再退回来、接触不良时指针一抖一抖，
      这些在数字屏上只是一串乱跳的数字。
      <span class="sub">另外指针表用完要<b>把旋钮拨到交流电压最高档或 OFF</b>，
      停在电阻档时两支笔碰一起会一直耗表内电池。</span>
    </div>
  </div>

  <div class="bet" data-bet="c36b-mf" data-q="用指针表的 ×100 档量一个电阻，指针几乎贴在最左边的 ∞ 那一头。该怎么办？"
       data-opts="判定它断路了|换到 ×1k 档再量，指针落到中段才读得准|把表拍一拍" data-right="1"
       data-after="换大一档。指针贴在 ∞ 那头，说明被测电阻远大于这一档的中心值（×100 档中心值 1.5 kΩ），刻度在那儿密得读不出来。换 ×1k 档、重新调零再量。真的断路时，换到最大档指针仍然一动不动。"></div>
</section>

<!-- ================= 场景 4：查一条回路 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">一条灯不亮的回路，怎么一步步找出毛病</div>
    这是万用表最值钱的用法：<b>带电，用电压档，沿着回路一段一段量</b>。
    <b>先选一种故障，再点图上的熔断器 / 开关 / 灯，把表笔搭上去。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4f">
        <button class="btn on sm" data-f="0">一切正常</button>
        <button class="btn sm" data-f="1">熔断器熔断</button>
        <button class="btn sm" data-f="2">开关触点不通</button>
        <button class="btn sm" data-f="3">灯丝断了</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">表笔<br>跨在哪</div><div class="v" id="s4a">L 和 N</div></div>
        <div class="num"><div class="k">读数</div><div class="v" id="s4b">220 V</div></div>
        <div class="num hi"><div class="k">说明</div><div class="v" id="s4c">电源有电</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st good">一句话口诀：电压掉在哪一段，断点就在那一段</div>
    串联回路里电流处处相同。<b>断开的那一段没有电流，却承担了全部电源电压；
    通的那些段几乎是 0 V。</b>所以带电量一圈，220 V 出现在哪儿，毛病就在哪儿。
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>量到</th><th>灯</th><th>结论</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">跨熔断器<br>220 V</td><td>不亮</td><td><b>熔断器断了</b>（先查为什么断，别只换）</td></tr>
        <tr><td class="eu-s">跨开关<br>220 V</td><td>不亮</td><td>开关合着却不通 —— <b>触点烧蚀或接触不良</b></td></tr>
        <tr><td class="eu-s">跨灯<br>220 V</td><td>不亮</td><td><b>电压送到了灯却不亮 ⇒ 灯本身坏了</b></td></tr>
        <tr><td class="eu-s">跨灯<br>220 V</td><td>亮</td><td>正常。这一档量到 220 V 是应该的</td></tr>
        <tr><td class="eu-s">L-N<br>没有电压</td><td>不亮</td><td>问题在更上一级：总闸、上级熔断器、来电本身</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>顺序是从电源往负载走</b>：先量 L-N 确认有电，再一段一段往下。
      跳着量也行，但从头走一遍不会漏。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">带电量的安全线</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>做法</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">档位</td><td><b>先确认在交流电压档、红笔在 VΩ 孔</b>（上一节那条命）</td></tr>
        <tr><td class="eu-s">试表</td><td>先在<b>已知带电</b>的地方量一下，确认表本身是好的</td></tr>
        <tr><td class="eu-s">手</td><td><b>尽量单手操作</b>，另一只手别扶在金属外壳上 —— 别让电流有机会穿过胸腔</td></tr>
        <tr><td class="eu-s">笔</td><td>手指压在护环后面，<b>笔尖不要同时碰到两个带电点</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>能停电查就停电查。</b>停电以后用<b>通断档</b>同样能把这四种故障全找出来，
      而且更安全：跨熔断器不响 ⇒ 熔断器断；跨开关（合上时）不响 ⇒ 触点不通；跨灯不响 ⇒ 灯丝断。
      <span class="sub">带电查的唯一好处是不用停机 —— 代价是你得一直站在带电的电路旁边。</span>
    </div>
  </div>

  <div class="quiz" data-quiz="c3-6b">
    <div class="qz" data-q="在电路板上直接量一个 10 kΩ 的电阻，读数 4.7 kΩ。下一步该做什么？"
         data-opts="判定电阻变值，换掉|把电阻的一头从板子上脱开，再量一次|加大量程再量"
         data-right="1"
         data-why="先拆一头再量。在路测量时，旁边的支路会和它并联，读数只会偏小。拆掉一头让它只剩表笔这一条路，量到的才是它本身。反过来，在路量到的值比标称大、或者 OL，倒是可以直接判它断了——并联不可能让读数变大。"></div>
    <div class="qz" data-q="用数字表的二极管档量一只二极管：红笔接 A 脚、黑笔接 B 脚时显示 0.55V，反过来显示 OL。哪一脚是正极？"
         data-opts="B 脚|A 脚|判断不了"
         data-right="1"
         data-why="A 脚。数字表二极管档的电流是从红笔流出去的，所以显示正常压降（0.5~0.7V）的那一次，红笔接的就是正极。注意指针表正好相反——它的红表笔接表内电池的负极，用指针表判极性时是黑笔接正极。"></div>
    <div class="qz" data-q="一条 220V 照明回路灯不亮。量 L-N 有 220V，跨熔断器 0V，跨开关 0V，跨灯泡 220V。故障在哪？"
         data-opts="熔断器断了|灯泡坏了|开关坏了"
         data-right="1"
         data-why="灯泡坏了。熔断器和开关两端都是 0V，说明这两段都是通的；220V 完整地送到了灯泡两端，灯却不亮，那只能是灯本身断路（灯丝烧断、灯座接触不良）。口诀：电压掉在哪一段，断点就在那一段。"></div>
    <div class="qz" data-q="用指针表量电阻，换了倍率档以后必须做的一步是？"
         data-opts="没有必须做的，直接量|两支表笔短接、重新调零|把表水平放好"
         data-right="1"
         data-why="重新调零。每一个倍率档的内部分流电路不同，而且表内电池会随使用变老，不重新调零读数会整体偏大。做法是两笔短接、转动「欧姆调零」旋钮让指针正好指到右端的 0。数字表没有这一步。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 3 章 3.6 节（书内 P58~P61）<br>下一节：3.7 钳形表 —— 不断线也能测电流</div>
</section>`,

  init: function(EC){
'use strict';
const {C, Path, Stage, txt, tw, box, tag, hot, loop, $} = EC;
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

/* 表笔 / 插孔 / 表身 / 表笔线都在 elec-parts.js 里（EP.probe / EP.jack /
   EP.meterUnit / EP.leads），和 3.6a 用的是同一套。 */
const J4 = [{n:'10A',red:1},{n:'mA',red:1},{n:'COM',red:0},{n:'VΩ',red:1}];

/* 玻璃管熔断器：两端银帽 + 中间玻璃管 + 里面一根丝。
   断了的画法是**丝在中间断开、两截往下垂、玻璃发黑** —— 光把丝画断看不出来 */
function fuse(g, x, y, ok, o){
  o = o || {};
  const w = o.w || 60, h = 15;
  g.save();
  /* 玻璃管 */
  EP.rr(g, x-w/2+9, y-h/2, w-18, h, 2);
  g.fillStyle = ok ? 'rgba(150,178,205,.12)' : 'rgba(40,34,30,.55)';
  g.fill();
  g.strokeStyle = 'rgba(190,209,228,.55)'; g.lineWidth = 1; g.stroke();
  /* 里面的丝 */
  g.strokeStyle = ok ? P.copperL : P.steelD; g.lineWidth = 1.5; g.lineCap = 'round';
  if(ok){
    g.beginPath(); g.moveTo(x-w/2+9, y); g.lineTo(x+w/2-9, y); g.stroke();
  }else{
    g.beginPath(); g.moveTo(x-w/2+9, y); g.lineTo(x-6, y+3.5); g.stroke();
    g.beginPath(); g.moveTo(x+w/2-9, y); g.lineTo(x+6, y+3.5); g.stroke();
  }
  /* 两端银帽 */
  [x-w/2, x+w/2-11].forEach(function(bx){
    EP.rr(g, bx, y-h/2-1.5, 11, h+3, 2);
    g.fillStyle = EP.cyl(g, y-h/2-1.5, y+h/2+1.5, P.steelDD, P.steel, P.chrome);
    g.fill();
    g.strokeStyle = P.steelDD; g.lineWidth = 1; g.stroke();
  });
  g.restore();
}

/* ================================================================
   场景 1：测电阻
   ================================================================
   R1 = 1 kΩ，两端并着一条 2 kΩ 的路：不拆一头就量，读到的是
   1000×2000÷3000 = 666.7 Ω，比真值小 33%。 */
const R1V = 1000, R2V = 2000;
const S1 = { k:0, ph:0, jitter:0 };
const st1 = new Stage('cv0', 360, 322);
const WY1 = 196, WY1B = 258, RX1 = 170, CUT = 110;
const P1 = new Path([[40,WY1],[320,WY1],[320,WY1B],[40,WY1B]]);

function calc1(){
  if(S1.k === 0) return R1V;
  return R1V*R2V/(R1V+R2V);
}
function fmtR(r){
  if(r >= 1000) return (r/1000).toFixed(3) + ' kΩ';
  return r.toFixed(0) + ' Ω';
}

function draw1(dt){
  const g = st1.g; st1.clear();
  const live = (S1.k === 2);
  if(live){ S1.ph += dt * 30; S1.jitter += dt; }
  EP.heading(g, 12, 14, '测电阻', S1.k === 0 ? '拆一头' : (S1.k === 1 ? '在路量' : '带电量'));

  const reading = live ? liveText() : fmtR(calc1());
  const jk = EP.meterUnit(g, 110, 8, 140, 96,
    {mode:'Ω', reading:reading, rsz:15, jacks:J4, hot:3});

  /* 电路：R1 在上、R2 在下，靠左右两根竖线并联 */
  if(S1.k === 0){
    new Path([[40,WY1],[CUT-9,WY1]]).stroke(g, 2.6, C.wire);
    new Path([[CUT+9,WY1],[320,WY1],[320,WY1B],[40,WY1B],[40,WY1]]).stroke(g, 2.6, C.wire);
    g.save(); g.strokeStyle = C.tx3; g.lineWidth = 1.2; g.setLineDash([2.5,2.5]);
    g.beginPath(); g.moveTo(CUT-9, WY1); g.lineTo(CUT+9, WY1); g.stroke(); g.restore();
    txt(g, '拆下一头', 92, 178, {sz:9, c:C.tx3});   /* 放 110 会被黑笔杆压住 */
  }else{
    const wc = live ? C.warn : C.wire;
    P1.stroke(g, 2.6, wc);
    new Path([[40,WY1B],[40,WY1]]).stroke(g, 2.6, wc);
  }
  if(live) EP.chip(g, '板子还带着电', 290, 168,
                   {sz:9.5, b:1, c:C.err, fill:C.errbg, line:C.err});

  EP.resistor(g, RX1, WY1, {len:56, dia:20, bands:['#6b4423','#1b2027','#c0392b','#c9a227']});
  txt(g, 'R1  1 kΩ', RX1, 178, {sz:9.5, b:1, c:C.tx2});
  EP.resistor(g, RX1, WY1B, {len:56, dia:20, bands:['#c0392b','#1b2027','#c0392b','#c9a227']});
  txt(g, 'R2  2 kΩ  旁边的支路', RX1, 240, {sz:9.5, c:C.tx3});

  /* 表笔 */
  EP.leads(g, jk[3], jk[2], 206, 134, {yTop:118, yBot:130, tipY:WY1 - 48});
  EP.probe(g, 206, WY1, -Math.PI/2, true);
  EP.probe(g, 134, WY1, -Math.PI/2, false);

  /* 结论条 */
  const ok = (S1.k === 0);
  box(g, 18, 280, 324, 32, 6, ok ? C.okbg : C.errbg, ok ? C.ok : C.err, 1);
  txt(g, ok ? '只剩 R1 这一条路：读 1.000 kΩ，就是它本身'
            : (S1.k === 1 ? '量到的是 R1 ∥ R2 = 667 Ω，小了 33%'
                          : '外面的电压把表内电池冲乱了：读数乱跳，还可能烧表'),
      180, 296, {sz:10.5, b:1, c: ok ? C.ok : C.err});
}
function liveText(){
  /* 带电时读数无意义 —— 让它每 0.12 秒乱跳一次，比写一个死数字说明问题 */
  const n = Math.floor(S1.jitter / 0.12);
  const seq = ['0.412', '1.877', 'OL', '0.093', '2.541', 'OL', '1.208'];
  return seq[n % seq.length];
}

function note1(){
  $('s1a').textContent = '1.000 kΩ';
  $('s1b').textContent = S1.k === 2 ? '乱跳' : fmtR(calc1());
  $('s1c').textContent = S1.k === 0 ? '能' : (S1.k === 1 ? '不能，偏小' : '不能，无意义');
  let h;
  if(S1.k === 0){
    h = '<div class="st good">这是唯一靠得住的量法</div>' +
        '电路已经断电，R1 的左脚也从板子上脱开了 —— <b>现在表笔之间只有 R1 这一条路</b>，' +
        '读数 <b>1.000 kΩ</b> 就是它本身。' +
        '<div class="tip info" style="margin-top:8px">「拆一头」不用把元件整个拆下来，' +
        '脱开一个引脚就够了：只要旁边的支路不能绕回来，就没有并联。</div>';
  }else if(S1.k === 1){
    h = '<div class="st bad">读数被旁边那条路拉低了</div>' +
        'R1 没有脱开，它的两端还并着 R2 那条 2 kΩ 的路。表看到的是两条路并在一起：' +
        '<b>1000 × 2000 ÷ 3000 = 666.7 Ω</b>，屏幕上是 <b>667 Ω</b>（2 kΩ 档上显示成 0.667）。' +
        '<div class="tip" style="margin-top:8px"><b>并联只会让读数变小。</b>' +
        '所以在路量到偏小的值不能下结论；量到<b>偏大或者 OL</b> 倒是能直接判它断了 —— ' +
        '因为并联不可能把读数变大。</div>';
  }else{
    h = '<div class="st bad">带电量电阻：一个字都不能信</div>' +
        '电阻档靠的是<b>表内那节小电池</b>：送一个已知的小电流出去，量元件两端的压降，再反算电阻。' +
        '外面还有电压时，压降是两个电源叠加的结果 —— <b>读数乱跳，毫无意义</b>。' +
        '<div class="tip" style="margin-top:8px">电压高一点还会<b>直接烧掉电阻档的输入电路</b>。' +
        '<b>量电阻之前永远是：断电 → 验电 → 放电（有电容的话）。</b></div>';
  }
  $('n0').innerHTML = h;
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
   场景 2：通断与二极管
   ================================================================ */
const CASE2 = [
  {t:'好的熔断器', read:'0.2 Ω', buzz:1, mode:'通断', concl:'是通的',
   st:'响 —— 这一段是通的', good:1,
   b:'表内电池送出的小电流顺利通过，电阻只有 <b>0.2 Ω</b>，蜂鸣器响。' +
     '<b>熔断器的正常电阻本来就接近 0</b>，它只是一根会烧断的细丝。',
   tip:'<b>响 ≠ 完好。</b>蜂鸣器只判「电阻小于三五十欧」——' +
       '一根 24 Ω 的电热管也在这个范围里，可它短路成 0.1 Ω 时同样会响。要区分只能看具体读数。'},
  {t:'断的熔断器', read:'OL', buzz:0, mode:'通断', concl:'断了',
   st:'不响，显示 OL —— 断了', good:0,
   b:'电流过不去，表显示 <b>OL</b>（无穷大），蜂鸣器不响。玻璃管里那根丝已经烧断，' +
     '管壁上常常还有一层<b>发黑的痕迹</b>，那是熔断时的金属蒸气。',
   tip:'<b>换熔断器之前先问一句「它为什么会断」。</b>' +
       '熔断器是替下游挡刀的，直接换一根更粗的等于把保护拆了 —— ' +
       '短路点还在，下一次烧的就是电缆。'},
  {t:'二极管正接', read:'0.55 V', buzz:0, mode:'二极管', concl:'正向，好的',
   st:'显示 0.55 V —— 这是正向压降，不是电阻', good:1,
   b:'二极管档读的是<b>正向压降</b>：硅管 <b>0.5~0.7 V</b>，锗管 0.2~0.3 V，LED 1.6~3 V。' +
     '<b>这一次红笔接的就是二极管的正极</b> —— 表内电池的正极是从红笔送出去的。',
   tip:'<b>指针表正好相反：它的红表笔接的是表内电池的负极。</b>' +
       '用指针表判极性时，电阻小的那一次是<b>黑笔</b>接正极。下一屏细说。'},
  {t:'二极管反接', read:'OL', buzz:0, mode:'二极管', concl:'反向，好的',
   st:'显示 OL —— 反向不通，这才是正常的', good:1,
   b:'二极管只让电流往一个方向走，反过来接就是断路，显示 <b>OL</b>。' +
     '<b>正接 0.55 V、反接 OL，这只管子就是好的。</b>',
   tip:'两种坏法：<b>正反都 OL ⇒ 断路</b>；<b>正反都是很小的数 ⇒ 击穿短路</b>。' +
       '两种都得换。<span class="sub">在路量二极管同样会受旁边支路影响，' +
       '拿不准就拆一头。</span>'}
];
const S2 = { k:0 };
const st2 = new Stage('cv1', 360, 300);
const DY = 200, DXL = 152, DXR = 248;

function draw2(){
  const g = st2.g; st2.clear();
  const K = CASE2[S2.k];
  EP.heading(g, 12, 14, K.mode === '通断' ? '通断档' : '二极管档',
             K.buzz ? '蜂鸣器响' : '不响');

  const jk = EP.meterUnit(g, 110, 8, 140, 96,
    {mode:K.mode === '通断' ? 'CONT' : 'DIODE', reading:K.read, rsz:15, jacks:J4, hot:3});

  /* 蜂鸣：表身右边三道声波弧 */
  if(K.buzz){
    g.save();
    g.strokeStyle = C.ok; g.lineWidth = 1.6; g.lineCap = 'round';
    for(let i=1;i<=3;i++){
      g.globalAlpha = 1 - i*0.22;
      g.beginPath(); g.arc(252, 56, 6 + i*7, -0.85, 0.85); g.stroke();
    }
    g.restore();
    txt(g, '嘀嘀嘀', 296, 56, {sz:10, b:1, c:C.ok});
  }

  /* 被测件：两个接线柱之间 */
  new Path([[DXL,DY],[DXR,DY]]).stroke(g, 2.6, C.wire);
  if(S2.k < 2){
    fuse(g, 200, DY, S2.k === 0);
    txt(g, S2.k === 0 ? '熔断器（好的）' : '熔断器（已熔断）', 200, DY + 26,
        {sz:9.5, c: S2.k === 0 ? C.tx2 : C.err});
  }else{
    /* EP.diode 默认阳极在左、阴极（银环）在右，flip 才反过来。
       **「正接」必须让红笔那一头是阳极** —— 课文写着「红笔接的就是正极」，
       图上要是红笔搭在阴极上，图和文字就打起来了 */
    EP.diode(g, 200, DY, {len:40, horiz:true, flip:(S2.k === 2)});
    txt(g, '二极管', 200, DY + 26, {sz:9.5, c:C.tx2});
    txt(g, S2.k === 2 ? '负极' : '正极', 172, DY - 22, {sz:9, b:1, c:C.tx3});
    txt(g, S2.k === 2 ? '正极' : '负极', 228, DY - 22, {sz:9, b:1, c:C.tx3});
  }
  EP.terminal(g, DXL, DY, 5);
  EP.terminal(g, DXR, DY, 5);

  /* 表笔 */
  EP.leads(g, jk[3], jk[2], DXR, DXL, {yTop:118, yBot:130, tipY:DY - 48});
  EP.probe(g, DXR, DY, -Math.PI/2, true);
  EP.probe(g, DXL, DY, -Math.PI/2, false);
  txt(g, '红', DXR + 13, DY - 34, {sz:8.5, c:'#e05a4a', al:'left'});
  txt(g, '黑', DXL - 13, DY - 34, {sz:8.5, c:C.tx3, al:'right'});

  /* 结论条 */
  box(g, 18, 252, 324, 32, 6, K.good ? C.okbg : C.errbg, K.good ? C.ok : C.err, 1);
  txt(g, K.st, 180, 268, {sz:10.5, b:1, c: K.good ? C.ok : C.err});
}

function note2(){
  const K = CASE2[S2.k];
  $('s2a').textContent = K.read;
  $('s2b').textContent = K.buzz ? '响' : '不响';
  $('s2c').textContent = K.concl;
  $('n1').innerHTML = '<div class="st' + (K.good ? '' : ' bad') + '">' + K.st + '</div>' +
    K.b + '<div class="tip' + (K.good ? ' info' : '') + '" style="margin-top:8px">' + K.tip + '</div>';
}

document.getElementById('s2k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S2.k = +b.dataset.k;
  document.querySelectorAll('#s2k .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S2.k);
  });
  note2(); draw2();
});

/* ================================================================
   场景 3：指针表
   ================================================================
   欧姆档偏转比例 t = Rc ÷ (Rc + R)，Rc 是该档中心值（＝表内阻），
   本表按 MF47 那一类取 ×1 档中心值 15，所以 Rc = 15 × 倍率。
   R=0（两笔短接）时 t=1 指到右端的 0；R=∞ 时 t=0 指到左端。
   **没调零就是满偏电流不够** —— 这里用 t×0.88 表示，短接时指针停在「2」附近而不是 0。 */
const RS = [10,15,22,33,47,68,100,150,220,330,470,680,1000,1500,2200,3300,4700,
            6800,10000,15000,22000,33000,47000,68000,100000];
/* 标数字的刻度只留 8 个：R-20 那圈上相邻两档的弧长有的只有 10 px，
   标满 11 个必然叠字（0/1、100/200、200/∞ 三处都叠了） */
const OHM_BIG = [0,2,5,10,15,30,100,'∞'];
const OHM_SMALL = [0.5,1.5,3,4,7,12,25,30,40,70,150,300,500];
const S3 = { m:100, ri:13, short:false, zero:true };
const st3 = new Stage('cv2', 360, 304);
const DC = [180, 148], DR = 110, SPAN = 0.95;

function tOf(v){ return (v === '∞') ? 0 : 15/(15+v); }
function angOf(t){ return (t*2 - 1)*SPAN - Math.PI/2; }
function needleT(){
  const R = S3.short ? 0 : RS[S3.ri];
  const Rc = 15*S3.m;
  let t = Rc/(Rc + R);
  if(!S3.zero) t *= 0.88;
  return t;
}
function scaleRead(){ return RS[S3.ri] / S3.m; }
function fmtScale(v){ return v >= 10 ? v.toFixed(0) : v.toFixed(1); }
function posText(t){
  if(t < 0.08) return '贴在 ∞ 端，读不出';
  if(t < 0.2)  return '太靠左，不准';
  if(t > 0.92) return '贴在 0 端';
  if(t > 0.8)  return '太靠右，不准';
  if(t > 0.35 && t < 0.65) return '正中间，最准';
  return '中段，能读';
}

function draw3(){
  const g = st3.g; st3.clear();
  EP.heading(g, 12, 14, '指针表', '×' + (S3.m >= 1000 ? '1k' : S3.m));

  /* 表身 + 米黄表盘（真实材质色，不跟教学语义色走） */
  g.save();
  EP.rr(g, 52, 8, 256, 176, 10);
  g.fillStyle = EP.cyl(g, 8, 184, '#14171b', P.body, P.bodyL); g.fill();
  g.strokeStyle = '#0d1013'; g.lineWidth = 1.4; g.stroke();
  g.restore();
  box(g, 62, 16, 236, 140, 6, '#e8e2d0', '#b9ae8e', 1.4);

  /* 刻度弧 */
  g.save();
  g.strokeStyle = '#3a3527'; g.lineWidth = 1.4;
  g.beginPath();
  g.arc(DC[0], DC[1], DR, -Math.PI/2 - SPAN, -Math.PI/2 + SPAN);
  g.stroke();
  OHM_SMALL.forEach(function(v){
    const a = angOf(tOf(v));
    g.beginPath();
    g.moveTo(DC[0] + Math.cos(a)*DR, DC[1] + Math.sin(a)*DR);
    g.lineTo(DC[0] + Math.cos(a)*(DR-5), DC[1] + Math.sin(a)*(DR-5));
    g.stroke();
  });
  g.lineWidth = 1.8;
  OHM_BIG.forEach(function(v){
    const a = angOf(tOf(v));
    g.beginPath();
    g.moveTo(DC[0] + Math.cos(a)*DR, DC[1] + Math.sin(a)*DR);
    g.lineTo(DC[0] + Math.cos(a)*(DR-10), DC[1] + Math.sin(a)*(DR-10));
    g.stroke();
    txt(g, String(v), DC[0] + Math.cos(a)*(DR-20), DC[1] + Math.sin(a)*(DR-20),
        {sz: v === '∞' ? 12 : 9, b:1, c:'#3a3527'});
  });
  g.restore();
  /* Ω 只能放表盘左上角：弧内正上方是「15」那个刻度数字的位置 */
  txt(g, 'Ω', 78, 38, {sz:13, b:1, c:'#3a3527'});

  /* 指针 */
  const t = needleT(), a = angOf(t);
  g.save();
  g.strokeStyle = '#c8422f'; g.lineWidth = 2.2; g.lineCap = 'round';
  g.beginPath(); g.moveTo(DC[0], DC[1]);
  g.lineTo(DC[0] + Math.cos(a)*(DR-6), DC[1] + Math.sin(a)*(DR-6));
  g.stroke();
  g.fillStyle = '#3a3527';
  g.beginPath(); g.arc(DC[0], DC[1], 4.5, 0, Math.PI*2); g.fill();
  g.restore();

  /* 倍率牌 + 调零旋钮 */
  EP.chip(g, '×' + (S3.m >= 1000 ? '1k' : S3.m), 96, 140,
          {sz:10, b:1, c:'#3a3527', fill:'#d8d0b8', line:'#b9ae8e'});
  g.save();
  const kg = g.createRadialGradient(272, 164, 2, 276, 168, 13);
  kg.addColorStop(0, '#6b737d'); kg.addColorStop(0.6, '#23272c'); kg.addColorStop(1, '#0d1013');
  g.fillStyle = kg;
  g.beginPath(); g.arc(276, 168, 13, 0, Math.PI*2); g.fill();
  g.strokeStyle = S3.zero ? P.blue : C.warn; g.lineWidth = 1.4; g.stroke();
  g.restore();
  txt(g, '调零', 276, 168, {sz:8, b:1, c:'#e2e8ee'});

  /* 插孔 + 表笔线（这一屏的笔线很短，直接画折线） */
  const jb = EP.jack(g, 150, 170, 0, false);
  const jr = EP.jack(g, 210, 170, 1, false);
  txt(g, '−', 134, 170, {sz:10, b:1, c:'#e2e8ee'});
  txt(g, '＋', 226, 170, {sz:9, b:1, c:'#e2e8ee'});
  EP.wire(g, new Path([[jb[0],jb[1]],[jb[0],198],[152,198],[152,226]]), {color:C.wire, w:2.4});
  EP.wire(g, new Path([[jr[0],jr[1]],[jr[0],198],[208,198],[208,226]]), {color:'#c0392b', w:2.4});

  /* 被测电阻 */
  EP.resistor(g, 180, 226, {len:56, dia:18});
  txt(g, '被测电阻  ' + RS[S3.ri] + ' Ω', 180, 246, {sz:9.5, b:1, c:C.tx2});
  txt(g, '黑笔＝电池 ＋', 106, 212, {sz:8.5, c:C.tx3, al:'right'});
  txt(g, '红笔＝电池 −', 254, 212, {sz:8.5, c:C.err, al:'left'});

  /* 结论条 */
  const good = S3.zero && t > 0.2 && t < 0.92;
  box(g, 18, 262, 324, 32, 6, good ? C.okbg : C.warnbg, good ? C.ok : C.warn, 1);
  txt(g, !S3.zero ? '换了档还没调零 —— 先两笔短接，看指针能不能指到 0'
                  : (S3.short ? '两笔短接：指针应该正好指在右端的 0'
                              : '刻度读 ' + fmtScale(scaleRead()) + ' × ' + (S3.m >= 1000 ? '1k' : S3.m)
                                + ' = ' + RS[S3.ri] + ' Ω　（' + posText(t) + '）'),
      180, 278, {sz:10.5, b:1, c: good ? C.ok : C.warn});
}

function note3(){
  const t = needleT();
  $('s3lab').textContent = RS[S3.ri] + ' Ω';
  $('s3a').textContent = S3.short ? '0' : fmtScale(scaleRead());
  $('s3b').textContent = S3.short ? '—' : RS[S3.ri] + ' Ω';
  $('s3c').textContent = S3.zero ? posText(t) : '没调零';
  $('s3st').textContent = S3.short ? '短接中' : '松开';
  let h;
  if(!S3.zero){
    h = '<div class="st bad">换了倍率，先调零</div>' +
        '每一档的内部分流电路不一样，表内那节电池还会越用越老。' +
        '<b>不重新调零，读数会整体偏大。</b>现在两笔短接，指针停在「2」附近而不是 0 —— ' +
        '<b>点一下「欧姆调零」</b>，转动旋钮让它正好压在右端的 0 上。' +
        '<div class="tip" style="margin-top:8px">调零调不到 0，说明<b>表内电池该换了</b>。' +
        '数字表没有这一步，这是指针表独有的。</div>';
  }else if(S3.short){
    h = '<div class="st good">短接 = 0 Ω，指针满偏到右端</div>' +
        '两支表笔碰在一起，被测电阻是 0，指针应该<b>正好指在右端那个 0 上</b>。' +
        '这既是调零的动作，也是<b>每次用表前的自检</b>：碰了指针不动，就是表笔线断了。' +
        '<div class="tip info" style="margin-top:8px">注意指针表的刻度<b>右边是 0、左边是 ∞</b>，' +
        '和电压电流刻度的方向正好相反 —— 电阻越大，指针越往左。</div>';
  }else{
    const good = t > 0.2 && t < 0.92;
    h = '<div class="st' + (good ? '' : ' warn') + '">' +
        (good ? '刻度读 ' + fmtScale(scaleRead()) + '，× ' + (S3.m >= 1000 ? '1k' : S3.m) +
                ' = ' + RS[S3.ri] + ' Ω'
              : '这一档不合适，指针' + (t <= 0.2 ? '太靠左' : '太靠右')) + '</div>' +
        '指针表只有一条欧姆刻度，<b>倍率旋钮决定它代表多大</b>：' +
        '刻度上读到的数 × 倍率，才是阻值。' +
        (good
          ? '<div class="tip info" style="margin-top:8px">' + posText(t) +
            '。挑档位就看一条：<b>让指针落在刻度中段</b>，' +
            '大约在中心值（这一档是 ' + (15*S3.m >= 1000 ? (15*S3.m/1000) + ' kΩ' : 15*S3.m + ' Ω') +
            '）的 1/5 到 5 倍之间。</div>'
          : '<div class="tip" style="margin-top:8px">' + posText(t) + ' —— ' +
            (t <= 0.2 ? '被测电阻远大于这一档的中心值，刻度在那头密得读不出来，<b>换大一档</b>。'
                      : '被测电阻远小于中心值，指针挤在 0 那头，<b>换小一档</b>。') +
            '<b>换完别忘了重新调零。</b></div>');
  }
  $('n2').innerHTML = h;
}

function syncBtn3(){
  document.querySelectorAll('#s3k .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S3.m);
  });
}
document.getElementById('s3k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S3.m = +b.dataset.k;
  /* **换档就作废调零** —— 这是这一屏最要紧的一条 */
  S3.zero = false; S3.short = true;
  syncBtn3(); note3(); draw3();
});
$('s3s').addEventListener('click', function(){
  S3.short = !S3.short; note3(); draw3();
});
$('s3z').addEventListener('click', function(){
  /* 调零就是在两笔短接的状态下转旋钮，所以点它就先替他短接上 */
  S3.short = true; S3.zero = true; note3(); draw3();
});
$('s3r').addEventListener('input', function(){
  S3.ri = +this.value; note3(); draw3();
});

/* ================================================================
   场景 4：查一条回路
   ================================================================
   L → FU → SA → EL → N。串联回路里断开的那一段承担全部电源电压，
   通的段都是 0 V。**跨灯量到 220 V 有两种含义**，靠「灯亮不亮」区分：
   亮 = 正常；不亮 = 电压送到了、灯本身坏了。 */
const POSN = ['L 和 N', '熔断器 FU', '开关 SA', '灯 EL'];
const FAULTN = ['正常', '熔断器断', '开关不通', '灯丝断'];
const S4 = { f:0, p:0, ph:0 };
const st4 = new Stage('cv3', 360, 336);
const BY = 210, LMX = 40, NMX = 320, FUX = 100, SAX = 185, ELX4 = 265;
const P4 = new Path([[LMX,282],[LMX,BY],[NMX,BY],[NMX,282]]);
/* 每个测量位置的 [红笔落点, 黑笔落点, 笔尖 y] */
/* 落点要落在元件**外面**的导线上：熔断器管体 70~130，±28 会把笔杆压在银帽上 */
const PPOS = [[NMX,LMX,170],[136,64,BY],[224,146,BY],[293,237,BY]];

function volt4(pos, f){
  if(pos === 0) return 220;
  if(f === 0) return pos === 3 ? 220 : 0;
  if(f === 3) return pos === 3 ? 220 : 0;
  return pos === f ? 220 : 0;
}
function lit4(){ return S4.f === 0; }

function draw4(dt){
  const g = st4.g; st4.clear();
  const on = lit4();
  if(on) S4.ph += dt * 30;
  EP.heading(g, 12, 14, '查回路', FAULTN[S4.f]);

  const v = volt4(S4.p, S4.f);
  const jk = EP.meterUnit(g, 110, 8, 140, 88,
    {mode:'AC', reading: v.toFixed(0) + ' V', rsz:15, jacks:J4, hot:3});

  /* 两根母线 + 中间那条支路 */
  new Path([[LMX,158],[LMX,282]]).stroke(g, 2.6, C.L);
  new Path([[NMX,158],[NMX,282]]).stroke(g, 2.6, C.N);
  txt(g, 'L 火线', LMX + 12, 252, {sz:9.5, b:1, c:C.L, al:'left'});
  txt(g, 'N 零线', NMX - 12, 252, {sz:9.5, b:1, c:C.N, al:'right'});
  new Path([[LMX,BY],[NMX,BY]]).stroke(g, 2.6, C.wire);
  EP.flow(g, P4, {gap:52, kind:'cur', dir:1, phase:S4.ph,
                  color: on ? null : C.tx3, skip:[[102,162],[186,248],[286,308]]});

  /* 熔断器 / 开关 / 灯 */
  fuse(g, FUX, BY, S4.f !== 1);
  txt(g, 'FU 熔断器', FUX, 238, {sz:9.5, c: S4.f === 1 ? C.err : C.tx3});
  EP.knife(g, SAX, BY, true, {w:44});
  txt(g, 'SA 开关（合着）', SAX, 238, {sz:9.5, c: S4.f === 2 ? C.err : C.tx3});
  EP.lampHolder(g, ELX4, BY - 5, 15, 10);
  EP.bulb(g, ELX4, BY - 10 - 15, 15, on ? 1 : 0);
  txt(g, 'EL 灯', ELX4, 238, {sz:9.5, c: S4.f === 3 ? C.err : C.tx3});
  /* 开关触点不通 / 灯丝断：在元件上打一个红叉，光靠文字看不出来 */
  if(S4.f === 2) xMark(g, SAX + 22, BY);
  if(S4.f === 3) xMark(g, ELX4, BY - 26);

  /* 四个可点位置 */
  /* 四个可点位置：没选中的淡一点，四个框都很显眼的话画面会乱 */
  const HOTS = [[LMX,215,{w:26,h:100}],[FUX,BY,{w:74,h:44}],
                [SAX,BY,{w:88,h:44}],[ELX4,BY-14,{w:70,h:72}]];
  HOTS.forEach(function(H, i){
    hot(g, H[0], H[1], 0, {w:H[2].w, h:H[2].h, r:8, a: i === S4.p ? 0.85 : 0.22});
  });
  hot(g, NMX, 215, 0, {w:26, h:100, r:8, a: S4.p === 0 ? 0.85 : 0.22});

  /* 表笔 */
  const PP = PPOS[S4.p];
  EP.leads(g, jk[3], jk[2], PP[0], PP[1], {yTop:104, yBot:114, tipY:PP[2] - 48});
  EP.probe(g, PP[0], PP[2], -Math.PI/2, true);
  EP.probe(g, PP[1], PP[2], -Math.PI/2, false);

  /* 结论条 */
  const bad = (v > 0 && S4.p > 0 && !(S4.p === 3 && on));
  box(g, 18, 294, 324, 32, 6, bad ? C.errbg : C.okbg, bad ? C.err : C.ok, 1);
  txt(g, concl4(), 180, 310, {sz:10.5, b:1, c: bad ? C.err : C.ok});
}
function xMark(g, x, y){
  g.save();
  g.strokeStyle = C.err; g.lineWidth = 2.4; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x-6, y-6); g.lineTo(x+6, y+6);
  g.moveTo(x+6, y-6); g.lineTo(x-6, y+6); g.stroke();
  g.restore();
}
function concl4(){
  const v = volt4(S4.p, S4.f), on = lit4();
  if(S4.p === 0) return '电源侧有 220 V，问题在下游';
  if(S4.p === 1) return v ? '熔断器两端 220 V —— 它断了' : '熔断器两端 0 V —— 它是通的';
  if(S4.p === 2) return v ? '开关合着两端却有 220 V —— 触点不通' : '开关两端 0 V —— 它是通的';
  return v ? (on ? '灯两端 220 V 而且亮着 —— 这一段正常'
                 : '灯两端 220 V 却不亮 —— 灯本身坏了')
           : '灯两端 0 V —— 电压根本没送到这儿，毛病在上游';
}

function note4(){
  const v = volt4(S4.p, S4.f), on = lit4();
  $('s4a').textContent = POSN[S4.p];
  $('s4b').textContent = v.toFixed(0) + ' V';
  $('s4c').textContent = S4.p === 0 ? '电源有电'
    : (v ? (S4.p === 3 ? (on ? '正常' : '灯坏了') : '这一段断了') : '这一段是通的');
  let h;
  if(S4.p === 0){
    h = '<div class="st">第一步永远是量电源</div>' +
        '跨在 L 和 N 上量到 <b>220 V</b>，说明电送到这个配电点了，' +
        '毛病在<b>下游</b>。' + (S4.f === 0 ? '' : '接着往下一段一段量。') +
        '<div class="tip info" style="margin-top:8px">要是这一步就没电压，' +
        '那就<b>别再往下查了</b> —— 去看上一级：总闸跳没跳、上级熔断器、来电本身。' +
        '很多人一上来就拆灯具，其实是上级停电了。</div>';
  }else if(v > 0 && !(S4.p === 3 && on)){
    const who = ['', '熔断器', '开关', '灯'][S4.p];
    h = '<div class="st bad">找到了：' + who + '</div>' +
        (S4.p === 3
          ? '<b>220 V 已经完整送到灯的两端，灯却不亮</b> —— 电压到位、电流走不通，' +
            '那只能是灯本身断路：灯丝烧断、灯座接触不良、灯头氧化。'
          : '这一段两端量到<b>全部电源电压 220 V</b>。串联回路里，' +
            '只有<b>断开的那一段</b>才会承担全部电压 —— 断点就在这儿。') +
        '<div class="tip" style="margin-top:8px">' +
        (S4.p === 1
          ? '<b>换熔断器之前先问「它为什么断」。</b>直接换一根更粗的等于把保护拆了，' +
            '短路点还在，下一次烧的就是电缆。'
          : (S4.p === 2
            ? '开关合着却不通，多半是<b>触点烧蚀、氧化、弹簧压不紧</b>。' +
              '停电后用通断档复核一下：合上开关不响，就实锤了。'
            : '换灯之前顺手量一下<b>灯座两个接点</b>——' +
              '灯没问题而灯座接触不良的情况一样常见。')) + '</div>';
  }else{
    h = '<div class="st good">这一段是好的</div>' +
        (v > 0
          ? '灯两端有 220 V 而且<b>灯亮着</b>，这一段一切正常 —— ' +
            '<b>正常工作时，电压本来就该全部落在负载上。</b>'
          : '两端电压是 <b>0 V</b>，说明电流能顺利通过这一段 —— ' +
            '<b>好的导线、好的触点、好的熔断器，两端都应该是 0。</b>' +
            (S4.f === 0 ? '' : '接着量下一段。')) +
        '<div class="tip info" style="margin-top:8px">' +
        '这就是<b>电压降法</b>：沿着回路一段一段量，<b>电压掉在哪一段，断点就在那一段</b>。' +
        '通的段是 0 V，断的段是全电压，中间没有第三种情况。</div>';
  }
  $('n3').innerHTML = h;
}

document.getElementById('s4f').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S4.f = +b.dataset.f;
  document.querySelectorAll('#s4f .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.f === S4.f);
  });
  note4();
});
st4.cv.addEventListener('click', function(ev){
  const p = st4.pick(ev), x = p[0], y = p[1];
  let np = -1;
  if(y > 158 && y < 282 && (Math.abs(x-LMX) < 16 || Math.abs(x-NMX) < 16)) np = 0;
  else if(y > 188 && y < 232 && x > 66  && x < 134) np = 1;
  else if(y > 188 && y < 232 && x > 140 && x < 230) np = 2;
  else if(y > 166 && y < 232 && x > 232 && x < 300) np = 3;
  if(np >= 0 && np !== S4.p){ S4.p = np; note4(); }
});

/* ================================================================
   绑定
   ================================================================ */
function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会清空画布。屏 1、4 在 rAF 里每帧重画，静态的屏 2、3 必须在这儿补画 */
  draw1(0); draw2(); draw3(); draw4(0);
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:3, sec:'3.6b'});
ElecUI.bind(document);
note1(); note2(); note3(); note4(); syncBtn3();
fitAll();

(function(){
  const nb = ElecNav.neighbors('3.6b');
  let h = '';
  h += nb.prev ? '<a href="'+nb.prev.f+'">‹ '+nb.prev.id+' '+nb.prev.t+'</a>'
               : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next ? '<a class="next" href="'+nb.next.f+'">'+nb.next.id+' '+nb.next.t+' ›</a>'
               : '<span>3.7 钳形表还没做</span>';
  $('pager').innerHTML = h;
})();

loop(function(dt){
  if(cur === 0) draw1(dt);
  else if(cur === 3) draw4(dt);
});
  }
});
})();
