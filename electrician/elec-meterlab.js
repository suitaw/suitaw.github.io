/* elec-meterlab.js —— 万用表实验台的「电」：一个小电路 + 一块数字表，算读数（不管画面）
   3D 画面在 elec-3d.js 的 E3D.meterLab 里，它每次状态变了就调 MLab.read(st)。
   电路：12 V 电池（内阻 0.5 Ω）+ 开关 + 100 Ω 灯泡，串成一圈。三个节点：
     P＝电池正极（测点 T1）、A＝开关出来（T2，灯上端）、N＝电池负极（T3 灯下端、T4 电池负极）
   表：黑笔插 COM；红笔插 VΩ / mA / 10A。
     VΩ 孔：电压档内阻 10 MΩ（同 3.6a 的口径）；电阻档往外送 1 mA 测试电流
     mA 孔：内阻按 1 Ω（同 3.6a），里面有 200 mA 保险管
     10A 孔：0.01 Ω，不带保险（多数表是这样，说明书为准）
   数字口径都是 3.6a 已经核过的：12 V / 100 Ω 回路，串进 mA 档读 118.8 mA。 */
(function(){
'use strict';
const VB = 12, RB = 0.5, RL = 100, RSW = 0.001;
const NODES = ['P', 'A', 'N'];
const TP = {T1:'P', T2:'A', T3:'N', T4:'N'};

/* 解三个节点（N 接地，只解 P、A）：G·V = I */
function solve(els){
  const G = [[0,0],[0,0]], I = [0,0], ix = {P:0, A:1, N:-1};
  els.forEach(function(e){
    const a = ix[e.a], b = ix[e.b];
    if(e.g){ if(a>=0) G[a][a] += e.g; if(b>=0) G[b][b] += e.g; if(a>=0 && b>=0){ G[a][b] -= e.g; G[b][a] -= e.g; } }
    if(e.i){ if(a>=0) I[a] += e.i; if(b>=0) I[b] -= e.i; }        /* 电流源：从 b 经源流进 a */
  });
  G[0][0] += 1e-12; G[1][1] += 1e-12;                                /* 悬空节点别除零 */
  const det = G[0][0]*G[1][1] - G[0][1]*G[1][0];
  const vP = (I[0]*G[1][1] - G[0][1]*I[1]) / det, vA = (G[0][0]*I[1] - I[0]*G[1][0]) / det;
  return {P:vP, A:vA, N:0};
}

/* st = {batt 电池装着?, sw 开关合上?, dial 'off'|'dcv'|'acv'|'ohm'|'beep'|'ma'|'a', jack 'v'|'ma'|'a', red 测点或 null, black 测点或 null, fuse 保险好的?}
   返回 {lcd 屏幕字, unit, v 节点电压, lampW 灯功率, iMeter 流过表的电流, fuseBlow 这一下烧了保险?, beep, msg 提示, warn 是不是错误操作} */
function read(st){
  const r = st.red && TP[st.red], b = st.black && TP[st.black], on = r && b && st.dial !== 'off';
  const els = [];
  if(st.batt) els.push({a:'P', b:'N', g:1/RB, i:VB/RB});
  els.push({a:'P', b:'A', g:st.sw ? 1/RSW : 1e-12});
  els.push({a:'A', b:'N', g:1/RL});
  /* 表在电路里是什么：看红笔插哪个孔（不看旋钮！旋钮只管怎么显示） */
  let gm = 0;
  if(r && b && r !== b){
    if(st.jack === 'v') gm = (st.dial === 'ohm' || st.dial === 'beep') ? 0 : 1e-7;
    if(st.jack === 'ma') gm = st.fuse ? 1 : 0;
    if(st.jack === 'a') gm = 100;
  }
  if(gm) els.push({a:r, b:b, g:gm});
  const v = solve(els);
  const iM = (r && b && gm) ? (v[r] - v[b]) * gm : 0;
  const out = {v:v, lampW:Math.pow(v.A - v.N, 2)/RL, iMeter:iM, lcd:'', unit:'', msg:'', warn:false, beep:false, fuseBlow:false};
  if(st.dial === 'off'){ out.lcd = ''; out.msg = '旋钮在 OFF，表没开。'; return out; }
  if(!(r && b)){ out.lcd = st.dial === 'ohm' ? 'OL' : (st.dial === 'beep' ? 'OL' : '0.00'); out.unit = unitOf(st.dial);
    out.msg = !r && !b ? '点电路板上的铜接线柱放表笔：<b>先放红笔，再放黑笔</b>。' : (r ? '红笔放好了，再点一个接线柱放<b>黑笔</b>。' : '再放红笔。'); return out; }
  /* mA 孔串着 200 mA 保险：超了就烧 */
  if(st.jack === 'ma' && st.fuse && Math.abs(iM) > 0.2){ out.fuseBlow = true; }
  const dv = v[r] - v[b];
  switch(st.dial){
  case 'dcv':
    if(st.jack !== 'v'){ out.lcd = fmt(dv, 2); out.unit = 'V'; out.warn = true;
      out.msg = '<b>红笔插在电流孔上量电压 —— 这是把表当一根导线跨上去了。</b>'+ (Math.abs(iM) > 0.05 ? ' 表里正过着 '+fmtI(iM)+'。' : '') + '量电压红笔要插 VΩ 孔。'; break; }
    out.lcd = Math.abs(dv) > 19.99 ? 'OL' : fmt(dv, 2); out.unit = 'V';
    out.msg = Math.abs(dv) < 0.005 ? '两点之间没有电压差：要么是同一根线连着，要么电压全降在别处了。'
            : (dv < 0 ? '读数是<b>负</b>的：红黑笔反了（红笔那点电位更低）。数字表不怕反接，指针表会往反方向打。' : '红笔那一点比黑笔那一点高 <b>'+fmt(dv,2)+' V</b>。');
    break;
  case 'acv':
    out.lcd = '0.0'; out.unit = 'V~';
    out.msg = '这是<b>交流</b>档，电池是直流，所以读 0。量电池、电瓶要用直流档（V 加一横一虚线那个）。'; break;
  case 'ohm': case 'beep':
    if(st.batt){ out.lcd = '---'; out.unit = st.dial === 'ohm' ? 'Ω' : '';
      out.warn = true; out.msg = '<b>电池还装着 —— 带电测电阻读数没意义，严重的会烧表。</b>先点「拆下电池」再测。'; break; }
    if(st.jack !== 'v'){ out.lcd = 'OL'; out.unit = 'Ω'; out.msg = '测电阻红笔要插 VΩ 孔。'; break; }
    /* 电池拆了：往两笔之间送 1 mA，看压降 */
    const vv = solve([{a:'P', b:'A', g:st.sw ? 1/RSW : 1e-12}, {a:'A', b:'N', g:1/RL}, {a:r, b:b, i:0.001}]);
    const R = r === b ? 0 : Math.abs((vv[r] - vv[b]) / 0.001);
    if(st.dial === 'ohm'){ out.lcd = R > 1999 ? 'OL' : (R < 10 ? R.toFixed(2) : R.toFixed(1)); out.unit = 'Ω';
      out.msg = R > 1999 ? '超量程（OL）：两点之间断开的，或者电阻比这一档大。' : '两点之间 <b>'+out.lcd+' Ω</b>。' + (Math.abs(R-RL) < 2 ? '这就是灯丝的冷态电阻（亮着的时候会大好几倍）。' : ''); }
    else { out.beep = R < 30; out.lcd = R > 1999 ? 'OL' : R.toFixed(0); out.unit = '';
      out.msg = out.beep ? '<b>滴 ——</b> 通的（30 Ω 以下才响，各表不同）。' : '不响：两点之间断开，或电阻太大（灯丝 100 Ω 就不响）。'; }
    break;
  case 'ma': case 'a':
    if(st.jack === 'v'){ out.lcd = '0.00'; out.unit = st.dial === 'ma' ? 'mA' : 'A';
      out.msg = '红笔还插在 VΩ 孔：表里是 10 MΩ，等于把电路断开了，读 0、灯也不亮。<b>测电流要把红笔换到 mA 或 10A 孔。</b>'; break; }
    if(!st.fuse && st.jack === 'ma'){ out.lcd = '0.00'; out.unit = 'mA'; out.warn = true; out.msg = '<b>保险管烧了</b>，mA 档量什么都是 0。点「换保险管」。'; break; }
    const want = st.dial === 'ma' ? 'ma' : 'a';
    if(st.jack !== want){ out.msg = '旋钮和插孔对不上（旋钮 '+(want==='ma'?'mA':'A')+'、红笔在 '+(st.jack==='ma'?'mA':'10A')+' 孔）。读数不准，养成「先插孔、后拨档」的习惯。'; out.warn = true; }
    out.lcd = st.dial === 'ma' ? (Math.abs(iM) > 0.1999 ? 'OL' : (iM*1000).toFixed(1)) : (Math.abs(iM) > 9.99 ? 'OL' : iM.toFixed(2));
    out.unit = st.dial === 'ma' ? 'mA' : 'A';
    if(!out.warn) out.msg = Math.abs(iM) < 1e-4 ? '没有电流从表里过：表的两头没有电压差（同一根线上），或者电路没通。'
      : (Math.abs(iM) > 1 ? '<b>'+fmtI(iM)+' 从表里过！</b>表笔跨在灯两头，表把灯短接了 —— 电池直接对着表短路。'
      : '电流从红笔进、黑笔出，穿过表：<b>'+fmtI(iM)+'</b>。表是<b>串</b>在电路里的（跨在断开的开关两头，等于用表接通了回路）。');
    if(out.fuseBlow) out.msg = '<b>啪 —— 保险管烧了。</b>'+fmtI(iM)+' 远超 200 mA。表笔跨在灯（或电源）两头就是这个下场 —— 测电流必须<b>串</b>进去，不能并上。';
    break;
  }
  return out;
}
function unitOf(d){ return {dcv:'V', acv:'V~', ohm:'Ω', beep:'', ma:'mA', a:'A'}[d] || ''; }
function fmt(x, n){ const s = x.toFixed(n); return s === '-0.00' ? '0.00' : s; }
function fmtI(i){ const a = Math.abs(i); return a >= 1 ? a.toFixed(1)+' A' : (a*1000).toFixed(1)+' mA'; }

window.MLab = {read:read, TP:TP, VB:VB, RL:RL};
})();
