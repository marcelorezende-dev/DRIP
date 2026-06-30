const CRITCHLEY = 'Critchley, W., &amp; Siegert, K. (1991). <em>Water harvesting: A manual for the design and construction of water harvesting schemes for plant production</em>. FAO. <a class="inl" href="https://www.fao.org/4/u3160e/u3160e00.htm" target="_blank" rel="noopener">Link</a>';
const WOCAT2013 = 'Mekdaschi Studer, R., &amp; Liniger, H. (2013). <em>Water harvesting: Guidelines to good practice</em>. CDE/Bern, RAIN, MetaMeta, IFAD. <a class="inl" href="https://www.wocat.net/library/media/47/" target="_blank" rel="noopener">Link</a>';
const OWEIS2001 = 'Oweis, T., Prinz, D., &amp; Hachum, A. (2001). <em>Water harvesting: Indigenous knowledge for the future of the drier environments</em>. ICARDA.';
const SERIES2022 = 'FAO / ICARDA. (2022). <em>Webinars series on rainwater harvesting</em> (WEPS-NENA / Water Scarcity Initiative). <a class="inl" href="resources/water-harvesting/RWH webinar series_General flyer.pdf" target="_blank" rel="noopener">Series flyer (PDF)</a>';

export default [
  {
    slug: 'road-water-harvesting', title: 'Road water harvesting', icon: 'route', badge: 'RWH',
    cardMeta: 'Landscape · roads as catchment',
    cardOneliner: 'Turning roads and their drains from erosion channels into deliberate water harvesters.',
    series: 'Water Harvesting · Landscape &amp; road-water',
    subtitle: 'Using roads and their drains as deliberate water-harvesting infrastructure',
    banner: null,
    whatItIs: [
      'Road water harvesting uses roads, their culverts, drains and borrow-pits as deliberate water-harvesting infrastructure – diverting the runoff that roads concentrate into farmland, ponds and aquifers instead of letting it erode the road and the land. The approach is known as "Green Roads for Water".',
      'Roads are one of the largest artificial catchments in any landscape; managed well, the same water that normally tears up a road and the fields below it becomes a free, reliable harvest.',
    ],
    howItWorks: [
      'Add or adapt <strong>culverts, drifts, mitre-drains and borrow-pits</strong> so road runoff is led onto fields or into recharge pits and ponds',
      'Turn the road from a <strong>drain into a spreader</strong>',
      'Store the diverted water in ponds or use it to recharge the aquifer',
      'Monitor downstream soil moisture and groundwater',
    ],
    keyFacts: [
      ['WOCAT group', 'Macro-catchment / landscape'],
      ['Evidence', 'raised soil moisture &amp; groundwater downstream of culverts/check-dams (Tigray, 2013–2018)'],
      ['Insight', 'roads are a major artificial catchment'],
      ['Use', 'divert &amp; store road runoff productively'],
    ],
    wocat: { measures: ['S'], group: 'Macro-catchment / landscape water harvesting', degradation: ['Soil erosion by water', 'Water degradation (aridification)'] },
    sources: [
      '<strong>Frank van Steenbergen &amp; Kifle Woldearegay</strong> (MetaMeta) – Module 7',
      '<strong>Theib Oweis</strong> (ex-ICARDA) – Module 1 (roaded catchments)',
    ],
    apaRefs: [WOCAT2013, SERIES2022],
    footMeta2: 'Landscape · road water harvesting',
  },
  {
    slug: 'landscape-3r-regreening', title: '3R landscape management &amp; regreening', icon: 'trees', badge: 'RWH',
    cardMeta: 'Landscape · 3R &amp; regreening',
    cardOneliner: 'Managing a whole catchment to recharge, retain and reuse its rain – structures plus regreening.',
    series: 'Water Harvesting · Landscape &amp; road-water',
    subtitle: 'Recharge, retention and reuse across a whole catchment',
    banner: null,
    whatItIs: [
      'This is a landscape-scale approach – Recharge, Retention and Reuse (3R) – that combines many small structures with regreening (forests, hedges, managed grazing) so a whole catchment slows, stores and reuses its rainwater, buffering the climate and reviving springs.',
      'Rather than a single structure, 3R is a way of managing a whole micro-watershed so that every drop is slowed, soaked in and used more than once – the frame within which all the other techniques fit together.',
    ],
    howItWorks: [
      'Select a mix of <strong>in-situ, micro- and macro-catchment measures</strong> by slope, soils, rainfall and land use',
      'Add <strong>tree/hedge regreening and controlled grazing</strong> to open soils and return moisture',
      'Manage the catchment <strong>as one system</strong>',
      'Aim for recharge + retention + reuse together',
    ],
    keyFacts: [
      ['Approach', '3R = Recharge, Retention, Reuse'],
      ['Co-benefit', 'local temperature buffering of ~1.5–2 °C reported'],
      ['Grazing', 'managed/holistic grazing improves infiltration'],
      ['Tooling', 'underpins WOCAT / Acacia Water site-selection (Water Harvesting Explorer)'],
    ],
    wocat: { measures: ['V', 'M', 'S'], group: 'Landscape / catchment water harvesting', degradation: ['Water degradation (aridification)', 'Biological degradation'] },
    sources: [
      '<strong>Frank van Steenbergen &amp; Kifle Woldearegay</strong> (MetaMeta) – Module 7',
      '<strong>Acacia Water</strong> – Module 3',
      '<strong>Hanspeter Liniger</strong> (WOCAT) – Module 2',
    ],
    apaRefs: [WOCAT2013, SERIES2022],
    footMeta2: 'Landscape · 3R &amp; regreening',
  },
  {
    slug: 'rock-catchments', title: 'Rock catchments', icon: 'mountain', badge: 'RWH',
    cardMeta: 'Landscape · rock catchment',
    cardOneliner: 'Bare rock domes turned into reservoirs – very high runoff where little else yields water.',
    series: 'Water Harvesting · Landscape &amp; road-water',
    subtitle: 'Bare rock outcrops used as a natural impervious catchment',
    banner: null,
    whatItIs: [
      'Rock catchments use bare rock outcrops as a natural, near-impervious catchment: low gutters and walls on the rock collect the high runoff into a tank or reservoir for domestic and livestock supply, often where no other dependable source exists.',
      'A clean rock dome sheds almost all the rain that falls on it, so even in very dry places a modest storm can fill a sizeable reservoir.',
    ],
    howItWorks: [
      'Build a <strong>low masonry gutter/wall</strong> along the base of a clean rock dome to intercept runoff',
      'Lead it to a <strong>covered tank or reservoir</strong>',
      'Screen and settle the water before storage',
      'Keep the rock surface clear',
    ],
    keyFacts: [
      ['WOCAT group', 'Macro-catchment water harvesting'],
      ['Runoff', 'clean rock gives very high runoff coefficients'],
      ['Classic for', 'islands &amp; arid uplands with no other source'],
      ['Example', 'Kanda rock catchment, Afghanistan'],
    ],
    wocat: { measures: ['S'], group: 'Macro-catchment water harvesting', degradation: ['Water degradation (aridification)'] },
    sources: [
      '<strong>Theib Oweis</strong> (ex-ICARDA) – Module 1',
      '<strong>Han Heijnen</strong> (IRHA) – Module 5',
      '<strong>Frank van Steenbergen</strong> (MetaMeta) – Module 7',
    ],
    apaRefs: [OWEIS2001, SERIES2022],
    footMeta2: 'Landscape · rock catchments',
  },
];
