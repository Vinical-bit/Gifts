(function(){
var SETS = [
  { load:17, add:7,   decay:12, time:10 },
  { load:18, add:6,   decay:15, time:10 },
  { load:19, add:5.5, decay:16, time:11 }
];
var LINES = [
  "tipo assim, sobe essa barra.",
  "tipo assim, é só mais uma.",
  "tipo assim, respira e empurra.",
  "tipo assim, é tudo você, eu nem tô encostando.",
  "tipo assim, compila esse PR.",
  "tipo assim, nenhum bug te segura hoje.",
  "tipo assim, olha o peito, não o celular."
];
var FAIL = [
  "Tipo assim, faz parte. Até o git tem revert.",
  "Tipo assim, a barra venceu essa. Você vence a próxima.",
  "Tipo assim, foi só um erro de compilação. Roda de novo."
];

var $ = function(id){ return document.getElementById(id); };
var screens = { start:$('s-start'), game:$('s-game'), end:$('s-end') };
function show(name){
  Object.keys(screens).forEach(function(k){ screens[k].classList.toggle('on', k===name); });
}

var setIdx = 0, p = 0, tLeft = 0, running = false, last = 0, lineTimer = 0;

var plate = $('plate'), arm = $('arm');
var SHOULDER = { x:150, y:146 }, L = 36, HAND_X = 158;
var Y_LOW = 128, Y_HIGH = 76;

function draw(){
  var y = Y_LOW - (Y_LOW - Y_HIGH) * (p/100);
  var shake = running && p > 55 ? (Math.random()-.5) * (0.6 + setIdx*0.5) : 0;
  plate.setAttribute('transform', 'translate(' + (HAND_X + shake) + ',' + y + ')');
  var dx = HAND_X - SHOULDER.x, dy = y - SHOULDER.y;
  var d = Math.min(Math.sqrt(dx*dx + dy*dy), 2*L - .01);
  var mx = (SHOULDER.x + HAND_X)/2, my = (SHOULDER.y + y)/2;
  var h = Math.sqrt(Math.max(0, L*L - (d/2)*(d/2)));
  var nx = -dy/d, ny = dx/d;
  if (nx < 0){ nx = -nx; ny = -ny; }
  var ex = mx + nx*h, ey = my + ny*h;
  arm.setAttribute('points', SHOULDER.x+','+SHOULDER.y+' '+ex.toFixed(1)+','+ey.toFixed(1)+' '+(HAND_X+shake)+','+y.toFixed(1));
  $('meterFill').style.height = p + '%';
  var s = SETS[setIdx];
  var ratio = Math.max(0, tLeft / s.time);
  var tb = $('timerBar');
  tb.style.transform = 'scaleX(' + ratio + ')';
  tb.classList.toggle('low', ratio < .3);
}

function spot(){
  $('spotterLine').textContent = LINES[Math.floor(Math.random()*LINES.length)];
}

function startSet(){
  var s = SETS[setIdx];
  p = 0; tLeft = s.time; running = true; last = performance.now(); lineTimer = 0;
  $('setLabel').textContent = 'Série ' + (setIdx+1) + ' de 3';
  $('loadLabel').textContent = s.load;
  $('plateText').textContent = s.load;
  $('ovFail').classList.remove('on');
  $('ovSet').classList.remove('on');
  spot();
  draw();
  $('btnPush').focus();
  requestAnimationFrame(loop);
}

function loop(now){
  if(!running) return;
  var dt = Math.min(.05, (now - last)/1000); last = now;
  var s = SETS[setIdx];
  if (p >= 100){ p = 100; draw(); win(); return; }
  p = Math.max(0, p - s.decay*dt);
  tLeft -= dt;
  lineTimer += dt;
  if (lineTimer > 2.6){ lineTimer = 0; spot(); }
  if (tLeft <= 0){ tLeft = 0; draw(); fail(); return; }
  draw();
  requestAnimationFrame(loop);
}

function push(){
  if(!running) return;
  p = Math.min(100, p + SETS[setIdx].add);
  if (p >= 100){ running = false; draw(); win(); return; }
  var b = $('btnPush'); b.classList.add('hit');
  setTimeout(function(){ b.classList.remove('hit'); }, 60);
}

function fail(){
  running = false;
  $('failText').textContent = FAIL[Math.floor(Math.random()*FAIL.length)];
  $('ovFail').classList.add('on');
  $('btnRetry').focus();
}

function win(){
  running = false;
  if (setIdx === SETS.length - 1){
    setTimeout(function(){ show('end'); confetti(); $('btnAgain').focus(); }, 350);
    return;
  }
  var next = SETS[setIdx+1].load;
  $('setText').textContent = 'Tipo assim, ' + SETS[setIdx].load + ' subiu fácil. Agora é ' + next + '.';
  $('ovSet').classList.add('on');
  $('btnNext').focus();
}

$('btnStart').addEventListener('click', function(){ setIdx = 0; show('game'); startSet(); });
$('btnRetry').addEventListener('click', startSet);
$('btnNext').addEventListener('click', function(){ setIdx++; startSet(); });
$('btnAgain').addEventListener('click', function(){ setIdx = 0; show('game'); startSet(); });

var pushBtn = $('btnPush');
pushBtn.addEventListener('pointerdown', function(e){ e.preventDefault(); push(); });
pushBtn.addEventListener('keydown', function(e){ if(e.key==='Enter'){ e.preventDefault(); push(); } });
document.addEventListener('keydown', function(e){
  if (e.code === 'Space' && screens.game.classList.contains('on')){
    e.preventDefault(); if(!e.repeat) push();
  }
});

/* easter egg: digitar "tipo assim" em qualquer tela */
var buffer = '';
var toastT;
document.addEventListener('keydown', function(e){
  if (e.key.length !== 1) return;
  buffer = (buffer + e.key.toLowerCase()).slice(-10);
  if (buffer === 'tipo assim'){
    var t = $('toast');
    t.textContent = '> "tipo assim" detectado. +1 de força desbloqueado desde 2024.';
    t.classList.add('on');
    clearTimeout(toastT);
    toastT = setTimeout(function(){ t.classList.remove('on'); }, 3200);
    if (running){ p = Math.min(100, p + 15); if (p >= 100){ running = false; draw(); win(); } }
  }
});

/* confete com as cores das anilhas */
function confetti(){
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var c = $('confetti'), ctx = c.getContext('2d');
  var W = c.width = window.innerWidth, H = c.height = window.innerHeight;
  var colors = ['#c8322b','#2a5bd7','#e2b01f','#2e8b57','#eceae4'];
  var parts = [];
  for (var i=0;i<140;i++){
    parts.push({ x:Math.random()*W, y:-20 - Math.random()*H*.5, r:4+Math.random()*6,
      vx:(Math.random()-.5)*2, vy:2+Math.random()*3, a:Math.random()*6, va:(Math.random()-.5)*.2,
      c:colors[i%colors.length] });
  }
  var start = performance.now();
  (function frame(now){
    ctx.clearRect(0,0,W,H);
    parts.forEach(function(q){
      q.x += q.vx; q.y += q.vy; q.a += q.va;
      ctx.save(); ctx.translate(q.x,q.y); ctx.rotate(q.a);
      ctx.fillStyle = q.c; ctx.fillRect(-q.r/2,-q.r/2,q.r,q.r*.6);
      ctx.restore();
    });
    if (now - start < 4500) requestAnimationFrame(frame); else ctx.clearRect(0,0,W,H);
  })(start);
}

draw();
})();
