---
type: aim-lessons
app: unrulychain-site
updated: 2026-09-19
---

# Unruly Chain Site: Lessons

## LES-001: Third-party AI output is context, not source material (2026-09-10)

**Lesson:** When ChatGPT (or any other AI tool) produces prose documents describing a project, those documents reflect that tool's interpretation. They are useful for understanding what the tool was told and where the design process stands, but they are not authoritative. Aim triples must trace to Mitch's KB or Mitch's words.

**Trigger:** The first aim attempt for this site treated a ChatGPT status update as equally authoritative to the KB imprint document. Over half the triples cited the ChatGPT document. The aim was contaminated and purged before commit.

**Rule:** If the provenance of a fact is "ChatGPT wrote this," it is context, not source material.

## LES-002: Visual overflow, not layout math, caused the hero collision (2026-09-10)

**Lesson:** Three rounds of font-size reduction, column-width adjustment, and breakpoint tuning failed to fix the homepage title collision. The actual cause was the `.cover-stage::before` pseudo-element extending 12% beyond its grid column via `left:-12%; width:118%`. A single `overflow:hidden` on the container fixed it.

**Rule:** When text appears to overlap an adjacent element, check whether the adjacent element's visual content overflows its layout box before adjusting the text.

## LES-003: CSS base rules after media queries override mobile styles (2026-09-10)

**Lesson:** Base `.author-layout{display:grid}` placed after the 800px media query's `.author-layout{display:block}` overrode the mobile rule at all widths. CSS specificity was equal, so source order won.

**Rule:** Base component styles must be defined before responsive breakpoints.

## LES-004: Cloudflare Pages deploy previews require manual API trigger (2026-09-10)

**Lesson:** Commits via the GitHub API do not trigger Cloudflare Pages deploy previews. Must POST to `api.cloudflare.com/.../deployments` with the branch name. Auto-deploy only fires on push to main.

## LES-005: Copy must not manufacture editorial philosophy (2026-09-10)

**Lesson:** ChatGPT's review correctly identified that the original copy drafts reverse-engineered a publishing philosophy from the book catalog. Statements like "for readers who want the full argument, not the summary" sound plausible but were never established as Unruly Chain doctrine. Short honest copy outperforms longer inferred copy.

**Rule:** If the established facts support two sentences, write two sentences. Ask the operator for positions rather than inferring them.

## LES-006: Footer vs. bio are scope-distinct for link placement (2026-09-14)

**Lesson:** Claude initially kept the Substack link on author.html's footer when removing it from other pages. Mitch corrected: the footer is site-wide imprint territory, not author-specific. The link belongs in the author bio section, not the footer Connect section, even on a page about that author. Placement within page architecture carries meaning.

**Trigger:** Three commits required to get the Substack link placement right (335f512, a0a570c, fe067ed).

**Rule:** Footer content is imprint-level. Author-specific links go in the author's bio section.

## LES-007: Main branch auto-deploys; branch previews do not (2026-09-14)

**Lesson:** Pushes to the main branch trigger Cloudflare Pages production deploys automatically. This is distinct from LES-004 (branch preview deploys require a manual API POST). The two deploy paths have different trigger mechanisms.

**Trigger:** Confirmed during GA4 install and footer fix session. Post-deploy verification required GitHub API checks because the live site is outside the sandbox egress allowlist.
