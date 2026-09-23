# Home section banner polish — 23 September 2026

Scope: desktop Home section headings and the four browse/ownership campaign cards.
The route heroes, mobile layout, existing vehicle artwork and destinations stay intact.

## Design

- Inventory, brands and video section headers use the same solid charcoal family as
  the desktop Inventory hero. Body-type and editorial headers use the light grey
  surface and dark text from Home and Blog.
- Light banners use red actions; dark banners use white actions. Buttons have flat
  surfaces and no vertical hover movement. Focus outlines are white on charcoal
  and blue on light surfaces.
- All five section headers retain the shared 176px minimum height, typography,
  padding and content overlap. Campaign cards retain a 234px minimum height,
  matching rounded corners, and equal heights within each pair.
- Sell and Import cards use light grey with red actions. Collection and Leasing
  use charcoal with white actions. Existing transparent vehicle artwork remains.
- Campaign artwork scales to reserve room for action labels at laptop widths.
  Ownership artwork is slightly smaller, and desktop action labels stay on one line.
- The old graphite/crimson metallic background images are no longer requested.
  Original assets and provenance are retained; no new images or dependencies were added.

## Ownership and verification

Shared Home banner presentation lives in `src/routes/+page.svelte`. BodyTypes and
Editorial select the light variant; TrustActions owns campaign card styling.
Existing unrelated changes, including tokens and VideoSection, are preserved.

Local checks use Node 22.23.2 and the confirmed checkout listener at
`http://127.0.0.1:5174`:

- `npm run validate`: architecture, CSS, tokens, typography, assets, domain,
  locale, Svelte/type checks and production build.
- Ten focused Home browser cases: BG/EN at 390, 992, 1024, 1440 and 1920px.
  Checks cover neutral surfaces, omitted metallic image requests, text/hover/focus
  contrast, header geometry, contained actions, campaign artwork clearance,
  horizontal overflow and runtime errors.
- Rendered section captures inspected at laptop and wide desktop sizes.
- Before/after 390px section rectangles and background colours match exactly.
- Pre-existing working changes are compared byte-for-byte against the saved diff
  and excluded from this task's commit.

Local evidence is under `artifacts/desktop-route-audit/home-sections-*` and
`home-{section}-after*.png`. These checks include the preserved existing work;
they are not certification of an exact clean release or a dealer deployment.
