# Template reference — Auto Best

## Identity
- Repository: `darkapoparka/cars-template-auto-best`
- Key: `auto-best`
- Portfolio role: **core**
- Design position: full-service dealership / strongest all-rounder
- Stack: SvelteKit + Vite
- Primary entry: `/`
- Suggested standalone review port: `6461`

This is a **template master**, not a sendable dealer demo. The baseline intentionally preserves source/sample material for design fidelity; every lead copy requires a complete identity and content sweep.

## Install and run
```text
npm ci
npm run dev -- --host 127.0.0.1 --port 6461 --strictPort
```

## Primary personalization surface
- `src/lib/config/brand.ts`
- `src/lib/config/template.ts`
- `src/lib/data/company.ts`
- `src/lib/data/inventory.ts`
- `src/lib/data/home.ts`
- `src/lib/data/editorial.ts`
- `src/lib/styles/tokens.css`
- `src/app.css`
- `static/`

Do not assume these are the only identity consumers. Search every retained route, data module, metadata definition and static asset before declaring a skin complete.

## Representative QA routes
- `/`
- `/listing-grid`
- `/listing-detail-v1/1`
- `/contact`
- `/about-us`
- `/blog`

## Required checks
- `npm run validate`
- `npm run quality  # when browser smoke dependencies are available`

## Current constraints
Keep the native SvelteKit composition. Sample/source contact, social, video and stock content may still exist and must be replaced or explicitly disclosed in every lead copy.

For `modern`, local preview also requires the environment documented in `docs/QA.md`; provider services remain unconfigured unless a lead task explicitly wires them. For `carwow`, use direct Vite for a selectable port because the inherited source dev wrapper fixes port 6517.

## Source lineage
Split on 2026-09-10 from the live working tree at `J:/cars/templates/auto-best`. The split deliberately captured local working-tree changes, including changes newer than the `cars` repository HEAD. Historical root instructions were archived under `docs/legacy/from-cars-2026-09-10/`; use them only for provenance, never as current operating instructions.

## Portfolio policy
Standard showroom lead = three variants: `auto-best`, `carwow`, `modern`. Add `import` only when the dealer's real offer includes sourcing/import/transport/order-from-Europe or equivalent. Do not add a fourth design merely to increase the count.
