/* ============================================================
 * world.js — 地图渲染、移动、交互、菜单、主循环
 * ============================================================ */

const TS = 16;              // 地图像素/格
const VIEW_TILES = 11;      // 横向可见格数

const W = {
  canvas: null, ctx: null,
  scene: null, sctx: null,
  mapCanvas: [null, null],  // 两帧（水波动画）
  mapKey: null,
  npcs: [],
  player: { x: 0, y: 0, dir: 0, px: 0, py: 0, frame: 0, step: 0, moving: null },
  camX: 0, camY: 0,
  input: { up: 0, down: 0, left: 0, right: 0 },
  busy: false,            // 对话/战斗中禁止移动
  paused: false,
  lastTime: 0,
  animT: 0,
  transition: 0,
};

/* ============================================================
 * 图块绘制
 * ============================================================ */
function hash(x, y) {
  let h = x * 374761393 + y * 668265263;
  h = (h ^ (h >> 13)) * 1274126177;
  return ((h ^ (h >> 16)) >>> 0) / 4294967295;
}
function px(ctx, x, y, w, h, c) { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); }

function drawTile(ctx, ch, tx, ty, map, frame) {
  const x = tx * TS, y = ty * TS;
  const r = hash(tx, ty);
  const at = (dx, dy) => {
    const nx = tx + dx, ny = ty + dy;
    if (nx < 0 || ny < 0 || nx >= map.w || ny >= map.h) return '#';
    return map.rows[ny][nx];
  };
  const grassBase = map.cavern ? '#4a4658' : '#6cbf5a';

  const drawGrass = () => {
    px(ctx, x, y, TS, TS, grassBase);
    px(ctx, x, y, TS, 2, SPR.shade(grassBase, 0.08));
    for (let i = 0; i < 5; i++) {
      const gx = x + Math.floor(hash(tx * 7 + i, ty * 13) * 14);
      const gy = y + Math.floor(hash(tx * 3, ty * 11 + i) * 14);
      px(ctx, gx, gy, 2, 1, SPR.shade(grassBase, -0.12));
    }
    if (r > 0.75) { px(ctx, x + 6, y + 9, 1, 3, SPR.shade(grassBase, -0.2)); px(ctx, x + 5, y + 10, 3, 1, SPR.shade(grassBase, -0.2)); }
  };

  switch (ch) {
    case '.': drawGrass(); break;
    case 'f': {
      drawGrass();
      const cols = ['#f06a7a', '#f5d24a', '#e8f0ff', '#e08ad0'];
      const c = cols[Math.floor(r * cols.length)];
      [[4, 5], [10, 9]].forEach(([ax, ay], i) => {
        const cc = cols[Math.floor(hash(tx + i, ty * 2) * cols.length)];
        px(ctx, x + ax, y + ay - 1, 2, 1, cc); px(ctx, x + ax - 1, y + ay, 4, 1, cc); px(ctx, x + ax, y + ay + 1, 2, 1, cc);
        px(ctx, x + ax, y + ay, 2, 1, '#fff6c0');
      });
      break;
    }
    case ',': {
      // 高草：更深的底色 + 成簇的草叶，与普通草地明显区分
      px(ctx, x, y, TS, TS, '#57ab4e');
      const dark = '#2f7a38', mid = '#43974a', lite = '#6cc45c';
      const n = 4 + (hash(tx, ty) > 0.5 ? 1 : 0);
      for (let i = 0; i < n; i++) {
        const cxp = x + 1 + Math.floor(hash(tx * 5 + i * 3, ty * 9 + i) * 13);
        const cyp = y + 1 + Math.floor(hash(tx * 2 + i, ty * 7 + i * 5) * 10);
        const sway = frame && (i % 2) ? 1 : 0;
        px(ctx, cxp + sway, cyp, 1, 5, dark);
        px(ctx, cxp + 2, cyp + 1, 1, 4, mid);
        px(ctx, cxp - 1 + sway, cyp + 2, 1, 3, lite);
        px(ctx, cxp, cyp + 5, 3, 1, dark);
      }
      break;
    }
    case 'R': {
      px(ctx, x, y, TS, TS, '#d9c79a');
      for (let i = 0; i < 6; i++) {
        const gx = x + Math.floor(hash(tx * 11 + i, ty * 5) * 15);
        const gy = y + Math.floor(hash(tx * 4, ty * 3 + i) * 15);
        px(ctx, gx, gy, 1, 1, r > 0.5 ? '#c8b487' : '#e6d7ae');
      }
      // 与草地交界的碎边
      if (at(0, -1) !== 'R' && 'RD'.indexOf(at(0, -1)) < 0) px(ctx, x, y, TS, 1, '#c8b487');
      if (at(0, 1) !== 'R' && 'RD'.indexOf(at(0, 1)) < 0) px(ctx, x, y + TS - 1, TS, 1, '#c8b487');
      break;
    }
    case 'c': {
      px(ctx, x, y, TS, TS, '#3c3852');
      for (let i = 0; i < 7; i++) {
        const gx = x + Math.floor(hash(tx * 13 + i, ty * 7) * 15);
        const gy = y + Math.floor(hash(tx * 6, ty * 17 + i) * 15);
        px(ctx, gx, gy, 2, 1, hash(gx, gy) > 0.5 ? '#4a4664' : '#332f47');
      }
      if (r > 0.85) { px(ctx, x + 5, y + 8, 4, 2, '#4f4a68'); px(ctx, x + 6, y + 7, 2, 1, '#5c5878'); }
      break;
    }
    case '#': {
      drawGrass();
      const dark = '#20522b', mid = '#31763a', lite = '#489945';
      px(ctx, x + 6, y + 11, 4, 5, '#6b4a2a');
      px(ctx, x + 6, y + 11, 1, 5, '#4e3419');
      ctx.fillStyle = mid;
      ctx.beginPath(); ctx.arc(x + 8, y + 7, 7.4, 0, 7); ctx.fill();
      ctx.fillStyle = lite;
      ctx.beginPath(); ctx.arc(x + 6, y + 5, 4.2, 0, 7); ctx.fill();
      ctx.fillStyle = dark;
      ctx.beginPath(); ctx.arc(x + 11.5, y + 10, 3.6, 0, 7); ctx.fill();
      break;
    }
    case 'X': {
      const base = '#8a84a2', top = '#a49ebc', low = '#6a6480';
      px(ctx, x, y, TS, TS, base);
      px(ctx, x, y, TS, 3, top);
      for (let i = 0; i < 4; i++) {
        const gx = x + Math.floor(hash(tx * 9 + i, ty) * 13);
        const gy = y + 4 + Math.floor(hash(tx, ty * 9 + i) * 8);
        px(ctx, gx, gy, 3, 2, hash(gx, gy) > 0.5 ? '#7b7593' : '#9a94b2');
      }
      // 与地面交界处画出岩壁厚度，避免墙地不分
      if (at(0, 1) !== 'X') { px(ctx, x, y + 11, TS, 3, low); px(ctx, x, y + 14, TS, 2, '#2a2740'); }
      if (at(0, -1) !== 'X') px(ctx, x, y, TS, 2, '#c0bad8');
      if (at(-1, 0) !== 'X') px(ctx, x, y, 1, TS, low);
      if (at(1, 0) !== 'X') px(ctx, x + TS - 1, y, 1, TS, low);
      break;
    }
    case '~': {
      const a = '#3f86d0', b = '#4f9ade', c2 = '#9fd4f5';
      px(ctx, x, y, TS, TS, a);
      const o1 = Math.floor(hash(tx, ty * 3) * 8), o2 = Math.floor(hash(tx * 5, ty) * 8);
      px(ctx, x + o1, y + 3 + (frame ? 1 : 0), 6, 1, b);
      px(ctx, x + o2, y + 9 + (frame ? -1 : 0), 5, 1, b);
      px(ctx, x + (frame ? o1 + 2 : o1), y + 12, 3, 1, c2);
      // 岸边浪花
      const land = (dx, dy) => { const t = at(dx, dy); return t !== '~' && t !== 'B'; };
      if (land(0, -1)) { px(ctx, x, y, TS, 2, '#8fd0f0'); px(ctx, x + (frame ? 2 : 7), y + 2, 4, 1, '#cdeeff'); }
      if (land(0, 1)) px(ctx, x, y + TS - 2, TS, 2, '#2f6cb0');
      if (land(-1, 0)) px(ctx, x, y, 2, TS, '#5fa8e0');
      if (land(1, 0)) px(ctx, x + TS - 2, y, 2, TS, '#5fa8e0');
      break;
    }
    case 'B': {
      px(ctx, x, y, TS, TS, '#3f86d0');
      px(ctx, x, y + 1, TS, 14, '#a97c46');
      for (let i = 0; i < 4; i++) px(ctx, x, y + 2 + i * 4, TS, 1, '#8a6236');
      px(ctx, x, y + 1, TS, 1, '#c99a5e'); px(ctx, x, y + 14, TS, 1, '#7a5630');
      break;
    }
    case '=': {
      drawGrass();
      px(ctx, x, y + 5, TS, 2, '#b08a5a');
      px(ctx, x, y + 9, TS, 2, '#b08a5a');
      px(ctx, x + 6, y + 3, 3, 11, '#8a6a40');
      break;
    }
    case 's': {
      drawGrass();
      px(ctx, x + 7, y + 9, 2, 6, '#7a5a34');
      px(ctx, x + 2, y + 3, 12, 7, '#c09a5e');
      px(ctx, x + 2, y + 3, 12, 1, '#e0bd80');
      px(ctx, x + 4, y + 5, 8, 1, '#6a4a28'); px(ctx, x + 4, y + 7, 6, 1, '#6a4a28');
      break;
    }
    /* --- 建筑 --- */
    case 'W': case 'C': case 'S': case 'G': {
      const roofCol = ch === 'C' ? '#e0607a' : ch === 'S' ? '#4a90d8' : ch === 'G' ? '#9a7a4a' : '#c07050';
      const below = at(0, 1);
      const isBottom = below !== ch && below !== 'D';
      const wallCol = '#e8dcc0', wallDark = '#c8b898';
      if (isBottom) {
        px(ctx, x, y, TS, TS, wallCol);
        px(ctx, x, y + 13, TS, 3, wallDark);
        if (r > 0.45) { px(ctx, x + 3, y + 3, 10, 7, '#6fb8e0'); px(ctx, x + 3, y + 3, 10, 1, '#b8e4f5'); px(ctx, x + 7, y + 3, 2, 7, wallCol); px(ctx, x + 3, y + 6, 10, 1, wallCol); }
      } else {
        px(ctx, x, y, TS, TS, roofCol);
        for (let i = 0; i < TS; i += 4) px(ctx, x, y + i, TS, 1, SPR.shade(roofCol, -0.18));
        px(ctx, x, y, TS, 2, SPR.shade(roofCol, 0.22));
        if (at(0, -1) !== ch) px(ctx, x, y, TS, 3, SPR.shade(roofCol, 0.3));
      }
      break;
    }
    case 'D': {
      px(ctx, x, y, TS, TS, '#e8dcc0');
      px(ctx, x + 2, y + 1, 12, 15, '#5a3a20');
      px(ctx, x + 3, y + 2, 10, 14, '#7a5230');
      px(ctx, x + 11, y + 8, 2, 2, '#e8d060');
      px(ctx, x + 3, y + 2, 10, 1, '#a07a4a');
      break;
    }
    /* --- 室内 --- */
    case 'L': {
      const a = '#e8d8b8', b = '#dcc8a4';
      px(ctx, x, y, TS, TS, (tx + ty) % 2 ? a : b);
      px(ctx, x, y, TS, 1, SPR.shade((tx + ty) % 2 ? a : b, 0.12));
      break;
    }
    case 'w': {
      const below = at(0, 1);
      px(ctx, x, y, TS, TS, '#b8a488');
      if (below !== 'w') {
        px(ctx, x, y, TS, 10, '#d8c8ac');
        for (let i = 0; i < TS; i += 8) px(ctx, x + i, y, 1, 10, '#c4b294');
        px(ctx, x, y + 10, TS, 3, '#8a7a5e');
        px(ctx, x, y + 13, TS, 3, '#a08c6c');
      } else {
        px(ctx, x, y + 4, TS, 1, '#a08c6c');
      }
      break;
    }
    case 'M': {
      px(ctx, x, y, TS, TS, '#c8b898');
      px(ctx, x + 1, y + 4, 14, 10, '#d05a6a');
      px(ctx, x + 3, y + 6, 10, 6, '#e08090');
      break;
    }
    case 'T': {
      px(ctx, x, y, TS, TS, '#e8d8b8');
      px(ctx, x, y + 2, TS, 12, '#a8763e');
      px(ctx, x, y + 2, TS, 2, '#c99a5e');
      px(ctx, x, y + 12, TS, 2, '#7a5630');
      break;
    }
    case 'P': {
      px(ctx, x, y, TS, TS, '#e8d8b8');
      px(ctx, x + 1, y + 3, 14, 11, '#d0d8e0');
      px(ctx, x + 1, y + 3, 14, 2, '#f0f4f8');
      [4, 8, 12].forEach((cx2, i) => { px(ctx, x + cx2 - 1, y + 7, 3, 3, i % 2 ? '#e0473c' : '#f5f5ea'); });
      px(ctx, x + 1, y + 12, 14, 2, '#9aa4b0');
      break;
    }
    case 'b': {
      px(ctx, x, y, TS, TS, '#8a6a44');
      px(ctx, x, y + 1, TS, 6, '#6a4e30');
      px(ctx, x, y + 9, TS, 6, '#6a4e30');
      ['#d05a5a', '#5ad0a0', '#e0c050', '#7a9ad0'].forEach((c, i) => {
        px(ctx, x + 1 + i * 4, y + 2, 3, 4, c);
        px(ctx, x + 2 + ((i + 1) % 4) * 3, y + 10, 3, 4, c);
      });
      break;
    }
    case 't': {
      px(ctx, x, y, TS, TS, '#e8d8b8');
      px(ctx, x, y + 2, TS, 12, '#c09a62');
      px(ctx, x, y + 2, TS, 2, '#dcb87e');
      px(ctx, x + 2, y + 6, 5, 4, '#f0eee0');
      break;
    }
    default: drawGrass();
  }
}

function buildMapCanvas(key) {
  const map = MAPS[key];
  for (let f = 0; f < 2; f++) {
    const c = document.createElement('canvas');
    c.width = map.w * TS; c.height = map.h * TS;
    const ctx = c.getContext('2d');
    for (let y = 0; y < map.h; y++) for (let x = 0; x < map.w; x++) drawTile(ctx, map.rows[y][x], x, y, map, f);
    W.mapCanvas[f] = c;
  }
  W.mapKey = key;
}

/* ============================================================
 * 地图状态与 NPC
 * ============================================================ */
function tileAt(map, x, y) {
  if (x < 0 || y < 0 || x >= map.w || y >= map.h) return '#';
  return map.rows[y][x];
}
function walkable(key, x, y) {
  const map = MAPS[key];
  if (!WALKABLE.includes(tileAt(map, x, y))) return false;
  if (W.npcs.some((n) => !n.gone && n.x === x && n.y === y && !n.ground)) return false;
  return true;
}
function npcAt(x, y) { return W.npcs.find((n) => !n.gone && n.x === x && n.y === y); }

function enterMap(key, x, y, dir) {
  if (W.mapKey !== key) buildMapCanvas(key);
  G.map = key; G.x = x; G.y = y;
  if (dir !== undefined) G.dir = dir;
  W.player.x = x; W.player.y = y; W.player.dir = G.dir;
  W.player.px = x * TS; W.player.py = y * TS; W.player.moving = null;
  const map = MAPS[key];
  W.npcs = (map.npcs || []).map((n) => {
    const o = Object.assign({}, n);
    o.beaten = !!G.flags['beat_' + key + '_' + n.id];
    o.talked = !!G.flags['talk_' + key + '_' + n.id];
    o.gone = !!(n.item && G.flags['item_' + key + '_' + n.id]) || !!(n.legendary && G.flags['legend_done']);
    o.dir = n.dir === undefined ? 0 : n.dir;
    o.frame = 0; o.wt = 1 + Math.random() * 3;
    if (n.gateOpen && G.badges > 0) { o.x = n.gateOpen.x; o.y = n.gateOpen.y; }
    return o;
  });
  resizeCanvas();
  Sound.playMusic(mapTrack(key));
  updateLocationLabel();
}

function mapTrack(key) {
  const m = MAPS[key];
  if (key === 'gym') return 'gym';
  if (m.cavern) return 'cave';
  if (m.indoor) return 'town';
  if (key === 'town' || key === 'town2') return 'town';
  return 'field';
}

function updateLocationLabel() {
  const el = document.getElementById('locName');
  el.textContent = MAPS[G.map].name;
  el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
}

/* ============================================================
 * 渲染
 * ============================================================ */
function resizeCanvas() {
  const c = W.canvas;
  const rect = c.parentElement.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  c.width = Math.max(1, Math.floor(rect.width * dpr));
  c.height = Math.max(1, Math.floor(rect.height * dpr));
  c.style.width = rect.width + 'px';
  c.style.height = rect.height + 'px';

  // 视野格数：尽量让地图铺满，同时保证可视范围适中
  const map = G ? MAPS[G.map] : null;
  const aspect = rect.width / Math.max(1, rect.height);
  let tx = VIEW_TILES;
  let ty = tx / aspect;
  if (map) {
    if (ty > map.h) { ty = map.h; tx = ty * aspect; }
    if (tx > map.w) { tx = map.w; ty = tx / aspect; }
    tx = clamp(tx, 7, 20); ty = tx / aspect;
  }
  W.scene.width = Math.round(tx * TS);
  W.scene.height = Math.max(TS, Math.round(ty * TS));
  W.ctx.imageSmoothingEnabled = false;
  W.sctx.imageSmoothingEnabled = false;
}

function render(dt) {
  const map = MAPS[G.map];
  const s = W.sctx, sw = W.scene.width, sh = W.scene.height;
  const p = W.player;

  // 相机
  let cx = p.px + TS / 2 - sw / 2;
  let cy = p.py + TS / 2 - sh / 2;
  const mw = map.w * TS, mh = map.h * TS;
  cx = mw > sw ? clamp(cx, 0, mw - sw) : (mw - sw) / 2;
  cy = mh > sh ? clamp(cy, 0, mh - sh) : (mh - sh) / 2;
  W.camX = Math.round(cx); W.camY = Math.round(cy);

  s.fillStyle = map.indoor ? '#241f2b' : map.cavern ? '#141420' : '#2b3a2b';
  s.fillRect(0, 0, sw, sh);
  const frame = Math.floor(W.animT / 0.55) % 2;
  s.drawImage(W.mapCanvas[frame], W.camX, W.camY, sw, sh, 0, 0, sw, sh);

  // 角色（按 y 排序）
  const actors = W.npcs.filter((n) => !n.gone && !n.sign).map((n) => ({ n: n, y: n.y }));
  actors.push({ p: true, y: p.y });
  actors.sort((a, b) => a.y - b.y);
  actors.forEach((a) => {
    if (a.p) {
      drawActor(s, p.px, p.py, G.look, p.dir, p.frame);
      const t = tileAt(map, p.x, p.y);
      if (t === ',') drawGrassOverlay(s, p.px, p.py);
    } else {
      const n = a.n;
      if (n.item) drawItemBall(s, n.x * TS, n.y * TS);
      else if (n.legendary) drawLegendMark(s, n.x * TS, n.y * TS);
      else drawActor(s, n.x * TS, n.y * TS, n.look, n.dir, n.frame);
    }
  });

  // 缩放输出
  W.ctx.fillStyle = '#000';
  W.ctx.fillRect(0, 0, W.canvas.width, W.canvas.height);
  W.ctx.drawImage(W.scene, 0, 0, sw, sh, 0, 0, W.canvas.width, W.canvas.height);
}
function drawActor(s, mx, my, look, dir, frame) {
  const c = SPR.charCanvas(look || {}, dir, frame, 1);
  s.drawImage(c, Math.round(mx - W.camX - 4), Math.round(my - W.camY - 5));
}
function drawGrassOverlay(s, mx, my) {
  const x = Math.round(mx - W.camX), y = Math.round(my - W.camY);
  for (let i = 0; i < 7; i++) {
    const gx = x + 1 + i * 2;
    px(s, gx, y + 9, 1, 5, i % 2 ? '#3f8f45' : '#54a84e');
  }
  px(s, x, y + 13, TS, 3, '#357a3c');
}
function drawItemBall(s, mx, my) {
  const c = SPR.ballCanvas('normal', 1);
  const bob = Math.sin(W.animT * 3) * 1;
  s.drawImage(c, Math.round(mx - W.camX), Math.round(my - W.camY + bob));
}
function drawLegendMark(s, mx, my) {
  const x = Math.round(mx - W.camX), y = Math.round(my - W.camY);
  const t = W.animT * 4;
  for (let i = 0; i < 3; i++) {
    const a = 0.4 + 0.6 * Math.abs(Math.sin(t + i));
    s.fillStyle = 'rgba(255,240,140,' + a.toFixed(2) + ')';
    s.fillRect(x + 4 + i * 4, y + 4 + Math.sin(t + i * 2) * 3, 2, 6);
  }
}

/* ============================================================
 * 移动与触发
 * ============================================================ */
const DIRS = [[0, 1], [-1, 0], [1, 0], [0, -1]]; // 0下 1左 2右 3上

function tryMove(dir) {
  const p = W.player;
  if (p.moving || W.busy) return;
  p.dir = dir; G.dir = dir;
  const [dx, dy] = DIRS[dir];
  const nx = p.x + dx, ny = p.y + dy;
  if (!walkable(G.map, nx, ny)) {
    p.step = (p.step + 1) % 2;
    p.frame = p.step + 1;
    setTimeout(() => { if (!p.moving) p.frame = 0; }, 130);
    return;
  }
  p.moving = { fx: p.x, fy: p.y, t: 0, dur: 0.17 };
  p.x = nx; p.y = ny;
}

function updateMovement(dt) {
  const p = W.player;
  if (p.moving) {
    p.moving.t += dt;
    const k = clamp(p.moving.t / p.moving.dur, 0, 1);
    p.px = (p.moving.fx + (p.x - p.moving.fx) * k) * TS;
    p.py = (p.moving.fy + (p.y - p.moving.fy) * k) * TS;
    p.frame = p.step + 1;
    if (k >= 1) {
      p.moving = null;
      p.px = p.x * TS; p.py = p.y * TS;
      p.step = (p.step + 1) % 2;
      p.frame = 0;
      G.x = p.x; G.y = p.y;
      onStepComplete();
    }
    return;
  }
  if (W.busy) { p.frame = 0; return; }
  const i = W.input;
  const dir = i.up ? 3 : i.down ? 0 : i.left ? 1 : i.right ? 2 : -1;
  if (dir >= 0) tryMove(dir);
  else p.frame = 0;
}

async function onStepComplete() {
  const map = MAPS[G.map];
  G.steps++;
  // 传送门
  const warp = (map.warps || []).find((w) => w.x === W.player.x && w.y === W.player.y);
  if (warp) {
    if (warp.needBadge && G.badges < 1) {
      await dialog(['一股看不见的力量挡住了去路…', '（似乎需要先取得徽章）']);
      return;
    }
    await doWarp(warp);
    return;
  }
  // 训练家视线
  if (await checkTrainerSight()) return;
  // 野生遭遇
  if (tileAt(map, W.player.x, W.player.y) === ',' && map.encounters) {
    if (Math.random() < map.encounters.rate) {
      const foe = rollEncounter(G.map);
      if (foe) await startWildBattle(foe);
      return;
    }
  }
  if (G.steps % 25 === 0) saveGame();
}

async function doWarp(warp) {
  W.busy = true;
  Sound.play('door');
  await fade(true);
  enterMap(warp.to, warp.tx, warp.ty);
  await fade(false);
  W.busy = false;
  // 落地后立刻检查视线
  await checkTrainerSight();
}

function fade(out) {
  return new Promise((res) => {
    const el = document.getElementById('fade');
    el.style.transition = 'opacity .22s';
    el.style.opacity = out ? '1' : '0';
    setTimeout(res, 240);
  });
}

async function checkTrainerSight() {
  if (W.busy) return false;
  for (const n of W.npcs) {
    if (n.gone || !n.trainer || n.beaten || !n.sight) continue;
    const [dx, dy] = DIRS[n.dir];
    for (let i = 1; i <= n.sight; i++) {
      const tx = n.x + dx * i, ty = n.y + dy * i;
      if (!WALKABLE.includes(tileAt(MAPS[G.map], tx, ty))) break;
      if (tx === W.player.x && ty === W.player.y) {
        await trainerApproach(n, i);
        return true;
      }
      if (npcAt(tx, ty)) break;
    }
  }
  return false;
}

async function trainerApproach(n, dist) {
  W.busy = true;
  await showEmote(n, '!');
  const [dx, dy] = DIRS[n.dir];
  for (let i = 0; i < dist - 1; i++) {
    n.x += dx; n.y += dy; n.frame = (n.frame + 1) % 3;
    await sleep(160);
  }
  n.frame = 0;
  W.player.dir = [3, 2, 1, 0][n.dir];
  W.busy = false;
  await talkTo(n, true);
}

function showEmote(n, ch) {
  return new Promise((res) => {
    const el = document.getElementById('emote');
    const sw = W.scene.width;
    const scale = W.canvas.getBoundingClientRect().width / sw;
    el.textContent = ch;
    el.style.left = ((n.x * TS - W.camX + 2) * scale) + 'px';
    el.style.top = ((n.y * TS - W.camY - 14) * scale) + 'px';
    el.classList.add('show');
    setTimeout(() => { el.classList.remove('show'); res(); }, 620);
  });
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ============================================================
 * 对话系统
 * ============================================================ */
function dialog(lines, opts) {
  opts = opts || {};
  const prevBusy = W.busy;
  W.busy = true;
  return new Promise((res) => {
    const box = document.getElementById('dialog');
    const txt = document.getElementById('dialogText');
    const nameEl = document.getElementById('dialogName');
    box.classList.remove('hidden');
    nameEl.textContent = opts.name || '';
    nameEl.style.display = opts.name ? '' : 'none';
    let i = 0, typing = false, full = '';
    const show = () => {
      full = lines[i];
      txt.textContent = '';
      typing = true;
      let c = 0;
      clearInterval(box._tm);
      box._tm = setInterval(() => {
        c++;
        txt.textContent = full.slice(0, c);
        if (c >= full.length) { clearInterval(box._tm); typing = false; }
      }, 18);
    };
    const next = () => {
      if (typing) { clearInterval(box._tm); txt.textContent = full; typing = false; return; }
      i++;
      if (i >= lines.length) {
        box.classList.add('hidden');
        box.removeEventListener('click', next);
        document.removeEventListener('keydown', key);
        W.busy = prevBusy;
        res();
      } else show();
    };
    const key = (e) => { if ([' ', 'Enter', 'z', 'Z', 'x', 'X'].includes(e.key)) { e.preventDefault(); next(); } };
    box.addEventListener('click', next);
    document.addEventListener('keydown', key);
    show();
  });
}

function choiceBox(title, options) {
  const prevBusy = W.busy;
  W.busy = true;
  return new Promise((res) => {
    const el = document.getElementById('choice');
    el.innerHTML = '<div class="ctitle">' + title + '</div>';
    options.forEach((o) => {
      const b = document.createElement('button');
      b.className = 'cbtn';
      b.innerHTML = o.label;
      b.onclick = () => { Sound.play('select'); el.classList.add('hidden'); W.busy = prevBusy; res(o.value); };
      el.appendChild(b);
    });
    el.classList.remove('hidden');
  });
}

/* ============================================================
 * 交互
 * ============================================================ */
async function interact() {
  if (W.busy || W.player.moving) return;
  const [dx, dy] = DIRS[W.player.dir];
  let tx = W.player.x + dx, ty = W.player.y + dy;
  let n = npcAt(tx, ty);
  // 隔着柜台说话
  if (!n && tileAt(MAPS[G.map], tx, ty) === 'T') n = npcAt(tx + dx, ty + dy);
  if (!n) {
    const t = tileAt(MAPS[G.map], tx, ty);
    if (t === 'P') { await dialog(['这是怪兽治疗机。', '请找护士小姐帮忙吧。']); }
    else if (t === 'b') { await dialog(['书架上摆满了关于怪兽的书。']); }
    else if (t === '~') { await dialog(['水面波光粼粼…']); }
    return;
  }
  await talkTo(n, false);
}

async function talkTo(n, forced) {
  W.busy = true;
  // NPC 面向玩家
  if (!n.sign && !n.item && !forced) n.dir = [3, 2, 1, 0][W.player.dir];

  try {
    if (n.item) { await pickItem(n); return; }
    if (n.legendary) { await legendEncounter(n); return; }
    if (n.heal) { await nurseHeal(n); return; }
    if (n.shop) { await openShop(n); return; }

    const done = n.beaten || n.talked;
    if (n.trainer && !n.beaten) {
      await dialog(n.text, { name: n.name });
      Sound.playMusic('battle');
      const res = await Battle.start({ trainer: Object.assign({ name: n.name }, n.trainer), bg: battleBg() });
      Sound.playMusic(mapTrack(G.map));
      if (res === 'win') {
        n.beaten = true;
        G.flags['beat_' + G.map + '_' + n.id] = true;
        if (n.leader) await awardBadge(n);
        if (n.rival) G.flags['rival_beaten'] = 1;
        saveGame();
      } else {
        await blackout();
        return;
      }
      if (n.afterText) await dialog(n.afterText, { name: n.name });
      return;
    }

    if (n.gate && G.badges < 1) {
      await dialog(n.text, { name: n.name });
      return;
    }
    const lines = (done && n.afterText) ? n.afterText : n.text;
    await dialog(lines, { name: n.sign ? '' : n.name });

    if (n.giveItem && !n.talked) {
      addItem(n.giveItem.key, n.giveItem.n);
      await dialog(['你获得了 ' + ITEMS[n.giveItem.key].name + ' ×' + n.giveItem.n + '！']);
    }
    if (n.healOnce) { healParty(); await dialog(['（队伍的怪兽恢复了活力！）']); }
    if (!n.talked) { n.talked = true; G.flags['talk_' + G.map + '_' + n.id] = true; }
  } finally {
    W.busy = false;
    updateHUD();
  }
}

async function pickItem(n) {
  Sound.play('money');
  addItem(n.item.key, n.item.n);
  n.gone = true;
  G.flags['item_' + G.map + '_' + n.id] = true;
  await dialog(['你找到了 ' + ITEMS[n.item.key].name + ' ×' + n.item.n + '！']);
  saveGame();
}

async function nurseHeal(n) {
  await dialog(['欢迎光临怪兽中心！', '要让你的怪兽恢复精神吗？'], { name: n.name });
  const yes = await choiceBox('治疗队伍？', [{ label: '好的，拜托了', value: 1 }, { label: '不用了', value: 0 }]);
  if (!yes) { await dialog(['那么，路上小心哦。'], { name: n.name }); return; }
  const heal = document.getElementById('healFx');
  Sound.play('heal');
  heal.classList.add('on');
  healParty();
  await sleep(900);
  heal.classList.remove('on');
  G.flags.lastCenter = { map: G.map, x: MAPS[G.map].warps[0].tx, y: MAPS[G.map].warps[0].ty, back: MAPS[G.map].warps[0].to };
  saveGame();
  await dialog(['你的怪兽已经完全恢复了！', '期待你的再次光临！'], { name: n.name });
}

async function openShop(n) {
  await dialog(['欢迎光临！需要点什么？'], { name: n.name });
  while (true) {
    const opts = n.shop.map((k) => ({ label: ITEMS[k].name + ' <b>¥' + ITEMS[k].price + '</b>', value: k }));
    opts.push({ label: '离开', value: 0 });
    const pick = await choiceBox('所持金 ¥' + G.money, opts);
    if (!pick) break;
    const it = ITEMS[pick];
    const qty = await choiceBox(it.name + ' — ' + it.desc, [
      { label: '买 1 个 (¥' + it.price + ')', value: 1 },
      { label: '买 5 个 (¥' + it.price * 5 + ')', value: 5 },
      { label: '买 10 个 (¥' + it.price * 10 + ')', value: 10 },
      { label: '取消', value: 0 },
    ]);
    if (!qty) continue;
    const cost = it.price * qty;
    if (cost > G.money) { await dialog(['抱歉，你的钱不够呢。'], { name: n.name }); continue; }
    G.money -= cost;
    Sound.play('money');
    addItem(pick, qty);
    await dialog([it.name + ' ×' + qty + '，谢谢惠顾！'], { name: n.name });
    saveGame();
  }
  await dialog(['欢迎下次再来！'], { name: n.name });
}

async function awardBadge(n) {
  G.badges = Math.max(G.badges, 1);
  Sound.play('badge');
  addItem('ultraball', 3);
  await dialog(['你获得了「岩之徽章」！', '（还得到了高级球 ×3）', '徽章的力量让你可以前往雷鸣洞窟了。']);
  // 守卫让路
  W.npcs.forEach((x) => { if (x.gateOpen) { x.x = x.gateOpen.x; x.y = x.gateOpen.y; } });
  saveGame();
}

async function legendEncounter(n) {
  await dialog(n.text);
  const foe = makeMon(20, 30);
  Sound.playMusic('battle');
  const res = await Battle.start({ wild: foe, bg: 'bg-water' });
  Sound.playMusic(mapTrack(G.map));
  if (res === 'caught' || res === 'win') {
    n.gone = true;
    G.flags['legend_done'] = 1;
    saveGame();
    if (res === 'caught') await dialog(['传说中的天雷龙成为了你的伙伴！']);
    else await dialog(['天雷龙化作雷光消失在湖面上…', '（也许某天还会再见）']);
    await endingSequence();
  } else if (res === 'lose') {
    await blackout();
  } else {
    await dialog(['天雷龙静静地注视着你…']);
  }
}

async function endingSequence() {
  const d = dexCount();
  await dialog([
    '—— 你的冒险告一段落 ——',
    '徽章：' + G.badges + ' 枚　图鉴：' + d.caught + '/' + d.total,
    '游戏时间：' + fmtTime(G.playtime),
    '世界还很大，继续去旅行吧！',
  ]);
  saveGame();
}

async function blackout() {
  W.busy = true;
  await fade(true);
  const lost = Math.floor(G.money * 0.1);
  G.money -= lost;
  healParty();
  const lc = G.flags.lastCenter;
  if (lc && MAPS[lc.back]) enterMap(lc.back, lc.x, lc.y, 0);
  else enterMap('town', 4, 5, 0);
  await fade(false);
  W.busy = false;
  await dialog(['你眼前一黑…', '回过神来时，已经回到了怪兽中心。', lost > 0 ? '（慌乱中掉了 ¥' + lost + '）' : '（还好没有损失什么）']);
  saveGame();
  updateHUD();
}

function battleBg() {
  const m = MAPS[G.map];
  if (m.cavern) return 'bg-cave';
  if (m.indoor) return 'bg-indoor';
  if (G.map === 'lake') return 'bg-water';
  if (G.map === 'forest') return 'bg-forest';
  return 'bg-grass';
}

async function startWildBattle(foe) {
  W.busy = true;
  const el = document.getElementById('encFx');
  Sound.play('encounter');
  el.classList.add('on');
  await sleep(520);
  el.classList.remove('on');
  Sound.playMusic('battle');
  const res = await Battle.start({ wild: foe, bg: battleBg() });
  Sound.playMusic(mapTrack(G.map));
  if (res === 'lose') await blackout();
  W.busy = false;
  updateHUD();
  saveGame();
}

/* ============================================================
 * HUD / 菜单
 * ============================================================ */
function fmtTime(ms) {
  const s = Math.floor((ms || 0) / 1000);
  return Math.floor(s / 3600) + ' 小时 ' + (Math.floor(s / 60) % 60) + ' 分';
}
function updateHUD() {
  const lead = G.party[0];
  document.getElementById('hudMoney').textContent = '¥' + G.money;
  document.getElementById('hudBadge').textContent = '◆'.repeat(G.badges) + '◇'.repeat(1 - G.badges);
  const hb = document.getElementById('hudTeam');
  hb.innerHTML = '';
  G.party.forEach((m) => {
    const d = document.createElement('div');
    const ratio = m.hp / maxHP(m);
    d.className = 'tdot' + (isFainted(m) ? ' dead' : '');
    d.style.background = TYPES[SPECIES[m.sid].types[0]].color;
    d.style.opacity = isFainted(m) ? 0.3 : 0.5 + ratio * 0.5;
    hb.appendChild(d);
  });
}

function monCanvasEl(mon, scale) {
  const src = SPR.monCanvas('m' + mon.sid, SPECIES[mon.sid].art, scale || 2);
  const c = document.createElement('canvas');
  c.width = src.width; c.height = src.height;
  c.className = 'mcan';
  c.getContext('2d').drawImage(src, 0, 0);
  return c;
}

const Menu = {
  el: null,
  open(view) {
    this.el = document.getElementById('menu');
    this.el.classList.remove('hidden');
    W.busy = true;
    this.show(view || 'main');
  },
  close() {
    this.el.classList.add('hidden');
    W.busy = false;
    saveGame();
    updateHUD();
  },
  show(view, arg) {
    const el = this.el;
    el.innerHTML = '';
    const head = document.createElement('div');
    head.className = 'mhead';
    const titles = { main: '菜单', party: '我的伙伴', bag: '背包', dex: '怪兽图鉴', card: '训练家卡片', mon: '详细数据', chart: '属性相克表' };
    head.innerHTML = '<span>' + (titles[view] || '') + '</span>';
    const close = document.createElement('button');
    close.className = 'mclose'; close.textContent = view === 'main' ? '✕' : '返回';
    close.onclick = () => (view === 'main' ? Menu.close() : Menu.show(view === 'mon' ? 'party' : 'main'));
    head.appendChild(close);
    el.appendChild(head);
    const body = document.createElement('div');
    body.className = 'mbody';
    el.appendChild(body);
    this['v_' + view](body, arg);
  },

  v_main(b) {
    const items = [
      ['伙伴', '查看队伍状态', 'party'],
      ['背包', '使用与查看道具', 'bag'],
      ['图鉴', '记录见过的怪兽', 'dex'],
      ['属性相克', '查看属性克制关系', 'chart'],
      ['训练家卡片', '你的冒险记录', 'card'],
    ];
    items.forEach(([t, s, v]) => {
      const d = document.createElement('button');
      d.className = 'mrow';
      d.innerHTML = '<b>' + t + '</b><small>' + s + '</small>';
      d.onclick = () => Menu.show(v);
      b.appendChild(d);
    });
    const mkToggle = (label, desc, getter, setter) => {
      const d = document.createElement('button');
      const paint = () => { d.innerHTML = '<b>' + label + '：' + (getter() ? '开' : '关') + '</b><small>' + desc + '</small>'; };
      d.className = 'mrow';
      d.onclick = () => { Sound.resume(); setter(!getter()); paint(); Sound.play('select'); if (getter && label === '音乐' && getter()) Sound.playMusic(mapTrack(G.map)); };
      paint();
      b.appendChild(d);
    };
    mkToggle('音乐', '背景音乐开关', () => Sound.musicOn, (v) => Sound.setMusic(v));
    mkToggle('音效', '战斗与操作音效', () => Sound.sfxOn, (v) => Sound.setSfx(v));

    const save = document.createElement('button');
    save.className = 'mrow save';
    save.innerHTML = '<b>保存游戏</b><small>把进度记录到本机</small>';
    save.onclick = () => {
      Sound.play('heal');
      saveGame();
      save.innerHTML = '<b>已保存 ✓</b><small>' + new Date().toLocaleTimeString() + '</small>';
    };
    b.appendChild(save);
  },

  v_party(b) {
    G.party.forEach((m, i) => {
      const row = document.createElement('button');
      row.className = 'prow' + (isFainted(m) ? ' dead' : '');
      const ratio = clamp(m.hp / maxHP(m), 0, 1);
      row.appendChild(monCanvasEl(m, 2));
      const info = document.createElement('div');
      info.className = 'pinfo';
      info.innerHTML =
        '<div class="pn">' + monName(m) + ' <span class="lv">Lv' + m.lv + '</span>' +
        (m.status ? '<span class="stg s-' + m.status + '">' + { par: '麻痹', psn: '中毒', brn: '灼伤', slp: '睡眠' }[m.status] + '</span>' : '') + '</div>' +
        '<div class="types">' + SPECIES[m.sid].types.map((t) => '<span class="tg" style="background:' + TYPES[t].color + '">' + TYPES[t].name + '</span>').join('') + '</div>' +
        '<div class="hpwrap"><div class="hpbar"><i class="' + (ratio > 0.5 ? 'ok' : ratio > 0.2 ? 'warn' : 'bad') + '" style="width:' + ratio * 100 + '%"></i></div></div>' +
        '<div class="sub">HP ' + Math.max(0, m.hp) + '/' + maxHP(m) + '　EXP ' + Math.round(expProgress(m) * 100) + '%</div>';
      row.appendChild(info);
      row.onclick = () => Menu.show('mon', i);
      b.appendChild(row);
    });
    if (G.box.length) {
      const t = document.createElement('div');
      t.className = 'boxhead';
      t.textContent = '保管箱（' + G.box.length + '）— 点击与队伍交换';
      b.appendChild(t);
      G.box.forEach((m, i) => {
        const row = document.createElement('button');
        row.className = 'prow small';
        row.appendChild(monCanvasEl(m, 1));
        const info = document.createElement('div');
        info.className = 'pinfo';
        info.innerHTML = '<div class="pn">' + monName(m) + ' <span class="lv">Lv' + m.lv + '</span></div>';
        row.appendChild(info);
        row.onclick = async () => {
          if (G.party.length < 6) { G.party.push(G.box.splice(i, 1)[0]); Menu.show('party'); return; }
          const pick = await choiceBox('要和谁交换？', G.party.map((p, j) => ({ label: monName(p) + ' Lv' + p.lv, value: j })).concat([{ label: '取消', value: -1 }]));
          if (pick < 0) return;
          const tmp = G.party[pick];
          G.party[pick] = G.box[i]; G.box[i] = tmp;
          Menu.show('party');
        };
        b.appendChild(row);
      });
    }
  },

  v_mon(b, idx) {
    const m = G.party[idx];
    const wrap = document.createElement('div');
    wrap.className = 'mondetail';
    const big = monCanvasEl(m, 3);
    wrap.appendChild(big);
    const info = document.createElement('div');
    const names = ['HP', '攻击', '防御', '速度'];
    info.className = 'dinfo';
    info.innerHTML =
      '<div class="dn">' + monName(m) + ' <span class="lv">Lv' + m.lv + '</span></div>' +
      '<div class="types">' + SPECIES[m.sid].types.map((t) => '<span class="tg" style="background:' + TYPES[t].color + '">' + TYPES[t].name + '</span>').join('') + '</div>' +
      '<div class="stats">' +
      [maxHP(m), atkOf(m), defOf(m), spdOf(m)].map((v, i) =>
        '<div class="st"><span>' + names[i] + '</span><b>' + v + '</b><div class="sbar"><i style="width:' + Math.min(100, v / 2.2) + '%"></i></div></div>').join('') +
      '</div>' +
      '<div class="dex">' + SPECIES[m.sid].dex + '</div>';
    wrap.appendChild(info);
    b.appendChild(wrap);

    const mv = document.createElement('div');
    mv.className = 'movelist';
    m.moves.forEach((s) => {
      const move = MOVES[s.key];
      const d = document.createElement('div');
      d.className = 'mvrow';
      d.innerHTML = '<span class="tg" style="background:' + TYPES[move.type].color + '">' + TYPES[move.type].name + '</span>' +
        '<b>' + move.name + '</b><span class="pw">威力 ' + (move.power || '—') + '</span><span class="pp">PP ' + s.pp + '/' + s.max + '</span>';
      mv.appendChild(d);
    });
    b.appendChild(mv);

    const acts = document.createElement('div');
    acts.className = 'acts';
    const rename = document.createElement('button');
    rename.className = 'abtn'; rename.textContent = '起昵称';
    rename.onclick = () => {
      const v = prompt('给 ' + monName(m) + ' 起个昵称（留空恢复原名）', m.nick || '');
      if (v !== null) { m.nick = v.trim() ? v.trim().slice(0, 6) : null; Menu.show('mon', idx); }
    };
    acts.appendChild(rename);
    if (idx > 0) {
      const up = document.createElement('button');
      up.className = 'abtn'; up.textContent = '设为首发';
      up.onclick = () => { const [x] = G.party.splice(idx, 1); G.party.unshift(x); Menu.show('party'); };
      acts.appendChild(up);
    }
    b.appendChild(acts);
  },

  v_bag(b) {
    const list = bagList();
    if (!list.length) { b.innerHTML = '<div class="empty">背包空空如也…</div>'; return; }
    list.forEach((it) => {
      const row = document.createElement('button');
      row.className = 'irow';
      row.innerHTML = '<b>' + it.item.name + '</b><span class="cnt">×' + it.n + '</span><small>' + it.item.desc + '</small>';
      row.onclick = async () => {
        if (it.item.kind === 'ball') { await dialog(['精灵球要在与野生怪兽战斗时使用。']); return; }
        const pick = await choiceBox('对谁使用 ' + it.item.name + '？',
          G.party.map((m, j) => ({ label: monName(m) + ' Lv' + m.lv + '　HP ' + Math.max(0, m.hp) + '/' + maxHP(m), value: j })).concat([{ label: '取消', value: -1 }]));
        if (pick < 0) return;
        const m = G.party[pick];
        if (it.item.kind === 'heal') {
          if (isFainted(m)) { await dialog(['对濒死的怪兽没有效果。']); return; }
          if (m.hp >= maxHP(m)) { await dialog(['HP 已经全满了。']); return; }
          m.hp = Math.min(maxHP(m), m.hp + it.item.amount);
        } else if (it.item.kind === 'cure') {
          if (!m.status) { await dialog(['没有需要治疗的状态。']); return; }
          m.status = null; m.slp = 0;
        } else if (it.item.kind === 'revive') {
          if (!isFainted(m)) { await dialog(['只能对濒死的怪兽使用。']); return; }
          m.hp = Math.floor(maxHP(m) / 2); m.status = null;
        }
        useItemCount(it.key);
        await dialog(['对 ' + monName(m) + ' 使用了 ' + it.item.name + '。']);
        Menu.show('bag');
      };
      b.appendChild(row);
    });
  },

  v_dex(b) {
    const d = dexCount();
    const head = document.createElement('div');
    head.className = 'dexhead';
    head.textContent = '见过 ' + d.seen + ' 种　收服 ' + d.caught + ' 种　共 ' + d.total + ' 种';
    b.appendChild(head);
    const grid = document.createElement('div');
    grid.className = 'dexgrid';
    Object.keys(SPECIES).forEach((sid) => {
      const seen = G.dex.seen[sid], caught = G.dex.caught[sid];
      const cell = document.createElement('div');
      cell.className = 'dcell' + (caught ? ' caught' : seen ? ' seen' : ' unknown');
      if (seen) {
        const c = monCanvasEl({ sid: +sid }, 2);
        if (!caught) c.classList.add('silhouette');
        cell.appendChild(c);
        cell.insertAdjacentHTML('beforeend', '<span>' + (caught ? SPECIES[sid].name : '？？？') + '</span>');
      } else {
        cell.innerHTML = '<div class="qmark">?</div><span>No.' + sid + '</span>';
      }
      if (caught) cell.onclick = () => dialog([SPECIES[sid].name + '（' + SPECIES[sid].types.map((t) => TYPES[t].name).join('/') + '）', SPECIES[sid].dex]);
      grid.appendChild(cell);
    });
    b.appendChild(grid);
  },

  v_chart(b) {
    const keys = Object.keys(TYPES);
    const wrap = document.createElement('div');
    wrap.className = 'chartwrap';
    let html = '<div class="chartnote">纵向＝攻击方，横向＝防守方</div><table class="tchart"><tr><th></th>';
    keys.forEach((k) => { html += '<th style="color:' + TYPES[k].color + '">' + TYPES[k].name + '</th>'; });
    html += '</tr>';
    keys.forEach((a) => {
      html += '<tr><th style="color:' + TYPES[a].color + '">' + TYPES[a].name + '</th>';
      keys.forEach((d) => {
        const e = typeEff(a, d);
        const cls = e === 0 ? 'zero' : e > 1 ? 'good' : e < 1 ? 'bad' : '';
        html += '<td class="' + cls + '">' + (e === 1 ? '·' : e === 0 ? '0' : e === 2 ? '2×' : '½') + '</td>';
      });
      html += '</tr>';
    });
    html += '</table>';
    wrap.innerHTML = html;
    b.appendChild(wrap);
  },

  v_card(b) {
    const d = dexCount();
    const card = document.createElement('div');
    card.className = 'tcard';
    card.innerHTML =
      '<div class="tc-top"><div class="tc-name">' + G.name + '</div><div class="tc-id">ID ' + String(G.started % 100000).padStart(5, '0') + '</div></div>' +
      '<div class="tc-rows">' +
      '<div><span>所持金</span><b>¥' + G.money + '</b></div>' +
      '<div><span>徽章</span><b>' + G.badges + ' / 1</b></div>' +
      '<div><span>图鉴</span><b>' + d.caught + ' / ' + d.total + '</b></div>' +
      '<div><span>步数</span><b>' + G.steps + '</b></div>' +
      '<div><span>游戏时间</span><b>' + fmtTime(G.playtime) + '</b></div>' +
      '</div>';
    b.appendChild(card);
    const del = document.createElement('button');
    del.className = 'mrow danger';
    del.innerHTML = '<b>删除存档</b><small>清空进度并回到标题画面</small>';
    del.onclick = async () => {
      const yes = await choiceBox('真的要删除存档吗？', [{ label: '取消', value: 0 }, { label: '确认删除', value: 1 }]);
      if (yes) { deleteSave(); location.reload(); }
    };
    b.appendChild(del);
  },
};

/* ============================================================
 * 输入
 * ============================================================ */
function bindInput() {
  const keyMap = {
    ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
    w: 'up', s: 'down', a: 'left', d: 'right', W: 'up', S: 'down', A: 'left', D: 'right',
  };
  document.addEventListener('keydown', (e) => {
    if (keyMap[e.key]) { W.input[keyMap[e.key]] = 1; e.preventDefault(); }
    if (['z', 'Z', 'Enter', ' '].includes(e.key)) { e.preventDefault(); if (!document.getElementById('dialog').classList.contains('hidden')) return; interact(); }
    if (['x', 'X', 'Escape'].includes(e.key)) { e.preventDefault(); toggleMenu(); }
  });
  document.addEventListener('keyup', (e) => { if (keyMap[e.key]) W.input[keyMap[e.key]] = 0; });

  // 虚拟摇杆 / 方向键
  const pad = document.getElementById('dpad');
  const setDir = (dir) => {
    W.input.up = W.input.down = W.input.left = W.input.right = 0;
    if (dir) W.input[dir] = 1;
    pad.dataset.dir = dir || '';
  };
  const fromPoint = (e) => {
    const r = pad.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    const dx = t.clientX - (r.left + r.width / 2);
    const dy = t.clientY - (r.top + r.height / 2);
    if (Math.abs(dx) < r.width * 0.14 && Math.abs(dy) < r.height * 0.14) return null;
    if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? 'right' : 'left';
    return dy > 0 ? 'down' : 'up';
  };
  let padActive = false;
  const start = (e) => { padActive = true; setDir(fromPoint(e)); e.preventDefault(); };
  const move = (e) => { if (padActive) { setDir(fromPoint(e)); e.preventDefault(); } };
  const end = (e) => { padActive = false; setDir(null); if (e.cancelable) e.preventDefault(); };
  pad.addEventListener('touchstart', start, { passive: false });
  pad.addEventListener('touchmove', move, { passive: false });
  pad.addEventListener('touchend', end);
  pad.addEventListener('touchcancel', end);
  pad.addEventListener('mousedown', start);
  window.addEventListener('mousemove', (e) => { if (padActive) move(e); });
  window.addEventListener('mouseup', end);

  const btnA = document.getElementById('btnA');
  const tapA = (e) => { e.preventDefault(); const dlg = document.getElementById('dialog'); if (!dlg.classList.contains('hidden')) dlg.click(); else interact(); };
  btnA.addEventListener('touchstart', tapA, { passive: false });
  btnA.addEventListener('mousedown', tapA);
  const btnB = document.getElementById('btnB');
  const tapB = (e) => { e.preventDefault(); toggleMenu(); };
  btnB.addEventListener('touchstart', tapB, { passive: false });
  btnB.addEventListener('mousedown', tapB);
  document.getElementById('hudMenu').onclick = () => toggleMenu();
}

function toggleMenu() {
  const m = document.getElementById('menu');
  if (!document.getElementById('battle').classList.contains('hidden')) return;
  if (!document.getElementById('dialog').classList.contains('hidden')) return;
  if (!document.getElementById('choice').classList.contains('hidden')) return;
  if (m.classList.contains('hidden')) Menu.open('main');
  else Menu.close();
}

/* ============================================================
 * 主循环 & 启动
 * ============================================================ */
function loop(t) {
  const dt = Math.min(0.05, (t - W.lastTime) / 1000 || 0);
  W.lastTime = t;
  W.animT += dt;
  if (G) {
    updateMovement(dt);
    updateNPCs(dt);
    render(dt);
  }
  requestAnimationFrame(loop);
}

function updateNPCs(dt) {
  W.npcs.forEach((n) => {
    if (!n.wander || n.gone || W.busy) return;
    n.wt -= dt;
    if (n.wt > 0) return;
    n.wt = 2 + Math.random() * 3;
    const dir = rnd(4);
    const [dx, dy] = DIRS[dir];
    n.dir = dir;
    const nx = n.x + dx, ny = n.y + dy;
    if (WALKABLE.includes(tileAt(MAPS[G.map], nx, ny)) && !npcAt(nx, ny) && !(W.player.x === nx && W.player.y === ny)) {
      n.x = nx; n.y = ny; n.frame = (n.frame + 1) % 3;
    }
  });
}

function startGameplay() {
  document.getElementById('title').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
  resizeCanvas();
  enterMap(G.map, G.x, G.y, G.dir);
  updateHUD();
  W.busy = false;
  G._t = Date.now();
}

async function chooseStarter() {
  const box = document.getElementById('starter');
  box.classList.remove('hidden');
  const list = box.querySelector('.slist');
  list.innerHTML = '';
  const info = box.querySelector('.sinfo');
  const ids = [1, 4, 7];
  let sel = null;
  ids.forEach((sid) => {
    const s = SPECIES[sid];
    const card = document.createElement('button');
    card.className = 'scard';
    card.insertAdjacentHTML('beforeend', '<div class="sn">' + s.name + '</div><div class="tg" style="background:' + TYPES[s.types[0]].color + '">' + TYPES[s.types[0]].name + '系</div>');
    card.insertBefore(monCanvasEl({ sid: sid }, 2), card.firstChild);
    card.onclick = () => {
      sel = sid;
      [...list.children].forEach((c) => c.classList.remove('on'));
      card.classList.add('on');
      info.innerHTML = '<b>' + s.name + '</b><p>' + s.dex + '</p>';
      box.querySelector('.sgo').disabled = false;
    };
    list.appendChild(card);
  });
  return new Promise((res) => {
    const go = box.querySelector('.sgo');
    go.disabled = true;
    go.onclick = () => { if (!sel) return; box.classList.add('hidden'); res(sel); };
  });
}

function setupRival() {
  const counter = { 1: 4, 4: 7, 7: 1 }[G.starter];
  const rival = MAPS.town.npcs.find((n) => n.rival);
  rival.trainer.team = [[18, 5], [counter, 7]];
}

async function boot() {
  W.canvas = document.getElementById('world');
  W.ctx = W.canvas.getContext('2d');
  W.scene = document.createElement('canvas');
  W.sctx = W.scene.getContext('2d');
  bindInput();
  window.addEventListener('resize', () => { if (G) resizeCanvas(); });
  window.addEventListener('orientationchange', () => setTimeout(() => { if (G) resizeCanvas(); }, 300));
  requestAnimationFrame(loop);

  const title = document.getElementById('title');
  const btnNew = document.getElementById('btnNew');
  const btnCont = document.getElementById('btnCont');
  btnCont.style.display = hasSave() ? '' : 'none';

  btnCont.onclick = () => {
    Sound.resume(); Sound.play('select');
    if (!loadGame()) return;
    setupRival();
    startGameplay();
  };
  btnNew.onclick = async () => {
    Sound.resume(); Sound.play('select');
    if (hasSave()) {
      const yes = await choiceBox('已有存档，开始新游戏会覆盖它。', [{ label: '取消', value: 0 }, { label: '确认新游戏', value: 1 }]);
      if (!yes) return;
    }
    document.getElementById('titleMenu').classList.add('hidden');
    const nameInput = document.getElementById('nameBox');
    nameInput.classList.remove('hidden');
    document.getElementById('nameGo').onclick = async () => {
      const nm = (document.getElementById('nameInput').value || '').trim().slice(0, 6) || '小智';
      nameInput.classList.add('hidden');
      const sid = await chooseStarter();
      newGame(sid, nm);
      setupRival();
      startGameplay();
      await dialog([
        '橡树博士：' + nm + '，欢迎来到怪兽的世界！',
        '这只 ' + SPECIES[sid].name + ' 就交给你了。',
        '去外面的世界闯荡，成为最棒的训练家吧！',
        '（提示：北边的一号道路通往森林与道馆）',
      ]);
      saveGame();
    };
  };

  // 自动保存
  setInterval(() => { if (G && !W.busy) saveGame(); }, 30000);
  window.addEventListener('pagehide', () => { if (G) saveGame(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden && G) saveGame(); });
}

window.addEventListener('load', boot);
