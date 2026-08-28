/* 2.3 继电器 —— 本节内容的唯一真相。
   book.html 按需载入它；c2-3.html 是薄壳，也载入它。
   对应《零基础学电工》第 2 章 2.3 节（书内 P25~P28）。 */
(function(){
'use strict';
ELEC.reg({
  id: '2.3',
  file: 'c2-3.html',
  title: '2.3 继电器',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>中间继电器</button>
    <button class="tab" data-i="1"><span class="n">2</span>热继电器</button>
    <button class="tab" data-i="2"><span class="n">3</span>时间继电器</button>
    <button class="tab" data-i="3"><span class="n">4</span>八种·怎么认</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">跟接触器同一个原理，干的却是另一件事</div>
    接触器管的是<b>电</b> —— 几千瓦的电动机从它身上过。
    继电器管的是<b>信号</b>：一个小信号进来，变成好几路互不干扰的输出出去。
    <b>点下面的按钮合一下 SB，看右边四组触点。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns">
        <button class="btn big" id="s1on">合上按钮 SB</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">线圈<br>（输入这一路）</div><div class="v" id="s1a">没电</div></div>
        <div class="num"><div class="k">现在接通的<br>输出路数</div><div class="v" id="s1b">1 路</div></div>
        <div class="num hi"><div class="k">每对触点<br>能过多大电流</div><div class="v">5 A 左右</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">跟接触器比，差在哪</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>接触器 KM</th><th>中间继电器 KA</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">接在哪</td><td>主电路（电动机那一路）</td><td>只在控制电路里</td></tr>
        <tr><td class="eu-s">触点能过</td><td>几安到几百安</td><td>一般 5 A 上下</td></tr>
        <tr><td class="eu-s">几对触点</td><td>3 主 + 少量辅助</td><td><b>好几对，动合动断都有</b></td></tr>
        <tr><td class="eu-s">有没有灭弧罩</td><td>有</td><td>没有</td></tr>
        <tr><td class="eu-s">个头</td><td>大</td><td>小，一排排插在底座上</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>说白了：中间继电器就是「触点特别多的小接触器」。</b>
      结构、动作过程跟上一节讲的一模一样 —— 线圈得电、吸住衔铁、带动触点、断电靠弹簧复位。
      你把 2.2 那一屏的机构缩小、把主触点换成一堆小触点，就是它。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">柜子里为什么要摆一排小继电器</div>
    「中间」这两个字是它的全部用意 —— 它站在信号的中间，替你做三件事：
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>它解决什么</th><th>具体是怎么回事</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">触点不够用</td><td>接触器身上就一两对辅助触点，不够接指示灯、报警、连锁。<b>拿一个继电器接过来，一下多出四对</b></td></tr>
        <tr><td class="eu-s">带不动</td><td>行程开关、PLC 输出这类信号很弱，直接去拉接触器线圈可能拉不动，<b>中间垫一个继电器</b>就够了</td></tr>
        <tr><td class="eu-s">要隔开</td><td>PLC 那边是 24V 弱电，接触器线圈是 220V。<b>两边不能碰在一起</b>，继电器的线圈和触点本来就是绝缘分开的</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>触点编号是有规矩的，认了它接线不会错。</b>
      两位数：<b>个位</b>说触点类型（1-2 是动断、3-4 是动合），<b>十位</b>说这是第几组。
      所以 <b>13-14</b> 是第 1 组动合、<b>31-32</b> 是第 3 组动断。
      <span class="sub">这套编号在接触器的辅助触点上也一样用（上一节的 KM-1 在实物上就标着 13-14）。</span>
    </div>
  </div>

  <div class="bet" data-bet="c23-ka" data-q="一个中间继电器，线圈还没通电。它身上标着 31-32 的那对触点，现在是通的还是断的？"
       data-opts="通的|断的|说不准，要看型号" data-right="0"
       data-after="通的。个位是 1-2 的都是动断（常闭）触点，线圈没电时它闭合着。这套编号是通用的，不用查型号——这就是它存在的意义。"></div>
</section>

<!-- ================= 场景 2：热继电器 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">这一屏是第 2 章里最该记住的东西</div>
    热继电器 FR 管的是<b>过载</b> —— 电动机长时间拉不动、多带了料、轴承卡涩，
    电流比额定大一点点，几分钟几十分钟地烧下去。
    <b>拖下面的滑杆把电流往大里调，盯住那块双金属片。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="rowlab">负载电流　<b id="s2ilab">1.0 倍额定</b>　（整定值 In 假设是 10 A）</div>
      <input type="range" id="s2i" min="4" max="80" step="1" value="10">
      <div class="ticks"><span>0.4 倍</span><span>8 倍（起动电流量级）</span></div>
      <div class="btns">
        <button class="btn" id="s2nm">调回额定</button>
        <button class="btn" id="s2ov">调到 1.5 倍</button>
        <button class="btn sm" id="s2rs">⟳ 复位</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">电流<br>是额定的几倍</div><div class="v" id="s2a">1.0 倍</div></div>
        <div class="num"><div class="k">双金属片<br>热到什么程度</div><div class="v" id="s2b">0%</div></div>
        <div class="num hi"><div class="k">按这个电流<br>多久会动作</div><div class="v" id="s2c">不动作</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">它是怎么知道「过载」的：靠热，不靠电</div>
    主电路的电流穿过<b>热元件</b>（一段电阻丝），热元件绕在<b>双金属片</b>上。
    两种膨胀系数不同的金属压在一起，一受热就往膨胀小的那一边弯 ——
    弯到一定程度，顶开一个<b>动断触点</b>。
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>这一段</th><th>接在哪</th><th>作用</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">热元件</td><td><b>串</b>在主电路里（跟电动机同一路）</td><td>发热，让双金属片弯</td></tr>
        <tr><td class="eu-s">动断触点 95-96</td><td><b>串</b>在控制电路里（接触器线圈那一路）</td><td>一断，接触器失电，主触点跟着断</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>关键：热继电器自己不切断主电路。</b>它只是一个「发信号的」——
      把接触器的线圈回路掐断，让<b>接触器</b>去断主电路。
      所以图纸上你会看到 FR 在两个地方出现：主电路里三个热元件、控制电路里一个动断触点。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st bad">热继电器不能作短路保护 —— 这条年年考，现场也年年出事</div>
    它天生有<b>热惯性</b>：金属得先热起来才会弯。这个「慢」不是缺点，是设计出来的 ——
    电动机起动时电流本来就有额定的 <b>5~7 倍</b>，持续几秒，
    热继电器要是反应快，每次起动都得跳一次，机器根本没法用。
    <div class="tip" style="margin-top:8px">
      <b>可短路要的是毫秒。</b>短路电流是额定的几十倍，导线绝缘几十毫秒就冒烟了，
      而双金属片这时候才刚开始热。<br>
      <b>更要命的第二条：它的触点根本断不了短路电流。</b>
      95-96 是一对控制回路的小触点，几安培的活儿；主电路那几百安还得靠接触器断，
      而接触器同样断不了短路电流。<br>
      <b>所以短路保护只能靠熔断器 FU 或断路器 QF。</b>
      现场标准配置是：<span class="rd">熔断器管短路</span> ＋
      <span class="key">热继电器管过载</span>，两个都得有，谁也替不了谁。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">上手要会的三件事</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>怎么做</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">整定</td><td>面板上有一个刻度旋钮，<b>调到电动机铭牌上的额定电流</b>（一般 0.95~1.05 倍）。调大了保护不住，调小了动不动就跳</td></tr>
        <tr><td class="eu-s">复位</td><td>动作之后<b>不会自己恢复</b>。要等双金属片<b>凉下来</b>（一两分钟）再按复位钮。凉之前按也按不动</td></tr>
        <tr><td class="eu-s">查原因</td><td>它跳了说明<b>真的过载了</b>。别一按复位就重合 —— 先查：带的料是不是太多、轴承是不是卡了、是不是<b>缺了一相</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>缺相是最常见的一种「过载」。</b>三相少了一相，剩下两相的电流会涨到 1.7 倍以上，
      电动机嗡嗡响、转不动、几分钟就烧。带<b>断相保护</b>（差动机构）的热继电器对这种情况更灵敏，
      普通两相式的就差一些 —— 买件时看清楚是不是三相带断相保护的型号。
    </div>
  </div>

  <div class="bet" data-bet="c23-fr" data-q="电动机刚起动那两三秒，电流是额定的 6 倍左右。热继电器为什么不跳？"
       data-opts="因为它只认电压不认电流|因为双金属片还没热起来，时间太短|因为起动时它被短接了" data-right="1"
       data-after="因为它慢。双金属片要先积累热量才会弯，6 倍电流持续几秒还不够。这个「慢」是故意留的——反时限特性：电流越大动作越快，但再快也快不过熔断器。所以它管过载，短路交给熔断器。"></div>
</section>

<!-- ================= 场景 3：时间继电器 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">让触点「过一会儿」再动</div>
    很多控制要按顺序来：先合这个、隔 5 秒再合那个（星三角起动就是）。
    时间继电器 KT 干的就是这件事。
    <b>先选一种类型，再给线圈通电，看那两列触点谁先动。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3m">
        <button class="btn on" data-k="0">通电延时型</button>
        <button class="btn" data-k="1">断电延时型</button>
      </div>
      <div class="btns">
        <button class="btn big" id="s3on">给线圈 KT 通电</button>
      </div>
      <div class="rowlab">延时设定　<b id="s3slab">5.0 s</b>　（实物上就是拧那颗调节螺钉）</div>
      <input type="range" id="s3s" min="10" max="150" step="5" value="50">
      <div class="ticks"><span>1 s</span><span>15 s</span></div>
      <div class="nums three">
        <div class="num"><div class="k">线圈 KT</div><div class="v" id="s3a">没电</div></div>
        <div class="num"><div class="k">延时触点</div><div class="v" id="s3b">断</div></div>
        <div class="num hi"><div class="k">瞬动触点</div><div class="v" id="s3c">断</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">两种类型，先分清哪一头在计时</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>通电延时型</th><th>断电延时型</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">线圈得电</td><td><b>开始计时</b>，到点触点才动</td><td>触点<b>立即</b>动作</td></tr>
        <tr><td class="eu-s">线圈失电</td><td>触点<b>立即</b>复位</td><td><b>开始计时</b>，到点才复位</td></tr>
        <tr><td class="eu-s">常见用途</td><td>星三角起动（Y 接几秒后转成 △）</td><td>停机后风扇再吹一会儿</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>一句话记法：延时永远发生在「跟线圈动作反着」的那一头。</b>
      通电延时型 —— 通电慢、断电快；断电延时型 —— 通电快、断电慢。
      <span class="sub">另外注意<b>瞬动触点</b>：它跟线圈同步，不延时。同一个 KT 上两种触点都有，
      图纸上要分清楚哪一个是延时的。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">延时是怎么做出来的：四种原理</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>类型</th><th>靠什么拖时间</th><th>特点</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">空气阻尼式</td><td><b>空气从一个小孔慢慢挤进气囊</b>，拧螺钉改孔的大小</td><td>便宜、结构简单、精度不高，最常见</td></tr>
        <tr><td class="eu-s">电磁式</td><td>铁芯上套一个短路铜套，磁通变化被拖慢</td><td>只能做<b>断电延时</b>，时间短</td></tr>
        <tr><td class="eu-s">电动式</td><td>一个小同步电动机带齿轮走</td><td>时间长、准，贵</td></tr>
        <tr><td class="eu-s">电子式</td><td>RC 充放电 / 数字计时</td><td>现在最常用，延时范围大、可数字设定</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>别把「按什么原理延时」和「按什么方式延时」搞混</b>，这是考试常设的一个坑：<br>
      按<b>原理</b>分 → 空气阻尼式 / 电磁式 / 电动式 / 电子式；<br>
      按<b>延时方式</b>分 → 通电延时型 / 断电延时型。<br>
      没有「电压式、电流式」这种分法 —— 那是电流继电器和电压继电器的分法。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">符号：延时触点上多一把「伞」</div>
    延时触点的画法，是在触点臂上加一段圆弧，看着像<b>降落伞</b>。
    <b>伞兜风的那一面（凹面），朝的就是被拖慢的那个方向</b> ——
    触点往伞口里动，被空气兜住，慢；往伞背方向动，没阻力，快。
    <div class="tip" style="margin-top:8px">
      <b>说实话：这几个符号的圆弧朝向，不同版本的图纸和教材画法有出入，
      光靠背朝向不保险。</b>现场认图最稳的是三步：<br>
      ① 先看<b>线圈</b>符号 —— 通电延时型和断电延时型的线圈画法就不一样；<br>
      ② 再看触点是<b>动合还是动断</b>（动断触点臂上有那一小横杠，上一节讲过）；<br>
      ③ 看触点旁边<b>标着的延时值</b>（比如「5s」），没标的多半是瞬动触点。<br>
      <span class="sub">四种延时触点的全称，读的时候按「什么时候动 + 动成什么样 + 是动合还是动断」拆：
      「通电延时闭合的动合触点」＝ 线圈通电后过一会儿闭合、平常是断的。</span>
    </div>
  </div>

  <div class="bet" data-bet="c23-kt" data-q="一个通电延时型 KT，设定 5 秒。线圈通电 2 秒后就把电断了，延时触点动过没有？"
       data-opts="动了，因为已经开始计时|没动，而且计时清零重来" data-right="1"
       data-after="没动，而且清零。通电延时型只要中途失电，计时就归零，下次得从头数。所以控制回路里 KT 的线圈那一路一断，前面数的都白数——这一点在排故时很关键：延时老是不到点，先查线圈那一路是不是在抖。"></div>
</section>

<!-- ================= 场景 4：八种继电器 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">同一个套路，换八种「什么时候该动」</div>
    继电器都是「一个条件满足了，就让触点动一下」。
    差别只在<b>那个条件是什么</b> —— 电流大了？电压低了？转速到了？温度高了？
    <b>挨个点一遍下面的按钮。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="btns" id="s4p">
        <button class="btn on" data-k="0">中间</button>
        <button class="btn" data-k="1">时间</button>
        <button class="btn" data-k="2">热</button>
        <button class="btn" data-k="3">电流</button>
      </div>
      <div class="btns" id="s4p2">
        <button class="btn" data-k="4">电压</button>
        <button class="btn" data-k="5">速度</button>
        <button class="btn" data-k="6">压力</button>
        <button class="btn" data-k="7">温度</button>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">文字符号，先背这几个</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>符号</th><th>是什么</th><th>怎么记</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">KM</td><td>接触器</td><td>M = Main</td></tr>
        <tr><td class="eu-s">KA</td><td>中间继电器 / 电流继电器</td><td>A = Auxiliary</td></tr>
        <tr><td class="eu-s">KT</td><td>时间继电器</td><td>T = Time</td></tr>
        <tr><td class="eu-s">FR</td><td>热继电器</td><td>F 是保护类</td></tr>
        <tr><td class="eu-s">KV</td><td>电压继电器</td><td>V = Voltage</td></tr>
        <tr><td class="eu-s">KS</td><td>速度继电器</td><td>S = Speed</td></tr>
        <tr><td class="eu-s">KP</td><td>压力继电器</td><td>P = Pressure</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>KM 和 KT 这两个最容易对调，考试专挑这一对。</b>
      接触器是 KM 不是 KT，时间继电器是 KT 不是 KM。
      记法：<b>接触器管电动机（Motor），时间继电器管时间（Time）</b>。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">电流继电器和电压继电器，看线圈就分得出</div>
    这两个长得像，但线圈完全是两回事 —— 而且<b>看一眼就能分</b>：
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>电流继电器</th><th>电压继电器 KV</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">线圈怎么接</td><td><b>串</b>在被测那一路里</td><td><b>并</b>在被测两点之间</td></tr>
        <tr><td class="eu-s">线圈长相</td><td><b>匝数少、导线粗</b></td><td><b>匝数多、导线细</b></td></tr>
        <tr><td class="eu-s">为什么</td><td>要过全部电流，线细了会烧</td><td>要承受全电压又不能分流，得靠匝多阻大</td></tr>
        <tr><td class="eu-s">管什么</td><td>过电流保护、欠电流保护</td><td>过电压、欠电压、失压保护</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>这条规律不止用在继电器上。</b>电流表、电流互感器一律<b>串</b>，线粗匝少；
      电压表、电压互感器一律<b>并</b>，线细匝多。第 3 章量电流电压时还会再用一次。
    </div>
  </div>

  <div class="quiz" data-quiz="c2-3">
    <div class="qz" data-q="电动机发生短路，能不能靠热继电器保护？"
         data-opts="能，它就是管过电流的|不能，短路保护要靠熔断器或断路器|能，但要把整定值调小"
         data-right="1"
         data-why="不能。两个原因：一是它靠双金属片受热变形，有热惯性，短路要求的是毫秒级；二是它自己只有一对控制回路的小触点，根本断不了短路电流。热继电器管过载，短路必须由熔断器 FU 或断路器 QF 管。"></div>
    <div class="qz" data-q="热继电器的动断触点 95-96，应该接在哪里？"
         data-opts="串在电动机主电路里|串在接触器线圈那一路（控制电路）里|并在电动机两端"
         data-right="1"
         data-why="串在控制电路里。热继电器接在主电路的是三个热元件（发热丝），触点则串在接触器线圈回路中——它一断，接触器失电，由接触器去切断主电路。它自己不断主电路。"></div>
    <div class="qz" data-q="一个通电延时型时间继电器，线圈刚一得电，它的瞬动触点什么时候动作？"
         data-opts="立即动作|等延时到了才动作|不动作"
         data-right="0"
         data-why="立即。瞬动触点跟线圈同步，不参与延时；只有延时触点才等到点。同一个 KT 身上两种触点都有，认图时要分清哪一副画着「伞」。"></div>
    <div class="qz" data-q="拆开两个继电器，一个线圈匝数少、导线很粗，另一个匝数多、导线很细。分别是什么？"
         data-opts="粗的是电压继电器，细的是电流继电器|粗的是电流继电器，细的是电压继电器|都是中间继电器，只是型号不同"
         data-right="1"
         data-why="粗的是电流继电器（串在被测回路里，要过全部电流，线细会烧），细的是电压继电器（并在两点之间，要承受全电压又不能分流，靠匝多阻大）。电流表串、电压表并，是同一条规律。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 2 章 2.3 节（书内 P25~P28）<br>下一节讲传感器：让机器「看见」温度、光、位置</div>
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

/* ================= 共用的两个触点画法 ================= */
/* 竖着的动合触点（上下两根引线之间），c2-2 场景 1 那个画法 */
function vContact(g, x, yT, yB, closed){
  g.save(); g.lineCap = 'round';
  g.translate(x, yT); g.rotate(closed ? 0 : -0.55);
  g.strokeStyle = EP.P.copperD; g.lineWidth = 4.6;
  g.beginPath(); g.moveTo(0,0); g.lineTo(0, yB-yT); g.stroke();
  g.strokeStyle = EP.P.copper; g.lineWidth = 2.8;
  g.beginPath(); g.moveTo(0,0); g.lineTo(0, yB-yT); g.stroke();
  g.restore();
  EP.terminal(g, x, yT, 4);
  EP.terminal(g, x, yB, 4);
}
/* 横着的触点：closed 决定合不合，nc 决定要不要画动断那一小横杠 */
function hContact(g, x, y, closed, nc, o){
  o = o || {};
  const w = o.w || 36;
  g.save(); g.strokeStyle = C.wire; g.lineWidth = 2; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x-w/2-8, y); g.lineTo(x-w/2, y); g.stroke();
  g.beginPath(); g.moveTo(x+w/2, y); g.lineTo(x+w/2+8, y); g.stroke();
  g.restore();
  g.save(); g.lineCap = 'round';
  g.translate(x-w/2, y); g.rotate(closed ? 0 : -0.45);
  g.strokeStyle = closed ? C.ok : C.tx3; g.lineWidth = 2.8;
  g.beginPath(); g.moveTo(0,0); g.lineTo(w,0); g.stroke();
  /* 动断的那一小横杠：画在**臂上**跟着一起动，画在静触点上会被接线柱盖掉 */
  if(nc){
    g.strokeStyle = '#b7c1cc'; g.lineWidth = 1.8;
    g.beginPath(); g.moveTo(w, -7); g.lineTo(w, 7); g.stroke();
  }
  g.restore();
  EP.terminal(g, x-w/2, y, 3.6);
  EP.terminal(g, x+w/2, y, 3.6);
}

/* ================================================================
   场景 1：中间继电器 —— 一个信号进来，四路输出出去
   ================================================================ */
const S1 = { on:false, k:0, ph:0 };
const st1 = new Stage('cv0', 360, 258);
/* 触点编号的规矩：个位 1-2 是动断、3-4 是动合；十位是第几组 */
const ROWS = [
  {y: 62, nc:false, n:'13-14 动合', d:'指示灯'},
  {y:104, nc:false, n:'23-24 动合', d:'接触器'},
  {y:146, nc:true,  n:'31-32 动断', d:'报警'},
  {y:188, nc:false, n:'43-44 动合', d:'PLC'}
];
const LINKX = 204;

function draw1(dt){
  const g = st1.g; st1.clear();
  EP.heading(g, 20, 14, '中间继电器 KA', '一个信号进来，几路输出出去');

  const tk = S1.on ? 1 : 0;
  S1.k += (tk - S1.k) * Math.min(1, dt*16);
  const k = S1.k, on = k > 0.5;
  if(on) S1.ph += dt*56;

  /* ---- 输入这一路：＋24V → 按钮 SB → 线圈 KA → 0V ---- */
  const cx = 58;
  g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.2; g.lineCap = 'round';
  g.beginPath(); g.moveTo(cx, 52); g.lineTo(cx, 70); g.stroke();
  g.beginPath(); g.moveTo(cx, 96); g.lineTo(cx, 110); g.stroke();
  g.beginPath(); g.moveTo(cx, 140); g.lineTo(cx, 196); g.stroke();
  g.restore();
  txt(g, '＋24V', cx, 42, {sz:9, c:C.tx3});
  txt(g, '0V', cx, 206, {sz:9, c:C.tx3});
  vContact(g, cx, 70, 96, S1.on);
  txt(g, '按钮 SB', cx + 15, 83, {sz:9.5, c:C.tx3, al:'left'});
  /* 线圈 */
  box(g, 38, 110, 40, 30, 3, on ? C.accbg : C.box, on ? C.acc : C.boxLine, on ? 2 : 1.4);
  txt(g, 'KA', cx, 125, {sz:12, b:1, c: on ? C.acc : C.tx2});
  tag(g, on ? '线圈得电' : '线圈没电', cx, 162,
      {sz:9.5, b:1, c: on ? C.acc : C.tx3});
  if(on) EP.flow(g, new Path([[cx,52],[cx,196]]), {phase:S1.ph, gap:38});

  /* ---- 机械联动虚线：衔铁一动，它名下的触点全动 ---- */
  g.save();
  g.setLineDash([5,4]); g.strokeStyle = on ? C.acc : C.tx3; g.lineWidth = 1.4;
  g.beginPath(); g.moveTo(78, 125); g.lineTo(LINKX, 125); g.stroke();
  g.beginPath(); g.moveTo(LINKX, 52); g.lineTo(LINKX, 198); g.stroke();
  g.restore();

  /* ---- 输出：四组触点，各去各的地方 ---- */
  let live = 0;
  ROWS.forEach(function(r){
    const closed = r.nc ? (k < 0.5) : (k > 0.5);
    if(closed) live++;
    hContact(g, 252, r.y, closed, r.nc);
    g.save(); g.strokeStyle = C.wire; g.lineWidth = 2; g.lineCap='round';
    g.beginPath(); g.moveTo(278, r.y); g.lineTo(286, r.y); g.stroke();
    g.restore();
    EP.chip(g, r.d, 290, r.y, {sz:10, al:'left'});
    txt(g, r.n + ' · ' + (closed ? '通' : '断'), 252, r.y + 15,
        {sz:8.5, c: closed ? C.ok : C.tx3});
  });

  /* ---- 结论条 ---- */
  box(g, 20, 216, 320, 30, 6, on ? C.accbg : C.box, on ? C.acc : C.boxLine, 1.2);
  txt(g, on ? '一个信号进来，' + live + ' 路输出接通、' + (4-live) + ' 路断开'
            : '线圈没电时：动合的断着，动断的通着',
      180, 231, {sz:10.5, b:1, c: on ? C.acc : C.tx2});
  return live;
}

function note1(){
  const on = S1.on;
  const live = on ? 3 : 1;
  $('s1on').textContent = on ? '断开按钮 SB' : '合上按钮 SB';
  $('s1a').textContent = on ? '得电' : '没电';
  $('s1b').textContent = live + ' 路';
  $('n0').innerHTML = on
    ? '<div class="st good">一个信号，变成四路各走各的</div>'+
      '线圈得电，衔铁吸合，<b>四组触点被同一块衔铁同时带动</b>：'+
      '三组动合的合上、一组动断的（31-32）断开，现在通着的是 '+live+' 路。<br>'+
      '注意这四路<b>互相之间没有电气联系</b> —— 一路去 220V 的指示灯、'+
      '一路去接触器线圈、一路去 24V 的 PLC 输入都行，'+
      '它们只共用「同一块衔铁」这个机械关系。<b>这就是继电器最值钱的地方。</b>'
    : '<div class="st">线圈没电时的样子</div>'+
      '三组动合触点断着，一组动断触点（31-32）通着 —— '+
      '所以现在接通的只有 <b>1 路：报警那一路</b>。<br>'+
      '「常开 / 常闭」说的就是这个状态，上一节讲过：'+
      '<b>「常」＝ 线圈没得电的时候</b>。<br>'+
      '<span class="sub">点上面的按钮，看四组触点是不是一起动。</span>';
}
$('s1on').addEventListener('click', function(){ S1.on = !S1.on; note1(); });

/* ================================================================
   场景 2：热继电器 —— 双金属片受热弯曲
   ================================================================
   热模型（简化的一阶热积累，量级对得上 GB 的几个检查点）：
     dθ/dt = (x² − θ) / τ      x = 实际电流 / 整定电流，θ 是热量（标幺）
     θ ≥ TRIP 时动作
   τ = 120 s、TRIP = 1.15² 是按这几个已知检查点凑的，算出来：
     1.05 倍 → 永不动作（GB 要求 1.05 倍 2 小时不动作）✓
     1.2 倍  → 约 5 分钟（GB 要求 2 小时内动作）✓
     1.5 倍  → 约 1.8 分钟（GB 要求 2 分钟内）✓
     7.2 倍  → 约 3 秒（10A 级要求 2~10 秒）✓
   **这是示意模型，不是某个具体型号的实测曲线**，文案里也是这么说的。 */
const TAU_TH = 120, TRIP = 1.15*1.15, DEMO = 30;   /* 演示比真实快 30 倍 */
const S2 = { x:1.0, th:0, tripped:false, mt:0, msg:'', ph:0, lastHp:-1 };
const st2 = new Stage('cv1', 360, 352);

/* 按这个电流倍数算「多久会动作」，算不出来（永不动作）返回 null */
function tripTime(x){
  const x2 = x*x;
  if(x2 <= TRIP + 1e-9) return null;
  return TAU_TH * Math.log(x2 / (x2 - TRIP));
}
function fmtT(s){
  if(s == null) return '不动作';
  if(s < 60) return '约 ' + (s < 10 ? s.toFixed(1) : Math.round(s)) + ' 秒';
  const m = s/60;
  return '约 ' + (m < 10 ? m.toFixed(1) : Math.round(m)) + ' 分钟';
}

function draw2(dt){
  const g = st2.g; st2.clear();
  EP.heading(g, 20, 14, '热继电器 FR', '受热弯曲，去顶开一个动断触点');

  /* ---- 热量积累。动作之后主电路已经被接触器断开，所以按 x=0 冷却 ---- */
  const xEff = S2.tripped ? 0 : S2.x;
  S2.th += ((xEff*xEff) - S2.th) / TAU_TH * dt * DEMO;
  if(S2.th < 0) S2.th = 0;
  if(!S2.tripped && S2.th >= TRIP){ S2.tripped = true; S2.th = TRIP; S2.msg = ''; note2(); }
  if(S2.tripped) S2.mt += dt;
  const heat = Math.min(1, S2.th / TRIP);
  const hp = Math.round(heat*100);
  if(hp !== S2.lastHp){ S2.lastHp = hp; $('s2b').textContent = hp + '%'; }
  const live = !S2.tripped;
  if(live) S2.ph = (S2.ph || 0) + dt * (30 + S2.x*26);

  /* ---- 左：主电路穿过三个热元件 ---- */
  const PX = [44, 70, 96], PC = ['#e8d34a', '#4fc04a', '#ff5f52'];
  PX.forEach(function(x, i){
    g.save(); g.lineCap = 'round';
    g.strokeStyle = live ? PC[i] : C.tx3; g.lineWidth = 2.6;
    g.beginPath(); g.moveTo(x, 48); g.lineTo(x, 112); g.stroke();
    g.beginPath(); g.moveTo(x, 172); g.lineTo(x, 236); g.stroke();
    g.restore();
    txt(g, 'L' + (i+1), x, 38, {sz:9, c:C.tx3});
    /* 热元件：一段绕成锯齿的电阻丝，热起来变红 */
    const hc = heat < 0.3 ? EP.P.copper
             : heat < 0.75 ? '#e08a3a' : C.hot;
    g.save(); g.strokeStyle = live ? hc : EP.P.copperD;
    g.lineWidth = 2.4; g.lineJoin = 'round'; g.lineCap = 'round';
    g.beginPath();
    for(let j=0;j<=10;j++){
      const yy = 112 + (172-112)*j/10;
      const xx = x + ((j%2) ? 6 : -6) * (j===0 || j===10 ? 0 : 1);
      j ? g.lineTo(xx, yy) : g.moveTo(xx, yy);
    }
    g.stroke(); g.restore();
    if(live) EP.flow(g, new Path([[x,48],[x,236]]),
                     {phase:S2.ph, gap:46, kind:'cur', size:4.6, skip:[[64,124]]});
  });
  /* FR 虚线框 */
  g.save(); g.setLineDash([4,3]); g.strokeStyle = C.tx3; g.lineWidth = 1.2;
  g.strokeRect(28, 106, 84, 72); g.restore();
  txt(g, 'FR 热元件', 116, 142, {sz:9.5, c:C.tx3, al:'left'});
  EP.chip(g, live ? '去电动机' : '已断电', 70, 250,
          {sz:9.5, c: live ? EP.P.ink : C.err});

  /* ---- 右：双金属片 + 动断触点 ---- */
  box(g, 196, 246, 140, 16, 3, EP.P.bakelite, EP.P.bakeliteL, 1.2);
  const bend = 30 * heat;
  const bx = 222, by0 = 246, by1 = 150;
  /* 两层金属：一层膨胀大、一层膨胀小，压在一起就往膨胀小的那边弯 */
  [[-2.4, EP.P.steel], [2.4, EP.P.copper]].forEach(function(a){
    g.save(); g.strokeStyle = a[1]; g.lineWidth = 3.2;
    g.lineJoin = 'round'; g.lineCap = 'round';
    g.beginPath();
    for(let i=0;i<=16;i++){
      const t = i/16;
      const yy = by0 + (by1-by0)*t;
      const xx = bx + bend*t*t + a[0];
      i ? g.lineTo(xx, yy) : g.moveTo(xx, yy);
    }
    g.stroke(); g.restore();
  });
  const tipx = bx + bend;
  /* 顶端的导板 */
  box(g, tipx-8, by1-10, 18, 9, 2, EP.P.steelD, EP.P.steelDD, 1);
  EP.callout(g, bx + bend*0.25, 210, 190, 206, '双金属片', '两种金属', {al:'right'});
  /* 机械联动：导板顶到触点 */
  g.save(); g.setLineDash([4,3]);
  g.strokeStyle = S2.tripped ? C.err : C.tx3; g.lineWidth = 1.3;
  g.beginPath(); g.moveTo(tipx + 10, by1-6); g.lineTo(290, by1-6); g.stroke();
  g.beginPath(); g.moveTo(290, by1-6); g.lineTo(290, 112); g.stroke();
  g.restore();
  /* 动断触点 95-96 */
  hContact(g, 290, 100, !S2.tripped, true, {w:40});
  txt(g, '95-96 动断触点', 290, 78, {sz:9.5, c: S2.tripped ? C.err : C.tx2});
  EP.chip(g, '→ 接触器线圈', 290, 60, {sz:9.5});
  /* 复位钮 */
  g.save();
  g.fillStyle = S2.tripped ? C.err : EP.P.steelD;
  g.beginPath(); g.arc(318, 254, 7, 0, EC.TAU); g.fill();
  g.strokeStyle = EP.P.steelDD; g.lineWidth = 1.2; g.stroke();
  g.restore();
  txt(g, '复位', 318, 236, {sz:8.5, c:C.tx3});

  /* ---- 底：热量积累条 ---- */
  txt(g, '双金属片积累的热量', 24, 278, {sz:9, c:C.tx3, al:'left'});
  txt(g, Math.round(heat*100) + '%', 336, 278, {sz:9.5, b:1, al:'right',
      c: heat < 0.8 ? C.ok : heat < 0.95 ? C.warn : C.err});
  box(g, 24, 288, 312, 18, 5, C.box, C.boxLine, 1);
  if(heat > 0.01){
    const bc = heat < 0.8 ? C.ok : heat < 0.95 ? C.warn : C.err;
    box(g, 26, 290, Math.max(3, 308*heat), 14, 4, bc, null, 0);
  }
  /* 动作线 */
  g.save(); g.strokeStyle = C.err; g.lineWidth = 1.4; g.setLineDash([3,3]);
  g.beginPath(); g.moveTo(332, 286); g.lineTo(332, 308); g.stroke(); g.restore();

  const st = S2.tripped
      ? 'FR 已动作 —— 接触器失电，电动机停了'
      : (S2.x*S2.x <= TRIP ? '这个电流长期烧下去也不会动作'
                           : '正在积累热量，' + fmtT(tripTime(S2.x)) + '后动作');
  txt(g, st, 180, 326, {sz:10.5, b:1,
      c: S2.tripped ? C.err : (S2.x*S2.x <= TRIP ? C.ok : C.warn)});
  txt(g, '演示速度约为真实的 ' + DEMO + ' 倍；模型是示意用的，具体动作时间以产品说明书为准',
      180, 343, {sz:8.5, c:C.tx3});
}

function note2(){
  const x = S2.x, tt = tripTime(x);
  $('s2ilab').textContent = x.toFixed(1) + ' 倍额定（' + (x*10).toFixed(0) + ' A）';
  $('s2a').textContent = x.toFixed(1) + ' 倍';
  $('s2b').textContent = Math.round(Math.min(1, S2.th/TRIP)*100) + '%';
  $('s2c').textContent = fmtT(tt);
  const t20 = tripTime(20);
  if(S2.tripped){
    $('n1').innerHTML = '<div class="st bad">动作了 —— 但它自己没断主电路</div>'+
      '双金属片弯到位，把 <b>95-96 动断触点顶开</b>了。'+
      '这对触点串在接触器线圈那一路里，一断 → 接触器失电 → '+
      '<b>接触器的主触点断开</b> → 电动机停。<br>'+
      '<b>热继电器从头到尾没碰主电路，它只是个发信号的。</b><br>'+
      (S2.msg ? '<div class="tip" style="margin-top:8px">'+S2.msg+'</div>' : '')+
      '<span class="sub">现在它不会自己恢复。等双金属片凉下来（图上那根条掉到一半以下）'+
      '再按「复位」—— 没凉透的话按也按不动，这是实物上真实的行为。</span>';
    return;
  }
  if(tt == null){
    $('n1').innerHTML = '<div class="st good">'+x.toFixed(1)+' 倍：长期烧下去也不动作</div>'+
      '电流没超过它的动作门槛，双金属片热到一个平衡温度就不再往上走了 —— '+
      '图上那根条会停在半路。<br>'+
      '<b>这是故意留的余量。</b>电网电压有波动、负载有轻重，'+
      '要是 1.02 倍就跳，机器一天得停八回。国标要求 <b>1.05 倍两小时内不许动作</b>。<br>'+
      '<span class="sub">往右拖滑杆，越过 1.2 倍试试。</span>';
    return;
  }
  const fast = x >= 4;
  $('n1').innerHTML = '<div class="st '+(fast?'warn':'')+'">'+x.toFixed(1)+' 倍：'+fmtT(tt)+'后动作</div>'+
    '<b>电流越大，动作越快</b> —— 这叫<b>反时限</b>。'+
    '因为发热量按电流的平方涨（1.3 节的焦耳定律：Q ∝ I²Rt），'+
    '电流翻一倍热量就是四倍。<br>'+
    (fast
      ? '你现在拖到的 '+x.toFixed(1)+' 倍，正是<b>电动机起动电流</b>的量级（额定的 5~7 倍，持续几秒）。'+
        '算出来要 '+fmtT(tt)+'才动作 —— <b>正好躲过了起动那几秒</b>，这个「慢」是设计出来的。'
      : '这一档是典型的<b>过载</b>：多带了料、轴承卡涩、缺了一相。'+
        '机器还在转，看着好像没事，绕组温度却在往上爬 —— 热继电器管的就是这一段。')+
    '<br><b>再往下看短路：</b>短路电流是额定的几十倍，按同一个模型算，'+
    '20 倍时也要 <b>'+fmtT(t20)+'</b>才动作。'+
    '可短路要求的是<b>毫秒级</b>切断，而且 95-96 这对小触点根本断不了那么大的电流 —— '+
    '<b>所以短路只能靠熔断器或断路器。</b>';
}
function setX(v){
  S2.x = v;
  const sl = $('s2i'); if(+sl.value !== Math.round(v*10)) sl.value = Math.round(v*10);
  note2();
}
$('s2i').addEventListener('input', function(){ setX(+this.value/10); });
$('s2nm').addEventListener('click', function(){ setX(1.0); });
$('s2ov').addEventListener('click', function(){ setX(1.5); });
$('s2rs').addEventListener('click', function(){
  if(!S2.tripped){ S2.msg = ''; note2(); return; }
  if(S2.th > TRIP*0.45){
    S2.msg = '<b>按不动 —— 双金属片还没凉透。</b>'+
             '实物上也是这样，动作后一般要等一两分钟。等那根条掉到一半以下再按。';
    note2(); return;
  }
  S2.tripped = false; S2.mt = 0; S2.msg = ''; note2();
});

/* ================================================================
   场景 3：时间继电器 —— 让触点过一会儿再动
   ================================================================
   mode 0 通电延时型：线圈得电开始计时，到点触点动；失电立即复位、计时清零
   mode 1 断电延时型：线圈得电触点立即动；失电开始计时，到点才复位 */
const S3 = { mode:0, on:false, set:5, tOn:0, tOff:0, wasOn:false };
const st3 = new Stage('cv2', 360, 324);

function s3Acted(){
  return S3.mode === 0 ? (S3.on && S3.tOn >= S3.set)
                       : (S3.on || (S3.wasOn && S3.tOff < S3.set));
}
/* 计时条走到哪儿了（0~1）。没在计时就是 0 */
function s3Prog(){
  if(S3.mode === 0) return S3.on ? Math.min(1, S3.tOn / S3.set) : 0;
  return (!S3.on && S3.wasOn) ? Math.min(1, S3.tOff / S3.set) : 0;
}
function s3Counting(){
  return S3.mode === 0 ? (S3.on && S3.tOn < S3.set)
                       : (!S3.on && S3.wasOn && S3.tOff < S3.set);
}

function draw3(dt){
  const g = st3.g; st3.clear();

  /* ---- 推进计时 ---- */
  const wasActed = s3Acted();
  if(S3.on){
    S3.tOn = Math.min(S3.set + 1, S3.tOn + dt);
    S3.tOff = 0; S3.wasOn = true;
  }else{
    S3.tOn = 0;
    if(S3.wasOn){
      S3.tOff = Math.min(S3.set + 1, S3.tOff + dt);
      if(S3.mode === 0 || S3.tOff >= S3.set) S3.wasOn = (S3.mode === 1 && S3.tOff < S3.set);
    }
  }
  if(s3Acted() !== wasActed) note3();

  const acted = s3Acted(), prog = s3Prog(), counting = s3Counting();
  const on = S3.on;
  EP.heading(g, 20, 14, S3.mode === 0 ? '通电延时型 KT' : '断电延时型 KT',
             S3.mode === 0 ? '通电慢、断电快' : '通电快、断电慢');

  /* ---- 线圈 ---- */
  const cx = 56;
  g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.2; g.lineCap='round';
  g.beginPath(); g.moveTo(cx, 52); g.lineTo(cx, 74); g.stroke();
  g.beginPath(); g.moveTo(cx, 104); g.lineTo(cx, 130); g.stroke();
  g.restore();
  box(g, 36, 74, 40, 30, 3, on ? C.accbg : C.box, on ? C.acc : C.boxLine, on ? 2 : 1.4);
  txt(g, 'KT', cx, 89, {sz:12, b:1, c: on ? C.acc : C.tx2});
  txt(g, on ? '得电' : '没电', cx, 142, {sz:10, b:1, c: on ? C.acc : C.tx3});

  /* ---- 机械联动虚线 ---- */
  g.save(); g.setLineDash([5,4]);
  g.strokeStyle = acted ? C.acc : C.tx3; g.lineWidth = 1.4;
  g.beginPath(); g.moveTo(76, 83); g.lineTo(292, 83); g.stroke();
  g.restore();

  /* ---- 两列触点 ---- */
  const YT = 70, YB = 104;
  [[180, '延时触点', true], [270, '瞬动触点', false]].forEach(function(col){
    const x = col[0], delayed = col[2];
    /* 瞬动触点跟线圈同步；延时触点看 acted */
    const closed = delayed ? acted : on;
    g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.2; g.lineCap='round';
    g.beginPath(); g.moveTo(x, 48); g.lineTo(x, YT); g.stroke();
    g.beginPath(); g.moveTo(x, YB); g.lineTo(x, 126); g.stroke();
    g.restore();
    g.save(); g.lineCap='round';
    g.translate(x, YT); g.rotate(closed ? 0 : -0.55);
    g.strokeStyle = EP.P.copperD; g.lineWidth = 4.6;
    g.beginPath(); g.moveTo(0,0); g.lineTo(0, YB-YT); g.stroke();
    g.strokeStyle = closed ? C.ok : EP.P.copper; g.lineWidth = 2.8;
    g.beginPath(); g.moveTo(0,0); g.lineTo(0, YB-YT); g.stroke();
    /* 延时触点身上那把「伞」：凹面朝着被拖慢的那个方向 */
    if(delayed){
      g.strokeStyle = counting ? C.warn : C.tx2; g.lineWidth = 1.6;
      g.beginPath();
      const my = (YB-YT)/2;
      g.lineWidth = 2;
      if(S3.mode === 0) g.arc(0, my, 9, -Math.PI/2, Math.PI/2);
      else              g.arc(0, my, 9, Math.PI/2, Math.PI*1.5);
      g.stroke();
    }
    g.restore();
    EP.terminal(g, x, YT, 4);
    EP.terminal(g, x, YB, 4);
    txt(g, col[1], x, 38, {sz:9.5, c: delayed ? C.tx2 : C.tx3});
    txt(g, closed ? '通' : '断', x, 142, {sz:11, b:1, c: closed ? C.ok : C.tx3});
  });

  /* ---- 计时条 ---- */
  txt(g, counting ? '正在计时' : (acted ? '延时已到' : '没在计时'),
      24, 164, {sz:9, c: counting ? C.warn : C.tx3, al:'left'});
  txt(g, '设定 ' + S3.set.toFixed(1) + ' s', 336, 164, {sz:9.5, b:1, c:C.tx2, al:'right'});
  box(g, 24, 174, 312, 20, 5, C.box, C.boxLine, 1);
  if(prog > 0.005) box(g, 26, 176, Math.max(3, 308*prog), 16, 4, C.warn, null, 0);
  const left = counting
      ? (S3.mode === 0 ? S3.set - S3.tOn : S3.set - S3.tOff) : 0;
  txt(g, counting ? '还差 ' + left.toFixed(1) + ' 秒'
       : (acted ? '延时触点已经动作' : '等一个开始计时的条件'),
      180, 208, {sz:10.5, b:1, c: counting ? C.warn : (acted ? C.ok : C.tx3)});

  /* ---- 空气阻尼原理 ---- */
  EP.heading(g, 20, 232, '空气阻尼式（气囊式）', '最常见的一种做法');
  box(g, 40, 250, 140, 52, 5, C.box, C.boxLine, 1);
  const px = 46 + 124*prog;
  box(g, px, 254, 8, 44, 2, EP.P.steel, EP.P.steelDD, 1);
  txt(g, '活塞', px + 4, 246, {sz:8.5, c:C.tx3});
  txt(g, '气室', 110, 276, {sz:9, c:C.tx3});
  /* 进气孔 + 调节螺钉 */
  g.save(); g.fillStyle = C.bg;
  g.beginPath(); g.arc(180, 276, 3.4, 0, EC.TAU); g.fill();
  g.strokeStyle = C.boxLine; g.lineWidth = 1; g.stroke(); g.restore();
  box(g, 188, 269, 16, 14, 2, EP.P.steelD, EP.P.steelDD, 1);
  g.save(); g.strokeStyle = EP.P.steelDD; g.lineWidth = 1.6; g.lineCap='round';
  g.beginPath(); g.moveTo(192, 276); g.lineTo(200, 276); g.stroke(); g.restore();
  EC.head(g, 214, 276, -1, 0, 5, C.acc);
  txt(g, '进气孔 ＋ 调节螺钉', 222, 276, {sz:9, c:C.tx3, al:'left'});
  txt(g, '空气只能从那个小孔慢慢挤进来，活塞才走得动 —— 拧螺钉改孔的大小，就改了延时',
      180, 314, {sz:8.5, c:C.tx3});
}

function note3(){
  const acted = s3Acted(), counting = s3Counting();
  $('s3on').textContent = S3.on ? '把线圈 KT 断电' : '给线圈 KT 通电';
  $('s3a').textContent = S3.on ? '得电' : '没电';
  $('s3b').textContent = acted ? '通' : '断';
  $('s3c').textContent = S3.on ? '通' : '断';
  $('s3slab').textContent = S3.set.toFixed(1) + ' s';
  const m0 = S3.mode === 0;
  let h;
  if(counting){
    h = '<div class="st warn">正在计时</div>'+
      (m0 ? '线圈刚得电，<b>延时触点还没动</b>，但旁边那个<b>瞬动触点已经合上了</b> —— '+
            '同一个继电器上，两种触点脾气不一样。<br>'+
            '<b>这时候把线圈断掉，计时会清零重来。</b>'
          : '线圈刚断电，<b>延时触点还保持着动作状态</b>，正在倒数。'+
            '瞬动触点则已经跟着线圈立刻复位了。<br>'+
            '<b>这时候再给线圈通上电，计时清零，触点接着保持。</b>');
  }else if(acted){
    h = '<div class="st good">延时到了，延时触点动作</div>'+
      (m0 ? '从线圈得电算起，'+S3.set.toFixed(1)+' 秒之后延时触点才合上。<br>'+
            '<b>现在把线圈断掉试试 —— 它会立刻复位，不再等 '+S3.set.toFixed(1)+' 秒。</b>'+
            '通电延时型只在「通电」那一头慢。'
          : '线圈一得电，延时触点<b>立刻</b>就动作了，一点没等。<br>'+
            '<b>现在把线圈断掉试试 —— 它不会马上松，要过 '+S3.set.toFixed(1)+' 秒。</b>'+
            '断电延时型只在「断电」那一头慢。');
  }else{
    h = '<div class="st">现在两副触点都断着</div>'+
      (m0 ? '这是通电延时型的起始状态。<b>给线圈通电</b>，你会看到：'+
            '瞬动触点立刻合上，延时触点要等 '+S3.set.toFixed(1)+' 秒。'
          : '这是断电延时型的起始状态。<b>给线圈通电</b>，你会看到：'+
            '两副触点<b>同时</b>合上，一点不等 —— 它的慢在断电那一头。')+
      '<br><span class="sub">拖下面那根滑杆改延时值，等于在实物上拧那颗调节螺钉。</span>';
  }
  $('n2').innerHTML = h;
}
$('s3on').addEventListener('click', function(){ S3.on = !S3.on; note3(); });
$('s3s').addEventListener('input', function(){ S3.set = +this.value/10; note3(); });
document.getElementById('s3m').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S3.mode = +b.dataset.k;
  S3.on = false; S3.tOn = 0; S3.tOff = 0; S3.wasOn = false;
  document.querySelectorAll('#s3m .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S3.mode);
  });
  note3();
});

/* ================================================================
   场景 4：八种继电器图鉴
   ================================================================ */
const S4 = { k:0, t:0 };
const st4 = new Stage('cv3', 360, 300);

/* 小零件：几种草图共用 */
function coilBox(g, x, y, s){
  box(g, x-20, y-15, 40, 30, 3, C.box, C.boxLine, 1.4);
  txt(g, s, x, y, {sz:12, b:1, c:C.tx2});
}
function dashLink(g, x0, y0, x1, yTop, yBot){
  g.save(); g.setLineDash([5,4]); g.strokeStyle = C.tx3; g.lineWidth = 1.3;
  g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y0); g.stroke();
  g.beginPath(); g.moveTo(x1, yTop); g.lineTo(x1, yBot); g.stroke();
  g.restore();
}
function zigzag(g, x, y0, y1, col, w){
  g.save(); g.strokeStyle = col; g.lineWidth = 2.4;
  g.lineJoin = 'round'; g.lineCap = 'round';
  g.beginPath();
  for(let j=0;j<=10;j++){
    const yy = y0 + (y1-y0)*j/10;
    const xx = x + ((j%2) ? (w||6) : -(w||6)) * (j===0 || j===10 ? 0 : 1);
    j ? g.lineTo(xx, yy) : g.moveTo(xx, yy);
  }
  g.stroke(); g.restore();
}

const RELAYS = [
  { t:'中间继电器', sym:'KA',
    by:'线圈得电 → 衔铁吸合（跟接触器一样）',
    use:'扩展触点数量、垫在弱信号和接触器中间',
    draw:function(g){
      coilBox(g, 106, 118, 'KA');
      g.save(); g.strokeStyle = C.wire; g.lineWidth = 2; g.lineCap='round';
      g.beginPath(); g.moveTo(106, 103); g.lineTo(106, 70); g.stroke();
      g.beginPath(); g.moveTo(106, 133); g.lineTo(106, 168); g.stroke();
      g.restore();
      dashLink(g, 126, 112, 236, 62, 174);
      [72, 116, 160].forEach(function(y, i){
        hContact(g, 282, y, false, i === 2, {w:32});
      });
      txt(g, '一个线圈', 106, 184, {sz:9, c:C.tx3});
      txt(g, '好几组小触点', 282, 184, {sz:9, c:C.tx3});
    }},
  { t:'时间继电器', sym:'KT',
    by:'线圈动作后开始计时，到点触点才动',
    use:'要按顺序动作的场合，比如星三角起动',
    draw:function(g){
      coilBox(g, 96, 118, 'KT');
      g.save(); g.strokeStyle = C.wire; g.lineWidth = 2; g.lineCap='round';
      g.beginPath(); g.moveTo(96, 103); g.lineTo(96, 78); g.stroke();
      g.beginPath(); g.moveTo(96, 133); g.lineTo(96, 158); g.stroke();
      g.restore();
      dashLink(g, 116, 112, 200, 92, 150);
      /* 沙漏：拖时间的意思 */
      g.save(); g.strokeStyle = C.warn; g.lineWidth = 2; g.lineJoin='round';
      g.beginPath();
      g.moveTo(186, 96); g.lineTo(214, 96); g.lineTo(194, 118);
      g.lineTo(214, 140); g.lineTo(186, 140); g.lineTo(206, 118);
      g.closePath(); g.stroke(); g.restore();
      /* 延时触点，带那把伞 */
      g.save(); g.strokeStyle = C.wire; g.lineWidth = 2; g.lineCap='round';
      g.beginPath(); g.moveTo(286, 76); g.lineTo(286, 98); g.stroke();
      g.beginPath(); g.moveTo(286, 138); g.lineTo(286, 160); g.stroke();
      g.restore();
      g.save(); g.translate(286, 98); g.rotate(-0.5);
      g.strokeStyle = EP.P.copper; g.lineWidth = 3.4; g.lineCap='round';
      g.beginPath(); g.moveTo(0,0); g.lineTo(0, 40); g.stroke();
      g.strokeStyle = C.tx2; g.lineWidth = 1.6;
      g.beginPath(); g.arc(0, 20, 8, -Math.PI/2, Math.PI/2); g.stroke();
      g.restore();
      EP.terminal(g, 286, 98, 4); EP.terminal(g, 286, 138, 4);
      txt(g, '延时触点上多一把「伞」', 240, 184, {sz:9, c:C.tx3});
    }},
  { t:'热继电器', sym:'FR',
    by:'主电路的电流把热元件烤热，双金属片弯',
    use:'电动机过载保护（不能作短路保护）',
    draw:function(g){
      g.save(); g.strokeStyle = C.L; g.lineWidth = 2.4; g.lineCap='round';
      g.beginPath(); g.moveTo(100, 60); g.lineTo(100, 92); g.stroke();
      g.beginPath(); g.moveTo(100, 148); g.lineTo(100, 178); g.stroke();
      g.restore();
      zigzag(g, 100, 92, 148, C.hot);
      txt(g, '热元件', 100, 190, {sz:9, c:C.tx3});
      txt(g, '串在主电路', 100, 50, {sz:9, c:C.tx3});
      /* 双金属片 */
      box(g, 168, 172, 64, 12, 2, EP.P.bakelite, EP.P.bakeliteL, 1);
      [[-2.2, EP.P.steel], [2.2, EP.P.copper]].forEach(function(a){
        g.save(); g.strokeStyle = a[1]; g.lineWidth = 3;
        g.lineJoin='round'; g.lineCap='round'; g.beginPath();
        for(let i=0;i<=14;i++){
          const t = i/14, yy = 172 + (96-172)*t, xx = 200 + 22*t*t + a[0];
          i ? g.lineTo(xx, yy) : g.moveTo(xx, yy);
        }
        g.stroke(); g.restore();
      });
      txt(g, '双金属片', 200, 192, {sz:9, c:C.tx3});
      dashLink(g, 232, 100, 286, 84, 116);
      hContact(g, 300, 100, true, true, {w:28});
      txt(g, '95-96', 300, 76, {sz:9, c:C.tx3});
    }},
  { t:'电流继电器', sym:'KA / KI',
    by:'线圈串在被测回路里，按电流大小动作',
    use:'过电流保护、欠电流保护',
    draw:function(g){
      g.save(); g.strokeStyle = EP.P.copper; g.lineWidth = 5.2; g.lineCap='round';
      g.beginPath(); g.moveTo(40, 112); g.lineTo(320, 112); g.stroke();
      g.restore();
      g.save(); g.strokeStyle = EP.P.copperD; g.lineWidth = 5;
      [150, 175, 200].forEach(function(x){
        g.beginPath(); g.ellipse(x, 112, 6, 22, 0, 0, EC.TAU); g.stroke();
      });
      g.restore();
      EC.head(g, 92, 112, 1, 0, 6, C.cur);
      EC.head(g, 272, 112, 1, 0, 6, C.cur);
      txt(g, '主电路的全部电流从它身上过', 180, 68, {sz:10, b:1, c:C.tx2});
      EP.chip(g, '串 联', 76, 150, {sz:11, b:1, c:C.acc});
      txt(g, '匝数少、导线粗', 180, 152, {sz:10, c:C.tx3});
      txt(g, '线细了会被烧断', 180, 172, {sz:9, c:C.tx3});
    }},
  { t:'电压继电器', sym:'KV',
    by:'线圈并在被测两点上，按电压高低动作',
    use:'过电压、欠电压、失压保护',
    draw:function(g){
      g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.6; g.lineCap='round';
      g.beginPath(); g.moveTo(100, 56); g.lineTo(100, 178); g.stroke();
      g.beginPath(); g.moveTo(260, 56); g.lineTo(260, 178); g.stroke();
      g.beginPath(); g.moveTo(100, 112); g.lineTo(130, 112); g.stroke();
      g.beginPath(); g.moveTo(230, 112); g.lineTo(260, 112); g.stroke();
      g.restore();
      g.save(); g.strokeStyle = EP.P.copper; g.lineWidth = 1.8;
      for(let i=0;i<9;i++){
        g.beginPath(); g.ellipse(133 + i*11.6, 112, 4, 15, 0, 0, EC.TAU); g.stroke();
      }
      g.restore();
      EC.node(g, 100, 112); EC.node(g, 260, 112);
      txt(g, '被测的两点', 180, 68, {sz:10, b:1, c:C.tx2});
      EP.chip(g, '并 联', 76, 152, {sz:11, b:1, c:C.acc});
      txt(g, '匝数多、导线细', 180, 152, {sz:10, c:C.tx3});
    }},
  { t:'速度继电器', sym:'KS',
    by:'转子跟着电动机轴转，靠离心力甩动触点',
    use:'反接制动：转速降到接近零就切掉反相电',
    draw:function(g, t){
      EP.motor(g, 76, 116, 22, {spin:t*3});
      g.save(); g.strokeStyle = EP.P.steel; g.lineWidth = 4; g.lineCap='round';
      g.beginPath(); g.moveTo(98, 116); g.lineTo(154, 116); g.stroke(); g.restore();
      txt(g, '电动机轴', 118, 96, {sz:9, c:C.tx3});
      /* 转子 + 两块甩块 */
      const a = t*3;
      g.save(); g.translate(186, 116);
      g.strokeStyle = EP.P.steelD; g.lineWidth = 2;
      g.beginPath(); g.arc(0, 0, 26, 0, EC.TAU); g.stroke();
      g.rotate(a);
      g.fillStyle = EP.P.copper;
      [-1, 1].forEach(function(s){
        g.save(); g.rotate(s * Math.PI/2);
        g.beginPath(); g.ellipse(0, -20, 5.5, 9, 0, 0, EC.TAU); g.fill();
        g.restore();
      });
      g.restore();
      txt(g, '离心甩块', 186, 168, {sz:9, c:C.tx3});
      dashLink(g, 212, 116, 262, 96, 136);
      hContact(g, 300, 116, false, false, {w:26});
      txt(g, '转起来才合上', 292, 156, {sz:9, c:C.tx3});
    }},
  { t:'压力继电器', sym:'KP',
    by:'介质压力推动膜片或波纹管，顶动触点',
    use:'空压机、水泵、液压系统的压力上下限控制',
    draw:function(g){
      box(g, 34, 146, 134, 32, 4, EP.P.steelDD, EP.P.steelD, 1.2);
      txt(g, '管道来的压力', 92, 192, {sz:9, c:C.tx3});
      EC.head(g, 128, 162, 1, 0, 6, C.acc);
      /* 波纹管 */
      g.save(); g.strokeStyle = EP.P.steel; g.lineWidth = 2.4;
      g.lineJoin='round'; g.beginPath();
      for(let i=0;i<=8;i++){
        const yy = 176 - i*7, xx = 180 + ((i%2) ? 12 : -12);
        i ? g.lineTo(xx, yy) : g.moveTo(xx, yy);
      }
      g.stroke(); g.restore();
      txt(g, '波纹管', 180, 190, {sz:9, c:C.tx3});
      g.save(); g.strokeStyle = EP.P.steelD; g.lineWidth = 3; g.lineCap='round';
      g.beginPath(); g.moveTo(180, 116); g.lineTo(180, 96); g.stroke(); g.restore();
      dashLink(g, 182, 96, 250, 78, 116);
      hContact(g, 292, 96, false, false, {w:28});
      txt(g, '压到设定值就动作', 250, 60, {sz:10, b:1, c:C.tx2});
    }},
  { t:'温度继电器', sym:'KT / 热敏元件',
    by:'感温元件埋在电动机绕组里，直接测绕组温度',
    use:'比热继电器更贴身的过热保护，常和它一起用',
    draw:function(g){
      EP.motor(g, 100, 118, 34, {});
      g.save(); g.fillStyle = C.hot;
      g.beginPath(); g.arc(100, 92, 5, 0, EC.TAU); g.fill(); g.restore();
      txt(g, '感温元件埋在绕组里', 100, 192, {sz:9, c:C.tx3});
      g.save(); g.strokeStyle = C.wire; g.lineWidth = 2; g.lineCap='round';
      g.beginPath(); g.moveTo(105, 92); g.lineTo(230, 92); g.stroke(); g.restore();
      /* 温度计 */
      box(g, 232, 66, 16, 74, 8, C.box, C.boxLine, 1.2);
      g.save(); g.fillStyle = C.hot;
      g.beginPath(); g.arc(240, 138, 11, 0, EC.TAU); g.fill();
      g.fillRect(236, 96, 8, 42); g.restore();
      txt(g, '绕组温度', 240, 54, {sz:9, c:C.tx3});
      dashLink(g, 252, 100, 286, 84, 120);
      hContact(g, 306, 100, true, true, {w:24});
      txt(g, '超温就断', 300, 160, {sz:9, c:C.tx3});
    }}
];

function draw4(dt){
  const g = st4.g; st4.clear();
  S4.t += dt;
  const r = RELAYS[S4.k];
  EP.heading(g, 20, 16, r.t);
  EP.chip(g, r.sym, 340, 16, {sz:10.5, b:1, al:'right', c:C.acc});
  r.draw(g, S4.t);
  box(g, 24, 204, 312, 42, 6, C.box, C.boxLine, 1);
  txt(g, '靠什么动作', 36, 216, {sz:9, c:C.tx3, al:'left'});
  txt(g, r.by, 36, 233, {sz:10.5, c:C.tx, al:'left'});
  box(g, 24, 252, 312, 42, 6, C.accbg, C.acc, 1);
  txt(g, '管什么 / 用在哪', 36, 264, {sz:9, c:C.tx3, al:'left'});
  txt(g, r.use, 36, 281, {sz:10.5, c:C.acc, al:'left'});
}

const NOTE4 = [
  ['它就是「触点特别多的小接触器」',
   '结构和动作过程跟接触器一模一样，只是触点小、数量多、不带灭弧罩，'+
   '<b>只在控制电路里干活</b>。柜子里一排排插在底座上的小方块，多半就是它。'],
  ['慢一步动作，是为了让别的事先做完',
   '最典型的用法是<b>星三角起动</b>：先按 Y 接起动（电流小），'+
   '几秒后 KT 到点，切成 △ 接正常运行。'+
   '没有它，这两步就得靠人掐表 —— 那是不可能的。'],
  ['它不断主电路，它只是发信号的',
   '主电路里是三个<b>热元件</b>，控制电路里是一对<b>动断触点 95-96</b>。'+
   '触点一断，接触器失电，由接触器去断主电路。<br>'+
   '<b>过载它管，短路它管不了</b> —— 第 2 屏整屏都在讲这件事。'],
  ['线圈串在回路里，所以线粗匝少',
   '它要承受被测回路的<b>全部电流</b>，导线细了自己就先烧了；'+
   '匝数多了阻抗大，还会把被测回路的电流拉下去。<br>'+
   '<span class="sub">过电流继电器：电流超了就动作。'+
   '欠电流继电器反过来：电流掉到某个值以下才动作（比如励磁断了）。</span>'],
  ['线圈并在两点上，所以线细匝多',
   '它要承受<b>全电压</b>又不能分走电流，所以线圈阻抗必须很大 —— 匝数多、导线细。<br>'+
   '<b>失压保护也是它的活。</b>上一节讲接触器天生带失压保护，'+
   '那是靠电磁吸力消失；要更准的门槛（比如低于 85% 就跳），就得用电压继电器。'],
  ['专门为「反接制动」造的',
   '让电动机快速停下的一个办法是<b>把两相对调</b>，让它反着拽 —— 但转速一到零就必须切掉，'+
   '否则它会朝反方向转起来。<b>速度继电器就是那个「到零了」的信号。</b><br>'+
   '<span class="sub">它的转子跟电机轴连在一起，靠离心力甩动触点，所以测的是真实转速。</span>'],
  ['把「压力」变成一对触点',
   '空压机打到上限压力就停、掉到下限又起来，靠的就是它。'+
   '水泵、液压站同理。<br>'+
   '<span class="sub">上下限之间那一段差值叫<b>回差</b>，'+
   '留得太小机器会频繁起停，这是现场调试时要拧的东西。</span>'],
  ['贴着绕组测，比热继电器更直接',
   '热继电器测的是<b>电流</b>，靠电流去推断绕组热不热；'+
   '温度继电器（埋置式热保护）测的是<b>绕组本身的温度</b>。<br>'+
   '<b>有些工况电流不大但照样过热</b> —— 比如通风堵了、环境温度太高、频繁起停。'+
   '这种情况热继电器看不出来，埋在绕组里的元件能。<br>'+
   '<span class="sub">所以大一点的电动机往往两个都装。</span>']
];
function setK4(k){
  S4.k = k;
  document.querySelectorAll('#s4p .btn, #s4p2 .btn').forEach(function(b){
    b.classList.toggle('on', +b.dataset.k === k);
  });
  const m = NOTE4[k], r = RELAYS[k];
  $('n3').innerHTML = '<div class="st">'+r.t+' '+r.sym+' —— '+m[0]+'</div>'+m[1];
}
['s4p','s4p2'].forEach(function(id){
  document.getElementById(id).addEventListener('click', function(e){
    const b = e.target.closest('.btn'); if(b) setK4(+b.dataset.k);
  });
});

/* ================================================================
   绑定
   ================================================================ */
function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:2, sec:'2.3'});
ElecUI.bind(document);
note1(); note2(); note3(); setK4(0);
fitAll();

(function(){
  const nb = ElecNav.neighbors('2.3');
  let h = '';
  h += nb.prev ? '<a href="'+nb.prev.f+'">‹ '+nb.prev.id+' '+nb.prev.t+'</a>'
               : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next ? '<a class="next" href="'+nb.next.f+'">'+nb.next.id+' '+nb.next.t+' ›</a>'
               : '<span>后面几节还没做</span>';
  $('pager').innerHTML = h;
})();

loop(function(dt){
  if(cur === 0) draw1(dt);
  else if(cur === 1) draw2(dt);
  else if(cur === 2) draw3(dt);
  else draw4(dt);
});
  }
});
})();
