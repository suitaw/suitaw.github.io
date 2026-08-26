// build.js —— 把两套题库的 json + md 合并成页面用的数据文件
//   单选题：questions.json    + 题库分类整理.md   → quiz-data.js    （QUIZ_CHAPTERS）
//   判断题：questions-tf.json + 判断题分类整理.md → quiz-data-tf.js （TF_CHAPTERS）
//   node build.js          只校验，不写文件
//   node build.js --write  校验通过后两个文件都写
// 改完任何一份 md 或 json 一定要重跑一次，否则页面上还是旧数据。
// 题面/选项/答案一律取 json（权威），md 只提供分组、核心考点、正确说法、记忆要点、章末表。
const fs = require('fs');
const dir = __dirname + '/';
const QS = JSON.parse(fs.readFileSync(dir + 'questions.json', 'utf8'));
const byId = {}; QS.forEach(q => byId[q.id] = q);
const lines = fs.readFileSync(dir + '题库分类整理.md', 'utf8').split('\n');

const chapters = [];
let ch = null, grp = null, mode = null;   // mode: 'table'
let bq = [];                              // 当前正在累积的 blockquote
let pending = [];                         // 还没拿到 tip 的题
const warn = [];

function flushBq() {
  if (!bq.length) return;
  const text = bq.join('\n').trim();
  bq = [];
  if (!text) return;
  if (pending.length) {                                  // 题后的引用 → tip
    const tip = text.replace(/^记忆要点[^：:]*[：:]\s*/, '');
    pending.forEach(it => { it.tip = it.tip ? it.tip + '\n\n' + tip : tip; });
    pending = [];
  } else if (grp) {                                      // 组标题后的引用 → 核心考点
    const key = text.replace(/^\*\*核心考点\*\*[：:]\s*/, '');
    grp.key = grp.key ? grp.key + '\n\n' + key : key;
  } else if (ch) {
    ch.intro = ch.intro ? ch.intro + '\n\n' + text : text;
  }
}
function newGroup(code, title) {
  flushBq(); pending = [];
  grp = { code, title, key: '', items: [] };
  ch.groups.push(grp);
}

for (let i = 0; i < lines.length; i++) {
  const L = lines[i];

  if (mode === 'table') {                                // 章末数字表：吃到下一个 # / ## 为止
    if (/^#{1,2} /.test(L) && !/^### /.test(L)) mode = null;
    else { ch.table += (ch.table ? '\n' : '') + L; continue; }
  }

  let m;
  if (m = L.match(/^# 第 (\d+) 章 (.+?)（\d+ 题）\s*$/)) {
    flushBq();
    ch = { no: +m[1], title: m[2], intro: '', table: '', groups: [] };
    chapters.push(ch); grp = null; pending = []; continue;
  }
  if (/^# /.test(L)) { flushBq(); ch = null; grp = null; pending = []; continue; }  // 附录等

  if (!ch) continue;

  if (m = L.match(/^## ★ (.+)$/)) { flushBq(); pending = []; grp = null; mode = 'table'; continue; }
  if (m = L.match(/^## (\d+-[A-Z]) 组[｜|](.+)$/)) { newGroup(m[1], m[2].trim()); continue; }
  if (m = L.match(/^### (.+)$/)) {
    if (!grp) continue;
    const parentKey = grp.key, base = grp.code.replace(/[①②③④⑤⑥⑦⑧⑨·].*$/, '');
    const num = m[1].trim().match(/^([①②③④⑤⑥⑦⑧⑨])\s*(.*)$/);   // 「### ④ 怎么装」→ code 8-B④、title「怎么装」
    newGroup(base + (num ? num[1] : '·'), num ? num[2] : m[1].trim());
    grp.key = parentKey;                                 // 子小节继承父组的核心考点
    continue;
  }
  if (m = L.match(/^\*\*第 (\d+) 题\*\*/)) {
    flushBq();
    const q = byId[+m[1]];
    if (!q) { warn.push('md 里有 json 没有的题号 ' + m[1]); continue; }
    if (!grp) { warn.push('第 ' + m[1] + ' 题不在任何组里'); continue; }
    // 跨章重复出现的题（md 里注明「两边都会考」）只收进它在 questions.json 里归属的那一章
    if (+q.category.split(' ')[0] !== ch.no) { pending.push({ set tip(v){}, get tip(){return 1} }); continue; }
    const it = {
      id: q.id, type: q.type, question: q.question, options: q.options,
      answer: q.answer, category: q.category, tip: ''
    };
    if (q.note) it.note = q.note;
    if (q.graphic) it.graphic = true;
    grp.items.push(it); pending.push(it);
    continue;
  }
  if (/^> ?/.test(L)) { bq.push(L.replace(/^> ?/, '')); continue; }
  if (L.trim() === '') { if (bq.length) flushBq(); continue; }
  flushBq();                                             // 普通正文行结束一段引用
}
flushBq();

// 题全被 ### 子小节收走的父组（如 8-B）会剩个空壳，丢掉；
// 它的核心考点已经被每个子组继承过去了，没有信息损失。
chapters.forEach(c => { c.groups = c.groups.filter(g => g.items.length); });

// ---- 校验 ----
const seen = new Set();
chapters.forEach(c => c.groups.forEach(g => g.items.forEach(it => {
  if (seen.has(it.id)) warn.push('题号重复：' + it.id);
  seen.add(it.id);
  if (!it.tip) warn.push('第 ' + it.id + ' 题没有记忆要点');
})));
QS.forEach(q => { if (!seen.has(q.id)) warn.push('第 ' + q.id + ' 题没被收进来'); });
chapters.forEach(c => c.groups.forEach(g => { if (!g.key) warn.push(g.code + ' 组没有核心考点'); }));

// 章末表清掉首尾空行和分隔线
chapters.forEach(c => { c.table = c.table.replace(/^\s+|\s*-{3,}\s*$/g, '').trim(); });

console.log('章 ' + chapters.length + '，组 ' + chapters.reduce((n, c) => n + c.groups.length, 0) +
            '，题 ' + seen.size + ' / ' + QS.length);
console.log(warn.length ? '⚠ 问题 ' + warn.length + ' 处:\n' + warn.slice(0, 40).join('\n') : '✓ 无问题');

const WRITE = process.argv[2] === '--write';
if (WRITE) {
  const head = '// 低压电工作业 · 单选题库数据（由 questions.json + 题库分类整理.md 合并生成，勿手改）\n' +
    '// ' + QS.length + ' 题 / ' + chapters.length + ' 章 / ' +
    chapters.reduce((n, c) => n + c.groups.length, 0) + ' 个考点组。\n' +
    '// 答案取页面标注的「正确答案」；note:"解析有误" 表示 App 里 AI 解析的结论字母是错的。\n' +
    '// 生成时间：' + new Date().toISOString().slice(0, 10) + '\n';
  fs.writeFileSync(dir + 'quiz-data.js',
    head + 'const QUIZ_CHAPTERS = ' + JSON.stringify(chapters, null, 1) + ';\n');
  console.log('已写入 quiz-data.js');
}


/* ════════════════════════════════════════════════════════════════
   判断题（290 题，答案全部是「错误」）
   —— 结构和单选题那套不一样，所以另写一个解析器，不去动上面那段。
   每题在 md 里长这样：
     **第 139 题**　题干（）
     **【答案】错误**
     > **错在**：xxx
     >
     > **正确说法**：★ xxx
     >
     > 记忆要点：★ xxx
   引用块按小标题切成四段：wrong / right / tip / warn（⚠ 开头的存疑说明）。
   有几道题错处不明确，整段都是 ⚠，此时 wrong 和 right 为空，页面要能兜住。
   ════════════════════════════════════════════════════════════════ */
const TFQS = JSON.parse(fs.readFileSync(dir + 'questions-tf.json', 'utf8'));
const tfById = {}; TFQS.forEach(q => tfById[q.id] = q);
const tfLines = fs.readFileSync(dir + '判断题分类整理.md', 'utf8').split('\n');

const tfChapters = [];
const tfWarn = [];
let tc = null, tg = null, tmode = null;
let cur = null, sect = null, buf = {};   // 当前题的四个段
let tbq = [];                            // 题外的引用（章导语 / 组核心考点）

function tfFlushItem() {
  if (!cur) return;
  ['wrong', 'right', 'tip', 'warn'].forEach(k => {
    cur[k] = (buf[k] || []).join('\n').replace(/^\s+|\s+$/g, '');
    if (!cur[k]) delete cur[k];
  });
  cur = null; sect = null; buf = {};
}
function tfFlushBq() {
  if (!tbq.length) return;
  const text = tbq.join('\n').trim(); tbq = [];
  if (!text) return;
  if (tg) {
    const key = text.replace(/^\*\*核心考点\*\*[：:]\s*/, '');   // 页面上「核心考点」是另画的标签，不剥会重复一遍
    tg.key = tg.key ? tg.key + '\n\n' + key : key;
  }
  else if (tc) tc.intro = tc.intro ? tc.intro + '\n\n' + text : text;
}
function tfGroup(code, title) {
  tfFlushItem(); tfFlushBq();
  tg = { code, title, key: '', items: [] };
  tc.groups.push(tg);
}

for (let i = 0; i < tfLines.length; i++) {
  const L = tfLines[i];

  if (tmode === 'table') {                       // 章末必背表，吃到下一个 # / ## 为止
    if (/^#{1,2} /.test(L)) tmode = null;
    else { tc.table += (tc.table ? '\n' : '') + L; continue; }
  }

  let m;
  if (m = L.match(/^# 第 (\d+) 章 (.+?)（\d+ 题）\s*$/)) {
    tfFlushItem(); tfFlushBq();
    tc = { no: +m[1], title: m[2], intro: '', table: '', groups: [] };
    tfChapters.push(tc); tg = null; continue;
  }
  if (/^# /.test(L)) { tfFlushItem(); tfFlushBq(); tc = null; tg = null; continue; }
  if (!tc) continue;

  if (/^## ★ /.test(L)) { tfFlushItem(); tfFlushBq(); tg = null; tmode = 'table'; continue; }
  if (m = L.match(/^## (\d+-[A-Z]) 组[｜|](.+)$/)) { tfGroup(m[1], m[2].trim()); continue; }
  if (/^## /.test(L)) { tfFlushItem(); tfFlushBq(); tg = null; continue; }   // 「全书完」之类

  if (m = L.match(/^\*\*第 (\d+) 题\*\*/)) {
    tfFlushItem(); tfFlushBq();
    const q = tfById[+m[1]];
    if (!q) { tfWarn.push('md 里有 json 没有的题号 ' + m[1]); continue; }
    // 第 3、5 章没分组，题直接挂在章下面 —— 给它们建一个默认组
    if (!tg) tfGroup(tc.no + '-·', tc.title);
    cur = { id: q.id, question: q.question, answer: q.answer, category: q.category };
    sect = null; buf = {};
    tg.items.push(cur);
    continue;
  }

  if (/^> ?/.test(L)) {
    const t = L.replace(/^> ?/, '');
    if (!cur) { tbq.push(t); continue; }         // 题外的引用
    const s0 = t.trim();
    if (/^\*{0,2}⚠/.test(s0)) sect = 'warn';
    else if (/^\*\*错在\*\*/.test(s0)) { sect = 'wrong'; }
    else if (/^\*\*正确说法\*\*/.test(s0)) { sect = 'right'; }
    else if (/^记忆要点/.test(s0)) { sect = 'tip'; }
    else if (!sect) sect = 'wrong';              // 没写「错在」的特殊题，先归到 wrong
    let body = t;
    if (sect === 'wrong') body = body.replace(/^\*\*错在\*\*[：:]\s*/, '');
    if (sect === 'right') body = body.replace(/^\*\*正确说法\*\*[：:]\s*/, '');
    if (sect === 'tip') body = body.replace(/^记忆要点[^：:]*[：:]\s*/, '');
    (buf[sect] = buf[sect] || []).push(body);
    continue;
  }
  if (L.trim() === '') continue;                 // 空行不打断（引用块内部用「>」空行分段）
  if (/^---+\s*$/.test(L)) { tfFlushItem(); continue; }
  if (/^\*\*【答案】/.test(L)) continue;          // 答案取 json，这行只是给人看的
  tfFlushItem(); tfFlushBq();
}
tfFlushItem(); tfFlushBq();

// ---- 判断题校验 ----
const tfSeen = new Set();
tfChapters.forEach(c => c.groups.forEach(g => g.items.forEach(it => {
  if (tfSeen.has(it.id)) tfWarn.push('题号重复：' + it.id);
  tfSeen.add(it.id);
  if (it.answer !== '错误') tfWarn.push('第 ' + it.id + ' 题答案不是「错误」：' + it.answer);
  if (!it.tip) tfWarn.push('第 ' + it.id + ' 题没有记忆要点');
  if (!it.right && !it.warn) tfWarn.push('第 ' + it.id + ' 题既没有正确说法也没有存疑说明');
  if (+it.category.split(' ')[0] !== c.no) tfWarn.push('第 ' + it.id + ' 题归错章了');
})));
TFQS.forEach(q => { if (!tfSeen.has(q.id)) tfWarn.push('第 ' + q.id + ' 题没被收进来'); });
tfChapters.forEach(c => { c.table = c.table.replace(/^\s+|\s*-{3,}\s*$/g, '').trim(); });

const tfNoKey = tfChapters.reduce((n, c) => n + c.groups.filter(g => !g.key).length, 0);
const tfFlagged = Array.from(tfSeen).filter(id => {
  let f = false;
  tfChapters.forEach(c => c.groups.forEach(g => g.items.forEach(it => { if (it.id === id && it.warn) f = true })));
  return f;
}).length;

console.log('');
console.log('判断题：章 ' + tfChapters.length + '，组 ' + tfChapters.reduce((n, c) => n + c.groups.length, 0) +
            '，题 ' + tfSeen.size + ' / ' + TFQS.length +
            '，带 ⚠ 标注 ' + tfFlagged + ' 题' + (tfNoKey ? '（' + tfNoKey + ' 个组没写核心考点，不影响）' : ''));
console.log(tfWarn.length ? '⚠ 问题 ' + tfWarn.length + ' 处:\n' + tfWarn.slice(0, 40).join('\n') : '✓ 无问题');

if (WRITE) {
  const head = '// 低压电工作业 · 判断题库数据（由 questions-tf.json + 判断题分类整理.md 合并生成，勿手改）\n' +
    '// ' + TFQS.length + ' 题 / ' + tfChapters.length + ' 章 / ' +
    tfChapters.reduce((n, c) => n + c.groups.length, 0) + ' 个考点组。\n' +
    '// 这批题的答案「全部是错误」，所以不做判对错的刷题，只做「找出错在哪个词 + 背正确说法」。\n' +
    '// 每题字段：wrong 错在哪 / right 正确说法 / tip 记忆要点 / warn 存疑或原解析有误的说明。\n' +
    '// 生成时间：' + new Date().toISOString().slice(0, 10) + '\n';
  fs.writeFileSync(dir + 'quiz-data-tf.js',
    head + 'const TF_CHAPTERS = ' + JSON.stringify(tfChapters, null, 1) + ';\n');
  console.log('已写入 quiz-data-tf.js');
}
