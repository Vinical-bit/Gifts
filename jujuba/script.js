(function(){
  var FLAG = '<svg class="flag" viewBox="0 0 3 2" role="img" aria-label="Bandeira da Itália"><rect width="1" height="2" fill="#009246"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#CE2B37"/></svg>';
  var MSGS = [
    {t:'moça do cabelo de sol'},
    {h:'<span class="emoji">☀️</span>', label:'sol'},
    {t:'Recife'},
    {h:FLAG, label:'Itália'},
    {t:'nem Van Gogh conseguia copiar sua beleza com pincel'},
    {h:'<span class="emoji">❤️</span>', label:'coração'},
    {t:'franguinha'},
    {t:'la belle de jour'}
  ];

  function shuffle(){
    var ok = false;
    while (!ok){
      for (var i=MSGS.length-1;i>0;i--){
        var j = (Math.random()*(i+1))|0, tmp = MSGS[i]; MSGS[i]=MSGS[j]; MSGS[j]=tmp;
      }
      ok = true;
      for (var k=1;k<MSGS.length;k++){ if (!MSGS[k].t && !MSGS[k-1].t){ ok=false; break; } }
    }
  }
  shuffle();

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var bean = document.getElementById('bean');
  var wrap = document.getElementById('wrap');
  var bubble = document.getElementById('bubble');
  var hint = document.getElementById('hint');
  var progress = document.getElementById('progress');
  var finalEl = document.getElementById('final');
  var eyesOpen = document.getElementById('eyesOpen');
  var eyesSquish = document.getElementById('eyesSquish');
  var mouth = document.getElementById('mouth');

  for (var i=0;i<MSGS.length;i++) progress.appendChild(document.createElement('span'));
  var dots = progress.children;

  var count = 0, pressed = false, done = false;

  // mola
  var sx=1, sy=1, vx=0, vy=0, tx=1, ty=1, raf=null, last=0;
  function tick(now){
    var dt = Math.min(0.032,(now-last)/1000 || 0.016); last = now;
    var k=340, c=10;
    vx += (k*(tx-sx) - c*vx)*dt; sx += vx*dt;
    vy += (k*(ty-sy) - c*vy)*dt; sy += vy*dt;
    wrap.style.transform = 'scale('+sx.toFixed(4)+','+sy.toFixed(4)+')';
    var still = Math.abs(tx-sx)<.001 && Math.abs(ty-sy)<.001 && Math.abs(vx)<.01 && Math.abs(vy)<.01;
    if (still){ sx=tx; sy=ty; wrap.style.transform = (tx===1&&ty===1)?'':wrap.style.transform; raf=null; return; }
    raf = requestAnimationFrame(tick);
  }
  function kick(){ if(!raf){ last=performance.now(); raf=requestAnimationFrame(tick);} }

  function face(squish){
    eyesOpen.style.display = squish?'none':'';
    eyesSquish.style.display = squish?'':'none';
    mouth.setAttribute('d', squish ? 'M147,120 Q156,112 165,120' : 'M148,116 Q156,126 164,115');
  }

  function press(){
    if (done || pressed) return;
    pressed = true;
    wrap.classList.remove('idle');
    tx=1.17; ty=0.78; face(true); kick();
  }
  function release(){
    if (!pressed) return;
    pressed = false;
    tx=1; ty=1; vy += reduce ? 0 : 2.5; face(false); kick();
    next();
  }

  function next(){
    if (count < MSGS.length){
      var m = MSGS[count];
      bubble.classList.remove('show');
      void bubble.offsetWidth;
      if (m.t){ bubble.textContent = m.t; }
      else { bubble.innerHTML = m.h; }
      bubble.classList.add('show');
      dots[count].classList.add('on');
      count++;
      hint.textContent = count < MSGS.length ? 'aperta de novo' : 'mais uma vez…';
    } else {
      finale();
    }
  }

  function finale(){
    done = true;
    bubble.classList.remove('show');
    hint.textContent = '';
    wrap.classList.add('gone');
    if (!reduce) burst();
    setTimeout(function(){ finalEl.classList.add('show'); document.getElementById('again').focus(); }, reduce?100:650);
  }

  function reset(){
    finalEl.classList.remove('show');
    wrap.classList.remove('gone');
    wrap.style.transform=''; sx=sy=tx=ty=1; vx=vy=0;
    if (!reduce) wrap.classList.add('idle');
    for (var i=0;i<dots.length;i++) dots[i].classList.remove('on');
    count=0; done=false; shuffle();
    hint.textContent='aperta a jujuba';
    bean.focus();
  }

  bean.addEventListener('pointerdown', function(e){ e.preventDefault(); press(); });
  window.addEventListener('pointerup', release);
  window.addEventListener('pointercancel', release);
  bean.addEventListener('keydown', function(e){
    if ((e.key===' '||e.key==='Enter') && !e.repeat){ e.preventDefault(); press(); }
  });
  bean.addEventListener('keyup', function(e){
    if (e.key===' '||e.key==='Enter'){ e.preventDefault(); release(); }
  });
  bean.addEventListener('click', function(e){ e.preventDefault(); });
  document.getElementById('again').addEventListener('click', reset);

  // chuva de mini jujubas
  var cv = document.getElementById('fx'), ctx = cv.getContext('2d'), parts=[], fxRaf=null;
  function size(){
    var d = window.devicePixelRatio||1;
    cv.width = innerWidth*d; cv.height = innerHeight*d; ctx.setTransform(d,0,0,d,0,0);
  }
  size(); window.addEventListener('resize', size);
  var COLORS = ['#F7A8C4','#E57FA5','#FFC2D6','#FFD27A','#FFB3C9','#F48FB1'];
  function burst(){
    var r = wrap.getBoundingClientRect();
    var cx = r.left + r.width/2, cy = r.top + r.height/2;
    for (var i=0;i<110;i++){
      var a = Math.random()*Math.PI*2, s = 4 + Math.random()*9;
      parts.push({x:cx,y:cy,vx:Math.cos(a)*s,vy:Math.sin(a)*s-5,
        r:Math.random()*6.28,vr:(Math.random()-.5)*.3,
        w:10+Math.random()*8,h:6+Math.random()*4,
        c:COLORS[(Math.random()*COLORS.length)|0],life:0});
    }
    if (!fxRaf) fxRaf = requestAnimationFrame(fx);
  }
  function fx(){
    ctx.clearRect(0,0,innerWidth,innerHeight);
    for (var i=parts.length-1;i>=0;i--){
      var p = parts[i];
      p.vy += .22; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life++;
      if (p.y > innerHeight+30){ parts.splice(i,1); continue; }
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.r);
      ctx.fillStyle = p.c; ctx.beginPath();
      ctx.ellipse(0,0,p.w/2,p.h/2,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='rgba(255,255,255,.55)'; ctx.beginPath();
      ctx.ellipse(-p.w/6,-p.h/6,p.w/6,p.h/7,0,0,Math.PI*2); ctx.fill();
      ctx.restore();
    }
    fxRaf = parts.length ? requestAnimationFrame(fx) : null;
  }
})();
