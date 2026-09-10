import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../styles/components/card-grid-section.css';

/** Section with editorial header (heading + lead) above a responsive card grid.
 *  Cards are injected via renderCards callback. Supports alternate background. */
@customElement('card-grid-section')
export class CardGridSection extends LitElement {
  @property() heading = '';
  @property() lead = '';
  @property({ type: Boolean }) alternate = false;
  @property({ attribute: false }) renderCards?: () => TemplateResult<1>;

  createRenderRoot() {
    return this;
  }

  render() {
    const sectionClass = `page-section${this.alternate ? ' page-section--alternate' : ''}`;

    return html`
      <section class="${sectionClass}">
        <div class="page-inner">
          <div class="editorial-grid">
            <div>
              <h2 class="section-title">${this.heading}</h2>
            </div>
            <div>
              <p class="section-lead">${this.lead}</p>
            </div>
          </div>
          <div class="card-grid-section__grid">
            ${this.renderCards ? this.renderCards() : nothing}
          </div>
        </div>
      </section>
    `;
  }
}
