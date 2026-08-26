// build.js —— 由 questions.json + 题库分类整理.md 合并生成 quiz-data.js
//   node build.js          只校验，不写文件
//   node build.js --write  校验通过后写 quiz-data.js
// 改完 md 或 json 一定要重跑一次，否则页面上还是旧数据。
// 题面/选项/答案一律取 questions.json（权威），md 只提供分组、核心考点、记忆要点、章末表。
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

if (process.argv[2] === '--write') {
  const head = '// 低压电工作业 · 题库数据（由 questions.json + 题库分类整理.md 合并生成，勿手改）\n' +
    '// ' + QS.length + ' 题 / ' + chapters.length + ' 章 / ' +
    chapters.reduce((n, c) => n + c.groups.length, 0) + ' 个考点组。\n' +
    '// 答案取页面标注的「正确答案」；note:"解析有误" 表示 App 里 AI 解析的结论字母是错的。\n' +
    '// 生成时间：' + new Date().toISOString().slice(0, 10) + '\n';
  fs.writeFileSync(dir + 'quiz-data.js',
    head + 'const QUIZ_CHAPTERS = ' + JSON.stringify(chapters, null, 1) + ';\n');
  console.log('已写入 quiz-data.js');
}
