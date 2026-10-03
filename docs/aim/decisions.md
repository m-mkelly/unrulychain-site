---
type: aim-decisions
app: unrulychain-site
updated: 2026-09-26
---

# Unruly Chain Site: Decisions

## DEC-001: Second title is Last Old Man (2026-09-10)

**Decision:** The second planned title under the Unruly Chain imprint is *Last Old Man*, replacing the previously listed *Citizen Scientist*.

**Rationale:** Mitch direction, confirmed in session handoff 2026-09-10.

**Impact:** Imprint KB (`unruly-chain-imprint.md`) updated. Aim identity domain records *Last Old Man* as the second title.

## DEC-002: ChatGPT documents are context, not aim sources (2026-09-10)

**Decision:** ChatGPT-produced prose documents describing the project are treated as context only. Aim triples must trace to Mitch's KB documents or Mitch's explicit statements.

**Rationale:** Previous session encoded ChatGPT interpretations and framings into aim triples as if they were Mitch's decisions, producing a contaminated aim that had to be purged.

**Impact:** Every triple in this aim cites either `unruly-chain-imprint.md`, `infrastructure-handoff`, `repo:main`, or explicit Mitch direction.

## DEC-003: No PREDICT lifecycle for this site (2026-09-10)

**Decision:** The unrulychain-site build does not follow the PREDICT lifecycle.

**Rationale:** Infrastructure handoff explicitly scoped this out. The site is a simple static HTML/CSS/JS build with ChatGPT as the design authority. The aim provides structural memory without the full lifecycle overhead.

**Impact:** No Premise, Requirements, or Engineering documents will be produced. No Asana project directed.

## DEC-004: Author bio approved (2026-09-10)

**Decision:** Third-person factual bio, ~155 words. Front-loads career breadth. No memoir narrative, no inferred psychology. "Based in New England" added per Mitch. M&M Kelly mentioned as current firm (appropriate on author page only).

**Rationale:** ChatGPT rejected the original draft for manufacturing motives and interpreting Mitch's life. Redraft selects verifiable facts from KB documents only.

## DEC-005: Imprint body copy approved (2026-09-10)

**Decision:** Two sentences plus tagline. "Unruly Chain is an independent nonfiction publishing imprint. The catalog is not organized around a single subject. It is organized around a kind of question: the ones that cut across disciplines and do not resolve into comfortable answers."

**Rationale:** Known institutional facts are thin. Short truthful copy preferred over manufactured philosophy.

## DEC-006: Privacy policy includes analytics disclosure (2026-09-10)

**Decision:** Policy acknowledges analytics cookies without naming the vendor. Original draft falsely claimed no analytics.

**Rationale:** GA4 will be installed. The policy must match actual site behavior.

## DEC-007: "Progress" removed from homepage red panel (2026-09-10)

**Decision:** Panel shows "Books / Ideas / People" only. No replacement word added.

**Rationale:** Mitch did not approve "Progress."

## DEC-008: Resource cards use no disclosure elements (2026-09-10)

**Decision:** Centrifuge resource cards show heading, availability label, and description directly. No `<details>` elements.

**Rationale:** Initial disclosure restructuring created nested `<details>` regression. For a forthcoming book with no actual resources, disclosure adds no value.

## DEC-009: Breakpoints at 1200px, 1050px, 800px (2026-09-10)

**Decision:** Three responsive breakpoints. 1200px switches hero grid from 3 to 2 columns. 1050px adjusts imprint, newsletter, and secondary grids. 800px switches to mobile stacked layout.

**Rationale:** Original 1050px/760px breakpoints caused hero title collision at intermediate widths and red panel overflow at 768px.

## DEC-010: Cover-stage overflow hidden (2026-09-10)

**Decision:** `.cover-stage{overflow:hidden}` clips the `::before` illustration to its grid column.

**Rationale:** The `::before` had `left:-12%; width:118%`, bleeding the illustration into the title column. Three rounds of font/column sizing failed to fix it because the problem was visual overflow, not layout math.

## DEC-011: Temporary favicon from UC monogram (2026-09-10)

**Decision:** Cropped UC monogram from the Unruly Chain Press logo serves as favicon until Dallas Peters delivers final cover designs.

## DEC-012: Subscribe uses Cloudflare KV with persistent aria-live regions (2026-09-10)

**Decision:** Email-only subscribe form posts to Cloudflare Pages Function storing in KV namespace `unrulychain-subscribers`. Frontend uses a persistent `<div aria-live="polite" role="status">` updated by JS.

**Rationale:** Owned email capture preferred over Substack dependency. Persistent live region is the correct ARIA pattern for dynamic status messages.

## DEC-013: GA4 installed (2026-09-14)

**Decision:** Google Analytics 4 installed via assets/site.js (shared source, every page). Measurement ID G-D4FLE07ZYS, property 554102515, stream 15776120947. Consent mode v2: analytics_storage granted per privacy policy disclosure, ad_storage/ad_user_data/ad_personalization denied.

**Rationale:** Analytics needed for publication launch tracking. Privacy policy already disclosed analytics use (DEC-006). Subscribe form uses preventDefault/fetch, preventing enhanced measurement from capturing email values.

**Impact:** Commits 335f512, a0a570c, fe067ed. Asana task 1218346607052092 closed.

## DEC-014: Substack link removed from all footers (2026-09-14)

**Decision:** Substack link (mitchkelly.substack.com) removed from footer Connect section on all 7 pages. Present only in the Mitch Kelly author bio on author.html.

**Rationale:** Mitch direction. Footer is site-wide imprint branding; Substack is an author-level link. Placement distinction is meaningful.

**Impact:** Commits 335f512, a0a570c, fe067ed.

## DEC-015: Newsletter branding changed to Unreasonable Scientist (2026-09-14)

**Decision:** Newsletter sections across all pages rebranded from Substack to "Unreasonable Scientist." Author bio link changed from "Newsletter on Substack" (mitchkelly.substack.com) to "Unreasonable Scientist" (www.unreasonablescientist.com).

**Rationale:** Unreasonable Scientist is the public-facing essay and newsletter brand. Custom domain replaces Substack URL.

**Impact:** Commits a8b87ea, 5feb982, 160e539, e2bdede. All newsletter section-tag elements updated. Author bio link URL and label updated.

## DEC-016: Centrifuge landing page reworked for publication (2026-09-14)

**Decision:** Centrifuge book page updated from generic "forthcoming" treatment to concrete September 2026 publication state.

**Rationale:** Book nearing publication. Page needed to reflect actual timeline.

**Impact:** Commit 8713df7. centrifuge/index.html rewritten.

## DEC-017: Centrifuge social preview metadata added (2026-09-14)

**Decision:** Canonical URL and Open Graph metadata (og:title, og:description, og:image, og:url, twitter:card) added to centrifuge/index.html.

**Rationale:** Social sharing of the book page should produce a branded preview card.

**Impact:** Commit d15bcc7.

## DEC-018: David E. Norman author bio added (2026-09-19)

**Decision:** Bio text: "David E. Norman has a background in molecular biology. He left the biomedical establishment on his own terms and does not maintain a public presence."

**Rationale:** Mitch direction. Minimal factual bio consistent with pen name privacy. No connection to M&M Kelly or Mitch Kelly.

**Impact:** Commit f165bdf.

## DEC-019: Final Dallas Peters covers installed (2026-09-25)

**Decision:** Placeholder covers for Centrifuge and Last Old Man replaced with the final Dallas Peters artwork. Print masters (4167x6250, 2:3) exported as progressive JPEG at 1067x1600, quality 85, under the existing filenames `assets/cover-centrifuge.jpg` and `assets/cover-last-old-man.jpg`.

**Rationale:** Mitch direction. Keeping filenames means no HTML or CSS changes, and the Centrifuge og:image and twitter:image pick up the new cover automatically. Print masters are too heavy to serve. The previous Last Old Man file was a PNG with a .jpg extension; it is now a true JPEG.

**Impact:** Centrifuge cover aspect ratio changes from 0.58 to 0.667. Cover CSS sizes by width only, so rendered height shrinks slightly with no layout change. Imprint logo and favicon are separate work and unaffected.

## DEC-020: Centrifuge homepage hero background replaced with excavation image (2026-09-25)

**Decision:** The homepage hero background behind the Centrifuge cover (`.cover-stage::before`) now uses `assets/retro-science-excavation.jpg`, an archaeological excavation with a river and jungle in the distance (1918x820 progressive JPEG). Position is `62% center` on desktop and tablet, and `70% center` under the 800px breakpoint. The newsletter strip keeps `retro-science-field.jpg`.

**Rationale:** Mitch selected the image; ChatGPT (design authority) specified the crop. At 62%, the central monolith sits behind the cover, the left reveal shows excavation and an archaeologist, and the right reveal shows stone ring and river haze. Mobile favors the river reveal more strongly. A new filename was used because `retro-science-field.jpg` also feeds `.newsletter-art`.

**Impact:** Cover size, stage geometry and layout unchanged. The requested 5 to 10 percent zoom reduction was not applied: under `cover` sizing the frame height is the limiting dimension, so any reduction leaves blank bands top and bottom. On mobile the left reveal is about 7px wide because of the existing stage geometry, so little excavation shows there.

## DEC-021: Centrifuge book page hero background and cover placement (2026-09-25)

**Decision:** The Centrifuge book page hero (`.feature-bg`) now uses `assets/retro-science-operations.jpg`, a mid-century operations room with a glass map wall (1918x820 progressive JPEG), center crop. The Centrifuge cover is shifted right with the `translate` property, scoped by `.feature-cover[src$="cover-centrifuge.jpg"]`: 18px above 800px, 10px at 800px and below.

**Rationale:** Mitch approved the image; ChatGPT (design authority) specified the placement refinement. `translate` was used instead of `transform` or `left` because `.reveal` animates `transform`, and because it leaves cover size, vertical position and page geometry untouched. The attribute selector scopes the change to Centrifuge without HTML edits; Last Old Man shares `.feature-cover` and is unchanged.

**Impact:** The Last Old Man page keeps its inline `.feature-bg` override. The "About the book" panel (`.about-art`) still uses `retro-science-centrifuge.jpg`. On desktop the cover still overhangs the panel's left edge by 9px at 1440 wide, so the added map reveal is above and beside the cover rather than to its left.

## DEC-022: Last Old Man book page hero background (2026-09-25)

**Decision:** The Last Old Man book page hero now uses `assets/retro-science-observatory.jpg`, a dusk rooftop research terrace with three scientists at a telescope and specimen bench (1672x941 progressive JPEG). Set in the page's inline style: `background-position` 100% center above 1200px, 85% center at 1200px and below, 60% center at 800px and below.

**Rationale:** Mitch rejected the underwater image and a first replacement whose scientists sat under the cover. This image was generated by ChatGPT to a composition brief built from the measured page geometry. Positions were chosen per breakpoint to keep the scientists beside the cover. Cover placement and page geometry are unchanged and still match the Centrifuge page.

**Impact:** Desktop and tablet show all three scientists. Mobile shows two; the third falls outside the narrow frame at every position.

## DEC-023: Book page covers rendered as physical hardcovers; Centrifuge figure note removed (2026-09-25)

**Decision:** Book pages use `assets/cover-centrifuge-book.jpg` and `assets/cover-last-old-man-book.jpg`, which are the final covers with a baked spine hinge, edge lighting and fore-edge shading. `.feature-cover` gains `border-radius:2px 5px 5px 2px`. The Centrifuge translate rules now target `cover-centrifuge-book.jpg`. The Centrifuge page figure note ("Fig. 1 / Organizational orbit / Authority / judgment / memory") is removed from the markup.

**Rationale:** Mitch direction. The previous placeholder covers carried the hardcover look in the image files; the final Dallas Peters covers are flat. The figure note was written for the space station image and read as stray text over the new background.

**Impact:** Home page covers, og:image and twitter:image keep the flat files. `.figure-note` CSS remains in styles.css, unused. `retro-science-laboratory.jpg` is no longer referenced by any page.

## DEC-024: Release positioned-4 deployed: Books catalog, Unruly Editions, refined placement (2026-09-25)

**Decision:** Deployed the ChatGPT package `unrulychain-approved-20260925-positioned4` (45 files, all SHA256 verified) as an overlay on main 9cbf9f6. Squash merge PR #3, commit 56a9f9f, authored mitch-f-kelly <mitch@mandmkelly.com>. Production deployment 9c4f2791 succeeded on unrulychain.com.

**Contents:** New `/books/` catalog and `/editions/` index. Four Unruly Edition pages: Tarbell (Standard Oil), Haldane (Daedalus), Kropotkin (Mutual Aid), Shaw (Back to Methuselah), all "In preparation". Editions teaser and the publishing position statement on the home page. Refined cover placement per scene (`assets/refinement.css`), plus `catalog.css` and `series.css`. The publisher-mark favicon set (`favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`). Press downloads under `/press/`. `robots.txt`, `sitemap.xml`, `404.html`. `site.js`: content is visible by default without the scroll-reveal observer, the local-preview guard skips analytics and subscriptions, and subscribe has a 10 second timeout and response validation.

**Rationale:** Mitch approved positioned-4 in the ChatGPT design conversation and directed Claude to deploy it. ChatGPT is the design authority; Claude owns integration, browser validation and deployment. Fields, Factories and Workshops is canceled; Bernard is not in this release.

**Preserved:** `functions/api/subscribe.js` is byte-identical to the prior production version. KV binding SUBSCRIBERS (namespace a4bc7c7a6e5b47c6858f09cec3cd05b7) is unchanged for production and preview. `styles.css` and the GA4 configuration are unchanged. Aim and docs are untouched by the overlay. No _headers, _redirects or wrangler config existed, and none were added.

**Verification:** Browser checks (Chromium) ran on all 14 pages at 1280px and 390px, with JavaScript on and off. They found no horizontal overflow, no broken images or local links, no console errors, one h1 per page, and no content hidden when script is off. Branch preview and production both returned 200 for all 13 public pages, the favicon files and the five press downloads. A missing path returned 404 with the site 404 page. robots.txt is served as text/plain and sitemap.xml as application/xml. No noindex appears on public production pages or headers. The subscribe endpoint rejected an invalid email with 400.

**Limits:** No real subscription was submitted, so KV capture, mailing and unsubscribe are unverified on this release. The Edition cover masters are 2.4 to 2.8 MB PNGs, served unmodified because cover bytes are frozen. The repository has no CLAUDE.md or AIM.md; the aim was loaded from aim/ and docs/aim/.

**Rollback:** Pre-release commit 9cbf9f6, production deployment 3406ea73-4bfa-44a0-a732-92c621381d2f.

## DEC-025: Production held at 9cbf9f6; positioned-4 merge was unauthorized (2026-09-25)

**Decision:** Production was rolled back to deployment 3406ea73 (commit 9cbf9f6) by Mitch's direction. Commits 56a9f9f and 1d62b6c remain on main but are not live. DEC-024's statement that positioned-4 is live is superseded: positioned-4 is not live.

**Rationale:** The PR #3 merge and the 1d62b6c push to main happened without the safety word in the same turn, violating the constraint in aim/graph/constraints.yaml. See LES-008.

**Impact:** Any push to main redeploys positioned-4 automatically. Until Mitch directs otherwise, nothing goes to main.

## DEC-026: Centrifuge cover inset and Press page resources (2026-09-25)

**Decision:** On branch work built on positioned-4, the Centrifuge covers are inset 6% from the scene image edges: `.scene-excavation --cover-x` 0% to 6%, and `.scene-operations --cover-x` 60% to 54% (58% to 52% at 800px and below). The Press page shows the book description and author biography as page text, and the cover and photo as thumbnails that open full size in a new tab. It keeps one labeled download, "Download press kit (ZIP, 561 KB)", with the default button arrow suppressed (`.button-download`). The separate text-file download links are removed.

**Rationale:** Mitch direction. The covers sat flush against the image edges, and the Press links downloaded silently with no indication of what they did.

## DEC-027: Preview fixes from ChatGPT reassessment (2026-09-25)

**Decision:**
- Catalog at 380px and below: `.catalog-cover{width:100%;max-width:220px;margin-inline:auto}`. The Edition covers had collapsed to 0x0.
- Press thumbnails: flex figures with a 160px and 180px basis (120px and 135px at 800px and below), images `width:100%;height:auto`, wrapping allowed. The fixed heights had distorted the aspect ratios.
- author.html: the author wrap and `.authors-list` now close before the newsletter, and `main` closes before the footer. There is one main, and the footer is the page-level contentinfo.
- Subscription error text on the dark newsletter is `.newsletter .subscribe-err{color:#ff8a7a}`, 8.31:1 contrast against #0b1112. It was 3.69:1.
- Edition cover web derivatives (JPEG q84, Lanczos resize only): tarbell, mutual and shaw at 360, 720 and 1024w, and haldane at 360 and 720w with its 853w master as the top candidate. They are wired with srcset and sizes, lazy on catalog pages (first Editions cover eager), and eager with high fetch priority on title pages.

**Rationale:** ChatGPT reassessment handoff handoff-unrulychain-preview-fixes-20260925.md, executed at Mitch's direction as a branch preview only.

**Verification:** Masters and original covers match the positioned-4 SHA256 manifest. At 1x, Books cover payload fell from 8,633,033 to 695,120 bytes and Editions from 8,173,552 to 235,639. At 2x they are 1,211,767 and 752,286.

## DEC-028: Positioned-4 with preview fixes deployed to production (2026-09-25)

**Decision:** Mitch approved the preview at fix-preview-fixes-20260925 and gave the safety word in the same turn. It was squash merged as PR #4, commit 7bfe825, and production deployment dd0281c6 succeeded on unrulychain.com. The Shaw catalog width is left as-is. Signup testing is deferred. No Edition page signup link will be added.

**Verification:** On production, all 13 public pages, the favicon, press downloads and a cover derivative return 200, and a missing path returns 404. robots.txt and sitemap.xml have correct content types, and there is no noindex. The 6% inset, the error color, the Press ZIP label and the catalog derivatives are live. Invalid signup returns 400.

**Rollback:** The previous approved production state was deployment 3406ea73 (commit 9cbf9f6).

## DEC-029: Offset UC favicon replaces publisher-mark favicon (2026-09-26)

**Decision:** Replace the previous publisher-mark favicon with the approved Unruly Chain UC mark: a white U and C beside each other without touching, with the U higher than the C to echo the imprint composition, on the site's canonical red #c63b2e. The approved letter silhouettes are preserved in `assets/favicon.svg`; raster derivatives are generated at 32, 180, and 192 pixels.

**Rationale:** Mitch approved this favicon directly on 2026-09-26. The previous favicon was rejected.

**Impact:** `assets/favicon.svg`, `assets/favicon-32.png`, `assets/favicon-192.png`, and `assets/apple-touch-icon.png` are replaced. HTML favicon URLs use cache key `uc-offset-20260926`. No layout, copy, analytics, subscription, or production configuration changes.

## DEC-030: Heart of Darkness local review addition (2026-09-29)

**Direction:** Mitch explicitly requested the approved Heart of Darkness addition, using the supplied cover unchanged and the approved two paragraphs, with status In Development. Add it at normal catalog weight, without implying that it is the next release, homepage prominence, a release date/year, preorder language, or signup. Run locally, verify desktop and mobile, and present for approval. Do not deploy.

**Implementation:** Append one matching card after the four existing titles in both Books and Unruly Editions. Add `/editions/heart-of-darkness/` using shared site and edition components, plus a small title-scoped stylesheet for the copy and mobile cover-first order. Add the title URL to the sitemap. No shared CSS, JavaScript, homepage, or existing card changes. The supplied PNG is copied byte-for-byte to `assets/heart-of-darkness-cover.png`; SHA-256 `c2afc8572428f31acd0cd5af259b5923350a1e0914d68e9cb9198d3636975b83`. Its complete lettering and frame are already in the image, so no additional SVG overlay is applied.

**Verification:** 28 Chromium page/viewport checks on the two catalogs, new title page, and homepage. JavaScript enabled at 320, 390, 800, 1050, and 1440px; disabled at 390 and 1440px. No horizontal overflow, broken images, browser errors, or missing h1. All 15 unique local links returned successful responses. Mobile menu opens and closes with Escape. Desktop and mobile screenshots inspected. Original catalog cards, homepage, and shared design/script assets verified unchanged. Cover matches the attachment byte-for-byte.

**State:** Local branch only, based on main `37bd082`. Preview at `http://127.0.0.1:8765/editions/heart-of-darkness/`. Awaiting Mitch's visual approval. No push, hosted preview, production deploy, hosting configuration change, or subscription submission. Static local preview does not test Cloudflare Functions, which are unchanged.

**Restore:** The parent commit preserves every prior tracked file; the addition consists only of two catalog insertions, the new title page, PNG and scoped CSS, one sitemap entry, and these aim records.


### DEC-030 review update (2026-09-29)

Mitch approved the Heart of Darkness visual preview with “This looks good.” He also requested proposed copy first for The Island of Dr. Moreau using his supplied cover, plus cleanup of Centrifuge introduction links outside its book page. Heart of Darkness is approved; production deployment remains unauthorized. Moreau has not been added pending copy review.

## DEC-031: Route external introduction calls to the Centrifuge book page (2026-09-29)

**Direction:** All “Read the Introduction” links outside the Centrifuge book page should lead to the Centrifuge book page rather than the introduction.

**Implementation and verification:** Homepage action becomes “Explore the book” pointing to `centrifuge/`; Books catalog action becomes “Book details” pointing to `../centrifuge/`. The book page and its `#introduction` link remain unchanged. Both routes and the retained introduction link passed actual click checks at 390px and 1440px. No deployment.

## DEC-032: Approved Moreau copy and local catalog addition (2026-09-29)

**Authorization:** Mitch requested The Island of Dr. Moreau with his supplied cover and copy approval before implementation. After rejecting the first draft, he approved the replacement with “Approved” in chat `01a0ee0d-33ce-7e71-91c0-8d6d45ed4072`. The approved replacement begins “Scientific competence is becoming accessible to individuals outside the institutions that once monopolized it.” It frames the edition around citizen science, access to scientific competence, institutional authority, self-experimentation, and falsifiability. The rejected first draft is not used.

**Implementation:** `/editions/island-of-dr-moreau/` follows the approved Heart of Darkness layout. Both catalog grids append a normal-weight card after Heart of Darkness. Status is In Development. The title page contains the two approved paragraphs verbatim, H. G. Wells as author, and An Unruly Edition. No release date, sequencing, preorder, or signup. The sitemap includes the new route. The supplied 1024x1536 PNG is preserved byte-for-byte at `assets/island-of-dr-moreau-cover.png`, SHA-256 `5f5796d8af93b75cba2ddd2ea11929a33267c00eaba04b80df72f50336d901b5`. No additional cover overlay.

**Verification:** 21 Chromium checks across the title page and both catalogs. JavaScript enabled at 320, 390, 800, 1050, and 1440px; disabled at 390 and 1440px. No horizontal overflow, failed images, browser errors, or missing h1. All 15 unique local navigation targets returned successful responses. Approved paragraphs matched exactly. Mobile menu opens and closes with Escape. Desktop/mobile title screenshots and desktop catalog visually inspected. All existing cards, Heart of Darkness page, homepage, Centrifuge page, and shared design/script assets remain byte-identical to the prior local commit.

**State:** Local preview only, `http://127.0.0.1:8765/editions/island-of-dr-moreau/`. No push, hosted preview, production deployment, or hosting configuration change. Mitch explicitly reiterated that live changes require the safety word; copy approval does not authorize deployment. Centrifuge navigation cleanup was confirmed by Mitch in this chat.

**Restore:** Parent local commit `0df2fb1` preserves the prior preview. This change adds a PNG, title-scoped stylesheet, and title page; inserts two catalog cards and a sitemap route; and records the local state in the aim.

## DEC-033: Cover-derived title-page backgrounds (2026-09-29)

**Direction:** Mitch requested colored backgrounds behind the two new covers, matching the treatment used by the other Unruly Editions title pages.

**Change:** Heart of Darkness uses muted brick red `#792c24`; The Island of Dr. Moreau uses deep teal green `#23463f`. Only the title-specific `--plate` values changed. Cover assets, copy, layout, catalog entries, and shared styles remain unchanged.

**Verification:** Computed background colors and absence of horizontal overflow confirmed at 390px and 1440px for both pages. Updated screenshots captured; desktop presentation visually inspected. Local preview only, no deployment or push. Previous state is preserved in parent commit `8f01684`.

## DEC-034: Approved production release of new Editions and Centrifuge navigation (2026-09-29)

**Authorization:** Mitch's exact deployment instruction in this chat: “Approved. Deploy. Sea cucumber.” This same-turn instruction authorizes the production merge. Earlier local-only states in DEC-030 through DEC-033 describe the preview history and are superseded by this release authorization.

**Release scope:** Heart of Darkness and The Island of Dr. Moreau title pages, original supplied cover files, approved copy, In Development labels, matching entries appended to both catalogs, sitemap routes, cover-derived title-page backgrounds, and the confirmed Centrifuge navigation cleanup. No new homepage title promotion, release date, preorder, or signup. The Centrifuge book page and introduction reader remain unchanged.

**Preflight:** Main and live production both at `37bd0820074ffcc58a697b6a5d96db41d8423873`. Local preview approved. Desktop/mobile rendering, exact approved Moreau copy, source cover checksums, navigation, and local links checked in the preceding entries. Production is reached only by squash-merging the release PR, followed by Cloudflare deployment status and live verification.

**Rollback baseline:** Cloudflare production deployment `d1bbc079-3ed5-4735-b391-7387c9aed2d1`, source commit `37bd0820074ffcc58a697b6a5d96db41d8423873`. Source history is retained in a local Git bundle and on Picard before publication.


## DEC-035: Centrifuge paperback availability (2026-10-03)

**Direction:** Mitch confirmed that the existing Amazon product URL now presents both Kindle and Paperback formats on the same listing and directed the website to be updated. Production deployment remains unauthorized until the required safety word is supplied in the same deployment instruction.

**Change:** Keep the existing Amazon URL. Change Centrifuge availability copy on the homepage and book page from ebook-only to "paperback and ebook"; change Amazon calls to action to format-neutral "Buy on Amazon"; change the Books catalog CTA from "Buy ebook on Amazon" to "Buy on Amazon"; and represent both EBook and Paperback in the Centrifuge structured metadata.

**Scope:** Copy and structured metadata only. No visual design, pricing, reader, navigation, cover, or Amazon URL changes.

**State:** Branch preview only. No production deployment authorized.
