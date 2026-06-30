import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
const DRIP = 'C:/Dev/DRIP/drip';
const lib = await readFile(DRIP + '/Library.html', 'utf8');

// 1) every WH card href resolves to a file
const hrefs = [...lib.matchAll(/href="(Water Harvesting - [^"]+\.html)"/g)].map(m => m[1]);
let missingPages = 0;
for (const h of hrefs) if (!existsSync(`${DRIP}/${h}`)) { console.log('MISSING PAGE:', h); missingPages++; }

// 2) every WH page references CSS/scripts and its banner image (if any) exists; no leftover bad refs
let pagesChecked = 0, missingImg = 0, withImg = 0, noImg = 0;
const uniq = [...new Set(hrefs)];
for (const h of uniq) {
  const p = await readFile(`${DRIP}/${h}`, 'utf8');
  pagesChecked++;
  const imgs = [...p.matchAll(/<img src="(assets\/[^"]+)"/g)].map(m => m[1]);
  if (imgs.length === 0) noImg++;
  let hasBanner = false;
  for (const im of imgs) {
    hasBanner = true;
    if (!existsSync(`${DRIP}/${decodeURIComponent(im)}`)) { console.log(`MISSING IMG in ${h}: ${im}`); missingImg++; }
  }
  if (hasBanner) withImg++;
  // basic sanity: must link manual css + i18n
  if (!p.includes('drip-manual.css')) console.log('!! no drip-manual.css in', h);
  if (!p.includes('drip-i18n.js')) console.log('!! no drip-i18n.js in', h);
}
console.log(`\nPages referenced by cards: ${hrefs.length} (unique ${uniq.length})`);
console.log(`Missing pages: ${missingPages} | pages checked: ${pagesChecked}`);
console.log(`Pages with banner image: ${withImg} | without: ${noImg} | missing image files: ${missingImg}`);
