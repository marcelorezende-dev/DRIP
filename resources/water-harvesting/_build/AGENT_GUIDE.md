# Agent guide — authoring a Water-Harvesting family data file

You produce ONE file: `whbuild/data/<family>.mjs`, an ES module that
`export default` an array of technique records. A generator turns each record
into a styled DRIP 1-pager + a Library card. Read the gold reference
`whbuild/_gold-example.mjs` first — copy its shape and depth exactly.

## Hard rules
- **Do not invent facts.** Use only the briefs handed to you in your prompt
  (definition / how / facts / suitability / regions / sources). If a field
  isn't given, omit it. Numbers must come from the brief.
- Keep the **voice** of the gold example: plain, concrete, UK-ish English, an
  en dash "–" for asides, `&amp;` for ampersands inside HTML text, `<strong>`
  for emphasis. ~2 short paragraphs for `whatItIs`, 4–6 `howItWorks` bullets,
  6–9 `keyFacts` rows.
- HTML strings are trusted (links, `<em>`, `<strong>` allowed). Escape literal
  ampersands as `&amp;`.

## Record schema (fields)
```
{
  slug, file,                 // file = `Water Harvesting - <Title>.html` (exact, with spaces)
  title, icon,                // icon = a valid lucide name (given in your brief)
  badge: 'RWH',
  cardMeta, cardOneliner,     // card meta line + 1-sentence card summary
  series, subtitle,           // masthead: series e.g. 'Water Harvesting · Floodwater'; subtitle = 1 line
  banner: { img, alt, caption, credit, objectPosition? } | null,   // see IMAGES
  whatItIs: [ '<p html>', '<p html>' ],
  howItWorks: [ '<li html>', ... ],
  keyFacts: [ ['Label','value html'], ... ],
  factsNote: '<small html>' ,                 // optional: where the numbers come from
  inlineFigure: { img, alt, caption, credit } | null,   // usually null (one image is fine)
  callout: { title, body } | null,            // optional 1 tip/caution box
  variantsHeading, variants: [ '<li html>', ... ] | null,  // optional folded variants
  wocat: { measures:[...], group, degradation:[...] },     // measures from A/V/S/M
  sources: [ '<li html>', ... ],              // presenter (institution) – Module N
  apaRefs: [ '<ref html>', ... ],             // see shared refs below
  footMeta2,                                  // e.g. 'Floodwater · spate irrigation'
}
```
WOCAT measure letters: **A** Agronomic · **V** Vegetative · **S** Structural · **M** Management.

## Shared APA references (reuse the ones that fit; the brief tells you which)
- `Critchley, W., &amp; Siegert, K. (1991). <em>Water harvesting: A manual for the design and construction of water harvesting schemes for plant production</em>. FAO. <a class="inl" href="https://www.fao.org/4/u3160e/u3160e00.htm" target="_blank" rel="noopener">Link</a>`
- `Mekdaschi Studer, R., &amp; Liniger, H. (2013). <em>Water harvesting: Guidelines to good practice</em>. CDE/Bern, RAIN, MetaMeta, IFAD. <a class="inl" href="https://www.wocat.net/library/media/47/" target="_blank" rel="noopener">Link</a>`
- `Oweis, T., Prinz, D., &amp; Hachum, A. (2001). <em>Water harvesting: Indigenous knowledge for the future of the drier environments</em>. ICARDA.`
- `FAO / ICARDA. (2022). <em>Webinars series on rainwater harvesting</em> (WEPS-NENA / Water Scarcity Initiative). <a class="inl" href="resources/water-harvesting/RWH webinar series_General flyer.pdf" target="_blank" rel="noopener">Series flyer (PDF)</a>`
Always include the FAO/ICARDA 2022 series ref last. Add 1–2 of the others as fits.

## IMAGES — one per technique, properly licensed
1. Find candidates: `node "<ABS>/whbuild/wcfind.mjs" "term one" "term two"` (use the search terms in your brief; try a few).
2. Choose a photo that **actually depicts the technique** whose `LIC` is one of:
   `CC0`, `Public domain`, `CC BY 2.0/2.5/3.0/4.0`, `CC BY-SA 2.0/2.5/3.0/4.0`.
   Reject any other license, and reject obviously irrelevant hits (a search for a
   technique can return unrelated art/places — check the DESC).
3. Download to the assets folder, naming it by slug:
   `curl -s -A "DRIP-RWH/1.0 (FAO drylands; dsl-ip@fao.org)" -o "C:/Dev/DRIP/drip/assets/water-harvesting/<slug>.jpg" "<THUMB URL>"`
   (the THUMB URL from wcfind is ~1600px wide — good for a banner.)
4. **Verify**: open the downloaded file with the Read tool and confirm it shows
   the technique. If it doesn't, pick another. If after a fair try you can't find
   a good, correctly-licensed, on-topic image, set `banner: null` and note it in
   your summary (do NOT use a wrong or unlicensed image).
5. Banner fields:
   - `img`: `assets/water-harvesting/<slug>.jpg`
   - `alt`: short literal description
   - `caption`: 1 sentence on what the photo shows (+ place if known). Rich HTML ok.
   - `credit`: EXACT format —
     `Photo: <Author>, <LICENSE as link to the file PAGE>, via Wikimedia Commons`
     e.g. `Photo: Jane Doe, <a href="https://commons.wikimedia.org/wiki/File:Example.jpg" target="_blank" rel="noopener">CC BY-SA 4.0</a>, via Wikimedia Commons`
     (For `Public domain`/`CC0`, write `public domain` / `CC0` as the link text.)
   - `objectPosition`: optional, e.g. `'center 60%'` if the subject sits low in a tall photo.

## Validate before finishing
Run: `node -e "import('file:///<ABS>/whbuild/data/<family>.mjs').then(m=>console.log('OK',m.default.length,'records')).catch(e=>{console.error('BAD',e.message);process.exit(1)})"`
It must print `OK <n> records`. Fix any syntax error.

## Your final message (keep under ~300 words)
- the family + how many records you wrote
- per technique: slug — image? (license) or "no image (reason)"
- any fact you were unsure about (so it can be checked)
Your file on disk is the deliverable; the message is just a report.
