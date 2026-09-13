import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { launchBrowser, previewUrl } from './browser.mjs';
import { smokeReport } from './smoke-report.mjs';

const base = previewUrl();
const output = 'artifacts/typography-smoke';
await mkdir(output, { recursive: true });
const suite = await smokeReport(output, base);
const browser = await launchBrowser();
async function typeOf(locator) {
  return locator.evaluate(e => { const s = getComputedStyle(e); return { size: parseFloat(s.fontSize), weight: Number(s.fontWeight), height: e.getBoundingClientRect().height }; });
}
async function readable(page, name) {
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${name}: page overflow`);
  const clipped = await page.locator('button, input, select, textarea, dialog[open]').evaluateAll(nodes => nodes.filter(e => e.checkVisibility() && e.clientWidth > 0 && e.scrollWidth > e.clientWidth + 2 && getComputedStyle(e).textOverflow !== 'ellipsis').map(e => ({ text: e.textContent.trim().slice(0,60), class: e.className })));
  assert.deepEqual(clipped, [], `${name}: clipped controls`);
  await page.screenshot({ path: `${output}/${name}.png` });
}
try {
  for (const width of [320,390,768,1440]) {
    await suite.check(`typography and enquiry ${width}`, async () => {
      const page = await browser.newPage({ viewport: { width, height: width < 768 ? 844 : 1000 }, reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      try {
        await page.goto(`${base}/`, {waitUntil:'networkidle'});
        await page.evaluate(() => document.fonts.ready);
        if (width < 768) {
          const buy = page.getByRole('tab',{name:'Купи',exact:true});
          assert.equal((await typeOf(buy)).size,18);
          assert.equal((await typeOf(buy)).weight,500);
          await buy.focus(); await page.keyboard.press('ArrowRight');
          assert.equal(await page.getByRole('tab',{name:'Внос',exact:true}).getAttribute('aria-selected'),'true');
          await page.keyboard.press('ArrowLeft');
          assert.equal(await buy.getAttribute('aria-selected'),'true');
        }
        await readable(page,`${width}-home`);
        if (width < 768) {
          await page.locator('.dn-quick-search__trigger').click();
          assert.equal((await typeOf(page.locator('.dn-quick-search__mobile-footer button'))).size,18);
          await readable(page,`${width}-home-filters`);
          await page.keyboard.press('Escape');
          await page.goto(`${base}/listing-grid`,{waitUntil:'networkidle'});
          await page.locator('[aria-controls="dn-listing-filter-dialog"]:visible').first().click();
          assert.equal((await typeOf(page.locator('.dn-listing-filter__dialog-submit'))).size,18);
          await readable(page,`${width}-inventory-filters`);
          await page.keyboard.press('Escape');
        }
        await page.goto(`${base}/contact?topic=trade-in`,{waitUntil:'networkidle'});
        const start = page.locator('.dn-tradein-start');
        const primary = await typeOf(start), call = await typeOf(page.locator('.dn-tradein-call'));
        assert(primary.size > call.size && primary.size === 18 && primary.weight === 500);
        assert(primary.height >= 48);
        await readable(page,`${width}-sell`);
        await start.click();
        const sell = page.locator('.dn-tradein-dialog');
        await sell.locator('.dn-tradein-primary').click();
        assert.equal(await sell.locator('[name="make"]').evaluate(e=>e===document.activeElement),true);
        for(const [field,value] of Object.entries({make:'Audi',model:'A6 Avant',year:'2020',mileage:'85000'})) await sell.locator(`[name="${field}"]`).fill(value);
        await readable(page,`${width}-sell-fields`);
        await sell.locator('.dn-tradein-primary').click();
        await readable(page,`${width}-sell-photos`);
        await sell.locator('.dn-tradein-primary').click();
        assert.match(await sell.locator('.dn-tradein-review-card').innerText(),/Audi A6 Avant/);
        await readable(page,`${width}-sell-review`);
        await page.keyboard.press('Escape');
        assert.equal(await start.evaluate(e=>e===document.activeElement),true);
        await page.locator('.dn-tradein-info-drawer__peek').click();
        await readable(page,`${width}-sell-help`); await page.keyboard.press('Escape');

        await page.goto(`${base}/contact?topic=import`,{waitUntil:'networkidle'});
        const importStart=page.getByRole('button',{name:/^Заяви внос/});
        assert.equal((await typeOf(importStart)).size,18);
        await importStart.click();
        assert.equal(await page.locator('#enquiry-link-error').isVisible(),true);
        await page.locator('#enquiry-listing-link').fill('https://example.com/car');
        await importStart.click();
        const enquiry=page.locator('.dn-enquiry');
        assert.equal(await enquiry.getAttribute('open'),'');
        await readable(page,`${width}-import-fields`);
        await enquiry.locator('.dn-enquiry-footer .dn-enquiry-primary').click();
        await readable(page,`${width}-import-contact`);
        await enquiry.locator('.dn-enquiry-footer .dn-enquiry-primary').click();
        await readable(page,`${width}-import-review`);
        await page.keyboard.press('Escape');
        assert.equal(await importStart.evaluate(e=>e===document.activeElement),true);
        await page.getByRole('button',{name:'Инфо',exact:true}).click();
        await page.locator('#enquiry-import-info').fill('BMW X5, дизел, 2020, автоматик');
        await readable(page,`${width}-import-criteria`);
        await importStart.click();
        assert.equal(await enquiry.getAttribute('open'),'');
        await page.keyboard.press('Escape');
        await page.getByRole('button',{name:'Линк',exact:true}).click();
        await readable(page,`${width}-import`);
        assert.deepEqual(errors,[]);
      } finally { await page.close(); }
    });
  }
} finally { await browser.close(); await suite.finish(); }
