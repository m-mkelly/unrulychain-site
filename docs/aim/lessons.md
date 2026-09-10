---
type: aim-lessons
app: unrulychain-site
updated: 2026-09-10
---

# Unruly Chain Site: Lessons

## LES-001: Third-party AI output is context, not source material (2026-09-10)

**Lesson:** When ChatGPT (or any other AI tool) produces prose documents describing a project, those documents reflect that tool's interpretation. They are useful for understanding what the tool was told and where the design process stands, but they are not authoritative. Aim triples must trace to Mitch's KB or Mitch's words.

**Trigger:** The first aim attempt for this site treated a ChatGPT status update as equally authoritative to the KB imprint document. Over half the triples cited the ChatGPT document. The aim was contaminated and purged before commit.

**Rule:** If the provenance of a fact is "ChatGPT wrote this," it is context, not source material.
