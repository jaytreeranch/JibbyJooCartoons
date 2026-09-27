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

async function loadFeaturedContent(){
  const section=document.querySelector('.featured');
  if(!section)return;
  try{
    const response=await fetch('featured.json',{cache:'no-store'});
    if(!response.ok)return;
    const item=await response.json();
    const image=section.querySelector('.featured-art img');
    const eyebrow=section.querySelector('.featured-copy .eyebrow');
    const title=section.querySelector('.featured-copy h2');
    const description=section.querySelector('.featured-copy p:not(.eyebrow)');
    const link=section.querySelector('.featured-copy a');
    if(image&&item.image){image.src=item.image;if(item.imageAlt)image.alt=item.imageAlt}
    if(eyebrow&&item.eyebrow)eyebrow.textContent=item.eyebrow;
    if(title&&item.title)title.textContent=item.title;
    if(description&&item.description)description.textContent=item.description;
    if(link&&item.url){link.href=item.url;if(item.cta)link.textContent=item.cta}
  }catch(_error){
    // Keep the server-rendered fallback content when the feed is unavailable.
  }
}
loadFeaturedContent();
