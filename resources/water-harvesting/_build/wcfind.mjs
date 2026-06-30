// Wikimedia Commons image finder.
// Usage: node wcfind.mjs "search term" ["term2" ...]
// Prints candidate FILES with license / author / dimensions / description / page / thumb URL.
// Only photos (jpg/png) are shown. Pick one with an ALLOWED license (see AGENT_GUIDE.md).
const terms = process.argv.slice(2);
if (!terms.length) { console.error('give one or more search terms'); process.exit(1); }
const UA = 'DRIP-RWH/1.0 (FAO drylands platform; dsl-ip@fao.org)';
const seen = new Set();
for (const t of terms) {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=10'
    + '&gsrsearch=' + encodeURIComponent(t)
    + '&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=1600';
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA } });
    const j = await r.json();
    const pages = j?.query?.pages || {};
    console.log(`\n==== TERM: ${t} ====`);
    for (const p of Object.values(pages)) {
      const ii = p.imageinfo?.[0]; if (!ii) continue;
      const title = p.title.replace(/^File:/, '');
      if (!/\.(jpe?g|png)$/i.test(title)) continue;
      if (seen.has(title)) continue; seen.add(title);
      const m = ii.extmetadata || {};
      const lic = (m.LicenseShortName?.value) || '?';
      const artist = (m.Artist?.value || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 90);
      const desc = (m.ImageDescription?.value || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 180);
      console.log(`FILE : ${title}`);
      console.log(`LIC  : ${lic}  | ${ii.width}x${ii.height}`);
      console.log(`BY   : ${artist}`);
      console.log(`DESC : ${desc}`);
      console.log(`PAGE : ${ii.descriptionurl}`);
      console.log(`THUMB: ${ii.thumburl || ii.url}`);
      console.log('');
    }
  } catch (e) { console.log('ERR', t, e.message); }
}
