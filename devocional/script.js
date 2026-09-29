(function(){
  var STOPS = [
    {label:'Capítulo 1 da jornada', title:'Onde tudo começou',
     verse:'Livro da geração de Jesus Cristo, Filho de Davi, Filho de Abraão.', ref:'Mateus 1:1',
     text:'O primeiro capítulo. O começo de um hábito que virou nosso.'},
    {label:'Capítulo 5 da jornada', title:'Sal da terra',
     verse:'Vós sois o sal da terra.', ref:'Mateus 5:13',
     text:'Um dos que ficaram com a gente.'},
    {label:'Capítulo 9 da jornada', title:'Chamada pelo nome',
     verse:'Tem ânimo, filha, a tua fé te salvou.', ref:'Mateus 9:22',
     text:'Guarda esse. Ele volta no final.'},
    {label:'Capítulo 28 da jornada', title:'Mateus inteiro', done:true,
     verse:'Eis que eu estou convosco todos os dias.', ref:'Mateus 28:20',
     text:'Todos os dias. E a gente também esteve lá, todos os dias.'},
    {label:'Capítulo 38 da jornada', title:'O camelo e a agulha',
     verse:'É mais fácil passar um camelo pelo fundo de uma agulha do que entrar um rico no Reino de Deus.', ref:'Marcos 10:25',
     text:'Um dos que ficaram na cabeça.'},
    {label:'Capítulo 39 da jornada', title:'Hoje: Marcos 11',
     text:'E o caminho continua.'}
  ];

  var path = document.getElementById('path'), line = document.getElementById('line'),
      finalEl = document.getElementById('final');
  var nodes = [];

  STOPS.forEach(function(s, i){
    var el = document.createElement('article');
    el.className = 'stop' + (s.done ? ' done-mark' : '');
    var html = '<span class="dot" aria-hidden="true"></span>' +
      '<p class="label">' + s.label + '</p><div class="card"><h2>' + s.title + '</h2>';
    if (s.verse) html += '<blockquote>' + s.verse + '<cite>' + s.ref + ' (ARC)</cite></blockquote>';
    html += '<p>' + s.text + '</p></div>';
    el.innerHTML = html;
    path.appendChild(el);

    var nw = document.createElement('div');
    nw.className = 'next-wrap hidden';
    var b = document.createElement('button');
    b.className = 'btn';
    b.textContent = i < STOPS.length - 1 ? 'Seguir o caminho' : 'Ler a mensagem';
    b.addEventListener('click', function(){ go(i + 1); });
    nw.appendChild(b);
    path.appendChild(nw);
    nodes.push({el:el, next:nw, btn:b});
  });

  function drawLine(i){
    var target = nodes[i].el;
    var h = target.offsetTop + 18 - 8;
    line.style.height = Math.max(0, h) + 'px';
  }

  function go(i){
    if (i > 0) nodes[i-1].next.classList.add('hidden');
    if (i < nodes.length){
      nodes[i].el.classList.add('on');
      nodes[i].next.classList.remove('hidden');
      drawLine(i);
      nodes[i].el.scrollIntoView({block:'center'});
      nodes[i].btn.focus({preventScroll:true});
    } else {
      line.style.height = (path.offsetHeight - 16) + 'px';
      finalEl.classList.add('show');
      finalEl.scrollIntoView({block:'center'});
    }
  }

  document.getElementById('start').addEventListener('click', function(){ go(0); });
  window.addEventListener('resize', function(){
    var last = -1;
    nodes.forEach(function(n,i){ if (n.el.classList.contains('on')) last = i; });
    if (finalEl.classList.contains('show')) line.style.height = (path.offsetHeight - 16) + 'px';
    else if (last >= 0) drawLine(last);
  });
})();
