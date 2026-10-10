## Centrifuge reader preview, 2026-09-29

Mitch approved the portrait slate, warm cream screen, placement between About and the newsletter, hero link, UNRULY CHAIN nameplate, reduced-motion-aware warm-up, enlarge mode, approved controls and end card, exclusion of ISBNs, the AI training notice, and three reader analytics events. He requested familiar 1960s typography; the prototype uses a Palatino-first system serif stack without added fonts.

The reader uses vanilla JavaScript and scoped CSS columns. It preserves the introduction as accessible HTML and a scrolling fallback without JavaScript. The canonical source SHA-256 is 755289c69be5a57a12fbb0c39cef139b5e7f8bca084b3a12e96136f91688ace0. Paragraphs and four thematic breaks are preserved; typographic quotes were introduced in the uploaded branch. The end card includes the approved excerpt, copyright, publisher, training notice and publication-update link, with the excluded imprint line absent.

This is a preview only. No production merge is authorized. Visual review and the separate same-turn production safety word remain required.

### Approved adjustment trial

Mitch agreed to try five sizes (15, 17, 19, 21 and 23 px), default 17 px, controlled with A− and A+. Above the 800 px mobile breakpoint the reader sits beside a smaller image of the existing book cover. At 800 px and below the cover is hidden and the existing single-reader layout is retained. This remains a preview awaiting review.

### Approved scene composition

Mitch approved replacing the small desktop cover panel with a full-width illustrated excavation scene, title and subtitle on the left, and the existing interactive reader on the right. Use the existing excavation artwork. Preserve the reader's portrait proportions, dimensions and controls; the mockup's squat device was explicitly rejected. Keep the current mobile presentation. This change is authorized for preview only.

### Release-copy preview

At Mitch's request, preview “Available soon” on the homepage, Centrifuge catalog entry and book page, replacing September publication wording. Homepage and catalog actions link directly to the introduction. The book-page closing paragraph reads “Available soon. Read the introduction below and sign up for publication updates.” The existing publication-update link and form remain. These copy changes await Mitch's visual approval; no purchase availability or release date is promised.

### Production authorization

Mitch approved the complete reader design and available-soon copy and instructed deployment with the required safety word on 2026-09-29 at 11:54 America/New_York. He confirmed excellent functionality on mobile and desktop. ChatGPT verified canonical text with typographic quote normalization, desktop controls and enlargement, unchanged portrait dimensions, and reviewed reduced-motion and scrolling fallbacks. The prior main commit is 9c815366b2d1b553640c406548a56b7be800dad7; reverting this release through a PR restores that source state. No verified prior Cloudflare production deployment ID was accessible in this environment.


### 2026-09-29 local navigation cleanup

At Mitch's direction, homepage and Books catalog actions now lead to `/centrifuge/`, without the introduction fragment. Their labels are “Explore the book” and “Book details” respectively. Only the Centrifuge book page retains “Read the introduction,” targeting its own `#introduction` section. Verified by clicking both entry points and then the book-page introduction link at 390px and 1440px. The Centrifuge page itself is byte-identical. Local changes only; not deployed.


### 2026-10-10 Chapter 1 preview

The existing reader now presents complete Chapter 1, “The Encounter,” from the checksum-verified final published EPUB (see DEC-040). This supersedes the introduction excerpt and earlier introduction-source hash above. The legacy `/centrifuge/#introduction` entry point is retained; visible labels read “Read Chapter 1.” No separate chapter page exists. The portrait device, page controls, five text sizes, enlargement, title/end cards and JavaScript remain unchanged. Six italic subsection headings and the chapter number use the current reader typography. Preview only, awaiting review and explicit production authorization.
