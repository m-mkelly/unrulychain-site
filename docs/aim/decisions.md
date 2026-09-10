---
type: aim-decisions
app: unrulychain-site
updated: 2026-09-10
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
