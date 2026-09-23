# Contact desktop polish — 23 September 2026

Baseline: `4370007`, saved master checkout on `main`. Scope is desktop Contact and its topic variants; existing mobile rules and unrelated working changes are preserved.

## Changes

- General Contact uses one white, two-column panel on the established charcoal hero. Decorative desktop cars are hidden. The heading and panel retain the shared route baselines.
- The phone number has clearer hierarchy, social links have 44px hit areas, and directions align with the social row. Keyboard focus uses the shared focus color; transitions respect reduced motion.
- The contact panel remains in document flow, allowing longer dealer details to increase its height without overlapping the map.
- Eleven competing general-contact desktop CSS blocks are consolidated. The map heading is centered and its container uses the existing rounded surface pattern.
- The viewing/leasing sidebar retains its directions action without a redundant, clipped call button. Phone links remain in the main panel and contact row.
- Sell/Trade-in exposes one desktop page heading. Its mobile form heading remains visible.
- Removed an unused ContactHero import.

## Checks

- `npm run validate` passed, including architecture, CSS, token, typography, asset, domain, locale checks, Svelte diagnostics (zero errors/warnings), and production build.
- After the final duplicate-control/title fixes, CSS policy and production build passed again.
- General Contact inspected at 1024px and 1440px in Bulgarian, and 1920px in English. No horizontal overflow; all five panel links measured 44px high. Keyboard Tab reached Instagram with a visible 2px focus outline.
- All four Contact topic routes checked at 1024px. Sell/Trade-in now has one visible page heading. The viewing layout was inspected before and after removing its duplicate call action.
- Home, inventory, About, blog and locale settings checked at 1440px: one visible page heading and no horizontal overflow. This is a layout smoke check, not renewed end-to-end certification of every interaction or detail route.
- General Contact and Sell/Trade-in checked at 390px. Existing mobile hero/form heading behavior remains and neither page overflows horizontally.

Matching 1440×900 Contact screenshots are saved locally in `artifacts/contact-desktop-polish/before-desktop.png` and `after-desktop.png`. Supplemental topic and mobile screenshots are in the same ignored directory.

The Google Maps iframe remained blank in the test browser, before and after the changes. Directions URLs were inspected but external map rendering was not verified. No calls, enquiries or external social actions were submitted. This is working-checkout QA, not exact-commit template-release or dealer-deployment evidence.
