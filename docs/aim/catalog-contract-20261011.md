# DEC-049: Catalog and individual-volume page contract

Date: 2026-10-11. Source: Mitch's explicit correction in the current website review.
State: PREVIEW ONLY. No production merge or deployment authorized.

This contract supersedes the conflicting Tarbell interpretations in DEC-042, DEC-047, DEC-048 and their corresponding site-structure triples. Those records are historical, not the current layout specification.

## Exact routes and roles

- `/books/` is the complete Books catalog. It must contain ONE unified Tarbell listing: both approved covers together, one title, one shared author/editor/description and release status. Restore the earlier paired-cover listing exactly, rather than inventing a shared heading above separate cards. The Prince remains in the standard two-column catalog grid beside the remaining five ordinary Unruly Editions titles.
- `/editions/` is the Unruly Editions collection. It also has ONE unified paired-cover Tarbell listing and the existing Prince listing.
- `/editions/standard-oil/` is the individual Standard Oil book-detail page. It must have TWO SEPARATE volume listings, one for Volume I and one for Volume II. Each listing contains its own cover, volume heading, availability and sales area. Catalog cover links target `#volume-i` and `#volume-ii` on this page. Do not put two separate Tarbell product listings on either catalog page.
- Actual purchase URLs have not been supplied. Do not invent retailer URLs, ISBNs, prices or working purchase buttons. The two separate sales areas currently state that purchase links are forthcoming.

## Preserve accepted work

The Prince cover, title page and editor credit remain unchanged. The accepted Authors HTML remains byte-identical to Git blob `33524433b8ca98d1a347a5b5a860a1718345e337`: supplied Amanda Kelly biography, subtitle, B.A. in Theater Arts sentence, grayscale headshot, existing Prince credit and Cabin Pressure links. The portrait sizing correction remains in the shared CSS.

`books/index.html` is restored exactly to the existing unified-layout blob `6b1ec07ff6c3956e6f7c9c5897ce00f3b2ed35f5`. The rejected `tarbell-books.css` grouped-card experiment is removed. Approved artwork is not regenerated.

## Review and safety

Only feature branch `feat/tarbell-two-volumes-oct2026` and draft PR #23 are updated. `main` and live production remain unchanged. The preview audit is read-only: HTTP GET/HEAD, browser rendering and navigation, no newsletter submissions, purchases, credential changes, merges or deploy-settings changes. Browser test packages belong only to the isolated verification job; the static website has no new runtime dependency or build step.

The audit waits for Cloudflare's immutable preview for the exact commit, compares all 18 public HTML responses with their source files, checks internal paths/assets/fragments, exercises desktop/mobile navigation and volume links, preserves accepted author content by hash, and tests six viewport widths. Results and screenshots are retained as a CI artifact. A successful deployment alone is not a passed audit.
