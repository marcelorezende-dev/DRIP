const CRITCHLEY = 'Critchley, W., &amp; Siegert, K. (1991). <em>Water harvesting: A manual for the design and construction of water harvesting schemes for plant production</em>. FAO. <a class="inl" href="https://www.fao.org/4/u3160e/u3160e00.htm" target="_blank" rel="noopener">Link</a>';
const WOCAT2013 = 'Mekdaschi Studer, R., &amp; Liniger, H. (2013). <em>Water harvesting: Guidelines to good practice</em>. CDE/Bern, RAIN, MetaMeta, IFAD. <a class="inl" href="https://www.wocat.net/library/media/47/" target="_blank" rel="noopener">Link</a>';
const OWEIS2001 = 'Oweis, T., Prinz, D., &amp; Hachum, A. (2001). <em>Water harvesting: Indigenous knowledge for the future of the drier environments</em>. ICARDA.';
const SERIES2022 = 'FAO / ICARDA. (2022). <em>Webinars series on rainwater harvesting</em> (WEPS-NENA / Water Scarcity Initiative). <a class="inl" href="resources/water-harvesting/RWH webinar series_General flyer.pdf" target="_blank" rel="noopener">Series flyer (PDF)</a>';

export default [
  {
    slug: 'spate-irrigation', title: 'Spate irrigation (floodwater diversion)', icon: 'waves', badge: 'RWH',
    cardMeta: 'Floodwater · spate',
    cardOneliner: 'Diverting brief wadi floods and their fertile silt onto bunded fields – ancient large-scale harvesting.',
    series: 'Water Harvesting · Floodwater &amp; spate',
    subtitle: 'Diverting short-lived wadi floods onto bunded fields',
    banner: null,
    whatItIs: [
      'Spate irrigation is the traditional diversion of short-lived wadi floods, via bunds and intakes built in the riverbed, onto bunded fields where the floodwater and its fertile silt soak in for a single crop. It is one of the oldest large-scale water-harvesting systems on earth.',
      'The flood arrives violently and briefly – often only for hours – so the whole skill lies in catching and spreading it quickly, then living off the moisture and silt it leaves behind.',
    ],
    howItWorks: [
      'Build <strong>diversion bunds and intakes</strong> in the wadi to lift and steer the flood',
      'Spread it field-to-field across <strong>bunded basins</strong>',
      'Capture is rapid – the water is present only a few hours',
      'The deposited silt <strong>self-fertilizes</strong> the soil',
      'Manage upstream–downstream <strong>water rights</strong>, which govern how floods are shared',
    ],
    keyFacts: [
      ['WOCAT group', 'Floodwater harvesting'],
      ['Global extent', '~3 million ha irrigated worldwide'],
      ['Catchment : cultivated', '100:1 to 10,000:1'],
      ['Flood duration', 'often only a few hours'],
      ['Bonus', 'self-fertilizing via deposited silt'],
      ['Note', 'traditional schemes outperformed modernized ones in Tigray, Ethiopia'],
    ],
    variantsHeading: 'Related floodwater forms',
    variants: [
      '<strong>Tabia</strong> – large earth bunds across valley floors for field crops.',
      '<strong>Liman</strong> – an embanked depression flooded by diverted runoff.',
      '<strong>M’Zab alley spate (Algeria)</strong> – canal alleys with calibrated openings sharing floodwater between gardens.',
    ],
    wocat: { measures: ['S'], group: 'Floodwater harvesting', degradation: ['Water degradation (aridification)', 'Soil erosion by water'] },
    sources: [
      '<strong>Giulio Castelli</strong> (Univ. of Florence) – Module 4 (Ethiopia case)',
      '<strong>Theib Oweis</strong> (ex-ICARDA) – Module 1',
      '<strong>Han Heijnen</strong> (IRHA) – Module 5 (Yemen)',
    ],
    apaRefs: [OWEIS2001, SERIES2022],
    footMeta2: 'Floodwater · spate irrigation',
  },
  {
    slug: 'jessour', title: 'Jessour (wadi-bed terraces)', icon: 'mountain', badge: 'RWH',
    cardMeta: 'Floodwater · wadi terraces',
    cardOneliner: 'Cross-wadi dykes that bank up fertile flood silt into deep orchard terraces – a Tunisian classic.',
    series: 'Water Harvesting · Floodwater &amp; spate',
    subtitle: 'Cross-wadi dykes that build deep, moist orchard terraces from flood silt',
    banner: null,
    whatItIs: [
      'Jessour are traditional run-off terraces in the arid mountains of southern Tunisia and Libya. An earth-and-stone dyke (<em>tabia</em>) with a stone spillway (<em>menfes</em>) is built across a small wadi, and the fertile sediment that piles up behind it forms a deep, moist field for olives, figs, dates and cereals.',
      'A staircase of jessour climbs each wadi, each dyke catching the silt and water that the one above lets through – a landscape patiently engineered over generations.',
    ],
    howItWorks: [
      'Build a <strong>cross-wadi dyke (tabia)</strong> with a stone spillway (menfes)',
      'Each flood drops <strong>silt behind the dyke</strong>, slowly building deep soil',
      'Plant trees and cereals on the accumulated soil',
      'A <strong>staircase of jessour</strong> climbs the wadi; maintain dyke and spillway after floods',
    ],
    keyFacts: [
      ['WOCAT group', 'Floodwater harvesting'],
      ['Builds', 'deep fertile soil from trapped flood silt'],
      ['Suitable slope', 'medium–steep small wadis'],
      ['Skill', 'needs construction know-how'],
      ['Best for', 'olives, figs, dates, cereals'],
    ],
    wocat: { measures: ['S', 'V'], group: 'Floodwater harvesting', degradation: ['Soil erosion by water', 'Water degradation (aridification)'] },
    sources: [
      '<strong>Theib Oweis</strong> (ex-ICARDA) – Modules 1 &amp; 4',
      '<strong>UN-ESCWA</strong> – Module 4',
    ],
    apaRefs: [OWEIS2001, SERIES2022],
    footMeta2: 'Floodwater · jessour',
  },
  {
    slug: 'marab-floodwater-harvesting', title: 'Marab floodwater harvesting', icon: 'sprout', badge: 'RWH',
    cardMeta: 'Floodwater · lowland spreading',
    cardOneliner: 'Spreading wadi floods over fertile lowland depressions for barley yields 10–50× the open range.',
    series: 'Water Harvesting · Floodwater &amp; spate',
    subtitle: 'Spreading wadi floodwater over fertile lowland depressions',
    banner: null,
    whatItIs: [
      'Marab floodwater harvesting is the engineered spreading of wadi floodwater across naturally fertile lowland depressions ("marab") in Jordan’s Badia rangeland, concentrating scarce runoff onto about 1% of the watershed for high-yield barley and forage.',
      'It is the productive end of a three-part watershed chain: micro-catchments and gully plugs treat the uplands, and the marab below turns the gathered flood into a real grain crop in a place that otherwise grows almost nothing.',
    ],
    howItWorks: [
      'Treat the uplands with <strong>micro-WH and gully plugs</strong> to route the flow',
      'Lead floodwater via <strong>diversion bunds</strong> onto the flat marab depression',
      'Spread and pond it across the field',
      'Sow <strong>high-value grain/forage</strong> into the moist, silt-enriched soil',
    ],
    keyFacts: [
      ['WOCAT group', 'Floodwater harvesting'],
      ['Marab yield', '4.1–4.7 t/ha biomass incl. 1.4 t/ha grain'],
      ['Upland yield', '0.1–0.5 t/ha biomass, no grain'],
      ['Advantage', 'marab yields 10–50× the open range'],
      ['Footprint', 'marab ≈ 1% of the watershed'],
      ['Evidence', 'NDVI monitoring 2009–2019'],
    ],
    wocat: { measures: ['S', 'A'], group: 'Floodwater harvesting', degradation: ['Water degradation (aridification)', 'Biological degradation'] },
    sources: [
      '<strong>Stefan Strohmeier</strong> (ICARDA) – Modules 6 &amp; 7 (Jordan Badia)',
    ],
    apaRefs: [WOCAT2013, SERIES2022],
    footMeta2: 'Floodwater · marab harvesting',
  },
  {
    slug: 'water-spreading-weirs', title: 'Water-spreading weirs', icon: 'waves', badge: 'RWH',
    cardMeta: 'Floodwater · spreading',
    cardOneliner: 'Low weirs that fan floods out across the land to recharge soil and aquifers instead of cutting a channel.',
    series: 'Water Harvesting · Floodwater &amp; spate',
    subtitle: 'Low weirs that fan floods sideways to spread infiltration',
    banner: null,
    whatItIs: [
      'Water-spreading weirs are low weirs built across a wadi or flood plain that lift and fan out flood flows sideways over a wide area – slowing the flood, spreading infiltration and recharging soil and groundwater rather than letting the water erode a single deepening channel.',
      'They are a favourite tool for flood-risk management, turning a destructive flash flood into a sheet of water that soaks the land and refills the aquifer.',
    ],
    howItWorks: [
      'Build a <strong>low, wide weir</strong> (often gabion or concrete) across the flood path',
      'The flood backs up and <strong>spreads laterally</strong> onto fields or rangeland',
      'Sediment settles and the bed recharges',
      'A <strong>series of weirs</strong> steps down the wadi',
    ],
    keyFacts: [
      ['WOCAT group', 'Floodwater harvesting'],
      ['Use', 'flood-risk management + aquifer recharge'],
      ['Action', 'fans flow sideways, slows &amp; spreads it'],
      ['Best for', 'braided wadis and flood plains'],
    ],
    wocat: { measures: ['S'], group: 'Floodwater harvesting', degradation: ['Water degradation (aridification)', 'Soil erosion by water'] },
    sources: [
      '<strong>Feras Ziadat</strong> (FAO) – Module 3',
      '<strong>Frank van Steenbergen &amp; Kifle Woldearegay</strong> (MetaMeta) – Module 7',
    ],
    apaRefs: [WOCAT2013, SERIES2022],
    footMeta2: 'Floodwater · water-spreading weirs',
  },
];
