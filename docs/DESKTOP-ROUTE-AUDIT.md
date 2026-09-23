# Desktop route audit — 23 September 2026

Scope: Home, `/listing-grid`, `/about-us`, `/blog`, and general `/contact` in the
standalone Auto Best master. Local review uses `http://127.0.0.1:5174` and Node
22.23.2. Both Bulgarian and English are covered.

## Findings and changes

| Area | Finding | Result |
| --- | --- | --- |
| Hero geometry | All five were already 540px at 1440px, but repeated route heights and absolute copy positioning made the contract fragile. | Shared height remains 540px; title and description use normal flex flow above the shared 320px control baseline. Vehicle placement derives from the hero height. |
| Palette | Inventory used layered gradients; Blog introduced yellow outside the requested desktop neutral/red family. | Solid red Inventory, solid grey Blog, existing black Home and charcoal About/Contact. Existing vehicle cutouts remain. |
| Typography | Hero descriptions used smaller body type with very long measures; About service actions used metadata type. | 18px hero descriptions with a 760px maximum measure, balanced wrapping, and 16px/500 service controls. Titles retain 48px/600, or 42px at 992–1199px. |
| Discovery alignment | Home and Inventory had different center-lane width rules. | One shared responsive lane for Home, Inventory and wide Blog search. |
| Hover/focus | Blog's shared inactive-category background overrode its hover background while the text turned white. About's hover action nearly merged with its dark hero. | Category hover retains red behind white text; neutral actions stay visibly light; Blog search gains a clear focus outline. |
| Loading/code | About, Blog and Contact eagerly requested hero photos hidden at every breakpoint. | Removed those image elements and obsolete media/overlay rules. Retained original assets and provenance; tablet Inventory artwork remains. |
| Regression test | The journey test clicked at 5px/5px, outside the rounded desktop card. | Click at 12px/12px checks the visible card surface without bypassing browser hit testing. |

## Visual review

Reviewed the complete pages: navigation and hero, Home campaign/vehicle/body/brand/
editorial/video sections, Inventory cards and controls, About service cards and map,
Blog cards and filters, Contact actions and map, and the shared footer. Existing
section artwork and white/grey card patterns are retained. No generated assets or
additional font family were needed. Native lazy images are scrolled into view before
the final full-page captures; unrequested lazy-image placeholders are not missing assets.

Desktop rules live in `src/lib/styles/composition.css` and the existing route sheets.
Typography values still come from `src/lib/styles/tokens.css`. No new global theme,
duplicate hero component, package dependency, lockfile or locale copy was introduced.
Phone layouts retain their existing palette and geometry.

## Verification

- `npm run validate`: architecture, CSS policy, token graph, typography, assets,
  domain checks, Svelte/TypeScript diagnostics, locale prebuild checks and production build.
- `node scripts/desktop-routes-smoke.mjs`: 50 BG/EN route/viewport cases at 390,
  992, 1024, 1440 and 1920px. Checks equal desktop heights, solid surfaces, heading
  and control separation, real Onest glyph rendering through Chrome's font inspector,
  overflow, images, runtime errors, Blog hover and search focus.
- `node scripts/desktop-discovery-smoke.mjs`: desktop filter drafts, sticky search,
  dismissal and focus return at 1024, 1440 and 1920px.
- `node scripts/journey-smoke.mjs`: vehicle/article return state, finance context,
  stock discovery, menu focus/resize and viewport-specific hero media loading.
- `git diff --check`; pre-existing changes compared against the initial saved diff.

Reports and full-page screenshots: `artifacts/desktop-routes-smoke/`,
`artifacts/desktop-discovery-smoke/`, `artifacts/journey-smoke/`. Build logs and the
initial preservation snapshot are under `artifacts/desktop-route-audit/`.

These are local working-preview checks, including the 23 pre-existing dirty paths
preserved during this task. They do not certify an exact clean release commit,
mounted Cars preview, live dealer deployment, or form delivery. Google Maps and
YouTube remain external providers. Owner visual acceptance and template promotion
are separate from this implementation.
