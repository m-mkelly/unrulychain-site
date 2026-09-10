import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import GoTrue from 'gotrue-js';
import { updatePageMeta } from '../services/meta.service.js';
import { trackPageView, restoreConsent } from '../services/analytics.service.js';
import { setAnalyticsToken, clearAnalyticsToken } from '../services/content-analytics.service.js';
import { setGaToken, clearGaToken } from '../services/ga-analytics.service.js';
import { setCalendarToken, clearCalendarToken, setCalendarUserEmail } from '../services/calendar.service.js';
import { setWriterToken, clearWriterToken } from '../services/writer.service.js';
import { setProjectionsToken, clearProjectionsToken } from '../services/projections.service.js';

// Components
import './components/SiteHeader.js';
import './components/SiteBreadcrumb.js';
import './components/SiteFooter.js';
import './components/CookieConsent.js';

// Static pages — loaded upfront (common landing, auth gate, error)
import './pages/HomePage.js';
import './pages/GuidesLoginPage.js';
import './pages/NotFoundPage.js';

// All other pages loaded lazily via dynamic import() — see _routeImports

/** Minimal shape of a GoTrue user for auth checks; avoids importing the full GoTrue types. */
interface GoTrueUser {
  readonly email?: string;
  readonly logout?: () => Promise<void>;
}

/**
 * Root SPA shell: client-side router, auth gate for /guides/*, and scroll-triggered
 * section animations. All page views render inside this component.
 */
@customElement('app-shell')
export class AppShell extends LitElement {
  @state() private _route: string | null = null;
  @state() private _routeReady = true;
  @state() private _authState: 'loading' | 'authed' | 'denied' | 'unauthed' = 'loading';
  private _sectionObserver: IntersectionObserver | null = null;
  private _loadedRoutes = new Set<string>(['/', 'not-found']);

  /**
   * Returns true for routes that require authentication before module loading and rendering.
   * @param route
   */
  private _isGatedRoute(route: string): boolean {
    return route.startsWith('/guides') || route.startsWith('/analytics')
      || route.startsWith('/writer')
      || route === '/schedule/admin' || route === '/calendar/admin'
      || route === '/calendar' || route === '/quorum/caucus'
      || route === '/quorum/docket' || route === '/quorum/event'
      || route === '/quorum/window';
  }

  // Lazy route → dynamic import map. HomePage, GuidesLoginPage, NotFoundPage are static.
  private static _routeImports: Record<string, () => Promise<unknown>> = {
    '/founder':             () => import('./pages/FounderPage.js'),
    '/services':            () => import('./pages/ServicesPage.js'),
    '/life-sciences':       () => import('./pages/LifeSciencesPage.js'),
    '/ai-consulting':       () => import('./pages/AiConsultingPage.js'),
    '/contact':             () => import('./pages/ContactPage.js'),
    '/privacy':             () => import('./pages/PrivacyPage.js'),
    '/guides':              () => import('./pages/guides/GuidesIndexPage.js'),
    '/guides/brand':        () => import('./pages/guides/BrandPage.js'),
    '/guides/components':   () => import('./pages/guides/ComponentsPage.js'),
    '/guides/voice':        () => import('./pages/guides/VoiceGuidePage.js'),
    '/guides/seo':          () => import('./pages/guides/SeoGuidePage.js'),
    '/guides/architecture': () => import('./pages/guides/ArchitectureGuidePage.js'),
    '/guides/content':      () => import('./pages/guides/ContentGuidePage.js'),
    '/guides/agents':       () => import('./pages/guides/AgentsGuidePage.js'),
    '/guides/testing':       () => import('./pages/guides/TestingGuidePage.js'),
    '/guides/deployment':   () => import('./pages/guides/DeploymentGuidePage.js'),
    '/poll':                () => import('./pages/PollPage.js'),
    '/poll/admin':          () => import('./pages/PollAdminPage.js'),
    '/schedule':            () => import('./pages/SchedulePage.js'),
    '/schedule/admin':      () => import('./pages/ScheduleAdminPage.js'),
    '/calendar/admin':        () => import('./pages/CalendarPage.js'),
    '/calendar':              () => import('./pages/CalendarPage.js'),
    '/quorum/caucus':       () => import('./pages/CalendarPage.js'),
    '/quorum/docket':       () => import('./pages/CalendarPage.js'),
    '/quorum/event':        () => import('./pages/CalendarPage.js'),
    '/quorum/window':       () => import('./pages/CalendarPage.js'),
    '/analytics':           () => import('./pages/analytics/AnalyticsSummaryPage.js'),
    '/analytics/linkedin':  () => import('./pages/analytics/AnalyticsOverviewPage.js'),
    '/analytics/linkedin/themes':    () => import('./pages/analytics/ThemePerformancePage.js'),
    '/analytics/linkedin/series':    () => import('./pages/analytics/SeriesComparisonPage.js'),
    '/analytics/linkedin/styles':    () => import('./pages/analytics/StyleCorrelationPage.js'),
    '/analytics/linkedin/formats':   () => import('./pages/analytics/FormatPerformancePage.js'),
    '/analytics/linkedin/trends':    () => import('./pages/analytics/TemporalAnalysisPage.js'),
    '/analytics/linkedin/personal-vs-company': () => import('./pages/analytics/PersonalVsCompanyPage.js'),
    '/analytics/linkedin/audience':  () => import('./pages/analytics/DemographicsPage.js'),
    '/analytics/linkedin/engagement': () => import('./pages/analytics/EngagementQualityPage.js'),
    '/analytics/linkedin/post':      () => import('./pages/analytics/PostDetailPage.js'),
    '/analytics/linkedin/content':   () => import('./pages/analytics/ContentListPage.js'),
    '/analytics/website':   () => import('./pages/analytics/GaOverviewPage.js'),
    '/analytics/projections': () => import('./pages/analytics/ProjectionsPage.js'),
    '/analytics/projections/roi': () => import('./pages/analytics/ProjectionsPage.js'),
    '/analytics/projections/risk': () => import('./pages/analytics/ProjectionsPage.js'),
    '/analytics/projections/stream': () => import('./pages/analytics/StreamEditPage.js'),
    '/writer':              () => import('./pages/writer/WriterDashboardPage.js'),
    '/writer/edit':         () => import('./pages/writer/WriterEditorPage.js'),
    '/writer/report':       () => import('./pages/writer/WriterReportPage.js'),
    '/writer/stub':         () => import('./pages/writer/WriterEditorPage.js'),
    '/writer/promote':      () => import('./pages/writer/WriterStubPromotionPage.js'),
    '/writer/cc-handoff':   () => import('./pages/writer/WriterCCHandoffPage.js'),
  };
  // Netlify Identity client. setCookie is false because auth state is held in-memory
  // for the SPA /guides/* gate only — no need to persist tokens across sessions.
  private _auth = new GoTrue({
    APIUrl: `${window.location.origin}/.netlify/identity`,
    setCookie: false,
  });

  createRenderRoot() {
    return this;
  }

  /**
   * Sets initial route, wires up navigation listeners, and resolves auth state
   * (dev bypass, existing session restore, or OAuth hash exchange).
   *
   * Auth must resolve before _loadRoute is called. If _loadRoute runs while
   * _authState is still 'loading', it bails on /guides/* routes (line 173).
   * The updated() recovery path cannot compensate because _authState and _route
   * land in separate Lit update cycles when _route is set via a .then() microtask.
   */
  connectedCallback() {
    // Wipe prerendered static content so Lit's light-DOM renderer starts from
    // an empty container. Without this, Lit appends its marker comment after
    // existing children and produces duplicate elements on hydration.
    this.innerHTML = '';
    super.connectedCallback();
    restoreConsent();

    // A/B variant toggle: ?variant=b activates enhanced design styles
    const variant = new URLSearchParams(window.location.search).get('variant');
    if (variant) document.body.dataset.variant = variant;

    window.addEventListener('popstate', this._handleRoute);
    document.addEventListener('click', this._handleClick);

    // Resolve auth before loading the initial route so _loadRoute does not
    // bail on /guides/* routes due to _authState being 'loading'.
    if (!import.meta.env.PROD) {
      // Local dev — skip auth, allow all /guides/* access immediately
      this._authState = 'authed';
    } else if (window.location.hash.includes('access_token')) {
      // Fresh OAuth hash always takes priority over a stale localStorage session.
      // Without this order, a denied user's stale gotrue.user short-circuits
      // the hash check and the new tokens are never processed.
      // Async: _authState remains 'loading' until the exchange resolves.
      // The updated() handler loads the deferred guide module once auth confirms.
      this._processOAuthHash();
    } else {
      const existing = this._auth.currentUser();
      this._authState = existing ? this._checkUser(existing) : 'unauthed';
    }

    const initialRoute = this._currentRoute();
    this._loadRoute(initialRoute).then(() => {
      this._route = initialRoute;
    });
  }

  /** Removes navigation listeners and scroll-animation observers on disconnect. */
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('popstate', this._handleRoute);
    document.removeEventListener('click', this._handleClick);
    this._sectionObserver?.disconnect();
  }

  /**
   * Parses OAuth tokens from the URL hash after a Google login redirect,
   * strips the hash to clean the URL, then exchanges tokens for a persisted
   * GoTrue session. Falls back to 'unauthed' if the exchange fails.
   */
  private _processOAuthHash() {
    const params: Record<string, string> = {};
    window.location.hash.substring(1).split('&').forEach(pair => {
      const [k, v] = pair.split('=');
      if (k) params[k] = decodeURIComponent(v || '');
    });
    history.replaceState(null, '', window.location.pathname);
    this._auth.createUser({
      access_token: params['access_token'],
      refresh_token: params['refresh_token'],
      expires_in: Number(params['expires_in']),
      token_type: 'bearer',
      expires_at: 0,
    }, true)
      .then(user => { this._authState = this._checkUser(user); })
      .catch(() => { this._authState = 'unauthed'; });
  }

  /**
   * Validates a GoTrue user by email domain; logs out and denies non-@mandmkelly.com users.
   * @param user - The GoTrue user object to validate, or null if no user session exists.
   */
  private _checkUser(user: GoTrueUser | null): 'authed' | 'denied' | 'unauthed' {
    if (!user) return 'unauthed';
    const email: string = user.email ?? '';
    if (email.endsWith('@mandmkelly.com')) {
      // Provide the GoTrue JWT to the analytics service for API calls
      const userData = user as unknown as Record<string, Record<string, string>>;
      const token = userData.token_data?.access_token ?? userData.token?.access_token;
      if (token) setAnalyticsToken(token);
      if (token) setGaToken(token);
      if (token) setProjectionsToken(token);
      if (token) setCalendarToken(token);
      if (token) setWriterToken(token);
      setCalendarUserEmail(email);
      return 'authed';
    }
    clearAnalyticsToken();
    clearGaToken();
    clearProjectionsToken();
    clearCalendarToken();
    clearWriterToken();
    // Clear session synchronously so a stale denied user never blocks
    // the next OAuth attempt. The async logout() alone is unreliable
    // because the page may redirect before it completes.
    localStorage.removeItem('gotrue.user');
    user.logout?.().catch(() => {});
    return 'denied';
  }

  private _handleRoute = () => {
    const route = this._currentRoute();
    this._loadRoute(route).then(() => {
      this._route = route;
    });
  };

  /** Logs out the current user, clears auth state, and navigates to home. */
  private _handleLogout = () => {
    clearAnalyticsToken();
    clearGaToken();
    clearProjectionsToken();
    clearCalendarToken();
    clearWriterToken();
    const currentUser = this._auth.currentUser();
    currentUser?.logout?.().catch(() => {});
    this._authState = 'unauthed';
    window.history.pushState({}, '', '/');
    this._handleRoute();
  };

  /**
   * Lazily imports the page module for a route on first visit and records it so
   * subsequent navigations to the same route skip the dynamic import entirely.
   * _routeReady gates rendering to prevent flashing a partially-registered element.
   * @param route - The pathname to load (e.g. '/services', '/guides/brand').
   */
  private async _loadRoute(route: string): Promise<void> {
    if (this._loadedRoutes.has(route)) return;
    // Don't fetch guide modules until auth confirms access.
    // The import is deferred to updated() when _authState becomes 'authed'.
    if (this._isGatedRoute(route) && this._authState !== 'authed') return;
    const loader = AppShell._routeImports[route]
      ?? (route.startsWith('/analytics/projections/stream/')
        ? () => import('./pages/analytics/StreamEditPage.js')
        : undefined)
      ?? (route.startsWith('/quorum/') && !['admin', 'caucus', 'docket', 'event', 'window'].includes(route.split('/')[2] ?? '')
        ? () => import('./pages/QuorumPage.js')
        : undefined)
      ?? (route.startsWith('/writer/edit/')
        ? () => import('./pages/writer/WriterEditorPage.js')
        : undefined)
      ?? (route.startsWith('/writer/report/')
        ? () => import('./pages/writer/WriterReportPage.js')
        : undefined)
      ?? (route.startsWith('/writer/stub/')
        ? () => import('./pages/writer/WriterEditorPage.js')
        : undefined)
      ?? (route.startsWith('/writer/promote/')
        ? () => import('./pages/writer/WriterStubPromotionPage.js')
        : undefined)
      ?? (route.startsWith('/writer/cc-handoff/')
        ? () => import('./pages/writer/WriterCCHandoffPage.js')
        : undefined);
    if (loader) {
      this._routeReady = false;
      await loader();
      this._loadedRoutes.add(route);
      this._routeReady = true;
    }
  }

  /** Global click interceptor for SPA navigation. Catches clicks on internal <a> links
   *  and routes them through the History API instead of triggering a full page reload.
   *  Fragment-only and external links are ignored so the browser handles them normally.
   *  @param e The click event from the document. */
  private _handleClick = (e: MouseEvent) => {
    const target = (e.target as Element).closest('a');
    if (!target) return;

    const href = target.getAttribute('href');
    if (!href) return;

    // Fragment-only links (e.g. #contact, #main-content) — let browser handle scroll
    if (href.startsWith('#')) return;

    // External links — let browser handle
    if (target.hostname !== location.hostname) return;

    // Netlify function/identity paths — let browser handle (full navigation required)
    if (href.startsWith('/.netlify/')) return;

    // Internal pathname navigation — intercept
    e.preventDefault();
    if (href !== location.pathname) {
      history.pushState(null, '', href);
      const route = this._currentRoute();
      this._loadRoute(route).then(() => {
        this._route = route;
      });
    }
  };

  /**
   * Runs after every Lit render when _route or _authState changes. Handles two jobs:
   * 1. On route change: updates <title>/meta tags, scrolls to top, and attaches
   *    IntersectionObservers so page sections animate in as the user scrolls.
   * 2. On auth change (to 'authed'): attaches the same observers for guide pages
   *    that appear after login without a route change.
   * The double-requestAnimationFrame pattern waits two paint frames so the new
   * page DOM is fully laid out before observers try to find sections.
   * @param changedProperties - Map of reactive property names to their previous values.
   */
  protected updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('_authState') && this._authState === 'authed') {
      // Load deferred module now that auth is confirmed
      if (this._route && this._isGatedRoute(this._route)) {
        this._loadRoute(this._route).then(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              this._observeSections();
            });
          });
        });
      } else {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            this._observeSections();
          });
        });
      }
    }

    if (changedProperties.has('_route') && this._route !== null) {
      // Belt-and-suspenders: if this route needs a guide module that wasn't loaded
      // (e.g., OAuth async path where auth resolves after _route was already set),
      // kick off the import now and re-observe sections after it completes.
      if (this._isGatedRoute(this._route) && this._authState === 'authed'
          && !this._loadedRoutes.has(this._route)) {
        this._loadRoute(this._route).then(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              this._observeSections();
            });
          });
        });
      }

      updatePageMeta(this._route);
      trackPageView(this._route);

      // Aggressive scroll reset: targets window, documentElement, and body because
      // browsers differ in which scrolling element they honor. Multiple frames ensure
      // the new page DOM is laid out before the final reset.
      const resetScroll = () => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTo(0, 0);
        document.body.scrollTo(0, 0);
      };

      resetScroll();
      requestAnimationFrame(() => {
        resetScroll();
        requestAnimationFrame(() => {
          resetScroll();
          // Move focus to main content so screen readers announce the new page
          // and keyboard users start at the top of the content area.
          const main = document.querySelector<HTMLElement>('#main-content');
          if (main) {
            if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
            main.focus({ preventScroll: true });
          }
          this._observeSections();
        });
      });
    }
  }

  // Per-section stagger increment (seconds) for scroll-entrance animation
  private static readonly _STAGGER_DELAY_S = 0.08;

  /**
   * Attaches an IntersectionObserver to every section, article, and .animate-on-scroll
   * element inside <main>. Each element gets a staggered --section-delay and the
   * is-visible class on first intersection, then is immediately unobserved (one-shot).
   * Elements with --mosaic-delay already set (by MosaicGrid) keep their own timing.
   * The -50px bottom rootMargin ensures elements near the viewport edge are visible
   * before they fully enter, giving the entrance animation a natural feel.
   */
  private _observeSections() {
    this._sectionObserver?.disconnect();
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section, main section article, main section .animate-on-scroll'));
    let index = 0;

    this._sectionObserver = new IntersectionObserver(
      (entries) => {
        entries
          .filter(e => e.isIntersecting)
          .forEach(entry => {
            const el = entry.target as HTMLElement;
            if (!el.style.getPropertyValue('--mosaic-delay')) {
              el.style.setProperty('--section-delay', `${index * AppShell._STAGGER_DELAY_S}s`);
              index++;
            }
            el.classList.add('is-visible');
            this._sectionObserver?.unobserve(el);
          });
      },
      { threshold: 0, rootMargin: '0px 0px -50px 0px' }
    );

    sections.forEach(s => this._sectionObserver!.observe(s));
  }


  private _currentRoute(): string {
    const path = location.pathname;
    // Strip trailing slash so /services/ matches the /services route.
    // Keep root "/" as-is.
    if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
    if (path.startsWith('/')) return path;
    return '/';
  }

  render() {
    return html`
      <a class="skip-to-content" href="#main-content">Skip to main content</a>
      <site-header .currentRoute=${this._route ?? ''} .isAuthenticated=${this._authState === 'authed'} .loginUrl=${`${this._auth.loginExternalUrl('google')}&prompt=select_account`} .onLogout=${this._handleLogout}></site-header>
      <site-breadcrumb .currentRoute=${this._route ?? ''}></site-breadcrumb>
      ${this._renderPage()}
      <site-footer></site-footer>
      <cookie-consent></cookie-consent>
    `;
  }

  private _renderPage() {
    // Wait for initial route resolution before rendering any page content
    if (this._route === null) return html``;
    // Wait for lazy module to load before rendering its element
    if (!this._routeReady) return html``;

    // Gate authenticated routes behind login
    if (this._isGatedRoute(this._route)) {
      if (this._authState === 'loading') return html``;
      if (this._authState !== 'authed') return html`<guides-login-page ?access-denied=${this._authState === 'denied'} .loginUrl=${`${this._auth.loginExternalUrl('google')}&prompt=select_account`}></guides-login-page>`;
    }

    switch (this._route) {
      case '/founder':
        return html`<founder-page></founder-page>`;
      case '/services':
        return html`<services-page></services-page>`;
      case '/life-sciences':
        return html`<life-sciences-page></life-sciences-page>`;
      case '/ai-consulting':
        return html`<ai-consulting-page></ai-consulting-page>`;
      case '/guides/brand':
        return html`<brand-page></brand-page>`;
      case '/guides/components':
        return html`<components-page></components-page>`;
      case '/guides':
        return html`<guides-index-page></guides-index-page>`;
      case '/guides/voice':
        return html`<voice-guide-page></voice-guide-page>`;
      case '/guides/seo':
        return html`<seo-guide-page></seo-guide-page>`;
      case '/guides/architecture':
        return html`<architecture-guide-page></architecture-guide-page>`;
      case '/guides/content':
        return html`<content-guide-page></content-guide-page>`;
      case '/guides/agents':
        return html`<agents-guide-page></agents-guide-page>`;
      case '/guides/testing':
        return html`<testing-guide-page></testing-guide-page>`;
      case '/guides/deployment':
        return html`<deployment-guide-page></deployment-guide-page>`;
      case '/privacy':
        return html`<privacy-page></privacy-page>`;
      case '/contact':
        return html`<contact-page></contact-page>`;
      case '/poll':
        return html`<poll-page></poll-page>`;
      case '/poll/admin':
        return html`<poll-admin-page></poll-admin-page>`;
      case '/schedule':
        return html`<schedule-page></schedule-page>`;
      case '/schedule/admin':
        return html`<schedule-admin-page></schedule-admin-page>`;
      case '/calendar/admin':
        return html`<calendar-page></calendar-page>`;
      case '/calendar':
        return html`<calendar-page></calendar-page>`;
      case '/quorum/caucus':
        return html`<calendar-page></calendar-page>`;
      case '/quorum/docket':
        return html`<calendar-page></calendar-page>`;
      case '/quorum/event':
        return html`<calendar-page></calendar-page>`;
      case '/quorum/window':
        return html`<calendar-page></calendar-page>`;
      case '/analytics':
        return html`<analytics-summary-page></analytics-summary-page>`;
      case '/analytics/linkedin':
        return html`<analytics-overview-page></analytics-overview-page>`;
      case '/analytics/linkedin/themes':
        return html`<theme-performance-page></theme-performance-page>`;
      case '/analytics/linkedin/series':
        return html`<series-comparison-page></series-comparison-page>`;
      case '/analytics/linkedin/styles':
        return html`<style-correlation-page></style-correlation-page>`;
      case '/analytics/linkedin/formats':
        return html`<format-performance-page></format-performance-page>`;
      case '/analytics/linkedin/trends':
        return html`<temporal-analysis-page></temporal-analysis-page>`;
      case '/analytics/linkedin/personal-vs-company':
        return html`<personal-vs-company-page></personal-vs-company-page>`;
      case '/analytics/linkedin/audience':
        return html`<demographics-page></demographics-page>`;
      case '/analytics/linkedin/engagement':
        return html`<engagement-quality-page></engagement-quality-page>`;
      case '/analytics/linkedin/post':
        return html`<post-detail-page></post-detail-page>`;
      case '/analytics/linkedin/content':
        return html`<content-list-page></content-list-page>`;
      case '/analytics/website':
        return html`<ga-overview-page></ga-overview-page>`;
      case '/analytics/projections':
        return html`<projections-page></projections-page>`;
      case '/analytics/projections/roi':
        return html`<projections-page></projections-page>`;
      case '/analytics/projections/risk':
        return html`<projections-page></projections-page>`;
      case '/writer':
        return html`<writer-dashboard-page></writer-dashboard-page>`;
      case '/':
        return html`<home-page></home-page>`;
      default:
        // Dynamic route: /analytics/projections/stream/:id (stream edit)
        if (this._route.startsWith('/analytics/projections/stream/')) {
          return html`<stream-edit-page></stream-edit-page>`;
        }
                // Dynamic route: /quorum/:shareToken (participant view)
        if (this._route.startsWith('/quorum/') && !['admin', 'caucus', 'docket', 'event'].includes(this._route.split('/')[2] ?? '')) {
          return html`<quorum-page></quorum-page>`;
        }
        // Dynamic routes: /writer/edit/:slug, /writer/report/:slug/:stage/:runId, /writer/stub/:slug
        if (this._route.startsWith('/writer/edit/')) {
          return html`<writer-editor-page></writer-editor-page>`;
        }
        if (this._route.startsWith('/writer/report/')) {
          return html`<writer-report-page></writer-report-page>`;
        }
        if (this._route.startsWith('/writer/stub/')) {
          return html`<writer-editor-page></writer-editor-page>`;
        }
        if (this._route.startsWith('/writer/promote/')) {
          return html`<writer-stub-promotion-page></writer-stub-promotion-page>`;
        }
        if (this._route.startsWith('/writer/cc-handoff/')) {
          return html`<writer-cc-handoff-page></writer-cc-handoff-page>`;
        }
        return html`<not-found-page></not-found-page>`;
    }
  }
}
