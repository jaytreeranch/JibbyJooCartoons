const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const nav=document.getElementById('site-nav');
const onScroll=()=>nav.classList.toggle('scrolled',window.scrollY>24);
onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
if(!reduced && 'IntersectionObserver' in window){
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -30px'});
  document.querySelectorAll('.promise,.character,.worlds,.formula .section-intro,.steps article,.watch-panel,.grownups').forEach(el=>{el.classList.add('reveal');io.observe(el)});
}else{
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('on'));
}