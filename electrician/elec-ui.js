/* ==================================================================
   elec-ui.js —— 电工课共用教学组件（29 课共用）
   引一行 <script src="elec-ui.js"></script> 就有，不依赖任何库。

   提供：
     ElecUI.formula(spec)   公式拆解：白话在前、符号在后、逐字母配名字和单位
     ElecUI.qtyTable()      物理量 / 单位对照表
     ElecUI.bind(root)      激活 root 里的「先猜一下」和课末练习题
     ElecUI.progress(...)   进度读写（localStorage）

   设计约定（别改回去）：
   - 公式一律「白话版在公式上面」。零基础先看到「电流 = 电荷量 ÷ 时间」，
     再看到 I = Q / t 才读得懂；顺序反了就是天书。（2026-08-13 他的原话：
     「每个公式，字母代表的意思我都不懂」）
   - 每个字母都要给出【符号 / 它是什么 / 单位】三样，缺一样都不行。
     光说「其中 I 是电流」不够 —— 他还要问那 A 是什么、为什么不写 A。
   - 物理量符号和单位符号是两套东西，这是零基础最大的混淆源，
     所以 qtyTable() 要在第 0 课出现一次，之后每个公式的拆解里重复提醒。
   ================================================================== */
(function(global){
'use strict';

/* ---------------- 物理量表：全课程唯一真相 ---------------- */
/* 加新物理量只改这里。symbol 是物理量符号（斜体单字母），
   unit/unitSym 是单位（正体，多为人名缩写所以大写）。 */
const QTY = {
  I: { name:'电流',   unit:'安培', unitSym:'A', what:'每秒钟流过多少电荷' },
  U: { name:'电压',   unit:'伏特', unitSym:'V', what:'两点之间的电位差，推动电荷流动的「压力差」', alt:'V' },
  R: { name:'电阻',   unit:'欧姆', unitSym:'Ω', what:'对电流的阻碍程度' },
  P: { name:'功率',   unit:'瓦特', unitSym:'W', what:'每秒钟转换掉多少电能' },
  W: { name:'电能',   unit:'焦耳', unitSym:'J', what:'一共转换了多少能量（生活里用「度」）' },
  Q: { name:'电荷量', unit:'库仑', unitSym:'C', what:'流过了多少电，1 库仑约等于 6.24×10¹⁸ 个电子的电荷' },
  t: { name:'时间',   unit:'秒',   unitSym:'s', what:'用了多长时间' },
  f: { name:'频率',   unit:'赫兹', unitSym:'Hz',what:'交流电每秒钟来回变化多少次' },
  S: { name:'截面积', unit:'平方毫米', unitSym:'mm²', what:'导线铜芯的粗细' }
};

function esc(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ---------------- 公式拆解 ----------------
   spec = {
     plain: '电流 = 流过的电荷量 ÷ 用掉的时间',   // 白话版（必填，显示在最上面）
     f:     'I = Q / t',                        // 符号版
     vars:  ['I','Q','t'],                      // 出现的物理量，按公式里的顺序
     note:  '……'                                // 可选：一句提醒
   }
   vars 里的每一项要么是 QTY 的键，要么是 {sym,name,unit,unitSym,what} 自定义。
*/
function formula(spec){
  const vars = (spec.vars||[]).map(v=>{
    if(typeof v === 'string'){
      const q = QTY[v];
      if(!q) return { sym:v, name:'?', unit:'', unitSym:'', what:'' };
      return { sym:v, name:q.name, unit:q.unit, unitSym:q.unitSym, what:q.what, alt:q.alt };
    }
    return v;
  });
  let h = '<div class="eu-f">';
  // 白话版在最前面 —— 这个顺序是硬约定
  h += '<div class="eu-f-plain">'+esc(spec.plain)+'</div>';
  h += '<div class="eu-f-sym">'+esc(spec.f)+'</div>';
  h += '<div class="eu-f-vars">';
  vars.forEach(v=>{
    h += '<div class="eu-v">'+
           '<span class="eu-v-s">'+esc(v.sym)+'</span>'+
           '<span class="eu-v-b">'+
             '<span class="eu-v-n">'+esc(v.name)+
               (v.alt ? '<span class="eu-v-alt">也写作 '+esc(v.alt)+'</span>' : '')+
             '</span>'+
             (v.what ? '<span class="eu-v-w">'+esc(v.what)+'</span>' : '')+
           '</span>'+
           '<span class="eu-v-u">'+esc(v.unit||'')+
             (v.unitSym ? ' <b>'+esc(v.unitSym)+'</b>' : '')+'</span>'+
         '</div>';
  });
  h += '</div>';
  if(spec.note) h += '<div class="eu-f-note">'+spec.note+'</div>';
  h += '</div>';
  return h;
}

/* ---------------- 物理量 / 单位对照表 ---------------- */
function qtyTable(keys){
  const ks = keys || ['I','U','R','P','Q','t'];
  let h = '<div class="eu-tw"><table class="eu-t"><thead><tr>'+
          '<th>要量的东西<br><span>（物理量）</span></th><th>它的符号</th>'+
          '<th>用什么尺子<br><span>（单位）</span></th><th>单位符号</th>'+
          '</tr></thead><tbody>';
  ks.forEach(k=>{
    const q = QTY[k]; if(!q) return;
    h += '<tr><td>'+esc(q.name)+'</td>'+
         '<td class="eu-s">'+esc(k)+(q.alt?' <span class="eu-alt">或 '+esc(q.alt)+'</span>':'')+'</td>'+
         '<td>'+esc(q.unit)+'</td>'+
         '<td class="eu-u">'+esc(q.unitSym)+'</td></tr>';
  });
  h += '</tbody></table></div>';
  return h;
}

/* ---------------- 先猜一下 / 课末练习题 ----------------
   用法（照 money-ui.js 的约定，两边保持一致）：
   <div class="bet" data-bet="唯一id" data-q="问题"
        data-opts="A|B|C" data-right="1" data-after="揭晓后说的话"></div>
   <div data-bet-for="同一个id">…揭晓后才该看到的内容…</div>

   规矩：揭晓前必须把答案块藏起来，露在下面就白问了。
*/
const BKEY = 'elec_bets';
let BETS = {};
try{ BETS = JSON.parse(localStorage.getItem(BKEY)||'{}') || {}; }catch(e){ BETS = {}; }
function betSave(){ try{ localStorage.setItem(BKEY, JSON.stringify(BETS)); }catch(e){} }

function bindBets(root){
  root.querySelectorAll('.bet').forEach(box=>{
    if(box.dataset.euReady) return;
    box.dataset.euReady = '1';
    const id    = box.dataset.bet;
    const opts  = (box.dataset.opts||'').split('|').filter(Boolean);
    const right = box.dataset.right==null||box.dataset.right===''
                    ? null : parseInt(box.dataset.right,10);
    const after = box.dataset.after||'';
    const hides = Array.prototype.slice.call(
      document.querySelectorAll('[data-bet-for="'+id+'"]'));
    const render = ()=>{
      const st = BETS[id];
      let h = '<div class="eu-bq"><span class="eu-btag">先猜一下</span>'+
              esc(box.dataset.q||'')+'</div>';
      h += '<div class="eu-bopts">';
      opts.forEach((o,i)=>{
        let cls='eu-bo';
        if(st){
          if(right!=null && i===right) cls+=' r';
          else if(i===st.pick) cls+=' w';
          if(i===st.pick) cls+=' picked';
        }
        h += '<button class="'+cls+'" data-i="'+i+'"'+(st?' disabled':'')+'>'+esc(o)+'</button>';
      });
      h += '</div>';
      if(st){
        h += '<div class="eu-ba">'+
             (right!=null ? (st.pick===right?'✓ 猜对了。':'✕ 猜的是「'+esc(opts[st.pick])+'」。') : '你猜的是「'+esc(opts[st.pick])+'」。')+
             ' '+after+
             '<div><button class="eu-bre">重猜一次</button></div></div>';
      }
      box.innerHTML = h;
      hides.forEach(n=>n.classList.toggle('eu-hide', !st));
      box.querySelectorAll('.eu-bo').forEach(b=>{
        b.addEventListener('click',()=>{
          BETS[id] = { pick:+b.dataset.i }; betSave(); render();
        });
      });
      const re = box.querySelector('.eu-bre');
      if(re) re.addEventListener('click',()=>{ delete BETS[id]; betSave(); render(); });
    };
    render();
  });
}

/* ---------------- 课末练习题 ----------------
   和「先猜一下」是两回事：先猜在学之前、图的是反差、可以不判对错；
   练习题在学之后、必须判对错、答错必须给出为什么错（data-why 那句才是全部价值）。

   <div class="quiz" data-quiz="c00">
     <div class="qz" data-q="…" data-opts="A|B|C" data-right="1" data-why="…"></div>
     …
   </div>
   一道一道答，答完立刻判；全答完才给总分；留一颗「再做一遍」。
*/
const QKEY = 'elec_quiz';
let QZS = {};
try{ QZS = JSON.parse(localStorage.getItem(QKEY)||'{}') || {}; }catch(e){ QZS = {}; }
function qzSave(){ try{ localStorage.setItem(QKEY, JSON.stringify(QZS)); }catch(e){} }

function bindQuiz(root){
  root.querySelectorAll('.quiz').forEach(box=>{
    if(box.dataset.euReady) return;
    box.dataset.euReady = '1';
    const key   = box.dataset.quiz || 'q';
    const items = Array.prototype.slice.call(box.querySelectorAll('.qz')).map(n=>({
      q:     n.dataset.q || '',
      opts:  (n.dataset.opts||'').split('|').filter(Boolean),
      right: parseInt(n.dataset.right,10),
      why:   n.dataset.why || ''
    }));
    const n = items.length;
    const render = ()=>{
      const picks = (QZS[key] && QZS[key].picks) || [];
      let h = '<div class="eu-qh">课末练习 · 共 '+n+' 题'+
              (picks.length<n ? '（第 '+(picks.length+1)+' 题）' : '')+'</div>';
      items.forEach((it,i)=>{
        const done = i < picks.length;
        if(!done && i !== picks.length) return;   // 还没轮到这一题
        const pick = done ? picks[i] : null;
        h += '<div class="eu-qi'+(done?' done':'')+'">';
        h += '<div class="eu-qq"><span class="eu-qn">'+(i+1)+'</span>'+esc(it.q)+'</div>';
        h += '<div class="eu-qos">';
        it.opts.forEach((o,k)=>{
          let cls = 'eu-qo';
          if(done){
            if(k===it.right) cls += ' r';
            else if(k===pick) cls += ' w';
            if(k===pick) cls += ' picked';
          }
          h += '<button class="'+cls+'" data-i="'+i+'" data-k="'+k+'"'+
               (done?' disabled':'')+'>'+esc(o)+'</button>';
        });
        h += '</div>';
        if(done){
          const ok = pick === it.right;
          h += '<div class="eu-qw'+(ok?' ok':'')+'">'+
               (ok?'✓ 对了。':'✕ 正确答案是「'+esc(it.opts[it.right])+'」。')+
               (it.why?' '+it.why:'')+'</div>';
        }
        h += '</div>';
      });
      if(picks.length >= n){
        let sc = 0;
        picks.forEach((p,i)=>{ if(p===items[i].right) sc++; });
        h += '<div class="eu-qs">'+(sc===n?'全对 —— ':'')+'答对 '+sc+' / '+n+
             '。'+(sc===n?'这一课的主线你抓住了。':'把上面标 ✕ 的那两句解释读一遍，比重做一遍有用。')+
             '<div><button class="eu-qre">再做一遍</button></div></div>';
      }
      box.innerHTML = h;
      box.querySelectorAll('.eu-qo').forEach(b=>{
        b.addEventListener('click',()=>{
          const st = QZS[key] || (QZS[key] = { picks:[] });
          st.picks[+b.dataset.i] = +b.dataset.k;
          qzSave(); render();
        });
      });
      const re = box.querySelector('.eu-qre');
      if(re) re.addEventListener('click',()=>{ delete QZS[key]; qzSave(); render(); });
    };
    render();
  });
}

/* ---------------- 讲解里的可点跳转 ----------------
   <b class="jump" data-j="stage">上面那张铭牌</b>
   点一下滚过去并闪一下。resolve(key) 由宿主提供（可自己处理并返回元素，
   或返回 null 表示自己已经处理完了）。不做成可点的话，
   「去看上面那张图」他得自己往上翻三百像素找。
*/
function bindJumps(root, resolve){
  root.querySelectorAll('[data-j]').forEach(nd=>{
    if(nd.dataset.euJ) return;
    nd.dataset.euJ = '1';
    nd.classList.add('eu-jump');
    nd.addEventListener('click',()=>{
      const el = resolve ? resolve(nd.dataset.j) : document.querySelector(nd.dataset.j);
      if(!el) return;
      el.scrollIntoView({ behavior:'smooth', block:'start' });
      el.classList.add('eu-flash');
      setTimeout(()=>el.classList.remove('eu-flash'), 1100);
    });
  });
}

/* ---------------- 进度 ---------------- */
const PKEY = 'elec_progress';
function progress(lesson, val){
  let all = {};
  try{ all = JSON.parse(localStorage.getItem(PKEY)||'{}') || {}; }catch(e){}
  if(val === undefined) return lesson===undefined ? all : (all[lesson]||null);
  all[lesson] = val;
  try{ localStorage.setItem(PKEY, JSON.stringify(all)); }catch(e){}
  return val;
}

/* ---------------- 样式（组件自带，宿主不用写） ---------------- */
const CSS = `
.eu-f{background:var(--card2,#f7f9fb);border:1px solid var(--line,#dde2e8);
  border-radius:10px;padding:11px 12px;margin:10px 0}
.eu-f-plain{font-size:.9rem;font-weight:600;color:var(--tx,#1e2329);line-height:1.5}
.eu-f-sym{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:1.15rem;
  font-weight:700;letter-spacing:.06em;color:var(--acc,#1a6fd4);
  margin:7px 0 9px;padding:5px 0;border-top:1px dashed var(--line,#dde2e8);
  border-bottom:1px dashed var(--line,#dde2e8);text-align:center}
.eu-f-vars{display:flex;flex-direction:column;gap:6px}
.eu-v{display:flex;align-items:flex-start;gap:9px}
.eu-v-s{flex:none;width:28px;height:28px;border-radius:7px;
  background:var(--acc,#1a6fd4);color:#fff;font-weight:700;
  font-family:ui-monospace,Menlo,Consolas,monospace;font-size:.9rem;
  display:flex;align-items:center;justify-content:center}
.eu-v-b{flex:1;min-width:0;display:flex;flex-direction:column;line-height:1.45}
.eu-v-n{font-size:.85rem;font-weight:600}
.eu-v-alt{font-weight:400;font-size:.75rem;color:var(--tx3,#8b949e);margin-left:5px}
.eu-v-w{font-size:.78rem;color:var(--tx2,#5d6773)}
.eu-v-u{flex:none;font-size:.78rem;color:var(--tx2,#5d6773);text-align:right;
  padding-top:4px;white-space:nowrap}
.eu-v-u b{color:var(--tx,#1e2329);font-family:ui-monospace,Menlo,Consolas,monospace}
.eu-f-note{margin-top:9px;padding-top:8px;border-top:1px dashed var(--line,#dde2e8);
  font-size:.8rem;color:var(--tx2,#5d6773)}

.eu-tw{overflow-x:auto;margin:10px 0;-webkit-overflow-scrolling:touch}
.eu-t{width:100%;border-collapse:collapse;font-size:.82rem;min-width:300px}
.eu-t th,.eu-t td{padding:7px 8px;border-bottom:1px solid var(--line,#dde2e8);text-align:left}
.eu-t th{font-size:.78rem;font-weight:600;color:var(--tx2,#5d6773);
  background:var(--card2,#f7f9fb);line-height:1.35}
.eu-t th span{font-weight:400;font-size:.75rem;color:var(--tx3,#8b949e)}
.eu-t .eu-s,.eu-t .eu-u{font-family:ui-monospace,Menlo,Consolas,monospace;
  font-weight:700;font-size:.95rem}
.eu-t .eu-s{color:var(--acc,#1a6fd4)}
.eu-t .eu-u{color:var(--ok,#1c8348)}
.eu-alt{font-size:.75rem;font-weight:400;color:var(--tx3,#8b949e)}

.bet{background:var(--card2,#f7f9fb);border:1px solid var(--line,#dde2e8);
  border-left:3px solid var(--warn,#a86200);border-radius:10px;padding:11px 12px;margin:12px 0}
.eu-bq{font-size:.88rem;font-weight:600;line-height:1.5}
.eu-btag{display:inline-block;font-size:.75rem;font-weight:600;padding:2px 7px;
  border-radius:5px;background:var(--warnbg,#fdf2e0);color:var(--warn,#a86200);margin-right:6px}
.eu-bopts{display:flex;flex-direction:column;gap:6px;margin-top:9px}
.eu-bo{min-height:44px;padding:8px 12px;text-align:left;font:inherit;font-size:.85rem;
  color:inherit;background:var(--card,#fff);border:1px solid var(--line,#dde2e8);
  border-radius:8px;cursor:pointer}
.eu-bo.r{border-color:var(--ok,#1c8348);background:var(--okbg,#e6f4ec)}
.eu-bo.w.picked{border-color:var(--err,#c32f2f);background:var(--errbg,#fdeaea)}
.eu-bo[disabled]{cursor:default}
.eu-ba{margin-top:9px;font-size:.85rem;line-height:1.6}
.eu-bre{margin-top:7px;min-height:44px;padding:0 12px;font:inherit;font-size:.78rem;
  color:inherit;background:var(--card,#fff);border:1px solid var(--line,#dde2e8);
  border-radius:8px;cursor:pointer}
.eu-hide{display:none !important}

.quiz{margin:14px 0}
.eu-qh{font-size:.8rem;font-weight:600;color:var(--tx2,#5d6773);margin-bottom:8px}
.eu-qi{background:var(--card2,#f7f9fb);border:1px solid var(--line,#dde2e8);
  border-radius:10px;padding:11px 12px;margin-bottom:9px}
.eu-qq{font-size:.88rem;font-weight:600;line-height:1.55}
.eu-qn{display:inline-flex;align-items:center;justify-content:center;
  width:20px;height:20px;border-radius:6px;background:var(--acc,#1a6fd4);color:#fff;
  font-size:.75rem;margin-right:7px;vertical-align:1px}
.eu-qos{display:flex;flex-direction:column;gap:6px;margin-top:9px}
.eu-qo{min-height:44px;padding:8px 12px;text-align:left;font:inherit;font-size:.85rem;
  line-height:1.45;color:inherit;background:var(--card,#fff);
  border:1px solid var(--line,#dde2e8);border-radius:8px;cursor:pointer}
.eu-qo.r{border-color:var(--ok,#1c8348);background:var(--okbg,#e6f4ec)}
.eu-qo.w.picked{border-color:var(--err,#c32f2f);background:var(--errbg,#fdeaea)}
.eu-qo[disabled]{cursor:default}
.eu-qw{margin-top:9px;padding-top:8px;border-top:1px dashed var(--line,#dde2e8);
  font-size:.82rem;line-height:1.6;color:var(--err,#c32f2f)}
.eu-qw.ok{color:var(--ok,#1c8348)}
.eu-qs{background:var(--okbg,#e6f4ec);border-radius:10px;padding:11px 12px;
  font-size:.85rem;line-height:1.6;font-weight:600}
.eu-qre{margin-top:8px;min-height:44px;padding:0 14px;font:inherit;font-size:.8rem;
  color:inherit;background:var(--card,#fff);border:1px solid var(--line,#dde2e8);
  border-radius:8px;cursor:pointer}

.eu-jump{position:relative;color:var(--acc,#1a6fd4);cursor:pointer;
  border-bottom:1px dashed var(--acc,#1a6fd4)}
.eu-jump::after{content:'';position:absolute;inset:-14px -9px}
.eu-flash{animation:euFlash 1.1s ease-out}
@keyframes euFlash{0%,100%{box-shadow:0 0 0 0 rgba(26,111,212,0)}
  25%{box-shadow:0 0 0 3px rgba(26,111,212,.45)}}
`;

function injectCSS(){
  if(document.getElementById('eu-css')) return;
  const s = document.createElement('style');
  s.id = 'eu-css'; s.textContent = CSS;
  document.head.appendChild(s);
}

/* opts.jump = resolve 函数，传了才激活 [data-j] 跳转 */
function bind(root, opts){
  injectCSS();
  const r = root || document;
  bindBets(r);
  bindQuiz(r);
  if(opts && opts.jump) bindJumps(r, opts.jump);
}

global.ElecUI = {
  QTY: QTY,
  formula: formula,
  qtyTable: qtyTable,
  bind: bind,
  bindJumps: bindJumps,
  progress: progress,
  _injectCSS: injectCSS
};

})(typeof window!=='undefined' ? window : globalThis);
