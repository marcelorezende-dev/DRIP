/* ============================================================================
   DRIP ← WOCAT — build-time data sync
   ----------------------------------------------------------------------------
   Pulls SLM Technologies & Approaches from the WOCAT / QCAT API v2, PRE-FILTERS
   them to drylands relevance, re-shapes each record into the DRIP card schema
   (summary + WOCAT classification + DRIP categorisation) and writes the static
   file `wocat-data.js` that `WOCAT Library.html` renders.

   WHY build-time (not a live browser call):
     • DRIP is a static GitHub Pages site — no server to hide a secret token in,
       and the QCAT API is server-to-server (no browser CORS for github.io).
     • So we fetch ONCE at publish time (locally or in CI), commit the JSON, and
       the pages load it same-origin. No token ever reaches the browser.

   USAGE
     WOCAT_API_TOKEN=xxxxxxxx node scripts/fetch-wocat.mjs           # live sync
     node scripts/fetch-wocat.mjs --sample                          # (re)write the sample file
     node scripts/fetch-wocat.mjs --limit 50                        # cap records (testing)
   Requires Node 18+ (uses global fetch). Token: see scripts/README-wocat.md.

   ⚠ CALIBRATION NEEDED ONCE A TOKEN EXISTS
     The QCAT *detail* response is a deeply-nested `section → children → value`
     tree whose exact question-group keys are edition-specific. The extractor
     below walks that tree heuristically (by key/label substrings) so it is
     resilient, but the KEY_HINTS map should be confirmed against one real
     response (run with --dump to print the first record's raw detail JSON).
   ============================================================================ */

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

/* ---------- CONFIG --------------------------------------------------------- */
const API_BASE = 'https://qcat.wocat.net/en/api/v2';
const VIEW_BASE = 'https://qcat.wocat.net/en/wocat'; // public human-readable pages
const OUT_FILE  = join(ROOT, 'wocat-data.js');
const TOKEN     = process.env.WOCAT_API_TOKEN || '';

const argv   = process.argv.slice(2);
const FLAGS  = new Set(argv.filter(a => a.startsWith('--')));
const argVal = (name, def) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : def; };
const LIMIT  = Number(argVal('--limit', '0')) || 0;   // 0 = no cap
const SAMPLE = FLAGS.has('--sample');
const DUMP   = FLAGS.has('--dump');

/* Dryland pre-filter. A record is kept if ANY of its countries is in this set
   (matched case-insensitively, substring-tolerant). Tune freely — this is the
   DSL-IP footprint plus the platform's reference biomes. Empty set = keep all. */
const DRYLAND_COUNTRIES = new Set([
  'brazil',                                   // Caatinga (reference biome)
  'angola','botswana','malawi','mozambique','namibia','tanzania','zambia','zimbabwe', // miombo–mopane
  'burkina faso','kenya','niger','mali','senegal','ethiopia','sudan','chad','nigeria', // sahel / drylands
  'kazakhstan','mongolia','uzbekistan','india','pakistan','morocco','tunisia','jordan'
]);

/* country → DRIP biome tag (Typologies §6). Anything unmapped = "Global". */
const COUNTRY_BIOME = {
  'brazil':'Caatinga',
  'angola':'Miombo–Mopane','botswana':'Miombo–Mopane','malawi':'Miombo–Mopane',
  'mozambique':'Miombo–Mopane','namibia':'Miombo–Mopane','tanzania':'Miombo–Mopane',
  'zambia':'Miombo–Mopane','zimbabwe':'Miombo–Mopane'
};

/* WOCAT technology group → DRIP farm-skill-tree cluster (Typologies §2).
   Substring match against the lower-cased group label; first hit wins. */
const GROUP_CLUSTER = [
  [['water harvesting','groundwater','surface water','water diversion','irrigation','drainage','wetland'], 'Water harvesting'],
  [['soil fertility','minimal soil','ground/vegetation cover','ground cover','waste','post-harvest','pest'], 'Soil & fertility'],
  [['agroforestry','forest','windbreak','shelterbelt','area closure','home gardens','beekeeping'], 'Trees & agroforestry'],
  [['rotational','crop','plant varieties','disaster'], 'Crops & cropping'],
  [['pastoralism','grazing','livestock','animal breeds'], 'Livestock & fodder']
];

/* Heuristic key/label hints for the nested detail tree. Each field collects the
   text of any value whose key OR section-label contains one of these substrings.
   ⚠ confirm against a real --dump response and trim/extend as needed. */
const KEY_HINTS = {
  summary:     ['definition','brief description','description of the technology','description of the approach'],
  country:     ['country'],
  measures:    ['slm measures','measures'],
  groups:      ['slm group','technology group','group of','main category'],
  landuse:     ['land use','landuse','tech_landuse'],
  degradation: ['degradation','tech_degradation','land degradation']
};

/* WOCAT measure letters for normalisation. */
const MEASURE_LETTER = { agronomic:'A', vegetative:'V', structural:'S', management:'M' };

/* ---------- HTTP ----------------------------------------------------------- */
async function api(path) {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: { 'Authorization': `Token ${TOKEN}`, 'Accept': 'application/json' }
  });
  if (res.status === 401 || res.status === 403)
    throw new Error(`AUTH (${res.status}). The token was rejected or lacks API access — see scripts/README-wocat.md.`);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

/* Walk every page of a paginated list endpoint. */
async function listAll(type) {
  const out = [];
  let next = `/questionnaires/?type=${type}`;
  while (next) {
    const page = await api(next);
    out.push(...(page.results || []));
    if (LIMIT && out.length >= LIMIT) return out.slice(0, LIMIT);
    next = page.next || '';
    process.stdout.write(`\r  ${type}: ${out.length}${page.count ? '/' + page.count : ''}`);
  }
  process.stdout.write('\n');
  return out;
}

/* ---------- nested-detail extraction -------------------------------------- */
/* Gather the value(s) of any node whose OWN key/label matches a hint. We match
   on the node itself (not inherited ancestor context) so a broad section label
   like "Specifications" can't sweep in every descendant value. */
function collect(node, hints, bag) {
  if (node == null) return;
  if (Array.isArray(node)) { node.forEach(n => collect(n, hints, bag)); return; }
  if (typeof node === 'object') {
    const key = (node.keyword || node.key || node.name || '').toString();
    const label = (typeof node.label === 'string' ? node.label : '') || '';
    const here = (key + ' ' + label).toLowerCase();
    const hit = here.trim() !== '' && hints.some(h => here.includes(h));
    // a leaf value can be node.value (string) or node.value[].value
    if (hit) {
      const v = node.value;
      if (typeof v === 'string') bag.add(stripHtml(v));
      else if (Array.isArray(v)) v.forEach(x => {
        if (typeof x === 'string') bag.add(stripHtml(x));
        else if (x && typeof x.value === 'string') bag.add(stripHtml(x.value));
      });
    }
    // recurse into every property (children carry their own key/label to match)
    for (const val of Object.values(node)) collect(val, hints, bag);
  }
}
function extract(detail, field) {
  const bag = new Set();
  collect(detail, KEY_HINTS[field], bag);
  return [...bag].map(s => s.trim()).filter(Boolean);
}
const stripHtml = s => String(s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const firstSentence = s => { const t = stripHtml(s); const m = t.match(/^.*?[.!?](\s|$)/); return (m ? m[0] : t).slice(0, 320).trim(); };

/* ---------- transform: raw → DRIP card ------------------------------------ */
function biomeFor(countries) {
  for (const c of countries) { const b = COUNTRY_BIOME[c.toLowerCase()]; if (b) return b; }
  return 'Global';
}
function clusterFor(groups) {
  const hay = groups.join(' ').toLowerCase();
  for (const [subs, cluster] of GROUP_CLUSTER) if (subs.some(s => hay.includes(s))) return cluster;
  return null;
}
function measuresFor(rawMeasures) {
  const set = new Set();
  rawMeasures.join(' ').toLowerCase().split(/[^a-z]+/).forEach(w => { if (MEASURE_LETTER[w]) set.add(MEASURE_LETTER[w]); });
  return [...set];
}
function toCard(item, detail) {
  const code = item.code || '';
  const qtype = code.startsWith('approaches') ? 'approach' : 'technology';
  const countries = uniq(extract(detail, 'country'));
  const groups = uniq(extract(detail, 'groups'));
  const summary = firstSentence(extract(detail, 'summary')[0] || '') || item.name || '';
  const view = item.url ? `https://qcat.wocat.net${item.url}` : `${VIEW_BASE}/${qtype === 'approach' ? 'approaches' : 'technologies'}/view/${code}/`;
  return {
    code, qtype,
    title: item.name || code,
    summary,
    url: view,
    country: countries,
    measures: qtype === 'technology' ? measuresFor(extract(detail, 'measures')) : [],
    groups,
    landuse: uniq(extract(detail, 'landuse')),
    degradation: uniq(extract(detail, 'degradation')),
    biome: biomeFor(countries),
    cluster: clusterFor(groups),
    updated: (item.updated || '').slice(0, 10)
  };
}
const uniq = arr => [...new Set(arr)];
const isDryland = card => DRYLAND_COUNTRIES.size === 0 ||
  card.country.some(c => [...DRYLAND_COUNTRIES].some(d => c.toLowerCase().includes(d)));

/* ---------- output --------------------------------------------------------- */
async function writeData(items, sample) {
  const meta = {
    source: 'WOCAT / QCAT API v2 (qcat.wocat.net)',
    endpoint: `${API_BASE}/questionnaires/`,
    generated: new Date().toISOString().slice(0, 10),
    count: items.length,
    sample: !!sample,
    filter: sample ? 'hand-picked sample' : `dryland countries (${DRYLAND_COUNTRIES.size})`
  };
  const banner = `/* ============================================================================
   DRIP ← WOCAT data — GENERATED FILE, do not edit by hand.
   Produced by scripts/fetch-wocat.mjs from the WOCAT / QCAT API v2.
   ${sample ? 'THIS IS SAMPLE DATA (sample:true) — run a live sync to replace it.' : 'Live snapshot.'}
   Generated: ${meta.generated}
   ============================================================================ */\n`;
  const body = `window.WOCAT_DATA = ${JSON.stringify({ meta, items }, null, 2)};\n`;
  await writeFile(OUT_FILE, banner + body, 'utf8');
  console.log(`\n✔ wrote ${OUT_FILE} — ${items.length} record(s)${sample ? ' (sample)' : ''}.`);
}

/* ---------- main ----------------------------------------------------------- */
async function main() {
  if (SAMPLE) { await writeData(SAMPLE_ITEMS, true); return; }

  if (!TOKEN) {
    console.error([
      '✖ No WOCAT_API_TOKEN set — cannot run a live sync.',
      '  Get a token: see scripts/README-wocat.md (register at qcat.wocat.net, then',
      '  obtain an application token / POST /api/v2/auth/login/).',
      '  To (re)generate the placeholder sample instead, run:  node scripts/fetch-wocat.mjs --sample'
    ].join('\n'));
    process.exit(1);
  }

  console.log('Fetching WOCAT questionnaires …');
  const list = [...await listAll('technologies'), ...await listAll('approaches')];
  console.log(`  ${list.length} questionnaire(s) listed. Fetching details …`);

  const cards = [];
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    try {
      const detail = await api(item.details || `/questionnaires/${item.code}/`);
      if (DUMP && i === 0) { console.log('\n--- RAW DETAIL (first record) ---\n', JSON.stringify(detail, null, 2).slice(0, 6000)); }
      cards.push(toCard(item, detail));
    } catch (e) { console.warn(`  ! skip ${item.code}: ${e.message}`); }
    process.stdout.write(`\r  details: ${i + 1}/${list.length}`);
  }
  process.stdout.write('\n');

  const kept = cards.filter(isDryland).sort((a, b) => (b.updated || '').localeCompare(a.updated || ''));
  console.log(`  pre-filtered to drylands: ${kept.length}/${cards.length} kept.`);
  await writeData(kept, false);
}

/* ---------- SAMPLE (used by --sample and as the shipped placeholder) -------- */
/* Plausible dryland WOCAT entries in the DRIP card schema. Clearly flagged
   sample:true so the library page shows a "sample data" notice until a real
   sync runs. Codes/links point at the live WOCAT view pages. */
const SAMPLE_ITEMS = [
  { code:'technologies_1937', qtype:'technology', title:'Zaï — planting pits for water harvesting',
    summary:'Hand-dug pits that concentrate runoff and manure to rehabilitate crusted, degraded drylands and restore cereal yields.',
    url:'https://qcat.wocat.net/en/wocat/technologies/view/technologies_1937/',
    country:['Burkina Faso'], measures:['A','S'], groups:['Water harvesting','Integrated soil fertility management'],
    landuse:['Cropland'], degradation:['Soil erosion by water','Chemical soil deterioration'], biome:'Global', cluster:'Water harvesting', updated:'2019-05-14' },
  { code:'technologies_2456', qtype:'technology', title:'Farmer-managed natural regeneration (FMNR)',
    summary:'Protecting and pruning naturally regenerating tree stumps in cropland to rebuild tree cover, fodder and soil fertility.',
    url:'https://qcat.wocat.net/en/wocat/technologies/view/technologies_2456/',
    country:['Niger'], measures:['V','M'], groups:['Agroforestry','Natural and semi-natural forest management'],
    landuse:['Cropland','Forest / woodlands'], degradation:['Biological degradation','Soil erosion by wind'], biome:'Global', cluster:'Trees & agroforestry', updated:'2018-11-02' },
  { code:'technologies_3702', qtype:'technology', title:'Stone bunds (contour stone lines)',
    summary:'Contour-aligned stone lines that slow runoff, trap sediment and recharge soil moisture on gentle dryland slopes.',
    url:'https://qcat.wocat.net/en/wocat/technologies/view/technologies_3702/',
    country:['Mali'], measures:['S'], groups:['Cross-slope measure','Water harvesting'],
    landuse:['Cropland'], degradation:['Soil erosion by water'], biome:'Global', cluster:'Water harvesting', updated:'2017-09-20' },
  { code:'technologies_4333', qtype:'technology', title:'Grazing-land management with area closure',
    summary:'Resting degraded rangeland through seasonal closure and controlled stocking to let grass and browse recover.',
    url:'https://qcat.wocat.net/en/wocat/technologies/view/technologies_4333/',
    country:['Tanzania'], measures:['M','V'], groups:['Pastoralism and grazing land management','Area closure (stop use, support restoration)'],
    landuse:['Grazing land'], degradation:['Biological degradation'], biome:'Miombo–Mopane', cluster:'Livestock & fodder', updated:'2020-03-11' },
  { code:'technologies_4534', qtype:'technology', title:'Silvopastoral management of dry woodland',
    summary:'Thinning and managing woody cover to balance forage, fuelwood and standing trees in semi-arid woodland.',
    url:'https://qcat.wocat.net/en/wocat/technologies/view/technologies_4534/',
    country:['Zambia'], measures:['V','M'], groups:['Agroforestry','Pastoralism and grazing land management'],
    landuse:['Mixed'], degradation:['Biological degradation'], biome:'Miombo–Mopane', cluster:'Trees & agroforestry', updated:'2019-07-08' },
  { code:'technologies_5120', qtype:'technology', title:'Caatinga thinning for fodder (raleamento)',
    summary:'Selective thinning of the Caatinga woody layer to release the herb layer and lift dry-season forage without clearing.',
    url:'https://qcat.wocat.net/en/wocat/technologies/view/technologies_5120/',
    country:['Brazil'], measures:['V','M'], groups:['Pastoralism and grazing land management','Natural and semi-natural forest management'],
    landuse:['Grazing land','Forest / woodlands'], degradation:['Biological degradation'], biome:'Caatinga', cluster:'Livestock & fodder', updated:'2021-02-19' },
  { code:'technologies_5260', qtype:'technology', title:'Half-moons (demi-lunes) for rangeland restoration',
    summary:'Semi-circular earth bunds that capture runoff to re-establish grass and trees on crusted, bare drylands.',
    url:'https://qcat.wocat.net/en/wocat/technologies/view/technologies_5260/',
    country:['Niger'], measures:['S','V'], groups:['Water harvesting','Improved ground/vegetation cover'],
    landuse:['Grazing land','Unproductive land'], degradation:['Soil erosion by water','Soil erosion by wind'], biome:'Global', cluster:'Water harvesting', updated:'2018-06-30' },
  { code:'technologies_5588', qtype:'technology', title:'Conservation agriculture with mulch cover',
    summary:'Minimum tillage, permanent soil cover and rotation to conserve moisture and rebuild soil organic matter in dry cropland.',
    url:'https://qcat.wocat.net/en/wocat/technologies/view/technologies_5588/',
    country:['Zimbabwe'], measures:['A','M'], groups:['Minimal soil disturbance','Improved ground/vegetation cover','Rotational system (rotation, fallows, shifting cultivation)'],
    landuse:['Cropland'], degradation:['Chemical soil deterioration','Physical soil deterioration'], biome:'Miombo–Mopane', cluster:'Soil & fertility', updated:'2020-10-05' },
  { code:'approaches_2350', qtype:'approach', title:'Participatory action research on water harvesting',
    summary:'A farmer-led approach co-designing and testing water-harvesting practices through field schools and exchange visits.',
    url:'https://qcat.wocat.net/en/wocat/approaches/view/approaches_2350/',
    country:['Kenya'], measures:[], groups:[],
    landuse:['Cropland'], degradation:[], biome:'Global', cluster:null, updated:'2017-06-28' },
  { code:'approaches_3015', qtype:'approach', title:'Community by-laws for grazing management',
    summary:'A governance approach in which communities set, monitor and enforce by-laws to manage shared grazing land.',
    url:'https://qcat.wocat.net/en/wocat/approaches/view/approaches_3015/',
    country:['Tanzania'], measures:[], groups:[],
    landuse:['Grazing land'], degradation:[], biome:'Miombo–Mopane', cluster:null, updated:'2019-01-22' },
  { code:'approaches_3322', qtype:'approach', title:'Farmer field schools for FMNR scale-up',
    summary:'Season-long, field-based learning cycles that spread farmer-managed natural regeneration farmer-to-farmer.',
    url:'https://qcat.wocat.net/en/wocat/approaches/view/approaches_3322/',
    country:['Malawi'], measures:[], groups:[],
    landuse:['Cropland','Forest / woodlands'], degradation:[], biome:'Miombo–Mopane', cluster:null, updated:'2020-08-14' },
  { code:'approaches_3540', qtype:'approach', title:'Fundo de Pasto — community land stewardship',
    summary:'A territorial, community-led approach to conserving and recomposing the Caatinga on shared pasture lands.',
    url:'https://qcat.wocat.net/en/wocat/approaches/view/approaches_3540/',
    country:['Brazil'], measures:[], groups:[],
    landuse:['Grazing land','Forest / woodlands'], degradation:[], biome:'Caatinga', cluster:null, updated:'2021-04-09' }
];

main().catch(e => { console.error('\n✖', e.message); process.exit(1); });
