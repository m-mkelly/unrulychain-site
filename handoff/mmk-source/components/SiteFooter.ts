import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../styles/components/site-footer.css';

import logoSrc from '../../assets/logo.png';

/** Site-wide footer with logo, navigation links, connect links, and legal row. */
@customElement('site-footer')
export class SiteFooter extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <footer class="site-footer">
        <div class="site-footer__content">
          <div class="site-footer__brand">
            <div class="site-footer__logo-group">
              <a href="/" aria-label="M&M Kelly home">
                <img
                  class="site-footer__logo-img"
                  src="${logoSrc}"
                  alt="M&M Kelly"
                  width="100"
                  height="100"
                />
              </a>
              <p class="site-footer__tagline">
                AI transformation advisory for executive teams.
              </p>
            </div>
          </div>
          <nav class="site-footer__col" aria-label="Footer navigation">
            <span class="site-footer__col-title">Navigate</span>
            <a class="site-footer__link" href="/"><i class="ph ph-arrow-right" aria-hidden="true"></i><span>Home</span></a>
            <a class="site-footer__link" href="/services"><i class="ph ph-arrow-right" aria-hidden="true"></i><span>Services</span></a>
            <a class="site-footer__link" href="/ai-consulting"><i class="ph ph-arrow-right" aria-hidden="true"></i><span>AI Consulting</span></a>
            <a class="site-footer__link" href="/founder"><i class="ph ph-arrow-right" aria-hidden="true"></i><span>Founder</span></a>
          </nav>
          <nav class="site-footer__col" aria-label="Connect">
            <span class="site-footer__col-title">Connect</span>
            <a class="site-footer__link" href="/schedule"><i class="ph ph-arrow-right" aria-hidden="true"></i><span>Schedule a Conversation</span></a>
            <a class="site-footer__link" href="https://www.linkedin.com/company/m-m-kelly/" target="_blank" rel="noopener noreferrer"><i class="ph ph-arrow-up-right" aria-hidden="true"></i><span>M&amp;M Kelly on LinkedIn</span></a>
          </nav>
        </div>
        <div class="site-footer__bottom">
          <span class="site-footer__copyright"
            >&copy; 2026 M&M Kelly. All rights reserved.</span
          >
          <div class="site-footer__legal">
            <a class="site-footer__legal-link" href="/privacy">Privacy</a>
          </div>
        </div>
      </footer>
    `;
  }
}
