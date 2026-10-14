/* ================= ajudantes de desenho ================= */
const brain=(cx,cy,s)=>`<g transform="translate(${cx} ${cy}) scale(${s})"><path d="M-42 10C-50-20-26-38 0-36C26-40 48-22 44 4C48 22 32 32 12 30C-4 36-30 34-42 10Z" class="f-pk s-pkd" stroke-width="${(2.5/s).toFixed(2)}"/><path d="M-30-8c8-10 16 4 24-6s14 6 20-2M-32 10c10-6 14 6 24 0s14 6 26-2M-10-28c4 8-4 14 2 22M14-30c-2 8 6 12 2 20" class="f-n s-pkd" stroke-width="${(2/s).toFixed(2)}" stroke-linecap="round"/></g>`;
const spark=(path,dur,begin='0s')=>`<g class="spark"><circle r="10" class="f-y" opacity=".35"/><circle r="5.5" class="f-y"/><animateMotion dur="${dur}" begin="${begin}" repeatCount="indefinite" path="${path}"/></g>`;
const wide=(d,w=18)=>`<path d="${d}" fill="none" stroke="transparent" stroke-width="${w}"/>`;
const step=(x,y,n)=>`<circle cx="${x}" cy="${y}" r="11" class="f-r"/><text x="${x}" y="${y+4.5}" class="tw" text-anchor="middle">${n}</text>`;
const eyeIcon=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-16 0Q0-12 16 0Q0 12-16 0Z" class="f-p s-i" stroke-width="2"/><circle r="6" class="f-c"/><circle r="2.6" class="f-i"/></g>`;

/* ================= ilustrações ================= */
const SVG={
/* ---------- SISTEMA NERVOSO ---------- */
partes:()=>`<svg viewBox="0 0 440 310" role="group" aria-label="Partes do sistema nervoso no corpo">
 <path d="M115 100L80 200M185 100L220 200" class="s-sk" stroke-width="22" stroke-linecap="round"/>
 <path d="M134 190L126 292M166 190L174 292" class="s-sk" stroke-width="26" stroke-linecap="round"/>
 <rect x="110" y="84" width="80" height="120" rx="30" class="f-sk"/><rect x="140" y="68" width="20" height="22" class="f-sk"/><circle cx="150" cy="44" r="32" class="f-sk"/>
 <g data-h="nervos">
  ${['M150 100C135 104 118 112 82 198','M150 100C165 104 182 112 218 198','M150 192C142 210 132 240 126 290','M150 192C158 210 168 240 174 290','M150 125C138 128 126 134 116 144','M150 125C162 128 174 134 184 144','M150 152C140 155 130 160 120 170','M150 152C160 155 170 160 180 170'].map(d=>wide(d,14)+`<path d="${d}" class="f-n s-y" stroke-width="3.2" stroke-linecap="round"/>`).join('')}
  <text x="20" y="160" class="t">nervos</text><path d="M66 156H90" class="s-m" stroke-width="1"/></g>
 <g data-h="medula">${wide('M150 64V196',20)}<path d="M150 64V196" class="s-c" stroke-width="9" stroke-linecap="round"/><text x="226" y="120" class="t">medula</text><path d="M158 116H222" class="s-m" stroke-width="1"/></g>
 <g data-h="encefalo">${brain(150,40,.52)}<text x="200" y="30" class="t">encéfalo</text><path d="M176 34L197 28" class="s-m" stroke-width="1"/></g>
 <g data-h="ganglios"><rect x="127" y="112" width="18" height="50" class="hit"/><rect x="155" y="112" width="18" height="50" class="hit"/>
  <circle cx="137" cy="127" r="4.5" class="f-ys s-y" stroke-width="2"/><circle cx="163" cy="127" r="4.5" class="f-ys s-y" stroke-width="2"/><circle cx="139" cy="154" r="4.5" class="f-ys s-y" stroke-width="2"/><circle cx="161" cy="154" r="4.5" class="f-ys s-y" stroke-width="2"/></g>
 ${spark('M82 198C118 112 135 104 150 100V56','2.6s')}
 <g data-h="snc"><rect x="266" y="140" width="164" height="76" rx="16" class="f-vs"/><text x="282" y="166" class="tb">Central</text><text x="282" y="186" class="t">encéfalo + medula</text><text x="282" y="204" class="ts">recebe e decide</text>
  <circle cx="382" cy="161" r="7" class="f-pk"/><rect x="394" y="157" width="18" height="8" rx="4" class="f-c"/></g>
 <g data-h="snp"><rect x="266" y="226" width="164" height="76" rx="16" class="f-ys"/><text x="282" y="252" class="tb">Periférico</text><text x="282" y="272" class="t">nervos e gânglios</text><text x="282" y="290" class="ts">levam e trazem recados</text>
  <path d="M400 244c6 6 12-6 18 0" class="f-n s-y" stroke-width="3" stroke-linecap="round"/></g>
</svg>`,

encefalo:()=>{const B='M60 150C50 90 100 40 180 36C260 30 350 55 372 118C388 165 362 200 312 204L210 208C150 214 72 200 60 150Z';
 return `<svg viewBox="0 0 440 310" role="group" aria-label="Partes do encéfalo e suas funções">
 <defs><clipPath id="cl-enc"><path d="${B}"/></clipPath></defs>
 <g data-h="tronco">${wide('M252 196C254 230 248 262 246 304',30)}<path d="M252 196C254 230 248 262 246 304" class="f-n s-c" stroke-width="26" stroke-linecap="round"/>
  <text x="228" y="262" class="t" text-anchor="end">respirar e</text><text x="228" y="278" class="t" text-anchor="end">bater o coração</text></g>
 <g data-h="cerebelo"><ellipse cx="304" cy="222" rx="50" ry="29" class="f-v"/><path d="M264 214Q304 198 344 214M260 226Q304 210 348 226M268 238Q304 224 340 238" class="f-n s-p" stroke-width="2" opacity=".6"/>
  <text x="362" y="272" class="t" text-anchor="middle">equilíbrio</text></g>
 <g data-h="frente"><polygon points="30,10 205,10 190,120 120,170 30,210" class="f-ys" clip-path="url(#cl-enc)"/>
  <circle cx="118" cy="82" r="10" class="f-y"/><rect x="113" y="92" width="10" height="7" rx="2" class="f-m"/><path d="M118 64v-5M100 82h-5M136 82h5M105 70l-4-4M131 70l4-4" class="s-y" stroke-width="2" stroke-linecap="round"/>
  <text x="118" y="122" class="tb" text-anchor="middle">pensar e</text><text x="118" y="139" class="tb" text-anchor="middle">decidir</text></g>
 <g data-h="topo"><polygon points="205,10 300,10 285,112 190,120" class="f-gs" clip-path="url(#cl-enc)"/>
  <text x="244" y="70" class="tb" text-anchor="middle">mover e</text><text x="244" y="87" class="tb" text-anchor="middle">sentir</text></g>
 <g data-h="visao"><polygon points="300,10 400,10 400,230 305,230 285,112" class="f-cs" clip-path="url(#cl-enc)"/>
  ${eyeIcon(330,112,1)}<text x="330" y="148" class="tb" text-anchor="middle">ver</text></g>
 <g data-h="lado"><polygon points="120,170 190,120 285,112 305,230 100,230" class="f-vs" clip-path="url(#cl-enc)"/>
  <ellipse cx="200" cy="160" rx="6" ry="4.5" class="f-v" transform="rotate(-20 200 160)"/><path d="M205.5 158V140l10 4" class="f-n s-v" stroke-width="2.4"/>
  <text x="236" y="168" class="tb" text-anchor="middle">ouvir e</text><text x="236" y="185" class="tb" text-anchor="middle">lembrar</text></g>
 <g clip-path="url(#cl-enc)" pointer-events="none"><path d="M90 70c20-14 30 8 50-6M160 60c14 12 30-6 44 8M250 52c10 16 30 0 40 14M300 90c-10 14 10 26 0 40M140 190c10-12 26 4 36-6" class="f-n s-pkd" stroke-width="2.4" opacity=".55" stroke-linecap="round"/></g>
 <path d="${B}" class="f-n s-pkd" stroke-width="4" pointer-events="none"/>
 <text x="60" y="230" class="ts">frente</text><text x="390" y="40" class="ts" text-anchor="end">nuca</text>
</svg>`},

neuronio:()=>`<svg viewBox="0 0 440 316" role="group" aria-label="Estrutura do neurônio e sinapse">
 <defs><clipPath id="cl-sin"><circle cx="385" cy="250" r="46"/></clipPath></defs>
 <g data-h="dendritos">${['M75 132L48 105L30 98M48 105L44 82','M68 152L36 152L18 140M36 152L22 168','M95 176L88 205L70 222M88 205L102 228','M104 118L100 88L84 70M100 88L118 68'].map(d=>wide(d,16)+`<path d="${d}" class="f-n s-v" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}
  <text x="20" y="60" class="t">dendritos</text></g>
 <g data-h="corpo"><path d="M70 130C60 110 90 104 102 118C114 102 136 112 128 130C146 140 142 166 126 168C126 190 98 194 92 176C72 186 56 166 68 152C54 146 58 128 70 130Z" class="f-vs s-v" stroke-width="3"/>
  <circle cx="100" cy="148" r="11" class="f-v"/><text x="122" y="206" class="t">corpo celular</text></g>
 <g data-h="axonio">${wide('M136 150H332',20)}<path d="M136 150H332" class="s-v" stroke-width="5"/><text x="246" y="184" class="t" text-anchor="middle">axônio</text></g>
 <g data-h="mielina"><rect x="150" y="139" width="42" height="22" rx="11" class="f-ys s-y" stroke-width="2"/><rect x="200" y="139" width="42" height="22" rx="11" class="f-ys s-y" stroke-width="2"/><rect x="250" y="139" width="42" height="22" rx="11" class="f-ys s-y" stroke-width="2"/>
  <text x="221" y="128" class="t" text-anchor="middle">bainha de mielina</text></g>
 <g data-h="terminais">${wide('M330 150L350 130L364 122M350 130L358 110M330 150L368 152M330 150L350 170L362 180',16)}<path d="M330 150L350 130L364 122M350 130L358 110M330 150L368 152M330 150L350 170L362 180" class="f-n s-v" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="364" cy="122" r="5" class="f-v"/><circle cx="358" cy="110" r="5" class="f-v"/><circle cx="368" cy="152" r="5" class="f-v"/><circle cx="362" cy="180" r="5" class="f-v"/><text x="372" y="96" class="t" text-anchor="middle">terminais</text></g>
 <path d="M380 152L410 150L432 138M410 150L432 166" class="f-n s-c" stroke-width="4" stroke-linecap="round"/><text x="432" y="128" class="ts" text-anchor="end">próximo</text>
 <path d="M372 160L380 200" class="s-m" stroke-width="1.5" stroke-dasharray="3 3"/>
 <g data-h="sinapse"><circle cx="385" cy="250" r="47" class="f-p s-m" stroke-width="1.5"/>
  <g clip-path="url(#cl-sin)"><path d="M338 222C338 200 432 200 432 222L432 236C410 244 360 244 338 236Z" class="f-vs s-v" stroke-width="2"/>
   <circle cx="372" cy="224" r="4" class="f-y"/><circle cx="388" cy="218" r="4" class="f-y"/><circle cx="402" cy="226" r="4" class="f-y"/>
   <circle cx="376" cy="250" r="2.6" class="f-y"/><circle cx="390" cy="254" r="2.6" class="f-y"/><circle cx="398" cy="248" r="2.6" class="f-y"/><circle cx="384" cy="258" r="2.6" class="f-y"/>
   <path d="M338 270C362 262 408 262 432 270L432 300L338 300Z" class="f-cs s-c" stroke-width="2"/></g>
  <text x="385" y="312" class="t" text-anchor="middle">sinapse</text></g>
 <g data-h="impulso"><rect x="14" y="262" width="150" height="40" class="hit"/><circle cx="30" cy="282" r="10" class="f-y" opacity=".35"/><circle cx="30" cy="282" r="5.5" class="f-y"/><text x="46" y="287" class="t">impulso nervoso</text></g>
 ${spark('M30 98L48 105L75 132L100 150L136 150L332 150L368 152','2.8s')}
</svg>`,

movimentos:()=>`<svg viewBox="0 0 440 310" role="group" aria-label="Movimentos voluntários e involuntários">
 <rect x="8" y="8" width="206" height="294" rx="18" class="f-gs"/><text x="111" y="36" class="tb" text-anchor="middle">você decide</text>
 <rect x="226" y="8" width="206" height="294" rx="18" class="f-cs"/><text x="329" y="36" class="tb" text-anchor="middle">acontece sozinho</text>
 <path d="M96 112L68 140" class="s-sk" stroke-width="9" stroke-linecap="round"/><path d="M96 112L130 124" class="s-sk" stroke-width="9" stroke-linecap="round"/>
 <path d="M98 160L86 212L84 248" class="f-n s-v" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="90" cy="252" rx="11" ry="6" class="f-i"/>
 <path d="M95 96L98 160" class="s-c" stroke-width="18" stroke-linecap="round"/>
 <g data-h="ordem"><circle cx="95" cy="78" r="17" class="f-sk"/><path d="M79 74C79 56 111 56 111 74Z" class="f-pk"/>
  <path d="M95 92L98 160L128 194" class="f-n s-y" stroke-width="3" stroke-dasharray="5 4"/><text x="120" y="76" class="t">ordem do</text><text x="120" y="92" class="t">cérebro</text></g>
 <g data-h="chute"><rect x="96" y="160" width="104" height="58" class="hit"/><path d="M98 160L128 196L158 190" class="f-n s-v" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="163" cy="190" rx="10" ry="6" class="f-i"/>
  <circle cx="186" cy="200" r="15" class="f-p s-i" stroke-width="2"/><path d="M181 195l5-4 5 4-2 6h-6z" class="f-i"/><path d="M150 214l-10 6M160 218l-8 8" class="s-m" stroke-width="2" stroke-linecap="round"/></g>
 <g data-h="outros"><rect x="16" y="258" width="190" height="40" class="hit"/><rect x="26" y="270" width="26" height="8" rx="2" class="f-y" transform="rotate(-30 39 274)"/><path d="M60 266h30v16h-18l-8 6v-6h-4z" class="f-p s-i" stroke-width="1.6"/>
  <text x="100" y="282" class="ts">escrever, falar</text></g>
 ${spark('M95 70L95 92L98 160L128 194','2.2s')}
 <g data-h="coracao"><path class="f-r beat" d="M280 128C244 106 248 70 268 74C276 76 280 86 280 86C280 86 284 76 292 74C312 70 316 106 280 128Z"/><text x="280" y="152" class="t" text-anchor="middle">coração</text></g>
 <g data-h="pulmao"><g class="breathe"><path d="M372 84C350 86 343 126 350 134C357 140 372 134 372 120Z" class="f-pk s-pkd" stroke-width="2"/><path d="M388 84C410 86 417 126 410 134C403 140 388 134 388 120Z" class="f-pk s-pkd" stroke-width="2"/></g>
  <path d="M380 62V92M380 92L370 84M380 92L390 84" class="f-n s-i" stroke-width="3" stroke-linecap="round"/><text x="380" y="152" class="t" text-anchor="middle">respiração</text></g>
 <g data-h="estomago"><path d="M294 176C312 178 314 200 306 214C294 236 264 240 257 224C252 212 264 206 276 206C286 205 288 192 286 180Z" class="f-ys s-y" stroke-width="2.5"/><text x="282" y="256" class="t" text-anchor="middle">digestão</text></g>
 <g data-h="olho"><path d="M346 205Q380 180 414 205Q380 230 346 205Z" class="f-p s-i" stroke-width="2"/><circle cx="380" cy="205" r="12" class="f-c"/><circle cx="380" cy="205" r="5" class="f-i pupil"/><text x="380" y="256" class="t" text-anchor="middle">pupila e piscada</text></g>
 <g data-h="piloto"><rect x="240" y="266" width="178" height="28" rx="10" class="f-p s-c" stroke-width="1.5"/><text x="329" y="285" class="t" text-anchor="middle">piloto automático</text></g>
</svg>`,

reflexo:()=>{const S='M64 230C100 200 128 168 165 120C200 75 265 88 306 128L332 146',M='M348 160C336 236 236 240 178 150';
 return `<svg viewBox="0 0 440 310" role="group" aria-label="Arco reflexo: mão na panela quente">
 <path d="M14 238H40" class="s-i" stroke-width="7" stroke-linecap="round"/><rect x="36" y="230" width="90" height="24" rx="6" class="f-i"/>
 ${[52,80,108].map(x=>`<path d="M${x} 282C${x-5} 270 ${x+4} 264 ${x+2} 256C${x+10} 264 ${x+14} 272 ${x+8} 282Z" class="f-r"/><path d="M${x+2} 282C${x} 276 ${x+4} 272 ${x+4} 268C${x+8} 274 ${x+9} 278 ${x+6} 282Z" class="f-y"/>`).join('')}
 <path d="M94 222c-6-8 6-12 0-20M112 222c-6-8 6-12 0-20" class="f-n s-r steam" stroke-width="2" stroke-linecap="round"/>
 <path d="M84 214L160 170L182 92" class="f-n s-sk" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
 <ellipse cx="78" cy="218" rx="17" ry="11" class="f-sk" transform="rotate(-30 78 218)"/><path d="M70 222L64 230" class="s-sk" stroke-width="8" stroke-linecap="round"/>
 <g data-h="musculo"><ellipse cx="172" cy="128" rx="13" ry="30" class="f-r" opacity=".9" transform="rotate(15 172 128)"/><text x="146" y="104" class="t" text-anchor="end">músculo</text>${step(198,110,5)}</g>
 <g data-h="medula"><circle cx="340" cy="150" r="56" class="f-p s-i" stroke-width="2"/><path d="M302 150C302 122 326 118 340 138C354 118 378 122 378 150C378 178 354 182 340 162C326 182 302 178 302 150Z" class="f-vs s-v" stroke-width="2"/><circle cx="340" cy="150" r="3" class="f-m"/>
  <path d="M332 146L348 160" class="s-v" stroke-width="4" stroke-linecap="round"/><text x="420" y="196" class="t" text-anchor="middle">medula</text><text x="420" y="212" class="t" text-anchor="middle">espinal</text>${step(404,108,3)}</g>
 <g data-h="sensitivo">${wide(S)}<path d="${S}" class="f-n s-y" stroke-width="4"/><circle cx="282" cy="104" r="7" class="f-y"/>${step(230,72,2)}</g>
 <g data-h="motor">${wide(M)}<path d="${M}" class="f-n s-c" stroke-width="4"/>${step(268,232,4)}</g>
 <g data-h="receptor"><rect x="30" y="196" width="50" height="46" class="hit"/><circle cx="64" cy="232" r="6" class="f-y"/><path d="M64 222v-6M54 232h-6M57 225l-4-4M57 239l-4 4" class="s-y" stroke-width="2" stroke-linecap="round"/>${step(40,206,1)}</g>
 <g data-h="cerebro"><path d="M340 92V52" class="arw"/>${brain(340,30,.4)}<text x="316" y="34" class="t" text-anchor="end">depois:</text><text x="316" y="50" class="t" text-anchor="end">“ai!”</text></g>
 ${spark(S+'L348 160C336 236 236 240 178 150','3.2s')}
</svg>`},

cuidados:()=>{
 const ic=(x,y,key,bg,draw,lx,ly,anchor,label)=>`<g data-h="${key}"><circle cx="${x}" cy="${y}" r="33" class="${bg}"/><g transform="translate(${x} ${y})">${draw}</g><text x="${lx}" y="${ly}" class="t" text-anchor="${anchor}">${label}</text></g>`;
 return `<svg viewBox="0 0 440 310" role="group" aria-label="Problemas que podem afetar o sistema nervoso">
 <g data-h="sono"><circle cx="220" cy="150" r="50" class="f-p s-c" stroke-width="3" stroke-dasharray="7 6"/>${brain(220,152,.72)}<text x="252" y="112" class="tb" style="fill:var(--violet)">z</text><text x="262" y="102" class="t" style="fill:var(--violet)">z</text></g>
 ${ic(220,48,'capacete','f-cs','<path d="M-20 8C-20-18 20-18 20 8Z" class="f-c"/><path d="M-3-16V6M7-14V6" class="s-p" stroke-width="3"/><path d="M-22 8H23" class="s-i" stroke-width="3"/><path d="M-14 8Q-10 20 2 18" class="f-n s-i" stroke-width="2"/>',262,54,'start','pancadas na cabeça')}
 ${ic(335,100,'coluna','f-vs','<rect x="-10" y="-24" width="20" height="9" rx="3" class="f-p s-v" stroke-width="2"/><rect x="-10" y="-11" width="20" height="9" rx="3" class="f-p s-v" stroke-width="2"/><rect x="-10" y="2" width="20" height="9" rx="3" class="f-p s-v" stroke-width="2"/><rect x="-10" y="15" width="20" height="9" rx="3" class="f-p s-v" stroke-width="2"/><path d="M18-8L8 0L18 4L8 12" class="f-n s-r" stroke-width="3"/>',335,148,'middle','coluna e medula')}
 ${ic(335,205,'drogas','f-rs','<path d="M-6-24H6V-14C14-10 14-4 14 0V22H-14V0C-14-4-14-10-6-14Z" class="f-p s-i" stroke-width="2"/><rect x="-13" y="4" width="26" height="17" class="f-y" opacity=".8"/><path d="M-22-22L22 22M22-22L-22 22" class="s-r" stroke-width="4" stroke-linecap="round"/>',335,253,'middle','álcool e drogas')}
 ${ic(220,258,'avc','f-rs','<path d="M-26-7H26M-26 7H26" class="s-r" stroke-width="3"/><circle cx="-18" cy="0" r="3" class="f-r"/><circle cx="-10" cy="0" r="3" class="f-r"/><path d="M-3-6C8-8 10 6 1 7C-8 8-9-4-3-6Z" class="f-i"/>',262,266,'start','AVC')}
 ${ic(105,205,'doencas','f-ys',brain(0,-2,.38)+'<path d="M-18 20l4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4" class="f-n s-v" stroke-width="2"/>',105,253,'middle','doenças')}
 ${ic(105,100,'meningite','f-gs','<circle cx="-6" cy="-4" r="10" class="f-g"/><path d="M-6-18v4M-6 6v4M-20-4h4M4-4h4M-16-14l3 3M4-14l-3 3M-16 6l3-3" class="s-g" stroke-width="2.5" stroke-linecap="round"/><rect x="2" y="10" width="18" height="7" rx="2" class="f-p s-i" stroke-width="1.5"/><path d="M20 13.5H28M-2 13.5H2" class="s-i" stroke-width="2"/>',105,148,'middle','meningite')}
</svg>`},

/* ---------- SISTEMA SENSORIAL ---------- */
sentidos:()=>{const rows=[46,100,154,208,262];
 const stim=[`<circle cx="32" cy="46" r="8" class="f-y"/><path d="M32 32v-4M32 60v4M18 46h-4M46 46h4M22 36l-3-3M42 36l3-3M22 56l-3 3M42 56l3 3" class="s-y" stroke-width="2" stroke-linecap="round"/>`,
  `<ellipse cx="27" cy="108" rx="6" ry="4.5" class="f-i" transform="rotate(-20 27 108)"/><path d="M32.5 106V88l10 4" class="f-n s-i" stroke-width="2.4"/>`,
  `<circle cx="32" cy="146" r="6" class="f-rs"/><circle cx="40" cy="154" r="6" class="f-rs"/><circle cx="32" cy="162" r="6" class="f-rs"/><circle cx="24" cy="154" r="6" class="f-rs"/><circle cx="32" cy="154" r="4" class="f-y"/>`,
  `<path d="M24 210L32 228L40 210Z" class="f-ys s-y" stroke-width="1.5"/><circle cx="32" cy="204" r="9" class="f-pk"/>`,
  `<path d="M22 276C28 260 38 252 44 248C42 260 34 270 24 276Z" class="f-vs s-v" stroke-width="1.5"/><path d="M20 280L32 264" class="s-v" stroke-width="1.5"/>`];
 const org=[eyeIcon(96,46,1),
  `<path d="M90 86C106 82 112 98 106 106C102 112 98 110 98 116C98 120 92 120 90 116" class="f-n s-skd" stroke-width="5" stroke-linecap="round"/>`,
  `<path d="M98 140L88 164C92 168 104 168 108 164" class="f-n s-skd" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  `<path d="M84 200Q96 206 108 200" class="f-n s-i" stroke-width="2"/><path d="M86 203C86 222 106 222 106 203Z" class="f-r"/>`,
  `<rect x="86" y="258" width="22" height="18" rx="6" class="f-sk"/><path d="M89 258v-12M94 258v-15M99 258v-14M104 258v-10M86 268l-6-6" class="s-sk" stroke-width="4.5" stroke-linecap="round"/>`];
 const nerve=y=>`M120 ${y}C200 ${y} 220 ${150+(y-154)*.15} 282 ${150+(y-154)*.25}`;
 return `<svg viewBox="0 0 440 310" role="group" aria-label="Caminho das sensações até o cérebro">
 <text x="32" y="16" class="ts" text-anchor="middle">estímulo</text><text x="96" y="16" class="ts" text-anchor="middle">órgão</text><text x="200" y="16" class="ts" text-anchor="middle">nervos</text>
 <g data-h="estimulo"><rect x="8" y="22" width="48" height="268" class="hit"/>${stim.join('')}</g>
 <g data-h="nervos">${rows.map(y=>wide(nerve(y),14)+`<path d="${nerve(y)}" class="f-n s-y" stroke-width="3"/>`).join('')}</g>
 <g data-h="receptores">${rows.map(y=>`<circle cx="96" cy="${y}" r="23" class="f-p s-m" stroke-width="1.5"/>`).join('')}${org.join('')}</g>
 <g data-h="cerebro">${brain(350,156,1.3)}<text x="350" y="226" class="t" text-anchor="middle">cérebro</text></g>
 <g data-h="percepcao"><ellipse cx="350" cy="52" rx="74" ry="30" class="f-p s-m" stroke-width="1.5"/><circle cx="336" cy="92" r="6" class="f-p s-m" stroke-width="1.5"/><circle cx="342" cy="104" r="3.5" class="f-p s-m" stroke-width="1.5"/>
  <text x="350" y="49" class="tb" text-anchor="middle">“é uma flor!”</text><text x="350" y="66" class="ts" text-anchor="middle">percepção</text></g>
 ${rows.map((y,i)=>spark(nerve(y),'2.4s',(i*.45)+'s')).join('')}
</svg>`},

visao:()=>`<svg viewBox="0 0 440 310" role="group" aria-label="Partes do olho e formação da imagem">
 <circle cx="290" cy="150" r="80" class="f-p s-i" stroke-width="2.5"/><circle cx="290" cy="150" r="74" class="f-cs" opacity=".45"/>
 <path d="M40 108L240 150L355 175M40 190L240 150L355 124" class="f-n s-y" stroke-width="2.2" opacity=".9"/>
 <g data-h="luz"><rect x="10" y="20" width="70" height="176" class="hit"/><circle cx="60" cy="40" r="11" class="f-y"/><path d="M60 22v-5M60 58v5M42 40h-5M78 40h5M47 27l-4-4M73 27l4-4" class="s-y" stroke-width="2" stroke-linecap="round"/>
  <rect x="35" y="148" width="10" height="42" class="f-skd"/><circle cx="40" cy="126" r="24" class="f-g"/><text x="40" y="210" class="t" text-anchor="middle">objeto</text></g>
 <g data-h="cornea">${wide('M214 112Q192 150 214 188',16)}<path d="M214 112Q192 150 214 188" class="f-n s-c" stroke-width="5" stroke-linecap="round"/><text x="200" y="100" class="t" text-anchor="end">córnea</text></g>
 <g data-h="iris"><rect x="219" y="114" width="8" height="24" rx="3" class="f-v"/><rect x="219" y="162" width="8" height="24" rx="3" class="f-v"/><rect x="212" y="110" width="22" height="80" class="hit"/><text x="186" y="254" class="t">íris e pupila</text><path d="M206 240L222 190" class="s-m" stroke-width="1"/></g>
 <g data-h="cristalino"><ellipse cx="242" cy="150" rx="9" ry="25" class="f-cs s-c" stroke-width="2.5"/><text x="250" y="58" class="t" text-anchor="middle">cristalino</text><path d="M250 64L244 124" class="s-m" stroke-width="1"/></g>
 <g data-h="retina">${wide('M330 80.7A80 80 0 0 1 330 219.3',14)}<path d="M330 80.7A80 80 0 0 1 330 219.3" class="f-n s-r" stroke-width="6"/><text x="372" y="72" class="t">retina</text></g>
 <g data-h="invertida"><rect x="340" y="120" width="24" height="62" class="hit"/><rect x="350" y="126" width="4" height="36" class="f-skd"/><circle cx="352" cy="168" r="9" class="f-g"/></g>
 <g data-h="nervo">${wide('M368 150C390 150 400 140 432 140',18)}<path d="M368 150C390 150 400 140 432 140" class="f-n s-y" stroke-width="12" stroke-linecap="round"/><text x="436" y="190" class="t" text-anchor="end">nervo</text><text x="436" y="206" class="ts" text-anchor="end">para o cérebro</text></g>
 <g data-h="pupila"><rect x="18" y="232" width="72" height="72" rx="12" class="f-ys"/><rect x="100" y="232" width="72" height="72" rx="12" style="fill:#183039"/>
  <path d="M28 262Q54 246 80 262Q54 278 28 262Z" class="f-p s-i" stroke-width="1.5"/><circle cx="54" cy="262" r="10" class="f-v"/><circle cx="54" cy="262" r="3" class="f-i"/>
  <path d="M110 262Q136 246 162 262Q136 278 110 262Z" style="fill:#fff;stroke:#0D2B35" stroke-width="1.5"/><circle cx="136" cy="262" r="10" class="f-v"/><circle cx="136" cy="262" r="7.5" style="fill:#0D2B35"/>
  <text x="54" y="294" class="ts" text-anchor="middle">muita luz</text><text x="136" y="294" style="fill:#cfe3e8;font:400 12px var(--body)" text-anchor="middle">pouca luz</text></g>
</svg>`,

audicao:()=>`<svg viewBox="0 0 440 310" role="group" aria-label="Partes da orelha">
 <path d="M40 40V46H190V40M194 40V46H250V40M254 40V46H334V40" class="f-n s-m" stroke-width="1.2"/>
 <text x="115" y="32" class="ts" text-anchor="middle">orelha externa</text><text x="222" y="32" class="ts" text-anchor="middle">média</text><text x="294" y="32" class="ts" text-anchor="middle">interna</text>
 <ellipse cx="224" cy="150" rx="32" ry="36" class="f-p s-m" stroke-width="1.2"/>
 <g data-h="tuba">${wide('M226 184C236 220 250 248 262 288',18)}<path d="M226 184C236 220 250 248 262 288" class="f-n s-skd" stroke-width="10" stroke-linecap="round" opacity=".75"/><text x="274" y="292" class="t">tuba auditiva</text></g>
 <g data-h="externa"><path d="M88 70C52 60 30 100 38 145C44 180 58 205 82 232C92 242 104 232 100 216C96 200 82 188 86 166C88 156 88 150 90 140Z" class="f-sk s-skd" stroke-width="2"/><path d="M78 92C60 96 56 130 66 150" class="f-n s-skd" stroke-width="3" stroke-linecap="round"/>
  <rect x="88" y="138" width="104" height="28" class="f-skd" opacity=".55"/></g>
 <g data-h="ondas"><rect x="100" y="132" width="76" height="40" class="hit"/><path d="M108 142Q116 152 108 162" class="f-n s-c wave" stroke-width="3" stroke-linecap="round"/><path d="M126 140Q136 152 126 164" class="f-n s-c wave d2" stroke-width="3" stroke-linecap="round"/><path d="M144 138Q156 152 144 166" class="f-n s-c wave d3" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="128" cy="96" rx="6" ry="4.5" class="f-c" transform="rotate(-20 128 96)"/><path d="M133.5 94V76l10 4" class="f-n s-c" stroke-width="2.4"/><text x="148" y="94" class="ts">som</text></g>
 <g data-h="timpano"><rect x="186" y="128" width="16" height="48" class="hit"/><ellipse cx="194" cy="152" rx="4" ry="20" class="f-rs s-r" stroke-width="2"/><text x="186" y="120" class="t" text-anchor="end">tímpano</text></g>
 <g data-h="ossiculos"><rect x="198" y="124" width="52" height="40" class="hit"/><ellipse cx="206" cy="142" rx="5" ry="10" class="f-p s-i" stroke-width="2"/><ellipse cx="220" cy="134" rx="8" ry="6" class="f-p s-i" stroke-width="2"/><path d="M228 140H246M230 140L236 156M244 140L238 156M234 156H240" class="f-n s-i" stroke-width="2.5" stroke-linecap="round"/><text x="224" y="108" class="t" text-anchor="middle">ossinhos</text></g>
 <ellipse cx="258" cy="150" rx="10" ry="13" class="f-cs"/>
 <g data-h="equilibrio"><rect x="252" y="70" width="70" height="66" class="hit"/><ellipse cx="268" cy="104" rx="14" ry="24" class="f-n s-c" stroke-width="5" transform="rotate(-25 268 104)"/><ellipse cx="294" cy="94" rx="24" ry="13" class="f-n s-c" stroke-width="5"/><ellipse cx="302" cy="116" rx="13" ry="20" class="f-n s-c" stroke-width="5" transform="rotate(20 302 116)"/>
  <text x="330" y="80" class="t">equilíbrio</text></g>
 <g data-h="coclea"><circle cx="291" cy="180" r="30" class="f-vs"/><path d="M266 180a24 24 0 0 1 48 0a19 19 0 0 1-38 0a14 14 0 0 1 28 0a9 9 0 0 1-18 0" class="f-n s-v" stroke-width="6" stroke-linecap="round"/><text x="291" y="228" class="t" text-anchor="middle">cóclea</text></g>
 <g data-h="nervo">${wide('M314 172C350 168 370 150 392 132',18)}<path d="M314 172C350 168 370 150 392 132" class="f-n s-y" stroke-width="8" stroke-linecap="round"/>${brain(410,110,.34)}<text x="380" y="190" class="t" text-anchor="middle">nervo</text><text x="380" y="206" class="ts" text-anchor="middle">para o cérebro</text></g>
 ${spark('M314 172C350 168 370 150 392 132','1.6s')}
</svg>`,

tato:()=>{const xs=[64,124,184,244,304];
 const fiber=x=>`<path d="M${x} ${x===124?196:x===304?180:136}V236" class="f-n s-y" stroke-width="2.2"/>`;
 return `<svg viewBox="0 0 440 310" role="group" aria-label="Receptores da pele">
 <g data-h="camadas"><rect x="16" y="200" width="320" height="74" class="f-ys"/>${[40,90,150,210,270,316].map((x,i)=>`<circle cx="${x}" cy="${238+(i%2?10:-8)}" r="12" class="f-p" opacity=".55"/>`).join('')}
  <rect x="16" y="100" width="320" height="100" class="f-rs"/><rect x="16" y="84" width="320" height="16" class="f-sk"/>
  <text x="330" y="96" class="ts" text-anchor="end">epiderme</text><text x="330" y="194" class="ts" text-anchor="end">derme</text><text x="330" y="268" class="ts" text-anchor="end">gordura</text></g>
 <g data-h="nervo">${wide('M40 236H340C360 236 372 254 382 272',16)}<path d="M40 236H340C360 236 372 254 382 272" class="f-n s-y" stroke-width="6" stroke-linecap="round"/><text x="390" y="290" class="t" text-anchor="middle">para a medula</text><text x="390" y="304" class="ts" text-anchor="middle">e o cérebro</text></g>
 <g data-h="toque"><rect x="44" y="30" width="40" height="110" class="hit"/><path d="M52 64C60 46 72 38 80 34C76 46 68 58 56 64Z" class="f-vs s-v" stroke-width="1.5"/><path d="M48 68L64 52" class="s-v" stroke-width="1.5"/>${fiber(64)}<ellipse cx="64" cy="114" rx="7" ry="11" class="f-v"/><text x="64" y="24" class="t" text-anchor="middle">toque</text></g>
 <g data-h="pressao"><rect x="104" y="30" width="40" height="170" class="hit"/><path d="M110 66L114 44H134L138 66Z" class="f-v"/><text x="124" y="60" class="tw" text-anchor="middle">kg</text>${fiber(124)}<ellipse cx="124" cy="176" rx="15" ry="19" class="f-p s-v" stroke-width="2"/><ellipse cx="124" cy="176" rx="9" ry="12" class="f-n s-v" stroke-width="2"/><ellipse cx="124" cy="176" rx="3.5" ry="5" class="f-v"/><text x="124" y="24" class="t" text-anchor="middle">pressão</text></g>
 <g data-h="calor"><rect x="164" y="30" width="40" height="120" class="hit"/><path d="M184 66C172 62 172 48 180 38C182 46 188 46 188 40C196 48 196 62 184 66Z" class="f-r"/>${fiber(184)}<circle cx="184" cy="138" r="7" class="f-r"/><text x="184" y="24" class="t" text-anchor="middle">calor</text></g>
 <g data-h="frio"><rect x="224" y="30" width="40" height="110" class="hit"/><rect x="232" y="40" width="24" height="24" rx="4" class="f-cs s-c" stroke-width="2"/><path d="M237 46l6-2" class="s-p" stroke-width="2"/>${fiber(244)}<circle cx="244" cy="128" r="7" class="f-c"/><text x="244" y="24" class="t" text-anchor="middle">frio</text></g>
 <g data-h="dor"><rect x="284" y="30" width="44" height="150" class="hit"/><circle cx="304" cy="44" r="8" class="f-r"/><path d="M304 52V68" class="s-i" stroke-width="2"/>${fiber(304)}<path d="M304 180L304 130L292 104M304 130L316 102M304 152L322 122" class="f-n s-y" stroke-width="2.5" stroke-linecap="round"/><text x="304" y="24" class="t" text-anchor="middle">dor</text></g>
 ${xs.map(x=>`<path d="M${x} 70V80" class="arw"/>`).join('')}
 <g data-h="sensivel"><rect x="346" y="56" width="86" height="160" class="hit"/><rect x="362" y="110" width="54" height="60" rx="14" class="f-sk"/>
  ${[[362,74,42],[375,64,50],[388,66,48],[401,76,40]].map(([x,y,h])=>`<rect x="${x}" y="${y}" width="12" height="${h}" rx="6" class="f-sk"/><circle cx="${x+6}" cy="${y+7}" r="4" class="f-r"/>`).join('')}
  <rect x="346" y="124" width="12" height="34" rx="6" class="f-sk" transform="rotate(-35 352 141)"/><circle cx="346" cy="124" r="4" class="f-r"/>
  <text x="389" y="190" class="t" text-anchor="middle">pontas dos</text><text x="389" y="206" class="t" text-anchor="middle">dedos</text></g>
</svg>`},

paladar:()=>`<svg viewBox="0 0 440 310" role="group" aria-label="Olfato e paladar">
 <defs><clipPath id="cl-pap"><circle cx="330" cy="222" r="50"/></clipPath></defs>
 <path d="M250 14C190 10 150 30 140 70C136 84 122 96 108 108C96 118 78 128 66 136C64 142 70 146 80 148C92 150 100 152 100 158C98 166 92 170 92 176C98 180 104 182 100 188C94 192 94 198 100 204C104 220 108 236 122 246C140 256 160 256 176 256L190 300L250 300Z" class="f-sk"/>
 <path d="M110 112C100 120 84 130 76 138C96 144 124 142 160 132C176 124 176 106 160 100C140 96 122 102 110 112Z" class="f-p s-skd" stroke-width="1.5" opacity=".95"/>
 <path d="M100 176C130 168 180 168 205 180C190 198 130 204 100 192Z" class="f-rs"/>
 <g data-h="cerebro">${brain(205,64,.85)}</g>
 <g data-h="olfato">${wide('M140 100C150 96 162 98 168 106',16)}<path d="M140 100C150 96 162 98 168 106" class="f-n s-y" stroke-width="6" stroke-linecap="round"/><path d="M148 98L160 84M156 97L166 82M164 100L172 86" class="s-y" stroke-width="2.2"/>
  <text x="16" y="64" class="t">receptores</text><text x="16" y="80" class="t">do cheiro</text><path d="M80 78L136 98" class="s-m" stroke-width="1"/></g>
 <g data-h="lingua"><path d="M104 188C130 174 180 174 206 184C186 198 132 202 104 192Z" class="f-r"/><path d="M200 182C214 160 214 120 210 96" class="f-n s-y" stroke-width="3"/>${wide('M200 182C214 160 214 120 210 96',12)}<text x="150" y="226" class="t" text-anchor="middle">língua</text></g>
 <path d="M180 186L282 214" class="s-m" stroke-width="1.2" stroke-dasharray="3 3"/>
 <g data-h="cheiro"><rect x="8" y="132" width="78" height="80" class="hit"/><path d="M22 176V210" class="s-g" stroke-width="3"/><circle cx="22" cy="164" r="7" class="f-rs"/><circle cx="31" cy="172" r="7" class="f-rs"/><circle cx="22" cy="180" r="7" class="f-rs"/><circle cx="13" cy="172" r="7" class="f-rs"/><circle cx="22" cy="172" r="4.5" class="f-y"/>
  <g class="float"><circle cx="40" cy="160" r="3" class="f-v"/><circle cx="52" cy="154" r="3" class="f-v"/><circle cx="64" cy="150" r="3" class="f-v"/><circle cx="48" cy="166" r="3" class="f-v"/></g></g>
 <g data-h="papila"><circle cx="330" cy="222" r="51" class="f-p s-m" stroke-width="1.5"/><g clip-path="url(#cl-pap)"><path d="M276 236Q290 200 304 236Q318 200 332 236Q346 200 360 236Q374 200 388 236V280H276Z" class="f-r"/>
  <ellipse cx="318" cy="244" rx="9" ry="14" class="f-ys s-y" stroke-width="2"/><path d="M318 230V224" class="s-y" stroke-width="2"/><path d="M318 258V280M314 262L306 280" class="s-y" stroke-width="2"/></g>
  <text x="330" y="162" class="t" text-anchor="middle">papila de perto</text></g>
 <g data-h="gostos">${[['doce','f-pk'],['salgado','f-cs'],['azedo','f-ys'],['amargo','f-gs'],['umami','f-vs']].map(([g,c],i)=>`<rect x="368" y="${18+i*28}" width="64" height="22" rx="11" class="${c}"/><text x="400" y="${33+i*28}" class="t" text-anchor="middle">${g}</text>`).join('')}</g>
 <g data-h="sabor"><path d="M204 176C214 160 198 142 172 132" class="arw" stroke-dasharray="4 3"/><rect x="14" y="268" width="168" height="32" rx="12" class="f-p s-r" stroke-width="1.5"/><text x="98" y="289" class="t" text-anchor="middle">sabor = gosto + cheiro</text></g>
</svg>`
};

/* ilustrações do topo de cada aba */
const HERO={
nervoso:()=>`<svg viewBox="0 0 300 270" aria-hidden="true">
 <path d="M150 170V266" class="s-c" stroke-width="14" stroke-linecap="round"/>
 ${['M150 200C120 205 86 216 52 258','M150 200C180 205 214 216 248 258','M150 232C132 238 114 248 100 266','M150 232C168 238 186 248 200 266','M150 182C130 184 108 188 78 206','M150 182C170 184 192 188 222 206'].map(d=>`<path d="${d}" class="f-n s-y" stroke-width="4" stroke-linecap="round"/>`).join('')}
 ${brain(150,92,2.25)}
 ${spark('M52 258C86 216 120 205 150 200V120','2.4s')}${spark('M248 258C214 216 180 205 150 200V120','2.4s','1.2s')}${spark('M78 206C108 188 130 184 150 182V120','2s','.6s')}
</svg>`,
sensorial:()=>`<svg viewBox="0 0 300 270" aria-hidden="true">
 <path d="M30 135Q150 30 270 135Q150 240 30 135Z" class="f-p s-i" stroke-width="3"/>
 <circle cx="150" cy="135" r="50" class="f-c"/>${Array.from({length:16},(_,i)=>{const a=i*Math.PI/8;return `<path d="M${(150+24*Math.cos(a)).toFixed(1)} ${(135+24*Math.sin(a)).toFixed(1)}L${(150+46*Math.cos(a)).toFixed(1)} ${(135+46*Math.sin(a)).toFixed(1)}" class="s-p" stroke-width="2" opacity=".5"/>`}).join('')}
 <circle cx="150" cy="135" r="20" class="f-i pupil"/><circle cx="166" cy="118" r="8" style="fill:#fff"/>
 <path d="M30 135Q150 30 270 135" class="f-n s-i" stroke-width="3"/>
 <g class="float"><ellipse cx="40" cy="40" rx="8" ry="6" class="f-v" transform="rotate(-20 40 40)"/><path d="M47 37V14l13 5" class="f-n s-v" stroke-width="3"/></g>
 <g><circle cx="256" cy="34" r="8" class="f-rs"/><circle cx="266" cy="44" r="8" class="f-rs"/><circle cx="256" cy="54" r="8" class="f-rs"/><circle cx="246" cy="44" r="8" class="f-rs"/><circle cx="256" cy="44" r="5" class="f-y"/></g>
 <g><path d="M30 228L40 252L50 228Z" class="f-ys s-y" stroke-width="2"/><circle cx="40" cy="220" r="11" class="f-pk"/></g>
 <g class="float"><path d="M244 252C252 232 264 222 272 216C270 232 260 244 248 252Z" class="f-vs s-v" stroke-width="2"/><path d="M240 258L256 238" class="s-v" stroke-width="2"/></g>
</svg>`};
const TABICON={nervoso:`<svg viewBox="-50 -42 100 84" aria-hidden="true">${brain(0,0,1)}</svg>`,sensorial:`<svg viewBox="-20 -14 40 28" aria-hidden="true">${eyeIcon(0,0,1.15)}</svg>`};

/* ================= conteúdo ================= */
const TABS=[
 {id:'nervoso',label:'Sistema nervoso',title:'A central de comando do corpo',intro:'Como o corpo recebe recados, decide o que fazer e reage, às vezes antes mesmo de você pensar.',next:'sensorial'},
 {id:'sensorial',label:'Sistema sensorial',title:'Como a gente percebe o mundo',intro:'Olhos, orelhas, pele, nariz e língua captam o que acontece ao redor. Quem entende tudo é o cérebro.',next:'nervoso'}
];

const S=[
/* ===== SISTEMA NERVOSO ===== */
{id:'partes',tab:'nervoso',title:'As partes do sistema nervoso',lead:'Uma central que decide e uma rede de fios que leva e traz recados.',
body:`<p>O sistema nervoso funciona como a <b>central de comando</b> do corpo. Ele recebe informações (está frio, a bola vem vindo), decide o que fazer e manda ordens para o corpo reagir.</p><p>Ele tem duas grandes partes:</p><ul><li><b>Sistema nervoso central:</b> é quem decide. É formado pelo <b>encéfalo</b>, que fica dentro do crânio, e pela <b>medula espinal</b>, que fica dentro da coluna.</li><li><b>Sistema nervoso periférico:</b> são os <b>nervos</b>, que se espalham pelo corpo todo como fios, levando recados até a central e trazendo as ordens de volta.</li></ul><p>Os ossos protegem as partes mais importantes: o crânio protege o encéfalo, e a coluna protege a medula.</p>`,
tip:`<b>Encéfalo não é a mesma coisa que cérebro.</b> Encéfalo é tudo o que fica dentro do crânio; o cérebro é a maior parte dele. E a medula espinal não é o tutano dos ossos: são coisas diferentes.`,
hs:{encefalo:['Encéfalo','Fica dentro do crânio. É a parte que pensa, sente, lembra e decide. Faz parte do sistema nervoso central.'],
medula:['Medula espinal','Um cordão grosso que desce por dentro da coluna. Liga o encéfalo ao resto do corpo e também resolve sozinha algumas reações rápidas, os reflexos.'],
nervos:['Nervos','Feixes de fios que chegam a cada pedacinho do corpo. Alguns levam informações para a central; outros trazem as ordens de volta para os músculos. A bolinha amarela mostra um recado subindo.'],
ganglios:['Gânglios','Pequenos grupos de células nervosas no caminho dos nervos, como estações de passagem. Fazem parte da rede periférica.'],
snc:['Sistema nervoso central','Encéfalo + medula espinal. É a central que recebe as informações e decide o que fazer.'],
snp:['Sistema nervoso periférico','Nervos e gânglios. É a rede de entrega: leva e traz recados entre a central e o corpo.']},
qs:[['Quais partes formam o sistema nervoso central?',['Os nervos dos braços e das pernas','O encéfalo e a medula espinal','Os músculos e os ossos','O coração e os pulmões'],1,'A central é formada pelo encéfalo (dentro do crânio) e pela medula espinal (dentro da coluna). Os nervos fazem parte do sistema periférico.'],
['Qual é o trabalho dos nervos?',['Proteger o encéfalo de pancadas','Levar e trazer recados entre a central e o resto do corpo','Produzir o sangue','Guardar as memórias'],1,'Os nervos são como fios: ligam a central a cada parte do corpo, nos dois sentidos.']]},

{id:'encefalo',tab:'nervoso',title:'O encéfalo: quem faz o quê',lead:'Cada parte cuida de um trabalho diferente.',
body:`<p>O encéfalo tem três partes principais:</p><ul><li><b>Cérebro:</b> a maior parte. Pensa, aprende, lembra, sente emoções e dá as ordens dos movimentos que você escolhe fazer. Cada região cuida de uma coisa: ver, ouvir, sentir o toque, decidir.</li><li><b>Cerebelo:</b> fica atrás e embaixo. Cuida do <b>equilíbrio</b> e deixa os movimentos certinhos e coordenados.</li><li><b>Tronco encefálico:</b> liga o encéfalo à medula e controla o que não pode parar nunca, como a <b>respiração</b> e os <b>batimentos do coração</b>.</li></ul>`,
tip:`Um jeito de lembrar: o <b>cérebro pensa</b>, o <b>cerebelo equilibra</b> e o <b>tronco mantém o corpo funcionando</b> no piloto automático. Andar de bicicleta sem cair é trabalho do cerebelo.`,
hs:{frente:['Frente do cérebro','Planejar, decidir, prestar atenção e controlar o comportamento. É ela que ajuda a segurar a vontade de rir na hora errada.'],
topo:['Faixa do alto','Uma faixa manda as ordens para os músculos se mexerem; logo atrás, outra recebe as sensações de toque, dor, calor e frio do corpo todo.'],
visao:['Parte de trás','É onde as imagens que chegam dos olhos são montadas. Os olhos captam a luz, mas quem “enxerga” de verdade é o cérebro.'],
lado:['Parte do lado','Recebe os sons que vêm das orelhas, ajuda a entender o que as pessoas falam e participa da memória.'],
cerebelo:['Cerebelo','Cuida do equilíbrio e da coordenação: andar, correr, pular corda, escrever com letra firme. Quando ele não funciona bem, a pessoa cambaleia.'],
tronco:['Tronco encefálico','Controla a respiração e os batimentos do coração sem você precisar pensar. Também é o caminho entre o cérebro e a medula.']},
qs:[['Uma pessoa bateu a parte de trás da cabeça e agora tem dificuldade para se equilibrar. Qual parte provavelmente foi atingida?',['Cerebelo','Tronco encefálico','Frente do cérebro','Medula espinal'],0,'O cerebelo, que fica atrás e embaixo, cuida do equilíbrio e da coordenação dos movimentos.'],
['Por que você continua respirando mesmo dormindo?',['Porque o cerebelo controla a respiração','Porque o tronco encefálico controla a respiração sozinho','Porque os pulmões funcionam sem o sistema nervoso','Porque a gente sonha que está respirando'],1,'O tronco encefálico mantém a respiração e os batimentos funcionando o tempo todo, mesmo quando você não está pensando neles.']]},

{id:'neuronio',tab:'nervoso',title:'O neurônio',lead:'A célula que passa os recados, como um fio elétrico vivo.',
body:`<p>O sistema nervoso é feito de bilhões de células chamadas <b>neurônios</b>. O trabalho deles é passar mensagens, que viajam como pequenos sinais elétricos: os <b>impulsos nervosos</b>.</p><p>Todo neurônio tem três partes principais:</p><ol><li><b>Dendritos:</b> os galhinhos que <b>recebem</b> a mensagem.</li><li><b>Corpo celular:</b> o centro da célula, onde fica o núcleo.</li><li><b>Axônio:</b> um prolongamento comprido que <b>leva</b> a mensagem adiante.</li></ol><p>A mensagem anda sempre no mesmo sentido: <b>dendritos → corpo celular → axônio</b>. No fim do axônio, ela passa para o próximo neurônio por um espacinho chamado <b>sinapse</b>.</p>`,
tip:`<b>O caminho da mensagem cai muito:</b> entra pelos dendritos, passa pelo corpo celular e sai pelo axônio. Os neurônios não se encostam: entre um e outro fica a sinapse.`,
hs:{dendritos:['Dendritos','Galhinhos curtos que recebem a mensagem de outros neurônios ou dos sentidos. São a “entrada” do neurônio.'],
corpo:['Corpo celular','O centro do neurônio. Tem o núcleo (a bolinha roxa) e mantém a célula viva.'],
axonio:['Axônio','Um “fio” comprido que leva a mensagem para longe do corpo celular. Alguns vão da coluna até o pé!'],
mielina:['Bainha de mielina','Uma capa de gordura em volta do axônio, como o plástico que cobre um fio. Faz a mensagem correr muito mais rápido.'],
terminais:['Terminais','As pontinhas no fim do axônio. É de lá que a mensagem sai para a próxima célula.'],
sinapse:['Sinapse','O espacinho entre um neurônio e o próximo. A mensagem atravessa levada por substâncias químicas (as bolinhas amarelas).'],
impulso:['Impulso nervoso','A mensagem em si: um sinal elétrico que corre pelo neurônio, sempre no mesmo sentido. A bolinha amarela mostra o caminho.']},
qs:[['Qual é o caminho da mensagem dentro de um neurônio?',['Axônio → corpo celular → dendritos','Dendritos → corpo celular → axônio','Corpo celular → dendritos → axônio','Ela anda para qualquer lado'],1,'A mensagem entra pelos dendritos, passa pelo corpo celular e sai pelo axônio. É sempre nesse sentido.'],
['O que é a sinapse?',['A capa de gordura do axônio','O núcleo do neurônio','O espacinho onde a mensagem passa de um neurônio para outro','Um nervo da perna'],2,'Os neurônios não se encostam. A mensagem atravessa a sinapse levada por substâncias químicas. A capa de gordura é a bainha de mielina.']]},

{id:'movimentos',tab:'nervoso',title:'Movimentos voluntários e involuntários',lead:'Alguns você escolhe fazer. Outros acontecem sozinhos.',
body:`<p><b>Movimentos voluntários</b> são os que você <b>decide</b> fazer: chutar uma bola, escrever, levantar a mão, falar. A ordem sai do <b>cérebro</b>, desce pela medula e chega aos músculos pelos nervos.</p><p><b>Movimentos involuntários</b> acontecem <b>sem você mandar</b>: o coração batendo, o estômago fazendo a digestão, a pupila do olho mudando de tamanho. Uma parte do sistema nervoso cuida deles no <b>piloto automático</b>.</p><p>Alguns ficam no meio do caminho: dá para <b>prender a respiração</b> ou <b>segurar uma piscada</b> por um tempo, mas logo o corpo volta a fazer sozinho.</p>`,
tip:`<b>Pergunte: eu consigo parar isso quando eu quiser?</b> Se sim, é voluntário. Se não (como o coração), é involuntário. Respirar e piscar são casos especiais: dá para controlar um pouco, mas o automático sempre volta.`,
hs:{ordem:['A ordem vem do cérebro','Para chutar a bola, o cérebro decide e manda a ordem. Ela desce pela medula e pelos nervos até os músculos da perna.'],
chute:['Movimento voluntário','Chutar, correr, desenhar, pular: são movimentos que você escolhe fazer.'],
outros:['Outros exemplos','Escrever, falar, pegar um copo, dançar, digitar: tudo o que você faz porque quis.'],
coracao:['Coração','Bate o tempo todo, sem você mandar. O sistema nervoso só ajusta a velocidade: mais rápido quando você corre ou leva um susto.'],
pulmao:['Respiração','Funciona sozinha, até dormindo. Dá para prender o ar por um tempo, mas logo o corpo obriga você a respirar de novo.'],
estomago:['Digestão','O estômago e o intestino se mexem sozinhos para misturar e empurrar o alimento. Você nem percebe.'],
olho:['Pupila e piscada','A pupila fica menor na luz forte e maior no escuro, sem você mandar. Piscar também é automático, mas dá para segurar um pouco.'],
piloto:['Piloto automático','A parte do sistema nervoso que cuida dos movimentos involuntários trabalha sem a gente perceber. É ela que mantém o corpo funcionando enquanto você dorme.']},
qs:[['Qual destes é um movimento voluntário?',['Os batimentos do coração','A digestão no estômago','Levantar a mão para responder','A pupila diminuindo no sol'],2,'Levantar a mão depende da sua decisão. Os outros acontecem sozinhos.'],
['Por que não dá para prender a respiração para sempre?',['Porque o pulmão não tem músculos','Porque a respiração também é controlada no automático, e o automático volta a funcionar','Porque o cerebelo proíbe','Porque respirar é um movimento só voluntário'],1,'Dá para controlar a respiração por um tempo, mas o corpo percebe a falta de ar e faz você respirar de novo, querendo ou não.']]},

{id:'reflexo',tab:'nervoso',title:'Arco reflexo',lead:'A reação rápida que acontece antes de você pensar.',
body:`<p>Quando você encosta a mão numa panela quente, puxa a mão <b>antes</b> de sentir a dor. Isso é um <b>ato reflexo</b>: uma reação rápida e automática que protege o corpo.</p><p>O segredo é que a decisão não vai até o cérebro: ela é tomada na <b>medula espinal</b>, que fica mais perto. O caminho que a mensagem faz se chama <b>arco reflexo</b>:</p><ol><li>A pele sente o calor.</li><li>Um neurônio leva o aviso até a medula.</li><li>Na medula, a mensagem passa para outro neurônio, que já decide.</li><li>Um neurônio leva a ordem de volta até o músculo.</li><li>O músculo puxa a mão.</li></ol><p>Só <b>depois</b> o aviso chega ao cérebro, e aí você sente a dor e pensa “ai!”.</p><p>Outro exemplo famoso: quando o médico bate com um martelinho logo abaixo do joelho e a perna chuta sozinha.</p>`,
tip:`<b>O reflexo é rápido porque é resolvido na medula, não no cérebro.</b> Por isso a mão sai da panela antes de você sentir dor. Outros reflexos: piscar quando algo vem no olho, espirrar e tossir.`,
hs:{receptor:['1. A pele sente','A pele percebe o calor forte. Começa aqui o caminho da mensagem.'],
sensitivo:['2. Neurônio que leva o aviso','Leva a mensagem da pele até a medula espinal, bem rápido.'],
medula:['3. Medula espinal','Aqui a decisão é tomada na hora, sem esperar o cérebro: um neurônio passa o recado para o neurônio que dá a ordem.'],
motor:['4. Neurônio que leva a ordem','Leva a ordem da medula até o músculo do braço.'],
musculo:['5. Músculo','Recebe a ordem e se contrai, puxando a mão para longe da panela.'],
cerebro:['Depois: o cérebro','O aviso também sobe até o cérebro, mas chega um pouquinho depois. Só então você sente a dor.']},
qs:[['Em um ato reflexo, onde a reação é decidida?',['No cérebro','Na medula espinal','No coração','Na própria pele'],1,'A medula resolve a reação na hora. O cérebro só fica sabendo depois.'],
['Por que você tira a mão da panela antes de sentir dor?',['Porque a dor nunca chega ao cérebro','Porque a ordem de puxar a mão sai da medula antes de o aviso chegar ao cérebro','Porque o músculo do braço decide sozinho','Porque o cerebelo é mais rápido que o cérebro'],1,'O caminho até a medula é curto. A dor só é sentida quando o aviso chega ao cérebro, um instante depois.']]},

{id:'cuidados',tab:'nervoso',title:'Problemas e cuidados',lead:'O que pode machucar o sistema nervoso e como proteger.',
body:`<p>O sistema nervoso é bem protegido por ossos, mas algumas coisas podem prejudicá-lo, às vezes para sempre, porque muitos neurônios não se recuperam quando são destruídos.</p><ul><li><b>Pancadas na cabeça e na coluna:</b> podem machucar o encéfalo ou a medula. Uma lesão na medula pode deixar a pessoa sem conseguir mexer ou sentir partes do corpo.</li><li><b>Álcool e outras drogas:</b> deixam os reflexos lentos, atrapalham a memória e a atenção e podem viciar.</li><li><b>AVC (derrame):</b> acontece quando o sangue para de chegar a uma parte do cérebro, por um vaso entupido ou rompido.</li><li><b>Doenças:</b> Alzheimer (perda de memória, mais comum em idosos), Parkinson (tremores e movimentos lentos), epilepsia (crises causadas por sinais elétricos desorganizados no cérebro) e meningite (infecção nas capas que envolvem o encéfalo e a medula).</li></ul>`,
after:`<h4>Como proteger</h4><ul><li>Capacete na bicicleta, no skate e nos patins; cinto de segurança no carro.</li><li>Nunca mergulhar de cabeça em lugar raso ou desconhecido.</li><li>Tomar as vacinas: existem vacinas contra tipos de meningite.</li><li>Dormir bem: é no sono que o cérebro organiza o que você aprendeu.</li></ul><p>Sinais de AVC: rosto torto, braço fraco de um lado e fala enrolada. Se perceber isso em alguém, chame ajuda na hora (SAMU, 192).</p>`,
tip:`<b>Por que proteger tanto?</b> Muitos neurônios não se regeneram como a pele. Uma lesão na medula, por exemplo, pode deixar o corpo sem movimento abaixo do ponto machucado.`,
hs:{capacete:['Pancadas na cabeça','O crânio protege o encéfalo, mas batidas fortes podem machucá-lo. Capacete e cinto de segurança diminuem muito o risco.'],
coluna:['Coluna e medula','A medula fica dentro da coluna. Se ela for machucada (num mergulho em lugar raso, por exemplo), os recados param de passar e a pessoa pode perder movimentos.'],
drogas:['Álcool e drogas','Atrapalham a comunicação entre os neurônios: os reflexos ficam lentos, a pessoa pensa e decide pior e pode ficar viciada.'],
avc:['AVC','Quando o sangue para de chegar a uma parte do cérebro, os neurônios dali ficam sem oxigênio. Sinais: rosto torto, braço fraco e fala enrolada. Ligue 192.'],
doencas:['Doenças do sistema nervoso','Alzheimer afeta a memória, Parkinson causa tremores e lentidão e a epilepsia provoca crises. Várias têm tratamento que ajuda a controlar.'],
meningite:['Meningite','Infecção nas capas que envolvem o encéfalo e a medula, causada por vírus ou bactérias. Existem vacinas contra os tipos mais perigosos.'],
sono:['Hábitos que protegem','Dormir bem, se alimentar bem e fazer atividade física ajudam o cérebro a funcionar e a guardar o que você aprendeu.']},
qs:[['Por que é perigoso mergulhar de cabeça em lugar raso?',['Porque a água entra na orelha','Porque a batida pode machucar a medula espinal dentro da coluna','Porque o cerebelo fica molhado','Porque o mergulho causa meningite'],1,'A pancada pode lesionar a medula. Sem ela, os recados entre o encéfalo e o corpo param de passar.'],
['O que acontece num AVC?',['Um vírus infecta as capas do encéfalo','O sangue para de chegar a uma parte do cérebro','Os ossos do crânio crescem demais','O cerebelo cansa e para de funcionar'],1,'Sem sangue, os neurônios daquela região ficam sem oxigênio. A alternativa do vírus descreve a meningite.']]},

/* ===== SISTEMA SENSORIAL ===== */
{id:'sentidos',tab:'sensorial',title:'Como os sentidos funcionam',lead:'Os órgãos captam, os nervos levam e o cérebro entende.',
body:`<p>Os sentidos são o jeito de o corpo perceber o que acontece ao redor. São cinco: <b>visão, audição, tato, olfato e paladar</b>.</p><p>Todos funcionam da mesma forma:</p><ol><li>Algo no ambiente (luz, som, cheiro, gosto, toque) é o <b>estímulo</b>.</li><li>O órgão do sentido tem células especiais, os <b>receptores</b>, que captam esse estímulo.</li><li>Os receptores transformam o estímulo em <b>impulso nervoso</b>.</li><li>Um <b>nervo</b> leva o impulso até o cérebro.</li><li>O <b>cérebro</b> entende: “isso é a voz da minha mãe”, “isso está quente”.</li></ol>`,
tip:`<b>Quem enxerga, ouve e sente é o cérebro.</b> Os olhos, as orelhas e a pele só captam e mandam o recado. Se o nervo que liga o olho ao cérebro for danificado, a pessoa não enxerga, mesmo com o olho perfeito.`,
hs:{estimulo:['Estímulo','Tudo o que os sentidos podem perceber: luz, som, cheiro, gosto, toque, calor e frio.'],
receptores:['Órgãos dos sentidos','Olhos, orelhas, nariz, língua e pele. Cada um tem receptores especialistas em um tipo de estímulo.'],
nervos:['Nervos','Levam o impulso nervoso do órgão do sentido até o cérebro. As bolinhas amarelas mostram os recados viajando.'],
cerebro:['Cérebro','Recebe os impulsos, e cada região interpreta um tipo: imagem, som, cheiro, gosto, toque.'],
percepcao:['Percepção','O resultado final: você entende o que está acontecendo e pode decidir o que fazer, como cheirar a flor de novo.']},
qs:[['Qual a ordem certa do caminho de uma sensação?',['Cérebro → nervo → receptor → estímulo','Estímulo → receptor → nervo → cérebro','Nervo → estímulo → cérebro → receptor','Receptor → cérebro → estímulo → nervo'],1,'O estímulo é captado pelo receptor, vira impulso, viaja pelo nervo e é entendido no cérebro.'],
['Uma pessoa tem os olhos saudáveis, mas o nervo que liga os olhos ao cérebro foi danificado. O que acontece?',['Ela enxerga normalmente','Ela não consegue enxergar','Ela passa a enxergar só cores','Ela enxerga tudo de cabeça para baixo'],1,'Sem o nervo, o recado não chega ao cérebro, que é quem monta a imagem.']]},

{id:'visao',tab:'sensorial',title:'Visão',lead:'O olho funciona como uma câmera; o cérebro revela a foto.',
body:`<p>A luz bate nos objetos e entra no olho. Lá dentro, ela atravessa algumas partes até chegar ao fundo, onde fica a <b>retina</b>, cheia de receptores de luz. A retina manda o recado pelo <b>nervo óptico</b> até o cérebro, que monta a imagem.</p><ul><li><b>Íris:</b> a parte colorida do olho.</li><li><b>Pupila:</b> a “bolinha preta” no meio da íris, por onde a luz entra. Fica menor na luz forte e maior no escuro.</li><li><b>Cristalino:</b> uma lente que deixa a imagem nítida.</li><li><b>Retina:</b> a “tela” no fundo do olho, onde a imagem se forma.</li></ul><p>Curiosidade: a imagem se forma <b>de cabeça para baixo</b> na retina, e o cérebro desvira.</p>`,
after:`<h4>Quando a imagem fica embaçada</h4><ul><li><b>Miopia:</b> a pessoa enxerga mal de longe.</li><li><b>Hipermetropia:</b> enxerga mal de perto.</li></ul><p>Óculos e lentes de contato corrigem esses problemas. E nunca olhe direto para o Sol: a luz forte pode queimar a retina.</p>`,
tip:`<b>Pupila é diferente de íris.</b> Íris é a parte colorida (é ela que dá a cor dos olhos); pupila é o buraquinho preto no meio, por onde a luz passa.`,
hs:{luz:['Luz','A luz do Sol bate na árvore e é refletida até o olho. Sem luz, não dá para enxergar nada.'],
cornea:['Córnea','Uma camada transparente na frente do olho, como um vidro de proteção. A luz passa por ela primeiro.'],
iris:['Íris e pupila','A íris (em roxo) é a parte colorida; ela abre e fecha a pupila, o buraquinho por onde a luz entra.'],
cristalino:['Cristalino','Uma lente natural que muda de forma para deixar a imagem nítida, de perto ou de longe.'],
retina:['Retina','O fundo do olho, cheio de receptores de luz. É a “tela” onde a imagem se forma.'],
invertida:['Imagem de cabeça para baixo','Na retina, a árvore aparece invertida. O cérebro desvira e você vê tudo do jeito certo.'],
nervo:['Nervo óptico','Leva o recado da retina até a parte de trás do cérebro, que monta a imagem.'],
pupila:['Pupila na luz e no escuro','Na luz forte a pupila fica pequena para proteger o olho; no escuro ela aumenta para deixar entrar mais luz. Acontece sozinho: é involuntário.']},
qs:[['O que acontece com a pupila quando você entra num quarto escuro?',['Ela diminui','Ela aumenta para deixar entrar mais luz','Ela muda de cor','Ela fecha completamente'],1,'No escuro a pupila aumenta, para entrar mais luz. Na luz forte, ela diminui.'],
['Em que parte do olho a imagem se forma?',['Na íris','Na córnea','Na retina','Na pupila'],2,'A retina, no fundo do olho, tem os receptores de luz. É lá que a imagem se forma, de cabeça para baixo.']]},

{id:'audicao',tab:'sensorial',title:'Audição e equilíbrio',lead:'O som chega como uma vibração e vira mensagem para o cérebro.',
body:`<p>O som é uma <b>vibração</b> que viaja pelo ar. A orelha capta essa vibração e a transforma em impulso nervoso. Ela tem três partes:</p><ol><li><b>Orelha externa:</b> a parte que vemos e o canal que leva o som para dentro.</li><li><b>Orelha média:</b> o <b>tímpano</b>, uma pele fininha que vibra como um tambor, e três <b>ossinhos</b> que passam a vibração adiante. Um deles, o estribo, é o menor osso do corpo.</li><li><b>Orelha interna:</b> a <b>cóclea</b>, em forma de caracol, transforma a vibração em impulso nervoso. Um nervo leva o recado ao cérebro.</li></ol><p>Na orelha interna também ficam os <b>canais do equilíbrio</b>. Eles percebem quando a cabeça se mexe ou gira, e é por isso que você fica tonto depois de rodar muito.</p>`,
tip:`<b>A orelha cuida de dois sentidos:</b> audição e equilíbrio. E som alto demais (fone no volume máximo por muito tempo) pode estragar a cóclea e causar perda de audição para sempre.`,
hs:{externa:['Orelha externa','Funciona como uma concha que junta o som e o manda pelo canal até o tímpano.'],
ondas:['Som','O som é uma vibração do ar. Quanto mais forte a vibração, mais alto o som.'],
timpano:['Tímpano','Uma pele fininha que vibra quando o som chega, como a pele de um tambor.'],
ossiculos:['Ossinhos','Três ossinhos (martelo, bigorna e estribo) que passam a vibração do tímpano para a orelha interna.'],
coclea:['Cóclea','Tem formato de caracol e é cheia de líquido. Seus receptores transformam a vibração em impulso nervoso.'],
equilibrio:['Canais do equilíbrio','Três tubinhos com líquido que se mexe quando a cabeça se move. Assim o cérebro sabe a posição do corpo.'],
nervo:['Nervo','Leva o impulso da orelha interna até o cérebro, que reconhece o som: uma música, uma voz, um latido.'],
tuba:['Tuba auditiva','Um canal que liga a orelha média à garganta e equilibra a pressão. É por isso que o ouvido “estala” no avião ou descendo a serra.']},
qs:[['Qual parte da orelha transforma a vibração do som em impulso nervoso?',['O tímpano','A cóclea','A orelha externa','A tuba auditiva'],1,'A cóclea, na orelha interna, tem os receptores que criam o impulso. O tímpano só vibra.'],
['Por que ficamos tontos depois de girar muito?',['Porque o líquido dos canais do equilíbrio continua se mexendo','Porque o tímpano estoura','Porque os olhos se cansam','Porque falta ar no pulmão'],0,'O líquido dos canais do equilíbrio continua em movimento mesmo depois que você para, e o cérebro acha que você ainda está girando.']]},

{id:'tato',tab:'sensorial',title:'Tato',lead:'A pele é o maior órgão do corpo e sente muita coisa ao mesmo tempo.',
body:`<p>A pele está cheia de <b>receptores</b>, e cada tipo percebe uma coisa diferente: <b>toque, pressão, calor, frio e dor</b>.</p><p>Esses receptores ficam espalhados, mas não por igual. Nas <b>pontas dos dedos</b>, nos <b>lábios</b> e na <b>língua</b> há muitos deles, por isso essas partes são tão sensíveis. Nas costas há bem menos.</p><p>A <b>dor</b> parece ruim, mas é uma proteção: ela avisa que algo está machucando o corpo.</p>`,
tip:`<b>A pele é o maior órgão do corpo</b> e é o órgão do tato. Pessoas cegas leem em braile com as pontas dos dedos justamente porque ali há muitos receptores.`,
hs:{camadas:['Camadas da pele','Por fora a epiderme, que protege; embaixo a derme, onde ficam os receptores; e mais fundo uma camada de gordura que guarda calor.'],
toque:['Toque leve','Esse receptor percebe toques leves, como uma pena ou um carinho.'],
pressao:['Pressão','Fica mais fundo e percebe quando algo aperta ou pesa sobre a pele.'],
calor:['Calor','Percebe quando algo está quente.'],
frio:['Frio','Percebe quando algo está frio, como um cubo de gelo.'],
dor:['Dor','Pontinhas de nervo soltas que avisam quando algo machuca: um corte, uma picada, um calor exagerado.'],
nervo:['Nervo','Junta os recados de todos os receptores e leva até a medula e o cérebro.'],
sensivel:['Partes mais sensíveis','As pontas dos dedos, os lábios e a língua têm muito mais receptores do que as costas, por exemplo.']},
qs:[['Por que as pontas dos dedos são mais sensíveis que as costas?',['Porque a pele dos dedos é mais grossa','Porque têm muito mais receptores','Porque ficam mais perto do cérebro','Porque não sentem dor'],1,'Quanto mais receptores numa região, mais sensível ela é. As pontas dos dedos têm muitos.'],
['Para que serve sentir dor?',['Para nada, é um defeito do corpo','Para avisar que algo está machucando o corpo','Para ajudar a enxergar no escuro','Para controlar o equilíbrio'],1,'A dor é um alarme. Ela faz você se afastar do que está causando o machucado.']]},

{id:'paladar',tab:'sensorial',title:'Olfato e paladar',lead:'O nariz e a língua trabalham juntos para sentir o sabor.',
body:`<p><b>Olfato</b> é o sentido do cheiro. Partículas invisíveis soltas no ar (de uma flor, de uma pizza) entram pelo nariz e encostam em receptores no <b>alto do nariz</b>. Um nervo leva o recado ao cérebro.</p><p><b>Paladar</b> é o sentido do gosto. A língua é coberta de pequenas elevações, as <b>papilas</b>, com receptores que percebem cinco gostos básicos: <b>doce, salgado, azedo, amargo e umami</b> (o gosto de carnes e queijos).</p><p>O <b>sabor</b> de uma comida é a mistura do gosto com o cheiro. Por isso, quando você está gripado e com o nariz entupido, a comida parece sem graça.</p>`,
tip:`<b>O “mapa da língua” é mito.</b> Aquele desenho com o doce na ponta e o amargo no fundo está errado: todas as partes da língua percebem todos os gostos.`,
hs:{cheiro:['Partículas de cheiro','Coisas cheirosas soltam partículas pequeninas no ar. Quando você respira, elas entram pelo nariz.'],
olfato:['Receptores do cheiro','Ficam no alto do nariz. Por isso, para sentir bem um cheiro, a gente puxa o ar com força.'],
cerebro:['Cérebro','Recebe os recados do nariz e da língua e junta tudo para criar o sabor. Cheiros também trazem lembranças com muita força.'],
lingua:['Língua','Coberta de papilas, que dão a textura áspera. Também ajuda a mastigar, engolir e falar.'],
papila:['Papila de perto','Dentro das papilas ficam os botões gustativos (em amarelo), com receptores que percebem o gosto dos alimentos misturados à saliva.'],
gostos:['Cinco gostos básicos','Doce, salgado, azedo, amargo e umami. Todas as partes da língua percebem todos eles.'],
sabor:['Sabor = gosto + cheiro','O cheiro da comida também sobe pelo fundo da boca até o nariz (a setinha tracejada). Sem ele, a comida perde boa parte do sabor.']},
qs:[['Por que a comida parece sem gosto quando estamos gripados?',['Porque a gripe destrói a língua','Porque o nariz entupido impede de sentir o cheiro, que faz parte do sabor','Porque a saliva acaba','Porque a febre desliga o cérebro'],1,'O sabor é a mistura de gosto e cheiro. Sem o olfato, só sobram os gostos básicos.'],
['Quais são os cinco gostos básicos?',['Doce, salgado, azedo, amargo e umami','Doce, salgado, quente, frio e amargo','Doce, ardido, azedo, gelado e salgado','Só doce e salgado'],0,'Quente, frio e ardido não são gostos: são sensações percebidas por outros receptores.']]}
];

/* ================= estado ================= */
const KEY='sistema-nervoso-v1';
let state={a:{},tab:'nervoso'};
try{const raw=localStorage.getItem(KEY);if(raw){const p=JSON.parse(raw);if(p&&p.a)state=Object.assign(state,p);}}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){}};
const strip=t=>t.replace(/<[^>]+>/g,'');
const L='ABCD';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ================= montagem ================= */
const tabsEl=document.getElementById('tabs'),panels=document.getElementById('panels');
TABS.forEach(T=>{
  const list=S.filter(s=>s.tab===T.id);
  const b=document.createElement('button');
  b.className='tab';b.type='button';b.setAttribute('role','tab');b.id='tab-'+T.id;b.setAttribute('aria-controls','p-'+T.id);b.dataset.tab=T.id;
  b.innerHTML=`${TABICON[T.id]}<span>${T.label}</span><span class="pc" data-pc="${T.id}"></span>`;
  tabsEl.appendChild(b);

  const P=document.createElement('section');
  P.className='panel';P.id='p-'+T.id;P.setAttribute('role','tabpanel');P.setAttribute('aria-labelledby','tab-'+T.id);
  const other=TABS.find(x=>x.id===T.next);
  P.innerHTML=`<header class="hero"><div><h1>${T.title}</h1><p class="intro">${T.intro}</p>
      <ol class="map">${list.map((s,i)=>`<li><button type="button" data-go="${s.id}"><span class="dot">${i+1}</span><span>${s.title}</span></button></li>`).join('')}</ol></div>
      <div class="hero-art">${HERO[T.id]()}</div></header>
    <main class="journey"></main>
    <section class="finish"><h2>Fim do caminho</h2><p data-ft></p><p class="score" data-score></p><p data-weak></p>
      <div class="btns"><button class="btn main" type="button" data-switch="${other.id}">Ir para ${other.label}</button><button class="btn" type="button" data-reset="${T.id}">Recomeçar esta aba</button></div></section>`;
  panels.appendChild(P);
  const J=P.querySelector('.journey');

  list.forEach((s,i)=>{
    const keys=Object.keys(s.hs);
    const el=document.createElement('article');
    el.className='station';el.id='st-'+s.id;
    el.innerHTML=`<div class="node" aria-hidden="true">${i+1}</div>
      <h3>${s.title}</h3><p class="lead">${s.lead}</p>
      <div class="prose">${s.body}</div>
      <figure class="explore" style="margin-left:0;margin-right:0">
        <div class="fig">${SVG[s.id]()}</div>
        <div class="info empty" aria-live="polite"><p class="count"><b>0</b> de ${keys.length} partes descobertas</p><div class="meter"><i></i></div><h4>Explore o desenho</h4><p class="txt">Toque ou passe o mouse nas partes do desenho para descobrir o que cada uma faz.</p></div>
      </figure>
      ${s.after?`<div class="prose">${s.after}</div>`:''}
      <aside class="tip"><p class="k">Cai muito</p><p>${s.tip}</p></aside>
      <div class="quiz"><h4>Perguntas de fixação</h4>${s.qs.map((q,qi)=>`<div class="q" data-s="${s.id}" data-q="${qi}"><p class="qp">${qi+1}. ${q[0]}</p><div class="opts">${q[1].map((o,oi)=>`<button type="button" class="opt" data-o="${oi}"><span class="l">${L[oi]}</span><span>${o}</span></button>`).join('')}</div><p class="exp" hidden></p></div>`).join('')}</div>`;
    J.appendChild(el);

    const svg=el.querySelector('.fig svg'),info=el.querySelector('.info'),seen=new Set();
    const show=n=>{
      const k=n.getAttribute('data-h'),d=s.hs[k];if(!d)return;
      svg.classList.add('has-on');
      svg.querySelectorAll('[data-h]').forEach(x=>x.classList.toggle('on',x.getAttribute('data-h')===k));
      seen.add(k);info.classList.remove('empty');
      info.querySelector('.count').innerHTML=`<b>${seen.size}</b> de ${keys.length} partes descobertas`;
      info.querySelector('.meter i').style.width=(seen.size/keys.length*100)+'%';
      info.querySelector('h4').innerHTML=d[0];info.querySelector('.txt').innerHTML=d[1];
    };
    svg.querySelectorAll('[data-h]').forEach(n=>{
      const d=s.hs[n.getAttribute('data-h')];
      n.setAttribute('tabindex','0');n.setAttribute('role','button');if(d)n.setAttribute('aria-label',strip(d[0]));
      n.addEventListener('click',()=>show(n));n.addEventListener('mouseenter',()=>show(n));n.addEventListener('focus',()=>show(n));
      n.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show(n)}});
    });
  });
});
if(reduced)document.querySelectorAll('.spark').forEach(e=>e.remove());

/* ================= perguntas ================= */
function paintQ(qEl){
  const sid=qEl.dataset.s,qi=+qEl.dataset.q,q=S.find(x=>x.id===sid).qs[qi];
  const chosen=state.a[sid]?.[qi],exp=qEl.querySelector('.exp');
  if(chosen===undefined){qEl.classList.remove('answered');exp.hidden=true;qEl.querySelectorAll('.opt').forEach(b=>{b.classList.remove('right','wrong');b.removeAttribute('aria-disabled')});return}
  qEl.classList.add('answered');
  qEl.querySelectorAll('.opt').forEach(b=>{const o=+b.dataset.o;b.setAttribute('aria-disabled','true');b.classList.toggle('right',o===q[2]);b.classList.toggle('wrong',o===chosen&&o!==q[2])});
  const ok=chosen===q[2];exp.hidden=false;exp.classList.toggle('bad',!ok);
  exp.innerHTML=`<b>${ok?'Isso mesmo!':'Quase! A certa é a '+L[q[2]]+'.'}</b> ${q[3]}`;
}
document.querySelectorAll('.q').forEach(qEl=>{
  paintQ(qEl);
  qEl.querySelectorAll('.opt').forEach(b=>b.addEventListener('click',()=>{
    const sid=qEl.dataset.s,qi=+qEl.dataset.q;
    if(state.a[sid]?.[qi]!==undefined)return;
    (state.a[sid]=state.a[sid]||{})[qi]=+b.dataset.o;save();paintQ(qEl);refresh();
  }));
});

/* ================= progresso e abas ================= */
function refresh(){
  TABS.forEach(T=>{
    const P=document.getElementById('p-'+T.id),list=S.filter(s=>s.tab===T.id);
    let total=0,answered=0,right=0;const weak=[];let doneN=0;
    list.forEach(s=>{
      const a=state.a[s.id]||{};let n=0,r=0;
      s.qs.forEach((q,i)=>{total++;if(a[i]!==undefined){n++;if(a[i]===q[2])r++}});
      answered+=n;right+=r;const done=n===s.qs.length;if(done)doneN++;
      document.getElementById('st-'+s.id).classList.toggle('done',done);
      P.querySelector(`[data-go="${s.id}"]`).parentElement.classList.toggle('done',done);
      if(done&&r<s.qs.length)weak.push(s.title);
    });
    document.querySelector(`[data-pc="${T.id}"]`).textContent=`${doneN}/${list.length}`;
    P.querySelector('[data-score]').textContent=`${right}/${total}`;
    P.querySelector('[data-ft]').textContent=answered===total?'Você passou por todas as paradas. Seu resultado:':`Você respondeu ${answered} de ${total} perguntas. Acertos até agora:`;
    P.querySelector('[data-weak]').innerHTML=weak.length?`Vale dar mais uma olhada em: <b>${weak.join(', ')}</b>.`:'';
    if(T.id===state.tab)document.getElementById('bar').style.width=(answered/total*100)+'%';
  });
}
function setTab(id,scroll){
  state.tab=id;save();
  TABS.forEach(T=>{const on=T.id===id;document.getElementById('tab-'+T.id).setAttribute('aria-selected',on);document.getElementById('tab-'+T.id).tabIndex=on?0:-1;document.getElementById('p-'+T.id).hidden=!on});
  refresh();if(scroll)window.scrollTo({top:0});
}
tabsEl.addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(b)setTab(b.dataset.tab,true)});
tabsEl.addEventListener('keydown',e=>{if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')return;const i=TABS.findIndex(t=>t.id===state.tab),n=TABS[(i+(e.key==='ArrowRight'?1:TABS.length-1))%TABS.length].id;setTab(n,false);document.getElementById('tab-'+n).focus()});
panels.addEventListener('click',e=>{
  const g=e.target.closest('[data-go]');if(g){document.getElementById('st-'+g.dataset.go).scrollIntoView({behavior:reduced?'auto':'smooth'});return}
  const sw=e.target.closest('[data-switch]');if(sw){setTab(sw.dataset.switch,true);return}
  const r=e.target.closest('[data-reset]');
  if(r){
    if(!r.classList.contains('armed')){r.classList.add('armed');r.textContent='Toque de novo para apagar';setTimeout(()=>{r.classList.remove('armed');r.textContent='Recomeçar esta aba'},4000);return}
    S.filter(s=>s.tab===r.dataset.reset).forEach(s=>delete state.a[s.id]);save();
    r.classList.remove('armed');r.textContent='Recomeçar esta aba';
    document.querySelectorAll('.q').forEach(paintQ);refresh();window.scrollTo({top:0});
  }
});
setTab(TABS.some(t=>t.id===state.tab)?state.tab:'nervoso',false);
