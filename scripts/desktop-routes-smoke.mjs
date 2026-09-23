import assert from 'node:assert/strict';
import { launchBrowser, previewUrl } from './browser.mjs';
import { returningContext } from './locale-smoke-fixture.mjs';
import { smokeReport } from './smoke-report.mjs';

const base = previewUrl();
const output = 'artifacts/desktop-routes-smoke';
const suite = await smokeReport(output, base);
const browser = await launchBrowser();
const routes = ['', 'listing-grid', 'about-us', 'blog', 'contact'];

try {
  for (const locale of ['bg', 'en']) {
    for (const width of [390, 992, 1024, 1440, 1920]) {
      const context = await returningContext(browser, { viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      for (const route of routes) {
        await suite.check(`${locale}/${route || 'home'} at ${width}`, async () => {
          const errors = [];
          const onError = error => errors.push(error.message);
          page.on('pageerror', onError);
          try {
            const response = await page.goto(`${base}/${locale}/${route}`, { waitUntil: 'networkidle' });
            assert.equal(response.status(), 200);
            await page.evaluate(() => document.fonts.ready);
            // Scroll before screenshots so native lazy images are actually requested.
            for (let y = 0; y < await page.evaluate(() => document.documentElement.scrollHeight); y += 800) {
              await page.evaluate(y => scrollTo(0, y), y);
              await page.waitForTimeout(40);
            }
            await page.evaluate(async () => {
              await Promise.all([...document.images].filter(i => i.getBoundingClientRect().width).map(i => i.decode().catch(() => {})));
              scrollTo(0, 0);
            });
            const geometry = await page.evaluate(() => {
              const hero = document.querySelector('.dn-route-hero');
              const copy = hero.querySelector('.dn-route-hero__copy');
              const heading = hero.querySelector('h1');
              const lead = copy.querySelector('p');
              const rect = e => e?.getBoundingClientRect().toJSON();
              const controls = document.querySelector('.dn-search__desktop-form, .dn-listing-desktop-discovery, .dn-blog-toolbar, .dn-about-hero .dn-about-button, .dn-contact-actions');
              return {
                hero: rect(hero), copy: rect(copy), heading: rect(heading), lead: rect(lead), controls: rect(controls),
                header: rect(document.querySelector('.dn-header-fixed')),
                backgroundImage: getComputedStyle(hero).backgroundImage,
                font: getComputedStyle(heading).fontFamily,
                headingSize: getComputedStyle(heading).fontSize,
                leadSize: getComputedStyle(lead).fontSize,
                overflow: document.documentElement.scrollWidth - innerWidth,
                broken: [...document.images].filter(i => i.getBoundingClientRect().width && !i.naturalWidth).map(i => i.currentSrc)
              };
            });
            assert(geometry.overflow <= 1, 'Horizontal page overflow');
            assert.deepEqual(geometry.broken, [], 'Broken visible images');
            assert.deepEqual(errors, [], 'Browser runtime errors');
            if (width >= 992) {
              assert.equal(geometry.hero.height, 540, 'Shared desktop hero height');
              assert.equal(geometry.backgroundImage, 'none', 'Solid desktop hero surface');
              assert.equal(geometry.headingSize, width < 1200 ? '42px' : '48px');
              assert.equal(geometry.leadSize, '18px');
              assert(geometry.copy.y >= geometry.header.bottom + 8, 'Hero text clears navigation');
              assert(geometry.controls.y >= geometry.copy.bottom + 20, 'Hero controls clear copy');
              assert(geometry.controls.bottom <= geometry.hero.bottom + 1, 'Hero controls fit banner');
              assert(geometry.lead.y >= geometry.heading.bottom, 'Title and lead do not overlap');
              // Verify actual glyph rendering, including Cyrillic, rather than only the CSS font stack.
              const cdp = await context.newCDPSession(page);
              await cdp.send('DOM.enable');
              await cdp.send('CSS.enable');
              const { root } = await cdp.send('DOM.getDocument');
              const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: '.dn-route-hero h1' });
              const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId });
              assert(fonts.length && fonts.every(font => font.familyName.includes('Onest')), 'Headings render in bundled Onest');
              await cdp.detach();
            }
            if (width === 1440 || width === 390) {
              await page.screenshot({ path: `${output}/${locale}-${width}-${route || 'home'}.png`, fullPage: true });
            }
            if (route === 'blog' && width === 1440) {
              const category = page.locator('.dn-blog-categories a:not(.active)').first();
              const selected = await page.locator('.dn-blog-categories .active').evaluate(e => getComputedStyle(e).backgroundColor);
              await category.hover();
              assert.equal(await category.evaluate(e => getComputedStyle(e).backgroundColor), selected, 'Category hover preserves the red surface behind white text');
              const search = page.locator('#dn-blog-search');
              await search.focus();
              assert.equal(await search.evaluate(e => getComputedStyle(e).outlineStyle), 'solid', 'Search has a visible focus outline');
            }
            return geometry;
          } finally {
            page.off('pageerror', onError);
          }
        });
      }
      await context.close();
    }
  }
} finally {
  await browser.close();
  await suite.finish();
}
