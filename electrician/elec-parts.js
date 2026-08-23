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
  blue:'#4a90d9', blueD:'#2f6fb0', blueL:'#cfe0f5',
  hot:'#1e6fd0',
  amber:'#f0a020', ele:'#2a86d8',
  brass:'#c9a227', brassD:'#8a6d12',
  green:'#2f9e44', red:'#d5342a',
  panel:'#e7ebf0', panelD:'#c3cad2',
  lcd:'#111a16', lcdInk:'#5ce08a'
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
const WIRE_W = { normal:2.8, hot:3.4, thick:5.4 };
function wire(g, path, o){
  o = o || {};
  const kind = o.kind || 'normal';
  const w = o.w || WIRE_W[kind] || 2.8;
  const col = o.color || (kind === 'normal' ? P.ink : P.hot);
  path.stroke(g, w + 2, 'rgba(43,48,56,.10)');
  path.stroke(g, w, col);
  if(kind !== 'normal'){
    g.save(); g.globalAlpha = 0.4;
    path.stroke(g, Math.max(1, w*0.32), '#ffffff');
    g.restore();
  }
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
  const gap = o.gap || 26, dir = (o.dir === -1) ? -1 : 1;
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
      g.beginPath(); g.arc(p[0], p[1], o.r || 3.6, 0, TAU); g.fill();
      g.globalAlpha = 0.6; g.fillStyle = '#fff';
      g.beginPath(); g.arc(p[0]-1, p[1]-1, (o.r || 3.6)*0.38, 0, TAU); g.fill();
      g.restore();
    }
  }
}

/* ================= 电池 ================= */
function cell(g, x, y, len, dia, o){
  o = o || {};
  const horiz = o.horiz !== false;
  const flip = o.flip ? -1 : 1;
  g.save();
  g.translate(x, y);
  if(!horiz) g.rotate(-Math.PI/2);
  if(flip < 0) g.scale(-1, 1);
  const L = len, D = dia, half = L/2, hd = D/2;

  /* 主体（深蓝灰圆柱） */
  rr(g, -half, -hd, L, D, D*0.26);
  g.fillStyle = cyl(g, -hd, hd, '#25313d', '#4f6478', '#8fa3b6');
  g.fill();
  /* 白色标签环 */
  g.save();
  rr(g, -half+L*0.42, -hd, L*0.40, D, 2); g.clip();
  g.fillStyle = cyl(g, -hd, hd, '#c9ced4', '#f7fafc', '#ffffff');
  g.fillRect(-half, -hd, L, D);
  g.restore();
  /* 正极红帽 + 小凸头 */
  rr(g, half-L*0.10, -hd*0.86, L*0.10, D*0.86, 3);
  g.fillStyle = cyl(g, -hd*0.86, hd*0.86, '#8e231b', '#d5342a', '#f5837a');
  g.fill();
  rr(g, half-1.5, -hd*0.3, 5, hd*0.6, 2);
  g.fillStyle = '#c3cad2'; g.fill();
  /* 描边 + 高光 */
  rr(g, -half, -hd, L, D, D*0.26);
  g.strokeStyle = P.ink; g.lineWidth = 1.4; g.stroke();
  g.save(); g.globalAlpha = 0.5;
  g.strokeStyle = '#fff'; g.lineWidth = 1.8; g.lineCap = 'round';
  g.beginPath(); g.moveTo(-half+D*0.32, -hd+3.4); g.lineTo(half-D*0.5, -hd+3.4); g.stroke();
  g.restore();
  g.restore();

  if(o.pm !== false){
    const s = horiz ? 1 : 0;
    txt(g, '＋', x + (s ? (half*flip+13) : 0), y + (s ? 0 : -half*flip-13), {sz:13, b:1, c:P.red});
    txt(g, '−', x + (s ? (-half*flip-13) : 0), y + (s ? 0 : half*flip+13), {sz:14, b:1, c:P.inkL});
  }
  if(o.label) txt(g, o.label, x + (o.lx||0), y + (o.ly != null ? o.ly : (horiz ? dia/2+14 : 0)),
                  {sz:o.lsz||TYPE.val.sz, b:1, c:P.ink});
}

/* ================= 电阻（蓝色胶囊）================= */
function resistor(g, x, y, o){
  o = o || {};
  const horiz = o.horiz !== false;
  const L = o.len || 44, D = o.dia || 17;
  g.save();
  g.translate(x, y);
  if(!horiz) g.rotate(-Math.PI/2);
  g.strokeStyle = P.ink; g.lineWidth = 2.4; g.lineCap = 'round';
  g.beginPath();
  g.moveTo(-L/2-10, 0); g.lineTo(-L/2+2, 0);
  g.moveTo(L/2-2, 0);   g.lineTo(L/2+10, 0);
  g.stroke();
  rr(g, -L/2, -D/2, L, D, D/2);
  g.fillStyle = cyl(g, -D/2, D/2, P.blueD, P.blue, '#e2effb');
  g.fill();
  g.strokeStyle = P.blueD; g.lineWidth = 1.2; g.stroke();
  g.save(); g.globalAlpha = 0.65;
  g.strokeStyle = '#fff'; g.lineWidth = 1.7; g.lineCap = 'round';
  g.beginPath(); g.moveTo(-L/2+D*0.45, -D/2+3.4); g.lineTo(L/2-D*0.45, -D/2+3.4); g.stroke();
  g.restore();
  g.restore();
  if(o.label) txt(g, o.label, x + (o.lx||0), y + (o.ly != null ? o.ly : (horiz ? -D/2-12 : 0)),
                  {sz:o.lsz||TYPE.val.sz, b:1, c:o.lc || P.ink});
}

/* 可变电阻：胶囊 + 滑块，t=0..1 */
function rheostat(g, x, y, t, o){
  o = o || {};
  const L = o.len || 62, D = o.dia || 17;
  const horiz = o.horiz !== false;
  g.save();
  g.translate(x, y);
  if(!horiz) g.rotate(-Math.PI/2);
  g.strokeStyle = P.ink; g.lineWidth = 2.4; g.lineCap = 'round';
  g.beginPath();
  g.moveTo(-L/2-10, 0); g.lineTo(-L/2+2, 0);
  g.moveTo(L/2-2, 0);   g.lineTo(L/2+10, 0);
  g.stroke();
  rr(g, -L/2, -D/2, L, D, D/2);
  g.fillStyle = cyl(g, -D/2, D/2, '#aeb7c1', '#e7ebf0', '#ffffff');
  g.fill();
  g.strokeStyle = P.inkL; g.lineWidth = 1.2; g.stroke();
  const tt = Math.max(0, Math.min(1, t == null ? 0.5 : t));
  g.save();
  rr(g, -L/2, -D/2, L, D, D/2); g.clip();
  g.fillStyle = cyl(g, -D/2, D/2, P.blueD, P.blue, '#e2effb');
  g.fillRect(-L/2, -D/2, L*tt, D);
  g.restore();
  const kx = -L/2 + L*tt;
  g.save();
  const kg = g.createRadialGradient(kx-3, -3, 1.5, kx, 0, D*0.6);
  kg.addColorStop(0, '#bfe0ff'); kg.addColorStop(0.55, P.blue); kg.addColorStop(1, P.blueD);
  g.fillStyle = kg;
  g.beginPath(); g.arc(kx, 0, D*0.6, 0, TAU); g.fill();
  g.strokeStyle = P.blueD; g.lineWidth = 1.2; g.stroke();
  g.restore();
  g.restore();
  if(o.label) txt(g, o.label, x + (o.lx||0), y + (o.ly != null ? o.ly : (horiz ? -D/2-13 : 0)),
                  {sz:o.lsz||TYPE.val.sz, b:1, c:P.ink});
}

/* ================= 开关 ================= */
function knife(g, x, y, on, o){
  o = o || {};
  const w = o.w || 52;
  const x0 = x - w/2, x1 = x + w/2;
  g.save();
  g.strokeStyle = P.ink; g.lineWidth = 2.4; g.lineCap = 'round';
  g.beginPath();
  g.moveTo(x0-10, y); g.lineTo(x0, y);
  g.moveTo(x1, y);    g.lineTo(x1+10, y);
  g.stroke();
  g.beginPath();
  g.moveTo(x0, y);
  if(on) g.lineTo(x1, y);
  else   g.lineTo(x0 + w*0.9, y - w*0.42);
  g.lineWidth = 3.2; g.strokeStyle = on ? P.green : P.ink;
  g.stroke();
  g.restore();
  [x0, x1].forEach(function(px){
    g.save();
    g.beginPath(); g.arc(px, y, 4.4, 0, TAU);
    g.fillStyle = on ? '#e6f4ec' : '#fff'; g.fill();
    g.strokeStyle = on ? P.green : P.ink; g.lineWidth = 1.8; g.stroke();
    g.restore();
  });
  if(o.label) txt(g, o.label, x, y + (o.ly || -18),
                  {sz:10.5, b:1, c: on ? P.green : P.red});
}

/* ================= 灯泡 ================= */
function bulb(g, x, y, R, b, o){
  o = o || {};
  b = Math.max(0, Math.min(1, b || 0));
  const lit = b > 0.02;
  if(lit){
    const gr = g.createRadialGradient(x, y, R*0.3, x, y, R*3.0);
    gr.addColorStop(0, 'rgba(255,206,90,'+(0.50*b).toFixed(3)+')');
    gr.addColorStop(0.5,'rgba(255,206,90,'+(0.18*b).toFixed(3)+')');
    gr.addColorStop(1, 'rgba(255,206,90,0)');
    g.save(); g.fillStyle = gr;
    g.beginPath(); g.arc(x, y, R*3.0, 0, TAU); g.fill(); g.restore();
  }
  const bw = R*0.80, bh = R*0.62, by = y + R*0.78;
  g.save();
  rr(g, x-bw/2, by, bw, bh, 2);
  g.fillStyle = cyl(g, by, by+bh, '#4a545e', '#8b949e', '#c3cad2');
  g.fill();
  g.strokeStyle = P.ink; g.lineWidth = 1; g.stroke();
  g.strokeStyle = 'rgba(43,48,56,.4)'; g.lineWidth = 0.9;
  for(let i=1;i<3;i++){
    const yy = by + bh*i/3;
    g.beginPath(); g.moveTo(x-bw/2+1, yy); g.lineTo(x+bw/2-1, yy); g.stroke();
  }
  g.restore();

  g.save();
  g.beginPath();
  g.moveTo(x-R*0.40, by+1);
  g.quadraticCurveTo(x-R*1.00, y+R*0.40, x-R*0.96, y-R*0.10);
  g.arc(x, y-R*0.10, R*0.96, Math.PI, 0);
  g.quadraticCurveTo(x+R*1.00, y+R*0.40, x+R*0.40, by+1);
  g.closePath();
  const gg = g.createRadialGradient(x-R*0.28, y-R*0.42, R*0.1, x, y, R*1.2);
  if(lit){
    gg.addColorStop(0, 'rgba(255,248,220,'+(0.62+0.38*b).toFixed(2)+')');
    gg.addColorStop(0.62,'rgba(255,224,140,'+(0.42+0.4*b).toFixed(2)+')');
    gg.addColorStop(1, 'rgba(249,200,96,'+(0.34+0.3*b).toFixed(2)+')');
  }else{
    gg.addColorStop(0, 'rgba(255,255,255,.95)');
    gg.addColorStop(0.62,'rgba(232,239,245,.88)');
    gg.addColorStop(1, 'rgba(206,217,227,.82)');
  }
  g.fillStyle = gg; g.fill();
  g.strokeStyle = lit ? 'rgba(190,140,30,.95)' : 'rgba(120,134,148,.9)';
  g.lineWidth = 1.3; g.stroke();
  g.restore();

  g.save();
  const fy = y + R*0.06;
  g.strokeStyle = lit ? '#8a6a20' : '#9aa4ae'; g.lineWidth = 1.1;
  g.beginPath();
  g.moveTo(x-R*0.20, by); g.lineTo(x-R*0.20, fy);
  g.moveTo(x+R*0.20, by); g.lineTo(x+R*0.20, fy);
  g.stroke();
  const coilPath = function(){
    g.beginPath();
    for(let i=0;i<=10;i++){
      const px = x - R*0.20 + (R*0.40)*i/10;
      g.lineTo(px, fy - ((i%2) ? R*0.19 : 0));
    }
  };
  if(lit){
    g.save(); g.globalAlpha = 0.5*b; g.lineWidth = 6;
    g.strokeStyle = 'rgba(255,236,170,1)'; coilPath(); g.stroke(); g.restore();
  }
  g.lineWidth = lit ? 2.1 : 1.5;
  g.strokeStyle = lit
    ? 'rgb(255,'+Math.round(214+38*b)+','+Math.round(110+120*b)+')'
    : '#98a1ab';
  coilPath(); g.stroke();
  g.restore();

  g.save(); g.globalAlpha = 0.8;
  g.strokeStyle = '#fff'; g.lineWidth = 2.2; g.lineCap = 'round';
  g.beginPath(); g.arc(x, y-R*0.10, R*0.70, Math.PI*1.12, Math.PI*1.42);
  g.stroke(); g.restore();

  if(o.label) txt(g, o.label, x, y + R*2.0, {sz:o.lsz||TYPE.name.sz, c:TYPE.name.c});
}

function lampHolder(g, x, y, w, h){
  g.save();
  rr(g, x-w/2, y, w, h, 3);
  g.fillStyle = cyl(g, y, y+h, '#39424d', '#6b747e', '#98a1ab');
  g.fill();
  g.strokeStyle = P.ink; g.lineWidth = 1.1; g.stroke();
  g.restore();
  node(g, x-w/2+5, y+h-4, 2.8);
  node(g, x+w/2-5, y+h-4, 2.8);
}

function terminal(g, x, y, r){
  r = r || 5;
  g.save();
  const gr = g.createRadialGradient(x-r*0.4, y-r*0.4, r*0.15, x, y, r);
  gr.addColorStop(0, '#f6ecc0'); gr.addColorStop(0.6, P.brass); gr.addColorStop(1, P.brassD);
  g.fillStyle = gr;
  g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill();
  g.strokeStyle = P.brassD; g.lineWidth = 1; g.stroke();
  g.restore();
}

/* ================= 表计 ================= */
function meterInline(g, x, y, r, ch, o){
  o = o || {};
  const col = (ch === 'V') ? P.green : P.blue;
  g.save();
  g.beginPath(); g.arc(x, y, r, 0, TAU);
  const gr = g.createRadialGradient(x-r*0.35, y-r*0.35, r*0.15, x, y, r);
  gr.addColorStop(0, '#ffffff'); gr.addColorStop(1, '#eef3f8');
  g.fillStyle = gr; g.fill();
  g.strokeStyle = col; g.lineWidth = 2; g.stroke();
  g.restore();
  txt(g, ch, x, y, {sz:r*1.05, b:1, c:col});
  if(o.val != null) txt(g, o.val, x, y - r - 11, {sz:TYPE.val.sz, b:1, c:col});
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
  g.fillStyle = cyl(g, y, y+h, '#39424d', '#6b747e', '#98a1ab');
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
  g.fillStyle = cyl(g, y, y+h, '#39424d', '#6b747e', '#98a1ab');
  g.fill();
  g.strokeStyle = P.ink; g.lineWidth = 1.4; g.stroke();
  g.fillStyle = '#c0562e';
  rr(g, x+2, y+h*0.30, 5, h*0.42, 3); g.fill();
  rr(g, x+w-7, y+h*0.30, 5, h*0.42, 3); g.fill();
  g.restore();

  const lw = w*0.74, lh = h*0.24, lx = x + (w-lw)/2, ly = y + h*0.08;
  readout(g, lx, ly, lw, lh, (o.reading || '0.00') + (o.unit ? ' ' + o.unit : ''),
          {sz:Math.max(12, lh*0.56)});

  const kx = x + w/2, ky = y + h*0.58, kr = Math.min(w, h)*0.18;
  g.save();
  const kg = g.createRadialGradient(kx-kr*0.4, ky-kr*0.4, kr*0.2, kx, ky, kr);
  kg.addColorStop(0, '#c9ced4'); kg.addColorStop(0.6, '#6b747e'); kg.addColorStop(1, '#39424d');
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
  [[x + w*0.32, '#2b3038', 'COM'], [x + w*0.62, '#8c2f26', 'V']].forEach(function(a2){
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
  callout:callout, chip:chip, legend:legend, heading:heading,
  wire:wire, node:node, flow:flow, terminal:terminal,
  cell:cell, resistor:resistor, rheostat:rheostat, knife:knife,
  bulb:bulb, lampHolder:lampHolder,
  meterInline:meterInline, readout:readout, panelMeter:panelMeter, multimeter:multimeter,
  coil:coil, magnet:magnet, appliance:appliance
};

})(typeof window!=='undefined' ? window : globalThis);
