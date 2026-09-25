---
type: aim-decisions
app: unrulychain-site
updated: 2026-09-25
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

