/* 首页课表：用 book-nav.js 里那份 BOOK 渲染，加新节只改那一处，不用两头改 */
(function(){
  var B = window.JWZ_BOOK; if(!B) return;
  var CN = '一二三四五六七八九';
  var html = '', done = 0, all = 0;
  B.forEach(function(P){
    html += '<h3 class="pian">第' + CN.charAt(P.p-1) + '篇 · ' + P.t + '</h3>';
    P.chapters.forEach(function(C){
      var d = C.secs.filter(function(S){return S.f}).length;
      done += d; all += C.secs.length;
      html += '<div class="chgroup">' +
        '<h2><span class="num">第 ' + C.c + ' 章</span> ' + C.t + '</h2>' +
        '<p class="sub">共 ' + C.secs.length + ' 节 · 已整理 ' + d + ' 节</p>' +
        '<ul class="seclist">';
      C.secs.forEach(function(S){
        var n = '<span class="n">' + C.c + '-' + S.n + '</span>';
        var body = '<span class="body"><span class="t">' + S.t + '</span>' +
                   '<span class="p">第 ' + S.pg + ' 页</span></span>';
        html += S.f
          ? '<li><a href="' + S.f + '">' + n + body + '</a></li>'
          : '<li><span class="todo">' + n + body + '<span class="qc">待整理</span></span></li>';
      });
      html += '</ul></div>';
    });
  });
  var el = document.getElementById('toc');
  if (el) el.innerHTML = html;
  /* 注意用 id：.hero p 会选中 .eyebrow（它也是 <p>），说明会写错地方 */
  var sub = document.getElementById('heroSub');
  if (sub) sub.innerHTML = '整理自华图教育 2026 版教材，是「篇 → 章 → 节」三级结构。<br>' +
    '全书 <b>' + all + '</b> 节，已整理 <b>' + done + '</b> 节。<br>' +
    '<b>进任何一节后，点右上角「目录」都能直接跳到别的章节</b>，不用退回这一页。';
})();
