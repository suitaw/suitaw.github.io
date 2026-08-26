/* ==================================================================
   elec-symbols.js —— 国标电气图形符号（GB/T 4728 简化画法）
   给 quiz 里几道「认图形」的题用：断路器/接触器/按钮/熔断器/热继电器/
   速度继电器/铁壳开关/仪表 这类题，安e学原题的选项本身就是手绘符号图，
   不是文字，抠成文字选项没法做。这份画的是同一套符号本身，不是照抄
   截图的手绘线条 —— 画法参照的是国标简化画法，选项对应关系仍按
   safe题库标注的「正确答案」来定，因为哪个字母对应哪张图是题库给定的。

   引一行 <script src="elec-symbols.js"></script>，全局拿到 ESYM。
   依赖 elec-canvas.js 的 EC.txt（可选，仅用于符号下方文字符号标注）。
   ================================================================== */
(function(global){
'use strict';

const INK = '#242a31';
const LW = 1.9;

function line(g,x0,y0,x1,y1){
  g.beginPath(); g.moveTo(x0,y0); g.lineTo(x1,y1); g.stroke();
}
function dashLine(g,x0,y0,x1,y1){
  g.save();
  g.setLineDash([3,3]);
  line(g,x0,y0,x1,y1);
  g.restore();
}
function setup(g){
  g.strokeStyle = INK; g.fillStyle = INK;
  g.lineWidth = LW; g.lineCap = 'round'; g.lineJoin = 'round';
}

/* ---------------- 仪表：圆圈 + 字母 ---------------- */
function meter(g, x, y, ch, r){
  r = r || 20;
  setup(g);
  g.beginPath(); g.arc(x, y, r, 0, Math.PI*2);
  g.fillStyle = '#fff'; g.fill();
  g.strokeStyle = INK; g.stroke();
  g.fillStyle = INK;
  g.font = '600 ' + Math.round(r*1.05) + 'px "PingFang SC","Microsoft YaHei",sans-serif';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(ch, x, y+1);
}

/* ---------------- 三极刀开关族（铁壳开关/断路器） ----------------
   variant: 'plain' 普通刀开关 / 'trip' 带自动脱扣（X 标记）/ 'fuse' 熔断器式
   竖线 —(联动虚线)— 斜刀片 — 竖线，三极并排，顶部一条虚线表示机械联动 */
function switch3(g, x, y, variant){
  setup(g);
  const gap = 30, y0 = y - 78, yLink = y - 34, yBlade = y + 10, y1 = y + 78;
  const xs = [x - gap, x, x + gap];
  /* 联动虚线：贯穿三极 */
  dashLine(g, xs[0] - 10, yLink, xs[2] + 4, yLink);
  for(const px of xs){
    if(variant === 'fuse'){
      /* 顶端空心圆（铰接点） */
      g.beginPath(); g.arc(px, y0 + 7, 3.4, 0, Math.PI*2);
      g.fillStyle = '#fff'; g.fill(); g.strokeStyle = INK; g.stroke();
      line(g, px, y0 + 10.4, px, yLink);
    } else {
      line(g, px, y0, px, yLink);
    }
    /* 斜刀片 */
    const bx = px + 16, by = yBlade;
    line(g, px, yLink, bx, by);
    if(variant === 'trip'){
      /* 刀片上叠一个小 X，表示自动脱扣机构 */
      const mx = (px + bx)/2, my = (yLink + by)/2;
      line(g, mx-5, my-5, mx+5, my+5);
      line(g, mx-5, my+5, mx+5, my-5);
    }
    if(variant === 'fuse'){
      /* 下方一个小方框，表示熔断器 */
      g.strokeStyle = INK;
      g.strokeRect(bx - 4.5, by + 6, 9, 13);
      line(g, bx, by, bx, by + 6);
      line(g, bx, by + 19, bx, y1);
    } else {
      line(g, bx, by, bx, y1);
    }
  }
}

/* ---------------- 单极动合触点族（按钮/热继电器/速度继电器）----------------
   variant:
     'plain'  普通动合触点（没有任何附加标记）
     'link'   左侧虚线+小拐角，机械联动标记（行程开关一类）
     'estop'  左侧 "E" 标记（急停按钮）
     'heater' 触点臂上带一个小方块（热继电器的热元件标记）
     'loop'   虚线连到一个空心圆（离心/速度检测机构示意）
     'label'  左侧一个方框标着字母（如 "n" 表示转速，速度继电器专用标记）
*/
function contact(g, x, y, variant, label){
  setup(g);
  const y0 = y - 42, y1 = y + 42;
  const bx = x + 20, by = y - 6;
  if(variant === 'heater'){
    line(g, x, y0, x, y - 14);
    line(g, x, y - 14, bx, by);
    g.strokeRect(bx - 2, by - 12, 15, 9);
    line(g, bx+13, by-7.5, bx+22, by-7.5);
    line(g, bx, by, bx, y1);
  } else if(variant === 'link'){
    dashLine(g, x - 24, y - 14, x - 6, y - 14);
    line(g, x - 6, y - 14, x - 6, y - 4);
    line(g, x, y0, x, y - 14);
    line(g, x, y - 14, bx, by);
    line(g, bx, by, bx, y1);
  } else if(variant === 'estop'){
    g.font = '600 15px "PingFang SC","Microsoft YaHei",sans-serif';
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('E', x - 16, y - 14);
    line(g, x, y0, x, y - 14);
    line(g, x, y - 14, bx, by);
    line(g, bx, by, bx, y1);
  } else if(variant === 'loop'){
    line(g, x, y0, x, y1);
    dashLine(g, x, (y0+y1)/2, x + 26, y0 + 6);
    g.beginPath(); g.arc(x + 32, y0, 6.5, 0, Math.PI*2);
    g.fillStyle = '#fff'; g.fill(); g.strokeStyle = INK; g.stroke();
  } else if(variant === 'label'){
    g.strokeRect(x - 22, y - 14, 15, 12);
    g.font = '600 11px "PingFang SC","Microsoft YaHei",sans-serif';
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(label || 'n', x - 14.5, y - 8);
    dashLine(g, x - 7, y - 8, x - 2, y - 8);
    line(g, x, y0, x, y - 8);
    line(g, x, y - 8, bx, by);
    line(g, bx, by, bx, y1);
  } else { /* plain */
    line(g, x, y0, x, y - 14);
    line(g, x, y - 14, bx, by);
    line(g, bx, by, bx, y1);
  }
}

/* ---------------- 接触器：线圈 + 触点组 ----------------
   variant: 'filled' 实心线圈+2触点 / 'hollow2' 空心线圈+2触点 / 'main' 空心线圈+3主触点+1辅助触点（正确画法） */
function contactor(g, x, y, variant){
  setup(g);
  const cx = x - (variant === 'main' ? 46 : 30);
  const cy = y;
  /* 线圈：矩形，'filled' 左半涂黑表示动圈方向 */
  g.strokeRect(cx - 12, cy - 9, 24, 18);
  if(variant === 'filled'){
    g.fillStyle = INK;
    g.fillRect(cx - 12, cy - 9, 8, 18);
  }
  line(g, cx - 20, cy, cx - 12, cy);
  line(g, cx + 12, cy, cx + 20, cy);

  const poles = variant === 'main' ? 4 : 2;
  const gap = 24;
  const startX = cx + 22;
  for(let i=0;i<poles;i++){
    const px = startX + i*gap;
    const y0 = cy - 40, yLink = cy - 6, y1 = cy + 40;
    line(g, px, y0, px, yLink);
    line(g, px, yLink, px + 12, yLink - 30);
  }
  /* 三条主触点 + 最后一条辅助触点略短，贯穿虚线联动 */
  dashLine(g, startX - 6, cy - 6, startX + (poles-1)*gap + 4, cy - 6);
}

/* ---------------- 熔断器 ---------------- */
function fuseSym(g, x, y, variant){
  setup(g);
  const w = variant === 'wide' ? 52 : 40, h = variant === 'wide' ? 20 : 13;
  if(variant === 'diode'){
    g.beginPath();
    g.moveTo(x - 22, y);
    g.lineTo(x + 14, y - 14);
    g.lineTo(x + 14, y + 14);
    g.closePath();
    g.fillStyle = INK; g.fill();
    line(g, x + 14, y - 16, x + 14, y + 16);
    line(g, x + 14, y, x + 30, y);
    line(g, x - 22, y, x - 36, y);
    return;
  }
  g.strokeRect(x - w/2, y - h/2, w, h);
  line(g, x - w/2 - 22, y, x - w/2, y);
  line(g, x + w/2, y, x + w/2 + 22, y);
}

/* ---------------- 按 key 画：给题库用 ----------------
   题库里图形题的选项存成 'sym:xxx'，这里是 xxx → 画法的唯一真相。
   每个符号自带一个包围盒 [w,h]，画法在这个盒子的局部坐标里作画（原点是盒子左上角），
   drawKey 按目标画布等比缩放并居中 —— 所以各符号长宽比差得再多也不会被裁掉或缩成一小团。
   盒子尺寸是照着各画法实际画到的范围量的（switch3 高 156、fuse 只有 20 高，差 8 倍）。*/
const SYMS = {
  'ammeter'        : [ 48,  48, g => meter(g, 24, 24, 'A', 22)],
  'voltmeter'      : [ 48,  48, g => meter(g, 24, 24, 'V', 22)],
  'ohmmeter'       : [ 48,  48, g => meter(g, 24, 24, 'Ω', 22)],
  'switch3-plain'  : [ 92, 160, g => switch3(g, 42, 80, 'plain')],
  'switch3-trip'   : [ 92, 160, g => switch3(g, 42, 80, 'trip')],
  'switch3-fuse'   : [ 92, 160, g => switch3(g, 42, 80, 'fuse')],
  'contact-plain'  : [ 76,  88, g => contact(g, 28, 44, 'plain')],
  'contact-link'   : [ 76,  88, g => contact(g, 28, 44, 'link')],
  'contact-estop'  : [ 76,  88, g => contact(g, 28, 44, 'estop')],
  'contact-heater' : [ 76,  88, g => contact(g, 28, 44, 'heater')],
  'contact-loop'   : [ 76,  88, g => contact(g, 28, 44, 'loop')],
  'contact-label-n': [ 76,  88, g => contact(g, 28, 44, 'label', 'n')],
  'contactor-filled' : [ 84, 116, g => contactor(g, 54, 74, 'filled')],
  'contactor-hollow2': [ 84, 116, g => contactor(g, 54, 74, 'hollow2')],
  'contactor-main'   : [132, 116, g => contactor(g, 70, 74, 'main')],
  'fuse-thin'  : [ 90, 40, g => fuseSym(g, 45, 20, 'thin')],
  'fuse-wide'  : [102, 40, g => fuseSym(g, 51, 20, 'wide')],
  'fuse-diode' : [ 74, 40, g => fuseSym(g, 40, 20, 'diode')]
};

/* key 可以带 'sym:' 前缀，也可以不带。W/H 是目标画布的逻辑尺寸 */
function drawKey(g, key, W, H, pad){
  const d = SYMS[String(key).replace(/^sym:/, '')];
  if(!d) return false;
  const p = pad == null ? 6 : pad;
  const s = Math.min((W - p*2) / d[0], (H - p*2) / d[1]);
  g.save();
  g.translate((W - d[0]*s) / 2, (H - d[1]*s) / 2);
  g.scale(s, s);
  d[2](g);
  g.restore();
  return true;
}
function isSym(v){ return /^sym:/.test(String(v)) }

global.ESYM = { meter, switch3, contact, contactor, fuseSym, drawKey, isSym, SYMS };

})(typeof window!=='undefined' ? window : globalThis);
