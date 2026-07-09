// ============================================================
// THERMAL CAFE — Exact Reconstruction from manually edited PPTX
// Reverse-engineered from uploaded_deck.pptx via XML analysis
//
// IMAGE FILES REQUIRED (place in same directory as this script):
//   uploaded_img/photo_hotsprings.png  — hot springs photo (cover + slide 7 left)
//   uploaded_img/south_end_map.png     — South End map (slide 3)
//   uploaded_img/floor_plan.png        — floor plan (slide 6)
//   uploaded_img/photo_infrared.png    — infrared cycling photo (slide 7 right)
//   uploaded_img/photo_yoga.png        — yoga/pilates photo (slide 8 left)
//   uploaded_img/photo_strength.png    — strength floor photo (slide 8 right)
//   uploaded_img/photo_cafe.png        — cafe photo (slide 9)
//
// Run: node create_exact.js
// Output: Thermal_Cafe_Dark_Premium.pptx
// ============================================================

const pptxgen = require("pptxgenjs");
const path    = require("path");
const fs      = require("fs");

const p = new pptxgen();
p.layout  = "LAYOUT_WIDE"; // 13.333" × 7.5"
p.author  = "Thermal Cafe";
p.title   = "Thermal Cafe — Investor Presentation";

// ─────────────────────────────────────────────────────────────
// EXACT COLOR PALETTE (from XML srgbClr values)
// ─────────────────────────────────────────────────────────────
const C = {
  bg:         "0D1B2A",  // slide background — all slides
  bgMid:      "112236",  // table header fill, ask banner sub-text bg
  bgCard:     "16293F",  // card surface / table odd rows
  bgCardAlt:  "1A3050",  // table even rows
  gold:       "C9A84C",  // primary accent — eyebrows, stats, pips, bullets
  teal:       "4EC9B0",  // pillar 2 accent
  salmon:     "FF7E79",  // pillar 3 accent (manually changed in deck)
  white:      "F0EDE6",  // warm white — headlines
  body:       "B8C4D0",  // body text / timeline detail
  muted:      "6B8299",  // captions, sources, footer, kpi labels
  ruleBright: "2D4F6B",  // visible rules / axis / dividers
  ruleSubtle: "1E3A52",  // footer rule
  ruleFaint:  "2D4F6B",  // kpi row rules (same as ruleBright)
};

// ─────────────────────────────────────────────────────────────
// LAYOUT CONSTANTS (all measured in inches from XML EMU values)
// ─────────────────────────────────────────────────────────────
const PW   = 13.333;
const PH   = 7.5;
const M    = 0.55;        // left margin
const CW   = 12.233;      // content width (PW - 2*M)
const FONT = "Calibri";

// Title block positions (shared across all content slides)
const PIP_X      = 0.55;   // gold left pip x
const PIP_Y      = 0.40;   // gold pip y
const PIP_W      = 0.038;  // gold pip width
const PIP_H      = 1.25;   // gold pip height
const EYEBROW_X  = 0.67;
const EYEBROW_Y  = 0.40;
const EYEBROW_W  = 12.113;
const EYEBROW_H  = 0.26;
const TITLE_X    = 0.67;
const TITLE_Y    = 0.68;
const TITLE_H    = 0.88;
const DIVIDER_Y  = 1.65;
const SOURCE_Y   = 6.92;
const FRULE_Y    = 7.14;   // footer rule y
const FOOT_Y     = 7.20;

const R = (f) => path.resolve(__dirname, f);

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

// Shadow — fresh object each call (pptxgenjs mutates in-place)
const mkShadow = () => ({ type: "outer", blur: 16, offset: 3, angle: 135, color: "000000", opacity: 0.40 });

// Standard title block used on every content slide (slides 2–14)
function titleBlock(s, eyebrow, headline, headlineW) {
  // Gold left pip
  s.addShape(p.shapes.RECTANGLE, {
    x: PIP_X, y: PIP_Y, w: PIP_W, h: PIP_H,
    fill: { color: C.gold }, line: { type: "none" },
  });
  // Eyebrow
  s.addText(eyebrow, {
    x: EYEBROW_X, y: EYEBROW_Y, w: headlineW || EYEBROW_W, h: EYEBROW_H,
    fontSize: 11, bold: true, color: C.gold, fontFace: FONT, charSpacing: 3.5, margin: 0,
  });
  // Headline
  s.addText(headline, {
    x: TITLE_X, y: TITLE_Y, w: headlineW || 12.4567, h: TITLE_H,
    fontSize: 22, bold: true, color: C.white, fontFace: FONT,
    valign: "top", lineSpacingMultiple: 1.18, margin: 0,
  });
  // Divider rule
  s.addShape(p.shapes.RECTANGLE, {
    x: M, y: DIVIDER_Y, w: CW, h: 0.018,
    fill: { color: C.ruleBright }, line: { type: "none" },
  });
}

// Footer: source line + footer rule + confidential + page number
function footer(s, source, pageNum) {
  if (source) {
    s.addText("Source: " + source, {
      x: M, y: SOURCE_Y, w: 8.8078, h: 0.22,
      fontSize: 9, italic: true, color: C.muted, fontFace: FONT, margin: 0,
    });
  }
  s.addShape(p.shapes.RECTANGLE, {
    x: M, y: FRULE_Y, w: CW, h: 0.012,
    fill: { color: C.ruleSubtle }, line: { type: "none" },
  });
  s.addText("Thermal Cafe  |  Confidential", {
    x: M, y: FOOT_Y, w: 5.0, h: 0.20,
    fontSize: 8, color: C.muted, fontFace: FONT, margin: 0,
  });
  s.addText(pageNum + " / 14", {
    x: 11.283, y: FOOT_Y, w: 1.5, h: 0.20,
    fontSize: 8, color: C.muted, fontFace: FONT, align: "right", margin: 0,
  });
}

// Dark raised card
function card(s, x, y, w, h, color) {
  s.addShape(p.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: color || C.bgCard }, line: { type: "none" },
    shadow: mkShadow(),
  });
}

// Bullet text array helper (em-dash bullet, spcAft, lnSpc measured from XML)
function bullets(items, color, fontSize, spcAft, lnSpc) {
  return items.map((text) => ({
    text,
    options: {
      bullet: { code: "2013", indent: 152 }, // marL=0.1667" → 152pt; indent=-0.1667" → hangindent
      color: color, fontSize: fontSize, fontFace: FONT,
      paraSpaceAfter: spcAft,
    },
  }));
}

// ─────────────────────────────────────────────────────────────
// SLIDE 1 — COVER
// ─────────────────────────────────────────────────────────────
{
  const s = p.addSlide();
  s.background = { color: C.bg };

  // Hero photo: x=4.9477 y=1.6674 w=7.7331 h=4.8152
  s.addImage({
    path: R("uploaded_img/photo_hotsprings.png"),
    x: 4.9477, y: 1.6674, w: 7.7331, h: 4.8152,
    sizing: { type: "cover", w: 7.7331, h: 4.8152 },
  });

  // Dark overlay rects (fade photo into bg on left edge)
  // Rect 1: x=5.5899 y=0 w=1.8 h=7.5 (solid bg color)
  s.addShape(p.shapes.RECTANGLE, {
    x: 5.5899, y: 0, w: 1.8, h: 7.5,
    fill: { color: C.bg }, line: { type: "none" },
  });
  // Rect 2: x=7.3899 y=0 w=0.6 h=7.5 (40% transparent)
  s.addShape(p.shapes.RECTANGLE, {
    x: 7.3899, y: 0, w: 0.6, h: 7.5,
    fill: { color: C.bg, transparency: 40 }, line: { type: "none" },
  });

  // Gold horizontal bar: x=0.55 y=0.38 w=1.2 h=0.028
  s.addShape(p.shapes.RECTANGLE, {
    x: 0.55, y: 0.38, w: 1.2, h: 0.028,
    fill: { color: C.gold }, line: { type: "none" },
  });

  // Eyebrow: x=0.55 y=0.55 w=5.3332 h=0.26  sz=11  color=muted  charSpc=2
  s.addText("INVESTOR PRESENTATION  ·  CHARLOTTE, NC  ·  Q2 2026", {
    x: 0.55, y: 0.55, w: 5.3332, h: 0.26,
    fontSize: 11, color: C.muted, fontFace: FONT, charSpacing: 2, margin: 0,
  });

  // "Thermal": x=0.55 y=1.35 w=5.4665 h=1.1  sz=76  bold  color=white
  s.addText("Thermal", {
    x: 0.55, y: 1.35, w: 5.4665, h: 1.1,
    fontSize: 76, bold: true, color: C.white, fontFace: FONT, margin: 0,
  });

  // "Cafe": x=0.55 y=2.32 w=5.4665 h=1.1  sz=76  bold  color=gold
  s.addText("Cafe", {
    x: 0.55, y: 2.32, w: 5.4665, h: 1.1,
    fontSize: 76, bold: true, color: C.gold, fontFace: FONT, margin: 0,
  });

  // Tagline: x=0.55 y=3.65 w=5.3332 h=0.85  sz=19  color=body  lnSpc~1.35
  s.addText("Where coffee meets heat,\nmovement & recovery.", {
    x: 0.55, y: 3.65, w: 5.3332, h: 0.85,
    fontSize: 19, color: C.body, fontFace: FONT, lineSpacingMultiple: 1.35, margin: 0,
  });

  // Divider rule: x=0.55 y=4.8 w=2.0 h=0.02  color=ruleBright
  s.addShape(p.shapes.RECTANGLE, {
    x: 0.55, y: 4.8, w: 2.0, h: 0.02,
    fill: { color: C.ruleBright }, line: { type: "none" },
  });

  // Ask: x=0.55 y=4.95 w=5.3332 h=0.32  sz=15  bold  color=white
  s.addText("Seeking $8M Seed Round  ·  $24M Pre-Money", {
    x: 0.55, y: 4.95, w: 5.3332, h: 0.32,
    fontSize: 15, bold: true, color: C.white, fontFace: FONT, margin: 0,
  });

  // Confidential: x=0.55 y=7.12 w=5.3332 h=0.24  sz=11  italic  color=muted
  s.addText("Confidential — Do not distribute", {
    x: 0.55, y: 7.12, w: 5.3332, h: 0.24,
    fontSize: 11, italic: true, color: C.muted, fontFace: FONT, margin: 0,
  });
}

// ─────────────────────────────────────────────────────────────
// SLIDE 2 — EXECUTIVE SUMMARY
// ─────────────────────────────────────────────────────────────
{
  const s = p.addSlide();
  s.background = { color: C.bg };

  titleBlock(s,
    "EXECUTIVE SUMMARY",
    "Charlotte's $850M wellness market lacks an integrated operator – Thermal Cafe captures it with a 9-service flagship and a $4.5-6.5M unit-economics moat",
    12.113
  );

  // Four cards: measured positions from XML
  // Card bg x, card content x, card w = 2.8483, gutter = 0.1800
  // Card positions: 0.55, 3.6783, 6.8065, 9.9347
  const cols = [
    {
      cardX: 0.55,   contentX: 0.77,   label: "OPPORTUNITY", headline: "$850M SAM\nin Charlotte",
      bList: ["2.8M metro, $98K HHI","Zero integrated operators","Top-10 migration market","Median age 34 — peak demo","4-min LYNX to Uptown"],
    },
    {
      cardX: 3.6783, contentX: 3.8983, label: "CONCEPT",     headline: "Three pillars\nin 12,500 SF",
      bList: ["Heat: springs, infrared, sauna","Movement: studios + cardio","Recovery: cold plunge + stretch","Cafe: no-membership access","Bundled access = churn moat"],
    },
    {
      cardX: 6.8065, contentX: 7.0265, label: "ECONOMICS",   headline: "30.8% EBITDA\nat Year 2",
      bList: ["Y1: $4.5M rev, 14.4% EBITDA","Y2: $7.5M rev, 30.8% EBITDA","Y3: $8.7M rev, 35.3% EBITDA","30–36 mo payback on capex","Labor 32–33% of revenue"],
    },
    {
      cardX: 9.9347, contentX: 10.1547, label: "THE ASK",    headline: "$8M seed funds\nflagship + expansion",
      bList: ["$8M seed, $24M pre-money","Flagship opens Q3 2027","$41M revenue by Year 5","Lead + 2 strategic investors","24–30 month payback"],
    },
  ];

  const CARD_Y = 1.98, CARD_W = 2.8483, CARD_H = 4.82, CONTENT_W = 2.6283;
  const BULLET_W = 2.4083;

  cols.forEach((c) => {
    // Card background: color=16293F h=4.82
    card(s, c.cardX, CARD_Y, CARD_W, CARD_H, C.bgCard);

    // Gold top bar: h=0.038
    s.addShape(p.shapes.RECTANGLE, {
      x: c.cardX, y: CARD_Y, w: CARD_W, h: 0.038,
      fill: { color: C.gold }, line: { type: "none" },
    });

    // Label: y=2.10 h=0.24 sz=8 bold charSpc=2.5 color=gold
    s.addText(c.label, {
      x: c.contentX, y: 2.10, w: CONTENT_W, h: 0.24,
      fontSize: 8, bold: true, color: C.gold, fontFace: FONT, charSpacing: 2.5, margin: 0,
    });

    // Headline: y=2.40 h=0.90 sz=21 bold lnSpc=118%
    s.addText(c.headline, {
      x: c.contentX, y: 2.40, w: CONTENT_W, h: 0.90,
      fontSize: 21, bold: true, color: C.white, fontFace: FONT,
      valign: "top", lineSpacingMultiple: 1.18, margin: 0,
    });

    // Inner rule: y=3.40 h=0.014 color=ruleBright
    s.addShape(p.shapes.RECTANGLE, {
      x: c.contentX, y: 3.40, w: BULLET_W, h: 0.014,
      fill: { color: C.ruleBright }, line: { type: "none" },
    });

    // Bullets: y=3.56 h=3.14 sz=12 bullet='–' spcAft=5 lnSpc=130%
    s.addText(bullets(c.bList, C.body, 12, 5, 1.30), {
      x: c.contentX, y: 3.56, w: BULLET_W, h: 3.14,
      valign: "top", lineSpacingMultiple: 1.30,
    });
  });

  footer(s, null, "2");
}

// ─────────────────────────────────────────────────────────────
// SLIDE 3 — MARKET OPPORTUNITY
// ─────────────────────────────────────────────────────────────
{
  const s = p.addSlide();
  s.background = { color: C.bg };

  titleBlock(s,
    "MARKET OPPORTUNITY  ·  CHARLOTTE & SOUTH END",
    "South End combines $98K median HHI, rail-adjacent transit, and zero integrated wellness operators – a clear first-mover window in the Sunbelt",
    12.113
  );

  // KPI rows — each row: rule y, big y, big h=0.5, label y, label h=0.38
  // big x=0.55 w=1.65 sz=30 bold color=gold
  // label x=2.3 w=3.55 sz=15 color=? (body per design)
  // rule w=5.3 h=0.014 color=ruleBright
  const kpis = [
    { ruleY: 1.94, bigY: 2.010, lY: 2.054, big: "2.8M",   lbl: "Charlotte metro population" },
    { ruleY: 2.57, bigY: 2.640, lY: 2.684, big: "925K",   lbl: "City of Charlotte" },
    { ruleY: 3.20, bigY: 3.270, lY: 3.314, big: "$98K",   lbl: "South End median household income" },
    { ruleY: 3.83, bigY: 3.900, lY: 3.944, big: "34",     lbl: "Median resident age" },
    { ruleY: 4.46, bigY: 4.530, lY: 4.574, big: "Top 10", lbl: "U.S. inbound migration market" },
    { ruleY: 5.09, bigY: 5.160, lY: 5.204, big: "4 min",  lbl: "LYNX rail to Uptown" },
    { ruleY: 5.72, bigY: 5.790, lY: 5.834, big: "0",      lbl: "Integrated wellness operators in metro" },
  ];

  kpis.forEach((k) => {
    s.addShape(p.shapes.RECTANGLE, {
      x: 0.55, y: k.ruleY, w: 5.3, h: 0.014,
      fill: { color: C.ruleBright }, line: { type: "none" },
    });
    s.addText(k.big, {
      x: 0.55, y: k.bigY, w: 1.65, h: 0.50,
      fontSize: 30, bold: true, color: C.gold, fontFace: FONT, margin: 0,
    });
    s.addText(k.lbl, {
      x: 2.30, y: k.lY, w: 3.55, h: 0.38,
      fontSize: 15, color: C.body, fontFace: FONT, valign: "middle", margin: 0,
    });
  });

  // Map image: x=6.2 y=1.94 w=6.583 h=4.42
  s.addImage({
    path: R("uploaded_img/south_end_map.png"),
    x: 6.2, y: 1.94, w: 6.583, h: 4.42,
    shadow: mkShadow(),
  });

  // Map caption: x=6.2 y=6.44 w=6.583 h=0.22 sz=13 italic color=muted
  s.addText("South End, Charlotte NC — target flagship corridor", {
    x: 6.2, y: 6.44, w: 6.583, h: 0.22,
    fontSize: 13, italic: true, color: C.muted, fontFace: FONT, margin: 0,
  });

  footer(s, "U.S. Census Bureau (2024); Charlotte Regional Business Alliance; Charlotte Area Transit System", "3");
}

// ─────────────────────────────────────────────────────────────
// SLIDE 4 — COMPETITIVE LANDSCAPE
// Note: chart on left (x=0.55 y=2.0 w=7.5 h=4.63), callout cards on right
// ─────────────────────────────────────────────────────────────
{
  const s = p.addSlide();
  s.background = { color: C.bg };

  titleBlock(s,
    "COMPETITIVE LANDSCAPE",
    "Thermal Cafe delivers nine integrated wellness services in one destination -– more than any operator currently in Charlotte",
    12.113
  );

  // Bar chart: x=0.55 y=2.0 w=7.5 h=4.63
  const labels    = ["Thermal Cafe","Life Time","Equinox","YMCA","Orangetheory","Planet Fitness","HOTWORX","Club Pilates"];
  const usVals    = [9,  null, null, null, null, null, null, null];
  const themVals  = [null, 7,    6,    5,    2,    2,    1,    1];

  s.addChart(p.charts.BAR, [
    { name: "Thermal Cafe", labels, values: usVals  },
    { name: "Competitors",  labels, values: themVals },
  ], {
    x: 0.55, y: 2.0, w: 7.5, h: 4.63,
    barDir: "bar", barGrouping: "stacked", barGapWidthPct: 65,
    chartColors: [C.gold, "2D4F6B"],
    chartColorsOpacity: 100,
    chartArea: { fill: { color: C.bg } },
    plotArea: { fill: { color: C.bg } },
    showValue: true,
    dataLabelColor: C.white, dataLabelFontSize: 11, dataLabelFontBold: true, dataLabelFontFace: FONT,
    catAxisLabelColor: C.body, catAxisLabelFontSize: 11.5, catAxisLabelFontFace: FONT,
    valAxisHidden: true,
    valGridLine: { style: "none" }, catGridLine: { style: "none" },
    catAxisLineShow: false, valAxisLineShow: false,
    showLegend: false,
  });

  // Right callout cards: x=8.4 w=4.383 h=1.12, gutter=0.08
  // 4 cards at y: 1.98, 3.18, 4.38, 5.58
  // Content x=8.6 w=4.143
  const callouts = [
    { y: 1.98,  h: "Multi-service moat",            b: "Bundling raises switching cost; members using 3+ services churn at <2% monthly vs 8–12% industry." },
    { y: 3.18,  h: "No direct competitor",          b: "No Charlotte operator combines hot springs, infrared, strength, cardio, recovery, and cafe under one roof." },
    { y: 4.38,  h: "First-mover bathhouse",         b: "WorldSprings-style mineral soaking has no rival in the Carolinas — 12-month head-start to brand entrenchment." },
    { y: 5.58,  h: "Premium without elite pricing", b: "Equinox-tier amenities at Life Time pricing ($149/mo) capture the underserved upper-middle Sunbelt segment." },
  ];

  callouts.forEach((c) => {
    // Card: x=8.4 w=4.383
    card(s, 8.4, c.y, 4.383, 1.12, C.bgCard);
    // Gold pip: x=8.4 w=0.038 h=1.12
    s.addShape(p.shapes.RECTANGLE, {
      x: 8.4, y: c.y, w: 0.038, h: 1.12,
      fill: { color: C.gold }, line: { type: "none" },
    });
    // Heading: x=8.6 y=c.y+0.10 w=4.143 h=0.30 sz=15 bold color=white
    s.addText(c.h, {
      x: 8.6, y: c.y + 0.10, w: 4.143, h: 0.30,
      fontSize: 15, bold: true, color: C.white, fontFace: FONT, margin: 0,
    });
    // Body: y=c.y+0.3646 sz=12 color=body lnSpc=1.3
    s.addText(c.b, {
      x: 8.6, y: c.y + 0.3446, w: 4.143, h: 0.66,
      fontSize: 12, color: C.body, fontFace: FONT, valign: "top", lineSpacingMultiple: 1.3, margin: 0,
    });
  });

  footer(s, "Operator websites; IBISWorld Health & Fitness Clubs in the U.S. (2024)", "4");
}

// ─────────────────────────────────────────────────────────────
// SLIDE 5 — THREE INTEGRATED PILLARS
// Three distinct accent colors: gold / teal / salmon
// ─────────────────────────────────────────────────────────────
{
  const s = p.addSlide();
  s.background = { color: C.bg };

  titleBlock(s,
    "THE CONCEPT  ·  THREE INTEGRATED PILLARS",
    "Three reinforcing pillars -– heat, movement, recovery -– combine in one membership to build a churn-proof wellness destination",
    12.113
  );

  const pillars = [
    {
      cardX: 0.55,   badgeX: 0.7375, badgeSquareX: 0.7841, labelX: 1.4505, titleX: 1.425,
      subX: 0.77, statX: 0.77, numStr: "1", label: "PILLAR 1", title: "HEAT",
      sub: "Hot springs · Infrared · Sauna", stat: "$3.6M",
      accent: C.gold,
      bList: ["Mineral hot springs (1,800 members)","15 daily infrared classes (900 members)","Finnish sauna with cedar interior","Red light therapy (660nm + 850nm)","Indoor and outdoor soaking pools"],
    },
    {
      cardX: 4.7343, badgeX: 4.9543, badgeSquareX: 4.991, labelX: 5.6434, titleX: 5.6093,
      subX: 4.9543, statX: 4.9543, numStr: "2", label: "PILLAR 2", title: "MOVEMENT",
      sub: "Studios · Cardio · Strength", stat: "$1.5M",
      accent: C.teal,
      bList: ["Yoga + Pilates studios (850 members)","Peloton Tread+ and Bike+ cardio","3,000+ SF strength floor with REP racks","Glute-builder focus and Smith machines","Open-gym + small-group PT pods"],
    },
    {
      cardX: 8.9187, badgeX: 9.1078, badgeSquareX: 9.1531, labelX: 9.8037, titleX: 9.7987,
      subX: 9.1387, statX: 9.1387, numStr: "3", label: "PILLAR 3", title: "RECOVERY & CAFE",
      sub: "Cold · Stretch · Nutrition", stat: "$1.9M",
      accent: C.salmon,
      bList: ["Cold plunge (38–45°F) for recovery","StretchLab-partnered assisted stretching","Pura Vida-inspired wellness cafe","Acai, matcha, adaptogens, supplements","Open 5am – 1am, no membership required"],
    },
  ];

  pillars.forEach((c) => {
    // Card: y=2.04 (card bg starts at 1.988 for p2,p3) h=4.78 w=3.8643
    card(s, c.cardX, 2.04, 3.8643, 4.78, C.bgCard);

    // Accent top bar: y=2.04 w=3.8643 h=0.038
    s.addShape(p.shapes.RECTANGLE, {
      x: c.cardX, y: 2.04, w: 3.8643, h: 0.038,
      fill: { color: c.accent }, line: { type: "none" },
    });

    // Badge circle: x=badgeX y=2.2 w=0.6 h=0.6 fill=accent
    s.addShape(p.shapes.RECTANGLE, {
      x: c.badgeX, y: 2.20, w: 0.6, h: 0.6,
      fill: { color: c.accent }, line: { type: "none" },
    });
    // Badge number: x=badgeSquareX y=2.277 w=0.5 h=0.5 sz=14 bold center color=bg
    s.addText(c.numStr, {
      x: c.badgeSquareX, y: 2.277, w: 0.5, h: 0.5,
      fontSize: 14, bold: true, color: C.bg, fontFace: FONT,
      align: "center", valign: "middle", margin: 0,
    });

    // Pillar label: y=2.1764 sz=11 bold charSpc=2.5 color=accent
    s.addText(c.label, {
      x: c.labelX, y: 2.1764, w: 2.8143, h: 0.22,
      fontSize: 11, bold: true, color: c.accent, fontFace: FONT, charSpacing: 2.5, margin: 0,
    });

    // Title: y=2.4233 sz=26 bold color=white
    s.addText(c.title, {
      x: c.titleX, y: 2.4233, w: 2.8143, h: 0.36,
      fontSize: 26, bold: true, color: C.white, fontFace: FONT, margin: 0,
    });

    // Sub: y=2.84 sz=13 italic color=muted
    s.addText(c.sub, {
      x: c.subX, y: 2.84, w: 3.4243, h: 0.27,
      fontSize: 13, italic: true, color: C.muted, fontFace: FONT, margin: 0,
    });

    // Inner rule: y=3.19 h=0.014
    s.addShape(p.shapes.RECTANGLE, {
      x: c.subX, y: 3.19, w: 3.4243, h: 0.014,
      fill: { color: C.ruleBright }, line: { type: "none" },
    });

    // Big stat: y=3.32 h=0.65 sz=46 bold color=accent
    s.addText(c.stat, {
      x: c.statX, y: 3.32, w: 3.4243, h: 0.65,
      fontSize: 46, bold: true, color: c.accent, fontFace: FONT, margin: 0,
    });

    // "annual revenue": y=3.98 sz=11 color=muted
    s.addText("annual revenue", {
      x: c.statX, y: 3.98, w: 3.4243, h: 0.26,
      fontSize: 11, color: C.muted, fontFace: FONT, margin: 0,
    });

    // Second inner rule: y=4.32
    s.addShape(p.shapes.RECTANGLE, {
      x: c.statX, y: 4.32, w: 3.4243, h: 0.014,
      fill: { color: C.ruleBright }, line: { type: "none" },
    });

    // Bullets: y=4.46 h=2.28 sz=12 spcAft=5 lnSpc=130% (color varies per pillar — body used)
    s.addText(bullets(c.bList, C.body, 12, 5, 1.30), {
      x: c.statX, y: 4.46, w: 3.4243, h: 2.28,
      valign: "top", lineSpacingMultiple: 1.30,
    });
  });

  footer(s, "Thermal Cafe management projections (Year 2 stabilized)", "5");
}

// ─────────────────────────────────────────────────────────────
// SLIDE 6 — FACILITY / FLOOR PLAN
// Table: x=0.6 y=2.18 w=4.9 h=4.08 | Image: x=5.65 y=1.96 w=7.133 h=4.52
// ─────────────────────────────────────────────────────────────
{
  const s = p.addSlide();
  s.background = { color: C.bg };

  titleBlock(s,
    "THE FACILITY  ·  12,500 SF FLOOR PLAN",
    "A 12,500 SF footprint organizes seven purpose-built zones into one integrated destination, anchored by the 3,800 SF thermal wet core",
    12.113
  );

  // Table: 9 rows × 3 cols
  // Col widths: [0.5, 3.05, 1.35] — from XML
  // Row heights: header=0.3461, data rows=0.46
  // Header fill: C9A84C (gold bg), text color: 112236 (dark on gold)
  // Data odd rows fill: 16293F, even: 1A3050
  // Body text color: B8C4D0 (but looks light — these are fill values from XML, text is white/body)
  const zones = [
    ["#", "Zone", "SF"],
    ["1", "Café + Lounge",    "2,000"],
    ["2", "Cardio Zone",      "2,000"],
    ["3", "Classrooms",       "1,300"],
    ["4", "Glute + Sculpt",   "1,200"],
    ["5", "Infrared Training","1,900"],
    ["6", "Thermal Wet Core", "3,800"],
    ["7", "Support / BOH",    "1,100"],
    ["",  "Total",            "12,500"],
  ];

  s.addTable(zones.map((row, ri) => row.map((cell, ci) => {
    const isHead  = ri === 0;
    const isTotal = ri === zones.length - 1;
    const isAlt   = ri % 2 === 0 && !isHead && !isTotal;

    // Fill colors from XML: header=gold, odd=16293F, even=1A3050, total=1A3050
    const fillColor = isHead ? C.gold : (isAlt ? C.bgCardAlt : C.bgCard);
    // Text: header uses dark bg color (on gold), body uses warm white
    const textColor = isHead ? C.bgMid : C.white;
    const bold = isHead || isTotal;
    const align = ci === 2 ? "right" : "left";

    return {
      text: cell,
      options: {
        fontSize: isHead ? 18 : 15,
        fontFace: FONT,
        bold,
        color: textColor,
        fill: { color: fillColor },
        align,
        valign: "middle",
        border: [
          { pt: isHead ? 1.0 : 0.5, color: isHead ? C.gold : (isTotal ? C.ruleBright : C.ruleBright), type: "solid" },
          { type: "none" }, { type: "none" }, { type: "none" },
        ],
      },
    };
  })), {
    x: 0.60, y: 2.18, w: 4.90,
    colW: [0.5, 3.05, 1.35],
    rowH: 0.46,
    autoPage: false,
  });

  // Floor plan image: x=5.65 y=1.96 w=7.133 h=4.52
  s.addImage({
    path: R("uploaded_img/floor_plan.png"),
    x: 5.65, y: 1.96, w: 7.133, h: 4.52,
    sizing: { type: "contain", w: 7.133, h: 4.52 },
    shadow: mkShadow(),
  });

  // Caption: x=5.65 y=6.55 sz=9 italic color=muted
  s.addText("Conceptual floor plan — not to scale", {
    x: 5.65, y: 6.55, w: 7.133, h: 0.22,
    fontSize: 9, italic: true, color: C.muted, fontFace: FONT, margin: 0,
  });

  footer(s, "Thermal Cafe development brief; conceptual layout subject to architect refinement", "6");
}

// ─────────────────────────────────────────────────────────────
// SLIDES 7 & 8 — PILLAR DEEP DIVES
// Layout: image left (x=0.55 y=2.0 w=5.8915 h=2.48)
//         image right (x=6.8915 y=2.0 w=5.8915 h=2.48)
//         card panel below each image (y=4.52 h=2.30)
// ─────────────────────────────────────────────────────────────
function pillarDeepDive(eyebrow, headline, headlineW, items, sourceText, pageNum) {
  const s = p.addSlide();
  s.background = { color: C.bg };
  titleBlock(s, eyebrow, headline, headlineW);

  const IMG_Y    = 2.00;
  const IMG_H    = 2.48;
  const IMG_W    = 5.8915;
  const PANEL_Y  = 4.52;
  const PANEL_H  = 2.30;
  const PANEL_W  = IMG_W;

  // Column x positions
  const cols_x   = [0.55, 6.8915];
  // Content inside panel (left padding 0.22)
  const content_x_offsets = [0.77, 7.1115];

  items.forEach((it, i) => {
    const imgX     = cols_x[i];
    const contentX = content_x_offsets[i];

    // Photo
    s.addImage({
      path: R(it.photo),
      x: imgX, y: IMG_Y, w: IMG_W, h: IMG_H,
      sizing: { type: "cover", w: IMG_W, h: IMG_H },
      shadow: mkShadow(),
    });

    // Stats panel (dark card below photo)
    card(s, imgX, PANEL_Y, PANEL_W, PANEL_H, C.bgCard);

    // Label: y=4.66 h=0.24 sz=10 bold charSpc=2.5 color=gold
    s.addText(it.label, {
      x: contentX, y: 4.66, w: 5.4515, h: 0.24,
      fontSize: it.labelSz || 10, bold: true, color: C.gold, fontFace: FONT, charSpacing: 2.5, margin: 0,
    });

    // Headline text: y=4.94 h=0.50 sz=15 bold color=white
    s.addText(it.headline, {
      x: contentX, y: 4.94, w: it.headW || 5.6715, h: 0.50,
      fontSize: 15, bold: true, color: C.white, fontFace: FONT,
      valign: "top", lineSpacingMultiple: 1.15, margin: 0,
    });

    // Three stats: big at y=5.56 h=0.50 sz=32, label at y=6.08 h=0.26 sz=14/10
    const statW = 1.8172;
    it.stats.forEach(([big, lbl], si) => {
      const sx = contentX + si * statW;
      s.addText(big, {
        x: sx, y: 5.56, w: statW, h: 0.50,
        fontSize: 32, bold: true, color: C.gold, fontFace: FONT, margin: 0,
      });
      s.addText(lbl, {
        x: sx, y: 6.08, w: statW, h: 0.26,
        fontSize: it.lblSz || 14, color: C.muted, fontFace: FONT, margin: 0,
      });
    });
  });

  footer(s, sourceText, pageNum);
}

pillarDeepDive(
  "PILLAR 1  ·  HEAT",
  "Hot springs anchor as the first-mover bathhouse in the Carolinas; infrared adds proven HOTWORX-style economics at 85%+ cabin margins",
  12.113,
  [
    {
      photo: R("uploaded_img/photo_hotsprings.png"),
      label: "HOT SPRINGS & MINERAL SOAKS",
      labelSz: 10,
      headline: "Bathhouse NYC ritual meets WorldSprings thermal mineral soaks",
      headW: 5.6715,
      stats: [["$2.7M","annual revenue"],["1,800","members"],["$125","/ month"]],
      lblSz: 14,
    },
    {
      photo: R("uploaded_img/photo_infrared.png"),
      label: "INFRARED TRAINING",
      labelSz: 10,
      headline: "RedFit iGym cabins with 15 on-demand classes",
      headW: 5.6715,
      stats: [["$852K","annual revenue"],["900","members"],["85%+","cabin margins"]],
      lblSz: 14,
    },
  ],
  "Comparable revenue per WorldSprings (Tempe, AZ) and HOTWORX franchise disclosure documents (2024)",
  "7"
);

pillarDeepDive(
  "PILLAR 2  ·  MOVEMENT",
  "Two dedicated studios plus a 3,000 SF strength floor drive 3–4× weekly visit frequency at zero per-session upcharge",
  12.113,
  [
    {
      photo: R("uploaded_img/photo_yoga.png"),
      label: "YOGA, PILATES & REFORMER",
      labelSz: 11,
      headline: "Two dedicated studios with signature hot/cold programming",
      headW: 5.4515,
      stats: [["$1.52M","annual revenue"],["850","members"],["$149","/ month"]],
      lblSz: 10,  // NOTE: slide 8 uses sz=10 for stat labels (differs from slide 7)
    },
    {
      photo: R("uploaded_img/photo_strength.png"),
      label: "STRENGTH & CONDITIONING",
      labelSz: 11,
      headline: "3,000+ SF strength floor bundled at zero upcharge",
      headW: 5.4515,
      stats: [["3,000+","SF dedicated"],["$0","per-session fee"],["3–4×","visits / week"]],
      lblSz: 10,
    },
  ],
  "Comparable studio economics from Xponential Fitness 10-K (2024); Equinox unit data",
  "8"
);

// ─────────────────────────────────────────────────────────────
// SLIDE 9 — CAFE & RECOVERY
// Left: photo x=0.55 y=1.98 w=5.55 h=4.50
// Right: dark card x=6.43 y=1.983 w=6.353 h=4.452
// ─────────────────────────────────────────────────────────────
{
  const s = p.addSlide();
  s.background = { color: C.bg };

  titleBlock(s,
    "PILLAR 3  ·  CAFE & RECOVERY",
    "The cafe is the top-of-funnel -– open 5am to 1am, generating $1.47M and 800 daily transactions",
    12.5462
  );

  // Photo: x=0.55 y=1.98 w=5.55 h=4.50
  s.addImage({
    path: R("uploaded_img/photo_cafe.png"),
    x: 0.55, y: 1.98, w: 5.55, h: 4.50,
    sizing: { type: "cover", w: 5.55, h: 4.50 },
    shadow: mkShadow(),
  });

  // Photo caption: x=0.55 y=6.56 w=5.55 h=0.22 sz=11 italic color=muted
  s.addText("Pura Vida-inspired wellness cafe — open to public, no membership required", {
    x: 0.55, y: 6.56, w: 5.55, h: 0.22,
    fontSize: 11, italic: true, color: C.muted, fontFace: FONT, margin: 0,
  });

  // Right panel card: x=6.43 y=1.983 w=6.353 h=4.452
  card(s, 6.43, 1.983, 6.353, 4.452, C.bgCard);

  // "THE TOP-OF-FUNNEL THESIS": x=6.65 y=2.16 w=5.913 sz=19 bold charSpc=2.5 color=gold
  s.addText("THE TOP-OF-FUNNEL THESIS", {
    x: 6.65, y: 2.16, w: 5.913, h: 0.26,
    fontSize: 19, bold: true, color: C.gold, fontFace: FONT, charSpacing: 2.5, margin: 0,
  });

  // Thesis bullets: x=6.65 y=2.5 w=5.913 h=2.55 sz=14 bullet='–' spcAft=8 lnSpc=132%
  const thesis = [
    "Front door is open to the public — no membership barrier",
    "Pura Vida-inspired: natural materials, living walls, premium espresso",
    "Every $6 matcha purchase becomes a warm membership lead",
    "800 transactions / day at ~25% F&B margin, open 5am to 1am",
  ];
  s.addText(bullets(thesis, C.body, 14, 8, 1.32), {
    x: 6.65, y: 2.50, w: 5.913, h: 2.55,
    valign: "top", lineSpacingMultiple: 1.32,
  });

  // Inner rule: x=6.6665 y=4.5625 w=5.913 h=0.014
  s.addShape(p.shapes.RECTANGLE, {
    x: 6.6665, y: 4.5625, w: 5.913, h: 0.014,
    fill: { color: C.ruleBright }, line: { type: "none" },
  });

  // "REVENUE CONTRIBUTION": x=6.6665 y=4.8865 sz=16 bold charSpc=2.5 color=gold
  s.addText("REVENUE CONTRIBUTION", {
    x: 6.6665, y: 4.8865, w: 5.913, h: 0.26,
    fontSize: 16, bold: true, color: C.gold, fontFace: FONT, charSpacing: 2.5, margin: 0,
  });

  // Revenue stats: y=5.2265 sz=32 bold color=white, label y=5.8265 sz=12 color=muted
  const revStats = [
    { x: 6.6665, big: "$1.47M", lbl: "Cafe & food" },
    { x: 8.6375, big: "$420K",  lbl: "Supplements + retail" },
    { x: 10.6085,big: "~25%",   lbl: "F&B margin" },
  ];
  const STAT_W = 1.971;
  revStats.forEach((r) => {
    s.addText(r.big, {
      x: r.x, y: 5.2265, w: STAT_W, h: 0.58,
      fontSize: 32, bold: true, color: C.white, fontFace: FONT, margin: 0,
    });
    s.addText(r.lbl, {
      x: r.x, y: 5.8265, w: STAT_W, h: 0.28,
      fontSize: 12, color: C.muted, fontFace: FONT, margin: 0,
    });
  });

  footer(s, "Thermal Cafe management projections; Erewhon and Pura Vida comparable data", "9");
}

// ─────────────────────────────────────────────────────────────
// SLIDE 10 — UNIT ECONOMICS
// Table: x=0.55 y=2.04 w=6.6 h=4.346
// Chart: x=7.5988 y=1.9145 w=5.1842 h=2.903
// Callouts below chart
// ─────────────────────────────────────────────────────────────
{
  const s = p.addSlide();
  s.background = { color: C.bg };

  titleBlock(s,
    "UNIT ECONOMICS  ·  PER LOCATION",
    "Year 2 stabilizes at 30.8% EBITDA margin and a 30-36-month payback on a $4.5-6.5M buildout",
    12.113
  );

  // P&L Table: 9 rows, colW=[2.0, 1.5, 1.55, 1.55]
  // Header row fill: header col 0 = 2D4F6B, others = 112236
  // EBITDA rows fill: C9A84C (gold bg for both EBITDA rows)
  // Data odd: 16293F, even: 1A3050
  const pl = [
    ["",             "Year 1",    "Year 2",    "Year 3"],
    ["Revenue",      "$4.54M",    "$7.54M",    "$8.72M"],
    ["COGS",         "($880K)",   "($1.44M)",  "($1.56M)"],
    ["Labor",        "($1.72M)",  "($2.40M)",  "($2.64M)"],
    ["Rent",         "($448K)",   "($455K)",   "($462K)"],
    ["Marketing",    "($372K)",   "($386K)",   "($402K)"],
    ["Other",        "($465K)",   "($540K)",   "($580K)"],
    ["EBITDA",       "$655K",     "$2.32M",    "$3.08M"],
    ["EBITDA margin","14.4%",     "30.8%",     "35.3%"],
  ];

  s.addTable(pl.map((row, ri) => row.map((cell, ci) => {
    const isHead   = ri === 0;
    const isEbitda = ri >= pl.length - 2;
    const isAlt    = ri % 2 === 0 && !isHead && !isEbitda;

    // Fill: header=2D4F6B(col0)/112236(rest), ebitda=C9A84C, odd=16293F, even=1A3050
    let fillColor;
    if (isHead)   fillColor = (ci === 0 ? "2D4F6B" : C.bgMid);
    else if (isEbitda) fillColor = C.gold;
    else fillColor = isAlt ? C.bgCardAlt : C.bgCard;

    // Text color: header=muted, ebitda=bgMid(dark on gold), body=body/white
    let textColor;
    if (isHead)        textColor = C.muted;
    else if (isEbitda) textColor = C.bgMid;
    else               textColor = C.body;

    return {
      text: cell,
      options: {
        fontSize: 15, fontFace: FONT,
        bold: isHead || isEbitda,
        color: textColor,
        fill: { color: fillColor },
        align: ci === 0 ? "left" : "right",
        valign: "middle",
        border: [
          { pt: isHead || ri === pl.length - 2 ? 1.0 : 0.5,
            color: isHead || isEbitda ? C.gold : C.ruleBright, type: "solid" },
          { type: "none" }, { type: "none" }, { type: "none" },
        ],
      },
    };
  })), {
    x: 0.55, y: 2.04, w: 6.60,
    colW: [2.0, 1.5, 1.55, 1.55],
    rowH: 0.4909,
    autoPage: false,
  });

  // Revenue/EBITDA chart: x=7.5988 y=1.9145 w=5.1842 h=2.903
  s.addChart(p.charts.BAR, [
    { name: "Revenue", labels: ["Y1","Y2","Y3"], values: [4540, 7540, 8720] },
    { name: "EBITDA",  labels: ["Y1","Y2","Y3"], values: [655,  2320, 3080] },
  ], {
    x: 7.5988, y: 1.9145, w: 5.1842, h: 2.903,
    barDir: "col", barGapWidthPct: 55,
    chartColors: ["2A7A6E", C.gold],  // teal dark for Revenue, gold for EBITDA
    chartArea: { fill: { color: C.bg } },
    plotArea: { fill: { color: C.bg } },
    showValue: true,
    dataLabelColor: C.body, dataLabelFontSize: 9, dataLabelFontFace: FONT,
    catAxisLabelColor: C.body, catAxisLabelFontSize: 11, catAxisLabelFontFace: FONT,
    valAxisHidden: true,
    valGridLine: { style: "none" }, catGridLine: { style: "none" },
    catAxisLineShow: false, valAxisLineShow: false,
    showLegend: true, legendPos: "b", legendFontSize: 10, legendColor: C.muted, legendFontFace: FONT,
  });

  // Key callouts below chart:
  // pip: x=8.6909 y=y+0.06 w=0.028 h=0.30
  // label: x=8.8409 y w=1.35 h=0.32 sz=14 bold charSpc=1 color=gold
  // value: x=10.2409 y w=3.783 h=0.32 sz=14 color=white
  const calls = [
    { y: 4.9188, h: "RAMP",     b: "Year 1 at 60% occupancy" },
    { y: 5.4188, h: "CAPITAL",  b: "$4.5–6.5M buildout" },
    { y: 5.9188, h: "LEVERAGE", b: "Labor at 32–33% of revenue" },
  ];
  calls.forEach((c) => {
    s.addShape(p.shapes.RECTANGLE, {
      x: 8.6909, y: c.y + 0.06, w: 0.028, h: 0.30,
      fill: { color: C.gold }, line: { type: "none" },
    });
    s.addText(c.h, {
      x: 8.8409, y: c.y, w: 1.35, h: 0.32,
      fontSize: 14, bold: true, color: C.gold, fontFace: FONT, charSpacing: 1, margin: 0,
    });
    s.addText(c.b, {
      x: 10.2409, y: c.y, w: 3.783, h: 0.32,
      fontSize: 14, color: C.white, fontFace: FONT, margin: 0,
    });
  });

  footer(s, "Thermal Cafe financial model (2025); cost benchmarks from comparable facilities", "10");
}

// ─────────────────────────────────────────────────────────────
// SLIDE 11 — MARKET SIZING  TAM/SAM/SOM
// Three stepped bands: TAM full width, SAM 70%, SOM 42%
// ─────────────────────────────────────────────────────────────
{
  const s = p.addSlide();
  s.background = { color: C.bg };

  titleBlock(s,
    "MARKET SIZING  ·  TAM / SAM / SOM",
    "A $40B U.S. wellness market funnels to a conservative $95M five-year capture – just 11% of Charlotte's addressable SAM",
    12.113
  );

  // TAM: x=0.55 y=2.08 w=12.233 h=1.22  fill=16293F
  s.addShape(p.shapes.RECTANGLE, {
    x: 0.55, y: 2.08, w: 12.233, h: 1.22,
    fill: { color: C.bgMid }, line: { type: "none" }, shadow: mkShadow(),
  });
  // TAM left pip: x=0.55 y=2.08 w=0.05 h=1.22  fill=gold
  s.addShape(p.shapes.RECTANGLE, {
    x: 0.55, y: 2.08, w: 0.05, h: 1.22,
    fill: { color: C.gold }, line: { type: "none" },
  });
  // TAM label: x=0.8 y=2.18 sz=9 bold charSpc=3 color=gold
  s.addText("TAM", {
    x: 0.80, y: 2.18, w: 1.8, h: 0.24,
    fontSize: 9, bold: true, color: C.gold, fontFace: FONT, charSpacing: 3, margin: 0,
  });
  // TAM value: x=0.8 y=2.42 sz=40 bold color=white
  s.addText("$40B", {
    x: 0.80, y: 2.42, w: 2.6, h: 0.72,
    fontSize: 40, bold: true, color: C.white, fontFace: FONT, margin: 0,
  });
  // TAM sub: x=2.8 y=2.2062 sz=16 bold color=white
  s.addText("U.S. health & wellness market", {
    x: 2.80, y: 2.2062, w: 8.783, h: 0.32,
    fontSize: 16, bold: true, color: C.white, fontFace: FONT, margin: 0,
  });
  // TAM note: x=2.8 y=2.5662 sz=12 color=body
  s.addText("7% CAGR; growing faster than consumer discretionary spending", {
    x: 2.80, y: 2.5662, w: 8.783, h: 0.62,
    fontSize: 12, color: C.body, fontFace: FONT, valign: "top", lineSpacingMultiple: 1.25, margin: 0,
  });

  // SAM: x=2.3849 y=3.48 w=8.5631 h=1.22  fill=1A3050
  s.addShape(p.shapes.RECTANGLE, {
    x: 2.3849, y: 3.48, w: 8.5631, h: 1.22,
    fill: { color: C.bgCardAlt }, line: { type: "none" }, shadow: mkShadow(),
  });
  s.addShape(p.shapes.RECTANGLE, {
    x: 2.3849, y: 3.48, w: 0.05, h: 1.22,
    fill: { color: C.gold }, line: { type: "none" },
  });
  s.addText("SAM", {
    x: 2.6349, y: 3.58, w: 1.8, h: 0.24,
    fontSize: 9, bold: true, color: C.gold, fontFace: FONT, charSpacing: 3, margin: 0,
  });
  s.addText("$850M", {
    x: 2.6349, y: 3.82, w: 2.6, h: 0.72,
    fontSize: 40, bold: true, color: C.white, fontFace: FONT, margin: 0,
  });
  s.addText("Charlotte metro addressable", {
    x: 4.757, y: 3.66, w: 5.1131, h: 0.32,
    fontSize: 16, bold: true, color: C.white, fontFace: FONT, margin: 0,
  });
  s.addText("2.8M metro population × $300 annual wellness spend per capita", {
    x: 4.757, y: 4.02, w: 5.1131, h: 0.62,
    fontSize: 12, color: C.body, fontFace: FONT, valign: "top", lineSpacingMultiple: 1.25, margin: 0,
  });

  // SOM: x=4.0976 y=4.88 w=5.4741 h=1.22  fill=gold (NOTE: gold background!)
  s.addShape(p.shapes.RECTANGLE, {
    x: 4.0976, y: 4.88, w: 5.4741, h: 1.22,
    fill: { color: C.gold }, line: { type: "none" }, shadow: mkShadow(),
  });
  // SOM left pip: fill=bg (dark on gold)
  s.addShape(p.shapes.RECTANGLE, {
    x: 4.0976, y: 4.88, w: 0.05, h: 1.22,
    fill: { color: C.bg }, line: { type: "none" },
  });
  // SOM label: color=112236 (dark navy on gold)
  s.addText("SOM", {
    x: 4.3476, y: 4.98, w: 1.8, h: 0.24,
    fontSize: 9, bold: true, color: C.bgMid, fontFace: FONT, charSpacing: 3, margin: 0,
  });
  // SOM value: color=bg (navy text on gold)
  s.addText("$95M", {
    x: 4.3476, y: 5.22, w: 2.6, h: 0.72,
    fontSize: 40, bold: true, color: C.bg, fontFace: FONT, margin: 0,
  });

  // SOM external note (right of band): x=6.0769 y=4.975 sz=16 bold color=gold
  s.addText("Target: 11% of Charlotte SAM", {
    x: 6.0769, y: 4.975, w: 4.137, h: 0.2306,
    fontSize: 16, bold: true, color: C.gold, fontFace: FONT, margin: 0,
  });
  // SOM note body: x=6.0782 y=5.28 sz=12 color=body
  s.addText("5 locations × ~$8M stabilized revenue, achieved over a 30-month ramp curve per location", {
    x: 6.0782, y: 5.28, w: 3.2449, h: 0.64,
    fontSize: 12, color: C.body, fontFace: FONT, valign: "top", lineSpacingMultiple: 1.28, margin: 0,
  });

  footer(s, "Global Wellness Institute (2024); IBISWorld; Thermal Cafe market analysis", "11");
}

// ─────────────────────────────────────────────────────────────
// SLIDE 12 — EXPANSION
// Chart: x=0.55 y=1.87 w=7.0 h=4.68
// Table: x=7.95 y=2.0 w=4.43 h=2.7
// Rollout thesis below table
// ─────────────────────────────────────────────────────────────
{
  const s = p.addSlide();
  s.background = { color: C.bg };

  titleBlock(s,
    "EXPANSION  ·  5-LOCATION GROWTH PLAN",
    "A Sunbelt-first rollout scales to $41M revenue and $13.8M EBITDA by Year 5 across five locations",
    12.4567
  );

  // Revenue / EBITDA bar chart
  s.addChart(p.charts.BAR, [
    { name: "Revenue ($M)", labels: ["Y1","Y2","Y3","Y4","Y5"], values: [4.54, 7.54, 13.8, 22.5, 41.2] },
    { name: "EBITDA ($M)",  labels: ["Y1","Y2","Y3","Y4","Y5"], values: [0.66, 2.32, 4.10, 7.20, 13.8] },
  ], {
    x: 0.55, y: 1.87, w: 7.00, h: 4.68,
    barDir: "col", barGapWidthPct: 55,
    chartColors: ["2A7A6E", C.gold],
    chartArea: { fill: { color: C.bg } },
    plotArea: { fill: { color: C.bg } },
    showValue: true,
    dataLabelColor: C.body, dataLabelFontSize: 10, dataLabelFontBold: true, dataLabelFontFace: FONT,
    dataLabelFormatCode: "$#,##0.0\"M\"",
    catAxisLabelColor: C.body, catAxisLabelFontSize: 12, catAxisLabelFontFace: FONT,
    valAxisHidden: true,
    valGridLine: { style: "none" }, catGridLine: { style: "none" },
    catAxisLineShow: false, valAxisLineShow: false,
    showLegend: true, legendPos: "b", legendFontSize: 11, legendColor: C.muted, legendFontFace: FONT,
  });

  // City table: x=7.95 y=2.0 w=4.43 h=2.7
  // colW: [0.38, 1.9, 1.15, 1.0]  rowH: 0.45
  // header: fill=C9A84C(gold) text=112236(dark); body odd=16293F, even=1A3050 text=body
  const cities = [
    ["#","City","Open","Pop"],
    ["1","Charlotte, NC","Q3 2027","2.8M"],
    ["2","Raleigh, NC",  "Q2 2028","1.5M"],
    ["3","Atlanta, GA",  "Q4 2028","6.3M"],
    ["4","Nashville, TN","Q2 2029","2.1M"],
    ["5","New York, NY", "Q4 2029","19.5M"],
  ];
  s.addTable(cities.map((row, ri) => row.map((cell, ci) => {
    const isHead = ri === 0;
    const isAlt  = ri % 2 === 0 && !isHead;
    return {
      text: cell,
      options: {
        fontSize: 15, fontFace: FONT,
        bold: isHead,
        color: isHead ? C.bgMid : C.body,
        fill: { color: isHead ? C.gold : (isAlt ? C.bgCardAlt : C.bgCard) },
        align: ci === 3 ? "right" : "left",
        valign: "middle",
        border: [
          { pt: isHead ? 1.0 : 0.5, color: isHead ? C.gold : C.ruleBright, type: "solid" },
          { type: "none" }, { type: "none" }, { type: "none" },
        ],
      },
    };
  })), {
    x: 7.95, y: 2.00, w: 4.43,
    colW: [0.38, 1.9, 1.15, 1.0],
    rowH: 0.45,
    autoPage: false,
  });

  // Rollout thesis rule: x=7.95 y=4.88 w=4.833 h=0.014
  s.addShape(p.shapes.RECTANGLE, {
    x: 7.95, y: 4.88, w: 4.833, h: 0.014,
    fill: { color: C.ruleBright }, line: { type: "none" },
  });
  // "ROLLOUT THESIS": x=7.95 y=5.08 sz=15 bold charSpc=2.5 color=gold
  s.addText("ROLLOUT THESIS", {
    x: 7.95, y: 5.08, w: 4.833, h: 0.26,
    fontSize: 15, bold: true, color: C.gold, fontFace: FONT, charSpacing: 2.5, margin: 0,
  });
  // Thesis body: x=7.95 y=5.32 sz=13 color=body lnSpc~1.35
  s.addText("Sunbelt-first sequencing shares labor pool, regional GM, and proven build template. NYC added Year 5 for brand signaling.", {
    x: 7.95, y: 5.32, w: 4.833, h: 1.55,
    fontSize: 13, color: C.body, fontFace: FONT, valign: "top", lineSpacingMultiple: 1.35, margin: 0,
  });

  footer(s, "Thermal Cafe expansion model; U.S. Census Bureau metro population estimates (2024)", "12");
}

// ─────────────────────────────────────────────────────────────
// SLIDE 13 — DEVELOPMENT / COST & ENGINEERING
// Chart: x=0.55 y=2.0 w=7.5 h=4.872
// Right panel: KEY CHALLENGES with difficulty bars
// ─────────────────────────────────────────────────────────────
{
  const s = p.addSlide();
  s.background = { color: C.bg };

  titleBlock(s,
    "DEVELOPMENT  ·  COST & ENGINEERING",
    "A $4.5–6.5M buildout is MEP-heavy but landlord TI offset and permanent wet-area property value",
    12.6633
  );

  // Stacked horizontal cost chart
  const dev = [
    ["Wet Areas",650,250],["Finishes",540,240],["FF&E",520,200],
    ["HVAC",420,200],["Contingency",420,160],["Structural",320,160],
    ["Electrical",320,160],["Pool Mech",280,140],["A&E",240,100],
    ["Sauna/IR",240,120],["Plumbing",220,100],["Demo",180,80],["Tech",160,80],
  ];

  s.addChart(p.charts.BAR, [
    { name: "Low ($K)",           labels: dev.map(r=>r[0]), values: dev.map(r=>r[1]) },
    { name: "Range to High ($K)", labels: dev.map(r=>r[0]), values: dev.map(r=>r[2]) },
  ], {
    x: 0.55, y: 2.00, w: 7.50, h: 4.872,
    barDir: "bar", barGrouping: "stacked",
    chartColors: ["2A7A6E", C.gold],
    chartColorsOpacity: 90,
    chartArea: { fill: { color: C.bg } },
    plotArea: { fill: { color: C.bg } },
    catAxisLabelColor: C.body,  catAxisLabelFontSize: 10, catAxisLabelFontFace: FONT,
    valAxisLabelColor: C.muted, valAxisLabelFontSize: 9,  valAxisLabelFontFace: FONT,
    valGridLine: { color: C.ruleBright, size: 0.5 },
    catGridLine: { style: "none" },
    catAxisLineShow: false, valAxisLineShow: false,
    showLegend: true, legendPos: "b", legendFontSize: 10, legendColor: C.muted, legendFontFace: FONT,
  });

  // Right panel x=8.45 w=4.333
  // "KEY CHALLENGES": y=2.0 sz=16 bold charSpc=2.5 color=gold
  s.addText("KEY CHALLENGES", {
    x: 8.45, y: 2.00, w: 4.333, h: 0.26,
    fontSize: 16, bold: true, color: C.gold, fontFace: FONT, charSpacing: 2.5, margin: 0,
  });
  // "Difficulty scale (1–10)": y=2.32 sz=11 italic color=muted
  s.addText("Difficulty scale (1–10)", {
    x: 8.45, y: 2.32, w: 4.333, h: 0.26,
    fontSize: 11, italic: true, color: C.muted, fontFace: FONT, margin: 0,
  });

  // Challenge rows:
  // label: sz=15 bold color=white  |  score: sz=14 bold align=right color=gold
  // track: y=labelY+0.38 h=0.20  fill=16293F (bgCard)
  // bar fill: gold, w=cW*(score/10)
  // Measured y positions: Wet areas=2.74, Site filter=3.62, Electrical=4.50, TI offset=5.38
  // Track widths from XML: 4.333 wide each, at x=8.45
  // Score label x=10.9631 w=1.8199
  const challenges = [
    { label: "Wet areas",   score: 9, ruleY: 3.12, trackW: 3.8997, labelY: 2.74 },
    { label: "Site filter", score: 8, ruleY: 4.00, trackW: 3.4664, labelY: 3.62 },
    { label: "Electrical",  score: 7, ruleY: 4.88, trackW: 3.0331, labelY: 4.50 },
    { label: "TI offset",   score: 4, ruleY: 5.76, trackW: 1.7332, labelY: 5.38 },
  ];

  challenges.forEach((c) => {
    s.addText(c.label, {
      x: 8.45, y: c.labelY, w: 2.5131, h: 0.32,
      fontSize: 15, bold: true, color: C.white, fontFace: FONT, margin: 0,
    });
    s.addText(c.score + "/10", {
      x: 10.9631, y: c.labelY, w: 1.8199, h: 0.32,
      fontSize: 14, bold: true, color: C.gold, fontFace: FONT, align: "right", margin: 0,
    });
    // Track background
    s.addShape(p.shapes.RECTANGLE, {
      x: 8.45, y: c.ruleY, w: 4.333, h: 0.20,
      fill: { color: C.bgCard }, line: { type: "none" },
    });
    // Filled bar (width from XML trackW = actual filled width)
    s.addShape(p.shapes.RECTANGLE, {
      x: 8.45, y: c.ruleY, w: c.trackW, h: 0.20,
      fill: { color: C.gold }, line: { type: "none" },
    });
  });

  // Total buildout rule: x=8.45 y=6.1296 w=4.333 h=0.016
  s.addShape(p.shapes.RECTANGLE, {
    x: 8.45, y: 6.1296, w: 4.333, h: 0.016,
    fill: { color: C.ruleBright }, line: { type: "none" },
  });
  // "TOTAL BUILDOUT": y=6.1656 sz=12 bold charSpc=2 color=muted
  s.addText("TOTAL BUILDOUT", {
    x: 8.45, y: 6.1656, w: 4.333, h: 0.24,
    fontSize: 12, bold: true, color: C.muted, fontFace: FONT, charSpacing: 2, margin: 0,
  });
  // "$4.51M – $6.50M": y=6.4256 sz=22 bold color=white
  s.addText("$4.51M – $6.50M", {
    x: 8.45, y: 6.4256, w: 4.333, h: 0.42,
    fontSize: 22, bold: true, color: C.white, fontFace: FONT, margin: 0,
  });

  footer(s, "Construction cost benchmarks from comparable wellness facilities; Thermal Cafe development brief", "13");
}

// ─────────────────────────────────────────────────────────────
// SLIDE 14 — ROADMAP & THE ASK
// Timeline with 5 milestones (alternating above/below)
// Gold ask banner at bottom
// ─────────────────────────────────────────────────────────────
{
  const s = p.addSlide();
  s.background = { color: C.bg };

  // Title block (no footer rule on this slide — matches uploaded deck)
  s.addShape(p.shapes.RECTANGLE, {
    x: PIP_X, y: PIP_Y, w: PIP_W, h: PIP_H,
    fill: { color: C.gold }, line: { type: "none" },
  });
  s.addText("ROADMAP & THE ASK", {
    x: EYEBROW_X, y: EYEBROW_Y, w: 12.233, h: EYEBROW_H,
    fontSize: 11, bold: true, color: C.gold, fontFace: FONT, charSpacing: 3.5, margin: 0,
  });
  s.addText("An $8M seed at $24M pre-money funds flagship South End through opening and the first expansion lease", {
    x: TITLE_X, y: TITLE_Y, w: 12.113, h: TITLE_H,
    fontSize: 22, bold: true, color: C.white, fontFace: FONT,
    valign: "top", lineSpacingMultiple: 1.18, margin: 0,
  });
  s.addShape(p.shapes.RECTANGLE, {
    x: M, y: DIVIDER_Y, w: CW, h: 0.018,
    fill: { color: C.ruleBright }, line: { type: "none" },
  });

  // Timeline axis: x=1.25 y=3.88 w=10.833 h=0.022
  s.addShape(p.shapes.RECTANGLE, {
    x: 1.25, y: 3.88, w: 10.833, h: 0.022,
    fill: { color: C.ruleBright }, line: { type: "none" },
  });

  // Five milestones — positions from XML
  // Dots: OVAL at x=cx-0.15 y=3.77 w=0.30 h=0.30 fill=gold
  // Dot centers x positions: 1.22, 3.9983, 6.6865, 9.3947, 12.103
  // "above" milestones: label/title above timeline, stem goes up
  // "below" milestones: label/title below timeline, stem goes down
  const milestones = [
    {
      cx: 1.22,    above: true,
      label: "Q2 2026",     title: "CAPITAL RAISE",
      detail: "Close $8M Seed\nFinalize LOI",
      // text x/y from XML
      labelX: 0.1,  labelY: 1.8,   labelW: 2.3,
      titleX: 0.1,  titleY: 2.12,  titleW: 2.3,
      detailX: -0.1, detailY: 2.45, detailW: 2.7,
      stemX: 1.24,  stemY: 2.98,  stemH: 0.79,
    },
    {
      cx: 3.9983,  above: false,
      label: "Q3 2026",     title: "SITE & DESIGN",
      detail: "Lease + permits",
      labelX: 2.8083, labelY: 4.86,  labelW: 2.3,
      titleX: 2.8083, titleY: 5.18,  titleW: 2.3,
      detailX: 2.6183, detailY: 5.36, detailW: 2.7,
      stemX: 3.9483, stemY: 4.04, stemH: 0.79,
    },
    {
      cx: 6.6865,  above: true,
      label: "Q4'26–Q2'27", title: "BUILD-OUT",
      detail: "Construction\nPresale",
      labelX: 5.5165, labelY: 1.8,   labelW: 2.3,
      titleX: 5.5165, titleY: 2.12,  titleW: 2.3,
      detailX: 5.3165, detailY: 2.45, detailW: 2.7,
      stemX: 6.6565, stemY: 2.98, stemH: 0.79,
    },
    {
      cx: 9.3947,  above: false,
      label: "Q3 2027",     title: "FLAGSHIP OPEN",
      detail: "South End launch",
      labelX: 8.2247, labelY: 4.86,  labelW: 2.3,
      titleX: 8.2247, titleY: 5.18,  titleW: 2.3,
      detailX: 8.0347, detailY: 5.36, detailW: 2.7,
      stemX: 9.3647, stemY: 4.04, stemH: 0.79,
    },
    {
      cx: 12.103,  above: true,
      label: "2028–2029",   title: "EXPANSION",
      detail: "Raleigh, Nashville,\nAtlanta, NYC",
      labelX: 10.933, labelY: 1.8,   labelW: 2.3,
      titleX: 10.933, titleY: 2.12,  titleW: 2.3,
      detailX: 10.733, detailY: 2.45, detailW: 2.7,
      stemX: 12.073, stemY: 2.98, stemH: 0.79,
    },
  ];

  milestones.forEach((m) => {
    // Gold dot: x=cx-0.15 y=3.77 w=0.30 h=0.30
    s.addShape(p.shapes.OVAL, {
      x: m.cx - 0.15, y: 3.77, w: 0.30, h: 0.30,
      fill: { color: C.gold }, line: { color: C.bg, width: 2 },
    });

    // Stem (vertical line connecting dot to label)
    s.addShape(p.shapes.RECTANGLE, {
      x: m.stemX, y: m.stemY, w: 0.02, h: m.stemH,
      fill: { color: C.ruleBright }, line: { type: "none" },
    });

    // Quarter label: sz=15 bold charSpc=1 color=gold align=ctr
    s.addText(m.label, {
      x: m.labelX, y: m.labelY, w: m.labelW, h: 0.28,
      fontSize: 15, bold: true, color: C.gold, fontFace: FONT,
      align: "center", charSpacing: 1, margin: 0,
    });

    // Milestone title: sz=20 bold charSpc=1 color=white align=ctr
    s.addText(m.title, {
      x: m.titleX, y: m.titleY, w: m.titleW, h: 0.30,
      fontSize: 20, bold: true, color: C.white, fontFace: FONT,
      align: "center", charSpacing: 1, margin: 0,
    });

    // Detail text: sz=15 color=body align=ctr lnSpc=1.22
    s.addText(m.detail, {
      x: m.detailX, y: m.detailY, w: m.detailW, h: 0.54,
      fontSize: 15, color: C.body, fontFace: FONT,
      align: "center", lineSpacingMultiple: 1.22, margin: 0,
    });
  });

  // Gold ask banner: x=0.55 y=6.2 w=12.233 h=0.98  fill=gold
  s.addShape(p.shapes.RECTANGLE, {
    x: 0.55, y: 6.20, w: 12.233, h: 0.98,
    fill: { color: C.gold }, line: { type: "none" },
  });

  // "$8M  SEED ROUND": x=0.85 y=6.29 w=11.833 h=0.55
  // Two text runs: "$8M " sz=44 bold color=bg,  "SEED ROUND" sz=28 bold charSpc=4 color=bgMid
  s.addText([
    { text: "$8M  ",      options: { fontSize: 44, bold: true, color: C.bg,    fontFace: FONT } },
    { text: "SEED ROUND", options: { fontSize: 28, bold: true, color: C.bgMid, fontFace: FONT, charSpacing: 4 } },
  ], {
    x: 0.85, y: 6.29, w: 11.833, h: 0.55, valign: "middle",
  });

  // Sub-text: x=0.85 y=6.84 w=11.833 h=0.28 sz=14 color=bgMid
  s.addText("Pre-Money: $24M   ·   Lead Investor + 2 Strategic Partners   ·   24–30 month payback", {
    x: 0.85, y: 6.84, w: 11.833, h: 0.28,
    fontSize: 14, color: C.bgMid, fontFace: FONT, margin: 0,
  });
}

// ─────────────────────────────────────────────────────────────
// SAVE
// ─────────────────────────────────────────────────────────────
const out = path.resolve(__dirname, ".");
p.writeFile({ fileName: path.join(out, "Thermal_Cafe_Dark_Premium.pptx") })
  .then(() => console.log("✓ Thermal_Cafe_Dark_Premium.pptx written successfully"))
  .catch(e => console.error("Error:", e));
