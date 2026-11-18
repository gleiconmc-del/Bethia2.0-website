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
