(() => {
  const reader = document.querySelector('.reader');
  if (!reader) return;
  const screen = reader.querySelector('.reader-screen'), flow = reader.querySelector('.reader-flow');
  const current = reader.querySelector('.reader-current'), total = reader.querySelector('.reader-total');
  const back = reader.querySelector('.reader-back'), forward = reader.querySelector('.reader-forward');
  const enlarge = reader.querySelector('.reader-enlarge'), types = [...reader.querySelectorAll('[data-type]')];
  const motion = matchMedia('(prefers-reduced-motion: reduce)'), seen = new Set();
  let page = 0, pages = 1, stride = 0, anchor = null, started = false, complete = false;
  let backdrop, placeholder, oldOverflow, inertNodes = [];
  const event = (name, params) => { if (typeof window.gtag === 'function') window.gtag('event', name, params); };
  const rects = el => [...el.getClientRects()].map(r => r.left - flow.getBoundingClientRect().left);
  function remember() {
    const nodes = [...flow.children];
    for (const el of nodes) {
      const xs = rects(el), i = xs.findIndex(x => x >= page * stride - 2 && x < (page + 1) * stride - 2);
      if (i >= 0) return {el, fraction: i / Math.max(1, xs.length)};
    }
    return null;
  }
  function show(next, track = true) {
    page = Math.max(0, Math.min(pages - 1, next));
    reader.style.setProperty('--page', page);
    current.textContent = String(page + 1).padStart(3, '0');
    total.textContent = String(pages).padStart(3, '0');
    back.disabled = page === 0; forward.disabled = page === pages - 1;
    anchor = remember();
    if (track && page > 0) {
      if (!started) { event('reader_start'); started = true; }
      if (!seen.has(page + 1)) { event('reader_page', {page_number:page + 1}); seen.add(page + 1); }
      if (page === pages - 1 && !complete) { event('reader_complete'); complete = true; }
    }
  }
  function measure() {
    const width = screen.clientWidth, saved = anchor;
    if (width < 100) return;
    reader.style.setProperty('--page-w', width + 'px');
    stride = width + (parseFloat(getComputedStyle(flow).columnGap) || 28);
    pages = Math.max(1, Math.round((flow.scrollWidth + stride - width) / stride));
    if (saved) {
      const xs = rects(saved.el), index = Math.min(xs.length - 1, Math.floor(saved.fraction * xs.length));
      show(Math.floor((xs[index] + 2) / stride), false);
    } else show(page, false);
  }
  reader.classList.add('is-paged'); measure();
  new ResizeObserver(measure).observe(screen);
  if (document.fonts) document.fonts.ready.then(measure);
  back.addEventListener('click', () => show(page - 1));
  forward.addEventListener('click', () => show(page + 1));
  function type(button) {
    reader.style.setProperty('--reader-text', button.dataset.type === 'large' ? '22px' : (matchMedia('(max-width:800px)').matches ? '17px' : '19px'));
    types.forEach(item => { item.setAttribute('aria-checked', String(item === button)); item.tabIndex = item === button ? 0 : -1; });
    measure();
  }
  types.forEach((button, i) => {
    button.tabIndex = i ? -1 : 0;
    button.addEventListener('click', () => type(button));
    button.addEventListener('keydown', e => {
      if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)) {
        e.preventDefault(); const next = types[1 - i]; type(next); next.focus();
      }
    });
  });
  function close() {
    if (!backdrop) return;
    inertNodes.forEach(([el, value]) => { el.inert = value; }); inertNodes = [];
    placeholder.replaceWith(reader); placeholder = null;
    backdrop.remove(); backdrop = null;
    reader.classList.remove('is-enlarged'); reader.removeAttribute('aria-modal'); reader.setAttribute('role','region');
    enlarge.textContent = 'Enlarge'; enlarge.setAttribute('aria-pressed','false');
    document.body.style.overflow = oldOverflow;
    measure(); enlarge.focus({preventScroll:true});
  }
  enlarge.addEventListener('click', () => {
    if (backdrop) { close(); return; }
    placeholder = document.createElement('div'); placeholder.style.height = reader.offsetHeight + 'px';
    reader.before(placeholder);
    backdrop = document.createElement('div'); backdrop.className = 'reader-backdrop'; backdrop.setAttribute('aria-hidden','true');
    backdrop.addEventListener('click',close);
    document.body.append(backdrop,reader);
    for (const el of document.body.children) if (el !== reader && el !== backdrop) { inertNodes.push([el,el.inert]); el.inert = true; }
    reader.classList.add('is-enlarged'); reader.setAttribute('role','dialog'); reader.setAttribute('aria-modal','true');
    enlarge.textContent = 'Close'; enlarge.setAttribute('aria-pressed','true');
    oldOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
    measure(); enlarge.focus();
  });
  reader.addEventListener('keydown', e => {
    if (backdrop && e.key === 'Tab') {
      const targets = [...reader.querySelectorAll('button:not(:disabled):not([tabindex="-1"]),a[href]')];
      const first = targets[0], last = targets[targets.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    if (e.key === 'Escape' && backdrop) { e.preventDefault(); close(); return; }
    if (e.target.closest('.reader-type')) return;
    const keys = {ArrowRight:page+1,PageDown:page+1,ArrowLeft:page-1,PageUp:page-1,Home:0,End:pages-1};
    if (e.key in keys) { e.preventDefault(); show(keys[e.key]); }
  });
  const endLink = flow.querySelector('a');
  endLink.addEventListener('focus', () => show(pages - 1, false));
  endLink.addEventListener('click', close);
  let origin;
  screen.addEventListener('pointerdown', e => { origin = {x:e.clientX,y:e.clientY}; });
  screen.addEventListener('pointerup', e => {
    if (!origin) return;
    const dx = e.clientX-origin.x, dy = e.clientY-origin.y;
    if (Math.abs(dx)>40 && Math.abs(dx)>Math.abs(dy)) show(page+(dx<0?1:-1));
    origin = null;
  });
  screen.addEventListener('pointercancel', () => { origin = null; });
  const wake = () => { reader.classList.add('is-awake'); if (!motion.matches) reader.classList.add('is-warming'); };
  if (motion.matches || !('IntersectionObserver' in window)) wake();
  else {
    const observer = new IntersectionObserver(entries => { if (entries.some(e=>e.isIntersecting)) { wake(); observer.disconnect(); } },{threshold:.25});
    observer.observe(reader);
  }
})();
