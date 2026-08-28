/* 2.5 电子元器件（下）—— 本节内容的唯一真相。
   book.html 按需载入它；c2-5b.html 是薄壳，也载入它。
   对应《零基础学电工》第 2 章 2.5 节后半（书内 P37~P41）：
   二极管、整流电路、晶体管、场效应管、晶闸管。

   这一节的取舍：书上按「器件」讲，我按**电工在现场会碰到什么**排 ——
   二极管 → 整流（控制变压器后面那块板子上就是它）→ 晶体管当开关（驱动继电器）
   → 晶闸管（调压、软启动、固态继电器）。放大电路那套是电子专业的事，只点一句。 */
(function(){
'use strict';
ELEC.reg({
  id: '2.5b',
  file: 'c2-5b.html',
  title: '2.5 电子元器件（下）',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>二极管</button>
    <button class="tab" data-i="1"><span class="n">2</span>整流·交流变直流</button>
    <button class="tab" data-i="2"><span class="n">3</span>晶体管·当开关</button>
    <button class="tab" data-i="3"><span class="n">4</span>晶闸管·调电压</button>`,
  html: `<section class="scene on" id="sc0">
  <div class="lead">
    <div class="h">二极管：电的单行道</div>
    它只让电流<b>往一个方向</b>过，反过来就堵死。
    <b>点「反向接」把它掉个头，看灯灭没灭、再看那三个数字。</b>
  </div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1d">
        <button class="btn on big" data-k="1">正向接（阳极朝电源＋）</button>
        <button class="btn" data-k="0">反向接</button>
      </div>
      <div class="btns" id="s1t">
        <button class="btn on sm" data-k="0">硅管</button>
        <button class="btn sm" data-k="1">锗管</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">二极管<br>两端电压</div><div class="v" id="s1a">0.7 V</div></div>
        <div class="num"><div class="k">回路<br>电流</div><div class="v" id="s1b">188 mA</div></div>
        <div class="num hi"><div class="k">灯</div><div class="v" id="s1c">亮</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">两个电极，别叫混了</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>叫法</th><th>是哪一头</th><th>怎么认</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">阳极 A<br>（正极）</td><td>电流<b>进</b>的那一头</td><td>符号上三角形的<b>底边</b>那侧；实物上离银环远的那头</td></tr>
        <tr><td class="eu-s">阴极 K<br>（负极）</td><td>电流<b>出</b>的那一头</td><td>符号上那根<b>短竖杠</b>；实物上<b>印着一圈银环/白环</b>的那头</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>符号本身就是个箭头</b>：三角形指向哪边，电流就只能往哪边走，
      顶到那根竖杠就走不动了。<b>竖杠 = 挡板 = 阴极。</b>
      <span class="sub">这条记住了，图上再也不会接反。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">正向压降：导通了也要吃掉一点电压</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>材料</th><th>导通后压降</th><th>常见在哪</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">硅管</td><td><b>约 0.7 V</b>（0.6~0.8）</td><td>绝大多数整流管、开关管，1N400x、1N4148</td></tr>
        <tr><td class="eu-s">锗管</td><td>约 0.3 V</td><td>老式收音机里能见到，现在很少了</td></tr>
        <tr><td class="eu-s">发光二极管</td><td>1.8~3.3 V（看颜色）</td><td>指示灯，<b>必须串限流电阻</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>「0.7 V」这个数天天用得上。</b>判断一只硅管是不是在导通，量它两端：
      约 0.7 V 就是通着的；接近 0 V 是被短路了；等于整个电源电压说明它没通（要么反接、要么坏了）。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">选二极管看两个数</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>什么意思</th><th>怎么选</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">最大正向<br>电流 I<sub>F</sub></td><td>能长期通过多大电流</td><td>按实际电流的 <b>1.5~2 倍</b>选</td></tr>
        <tr><td class="eu-s">最高反向<br>耐压 U<sub>RM</sub></td><td>反着能顶住多高电压，<b>超了就击穿</b></td><td>按实际承受的反压 <b>2 倍以上</b>选</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      为什么反向耐压这么要紧：<b>管子截止的时候，电源电压几乎全部压在它一个人身上</b>
      —— 上面点「反向接」就能看到，12 V 全落在二极管两端。
      <span class="sub">常用的 1N4007 耐压 1000 V、电流 1 A，
      所以 220 V 场合随手就拿它；而 1N4001 只有 50 V，接 220 V 上去当场炸。<b>型号最后一位不能混。</b></span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">用万用表判方向和好坏</div>
    数字表拨到<b>二极管档</b>（符号就是那个三角加竖杠）：
    <div class="eu-tw" style="margin-top:6px"><table class="eu-t">
      <thead><tr><th>怎么接</th><th>读数</th><th>结论</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">红笔一头<br>黑笔另一头</td><td>0.5~0.7 V</td><td>通了。<b>此时红笔那头是阳极 A</b></td></tr>
        <tr><td class="eu-s">两笔对调</td><td>显示 OL / 1</td><td>截止。管子是好的</td></tr>
        <tr><td class="eu-s">正反都约 0</td><td>——</td><td><b>击穿短路，坏了</b></td></tr>
        <tr><td class="eu-s">正反都 OL</td><td>——</td><td><b>开路，坏了</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>指针表要反着记</b>：指针式万用表电阻档里，<b>红表笔接的是表内电池的负极</b>。
      所以用指针表测出「阻值小」的那一次，<b>黑表笔那头才是阳极</b>——跟数字表正好相反。
      <span class="sub">这条考证要考，现场也真会栽。分不清就用数字表的二极管档，不会绕。</span>
    </div>
  </div>

  <div class="bet" data-bet="c25b-diode" data-q="12 V 电源、60 Ω 的灯，二极管反着接。这时二极管两端的电压大约是多少？"
       data-opts="0 V|0.7 V|约 12 V" data-right="2"
       data-after="约 12 V。管子截止 = 回路里几乎没有电流 = 灯上几乎不分压，所以整个电源电压全压在二极管身上。这正是「选管要看反向耐压」的原因。"></div>
</section>

<!-- ================= 场景 2：整流 ================= -->
<section class="scene" id="sc1">
  <div class="lead">
    <div class="h">整流：把交流削成直流</div>
    机器里的 PLC、直流继电器、指示灯都要直流，可进线是交流。
    中间那块小板子干的就是这件事。<b>三档挨个点一遍，盯住下面那两条波形。</b>
  </div>
  <div class="card">
    <canvas id="cv1"></canvas>
    <div class="ctrl">
      <div class="btns" id="s2m">
        <button class="btn on" data-k="0">半波</button>
        <button class="btn" data-k="1">桥式全波</button>
        <button class="btn big" data-k="2">桥式＋滤波电容</button>
      </div>
      <div class="rowlab">变压器输出（交流有效值）U<sub>2</sub>　<b id="s2ulab">12 V</b></div>
      <input type="range" id="s2u" min="6" max="36" step="1" value="12">
      <div class="nums three">
        <div class="num"><div class="k">输入<br>交流有效值</div><div class="v" id="s2a">12 V</div></div>
        <div class="num hi"><div class="k">输出<br>直流电压</div><div class="v" id="s2b">5.4 V</div></div>
        <div class="num"><div class="k">是 U<sub>2</sub> 的<br>多少倍</div><div class="v" id="s2c">0.45</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n1"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">三档的差别，一张表说完</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>接法</th><th>几只管</th><th>输出直流</th><th>怎么回事</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">半波</td><td>1 只</td><td><b>0.45 × U<sub>2</sub></b></td><td>只放行正半周，负半周整个丢掉。<b>一半时间没电</b></td></tr>
        <tr><td class="eu-s">桥式全波</td><td>4 只<br>（或一个桥堆）</td><td><b>0.9 × U<sub>2</sub></b></td><td>负半周被翻上来了，两个半周都用上，所以正好翻一倍</td></tr>
        <tr><td class="eu-s">桥式＋<br>滤波电容</td><td>4 只<br>＋1 电容</td><td><b>约 1.2 × U<sub>2</sub></b></td><td>电容把波谷填平，读数被拉到接近峰值（空载时接近 1.41×U<sub>2</sub>）</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>「12 V 变压器在直流侧测出来 15 V」不是变压器坏了。</b>带电容滤波的直流侧本来就在 1.2~1.4 倍之间，
      轻载时更靠近峰值 1.41 倍。<b>量交流侧才看得到 12 V。</b>
      <span class="sub">反过来说：直流侧只读到 10.8 V 左右、纹波很大，
      多半是滤波电容干了（容量掉了），滤波作用没了。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">桥堆：把四只管封成一个小方块</div>
    现场见到的多半不是四只散管，而是一个带四个脚的<b>整流桥堆</b>（KBP、KBU、GBJ 这些）。
    <div class="eu-tw" style="margin-top:6px"><table class="eu-t">
      <thead><tr><th>脚上印的</th><th>接什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">～　～</td><td>两个交流输入，<b>不分正负、可以对调</b></td></tr>
        <tr><td class="eu-s">＋</td><td>直流输出正极（外壳上常有个斜角或圆点标记它）</td></tr>
        <tr><td class="eu-s">−</td><td>直流输出负极</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>桥堆坏了怎么查：</b>断电、至少拆下一条腿，用二极管档量
      <b>＋ 对两个 ～</b> 和 <b>两个 ～ 对 −</b>，一共四组。
      好的应该是<b>一个方向 0.5~0.7 V、反过来 OL</b>，四组都一样。
      有任意一组正反都通（约 0）就是击穿，整只换掉。
      <span class="sub">桥堆很少只坏一只管 —— 一只击穿会连累其余，所以不修、直接整只换。</span>
    </div>
  </div>

  <div class="bet" data-bet="c25b-rect" data-q="变压器输出 12 V 交流，经桥式整流但不加滤波电容。直流电压表读数大约是多少？"
       data-opts="约 5.4 V|约 10.8 V|约 17 V" data-right="1"
       data-after="约 10.8 V，也就是 0.9×12。半波才是 0.45×U₂（5.4 V）；17 V 那个是加了滤波电容之后的量级（约 1.2~1.4 倍）。"></div>
</section>

<!-- ================= 场景 3：晶体管 / 场效应管 ================= -->
<section class="scene" id="sc2">
  <div class="lead">
    <div class="h">晶体管：用很小的电流，控制很大的电流</div>
    左边那根滑杆给的是<b>基极</b>那一点点电流，右边灯里跑的是它的<b>一百倍</b>。
    <b>把滑杆从头拖到尾，看它经过哪三个阶段。</b>
  </div>
  <div class="card">
    <canvas id="cv2"></canvas>
    <div class="ctrl">
      <div class="btns" id="s3t">
        <button class="btn on" data-k="0">晶体管（电流控制）</button>
        <button class="btn" data-k="1">场效应管（电压控制）</button>
      </div>
      <div class="rowlab" id="s3lab">基极电流 I<sub>b</sub>　<b id="s3v">0.20 mA</b></div>
      <input type="range" id="s3s" min="0" max="200" step="1" value="20">
      <div class="nums three">
        <div class="num"><div class="k">控制端<br>给多少</div><div class="v" id="s3a">0.20 mA</div></div>
        <div class="num"><div class="k">被控电流<br>I<sub>c</sub></div><div class="v" id="s3b">20 mA</div></div>
        <div class="num hi"><div class="k">现在<br>在哪个区</div><div class="v" id="s3c">放大区</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n2"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">三个电极，和那个箭头</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>电极</th><th>符号</th><th>干什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">基极</td><td>b</td><td><b>控制端</b>。这一路电流很小，但它说了算</td></tr>
        <tr><td class="eu-s">集电极</td><td>c</td><td>大电流<b>进</b>的一端（NPN 时接负载、通向电源＋）</td></tr>
        <tr><td class="eu-s">发射极</td><td>e</td><td>大电流<b>出</b>的一端，符号上<b>带箭头的就是它</b></td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>箭头朝外是 NPN，朝里是 PNP。</b>记法：箭头永远指着<b>电流实际流的方向</b>——
      NPN 的电流从发射极出去（朝外），PNP 的电流从发射极进来（朝里）。
      <span class="sub">NPN 的 e 接电源负极（0 V），PNP 的 e 接电源正极。
      这跟 2.4 节接近开关那条「NP<b>N</b> 接<b>负</b>」是同一个道理。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">三个工作区，电工只用两个</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>区</th><th>什么时候</th><th>管子像什么</th><th>用在哪</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">截止区</td><td>基极不给电流</td><td><b>断开的开关</b><br>U<sub>ce</sub> = 全电源电压</td><td rowspan="2"><b>开关状态。<br>电工看到的晶体管<br>基本都在干这个</b>：<br>PLC 输出、驱动<br>继电器、指示灯</td></tr>
        <tr><td class="eu-s">饱和区</td><td>基极给足了</td><td><b>闭合的开关</b><br>U<sub>ce</sub> ≈ 0.3 V</td></tr>
        <tr><td class="eu-s">放大区</td><td>中间那一段</td><td>一个受控的电流源<br>I<sub>c</sub> = β × I<sub>b</sub></td><td>音频、传感器信号放大<br>（电子专业的活）</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>当开关用的时候，基极电流要故意给足</b>（比刚好饱和再多给一倍以上），
      叫「过驱动」。给得刚刚好的话，温度一变、管子一换批次，β 变了就掉出饱和区，
      <b>管子会发烫甚至烧掉</b> —— 因为半开半关的时候它自己身上的功率最大。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">场效应管：同样是开关，但靠电压控</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th></th><th>晶体管（BJT）</th><th>场效应管（MOSFET）</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">三个极</td><td>基极 b／集电极 c／发射极 e</td><td>栅极 G／漏极 D／源极 S</td></tr>
        <tr><td class="eu-s">靠什么控</td><td><b>电流</b> I<sub>b</sub></td><td><b>电压</b> U<sub>GS</sub></td></tr>
        <tr><td class="eu-s">控制端耗电</td><td>要持续吃电流</td><td><b>几乎不吃电流</b>（栅极是绝缘的）</td></tr>
        <tr><td class="eu-s">导通后</td><td>压降约 0.3 V，电流大了就发热</td><td>像个<b>很小的电阻</b>（几毫欧到几十毫欧）</td></tr>
        <tr><td class="eu-s">现场见于</td><td>小信号驱动、老电路</td><td><b>开关电源、变频器、逆变器</b>的功率级</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>变频器里那些大功率管多半是 IGBT</b> —— 可以粗略理解成
      「前面是场效应管的栅极（好驱动），后面是晶体管的大电流通道（能扛）」，两家的长处合一块。
      第 12 章讲变频器时还会再碰到它。
      <span class="sub"><b>场效应管怕静电</b>：栅极那层绝缘膜很薄，手上带的静电就能击穿它。
      拿散管要戴防静电手环、放在防静电袋里，别直接搓着塑料袋掏出来。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">怎么判断一只晶体管好坏</div>
    数字表二极管档。把它当成<b>两个背靠背的 PN 结</b>来量（b 是共用的那一端）：
    <div class="eu-tw" style="margin-top:6px"><table class="eu-t">
      <thead><tr><th>量哪儿</th><th>好的应该是</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">b–e、b–c</td><td>一个方向 0.5~0.7 V，反过来 OL，<b>两组表现一致</b></td></tr>
        <tr><td class="eu-s">c–e</td><td><b>正反都是 OL</b>（不通）</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>顺便判管型：</b>找出那个「对另外两脚都能正向导通」的脚，它就是 <b>b</b>。
      如果是<b>红笔</b>接着 b 的时候能通 → <b>NPN</b>；要<b>黑笔</b>接着 b 才通 → <b>PNP</b>。
      <span class="sub">c–e 之间只要正反有一次通（约 0），就是击穿了，直接换。</span>
    </div>
  </div>

  <div class="bet" data-bet="c25b-bjt" data-q="β = 100 的晶体管工作在放大区。基极电流从 0.5 mA 加到 1.0 mA，集电极电流怎么变？"
       data-opts="不变|从 50 mA 变成 100 mA|从 5 mA 变成 10 mA" data-right="1"
       data-after="从 50 mA 变成 100 mA。Ic = β × Ib，β=100 就是放大 100 倍。注意这只在放大区成立——一旦饱和，Ic 就被负载电阻卡死了，再加 Ib 也不涨。上面把滑杆推到底就能看到这个「顶住不动」。"></div>
</section>

<!-- ================= 场景 4：晶闸管 ================= -->
<section class="scene" id="sc3">
  <div class="lead">
    <div class="h">晶闸管（可控硅）：一触即通，然后自己锁住</div>
    它跟前面几个都不一样：<b>门极只要点一下就导通，之后撤掉门极信号它照样通着</b>，
    非要等电流自己降到零才关。<b>拖滑杆改「什么时候点这一下」，灯就跟着亮暗。</b>
  </div>
  <div class="card">
    <canvas id="cv3"></canvas>
    <div class="ctrl">
      <div class="rowlab">触发角 α（半个周期里，等多久才点这一下）　<b id="s4alab">90°</b></div>
      <input type="range" id="s4a" min="0" max="170" step="1" value="90">
      <div class="btns" id="s4b">
        <button class="btn sm" data-k="0">0°（点最早）</button>
        <button class="btn sm" data-k="90">90°</button>
        <button class="btn sm" data-k="150">150°（点最晚）</button>
        <button class="btn sm" id="s4p">暂停</button>
      </div>
      <div class="nums three">
        <div class="num"><div class="k">触发角<br>α</div><div class="v" id="s4x">90°</div></div>
        <div class="num"><div class="k">灯上的<br>电压有效值</div><div class="v" id="s4y">110 V</div></div>
        <div class="num hi"><div class="k">灯的<br>实际功率</div><div class="v" id="s4z">25 W</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n3"></div>

  <div class="note" style="margin-top:10px">
    <div class="st">三个电极和两条规矩</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>电极</th><th>符号</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">阳极</td><td>A</td><td>主电流进的一端</td></tr>
        <tr><td class="eu-s">阴极</td><td>K</td><td>主电流出的一端</td></tr>
        <tr><td class="eu-s">门极<br>（控制极）</td><td>G</td><td><b>只管点火，不管灭火</b>。给一个小脉冲就够</td></tr>
      </tbody>
    </table></div>
    <div class="eu-tw" style="margin-top:8px"><table class="eu-t">
      <thead><tr><th></th><th>条件</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">怎么才导通</td><td><b>两条同时成立</b>：① 阳极比阴极电位高（正向偏置）② 门极给一个触发电流。缺一样都不通</td></tr>
        <tr><td class="eu-s">怎么才关断</td><td><b>只有一条</b>：把阳极电流降到<b>维持电流</b>以下。门极再怎么弄都关不掉</td></tr>
      </tbody>
    </table></div>
    <div class="tip info">
      <b>接在交流上就省事了</b>：交流每半个周期都要过零一次，管子到那儿自动关断，
      下半周再重新触发。<b>接在直流上就麻烦</b> —— 通了就一直通，
      要专门做一套「强迫换流」电路才关得掉。
      <span class="sub">所以现场看到的晶闸管调压、调光、软启动，几乎全是接在交流上的。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">调压是怎么调出来的</div>
    改的不是电压高低，而是<b>每个半周里「通多久」</b>。
    点火点越靠后（α 越大），通的那一段越短，灯上得到的能量越少。
    <div class="tip info" style="margin-top:8px">
      <b>这就是「移相触发」。</b>调光台灯、电烙铁调温、电风扇无级调速、
      电动机软启动器，用的都是这一招。
      <span class="sub">上面这个演示是<b>单向晶闸管</b>，只管正半周，
      所以 α=0 时灯也只有额定功率的一半。真正的调光器用的是
      <b>双向晶闸管</b>（TRIAC，两个方向都能通），正负两个半周都能调，才做得到从全暗到全亮。</span>
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st">现场在哪儿能碰到它</div>
    <div class="eu-tw"><table class="eu-t">
      <thead><tr><th>设备</th><th>它在里面干什么</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">固态继电器<br>SSR</td><td><b>整个就是一只晶闸管加光耦</b>。没有触点、不会拉弧、能高频通断，代价是导通时自身发热、必须装散热片</td></tr>
        <tr><td class="eu-s">软启动器</td><td>启动时 α 从大往小移，让电动机电压慢慢升上来，避开启动电流冲击</td></tr>
        <tr><td class="eu-s">调光/调温</td><td>移相触发调有效值</td></tr>
        <tr><td class="eu-s">整流柜</td><td>可控整流，输出直流电压可调（电镀、直流电机调速）</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>固态继电器上手要记两条：</b>① 它<b>不是真正的断开</b> ——
      关断状态下仍有很小的漏电流，<b>不能拿它当检修隔离开关</b>，检修必须另外断真正的开关。
      ② <b>必须装散热片</b>，通电流越大越要紧，很多"莫名其妙烧了"就是散热没做。
    </div>
  </div>

  <div class="note" style="margin-top:10px">
    <div class="st warn">怎么判断一只晶闸管好坏</div>
    数字表电阻档（或二极管档）：
    <div class="eu-tw" style="margin-top:6px"><table class="eu-t">
      <thead><tr><th>量哪儿</th><th>好的应该是</th></tr></thead>
      <tbody>
        <tr><td class="eu-s">A–K</td><td><b>正反都不通</b>（阻值很大 / OL）</td></tr>
        <tr><td class="eu-s">G–K</td><td>像个二极管：一个方向通、反过来不通（阻值几十到几百欧）</td></tr>
      </tbody>
    </table></div>
    <div class="tip">
      <b>还能做个「自锁试验」：</b>用电阻档（大电池那一档，如 R×1）黑笔接 A、红笔接 K，
      此时不通；<b>拿根线把 G 和 A 碰一下再拿开</b> —— 如果指针一下子偏过去、
      而且松开 G 之后<b>还保持导通</b>，说明触发和自锁都正常。
      <span class="sub">A–K 正反都通 = 击穿；G–K 正反都不通 = 门极开路。都是换件。</span>
    </div>
  </div>

  <div class="bet" data-bet="c25b-scr" data-q="晶闸管已经导通了。这时把门极的触发信号撤掉，会怎么样？"
       data-opts="立刻关断|继续导通，直到阳极电流自己降到很小|变成半导通" data-right="1"
       data-after="继续导通。门极只负责「点火」，点着之后就管不着了——这正是它跟晶体管最大的区别（晶体管撤掉基极电流就立刻截止）。要关断只有一条路：把阳极电流降到维持电流以下，交流下靠过零自动完成。"></div>

  <div class="quiz" data-quiz="c2-5b">
    <div class="qz" data-q="一只硅二极管正常导通时，两端电压大约是多少？"
         data-opts="0 V|0.7 V|等于电源电压"
         data-right="1"
         data-why="约 0.7 V（硅管 0.6~0.8 V）。约 0 V 说明被短路了；等于电源电压说明它没通——要么接反了，要么已经开路损坏。这个 0.7 V 是判断的基准，要背下来。"></div>
    <div class="qz" data-q="12 V 交流经桥式整流<b>并加了滤波电容</b>，直流侧量出来约 15 V。这说明什么？"
         data-opts="变压器输出电压偏高，要换|正常，带电容滤波本来就是 1.2~1.4 倍|滤波电容击穿了"
         data-right="1"
         data-why="正常。电容把波谷填平，直流读数被拉到接近交流峰值（1.41×U₂ = 17 V），带上负载后回落到 1.2 倍（约 14~15 V）。反过来，如果只读到 10.8 V 且纹波很大，那才是电容容量掉了。"></div>
    <div class="qz" data-q="在电工控制电路里，晶体管绝大多数时候工作在哪个状态？"
         data-opts="放大区，做信号放大|饱和与截止两个状态，当开关用|击穿区"
         data-right="1"
         data-why="当开关用（饱和=闭合、截止=断开）。PLC 的晶体管输出、驱动继电器和指示灯都是这个用法。放大区是电子专业的活。而且当开关用时基极电流要给足，半开半关时管子自身发热最厉害。"></div>
    <div class="qz" data-q="固态继电器（SSR）关断之后，能不能把它当作检修用的隔离开关？"
         data-opts="能，关断就等于断开|不能，关断状态仍有漏电流，必须另外断开真正的开关|能，但要等 5 分钟"
         data-right="1"
         data-why="不能。SSR 里面是晶闸管，关断状态下仍有毫安级漏电流，负载端并没有真正与电源断开。检修必须切断上级的断路器或隔离开关，并按规矩验电、挂牌。这一条是安全底线。"></div>
  </div>

  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 2 章 2.5 节后半（书内 P37~P41）<br>下一节讲变压器</div>
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

/* ================================================================
   共用小零件
   ================================================================ */
/* 二极管符号（原理图那一套）：三角形 + 一根竖杠。
   竖杠那头是阴极 K —— 这一节反复在讲这件事，所以符号必须画准。
   画在导线上面，导线本身照旧连着（三角是实心的，盖得住）。 */
function dSymAt(g, s, o){
  o = o || {};
  const col = o.color || C.wire;
  g.save();
  g.fillStyle = col; g.strokeStyle = col; g.lineJoin = 'round'; g.lineCap = 'round';
  g.beginPath();
  g.moveTo(-s, -s*0.86); g.lineTo(s, 0); g.lineTo(-s, s*0.86); g.closePath(); g.fill();
  g.lineWidth = 2.6;
  g.beginPath(); g.moveTo(s, -s*0.98); g.lineTo(s, s*0.98); g.stroke();
  g.restore();
}
/* 摆在 (x,y)，dir=1 指向 +x，dir=-1 指向 −x */
function dSym(g, x, y, s, dir, o){
  g.save(); g.translate(x, y); if(dir < 0) g.scale(-1, 1);
  dSymAt(g, s, o); g.restore();
}
/* 摆在一条线段的中点，指向 p1→p2（桥式那四只斜着的管用它） */
function dEdge(g, x1, y1, x2, y2, s, o){
  g.save();
  g.translate((x1+x2)/2, (y1+y2)/2);
  g.rotate(Math.atan2(y2-y1, x2-x1));
  dSymAt(g, s, o); g.restore();
}
/* 画一个带零位基准线的图框，返回零位的 y。zero 是零位在框里的相对高度 */
function plot(g, x, y, w, h, zero){
  box(g, x, y, w, h, 4, C.box, C.boxLine, 1);
  const zy = y + h*(zero == null ? 0.5 : zero);
  g.save(); g.strokeStyle = C.boxLine; g.lineWidth = 1;
  g.beginPath(); g.moveTo(x, zy); g.lineTo(x+w, zy); g.stroke(); g.restore();
  return zy;
}
/* 按采样点画一条曲线。fn(u) 传入 0~1 的横向进度，返回 −1~1 的纵向值 */
function curve(g, x, y, w, zy, amp, fn, o){
  o = o || {};
  const n = o.n || 200;
  g.save();
  g.strokeStyle = o.color || C.acc; g.lineWidth = o.lw || 2;
  g.lineJoin = 'round'; g.lineCap = 'round';
  if(o.dash) g.setLineDash(o.dash);
  g.beginPath();
  for(let i = 0; i <= n; i++){
    const u = i/n, px = x + u*w, py = zy - fn(u)*amp;
    i ? g.lineTo(px, py) : g.moveTo(px, py);
  }
  g.stroke(); g.restore();
}

/* ================================================================
   场景 1：二极管的单向导电
   ================================================================
   E = 12 V，灯 60 Ω（12V/0.2A）。硅管压降 0.7 V、锗管 0.3 V。
   反向：取 5 μA 的反向漏电流 —— 不写 0 是因为「几乎不导电」比「完全不导电」准，
   而且这样灯上的分压确实约等于 0，二极管两端就是整个电源电压。 */
const E1 = 12, RL1 = 60, ILED = 0.2;
const S1 = { fwd:true, si:true };
const st1 = new Stage('cv0', 360, 356);

function s1calc(){
  const uf = S1.si ? 0.7 : 0.3;
  if(S1.fwd){ const i = (E1 - uf)/RL1; return {ud:uf, i:i, ul:i*RL1}; }
  const i = 5e-6;
  return {ud:E1 - i*RL1, i:i, ul:i*RL1};
}

function draw1(){
  const g = st1.g; st1.clear();
  const r = s1calc();
  const b = Math.min(1, r.i/ILED);

  EP.heading(g, 20, 16, '二极管接在灯的回路里', 'E = 12 V　灯 60 Ω');

  const XL = 44, XR = 306, YT = 104, YB = 182;
  g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.8; g.lineCap = 'round';
  g.beginPath();
  g.moveTo(XL, 119); g.lineTo(XL, YT); g.lineTo(XR, YT);
  g.lineTo(XR, YB); g.lineTo(XL, YB); g.lineTo(XL, 165);
  g.stroke(); g.restore();

  EP.cell(g, XL, 142, 46, 24, {horiz:false, volt:'12V'});
  txt(g, '＋', XL+20, 122, {sz:11, b:1, c:C.err, al:'left'});
  txt(g, '−',  XL+20, 162, {sz:13, b:1, c:C.tx2, al:'left'});

  /* 电流：只有正向才有得看 */
  if(S1.fwd){
    const p = new Path([[XL,119],[XL,YT],[XR,YT],[XR,YB],[XL,YB],[XL,165]]);
    EP.flow(g, p, {phase:(Date.now()/14)%1000, gap:52, kind:'cur', size:5});
  }

  /* 二极管：正向时三角指向电流方向（顺时针，即 +x） */
  dSym(g, 152, YT, 11, S1.fwd ? 1 : -1, {color: S1.fwd ? C.ok : C.tx3});
  txt(g, S1.fwd ? '正向接' : '反向接', 152, YT - 22,
      {sz:10.5, b:1, c: S1.fwd ? C.ok : C.err});
  txt(g, 'A', 152 - (S1.fwd ? 20 : -20), YT + 18, {sz:10, b:1, c:C.tx2});
  txt(g, 'K', 152 + (S1.fwd ? 20 : -20), YT + 18, {sz:10, b:1, c:C.tx2});

  /* 灯 */
  EP.lampHolder(g, 252, YT - 6, 22, 12);
  EP.bulb(g, 252, YT - 12 - 16, 16, b);
  txt(g, b > 0.02 ? '亮' : '灭', 252, YT + 18, {sz:10.5, b:1, c: b > 0.02 ? C.lamp : C.tx3});

  /* 两处读数摆在电路两侧的空地上，不压元件 */
  EP.callout(g, 152, YT + 9, 96, 148,
    r.ud.toFixed(2) + ' V', '二极管两端', {color: S1.fwd ? C.ok : C.err, al:'left'});
  EP.callout(g, 252, YT + 9, 240, 148,
    r.ul.toFixed(2) + ' V', '灯两端', {color:C.acc, al:'left'});

  /* 结论条 */
  const okc = S1.fwd;
  box(g, 20, 196, 320, 30, 6, okc ? C.okbg : C.errbg, okc ? C.ok : C.err, 1);
  txt(g, okc
      ? '导通：电流 ' + (r.i*1000).toFixed(0) + ' mA，管子只吃掉 ' + r.ud.toFixed(1) + ' V'
      : '截止：电流几乎为 0，12 V 几乎全压在二极管身上',
      180, 211, {sz:11, b:1, c: okc ? C.ok : C.err});

  /* ---- 下半：符号 ↔ 实物 ---- */
  EP.heading(g, 20, 246, '符号上那根竖杠，就是实物上那圈银环');
  box(g, 20, 258, 320, 82, 6, C.card, C.boxLine, 1);
  EP.diode(g, 150, 292, {len:52, dia:20, flip:false});
  txt(g, '阳极 A', 150 - 42, 292, {sz:10, b:1, c:C.tx2, al:'right'});
  txt(g, '阴极 K', 150 + 42, 292, {sz:10, b:1, c:C.acc, al:'left'});
  txt(g, '银环这头', 150 + 42, 306, {sz:9, c:C.tx3, al:'left'});
  dSym(g, 256, 292, 11, 1);
  txt(g, '同一只管子的原理图画法', 180, 326, {sz:9.5, c:C.tx3});
}

function note1(){
  const r = s1calc();
  $('s1a').textContent = r.ud.toFixed(2) + ' V';
  $('s1b').textContent = S1.fwd ? (r.i*1000).toFixed(0) + ' mA' : '≈ 0';
  $('s1c').textContent = S1.fwd ? '亮' : '灭';
  const mat = S1.si ? '硅' : '锗';
  $('n0').innerHTML = S1.fwd
    ? '<div class="st good">正向接：通了</div>' +
      '电源＋ → 阳极 A 进、阴极 K 出 → 回到电源−，方向对上了，管子导通。<br>' +
      '<b>但它自己要吃掉 ' + r.ud.toFixed(1) + ' V</b>（' + mat + '管的正向压降），' +
      '剩下的 ' + r.ul.toFixed(2) + ' V 才落到灯上，电流 ' + (r.i*1000).toFixed(0) + ' mA。<br>' +
      '<span class="sub">换成' + (S1.si ? '锗管压降只有 0.3 V，灯会稍微亮一点点' :
        '硅管压降 0.7 V，灯会稍微暗一点点') + ' —— 这点差别在 12 V 上不明显，' +
      '但在 1.5 V 的低压电路里就很要命了。</span>'
    : '<div class="st bad">反向接：堵死了</div>' +
      '三角形指着电源＋那一侧，电流想走的方向正好顶在那根竖杠上，过不去。<br>' +
      '<b>回路里几乎没有电流，灯上就几乎没有分压 —— 于是整整 12 V 全压在二极管两端。</b><br>' +
      '<span class="sub">这就是为什么选管必须看<b>最高反向耐压</b>：' +
      '它平时不干活的时候，反而是整个回路里承受电压最高的那个元件。' +
      '这里才 12 V，接到 220 V 上就是三百多伏的峰值。</span>';
}
document.getElementById('s1d').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S1.fwd = b.dataset.k === '1';
  document.querySelectorAll('#s1d .btn').forEach(function(t){
    t.classList.toggle('on', (t.dataset.k === '1') === S1.fwd);
  });
  note1();
});
document.getElementById('s1t').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S1.si = b.dataset.k === '0';
  document.querySelectorAll('#s1t .btn').forEach(function(t){
    t.classList.toggle('on', (t.dataset.k === '0') === S1.si);
  });
  note1();
});

/* ================================================================
   场景 2：整流
   ================================================================
   三档都按**画出来的那条曲线现算平均值**，所以图和数字卡永远对得上，
   不会出现「文案写死一个 0.9 而图上不是那样」的毛病。
   数学上：半波平均 = 1/π×峰值 = 0.45×U2，全波 = 2/π×峰值 = 0.9×U2 —— 跑出来正好是这两个数。
   电容滤波那档 τ 取 2.0 个半周（约 20 ms @50Hz，中等负载的量级），
   平均值落在 1.2×U2 附近；空载时会更靠近峰值 1.41×U2，这一条文案里写清楚了。 */
const S2 = { mode:0, u2:12 };
const st2 = new Stage('cv1', 360, 392);
const NW = 240;                        /* 波形采样点数，4π（两个周期）分成这么多份 */

function s2wave(){
  const arr = new Array(NW+1);
  const m = S2.mode;
  if(m < 2){
    for(let i = 0; i <= NW; i++){
      const s = Math.sin(i/NW * 4*Math.PI);
      arr[i] = (m === 0) ? Math.max(0, s) : Math.abs(s);
    }
  } else {
    const dec = Math.exp(-4/(2.0*NW));  /* 每个采样点的衰减，τ = 2.0 个半周 */
    let v = 0;
    /* 跑两圈：第一圈让电容电压稳下来，第二圈才取值。
       只跑一圈的话开头那一段是从 0 爬上来的暂态，平均值会偏低。 */
    for(let pass = 0; pass < 2; pass++){
      for(let i = 0; i <= NW; i++){
        const s = Math.abs(Math.sin(i/NW * 4*Math.PI));
        v = Math.max(s, v*dec);
        if(pass) arr[i] = v;
      }
    }
  }
  return arr;
}
function s2avg(arr){
  let s = 0; for(let i = 0; i < NW; i++) s += arr[i];
  return s/NW;
}

function draw2(){
  const g = st2.g; st2.clear();
  const m = S2.mode, U2 = S2.u2, pk = U2*Math.SQRT2;
  const arr = s2wave(), mean = s2avg(arr), dc = mean*pk;
  const name = ['半波整流', '桥式全波整流', '桥式整流 ＋ 滤波电容'][m];
  EP.heading(g, 20, 16, name, 'U₂ = ' + U2 + ' V（变压器副边，交流有效值）');

  const SX = 56, SY = 108;
  g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.6; g.lineCap = 'round'; g.lineJoin = 'round';

  if(m === 0){
    /* ---- 半波：一只管 ---- */
    g.beginPath();
    g.moveTo(SX, SY-17); g.lineTo(SX, 62); g.lineTo(300, 62);
    g.moveTo(SX, SY+17); g.lineTo(SX, 156); g.lineTo(300, 156);
    g.moveTo(300, 62); g.lineTo(300, 89);
    g.moveTo(300, 129); g.lineTo(300, 156);
    g.stroke(); g.restore();
    dSym(g, 160, 62, 12, 1, {color:C.ok});
    txt(g, 'A', 140, 78, {sz:9.5, b:1, c:C.tx2});
    txt(g, 'K', 180, 78, {sz:9.5, b:1, c:C.tx2});
    EC.resistor(g, 300, 109, {horiz:false, len:40, w:16});
    txt(g, '负载', 280, 103, {sz:10, b:1, c:C.tx2, al:'right'});
    txt(g, 'R', 280, 116, {sz:9.5, c:C.tx3, al:'right'});
  } else {
    /* ---- 桥式：四只管摆成菱形 ---- */
    const CXB = 176, CYB = 109, TN = 69, BN = 149, LN = 136, RN = 216;
    g.beginPath();
    g.moveTo(SX, SY-17); g.lineTo(SX, 62); g.lineTo(LN, 62); g.lineTo(LN, CYB);
    g.moveTo(SX, SY+17); g.lineTo(SX, 176); g.lineTo(RN, 176); g.lineTo(RN, CYB);
    /* 菱形四条边 */
    g.moveTo(LN, CYB); g.lineTo(CXB, TN); g.lineTo(RN, CYB);
    g.moveTo(LN, CYB); g.lineTo(CXB, BN); g.lineTo(RN, CYB);
    /* 直流两条母线 */
    g.moveTo(CXB, TN); g.lineTo(CXB, 44); g.lineTo(300, 44); g.lineTo(300, 89);
    g.moveTo(CXB, BN); g.lineTo(CXB, 190); g.lineTo(300, 190); g.lineTo(300, 129);
    g.stroke(); g.restore();
    dEdge(g, LN, CYB, CXB, TN, 10, {color:C.ok});
    dEdge(g, RN, CYB, CXB, TN, 10, {color:C.ok});
    dEdge(g, CXB, BN, LN, CYB, 10, {color:C.ok});
    dEdge(g, CXB, BN, RN, CYB, 10, {color:C.ok});
    EC.node(g, CXB, TN); EC.node(g, CXB, BN);
    EC.node(g, LN, CYB); EC.node(g, RN, CYB);
    txt(g, '＋', CXB + 12, TN - 6, {sz:12, b:1, c:C.err, al:'left'});
    txt(g, '−',  CXB + 12, BN + 6, {sz:14, b:1, c:C.tx2, al:'left'});
    txt(g, '～', LN - 10, CYB, {sz:11, b:1, c:C.tx2, al:'right'});
    txt(g, '～', RN + 10, CYB, {sz:11, b:1, c:C.tx2, al:'left'});
    EC.resistor(g, 300, 109, {horiz:false, len:40, w:16});
    /* 负载的名字放电阻**上方**：放左边会跟滤波电容的极板撞上（截图抓到的） */
    txt(g, '负载 R', 300, 78, {sz:10, b:1, c:C.tx2});
    if(m === 2){
      /* 滤波电容跨在两条直流母线上 */
      g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.6; g.lineCap = 'round';
      g.beginPath();
      g.moveTo(258, 44); g.lineTo(258, 104);
      g.moveTo(258, 114); g.lineTo(258, 190);
      g.stroke();
      g.lineWidth = 3.2; g.lineCap = 'butt';
      g.beginPath(); g.moveTo(244, 104); g.lineTo(272, 104); g.stroke();
      g.beginPath(); g.moveTo(244, 114); g.lineTo(272, 114); g.stroke();
      g.restore();
      /* 名字放极板下方 —— 放左边正好撞上右边那个「～」 */
      txt(g, '滤波电容 C', 258, 130, {sz:9.5, b:1, c:C.acc});
    }
  }
  /* 交流源符号：圆圈里一段正弦 */
  g.save();
  g.strokeStyle = C.wire; g.lineWidth = 2;
  g.beginPath(); g.arc(SX, SY, 17, 0, Math.PI*2); g.stroke();
  g.beginPath();
  for(let i = 0; i <= 24; i++){
    const px = SX - 10 + i*(20/24), py = SY - Math.sin(i/24*Math.PI*2)*6;
    i ? g.lineTo(px, py) : g.moveTo(px, py);
  }
  g.stroke(); g.restore();
  /* 标注摆在源的**右边**：放正下方会被底下那根回流导线穿过去。
     「变压器副边」那一行删了并进标题 —— 它伸出去正好撞上桥式左边那个「～」（截图抓到的） */
  txt(g, U2 + ' V～', SX + 24, SY, {sz:10.5, b:1, c:C.tx2, al:'left'});

  /* ---- 波形 ---- */
  const PX = 24, PY = 200, PW = 312, PH = 128;
  const zy = plot(g, PX, PY, PW, PH);
  const amp = PH*0.42;
  curve(g, PX, PY, PW, zy, amp, function(u){ return Math.sin(u*4*Math.PI); },
        {color:C.tx3, lw:1.4, dash:[4,3], n:NW});
  curve(g, PX, PY, PW, zy, amp, function(u){ return arr[Math.round(u*NW)]; },
        {color:C.acc, lw:2.4, n:NW});
  g.save();
  g.strokeStyle = C.ok; g.lineWidth = 1.6; g.setLineDash([5,4]);
  g.beginPath(); g.moveTo(PX, zy - mean*amp); g.lineTo(PX+PW, zy - mean*amp); g.stroke();
  g.restore();
  /* 这行说明只能放**左下角**：右上角在滤波档会被输出曲线压住、
     正下方会被输入正弦的负半周穿过去，左下角三档都是空的（都截图看过） */
  txt(g, '两个周期（50 Hz 下约 40 ms）', PX+8, PY+PH-9, {sz:9, c:C.tx3, al:'left'});

  /* ---- 结论条 ---- */
  box(g, 20, 338, 320, 30, 6, C.accbg, C.acc, 1);
  txt(g, '输出直流 ' + dc.toFixed(1) + ' V　=　' + (dc/U2).toFixed(2) + ' × U₂',
      180, 353, {sz:11, b:1, c:C.acc});
  EC.stripLegend(g, 32, 382, [['输入交流', C.tx3], ['整流输出', C.acc], ['直流平均值', C.ok]]);
}

function note2(){
  const U2 = S2.u2, arr = s2wave(), mean = s2avg(arr), dc = mean*U2*Math.SQRT2;
  $('s2ulab').textContent = U2 + ' V';
  $('s2a').textContent = U2 + ' V';
  $('s2b').textContent = dc.toFixed(1) + ' V';
  $('s2c').textContent = (dc/U2).toFixed(2);
  const m = S2.mode;
  $('n1').innerHTML = m === 0
    ? '<div class="st">半波：只放行一半</div>' +
      '二极管把负半周整个挡掉了，输出是<b>一串孤零零的小山包，中间隔着一段完全没电的空白</b>。<br>' +
      '平均下来只有 <b>' + dc.toFixed(1) + ' V</b>（= 0.45 × ' + U2 + '）。<br>' +
      '<span class="sub">优点是只要一只管、最省；缺点是电压低、脉动大，' +
      '只在要求很低的地方用（比如给一个指示灯供电）。</span>'
    : m === 1
    ? '<div class="st good">桥式全波：负半周被翻上来了</div>' +
      '四只管两两轮流导通：<b>正半周走一对，负半周走另一对</b>，' +
      '不管进来的是正是负，流过负载的方向始终一样。<br>' +
      '空白被填上了，平均值正好翻一倍：<b>' + dc.toFixed(1) + ' V</b>（= 0.9 × ' + U2 + '）。<br>' +
      '<span class="sub">但它还是一鼓一鼓的（每 10 ms 一个包），' +
      '直接拿去给 PLC 供电是不行的 —— 还差最后一步。</span>'
    : '<div class="st good">加一只电容，波谷就被填平了</div>' +
      '电容在波峰时充满，波谷时<b>顶上来供电</b>，于是输出被抬到峰值附近、' +
      '只剩一点小起伏（叫<b>纹波</b>）。<br>' +
      '现在是 <b>' + dc.toFixed(1) + ' V</b>，约 <b>' + (dc/U2).toFixed(2) + ' × U₂</b>。<br>' +
      '<span class="sub">这个倍数跟负载轻重有关：<b>负载越轻越靠近峰值 1.41 倍</b>，' +
      '越重越往 0.9 倍掉。所以手册上写「约 1.2 倍」是个中等负载下的经验值，不是定死的常数。' +
      '这里演示的就是中等负载。</span>';
}
document.getElementById('s2m').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S2.mode = +b.dataset.k;
  document.querySelectorAll('#s2m .btn').forEach(function(t){
    t.classList.toggle('on', +t.dataset.k === S2.mode);
  });
  note2(); draw2();
});
$('s2u').addEventListener('input', function(){ S2.u2 = +this.value; note2(); draw2(); });

/* ================================================================
   场景 3：晶体管 / 场效应管
   ================================================================
   BJT：Vcc = 12 V、负载 100 Ω、β = 100、饱和压降 Uces = 0.3 V。
        饱和电流 Ic(sat) = (12 − 0.3)/100 = 117 mA，对应 Ib(sat) = 1.17 mA。
   MOSFET：N 沟道增强型，阈值 Uth = 4 V，Id = k(Ugs−Uth)²、k = 13 mA/V²，
        算出来 Ugs = 7 V 时正好 117 mA 到顶 —— 跟 BJT 用同一个负载，两边好横着比。
   **区名故意分开写**：BJT 用「截止 / 放大 / 饱和」是标准叫法；
   MOSFET 的「饱和区」指的却是恒流那一段，跟 BJT 正好反过来 ——
   混着教必错，所以场效应管这边一律说「截止 / 过渡 / 完全导通」，不碰那两个词。 */
const VCC = 12, RC = 100, BETA = 100, UCES = 0.3;
const ISAT = (VCC - UCES)/RC*1000;          /* mA */
const UTH = 4, KFET = 13;
const S3 = { fet:false, v:20, lastB:'', lastC:'' };
const st3 = new Stage('cv2', 360, 380);

function s3calc(){
  if(!S3.fet){
    const ib = S3.v/100;                     /* 0 ~ 2.00 mA */
    const lin = BETA*ib;
    const ic = Math.min(lin, ISAT);
    return {x:ib, xs:ib.toFixed(2)+' mA', i:ic, uce:VCC - ic*RC/1000,
            zone: ib <= 0 ? 0 : (lin < ISAT ? 1 : 2)};
  }
  const ug = S3.v/20;                        /* 0 ~ 10.0 V */
  const lin = ug > UTH ? KFET*(ug-UTH)*(ug-UTH) : 0;
  const id = Math.min(lin, ISAT);
  return {x:ug, xs:ug.toFixed(1)+' V', i:id, uce:VCC - id*RC/1000,
          zone: lin <= 0 ? 0 : (lin < ISAT ? 1 : 2)};
}
const ZN = [['截止', '截止'], ['放大区', '过渡'], ['饱和', '完全导通']];

function draw3(){
  const g = st3.g; st3.clear();
  const r = s3calc();
  const fet = S3.fet;
  const zc = [C.tx3, C.warn, C.ok][r.zone];
  EP.heading(g, 20, 16, fet ? '场效应管当开关（N 沟道增强型）' : '晶体管当开关（NPN）',
             'Vcc = 12 V　负载 100 Ω');

  /* ---- 电路 ---- */
  const TOP = 46, BOT = 178, XC = 304, XB = 282;
  g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.6; g.lineCap = 'round'; g.lineJoin = 'round';
  g.beginPath();
  g.moveTo(196, TOP); g.lineTo(XC, TOP); g.lineTo(XC, 106);
  g.moveTo(196, BOT); g.lineTo(XC, BOT); g.lineTo(XC, 162);
  g.stroke(); g.restore();
  txt(g, '＋12 V', 192, TOP, {sz:10.5, b:1, c:C.err, al:'right'});
  txt(g, '0 V', 192, BOT, {sz:10.5, b:1, c:C.tx2, al:'right'});
  /* 负载灯直接画在导线上（符号版的灯是实心圆，盖得住线） */
  EC.lamp(g, XC, 76, 14, Math.min(1, r.i/ISAT));
  txt(g, '负载', XC - 22, 70, {sz:10, b:1, c:C.tx2, al:'right'});
  txt(g, '100 Ω', XC - 22, 83, {sz:9.5, c:C.tx3, al:'right'});

  g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.6; g.lineCap = 'round'; g.lineJoin = 'round';
  if(!fet){
    /* NPN：竖杠 + 两条斜引线，发射极带朝外的箭头 */
    g.beginPath(); g.moveTo(XB, 118); g.lineTo(XB, 150); g.stroke();
    g.lineWidth = 2.4;
    g.beginPath(); g.moveTo(XB, 124); g.lineTo(XC, 106); g.stroke();
    g.beginPath(); g.moveTo(XB, 144); g.lineTo(XC, 162); g.stroke();
    g.beginPath(); g.moveTo(240, 134); g.lineTo(XB, 134); g.stroke();
    g.restore();
    EC.head(g, XC-6, 158, XC-XB, 162-144, 6.5, C.wire);   /* 箭头朝外 = NPN */
    txt(g, 'b', 244, 122, {sz:10, b:1, c:C.acc, al:'left'});
    txt(g, 'c', XC+8, 104, {sz:10, b:1, c:C.tx2, al:'left'});
    txt(g, 'e', XC+8, 164, {sz:10, b:1, c:C.tx2, al:'left'});
  } else {
    /* N 沟道增强型：栅极一条竖线（不接触）+ 沟道三小段 + 衬底箭头指向沟道 */
    g.beginPath(); g.moveTo(270, 120); g.lineTo(270, 148); g.stroke();
    g.beginPath(); g.moveTo(240, 134); g.lineTo(270, 134); g.stroke();
    g.lineWidth = 2.8;
    g.beginPath();
    g.moveTo(XB, 117); g.lineTo(XB, 127);
    g.moveTo(XB, 129); g.lineTo(XB, 139);
    g.moveTo(XB, 141); g.lineTo(XB, 151);
    g.stroke();
    g.lineWidth = 2.4;
    g.beginPath(); g.moveTo(XB, 122); g.lineTo(XC, 106); g.stroke();
    g.beginPath(); g.moveTo(XB, 146); g.lineTo(XC, 162); g.stroke();
    g.beginPath(); g.moveTo(294, 134); g.lineTo(XB+3, 134); g.stroke();
    g.beginPath(); g.moveTo(294, 134); g.lineTo(294, 158); g.stroke();
    g.restore();
    EC.head(g, XB+3, 134, -1, 0, 6, C.wire);
    txt(g, 'G', 244, 122, {sz:10, b:1, c:C.acc, al:'left'});
    txt(g, 'D', XC+8, 104, {sz:10, b:1, c:C.tx2, al:'left'});
    txt(g, 'S', XC+8, 166, {sz:10, b:1, c:C.tx2, al:'left'});
  }

  /* 控制端那一块 */
  box(g, 24, 108, 120, 52, 6, C.accbg, C.acc, 1);
  txt(g, fet ? '栅极电压 U' : '基极电流 I', 84, 124, {sz:10, c:C.tx2});
  txt(g, r.xs, 84, 143, {sz:14, b:1, c:C.acc});
  g.save(); g.strokeStyle = C.acc; g.lineWidth = 2; g.setLineDash([4,3]);
  g.beginPath(); g.moveTo(144, 134); g.lineTo(238, 134); g.stroke(); g.restore();
  if(fet) txt(g, '几乎不吃电流', 191, 122, {sz:9, c:C.tx3});

  /* 结论条 */
  box(g, 20, 190, 320, 30, 6, C.box, zc, 1);
  txt(g, ZN[r.zone][fet?1:0] + '　·　负载电流 ' + r.i.toFixed(0) +
        ' mA　·　管子两端 ' + r.uce.toFixed(2) + ' V',
      180, 205, {sz:11, b:1, c:zc});

  /* ---- 特性曲线 ---- */
  /* 框底留出 32px 专门放区名：曲线画到框底的话，当前点那颗圆点和它的虚引线
     会正好压在区名上（截图抓到的） */
  const PX = 24, PY = 232, PW = 312, PH = 124;
  box(g, PX, PY, PW, PH, 4, C.box, C.boxLine, 1);
  const xmax = fet ? 10 : 2, ymax = 130;
  const gx = function(v){ return PX + 10 + v/xmax*(PW-24); };
  const gy = function(v){ return PY + PH - 32 - v/ymax*(PH-48); };
  g.save(); g.strokeStyle = C.tx3; g.lineWidth = 1; g.setLineDash([4,3]);
  g.beginPath(); g.moveTo(PX+6, gy(ISAT)); g.lineTo(PX+PW-6, gy(ISAT)); g.stroke(); g.restore();
  txt(g, '被负载卡死在 ' + ISAT.toFixed(0) + ' mA', PX+PW-10, gy(ISAT)-9,
      {sz:9, c:C.tx3, al:'right'});
  g.save();
  g.strokeStyle = C.acc; g.lineWidth = 2.2; g.lineJoin = 'round';
  g.beginPath();
  for(let i = 0; i <= 120; i++){
    const v = i/120*xmax;
    const lin = fet ? (v > UTH ? KFET*(v-UTH)*(v-UTH) : 0) : BETA*v;
    const yy = Math.min(lin, ISAT);
    i ? g.lineTo(gx(v), gy(yy)) : g.moveTo(gx(v), gy(yy));
  }
  g.stroke(); g.restore();
  g.save(); g.fillStyle = zc;
  g.beginPath(); g.arc(gx(r.x), gy(r.i), 4.5, 0, Math.PI*2); g.fill();
  g.strokeStyle = zc; g.lineWidth = 1; g.setLineDash([3,3]);
  g.beginPath(); g.moveTo(gx(r.x), gy(r.i)); g.lineTo(gx(r.x), gy(0)); g.stroke();
  g.restore();
  txt(g, fet ? '栅极电压 U（V）' : '基极电流 I（mA）', PX+PW/2, PY+PH-7, {sz:9, c:C.tx3});
  txt(g, fet ? '漏极电流（mA）' : '集电极电流（mA）', PX+8, PY+10, {sz:9, c:C.tx3, al:'left'});

  const xa = fet ? UTH : 0.001, xb = fet ? UTH + Math.sqrt(ISAT/KFET) : ISAT/BETA;
  g.save(); g.strokeStyle = C.boxLine; g.lineWidth = 1; g.setLineDash([2,3]);
  [xa, xb].forEach(function(v){
    g.beginPath(); g.moveTo(gx(v), PY+6); g.lineTo(gx(v), PY+PH-8); g.stroke();
  });
  g.restore();
  /* 区名放在**框底**：放顶上会跟纵轴名字和「被负载卡死在…」那行撞成一团（截图抓到的）。
     另外太窄的区不写名字 —— 晶体管的截止区只有 Ib=0 那一个点，
     硬写的话文字会从框左边溢出去。 */
  [[0, gx(0), gx(xa), C.tx3], [1, gx(xa), gx(xb), C.warn], [2, gx(xb), gx(xmax), C.ok]]
    .forEach(function(z){
      if(z[2] - z[1] < 44) return;
      txt(g, ZN[z[0]][fet?1:0], (z[1]+z[2])/2, PY+PH-20, {sz:9, c:z[3]});
    });

  /* 每帧在变的量，必须每帧写数字卡 —— 只在 note 里写一次的话，
     卡片会冻住而画布一直在动，同一个数在一屏里出现两遍且对不上（2.4/2.5a 都栽过） */
  const bt = r.i.toFixed(0) + ' mA';
  if(bt !== S3.lastB){ S3.lastB = bt; $('s3b').textContent = bt; }
  const ct = ZN[r.zone][fet?1:0];
  if(ct !== S3.lastC){ S3.lastC = ct; $('s3c').textContent = ct; }
}

function note3(){
  const r = s3calc(), fet = S3.fet;
  $('s3lab').innerHTML = (fet ? '栅极电压 U<sub>GS</sub>　' : '基极电流 I<sub>b</sub>　') +
                         '<b id="s3v">' + r.xs + '</b>';
  $('s3a').textContent = r.xs;
  const z = r.zone;
  $('n2').innerHTML = fet
    ? (z === 0
      ? '<div class="st">截止：栅极电压还没到阈值</div>' +
        '<b>U<sub>GS</sub> 低于阈值（这只管是 4 V）时，沟道根本没打开</b>，漏极和源极之间是断的。<br>' +
        '这时候整个 12 V 都压在管子两端，负载上没电。<br>' +
        '<span class="sub">注意左边那句「几乎不吃电流」—— 栅极是绝缘的，' +
        '给它加电压不用给电流，这是场效应管跟晶体管最根本的差别。</span>'
      : z === 1
      ? '<div class="st warn">过渡：半开半关，最危险的一段</div>' +
        '沟道开了一点点，电流 ' + r.i.toFixed(0) + ' mA，管子两端还剩 ' + r.uce.toFixed(2) + ' V。<br>' +
        '<b>管子自己身上的功率 = 电流 × 这个电压 = ' + (r.i*r.uce/1000).toFixed(2) + ' W</b> —— ' +
        '开关电路里最怕停在这一段，热全出在管子上。<br>' +
        '<span class="sub">所以驱动波形要<b>陡</b>，让它尽快穿过去。' +
        '变频器里那些管子一秒钟通断上万次，每次都得穿过这一段，这就是开关损耗。</span>'
      : '<div class="st good">完全导通：像一个很小的电阻</div>' +
        '栅极电压给足了，沟道全开，电流被<b>负载</b>卡在 ' + r.i.toFixed(0) + ' mA' +
        '（再加栅压也不涨了 —— 涨不动，因为 12 V ÷ 100 Ω 就这么多）。<br>' +
        '管子两端只剩 ' + r.uce.toFixed(2) + ' V。<b>真实的功率 MOS 管这个压降更小</b>，' +
        '导通电阻常常只有几毫欧，几十安培也才掉零点几伏。<br>' +
        '<span class="sub">这就是它能做大功率开关的原因：导通时几乎不发热。</span>')
    : (z === 0
      ? '<div class="st">截止：基极一点电流都没给</div>' +
        '<b>基极不给电流，集电极就一点电流都过不去</b>，管子相当于一个断开的开关。<br>' +
        '这时候 12 V 全压在集电极和发射极之间（U<sub>ce</sub> = 12 V），负载上没电。<br>' +
        '<span class="sub">把滑杆往右推一点点试试 —— 只要几十微安，灯就开始亮了。</span>'
      : z === 1
      ? '<div class="st warn">放大区：I<sub>c</sub> = β × I<sub>b</sub></div>' +
        '基极给 ' + r.xs + '，集电极就跑 <b>' + r.i.toFixed(0) + ' mA</b> —— ' +
        '正好是 <b>100 倍</b>（这只管的 β = 100）。<br>' +
        '管子两端还剩 ' + r.uce.toFixed(2) + ' V，它自己身上的功率是 ' +
        (r.i*r.uce/1000).toFixed(2) + ' W。<br>' +
        '<span class="sub"><b>当开关用的时候不要停在这一段</b>：' +
        '管子既没断开也没完全导通，发热最厉害。继续往右推，看它什么时候顶住不动。</span>'
      : '<div class="st good">饱和：顶住了，再给也不涨</div>' +
        '基极电流已经超过 ' + (ISAT/BETA).toFixed(2) + ' mA，' +
        '按 β=100 算本该有 ' + (BETA*r.x).toFixed(0) + ' mA，' +
        '<b>但回路里根本没有那么多电流可流</b> —— ' +
        '12 V ÷ 100 Ω = 120 mA 就是上限，实际 ' + r.i.toFixed(0) + ' mA。<br>' +
        '管子两端只剩 <b>' + r.uce.toFixed(2) + ' V</b>，相当于一个闭合的开关。<br>' +
        '<span class="sub">电工电路里就是要它待在这儿。而且基极电流要<b>比刚好饱和多给一倍以上</b>，' +
        '免得温度一变、批次一换，β 掉下去就退回放大区去发热。</span>');
}
document.getElementById('s3t').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  S3.fet = b.dataset.k === '1';
  document.querySelectorAll('#s3t .btn').forEach(function(t){
    t.classList.toggle('on', (t.dataset.k === '1') === S3.fet);
  });
  /* 两种管的滑杆刻度不一样，切过去给一个「刚好在中间那一段」的起点 */
  S3.v = S3.fet ? 110 : 20;
  $('s3s').value = S3.v;
  note3(); draw3();
});
$('s3s').addEventListener('input', function(){ S3.v = +this.value; note3(); draw3(); });

/* ================================================================
   场景 4：晶闸管移相调压
   ================================================================
   单向晶闸管、阻性负载、半波可控。α 是触发角（弧度）。
   有效值   Urms = U·√( [ (π−α) + sin(2α)/2 ] / (2π) )
   平均值   Uav  = √2·U·(1+cos α)/(2π)
   检查点：α=0 → Urms = 0.707U（半波正弦的有效值）、Uav = 0.45U（跟上一屏半波整流对得上）；
           α=90° → Urms = 0.5U，功率正好是 α=0 时的一半；α=180° → 0。
   灯取 220 V / 100 W，即 R = 484 Ω，P = Urms²/R。 */
const U4 = 220, RLAMP = 220*220/100;
const S4 = { a:90, t:0, run:true, lastY:'', lastZ:'' };
const st4 = new Stage('cv3', 360, 376);

function s4rms(aDeg){
  const a = aDeg*Math.PI/180;
  const k = ((Math.PI - a) + Math.sin(2*a)/2)/(2*Math.PI);
  return U4*Math.sqrt(Math.max(0, k));
}
function s4out(th){                     /* th 是弧度，返回 −1~1 的输出 */
  const a = S4.a*Math.PI/180;
  const loc = ((th % (2*Math.PI)) + 2*Math.PI) % (2*Math.PI);
  return (loc >= a && loc <= Math.PI) ? Math.sin(loc) : 0;
}

function draw4(dt){
  const g = st4.g; st4.clear();
  if(S4.run) S4.t = (S4.t + dt/4) % 1;    /* 4 秒扫完两个周期 */
  const rms = s4rms(S4.a), pw = rms*rms/RLAMP;
  const b = Math.min(1, pw/100);
  EP.heading(g, 20, 16, '晶闸管调压（单向、阻性负载）', '220 V～　100 W 灯');

  /* ---- 电路 ---- */
  const SX = 56, SY = 100, YT = 56, YB = 150, XR = 304;
  g.save(); g.strokeStyle = C.wire; g.lineWidth = 2.6; g.lineCap = 'round'; g.lineJoin = 'round';
  g.beginPath();
  g.moveTo(SX, SY-17); g.lineTo(SX, YT); g.lineTo(XR, YT); g.lineTo(XR, 88);
  g.moveTo(XR, 118); g.lineTo(XR, YB); g.lineTo(SX, YB); g.lineTo(SX, SY+17);
  g.stroke();
  /* 门极引线 */
  g.beginPath(); g.moveTo(172, 62); g.lineTo(186, 76); g.lineTo(186, 108); g.stroke();
  g.restore();
  /* 交流源 */
  g.save(); g.strokeStyle = C.wire; g.lineWidth = 2;
  g.beginPath(); g.arc(SX, SY, 17, 0, Math.PI*2); g.stroke();
  g.beginPath();
  for(let i = 0; i <= 24; i++){
    const px = SX - 10 + i*(20/24), py = SY - Math.sin(i/24*Math.PI*2)*6;
    i ? g.lineTo(px, py) : g.moveTo(px, py);
  }
  g.stroke(); g.restore();
  txt(g, '220 V～', SX, SY + 30, {sz:10.5, b:1, c:C.tx2});

  /* 晶闸管：二极管符号 + 一条门极引线 */
  const th = S4.t*4*Math.PI;
  const on = Math.abs(s4out(th)) > 1e-6;
  dSym(g, 160, YT, 12, 1, {color: on ? C.ok : C.tx3});
  txt(g, 'A', 138, 74, {sz:9.5, b:1, c:C.tx2});
  txt(g, 'K', 206, 74, {sz:9.5, b:1, c:C.tx2});
  txt(g, 'G', 196, 96, {sz:9.5, b:1, c:C.warn, al:'left'});
  box(g, 150, 110, 72, 26, 5, C.warnbg, C.warn, 1);
  txt(g, '门极触发', 186, 123, {sz:10, b:1, c:C.warn});

  EC.lamp(g, XR, 103, 15, b);
  txt(g, '100 W 灯', XR - 22, 103, {sz:10, b:1, c:C.tx2, al:'right'});

  if(on){
    const p = new Path([[SX,SY-17],[SX,YT],[XR,YT],[XR,88]]);
    EP.flow(g, p, {phase:(Date.now()/12)%1000, gap:48, kind:'cur', size:5});
  }

  /* ---- 波形 ---- */
  const PX = 24, PY = 172, PW = 312, PH = 128;
  const zy = plot(g, PX, PY, PW, PH);
  const amp = PH*0.40;
  const aRad = S4.a*Math.PI/180;
  /* 导通段填充 */
  g.save(); g.fillStyle = C.acc; g.globalAlpha = 0.20;
  g.beginPath(); g.moveTo(PX, zy);
  for(let i = 0; i <= 200; i++){
    const u = i/200;
    g.lineTo(PX + u*PW, zy - s4out(u*4*Math.PI)*amp);
  }
  g.lineTo(PX+PW, zy); g.closePath(); g.fill(); g.restore();
  curve(g, PX, PY, PW, zy, amp, function(u){ return Math.sin(u*4*Math.PI); },
        {color:C.tx3, lw:1.4, dash:[4,3], n:200});
  curve(g, PX, PY, PW, zy, amp, function(u){ return s4out(u*4*Math.PI); },
        {color:C.acc, lw:2.4, n:400});
  /* 门极脉冲：每个正半周开头 α 处一根小竖线 */
  g.save(); g.strokeStyle = C.warn; g.lineWidth = 2;
  [0, 1].forEach(function(k){
    const u = (aRad + k*2*Math.PI)/(4*Math.PI);
    if(u > 1) return;
    g.beginPath();
    g.moveTo(PX + u*PW, zy + amp*0.62); g.lineTo(PX + u*PW, zy + amp*0.30);
    g.stroke();
  });
  g.restore();
  txt(g, '↑ 门极只在这两处各点一下', PX + 8, zy + amp*0.78, {sz:9, c:C.warn, al:'left'});
  /* 走针 */
  g.save(); g.strokeStyle = C.err; g.lineWidth = 1.4;
  g.beginPath(); g.moveTo(PX + S4.t*PW, PY+3); g.lineTo(PX + S4.t*PW, PY+PH-3); g.stroke();
  g.restore();
  tag(g, on ? '导通' : '阻断', PX + S4.t*PW, PY + 12,
      {sz:9.5, b:1, c: on ? C.ok : C.tx3,
       fill: on ? C.okbg : C.box, line: on ? C.ok : C.boxLine});

  /* ---- 结论条 ---- */
  box(g, 20, 310, 320, 30, 6, C.accbg, C.acc, 1);
  txt(g, 'α = ' + S4.a + '°　→　灯上有效值 ' + rms.toFixed(0) +
        ' V　→　实际功率 ' + pw.toFixed(1) + ' W',
      180, 325, {sz:11, b:1, c:C.acc});
  EC.stripLegend(g, 32, 358, [['电源电压', C.tx3], ['灯上的电压', C.acc], ['门极脉冲', C.warn]]);

  /* 每帧写数字卡：走针在动、状态在变，卡片不能冻着 */
  const yt = rms.toFixed(0) + ' V';
  if(yt !== S4.lastY){ S4.lastY = yt; $('s4y').textContent = yt; }
  const zt = pw.toFixed(1) + ' W';
  if(zt !== S4.lastZ){ S4.lastZ = zt; $('s4z').textContent = zt; }
}

function note4(){
  const rms = s4rms(S4.a), pw = rms*rms/RLAMP, full = s4rms(0);
  $('s4alab').textContent = S4.a + '°';
  $('s4x').textContent = S4.a + '°';
  const pct = pw/(full*full/RLAMP)*100;
  $('n3').innerHTML =
    '<div class="st' + (S4.a < 30 ? ' good' : (S4.a > 130 ? '' : ' warn')) + '">' +
      '触发角 α = ' + S4.a + '°</div>' +
    '每个正半周走到 <b>' + S4.a + '°</b> 的时候，门极点这一下，管子导通；' +
    '<b>之后门极就不管了</b>，它一直通到电压过零才自己关断。<br>' +
    '通的那一段越短，灯得到的能量越少：现在灯上有效值 <b>' + rms.toFixed(0) + ' V</b>、' +
    '实际功率 <b>' + pw.toFixed(1) + ' W</b>，' +
    '是「点得最早（α=0）」时的 <b>' + pct.toFixed(0) + '%</b>。<br>' +
    (S4.a < 30
      ? '<span class="sub">注意即使 α=0，灯也只有 50 W —— 因为<b>负半周整个被丢掉了</b>，' +
        '单向晶闸管天生只能用一半。真正的调光器用双向晶闸管，两个半周都调。</span>'
      : S4.a > 130
      ? '<span class="sub">点得太晚，正半周快结束了才通上，灯几乎不亮。' +
        'α 再往 180° 去就完全不导通了。</span>'
      : '<span class="sub">α = 90° 是个好记的点：<b>功率正好是 α=0 时的一半</b>。' +
        '把滑杆两头拖一拖，看波形里被填蓝的那块面积怎么变。</span>');
}
$('s4a').addEventListener('input', function(){ S4.a = +this.value; note4(); });
document.getElementById('s4b').addEventListener('click', function(e){
  const b = e.target.closest('.btn'); if(!b) return;
  if(b.id === 's4p'){
    S4.run = !S4.run;
    b.textContent = S4.run ? '暂停' : '继续';
    b.classList.toggle('on', !S4.run);
    return;
  }
  S4.a = +b.dataset.k;
  $('s4a').value = S4.a;
  note4();
});

/* ================================================================
   绑定
   ================================================================ */
function fitAll(){ [st1, st2, st3, st4].forEach(function(s){ s.fit(); }); }
window.addEventListener('resize', fitAll);

ElecNav.init({ch:2, sec:'2.5b'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
draw2();
fitAll();

(function(){
  const nb = ElecNav.neighbors('2.5b');
  let h = '';
  h += nb.prev ? '<a href="'+nb.prev.f+'">‹ '+nb.prev.id+' '+nb.prev.t+'</a>'
               : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next ? '<a class="next" href="'+nb.next.f+'">'+nb.next.id+' '+nb.next.t+' ›</a>'
               : '<span>后面几节还没做</span>';
  $('pager').innerHTML = h;
})();

loop(function(dt){
  if(cur === 0) draw1();
  else if(cur === 1) draw2();
  else if(cur === 2) draw3();
  else draw4(dt);
});
  }
});
})();
