import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../styles/components/editorial-section.css';

/** Two-column editorial layout: sticky aside (heading + pullquote) alongside
 *  scrolling narrative content (text + images). Supports flipping via `reverse`. */
@customElement('editorial-section')
export class EditorialSection extends LitElement {
  @property() heading = '';
  @property({ type: Boolean }) alternate = false;
  @property({ type: Boolean }) reverse = false;
  @property({ attribute: false }) renderQuote?: () => TemplateResult<1>;
  @property({ attribute: false }) renderBody?: () => TemplateResult<1>;

  createRenderRoot() {
    return this;
  }

  render() {
    const sectionClass = `page-section${this.alternate ? ' page-section--alternate' : ''}`;
    const gridClass = `editorial-section__grid${this.reverse ? ' editorial-section__grid--reverse' : ''}`;

    return html`
      <section class="${sectionClass}">
        <div class="page-inner">
          <div class="${gridClass}">
            <aside class="editorial-section__aside">
              <h2 class="section-title">${this.heading}</h2>
              ${this.renderQuote ? this.renderQuote() : nothing}
            </aside>
            <div class="editorial-section__body">
              ${this.renderBody ? this.renderBody() : nothing}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
