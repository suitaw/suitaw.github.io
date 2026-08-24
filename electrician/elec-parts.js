/* ==================================================================
   elec-parts.js —— 元件库 + 标注排版（统一风格），全局挂到 EP

   2026-08-23 第二版：**按他给的「元件库（统一风格）」样式表重做**，
   同时补上标注的字体层级和引线 —— 他的原话：
   「不只是元件，标注字体也设计一下，还有文字排版，改的好看点」。

   第一版是照片级质感（深蓝干电池、米色色环电阻、胶木闸刀）。两个毛病：
   小尺寸认不出（色环挤成一团）、几件东西凑一起风格打架。新风格是

     **半扁平 + 柔和渐变 + 细深色描边**
     - 电阻 / 可变电阻 = 蓝色胶囊（一眼认得出）
     - 电池 = 圆柱体 + 红色 ＋ 帽
     - 开关 = 两个圆触点 + 一根刀，断开时斜着
     - 灯泡 = 玻璃壳 + 灯丝 + 灯座，亮度四档
     - 导线三档粗细：普通 / 通电高亮 / 粗（大电流）
     - 电子 = 蓝点（实际方向），电流 = 琥珀色箭头（规定方向）

   **标注按技术制图那一套排**（查过的通行做法：标签紧挨着被标的东西，
   放不下就用引线牵出去，字一律水平放正，别让标签互相压）：
     EP.callout()  数值（粗体、带色）在上，名称（小字、灰）在下，一条细引线牵到元件
     EP.chip()     胶囊底板的小标签，压在图上也读得清
     EP.TYPE       四档字号：val 数值 / name 名称 / note 注解 / tiny 极小
   ================================================================== */
(function(global){
'use strict';

const TAU = Math.PI*2;

/* 统一色板 —— 六节课共用，看着才像同一套器材 */
const P = {
  ink:'#2b3038', inkL:'#5b6672', inkLL:'#8b949e',
  /* ---- 真实材料色（元件本体只能用这些，蓝/橙/红/绿是教学语义色，不许拿来给元件上色）---- */
  steel:'#c3cad2', steelD:'#8b949e', steelDD:'#5b6672',   /* 镀镍/不锈钢 */
  chrome:'#eef2f6',                                        /* 高光金属 */
  copper:'#b87333', copperD:'#8a5418', copperL:'#e0a56a',  /* 铜、电阻丝 */
  bakelite:'#23272c', bakeliteL:'#3a4048',                 /* 胶木/塑料底座 */
  body:'#3a4048', bodyD:'#20242a', bodyL:'#6b737d',        /* 深灰机身 */
  cream:'#e8dcc0', creamD:'#c9b98f',                       /* 电阻米黄本体 */
  ceramic:'#efe9dc',                                       /* 瓷管 */
  glass:'#eaf0f5',                                         /* 玻璃 */
  tungsten:'#9aa0a6',                                      /* 钨丝（不亮时）*/
  warm:'#ffd08a', warmHot:'#fff3d6',                       /* 灯丝发光 */
  blue:'#4a90d9', blueD:'#2f6fb0', blueL:'#cfe0f5',
  hot:'#1e6fd0',
  amber:'#f0a020', ele:'#2a86d8',
  brass:'#c9a227', brassD:'#8a6d12',
  green:'#2f9e44', red:'#d5342a',
  panel:'#e7ebf0', panelD:'#c3cad2',
  lcd:'#111a16', lcdInk:'#5ce08a'
};

/* 统一规格：线宽、圆角、高光方向 —— 所有元件都从这里取，不许各画各的
   （设计规范要求：线条粗细统一、圆角统一、阴影方向统一、高光风格统一） */
const S = {
  wire:2.8,        /* 导线 */
  lead:2.4,        /* 元件引脚 */
  edge:1.2,        /* 元件描边 */
  r:6,             /* 通用圆角 */
  hiA:0.55,        /* 高光透明度，一律画在左上 */
  shA:0.10         /* 阴影透明度，一律落在右下 */
};

/* 字体层级：画布上所有文字只准从这四档里挑 */
const TYPE = {
  val:  {sz:12.5, b:1},                 /* 数值：E = 1.5 V */
  name: {sz:9.5,  c:P.inkL},            /* 名称：电池电动势 */
  note: {sz:10,   c:P.inkLL},           /* 注解、图例 */
  tiny: {sz:8.5,  c:P.inkLL}            /* 极小：COM、V */
};

function rr(g, x, y, w, h, r){
  const k = Math.min(r, w/2, h/2);
  g.beginPath();
  g.moveTo(x+k, y);
  g.arcTo(x+w, y, x+w, y+h, k);
  g.arcTo(x+w, y+h, x, y+h, k);
  g.arcTo(x, y+h, x, y, k);
  g.arcTo(x, y, x+w, y, k);
  g.closePath();
}
function cyl(g, y0, y1, dark, mid, light){
  const gr = g.createLinearGradient(0, y0, 0, y1);
  gr.addColorStop(0,    dark);
  gr.addColorStop(0.32, light || mid);
  gr.addColorStop(0.62, mid);
  gr.addColorStop(1,    dark);
  return gr;
}
function shade(hex, k){
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if(!m) return hex;
  const f = (v)=> Math.max(0, Math.min(255, Math.round(k<0 ? v*(1+k) : v+(255-v)*k)));
  return 'rgb('+f(parseInt(m[1],16))+','+f(parseInt(m[2],16))+','+f(parseInt(m[3],16))+')';
}
function txt(g, s, x, y, o){ global.EC.txt(g, s, x, y, o); }
function tw(g, s, sz, b){ return global.EC.tw(g, s, sz, b); }

/* ================= 标注 =================
   callout(g, ax, ay, tx, ty, value, name, {color, al, dot})
     (ax,ay) 元件上的锚点，(tx,ty) 文字位置。
     数值粗体在上、名称小字在下，中间一条细引线。
     al:'left' 文字在锚点右边（默认）；'right' 在左边。 */
function callout(g, ax, ay, tx, ty, value, name, o){
  o = o || {};
  const col = o.color || P.ink;
  const al = o.al || 'left';
  /* 引线：先横后斜的一段折线，末端不带箭头（技术制图的习惯） */
  g.save();
  g.strokeStyle = o.line || 'rgba(91,102,114,.55)';
  g.lineWidth = 1; g.setLineDash(o.dash || []);
  g.beginPath();
  g.moveTo(ax, ay);
  const midx = al === 'left' ? tx - 8 : tx + 8;
  g.lineTo(midx, ty);
  g.lineTo(tx, ty);
  g.stroke();
  g.restore();
  if(o.dot !== false){
    g.save(); g.fillStyle = col;
    g.beginPath(); g.arc(ax, ay, 2.4, 0, TAU); g.fill(); g.restore();
  }
  txt(g, value, tx, ty - 6, {sz:TYPE.val.sz, b:1, c:col, al:al});
  if(name) txt(g, name, tx, ty + 8, {sz:TYPE.name.sz, c:TYPE.name.c, al:al});
}

/* 胶囊底板小标签：压在图形上也读得清 */
function chip(g, s, x, y, o){
  o = o || {};
  const sz = o.sz || 10.5;
  const w = tw(g, s, sz, o.b) + 14, h = sz + 9;
  let bx = x - w/2;
  if(o.al === 'left') bx = x;
  if(o.al === 'right') bx = x - w;
  g.save();
  rr(g, bx, y - h/2, w, h, h/2);
  g.fillStyle = o.fill || 'rgba(255,255,255,.92)'; g.fill();
  if(o.line !== false){ g.strokeStyle = o.line || 'rgba(139,148,158,.5)'; g.lineWidth = 1; g.stroke(); }
  g.restore();
  txt(g, s, bx + w/2, y, {sz:sz, b:o.b, c:o.c || P.ink});
  return {x:bx, y:y-h/2, w:w, h:h};
}

/* 图例行：一排「色块 + 文字」，居中排 */
function legend(g, cx, y, items){
  let total = 0;
  items.forEach(function(it){ total += 16 + tw(g, it[0], TYPE.note.sz) + 20; });
  let x = cx - total/2;
  items.forEach(function(it){
    const kind = it[2] || 'dot';
    g.save();
    if(kind === 'arrow'){
      global.EC.head(g, x+5, y, 1, 0, 5, it[1]);
    }else if(kind === 'bar'){
      g.fillStyle = it[1]; g.fillRect(x, y-1.6, 14, 3.2);
    }else{
      g.fillStyle = it[1];
      g.beginPath(); g.arc(x+5, y, 3.6, 0, TAU); g.fill();
    }
    g.restore();
    txt(g, it[0], x + 16, y, {sz:TYPE.note.sz, c:TYPE.note.c, al:'left'});
    x += 16 + tw(g, it[0], TYPE.note.sz) + 20;
  });
}

/* 画布上的小标题：粗体主标 + 灰色补充，左对齐 */
function heading(g, x, y, title, sub){
  txt(g, title, x, y, {sz:11.5, b:1, c:P.ink, al:'left'});
  if(sub) txt(g, sub, x + tw(g, title, 11.5, true) + 10, y,
              {sz:TYPE.note.sz, c:TYPE.note.c, al:'left'});
}

/* ================= 导线 ================= */
const WIRE_W = { normal:S.wire, hot:S.wire, thick:5.2 };
/* 实验导线的常见颜色：黑（默认/接负极）、红（接正极）、蓝、黄 */
const WIRE_C = { black:'#23272c', red:'#c0392b', blue:'#1e5fa8', yellow:'#d9a520' };
/* **导线永远是一条连续、干净的线**，通电不改变导线颜色，只在上面加少量蓝色电子粒子。
   把导线画成一串圆点是明确禁止的做法。 */
function wire(g, path, o){
  o = o || {};
  const w = o.w || WIRE_W[o.kind || 'normal'] || S.wire;
  const col = o.color || WIRE_C[o.c || 'black'] || P.ink;
  /* 右下淡投影 */
  g.save(); g.translate(0.8, 1.1);
  path.stroke(g, w, 'rgba(20,23,27,'+S.shA+')');
  g.restore();
  path.stroke(g, w, shade(col, -0.25));          /* 外皮暗边 */
  path.stroke(g, w - 1.4, col);                  /* 橡胶外皮 */
  g.save(); g.globalAlpha = 0.28;                /* 左上一道细高光，像塑料 */
  path.stroke(g, Math.max(0.8, w*0.22), '#ffffff');
  g.restore();
}

function node(g, x, y, r){
  g.save(); g.fillStyle = P.ink;
  g.beginPath(); g.arc(x, y, r || 3.4, 0, TAU); g.fill(); g.restore();
}

/* ================= 电子 / 电流 =================
   电子：蓝点（实际方向）；电流：琥珀箭头（规定方向）。
   两者故意错开半个间距，免得叠在一起看成一串珠子。 */
function flow(g, path, o){
  o = o || {};
  const gap = o.gap || 56, dir = (o.dir === -1) ? -1 : 1;   /* 少量粒子，别铺满 */
  const skip = o.skip || [];
  let ph = (o.phase || 0) * dir;
  ph = ph % gap; if(ph < 0) ph += gap;
  for(let s = ph; s <= path.len; s += gap){
    let hid = false;
    for(let i=0;i<skip.length;i++) if(s > skip[i][0] && s < skip[i][1]){ hid = true; break; }
    if(hid) continue;
    const p = path.at(s), d = path.dir(s);
    if(o.kind === 'cur'){
      global.EC.head(g, p[0], p[1], d[0]*dir, d[1]*dir, o.size || 5.4, o.color || P.amber);
    }else{
      g.save();
      g.fillStyle = o.color || P.ele;
      g.beginPath(); g.arc(p[0], p[1], o.r || 3.4, 0, TAU); g.fill();
      g.globalAlpha = 0.6; g.fillStyle = '#fff';
      g.beginPath(); g.arc(p[0]-1, p[1]-1, (o.r || 3.6)*0.38, 0, TAU); g.fill();
      g.restore();
    }
  }
}

/* ================= 电池 =================
   真实干电池：深灰/黑机身、白色标签环、**银色正极帽**，红色只用来做正极标识。
   规范里写死了：不许把整节电池染成蓝色，正负极要一眼认得出。 */
function cell(g, x, y, len, dia, o){
  o = o || {};
  const horiz = o.horiz !== false;
  const flip = o.flip ? -1 : 1;
  g.save();
  g.translate(x, y);
  if(!horiz) g.rotate(-Math.PI/2);
  if(flip < 0) g.scale(-1, 1);
  const L = len, D = dia, half = L/2, hd = D/2;

  /* 机身：深灰金属 */
  rr(g, -half, -hd, L, D, D*0.24);
  g.fillStyle = cyl(g, -hd, hd, P.bodyD, P.body, P.bodyL);
  g.fill();
  /* 白色标签环（印电压的地方） */
  g.save();
  rr(g, -half+L*0.24, -hd, L*0.44, D, 2); g.clip();
  g.fillStyle = cyl(g, -hd, hd, '#c9ced4', '#ffffff', '#ffffff');
  g.fillRect(-half, -hd, L, D);
  g.restore();
  /* 负极端：深黑一小段 */
  g.save();
  rr(g, -half, -hd, L*0.16, D, D*0.24); g.clip();
  g.fillStyle = cyl(g, -hd, hd, '#0e1013', '#23272c', '#3d444c');
  g.fillRect(-half, -hd, L*0.16, D);
  g.restore();
  /* 正极：银色帽 + 一圈红色标识环 */
  g.save();
  rr(g, half-L*0.14, -hd, L*0.14, D, D*0.24); g.clip();
  g.fillStyle = cyl(g, -hd, hd, P.steelDD, P.steel, P.chrome);
  g.fillRect(half-L*0.14, -hd, L*0.14, D);
  g.fillStyle = '#c0392b';
  g.fillRect(half-L*0.14, -hd, 3, D);         /* 红色标识环 */
  g.restore();
  /* 正极凸头（银） */
  rr(g, half-1.5, -hd*0.32, 5.5, hd*0.64, 2);
  g.fillStyle = cyl(g, -hd*0.32, hd*0.32, P.steelD, P.chrome, '#ffffff');
  g.fill();
  /* 描边 + 左上高光 */
  rr(g, -half, -hd, L, D, D*0.24);
  g.strokeStyle = '#171b20'; g.lineWidth = S.edge; g.stroke();
  g.save(); g.globalAlpha = S.hiA;
  g.strokeStyle = '#fff'; g.lineWidth = 1.8; g.lineCap = 'round';
  g.beginPath(); g.moveTo(-half+D*0.3, -hd+3.2); g.lineTo(half-D*0.45, -hd+3.2); g.stroke();
  g.restore();
  /* 标签上印电压 */
  if(o.volt !== false && L > 40){
    g.save();
    if(!horiz) g.rotate(Math.PI/2);
    txt(g, o.volt || '1.5V', 0, horiz ? 0 : 0, {sz:Math.min(11, D*0.5), b:1, c:'#2b3038'});
    g.restore();
  }
  g.restore();

  /* ± 标识：红＋、黑− */
  if(o.pm !== false){
    const sgn = horiz ? 1 : 0;
    txt(g, '＋', x + (sgn ? (half*flip+13) : 0), y + (sgn ? 0 : -half*flip-13),
        {sz:13, b:1, c:'#c0392b'});
    txt(g, '−', x + (sgn ? (-half*flip-13) : 0), y + (sgn ? 0 : half*flip+13),
        {sz:14, b:1, c:'#23272c'});
  }
  if(o.label) txt(g, o.label, x + (o.lx||0), y + (o.ly != null ? o.ly : (horiz ? dia/2+14 : 0)),
                  {sz:o.lsz||TYPE.val.sz, b:1, c:P.ink});
}

/* ================= 电阻 =================
   真实色环电阻：米黄本体、银灰引脚、四道色环（默认 棕-黑-金-金 ≈ 1 Ω 级别的样子）。
   规范：不许做成统一蓝色胶囊。 */
function resistor(g, x, y, o){
  o = o || {};
  const horiz = o.horiz !== false;
  const L = o.len || 44, D = o.dia || 17;
  g.save();
  g.translate(x, y);
  if(!horiz) g.rotate(-Math.PI/2);
  /* 银色引脚 */
  g.strokeStyle = P.steelD; g.lineWidth = S.lead; g.lineCap = 'round';
  g.beginPath();
  g.moveTo(-L/2-11, 0); g.lineTo(-L/2+2, 0);
  g.moveTo(L/2-2, 0);   g.lineTo(L/2+11, 0);
  g.stroke();
  g.save(); g.globalAlpha = 0.55;
  g.strokeStyle = P.chrome; g.lineWidth = 1;
  g.beginPath();
  g.moveTo(-L/2-11, -0.9); g.lineTo(-L/2+2, -0.9);
  g.moveTo(L/2-2, -0.9);   g.lineTo(L/2+11, -0.9);
  g.stroke(); g.restore();
  /* 米黄本体 */
  rr(g, -L/2, -D/2, L, D, D*0.42);
  g.fillStyle = cyl(g, -D/2, D/2, P.creamD, P.cream, '#f8f1de');
  g.fill();
  g.strokeStyle = '#9c8a5e'; g.lineWidth = S.edge; g.stroke();
  /* 色环 */
  const bands = o.bands || ['#6b4423', '#1b1b1b', BAND.gold, BAND.gold];
  g.save();
  rr(g, -L/2, -D/2, L, D, D*0.42); g.clip();
  bands.forEach(function(c, i2){
    const bw = L*0.075;
    const bx = -L/2 + L*(0.20 + i2*0.155);
    g.fillStyle = c;
    g.fillRect(bx, -D/2, bw, D);
    g.save(); g.globalAlpha = 0.22; g.fillStyle = '#000';
    g.fillRect(bx, D*0.18, bw, D*0.32); g.restore();      /* 环也跟着圆柱变暗 */
  });
  g.restore();
  /* 左上高光 */
  g.save(); g.globalAlpha = S.hiA;
  g.strokeStyle = '#fff'; g.lineWidth = 1.7; g.lineCap = 'round';
  g.beginPath(); g.moveTo(-L/2+D*0.42, -D/2+3.2); g.lineTo(L/2-D*0.42, -D/2+3.2); g.stroke();
  g.restore();
  g.restore();
  if(o.label) txt(g, o.label, x + (o.lx||0), y + (o.ly != null ? o.ly : (horiz ? -D/2-12 : 0)),
                  {sz:o.lsz||TYPE.val.sz, b:1, c:o.lc || P.ink});
}

/* 可变电阻（小型）：陶瓷管 + 铜电阻丝 + 银滑片。t = 0..1 */
function rheostat(g, x, y, t, o){
  o = o || {};
  const L = o.len || 62, D = o.dia || 17;
  const horiz = o.horiz !== false;
  const tt = Math.max(0, Math.min(1, t == null ? 0.5 : t));
  g.save();
  g.translate(x, y);
  if(!horiz) g.rotate(-Math.PI/2);
  g.strokeStyle = P.steelD; g.lineWidth = S.lead; g.lineCap = 'round';
  g.beginPath();
  g.moveTo(-L/2-11, 0); g.lineTo(-L/2+2, 0);
  g.moveTo(L/2-2, 0);   g.lineTo(L/2+11, 0);
  g.stroke();
  /* 瓷管 */
  rr(g, -L/2, -D/2, L, D, D*0.3);
  g.fillStyle = cyl(g, -D/2, D/2, '#cbc3b1', P.ceramic, '#fdfaf3');
  g.fill();
  g.strokeStyle = '#a89f8b'; g.lineWidth = S.edge; g.stroke();
  /* 铜电阻丝：一圈圈绕在管上 */
  g.save();
  rr(g, -L/2, -D/2, L, D, D*0.3); g.clip();
  g.lineWidth = 1.5;
  for(let i2=0;i2<22;i2++){
    const px = -L/2 + 3 + i2*((L-6)/21);
    g.strokeStyle = (px + L/2) < L*tt ? P.copperD : P.copper;   /* 接入的那段颜色深一点 */
    g.beginPath(); g.moveTo(px, -D/2); g.lineTo(px, D/2); g.stroke();
  }
  g.restore();
  /* 银滑片 */
  const kx = -L/2 + L*tt;
  g.save();
  g.strokeStyle = P.steelDD; g.lineWidth = 2.4;
  g.beginPath(); g.moveTo(kx, -D/2-9); g.lineTo(kx, -D/2+2); g.stroke();
  rr(g, kx-7, -D/2-17, 14, 9, 2);
  g.fillStyle = cyl(g, -D/2-17, -D/2-8, P.steelDD, P.steel, P.chrome);
  g.fill();
  g.strokeStyle = P.steelDD; g.lineWidth = S.edge; g.stroke();
  g.restore();
  g.restore();
  if(o.label) txt(g, o.label, x + (o.lx||0), y + (o.ly != null ? o.ly : (horiz ? -D/2-22 : 0)),
                  {sz:o.lsz||TYPE.val.sz, b:1, c:P.ink});
}

/* ================= 开关 =================
   黑色胶木底座 + 银色接线柱 + 银色拨杆。
   **状态只靠机械结构表现**：断开＝看得见空气间隙，闭合＝拨杆和两端接实。
   规范明确禁止「红＝断开、绿＝闭合」那种靠颜色判断的做法。 */
function knife(g, x, y, on, o){
  o = o || {};
  const w = o.w || 52;
  const x0 = x - w/2, x1 = x + w/2;
  /* 胶木底座 */
  g.save();
  rr(g, x0-9, y-3, w+18, 13, 3);
  g.fillStyle = cyl(g, y-3, y+10, '#14171b', P.bakelite, P.bakeliteL);
  g.fill();
  g.strokeStyle = '#0d1013'; g.lineWidth = S.edge; g.stroke();
  g.restore();
  /* 引出线 */
  g.save();
  g.strokeStyle = P.ink; g.lineWidth = S.lead; g.lineCap = 'round';
  g.beginPath();
  g.moveTo(x0-12, y); g.lineTo(x0-9, y);
  g.moveTo(x1+9, y);  g.lineTo(x1+12, y);
  g.stroke();
  /* 拨杆：银色金属，断开时抬起 —— 间隙必须看得见 */
  g.translate(x0, y);
  if(!on) g.rotate(-0.55);
  g.lineCap = 'round';
  g.strokeStyle = P.steelDD; g.lineWidth = 4.6;
  g.beginPath(); g.moveTo(0, 0); g.lineTo(w, 0); g.stroke();
  g.strokeStyle = P.steel; g.lineWidth = 3;
  g.beginPath(); g.moveTo(0, 0); g.lineTo(w, 0); g.stroke();
  g.save(); g.globalAlpha = 0.7;
  g.strokeStyle = P.chrome; g.lineWidth = 1.1;
  g.beginPath(); g.moveTo(2, -1.1); g.lineTo(w-3, -1.1); g.stroke();
  g.restore();
  /* 手柄 */
  rr(g, w-3, -5, 9, 10, 3);
  g.fillStyle = cyl(g, -5, 5, '#14171b', '#3a4048', '#6b737d');
  g.fill();
  g.strokeStyle = '#0d1013'; g.lineWidth = 1; g.stroke();
  g.restore();
  /* 两个银色接线柱（闭合时拨杆压在右柱上）*/
  [x0, x1].forEach(function(px){
    g.save();
    const gr = g.createRadialGradient(px-1.6, y-1.6, 0.8, px, y, 5.4);
    gr.addColorStop(0, '#ffffff'); gr.addColorStop(0.55, P.steel); gr.addColorStop(1, P.steelDD);
    g.fillStyle = gr;
    g.beginPath(); g.arc(px, y, 5.4, 0, TAU); g.fill();
    g.strokeStyle = '#5b6672'; g.lineWidth = 1.1; g.stroke();
    g.restore();
  });
  if(o.label) txt(g, o.label, x, y + (o.ly || -20), {sz:10.5, b:1, c:P.inkL});
}

/* ================= 灯泡 =================
   透明玻璃球 + 钨丝 + 银灰灯座。
   规范：**不要把整个灯泡染成黄色** —— 亮度只由「灯丝亮度 + 轻微暖光晕」表现；
   熄灭时玻璃透明、灯丝暗、没有光晕。四档：熄灭/微亮/正常/很亮。 */
function bulbLevel(b){ return b < 0.02 ? 0 : (b < 0.35 ? 1 : (b < 0.7 ? 2 : 3)); }
function bulb(g, x, y, R, b, o){
  o = o || {};
  b = Math.max(0, Math.min(1, b || 0));
  const lv = bulbLevel(b);
  const lit = lv > 0;

  /* 暖色光晕：克制，只在灯丝周围一小圈 */
  if(lit){
    const spec = [null, {rad:1.5, a:0.18}, {rad:2.0, a:0.30}, {rad:2.5, a:0.42}][lv];
    const gr = g.createRadialGradient(x, y+R*0.06, R*0.15, x, y+R*0.06, R*spec.rad);
    gr.addColorStop(0, 'rgba(255,214,150,'+spec.a.toFixed(2)+')');
    gr.addColorStop(0.45,'rgba(255,206,130,'+(spec.a*0.4).toFixed(2)+')');
    gr.addColorStop(1, 'rgba(255,206,130,0)');
    g.save(); g.fillStyle = gr;
    g.beginPath(); g.arc(x, y+R*0.06, R*spec.rad, 0, TAU); g.fill(); g.restore();
  }

  /* 灯座：银灰金属螺纹 + 深灰底 */
  const bw = R*0.78, bh = R*0.60, by = y + R*0.80;
  g.save();
  rr(g, x-bw/2, by, bw, bh, 2);
  g.fillStyle = cyl(g, by, by+bh, P.steelDD, P.steel, P.chrome);
  g.fill();
  g.strokeStyle = '#5b6672'; g.lineWidth = S.edge; g.stroke();
  g.strokeStyle = 'rgba(91,102,114,.55)'; g.lineWidth = 0.9;
  for(let i2=1;i2<3;i2++){
    const yy = by + bh*i2/3;
    g.beginPath(); g.moveTo(x-bw/2+1, yy); g.lineTo(x+bw/2-1, yy); g.stroke();
  }
  rr(g, x-bw*0.34, by+bh, bw*0.68, 3.2, 1.5);
  g.fillStyle = '#23272c'; g.fill();
  g.restore();

  /* 玻璃壳：始终透明，只有很亮时才带一点点暖色 */
  g.save();
  g.beginPath();
  g.moveTo(x-R*0.40, by+1);
  g.quadraticCurveTo(x-R*1.00, y+R*0.40, x-R*0.96, y-R*0.10);
  g.arc(x, y-R*0.10, R*0.96, Math.PI, 0);
  g.quadraticCurveTo(x+R*1.00, y+R*0.40, x+R*0.40, by+1);
  g.closePath();
  const gg = g.createRadialGradient(x-R*0.30, y-R*0.42, R*0.1, x, y, R*1.2);
  const warmA = lit ? [0, .06, .12, .20][lv] : 0;
  gg.addColorStop(0, 'rgba(255,255,255,.94)');
  gg.addColorStop(0.55,'rgba(232,240,246,'+(0.72 - warmA*0.6).toFixed(2)+')');
  gg.addColorStop(1, lit ? 'rgba(255,232,190,'+(0.42+warmA).toFixed(2)+')'
                         : 'rgba(200,212,222,.62)');
  g.fillStyle = gg; g.fill();
  g.strokeStyle = 'rgba(120,134,148,.85)'; g.lineWidth = 1.2; g.stroke();
  g.restore();

  /* 钨丝：不亮时是金属灰，亮起来才发暖白光 */
  g.save();
  const fy = y + R*0.06;
  g.strokeStyle = P.steelDD; g.lineWidth = 1.1;
  g.beginPath();
  g.moveTo(x-R*0.20, by); g.lineTo(x-R*0.20, fy);
  g.moveTo(x+R*0.20, by); g.lineTo(x+R*0.20, fy);
  g.stroke();
  const coilPath = function(){
    g.beginPath();
    for(let i2=0;i2<=10;i2++){
      const px = x - R*0.20 + (R*0.40)*i2/10;
      g.lineTo(px, fy - ((i2%2) ? R*0.19 : 0));
    }
  };
  if(lit){
    g.save();
    g.globalAlpha = [0, .30, .48, .65][lv]; g.lineWidth = 5.5;
    g.strokeStyle = P.warmHot; coilPath(); g.stroke(); g.restore();
  }
  g.lineWidth = lit ? 2.0 : 1.5;
  g.strokeStyle = lit
    ? ['', '#f5c96a', '#ffdf9c', '#fff6e0'][lv]
    : P.tungsten;
  coilPath(); g.stroke();
  g.restore();

  /* 玻璃高光：一律左上 */
  g.save(); g.globalAlpha = 0.85;
  g.strokeStyle = '#fff'; g.lineWidth = 2.2; g.lineCap = 'round';
  g.beginPath(); g.arc(x, y-R*0.10, R*0.70, Math.PI*1.12, Math.PI*1.42);
  g.stroke(); g.restore();

  if(o.label) txt(g, o.label, x, y + R*2.0, {sz:o.lsz||TYPE.name.sz, c:TYPE.name.c});
}

/* 灯座：深灰胶木 + 两个银色接线柱 */
function lampHolder(g, x, y, w, h){
  g.save();
  rr(g, x-w/2, y, w, h, 3);
  g.fillStyle = cyl(g, y, y+h, '#14171b', P.bakelite, P.bakeliteL);
  g.fill();
  g.strokeStyle = '#0d1013'; g.lineWidth = S.edge; g.stroke();
  g.restore();
  terminal(g, x-w/2+5, y+h-4, 3.2);
  terminal(g, x+w/2-5, y+h-4, 3.2);
}

/* 接线柱：银色金属座 + 红（正）/ 黑（负）/ 银（不分极）三种帽 */
function terminal(g, x, y, r, o){
  o = o || {};
  r = r || 5;
  const cap = o.pole === '+' ? ['#e0554a', '#c0392b', '#7e1f16']
            : o.pole === '-' ? ['#5b6672', '#23272c', '#0d1013']
            : [P.chrome, P.steel, P.steelDD];
  g.save();
  /* 金属底座 */
  g.fillStyle = P.steelD;
  g.beginPath(); g.arc(x, y, r*1.15, 0, TAU); g.fill();
  /* 帽 */
  const gr = g.createRadialGradient(x-r*0.38, y-r*0.38, r*0.12, x, y, r);
  gr.addColorStop(0, cap[0]); gr.addColorStop(0.6, cap[1]); gr.addColorStop(1, cap[2]);
  g.fillStyle = gr;
  g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill();
  g.strokeStyle = cap[2]; g.lineWidth = 1; g.stroke();
  g.restore();
}

/* ================= 交互高亮 =================
   规范：点中一个元件时**不许改它的真实颜色**，只加一圈细蓝描边 + 柔和蓝光晕。
   highlight(g, x, y, w, h, {r}) —— 圈住元件的外接矩形 */
function highlight(g, x, y, w, h, o){
  o = o || {};
  const rad = o.r || 10;
  g.save();
  g.globalAlpha = 0.16;
  g.strokeStyle = P.blue; g.lineWidth = 7;
  rr(g, x-4, y-4, w+8, h+8, rad+3); g.stroke();
  g.globalAlpha = 1;
  g.strokeStyle = P.blue; g.lineWidth = 1.6;
  rr(g, x-4, y-4, w+8, h+8, rad+3); g.stroke();
  g.restore();
}

/* ================= 表计 ================= */
/* 表计：白色表盘 + 深灰金属圈 + 黑色字母（真实仪表的样子，
   不用蓝/绿上色 —— 那两个颜色在这套规范里是教学语义色） */
function meterInline(g, x, y, r, ch, o){
  o = o || {};
  g.save();
  g.beginPath(); g.arc(x, y, r+1.6, 0, TAU);
  g.fillStyle = P.steelD; g.fill();                 /* 金属外圈 */
  g.beginPath(); g.arc(x, y, r, 0, TAU);
  const gr = g.createRadialGradient(x-r*0.35, y-r*0.35, r*0.15, x, y, r);
  gr.addColorStop(0, '#ffffff'); gr.addColorStop(1, '#e8ecf1');
  g.fillStyle = gr; g.fill();
  g.strokeStyle = P.steelDD; g.lineWidth = 1.4; g.stroke();
  g.restore();
  txt(g, ch, x, y, {sz:r*1.05, b:1, c:'#23272c'});
  if(o.val != null) txt(g, o.val, x, y - r - 11, {sz:TYPE.val.sz, b:1, c:P.blueD});
  if(o.label) txt(g, o.label, x, y + r + 12, {sz:TYPE.name.sz, c:TYPE.name.c});
}

function readout(g, x, y, w, h, text, o){
  o = o || {};
  g.save();
  rr(g, x, y, w, h, 6);
  g.fillStyle = P.lcd; g.fill();
  g.strokeStyle = '#0a0f0c'; g.lineWidth = 1.2; g.stroke();
  g.save();
  rr(g, x+2, y+2, w-4, h-4, 5); g.clip();
  g.globalAlpha = 0.3; g.strokeStyle = P.lcdInk; g.lineWidth = 1.4;
  g.beginPath();
  for(let i=0;i<=40;i++){
    const px = x + 4 + (w-8)*i/40;
    const py = y + h/2 + Math.sin(i*0.55 + (o.t||0)) * (h*0.16);
    i ? g.lineTo(px, py) : g.moveTo(px, py);
  }
  g.stroke(); g.restore();
  g.restore();
  txt(g, text, x + w/2, y + h/2, {sz:o.sz || (h*0.46), b:1, c:P.lcdInk});
  if(o.label) txt(g, o.label, x + w/2, y - 10, {sz:TYPE.name.sz, c:TYPE.name.c});
}

function panelMeter(g, x, y, w, h, o){
  o = o || {};
  g.save();
  rr(g, x, y, w, h, 6);
  g.fillStyle = cyl(g, y, y+h, '#14171b', P.body, P.bodyL);
  g.fill();
  g.strokeStyle = P.ink; g.lineWidth = 1.3; g.stroke();
  g.restore();
  if(global.EC.dial){
    const inner = {}; for(const k in o) inner[k] = o[k];
    inner.label = null;
    global.EC.dial(g, x+5, y+5, w-10, h-10, inner);
  }
  if(o.label) txt(g, o.label, x + w/2, y + h + 10, {sz:TYPE.name.sz, c:TYPE.name.c});
}

function multimeter(g, x, y, w, h, o){
  o = o || {};
  g.save();
  rr(g, x, y, w, h, 9);
  g.fillStyle = cyl(g, y, y+h, '#14171b', P.body, P.bodyL);   /* 深灰黑机身 */
  g.fill();
  g.strokeStyle = '#0d1013'; g.lineWidth = 1.4; g.stroke();
  g.fillStyle = '#a8432a';                                     /* 侧边橡胶护套 */
  rr(g, x+2, y+h*0.30, 5, h*0.42, 3); g.fill();
  rr(g, x+w-7, y+h*0.30, 5, h*0.42, 3); g.fill();
  g.restore();

  const lw = w*0.74, lh = h*0.24, lx = x + (w-lw)/2, ly = y + h*0.08;
  readout(g, lx, ly, lw, lh, (o.reading || '0.00') + (o.unit ? ' ' + o.unit : ''),
          {sz:Math.max(12, lh*0.56)});

  const kx = x + w/2, ky = y + h*0.58, kr = Math.min(w, h)*0.18;
  g.save();
  const kg = g.createRadialGradient(kx-kr*0.4, ky-kr*0.4, kr*0.2, kx, ky, kr);
  kg.addColorStop(0, '#6b737d'); kg.addColorStop(0.6, '#23272c'); kg.addColorStop(1, '#0d1013');
  g.fillStyle = kg;
  g.beginPath(); g.arc(kx, ky, kr, 0, TAU); g.fill();
  g.strokeStyle = P.ink; g.lineWidth = 1.2; g.stroke();
  const a = (o.knob == null ? -2.2 : o.knob);
  g.strokeStyle = '#fff'; g.lineWidth = 2.4; g.lineCap = 'round';
  g.beginPath(); g.moveTo(kx, ky);
  g.lineTo(kx + Math.cos(a)*kr*0.8, ky + Math.sin(a)*kr*0.8);
  g.stroke();
  g.restore();
  g.save(); g.fillStyle = '#c9ced4';
  for(let i=0;i<8;i++){
    const aa = -Math.PI*1.25 + i*(Math.PI*1.5/7);
    g.beginPath();
    g.arc(kx + Math.cos(aa)*(kr+7), ky + Math.sin(aa)*(kr+7), 1.6, 0, TAU);
    g.fill();
  }
  g.restore();
  txt(g, o.mode || 'V⎓', kx + kr + 13, ky, {sz:10, b:1, c:'#f2f5f8'});

  const jy = y + h - 12;
  [[x + w*0.32, '#14171b', 'COM'], [x + w*0.62, '#a8302a', 'V']].forEach(function(a2){
    g.save();
    g.beginPath(); g.arc(a2[0], jy, 5.5, 0, TAU);
    g.fillStyle = a2[1]; g.fill();
    g.strokeStyle = '#1b2027'; g.lineWidth = 1.2; g.stroke();
    g.beginPath(); g.arc(a2[0], jy, 2.2, 0, TAU);
    g.fillStyle = '#0b0e12'; g.fill();
    g.restore();
    txt(g, a2[2], a2[0], jy - 11, {sz:TYPE.tiny.sz, c:'#e2e8ee'});
  });
  return { com:[x + w*0.32, jy], hot:[x + w*0.62, jy] };
}

/* ================= 线圈 / 磁铁 ================= */
function coil(g, cx, cy, half, r, n, front){
  const step = (2*half)/(n-1);
  for(let i=0;i<n;i++){
    const x = cx - half + i*step;
    g.save();
    g.lineWidth = 4; g.lineCap = 'round';
    g.strokeStyle = front ? '#c9862a' : '#96601b';
    g.beginPath();
    g.ellipse(x, cy, 8, r, 0, front ? 0 : Math.PI, front ? Math.PI : TAU);
    g.stroke();
    if(front){
      g.globalAlpha = 0.55; g.lineWidth = 1.4; g.strokeStyle = '#f7d79a';
      g.beginPath(); g.ellipse(x-1.2, cy, 8, r, 0, 0.35, Math.PI-0.35); g.stroke();
    }
    g.restore();
  }
}
function magnet(g, x, y, w, h, nRight){
  const half = w/2;
  [[-half, nRight ? '#1e6fd0' : '#d5342a', nRight ? 'S' : 'N'],
   [0,     nRight ? '#d5342a' : '#1e6fd0', nRight ? 'N' : 'S']].forEach(function(a){
    g.save();
    rr(g, x+a[0], y-h/2, half, h, 3);
    g.fillStyle = cyl(g, y-h/2, y+h/2, shade(a[1], -0.4), a[1], shade(a[1], 0.4));
    g.fill();
    g.strokeStyle = P.ink; g.lineWidth = 1.2; g.stroke();
    g.restore();
    txt(g, a[2], x + a[0] + half/2, y, {sz:Math.min(14, h*0.6), b:1, c:'#fff'});
  });
  g.save(); g.globalAlpha = 0.45;
  g.strokeStyle = '#fff'; g.lineWidth = 1.6;
  g.beginPath(); g.moveTo(x-half+4, y-h/2+3); g.lineTo(x+half-4, y-h/2+3); g.stroke();
  g.restore();
}

/* ================= 二极管 =================
   深蓝灰柱体 + 银色阴极环，箭头方向 = 允许通过的电流方向 */
function diode(g, x, y, o){
  o = o || {};
  const horiz = o.horiz !== false;
  const L = o.len || 34, D = o.dia || 15;
  g.save();
  g.translate(x, y);
  if(!horiz) g.rotate(-Math.PI/2);
  if(o.flip) g.scale(-1, 1);
  g.strokeStyle = P.ink; g.lineWidth = S.lead; g.lineCap = 'round';
  g.beginPath();
  g.moveTo(-L/2-10, 0); g.lineTo(-L/2+2, 0);
  g.moveTo(L/2-2, 0);   g.lineTo(L/2+10, 0);
  g.stroke();
  rr(g, -L/2, -D/2, L, D, 3);
  g.fillStyle = cyl(g, -D/2, D/2, '#1b2530', '#3d4b5a', '#6f8296');
  g.fill();
  /* 阴极银环 */
  g.fillStyle = cyl(g, -D/2, D/2, '#9aa4ae', '#e2e8ee', '#ffffff');
  g.fillRect(L/2-7, -D/2, 4.5, D);
  rr(g, -L/2, -D/2, L, D, 3);
  g.strokeStyle = P.ink; g.lineWidth = S.edge; g.stroke();
  /* 体上的小三角，指明导通方向 */
  g.fillStyle = '#c9ced4';
  g.beginPath();
  g.moveTo(-4, -D*0.26); g.lineTo(4, 0); g.lineTo(-4, D*0.26);
  g.closePath(); g.fill();
  g.save(); g.globalAlpha = S.hiA;
  g.strokeStyle = '#fff'; g.lineWidth = 1.5; g.lineCap = 'round';
  g.beginPath(); g.moveTo(-L/2+5, -D/2+3); g.lineTo(L/2-9, -D/2+3); g.stroke();
  g.restore();
  g.restore();
  if(o.label) txt(g, o.label, x, y - D/2 - 12, {sz:TYPE.val.sz, b:1, c:P.ink});
}

/* ================= 发光二极管 LED ================= */
function led(g, x, y, o){
  o = o || {};
  const on = !!o.on, R = o.r || 11;
  const col = o.color || '#e0402a';
  if(on){
    const gr = g.createRadialGradient(x, y, R*0.3, x, y, R*2.6);
    gr.addColorStop(0, shade(col, 0.55).replace('rgb','rgba').replace(')', ',.55)'));
    gr.addColorStop(1, shade(col, 0.55).replace('rgb','rgba').replace(')', ',0)'));
    g.save(); g.fillStyle = gr;
    g.beginPath(); g.arc(x, y, R*2.6, 0, TAU); g.fill(); g.restore();
  }
  /* 引脚：长脚是正极 */
  g.save();
  g.strokeStyle = P.ink; g.lineWidth = S.lead; g.lineCap = 'round';
  g.beginPath();
  g.moveTo(x-R*0.45, y+R*0.9); g.lineTo(x-R*0.45, y+R*2.2);
  g.moveTo(x+R*0.45, y+R*0.9); g.lineTo(x+R*0.45, y+R*1.7);
  g.stroke();
  /* 圆头外壳 */
  g.beginPath();
  g.moveTo(x-R*0.75, y+R*0.9);
  g.lineTo(x-R*0.75, y);
  g.arc(x, y, R*0.75, Math.PI, 0);
  g.lineTo(x+R*0.75, y+R*0.9);
  g.closePath();
  const gg = g.createRadialGradient(x-R*0.25, y-R*0.35, R*0.1, x, y, R);
  gg.addColorStop(0, on ? shade(col, 0.72) : shade(col, 0.5));
  gg.addColorStop(1, on ? col : shade(col, 0.1));
  g.fillStyle = gg; g.fill();
  g.strokeStyle = shade(col, -0.35); g.lineWidth = S.edge; g.stroke();
  g.save(); g.globalAlpha = 0.7;
  g.strokeStyle = '#fff'; g.lineWidth = 1.8; g.lineCap='round';
  g.beginPath(); g.arc(x, y, R*0.5, Math.PI*1.12, Math.PI*1.45); g.stroke();
  g.restore();
  g.restore();
  /* 发光时甩两道小箭头 */
  if(on){
    g.save(); g.strokeStyle = shade(col, 0.3); g.lineWidth = 1.6; g.lineCap='round';
    [[-1.3,-1.0],[-0.6,-1.5]].forEach(function(d){
      g.beginPath();
      g.moveTo(x + d[0]*R*1.1, y + d[1]*R*1.0);
      g.lineTo(x + d[0]*R*1.7, y + d[1]*R*1.6);
      g.stroke();
    });
    g.restore();
  }
  if(o.label) txt(g, o.label, x, y - R*1.9, {sz:TYPE.val.sz, b:1, c:P.ink});
}

/* ================= 电容（电解，带极性）================= */
function capacitor(g, x, y, o){
  o = o || {};
  const w = o.w || 22, h = o.h || 30;
  g.save();
  g.strokeStyle = P.ink; g.lineWidth = S.lead; g.lineCap='round';
  g.beginPath();
  g.moveTo(x-w*0.26, y+h/2); g.lineTo(x-w*0.26, y+h/2+11);
  g.moveTo(x+w*0.26, y+h/2); g.lineTo(x+w*0.26, y+h/2+11);
  g.stroke();
  rr(g, x-w/2, y-h/2, w, h, 4);
  g.fillStyle = cyl(g, y-h/2, y+h/2, '#20456e', P.blueD, '#7fb3e8');
  g.fill();
  g.strokeStyle = '#16334f'; g.lineWidth = S.edge; g.stroke();
  /* 负极银条 */
  g.save();
  rr(g, x-w/2, y-h/2, w, h, 4); g.clip();
  g.fillStyle = 'rgba(226,232,238,.92)';
  g.fillRect(x-w/2, y-h/2, w*0.26, h);
  g.restore();
  txt(g, '−', x-w*0.31, y, {sz:11, b:1, c:'#4a545e'});
  g.save(); g.globalAlpha = S.hiA;
  g.strokeStyle = '#fff'; g.lineWidth = 1.6; g.lineCap='round';
  g.beginPath(); g.moveTo(x-w*0.1, y-h/2+4); g.lineTo(x+w*0.34, y-h/2+4); g.stroke();
  g.restore();
  g.restore();
  if(o.label) txt(g, o.label, x, y - h/2 - 12, {sz:TYPE.val.sz, b:1, c:P.ink});
}

/* ================= 电感线圈（横放的漆包线）================= */
function inductor(g, x, y, o){
  o = o || {};
  const n = o.n || 4, L = o.len || 46, R = o.r || 9;
  const step = L/n;
  g.save();
  g.strokeStyle = P.ink; g.lineWidth = S.lead; g.lineCap='round';
  g.beginPath();
  g.moveTo(x-L/2-10, y); g.lineTo(x-L/2, y);
  g.moveTo(x+L/2, y);    g.lineTo(x+L/2+10, y);
  g.stroke();
  g.restore();
  for(let i=0;i<n;i++){
    const cx = x - L/2 + step*(i+0.5);
    g.save();
    g.lineWidth = 4.2; g.lineCap = 'round';
    g.strokeStyle = '#96601b';
    g.beginPath(); g.arc(cx, y, R, Math.PI, 0); g.stroke();
    g.globalAlpha = 0.6; g.lineWidth = 1.4; g.strokeStyle = '#f7d79a';
    g.beginPath(); g.arc(cx, y-1, R, Math.PI*1.15, Math.PI*1.75); g.stroke();
    g.restore();
  }
  if(o.core){
    g.save(); g.strokeStyle = '#8b949e'; g.lineWidth = 2;
    g.beginPath(); g.moveTo(x-L/2, y+4); g.lineTo(x+L/2, y+4); g.stroke();
    g.beginPath(); g.moveTo(x-L/2, y+7.5); g.lineTo(x+L/2, y+7.5); g.stroke();
    g.restore();
  }
  if(o.label) txt(g, o.label, x, y - R - 13, {sz:TYPE.val.sz, b:1, c:P.ink});
}

/* ================= 电动机 ================= */
function motor(g, x, y, r, o){
  o = o || {};
  g.save();
  /* 机壳 */
  g.beginPath(); g.arc(x, y, r, 0, TAU);
  const gr = g.createRadialGradient(x-r*0.35, y-r*0.4, r*0.15, x, y, r);
  gr.addColorStop(0, '#8fa3b6'); gr.addColorStop(0.6, '#4f6478'); gr.addColorStop(1, '#25313d');
  g.fillStyle = gr; g.fill();
  g.strokeStyle = P.ink; g.lineWidth = S.edge + 0.3; g.stroke();
  /* 转轴 */
  g.strokeStyle = '#c3cad2'; g.lineWidth = 3.4; g.lineCap='round';
  g.beginPath(); g.moveTo(x+r*0.9, y); g.lineTo(x+r*1.5, y); g.stroke();
  /* 引脚 */
  g.strokeStyle = P.ink; g.lineWidth = S.lead;
  g.beginPath();
  g.moveTo(x-r*0.5, y+r*0.86); g.lineTo(x-r*0.5, y+r*1.7);
  g.moveTo(x+r*0.5, y+r*0.86); g.lineTo(x+r*0.5, y+r*1.7);
  g.stroke();
  g.restore();
  txt(g, 'M', x, y, {sz:r*0.95, b:1, c:'#f2f5f8'});
  /* 转起来时画三道弧线 */
  if(o.spin){
    g.save(); g.strokeStyle = 'rgba(74,144,217,.75)'; g.lineWidth = 1.8; g.lineCap='round';
    for(let i=0;i<3;i++){
      const a0 = (o.spin + i*2.1) % TAU;
      g.beginPath(); g.arc(x, y, r*1.28, a0, a0 + 0.7); g.stroke();
    }
    g.restore();
  }
  if(o.label) txt(g, o.label, x, y - r - 13, {sz:TYPE.val.sz, b:1, c:P.ink});
}

/* ================= 蜂鸣器 ================= */
function buzzer(g, x, y, r, o){
  o = o || {};
  g.save();
  g.beginPath(); g.arc(x, y, r, 0, TAU);
  const gr = g.createRadialGradient(x-r*0.35, y-r*0.4, r*0.15, x, y, r);
  gr.addColorStop(0, '#5b6672'); gr.addColorStop(0.65, '#2b3038'); gr.addColorStop(1, '#171c22');
  g.fillStyle = gr; g.fill();
  g.strokeStyle = P.ink; g.lineWidth = S.edge; g.stroke();
  /* 出音孔 */
  g.fillStyle = '#0d1116';
  g.beginPath(); g.arc(x, y-r*0.15, r*0.22, 0, TAU); g.fill();
  /* 引脚 */
  g.strokeStyle = P.ink; g.lineWidth = S.lead; g.lineCap='round';
  g.beginPath();
  g.moveTo(x-r*0.5, y+r*0.86); g.lineTo(x-r*0.5, y+r*1.7);
  g.moveTo(x+r*0.5, y+r*0.86); g.lineTo(x+r*0.5, y+r*1.7);
  g.stroke();
  g.restore();
  if(o.on){
    g.save(); g.strokeStyle = 'rgba(240,160,32,.85)'; g.lineWidth = 1.8; g.lineCap='round';
    for(let i=1;i<=3;i++){
      g.beginPath();
      g.arc(x, y, r + i*6, -0.85, 0.85);
      g.stroke();
    }
    g.restore();
  }
  if(o.label) txt(g, o.label, x, y - r - 13, {sz:TYPE.val.sz, b:1, c:P.ink});
}

/* ================= 滑动变阻器（带四个接线柱的实物样子）================= */
function slideRheostat(g, x, y, t, o){
  o = o || {};
  const w = o.w || 108, h = o.h || 34;
  const tt = Math.max(0, Math.min(1, t == null ? 0.5 : t));
  /* 瓷管 + 绕组 */
  g.save();
  rr(g, x-w/2, y-h/2, w, h, 6);
  g.fillStyle = cyl(g, y-h/2, y+h/2, '#8b949e', '#e2e8ee', '#ffffff');
  g.fill();
  g.strokeStyle = P.inkL; g.lineWidth = S.edge; g.stroke();
  g.save();
  rr(g, x-w/2, y-h/2, w, h, 6); g.clip();
  g.strokeStyle = 'rgba(150,96,27,.75)'; g.lineWidth = 1.6;
  for(let i=0;i<26;i++){
    const px = x-w/2+4 + i*((w-8)/25);
    g.beginPath(); g.moveTo(px, y-h/2+2); g.lineTo(px, y+h/2-2); g.stroke();
  }
  g.restore();
  g.restore();
  /* 滑动触点 */
  const kx = x - w/2 + w*tt;
  g.save();
  g.strokeStyle = '#8b949e'; g.lineWidth = 3;
  g.beginPath(); g.moveTo(kx, y-h/2-14); g.lineTo(kx, y-h/2+2); g.stroke();
  rr(g, kx-9, y-h/2-22, 18, 10, 3);
  g.fillStyle = cyl(g, y-h/2-22, y-h/2-12, P.blueD, P.blue, '#bcdcff');
  g.fill();
  g.strokeStyle = P.blueD; g.lineWidth = S.edge; g.stroke();
  g.restore();
  /* 四个接线柱：上两个接滑片，下两个接两端 */
  terminal(g, x-w/2+8, y-h/2-24, 4.6);
  terminal(g, x+w/2-8, y-h/2-24, 4.6);
  terminal(g, x-w/2+8, y+h/2+9, 4.6);
  terminal(g, x+w/2-8, y+h/2+9, 4.6);
  if(o.label) txt(g, o.label, x, y+h/2+26, {sz:TYPE.val.sz, b:1, c:P.ink});
}

/* ================= 电池内阻（虚线框里的那颗）================= */
function internalR(g, x, y, w, h, o){
  o = o || {};
  g.save();
  g.setLineDash([5,4]); g.strokeStyle = 'rgba(74,144,217,.8)'; g.lineWidth = 1.3;
  rr(g, x-w/2, y-h/2, w, h, 8); g.stroke();
  g.restore();
  if(o.label) chip(g, o.label, x, y-h/2, {sz:9.5, c:P.blueD,
    fill:'#eaf2fc', line:'rgba(74,144,217,.6)'});
}

/* ================= 家电小图标 ================= */
function appliance(g, x, y, s, kind){
  g.save(); g.translate(x, y); g.scale(s || 1, s || 1);
  g.lineWidth = 1.4; g.strokeStyle = P.inkL;
  if(kind === 'led'){
    g.fillStyle = '#ffe89a';
    g.beginPath(); g.arc(0, -2, 7, 0, TAU); g.fill(); g.stroke();
    g.fillStyle = '#9aa4ae'; g.fillRect(-4, 5, 8, 5);
  }else if(kind === 'tv'){
    g.fillStyle = '#39424d'; rr(g, -12, -9, 24, 16, 2); g.fill(); g.stroke();
    g.fillStyle = '#7fb3e8'; g.fillRect(-10, -7, 20, 12);
    g.fillStyle = '#5b6672'; g.fillRect(-3, 7, 6, 3);
  }else if(kind === 'rice'){
    g.fillStyle = '#e7ebf0'; rr(g, -11, -7, 22, 16, 4); g.fill(); g.stroke();
    g.fillStyle = '#c3cad2'; rr(g, -12, -10, 24, 5, 2); g.fill(); g.stroke();
  }else if(kind === 'ac'){
    g.fillStyle = '#f2f5f8'; rr(g, -14, -7, 28, 13, 3); g.fill(); g.stroke();
    g.strokeStyle = '#9aa4ae';
    for(let i=-1;i<=1;i++){ g.beginPath(); g.moveTo(-10, i*3); g.lineTo(10, i*3); g.stroke(); }
  }else{
    g.fillStyle = '#e7ebf0'; rr(g, -9, -8, 18, 17, 3); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(9, -4); g.quadraticCurveTo(16, 0, 9, 5); g.stroke();
    g.fillStyle = '#c3cad2'; rr(g, -10, -11, 20, 4, 2); g.fill(); g.stroke();
  }
  g.restore();
}

const BAND = {0:'#1b1b1b',1:'#6b4423',2:'#c0392b',3:'#e07b2a',4:'#e0c020',
              5:'#2f9e44',6:'#1e6fd0',7:'#7b2fbe',8:'#8d97a2',9:'#f2f5f8',
              gold:'#c9a227', silver:'#c6ced6'};

global.EP = {
  P:P, TYPE:TYPE, rr:rr, cyl:cyl, shade:shade, BAND:BAND, WIRE_W:WIRE_W,
  callout:callout, chip:chip, legend:legend, heading:heading, highlight:highlight,
  WIRE_C:WIRE_C,
  wire:wire, node:node, flow:flow, terminal:terminal,
  cell:cell, resistor:resistor, rheostat:rheostat, knife:knife,
  bulb:bulb, lampHolder:lampHolder,
  meterInline:meterInline, readout:readout, panelMeter:panelMeter, multimeter:multimeter,
  coil:coil, magnet:magnet, appliance:appliance,
  diode:diode, led:led, capacitor:capacitor, inductor:inductor,
  motor:motor, buzzer:buzzer, slideRheostat:slideRheostat, internalR:internalR,
  bulbLevel:bulbLevel, S:S
};

})(typeof window!=='undefined' ? window : globalThis);
