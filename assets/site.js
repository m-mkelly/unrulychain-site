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

  // Newsletter subscribe
  document.querySelectorAll('form.subscribe').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const input = form.querySelector('input[name="email"]');
      const btn = form.querySelector('button');
      const email = input.value.trim();
      if (!email) return;

      btn.disabled = true;
      btn.textContent = 'Sending\u2026';

      // Remove any previous message
      const prev = form.querySelector('.subscribe-msg');
      if (prev) prev.remove();

      try {
        const res = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();

        const msg = document.createElement('p');
        msg.className = 'subscribe-msg';

        if (res.ok) {
          msg.classList.add('subscribe-ok');
          msg.textContent = data.message || 'Subscribed.';
          input.value = '';
        } else {
          msg.classList.add('subscribe-err');
          msg.textContent = data.error || 'Something went wrong.';
        }
        form.appendChild(msg);
      } catch {
        const msg = document.createElement('p');
        msg.className = 'subscribe-msg subscribe-err';
        msg.textContent = 'Could not connect. Try again.';
        form.appendChild(msg);
      }

      btn.disabled = false;
      btn.textContent = 'Subscribe';
    });
  });
})();
