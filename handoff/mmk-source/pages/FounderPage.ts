import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../styles/pages/founder-page.css';
import '../components/PageHero.js';
import '../components/EditorialSection.js';
import '../components/CtaSection.js';

import portraitSrc from '../../assets/mitch-kelly.png';

/** Founder biography page: Mitch Kelly's background, credentials, and LinkedIn links. */
@customElement('founder-page')
export class FounderPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  /** Person schema for Google rich results. */
  private readonly _jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mitch Kelly",
    "jobTitle": "Founder & Principal Consultant",
    "worksFor": {
      "@type": "Organization",
      "name": "M&M Kelly Advisory",
      "url": "https://mandmkelly.com"
    },
    "url": "https://mandmkelly.com/founder/",
    "sameAs": [
      "https://www.linkedin.com/in/mitch-fernandez-sensei/",
      "https://www.linkedin.com/company/m-m-kelly/"
    ]
  };

  private _jsonLdScript: HTMLScriptElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(this._jsonLd);
    document.head.appendChild(script);
    this._jsonLdScript = script;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._jsonLdScript?.remove();
    this._jsonLdScript = null;
  }

  render() {
    return html`
      <main class="founder-page" id="main-content" aria-label="Main content">

        <!-- Hero -->
        <page-hero
          layout="grid"
          eyebrowMeta="Perspective No. 05"
          eyebrowLabel="Founder"
          heading="Mitch Kelly"
          signature="M&amp;M Kelly"
          .renderAside=${() => html`
            <p class="hero-subtitle">Founder &amp; Principal Consultant</p>
            <div class="img-container img-container--vertical founder-page__portrait">
              <img
                class="img-editorial"
                src="${portraitSrc}"
                alt="Mitch Kelly, Founder and Principal Consultant of M&M Kelly Advisory"
                width="896"
                height="1106"
                loading="eager"
                fetchpriority="high"
              />
            </div>
          `}
        ></page-hero>

        <!-- Career background -->
        <editorial-section
          heading="The background"
.renderBody=${() => html`
            <p class="section-lead">
              Mitch Kelly spent thirty years in rooms where the work mattered and the
              stakes were real. Military intelligence. Federal cybersecurity. Academic
              research. Gene therapy. Enterprise software. Policy. At each stop, he
              built something, learned something, and left when the institution stopped
              earning his trust.
            </p>
            <p>
              That pattern cost him. He has walked away from more than a million dollars
              in career earnings because the alternative was pretending things were fine
              when they were not. Most people call that reckless. The executives who hire
              him call it the reason they trust his judgment.
            </p>
          `}
        ></editorial-section>

        <!-- Why M&M Kelly -->
        <section class="page-section page-section--alternate">
          <div class="page-inner">
            <div class="editorial-grid">
              <aside>
                <h2 class="section-title">Why M&amp;M Kelly</h2>
              </aside>
              <div>
                <p class="section-lead">
                  Kelly founded M&amp;M Kelly because the organizations trying to adopt AI
                  are failing at the same things he has watched institutions fail at for
                  three decades. Not the technology. The leadership.
                </p>
                <p>
                  The inability to decide, to assign accountability, to tell the truth
                  about what is working and what is not. He operates at that layer because
                  nobody else will, and because everything downstream depends on getting
                  it right.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Credentials and connect -->
        <section class="page-section">
          <div class="page-inner">
            <div class="editorial-grid">
              <aside>
                <h2 class="section-title">Credentials</h2>
              </aside>
              <div>
                <p>
                  He speaks three languages, holds degrees from three universities, and
                  has earned a 3rd-degree black belt across eighteen years of training in
                  aikido, the discipline of redirecting force rather than fighting it.
                  That last part is not a hobby. It is a working description of what he
                  does. With an advanced degree in Bioinformatics from the University of
                  Michigan, he has publications in over a dozen journals, including
                  Nucleic Acids Research, BMC Genomics, and Lupus.
                </p>
                <div class="founder-page__connect">
                  <a
                    class="btn btn--ghost"
                    href="https://www.linkedin.com/in/mitch-fernandez-sensei/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="ph ph-arrow-up-right" aria-hidden="true"></i>
                    <span>Mitch Kelly on LinkedIn</span>
                  </a>
                  <a
                    class="btn btn--ghost"
                    href="https://www.linkedin.com/company/m-m-kelly/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="ph ph-arrow-up-right" aria-hidden="true"></i>
                    <span>M&amp;M Kelly Advisory on LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA -->
        <cta-section
          heading="Integrity, credibility"
          description="Mitch Kelly built this firm on the principle that AI strategy work belongs in the hands of people who have done it, not people who have read about it. That standard applies to every engagement we take."
        ></cta-section>

      </main>
    `;
  }
}
