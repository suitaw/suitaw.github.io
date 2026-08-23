/* ==================================================================
   elec-parts.js —— 实物级元件库（配合 elec-canvas.js 用，全局挂到 EP）

   为什么要有这一份（2026-08-23 他的要求）：
   「做的精细点，然后仿真点越真越好，尽量模拟最真实的电路，还有那个元件形态」

   —— 原来所有场景画的都是**电路符号**（长短线=电池、⊗=灯泡）。符号必须教
   （上班拿到手的是原理图），但零基础第一眼要先认得出**那是个什么东西**。
   书上也是这么排的：每张图都是 a) 实物连接图 + b) 电路原理图两张并排。
   所以课页做成**实物 / 符号两个视图可以切**，这一份负责「实物」那一半。

   画法约定：
   - **线性渐变做圆柱感**（暗→亮→暗），径向渐变做玻璃和光晕，
     再加一道高光描边。不要用 shadowBlur —— 手机上慢。
   - 每个零件都是「中心点 + 尺寸」调用，方向靠参数，不靠调用方 translate。
   - **金属色统一**：黄铜 #c9a227 系、镀锌 #b8c0c8 系、塑料外壳 #2b3038 系。
     六节课共用同一套颜色，看着才像同一批器材。
   - 元件本身不画导线，导线交给 EC.Path / EP.wire —— 和符号版保持同一个分工。
   ================================================================== */
(function(global){
'use strict';

const TAU = Math.PI*2;
const C = (global.EC && global.EC.C) || {};

/* 小工具：圆角矩形路径（不描不填，交给调用方） */
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
/* 圆柱渐变：沿着 across 方向暗→亮→暗 */
function cyl(g, x0, y0, x1, y1, dark, mid, light){
  const gr = g.createLinearGradient(x0, y0, x1, y1);
  gr.addColorStop(0,    dark);
  gr.addColorStop(0.34, light || mid);
  gr.addColorStop(0.55, mid);
  gr.addColorStop(1,    dark);
  return gr;
}
function txt(g, s, x, y, o){ global.EC.txt(g, s, x, y, o); }

/* ================= 导线（带绝缘皮）=================
   wire(g, path, {color, w, core})
   外皮 + 一道高光；core:true 时两头露出铜芯 */
function wire(g, path, o){
  o = o || {};
  const w = o.w || 7;
  path.stroke(g, w, o.dark || shade(o.color || '#c0392b', -0.35));
  path.stroke(g, w-2.4, o.color || '#c0392b');
  g.save(); g.globalAlpha = 0.35;
  path.stroke(g, Math.max(1, w*0.24), '#ffffff');
  g.restore();
}
/* 颜色加深/提亮 */
function shade(hex, k){
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if(!m) return hex;
  let r = parseInt(m[1],16), gg = parseInt(m[2],16), b = parseInt(m[3],16);
  const f = (v)=> Math.max(0, Math.min(255, Math.round(k<0 ? v*(1+k) : v+(255-v)*k)));
  return 'rgb('+f(r)+','+f(gg)+','+f(b)+')';
}

/* ================= 接线柱 =================
   真接线端子：黄铜底座 + 压线螺钉 */
function terminal(g, x, y, r, o){
  o = o || {};
  r = r || 7;
  g.save();
  const gr = g.createRadialGradient(x-r*0.4, y-r*0.4, r*0.15, x, y, r);
  gr.addColorStop(0, '#f3e2a0'); gr.addColorStop(0.6, '#c9a227'); gr.addColorStop(1, '#8a6d12');
  g.fillStyle = gr;
  g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill();
  g.strokeStyle = '#6f5710'; g.lineWidth = 1; g.stroke();
  /* 一字螺钉槽 */
  g.strokeStyle = '#6f5710'; g.lineWidth = Math.max(1.2, r*0.28); g.lineCap = 'round';
  g.beginPath();
  const a = o.slot == null ? -0.5 : o.slot;
  g.moveTo(x - Math.cos(a)*r*0.55, y - Math.sin(a)*r*0.55);
  g.lineTo(x + Math.cos(a)*r*0.55, y + Math.sin(a)*r*0.55);
  g.stroke();
  g.restore();
}

/* ================= 干电池 =================
   cell(g, x, y, len, dia, {horiz, label, flip})
   横放时正极（金属帽）在右；flip 反过来 */
function cell(g, x, y, len, dia, o){
  o = o || {};
  const horiz = o.horiz !== false;
  const flip = o.flip ? -1 : 1;
  g.save();
  g.translate(x, y);
  if(!horiz) g.rotate(-Math.PI/2);
  if(flip < 0) g.scale(-1, 1);

  const L = len, D = dia, half = L/2, hd = D/2;
  /* 外壳 */
  rr(g, -half, -hd, L, D, 3);
  g.fillStyle = cyl(g, 0, -hd, 0, hd, '#1f2a35', '#41566b', '#6e879e');
  g.fill();
  /* 标签环带 */
  g.save();
  rr(g, -half+L*0.14, -hd, L*0.62, D, 2); g.clip();
  g.fillStyle = cyl(g, 0, -hd, 0, hd, '#8a6a12', '#e0b93a', '#f7dd86');
  g.fillRect(-half, -hd, L, D);
  g.restore();
  /* 负极端盖 */
  rr(g, -half, -hd, L*0.1, D, 2);
  g.fillStyle = cyl(g, 0, -hd, 0, hd, '#20262c', '#4a545e', '#78838e');
  g.fill();
  /* 正极凸帽 */
  rr(g, half-2, -hd*0.42, 6, hd*0.84, 2);
  g.fillStyle = cyl(g, 0, -hd*0.42, 0, hd*0.42, '#8d949c', '#d7dde3', '#f2f5f8');
  g.fill();
  /* 外框 */
  rr(g, -half, -hd, L, D, 3);
  g.strokeStyle = '#141a20'; g.lineWidth = 1.2; g.stroke();
  /* 顶部高光 */
  g.save(); g.globalAlpha = 0.5;
  g.strokeStyle = '#ffffff'; g.lineWidth = 1.4;
  g.beginPath(); g.moveTo(-half+4, -hd+3.2); g.lineTo(half-6, -hd+3.2); g.stroke();
  g.restore();
  g.restore();

  /* ± 标记与文字（不跟着旋转，免得躺倒） */
  const px = horiz ? half*flip : 0, py = horiz ? 0 : -half*flip;
  const nx = horiz ? -half*flip : 0, ny = horiz ? 0 : half*flip;
  if(o.pm !== false){
    txt(g, '＋', x + (horiz ? px+12 : px), y + (horiz ? py-hd-8 : py-12), {sz:12, b:1, c:'#c0392b'});
    txt(g, '−',  x + (horiz ? nx-12 : nx), y + (horiz ? ny-hd-8 : ny+12), {sz:13, b:1, c:'#333b44'});
  }
  if(o.label) txt(g, o.label, x + (o.lx||0), y + (o.ly != null ? o.ly : (horiz ? hd+13 : 0)),
                  {sz:o.lsz||10.5, b:1, c:'#3a3f46'});
}

/* ================= 白炽灯泡 =================
   bulb(g, x, y, R, b, {socket})  b = 亮度 0..1
   玻璃壳 + 灯丝 + 螺口，亮起来时灯丝发白、玻璃透出暖光 */
function bulb(g, x, y, R, b, o){
  o = o || {};
  b = Math.max(0, Math.min(1, b || 0));

  /* 外光晕 */
  if(b > 0.02){
    const gr = g.createRadialGradient(x, y, R*0.3, x, y, R*3.2);
    gr.addColorStop(0, 'rgba(255,214,120,'+(0.55*b).toFixed(3)+')');
    gr.addColorStop(0.45,'rgba(255,205,90,'+(0.20*b).toFixed(3)+')');
    gr.addColorStop(1, 'rgba(255,205,90,0)');
    g.save(); g.fillStyle = gr;
    g.beginPath(); g.arc(x, y, R*3.2, 0, TAU); g.fill(); g.restore();
  }

  /* 螺口（在下方） */
  const bw = R*0.86, bh = R*0.72, by = y + R*0.72;
  g.save();
  rr(g, x-bw/2, by, bw, bh, 2);
  g.fillStyle = cyl(g, x-bw/2, 0, x+bw/2, 0, '#7d6a2e', '#c9a227', '#efdc95');
  g.fill();
  g.strokeStyle = '#5e4f22'; g.lineWidth = 0.9; g.stroke();
  /* 螺纹 */
  g.strokeStyle = 'rgba(80,66,26,.55)'; g.lineWidth = 1;
  for(let i=1;i<4;i++){
    const yy = by + bh*i/4;
    g.beginPath(); g.moveTo(x-bw/2+1, yy); g.lineTo(x+bw/2-1, yy); g.stroke();
  }
  /* 底部触点 */
  g.fillStyle = '#3a3f46';
  g.beginPath(); g.ellipse(x, by+bh+1.5, bw*0.3, 2.6, 0, 0, TAU); g.fill();
  g.restore();

  /* 玻璃壳 */
  g.save();
  g.beginPath();
  g.moveTo(x-R*0.44, by+2);
  g.quadraticCurveTo(x-R*1.02, y+R*0.42, x-R*0.98, y-R*0.12);
  g.arc(x, y-R*0.12, R*0.98, Math.PI, 0);
  g.quadraticCurveTo(x+R*1.02, y+R*0.42, x+R*0.44, by+2);
  g.closePath();
  const gg = g.createRadialGradient(x-R*0.3, y-R*0.45, R*0.1, x, y, R*1.25);
  if(b > 0.02){
    gg.addColorStop(0, 'rgba(255,247,214,'+(0.55+0.45*b).toFixed(2)+')');
    gg.addColorStop(0.6,'rgba(255,226,150,'+(0.35+0.4*b).toFixed(2)+')');
    gg.addColorStop(1, 'rgba(250,206,110,'+(0.25+0.3*b).toFixed(2)+')');
  }else{
    gg.addColorStop(0, 'rgba(255,255,255,.92)');
    gg.addColorStop(0.6,'rgba(226,234,241,.80)');
    gg.addColorStop(1, 'rgba(198,210,221,.75)');
  }
  g.fillStyle = gg; g.fill();
  g.strokeStyle = b>0.02 ? 'rgba(200,150,40,.9)' : 'rgba(150,164,178,.9)';
  g.lineWidth = 1.2; g.stroke();
  g.restore();

  /* 灯丝：两根支架 + 螺旋 */
  g.save();
  const fy = y + R*0.1;
  g.strokeStyle = b>0.02 ? '#8a6a20' : '#98a1ab'; g.lineWidth = 1.1;
  g.beginPath();
  g.moveTo(x-R*0.22, by); g.lineTo(x-R*0.22, fy);
  g.moveTo(x+R*0.22, by); g.lineTo(x+R*0.22, fy);
  g.stroke();
  g.lineWidth = b>0.02 ? 2.2 : 1.6;
  g.strokeStyle = b>0.02
    ? 'rgb(255,'+Math.round(220+30*b)+','+Math.round(120+110*b)+')'
    : '#8f99a3';
  g.beginPath();
  for(let i=0;i<=10;i++){
    const px = x - R*0.22 + (R*0.44)*i/10;
    g.lineTo(px, fy - ((i%2) ? R*0.2 : 0));
  }
  g.stroke();
  if(b > 0.15){                       /* 灯丝自发光 */
    g.save(); g.globalAlpha = 0.55*b; g.lineWidth = 5.5;
    g.strokeStyle = 'rgba(255,236,170,1)';
    g.beginPath();
    for(let i=0;i<=10;i++){
      const px = x - R*0.22 + (R*0.44)*i/10;
      g.lineTo(px, fy - ((i%2) ? R*0.2 : 0));
    }
    g.stroke(); g.restore();
  }
  g.restore();

  /* 玻璃高光 */
  g.save(); g.globalAlpha = 0.75;
  g.strokeStyle = '#ffffff'; g.lineWidth = 2.2; g.lineCap = 'round';
  g.beginPath();
  g.arc(x, y-R*0.12, R*0.72, Math.PI*1.15, Math.PI*1.45);
  g.stroke(); g.restore();

  if(o.label) txt(g, o.label, x, y + R*2.1, {sz:o.lsz||10.5, c:'#4b545d'});
}

/* 灯座（灯泡装在上面才像真的装置） */
function lampHolder(g, x, y, w, h){
  g.save();
  rr(g, x-w/2, y, w, h, 3);
  g.fillStyle = cyl(g, x-w/2, 0, x+w/2, 0, '#20262c', '#3d464f', '#5b6672');
  g.fill();
  g.strokeStyle = '#171c21'; g.lineWidth = 1; g.stroke();
  g.restore();
  terminal(g, x-w/2+5, y+h-5, 3.4);
  terminal(g, x+w/2-5, y+h-5, 3.4);
}

/* ================= 闸刀开关 =================
   knife(g, x, y, on, {w,h}) —— 胶木底板 + 黄铜刀片 + 手柄 */
function knife(g, x, y, on, o){
  o = o || {};
  const w = o.w || 62, h = o.h || 26;
  /* 底板 */
  g.save();
  rr(g, x-w/2, y-h/2, w, h, 3);
  g.fillStyle = cyl(g, 0, y-h/2, 0, y+h/2, '#171b20', '#2b3038', '#3c434c');
  g.fill();
  g.strokeStyle = '#0f1317'; g.lineWidth = 1; g.stroke();
  g.restore();
  /* 两个静触头 */
  const x0 = x-w/2+9, x1 = x+w/2-9;
  terminal(g, x0, y, 5.6);
  terminal(g, x1, y, 5.6);
  /* 刀片 */
  const ang = on ? 0 : -0.62;
  g.save();
  g.translate(x0, y); g.rotate(ang);
  const bl = x1 - x0;
  rr(g, 0, -3.4, bl, 6.8, 2);
  g.fillStyle = cyl(g, 0, -3.4, 0, 3.4, '#8a6d12', '#d9b63b', '#f6e79a');
  g.fill();
  g.strokeStyle = '#6f5710'; g.lineWidth = 0.9; g.stroke();
  /* 手柄 */
  rr(g, bl-4, -8.5, 12, 17, 4);
  g.fillStyle = cyl(g, 0, -8.5, 0, 8.5, '#5a1410', '#a5352c', '#d1665c');
  g.fill();
  g.strokeStyle = '#3d0d0a'; g.lineWidth = 1; g.stroke();
  g.restore();
  if(o.label) txt(g, o.label, x, y + h/2 + 13, {sz:10.5, b:1, c: on ? '#1c8348' : '#c32f2f'});
}

/* ================= 色环电阻 =================
   resistor(g, x, y, {horiz, len, dia, bands:[色,色,色,金]}) */
const BAND = {0:'#1b1b1b',1:'#6b4423',2:'#c0392b',3:'#e07b2a',4:'#e0c020',
              5:'#2f9e44',6:'#1e6fd0',7:'#7b2fbe',8:'#8d97a2',9:'#f2f5f8',
              gold:'#c9a227', silver:'#c6ced6'};
function resistor(g, x, y, o){
  o = o || {};
  const horiz = o.horiz !== false;
  const L = o.len || 42, D = o.dia || 16;
  g.save();
  g.translate(x, y);
  if(!horiz) g.rotate(-Math.PI/2);
  /* 引脚 */
  g.strokeStyle = '#b8c0c8'; g.lineWidth = 2.2; g.lineCap = 'round';
  g.beginPath();
  g.moveTo(-L/2-9, 0); g.lineTo(-L/2+2, 0);
  g.moveTo(L/2-2, 0);  g.lineTo(L/2+9, 0);
  g.stroke();
  /* 本体 */
  rr(g, -L/2, -D/2, L, D, D*0.42);
  g.fillStyle = cyl(g, 0, -D/2, 0, D/2, '#9c7c50', '#d8bb8c', '#f0dcbb');
  g.fill();
  g.strokeStyle = '#7a5f38'; g.lineWidth = 0.9; g.stroke();
  /* 色环 */
  const bands = o.bands || ['#6b4423', '#1b1b1b', '#c0392b', BAND.gold];
  g.save();
  rr(g, -L/2, -D/2, L, D, D*0.42); g.clip();
  bands.forEach(function(c, i){
    const bx = -L/2 + L*(0.18 + i*0.16);
    g.fillStyle = c;
    g.fillRect(bx, -D/2, L*0.075, D);
  });
  g.restore();
  /* 高光 */
  g.save(); g.globalAlpha = 0.45;
  g.strokeStyle = '#fff'; g.lineWidth = 1.6;
  g.beginPath(); g.moveTo(-L/2+4, -D/2+3.4); g.lineTo(L/2-4, -D/2+3.4); g.stroke();
  g.restore();
  g.restore();
  if(o.label) txt(g, o.label, x + (o.lx||0), y + (o.ly != null ? o.ly : (horiz ? -D/2-11 : 0)),
                  {sz:o.lsz||10.5, b:1, c:'#3a3f46'});
}

/* ================= 墙壁开关（拨钮）================= */
function wallSwitch(g, x, y, on, o){
  o = o || {};
  const w = o.w || 34, h = o.h || 46;
  g.save();
  rr(g, x-w/2, y-h/2, w, h, 4);
  g.fillStyle = cyl(g, x-w/2, 0, x+w/2, 0, '#c9ced4', '#f2f5f8', '#ffffff');
  g.fill();
  g.strokeStyle = '#9aa4ae'; g.lineWidth = 1; g.stroke();
  /* 按键 */
  const kh = h*0.52;
  rr(g, x-w*0.3, y - kh/2 - (on ? 3 : -3), w*0.6, kh, 3);
  g.fillStyle = on
    ? cyl(g, 0, y-kh/2, 0, y+kh/2, '#c9ced4', '#eef2f6', '#ffffff')
    : cyl(g, 0, y-kh/2, 0, y+kh/2, '#8d97a2', '#c3cad2', '#e2e8ee');
  g.fill();
  g.strokeStyle = '#9aa4ae'; g.lineWidth = 0.9; g.stroke();
  g.restore();
  txt(g, on ? 'ON' : 'OFF', x, y + h/2 + 11, {sz:9, b:1, c: on ? '#1c8348' : '#8b949e'});
}

/* ================= 指针电流表（表体）================= */
function panelMeter(g, x, y, w, h, o){
  o = o || {};
  g.save();
  rr(g, x, y, w, h, 5);
  g.fillStyle = cyl(g, x, 0, x+w, 0, '#20262c', '#3d464f', '#59636e');
  g.fill();
  g.strokeStyle = '#161b20'; g.lineWidth = 1.2; g.stroke();
  g.restore();
  if(global.EC.dial){
    const inner = {}; for(const k in o) inner[k] = o[k];
    inner.label = null;                       /* 表名放到壳外面画，压在壳边上很难看 */
    global.EC.dial(g, x+5, y+5, w-10, h-10, inner);
  }
  if(o.label) txt(g, o.label, x + w/2, y + h + 10, {sz:10, c:'#4b545d'});
}

/* ================= 线圈（漆包线）=================
   coil(g, cx, cy, half, r, n, {front}) 分前后两半画，
   前半盖在别的东西上面 —— 磁铁才像真的从线圈里穿过去 */
function coil(g, cx, cy, half, r, n, front){
  const step = (2*half)/(n-1);
  for(let i=0;i<n;i++){
    const x = cx - half + i*step;
    g.save();
    g.lineWidth = 4.2; g.lineCap = 'round';
    g.strokeStyle = front ? '#b8791f' : '#8a5714';
    g.beginPath();
    g.ellipse(x, cy, 8, r, 0, front ? 0 : Math.PI, front ? Math.PI : TAU);
    g.stroke();
    if(front){
      g.globalAlpha = 0.5; g.lineWidth = 1.4; g.strokeStyle = '#f2c87a';
      g.beginPath();
      g.ellipse(x-1.2, cy, 8, r, 0, 0.35, Math.PI-0.35);
      g.stroke();
    }
    g.restore();
  }
}

/* ================= 条形磁铁 ================= */
function magnet(g, x, y, w, h, nRight){
  const half = w/2;
  [[-half, nRight ? '#1667d6' : '#c0392b', nRight ? 'S' : 'N'],
   [0,     nRight ? '#c0392b' : '#1667d6', nRight ? 'N' : 'S']].forEach(function(a){
    g.save();
    rr(g, x+a[0], y-h/2, half, h, 3);
    g.fillStyle = cyl(g, 0, y-h/2, 0, y+h/2, shade(a[1], -0.45), a[1], shade(a[1], 0.35));
    g.fill();
    g.strokeStyle = '#10161c'; g.lineWidth = 1.2; g.stroke();
    g.restore();
    txt(g, a[2], x + a[0] + half/2, y, {sz:Math.min(14, h*0.6), b:1, c:'#fff'});
  });
  g.save(); g.globalAlpha = 0.4;
  g.strokeStyle = '#fff'; g.lineWidth = 1.6;
  g.beginPath(); g.moveTo(x-half+4, y-h/2+3); g.lineTo(x+half-4, y-h/2+3); g.stroke();
  g.restore();
}

/* ================= 家电小图标（1.3 电费那一屏用）================= */
function appliance(g, x, y, s, kind){
  const S = s || 1;
  g.save(); g.translate(x, y); g.scale(S, S);
  g.lineWidth = 1.4; g.strokeStyle = '#4b545d';
  if(kind === 'led'){
    g.fillStyle = '#f7e08a';
    g.beginPath(); g.arc(0, -2, 7, 0, TAU); g.fill(); g.stroke();
    g.fillStyle = '#9aa4ae'; g.fillRect(-4, 5, 8, 5);
  }else if(kind === 'tv'){
    g.fillStyle = '#2b3038'; rr(g, -12, -9, 24, 16, 2); g.fill(); g.stroke();
    g.fillStyle = '#5aa9e6'; g.fillRect(-10, -7, 20, 12);
    g.fillStyle = '#4b545d'; g.fillRect(-3, 7, 6, 3);
  }else if(kind === 'rice'){
    g.fillStyle = '#e2e8ee'; rr(g, -11, -7, 22, 16, 4); g.fill(); g.stroke();
    g.fillStyle = '#c3cad2'; rr(g, -12, -10, 24, 5, 2); g.fill(); g.stroke();
  }else if(kind === 'ac'){
    g.fillStyle = '#f2f5f8'; rr(g, -14, -7, 28, 13, 3); g.fill(); g.stroke();
    g.strokeStyle = '#9aa4ae';
    for(let i=-1;i<=1;i++){ g.beginPath(); g.moveTo(-10, i*3); g.lineTo(10, i*3); g.stroke(); }
  }else{                                   /* kettle 电热水壶 */
    g.fillStyle = '#e2e8ee'; rr(g, -9, -8, 18, 17, 3); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(9, -4); g.quadraticCurveTo(16, 0, 9, 5); g.stroke();
    g.fillStyle = '#c3cad2'; rr(g, -10, -11, 20, 4, 2); g.fill(); g.stroke();
  }
  g.restore();
}

/* ================= 数字万用表 =================
   multimeter(g, x, y, w, h, {reading, mode})
   深色机身 + 绿底 LCD + 旋钮档位 + 两个表笔插孔。
   1.1 量电压那一屏用它，第 3 章讲万用表时还会用同一台。 */
function multimeter(g, x, y, w, h, o){
  o = o || {};
  /* 机身 */
  g.save();
  rr(g, x, y, w, h, 8);
  g.fillStyle = cyl(g, x, 0, x+w, 0, '#171c22', '#2f3841', '#454f5a');
  g.fill();
  g.strokeStyle = '#0d1116'; g.lineWidth = 1.4; g.stroke();
  /* 侧边橡胶护套 */
  g.fillStyle = '#8a3b1e';
  rr(g, x+2, y+h*0.30, 5, h*0.42, 3); g.fill();
  rr(g, x+w-7, y+h*0.30, 5, h*0.42, 3); g.fill();
  g.restore();

  /* LCD */
  const lw = w*0.72, lh = h*0.26, lx = x + (w-lw)/2, ly = y + h*0.07;
  g.save();
  rr(g, lx, ly, lw, lh, 3);
  g.fillStyle = '#9fbf6a'; g.fill();
  g.strokeStyle = '#4a5a2e'; g.lineWidth = 1; g.stroke();
  g.restore();
  txt(g, o.reading || '0.00', lx + lw - 8, ly + lh/2,
      {sz:Math.max(12, lh*0.62), b:1, c:'#1c2410', al:'right'});
  if(o.unit) txt(g, o.unit, lx + 8, ly + lh/2, {sz:9.5, b:1, c:'#3a4a22', al:'left'});

  /* 旋钮 */
  const kx = x + w/2, ky = y + h*0.58, kr = Math.min(w, h)*0.19;
  g.save();
  const kg = g.createRadialGradient(kx-kr*0.4, ky-kr*0.4, kr*0.2, kx, ky, kr);
  kg.addColorStop(0, '#6e7884'); kg.addColorStop(0.6, '#3b444e'); kg.addColorStop(1, '#1b2027');
  g.fillStyle = kg;
  g.beginPath(); g.arc(kx, ky, kr, 0, TAU); g.fill();
  g.strokeStyle = '#11151a'; g.lineWidth = 1.2; g.stroke();
  /* 指示白条：默认指向左上（直流电压档） */
  const a = (o.knob == null ? -2.2 : o.knob);
  g.strokeStyle = '#e8e2d0'; g.lineWidth = 2.4; g.lineCap = 'round';
  g.beginPath(); g.moveTo(kx, ky);
  g.lineTo(kx + Math.cos(a)*kr*0.82, ky + Math.sin(a)*kr*0.82);
  g.stroke();
  g.restore();
  /* 档位刻度点 */
  g.save(); g.fillStyle = '#8d97a2';
  for(let i=0;i<8;i++){
    const aa = -Math.PI*1.25 + i*(Math.PI*1.5/7);
    g.beginPath();
    g.arc(kx + Math.cos(aa)*(kr+7), ky + Math.sin(aa)*(kr+7), 1.6, 0, TAU);
    g.fill();
  }
  g.restore();
  txt(g, o.mode || 'V⎓', kx + kr + 13, ky, {sz:10, b:1, c:'#c9ced4'});

  /* 表笔插孔 */
  const jy = y + h - 12;
  [[x + w*0.32, '#2f353c', 'COM'], [x + w*0.62, '#8c2f26', 'V']].forEach(function(a2){
    g.save();
    g.beginPath(); g.arc(a2[0], jy, 5.5, 0, TAU);
    g.fillStyle = a2[1]; g.fill();
    g.strokeStyle = '#0d1116'; g.lineWidth = 1.2; g.stroke();
    g.beginPath(); g.arc(a2[0], jy, 2.2, 0, TAU);
    g.fillStyle = '#0b0e12'; g.fill();
    g.restore();
    txt(g, a2[2], a2[0], jy - 11, {sz:8, c:'#98a1ab'});
  });
  return { com:[x + w*0.32, jy], hot:[x + w*0.62, jy] };
}

global.EP = {
  rr:rr, cyl:cyl, shade:shade, BAND:BAND,
  wire:wire, terminal:terminal, cell:cell, bulb:bulb, lampHolder:lampHolder,
  knife:knife, resistor:resistor, wallSwitch:wallSwitch, panelMeter:panelMeter,
  coil:coil, magnet:magnet, appliance:appliance, multimeter:multimeter
};

})(typeof window!=='undefined' ? window : globalThis);
