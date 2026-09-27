
// Limpa a preferência antiga uma única vez após a atualização do banner.
if(localStorage.getItem('fixmaster_cookie_consent') !== null &&
   localStorage.getItem('fixmaster_cookie_consent_v2') === null){
  localStorage.removeItem('fixmaster_cookie_consent');
}

const menuBtn=document.getElementById('menuBtn');
const navLinks=document.getElementById('navLinks');
if(menuBtn&&navLinks){menuBtn.addEventListener('click',()=>{navLinks.classList.toggle('show');const i=menuBtn.querySelector('i');if(i){i.classList.toggle('fa-bars');i.classList.toggle('fa-xmark')}})}
document.querySelectorAll('.faq-q').forEach(b=>b.addEventListener('click',()=>{const item=b.parentElement;document.querySelectorAll('.faq-item').forEach(o=>{if(o!==item)o.classList.remove('active')});item.classList.toggle('active')}));
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();





// Menu de serviços: abre como submenu no telemóvel
document.querySelectorAll('.nav-dropdown-trigger').forEach(trigger=>{
  trigger.addEventListener('click', function(e){
    if(window.innerWidth <= 980){
      e.preventDefault();
      const parent = this.closest('.nav-dropdown');
      document.querySelectorAll('.nav-dropdown').forEach(d=>{
        if(d !== parent) d.classList.remove('open');
      });
      parent.classList.toggle('open');
    }
  });
});


// COOKIE CONSENT - FINAL
(function(){
  const KEY = 'fixmaster_cookie_consent_v2';
  const banner = document.getElementById('cookieBanner');
  const accept = document.getElementById('cookieAccept');
  const reject = document.getElementById('cookieReject');

  if(!banner) return;

  const saved = localStorage.getItem(KEY);

  if(!saved){
    setTimeout(() => banner.classList.add('show'), 250);
  }

  function choose(value){
    localStorage.setItem(KEY, value);
    banner.classList.remove('show');
  }

  if(accept) accept.addEventListener('click', () => choose('accepted'));
  if(reject) reject.addEventListener('click', () => choose('rejected'));

  window.openCookiePreferences = function(){
    banner.classList.add('show');
  };
})();



// CARROSSEL DE SERVIÇOS - HOME
(function(){
  const carousel = document.getElementById('servicesCarousel');
  const dotsWrap = document.getElementById('servicesDots');
  const prev = document.querySelector('.services-prev');
  const next = document.querySelector('.services-next');

  if(!carousel || !dotsWrap) return;

  const slides = [...carousel.querySelectorAll('.service-slide')];
  let current = 0;

  slides.forEach((_, i)=>{
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'services-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Ir para serviço ${i+1}`);
    dot.addEventListener('click', ()=>scrollToSlide(i));
    dotsWrap.appendChild(dot);
  });

  const dots = [...dotsWrap.querySelectorAll('.services-dot')];

  function scrollToSlide(index){
    index = Math.max(0, Math.min(index, slides.length - 1));
    current = index;
    const slide = slides[index];
    const left = slide.offsetLeft - (carousel.clientWidth - slide.clientWidth)/2;
    carousel.scrollTo({left, behavior:'smooth'});
    setActive(index);
  }

  function setActive(index){
    current = index;
    dots.forEach((d,i)=>d.classList.toggle('active', i===index));
  }

  function nearestSlide(){
    const center = carousel.scrollLeft + carousel.clientWidth/2;
    let nearest = 0;
    let distance = Infinity;
    slides.forEach((slide,i)=>{
      const slideCenter = slide.offsetLeft + slide.clientWidth/2;
      const d = Math.abs(center - slideCenter);
      if(d < distance){ distance = d; nearest = i; }
    });
    setActive(nearest);
  }

  let scrollTimer;
  carousel.addEventListener('scroll', ()=>{
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(nearestSlide, 80);
  }, {passive:true});

  if(prev) prev.addEventListener('click', ()=>scrollToSlide(current - 1));
  if(next) next.addEventListener('click', ()=>scrollToSlide(current + 1));
})();
