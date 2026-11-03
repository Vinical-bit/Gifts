(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = root.classList.contains('static');
  var NS = 'http://www.w3.org/2000/svg';
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function clamp(x, a, b) { a = a === undefined ? 0 : a; b = b === undefined ? 1 : b; return Math.min(b, Math.max(a, x)); }
  function sm(a, b, x) { var t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function el(name, attrs, parent) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) { e.setAttribute(k, attrs[k]); }
    if (parent) { parent.appendChild(e); }
    return e;
  }
  var seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }

  /* ---------- intro rose ---------- */
  (function () {
    var g = $('#rose');
    [{ r: 1, rot: 0, f: '#fbf8f3' }, { r: .72, rot: 36, f: '#f6efe6' }, { r: .46, rot: 0, f: '#efe5d8' }].forEach(function (L) {
      for (var k = 0; k < 5; k++) {
        el('ellipse', { cx: 0, cy: -34 * L.r, rx: 36 * L.r, ry: 50 * L.r, fill: L.f, stroke: '#d6c9ba', 'stroke-width': 1.5, transform: 'rotate(' + (L.rot + k * 72) + ')' }, g);
      }
    });
    el('circle', { r: 9, fill: '#e3d6c4', stroke: '#cbbba8' }, g);
    el('path', { d: 'M0 0 q6 -2 6 -7 q0 -8 -9 -6', fill: 'none', stroke: '#b9a894', 'stroke-width': 1.6, 'stroke-linecap': 'round' }, g);
  })();

  /* ---------- progress beads: Te | amo, | Mari ---------- */
  var beadsBox = $('#beads');
  var beads = [];
  for (var bi = 0; bi < 9; bi++) {
    var b = document.createElement('b');
    beadsBox.appendChild(b);
    beads.push(b);
    if (bi === 1 || bi === 4) { beadsBox.appendChild(document.createElement('i')); }
  }

  /* ---------- scene 1 art ---------- */
  (function () {
    var lg = $('#lashes');
    for (var i = 0; i <= 22; i++) {
      var t = .07 + i * (.86 / 22), u = 1 - t;
      var x = u * u * 10 + 2 * u * t * 200 + t * t * 390;
      var y = u * u * 200 + 2 * u * t * 40 + t * t * 200;
      var dx = 2 * u * 190 + 2 * t * 190, dy = 2 * u * -160 + 2 * t * 160;
      var L = Math.sqrt(dx * dx + dy * dy), nx = dy / L, ny = -dx / L;
      var len = 16 + 9 * Math.sin(Math.PI * t);
      el('line', { x1: x, y1: y, x2: x + nx * len, y2: y + ny * len, stroke: '#2a1a1a', 'stroke-width': 3.2, 'stroke-linecap': 'round' }, lg);
    }
    var ig = $('#irisStreaks');
    for (var j = 0; j < 72; j++) {
      var a = j / 72 * Math.PI * 2, r1 = 38 + rnd() * 8, r2 = 70 + rnd() * 22;
      el('line', { x1: 200 + Math.cos(a) * r1, y1: 200 + Math.sin(a) * r1, x2: 200 + Math.cos(a) * r2, y2: 200 + Math.sin(a) * r2, stroke: j % 2 ? 'rgba(255,255,255,.16)' : 'rgba(0,40,20,.3)' }, ig);
    }
    var wv = $('#waves'), d = 'M-100 0';
    for (var w = 0; w < 14; w++) { d += (w === 0 ? ' q25 -8 50 0' : ' t50 0'); }
    [[430, 'wave-a', .5], [472, 'wave-b', .4], [522, 'wave-c', .35], [580, 'wave-a', .3]].forEach(function (c) {
      var g = el('g', { transform: 'translate(0 ' + c[0] + ')' }, wv);
      var p = el('path', { d: d, opacity: c[2], class: c[1] }, g);
    });
    function palm(x, y, s, flip) {
      var g = el('g', { transform: 'translate(' + x + ' ' + y + ') scale(' + (flip ? -s : s) + ' ' + s + ')' });
      var sway = el('g', { class: 'sway' }, g);
      el('path', { d: 'M0 0 C 6 -60 -4 -120 14 -190', stroke: '#6b4a2f', 'stroke-width': 11, fill: 'none', 'stroke-linecap': 'round' }, sway);
      var top = el('g', { transform: 'translate(14 -190)' }, sway);
      [-170, -140, -108, -72, -38, -6, 24].forEach(function (a, i) {
        el('path', { d: 'M0 0 Q 42 -34 100 -4 Q 54 -14 0 0Z', fill: i % 2 ? '#2f7d4f' : '#3d9a62', transform: 'rotate(' + a + ')' }, top);
      });
      el('circle', { r: 7, cx: -4, cy: 7, fill: '#5b3d27' }, top);
      el('circle', { r: 7, cx: 8, cy: 9, fill: '#5b3d27' }, top);
      return g;
    }
    var pg = $('#palms');
    pg.appendChild(palm(62, 700, .85, false));
    pg.appendChild(palm(344, 712, .66, true));
  })();

  /* ---------- scene 2 art ---------- */
  (function () {
    var fg = $('#flowers'), cols = ['#ff6f91', '#ffd166', '#9b6bd1', '#ffffff', '#ff9e5e'];
    for (var i = 0; i < 46; i++) {
      var x = rnd() * 400, y = 640 + rnd() * 150;
      el('line', { x1: x, y1: y, x2: x, y2: y + 14, stroke: '#2f7d45', 'stroke-width': 2 }, fg);
      el('circle', { cx: x, cy: y, r: 6, fill: cols[i % 5] }, fg);
      el('circle', { cx: x, cy: y, r: 2.2, fill: '#f5c542' }, fg);
    }
  })();

  /* ---------- scene 3 art ---------- */
  var vg = [];
  (function () {
    function spiral(cx, cy, r0, r1, turns, a0) {
      var pts = [], N = 60;
      for (var i = 0; i <= N; i++) {
        var t = i / N, a = a0 + t * turns * Math.PI * 2, r = lerp(r0, r1, t);
        pts.push((cx + Math.cos(a) * r).toFixed(1) + ' ' + (cy + Math.sin(a) * r).toFixed(1));
      }
      return 'M' + pts.join(' L');
    }
    function waveD(y) { return 'M50 ' + y + ' q37 -22 75 0 t75 0 t75 0 t75 0 t75 0'; }
    var defs = [
      [spiral(92, 190, 4, 50, 2.3, 0), '#f4d35e', 8],
      [waveD(130), '#4f7bd6', 9],
      [spiral(310, 176, 4, 44, 2.1, 1.2), '#9cc3f5', 8],
      [spiral(200, 330, 100, 100, .3, -2.5), '#ffffff', 6],
      [waveD(238), '#2b4a9b', 9],
      [spiral(88, 448, 4, 52, 2.4, 2.1), '#7ea7ee', 8],
      [spiral(314, 452, 4, 48, 2.2, .4), '#f9e79f', 8],
      [spiral(200, 330, 116, 116, .3, .8), '#9cc3f5', 6],
      [waveD(510), '#4f7bd6', 9],
      [waveD(548), '#ffffff', 7]
    ];
    var g = $('#vgStrokes');
    defs.forEach(function (d, i) {
      var n = el('path', { d: d[0], stroke: d[1], 'stroke-width': d[2], pathLength: 1 }, g);
      n.style.strokeDasharray = '1 1';
      n.style.strokeDashoffset = 1;
      n.style.opacity = 0;
      vg.push({ n: n, len: n.getTotalLength(), a: .04 + i * .075, b: .04 + i * .075 + .2 });
    });
    var sg = $('#vgStars');
    for (var i = 0; i < 9; i++) {
      var c = el('circle', { cx: 60 + rnd() * 280, cy: 112 + rnd() * 440, r: 2 + rnd() * 2, fill: '#fff6c8', class: 'twinkle' }, sg);
      c.style.animationDelay = (rnd() * 2) + 's';
    }
    var wg = $('#wings');
    var wl = ['M190 410 C 150 400 96 360 60 300', 'M188 420 C 146 414 92 392 54 352', 'M188 432 C 150 430 104 420 68 392', 'M190 444 C 160 446 124 444 94 430'];
    [false, true].forEach(function (flip) {
      var gg = el('g', flip ? { transform: 'translate(400 0) scale(-1 1)' } : {}, wg);
      wl.forEach(function (d) {
        var n = el('path', { d: d, pathLength: 1 }, gg);
        n.style.strokeDasharray = '1 1';
        n.style.strokeDashoffset = 1;
      });
    });
  })();

  /* ---------- scene 4 art ---------- */
  var bars = [], pulse = 0;
  (function () {
    var w = $('#wave');
    for (var i = 0; i < 33; i++) { var b = document.createElement('i'); w.appendChild(b); bars.push(b); }
    var nb = $('#notes'), ch = ['♪', '♫', '♪', '♫', '♪', '♫', '♪', '♫'];
    ch.forEach(function (c, i) {
      var s = document.createElement('span');
      s.textContent = c;
      s.style.left = (6 + rnd() * 88) + '%';
      s.style.fontSize = (18 + rnd() * 16) + 'px';
      s.style.animationDuration = (7 + rnd() * 5) + 's';
      s.style.animationDelay = (-rnd() * 10) + 's';
      nb.appendChild(s);
    });
    $('#tap').addEventListener('click', function () { pulse = 1; });
  })();

  /* ---------- scene 5 art ---------- */
  var COLS = 10, ROWS = 9, CW = 30, RH = 20, X0 = 30, YB = 240;
  var stitches = [], links = [], knot, hook = $('#hook');
  (function () {
    var palette = ['#f4f1ec', '#e7b5c6', '#8e6cbf', '#4fae7c'];
    var sg = $('#stitches'), cg = $('#chain');
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        var x = X0 + c * CW, y = YB - (r + 1) * RH;
        var n = el('path', { d: 'M' + x + ' ' + y + ' L' + (x + CW / 2) + ' ' + (y + RH) + ' L' + (x + CW) + ' ' + y, fill: 'none', stroke: palette[Math.floor(r / 2) % 4], 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, sg);
        n.style.opacity = 0;
        stitches.push({ n: n, x: x + CW / 2, y: y + RH });
      }
    }
    for (var i = 0; i < COLS; i++) {
      var e = el('ellipse', { cx: X0 + CW / 2 + i * CW, cy: 252, rx: 17, ry: 9, stroke: '#f4f1ec', 'stroke-width': 4 }, cg);
      e.style.opacity = 0;
      links.push(e);
    }
    knot = el('g', {}, cg);
    el('circle', { cx: 14, cy: 252, r: 8, fill: 'none', stroke: '#f4f1ec', 'stroke-width': 4 }, knot);
    el('path', { d: 'M14 260 q-10 12 -2 26 q8 12 -3 26', stroke: '#f4f1ec', 'stroke-width': 3 }, knot);
    knot.style.opacity = 0;
  })();
  var letterNodes = [];
  (function () {
    var box = $('#letters');
    'Te amo, Mari.'.split('').forEach(function (ch) {
      var s = document.createElement('span');
      s.textContent = ch;
      box.appendChild(s);
      letterNodes.push(s);
    });
  })();

  /* ---------- scene updates ---------- */
  var eye = $('#eye'), beach = $('#beach'), sunGlow = $('#sunGlow');
  function s1(p) {
    eye.style.transform = 'translate(-50%,-50%) scale(' + lerp(3.2, .9, sm(0, .62, p)) + ')';
    eye.style.opacity = 1 - sm(.48, .78, p);
    beach.style.opacity = sm(.4, .78, p);
    sunGlow.setAttribute('r', lerp(100, 140, sm(.7, 1, p)));
  }
  var world = $('#world'), gem = $('#gem');
  function s2(p) {
    var c = sm(.12, .85, p);
    world.style.filter = 'grayscale(' + (1 - c) + ') saturate(' + (.6 + .5 * c) + ') brightness(' + (.85 + .15 * c) + ')';
    var g = sm(.78, .95, p);
    gem.style.opacity = g;
    gem.style.transform = 'translate(-50%,-50%) scale(' + lerp(.6, 1, g) + ')';
  }
  var brush = $('#brush'), halo = $('#halo'), wingPaths = $$('#wings path'), starsG = $('#vgStars');
  function s3(p) {
    var active = null;
    vg.forEach(function (s) {
      var t = sm(s.a, s.b, p);
      s.n.style.strokeDashoffset = 1 - t;
      s.n.style.opacity = t > 0 ? 1 : 0;
      if (t > 0 && t < 1) { active = { s: s, t: t }; }
    });
    if (active) {
      var pt = active.s.n.getPointAtLength(active.t * active.s.len);
      brush.setAttribute('transform', 'translate(' + pt.x + ' ' + pt.y + ')');
      brush.style.opacity = 1;
    } else { brush.style.opacity = 0; }
    halo.style.opacity = sm(.55, .8, p);
    var wt = sm(.72, .95, p);
    wingPaths.forEach(function (n) { n.style.strokeDashoffset = 1 - wt; });
    starsG.style.opacity = sm(.1, .5, p);
  }
  function s4(p, t) {
    var tt = t / 1000, amp = (.3 + .7 * sm(.05, .6, p)) * (1 + pulse * .8);
    for (var i = 0; i < bars.length; i++) {
      var env = .3 + .7 * Math.sin(Math.PI * i / (bars.length - 1));
      var v = .5 + .5 * Math.sin(tt * 2.3 + i * .5) * Math.sin(tt * .9 + i * .21);
      bars[i].style.height = clamp((8 + 88 * v * env) * amp, 4, 100) + '%';
    }
    pulse *= .985;
  }
  var blanket = $('#blanket'), letters = letterNodes, smallEl = $('.final .small'), signEl = $('.final .sign');
  function s5(p) {
    var cp = sm(.04, .36, p) * COLS;
    links.forEach(function (l, i) { l.style.opacity = clamp(cp - i); });
    knot.style.opacity = sm(.02, .06, p);
    var sp = sm(.46, .74, p) * stitches.length;
    stitches.forEach(function (s, i) { s.n.style.opacity = clamp(sp - i); });
    var hx = 0, hy = 0, show = 0;
    if (p > .04 && p < .37) {
      hx = X0 + CW / 2 + clamp(Math.floor(cp), 0, COLS - 1) * CW; hy = 252; show = 1;
    } else if (sp > 0 && sp < stitches.length) {
      var s = stitches[clamp(Math.floor(sp), 0, stitches.length - 1)]; hx = s.x; hy = s.y; show = 1;
    }
    hook.style.opacity = show;
    if (show) { hook.setAttribute('transform', 'translate(' + hx + ' ' + hy + ')'); }
    var e = sm(.74, .88, p);
    blanket.style.transform = 'translate(-50%,-50%) translateY(' + (-e * 15) + 'vh) scale(' + lerp(1, .66, e) + ')';
    letters.forEach(function (n, i) { n.style.opacity = sm(.86 + i * .007, .86 + i * .007 + .03, p); });
    smallEl.style.opacity = sm(.94, .97, p);
    signEl.style.opacity = sm(.96, .99, p);
  }

  /* ---------- main loop ---------- */
  var scenes = [
    { n: $('#s1'), fn: s1 }, { n: $('#s2'), fn: s2 }, { n: $('#s3'), fn: s3 },
    { n: $('#s4'), fn: s4 }, { n: $('#s5'), fn: s5 }
  ];
  scenes.forEach(function (S) {
    S.caps = $$('.cap', S.n).map(function (c) { return { n: c, a: +c.dataset.a, b: +c.dataset.b }; });
  });
  var hudFill = $('#hudFill');
  function hud() {
    var max = document.documentElement.scrollHeight - innerHeight;
    var o = max > 0 ? clamp(scrollY / max) : 0;
    hudFill.style.width = (o * 100) + '%';
    beads.forEach(function (b, i) { b.classList.toggle('on', o >= (i + 1) / 9 * .97); });
  }
  function frame(t) {
    var vh = innerHeight;
    scenes.forEach(function (S) {
      var r = S.n.getBoundingClientRect();
      if (r.bottom < -vh * .2 || r.top > vh * 1.2) { S.n.classList.remove('live'); return; }
      S.n.classList.add('live');
      var total = r.height - vh, p = clamp(total > 0 ? -r.top / total : 0);
      S.caps.forEach(function (c) {
        var o = sm(c.a, c.a + .05, p) * (1 - sm(c.b - .05, c.b, p));
        c.n.style.opacity = o;
        c.n.style.transform = 'translate(-50%,' + ((1 - o) * 14) + 'px)';
      });
      S.fn(p, t);
    });
    hud();
    requestAnimationFrame(frame);
  }
  if (reduce) {
    scenes.forEach(function (S) { S.fn(1, 0); });
    beads.forEach(function (b) { b.classList.add('on'); });
  } else {
    requestAnimationFrame(frame);
  }
})();
