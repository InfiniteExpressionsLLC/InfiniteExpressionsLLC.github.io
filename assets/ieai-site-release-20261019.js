/* IEAI visual status layer; existing deterministic geometry-QA rules remain authoritative. */
(() => {
 const root=document.querySelector('#product-demo');
 if(!root) return;
 const view=root.querySelector('.ieai-viewport');
 const count=root.querySelector('[data-qa-view="faces"]');
 const defects=root.querySelector('[data-qa-view="finding"]');
 const scene=root.querySelector('[data-qa-view="scenario"]');
 const decision=root.querySelector('[data-qa-view="decision"]');
 const scenarios=[...root.querySelectorAll('[data-demo-scenario]')];
 const fields=['demo-faces','demo-nonmanifold','demo-zeroedges','demo-normals'].map(id=>document.getElementById(id));
 let active='clean';
 const titles={clean:'BASELINE / NOMINAL',open:'OPEN SURFACE / FLAGGED',degenerate:'DEGENERATE ELEMENTS',unknown:'ORIENTATION / UNVERIFIED'};
 function draw(evaluated=false) {
   if(!view) return;
   const face=Number(fields[0]?.value||0);
   const nm=Number(fields[1]?.value||0);
   const ze=Number(fields[2]?.value||0);
   const normals=fields[3]?.value;
   const issues=(face<100?1:0)+(nm>0?1:0)+(ze>0?1:0)+(normals!=='consistent'?1:0);
   if(count) count.textContent=Number.isFinite(face)?Math.max(0,face).toLocaleString('en-US'):'—';
   if(scene) scene.textContent=titles[active]||titles.clean;
   if(defects) defects.textContent=!evaluated?'AWAITING QA REVIEW':issues?issues+' CHECK'+(issues===1?'':'S')+' FLAGGED':'NO SAMPLE FLAGS';
   if(decision) decision.textContent=!evaluated?'REVIEW NOT RUN':issues?'HUMAN REVIEW REQUIRED':'SAMPLE GATE PASSED';
   view.dataset.qaState=!evaluated?'pending':issues?'review':'pass';
 }
 scenarios.forEach(btn=>btn.addEventListener('click',()=>{
   active=btn.dataset.demoScenario||'clean';
   scenarios.forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
   draw(true);
 }));
 fields.forEach(field=>field?.addEventListener('input',()=>draw(false)));
 root.querySelector('#run-geometry-demo')?.addEventListener('click',()=>draw(true));
 root.querySelector('#reset-geometry-demo')?.addEventListener('click',()=>{
   active='clean';scenarios.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.demoScenario==='clean')));
   draw(false);
 }));
 scenarios.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.demoScenario==='clean')));
 draw(false);
})();
