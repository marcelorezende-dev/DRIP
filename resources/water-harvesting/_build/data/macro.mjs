const CRITCHLEY = 'Critchley, W., &amp; Siegert, K. (1991). <em>Water harvesting: A manual for the design and construction of water harvesting schemes for plant production</em>. FAO. <a class="inl" href="https://www.fao.org/4/u3160e/u3160e00.htm" target="_blank" rel="noopener">Link</a>';
const WOCAT2013 = 'Mekdaschi Studer, R., &amp; Liniger, H. (2013). <em>Water harvesting: Guidelines to good practice</em>. CDE/Bern, RAIN, MetaMeta, IFAD. <a class="inl" href="https://www.wocat.net/library/media/47/" target="_blank" rel="noopener">Link</a>';
const OWEIS2001 = 'Oweis, T., Prinz, D., &amp; Hachum, A. (2001). <em>Water harvesting: Indigenous knowledge for the future of the drier environments</em>. ICARDA.';
const SERIES2022 = 'FAO / ICARDA. (2022). <em>Webinars series on rainwater harvesting</em> (WEPS-NENA / Water Scarcity Initiative). <a class="inl" href="resources/water-harvesting/RWH webinar series_General flyer.pdf" target="_blank" rel="noopener">Series flyer (PDF)</a>';

export default [
  {
    slug: 'contour-bench-terraces', title: 'Contour bench terraces', icon: 'mountain', badge: 'RWH',
    cardMeta: 'Macro-catchment · hillside terraces',
    cardOneliner: 'Level benches cut into steep slopes, fed by the runoff from the hillside above.',
    series: 'Water Harvesting · Macro-catchment',
    subtitle: 'Level benches cut into steep hillsides, fed by the slope above',
    banner: null,
    whatItIs: [
      'Contour bench terraces are narrow level benches cut step-wise into a steep hillside, each supported by a stone or earth riser. The un-terraced slope above each bench acts as the catchment that feeds runoff onto the level planted strip – the classic mountain water-harvesting terrace.',
      'They turn slopes too steep for any other form of cultivation into productive, erosion-controlled ground, and are among the oldest macro-catchment systems in the drylands.',
    ],
    howItWorks: [
      'Survey level benches along the contour across the hillside',
      'Build a <strong>riser wall</strong> of stone or compacted earth to hold each bench',
      'Leave the natural slope above each bench as the <strong>catchment</strong> that supplies runoff',
      'Plant trees, shrubs or field crops on the level bench',
      'Maintain the risers after every major storm',
    ],
    keyFacts: [
      ['WOCAT group', 'Macro-catchment water harvesting'],
      ['Suitable slope', '25–65% (steep)'],
      ['Soil depth', '≥ 100 cm'],
      ['Famous in', 'Yemen and Tunisia'],
      ['Best for', 'trees, shrubs, field crops'],
    ],
    factsNote: 'Design parameters from Oweis (2001), RWH Webinar Series Modules 1 &amp; 4.',
    wocat: { measures: ['S', 'V'], group: 'Macro-catchment water harvesting', degradation: ['Soil erosion by water', 'Water degradation (aridification)'] },
    sources: [
      '<strong>Theib Oweis</strong> (ex-ICARDA) – Modules 1 &amp; 4',
      '<strong>Ihab Jnad</strong> (ACSAD) – Module 7',
    ],
    apaRefs: [OWEIS2001, SERIES2022],
    footMeta2: 'Macro-catchment · contour bench terraces',
  },
  {
    slug: 'hillside-conduits-wadi-cultivation', title: 'Hillside conduits &amp; wadi-bed cultivation', icon: 'route', badge: 'RWH',
    cardMeta: 'Macro-catchment · conveyance',
    cardOneliner: 'Channels that gather hillside runoff and lead it to fields, reservoirs or the wadi bed below.',
    series: 'Water Harvesting · Macro-catchment',
    subtitle: 'Conduits that gather long-slope runoff to fields, storage or the wadi bed',
    banner: null,
    whatItIs: [
      'These macro-catchment systems collect runoff from a natural hillslope or mountain and convey it – via a contour conduit or ditch – to fields, storage or directly onto the moist wadi bed downstream. This is "external" long-slope harvesting: the catchment is large and lies well above the cropped land.',
      'Because a big catchment feeds a small cropped area, even sparse rain on the hills can water crops or trees that could never survive on the rain falling on them directly.',
    ],
    howItWorks: [
      'Cut a <strong>contour conduit or ditch</strong> that intercepts runoff coming off the hillslope',
      'Lead the collected water to cropland, an orchard or a reservoir',
      'Alternatively, crop the <strong>moist wadi bed</strong> directly, using the channel flow',
      'Size the system to a large catchment-to-cultivated ratio so the harvested water meets the crop need',
    ],
    keyFacts: [
      ['WOCAT group', 'Macro-catchment water harvesting'],
      ['Catchment : cultivated', '~10:1 to 100:1'],
      ['Best for', 'trees &amp; field crops; small–medium farms'],
    ],
    wocat: { measures: ['S'], group: 'Macro-catchment water harvesting', degradation: ['Water degradation (aridification)'] },
    sources: [
      '<strong>Theib Oweis</strong> (ex-ICARDA) – Modules 1 &amp; 4',
      '<strong>UN-ESCWA</strong> – Module 4',
    ],
    apaRefs: [OWEIS2001, SERIES2022],
    footMeta2: 'Macro-catchment · hillside conduits',
  },
  {
    slug: 'check-dams', title: 'Check dams', icon: 'brick-wall', badge: 'RWH',
    cardMeta: 'Macro-catchment · gully control',
    cardOneliner: 'Small barriers across gullies that slow floods, trap sediment and recharge the channel.',
    series: 'Water Harvesting · Macro-catchment',
    subtitle: 'Small barriers across gullies that slow flow, trap silt and recharge',
    banner: null,
    whatItIs: [
      'Check dams are small barriers – of stone, gabion or concrete – built across gullies and small channels to slow runoff, trap sediment and recharge the bed. They reduce erosion while storing and spreading water in the channel itself.',
      'Built as a series down a gully, they step the flow down gently, each one ponding water that infiltrates and building a fertile silt bed behind it.',
    ],
    howItWorks: [
      'Key the dam firmly into the bed and banks of the gully',
      'Build a <strong>series</strong> down the channel so each ponds and infiltrates runoff',
      'Provide a <strong>spillway/overflow</strong> so floods pass without breaching the dam',
      'Let trapped silt build a fertile, moist bed that can itself be cropped',
    ],
    keyFacts: [
      ['WOCAT group', 'Macro-catchment water harvesting'],
      ['Built of', 'stone, gabion or concrete'],
      ['Effect', 'raised watershed storage capacity ~40% (Palestine)'],
      ['Siting', 'by hydrological analysis (Jordan)'],
      ['Best for', 'gully &amp; channel erosion control + recharge'],
    ],
    callout: {
      title: 'Site them with care',
      body: 'A case study from Karnataka, India (Batchelor &amp; James) warned that poorly sited check dams and nala bunds can capture water that downstream users depend on – RWH structures must be planned at watershed scale, not field by field.',
    },
    variantsHeading: 'Related forms',
    variants: [
      '<strong>Nala bunds</strong> – earthen bunds across small streams (India).',
      '<strong>Gabions</strong> – wire-caged stone check structures for stronger flows.',
      '<strong>Silt traps</strong> – small barriers that hold back sediment in canals and fields.',
    ],
    wocat: { measures: ['S'], group: 'Macro-catchment water harvesting', degradation: ['Soil erosion by water', 'Water degradation (aridification)'] },
    sources: [
      '<strong>Feras Ziadat</strong> (FAO) – Module 3 (Jordan siting)',
      '<strong>Ihab Jnad</strong> (ACSAD) – Module 7',
      '<strong>Wael Abu Rmaileh</strong> (UN-ESCWA) – Module 8',
      '<strong>Batchelor &amp; James</strong> – Module 7 (India)',
    ],
    apaRefs: [WOCAT2013, SERIES2022],
    footMeta2: 'Macro-catchment · check dams',
  },
  {
    slug: 'gully-plugs-reclamation', title: 'Gully plugs &amp; reclamation', icon: 'fence', badge: 'RWH',
    cardMeta: 'Macro-catchment · gully repair',
    cardOneliner: 'Plugs and planting that stop gullies eating the land and turn them into recharge points.',
    series: 'Water Harvesting · Macro-catchment',
    subtitle: 'Small plugs plus planting that heal eroding gullies',
    banner: null,
    whatItIs: [
      'Gully plugs combine small structures with vegetation to plug actively eroding gullies and stabilize their side-banks, arresting the head-cut erosion that cuts up rangeland and turning gullies into productive, recharging features.',
      'They are the downstream-control tier of a watershed-rehabilitation chain: treat the slopes above with micro-catchments, slow and route the flow with gully plugs, then harvest it on the lowland below.',
    ],
    howItWorks: [
      'Build a <strong>sequence of small plugs/weirs</strong> along the gully',
      'Revegetate the <strong>side-banks</strong> to hold the soil',
      'Trap sediment to flatten and raise the gully bed',
      'Integrate with micro-catchments treating the slopes above',
    ],
    keyFacts: [
      ['WOCAT group', 'Macro-catchment water harvesting'],
      ['Role', 'downstream-control tier of a watershed-rehab chain'],
      ['Chain', 'uplands micro-WH → gully plugs → lowland flood harvesting (Jordan Badia)'],
      ['Best for', 'actively eroding gullies/wadis in rangeland'],
    ],
    wocat: { measures: ['S', 'V'], group: 'Macro-catchment water harvesting', degradation: ['Soil erosion by water'] },
    sources: [
      '<strong>Stefan Strohmeier</strong> (ICARDA) – Modules 6 &amp; 7 (Jordan Badia)',
    ],
    apaRefs: [WOCAT2013, SERIES2022],
    footMeta2: 'Macro-catchment · gully plugs',
  },
];
