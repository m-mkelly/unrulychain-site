import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/** Final call-to-action section used at the bottom of content pages.
 *  Renders an editorial-grid layout with heading, description, and ghost button. */
@customElement('cta-section')
export class CtaSection extends LitElement {
  @property() heading = '';
  @property() description = '';
  @property() buttonText = 'Schedule a Conversation';
  @property() buttonHref = '/schedule';

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <section class="page-section page-section--hero">
        <div class="page-inner editorial-grid">
          <div>
            <h2 class="section-title">${this.heading}</h2>
          </div>
          <div>
            <p class="section-lead">${this.description}</p>
            <a class="btn btn--ghost" href=${this.buttonHref}><span>${this.buttonText}</span></a>
          </div>
        </div>
      </section>
    `;
  }
}
