/* ============================================================
 * data.js — 游戏数据：属性 / 技能 / 怪兽 / 道具 / 地图 / NPC
 * ============================================================ */

/* ---------------- 属性 ---------------- */
const TYPES = {
  normal: { name: '普通', color: '#b0aa92' },
  grass: { name: '草', color: '#5cba5c' },
  fire: { name: '火', color: '#ef7038' },
  water: { name: '水', color: '#4aa2ee' },
  electric: { name: '电', color: '#eec02c' },
  rock: { name: '岩', color: '#b09256' },
  bug: { name: '虫', color: '#9bbf3a' },
  ghost: { name: '幽灵', color: '#7a5cc0' },
};

// 攻击方 -> { 防守方: 倍率 }
const TYPE_CHART = {
  normal: { rock: 0.5, ghost: 0 },
  grass: { water: 2, rock: 2, grass: 0.5, fire: 0.5, bug: 0.5 },
  fire: { grass: 2, bug: 2, fire: 0.5, water: 0.5, rock: 0.5 },
  water: { fire: 2, rock: 2, water: 0.5, grass: 0.5 },
  electric: { water: 2, electric: 0.5, grass: 0.5, rock: 0.5 },
  rock: { fire: 2, bug: 2, grass: 0.5 },
  bug: { grass: 2, ghost: 0.5, fire: 0.5, rock: 0.5 },
  ghost: { ghost: 2, normal: 0 },
};
function typeEff(atk, def) {
  const r = TYPE_CHART[atk];
  return r && r[def] !== undefined ? r[def] : 1;
}

/* ---------------- 技能 ---------------- */
// cat: phys(物理) / status(变化)
// eff: {status,chance} 异常 | {stat,stage,target,chance} 能力变化 | {drain} 吸血 | {heal} 回复
// pri: 先制度; sure: 必中; hiCrit: 高暴击
const MOVES = {
  tackle: { name: '撞击', type: 'normal', power: 40, acc: 100, pp: 35 },
  scratch: { name: '抓挠', type: 'normal', power: 40, acc: 100, pp: 35 },
  quick: { name: '电光一闪', type: 'normal', power: 40, acc: 100, pp: 30, pri: 1 },
  slam: { name: '猛撞', type: 'normal', power: 80, acc: 85, pp: 20 },
  hyper: { name: '巨力冲击', type: 'normal', power: 100, acc: 80, pp: 5 },
  tailwhip: { name: '摇尾巴', type: 'normal', cat: 'status', acc: 100, pp: 30, eff: { stat: 'def', stage: -1, target: 'foe' } },
  growl: { name: '叫声', type: 'normal', cat: 'status', acc: 100, pp: 30, eff: { stat: 'atk', stage: -1, target: 'foe' } },
  harden: { name: '变硬', type: 'normal', cat: 'status', acc: 999, pp: 30, eff: { stat: 'def', stage: 1, target: 'self' } },
  swords: { name: '剑舞', type: 'normal', cat: 'status', acc: 999, pp: 20, eff: { stat: 'atk', stage: 2, target: 'self' } },
  agility: { name: '高速移动', type: 'normal', cat: 'status', acc: 999, pp: 20, eff: { stat: 'spd', stage: 2, target: 'self' } },
  recover: { name: '自我再生', type: 'normal', cat: 'status', acc: 999, pp: 10, eff: { heal: 0.5 } },
  sing: { name: '催眠术', type: 'normal', cat: 'status', acc: 65, pp: 15, eff: { status: 'slp' } },
  twave: { name: '电磁波', type: 'electric', cat: 'status', acc: 90, pp: 20, eff: { status: 'par' } },
  toxic: { name: '毒粉', type: 'grass', cat: 'status', acc: 85, pp: 20, eff: { status: 'psn' } },

  vine: { name: '藤鞭', type: 'grass', power: 45, acc: 100, pp: 25 },
  absorb: { name: '吸取', type: 'grass', power: 45, acc: 100, pp: 25, eff: { drain: 0.5 } },
  razor: { name: '飞叶快刀', type: 'grass', power: 60, acc: 95, pp: 25, hiCrit: true },
  synth: { name: '光合作用', type: 'grass', cat: 'status', acc: 999, pp: 10, eff: { heal: 0.5 } },
  solar: { name: '阳光烈焰', type: 'grass', power: 110, acc: 90, pp: 5 },

  ember: { name: '火花', type: 'fire', power: 45, acc: 100, pp: 25, eff: { status: 'brn', chance: 10 } },
  fwheel: { name: '火焰轮', type: 'fire', power: 65, acc: 100, pp: 25, eff: { status: 'brn', chance: 10 } },
  flame: { name: '喷射火焰', type: 'fire', power: 90, acc: 100, pp: 15, eff: { status: 'brn', chance: 15 } },
  fblast: { name: '烈焰冲', type: 'fire', power: 110, acc: 85, pp: 5, eff: { status: 'brn', chance: 30 } },

  bubble: { name: '泡沫', type: 'water', power: 45, acc: 100, pp: 30, eff: { stat: 'spd', stage: -1, target: 'foe', chance: 20 } },
  wgun: { name: '水枪', type: 'water', power: 55, acc: 100, pp: 25 },
  surf: { name: '冲浪', type: 'water', power: 90, acc: 100, pp: 15 },
  hydro: { name: '水炮', type: 'water', power: 110, acc: 80, pp: 5 },

  spark: { name: '电击', type: 'electric', power: 45, acc: 100, pp: 30, eff: { status: 'par', chance: 10 } },
  zap: { name: '闪电束', type: 'electric', power: 65, acc: 100, pp: 20, eff: { status: 'par', chance: 10 } },
  tbolt: { name: '十万伏特', type: 'electric', power: 90, acc: 100, pp: 15, eff: { status: 'par', chance: 10 } },
  thunder: { name: '打雷', type: 'electric', power: 110, acc: 75, pp: 5, eff: { status: 'par', chance: 30 } },

  rthrow: { name: '落石', type: 'rock', power: 50, acc: 90, pp: 20 },
  rtomb: { name: '岩石封锁', type: 'rock', power: 60, acc: 95, pp: 15, eff: { stat: 'spd', stage: -1, target: 'foe', chance: 100 } },
  rslide: { name: '岩崩', type: 'rock', power: 90, acc: 90, pp: 10 },

  bite: { name: '虫咬', type: 'bug', power: 50, acc: 100, pp: 20 },
  xsci: { name: '剪刀十字', type: 'bug', power: 80, acc: 100, pp: 15 },
  swind: { name: '银风', type: 'bug', power: 70, acc: 100, pp: 10, eff: { stat: 'atk', stage: 1, target: 'self', chance: 20 } },

  lick: { name: '舌舔', type: 'ghost', power: 40, acc: 100, pp: 30, eff: { status: 'par', chance: 25 } },
  spunch: { name: '暗影拳', type: 'ghost', power: 60, acc: 999, pp: 20, sure: true },
  sball: { name: '暗影球', type: 'ghost', power: 90, acc: 100, pp: 15, eff: { stat: 'def', stage: -1, target: 'foe', chance: 20 } },

  struggle: { name: '挣扎', type: 'normal', power: 50, acc: 100, pp: 1, noPP: true },
  dbolt: { name: '龙雷冲', type: 'electric', power: 120, acc: 90, pp: 5, eff: { status: 'par', chance: 20 } },
};

/* ---------------- 怪兽 ---------------- */
// stats: [hp, atk, def, spd]
// learn: [[等级, 技能key], ...]
const SPECIES = {
  1: {
    name: '叶灵', types: ['grass'], stats: [45, 49, 49, 45], catchRate: 45, exp: 64,
    evo: { to: 2, lv: 16 }, dex: '背上的叶片能吸收阳光。心情好的时候会散发青草香。',
    art: { body: 'round', colors: ['#6ec26e', '#d5eaa8', '#3f8f4a'], ears: 'long', extra: 'leaf', tail: 'leaf', mouth: 'smile' , size: 0.72 },
    learn: [[1, 'tackle'], [1, 'growl'], [6, 'vine'], [10, 'absorb'], [15, 'tailwhip'], [20, 'razor'], [26, 'synth'], [33, 'solar']],
  },
  2: {
    name: '藤兽', types: ['grass'], stats: [60, 62, 63, 60], catchRate: 45, exp: 142,
    evo: { to: 3, lv: 32 }, dex: '藤蔓能像鞭子一样甩动，在森林中穿行如飞。',
    art: { body: 'quad', colors: ['#4fae5e', '#c6e08e', '#2d7a3c'], ears: 'pointy', extra: 'leaf', tail: 'leaf', pattern: 'spot' , size: 0.86 },
    learn: [[1, 'tackle'], [1, 'vine'], [10, 'absorb'], [16, 'razor'], [22, 'toxic'], [28, 'synth'], [36, 'solar']],
  },
  3: {
    name: '森王', types: ['grass'], stats: [80, 84, 83, 80], catchRate: 45, exp: 236,
    dex: '被称为森林的守护者。一声怒吼能让整片林子沙沙作响。',
    art: { body: 'tall', colors: ['#3d9a55', '#a8d878', '#256b33'], ears: 'horn', extra: 'spike', tail: 'leaf', eyes: 'angry', mouth: 'fang' },
    learn: [[1, 'razor'], [1, 'vine'], [22, 'toxic'], [30, 'swords'], [36, 'synth'], [42, 'solar']],
  },
  4: {
    name: '焰狐', types: ['fire'], stats: [39, 52, 43, 65], catchRate: 45, exp: 65,
    evo: { to: 5, lv: 16 }, dex: '尾巴的火焰会随情绪变化。生气时火苗蹿得老高。',
    art: { body: 'quad', colors: ['#f08a4a', '#ffd9a8', '#c2471f'], ears: 'pointy', tail: 'flame' , size: 0.72 },
    learn: [[1, 'scratch'], [1, 'growl'], [6, 'ember'], [12, 'quick'], [18, 'fwheel'], [26, 'agility'], [34, 'flame']],
  },
  5: {
    name: '炎狼', types: ['fire'], stats: [58, 64, 58, 80], catchRate: 45, exp: 142,
    evo: { to: 6, lv: 32 }, dex: '奔跑时留下的脚印会冒烟，速度快得难以捕捉。',
    art: { body: 'quad', colors: ['#e8703a', '#ffc78a', '#a83a18'], ears: 'pointy', tail: 'flame', extra: 'flame', eyes: 'angry', pattern: 'stripe' , size: 0.86 },
    learn: [[1, 'scratch'], [1, 'ember'], [12, 'quick'], [18, 'fwheel'], [28, 'agility'], [36, 'flame'], [42, 'fblast']],
  },
  6: {
    name: '烈焰君', types: ['fire'], stats: [78, 86, 78, 100], catchRate: 45, exp: 240,
    dex: '据说它一次呼吸的温度足以熔化岩石，很少认真战斗。',
    art: { body: 'tall', colors: ['#e05a2a', '#ffb070', '#8f2c10'], ears: 'horn', extra: 'flame', tail: 'flame', eyes: 'angry', mouth: 'fang' },
    learn: [[1, 'fwheel'], [1, 'quick'], [30, 'swords'], [38, 'flame'], [46, 'fblast']],
  },
  7: {
    name: '水泡', types: ['water'], stats: [44, 48, 65, 43], catchRate: 45, exp: 66,
    evo: { to: 8, lv: 16 }, dex: '喜欢在浅滩打盹，遇到危险会吐出成串的泡泡逃走。',
    art: { body: 'round', colors: ['#5ab6f0', '#cbeaff', '#2f7fc0'], ears: 'fin', tail: 'short', mouth: 'smile' , size: 0.72 },
    learn: [[1, 'tackle'], [1, 'tailwhip'], [6, 'bubble'], [12, 'wgun'], [18, 'harden'], [26, 'recover'], [34, 'surf']],
  },
  8: {
    name: '涌龟', types: ['water'], stats: [59, 63, 82, 58], catchRate: 45, exp: 143,
    evo: { to: 9, lv: 32 }, dex: '壳非常坚硬，能承受落石。缩进壳里时几乎无懈可击。',
    art: { body: 'shell', colors: ['#4aa0e8', '#cdeaff', '#8a6a3a'], ears: 'fin', mouth: 'smile' , size: 0.86 },
    learn: [[1, 'tackle'], [1, 'bubble'], [12, 'wgun'], [18, 'harden'], [26, 'recover'], [34, 'surf'], [40, 'hydro']],
  },
  9: {
    name: '潮汐兽', types: ['water'], stats: [79, 83, 100, 78], catchRate: 45, exp: 239,
    dex: '背上的宝石会随潮汐发光，据说能呼唤海浪。',
    art: { body: 'wide', colors: ['#3a86d8', '#bfe4ff', '#2a5f9a'], ears: 'fin', extra: 'gem', eyes: 'angry' },
    learn: [[1, 'wgun'], [1, 'harden'], [30, 'recover'], [38, 'surf'], [46, 'hydro']],
  },
  10: {
    name: '电鼠', types: ['electric'], stats: [35, 55, 40, 90], catchRate: 190, exp: 82,
    evo: { to: 11, lv: 22 }, dex: '脸颊的电囊储存着静电，紧张时会噼啪作响。',
    art: { body: 'round', colors: ['#f5d24a', '#fff0b0', '#e8853a'], ears: 'pointy', tail: 'bolt', extra: 'cheek', eyes: 'happy' , size: 0.7 },
    learn: [[1, 'tackle'], [1, 'growl'], [5, 'spark'], [10, 'quick'], [16, 'twave'], [22, 'zap'], [30, 'agility'], [36, 'tbolt']],
  },
  11: {
    name: '雷兽', types: ['electric'], stats: [60, 90, 55, 110], catchRate: 75, exp: 175,
    dex: '毛发全部竖起时，方圆十米内都能闻到臭氧的味道。',
    art: { body: 'quad', colors: ['#efc832', '#fff0b0', '#e07020'], ears: 'pointy', tail: 'bolt', extra: 'spike', eyes: 'angry', mouth: 'fang' , size: 0.94 },
    learn: [[1, 'spark'], [1, 'quick'], [24, 'zap'], [30, 'agility'], [38, 'tbolt'], [46, 'thunder']],
  },
  12: {
    name: '岩甲', types: ['rock'], stats: [50, 60, 92, 25], catchRate: 190, exp: 86,
    evo: { to: 13, lv: 24 }, dex: '把自己伪装成路边的石头，一动不动能待上一整天。',
    art: { body: 'bug', colors: ['#a89060', '#d8c898', '#6e5a34'], ears: 'horn', extra: 'spike', pattern: 'plate', eyes: 'angry' , size: 0.75 },
    learn: [[1, 'tackle'], [1, 'harden'], [6, 'rthrow'], [12, 'bite'], [18, 'rtomb'], [26, 'slam'], [34, 'rslide']],
  },
  13: {
    name: '岩铠兽', types: ['rock'], stats: [75, 90, 125, 35], catchRate: 60, exp: 190,
    dex: '全身覆盖岩层铠甲，撞碎山壁开路是它的日常。',
    art: { body: 'wide', colors: ['#98835a', '#c8b88a', '#5e4c28'], ears: 'horn', extra: 'spike', eyes: 'angry', mouth: 'fang', pattern: 'plate' },
    learn: [[1, 'rthrow'], [1, 'harden'], [26, 'rtomb'], [32, 'slam'], [38, 'rslide'], [44, 'hyper']],
  },
  14: {
    name: '幽魂', types: ['ghost'], stats: [45, 50, 45, 72], catchRate: 190, exp: 95,
    evo: { to: 15, lv: 26 }, dex: '喜欢躲在森林深处，突然出现在旅人身后偷笑。',
    art: { body: 'ghost', colors: ['#8a6ad0', '#c8b4f0', '#5a3fa0'], eyes: 'glow', mouth: 'fang' , size: 0.74 },
    learn: [[1, 'lick'], [1, 'growl'], [8, 'spunch'], [14, 'sing'], [22, 'absorb'], [30, 'sball'], [38, 'recover']],
  },
  15: {
    name: '夜魔', types: ['ghost'], stats: [70, 82, 70, 98], catchRate: 45, exp: 204,
    dex: '深夜出没的高等幽灵，据说能潜入人的梦境。',
    art: { body: 'ghost', colors: ['#6f52b8', '#b49ce8', '#40287f'], eyes: 'glow', mouth: 'fang', extra: 'crown' , size: 0.96 },
    learn: [[1, 'spunch'], [1, 'sing'], [28, 'sball'], [34, 'agility'], [40, 'recover'], [46, 'hyper']],
  },
  16: {
    name: '绒蛾', types: ['bug'], stats: [40, 45, 40, 56], catchRate: 255, exp: 53,
    evo: { to: 17, lv: 20 }, dex: '翅膀上的鳞粉会随风飘散，让追赶的敌人打喷嚏。',
    art: { body: 'bug', colors: ['#b8d05a', '#e8f0b8', '#7a8f30'], ears: 'antenna', wings: 'bug', pattern: 'stripe' , size: 0.7 },
    learn: [[1, 'tackle'], [1, 'toxic'], [7, 'bite'], [13, 'quick'], [20, 'swind'], [28, 'xsci']],
  },
  17: {
    name: '剑蛾', types: ['bug'], stats: [65, 85, 60, 78], catchRate: 90, exp: 168,
    dex: '双臂的刃能一击斩断树干，是森林里的剑客。',
    art: { body: 'bug', colors: ['#9ec03a', '#dfeaa0', '#5f7a20'], ears: 'antenna', wings: 'bug', eyes: 'angry', extra: 'spike', pattern: 'stripe' , size: 0.92 },
    learn: [[1, 'bite'], [1, 'quick'], [22, 'swind'], [28, 'xsci'], [34, 'swords'], [42, 'hyper']],
  },
  18: {
    name: '布布', types: ['normal'], stats: [55, 45, 45, 50], catchRate: 255, exp: 56,
    evo: { to: 19, lv: 20 }, dex: '毛茸茸的圆球，性格温顺，常常跟在旅人后面。',
    art: { body: 'round', colors: ['#e8d8c0', '#fff6e8', '#c0a888'], ears: 'round', tail: 'short', eyes: 'happy', mouth: 'smile' , size: 0.72 },
    learn: [[1, 'tackle'], [1, 'tailwhip'], [6, 'quick'], [12, 'growl'], [18, 'slam'], [26, 'recover']],
  },
  19: {
    name: '大布布', types: ['normal'], stats: [90, 72, 72, 55], catchRate: 120, exp: 165,
    dex: '吃饱后会睡上三天。抱起来像一床温暖的被子。',
    art: { body: 'wide', colors: ['#dccbb0', '#fff2e0', '#b09878'], ears: 'round', tail: 'short', mouth: 'smile', pattern: 'spot' , size: 0.96 },
    learn: [[1, 'slam'], [1, 'tackle'], [24, 'harden'], [30, 'recover'], [38, 'hyper']],
  },
  20: {
    name: '天雷龙', types: ['electric'], stats: [95, 100, 88, 108], catchRate: 5, exp: 320,
    legendary: true, dex: '传说中盘旋在静谧湖上空的雷之守护者，百年才现身一次。',
    art: { body: 'serpent', colors: ['#7fd8f0', '#e8fbff', '#f5d24a'], ears: 'fin', extra: 'spike', eyes: 'glow', wings: 'bat', mouth: 'fang' },
    learn: [[1, 'zap'], [1, 'agility'], [1, 'twave'], [30, 'tbolt'], [36, 'hyper'], [44, 'dbolt']],
  },
};

/* ---------------- 道具 ---------------- */
const ITEMS = {
  ball: { name: '精灵球', kind: 'ball', rate: 1, price: 200, desc: '最基础的捕捉道具。' },
  greatball: { name: '超级球', kind: 'ball', rate: 1.5, price: 600, desc: '捕捉率比精灵球更高。' },
  ultraball: { name: '高级球', kind: 'ball', rate: 2, price: 1200, desc: '性能极佳的捕捉道具。' },
  potion: { name: '伤药', kind: 'heal', amount: 30, price: 300, desc: '回复 30 点 HP。' },
  spotion: { name: '好伤药', kind: 'heal', amount: 80, price: 700, desc: '回复 80 点 HP。' },
  hpotion: { name: '厉害伤药', kind: 'heal', amount: 200, price: 1500, desc: '回复 200 点 HP。' },
  antidote: { name: '万灵药', kind: 'cure', price: 250, desc: '治愈所有异常状态。' },
  revive: { name: '复活草', kind: 'revive', price: 1500, desc: '让濒死的伙伴以半血复活。' },
};

/* ---------------- 地图 ----------------
 * 图块：
 *  . 草地   , 高草(遇敌)   R 路   f 花   B 桥   L 室内地板   M 出口地垫   c 洞窟地面
 *  # 树     X 岩壁        ~ 水    = 栅栏  W 民居 C 中心 S 商店 G 道馆  w 室内墙
 *  D 门     s 招牌        T 柜台  P 治疗台  b 书架  t 桌子
 * ------------------------------------------------------------ */
const WALKABLE = '.,RfBLMcD';

const MAPS = {
  town: {
    name: '新叶镇', theme: '#7fc46a',
    rows: [
      '#########RR#########',
      '#..f.....RR.....f..#',
      '#.CCCCC..RR..SSSSS.#',
      '#.CCCCC..RR..SSSSS.#',
      '#.CCDCC..RR..SSDSS.#',
      '#...RRRRRRRRRRRR...#',
      '#...R....RR....R...#',
      '#.WWWWW..RR..WWWWW.#',
      '#.WWWWW..RR..WWWWW.#',
      '#.WWDWW..RR..WWDWW.#',
      '#...RRRRRRRRRRRR...#',
      '#.s.f....RR....f.f.#',
      '#........RR........#',
      '#..~~~...RR......f.#',
      '#..~~~...RR........#',
      '####################',
    ],
    warps: [
      { x: 4, y: 4, to: 'centerA', tx: 5, ty: 9 },
      { x: 15, y: 4, to: 'shopA', tx: 5, ty: 9 },
      { x: 4, y: 9, to: 'house1', tx: 5, ty: 9 },
      { x: 15, y: 9, to: 'house2', tx: 5, ty: 9 },
      { x: 9, y: 0, to: 'route1', tx: 9, ty: 25 },
      { x: 10, y: 0, to: 'route1', tx: 10, ty: 25 },
    ],
    npcs: [
      { id: 'sign_town', x: 2, y: 11, sign: true, text: ['「新叶镇 —— 一切旅程的起点」'] },
      { id: 'prof', x: 8, y: 12, dir: 0, look: { hair: '#d8d8d8', shirt: '#e8e8f0', pants: '#5a5a6a' }, name: '橡树博士', wander: false,
        text: ['橡树博士：路上的高草丛里藏着野生怪兽。', '想收服它们的话，别忘了先把对方打虚弱，再丢精灵球！', '中心可以免费治疗，商店能补给道具。'] },
      { id: 'kid1', x: 13, y: 6, dir: 0, look: { hair: '#3a2a20', shirt: '#5ac0e0', pants: '#4a4a5a', cap: '#e05a4a' }, name: '小男孩', wander: true,
        text: ['北边的一号道路通向幽暗森林。', '听说森林里有会突然出现的幽灵怪兽…好可怕。'] },
      { id: 'rival', x: 9, y: 8, dir: 0, look: { hair: '#8a3a2a', shirt: '#8a5ad0', pants: '#333344' }, name: '劲敌 小岚', rival: true,
        text: ['小岚：哟，你也拿到伙伴了？', '正好，让我看看你的实力！'],
        trainer: { team: [], money: 300, winText: '小岚：不错嘛…下次不会输了！', loseText: '小岚：哈哈，还早得很呢！' },
        afterText: ['小岚：我要去道馆挑战了，你也快点跟上来吧！'] },
    ],
  },

  centerA: {
    name: '治疗中心', indoor: true, theme: '#d8607a',
    rows: [
      'wwwwwwwwwwww',
      'wwwwwwwwwwww',
      'wLLLPPLLbbLw',
      'wTTTTTLLLLLw',
      'wLLLLLLLLLLw',
      'wLLLLLLLLLLw',
      'wLLttLLttLLw',
      'wLLttLLttLLw',
      'wLLLLLLLLLLw',
      'wLLLLLLLLLLw',
      'wwwwwMMwwwww',
    ],
    warps: [{ x: 5, y: 10, to: 'town', tx: 4, ty: 5 }, { x: 6, y: 10, to: 'town', tx: 4, ty: 5 }],
    npcs: [
      { id: 'nurse_a', x: 2, y: 2, dir: 0, look: { hair: '#f090a8', shirt: '#f5f5f5', pants: '#f090a8' }, name: '护士', heal: true, text: [] },
      { id: 'ca1', x: 8, y: 5, dir: 0, look: { hair: '#4a3a2a', shirt: '#6ac06a', pants: '#3a4a5a' }, name: '旅行者', text: ['怪兽的 HP 归零就会陷入濒死，', '快带它们来中心休息吧，这里免费！'] },
    ],
  },

  shopA: {
    name: '道具商店', indoor: true, theme: '#4a90d8',
    rows: [
      'wwwwwwwwwwww',
      'wwwwwwwwwwww',
      'wLLLLLLLbbbw',
      'wTTTTLLLbbbw',
      'wLLLLLLLLLLw',
      'wLLLLLLLLLLw',
      'wLLLLLLLLLLw',
      'wbbLLLLLLttw',
      'wbbLLLLLLttw',
      'wLLLLLLLLLLw',
      'wwwwwMMwwwww',
    ],
    warps: [{ x: 5, y: 10, to: 'town', tx: 15, ty: 5 }, { x: 6, y: 10, to: 'town', tx: 15, ty: 5 }],
    npcs: [
      { id: 'clerkA', x: 2, y: 2, dir: 3, look: { hair: '#2a2a2a', shirt: '#4a90d8', pants: '#2a3a4a' }, name: '店员',
        shop: ['ball', 'greatball', 'potion', 'spotion', 'antidote'], text: [] },
    ],
  },

  house1: {
    name: '民居', indoor: true, theme: '#c08a5a',
    rows: [
      'wwwwwwwwwwww',
      'wwwwwwwwwwww',
      'wbbLLLLLttLw',
      'wLLLLLLLttLw',
      'wLLLLLLLLLLw',
      'wLLLLLLLLLLw',
      'wLLttLLLLLLw',
      'wLLttLLLLbbw',
      'wLLLLLLLLLLw',
      'wLLLLLLLLLLw',
      'wwwwwMMwwwww',
    ],
    warps: [{ x: 5, y: 10, to: 'town', tx: 4, ty: 10 }, { x: 6, y: 10, to: 'town', tx: 4, ty: 10 }],
    npcs: [
      { id: 'mom', x: 3, y: 4, dir: 0, look: { hair: '#7a4a2a', shirt: '#e0a0c0', pants: '#6a5a4a' }, name: '妈妈',
        text: ['妈妈：出门在外要照顾好自己，也要照顾好怪兽哦。', '（你感到浑身充满了干劲！）'], healOnce: true },
      { id: 'gift', x: 9, y: 5, dir: 0, look: { hair: '#3a2a20', shirt: '#c0c060', pants: '#4a4a3a' }, name: '爷爷',
        text: ['爷爷：年轻人，拿去用吧，路上小心。'], giveItem: { key: 'potion', n: 3 },
        afterText: ['爷爷：属性克制很重要，火克草、草克水、水克火，记住喽。'] },
    ],
  },

  house2: {
    name: '民居', indoor: true, theme: '#c08a5a',
    rows: [
      'wwwwwwwwwwww',
      'wwwwwwwwwwww',
      'wLLttLLLLbbw',
      'wLLttLLLLLLw',
      'wLLLLLLLLLLw',
      'wLLLLLLLLLLw',
      'wLLLLLLbbLLw',
      'wLLttLLLLLLw',
      'wLLttLLLLLLw',
      'wLLLLLLLLLLw',
      'wwwwwMMwwwww',
    ],
    warps: [{ x: 5, y: 10, to: 'town', tx: 15, ty: 10 }, { x: 6, y: 10, to: 'town', tx: 15, ty: 10 }],
    npcs: [
      { id: 'girl', x: 7, y: 4, dir: 0, look: { hair: '#c05a8a', shirt: '#f0d060', pants: '#5a4a6a' }, name: '女孩',
        text: ['怪兽在战斗中会累积经验值，等级提升后还会学会新技能。', '有些孩子长大了会进化成完全不同的样子呢！'] },
    ],
  },

  route1: {
    name: '一号道路', theme: '#8ac86a',
    encounters: { rate: 0.14, table: [[18, 2, 5, 35], [16, 2, 5, 30], [10, 3, 6, 15], [1, 3, 5, 7], [4, 3, 5, 7], [7, 3, 5, 6]] },
    rows: [
      '########RR##########',
      '#####,,,RR,,,,######',
      '####,,,,RR,,,,,#####',
      '###,,,,,RR,,,,,,####',
      '###,,,,,RR,,,,,,####',
      '###.....RR......####',
      '###.###.RR.###..####',
      '###.###.RR.###..####',
      '###.....RRR.....####',
      '###,,,,,,RR,,,,,####',
      '###,,,,,,RR,,,,,####',
      '###,,,,,,RR,,,,,####',
      '###......RR......###',
      '#~~~~....RR....===##',
      '#~~~~~...RR....===##',
      '#~~~~BBBBRRB...===##',
      '#~~~~....RR....===##',
      '#........RR........#',
      '#.,,,,...RR...,,,,.#',
      '#.,,,,...RR...,,,,.#',
      '#.,,,,...RR...,,,,.#',
      '#........RR........#',
      '#...s....RR........#',
      '#........RR........#',
      '#########RR#########',
      '#########RR#########',
    ],
    warps: [
      { x: 9, y: 25, to: 'town', tx: 9, ty: 1 }, { x: 10, y: 25, to: 'town', tx: 10, ty: 1 },
      { x: 8, y: 0, to: 'forest', tx: 10, ty: 21 }, { x: 9, y: 0, to: 'forest', tx: 10, ty: 21 },
    ],
    npcs: [
      { id: 'sign_r1', x: 4, y: 22, sign: true, text: ['「一号道路 ↑ 幽暗森林 / ↓ 新叶镇」', '在高草丛中行走会遇到野生怪兽。'] },
      { id: 't_youth', x: 6, y: 12, dir: 2, look: { hair: '#3a2a20', shirt: '#60c060', pants: '#3a4a5a', cap: '#ffffff' }, name: '短裤小子 阿德', sight: 4,
        text: ['阿德：喂！你也是训练家吧？来打一场！'],
        trainer: { team: [[18, 5], [16, 6]], money: 240, winText: '阿德：哇…我还得多练练。', loseText: '阿德：耶！我赢啦！' },
        afterText: ['阿德：往北走就是森林，那里的怪兽比这儿强。'] },
      { id: 't_bug', x: 14, y: 8, dir: 1, look: { hair: '#4a5a20', shirt: '#a0c040', pants: '#5a5a3a', cap: '#7a8a30' }, name: '虫系爱好者 小昆', sight: 4,
        text: ['小昆：虫系怪兽的美，你懂吗！'],
        trainer: { team: [[16, 6], [16, 7]], money: 280, winText: '小昆：唔…我的虫子还需要成长。', loseText: '小昆：虫系最强！' },
        afterText: ['小昆：火系对虫系特别有效，要小心哦。'] },
      { id: 'ball_r1', x: 3, y: 19, item: { key: 'ball', n: 5 }, ground: true },
    ],
  },

  forest: {
    name: '幽暗森林', theme: '#4f8a4a', dark: true,
    encounters: { rate: 0.18, table: [[16, 7, 11, 30], [14, 7, 11, 22], [1, 8, 11, 16], [18, 7, 10, 16], [17, 10, 12, 8], [10, 8, 11, 8]] },
    rows: [
      '######........######',
      '#####,,,,,,,,,,#####',
      '####,,,,,,,,,,,,####',
      '###,,,,####,,,,,,###',
      '###,,,,####,,,,,,###',
      '###,,,,,,,,,,,,,,###',
      '###....,,,,,,....,##',
      '###.##.,,,,,,.##.,##',
      '###.##.......###..##',
      '###.....##.......###',
      '##,,,,,,##,,,,,,,###',
      '##,,,,,,,,,,,,,,,###',
      '##,,,,,,,,,,,,,,,###',
      '##....,,,,,,,,....##',
      '##.##.......##....##',
      '##.##.,,,,,.##..s.##',
      '##....,,,,,........#',
      '###,,,,,,,,,,,,,,###',
      '###,,,,,,,,,,,,,,###',
      '####,,,,,,,,,,,,####',
      '#####..........#####',
      '##########..########',
      '##########..########',
    ],
    warps: [
      { x: 10, y: 21, to: 'route1', tx: 9, ty: 1 }, { x: 11, y: 21, to: 'route1', tx: 9, ty: 1 },
      { x: 10, y: 22, to: 'route1', tx: 9, ty: 1 }, { x: 11, y: 22, to: 'route1', tx: 9, ty: 1 },
      { x: 6, y: 0, to: 'town2', tx: 10, ty: 15 }, { x: 7, y: 0, to: 'town2', tx: 10, ty: 15 },
      { x: 8, y: 0, to: 'town2', tx: 10, ty: 15 }, { x: 9, y: 0, to: 'town2', tx: 10, ty: 15 },
      { x: 10, y: 0, to: 'town2', tx: 10, ty: 15 }, { x: 11, y: 0, to: 'town2', tx: 10, ty: 15 },
      { x: 12, y: 0, to: 'town2', tx: 10, ty: 15 }, { x: 13, y: 0, to: 'town2', tx: 10, ty: 15 },
    ],
    npcs: [
      { id: 'sign_f', x: 16, y: 15, sign: true, text: ['「幽暗森林 —— 树影深处，请注意脚下」'] },
      { id: 't_camp', x: 11, y: 9, dir: 0, look: { hair: '#5a4a2a', shirt: '#c07a3a', pants: '#4a4a3a', cap: '#8a5a2a' }, name: '露营者 小茂', sight: 4,
        text: ['小茂：森林里迷路了？先赢了我再说！'],
        trainer: { team: [[14, 10], [16, 10], [18, 11]], money: 480, winText: '小茂：你比我想的要强。', loseText: '小茂：森林可不是好惹的。' },
        afterText: ['小茂：北边就是岩港镇，那里有道馆。'] },
      { id: 't_ghost', x: 5, y: 16, dir: 2, look: { hair: '#2a2a3a', shirt: '#6a4a9a', pants: '#3a2a4a' }, name: '灵异少女 幽子', sight: 3,
        text: ['幽子：呵呵…你听见树叶后面的笑声了吗？'],
        trainer: { team: [[14, 11], [14, 12]], money: 520, winText: '幽子：真可惜…下次再一起玩吧。', loseText: '幽子：呵呵，做个好梦。' },
        afterText: ['幽子：普通属性的招式打不中幽灵哦，记住了。'] },
      { id: 'ball_f', x: 15, y: 3, item: { key: 'spotion', n: 2 }, ground: true },
      { id: 'ball_f2', x: 3, y: 11, item: { key: 'greatball', n: 3 }, ground: true },
    ],
  },

  town2: {
    name: '岩港镇', theme: '#8aa8c0',
    rows: [
      '####################',
      '#..f..##GGGGG#..f..#',
      '#.....##GGGGG#.....#',
      '#.CCCCC#GGDGG#SSSS.#',
      '#.CCCCC..RR...SSSS.#',
      '#.CCDCC..RR...SSDS.#',
      '#...RRRRRRRRRRRR...#',
      '#...R....RR....R...#',
      '#........RR........#',
      '#..s.....RR.....===#',
      '#........RRRRRRRRR.#',
      '#~~~.....RR.....===#',
      '#~~~~....RR....~~~~#',
      '#~~~~....RR....~~~~#',
      '#~~~~....RR....~~~~#',
      '#~~~~....RR....~~~~#',
      '#########RR#########',
    ],
    warps: [
      { x: 4, y: 5, to: 'centerB', tx: 5, ty: 9 },
      { x: 16, y: 5, to: 'shopB', tx: 5, ty: 9 },
      { x: 10, y: 3, to: 'gym', tx: 7, ty: 14 },
      { x: 9, y: 16, to: 'forest', tx: 10, ty: 1 }, { x: 10, y: 16, to: 'forest', tx: 10, ty: 1 },
      { x: 18, y: 10, to: 'cave', tx: 3, ty: 17, needBadge: true },
    ],
    npcs: [
      { id: 'sign_t2', x: 3, y: 9, sign: true, text: ['「岩港镇 —— 岩之道馆所在地」'] },
      { id: 'guard', x: 16, y: 10, gateOpen: { x: 13, y: 9 }, dir: 1, look: { hair: '#2a2a2a', shirt: '#3a5a8a', pants: '#2a3a4a', cap: '#3a5a8a' }, name: '守卫', gate: true,
        text: ['守卫：东边的雷鸣洞窟很危险。', '拿到岩之徽章的训练家才可以通行。'],
        afterText: ['守卫：一路小心，洞窟深处通向静谧湖。'] },
      { id: 'gymfan', x: 12, y: 6, dir: 0, look: { hair: '#8a6a3a', shirt: '#d0a060', pants: '#5a4a3a' }, name: '镇民',
        text: ['道馆馆主石岚用的是岩系怪兽。', '草系和水系的招式对岩系特别有效！'] },
    ],
  },

  centerB: {
    name: '治疗中心', indoor: true, theme: '#d8607a',
    rows: [
      'wwwwwwwwwwww',
      'wwwwwwwwwwww',
      'wLLLPPLLbbLw',
      'wTTTTTLLLLLw',
      'wLLLLLLLLLLw',
      'wLLLLLLLLLLw',
      'wLLttLLttLLw',
      'wLLttLLttLLw',
      'wLLLLLLLLLLw',
      'wLLLLLLLLLLw',
      'wwwwwMMwwwww',
    ],
    warps: [{ x: 5, y: 10, to: 'town2', tx: 4, ty: 6 }, { x: 6, y: 10, to: 'town2', tx: 4, ty: 6 }],
    npcs: [
      { id: 'nurse_b', x: 2, y: 2, dir: 0, look: { hair: '#f090a8', shirt: '#f5f5f5', pants: '#f090a8' }, name: '护士', heal: true, text: [] },
      { id: 'cb1', x: 8, y: 5, dir: 0, look: { hair: '#3a3a3a', shirt: '#70a0d0', pants: '#3a3a4a' }, name: '登山家',
        text: ['雷鸣洞窟里雷电不断，据说是因为湖上的传说怪兽。'] },
    ],
  },

  shopB: {
    name: '道具商店', indoor: true, theme: '#4a90d8',
    rows: [
      'wwwwwwwwwwww',
      'wwwwwwwwwwww',
      'wLLLLLLLbbbw',
      'wTTTTLLLbbbw',
      'wLLLLLLLLLLw',
      'wLLLLLLLLLLw',
      'wLLLLLLLLLLw',
      'wbbLLLLLLttw',
      'wbbLLLLLLttw',
      'wLLLLLLLLLLw',
      'wwwwwMMwwwww',
    ],
    warps: [{ x: 5, y: 10, to: 'town2', tx: 16, ty: 6 }, { x: 6, y: 10, to: 'town2', tx: 16, ty: 6 }],
    npcs: [
      { id: 'clerkB', x: 2, y: 2, dir: 3, look: { hair: '#2a2a2a', shirt: '#4a90d8', pants: '#2a3a4a' }, name: '店员',
        shop: ['ball', 'greatball', 'ultraball', 'spotion', 'hpotion', 'antidote', 'revive'], text: [] },
    ],
  },

  gym: {
    name: '岩之道馆', indoor: true, theme: '#a08050',
    rows: [
      'wwwwwwwwwwwwww',
      'wLLLLLLLLLLLLw',
      'wLLLLLLLLLLLLw',
      'wLLXXLLLLXXLLw',
      'wLLXXLLLLXXLLw',
      'wLLLLLLLLLLLLw',
      'wLLLLLLLLLLLLw',
      'wLLLLXXXXLLLLw',
      'wLLLLXXXXLLLLw',
      'wLLLLLLLLLLLLw',
      'wLLLLLLLLLLLLw',
      'wLLXXLLLLXXLLw',
      'wLLXXLLLLXXLLw',
      'wLLLLLLLLLLLLw',
      'wwwwwwMMwwwwww',
    ],
    warps: [{ x: 6, y: 14, to: 'town2', tx: 10, ty: 4 }, { x: 7, y: 14, to: 'town2', tx: 10, ty: 4 }],
    npcs: [
      { id: 'g_leader', x: 6, y: 2, dir: 0, look: { hair: '#5a3a2a', shirt: '#a07040', pants: '#4a3a2a' }, name: '馆主 石岚', leader: true,
        text: ['石岚：我是岩之道馆的馆主，石岚。', '想拿到徽章，就用你的实力说服我这块顽石吧！'],
        trainer: { team: [[12, 14], [12, 15], [13, 17]], money: 1600, winText: '石岚：好…你的实力我认可了。这枚岩之徽章归你！', loseText: '石岚：还太嫩了，回去再练练。' },
        afterText: ['石岚：东边的洞窟对你开放了，去见识更广阔的世界吧。'] },
      { id: 'g1', x: 3, y: 6, dir: 2, look: { hair: '#3a2a2a', shirt: '#c0a070', pants: '#4a4a3a' }, name: '道馆训练家 阿岩', sight: 4,
        text: ['阿岩：想见馆主？先过我这关！'],
        trainer: { team: [[12, 12], [12, 13]], money: 600, winText: '阿岩：唔…去吧，馆主在里面。', loseText: '阿岩：岩系的防御可不是摆设！' },
        afterText: ['阿岩：馆主的岩铠兽防御极高，速战速决比较好。'] },
      { id: 'g2', x: 10, y: 10, dir: 1, look: { hair: '#4a3a2a', shirt: '#b09060', pants: '#4a4a3a', cap: '#8a6a40' }, name: '道馆训练家 阿磐', sight: 4,
        text: ['阿磐：坚如磐石的意志，接招吧！'],
        trainer: { team: [[12, 13], [13, 14]], money: 700, winText: '阿磐：败得心服口服。', loseText: '阿磐：磐石不可撼动！' },
        afterText: ['阿磐：草系和水系招式能打出双倍伤害，好好利用。'] },
    ],
  },

  cave: {
    name: '雷鸣洞窟', indoor: true, theme: '#6a6a8a', cavern: true,
    encounters: { rate: 0.16, table: [[12, 14, 18, 30], [10, 14, 18, 25], [14, 15, 19, 20], [13, 17, 20, 12], [11, 18, 21, 8], [19, 16, 19, 5]] },
    rows: [
      'XXXXXXXXXXXXXXXXXXXX',
      'XccccXXXXXXXXccccccX',
      'XccccccXXXXXcccccccX',
      'XXXXcccccXXXcccXXXcX',
      'XXXXXcccccXXcccXXXcX',
      'XccXXXcccccccccXXXcX',
      'XcccXXXccXXXXccXXXcX',
      'XccccXXccXXXXccccccX',
      'XXcccccccXXXXXXXXccX',
      'XXXcccccXXXXXXXXXccX',
      'XXXXcccXXXcccccccccX',
      'XXXXcccccccccXXXcccX',
      'XXXXXXcccXXXXXXXcccX',
      'XccccXcccXXXXXXXcccX',
      'XcccccccXXXXXXXXcccX',
      'XccccccXXXXXXXXXcccX',
      'XXccXXXXXXXXXXXXcccX',
      'XXccXXXXXXXXXXXXXXXX',
    ],
    warps: [
      { x: 2, y: 17, to: 'town2', tx: 18, ty: 10 }, { x: 3, y: 17, to: 'town2', tx: 18, ty: 10 },
      { x: 17, y: 1, to: 'lake', tx: 10, ty: 17 }, { x: 18, y: 1, to: 'lake', tx: 10, ty: 17 },
    ],
    npcs: [
      { id: 't_hiker', x: 5, y: 10, dir: 0, look: { hair: '#3a2a1a', shirt: '#c07030', pants: '#4a4a4a', cap: '#e0c040' }, name: '登山家 大石', sight: 4,
        text: ['大石：洞窟里的怪兽可比外面凶多了！'],
        trainer: { team: [[13, 18], [12, 18], [11, 20]], money: 1400, winText: '大石：好身手！往上走就是出口。', loseText: '大石：哈哈，山里的规矩就是这样。' },
        afterText: ['大石：湖边有雷鸣声…那可不是普通的怪兽。'] },
      { id: 'ball_c', x: 5, y: 14, item: { key: 'ultraball', n: 3 }, ground: true },
      { id: 'ball_c2', x: 18, y: 7, item: { key: 'hpotion', n: 2 }, ground: true },
    ],
  },

  lake: {
    name: '静谧湖', theme: '#5aa0d0',
    encounters: { rate: 0.12, table: [[7, 18, 22, 30], [8, 20, 24, 20], [10, 18, 22, 20], [16, 18, 22, 15], [11, 22, 25, 10], [15, 24, 27, 5]] },
    rows: [
      '####################',
      '#..,,,..........,,.#',
      '#.,,,,....~~....,,.#',
      '#..,,...~~~~~~..,,.#',
      '#......~~~~~~~~....#',
      '#....~~~~~~~~~~~~..#',
      '#...~~~~~~~~~~~~~~.#',
      '#..~~~~~~~~~~~~~~~.#',
      '#..~~~~~~~~~~~~~~~.#',
      '#..~~~~~~~~~~~~~~..#',
      '#...~~~~~~~~~~~~...#',
      '#....~~~~~~~~~~....#',
      '#.....~~~~~~~~.....#',
      '#..,,...~~~~....,,.#',
      '#.,,,,..........,,.#',
      '#..,,....RRR.....,.#',
      '#........RRR.......#',
      '#########RRR########',
    ],
    warps: [
      { x: 9, y: 17, to: 'cave', tx: 17, ty: 2 }, { x: 10, y: 17, to: 'cave', tx: 17, ty: 2 }, { x: 11, y: 17, to: 'cave', tx: 17, ty: 2 },
    ],
    npcs: [
      { id: 'legend', x: 10, y: 13, dir: 0, legendary: true, look: { hair: '#dddddd', shirt: '#88ddff', pants: '#446688' },
        name: '？？？', text: ['湖面泛起涟漪，雷光在水汽中炸开…', '天雷龙出现了！'] },
      { id: 'sage', x: 15, y: 15, dir: 1, look: { hair: '#d0d0d0', shirt: '#7a6ab0', pants: '#4a4a6a' }, name: '老者',
        text: ['老者：静谧湖的中央…住着雷之守护者。', '它极难收服，去之前请做好万全准备。'] },
    ],
  },
};

/* 校验地图行宽一致（开发期自检） */
(function validateMaps() {
  for (const k in MAPS) {
    const m = MAPS[k];
    m.w = m.rows[0].length; m.h = m.rows.length;
    m.rows.forEach((r, i) => {
      if (r.length !== m.w) console.error('地图宽度不一致:', k, '第' + i + '行', r.length, '≠', m.w);
    });
  }
})();
