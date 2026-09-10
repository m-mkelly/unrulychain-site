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
