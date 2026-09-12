# Auto Best: project notes for agents

Auto Best is a reusable Svelte 5 / SvelteKit dealership template. The project repository is `darkapoparka/cars-template-auto-best`. Client sites are independent copies of this template.

## Find the relevant code

Read [README.md](README.md) for setup and [ARCHITECTURE.md](ARCHITECTURE.md) for the application structure. For visual changes, use [docs/STYLING.md](docs/STYLING.md); for a client adaptation, use [REUSE_GUIDE.md](REUSE_GUIDE.md). Other references are indexed in [docs/README.md](docs/README.md). Read the section relevant to the task, not every document.

| Work | Start here |
| --- | --- |
| Business identity and contacts | `src/lib/config/brand.ts` |
| Vehicles, articles, navigation and services | `src/lib/data/` |
| Page composition and URL loading | `src/routes/` |
| Reusable interface and interactions | `src/lib/components/` |
| Colors, typography and geometry | `src/lib/styles/tokens.css` |
| Shared layout CSS | `src/lib/styles/composition.css` |
| Images and artwork | `static/` and the artwork data modules |

## Implementation conventions

Use typed `$props()`, local `$state`, `$derived` for computed values, and snippets for composition. Keep filters and shareable journey context in URL parameters. Reuse the existing components and domain functions before adding abstractions. Browser listeners, object URLs and overlay state belong to the component that creates them.

Preserve the current rendered design unless the task requests a visual change: layout, spacing, typography, artwork, cards, banners and drawers are part of the template. CSS loads as tokens, base, navigation, composition; component styles and route sheets then own their respective details.

For a dealer build, change content and identity in the copy. Source fixtures are not live inventory, and the enquiry flow prepares a local draft rather than submitting it to a backend.

## Commands

Use Node 22.12+ on the 22 line and the existing npm lockfile.

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 6461 --strictPort
npm run check
npm run build
```

Browser suites need `BASE_URL`; their commands and scenarios are in [docs/TESTING.md](docs/TESTING.md). Check the affected interaction at mobile and desktop sizes. Use focused Git diffs and preserve unrelated work. Explain any remaining failure directly; no extra audit documents are needed for routine edits.
