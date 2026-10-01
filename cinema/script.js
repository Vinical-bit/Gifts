(function(){
  // ===== Cômodos da Casa das Rosas: troque cor, nome e significado =====
  // A rosa do final usa estas mesmas cores.
  var SALAS = [
    {cor:'#8C3B4A', nome:'sala 1', significado:'[cada cor tem um significado]'},
    {cor:'#2F4A45', nome:'sala 2', significado:'[cada cor tem um significado]'},
    {cor:'#B07D2C', nome:'sala 3', significado:'[cada cor tem um significado]'},
  ];
  var PALETA = SALAS.map(function(s){ return s.cor; });

  // ===== Créditos =====
  var CARDS = [
    {bg:'#0B0A09', html:'<p class="small">uma festa qualquer apresenta</p>', t:3200},
    {bg:'#0B0A09', html:'<p class="small">no papel principal</p><p class="title">SOFIA</p>', t:4200},
    {bg:'#1C1A17', html:'<p class="small">locação</p><p class="big">Avenida Paulista</p>', t:3400},
    {bg:'#1C1A17', html:'<p class="small">direção de arte</p><p class="big">os cômodos da<br><span class="ital">Casa das Rosas</span></p>', t:3200}
  ].concat(SALAS.map(function(s){
    return {bg:s.cor, html:'<p class="small">'+s.nome+'</p><p class="big">'+s.significado+'</p>', t:4200};
  })).concat([
    {bg:'#0B0A09', html:'<p class="small">efeitos especiais</p><p class="big">nenhum aparelho estava<br>programado pra esta cena</p><p class="note">— com licença, Flusser</p>', t:4800},
    {bg:'#0B0A09', scene:'house', t:6800},
    {bg:'#0B0A09', scene:'rose', html:'<p class="small">cena 2</p><p class="big ital">em breve</p><p class="note">locação a definir. você escolhe.</p>', t:0}
  ]);

  function isLight(hex){
    var h=hex.replace('#',''); var r=parseInt(h.substr(0,2),16),g=parseInt(h.substr(2,2),16),b=parseInt(h.substr(4,2),16);
    return (0.299*r+0.587*g+0.114*b) > 150;
  }

  // ===== Casa das Rosas: casarão de estilo clássico francês, telhado de ardósia
  // bem inclinado com sótão, porão, escadaria externa e jardim de roseiras =====
  var WALL='#D2A796', TRIM='#EFE4D2', SLATE='#3B3F4A', GLASS='#E9B866';
  function win(x,y,w,h,arch){
    var s='<rect x="'+(x-3)+'" y="'+(y-3)+'" width="'+(w+6)+'" height="'+(h+6)+'" fill="'+TRIM+'"/>';
    if(arch) s+='<path d="M'+(x-3)+','+(y+3)+' A'+(w/2+3)+','+(w/2+3)+' 0 0 1 '+(x+w+3)+','+(y+3)+'" fill="'+TRIM+'"/>'+
               '<path d="M'+x+','+(y+3)+' A'+(w/2)+','+(w/2)+' 0 0 1 '+(x+w)+','+(y+3)+' L'+(x+w)+','+(y+h)+' L'+x+','+(y+h)+'Z" fill="'+GLASS+'"/>';
    else s+='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+GLASS+'"/>';
    s+='<line x1="'+(x+w/2)+'" y1="'+(y+(arch?-w/2+3:0))+'" x2="'+(x+w/2)+'" y2="'+(y+h)+'" stroke="'+TRIM+'" stroke-width="1.4"/>';
    s+='<line x1="'+x+'" y1="'+(y+h*.45)+'" x2="'+(x+w)+'" y2="'+(y+h*.45)+'" stroke="'+TRIM+'" stroke-width="1.2"/>';
    return s;
  }
  function balustrade(x1,x2,y){
    var s='<rect x="'+x1+'" y="'+(y-2)+'" width="'+(x2-x1)+'" height="3" fill="'+TRIM+'"/><rect x="'+x1+'" y="'+(y+10)+'" width="'+(x2-x1)+'" height="3" fill="'+TRIM+'"/>';
    for(var x=x1+3;x<x2-2;x+=5) s+='<rect x="'+x+'" y="'+(y+1)+'" width="2.4" height="9" rx="1" fill="'+TRIM+'"/>';
    return s;
  }
  var HOUSE_SVG = (function(){
    var s='<svg viewBox="0 0 400 320" role="img" aria-label="Ilustração da Casa das Rosas entre os prédios da Paulista">'+
      '<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0C0C14"/><stop offset="1" stop-color="#1D1A24"/></linearGradient></defs>'+
      '<rect width="400" height="320" fill="url(#sky)"/>';
    // prédios modernos da Paulista ao fundo
    [[0,40,60],[46,10,50],[300,20,56],[350,0,50],[96,70,36],[268,60,36]].forEach(function(b){
      s+='<rect x="'+b[0]+'" y="'+b[1]+'" width="'+b[2]+'" height="'+(240-b[1])+'" fill="#17161E"/>';
      for(var yy=b[1]+8;yy<230;yy+=12) for(var xx=b[0]+5;xx<b[0]+b[2]-6;xx+=9)
        if(((xx*7+yy*3)%5)===0) s+='<rect x="'+xx+'" y="'+yy+'" width="4" height="5" fill="#C9A35A" opacity=".55"/>';
    });
    // telhado de ardósia (mansarda) com águas-furtadas e chaminés
    s+='<rect x="120" y="40" width="10" height="34" fill="'+SLATE+'"/><rect x="270" y="40" width="10" height="34" fill="'+SLATE+'"/>'+
       '<rect x="118" y="38" width="14" height="5" fill="'+TRIM+'"/><rect x="268" y="38" width="14" height="5" fill="'+TRIM+'"/>'+
       '<polygon points="82,118 318,118 292,62 108,62" fill="'+SLATE+'"/>'+
       '<polygon points="160,118 240,118 228,48 172,48" fill="#353944"/>';
    [[124,84],[186,70],[260,84]].forEach(function(d){
      s+='<polygon points="'+(d[0]-4)+','+(d[1]+2)+' '+(d[0]+11)+','+(d[1]-12)+' '+(d[0]+26)+','+(d[1]+2)+'" fill="'+TRIM+'"/>'+
         '<rect x="'+d[0]+'" y="'+(d[1]+2)+'" width="22" height="22" fill="'+TRIM+'"/>'+
         '<path d="M'+(d[0]+4)+','+(d[1]+24)+' L'+(d[0]+4)+','+(d[1]+12)+' A7,7 0 0 1 '+(d[0]+18)+','+(d[1]+12)+' L'+(d[0]+18)+','+(d[1]+24)+'Z" fill="'+GLASS+'"/>';
    });
    // corpo da casa
    s+='<rect x="84" y="118" width="232" height="130" fill="'+WALL+'"/>'+
       '<rect x="168" y="112" width="64" height="136" fill="#D9B2A2"/>'+
       '<rect x="80" y="114" width="240" height="7" fill="'+TRIM+'"/>'+
       '<rect x="84" y="176" width="232" height="4" fill="'+TRIM+'"/>';
    [84,166,232,312].forEach(function(x){ s+='<rect x="'+x+'" y="118" width="4" height="114" fill="'+TRIM+'"/>'; });
    // andar superior
    s+=win(100,130,20,34)+win(136,130,20,34)+win(244,130,20,34)+win(280,130,20,34)+win(186,126,28,38,true);
    s+=balustrade(176,224,166);
    // térreo elevado
    s+=win(100,190,20,36,true)+win(136,190,20,36,true)+win(244,190,20,36,true)+win(280,190,20,36,true);
    // porão
    s+='<rect x="84" y="232" width="232" height="16" fill="#BE9282"/><rect x="84" y="232" width="232" height="2" fill="'+TRIM+'"/>';
    [102,138,246,282].forEach(function(x){ s+='<rect x="'+x+'" y="237" width="16" height="7" fill="#2A2420"/>'; });
    // porta central com arco
    s+='<rect x="182" y="184" width="36" height="48" fill="'+TRIM+'"/>'+
       '<path d="M182,196 A18,18 0 0 1 218,196" fill="'+TRIM+'"/>'+
       '<path d="M186,232 L186,198 A14,14 0 0 1 214,198 L214,232 Z" fill="#F6E7C8"/>'+
       '<rect class="leaf l" x="186" y="184" width="14" height="48" fill="#4A2A22"/>'+
       '<rect class="leaf r" x="200" y="184" width="14" height="48" fill="#4A2A22"/>';
    // escadaria de mármore
    for(var i=0;i<5;i++) s+='<rect x="'+(176-i*5)+'" y="'+(232+i*4)+'" width="'+(48+i*10)+'" height="4" fill="'+(i%2?'#E3D8C6':'#EFE6D8')+'"/>';
    s+=balustrade(150,174,236)+balustrade(226,250,236);
    // jardim de roseiras (canteiros geométricos)
    s+='<rect x="0" y="252" width="400" height="68" fill="#16211A"/>'+
       '<polygon points="180,252 220,252 250,320 150,320" fill="#B9AE98" opacity=".55"/>';
    [[20,262,110,22],[20,292,110,22],[270,262,110,22],[270,292,110,22]].forEach(function(c){
      s+='<rect x="'+c[0]+'" y="'+c[1]+'" width="'+c[2]+'" height="'+c[3]+'" rx="4" fill="#26402A" stroke="#3E5E3F"/>';
      for(var k=0;k<9;k++) s+='<circle cx="'+(c[0]+8+k*12)+'" cy="'+(c[1]+7+(k%2)*8)+'" r="3.6" fill="'+['#C2414F','#E07A8B','#A8323E','#F0B5C0'][k%4]+'"/>';
    });
    return s+'</svg>';
  })();

  function roseSVG(){
    var rings = [{n:8,len:64,w:30,off:0},{n:6,len:50,w:26,off:22},{n:5,len:36,w:22,off:10}];
    var out = '<svg class="rose" viewBox="-110 -110 220 300" aria-hidden="true">'+
      '<path class="stem" d="M0,20 C6,80 -6,130 0,186" stroke="#4E6B3F" stroke-width="5" fill="none"/>'+
      '<path d="M2,110 C30,90 52,100 58,110 C40,124 18,122 2,110Z" fill="#5B7A49"/>'+
      '<path d="M-1,140 C-28,124 -50,132 -56,142 C-38,156 -16,154 -1,140Z" fill="#5B7A49"/>';
    var k = 0;
    rings.forEach(function(r, ri){
      for (var i=0;i<r.n;i++){
        var a = r.off + i*360/r.n, col = PALETA[k % PALETA.length], delay = (ri*0.45 + i*0.06).toFixed(2);
        out += '<g transform="rotate('+a+')"><path class="petal" style="transition-delay:'+delay+'s" d="M0,0 C'+(-r.w)+','+(-r.len*.3)+' '+(-r.w*.8)+','+(-r.len*.9)+' 0,'+(-r.len)+' C'+(r.w*.8)+','+(-r.len*.9)+' '+r.w+','+(-r.len*.3)+' 0,0Z" fill="'+col+'" stroke="#0B0A09" stroke-width="1.2" opacity=".96"/></g>';
        k++;
      }
    });
    out += '<circle cx="0" cy="0" r="9" fill="'+PALETA[0]+'" stroke="#0B0A09" stroke-width="1.2"/></svg>';
    return out;
  }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var screen = document.getElementById('screen'), stage = document.getElementById('stage'),
      slateWrap = document.getElementById('slateWrap'), slate = document.getElementById('slate'),
      skip = document.getElementById('skip');
  var timer = null, idx = -1, prevEl = null, running = false;

  function clapSound(){
    try{
      var A = window.AudioContext || window.webkitAudioContext; if(!A) return;
      var ctx = new A(), len = ctx.sampleRate * .08, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
      for (var i=0;i<len;i++) d[i] = (Math.random()*2-1) * Math.pow(1 - i/len, 6);
      var src = ctx.createBufferSource(); src.buffer = buf;
      var f = ctx.createBiquadFilter(); f.type='highpass'; f.frequency.value = 900;
      src.connect(f); f.connect(ctx.destination); src.start();
    }catch(e){}
  }

  function show(i){
    idx = i;
    var c = CARDS[i];
    screen.style.backgroundColor = c.bg;
    screen.classList.toggle('light', isLight(c.bg));
    if (c.same && prevEl){ next(); return; }
    if (prevEl){ var old = prevEl; old.classList.remove('on'); setTimeout(function(){ old.remove(); }, 1100); }
    if (c.scene === 'house'){
      var h = document.createElement('div'); h.className = 'house'; h.innerHTML = HOUSE_SVG;
      stage.appendChild(h); prevEl = h;
      requestAnimationFrame(function(){ requestAnimationFrame(function(){ h.classList.add('on'); }); });
      var fl = document.getElementById('flash');
      if (reduce){ setTimeout(function(){ h.classList.add('open'); }, 1500); }
      else {
        setTimeout(function(){ h.classList.add('zoom'); }, 1300);
        setTimeout(function(){ h.classList.add('open'); }, 4300);
        setTimeout(function(){ fl.classList.add('on'); }, 5500);
      }
      next(); return;
    }
    var el = document.createElement('div'); el.className = 'card' + (c.scene === 'rose' ? ' final' : '');
    el.innerHTML = (c.scene === 'rose' ? roseSVG() : '') + c.html;
    if (c.scene === 'rose'){ var fl2 = document.getElementById('flash'); setTimeout(function(){ fl2.classList.remove('on'); }, 200); }
    if (i === CARDS.length - 1){
      var b = document.createElement('button'); b.className = 'btn'; b.textContent = 'rodar de novo';
      b.style.marginTop = '26px'; b.onclick = restart; el.appendChild(b);
      skip.style.display = 'none';
      setTimeout(function(){ b.focus({preventScroll:true}); }, 900);
    }
    stage.appendChild(el);
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ el.classList.add('on'); }); });
    prevEl = el;
    next();
  }
  function next(){
    var c = CARDS[idx];
    clearTimeout(timer);
    if (c.t) timer = setTimeout(function(){ show(idx + 1); }, reduce ? c.t + 800 : c.t);
  }

  function start(){
    if (running) return; running = true;
    slateWrap.querySelector('.slate').parentNode.classList.add('clapped');
    slate.parentNode.classList.add('clapped');
    clapSound();
    setTimeout(function(){
      slateWrap.classList.add('hidden');
      skip.style.display = 'block';
      setTimeout(function(){ show(0); }, 600);
    }, 700);
  }
  function restart(){
    clearTimeout(timer);
    stage.innerHTML = ''; prevEl = null; idx = -1; document.getElementById('flash').classList.remove('on');
    screen.style.backgroundColor = '#0B0A09'; screen.classList.remove('light');
    setTimeout(function(){ show(0); skip.style.display = 'block'; }, 500);
  }

  slate.addEventListener('click', start);
  skip.addEventListener('click', function(){ clearTimeout(timer); show(CARDS.length - 1); });
  document.addEventListener('keydown', function(e){
    if (!running) return;
    if (e.key === 'ArrowRight' && idx < CARDS.length - 1){ clearTimeout(timer); show(idx + 1); }
  });
})();
