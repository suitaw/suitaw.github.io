/* cube-puz.js —— 金字塔 / 四阶 / 五阶：模型与求解器（跟原生 App ~/cube-app/next 的 Puz.kt / Pyra.kt / Big.kt / Red5.kt 逐段对应）
 *
 * 状态 = 每张贴纸现在是什么颜色（数组，下标是贴纸位置）。转动 = 位置置换，由几何现算：
 * 把这一层贴纸的中心绕轴转一格，落到哪张贴纸的位置就是哪。整体翻转也直接烙进状态，
 * 所以记号永远按「现在怎么拿」叫。三阶不走这套（cube-solver.html 里自己那套）。
 *
 * 求解：
 *   金字塔：棱 + 轴心 933,120 种，开局建一张距离表，沿距离减 1 走 = 最短解；尖角最后对齐
 *   四阶：陈霜（cs0x7f）的 TPR 三阶段降阶（MIT），App 里那份 Java 用 TeaVM 编成 cube-tpr.js，
 *         放在 Web Worker 里跑（建表要十几秒，不能卡界面），平均约 45 步
 *   五阶：中心分阶段搜索（表 cube-b5/*.bin，约 3.8MB）→ 三阶部分（网页现成的 kSolve）→ 翼棱交换子，约 200 步
 *   任何一步出意外，都退回「交换子逐块放」的做法（几百步，但一定解得出）
 * 浏览器里挂到全局 PUZ；node 里 require 也能用（测试）
 */
(function (G) {
'use strict';

/* ---- 3×3 矩阵（行主序）、向量 ---- */
const Mx = {
  I: () => [1, 0, 0, 0, 1, 0, 0, 0, 1],
  mul(a, b) { const m = new Array(9); for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { let s = 0; for (let k = 0; k < 3; k++) s += a[i * 3 + k] * b[k * 3 + j]; m[i * 3 + j] = s; } return m; },
  v(m, a) { return [m[0] * a[0] + m[1] * a[1] + m[2] * a[2], m[3] * a[0] + m[4] * a[1] + m[5] * a[2], m[6] * a[0] + m[7] * a[1] + m[8] * a[2]]; },
  rot(ax, a) { const c = Math.cos(a), s = Math.sin(a);
    return ax === 0 ? [1, 0, 0, 0, c, -s, 0, s, c] : ax === 1 ? [c, 0, s, 0, 1, 0, -s, 0, c] : [c, -s, 0, s, c, 0, 0, 0, 1]; },
  axisRot(a, t) { const c = Math.cos(t), s = Math.sin(t), k = 1 - c, [x, y, z] = a;
    return [c + x * x * k, x * y * k - z * s, x * z * k + y * s, y * x * k + z * s, c + y * y * k, y * z * k - x * s, z * x * k - y * s, z * y * k + x * s, c + z * z * k]; },
  tr(m) { return [m[0], m[3], m[6], m[1], m[4], m[7], m[2], m[5], m[8]]; },
  cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; },
};
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const dist2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
const norm = v => { const l = Math.hypot(v[0], v[1], v[2]); return [v[0] / l, v[1] / l, v[2] / l]; };
const centroid = p => { const c = [0, 0, 0]; for (const v of p) for (let k = 0; k < 3; k++) c[k] += v[k] / p.length; return c; };
const rnd = n => Math.floor(Math.random() * n);

/* ---- 组合编号（colex）：n 个位置里选 k 个 ↔ 整数。查表下标都靠它 ---- */
const CNK = []; for (let n = 0; n <= 30; n++) { CNK[n] = []; for (let k = 0; k <= n; k++) CNK[n][k] = k === 0 || k === n ? 1 : CNK[n - 1][k - 1] + CNK[n - 1][k]; }
function combRank(bits, n) { let r = 0, k = 0; for (let i = 0; i < n; i++) if (bits[i]) { k++; if (k <= i) r += CNK[i][k]; } return r; }

// 一种可转的层：base 记号（U、2R、u…）= 绕 axis（单位向量，朝外）转 -unit（从外面看顺时针）
function Turn(base, axis, unit, sel) { return { base, axis, unit, sel }; }

/* ======================= 通用 ======================= */
class Puz {
  init() {
    this.center = this.poly.map(centroid);
    this._perm = new Map(); this._relabel = new Map();
  }
  // 置换 to[i] = 贴纸 i 转完到哪。mv = base + ('' | "'" | '2')
  perm(mv) {
    let p = this._perm.get(mv); if (p) return p;
    const [base, n] = this.parse(mv);
    const t = this.turns[base] || this.wholes[base]; if (!t) throw new Error('没有这个转动：' + mv);
    const one = this.rawPerm(t); const S = this.S;
    p = new Int32Array(S); for (let i = 0; i < S; i++) p[i] = i;
    for (let r = 0; r < n; r++) { const q = new Int32Array(S); for (let i = 0; i < S; i++) q[i] = one[p[i]]; p = q; }
    this._perm.set(mv, p); return p;
  }
  rawPerm(t) {
    const m = Mx.axisRot(t.axis, -t.unit), S = this.S, out = new Int32Array(S);
    for (let i = 0; i < S; i++) {
      if (!t.sel[i]) { out[i] = i; continue; }
      const q = Mx.v(m, this.center[i]); let best = -1, bd = 1e9;
      for (let j = 0; j < S; j++) { const d = dist2(this.center[j], q); if (d < bd) { bd = d; best = j; } }
      if (bd > 1e-6) throw new Error('转动 ' + t.base + ' 对不上格子');
      out[i] = best;
    }
    return out;
  }
  parse(mv) {
    if (mv.endsWith("'")) return [mv.slice(0, -1), this.mod - 1];
    if (mv.endsWith('2') && mv.length > 1 && !/^\d+$/.test(mv.slice(0, -1))) return [mv.slice(0, -1), 2];
    return [mv, 1];
  }
  modOf(base) { const w = this.wholes[base]; return w ? Math.round(2 * Math.PI / w.unit) : this.mod; }
  // base 转 units 格（正 = 顺时针）→ 记号
  label(base, units) { const m = this.modOf(base), u = ((units % m) + m) % m;
    return u === 0 ? null : u === 1 ? base : u === m - 1 ? base + "'" : base + '2'; }
  inverse(mv) { const [b, n] = this.parse(mv); return this.label(b, -n) || mv; }
  apply(st, mv) { const p = this.perm(mv), o = new Array(this.S); for (let i = 0; i < this.S; i++) o[p[i]] = st[i]; return o; }
  applyAll(st, mvs) { let s = st; for (const m of mvs) s = this.apply(s, m); return s; }
  solved() { return Array.from(this.faceOf); }
  isSolved(st) { const first = {}; for (let i = 0; i < this.S; i++) { const f = this.faceOf[i]; if (!(f in first)) first[f] = st[i]; else if (st[i] !== first[f]) return false; } return true; }
  // 整体转 w 之后，原来叫 mv 的那一下现在叫什么
  relabel(mv, w) {
    let map = this._relabel.get(w);
    if (!map) {
      map = new Map(); const pw = this.perm(w), S = this.S;
      const all = Object.keys(this.turns).flatMap(b => [b, b + "'"].concat(this.mod === 4 ? [b + '2'] : []));
      const byPerm = new Map(all.map(m => [Array.from(this.perm(m)).join(), m]));
      const inv = new Int32Array(S); for (let i = 0; i < S; i++) inv[pw[i]] = i;
      for (const m of all) { const pm = this.perm(m); const q = []; for (let i = 0; i < S; i++) q.push(pw[pm[inv[i]]]); const r = byPerm.get(q.join()); if (r) map.set(m, r); }
      this._relabel.set(w, map);
    }
    return map.get(mv) || mv;
  }
  // 解法里夹着整体转动时消化掉：沿途把后面的步改名，整体转动丢掉（朝哪都算复原）
  stripWholes(ms) {
    const ws = [], out = [];
    for (const m of ms) {
      if (this.parse(m)[0] in this.wholes) { ws.push(m); continue; }
      let x = m; for (let i = ws.length - 1; i >= 0; i--) x = this.relabel(x, this.inverse(ws[i]));
      out.push(x);
    }
    return out;
  }
  // 相邻同一层的转动合并（R R → R2，R R' 消掉）
  simplify(ms) {
    const out = [];
    for (const m of ms) {
      const [b, n] = this.parse(m);
      if (out.length && this.parse(out[out.length - 1])[0] === b) { const prev = this.parse(out.pop())[1]; const l = this.label(b, prev + n); if (l) out.push(l); }
      else out.push(m);
    }
    return out.length === ms.length ? out : this.simplify(out);
  }
  moveCn(mv) { return mv; }
}

/* ======================= 金字塔 ======================= */
class Pyra extends Puz {
  constructor() {
    super();
    Object.assign(this, { id: 'pyra', cn: '金字塔', mod: 3, scale: 1,
      palette: [0x10c24a, 0xf0302c, 0x1a6dff, 0xffd500], colorCn: ['绿', '红', '蓝', '黄'], faceCn: ['前面', '左面', '右面', '底面'] });
    const E = 4, r = E * Math.sqrt(6) / 4, rho = r * 2 * Math.sqrt(2) / 3, yb = -r / 3;
    this.V = [[0, r, 0], [-rho * Math.sqrt(3) / 2, yb, rho / 2], [rho * Math.sqrt(3) / 2, yb, rho / 2], [0, yb, -rho]];   // U L R B
    this.FACES = [[0, 1, 2], [0, 3, 1], [0, 2, 3], [1, 3, 2]];
    this.AX = this.V.map(norm);
    const TIP = 5 * r / 9, LAY = r / 9;
    const ps = [], fo = [], ns = [];
    for (let f = 0; f < 4; f++) {
      const [a, b, c] = this.FACES[f].map(i => this.V[i]);
      const P = (i, j) => [0, 1, 2].map(k => a[k] + (b[k] - a[k]) * i / 3 + (c[k] - a[k]) * j / 3);
      const n = norm(Mx.cross(b.map((v, k) => v - a[k]), c.map((v, k) => v - a[k])));
      const out = dot(n, a) > 0;
      const add = t => { ps.push(out ? t : [t[0], t[2], t[1]]); fo.push(f); ns.push(out ? n : n.map(v => -v)); };
      for (let i = 0; i <= 2; i++) for (let j = 0; j <= 2 - i; j++) add([P(i, j), P(i + 1, j), P(i, j + 1)]);
      for (let i = 0; i <= 1; i++) for (let j = 0; j <= 1 - i; j++) add([P(i + 1, j), P(i + 1, j + 1), P(i, j + 1)]);
    }
    this.poly = ps; this.faceOf = fo; this.nrm = ns; this.S = 36;
    this.init();
    const S = this.S, C = this.center, AX = this.AX;
    this.layersOf = C.map(c => [0, 1, 2, 3].filter(v => dot(c, AX[v]) > LAY));
    this.tipOf = C.map(c => { const v = [0, 1, 2, 3].find(v => dot(c, AX[v]) > TIP); return v === undefined ? -1 : v; });
    this.kind = C.map((c, i) => this.tipOf[i] >= 0 ? 0 : this.layersOf[i].length === 1 ? 1 : 2);   // 0 尖角 1 轴心 2 棱
    this.turns = {};
    'ULRB'.split('').forEach((n, v) => {
      this.turns[n] = Turn(n, AX[v], 2 * Math.PI / 3, C.map(c => dot(c, AX[v]) > LAY));
      const l = n.toLowerCase(); this.turns[l] = Turn(l, AX[v], 2 * Math.PI / 3, C.map(c => dot(c, AX[v]) > TIP));
    });
    // 整体：Y = 绕上顶点转 120°；Fl = 绕「前下棱中点—后上棱中点」翻 180°（底面翻到前面）
    const V = this.V, fa = norm([0, 1, 2].map(k => (V[1][k] + V[2][k]) / 2 - (V[0][k] + V[3][k]) / 2));
    this.wholes = { Y: Turn('Y', AX[0], 2 * Math.PI / 3, C.map(() => true)), Fl: Turn('Fl', fa, Math.PI, C.map(() => true)) };
    this.keys = ['U', "U'", 'L', "L'", 'R', "R'", 'B', "B'", 'u', "u'", 'l', "l'", 'r', "r'", 'b', "b'"];
    this.BODY = ['U', "U'", 'L', "L'", 'R', "R'", 'B', "B'"];
  }
  turnsAt(i) { return this.tipOf[i] >= 0 ? ['ulrb'[this.tipOf[i]]] : this.layersOf[i].map(v => 'ULRB'[v]); }
  caps(t) {
    const v = this.AX.indexOf(t.axis); if (v < 0) return [];
    const k = t.base[0] === t.base[0].toLowerCase() ? 1 / 3 : 2 / 3;
    return [[0, 1, 2, 3].filter(w => w !== v).map(w => [0, 1, 2].map(j => this.V[v][j] + (this.V[w][j] - this.V[v][j]) * k))];
  }
  flipFor(dir, cam) {
    if (dir === 'l' || dir === 'r') { const sgn = Mx.v(cam, this.AX[0])[1] >= 0 ? 1 : -1; return ['Y', dir === 'r' ? -sgn : sgn]; }
    return ['Fl', dir === 'd' ? 1 : -1];
  }
  moveCn(mv) {
    const n = mv[0], tip = n === n.toLowerCase(), v = 'ULRB'.indexOf(n.toUpperCase());
    return ['上', '左', '右', '后'][v] + '顶点' + (tip ? '的尖角' : '那一层') + '，从顶点往下看' + (mv.endsWith("'") ? '逆时针' : '顺时针') + ' 120°';
  }
  // 按四个轴心认出「哪个颜色该在哪个面」：轴心 v 上缺的那色 = v 对面那面的颜色
  canon(st) {
    const opp = [3, 2, 1, 0], map = [-1, -1, -1, -1];
    for (let v = 0; v < 4; v++) {
      const cs = new Set(); for (let i = 0; i < this.S; i++) if (this.kind[i] === 1 && this.layersOf[i][0] === v) cs.add(st[i]);
      if (cs.size !== 3 || [...cs].some(c => !(c >= 0 && c <= 3))) return null;
      const miss = [0, 1, 2, 3].find(c => !cs.has(c)); if (map[miss] >= 0) return null;
      map[miss] = opp[v];
    }
    return st.map(c => map[c]);
  }
  tables() {
    if (this._T) return this._T;
    const sub = idx => {
      const key = s => idx.map(i => s[i]).join('');
      const s0 = this.solved(), map = new Map([[key(s0), 0]]), reps = [s0], tab = [];
      for (let q = 0; q < reps.length; q++) {
        const row = new Int32Array(8);
        this.BODY.forEach((mv, m) => { const n = this.apply(reps[q], mv), k = key(n); let x = map.get(k); if (x === undefined) { x = reps.length; map.set(k, x); reps.push(n); } row[m] = x; });
        tab.push(row);
      }
      return { idx, map, tab, key };
    };
    const S = this.S, e = sub([...Array(S).keys()].filter(i => this.kind[i] === 2)), c = sub([...Array(S).keys()].filter(i => this.kind[i] === 1));
    const nc = c.tab.length, ns = e.tab.length * nc, dist = new Int8Array(ns).fill(-1); dist[0] = 0;
    let fr = [0], d = 0;
    while (fr.length) { const nx = []; for (const s of fr) { const ei = (s / nc) | 0, ci = s % nc;
      for (let m = 0; m < 8; m++) { const t = e.tab[ei][m] * nc + c.tab[ci][m]; if (dist[t] < 0) { dist[t] = d + 1; nx.push(t); } } } fr = nx; d++; }
    return (this._T = { e, c, dist, nc });
  }
  warm() { this.tables(); }
  solve(st) {
    const cs = this.canon(st); if (!cs) return null;
    const T = this.tables(), ei = T.e.map.get(T.e.key(cs)), ci = T.c.map.get(T.c.key(cs));
    if (ei === undefined || ci === undefined) return null;
    let s = ei * T.nc + ci; const out = []; let cur = st;
    while (T.dist[s] > 0) {
      const e2 = (s / T.nc) | 0, c2 = s % T.nc; let moved = false;
      for (let m = 0; m < 8; m++) { const t = T.e.tab[e2][m] * T.nc + T.c.tab[c2][m];
        if (T.dist[t] === T.dist[s] - 1) { out.push(this.BODY[m]); cur = this.apply(cur, this.BODY[m]); s = t; moved = true; break; } }
      if (!moved) return null;
    }
    // 尖角：转到跟它下面的轴心同色
    for (let v = 0; v < 4; v++) {
      const n = 'ulrb'[v], tipS = [...Array(this.S).keys()].find(i => this.kind[i] === 0 && this.tipOf[i] === v);
      const cen = [...Array(this.S).keys()].find(i => this.kind[i] === 1 && this.layersOf[i][0] === v && this.faceOf[i] === this.faceOf[tipS]);
      for (const m of ['', n, n + "'"]) { const t = m ? this.apply(cur, m) : cur; if (t[tipS] === t[cen]) { if (m) out.push(m); cur = t; break; } }
    }
    return this.isSolved(cur) ? out : null;
  }
  // 随机状态打乱：挑一个离复原至少 6 步的状态，打乱 = 它的解法倒过来，再随机拧尖角
  scramble() {
    const T = this.tables(); let s;
    do { s = rnd(T.dist.length); } while (T.dist[s] < 6);
    const path = [];
    while (T.dist[s] > 0) { const e2 = (s / T.nc) | 0, c2 = s % T.nc;
      for (let m = 0; m < 8; m++) { const t = T.e.tab[e2][m] * T.nc + T.c.tab[c2][m]; if (T.dist[t] === T.dist[s] - 1) { path.push(this.BODY[m]); s = t; break; } } }
    const out = path.reverse().map(m => this.inverse(m));
    for (const n of 'ulrb') { const k = rnd(3); if (k === 1) out.push(n); else if (k === 2) out.push(n + "'"); }
    return out;
  }
}

/* ======================= N 阶（四阶、五阶） ======================= */
// 贴纸排法跟三阶展开图一致：URFDLB 六面，每面 N×N。坐标用「两倍单位」整数
class Big extends Puz {
  constructor(N) {
    super();
    const m = N - 1, h = 1.62 / N, NN = N * N, S = 6 * NN;
    Object.assign(this, { N, NN, S, m, h, id: 'big' + N, cn: N === 4 ? '四阶' : '五阶', mod: 4, scale: 1,
      palette: [0xffd500, 0xff7a00, 0x10c24a, 0xf5f7fa, 0xf0302c, 0x1a6dff], colorCn: ['黄', '橙', '绿', '白', '红', '蓝'],
      faceCn: ['上面', '右面', '前面', '底面', '左面', '后面'] });
    const P = [], Nv = [];
    for (let f = 0; f < 6; f++) for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
      const a = -m + 2 * c, b = -m + 2 * r;
      switch ('URFDLB'[f]) {
        case 'U': P.push([a, m, b]); Nv.push([0, 1, 0]); break;
        case 'R': P.push([m, -b, -a]); Nv.push([1, 0, 0]); break;
        case 'F': P.push([a, -b, m]); Nv.push([0, 0, 1]); break;
        case 'D': P.push([a, -m, -b]); Nv.push([0, -1, 0]); break;
        case 'L': P.push([-m, -b, a]); Nv.push([-1, 0, 0]); break;
        default: P.push([-a, -b, -m]); Nv.push([0, 0, -1]);
      }
    }
    this.P = P; this.Nv = Nv; this.nrm = Nv.map(v => v.slice());
    this.faceOf = [...Array(S).keys()].map(i => (i / NN) | 0);
    this.poly = P.map((p, i) => {
      const n = Nv[i], ax = n.findIndex(v => v !== 0), u = [0, 0, 0], v = [0, 0, 0]; u[(ax + 1) % 3] = 1; v[(ax + 2) % 3] = 1;
      const s = p.map((x, k) => x + n[k]);
      let cs = [[1, 1], [-1, 1], [-1, -1], [1, -1]]; if (n[ax] < 0) cs = cs.reverse();
      return cs.map(([a, b]) => [0, 1, 2].map(k => (s[k] + u[k] * a + v[k] * b) * h));
    });
    this.init();
    const AXV = [[1, 0, 0], [0, 1, 0], [0, 0, 1]], NEG = [[-1, 0, 0], [0, -1, 0], [0, 0, -1]];
    const FA = { U: [1, 1], D: [1, -1], R: [0, 1], L: [0, -1], F: [2, 1], B: [2, -1] };
    this.FA = FA;
    // base 记号 → [轴, 这一下转哪几层的坐标]。Rw = 外层 + 第 2 层一起（宽层）
    const L = new Map();
    for (const f of 'URFDLB') { const [ax, sd] = FA[f]; for (let d = 1; d <= (N >> 1); d++) L.set((d === 1 ? '' : d) + f, [ax, [sd * (m - 2 * (d - 1))]]); }
    if (N % 2) for (const f of 'URF') L.set(((N + 1) / 2) + f, [FA[f][0], [0]]);
    for (const f of 'URFDLB') { const [ax, sd] = FA[f]; L.set(f + 'w', [ax, [sd * m, sd * (m - 2)]]); }
    this.layerOf = L;
    this.turns = {};
    for (const [b, [ax, Ls]] of L) { const f = b.replace(/w$/, '').slice(-1); this.turns[b] = Turn(b, FA[f][1] > 0 ? AXV[ax] : NEG[ax], Math.PI / 2, P.map(p => Ls.includes(p[ax]))); }
    this.wholes = { x: Turn('x', AXV[0], Math.PI / 2, P.map(() => true)), y: Turn('y', AXV[1], Math.PI / 2, P.map(() => true)), z: Turn('z', AXV[2], Math.PI / 2, P.map(() => true)) };
    const k = [];
    for (const f of 'UDRLFB') k.push(f, f + "'");
    for (const f of 'UDRLFB') k.push('2' + f, '2' + f + "'");
    if (N % 2) for (const f of 'URF') k.push('3' + f, '3' + f + "'");
    this.keys = k;
    // 0 角 1 中棱 2 翼棱 3 固定中心 4 X 心 5 T 心
    this.type = P.map(p => {
      const ext = p.filter(v => Math.abs(v) === m).length;
      if (ext === 3) return 0;
      if (ext === 2) return p.find(v => Math.abs(v) !== m) === 0 ? 1 : 2;
      const ins = p.filter(v => Math.abs(v) !== m);
      return ins[0] === 0 && ins[1] === 0 ? 3 : Math.abs(ins[0]) === Math.abs(ins[1]) ? 4 : 5;
    });
    const key = p => p.join();
    const byPos = new Map(); P.forEach((p, i) => { const k2 = key(p); if (!byPos.has(k2)) byPos.set(k2, []); byPos.get(k2).push(i); });
    this.mates = P.map((p, i) => byPos.get(key(p)).filter(j => j !== i));
    this.orbits = N === 4 ? [4, 2] : [4, 5, 2];
  }
  hand(i) {
    const j = this.mates[i][0], n = this.Nv[i], n2 = this.Nv[j], p = this.P[i];
    const w = [0, 1, 2].map(k => n[k] === 0 && n2[k] === 0 ? p[k] : 0);
    return Math.sign(n[0] * (n2[1] * w[2] - n2[2] * w[1]) - n[1] * (n2[0] * w[2] - n2[2] * w[0]) + n[2] * (n2[0] * w[1] - n2[1] * w[0]));
  }
  turnsAt(i) {
    const N = this.N, m = this.m, ax = this.Nv[i].findIndex(v => v !== 0);
    return [0, 1, 2].filter(k => k !== ax).map(k => {
      const c = this.P[i][k];
      if (c > 0) { const d = (m - c) / 2 + 1; return (d === 1 ? '' : d) + 'RUF'[k]; }
      if (c < 0) { const d = (m + c) / 2 + 1; return (d === 1 ? '' : d) + 'LDB'[k]; }
      return ((N + 1) / 2) + 'RUF'[k];
    });
  }
  caps(t) {
    const l = this.layerOf.get(t.base); if (!l) return [];
    const [ax, Ls] = l, u = (ax + 1) % 3, v = (ax + 2) % 3, N = this.N, h = this.h;
    const bs = Ls.flatMap(L => [[L - 1, L - 2], [L + 1, L + 2]]).filter(([b, o]) => b > -N && b < N && !Ls.includes(o)).map(x => x[0]);
    return bs.map(b => [[1, 1], [-1, 1], [-1, -1], [1, -1]].map(([a, c]) => { const p = [0, 0, 0]; p[ax] = b * h; p[u] = a * N * h; p[v] = c * N * h; return p; }));
  }
  flipFor(dir, cam) {
    const row = dir === 'l' || dir === 'r' ? 1 : 0; let k = 0;
    for (let j = 0; j < 3; j++) if (Math.abs(cam[row * 3 + j]) > Math.abs(cam[row * 3 + k])) k = j;
    const sgn = cam[row * 3 + k] >= 0 ? 1 : -1, plus = dir === 'r' || dir === 'd';
    return ['xyz'[k], plus ? -sgn : sgn];
  }
  moveCn(mv) {
    const [b, n] = this.parse(mv);
    if (b in this.wholes) return '整个魔方转（' + { x: '跟右面同向', y: '跟上面同向', z: '跟前面同向' }[b] + '）' + (n === 1 ? '90°' : n === 2 ? '180°' : '，反方向 90°');
    const bb = b.replace(/w$/, ''), f = bb.slice(-1), d = bb.slice(0, -1);
    const face = { U: '上', D: '底', R: '右', L: '左', F: '前', B: '后' }[f], dirCn = n === 1 ? '顺时针 90°' : n === 2 ? '转 180°' : '逆时针 90°';
    if (b.endsWith('w')) return face + '面带着第 2 层一起（两层），正对着它' + dirCn;
    if (!d) return face + '面，正对着它' + dirCn;
    if (+d * 2 - 1 === this.N) return '正中间那层（跟' + face + '面同向），从' + face + '面看' + dirCn;
    return '从' + face + '面数第 ' + d + ' 层，从' + face + '面看' + dirCn;
  }
  posOf(seq) { const S = this.S, p = new Int32Array(S); for (let i = 0; i < S; i++) p[i] = i; for (const mv of seq) { const t = this.perm(mv); for (let i = 0; i < S; i++) p[i] = t[p[i]]; } return p; }
  /* ---- 交换子库：[内层, 外层] 一类组合里挑「只换三块、别的一块不动」的纯三循环，再套 0~2 步 setup ---- */
  lib() {
    if (this._lib) return this._lib;
    const S = this.S, gens = Object.keys(this.turns).filter(b => !b.endsWith('w')).flatMap(b => [b, b + "'", b + '2']);
    const setups = [[]]; for (const g of gens) setups.push([g]);
    for (const g of gens) for (const k of gens) if (this.parse(g)[0] !== this.parse(k)[0]) setups.push([g, k]);
    const sPos = setups.map(s => this.posOf(s));
    const sInv = sPos.map(p => { const r = new Int32Array(S); for (let i = 0; i < S; i++) r[p[i]] = i; return r; });
    const axis = mv => this.layerOf.get(this.parse(mv)[0])[0];
    const outer = gens.filter(g => 'URFDLB'.includes(g[0])), slice = gens.filter(g => /^\d/.test(g));
    const inv = s => s.slice().reverse().map(x => this.inverse(x));
    const As = [], Bs = [];
    for (const s of slice) { As.push([s]); for (const o of outer) if (axis(o) !== axis(s)) As.push([s, o, this.inverse(s)]); }
    for (const o of outer) Bs.push([o]);
    for (const a of outer) for (const b of outer) if (axis(a) !== axis(b) && !a.endsWith('2') && !b.endsWith('2')) Bs.push([a, b, this.inverse(a)]);
    for (const a of outer) for (const b of slice) if (axis(a) !== axis(b) && !a.endsWith('2')) Bs.push([a, b, this.inverse(a)]);
    const best = new Map(this.orbits.map(o => [o, new Map()]));
    const pos = new Int32Array(S);
    for (const A of As) for (const B of Bs) {
      if (A.length === 3 && B.length === 3) continue;
      const seq = A.concat(B, inv(A), inv(B));
      for (let i = 0; i < S; i++) pos[i] = i;
      for (const mv of seq) { const t = this.perm(mv); for (let i = 0; i < S; i++) pos[i] = t[pos[i]]; }
      let cnt = 0, t0 = -1, ok = true;
      for (let i = 0; i < S; i++) if (pos[i] !== i) { if (t0 < 0) t0 = this.type[i]; else if (this.type[i] !== t0) { ok = false; break; } cnt++; }
      if (!ok || !cnt || !this.orbits.includes(t0) || cnt !== (t0 === 2 ? 6 : 3)) continue;
      const key = []; for (let i = 0; i < S; i++) if (pos[i] !== i) key.push(i);
      const mp = best.get(t0), k = key.join(), old = mp.get(k);
      if (!old || old.length > seq.length) mp.set(k, seq);
    }
    const byXY = new Map();
    for (const [o, mp] of best) {
      const idx = new Map();
      for (const seq of mp.values()) {
        const p = this.posOf(seq), mv = []; for (let i = 0; i < S; i++) if (p[i] !== i) mv.push(i, p[i]);
        const c = { seq, mv };
        for (let k = 0; k < mv.length; k += 2) { const key = mv[k] * 1000 + mv[k + 1]; if (!idx.has(key)) idx.set(key, []); idx.get(key).push(c); }
      }
      byXY.set(o, idx);
    }
    return (this._lib = { setups, sPos, sInv, byXY, inv });
  }
  /* 交换子做法（兜底，也给五阶放翼棱）。three = 网页三阶求解 {toState(fc串), solve(state)→moves} */
  solveOrThrow(st0, three, red5moves) {
    const N = this.N, NN = this.NN, S = this.S, m = this.m, OPP = [3, 4, 5, 0, 1, 2];
    let st = st0.slice(); const out = [];
    const doSeq = seq => { for (const x of seq) { st = this.apply(st, x); out.push(x); } };
    const cnt = [0, 0, 0, 0, 0, 0]; for (const c of st) { if (!(c >= 0 && c <= 5)) throw new Error('颜色不对'); cnt[c]++; }
    if (cnt.some(c => c !== NN)) throw new Error('每色格数不对');
    let centersDone = false;
    if (red5moves) { doSeq(red5moves); centersDone = true; }
    const want = [-1, -1, -1, -1, -1, -1];
    if (N % 2) for (let f = 0; f < 6; f++) want[f] = st[f * NN + (NN >> 1)];
    else for (let i = 0; i < S; i++) if (this.P[i].every(v => v === -m)) { const f = this.faceOf[i]; want[f] = st[i]; want[OPP[f]] = OPP[st[i]]; }
    if (new Set(want).size !== 6 || want.some(w => w < 0)) throw new Error('配色认不出');
    const need = i => want[this.faceOf[i]];
    const parity = t => {
      const slots = [], seen = new Set();
      for (let i = 0; i < S; i++) if (this.type[i] === t && !seen.has(this.P[i].join())) { seen.add(this.P[i].join()); slots.push(i); }
      const key = (i, col) => t === 2 ? col(i) + ',' + col(this.mates[i][0]) + ',' + this.hand(i) : [i].concat(this.mates[i]).map(col).sort().join();
      const slotOf = new Map(slots.map((i, k) => [this.P[i].join(), k])), home = new Map();
      for (let i = 0; i < S; i++) if (this.type[i] === t) home.set(key(i, need), slotOf.get(this.P[i].join()));
      const p = slots.map(i => { const h = home.get(key(i, j => st[j])); if (h === undefined) throw new Error('块不对'); return h; });
      if (new Set(p).size !== p.length) throw new Error('块重复');
      const vis = new Array(p.length).fill(false); let par = 0;
      for (let i = 0; i < p.length; i++) { if (vis[i]) continue; let j = i, L = 0; while (!vis[j]) { vis[j] = true; j = p[j]; L++; } par ^= (L - 1) & 1; }
      return par;
    };
    const stage3 = () => {
      const letter = {}; for (let f = 0; f < 6; f++) letter[want[f]] = 'URFDLB'[f];
      const mid = (N - 1) >> 1; let fc = '';
      for (let f = 0; f < 6; f++) for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
        const R = r === 0 ? 0 : r === 2 ? N - 1 : mid, Cc = c === 0 ? 0 : c === 2 ? N - 1 : mid;
        fc += letter[st[f * NN + R * N + Cc]];
      }
      const s3 = three.toState(fc); if (!s3) throw new Error('三阶部分不合法');
      const mv = three.solve(s3); if (!mv) throw new Error('三阶解不出');
      doSeq(mv);
    };
    const cornerOdd = parity(0) === 1;
    if (centersDone) { stage3(); if (parity(2) === 1) doSeq("2R U2 2R U2 F2 2R F2 2L' U2 2L U2 2R2".split(' ')); }
    else if (parity(2) === 1) doSeq(['2R']);
    if (N % 2 === 0 && cornerOdd) doSeq(['U']);
    if (N % 2 === 1 && !centersDone) stage3();
    const L = this.lib();
    if (centersDone) {
      let w = null; try { w = this.wingsGreedy(st, need); } catch (e) { w = null; }
      if (w) { doSeq(w); if (!this.isSolved(st)) throw new Error('没复原'); return this.simplify(out); }
    }
    for (const o of centersDone ? [2] : this.orbits) {
      const slots = [...Array(S).keys()].filter(i => this.type[i] === o), fixed = new Set(), idx = L.byXY.get(o);
      const ok = (s, i) => s[i] === need(i) && (o !== 2 || s[this.mates[i][0]] === need(this.mates[i][0]));
      for (const t of slots) {
        if (fixed.has(t)) continue;
        if (ok(st, t)) { fixed.add(t); if (o === 2) fixed.add(this.mates[t][0]); continue; }
        let bestSi = -1, bestC = null, bestScore = Infinity;
        for (const s of slots) {
          if (s === t || fixed.has(s) || st[s] !== need(t)) continue;
          if (o === 2 && st[this.mates[s][0]] !== need(this.mates[t][0])) continue;
          for (let si = 0; si < L.setups.length; si++) {
            const sp = L.sPos[si], spi = L.sInv[si], arr = idx.get(sp[s] * 1000 + sp[t]); if (!arr) continue;
            const sl = L.setups[si].length * 2;
            for (const c of arr) {
              const len = sl + c.seq.length; if (len - 6 >= bestScore) continue;
              let good = true, gain = 0;
              for (let k = 0; k < c.mv.length; k += 2) { const x = spi[c.mv[k]], y = spi[c.mv[k + 1]];
                if (fixed.has(y)) { if (st[x] !== need(y)) { good = false; break; } } else if (y !== t && st[x] === need(y) && st[y] !== need(y)) gain++; }
              if (!good) continue;
              const score = len - (o === 2 ? gain / 2 : gain) * 6;
              if (score < bestScore) { bestScore = score; bestSi = si; bestC = c; }
            }
          }
        }
        if (!bestC) throw new Error('找不到交换子');
        const sp = L.setups[bestSi]; doSeq(sp.concat(bestC.seq, L.inv(sp)));
        if (!ok(st, t)) throw new Error('没放对');
        fixed.add(t); if (o === 2) fixed.add(this.mates[t][0]);
      }
    }
    if (N % 2 === 0) stage3();
    if (!this.isSolved(st)) throw new Error('没复原');
    return this.simplify(out);
  }
  /* 只剩翼棱时：每一步从所有能用的交换子里挑「平均放对一块花的步数」最少的，并往前多看一步 */
  wingCands(st, need, relax, K) {
    const L = this.lib(), idx = L.byXY.get(2), S = this.S, mates = this.mates;
    const ok = i => st[i] === need(i) && st[mates[i][0]] === need(mates[i][0]);
    const wings = [...Array(S).keys()].filter(i => this.type[i] === 2), targets = wings.filter(i => i < mates[i][0] && !ok(i));
    if (!targets.length) return [[], true];
    const list = [];
    for (const t of targets) for (const s of wings) {
      if (s === t || st[s] !== need(t) || st[mates[s][0]] !== need(mates[t][0])) continue;
      for (let si = 0; si < L.setups.length; si++) {
        const sp = L.sPos[si], spi = L.sInv[si], arr = idx.get(sp[s] * 1000 + sp[t]); if (!arr) continue;
        const sl = L.setups[si].length * 2;
        for (const c of arr) {
          let broken = 0, placed = 0;
          for (let k = 0; k < c.mv.length; k += 2) { const x = spi[c.mv[k]], y = spi[c.mv[k + 1]], was = st[y] === need(y), will = st[x] === need(y);
            if (was && !will) broken++; if (!was && will) placed++; }
          if (!placed || broken > (relax ? 2 : 0) || placed <= broken) continue;
          list.push({ len: sl + c.seq.length, gain: (placed - broken * 0.75) / 2, si, c });
        }
      }
    }
    list.sort((a, b) => a.len / a.gain - b.len / b.gain);
    return [list.slice(0, K), false];
  }
  wingsGreedy(st0, need) {
    const L = this.lib(), seqOf = c => L.setups[c.si].concat(c.c.seq, L.inv(L.setups[c.si]));
    let st = st0; const out = [];
    for (let it = 0; it < 80; it++) {
      let [list, done] = this.wingCands(st, need, false, 8);
      if (done) return out;
      if (!list.length) list = this.wingCands(st, need, true, 8)[0];
      if (!list.length) throw new Error('翼棱卡住了');
      let pick = list[0], bs = Infinity;
      for (const c of list) {
        const s2 = this.applyAll(st, seqOf(c));
        let [l2, d2] = this.wingCands(s2, need, false, 1); if (!d2 && !l2.length) l2 = this.wingCands(s2, need, true, 1)[0];
        const sc = d2 ? c.len / c.gain : l2.length ? (c.len + l2[0].len) / (c.gain + l2[0].gain) : 1e9;
        if (sc < bs) { bs = sc; pick = c; }
      }
      const sq = seqOf(pick); st = this.applyAll(st, sq); out.push(...sq);
    }
    throw new Error('翼棱没放完');
  }
  scramble() {
    const N = this.N, gens = Object.keys(this.turns).filter(b => !b.endsWith('w') && !(/^\d/.test(b) && +b[0] > (N >> 1)));
    const out = []; let prev = '';
    for (let i = 0; i < (N === 4 ? 40 : 60); i++) {
      let b; do { b = gens[rnd(gens.length)]; } while (prev && this.layerOf.get(b)[0] === this.layerOf.get(prev)[0]);
      prev = b; out.push(b + ['', "'", '2'][rnd(3)]);
    }
    return out;
  }
}

/* ======================= 五阶中心分阶段（Red5） ======================= */
// 表由 App 那边建好（cube-b5/*.bin），这里只读。阶段和坐标跟 Red5.kt 一一对应，单测用同一份表对得上才算数
class Red5 {
  constructor(b, tables) {
    this.b = b; this.T = tables; const S = b.S, face = i => (i / 25) | 0;
    const outer = [...'UDRLFB'].flatMap(f => [f, f + "'", f + '2']), sl = f => ['2' + f, '2' + f + "'", '2' + f + '2'], all3 = f => ['3' + f, '3' + f + "'", '3' + f + '2'];
    const ms = s => s.split(' ');
    this.M0 = outer.concat([...'UDRLFB'].flatMap(sl));
    this.M1 = outer.concat(sl('R'), sl('L'), ms('2U2 2D2 2F2 2B2'));
    this.M2 = outer.concat(ms('2U2 2D2 2F2 2B2 2R2 2L2'));
    this.N1 = this.M1.concat(all3('R'), all3('U'), all3('F'));
    this.N2 = this.M2.concat(all3('R'), ms('3U2 3F2'));
    this.N3 = this.M2.concat(ms('3R2 3U2 3F2'));
    this.KK = outer.concat(ms('2U2 2D2 3U2'));
    const sel = t => [...Array(S).keys()].filter(i => b.type[i] === t);
    const XP = sel(4), TP = sel(5), FP = sel(3);
    const isLR = p => face(p) === 1 || face(p) === 4, lrc = c => c === 1 || c === 4, udc = c => c === 0 || c === 3;
    const co = (pos, lab, enc) => ({ pos, lab, enc, t: new Array(pos.length), of(st) { for (let k = 0; k < pos.length; k++) this.t[k] = lab(st[pos[k]], k); return enc(this.t); } });
    const b24 = new Array(24), b16 = new Array(16), b8 = new Array(8), b4 = new Array(4);
    this.X1 = co(XP, c => lrc(c) ? 1 : 0, l => combRank(l, 24));
    const xLR = [...Array(24).keys()].filter(k => isLR(XP[k])), xNon = [...Array(24).keys()].filter(k => !isLR(XP[k]));
    this.X2 = co(XP, c => c === 4 ? 2 : c === 1 ? 3 : udc(c) ? 1 : 0, l => {
      for (let i = 0; i < 8; i++) b8[i] = l[xLR[i]] === 2 ? 1 : 0; for (let i = 0; i < 16; i++) b16[i] = l[xNon[i]] === 1 ? 1 : 0;
      return combRank(b8, 8) * 12870 + combRank(b16, 16); });
    const TFP = TP.concat(FP);
    this.TF1 = co(TFP, c => lrc(c) ? 1 : 0, l => { for (let i = 0; i < 24; i++) b24[i] = l[i]; let ax = 0; for (let i = 0; i < 6; i++) if (l[24 + i]) ax = face(FP[i]) % 3; return combRank(b24, 24) * 3 + ax; });
    const tNon = [...Array(24).keys()].filter(k => !isLR(TP[k])), fNon = [...Array(6).keys()].filter(k => !isLR(FP[k])).map(k => k + 24);
    this.TF2 = co(TFP, c => lrc(c) ? 2 : udc(c) ? 1 : 0, l => {
      for (let i = 0; i < 16; i++) b16[i] = l[tNon[i]] === 1 ? 1 : 0; for (let i = 0; i < 4; i++) b4[i] = l[fNon[i]] === 1 ? 1 : 0;
      return combRank(b16, 16) * 6 + combRank(b4, 4); });
    this.PR = [0, 1, 2].map(i => {
      const fa = i, fb = i + 3, s2 = t => [...Array(S).keys()].filter(p => b.type[p] === t && (face(p) === fa || face(p) === fb));
      return co(s2(4).concat(s2(5), s2(3)), c => c === fa ? 1 : 0, l => {
        for (let j = 0; j < 8; j++) b8[j] = l[j]; const a = combRank(b8, 8); for (let j = 0; j < 8; j++) b8[j] = l[8 + j];
        return (a * 70 + combRank(b8, 8)) * 2 + (l[16] ? 0 : 1); });
    });
    const ORDL = ['U', 'D', '2U', '2D', '3U', 'R', 'L', '2R', '2L', '3R', 'F', 'B', '2F', '2B', '3F'];
    this.ORD = Object.fromEntries(ORDL.map((x, i) => [x, i]));
  }
  d(n, i) { const v = this.T[n][i]; return v === 255 || v === -1 ? 99 : v; }
  ida(st0, moves, h, cap) {
    const b = this.b, S = b.S, bases = moves.map(m => b.parse(m)[0]), perms = moves.map(m => b.perm(m));
    const axes = bases.map(x => 'UDRLFB'.indexOf(x.replace(/^[23]/, '')[0]) >> 1), ords = bases.map(x => this.ORD[x]);
    const path = [], buf = []; for (let g = 0; g < 32; g++) buf.push(new Array(S)); let nodes = 0;
    const dfs = (s, g, bound, prev) => {
      if (++nodes > cap) throw new Error('cap');
      const hv = h(s); if (g + hv > bound) return g + hv; if (hv === 0) return -1;
      let min = Infinity; const nxt = buf[g];
      for (let mi = 0; mi < moves.length; mi++) {
        if (prev >= 0 && (bases[mi] === bases[prev] || (axes[mi] === axes[prev] && ords[mi] <= ords[prev]))) continue;
        const pm = perms[mi]; for (let i = 0; i < S; i++) nxt[pm[i]] = s[i];
        path.push(moves[mi]); const r = dfs(nxt, g + 1, bound, mi); if (r === -1) return -1; path.pop();
        if (r < min) min = r;
      }
      return min;
    };
    let bound = h(st0);
    while (bound < 30) { const r = dfs(st0, 0, bound, -1); if (r === -1) return path.slice(); if (r === Infinity) return null; bound = r; }
    return null;
  }
  // 中心全拼好（标准配色：固定中心也回原位）。返回这一段转法，搜不出就 null
  centers(st0, cap = 3e6) {
    try {
      let st = st0.slice(); const out = [], b = this.b;
      const run = (moves, h) => { const p = this.ida(st, moves, h, cap); if (!p) throw new Error('cap'); for (const m of p) st = b.apply(st, m); out.push(...p); };
      run(this.M0, s => this.d('x1', this.X1.of(s)));
      run(this.N1, s => this.d('tf1', this.TF1.of(s)));
      run(this.M1, s => this.d('x2', this.X2.of(s)));
      run(this.N2, s => this.d('tf2', this.TF2.of(s)));
      run(this.N3, s => this.d('pr0', this.PR[0].of(s)));
      run(this.KK, s => this.d('pr1K', this.PR[1].of(s)) + this.d('pr2K', this.PR[2].of(s)));
      for (let i = 0; i < b.S; i++) if (b.type[i] >= 3 && st[i] !== b.faceOf[i]) return null;
      return out;
    } catch (e) { return null; }
  }
}

/* ======================= 学习课和花色（跟 App 的 PuzData.kt 一字不差） ======================= */
// 每一步的演示 = 从复原态先做 setup 摆出起点，再照 alg 一手一手转。公式都拿模型验过动了哪些块
const sp = x => x.split(' ').filter(Boolean);
const invs = (p, x) => sp(x).reverse().map(m => p.inverse(m));
const Step = (title, text, setup, alg, focus) => ({ title, text, setup, alg, focus: focus || null });
function lessons(p) {
  if (p instanceof Pyra) {
    const tipC = (q, i) => q.kind[i] !== 2, edge = (q, i) => q.kind[i] === 2, l2 = "U L R' U' B L R";
    return [
      { name: '认识金字塔', intro: '四个顶点、四个面，先认清能转哪几下', steps: [
        Step('大层和尖角', "每个顶点能转两种：大写 U L R B 转一大层（从顶点往下三分之二），小写 u l r b 只拧最尖上那一小块。\n从那个顶点往下看，顺时针 120° 不带撇，逆时针带撇（U'）。\n按 ▶ 看 U、U'、u、u' 各是什么样。", [], sp("U U' u u'")),
        Step('三种块', '每面 9 格：三个尖角（只会原地拧）、三个轴心（尖角下面那块三色的，也只会原地转）、三个棱（两色，会到处跑）。\n整个复原就是：先把尖角和轴心对好，再把六条棱放回去。', [], sp("L L'"))] },
      { name: '对尖角', intro: '最容易的一步，怎么转都不影响别的块', steps: [
        Step('尖角对轴心', '看每个尖角下面那块轴心：它三面是什么颜色，尖角就转到一样。\n只用小写的 u l r b，一个尖角最多转两下。', sp("u l' r b'"), sp("b r' l u'"), tipC)] },
      { name: '对轴心', intro: '让每一面中间那三块（轴心）同色', steps: [
        Step('转大层对轴心', '四个轴心只会原地转。挑一个颜色（比如底面黄），把带着黄色的三个轴心转到底面：转 L、R、B 这几个大层。\n做完以后每面中间那个倒三角和它两边是同一色。尖角跟着大层一起转，不会被弄乱。', sp(l2), sp("L B'"), tipC)] },
      { name: '底层三条棱', intro: '把黄色那一面拼完整', steps: [
        Step('插入一条底棱', "底面还差的棱先找到它在哪：转 U 把它挪到要去的位置上方，再用「转开—放下—转回」三四下插进去。\n演示这一下：R' B' R B，右边那条棱被带到了底面。插的时候盯着别破坏已经放好的轴心。", sp(l2 + " L B'"), sp("R' B' R B"), edge)] },
      { name: '顶层三条棱', intro: '最后三条棱，两条公式够用', steps: [
        Step('三条棱转一圈', "顶层三条棱位置都不对、但颜色朝向对的时候：R U R' U R U R'，三条棱轮换一圈，别的块都不动。\n转反了就用另一个方向：R U' R' U' R U' R'。", invs(p, "R U R' U R U R'"), sp("R U R' U R U R'"), edge),
        Step('两条棱翻面', "有两条棱在原位但颜色反了：R' L R L' U L' U' L，正好把这两条翻过来，别的不动。", invs(p, "R' L R L' U L' U' L"), sp("R' L R L' U L' U' L"), edge)] },
    ];
  }
  const n = p.N, center = (q, i) => q.type[i] >= 3, wing = (q, i) => q.type[i] === 2;
  const xc = "2R U 2L' U' 2R' U 2L U'", tc = "3R U 2L' U' 3R' U 2L U'", wc = "2U R U R' 2U' R U' R'";
  const flip = "2R U2 2R U2 F2 2R F2 2L' U2 2L U2 2R2", swap = "2R2 U2 2R2 Uw2 2R2 Uw2 U2";
  const L1 = [Step('外层', 'R U F 这些大写字母跟三阶一样，只转最外面那一层。', [], sp("R R'")),
    Step('内层', '前面带数字的是里面的层：2R = 从右面数第 2 层，单独转这一层，方向跟 R 一样。', [], sp("2R 2R'")),
    Step('宽层', 'Rw = 右面带着第 2 层一起转（两层），方向跟 R 一样。奇偶公式里会用到。', [], sp("Rw Rw'"))];
  if (n === 5) L1.push(Step('正中间那层', '五阶正中间那层写 3R（跟 R 同向）。每面最中心那一格永远在面的正中，它定了这一面是什么颜色。', [], sp("3R 3R'")));
  const L2 = [Step(n === 5 ? 'X 心（斜角那四格）' : '三块中心转一圈',
    "核心招式是「交换子」A B A' B'：A 把一块中心带走、B 换个位置、A' 带回来、B' 复原。结果只有三块中心转了一圈，别的全不动。\n这一条：" + xc + '。把要放的那块用 U、F 这类外层先挪到能被带进去的位置（setup），做完再撤回。', invs(p, xc), sp(xc), center)];
  if (n === 5) L2.push(Step('T 心（十字那四格）', 'T 心用正中间那层代替 2R：' + tc + '，同样只转三块。', invs(p, tc), sp(tc), center));
  const L4 = [Step('一组棱两片反了', '最后发现某一组棱的两片翼颜色是反的（左右对不上），不管怎么拼都差这一组：' + flip + '。\n只换这一组棱的两片，别的一块不动。', invs(p, flip), sp(flip), wing)];
  if (n === 4) L4.push(Step('两组棱位置对调', '当三阶解到最后一步，发现只剩两组棱对调（三阶不可能出现）：' + swap + '，前后两组棱换回来。', invs(p, swap), sp(swap), wing));
  return [
    { name: '认识层', intro: p.cn + '多了中间的层', steps: L1 },
    { name: '拼中心', intro: '每面中间那几格拼成同一色', steps: L2 },
    { name: '拼棱', intro: '每组棱的' + (n === 4 ? '两片' : '三片') + '拼成一条', steps: [
      Step('翼棱三块转一圈', '棱也用交换子：' + wc + '，只有三片翼棱换位置，中心和角都不动。\n先把要拼的那片挪到 setup 位置，做完撤回。', invs(p, wc), sp(wc), wing)] },
    { name: '奇偶', intro: '大魔方特有的两种情况', steps: L4 },
    { name: '当三阶解', intro: '中心和棱都好了，就是个大号三阶', steps: [
      Step('照三阶的做法', '每面中心看成一块中心、每组棱看成一块棱，接下来照「三阶」那套学习课做。只用外层（大写）转，拼好的中心和棱不会散。', invs(p, "R U R' U'"), sp("R U R' U'"))] },
  ];
}
function patterns(p) {
  const P = (name, note, alg) => ({ name, note, alg: sp(alg) });
  if (p instanceof Pyra) return [P('尖角花', '四个尖角各拧一下，每面三个角三种颜色', 'u l r b'),
    P('三棱轮换', "顶层三条棱转一圈：前、左、右三面各有一条棱换了颜色", "R U R' U R U R'"),
    P('两格换色', '每面都有两格换成别的颜色，四面一个样', "U L' U L' U L'"), P('尖角 + 换色', '上面两个叠在一起', "u l r b U L' U L' U L'")];
  if (p.N === 4) return [P('大方框', '每面四个角和中间四格是本色，一圈棱换成对面的颜色', 'R2 L2 U2 D2 F2 B2'),
    P('三层套色', '每面四个角是本色，一圈棱是一种颜色，中间四格又是另一种', "2R 2L' 2U 2D' 2F 2B' 2R 2L'")];
  return [P('棋盘格', '每面黑白相间，五乘五的棋盘', 'R2 L2 U2 D2 F2 B2 3R2 3U2 3F2'), P('大十字', '每面正中一个十字换成对面的颜色', '3R2 3U2 3F2'),
    P('大方框', '角和中心不动，棱换成对面的颜色', 'R2 L2 U2 D2 F2 B2')];
}

/* ======================= 对准框拍照：拍摄顺序、框形状、颜色归类（App 的 PuzCamPlan.kt） ======================= */
const CAM_TYP = { U: [205, 222, 45], R: [235, 110, 25], F: [25, 165, 80], D: [200, 208, 214], L: [200, 30, 40], B: [20, 55, 170] };
function rgb2lab(c) {
  const l = c.map(v0 => { const v = v0 / 255; return v > 0.04045 ? ((v + 0.055) / 1.055) ** 2.4 : v / 12.92; });
  const f = t => t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
  const x = f((l[0] * 0.4124 + l[1] * 0.3576 + l[2] * 0.1805) / 0.95047), y = f(l[0] * 0.2126 + l[1] * 0.7152 + l[2] * 0.0722), z = f((l[0] * 0.0193 + l[1] * 0.1192 + l[2] * 0.9505) / 1.08883);
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}
const labDist = (p, q) => { const dL = (p[0] - q[0]) * 0.6, da = p[1] - q[1], db = p[2] - q[2]; return dL * dL + da * da + db * db; };
class CamPlan {
  constructor(puz) {
    this.puz = puz; const pyra = puz instanceof Pyra;
    this.front = pyra ? 0 : 2;
    this.steps = pyra ? [
      { say: '随便一面对着镜头，尖朝上', wholes: [] },
      { say: '整个往左转一格（右边那面转到前面），尖还是朝上', wholes: ['Y'] },
      { say: '再往左转一格', wholes: ['Y', 'Y'] },
      { say: '往左转回第一面，再把底面翻到前面（往下翻）', wholes: ['Fl'] }] : [
      { say: '随便一面对着镜头，记住哪面朝上', wholes: [] },
      { say: '整个往左转一格（右边那面转到前面）', wholes: ['y'] },
      { say: '再往左转一格', wholes: ['y', 'y'] },
      { say: '再往左转一格', wholes: ['y', 'y', 'y'] },
      { say: '往左转回第一面，再整个往下翻一格（上面翻到前面）', wholes: ["x'"] },
      { say: '再往下翻两格（底面翻到前面）', wholes: ['x'] }];
    this.cells = [...Array(puz.S).keys()].filter(i => puz.faceOf[i] === this.front);
    this.map = this.steps.map(s => { const after = puz.applyAll([...Array(puz.S).keys()], s.wholes); return this.cells.map(c => after[c]); });
    const n = puz.nrm[this.cells[0]], u = norm(Mx.cross([0, 1, 0], n)), v = Mx.cross(n, u);
    const raw = this.cells.map(i => puz.poly[i].map(p => [dot(p, u), -dot(p, v)]));
    const xs = raw.flat().map(q => q[0]), ys = raw.flat().map(q => q[1]);
    const x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0, h = Math.max(...ys) - y0, s = 1 / Math.max(w, h), ox = (1 - w * s) / 2, oy = (1 - h * s) / 2;
    this.poly = raw.map(q => q.map(([x, y]) => [ox + (x - x0) * s, oy + (y - y0) * s]));
    this.ctr = this.poly.map(q => [q.reduce((a, b) => a + b[0], 0) / q.length, q.reduce((a, b) => a + b[1], 0) / q.length]);
    this.cellSize = Math.sqrt(1 / this.cells.length) * (pyra ? 0.75 : 1);
  }
  // 每种颜色正好占 S/颜色数 格：典型色起步，贪心 + 两两交换，再拿分到的平均色当新参照，反复几轮
  classify(rgb) {
    const puz = this.puz, nc = puz.palette.length, cap = puz.S / nc, all = [], where = [];
    this.steps.forEach((s, si) => rgb[si].forEach((c, k) => { all.push(rgb2lab(c)); where.push(this.map[si][k]); }));
    const letters = puz instanceof Pyra ? 'FLBU' : 'URFDLB';
    let refs = [...Array(nc).keys()].map(k => rgb2lab(CAM_TYP[letters[k]]));
    const lab = new Array(all.length).fill(-1);
    for (let round = 0; round < 4; round++) {
      const D = (i, k) => labDist(all[i], refs[k]), used = new Array(nc).fill(0); lab.fill(-1);
      const cand = []; for (let i = 0; i < all.length; i++) for (let k = 0; k < nc; k++) cand.push([D(i, k), i, k]);
      cand.sort((a, b) => a[0] - b[0]);
      for (const [, i, k] of cand) { if (lab[i] >= 0 || used[k] >= cap) continue; lab[i] = k; used[k]++; }
      for (let pass = 0; pass < 40; pass++) { let moved = false;
        for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) {
          if (lab[i] === lab[j]) continue;
          if (D(i, lab[j]) + D(j, lab[i]) < D(i, lab[i]) + D(j, lab[j]) - 1e-9) { const t = lab[i]; lab[i] = lab[j]; lab[j] = t; moved = true; } }
        if (!moved) break; }
      refs = refs.map((r, k) => { const m = all.filter((_, i) => lab[i] === k); return m.length ? [0, 1, 2].map(d => m.reduce((a, b) => a + b[d], 0) / m.length) : r; });
    }
    const st = new Array(puz.S).fill(-1); lab.forEach((k, i) => st[where[i]] = k); return st;
  }
}

G.PUZ = { Mx, dot, norm, centroid, Puz, Pyra, Big, Red5, combRank, lessons, patterns, CamPlan, rgb2lab, CN: ['三阶', '金字塔', '四阶', '五阶'], B5_NAMES: ['x1', 'tf1', 'x2', 'tf2', 'pr0', 'pr1K', 'pr2K'] };
})(typeof window !== 'undefined' ? window : globalThis);
