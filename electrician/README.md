# electrician —— 电工入门

访问路径 `https://suitaw.github.io/electrician/`。无依赖、无构建，`file://` 直接打开能跑。

| 文件 | 是什么 |
|---|---|
| `index.html` | 课程首页（全书课表，电气单线图版式） |
| `book.html` | 整本书的单页站：侧栏目录 + 正文，翻节不跳页 |
| `sec/cN-M.js` | **每一节内容的唯一真相**；`cN-M.html` 只是薄壳 |
| `lab-circuit.html` | 原来的 index.html：概念卡 + 电路搭建器 + 三个关卡（**求解器在里面**） |
| `c00.html` | **第 0 课 · 读懂符号**（六步，讲符号不讲原理） |
| `elec-ui.js` | 全课程共用教学组件：公式拆解 / 物理量表 / 先猜一下 / 课末练习题 / 行内跳转 |
| `elec-canvas.js` / `elec-parts.js` | 画布工具层 / 实物元件库，见下面「API 速查」 |

---

## API 速查 —— 写新一节课之前读这一节

CLAUDE.md 记的是**决策和坑**（为什么这么做），这一节记的是**名字和签名**（怎么调）。
新开会话时这两样都拿到，就不用再 grep 一遍四个库了。

**唯一真相仍然是源码**：这份表是从 `elec-canvas.js` / `elec-parts.js` /
`elec-ui.js` / `elec-book.js` 里抽出来的，改了库要顺手改这里。

### 一节课 = 三个文件

| 写在哪 | 干什么 |
|---|---|
| `sec/cN-M.js` | **内容的唯一真相**。`ELEC.reg({...})` 一个模块 |
| `cN-M.html` | 薄壳（1.1 KB），只负责把模块挂起来，让单节 URL 不失效 |
| `elec-nav.js` | 在 `BOOK` 里那一章的 `secs` 填上 `{id,f,t,d,p}` |

`book.html` 和薄壳页载入的是**同一个** `sec/cN-M.js`，改内容只改一处。

### 模块骨架（照抄这个开头）

```js
(function(){
'use strict';
ELEC.reg({
  id: '3.1',                    // 和 elec-nav.js 里的 id 一致
  file: 'c3-1.html',
  title: '3.1 手动工具',
  tabs: `<button class="tab on" data-i="0"><span class="n">1</span>第一屏</button>
    <button class="tab" data-i="1"><span class="n">2</span>第二屏</button>
    <button class="tab" data-i="2"><span class="n">3</span>第三屏</button>
    <button class="tab" data-i="3"><span class="n">4</span>第四屏</button>`,
  html: `<section class="scene on" id="sc0"> … </section>
         <section class="scene" id="sc1"> … </section>
         <section class="scene" id="sc2"> … </section>
         <section class="scene" id="sc3"> … </section>`,
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

const st1 = new Stage('cv0', 360, 300);   // 逻辑坐标固定 360 宽，fit() 缩放到容器

function fitAll(){
  [st1, st2, st3, st4].forEach(function(s){ s.fit(); });
  /* fit() 会重设画布尺寸并清空。rAF 里每帧重画的屏不用管，
     静态的那几屏必须在这儿补画一次，否则第一次进来是空白 */
  draw2(); draw3(); draw4();
}
window.addEventListener('resize', fitAll);

ElecNav.init({ch:3, sec:'3.1'});
ElecUI.bind(document);
note1(); note2(); note3(); note4();
fitAll();

(function(){
  const nb = ElecNav.neighbors('3.1');
  let h = '';
  h += nb.prev ? '<a href="'+nb.prev.f+'">‹ '+nb.prev.id+' '+nb.prev.t+'</a>'
               : '<a href="index.html">‹ 课程首页</a>';
  h += nb.next ? '<a class="next" href="'+nb.next.f+'">'+nb.next.id+' '+nb.next.t+' ›</a>'
               : '<span>下一节还没做</span>';
  $('pager').innerHTML = h;
})();

loop(function(dt){ if(cur === 0) draw1(dt); });
  }
});
})();
```

约束（`book.html` 单页站要求的，破了就翻页出问题）：

- **`html` 是模板字面量** —— 正文里不许出现反引号和 `${`
- **rAF 只能走 `EC.loop`**（`init` 拿到的那份 EC 会记账，切走时统一 stop）
- **`window.addEventListener` 只在 `init` 期间注册**（同样被记账，切走时解绑）
- 各节的 DOM id 可以重名（`sc0`/`tabs`/`pager`），同一时刻只挂一节
- **`ElecNav.init` 在 `book.html` 里被替换成空函数**，薄壳页才真的执行

### 薄壳页模板（`cN-M.html`）

`<script>` 顺序固定：icons → canvas → parts → symbols → ui → nav → book → page → 本节模块。
`<link rel="stylesheet" href="elec-page.css">` 和 `<script src="elec-theme.js">` 都在 `<head>`
（theme 晚了会先闪一下深色）。照抄 `c2-7.html` 改三处：title、`<h1>`、最后两行的节号。

### EC —— `elec-canvas.js`（画布工具层）

```js
new EC.Stage(canvasId, LW, LH)   // .g 上下文  .fit() 量宽重设尺寸(会清空)
                                 // .clear(色)  .pick(ev)→[x,y] 逻辑坐标
EC.loop(fn)                      // fn(dt秒, t秒)，返回 {stop()}；dt 封顶 0.1
EC.$(id)

new EC.Path([[x,y],…])           // .at(s)→[x,y]  .dir(s)→[dx,dy]  .len
                                 // .stroke(g,w,color,upto)  .dash(g,w,color,pat)
EC.bez(p0,c1,c2,p3,n)            // → 点数组，喂给 Path
EC.dots(g, path, {gap,r,color,dir,phase,skip:[[s0,s1],…],upto})
EC.flowArrows(g, path, {gap,size,color,dir,phase,upto})
EC.glow(g, path, color)
EC.head(g, x,y, ax,ay, size, color)              // 箭头

EC.txt(g, s, x, y, {sz,b,c,al,bl,a})             // al 默认 center，bl 默认 middle
EC.tw(g, s, sz, b)                               // 量文字宽度
EC.box(g, x,y,w,h, r, fill, line, lw)            // 圆角矩形
EC.tag(g, s, x, y, {sz,b,c,fill,line,al})        // 带底板的胶囊，→{x,y,w,h}

EC.dial(g, x,y,w,h, {val,max,unit,label,ticks,span,bipolar,
                     valText,valSz,show,needle,face,line,ink})   // 指针表盘
EC.strip(g, x,y,w,h, buf, [{i,color,scale|auto,floor,lw}], {n,bg,line})  // 走纸记录仪
EC.stripLegend(g, x, y, [['名字', 色], …])

// 电路**符号**（实物件在 EP 里；一律「中心点 + 尺寸」，方向靠 horiz）
EC.battery(g,x,y,o)  EC.cell(g,x,y,w,h,o)  EC.lamp(g,x,y,r,b,o)
EC.resistor(g,x,y,o) EC.switchSym(g,x,y,on,o)   EC.meter(g,x,y,r,'A',o)
EC.node(g,x,y,o)     EC.dimV(g,x,y0,y1,'220V',o)
```

**色板 `EC.C`**（`EC.PAL.dark` / `.light` 两份，`EC.theme(name)` 就地改 `C` 的键值，
所以各节直接引 `C.xxx` 没问题，但**不能把 `C` 整个换掉**）：

```
bg tx tx2 tx3                    背景与三级文字
wire wireL cop copD              导线、铜
metal metalD metalL chrome       金属
L N PE PE2                       国标线色（相/零/PE黄绿）—— 色相不许动
ok warn err acc accD             状态语义色
cur ele volt                     电流(橙) 电子(蓝) 电位(紫)
lamp lampOff glow hot
box boxLine card                 画布上的面板底 / 描边 / 卡片底
okbg errbg warnbg accbg voltbg   状态底板（结论条、读数带）
skin skinL
```

画布上出现的**任何面板底色都要走这几个键**，别写死 hex —— 白天模式那次逐屏复查
才从六节课里挖出 31 处写死的 `#1b232d`。

### EP —— `elec-parts.js`（实物元件 + 标注排版）

```js
EP.heading(g, x, y, '画布小标题', '灰色补充')          // 左对齐
EP.callout(g, ax,ay, tx,ty, '值', '名称', {al,color,dash,dot,line})
                                                     // 值粗体在上、名称小字在下、一条引线
EP.chip(g, s, x, y, {sz,b,c,fill,line,al})           // 胶囊底板标签（压在图上也读得清）
EP.legend(g, cx, y, [['名字', 色, 'dot'|'bar'|'arrow'], …])   // 居中图例行
EP.highlight(g, x,y,w,h, {r})                        // 选中：细蓝描边 + 柔和蓝光晕

EP.wire(g, path, {c:'black'|'red'|'blue'|'yellow', color, kind:'normal'|'hot'|'thick', w})
EP.flow(g, path, {gap:56, kind:'ele'|'cur', color, dir, phase, r, size, skip})
EP.node(g, x, y, r)      EP.terminal(g, x, y, r, {pole:'+'|'-'})

EP.cell(g,x,y,len,dia,{horiz,flip,volt,label,lx,ly,lsz,pm})   // 干电池；volt:false 才不印字
EP.resistor(g,x,y,{len,dia,bands:[…4色],wide,horiz,label,lx,ly,lsz,lc})
EP.rheostat(g,x,y,t,o)   EP.slideRheostat(g,x,y,t,{w,h,label})
EP.knife(g,x,y,on,{w,label,ly})                      // 闸刀；断开时拨杆往右上抬 0.55 rad
EP.bulb(g,x,y,R,b,{label,lsz})   EP.bulbLevel(b)→0..3   EP.lampHolder(g,x,y,w,h)
EP.coil(g,cx,cy,half,r,n,front)  EP.magnet(g,x,y,w,h,nRight)
EP.motor(g,x,y,r,{spin,label})   EP.buzzer(g,x,y,r,{on,label})
EP.diode(g,x,y,{len,dia,flip,horiz,label})   EP.led(g,x,y,{r,on,color,label})
EP.capacitor(g,x,y,{w,h,label})  EP.inductor(g,x,y,{len,r,n,core,label})
EP.internalR(g,x,y,w,h,{label})  EP.appliance(g,x,y,s,'ac'|'tv'|'rice'|'led')

EP.multimeter(g,x,y,w,h,{reading,unit,mode,knob})    // → {com:[x,y], hot:[x,y]} 好接表笔线
EP.panelMeter(g,x,y,w,h,{…dial 的选项…, label})       // 方壳指针表
EP.meterInline(g,x,y,r,'A',{val,label})              // 串在线上的小圆表
EP.readout(g,x,y,w,h,'12.3 V',{sz,label,t})          // LCD 读数（自带背景波纹）

EP.rr(g,x,y,w,h,r)  EP.cyl(g,y0,y1,暗,中,亮)  EP.shade(hex,k)
```

**材质色 `EP.P`**（元件本体只准用这些；蓝/橙/红/绿是教学语义色，不许拿来给元件上色）：

```
ink inkL inkLL                    画布文字与符号引脚（跟主题走）
steel steelD steelDD chrome       镀镍钢
copper copperD copperL brass brassD
bakelite bakeliteL body bodyD bodyL    胶木、深灰机身（跟主题走）
cream creamD ceramic tungsten warm warmHot
panel panelD lcd lcdInk
```

**字号 `EP.TYPE` 四档，画布上只准从里面挑**：
`val`(12.5 粗) / `name`(9.5 灰) / `note`(10) / `tiny`(8.5)。
**统一规格 `EP.S`**：导线 2.8、引脚 2.4、描边 1.2、圆角 6；高光一律左上、投影一律右下。

### ElecUI —— `elec-ui.js`（教学组件）

```js
ElecUI.formula({ plain:'白话版（必填，显示在最上面）', f:'U = I R',
                 vars:['U','I','R'], note:'可选' })
ElecUI.qtyTable(['I','U','R','P','Q','t'])
ElecUI.bind(root)          // 激活 root 里的 .bet / .quiz / [data-j]
ElecUI.progress('3.1')
ElecUI.QTY                 // 物理量唯一真相：I U R P W Q t f S，加量只改这里
```

HTML 侧的两个组件（属性约定和 `money-ui.js` 一致，localStorage 前缀 `elec_`）：

```html
<div class="bet" data-bet="唯一id" data-q="问题"
     data-opts="A|B|C" data-right="1" data-after="揭晓后说的话"></div>
<div data-bet-for="唯一id">…揭晓前必须藏起来的答案块…</div>

<div class="quiz" data-quiz="3.1">
  <div class="qz" data-q="题面" data-opts="A|B|C" data-right="1"
       data-why="答错必须给的解释 —— 这句话才是全部价值"></div>
</div>
```

### EI —— `elec-icons.js`

```js
EI.svg(key, size, cls)   EI.forChapter(3)   EI.forSection('3.1')
```
`forSection` 找不到 `s31` 就退回 `ch3`。接进老代码一律写成
`window.EI ? EI.svg(...) : '文字'`，没引图标库的页面才不会坏。

### 课页的 HTML 骨架与 class

```html
<section class="scene on" id="sc0">
  <div class="lead"><div class="h">一句话标题</div>引导文案</div>
  <div class="card">
    <canvas id="cv0"></canvas>
    <div class="ctrl">
      <div class="btns" id="s1k"><button class="btn on sm" data-k="0">档</button></div>
      <div class="rowlab">滑杆名　<b id="lab">当前值</b></div>
      <input type="range" id="s1a" min="1" max="4" step="1" value="2">
      <div class="nums three">
        <div class="num"><div class="k">标题<br>换行</div><div class="v" id="a">值</div></div>
      </div>
    </div>
  </div>
  <div class="note" id="n0"></div>          <!-- JS 按当前状态生成，会跟着变 -->
  <div class="note" style="margin-top:10px">
    <div class="st">静态讲解卡</div>          <!-- .st.warn / .st.bad / .st.good -->
    <div class="eu-tw"><table class="eu-t">…<td class="eu-s">首列</td>…</table></div>
    <div class="tip">琥珀=警示</div>          <!-- .tip.info 是淡蓝=中性 -->
    <span class="sub">小字补充</span>
    <span class="key">蓝底强调</span> <span class="rd">红底强调</span>
  </div>
  <div class="pager" id="pager"></div>
  <div class="foot">对应《零基础学电工》第 N 章 N.M 节（书内 PXX~PXX）</div>
</section>
```

`.num` 的数值 `margin-top:auto` 靠卡底对齐；**`.num .k` 不能给 `display:flex`**
（标题里的 `<br>` 会被打乱）。`.nums` 默认两列，`.nums.three` 三列。

### 每写完一节要做的四件事

```bash
node --check sec/c3-1.js
# 四个页签各截一张，只验第一屏没用
~/deb-run.sh "node /root/sdcard/webdev/shot.js /root/sdcard/webdev/c3-1.html /root/sdcard/webdev/o0.png --vp"
~/deb-run.sh "node /root/sdcard/webdev/shot.js /root/sdcard/webdev/c3-1.html /root/sdcard/webdev/o1.png --vp '.tab[data-i=\"1\"]'"
```

1. `node --check`
2. **四个页签各截一张**（`--vp`），看控制台报错和版面
3. 在 `elec-nav.js` 里把那一节的 `f` 填上
4. 结论写进 CLAUDE.md（踩到的坑、算过的数），别留在脚本里


---

## elec-ui.js —— 共用教学组件

做它的直接起因是他这句话：**「每个公式，字母代表的意思我都不懂」**。
零基础学不下去，多半不是卡在道理上，是卡在一句话里有一半字母不知道是谁。

```js
ElecUI.formula({ plain:'电压 = 电流 × 电阻', f:'U = I R', vars:['U','I','R'], note:'…' })
ElecUI.qtyTable(['I','U','R','P','Q','t'])
ElecUI.bind(root, { jump:key => 元素 })   // 激活 root 里的 .bet / .quiz / [data-j]
ElecUI.progress('c00')                    // localStorage: elec_progress
```

硬约定（别改回去）：

- **白话版必须在符号版上面。**先看到「电压 = 电流 × 电阻」，再看到 `U = I R` 才读得懂；
  顺序反了就是天书。
- **每个字母给三样：符号 / 它是什么 / 单位。**光说「其中 I 是电流」不够 ——
  他接着就要问那 A 是什么、为什么不写 A。
- **物理量符号和单位符号是两套东西**，这是零基础最大的混淆源。
  `QTY` 那张表是全课程唯一真相，加物理量只改那里。
- **`.bet`（先猜一下）揭晓前必须把答案块藏起来**（`[data-bet-for=同id]` → `.eu-hide`），
  露在下面就白问了。和 money-ui.js 的属性约定保持一致，两边可以互抄。
- **`.quiz`（课末练习）答错必须给 `data-why`**，那句解释才是全部价值；
  一道一道答、答完立刻判、全答完才给总分。
- **行内跳转 `[data-j]` 的热区靠 `::after{inset:-14px -9px}` 往外撑**，视觉不变。
  实测视觉 105×18、**真实可点 122×44** —— 按 `getBoundingClientRect`
  量热区的脚本看不出这一层，会误报成不达标。

## c00.html —— 第 0 课「读懂符号」

六步：读铭牌 → 物理量 vs 单位 → 电压为什么有 U 和 V 两个写法 →
k/M/m/μ 前缀 → 公式里的记号怎么读 → 回头再读铭牌 + 4 道练习题。

- **吸顶区 = 顶栏 + 舞台包在同一个 `sticky` 里**，就不用去算顶栏多高。
  实测展开 313px / 收起 48px（视口 844）。顶栏那颗 ▲/▼ 收起舞台。
- **舞台六种视图**（`STAGE`）：铭牌（可点每一项）/ 身高↔电流对齐图 /
  U-V 拆解 / 单位换算器 / 欧姆三角（点一下盖住要求的量）/ 双铭牌带切页。
  每种视图的状态存模块变量，切回来还是原样。
- **`scrollIntoView` 会被吸顶块盖住**，所以 `[data-anchor]` 要
  `scroll-margin-top:calc(var(--stick-h) + 12px)`，而 `--stick-h` 得 JS 量了写进去。
- **讲解里说「上面那张图」一律做成可点的**（`data-j="stage"`），
  点了先自动展开舞台再滚过去 —— 收起状态下滚过去会指着一片空。
- **末步的吸底按钮不能只是禁用**：换成「去搭个电路练手 ›」，
  同时把讲解卡里那颗重复的链接删掉（两颗按钮会同时出现在屏幕上）。
- 进度只做一条 3px 的线。原来放了六个可点圆点，把吸底那两颗按钮挤到换行截断（截图抓到的）。

验证过的：六步逐屏截图无报错、390/360/320 三档**无横向溢出**、
字号 <12px **0 处**、热区 <44px **0 处**（`.eu-jump` 那 5 处按 elementFromPoint 实测是 44）、
练习题四道判分正确、答错给出解析、先猜一下揭晓前后隐藏正确、
换算器 5000000Ω→5MΩ / 30mA→0.03A、欧姆三角三种盖法、跳转自动展开舞台。

---

## lab-circuit.html —— 第一章切片原型（原 index.html）

覆盖《零基础学电工》第一章的一个切片：电流 / 电压 / 电阻 / 欧姆定律 / 串联并联。
文字、类比、误区、题目全部原创，没有抄书里的原文和插图。
顶上挂着第 0 课的入口。

三块内容：
- **左侧概念卡**：5 张，每张「是什么 / 打个比方 / 常见误区」+ 2~4 道题（单选 + 计算），
  答错给**针对你选的那个错项**的解析，不是通用答案。共 16 题，进度存 localStorage。
- **右侧电路搭建器**：拖元件、点引脚连线、通电求解，实时显示每个元件的 U/I/P，
  灯泡按功率显示亮度（不亮 / 偏暗 / 正常 / 过亮 / 烧毁），并检测断路、短路、元件被短接。
- **3 个关卡**：并联（各管一个）/ 串联（一开管俩）/ 12V 下让灯正好额定。
  判定通过后弹该关的原理说明。

---

## 求解器的数据结构

求解器是**纯函数，完全不碰 DOM**，在文件的「第 1 部分」，UI 在第 3、4 部分。
入口只有一个：`solveCircuit(net)`。

### 输入：网表

```js
net = {
  elements: [
    { id:'e1', type:'source',   v:6 },                    // 引脚 e1:a = 负极, e1:b = 正极
    { id:'e2', type:'lamp',     vr:6, pr:3, burned:false },// 额定电压/功率，R 由 vr²/pr 算
    { id:'e3', type:'switch',   closed:true },
    { id:'e4', type:'resistor', r:10 }
  ],
  wires: [
    { id:'w1', p:'e1:b', q:'e2:a' }    // 引脚引用统一写成 '元件id:引脚名'
  ]
}
```

**每个元件固定两个引脚 `a` / `b`**，导线连接引脚。元件的坐标 `x`/`y` 只有 UI 用，
求解器不看 —— 拓扑完全由 `wires` 决定，跟画布上摆在哪儿无关。

### 求解方法：改进节点法（MNA）

选它而不是串并联归约，因为归约遇到桥式那类非串非并的接法就卡住了，
而 MNA 是列个方程组解掉，任何拓扑一视同仁，代码还更短。

1. **引脚 → 节点**：并查集，只有**导线**会把两个引脚合并成同一个节点。
2. **元件 → 等效电阻**（`elemR`）：灯泡 `vr²/pr`；电阻 `r`；
   **闭合开关按 `1e-4` Ω 处理**（不是合并节点 —— 这样才能算出流过开关的电流）；
   断开的开关和烧毁的灯返回 `Infinity`，直接不进方程。
3. **短路检测分两种**：
   - 硬短路 = 电源两极被导线合并成同一个节点（方程会奇异，必须先拦掉）
   - 软短路 = 解出来电源电流 > `SHORT_I`(50A)，这类走的是闭合开关
   两种都会调 `findShortPath()` 用 BFS 找出**那条通路上的导线 id**，界面上标红加粗。
   只说「短路了」没用，得指出该拆哪一根。
4. **只求解含电源的连通分量**，其余元件标 `live:false`。
   不做这一步的话，画布上悬空挂着的元件会让矩阵奇异。
5. 以电源负极为参考点(0V)。每个电压源额外加一个支路电流未知量 + 一条约束方程，
   高斯消元（列主元）解掉。
6. **烧毁是迭代出来的**：解完看有没有灯的功率超额定 `BURN`(2.5) 倍，
   标烧毁后**重新求解**，最多 8 轮。所以「一个灯烧了导致另一个灯电压变化」能正确反映。

### 输出

```js
{
  byId: {
    e2: {
      u, i, p,          // 电压/电流/功率，取绝对值（不显示方向）
      live,             // 是否在通电回路里；false 表示悬空
      bypassed,         // 两端被导线直接连上 → 电流绕过它，教学上要专门提示
      burned
    }
  },
  shorted, shortIds, shortWires, shortEls,   // 短路 + 要标红的导线/元件
  noSource, singular,
  burned,      // 这次求解中被烧掉的灯 id 列表
  elements,    // 含烧毁标记的元件快照
  nodeV, ends, N
}
```

UI 侧只有三个函数碰它：`refresh()`（求解）、`paintPanel()`（警告 + 结果表）、
`rebuild()`（画布）。**加新元件类型不用动 UI 逻辑**，只要在 `PAL` 里加一行、
`elemR` 里加一个分支、`elName` 里加个名字。

### 已验证的结论（脚本跑过，别再重算）

求解器单测 **53 项**、短路定位 **9 项**、关卡判定 **18 项**、
浏览器端交互 + 布局 全过，控制台无报错。

- 6V + 两个 6V/3W **串联**：各 3V / 0.25A / **0.75W**（额定的 1/4，判为「偏暗」）
- 6V + 两个 6V/3W **并联**：各 6V / 0.5A / 3W，总电流 **1A**（判为「正常」）
- 12V + 两个 6V/3W **串联**：各 6V / 0.5A / **3W 正好额定** ← 关卡 3 的解
- 12V + 两个 6V/3W **并联**：各 12W = 4 倍额定 → **两个都烧**
- 12Ω 和 24Ω 串联在 12V：24Ω 分 8V、12Ω 分 4V（关卡 3 说明里引用了这个数）
- 关卡 2 的判据能正确区分串并联：**「并联 + 一个干路开关」也是一个开关管两个灯，
  但电源电流是灯电流的两倍** —— 靠这一条把它拒掉，光看「一个开关能全灭」区分不了
- 三档宽度 390/360/320 **均无横向溢出**；字号 <12px **0 处**；热区 <44px **0 处**

三个容易踩的实现细节：

- **`.pin` 要 `z-index:5`，而 `.el` 不能设 z-index**。设了 `.el` 就建立层叠上下文，
  引脚被关在自己元件的层里 —— 两个元件叠在一起时下面那个的引脚点不到。
- **短路的导线要画在第二个 SVG 层（`#shorts`，z-index 4，`pointer-events:none`）**。
  直跨电源两极的那根线两端都在电源元件上，画在元件下层就被电源本体完全盖住，
  标了红也看不见。
- **灯烧了之后电源电流本来就是 0，这时不能报「断路」**。先报断路会让人以为是接线问题，
  而真正原因是烧毁 —— 有烧毁的灯就跳过断路警告。

---

## 后续加「接触器 / 电机正反转」需要怎么扩展

这类电路和现在的纯电阻网络有一个**性质上的差别**：
现在是「给定开关状态 → 解一次」，而接触器电路里**元件状态依赖电路自身的解**
（线圈得电 → 触点动作 → 拓扑变了 → 可能又影响线圈），而且**自锁需要记住上一时刻**。
按难度递增分三层：

### 第一层：元件从「两个引脚」放开成「多端子 + 内部多条支路」（改动最大）

现在 `a`/`b` 是硬编码的，而一个接触器是**一个元件带好几组互不相连的触点**：
线圈 `A1/A2`、三对主触点、若干常开/常闭辅助触点。要改的地方：

- 元件加 `pins: ['A1','A2','13','14','21','22']`，`buildNodes` 遍历 `e.pins`
  而不是写死 `':a'` / `':b'`
- `elemR(e)` → `branchesOf(e)` **返回一个数组**：
  `[{p:'A1',q:'A2',r:1500}, {p:'13',q:'14',r:closed?1e-4:Infinity}, ...]`。
  求解主循环里 `brs.push(...)` 那一段改成遍历这个数组即可，MNA 本身一个字不用动。
- 渲染层：元件盒子的引脚位置由 `pins` 数组驱动（现在是 `.pin.a{left:-13px}`
  这种固定两个），元件也得能画大一点、引脚分上下两排

### 第二层：求解从「一次」变成「迭代到稳定」（几乎免费）

**现在的烧毁循环已经是这个骨架了**：解 → 看要不要改状态 → 改了就重解，最多 8 轮。
只要把「灯泡烧毁判定」抽成一个通用钩子：

```js
// 返回 true 表示这个元件的状态变了，需要重解
function elemUpdate(e, d){
  if(e.type==='lamp')       return burnCheck(e,d);
  if(e.type==='contactor')  { const on = Math.abs(d.coilU) > e.pickup;
                              if(on!==e.on){ e.on = on; return true; } }
  if(e.type==='overload')   return tripCheck(e,d);   // 热继电器
  return false;
}
```

灯泡烧毁、接触器吸合、热继电器跳闸全走这一个口子。

**不收敛要当成结果报出来，不能死循环**：把接触器的常闭触点串在它自己的线圈回路里
就会永远收敛不了 —— 那正是继电器自激振荡（蜂鸣器的原理），是个真实现象，
应该提示「这个接线会让接触器嗒嗒响个不停」，而不是卡住或随便给一个解。

### 第三层：时间轴与记忆（新增部分）

自锁的本质是**同一组输入对应两个稳定解**：按钮全松开时，电机可能在转也可能停着，
取决于历史。纯静态求解表达不了，所以：

- **元件状态必须持久**：接触器的 `on` 存在 `CV.els` 里，每次求解从上一次的状态出发，
  不是每次从零开始。（现在 `e.burned` 已经是这么处理的，路子是对的。）
- **按钮是瞬时元件**：需要「按住才通」的手势 —— `pointerdown` 闭合、`pointerup` 恢复，
  不能沿用现在开关的 `click` 切换。**这是自锁教学的关键**：
  用户必须能体验到「松手了它还在转」。
- **时间继电器要一个 tick 循环**：`setInterval(step, 50)`，每步推进各元件的计时器，
  然后跑第二层的迭代求解。有了 tick，`prev state → next state` 就成了正规的状态机。

### 一个判断：控制回路建议不要硬套 MNA

**接触器电路的教学价值在「逻辑」不在「数值」**，这一点和第一章正好相反。
学员要弄明白的是「为什么松手了还转」「为什么互锁能防止两个同时吸合」，
而不是线圈上是 218V 还是 220V。而且三相主回路本身不是纯电阻直流，
现在这个求解器算不了，硬凑一个等效电阻反而给出假数字。

所以更实际的分工是：

- **主回路只做示意**：电机转 / 不转 / 转向，不参与数值求解
- **控制回路加一个「布尔模式」**：`solveLogic(net)` 只判断每条支路通不通
  （通路 = 真），沿用同一套并查集找连通性，不解方程。
  这更贴近梯形图的口径，也更快 —— 而且第二层那个迭代循环、第三层那个 tick
  **两种模式可以共用**，因为它们只关心「状态变了没有」。

数值求解留给需要它的场合：欧姆定律、分压限流、导线截面积与线损、
功率与发热 —— 也就是这门课往后真正要算的那些。
