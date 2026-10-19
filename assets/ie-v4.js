
(()=>{'use strict';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
const nav=$('#navLinks'),toggle=$('#menuToggle');
function closeNav(){if(!nav||!toggle)return;nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰';}
toggle?.addEventListener('click',()=>{const isOpen=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(isOpen));toggle.textContent=isOpen?'×':'☰';});
$$('.nav-links a').forEach(a=>a.addEventListener('click',closeNav));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNav()});
window.addEventListener('resize',()=>{if(window.innerWidth>980)closeNav()});
const progress=$('#pageProgress');
function trackScroll(){const max=document.documentElement.scrollHeight-innerHeight; if(progress)progress.style.transform='scaleX('+(max>0?Math.max(0,Math.min(1,scrollY/max)):0)+')'}
window.addEventListener('scroll',trackScroll,{passive:true});trackScroll();
const pointerFine=matchMedia('(hover: hover) and (pointer: fine)').matches;
const motion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const glow=$('#cursorGlow'),halo=$('#cursorHalo');
if(pointerFine&&!motion&&glow&&halo){let px=-200,py=-200,gx=px,gy=py,active=false;document.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;px=e.clientX;py=e.clientY;glow.style.opacity='1';halo.style.opacity='1';}, {passive:true});document.addEventListener('pointerover',e=>{halo.classList.toggle('active',!!e.target.closest('a,button,input,select'))});document.addEventListener('pointerout',e=>{if(!e.relatedTarget){glow.style.opacity='0';halo.style.opacity='0'}});const draw=()=>{gx+=(px-gx)*.13;gy+=(py-gy)*.13;glow.style.transform='translate(calc('+gx+'px - 50%),calc('+gy+'px - 50%))';halo.style.transform='translate(calc('+px+'px - 50%),calc('+py+'px - 50%))';requestAnimationFrame(draw)};draw()}
const process=[
{title:'01 / Non-invasive capture',body:'High-resolution facial scans can establish a digital reference for supervised prosthetic engineering. Sensor choice, fit and consent remain subject to validation.'},
{title:'02 / IEAI-assisted analysis',body:'Infinite Expressions Artificial Intelligence is being developed to help identify, compare and prepare anatomical geometry while keeping a qualified human in the decision loop.'},
{title:'03 / Digital engineering',body:'Research covers surface reconstruction, boundary design and motion-related fit analysis; engineering acceptance remains a supervised, test-dependent process.'},
{title:'04 / Manufacturing R&D',body:'Direct silicone additive manufacturing without impression molds is a research objective, not a validated commercial capability.'},
{title:'05 / Human-centered outcome',body:'The intended outcome is a comfortable and natural-looking facial prosthesis, with real-world fit, material durability, color and patient outcomes subject to clinical validation.'}
];
$$('[data-process]').forEach(b=>b.addEventListener('click',()=>{const n=Number(b.dataset.process);if(!process[n])return;$$('[data-process]').forEach(v=>v.setAttribute('aria-pressed',String(v===b)));$('#processHeading').textContent=process[n].title;$('#processDescription').textContent=process[n].body;$('#processStatus').textContent='STAGE 0'+(n+1)+' / 05'}));
const fields={faces:$('#demoFaces'),nonmanifold:$('#demoNonmanifold'),zero:$('#demoZero'),normals:$('#demoNormals')};
const scenarios={
 clean:{faces:28412,nonmanifold:0,zero:0,normals:'consistent',label:'CLEAN SYNTHETIC REFERENCE'},
 open:{faces:28412,nonmanifold:12,zero:0,normals:'consistent',label:'OPEN / NON-MANIFOLD GEOMETRY'},
 degenerate:{faces:28412,nonmanifold:0,zero:8,normals:'consistent',label:'DEGENERATE SURFACE'},
 unknown:{faces:28412,nonmanifold:0,zero:0,normals:'unknown',label:'UNVERIFIED NORMALS'}
};
let active='clean',record='';
function getValues(){const n=(v,min,max)=>{const x=Number(v?.value);return Number.isFinite(x)?Math.min(max,Math.max(min,Math.floor(x))):min};return{faces:n(fields.faces,0,500000000),nonmanifold:n(fields.nonmanifold,0,500000000),zero:n(fields.zero,0,500000000),normals:fields.normals?.value||'unknown'}}
function render(values,run){const flags=[];if(values.faces<100)flags.push('Insufficient mesh density for this example');if(values.nonmanifold>0)flags.push(values.nonmanifold+' non-manifold edges require review');if(values.zero>0)flags.push(values.zero+' zero-length edges require repair or disposition');if(values.normals!=='consistent')flags.push(values.normals==='mixed'?'Mixed surface normals require orientation review':'Surface-normal direction is unverified');const pass=flags.length===0;const st=$('#demoStatus'),msg=$('#demoMessage'),audit=$('#demoAudit'),visual=$('#demoVisual'),head=$('#visualFinding');
$('#visualFaces').textContent=values.faces.toLocaleString('en-US');$('#visualNonmanifold').textContent='NM '+values.nonmanifold;$('#visualZero').textContent='ZERO '+values.zero;$('#visualScenario').textContent=(scenarios[active]?.label||'CUSTOM INPUT');$('#visualNormals').textContent='NORMALS / '+values.normals.toUpperCase();
if(!run){st.textContent='READY TO EVALUATE';st.className='status-pill';msg.textContent='Choose a scenario or adjust the values, then run the deterministic sample review. No geometry is uploaded.';audit.textContent='Record pending — no evaluation performed.';head.textContent='INPUT QUEUED';visual.dataset.status='ready';record='';return;}
st.textContent=pass?'PASS · SAMPLE GATE':'HUMAN REVIEW REQUIRED';st.className='status-pill '+(pass?'pass':'review');msg.textContent=pass?'No example defects triggered. This sample gate passing does not establish manufacturing or clinical readiness.':flags.join(' · ')+'.';head.textContent=pass?'0 FLAGS / SAMPLE PASS':flags.length+' REVIEW FLAG'+(flags.length===1?'':'S');visual.dataset.status=pass?'pass':'review';
record='IEAI-PUBLIC-SAMPLE | faces='+values.faces+' | nonManifold='+values.nonmanifold+' | zeroLength='+values.zero+' | normals='+values.normals+' | decision='+(pass?'PASS_SAMPLE_GATE':'REVIEW_REQUIRED');audit.textContent=record;
}
function setScenario(key){const s=scenarios[key];if(!s)return;active=key;fields.faces.value=s.faces;fields.nonmanifold.value=s.nonmanifold;fields.zero.value=s.zero;fields.normals.value=s.normals;$$('[data-scenario]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scenario===key)));render(getValues(),true)}
$$('[data-scenario]').forEach(b=>b.addEventListener('click',()=>setScenario(b.dataset.scenario)));
Object.values(fields).forEach(f=>{f?.addEventListener('input',()=>{active='custom';$$('[data-scenario]').forEach(b=>b.setAttribute('aria-pressed','false'));render(getValues(),false)});f?.addEventListener('change',()=>render(getValues(),false))});
$('#evaluateButton')?.addEventListener('click',()=>render(getValues(),true));
$('#resetButton')?.addEventListener('click',()=>{active='clean';const s=scenarios.clean;fields.faces.value=s.faces;fields.nonmanifold.value=s.nonmanifold;fields.zero.value=s.zero;fields.normals.value=s.normals;$$('[data-scenario]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scenario==='clean')));render(getValues(),false);$('#copyButton').textContent='Copy review record'});
$('#copyButton')?.addEventListener('click',async()=>{const btn=$('#copyButton');if(!record){btn.textContent='Run review first';return;}try{await navigator.clipboard.writeText(record);btn.textContent='Copied review record'}catch(e){btn.textContent='Select record below';const s=window.getSelection(),r=document.createRange();r.selectNodeContents($('#demoAudit'));s.removeAllRanges();s.addRange(r)}});
render(getValues(),false);
if('IntersectionObserver' in window&&!motion){const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('is-pending');e.target.classList.add('is-visible');obs.unobserve(e.target)}})},{threshold:.1});$$('.reveal').forEach(el=>{el.classList.add('is-pending');obs.observe(el)})}
const year=$('#year');if(year)year.textContent=String(new Date().getFullYear());
})();
