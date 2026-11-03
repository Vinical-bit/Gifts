(function () {
  'use strict';

  // ===== Link do Mapa das Gemas =====
  // Quando o mapa estiver no ar, cole o endereço aqui e o botão aparece sozinho.
  var GEMAS_URL = 'https://vinical-bit.github.io/mapa-das-gemas/';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var gemasLink = document.getElementById('gemasLink');
  if (GEMAS_URL) { gemasLink.href = GEMAS_URL; gemasLink.hidden = false; }

  // ===== Pedras da vitrine (dados tirados das etiquetas do museu) =====
  // c1/c2/c3: cores do corpo da pedra · fogo: força dos reflexos coloridos · forma: formato da pedra
  var GEMS = {
    ametista: {
      nome: 'Ametista', sub: 'a favorita', glow: '#9b6bd6',
      meta: [['Fórmula', 'SiO₂'], ['Procedência', 'Rio Grande do Sul'], ['Vitrine', 'geodo de ametista']],
      texto: 'É quartzo, o mesmo SiO₂ que forma a areia. O que muda é o ferro: como dizia a placa do geodo gigante, é ele que dá o roxo.',
      curio: 'O nome vem do grego amethystos, "não embriagado". Os gregos achavam que ela protegia da bebedeira.',
      c1: '#3a1478', c2: '#8d4fe8', c3: '#f3b6ff', fogo: 0.75, forma: { det: 1, sx: 0.95, sy: 1.55, sz: 0.85, ponta: 0.55, rugas: 0.16, semente: 3.1 }
    },
    calcita: {
      nome: 'Calcita', sub: 'calcita mel', glow: '#d99a35',
      meta: [['Fórmula', 'CaCO₃'], ['Procedência', 'Frederico Westphalen, RS'], ['Acervo', 'nº 2744']],
      texto: 'Os cristais cor de mel cresceram em cima de um pedaço de geodo de ametista. Por baixo, era a sua pedra de novo.',
      curio: 'Cada cristal tem o formato chamado "dente de cão": duas pirâmides pontudas unidas pela base.',
      c1: '#7a3a08', c2: '#e39a2c', c3: '#ffe6a8', fogo: 0.6, forma: { det: 1, sx: 0.9, sy: 1.6, sz: 0.85, ponta: 0.5, rugas: 0.14, semente: 7.4, base: 0.45 }
    },
    turmalina: {
      nome: 'Turmalina', sub: 'verde "blue cap"', glow: '#3f9a6a',
      meta: [['Rocha', 'pegmatito'], ['Procedência', 'Vale do Jequitinhonha, MG'], ['Acervo', 'nº 7941']],
      texto: 'Cristais verdes compridos, presos no pegmatito junto com albita, lepidolita e quartzo.',
      curio: '"Blue cap" quer dizer "boné azul": a ponta do cristal fica azulada. Gira a pedra e olha o topo.',
      c1: '#0b3d22', c2: '#2c9a58', c3: '#9cf0b8', fogo: 0.5, capa: '#3f86e8', forma: { det: 1, sx: 0.62, sy: 1.6, sz: 0.58, ponta: 0.22, rugas: 0.1, semente: 1.7 }
    },
    opala: {
      nome: 'Opala', sub: 'opalescência', glow: '#3fc79a',
      meta: [['Peso', '265 g'], ['Procedência', 'Pedro II, PI'], ['Acervo', 'nº 2432']],
      texto: 'A da vitrine ainda está presa na rocha, mas já mostra o efeito que dá nome a ela: cores que mudam conforme o ângulo.',
      curio: 'As cores não são pigmento. Vêm de esferas microscópicas de sílica que separam a luz. Gira e vê as cores andarem.',
      c1: '#0a6a34', c2: '#22c97e', c3: '#ff9a3a', fogo: 1.25, forma: { det: 2, sx: 1.05, sy: 1.38, sz: 0.85, ponta: 0.18, rugas: 0.12, semente: 5.9 }
    }
  };

  // ===== Ficha da pedra =====
  var specName = document.getElementById('specName'), specSub = document.getElementById('specSub'),
      specMeta = document.getElementById('specMeta'), specText = document.getElementById('specText'),
      specCurio = document.getElementById('specCurio'), gemView = document.querySelector('.gem-view');

  function fillCard(key) {
    var g = GEMS[key];
    specName.textContent = g.nome;
    specSub.textContent = g.sub;
    specMeta.innerHTML = '';
    g.meta.forEach(function (m) {
      var dt = document.createElement('dt'); dt.textContent = m[0];
      var dd = document.createElement('dd'); dd.textContent = m[1];
      specMeta.appendChild(dt); specMeta.appendChild(dd);
    });
    specText.textContent = g.texto;
    specCurio.textContent = g.curio;
    gemView.style.setProperty('--glow', g.glow);
  }

  // ===== Shader das pedras (facetas, brilho na borda e "fogo" colorido por dentro) =====
  var NOISE = [
    'vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}',
    'vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}',
    'vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}',
    'vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}',
    'float snoise(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);',
    'vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;',
    'vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;',
    'i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));',
    'float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);',
    'vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);',
    'vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;',
    'vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);',
    'vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;',
    'vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;',
    'return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}'
  ].join('\n');

  var VERT = [
    'varying vec3 vObj; varying vec3 vPos;',
    'void main(){ vObj = position; vec4 mv = modelViewMatrix * vec4(position,1.0); vPos = mv.xyz; gl_Position = projectionMatrix * mv; }'
  ].join('\n');

  var FRAG = [
    'uniform vec3 c1; uniform vec3 c2; uniform vec3 c3; uniform vec3 cap; uniform float capAmt;',
    'uniform float fire; uniform float time; uniform float seed; uniform float yTop;',
    'varying vec3 vObj; varying vec3 vPos;',
    NOISE,
    'vec3 hsv2rgb(vec3 c){vec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);vec3 p=abs(fract(c.xxx+K.xyz)*6.0-K.www);return c.z*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),c.y);}',
    'void main(){',
    '  vec3 N = normalize(cross(dFdx(vPos), dFdy(vPos)));',
    '  vec3 V = normalize(-vPos);',
    '  if (dot(N,V) < 0.0) N = -N;',
    '  float ndv = clamp(dot(N,V), 0.0, 1.0);',
    '  float fres = pow(1.0 - ndv, 2.4);',
    '  vec3 p = vObj * 1.4 + seed;',
    '  float n1 = snoise(p + vec3(0.0, time*0.04, 0.0));',
    '  float n2 = snoise(p*2.2 - vec3(time*0.03));',
    '  vec3 body = mix(c1, c2, smoothstep(-0.7, 0.55, n1));',
    '  body = mix(body, c3, smoothstep(0.2, 0.95, n2) * 0.75);',
    '  float cracks = snoise(p*2.6 + N*0.9);',
    '  float fleck = smoothstep(0.2, 0.75, cracks) * (0.6 + 0.4*snoise(p*1.5 + N*2.0 + time*0.05));',
    '  float hue = fract(cracks*0.55 + n2*0.35 + dot(N, vec3(0.31,0.52,0.21)) + seed*0.13);',
    '  vec3 spectral = hsv2rgb(vec3(hue, 0.7, 1.0));',
    '  vec3 col = body * (0.62 + 0.38*(1.0 - ndv*0.6));',
    '  col += spectral * max(fleck, 0.0) * fire * 0.9;',
    '  float vein = 1.0 - smoothstep(0.0, 0.06, abs(snoise(p*3.1 + 7.0)));',
    '  col += vec3(1.0) * vein * 0.08;',
    '  vec3 L1 = normalize(vec3(0.45, 0.8, 0.6)); vec3 L2 = normalize(vec3(-0.75, -0.15, 0.55));',
    '  col *= 0.7 + 0.45*max(dot(N, L1), 0.0);',
    '  vec3 R = reflect(-V, N);',
    '  float spec = pow(max(dot(R, L1), 0.0), 60.0) * 1.3 + pow(max(dot(R, L2), 0.0), 28.0) * 0.45;',
    '  col += vec3(spec);',
    '  col += fres * mix(c3, vec3(1.0), 0.45) * 1.1;',
    '  float topMix = smoothstep(yTop*0.55, yTop*0.85, vObj.y) * capAmt;',
    '  col = mix(col, cap * (0.75 + 0.6*fres) + spectral*fleck*0.3, topMix);',
    '  gl_FragColor = vec4(col, 1.0);',
    '}'
  ].join('\n');

  // ===== 3D =====
  var canvas = document.getElementById('gemCanvas');
  var hint = document.getElementById('dragHint');
  var three = null;

  function initThree() {
    if (!window.THREE) return null;
    var T = window.THREE, renderer;
    try { renderer = new T.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); }
    catch (e) { return null; }
    if (!renderer.getContext()) return null;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    var scene = new T.Scene();
    var camera = new T.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0, 7.4);
    return { T: T, renderer: renderer, scene: scene, camera: camera, mesh: null };
  }

  // pedra irregular e facetada, no estilo das pedras do Opal
  function gemGeometry(T, f) {
    var geo = new T.IcosahedronGeometry(1, f.det), pos = geo.attributes.position;
    function hash(x, y, z) {
      var s = Math.sin(Math.round(x * 1e4) * 12.9898 + Math.round(y * 1e4) * 78.233 + Math.round(z * 1e4) * 37.719 + f.semente) * 43758.5453;
      return s - Math.floor(s);
    }
    var yMax = 0;
    for (var i = 0; i < pos.count; i++) {
      var x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      var l = Math.sqrt(x * x + y * y + z * z); x /= l; y /= l; z /= l;
      var r = 1 + f.rugas * (hash(x, y, z) - 0.5) + 0.06 * Math.sin(x * 3.1 + z * 2.3 + f.semente);
      var nx = x * r, ny = y * r, nz = z * r;
      if (ny > 0) { var k = 1 - f.ponta * ny * ny; nx *= k; nz *= k; }
      if (ny < 0 && f.base) { var kb = 1 - f.base * ny * ny; nx *= kb; nz *= kb; }
      nx *= f.sx; ny *= f.sy; nz *= f.sz;
      pos.setXYZ(i, nx, ny, nz);
      if (ny > yMax) yMax = ny;
    }
    geo.userData.yTop = yMax;
    return geo;
  }

  function setGem(key) {
    if (!three) return;
    var T = three.T, g = GEMS[key];
    if (three.mesh) { three.scene.remove(three.mesh); three.mesh.geometry.dispose(); three.mesh.material.dispose(); }
    var geo = gemGeometry(T, g.forma);
    var mat = new T.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      extensions: { derivatives: true },
      uniforms: {
        c1: { value: new T.Color(g.c1) }, c2: { value: new T.Color(g.c2) }, c3: { value: new T.Color(g.c3) },
        cap: { value: new T.Color(g.capa || g.c3) }, capAmt: { value: g.capa ? 1 : 0 },
        fire: { value: g.fogo }, time: { value: 0 }, seed: { value: g.forma.semente }, yTop: { value: geo.userData.yTop }
      }
    });
    three.mesh = new T.Mesh(geo, mat);
    three.scene.add(three.mesh);
    rotX = 0.15; rotY = 0.5; velX = velY = 0;
    kick();
    if (reduce) render(performance.now());
  }

  var rotX = 0.15, rotY = 0.5, velX = 0, velY = 0, dragging = false, lastX = 0, lastY = 0, visible = false, raf = null, t0 = performance.now();

  function resize() {
    if (!three) return;
    var w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    three.renderer.setSize(w, h, false);
    three.camera.aspect = w / h; three.camera.updateProjectionMatrix();
    render(performance.now());
  }

  function render(now) {
    if (!three.mesh) return;
    var t = (now - t0) / 1000;
    var bob = reduce ? 0 : Math.sin(t * 1.1) * 0.06;
    three.mesh.rotation.set(rotX, rotY, 0);
    three.mesh.position.y = bob;
    three.mesh.material.uniforms.time.value = reduce ? 0 : t;
    three.renderer.render(three.scene, three.camera);
  }

  function loop(now) {
    raf = null;
    if (!visible) return;
    if (!dragging) {
      rotY += velY; rotX += velX;
      velY *= 0.94; velX *= 0.94;
      if (!reduce && Math.abs(velY) < 0.002) rotY += 0.005;
    }
    rotX = Math.max(-1.3, Math.min(1.3, rotX));
    render(now);
    if (!reduce || dragging || Math.abs(velY) > 0.0005 || Math.abs(velX) > 0.0005) raf = requestAnimationFrame(loop);
  }
  function kick() { if (three && visible && !raf) raf = requestAnimationFrame(loop); }

  canvas.addEventListener('pointerdown', function (e) {
    dragging = true; lastX = e.clientX; lastY = e.clientY; velX = velY = 0;
    canvas.setPointerCapture(e.pointerId); hint.classList.add('gone'); kick();
  });
  canvas.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var dx = e.clientX - lastX, dy = e.clientY - lastY; lastX = e.clientX; lastY = e.clientY;
    velY = dx * 0.01; velX = dy * 0.01; rotY += velY; rotX += velX; kick();
  });
  function endDrag() { dragging = false; kick(); }
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);
  canvas.addEventListener('keydown', function (e) {
    var map = { ArrowLeft: [0, -0.25], ArrowRight: [0, 0.25], ArrowUp: [-0.2, 0], ArrowDown: [0.2, 0] };
    if (map[e.key]) { e.preventDefault(); rotX += map[e.key][0]; rotY += map[e.key][1]; hint.classList.add('gone'); kick(); if (reduce && three) render(performance.now()); }
  });

  // botões da vitrine
  var buttons = document.querySelectorAll('.gem-picker button');
  var current = 'ametista';
  function choose(key) {
    current = key;
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.gem === key ? 'true' : 'false'); });
    fillCard(key);
    if (three) setGem(key); else showFallback();
  }
  buttons.forEach(function (b) { b.addEventListener('click', function () { choose(b.dataset.gem); }); });

  // sem WebGL: mostra uma pedra desenhada
  function showFallback() {
    var g = GEMS[current], box = gemView.querySelector('.gem-fallback');
    if (!box) {
      box = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      box.setAttribute('class', 'gem-fallback'); box.setAttribute('viewBox', '0 0 120 170'); box.setAttribute('role', 'img');
      gemView.appendChild(box); canvas.hidden = true; hint.hidden = true;
    }
    box.setAttribute('aria-label', 'Desenho da ' + g.nome);
    box.innerHTML = '<defs><linearGradient id="fbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + g.c3 + '"/><stop offset=".5" stop-color="' + g.c2 + '"/><stop offset="1" stop-color="' + g.c1 + '"/></linearGradient></defs>' +
      '<path d="M60 4 C82 30 104 62 104 104 C104 140 84 166 60 166 C36 166 16 140 16 104 C16 62 38 30 60 4 Z" fill="url(#fbg)"/>' +
      '<path d="M60 4 L44 70 L16 104 C16 62 38 30 60 4 Z" fill="#fff" opacity=".25"/><path d="M76 70 L104 104 L60 166 Z" fill="#000" opacity=".12"/>';
  }

  three = initThree();
  fillCard('ametista');
  if (three) {
    setGem('ametista');
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas); else window.addEventListener('resize', resize);
    resize();
    new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting; if (visible) kick();
    }, { threshold: 0.05 }).observe(canvas);
  } else {
    showFallback();
  }

  document.getElementById('againBtn').addEventListener('click', function () {
    choose('ametista');
    document.getElementById('vitrine').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  });

  // ===== Caverna de cristais (fundo do museu) =====
  var fx = document.getElementById('caveFx'), ctx = fx.getContext('2d'), crystals = [], caveOn = false, fxRaf = null;
  var PAL = ['#9b6bd6', '#c9a2ff', '#7b4fe0', '#e59ad0', '#7ee0d2', '#b78cff'];

  function buildCrystals() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2), w = window.innerWidth, h = window.innerHeight;
    fx.width = w * dpr; fx.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    crystals = [];
    var s = Math.min(1, w / 900) * 0.6 + 0.4;
    function cluster(bx, by, ang, count) {
      for (var i = 0; i < count; i++) {
        crystals.push({
          x: bx + (Math.random() - 0.5) * 70 * s, y: by + (Math.random() - 0.5) * 30 * s,
          a: ang + (Math.random() - 0.5) * 0.9, len: (40 + Math.random() * 110) * s, wid: (8 + Math.random() * 14) * s,
          col: PAL[(Math.random() * PAL.length) | 0], ph: Math.random() * 6.28, sp: 0.6 + Math.random() * 0.9
        });
      }
    }
    var step = Math.max(110, w / 7);
    for (var x = -20; x < w + 40; x += step) cluster(x + Math.random() * 40, h + 10, -Math.PI / 2, 4);
    for (var y = 60; y < h; y += Math.max(170, h / 4)) {
      cluster(-10, y + Math.random() * 60, 0, 3);
      cluster(w + 10, y + Math.random() * 60, Math.PI, 3);
    }
    for (var x2 = 40; x2 < w; x2 += step * 1.6) cluster(x2 + Math.random() * 60, -10, Math.PI / 2, 2);
  }

  function drawCave(now) {
    var w = window.innerWidth, h = window.innerHeight, t = now / 1000;
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < crystals.length; i++) {
      var c = crystals[i];
      var glow = reduce ? 0.75 : 0.55 + 0.35 * Math.sin(t * c.sp + c.ph);
      var ca = Math.cos(c.a), sa = Math.sin(c.a), px = -sa, py = ca;
      var tipX = c.x + ca * c.len, tipY = c.y + sa * c.len;
      var shX = c.x + ca * c.len * 0.72, shY = c.y + sa * c.len * 0.72;
      ctx.save();
      ctx.globalAlpha = 0.85 * glow;
      ctx.shadowColor = c.col; ctx.shadowBlur = 22 * glow;
      var grd = ctx.createLinearGradient(c.x, c.y, tipX, tipY);
      grd.addColorStop(0, 'rgba(20,12,34,.9)'); grd.addColorStop(0.55, c.col); grd.addColorStop(1, '#ffffff');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.moveTo(c.x + px * c.wid / 2, c.y + py * c.wid / 2);
      ctx.lineTo(shX + px * c.wid / 2, shY + py * c.wid / 2);
      ctx.lineTo(tipX, tipY);
      ctx.lineTo(shX - px * c.wid / 2, shY - py * c.wid / 2);
      ctx.lineTo(c.x - px * c.wid / 2, c.y - py * c.wid / 2);
      ctx.closePath(); ctx.fill();
      ctx.shadowBlur = 0; ctx.globalAlpha = 0.35 * glow; ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.moveTo(c.x, c.y); ctx.lineTo(shX, shY); ctx.lineTo(tipX, tipY);
      ctx.lineTo(shX + px * c.wid / 2, shY + py * c.wid / 2); ctx.lineTo(c.x + px * c.wid / 2, c.y + py * c.wid / 2);
      ctx.closePath(); ctx.fill();
      ctx.restore();
    }
  }
  function caveLoop(now) {
    fxRaf = null;
    if (!caveOn) return;
    drawCave(now);
    if (!reduce) fxRaf = requestAnimationFrame(caveLoop);
  }
  buildCrystals();
  window.addEventListener('resize', function () { buildCrystals(); if (caveOn) drawCave(performance.now()); });
  new IntersectionObserver(function (es) {
    caveOn = es[0].isIntersecting;
    fx.classList.toggle('on', caveOn);
    if (caveOn && !fxRaf) fxRaf = requestAnimationFrame(caveLoop);
  }, { threshold: 0 }).observe(document.getElementById('cave'));

  // ===== Bolhas do mar =====
  if (!reduce) {
    var bub = document.querySelector('.bubbles');
    for (var b = 0; b < 18; b++) {
      var sp = document.createElement('span'), size = 4 + Math.random() * 12;
      sp.style.left = (Math.random() * 100) + '%';
      sp.style.width = sp.style.height = size + 'px';
      sp.style.animationDuration = (9 + Math.random() * 12) + 's';
      sp.style.animationDelay = (-Math.random() * 20) + 's';
      bub.appendChild(sp);
    }
  }

  // ===== Trilha da bike =====
  var stops = Array.prototype.slice.call(document.querySelectorAll('[data-stop]'));
  var bike = document.getElementById('bike'), fill = document.getElementById('routeFill');
  var dots = document.querySelectorAll('.route-dot');
  var ticking = false;
  function updateRoute() {
    ticking = false;
    var y = window.scrollY + window.innerHeight * 0.5;
    var tops = stops.map(function (s) { return s.getBoundingClientRect().top + window.scrollY; });
    var p = 0;
    if (y >= tops[tops.length - 1]) p = tops.length - 1;
    else for (var i = 0; i < tops.length - 1; i++) {
      if (y < tops[i + 1]) { p = i + Math.max(0, Math.min(1, (y - tops[i]) / (tops[i + 1] - tops[i]))); break; }
    }
    var pct = (p / (tops.length - 1)) * 100;
    bike.style.left = pct + '%';
    fill.style.width = pct + '%';
    dots.forEach(function (d, k) { d.classList.toggle('on', p >= k - 0.001); });
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(updateRoute); } }, { passive: true });
  window.addEventListener('resize', updateRoute);
  window.addEventListener('load', updateRoute);
  updateRoute();
})();
