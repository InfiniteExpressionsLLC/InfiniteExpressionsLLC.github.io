const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav-links');

if (menuBtn && nav) {
  const closeMenu = () => {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open navigation');
  };

  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });

  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      menuBtn.focus();
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
}

document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Keep the public IEAI description aligned with the company's canonical positioning.
// This wording distinguishes the specialized system being built from an off-the-shelf
// chatbot while preserving the research-stage and human-supervision boundaries.
const ieaiSection = document.querySelector('#ieai');
if (ieaiSection) {
  const heading = ieaiSection.querySelector('.section-head h2');
  const intro = ieaiSection.querySelector('.section-head p');
  const panels = ieaiSection.querySelectorAll('.tech-panel');

  if (heading) {
    heading.textContent = 'A specialized, local-first artificial-intelligence engineering system built for the facial-prosthetics workflow.';
  }

  if (intro) {
    intro.innerHTML = '<strong>IEAI means Infinite Expressions Artificial Intelligence.</strong> IEAI is being built as a specialized, local-first, human-supervised AI engineering system—not merely an off-the-shelf chatbot. It combines AI models with Infinite Expressions-developed software, deterministic engineering logic, 3D geometry and scan-analysis components, project knowledge, provenance and audit controls, privacy/data-governance boundaries, and structured validation. It is not positioned as an autonomous clinician or autonomous prosthetic designer.';
  }

  if (panels[0]) {
    const badge = panels[0].querySelector('.ieai-badge');
    const title = panels[0].querySelector('h3');
    const list = panels[0].querySelector('ul');

    if (badge) badge.textContent = 'Current foundation + planned assistive capabilities';
    if (title) title.textContent = 'From authorized scan evidence toward traceable prosthetic engineering';
    if (list) {
      list.innerHTML = [
        '3D scan quality, geometry, and provenance controls',
        'Anatomical-evidence and landmark-analysis research',
        'Reconstruction and prosthetic-geometry preparation research',
        'Dimensional checks, validation records, and manufacturing-readiness review',
        'Controlled future handoffs into CAD/Creo and additive-manufacturing research'
      ].map(item => `<li>${item}</li>`).join('');
    }
  }

  if (panels[1]) {
    const paragraphs = panels[1].querySelectorAll('p');
    if (paragraphs[1]) {
      paragraphs[1].textContent = 'The current IEAI foundation includes local-model infrastructure, project knowledge/RAG, controlled testing, audit and provenance systems, 3D engineering components, data-governance safeguards, and integration planning. The longer-term R&D objective is to support qualified experts from separately authorized facial-scan analysis through reconstruction, prosthetic geometry, CAD/Creo handoffs, and manufacturing research. Planned capabilities are not represented as current clinical capability.';
    }
  }
}
