/* 2.7 电动机 —— 本节内容的唯一真相。
   对应《零基础学电工》第 2 章 2.7 节（书内 P44~P47）。

   全章最后一节，也是最要紧的一节：后面第 9、10 章整章都在讲电动机的控制和维护。
   四屏按「上手顺序」排：凭什么转 → 铭牌怎么读 → 接线盒怎么接 → 坏了怎么查。
   直流电动机只在讲解卡里带一句 —— 现场 95% 是三相异步电动机。 */
(function(){
'use strict';
ELEC.reg({
  id: '2.7',
  file: 'c2-7.html',
  title: '2.7 电动机',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>凭什么转</button>
    <button class="tab" data-i="1"><span class="n">2</span>铭牌怎么读</button>
    <button class="tab" data-i="2"><span class="n">3</span>星形 / 三角形</button>
    <button class="tab" data-i="3"><span class="n">4</span>坏了怎么查</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">三相电天生就会转圈</div>
    三相电流互相错开 <b>120°</b>，加在定子的三组绕组上，合起来就是一个
    <b>匀速旋转的磁场</b>。转子被它拖着走 —— 但<b>永远差一点点追不上</b>，
    所以叫「异步」。<b>拖滑杆改极对数和频率，看转速怎么变。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="rowlab">极对数 p　<b id="s1plab">2 对极（4 极电机）</b></div>
      <input type="range" id="s1p" min="1" max="4" step="1" value="2">
      <div class="rowlab" style="margin-top:6px">电源频率 f　<b id="s1flab">50 Hz</b></div>
      <input type="range" id="s1f" min="10" max="60" step="1" value="50">
      <div class="nums three">
        <div class="num"><div class="k">旋转磁场<br>同步转速 n₀</div><div class="v" id="s1a">1500</div></div>
        <div class="num hi"><div class="k">转子<br>实际转速 n</div><div class="v" id="s1b">1440</div></div>
        <div class="num"><div class="k">转差率<br>s</div><div class="v" id="s1c">4%</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">同步转速：一个只跟两件事有关的数</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>极对数 p</th><th>俗称</th><th>50 Hz 下的同步转速</th><th>铭牌上常见</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">1</td><td>2 极</td><td>3000 r/min</td><td>2900 左右</td></tr>
        <tr><td class="eu-s">2</td><td>4 极</td><td>1500 r/min</td><td><b>1440 左右（最常见）</b></td></tr>
        <tr><td class="eu-s">3</td><td>6 极</td><td>1000 r/min</td><td>960 左右</td></tr>
        <tr><td class="eu-s">4</td><td>8 极</td><td>750 r/min</td><td>720 左右</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>看到铭牌上写 1440 r/min，就知道这是台 4 极电机、同步转速 1500。</b>
      这个反推很常用 —— 换电机、配变频器、算皮带轮都要它。
      <span class="sub">转速只跟<b>频率</b>和<b>极对数</b>有关，跟电压、功率、负载都没关系。
      负载重一点转速会掉几十转（转差变大），但掉不了太多。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">为什么变频器能调速</div>
    同步转速 n₀ = 60f ÷ p。<b>极对数是造出来就定死的，改不了；能改的只有频率。</b>
    变频器干的就是这件事：把 50 Hz 的电变成 5~50 Hz 甚至更高，转速跟着变。
    <div class="tip" style="margin-top:8px">
      <b>但不能只改频率。</b>频率降下来而电压不降的话，铁芯会磁饱和、电流暴增烧电机。
      所以变频器是<b>电压和频率一起按比例调</b>（叫 U/f 恒定）。
      <span class="sub">这也是为什么<b>不能拿调压器给三相电机调速</b>——
      调压器只降电压不降频率，结果是转速几乎不变、转矩掉一大截、电流反而变大。
      第 12 章会专门讲变频器。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">「异步」是它能出力的前提，不是缺点</div>
    转子必须<b>比旋转磁场慢一点</b>，两者之间才有相对运动，
    转子里才会感应出电流，才会受力（1.6 节那条「磁生电」＋「电生力」）。<br>
    <b>如果转子真的追上了磁场，相对运动为零 → 不再感应出电流 → 没有力 → 立刻又掉下来。</b>
    <div class="tip" style="margin-top:8px">
      转差率 s = (n₀ − n) ÷ n₀。<b>额定负载下一般是 2%~5%。</b><br>
      <b>转差反过来能当诊断用：</b>转速明显偏低（转差大）说明负载过重或电压不足；
      <b>启动瞬间 s = 1</b>（转子还没动），这时电流最大 —— 这就是启动电流能到额定 5~7 倍的原因。
    </div>
  </div>

  <div class="bet" data-bet="c27-speed" data-q="一台电机铭牌写 1440 r/min。它是几极的？"
       data-opts="2 极|4 极|6 极" data-right="1"
       data-after="4 极（p = 2 对极）。同步转速 = 60×50÷2 = 1500，铭牌上的 1440 是扣掉 4% 转差之后的实际转速。看到 2900 就是 2 极、960 是 6 极、720 是 8 极。"></div>
</section>

<!-- ================= 场景 2：铭牌 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">铭牌是这台电机的身份证</div>
    换电机、配开关、选热继电器、算电缆，全部数据都从这块小铁片上来。
    <b>挨个点一遍，把每一项是干什么的搞清楚。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2k">
        <button class="btn on sm" data-k="0">功率</button>
        <button class="btn sm" data-k="1">电压</button>
        <button class="btn sm" data-k="2">电流</button>
        <button class="btn sm" data-k="3">转速</button>
        <button class="btn sm" data-k="4">接法</button>
        <button class="btn sm" data-k="5">防护等级</button>
        <button class="btn sm" data-k="6">绝缘等级</button>
        <button class="btn sm" data-k="7">工作制</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">这一项</div><div class="v" id="s2a">7.5 kW</div></div>
        <div class="num hi"><div class="k">它决定<br>什么</div><div class="v" id="s2b">选线选开关</div></div>
        <div class="num"><div class="k">看错了<br>会怎样</div><div class="v" id="s2c">带不动</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">最常用的三个数，和它们之间的关系</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>这台电机</th><th>怎么用</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">额定功率</td><td>7.5 kW</td><td><b>轴上能输出的机械功率</b>，不是它从电网吃进去的电功率</td></tr>
        <tr><td class="eu-s">额定电流</td><td>15.4 A</td><td><b>选断路器、接触器、热继电器、电缆全看它</b>。热继电器就整定在这个数附近</td></tr>
        <tr><td class="eu-s">估算口诀</td><td>—</td><td>380 V 三相电机，<b>额定电流 ≈ 2 × 千瓦数</b>。7.5 kW → 约 15 A，跟铭牌对得上</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>这个「2 倍」口诀很好用</b>，现场估算配多大的开关、多粗的线一秒钟出结果。
      <span class="sub">它是从 P = √3·U·I·cosφ·η 里凑出来的经验值
      （380 V、cosφ≈0.85、η≈0.88 时算出来约 1.9 倍）。
      <b>但下单买东西还是要按铭牌上的实际数字</b>，口诀只用来做心算和校验。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">防护等级 IP 两位数，各管一件事</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>位</th><th>管什么</th><th>常见值</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">第 1 位</td><td>防固体（灰尘、手指）</td><td><b>5 = 防尘</b>，6 = 尘密</td></tr>
        <tr><td class="eu-s">第 2 位</td><td>防水</td><td><b>4 = 防溅水</b>，5 = 防喷水，7 = 短时浸水</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>IP54 是普通车间电机最常见的等级</b>：防尘、防溅水。
      户外或冲洗场合要 IP55 以上。<b>选低了进水进灰，绝缘几个月就完蛋。</b>
    </div>
  </div>

  <div class="bet" data-bet="c27-plate" data-q="铭牌写「7.5 kW」。这 7.5 千瓦指的是什么？"
       data-opts="它从电网吃进去的电功率|它轴上输出的机械功率|它的最大功率" data-right="1"
       data-after="轴上输出的机械功率。它从电网吃进去的更多（要扣掉铜损、铁损、机械损耗），所以效率是 88% 左右的话，输入约 8.5 kW。选线选开关要按额定电流（铭牌上另有一项），不能拿 7.5 kW 直接除以电压。"></div>
</section>

<!-- ================= 场景 3：星形 / 三角形 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">接线盒里那六个端子，摆法决定一切</div>
    三相绕组的六个头都引到接线盒里。<b>连接片怎么摆，决定这台电机是星形还是三角形</b> ——
    而这两种接法下，每一相绕组承受的电压差 <b>√3 倍</b>。
    <b>切一下看连接片怎么动。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3k">
        <button class="btn on" data-k="0">星形 Y</button>
        <button class="btn" data-k="1">三角形 △</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">每相绕组<br>承受电压</div><div class="v" id="s3a">220 V</div></div>
        <div class="num"><div class="k">线电流 :<br>相电流</div><div class="v" id="s3b">1 : 1</div></div>
        <div class="num hi"><div class="k">相对功率</div><div class="v" id="s3c">1 倍</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">端子为什么那样排</div>
    接线盒里六个端子是<b>错开</b>排的：上排 <b>W2 U2 V2</b>，下排 <b>U1 V1 W1</b>。
    这不是随便排的 —— 这样排之后：
    <div class="eu-tw" style="margin-top:6px"><table class="eu-t">
      <thead><tr><th>接法</th><th>连接片怎么摆</th><th>为什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">星形 Y</td><td><b>两块片横着</b>，把上排三个连成一串</td><td>三相绕组的尾端并到一点（中性点），头端接电源</td></tr>
        <tr><td class="eu-s">三角形 △</td><td><b>三块片竖着</b>，上下配对连</td><td>正好把 U1-W2、V1-U2、W1-V2 首尾相接，围成一个三角</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>端子的错位排法，就是为了让三角形接法刚好是「三块片竖着插」。</b>
      记住这个，接线盒一打开就知道现在是哪种接法 ——
      <b>横着两块 = 星形，竖着三块 = 三角形。</b>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">接错的后果，两个方向都很严重</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>铭牌要求</th><th>实际接成</th><th>后果</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">380 V △</td><td>星形 Y</td><td>每相只有 220 V，<b>转矩掉到 1/3</b>，带不动负载 → 堵转 → 电流大、发烫烧绕组</td></tr>
        <tr><td class="eu-s">380 V Y</td><td>三角形 △</td><td>每相承受 380 V（超了 √3 倍），<b>电流暴增，几分钟就冒烟</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>怎么定：只看铭牌那一行「电压 / 接法」。</b>
      铭牌写「380 V △」就接三角形，写「380 V Y」就接星形，
      写「380/660 V △/Y」表示 380 V 电网用三角形、660 V 电网用星形。
      <span class="sub">中小功率电机（一般 3 kW 以下）多半是 380 V Y 接；
      再大一些通常是 380 V △ 接，因为要留出<b>星三角降压启动</b>的余地。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">星三角降压启动，用的就是这个差别</div>
    对一台<b>正常运行时接三角形</b>的电机：启动时先接成星形，
    每相电压降到 1/√3 → <b>启动电流和启动转矩都降到 1/3</b>；
    转起来之后再切回三角形全压运行。
    <div class="tip info" style="margin-top:8px">
      <b>代价是转矩也只有 1/3</b>，所以只适合<b>空载或轻载启动</b>的场合
      （风机、水泵这类）。带着重载启动会转不起来，反而更糟。
      <span class="sub">第 9 章会讲这套控制电路怎么接（三个接触器 + 一个时间继电器）。</span>
    </div>
  </div>

  <div class="bet" data-bet="c27-ydelta" data-q="铭牌写「380 V △」的电机，被接成了星形。会怎样？"
       data-opts="转不动会烧|转速变慢|转矩只有 1/3，带不动负载就会堵转发热" data-right="2"
       data-after="转矩只有 1/3。每相电压从 380 掉到 220，而转矩正比于电压的平方，(1/√3)² = 1/3。空载时看着还能转，一带负载就转不动，堵转电流很大、绕组几分钟就烫手。"></div>
</section>

<!-- ================= 场景 4：故障判断 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">电机坏没坏，两块表就能判个八九不离十</div>
    <b>断电挂牌 → 拆开接线盒、把连接片取下来 → 万用表量三相绕组、兆欧表量对地。</b>
    <b>点四种情况，看表上分别是什么样。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4k">
        <button class="btn on sm" data-k="0">正常</button>
        <button class="btn sm" data-k="1">一相断路</button>
        <button class="btn sm" data-k="2">匝间短路</button>
        <button class="btn sm" data-k="3">受潮 / 绝缘损坏</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">三相绕组<br>电阻</div><div class="v" id="s4a">平衡</div></div>
        <div class="num"><div class="k">对地<br>绝缘</div><div class="v" id="s4b">&gt; 100 MΩ</div></div>
        <div class="num hi"><div class="k">现象</div><div class="v" id="s4c">正常</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">四种典型故障对照表</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>情况</th><th>表上读数</th><th>通电时的现象</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">正常</td><td><b>三相基本相等</b>（差 5% 以内）；绝缘兆欧级</td><td>转得顺、声音均匀、不烫手</td></tr>
        <tr><td class="eu-s">缺相</td><td><b>有一相是 ∞</b>；绝缘正常</td><td><b>启动不了，只「嗡嗡」响</b>；勉强转起来后严重发烫</td></tr>
        <tr><td class="eu-s">匝间<br>短路</td><td><b>有一相明显偏小</b>；绝缘正常</td><td>能转但无力、发烫快、有异味</td></tr>
        <tr><td class="eu-s">受潮</td><td>三相都正常；<b>绝缘掉到零点几 MΩ</b></td><td>一通电就跳漏保，或外壳带电</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>「嗡嗡响转不动」是最常见的报修，八成是缺相。</b>
      而缺相不一定是电机坏了 —— <b>先查电源侧</b>：熔断器熔断一相、接触器一个触点没吸上、
      端子松动、电缆断一芯，都会造成同样的现象。<b>先量电机进线的三相电压，再拆电机。</b>
      <span class="sub">缺相运行时电机很快就烧，所以热继电器（2.3 节）和缺相保护是必须装的。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">除了两块表，手上还要做两件事</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>怎么做</th><th>不正常说明什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">用手<br>转轴</td><td>断电后用手盘一下转轴</td><td><b>转不动、有卡顿、有沙沙声 = 轴承坏了</b>或扫膛（转子蹭定子）</td></tr>
        <tr><td class="eu-s">看和闻</td><td>看接线盒和绕组端部，闻有没有焦味</td><td>绕组发黑、绝缘漆起泡、焦糊味 = <b>已经烧过了，别再通电</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>轴承是电机最常坏的零件</b>，比绕组坏得多得多。
      电机异响、振动大、外壳某一头特别烫，先怀疑轴承，别急着拆绕组。
      <span class="sub">第 10 章讲电机拆装和保养时会细说。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">动手之前：断电、验电、挂牌</div>
    电机的控制柜可能有<b>远程启动</b>、也可能有<b>自动控制程序</b>。
    只把现场那个按钮按停是不够的。
    <div class="tip" style="margin-top:8px">
      <b>规矩：断开上级断路器 → 验电确认无压 → 上锁挂牌（LOTO）→ 才动手。</b>
      变频器驱动的电机还要<b>等直流母线电容放完电</b>（看柜门上标的等待时间，
      2.5 节讲过这条）。
    </div>
  </div>

  <div class="quiz" data-quiz="c2-7">
    <div class="qz" data-q="一台电机铭牌写 960 r/min，电源 50 Hz。它的同步转速是多少？"
         data-opts="1000 r/min|960 r/min|1500 r/min"
         data-right="0"
         data-why="1000 r/min（6 极，p=3）。同步转速只有 3000/1500/1000/750 这几个值，铭牌上的实际转速总是比它略低一点（差的那点就是转差）。960 离 1000 最近，所以是 6 极机。"></div>
    <div class="qz" data-q="铭牌写「380 V △」的电机，接线盒里连接片应该怎么摆？"
         data-opts="两块横着，把上排三个连起来|三块竖着，上下配对连|随便，反正六个端子都通"
         data-right="1"
         data-why="三块竖着。端子上排 W2 U2 V2、下排 U1 V1 W1 是错开排的，三块片竖着插正好把 U1-W2、V1-U2、W1-V2 首尾相接围成三角形。横着两块是星形接法，接错的话每相只有 220 V，转矩掉到 1/3。"></div>
    <div class="qz" data-q="电机通电后只「嗡嗡」响转不动。第一步应该查什么？"
         data-opts="拆开电机检查绕组|先量电机进线的三相电压，看是不是缺相|直接换一台电机"
         data-right="1"
         data-why="先量进线三相电压。「嗡嗡响转不动」是典型的缺相现象，而缺相的原因大多在电源侧——熔断器熔断一相、接触器有个触点没吸合、端子松动、电缆断芯。这些查起来几分钟，拆电机要几小时。"></div>
    <div class="qz" data-q="用兆欧表量出电机绕组对地绝缘只有 0.2 MΩ，但三相绕组电阻完全平衡。能通电吗？"
         data-opts="能，绕组是好的|不能，绝缘不合格，多半是受潮，要先烘干|能，先试一下再说"
         data-right="1"
         data-why="不能。绕组电阻正常只说明线没断也没匝间短路，绝缘低说明绕组和外壳之间已经快通了——通电会跳漏电保护，严重的会让外壳带电伤人。低压设备一般要求不低于 0.5 MΩ。受潮的电机烘干之后绝缘往往能恢复，不一定要换。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 2 章 2.7 节（书内 P44~P47）<br>第 2 章到这里就学完了</div>
</section>`,

  init: function(EC){
'use strict';
const {C, Path, Stage, txt, tw, box, tag, loop, $} = EC;

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

const PH = [C.L, C.warn, C.acc];          /* 三相各用一个颜色，三屏统一 */
const PHN = ['U', 'V', 'W'];

/* ================================================================
   场景 1：旋转磁场
   ================================================================
   同步转速 n0 = 60f/p（r/min）。转差取额定值 4%，实际转速 n = n0(1−s)。
   画面转速要按 SLOW 倍慢放 —— 1440 r/min 是每秒 24 转，照实画就是一团糊。 */
const SLIP = 0.04, SLOW = 20;
const S1 = { p:2, f:50, ang:0, lastB:'' };
const st1 = new Stage('cv0', 360, 322);

function s1calc(){
  const n0 = 60*S1.f/S1.p;
  return {n0:n0, n:n0*(1-SLIP)};
}

function draw1(dt){
  const g = st1.g; st1.clear();
  const r = s1calc();
  S1.ang += (r.n0/60)/SLOW * dt * Math.PI*2;      /* 磁场的机械角速度 */
  const fa = S1.ang, ra = S1.ang*(1-SLIP);
  EP.heading(g, 20, 16, '三相电流 → 旋转磁场', '画面已慢放 ' + SLOW + ' 倍');

  /* ---- 三相电流波形 ---- */
  const PX = 20, PY = 34, PW = 320, PHt = 80;
  box(g, PX, PY, PW, PHt, 4, C.box, C.boxLine, 1);
  const zy = PY + PHt/2, amp = PHt*0.36;
  g.save(); g.strokeStyle = C.boxLine; g.lineWidth = 1;
  g.beginPath(); g.moveTo(PX, zy); g.lineTo(PX+PW, zy); g.stroke(); g.restore();
  /* 电角度：一个机械圈 = p 个电周期，这里画两个电周期 */
  const eAng = fa*S1.p;
  for(let k = 0; k < 3; k++){
    g.save(); g.strokeStyle = PH[k]; g.lineWidth = 2; g.lineJoin = 'round';
    g.beginPath();
    for(let i = 0; i <= 160; i++){
      const th = i/160*4*Math.PI;
      const px = PX + i/160*PW, py = zy - Math.sin(th - k*2*Math.PI/3)*amp;
      i ? g.lineTo(px, py) : g.moveTo(px, py);
    }
    g.stroke(); g.restore();
  }
  /* 走针：当前电角度落在两个周期里的哪儿 */
  const u = ((eAng % (4*Math.PI)) + 4*Math.PI) % (4*Math.PI) / (4*Math.PI);
  g.save(); g.strokeStyle = C.tx2; g.lineWidth = 1.4;
  g.beginPath(); g.moveTo(PX+u*PW, PY+3); g.lineTo(PX+u*PW, PY+PHt-3); g.stroke(); g.restore();
  EC.stripLegend(g, PX+6, PY+PHt+14, [['U 相', PH[0]], ['V 相', PH[1]], ['W 相', PH[2]]]);

  /* ---- 定子圆 + 旋转磁场 ---- */
  const CX = 180, CY = 212, R = 58;
  g.save(); g.strokeStyle = C.metalD; g.lineWidth = 2.4;
  g.beginPath(); g.arc(CX, CY, R, 0, Math.PI*2); g.stroke();
  g.beginPath(); g.arc(CX, CY, R-13, 0, Math.PI*2); g.stroke(); g.restore();
  /* 三组绕组，空间上互差 120° */
  for(let k = 0; k < 3; k++){
    const a = -Math.PI/2 + k*2*Math.PI/3;
    const cx = CX + Math.cos(a)*(R-6.5), cy = CY + Math.sin(a)*(R-6.5);
    const ik = Math.sin(eAng - k*2*Math.PI/3);
    g.save(); g.translate(cx, cy); g.rotate(a + Math.PI/2);
    box(g, -9, -6, 18, 12, 3, PH[k], null, 0);
    g.restore();
    g.save(); g.globalAlpha = 0.25 + 0.75*Math.abs(ik);
    txt(g, PHN[k], CX + Math.cos(a)*(R+14), CY + Math.sin(a)*(R+14),
        {sz:10.5, b:1, c:PH[k]});
    g.restore();
  }
  /* 合成磁场箭头 */
  const bx = CX + Math.cos(fa - Math.PI/2)*(R-20), by = CY + Math.sin(fa - Math.PI/2)*(R-20);
  g.save(); g.strokeStyle = C.ok; g.lineWidth = 3; g.lineCap = 'round';
  g.beginPath(); g.moveTo(CX, CY); g.lineTo(bx, by); g.stroke(); g.restore();
  EC.head(g, bx, by, Math.cos(fa-Math.PI/2), Math.sin(fa-Math.PI/2), 8, C.ok);
  /* 转子：慢一点点 */
  g.save(); g.fillStyle = C.box; g.strokeStyle = C.metalD; g.lineWidth = 2;
  g.beginPath(); g.arc(CX, CY, 24, 0, Math.PI*2); g.fill(); g.stroke(); g.restore();
  g.save(); g.strokeStyle = C.cur; g.lineWidth = 3.4; g.lineCap = 'round';
  g.beginPath();
  g.moveTo(CX + Math.cos(ra-Math.PI/2)*19, CY + Math.sin(ra-Math.PI/2)*19);
  g.lineTo(CX - Math.cos(ra-Math.PI/2)*19, CY - Math.sin(ra-Math.PI/2)*19);
  g.stroke(); g.restore();
  txt(g, '旋转磁场', CX + 78, CY - 18, {sz:9.5, b:1, c:C.ok, al:'left'});
  txt(g, '转子', CX + 78, CY + 2, {sz:9.5, b:1, c:C.cur, al:'left'});
  txt(g, '慢一点点', CX + 78, CY + 15, {sz:9, c:C.tx3, al:'left'});

  box(g, 20, 284, 320, 30, 6, C.accbg, C.acc, 1);
  txt(g, 'n₀ = 60 × ' + S1.f + ' ÷ ' + S1.p + ' = ' + r.n0.toFixed(0) +
        ' r/min　·　转子 ' + r.n.toFixed(0) + ' r/min',
      180, 299, {sz:11, b:1, c:C.acc});

  const bt = r.n.toFixed(0);
  if(bt !== S1.lastB){ S1.lastB = bt; $('s1b').textContent = bt; }
}
function note1(){
  const r = s1calc();
  $('s1plab').textContent = S1.p + ' 对极（' + (S1.p*2) + ' 极电机）';
  $('s1flab').textContent = S1.f + ' Hz';
  $('s1a').textContent = r.n0.toFixed(0);
  $('s1c').textContent = (SLIP*100).toFixed(0) + '%';
  $('n0').innerHTML =
    '<div class="st">n₀ = 60 f ÷ p</div>' +
    '频率 <b>' + S1.f + ' Hz</b>、极对数 <b>' + S1.p + '</b>　→　' +
    '旋转磁场每分钟转 <b>' + r.n0.toFixed(0) + '</b> 圈。<br>' +
    '转子要慢一点才有力（转差 ' + (SLIP*100).toFixed(0) + '%），所以实际是 <b>' +
    r.n.toFixed(0) + ' r/min</b>。<br>' +
    (S1.f !== 50
      ? '<span class="sub"><b>现在频率不是 50 Hz</b> —— 这就是变频器在干的事。' +
        '注意实际变频时<b>电压要跟着频率一起降</b>，只降频率不降电压会磁饱和烧电机。</span>'
      : '<span class="sub">把频率滑杆拖一拖：转速跟着变，这就是变频调速。' +
        '把极对数拖一拖：同步转速只有 3000 / 1500 / 1000 / 750 这几个值，' +
        '因为极对数只能是整数。</span>');
}
$('s1p').addEventListener('input', function(){ S1.p = +this.value; note1(); });
$('s1f').addEventListener('input', function(){ S1.f = +this.value; note1(); });

/* ================================================================
   场景 2：铭牌
   ================================================================ */
const PLATE = [
  [['型号', 'Y132M-4'],   ['编号', 'M-2026']],
  [['功率', '7.5 kW'],    ['电压', '380 V']],
  [['电流', '15.4 A'],    ['频率', '50 Hz']],
  [['转速', '1440 r/min'],['接法', '△']],
  [['防护等级', 'IP54'],  ['绝缘等级', 'B 级']],
  [['工作制', 'S1 连续'], ['重量', '68 kg']]
];
/* 八个按钮各自指向铭牌上的哪一格 */
const KEY = [
  {rc:[1,0], v:'7.5 kW',    dec:'选线选开关', wrong:'带不动',
   d:'<b>轴上输出的机械功率</b>，不是它从电网吃进去的电功率。<br>' +
     '选设备时它决定「这台电机能干多重的活」；但<b>选线、选开关要看电流那一项，不是看它</b>。<br>' +
     '<span class="sub">从电网吃进去的更多：7.5 ÷ 0.88（效率）≈ 8.5 kW。</span>'},
  {rc:[1,1], v:'380 V',     dec:'怎么接线', wrong:'烧绕组',
   d:'<b>额定电压，而且必须和「接法」那一项连起来看。</b><br>' +
     '「380 V △」＝ 380 V 电网下接三角形；「380/660 V △/Y」＝ 380 V 用三角形、660 V 用星形。<br>' +
     '<span class="sub">电压长期偏离额定 ±5% 以上，电机寿命会明显缩短。' +
     '偏低带不动、偏高发热。</span>'},
  {rc:[2,0], v:'15.4 A',    dec:'整定热继电器', wrong:'保护失效',
   d:'<b>这一项用得最多。</b>断路器、接触器、热继电器、电缆截面，全按它选。<br>' +
     '热继电器的整定值就设在<b>额定电流附近</b>（一般 1.0~1.1 倍）。<br>' +
     '<span class="sub">口诀：380 V 三相电机的额定电流 ≈ 2 × 千瓦数。' +
     '7.5 kW → 约 15 A，和铭牌对得上。</span>'},
  {rc:[3,0], v:'1440 r/min',dec:'算传动比', wrong:'转速不对',
   d:'<b>额定负载下的实际转速</b>，比同步转速略低。<br>' +
     '1440 → 同步 1500 → <b>4 极电机</b>。配皮带轮、算链轮、选减速机都要它。<br>' +
     '<span class="sub">空载时会比这个高一点（转差小），重载时低一点。</span>'},
  {rc:[3,1], v:'△',        dec:'连接片摆法', wrong:'烧或带不动',
   d:'<b>接线盒里连接片的摆法。</b>△ ＝ 三块片竖着；Y ＝ 两块片横着。<br>' +
     '<b>接错的两个方向都很严重</b>：该 △ 接成 Y，转矩只剩 1/3 带不动；' +
     '该 Y 接成 △，每相超压 √3 倍，几分钟冒烟。<br>' +
     '<span class="sub">下一屏专门讲这个。</span>'},
  {rc:[4,0], v:'IP54',     dec:'能装在什么环境', wrong:'进水进灰',
   d:'<b>防护等级。第 1 位防固体、第 2 位防水。</b><br>' +
     '5 ＝ 防尘，4 ＝ 防溅水。IP54 是普通车间最常见的等级。<br>' +
     '<span class="sub">户外、冲洗场合要 IP55 以上。选低了灰和水进去，' +
     '绝缘几个月就完蛋 —— 这是「电机总烧」的常见根因之一。</span>'},
  {rc:[4,1], v:'B 级',     dec:'能扛多高温度', wrong:'过热老化',
   d:'<b>绕组绝缘材料的耐温等级。</b>常见 B 级 130 ℃、F 级 155 ℃、H 级 180 ℃。<br>' +
     '这是<b>绕组本身允许的极限温度</b>，不是外壳摸上去的温度。<br>' +
     '<span class="sub">经验规律：绝缘温度每超 8~10 ℃，寿命大约减半。' +
     '所以「有点烫但还能摸」不代表没事，散热和通风必须保证。</span>'},
  {rc:[5,0], v:'S1 连续',  dec:'能连续跑多久', wrong:'过热',
   d:'<b>工作制。S1 ＝ 连续工作，可以一直跑。</b><br>' +
     'S2 ＝ 短时工作（跑一会儿必须停下来凉透），S3 ＝ 断续周期工作（比如行车、闸门）。<br>' +
     '<span class="sub">拿 S2/S3 的电机去连续跑必然过热。' +
     '反过来把 S1 的电机用在频繁启停的场合也不行 —— 启动电流大，频繁启动一样烧。</span>'}
];
const S2 = { k:0 };
const st2 = new Stage('cv1', 360, 300);

function draw2(){
  const g = st2.g; st2.clear();
  EP.heading(g, 20, 16, '电动机铭牌', '点按钮看每一项');
  /* 铭牌本体：金属底板 */
  box(g, 24, 36, 312, 200, 8, C.card, C.metalD, 1.8);
  box(g, 24, 36, 312, 30, 8, C.box, C.metalD, 1.2);
  txt(g, '三相异步电动机', 180, 51, {sz:11.5, b:1, c:C.tx});
  const sel = KEY[S2.k].rc;
  for(let ri = 0; ri < PLATE.length; ri++){
    for(let ci = 0; ci < 2; ci++){
      const x = 32 + ci*152, y = 76 + ri*26;
      const on = (sel[0] === ri && sel[1] === ci);
      if(on) box(g, x - 4, y - 11, 148, 23, 4, C.accbg, C.acc, 1.2);
      txt(g, PLATE[ri][ci][0], x, y, {sz:9.5, c: on ? C.acc : C.tx3, al:'left'});
      txt(g, PLATE[ri][ci][1], x + 140, y, {sz:10.5, b:1, c: on ? C.acc : C.tx, al:'right'});
    }
  }
  box(g, 20, 248, 320, 30, 6, C.box, C.boxLine, 1);
  txt(g, '选中：' + PLATE[sel[0]][sel[1]][0] + '　' + KEY[S2.k].v,
      180, 263, {sz:11, b:1, c:C.acc});
}
function note2(){
  const k = KEY[S2.k];
  $('s2a').textContent = k.v;
  $('s2b').textContent = k.dec;
  $('s2c').textContent = k.wrong;
  $('n1').innerHTML = '<div class="st">' + PLATE[k.rc[0]][k.rc[1]][0] + '　' + k.v + '</div>' + k.d;
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
   场景 3：星形 / 三角形
   ================================================================
   线电压 380 V。Y 接：相电压 = 380/√3 = 220 V，线电流 = 相电流。
   △ 接：相电压 = 380 V，线电流 = √3 × 相电流。
   同一台电机 △ 接的功率是 Y 接的 3 倍 —— 星三角降压启动就是拿这个 1/3 换来的。 */
const S3 = { d:false };
const st3 = new Stage('cv2', 360, 302);

/* 一段绕组：一条线，中间压一个小方块（IEC 的绕组画法之一） */
function wind(g, x1, y1, x2, y2, col){
  g.save(); g.strokeStyle = col || C.wire; g.lineWidth = 2.4; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); g.restore();
  const mx = (x1+x2)/2, my = (y1+y2)/2;
  g.save(); g.translate(mx, my); g.rotate(Math.atan2(y2-y1, x2-x1));
  box(g, -12, -6.5, 24, 13, 3, C.card, col || C.wire, 1.6);
  g.restore();
}

function draw3(){
  const g = st3.g; st3.clear();
  const d = S3.d;
  EP.heading(g, 20, 16, d ? '三角形接法 △' : '星形接法 Y', '电源线电压 380 V');

  /* ---- 上半：绕组等效图 ---- */
  if(!d){
    const NX = 180, NY = 96;
    wind(g, NX, NY, 104, 54, PH[0]);
    wind(g, NX, NY, 256, 54, PH[1]);
    wind(g, NX, NY, NX, 140, PH[2]);
    EC.node(g, NX, NY);
    txt(g, 'U1', 98, 46, {sz:9.5, b:1, c:PH[0], al:'right'});
    txt(g, 'V1', 262, 46, {sz:9.5, b:1, c:PH[1], al:'left'});
    txt(g, 'W1', NX + 10, 146, {sz:9.5, b:1, c:PH[2], al:'left'});
    txt(g, '三个尾端并成一点', NX + 12, NY + 2, {sz:9, c:C.tx3, al:'left'});
    txt(g, '（中性点）', NX + 12, NY + 14, {sz:9, c:C.tx3, al:'left'});
  } else {
    const A = [180, 46], B = [258, 140], Cc = [102, 140];
    wind(g, A[0], A[1], B[0], B[1], PH[0]);
    wind(g, B[0], B[1], Cc[0], Cc[1], PH[1]);
    wind(g, Cc[0], Cc[1], A[0], A[1], PH[2]);
    EC.node(g, A[0], A[1]); EC.node(g, B[0], B[1]); EC.node(g, Cc[0], Cc[1]);
    txt(g, 'U1 / W2', A[0], 36, {sz:9.5, b:1, c:C.tx2});
    txt(g, 'V1 / U2', B[0] + 8, B[1] + 4, {sz:9.5, b:1, c:C.tx2, al:'left'});
    txt(g, 'W1 / V2', Cc[0] - 8, B[1] + 4, {sz:9.5, b:1, c:C.tx2, al:'right'});
    txt(g, '首尾相接围成一圈', 180, 112, {sz:9, c:C.tx3});
  }

  /* ---- 下半：接线盒 ---- */
  box(g, 46, 162, 268, 96, 8, C.card, C.metalD, 1.6);
  txt(g, '接线盒', 56, 176, {sz:9.5, b:1, c:C.tx3, al:'left'});
  /* 「几块片怎么摆」并进标题行 —— 原来是个浮在右边的胶囊，正好压住第三根连接片（截图抓到的） */
  txt(g, '·　' + (d ? '三块片竖着' : '两块片横着'), 96, 176, {sz:9.5, b:1, c:C.cop, al:'left'});
  const TX = [110, 180, 250], TOP = 200, BOT = 240;
  /* 连接片 */
  g.save(); g.strokeStyle = C.cop; g.lineWidth = 7; g.lineCap = 'round';
  if(!d){
    g.beginPath(); g.moveTo(TX[0], TOP); g.lineTo(TX[1], TOP); g.stroke();
    g.beginPath(); g.moveTo(TX[1], TOP); g.lineTo(TX[2], TOP); g.stroke();
  } else {
    TX.forEach(function(x){
      g.beginPath(); g.moveTo(x, TOP); g.lineTo(x, BOT); g.stroke();
    });
  }
  g.restore();
  ['W2','U2','V2'].forEach(function(s, i){
    EP.terminal(g, TX[i], TOP, 6);
    txt(g, s, TX[i], TOP - 14, {sz:9.5, b:1, c:C.tx2});
  });
  ['U1','V1','W1'].forEach(function(s, i){
    EP.terminal(g, TX[i], BOT, 6);
    txt(g, s, TX[i] - 16, BOT, {sz:9.5, b:1, c:C.tx2, al:'right'});
  });
  /* 电源进线 */
  g.save(); g.lineWidth = 2.6; g.lineCap = 'round';
  TX.forEach(function(x, i){
    g.strokeStyle = PH[i];
    g.beginPath(); g.moveTo(x, BOT); g.lineTo(x, 274); g.stroke();
    txt(g, 'L' + (i+1), x, 286, {sz:9.5, b:1, c:PH[i]});
  });
  g.restore();
}
function note3(){
  const d = S3.d;
  $('s3a').textContent = d ? '380 V' : '220 V';
  $('s3b').textContent = d ? '√3 : 1' : '1 : 1';
  $('s3c').textContent = d ? '3 倍' : '1 倍';
  $('n2').innerHTML = d
    ? '<div class="st good">三角形 △：每相绕组直接承受线电压</div>' +
      '三块连接片<b>竖着</b>插，把 U1-W2、V1-U2、W1-V2 首尾相接围成一个三角形。<br>' +
      '<b>每相绕组承受 380 V</b>（就是线电压本身）。线电流 = √3 × 相电流。<br>' +
      '同一台电机，△ 接时的功率是 Y 接的 <b>3 倍</b>。<br>' +
      '<span class="sub">所以铭牌写「380 V △」的电机必须接成三角形 —— ' +
      '接成星形的话每相只有 220 V，转矩掉到 1/3。</span>'
    : '<div class="st">星形 Y：三个尾端并到一点</div>' +
      '两块连接片<b>横着</b>，把上排 W2、U2、V2 连成一串（这就是中性点）；' +
      '电源接下排 U1、V1、W1。<br>' +
      '<b>每相绕组只承受 220 V</b>（380 ÷ √3）。线电流 = 相电流。<br>' +
      '<span class="sub">Y 接常见于两种情况：① 铭牌本来就写「380 V Y」的中小功率电机；' +
      '② <b>星三角启动的头几秒</b> —— 先 Y 起步把电流和转矩都压到 1/3，' +
      '转起来再切成 △。</span>';
}
document.getElementById('s3k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S3.d = b.dataset.k === '1';
  document.querySelectorAll('#s3k .btn').forEach(function(t){
    t.classList.toggle('on', (t.dataset.k === '1') === S3.d);
  });
  note3(); draw3();
});

/* ================================================================
   场景 4：故障判断
   ================================================================
   三相绕组电阻取 2.8 Ω（7.5 kW 那个量级的粗略值，画面上只比「平不平衡」）。
   绝缘用对数刻度画：0.1 MΩ ~ 1000 MΩ 共 4 个数量级，0.5 MΩ 那条线是合格线。 */
const S4 = { k:0 };
const st4 = new Stage('cv3', 360, 300);
const F4 = [
  {t:'正常', R:[2.8, 2.8, 2.8], ins:200, ok:true,
   sym:'转得顺、声音均匀、外壳温热不烫手',
   fix:'三相电阻基本相等、绝缘兆欧级 —— 这台电机本身没问题',
   d:'三相绕组的匝数、线径、工艺都一样，所以<b>电阻应该基本相等</b>' +
     '（差别一般在 5% 以内）。绝缘在兆欧级。<br>' +
     '<span class="sub">绝对值记不住没关系 —— <b>判断靠的是「三相之间平不平衡」</b>，' +
     '不是某个具体的欧姆数。</span>'},
  {t:'一相断路（缺相）', R:[2.8, 2.8, -1], ins:200, ok:false,
   sym:'启动不了，只「嗡嗡」响；勉强转起来后严重发烫',
   fix:'先查电源侧：熔断器、接触器触点、端子、电缆。都好才拆电机',
   d:'有一相量出来是 <b>∞</b>（断了）。<br>' +
     '<b>但先别急着判电机坏。</b>「嗡嗡响转不动」八成是缺相，' +
     '而缺相的原因大多在<b>电源侧</b>：熔断器熔断一相、接触器有个触点没吸上、' +
     '端子松动、电缆断一芯。<br>' +
     '<span class="sub">正确顺序：<b>先量电机进线的三相电压</b>（几分钟），' +
     '三相都正常再拆电机（几小时）。缺相运行电机很快就烧，' +
     '所以热继电器和缺相保护是必须装的。</span>'},
  {t:'匝间短路', R:[2.8, 2.8, 1.9], ins:200, ok:false,
   sym:'能转但无力、发烫快、三相电流不平衡、有异味',
   fix:'绕组已经损坏，要重绕或换电机。别再通电',
   d:'有一相<b>明显偏小</b>（这里 1.9 Ω 对 2.8 Ω，少了三成）——' +
     '说明那一相里有一部分匝被短接了，等于少了几十匝。<br>' +
     '<b>这是最阴的一种故障</b>：绝缘可能还是好的、电机也还能转，' +
     '但那几匝里流着很大的环流，局部发热极快。<br>' +
     '<span class="sub">判断靠<b>三相对比</b>。只有一相可量时，' +
     '跟同型号的另一台比，或查厂家给的绕组电阻值。</span>'},
  {t:'受潮 / 绝缘损坏', R:[2.8, 2.8, 2.8], ins:0.2, ok:false,
   sym:'一通电就跳漏电保护，或外壳带电',
   fix:'先烘干再复测；烘干后仍不合格才考虑重绕',
   d:'三相电阻完全正常，<b>但对地绝缘掉到了 0.2 MΩ</b>。<br>' +
     '<b>绕组电阻正常只说明线没断、没匝间短路</b>，说明不了绝缘。' +
     '绝缘低意味着绕组和外壳之间快通了 —— 通电会跳漏保，严重的外壳带电伤人。<br>' +
     '<span class="sub">低压设备一般要求不低于 <b>0.5 MΩ</b>。' +
     '长期停用、放在潮湿环境里的电机最容易这样，' +
     '<b>烘干之后绝缘往往能恢复</b>，不一定要重绕。</span>'}
];

function draw4(){
  const g = st4.g; st4.clear();
  const d = F4[S4.k];
  EP.heading(g, 20, 16, d.t, '断电、拆掉连接片之后测');

  /* ---- 三相绕组电阻 ---- */
  const BX = 24, BY = 40, BW = 196, BH = 124;
  box(g, BX, BY, BW, BH, 5, C.box, C.boxLine, 1);
  txt(g, '三相绕组电阻', BX + BW/2, BY + 14, {sz:10, b:1, c:C.tx2});
  const base = BY + BH - 26, hmax = BH - 52;
  d.R.forEach(function(v, i){
    const x = BX + 30 + i*52;
    const inf = v < 0;
    const h = inf ? hmax : Math.min(hmax, v/4*hmax);
    const col = inf ? C.err : (Math.abs(v - d.R[0]) > 0.3 || Math.abs(v - d.R[1]) > 0.3 ? C.err : C.ok);
    box(g, x - 15, base - h, 30, h, 3, col, null, 0);
    txt(g, PHN[i], x, base + 12, {sz:10, b:1, c:PH[i]});
    /* 满格那根（∞）的读数要写**在柱子里**，写柱顶上会顶到框标题（截图抓到的） */
    if(inf) txt(g, '∞', x, base - h + 14, {sz:13, b:1, c:'#fff'});
    else    txt(g, v.toFixed(1), x, base - h - 9, {sz:10, b:1, c:col});
  });
  txt(g, '单位 Ω', BX + BW - 8, BY + 14, {sz:8.5, c:C.tx3, al:'right'});

  /* ---- 对地绝缘（对数刻度）---- */
  const GX = 232, GW = 104;
  box(g, GX, BY, GW, BH, 5, C.box, C.boxLine, 1);
  txt(g, '对地绝缘', GX + GW/2, BY + 14, {sz:10, b:1, c:C.tx2});
  const g0 = BY + BH - 20, g1 = BY + 26, gh = g0 - g1;
  const pos = function(v){ return g0 - Math.max(0, Math.min(1, (Math.log10(v)+1)/4))*gh; };
  box(g, GX + 30, g1, 18, gh, 3, C.okbg, null, 0);
  box(g, GX + 30, pos(0.5), 18, g0 - pos(0.5), 3, C.errbg, null, 0);
  g.save(); g.strokeStyle = C.warn; g.lineWidth = 1.4; g.setLineDash([4,3]);
  g.beginPath(); g.moveTo(GX + 22, pos(0.5)); g.lineTo(GX + 62, pos(0.5)); g.stroke(); g.restore();
  txt(g, '0.5', GX + 20, pos(0.5), {sz:8.5, c:C.warn, al:'right'});
  const ic = d.ins >= 0.5 ? C.ok : C.err;
  g.save(); g.fillStyle = ic;
  g.beginPath(); g.arc(GX + 39, pos(d.ins), 5, 0, Math.PI*2); g.fill(); g.restore();
  txt(g, (d.ins >= 100 ? '> 100' : d.ins.toFixed(1)) + ' MΩ', GX + 66, pos(d.ins),
      {sz:9.5, b:1, c:ic, al:'left'});
  txt(g, 'MΩ', GX + GW - 8, BY + 14, {sz:8.5, c:C.tx3, al:'right'});

  /* ---- 现象 / 怎么办 ---- */
  const oc = d.ok ? C.ok : C.err;
  box(g, 20, 176, 320, 44, 6, d.ok ? C.okbg : C.errbg, oc, 1);
  txt(g, '通电时的现象', 180, 190, {sz:9, c: d.ok ? C.ok : C.err});
  txt(g, d.sym, 180, 207, {sz:10.5, b:1, c:oc});
  box(g, 20, 228, 320, 44, 6, C.box, C.boxLine, 1);
  txt(g, '怎么办', 180, 242, {sz:9, c:C.tx3});
  txt(g, d.fix, 180, 259, {sz:10, b:1, c:C.tx2});
}
function note4(){
  const d = F4[S4.k];
  $('s4a').textContent = d.R[2] < 0 ? '一相 ∞' :
    (Math.abs(d.R[2] - d.R[0]) > 0.3 ? '一相偏小' : '平衡');
  $('s4b').textContent = d.ins >= 100 ? '> 100 MΩ' : d.ins.toFixed(1) + ' MΩ';
  $('s4c').textContent = d.ok ? '正常' : d.t;
  $('n3').innerHTML = '<div class="st' + (d.ok ? ' good' : ' bad') + '">' + d.t + '</div>' + d.d;
}
document.getElementById('s4k').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S4.k = +b.dataset.k;
  document.querySelectorAll('#s4k .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S4.k);
  });
  note4(); draw4();
});

/* ================================================================
   绑定
   ================================================================ */
function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会重设画布尺寸并清空内容。场景 1/3 在 rAF 循环里每帧重画，
     静态的那几屏必须在这儿补画一次 —— 否则第一次进来是**空白画布**
     （切页签也会再触发一次 fitAll，同样要补）。截图抓到的。 */
  draw2(); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:2, sec:'2.7'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('2.7');
  let h = '';
  h += nb.prev ? '<a href="'+nb.prev.f+'">‹ '+nb.prev.id+' '+nb.prev.t+'</a>'
               : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next ? '<a class="next" href="'+nb.next.f+'">'+nb.next.id+' '+nb.next.t+' ›</a>'
               : '<span>第 3 章还没做</span>';
  $('pager').innerHTML = h;
})();

loop(function(dt){
  if(cur === 0) draw1(dt);
});
  }
});
})();
