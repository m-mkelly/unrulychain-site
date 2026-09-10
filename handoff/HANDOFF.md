# Unruly Chain Website: Handoff to ChatGPT

**Date:** 2026-09-10
**From:** Claude (MMK Website project)
**To:** ChatGPT (design implementation authority)
**Purpose:** Everything needed to build unrulychain.com correctly.

---

## 1. File Manifest

### M&M Kelly Website Source (mmk-source/)

Production commit: `f948c59456fa28ad0285f514118f961030fb996f` on `main` of `m-mkelly/mmk-website`.

The site is a Vite + TypeScript + Lit web components SPA. These files define the shell: navigation, header, footer, responsive behavior, typography, color system, layout patterns.

| File | What it is |
|------|-----------|
| `AppShell.ts` | Root component. Router, route definitions, page loading, mobile nav state, scroll behavior, meta/SEO, overlay management |
| `components/SiteHeader.ts` | Header component. Logo, navigation links, mobile hamburger, active-route highlighting |
| `components/SiteFooter.ts` | Footer component. Links, copyright, layout |
| `components/PageHero.ts` | Hero section pattern used across pages |
| `components/EditorialSection.ts` | Reusable editorial content block |
| `components/CtaSection.ts` | Call-to-action section pattern |
| `components/CardGridSection.ts` | Card grid layout pattern |
| `pages/HomePage.ts` | Homepage implementation |
| `pages/ServicesPage.ts` | Services page (representative interior page) |
| `pages/FounderPage.ts` | Founder/about page |
| `styles/theme.css` | **The design system.** All CSS custom properties (colors, typography, spacing, breakpoints). This is the source of truth for the visual language |
| `styles/global.css` | Global resets, base typography, body styles |
| `styles/components.css` | Component style imports |
| `styles/components/site-header.css` | Header styles including mobile nav, hamburger, transitions |
| `styles/components/site-footer.css` | Footer styles |
| `styles/components/page-hero.css` | Hero section styles |
| `styles/components/editorial-section.css` | Editorial section styles |
| `styles/components/cta-section.css` | CTA styles |
| `styles/components/card-grid-section.css` | Card grid styles |
| `styles/pages/home-page.css` | Homepage-specific styles |
| `styles/pages/services-page.css` | Services page styles |

**Key notes for ChatGPT:**
- `theme.css` defines the three HSL color axes (green H=130, warm H=40, charcoal H=220), all spacing tokens, typography scale, and breakpoints
- The site uses zero border-radius everywhere
- No em dashes in any visible copy
- No grey; only charcoal, warm white, or green
- Font floor is 0.9375rem
- The Lit component patterns show how navigation, routing, and responsive behavior are structured, but Unruly Chain will be plain HTML/CSS/JS, not Lit

### M&M Kelly Screenshots (screenshots/)

Captured from production mandmkelly.com, September 10, 2026.

| File | View |
|------|------|
| `mmk-desktop-home.png` | Homepage, 1440px wide, full page |
| `mmk-desktop-services.png` | Services page, 1440px wide, full page |
| `mmk-mobile-home.png` | Homepage, 390px wide, full page |
| `mmk-mobile-services.png` | Services page, 390px wide, full page |
| `mmk-mobile-nav-open.png` | Mobile menu open state |

### Unruly Chain Visual References (visual-references/)

These are cover art and logo concepts from Picard. The 1950s science-magazine mockups, the "Jackpot" mockup, the Popular Science/Scientific American references, and the dark-green color study variants exist only in the previous ChatGPT conversation and could not be retrieved as binary images. They are NOT in this package.

| File | What it is |
|------|-----------|
| `cover-concepts-dual-20260905.png` | Centrifuge cover concept, dual layout |
| `cover-concepts-v1-20260905.png` | Centrifuge cover concept v1 |
| `cover-concepts-v2-20260905.png` | Centrifuge cover concept v2 |
| `cover-concepts-v3-20260906.png` | Centrifuge cover concept v3 |
| `unruly-chain-logo-concept-20260906.png` | Logo concept: simplified fist/chain, mid-century woodcut style |

**NOT RETRIEVABLE (exist only in previous ChatGPT conversation):**
- The two 1950s science-magazine homepage mockups
- The second mockup Mitch called "Jackpot"
- The dark-green color study variants
- The first dark-green-support variant Mitch preferred
- The uploaded Popular Science reference images
- The uploaded Scientific American reference images

ChatGPT will need to recover these from its own conversation history or Mitch will need to re-upload them.

### Current Rejected Implementation (current-implementation/)

Branch: `feature/chatgpt-initial-build` in `m-mkelly/unrulychain-site`
Commit: `37b0f692a845f896821677f09790f476a87506fd`
Preview: https://e41fe795.unrulychain-site.pages.dev/

This is rejected as a design. Supplied only for ChatGPT to salvage technical work if useful.

| File | Size |
|------|------|
| `index.html` | 3,980 bytes |
| `centrifuge.html` | 4,398 bytes |
| `about.html` | 2,125 bytes |
| `author.html` | 1,853 bytes |
| `press.html` | 1,911 bytes |
| `privacy.html` | 643 bytes |
| `assets/styles.css` | 8,868 bytes |
| `assets/site.js` | 289 bytes |
| `assets/hero.svg` | 1,112 bytes |
| `assets/last-old-man.svg` | 656 bytes |

### Content Source Documents (docs/)

| File | What it is | Status |
|------|-----------|--------|
| `unruly-chain-imprint.md` | Imprint structure, brand, logo requirements, cover design, website infrastructure | APPROVED (KB canonical) |
| `founder-background.md` | Mitch Kelly career, advisory practice, ventures | APPROVED (KB canonical) |
| `publication-projects.md` | Book project details, publishing paths, production status | APPROVED (KB canonical) |

---

## 2. Repository and Commit Information

| Item | Value |
|------|-------|
| M&M Kelly website repo | `m-mkelly/mmk-website`, branch `main`, commit `f948c59` |
| Unruly Chain site repo | `m-mkelly/unrulychain-site`, branch `main` |
| Current rejected build branch | `feature/chatgpt-initial-build`, commit `37b0f69` |

---

## 3. Production URLs

| URL | What |
|-----|------|
| https://mandmkelly.com | M&M Kelly production (the shell reference) |
| https://unrulychain.com | Unruly Chain production (currently placeholder) |
| https://unrulychain-site.pages.dev | Cloudflare Pages default |
| https://e41fe795.unrulychain-site.pages.dev | Preview of rejected build |
| https://mitchkelly.substack.com | Newsletter (Substack, "Unreasonable Man") |

---

## 4. Approved vs Unapproved Content

### APPROVED CONTENT

- **Imprint name:** UNRULY CHAIN (never "Unruly Chain Press" in consumer-facing brand)
- **Imprint description:** from `unruly-chain-imprint.md` "What it is" and "Why Unruly Chain" sections
- **Book 1 title:** Centrifuge: Inside the Emerging AI Organization
- **Book 1 author:** Mitch Kelly
- **Book 1 publisher:** Unruly Chain
- **Book 1 status:** Forthcoming
- **Book 1 tagline:** "AI does not merely make organizations faster. It exposes what they actually are." (from book outline/thesis)
- **Book 2 title:** Last Old Man (working title)
- **Book 2 status:** Planned, no description approved
- **Substack newsletter:** mitchkelly.substack.com, publication name "Unreasonable Man"
- **Cross-link:** mandmkelly.com for author/advisory context
- **Privacy:** No approved privacy copy exists yet
- **Contact for press:** mitch@mandmkelly.com (from KB)

### PLACEHOLDER / UNAPPROVED CONTENT

- No approved jacket copy or extended Centrifuge description beyond the tagline
- No approved author bio specifically written for unrulychain.com (founder-background.md is available as source material but was written for a different audience)
- No Last Old Man description
- No retailer purchase links (book is not published)
- No approved press kit
- No social media profile links specifically designated for this site
- No approved privacy/legal copy

**Do not manufacture missing copy.** Use clear "forthcoming" or "to be announced" states.

---

## 5. Outstanding Dependencies

| Dependency | Status | Impact |
|-----------|--------|--------|
| Dallas Peters Centrifuge cover | Contracted, not yet delivered | Site must accept finished cover as replaceable content. Do not design around a fake cover |
| Final Unruly Chain logo | In concept stage | Do not structure site geometry around assumed logo. Use wordmark as placeholder |
| 1950s science-magazine mockups from prior ChatGPT session | Not retrievable by Claude | ChatGPT needs to recover from its conversation history, or Mitch re-uploads |
| Dark-green color study variants | Not retrievable by Claude | Same |
| Popular Science / Scientific American references | Not retrievable by Claude | Same |
| Privacy/legal copy | Not yet written | Placeholder page acceptable |

---

## 6. What ChatGPT Needs to Know

### Binding architecture
Unruly Chain uses the M&M Kelly website as its functional shell. Preserve: navigation model, page-flow logic, interaction patterns, responsive behavior, spatial discipline, motion/polish quality. Change the visual language, not the underlying web system.

### Visual direction (approved synthesis)
Scientific American discipline + Popular Science confidence. Cream/aged-paper base, black primary typography, restrained muted red, very dark green as tertiary support only. Bold condensed display type, serif editorial body. Hard grid, strong section bands, restrained halftone/print texture. No rounded SaaS cards, no glassmorphism, no generic AI imagery.

### Color hierarchy
- Primary: cream, black/near-black, muted red
- Tertiary: dark green (~#183128, ~#12261F) for footer, newsletter band, support panels, background/watermark typography, illustration fields, small accents
- Do NOT replace black headline system with green
- Do NOT make red and green competing headline colors

### Technical constraints
- Plain HTML, CSS, minimal JS
- No framework, no build step, no external runtime dependency
- Self-contained static bundle with relative paths
- Bundled fonts where practical
- IPFS-compatible
- Cloudflare Pages deployment (auto-deploy on push to main)

### Site structure
Homepage, /centrifuge (book page), Author, About/The Imprint, Press/Media, Privacy, Newsletter (under Imprint section on homepage), Footer. Future books reuse the book-page template.

### Workflow for iterations
1. ChatGPT produces updated files
2. Mitch uploads to Claude
3. Claude pushes to the branch, Cloudflare Pages builds preview
4. Mitch reviews at preview URL
5. Repeat until approved
6. Claude merges to main (requires safety word)

---

## 7. Technical/Deployment State

| Property | Value |
|----------|-------|
| Hosting | Cloudflare Pages, free tier, unmetered bandwidth |
| Cloudflare Pages project | unrulychain-site (legacy Pages workflow) |
| GitHub repo | m-mkelly/unrulychain-site |
| Production branch | main |
| Deploy trigger | Auto-deploy on push to main |
| Domain | unrulychain.com (Squarespace registrar, Cloudflare DNS) |
| DNS nameservers | angela.ns.cloudflare.com, cash.ns.cloudflare.com |
| Cloudflare account | mitch.fernandez.kelly@gmail.com |
| Preview deployments | Working (commit-hash URLs) |
| Redirects configured | None |
| /centrifuge routing | Currently `centrifuge.html` flat file, not a directory route or rewrite |
| IPFS compatibility | Bundle is self-contained, relative paths, no external dependencies. Currently IPFS-ready |
| Fonts | None bundled yet. The rejected implementation uses system fonts only |
