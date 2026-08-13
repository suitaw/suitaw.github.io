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

function bind(root){
  injectCSS();
  root=root||document;
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
  reset(id){const d=load();if(id)delete d[id];else{save({});return;}save(d);}
};
})();
