// GA4 Analytics — Property 554102515, Stream 15776120947
(function(){
  if (["localhost", "127.0.0.1", "::1"].includes(location.hostname)) return;
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;

  // Consent mode v2: analytics granted per privacy policy; ads denied
  gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });

  // Load gtag.js
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-D4FLE07ZYS';
  document.head.appendChild(s);

  gtag('js', new Date());
  gtag('config', 'G-D4FLE07ZYS');
})();

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
    window.addEventListener('resize', () => { if (window.innerWidth > 800) close(); });
  }

  // Content is visible by default, including when JavaScript fails.
  const localPreview = ['localhost','127.0.0.1','::1'].includes(location.hostname);

  // Newsletter subscribe
  document.querySelectorAll('form.subscribe').forEach(form => {
    const status = form.querySelector('.subscribe-status');
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const input = form.querySelector('input[name="email"]');
      const btn = form.querySelector('button');
      const email = input.value.trim();
      if (!email) return;
      if (localPreview) {
        if (status) status.textContent = 'Subscriptions are disabled in this local preview.';
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Sending\u2026';
      if (status) status.textContent = '';

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      try {
        const res = await fetch('/api/subscribe', {
          method: 'POST',
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();

        if (typeof data !== 'object' || data === null || (res.ok && data.ok !== true)) throw new Error('Invalid subscription response');
        if (status) {
          status.className = 'subscribe-status';
          if (res.ok) {
            status.classList.add('subscribe-ok');
            status.textContent = data.message || 'Subscribed.';
            input.value = '';
          } else {
            status.classList.add('subscribe-err');
            status.textContent = data.error || 'Something went wrong.';
          }
        }
      } catch {
        if (status) {
          status.className = 'subscribe-status subscribe-err';
          status.textContent = 'Could not connect. Try again.';
        }
      }

      clearTimeout(timeout);
      btn.disabled = false;
      btn.textContent = 'Subscribe';
    });
    form.querySelectorAll('input,button').forEach(el => el.disabled = false);
  });
})();
