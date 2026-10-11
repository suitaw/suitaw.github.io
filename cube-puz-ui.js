/* cube-puz-ui.js —— 金字塔 / 四阶 / 五阶 的页面（跟原生 App 的 PuzView.kt / PuzPages.kt / PuzCam.kt 对应）
 * 依赖：cube-puz.js（模型、求解、课、花色、拍照计划），以及 cube-solver.html 主脚本里的
 * prCfg / buzz / fmtTT / aoN / setOpen / sheetBind / goTab / kSolve / faceletToCubie / solve。
 * 3D 用 2D 画布画多边形（按深度排序、照 App 同一套灯光算明暗）：几何简单，2D 足够，截图容器里也验得了
 */
(function () {
'use strict';
const { Mx, dot, norm, Pyra, Big, Red5, lessons, patterns, CamPlan, CN } = window.PUZ;
const q = id => document.getElementById(id);
const CAM_D = 9.4, BODY = 0x1a1d24, BLANK = 0x3a3f48;
const LK = norm([-0.3865, 0.7537, 0.5314]), LF = norm([0.7126, -0.4023, 0.5747]);
const PRACTICE = 0, TUTORIAL = 1, INPUT = 2, VIEW = 3;
const CAM0 = Mx.mul(Mx.rot(0, 0.42), Mx.rot(1, -0.62)), CAM0P = Mx.mul(Mx.rot(0, 0.32), Mx.rot(1, -0.42));
const PLAY = [2.6, 1.6, 1.0, 0.55], PLAY_CN = ['很慢', '慢', '正常', '快'];
const SIN_P = 0.9, SIN_A = Math.asin(SIN_P), SIN_K = 1 / Math.sqrt(1 - SIN_P * SIN_P), LOCK = 0.26, FLING = 0.55, FLING_D = 26;
const cfg = k => { try { return prCfg(k); } catch (e) { return { spd: 1, snap: 45, fling: 1, arrow: 1, timer: 1 }[k]; } };
const vib = ms => { try { buzz(ms); } catch (e) {} };
const ease = t => t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
const hex = (c, k = 1) => `rgb(${Math.min(255, ((c >> 16) & 255) * k) | 0},${Math.min(255, ((c >> 8) & 255) * k) | 0},${Math.min(255, (c & 255) * k) | 0})`;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function runAnim(dur, onFrame, onEnd) {
  if (dur <= 0) { onFrame(1); onEnd(); return () => {}; }
  let stop = false; const t0 = performance.now();
  const step = now => { if (stop) return; const t = Math.min(1, (now - t0) / dur); onFrame(t); if (t < 1) requestAnimationFrame(step); else onEnd(); };
  requestAnimationFrame(step); return () => { stop = true; };
}
// 两个姿态之间的最短旋转
function slerpR(r1, r2) {
  const d = Mx.mul(r2, Mx.tr(r1)), ang = Math.acos(Math.max(-1, Math.min(1, (d[0] + d[4] + d[8] - 1) / 2))), s = Math.sin(ang);
  if (!(ang > 1e-4) || Math.abs(s) < 1e-6) return () => r2;
  const ax = [(d[7] - d[5]) / (2 * s), (d[2] - d[6]) / (2 * s), (d[3] - d[1]) / (2 * s)];
  return t => t >= 1 ? r2 : Mx.mul(Mx.axisRot(ax, ang * t), r1);
}

/* ======================= 引擎：一块魔方（练习 / 教程 / 填色 / 看） ======================= */
class PView {
  constructor(puz, mode) {
    Object.assign(this, { puz, mode, W: 1, H: 1, st: puz.solved(), polys: [], busy: false, hl: null, focus: null,
      msg: '', win: false, steps: 0, t0: 0, elapsed: 0, manT0: 0, manMs: -1, countable: false, assisted: false,
      hist: [], scram: '', plan: null, playTo: -1, playSpd: 2, spdOv: null, solving: false, arrow: null, cur: 0,
      onChange: () => {}, homeStop: () => {}, cv: null });
    this.cam0 = puz instanceof Pyra ? CAM0P : CAM0; this.R = this.cam0;
  }
  get spd() { return this.spdOv != null ? this.spdOv : cfg('spd'); }
  get running() { return this.t0 !== 0 && this.countable; }
  say(t, w) { this.msg = t; this.win = !!w; this.onChange(); }
  attach(cv) { this.cv = cv; this.bindGestures(cv); this.resize(); }
  resize() { if (!this.cv) return; const r = this.cv.getBoundingClientRect(), dpr = Math.min(3, devicePixelRatio || 1);
    this.W = r.width; this.H = r.height; this.cv.width = Math.round(r.width * dpr); this.cv.height = Math.round(r.height * dpr); this.render(); }
  /* ---- 画 ---- */
  render() { this.draw(null); }
  draw(a) {
    const W = this.W, H = this.H; if (W < 2 || !this.cv) return;
    const f = Math.min(W, H) * 1.5, am = a ? Mx.axisRot(a.axis, a.ang) : null, puz = this.puz, R = this.R;
    const view = (p, mv) => Mx.v(R, mv && am ? Mx.v(am, p) : p);
    const scr = v => [W / 2 + v[0] * f / (CAM_D - v[2]), H / 2 - v[1] * f / (CAM_D - v[2])];
    const shade = n => 0.70 + 0.34 * Math.max(dot(n, LK), 0) + 0.12 * Math.max(dot(n, LF), 0);
    const draws = [], ps = [], pyra = puz instanceof Pyra, inset = pyra ? 0.80 : 0.86, cut = pyra ? 0.16 : 0.2;
    // 转动中：魔方被切成「下块 / 转的那层 / 上块」(g=-1/0/1)。整块先按块排远近再块内排序 ——
    // 切面是一整张大平面，跟小贴纸混在一起按中心点排一定排错（黑切面盖住贴纸，2026-10-11 截图）
    const ax = a ? norm(a.axis) : null, cen = pts => [0, 1, 2].map(k => pts.reduce((s, v) => s + v[k], 0) / pts.length);
    let lo = 0, hi = 0, mid = 0;
    if (a) { const ds = []; for (let i = 0; i < puz.S; i++) if (a.sel[i]) ds.push(dot(cen(puz.poly[i]), ax));
      lo = Math.min(...ds); hi = Math.max(...ds); mid = (lo + hi) / 2;
      const cd = a.caps.map(cp => dot(cen(cp), ax)); if (cd.length) { lo = Math.min(...cd); hi = Math.max(...cd); } }
    const grp = i => !a ? 0 : a.sel[i] ? 0 : dot(cen(puz.poly[i]), ax) < mid ? -1 : 1;
    // 相机在转轴方向上的位置 → 三块从远到近的先后
    const camS = a ? CAM_D * Mx.v(R, ax)[2] : 0, rank = gp => !a ? 0 : camS > hi ? gp : camS < lo ? -gp : (gp === 0 ? 2 : 0);
    for (let i = 0; i < puz.S; i++) {
      const mv = !!(a && a.sel[i]);
      const cell = puz.poly[i].map(p => view(p, mv)), nr = view(puz.nrm[i], mv);
      const c = [0, 1, 2].map(k => cell.reduce((s, v) => s + v[k], 0) / cell.length);
      if (nr[0] * c[0] + nr[1] * c[1] + nr[2] * (c[2] - CAM_D) >= 0) continue;     // 背面剔除
      const ins = cell.map(v => [0, 1, 2].map(k => c[k] + (v[k] - c[k]) * inset));
      const stk = []; for (let j = 0; j < ins.length; j++) { const p0 = ins[(j + ins.length - 1) % ins.length], p1 = ins[j], p2 = ins[(j + 1) % ins.length];
        stk.push([0, 1, 2].map(k => p1[k] + (p0[k] - p1[k]) * cut), [0, 1, 2].map(k => p1[k] + (p2[k] - p1[k]) * cut)); }
      const hot = !!(this.hl && this.hl[i]), dimmed = this.focus && !this.focus[i], sh = shade(nr);
      const col = this.st[i] < 0 ? BLANK : puz.palette[this.st[i]];
      const base = cell.map(scr), face = ins.map(scr);
      draws.push({ r: rank(grp(i)), z: c[2], body: base, bodyCol: hex(BODY, sh * (dimmed ? 0.6 : 1)), stk: stk.map(scr), stkCol: hex(col, sh * (dimmed ? 0.42 : hot ? 1.3 : 1)), hot, face });
      ps.push({ z: c[2], base, face, i, hot });
    }
    // 转动中的那一层：切开的地方补黑面
    if (a) for (const cp of a.caps) for (const mv of [false, true]) {
      const below = dot(cen(cp), ax) < mid, pts = cp.map(p => view(p, mv)), c = cen(pts);
      // 切面朝外的方向：转的那层朝静止块那边，静止块朝转的那层；背对相机的不画
      const n = view(ax.map(v => v * ((below === mv) ? -1 : 1)), mv);
      if (n[0] * c[0] + n[1] * c[1] + n[2] * (c[2] - CAM_D) >= 0) continue;
      draws.push({ r: rank(mv ? 0 : below ? -1 : 1), z: c[2] - 0.01, body: pts.map(scr), bodyCol: hex(BODY, 0.8) });
    }
    draws.sort((x, y) => x.r - y.r || x.z - y.z); ps.sort((x, y) => x.z - y.z);
    this.polys = ps; this.arrow = this.planArrow(ps, f);
    const g = this.cv.getContext('2d'), dpr = this.cv.width / W;
    g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
    // 底色渐晕 + 接触阴影（跟三阶同一套）
    const bg = g.createRadialGradient(W / 2, H * 0.38, 8, W / 2, H * 0.38, Math.max(W, H) * 0.62);
    bg.addColorStop(0, '#20252e'); bg.addColorStop(1, '#0a0b0e'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
    const sc = f / CAM_D; g.save(); g.translate(W / 2, H / 2 + sc * 1.72); g.scale(1, 0.30);
    const sh = g.createRadialGradient(0, 0, sc * 0.12, 0, 0, sc * 1.62); sh.addColorStop(0, 'rgba(0,0,0,.78)'); sh.addColorStop(0.37, 'rgba(0,0,0,.34)'); sh.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = sh; g.beginPath(); g.arc(0, 0, sc * 1.62, 0, 7); g.fill(); g.restore();
    const path = pts => { g.beginPath(); pts.forEach(([x, y], k) => k ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); };
    g.lineJoin = 'round';
    for (const d of draws) {
      path(d.body); g.fillStyle = d.bodyCol; g.fill(); g.strokeStyle = d.bodyCol; g.lineWidth = 0.8; g.stroke();
      if (d.stk) { path(d.stk); g.fillStyle = d.stkCol; g.fill(); }
      if (d.hot) { path(d.face); g.strokeStyle = 'rgba(255,255,255,.95)'; g.lineWidth = 2.2; g.stroke(); }   // 跟着排序画，被挡住的就该被挡住
    }
    const ar = this.arrow;
    if (ar) {
      const ah = () => { g.beginPath(); g.moveTo(ar.x0, ar.y0); g.lineTo(ar.x1, ar.y1);
        g.moveTo(ar.x1 - ar.ux * ar.h - ar.uy * ar.h * .6, ar.y1 - ar.uy * ar.h + ar.ux * ar.h * .6); g.lineTo(ar.x1, ar.y1);
        g.lineTo(ar.x1 - ar.ux * ar.h + ar.uy * ar.h * .6, ar.y1 - ar.uy * ar.h - ar.ux * ar.h * .6); };
      g.lineCap = 'round'; ah(); g.strokeStyle = 'rgba(0,0,0,.6)'; g.lineWidth = 7; g.stroke(); ah(); g.strokeStyle = '#ffe14d'; g.lineWidth = 3.5; g.stroke();
    }
  }
  /* ---- 视角 ---- */
  orbit(dx, dy) {
    if (dx) {
      let up;
      if (this.puz instanceof Pyra) up = this.puz.AX[0];
      else { let k = 1; for (let j = 0; j < 3; j++) if (Math.abs(this.R[3 + j]) > Math.abs(this.R[3 + k]) + 0.15) k = j; up = [0, 0, 0]; up[k] = 1; }
      const s = Mx.v(this.R, up)[1] >= 0 ? 1 : -1;
      this.R = Mx.mul(this.R, Mx.axisRot(up, s * dx * 0.008));
    }
    if (dy) this.R = Mx.mul(Mx.axisRot([1, 0, 0], dy * 0.008), this.R);
  }
  roll(dA) { if (dA) this.R = Mx.mul(Mx.axisRot([0, 0, 1], -dA), this.R); }
  recenter() { if (this.busy) return; this.homeStop(); const lerp = slerpR(this.R, this.cam0);
    this.homeStop = runAnim(240, t => { this.R = lerp(1 - (1 - t) ** 3); this.render(); }, () => { this.R = this.cam0; this.render(); }); }
  /* ---- 整体翻 ---- */
  flip(dir) { if (this.busy) return; const [w, u] = this.puz.flipFor(dir, this.R); this.whole(w, u); }
  whole(w, units) {
    const t = this.puz.wholes[w]; this.busy = true; const total = -units * t.unit;
    runAnim(190 * this.spd, x => this.draw({ axis: t.axis, ang: total * ease(x), sel: t.sel, caps: [] }), () => {
      const lbl = this.puz.label(w, units);
      if (lbl) {
        this.st = this.puz.apply(this.st, lbl);
        this.hist = this.hist.map(h => this.puz.relabel(h, lbl));     // 记录、解法按新拿法改名
        if (this.plan) { const p = this.plan; this.plan = { moves: p.moves.map(m => this.puz.relabel(m, lbl)), states: p.states.map(s => this.puz.apply(s, lbl)), i: p.i, off: p.off }; }
      }
      this.busy = false; vib(8); this.render(); this.onChange();
    });
  }
  /* ---- 开局 ---- */
  load(s, scrambled) {
    Object.assign(this, { st: s.slice(), hist: [], steps: 0, t0: 0, elapsed: 0, scram: '', countable: !!scrambled, assisted: false,
      plan: null, playTo: -1, spdOv: null, focus: null, R: this.cam0 });
    this.homeStop(); this.say(''); this.render();
  }
  scramble() { if (this.busy) return; const sc = this.puz.scramble(); this.load(this.puz.applyAll(this.puz.solved(), sc), true); this.scram = sc.join(' '); this.say('打乱好了，开始转吧。第一步之后开始计时。'); }
  reset() { if (!this.busy) this.load(this.puz.solved(), false); }
  loadStep(start, alg, foc) {
    this.playTo = -1; this.spdOv = null;
    if (this.busy) { setTimeout(() => this.loadStep(start, alg, foc), 40); return; }
    Object.assign(this, { st: start.slice(), focus: foc, R: this.cam0, hist: [], steps: 0, t0: 0, elapsed: 0, countable: false });
    this.plan = alg.length ? this.planMake(alg, this.st) : null; this.say(''); this.render();
  }
  startClock() { if (this.mode === PRACTICE && !this.t0 && this.countable) this.t0 = Date.now(); }
  stopClock() { if (this.t0) { this.elapsed = Date.now() - this.t0; this.countable = false; } }
  /* ---- 转一层：rotSign 绕 axis 正方向为 +1 ---- */
  spin(base, rotSign, units, record, from = 0, done) {
    if (this.busy) return;
    const t = this.puz.turns[base]; this.busy = true;
    if (record) this.startClock();
    const total = rotSign * units * t.unit, spd = this.spd;
    const dur = spd === 0 ? 0 : Math.max(80, (units > 1 ? 260 : 170) * spd * Math.abs(total - from) / (total ? Math.abs(total) : t.unit));
    const caps = this.puz.caps(t);
    runAnim(dur, x => this.draw({ axis: t.axis, ang: from + (total - from) * ease(x), sel: t.sel, caps }), () => {
      const lbl = units > 0 ? this.puz.label(base, -rotSign * units) : null;
      if (lbl) { this.st = this.puz.apply(this.st, lbl); if (record) { this.hist.push(lbl); this.steps++; vib(10); } }
      this.busy = false;
      if (lbl) this.planSync();
      this.render();
      if (record && lbl && this.mode === PRACTICE && this.puz.isSolved(this.st)) {
        const rec = this.countable && this.t0 !== 0; this.stopClock();
        this.say(rec ? '复原了！' + PZ.record(this.puz, this.elapsed, this.steps, this.assisted) : '复原了！' + this.steps + ' 步', true);
      } else this.onChange();
      if (done) done();
    });
  }
  // 顺时针 k 格（可以是负的）：U' 当逆时针 1 格转，别绕远路
  spinCw(b, k0, record, done) { const m = this.puz.mod; let k = ((k0 % m) + m) % m; if (k * 2 > m) k -= m;
    if (k > 0) this.spin(b, -1, k, record, 0, done); else this.spin(b, 1, -k, record, 0, done); }
  turn(mv) { const [b, n] = this.puz.parse(mv); this.spinCw(b, n, true); }
  undo() { if (this.busy || !this.hist.length) return; const h = this.hist.pop(); this.steps = Math.max(0, this.steps - 1); this.say('');
    const [b, n] = this.puz.parse(h); this.spinCw(b, -n, false); }
  rewind(k) { if (this.busy) return; while (this.hist.length > k) this.st = this.puz.apply(this.st, this.puz.inverse(this.hist.pop()));
    this.steps = this.hist.length; this.planSync(); this.render(); this.say(k > 0 ? '已退回到第 ' + k + ' 步之后' : '已退回到起始状态'); }
  /* ---- 提示 / 解法 ---- */
  tip() {
    if (this.busy || this.solving) return;
    if (this.puz.isSolved(this.st)) { this.say('已经是复原状态了'); return; }
    this.assisted = true; const s0 = this.st; this.solving = true; this.say('正在想…' + PZ.firstNote(this.puz));
    PZ.solve(this.puz, s0).then(sol => { this.solving = false; if (this.st !== s0) return;
      this.say(!sol ? '这个魔方状态拼不出来' : !sol.length ? '就差一点了' : '下一步：' + sol[0] + '（' + this.puz.moveCn(sol[0]) + '）' + (this.puz instanceof Pyra ? '，最少还要 ' + sol.length + ' 步' : '')); });
  }
  planStart() {
    if (this.busy || this.solving) return;
    if (this.puz.isSolved(this.st)) { this.say('已经复原了，不用解'); return; }
    this.assisted = true; const s0 = this.st; this.solving = true; this.say('正在算…' + PZ.firstNote(this.puz));
    PZ.solve(this.puz, s0).then(sol => { this.solving = false;
      if (this.st !== s0) { this.say('魔方动过了，再点一次'); return; }
      if (!sol) { this.say('这个魔方状态拼不出来'); return; }
      this.plan = this.planMake(sol, this.st);
      this.say('解出来了，共 ' + sol.length + ' 步' + (this.puz instanceof Pyra ? '（最少步数）' : '') + '。照着下面转，转对了自动往下走。');
      this.render(); });
  }
  loadWithPlan(s, sol) { this.load(s, false); this.assisted = true; this.plan = this.planMake(sol, this.st);
    this.say('解出来了，共 ' + sol.length + ' 步' + (this.puz instanceof Pyra ? '（最少步数）' : '') + '。照着下面转，转对了自动往下走。'); this.render(); }
  planAlg(alg) { this.load(this.puz.solved(), false); this.plan = this.planMake(alg, this.st); this.say('从复原好的魔方开始，照着下面转 ' + alg.length + ' 步'); this.render(); }
  planMake(moves, from) { const states = [from]; let s = from; for (const m of moves) { s = this.puz.apply(s, m); states.push(s); } return { moves, states, i: 0, off: false }; }
  planClose() { this.playTo = -1; this.spdOv = null; this.plan = null; this.render(); this.onChange(); }
  planSync() {
    const p = this.plan; if (!p) { this.syncBack = false; return; }
    const S = p.states, i = p.i, eq = (a, b) => a.every((v, k) => v === b[k]);
    const a = this.syncBack ? i - 1 : i + 1, b = this.syncBack ? i + 1 : i - 1; this.syncBack = false;
    let best = -1;
    if (a >= 0 && a < S.length && eq(S[a], this.st)) best = a; else if (b >= 0 && b < S.length && eq(S[b], this.st)) best = b; else if (eq(S[i], this.st)) best = i;
    else { let bd = 1e9; S.forEach((s, k) => { const d = Math.abs(k - i); if (d < bd && eq(s, this.st)) { bd = d; best = k; } }); }
    if (best < 0) p.off = true; else { p.i = best; p.off = false; }
    if (p.i >= p.moves.length && !this.win && this.msg.startsWith('解出来了')) this.msg = '';
  }
  planNow() { const p = this.plan; return !p || p.off || p.i >= p.moves.length ? null : p.moves[p.i]; }
  planArrow(ps, f) {
    const mv = this.planNow(); if (!mv || cfg('arrow') < 0.5) return null;
    const [b, n] = this.puz.parse(mv), t = this.puz.turns[b]; if (!t) return null;
    const sgn = n === this.puz.mod - 1 ? 1 : -1;
    const area = q2 => { let s = 0; for (let j = 0; j < q2.length; j++) { const [x0, y0] = q2[j], [x1, y1] = q2[(j + 1) % q2.length]; s += x0 * y1 - x1 * y0; } return Math.abs(s) / 2; };
    let best = null, ba = 0;
    for (const p of ps) { if (!t.sel[p.i]) continue; const c = this.puz.center[p.i], d = dot(c, t.axis), off = Math.sqrt(Math.max(0, dot(c, c) - d * d));
      if (off < 0.3) continue; const s = area(p.face) * off; if (s > ba) { ba = s; best = p; } }
    if (!best) return null;
    const c0 = this.puz.center[best.i], W = this.W, H = this.H;
    const scr = w => { const v = Mx.v(this.R, w), d = CAM_D - v[2]; return [W / 2 + v[0] * f / d, H / 2 - v[1] * f / d]; };
    const o = scr(c0), p1 = scr(Mx.v(Mx.axisRot(t.axis, sgn * 0.3), c0)), L = Math.hypot(p1[0] - o[0], p1[1] - o[1]); if (L < 1) return null;
    const ux = (p1[0] - o[0]) / L, uy = (p1[1] - o[1]) / L, r = Math.sqrt(area(best.face)) * 0.6;
    return { x0: o[0] - ux * r, y0: o[1] - uy * r, x1: o[0] + ux * r, y1: o[1] + uy * r, ux, uy, h: r * 0.62 };
  }
  playGo(target0) {
    const p = this.plan; if (!p || this.busy) return;
    if (p.off) { this.say('现在的魔方跟解法对不上，先撤销回去或者重新算一份'); return; }
    const target = Math.max(0, Math.min(p.moves.length, target0)); if (target === p.i) { this.playStop(); return; }
    if (this.mode === PRACTICE) { this.hist = []; this.steps = 0; this.t0 = 0; this.elapsed = 0; this.countable = false; }
    this.playTo = target; this.spdOv = PLAY[this.playSpd]; this.onChange();
    const step = () => {
      const pl = this.plan; if (this.playTo < 0 || !pl || pl.i === this.playTo) { this.playStop(); return; }
      const fwd = this.playTo > pl.i, mv = pl.moves[fwd ? pl.i : pl.i - 1], [b, n] = this.puz.parse(mv);
      this.syncBack = !fwd;
      this.spinCw(b, fwd ? n : -n, false, () => setTimeout(step, 80 * PLAY[this.playSpd]));
    };
    step();
  }
  playStop() { this.playTo = -1; this.spdOv = null; this.onChange(); }
  planPrev() { const p = this.plan; if (!p) return; this.playStop(); if (p.i > 0) this.playGo(p.i - 1); }
  planNext() { const p = this.plan; if (!p) return; this.playStop(); if (p.i < p.moves.length) this.playGo(p.i + 1); }
  planSpeed() { this.playSpd = (this.playSpd + 1) % PLAY.length; if (this.spdOv != null) this.spdOv = PLAY[this.playSpd]; this.onChange(); }
  /* ---- 填色 ---- */
  isFixed(i) { return this.puz instanceof Big && this.puz.type[i] === 3; }
  clearAll() { this.st = this.st.map((_, i) => this.isFixed(i) ? this.puz.faceOf[i] : -1); this.say(''); this.render(); }
  setSolved() { this.st = this.puz.solved(); this.say(''); this.render(); }
  left(c) { return this.puz.faceOf.filter(x => x === c).length - this.st.filter(x => x === c).length; }
  get blanks() { return this.st.filter(x => x < 0).length; }
  loadNet(s) { this.st = s.slice(); this.cur = 0; this.say('识别好了。对着实物看一遍，哪格不对就选颜色点那格改'); this.render(); }
  paint(i) {
    if (this.isFixed(i)) { this.say('正中心那格不用填，它决定这一面是什么颜色'); return; }
    this.st = this.st.slice();
    if (this.st[i] === this.cur) this.st[i] = -1;
    else { if (this.left(this.cur) <= 0) { this.say(this.puz.colorCn[this.cur] + '色已经填满了'); return; }
      this.st[i] = this.cur; if (this.left(this.cur) === 0) { const nx = this.puz.palette.findIndex((_, k) => this.left(k) > 0); if (nx >= 0) this.cur = nx; } }
    vib(6); this.say(''); this.render();
  }
  /* ---- 存档（localStorage）---- */
  save() { const now = Date.now(); return { st: this.st, R: this.R, hist: this.hist, steps: this.steps, countable: this.countable, assisted: this.assisted,
    clock: this.running ? now - this.t0 : this.elapsed, run: this.running, t0set: this.t0 !== 0, msg: this.msg, win: this.win, scram: this.scram, cur: this.cur,
    plan: this.plan ? { from: this.plan.states[0], moves: this.plan.moves, i: this.plan.i, off: this.plan.off } : null }; }
  restore(o) {
    if (!o || !o.st || o.st.length !== this.puz.S) return;
    Object.assign(this, { st: o.st, R: o.R || this.cam0, hist: o.hist || [], steps: o.steps || 0, countable: !!o.countable, assisted: !!o.assisted,
      msg: o.msg || '', win: !!o.win, scram: o.scram || '', cur: o.cur || 0 });
    if (o.run) { this.t0 = Date.now() - o.clock; this.elapsed = 0; } else { this.t0 = o.t0set ? 1 : 0; this.elapsed = o.clock || 0; }
    if (o.plan) { this.plan = this.planMake(o.plan.moves, o.plan.from); this.plan.i = o.plan.i; this.plan.off = o.plan.off; }
  }
  /* ---- 手势 ---- */
  pick(x, y) {
    const inPoly = (q2) => { let sign = 0; for (let k = 0; k < q2.length; k++) { const [ax, ay] = q2[k], [bx, by] = q2[(k + 1) % q2.length]; const cr = (bx - ax) * (y - ay) - (by - ay) * (x - ax);
      if (!cr) continue; const s = cr > 0 ? 1 : -1; if (!sign) sign = s; else if (sign !== s) return false; } return true; };
    for (let k = this.polys.length - 1; k >= 0; k--) if (inPoly(this.polys[k].base)) return this.polys[k];
    let best = null, bd = 1e18, sz = 0;
    for (const p of this.polys) { const cx = p.base.reduce((s, v) => s + v[0], 0) / p.base.length, cy = p.base.reduce((s, v) => s + v[1], 0) / p.base.length, d = (cx - x) ** 2 + (cy - y) ** 2;
      if (d < bd) { bd = d; best = p; sz = Math.hypot(p.base[0][0] - cx, p.base[0][1] - cy) * 2; } }
    return best && bd < sz * sz * 0.36 ? best : null;
  }
  dragTurn(p, dx, dy) {
    const W = this.W, H = this.H, f = Math.min(W, H) * 1.5;
    const proj = w => { const v = Mx.v(this.R, w), d = CAM_D - v[2]; return [W / 2 + v[0] * f / d, H / 2 - v[1] * f / d]; };
    const c0 = this.puz.center[p.i], o = proj(c0); let best = null, bs = -Infinity;
    for (const b of this.puz.turnsAt(p.i)) { const t = this.puz.turns[b]; if (!t) continue;
      for (const dir of [1, -1]) { const kk = dir * 0.12, p1 = proj(Mx.v(Mx.axisRot(t.axis, kk), c0)), score = (p1[0] - o[0]) * dx + (p1[1] - o[1]) * dy;
        if (score <= bs) continue; bs = score; best = { base: b, vx: (p1[0] - o[0]) / kk, vy: (p1[1] - o[1]) / kk }; } }
    if (!(bs > 0) || !best) return null;
    const vmin = Math.min(W, H) * 0.08, vn = Math.hypot(best.vx, best.vy); if (vn > 1e-6 && vn < vmin) { best.vx *= vmin / vn; best.vy *= vmin / vn; }
    return best;
  }
  units(ang, unit) { const a = Math.abs(ang), whole = Math.floor(a / unit + 1e-9), rem = a - whole * unit;
    return Math.min(this.puz.mod === 4 ? 2 : 1, whole + (rem > cfg('snap') / 90 * unit ? 1 : 0)); }
  bindGestures(cv) {
    const pts = new Map(); let two = null, drag = null;
    const turnable = () => this.mode === PRACTICE || this.mode === TUTORIAL;
    const twoInfo = () => { const [a, b] = [...pts.values()]; return [Math.atan2(b[1] - a[1], b[0] - a[0]), (a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; };
    const pos = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    const dropDrag = () => { const d = drag; if (d && d.hint) clearTimeout(d.hint); drag = null; this.hl = null;
      if (d && d.turn && d.ang) this.spin(d.turn.base, d.ang > 0 ? 1 : -1, 0, false, d.ang); else this.render(); };
    cv.onpointerdown = e => {
      if (this.busy) return; cv.setPointerCapture(e.pointerId); this.homeStop();
      const [x, y] = pos(e); pts.set(e.pointerId, [x, y]);
      if (pts.size === 2) { dropDrag(); two = twoInfo(); return; } if (pts.size > 2) return;
      const pk = this.pick(x, y);
      drag = { x0: x, y0: y, x, y, px: x, py: y, pick: pk, r0: this.R, turn: null, ang: 0, locked: false, msg: '', snap: 0, vx: 0, vy: 0, t: performance.now(), moved: false };
      if (pk && turnable()) { const d = drag; d.hint = setTimeout(() => { if (drag === d && !d.turn && !d.msg) this.say('这格能转 ' + this.puz.turnsAt(pk.i).join(' 或 ') + ' 层'); }, 340); }
    };
    cv.onpointermove = e => {
      const p = pts.get(e.pointerId); if (!p) return; const [x, y] = pos(e); p[0] = x; p[1] = y;
      if (pts.size >= 2) { if (pts.size > 2 || !two) return; const n = twoInfo(); let dA = n[0] - two[0];
        while (dA > Math.PI) dA -= 2 * Math.PI; while (dA < -Math.PI) dA += 2 * Math.PI;
        this.roll(dA); this.orbit(n[1] - two[1], n[2] - two[2]); two = n; if (!this.busy) this.render(); return; }
      const d = drag; if (!d) return; d.x = x; d.y = y;
      const dx = x - d.x0, dy = y - d.y0; if (dx * dx + dy * dy > 64) d.moved = true;
      if (d.pick && turnable()) {
        if (d.hint && dx * dx + dy * dy > 36) { clearTimeout(d.hint); d.hint = null; }
        if (!d.locked) d.turn = dx * dx + dy * dy < 100 ? null : this.dragTurn(d.pick, dx, dy);
        const t = d.turn; let ang = 0; const unit = t ? this.puz.turns[t.base].unit : 1;
        if (t) { const vn = Math.hypot(t.vx, t.vy), u = vn > 0 ? (dx * t.vx + dy * t.vy) / (vn * vn) : 0, a = Math.abs(u);
          ang = a <= SIN_P ? Math.asin(a) : SIN_A + (a - SIN_P) * SIN_K; ang = (u < 0 ? -1 : 1) * Math.min(ang, Math.PI); if (Math.abs(ang) > LOCK) d.locked = true; }
        d.ang = ang; this.hl = t ? this.puz.turns[t.base].sel : null;
        const qn = t ? this.units(ang, unit) : 0;
        const m = !t || !ang ? '' : qn > 0 ? '松手就转 ' + this.puz.label(t.base, -(ang > 0 ? 1 : -1) * qn) : '再多转一点：' + this.puz.label(t.base, -(ang > 0 ? 1 : -1));
        if (m !== d.msg) { d.msg = m; this.say(m); }
        if (qn !== d.snap) { if (qn > d.snap) vib(6); d.snap = qn; }
        if (t) { const tt = this.puz.turns[t.base]; this.draw({ axis: tt.axis, ang, sel: tt.sel, caps: this.puz.caps(tt) }); } else this.render();
      } else if (this.mode === INPUT && d.pick && !d.moved) {
        // 按在格子上还没拖开：等着点
      } else {
        const now = performance.now(), dt = Math.max(4, now - d.t);
        d.vx = d.vx * 0.4 + (x - d.px) / dt * 0.6; d.vy = d.vy * 0.4 + (y - d.py) / dt * 0.6; d.t = now;
        this.orbit(x - d.px, y - d.py); if (!this.busy) this.render();
      }
      d.px = x; d.py = y;
    };
    const up = e => {
      pts.delete(e.pointerId); if (pts.size < 2) two = null; if (pts.size) return;
      const d = drag; if (!d) return; drag = null; this.hl = null; if (d.hint) clearTimeout(d.hint);
      if (this.mode === INPUT && d.pick && !d.moved) { this.paint(d.pick.i); return; }
      const t = d.turn;
      if (!turnable() || !t || !d.ang) {
        if (turnable()) this.say('');
        if ((!d.pick || !turnable()) && cfg('fling') > 0.5 && Math.hypot(d.vx, d.vy) > FLING && Math.hypot(d.x - d.x0, d.y - d.y0) > FLING_D) {
          this.R = d.r0; this.flip(Math.abs(d.vx) >= Math.abs(d.vy) ? (d.vx > 0 ? 'r' : 'l') : (d.vy > 0 ? 'd' : 'u'));
        } else this.render();
        return;
      }
      this.say(''); const qn = this.units(d.ang, this.puz.turns[t.base].unit);
      this.spin(t.base, d.ang > 0 ? 1 : -1, qn, qn > 0, d.ang);
    };
    cv.onpointerup = up; cv.onpointercancel = up;
  }
}

/* ======================= 求解调度（四阶后台线程、五阶读表） ======================= */
const PZ = {
  k: 0, views: {}, learn: {}, pat: {},
  of: (() => { const c = {}; return k => c[k] || (c[k] = k === 1 ? new Pyra() : new Big(k === 2 ? 4 : 5)); })(),
  view(k, mode) { const key = k + '_' + mode; let v = this.views[key];
    if (!v) { v = this.views[key] = new PView(this.of(k), mode); if (mode === INPUT) v.clearAll();
      try { const o = JSON.parse(localStorage.getItem('cube_pz_' + key)); if (o) v.restore(o); } catch (e) {} }
    return v; },
  saveAll() { for (const [key, v] of Object.entries(this.views)) if (v.mode === PRACTICE || v.mode === INPUT) try { localStorage.setItem('cube_pz_' + key, JSON.stringify(v.save())); } catch (e) {} },
  record(puz, t, n, a) {
    const key = 'cube_' + puz.id + '_times'; let list = []; try { list = JSON.parse(localStorage.getItem(key)) || []; } catch (e) {}
    const own = list.filter(r => !r.a), before = own.length ? Math.min(...own.map(r => r.t)) : null;
    list.push({ t, n, d: Date.now(), a }); try { localStorage.setItem(key, JSON.stringify(list.slice(-300))); } catch (e) {}
    let msg = '用时 ' + fmtTT(t) + ' · ' + n + ' 步';
    if (a) return msg + ' · 有辅助，不计成绩';
    msg += before == null || t < before ? ' · 🏆 新纪录！' : ' · 最好 ' + fmtTT(before);
    const ao5 = aoN(list, 5); if (ao5 != null) msg += ' · 近5次平均 ' + fmtTT(ao5);
    return msg;
  },
  times(puz) { try { return JSON.parse(localStorage.getItem('cube_' + puz.id + '_times')) || []; } catch (e) { return []; } },
  three: { toState: fc => { const r = faceletToCubie(fc.split('')); return r.error ? null : r.state; },
    solve: s => { const k = kSolve(s, { timeMs: 800 }); return k ? k.moves : solve(s).steps.flatMap(x => x.moves); } },
  firstNote(puz) { return puz instanceof Big && puz.N === 4 && !this.tprReady ? '（第一次要先建四阶的表，十来秒）'
    : puz instanceof Big && puz.N === 5 && !this.b5 ? '（第一次要先读五阶的表）' : ''; },
  // 四阶：TPR 在 Web Worker 里
  tpr(fc) {
    return new Promise(res => {
      try {
        if (!this.worker) { this.worker = new Worker('cube-tpr-worker.js', { type: 'module' }); this.wid = 0; this.wcb = {};
          this.worker.onmessage = e => { const cb = this.wcb[e.data.id]; delete this.wcb[e.data.id]; if (cb) cb(e.data); };
          this.worker.onerror = () => { for (const k in this.wcb) this.wcb[k]({ err: 'worker' }); this.wcb = {}; this.worker = null; }; }
        const id = ++this.wid; const tm = setTimeout(() => { if (this.wcb[id]) { delete this.wcb[id]; res(null); } }, 90000);
        this.wcb[id] = d => { clearTimeout(tm); if (!d.err) this.tprReady = true; res(d.err ? null : d.sol); };
        this.worker.postMessage({ id, fc });
      } catch (e) { res(null); }
    });
  },
  async b5Tables() {
    if (this.b5) return this.b5; if (this.b5Fail) return null;
    try { const T = {}; for (const n of window.PUZ.B5_NAMES) { const r = await fetch('cube-b5/' + n + '.bin'); if (!r.ok) throw 0; T[n] = new Uint8Array(await r.arrayBuffer()); }
      return (this.b5 = T); } catch (e) { this.b5Fail = true; return null; }
  },
  warm(k) { const p = this.of(k); setTimeout(() => { try { if (p instanceof Pyra) p.warm(); else if (p.N === 4) this.tpr(null); else this.b5Tables(); } catch (e) {} }, 300); },
  async solve(puz, st) {
    const yieldUI = () => new Promise(r => setTimeout(r, 30));
    await yieldUI();
    try {
      if (puz instanceof Pyra) return puz.solve(st);
      if (puz.N === 4) {
        const raw = await this.tpr(st.map(c => 'URFDLB'[c]).join(''));
        if (raw) { const sol = puz.simplify(puz.stripWholes(raw.trim().split(/\s+/).filter(Boolean))); if (puz.isSolved(puz.applyAll(st, sol))) return sol; }
        await yieldUI(); return puz.solveOrThrow(st, this.three, null);
      }
      const T = await this.b5Tables(); await yieldUI();
      const c = T ? new Red5(puz, T).centers(st) : null;
      return puz.solveOrThrow(st, this.three, c);
    } catch (e) { return null; }
  },
};
window.PZ = PZ; window.PView = PView;
window.PZ_CONST = { PRACTICE, TUTORIAL, INPUT, VIEW, PLAY_CN, esc, q, hex, CN };
})();
