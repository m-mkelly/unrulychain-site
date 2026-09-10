import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../styles/components/page-hero.css';

/** Full-width hero section with eyebrow, display title, and optional subtitle.
 *  Supports single-column (default) and two-column grid layout with aside content. */
@customElement('page-hero')
export class PageHero extends LitElement {
  @property() eyebrowMeta = '';
  @property() eyebrowLabel = '';
  @property() heading = '';
  @property() signature = '';
  @property() subtitle = '';
  @property() layout: 'single' | 'grid' = 'single';
  @property({ type: Boolean }) scrollHint = false;
  @property({ attribute: false }) renderAside?: () => TemplateResult<1>;

  createRenderRoot() {
    return this;
  }

  /** Scrolls the first section after the hero into view smoothly. */
  private _scrollToContent() {
    const next = this.nextElementSibling as HTMLElement | null;
    next?.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const eyebrow = this.eyebrowMeta
      ? html`
          <div class="eyebrow">
            <span class="eyebrow-meta">${this.eyebrowMeta}</span>
            ${this.eyebrowLabel ? html`<span>${this.eyebrowLabel}</span>` : nothing}
          </div>
        `
      : nothing;

    const title = html`<h1 class="hero-title">${this.heading}</h1>`;

    const sig = this.signature
      ? html`<div class="page-hero__signature">${this.signature}</div>`
      : nothing;

    const subtitle = this.subtitle
      ? html`<p class="hero-subtitle">${this.subtitle}</p>`
      : nothing;

    if (this.layout === 'grid') {
      return html`
        <section class="page-section page-section--hero">
          <div class="page-inner hero-grid">
            <div class="hero-content">
              ${eyebrow}
              ${title}
              ${sig}
              ${this.renderAside ? subtitle : nothing}
              ${this.scrollHint ? html`
                <div class="page-hero__scroll-hint">
                  <button
                    class="page-hero__scroll-btn"
                    aria-label="Scroll to content"
                    @click=${this._scrollToContent}
                  >
                    <i class="ph ph-arrow-down" aria-hidden="true"></i>
                  </button>
                </div>
              ` : nothing}
            </div>
            <div class="hero-aside">
              ${this.renderAside ? this.renderAside() : subtitle}
            </div>
          </div>
        </section>
      `;
    }

    return html`
      <section class="page-section page-section--hero">
        <div class="page-inner">
          ${eyebrow}
          ${title}
          ${sig}
          ${subtitle}
        </div>
      </section>
    `;
  }
}
