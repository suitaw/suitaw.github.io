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
.k3d-v canvas{display:block;width:100%;height:100%;touch-action:none}   /* 全站 canvas 是 pan-y，这里两指手势要全归页面 */
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
  let two = null, moved = 0;
  function apply(){ cam.position.set(0, 0, st.r); cam.lookAt(0, 0, 0); onChange(); }
  /* 两指（同魔方练习页）：连线转了多少角度 → 绕屏幕法线拧；中点挪了多少 → 跟单指一样翻；两指距离 → 缩放 */
  function twoInfo(){ const a = [...pts.values()]; return {a:Math.atan2(a[1].y-a[0].y, a[1].x-a[0].x), cx:(a[0].x+a[1].x)/2, cy:(a[0].y+a[1].y)/2, d:Math.hypot(a[1].x-a[0].x, a[1].y-a[0].y)}; }
  function turn(dx, dy){ const L = Math.hypot(dx, dy); if(!L) return; ax.set(dy/L, dx/L, 0); q.setFromAxisAngle(ax, L*0.008); pivot.quaternion.premultiply(q); }
  el.addEventListener('pointerdown', function(e){ el.setPointerCapture(e.pointerId); pts.set(e.pointerId, {x:e.clientX, y:e.clientY}); moved = 0;
    two = pts.size===2 ? twoInfo() : null; });
  el.addEventListener('pointermove', function(e){ const p = pts.get(e.pointerId); if(!p) return;
    const dx = e.clientX-p.x, dy = e.clientY-p.y; p.x = e.clientX; p.y = e.clientY; moved += Math.abs(dx)+Math.abs(dy);
    if(pts.size===1){ turn(dx, dy); onChange(); }
    else if(pts.size===2 && two){ const n = twoInfo(); let dA = n.a - two.a;
      while(dA > Math.PI) dA -= 2*Math.PI; while(dA < -Math.PI) dA += 2*Math.PI;
      ax.set(0, 0, 1); q.setFromAxisAngle(ax, -dA); pivot.quaternion.premultiply(q);       /* 屏幕 y 朝下，手指顺时针拧＝绕朝外的 z 轴负转 */
      turn(n.cx-two.cx, n.cy-two.cy);
      if(two.d > 0) st.r = Math.min(520, Math.max(110, st.r*two.d/n.d));
      two = n; apply(); } });
  function up(e){ pts.delete(e.pointerId); two = pts.size===2 ? twoInfo() : null; }
  el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  el.addEventListener('wheel', function(e){ e.preventDefault(); st.r = Math.min(520, Math.max(110, st.r*(1+e.deltaY*0.001))); apply(); }, {passive:false});
  return {apply:apply, moved:function(){ return moved; }, st:st,
    /* 摆到「镜头在球坐标 (th, ph) 看过来」的样子：算出那台镜头的朝向，模型转它的逆 */
    setView:function(th, ph, r, keep){ const o = new T.Object3D(), sp = Math.sin(ph);
      o.position.set(sp*Math.sin(th), Math.cos(ph), sp*Math.cos(th)); o.up.set(0, 1, 0); o.lookAt(0, 0, 0);
      /* Object3D.lookAt 对非镜头是让 +z 朝目标；镜头要 -z 朝目标，所以再绕 y 转半圈 */
      o.quaternion.multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0, 1, 0), Math.PI));
      pivot.quaternion.copy(o.quaternion).invert(); if(r) st.r = r; if(keep){ st.q0.copy(pivot.quaternion); st.r0 = st.r; } apply(); },
    reset:function(){ this.goTo(st.q0, st.r0); },
    /* 平滑转到某个姿态（0.45s） */
    goTo:function(qt, r){ const q1 = pivot.quaternion.clone(), r1 = st.r, t0 = performance.now();
      (function step(now){ const k = Math.min(1, (now-t0)/450), e = k<.5 ? 2*k*k : 1-Math.pow(-2*k+2, 2)/2;
        pivot.quaternion.slerpQuaternions(q1, qt, e); st.r = r1 + ((r||r1)-r1)*e; apply(); if(k<1) requestAnimationFrame(step); })(t0); }};
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


/* ══════════════ 通用 3D 元件查看器 ══════════════
   每个元件只写「模型 + 每帧动作」，下面这些全由查看器管：舞台、转模型（同魔方）、视角按钮、剖开外壳、
   点零件（蓝描边 + 说明）、名字标注（两边引线）、慢放、看不见时不画。
   E3D.viewer(el, spec, opt) → Promise<api>
     spec.parts   {键:[名字, 说明, 短名?]}
     spec.center  模型坐标里的中心（转动绕它）
     spec.view    初始 {th, ph, r}；spec.presets {名字: [轴x,轴y,轴z,角度]}（屏幕上的姿态）
     spec.build(K) 搭模型，返回 {labels:[[键,x,y,z,跟着动的Group?]], tick(dt,k)→是否在动, api:{…}}
       K = {T, H, M:常用材质, root, shell, tag(mesh,键), dots(), opt, st}
     opt.onInfo(part|null)、opt.onStep(n) 等由元件自己用 */
(function(){
'use strict';

function mats(T, H){
  return {
    shell: H.M(0xb9bec4, {roughness:0.55, transparent:true}),        /* 外壳灰白阻燃塑料 */
    shellD:H.M(0x8d939a, {roughness:0.6, transparent:true}),
    dark:  H.M(0x2b2f34, {roughness:0.6, transparent:true}),         /* 黑壳（热继电器、按钮盒） */
    steel: H.M(0x7d858d, {metalness:0.7, roughness:0.42}),           /* 硅钢片 */
    steel2:H.M(0x6c737b, {metalness:0.7, roughness:0.45}),
    cu:    H.M(0xc77a3f, {metalness:0.85, roughness:0.32}),          /* 铜 */
    winding:H.M(0xb8642c, {metalness:0.6, roughness:0.38}),
    ag:    H.M(0xe4e7ea, {metalness:0.95, roughness:0.2}),           /* 银触点 */
    brass: H.M(0xd2b062, {metalness:0.85, roughness:0.3}),
    zinc:  H.M(0xc9ced3, {metalness:0.9, roughness:0.3}),            /* 镀锌螺钉、压线板 */
    bob:   H.M(0x2d3136, {roughness:0.7}),
    carrier:H.M(0x3f6fa8, {roughness:0.55}),                         /* 蓝色塑料件 */
    barrier:H.M(0x6b7178, {roughness:0.8, transparent:true, opacity:0.55}),
    spr:   H.M(0xaab2ba, {metalness:0.9, roughness:0.3}),
    blk:   H.M(0x24272b, {roughness:0.5}),
    white: H.M(0xeef0f2, {roughness:0.5})
  };
}

E3D.viewer = function(el, spec, opt){
  opt = opt||{};
  E3D.addCss();
  el.innerHTML = '<div class="k3d-ld">正在加载 3D 模型…</div>';
  return E3D.loadThree().then(function(T){ return (E3D.last = make(T, el, spec, opt)); }).catch(function(e){
    console.warn('E3D', e);
    el.innerHTML = '<div class="k3d-ld">3D 模型没加载出来（要联网，浏览器要支持 WebGL）。下面的平面图一样能看。</div>'; return null; });
};

function make(T, el, spec, opt){
  el.innerHTML = '';
  const H = E3D.mk(T), S = E3D.stage(T, el), M = mats(T, H);
  const pivot = new T.Group(); S.scene.add(pivot);
  const root = new T.Group(); root.rotation.x = -Math.PI/2; pivot.add(root);     /* 平躺：底板朝下、正面朝上 */
  const c = spec.center; root.position.set(-c[0], -c[2], c[1]);
  const shell = new T.Group(); root.add(shell);
  const hit = [];
  function tag(m, k){ m.userData.part = k; hit.push(m); return m; }
  const st = {slow:false, cut:true, labels:false, sel:null};
  const DOT = new T.SphereGeometry(1.15, 10, 8);
  const K = {T:T, H:H, M:M, root:root, shell:shell, tag:tag, opt:opt, st:st, S:S,
    /* 沿折线流动的小点：橙＝电流、蓝＝磁通/信号 */
    curM: new T.MeshBasicMaterial({color:0xff9a2e, toneMapped:false, transparent:true}),
    sigM: new T.MeshBasicMaterial({color:0x4fb4ff, toneMapped:false, transparent:true}),
    dots:function(n, mat, path, parent){ const a = []; for(let i=0;i<n;i++){ const d = new T.Mesh(DOT, mat); d.visible = false; (parent||root).add(d); a.push(d); } return {a:a, n:n, path:path, ph:0}; },
    flow:function(g, on, sp, dt){ g.ph = (g.ph + dt*sp)%1; g.a.forEach(function(m, i){ m.visible = on; if(on) g.path(g.ph + i/g.n, m.position); }); }
  };
  const B = spec.build(K);
  /* 关掉视锥裁剪：电动机的定子/转子在斜视角下被误判「不在镜头里」整个不画（11-28 截图抓到，关掉就好）；
     之前偶尔「少半个模型」多半也是它。场景都很小，全画也不费事 */
  root.traverse(function(m){ if(m.isMesh) m.frustumCulled = false; });
  /* 预编译：电流点、闪光这些平时隐藏的东西第一次出现时才编着色器，那一帧会少画东西（截图抓到过半个模型）。
     开场先全部显示编一遍，再恢复 */
  (function(){ const hid = []; root.traverse(function(m){ if(m.isMesh && !m.visible){ hid.push(m); m.visible = true; } });
    try{ S.renderer.compile(S.scene, S.cam); }catch(e){} hid.forEach(function(m){ m.visible = false; }); })();
  /* 选中是套一层描边网格，不改零件材质 —— 所以元件可以放心改自己材质的颜色（发热变红等），不用复制 */

  /* 镜头 / 转动 */
  const orb = E3D.trackball(T, S.cam, S.renderer.domElement, pivot, function(){ S.dirty = true; });
  orb.setView(spec.view.th, spec.view.ph, spec.view.r, true);

  /* 剖开外壳 */
  function setCut(b){ st.cut = b;
    shell.traverse(function(m){ if(!m.isMesh) return; m.material.opacity = b ? 0.08 : 1; m.material.depthWrite = !b; m.material.needsUpdate = true; });
    S.dirty = true; }
  setCut(true);

  /* 标注：名字牌排在左右两边，用引线指到零件上 */
  const LB = B.labels || [], v3 = new T.Vector3();
  const lbEls = LB.map(function(l){ const d = document.createElement('div'); d.className = 'k3d-lb'; const p = spec.parts[l[0]];
    d.textContent = p[2] || p[0]; d.style.display = 'none'; el.appendChild(d); return d; });
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('class', 'k3d-ln'); el.appendChild(svg);
  function placeLabels(){
    const w = el.clientWidth, h = el.clientHeight, side = [[], []];
    LB.forEach(function(l, i){ const d = lbEls[i]; const show = st.labels || st.sel===l[0];
      d.style.display = show ? '' : 'none'; if(!show) return;
      v3.set(l[1], l[2], l[3]); if(l[4]) v3.add(l[4].position);
      v3.applyMatrix4(root.matrixWorld).project(S.cam);
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
        const col = r.hot ? 'var(--acc)' : 'var(--tx3)';
        lines += '<polyline points="'+ex+','+r.y+' '+(ex + (k ? -8 : 8))+','+r.y+' '+r.ax+','+r.ay+'" fill="none" stroke="'+col+'" stroke-width="1.2"/>'+
                 '<circle cx="'+r.ax+'" cy="'+r.ay+'" r="2.6" fill="'+col+'" stroke="var(--card)" stroke-width="1"/>';
      });
    });
    svg.innerHTML = lines;
  }

  /* 点零件：蓝色描边（背面放大），本色不动；元件自己的可点控件（旋钮、按钮）走 B.press(键) */
  const ray = new T.Raycaster(), ndc = new T.Vector2();
  const OUTLINE = new T.MeshBasicMaterial({color:0x2f90d6, side:T.BackSide, toneMapped:false});
  function select(k){
    st.sel = k;
    hit.forEach(function(m){ if(m.userData.part==='housing') return; const on = k && m.userData.part===k;
      if(on && !m.userData.ol){ const o = new T.Mesh(m.geometry, OUTLINE); o.scale.setScalar(1.08); m.add(o); m.userData.ol = o; }
      if(!on && m.userData.ol){ m.remove(m.userData.ol); m.userData.ol = null; } });
    if(opt.onInfo) opt.onInfo(k ? spec.parts[k] : null, k);
    S.dirty = true;
  }
  S.renderer.domElement.addEventListener('pointerup', function(e){ if(orb.moved() >= 6) return;
    const r = S.renderer.domElement.getBoundingClientRect();
    ndc.set((e.clientX-r.left)/r.width*2-1, -((e.clientY-r.top)/r.height*2-1)); ray.setFromCamera(ndc, S.cam);
    const hs = ray.intersectObjects(hit.filter(function(m){ return !(st.cut && m.userData.part==='housing'); }), false);
    const k = hs.length ? hs[0].object.userData.part : null;
    if(hs.length && B.hitMesh && B.hitMesh(hs[0].object)) S.dirty = true;   /* 元件要知道点的是哪一个网格（比如哪根测点） */
    if(k && B.press && B.press(k)) { S.dirty = true; }       /* 元件说这一下是「操作」（按钮、旋钮），也照样出说明 */
    select(k);
  });

  /* 每帧 */
  const noCull = function(m){ if(m.isMesh) m.frustumCulled = false; };
  let last = performance.now(), visible = true;
  new IntersectionObserver(function(es){ visible = es[0].isIntersecting; }).observe(el);
  function tick(now){
    requestAnimationFrame(tick);
    const dt = Math.min(0.05, (now-last)/1000); last = now;
    if(!visible || !el.clientWidth) return;
    const busy = B.tick ? B.tick(dt, st.slow ? 4 : 1) : false;
    if(busy || S.dirty){ root.traverse(noCull); S.renderer.render(S.scene, S.cam); placeLabels(); S.dirty = false; }   /* 后来才生成的网格（绕组、表笔线）也要关裁剪 */
  }
  S.size(); requestAnimationFrame(tick);

  const api = {
    cut:setCut, slow:function(b){ st.slow = !!b; }, labels:function(b){ st.labels = !!b; S.dirty = true; },
    select:select, state:st, dirty:function(){ S.dirty = true; },
    reset:function(){ orb.reset(); select(null); },
    view:function(th, ph, r){ orb.setView(th, ph, r); },
    preset:function(k){ if(k==='oblique') return orb.reset();
      const p = (spec.presets||{})[k]; if(!p) return;
      orb.goTo(new T.Quaternion().setFromAxisAngle(new T.Vector3(p[0], p[1], p[2]), p[3]), p[4]||spec.view.r); },
    _K:K,   /* 调试用 */
    pose:function(){ return pivot.quaternion.toArray().map(function(v){ return +v.toFixed(4); }).concat(+orb.st.r.toFixed(1)); }   /* 测试用 */
  };
  return Object.assign(api, B.api||{});
}

/* 页面上那一排控件的标准写法：给容器 id 前缀，自动接上 剖开/慢放/标名字/视角 按钮（元件页 HTML 用 E3D.controlsHTML 生成） */
E3D.controlsHTML = function(id, views){
  views = views || [['oblique','斜着看'], ['front','正面'], ['side','侧面']];
  return '<div class="btns"><button class="btn sm on" data-k="cut">剖开外壳</button><button class="btn sm" data-k="slow">慢放</button><button class="btn sm" data-k="labels">标出名字</button></div>'+
    '<div class="btns" data-views>'+views.map(function(v, i){ return '<button class="btn sm'+(i ? '' : ' on')+'" data-v="'+v[0]+'">'+v[1]+'</button>'; }).join('')+'</div>';
};
E3D.bindControls = function(box, getApi){
  const flags = {cut:true, slow:false, labels:false};
  box.addEventListener('click', function(e){
    const b = e.target.closest('button'); if(!b || !box.contains(b)) return; const a = getApi(); if(!a) return;
    if(b.dataset.k){ const k = b.dataset.k; flags[k] = !flags[k]; b.classList.toggle('on', flags[k]); a[k](flags[k]); }
    if(b.dataset.v){ box.querySelectorAll('[data-v]').forEach(function(x){ x.classList.toggle('on', x===b); }); a.preset(b.dataset.v); }
  });
};
})();

/* ══════════════ 交流接触器 CJX2s-0911（剖开看）══════════════
   结构照常见 CJX2 系列：底座里是 E 形静铁芯 + 线圈（直动式，衔铁朝底板方向吸）；
   上半是触点系统：三对桥式主触点（双断点）+ 辅助常开 13-14 + 辅助常闭 21-22，相间有隔板。
   触点架（塑料连杆）把衔铁和所有动触点连成一体，顶端从前盖方窗露出来。 */
(function(){
'use strict';
const PARTS = {
  core:   ['静铁芯', '硅钢片一片片叠起来的（减少涡流发热），<b>固定不动</b>。线圈一通电，它就变成电磁铁。'],
  coil:   ['线圈', '两头接 <b>A1、A2</b>，走的是<b>控制回路</b>的小电流。线圈电压印在铭牌上（这台 220V），<b>接错电压当场烧</b>。'],
  shade:  ['短路环', '嵌在铁芯端面的一小圈铜。交流电每秒过零 100 次，吸力也跟着掉到零；短路环让吸力错开不掉到零，<b>没有它衔铁会抖、嗡嗡响</b>。'],
  arm:    ['衔铁（动铁芯）', '能动的那块铁。被静铁芯吸过去时，带着整个触点架一起走 —— <b>行程只有几毫米</b>。', '衔铁'],
  spring: ['反力弹簧', '线圈断电、吸力消失后，<b>全靠它把衔铁和触点架顶回去</b>。接触器「一断电必然断开」就是它保证的。'],
  carrier:['触点架（连杆）', '塑料的，把衔铁和<b>所有动触点</b>连成一体 —— 原理图上那条虚线画的就是它。顶上露出外壳，<b>断电检修时</b>可以用螺丝刀按下去试动作，带电时别按。', '触点架'],
  mfix:   ['主触点 · 静触点', '跟上下接线端子连在一起的铜排，端头焊着银触点（银导电好、不容易氧化）。', '静触点'],
  mbr:    ['主触点 · 动触点（桥）', '一座「桥」同时压两个静触点，<b>一相有两个断口</b>，断开时电弧被分成两段，更好灭。三座桥<b>同时</b>动。', '动触点（桥）'],
  cspr:   ['触点弹簧', '藏在桥后面。触点碰上以后衔铁还要再走一小段（<b>超程</b>），压缩这根弹簧，让触点压紧 —— 触点磨损了也还能压住。'],
  ano:    ['辅助常开 13-14', '线圈没电时<b>断开</b>，吸合后闭合。走控制回路小电流，做<b>自锁</b>用的就是它（9.1 节）。', '辅助常开'],
  anc:    ['辅助常闭 21-22', '线圈没电时<b>闭合</b>，吸合后断开（比常开<b>先</b>动）。正反转<b>互锁</b>用的就是它（11.6 节）。', '辅助常闭'],
  barrier:['相间隔板 / 灭弧室', '把三相隔开：断开时拉出的电弧被关在自己那格里冷却熄灭，不会窜到旁边那相造成相间短路。'],
  term:   ['主接线端子', '<b>上进下出</b>：1/L1、3/L2、5/L3 接电源，2/T1、4/T2、6/T3 接电动机。', '接线端子'],
  coilT:  ['线圈端子 A1 / A2', '控制回路接这里。A1、A2 之间有电 → 吸合；没电 → 释放。', '线圈端子'],
  housing:['外壳', '阻燃塑料。底部卡在 35mm 导轨上，也可以用螺钉固定。']
};


/* 触点配置：接触器＝三对主触点 + 13-14 常开 + 21-22 常闭；opt.relay＝中间继电器，四副一样的小触点（同 c2-3.js 的 ROWS） */
const CT_KM = [{x:-27, lbl:['1/L1','2/T1']}, {x:-13, lbl:['3/L2','4/T2']}, {x:1, lbl:['5/L3','6/T3']},
               {x:15, aux:true, lbl:['13NO','14NO']}, {x:26, aux:true, nc:true, lbl:['21NC','22NC']}];
const CT_KA = [{x:-24, aux:true, lbl:['13','14']}, {x:-8, aux:true, lbl:['23','24']}, {x:8, aux:true, nc:true, lbl:['31','32']}, {x:24, aux:true, lbl:['43','44']}];
const PARTS_KA = Object.assign({}, PARTS, {
  ano:['常开触点（动合）', '线圈没电时断开，吸合后闭合。中间继电器四副触点一样大，都只能过几安培 —— 它管的是<b>信号</b>，不带电动机。', '常开触点'],
  anc:['常闭触点 31-32（动断）', '线圈没电时闭合，吸合后断开，比常开<b>先</b>动。', '常闭触点'],
  carrier:['触点架（连杆）', '把衔铁和四副动触点连成一体，<b>一个线圈同时带动四路输出</b> —— 一个信号变成好几路互不干扰的信号，这就是「中间」继电器的用处。', '触点架']
});
E3D.contactor = function(el, opt){ opt = opt||{}; const CT = opt.relay ? CT_KA : CT_KM; return E3D.viewer(el, {
  parts:opt.relay ? PARTS_KA : PARTS, center:[0, 2, 40], view:{th:0.4, ph:0.95, r:265},
  /* 正面＝装在盘上时你看到的那面（1/3/5 在上）；侧面＝从右边看，下面电磁铁、上面触点，看衔铁上下动最清楚 */
  presets:{front:[1, 0, 0, Math.PI/2, 250], side:[0, 1, 0, -Math.PI/2, 250]},
  build:function(K){ return kmBuild(K, opt, CT); }}, opt); };
/* 接触器本体：K 可以是查看器给的，也可以是别的场景（检测台）给的「子 K」（root/shell 换成挪过位置的 group） */
function kmBuild(K, opt, CT){
  const T = K.T, H = K.H, M = K.M, root = K.root, shell = K.shell, tag = K.tag;
  const PX = CT.filter(function(c){ return !c.aux; }).map(function(c){ return c.x; });   /* 主触点的 x（继电器没有） */
  const ZF = 60;                                    /* 静触点那一层的 z */
  const TRAVEL = 4;                                 /* 衔铁行程 4 mm */

  /* ── 外壳：下半（电磁系统）z 0~40、上半（触点系统）z 40~72、前盖 72~82 ── */
    const W = 70, HH = 84;
  [[W, 2, 40, 0, 41, 20], [W, 2, 40, 0, -41, 20], [2, HH, 40, -35, 0, 20], [2, HH, 40, 35, 0, 20], [W, HH, 2, 0, 0, 1]].forEach(function(b){ tag(H.box(b[0], b[1], b[2], b[3], b[4], b[5], M.shellD, shell), 'housing'); });
  /* 上半：端子台阶（上下两排）+ 两侧墙 */
  [[W, 18, 32, 0, 33, 56], [W, 18, 32, 0, -33, 56]].forEach(function(b){ tag(H.box(b[0], b[1], b[2], b[3], b[4], b[5], M.shell, shell), 'housing'); });
  [[2, 48, 36, -35, 0, 58], [2, 48, 36, 35, 0, 58]].forEach(function(b){ tag(H.box(b[0], b[1], b[2], b[3], b[4], b[5], M.shell, shell), 'housing'); });
  /* 前盖：中间凸出一块，开方窗给触点架露头 */
  [[W, 14, 8, 0, 17, 80], [W, 14, 8, 0, -17, 80], [24, 20, 8, -23, 0, 80], [24, 20, 8, 23, 0, 80]].forEach(function(b){ tag(H.box(b[0], b[1], b[2], b[3], b[4], b[5], M.shell, shell), 'housing'); });
  /* 导轨卡脚 */
  tag(H.box(50, 6, 6, 0, -20, -3, M.shellD, shell), 'housing'); tag(H.box(50, 6, 6, 0, 20, -3, M.shellD, shell), 'housing');

  /* 隔板：相与相之间 */
  [-20, -6, 8, 21].forEach(function(x){ tag(H.box(1.4, 40, 26, x, 0, 58, M.barrier, root), 'barrier'); });

  /* ── 静铁芯：E 形，叠片（x 方向一片片） ── */
  const core = new T.Group(); root.add(core);
  for(let i=0;i<7;i++){ const x = -12.6 + i*4.2;
    tag(H.box(3.8, 44, 6, x, 0, 7, i%2 ? M.steel : M.steel2, core), 'core');     /* 底轭 */
    [[-19, 6], [0, 10], [19, 6]].forEach(function(l){ tag(H.box(3.8, l[1], 20, x, l[0], 20, i%2 ? M.steel : M.steel2, core), 'core'); });
  }
  /* 短路环：嵌在两边柱端面 */
  [-19, 19].forEach(function(y){ const g = new T.Group();
    [[30, 1.2, 1.6, 0, 2.4], [30, 1.2, 1.6, 0, -2.4], [1.2, 6, 1.6, -14.6, 0], [1.2, 6, 1.6, 14.6, 0]].forEach(function(b){ tag(H.box(b[0], b[1], b[2], b[3], y+b[4], 29.4, M.cu, g), 'shade'); });
    root.add(g); });

  /* ── 线圈：骨架 + 铜绕组（中柱外面一圈） ── */
  const ring = new T.Shape(); (function(s, w, h, r){ s.moveTo(-w/2+r, -h/2); s.lineTo(w/2-r, -h/2); s.quadraticCurveTo(w/2, -h/2, w/2, -h/2+r); s.lineTo(w/2, h/2-r); s.quadraticCurveTo(w/2, h/2, w/2-r, h/2); s.lineTo(-w/2+r, h/2); s.quadraticCurveTo(-w/2, h/2, -w/2, h/2-r); s.lineTo(-w/2, -h/2+r); s.quadraticCurveTo(-w/2, -h/2, -w/2+r, -h/2); })(ring, 40, 26, 6);
  const hole = new T.Path(); hole.moveTo(-15, -6); hole.lineTo(15, -6); hole.lineTo(15, 6); hole.lineTo(-15, 6); hole.lineTo(-15, -6); ring.holes.push(hole);
  const wg = new T.ExtrudeGeometry(ring, {depth:14, bevelEnabled:false, curveSegments:6});
  const winding = tag(new T.Mesh(wg, M.winding), 'coil'); winding.position.z = 13; root.add(winding);
  for(let k=1;k<7;k++){ const ln = tag(new T.Mesh(new T.ExtrudeGeometry(ring, {depth:0.25, bevelEnabled:false, curveSegments:6}), M.cu), 'coil'); ln.position.z = 13+k*2; ln.scale.set(1.006, 1.012, 1); root.add(ln); }   /* 绕组一圈圈的纹 */
  [12, 27.4].forEach(function(z){ const fl = tag(new T.Mesh(new T.ExtrudeGeometry((function(){ const s = new T.Shape(); s.moveTo(-23, -15); s.lineTo(23, -15); s.lineTo(23, 15); s.lineTo(-23, 15); s.lineTo(-23, -15); s.holes.push(hole); return s; })(), {depth:1.6, bevelEnabled:false}), M.bob), 'coil'); fl.position.z = z; root.add(fl); });

  /* 线圈端子 A1（上）A2（下）：在底座两角伸出来 */
  const coilT = [[26, 46, 'A1'], [-26, -46, 'A2']];
  coilT.forEach(function(c){
    tag(H.box(14, 10, 12, c[0], c[1], 34, M.shell, shell), 'housing');
    tag(H.box(9, 7, 0.8, c[0], c[1], 40.4, M.zinc, root), 'coilT');
    tag(H.cylZ(3, 2.4, c[0], c[1], 42, M.zinc, root), 'coilT');
    tag(H.box(4.2, 0.7, 0.6, c[0], c[1], 43.4, M.blk, root), 'coilT');
    H.plate(c[2], 8, 4, c[0], c[1] + (c[1]>0 ? 7.5 : -7.5), 40.2, '#1f2328', '#d9dde1', root);
  });
  H.wire([[23, 13, 20], [26, 30, 26], [26, 44, 38]], 0.7, M.cu, root);   /* 线圈引出线 → A1 */
  H.wire([[-23, -13, 20], [-26, -30, 26], [-26, -44, 38]], 0.7, M.cu, root);

  /* ── 动的部分：衔铁 + 触点架（一起走） ── */
  const mov = new T.Group(); root.add(mov);
  for(let i=0;i<7;i++){ const x = -12.6 + i*4.2;
    tag(H.box(3.8, 44, 7, x, 0, 37.5, i%2 ? M.steel : M.steel2, mov), 'arm'); }
  tag(H.box(68, 8, 6, 0, 0, 44.5, M.carrier, mov), 'carrier');                  /* 下横梁：坐在衔铁上 */
  [-32, 32].forEach(function(x){ tag(H.box(3, 8, 28.5, x, 0, 61.75, M.carrier, mov), 'carrier'); });   /* 两根立柱（在三相外侧，不挡触点） */
  tag(H.box(68, 8, 4, 0, 0, 74, M.carrier, mov), 'carrier');                    /* 上横梁：常开桥经触点弹簧挂在它下面 */
  CT.forEach(function(c){ if(c.nc) tag(H.box(4, 6, 6, c.x, 0, 50.5, M.carrier, mov), 'carrier'); });   /* 常闭桥的托座 */
  tag(H.box(14, 14, 11, 0, 0, 81.5, M.carrier, mov), 'carrier');                /* 露头 */
  H.plate(opt.relay ? 'KA' : 'KM', 9, 5, 0, 0, 87.1, '#ffffff', null, mov);

  const PH = [0xe0a92e, 0x3fa845, 0xcf4436];        /* 国标三相线色 黄 绿 红 */
  const poles = [];                                  /* 每对触点：{x, nc, br(桥), spr(触点弹簧)} */

  /* 静触点铜排 + 端子 */
  CT.forEach(function(c, i){
    const x = c.x, aux = !!c.aux, nc = !!c.nc, w = aux ? 4 : 6;
    [1, -1].forEach(function(sg){
      tag(H.box(w, 24, 2, x, sg*20, 60, M.cu, root), 'mfix');                       /* 平的一段 y ±8~32 */
      tag(H.box(w, 2, 13, x, sg*32, 66.5, M.cu, root), 'mfix');                     /* 立起来接端子 */
      tag(H.cylZ(aux ? 1.6 : 2.3, 1, x, sg*10, nc ? 58.5 : 61.5, M.ag, root), aux ? (nc ? 'anc' : 'ano') : 'mfix');   /* 银触点：常开朝外、常闭朝里 */
      tag(H.box(aux ? 8 : 10, 9, 0.8, x, sg*33, 72.4, M.zinc, root), 'term');      /* 压线板 */
      tag(H.cylZ(aux ? 2.4 : 3.2, 2.6, x, sg*33, 74, M.zinc, root), 'term');        /* 螺钉 */
      const sl = H.box(aux ? 3.4 : 4.6, 0.7, 0.6, x, sg*33, 75.4, M.blk, root); sl.rotation.z = 0.4;
      H.plate(c.lbl[sg>0 ? 0 : 1], aux ? 9.5 : 11, 3.4, x, sg*26.3, 72.15, '#1f2328', null, root);   /* 印在螺钉内侧，外侧要走线 */
    });
    /* 动触点桥 */
    const br = new T.Group(); root.add(br);
    tag(H.box(w, 26, 2, 0, 0, 0, aux ? (nc ? M.brass : M.brass) : M.cu, br), aux ? (nc ? 'anc' : 'ano') : 'mbr');
    [1, -1].forEach(function(sg){ tag(H.cylZ(aux ? 1.6 : 2.3, 1, 0, sg*10, nc ? 1.5 : -1.5, M.ag, br), aux ? (nc ? 'anc' : 'ano') : 'mbr'); });
    br.position.set(x, 0, nc ? 55.5 : 67);
    let spr = null;
    if(!nc){ spr = tag(H.spring(aux ? 1.4 : 2, 5, 4, 0.35, M.spr), aux ? 'ano' : 'cspr'); spr.position.set(x, 0, 68); root.add(spr); }
    poles.push({x:x, nc:nc, aux:aux, br:br, spr:spr});
  });

  /* 反力弹簧：两根，底在底座，顶着下横梁 */
  const rsp = [-27, 27].map(function(x){ const m = tag(H.spring(3, 9, 37.5, 0.55, M.spr), 'spring'); m.position.set(x, 0, 4); root.add(m); return m; });

  /* 外接导线：主电路按相色，控制线黑 */
  const cabMat = PH.map(function(c){ return H.M(c, {roughness:0.5}); });
  PX.forEach(function(x, i){ [1, -1].forEach(function(sg){ H.wire([[x, sg*33, 76.5], [x, sg*33, 79], [x, sg*47, 79]], 1.7, cabMat[i], root); }); });
  CT.forEach(function(c){ if(c.aux) [1, -1].forEach(function(sg){ H.wire([[c.x, sg*33, 75.5], [c.x, sg*33, 78], [c.x, sg*46, 78]], 0.9, M.blk, root); }); });
  [[26, 46], [-26, -46]].forEach(function(c){ const sg = c[1]>0 ? 1 : -1; H.wire([[c[0], c[1], 43.5], [c[0], c[1], 46], [c[0], c[1]+sg*12, 46]], 0.9, M.blk, root); });


  const mainP = PX.map(function(x){ return K.dots(9, K.curM, H.poly([[x, 47, 79], [x, 33, 79], [x, 33, 61], [x, 10, 61], [x, 10, 65], [x, -10, 65], [x, -10, 61], [x, -33, 61], [x, -33, 79], [x, -47, 79]])); });
  const coilP = K.dots(7, K.curM, H.poly([[26, 58, 46], [26, 46, 46], [26, 44, 38], [26, 30, 26], [23, 13, 20], [0, 13, 20], [-23, -13, 20], [-26, -30, 26], [-26, -44, 38], [-26, -46, 46], [-26, -58, 46]]));
  const fluxP = [1, -1].map(function(){ return K.dots(6, K.sigM, null); });
  /* 电弧：主触点断开那一下，两个断口各闪一下 */
  const arcM = new T.MeshBasicMaterial({color:0xcfe4ff, toneMapped:false, transparent:true, opacity:0, blending:T.AdditiveBlending, depthWrite:false});
  const arcs = []; PX.forEach(function(x){ [10, -10].forEach(function(y){ const m = new T.Mesh(new T.SphereGeometry(2.6, 12, 10), arcM); m.position.set(x, y, 63.5); root.add(m); arcs.push(m); }); });


  const st = {on:false, man:false, I:0, t:0, arc:0, wasMain:false, step:0, stepHold:0};
  return {
    labels:[['core', 15.5, -19, 18], ['coil', 21, 8, 24], ['shade', 15.5, 21, 31], ['arm', 15.5, -8, 38, mov], ['spring', 27, -4, 22],
            ['carrier', 0, 7, 88, mov]].concat(opt.relay ? [['ano', -24, 4, 69], ['anc', 8, -4, 53], ['term', -24, 33, 78], ['coilT', 26, 46, 47]]
              : [['mbr', -13, -15, 67], ['mfix', -27, 24, 60], ['ano', 15, 4, 69], ['anc', 26, -4, 53], ['term', -27, 33, 78], ['coilT', 26, 46, 47]]),
    mov:mov, api:{ set:function(on){ st.on = !!on; K.S.dirty = true; }, press:function(b){ st.man = !!b; K.S.dirty = true; }, coil:st },
    tick:function(dt, k){ let busy = false;
      /* 线圈电流：通电 0.35s 升满，断电 0.15s 掉光（都已放慢，见页面文字） */
      if(st.on && st.I<1){ st.I = Math.min(1, st.I + dt/(0.35*k)); busy = true; }
      if(!st.on && st.I>0){ st.I = Math.max(0, st.I - dt/(0.15*k)); busy = true; }
      /* 衔铁：吸力过了弹簧力才动，越近越快（气隙小吸力大）；释放靠弹簧 */
      const pull = (st.on && st.I>0.6) || st.man;                                /* man＝用手按住触点架（检测时强制吸合，线圈没电） */
      if(pull && st.t<1){ st.t = Math.min(1, st.t + dt/((st.man ? 0.25 : 0.5)*k)*(0.35+1.8*st.t)); busy = true; }
      if(!pull && st.I<0.4 && st.t>0){ st.t = Math.max(0, st.t - dt/(0.4*k)*(0.6+0.8*st.t)); busy = true; }
      const z = -TRAVEL*st.t; mov.position.z = z;
      rsp.forEach(function(m){ m.scale.z = (37.5+z)/37.5; });
      const d = TRAVEL*st.t;
      poles.forEach(function(p){
        if(p.nc){ p.br.position.z = 55.5 - Math.max(0, d-1); }                 /* 常闭：先空走 1mm，再被托座拉开 */
        else { const dz = Math.min(d, 2.5); p.br.position.z = 67 - dz;           /* 常开：走 2.5mm 碰上，剩下 1.5mm 是超程 */
               p.spr.position.z = 68 - dz; p.spr.scale.z = (74-2-(68-dz) + z)/4; }
      });
      const mainOn = d >= 2.5;
      if(st.wasMain && !mainOn) st.arc = 1;                                     /* 刚断开：拉弧 */
      st.wasMain = mainOn;
      if(st.arc>0){ st.arc = Math.max(0, st.arc - dt/(0.25*k)); busy = true; }
      arcM.opacity = st.arc*0.95; arcs.forEach(function(a){ a.visible = st.arc > 0.01; a.scale.setScalar(0.6+st.arc); });
      let s = 0;
      if(st.on){ s = st.t<0.02 ? 1 : (mainOn ? 3 : 2); st.stepHold = 0; }
      else if(st.I>0 || st.t>0){ s = 4; st.stepHold = 1.2*k; }
      else if(st.stepHold>0){ s = 4; st.stepHold -= dt; }
      if(s!==st.step){ st.step = s; if(opt.onStep) opt.onStep(s); }
      mainP.forEach(function(g){ K.flow(g, mainOn, 0.28/k, dt); });
      K.flow(coilP, st.I>0.05, 0.4/k, dt);
      fluxP.forEach(function(g, j){ const sg = j ? -1 : 1, za = 37.5+z-2.5;
        g.path = H.poly([[15.4, 0, 6], [15.4, 0, za], [15.4, sg*19, za], [15.4, sg*19, 6], [15.4, 0, 6]]);
        K.flow(g, st.I>0.05, 0.5/k, dt); });
      K.sigM.opacity = Math.min(1, st.I*1.3);
      return busy || st.I>0.05 || mainOn;
    }
  };
}
E3D._kmBuild = kmBuild; E3D._CT_KM = CT_KM; E3D._PARTS_KM = PARTS;
})();

/* ══════════════ 热继电器 NR2 / JR36 类（三相带断相保护，剖开看）══════════════
   主电路电流穿过绕在双金属片上的电热丝 → 双金属片受热往一边弯 → 推导板 → 导板推动作杠杆 →
   跳簧机构一下翻过去：常闭 95-96 断开（掐断接触器线圈）、常开 97-98 闭合（可接报警灯），复位钮弹起。
   热量多少不在这里算：页面已有的热模型（c2-3.js 的 S2）每帧通过 opt.state() 给 {x 电流倍数, heat 0~1, tripped}。 */
(function(){
'use strict';
const PARTS = {
  heater: ['热元件（电热丝）', '<b>串在主电路里</b>，电动机的电流全从这里过。电流越大发热越多 —— 它把「电流」换成「热」。', '热元件'],
  bimetal:['双金属片', '两层膨胀系数不同的金属压在一起（这里铜色一层胀得多、灰色一层胀得少），一热就往<b>胀得少的那边</b>弯。<b>弯得慢</b>是故意的：电动机起动那几秒的大电流不该让它跳。', '双金属片'],
  guide:  ['导板（差动机构）', '三根双金属片一起推它。要是<b>缺了一相</b>，那一根不弯，导板被别成一斜，杠杆放大后更早动作 —— 这就是「断相保护」。', '导板'],
  lever:  ['动作杠杆 + 温度补偿片', '把导板那一点点位移放大后去推跳簧机构。杠杆上的补偿双金属片抵消<b>环境温度</b>的影响：夏天车间热，不会因此提前跳。', '动作杠杆'],
  slider: ['跳簧机构（动作块）', '推到临界点就「啪」一下翻过去，触点不是慢慢分开（慢慢分开会拉弧烧触点）。翻过去后<b>自己回不来</b>，要按复位。', '跳簧机构'],
  nc:     ['常闭触点 95-96', '平时闭合，<b>串在接触器线圈那一路</b>。过载时断开 → 接触器线圈失电 → 主触点断开电动机。热继电器自己<b>不切主电路</b>。', '常闭 95-96'],
  no:     ['常开触点 97-98', '平时断开，跳了才闭合。一般接一盏<b>过载指示灯</b>或报警器。', '常开 97-98'],
  dial:   ['整定电流旋钮', '刻度单位是<b>安</b>。调到电动机铭牌上的<b>额定电流</b>。调大了保护不住，调小了动不动就跳。这一台假设调在 10 A。', '整定旋钮'],
  reset:  ['复位按钮', '跳了以后它会<b>弹出来</b>。等双金属片<b>凉下来</b>再按（没凉透按不动）。<b>点它就是按一下</b>。', '复位钮'],
  pin:    ['进线插针', '粗铜排，直接插进上面接触器的 2/T1、4/T2、6/T3 —— 热继电器一般就<b>挂在接触器正下方</b>。', '进线插针'],
  term:   ['出线端子 2/T1 4/T2 6/T3', '接电动机。', '出线端子'],
  aterm:  ['辅助触点端子', '95-96、97-98 的接线螺钉，走控制回路的小电流。', '辅助端子'],
  housing:['外壳', '阻燃塑料。']
};
const PX = [-24, -10, 4], SEG = 12, SL = 2.8;           /* 三相 x；双金属片 12 节、每节 2.8（顶端 z≈40） */

E3D.thermal = function(el, opt){ return E3D.viewer(el, {
  parts:PARTS, center:[0, 0, 24], view:{th:0.35, ph:1.05, r:205},
  presets:{front:[1, 0, 0, Math.PI/2, 230], side:[0, 1, 0, -Math.PI/2, 230]},
  build:function(K){
  const T = K.T, H = K.H, M = K.M, root = K.root, shell = K.shell, tag = K.tag, opt = K.opt;
  const W = 70, HY = 80;
  /* 外壳：黑色，下半一圈墙 + 上下两排端子台阶 + 前盖 */
  [[W, 2, 44, 0, 41, 22], [W, 2, 44, 0, -41, 22], [2, HY, 44, -35, 0, 22], [2, HY, 44, 35, 0, 22], [W, HY, 2, 0, 0, 1]].forEach(function(b){ tag(H.box(b[0], b[1], b[2], b[3], b[4], b[5], M.dark, shell), 'housing'); });
  [[W, 16, 34, 0, 33, 17], [W, 16, 34, 0, -33, 17]].forEach(function(b){ tag(H.box(b[0], b[1], b[2], b[3], b[4], b[5], M.dark, shell), 'housing'); });
  tag(H.box(W, 50, 4, 0, 0, 46, M.dark, shell), 'housing');                       /* 前盖 */
  tag(H.box(50, 6, 6, 0, -20, -3, M.dark, shell), 'housing'); tag(H.box(50, 6, 6, 0, 20, -3, M.dark, shell), 'housing');

  /* 三相：双金属片（分节，弯曲时逐节转）+ 电热丝 + 铜排。片子竖着立，往 +x（右）弯 */
  const bims = [], heatMats = [];
  const cuMat = M.cu, steelL = H.M(0x8e969e, {metalness:0.8, roughness:0.35}), cuL = H.M(0xc98b52, {metalness:0.8, roughness:0.35});
  PX.forEach(function(x, i){
    tag(H.box(8, 9, 4, x, 0, 4, M.bob, root), 'bimetal');                            /* 根部固定座 */
    let parent = new T.Group(); parent.position.set(x, 0, 6); root.add(parent);
    const segs = [];
    for(let s=0;s<SEG;s++){ const g = new T.Group(); g.position.set(0, 0, s ? SL : 0); parent.add(g);
      tag(H.box(1, 7, SL, -0.5, 0, SL/2, cuL, g), 'bimetal');                      /* 铜色：胀得多（左） */
      tag(H.box(1, 7, SL, 0.5, 0, SL/2, steelL, g), 'bimetal');                    /* 灰：胀得少（右）→ 受热往右弯 */
      segs.push(g); parent = g; }
    bims.push(segs);
    /* 电热丝：绕在双金属片下半段外面 */
    const hm = H.M(0x9a6b4a, {metalness:0.6, roughness:0.4, emissive:0x000000}); heatMats.push(hm);
    const coil = tag(H.spring(4.6, 5, 12, 0.45, hm), 'heater'); coil.position.set(x, 0, 8); root.add(coil);
    /* 进线插针（上）→ 电热丝上头；电热丝下头 → 出线端子（下） */
    tag(H.box(7, 22, 2, x, 46, 30, cuMat, root), 'pin');
    H.wire([[x, 36, 30], [x, 8, 24], [x, 4.6, 20]], 0.8, cuMat, root);
    H.wire([[x, -4.6, 8], [x, -10, 8], [x, -28, 12], [x, -28, 33]], 0.8, cuMat, root);
    tag(H.box(10, 9, 0.8, x, -33, 34.4, M.zinc, root), 'term'); tag(H.cylZ(3, 2.6, x, -33, 36, M.zinc, root), 'term');
    const sl = H.box(4.4, 0.7, 0.6, x, -33, 37.4, M.blk, root); sl.rotation.z = 0.4;
    H.plate(['2/T1','4/T2','6/T3'][i], 10, 3.4, x, -26.5, 34.2, '#dfe3e8', null, root);
    H.plate(['1/L1','3/L2','5/L3'][i], 7, 3, x, 50, 31.1, '#2a1a0e', null, root);   /* 印在插针上，别跟旋钮刻度挤 */
  });
  /* 导板：横在三根片子顶端，每根片子顶端右边有个拨齿 —— 三根一起往右推它 */
  const guide = new T.Group(); root.add(guide);
  tag(H.box(44, 3, 2.4, -9, 4.5, SEG*SL+6, M.white, guide), 'guide');
  PX.forEach(function(x){ tag(H.box(2, 3, 5, x+2.2, 4.5, SEG*SL+4.6, M.white, guide), 'guide'); });
  /* 动作杠杆：绕 (14, -6, 20) 转；上端被导板推，下端去推跳簧机构 */
  const lever = new T.Group(); lever.position.set(16, 4.5, 24); root.add(lever);
  tag(H.box(3, 2, 16, 0, 0, 2, M.brass, lever), 'lever'); tag(H.cylZ(1.6, 4, 0, 0, 0, M.zinc, lever), 'lever');
  tag(H.box(6, 2, 2, 3, 0, 9, M.brass, lever), 'lever');
  /* 跳簧机构 + 辅助触点（在右边 x 16~28） */
  const slider = new T.Group(); root.add(slider);
  tag(H.box(15, 22, 4, 22, 0, 22, M.white, slider), 'slider');
  const ncBr = tag(H.box(15, 2.5, 1.2, 22, -9, 25, M.brass, slider), 'nc');
  const noBr = tag(H.box(15, 2.5, 1.2, 22, 9, 25, M.brass, slider), 'no');
  /* 静触点：常闭的在桥下面（平时压着），常开的在桥上面（平时离开） */
  [16, 28].forEach(function(x){
    tag(H.box(3, 20, 1.2, x, -18, 23.5, M.cu, root), 'nc'); tag(H.cylZ(1.3, 0.8, x, -9, 24, M.ag, root), 'nc');
    tag(H.box(3, 20, 1.2, x, 18, 28.6, M.cu, root), 'no'); tag(H.cylZ(1.3, 0.8, x, 9, 28, M.ag, root), 'no');
  });
  [[16, -33, '95'], [28, -33, '96'], [16, 33, '97'], [28, 33, '98']].forEach(function(a){
    tag(H.box(9, 9, 0.8, a[0], a[1], 34.4, M.zinc, root), 'aterm'); tag(H.cylZ(2.4, 2.6, a[0], a[1], 36, M.zinc, root), 'aterm');
    H.plate(a[2], 6, 3.4, a[0], a[1] + (a[1]>0 ? -6.5 : 6.5), 34.2, '#dfe3e8', null, root);
  });
  /* 前盖上：整定旋钮（蓝，带刻度）+ 复位钮（蓝） */
  const dial = new T.Group(); dial.position.set(-8, 16, 49); root.add(dial);
  tag(H.cylZ(8, 3, 0, 0, 0, M.carrier, dial), 'dial'); tag(H.box(1.4, 7, 0.8, 0, 3.5, 1.9, M.white, dial), 'dial');
  dial.rotation.z = -0.35;
  [7, 8.5, 10, 11.5, 13].forEach(function(v, i){ const a = Math.PI/2 + 0.9 - i*0.45;
    H.plate(String(v), 5, 3, -8 + Math.cos(a)*12.5, 16 + Math.sin(a)*12.5, 48.2, '#dfe3e8', null, root); });
  H.plate('整定 A', 12, 3.2, -8, 3.5, 48.2, '#9aa4ae', null, root);
  const reset = new T.Group(); reset.position.set(16, 16, 49); root.add(reset);
  tag(H.cylZ(4.5, 4, 0, 0, 0, M.carrier, reset), 'reset'); tag(H.box(4, 3, 4, 0, 0, -3, M.carrier, reset), 'reset');
  H.plate('复位', 9, 3.2, 16, 9, 48.2, '#9aa4ae', null, root);

  /* 电流小点：插针 → 电热丝（螺旋） → 出线端子；控制回路：95 → 常闭桥 → 96 */
  const mainP = PX.map(function(x){ const pts = [[x, 52, 30], [x, 36, 30], [x, 8, 24], [x, 4.6, 20]];
    for(let a=0;a<=5*12;a++){ const t = Math.PI/2 + a/12*Math.PI*2; pts.push([x + 4.6*Math.cos(t), 4.6*Math.sin(t), 20 - 12*a/60]); }
    pts.push([x, -4.6, 8], [x, -10, 8], [x, -28, 12], [x, -28, 33], [x, -40, 36]); return K.dots(14, K.curM, H.poly(pts)); });
  const ctlP = K.dots(6, K.curM, H.poly([[16, -40, 36], [16, -33, 34], [16, -18, 24], [16, -9, 25], [28, -9, 25], [28, -18, 24], [28, -33, 34], [28, -40, 36]]));

  const st = {x:1, heat:0, tripped:false, tr:0, rs:0};
  return {
    labels:[['heater', -24, -5, 14], ['bimetal', -10, -3.5, 30], ['guide', -16, 4.5, 41, guide], ['lever', 16, 4.5, 32], ['slider', 22, 0, 24, slider],
            ['nc', 22, -9, 26, slider], ['no', 22, 9, 26, slider], ['dial', -8, 16, 51], ['reset', 16, 16, 51, reset], ['pin', -24, 48, 31], ['term', 4, -33, 37], ['aterm', 28, 33, 37]],
    press:function(k){ if(k==='reset' && opt.onReset){ opt.onReset(); return true; } return false; },
    api:{ st:st },
    tick:function(dt, k){
      const s = opt.state ? opt.state() : st;
      const heat = Math.max(0, Math.min(1, s.heat)), ang = heat*0.62;                 /* 双金属片总弯曲角（满热约 35°，比实物夸张几倍才看得见），逐节均分 */
      bims.forEach(function(segs){ segs.forEach(function(g, j){ if(j) g.rotation.y = ang/SEG; }); });
      const glow = Math.pow(Math.max(0, (heat-0.62)/0.38), 1.5)*1.6;              /* 额定电流下热量稳在 58%，不能红（会被看成出事）；过了才开始红 */
      heatMats.forEach(function(m){ m.emissive.setHex(0xff0000); m.emissiveIntensity = glow; });   /* 红＝热（危险色），不用橙（橙只给电流） */
      /* 顶端位移 ≈ 弧长×角度/2 → 推导板（先空走 1mm 间隙）；跳了以后导板停在那，机构自己锁住 */
      const tip = SEG*SL*ang/2;
      guide.position.x = Math.max(0, tip-1);
      lever.rotation.y = Math.max(0, tip-1)*0.05;
      st.tr += ((s.tripped ? 1 : 0) - st.tr) * Math.min(1, dt*(s.tripped ? 18 : 10)/k);   /* 跳簧：一下翻过去 */
      slider.position.z = 3*st.tr;                                                       /* 常闭桥离开下面的静触点，常开桥碰上上面的 */
      reset.position.z = 49 + 3.5*st.tr;
      const live = !s.tripped && s.x > 0.05;
      mainP.forEach(function(g){ K.flow(g, live, (0.05 + 0.05*s.x)/k, dt); });
      K.flow(ctlP, st.tr < 0.5, 0.25/k, dt);
      return true;
    }
  };
  }}, opt); };
})();

/* ══════════════ 闸刀开关 HK2（开启式负荷开关，两极）══════════════
   瓷底板 + 静插座（铜夹子）+ 触刀（铰链在下面）+ 熔丝 + 胶盖。上进下出。
   状态全来自页面（c2-1.js 的 S1）：opt.state() → {on, I 电流 A, fuse 熔丝好的?, heat 0~1, top 电源接上端?}；点刀/手柄 → opt.onToggle() */
(function(){
'use strict';
const PARTS = {
  base:   ['瓷底座', '绝缘的底板，所有零件都装在它上面。瓷不导电、耐热、不怕电弧烤。', '瓷底座'],
  clip:   ['静插座', '固定不动的一对铜夹片，刀插进去被夹紧＝接通。夹不紧会发热，老闸刀插座发黑就是这么来的。', '静插座'],
  blade:  ['触刀', '会动的铜刀，<b>铰链在下面</b>，往上扳出来＝断开。<b>点它就是扳一下</b>。', '触刀'],
  handle: ['手柄（绝缘）', '把两把刀连在一起同时动，人手只碰这根绝缘杆。<b>点它也能扳</b>。', '手柄'],
  fuse:   ['熔丝', '铅锡合金细丝，电流超过额定值就发热熔断 —— 这台闸刀<b>唯一的保护</b>。断了要换同规格的，<b>不许拿铜丝代替</b>。', '熔丝'],
  tin:    ['进线端子（上）', '<b>电源必须接上面</b>：这样拉闸以后，刀、熔丝、出线全都不带电，换熔丝才安全。', '进线端子'],
  tout:   ['出线端子（下）', '接负载。', '出线端子'],
  hinge:  ['铰链座', '刀绕着它转。它和下面的熔丝连在一起。', '铰链座'],
  housing:['胶盖', '盖住带电部分，防手指碰到，也挡一下拉闸时的电弧。<b>不许不盖胶盖用</b>。']
};
const PX = [-14, 14], ZH = 14, LEN = 44;          /* 两极 x（左相线 L 右零线 N）；铰链高度；刀长 */

E3D.knife = function(el, opt){ return E3D.viewer(el, {
  parts:PARTS, center:[0, 0, 12], view:{th:0.5, ph:0.95, r:250},
  presets:{front:[1, 0, 0, Math.PI/2, 240], side:[0, 1, 0, -Math.PI/2, 240]},
  build:function(K){
  const T = K.T, H = K.H, M = K.M, root = K.root, shell = K.shell, tag = K.tag, opt = K.opt;
  const porc = H.M(0xf1efe8, {roughness:0.3}), lead = H.M(0xb9bcc0, {metalness:0.7, roughness:0.4, emissive:0x000000});
  tag(H.box(64, 116, 6, 0, 0, 3, porc, root), 'base');
  const blades = [], fuses = [], live = [];
  PX.forEach(function(x, i){
    /* 进线端子（上）+ 静插座 */
    tag(H.box(10, 9, 0.8, x, 48, 6.4, M.zinc, root), 'tin'); tag(H.cylZ(3, 2.6, x, 48, 8, M.zinc, root), 'tin');
    tag(H.box(4, 16, 1.2, x, 38, 6.6, M.cu, root), 'clip');
    [-2.6, 2.6].forEach(function(dx){ tag(H.box(1, 9, 14, x+dx, 30, 13, M.brass, root), 'clip'); });
    /* 铰链座 + 触刀（绕铰链转） */
    tag(H.box(9, 6, 10, x, -16, 11, M.brass, root), 'hinge'); tag(H.cylZ(1.4, 1, x, -16, 16.5, M.zinc, root), 'hinge');
    const piv = new T.Group(); piv.position.set(x, -16, ZH); root.add(piv);
    const bm = H.M(0xc77a3f, {metalness:0.85, roughness:0.32, emissive:0x000000});
    tag(H.box(2.6, LEN+4, 8, 0, LEN/2, 0, bm, piv), 'blade');
    blades.push(piv); live.push(bm);
    /* 熔丝：铰链座 → 下面两颗柱之间 → 出线端子 */
    tag(H.box(4, 8, 1.2, x, -24, 6.6, M.cu, root), 'hinge');
    [-28, -42].forEach(function(y){ tag(H.cylZ(2.4, 6, x, y, 9, M.zinc, root), 'fuse'); });
    const fg = new T.Group(); root.add(fg);
    const fa = tag(H.wire([[x, -28, 11], [x+1.5, -32, 10.2], [x+1.8, -35, 10]], 0.45, lead, fg), 'fuse');
    const fb = tag(H.wire([[x+1.8, -35, 10], [x+1.5, -38, 10.2], [x, -42, 11]], 0.45, lead, fg), 'fuse');
    fuses.push({a:fa, b:fb, m:lead});
    tag(H.box(4, 10, 1.2, x, -48, 6.6, M.cu, root), 'tout');
    tag(H.box(10, 9, 0.8, x, -52, 6.4, M.zinc, root), 'tout'); tag(H.cylZ(3, 2.6, x, -52, 8, M.zinc, root), 'tout');
    H.plate(i ? 'N' : 'L', 5, 4, x, 55, 6.2, '#3a3f45', null, root);
  });
  /* 手柄：横杆连两把刀的前端 + 竖握把（跟着第一把刀转） */
  const hd = new T.Group(); blades[0].add(hd);
  tag(H.box(PX[1]-PX[0]+8, 4, 5, (PX[1]-PX[0])/2, LEN-2, 6, M.blk, hd), 'handle');
  tag(H.box(6, 5, 16, (PX[1]-PX[0])/2, LEN-2, 14, M.blk, hd), 'handle');
  /* 导线：L 红 N 蓝（同照明盘规矩），上进下出 */
  const red = H.M(0xd42f2f, {roughness:0.5}), blue = H.M(0x1c6dd0, {roughness:0.5});
  PX.forEach(function(x, i){ const m = i ? blue : red;
    H.wire([[x, 48, 10.5], [x, 48, 12], [x, 66, 12]], 1.5, m, root); H.wire([[x, -52, 10.5], [x, -52, 12], [x, -70, 12]], 1.5, m, root); });
  /* 胶盖：上下两块，中间留缝给刀转（剖开时半透明） */
  tag(H.box(62, 34, 2, 0, 33, 26, M.dark, shell), 'housing'); tag(H.box(62, 40, 2, 0, -36, 22, M.dark, shell), 'housing');
  [[2, 34, 20, -31, 33, 16], [2, 34, 20, 31, 33, 16], [2, 40, 16, -31, -36, 14], [2, 40, 16, 31, -36, 14]].forEach(function(b){ tag(H.box(b[0], b[1], b[2], b[3], b[4], b[5], M.dark, shell), 'housing'); });

  /* 电流：L 往下走、N 往上回 */
  const paths = PX.map(function(x, i){ const p = [[x, 66, 12], [x, 48, 10], [x, 38, 7.5], [x, 30, 12], [x, 26, ZH], [x, -16, ZH], [x, -24, 7.5], [x, -28, 11], [x+1.8, -35, 10], [x, -42, 11], [x, -48, 7.5], [x, -52, 10], [x, -70, 12]];
    return K.dots(12, K.curM, H.poly(i ? p.reverse() : p)); });
  /* 电弧 / 熔断闪光 */
  const flM = new T.MeshBasicMaterial({color:0xcfe4ff, toneMapped:false, transparent:true, opacity:0, blending:T.AdditiveBlending, depthWrite:false});
  const arcs = PX.map(function(x){ const m = new T.Mesh(new T.SphereGeometry(3.2, 12, 10), flM); m.position.set(x, 30, 13); root.add(m); return m; });
  const pops = PX.map(function(x){ const m = new T.Mesh(new T.SphereGeometry(3.2, 12, 10), flM.clone()); m.position.set(x+1.8, -35, 10); root.add(m); return m; });

  const st = {a:1, wasOn:false, arc:0, pop:0, wasFuse:true, t:0};
  return {
    labels:[['tin', -14, 48, 10], ['clip', 14, 30, 20], ['blade', -14, 10, 18], ['handle', 0, 42, 22], ['hinge', 14, -16, 16], ['fuse', -14, -35, 11], ['tout', 14, -52, 10], ['base', 24, 6, 6]],
    press:function(k){ if((k==='blade' || k==='handle') && opt.onToggle){ opt.onToggle(); return true; } return false; },
    tick:function(dt, k){
      const s = opt.state ? opt.state() : {on:false, I:0, fuse:true, heat:0, top:true};
      st.t += dt;
      const ta = s.on ? 0 : 1;                                     /* 0＝合上（平躺插进插座），1＝拉开（扬起 70°） */
      st.a += (ta - st.a) * Math.min(1, dt*8/k);
      blades.forEach(function(b){ b.rotation.x = st.a*1.22; });
      if(st.wasOn && !s.on && s.I > 0.1) st.arc = 1;               /* 带负载拉闸：插座口拉弧 */
      st.wasOn = s.on && s.fuse;
      if(st.wasFuse && !s.fuse) st.pop = 1;                        /* 熔丝刚断：闪一下 */
      st.wasFuse = s.fuse;
      st.arc = Math.max(0, st.arc - dt/(0.3*k)); st.pop = Math.max(0, st.pop - dt/(0.4*k));
      flM.opacity = st.arc*0.9; arcs.forEach(function(m){ m.visible = st.arc > 0.01; m.scale.setScalar(0.5+st.arc); });
      pops.forEach(function(m){ m.visible = st.pop > 0.01; m.material.opacity = st.pop*0.95; m.scale.setScalar(0.5+st.pop*1.5); });
      fuses.forEach(function(f){ f.a.visible = f.b.visible = s.fuse;
        f.m.emissive.setHex(0xff0000); f.m.emissiveIntensity = Math.pow(Math.max(0, s.heat), 1.5)*1.8; });   /* 过载发热变红 */
      /* 拉闸后刀还带电（电源接下端）＝危险：刀一闪一闪发红 */
      const danger = !s.on && !s.top && s.fuse;
      live.forEach(function(m){ m.emissive.setHex(0xff2020); m.emissiveIntensity = danger ? 0.35 + 0.3*Math.sin(st.t*6) : 0; });
      const on = s.on && s.fuse && s.I > 0.05 && st.a < 0.05;
      paths.forEach(function(g){ K.flow(g, on, (0.06 + s.I*0.006)/k, dt); });
      return on || danger || st.arc > 0 || st.pop > 0 || s.heat > 0.01 || Math.abs(ta - st.a) > 0.002;
    }
  };
  }}, opt); };
})();

/* ══════════════ 铁壳开关 HH 系列（封闭式负荷开关，三极）══════════════
   铁箱 + 往左开的箱盖；一根横转轴带三把刀，转轴伸出右壁接手柄；速断弹簧挂在转轴的拐臂上；
   刀下面是三只瓷插式熔断器。箱盖和转轴之间有机械联锁：合着闸开不了盖、开着盖合不了闸。
   状态全来自页面 c2-1.js 的 S2：opt.state() → {door 0~1, lever 0~1, blade 0~1, flash}；点手柄 → opt.onLever()，点箱盖 → opt.onDoor() */
(function(){
'use strict';
const PARTS = {
  door:   ['箱盖', '铁的，平时关着。<b>点它就是开/关盖</b>。合着闸的时候它被联锁卡住，打不开。', '箱盖'],
  box:    ['铁外壳（箱体）', '整个开关装在铁箱里，箱体要<b>可靠接地</b>（PE 线接箱体上的接地螺钉）。', '铁箱体'],
  latch:  ['机械联锁', '转轴上的凸轮和箱盖上的挡块互相卡：<b>合着闸开不了盖、开着盖合不了闸</b>。人手碰不到带电的刀。', '联锁'],
  shaft:  ['转轴（绝缘）', '三把刀装在同一根绝缘转轴上，<b>三相同时通断</b>。', '转轴'],
  blade:  ['触刀', '跟着转轴转：转下来插进静触座＝合，转起来＝分。', '触刀'],
  clip:   ['静触座', '固定的铜夹座，接电源进线。', '静触座'],
  fuse:   ['瓷插式熔断器', '每相一只，熔体装在瓷插件里，拔出来就能换。管<b>短路</b>。', '熔断器'],
  spring: ['速断弹簧', '扳手柄时先把它<b>拉长攒劲</b>，过了中间一下弹过去，带着刀<b>快速</b>分合 —— 跟手扳快慢无关，电弧拉不长。', '速断弹簧'],
  handle: ['手柄', '在箱子外面，人只碰它。<b>点它就是扳一下</b>（盖开着扳不动）。', '手柄'],
  tin:    ['进线端子', '三相电源从上面进。', '进线'],
  tout:   ['出线端子', '经熔断器出去接电动机。', '出线']
};
const PX = [-20, 0, 20], SY = 6, SZ = 20, BL = 20;      /* 三相 x；转轴 y、z；刀长 */

E3D.ironCase = function(el, opt){ return E3D.viewer(el, {
  parts:PARTS, center:[0, 0, 22], view:{th:0.55, ph:0.95, r:270},
  presets:{front:[1, 0, 0, Math.PI/2, 260], side:[0, 1, 0, -Math.PI/2, 260]},
  build:function(K){
  const T = K.T, H = K.H, M = K.M, root = K.root, shell = K.shell, tag = K.tag, opt = K.opt;
  const paint = H.M(0x8a9097, {metalness:0.4, roughness:0.5, transparent:true}), porc = H.M(0xf1efe8, {roughness:0.3});
  /* 箱体（剖开时半透明）：底板 + 四面墙，箱盖单独做 */
  [[76, 104, 2, 0, 0, 1], [76, 2, 40, 0, 52, 20], [76, 2, 40, 0, -52, 20], [2, 104, 40, -38, 0, 20], [2, 104, 40, 38, 0, 20]].forEach(function(b){
    const m = tag(H.box(b[0], b[1], b[2], b[3], b[4], b[5], paint, shell), 'box'); });
  H.plate('HH 380V 60A', 30, 5, 0, 0, 2.2, '#2a2e33', null, root);
  /* 箱盖：铰链在左边（x=-38），往左翻开 */
  const door = new T.Group(); door.position.set(-38, 0, 41); shell.add(door);   /* 挂在 shell 下：剖开时箱盖也半透明，照样能点 */
  const dm = H.M(0x7c838b, {metalness:0.45, roughness:0.45, transparent:true});
  tag(H.box(76, 104, 1.6, 38, 0, 0, dm, door), 'door');
  tag(H.box(14, 6, 4, 64, 22, -2.8, M.blk, door), 'latch');                      /* 盖上的联锁挡块 */
  /* 转轴 + 三把刀（绕 x 轴转：0＝刀平躺朝 +y 插进静触座；1＝刀立起来） */
  const shaft = new T.Group(); shaft.position.set(0, SY, SZ); root.add(shaft);
  const sg = new T.CylinderGeometry(3, 3, 84, 16); sg.rotateZ(Math.PI/2);
  const sm = tag(new T.Mesh(sg, H.M(0x5d4a36, {roughness:0.7})), 'shaft'); sm.position.set(4, 0, 0); shaft.add(sm);
  PX.forEach(function(x){ tag(H.box(3, BL, 6, x, BL/2, 0, M.cu, shaft), 'blade'); });
  tag(H.box(8, 4, 10, 30, 0, 4, M.blk, shaft), 'latch');                           /* 转轴上的凸轮 */
  /* 拐臂 + 速断弹簧（右壁里面） */
  const crank = new T.Group(); crank.position.set(34, 0, 0); shaft.add(crank);
  tag(H.box(3, 12, 3, 0, -6, 0, M.zinc, crank), 'spring');
  const spr = tag(H.spring(2.2, 10, 20, 0.5, M.spr), 'spring'); root.add(spr);
  /* 手柄：转轴伸出右壁 */
  const hd = new T.Group(); hd.position.set(44, 0, 0); shaft.add(hd);
  tag(H.box(4, 26, 5, 0, -13, 0, M.blk, hd), 'handle'); tag(H.box(7, 8, 8, 0, -27, 0, M.blk, hd), 'handle');
  /* 静触座（上）+ 进线；熔断器（下）+ 出线 */
  const PHc = [0xe0a92e, 0x3fa845, 0xcf4436].map(function(c){ return H.M(c, {roughness:0.5}); });
  PX.forEach(function(x, i){
    [-2.2, 2.2].forEach(function(dx){ tag(H.box(1, 8, 10, x+dx, SY+BL-2, SZ, M.brass, root), 'clip'); });
    tag(H.box(4, 20, 1.2, x, SY+BL+8, SZ-4, M.cu, root), 'clip');
    tag(H.box(9, 8, 0.8, x, 44, SZ-4, M.zinc, root), 'tin'); tag(H.cylZ(2.8, 2.4, x, 44, SZ-2.6, M.zinc, root), 'tin');
    H.wire([[x, 44, SZ-1], [x, 60, SZ-1]], 1.6, PHc[i], root);
    /* 刀根 → 熔断器上座 */
    H.wire([[x, SY, SZ-3], [x, -8, 10], [x, -12, 6]], 0.9, M.cu, root);
    tag(H.box(12, 26, 8, x, -24, 6, porc, root), 'fuse');                         /* 瓷插件 */
    tag(H.box(6, 8, 4, x, -24, 12, porc, root), 'fuse');                          /* 拔插手柄 */
    tag(H.box(3, 22, 0.8, x, -24, 10.4, M.cu, root), 'fuse');
    tag(H.box(9, 8, 0.8, x, -44, 6, M.zinc, root), 'tout'); tag(H.cylZ(2.8, 2.4, x, -44, 7.4, M.zinc, root), 'tout');
    H.wire([[x, -44, 9], [x, -60, 9]], 1.6, H.M(0x5b6068, {roughness:0.5}), root);
  });
  const paths = PX.map(function(x){ return K.dots(10, K.curM, H.poly([[x, 60, SZ-1], [x, 44, SZ-1], [x, SY+BL+8, SZ-4], [x, SY+BL-2, SZ], [x, SY, SZ], [x, -8, 10], [x, -12, 6], [x, -24, 10.4], [x, -36, 8], [x, -44, 9], [x, -60, 9]])); });
  const flM = new T.MeshBasicMaterial({color:0xcfe4ff, toneMapped:false, transparent:true, opacity:0, blending:T.AdditiveBlending, depthWrite:false});
  const arcs = PX.map(function(x){ const m = new T.Mesh(new T.SphereGeometry(3, 12, 10), flM); m.position.set(x, SY+BL-2, SZ); root.add(m); return m; });
  const A = new T.Vector3(), Bv = new T.Vector3(30, -14, 8), Z = new T.Vector3(0, 0, 1);
  return {
    labels:[['door', -10, 40, 42, door], ['box', -38, -30, 20], ['latch', 30, SY, SZ+8], ['shaft', -32, SY, SZ+3], ['blade', 0, SY+10, SZ+4], ['clip', -20, SY+BL, SZ+6],
            ['fuse', 20, -24, 14], ['spring', 30, -8, 14], ['handle', 44, -20, SZ], ['tin', -20, 44, SZ], ['tout', 0, -44, 9]],
    press:function(k){ if(k==='handle' && opt.onLever){ opt.onLever(); return true; } if((k==='door' || k==='latch') && opt.onDoor){ opt.onDoor(); return true; } return false; },
    tick:function(dt, k){
      const s = opt.state ? opt.state() : {door:0, lever:0, blade:0, flash:0};
      door.rotation.y = -s.door*1.9;                                    /* 往左翻开约 110° */
      shaft.rotation.x = (1 - s.blade)*1.25;                            /* 刀：合＝平躺，分＝立起 */
      hd.rotation.x = (s.blade - s.lever)*1.25;                        /* 手柄跟手（lever）匀速走，刀（blade）攒够劲一下弹；手柄挂在转轴上，所以减掉转轴已转的 */
      /* 弹簧：一头挂箱体，一头挂拐臂末端（拐臂跟手柄走） */
      crank.rotation.x = hd.rotation.x;
      A.set(0, -12, 0).applyAxisAngle(new T.Vector3(1, 0, 0), shaft.rotation.x + crank.rotation.x).add(new T.Vector3(34, SY, SZ));
      spr.position.copy(Bv); const d = A.clone().sub(Bv); spr.scale.set(1, 1, d.length()/20);
      spr.quaternion.setFromUnitVectors(Z, d.normalize());
      flM.opacity = Math.min(1, s.flash*4); arcs.forEach(function(m){ m.visible = s.flash > 0.01; });
      const on = s.blade > 0.95;
      paths.forEach(function(g){ K.flow(g, on, 0.12/k, dt); });
      return true;
    }
  };
  }}, opt); };
})();

/* ══════════════ 组合开关 HZ10 类（三层，0/1/2 三档）══════════════
   几层「触片盒」叠在一根方轴上：每层两片静触片朝外接端子，轴上的动触片跟着转，转到对的角度才把两片搭通。
   ① 层只在 1 档通、② 层只在 2 档通（所以两路电源不可能同时接上 —— 结构互锁），③ 层是弧形动触片，1、2 档都通。
   状态来自页面 c2-1.js 的 S3：opt.state() → {k 档位, a 当前角度(从正上方顺时针)}；点旋钮 → opt.onTurn() */
(function(){
'use strict';
const PARTS = {
  knob:   ['手柄（旋钮）', '转到 0 / 1 / 2 三个位置，每档有定位（「咔」一下卡住）。<b>点它转一档</b>。', '手柄'],
  shaft:  ['方轴', '所有层的动触片都套在这一根方轴上，转手柄就是同时转所有层。', '方轴'],
  deck:   ['触片盒（一层）', '绝缘的一层盒子，里面一对静触片、一片动触片。层数越多能管的回路越多。', '触片盒'],
  fix:    ['静触片', '固定在盒子上，朝外的一头是接线端子。', '静触片'],
  mov:    ['动触片', '套在方轴上跟着转。<b>转到正对两片静触片的角度</b>才把它们搭通 —— 不同层的动触片装的角度不一样，所以不同档通的是不同的层。', '动触片'],
  arc:    ['弧形动触片（第 ③ 层）', '做成一段弧，<b>1 档和 2 档都搭得上</b>，只有 0 档不通。所以只要有一路电送上，送电指示灯就亮。', '弧形动触片'],
  term:   ['接线端子', '每层左右各一个。', '端子']
};
const KA = [0, 1.05, 2.10];                      /* 三档角度：从正上方顺时针 */
const LAY = [{t:'① 市电', ang:KA[1], kind:'bar'}, {t:'② 备用', ang:KA[2], kind:'bar'}, {t:'③ 指示', ang:0, kind:'arc'}];
const DZ = [8, 20, 32];                          /* 三层的高度 */

E3D.rotary = function(el, opt){ return E3D.viewer(el, {
  parts:PARTS, center:[0, 0, 24], view:{th:0.5, ph:0.95, r:220},
  presets:{front:[1, 0, 0, Math.PI/2, 210], side:[0, 1, 0, -Math.PI/2, 210]},
  build:function(K){
  const T = K.T, H = K.H, M = K.M, root = K.root, shell = K.shell, tag = K.tag, opt = K.opt;
  const bake = H.M(0x3a2e26, {roughness:0.6, transparent:true});
  const dir = function(c, r){ return [Math.sin(c)*r, Math.cos(c)*r]; };   /* 顺时针角 c、半径 r → x,y */
  const shaft = new T.Group(); root.add(shaft);
  tag(H.box(5, 5, 44, 0, 0, 24, M.steel, shaft), 'shaft');
  const fixM = [];
  LAY.forEach(function(L, i){
    const z = DZ[i];
    tag(H.box(44, 44, 9, 0, 0, z, bake, shell), 'deck');
    /* 静触片：在 L.ang 和 L.ang+π 两个方向，从半径 10 伸到 24，外头是端子 */
    [0, Math.PI].forEach(function(o){
      const c = L.ang + o, p = dir(c, 17), q = dir(c, 27);
      const m = tag(H.box(4, 14, 1.6, p[0], p[1], z, M.cu, root), 'fix'); m.rotation.z = -c;
      const tm = tag(H.box(8, 8, 1, q[0], q[1], z+1, M.zinc, root), 'term'); tm.rotation.z = -c;
      tag(H.cylZ(2.4, 2.2, q[0], q[1], z+2.4, M.zinc, root), 'term');
    });
    const lab = dir(L.ang, 34); H.plate(L.t, 14, 4, lab[0], lab[1], z+4.6, '#dfe3e8', '#2b2f34', root);
    /* 动触片（装在轴上） */
    if(L.kind === 'bar'){
      /* 轴转到 L.ang 时它正对静触片：在轴的坐标里它就是竖的（朝正上方） */
      tag(H.box(3.5, 23, 1.6, 0, 0, z+1.8, M.brass, shaft), 'mov');
    } else {
      /* 弧：轴相对角 [-2.25, -0.9] 和对面那段 —— 轴转到 0.9~2.25 之间时盖住正上方/正下方的静触片 */
      [0, Math.PI].forEach(function(o){
        const c1 = -2.25 + o, c2 = -0.9 + o;
        const g = new T.TorusGeometry(11, 1.3, 6, 20, c2 - c1);
        const m = tag(new T.Mesh(g, M.brass), 'arc'); m.rotation.z = Math.PI/2 - c2; m.position.z = z+1.8; shaft.add(m);
      });
      /* 两段弧用一根过中心的连接片连成一体（弧中点在轴相对角 -1.575 和它对面） */
      const cb = tag(H.box(3.5, 22, 1.6, 0, 0, z+1.8, M.brass, shaft), 'arc'); cb.rotation.z = 1.575;
    }
  });
  /* 面板 + 档位刻字 + 旋钮 */
  tag(H.box(50, 50, 2, 0, 0, 40, bake, shell), 'deck');
  ['0', '1', '2'].forEach(function(t, k){ const p = dir(KA[k], 21); H.plate(t, 5, 5, p[0], p[1], 41.2, '#ffffff', null, root); });
  const knob = new T.Group(); knob.position.z = 41; root.add(knob);
  tag(H.cylZ(11, 6, 0, 0, 3, M.blk, knob), 'knob');
  tag(H.box(4, 16, 3, 0, 5, 7, H.M(0xc0392b, {roughness:0.5}), knob), 'knob');     /* 指针（红杆，指向档位） */
  /* 电流小点：每层 端子→静触片→动触片→静触片→端子 */
  const paths = LAY.map(function(L, i){ const z = DZ[i], a = dir(L.ang, 30), b = dir(L.ang, 10), c = dir(L.ang+Math.PI, 10), d = dir(L.ang+Math.PI, 30);
    const pts = L.kind === 'bar' ? [[a[0], a[1], z+2.5], [b[0], b[1], z+2.5], [c[0], c[1], z+2.5], [d[0], d[1], z+2.5]]
                                  : [[a[0], a[1], z+2.5], [b[0], b[1], z+2.5], [0, 0, z+2.5], [c[0], c[1], z+2.5], [d[0], d[1], z+2.5]];
    return K.dots(8, K.curM, H.poly(pts)); });
  const on = function(i, k){ return [[false,true,false],[false,false,true],[false,true,true]][i][k]; };
  let lastA = null;
  return {
    labels:[['knob', 0, 11, 48, knob], ['shaft', 0, 0, 46], ['deck', -22, -22, 20], ['fix', 17, 10, 8], ['mov', 0, 8, 22, shaft], ['arc', -8, -6, 34, shaft], ['term', -27, -6, 30]],
    press:function(k){ if(k==='knob' && opt.onTurn){ opt.onTurn(); return true; } return false; },
    tick:function(dt, kk){
      const s = opt.state ? opt.state() : {k:0, a:0};
      shaft.rotation.z = -s.a; knob.rotation.z = -s.a;
      const moving = lastA === null || Math.abs(s.a - lastA) > 1e-4; lastA = s.a;
      const settled = Math.abs(s.a - KA[s.k]) < 0.05;
      let any = false;
      paths.forEach(function(g, i){ const o = settled && on(i, s.k); any = any || o; K.flow(g, o, 0.15/kk, dt); });
      return moving || any;
    }
  };
  }}, opt); };
})();

/* ══════════════ 空气阻尼式时间继电器 JS7-A（剖开看）══════════════
   上：电磁铁（线圈 + 静铁芯 + 衔铁），衔铁一吸合就压瞬动微动开关；
   中：活塞杆，被塔形弹簧往上推，但下面的橡皮气囊只能从调节螺钉的小孔慢慢进气 → 活塞慢慢走 → 走到头压延时微动开关。
   状态来自页面 c2-3.js 的 S3：opt.state() → {on 线圈, mode 0 通电延时/1 断电延时, prog 0~1, acted 延时触点动了?, counting} */
(function(){
'use strict';
const PARTS = {
  coil:   ['线圈 KT', '通电 → 吸衔铁。跟接触器一样是电磁铁。', '线圈'],
  core:   ['静铁芯', '线圈通电后变成电磁铁。', '静铁芯'],
  arm:    ['衔铁', '线圈一通电立刻被吸过去（不延时），同时放开活塞杆、压下瞬动开关。', '衔铁'],
  rod:    ['活塞杆', '衔铁放开它以后，塔形弹簧把它往上推；可它下面连着气囊，<b>气进得慢，它就走得慢</b> —— 延时就是这么来的。', '活塞杆'],
  tower:  ['塔形弹簧', '推活塞杆的动力。', '塔形弹簧'],
  bag:    ['橡皮气囊（气室）', '活塞往上走要把气囊拉大，空气只能从调节螺钉旁的<b>小孔</b>慢慢进来。断电时气从排气阀一下排掉，所以复位很快。', '气囊'],
  screw:  ['调节螺钉（延时旋钮）', '拧进去小孔变小 → 进气更慢 → 延时更长。<b>页面上的「延时设定」滑杆就是在拧它</b>。精度不高（误差可达 ±10%～20%），要精确用电子式。', '调节螺钉'],
  swi:    ['瞬动微动开关', '衔铁一动它就动，<b>不延时</b>（原理图上画成普通触点）。', '瞬动开关'],
  swd:    ['延时微动开关', '活塞杆走到头才压下它 —— <b>延时触点</b>（原理图上触点带「降落伞」记号）。', '延时开关'],
  lever:  ['杠杆', '活塞杆顶端带着它，走到头去压延时开关。', '杠杆'],
  housing:['底座', '绝缘底座。']
};
const RX = 0, ROD0 = -6, ROD_UP = 7;              /* 活塞杆 x；顶端起始 y；行程 */

E3D.timer = function(el, opt){ return E3D.viewer(el, {
  parts:PARTS, center:[0, 4, 14], view:{th:0.35, ph:1.0, r:215},
  presets:{front:[1, 0, 0, Math.PI/2, 200], side:[0, 1, 0, -Math.PI/2, 200]},
  build:function(K){
  const T = K.T, H = K.H, M = K.M, root = K.root, shell = K.shell, tag = K.tag, opt = K.opt;
  tag(H.box(70, 96, 3, 0, 4, 1.5, H.M(0x3a2e26, {roughness:0.6, transparent:true}), shell), 'housing');
  /* 电磁铁（在上面，y 32~46）：静铁芯 + 线圈；衔铁在它下面，通电往上吸 4mm */
  [-8, 8].forEach(function(x){ tag(H.box(5, 16, 10, x, 40, 9, M.steel, root), 'core'); });
  tag(H.box(26, 4, 10, 0, 48, 9, M.steel, root), 'core');
  const cg = new T.CylinderGeometry(7, 7, 12, 20); cg.rotateZ(Math.PI/2);
  [-8, 8].forEach(function(x){ const m = tag(new T.Mesh(cg, M.winding), 'coil'); m.position.set(x, 40, 9); m.scale.set(1, 1, 1); m.rotation.z = Math.PI/2; root.add(m); });
  const arm = new T.Group(); root.add(arm);
  tag(H.box(26, 4, 10, 0, 29, 9, M.steel2, arm), 'arm');
  tag(H.box(16, 3, 3, 18, 27, 9, M.zinc, arm), 'arm'); tag(H.box(4, 6, 3, 24, 28, 9, M.zinc, arm), 'arm');   /* 拨片：伸到右边，往上顶瞬动开关 */
  /* 活塞杆 + 杠杆（一起往上走） */
  const rod = new T.Group(); root.add(rod);
  tag(H.cylZ(1.6, 1, 0, 0, 0, M.zinc, rod), 'rod');                                  /* 占位，下面换成竖杆 */
  rod.children[0].visible = false;
  const rg = new T.CylinderGeometry(1.6, 1.6, 30, 12);
  const rm = tag(new T.Mesh(rg, M.zinc), 'rod'); rm.position.set(RX, ROD0-15, 9); rod.add(rm);
  tag(H.box(26, 3, 3, -12, ROD0, 9, M.brass, rod), 'lever');                        /* 杠杆往左伸，去压延时开关 */
  /* 塔形弹簧：套在活塞杆上（y 方向） */
  const tw = tag(H.spring(4, 7, 14, 0.5, M.spr), 'tower'); tw.rotation.x = Math.PI/2; tw.position.set(RX, -30, 9); root.add(tw);
  /* 气囊：圆鼓（黑橡胶）+ 盖 + 调节螺钉 */
  const bagG = new T.CylinderGeometry(15, 15, 10, 28); const bag = tag(new T.Mesh(bagG, H.M(0x1d1f22, {roughness:0.85})), 'bag'); bag.position.set(RX, -38, 9); root.add(bag);
  tag(H.box(34, 4, 16, RX, -45, 9, M.blk, root), 'bag');
  const scr = new T.Group(); scr.position.set(RX+14, -38, 18); root.add(scr);
  tag(H.cylZ(3.2, 3, 0, 0, 0, M.brass, scr), 'screw'); tag(H.box(5.2, 0.8, 0.6, 0, 0, 1.7, M.blk, scr), 'screw');
  /* 两个微动开关：瞬动在右上、延时在左边 */
  function micro(x, y, k){ const g = new T.Group(); g.position.set(x, y, 9); g.rotation.z = Math.PI; root.add(g);   /* 倒装：按钮朝下，被下面往上走的东西顶 */
    tag(H.box(12, 18, 10, 0, 0, 0, M.blk, g), k);
    const btn = new T.Group(); g.add(btn); tag(H.box(3, 4, 3, 0, 10, 0, M.white, btn), k);
    [-3, 3].forEach(function(dx){ tag(H.box(1.2, 1, 6, dx, -9.5, -4, M.brass, g), k); });
    return btn; }
  const bi = micro(24, 44, 'swi'), bd = micro(-22, 12, 'swd');
  H.plate('瞬动', 10, 3.6, 24, 44, 14.2, '#dfe3e8', null, root);
  H.plate('延时', 10, 3.6, -22, 12, 14.2, '#dfe3e8', null, root);
  /* 电流：线圈回路、瞬动触点回路、延时触点回路；气流：调节螺钉 → 气囊（蓝点） */
  const coilP = K.dots(6, K.curM, H.poly([[-30, 52, 6], [-8, 47, 6], [-8, 33, 6], [8, 33, 6], [8, 47, 6], [30, 52, 6]]));
  const swiP = K.dots(5, K.curM, H.poly([[21, 64, 5], [21, 52, 5], [27, 52, 5], [27, 64, 5]]));
  const swdP = K.dots(5, K.curM, H.poly([[-25, 32, 5], [-25, 20, 5], [-19, 20, 5], [-19, 32, 5]]));
  const airP = K.dots(5, K.sigM, H.poly([[RX+22, -30, 22], [RX+14, -38, 20], [RX+8, -38, 14], [RX, -38, 12]]));
  const st = {arm:0, rod:0};
  return {
    labels:[['coil', -8, 40, 16], ['core', 8, 48, 14], ['arm', -10, 29, 14, arm], ['rod', 2, -18, 11, rod], ['lever', -20, ROD0, 11, rod], ['tower', 5, -24, 9],
            ['bag', -12, -38, 14], ['screw', 14, -38, 22], ['swi', 24, 44, 15], ['swd', -22, 12, 15]],
    tick:function(dt, k){
      const s = opt.state ? opt.state() : {on:false, mode:0, prog:0, acted:false};
      st.arm += ((s.on ? 1 : 0) - st.arm) * Math.min(1, dt*14/k);
      arm.position.y = 4*st.arm;
      bi.position.y = -2.5*st.arm;                                                   /* 瞬动：跟衔铁走（开关倒装，本地 −y＝往开关里按） */
      const rt = s.mode === 0 ? (s.on ? s.prog : 0) : (s.on ? 1 : (s.acted ? 1 - s.prog : 0));
      st.rod += (rt - st.rod) * Math.min(1, dt*(rt < st.rod && s.mode === 0 ? 14 : 30)/k);   /* 断电复位快（排气阀） */
      rod.position.y = ROD_UP*st.rod;
      bag.scale.y = 1 + 0.35*st.rod;                                                  /* 气囊被拉大 */
      bd.position.y = s.acted ? -2.5 : 0;
      scr.rotation.z = -(s.set||5)*0.6;                                             /* 滑杆拧螺钉：延时越长拧得越深 */
      K.flow(coilP, s.on, 0.4/k, dt); K.flow(swiP, s.on, 0.4/k, dt); K.flow(swdP, !!s.acted, 0.4/k, dt);
      K.flow(airP, !!s.counting, 0.25/k, dt);
      return true;
    }
  };
  }}, opt); };
})();

/* ══════════════ 万用表实验台：一块数字表 + 一块小电路板 ══════════════
   电在 elec-meterlab.js（MLab.read），这里只管画面和手：点接线柱放表笔（先红后黑）、点旋钮换档、点插孔换红笔、点开关/电池。
   opt.onRead(结果, 状态) 每次读数变了回调页面（写说明）。 */
(function(){
'use strict';
const PARTS = {
  lcd:    ['液晶屏', '显示读数。最大 1999（「三位半」表），超了显示 OL。', '液晶屏'],
  dial:   ['档位旋钮', '<b>点它换一档</b>（也可以用下面的按钮）：OFF → 直流电压 → 交流电压 → 电阻 → 通断 → mA → 10A。<b>先插孔、后拨档</b>，量之前看一眼档位对不对。', '旋钮'],
  jcom:   ['COM 插孔', '<b>黑笔永远插这里</b>，不用动。', 'COM'],
  jv:     ['VΩ 插孔', '量电压、电阻、通断时红笔插这里。<b>点它把红笔插过来</b>。', 'VΩ 孔'],
  jma:    ['mA 插孔', '量小电流（200 mA 以内）红笔插这里，里面有保险管。<b>点它把红笔插过来</b>。', 'mA 孔'],
  ja:     ['10A 插孔', '量大电流红笔插这里，<b>多数表这一路没保险</b>，量的时间别超过十几秒。<b>点它把红笔插过来</b>。', '10A 孔'],
  red:    ['红表笔', '点电路板上的铜接线柱放下。', '红笔'],
  black:  ['黑表笔', '点电路板上的铜接线柱放下。', '黑笔'],
  tp:     ['测点（接线柱）', '<b>点它把表笔放上去</b>：先红笔，再黑笔；再点就从红笔重新来。T1 电池正极、T2 开关后面（灯上端）、T3 灯下端、T4 电池负极。', '测点'],
  batt:   ['电池（12 V）', '<b>点它装上 / 拆下</b>。测电阻、通断之前要拆下 —— 带电不能测电阻。', '电池'],
  sw:     ['开关', '<b>点它合上 / 断开</b>。', '开关'],
  lamp:   ['灯泡（12 V，约 100 Ω）', '电流越大越亮。', '灯泡'],
  board:  ['电路板', '电池、开关、灯泡串成一圈。', '电路板'],
  housing:['表壳', '']
};
const DIALS = ['off', 'dcv', 'acv', 'ohm', 'beep', 'ma', 'a'];
const DLAB = {off:'OFF', dcv:'V⎓', acv:'V~', ohm:'Ω', beep:'通断', ma:'mA', a:'A'};
const TPS = {T1:[30, 34], T2:[72, 34], T3:[72, -34], T4:[30, -34]};     /* 板子上四个测点的 x,y（表在左边 x<0） */
const JK = {a:[-74, -44], ma:[-62, -44], jcom:[-50, -44], v:[-38, -44]}; /* 四个插孔：10A mA COM VΩ */

E3D.meterLab = function(el, opt){ return E3D.viewer(el, {
  parts:PARTS, center:[9, -4, 8], view:{th:0.0, ph:0.5, r:350},
  presets:{front:[1, 0, 0, Math.PI/2, 340], side:[0, 1, 0, -Math.PI/2, 300]},
  build:function(K){
  const T = K.T, H = K.H, M = K.M, root = K.root, shell = K.shell, tag = K.tag, opt = K.opt;
  const st = {batt:true, sw:true, dial:'dcv', jack:'v', red:null, black:null, fuse:true, next:'red', beepT:0};
  /* ── 表：黄色护套 + 深灰机身 + 液晶 + 旋钮 + 四孔 ── */
  const mx = -56;
  tag(H.box(48, 104, 10, mx, 0, 5, H.M(0xe8b923, {roughness:0.6}), root), 'housing');
  tag(H.box(42, 96, 3, mx, 0, 11, H.M(0x2d3136, {roughness:0.5}), root), 'housing');
  /* 液晶：canvas 贴图，读数变了重画 */
  const lc = document.createElement('canvas'); lc.width = 320; lc.height = 140; const lg = lc.getContext('2d');
  const ltex = new T.CanvasTexture(lc); ltex.colorSpace = T.SRGBColorSpace;
  const lcd = tag(new T.Mesh(new T.PlaneGeometry(34, 15), new T.MeshBasicMaterial({map:ltex, toneMapped:false})), 'lcd'); lcd.position.set(mx, 34, 12.6); root.add(lcd);
  function drawLcd(r){ lg.fillStyle = '#9fb59a'; lg.fillRect(0, 0, 320, 140);
    lg.fillStyle = '#1b2219'; lg.textAlign = 'right'; lg.textBaseline = 'middle';
    lg.font = '700 84px ui-monospace,monospace'; lg.fillText(r.lcd, 300, 78);
    lg.textAlign = 'left'; lg.font = '600 30px system-ui,sans-serif'; lg.fillText(r.unit || '', 12, 28);
    if(r.beep){ lg.fillText('·)))', 12, 118); }
    ltex.needsUpdate = true; }
  /* 旋钮 + 档位字（一圈） */
  const dial = new T.Group(); dial.position.set(mx, 2, 12.5); root.add(dial);
  tag(H.cylZ(13, 4, 0, 0, 1, M.blk, dial), 'dial'); tag(H.box(3, 14, 2, 0, 6, 3.6, M.white, dial), 'dial');
  const DA = function(i){ return -1.9 + i*(3.8/(DIALS.length-1)); };           /* 第 i 档的角度（从正上方顺时针） */
  DIALS.forEach(function(d, i){ const a = DA(i); H.plate(DLAB[d], 8, 3.6, mx + Math.sin(a)*19, 2 + Math.cos(a)*19, 12.6, '#e6edf5', null, root); });
  /* 四个插孔 */
  const jackMesh = {};
  [['a', '10A'], ['ma', 'mA'], ['jcom', 'COM'], ['v', 'VΩ']].forEach(function(j){ const p = JK[j[0]];
    const k = j[0] === 'a' ? 'ja' : j[0] === 'ma' ? 'jma' : j[0] === 'v' ? 'jv' : 'jcom';
    const m = tag(H.cylZ(3.4, 1, p[0], p[1], 12.6, H.M(j[0] === 'jcom' ? 0x111214 : 0x1a1b1e, {roughness:0.4}), root), k);
    jackMesh[j[0]] = m;
    tag(H.cylZ(4.4, 0.8, p[0], p[1], 12.3, j[0] === 'jcom' ? M.blk : H.M(0xb02a2a, {roughness:0.5}), root), k);
    H.plate(j[1], 9, 3.4, p[0], p[1]+7, 12.6, '#e6edf5', null, root); });
  /* ── 电路板：电池 → T1 → 开关 → T2 → 灯 → T3 → T4 → 电池 ── */
  tag(H.box(96, 96, 3, 50, 0, 1.5, H.M(0x2f5d3a, {roughness:0.7}), root), 'board');
  const battG = new T.Group(); root.add(battG);
  tag(H.box(16, 46, 14, 14, 0, 10, H.M(0x2b2f34, {roughness:0.5}), battG), 'batt');
  tag(H.box(16, 14, 14.2, 14, 16, 10, H.M(0xc0392b, {roughness:0.5}), battG), 'batt');
  H.plate('12V', 12, 5, 14, -6, 17.2, '#e6edf5', null, battG);
  H.plate('+', 5, 5, 14, 16, 17.3, '#ffffff', null, battG);
  const swG = new T.Group(); swG.position.set(51, 34, 6); root.add(swG);
  tag(H.box(10, 10, 4, 0, 0, 0, M.blk, swG), 'sw');
  const lever = new T.Group(); lever.position.set(0, 0, 2); swG.add(lever);
  tag(H.box(2.4, 2.4, 12, 0, 0, 6, M.zinc, lever), 'sw');
  /* 灯：灯座 + 玻璃泡（发光） */
  tag(H.box(14, 14, 6, 72, 0, 6, M.white, root), 'lamp');
  const glass = H.M(0xfff4d6, {roughness:0.1, transparent:true, opacity:0.55, emissive:0x000000});
  const bulb = tag(new T.Mesh(new T.SphereGeometry(7, 20, 16), glass), 'lamp'); bulb.position.set(72, 0, 16); root.add(bulb);
  const lightC = new T.PointLight(0xffd27a, 0, 80); lightC.position.set(72, 0, 22); root.add(lightC);
  /* 测点：铜接线柱 + 字 */
  const tpMesh = {};
  Object.keys(TPS).forEach(function(k){ const p = TPS[k];
    tpMesh[k] = tag(H.cylZ(3.2, 8, p[0], p[1], 7, M.brass, root), 'tp'); tpMesh[k].userData.tp = k;
    H.plate(k, 8, 4, p[0], p[1] + (p[1] > 0 ? 8 : -8), 3.2, '#e6edf5', null, root); });
  /* 板上导线（铜） */
  const wire = function(pts){ H.wire(pts.map(function(p){ return [p[0], p[1], 4]; }), 0.9, M.cu, root); };
  wire([[14, 23], [14, 34], [30, 34]]); wire([[30, 34], [46, 34]]); wire([[56, 34], [72, 34]]); wire([[72, 34], [72, 7]]);
  wire([[72, -7], [72, -34]]); wire([[72, -34], [30, -34]]); wire([[30, -34], [14, -34], [14, -23]]);
  /* 电流小点：沿板上回路 */
  const loopP = K.dots(14, K.curM, H.poly([[14, 23, 5], [14, 34, 5], [46, 34, 5], [56, 34, 5], [72, 34, 5], [72, 7, 5], [72, -7, 5], [72, -34, 5], [14, -34, 5], [14, -23, 5]]));
  /* ── 表笔：笔身 + 引线（从插孔到笔尾，悬链） ── */
  function probe(col){ const g = new T.Group(); root.add(g);
    const pm = H.M(col, {roughness:0.5});
    const b = new T.CylinderGeometry(1.8, 1.8, 26, 12); b.rotateX(Math.PI/2);
    const body = tag(new T.Mesh(b, pm), col === 0xc0392b ? 'red' : 'black'); body.position.z = 17; g.add(body);
    const tip = new T.Mesh(new T.CylinderGeometry(0.5, 0.5, 6, 8).rotateX(Math.PI/2), M.zinc); tip.position.z = 1; g.add(tip);
    return {g:g, m:pm, lead:null}; }
  const pr = {red:probe(0xc0392b), black:probe(0x24272b)};
  const REST = {red:[-14, -62], black:[-24, -62]};
  function placeLead(k){
    const p = pr[k], from = k === 'black' ? JK.jcom : JK[st.jack], to = p.g.position;
    if(p.lead){ root.remove(p.lead); p.lead.geometry.dispose(); }
    const a = new T.Vector3(from[0], from[1], 13), b = new T.Vector3(to.x, to.y, to.z + 30);
    const mid = a.clone().lerp(b, 0.5); mid.z = Math.max(a.z, b.z) - 6; mid.y -= 14;
    p.lead = new T.Mesh(new T.TubeGeometry(new T.QuadraticBezierCurve3(a, mid, b), 24, 0.9, 6, false), p.m); root.add(p.lead);
  }
  function placeProbe(k){ const at = st[k], p = pr[k];
    if(at){ const q = TPS[at]; p.g.position.set(q[0] + (k === 'red' ? -1.5 : 1.5), q[1], 11); p.g.rotation.set(0, k === 'red' ? -0.25 : 0.25, 0); }
    else { const q = REST[k]; p.g.position.set(q[0], q[1], 2); p.g.rotation.set(Math.PI/2.2, 0, 0); }
    placeLead(k); }
  /* 表里电流（mA / 10A 档时沿表笔线走）—— 只在有电流时显示 */
  let r = null;
  function update(){
    r = MLab.read(st);
    if(r.fuseBlow){ st.fuse = false; const m = r.msg; r = MLab.read(st); r.msg = m; r.warn = true; }   /* 烧了以后电路照新情况重算（灯、读数），说明留着「烧了」那句 */
    drawLcd(r);
    dial.rotation.z = -DA(DIALS.indexOf(st.dial));
    battG.position.z = st.batt ? 0 : 26; battG.position.x = st.batt ? 0 : -6;
    lever.rotation.x = st.sw ? 0.45 : -0.45;
    placeProbe('red'); placeProbe('black');
    if(r.beep) beep();
    if(opt.onRead) opt.onRead(r, st);
    K.S.dirty = true;
  }
  let ac = null;
  function beep(){ try{ ac = ac || new (window.AudioContext || window.webkitAudioContext)(); const o = ac.createOscillator(), g = ac.createGain();
    o.frequency.value = 2700; g.gain.value = 0.06; o.connect(g); g.connect(ac.destination); o.start(); o.stop(ac.currentTime + 0.35); }catch(e){} }
  update();
  const api = {
    st:st, update:update,
    set:function(o){ Object.assign(st, o); update(); },
    dial:function(d){ st.dial = d; update(); }, jack:function(j){ st.jack = j; update(); },
    fuse:function(){ st.fuse = true; st.red = st.black = null; st.next = 'red'; update(); },   /* 换保险前先把表笔拿开，不然一装上又烧 */ clearProbes:function(){ st.red = st.black = null; st.next = 'red'; update(); }
  };
  return {
    labels:[['lcd', -56, 34, 13], ['dial', -56, 2, 16], ['jcom', -50, -44, 13], ['jv', -38, -44, 13], ['jma', -62, -44, 13], ['ja', -74, -44, 13],
            ['batt', 14, 0, 18], ['sw', 51, 34, 14], ['lamp', 72, 0, 24], ['tp', 30, 34, 11]],
    press:function(k){
      if(k === 'tp'){ return false; }
      if(k === 'dial'){ st.dial = DIALS[(DIALS.indexOf(st.dial)+1) % DIALS.length]; update(); return true; }
      if(k === 'jv' || k === 'jma' || k === 'ja'){ st.jack = k === 'jv' ? 'v' : k === 'jma' ? 'ma' : 'a'; update(); return true; }
      if(k === 'batt'){ st.batt = !st.batt; update(); return true; }
      if(k === 'sw'){ st.sw = !st.sw; update(); return true; }
      return false;
    },
    /* 测点要知道点的是哪一根柱子：viewer 只给键名，所以单独接一下 pointerup 拿到网格 */
    hitMesh:function(m){ if(m.userData.tp){ const k = st.next; st[k] = m.userData.tp; st.next = k === 'red' ? 'black' : 'red'; update(); return true; } return false; },
    api:api,
    tick:function(dt, k){
      const lit = Math.min(1, (r ? r.lampW : 0) / 1.44);
      glass.emissive.setHex(0xffc65a); glass.emissiveIntensity = lit*1.6; lightC.intensity = lit*3000;
      const flowing = r && r.lampW > 0.005;
      K.flow(loopP, flowing, 0.12/k, dt);
      return flowing || lit > 0.01;
    }
  };
  }}, opt); };
})();

/* ══════════════ 接触器检测台（5.3）：3D 万用表（电阻/通断）+ 3D 接触器 ══════════════
   点接触器的端子放表笔（先红后黑），点蓝色触点架＝用手按下去强制吸合（书 P84 那一招）。
   读数口径同 c5-3.js：线圈 A1-A2 = 1.694 kΩ（书 P84 图 5-9，380 V 线圈）；主触头断开 OL、按下 0；21-22 反过来。
   opt.fault：'ok' | 'coilOpen' 线圈断线 | 'coilShort' 匝间短路 | 'weld' 1-2 粘连 | 'burnt' 3-4 烧坏接触不上；opt.onRead(r, st) */
(function(){
'use strict';
const TPOS = {'1':[-27,33], '2':[-27,-33], '3':[-13,33], '4':[-13,-33], '5':[1,33], '6':[1,-33], '13':[15,33], '14':[15,-33], '21':[26,33], '22':[26,-33]};
const PAIRS = {'1':'P1', '2':'P1', '3':'P2', '4':'P2', '5':'P3', '6':'P3', '13':'NO', '14':'NO', '21':'NC', '22':'NC', 'A1':'C', 'A2':'C'};
const MX = -100;                                    /* 表放在接触器左边 */
function resist(a, b, pressed, fault){
  if(a === b) return 0;
  const pa = PAIRS[a], pb = PAIRS[b]; if(pa !== pb) return Infinity;
  if(pa === 'C') return fault === 'coilOpen' ? Infinity : fault === 'coilShort' ? 0.4 : 1694;
  if(pa === 'NC') return pressed ? Infinity : 0.05;
  if(pa === 'P1' && fault === 'weld') return 0.05;
  if(pa === 'P2' && fault === 'burnt') return Infinity;
  return pressed ? 0.05 : Infinity;
}
E3D.kmTest = function(el, opt){ opt = opt||{}; return E3D.viewer(el, {
  parts:Object.assign({}, E3D._PARTS_KM, {
    dial:['档位旋钮', '这台只用到 <b>Ω（2k 档）</b>和<b>通断</b>。<b>点它换档</b>。检测前接触器<b>必须断电、拆下来</b>。', '旋钮'],
    lcd:['液晶屏', '2k 档：单位 kΩ，1.694 就是 1694 Ω；OL＝超量程（断开）。', '液晶屏'],
    red:['红表笔', '点接触器的端子螺钉放下。', '红笔'], black:['黑表笔', '点接触器的端子螺钉放下。', '黑笔'],
    meter:['万用表', '', '万用表'],
    carrier:['触点架（用手按这里）', '<b>点它＝用手按住，强制吸合</b>（线圈没通电）；再点松开。不按的话主触头本来就是断开的，量出 OL 说明不了任何问题。', '触点架（按这里）']
  }),
  center:[-38, 0, 26], view:{th:0.0, ph:0.62, r:400},
  presets:{front:[1, 0, 0, Math.PI/2, 380], side:[0, 1, 0, -Math.PI/2, 330]},
  build:function(K){
  const T = K.T, H = K.H, M = K.M, root = K.root, tag = K.tag;
  /* 接触器（原样） */
  const B = E3D._kmBuild(K, {}, E3D._CT_KM);
  /* 端子网格认名字：位置对得上的 term / coilT 螺钉 */
  root.traverse(function(m){ if(!m.isMesh) return; const k = m.userData.part, p = m.position;
    if(k === 'term' && m.geometry.type === 'CylinderGeometry'){ for(const n in TPOS){ if(Math.abs(TPOS[n][0]-p.x) < 0.5 && Math.abs(Math.abs(TPOS[n][1])-Math.abs(p.y)) < 0.5 && Math.sign(TPOS[n][1]) === Math.sign(p.y)) m.userData.tp = n; } }
    if(k === 'coilT' && m.geometry.type === 'CylinderGeometry') m.userData.tp = p.y > 0 ? 'A1' : 'A2'; });
  const TP3 = {}; for(const n in TPOS) TP3[n] = [TPOS[n][0], TPOS[n][1], 75.4]; TP3.A1 = [26, 46, 43.4]; TP3.A2 = [-26, -46, 43.4];
  /* 表 */
  tag(H.box(48, 104, 10, MX, 0, 5, H.M(0xe8b923, {roughness:0.6}), root), 'meter');
  tag(H.box(42, 96, 3, MX, 0, 11, H.M(0x2d3136, {roughness:0.5}), root), 'meter');
  const lc = document.createElement('canvas'); lc.width = 320; lc.height = 140; const lg = lc.getContext('2d');
  const ltex = new T.CanvasTexture(lc); ltex.colorSpace = T.SRGBColorSpace;
  const lcd = tag(new T.Mesh(new T.PlaneGeometry(34, 15), new T.MeshBasicMaterial({map:ltex, toneMapped:false})), 'lcd'); lcd.position.set(MX, 34, 12.6); root.add(lcd);
  const DI = ['off', 'ohm', 'beep'], DL = {off:'OFF', ohm:'Ω 2k', beep:'通断'}, DA = function(i){ return -0.9 + i*0.9; };
  const dial = new T.Group(); dial.position.set(MX, 2, 12.5); root.add(dial);
  tag(H.cylZ(13, 4, 0, 0, 1, M.blk, dial), 'dial'); tag(H.box(3, 14, 2, 0, 6, 3.6, M.white, dial), 'dial');
  DI.forEach(function(d, i){ const a = DA(i); H.plate(DL[d], 10, 3.6, MX + Math.sin(a)*19, 2 + Math.cos(a)*19, 12.6, '#e6edf5', null, root); });
  const JC = [MX+6, -44], JV = [MX+18, -44];
  tag(H.cylZ(3.4, 1, JC[0], JC[1], 12.6, H.M(0x111214), root), 'meter'); tag(H.cylZ(3.4, 1, JV[0], JV[1], 12.6, H.M(0xb02a2a), root), 'meter');
  H.plate('COM', 9, 3.4, JC[0], JC[1]+7, 12.6, '#e6edf5', null, root); H.plate('VΩ', 9, 3.4, JV[0], JV[1]+7, 12.6, '#e6edf5', null, root);
  const st = {dial:'ohm', red:null, black:null, next:'red', fault:opt.fault || 'ok'};
  function probe(col, key){ const g = new T.Group(); root.add(g); const pm = H.M(col, {roughness:0.5});
    const b = new T.CylinderGeometry(1.8, 1.8, 26, 12); b.rotateX(Math.PI/2);
    const body = tag(new T.Mesh(b, pm), key); body.position.z = 17; g.add(body);
    const tip = new T.Mesh(new T.CylinderGeometry(0.5, 0.5, 6, 8).rotateX(Math.PI/2), M.zinc); tip.position.z = 1; g.add(tip);
    return {g:g, m:pm, lead:null}; }
  const pr = {red:probe(0xc0392b, 'red'), black:probe(0x24272b, 'black')};
  const REST = {red:[MX+30, -64], black:[MX+20, -64]};
  function placeProbe(k){ const p = pr[k], at = st[k];
    if(at){ const q = TP3[at]; p.g.position.set(q[0] + (k === 'red' ? -1.2 : 1.2), q[1], q[2]); p.g.rotation.set(0, k === 'red' ? -0.3 : 0.3, 0); }
    else { const q = REST[k]; p.g.position.set(q[0], q[1], 2); p.g.rotation.set(Math.PI/2.2, 0, 0); }
    const from = k === 'black' ? JC : JV, to = p.g.position;
    if(p.lead){ root.remove(p.lead); p.lead.geometry.dispose(); }
    const a = new T.Vector3(from[0], from[1], 13), bb = new T.Vector3(to.x, to.y, to.z + 30), mid = a.clone().lerp(bb, 0.5); mid.z = Math.max(a.z, bb.z) + 10;
    p.lead = new T.Mesh(new T.TubeGeometry(new T.QuadraticBezierCurve3(a, mid, bb), 24, 0.9, 6, false), p.m); root.add(p.lead); }
  let ac = null;
  function beep(){ try{ ac = ac || new (window.AudioContext || window.webkitAudioContext)(); const o = ac.createOscillator(), g = ac.createGain();
    o.frequency.value = 2700; g.gain.value = 0.06; o.connect(g); g.connect(ac.destination); o.start(); o.stop(ac.currentTime + 0.35); }catch(e){} }
  function read(){
    const pressed = B.api.coil.man, out = {lcd:'', unit:'', beep:false, R:null};
    if(st.dial === 'off') return out;
    if(!(st.red && st.black)){ out.lcd = 'OL'; out.unit = st.dial === 'ohm' ? 'kΩ' : ''; return out; }
    const R = resist(st.red, st.black, pressed, st.fault); out.R = R;
    if(st.dial === 'ohm'){ out.unit = 'kΩ'; out.lcd = R > 1999 ? 'OL' : (R/1000).toFixed(3); }
    else { out.beep = R < 30; out.lcd = R > 1999 ? 'OL' : R.toFixed(0); }
    return out;
  }
  function drawLcd(r){ lg.fillStyle = '#9fb59a'; lg.fillRect(0, 0, 320, 140); lg.fillStyle = '#1b2219';
    lg.textAlign = 'right'; lg.textBaseline = 'middle'; lg.font = '700 84px ui-monospace,monospace'; lg.fillText(r.lcd, 300, 78);
    lg.textAlign = 'left'; lg.font = '600 30px system-ui,sans-serif'; lg.fillText(r.unit || '', 12, 28); if(r.beep) lg.fillText('·)))', 12, 118);
    ltex.needsUpdate = true; }
  let lastKey = '';
  function update(force){
    const r = read(), key = [st.dial, st.red, st.black, B.api.coil.man, st.fault].join();
    drawLcd(r); dial.rotation.z = -DA(DI.indexOf(st.dial)); placeProbe('red'); placeProbe('black');
    if(key !== lastKey || force){ if(r.beep && key !== lastKey) beep(); lastKey = key; if(opt.onRead) opt.onRead(r, st, B.api.coil.man); }
    K.S.dirty = true; }
  update(true);
  const labels = B.labels.filter(function(l){ return /^(coilT|term|carrier|mbr|ano|anc)$/.test(l[0]); }).concat([['dial', MX, 2, 16], ['lcd', MX, 34, 13]]);
  return {
    labels:labels,
    hitMesh:function(m){ if(m.userData.tp){ const k = st.next; st[k] = m.userData.tp; st.next = k === 'red' ? 'black' : 'red'; update(); return true; } return false; },
    press:function(k){
      if(k === 'carrier'){ B.api.press(!B.api.coil.man); setTimeout(update, 350); return true; }
      if(k === 'dial'){ st.dial = DI[(DI.indexOf(st.dial)+1) % DI.length]; update(); return true; }
      return false; },
    api:{ st:st, update:update, pressed:function(){ return B.api.coil.man; }, dial:function(d){ st.dial = d; update(); }, press:function(b){ B.api.press(b); setTimeout(update, 350); },
          fault:function(f){ st.fault = f; st.red = st.black = null; st.next = 'red'; B.api.press(false); update(true); }, clear:function(){ st.red = st.black = null; st.next = 'red'; update(); } },
    tick:function(dt, k){ return B.tick(dt, k); }
  };
  }}, opt); };
})();

/* ══════════════ 自锁 / 失压保护（2.2 第 3 屏）：接触器 + 起动按钮 SB1 + 停止按钮 SB2 ══════════════
   控制回路：L → SB2（常闭）→ ┬ SB1（常开）──┬→ A1 线圈 A2 → N
                              └ KM 13-14 ────┘（自锁：松开 SB1 以后靠它接着通）
   状态来自页面 c2-2.js 的 S3：opt.state() → {power, km}；点按钮 → opt.onStart / opt.onStop；页面按钮按下时调 api.tap('sb1'|'sb2') 让按钮动一下 */
(function(){
'use strict';
const BX = -84;
E3D.selfHold = function(el, opt){ opt = opt||{}; return E3D.viewer(el, {
  parts:Object.assign({}, E3D._PARTS_KM, {
    sb1:['起动按钮 SB1（常开，绿）', '按下去接通，<b>手一松就弹回断开</b>。它只负责「起个头」。<b>点它按一下</b>。', 'SB1 起动'],
    sb2:['停止按钮 SB2（常闭，红）', '平时是通的，按下去断开 —— 线圈一断电，自锁也跟着断。<b>点它按一下</b>。', 'SB2 停止'],
    ano:['自锁触点 13-14（辅助常开）', '<b>并在 SB1 两头</b>。接触器一吸合它就闭合，替 SB1 把线圈这一路接着通上 —— 所以松开 SB1 电动机照转。这就叫<b>自锁</b>。<br>停电时接触器一释放，它也断开；来电后<b>没人按 SB1，线圈就不会自己得电</b> —— 这就是<b>失压保护</b>。', '自锁 13-14'],
    pwr:['控制电源 L / N', '点「来一次停电」看它断电再来电。', '电源 L/N']
  }),
  center:[-30, 0, 36], view:{th:0.0, ph:0.7, r:330},
  presets:{front:[1, 0, 0, Math.PI/2, 380], side:[0, 1, 0, -Math.PI/2, 340]},
  build:function(K){
  const T = K.T, H = K.H, M = K.M, root = K.root, tag = K.tag;
  const B = E3D._kmBuild(K, {}, E3D._CT_KM);
  /* 两个按钮：盒子 + 帽（绿/红）+ 左右两颗端子 */
  function button(y, col, key){ const g = new T.Group(); g.position.set(BX, y, 0); root.add(g);
    tag(H.box(24, 24, 20, 0, 0, 10, H.M(0xd9dde1, {roughness:0.5}), g), key);
    const cap = new T.Group(); cap.position.z = 20; g.add(cap);
    tag(H.cylZ(8, 6, 0, 0, 3, H.M(col, {roughness:0.4}), cap), key);
    [-9, 9].forEach(function(dx){ tag(H.cylZ(2.4, 2, dx, -9, 20.5, M.zinc, g), key); });
    return cap; }
  const cap1 = button(-22, 0x2e9e4f, 'sb1'), cap2 = button(22, 0xc23b32, 'sb2');
  H.plate('SB1 起动', 16, 4.4, BX, -38, 0.4, '#e6edf5', null, root); H.plate('SB2 停止', 16, 4.4, BX, 38, 0.4, '#e6edf5', null, root);
  /* 电源端子 L / N（灯亮表示有电） */
  const lampM = H.M(0x3a3f45, {emissive:0x000000});
  [[66, 'L'], [-66, 'N']].forEach(function(a){ tag(H.box(14, 10, 8, BX, a[0], 4, M.blk, root), 'pwr'); tag(H.cylZ(2.6, 2, BX, a[0], 9, M.zinc, root), 'pwr');
    H.plate(a[1], 5, 5, BX - 11, a[0], 0.4, '#e6edf5', null, root); });
  const pl = tag(H.cylZ(3, 3, BX + 14, 66, 2, lampM, root), 'pwr');
  /* 控制线（黑）：L→SB2 左；SB2 右→节点 X；X→SB1 左；X→13；SB1 右→14；14→A1；A2→N */
  const w = function(p){ H.wire(p, 0.8, M.blk, root); };
  const Lp = [BX, 66, 11], S2i = [BX-9, 13, 21], S2o = [BX+9, 13, 21], S1i = [BX-9, -31, 21], S1o = [BX+9, -31, 21];
  const X = [BX+20, 13, 26], T13 = [15, 33, 77], T14 = [15, -33, 77], A1 = [26, 46, 45], A2 = [-26, -46, 45], Np = [BX, -66, 11];
  w([Lp, [BX-9, 66, 24], S2i]);
  w([S2o, X]); w([X, [BX+20, -8, 26], [BX-9, -8, 26], S1i]);
  w([X, [BX+20, 52, 60], [15, 52, 82], T13]);
  w([S1o, [BX+20, -31, 30], [-40, -56, 82], [15, -56, 82], T14]);
  w([T14, [40, -33, 82], [40, 46, 50], A1]);
  w([A2, [-26, -66, 30], [BX+12, -66, 20], Np]);
  const head = [Lp, [BX-9, 66, 24], S2i, S2o, X], tail = [T14, [40, -33, 82], [40, 46, 50], A1, [0, 0, 20], A2, [-26, -66, 30], [BX+12, -66, 20], Np];
  const startP = K.dots(16, K.curM, H.poly(head.concat([[BX+20, -8, 26], [BX-9, -8, 26], S1i, S1o, [BX+20, -31, 30], [-40, -56, 82], [15, -56, 82]], tail)));
  const holdP = K.dots(16, K.curM, H.poly(head.concat([[BX+20, 52, 60], [15, 52, 82], T13, [15, 0, 70]], tail)));
  const st = {p1:0, p2:0};
  return {
    labels:[['sb1', BX, -22, 30], ['sb2', BX, 22, 30], ['ano', 15, 4, 69], ['coilT', 26, 46, 47], ['pwr', BX, 66, 10], ['carrier', 0, 7, 88, B.mov]],
    press:function(k){ if(k === 'sb1' && opt.onStart){ st.p1 = 1; opt.onStart(); return true; } if(k === 'sb2' && opt.onStop){ st.p2 = 1; opt.onStop(); return true; } return false; },
    api:{ tap:function(k){ st[k === 'sb1' ? 'p1' : 'p2'] = 1; K.S.dirty = true; } },
    tick:function(dt, k){
      const s = opt.state ? opt.state() : {power:true, km:false};
      const on = s.power && s.km;
      B.api.set(on);
      st.p1 = Math.max(0, st.p1 - dt*2/k); st.p2 = Math.max(0, st.p2 - dt*2/k);
      cap1.position.z = 20 - 4*Math.min(1, st.p1*3); cap2.position.z = 20 - 4*Math.min(1, st.p2*3);
      lampM.emissive.setHex(0xffc65a); lampM.emissiveIntensity = s.power ? 1.2 : 0;
      K.flow(startP, s.power && st.p1 > 0.3, 0.12/k, dt);                  /* 按住 SB1 的那一下：电从 SB1 走 */
      K.flow(holdP, on && B.api.coil.t > 0.6, 0.12/k, dt);                  /* 吸合以后：电从自锁触点 13-14 走 */
      return B.tick(dt, k) || st.p1 > 0 || st.p2 > 0 || on;
    }
  };
  }}, opt); };
})();

/* ══════════════ 小型断路器 DZ47 / C 型，三极（剖开看）══════════════
   每一极：上端子 → 静触点 → 动触点（铰在里面，跟手柄联动）→ 软铜辫 → 电磁线圈（短路瞬时脱扣）→ 双金属片（过载延时脱扣）→ 下端子。
   触点旁边是灭弧栅片。电自己算（不靠页面）：
     过载：热量 dθ/dt = (x² − θ)/τ，τ 按演示放快（x＝电流/额定）；θ ≥ 1.13²（约 1.13 倍额定的约定不脱扣/1.45 倍约定脱扣之间取）就跳
     短路：x ≥ 5（C 型 5~10 倍额定瞬时脱扣）→ 立刻跳
   opt.onState({on, tripped, cause, heat, x}) */
(function(){
'use strict';
const PARTS = {
  handle: ['手柄', '往上＝合，往下＝分。跳闸以后它自己掉到「分」。<b>点它扳一下</b>（跳了以后要等双金属片凉下来才合得上）。', '手柄'],
  fix:    ['静触点', '连着上端子。', '静触点'],
  mov:    ['动触点', '跟手柄联动。跳闸时被弹簧一下拉开。', '动触点'],
  chute:  ['灭弧栅片', '一叠钢片。触点拉开时的电弧被吸进来、切成好几段，很快就熄了。', '灭弧栅'],
  coil:   ['电磁脱扣器（线圈 + 顶针）', '管<b>短路</b>：电流一下到额定的 5~10 倍（C 型），线圈吸力猛增，顶针<b>瞬间</b>弹出撞开锁扣 —— 几毫秒就跳。', '电磁脱扣'],
  bim:    ['热脱扣器（双金属片）', '管<b>过载</b>：电流比额定大一些时慢慢发热弯曲，弯到推开锁扣才跳。电流越大跳得越快（反时限）。', '热脱扣'],
  latch:  ['锁扣机构', '合闸时把动触点锁在闭合位置；电磁顶针或双金属片推它一下，它就脱开，弹簧把触点拉开。', '锁扣'],
  braid:  ['软铜辫', '动触点要转，所以用软的编织铜线连。', '软铜辫'],
  tin:    ['上端子（进线）', '电源从上面进，上进下出。', '上端子'],
  tout:   ['下端子（出线）', '接负载。', '下端子'],
  housing:['外壳', '']
};
const PX = [-18, 0, 18];
E3D.breaker = function(el, opt){ opt = opt||{}; return E3D.viewer(el, {
  parts:PARTS, center:[0, 0, 36], view:{th:0.75, ph:1.05, r:230},
  presets:{front:[1, 0, 0, Math.PI/2, 220], side:[0, 1, 0, -Math.PI/2, 200]},
  build:function(K){
  const T = K.T, H = K.H, M = K.M, root = K.root, shell = K.shell, tag = K.tag;
  const wh = H.M(0xeceef0, {roughness:0.5, transparent:true});
  PX.forEach(function(x){
    [[17, 80, 2, x, 0, 1], [17, 2, 60, x, 40, 30], [17, 2, 60, x, -40, 30], [1.2, 80, 60, x-8.5, 0, 30], [1.2, 80, 60, x+8.5, 0, 30]].forEach(function(b){ tag(H.box(b[0], b[1], b[2], b[3], b[4], b[5], wh, shell), 'housing'); });
    tag(H.box(17, 44, 10, x, 0, 64, wh, shell), 'housing');                       /* 前面凸起那一段（手柄在这里） */
  });
  const poles = [];
  PX.forEach(function(x){
    /* 端子（箱式夹头） */
    tag(H.box(10, 10, 10, x, 33, 22, M.zinc, root), 'tin'); tag(H.cylZ(2.6, 3, x, 33, 72, M.zinc, root), 'tin');
    tag(H.box(10, 10, 10, x, -33, 22, M.zinc, root), 'tout'); tag(H.cylZ(2.6, 3, x, -33, 72, M.zinc, root), 'tout');
    /* 静触点：上端子 → 往下伸 */
    tag(H.box(4, 22, 2, x, 18, 30, M.cu, root), 'fix'); tag(H.cylZ(2, 1, x, 8, 31.4, M.ag, root), 'fix');
    /* 灭弧栅片：触点后面一叠 */
    for(let i=0;i<7;i++) tag(H.box(11, 1, 12, x, 0 + i*2.2 - 10 + 12, 14, M.steel, root), 'chute');
    /* 动触点：铰在 (y -4, z 44)，臂伸到 (y 8, z 32) */
    const piv = new T.Group(); piv.position.set(x, -4, 44); root.add(piv);
    const arm = tag(H.box(3, 3, 17, 0, 6, -6, M.cu, piv), 'mov'); arm.rotation.x = -0.79;
    tag(H.cylZ(2, 1, 0, 12, -12.4, M.ag, piv), 'mov');
    /* 软铜辫 → 电磁线圈 → 双金属片 → 下端子 */
    H.wire([[x, -4, 44], [x+3, -10, 40], [x, -14, 34]], 0.9, H.M(0xb87333, {metalness:0.6, roughness:0.6}), root);
    const cg = new T.CylinderGeometry(4.5, 4.5, 12, 18); const coil = tag(new T.Mesh(cg, M.winding), 'coil'); coil.position.set(x, -14, 26); root.add(coil);
    const pin = new T.Group(); pin.position.set(x, -14, 26); root.add(pin);
    tag(H.box(1.4, 6, 1.4, 0, 8, 0, M.steel, pin), 'coil');                       /* 顶针：平时缩在线圈里 */
    const bm = H.M(0xb08a5a, {metalness:0.7, roughness:0.4, emissive:0x000000});
    const bg = new T.Group(); bg.position.set(x, -26, 14); root.add(bg);
    tag(H.box(6, 1.6, 22, 0, 0, 11, bm, bg), 'bim');
    H.wire([[x, -14, 20], [x, -24, 14], [x, -28, 14], [x, -33, 18]], 0.8, M.cu, root);
    /* 锁扣（白塑料小块） */
    const lt = tag(H.box(8, 4, 4, x, -10, 48, M.white, root), 'latch');
    poles.push({piv:piv, pin:pin, bg:bg, bm:bm, lt:lt});
  });
  /* 手柄：三极连在一起（横杆），绕 x 轴转 */
  const hd = new T.Group(); hd.position.set(0, 0, 66); root.add(hd);
  tag(H.box(50, 6, 16, 0, 0, 8, H.M(0x2b2f34, {roughness:0.5}), hd), 'handle');
  H.plate('ON', 7, 4, 32, 18, 69.2, '#e6edf5', null, root); H.plate('OFF', 8, 4, 32, -18, 69.2, '#e6edf5', null, root);
  /* 电流 + 电弧 */
  const PH = [0xe0a92e, 0x3fa845, 0xcf4436].map(function(c){ return H.M(c, {roughness:0.5}); });
  PX.forEach(function(x, i){ H.wire([[x, 33, 22], [x, 52, 22]], 1.5, PH[i], root); H.wire([[x, -33, 22], [x, -52, 22]], 1.5, PH[i], root); });
  const paths = PX.map(function(x){ return K.dots(10, K.curM, H.poly([[x, 52, 22], [x, 33, 26], [x, 18, 30], [x, 8, 32], [x, -4, 44], [x, -14, 34], [x, -14, 20], [x, -26, 14], [x, -28, 26], [x, -33, 22], [x, -52, 22]])); });
  const arcM = new T.MeshBasicMaterial({color:0xcfe4ff, toneMapped:false, transparent:true, opacity:0, blending:T.AdditiveBlending, depthWrite:false});
  const arcs = PX.map(function(x){ const m = new T.Mesh(new T.SphereGeometry(3.5, 12, 10), arcM); m.position.set(x, 8, 26); root.add(m); return m; });
  /* 电 */
  const TAU = 20, TRIP = 1.13*1.13;                                     /* 演示用：1.5 倍约 5 秒跳、3 倍约 1 秒，真的是几十秒到几分钟 */
  const st = {on:true, x:1, th:1, tripped:false, cause:'', arc:0, pin:0, a:0};
  function emit(){ if(opt.onState) opt.onState({on:st.on, tripped:st.tripped, cause:st.cause, heat:Math.min(1, st.th/TRIP), x:st.x}); }
  function trip(cause){ if(!st.on) return; st.on = false; st.tripped = true; st.cause = cause; st.arc = 1; if(cause === 'short') st.pin = 1; emit(); }
  const api = {
    st:st,
    toggle:function(){ if(st.on){ st.on = false; st.tripped = false; st.cause = ''; if(st.x > 0.05) st.arc = 0.7; }
      else { if(st.th > TRIP*0.85){ st.cause = 'hot'; emit(); return; } st.on = true; st.tripped = false; st.cause = ''; } emit(); K.S.dirty = true; },
    setX:function(x){ st.x = x; if(st.on && x >= 5) trip('short'); emit(); },
    short:function(){ st.x = 20; if(st.on) trip('short'); else emit(); }
  };
  emit();
  return {
    labels:[['handle', 0, 0, 80, hd], ['fix', 18, 18, 31], ['mov', 18, 2, 40], ['chute', 0, 12, 14], ['coil', 18, -14, 31], ['bim', -18, -26, 30], ['latch', 18, -10, 50], ['tin', -18, 33, 28], ['tout', 0, -33, 28]],
    press:function(k){ if(k === 'handle'){ api.toggle(); return true; } return false; },
    api:api,
    tick:function(dt, k){
      const I = st.on ? st.x : 0;
      st.th += (I*I - st.th)/TAU * dt/k;
      if(st.on && st.th >= TRIP) trip('overload');
      const h = Math.min(1, st.th/TRIP);
      st.a += ((st.on ? 0 : 1) - st.a) * Math.min(1, dt*(st.on ? 10 : 25)/k);
      hd.rotation.x = 0.55 - 1.1*st.a;                                      /* 上＝合，下＝分 */
      st.arc = Math.max(0, st.arc - dt/(0.3*k)); st.pin = Math.max(0, st.pin - dt/(0.5*k));
      arcM.opacity = st.arc; arcs.forEach(function(m){ m.visible = st.arc > 0.01; m.scale.setScalar(0.6 + st.arc*1.4); });
      poles.forEach(function(p){
        p.piv.rotation.x = 0.55*st.a;                                       /* 动触点张开 */
        p.pin.position.z = 26 + 10*st.pin;                                  /* 顶针弹出撞锁扣 */
        p.bg.rotation.x = 0.4*h;                                            /* 双金属片受热往锁扣那边弯 */
        p.bm.emissive.setHex(0xff0000); p.bm.emissiveIntensity = Math.pow(Math.max(0, (h-0.82)/0.18), 1.5)*1.4;   /* 额定时 h≈0.78，不红 */
        p.lt.position.y = -10 + (st.tripped ? 2.5 : 0);
      });
      const flowing = st.on && st.x > 0.05;
      paths.forEach(function(g){ K.flow(g, flowing, (0.05 + 0.04*Math.min(st.x, 3))/k, dt); });
      if(!st.on && st.cause === 'hot' && st.th < TRIP*0.85){ st.cause = ''; emit(); }
      return true;
    }
  };
  }}, opt); };
})();

/* ══════════════ 三相异步电动机（剖开看）══════════════
   轴沿 x 方向躺着。定子铁芯带槽、三相绕组按相色（黄绿红）；鼠笼转子；风扇；接线盒。
   旋转磁场：定子里一圈蓝色箭头（2p 个，N/S 交替），按同步转速 n₀＝60f/p 转；转子按 n＝n₀(1−s) 转，s＝4%（同页面）。
   画面转速按 1/50 放慢；转子上的白色标记会一点点落后于磁场 —— 「异步」。opt.state() → {p, f}；api.reverse() 调换两相 */
(function(){
'use strict';
const PARTS = {
  frame:  ['机座（外壳）', '铸铁或铝，外面一圈散热筋；底下有地脚。', '机座'],
  stator: ['定子铁芯', '硅钢片叠成的一个圆筒，内圈开槽放绕组。<b>不转</b>。', '定子铁芯'],
  wind:   ['三相定子绕组', '三组线圈（U/V/W，这里按相色黄绿红）在圆周上错开 120° 放。通上三相电，合起来就是一个<b>旋转磁场</b>。', '定子绕组'],
  field:  ['旋转磁场（示意）', '看不见的东西，这里用蓝箭头画出来：箭头指的是 N 极。它的转速叫<b>同步转速 n₀ = 60f / p</b>。', '旋转磁场'],
  rotor:  ['鼠笼转子', '铁芯外圈嵌着一根根导条，两头用端环短接，像个松鼠笼。旋转磁场扫过导条感应出电流，电流在磁场里受力 —— 转子就被拖着转。', '鼠笼转子'],
  mark:   ['转子上的标记（白条）', '盯住它和蓝箭头：它<b>总比磁场慢一点</b>，越落越远。要是追上了，导条就不再切割磁场、不再有电流、也就没有力 —— 所以永远追不上，叫「异步」。', '转子标记'],
  shaft:  ['转轴', '把力矩传出去带负载。', '转轴'],
  fan:    ['风扇', '装在后面，跟着轴转，给机座吹风散热。', '风扇'],
  tbox:   ['接线盒', '三相绕组的六个头都引到这里（第 3 屏讲星形、三角形怎么接）。', '接线盒'],
  housing:['端盖', '']
};
E3D.motor = function(el, opt){ opt = opt||{}; return E3D.viewer(el, {
  parts:PARTS, center:[0, 0, 42], view:{th:0.75, ph:1.15, r:290},
  presets:{front:[0, 1, 0, -Math.PI/2, 240], side:[1, 0, 0, Math.PI/2, 290]},
  build:function(K){
  const T = K.T, H = K.H, M = K.M, root = K.root, shell = K.shell, tag = K.tag;
  const AX = new T.Group(); AX.position.set(0, 0, 42); root.add(AX);          /* 轴心；里面的东西都绕 x 轴 */
  const cyl = function(r, len, mat, x, seg){ const g = new T.CylinderGeometry(r, r, len, seg||32); g.rotateZ(Math.PI/2); const m = new T.Mesh(g, mat); m.position.x = x||0; return m; };
  /* 机座 + 散热筋 + 地脚 + 端盖（剖开半透明） */
  const iron = H.M(0x4f6f8f, {roughness:0.55, metalness:0.3, transparent:true});
  const fr = tag(cyl(40, 70, iron), 'frame'); fr.position.z = 42; shell.add(fr);
  for(let i=0;i<16;i++){ const a = i/16*Math.PI*2, f = tag(H.box(66, 2, 6, 0, 0, 0, iron, shell), 'frame'); f.position.set(0, Math.cos(a)*42, 42 + Math.sin(a)*42); f.rotation.x = a; }
  [-37, 37].forEach(function(x){ const e = tag(cyl(40, 4, iron, x), 'housing'); e.position.z = 42; shell.add(e); });
  [-24, 24].forEach(function(x){ tag(H.box(14, 70, 4, x, 0, 2, iron, root), 'frame'); tag(H.box(10, 6, 34, x, 30, 18, iron, root), 'frame'); tag(H.box(10, 6, 34, x, -30, 18, iron, root), 'frame'); });
  tag(H.box(26, 26, 12, 0, 0, 88, iron, shell), 'tbox');
  /* 定子铁芯：圆环带 24 个槽（挤出） */
  const NS = 24, sh = new T.Shape(); sh.absarc(0, 0, 35, 0, Math.PI*2, false);
  const hole = new T.Path(); hole.absarc(0, 0, 20, 0, Math.PI*2, true); sh.holes.push(hole);
  const sg = new T.ExtrudeGeometry(sh, {depth:50, bevelEnabled:false, curveSegments:48}); sg.translate(0, 0, -25); sg.rotateY(Math.PI/2);
  AX.add(tag(new T.Mesh(sg, H.M(0x7d858d, {metalness:0.6, roughness:0.45})), 'stator'));
  /* 槽里的绕组：第 i 槽属于哪一相（极对数改了也照这个排法画，示意） */
  const PHC = [0xe0a92e, 0x3fa845, 0xcf4436].map(function(c){ return H.M(c, {roughness:0.45, metalness:0.3}); });
  const wind = new T.Group(); AX.add(wind);
  function layWindings(p){ while(wind.children.length) wind.remove(wind.children[0]);
    const per = Math.max(1, Math.round(NS/(6*p)));
    for(let i=0;i<NS;i++){ const a = (i+0.5)/NS*Math.PI*2, ph = Math.floor(i/per) % 3;
      const m = tag(H.box(54, 4.2, 4.2, 0, 0, 0, PHC[ph], wind), 'wind'); m.position.set(0, Math.cos(a)*22.5, Math.sin(a)*22.5); m.rotation.x = a; } }
  /* 转子：铁芯 + 导条 + 端环 + 白标记 */
  const rotor = new T.Group(); AX.add(rotor);
  rotor.add(tag(cyl(18.5, 50, H.M(0x8e969e, {metalness:0.6, roughness:0.4})), 'rotor'));
  const alu = H.M(0xc9ced3, {metalness:0.85, roughness:0.3});
  for(let i=0;i<18;i++){ const a = i/18*Math.PI*2, b = tag(H.box(52, 2.2, 2.2, 0, 0, 0, alu, rotor), 'rotor'); b.position.set(0, Math.cos(a)*18.2, Math.sin(a)*18.2); b.rotation.x = a; }
  [-26, 26].forEach(function(x){ const rg = new T.TorusGeometry(17.5, 1.6, 8, 32); rg.rotateY(Math.PI/2); const r = tag(new T.Mesh(rg, alu), 'rotor'); r.position.x = x; rotor.add(r); });
  const mk = tag(H.box(53, 2, 4, 0, 0, 19.5, M.white, rotor), 'mark');
  rotor.add(tag(cyl(4, 120, M.steel), 'shaft'));
  /* 风扇（后面，跟轴转） */
  const fan = new T.Group(); fan.position.x = -46; rotor.add(fan);
  for(let i=0;i<8;i++){ const a = i/8*Math.PI*2, b = tag(H.box(3, 4, 30, 0, 0, 0, H.M(0x2b2f34, {roughness:0.6}), fan), 'fan'); b.position.set(0, Math.cos(a)*15, Math.sin(a)*15); b.rotation.x = a; }
  /* 旋转磁场：2p 个箭头（N 往外、S 往里），放在定子前端面 */
  const field = new T.Group(); field.position.x = 27; AX.add(field);
  const arrM = K.sigM;
  function layField(p){ while(field.children.length) field.remove(field.children[0]);
    for(let i=0;i<2*p;i++){ const a = i/(2*p)*Math.PI*2, g = new T.Group(); g.rotation.x = a; field.add(g);
      const out = i % 2 === 0;
      const sh = tag(new T.Mesh(new T.CylinderGeometry(0.9, 0.9, 10, 8), arrM), 'field'); sh.position.y = 13; g.add(sh);
      const cn = tag(new T.Mesh(new T.ConeGeometry(2.6, 5, 12), arrM), 'field'); cn.position.y = out ? 20 : 6; cn.rotation.x = out ? 0 : Math.PI; g.add(cn);
      if(out){ const lab = H.plate('N', 5, 5, 0, 0, 0, '#4fb4ff', null, g); lab.position.set(0.5, 25, 0); lab.rotation.y = Math.PI/2; } } }
  let curP = 0;
  const st = {th0:0, th:0, dir:1};
  return {
    labels:[['frame', 0, -40, 70], ['stator', 0, 0, 77], ['wind', 26, 16, 58], ['field', 27, 0, 62], ['rotor', 10, -14, 56], ['mark', -10, 0, 62], ['shaft', 58, 0, 42], ['fan', -48, 0, 60], ['tbox', 0, 0, 95]],
    api:{ reverse:function(){ st.dir = -st.dir; return st.dir; }, st:st },
    tick:function(dt, k){
      const s = opt.state ? opt.state() : {p:2, f:50};
      if(s.p !== curP){ curP = s.p; layWindings(curP); layField(curP); }
      const n0 = 60*s.f/s.p, n = n0*0.96, VIS = 1/50;                         /* 画面放慢 50 倍 */
      st.th0 += st.dir * n0/60*2*Math.PI*VIS * dt/k; st.th += st.dir * n/60*2*Math.PI*VIS * dt/k;
      field.rotation.x = st.th0; rotor.rotation.x = st.th;
      return true;
    }
  };
  }}, opt); };
})();

/* ══════════════ 电动机接线盒：六个接线柱 + 三片连接片（星形 / 三角形）══════════════
   国标排法：上排 W2 U2 V2，下排 U1 V1 W1（上下错开一位，正好让三角形的连接片竖着放）。
   星形：上排三颗用两片连接片横着连成一点（星点），电源接下排。三角形：三片竖着连 U1-W2、V1-U2、W1-V2。
   opt.state() → {d 三角形?}；连接片换位置时先抬起、平移、再放下 */
(function(){
'use strict';
const PARTS = {
  stud:  ['接线柱', '每相绕组两个头：U1-U2、V1-V2、W1-W2。上排是「尾」、下排是「头」。', '接线柱'],
  link:  ['连接片（铜）', '<b>摆法决定接法</b>：横着把上排三颗连起来是星形，竖着三片是三角形。', '连接片'],
  lead:  ['绕组引出线', '电机里面三组绕组的六个头。同一种颜色是同一相绕组的两头。', '绕组引线'],
  cable: ['电源进线 L1 L2 L3', '接在下排 U1 V1 W1。', '电源进线'],
  box:   ['接线盒底座', '绝缘板。', '接线盒'],
  housing:['盒盖', '']
};
const COLS = {U:0xe0a92e, V:0x3fa845, W:0xcf4436};
const TOP = [['W2', -20], ['U2', 0], ['V2', 20]], BOT = [['U1', -20], ['V1', 0], ['W1', 20]];
E3D.termBox = function(el, opt){ opt = opt||{}; return E3D.viewer(el, {
  parts:PARTS, center:[0, -4, 8], view:{th:0.0, ph:0.6, r:185},
  presets:{front:[1, 0, 0, Math.PI/2, 175], side:[0, 1, 0, -Math.PI/2, 175]},
  build:function(K){
  const T = K.T, H = K.H, M = K.M, root = K.root, shell = K.shell, tag = K.tag;
  tag(H.box(70, 56, 4, 0, 0, 2, H.M(0x3a2e26, {roughness:0.6}), root), 'box');
  [[70, 2, 18, 0, 29, 9], [70, 2, 18, 0, -29, 9], [2, 56, 18, -36, 0, 9], [2, 56, 18, 36, 0, 9]].forEach(function(b){ tag(H.box(b[0], b[1], b[2], b[3], b[4], b[5], H.M(0x4f6f8f, {transparent:true}), shell), 'housing'); });
  const pos = {};
  TOP.concat(BOT).forEach(function(t){ const y = t[0].slice(-1) === '2' ? 10 : -10, x = t[1]; pos[t[0]] = [x, y];
    tag(H.cylZ(2.4, 12, x, y, 10, M.brass, root), 'stud'); tag(H.cylZ(4, 2, x, y, 14.5, M.zinc, root), 'stud');
    H.plate(t[0], 9, 4, y > 0 ? x : x + 8.5, y + (y > 0 ? 8 : -4), 4.2, '#e6edf5', null, root);   /* 下排的字挪到柱子右边，别被进线压住 */
    const c = COLS[t[0][0]];
    H.wire([[x, y, 4.5], [x + (y > 0 ? 4 : -4), y*1.6, 4.5], [x*1.3, y*2.6, 4.5]], 1.1, H.M(c, {roughness:0.5}), root); });
  root.traverse(function(m){ if(m.isMesh && m.geometry.type === 'TubeGeometry') m.userData.part = m.userData.part || 'lead'; });
  /* 电源进线：L1 L2 L3 接下排（黄绿红） */
  [['U1', 0xe0a92e], ['V1', 0x3fa845], ['W1', 0xcf4436]].forEach(function(a){ const p = pos[a[0]];
    tag(H.wire([[p[0], p[1], 15.5], [p[0], p[1]-10, 18], [p[0], -40, 18]], 1.4, H.M(a[1], {roughness:0.5}), root), 'cable'); });
  /* 三片连接片 */
  const links = [0, 1, 2].map(function(){ const g = new T.Group(); root.add(g); tag(H.box(6, 24, 1.6, 0, 0, 0, M.cu, g), 'link'); return g; });
  function target(d){
    if(d) return [['U1', 'W2'], ['V1', 'U2'], ['W1', 'V2']].map(function(p){ const a = pos[p[0]], b = pos[p[1]]; return {x:(a[0]+b[0])/2, y:(a[1]+b[1])/2, rz:Math.atan2(b[0]-a[0], b[1]-a[1])*-1, len:Math.hypot(b[0]-a[0], b[1]-a[1])}; });
    /* 星形：两片横着连上排三颗，第三片放在旁边不用 */
    return [{x:-10, y:10, rz:Math.PI/2, len:20}, {x:10, y:10, rz:Math.PI/2, len:20}, {x:44, y:-4, rz:0, len:20, spare:true}];
  }
  const st = {d:null, t:1, from:null, to:null};
  return {
    labels:[['stud', -20, 10, 16], ['link', 0, 10, 18, null], ['lead', -26, 26, 5], ['cable', 0, -30, 18]],
    tick:function(dt, k){
      const s = opt.state ? opt.state() : {d:false};
      if(s.d !== st.d){ st.from = st.d === null ? null : target(st.d); st.to = target(s.d); st.d = s.d; st.t = st.from ? 0 : 1; }
      st.t = Math.min(1, st.t + dt/(1.1*k));
      const e = st.t, lift = Math.sin(Math.PI*e)*14;
      links.forEach(function(g, i){ const a = st.from ? st.from[i] : st.to[i], b = st.to[i];
        g.position.set(a.x + (b.x-a.x)*e, a.y + (b.y-a.y)*e, 15.6 + (st.from ? lift : 0));
        g.rotation.z = a.rz + (b.rz-a.rz)*e; g.scale.y = (a.len + (b.len-a.len)*e)/24 * 1.15; });
      return st.t < 1;
    }
  };
  }}, opt); };
})();

/* ══════════════ 钳形表（3.7）：一根两芯线（L 红、N 蓝）带一台 2200 W 负载，钳形表钳上去 ══════════════
   自带状态：jaw 'open'|'closed'|'gap'，which 'L'|'N'|'LN'。读数口径同 c3-7.js：10.0 A；没合严 9.2 A；L+N 一起 0.00。
   钳口里的蓝点＝磁通（净电流不为零才有）；导线上的橙点＝电流（L 往右去，N 往左回）。opt.onRead({lcd, msg}) */
(function(){
'use strict';
const PARTS = {
  jaw:   ['钳口（铁芯）', '合上以后是一圈闭合的铁芯 —— 被测导线就是只穿过一次的「一次绕组」。<b>合不严，磁路有缝，读数偏小</b>。', '钳口'],
  trig:  ['扳机', '按下去钳口张开，松手靠弹簧合上。<b>点它开/合钳口</b>。', '扳机'],
  body:  ['表身', '里面是二次绕组和测量电路。普通钳形表只能测<b>交流</b>（靠交变磁场感应）。', '表身'],
  lcd:   ['液晶屏', '', '液晶屏'],
  wl:    ['火线 L（红）', '电流从电源往负载走。', '火线 L'],
  wn:    ['零线 N（蓝）', '同样大的电流从负载走回电源，方向跟火线相反。', '零线 N'],
  flux:  ['磁通（示意）', '导线电流在钳口铁芯里产生的磁场。L、N 一起钳：两股磁场大小相等方向相反，抵消成零。', '磁通']
};
const POS = {L:7, N:-7, LN:0}, R = 11;
E3D.clamp = function(el, opt){ opt = opt||{}; return E3D.viewer(el, {
  parts:PARTS, center:[0, 0, 0], view:{th:1.05, ph:1.25, r:200},
  presets:{front:[0, 1, 0, -Math.PI/2, 180], side:[1, 0, 0, Math.PI/2, 200]},
  build:function(K){
  const T = K.T, H = K.H, M = K.M, root = K.root, tag = K.tag;
  /* 导线：沿 x，钳口那一段 L 在 y+7、N 在 y-7 */
  const red = H.M(0xd42f2f, {roughness:0.5}), blue = H.M(0x1c6dd0, {roughness:0.5});
  tag(H.wire([[-80, 3, 20], [-40, 3, 20], [-25, 7, 20], [25, 7, 20], [40, 3, 20], [80, 3, 20]], 2.2, red, root), 'wl');
  tag(H.wire([[-80, -3, 20], [-40, -3, 20], [-25, -7, 20], [25, -7, 20], [40, -3, 20], [80, -3, 20]], 2.2, blue, root), 'wn');
  const sheath = H.M(0x9aa0a6, {roughness:0.6});
  [[-80, -48], [48, 80]].forEach(function(a){ const g = new T.CylinderGeometry(6, 6, a[1]-a[0], 16); g.rotateZ(Math.PI/2); const m = new T.Mesh(g, sheath); m.position.set((a[0]+a[1])/2, 0, 20); root.add(m); });
  const lP = K.dots(10, K.curM, H.poly([[-80, 3, 22.5], [-40, 3, 22.5], [-25, 7, 22.5], [25, 7, 22.5], [40, 3, 22.5], [80, 3, 22.5]]));
  const nP = K.dots(10, K.curM, H.poly([[80, -3, 22.5], [40, -3, 22.5], [25, -7, 22.5], [-25, -7, 22.5], [-40, -3, 22.5], [-80, -3, 22.5]]));
  /* 钳形表：整体在 y 方向滑到目标导线下 */
  const meter = new T.Group(); root.add(meter);
  const bodyM = H.M(0xd8a31c, {roughness:0.55});
  tag(H.box(10, 26, 54, 0, 0, -22, bodyM, meter), 'body');
  tag(H.box(10.4, 20, 34, 0, 0, -30, H.M(0x2d3136, {roughness:0.5}), meter), 'body');
  const lc = document.createElement('canvas'); lc.width = 260; lc.height = 120; const lg = lc.getContext('2d');
  const ltex = new T.CanvasTexture(lc); ltex.colorSpace = T.SRGBColorSpace;
  const lg2 = new T.PlaneGeometry(16, 7.4); lg2.rotateX(Math.PI/2); lg2.rotateZ(Math.PI/2);   /* 朝 +x、字头朝上（+z） */
  const lcd = tag(new T.Mesh(lg2, new T.MeshBasicMaterial({map:ltex, toneMapped:false})), 'lcd');
  lcd.position.set(5.3, 0, -20); meter.add(lcd);
  /* 钳口：下半固定、上半绕铰链（在 y+R 那一侧）转开 */
  const jm = H.M(0x2b2f34, {roughness:0.45});
  const lower = new T.TorusGeometry(R, 2.6, 10, 24, Math.PI); lower.rotateX(Math.PI); lower.rotateY(Math.PI/2);
  meter.add(Object.assign(tag(new T.Mesh(lower, jm), 'jaw'), {}));
  meter.children[meter.children.length-1].position.z = 20;
  const hinge = new T.Group(); hinge.position.set(0, -R, 20); meter.add(hinge);
  const upper = new T.TorusGeometry(R, 2.6, 10, 24, Math.PI); upper.rotateY(Math.PI/2);
  const up = tag(new T.Mesh(upper, jm), 'jaw'); up.position.set(0, R, 0); hinge.add(up);
  tag(H.box(6, 6, 10, 0, -R-2, 6, H.M(0x1d1f22), meter), 'trig');
  /* 磁通点：沿钳口圆周 */
  const fl = K.dots(12, K.sigM, function(t, out){ const a = t*Math.PI*2; return (out||new T.Vector3()).set(0, Math.cos(a)*R, 20 + Math.sin(a)*R); }, meter);
  fl.a.forEach(function(m){ tag(m, 'flux'); });
  const st = {jaw:'closed', which:'L', y:POS.L, open:0, ph:0};
  function read(){
    if(st.jaw === 'open') return {lcd:'0.00', msg:'钳口张开着，磁路没闭合，测不出来。'};
    if(st.which === 'LN') return {lcd:'0.00', msg:'<b>两根一起钳，读 0</b>：火线去 10 A、零线回 10 A，方向相反，磁场抵消。要测哪一根就把它单独分出来钳。'};
    if(st.jaw === 'gap') return {lcd:'9.2', msg:'<b>钳口没合严</b>（缝隙、铁锈、油污）：磁路漏磁，读数偏小（真值 10.0 A）。'};
    return {lcd:'10.0', msg:'钳住了 '+(st.which === 'L' ? '火线' : '零线')+'：<b>10.0 A</b>（2200 W ÷ 220 V）。只钳一根，火线零线读数一样。'};
  }
  function lcdDraw(r){ lg.fillStyle = '#9fb59a'; lg.fillRect(0, 0, 260, 120); lg.fillStyle = '#1b2219';
    lg.textAlign = 'right'; lg.textBaseline = 'middle'; lg.font = '700 72px ui-monospace,monospace'; lg.fillText(r.lcd, 245, 66);
    lg.textAlign = 'left'; lg.font = '600 26px system-ui'; lg.fillText('A~', 10, 24); ltex.needsUpdate = true; }
  function update(){ const r = read(); lcdDraw(r); if(opt.onRead) opt.onRead(r, st); K.S.dirty = true; }
  update();
  return {
    labels:[['jaw', 0, 0, 34, meter], ['trig', 0, -14, 6, meter], ['body', 0, 0, -40, meter], ['wl', -60, 3, 23], ['wn', -60, -3, 23], ['lcd', 0, 0, -20, meter]],
    press:function(k){ if(k === 'trig' || k === 'jaw'){ st.jaw = st.jaw === 'open' ? 'closed' : 'open'; update(); return true; } return false; },
    api:{ st:st, set:function(o){ Object.assign(st, o); update(); } },
    tick:function(dt, k){
      st.y += (POS[st.which] - st.y) * Math.min(1, dt*6/k); meter.position.y = st.y;
      const ot = st.jaw === 'open' ? 1 : st.jaw === 'gap' ? 0.06 : 0;
      st.open += (ot - st.open) * Math.min(1, dt*8/k); hinge.rotation.x = st.open*0.9;
      K.flow(lP, true, 0.12/k, dt); K.flow(nP, true, 0.12/k, dt);
      const net = st.jaw !== 'open' && st.which !== 'LN' && Math.abs(st.y - POS[st.which]) < 0.5;
      K.flow(fl, net, 0.35/k, dt);
      return true;
    }
  };
  }}, opt); };
})();

/* ══════════════ 验电笔（3.5）：一只三孔插座 + 一支剖开的氖管验电笔 + 一只手 ══════════════
   回路：插座孔里的铜片 → 笔尖 → 限流电阻（按 1 MΩ）→ 氖管 → 弹簧 → 笔尾金属帽 → 手指 → 人体 → 大地。
   只有「火线孔 + 手指抵住笔尾 + 脚接地」才闭合 → 氖管亮。口径同 c3-5.js：220 V ÷ 1 MΩ = 0.22 mA。
   自带状态 {hole 'L'|'N'|'PE', grip 0 抵住笔尾 / 1 没抵住 / 2 站在绝缘垫上}；opt.onRead({lit, msg}) */
(function(){
'use strict';
const PARTS = {
  tip:    ['笔尖（金属）', '插进插座孔，碰到里面的铜片。', '笔尖'],
  res:    ['限流电阻（约 1 MΩ）', '<b>保命的就是它</b>：把流过人体的电流限制在 0.2 mA 左右，人感觉不到。没有它的话 220 V ÷ 人体 2 kΩ ＝ 110 mA，是致命的量。', '限流电阻'],
  neon:   ['氖管', '两个电极之间充着氖气，电压到 60 V 左右就起辉发红光 —— 所以低压验电笔量程是 60～500 V。', '氖管'],
  spring: ['弹簧', '把氖管压紧在电阻和笔尾之间。', '弹簧'],
  cap:    ['笔尾金属帽', '<b>手指必须抵住它</b>，电流才能从你身上走到大地，回路才闭合。', '笔尾'],
  body:   ['透明笔身（绝缘）', '', '笔身'],
  hand:   ['手 / 人体', '这时候你就是回路里的一段导线：电流从手指进、经身体、从脚流进大地。', '人体'],
  mat:    ['绝缘垫', '站在绝缘垫上，回路在脚下断了 —— 笔就不亮。<b>可那根线明明带电</b>：不亮≠没电。', '绝缘垫'],
  socket: ['三孔插座', '面对插座：<b>左零右火上接地</b>（左 N、右 L、上 PE）。', '插座'],
  hole:   ['插孔', '<b>点哪个孔，笔就插到哪个孔</b>。', '插孔']
};
const HOLES = {L:[14, -8], N:[-14, -8], PE:[0, 16]};
E3D.testPen = function(el, opt){ opt = opt||{}; return E3D.viewer(el, {
  parts:PARTS, center:[20, 0, 40], view:{th:0.55, ph:1.2, r:260},
  presets:{front:[1, 0, 0, Math.PI/2, 240], side:[0, 1, 0, -Math.PI/2, 260]},
  build:function(K){
  const T = K.T, H = K.H, M = K.M, root = K.root, shell = K.shell, tag = K.tag;
  /* 地面 + 插座 */
  tag(H.box(220, 120, 2, 40, 0, -31, H.M(0x5d6670, {roughness:0.9}), root), 'hand');
  tag(H.box(80, 80, 8, 0, 0, 4, H.M(0xf2f2ee, {roughness:0.4}), root), 'socket');
  const holeM = {};
  Object.keys(HOLES).forEach(function(k){ const p = HOLES[k];
    const sl = tag(H.box(k === 'PE' ? 3 : 9, k === 'PE' ? 9 : 3, 1, p[0], p[1], 8.2, M.blk, root), 'hole'); sl.userData.hole = k;
    if(k !== 'PE') sl.rotation.z = k === 'L' ? 0.5 : -0.5;
    tag(H.box(4, 4, 6, p[0], p[1], 4.5, M.brass, root), 'hole').userData.hole = k;
    H.plate(k, 7, 5, p[0], p[1] + (k === 'PE' ? 9 : -9), 8.3, '#3a3f45', null, root); });
  /* 笔（整体移动到所选孔） */
  const pen = new T.Group(); root.add(pen);
  const cylZ = function(r, z0, z1, mat, key, par){ const g = new T.CylinderGeometry(r, r, z1-z0, 20); g.rotateX(Math.PI/2); const m = tag(new T.Mesh(g, mat), key); m.position.z = (z0+z1)/2; (par||pen).add(m); return m; };
  cylZ(0.9, 4, 24, M.zinc, 'tip');
  const glassBody = H.M(0xcfe8f5, {roughness:0.05, transparent:true, opacity:0.25});
  const bodyM = new T.Mesh(new T.CylinderGeometry(4.5, 4.5, 70, 24, 1, true).rotateX(Math.PI/2), glassBody); bodyM.position.z = 56; tag(bodyM, 'body'); pen.add(bodyM);
  cylZ(2.2, 26, 42, H.M(0x8b5a2b, {roughness:0.5}), 'res');
  [29, 32, 35].forEach(function(z, i){ cylZ(2.35, z, z+1.2, H.M([0x8b4513, 0x111111, 0x2e7d32][i]), 'res'); });
  const neonM = H.M(0xd8c9c0, {roughness:0.1, transparent:true, opacity:0.6, emissive:0x000000});
  cylZ(2.6, 46, 66, neonM, 'neon'); cylZ(0.8, 47, 53, M.zinc, 'neon'); cylZ(0.8, 59, 65, M.zinc, 'neon');
  const spr = tag(H.spring(2, 6, 12, 0.35, M.spr), 'spring'); spr.position.z = 67; pen.add(spr);
  cylZ(4.6, 80, 92, M.zinc, 'cap'); tag(H.box(2, 4, 26, 5, 0, 74, M.zinc, pen), 'cap');
  const glow = new T.PointLight(0xff5a20, 0, 60); glow.position.z = 56; pen.add(glow);
  /* 手指 + 人体（简化成一根肤色的柱子从手指一直到地面） + 绝缘垫 */
  const skin = H.M(0xe0b18e, {roughness:0.7});
  const hand = new T.Group(); root.add(hand);
  const fg = new T.CapsuleGeometry(3.2, 22, 6, 12); fg.rotateZ(Math.PI/2);
  const finger = tag(new T.Mesh(fg, skin), 'hand'); hand.add(finger);
  const arm = tag(new T.Mesh(new T.CylinderGeometry(6, 7, 1, 16).rotateX(Math.PI/2), H.M(0xe0b18e, {roughness:0.7, transparent:true, opacity:0.55})), 'hand'); root.add(arm);
  const mat = tag(H.box(44, 40, 3, 56, 0, -28.5, H.M(0x2f6b3a, {roughness:0.8}), root), 'mat');
  const gnd = H.plate('大地', 14, 5, 56, 26, -29.8, '#e6edf5', null, root);
  /* 电流点：插孔铜片 → 笔 → 手 → 人体 → 地 */
  const pathFn = { pts:null };
  const cur = K.dots(14, K.curM, function(t, out){ return pathFn.f ? pathFn.f(t, out) : (out||new T.Vector3()); });
  const st = {hole:'L', grip:0, x:HOLES.L[0], y:HOLES.L[1], g:0};
  function read(){
    const lit = st.hole === 'L' && st.grip === 0;
    let msg;
    if(st.hole === 'L') msg = st.grip === 0 ? '<b>亮了</b>：火线 → 笔尖 → 电阻 → 氖管 → 笔尾 → 手 → 身体 → 大地，回路闭合。流过你的电流约 <b>0.22 mA</b>（220 V ÷ 1 MΩ），感觉不到。'
      : st.grip === 1 ? '<b>不亮</b>：手指没抵住笔尾金属帽，回路在手这里断了。<b>但这孔是火线</b> —— 不亮≠没电。'
      : '<b>不亮</b>：站在绝缘垫上，回路在脚下断了。<b>可这孔是火线！</b>判断停电绝不能只凭验电笔不亮。';
    else msg = '<b>不亮</b>：'+(st.hole === 'N' ? '零线' : '地线')+'对地基本没有电压（正常情况下），氖管起不了辉。'+(st.hole === 'N' ? '要是零线也亮，多半是零线断了 —— 那是故障。' : '');
    return {lit:lit, msg:msg};
  }
  function update(){ if(opt.onRead) opt.onRead(read(), st); K.S.dirty = true; }
  update();
  return {
    labels:[['tip', 14, -8, 16, pen], ['res', 14, -8, 34, pen], ['neon', 14, -8, 56, pen], ['spring', 14, -8, 73, pen], ['cap', 14, -8, 88, pen], ['hand', 50, 0, 60], ['mat', 56, -14, -27], ['socket', -30, 30, 9]],
    hitMesh:function(m){ if(m.userData.hole){ st.hole = m.userData.hole; update(); return true; } return false; },
    api:{ st:st, set:function(o){ Object.assign(st, o); update(); } },
    tick:function(dt, k){
      const h = HOLES[st.hole];
      st.x += (h[0] - st.x) * Math.min(1, dt*6/k); st.y += (h[1] - st.y) * Math.min(1, dt*6/k);
      pen.position.set(st.x, st.y, 0);
      /* 手：抵住笔尾（0、2）或者握在笔身中段（1） */
      const tz = st.grip === 1 ? 60 : 94, tx = st.grip === 1 ? 17 : 16;
      st.g += (tz - st.g) * Math.min(1, dt*6/k);
      finger.position.set(st.x + tx, st.y, st.g); 
      const ax = st.x + 8, top = st.g;                                     /* 人体柱放在笔右边 42 处，别出画面 */
      /* 人体柱：从手的高度一直到地面（单位高度的圆柱，按高度缩放） */
      arm.scale.set(1, 1, top + 30); arm.position.set(ax + 34, 0, (top - 30)/2);
      mat.visible = st.grip === 2;
      const lit = st.hole === 'L' && st.grip === 0 && Math.abs(st.x - h[0]) < 0.5;
      neonM.emissive.setHex(0xff4a14); neonM.emissiveIntensity = lit ? 2.2 : 0; glow.intensity = lit ? 900 : 0;
      const P = [[st.x, st.y, 4], [st.x, st.y, 24], [st.x, st.y, 42], [st.x, st.y, 66], [st.x, st.y, 92], [st.x + 16, st.y, 94], [ax + 34, 0, top], [ax + 34, 0, -30]];
      pathFn.f = H.poly(P);
      K.flow(cur, lit, 0.12/k, dt);
      return true;
    }
  };
  }}, opt); };
})();

/* ══════════════ 兆欧表（摇表）测电动机绕组对外壳的绝缘（3.8）══════════════
   L 夹绕组端子 U1、E 夹机壳。摇把转速：0 / 60 / 120 r/min（额定 120，摇满 1 分钟读）。
   电机：good 好的（几百 MΩ，指针到 ∞ 附近）/ damp 受潮（0.3 MΩ，在 0.5 线左边）/ short 绕组碰壳（0）。
   表盘左 0 右 ∞（同 c3-8.js，各厂家画法有出入）；指针位置 = R/(R+1)（示意刻度）。慢摇时测试电压不够、指针晃 —— 不能读。 */
(function(){
'use strict';
const PARTS = {
  meter: ['兆欧表（摇表）', '里面是一台手摇发电机，摇起来发出 500 V 直流去测绝缘 —— 万用表那几伏的电池测不出高压下会不会漏电。', '兆欧表'],
  crank: ['摇把', '<b>额定 120 转/分</b>，摇满 1 分钟再读。慢了发出的电压不够，读数不准。', '摇把'],
  dial:  ['表盘', '左 0 右 ∞（各厂家画法有出入）。<b>低压设备判据：≥ 0.5 MΩ</b>（红线）。', '表盘'],
  tL:    ['L 端（线路）', '接被测的导体 —— 这里夹电动机绕组的 U1 端子。', 'L 端'],
  tE:    ['E 端（接地）', '接设备外壳 / 地。', 'E 端'],
  motor: ['被测电动机', '测的是绕组和外壳之间的绝缘。<b>测之前必须断电</b>，测完要放电（第 4 屏）。', '电动机'],
  leak:  ['泄漏电流（示意）', '500 V 加在绝缘两边，好的绝缘只漏过去微安级的电流；受潮、破损的漏得多 —— 表就是按这个算电阻的。', '泄漏电流']
};
const RVAL = {good:500, damp:0.3, short:0};
E3D.megger = function(el, opt){ opt = opt||{}; return E3D.viewer(el, {
  parts:PARTS, center:[-2, -6, 24], view:{th:0.15, ph:0.85, r:370},
  presets:{front:[1, 0, 0, Math.PI/2, 340], side:[0, 1, 0, -Math.PI/2, 340]},
  build:function(K){
  const T = K.T, H = K.H, M = K.M, root = K.root, tag = K.tag;
  /* 摇表：棕黑色机箱 + 表盘 + 指针 + 摇把 + 三个端子 */
  const MX = -55;
  tag(H.box(70, 90, 40, MX, 0, 20, H.M(0x3b2a22, {roughness:0.6}), root), 'meter');
  const dc = document.createElement('canvas'); dc.width = 512; dc.height = 300; const dg = dc.getContext('2d');
  (function(){ dg.fillStyle = '#f3efe3'; dg.fillRect(0, 0, 512, 300); dg.strokeStyle = '#222'; dg.lineWidth = 4;
    dg.beginPath(); dg.arc(256, 280, 210, Math.PI*1.15, Math.PI*1.85); dg.stroke();
    dg.font = '600 34px system-ui'; dg.fillStyle = '#222'; dg.textAlign = 'center';
    [[0, '0'], [0.5, '0.5'], [1, '1'], [5, '5'], [100, '100'], [1e9, '∞']].forEach(function(a){ const p = a[0]/(a[0]+1), ang = Math.PI*1.15 + p*Math.PI*0.7;
      dg.fillText(a[1], 256 + Math.cos(ang)*250, 280 + Math.sin(ang)*250 + 12); dg.beginPath(); dg.moveTo(256 + Math.cos(ang)*200, 280 + Math.sin(ang)*200); dg.lineTo(256 + Math.cos(ang)*222, 280 + Math.sin(ang)*222); dg.stroke(); });
    const p5 = 0.5/1.5, a5 = Math.PI*1.15 + p5*Math.PI*0.7; dg.strokeStyle = '#c62828'; dg.lineWidth = 7;
    dg.beginPath(); dg.moveTo(256 + Math.cos(a5)*150, 280 + Math.sin(a5)*150); dg.lineTo(256 + Math.cos(a5)*225, 280 + Math.sin(a5)*225); dg.stroke();
    dg.fillStyle = '#333'; dg.font = '600 30px system-ui'; dg.fillText('MΩ', 256, 200); dg.font = '500 24px system-ui'; dg.fillText('500 V', 256, 236); })();
  const dtex = new T.CanvasTexture(dc); dtex.colorSpace = T.SRGBColorSpace;
  const dialMesh = tag(new T.Mesh(new T.PlaneGeometry(56, 33), new T.MeshBasicMaterial({map:dtex, toneMapped:false})), 'dial');
  dialMesh.position.set(MX, 18, 40.2); root.add(dialMesh);
  const needle = new T.Group(); needle.position.set(MX, 18 - 33/2 + 33*(20/300), 40.6); root.add(needle);
  tag(H.box(0.8, 24, 0.4, 0, 12, 0, M.blk, needle), 'dial');
  /* 摇把：在机箱右侧，绕 x 轴转 */
  const crank = new T.Group(); crank.position.set(MX + 36, -20, 20); root.add(crank);
  tag(H.cylZ(4, 3, 0, 0, 0, M.zinc, crank), 'crank'); crank.children[0].rotation.y = Math.PI/2;
  tag(H.box(3, 20, 3, 4, 10, 0, M.zinc, crank), 'crank'); tag(H.box(10, 4, 4, 9, 20, 0, M.blk, crank), 'crank');
  /* 端子 L E G */
  [['L', MX - 18, 0xc0392b], ['E', MX, 0x24272b], ['G', MX + 18, 0x24272b]].forEach(function(a){
    tag(H.cylZ(3.2, 5, a[1], -34, 42, H.M(a[2], {roughness:0.4}), root), a[0] === 'L' ? 'tL' : a[0] === 'E' ? 'tE' : 'meter');
    H.plate(a[0], 5, 5, a[1], -26, 40.3, '#f3efe3', null, root); });
  /* 电动机：机座 + 地脚 + 接线盒 + U1 端子 */
  const mo = H.M(0x4f6f8f, {roughness:0.55, metalness:0.3});
  const mg = new T.CylinderGeometry(22, 22, 50, 28); mg.rotateZ(Math.PI/2);
  const mbody = tag(new T.Mesh(mg, mo), 'motor'); mbody.position.set(50, 0, 26); root.add(mbody);
  tag(H.box(44, 50, 4, 50, 0, 2, mo, root), 'motor');
  tag(H.box(18, 18, 10, 50, 0, 52, mo, root), 'motor');
  tag(H.cylZ(2, 6, 50, 0, 59, M.brass, root), 'motor'); H.plate('U1', 7, 4, 50, 6, 57.2, '#e6edf5', null, root);
  tag(H.cylZ(2.6, 3, 70, 22, 5.5, M.zinc, root), 'motor');                                    /* 地脚螺钉（E 夹这里） */
  /* 两根测试线：L（红）→ U1；E（黑）→ 地脚 */
  H.wire([[MX - 18, -34, 45], [MX - 18, -56, 48], [0, -56, 60], [40, -24, 70], [50, 0, 66], [50, 0, 62]], 1.0, H.M(0xc0392b, {roughness:0.5}), root);   /* 往前绕，别横穿表盘 */
  H.wire([[MX, -34, 45], [MX, -46, 30], [20, -40, 10], [70, 22, 12], [70, 22, 8]], 1.0, M.blk, root);
  const leakP = K.dots(10, K.curM, H.poly([[MX - 18, -34, 45], [MX - 18, -56, 48], [0, -56, 60], [40, -24, 70], [50, 0, 66], [50, 0, 50], [50, 10, 30], [70, 22, 8], [70, 22, 12], [20, -40, 10], [MX, -46, 30], [MX, -34, 45]]));
  leakP.a.forEach(function(m){ tag(m, 'leak'); });
  const st = {rpm:0, motor:'good', ang:0, needle:0, t:0};
  function reading(){ const R = RVAL[st.motor];
    if(st.rpm === 0) return {msg:'没摇。指针停在哪都不算数。点「额定 120 转」摇起来。', R:null};
    if(st.rpm < 100) return {msg:'<b>摇得太慢</b>（60 转）：发出的电压不够 500 V，指针晃、读数偏 —— 不能读。要匀速摇到 <b>120 转/分</b>。', R:null};
    if(R >= 100) return {msg:'指针稳在 ∞ 附近：几百 MΩ，<b>远大于 0.5 MΩ，绝缘良好</b>。', R:R};
    if(R > 0) return {msg:'<b>'+R+' MΩ，在 0.5 MΩ 红线左边 —— 不合格</b>。多半是受潮：烘干后再测；还不行就要修。', R:R};
    return {msg:'<b>指针打到 0：绕组碰壳</b>（绝缘击穿）。这台电机通电外壳就带电，绝对不能用。', R:R}; }
  function update(){ if(opt.onRead) opt.onRead(reading(), st); K.S.dirty = true; }
  update();
  return {
    labels:[['meter', MX - 30, 30, 30], ['dial', MX, 24, 41], ['crank', MX + 45, -10, 20, crank], ['tL', MX - 18, -34, 45], ['tE', MX, -34, 45], ['motor', 50, -22, 30], ['leak', 50, 0, 45]],
    press:function(k){ if(k === 'crank'){ st.rpm = st.rpm ? 0 : 120; update(); return true; } return false; },
    api:{ st:st, set:function(o){ Object.assign(st, o); update(); } },
    tick:function(dt, k){
      st.t += dt;
      st.ang += st.rpm/60*2*Math.PI*dt/k*0.5; crank.rotation.x = st.ang;          /* 摇把画面按一半速度转 */
      const R = RVAL[st.motor];
      let target = st.rpm === 0 ? st.needle : (R >= 1e3 ? 1 : R/(R+1));
      if(st.rpm > 0 && st.rpm < 100) target = target*0.7 + 0.12*Math.sin(st.t*5) + 0.08;   /* 慢摇：晃、偏 */
      st.needle += (target - st.needle) * Math.min(1, dt*3/k);
      needle.rotation.z = (0.35 - 0.7*st.needle)*Math.PI;                          /* 左 0 右 ∞：0 → 偏左 63°，1 → 偏右 63° */
      K.flow(leakP, st.rpm >= 100 && R < 100, 0.15/k, dt);
      return true;
    }
  };
  }}, opt); };
})();

/* ══════════════ 控制回路排故台（9.4）：L → FU2 → SB2 → SB1(并 KM 13-14) → KM 线圈 → FR 95-96 → N ══════════════
   竖着排（像原理图）：节点 L、1、2、3、4、N。随机藏一个断点，症状都是「按起动没反应」。
   用万用表交流电压档量：线圈没得电时，跟 L 连着的点都是 220 V、跟 N 连着的点都是 0 —— 跨在断开的那个元件两头读 220。
   opt.onRead(r, st)。故障：fu 熔断器熔断 / sb2 停止按钮常闭接触不良 / sb1 起动按钮按不通 / coil 线圈断线 / fr 热继电器跳了 */
(function(){
'use strict';
const PARTS = {
  fu:   ['控制回路熔断器 FU2', '护着控制回路。熔断了整条控制回路就没电。', 'FU2'],
  sb2:  ['停止按钮 SB2（常闭）', '平时通，按下断。触点氧化、接触不良也会让回路断。', 'SB2 停止'],
  sb1:  ['起动按钮 SB1（常开）', '<b>点它＝按住 / 松开</b>。排故时要一直按着它量（或者用手按住接触器试）。', 'SB1 起动'],
  hold: ['自锁触点 KM 13-14', '并在 SB1 两头，吸合以后接替 SB1。', '自锁 13-14'],
  km:   ['接触器线圈 KM（A1-A2）', '回路通了它就吸合（蓝色触点架往下动）。线圈断线就吸不了。', 'KM 线圈'],
  fr:   ['热继电器常闭 FR 95-96', '过载跳了它就断开，要按复位。', 'FR 95-96'],
  tp:   ['测点（端子）', '<b>点它放表笔</b>，先红后黑。旁边的数字是线号：同一个号的端子是同一根线连着的。', '测点'],
  pwr:  ['控制电源 L / N（220 V）', '', '电源'],
  housing:['', '']
};
const YS = {L:84, '1':54, '2':24, '3':-6, '4':-38, N:-70};      /* 各节点的 y */
const EL = [['fu', 'L', '1', 69], ['sb2', '1', '2', 39], ['sb1', '2', '3', 9], ['km', '3', '4', -22], ['fr', '4', 'N', -54]];
const MX = -78;
E3D.faultLab = function(el, opt){ opt = opt||{}; return E3D.viewer(el, {
  parts:PARTS, center:[-30, 6, 10], view:{th:0, ph:0.42, r:330},
  presets:{front:[1, 0, 0, Math.PI/2, 320], side:[0, 1, 0, -Math.PI/2, 300]},
  build:function(K){
  const T = K.T, H = K.H, M = K.M, root = K.root, tag = K.tag;
  tag(H.box(110, 190, 3, 6, 7, -1.5, H.M(0x5a6068, {roughness:0.85}), root), 'housing');
  const TP = {};                                                  /* 测点 → 坐标 */
  function screw(name, x, y){ const m = tag(H.cylZ(2.6, 3, x, y, 14, M.zinc, root), 'tp'); m.userData.tp = name; TP[name+'@'+x+','+y] = [x, y, 16]; return m; }
  const shapes = {
    fu:  function(y){ tag(H.box(16, 22, 12, 0, y, 6, H.M(0xf1efe8, {roughness:0.4}), root), 'fu'); tag(H.box(10, 12, 3, 0, y, 13, H.M(0xc9b27a), root), 'fu'); },
    sb2: function(y){ tag(H.box(18, 18, 10, 0, y, 5, H.M(0xd9dde1), root), 'sb2'); tag(H.cylZ(6, 5, 0, y, 12.5, H.M(0xc23b32, {roughness:0.4}), root), 'sb2'); },
    sb1: function(y){ tag(H.box(18, 18, 10, 0, y, 5, H.M(0xd9dde1), root), 'sb1'); },
    km:  function(y){ tag(H.box(30, 24, 14, 0, y, 7, H.M(0xb9bec4, {roughness:0.5}), root), 'km'); },
    fr:  function(y){ tag(H.box(26, 20, 12, 0, y, 6, H.M(0x2b2f34, {roughness:0.5}), root), 'fr'); tag(H.cylZ(3, 3, 8, y+4, 13.5, M.carrier, root), 'fr'); }
  };
  EL.forEach(function(e){ shapes[e[0]](e[3]); H.plate(PARTS[e[0]][2], 18, 4.4, 30, e[3], 0.4, '#e6edf5', null, root); });
  const sb1cap = new T.Group(); sb1cap.position.set(0, 9, 10); root.add(sb1cap); tag(H.cylZ(6, 5, 0, 0, 2.5, H.M(0x2e9e4f, {roughness:0.4}), sb1cap), 'sb1');
  const kmCar = new T.Group(); kmCar.position.set(0, -22, 14); root.add(kmCar); tag(H.box(10, 8, 4, 0, 0, 2, M.carrier, kmCar), 'km');
  /* 自锁触点 13-14：在 SB1 右边，跨节点 2、3 */
  tag(H.box(12, 16, 10, 22, 9, 5, H.M(0xb9bec4), root), 'hold'); H.plate('13-14', 12, 3.6, 22, 9, 10.2, '#2b2f34', null, root);
  /* 端子：每个元件上下各一颗；电源 L、N 各一颗；13-14 两颗 */
  const nodeXY = {L:[[0, 84]], N:[[0, -70]], '1':[], '2':[], '3':[], '4':[]};
  EL.forEach(function(e){ nodeXY[e[1]].push([0, e[3]+12]); nodeXY[e[2]].push([0, e[3]-12]); });
  nodeXY['2'].push([22, 20]); nodeXY['3'].push([22, -2]);
  Object.keys(nodeXY).forEach(function(n){ nodeXY[n].forEach(function(p){ screw(n, p[0], p[1]); H.plate(n, 5, 4, p[0]-7, p[1], 16.2, '#ffd27a', null, root); }); });
  tag(H.box(14, 10, 8, 0, 92, 4, M.blk, root), 'pwr'); tag(H.box(14, 10, 8, 0, -78, 4, M.blk, root), 'pwr');
  /* 导线（黑）：同一个节点的端子之间 */
  Object.keys(nodeXY).forEach(function(n){ const ps = nodeXY[n]; for(let i=1;i<ps.length;i++) H.wire([[ps[i-1][0], ps[i-1][1], 16], [ps[i-1][0]+(ps[i][0]?11:0), (ps[i-1][1]+ps[i][1])/2, 18], [ps[i][0], ps[i][1], 16]], 0.7, M.blk, root); });
  /* 表（交流电压档） */
  tag(H.box(44, 92, 9, MX, 10, 4.5, H.M(0xe8b923, {roughness:0.6}), root), 'housing');
  tag(H.box(38, 84, 2, MX, 10, 10, H.M(0x2d3136), root), 'housing');
  const lc = document.createElement('canvas'); lc.width = 320; lc.height = 140; const lg = lc.getContext('2d');
  const ltex = new T.CanvasTexture(lc); ltex.colorSpace = T.SRGBColorSpace;
  const lcd = new T.Mesh(new T.PlaneGeometry(32, 14), new T.MeshBasicMaterial({map:ltex, toneMapped:false})); lcd.position.set(MX, 40, 11.2); root.add(lcd);
  H.plate('V~ 750', 18, 4, MX, 22, 11.2, '#e6edf5', null, root);
  const JC = [MX+6, -26], JV = [MX+16, -26];
  tag(H.cylZ(3, 1, JC[0], JC[1], 11.2, H.M(0x111214), root), 'housing'); tag(H.cylZ(3, 1, JV[0], JV[1], 11.2, H.M(0xb02a2a), root), 'housing');
  function probe(col, key){ const g = new T.Group(); root.add(g); const pm = H.M(col, {roughness:0.5});
    const b = new T.CylinderGeometry(1.6, 1.6, 22, 12); b.rotateX(Math.PI/2); const body = new T.Mesh(b, pm); body.position.z = 14; g.add(body);
    const tip = new T.Mesh(new T.CylinderGeometry(0.45, 0.45, 5, 8).rotateX(Math.PI/2), M.zinc); tip.position.z = 1; g.add(tip); return {g:g, m:pm, lead:null}; }
  const pr = {red:probe(0xc0392b), black:probe(0x24272b)};
  const st = {fault:'ok', pressed:false, energized:false, red:null, black:null, redXY:null, blackXY:null, next:'red'};
  function placeProbe(k){ const p = pr[k], xy = st[k+'XY'];
    if(xy){ p.g.position.set(xy[0] + (k === 'red' ? -1 : 1), xy[1], 16); p.g.rotation.set(0, k === 'red' ? -0.3 : 0.3, 0); }
    else { p.g.position.set(MX + (k === 'red' ? 30 : 20), -52, 2); p.g.rotation.set(Math.PI/2.2, 0, 0); }
    const from = k === 'black' ? JC : JV, to = p.g.position;
    if(p.lead){ root.remove(p.lead); p.lead.geometry.dispose(); }
    const a = new T.Vector3(from[0], from[1], 12), b = new T.Vector3(to.x, to.y, to.z + 24), mid = a.clone().lerp(b, 0.5); mid.z = Math.max(a.z, b.z) + 8;
    p.lead = new T.Mesh(new T.TubeGeometry(new T.QuadraticBezierCurve3(a, mid, b), 24, 0.8, 6, false), p.m); root.add(p.lead); }
  /* 电：哪些元件是通的 */
  function closed(e){ const f = st.fault;
    if(e === 'fu') return f !== 'fu'; if(e === 'sb2') return f !== 'sb2'; if(e === 'fr') return f !== 'fr'; if(e === 'km') return f !== 'coil';
    if(e === 'sb1') return (st.pressed && f !== 'sb1') || st.energized; return true; }
  function solve(){
    /* 先看能不能吸合（自锁要先吸合才算，所以先不算 13-14） */
    const save = st.energized; st.energized = false;
    const can = EL.every(function(e){ return closed(e[0]); });
    st.energized = can || (save && EL.every(function(e){ return e[0] === 'sb1' || closed(e[0]); }));
    /* 节点电位：没吸合时，跟 L 连着的 220、跟 N 连着的 0（线圈没电流、两头同电位，当导线算）；吸合时线圈两头差 220 */
    const order = ['L', '1', '2', '3', '4', 'N'], V = {};
    if(st.energized){ order.forEach(function(n, i){ V[n] = i <= 3 ? 220 : 0; }); return V; }
    let i = 0; V.L = 220; for(i=0;i<EL.length;i++){ if(!closed(EL[i][0])) break; V[EL[i][2]] = 220; }
    let j; V.N = 0; for(j=EL.length-1;j>=0;j--){ if(!closed(EL[j][0])) break; V[EL[j][1]] = 0; }
    order.forEach(function(n){ if(V[n] === undefined) V[n] = 0; });
    return V;
  }
  function drawLcd(t){ lg.fillStyle = '#9fb59a'; lg.fillRect(0, 0, 320, 140); lg.fillStyle = '#1b2219';
    lg.textAlign = 'right'; lg.textBaseline = 'middle'; lg.font = '700 84px ui-monospace,monospace'; lg.fillText(t, 300, 78);
    lg.textAlign = 'left'; lg.font = '600 30px system-ui'; lg.fillText('V~', 12, 28); ltex.needsUpdate = true; }
  function update(){
    const V = solve();
    const r = {V:V, v:(st.red && st.black) ? Math.abs(V[st.red] - V[st.black]) : null, energized:st.energized};
    drawLcd(r.v === null ? '0' : String(Math.round(r.v)));
    placeProbe('red'); placeProbe('black');
    if(opt.onRead) opt.onRead(r, st);
    K.S.dirty = true;
  }
  update();
  const api = {
    st:st, update:update,
    press:function(b){ st.pressed = b; update(); },
    fault:function(f){ st.fault = f; st.energized = false; st.pressed = false; st.red = st.black = st.redXY = st.blackXY = null; st.next = 'red'; update(); },
    clear:function(){ st.red = st.black = st.redXY = st.blackXY = null; st.next = 'red'; update(); },
    stop:function(){ st.energized = false; st.pressed = false; update(); }
  };
  return {
    labels:[['fu', 0, 69, 14], ['sb2', 0, 39, 15], ['sb1', 0, 9, 15, null], ['hold', 22, 9, 12], ['km', 0, -22, 16], ['fr', 0, -54, 14], ['pwr', 0, 92, 9]],
    hitMesh:function(m){ if(m.userData.tp){ const k = st.next; st[k] = m.userData.tp; st[k+'XY'] = [m.position.x, m.position.y]; st.next = k === 'red' ? 'black' : 'red'; update(); return true; } return false; },
    press:function(k){ if(k === 'sb1'){ api.press(!st.pressed); return true; } if(k === 'sb2'){ api.stop(); return true; } return false; },
    api:api,
    tick:function(dt, k){
      sb1cap.position.z = st.pressed ? 7 : 10;
      kmCar.position.z += ((st.energized ? 11 : 14) - kmCar.position.z) * Math.min(1, dt*12/k);
      return Math.abs(kmCar.position.z - (st.energized ? 11 : 14)) > 0.01;
    }
  };
  }}, opt); };
})();

/* ══════════════ 正反转（11.6）：两台接触器 KM1 正转、KM2 反转 + 电动机 ══════════════
   主电路：L1 L2 L3 同时接到两台的上端；KM1 下端 2/4/6 直接 → U V W；KM2 下端把 L1、L3 对调（2→W、6→U）。
   自带状态：km1、km2、lock（互锁开着？）。没互锁时两台一起合上＝L1、L3 经两台接触器直接短路 → 电弧 + QF 跳闸。
   opt.onState({km1, km2, lock, msg}) */
(function(){
'use strict';
const OX = 46;
E3D.fwdRev = function(el, opt){ opt = opt||{}; return E3D.viewer(el, {
  parts:Object.assign({}, E3D._PARTS_KM, {
    km1:['KM1 正转接触器', '下端出线直接接电动机 U V W —— 相序 L1 L2 L3。', 'KM1 正转'],
    km2:['KM2 反转接触器', '下端出线<b>把 L1、L3 对调</b>后再接电动机 —— 相序反了，电动机就反转。', 'KM2 反转'],
    motor:['电动机', '看轴头那块红白圆盘的转向。', '电动机'],
    swap:['对调的两根线', 'KM2 出来的第一相和第三相交叉 —— 就这一个交叉让电动机反转。', '两相对调']
  }),
  center:[0, -36, 40], view:{th:0, ph:0.62, r:460},
  presets:{front:[1, 0, 0, Math.PI/2, 440], side:[0, 1, 0, -Math.PI/2, 420]},
  build:function(K){
  const T = K.T, H = K.H, M = K.M, root = K.root, tag = K.tag;
  function sub(x){ const g = new T.Group(); g.position.x = x; root.add(g); const sh = new T.Group(); sh.position.x = x; K.shell.add(sh);
    return E3D._kmBuild(Object.assign({}, K, {root:g, shell:sh}), {}, E3D._CT_KM); }
  const A = sub(-OX), B = sub(OX);
  H.plate('KM1 正转', 26, 6, -OX, 56, 0.4, '#e6edf5', null, root); H.plate('KM2 反转', 26, 6, OX, 56, 0.4, '#e6edf5', null, root);
  /* 主电路导线 */
  const PHM = [0xe0a92e, 0x3fa845, 0xcf4436].map(function(c){ return H.M(c, {roughness:0.5}); });
  const PX = [-27, -13, 1];
  PX.forEach(function(px, i){
    const zb = 88 + i*3, yb = 70 + i*5;                                         /* 上方三根母线 */
    H.wire([[-OX-40, yb, zb], [OX+40, yb, zb]], 1.2, PHM[i], root);
    [-OX, OX].forEach(function(ox){ H.wire([[ox+px, yb, zb], [ox+px, 47, zb], [ox+px, 33, 79]], 1.1, PHM[i], root); });
  });
  /* 电动机：在下面；接线盒三个端子 U V W */
  const MY = -120;
  const mo = H.M(0x4f6f8f, {roughness:0.55, metalness:0.3});
  const mg = new T.CylinderGeometry(26, 26, 60, 28); mg.rotateZ(Math.PI/2);
  const mb = tag(new T.Mesh(mg, mo), 'motor'); mb.position.set(0, MY, 28); root.add(mb);
  tag(H.box(50, 40, 4, 0, MY, 2, mo, root), 'motor'); tag(H.box(20, 20, 10, 0, MY, 58, mo, root), 'motor');
  const shaft = new T.Group(); shaft.position.set(42, MY, 28); root.add(shaft);
  const sg = new T.CylinderGeometry(3, 3, 20, 12); sg.rotateZ(Math.PI/2); shaft.add(tag(new T.Mesh(sg, M.steel), 'motor'));
  const dg = new T.CylinderGeometry(12, 12, 2, 24); dg.rotateZ(Math.PI/2);
  const disc = tag(new T.Mesh(dg, M.white), 'motor'); disc.position.x = 10; shaft.add(disc);
  const half = tag(H.box(2.4, 12, 24, 10, 6, 0, H.M(0xc0392b), shaft), 'motor');
  const UVW = [[-7, 'U'], [0, 'V'], [7, 'W']];
  UVW.forEach(function(u){ tag(H.cylZ(1.8, 4, u[0], MY, 64, M.brass, root), 'motor'); H.plate(u[1], 4, 4, u[0], MY+6, 63.2, '#e6edf5', null, root); });
  /* KM1 出线：2→U 4→V 6→W；KM2 出线：2→W 4→V 6→U（交叉） */
  const outA = [[0, 0], [1, 1], [2, 2]], outB = [[0, 2], [1, 1], [2, 0]];
  function outWire(ox, map, key){ map.forEach(function(p){ const px = PX[p[0]], ux = UVW[p[1]][0], zz = 80 - p[0]*3;
    const w = H.wire([[ox+px, -33, 79], [ox+px, -50, zz], [ox+px*0.5 + (ux - (ox+px*0.5))*0.6, -75 - p[0]*4, zz], [ux, MY+2, 70], [ux, MY, 66]], 1.1, PHM[p[0]], root);
    if(key) tag(w, key); }); }
  outWire(-OX, outA, null); outWire(OX, outB, 'swap');
  const flM = new T.MeshBasicMaterial({color:0xcfe4ff, toneMapped:false, transparent:true, opacity:0, blending:T.AdditiveBlending, depthWrite:false});
  const arcs = [-OX, OX].map(function(ox){ const m = new T.Mesh(new T.SphereGeometry(10, 14, 12), flM); m.position.set(ox-13, 0, 66); root.add(m); return m; });
  const st = {km1:false, km2:false, lock:true, arc:0, rot:0, msg:''};
  function emit(){ if(opt.onState) opt.onState({km1:st.km1, km2:st.km2, lock:st.lock, msg:st.msg}); K.S.dirty = true; }
  function short(){ st.km1 = st.km2 = false; st.arc = 1; st.msg = '<b style="color:var(--err)">两台同时吸合 —— L1、L3 经两台接触器直接短路！</b>电弧烧触点，总开关跳闸。这就是为什么必须有互锁。'; }
  const api = {
    st:st,
    fwd:function(){ if(st.km2){ if(st.lock){ st.msg = '<b>按了没反应</b>：KM2 正吸合着，它的常闭 21-22 串在 KM1 线圈那一路、断开着（电气互锁）。先按停止。'; emit(); return; } st.km1 = true; short(); emit(); return; }
      st.km1 = true; st.msg = 'KM1 吸合：相序 L1 L2 L3 → <b>正转</b>。'; emit(); },
    rev:function(){ if(st.km1){ if(st.lock){ st.msg = '<b>按了没反应</b>：KM1 正吸合着，它的常闭 21-22 串在 KM2 线圈那一路、断开着（电气互锁）。先按停止。'; emit(); return; } st.km2 = true; short(); emit(); return; }
      st.km2 = true; st.msg = 'KM2 吸合：L1、L3 对调了 → <b>反转</b>。'; emit(); },
    stop:function(){ st.km1 = st.km2 = false; st.msg = '停了。'; emit(); },
    lock:function(b){ st.lock = b; st.msg = b ? '互锁装上了。' : '<b>互锁拆掉了</b>（危险演示）：现在正转时再按反转试试。'; emit(); }
  };
  emit();
  const lab = function(l, ox){ return [l[0], l[1]+ox, l[2], l[3], l[4]]; };
  return {
    labels:[lab(['carrier', 0, 7, 88, A.mov], -OX), ['motor', 0, MY-28, 40], ['swap', OX-20, -70, 80]],
    api:api,
    tick:function(dt, k){
      A.api.set(st.km1); B.api.set(st.km2);
      st.arc = Math.max(0, st.arc - dt/(0.6*k)); flM.opacity = st.arc; arcs.forEach(function(m){ m.visible = st.arc > 0.01; m.scale.setScalar(0.5 + st.arc); });
      const w = st.km1 ? 1 : st.km2 ? -1 : 0;
      st.rot += w*2.2*dt/k; shaft.rotation.x = st.rot;
      return A.tick(dt, k) | B.tick(dt, k) | (w !== 0) | (st.arc > 0);
    }
  };
  }}, opt); };
})();

/* ══════════════ 双控照明（7.1）：墙上两个双控开关 + 天花板一盏灯 ══════════════
   相线 L → SA1 的公共端 COM → （上 / 下）联络线 → SA2 的同一侧 → SA2 的 COM → 灯 → 零线 N。
   两个开关拨在同一侧（a===b）灯亮。墙 = 模型 y=0 的竖面（x 横、z 高），剖开看墙里的线。
   状态来自页面 c7-1.js 的 S2 {a, b}；点开关 → opt.onFlip('a'|'b') */
(function(){
'use strict';
const PARTS = {
  sa1:  ['SA1 双控开关（进门）', '<b>点它拨一下</b>。双控开关三个端子：公共端 COM（L）、L1、L2，里面一片动触片要么搭 L1 要么搭 L2。', 'SA1 进门'],
  sa2:  ['SA2 双控开关（床头）', '<b>点它拨一下</b>。跟 SA1 一样的开关，COM 接到灯。', 'SA2 床头'],
  trav: ['两根联络线', '两个双控开关的 L1 接 L1、L2 接 L2。电从哪一根过，看两个开关拨在哪一边。', '联络线'],
  lamp: ['灯', '两个开关拨在<b>同一边</b>（都搭上、或都搭下）就有一根联络线是通的，灯亮。', '灯'],
  wl:   ['相线 L（红）', '<b>开关必须接在相线上</b>（7.1 第 1 屏）：关了灯，灯头上就不带电。', '相线 L'],
  wn:   ['零线 N（蓝）', '直接接到灯，不经过开关。', '零线 N'],
  wall: ['墙', '', '墙'],
  housing:['墙面', '']
};
const SX = {a:-55, b:55}, SZ = 40;
E3D.twoWay = function(el, opt){ opt = opt||{}; return E3D.viewer(el, {
  parts:PARTS, center:[0, 0, 55], view:{th:0, ph:1.45, r:300},
  presets:{front:[1, 0, 0, 0.0001, 290], side:[0, 1, 0, -Math.PI/2, 290]},
  build:function(K){
  const T = K.T, H = K.H, M = K.M, root = K.root, shell = K.shell, tag = K.tag;
  /* 墙面（剖开半透明）+ 天花板 */
  tag(H.box(200, 4, 120, 0, -2, 60, H.M(0xe9e4da, {roughness:0.9, transparent:true}), shell), 'housing');
  tag(H.box(200, 60, 3, 0, 26, 121, H.M(0xf4f1ea, {roughness:0.9}), root), 'wall');
  /* 线：L 红从左边进，N 蓝；联络线两根（灰白）；SA2 COM → 灯（红） */
  const red = H.M(0xd42f2f, {roughness:0.5}), blue = H.M(0x1c6dd0, {roughness:0.5}), grey = H.M(0xcfd3d8, {roughness:0.5});
  const Y = 4;                                                    /* 墙里的线在墙面后面一点 */
  tag(H.wire([[-100, Y, 110], [-55, Y, 110], [-55, Y, SZ+8]], 0.9, red, root), 'wl');
  tag(H.wire([[-46, Y, SZ+5], [-46, Y, 70], [46, Y, 70], [46, Y, SZ+5]], 0.9, grey, root), 'trav');
  tag(H.wire([[-46, Y, SZ-5], [-46, Y, 12], [46, Y, 12], [46, Y, SZ-5]], 0.9, grey, root), 'trav');
  tag(H.wire([[55, Y, SZ+8], [55, Y, 100], [6, Y, 116], [6, 20, 118]], 0.9, red, root), 'wl');
  tag(H.wire([[-100, Y+3, 104], [-6, Y+3, 112], [-6, 20, 118]], 0.9, blue, root), 'wn');
  H.plate('L', 6, 6, -96, -1, 112, '#d42f2f', null, root); H.plate('N', 6, 6, -96, -1, 100, '#1c6dd0', null, root);
  /* 开关：面板 + 翘板（绕 x 轴摆）+ 墙里的三个端子 + 动触片 */
  const sw = {};
  ['a', 'b'].forEach(function(k){ const x = SX[k], key = k === 'a' ? 'sa1' : 'sa2';
    tag(H.box(22, 3, 22, x, -4, SZ, H.M(0xf6f6f4, {roughness:0.35}), root), key);
    const rk = new T.Group(); rk.position.set(x, -6, SZ); root.add(rk);
    tag(H.box(14, 3, 14, 0, -1, 0, H.M(0xffffff, {roughness:0.3}), rk), key);
    [[0, SZ], [9, SZ+5], [9, SZ-5]].forEach(function(t){ const tx = k === 'a' ? x + t[0] : x - t[0];
      tag(H.box(3, 3, 3, tx, Y, t[1], M.brass, root), key); });
    const arm = new T.Group(); arm.position.set(x, Y, SZ); root.add(arm);
    tag(H.box(10, 1.2, 1.6, (k === 'a' ? 5 : -5), 0, 0, M.cu, arm), key);
    H.plate(k === 'a' ? 'SA1 进门' : 'SA2 床头', 20, 5, x, -6, SZ - 17, '#3a3f45', null, root);
    sw[k] = {rk:rk, arm:arm}; });
  /* 灯 */
  tag(H.cylZ(6, 3, 0, 20, 118, M.white, root), 'lamp');
  const glass = H.M(0xfff4d6, {roughness:0.1, transparent:true, opacity:0.6, emissive:0x000000});
  const bulb = tag(new T.Mesh(new T.SphereGeometry(9, 20, 16), glass), 'lamp'); bulb.position.set(0, 20, 105); root.add(bulb);
  const lt = new T.PointLight(0xffd27a, 0, 260); lt.position.set(0, 0, 100); root.add(lt);
  /* 电流点：两条可能的路（上联络线 / 下联络线） */
  const head = [[-100, Y, 110], [-55, Y, 110], [-55, Y, SZ]], tail = [[55, Y, SZ], [55, Y, 100], [6, Y, 116], [6, 20, 118], [0, 20, 105], [-6, 20, 118], [-6, Y+3, 112], [-100, Y+3, 104]];
  const up = K.dots(18, K.curM, H.poly(head.concat([[-46, Y, SZ+5], [-46, Y, 70], [46, Y, 70], [46, Y, SZ+5]], tail)));
  const dn = K.dots(18, K.curM, H.poly(head.concat([[-46, Y, SZ-5], [-46, Y, 12], [46, Y, 12], [46, Y, SZ-5]], tail)));
  return {
    labels:[['sa1', -55, -6, SZ+12], ['sa2', 55, -6, SZ+12], ['trav', 0, Y, 70], ['lamp', 0, 20, 96], ['wl', -80, Y, 110], ['wn', -80, Y+3, 104]],
    press:function(k){ if((k === 'sa1' || k === 'sa2') && opt.onFlip){ opt.onFlip(k === 'sa1' ? 'a' : 'b'); return true; } return false; },
    tick:function(dt, kk){
      const s = opt.state ? opt.state() : {a:0, b:0};
      ['a', 'b'].forEach(function(k){ const tgt = s[k] ? -0.28 : 0.28;
        sw[k].rk.rotation.x += (tgt - sw[k].rk.rotation.x) * Math.min(1, dt*14/kk);
        sw[k].arm.rotation.y += ((s[k] ? 1 : -1)*(k === 'a' ? 0.5 : -0.5) - sw[k].arm.rotation.y) * Math.min(1, dt*14/kk); });
      const on = s.a === s.b;
      glass.emissive.setHex(0xffc65a); glass.emissiveIntensity = on ? 3.2 : 0; glass.opacity = on ? 0.95 : 0.6; lt.intensity = on ? 4000 : 0;
      K.flow(up, on && s.a === 0, 0.08/kk, dt); K.flow(dn, on && s.a === 1, 0.08/kk, dt);
      return true;
    }
  };
  }}, opt); };
})();

/* ══════════════ 家用配电箱 + 漏电保护（8.2）══════════════
   导轨上：电能表 → 总开关 QF → 漏电保护器 RCD（带 T 试验钮）→ 照明、插座两路分支；N 排（蓝）、PE 排（黄绿）分开。
   箱外一台洗衣机（金属外壳接 PE）。自带状态：leak 外壳漏电 / pe PE 线接好 / touch 人摸外壳 / tripped。
   RCD 看的是「去的电流和回的电流差了多少」：漏到 PE 或者漏到人身上都会差 → 超过 30 mA 就跳。
   opt.onState({tripped, live 外壳带电?, path 'pe'|'person'|null, msg}) */
(function(){
'use strict';
const PARTS = {
  meter: ['电能表', '计量用了多少度电。', '电能表'],
  qf:    ['总开关（断路器）', '管短路和过载。', '总开关'],
  rcd:   ['漏电保护器 RCD', '里面一个零序互感器同时套着相线和零线：<b>去多少回多少</b>就平衡；有电流漏到 PE 或人身上，回来的少了 → 差值超过 <b>30 mA</b>，0.1 秒内跳闸。<b>点它合闸</b>（跳了以后）。', '漏电保护'],
  test:  ['试验按钮 T', '按一下人为造一个漏电，<b>应该立刻跳</b>。每月按一次 —— 不跳就是坏了。<b>点它试一下</b>。', '试验按钮 T'],
  br:    ['分支断路器', '照明一路、插座一路，各管各的。', '分支开关'],
  nbar:  ['N 排（零线端子板，蓝）', '各路零线汇到这里。<b>必须和 PE 排分开</b>（书上唯一一条硬要求）。', 'N 排'],
  pebar: ['PE 排（地线端子板，黄绿）', '各路地线、设备外壳汇到这里，再接到接地极。', 'PE 排'],
  wm:    ['洗衣机（金属外壳）', '外壳通过 PE 线接地。<b>点它让人去摸 / 松手</b>。', '洗衣机'],
  pe:    ['PE 线（黄绿）', '外壳漏电时，电流顺着它流进大地 —— 不从人身上走。', 'PE 线'],
  person:['人', '', '人'],
  housing:['箱体', '']
};
E3D.distBox = function(el, opt){ opt = opt||{}; return E3D.viewer(el, {
  parts:PARTS, center:[30, -10, 20], view:{th:0, ph:0.55, r:380},
  presets:{front:[1, 0, 0, Math.PI/2, 360], side:[0, 1, 0, -Math.PI/2, 340]},
  build:function(K){
  const T = K.T, H = K.H, M = K.M, root = K.root, shell = K.shell, tag = K.tag;
  /* 箱体（剖开半透明） */
  [[110, 140, 2, 0, 0, 1], [110, 2, 30, 0, 70, 15], [110, 2, 30, 0, -70, 15], [2, 140, 30, -55, 0, 15], [2, 140, 30, 55, 0, 15]].forEach(function(b){ tag(H.box(b[0], b[1], b[2], b[3], b[4], b[5], H.M(0xdfe2e6, {roughness:0.6, transparent:true}), shell), 'housing'); });
  /* 电能表 */
  tag(H.box(40, 34, 14, 0, 46, 8, H.M(0xeceef0, {roughness:0.5}), root), 'meter'); tag(H.box(26, 8, 1, 0, 52, 15.5, H.M(0x2d3136), root), 'meter');
  H.plate('kWh', 10, 4, 0, 40, 15.2, '#2a2e33', null, root);
  /* 导轨 + 模块：每个模块宽 18（单极）/ 36（两极） */
  tag(H.box(100, 8, 2, 0, 6, 3, M.zinc, root), 'housing');
  const mods = [];
  function mod(x, w, key, col, label){ tag(H.box(w, 44, 26, x, 6, 15, H.M(col, {roughness:0.5}), root), key);
    const lev = new T.Group(); lev.position.set(x, 6, 28); root.add(lev); tag(H.box(Math.min(w-6, 22), 5, 8, 0, 0, 4, M.blk, lev), key);
    H.plate(label, w-4, 4.4, x, -12, 28.2, '#2a2e33', null, root); mods.push(lev); return lev; }
  const levQF = mod(-34, 34, 'qf', 0xf2f3f4, '总开关'), levRCD = mod(4, 36, 'rcd', 0xf2f3f4, '漏电保护'), levB1 = mod(33, 18, 'br', 0xf2f3f4, '照明'), levB2 = mod(46, 8, 'br', 0xf2f3f4, '');
  const tbtn = tag(H.box(6, 5, 3, 16, 20, 29, H.M(0xe0a92e), root), 'test'); H.plate('T', 4, 4, 16, 26, 28.3, '#2a2e33', null, root);
  /* N 排、PE 排 */
  tag(H.box(44, 6, 5, -26, -46, 4, H.M(0x1c6dd0, {roughness:0.4}), root), 'nbar'); H.plate('N', 6, 5, -52, -46, 3, '#1c6dd0', null, root);
  tag(H.box(44, 6, 5, 26, -46, 4, H.M(0x8fbf2f, {roughness:0.4}), root), 'pebar'); H.plate('PE', 8, 5, 52, -46, 3, '#8fbf2f', null, root);
  for(let i=0;i<5;i++){ tag(H.cylZ(1.6, 2, -42 + i*8, -46, 7.5, M.zinc, root), 'nbar'); tag(H.cylZ(1.6, 2, 10 + i*8, -46, 7.5, M.zinc, root), 'pebar'); }
  /* 洗衣机（箱外右边） */
  const WX = 120, WY = -20;
  const wmM = H.M(0xf3f4f6, {roughness:0.35, emissive:0x000000});
  tag(H.box(46, 46, 60, WX, WY, 30, wmM, root), 'wm');
  const door = tag(H.cylZ(14, 2, 0, 0, 0, H.M(0x9fb3c8, {roughness:0.2}), root), 'wm'); door.rotation.x = Math.PI/2; door.position.set(WX, WY-23.5, 34);   /* 门朝前 */
  /* 导线：L（红）从 RCD 下来经插座回路到洗衣机；N（蓝）回 N 排；PE（黄绿）外壳 → PE 排 */
  const red = H.M(0xd42f2f, {roughness:0.5}), blue = H.M(0x1c6dd0, {roughness:0.5}), yg = H.M(0x8fbf2f, {roughness:0.5});
  H.wire([[46, -16, 18], [46, -30, 18], [70, -30, 20], [WX-23, WY+10, 40]], 0.9, red, root);
  H.wire([[-10, -46, 8], [-10, -58, 12], [80, -58, 16], [WX-23, WY+4, 36]], 0.9, blue, root);
  const peWire = tag(H.wire([[26, -46, 8], [26, -62, 10], [90, -62, 12], [WX-23, WY-2, 30]], 1.0, yg, root), 'pe');
  const peCut = new T.Mesh(new T.SphereGeometry(3, 10, 8), H.M(0x111111)); peCut.position.set(90, -62, 12); root.add(peCut);
  H.wire([[26, -46, 6], [26, -72, 0], [26, -90, -10]], 1.0, yg, root); H.plate('接地极', 16, 5, 26, -96, -10, '#e6edf5', null, root);
  /* 人：一根肤色柱子，手伸到洗衣机外壳 */
  const skin = H.M(0xe0b18e, {roughness:0.7});
  const person = new T.Group(); person.position.set(WX + 50, WY, 0); root.add(person);
  const pBody = tag(new T.Mesh(new T.CylinderGeometry(7, 8, 70, 16).rotateX(Math.PI/2), skin), 'person'); pBody.position.z = 35; person.add(pBody);
  const armG = new T.Group(); armG.position.set(0, 0, 55); person.add(armG);
  const ag = new T.CapsuleGeometry(3, 22, 6, 10); ag.rotateZ(Math.PI/2); const arm = tag(new T.Mesh(ag, skin), 'person'); arm.position.x = -14; armG.add(arm);
  /* 电流点：负载电流（相线去、零线回）；漏电电流（外壳 → PE 或 → 人 → 地） */
  const loadP = K.dots(14, K.curM, H.poly([[-34, 30, 20], [4, 30, 20], [46, -16, 18], [46, -30, 18], [70, -30, 20], [WX-23, WY+10, 40], [WX-23, WY+4, 36], [80, -58, 16], [-10, -58, 12], [-10, -46, 8]]));
  const peP = K.dots(8, K.curM, H.poly([[WX-23, WY-2, 30], [90, -62, 12], [26, -62, 10], [26, -46, 8], [26, -72, 0], [26, -90, -10]]));
  const manP = K.dots(8, K.curM, H.poly([[WX+23, WY, 45], [WX+36, WY, 55], [WX+50, WY, 55], [WX+50, WY, 0]]));
  const st = {leak:false, pe:true, touch:false, tripped:false, t:0, testT:0};
  function evaluate(){
    let msg, path = null, live = false;
    if(st.tripped) msg = '<b>漏电保护器跳了</b>，回路断电。查出漏电原因再合闸（点漏电保护器）。';
    else if(!st.leak) msg = st.touch ? '外壳没漏电，摸上去没事。' : '正常：去多少回多少，漏电保护器不动作。点「外壳漏电」造个故障。';
    else if(st.pe){ path = 'pe'; msg = '外壳漏电了：电流顺着 <b>PE 线</b>流进大地，回来的电流少了 → 漏电保护器<b>立刻跳闸</b>。人没碰到也照样跳 —— PE 线 + 漏保两道保险。'; }
    else if(st.touch){ path = 'person'; msg = '<b>PE 线断了，人摸到带电的外壳</b>：电流从人身上流进大地，超过 30 mA → 漏电保护器 0.1 秒内跳闸。人会被电一下，但保住了命。'; }
    else { live = true; msg = '<b style="color:var(--err)">PE 线断了：外壳带着电，漏电保护器却没跳</b> —— 没地方漏，电流差为零。这是最危险的状态：等着下一个人来摸。'; }
    return {msg:msg, path:path, live:live};
  }
  function emit(){ const e = evaluate(); if(opt.onState) opt.onState({tripped:st.tripped, live:e.live, path:e.path, msg:e.msg}, st); K.S.dirty = true; return e; }
  const api = {
    st:st,
    set:function(o){ Object.assign(st, o); const e = evaluate(); if(!st.tripped && e.path){ st.t = 0.35; } emit(); },
    reset:function(){ if(!st.tripped) return; st.tripped = false;
      if(evaluate().path){ st.tripped = true; if(opt.onState) opt.onState({tripped:true, live:false, path:null, msg:'<b>合不上，又跳了</b>：漏电故障还在。先拔掉洗衣机插头、查出漏电原因。'}, st); K.S.dirty = true; return; }
      emit(); },
    test:function(){ if(st.tripped) return; st.testT = 0.25; }
  };
  emit();
  return {
    labels:[['meter', 0, 46, 16], ['qf', -34, 6, 30], ['rcd', 4, 6, 30], ['test', 16, 20, 31], ['br', 33, 6, 30], ['nbar', -26, -46, 7], ['pebar', 26, -46, 7], ['wm', WX, WY, 62], ['pe', 90, -62, 13], ['person', WX+50, WY, 72]],
    press:function(k){ if(k === 'test'){ api.test(); return true; } if(k === 'rcd'){ api.reset(); return true; } if(k === 'wm' || k === 'person'){ api.set({touch:!st.touch}); return true; } return false; },
    api:api,
    tick:function(dt, k){
      if(st.t > 0){ st.t -= dt/k; if(st.t <= 0){ st.tripped = true; emit(); } }            /* 漏电 → 0.1 秒级跳闸（画面放慢到 0.35 秒） */
      if(st.testT > 0){ st.testT -= dt/k; tbtn.position.z = 27.5; if(st.testT <= 0){ tbtn.position.z = 29; st.tripped = true; if(opt.onState) opt.onState({tripped:true, live:false, path:null, msg:'按了试验按钮：人为造了一个漏电 → <b>立刻跳闸</b>，说明漏保是好的。点漏电保护器合回去。'}, st); K.S.dirty = true; } }
      levRCD.rotation.x = st.tripped ? -0.6 : 0.6; levQF.rotation.x = 0.6; levB1.rotation.x = 0.6; levB2.rotation.x = 0.6;
      peWire.visible = st.pe; peCut.visible = !st.pe;
      armG.rotation.z = st.touch ? 0 : 0.9;
      const e = evaluate();
      wmM.emissive.setHex(0xff0000); wmM.emissiveIntensity = e.live && !st.tripped ? 0.25 + 0.2*Math.sin(performance.now()/160) : 0;
      const powered = !st.tripped;
      K.flow(loadP, powered, 0.1/k, dt);
      K.flow(peP, powered && e.path === 'pe', 0.15/k, dt);
      K.flow(manP, powered && e.path === 'person', 0.15/k, dt);
      return true;
    }
  };
  }}, opt); };
})();

/* ══════════════ 星三角起动（11.4）：KMY + KM△ + 电动机接线盒 ══════════════
   电源 L1 L2 L3 直接到 U1 V1 W1（总开关后）。U2 V2 W2 同时引到两台接触器的上端：
     KMY 下端 2/4/6 用一根铜排短接 ＝ 星点 → 星形（每相 220 V）
     KM△ 下端 2/4/6 分别接 V1 W1 U1 → U2-V1、V2-W1、W2-U1 首尾相连 ＝ 三角形（每相 380 V）
   自带：按起动 → KMY（星形）→ 时间继电器倒数 → KMY 断、KM△ 合（三角形）。opt.onState({phase, left, I, Uph, msg}) */
(function(){
'use strict';
const OX = 48, MY = -120;
E3D.starDelta = function(el, opt){ opt = opt||{}; return E3D.viewer(el, {
  parts:Object.assign({}, E3D._PARTS_KM, {
    kmy:['KMY 星形接触器', '下面三个出线端用一根铜排短接 —— 把三相绕组的尾巴 U2 V2 W2 连成一点（星点）。起动时先合它。', 'KMY 星形'],
    kmd:['KM△ 三角形接触器', '下面三个出线端分别接 V1、W1、U1 —— 让每相绕组的尾接到下一相的头，首尾相连围成三角形。', 'KM△ 三角形'],
    star:['星点铜排', 'KMY 一吸合，U2 V2 W2 经它连在一起。', '星点'],
    box:['电动机接线盒', '<b>连接片要全部拆掉</b>，六个头都引出来接到两台接触器上 —— 接成什么形由接触器决定。', '接线盒'],
    motor:['电动机', '', '电动机']
  }),
  center:[0, -40, 40], view:{th:0, ph:0.6, r:470},
  presets:{front:[1, 0, 0, Math.PI/2, 450], side:[0, 1, 0, -Math.PI/2, 420]},
  build:function(K){
  const T = K.T, H = K.H, M = K.M, root = K.root, tag = K.tag;
  function sub(x){ const g = new T.Group(); g.position.x = x; root.add(g); const sh = new T.Group(); sh.position.x = x; K.shell.add(sh);
    return E3D._kmBuild(Object.assign({}, K, {root:g, shell:sh}), {}, E3D._CT_KM); }
  const KY = sub(-OX), KD = sub(OX);
  H.plate('KMY 星形', 26, 6, -OX, 56, 0.4, '#e6edf5', null, root); H.plate('KM△ 三角形', 30, 6, OX, 56, 0.4, '#e6edf5', null, root);
  /* 星点铜排：KMY 下端 2/4/6 */
  tag(H.box(34, 4, 2, -OX-13, -40, 80, M.cu, root), 'star');
  /* 电动机 + 接线盒（六个端子，上排 W2 U2 V2、下排 U1 V1 W1） */
  const mo = H.M(0x4f6f8f, {roughness:0.55, metalness:0.3});
  const mg = new T.CylinderGeometry(26, 26, 64, 28); mg.rotateZ(Math.PI/2);
  const mb = tag(new T.Mesh(mg, mo), 'motor'); mb.position.set(0, MY, 28); root.add(mb);
  tag(H.box(50, 40, 4, 0, MY, 2, mo, root), 'motor'); tag(H.box(40, 26, 8, 0, MY, 58, mo, root), 'box');
  const shaft = new T.Group(); shaft.position.set(44, MY, 28); root.add(shaft);
  const dg = new T.CylinderGeometry(12, 12, 2, 24); dg.rotateZ(Math.PI/2); shaft.add(tag(new T.Mesh(dg, M.white), 'motor'));
  tag(H.box(2.4, 12, 24, 0, 6, 0, H.M(0xc0392b), shaft), 'motor');
  const T6 = {W2:[-12, MY+6], U2:[0, MY+6], V2:[12, MY+6], U1:[-12, MY-6], V1:[0, MY-6], W1:[12, MY-6]};
  Object.keys(T6).forEach(function(n){ const p = T6[n]; tag(H.cylZ(1.8, 4, p[0], p[1], 64, M.brass, root), 'box'); H.plate(n, 6, 3.4, p[0], p[1] + (p[1] > MY ? 4.5 : -4.5), 62.2, '#e6edf5', null, root); });
  const PHM = [0xe0a92e, 0x3fa845, 0xcf4436].map(function(c){ return H.M(c, {roughness:0.5}); }), PX = [-27, -13, 1];
  /* 电源 L1 L2 L3 → U1 V1 W1 */
  ['U1', 'V1', 'W1'].forEach(function(n, i){ const p = T6[n]; H.wire([[-120, 40 - i*6, 70], [-90, 40 - i*6, 70], [-90, MY - 20 - i*4, 70], [p[0], MY - 20 - i*4, 70], [p[0], p[1], 66]], 1.1, PHM[i], root); });
  H.plate('L1 L2 L3', 24, 5, -110, 50, 0.4, '#e6edf5', null, root);
  /* U2 V2 W2 → 两台接触器的上端 1/3/5（并联） */
  ['U2', 'V2', 'W2'].forEach(function(n, i){ const p = T6[n], z = 92 + i*3;
    H.wire([[p[0], p[1], 66], [p[0], MY + 26 + i*4, z], [-OX + PX[i], 50 + i*4, z], [-OX + PX[i], 33, 79]], 0.9, PHM[i], root);
    H.wire([[p[0], MY + 26 + i*4, z], [OX + PX[i], 50 + i*4, z], [OX + PX[i], 33, 79]], 0.9, PHM[i], root); });
  /* KM△ 下端 2/4/6 → V1 W1 U1 */
  ['V1', 'W1', 'U1'].forEach(function(n, i){ const p = T6[n]; H.wire([[OX + PX[i], -33, 79], [OX + PX[i], -60, 84 - i*3], [p[0] + 3, MY - 14, 72], [p[0], p[1], 66]], 0.9, PHM[(i+1)%3], root); });
  /* 电流点：星形时 U2V2W2 → KMY → 星点；三角形时 U2 → KM△ → V1 … */
  const starP = [0, 1, 2].map(function(i){ const p = T6[['U2', 'V2', 'W2'][i]]; return K.dots(8, K.curM, H.poly([[p[0], p[1], 66], [p[0], MY + 26 + i*4, 92 + i*3], [-OX + PX[i], 50 + i*4, 92 + i*3], [-OX + PX[i], 33, 79], [-OX + PX[i], -33, 79], [-OX - 13, -40, 81]])); });
  const deltaP = [0, 1, 2].map(function(i){ const p = T6[['U2', 'V2', 'W2'][i]], q = T6[['V1', 'W1', 'U1'][i]];
    return K.dots(10, K.curM, H.poly([[p[0], p[1], 66], [p[0], MY + 26 + i*4, 92 + i*3], [OX + PX[i], 50 + i*4, 92 + i*3], [OX + PX[i], 33, 79], [OX + PX[i], -33, 79], [OX + PX[i], -60, 84 - i*3], [q[0] + 3, MY - 14, 72], [q[0], q[1], 66]])); });
  const DELAY = 5;
  const st = {phase:'stop', left:0, rot:0, spd:0};
  function emit(){ const I = st.phase === 'star' ? '约 2 倍额定（直接起动要 6 倍，星形只有它的 1/3）' : st.phase === 'delta' ? '额定（1 倍）' : '0';
    const U = st.phase === 'star' ? '220 V' : st.phase === 'delta' ? '380 V' : '0';
    const msg = st.phase === 'star' ? '<b>星形起动</b>：KMY 把三个尾巴短接成星点，每相绕组只分到 <b>220 V</b>，起动电流降到直接起动的 1/3。时间继电器倒数 '+Math.ceil(st.left)+' 秒……'
      : st.phase === 'delta' ? '<b>三角形运行</b>：KMY 先断开、KM△ 再吸合（顶替，不能同时），每相绕组 <b>380 V</b>，全压全速。' : '停着。按「起动」看一整套动作。';
    if(opt.onState) opt.onState({phase:st.phase, left:st.left, I:I, Uph:U, msg:msg}); K.S.dirty = true; }
  const api = { st:st, start:function(){ if(st.phase !== 'stop') return; st.phase = 'star'; st.left = DELAY; emit(); }, stop:function(){ st.phase = 'stop'; emit(); } };
  emit();
  let lastSec = -1;
  return {
    labels:[['kmy', -OX, 0, 96], ['kmd', OX, 0, 96], ['star', -OX-13, -40, 82], ['box', 0, MY, 70]],
    api:api,
    tick:function(dt, k){
      if(st.phase === 'star'){ st.left -= dt/k; const s = Math.ceil(st.left); if(s !== lastSec){ lastSec = s; emit(); } if(st.left <= 0){ st.phase = 'delta'; emit(); } }
      KY.api.set(st.phase === 'star'); KD.api.set(st.phase === 'delta');
      const tgt = st.phase === 'star' ? 1.4 : st.phase === 'delta' ? 2.6 : 0;
      st.spd += (tgt - st.spd) * Math.min(1, dt*1.2/k); st.rot += st.spd*dt/k; shaft.rotation.x = st.rot;
      starP.forEach(function(g){ K.flow(g, st.phase === 'star' && KY.api.coil.t > 0.9, 0.1/k, dt); });
      deltaP.forEach(function(g){ K.flow(g, st.phase === 'delta' && KD.api.coil.t > 0.9, 0.1/k, dt); });
      return KY.tick(dt, k) | KD.tick(dt, k) | (st.spd > 0.01) | (st.phase !== 'stop');
    }
  };
  }}, opt); };
})();
