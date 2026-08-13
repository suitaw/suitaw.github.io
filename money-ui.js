/* 理财课的教学交互组件（八课共用）
   现在只有一个：「先猜一下」。

   为什么要有它 —— 这是交互式解释里叫 Place Your Bets 的做法
   （纽约时报的 You Draw It 系列、Nicky Case 的 The Evolution of Trust 都用它）：
   **先逼你押一个答案，再揭晓**。你自己猜错过一次，那个数字才会留在脑子里；
   直接看到结论，读的时候点头，转头就忘。

   这门课里正好有几处「反直觉」的结论，是它最该用的地方：
   - 第二课：平均涨 8% 的东西，30 年后中位数其实到不了那条平滑曲线
   - 第三课：单只股票和活期存款比，30 年后中位数居然是活期更多

   用法（写在 STEPS 的 body 里）：
     <div class="bet" data-bet="唯一id"
          data-q="问题"
          data-opts="选项A|选项B|选项C"
          data-right="1"                 ← 第几个是对的，从 0 数；不判对错就省略
          data-after="揭晓之后要说的话（认 **加粗**）"></div>
   宿主页面在渲染完讲解之后调一次 MoneyUI.bind(容器) 就行。
   答过的记在 localStorage 里，翻回这一步不会再问一遍。 */
(function(){
'use strict';

const KEY='money_bets';
function load(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch(e){return {};}}
function save(d){try{localStorage.setItem(KEY,JSON.stringify(d));}catch(e){}}
function esc(s){return String(s==null?'':s)
  .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function rich(s){return esc(s).replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>').replace(/\n/g,'<br>');}

const CSS=`
.bet{margin:12px 0;padding:13px 14px;border-radius:12px;
  border:1px solid rgba(232,168,76,.42);background:rgba(232,168,76,.07);}
.bet .bq{font-size:14.5px;font-weight:600;color:#e8a84c;line-height:1.6;margin-bottom:3px;}
.bet .bhint{font-size:12.5px;color:#8890a8;margin-bottom:9px;}
.bet .bopt{display:block;width:100%;min-height:48px;margin-top:7px;padding:11px 13px;
  text-align:left;border-radius:10px;border:1px solid #2e3350;background:#1a1d27;
  color:#e8e9f0;font-family:inherit;font-size:14.5px;line-height:1.5;cursor:pointer;}
.bet .bopt:active{background:#22263a;}
.bet.done .bopt{cursor:default;opacity:.5;}
.bet.done .bopt.mine{opacity:1;border-color:#8890a8;}
.bet.done .bopt.win{opacity:1;border-color:#4caf82;background:rgba(76,175,130,.12);}
.bet.done .bopt.mine.lose{border-color:#e85c5c;background:rgba(232,92,92,.1);}
.bet .btag{float:right;margin-left:8px;font-size:12px;font-weight:700;}
.bet .btag.w{color:#4caf82;}
.bet .btag.l{color:#e85c5c;}
.bet .bans{margin-top:11px;padding-top:10px;border-top:1px solid rgba(232,168,76,.3);
  font-size:14px;line-height:1.75;color:#e8e9f0;}
.bet .bans b{color:#e8a84c;font-weight:600;}
.bet .bagain{margin-top:9px;min-height:44px;padding:0 14px;border-radius:9px;
  border:1px solid #2e3350;background:transparent;color:#8890a8;
  font-family:inherit;font-size:12.5px;}
/* 没答之前，后面的答案整块藏起来 —— 露出来就白问了 */
.bet-hide{display:none;}

/* 练习题：跟「先猜一下」是两回事。
   先猜一下在学之前，图的是那个反差；练习题在学之后，图的是「我到底会没会」。
   所以这里一定要判对错、答错一定要给出为什么错。 */
.quiz{margin:14px 0 0;padding:14px;border-radius:12px;
  border:1px solid var(--border,#2e3350);background:var(--surface,#1a1d27);}
.quiz .qzh{font-size:13px;color:#8890a8;margin-bottom:2px;}
.quiz .qzt{font-size:16px;font-weight:600;color:#e8e9f0;margin-bottom:12px;}
.qz{padding-top:14px;margin-top:14px;border-top:1px solid var(--border,#2e3350);}
.qz:first-of-type{padding-top:0;margin-top:0;border-top:none;}
.qz .qn{font-size:12px;color:#e8a84c;font-weight:700;}
.qz .qt{font-size:15px;line-height:1.65;color:#e8e9f0;margin:3px 0 9px;}
.qz .qo{display:block;width:100%;min-height:48px;margin-top:7px;padding:11px 13px;
  text-align:left;border-radius:10px;border:1px solid #2e3350;background:#22263a;
  color:#e8e9f0;font-family:inherit;font-size:14.5px;line-height:1.5;cursor:pointer;}
.qz.done .qo{cursor:default;opacity:.45;}
.qz.done .qo.mine{opacity:1;}
.qz.done .qo.win{opacity:1;border-color:#4caf82;background:rgba(76,175,130,.14);}
.qz.done .qo.mine.lose{opacity:1;border-color:#e85c5c;background:rgba(232,92,92,.12);}
.qz .qtag{float:right;margin-left:8px;font-size:12px;font-weight:700;}
.qz .qtag.w{color:#4caf82;}
.qz .qtag.l{color:#e85c5c;}
.qz .qwhy{margin-top:10px;padding:10px 12px;border-radius:9px;
  background:rgba(232,168,76,.08);border-left:2px solid #e8a84c;
  font-size:13.5px;line-height:1.7;color:#c9cee0;}
.qz .qwhy b{color:#e8a84c;}
.quiz .qzs{margin-top:14px;padding-top:12px;border-top:1px solid var(--border,#2e3350);
  font-size:14px;color:#e8e9f0;}
.quiz .qzs b{color:#e8a84c;}
.quiz .qzr{margin-top:10px;min-height:44px;padding:0 14px;border-radius:9px;
  border:1px solid #2e3350;background:transparent;color:#8890a8;
  font-family:inherit;font-size:12.5px;}
`;
let cssDone=false;
function injectCSS(){
  if(cssDone)return;
  cssDone=true;
  document.head.appendChild(Object.assign(document.createElement('style'),{textContent:CSS}));
}

function reveal(box,root){
  const id=box.dataset.bet;
  const picked=load()[id];
  const right=box.dataset.right===''||box.dataset.right==null?null:+box.dataset.right;
  box.classList.add('done');
  [...box.querySelectorAll('.bopt')].forEach((b,i)=>{
    const mine=i===picked;
    b.classList.toggle('mine',mine);
    if(right!=null){
      b.classList.toggle('win',i===right);
      b.classList.toggle('lose',mine&&i!==right);
    }
    b.querySelector('.btag')&&b.querySelector('.btag').remove();
    if(mine){
      const t=document.createElement('span');
      t.className='btag '+(right==null?'':(i===right?'w':'l'));
      t.textContent=right==null?'你猜的':(i===right?'✓ 猜对了':'✗ 你猜的');
      b.prepend(t);
    }else if(right!=null&&i===right){
      const t=document.createElement('span');
      t.className='btag w'; t.textContent='✓ 实际是这个';
      b.prepend(t);
    }
  });
  let ans=box.querySelector('.bans');
  if(!ans){
    ans=document.createElement('div');
    ans.className='bans';
    ans.innerHTML=rich(box.dataset.after||'');
    const again=document.createElement('button');
    again.className='bagain';
    again.textContent='重猜一次';
    again.onclick=()=>{const d=load();delete d[id];save(d);render(box,root);};
    ans.appendChild(document.createElement('br'));
    ans.appendChild(again);
    box.appendChild(ans);
  }
  // 把这一步里「揭晓之后才该看的」那些块放出来
  if(root)root.querySelectorAll('[data-bet-for="'+id+'"]')
    .forEach(n=>n.classList.remove('bet-hide'));
}

function render(box,root){
  const id=box.dataset.bet;
  const opts=String(box.dataset.opts||'').split('|').filter(Boolean);
  const picked=load()[id];
  box.classList.remove('done');
  box.innerHTML='<div class="bq">'+esc(box.dataset.q||'先猜一下')+'</div>'+
    '<div class="bhint">先押一个再往下看 —— 自己猜错过一次，这个数才记得住。</div>'+
    opts.map((o,i)=>'<button class="bopt" data-i="'+i+'">'+esc(o)+'</button>').join('');
  box.querySelectorAll('.bopt').forEach(b=>b.onclick=()=>{
    if(box.classList.contains('done'))return;
    const d=load(); d[id]=+b.dataset.i; save(d);
    reveal(box,root);
  });
  // 没答过就把答案块藏起来
  if(root)root.querySelectorAll('[data-bet-for="'+id+'"]')
    .forEach(n=>n.classList.toggle('bet-hide',picked==null));
  if(picked!=null)reveal(box,root);
}

/* ---------- 练习题 ----------
   <div class="quiz" data-quiz="唯一id" data-title="…">
     <div class="qz" data-q="题干" data-opts="A|B|C" data-right="1" data-why="讲清为什么"></div>
     …
   </div>
   一道一道答，答完立刻判对错并给解释（答错时那句解释才是全部价值所在）；
   全答完给一句总分。答过的记住，翻回来不用重做，留一颗「再做一遍」。 */
function renderQuiz(box){
  const qid=box.dataset.quiz;
  const qs=[...box.querySelectorAll('.qz')];
  const store=load();
  const st=store['q:'+qid]||{};

  qs.forEach((q,i)=>{
    if(q.dataset.built!=='1'){
      q.dataset.built='1';
      q.dataset.qq=q.dataset.q||'';
      q.dataset.qo=q.dataset.opts||'';
      q.dataset.qw=q.dataset.why||'';
    }
    const opts=String(q.dataset.qo).split('|').filter(Boolean);
    const right=+q.dataset.right;
    const mine=st[i];
    q.classList.toggle('done',mine!=null);
    q.innerHTML='<div class="qn">第 '+(i+1)+' 题 / 共 '+qs.length+'</div>'+
      '<div class="qt">'+esc(q.dataset.qq)+'</div>'+
      opts.map((o,j)=>{
        let cls='qo', tag='';
        if(mine!=null){
          if(j===mine)cls+=' mine'+(j===right?'':' lose');
          if(j===right)cls+=' win';
          if(j===mine&&j===right)tag='<span class="qtag w">✓ 答对了</span>';
          else if(j===mine)tag='<span class="qtag l">✗ 你选的</span>';
          else if(j===right)tag='<span class="qtag w">✓ 正确答案</span>';
        }
        return '<button class="'+cls+'" data-j="'+j+'">'+tag+esc(o)+'</button>';
      }).join('')+
      (mine!=null&&q.dataset.qw?'<div class="qwhy">'+rich(q.dataset.qw)+'</div>':'');
    q.querySelectorAll('.qo').forEach(btn=>btn.onclick=()=>{
      if(q.classList.contains('done'))return;
      const d=load(); const s=d['q:'+qid]||{};
      s[i]=+btn.dataset.j; d['q:'+qid]=s; save(d);
      renderQuiz(box);
    });
  });

  // 总分只在全答完之后给
  const done=qs.filter((q,i)=>st[i]!=null).length;
  const win=qs.filter((q,i)=>st[i]!=null&&st[i]===+q.dataset.right).length;
  let sum=box.querySelector('.qzs');
  if(sum)sum.remove();
  if(done===qs.length&&qs.length){
    sum=document.createElement('div');
    sum.className='qzs';
    sum.innerHTML= win===qs.length
      ? '<b>'+qs.length+' 道全对。</b>这一课的东西你拿住了。'
      : '答对 <b>'+win+' / '+qs.length+'</b> 道。'+
        '错的那道把上面的解释再读一遍就行 —— 这几道考的都是这一课的主线，不是细节。';
    const again=document.createElement('button');
    again.className='qzr'; again.textContent='再做一遍';
    again.onclick=()=>{const d=load();delete d['q:'+qid];save(d);renderQuiz(box);};
    sum.appendChild(document.createElement('br'));
    sum.appendChild(again);
    box.appendChild(sum);
  }
}

function bind(root){
  injectCSS();
  root=root||document;
  root.querySelectorAll('.quiz[data-quiz]').forEach(renderQuiz);
  root.querySelectorAll('.bet[data-bet]').forEach(box=>render(box,root));
  // 讲解里没有 bet 的步骤，之前藏起来的块要放出来（否则换步之后一直是隐的）
  const ids=[...root.querySelectorAll('.bet[data-bet]')].map(b=>b.dataset.bet);
  root.querySelectorAll('[data-bet-for]').forEach(n=>{
    if(!ids.includes(n.dataset.betFor))n.classList.remove('bet-hide');
  });
}

window.MoneyUI={
  bind,
  answered(id){return load()[id];},
  quizScore(qid){
    const st=load()['q:'+qid];
    if(!st)return null;
    return Object.keys(st).length;
  },
  reset(id){const d=load();if(id){delete d[id];delete d['q:'+id];}else{save({});return;}save(d);}
};
})();
