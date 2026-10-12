/* Motion layer: scroll progress, reveals, card tilt, magnetic buttons.
   Skipped entirely for visitors who prefer reduced motion. */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  document.documentElement.classList.add('fx');

  /* Scroll progress bar */
  const bar = Object.assign(document.createElement('div'), { className: 'progress' });
  document.body.prepend(bar);
  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.setProperty('--p', max > 0 ? Math.min(scrollY / max, 1) : 0);
      ticking = false;
    });
  }, { passive: true });

  /* Reveal on scroll */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
  );
  const watch = (el, i = 0) => {
    if (el.classList.contains('rv')) return;
    el.style.setProperty('--i', i % 6);
    el.classList.add('rv');
    io.observe(el);
  };
  const groups = ['#about h2, #about .sub', '.role', '.stats div', '.stack', '#experience h2, #experience .sub',
    '.tl article', '#projects h2, #projects .sub', '.filters', '#links .wrap > *'];
  groups.forEach((sel) => document.querySelectorAll(sel).forEach(watch));

  /* Project cards are re-rendered on every filter change */
  const grid = document.getElementById('grid');
  const watchCards = () => grid.querySelectorAll('.card').forEach(watch);
  new MutationObserver(watchCards).observe(grid, { childList: true });
  watchCards();

  if (!fine) return;

  /* Card tilt + light that follows the cursor */
  grid.addEventListener('pointermove', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    card.style.setProperty('--ry', `${(x - 0.5) * 8}deg`);
    card.style.setProperty('--rx', `${(0.5 - y) * 8}deg`);
    card.style.setProperty('--gx', `${x * 100}%`);
    card.style.setProperty('--gy', `${y * 100}%`);
  });
  grid.addEventListener('pointerout', (e) => {
    const card = e.target.closest('.card');
    if (!card || card.contains(e.relatedTarget)) return;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  });

  /* Magnetic buttons (eased with a small rAF loop, uses the `translate` property) */
  document.querySelectorAll('.btn, .soc a').forEach((el) => {
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.translate = `${cx.toFixed(2)}px ${cy.toFixed(2)}px`;
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.05 ? requestAnimationFrame(loop) : 0;
    };
    const go = () => { if (!raf) raf = requestAnimationFrame(loop); };
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left - r.width / 2) * 0.3;
      ty = (e.clientY - r.top - r.height / 2) * 0.3;
      go();
    });
    el.addEventListener('pointerleave', () => { tx = ty = 0; go(); });
  });
})();
