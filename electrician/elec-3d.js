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
    if(opt.onInfo) opt.onInfo(k ? spec.parts[k] : null);
    S.dirty = true;
  }
  S.renderer.domElement.addEventListener('pointerup', function(e){ if(orb.moved() >= 6) return;
    const r = S.renderer.domElement.getBoundingClientRect();
    ndc.set((e.clientX-r.left)/r.width*2-1, -((e.clientY-r.top)/r.height*2-1)); ray.setFromCamera(ndc, S.cam);
    const hs = ray.intersectObjects(hit.filter(function(m){ return !(st.cut && m.userData.part==='housing'); }), false);
    const k = hs.length ? hs[0].object.userData.part : null;
    if(k && B.press && B.press(k)) { S.dirty = true; }       /* 元件说这一下是「操作」（按钮、旋钮），也照样出说明 */
    select(k);
  });

  /* 每帧 */
  let last = performance.now(), visible = true;
  new IntersectionObserver(function(es){ visible = es[0].isIntersecting; }).observe(el);
  function tick(now){
    requestAnimationFrame(tick);
    const dt = Math.min(0.05, (now-last)/1000); last = now;
    if(!visible || !el.clientWidth) return;
    const busy = B.tick ? B.tick(dt, st.slow ? 4 : 1) : false;
    if(busy || S.dirty){ S.renderer.render(S.scene, S.cam); placeLabels(); S.dirty = false; }
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


E3D.contactor = function(el, opt){ return E3D.viewer(el, {
  parts:PARTS, center:[0, 2, 40], view:{th:0.4, ph:0.95, r:265},
  /* 正面＝装在盘上时你看到的那面（1/3/5 在上）；侧面＝从右边看，下面电磁铁、上面触点，看衔铁上下动最清楚 */
  presets:{front:[1, 0, 0, Math.PI/2, 250], side:[0, 1, 0, -Math.PI/2, 250]},
  build:function(K){
  const T = K.T, H = K.H, M = K.M, root = K.root, shell = K.shell, tag = K.tag, opt = K.opt;
  const PX = [-27, -13, 1], AX = [15, 26];          /* 三相、辅助常开、辅助常闭 的 x */
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
  tag(H.box(4, 6, 6, AX[1], 0, 50.5, M.carrier, mov), 'carrier');              /* 常闭桥的托座 */
  tag(H.box(14, 14, 11, 0, 0, 81.5, M.carrier, mov), 'carrier');                /* 露头 */
  H.plate('KM', 9, 5, 0, 0, 87.1, '#ffffff', null, mov);

  const PH = [0xe0a92e, 0x3fa845, 0xcf4436];        /* 国标三相线色 黄 绿 红 */
  const lbl = [['1/L1','2/T1'], ['3/L2','4/T2'], ['5/L3','6/T3'], ['13NO','14NO'], ['21NC','22NC']];
  const poles = [];                                  /* 每对触点：{x, nc, br(桥), spr(触点弹簧)} */

  /* 静触点铜排 + 端子 */
  PX.concat(AX).forEach(function(x, i){
    const aux = i>=3, nc = i===4, w = aux ? 4 : 6;
    [1, -1].forEach(function(sg){
      tag(H.box(w, 24, 2, x, sg*20, 60, M.cu, root), 'mfix');                       /* 平的一段 y ±8~32 */
      tag(H.box(w, 2, 13, x, sg*32, 66.5, M.cu, root), 'mfix');                     /* 立起来接端子 */
      tag(H.cylZ(aux ? 1.6 : 2.3, 1, x, sg*10, nc ? 58.5 : 61.5, M.ag, root), aux ? (nc ? 'anc' : 'ano') : 'mfix');   /* 银触点：常开朝外、常闭朝里 */
      tag(H.box(aux ? 8 : 10, 9, 0.8, x, sg*33, 72.4, M.zinc, root), 'term');      /* 压线板 */
      tag(H.cylZ(aux ? 2.4 : 3.2, 2.6, x, sg*33, 74, M.zinc, root), 'term');        /* 螺钉 */
      const sl = H.box(aux ? 3.4 : 4.6, 0.7, 0.6, x, sg*33, 75.4, M.blk, root); sl.rotation.z = 0.4;
      H.plate(lbl[i][sg>0 ? 0 : 1], aux ? 9.5 : 11, 3.4, x, sg*26.3, 72.15, '#1f2328', null, root);   /* 印在螺钉内侧，外侧要走线 */
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
  AX.forEach(function(x){ [1, -1].forEach(function(sg){ H.wire([[x, sg*33, 75.5], [x, sg*33, 78], [x, sg*46, 78]], 0.9, M.blk, root); }); });
  [[26, 46], [-26, -46]].forEach(function(c){ const sg = c[1]>0 ? 1 : -1; H.wire([[c[0], c[1], 43.5], [c[0], c[1], 46], [c[0], c[1]+sg*12, 46]], 0.9, M.blk, root); });


  const mainP = PX.map(function(x){ return K.dots(9, K.curM, H.poly([[x, 47, 79], [x, 33, 79], [x, 33, 61], [x, 10, 61], [x, 10, 65], [x, -10, 65], [x, -10, 61], [x, -33, 61], [x, -33, 79], [x, -47, 79]])); });
  const coilP = K.dots(7, K.curM, H.poly([[26, 58, 46], [26, 46, 46], [26, 44, 38], [26, 30, 26], [23, 13, 20], [0, 13, 20], [-23, -13, 20], [-26, -30, 26], [-26, -44, 38], [-26, -46, 46], [-26, -58, 46]]));
  const fluxP = [1, -1].map(function(){ return K.dots(6, K.sigM, null); });
  /* 电弧：主触点断开那一下，两个断口各闪一下 */
  const arcM = new T.MeshBasicMaterial({color:0xcfe4ff, toneMapped:false, transparent:true, opacity:0, blending:T.AdditiveBlending, depthWrite:false});
  const arcs = []; PX.forEach(function(x){ [10, -10].forEach(function(y){ const m = new T.Mesh(new T.SphereGeometry(2.6, 12, 10), arcM); m.position.set(x, y, 63.5); root.add(m); arcs.push(m); }); });


  const st = {on:false, I:0, t:0, arc:0, wasMain:false, step:0, stepHold:0};
  return {
    labels:[['core', 15.5, -19, 18], ['coil', 21, 8, 24], ['shade', 15.5, 21, 31], ['arm', 15.5, -8, 38, mov], ['spring', 27, -4, 22],
            ['carrier', 0, 7, 88, mov], ['mbr', -13, -15, 67], ['mfix', -27, 24, 60], ['ano', 15, 4, 69], ['anc', 26, -4, 53], ['term', -27, 33, 78], ['coilT', 26, 46, 47]],
    api:{ set:function(on){ st.on = !!on; K.S.dirty = true; }, coil:st },
    tick:function(dt, k){ let busy = false;
      /* 线圈电流：通电 0.35s 升满，断电 0.15s 掉光（都已放慢，见页面文字） */
      if(st.on && st.I<1){ st.I = Math.min(1, st.I + dt/(0.35*k)); busy = true; }
      if(!st.on && st.I>0){ st.I = Math.max(0, st.I - dt/(0.15*k)); busy = true; }
      /* 衔铁：吸力过了弹簧力才动，越近越快（气隙小吸力大）；释放靠弹簧 */
      if(st.on && st.I>0.6 && st.t<1){ st.t = Math.min(1, st.t + dt/(0.5*k)*(0.35+1.8*st.t)); busy = true; }
      if(!st.on && st.I<0.4 && st.t>0){ st.t = Math.max(0, st.t - dt/(0.4*k)*(0.6+0.8*st.t)); busy = true; }
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
  }}, opt); };
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
