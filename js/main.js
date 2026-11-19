(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],H=document.documentElement,B=document.body;
const ST={g:k=>{try{return localStorage.getItem(k)}catch(e){return null}},s:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}}};
const C=SITE_CONFIG,CATS=['kitchens','windows','shutters','showers'];
const page=B.dataset.page,gridCat=$('#grid')?$('#grid').dataset.cat:null;
let lang=ST.g('kh-lang')==='en'?'en':'ar',theme=H.dataset.theme||'light',list=[],cur=0;
const t=k=>(T[lang]&&T[lang][k])||k,L=o=>o[lang];

function setTheme(){H.dataset.theme=theme;$('#themeBtn').setAttribute('aria-pressed',theme==='dark')}
function i18n(){
 $$('[data-i18n]').forEach(e=>e.textContent=t(e.dataset.i18n));
 $$('[data-i18n-attr]').forEach(e=>e.dataset.i18nAttr.split(';').forEach(p=>{const[a,k]=p.split(':');e.setAttribute(a,t(k))}));
}
function renderWork(){
 const g=$('#grid');if(!g)return;
 list=PROJECTS.filter(p=>gridCat==='featured'?p.featured:p.cat===gridCat);
 g.innerHTML=list.map((p,i)=>`<button class="item" data-i="${i}"><img loading="lazy" src="${p.img}" alt="${L(p.title)}"><span>${L(p.title)}</span></button>`).join('');
}
function setLang(){
 H.lang=lang;H.dir=lang==='ar'?'rtl':'ltr';
 const mk=page==='index'?'meta.title':`meta.${page}.title`,dk=page==='index'?'meta.desc':`meta.${page}.desc`;
 document.title=t(mk);$('#metaDesc').content=t(dk);i18n();
 $('#langBtn').textContent=lang==='ar'?'EN':'عربي';
 const d=$('#dept');if(d){const v=d.value||'kitchens';d.innerHTML=CATS.map(c=>`<option value="${c}">${t('svc.'+c+'.n')}</option>`).join('');d.value=v}
 renderWork();
}
$('#themeBtn').onclick=()=>{theme=theme==='dark'?'light':'dark';ST.s('kh-theme',theme);setTheme()};
$('#langBtn').onclick=()=>{lang=lang==='ar'?'en':'ar';ST.s('kh-lang',lang);setLang()};

/* الصفحة النشطة في الهيدر والقائمة والفوتر */
$$('[data-page]:not(body)').forEach(a=>{if(a.dataset.page===page)a.setAttribute('aria-current','page')});

const menu=o=>{B.classList.toggle('menu-open',o);$('#menuBtn').setAttribute('aria-expanded',o)};
$('#menuBtn').onclick=()=>menu(!B.classList.contains('menu-open'));
$$('#menu a').forEach(a=>a.addEventListener('click',()=>menu(false)));

/* Lightbox */
const lb=$('#lb');
function show(i){cur=(i+list.length)%list.length;const p=list[cur];$('#lbImg').src=p.img;$('#lbImg').alt=L(p.title);$('#lbCap').innerHTML=`<b>${L(p.title)}</b> <em>${t('f.'+p.cat)}</em><p>${L(p.desc)}</p>`}
const closeLb=()=>{lb.hidden=true;B.classList.remove('lock')};
if($('#grid'))$('#grid').onclick=e=>{const b=e.target.closest('[data-i]');if(b){show(+b.dataset.i);lb.hidden=false;B.classList.add('lock');$('#lbX').focus()}};
$('#lbX').onclick=closeLb;$('#lbPrev').onclick=()=>show(cur-1);$('#lbNext').onclick=()=>show(cur+1);
lb.onclick=e=>{if(e.target===lb)closeLb()};
addEventListener('keydown',e=>{
 if(e.key==='Escape'){closeLb();menu(false)}
 if(!lb.hidden&&(e.key==='ArrowLeft'||e.key==='ArrowRight')){const rtl=H.dir==='rtl';show(cur+((e.key==='ArrowRight')===rtl?-1:1))}
});

/* نموذج الطلب */
const toast=m=>{const x=$('#toast');x.textContent=m;x.classList.add('on');setTimeout(()=>x.classList.remove('on'),4500)};
const qf=$('#qf');if(qf)qf.addEventListener('submit',e=>{
 e.preventDefault();const f=new FormData(e.target);
 const msg=`${t('msg.hi')}\n${t('f.name')}: ${f.get('name')}\n${t('f.phone')}: ${f.get('phone')}\n${t('f.dept')}: ${t('svc.'+f.get('dept')+'.n')}\n${f.get('details')}`,enc=encodeURIComponent(msg);
 if(C.whatsapp)open(`https://wa.me/${C.whatsapp}?text=${enc}`,'_blank');
 else if(C.email)location.href=`mailto:${C.email}?subject=KH Metal Design&body=${enc}`;
 else{try{navigator.clipboard.writeText(msg)}catch(_){}open(C.facebook.replace('www.facebook.com','m.me'),'_blank')}
 toast(t('msg.ok'));
});

$$('[data-social]').forEach(a=>a.href=C[a.dataset.social]);
const q=[];if(C.whatsapp)q.push(`<a class="btn ghost" href="https://wa.me/${C.whatsapp}" target="_blank" rel="noopener">${t('ct.wa')}</a>`);
if(C.phone)q.push(`<a class="btn ghost" href="tel:${C.phone}">${t('ct.call')}</a>`);
if(C.mapEmbed&&$('#map'))$('#map').innerHTML=`<iframe src="${C.mapEmbed}" loading="lazy" title="Map" allowfullscreen></iframe>`;
$('#yr').textContent=new Date().getFullYear();
addEventListener('scroll',()=>$('.nav').classList.toggle('solid',scrollY>16),{passive:true});

setTheme();setLang();
if($('#quick'))$('#quick').innerHTML=q.join('');
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
$$('.reveal').forEach(e=>io.observe(e));

/* الخط التفاعلي: ينثني بعيدًا عن المؤشر/اللمس ثم يرتد كالنابض */
(()=>{
 const svg=$('.swash'),path=svg&&$('path',svg);
 if(!path||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const VW=800,VH=700,N=90;let R=120;
 let pts=null,raf=0,mx=-999,my=-999,active=false;
 const sample=()=>{const len=path.getTotalLength();pts=[];
  for(let i=0;i<=N;i++){const p=path.getPointAtLength(len*i/N);pts.push({rx:p.x,ry:p.y,x:p.x,y:p.y,vx:0,vy:0})}};
 const toSvg=(cx,cy)=>{const r=svg.getBoundingClientRect(),s=Math.min(r.width/VW,r.height/VH);
  let px=cx-r.left;if(H.dir==='rtl')px=r.width-px;
  return[(px-(r.width-VW*s)/2)/s,(cy-r.top-(r.height-VH*s)/2)/s,s]};
 const draw=()=>{let d=`M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for(let i=1;i<N;i++){const a=pts[i],b=pts[i+1];d+=`Q${a.x.toFixed(1)} ${a.y.toFixed(1)} ${((a.x+b.x)/2).toFixed(1)} ${((a.y+b.y)/2).toFixed(1)}`}
  const l=pts[N];d+=`T${l.x.toFixed(1)} ${l.y.toFixed(1)}`;path.setAttribute('d',d)};
 const step=()=>{let e=0,near=false;
  for(const p of pts){
   const dx=p.x-mx,dy=p.y-my,dist=Math.hypot(dx,dy);
   if(active&&dist<R)near=true;
   if(active&&dist<R&&dist>0.01){const f=(1-dist/R)**2*2.4;p.vx+=dx/dist*f;p.vy+=dy/dist*f}
   p.vx+=(p.rx-p.x)*.07;p.vy+=(p.ry-p.y)*.07;p.vx*=.86;p.vy*=.86;p.x+=p.vx;p.y+=p.vy;
   e+=Math.abs(p.vx)+Math.abs(p.vy)+Math.abs(p.rx-p.x)+Math.abs(p.ry-p.y)}
  draw();
  if(e>.6||(active&&near))raf=requestAnimationFrame(step);else{raf=0;path.classList.remove('live')}};
 const move=(cx,cy)=>{if(!pts)sample();const[x,y,s]=toSvg(cx,cy);R=Math.max(120,75/s);mx=x;my=y;active=true;path.classList.add('live');if(!raf)raf=requestAnimationFrame(step)};
 const mouse=e=>{if(e.pointerType!=='touch')move(e.clientX,e.clientY)};
 addEventListener('pointermove',mouse,{passive:true});
 addEventListener('pointerdown',mouse,{passive:true});
 const off=()=>{active=false};
 addEventListener('pointerup',e=>{if(e.pointerType!=='touch')off()});document.addEventListener('pointerleave',off);
 addEventListener('blur',off);
 /* اللمس: أحداث touch السلبية (passive) حتى لا تمنع تمرير الصفحة */
 const tch=e=>{const t=e.touches[0];if(t)move(t.clientX,t.clientY)};
 addEventListener('touchstart',tch,{passive:true});addEventListener('touchmove',tch,{passive:true});
 addEventListener('touchend',off,{passive:true});addEventListener('touchcancel',off,{passive:true});
 addEventListener('scroll',()=>{if(active&&pts)requestAnimationFrame(()=>{if(!raf)raf=requestAnimationFrame(step)})},{passive:true});
 addEventListener('resize',()=>{pts=null;path.setAttribute('d',path.dataset.d||path.getAttribute('d'))});
 path.dataset.d=path.getAttribute('d');
})();
})();
