/* ==================================================================
   elec-canvas.js —— 电工课共用「画电路」工具层
   引一行 <script src="elec-canvas.js"></script>，全局拿到 EC。

   来历：circuit-basics.html 和 magnet-field.html 各自内联了一份几乎一样的
   Path / Stage / dots / txt / box，第 1 章要做六节，再抄六遍就意味着
   以后改一处要改八处。这一份是把那套原样抽出来，再补上电路元件的画法。
   （那两个老页面保持内联不动 —— 改动最小化，它们已经验证过了。）

   设计约定（别改回去）：
   - **画布是深色的**（C.bg，2026-08-28 全站改成深色仪表台之后跟着改的）。
     整套色板在下面 PAL 里，浅色那份留着没删 —— EC.theme('light') 可以切回去。
     深底上的两条硬规矩：**导线要浅**（深底上深灰线等于没有），
     **玻璃/灯罩这类透明件不能再用浅色实心**，否则就是一个白球。
   - **描边一律 lineJoin='round'**。掠射时夹角能尖到 1° 以下，miter 尖端
     长度是 lineWidth/sin(θ/2)，会飞出去变成毛刺。
   - **电流小圆点 = 一组沿路径的弧长值**，s += v·dt 取模循环。
     「圈没闭合 ⇒ 圆点全部静止」是贯穿全课的表达，不是「流到断点才停」。
   - Stage 用固定逻辑坐标 + 整体缩放，手机各种宽度不用重算布局。
   ================================================================== */
(function(global){
'use strict';

const TAU = Math.PI * 2;

/* 尊重系统「减少动态效果」：自动流动停掉，用户主动点的动画照放 */
const RM = !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);

/* ---------------- 调色板 ---------------- */
const PAL = {
/* ---------- 深色（现在全站在用的）---------- */
dark:{
  bg:'#111820', tx:'#e6edf5', tx2:'#9fadbd', tx3:'#71808f',
  /* 导线与元件 —— 深底上导线必须浅，否则整条看不见 */
  wire:'#8b97a5', wireL:'#5a6674', cop:'#d08a3c', copD:'#a06320',
  metal:'#aeb7c1', metalD:'#7c8590', metalL:'#d7dde3',
  /* 国标线色：这是要顺带记住的东西，色相别动，深底上只提亮度 */
  L:'#ff5f52', N:'#4ea3ff', PE:'#4fc04a', PE2:'#e8d34a',
  /* 状态 */
  ok:'#3ecf8e', warn:'#f0a020', err:'#ff6b6b', acc:'#4ea3ff', accD:'#2b7fd0',
  /* 电流 / 电子 / 电压 */
  cur:'#ff9840', ele:'#5eb0ff', volt:'#b07ce8',
  lamp:'#f0b429', lampOff:'#5a636d', glow:'#ffd76a',
  hot:'#ff6a4a',
  box:'#1b232d', boxLine:'#3a4653', card:'#1a222b',
  skin:'#e0b088', skinL:'#a97644'
},
/* ---------- 浅色（改深色之前那一份，留着好回退）---------- */
light:{
  bg:'#fafbfc', tx:'#242a31', tx2:'#6c7681', tx3:'#98a1ab',
  wire:'#39424d', wireL:'#8d97a2', cop:'#c07830', copD:'#8a5418',
  metal:'#aeb7c1', metalD:'#7c8590', metalL:'#d7dde3',
  L:'#d5342a', N:'#1e6fd0', PE:'#3f9b35', PE2:'#e0c020',
  ok:'#1c8348', warn:'#c05a00', err:'#c32f2f', acc:'#1a6fd4', accD:'#12518f',
  cur:'#e0731a', ele:'#2a86d8', volt:'#8d4bd0',
  lamp:'#f0b429', lampOff:'#c8cdd3', glow:'#ffd76a',
  hot:'#e0402a',
  box:'#eef1f5', boxLine:'#b9c2cc', card:'#ffffff',
  skin:'#f2c79c', skinL:'#a97644'
}};

/* C 是「当前主题」——各节课都直接引 EC.C.xxx，所以换主题只能**就地改这个对象**，
   不能整个换掉引用（换掉的话已经拿在手里的旧对象还是旧色）。 */
const C = Object.assign({}, PAL.dark);
function theme(name){
  const p = PAL[name] || PAL.dark;
  Object.keys(C).forEach(function(k){ delete C[k]; });
  Object.assign(C, p);
  return C;
}

/* ================= 折线路径：所有流动动画的地基 ================= */
function Path(pts){
  this.pts = pts;
  this.seg = [];
  let L = 0;
  for(let i=1;i<pts.length;i++){
    const a = pts[i-1], b = pts[i];
    const d = Math.hypot(b[0]-a[0], b[1]-a[1]);
    if(d > 0){ this.seg.push({a:a, b:b, d:d, s0:L}); L += d; }
  }
  this.len = L;
}
Path.prototype.at = function(s){
  if(this.len <= 0) return [this.pts[0][0], this.pts[0][1]];
  if(s < 0) s = 0;
  if(s > this.len) s = this.len;
  for(let i=0;i<this.seg.length;i++){
    const g = this.seg[i];
    if(s <= g.s0 + g.d || i === this.seg.length-1){
      const t = (s - g.s0) / g.d;
      return [g.a[0] + (g.b[0]-g.a[0])*t, g.a[1] + (g.b[1]-g.a[1])*t];
    }
  }
  const last = this.pts[this.pts.length-1];
  return [last[0], last[1]];
};
Path.prototype.dir = function(s){
  if(!this.seg.length) return [1,0];
  if(s < 0) s = 0;
  if(s > this.len) s = this.len;
  for(let i=0;i<this.seg.length;i++){
    const g = this.seg[i];
    if(s <= g.s0 + g.d || i === this.seg.length-1)
      return [(g.b[0]-g.a[0])/g.d, (g.b[1]-g.a[1])/g.d];
  }
  return [1,0];
};
Path.prototype.stroke = function(g, w, color, upto){
  const end = (upto == null) ? this.len : upto;
  if(end <= 0) return;
  g.save();
  g.lineWidth = w; g.strokeStyle = color;
  g.lineJoin = 'round'; g.lineCap = 'round';
  g.beginPath();
  g.moveTo(this.pts[0][0], this.pts[0][1]);
  let done = 0;
  for(let i=0;i<this.seg.length;i++){
    const s = this.seg[i];
    if(done + s.d <= end){ g.lineTo(s.b[0], s.b[1]); done += s.d; }
    else { const p = this.at(end); g.lineTo(p[0], p[1]); break; }
  }
  g.stroke();
  g.restore();
};
/* 虚线描边：断开的那一段用它 */
Path.prototype.dash = function(g, w, color, pat){
  g.save();
  g.setLineDash(pat || [6,5]);
  g.lineWidth = w; g.strokeStyle = color;
  g.lineJoin = 'round'; g.lineCap = 'butt';
  g.beginPath();
  g.moveTo(this.pts[0][0], this.pts[0][1]);
  for(let i=0;i<this.seg.length;i++) g.lineTo(this.seg[i].b[0], this.seg[i].b[1]);
  g.stroke();
  g.restore();
};

function bez(p0, c1, c2, p3, n){
  const out = [];
  for(let i=0;i<=n;i++){
    const t = i/n, u = 1-t;
    const a = u*u*u, b = 3*u*u*t, c = 3*u*t*t, d = t*t*t;
    out.push([a*p0[0]+b*c1[0]+c*c2[0]+d*p3[0],
              a*p0[1]+b*c1[1]+c*c2[1]+d*p3[1]]);
  }
  return out;
}

/* ================= 画笔小工具 ================= */
function head(g, x, y, ax, ay, size, color){
  const m = Math.hypot(ax, ay) || 1;
  ax /= m; ay /= m;
  const px = -ay, py = ax, h = size, w = size*0.62;
  g.save(); g.fillStyle = color;
  g.beginPath();
  g.moveTo(x + ax*h, y + ay*h);
  g.lineTo(x - ax*h*0.45 + px*w, y - ay*h*0.45 + py*w);
  g.lineTo(x - ax*h*0.45 - px*w, y - ay*h*0.45 - py*w);
  g.closePath(); g.fill(); g.restore();
}

function flowArrows(g, path, o){
  const gap = o.gap || 34, size = o.size || 5;
  const dir = (o.dir === -1) ? -1 : 1;
  const upto = (o.upto == null) ? path.len : o.upto;
  let ph = (o.phase || 0) * dir;
  ph = ph % gap; if(ph < 0) ph += gap;
  for(let s = ph; s <= upto; s += gap){
    const p = path.at(s), d = path.dir(s);
    head(g, p[0], p[1], d[0]*dir, d[1]*dir, size, o.color);
  }
}

/* 沿路径撒圆点。skip = [[s0,s1],…] 让圆点绕开元件所占的那一段 */
function dots(g, path, o){
  const gap = o.gap || 24, r = o.r || 3.2;
  const upto = (o.upto == null) ? path.len : o.upto;
  const dir = (o.dir === -1) ? -1 : 1;
  const skip = o.skip || [];
  let ph = (o.phase || 0) * dir;
  ph = ph % gap; if(ph < 0) ph += gap;
  g.save(); g.fillStyle = o.color || C.cur;
  for(let s = ph; s <= upto; s += gap){
    let hid = false;
    for(let i=0;i<skip.length;i++) if(s > skip[i][0] && s < skip[i][1]){ hid = true; break; }
    if(hid) continue;
    const p = path.at(s);
    g.beginPath(); g.arc(p[0], p[1], r, 0, TAU); g.fill();
  }
  g.restore();
}

/* 辉光描边：多描几遍，不用 shadowBlur（手机上慢）。
   最里层刻意半透明 —— 底下那条线本身的颜色（火线红/零线蓝）要透出来 */
function glow(g, path, color){
  g.save();
  g.globalAlpha = .13; path.stroke(g, 11, color);
  g.globalAlpha = .24; path.stroke(g, 6.5, color);
  g.globalAlpha = .5;  path.stroke(g, 2.6, color);
  g.restore();
}

function txt(g, s, x, y, o){
  o = o || {};
  g.save();
  g.globalAlpha = (o.a == null) ? 1 : o.a;
  g.fillStyle = o.c || C.tx;
  g.font = (o.b ? '700 ' : '') + (o.sz || 11) +
    'px -apple-system,"PingFang SC","Noto Sans CJK SC",sans-serif';
  g.textAlign = o.al || 'center';
  g.textBaseline = o.bl || 'middle';
  g.fillText(s, x, y);
  g.restore();
}
/* 量一段文字有多宽（画气泡底板要用） */
function tw(g, s, sz, b){
  g.save();
  g.font = (b ? '700 ' : '') + (sz || 11) +
    'px -apple-system,"PingFang SC","Noto Sans CJK SC",sans-serif';
  const w = g.measureText(s).width;
  g.restore();
  return w;
}

function box(g, x, y, w, h, r, fill, line, lw){
  g.save();
  g.beginPath();
  const rr = Math.min(r, w/2, h/2);
  g.moveTo(x+rr, y);
  g.arcTo(x+w, y, x+w, y+h, rr);
  g.arcTo(x+w, y+h, x, y+h, rr);
  g.arcTo(x, y+h, x, y, rr);
  g.arcTo(x, y, x+w, y, rr);
  g.closePath();
  if(fill){ g.fillStyle = fill; g.fill(); }
  if(line){ g.strokeStyle = line; g.lineWidth = lw || 1.4; g.lineJoin = 'round'; g.stroke(); }
  g.restore();
}

/* 标注气泡：底板按文字实际宽度画，不硬编码。
   dir 是尾巴指向：'l'/'r'/'t'/'b'/null（不画尾巴） */
function tag(g, s, x, y, o){
  o = o || {};
  const sz = o.sz || 10.5, padX = 6, padY = 4.5;
  const w = tw(g, s, sz, o.b) + padX*2, h = sz + padY*2;
  let bx = x - w/2, by = y - h/2;
  if(o.al === 'l') bx = x;
  if(o.al === 'r') bx = x - w;
  box(g, bx, by, w, h, 5, o.fill || C.box, o.line || C.boxLine, 1);
  txt(g, s, bx + w/2, by + h/2, {sz:sz, b:o.b, c:o.c || C.tx});
  return {x:bx, y:by, w:w, h:h};
}

/* ================= canvas 适配 ================= */
function Stage(id, LW, LH){
  this.cv = (typeof id === 'string') ? document.getElementById(id) : id;
  this.g = this.cv.getContext('2d');
  this.LW = LW; this.LH = LH; this.k = 1;
}
Stage.prototype.fit = function(){
  const w = this.cv.clientWidth;
  if(!w) return false;
  const dpr = Math.min(global.devicePixelRatio || 1, 2.5);
  const k = w / this.LW;
  this.k = k;
  this.cv.width  = Math.round(w * dpr);
  this.cv.height = Math.round(this.LH * k * dpr);
  this.cv.style.height = (this.LH * k) + 'px';
  this.g.setTransform(k*dpr, 0, 0, k*dpr, 0, 0);
  return true;
};
Stage.prototype.clear = function(c){
  this.g.fillStyle = c || C.bg;
  this.g.fillRect(0, 0, this.LW, this.LH);
};
Stage.prototype.pick = function(ev){
  const r = this.cv.getBoundingClientRect();
  const t = (ev.touches && ev.touches[0]) ? ev.touches[0] : ev;
  const k = r.width / this.LW;
  return [(t.clientX - r.left) / k, (t.clientY - r.top) / k];
};

/* ================= 电路元件 =================
   一律「中心点 + 尺寸」调用，方向靠 horiz 参数。
   元件本身不画导线，导线交给 Path —— 这样流动圆点和元件是两回事，
   哪个元件挡住圆点就把它那一段塞进 dots 的 skip 里。 */

/* 电池（直流电源符号）：长线=正极，短线=负极。
   horiz=true 时从左到右；vertical 时正极在上 */
function battery(g, x, y, o){
  o = o || {};
  const horiz = o.horiz !== false;
  const gap = o.gap || 7, lo = o.long || 17, sh = o.short || 9, lw = o.lw || 2.4;
  const flip = o.flip ? -1 : 1;
  g.save();
  g.strokeStyle = o.color || C.wire; g.lineCap = 'round';
  if(horiz){
    g.lineWidth = lw;
    g.beginPath(); g.moveTo(x - gap/2*flip, y - lo/2); g.lineTo(x - gap/2*flip, y + lo/2); g.stroke();
    g.lineWidth = lw + 1.6;
    g.beginPath(); g.moveTo(x + gap/2*flip, y - sh/2); g.lineTo(x + gap/2*flip, y + sh/2); g.stroke();
  }else{
    g.lineWidth = lw;
    g.beginPath(); g.moveTo(x - lo/2, y - gap/2*flip); g.lineTo(x + lo/2, y - gap/2*flip); g.stroke();
    g.lineWidth = lw + 1.6;
    g.beginPath(); g.moveTo(x - sh/2, y + gap/2*flip); g.lineTo(x + sh/2, y + gap/2*flip); g.stroke();
  }
  g.restore();
  if(o.pm !== false){
    const d = o.pmOff || 13;
    if(horiz){
      txt(g, '+', x - (gap/2+6)*flip, y - lo/2 - 6, {sz:12, b:1, c:C.err});
      txt(g, '−', x + (gap/2+6)*flip, y - lo/2 - 6, {sz:13, b:1, c:C.tx2});
    }else{
      txt(g, '+', x + d, y - gap/2*flip, {sz:12, b:1, c:C.err});
      txt(g, '−', x + d, y + gap/2*flip, {sz:13, b:1, c:C.tx2});
    }
  }
  if(o.label) txt(g, o.label, x + (o.lx||0), y + (o.ly|| (horiz?22:0)), {sz:o.lsz||10.5, c:C.tx2, b:o.lb});
}

/* 多格电池组（画得像一节干电池，1.1 的实物感） */
function cell(g, x, y, w, h, o){
  o = o || {};
  box(g, x - w/2, y - h/2, w, h, 4, o.fill || '#4a5560', C.wire, 1.3);
  /* 正极小帽 */
  box(g, x + w/2 - 1, y - 5, 5, 10, 2, C.metal, C.metalD, 1);
  txt(g, o.label || '', x, y, {sz:o.sz || 11, b:1, c:'#fff'});
}

/* 灯泡：⊗ 符号 + 亮度光晕。b = 0..1 */
function lamp(g, x, y, r, b, o){
  o = o || {};
  b = Math.max(0, Math.min(1, b || 0));
  if(b > 0.02){
    const gr = g.createRadialGradient(x, y, r*0.4, x, y, r*3.1);
    gr.addColorStop(0, 'rgba(255,214,90,'+(0.55*b).toFixed(3)+')');
    gr.addColorStop(0.5, 'rgba(255,214,90,'+(0.20*b).toFixed(3)+')');
    gr.addColorStop(1, 'rgba(255,214,90,0)');
    g.save(); g.fillStyle = gr;
    g.beginPath(); g.arc(x, y, r*3.1, 0, TAU); g.fill(); g.restore();
  }
  g.save();
  g.beginPath(); g.arc(x, y, r, 0, TAU);
  g.fillStyle = b > 0.02
    ? 'rgb('+Math.round(255)+','+Math.round(238 - 30*(1-b))+','+Math.round(150 + 60*b)+')'
    : '#f0f2f5';
  g.fill();
  g.lineWidth = 1.8; g.strokeStyle = b > 0.02 ? C.lamp : C.metalD;
  g.lineJoin = 'round'; g.stroke();
  /* 叉 */
  const d = r * 0.707;
  g.lineWidth = 1.6; g.strokeStyle = b > 0.02 ? '#b07c10' : C.metalD;
  g.beginPath();
  g.moveTo(x-d, y-d); g.lineTo(x+d, y+d);
  g.moveTo(x-d, y+d); g.lineTo(x+d, y-d);
  g.stroke();
  g.restore();
  if(o.label) txt(g, o.label, x, y + r + 11, {sz:o.sz || 10.5, c:C.tx2, b:o.b});
}

/* 电阻：矩形符号 */
function resistor(g, x, y, o){
  o = o || {};
  const horiz = o.horiz !== false;
  const L = o.len || 34, W = o.w || 14;
  const w = horiz ? L : W, h = horiz ? W : L;
  box(g, x - w/2, y - h/2, w, h, 2.5, o.fill || C.box, o.color || C.wire, o.lw || 1.8);
  if(o.label){
    const lx = o.lx != null ? o.lx : (horiz ? 0 : W/2 + 16);
    const ly = o.ly != null ? o.ly : (horiz ? -W/2 - 10 : 0);
    txt(g, o.label, x + lx, y + ly, {sz:o.sz || 11, b:1, c:o.lc || C.tx});
  }
}

/* 开关：闭合/断开。horiz 时刀从左端往右上翘 */
function switchSym(g, x, y, on, o){
  o = o || {};
  const L = o.len || 30, lw = o.lw || 2.2;
  const x0 = x - L/2, x1 = x + L/2;
  g.save();
  g.strokeStyle = o.color || C.wire; g.lineWidth = lw; g.lineCap = 'round';
  g.beginPath();
  g.moveTo(x0, y);
  if(on) g.lineTo(x1, y);
  else   g.lineTo(x0 + L*0.86, y - L*0.5);
  g.stroke();
  /* 两个接线柱 */
  g.fillStyle = o.color || C.wire;
  g.beginPath(); g.arc(x0, y, 2.6, 0, TAU); g.fill();
  g.beginPath(); g.arc(x1, y, 2.6, 0, TAU); g.fill();
  g.restore();
  if(o.label) txt(g, o.label, x, y + (o.ly || 16), {sz:o.sz || 10.5, c:C.tx2});
}

/* 仪表：圆圈里一个字母。'A' 电流表 / 'V' 电压表 */
function meter(g, x, y, r, ch, o){
  o = o || {};
  g.save();
  g.beginPath(); g.arc(x, y, r, 0, TAU);
  g.fillStyle = '#fff'; g.fill();
  g.lineWidth = 1.8; g.strokeStyle = o.color || C.wire; g.stroke();
  g.restore();
  txt(g, ch, x, y, {sz:o.sz || 13, b:1, c:o.color || C.wire});
  if(o.label) txt(g, o.label, x, y + r + 11, {sz:10.5, c:C.tx2});
}

/* 接线节点（丁字/十字连接处的实心点）*/
function node(g, x, y, o){
  o = o || {};
  g.save(); g.fillStyle = o.color || C.wire;
  g.beginPath(); g.arc(x, y, o.r || 3.2, 0, TAU); g.fill(); g.restore();
}

/* 双向箭头 + 中间一段文字：标「这两点之间的电压」用 */
function dimV(g, x, y0, y1, s, o){
  o = o || {};
  const c = o.color || C.volt;
  g.save();
  g.strokeStyle = c; g.lineWidth = 1.2; g.setLineDash(o.dash || []);
  g.beginPath(); g.moveTo(x, y0); g.lineTo(x, y1); g.stroke();
  g.restore();
  head(g, x, y0, 0, -1, 4.2, c);
  head(g, x, y1, 0, 1, 4.2, c);
  if(s) tag(g, s, x, (y0+y1)/2, {sz:o.sz || 10.5, c:c, line:c, b:1});
}

/* ================= 仪表：指针表盘 =================
   2026-08-23 加的。定下的口径是「A 方案」：课页保持浅色统一，
   但**仪表要当仪表画** —— 真表盘、真刻度、指针有惯性、读数带单位。
   第 3 章（万用表/钳形表/绝缘电阻表）、第 5 章（检测）会大量用到。

   dial(g, x, y, w, h, {
     val, max,            当前值 / 满量程
     bipolar:true,        中间是 0、可以往两边偏（检流计、电流方向表）
     label:'检流计',       表盘下面那行字
     unit:'mV',           右上角小字
     show:true            要不要把数值印在表盘上
   })
   —— 指针的惯性由调用方自己做（存一个平滑过的值传进来），
      这里只负责画，免得同一块表在两个页面里手感不一样。 */
function dial(g, x, y, w, h, o){
  o = o || {};
  box(g, x, y, w, h, 5, o.face || '#e8e2d0', o.line || '#b9ae8e', 1.4);
  const cx = x + w/2, cy = y + h*0.80;
  const R = Math.min(w*0.42, h*0.68);
  const bip = !!o.bipolar;
  const span = o.span || (Math.PI/2.4);        /* 半张角 */

  /* 刻度弧 */
  g.save();
  g.strokeStyle = o.ink || '#6b6350'; g.lineWidth = 1.2;
  g.beginPath(); g.arc(cx, cy, R, -Math.PI/2 - span, -Math.PI/2 + span); g.stroke();
  const n = o.ticks || 5;
  for(let k = bip ? -n : 0; k <= n; k++){
    const t = bip ? k/n : (k/n)*2 - 1;
    const a = t*span - Math.PI/2;
    const big = (k % (bip ? n : Math.ceil(n/2)) === 0);
    const r2 = R - (big ? 10 : 5.5);
    g.beginPath();
    g.moveTo(cx + Math.cos(a)*R, cy + Math.sin(a)*R);
    g.lineTo(cx + Math.cos(a)*r2, cy + Math.sin(a)*r2);
    g.stroke();
  }
  g.restore();

  /* 端点标记。**表盘小于 52px 高时省掉端点数字** —— 实测 44px 的小表上
     「0」「3.2」会跟指针和读数糊成一团（1.2 那块电流表抓到的） */
  const small = h < 52;
  if(small){ /* 小表只留刻度 */ }
  else if(bip){
    txt(g, '−', cx - R + 3, cy - 8, {sz:11, b:1, c:o.ink || '#6b6350'});
    txt(g, '＋', cx + R - 5, cy - 8, {sz:9, b:1, c:o.ink || '#6b6350'});
    txt(g, '0', cx, cy - R + 2, {sz:9, c:o.ink || '#6b6350'});
  }else{
    txt(g, '0', cx - R + 2, cy - 6, {sz:9, c:o.ink || '#6b6350'});
    txt(g, o.maxLab != null ? o.maxLab : String(o.max), cx + R - 2, cy - 6,
        {sz:9, c:o.ink || '#6b6350'});
  }

  /* 指针 */
  const raw = (o.max ? (o.val || 0)/o.max : 0);
  const t = Math.max(bip ? -1 : 0, Math.min(1, raw));
  const a = (bip ? t : t*2 - 1) * span - Math.PI/2;
  g.save();
  g.strokeStyle = o.needle || '#c8422f'; g.lineWidth = 2.2; g.lineCap = 'round';
  g.beginPath(); g.moveTo(cx, cy);
  g.lineTo(cx + Math.cos(a)*(R-5), cy + Math.sin(a)*(R-5));
  g.stroke(); g.restore();
  g.save(); g.fillStyle = '#3a3527';
  g.beginPath(); g.arc(cx, cy, 4.2, 0, TAU); g.fill(); g.restore();

  /* 数值印在表盘上半部：位置要避开弧顶那个「0」刻度标（实测 0.30 会压上去） */
  if(o.show !== false && o.valText)
    txt(g, o.valText, cx, y + h*0.20, {sz:o.valSz || 13, b:1, c:'#3a3527'});
  if(o.unit) txt(g, o.unit, x + w - 6, y + 11, {sz:9, c:'#6b6350', al:'right'});
  if(o.label) txt(g, o.label, cx, cy + 15, {sz:9.5, c:'#6b6350'});
}

/* ================= 仪表：走纸记录仪 =================
   把一段滚动缓冲画成一条条曲线。左边旧、右边新。
   讲「变化率」只有这个办法讲得清：一条量本身、一条它的变化，
   前者到峰值的那一刻后者正好过零。

   strip(g, x, y, w, h, buf, defs, {n, bg})
     buf  = [[v0,v1,…], …]  每帧 push 一个样本，长度自己截断
     defs = [{i:0, color:'#2f86c9', scale:1/0.6},
             {i:1, color:'#e0731a', auto:true, floor:8}]
   **auto 的那条要按缓冲区里的实际最大值缩放** —— 写死比例的话，
   参数一翻倍（比如线圈匝数 ×2）曲线就削顶成一条平台。 */
function strip(g, x, y, w, h, buf, defs, o){
  o = o || {};
  box(g, x, y, w, h, 4, o.bg || C.box, o.line || C.boxLine, 1);
  g.save();
  /* 零位基准线：深底上用浅灰（原来是 #cfd6dd）会变成一条抢戏的白线，
     还把停在零位的那两条曲线整个盖住 —— 它只是刻度，得让位给曲线 */
  g.strokeStyle = C.boxLine; g.lineWidth = 1;
  g.beginPath(); g.moveTo(x, y + h/2); g.lineTo(x + w, y + h/2); g.stroke();
  g.restore();
  if(!buf || buf.length < 2) return;
  const n = o.n || buf.length;
  const stepx = w / n;
  defs.forEach(function(d){
    let sc = d.scale;
    if(d.auto){
      let mx = d.floor || 1;
      buf.forEach(function(p){ mx = Math.max(mx, Math.abs(p[d.i])); });
      sc = 1/(mx*1.1);
    }
    g.save();
    g.strokeStyle = d.color; g.lineWidth = d.lw || 1.8; g.lineJoin = 'round';
    g.beginPath();
    buf.forEach(function(p, i){
      const px = x + i*stepx;
      const vv = Math.max(-1, Math.min(1, p[d.i]*sc));
      const py = y + h/2 - vv*(h/2 - 4);
      i ? g.lineTo(px, py) : g.moveTo(px, py);
    });
    g.stroke(); g.restore();
  });
}

/* 走纸图的图例：一行色条 + 名字 */
function stripLegend(g, x, y, items){
  let cx = x;
  items.forEach(function(it){
    g.save(); g.fillStyle = it[1]; g.fillRect(cx, y - 1.2, 12, 2.4); g.restore();
    txt(g, it[0], cx + 16, y, {sz:9.5, c:C.tx2, al:'left'});
    cx += 16 + tw(g, it[0], 9.5) + 16;
  });
}

/* ================= 主循环 ================= */
/* 只画当前这一页。fn(dt, t) —— dt 是秒 */
/* 返回一个句柄 {stop()}：单页站切走一节时要停掉它的 rAF，
   否则六节的循环会一直在后台跑（耗电、手机发烫）。
   旧的六个薄壳页照旧忽略返回值，向后兼容。 */
function loop(fn){
  let last = 0, alive = true, id = 0;
  function step(ts){
    if(!alive) return;
    const t = ts / 1000;
    let dt = last ? (t - last) : 0;
    last = t;
    if(dt > 0.1) dt = 0.1;          /* 切回前台时别跳一大步 */
    fn(dt, t);
    id = global.requestAnimationFrame(step);
  }
  id = global.requestAnimationFrame(step);
  return { stop(){ alive = false; if(id) global.cancelAnimationFrame(id); } };
}

global.EC = {
  TAU:TAU, RM:RM, C:C, PAL:PAL, theme:theme,
  Path:Path, bez:bez, Stage:Stage, loop:loop,
  head:head, flowArrows:flowArrows, dots:dots, glow:glow,
  txt:txt, tw:tw, box:box, tag:tag,
  battery:battery, cell:cell, lamp:lamp, resistor:resistor,
  dial:dial, strip:strip, stripLegend:stripLegend,
  switchSym:switchSym, meter:meter, node:node, dimV:dimV,
  $:function(id){ return document.getElementById(id); }
};

})(typeof window!=='undefined' ? window : globalThis);
