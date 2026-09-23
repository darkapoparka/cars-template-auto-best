# Home section banner polish — 23 September 2026

Scope: desktop Home section headings and the four browse/ownership campaign cards.
The route heroes, mobile layout, existing vehicle artwork and destinations stay intact.

## Design

- Inventory and video section headers use the solid charcoal family from the
  desktop Inventory hero. Brands and editorial use a softer neutral surface.
  Body types reuse the pale ice-blue start colour from mobile Import.
- Each heading joins its grey card container flush, without a border or inset
  shadow. Headings round only the top corners; panels round only the bottom
  corners. Surface colours provide the separation.
- Light banners use red actions; dark banners use white actions. Buttons have flat
  surfaces and no vertical hover movement. Focus outlines are white on charcoal
  and blue on light surfaces.
- All five section headers retain the shared 176px minimum height and typography,
  with balanced vertical padding. The previous 24px overlap is removed, giving
  the title/actions their full heading space. Campaign cards retain a 234px minimum height,
  matching rounded corners, and equal heights within each pair.
- Sell uses light grey and Import reuses the pale ice-blue surface, both with red
  actions. Collection and Leasing use charcoal with white actions. Existing
  transparent vehicle artwork remains.
- Campaign artwork scales to reserve room for action labels at laptop widths.
  Ownership artwork is slightly smaller, and desktop action labels stay on one line.
- The old graphite/crimson metallic background images are no longer requested.
  Original assets and provenance are retained; no new images or dependencies were added.

## Ownership and verification

Shared Home banner presentation and the semantic `dn-home-section-panel` style
live in `src/routes/+page.svelte`. All five card panels opt into that class;
duplicated desktop overlap, padding and corner rules are removed from their owners.
BodyTypes, BrandSection and Editorial select the light variants; TrustActions owns campaign card styling.
Existing unrelated changes, including tokens and the VideoSection close-icon
size adjustment, are preserved and excluded from the task commit.

Local checks use Node 22.23.2 and the confirmed checkout listener at
`http://127.0.0.1:5174`:

- `npm run validate`: architecture, CSS, tokens, typography, assets, domain,
  locale, Svelte/type checks and production build.
- Twelve focused Home browser cases: BG/EN at 390, 768, 992, 1024, 1440 and 1920px.
  Checks cover neutral surfaces, omitted metallic image requests, text/hover/focus
  contrast, header geometry, contained actions, campaign artwork clearance,
  flush section joins, outer-only corner rounding, absence of divider borders/shadows,
  horizontal overflow and runtime errors.
- Rendered section captures inspected at laptop and wide desktop sizes.
- Before/after 390px section rectangles and background colours match exactly.
- Pre-existing working changes are compared against the saved diff, excluding
  only Git's blob-hash lines for the shared VideoSection file, and kept out of
  this task's commit.

Local evidence is under `artifacts/desktop-route-audit/home-sections-*` and
`home-{section}-after*.png`. These checks include the preserved existing work;
they are not certification of an exact clean release or a dealer deployment.

The final structural refinement is captured as `home-{section}-structure.png` and
`home-sections-structure-*`. It supersedes the earlier inset-divider experiment:
separation now comes from adjoining surfaces, not a decorative line over an overlap.
