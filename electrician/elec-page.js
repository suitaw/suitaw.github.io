/* elec-page.js —— 课页外壳的一点运行时（2026-08-28 深色仪表台改版）
   现在只干一件事：**把页签滑块摆到当前那一格上**。

   elec-page.css 里那根滑块是 .tabs::after，位置靠两个 CSS 变量算：
     --tabn  这一排共几个页签
     --tabi  第几个亮着（0 起）
   这两个值得有人写。写在这儿而不是写进六个 sec/c1-N.js，是因为
   **那六个模块一个字都不用改**：这里全程用事件委托 + 观察 DOM，
   谁把 .on 挪到别的 tab 上，这边跟着走就行。

   book.html 单页站切节时整排 tabs 是新节点，所以还观察了一次 childList。 */
(function(){
'use strict';

function syncOne(tabs){
  const tab = tabs.querySelectorAll('.tab');
  if(!tab.length) return;
  let i = 0;
  for(let k=0;k<tab.length;k++) if(tab[k].classList.contains('on')){ i = k; break; }
  tabs.style.setProperty('--tabn', tab.length);
  tabs.style.setProperty('--tabi', i);
}
function syncAll(){
  const all = document.querySelectorAll('.tabs');
  for(let i=0;i<all.length;i++) syncOne(all[i]);
}

/* 点了页签之后，模块自己会挪 .on —— 等它挪完（下一帧）再量 */
document.addEventListener('click', function(e){
  if(e.target && e.target.closest && e.target.closest('.tabs'))
    requestAnimationFrame(syncAll);
}, true);

/* 键盘 / 程序里直接调 goScene() 换页签的路子也接上 */
document.addEventListener('keyup', function(){ requestAnimationFrame(syncAll); }, true);

/* 单页站切节：整排 tabs 被换成新节点，观察到就重新量一次 */
if(window.MutationObserver){
  new MutationObserver(function(m){
    for(let i=0;i<m.length;i++) if(m[i].addedNodes.length){ syncAll(); return; }
  }).observe(document.documentElement, {childList:true, subtree:true});
}

if(document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', syncAll);
else syncAll();

window.ElecPage = {sync:syncAll};
})();
