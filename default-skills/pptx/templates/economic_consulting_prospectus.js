// ============================================================================
// Econométricos Prospectus — pptxgenjs replica of Plan_1.pptx
// ============================================================================
// Run: `node build_plan.js`  →  produces `Plan_1_recreated.pptx`
//
// Layout: custom 20" × 11.25" (matches source)
// Font:   Arial throughout
// Palette:
//   BG_DARK      #121212   dark slides + most text on light slides
//   BG_LIGHT     #F4F1EA   light slides + light text on dark slides
//   TEXT_BODY    #2A2A2A   body copy on light slides
//   LABEL_MUTED  #6B6658   section labels on light slides
//   LABEL_LIGHT  #A8A196   section labels on dark slides
//   ACCENT_GRAY  #C8C2B2   muted accent on dark slides
// ============================================================================

const PptxGenJS = require('pptxgenjs');

// ---------------------------------------------------------------------------
// Chart images (embedded as base64 so this file is self-contained)
// ---------------------------------------------------------------------------
const IMG_CURVE       = 'data:image/png;base64,PLACEHOLDER';
const IMG_CALIBRATION = 'data:image/png;base64,PLACEHOLDER';

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------
const C = {
  BG_DARK:     '121212',
  BG_LIGHT:    'F4F1EA',
  TEXT_DARK:   '121212',
  TEXT_BODY:   '2A2A2A',
  TEXT_BLACK:  '000000',
  LABEL_MUTED: '6B6658',
  LABEL_LIGHT: 'A8A196',
  ACCENT_GRAY: 'C8C2B2',
};

// ---------------------------------------------------------------------------
// Presentation setup
// ---------------------------------------------------------------------------
const pres = new PptxGenJS();
pres.defineLayout({ name: 'CUSTOM_20x11_25', width: 20, height: 11.25 });
pres.layout = 'CUSTOM_20x11_25';
pres.title  = 'Econométricos — Prospectus Vol. 01 · 2026';

const FONT = 'Arial';

// Helper: thin dark rule (renders as faint line because the height is ~0.75pt)
const RULE_COLOR_DARK  = 'C8C2B2'; // faint warm gray — matches original's hairline look on light slides
const RULE_COLOR_LIGHT = 'C8C2B2'; // same on dark slides
const rule = (slide, x, y, w, color = RULE_COLOR_DARK) =>
  slide.addShape(pres.ShapeType.rect, {
    x, y, w, h: 0.01, fill: { color }, line: { type: 'none' },
  });

// Helper: vertical rule
const vrule = (slide, x, y, h, color = RULE_COLOR_DARK) =>
  slide.addShape(pres.ShapeType.rect, {
    x, y, w: 0.01, h, fill: { color }, line: { type: 'none' },
  });

// Helper: common header row (brand name top-left, section ID top-right)
const addHeader = (slide, sectionId, onDark = false) => {
  const col = onDark ? C.LABEL_LIGHT : C.LABEL_MUTED;
  slide.addText('ECONOMETRICOS', {
    x: 1.31, y: 0.50, w: 3.5, h: 0.38,
    fontFace: FONT, fontSize: 18, color: col, charSpacing: 2.52,
    valign: 'top', margin: 0,
  });
  // section ID is right-aligned within its own box, so the box can be made wide
  slide.addText(sectionId, {
    x: 12.0, y: 0.53, w: 7.05, h: 0.33,
    fontFace: FONT, fontSize: 18, color: col, charSpacing: 2.52,
    align: 'right', valign: 'top', margin: 0,
  });
};

// Helper: common footer (page number left, note right)
const addFooter = (slide, pageStr, noteStr, noteAlign = 'right', onDark = false) => {
  const col = onDark ? C.LABEL_LIGHT : C.LABEL_MUTED;
  slide.addText(pageStr, {
    x: 1.04, y: 10.47, w: 3.0, h: 0.33,
    fontFace: FONT, fontSize: 18, color: col, charSpacing: 2.52,
    align: 'left', valign: 'top', margin: 0,
  });
  if (noteStr) {
    slide.addText(noteStr, {
      x: 8.0, y: 10.47, w: 11.0, h: 0.33,
      fontFace: FONT, fontSize: 18, color: col, charSpacing: 2.52,
      align: noteAlign, valign: 'top', margin: 0,
    });
  }
};

// ============================================================================
// SLIDE 1 — Cover
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.BG_DARK };

  addHeader(s, 'ESTABLISHED MMXXVI · LAUNCH MATERIALS', true);

  // Tagline above the wordmark
  s.addText('A NEW ECONOMIC CONSULTING FIRM', {
    x: 1.04, y: 2.92, w: 18.45, h: 0.38,
    fontFace: FONT, fontSize: 18, color: C.LABEL_LIGHT, charSpacing: 2.52,
    valign: 'top', margin: 0,
  });

  // Massive wordmark — 180pt
  s.addText('Econométricos.', {
    x: 1.04, y: 3.67, w: 18.45, h: 2.49,
    fontFace: FONT, fontSize: 180, color: C.BG_LIGHT, charSpacing: -1.8,
    valign: 'top', margin: 0,
  });

  // Italic tagline below
  s.addText('Forecasting for decisions that move markets.', {
    x: 1.04, y: 6.70, w: 7.5, h: 1.3,
    fontFace: FONT, fontSize: 42, italic: true, color: C.BG_LIGHT, charSpacing: -0.42,
    valign: 'top', margin: 0,
  });

  // Right-hand masthead box
  s.addText('Prospectus', {
    x: 17.07, y: 7.01, w: 1.89, h: 0.45,
    fontFace: FONT, fontSize: 21, color: C.LABEL_LIGHT,
    align: 'right', valign: 'top', margin: 0,
  });
  s.addText('Vol. 01 · 2026', {
    x: 17.07, y: 7.48, w: 1.89, h: 0.45,
    fontFace: FONT, fontSize: 21, color: C.BG_LIGHT,
    align: 'right', valign: 'top', margin: 0,
  });

  // Footer (cover slide: no page number, just URL and offices)
  s.addText('ECONOMETRICOS.CO', {
    x: 1.04, y: 10.47, w: 3.36, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.LABEL_LIGHT, charSpacing: 2.52,
    valign: 'top', margin: 0,
  });
  s.addText('NYC · LONDON · SINGAPORE', {
    x: 14.57, y: 10.47, w: 4.52, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.LABEL_LIGHT, charSpacing: 2.52,
    align: 'right', valign: 'top', margin: 0,
  });
}

// ============================================================================
// SLIDE 2 — The Mandate (curve chart + 3.1× callout)
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.BG_LIGHT };

  addHeader(s, '02 · THE MANDATE');

  // Eyebrow
  s.addText('THE FORECASTING GAP', {
    x: 1.04, y: 1.46, w: 16.31, h: 0.33,
    fontFace: FONT, fontSize: 15, color: C.LABEL_MUTED, charSpacing: 2.1,
    valign: 'top', margin: 0,
  });

  // Big headline
  s.addText('Consensus forecasts miss exactly when it matters.', {
    x: 1.04, y: 2.12, w: 16.09, h: 2.4,
    fontFace: FONT, fontSize: 72, color: C.TEXT_DARK, charSpacing: -0.72,
    valign: 'top', margin: 0,
  });

  // Curve chart (embedded PNG)
  s.addImage({ data: IMG_CURVE, x: 1.04, y: 6.19, w: 9.54, h: 3.81 });

  // Vertical divider between chart and callout
  vrule(s, 11.33, 7.41, 2.59);

  // 3.1× stat
  s.addText(
    [
      { text: '3.1', options: { fontSize: 60, color: C.TEXT_BLACK, charSpacing: -1.2 } },
      { text: '×',   options: { fontSize: 30, color: C.TEXT_BODY,  charSpacing: -1.2 } },
    ],
    { x: 11.84, y: 7.41, w: 7.33, h: 0.83, fontFace: FONT, valign: 'top', margin: 0 }
  );
  // Supporting copy
  s.addText(
    'Average consensus error multiplies at inflection points — the moments clients actually need a number they can stand behind.',
    {
      x: 11.84, y: 8.37, w: 5.5, h: 1.68,
      fontFace: FONT, fontSize: 21, color: C.TEXT_BODY,
      valign: 'top', margin: 0, paraSpaceAfter: 2,
    }
  );

  addFooter(s, '02 / 08', 'SOURCE: ROLLING 20-YEAR SURVEY OF PROFESSIONAL FORECASTERS');
}

// ============================================================================
// SLIDE 3 — Coverage pillars
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.BG_LIGHT };

  addHeader(s, '03 · COVERAGE');

  s.addText('WHAT WE FORECAST', {
    x: 1.04, y: 1.46, w: 18.45, h: 0.33,
    fontFace: FONT, fontSize: 15, color: C.LABEL_MUTED, charSpacing: 2.1,
    valign: 'top', margin: 0,
  });

  s.addText('Three coverage pillars, one integrated model.', {
    x: 1.04, y: 2.12, w: 18, h: 2.0,
    fontFace: FONT, fontSize: 66, color: C.TEXT_DARK, charSpacing: -0.66,
    valign: 'top', margin: 0,
  });

  s.addText(
    'We forecast the quantities clients make decisions against — not the ones that make good headlines.',
    {
      x: 1.04, y: 4.35, w: 10.73, h: 1.1,
      fontFace: FONT, fontSize: 25.5, color: C.TEXT_BODY, charSpacing: -0.13,
      valign: 'top', margin: 0,
    }
  );

  // Three pillar cards — positions from the source XML
  const pillars = [
    { x: 1.04,  eyebrow: 'PILLAR 01 — MACRO',  title: 'Growth, inflation, rates, FX.',    body: 'Quarterly paths with 80/95% bands across G10 and 18 EM economies.' },
    { x: 7.02,  eyebrow: 'PILLAR 02 — POLICY', title: 'Fiscal, monetary, regulatory.',    body: 'Decision-tree probabilities for central bank moves, tariffs, and legislative paths.' },
    { x: 12.99, eyebrow: 'PILLAR 03 — SECTOR', title: 'Energy, housing, labor, semis.',   body: 'Bottom-up demand and price models for sectors where macro cycles bite hardest.' },
  ];

  pillars.forEach(p => {
    // Card outline (soft neutral border)
    s.addShape(pres.ShapeType.rect, {
      x: p.x, y: 6.08, w: 5.96, h: 2.75,
      fill: { type: 'none' },
      line: { color: 'B5AFA0', width: 0.5 },
    });
    s.addText(p.eyebrow, {
      x: p.x + 0.30, y: 6.41, w: 5.54, h: 0.28,
      fontFace: FONT, fontSize: 11.25, color: C.LABEL_MUTED, charSpacing: 1.35,
      valign: 'top', margin: 0,
    });
    s.addText(p.title, {
      x: p.x + 0.30, y: 6.74, w: 5.54, h: 0.85,
      fontFace: FONT, fontSize: 25.5, color: C.TEXT_DARK,
      valign: 'top', margin: 0,
    });
    s.addText(p.body, {
      x: p.x + 0.30, y: 7.63, w: 5.54, h: 1.0,
      fontFace: FONT, fontSize: 15, color: C.TEXT_BODY,
      valign: 'top', margin: 0,
    });
  });

  // Bottom meta row (label + value pairs)
  const meta = [
    { x: 1.04,  label: 'COVERAGE · ', value: '28 ECONOMIES' },
    { x: 4.55,  label: 'HORIZON · ',  value: '1Q – 10Y'     },
    { x: 7.34,  label: 'UPDATE · ',   value: 'WEEKLY'       },
    { x: 9.71,  label: 'DELIVERY · ', value: 'API + BRIEFING' },
  ];
  meta.forEach(m => {
    s.addText(
      [
        { text: m.label, options: { color: C.LABEL_MUTED } },
        { text: m.value, options: { color: C.TEXT_DARK   } },
      ],
      {
        x: m.x, y: 9.75, w: 4, h: 0.29,
        fontFace: FONT, fontSize: 13.5, charSpacing: 1.35,
        valign: 'top', margin: 0,
      }
    );
  });

  addFooter(s, '03 / 08', 'COVERAGE EXPANDS ON CLIENT DEMAND');
}

// ============================================================================
// SLIDE 4 — Modeling stack (four layer rows)
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.BG_LIGHT };

  addHeader(s, '04 · METHOD');

  s.addText('OUR MODELING STACK', {
    x: 1.04, y: 1.46, w: 18.45, h: 0.33,
    fontFace: FONT, fontSize: 15, color: C.LABEL_MUTED, charSpacing: 2.1,
    valign: 'top', margin: 0,
  });
  s.addText('Four layers, stacked from theory to signal.', {
    x: 1.04, y: 2.12, w: 18, h: 2.0,
    fontFace: FONT, fontSize: 66, color: C.TEXT_DARK, charSpacing: -0.66,
    valign: 'top', margin: 0,
  });

  // Horizontal rules between rows (omit the bottom-of-page one — it collides with the footer)
  [4.19, 5.70, 7.21, 9.18].forEach(y => rule(s, 1.04, y, 17.92));

  // Four layer rows — titleH per row matches the wrapping of the title at 33pt
  const layers = [
    { id: 'L.01', y: 4.49, titleH: 0.96, title: 'Structural core',        body: 'DSGE and semi-structural models that enforce economic theory — identities, Euler equations, long-run neutrality — so baselines stay coherent.', tag: 'THEORY-BOUND' },
    { id: 'L.02', y: 6.00, titleH: 0.96, title: 'Statistical overlay',    body: 'Bayesian VARs and state-space models absorb recent data, widening bands when the signal gets noisy rather than pretending confidence.',    tag: 'DATA-BOUND'   },
    { id: 'L.03', y: 7.51, titleH: 1.42, title: 'High-frequency nowcast', body: 'Card spend, shipping, satellite, and scraped price indices give us a read on the current quarter before official releases arrive.',        tag: 'REAL-TIME'    },
    { id: 'L.04', y: 9.48, titleH: 0.96, title: 'Judgement & scenarios',  body: "Senior economists set named scenarios and probability weights — models don't vote on their own outputs.",                                  tag: 'HUMAN'        },
  ];

  layers.forEach(L => {
    s.addText(L.id, {
      x: 1.04, y: L.y + 0.22, w: 1.02, h: 0.26,
      fontFace: FONT, fontSize: 13.5, color: C.LABEL_MUTED, charSpacing: 1.89,
      valign: 'top', margin: 0,
    });
    s.addText(L.title, {
      x: 2.31, y: L.y, w: 2.79, h: L.titleH,
      fontFace: FONT, fontSize: 33, color: C.TEXT_DARK,
      valign: 'top', margin: 0,
    });
    s.addText(L.body, {
      x: 5.35, y: L.y + 0.13, w: 11.74, h: 1.0,
      fontFace: FONT, fontSize: 18, color: C.TEXT_BODY,
      valign: 'top', margin: 0,
    });
    s.addText(L.tag, {
      x: 17.00, y: L.y + 0.24, w: 1.96, h: 0.23,
      fontFace: FONT, fontSize: 12, color: C.LABEL_MUTED, charSpacing: 1.2,
      align: 'right', valign: 'top', margin: 0,
    });
  });

  addFooter(s, '04 / 08', 'EVERY FORECAST CARRIES ITS LAYER ATTRIBUTION');
}

// ============================================================================
// SLIDE 5 — Track record (calibration chart + 3 stat callouts)
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.BG_LIGHT };

  addHeader(s, '05 · TRACK RECORD');

  s.addText('CALIBRATION, NOT ACCURACY', {
    x: 1.04, y: 1.46, w: 8.38, h: 0.33,
    fontFace: FONT, fontSize: 15, color: C.LABEL_MUTED, charSpacing: 2.1,
    valign: 'top', margin: 0,
  });

  // Headline with italic break
  s.addText(
    [
      { text: 'An 80% band should be wrong ', options: { color: C.TEXT_DARK } },
      { text: '20% of the time.',              options: { color: C.TEXT_BLACK, italic: true } },
    ],
    {
      x: 1.04, y: 2.12, w: 8.5, h: 2.8,
      fontFace: FONT, fontSize: 57, charSpacing: -0.57,
      valign: 'top', margin: 0,
    }
  );

  s.addText(
    'Point accuracy rewards lucky bets. We publish hit-rates against stated confidence bands — the only honest forecasting scorecard.',
    {
      x: 1.04, y: 4.92, w: 6.01, h: 1.8,
      fontFace: FONT, fontSize: 21, color: C.TEXT_BODY,
      valign: 'top', margin: 0,
    }
  );

  // Calibration chart (embedded PNG)
  s.addImage({ data: IMG_CALIBRATION, x: 10.01, y: 1.56, w: 6.46, h: 5.17 });

  // Horizontal rule above stat row
  rule(s, 1.04, 8.33, 17.92);

  // Stat callouts
  const stats = [
    { x: 1.04,  big: '82%', small: '', body: 'Realized hit-rate on 80% bands, 2018–2025 backtest.' },
    { x: 7.18,  big: '4.2', small: 'bp', body: 'Median 1Q rate forecast error, G10 central banks.' },
    { x: 13.32, big: '0',   small: '/12', body: 'Recession calls missed; two false alarms disclosed.' },
  ];

  stats.forEach(st => {
    const runs = [{ text: st.big, options: { fontSize: 42, color: C.TEXT_DARK } }];
    if (st.small) runs.push({ text: st.small, options: { fontSize: 21, color: C.LABEL_MUTED } });
    s.addText(runs, {
      x: st.x, y: 8.63, w: 5.81, h: 0.75,
      fontFace: FONT, valign: 'top', margin: 0,
    });
    s.addText(st.body, {
      x: st.x, y: 9.30, w: 5.81, h: 0.85,
      fontFace: FONT, fontSize: 18, color: C.TEXT_BODY,
      valign: 'top', margin: 0,
    });
  });

  addFooter(s, '05 / 08', 'BACKTEST METHODOLOGY AVAILABLE UNDER NDA');
}

// ============================================================================
// SLIDE 6 — Deliverables (2×2 grid)
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.BG_LIGHT };

  addHeader(s, '06 · DELIVERABLES');

  s.addText('WHAT CLIENTS RECEIVE', {
    x: 1.04, y: 1.46, w: 18.45, h: 0.33,
    fontFace: FONT, fontSize: 15, color: C.LABEL_MUTED, charSpacing: 2.1,
    valign: 'top', margin: 0,
  });
  s.addText('Four artifacts. One decision-ready number.', {
    x: 1.04, y: 2.12, w: 18, h: 2.0,
    fontFace: FONT, fontSize: 66, color: C.TEXT_DARK, charSpacing: -0.66,
    valign: 'top', margin: 0,
  });

  // Grid rules
  rule(s, 1.04, 5.20, 17.92);         // top
  rule(s, 1.04, 7.59, 8.96);          // mid-left
  rule(s, 10.00, 7.59, 8.96);         // mid-right
  rule(s, 1.04, 9.99, 8.96);          // bottom-left
  rule(s, 10.00, 9.99, 8.96);         // bottom-right
  vrule(s, 9.99, 5.20, 4.80);         // vertical divider

  const cells = [
    { col: 1.04,  row: 5.62, eyebrow: '01 — WEEKLY',     title: 'The Baseline Update', body: 'Revised forecast paths, drift commentary, and flagged model disagreements — delivered every Monday at 06:00 local.' },
    { col: 10.62, row: 5.62, eyebrow: '02 — QUARTERLY',  title: 'The Scenario Book',   body: 'Three to five named scenarios with explicit probabilities, transmission mechanics, and client-specific P&L overlays.' },
    { col: 1.04,  row: 8.02, eyebrow: '03 — ON DEMAND',  title: 'Bespoke Modelling',   body: 'Custom structural work — tariff pass-through, supply shocks, labor substitution — built in two to six weeks.' },
    { col: 10.62, row: 8.02, eyebrow: '04 — CONTINUOUS', title: 'Data & API Access',   body: 'Every series we publish, with vintages, revisions, and confidence bands, streamed to your warehouse.' },
  ];

  cells.forEach(c => {
    s.addText(c.eyebrow, {
      x: c.col, y: c.row, w: 8.57, h: 0.26,
      fontFace: FONT, fontSize: 11.25, color: C.LABEL_MUTED, charSpacing: 1.58,
      valign: 'top', margin: 0,
    });
    s.addText(c.title, {
      x: c.col, y: c.row + 0.37, w: 8.57, h: 0.55,
      fontFace: FONT, fontSize: 30, color: C.TEXT_DARK,
      valign: 'top', margin: 0,
    });
    s.addText(c.body, {
      x: c.col, y: c.row + 0.97, w: 8.57, h: 1.2,
      fontFace: FONT, fontSize: 16.5, color: C.TEXT_BODY,
      valign: 'top', margin: 0,
    });
  });

  addFooter(s, '06 / 08', 'ALL DELIVERABLES CARRY MODEL ATTRIBUTION');
}

// ============================================================================
// SLIDE 7 — Engagement model (pricing table)
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.BG_LIGHT };

  addHeader(s, '07 · ENGAGEMENT');

  s.addText('ENGAGEMENT MODEL', {
    x: 1.04, y: 1.46, w: 18.45, h: 0.33,
    fontFace: FONT, fontSize: 15, color: C.LABEL_MUTED, charSpacing: 2.1,
    valign: 'top', margin: 0,
  });
  s.addText('Three tiers. No lock-in beyond one quarter.', {
    x: 1.04, y: 2.12, w: 18, h: 2.0,
    fontFace: FONT, fontSize: 66, color: C.TEXT_DARK, charSpacing: -0.66,
    valign: 'top', margin: 0,
  });

  // Column x-positions and widths
  const cols = [
    { x: 1.25,  w: 3.64, align: 'left'  },  // TIER
    { x: 5.19,  w: 4.38, align: 'left'  },  // BUILT FOR
    { x: 9.85,  w: 4.38, align: 'left'  },  // WHAT'S INCLUDED
    { x: 14.51, w: 2.17, align: 'left'  },  // CADENCE
    { x: 16.93, w: 1.82, align: 'right' },  // FEE
  ];
  const headers = ['TIER', 'BUILT FOR', "WHAT'S INCLUDED", 'CADENCE', 'FEE'];

  // Thin rules across full table (one set per row)
  const ruleYs = [4.28, 5.01, 6.13, 7.57];
  ruleYs.forEach(y => rule(s, 1.04, y, 17.92));

  // Header row
  headers.forEach((h, i) => {
    s.addText(h, {
      x: cols[i].x, y: 4.54, w: cols[i].w, h: 0.26,
      fontFace: FONT, fontSize: 12, color: C.LABEL_MUTED, charSpacing: 1.68,
      align: cols[i].align, valign: 'top', margin: 0,
    });
  });

  // Data rows
  const rows = [
    {
      y: 5.27,
      tier: 'Observer',
      built: 'Treasuries, small funds, policy offices tracking a few series.',
      incl:  'Weekly baseline, quarterly scenario book, data API.',
      cad:   'Weekly',
      fee:   [{ text: '$8k',  options: { color: C.TEXT_DARK } }, { text: '/qtr', options: { color: C.LABEL_MUTED } }],
    },
    {
      y: 6.39,
      tier: 'Advisor',
      built: 'Asset managers and corporates needing a named economist on call.',
      incl:  'Observer tier + two briefings/quarter + one bespoke study.',
      cad:   'Weekly + ad hoc',
      fee:   [{ text: '$35k', options: { color: C.TEXT_DARK } }, { text: '/qtr', options: { color: C.LABEL_MUTED } }],
    },
    {
      y: 7.83,
      tier: 'Partner',
      built: 'Institutions embedding forecasts in committee and investment process.',
      incl:  'Advisor tier + board-level presentations + unlimited bespoke.',
      cad:   'Continuous',
      fee:   [{ text: 'Bespoke', options: { color: C.TEXT_DARK } }],
    },
  ];

  rows.forEach(r => {
    // Tier name (large)
    s.addText(r.tier, {
      x: cols[0].x, y: r.y, w: cols[0].w, h: 1.0,
      fontFace: FONT, fontSize: 30, color: C.TEXT_DARK,
      valign: 'top', margin: 0,
    });
    // Built for
    s.addText(r.built, {
      x: cols[1].x, y: r.y, w: cols[1].w, h: 1.0,
      fontFace: FONT, fontSize: 19.5, color: C.TEXT_DARK,
      valign: 'top', margin: 0,
    });
    // Included
    s.addText(r.incl, {
      x: cols[2].x, y: r.y, w: cols[2].w, h: 1.0,
      fontFace: FONT, fontSize: 19.5, color: C.TEXT_DARK,
      valign: 'top', margin: 0,
    });
    // Cadence
    s.addText(r.cad, {
      x: cols[3].x, y: r.y, w: cols[3].w, h: 1.0,
      fontFace: FONT, fontSize: 19.5, color: C.TEXT_DARK,
      valign: 'top', margin: 0,
    });
    // Fee (right aligned, potentially two-tone)
    s.addText(r.fee, {
      x: cols[4].x, y: r.y, w: cols[4].w, h: 1.0,
      fontFace: FONT, fontSize: 19.5,
      align: 'right', valign: 'top', margin: 0,
    });
  });

  // Bullet row
  rule(s, 1.04, 9.29, 17.92);
  const bullets = [
    { x: 1.04,  text: '90-DAY TRIAL AVAILABLE' },
    { x: 5.58,  text: 'NO EQUITY RESEARCH CROSS-SELL' },
    { x: 11.85, text: 'INDEPENDENT OWNERSHIP' },
  ];
  bullets.forEach(b => {
    s.addText(
      [
        { text: '●  ',    options: { color: C.TEXT_BLACK } },
        { text: b.text,   options: { color: C.TEXT_BODY  } },
      ],
      {
        x: b.x, y: 9.59, w: 6, h: 0.45,
        fontFace: FONT, fontSize: 21,
        valign: 'top', margin: 0,
      }
    );
  });

  addFooter(s, '07 / 08', 'FEES EXCLUSIVE OF APPLICABLE TAXES');
}

// ============================================================================
// SLIDE 8 — Next (dark closing slide)
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.BG_DARK };

  addHeader(s, '08 · NEXT', true);

  s.addText('NOW OPEN TO FOUNDING CLIENTS', {
    x: 1.04, y: 2.08, w: 18.45, h: 0.33,
    fontFace: FONT, fontSize: 15, color: C.LABEL_LIGHT, charSpacing: 2.1,
    valign: 'top', margin: 0,
  });

  // Giant headline with italic Q3 2026
  s.addText(
    [
      { text: 'First forecasts ship ', options: { color: C.BG_LIGHT } },
      { text: 'Q3 2026',               options: { color: C.TEXT_BLACK, italic: true } },
      { text: '.',                     options: { color: C.BG_LIGHT } },
    ],
    {
      x: 1.04, y: 2.78, w: 18.24, h: 4.0,
      fontFace: FONT, fontSize: 135, charSpacing: -1.35,
      valign: 'top', margin: 0,
    }
  );

  // Italic sub-copy
  s.addText(
    'Founding clients lock current fees through 2028 and help shape the coverage roadmap.',
    {
      x: 1.04, y: 6.97, w: 14, h: 0.95,
      fontFace: FONT, fontSize: 30, italic: true, color: C.ACCENT_GRAY, charSpacing: -0.30,
      valign: 'top', margin: 0,
    }
  );

  // Light rule below italic copy
  rule(s, 1.04, 7.96, 17.92, C.BG_LIGHT);

  // Three info columns
  s.addText('CONTACT', {
    x: 1.04, y: 8.47, w: 5.72, h: 0.33,
    fontFace: FONT, fontSize: 15, color: C.LABEL_LIGHT, charSpacing: 2.1,
    valign: 'top', margin: 0,
  });
  s.addText(
    [
      { text: 'Amara Okafor ',     options: { fontSize: 27, color: C.BG_LIGHT   } },
      { text: 'MANAGING PARTNER',  options: { fontSize: 18, color: C.LABEL_LIGHT } },
    ],
    { x: 1.04, y: 8.90, w: 5.72, h: 0.85, fontFace: FONT, charSpacing: -0.27, valign: 'top', margin: 0 }
  );

  s.addText('EMAIL', {
    x: 7.22, y: 8.47, w: 5.72, h: 0.33,
    fontFace: FONT, fontSize: 15, color: C.LABEL_LIGHT, charSpacing: 2.1,
    valign: 'top', margin: 0,
  });
  s.addText('founding@econometricos.co', {
    x: 7.22, y: 8.90, w: 5.72, h: 0.4,
    fontFace: FONT, fontSize: 19.5, color: C.BG_LIGHT,
    valign: 'top', margin: 0,
  });
  s.addText('+1 (212) 555–0142', {
    x: 7.22, y: 9.31, w: 5.72, h: 0.35,
    fontFace: FONT, fontSize: 15, color: C.LABEL_LIGHT,
    valign: 'top', margin: 0,
  });

  s.addText('OFFICES', {
    x: 13.40, y: 8.47, w: 5.72, h: 0.33,
    fontFace: FONT, fontSize: 15, color: C.LABEL_LIGHT, charSpacing: 2.1,
    valign: 'top', margin: 0,
  });
  s.addText('NYC · 2 Bryant Park   LON · 30 St. Mary Axe   SGP · Marina Bay', {
    x: 13.40, y: 8.90, w: 5.72, h: 1.2,
    fontFace: FONT, fontSize: 16.5, color: C.BG_LIGHT,
    valign: 'top', margin: 0,
  });

  // Footer
  s.addText('08 / 08 · END', {
    x: 1.04, y: 10.47, w: 3.0, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.LABEL_LIGHT, charSpacing: 2.52,
    valign: 'top', margin: 0,
  });
  s.addText('ECONOMETRICOS.CO', {
    x: 15.69, y: 10.47, w: 3.36, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.LABEL_LIGHT, charSpacing: 2.52,
    align: 'right', valign: 'top', margin: 0,
  });
}

// ============================================================================
// Write the file
// ============================================================================
pres.writeFile({ fileName: 'Plan_1_recreated.pptx' })
  .then(fn => console.log(`Wrote: ${fn}`))
  .catch(err => { console.error(err); process.exit(1); });
