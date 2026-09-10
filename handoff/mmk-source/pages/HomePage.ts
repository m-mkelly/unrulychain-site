import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../styles/pages/home-page.css';
import '../components/PageHero.js';
import '../components/CtaSection.js';

import architectureExteriorSrc from '../../assets/architecture-exterior.jpg';
import executivesBoardroomSrc from '../../assets/executives-boardroom.jpg';
import executiveOfficeSrc from '../../assets/executive-office.jpg';

/** Landing page: firm positioning, executive AI challenge, approach principles, and CTA. */
@customElement('home-page')
export class HomePage extends LitElement {
  createRenderRoot() {
    return this;
  }

  /** Numbered items rendered via .map() in the "How we help" editorial grid. */
  private readonly _services = [
    { number: '01', title: 'Assessment & readiness', desc: 'Understand where your organization stands on AI decision-making, governance, and leadership alignment before investing further.', href: '/services', linkText: 'Explore services' },
    { number: '02', title: 'Strategy & design', desc: 'Build the operating model, strategic roadmap, and organizational infrastructure that makes AI initiatives succeed.', href: '/services', linkText: 'Explore services' },
    { number: '03', title: 'Advisory & support', desc: 'Ongoing senior counsel for AI vendor decisions, board preparation, policy development, and navigating execution challenges.', href: '/ai-consulting', linkText: 'Learn about AI consulting' },
  ];

  /** Differentiator cards rendered via .map() in the "Our approach" grid. */
  private readonly _approach = [
    { title: 'Senior partners, not junior consultants', desc: 'Every engagement is led by partners with deep operational and leadership expertise. You work directly with the people who do the thinking.', icon: 'ph-duotone ph-users-three' },
    { title: 'Strategic, not technical', desc: 'We focus on the organizational decisions that determine whether AI investments produce results, not the technology itself.', icon: 'ph-duotone ph-compass-tool' },
    { title: 'Aligned to your value', desc: 'Engagements are priced against the organizational value they unlock, not hourly rates multiplied by headcount.', icon: 'ph-duotone ph-scales' },
  ];

  render() {
    return html`
      <main class="home-page" id="main-content" aria-label="Main content">
        <!-- HERO: Asymmetrical layout, huge typography, left-aligned, stark contrast -->
        <page-hero
          layout="grid"
          eyebrowMeta="Perspective No. 01"
          eyebrowLabel="M&amp;M Kelly Advisory"
          heading="Strategic AI advisory for executive teams."
          signature="M&amp;M Kelly"
          .renderAside=${() => html`
            <p class="hero-subtitle">
              Navigate AI transformation with confidence. We help leaders cut through the
              noise, align their organizations, and build AI strategies that deliver
              measurable business value.
            </p>
            <a class="btn btn--ghost" href="/schedule"><span>Schedule a Conversation</span></a>
            <div class="img-container img-container--vertical home-page__hero-image">
              <img class="img-editorial" src=${architectureExteriorSrc} alt="Modern architecture" width="2070" height="1380" loading="eager" fetchpriority="high" />
            </div>
          `}
        ></page-hero>

        <!-- CHALLENGE: Clean text, elegant divider lines -->
        <section class="page-section page-section--alternate page-section--stagger">
          <div class="page-inner editorial-grid">
            <div class="home-page__editorial-header">
              <h2 class="section-title">The executive AI challenge</h2>
              <div class="img-container img-container--square home-page__challenge-image">
                <img class="img-editorial" src=${executivesBoardroomSrc} alt="Executives in boardroom" width="2071" height="1381" loading="lazy" />
              </div>
            </div>
            <div class="home-page__editorial-content">
              <p class="section-lead">
                You know AI matters. Your board knows it. Your competitors know it. But
                knowing you need to act and knowing the right path forward are two very
                different things.
              </p>
              <ul class="home-page__pain-list" role="list">
                <li class="home-page__pain-item" style="--index: 0">
                  Fragmented experimentation without governance or measurable results
                </li>
                <li class="home-page__pain-item" style="--index: 1">
                  Leadership team misalignment on AI priorities and strategy
                </li>
                <li class="home-page__pain-item" style="--index: 2">
                  Vendor noise drowning out genuine strategic clarity
                </li>
                <li class="home-page__pain-item" style="--index: 3">
                  Employee anxiety about changing roles and organizational disruption
                </li>
                <li class="home-page__pain-item" style="--index: 4">
                  Board pressure for an AI strategy you haven&rsquo;t built yet
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- HOW WE HELP: Clean Editorial Index layout -->
        <section class="page-section page-section--stagger home-page__section--how-we-help">
          <div class="page-inner home-page__index-grid">
            <aside class="home-page__index-aside">
              <h2 class="section-title">How we help</h2>
              <p class="section-lead">
                We don&rsquo;t just advise. We build the decision-making infrastructure
                your leadership team needs to navigate the AI era with precision.
              </p>
              <div class="img-container img-container--vertical home-page__index-image">
                <img class="img-editorial" src=${executiveOfficeSrc} alt="Executive decision making" width="2069" height="1379" loading="lazy" />
              </div>
            </aside>

            <div class="home-page__index-list">
              ${this._services.map((s, i) => html`
                <div class="home-page__index-item" style="--index: ${i}">
                  <span class="home-page__service-number">${s.number}</span>
                  <div class="home-page__index-content">
                    <h3 class="card-title">${s.title}</h3>
                    <p class="card-description">${s.desc}</p>
                    <a class="home-page__link home-page__link--accent" href="${s.href}"
                      ><span>${s.linkText}</span> <i class="ph-duotone ph-arrow-right" aria-hidden="true"></i></a
                    >
                  </div>
                </div>
              `)}
            </div>
          </div>
        </section>

        <!-- APPROACH: Index layout with icons -->
        <section class="page-section page-section--alternate page-section--stagger home-page__section--approach">
          <div class="page-inner home-page__index-grid">
            <aside class="home-page__index-aside">
              <h2 class="section-title">Our approach</h2>
            </aside>
            <div class="home-page__index-list">
              ${this._approach.map((a, i) => html`
                <div class="home-page__index-item" style="--index: ${i}">
                  <i class="home-page__approach-icon ${a.icon}" aria-hidden="true"></i>
                  <div class="home-page__index-content">
                    <h3 class="card-title">${a.title}</h3>
                    <p class="card-description">${a.desc}</p>
                  </div>
                </div>
              `)}
            </div>
          </div>
        </section>

        <!-- FINAL CTA: Clean, large, elegant -->
        <cta-section
          heading="Ready for clarity on AI?"
          description="Schedule a Conversation to discuss your organization's AI challenges and how we can help."
        ></cta-section>
      </main>
    `;
  }
}
