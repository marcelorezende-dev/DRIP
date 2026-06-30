// DRIP — Water Harvesting page generator.
// Renders one styled 1-pager per technique (locked to the approved
// "Semi-circular bunds" template) + the Library card blocks + pillarOf lines.
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DRIP = 'C:/Dev/DRIP/drip';
const DATA_DIR = path.join(__dirname, 'data');

const FAMILIES = [
  { key: 'in-situ',   label: 'In-situ moisture conservation',     icon: 'sprout' },
  { key: 'micro',     label: 'Micro-catchment harvesting',        icon: 'droplets' },
  { key: 'macro',     label: 'Macro-catchment harvesting',        icon: 'mountain' },
  { key: 'flood',     label: 'Floodwater harvesting &amp; spate',     icon: 'waves' },
  { key: 'rooftop',   label: 'Rooftop, courtyard &amp; domestic',     icon: 'house' },
  { key: 'storage',   label: 'Storage &amp; recharge',               icon: 'database' },
  { key: 'landscape', label: 'Landscape &amp; road-water harvesting', icon: 'route' },
];

const TOPBAR = `<div class="drip-topbar">
  <a class="db-brand" href="DRIP.html"><span class="db-dm">DRIP<span>.</span></span><span class="db-sub">Drylands Restoration Initiatives Platform</span></a>
  <nav class="db-nav">
    <a class="db-home" href="DRIP.html"><svg class="db-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg><span>Home</span></a>
    <a href="DRIP.html#story"><svg class="db-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg><span>About</span></a>
    <a href="DRIP Map.html"><svg class="db-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/></svg><span>Map</span></a>
    <a href="Library.html"><svg class="db-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg><span>Library</span></a>
    <a href="Community.html"><svg class="db-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span>Community</span></a>
    <a href="MARVEL.html"><svg class="db-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg><span>MARVEL</span></a>
    <a href="DRIP.html#transparency"><svg class="db-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg><span>Transparency and Data Policy</span></a>
    <div class="langsw" id="langsw" role="group" aria-label="Choose a language">
      <svg class="langsw-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
      <button type="button" class="flag flag-en is-on" data-lang="en" title="English" aria-label="English"></button>
      <button type="button" class="flag flag-es" data-lang="es" title="Español" aria-label="Español"></button>
      <button type="button" class="flag flag-fr" data-lang="fr" title="Français" aria-label="Français"></button>
      <button type="button" class="flag flag-ru" data-lang="ru" title="Русский" aria-label="Русский"></button>
      <button type="button" class="flag flag-ar" data-lang="ar" title="العربية" aria-label="العربية"></button>
      <button type="button" class="flag flag-zh" data-lang="zh" title="中文" aria-label="中文"></button>
    </div>
  </nav>
</div>`;

const esc = s => String(s ?? '');

// caption + credit are trusted rich HTML authored by us (links, <em>, etc.)
function bannerFig(b) {
  if (!b) return '';
  const credit = b.credit ? `<span class="credit">${b.credit}</span>` : '';
  const pos = b.objectPosition ? ` style="object-position:${esc(b.objectPosition)};"` : '';
  return `
 <figure class="figure banner">
  <img src="${esc(b.img)}" alt="${esc(b.alt)}" decoding="async"${pos}>
  <div class="fig-cap">${b.caption} ${credit}</div>
 </figure>`;
}

function inlineFig(f) {
  if (!f) return '';
  const credit = f.credit ? `<span class="credit">${f.credit}</span>` : '';
  return `
    <figure class="figure">
      <img src="${esc(f.img)}" alt="${esc(f.alt)}" decoding="async">
      <div class="fig-cap">${f.caption} ${credit}</div>
    </figure>`;
}

const wmLabel = { A: 'Agronomic', V: 'Vegetative', S: 'Structural', M: 'Management' };

function render(rec) {
  const what = (rec.whatItIs || []).map(p => `      <p>${p}</p>`).join('\n');
  const how = (rec.howItWorks || []).map(li => `        <li>${li}</li>`).join('\n');
  const facts = (rec.keyFacts || []).map(([dt, dd]) => `        <dt>${esc(dt)}</dt><dd>${dd}</dd>`).join('\n');
  const factsNote = rec.factsNote ? `      <p class="wsub" style="margin:.4rem 0 0">${rec.factsNote}</p>` : '';
  const callout = rec.callout ? `
    <div class="callout">
      <div class="ct">${esc(rec.callout.title)}</div>
      <p>${rec.callout.body}</p>
    </div>` : '';
  const variants = (rec.variants && rec.variants.length) ? `
    <section class="m-section">
      <h2 class="m-h">${esc(rec.variantsHeading || 'Variants & related forms')}</h2>
      <ul class="plain">
${rec.variants.map(li => `        <li>${li}</li>`).join('\n')}
      </ul>
    </section>` : '';
  const measures = (rec.wocat?.measures || []).map(m => `<span class="wm" data-m="${m}">${m}</span>`).join('');
  const measLbl = (rec.wocat?.measures || []).map(m => wmLabel[m] || m).join(' · ');
  const deg = (rec.wocat?.degradation || []).map(d => `<span class="wtag deg">${esc(d)}</span>`).join('');
  const sources = (rec.sources || []).map(s => `        <li>&bull; ${s}</li>`).join('\n');
  const refs = (rec.apaRefs || []).map(r => `      <li>${r}</li>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(rec.title)} – Water Harvesting | DRIP</title>
<link rel="stylesheet" href="drip-manual.css">
<style>:root{ --accent:#3E7CB1; --accent-deep:#2C5A82; }</style>
  <link rel="icon" type="image/png" href="assets/globe.png">
  <link rel="stylesheet" href="drip-topbar.css">
</head>
<body>

${TOPBAR}
<div class="printbar">
  <a class="btn" href="Library.html">← Library</a>
  <button class="btn primary" onclick="window.print()">⎙ Print / Save as PDF</button>
</div>

<article class="manual">
  <header class="masthead">
    <div class="mh-top">
      <span class="series">${esc(rec.series)}</span>
      <img class="brand-logo" src="assets/logo-color.png" alt="DSL-IP — Drylands Sustainable Landscapes Impact Programme">
    </div>
    <div class="mh-main"><div>
      <h1>${esc(rec.title)}</h1>
      <p class="subtitle">${esc(rec.subtitle)}</p>
    </div></div>
  </header>
${bannerFig(rec.banner)}
  <div class="body">
    <section class="m-section">
      <h2 class="m-h">What it is</h2>
${what}
    </section>
    <section class="m-section">
      <h2 class="m-h">How it works</h2>
      <ul class="ticks">
${how}
      </ul>
    </section>
    <section class="m-section">
      <h2 class="m-h">Key facts</h2>
      <dl class="kv">
${facts}
      </dl>
${factsNote}
    </section>
${inlineFig(rec.inlineFigure)}
${callout}
${variants}
  </div>

    <section class="m-section wocat">
    <h2 class="m-h">WOCAT classification</h2>
    <dl class="wocat-cl">
      <div class="wocat-row"><dt>Measures</dt><dd>${measures}<span class="wm-lbl">${measLbl}</span></dd></div>
      <div class="wocat-row"><dt>WOCAT group</dt><dd><span class="wtag group">${esc(rec.wocat?.group)}</span></dd></div>
      <div class="wocat-row"><dt>Degradation addressed</dt><dd>${deg}</dd></div>
    </dl>
    <p class="wocat-src">Classified per the <a class="inl" href="https://wocat.net/en/database/slm-practices-technologies-and-approaches/classifications-technologies/" target="_blank" rel="noopener">WOCAT SLM-Technologies classification</a> and the four water-harvesting groups of Mekdaschi Studer &amp; Liniger (2013).</p>
  </section>

<div class="colophon">
    <h2 class="m-h"><span class="n">✦</span>Source and links</h2>
    <p class="wsub" style="margin:0 0 .5rem">Drawn from the FAO / ICARDA <em>Webinars Series on Rainwater Harvesting</em> (NENA region, 2022):</p>
    <ul class="cite" style="list-style:none; margin:0 0 .6rem;">
${sources}
    </ul>
    <p class="wsub" style="margin:0 0 .4rem">Sources (APA, 7th ed.).</p>
    <ol class="apa-refs">
${refs}
    </ol>
    <div class="foot-meta">
      <span><b>Water Harvesting</b></span><span>${esc(rec.footMeta2)}</span>
      <span>DRIP · Knowledge &amp; Outreach</span><span>fao.org · drylands</span>
    </div>
  </div>
</article>

<script src="drip-home.js"></script>
  <script src="drip-i18n.js"></script>
</body>
</html>
`;
}

function card(rec) {
  const badge = rec.badge ? `\n          <span class="badge">${esc(rec.badge)}</span>` : '';
  return `        <a class="lcard" href="${esc(rec.file)}">${badge}
          <span class="ic"><i data-lucide="${esc(rec.icon)}"></i></span>
          <div class="meta">${esc(rec.cardMeta)}</div>
          <h4>${esc(rec.title)}</h4>
          <p>${esc(rec.cardOneliner)}</p>
          <span class="open">Open the 1-pager <i data-lucide="arrow-right"></i></span>
        </a>`;
}

// ---- load data ----
// Build a clean, ASCII, filesystem-safe filename from a title (no entities,
// no &, no illegal chars, accents stripped). Records may override via r.file.
const cleanFile = t => 'Water Harvesting - ' + t
  .normalize('NFD').replace(/[̀-ͯ]/g, '')   // strip accents (zai -> zai)
  .replace(/&amp;/g, 'and').replace(/&/g, 'and')
  .replace(/[\\/:*?"<>|()]/g, ' ')
  .replace(/\s+/g, ' ').trim() + '.html';

// Slugs whose auto-sourced image was verified WRONG/inappropriate — force text-only
// until a correct, properly-licensed image is sourced.
const NO_BANNER = new Set(['vallerani-mechanized-microcatchments', 'domestic-storage-tanks']);

const byFamily = {};
let all = [];
if (existsSync(DATA_DIR)) {
  for (const f of (await readdir(DATA_DIR)).filter(f => f.endsWith('.mjs'))) {
    const fam = path.basename(f, '.mjs');
    try {
      const mod = await import(pathToFileURL(path.join(DATA_DIR, f)).href);
      // Always sanitize generated-page filenames; only honor an explicit
      // file for the card-only record (semicircular page already on disk).
      const recs = (mod.default || []).map(r => ({ ...r, family: fam, file: (r.generatePage === false && r.file) ? r.file : cleanFile(r.title), banner: NO_BANNER.has(r.slug) ? null : r.banner }));
      byFamily[fam] = recs;
      all = all.concat(recs);
    } catch (e) {
      console.error(`!! failed to load ${f}: ${e.message}`);
    }
  }
}

// ---- write pages ----
let written = 0, cardsCount = 0;
for (const rec of all) {
  cardsCount++;
  if (rec.generatePage === false) continue;
  const out = path.join(DRIP, rec.file);
  await writeFile(out, render(rec), 'utf8');
  written++;
}

// ---- Library card blocks (grouped by family, in canonical order) ----
let blocks = '';
let pillar = '';
for (const fam of FAMILIES) {
  const recs = byFamily[fam.key];
  if (!recs || !recs.length) continue;
  blocks += `
    <div class="libgroup">
      <div class="lg-head"><i data-lucide="${fam.icon}"></i><h3>Water harvesting · ${fam.label}</h3><span class="ln"></span></div>
      <div class="cards">
${recs.map(card).join('\n')}
      </div>
    </div>
`;
  for (const r of recs) pillar += `    '${r.file}':'production',\n`;
}

await writeFile(path.join(__dirname, 'library-blocks.html'), blocks, 'utf8');
await writeFile(path.join(__dirname, 'pillarof.txt'), pillar, 'utf8');

console.log(`Loaded families: ${Object.keys(byFamily).join(', ')}`);
console.log(`Records: ${all.length} | pages written: ${written} | cards: ${cardsCount}`);
console.log(`Wrote library-blocks.html and pillarof.txt`);
for (const fam of FAMILIES) {
  const recs = byFamily[fam.key] || [];
  console.log(`  ${fam.key}: ${recs.length} — ${recs.map(r => r.title).join(', ')}`);
}
