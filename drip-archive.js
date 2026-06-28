/* ============================================================================
   DRIP – canonical knowledge catalogue (the living index)
   ----------------------------------------------------------------------------
   This file IS the archive. To add or update a knowledge product, append/edit
   an entry below and commit – every index view rebuilds from it automatically.
   The Archive & Index page also lets you capture entries in-browser and EXPORT
   a refreshed version of this file (drafts are held in localStorage until then).

   Entry schema
   ------------
   {
     id:       unique slug (kebab-case)
     title:    display name
     summary:  one or two sentences
     type:     'framework' | 'module' | 'programme' | 'case' | 'tool'
               | 'story' | 'policy' | 'dataset' | 'reference'
     fao:      FAO Publications Taxonomy key (see DRIP_ARCHIVE_META.fao.categories)
     pillars:  array of pillar ids – coordination | assessment | production
               | gender | monitoring | knowledge | finance
     source:   how it ENTERED the archive –
               'direct'   = direct technical input
               'reference'= reference file shared
               'exchange' = Regional Exchange Mechanism (REM)
               'hub'      = external knowledge hub
     origin:   free text – who / where it came from
     status:   'validated' | 'pending'
     url:      link (relative to site root, or external)
     tags:     array of keywords
     added:    'YYYY-MM-DD'   (first archived)
     updated:  'YYYY-MM-DD'   (last revised)
   }
   ============================================================================ */

window.DRIP_ARCHIVE_META = {
  version: 1,
  updated: '2026-06-13',
  channels: {
    direct:    { label: 'Direct technical input', icon: 'keyboard',     note: 'Entered directly by the team – notes, drafts, products built in-house.' },
    reference: { label: 'Reference file shared',  icon: 'file-text',    note: 'A document or dataset shared with the platform and catalogued.' },
    exchange:  { label: 'Regional Exchange (REM)', icon: 'git-fork',    note: 'Arrived through the Regional Exchange Mechanism – country docking, CoPs, working groups.' },
    hub:       { label: 'Knowledge hub',          icon: 'database',     note: 'Pulled from a connected global / regional / national knowledge hub.' }
  },
  types: {
    framework: 'Framework', module: 'Module', programme: 'Programme', case: 'Case',
    tool: 'Tool / platform', story: 'Story', policy: 'Policy', dataset: 'Dataset',
    reference: 'Reference'
  },

  /* ----------------------------------------------------------------------
     FAO Publications Taxonomy – the official three-level classification.
     Each entry carries a `fao` key resolved against `fao.categories` below:
     tier (1–4) → second-level type → third-level content category.
     Tier 'p' = platform / interactive digital tool (sits OUTSIDE the
     Publications Taxonomy; mapped here only so the registry is complete).
     -------------------------------------------------------------------- */
  fao: {
    tiers: {
      '1': { name: 'Corporate publications',                          color: '#E0A23C' },
      '2': { name: 'Specialized publications',                        color: '#3F8FCB' },
      '3': { name: 'Strategic and operational publications',          color: '#477E59' },
      '4': { name: 'Normative, evaluation and meeting documents',     color: '#CF715D' },
      'p': { name: 'Platform / digital tools (outside the taxonomy)', color: '#9A8C7E' }
    },
    categories: {
      'flagship':         { tier:'1', type:'Corporate publication',                    label:'Flagship' },
      'high-profile':     { tier:'1', type:'Corporate publication',                    label:'High-profile' },
      'corp-gi':          { tier:'1', type:'Corporate publication',                    label:'Corporate general interest' },
      'policy-brief':     { tier:'2', type:'Policy publication',                       label:'Policy brief' },
      'position-paper':   { tier:'2', type:'Policy publication',                       label:'Position paper' },
      'emergency':        { tier:'2', type:'Policy publication',                       label:'Emergency response' },
      'policy-analysis':  { tier:'2', type:'Policy publication',                       label:'Policy analysis' },
      'strategy-roadmap': { tier:'2', type:'Policy publication',                       label:'Strategy / Action plan / Roadmap' },
      'working-paper':    { tier:'2', type:'Research & technical publication',         label:'Working paper' },
      'tech-study':       { tier:'2', type:'Research & technical publication',         label:'Technical study' },
      'tech-brief':       { tier:'2', type:'Research & technical publication',         label:'Technical brief' },
      'tech-report':      { tier:'2', type:'Research & technical publication',         label:'Technical report' },
      'tech-book':        { tier:'2', type:'Research & technical publication',         label:'Technical book' },
      'proceedings':      { tier:'2', type:'Research & technical publication',         label:'Proceedings' },
      'fao-journal':      { tier:'2', type:'Research & technical publication',         label:'FAO journal' },
      'journal-article':  { tier:'2', type:'Research & technical publication',         label:'Journal article' },
      'bulletin':         { tier:'2', type:'Research & technical publication',         label:'Bulletin' },
      'yearbook':         { tier:'2', type:'Research & technical publication',         label:'Yearbook' },
      'magazine':         { tier:'2', type:'Research & technical publication',         label:'Magazine' },
      'gen-interest':     { tier:'2', type:'General interest publication',             label:'General interest book' },
      'brochure':         { tier:'2', type:'Communication material',                   label:'Brochure' },
      'guideline':        { tier:'3', type:'Guidance and training tool',               label:'Guideline' },
      'handbook':         { tier:'3', type:'Guidance and training tool',               label:'Handbook' },
      'manual':           { tier:'3', type:'Guidance and training tool',               label:'Manual / Guide' },
      'training':         { tier:'3', type:'Guidance and training tool',               label:'Training material' },
      'prog-report':      { tier:'3', type:'Reporting and accountability publication', label:'Programme / project report' },
      'annual-report':    { tier:'3', type:'Reporting and accountability publication', label:'Annual report' },
      'eval-report':      { tier:'3', type:'Reporting and accountability publication', label:'Evaluation report' },
      'fao-strategy':     { tier:'3', type:'Strategic management publication',         label:'FAO strategy, plan, policy, roadmap' },
      'programming':      { tier:'3', type:'Strategic management publication',         label:'Programming' },
      'factsheet':        { tier:'3', type:'Communication material',                   label:'Factsheet' },
      'newsletter':       { tier:'3', type:'Communication material',                   label:'Newsletter' },
      'normative':        { tier:'4', type:'Document',                                 label:'Normative document' },
      'meeting-doc':      { tier:'4', type:'Document',                                 label:'Meeting document' },
      'meeting-report':   { tier:'4', type:'Document',                                 label:'Meeting report' },
      'other-doc':        { tier:'4', type:'Document',                                 label:'Other document' },
      'infographic':      { tier:'4', type:'Communication material',                   label:'Infographic' },
      'presentation':     { tier:'4', type:'Communication material',                   label:'Presentation' },
      'poster':           { tier:'4', type:'Communication material',                   label:'Poster / banner / roll-up / folder' },
      'flyer':            { tier:'4', type:'Communication material',                   label:'Flyer' },
      'platform':         { tier:'p', type:'Digital tool / platform component',        label:'Platform / interactive tool' }
    }
  }
};

window.DRIP_ARCHIVE = [
  { id:'constellation', fao:'platform', title:'The Constellation', type:'tool', pillars:['knowledge'],
    source:'direct', origin:'DRIP / DSL-IP KM team', status:'pending',
    url:'DSL-IP Constellation Dashboard.html',
    summary:'The whole Programme as a living, interactive 3D map – five lenses plus a Builder. The navigational backbone of DRIP.',
    tags:['network','visualisation','platform','KM'], added:'2026-06-10', updated:'2026-06-13' },

  { id:'monitoring-system', fao:'platform', title:'Monitoring system', type:'tool', pillars:['monitoring'],
    source:'direct', origin:'GCP MEL working group', status:'validated',
    url:'dsl-ip-monitoring/DSL-IP Monitoring System.html',
    summary:'The participatory M&E architecture – results flow from communities up to GEF reporting, mirrored in a shared dashboard.',
    tags:['MEL','dashboard','PIR','indicators'], added:'2025-11-02', updated:'2026-01-15' },

  { id:'ilam', fao:'manual', title:'ILAM – Integrated Landscape Assessment Methodology', type:'framework', pillars:['assessment'],
    source:'reference', origin:'FAO working paper (2024)', status:'validated',
    url:'ILAM Integrated Landscape Assessment Methodology.html',
    summary:'A five-module evidence base – from remote sensing to household surveys – that defines each landscape’s baseline and core theme.',
    tags:['assessment','remote sensing','SHARP','LDN','baseline'], added:'2024-09-12', updated:'2025-05-20' },

  { id:'slpf', fao:'tech-brief', title:'SLPF – Sustainable Landscape Production Framework', type:'framework', pillars:['production'],
    source:'reference', origin:'FAO working paper (2024)', status:'validated',
    url:'SLPF Sustainable Landscape Production Framework.html',
    summary:'The integrated Farmer Field School + Community Seed Bank + green value-chain framework, contextualised per landscape via the ICDIP.',
    tags:['SLM','SFM','FFS','seed banks','value chains'], added:'2024-10-05', updated:'2025-06-01' },

  { id:'slpf-peer-learning', fao:'guideline', title:'Peer-Farmer Learning (SLPF module)', type:'module', pillars:['production'],
    source:'direct', origin:'DRIP – restructured from SLPF paper', status:'pending',
    url:'pillars/slpf/peer-farmer-learning.html',
    summary:'The experiential, farmer-to-farmer engine of the SLPF – knowledge co-created in the field, delivered through the FFS programme.',
    tags:['FFS','peer learning','capacity','extension'], added:'2026-06-13', updated:'2026-06-13' },

  { id:'slpf-ffs', fao:'manual', title:'Farmer Field School Programme', type:'programme', pillars:['production'],
    source:'direct', origin:'DRIP – restructured from SLPF paper', status:'pending',
    url:'pillars/slpf/ffs-program.html',
    summary:'Seasonal, field-based learning cycles on demonstration plots, with partners and mid-term results. The worked example of the drill-down.',
    tags:['FFS','IIRR','demonstration plots','results'], added:'2026-06-13', updated:'2026-06-13' },

  { id:'rem', fao:'brochure', title:'REM – Regional Exchange Mechanism', type:'framework', pillars:['coordination'],
    source:'reference', origin:'GCP coordination paper', status:'validated',
    url:'REM Regional Exchange Mechanism.html',
    summary:'The bridge through which the GCP aligns plans, pools expertise and docks with the child projects.',
    tags:['coordination','docking','CoP','regional'], added:'2024-08-20', updated:'2025-04-10' },

  { id:'financial-architecture', fao:'tech-study', title:'Financial architecture', type:'framework', pillars:['finance'],
    source:'reference', origin:'One-FAO finance note', status:'validated',
    url:'DSL-IP Financial Architecture.html',
    summary:'How the Programme’s funds and fee distribution are structured across the One-FAO delivery model.',
    tags:['finance','governance','fee distribution','GEF'], added:'2025-02-14', updated:'2025-02-14' },

  { id:'when-women-lead', fao:'brochure', title:'When Women Lead', type:'story', pillars:['gender'],
    source:'exchange', origin:'CoP3 Gender (WeCaN)', status:'validated',
    url:'When Women Lead.html',
    summary:'A field story on how women’s leadership and the land’s recovery move together.',
    tags:['gender','leadership','field story','restoration'], added:'2025-03-08', updated:'2025-03-08' },

  { id:'gender-action-plan', fao:'strategy-roadmap', title:'Global Gender Action Plan', type:'policy', pillars:['gender'],
    source:'reference', origin:'DSL-IP gender stream', status:'validated',
    url:'Global Gender Action Plan.html',
    summary:'The Programme’s gender-responsiveness commitments and the actions that put women’s empowerment at the centre.',
    tags:['gender','policy','inclusion','commitments'], added:'2025-03-08', updated:'2025-09-12' },

  { id:'sisteminha-ifes', fao:'tech-study', title:'Sisteminha · IFES Malawi', type:'case', pillars:['production'],
    source:'exchange', origin:'Malawi child project · Embrapa', status:'validated',
    url:'Sisteminha-IFES-Malawi-DSL-IP.html',
    summary:'Integrated Food and Energy Systems in practice – the SLPF streams converging on pigeon-pea, fuelwood and nutrition.',
    tags:['IFES','Malawi','Embrapa','case'], added:'2025-07-19', updated:'2025-07-19' },

  { id:'sna-tutume', fao:'tech-study', title:'Knowledge-flow Social Network Analysis (Tutume-Mosetse)', type:'case', pillars:['coordination','gender'],
    source:'exchange', origin:'Botswana child project · A. Buhrow, FAO', status:'validated',
    url:'SNA_Tutume_Mosetse.html',
    summary:'A social network analysis of two Botswana producer organizations – mapping how SLM knowledge flows, who the influencers are, and where the bottlenecks lie.',
    tags:['SNA','knowledge flow','Botswana','FFPO','gender','Gephi'], added:'2026-06-14', updated:'2026-06-14' },

  { id:'dfsm-campaign', fao:'brochure', title:'DFSA Campaign', type:'story', pillars:['knowledge'],
    source:'direct', origin:'DSL-IP communications', status:'validated',
    url:'DFSA Campaign.html',
    summary:'Dryland Forest Support Accelerator – the Programme’s outward-facing campaign and its core messages.',
    tags:['campaign','communications','drylands','outreach'], added:'2025-10-01', updated:'2025-10-01' },

  { id:'ffpo-assessment', fao:'infographic', title:'FFPO Assessment – Producer Organizations', type:'framework', pillars:['assessment','production'],
    source:'direct', origin:'DRIP / DSL-IP · ILAM Module 3', status:'pending',
    url:'resources/DSL-IP-FFPO-Assessment-Infographic.pdf',
    summary:'A 48-parameter framework profiling 226+ forest & farm producer organizations across five countries – the georeferenced backbone of ILAM Module 3.',
    tags:['FFPO','assessment','ILAM','producer organizations','value chains','infographic'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'global-environmental-benefits', fao:'infographic', title:'Global Environmental Benefits', type:'programme', pillars:['monitoring','finance'],
    source:'direct', origin:'DRIP / DSL-IP', status:'pending',
    url:'resources/DSL-IP-Global-Environmental-Benefits.pdf',
    summary:'The programme’s GEF-7 Core Indicator targets – 46.3M tCO₂e mitigated and 13.1M ha restored or under improved management across 11 countries; backbone of the proposed DFSA.',
    tags:['GEB','GEF-7','carbon','restoration','DFSA','infographic'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'mobilized-finance', fao:'infographic', title:'Mobilized Finance & Operational Partners', type:'programme', pillars:['finance'],
    source:'direct', origin:'DRIP / DSL-IP', status:'pending',
    url:'resources/DSL-IP-Mobilized-Finance.pdf',
    summary:'USD 635M of investment mobilized from a USD 96M GEF seed – a 1:5.6 co-financing leverage across recipient governments and finance partners; backbone of the proposed DFSA.',
    tags:['finance','co-financing','leverage','DFSA','partners','infographic'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'cofo-working-group', fao:'brochure', title:'COFO Working Group on Dryland Forests & Agrosilvopastoral Systems', type:'framework', pillars:['finance','coordination'],
    source:'reference', origin:'FAO Committee on Forestry – Working Group records (2019–2025)', status:'validated',
    url:'COFO Working Group on Dryland Forests.html',
    summary:'The inter-governmental expert group of the FAO Committee on Forestry that governs FAO’s dryland work – its history, mandate, membership, secretariat, an interactive session timeline (2014→2027) and relation to COFO. The subsidiary body that called for DRIP’s creation at its 2019 Inaugural Session; four sessions held (Rome 2019, Tanzania 2021, Amman 2023, Ulaanbaatar 2025).',
    tags:['governance','COFO','FAO','Working Group','dryland forests','agrosilvopastoral','members','secretariat','timeline'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'caatinga-biome', fao:'tech-brief', title:'The Caatinga Biome – Brazil’s white forest', type:'story', pillars:['knowledge'],
    source:'direct', origin:'DRIP – Knowledge & Outreach', status:'pending',
    url:'Caatinga Biome.html',
    summary:'A knowledge & outreach profile of the Caatinga – Brazil’s semi-arid dryland forest, the largest seasonally dry tropical forest in the Americas and the only biome found exclusively in Brazil. Its geography, biodiversity, ~28M people, pressures (deforestation, desertification nuclei) and restoration, and why it matters to the dryland-forests agenda.',
    tags:['Caatinga','Brazil','dryland forest','semi-arid','biome','desertification','agrosilvopastoral','Fundo de Pasto','outreach'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'miombo-mopane', fao:'tech-brief', title:'The Miombo & Mopane Woodlands – Africa’s great dry forest', type:'story', pillars:['knowledge'],
    source:'direct', origin:'DRIP – Knowledge & Outreach', status:'pending',
    url:'Miombo and Mopane Woodlands.html',
    summary:'A knowledge & outreach profile of the miombo and mopane woodlands of central and southern Africa – the continent’s largest dry-forest formation (~3M km², ~11 countries, 100–150M people). Geography, biodiversity (with a live iNaturalist dashboard), woodfuel and NTFP livelihoods, pressures, community forest management, and why it is the African heartland of the dryland-forests agenda – home to six DSL-IP child projects.',
    tags:['miombo','mopane','Africa','dryland forest','woodland','biome','Brachystegia','Colophospermum mopane','charcoal','mopane worm','community forestry','outreach'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'caatinga-manejo-pastoril', fao:'tech-book', title:'Sustainable pastoral management of the Caatinga (Araújo Filho)', type:'reference', pillars:['production','knowledge'],
    source:'reference', origin:'MMA / Secretaria de Biodiversidade e Florestas – J. A. de Araújo Filho', status:'validated',
    url:'resources/caatinga/Caatinga-Manejo-Pastoril-Sustentavel-Araujo-Filho-MMA.pdf',
    summary:'The core technical source behind the Caatinga management catalogue – the silvopastoral toolkit (CBL, SIPRO, Recaatingamento, rebaixamento, raleamento, enriquecimento, SAF-Sobral), the three golden rules (40% canopy, 60% forage, riparian buffers), and the finance/extension/licensing barriers to scaling.',
    tags:['Caatinga','agrosilvopastoral','silvopastoral','manejo','Embrapa','MMA','dryland forest','fodder'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'ecologia-conservacao-caatinga', fao:'tech-book', title:'Ecologia e Conservação da Caatinga (Leal, Tabarelli & Silva)', type:'reference', pillars:['assessment','knowledge'],
    source:'reference', origin:'Eds. I. R. Leal, M. Tabarelli & J. M. C. da Silva – Ed. Universitária UFPE', status:'validated',
    url:'resources/caatinga/Ecologia-e-Conservacao-da-Caatinga-Leal-Tabarelli-Silva.pdf',
    summary:'The authoritative scientific reference on the Caatinga – its ecology, biodiversity, endemism and conservation; the evidence base for the biome profile’s biodiversity and regeneration narrative.',
    tags:['Caatinga','ecology','conservation','biodiversity','endemism','science','dryland forest'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'caatinga-extrativismo-boas-praticas', fao:'guideline', title:'Good practices for organic extractivism – Carnaúba, Licuri & Caroá', type:'reference', pillars:['production','knowledge'],
    source:'reference', origin:'MAPA – Cadernos de Boas Práticas para o Extrativismo Sustentável Orgânico', status:'validated',
    url:'resources/caatinga/Boas-Praticas-Extrativismo-Sustentavel-Carnauba-MAPA.pdf',
    summary:'MAPA good-practice guides for sustainable, organic harvesting of the Caatinga’s native value chains – carnaúba wax, licuri palm and caroá fibre – the sociobiodiversity enterprises that make a standing dry forest worth more than a cleared one.',
    tags:['Caatinga','extractivism','NTFP','value chains','carnaúba','licuri','caroá','organic','MAPA','sociobiodiversity'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'manual-01-caatinga-fodder', fao:'manual', title:'Manual 01 – Managing the Caatinga for fodder', type:'reference', pillars:['production'],
    source:'direct', origin:'DRIP Manual Series', status:'pending',
    url:'DRIP Manual 01 - Caatinga Fodder.html',
    summary:'A 2–3 page field guide to lifting dry-season fodder from native Caatinga – thinning, coppicing and enrichment – under the three golden rules, without clearing the forest.',
    tags:['manual','Caatinga','silvopastoral','fodder','raleamento','rebaixamento','enrichment','grazing'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'manual-02-caatinga-wood-energy', fao:'manual', title:'Manual 02 – Sustainable wood energy from the Caatinga', type:'reference', pillars:['production'],
    source:'direct', origin:'DRIP Manual Series', status:'pending',
    url:'DRIP Manual 02 - Caatinga Wood Energy.html',
    summary:'A 2–3 page field guide to legal firewood and charcoal from the Caatinga on a ~15-year cutting cycle – community forest management that lets the dry forest grow back.',
    tags:['manual','Caatinga','firewood','charcoal','PMFS','cutting cycle','forest management','energy'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'manual-03-caatinga-value-chains', fao:'manual', title:'Manual 03 – Native value chains of the Caatinga', type:'reference', pillars:['production'],
    source:'direct', origin:'DRIP Manual Series', status:'pending',
    url:'DRIP Manual 03 - Caatinga Value Chains.html',
    summary:'A 2–3 page field guide to sustainable, organic extractivism of carnaúba, licuri, caroá and umbu – harvesting that leaves enough for regeneration and wildlife, and earns organic recognition.',
    tags:['manual','Caatinga','extractivism','NTFP','value chains','organic','carnaúba','licuri','caroá'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'annex-wocat-tech-01', fao:'other-doc', title:'WOCAT SLM Technology – Caatinga fodder (Manual 01, Annex A)', type:'reference', pillars:['production','assessment'],
    source:'direct', origin:'DRIP Manual Series – WOCAT documentation', status:'pending',
    url:'DRIP Manual 01 - Annex - WOCAT SLM Technology.html',
    summary:'The Caatinga silvopastoral fodder technology documented in the WOCAT Questionnaire on SLM Technologies (2019) – the global standard format; a draft for field validation before entry to the Global SLM Database.',
    tags:['WOCAT','SLM','technology','annex','Caatinga','silvopastoral','documentation','standard'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'annex-wocat-approach-01', fao:'other-doc', title:'WOCAT SLM Approach – Caatinga participatory extension (Manual 01, Annex B)', type:'reference', pillars:['coordination','production'],
    source:'direct', origin:'DRIP Manual Series – WOCAT documentation', status:'pending',
    url:'DRIP Manual 01 - Annex - WOCAT SLM Approach.html',
    summary:'The participatory, farmer-to-farmer extension Approach that delivers the silvopastoral Technology, documented in the WOCAT Questionnaire on SLM Approaches (2019).',
    tags:['WOCAT','SLM','approach','annex','Caatinga','extension','participatory','documentation'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'annex-wocat-tech-02', fao:'other-doc', title:'WOCAT SLM Technology – Caatinga wood energy / PMFS (Manual 02, Annex A)', type:'reference', pillars:['production','assessment'],
    source:'direct', origin:'DRIP Manual Series – WOCAT documentation', status:'pending',
    url:'DRIP Manual 02 - Annex - WOCAT SLM Technology.html',
    summary:'Sustainable forest management of the Caatinga for fuelwood and charcoal (~15-year cutting cycle, PMFS) documented in the WOCAT SLM Technologies questionnaire (2019).',
    tags:['WOCAT','SLM','technology','annex','Caatinga','PMFS','firewood','charcoal','forest management'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'annex-wocat-tech-03', fao:'other-doc', title:'WOCAT SLM Technology – Caatinga native value chains (Manual 03, Annex A)', type:'reference', pillars:['production','assessment'],
    source:'direct', origin:'DRIP Manual Series – WOCAT documentation', status:'pending',
    url:'DRIP Manual 03 - Annex - WOCAT SLM Technology.html',
    summary:'Sustainable organic extractivism of Caatinga native products (carnaúba, licuri, caroá, umbu) documented in the WOCAT SLM Technologies questionnaire (2019).',
    tags:['WOCAT','SLM','technology','annex','Caatinga','extractivism','NTFP','organic','value chains'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'slm-caatinga-slm-raleamento', fao:'manual', title:'Caatinga SLM – Raleamento', type:'reference', pillars:['production'],
    source:'reference', origin:'DRIP – Caatinga SLM catalogue', status:'pending',
    url:'Caatinga SLM - Raleamento.html',
    summary:'Selective thinning of the Caatinga to release the grass layer. Thin the woody layer to ~40% cover so the herb layer comes through – forage up to ~6× native, no fire.',
    tags:['Caatinga','SLM','silvopastoral','1-pager','Raleamento'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'slm-caatinga-slm-rebaixamento', fao:'manual', title:'Caatinga SLM – Rebaixamento', type:'reference', pillars:['production'],
    source:'reference', origin:'DRIP – Caatinga SLM catalogue', status:'pending',
    url:'Caatinga SLM - Rebaixamento.html',
    summary:'Coppicing forage trees to bring browse within reach. Lower forage trees and shrubs by hand to extend green browse into the dry season – forage up to ~4× native.',
    tags:['Caatinga','SLM','silvopastoral','1-pager','Rebaixamento'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'slm-caatinga-slm-enriquecimento', fao:'manual', title:'Caatinga SLM – Enriquecimento', type:'reference', pillars:['production'],
    source:'reference', origin:'DRIP – Caatinga SLM catalogue', status:'pending',
    url:'Caatinga SLM - Enriquecimento.html',
    summary:'Enrichment seeding of degraded Caatinga that has lost its herb layer. Reseed adapted forage with minimum tillage on degraded land – the highest carrying capacity of any treated Caatinga.',
    tags:['Caatinga','SLM','silvopastoral','1-pager','Enriquecimento'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'slm-caatinga-slm-sistema-cbl', fao:'manual', title:'Caatinga SLM – Sistema CBL', type:'reference', pillars:['production'],
    source:'reference', origin:'DRIP – Caatinga SLM catalogue', status:'pending',
    url:'Caatinga SLM - Sistema CBL.html',
    summary:'Caatinga · Buffel grass · Leucaena – a three-part silvopastoral year. Native Caatinga + a buffel-grass pasture + a leucaena protein bank, sequenced across the wet and dry seasons.',
    tags:['Caatinga','SLM','silvopastoral','1-pager','Sistema CBL'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'slm-caatinga-slm-sistema-sipro', fao:'manual', title:'Caatinga SLM – Sistema SIPRO', type:'reference', pillars:['production'],
    source:'reference', origin:'DRIP – Caatinga SLM catalogue', status:'pending',
    url:'Caatinga SLM - Sistema SIPRO.html',
    summary:'Maximising the tree-Caatinga in the rains, supplementing in the dry. Graze the tree-Caatinga in the rains; supplement with crop stover and a buffel reserve around lambing.',
    tags:['Caatinga','SLM','silvopastoral','1-pager','Sistema SIPRO'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'slm-caatinga-slm-saf-sobral', fao:'manual', title:'Caatinga SLM – SAF-Sobral', type:'reference', pillars:['production'],
    source:'reference', origin:'DRIP – Caatinga SLM catalogue', status:'pending',
    url:'Caatinga SLM - SAF Sobral.html',
    summary:'An integrated crop–livestock–forest layout from 3 hectares up. 20% alley cropping · 60% managed pasture · 20% legal reserve – maize 79% above the state average, far steadier.',
    tags:['Caatinga','SLM','silvopastoral','1-pager','SAF-Sobral'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'slm-caatinga-slm-recaatingamento', fao:'manual', title:'Caatinga SLM – Recaatingamento', type:'reference', pillars:['production'],
    source:'reference', origin:'DRIP – Caatinga SLM catalogue', status:'pending',
    url:'Caatinga SLM - Recaatingamento.html',
    summary:'Community-led conservation and recomposition of the Caatinga (IRPAA). A fundo-de-pasto approach in Bahia: conserve, recompose, educate, earn and influence policy.',
    tags:['Caatinga','SLM','approach','1-pager','Recaatingamento'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'slm-caatinga-slm-carnauba', fao:'factsheet', title:'Caatinga SLM – Carnaúba', type:'reference', pillars:['production'],
    source:'reference', origin:'DRIP – Caatinga SLM catalogue', status:'pending',
    url:'Caatinga SLM - Carnauba.html',
    summary:'Sustainable, organic extractivism of carnaúba wax and fibre. Harvest leaves from the standing palm for wax and fibre – a global export from a living forest.',
    tags:['Caatinga','SLM','value chain','1-pager','Carnaúba'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'slm-caatinga-slm-licuri', fao:'factsheet', title:'Caatinga SLM – Licuri', type:'reference', pillars:['production'],
    source:'reference', origin:'DRIP – Caatinga SLM catalogue', status:'pending',
    url:'Caatinga SLM - Licuri.html',
    summary:'Sustainable harvest of the licuri palm – food, oil and a macaw’s staple. Gather licuri nuts for food, oil and craft – leaving enough for the endangered Lear’s macaw.',
    tags:['Caatinga','SLM','value chain','1-pager','Licuri'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'slm-caatinga-slm-caroa', fao:'factsheet', title:'Caatinga SLM – Caroá', type:'reference', pillars:['production'],
    source:'reference', origin:'DRIP – Caatinga SLM catalogue', status:'pending',
    url:'Caatinga SLM - Caroa.html',
    summary:'Sustainable harvest of caroá fibre – cordage, crafts and textiles. A native bromeliad fibre, hand-harvested selectively – a classic non-timber product of the dry forest.',
    tags:['Caatinga','SLM','value chain','1-pager','Caroá'], added:'2026-06-23', updated:'2026-06-23' },

  { id:'slm-caatinga-slm-umbu', fao:'factsheet', title:'Caatinga SLM – Umbu', type:'reference', pillars:['production'],
    source:'reference', origin:'DRIP – Caatinga SLM catalogue', status:'pending',
    url:'Caatinga SLM - Umbu.html',
    summary:'Agro-extractivism of the umbu fruit – pulp, jam and juice. Gather and process the fruit of the umbuzeiro – turning a sertão icon into a growing local economy.',
    tags:['Caatinga','SLM','value chain','1-pager','Umbu'], added:'2026-06-23', updated:'2026-06-23' },

  /* Miombo & Mopane SLM / SFM technologies and value chains – the DSL-IP
     programme of work in the ecoregion (one country, one core theme).
     Drawn from "Managing the miombo–mopane sustainably" in the biome profile. */
  { id:'miombo-slm-ifes', fao:'manual', title:'Miombo SLM – IFES (Integrated Energy & Food Systems)', type:'reference', pillars:['production'],
    source:'reference', origin:'DRIP – Miombo & Mopane SLM catalogue', status:'pending',
    url:'Miombo SLM - IFES.html',
    summary:'Malawi’s core theme – closing the loop between food, soil and household energy on one plot. Pigeon pea–maize intercropping for food, fodder and fertility, paired with fuel-efficient stoves and biogas that cut the woodfuel drawn from the woodland.',
    tags:['Miombo','SLM','IFES','Malawi','intercropping','pigeon pea','clean cooking','value chain','1-pager'], added:'2026-06-28', updated:'2026-06-28' },

  { id:'miombo-slm-beekeeping', fao:'factsheet', title:'Miombo SLM – Sustainable beekeeping & miombo honey', type:'reference', pillars:['production'],
    source:'reference', origin:'DRIP – Miombo & Mopane SLM catalogue', status:'pending',
    url:'Miombo SLM - Beekeeping.html',
    summary:'Tanzania’s core theme – a non-wood forest product that pays for keeping the trees. Bark- and box-hive honey from the Tabora and Zambian honey belts turns flowering woodland into a standing-forest income; the more trees, the more honey.',
    tags:['Miombo','SLM','honey','beekeeping','Tanzania','NWFP','Tabora','value chain','1-pager'], added:'2026-06-28', updated:'2026-06-28' },

  { id:'miombo-slm-wood-energy', fao:'manual', title:'Miombo SLM – FSC charcoal from invasive bush', type:'reference', pillars:['production'],
    source:'reference', origin:'DRIP – Miombo & Mopane SLM catalogue', status:'pending',
    url:'Miombo SLM - FSC Charcoal.html',
    summary:'Namibia’s core theme – turning encroaching invasive bush into a certified product. FSC-certified charcoal from bush-encroaching species restores rangeland and creates a legal, premium wood-energy value chain, with licensed rotation supply, improved kilns and clean cookstoves.',
    tags:['Mopane','SLM','SFM','charcoal','wood energy','FSC','Namibia','bush encroachment','value chain','1-pager'], added:'2026-06-28', updated:'2026-06-28' },

  { id:'miombo-slm-baobab-marula', fao:'factsheet', title:'Miombo SLM – Baobab & marula value chains', type:'reference', pillars:['production'],
    source:'reference', origin:'DRIP – Miombo & Mopane SLM catalogue', status:'pending',
    url:'Miombo SLM - Baobab and Marula.html',
    summary:'Zimbabwe’s core theme – high-value products from iconic standing trees. Fruit, oil and kernels from baobab (Adansonia) and marula (Sclerocarya) processed into certifiable products that reward keeping the big trees in the landscape.',
    tags:['Miombo','SLM','baobab','marula','Zimbabwe','NWFP','Adansonia','Sclerocarya','value chain','1-pager'], added:'2026-06-28', updated:'2026-06-28' },

  { id:'miombo-slm-traditional-grains', fao:'factsheet', title:'Miombo SLM – Traditional grains & pulses (NUS)', type:'reference', pillars:['production'],
    source:'reference', origin:'DRIP – Miombo & Mopane SLM catalogue', status:'pending',
    url:'Miombo SLM - Traditional Grains.html',
    summary:'Drought-hardy indigenous crops at the heart of several country themes (Angola, Botswana, Zimbabwe, Namibia). Bambara groundnut, Morama bean, finger and pearl millet, pigeon pea, hyacinth and African yam bean – neglected and underutilized species that anchor food security on poor rains and little water.',
    tags:['Miombo','SLM','NUS','traditional grains','pulses','Bambara groundnut','millet','Morama bean','food security','1-pager'], added:'2026-06-28', updated:'2026-06-28' },

  { id:'miombo-slm-mopane-worm', fao:'factsheet', title:'Miombo SLM – Mopane worm & wild harvests', type:'reference', pillars:['production','gender'],
    source:'reference', origin:'DRIP – Miombo & Mopane SLM catalogue', status:'pending',
    url:'Miombo SLM - Mopane Worm.html',
    summary:'Seasonal protein and cash from the standing woodland – the mopane worm (Gonimbrasia belina), wild mushrooms and medicinal trees, gathered and traded largely by women, and harvested within community limits to keep it sustainable.',
    tags:['Mopane','SLM','mopane worm','wild harvest','NWFP','gender','mushrooms','value chain','1-pager'], added:'2026-06-28', updated:'2026-06-28' },

  { id:'miombo-slm-ecotourism', fao:'factsheet', title:'Miombo SLM – Sustainable eco-tourism', type:'reference', pillars:['production'],
    source:'reference', origin:'DRIP – Miombo & Mopane SLM catalogue', status:'pending',
    url:'Miombo SLM - Ecotourism.html',
    summary:'Botswana’s core theme – income from the living woodland and its wildlife. Community-based eco-tourism that makes an intact landscape worth more standing, paired with neglected and underutilized species (Morama bean, Bambara, Kwengwe).',
    tags:['Mopane','SLM','eco-tourism','Botswana','wildlife','community-based','value chain','1-pager'], added:'2026-06-28', updated:'2026-06-28' },

  { id:'miombo-slm-cbfm', fao:'manual', title:'Miombo SLM – Community-based forest management (CBFM)', type:'reference', pillars:['production'],
    source:'reference', origin:'DRIP – Miombo & Mopane SLM catalogue', status:'pending',
    url:'Miombo SLM - Community Forest Management.html',
    summary:'Tanzania’s flagship governance model – villages hold the rights and revenue to harvest, sell and protect their woodland. Participatory / Community-Based Forest Management keeps millions of hectares of miombo standing and is a natural reference for South–South exchange.',
    tags:['Miombo','SLM','SFM','CBFM','PFM','Tanzania','community forestry','governance','approach','1-pager'], added:'2026-06-28', updated:'2026-06-28' },

  { id:'miombo-slm-rangeland', fao:'manual', title:'Miombo SLM – Rangeland & agro-sylvo-pastoral management', type:'reference', pillars:['production'],
    source:'reference', origin:'DRIP – Miombo & Mopane SLM catalogue', status:'pending',
    url:'Miombo SLM - Rangeland Management.html',
    summary:'Working the woodland with livestock without grazing it bare. Rotational grazing and rest, drought-tolerant seed systems and agro-sylvo-pastoral value chains that integrate trees, grazing and crops – shared with the Programme’s drylands cross-learning groups.',
    tags:['Miombo','SLM','rangeland','grazing','agro-sylvo-pastoral','drought','seed systems','approach','1-pager'], added:'2026-06-28', updated:'2026-06-28' },

  { id:'miombo-slm-protected-areas', fao:'manual', title:'Miombo SLM – Protected areas & buffer-zone management', type:'reference', pillars:['production'],
    source:'reference', origin:'DRIP – Miombo & Mopane SLM catalogue', status:'pending',
    url:'Miombo SLM - Protected Areas.html',
    summary:'Mozambique’s core theme – pairing a protected core with sustainable use in the buffer. Conservation-compatible livelihoods around reserves, transboundary corridors, and community fire and harvest rules across one of Africa’s great large-mammal regions.',
    tags:['Mopane','SLM','protected areas','buffer zone','Mozambique','connectivity','corridors','conservation','approach','1-pager'], added:'2026-06-28', updated:'2026-06-28' },

  { id:'marvel-dashboard', fao:'platform', title:'MARVEL – the DRIP dashboard (MRV + MEL)', type:'tool', pillars:['monitoring','knowledge'],
    source:'direct', origin:'DRIP – Monitoring & Learning', status:'pending',
    url:'MARVEL.html',
    summary:'The Programme’s monitoring-and-learning dashboard – Monitoring, Assessment, Reporting, Verification, Evaluation and Learning. A single live view of knowledge products, projects, best practices, financing, indicators and global environmental benefits, read live from this catalogue.',
    tags:['MARVEL','MRV','MEL','dashboard','monitoring','GEB','indicators','knowledge products','finance'], added:'2026-06-24', updated:'2026-06-24' },

  { id:'wocat-slm-library', fao:'platform', title:'WOCAT SLM Library', type:'tool', pillars:['production','assessment','knowledge'],
    source:'hub', origin:'WOCAT Global SLM Database (qcat.wocat.net) · QCAT API v2', status:'pending',
    url:'WOCAT Library.html',
    summary:'A live connection to the WOCAT Global SLM Database – sustainable land-management technologies and approaches pulled via the QCAT API, pre-filtered to drylands and re-cast in DRIP’s own classification (biome, farm-skill-tree cluster, WOCAT measures / groups / land use / degradation). A build-time snapshot, refreshed on a schedule.',
    tags:['WOCAT','SLM','technologies','approaches','database','API','drylands','classification','knowledge hub'], added:'2026-06-28', updated:'2026-06-28' },

  { id:'fao-sfm-toolbox', fao:'platform', title:'FAO Sustainable Forest Management (SFM) Toolbox', type:'tool', pillars:['production','knowledge'],
    source:'hub', origin:'FAO Forestry · fao.org/sustainable-forest-management-toolbox', status:'validated',
    url:'https://www.fao.org/sustainable-forest-management-toolbox/en',
    summary:'FAO’s global toolbox of guidance, modules and tools for managing forests sustainably. DRIP is thematically linked to it as the drylands knowledge hub – tailoring SFM management and practices to the specific dryland context: the dry forests, agrosilvopastoral systems and restoration challenges of the world’s arid and semi-arid lands.',
    tags:['SFM','sustainable forest management','FAO','toolbox','drylands','knowledge hub','forest management','linked'], added:'2026-06-28', updated:'2026-06-28' }
];
