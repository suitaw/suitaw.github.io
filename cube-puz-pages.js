/* cube-puz-pages.js —— 金字塔 / 四阶 / 五阶 的四个页签（跟原生 App 的 PuzPages.kt / PuzCam.kt 对应）
 * 选了三阶以外的魔方时，四个页签都换成 #pzRoot 里这一套；三阶的页面原样不动。
 * 每页标题旁一颗「三阶 ▾」换魔方（三阶的四页也有，由这里插进它们的顶栏）
 */
(function () {
'use strict';
const { PRACTICE, TUTORIAL, INPUT, VIEW, PLAY_CN, esc, q, hex, CN } = window.PZ_CONST;
const { Pyra, Big, lessons, patterns, CamPlan, Mx, dot, norm } = window.PUZ;
const PZ = window.PZ;
const SVG = {
  undo: '<svg viewBox="0 0 24 24"><path d="M9 7 4.5 11.5 9 16"/><path d="M5 11.5h9.5a5 5 0 0 1 0 10H11"/></svg>',
  tip: '<svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/></svg>',
  more: '<svg viewBox="0 0 24 24"><circle cx="5.5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="18.5" cy="12" r="1.2"/></svg>',
  help: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.6 9.3a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.4M12 16.8v.2"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7"/></svg>',
  flip: { u: '<path d="M6 15l6-6 6 6"/>', d: '<path d="M6 9l6 6 6-6"/>', l: '<path d="M15 6l-6 6 6 6"/>', r: '<path d="M9 6l6 6-6 6"/>' },
};
const FLIP_CN = { u: '整个魔方往上翻一格', d: '整个魔方往下翻一格', l: '整个魔方往左转一格', r: '整个魔方往右转一格' };
const TAB_PAGE = ['pIn', 'pGo', 'pPr', 'pTu', 'pPat'];
let curTab = 0, ro = null, timerT = null;

/* ---- 换魔方 ---- */
function chip() { return `<button class="pzChip" title="换一种魔方">${CN[PZ.k]} ▾</button>`; }
function pickSheet() {
  let el = q('pzPick');
  if (!el) { el = document.createElement('div'); el.id = 'pzPick'; el.className = 'sheet'; document.body.appendChild(el);
    el.addEventListener('click', e => { if (e.target === el) el.classList.remove('on'); }); }
  const notes = ['3×3，最常见的那种', '四面体，四个顶点能转', '4×4，中心不固定', '5×5，层多块多'];
  el.innerHTML = `<div class="sheetCard"><b style="font-size:17px">换一种魔方</b>
    <p class="sub1" style="margin:4px 0 10px">四个页签（复原、练习、学习、花色）一起换；每种魔方的进度和成绩分开记</p>
    ${CN.map((n, k) => `<button class="pzOpt${k === PZ.k ? ' on' : ''}" data-k="${k}"><canvas width="60" height="60"></canvas><span><b>${n}</b><i>${notes[k]}</i></span>${k === PZ.k ? '<em>✓</em>' : ''}</button>`).join('')}</div>`;
  el.querySelectorAll('.pzOpt').forEach(b => {
    drawIcon(b.querySelector('canvas'), +b.dataset.k, b.classList.contains('on'));
    b.onclick = () => { el.classList.remove('on'); setPuzzle(+b.dataset.k); };
  });
  el.classList.add('on');
}
function drawIcon(cv, k, on) {
  const g = cv.getContext('2d'), w = cv.width; g.strokeStyle = on ? '#ffe98a' : '#eceff4'; g.lineWidth = 3; g.lineJoin = 'round';
  if (k === 1) { g.beginPath(); g.moveTo(w / 2, w * 0.1); g.lineTo(w * 0.94, w * 0.88); g.lineTo(w * 0.06, w * 0.88); g.closePath(); g.stroke();
    g.lineWidth = 2; for (const t of [1 / 3, 2 / 3]) { const y = w * 0.1 + w * 0.78 * t; g.beginPath(); g.moveTo(w / 2 - w * 0.44 * t, y); g.lineTo(w / 2 + w * 0.44 * t, y); g.stroke(); } return; }
  const n = k === 0 ? 3 : k + 2, a = w * 0.1, s = w - 2 * a; g.strokeRect(a, a, s, s); g.lineWidth = 1.6;
  for (let j = 1; j < n; j++) { const x = a + s * j / n; g.beginPath(); g.moveTo(x, a); g.lineTo(x, a + s); g.moveTo(a, x); g.lineTo(a + s, x); g.stroke(); }
}
function setPuzzle(k) {
  PZ.saveAll(); PZ.k = k; try { localStorage.setItem('cube_puz_k', String(k)); } catch (e) {}
  if (k) PZ.warm(k);
  sync3x3Chips(); goTab(curTab === 1 ? 0 : curTab);
}
// 三阶那四页的顶栏：标题旁插一颗「三阶 ▾」
function sync3x3Chips() {
  const spots = [['pIn', '.appBar b'], ['pPr', '#prTitle'], ['patStart', '.appBar b'], ['pTu', '.appBar b']];
  for (const [id, sel] of spots) { const host = q(id); if (!host) continue; const b = host.querySelector(sel); if (!b) continue;
    let c = host.querySelector('.pzChip'); if (!c) { b.insertAdjacentHTML('afterend', chip()); c = host.querySelector('.pzChip'); c.onclick = pickSheet; b.style.flex = '0 0 auto'; }
    c.textContent = CN[PZ.k] + ' ▾'; }
}

/* ---- 页面切换：goTab 之后调 ---- */
function show(tab) {
  curTab = tab;
  const root = q('pzRoot');
  if (!PZ.k) { root.classList.remove('on'); root.innerHTML = ''; return; }
  for (const p of TAB_PAGE) q(p) && q(p).classList.remove('on');
  root.classList.add('on'); clearInterval(timerT);
  if (ro) { ro.disconnect(); ro = null; }
  const k = PZ.k;
  if (tab === 0) pageInput(root, PZ.view(k, INPUT));
  else if (tab === 2 || tab === 1) pagePractice(root, PZ.view(k, PRACTICE));
  else if (tab === 3) pageLearn(root, PZ.view(k, TUTORIAL));
  else pagePat(root, PZ.view(k, VIEW));
}

/* ---- 舞台：画布 + 四边翻面箭头 + 计时行 ---- */
function stageHtml(v) {
  return `<div class="pzStage"><canvas></canvas>
    ${v.mode === PRACTICE ? '<div class="pzBar"><b class="pzT">0:00</b><button class="pzSw">▶ 手动计时</button><span class="pzN">0 步</span></div>' : ''}
    <div class="flip">${'udlr'.split('').map(f => `<button data-f="${f}" aria-label="${FLIP_CN[f]}"><svg viewBox="0 0 24 24">${SVG.flip[f]}</svg></button>`).join('')}</div></div>`;
}
function stageBind(root, v) {
  const st = root.querySelector('.pzStage'), cv = st.querySelector('canvas');
  v.attach(cv);
  st.querySelectorAll('.flip button').forEach(b => { b.onpointerdown = e => e.stopPropagation(); b.onclick = () => v.flip(b.dataset.f); });
  ro = new ResizeObserver(() => { const r = st.getBoundingClientRect(); st.querySelector('.flip').classList.toggle('side', (r.height - 0.85 * Math.min(r.width, r.height)) / 2 < (v.mode === PRACTICE ? 90 : 52)); v.resize(); });
  ro.observe(st);
  if (v.mode === PRACTICE) {
    const T = st.querySelector('.pzT'), N = st.querySelector('.pzN'), SW = st.querySelector('.pzSw');
    const fmt = t => Math.floor(t / 60000) + ':' + String(Math.floor(t / 1000) % 60).padStart(2, '0') + '.' + String(Math.floor(t / 10) % 100).padStart(2, '0');
    const tick = () => {
      const ms = !v.t0 ? 0 : v.running ? Date.now() - v.t0 : v.elapsed;
      T.textContent = Math.floor(ms / 60000) + ':' + String(Math.floor(ms / 1000) % 60).padStart(2, '0'); T.style.visibility = cfg('timer') > 0.5 ? '' : 'hidden';
      N.textContent = v.steps + ' 步';
      const run = v.manT0 !== 0, m2 = run ? Date.now() - v.manT0 : v.manMs;
      SW.textContent = run ? '■ ' + fmt(m2) : m2 >= 0 ? '↺ ' + fmt(m2) : '▶ 手动计时'; SW.classList.toggle('run', run);
    };
    SW.onclick = () => { const t = Date.now(); if (v.manT0) { v.manMs = t - v.manT0; v.manT0 = 0; } else if (v.manMs >= 0) v.manMs = -1; else v.manT0 = t; tick(); };
    tick(); timerT = setInterval(tick, 50);
  }
}
const cfg = k => { try { return prCfg(k); } catch (e) { return 1; } };
function bar(title, right, opts = {}) {
  return `<div class="appBar">${opts.back ? `<button class="ic back pzBack" title="返回">${SVG.back}</button>` : ''}<b>${esc(title)}</b>${opts.noChip ? '' : chip()}<span style="flex:1"></span>${right || ''}</div>`;
}
function wireChip(root) { root.querySelectorAll('.pzChip').forEach(c => c.onclick = pickSheet); }
function sheet(root, id, html) {
  let el = root.querySelector('#' + id);
  if (!el) { el = document.createElement('div'); el.id = id; el.className = 'sheet'; root.appendChild(el);
    el.addEventListener('click', e => { if (e.target === el || e.target.closest('.shClose')) el.classList.remove('on'); }); }
  el.innerHTML = `<div class="sheetCard">${html}</div>`; el.classList.add('on'); return el;
}

/* ======================= 练习页 ======================= */
function pagePractice(root, v) {
  root.className = 'page on pzFull';
  root.innerHTML = bar('自己练', `<button class="ic" id="pzUndo" title="撤销">${SVG.undo}</button><button class="ic" id="pzTip" title="提示下一步">${SVG.tip}</button><button class="ic" id="pzMore" title="更多：摆正视角、回复原、成绩、设置">${SVG.more}</button>`)
    + stageHtml(v) + `<div id="pzMsg" class="pzMsg"></div><div id="pzCtl"></div>
    <div id="pzKeys" class="pzKeys"></div><button id="pzKbd" class="pzSmall"></button>`;
  wireChip(root); stageBind(root, v);
  q('pzUndo').onclick = () => v.undo(); q('pzTip').onclick = () => v.tip();
  q('pzMore').onclick = () => moreSheet(root, v);
  let kbd = localStorage.getItem('cube_pz_kbd') === '1';
  const keys = () => { q('pzKeys').style.display = kbd ? '' : 'none'; q('pzKbd').textContent = kbd ? '收起记号键盘' : '⌨ 记号键盘';
    const per = v.puz.keys.length % 8 === 0 ? 8 : 6; q('pzKeys').style.gridTemplateColumns = `repeat(${per},1fr)`;
    q('pzKeys').innerHTML = v.puz.keys.map(k => `<button data-k="${k}" title="${esc(v.puz.moveCn(k))}">${k}</button>`).join('');
    q('pzKeys').querySelectorAll('button').forEach(b => b.onclick = () => v.turn(b.dataset.k)); };
  q('pzKbd').onclick = () => { kbd = !kbd; try { localStorage.setItem('cube_pz_kbd', kbd ? '1' : '0'); } catch (e) {} keys(); };
  keys();
  v.onChange = () => { msgLine(v); ctl(); PZ.saveAll(); };
  const ctl = () => {
    if (v.plan) { planBar(q('pzCtl'), v); return; }
    q('pzCtl').innerHTML = `<div class="row2"><button class="pri" id="pzScr">打乱</button><button id="pzSolve">${v.solving ? '正在算…' : '复原它 · 跟着转'}</button></div>`;
    q('pzScr').onclick = () => v.scramble(); q('pzSolve').onclick = () => v.planStart();
  };
  msgLine(v); ctl();
}
function msgLine(v) { const m = q('pzMsg'); if (!m) return; m.textContent = v.msg; m.classList.toggle('win', v.win); }
function moreSheet(root, v) {
  const h = v.hist, list = PZ.times(v.puz), own = list.filter(r => !r.a), best = own.length ? Math.min(...own.map(r => r.t)) : null;
  const f = x => x == null ? '—' : fmtTT(x);
  const el = sheet(root, 'pzMoreSh', `<div class="row3"><button class="shClose" id="pzHome">摆正视角</button><button class="shClose" id="pzReset">回复原</button><button class="shClose" id="pzSet">设置</button></div>
    <div class="stHd" style="margin-top:16px">转动记录 · ${h.length} 步</div>
    ${v.scram ? `<p class="sub1" style="margin:4px 0">打乱：${esc(v.scram)}</p>` : ''}
    ${h.length ? '<p class="sub1" style="margin:4px 0 6px">点某一步就退回到那一步之后</p><div class="pzHist">' + h.map((m, i) => `<button class="shClose${i === h.length - 1 ? ' on' : ''}" data-n="${i + 1}">${m}</button>`).join('') + '</div>' : '<p class="sub1">还没转过</p>'}
    <div class="pzStats" style="margin-top:16px">${list.length ? `<div class="stHd">成绩 · 共 ${list.length} 次<button id="pzClr">清空</button></div>
      <div class="stRow"><div><b>${f(best)}</b>最好</div><div><b>${f(aoN(list, 5))}</b>近5次平均</div><div><b>${f(aoN(list, 12))}</b>近12次平均</div></div>
      <div class="stList">${list.slice(-10).reverse().map(r => `<span class="${r.a ? 'as' : ''}">${fmtTT(r.t)}<i>${r.n}步${r.a ? ' · 辅助' : ''}</i></span>`).join('')}</div>`
      : '<div class="stHd">成绩</div><em>还没复原过。打乱之后自己转到复原，就会记在这儿。</em>'}</div>`);
  el.querySelector('#pzHome').onclick = () => v.recenter(); el.querySelector('#pzReset').onclick = () => v.reset();
  el.querySelector('#pzSet').onclick = () => setOpen(true);
  el.querySelectorAll('.pzHist button').forEach(b => b.onclick = () => v.rewind(+b.dataset.n));
  const c = el.querySelector('#pzClr'); if (c) c.onclick = () => { if (confirm('清空全部成绩？删了找不回来。')) { localStorage.removeItem('cube_' + v.puz.id + '_times'); moreSheet(root, v); } };
}
/* ---- 解法条 ---- */
function planBar(host, v, onReplay) {
  const tu = v.mode === TUTORIAL, p = v.plan; if (!p) { host.innerHTML = ''; return; }
  const playing = v.playTo >= 0, arrowOn = cfg('arrow') > 0.5;
  if (p.i >= p.moves.length) {
    host.innerHTML = `<div class="pzPlan end"><b class="ok">✓</b><span>${tu ? '这条公式做完了' : '解法走完了'}</span>${tu ? '<button class="ctl" id="ppPrev" title="上一手">◀</button>' : ''}<button id="ppReplay">${tu ? '▶ 再看一遍' : '▶ 重播'}</button>${tu ? '' : '<button id="ppClose">关闭</button>'}</div>`;
    const pr = host.querySelector('#ppPrev'); if (pr) pr.onclick = () => v.planPrev();
    host.querySelector('#ppReplay').onclick = () => tu ? onReplay() : v.playGo(0);
    const cl = host.querySelector('#ppClose'); if (cl) cl.onclick = () => v.planClose();
    return;
  }
  const now = v.planNow(), lo = p.moves.length > 60 ? Math.max(0, p.i - 10) : 0, hi = p.moves.length > 60 ? Math.min(p.moves.length, lo + 40) : p.moves.length;
  host.innerHTML = `<div class="pzPlan"><div class="ppNow"><b>${p.off || !now ? '?' : now}</b><span>${p.off ? (tu ? '你转的这一下不在这条公式里，按下面的「↺ 回到这一步」重来' : '转的这步不在解法里了，可以撤销回去，或者重新算一份') : esc(v.puz.moveCn(now)) + '　还剩 ' + (p.moves.length - p.i) + ' 步'}</span></div>
    ${!tu && p.off ? '<div class="ppOff"><span>跟解法对不上了</span><button id="ppRe">重新算</button></div>' : ''}
    <div class="ppCtl"><button class="ctl${playing ? ' pri' : ''}" id="ppPlay" title="${playing ? '停' : '播放'}">${playing ? '■' : '▶'}</button>
      <button class="ctl" id="ppPrev" title="上一手"${!playing && p.i > 0 ? '' : ' disabled'}>◀</button>
      ${tu ? `<button class="ctl" id="ppNext" title="下一手"${!playing && !p.off ? '' : ' disabled'}>▶|</button>` : `<button class="ctl" id="ppHead" title="从头"${!playing && p.i > 0 ? '' : ' disabled'}>|◀</button>`}
      <span style="flex:1"></span><button id="ppSpd">${PLAY_CN[v.playSpd]}</button><button id="ppArr" class="${arrowOn ? 'on' : ''}">箭头</button>${tu ? '' : '<button id="ppX">×</button>'}</div>
    <div class="ppSeq">${lo > 0 ? `<em>…前 ${lo} 步</em>` : ''}${p.moves.slice(lo, hi).map((m, j) => { const k = lo + j; return `<button data-k="${k}" class="${k === p.i ? 'cur' : k < p.i ? 'done' : ''}">${m}</button>`; }).join('')}${hi < p.moves.length ? `<em>…还有 ${p.moves.length - hi} 步</em>` : ''}</div></div>`;
  const $$ = id => host.querySelector('#' + id);
  $$('ppPlay').onclick = () => playing ? v.playStop() : v.playGo(p.moves.length);
  $$('ppPrev').onclick = () => v.planPrev();
  if ($$('ppNext')) $$('ppNext').onclick = () => v.planNext();
  if ($$('ppHead')) $$('ppHead').onclick = () => { v.playStop(); v.playGo(0); };
  $$('ppSpd').onclick = () => v.planSpeed();
  $$('ppArr').onclick = () => { try { prSetPut('arrow', arrowOn ? 0 : 1); } catch (e) {} v.render(); planBar(host, v, onReplay); };
  if ($$('ppX')) $$('ppX').onclick = () => v.planClose();
  if ($$('ppRe')) $$('ppRe').onclick = () => { v.planClose(); v.planStart(); };
  host.querySelectorAll('.ppSeq button').forEach(b => b.onclick = () => { v.playStop(); v.playGo(+b.dataset.k); });
  const cur = host.querySelector('.ppSeq .cur'); if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: 'nearest', inline: 'nearest' });
}

/* ======================= 复原页：点格子填色 → 求解；拍照 ======================= */
function pageInput(root, v) {
  const puz = v.puz;
  root.className = 'page on pzFull';
  root.innerHTML = bar('输入魔方', `<button class="ic" id="pzHelp" title="怎么填">${SVG.help}</button><button class="ic" id="pzMore" title="更多">${SVG.more}</button><button class="pri pzGo" id="pzGo">求解</button>`)
    + `<p class="sub1">按「${puz instanceof Pyra ? '黄色朝下、绿色朝前' : '白色朝下、绿色朝前'}」拿好${puz instanceof Big && puz.N === 4 ? '（四阶没有固定中心，看角块认面）' : ''}</p>`
    + stageHtml(v) + `<button class="pri2 pzCamBtn" id="pzCam">📷 拍照识别（对准框一面面拍）</button>
    <div class="row2"><button id="pzClear">全部清空</button><button id="pzSolved">填复原态</button></div>
    <div class="pzPal" id="pzPal"></div><div class="pzMsg" id="pzMsg"></div>`;
  wireChip(root); stageBind(root, v);
  const upd = () => {
    q('pzPal').innerHTML = puz.palette.map((c, k) => { const n = v.left(k), light = ((c >> 16) & 255) * .3 + ((c >> 8) & 255) * .59 + (c & 255) * .11 > 150;
      return `<button data-k="${k}" class="${k === v.cur ? 'on' : ''}" style="background:${hex(c)};color:${light ? '#191506' : '#fff'}" title="${puz.colorCn[k]}色，${n <= 0 ? '填完了' : '还差 ' + n + ' 格'}">${n <= 0 ? '✓' : n}</button>`; }).join('');
    q('pzPal').querySelectorAll('button').forEach(b => b.onclick = () => { v.cur = +b.dataset.k; upd(); });
    q('pzPal').style.gridTemplateColumns = `repeat(${puz.palette.length},1fr)`;
    const m = q('pzMsg'); m.textContent = v.msg || (v.blanks > 0 ? '还差 ' + v.blanks + ' 格' : '填满了，按右上角「求解」'); m.classList.toggle('err', !!v.err);
    q('pzGo').style.display = v.blanks ? 'none' : '';
  };
  v.onChange = () => { upd(); PZ.saveAll(); };
  q('pzClear').onclick = () => { v.err = false; v.clearAll(); };
  q('pzSolved').onclick = () => { v.err = false; v.setSolved(); };
  q('pzMore').onclick = () => { const el = sheet(root, 'pzInMore', '<button class="shClose" id="pzHome2" style="width:100%">摆正视角</button>'); el.querySelector('#pzHome2').onclick = () => v.recenter(); };
  q('pzHelp').onclick = () => sheet(root, 'pzInHelp', `<b style="font-size:17px">怎么填</b><div class="steps">
    <p>① 先点一个颜色，再把魔方上这个颜色的格子挨个点掉，填满自动换下一色。</p><p>② 色块上的数字是这色还差几格。点填过的格子再点一下是清掉。</p>
    <p>③ 魔方四边的箭头能把整个魔方翻过来，填背面和底面。在格子外面拖可以转着看。</p>
    <p>④「填复原态」= 先全部填成复原的样子，再改几格，适合魔方只乱了一点的时候。${puz instanceof Big && puz.N === 5 ? '<br>⑤ 每面正中心那格定死了颜色，不用填。' : ''}</p>
    <p>也可以点「📷 拍照识别」：对准框一面一面拍，拍完自动填好，认错的格子再点着改。</p></div><button class="shClose pri" style="width:100%;margin-top:10px">知道了</button>`);
  q('pzCam').onclick = () => camPage(puz, st => { v.loadNet(st); });
  q('pzGo').onclick = () => {
    if (v.solving) return; v.solving = true; v.err = false; v.say('正在算…' + PZ.firstNote(puz));
    const st = v.st.slice();
    PZ.solve(puz, st).then(sol => { v.solving = false;
      if (!sol) { v.err = true; v.say('这个状态拼不出来：多半是哪一格填错了（同一块上的几种颜色得是真的存在的组合）。对着实物再看一遍。'); return; }
      v.say(''); const p = PZ.view(PZ.k, PRACTICE); p.loadWithPlan(st, sol); goTab(2); });
  };
  upd();
}

/* ---- 拍照：对准框一面一面拍 ---- */
function camPage(puz, onDone) {
  const plan = new CamPlan(puz); let step = 0, live = [], stream = null, raf = 0, err = '';
  const picked = plan.steps.map(() => null);
  const ov = document.createElement('div'); ov.id = 'pzCamOv'; document.body.appendChild(ov);
  ov.innerHTML = `<div class="appBar"><button class="ic back" id="pcClose" title="关闭拍照">${SVG.back}</button><b id="pcTitle"></b></div>
    <p id="pcSay" class="pcSay"></p><div class="pcBox"><video id="pcVid" playsinline muted autoplay></video><canvas id="pcOv"></canvas></div>
    <div id="pcFaces" class="pcFaces"></div><button class="pri" id="pcShot">拍这一面</button>`;
  const close = () => { cancelAnimationFrame(raf); if (stream) stream.getTracks().forEach(t => t.stop()); ov.remove(); };
  ov.querySelector('#pcClose').onclick = close;
  const vid = ov.querySelector('#pcVid'), cv = ov.querySelector('#pcOv'), off = document.createElement('canvas'); off.width = off.height = 480;
  const G0 = 0.1, GS = 0.8;
  const ui = () => {
    ov.querySelector('#pcTitle').textContent = '拍照识别 · 第 ' + (Math.min(step, plan.steps.length - 1) + 1) + '/' + plan.steps.length + ' 面';
    ov.querySelector('#pcSay').textContent = err || plan.steps[Math.min(step, plan.steps.length - 1)].say + '，让这一面对准框，按「拍这一面」';
    ov.querySelector('#pcSay').classList.toggle('err', !!err);
    ov.querySelector('#pcFaces').innerHTML = plan.steps.map((_, s) => `<button data-s="${s}" class="${s === step ? 'on' : ''}"><canvas width="60" height="60"></canvas><span>${picked[s] ? '' : s + 1}</span></button>`).join('');
    ov.querySelectorAll('#pcFaces button').forEach(b => { const s = +b.dataset.s; b.onclick = () => { step = s; ui(); };
      if (picked[s]) { const g = b.querySelector('canvas').getContext('2d'); plan.poly.forEach((qq, k) => { g.beginPath(); qq.forEach(([x, y], j) => j ? g.lineTo(x * 54 + 3, y * 54 + 3) : g.moveTo(x * 54 + 3, y * 54 + 3)); g.closePath();
        const c = picked[s][k]; g.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`; g.fill(); }); } });
  };
  // 取 (x,y) 周围一小块，按亮度排序后只平均中间那段：丢掉黑缝、阴影和反光
  const sample = (px, x, y, r) => { const list = [];
    for (let yy = Math.max(0, Math.round(y - r)); yy <= Math.min(479, Math.round(y + r)); yy++) for (let xx = Math.max(0, Math.round(x - r)); xx <= Math.min(479, Math.round(x + r)); xx++) {
      const o = (yy * 480 + xx) * 4; list.push([px[o], px[o + 1], px[o + 2], px[o] * .3 + px[o + 1] * .59 + px[o + 2] * .11]); }
    list.sort((a, b) => a[3] - b[3]); const a = Math.floor(list.length * 0.3), b = Math.max(a + 1, Math.floor(list.length * 0.85)); const s = [0, 0, 0];
    for (let i = a; i < b; i++) for (let k = 0; k < 3; k++) s[k] += list[i][k]; return s.map(v => Math.round(v / (b - a))); };
  let last = 0;
  const loop = now => {
    raf = requestAnimationFrame(loop);
    const r = cv.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1); if (cv.width !== Math.round(r.width * dpr)) { cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr); }
    if (vid.videoWidth && now - last > 100) { last = now;
      const vw = vid.videoWidth, vh = vid.videoHeight, s = Math.min(vw, vh), og = off.getContext('2d', { willReadFrequently: true });
      og.drawImage(vid, (vw - s) / 2, (vh - s) / 2, s, s, 0, 0, 480, 480);
      const px = og.getImageData(0, 0, 480, 480).data, rr = plan.cellSize * GS * 480 * 0.22;
      live = plan.ctr.map(([x, y]) => sample(px, (G0 + x * GS) * 480, (G0 + y * GS) * 480, rr)); }
    const g = cv.getContext('2d'), w = cv.width; g.clearRect(0, 0, w, w); g.lineJoin = 'round';
    const P = (x, y) => [(G0 + x * GS) * w, (G0 + y * GS) * w];
    for (const qq of plan.poly) { g.beginPath(); qq.forEach(([x, y], j) => { const [a, b] = P(x, y); j ? g.lineTo(a, b) : g.moveTo(a, b); }); g.closePath();
      g.strokeStyle = 'rgba(0,0,0,.6)'; g.lineWidth = 4 * dpr; g.stroke(); g.strokeStyle = 'rgba(255,255,255,.9)'; g.lineWidth = 1.6 * dpr; g.stroke(); }
    const rr = plan.cellSize * GS * w * 0.16;
    plan.ctr.forEach(([x, y], k) => { const c = live[k]; if (!c) return; const [a, b] = P(x, y);
      g.beginPath(); g.arc(a, b, rr + 2 * dpr, 0, 7); g.fillStyle = '#000'; g.fill(); g.beginPath(); g.arc(a, b, rr, 0, 7); g.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`; g.fill(); });
  };
  ov.querySelector('#pcShot').onclick = () => {
    if (live.length !== plan.ctr.length) return;
    if (step < plan.steps.length) { picked[step] = live.map(c => c.slice()); let nx = plan.steps.length; for (let s = step + 1; s < plan.steps.length; s++) if (!picked[s]) { nx = s; break; } step = nx; }
    if (picked.every(Boolean)) { const st = plan.classify(picked); close(); onDone(st); return; }
    ui();
  };
  ui();
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { err = '这个浏览器打不开摄像头，回去手动点格子填吧'; ui(); }
  else navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false })
    .then(s => { stream = s; vid.srcObject = s; raf = requestAnimationFrame(loop); })
    .catch(() => { err = '没给相机权限，拍不了；可以回去手动点格子填'; ui(); });
}

/* ---- 缩略图：前面那一面，平面画 ---- */
function mini(cv, puz, st) {
  const g = cv.getContext('2d'), W = cv.width, H = cv.height, front = puz instanceof Pyra ? 0 : 2;
  const ids = [...Array(puz.S).keys()].filter(i => puz.faceOf[i] === front), n = puz.nrm[ids[0]], u = norm(Mx.cross([0, 1, 0], n)), v = Mx.cross(n, u);
  const pts = ids.map(i => puz.poly[i].map(p => [dot(p, u), dot(p, v)])), xs = pts.flat().map(p => p[0]), ys = pts.flat().map(p => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys), sc = Math.min(W / (maxX - minX), H / (maxY - minY)) * 0.94;
  const ox = (W - (maxX - minX) * sc) / 2, oy = (H - (maxY - minY) * sc) / 2;
  g.clearRect(0, 0, W, H);
  ids.forEach((i, k) => { const qq = pts[k], cx = qq.reduce((s, p) => s + p[0], 0) / qq.length, cy = qq.reduce((s, p) => s + p[1], 0) / qq.length;
    g.beginPath(); qq.forEach(([x, y], j) => { const px = ox + (cx + (x - cx) * 0.86 - minX) * sc, py = oy + (maxY - (cy + (y - cy) * 0.86)) * sc; j ? g.lineTo(px, py) : g.moveTo(px, py); });
    g.closePath(); g.fillStyle = hex(st[i] < 0 ? 0x3a3f48 : puz.palette[st[i]]); g.fill(); });
}

/* ======================= 学习页 ======================= */
function pageLearn(root, tu) {
  const puz = tu.puz, Ls = lessons(puz), nav = PZ.learn[PZ.k] || (PZ.learn[PZ.k] = { lesson: -1, step: 0 });
  if (nav.lesson < 0 || nav.lesson >= Ls.length) {
    root.className = 'page on';
    root.innerHTML = bar('学复原', '') + `<p class="sub1">${puz instanceof Pyra ? '四步：尖角 → 轴心 → 底层棱 → 顶层棱。金字塔只有 933,120 种状态，比三阶简单得多。'
      : '降阶法：先拼中心、再拼棱，' + puz.cn + '就变成一个大号三阶，接着照三阶的做法复原。'}</p>`
      + Ls.map((L, i) => `<button class="pzLesson" data-i="${i}"><canvas width="112" height="112"></canvas><span><b>${i + 1}. ${esc(L.name)}</b><i>${esc(L.intro)}</i></span></button>`).join('');
    wireChip(root);
    root.querySelectorAll('.pzLesson').forEach(b => { const i = +b.dataset.i; mini(b.querySelector('canvas'), puz, puz.applyAll(puz.solved(), Ls[i].steps[0].setup));
      b.onclick = () => { nav.lesson = i; nav.step = 0; show(3); }; });
    return;
  }
  const L = Ls[nav.lesson], s = L.steps[Math.max(0, Math.min(L.steps.length - 1, nav.step))];
  root.className = 'page on pzFull';
  root.innerHTML = `<div class="appBar"><button class="ic back pzBack" title="返回课表">${SVG.back}</button><b>${esc(L.name)}</b><span class="pzStep">第 ${nav.step + 1}/${L.steps.length} 步</span></div>`
    + stageHtml(tu) + `<div class="pzMsg" id="pzMsg"></div><div id="pzCtl"></div>
    <div class="pzText"><b>${esc(s.title)}</b><p>${esc(s.text).replace(/\n/g, '<br>')}</p></div>
    <div class="row3"><button id="tuPrev"${nav.step > 0 ? '' : ' disabled'}>‹ 上一步</button><button id="tuAgain">↺ 回到这一步</button>${nav.step < L.steps.length - 1 ? '<button id="tuNext">下一步 ›</button>' : `<button id="tuNextL"${nav.lesson < Ls.length - 1 ? '' : ' disabled'}>下一课 ›</button>`}</div>`;
  stageBind(root, tu);
  const load = () => tu.loadStep(puz.applyAll(puz.solved(), s.setup), s.alg, s.focus ? [...Array(puz.S).keys()].map(i => s.focus(puz, i)) : null);
  root.querySelector('.pzBack').onclick = () => { nav.lesson = -1; show(3); };
  q('tuPrev').onclick = () => { nav.step--; show(3); };
  q('tuAgain').onclick = load;
  if (q('tuNext')) q('tuNext').onclick = () => { nav.step++; show(3); };
  if (q('tuNextL')) q('tuNextL').onclick = () => { nav.lesson++; nav.step = 0; show(3); };
  tu.onChange = () => { msgLine(tu); planBar(q('pzCtl'), tu, () => { load(); setTimeout(() => tu.plan && tu.playGo(tu.plan.moves.length), 50); }); };
  load();
}

/* ======================= 花色页 ======================= */
function pagePat(root, view) {
  const puz = view.puz, pats = patterns(puz), nav = PZ.pat[PZ.k] || (PZ.pat[PZ.k] = { pick: -1 });
  if (nav.pick < 0 || nav.pick >= pats.length) {
    root.className = 'page on';
    root.innerHTML = bar('摆花色', '') + `<p class="sub1">从复原好的${puz.cn}开始，照公式转出这些图案。缩略图是前面那一面。</p>`
      + pats.map((p, i) => `<button class="pzLesson" data-i="${i}"><canvas width="128" height="128"></canvas><span><b>${esc(p.name)}</b><i>${esc(p.note)}</i><i class="dim">${p.alg.length} 步</i></span></button>`).join('');
    wireChip(root);
    root.querySelectorAll('.pzLesson').forEach(b => { const i = +b.dataset.i; mini(b.querySelector('canvas'), puz, puz.applyAll(puz.solved(), pats[i].alg));
      b.onclick = () => { nav.pick = i; show(4); }; });
    return;
  }
  const p = pats[nav.pick];
  root.className = 'page on pzFull';
  root.innerHTML = `<div class="appBar"><button class="ic back pzBack" title="返回花色表">${SVG.back}</button><b>${esc(p.name)}</b></div>` + stageHtml(view)
    + `<p class="sub1" style="text-align:center;margin:8px 0">${esc(p.note)}</p><p class="pzAlg">${p.alg.join(' ')}</p>
    <button class="pri" id="patFollow" style="width:100%">从复原态跟着转出来</button>`;
  stageBind(root, view);
  view.load(puz.applyAll(puz.solved(), p.alg), false);
  root.querySelector('.pzBack').onclick = () => { nav.pick = -1; show(4); };
  q('patFollow').onclick = () => { PZ.view(PZ.k, PRACTICE).planAlg(p.alg); goTab(2); };
}

/* ---- 接入：goTab 之后换页、启动时恢复上次选的魔方 ---- */
PZ.show = show; PZ.sync3x3Chips = sync3x3Chips;
try { PZ.k = Math.max(0, Math.min(3, +localStorage.getItem('cube_puz_k') || 0)); } catch (e) {}
sync3x3Chips();
if (PZ.k) PZ.warm(PZ.k);
// 主脚本启动时 goTab 早于本文件，那次 show 没赶上：这里补一次，落到上次那一页
if (PZ.k) { let t = 0; try { t = +localStorage.getItem('cube_last_tab') || 0; } catch (e) {} show([0, 2, 3, 4].includes(t) ? t : 0); }
window.addEventListener('pagehide', () => PZ.saveAll());
document.addEventListener('visibilitychange', () => { if (document.hidden) PZ.saveAll(); });
})();
