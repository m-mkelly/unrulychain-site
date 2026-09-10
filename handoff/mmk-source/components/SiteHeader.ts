import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../../styles/components/site-header.css';
import './SegmentedControl.js';

import logoSrc from '../../assets/logo.png';
import type { Segment } from './SegmentedControl.js';

/** Sticky site header with logo, segmented nav control, Internal dropdown,
 *  CTA button, sign in/out, and mobile hamburger menu. */
@customElement('site-header')
export class SiteHeader extends LitElement {
  @property() currentRoute = '/';
  @property({ type: Boolean }) isAuthenticated = false;
  @property() loginUrl = '';
  @property() onLogout?: () => void;
  @state() private _isMenuOpen = false;
  @state() private _isResizing = false;
  @state() private _internalOpen = false;
  private _resizeTimer?: ReturnType<typeof setTimeout>;

  private get _navSegments(): Segment[] {
    return [
      { label: 'Services', href: '/services' },
      { label: 'Life Sciences', href: '/life-sciences' },
      { label: 'AI Consulting', href: '/ai-consulting' },
      { label: 'Founder', href: '/founder' },
    ];
  }

  private get _internalTopLinks(): Array<{ label: string; href: string }> {
    return [
      { label: 'Writer', href: '/writer' },
      { label: 'Analytics', href: '/analytics' },
      { label: 'Guides', href: '/guides' },
    ];
  }

  createRenderRoot() {
    return this;
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('currentRoute')) {
      const oldRoute = changedProperties.get('currentRoute') as string | undefined;
      if (oldRoute !== undefined && oldRoute !== this.currentRoute) {
        this._internalOpen = false;
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._onResize = this._onResize.bind(this);
    this._onKeydown = this._onKeydown.bind(this);
    this._onClickOutside = this._onClickOutside.bind(this);
    window.addEventListener('resize', this._onResize);
    document.addEventListener('keydown', this._onKeydown);
    document.addEventListener('click', this._onClickOutside);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this._onResize);
    document.removeEventListener('keydown', this._onKeydown);
    document.removeEventListener('click', this._onClickOutside);
    clearTimeout(this._resizeTimer);
    document.body.classList.remove('scroll-locked');
  }

  private _onResize() {
    this._isResizing = true;
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(() => { this._isResizing = false; }, 150);
  }

  private _onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      if (this._internalOpen) {
        this._internalOpen = false;
        this.querySelector<HTMLElement>('.site-header__internal-toggle')?.focus();
        return;
      }
      if (this._isMenuOpen) {
        this._closeMenu();
        this.querySelector<HTMLElement>('.site-header__menu-toggle')?.focus();
        return;
      }
    }

    if (e.key === 'Tab' && this._isMenuOpen) {
      const overlay = this.querySelector<HTMLElement>('.site-header__links--open');
      if (!overlay) return;
      const toggle = this.querySelector<HTMLElement>('.site-header__menu-toggle');
      const focusable = [
        toggle,
        ...Array.from(overlay.querySelectorAll<HTMLElement>('a:not([aria-disabled="true"]), button')),
      ].filter((el): el is HTMLElement => el !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  private _onClickOutside() {
    // Dropdowns hold their open/closed state until page navigation.
    // No auto-close on click-outside.
  }

  private _toggleMenu() {
    this._isMenuOpen = !this._isMenuOpen;
    document.body.classList.toggle('scroll-locked', this._isMenuOpen);
    this._setBackgroundInert(this._isMenuOpen);
    if (this._isMenuOpen) {
      requestAnimationFrame(() => {
        const firstLink = this.querySelector<HTMLElement>('.site-header__links--open a');
        firstLink?.focus();
      });
    }
  }

  private _closeMenu() {
    this._isMenuOpen = false;
    this._internalOpen = false;
    document.body.classList.remove('scroll-locked');
    this._setBackgroundInert(false);
  }

  private _setBackgroundInert(inert: boolean) {
    const targets = document.querySelectorAll('main, site-footer, cookie-consent');
    targets.forEach(el => {
      if (inert) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    });
  }

  private _toggleInternal(e: Event) {
    e.stopPropagation();
    this._internalOpen = !this._internalOpen;
  }

  private _handleLogin(e: Event) {
    e.preventDefault();
    if (this.loginUrl) window.location.href = this.loginUrl;
  }

  private _handleLogout(e: Event) {
    e.preventDefault();
    this._closeMenu();
    this.onLogout?.();
  }

  private get _isInternalRoute(): boolean {
    const allHrefs = [
      ...this._internalTopLinks.map(l => l.href),
    ];
    return allHrefs.some(href =>
      this.currentRoute === href || this.currentRoute.startsWith(href + '/')
    );
  }

  render() {
    return html`
      <header class="site-header">
        <nav class="site-header__nav" aria-label="Main navigation">
          <div class="site-header__logo-group">
            <a class="site-header__logo" href="/" aria-label="M&M Kelly home" @click=${this._closeMenu}>
              <img
                class="site-header__logo-img"
                src="${logoSrc}"
                alt="M&M Kelly"
                width="100"
                height="100"
              />
            </a>
            <span class="site-header__tagline">
              AI transformation advisory for executive teams.
            </span>
          </div>
          
          <button
            class="site-header__menu-toggle"
            aria-label="Toggle menu"
            aria-expanded="${this._isMenuOpen}"
            @click=${this._toggleMenu}
          >
            <span class="site-header__menu-toggle-icon"></span>
          </button>

          <div class="site-header__links ${this._isMenuOpen ? 'site-header__links--open' : ''} ${this._isResizing ? 'site-header__links--no-transition' : ''}">
            <div class="site-header__mobile-nav">
              <segmented-control
                .segments=${this._navSegments}
                .currentRoute=${this.currentRoute}
                @click=${this._closeMenu}
              ></segmented-control>

              ${this.isAuthenticated ? html`
                <a class="site-header__calendar-toggle ${this.currentRoute.startsWith('/calendar') || this.currentRoute.startsWith('/quorum') ? 'site-header__calendar-toggle--active' : ''}"
                   href="/calendar" @click=${this._closeMenu}>Calendar</a>
              ` : nothing}
              ${this.isAuthenticated ? this._renderInternalDropdown() : nothing}

              <hr class="site-header__mobile-rule" />

              <a
                class="site-header__mobile-linkedin"
                href="https://www.linkedin.com/company/m-m-kelly/"
                target="_blank"
                rel="noopener noreferrer"
                @click=${this._closeMenu}
              >
                <i class="ph ph-arrow-up-right" aria-hidden="true"></i>
                <span>M&amp;M Kelly on LinkedIn</span>
              </a>
            </div>

            <a class="site-header__cta" href="/schedule" @click=${this._closeMenu}>
              <i class="ph-duotone ph-chat-centered-text" aria-hidden="true"></i>
              <span class="site-header__cta-label">Schedule a Conversation</span>
            </a>

            ${this.isAuthenticated ? html`
              <a class="site-header__auth-link" href="#" @click=${this._handleLogout}>
                <i class="ph ph-sign-out" aria-hidden="true"></i>
                <span>Sign out</span>
              </a>
            ` : html`
              <button class="site-header__auth-link" @click=${this._handleLogin}>
                <i class="ph ph-sign-in" aria-hidden="true"></i>
                <span>Sign in</span>
              </button>
            `}
          </div>
        </nav>
      </header>
    `;
  }

  private _renderInternalDropdown() {
    return html`
      <div class="site-header__internal">
        <button
          class="site-header__internal-toggle ${this._isInternalRoute ? 'site-header__internal-toggle--active' : ''}"
          aria-expanded="${this._internalOpen}"
          aria-haspopup="true"
          @click=${this._toggleInternal}
        >
          <span>Internal</span>
          <i class="ph ph-caret-down site-header__internal-caret ${this._internalOpen ? 'site-header__internal-caret--open' : ''}" aria-hidden="true"></i>
        </button>
        <div class="site-header__internal-dropdown ${this._internalOpen ? 'site-header__internal-dropdown--open' : ''}">
          ${this._internalTopLinks.map(link => html`
            <a
              class="site-header__internal-link ${this.currentRoute === link.href || this.currentRoute.startsWith(link.href + '/') ? 'site-header__internal-link--active' : ''}"
              href="${link.href}"
              @click=${this._closeMenu}
            >${link.label}</a>
          `)}
        </div>
      </div>
    `;
  }
}
