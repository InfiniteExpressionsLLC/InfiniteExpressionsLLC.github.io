/* Cinematic workflow stage previews, v7. Illustrative research-only imagery. */
(() => {
  'use strict';
  const section = document.getElementById('workflow');
  if (!section || section.querySelector('.ie-cinema-panel')) return;
  const cards = [...section.querySelectorAll('.process-card[data-process]')];
  const detail = section.querySelector('.process-detail');
  if (cards.length !== 5 || !detail) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const scenes = [
    {photo:'/assets/ieai-anatomy-research.webp',title:'01 / Digital facial capture',desc:'A cinematic scanning preview illustrates digital facial-surface acquisition. It is not an actual patient scan or IEAI output.',eye:'DIGITAL SURFACE / CAPTURE',major:'FACIAL METROLOGY',minor:'NON-INVASIVE DIGITAL REFERENCE',foot:'ILLUSTRATIVE SCANNING PATH'},
    {photo:'/assets/ieai-concept-viewer.webp',title:'02 / Supervised IEAI analysis',desc:'A simulated engineering interface inspects facial geometry for human review. No IEAI inference is run by the animation.',eye:'GEOMETRY / SUPERVISED REVIEW',major:'SURFACE ANALYSIS',minor:'HUMAN-IN-THE-LOOP',foot:'CONCEPT VIEW / NO PATIENT DATA'},
    {photo:'/assets/ieai-face-engineering.webp',title:'03 / CAD and fit engineering',desc:'Animated alignment guides and reference geometry represent a future CAD engineering handoff. Fit and design tolerances require validation.',eye:'DIGITAL ENGINEERING / CAD',major:'DESIGN ITERATION',minor:'VIRTUAL FIT RESEARCH',foot:'CAD CONCEPT / NOT A VALIDATED FIT'},
    {photo:'https://images.pexels.com/photos/12268465/pexels-photo-12268465.jpeg?auto=compress&cs=tinysrgb&w=1200',title:'04 / Additive manufacturing R&D',desc:'A real photograph of a conventional resin printer illustrates general additive manufacturing. It is not silicone printing, an IEAI-produced part, or proof of process readiness.',eye:'MANUFACTURING / RESEARCH',major:'MATERIALS R&D',minor:'FABRICATION CONCEPT',foot:'REFERENCE PHOTO / NOT SILICONE'},
    {photo:'/assets/ieai-concept-viewer.webp',reveal:'/assets/ieai-anatomy-research.webp',title:'05 / Human-centered restoration',desc:'A synthetic digital portrait transitions toward a naturalistic concept view, expressing the human purpose of the research. No actual patient outcome is shown.',eye:'DESIGN INTENT / HUMAN IMPACT',major:'RESTORATION GOAL',minor:'RESEARCH-STAGE TECHNOLOGY',foot:'CONCEPT ART / NOT A PATIENT RESULT'}
  ];
  const panel = document.createElement('div');
  panel.className = 'ie-cinema-panel';
  panel.setAttribute('role','group');
  panel.setAttribute('aria-label','Illustrative four-second motion previews for the five research stages');
  panel.innerHTML =
    '<div class="ie-cinema-bar"><span><i></i> WORKFLOW / CINEMATIC PREVIEW</span><span>ILLUSTRATIVE · RESEARCH-STAGE</span></div>' +
    '<div class="ie-cinema-layout"><div class="ie-cinema-visual" aria-hidden="true">' +
      '<img class="ie-cinema-photo" alt="" decoding="async">' +
      '<img class="ie-cinema-transition" alt="" decoding="async">' +
      '<div class="ie-cinema-shade"></div><div class="ie-cinema-grid"></div>' +
      '<div class="ie-cinema-beam"></div><div class="ie-cinema-target"></div><div class="ie-cinema-fit"></div>' +
      '<div class="ie-cinema-corners"><i></i><i></i><i></i><i></i></div>' +
      '<div class="ie-cinema-top"><span class="ie-scene-eye"></span><span>IE // R&amp;D</span></div>' +
      '<div class="ie-cinema-hud"><strong class="ie-scene-major"></strong><span class="ie-scene-minor"></span><span class="ie-cinema-bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></div>' +
      '<div class="ie-cinema-bottom"><span class="ie-scene-foot"></span><span>00:04 PREVIEW</span></div>' +
      '</div><div class="ie-cinema-description"><small>SELECTED STAGE / 04 SECONDS</small><h3 class="ie-scene-title"></h3><p class="ie-scene-desc"></p>' +
      '<div class="ie-cinema-actions"><button type="button" id="ieCinemaReplay">↻ Replay animation</button><span>SIMULATION / NOT ACTUAL IEAI OUTPUT</span></div>' +
      '</div></div><div class="ie-cinema-progress"><span></span></div>';
  detail.before(panel);
  const view = panel.querySelector('.ie-cinema-visual');
  const first = panel.querySelector('.ie-cinema-photo');
  const last = panel.querySelector('.ie-cinema-transition');
  let current = 0;
  function show(i) {
    if (!Number.isInteger(i) || i<0 || i>4) return;
    current = i;
    const s = scenes[i];
    panel.classList.remove('ie-playing');
    view.dataset.stage = String(i);
    first.src = s.photo;
    last.src = s.reveal || s.photo;
    panel.querySelector('.ie-scene-title').textContent = s.title;
    panel.querySelector('.ie-scene-desc').textContent = s.desc;
    panel.querySelector('.ie-scene-eye').textContent = s.eye;
    panel.querySelector('.ie-scene-major').textContent = s.major;
    panel.querySelector('.ie-scene-minor').textContent = s.minor;
    panel.querySelector('.ie-scene-foot').textContent = s.foot;
    cards.forEach((c,n)=>c.classList.toggle('ie-stage-selected',n===i));
    if (!reduce.matches) { void panel.offsetWidth; panel.classList.add('ie-playing'); }
  }
  cards.forEach(c => c.addEventListener('click',()=>show(Number(c.dataset.process))));
  panel.querySelector('#ieCinemaReplay').addEventListener('click',()=>show(current));
  if (reduce.addEventListener) reduce.addEventListener('change',()=>show(current));
  show(0);
})();
