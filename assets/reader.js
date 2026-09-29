(() => {
  const reader = document.querySelector('.reader');
  if (!reader) return;
  const screen = reader.querySelector('.reader-screen');
  const flow = reader.querySelector('.reader-flow');
  const current = reader.querySelector('.reader-current');
  const total = reader.querySelector('.reader-total');
  const back = reader.querySelector('.reader-back');
  const forward = reader.querySelector('.reader-forward');
  const enlarge = reader.querySelector('.reader-enlarge');
  const typeButtons = [...reader.querySelectorAll('[data-type]')];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let page = 0, pages = 1, started = false, complete = false, backdrop = null;
  const seen = new Set();
  const event = (name, params) => { if (typeof window.gtag === 'function') window.gtag('event', name, params); };
  const pageWidth = () => screen.clientWidth;
  const gap = () => parseFloat(getComputedStyle(flow).columnGap) || 28;
  function firstVisible() {
    const target = page * (pageWidth() + gap());
    return [...flow.querySelectorAll('p,h3')].find(el => [...el.getClientRects()].some(rect => {
      const x = rect.left - flow.getBoundingClientRect().left;
      return x >= target - 2 && x < target + pageWidth();
    })) || null;
  }
  function show(next, track = true) {
    page = Math.max(0, Math.min(pages - 1, next));
    reader.style.setProperty('--page', page);
    current.textContent = String(page + 1);
    total.textContent = String(pages);
    back.disabled = page === 0;
    forward.disabled = page === pages - 1;
    if (track && page > 0) {
      if (!started) { event('reader_start'); started = true; }
      if (!seen.has(page + 1)) { event('reader_page', {page_number: page + 1}); seen.add(page + 1); }
      if (page === pages - 1 && !complete) { event('reader_complete'); complete = true; }
    }
  }
  function measure(anchor = null) {
    const width = pageWidth();
    if (width < 100) return;
    reader.style.setProperty('--page-w', width + 'px');
    reader.style.setProperty('--page', 0);
    pages = Math.max(1, Math.ceil((flow.scrollWidth + gap() - 1) / (width + gap())));
    if (anchor) {
      const x = anchor.getBoundingClientRect().left - flow.getBoundingClientRect().left;
      show(Math.floor(Math.max(0, x + 2) / (width + gap())), false);
    } else show(page, false);
  }
  reader.classList.add('is-paged');
  measure();
  const resize = new ResizeObserver(() => { const anchor = firstVisible(); measure(anchor); });
  resize.observe(screen);
  if (document.fonts) document.fonts.ready.then(() => measure(firstVisible()));
  back.addEventListener('click', () => show(page - 1));
  forward.addEventListener('click', () => show(page + 1));
  typeButtons.forEach(button => button.addEventListener('click', () => {
    const anchor = firstVisible();
    reader.style.setProperty('--reader-text', button.dataset.type === 'large' ? '22px' : (window.matchMedia('(max-width: 800px)').matches ? '17px' : '19px'));
    typeButtons.forEach(item => item.setAttribute('aria-checked', String(item === button)));
    measure(anchor);
  }));
  function close() {
    if (!backdrop) return;
    const anchor = firstVisible();
    backdrop.remove(); backdrop = null;
    reader.classList.remove('is-enlarged');
    enlarge.textContent = 'Enlarge'; enlarge.setAttribute('aria-pressed', 'false');
    document.body.style.overflow = '';
    measure(anchor); enlarge.focus();
  }
  enlarge.addEventListener('click', () => {
    if (backdrop) { close(); return; }
    const anchor = firstVisible();
    backdrop = document.createElement('div'); backdrop.className = 'reader-backdrop';
    backdrop.addEventListener('click', close);
    document.body.append(backdrop);
    reader.classList.add('is-enlarged');
    enlarge.textContent = 'Close'; enlarge.setAttribute('aria-pressed', 'true');
    document.body.style.overflow = 'hidden';
    measure(anchor); enlarge.focus();
  });
  reader.addEventListener('keydown', e => {
    if (backdrop && e.key === 'Tab') {
      const targets = [...reader.querySelectorAll('button:not(:disabled),a[href]')];
      const first = targets[0], last = targets[targets.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    if (e.key === 'Escape' && backdrop) { e.preventDefault(); close(); return; }
    if (e.target.closest('button,a') && !e.target.matches('[data-dir]')) return;
    const keys = {ArrowRight:page + 1, PageDown:page + 1, ArrowLeft:page - 1, PageUp:page - 1, Home:0, End:pages - 1};
    if (e.key in keys) { e.preventDefault(); show(keys[e.key]); }
  });
  let origin = null;
  screen.addEventListener('pointerdown', e => { origin = {x:e.clientX,y:e.clientY}; });
  screen.addEventListener('pointerup', e => {
    if (!origin) return;
    const dx = e.clientX - origin.x, dy = e.clientY - origin.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) show(page + (dx < 0 ? 1 : -1));
    origin = null;
  });
  if (motion.matches) reader.classList.add('is-awake');
  else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { reader.classList.add('is-awake'); observer.disconnect(); }
    }, {threshold: .25}); observer.observe(reader);
  } else reader.classList.add('is-awake');
})();
