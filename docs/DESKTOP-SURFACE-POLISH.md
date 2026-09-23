# Desktop surface and hero-copy polish — 23 September 2026

Home, Inventory, About, Blog and Contact now share a white desktop content canvas.
Grey remains a contained card/panel surface. Rounded corners, the 24px Home panel
overlap, cutout cars and the shared 540px route hero height are retained.

- Home uses the configured city and address without the appointment instruction.
  Brands and Editorial now use the established charcoal heading treatment; Body
  Types retains pale blue. Banner composition and heights remain unchanged.
- Inventory retains a concise localized count below its hero title, matching the
  other route subtitle positions. It reports applied results, including zero;
  search and sticky controls do not repeat the count. This supersedes the earlier
  search-count placement experiment.
- The Home inventory banner uses “View all” plus an arrow because its heading
  supplies the vehicle context. Its accessible label retains “View all cars”.
- About and Contact share desktop social-link styling: 56px white circles, 28px
  brand icons and 16px gaps, with contextual keyboard focus. Mobile social controls
  retain their original sizes.
- About keeps its architectural scene with a desktop CSS greyscale treatment. The
  introductory brand heading is unboxed, with its duplicate inventory action
  removed. Service cards and the rounded map panel use the shared grey surface on
  white. The old dark map stage and duplicate desktop map rules are removed.
- Inventory results and Contact content use the same white surface as Home/Blog.
  No palette token, dealer address, image asset or mobile design was changed.

Source owners are the Home/Listing/About components and the About/Contact route
styles; ListingHero owns result-count rendering. No new dependency
or image generation was needed.

## Local verification

Node 22.23.2; owned checkout server at `http://127.0.0.1:5174`:

- `npm run validate`: static, domain, localization, Svelte/type checks and build.
- `scripts/desktop-routes-smoke.mjs`: 50 BG/EN cases at 390, 992, 1024, 1440 and
  1920px. Includes white canvases, hero geometry, Onest rendering, images, overflow,
  runtime errors, matching social controls and applied/zero-result counts. Map traffic is cancelled
  by navigating to a blank page before closing each browser context.
- `scripts/desktop-discovery-smoke.mjs`: six Home/Inventory search, sticky draft,
  submit and keyboard-focus cases at 1024, 1440 and 1920px.
- Twelve focused Home cases at 390, 768, 992, 1024, 1440 and 1920px in BG/EN:
  contrast, actions, artwork clearance, rounded panels and overlap.
- Rendered Home, Inventory and About reviewed in the browser. Evidence lives in
  ignored `artifacts/desktop-route-audit/surface-polish-*` logs and route captures.
  The CTA/count/social follow-up uses `cta-social-*` logs, plus
  `inventory-cta-after.png` and `contact-social-after.png`.
  The final route run passed 49 cases; the English Inventory 1440px case passed
  separately in `cta-social-focused/report.json` after changing its navigation
  wait to DOM readiness instead of the full load event. Language preferences match
  each test locale, and hidden Contact cutouts are not required to download.

The 23 pre-existing dirty paths are preserved; only task-owned changes in the two
shared search files are staged. Checks describe the local combined working source,
not an exact clean release, dealer deployment or third-party map-service audit.
