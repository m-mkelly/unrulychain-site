const header=document.querySelector('.site-header');
const btn=document.querySelector('.mobile-menu');
if(btn&&header){btn.addEventListener('click',()=>header.classList.toggle('mobile-open'));}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
