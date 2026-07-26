/* ============================================================
 * core.js — 怪兽实例、成长计算、存档、全局状态
 * ============================================================ */

const SAVE_KEY = 'monsterquest_save_v1';

/* ---------------- 随机 ---------------- */
const rnd = (n) => Math.floor(Math.random() * n);
const rndF = () => Math.random();
const chance = (p) => Math.random() * 100 < p;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/* ---------------- 怪兽实例 ---------------- */
function movesAtLevel(sid, lv) {
  const list = SPECIES[sid].learn.filter((l) => l[0] <= lv).map((l) => l[1]);
  const uniq = [];
  list.forEach((m) => { if (!uniq.includes(m)) uniq.push(m); });
  return uniq.slice(-4).map((k) => ({ key: k, pp: MOVES[k].pp, max: MOVES[k].pp }));
}

function makeMon(sid, lv, opts) {
  opts = opts || {};
  const m = {
    sid: sid,
    nick: null,
    lv: lv,
    exp: lv * lv * lv,
    iv: opts.iv !== undefined ? opts.iv : { hp: rnd(16), atk: rnd(16), def: rnd(16), spd: rnd(16) },
    moves: opts.moves || movesAtLevel(sid, lv),
    status: null,
    slp: 0,
    hp: 0,
    ot: opts.ot || null, // 原训练家（null 表示玩家收服/初始）
  };
  m.hp = maxHP(m);
  return m;
}
function sp(m) { return SPECIES[m.sid]; }
function monName(m) { return m.nick || sp(m).name; }
function maxHP(m) {
  const b = sp(m).stats[0];
  return Math.floor(((b * 2 + m.iv.hp) * m.lv) / 100) + m.lv + 10;
}
function statVal(m, i) {
  const keys = ['hp', 'atk', 'def', 'spd'];
  const b = sp(m).stats[i];
  return Math.floor(((b * 2 + m.iv[keys[i]]) * m.lv) / 100) + 5;
}
const atkOf = (m) => statVal(m, 1);
const defOf = (m) => statVal(m, 2);
const spdOf = (m) => statVal(m, 3);

function expForLv(lv) { return lv * lv * lv; }
function expToNext(m) {
  if (m.lv >= 100) return 1;
  return expForLv(m.lv + 1) - expForLv(m.lv);
}
function expProgress(m) {
  if (m.lv >= 100) return 1;
  const base = expForLv(m.lv);
  return clamp((m.exp - base) / (expForLv(m.lv + 1) - base), 0, 1);
}
function isFainted(m) { return m.hp <= 0; }
function healMon(m) { m.hp = maxHP(m); m.status = null; m.slp = 0; m.moves.forEach((mv) => (mv.pp = mv.max)); }

// 升级后可学的新技能（返回 key 数组）
function newMovesOnLevel(m, lv) {
  return sp(m).learn.filter((l) => l[0] === lv).map((l) => l[1]);
}

/* ---------------- 全局游戏状态 ---------------- */
let G = null;

function newGame(starterId, playerName) {
  G = {
    ver: 1,
    name: playerName || '小智',
    look: { hair: '#3a2a20', shirt: '#e05a4a', pants: '#33405f', cap: '#f0efe8' },
    map: 'town', x: 9, y: 12, dir: 0,
    party: [makeMon(starterId, 5)],
    box: [],
    bag: { ball: 5, potion: 3 },
    money: 1500,
    badges: 0,
    starter: starterId,
    flags: {},          // NPC/事件标记
    dex: { seen: {}, caught: {} },
    steps: 0,
    started: Date.now(),
    playtime: 0,
  };
  G.dex.seen[starterId] = 1; G.dex.caught[starterId] = 1;
  return G;
}

function saveGame() {
  if (!G) return false;
  try {
    G.playtime = (G.playtime || 0) + (Date.now() - (G._t || Date.now()));
    G._t = Date.now();
    localStorage.setItem(SAVE_KEY, JSON.stringify(G));
    return true;
  } catch (e) { return false; }
}
function loadGame() {
  try {
    const s = localStorage.getItem(SAVE_KEY);
    if (!s) return null;
    const d = JSON.parse(s);
    if (!d || !d.party) return null;
    d._t = Date.now();
    G = d;
    return G;
  } catch (e) { return null; }
}
function hasSave() { return !!localStorage.getItem(SAVE_KEY); }
function deleteSave() { localStorage.removeItem(SAVE_KEY); }

/* ---------------- 队伍 / 背包 ---------------- */
function firstAbleIndex() { return G.party.findIndex((m) => !isFainted(m)); }
function partyAlive() { return G.party.some((m) => !isFainted(m)); }
function addToParty(m) {
  if (G.party.length < 6) { G.party.push(m); return 'party'; }
  G.box.push(m); return 'box';
}
function addItem(key, n) { G.bag[key] = (G.bag[key] || 0) + (n || 1); }
function useItemCount(key) {
  G.bag[key]--; if (G.bag[key] <= 0) delete G.bag[key];
}
function bagList(filterKind) {
  return Object.keys(G.bag)
    .filter((k) => ITEMS[k] && (!filterKind || ITEMS[k].kind === filterKind))
    .map((k) => ({ key: k, n: G.bag[k], item: ITEMS[k] }));
}
function healParty() { G.party.forEach(healMon); }

/* ---------------- 图鉴 ---------------- */
function dexSeen(sid) { G.dex.seen[sid] = 1; }
function dexCaught(sid) { G.dex.seen[sid] = 1; G.dex.caught[sid] = 1; }
function dexCount() {
  return { seen: Object.keys(G.dex.seen).length, caught: Object.keys(G.dex.caught).length, total: Object.keys(SPECIES).length };
}

/* ---------------- 野生遭遇 ---------------- */
function rollEncounter(map) {
  const enc = MAPS[map].encounters;
  if (!enc) return null;
  const total = enc.table.reduce((s, r) => s + r[3], 0);
  let r = rnd(total);
  for (const row of enc.table) {
    r -= row[3];
    if (r < 0) {
      const lv = row[1] + rnd(row[2] - row[1] + 1);
      return makeMon(row[0], lv);
    }
  }
  return null;
}

/* ---------------- 捕捉判定 ---------------- */
function catchAttempt(mon, ballRate) {
  const max = maxHP(mon);
  const rate = sp(mon).catchRate;
  const statusBonus = mon.status === 'slp' ? 2 : mon.status ? 1.5 : 1;
  let a = ((3 * max - 2 * mon.hp) / (3 * max)) * rate * ballRate * statusBonus;
  a = clamp(a, 1, 255);
  if (a >= 255) return { caught: true, shakes: 3 };
  const b = 65536 / Math.pow(255 / a, 0.25);
  let shakes = 0;
  for (let i = 0; i < 4; i++) {
    if (Math.random() * 65536 < b) shakes++;
    else return { caught: false, shakes: shakes };
  }
  return { caught: true, shakes: 3 };
}

/* ---------------- 经验 ---------------- */
function expReward(foe, isTrainer) {
  return Math.max(1, Math.floor((sp(foe).exp * foe.lv) / 7 * (isTrainer ? 1.5 : 1)));
}
