(function(){
  try{
    var t = localStorage.getItem('emaza-theme');
    if(!t){ t = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark':'light'; }
    document.documentElement.setAttribute('data-theme', t);
  }catch(e){}
})();

const SUPABASE_URL = "https://firqrpeemkxtvdkhnwpx.supabase.co";
const SUPABASE_KEY = "sb_publishable_DC8XvOjUsac-vzmXh5cKQQ_gJjwGrh3";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);





const CONFIG = {
  phone: "923332084244",           // WhatsApp number, international format, no + or spaces
  email: "duaf210209@gmail.com"
};

const PRODUCTS = [
  {
    id: 1,
    name: "Mariana IRRI-6 Rice",
    cat: "Rice",
    em: "🍚",
    image: "https://firqrpeemkxtvdkhnwpx.supabase.co/storage/v1/object/public/products/Mariana.png",
    bg: "linear-gradient(135deg,#f6d365,#fda085)",
    desc: "Premium-quality rice ideal for both household consumption and commercial kitchens.",
    specs: ["Long grain", "Household & commercial", "Export packing"],
    table: [
      ["Type", "IRRI-6 White Rice"],
      ["Best for", "Households, restaurants, catering"],
      ["Packaging", "Custom bag sizes & branding"],
      ["Lead time", "7–14 business days"]
    ]
  },
  {
    id: 2,
    name: "Sardine Fish",
    cat: "Seafood",
    em: "🐟",
    image: "https://firqrpeemkxtvdkhnwpx.supabase.co/storage/v1/object/public/products/Sardine%20fish.png",
    bg: "linear-gradient(135deg,#4facfe,#00c6a7)",
    desc: "Sardine fish, locally known as Luar, named after the island of Sardinia where it was once found in abundance.",
    specs: ["Fresh / frozen", "Rich in protein", "Export grade"],
    table: [
      ["Type", "Sardine (Luar)"],
      ["Best for", "Retail, canning, wholesale"],
      ["Packaging", "Export cartons"],
      ["Lead time", "7–14 business days"]
    ]
  },
  {
    id: 3,
    name: "Kasuku IRRI-6 Rice",
    cat: "Rice",
    em: "🌾",
    image: "https://firqrpeemkxtvdkhnwpx.supabase.co/storage/v1/object/public/products/Kasuku.png",
    bg: "linear-gradient(135deg,#d4fc79,#96e6a1)",
    desc: "A reliable choice for budget-conscious households that don't compromise on quality.",
    specs: ["Value grade", "Consistent quality", "Bulk friendly"],
    table: [
      ["Type", "IRRI-6 White Rice"],
      ["Best for", "Budget-conscious households, retail"],
      ["Packaging", "Custom bag sizes & branding"],
      ["Lead time", "7–14 business days"]
    ]
  },
  {
    id: 4,
    name: "Wheat Flour",
    cat: "Flour",
    em: "🥖",
    image: "https://firqrpeemkxtvdkhnwpx.supabase.co/storage/v1/object/public/products/Wheat%20Flour.png",
    bg: "linear-gradient(135deg,#fbd786,#f7797d)",
    desc: "Premium flour milled from 100% whole wheat grains, delivering maximum freshness, nutrition and taste.",
    specs: ["100% whole wheat", "Fresh milled", "Nutritious"],
    table: [
      ["Type", "Whole wheat flour"],
      ["Best for", "Bakeries, households, wholesale"],
      ["Packaging", "Custom sizes & branding"],
      ["Lead time", "7–14 business days"]
    ]
  },
  {
    id: 5,
    name: "Emaza Cooking Oil",
    cat: "Oil",
    em: "🛢️",
    image: "https://firqrpeemkxtvdkhnwpx.supabase.co/storage/v1/object/public/products/Emaza%20Cooking%20Oil.png",
    bg: "linear-gradient(135deg,#f9d423,#ff9a3c)",
    desc: "Your perfect kitchen companion — pure, healthy and ideal for all types of cooking.",
    specs: ["Cholesterol-free", "Vitamins A & D", "Deep-frying ready"],
    table: [
      ["Range", "Sunflower, canola, soybean, palm"],
      ["Forms", "Refined & crude"],
      ["Standards", "ISO & HACCP certified facilities"],
      ["Packaging", "Custom sizes, branding & labeling"]
    ]
  },
  {
    id: 6,
    name: "Brown Sugar",
    cat: "Sugar",
    em: "🍬",
    image: "https://firqrpeemkxtvdkhnwpx.supabase.co/storage/v1/object/public/products/Golden%20Sugar.png",
    bg: "linear-gradient(135deg,#c79081,#dfa579)",
    desc: "Rich in molasses and natural sweetness — perfect for baking, cooking or sweetening beverages.",
    specs: ["Natural molasses", "Baking & beverages", "Bulk supply"],
    table: [
      ["Type", "Brown sugar"],
      ["Best for", "Bakeries, cafés, food industry"],
      ["Packaging", "Custom sizes & branding"],
      ["Lead time", "7–14 business days"]
    ]
  }

  
];

const FAQS = [
  ["What types of cooking oil do you supply?","We provide a variety of high-quality cooking oils including sunflower oil, canola oil, soybean oil and palm oil — available in both refined and crude forms depending on your requirements."],
  ["Do you export cooking oil internationally?","Yes, we export globally and comply with international quality and packaging standards to ensure safe and timely delivery to our clients worldwide."],
  ["Can I place a bulk or customized order?","Absolutely! We specialize in bulk orders and can customize packaging sizes, branding and labeling to meet your specific business needs."],
  ["What is the lead time for delivery?","Lead times vary based on quantity and destination, but most orders are processed and shipped within 7–14 business days."],
  ["Are your products certified for quality and safety?","Yes, all our products are processed in certified facilities and meet national and international food safety standards such as ISO and HACCP."]
  
];
/* ================================= */

const $ = (s,r=document)=>r.querySelector(s), $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const store = {get(k){try{return localStorage.getItem(k)}catch(e){return null}}, set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};

/* Theme */
const root = document.documentElement, themeBtn = $('#themeBtn');
function setTheme(t){ root.setAttribute('data-theme',t); themeBtn.textContent = t==='dark'?'☀️':'🌙'; const at=$('#authTheme'); if(at) at.textContent = t==='dark'?'☀️':'🌙'; store.set('emaza-theme',t); }
setTheme(root.getAttribute('data-theme'));
themeBtn.onclick = ()=> setTheme(root.getAttribute('data-theme')==='dark'?'light':'dark');

/* Toast */
let tt; function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),2200);}

/* Image helpers: if an image fails to load, fall back to the emoji so nothing looks broken */
function imgFail(img){
  const span=document.createElement('span');
  span.className='img-fallback'; span.textContent=img.dataset.em||'📦';
  img.replaceWith(span);
}
const pimg=(p,cls='product-img')=>`<img src="${p.image}" alt="${p.name}" class="${cls}" data-em="${p.em}" loading="eager" onerror="imgFail(this)">`;

/* Hero list, marquee, footer, select */
$('#heroList').innerHTML = PRODUCTS.slice(0,6).map(p=>`<div class="mini" data-open="${p.id}"><div class="em">${pimg(p,'mini-img')}</div><div><b>${p.name}</b><span>${p.cat}</span></div><span class="go">→</span></div>`).join('');
const mq = PRODUCTS.map(p=>`<span>${p.em} ${p.name}</span>`).join('') + `<span>🚢 Worldwide shipping</span><span>🛡️ ISO & HACCP standards</span><span>📦 Custom packaging</span>`;
$('#marquee').innerHTML = mq+mq;
$('#fProd').innerHTML = PRODUCTS.map(p=>`<li><a href="#products" data-open="${p.id}">${p.name}</a></li>`).join('');
$('#pr').innerHTML = `<option value="">Select a product</option>` + PRODUCTS.map(p=>`<option>${p.name}</option>`).join('');
$('#yr').textContent = new Date().getFullYear();
$('#yr2').textContent = new Date().getFullYear();

/* Products grid + filters */
let cat='All', term='';
const cats=['All',...new Set(PRODUCTS.map(p=>p.cat))];
$('#chips').innerHTML = cats.map(c=>`<button class="chip ${c==='All'?'on':''}" data-c="${c}">${c}</button>`).join('');
$('#chips').onclick = e=>{const b=e.target.closest('.chip'); if(!b)return; cat=b.dataset.c; $$('.chip').forEach(x=>x.classList.toggle('on',x===b)); render();};
$('#q').oninput = e=>{term=e.target.value.toLowerCase().trim(); render();};
function render(){
  const list = PRODUCTS.filter(p=>(cat==='All'||p.cat===cat) && (p.name+p.desc+p.cat).toLowerCase().includes(term));
  $('#grid').innerHTML = list.length ? list.map(p=>`
   <article class="card rv in">
     <div class="thumb" style="background:${p.bg}">${pimg(p)}</div>
     <div class="body"><h3>${p.name}</h3><p>${p.desc}</p>
       <div class="specs">${p.specs.map(s=>`<small>${s}</small>`).join('')}</div>
       <div class="row"><button class="btn btn-outline" data-open="${p.id}">Details</button><button class="btn btn-primary" data-add="${p.id}">+ Add to inquiry</button></div>
     </div></article>`).join('') : `<div class="empty">No products match your search.</div>`;
}
render();


/* =====================================================
   GALLERY / PHOTO ALBUM
   To add your own photos: add a line to GALLERY below.
   { src: "images/photo.jpg", title: "Caption", album: "Album name" }
   ===================================================== */
const GALLERY = [
  // ...PRODUCTS.map(p=>({src:p.image, title:p.name, album:'Products'})),
  { src:"https://firqrpeemkxtvdkhnwpx.supabase.co/storage/v1/object/public/products/Open%20Container%20Packed%20with%20Yellow%20Bales.png", title:"Open Containers",  album:"Warehouse" },
  { src:"https://firqrpeemkxtvdkhnwpx.supabase.co/storage/v1/object/public/products/Industrial%20Yard%20with%20Yellow%20Bale%20Containers.png", title:"Container loading", album:"Shipping" },
  
  { src:"https://firqrpeemkxtvdkhnwpx.supabase.co/storage/v1/object/public/products/Yellow%20Cargo%20Bales%20in%20Open%20Shipping%20Container.png", title:"Open Shipping Container", album:"Shipping" },

];
let galAlbum='All', galList=[], lbIdx=0;
const albums=['All',...new Set(GALLERY.map(g=>g.album))];
$('#galTabs').innerHTML = albums.map(a=>`<button class="chip ${a==='All'?'on':''}" data-album="${a}">${a}</button>`).join('');
function renderGallery(){
  galList = GALLERY.filter(g=>galAlbum==='All'||g.album===galAlbum);
  $('#galGrid').innerHTML = galList.map((g,i)=>`
    <button class="gal-item rv in" data-gi="${i}" aria-label="View ${g.title}">
      <img src="${g.src}" alt="${g.title}" loading="eager" onerror="this.closest('.gal-item').remove()">
      <span class="gal-cap"><b>${g.title}</b><small>${g.album}</small></span>
    </button>`).join('');
}
$('#galTabs').onclick=e=>{
  const b=e.target.closest('[data-album]'); if(!b)return;
  galAlbum=b.dataset.album; $$('#galTabs .chip').forEach(x=>x.classList.toggle('on',x===b)); renderGallery();
};
renderGallery();

const lb=$('#lightbox');
function showLb(i){
  if(!galList.length)return;
  lbIdx=(i+galList.length)%galList.length; const g=galList[lbIdx];
  $('#lbImg').src=g.src; $('#lbImg').alt=g.title; $('#lbCap').textContent=g.title+' · '+(lbIdx+1)+' / '+galList.length;
}
function openLb(i){showLb(i); lb.classList.add('show'); lb.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';}
function closeLb(){lb.classList.remove('show'); lb.setAttribute('aria-hidden','true'); document.body.style.overflow='';}
$('#galGrid').addEventListener('click',e=>{const b=e.target.closest('[data-gi]'); if(b)openLb(+b.dataset.gi);});
$('#lbClose').onclick=closeLb; $('#lbPrev').onclick=()=>showLb(lbIdx-1); $('#lbNext').onclick=()=>showLb(lbIdx+1);
lb.addEventListener('click',e=>{if(e.target===lb)closeLb();});
document.addEventListener('keydown',e=>{
  if(!lb.classList.contains('show'))return;
  if(e.key==='Escape')closeLb(); if(e.key==='ArrowLeft')showLb(lbIdx-1); if(e.key==='ArrowRight')showLb(lbIdx+1);
});

/* Modal */
const modalOv=$('#modalOv'), modal=$('#modal');
function openModal(id){
  const p=PRODUCTS.find(x=>x.id==id); if(!p)return;
  modal.innerHTML = `<button class="close" aria-label="Close">✕</button>
    <div class="thumb" style="background:${p.bg}">${pimg(p)}</div>
    <div class="mb"><h2 style="font-size:2rem">${p.name}</h2><p style="color:var(--muted);margin-top:8px">${p.desc}</p>
    <table class="tbl">${p.table.map(r=>`<tr><td>${r[0]}</td><td><b>${r[1]}</b></td></tr>`).join('')}</table>
    <div class="btns"><button class="btn btn-primary" data-add="${p.id}">+ Add to inquiry</button><a class="btn btn-outline" target="_blank" rel="noopener" href="https://wa.me/${CONFIG.phone}?text=${encodeURIComponent('Hello Emaza, I am interested in '+p.name)}">💬 Ask on WhatsApp</a></div></div>`;
  modalOv.classList.add('show');
}
const closeModal=()=>modalOv.classList.remove('show');
modalOv.onclick=e=>{if(e.target===modalOv||e.target.closest('.close'))closeModal();};

/* Inquiry cart */
let cart=[]; try{cart=JSON.parse(store.get('emaza-cart')||'[]')}catch(e){cart=[]}
const drawer=$('#drawer'), dOv=$('#drawerOv');
function saveCart(){store.set('emaza-cart',JSON.stringify(cart));drawCart();}
function addCart(id){
  const p=PRODUCTS.find(x=>x.id==id); const f=cart.find(c=>c.id==id);
  if(f)f.qty++; else cart.push({id:+id,qty:1});
  saveCart(); toast(p.name+' added to inquiry');
}
function drawCart(){
  const n=cart.reduce((a,c)=>a+c.qty,0); const b=$('#badge'); b.textContent=cart.length; b.style.display=cart.length?'grid':'none';
  $('#cartList').innerHTML = cart.length ? cart.map(c=>{const p=PRODUCTS.find(x=>x.id==c.id);return `<div class="item"><span class="em">${pimg(p,'cart-img')}</span><div><b>${p.name}</b><br><small style="color:var(--muted)">Quantity (MT)</small></div>
   <div class="qty"><button data-m="${c.id}">−</button><input type="number" min="1" value="${c.qty}" data-q="${c.id}"><button data-p="${c.id}">+</button></div></div>`}).join('')
   : `<p style="color:var(--muted);text-align:center;padding:40px 10px">Your inquiry list is empty.<br>Add products to request one combined quote.</p>`;
}
drawCart();
const openDrawer=()=>{drawer.classList.add('show');dOv.classList.add('show')}, closeDrawer=()=>{drawer.classList.remove('show');dOv.classList.remove('show')};
$('#cartBtn').onclick=openDrawer; $('#drawerClose').onclick=closeDrawer; dOv.onclick=closeDrawer;
$('#cartList').addEventListener('click',e=>{
  const m=e.target.closest('[data-m]'), p=e.target.closest('[data-p]');
  if(m){const c=cart.find(x=>x.id==m.dataset.m); c.qty--; if(c.qty<1)cart=cart.filter(x=>x!==c); saveCart();}
  if(p){cart.find(x=>x.id==p.dataset.p).qty++; saveCart();}
});
$('#cartList').addEventListener('change',e=>{const i=e.target.closest('[data-q]'); if(i){const c=cart.find(x=>x.id==i.dataset.q); c.qty=Math.max(1,parseInt(i.value)||1); saveCart();}});
$('#clearCart').onclick=()=>{cart=[];saveCart();};
$('#sendCart').onclick=()=>{
  if(!cart.length){toast('Add at least one product first');return;}
  const lines=cart.map(c=>`• ${PRODUCTS.find(p=>p.id==c.id).name} — ${c.qty} MT`).join('\n');
  window.open(`https://wa.me/${CONFIG.phone}?text=${encodeURIComponent('Hello Emaza, I would like a quote for:\n'+lines)}`,'_blank');
};

/* Global click delegation */
document.addEventListener('click',e=>{
  const o=e.target.closest('[data-open]'); if(o){e.preventDefault();openModal(o.dataset.open);}
  const a=e.target.closest('[data-add]'); if(a){addCart(a.dataset.add);}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();closeDrawer();$('#menu').classList.remove('open');}});

/* FAQ */
$('#faqList').innerHTML = FAQS.map(f=>`<div class="qa"><button aria-expanded="false">${f[0]}<i>+</i></button><div class="ans"><p>${f[1]}</p></div></div>`).join('');
$('#faqList').onclick=e=>{
  const b=e.target.closest('button'); if(!b)return; const qa=b.parentElement, ans=$('.ans',qa), open=qa.classList.contains('open');
  $$('.qa').forEach(x=>{x.classList.remove('open');$('.ans',x).style.maxHeight=0;$('button',x).setAttribute('aria-expanded','false');});
  if(!open){qa.classList.add('open');ans.style.maxHeight=ans.scrollHeight+'px';b.setAttribute('aria-expanded','true');}
};

/* Quote form */
let via='wa';
$$('#quoteForm button[type=submit]').forEach(b=>b.addEventListener('click',()=>via=b.dataset.via));
$('#quoteForm').addEventListener('submit',e=>{
  e.preventDefault();
  const req=['fn','em','ct'].map(id=>$('#'+id)); let ok=true;
  req.forEach(i=>{const bad=!i.value.trim()||(i.type==='email'&&!/^\S+@\S+\.\S+$/.test(i.value)); i.classList.toggle('err',bad); if(bad)ok=false;});
  if(!ok){toast('Please fill the required fields');return;}
  const v=id=>$('#'+id).value.trim();
  const cartTxt = cart.length ? '\nInquiry list:\n'+cart.map(c=>`• ${PRODUCTS.find(p=>p.id==c.id).name} — ${c.qty} MT`).join('\n') : '';
  const body=`Name: ${v('fn')}\nCompany: ${v('co')||'-'}\nEmail: ${v('em')}\nPhone: ${v('ph')||'-'}\nDestination: ${v('ct')}\nProduct: ${v('pr')||'-'}\nQuantity: ${v('qt')||'-'}\nMessage: ${v('ms')||'-'}${cartTxt}`;

  /* NEW: inquiry Supabase mein save karo (dashboard mein dikhegi) */
  supabaseClient.from('inquiries').insert({
    full_name: v('fn'),
    company:   v('co'),
    email:     v('em'),
    phone:     v('ph'),
    country:   v('ct'),
    product:   v('pr') || cart.map(c=>PRODUCTS.find(p=>p.id==c.id).name).join(', '),
    quantity:  v('qt'),
    message:   v('ms') + cartTxt,
    status:    'new'
  }).then(({error})=>{ if(error) console.error('Inquiry save failed:', error); });

  if(via==='wa') window.open(`https://wa.me/${CONFIG.phone}?text=${encodeURIComponent('New quote request:\n'+body)}`,'_blank');
  else location.href=`mailto:${CONFIG.email}?subject=${encodeURIComponent('Quote request – '+v('fn'))}&body=${encodeURIComponent(body)}`;
  toast('Opening your message…');
});

/* Mobile menu */
$('#burger').onclick=()=>$('#menu').classList.toggle('open');
$$('#menu a').forEach(a=>a.onclick=()=>$('#menu').classList.remove('open'));

/* Scroll: progress, sticky shadow, back-to-top, active link */
const secs=$$('main section[id]'), links=$$('#menu a');
addEventListener('scroll',()=>{
  const h=document.documentElement, st=h.scrollTop, max=h.scrollHeight-h.clientHeight;
  $('#progress').style.width=(st/max*100)+'%';
  $('#nav').classList.toggle('scrolled',st>20);
  $('#top').classList.toggle('show',st>600);
  let cur='home'; secs.forEach(s=>{if(st+140>=s.offsetTop)cur=s.id;});
  links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+cur));
},{passive:true});
$('#top').onclick=()=>scrollTo({top:0,behavior:'smooth'});

/* Reveal + counters */
const io=new IntersectionObserver(es=>es.forEach(en=>{
  if(!en.isIntersecting)return; en.target.classList.add('in'); io.unobserve(en.target);
  const b=$('b[data-t]',en.target);
  if(b){const t=+b.dataset.t,s=b.dataset.s;let n=0;const step=Math.max(1,Math.ceil(t/50));const id=setInterval(()=>{n=Math.min(t,n+step);b.textContent=n+s;if(n>=t)clearInterval(id);},28);}
}),{threshold:.15});
$$('.rv').forEach(el=>io.observe(el));

/* =====================================================
   LOGIN / SIGN-UP  (front-end demo: accounts are kept in
   this browser's localStorage. For real accounts connect
   these handlers to your backend / auth API.)
   ===================================================== */
const authEl=$('#auth'), EMAIL=/^\S+@\S+\.\S+$/, SKEY='emaza-session', UKEY='emaza-users';

const ss={get(k){try{return sessionStorage.getItem(k)}catch(e){return null}},set(k,v){try{sessionStorage.setItem(k,v)}catch(e){}},del(k){try{sessionStorage.removeItem(k)}catch(e){}}};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const users=()=>{try{return JSON.parse(store.get(UKEY)||'[]')}catch(e){return[]}};
const saveUsers=u=>store.set(UKEY,JSON.stringify(u));
async function hash(s){
  try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('emaza::'+s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('');}
  catch(e){return btoa(unescape(encodeURIComponent('emaza::'+s)));}
}
const getSess=()=>{try{return JSON.parse(store.get(SKEY)||ss.get(SKEY)||'null')}catch(e){return null}};
function setSess(u,remember){
  const d=JSON.stringify({name:u.name,email:u.email,company:u.company||''});
  try{localStorage.removeItem(SKEY)}catch(e){} ss.del(SKEY);
  remember?store.set(SKEY,d):ss.set(SKEY,d);
}
function endSess(){try{localStorage.removeItem(SKEY)}catch(e){} ss.del(SKEY);}
const firstName=n=>(n||'').trim().split(/\s+/)[0]||'there';

/* field helpers */
function fe(input,msg){
  const f=input.closest('.fld'), m=f&&$('.msg',f);
  input.classList.toggle('err',!!msg); if(m)m.textContent=msg||'';
  return !msg;
}
function busy(btn,on){btn.classList.toggle('loading',on);}
authEl.addEventListener('input',e=>{ if(e.target.matches('input')) fe(e.target,''); });

/* Navbar state */
function renderUser(){
  const s=getSess();
  $('#loginBtn').hidden=!!s; $('#userMenu').hidden=!s;
  if(!s){$('#userMenu').classList.remove('open');return;}
  $('#avatar').textContent=(s.name||'U').trim().charAt(0).toUpperCase();
  $('#uName').textContent=s.name; $('#uMail').textContent=s.email;
  /* prefill quote form */
  [['fn',s.name],['em',s.email],['co',s.company]].forEach(([id,val])=>{const i=$('#'+id); if(i&&val&&!i.value)i.value=val;});
}
renderUser();

/* Open / close */
const TXT={
  in:['Welcome back','Sign in to manage your inquiries and quotes.'],
  up:['Create your account','Join Emaza to save inquiries and get quotes faster.'],
  fg:['Reset password','Enter your email and we\'ll send you reset instructions.']
};
function setMode(m){
  $('#formIn').hidden=m!=='in';
  $('#formFg').hidden=m!=='fg';
  $('#seg').style.display = m==='fg'?'none':'';
  $$('#seg button').forEach(b=>b.classList.toggle('on',b.dataset.tab===m));
  $('#authTitle').textContent=TXT[m][0]; $('#authSub').textContent=TXT[m][1];
  $$('#auth .msg').forEach(x=>x.textContent=''); $$('#auth input').forEach(i=>i.classList.remove('err'));
  const f={in:'#siEm',up:'#suNm',fg:'#fgEm'}[m]; setTimeout(()=>{const i=$(f); i&&i.focus({preventScroll:true});},120);
}
function openAuth(m='in'){
  $('#menu').classList.remove('open'); closeDrawer(); closeModal();
  authEl.classList.add('show'); authEl.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden'; setMode(m);
}
function closeAuth(){
  authEl.classList.remove('show'); authEl.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
function done(msg){renderUser();closeAuth();toast(msg);}

$('#loginBtn').onclick=()=>openAuth('in');
$('#authClose').onclick=closeAuth;
$('#authTheme').onclick=()=>themeBtn.click();
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&authEl.classList.contains('show'))closeAuth();});
authEl.addEventListener('click',e=>{
  const t=e.target.closest('[data-tab]'); if(t){setMode(t.dataset.tab);return;}
  const eye=e.target.closest('[data-eye]');
  if(eye){const i=$('#'+eye.dataset.eye); const show=i.type==='password'; i.type=show?'text':'password'; eye.textContent=show?'🙈':'👁️'; eye.setAttribute('aria-label',show?'Hide password':'Show password');}
});



/* Secure Admin Sign in */
$('#formIn').addEventListener('submit', async e => {
  e.preventDefault();

  const email = $('#siEm').value.trim();
  const password = $('#siPw').value;
  const btn = $('#formIn').querySelector('[type="submit"]');

  if (!email || !password) {
    alert('Please enter your email and password.');
    return;
  }

  if (btn) btn.disabled = true;

  try {
    // Supabase authentication
    const { data, error } =
      await supabaseClient.auth.signInWithPassword({
        email,
        password
      });

    if (error) throw error;

    // Check whether this user is an authorized admin
    const { data: admin, error: adminError } =
      await supabaseClient
        .from('admin_users')
        .select('user_id')
        .eq('user_id', data.user.id)
        .maybeSingle();

    if (adminError) throw adminError;

    if (!admin) {
      await supabaseClient.auth.signOut();
      alert('This account is not authorized as an admin.');
      return;
    }

    // Admin login successful
    window.location.href = 'dashboard.html';

  } catch (error) {
    console.error(error);
    alert('Login failed. Please check your email and password.');
  } finally {
    if (btn) btn.disabled = false;
  }
});



/* Forgot password (opens an email to support) */
$('#formFg').addEventListener('submit',e=>{
  e.preventDefault();
  const em=$('#fgEm'), mail=em.value.trim();
  if(!fe(em,EMAIL.test(mail)?'':'Enter a valid email address'))return;
  location.href=`mailto:${CONFIG.email}?subject=${encodeURIComponent('Password reset request')}&body=${encodeURIComponent('Hello Emaza, please help me reset the password for my account: '+mail)}`;
  e.target.reset(); setMode('in'); toast('Opening your email to request a reset…');
});

/* User menu */
$('#avatar').onclick=e=>{e.stopPropagation();$('#userMenu').classList.toggle('open');};
document.addEventListener('click',e=>{if(!e.target.closest('#userMenu'))$('#userMenu').classList.remove('open');});
$('#udrop').addEventListener('click',e=>{
  const b=e.target.closest('[data-act]'); if(!b)return; $('#userMenu').classList.remove('open');
  const a=b.dataset.act;
  if(a==='inquiry')openDrawer();
  if(a==='quote')location.hash='#contact';
  if(a==='support')window.open(`https://wa.me/${CONFIG.phone}?text=${encodeURIComponent('Hello Emaza, I need some help with my account.')}`,'_blank');
  if(a==='logout'){endSess();renderUser();toast('You have been logged out');}
});



/* ===== HERO VIDEO ===== */
(function(){
  var v=document.getElementById('heroVideo'),b=document.getElementById('vSound');
  if(!v||!b)return;
  var i=b.querySelector('.vi'),l=b.querySelector('.vl');
  function ui(){
    var on=!v.muted;
    i.textContent=on?'🔊':'🔇';
    l.textContent=on?'Sound off':'Sound on';
    b.setAttribute('aria-pressed',on);
    b.setAttribute('aria-label',on?'Turn sound off':'Turn sound on');
  }
  b.addEventListener('click',function(){
    v.muted=!v.muted;
    if(!v.muted){v.currentTime=0;}
    v.play().catch(function(){});
    ui();
  });
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(e){
      e.forEach(function(x){ if(x.isIntersecting){v.play().catch(function(){});} else {v.pause();} });
    },{threshold:.15}).observe(v);
  }
})();

