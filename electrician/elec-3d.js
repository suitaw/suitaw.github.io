/* elec-3d.js —— 课文里的 3D 元件（2026-11-27 起，先做 2.2 接触器样板）
   普通 script，不用 importmap：three 用动态 import() 从 CDN 拿，转镜头自己写（OrbitControls 要裸模块名 'three'，薄壳页没有 importmap）。
   用法：E3D.contactor(容器元素, {onStep}) → Promise<{set(on), cut(b), slow(b), labels(b), reset()}>
   尺寸单位按毫米：x 横向（L1 L2 L3 并排）、y 竖向（上进线 下出线）、z 朝外（0＝安装底板，正面朝镜头）。 */
(function(){
'use strict';
const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.js';
let THREE = null;
function loadThree(){ return THREE ? Promise.resolve(THREE) : import(THREE_URL).then(function(m){ THREE = m; return m; }); }

/* ── 样式（自带，宿主页只要引这个 js） ── */
const css = `
.k3d-v{position:relative;width:100%;aspect-ratio:1/1.02;border-radius:10px;overflow:hidden;background:var(--canvas);touch-action:none}
.k3d-v canvas{display:block;width:100%;height:100%}
.k3d-v .k3d-ld{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--tx3);font-size:.85rem}
.k3d-ln{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.k3d-lb{position:absolute;left:0;top:0;pointer-events:none;font-size:11px;line-height:1;padding:3px 6px;border-radius:9px;white-space:nowrap;
  background:rgba(12,16,20,.78);color:#e6edf5;border:1px solid rgba(255,255,255,.18);transform:translate(-50%,-50%)}
html.light .k3d-lb,[data-theme=light] .k3d-lb{background:rgba(255,255,255,.9);color:#242a31;border-color:rgba(0,0,0,.15)}
.k3d-lb.hot{background:var(--acc);color:#fff;border-color:var(--acc)}
.k3d-steps{display:flex;gap:4px;margin:10px 12px 2px}
.k3d-steps span{flex:1;text-align:center;font-size:.74rem;padding:6px 2px;border-radius:8px;border:1px solid var(--line);color:var(--tx3);transition:all .2s}
.k3d-steps span.on{border-color:var(--acc);background:var(--accbg);color:var(--acc);font-weight:600}
.k3d-info{margin:10px 12px 12px;font-size:.86rem;line-height:1.65;color:var(--tx2);min-height:3.3em}
.k3d-info b{color:var(--tx)}
`;
function addCss(){ if(document.getElementById('k3dcss')) return; const s = document.createElement('style'); s.id = 'k3dcss'; s.textContent = css; document.head.appendChild(s); }

/* ── 通用小件 ── */
function mk(T){
  const H = {};
  H.M = function(color, o){ return new T.MeshStandardMaterial(Object.assign({color:color, roughness:0.6, metalness:0}, o||{})); };
  H.box = function(w, h, d, x, y, z, mat, parent){ const m = new T.Mesh(new T.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); (parent).add(m); return m; };
  /* 沿 z 轴的圆柱（螺钉、触点银片） */
  H.cylZ = function(r, d, x, y, z, mat, parent, seg){ const g = new T.CylinderGeometry(r, r, d, seg||20); g.rotateX(Math.PI/2); const m = new T.Mesh(g, mat); m.position.set(x, y, z); parent.add(m); return m; };
  /* 螺旋弹簧：底在 z=0，长 len，沿 +z；动画里改 scale.z */
  H.spring = function(r, turns, len, wire, mat){
    const pts = [], n = turns*24;
    for(let i=0;i<=n;i++){ const a = i/24*Math.PI*2; pts.push(new T.Vector3(Math.cos(a)*r, Math.sin(a)*r, len*i/n)); }
    return new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), n*2, wire, 6, false), mat);
  };
  /* 线：折线点 → 圆管 */
  H.wire = function(pts, r, mat, parent){
    const v = pts.map(function(p){ return new T.Vector3(p[0], p[1], p[2]); });
    const path = new T.CurvePath();
    for(let i=0;i<v.length-1;i++) path.add(new T.LineCurve3(v[i], v[i+1]));
    const m = new T.Mesh(new T.TubeGeometry(path, v.length*8, r, 8, false), mat); parent.add(m); return m;
  };
  /* 折线（用来让电流小点沿着走）：返回 f(t∈0..1) → Vector3 */
  H.poly = function(pts){
    const v = pts.map(function(p){ return new T.Vector3(p[0], p[1], p[2]); }), L = [0];
    for(let i=1;i<v.length;i++) L.push(L[i-1] + v[i].distanceTo(v[i-1]));
    const tot = L[L.length-1];
    return function(t, out){ const s = ((t%1)+1)%1*tot; let i = 1; while(i<L.length-1 && L[i]<s) i++;
      const k = (s-L[i-1])/((L[i]-L[i-1])||1); return (out||new T.Vector3()).lerpVectors(v[i-1], v[i], k); };
  };
  /* 字牌：canvas 贴图的小平面，贴在零件表面（不转向镜头，像印上去的） */
  H.plate = function(text, w, h, x, y, z, fg, bg, parent){
    const c = document.createElement('canvas'), s = 8; c.width = w*s*2; c.height = h*s*2;
    const g = c.getContext('2d');
    if(bg){ g.fillStyle = bg; g.fillRect(0, 0, c.width, c.height); }
    g.fillStyle = fg; g.font = '600 '+Math.round(h*s*1.45)+'px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(text, c.width/2, c.height/2+1);
    const tex = new T.CanvasTexture(c); tex.colorSpace = T.SRGBColorSpace; tex.anisotropy = 4;
    const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({map:tex, transparent:!bg, toneMapped:false}));
    m.position.set(x, y, z); parent.add(m); return m;
  };
  return H;
}

/* 简单环境光贴图：竖向渐变「天空」，金属件才有反光可看 */
function envMap(T, renderer){
  const c = document.createElement('canvas'); c.width = 256; c.height = 128;
  const g = c.getContext('2d'), gr = g.createLinearGradient(0, 0, 0, 128);
  gr.addColorStop(0, '#ffffff'); gr.addColorStop(0.45, '#cfd6de'); gr.addColorStop(0.55, '#6f7780'); gr.addColorStop(1, '#2a2f35');
  g.fillStyle = gr; g.fillRect(0, 0, 256, 128);
  g.fillStyle = 'rgba(255,255,255,.9)'; g.fillRect(40, 18, 60, 14); g.fillRect(160, 24, 50, 10);   /* 两盏「灯」，给金属一点高光 */
  const tex = new T.CanvasTexture(c); tex.mapping = T.EquirectangularReflectionMapping; tex.colorSpace = T.SRGBColorSpace;
  const pm = new T.PMREMGenerator(renderer), rt = pm.fromEquirectangular(tex); pm.dispose(); tex.dispose();
  return rt.texture;
}

/* 转模型（同魔方练习页的手感）：镜头不动，模型绕自己的中心转；拖动时绕「屏幕上垂直于手指方向」那根轴转（左乘），
   哪个角度都能到、不会卡住。两指捏合 / 滚轮缩放；拖动超过 6px 不算点击 */
function trackball(T, cam, el, pivot, onChange){
  const st = {r:265, r0:265, q0:new T.Quaternion()}, pts = new Map(), q = new T.Quaternion(), ax = new T.Vector3();
  let pinch0 = 0, rp = 0, moved = 0;
  function apply(){ cam.position.set(0, 0, st.r); cam.lookAt(0, 0, 0); onChange(); }
  el.addEventListener('pointerdown', function(e){ el.setPointerCapture(e.pointerId); pts.set(e.pointerId, {x:e.clientX, y:e.clientY}); moved = 0;
    if(pts.size===2){ const a = [...pts.values()]; pinch0 = Math.hypot(a[0].x-a[1].x, a[0].y-a[1].y); rp = st.r; } });
  el.addEventListener('pointermove', function(e){ const p = pts.get(e.pointerId); if(!p) return;
    const dx = e.clientX-p.x, dy = e.clientY-p.y; p.x = e.clientX; p.y = e.clientY; moved += Math.abs(dx)+Math.abs(dy);
    if(pts.size===1){ const L = Math.hypot(dx, dy); if(!L) return;
      ax.set(dy/L, dx/L, 0); q.setFromAxisAngle(ax, L*0.008); pivot.quaternion.premultiply(q); onChange(); }
    else if(pts.size===2){ const a = [...pts.values()], d = Math.hypot(a[0].x-a[1].x, a[0].y-a[1].y); st.r = Math.min(520, Math.max(110, rp*pinch0/d)); apply(); } });
  function up(e){ pts.delete(e.pointerId); }
  el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  el.addEventListener('wheel', function(e){ e.preventDefault(); st.r = Math.min(520, Math.max(110, st.r*(1+e.deltaY*0.001))); apply(); }, {passive:false});
  return {apply:apply, moved:function(){ return moved; }, st:st,
    /* 摆到「镜头在球坐标 (th, ph) 看过来」的样子：算出那台镜头的朝向，模型转它的逆 */
    setView:function(th, ph, r, keep){ const o = new T.Object3D(), sp = Math.sin(ph);
      o.position.set(sp*Math.sin(th), Math.cos(ph), sp*Math.cos(th)); o.up.set(0, 1, 0); o.lookAt(0, 0, 0);
      /* Object3D.lookAt 对非镜头是让 +z 朝目标；镜头要 -z 朝目标，所以再绕 y 转半圈 */
      o.quaternion.multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0, 1, 0), Math.PI));
      pivot.quaternion.copy(o.quaternion).invert(); if(r) st.r = r; if(keep){ st.q0.copy(pivot.quaternion); st.r0 = st.r; } apply(); },
    reset:function(){ pivot.quaternion.copy(st.q0); st.r = st.r0; apply(); }};
}

/* 搭舞台：渲染器、镜头、灯光、只在需要时画（省电） */
function stage(T, el){
  const renderer = new T.WebGLRenderer({antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1, 2));
  renderer.outputColorSpace = T.SRGBColorSpace; renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  el.appendChild(renderer.domElement);
  const scene = new T.Scene(); scene.environment = envMap(T, renderer); scene.environmentIntensity = 0.55;
  const cam = new T.PerspectiveCamera(30, 1, 5, 3000);
  scene.add(new T.HemisphereLight(0xffffff, 0x3a4048, 1.1));
  const d1 = new T.DirectionalLight(0xffffff, 1.6); d1.position.set(120, 200, 260); scene.add(d1);
  const d2 = new T.DirectionalLight(0xbfd4ff, 0.6); d2.position.set(-200, -60, 120); scene.add(d2);
  const S = {renderer:renderer, scene:scene, cam:cam, dirty:true, live:0};
  S.size = function(){ const w = el.clientWidth, h = el.clientHeight; if(!w||!h) return; renderer.setSize(w, h, false); cam.aspect = w/h; cam.updateProjectionMatrix(); S.dirty = true; };
  new ResizeObserver(S.size).observe(el);
  return S;
}

window.E3D = {loadThree:loadThree, mk:mk, stage:stage, trackball:trackball, addCss:addCss};
})();

/* ══════════════ 交流接触器 CJX2s-0911（剖开看） ══════════════
   结构照常见 CJX2 系列：底座里是 E 形静铁芯 + 线圈（直动式，衔铁朝底板方向吸）；
   上半是触点系统：三对桥式主触点（双断点）+ 辅助常开 13-14 + 辅助常闭 21-22，相间有隔板。
   触点架（塑料连杆）把衔铁和所有动触点连成一体，顶端从前盖方窗露出来。 */
(function(){
'use strict';
const PARTS = {
  core:   ['静铁芯', '硅钢片一片片叠起来的（减少涡流发热），<b>固定不动</b>。线圈一通电，它就变成电磁铁。'],
  coil:   ['线圈', '两头接 <b>A1、A2</b>，走的是<b>控制回路</b>的小电流。线圈电压印在铭牌上（这台 220V），<b>接错电压当场烧</b>。'],
  shade:  ['短路环', '嵌在铁芯端面的一小圈铜。交流电每秒过零 100 次，吸力也跟着掉到零；短路环让吸力错开不掉到零，<b>没有它衔铁会抖、嗡嗡响</b>。'],
  arm:    ['衔铁（动铁芯）', '能动的那块铁。被静铁芯吸过去时，带着整个触点架一起走 —— <b>行程只有几毫米</b>。'],
  spring: ['反力弹簧', '线圈断电、吸力消失后，<b>全靠它把衔铁和触点架顶回去</b>。接触器「一断电必然断开」就是它保证的。'],
  carrier:['触点架（连杆）', '塑料的，把衔铁和<b>所有动触点</b>连成一体 —— 原理图上那条虚线画的就是它。顶上露出外壳，<b>断电检修时</b>可以用螺丝刀按下去试动作，带电时别按。'],
  mfix:   ['主触点 · 静触点', '跟上下接线端子连在一起的铜排，端头焊着银触点（银导电好、不容易氧化）。'],
  mbr:    ['主触点 · 动触点（桥）', '一座「桥」同时压两个静触点，<b>一相有两个断口</b>，断开时电弧被分成两段，更好灭。三座桥<b>同时</b>动。'],
  cspr:   ['触点弹簧', '藏在桥后面。触点碰上以后衔铁还要再走一小段（<b>超程</b>），压缩这根弹簧，让触点压紧 —— 触点磨损了也还能压住。'],
  ano:    ['辅助常开 13-14', '线圈没电时<b>断开</b>，吸合后闭合。走控制回路小电流，做<b>自锁</b>用的就是它（9.1 节）。'],
  anc:    ['辅助常闭 21-22', '线圈没电时<b>闭合</b>，吸合后断开（比常开<b>先</b>动）。正反转<b>互锁</b>用的就是它（11.6 节）。'],
  barrier:['相间隔板 / 灭弧室', '把三相隔开：断开时拉出的电弧被关在自己那格里冷却熄灭，不会窜到旁边那相造成相间短路。'],
  term:   ['主接线端子', '<b>上进下出</b>：1/L1、3/L2、5/L3 接电源，2/T1、4/T2、6/T3 接电动机。'],
  coilT:  ['线圈端子 A1 / A2', '控制回路接这里。A1、A2 之间有电 → 吸合；没电 → 释放。'],
  housing:['外壳', '阻燃塑料。底部卡在 35mm 导轨上，也可以用螺钉固定。']
};

E3D.contactor = function(el, opt){
  opt = opt||{};
  E3D.addCss();
  el.innerHTML = '<div class="k3d-ld">正在加载 3D 模型…</div>';
  return E3D.loadThree().then(function(T){ return (E3D.last = E3D._finish(build(T, el, opt))); }).catch(function(e){
    console.warn('E3D', e);
    el.innerHTML = '<div class="k3d-ld">3D 模型没加载出来（要联网，浏览器要支持 WebGL）。下面的平面图一样能看。</div>'; return null; });
};

function build(T, el, opt){
  el.innerHTML = '';
  const H = E3D.mk(T), S = E3D.stage(T, el), scene = S.scene;
  const pivot = new T.Group(); scene.add(pivot);                                /* 转的是它（绕模型中心） */
  const root = new T.Group(); root.rotation.x = -Math.PI/2; root.position.set(0, -40, 2); pivot.add(root);   /* 平躺：底板朝下，衔铁往下吸（跟平面图同一个方向） */
  const hit = [];                                   /* 能点的零件 */
  function tag(m, k){ m.userData.part = k; hit.push(m); return m; }

  /* 材料：真实材料色 */
  const MAT = {
    shell: H.M(0xb9bec4, {roughness:0.55, transparent:true}),        /* 外壳灰白阻燃塑料 */
    shellD:H.M(0x8d939a, {roughness:0.6, transparent:true}),
    steel: H.M(0x7d858d, {metalness:0.7, roughness:0.42}),           /* 硅钢片 */
    steel2:H.M(0x6c737b, {metalness:0.7, roughness:0.45}),
    cu:    H.M(0xc77a3f, {metalness:0.85, roughness:0.32}),          /* 铜 */
    winding:H.M(0xb8642c, {metalness:0.6, roughness:0.38}),
    ag:    H.M(0xe4e7ea, {metalness:0.95, roughness:0.2}),           /* 银触点 */
    brass: H.M(0xd2b062, {metalness:0.85, roughness:0.3}),
    zinc:  H.M(0xc9ced3, {metalness:0.9, roughness:0.3}),
    bob:   H.M(0x2d3136, {roughness:0.7}),                           /* 线圈骨架 */
    carrier:H.M(0x3f6fa8, {roughness:0.55}),                         /* 触点架（多数牌子是彩色塑料） */
    barrier:H.M(0x6b7178, {roughness:0.8, transparent:true}),
    spr:   H.M(0xaab2ba, {metalness:0.9, roughness:0.3}),
    blk:   H.M(0x24272b, {roughness:0.5})
  };
  const PX = [-27, -13, 1], AX = [15, 26];          /* 三相、辅助常开、辅助常闭 的 x */
  const ZF = 60;                                    /* 静触点那一层的 z */
  const TRAVEL = 4;                                 /* 衔铁行程 4 mm */

  /* ── 外壳：下半（电磁系统）z 0~40、上半（触点系统）z 40~72、前盖 72~82 ── */
  const shell = new T.Group(); root.add(shell);
  const W = 70, HH = 84;
  [[W, 2, 40, 0, 41, 20], [W, 2, 40, 0, -41, 20], [2, HH, 40, -35, 0, 20], [2, HH, 40, 35, 0, 20], [W, HH, 2, 0, 0, 1]].forEach(function(b){ tag(H.box(b[0], b[1], b[2], b[3], b[4], b[5], MAT.shellD, shell), 'housing'); });
  /* 上半：端子台阶（上下两排）+ 两侧墙 */
  [[W, 18, 32, 0, 33, 56], [W, 18, 32, 0, -33, 56]].forEach(function(b){ tag(H.box(b[0], b[1], b[2], b[3], b[4], b[5], MAT.shell, shell), 'housing'); });
  [[2, 48, 36, -35, 0, 58], [2, 48, 36, 35, 0, 58]].forEach(function(b){ tag(H.box(b[0], b[1], b[2], b[3], b[4], b[5], MAT.shell, shell), 'housing'); });
  /* 前盖：中间凸出一块，开方窗给触点架露头 */
  [[W, 14, 8, 0, 17, 80], [W, 14, 8, 0, -17, 80], [24, 20, 8, -23, 0, 80], [24, 20, 8, 23, 0, 80]].forEach(function(b){ tag(H.box(b[0], b[1], b[2], b[3], b[4], b[5], MAT.shell, shell), 'housing'); });
  /* 导轨卡脚 */
  tag(H.box(50, 6, 6, 0, -20, -3, MAT.shellD, shell), 'housing'); tag(H.box(50, 6, 6, 0, 20, -3, MAT.shellD, shell), 'housing');
  const shellMats = [MAT.shell, MAT.shellD];

  /* 隔板：相与相之间 */
  [-20, -6, 8, 21].forEach(function(x){ tag(H.box(1.4, 40, 26, x, 0, 58, MAT.barrier, root), 'barrier'); });
  MAT.barrier.opacity = 0.55;

  /* ── 静铁芯：E 形，叠片（x 方向一片片） ── */
  const core = new T.Group(); root.add(core);
  for(let i=0;i<7;i++){ const x = -12.6 + i*4.2;
    tag(H.box(3.8, 44, 6, x, 0, 7, i%2 ? MAT.steel : MAT.steel2, core), 'core');     /* 底轭 */
    [[-19, 6], [0, 10], [19, 6]].forEach(function(l){ tag(H.box(3.8, l[1], 20, x, l[0], 20, i%2 ? MAT.steel : MAT.steel2, core), 'core'); });
  }
  /* 短路环：嵌在两边柱端面 */
  [-19, 19].forEach(function(y){ const g = new T.Group();
    [[30, 1.2, 1.6, 0, 2.4], [30, 1.2, 1.6, 0, -2.4], [1.2, 6, 1.6, -14.6, 0], [1.2, 6, 1.6, 14.6, 0]].forEach(function(b){ tag(H.box(b[0], b[1], b[2], b[3], y+b[4], 29.4, MAT.cu, g), 'shade'); });
    root.add(g); });

  /* ── 线圈：骨架 + 铜绕组（中柱外面一圈） ── */
  const ring = new T.Shape(); (function(s, w, h, r){ s.moveTo(-w/2+r, -h/2); s.lineTo(w/2-r, -h/2); s.quadraticCurveTo(w/2, -h/2, w/2, -h/2+r); s.lineTo(w/2, h/2-r); s.quadraticCurveTo(w/2, h/2, w/2-r, h/2); s.lineTo(-w/2+r, h/2); s.quadraticCurveTo(-w/2, h/2, -w/2, h/2-r); s.lineTo(-w/2, -h/2+r); s.quadraticCurveTo(-w/2, -h/2, -w/2+r, -h/2); })(ring, 40, 26, 6);
  const hole = new T.Path(); hole.moveTo(-15, -6); hole.lineTo(15, -6); hole.lineTo(15, 6); hole.lineTo(-15, 6); hole.lineTo(-15, -6); ring.holes.push(hole);
  const wg = new T.ExtrudeGeometry(ring, {depth:14, bevelEnabled:false, curveSegments:6});
  const winding = tag(new T.Mesh(wg, MAT.winding), 'coil'); winding.position.z = 13; root.add(winding);
  for(let k=1;k<7;k++){ const ln = tag(new T.Mesh(new T.ExtrudeGeometry(ring, {depth:0.25, bevelEnabled:false, curveSegments:6}), MAT.cu), 'coil'); ln.position.z = 13+k*2; ln.scale.set(1.006, 1.012, 1); root.add(ln); }   /* 绕组一圈圈的纹 */
  [12, 27.4].forEach(function(z){ const fl = tag(new T.Mesh(new T.ExtrudeGeometry((function(){ const s = new T.Shape(); s.moveTo(-23, -15); s.lineTo(23, -15); s.lineTo(23, 15); s.lineTo(-23, 15); s.lineTo(-23, -15); s.holes.push(hole); return s; })(), {depth:1.6, bevelEnabled:false}), MAT.bob), 'coil'); fl.position.z = z; root.add(fl); });

  /* 线圈端子 A1（上）A2（下）：在底座两角伸出来 */
  const coilT = [[26, 46, 'A1'], [-26, -46, 'A2']];
  coilT.forEach(function(c){
    tag(H.box(14, 10, 12, c[0], c[1], 34, MAT.shell, shell), 'housing');
    tag(H.box(9, 7, 0.8, c[0], c[1], 40.4, MAT.zinc, root), 'coilT');
    tag(H.cylZ(3, 2.4, c[0], c[1], 42, MAT.zinc, root), 'coilT');
    tag(H.box(4.2, 0.7, 0.6, c[0], c[1], 43.4, MAT.blk, root), 'coilT');
    H.plate(c[2], 8, 4, c[0], c[1] + (c[1]>0 ? 7.5 : -7.5), 40.2, '#1f2328', '#d9dde1', root);
  });
  H.wire([[23, 13, 20], [26, 30, 26], [26, 44, 38]], 0.7, MAT.cu, root);   /* 线圈引出线 → A1 */
  H.wire([[-23, -13, 20], [-26, -30, 26], [-26, -44, 38]], 0.7, MAT.cu, root);

  /* ── 动的部分：衔铁 + 触点架（一起走） ── */
  const mov = new T.Group(); root.add(mov);
  for(let i=0;i<7;i++){ const x = -12.6 + i*4.2;
    tag(H.box(3.8, 44, 7, x, 0, 37.5, i%2 ? MAT.steel : MAT.steel2, mov), 'arm'); }
  tag(H.box(68, 8, 6, 0, 0, 44.5, MAT.carrier, mov), 'carrier');                  /* 下横梁：坐在衔铁上 */
  [-32, 32].forEach(function(x){ tag(H.box(3, 8, 28.5, x, 0, 61.75, MAT.carrier, mov), 'carrier'); });   /* 两根立柱（在三相外侧，不挡触点） */
  tag(H.box(68, 8, 4, 0, 0, 74, MAT.carrier, mov), 'carrier');                    /* 上横梁：常开桥经触点弹簧挂在它下面 */
  tag(H.box(4, 6, 6, AX[1], 0, 50.5, MAT.carrier, mov), 'carrier');              /* 常闭桥的托座 */
  tag(H.box(14, 14, 11, 0, 0, 81.5, MAT.carrier, mov), 'carrier');                /* 露头 */
  H.plate('KM', 9, 5, 0, 0, 87.1, '#ffffff', null, mov);
  root.userData = {mov:mov};
  return {T:T, H:H, S:S, root:root, pivot:pivot, hit:hit, MAT:MAT, PX:PX, AX:AX, ZF:ZF, TRAVEL:TRAVEL, shell:shell, shellMats:shellMats, mov:mov, el:el, opt:opt, PARTS:PARTS, winding:winding};
}
E3D._PARTS = PARTS; E3D._buildBase = build;
})();

/* ── 接触器：触点、弹簧、电流、动画、交互 ── */
(function(){
'use strict';
E3D._finish = function(C){
  const T = C.T, H = C.H, S = C.S, root = C.root, MAT = C.MAT, mov = C.mov, el = C.el, opt = C.opt;
  function tag(m, k){ m.userData.part = k; C.hit.push(m); return m; }
  const PH = [0xe0a92e, 0x3fa845, 0xcf4436];        /* 国标三相线色 黄 绿 红 */
  const lbl = [['1/L1','2/T1'], ['3/L2','4/T2'], ['5/L3','6/T3'], ['13NO','14NO'], ['21NC','22NC']];
  const poles = [];                                  /* 每对触点：{x, nc, br(桥), spr(触点弹簧)} */

  /* 静触点铜排 + 端子 */
  C.PX.concat(C.AX).forEach(function(x, i){
    const aux = i>=3, nc = i===4, w = aux ? 4 : 6;
    [1, -1].forEach(function(sg){
      tag(H.box(w, 24, 2, x, sg*20, 60, MAT.cu, root), 'mfix');                       /* 平的一段 y ±8~32 */
      tag(H.box(w, 2, 13, x, sg*32, 66.5, MAT.cu, root), 'mfix');                     /* 立起来接端子 */
      tag(H.cylZ(aux ? 1.6 : 2.3, 1, x, sg*10, nc ? 58.5 : 61.5, MAT.ag, root), aux ? (nc ? 'anc' : 'ano') : 'mfix');   /* 银触点：常开朝外、常闭朝里 */
      tag(H.box(aux ? 8 : 10, 9, 0.8, x, sg*33, 72.4, MAT.zinc, root), 'term');      /* 压线板 */
      tag(H.cylZ(aux ? 2.4 : 3.2, 2.6, x, sg*33, 74, MAT.zinc, root), 'term');        /* 螺钉 */
      const sl = H.box(aux ? 3.4 : 4.6, 0.7, 0.6, x, sg*33, 75.4, MAT.blk, root); sl.rotation.z = 0.4;
      H.plate(lbl[i][sg>0 ? 0 : 1], aux ? 9.5 : 11, 3.4, x, sg*26.3, 72.15, '#1f2328', null, root);   /* 印在螺钉内侧，外侧要走线 */
    });
    /* 动触点桥 */
    const br = new T.Group(); root.add(br);
    tag(H.box(w, 26, 2, 0, 0, 0, aux ? (nc ? MAT.brass : MAT.brass) : MAT.cu, br), aux ? (nc ? 'anc' : 'ano') : 'mbr');
    [1, -1].forEach(function(sg){ tag(H.cylZ(aux ? 1.6 : 2.3, 1, 0, sg*10, nc ? 1.5 : -1.5, MAT.ag, br), aux ? (nc ? 'anc' : 'ano') : 'mbr'); });
    br.position.set(x, 0, nc ? 55.5 : 67);
    let spr = null;
    if(!nc){ spr = tag(H.spring(aux ? 1.4 : 2, 5, 4, 0.35, MAT.spr), aux ? 'ano' : 'cspr'); spr.position.set(x, 0, 68); root.add(spr); }
    poles.push({x:x, nc:nc, aux:aux, br:br, spr:spr});
  });

  /* 反力弹簧：两根，底在底座，顶着下横梁 */
  const rsp = [-27, 27].map(function(x){ const m = tag(H.spring(3, 9, 37.5, 0.55, MAT.spr), 'spring'); m.position.set(x, 0, 4); root.add(m); return m; });

  /* 外接导线：主电路按相色，控制线黑 */
  const cabMat = PH.map(function(c){ return H.M(c, {roughness:0.5}); });
  C.PX.forEach(function(x, i){ [1, -1].forEach(function(sg){ H.wire([[x, sg*33, 76.5], [x, sg*33, 79], [x, sg*47, 79]], 1.7, cabMat[i], root); }); });
  C.AX.forEach(function(x){ [1, -1].forEach(function(sg){ H.wire([[x, sg*33, 75.5], [x, sg*33, 78], [x, sg*46, 78]], 0.9, MAT.blk, root); }); });
  [[26, 46], [-26, -46]].forEach(function(c){ const sg = c[1]>0 ? 1 : -1; H.wire([[c[0], c[1], 43.5], [c[0], c[1], 46], [c[0], c[1]+sg*12, 46]], 0.9, MAT.blk, root); });

  /* 每个零件一份材质（点中高亮不能连带别的零件） */
  C.hit.forEach(function(m){ if(m.userData.part!=='housing') m.material = m.material.clone(); });

  /* ── 电流小点（橙＝电流方向）、磁通小点（蓝） ── */
  const DOT = new T.SphereGeometry(1.15, 10, 8);
  const curM = new T.MeshBasicMaterial({color:0xff9a2e, toneMapped:false, transparent:true});
  const fluxM = new T.MeshBasicMaterial({color:0x4fb4ff, toneMapped:false, transparent:true});
  function dots(n, mat, path){ const a = []; for(let i=0;i<n;i++){ const d = new T.Mesh(DOT, mat); d.visible = false; root.add(d); a.push(d); } return {a:a, path:path, ph:0}; }
  const mainP = C.PX.map(function(x){ return dots(9, curM, H.poly([[x, 47, 79], [x, 33, 79], [x, 33, 61], [x, 10, 61], [x, 10, 65], [x, -10, 65], [x, -10, 61], [x, -33, 61], [x, -33, 79], [x, -47, 79]])); });
  const coilP = dots(7, curM, H.poly([[26, 58, 46], [26, 46, 46], [26, 44, 38], [26, 30, 26], [23, 13, 20], [0, 13, 20], [-23, -13, 20], [-26, -30, 26], [-26, -44, 38], [-26, -46, 46], [-26, -58, 46]]));
  const fluxP = [1, -1].map(function(sg){ return dots(6, fluxM, null); });
  /* 电弧：主触点断开那一下，两个断口各闪一下 */
  const arcM = new T.MeshBasicMaterial({color:0xcfe4ff, toneMapped:false, transparent:true, opacity:0, blending:T.AdditiveBlending, depthWrite:false});
  const arcs = []; C.PX.forEach(function(x){ [10, -10].forEach(function(y){ const m = new T.Mesh(new T.SphereGeometry(2.6, 12, 10), arcM); m.position.set(x, y, 63.5); root.add(m); arcs.push(m); }); });

  /* ── 镜头 ── */
  const orb = E3D.trackball(T, S.cam, S.renderer.domElement, C.pivot, function(){ S.dirty = true; });
  orb.setView(0.4, 0.95, 265, true);

  /* ── 状态 ── */
  const st = {on:false, I:0, t:0, slow:false, cut:true, labels:false, sel:null, arc:0, wasMain:false, step:0, stepHold:0};

  /* 标注（HTML 小牌子，跟着零件投影） */
  const LB = [['core', 15.5, -19, 18], ['coil', 21, 8, 24], ['shade', 15.5, 21, 31], ['arm', 15.5, -8, 38, 1], ['spring', 27, -4, 22],
              ['carrier', 0, 7, 88, 1], ['mbr', -13, -15, 67], ['mfix', -27, 24, 60], ['ano', 15, 4, 69], ['anc', 26, -4, 53], ['term', -27, 33, 78], ['coilT', 26, 46, 47]];
  const lbEls = LB.map(function(l){ const d = document.createElement('div'); d.className = 'k3d-lb'; d.textContent = E3D._PARTS[l[0]][0].replace(/（.*）| · .*/, '');
    d.style.display = 'none'; el.appendChild(d); return d; });
  const v3 = new T.Vector3();
  const SHORT = {mfix:'静触点', mbr:'动触点（桥）', ano:'辅助常开', anc:'辅助常闭', coilT:'线圈端子', term:'接线端子', arm:'衔铁', carrier:'触点架'};
  lbEls.forEach(function(d, i){ const k = LB[i][0]; if(SHORT[k]) d.textContent = SHORT[k]; });
  /* 标注：名字牌排在左右两边，用引线指到零件上，不压模型（他 11-27 要的） */
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('class', 'k3d-ln'); el.appendChild(svg);
  function placeLabels(){
    const w = el.clientWidth, h = el.clientHeight, side = [[], []];
    LB.forEach(function(l, i){ const d = lbEls[i]; const show = st.labels || st.sel===l[0];
      d.style.display = show ? '' : 'none'; if(!show) return;
      v3.set(l[1], l[2], l[3] + (l[4] ? mov.position.z : 0)).applyMatrix4(root.matrixWorld).project(S.cam);
      const ax = (v3.x+1)/2*w, ay = (1-v3.y)/2*h;
      side[ax < w/2 ? 0 : 1].push({d:d, ax:ax, ay:ay, y:ay, w:d.offsetWidth||60, h:d.offsetHeight||20, hot:st.sel===l[0]}); });
    let lines = '';
    side.forEach(function(arr, k){
      arr.sort(function(p, q){ return p.ay - q.ay; });
      const gap = 4, top = 8, bot = h - 8;
      arr.forEach(function(r, i){ const prev = arr[i-1]; r.y = Math.max(r.ay, top + r.h/2); if(prev) r.y = Math.max(r.y, prev.y + (prev.h+r.h)/2 + gap); });
      for(let i=arr.length-1;i>=0;i--){ const r = arr[i], nx = arr[i+1]; r.y = Math.min(r.y, nx ? nx.y - (nx.h+r.h)/2 - gap : bot - r.h/2); }
      arr.forEach(function(r){
        const cx = k ? w - 6 - r.w/2 : 6 + r.w/2, ex = k ? w - 6 - r.w : 6 + r.w;
        r.d.style.left = cx+'px'; r.d.style.top = r.y+'px'; r.d.classList.toggle('hot', r.hot);
        const c = r.hot ? 'var(--acc)' : 'var(--tx3)';
        lines += '<polyline points="'+ex+','+r.y+' '+(ex + (k ? -8 : 8))+','+r.y+' '+r.ax+','+r.ay+'" fill="none" stroke="'+c+'" stroke-width="1.2"/>'+
                 '<circle cx="'+r.ax+'" cy="'+r.ay+'" r="2.6" fill="'+c+'" stroke="var(--card)" stroke-width="1"/>';
      });
    });
    svg.innerHTML = lines;
  }

  function setCut(b){ st.cut = b;
    C.shell.traverse(function(m){ if(!m.isMesh) return; m.material.opacity = b ? 0.08 : 1; m.material.depthWrite = !b; m.material.needsUpdate = true; });
    S.dirty = true; }
  C.shellMats.forEach(function(mm){ mm.transparent = true; });
  setCut(true);

  /* 点零件 */
  const ray = new T.Raycaster(), ndc = new T.Vector2();
  const OUTLINE = new T.MeshBasicMaterial({color:0x2f90d6, side:T.BackSide, toneMapped:false});
  function pick(e){
    const r = S.renderer.domElement.getBoundingClientRect();
    ndc.set((e.clientX-r.left)/r.width*2-1, -((e.clientY-r.top)/r.height*2-1)); ray.setFromCamera(ndc, S.cam);
    const hs = ray.intersectObjects(C.hit.filter(function(m){ return !(st.cut && m.userData.part==='housing'); }), false);
    select(hs.length ? hs[0].object.userData.part : null);
  }
  S.renderer.domElement.addEventListener('pointerup', function(e){ if(orb.moved() < 6) pick(e); });
  function select(k){
    st.sel = k;
    /* 选中＝外面套一层蓝色描边（背面渲染、放大一点），零件本色不动 */
    C.hit.forEach(function(m){ if(m.userData.part==='housing') return; const on = k && m.userData.part===k;
      if(on && !m.userData.ol){ const o = new T.Mesh(m.geometry, OUTLINE); o.scale.setScalar(1.08); m.add(o); m.userData.ol = o; }
      if(!on && m.userData.ol){ m.remove(m.userData.ol); m.userData.ol = null; } });
    if(opt.onInfo) opt.onInfo(k ? E3D._PARTS[k] : null);
    S.dirty = true;
  }

  /* ── 每帧 ── */
  let last = performance.now(), visible = true;
  new IntersectionObserver(function(es){ visible = es[0].isIntersecting; }).observe(el);
  const sm = function(){ return st.slow ? 4 : 1; };
  function tick(now){
    requestAnimationFrame(tick);
    const dt = Math.min(0.05, (now-last)/1000); last = now;
    if(!visible || !el.clientWidth) return;
    const k = sm(); let busy = false;
    /* 线圈电流：通电 0.35s 升满，断电 0.15s 掉光（都已放慢，见页面文字） */
    if(st.on && st.I<1){ st.I = Math.min(1, st.I + dt/(0.35*k)); busy = true; }
    if(!st.on && st.I>0){ st.I = Math.max(0, st.I - dt/(0.15*k)); busy = true; }
    /* 衔铁：吸力过了弹簧力才动，越近越快（气隙小吸力大）；释放靠弹簧 */
    if(st.on && st.I>0.6 && st.t<1){ st.t = Math.min(1, st.t + dt/(0.5*k)*(0.35+1.8*st.t)); busy = true; }
    if(!st.on && st.I<0.4 && st.t>0){ st.t = Math.max(0, st.t - dt/(0.4*k)*(0.6+0.8*st.t)); busy = true; }
    const z = -C.TRAVEL*st.t; mov.position.z = z;
    rsp.forEach(function(m){ m.scale.z = (37.5+z)/37.5; });
    const d = C.TRAVEL*st.t;
    poles.forEach(function(p){
      if(p.nc){ p.br.position.z = 55.5 - Math.max(0, d-1); }                 /* 常闭：先空走 1mm，再被托座拉开 */
      else { const dz = Math.min(d, 2.5); p.br.position.z = 67 - dz;           /* 常开：走 2.5mm 碰上，剩下 1.5mm 是超程 */
             p.spr.position.z = 68 - dz; p.spr.scale.z = (74-2-(68-dz) + z)/4; }
    });
    const mainOn = d >= 2.5;
    if(st.wasMain && !mainOn) st.arc = 1;                                     /* 刚断开：拉弧 */
    st.wasMain = mainOn;
    if(st.arc>0){ st.arc = Math.max(0, st.arc - dt/(0.25*k)); busy = true; }
    arcM.opacity = st.arc*0.95; arcs.forEach(function(a){ a.scale.setScalar(0.6+st.arc); });
    /* 步骤 */
    let s = 0;
    if(st.on){ s = st.t<0.02 ? 1 : (mainOn ? 3 : 2); st.stepHold = 0; }
    else if(st.I>0 || st.t>0){ s = 4; st.stepHold = 1.2*k; }
    else if(st.stepHold>0){ s = 4; st.stepHold -= dt; }
    if(s!==st.step){ st.step = s; if(opt.onStep) opt.onStep(s); }
    /* 小点 */
    const flow = function(g, on, n, sp){ g.ph = (g.ph + dt*sp/k)%1; g.a.forEach(function(m, i){ m.visible = on; if(on) g.path((g.ph + i/n), m.position); }); };
    mainP.forEach(function(g){ flow(g, mainOn, 9, 0.28); });
    flow(coilP, st.I>0.05, 7, 0.4); curM.opacity = 1;
    fluxP.forEach(function(g, j){ const sg = j ? -1 : 1, za = 37.5+z-2.5;
      g.path = H.poly([[15.4, 0, 6], [15.4, 0, za], [15.4, sg*19, za], [15.4, sg*19, 6], [15.4, 0, 6]]);
      flow(g, st.I>0.05, 6, 0.5); });
    fluxM.opacity = Math.min(1, st.I*1.3);
    if(st.I>0.05 || mainOn) busy = true;
    if(busy || S.dirty){ S.renderer.render(S.scene, S.cam); placeLabels(); S.dirty = false; }
  }
  S.size(); requestAnimationFrame(tick);

  return {
    set:function(on){ st.on = !!on; S.dirty = true; },
    cut:function(b){ setCut(b); }, slow:function(b){ st.slow = !!b; },
    labels:function(b){ st.labels = !!b; S.dirty = true; }, reset:function(){ orb.reset(); select(null); },
    state:st,
    view:function(th, ph, r){ orb.setView(th, ph, r); }   /* 调试/截图用 */
  };
};
})();
