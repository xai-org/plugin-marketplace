/**
 * Agri_Traders_ABCD.pptx - pptxgenjs replica (revised)
 *
 * Colour / typography palette matches the source deck
 * "Agri_Traders_ABCD-3.pptx":
 *   - Cream paper background with a warm-neutral palette
 *   - Amber/ochre accent used for letters B/D, italic "ABCDs",
 *     bold runs, TREND arrows, progress bars, etc.
 *   - Arial throughout (as declared in the source XML)
 *
 * Slide canvas: 20" x 11.25"
 *
 * Run:  node abcd.js
 * Deps: npm install pptxgenjs
 */

const pptxgen = require("pptxgenjs");

// ---------------------------------------------------------------------------
// Presentation + layout
// ---------------------------------------------------------------------------
const pres = new pptxgen();
pres.author = "Agri Commodities Market Brief";
pres.title = "The ABCDs of Agri-Trading";
pres.company = "Agri Commodities / Market Brief";

pres.defineLayout({ name: "CUSTOM_20x11_25", width: 20, height: 11.25 });
pres.layout = "CUSTOM_20x11_25";

// ---------------------------------------------------------------------------
// Design tokens (extracted from the source .pptx)
// ---------------------------------------------------------------------------
const COLOR = {
  paper:       "F6F2EA", // cream slide background
  card:        "EEE8DC", // darker cream — margin-bar track, slide-10 middle card
  ink:         "2B2821", // primary dark brown-black (titles, body emphasis, letters A/C)
  secondary:   "5A5347", // medium brown — subheads, supporting body prose
  muted:       "847C6E", // warm gray — eyebrows, captions, footers, page numbers
  accent:      "A87432", // amber/ochre — B/D, italic "ABCDs", bold %, arrows, bars
  accentLight: "D6B989", // light tan — middle timeline dots (s5), 15% bar (s6)
  divider:     "C4BDAE", // light warm gray — hairlines between rows
};

const FONT = {
  head: "Arial",
  body: "Arial",
};

// Common geometry
const MARGIN_X = 1.25;
const CONTENT_W = 18.02;
const TITLE_Y = 1.48;
const EYEBROW_Y = 1.00;
const FOOTER_Y = 10.58;

// ---------------------------------------------------------------------------
// Reusable chrome: eyebrow, footer, page number
// ---------------------------------------------------------------------------
function addChrome(slide, sectionLabel, pageNumber) {
  slide.addText(sectionLabel, {
    x: MARGIN_X, y: EYEBROW_Y, w: CONTENT_W, h: 0.23,
    fontFace: FONT.body, fontSize: 12, color: COLOR.muted,
    bold: false, charSpacing: 1.7, margin: 0,
  });

  slide.addText("THE ABCDS OF AGRI-TRADING", {
    x: MARGIN_X, y: FOOTER_Y, w: 4, h: 0.21,
    fontFace: FONT.body, fontSize: 10.5, color: COLOR.muted,
    charSpacing: 1.5, margin: 0,
  });

  slide.addText(pageNumber, {
    x: 18.16, y: FOOTER_Y, w: 0.67, h: 0.21,
    fontFace: FONT.body, fontSize: 10.5, color: COLOR.muted,
    align: "right", charSpacing: 1.5, margin: 0,
  });
}

function addSlideTitle(slide, text) {
  slide.addText(text, {
    x: MARGIN_X, y: TITLE_Y, w: CONTENT_W, h: 0.95,
    fontFace: FONT.head, fontSize: 57, color: COLOR.ink,
    bold: false, margin: 0, valign: "top",
  });
}

// ---------------------------------------------------------------------------
// SLIDE 1 — Cover
// ---------------------------------------------------------------------------
function slide01() {
  const s = pres.addSlide();
  s.background = { color: COLOR.paper };

  // Top-left meta
  s.addText("AGRI COMMODITIES / MARKET BRIEF", {
    x: 1.25, y: 0.75, w: 5, h: 0.22,
    fontFace: FONT.body, fontSize: 11.25, color: COLOR.muted,
    charSpacing: 1.5, margin: 0,
  });

  // Top-right meta
  s.addText("VOLUME 01 · 2026", {
    x: 14, y: 0.75, w: 4.83, h: 0.22,
    fontFace: FONT.body, fontSize: 11.25, color: COLOR.muted,
    align: "right", charSpacing: 1.5, margin: 0,
  });

  // Huge "ABCD" letters — A/C = ink, B/D = accent
  const letters = [
    { L: "A", color: COLOR.ink },
    { L: "B", color: COLOR.accent },
    { L: "C", color: COLOR.ink },
    { L: "D", color: COLOR.accent },
  ];
  const xs = [1.25, 3.60, 5.95, 8.51];
  const widths = [2.43, 2.43, 2.64, 2.64];
  letters.forEach((obj, i) => {
    s.addText(obj.L, {
      x: xs[i], y: 1.62, w: widths[i], h: 3.23,
      fontFace: FONT.head, fontSize: 270, color: obj.color,
      bold: false, margin: 0, valign: "top",
    });
  });

  // Headline: "The ABCDs of Agri-Trading" (ABCDs italic, accent colour)
  s.addText(
    [
      { text: "The ", options: { italic: false, color: COLOR.ink } },
      { text: "ABCDs", options: { italic: true, color: COLOR.accent } },
      { text: " of Agri-Trading", options: { italic: false, color: COLOR.ink } },
    ],
    {
      x: 1.25, y: 5.31, w: 17.5, h: 2.3,
      fontFace: FONT.head, fontSize: 96, color: COLOR.ink,
      charSpacing: -1.9, margin: 0, valign: "top",
    }
  );

  // Subhead
  s.addText(
    "A field guide to the four houses that quietly move the world\u2019s grain, oilseeds, sugar and cotton.",
    {
      x: 1.25, y: 8.41, w: 11.80, h: 1.02,
      fontFace: FONT.body, fontSize: 25.5, color: COLOR.secondary,
      margin: 0, valign: "top",
    }
  );

  // Thin divider above footer
  s.addShape(pres.shapes.LINE, {
    x: 1.25, y: 10.08, w: 17.58, h: 0,
    line: { color: COLOR.ink, width: 0.75 },
  });

  // Bottom-left footer
  s.addText("ARCHER DANIELS MIDLAND · BUNGE · CARGILL · LOUIS DREYFUS", {
    x: 1.25, y: 10.32, w: 10, h: 0.22,
    fontFace: FONT.body, fontSize: 11.25, color: COLOR.muted,
    charSpacing: 1.5, margin: 0,
  });

  // Bottom-right tagline
  s.addText("A TRADER\u2019S PRIMER", {
    x: 14, y: 10.32, w: 4.83, h: 0.22,
    fontFace: FONT.body, fontSize: 11.25, color: COLOR.muted,
    align: "right", charSpacing: 1.5, margin: 0,
  });
}

// ---------------------------------------------------------------------------
// SLIDE 2 — Executive summary
// ---------------------------------------------------------------------------
function slide02() {
  const s = pres.addSlide();
  s.background = { color: COLOR.paper };
  addChrome(s, "02 / EXECUTIVE SUMMARY", "02 / 10");

  addSlideTitle(s, "Four firms, most of the world\u2019s food trade.");

  // Divider above the bullet rows
  s.addShape(pres.shapes.LINE, {
    x: 1.25, y: 5.45, w: 17.58, h: 0,
    line: { color: COLOR.divider, width: 0.5 },
  });

  const bullets = [
    {
      num: "01", y: 5.70,
      runs: [
        { text: "Together the ABCDs intermediate roughly ", options: { color: COLOR.ink } },
        { text: "70\u201390%", options: { bold: true, color: COLOR.accent } },
        { text: " of global grain flows.", options: { color: COLOR.ink } },
      ],
    },
    {
      num: "02", y: 7.35,
      runs: [
        { text: "They make money less from price direction, more from ", options: { color: COLOR.ink } },
        { text: "logistics, storage and basis", options: { bold: true, color: COLOR.ink } },
        { text: ".", options: { color: COLOR.ink } },
      ],
    },
    {
      num: "03", y: 9.01,
      runs: [
        { text: "Climate, geopolitics and the energy transition are reshaping the ", options: { color: COLOR.ink } },
        { text: "next decade", options: { bold: true, color: COLOR.ink } },
        { text: " of the business.", options: { color: COLOR.ink } },
      ],
    },
  ];

  bullets.forEach((b, i) => {
    s.addText(b.num, {
      x: 1.25, y: b.y + 0.05, w: 0.75, h: 0.4,
      fontFace: FONT.body, fontSize: 13.5, color: COLOR.muted,
      charSpacing: 1.2, margin: 0, valign: "top",
    });
    s.addText(b.runs, {
      x: 2.21, y: b.y, w: 7.91, h: 1.2,
      fontFace: FONT.body, fontSize: 25.5, color: COLOR.ink,
      margin: 0, valign: "top",
    });
    // Row divider
    if (i < bullets.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: 1.25, y: b.y + 1.50, w: 8.87, h: 0,
        line: { color: COLOR.divider, width: 0.5 },
      });
    }
  });
  s.addShape(pres.shapes.LINE, {
    x: 1.25, y: 10.30, w: 8.87, h: 0,
    line: { color: COLOR.divider, width: 0.5 },
  });

  // Pull-quote on the right
  s.addText(
    "\u201CWhoever controls the storage and the ships controls the price.\u201D",
    {
      x: 10.89, y: 7.90, w: 8.1, h: 1.6,
      fontFace: FONT.head, fontSize: 34, color: COLOR.ink,
      italic: true, margin: 0, valign: "top",
    }
  );
  s.addText("\u2014 TRADER\u2019S PROVERB", {
    x: 10.89, y: 9.60, w: 8.09, h: 0.42,
    fontFace: FONT.body, fontSize: 18, color: COLOR.muted,
    charSpacing: 1.5, margin: 0,
  });
}

// ---------------------------------------------------------------------------
// SLIDE 3 — Definitions
// ---------------------------------------------------------------------------
function slide03() {
  const s = pres.addSlide();
  s.background = { color: COLOR.paper };
  addChrome(s, "03 / DEFINITIONS", "03 / 10");

  addSlideTitle(s, "What agricultural commodities are.");

  s.addText(
    "Interchangeable, graded raw crops traded in bulk \u2014 priced on exchanges and differentiated by origin, quality and delivery.",
    {
      x: 1.25, y: 2.55, w: 11.80, h: 1.02,
      fontFace: FONT.body, fontSize: 25.5, color: COLOR.secondary,
      margin: 0, valign: "top",
    }
  );

  const cols = [
    { x: 1.25,  w: 4.07, label: "GRAINS",            num: "I.",   numColor: COLOR.ink,
      items: "Wheat Corn Rice Barley",             cap: "Calories for humans & animals." },
    { x: 6.04,  w: 3.64, label: "OILSEEDS",          num: "II.",  numColor: COLOR.accent,
      items: "Soybean Rapeseed Sunflower Palm",    cap: "Oil, meal, biofuel feedstock." },
    { x: 10.42, w: 3.64, label: "SOFTS",             num: "III.", numColor: COLOR.ink,
      items: "Sugar Coffee Cocoa Cotton",          cap: "Tropical & climate-sensitive." },
    { x: 14.79, w: 4.08, label: "LIVESTOCK & DAIRY", num: "IV.",  numColor: COLOR.accent,
      items: "Cattle Hogs Milk powder Whey",       cap: "Derived from feed economics." },
  ];

  // Hairline dividers above the column headers
  cols.forEach((c) => {
    s.addShape(pres.shapes.LINE, {
      x: c.x, y: 4.75, w: c.w - 0.3, h: 0,
      line: { color: COLOR.divider, width: 0.5 },
    });
  });

  cols.forEach((c) => {
    s.addText(c.label, {
      x: c.x, y: 4.88, w: c.w, h: 0.21,
      fontFace: FONT.body, fontSize: 10.5, color: COLOR.muted,
      charSpacing: 1.5, margin: 0,
    });
    s.addText(c.num, {
      x: c.x, y: 5.33, w: c.w, h: 1.1,
      fontFace: FONT.head, fontSize: 54, color: c.numColor,
      margin: 0, valign: "top",
    });
    s.addText(c.items, {
      x: c.x, y: 6.50, w: c.w, h: 1.71,
      fontFace: FONT.body, fontSize: 21, color: COLOR.ink,
      margin: 0, valign: "top",
    });
    s.addText(c.cap, {
      x: c.x, y: 8.54, w: c.w, h: 0.42,
      fontFace: FONT.body, fontSize: 18, color: COLOR.muted,
      margin: 0, valign: "top",
    });
  });

  s.addText("Benchmarks · CBOT ICE Euronext DCE MATIF", {
    x: 1.25, y: 9.96, w: 18.02, h: 0.42,
    fontFace: FONT.body, fontSize: 18, color: COLOR.muted,
    margin: 0,
  });
}

// ---------------------------------------------------------------------------
// SLIDE 4 — The Houses
// ---------------------------------------------------------------------------
function slide04() {
  const s = pres.addSlide();
  s.background = { color: COLOR.paper };
  addChrome(s, "04 / THE HOUSES", "04 / 10");

  addSlideTitle(s, "Meet the ABCDs.");

  const houses = [
    { x: 1.25,  letter: "A", lColor: COLOR.ink,    lineColor: COLOR.ink,
      name: "Archer Daniels Midland", city: "CHICAGO, USA",
      founded: "1902", listed: "NYSE : ADM", edge: "Processing & nutrition" },
    { x: 5.73,  letter: "B", lColor: COLOR.accent, lineColor: COLOR.accent,
      name: "Bunge Global",            city: "ST. LOUIS, USA",
      founded: "1818", listed: "NYSE : BG",  edge: "Oilseed crushing" },
    { x: 10.21, letter: "C", lColor: COLOR.ink,    lineColor: COLOR.ink,
      name: "Cargill, Inc.",           city: "MINNETONKA, USA",
      founded: "1865", listed: "Private",    edge: "Scale & breadth" },
    { x: 14.69, letter: "D", lColor: COLOR.accent, lineColor: COLOR.accent,
      name: "Louis Dreyfus Company",   city: "ROTTERDAM, NL",
      founded: "1851", listed: "Private",    edge: "Origination in S. America" },
  ];

  const colW = 4.18;
  houses.forEach((h) => {
    // Divider above each column letter (A/C ink, B/D accent)
    s.addShape(pres.shapes.LINE, {
      x: h.x, y: 3.18, w: colW - 0.3, h: 0,
      line: { color: h.lineColor, width: 0.75 },
    });
    s.addText(h.letter, {
      x: h.x, y: 3.41, w: colW, h: 2.15,
      fontFace: FONT.head, fontSize: 165, color: h.lColor,
      margin: 0, valign: "top",
    });
    s.addText(h.name, {
      x: h.x, y: 5.69, w: colW, h: 1.1,
      fontFace: FONT.head, fontSize: 30, color: COLOR.ink,
      margin: 0, valign: "top",
    });
    s.addText(h.city, {
      x: h.x, y: 6.95, w: colW, h: 0.42,
      fontFace: FONT.body, fontSize: 18, color: COLOR.muted,
      charSpacing: 1.5, margin: 0,
    });

    // Light divider above the meta block
    s.addShape(pres.shapes.LINE, {
      x: h.x, y: 8.80, w: colW - 0.3, h: 0,
      line: { color: COLOR.divider, width: 0.5 },
    });

    const meta = [
      { label: "Founded", val: h.founded, y: 9.04 },
      { label: "Listed",  val: h.listed,  y: 9.50 },
      { label: "Edge",    val: h.edge,    y: 9.96 },
    ];
    meta.forEach((m) => {
      s.addText(
        [
          { text: m.label + " ", options: { bold: true, color: COLOR.secondary } },
          { text: m.val,         options: { color: COLOR.secondary } },
        ],
        {
          x: h.x, y: m.y, w: colW, h: 0.42,
          fontFace: FONT.body, fontSize: 18, color: COLOR.secondary,
          margin: 0, valign: "top",
        }
      );
    });
  });
}

// ---------------------------------------------------------------------------
// SLIDE 5 — Flow of goods
// ---------------------------------------------------------------------------
function slide05() {
  const s = pres.addSlide();
  s.background = { color: COLOR.paper };
  addChrome(s, "05 / FLOW OF GOODS", "05 / 10");

  addSlideTitle(s, "The agricultural supply chain.");

  s.addText(
    "From field to fork \u2014 and the ABCDs sit across every link of it.",
    {
      x: 1.25, y: 2.55, w: 17.5, h: 0.53,
      fontFace: FONT.body, fontSize: 25.5, color: COLOR.secondary,
      margin: 0, valign: "top",
    }
  );

  const steps = [
    { n: "STEP 01", title: "Farm & Origination",  body: "Buying from growers; grading and first storage." },
    { n: "STEP 02", title: "Inland Logistics",    body: "Trucks, rail and river barges to export terminals." },
    { n: "STEP 03", title: "Storage & Elevators", body: "Silos hold stock against futures positions." },
    { n: "STEP 04", title: "Shipping & Freight",  body: "Panamax and Handysize vessels move the cargo." },
    { n: "STEP 05", title: "Crush & Processing",  body: "Oilseeds to oil and meal; wheat to flour." },
    { n: "STEP 06", title: "End Markets",         body: "Food, feed, fuel, and industrial buyers." },
  ];

  const startX = 1.46;
  const colW = 2.58;
  const gap = 2.92;
  const timelineY = 5.05;

  // Timeline baseline
  s.addShape(pres.shapes.LINE, {
    x: 1.25, y: timelineY, w: 17.58, h: 0,
    line: { color: COLOR.divider, width: 0.75 },
  });

  // Dots on the timeline (first & last accent; middle four accentLight)
  steps.forEach((_, i) => {
    const dotX = startX + i * gap - 0.11;
    const isEdge = (i === 0 || i === steps.length - 1);
    s.addShape(pres.shapes.OVAL, {
      x: dotX, y: timelineY - 0.1, w: 0.2, h: 0.2,
      fill: { color: isEdge ? COLOR.accent : COLOR.accentLight },
      line: { type: "none" },
    });
  });

  steps.forEach((st, i) => {
    const x = startX + i * gap;
    s.addText(st.n, {
      x: x, y: 5.26, w: colW, h: 0.20,
      fontFace: FONT.body, fontSize: 9.75, color: COLOR.muted,
      charSpacing: 1.5, margin: 0,
    });
    s.addText(st.title, {
      x: x, y: 5.62, w: colW, h: 1.0,
      fontFace: FONT.head, fontSize: 31.5, color: COLOR.ink,
      margin: 0, valign: "top",
    });
    s.addText(st.body, {
      x: x, y: 6.95, w: colW, h: 1.3,
      fontFace: FONT.body, fontSize: 18, color: COLOR.muted,
      margin: 0, valign: "top",
    });
  });

  // ABCD PRESENCE progress bar
  s.addText("ABCD PRESENCE", {
    x: 1.25, y: 9.96, w: 4, h: 0.42,
    fontFace: FONT.body, fontSize: 18, color: COLOR.ink,
    charSpacing: 1.5, margin: 0,
  });
  // Progress bar (ochre) spanning most of the width
  s.addShape(pres.shapes.RECTANGLE, {
    x: 4.50, y: 10.11, w: 11.50, h: 0.12,
    fill: { color: COLOR.accent },
    line: { type: "none" },
  });
  s.addText("End to end", {
    x: 16.5, y: 9.96, w: 2.33, h: 0.42,
    fontFace: FONT.body, fontSize: 18, color: COLOR.muted,
    align: "right", margin: 0,
  });
}

// ---------------------------------------------------------------------------
// SLIDE 6 — Business model
// ---------------------------------------------------------------------------
function slide06() {
  const s = pres.addSlide();
  s.background = { color: COLOR.paper };
  addChrome(s, "06 / BUSINESS MODEL", "06 / 10");

  addSlideTitle(s, "How the business model works.");

  // Big quote-style statement (left) — "Arbitraging the gaps" italic + accent
  s.addText(
    [
      { text: "Not betting on price. ", options: { color: COLOR.ink } },
      { text: "Arbitraging the gaps", options: { italic: true, color: COLOR.accent } },
      { text: " between places, times and forms.", options: { color: COLOR.ink } },
    ],
    {
      x: 1.25, y: 2.89, w: 9.0, h: 2.5,
      fontFace: FONT.head, fontSize: 37, color: COLOR.ink,
      margin: 0, valign: "top",
    }
  );

  // SPACE / TIME / FORM columns
  const tri = [
    { x: 1.25, label: "SPACE", body: "Move it from where it\u2019s cheap to where it\u2019s dear." },
    { x: 4.07, label: "TIME",  body: "Store through harvest glut into lean months." },
    { x: 6.89, label: "FORM",  body: "Crush, refine, blend \u2014 unlock higher-value products." },
  ];
  tri.forEach((t) => {
    s.addText(t.label, {
      x: t.x, y: 5.64, w: 2.57, h: 0.22,
      fontFace: FONT.body, fontSize: 9.75, color: COLOR.muted,
      charSpacing: 1.5, margin: 0,
    });
    s.addText(t.body, {
      x: t.x, y: 5.92, w: 2.57, h: 1.9,
      fontFace: FONT.body, fontSize: 21, color: COLOR.ink,
      margin: 0, valign: "top",
    });
  });

  // Right side: "Where the margin comes from"
  s.addText("WHERE THE MARGIN COMES FROM", {
    x: 10.62, y: 2.89, w: 8.37, h: 0.22,
    fontFace: FONT.body, fontSize: 10.5, color: COLOR.muted,
    charSpacing: 1.5, margin: 0,
  });

  // Divider under the heading
  s.addShape(pres.shapes.LINE, {
    x: 10.62, y: 3.22, w: 8.22, h: 0,
    line: { color: COLOR.divider, width: 0.5 },
  });

  const rows = [
    { label: "Origination & merchandising",    pct: "~35%", y: 3.52, frac: 0.95, fill: COLOR.accent },
    { label: "Processing & refining",          pct: "~30%", y: 4.35, frac: 0.80, fill: COLOR.accent },
    { label: "Logistics & freight",            pct: "~20%", y: 5.19, frac: 0.55, fill: COLOR.accent },
    { label: "Risk mgmt & financial services", pct: "~15%", y: 6.02, frac: 0.40, fill: COLOR.accentLight },
  ];
  const trackX = 10.62;
  const trackW = 6.80;   // track ends just before the % column
  rows.forEach((r) => {
    // Label
    s.addText(r.label, {
      x: trackX, y: r.y, w: 6, h: 0.40,
      fontFace: FONT.body, fontSize: 21, color: COLOR.ink,
      margin: 0, valign: "middle",
    });
    // % on the right
    s.addText(r.pct, {
      x: 17.5, y: r.y, w: 1.34, h: 0.40,
      fontFace: FONT.body, fontSize: 18, color: COLOR.ink,
      align: "right", margin: 0, valign: "middle",
    });
    // Background track
    s.addShape(pres.shapes.RECTANGLE, {
      x: trackX, y: r.y + 0.48, w: trackW, h: 0.10,
      fill: { color: COLOR.card },
      line: { type: "none" },
    });
    // Filled bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: trackX, y: r.y + 0.48, w: trackW * r.frac, h: 0.10,
      fill: { color: r.fill },
      line: { type: "none" },
    });
  });

  s.addText("Illustrative mix; varies by firm and cycle.", {
    x: 10.62, y: 6.96, w: 8.37, h: 0.42,
    fontFace: FONT.body, fontSize: 18, color: COLOR.muted,
    italic: true, margin: 0,
  });
}

// ---------------------------------------------------------------------------
// SLIDE 7 — Competitive landscape
// ---------------------------------------------------------------------------
function slide07() {
  const s = pres.addSlide();
  s.background = { color: COLOR.paper };
  addChrome(s, "07 / COMPETITIVE LANDSCAPE", "07 / 10");

  addSlideTitle(s, "The competitive landscape.");

  s.addText(
    "The ABCDs no longer have the field to themselves. Asian integrators and state-linked giants are closing the gap.",
    {
      x: 1.25, y: 2.55, w: 17.5, h: 1.02,
      fontFace: FONT.body, fontSize: 25.5, color: COLOR.secondary,
      margin: 0, valign: "top",
    }
  );

  // Dark divider above the header row
  s.addShape(pres.shapes.LINE, {
    x: 1.25, y: 4.10, w: 17.58, h: 0,
    line: { color: COLOR.ink, width: 0.75 },
  });

  const headers = [
    { label: "CHALLENGER",     x: 1.25,  w: 7.3 },
    { label: "BASE",           x: 8.80,  w: 2.20 },
    { label: "FOCUS",          x: 11.20, w: 3.60 },
    { label: "WHY IT MATTERS", x: 15.00, w: 3.83 },
  ];
  headers.forEach((h) => {
    s.addText(h.label, {
      x: h.x, y: 4.22, w: h.w, h: 0.22,
      fontFace: FONT.body, fontSize: 11.25, color: COLOR.muted,
      charSpacing: 1.5, margin: 0,
    });
  });

  const rows = [
    { y: 4.90, challenger: "COFCO International",            base: "China",     focus: "Grain & oilseed",    why: "State-backed buyer of last resort for Chinese demand." },
    { y: 6.35, challenger: "Wilmar International",           base: "Singapore", focus: "Palm & edible oils", why: "Dominant in Southeast Asian tropical oils." },
    { y: 7.45, challenger: "Olam Agri",                      base: "Singapore", focus: "Grain, rice, cotton", why: "Asia & Africa origination networks." },
    { y: 8.55, challenger: "Glencore Agriculture / Viterra", base: "Rotterdam", focus: "Grain & oilseed",    why: "Merging with Bunge reshapes the top tier." },
    { y: 9.90, challenger: "Regional cooperatives",          base: "Global",    focus: "Origination",        why: "Farmer-owned groups bypass intermediaries." },
  ];

  rows.forEach((r) => {
    s.addText(r.challenger, {
      x: 1.25, y: r.y, w: 7.3, h: 0.65,
      fontFace: FONT.head, fontSize: 28, color: COLOR.ink,
      margin: 0, valign: "top",
    });
    s.addText(r.base, {
      x: 8.80, y: r.y + 0.08, w: 2.20, h: 0.5,
      fontFace: FONT.body, fontSize: 19, color: COLOR.secondary,
      margin: 0, valign: "top",
    });
    s.addText(r.focus, {
      x: 11.20, y: r.y + 0.08, w: 3.60, h: 0.5,
      fontFace: FONT.body, fontSize: 19, color: COLOR.secondary,
      margin: 0, valign: "top",
    });
    s.addText(r.why, {
      x: 15.00, y: r.y + 0.08, w: 3.83, h: 1.0,
      fontFace: FONT.body, fontSize: 19, color: COLOR.secondary,
      margin: 0, valign: "top",
    });
    s.addShape(pres.shapes.LINE, {
      x: 1.25, y: r.y - 0.08, w: 17.58, h: 0,
      line: { color: COLOR.divider, width: 0.5 },
    });
  });
}

// ---------------------------------------------------------------------------
// SLIDE 8 — Strategy & trends
// ---------------------------------------------------------------------------
function slide08() {
  const s = pres.addSlide();
  s.background = { color: COLOR.paper };
  addChrome(s, "08 / STRATEGY & TRENDS", "08 / 10");

  addSlideTitle(s, "Strategy and market trends.");

  const trends = [
    { col: 0, row: 0, n: "TREND 01", glyph: "\u2192", glyphColor: COLOR.accent,
      title: "Moving downstream",
      body: "Shifting from pure trading into branded ingredients, specialty nutrition and animal protein." },
    { col: 1, row: 0, n: "TREND 02", glyph: "\u22EE\u22EE", glyphColor: COLOR.ink,
      title: "Digital origination",
      body: "Digitising the farm-gate \u2014 satellite yields, grower apps, real-time quality grading." },
    { col: 0, row: 1, n: "TREND 03", glyph: "\u221E", glyphColor: COLOR.accent,
      title: "Energy transition",
      body: "Renewable diesel, SAF and bio-feedstocks pull soy oil and tallow into the energy complex." },
    { col: 1, row: 1, n: "TREND 04", glyph: "\u2665", glyphColor: COLOR.ink,
      title: "Sustainability premium",
      body: "Deforestation-free, low-carbon and traceable grain commands pricing power." },
  ];

  const baseX = [1.68, 10.42];
  const baseY = [3.51, 6.93];
  const glyphX = [8.79, 17.67];

  // Light dividers above each trend row (both columns, both rows)
  [3.30, 6.72].forEach((yDiv) => {
    [0, 1].forEach((col) => {
      s.addShape(pres.shapes.LINE, {
        x: baseX[col], y: yDiv, w: 7.0, h: 0,
        line: { color: COLOR.divider, width: 0.5 },
      });
    });
  });

  trends.forEach((t) => {
    const x = baseX[t.col];
    const y = baseY[t.row];

    s.addText(t.n, {
      x: x, y: y, w: 1.2, h: 0.22,
      fontFace: FONT.body, fontSize: 10.5, color: COLOR.muted,
      charSpacing: 1.5, margin: 0,
    });
    s.addText(t.title, {
      x: x, y: y + 0.38, w: 8.14, h: 0.6,
      fontFace: FONT.head, fontSize: 34.5, color: COLOR.ink,
      margin: 0, valign: "top",
    });
    s.addText(t.body, {
      x: x, y: y + 1.04, w: 6.5, h: 1.35,
      fontFace: FONT.body, fontSize: 19.5, color: COLOR.secondary,
      margin: 0, valign: "top",
    });

    // Decorative glyph
    s.addText(t.glyph, {
      x: glyphX[t.col], y: y - 0.55, w: 1.2, h: 1,
      fontFace: FONT.head, fontSize: 44, color: t.glyphColor,
      align: "center", margin: 0, valign: "top",
    });
  });
}

// ---------------------------------------------------------------------------
// SLIDE 9 — Risks
// ---------------------------------------------------------------------------
function slide09() {
  const s = pres.addSlide();
  s.background = { color: COLOR.paper };
  addChrome(s, "09 / RISKS", "09 / 10");

  addSlideTitle(s, "Key risks to watch.");

  // Left side: giant "05." stat callout — 05 ink, period in accent
  s.addText("THE EXPOSURES STACK UP", {
    x: 1.25, y: 5.28, w: 8.58, h: 0.22,
    fontFace: FONT.body, fontSize: 10.5, color: COLOR.muted,
    charSpacing: 1.5, margin: 0,
  });
  s.addText(
    [
      { text: "05", options: { color: COLOR.ink } },
      { text: ".",  options: { color: COLOR.accent } },
    ],
    {
      x: 1.25, y: 5.58, w: 8.58, h: 2.85,
      fontFace: FONT.head, fontSize: 225, color: COLOR.ink,
      margin: 0, valign: "top",
    }
  );
  s.addText(
    "Five categories of risk dominate the P&L of every ABCD \u2014 and often compound each other.",
    {
      x: 1.25, y: 9.15, w: 6.01, h: 1.3,
      fontFace: FONT.body, fontSize: 22, color: COLOR.secondary,
      margin: 0, valign: "top",
    }
  );

  // Right side: 5 risk items (dark divider above first, light between others)
  const risks = [
    { n: "01", y: 3.76, title: "Weather & climate",           body: "Droughts, floods and shifting yield maps." },
    { n: "02", y: 5.12, title: "Geopolitics & trade policy",  body: "Export bans, tariffs, sanctions and shipping-lane risk." },
    { n: "03", y: 6.49, title: "Price & basis volatility",    body: "Flat-price swings and unhedged basis gaps." },
    { n: "04", y: 7.85, title: "Counterparty & credit",       body: "Washout, default, margin calls on large books." },
    { n: "05", y: 9.22, title: "ESG & regulatory scrutiny",   body: "Deforestation rules, labour, emissions disclosure." },
  ];
  // Dark divider above the first risk
  s.addShape(pres.shapes.LINE, {
    x: 10.42, y: 3.56, w: 8.58, h: 0,
    line: { color: COLOR.ink, width: 0.75 },
  });
  risks.forEach((r, i) => {
    s.addText(r.n, {
      x: 10.42, y: r.y + 0.08, w: 0.67, h: 0.4,
      fontFace: FONT.body, fontSize: 12, color: COLOR.muted,
      charSpacing: 1.2, margin: 0, valign: "top",
    });
    s.addText(r.title, {
      x: 11.25, y: r.y, w: 7.72, h: 0.5,
      fontFace: FONT.head, fontSize: 21, color: COLOR.ink,
      margin: 0, valign: "top",
    });
    s.addText(r.body, {
      x: 11.25, y: r.y + 0.48, w: 7.72, h: 0.5,
      fontFace: FONT.body, fontSize: 18, color: COLOR.muted,
      margin: 0, valign: "top",
    });
    // Light divider between rows
    if (i < risks.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: 10.42, y: risks[i + 1].y - 0.08, w: 8.58, h: 0,
        line: { color: COLOR.divider, width: 0.5 },
      });
    }
  });
}

// ---------------------------------------------------------------------------
// SLIDE 10 — Outlook
// ---------------------------------------------------------------------------
function slide10() {
  const s = pres.addSlide();
  s.background = { color: COLOR.paper };

  s.addText("10 / OUTLOOK", {
    x: MARGIN_X, y: EYEBROW_Y, w: CONTENT_W, h: 0.23,
    fontFace: FONT.body, fontSize: 12, color: COLOR.muted,
    charSpacing: 1.7, margin: 0,
  });

  addSlideTitle(s, "Future outlook.");

  // Middle column gets a darker-cream card background.
  // Card spans from the tag to below the signal line.
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.15, y: 3.05, w: 5.95, h: 6.10,
    fill: { color: COLOR.card },
    line: { type: "none" },
  });

  const cols = [
    {
      x: 1.25, y: 3.05, lineColor: COLOR.ink, tagColor: COLOR.muted,
      tag: "NEAR-TERM · 1\u20132 YRS",
      title: [{ text: "Consolidation", options: { color: COLOR.ink } }],
      body: "The Bunge\u2013Viterra combination redraws the top tier. Expect more M&A in processing and logistics assets.",
      signal: "SIGNAL: DEAL COUNT \u2191",
      signalColor: COLOR.muted,
    },
    {
      x: 7.47, y: 3.22, lineColor: COLOR.accent, tagColor: COLOR.accent,
      tag: "MEDIUM-TERM · 3\u20135 YRS",
      title: [
        { text: "Food ",  options: { color: COLOR.ink } },
        { text: "meets",  options: { italic: true, color: COLOR.accent } },
        { text: " fuel",  options: { color: COLOR.ink } },
      ],
      body: "Renewable diesel and SAF demand tighten vegetable-oil balances, pulling agri flows into the energy complex.",
      signal: "SIGNAL: SOY OIL BASIS",
      signalColor: COLOR.ink,
    },
    {
      x: 13.36, y: 3.05, lineColor: COLOR.ink, tagColor: COLOR.muted,
      tag: "LONG-TERM · 5\u201310 YRS",
      title: [{ text: "Traceable by default", options: { color: COLOR.ink } }],
      body: "Every bushel carries a digital passport. Low-carbon, deforestation-free grain becomes the benchmark, not the premium.",
      signal: "SIGNAL: REGULATION \u2191",
      signalColor: COLOR.muted,
    },
  ];

  cols.forEach((c) => {
    // Divider above the tag (ink for outer cols, accent for middle col)
    s.addShape(pres.shapes.LINE, {
      x: c.x, y: c.y - 0.10, w: 5.55, h: 0,
      line: { color: c.lineColor, width: 0.75 },
    });
    s.addText(c.tag, {
      x: c.x, y: c.y, w: 5.55, h: 0.21,
      fontFace: FONT.body, fontSize: 10.5, color: c.tagColor,
      charSpacing: 1.5, margin: 0,
    });
    s.addText(c.title, {
      x: c.x, y: c.y + 0.55, w: 5.55, h: 1.5,
      fontFace: FONT.head, fontSize: 38, color: COLOR.ink,
      margin: 0, valign: "top",
    });
    s.addText(c.body, {
      x: c.x, y: c.y + 2.25, w: 5.55, h: 2.0,
      fontFace: FONT.body, fontSize: 21, color: COLOR.secondary,
      margin: 0, valign: "top",
    });
    s.addText(c.signal, {
      x: c.x, y: 8.69, w: 5.55, h: 0.42,
      fontFace: FONT.body, fontSize: 18, color: c.signalColor,
      charSpacing: 1.5, margin: 0,
    });
  });

  // Dark divider above the closing italic
  s.addShape(pres.shapes.LINE, {
    x: 1.25, y: 9.70, w: 17.58, h: 0,
    line: { color: COLOR.ink, width: 0.75 },
  });

  s.addText(
    "The ABCDs will still move the world\u2019s food \u2014 just with more scrutiny, more data, and more competition.",
    {
      x: 1.25, y: 9.84, w: 14.09, h: 0.53,
      fontFace: FONT.head, fontSize: 27, color: COLOR.ink,
      italic: true, margin: 0, valign: "top",
    }
  );

  s.addText("END · 10 / 10", {
    x: 16.85, y: 9.95, w: 1.99, h: 0.42,
    fontFace: FONT.body, fontSize: 18, color: COLOR.muted,
    align: "right", charSpacing: 1.5, margin: 0,
  });
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------
slide01();
slide02();
slide03();
slide04();
slide05();
slide06();
slide07();
slide08();
slide09();
slide10();

pres
  .writeFile({ fileName: "Agri_Traders_ABCD_replica.pptx" })
  .then((file) => console.log("Wrote:", file));
