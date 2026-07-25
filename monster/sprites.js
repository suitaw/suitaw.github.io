/* ============================================================
 * sprites.js — 程序化像素精灵生成（无外部素材）
 * 所有怪兽 / 人物都由参数在 40x40 (怪兽) 与 16x18 (人物) 的
 * 像素网格上绘制，再放大到画布，形成统一的像素画风格。
 * ============================================================ */
const SPR = (function () {
  const G = 40; // 怪兽网格边长

  /* ---------- 颜色工具 ---------- */
  function hex2rgb(h) {
    h = h.replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  function rgb2hex(r, g, b) {
    const f = (v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
    return '#' + f(r) + f(g) + f(b);
  }
  function shade(col, amt) {
    const [r, g, b] = hex2rgb(col);
    if (amt >= 0) return rgb2hex(r + (255 - r) * amt, g + (255 - g) * amt, b + (255 - b) * amt);
    return rgb2hex(r * (1 + amt), g * (1 + amt), b * (1 + amt));
  }

  /* ---------- 网格绘制原语 ---------- */
  function newGrid(n) { return new Array(n * n).fill(null); }

  function mk(n) {
    const g = newGrid(n);
    g.n = n;
    return g;
  }
  function px(g, x, y, c) {
    x = Math.round(x); y = Math.round(y);
    if (x < 0 || y < 0 || x >= g.n || y >= g.n || !c) return;
    g[y * g.n + x] = c;
  }
  function get(g, x, y) {
    if (x < 0 || y < 0 || x >= g.n || y >= g.n) return null;
    return g[y * g.n + x];
  }
  function ell(g, cx, cy, rx, ry, c) {
    for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) {
      for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
        const dx = (x - cx) / rx, dy = (y - cy) / ry;
        if (dx * dx + dy * dy <= 1.02) px(g, x, y, c);
      }
    }
  }
  function rect(g, x0, y0, w, h, c) {
    for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) px(g, x, y, c);
  }
  // 三角形（用于耳朵、角、鳍）
  function tri(g, x0, y0, x1, y1, x2, y2, c) {
    const minx = Math.floor(Math.min(x0, x1, x2)), maxx = Math.ceil(Math.max(x0, x1, x2));
    const miny = Math.floor(Math.min(y0, y1, y2)), maxy = Math.ceil(Math.max(y0, y1, y2));
    const area = (x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0);
    if (!area) return;
    for (let y = miny; y <= maxy; y++) for (let x = minx; x <= maxx; x++) {
      const w0 = ((x1 - x0) * (y - y0) - (x - x0) * (y1 - y0)) / area;
      const w1 = ((x - x0) * (y2 - y0) - (x2 - x0) * (y - y0)) / area;
      if (w0 >= -0.02 && w1 >= -0.02 && w0 + w1 <= 1.02) px(g, x, y, c);
    }
  }
  // 左右对称绘制包装
  function sym(g, fn) {
    const tmp = mk(g.n);
    fn(tmp);
    for (let y = 0; y < g.n; y++) for (let x = 0; x < g.n; x++) {
      const c = get(tmp, x, y);
      if (c) { px(g, x, y, c); px(g, g.n - 1 - x, y, c); }
    }
  }

  /* ---------- 描边 & 上色后处理 ---------- */
  function outline(g, col) {
    const add = [];
    for (let y = 0; y < g.n; y++) for (let x = 0; x < g.n; x++) {
      if (get(g, x, y)) continue;
      if (get(g, x - 1, y) || get(g, x + 1, y) || get(g, x, y - 1) || get(g, x, y + 1)) add.push([x, y]);
    }
    add.forEach(([x, y]) => px(g, x, y, col));
  }
  // 右下方向加暗，做出体积感
  function shading(g, main, dark) {
    for (let y = 0; y < g.n; y++) for (let x = 0; x < g.n; x++) {
      if (get(g, x, y) !== main) continue;
      const edge = !get(g, x + 1, y + 1) || !get(g, x + 2, y);
      if (edge) px(g, x, y, dark);
    }
  }

  /* ---------- 怪兽绘制 ---------- */
  // art = {body, colors:[main,belly,accent], ears, tail, extra, eyes, mouth}
  function drawMon(art) {
    const g = mk(G);
    const main = art.colors[0];
    const belly = art.colors[1] || shade(main, 0.35);
    const accent = art.colors[2] || shade(main, -0.3);
    const dark = shade(main, -0.28);
    const line = shade(main, -0.62);

    const B = art.body;
    let headC = { x: 20, y: 14, rx: 8, ry: 7 }; // 头部中心（用于放五官）

    sym(g, (t) => {
      /* --- 身后的部件（尾巴/翅膀）先画 --- */
      if (art.tail === 'long') {
        for (let i = 0; i < 12; i++) {
          px(t, 8 - i * 0.5, 28 - i * 1.1, main);
          px(t, 8 - i * 0.5, 29 - i * 1.1, main);
        }
      }
      if (art.tail === 'flame') {
        ell(t, 8, 24, 3, 5, accent);
        ell(t, 7, 18, 2.5, 4, shade(accent, 0.25));
        tri(t, 6, 14, 9, 20, 4, 20, shade(accent, 0.4));
      }
      if (art.tail === 'leaf') {
        ell(t, 7, 24, 4, 3, accent);
        tri(t, 3, 21, 9, 24, 3, 27, accent);
      }
      if (art.tail === 'bolt') {
        tri(t, 9, 26, 3, 20, 8, 21, accent);
        tri(t, 8, 21, 2, 14, 7, 17, accent);
      }
      if (art.tail === 'short') ell(t, 9, 27, 3, 3, main);
      if (art.wings === 'bug') {
        ell(t, 8, 17, 6, 8, shade(accent, 0.3));
        ell(t, 9, 26, 5, 6, shade(accent, 0.15));
      }
      if (art.wings === 'bat') {
        tri(t, 12, 14, 2, 10, 4, 26, accent);
      }

      /* --- 身体 --- */
      if (B === 'quad') {
        ell(t, 20, 26, 11, 7, main);           // 躯干
        rect(t, 11, 30, 4, 6, main); rect(t, 17, 31, 4, 5, main); // 腿
        ell(t, 20, 32, 7, 3, belly);
        headC = { x: 20, y: 13, rx: 8.5, ry: 7.5 };
        ell(t, 20, 13, 8.5, 7.5, main);
        ell(t, 20, 16, 5, 4, belly);
      } else if (B === 'round') {
        ell(t, 20, 23, 12.5, 12, main);
        ell(t, 20, 27, 8, 7, belly);
        rect(t, 12, 34, 5, 3, main); // 脚
        headC = { x: 20, y: 19, rx: 12, ry: 10 };
      } else if (B === 'tall') {
        ell(t, 20, 28, 8, 8, main);
        ell(t, 20, 30, 5, 5, belly);
        headC = { x: 20, y: 14, rx: 9, ry: 8 };
        ell(t, 20, 14, 9, 8, main);
        rect(t, 10, 24, 3, 8, main);  // 手臂
        rect(t, 14, 35, 4, 3, main);  // 脚
      } else if (B === 'shell') {
        ell(t, 20, 27, 13, 9, accent);       // 壳
        ell(t, 20, 28, 9, 6, shade(accent, 0.25));
        rect(t, 9, 32, 5, 4, belly); rect(t, 16, 33, 4, 3, belly);
        headC = { x: 20, y: 14, rx: 7.5, ry: 7 };
        ell(t, 20, 14, 7.5, 7, main);
      } else if (B === 'ghost') {
        ell(t, 20, 18, 11, 11, main);
        for (let i = 0; i < 5; i++) ell(t, 10 + i * 5, 29 + (i % 2 ? 1 : 3), 2.6, 3.4, main);
        rect(t, 9, 24, 22, 6, main);
        headC = { x: 20, y: 16, rx: 10, ry: 9 };
      } else if (B === 'bug') {
        ell(t, 20, 27, 9, 9, main);
        ell(t, 20, 27, 6, 6, belly);
        headC = { x: 20, y: 14, rx: 7, ry: 6.5 };
        ell(t, 20, 14, 7, 6.5, main);
        rect(t, 9, 28, 4, 2, dark); rect(t, 9, 33, 4, 2, dark);
      } else if (B === 'serpent') {
        for (let i = 0; i < 8; i++) ell(t, 20 - i * 1.2, 34 - i * 2.2, 8 - i * 0.5, 3.2, main);
        headC = { x: 14, y: 12, rx: 8, ry: 7 };
        ell(t, 14, 12, 8, 7, main);
      } else if (B === 'wide') {
        ell(t, 20, 25, 14, 8, main);
        ell(t, 20, 28, 9, 4, belly);
        rect(t, 10, 31, 5, 5, main); rect(t, 17, 32, 4, 4, main);
        headC = { x: 20, y: 15, rx: 8, ry: 7 };
        ell(t, 20, 15, 8, 7, main);
      }

      /* --- 耳朵 / 角 --- */
      const hx = headC.x, hy = headC.y, hr = headC.rx, hv = headC.ry;
      if (art.ears === 'pointy') tri(t, hx - hr + 1, hy - hv + 2, hx - hr + 6, hy - hv - 1, hx - hr - 1, hy - hv - 7, main);
      if (art.ears === 'round') ell(t, hx - hr + 1, hy - hv + 1, 3.2, 3.2, main);
      if (art.ears === 'horn') { tri(t, hx - 5, hy - hv + 1, hx - 1, hy - hv + 1, hx - 4, hy - hv - 8, accent); }
      if (art.ears === 'antenna') { for (let i = 0; i < 6; i++) px(t, hx - 4 - i * 0.4, hy - hv - i, dark); ell(t, hx - 7, hy - hv - 6, 2, 2, accent); }
      if (art.ears === 'fin') tri(t, hx - hr, hy - 2, hx - hr, hy - hv - 2, hx - hr - 6, hy - 1, accent);
      if (art.ears === 'long') { ell(t, hx - hr + 2, hy - hv - 3, 2.4, 6, main); }

      /* --- 附加特征 --- */
      if (art.extra === 'leaf') { ell(t, hx - 3, hy - hv - 2, 4, 2.4, accent); tri(t, hx - 8, hy - hv - 4, hx - 1, hy - hv - 2, hx - 7, hy - hv + 1, accent); }
      if (art.extra === 'flame') { tri(t, hx - 4, hy - hv + 1, hx + 4, hy - hv + 1, hx, hy - hv - 9, accent); tri(t, hx - 2, hy - hv, hx + 2, hy - hv, hx, hy - hv - 5, shade(accent, 0.45)); }
      if (art.extra === 'spike') { for (let i = 0; i < 3; i++) tri(t, 13 + i * 4, 18, 17 + i * 4, 18, 15 + i * 4, 12 - i, accent); }
      if (art.extra === 'gem') ell(t, 20, 24, 3.2, 3.2, accent);
      if (art.extra === 'crown') { rect(t, 13, 4, 14, 3, accent); tri(t, 13, 5, 17, 5, 15, 0, accent); tri(t, 18, 5, 22, 5, 20, -2, accent); }
      if (art.extra === 'cheek') { ell(t, hx - hr + 2, hy + 2, 2.4, 2.4, accent); }
      if (art.extra === 'swirl') { ell(t, 12, 26, 3, 3, accent); }

      /* --- 体表花纹 --- */
      if (art.pattern === 'plate') {          // 岩石板甲
        for (let i = 0; i < 3; i++) rect(t, 8, 21 + i * 5, 24, 2, accent);
      } else if (art.pattern === 'stripe') {  // 条纹
        for (let i = 0; i < 3; i++) rect(t, 6, 20 + i * 5, 12, 2, shade(main, -0.3));
      } else if (art.pattern === 'spot') {    // 斑点
        [[12, 22], [9, 29], [15, 33]].forEach(([sx, sy]) => ell(t, sx, sy, 2.4, 2, accent));
      }
    });

    shading(g, main, dark);
    outline(g, line);

    /* --- 五官（不对称部分单独画，眼睛仍左右放置） --- */
    const hx = headC.x, hy = headC.y;
    const eyeY = hy + (B === 'round' ? 0 : 0);
    const ex = Math.max(3.5, headC.rx * 0.48);
    [-1, 1].forEach((s) => {
      const cx = hx + s * ex;
      if (art.eyes === 'glow') {
        ell(g, cx, eyeY, 2.4, 2, art.eyeColor || '#ffe36e');
        ell(g, cx, eyeY, 1.1, 1.1, '#20161f');
      } else if (art.eyes === 'angry') {
        ell(g, cx, eyeY + 0.5, 2.3, 2.1, '#ffffff');
        ell(g, cx + s * 0.4, eyeY + 1, 1.3, 1.4, '#20161f');
        rect(g, cx - 2 + (s < 0 ? 0 : 0), eyeY - 2, 4, 1, shade(main, -0.62));
      } else if (art.eyes === 'happy') {
        rect(g, cx - 2, eyeY, 4, 1, '#20161f');
        px(g, cx - 2, eyeY - 1, '#20161f'); px(g, cx + 1, eyeY - 1, '#20161f');
      } else {
        ell(g, cx, eyeY, 2.4, 2.6, '#ffffff');
        ell(g, cx + s * 0.5, eyeY + 0.4, 1.4, 1.6, '#20161f');
        px(g, cx - s * 0.6, eyeY - 1, '#ffffff');
      }
    });
    // 嘴
    if (art.mouth === 'fang') {
      rect(g, hx - 3, hy + 4, 6, 1, '#20161f');
      px(g, hx - 2, hy + 5, '#ffffff'); px(g, hx + 2, hy + 5, '#ffffff');
    } else if (art.mouth === 'smile') {
      px(g, hx - 2, hy + 4, '#20161f'); px(g, hx - 1, hy + 5, '#20161f');
      px(g, hx, hy + 5, '#20161f'); px(g, hx + 1, hy + 5, '#20161f'); px(g, hx + 2, hy + 4, '#20161f');
    } else if (art.mouth === 'beak') {
      tri(g, hx - 3, hy + 3, hx + 3, hy + 3, hx, hy + 7, art.colors[2] || '#e8b23a');
    } else {
      rect(g, hx - 1, hy + 4, 3, 1, '#20161f');
    }
    return g;
  }

  /* ---------- 网格 -> canvas ---------- */
  function gridToCanvas(g, scale) {
    const c = document.createElement('canvas');
    c.width = g.n * scale; c.height = g.n * scale;
    const ctx = c.getContext('2d');
    for (let y = 0; y < g.n; y++) for (let x = 0; x < g.n; x++) {
      const col = g[y * g.n + x];
      if (!col) continue;
      ctx.fillStyle = col;
      ctx.fillRect(x * scale, y * scale, scale, scale);
    }
    return c;
  }

  const monCache = {};
  function monCanvas(key, art, scale) {
    const k = key + '@' + scale;
    if (!monCache[k]) monCache[k] = gridToCanvas(drawMon(art), scale);
    return monCache[k];
  }

  /* ---------- 人物（地图行走图） ---------- */
  // dir: 0下 1左 2右 3上, frame: 0/1/2 (走路)
  const CH = 16, CV = 20;
  function drawChar(look, dir, frame) {
    const g = mk(24); // 用方形网格，人物画在中间
    const skin = look.skin || '#f5c99b';
    const hair = look.hair || '#4b3a2f';
    const shirt = look.shirt || '#e05a4a';
    const pants = look.pants || '#3a4a7a';
    const line = '#20161f';
    const ox = 4, oy = 2;

    // 腿
    const sw = frame === 1 ? 1 : frame === 2 ? -1 : 0;
    rect(g, ox + 4 + sw, oy + 14, 3, 4, pants);
    rect(g, ox + 8 - sw, oy + 14, 3, 4, pants);
    rect(g, ox + 4 + sw, oy + 17, 3, 2, '#39312c');
    rect(g, ox + 8 - sw, oy + 17, 3, 2, '#39312c');
    // 身体
    rect(g, ox + 3, oy + 8, 10, 7, shirt);
    rect(g, ox + 2, oy + 9, 2, 5, shirt);
    rect(g, ox + 12, oy + 9, 2, 5, shirt);
    // 手
    rect(g, ox + 2, oy + 13, 2, 2, skin);
    rect(g, ox + 12, oy + 13, 2, 2, skin);
    // 头
    ell(g, ox + 8, oy + 5, 5.5, 5, skin);
    // 头发
    if (dir === 3) { ell(g, ox + 8, oy + 4, 5.8, 5, hair); }
    else {
      ell(g, ox + 8, oy + 3, 5.8, 4, hair);
      rect(g, ox + 2, oy + 2, 3, 5, hair);
      rect(g, ox + 11, oy + 2, 3, 5, hair);
    }
    if (look.cap) { ell(g, ox + 8, oy + 2, 6, 3.4, look.cap); rect(g, ox + 2, oy + 3, 12, 2, look.cap); if (dir !== 3) rect(g, ox + 2, oy + 5, 12, 1, shade(look.cap, -0.3)); }
    // 眼睛
    if (dir === 0) { rect(g, ox + 5, oy + 6, 2, 2, line); rect(g, ox + 10, oy + 6, 2, 2, line); }
    else if (dir === 1) { rect(g, ox + 4, oy + 6, 2, 2, line); }
    else if (dir === 2) { rect(g, ox + 11, oy + 6, 2, 2, line); }
    outline(g, line);
    return g;
  }

  const charCache = {};
  function charCanvas(look, dir, frame, scale) {
    const k = JSON.stringify(look) + dir + frame + '@' + scale;
    if (!charCache[k]) charCache[k] = gridToCanvas(drawChar(look, dir, frame), scale);
    return charCache[k];
  }

  /* ---------- 精灵球图标 ---------- */
  function ballCanvas(kind, scale) {
    const k = 'ball' + kind + '@' + scale;
    if (monCache[k]) return monCache[k];
    const g = mk(16);
    const top = kind === 'great' ? '#3d7de0' : kind === 'ultra' ? '#f0c02a' : '#e0473c';
    ell(g, 8, 8, 7, 7, '#f2f2ea');
    for (let y = 0; y < 8; y++) for (let x = 0; x < 16; x++) if (get(g, x, y)) px(g, x, y, top);
    rect(g, 1, 7, 14, 2, '#20161f');
    ell(g, 8, 8, 2.6, 2.6, '#20161f');
    ell(g, 8, 8, 1.4, 1.4, '#f2f2ea');
    outline(g, '#20161f');
    monCache[k] = gridToCanvas(g, scale);
    return monCache[k];
  }

  return { drawMon, monCanvas, charCanvas, ballCanvas, gridToCanvas, shade, mk, px, ell, rect, outline };
})();
