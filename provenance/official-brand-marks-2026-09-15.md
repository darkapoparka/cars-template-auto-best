# Official marque vectors and monochrome rendering — 2026-09-15

The mobile homepage brand discovery cards use locally stored SVG marks retrieved from the manufacturers’ own public websites.

| Brand | Local asset | Official source | Runtime treatment |
| --- | --- | --- | --- |
| Land Rover | `static/assets/images/brand-official/land-rover-dark-official.svg` | Land Rover global site dark logo asset | Stored byte-for-byte as downloaded; no colour or path edits. |
| Mercedes-Benz | `static/assets/images/brand-official/mercedes-benz-star-official.svg` | Mercedes-Benz Media star asset | Stored byte-for-byte as downloaded. The published file is the white/negative mark, so CSS renders that official vector black on the white card; it is not described as an official supplied black file. |
| Audi | `static/assets/images/brand-official/audi-rings-official.svg` | Audi global site rings asset | Stored byte-for-byte as downloaded; no colour or path edits. |

Source URLs at retrieval time:

- `https://www.landrover.com/content/dam/lrdx/logo/lrdx-brand-logo-dark.svg.res/JLRHASHC1C548E3405B6A6D4E81D098DF34281495954B84/lrdx-brand-logo-dark.svg`
- `https://media.mercedes-benz.com/assets/img/mb_logo_star.svg`
- `https://static.audi.com/assets/images/frontend/rings18-2GJCA2FU.svg`

The marks remain trademarks of their respective owners. They are used only as vehicle-marque navigation labels. The source sites and their usage terms remain authoritative.
