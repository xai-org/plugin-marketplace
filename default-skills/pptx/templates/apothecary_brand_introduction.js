/**
 * build_sable_and_sage.js
 *
 * Recreates "Sable & Sage" (Volume I — Introduction) slide deck with pptxgenjs.
 *
 * Usage:
 *   npm install pptxgenjs
 *   node build_sable_and_sage.js
 *
 * Assets:
 *   Images live in ./assets/ next to this script.
 *   image-1-1.png ... image-8-1.png were extracted from the original PPTX.
 */

const pptxgen = require('pptxgenjs');
const path = require('path');

const ASSETS = path.join(__dirname, 'assets');

// ---------------- Palette (sampled from original deck) ----------------
const C = {
  bgCream:   'EDE6DB', // slide background
  bgDark:    '1C1A17', // botanicals slide & accents
  cardSoft:  'E4DCCE', // image placeholder card
  inkBlack:  '1C1A17', // primary text
  inkBrown:  '5A463A', // eyebrow / caption text
  inkMuted:  '3A2E25', // body paragraphs
  accent:    '6B7355', // sage green (ampersand, etc.)
  accentWarm:'B8925A', // warm gold used on dark slide
  rule:      '1C1A17', // thin hairlines
  ruleLight: 'EDE6DB', // hairline on dark slide
};

// Fonts
const F_HEAD = 'Georgia';          // serif display for large titles
const F_SERIF = 'Georgia';         // serif for body
const F_SANS = 'Arial';            // sans for eyebrows / captions / numerals
// (Original PPTX hard-coded Arial everywhere; we keep Georgia for display titles
//  to preserve the editorial feel of the Bodoni/Didot-style cover. Swap to
//  F_HEAD = 'Arial' if you need an exact font match.)

// ---------------- Deck setup ----------------
const pres = new pptxgen();
pres.defineLayout({ name: 'SABLE20x1125', width: 20, height: 11.25 });
pres.layout = 'SABLE20x1125';
pres.title = 'Sable and Sage - Volume I';
pres.company = 'Sable and Sage';

// ---------------- Helpers ----------------

/** Thin horizontal rule (drawn as a 1px-tall rectangle). */
function hr(slide, { x, y, w, color = C.rule, h = 0.0104 }) {
  slide.addShape(pres.ShapeType.rect, {
    x, y, w, h, fill: { color }, line: { color, width: 0 },
  });
}

/** Soft card used behind photographs. */
function card(slide, { x, y, w, h, color = C.cardSoft }) {
  slide.addShape(pres.ShapeType.rect, {
    x, y, w, h, fill: { color }, line: { type: 'none' },
  });
}

/** Add a text box. `text` can be a string or an array of pptxgenjs text objects. */
function tx(slide, text, opts) {
  const base = {
    margin: 0.035,                  // matches original 25400 EMU inset
    valign: 'top',
    align: 'left',
    isTextBox: true,
    fontFace: F_SANS,
    color: C.inkBlack,
    fill: { type: 'none' },
    line: { type: 'none' },
  };
  slide.addText(text, { ...base, ...opts });
}

/** Eyebrow/caption — small tracked-out uppercase. */
function eyebrow(slide, s, { x, y, w, h = 0.35, align = 'left', color = C.inkBrown } = {}) {
  tx(slide, s, {
    x, y, w, h, align,
    fontFace: F_SANS, fontSize: 10, color,
    charSpacing: 8,    // tight but noticeable tracking
    bold: false,
  });
}

/** Standard page footer: section tag (left) + brand (right). */
function footer(slide, { sectionTag, brand = 'SABLE & SAGE' }) {
  if (sectionTag) {
    tx(slide, sectionTag, {
      x: 1.4583, y: 10.3167, w: 6, h: 0.3917,
      fontFace: F_SANS, fontSize: 11, color: C.inkBrown,
      charSpacing: 6,
    });
  }
  tx(slide, brand, {
    x: 13, y: 10.3583, w: 5.6, h: 0.35, align: 'right',
    fontFace: F_SANS, fontSize: 11, color: C.inkBrown,
    charSpacing: 8,
  });
}

/** Top hairline + left/right eyebrow row used on most content slides. */
function topBar(slide, { left, right, ruleColor = C.rule }) {
  hr(slide, { x: 1.4583, y: 0.5833, w: 17.0833, color: ruleColor });
  eyebrow(slide, left,  { x: 1.4583,  y: 1.6667, w: 8, align: 'left' });
  eyebrow(slide, right, { x: 10.5833, y: 1.6667, w: 8, align: 'right' });
}

// ============================================================
// SLIDE 1 — Cover
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bgCream };

  // Full-bleed botanical illustration (cream field + sprig on right)
  s.addImage({ path: path.join(ASSETS, 'image-1-1.png'), x: 0, y: 0, w: 20, h: 11.25 });

  // Top eyebrow row
  eyebrow(s, 'EST. MMXXIV · HUDSON VALLEY, NEW YORK',
    { x: 1.4583, y: 1.4583, w: 10.0822 });
  eyebrow(s, 'VOLUME I · INTRODUCTION',
    { x: 12.4482, y: 1.4583, w: 6.2763 });

  // Small subheading over title
  eyebrow(s, 'BOTANICALS FOR THE MODERN RITUAL',
    { x: 1.4583, y: 2.1417, w: 7.725 });

  // Headline — editorial serif, mixed upright + italic ampersand
  tx(s, [
    { text: 'Sable ',  options: { color: C.inkBlack, fontFace: F_HEAD, italic: false } },
    { text: '& ',      options: { color: C.accent,   fontFace: F_HEAD, italic: true  } },
    { text: 'Sage',    options: { color: C.inkBlack, fontFace: F_HEAD, italic: false } },
  ], {
    x: 1.4583, y: 3.0833, w: 7.725, h: 3.3667,
    fontSize: 126, charSpacing: -2, valign: 'top',
  });

  // Deck/tagline
  tx(s,
    'A small house of quiet botanicals — tea, oil, and air — made slowly, in small batches, by hand.',
    {
      x: 1.4583, y: 7.4, w: 5.5792, h: 2.0,
      fontFace: F_SERIF, fontSize: 20, italic: true, color: C.inkMuted,
      paraSpaceAfter: 6,
    });

  // Short rule + attribution
  hr(s, { x: 1.4583, y: 9.7375, w: 0.75 });
  eyebrow(s, 'AN INTRODUCTION BY THE MAKER',
    { x: 2.5, y: 9.5083, w: 6.1132 });

  footer(s, { sectionTag: null });
}

// ============================================================
// SLIDE 2 — A Note from the Maker
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bgCream };

  topBar(s, { left: 'I · THE MAKER', right: 'A NOTE' });

  // Left photograph block (studio/morning-light image)
  card(s, { x: 1.4583, y: 2.5, w: 6.6667, h: 7.2917 });
  s.addImage({
    path: path.join(ASSETS, 'image-2-1.png'),
    x: 1.4583, y: 2.5, w: 6.6667, h: 7.2917,
    sizing: { type: 'contain', w: 6.6667, h: 7.2917 },
  });
  eyebrow(s, 'Studio No. 04, morning light',
    { x: 1.75, y: 9.2167, w: 4, color: C.inkBrown });

  // Pull quote
  tx(s,
    '\u201CI began Sable & Sage at a kitchen table, with a kettle and a question: what might stillness taste like?\u201D',
    {
      x: 10.4167, y: 2.7083, w: 8.3688, h: 1.85,
      fontFace: F_SERIF, fontSize: 33, italic: true, color: C.inkMuted,
      paraSpaceAfter: 0,
    });

  // Body paragraphs
  tx(s,
    'What started as a private practice — steeping herbs from a small garden in the Hudson Valley — has grown, quietly, into a house of botanicals made for people who keep ritual close.',
    {
      x: 10.4167, y: 4.8583, w: 7.725, h: 1.85,
      fontFace: F_SERIF, fontSize: 16, color: C.inkMuted,
      paraSpaceAfter: 6,
    });

  tx(s,
    'We remain small on purpose. Every tin, every bottle, every bloom is measured by hand. Nothing leaves the studio until it has earned its place on the shelf.',
    {
      x: 10.4167, y: 6.9583, w: 7.725, h: 1.85,
      fontFace: F_SERIF, fontSize: 16, color: C.inkMuted,
    });

  // Signature
  tx(s, 'Mara Linwood', {
    x: 10.4167, y: 9.1479, w: 4, h: 0.6,
    fontFace: F_SERIF, fontSize: 22, italic: true, color: C.inkMuted,
  });
  eyebrow(s, 'FOUNDER & MAKER',
    { x: 10.4167, y: 9.8771, w: 8.3688 });

  footer(s, { sectionTag: '02   A NOTE' });
}

// ============================================================
// SLIDE 3 — Philosophy: Three Principles
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bgCream };

  topBar(s, { left: 'II · PHILOSOPHY', right: 'THREE PRINCIPLES' });

  // Headline (mixed upright + italic)
  tx(s, [
    { text: 'Slowness, ',       options: { color: C.inkBlack, fontFace: F_HEAD, italic: false } },
    { text: 'as a material.',   options: { color: C.inkBrown, fontFace: F_HEAD, italic: true  } },
  ], {
    x: 1.4583, y: 2.7083, w: 8.3688, h: 2.2083,
    fontSize: 78, charSpacing: -1, valign: 'top',
  });

  // Right-side standfirst
  tx(s,
    'We treat time the way others treat ingredients — carefully measured, rarely rushed, and the quiet difference between a product and a practice.',
    {
      x: 13.125, y: 3.125, w: 5.5792, h: 1.7417,
      fontFace: F_SERIF, fontSize: 14, italic: true, color: C.inkMuted,
    });

  // Three numbered principles, each with numeral / rule / heading / body
  const principles = [
    ['01', 'GROWN, NOT MANUFACTURED',
      'Botanicals from known gardens. Seasonal harvests. No shortcuts through laboratories.'],
    ['02', 'SMALL ON PURPOSE',
      'Batches of one hundred or fewer. Numbered by hand. Signed by the maker.'],
    ['03', 'FOR THE QUIET HOUR',
      'Made to accompany the parts of the day that belong to no one else.'],
  ];
  const xs = [1.4583, 7.8125, 14.1667];
  principles.forEach(([num, head, body], i) => {
    const x = xs[i];
    tx(s, num, {
      x, y: 6.5635, w: 4.5062, h: 0.6,
      fontFace: F_SERIF, fontSize: 22, italic: true, color: C.inkBrown,
    });
    hr(s, { x, y: 7.2677, w: 4.375 });
    eyebrow(s, head, { x, y: 7.5073, w: 4.5062, color: C.inkBlack });
    tx(s, body, {
      x, y: 8.2198, w: 4.5062, h: 1.4,
      fontFace: F_SERIF, fontSize: 13, color: C.inkMuted,
    });
  });

  footer(s, { sectionTag: '03   PHILOSOPHY' });
}

// ============================================================
// SLIDE 4 — The Collection (four products)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bgCream };

  topBar(s, { left: 'III · COLLECTION', right: 'FOUR HOUSES OF BOTANICALS' });

  // Headline
  tx(s, [
    { text: 'The ',        options: { color: C.inkBlack, fontFace: F_HEAD, italic: false } },
    { text: 'Collection',  options: { color: C.inkBrown, fontFace: F_HEAD, italic: true  } },
  ], {
    x: 1.4583, y: 2.5, w: 10, h: 0.9583,
    fontSize: 66, charSpacing: -1, valign: 'top',
  });

  const items = [
    { x: 1.4583,  img: 'image-4-1.png', eyebrow: '01 · TEA',        name: 'Herbal Teas',
      body: 'Single-garden harvests, steeped for the unhurried morning.' },
    { x: 5.8333,  img: 'image-4-2.png', eyebrow: '02 · ADAPTOGEN',  name: 'Adaptogenic Blends',
      body: 'Roots and mushrooms for the long, evenly-paced day.' },
    { x: 10.2083, img: 'image-4-3.png', eyebrow: '03 · OIL',        name: 'Botanical Oils',
      body: 'Cold-pressed blends, meant for skin and for touch.' },
    { x: 14.5833, img: 'image-4-4.png', eyebrow: '04 · AIR',        name: 'Signature Diffusers',
      body: 'A room as a season — cedar, fig leaf, smoke, rain.' },
  ];

  items.forEach(it => {
    card(s, { x: it.x, y: 4.0625, w: 3.9583, h: 3.5417 });
    s.addImage({
      path: path.join(ASSETS, it.img),
      x: it.x, y: 4.0625, w: 3.9583, h: 3.5417,
      sizing: { type: 'contain', w: 3.9583, h: 3.5417 },
    });
    eyebrow(s, it.eyebrow, { x: it.x, y: 7.8958, w: 4.0771, color: C.inkBrown });
    tx(s, it.name, {
      x: it.x, y: 8.2833, w: 4.0771, h: 0.6,
      fontFace: F_SERIF, fontSize: 18, italic: true, color: C.inkBlack,
    });
    tx(s, it.body, {
      x: it.x, y: 8.8885, w: 3.8625, h: 1.3,
      fontFace: F_SERIF, fontSize: 12, color: C.inkMuted,
    });
  });

  footer(s, { sectionTag: '04   THE COLLECTION' });
}

// ============================================================
// SLIDE 5 — The Botanicals (dark slide, nine signatures)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bgDark };

  // Top hairline (light on dark)
  hr(s, { x: 1.4583, y: 0.5833, w: 17.0833, color: C.bgCream });

  eyebrow(s, 'IV · THE BOTANICALS',
    { x: 1.4583, y: 1.6667, w: 8, color: C.bgCream });
  eyebrow(s, 'NINE SIGNATURES',
    { x: 10.5833, y: 1.6667, w: 8, color: C.bgCream, align: 'right' });

  // Headline
  tx(s, [
    { text: 'Nine plants, ',     options: { color: C.bgCream,    fontFace: F_HEAD, italic: false } },
    { text: 'known by name.',    options: { color: C.accentWarm, fontFace: F_HEAD, italic: true  } },
  ], {
    x: 1.4583, y: 2.2917, w: 12, h: 2.375,
    fontSize: 84, charSpacing: -1, valign: 'top',
  });

  // Botanical index row (full-bleed illustration strip)
  s.addImage({
    path: path.join(ASSETS, 'image-5-1.png'),
    x: 1.4583, y: 5.625, w: 17.0833, h: 3.9583,
    sizing: { type: 'contain', w: 17.0833, h: 3.9583 },
  });

  // Bottom eyebrow row on dark slide
  eyebrow(s, 'PL. IV · BOTANICAL INDEX',
    { x: 1.4583, y: 10.3833, w: 6, color: C.bgCream });
  eyebrow(s, 'SABLE & SAGE',
    { x: 13, y: 10.3583, w: 5.6, align: 'right', color: C.bgCream });
}

// ============================================================
// SLIDE 6 — The Ritual (a day, kept slowly)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bgCream };

  topBar(s, { left: 'V · THE RITUAL', right: 'A DAY, KEPT SLOWLY' });

  // Left image block (tall portrait)
  card(s, { x: 1.4583, y: 2.5, w: 5.625, h: 7.2917 });
  s.addImage({
    path: path.join(ASSETS, 'image-6-1.png'),
    x: 1.4583, y: 2.5, w: 5.625, h: 7.2917,
    sizing: { type: 'contain', w: 5.625, h: 7.2917 },
  });

  // Headline
  tx(s, [
    { text: 'The ',     options: { color: C.inkBlack, fontFace: F_HEAD, italic: false } },
    { text: 'Ritual',   options: { color: C.inkBrown, fontFace: F_HEAD, italic: true  } },
  ], {
    x: 9.1667, y: 2.5, w: 9.6562, h: 0.9583,
    fontSize: 66, charSpacing: -1, valign: 'top',
  });

  // Divider above first entry
  hr(s, { x: 9.1667, y: 3.875, w: 9.375 });

  // Three time-of-day entries
  const rituals = [
    { num: 'I.',   time: 'MORNING · 07:00',    head: 'A cup of Morning Still.',
      body: 'Tulsi, chamomile, and lemon verbena. Steeped seven minutes.', y: 4.1125, ruleY: 6.1542 },
    { num: 'II.',  time: 'AFTERNOON · 15:00',  head: 'A palm of Field Oil.',
      body: 'Rosehip, meadowfoam, and atlas cedar. Warmed between the hands.', y: 6.3917, ruleY: 8.4333 },
    { num: 'III.', time: 'EVENING · 21:00',    head: 'A room of Hearthsmoke.',
      body: 'Fig leaf, smoked cedar, and black tea. Lit at dusk, forgotten by sleep.', y: 8.6708, ruleY: 10.7125 },
  ];

  rituals.forEach(r => {
    tx(s, r.num, {
      x: 9.1667, y: r.y, w: 1.3333, h: 1.8542,
      fontFace: F_SERIF, fontSize: 28, italic: true, color: C.inkBrown,
    });
    eyebrow(s, r.time, { x: 10.4167, y: r.y, w: 8.3688, color: C.inkBrown });
    tx(s, r.head, {
      x: 10.4167, y: r.y + 0.3875, w: 8.3688, h: 0.6,
      fontFace: F_SERIF, fontSize: 22, italic: true, color: C.inkBlack,
    });
    tx(s, r.body, {
      x: 10.4167, y: r.y + 0.9729, w: 6.6521, h: 0.95,
      fontFace: F_SERIF, fontSize: 13, color: C.inkMuted,
    });
    hr(s, { x: 9.1667, y: r.ruleY, w: 9.375 });
  });

  footer(s, { sectionTag: '06   THE RITUAL' });
}

// ============================================================
// SLIDE 7 — Craft & Sourcing (map of origins)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bgCream };

  topBar(s, { left: 'VI · CRAFT & SOURCING', right: 'HOW, AND FROM WHERE' });

  // Headline
  tx(s, [
    { text: 'Made by hand, ',          options: { color: C.inkBlack, fontFace: F_HEAD, italic: false } },
    { text: 'from known ground.',       options: { color: C.inkBrown, fontFace: F_HEAD, italic: true  } },
  ], {
    x: 1.4583, y: 2.2917, w: 14, h: 2.375,
    fontSize: 84, charSpacing: -1, valign: 'top',
  });

  // World-map-dots illustration band
  s.addImage({
    path: path.join(ASSETS, 'image-7-1.png'),
    x: 1.4583, y: 5.625, w: 17.0833, h: 3.125,
    sizing: { type: 'contain', w: 17.0833, h: 3.125 },
  });

  // Origin callouts (positioned to match original)
  const origins = [
    { x: 1.4583,  y1: 5.9375, y2: 6.5458, eyebrow: '01 · HUDSON VALLEY', label: 'The home garden'   },
    { x: 4.6875,  y1: 7.9167, y2: 8.525,  eyebrow: '02 · PROVENCE',      label: 'Lavender & rose'   },
    { x: 8.5417,  y1: 5.9375, y2: 6.5458, eyebrow: '03 · ATLAS MTNS.',   label: 'Cedarwood'          },
    { x: 12.3958, y1: 7.9167, y2: 8.2417, eyebrow: '04 · KERALA',        label: 'Tulsi & cardamom'  },
    { x: 16.2469, y1: 5.9375, y2: 6.2625, eyebrow: '05 · YUNNAN',        label: 'Ancient tea'       },
  ];
  origins.forEach(o => {
    eyebrow(s, o.eyebrow, { x: o.x, y: o.y1, w: 2.5, color: C.inkBrown });
    tx(s, o.label, {
      x: o.x, y: o.y2, w: 2.5, h: 0.4,
      fontFace: F_SERIF, fontSize: 12, italic: true, color: C.inkMuted,
    });
  });

  // Closing body paragraph upper-right
  tx(s,
    'Every batch carries the name of the grower, the week of harvest, and the hand that packed it.',
    {
      x: 12.9625, y: 4.5833, w: 5.5792, h: 1.2417,
      fontFace: F_SERIF, fontSize: 14, italic: true, color: C.inkMuted,
    });

  footer(s, { sectionTag: '07   CRAFT & SOURCING' });
}

// ============================================================
// SLIDE 8 — In Closing / Contact
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bgCream };

  // Full-bleed closing illustration (cream field on left, brown panel with sprig + S&S seal on right)
  s.addImage({ path: path.join(ASSETS, 'image-8-1.png'), x: 0, y: 0, w: 20, h: 11.25 });

  eyebrow(s, 'VII · IN CLOSING',
    { x: 1.4583, y: 1.4583, w: 8 });
  eyebrow(s, 'THANK YOU',
    { x: 1.4583, y: 2.5, w: 8.7979, color: C.inkBrown });

  // Headline
  tx(s, [
    { text: 'Begin, when you are ',  options: { color: C.inkBlack, fontFace: F_HEAD, italic: false } },
    { text: 'ready.',                 options: { color: C.inkBrown, fontFace: F_HEAD, italic: true  } },
  ], {
    x: 1.4583, y: 3.2, w: 12, h: 2.0815,
    fontSize: 72, charSpacing: -1, valign: 'top',
  });

  tx(s,
    'We would be honoured to place a tin, a bottle, or a small wooden crate in your hands.',
    {
      x: 1.4583, y: 5.8232, w: 8, h: 1.2,
      fontFace: F_SERIF, fontSize: 18, italic: true, color: C.inkMuted,
    });

  // Contact columns
  eyebrow(s, 'STUDIO',
    { x: 1.4583, y: 8.4208, w: 3.2188, color: C.inkBrown });
  tx(s, 'Stone House Lane\nHudson Valley, New York', {
    x: 1.4583, y: 8.8083, w: 3.2188, h: 1.2,
    fontFace: F_SERIF, fontSize: 13, color: C.inkMuted,
    paraSpaceAfter: 2,
  });

  eyebrow(s, 'CORRESPONDENCE',
    { x: 4.5833, y: 8.4208, w: 3.2188, color: C.inkBrown });
  tx(s, 'mara@sableandsage.co\nsableandsage.co', {
    x: 4.5833, y: 8.8083, w: 3.2188, h: 1.2,
    fontFace: F_SERIF, fontSize: 13, color: C.inkMuted,
    paraSpaceAfter: 2,
  });

  // Footer line & end mark
  eyebrow(s, 'SABLE & SAGE · VOLUME I · MMXXVI',
    { x: 1.4583, y: 10.3833, w: 8, color: C.inkBrown });
  eyebrow(s, '— END —',
    { x: 15, y: 10.3833, w: 3.6, align: 'right', color: C.inkBrown });
}

// ---------------- Save ----------------
const outName = 'Sable_and_Sage.pptx';
pres.writeFile({ fileName: outName }).then(name => {
  console.log('Wrote', name);
});
