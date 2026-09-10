(() => {
  const button = document.querySelector('.menu-button');
  const menu = document.querySelector('.mobile-nav');
  if (button && menu) {
    const close = () => {
      menu.classList.remove('open');
      button.setAttribute('aria-expanded','false');
      document.body.classList.remove('nav-open');
      button.textContent = 'Menu';
    };
    button.addEventListener('click', () => {
      const open = !menu.classList.contains('open');
      menu.classList.toggle('open', open);
      button.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('nav-open', open);
      button.textContent = open ? 'Close' : 'Menu';
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    window.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 760) close(); });
  }

  // Scroll-triggered reveal with stagger support
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  }), { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));
})();
