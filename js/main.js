/**
 * Portfolio behaviour
 * ------------------------------------------------------------------
 *  1. Helpers
 *  2. Cursor glow            (desktop pointer only)
 *  3. Mobile navigation      (hamburger menu)
 *  4. Smooth scrolling       (Lenis, with a CSS fallback)
 *  5. Skill chips + marquee
 *  6. About cards            (touch devices: highlight on scroll)
 *  7. Projects               (filter tabs, cards, read more, lightbox)
 *  8. Hero code typing
 *
 * Data comes from js/projects-data.js (`filters`, `projects`).
 */
(() => {
  'use strict';

  /* ------------------------------------------------------------------
   * 1. Helpers
   * ---------------------------------------------------------------- */
  const root = document.documentElement;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = matchMedia('(pointer: fine)').matches;
  const isTouchOnly = matchMedia('(hover: none)').matches;

  const escapeHtml = (text) =>
    text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const debounce = (callback, wait) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(...args), wait);
    };
  };

  const whenFontsReady = (callback) => {
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(callback);
  };

  /* ------------------------------------------------------------------
   * 2. Cursor glow: feeds --mx / --my to the CSS spotlight
   * ---------------------------------------------------------------- */
  function initCursorGlow() {
    if (!hasFinePointer) return;

    addEventListener(
      'pointermove',
      ({ clientX, clientY }) => {
        root.style.setProperty('--mx', `${clientX}px`);
        root.style.setProperty('--my', `${clientY}px`);
      },
      { passive: true },
    );
  }

  /* ------------------------------------------------------------------
   * 3. Mobile navigation
   * ---------------------------------------------------------------- */
  function initMobileNav() {
    const nav = $('nav');
    const burger = $('.burger', nav);

    const setOpen = (open) => {
      nav.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    };

    burger.addEventListener('click', () => setOpen(!nav.classList.contains('open')));

    // Close after choosing a link, pressing Escape, or clicking elsewhere.
    nav.addEventListener('click', (event) => {
      if (event.target.closest('.pill a')) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setOpen(false);
    });
    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target)) setOpen(false);
    });
  }

  /* ------------------------------------------------------------------
   * 4. Smooth scrolling (Lenis). Falls back to native CSS smooth scroll
   *    if the library failed to load.
   * ---------------------------------------------------------------- */
  function initSmoothScroll() {
    if (!window.Lenis) {
      root.style.scrollBehavior = 'smooth';
      return;
    }

    const lenis = new Lenis({ duration: 2.5, smoothWheel: true, touchMultiplier: 1.5 });

    const frame = (time) => {
      lenis.raf(time);
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);

    // In-page links (#about, #projects, ...) glide instead of jumping.
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;

      const id = link.getAttribute('href').slice(1);
      const goesToTop = !id || id === 'top';
      const target = goesToTop ? null : document.getElementById(id);
      if (!goesToTop && !target) return;

      event.preventDefault();
      const stickyOffset = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
      lenis.scrollTo(target || 0, { offset: -stickyOffset });
    });

    // Freeze page scrolling while the image lightbox is open.
    const lightbox = $('#lightbox');
    new MutationObserver(() => (lightbox.open ? lenis.stop() : lenis.start())).observe(lightbox, {
      attributes: true,
      attributeFilter: ['open'],
    });
  }

  /* ------------------------------------------------------------------
   * 5. Skill chips and the scrolling marquee
   * ---------------------------------------------------------------- */
  const SKILLS = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Bootstrap',
    'SCSS',
    'PHP',
    'MySQL',
    'jQuery',
    'WordPress',
    'Git and GitHub',
  ];

  const MARQUEE_WORDS = [
    'WordPress',
    'Elementor',
    'WooCommerce',
    'Custom themes',
    'Plugins',
    'Bricks',
    'Tailwind',
    'PHP',
  ];

  const toChips = (items) => items.map((item) => `<span>${item}</span>`).join('');

  function initSkills() {
    $('#stack').innerHTML = toChips(SKILLS);
  }

  /**
   * Repeats the words until the strip is wider than the screen, then slides it
   * by exactly one set so the loop is seamless on any monitor size.
   */
  function initMarquee() {
    const track = $('#tick');
    const oneSet = toChips(MARQUEE_WORDS);

    const build = () => {
      track.innerHTML = oneSet;
      const setWidth = track.scrollWidth || 600;
      const copies = Math.ceil(innerWidth / setWidth) + 1;

      track.innerHTML = oneSet.repeat(copies);
      track.style.setProperty('--set', `${setWidth}px`);
      track.style.animation = prefersReducedMotion
        ? 'none'
        : `marquee-slide ${Math.max(25, setWidth / 70)}s linear infinite`;
    };

    build();
    addEventListener('resize', debounce(build, 200));
    whenFontsReady(build);
  }

  /* ------------------------------------------------------------------
   * 6. About cards: touch screens have no hover, so play the highlight
   *    once when each card scrolls into view.
   * ---------------------------------------------------------------- */
  function initRoleHighlight() {
    if (!isTouchOnly || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const card = entry.target;
          observer.unobserve(card);
          card.classList.add('on');
          setTimeout(() => card.classList.remove('on'), 1700);
        });
      },
      { threshold: 0.7 },
    );

    $$('.role').forEach((card) => observer.observe(card));
  }

  /* ------------------------------------------------------------------
   * 7. Projects
   * ---------------------------------------------------------------- */
  function initProjects() {
    const filterBar = $('#filters');
    const grid = $('#grid');
    const lightbox = $('#lightbox');
    let activeFilter = 'all';

    const renderFilters = () => {
      filterBar.innerHTML = filters
        .map(
          ({ id, label }) =>
            `<button type="button" data-filter="${id}" aria-pressed="${id === activeFilter}">${escapeHtml(label)}</button>`,
        )
        .join('');
    };

    const renderCard = (project) => {
      const title = escapeHtml(project.title);
      const links = [
        project.url && `<a href="${project.url}">${project.linkLabel}</a>`,
        project.docUrl && `<a href="${project.docUrl}">Documentation</a>`,
      ]
        .filter(Boolean)
        .join('');

      return `
        <article class="card">
          <button class="zoom" aria-label="Enlarge ${title}">
            <img class="${project.imageFit ? 'fit' : ''}" src="${project.image}"
                 alt="${title} preview" loading="lazy" decoding="async">
          </button>
          <div class="body">
            <span class="lab">${escapeHtml(project.label)}</span>
            <h3>${title}</h3>
            <p class="desc">${escapeHtml(project.description)}</p>
            <button class="more" hidden>Read more</button>
            <div class="tags">${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
            <div class="links">${links}</div>
          </div>
        </article>`;
    };

    // Only show "Read more" on descriptions that are actually clamped.
    const updateReadMoreButtons = () => {
      $$('.desc', grid).forEach((description) => {
        if (description.classList.contains('open')) return;
        const button = description.nextElementSibling;
        button.hidden = description.scrollHeight <= description.clientHeight + 1;
      });
    };

    const render = () => {
      const visible = projects.filter(
        (project) => activeFilter === 'all' || project.filters.includes(activeFilter),
      );
      renderFilters();
      grid.innerHTML = visible.map(renderCard).join('');
      updateReadMoreButtons();
    };

    filterBar.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-filter]');
      if (!button) return;
      activeFilter = button.dataset.filter;
      render();
    });

    grid.addEventListener('click', (event) => {
      const zoom = event.target.closest('.zoom');
      if (zoom) {
        const image = $('img', zoom);
        const preview = $('img', lightbox);
        preview.src = image.src;
        preview.alt = image.alt;
        lightbox.showModal();
        return;
      }

      const more = event.target.closest('.more');
      if (more) {
        const expanded = more.previousElementSibling.classList.toggle('open');
        more.textContent = expanded ? 'Show less' : 'Read more';
      }
    });

    lightbox.addEventListener('click', () => lightbox.close());

    render();
    whenFontsReady(updateReadMoreButtons);
    addEventListener('resize', debounce(updateReadMoreButtons, 150));
  }

  /* ------------------------------------------------------------------
   * 8. Hero code window: types the snippet like a person, with uneven
   *    speed, pauses and the odd typo, then loops forever.
   * ---------------------------------------------------------------- */
  // [css class, text]  ->  k = keyword, s = string, f = function name
  const CODE_SEGMENTS = [
    ['k', 'add_action'],
    ['', '( '],
    ['s', "'init'"],
    ['', ', '],
    ['k', 'function'],
    ['', '() {\n  '],
    ['f', 'register_post_type'],
    ['', '( '],
    ['s', "'project'"],
    ['', ', [\n    '],
    ['s', "'public'"],
    ['', ' => '],
    ['k', 'true'],
    ['', ',\n    '],
    ['s', "'supports'"],
    ['', ' => ['],
    ['s', "'title'"],
    ['', ', '],
    ['s', "'editor'"],
    ['', ', '],
    ['s', "'thumbnail'"],
    ['', '],\n  ] );\n} );\n\n'],
    ['k', '// fast, clean, built to last'],
  ];

  function initCodeTyping() {
    const output = $('#code');
    const fullText = CODE_SEGMENTS.map(([, text]) => text).join('');
    let typed = 0; // characters currently shown
    let typo = ''; // a wrong letter shown briefly before it is deleted

    const wrapSegment = (cssClass, text) =>
      cssClass ? `<span class="${cssClass}">${escapeHtml(text)}</span>` : escapeHtml(text);

    const render = () => {
      let html = '';
      let used = 0;

      for (const [cssClass, text] of CODE_SEGMENTS) {
        const room = typed - used;
        if (room <= 0) break;
        html += wrapSegment(cssClass, text.slice(0, room));
        used += text.length;
      }

      output.innerHTML = `${html}${escapeHtml(typo)}<span class="caret"></span>`;
    };

    if (prefersReducedMotion) {
      typed = fullText.length;
      render();
      return;
    }

    const delayAfter = (char) => {
      let delay = 50 + Math.random() * 70;
      if (char === ' ') delay += 25;
      if (char === '\n') delay += 200 + Math.random() * 150;
      if (',([{;'.includes(char)) delay += 70;
      if (Math.random() < 0.05) delay += 300 + Math.random() * 300; // a "thinking" pause
      return delay;
    };

    const step = () => {
      // Finished: wait so it can be read, clear, start again.
      if (typed >= fullText.length) {
        setTimeout(() => {
          typed = 0;
          typo = '';
          render();
          setTimeout(step, 800);
        }, 2300);
        return;
      }

      const char = fullText.charAt(typed);

      // Occasionally mistype a letter, pause, delete it, carry on.
      if (!typo && /[a-z]/i.test(char) && Math.random() < 0.035) {
        typo = String.fromCharCode(char.charCodeAt(0) + (Math.random() < 0.5 ? 1 : -1));
        render();
        setTimeout(
          () => {
            typo = '';
            render();
            setTimeout(step, 130);
          },
          180 + Math.random() * 160,
        );
        return;
      }

      typed += 1;
      render();
      setTimeout(step, delayAfter(char));
    };

    step();
  }

  /* ------------------------------------------------------------------
   * Start everything
   * ---------------------------------------------------------------- */
  initCursorGlow();
  initMobileNav();
  initSmoothScroll();
  initSkills();
  initMarquee();
  initRoleHighlight();
  initProjects();
  initCodeTyping();
})();
