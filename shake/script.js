(function(){
  var zone=document.getElementById('zone'), shaker=document.getElementById('shaker'),
      fill=document.getElementById('fill'), pct=document.getElementById('pct'),
      status=document.getElementById('status'), liquid=document.getElementById('liquid'),
      wave=document.getElementById('wave'), main=document.getElementById('main'),
      tease=document.getElementById('tease'), note=document.getElementById('note'),
      motionBtn=document.getElementById('motionBtn');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var STEPS=[
    {at:0,  t:'sacode o shaker pra misturar o whey'},
    {at:25, t:'misturando… 💪'},
    {at:55, t:'hmm, tá esquentando?'},
    {at:85, t:'isso não parece whey não…'}
  ];
  var progress=0, done=false;

  function setProgress(v){
    if(done) return;
    progress=Math.min(100,v);
    fill.style.width=progress+'%';
    pct.textContent='mistura: '+Math.floor(progress)+'%';
    var y=250-progress*1.3;
    liquid.setAttribute('y',y);
    wave.setAttribute('transform','translate(0,'+(y-250)+')');
    var t=STEPS[0].t; for(var i=0;i<STEPS.length;i++){ if(progress>=STEPS[i].at) t=STEPS[i].t; }
    if(status.textContent!==t) status.textContent=t;
    if(progress>=100) finish();
  }
  function jiggle(){
    if(reduce) return;
    shaker.classList.remove('jiggle'); void shaker.offsetWidth; shaker.classList.add('jiggle');
  }

  // arrastar (mouse e toque)
  var dragging=false, lx=0, ly=0, ox=0, oy=0;
  zone.addEventListener('pointerdown',function(e){
    if(done) return; dragging=true; lx=e.clientX; ly=e.clientY; zone.setPointerCapture(e.pointerId);
  });
  zone.addEventListener('pointermove',function(e){
    if(!dragging||done) return;
    var dx=e.clientX-lx, dy=e.clientY-ly; lx=e.clientX; ly=e.clientY;
    ox=Math.max(-60,Math.min(60,ox+dx)); oy=Math.max(-40,Math.min(40,oy+dy));
    shaker.style.transform='translate('+ox+'px,'+oy+'px) rotate('+(ox/4)+'deg)';
    setProgress(progress+Math.hypot(dx,dy)/28);
  });
  function endDrag(){
    if(!dragging) return; dragging=false; ox=oy=0;
    shaker.style.transition='transform .35s cubic-bezier(.3,1.6,.5,1)';
    shaker.style.transform='';
    setTimeout(function(){shaker.style.transition='';},360);
  }
  zone.addEventListener('pointerup',endDrag);
  zone.addEventListener('pointercancel',endDrag);

  // teclado
  zone.addEventListener('keydown',function(e){
    if((e.key===' '||e.key==='Enter')&&!done){ e.preventDefault(); jiggle(); setProgress(progress+5); }
  });

  // sacudir o celular
  var lastShake=0;
  function onMotion(e){
    var a=e.accelerationIncludingGravity||e.acceleration; if(!a||done) return;
    var m=Math.sqrt((a.x||0)*(a.x||0)+(a.y||0)*(a.y||0)+(a.z||0)*(a.z||0));
    var extra=m-9.8;
    if(extra>6){
      setProgress(progress+Math.min(4,extra/6));
      var now=Date.now(); if(now-lastShake>120){ lastShake=now; jiggle(); }
    }
  }
  var isTouch=window.matchMedia('(pointer: coarse)').matches;
  if(isTouch && typeof DeviceMotionEvent!=='undefined'){
    if(typeof DeviceMotionEvent.requestPermission==='function'){
      motionBtn.style.display='inline-block';
      motionBtn.addEventListener('click',function(){
        DeviceMotionEvent.requestPermission().then(function(r){
          if(r==='granted'){ window.addEventListener('devicemotion',onMotion); motionBtn.style.display='none'; status.textContent='agora sacode o celular!'; }
          else { motionBtn.textContent='Sem permissão: arraste o shaker'; }
        }).catch(function(){ motionBtn.textContent='Sem permissão: arraste o shaker'; });
      });
    } else {
      window.addEventListener('devicemotion',onMotion);
    }
  }

  function finish(){
    done=true; dragging=false;
    shaker.style.transform='';
    status.textContent='pronto. pode abrir.';
    liquid.setAttribute('fill','#FFFFFF'); wave.setAttribute('fill','#FFFFFF');
    document.getElementById('labelA').setAttribute('opacity','0');
    document.getElementById('labelB1').setAttribute('opacity','1');
    document.getElementById('labelB2').setAttribute('opacity','1');
    setTimeout(function(){ zone.classList.add('open'); },350);
    setTimeout(function(){ main.classList.add('hidden-main'); tease.classList.add('show'); },1500);
    setTimeout(function(){ note.classList.add('show'); document.getElementById('again').focus(); },3600);
  }

  document.getElementById('again').addEventListener('click',function(){
    note.classList.remove('show'); tease.classList.remove('show');
    main.classList.remove('hidden-main'); zone.classList.remove('open');
    liquid.setAttribute('fill','#D9B48F'); wave.setAttribute('fill','#D9B48F');
    document.getElementById('labelA').setAttribute('opacity','1');
    document.getElementById('labelB1').setAttribute('opacity','0');
    document.getElementById('labelB2').setAttribute('opacity','0');
    done=false; setProgress(0); zone.focus();
  });
})();
