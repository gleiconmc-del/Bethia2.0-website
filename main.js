(function(){
var $=function(s,c){return(c||document).querySelector(s)};
var b=$('.burger'),nav=$('#menu');
b.addEventListener('click',function(){var o=nav.classList.toggle('open');b.setAttribute('aria-expanded',o)});
nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');b.setAttribute('aria-expanded',false)}});
var els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(a){a.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});els.forEach(function(e){io.observe(e)})}else{els.forEach(function(e){e.classList.add('in')})}
/* cookies: consent stored per viewer; load Meta Pixel / GA only when consent==='all' */
var ck=$('#cookies');
function get(){try{return localStorage.getItem('bethia_consent')}catch(e){return null}}
function set(v){try{localStorage.setItem('bethia_consent',v)}catch(e){}}
function loadTrackers(){/* TODO: insertar aquí Meta Pixel y Google Analytics */}
if(!get())ck.classList.add('show');else if(get()==='all')loadTrackers();
ck.addEventListener('click',function(e){var c=e.target.getAttribute('data-c');if(!c)return;set(c);ck.classList.remove('show');if(c==='all')loadTrackers()});
$('#ck-open').addEventListener('click',function(e){e.preventDefault();ck.classList.add('show')});
/* form */
var f=$('#cf'),msg=$('#msg');
f.addEventListener('submit',function(e){
e.preventDefault();
var v=function(i){return $(i).value.trim()};
msg.className='msg show';
if(!v('#n')||!v('#e')||!/^\S+@\S+\.\S+$/.test(v('#m'))||!v('#d')){msg.textContent='Revisa los campos obligatorios: nombre, empresa, un correo válido y la descripción del proyecto.';return}
if(!$('#ok').checked){msg.textContent='Para enviar la solicitud, acepta la política de privacidad.';return}
var t='Hola BETHIA 2.0, soy '+v('#n')+' de '+v('#e')+'.\nServicio: '+$('#s').value+'\nCorreo: '+v('#m')+(v('#t')?'\nTeléfono: '+v('#t'):'')+'\nProyecto: '+v('#d');
var done=function(ok){msg.textContent=(ok?'Solicitud copiada. ':'')+'Pégala en nuestro chat de Instagram para que la recibamos: se abrirá en una pestaña nueva.';window.open('https://www.instagram.com/bethia2.0/','_blank','noopener')};
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){done(true)},function(){done(false)})}else{done(false)}
});
})();

/* === v2: interactividad === */
(function(){
var d=document,$=function(s,c){return(c||d).querySelector(s)},$$=function(s,c){return[].slice.call((c||d).querySelectorAll(s))};
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
if(rm){var fl=$('.flow');if(fl&&fl.pauseAnimations)fl.pauseAnimations()}
$$('.grid,.why,.steps').forEach(function(g){[].slice.call(g.children).forEach(function(c,i){c.style.setProperty('--d',i*70+'ms')})});
$$('.reveal').forEach(function(el){el.addEventListener('transitionend',function(e){if(e.target===el&&e.propertyName==='opacity'&&el.classList.contains('in'))el.classList.add('done')})});
var hd=$('header'),tick=false;
function sc(){var m=d.documentElement.scrollHeight-innerHeight;hd.style.setProperty('--p',m>0?Math.min(1,scrollY/m):0);hd.classList.toggle('scrolled',scrollY>8);tick=false}
addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(sc)}},{passive:true});sc();
if(fine)$$('.card').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')})});
var ck=$('#cookies');
function ckh(){d.documentElement.style.setProperty('--ckh',ck.classList.contains('show')?ck.offsetHeight+'px':'0px')}
new MutationObserver(ckh).observe(ck,{attributes:true,attributeFilter:['class']});addEventListener('resize',ckh);ckh();
var dock=$('.dock');
if(fine&&!rm){setTimeout(function(){dock.classList.add('hint');setTimeout(function(){dock.classList.remove('hint')},4500)},6000)}
/* asistente de respuestas rapidas (sin IA) */
var base='Hola, estoy interesado en los servicios de BETHIA 2.0. Me gustaría recibir información.';
var Q=[
['Servicios','Ofrecemos seis áreas: Meta Ads, diseño web, creatividades publicitarias, captación de clientes, optimización y análisis, e IA y automatización. Se combinan según lo que necesite tu negocio.','#servicios','Ver servicios'],
['Cómo trabajamos','Analizamos tu negocio, diseñamos una estrategia, implementamos las soluciones y medimos y optimizamos de forma continua.','#proceso','Ver el proceso'],
['Precios y presupuesto','Cada negocio necesita algo distinto, por eso no publicamos tarifas cerradas. Te preparamos una propuesta personalizada tras conocer tus objetivos.','#contacto','Pedir propuesta'],
['Plazos','Los plazos dependen del alcance del proyecto. Los concretamos contigo en la propuesta, antes de empezar.','#contacto','Pedir propuesta'],
['Diseño web','Diseñamos webs corporativas y landing pages responsive, rápidas y pensadas para convertir visitas en contactos.','#servicios','Ver servicios'],
['Sectores','Trabajamos con restaurantes y cafeterías, clínicas dentales y estéticas, gimnasios, peluquerías y barberías, inmobiliarias, comercios locales, empresas de servicios y pymes.','#sectores','Ver sectores']];
var bot=$('#bot'),btn=$('.bot-btn'),log=$('.bot-log'),opts=$('.bot-opts');
function el(t,c,x){var n=d.createElement(t);if(c)n.className=c;if(x)n.textContent=x;return n}
function say(t,c){var b=el('div','b '+c,t);log.appendChild(b);log.scrollTop=log.scrollHeight;return b}
function open(o){bot.hidden=!o;btn.setAttribute('aria-expanded',o);if(o){if(!log.children.length)say('Hola, soy el asistente de BETHIA 2.0. Elige un tema y te respondo al momento.','bt');var f=$('button',opts);if(f)f.focus()}else btn.focus()}
Q.forEach(function(q){var b=el('button',null,q[0]);b.type='button';b.addEventListener('click',function(){
say(q[0],'me');say(q[1],'bt');
var a=el('div','acts'),l=el('a',null,q[3]);l.href=q[2];l.addEventListener('click',function(){open(false)});
var w=el('a',null,'Seguir por WhatsApp');w.href='https://wa.me/34633399134?text='+encodeURIComponent(base+' Mi consulta: '+q[0]+'.');w.target='_blank';w.rel='noopener';
a.appendChild(l);a.appendChild(w);log.appendChild(a);log.scrollTop=log.scrollHeight});opts.appendChild(b)});
btn.addEventListener('click',function(){open(bot.hidden)});
$('.bot-x').addEventListener('click',function(){open(false)});
bot.addEventListener('keydown',function(e){if(e.key==='Escape')open(false)});
})();
