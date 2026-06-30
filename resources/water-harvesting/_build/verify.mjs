import { readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const DATA = path.join(path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z]:)/, '$1'), 'data');
const ASSETS = 'C:/Dev/DRIP/drip/assets/water-harvesting';
for (const f of (await readdir(DATA)).filter(f => f.endsWith('.mjs'))) {
  let recs;
  try { recs = (await import(pathToFileURL(path.join(DATA, f)).href)).default; }
  catch (e) { console.log(`BAD ${f}: ${e.message}`); continue; }
  console.log(`\n### ${f} — ${recs.length} records`);
  for (const r of recs) {
    const img = r.banner?.img ? r.banner.img.split('/').pop() : null;
    const imgOk = img ? (existsSync(path.join(ASSETS, img)) ? 'IMG✓' : 'IMG✗MISSING') : 'no-banner';
    const gp = r.generatePage === false ? ' [card-only]' : '';
    console.log(`  - ${r.slug} | ${imgOk} | how:${(r.howItWorks||[]).length} facts:${(r.keyFacts||[]).length} src:${(r.sources||[]).length} | "${r.title}"${gp}`);
    if (!r.title || !r.subtitle || !r.wocat?.group) console.log(`      !! missing core field`);
    if (r.banner) { for (const k of ['img','alt','caption','credit']) if (!r.banner[k]) console.log(`      !! banner.${k} empty`); }
  }
}
