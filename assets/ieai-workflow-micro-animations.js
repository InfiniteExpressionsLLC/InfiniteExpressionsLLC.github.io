/* IEAI workflow motion studies — offline illustrative SVG, 3.8s per selection.
 * Presentation only: these animations do not claim to be actual patient
 * scanning, anatomical reconstruction, CAD, print readiness, or clinical output. */
(() => {
  'use strict';
  const section=document.querySelector('#workflow');
  if (!section || section.querySelector('.ie-micro-panel')) return;
  const grid=section.querySelector('.process-grid');
  const detail=section.querySelector('.process-detail');
  const cards=[...section.querySelectorAll('[data-process]')];
  if(!grid || !detail || cards.length!==5) return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const shared=`<defs>
      <linearGradient id="ieMicroGlass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1c5b87" stop-opacity=".36"/><stop offset="1" stop-color="#0a2846" stop-opacity=".32"/></linearGradient>
      <linearGradient id="ieMicroBeam"><stop stop-color="#55caff" stop-opacity="0"/><stop offset=".5" stop-color="#9beaff" stop-opacity=".95"/><stop offset="1" stop-color="#4dd5ff" stop-opacity="0"/></linearGradient>
      <pattern id="ieMicroGrid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#73bfff" stroke-opacity=".075"/></pattern>
    </defs><rect x="1" y="1" width="518" height="218" rx="14" fill="#06182c"/><rect x="1" y="1" width="518" height="218" rx="14" fill="url(#ieMicroGrid)"/>
    <g fill="none" stroke="#629dcf" stroke-opacity=".22"><path d="M16 29V17H29M490 17h13v13M16 189v13h13M490 202h13v-13"/></g>`;
  const wrap=body=>`<svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${shared}${body}</svg>`;
  const artworks=[
    wrap(`<g transform="translate(90 0)"><g fill="url(#ieMicroGlass)" stroke="#a0dcff" stroke-width="1.6"><path d="M225 29c-49 0-78 38-78 81 0 57 30 86 78 91 48-5 78-34 78-91 0-43-29-81-78-81Z"/><path d="M148 100q-17-14-17 11t20 22M302 100q17-14 17 11t-20 22"/></g>
      <g fill="none" stroke="#b8ebff" stroke-width="1.7" stroke-linecap="round"><path d="M178 105q19-13 34 0M239 105q18-13 35 0M181 114q19 8 31-1M238 113q18 8 35-1M226 109l-9 29 17 5M203 166q23 14 46 0"/></g>
      <g fill="#8bdfff"><circle cx="188" cy="112" r="2.3"/><circle cx="254" cy="112" r="2.3"/></g>
      <g class="ie-micro-scan-dots" fill="#a2e9ff" opacity=".56"><circle cx="201" cy="69" r="2"/><circle cx="255" cy="67" r="2"/><circle cx="175" cy="142" r="2"/><circle cx="276" cy="147" r="2"/><circle cx="224" cy="188" r="2"/><circle cx="269" cy="84" r="2"/><circle cx="180" cy="86" r="2"/></g></g>
      <g class="ie-micro-scanner"><rect x="59" y="72" width="85" height="39" rx="9" fill="#163958" stroke="#b0dcff" stroke-width="2"/><rect x="72" y="81" width="43" height="6" rx="3" fill="#7fdcff"/><rect x="90" y="108" width="19" height="56" rx="6" fill="#0b2a43" stroke="#8cd3fa" stroke-width="2"/><path d="M144 81l17 5v12l-17 5" fill="#3c8fc3" stroke="#b0e8ff" stroke-width="1.5"/><circle cx="89" cy="97" r="3" fill="#8cf3c4"/></g>
      <g class="ie-micro-beam"><rect x="251" y="37" width="3" height="159" fill="#a9efff"/><rect x="229" y="37" width="46" height="159" fill="url(#ieMicroBeam)" opacity=".28"/></g>
      <text x="20" y="26" fill="#9acbeb" font-family="monospace" font-size="11">SURFACE CAPTURE / ILLUSTRATIVE</text>`),
    wrap(`<g stroke="#95d5ff" stroke-width="2" fill="url(#ieMicroGlass)"><rect x="88" y="27" width="344" height="154" rx="12"/><path d="M235 181v13h50v-13M210 198h100" fill="none"/></g>
      <g stroke="#4a9dd0" stroke-opacity=".3"><path d="M109 65h302M109 95h302M109 125h302M109 155h302M150 45v116M205 45v116M260 45v116M315 45v116M370 45v116"/></g>
      <g transform="translate(225 46)" stroke="#a7e3ff" fill="none" stroke-width="1.55"><path d="M44 5c-32 0-42 23-42 46 0 34 13 52 42 57 29-5 42-23 42-57C86 28 76 5 44 5Z"/><path d="M20 50q10-9 20 0M48 50q10-9 21 0M44 48l-6 23 12 1M30 88q15 7 29 0"/><path d="M5 40l74 33M10 68 72 28M45 5v105" stroke-opacity=".45"/></g>
      <g class="ie-micro-analyze-wheel" transform="translate(138 104)" stroke="#c0e9ff" fill="none" stroke-width="3"><circle r="25"/><path d="M0-33v9M0 24v9M-33 0h9M24 0h9M-23-23l6 6M17 17l6 6M23-23l-6 6M-17 17l-6 6"/><circle r="9" fill="#236b94"/></g>
      <g class="ie-micro-analyze-bars" fill="#86d9ff"><rect x="360" y="80" width="10" height="34" rx="2"/><rect x="375" y="67" width="10" height="47" rx="2"/><rect x="390" y="90" width="10" height="24" rx="2"/></g>
      <text x="106" y="47" fill="#9bcce9" font-family="monospace" font-size="11">IEAI / SUPERVISED ANALYSIS</text>`),
    wrap(`<g stroke="#6cb3df" fill="url(#ieMicroGlass)" stroke-width="1.8"><path d="M96 35H433V189H96z"/></g><g fill="none" stroke="#467eac" stroke-width="1"><path d="M128 35v154M161 35v154M194 35v154M227 35v154M260 35v154M293 35v154M326 35v154M359 35v154M392 35v154M96 68h337M96 101h337M96 134h337M96 167h337" opacity=".3"/></g>
      <g class="ie-micro-engineer-profile" fill="none" stroke="#b6eaff" stroke-width="2"><path d="M258 52c-35 2-61 23-61 50 0 14 7 18 17 26l-10 20 15 7 15-19c12 12 24 17 40 17 30 0 48-26 48-49s-17-47-64-52Z"/><path d="M219 108q27-19 52-6m-15-28 25 15-12 34-35-4z"/><path d="M224 142l87-66M228 84l70 44" stroke-dasharray="5 6" opacity=".55"/></g>
      <g class="ie-micro-engineer-caliper" stroke="#98dcff" stroke-width="2" fill="none"><path d="M110 116h286M200 101v30M312 101v30M199 116h114" stroke-dasharray="3 4"/><path d="M298 103v26" stroke-width="4"/></g>
      <g fill="#b6eaff" font-family="monospace" font-size="11"><text x="109" y="25">CAD / VERSIONED SURFACE REVIEW</text><text x="340" y="174">DESIGN ONLY</text></g>`),
    wrap(`<g stroke="#a4dfff" stroke-width="2" fill="none"><path d="M100 55h320M111 55v46m298-46v46"/><path d="M112 180h298v13H112z" fill="#14304b"/></g>
      <g class="ie-micro-print-head" stroke="#a9e6ff" stroke-width="2"><rect x="213" y="34" width="94" height="40" rx="7" fill="#164168"/><path d="M243 74h34l-13 23h-8z" fill="#376d93"/><path d="M257 98h6" stroke="#9cefff" stroke-width="4"/></g>
      <g class="ie-micro-printed" fill="none" stroke-width="3" stroke-linejoin="round">
        <path class="ie-layer ie-layer-a" d="M178 169h166l-18 9H195z" stroke="#52b9f5"/>
        <path class="ie-layer ie-layer-b" d="M193 156h137l14 13H178z" stroke="#63cbfa"/>
        <path class="ie-layer ie-layer-c" d="M213 145h97l20 11H193z" stroke="#78dcff"/>
        <path class="ie-layer ie-layer-d" d="M228 133h67l15 12h-97z" stroke="#93e4ff"/>
        <path class="ie-layer ie-layer-e" d="M246 122h33l16 11h-67z" stroke="#b8f0ff"/>
      </g>
      <g fill="#afdff7" font-family="monospace" font-size="11"><text x="23" y="25">ADDITIVE MANUFACTURING / FEASIBILITY</text><text x="334" y="126">LAYER STUDY</text></g>`),
    wrap(`<g stroke="#7fbae5" stroke-width="2" fill="url(#ieMicroGlass)">
        <path d="M156 37c-42 0-65 32-65 77 0 48 29 78 65 82 36-4 65-34 65-82 0-45-23-77-65-77Z"/>
        <path d="M367 37c-42 0-65 32-65 77 0 48 29 78 65 82 36-4 65-34 65-82 0-45-23-77-65-77Z"/>
      </g>
      <g fill="none" stroke="#a2d8fa" stroke-width="1.75"><path d="M115 113q15-11 29 0m23 0q13-11 27 0M153 103l-8 32 16 2M130 158q25 13 50 0"/><path d="M325 113q15-11 29 0m23 0q13-11 27 0M364 103l-8 32 16 2M341 158q25 13 50 0"/></g>
      <g class="ie-micro-restored" fill="#6fcbf9" fill-opacity=".23" stroke="#bdefff" stroke-width="2"><path d="M364 104l-8 32 16 2-4-34Z"/></g>
      <g class="ie-micro-restore-check" fill="none" stroke="#83e4be" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><circle cx="464" cy="59" r="21" fill="#17483b" stroke-width="2"/><path d="m451 59 9 10 17-21"/></g>
      <path class="ie-micro-restore-arrow" d="M239 113h43m-13-11 13 11-13 11" stroke="#94dbff" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <g fill="#b6e9ff" font-family="monospace" font-size="11"><text x="89" y="25">INTENDED PATH / CONCEPT</text><text x="299" y="211">HUMAN REVIEW REQUIRED</text></g>`)
  ];
  const labels=[
    ['01 / Digital capture','A scanner passes across an illustrative facial surface to show how a digital reference could be acquired. This is concept art—not an actual scanning session.'],
    ['02 / IEAI analysis','Illustrative workstation analysis checks geometry and surfaces findings for qualified human review. No real inference is run by this animation.'],
    ['03 / CAD engineering','A draft surface and reference guides are refined in a conceptual CAD view. Design tolerances and fit require separate validation.'],
    ['04 / Additive manufacturing R&D','A virtual print head builds successive layers. Silicone process feasibility has not been qualified by this animation.'],
    ['05 / Human-centered outcome','A conceptual before-and-after study emphasizes dignity and restoration goals; real prosthetic outcomes remain subject to clinical validation.']
  ];
  const panel=document.createElement('div');
  panel.className='ie-micro-panel';
  panel.setAttribute('role','group');
  panel.setAttribute('aria-label','Illustrative four-second animations for each IEAI workflow stage');
  panel.innerHTML=`<div class="ie-micro-top"><span><span class="ie-micro-led" aria-hidden="true"></span> ENGINEERING WORKFLOW / MOTION STUDY</span><span class="ie-micro-identifier">ILLUSTRATIVE · RESEARCH-STAGE</span></div>
  <div class="ie-micro-layout"><div class="ie-micro-visual" id="ieMicroVisual" aria-hidden="true"></div>
  <div class="ie-micro-copy"><span class="ie-micro-kicker">STAGE PREVIEW · 04 SECONDS</span><h3 id="ieMicroTitle"></h3><p id="ieMicroCopy"></p>
   <div class="ie-micro-buttons"><button type="button" id="ieMicroReplay" aria-label="Replay current workflow illustration">↻ Replay animation</button><span>SIMULATION / NOT ACTUAL IEAI OUTPUT</span></div>
  </div></div><div class="ie-micro-progress" aria-hidden="true"><span></span></div>`;
  detail.parentNode.insertBefore(panel,detail);
  const view=panel.querySelector('#ieMicroVisual'),title=panel.querySelector('#ieMicroTitle'),copy=panel.querySelector('#ieMicroCopy'),replay=panel.querySelector('#ieMicroReplay');
  let active=0;
  function play(n) {
    if (!Number.isInteger(n)||n<0||n>4) return;
    active=n;
    view.innerHTML=artworks[n];
    title.textContent=labels[n][0];
    copy.textContent=labels[n][1];
    panel.dataset.stage=String(n);
    panel.classList.remove('playing');
    // Restart the animation on every click or replay, including repeated stage selections.
    if (!reduced.matches) { void panel.offsetWidth; panel.classList.add('playing'); }
  }
  cards.forEach(card=>card.addEventListener('click',()=>play(Number(card.dataset.process))));
  replay.addEventListener('click',()=>play(active));
  if(reduced.addEventListener) reduced.addEventListener('change',()=>play(active));
  play(0);
})();