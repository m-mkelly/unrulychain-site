# Hosted preview verification, 2026-10-11

The read-only CI audit visits the immutable Cloudflare preview, not a local reproduction. It cannot publish, merge, change settings, submit forms, or make purchases.

Initial run: 38176739944, preview commit 781df1a83ac4823aaefaa565c2a24917976f3de6. All 18 hosted HTML pages matched source byte-for-byte. Seventy-three internal page/asset requests and all fragment targets resolved. The restored unified Books listing and accepted Authors content matched their expected Git hashes. Desktop/mobile menus and both catalog-to-volume links worked.

The responsive pass found a pre-existing Back to Methuselah heading widening its parent beyond a 320px screen. The fix is limited to the existing very-small-screen media query: constrain the grid's single column and scale the detail heading within the available width. Normal desktop/mobile layouts are unchanged.

Amanda's cross-page profile anchor now has a sticky-header scroll offset through shared catalog CSS. Her accepted HTML, photograph, wording and normal layout remain unchanged.

The first clipping test also flagged intentionally offscreen columns of the existing paginated Centrifuge reader. The audit now tests the reader's visible interface and next/previous/type-size/enlarge/close controls separately instead of treating later book pages as document overflow. The Amanda destination check is case-insensitive because CSS displays link labels in capitals. Screenshot capture waits for image decoding and scrolls every image into view before capturing the full page, avoiding unpainted lazy images.

All initial run evidence is preserved as GitHub artifact 11715689185. The corrected audit must pass on the final preview commit before it is presented for approval. Production remains unchanged.
