/**
 * every-piece-matters.js
 *
 * Recreates "every-piece-matters.pptx" using pptxgenjs.
 *
 * Usage:
 *   npm install pptxgenjs
 *   node every-piece-matters.js
 *
 * Outputs: every-piece-matters.pptx
 */

const PptxGenJS = require("pptxgenjs");

// ---------------------------------------------------------------------------
// Design tokens
// ---------------------------------------------------------------------------
const C = {
  // Light theme (cream background)
  bgCream:        "F5EDE1",
  textDark:       "2B1B10",
  textMuted:      "5A3F2B",
  accentOrange:   "B8693D",   // primary accent on cream
  cardFill:       "E3D4B8",   // muted cream card
  cardFill2:      "EDE2D1",   // slightly lighter card (testimonials)
  cardBorder:     "C9B89A",   // divider / card border
  dotMuted:       "C9B89A",

  // Dark theme (slides 3 and 9)
  bgDark:         "2B1B10",
  darkCardFill:   "3A2A1C",
  darkCardBorder: "4A3423",
  darkMuted:      "B89F7F",   // muted label text on dark bg
  darkAccent:     "E3A06D",   // brighter accent on dark bg
  darkBody:       "D9C7AD",   // readable body text on dark bg
  darkCream:      "F5EDE1",   // headline text on dark bg
};

const F = {
  head:  "Georgia",       // headlines
  label: "Courier New",   // labels, pill chrome
  body:  "Arial",         // body copy
};

// Slide dimensions (matches the source: 20" x 11.25")
const SLIDE_W = 20;
const SLIDE_H = 11.25;

// ---------------------------------------------------------------------------
// Presentation setup
// ---------------------------------------------------------------------------
const pres = new PptxGenJS();
pres.defineLayout({ name: "BAKERY_20x11_25", width: SLIDE_W, height: SLIDE_H });
pres.layout = "BAKERY_20x11_25";
pres.title  = "Every Piece Matters";
pres.author = "The Founder";

// ---------------------------------------------------------------------------
// Shared chrome (header dot + wordmark, page counter, footer tagline, wordmark)
// ---------------------------------------------------------------------------
function addChrome(slide, opts) {
  const {
    pageCounter,     // e.g. "01 / 10 · CONFIDENTIAL"
    footerTagline,   // e.g. "EST. 2024 · SAN FRANCISCO, CA"
    footerRight = "EVERY PIECE MATTERS",
    dark = false,
  } = opts;

  const labelColor = dark ? C.darkMuted : C.textMuted;

  // --- Top-left: accent dot + wordmark ----------------------------------
  slide.addShape(pres.shapes.OVAL, {
    x: 0.8333, y: 0.6536, w: 0.0833, h: 0.0833,
    fill: { color: C.accentOrange },
    line: { type: "none" },
  });
  slide.addText("EVERY PIECE MATTERS", {
    x: 1.0208, y: 0.5833, w: 2.4267, h: 0.2656,
    fontFace: F.label, fontSize: 12, charSpacing: 1.68,
    color: labelColor, align: "left", margin: 2,
  });

  // --- Top-right: page counter ------------------------------------------
  // Measured width for Courier 12pt: ~0.126" per char + small padding.
  const counterW = Math.max(2.0, pageCounter.length * 0.126 + 0.4);
  slide.addText(pageCounter, {
    x: SLIDE_W - 0.8333 - counterW, y: 0.5833, w: counterW, h: 0.2656,
    fontFace: F.label, fontSize: 12, charSpacing: 1.68,
    color: labelColor, align: "left", margin: 2,
  });

  // --- Bottom-left: footer tagline --------------------------------------
  if (footerTagline) {
    const taglineW = Math.max(2.5, footerTagline.length * 0.126 + 0.5);
    slide.addText(footerTagline, {
      x: 0.8333, y: 10.4427, w: taglineW, h: 0.2656,
      fontFace: F.label, fontSize: 12, charSpacing: 1.68,
      color: labelColor, align: "left", margin: 2,
    });
  }

  // --- Bottom-right: wordmark -------------------------------------------
  const rightW = Math.max(2.4, footerRight.length * 0.126 + 0.4);
  slide.addText(footerRight, {
    x: SLIDE_W - 0.8333 - rightW, y: 10.4427, w: rightW, h: 0.2656,
    fontFace: F.label, fontSize: 12, charSpacing: 1.68,
    color: labelColor, align: "left", margin: 2,
  });
}

// Kicker: small orange all-caps courier label above a headline
function addKicker(slide, text, x, y, w, color) {
  slide.addText(text, {
    x, y, w, h: 0.2344,
    fontFace: F.label, fontSize: 10.5, charSpacing: 2.31,
    color: color || C.accentOrange, align: "left", margin: 2,
  });
}

// Thin horizontal rule
function addRule(slide, x, y, w, color) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: 0.0104,
    fill: { color: color || C.cardBorder },
    line: { type: "none" },
  });
}

// ---------------------------------------------------------------------------
// SLIDE 1 — Title
// ---------------------------------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgCream };

  // Top-left wordmark (left-aligned)
  slide.addShape(pres.shapes.OVAL, {
    x: 0.8333, y: 0.6536, w: 0.0833, h: 0.0833,
    fill: { color: C.accentOrange }, line: { type: "none" },
  });
  slide.addText("EVERY PIECE MATTERS", {
    x: 1.0208, y: 0.5833, w: 2.4267, h: 0.2656,
    fontFace: F.label, fontSize: 12, charSpacing: 1.68,
    color: C.textMuted, align: "left", margin: 2,
  });

  // Top-right: SAN FRANCISCO · EST. 2024 (right-aligned to 0.8333" from edge)
  slide.addText("SAN FRANCISCO · EST. 2024", {
    x: SLIDE_W - 0.8333 - 3.7, y: 0.5833, w: 3.7, h: 0.2656,
    fontFace: F.label, fontSize: 12, charSpacing: 1.68,
    color: C.textMuted, align: "right", margin: 2,
  });

  // Kicker
  slide.addText("A SMALL BAKERY · A BIG IDEA", {
    x: 0.8333, y: 1.1811, w: 18.33, h: 0.32,
    fontFace: F.label, fontSize: 15, charSpacing: 3.3,
    color: C.accentOrange, align: "left", margin: 2,
  });

  // Big headline: "Every Piece Matters." with "Piece" in accent
  slide.addText([
    { text: "Every ",   options: { color: C.textDark,     fontFace: F.head, fontSize: 210, charSpacing: -4.2 } },
    { text: "Piece ",   options: { color: C.accentOrange, fontFace: F.head, fontSize: 210, charSpacing: -4.2 } },
    { text: "Matters.", options: { color: C.textDark,     fontFace: F.head, fontSize: 210, charSpacing: -4.2 } },
  ], {
    x: 0.8333, y: 1.75, w: 18.45, h: 7.1,
    align: "left", valign: "top",
    lineSpacingMultiple: 0.88, margin: 2,
  });

  // Subtitle with small accent dot
  slide.addShape(pres.shapes.OVAL, {
    x: 0.8333, y: 9.52, w: 0.1333, h: 0.1333,
    fill: { color: C.accentOrange }, line: { type: "none" },
  });
  slide.addText("An introduction for partners and friends of the bakery.", {
    x: 1.05, y: 9.33, w: 12, h: 0.5,
    fontFace: F.body, fontSize: 19.5,
    color: C.textDark, align: "left", valign: "middle", margin: 2,
  });
  slide.addText("Prepared by the founder · April 2026", {
    x: 0.8333, y: 9.72, w: 8, h: 0.35,
    fontFace: F.body, fontSize: 15,
    color: C.textMuted, align: "left", margin: 2,
  });

  // Bottom-right page counter
  slide.addText("01 / 10 · CONFIDENTIAL", {
    x: SLIDE_W - 0.8333 - 3.25, y: 9.74, w: 3.25, h: 0.2656,
    fontFace: F.label, fontSize: 12, charSpacing: 1.68,
    color: C.textMuted, align: "right", margin: 2,
  });
}

// ---------------------------------------------------------------------------
// SLIDE 2 — A letter from the baker
// ---------------------------------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgCream };

  addChrome(slide, {
    pageCounter: "02 / 10 · A LETTER",
    footerTagline: "EST. 2024 · SAN FRANCISCO, CA",
  });

  addKicker(slide, "A LETTER FROM THE BAKER", 0.8333, 1.25, 9);

  // Big headline, left column
  slide.addText([
    { text: "Two years ago, we opened on a ", options: { color: C.textDark,     fontFace: F.head, fontSize: 72, charSpacing: -1.44 } },
    { text: "quiet corner.",                  options: { color: C.accentOrange, fontFace: F.head, fontSize: 72, charSpacing: -1.44 } },
  ], {
    x: 0.8333, y: 1.776, w: 8.9, h: 3.9,
    align: "left", valign: "top",
    lineSpacingMultiple: 1.05, margin: 2,
  });

  // Left-column image placeholder block
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8333, y: 6.4583, w: 8.6458, h: 3.5417,
    fill: { color: C.cardFill },
    line: { color: C.cardBorder, width: 0.75 },
  });

  // Right-column body paragraphs
  slide.addText(
    "The shop is small. We bake each morning before the sun clears the rooftops, and most days we sell out by two.",
    { x: 10.52, y: 3.47, w: 8.65, h: 0.95, fontFace: F.body, fontSize: 19.5,
      color: C.textDark, align: "left", margin: 2 }
  );
  slide.addText(
    "What started as one recipe — a croissant laminated with dark chocolate and folded around wild blueberry jam — has grown into a quiet, loyal neighborhood business.",
    { x: 10.52, y: 4.64, w: 8.65, h: 1.4, fontFace: F.body, fontSize: 19.5,
      color: C.textDark, align: "left", margin: 2 }
  );
  slide.addText(
    "We've been approached about what could come next. This is the short version of who we are.",
    { x: 10.52, y: 6.23, w: 8.65, h: 0.95, fontFace: F.body, fontSize: 19.5,
      color: C.textDark, align: "left", margin: 2 }
  );

  // Signature
  slide.addText("— The Founder", {
    x: 10.52, y: 7.74, w: 8.65, h: 0.6,
    fontFace: F.head, fontSize: 27, italic: true,
    color: C.textMuted, align: "left", margin: 2,
  });
}

// ---------------------------------------------------------------------------
// SLIDE 3 — The signature (dark)
// ---------------------------------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgDark };

  addChrome(slide, {
    pageCounter: "03 / 10 · THE SIGNATURE",
    footerTagline: "A RECIPE OF OUR OWN",
    dark: true,
  });

  addKicker(slide, "THE ONE EVERYONE COMES BACK FOR", 0.8333, 2.9126, 10, C.darkAccent);

  // Headline — sized to wrap to 3 lines within the 9.44" column above stats
  slide.addText("The Coated Chocolate & Blueberry Croissant.", {
    x: 0.8333, y: 3.0, w: 9.4417, h: 3.6,
    fontFace: F.head, fontSize: 60, charSpacing: -1.2,
    color: C.darkCream, align: "left", valign: "top",
    lineSpacingMultiple: 1.05, margin: 2,
  });

  // Divider under headline
  addRule(slide, 0.8333, 6.85, 9.1667, C.darkCardBorder);

  // Three stats: LAYERS 81, PROOF 18h, SHARE 62%
  const stats = [
    { x: 0.8333, label: "LAYERS", value: "81",   unit: null, sub: "folds of butter & dough" },
    { x: 4.0,    label: "PROOF",  value: "18",   unit: "h",  sub: "cold ferment, overnight" },
    { x: 7.1667, label: "SHARE",  value: "62",   unit: "%",  sub: "of daily revenue" },
  ];
  stats.forEach((s) => {
    addKicker(slide, s.label, s.x, 7.2156, 2.9183, C.darkAccent);

    const runs = [
      { text: s.value, options: { color: C.darkCream, fontFace: F.head, fontSize: 42, charSpacing: -0.84 } },
    ];
    if (s.unit) {
      runs.push({ text: s.unit, options: { color: C.darkCream, fontFace: F.head, fontSize: 21, charSpacing: -0.84 } });
    }
    slide.addText(runs, {
      x: s.x, y: 7.4916, w: 2.9183, h: 0.6,
      align: "left", valign: "top", margin: 2,
    });

    slide.addText(s.sub, {
      x: s.x, y: 8.0874, w: 2.9183, h: 0.3,
      fontFace: F.body, fontSize: 12,
      color: C.darkMuted, align: "left", margin: 2,
    });
  });

  // Right side: image-placeholder cards
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 10.8333, y: 1.3333, w: 8.3333, h: 6.4583,
    fill: { color: C.darkCardFill }, line: { color: C.darkCardBorder, width: 0.75 },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 10.8333, y: 8.0417, w: 4.0417, h: 1.875,
    fill: { color: C.darkCardFill }, line: { color: C.darkCardBorder, width: 0.75 },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 15.125, y: 8.0417, w: 4.0417, h: 1.875,
    fill: { color: C.darkCardFill }, line: { color: C.darkCardBorder, width: 0.75 },
  });
}

// ---------------------------------------------------------------------------
// SLIDE 4 — The menu
// ---------------------------------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgCream };

  addChrome(slide, {
    pageCounter: "04 / 10 · THE MENU",
    footerTagline: "BAKED FRESH · SOLD SAME DAY",
  });

  addKicker(slide, "WHAT WE MAKE", 0.8333, 1.25, 7);

  // Headline
  slide.addText([
    { text: "A short menu, baked ", options: { color: C.textDark,     fontFace: F.head, fontSize: 81, charSpacing: -1.62 } },
    { text: "daily.",               options: { color: C.accentOrange, fontFace: F.head, fontSize: 81, charSpacing: -1.62 } },
  ], {
    x: 0.8333, y: 1.6094, w: 13, h: 2.2,
    align: "left", valign: "top", margin: 2,
  });

  // Right-column subhead
  slide.addText(
    "We keep the menu tight on purpose. Every item earns its place on the shelf — and every piece is baked the day it's sold.",
    {
      x: 15.459, y: 2.4967, w: 3.8189, h: 1.4,
      fontFace: F.body, fontSize: 15,
      color: C.textMuted, align: "left", margin: 2,
    }
  );

  // Horizontal rule
  addRule(slide, 0.8333, 4.4134, 18.3333);

  // Four menu item cards
  const items = [
    { x: 0.8333,  title: "Signature Croissant", price: "$7",   desc: "Chocolate coat, wild blueberry jam core." },
    { x: 5.5208,  title: "Plain Croissant",     price: "$4.5", desc: "Cultured butter, 81 laminated layers." },
    { x: 10.2083, title: "Country Loaf",        price: "$9",   desc: "Long-ferment sourdough, miche style." },
    { x: 14.8958, title: "Seasonal Galette",    price: "$6",   desc: "Rotates weekly with local fruit." },
  ];
  items.forEach((it) => {
    // Image placeholder
    slide.addShape(pres.shapes.RECTANGLE, {
      x: it.x, y: 5.0072, w: 4.2708, h: 2.9167,
      fill: { color: C.cardFill }, line: { color: C.cardBorder, width: 0.75 },
    });
    // Title (wide enough for "Signature Croissant" to fit one line)
    slide.addText(it.title, {
      x: it.x, y: 8.1322, w: 3.65, h: 0.4,
      fontFace: F.head, fontSize: 22, charSpacing: -0.44,
      color: C.textDark, align: "left", margin: 2,
    });
    // Price (right-aligned at right edge of the card)
    slide.addText(it.price, {
      x: it.x + 3.65, y: 8.18, w: 0.62, h: 0.3,
      fontFace: F.label, fontSize: 10.5, charSpacing: 2.31,
      color: C.textDark, align: "right", valign: "middle", margin: 2,
    });
    // Description
    slide.addText(it.desc, {
      x: it.x, y: 8.60, w: 4.27, h: 0.35,
      fontFace: F.body, fontSize: 12,
      color: C.textMuted, align: "left", margin: 2,
    });
  });

  // ALSO ON THE SHELF row
  addKicker(slide, "ALSO ON THE SHELF", 0.8333, 9.45, 4.4);
  // Secondary items separated by middle dots
  const alsoItems = ["Morning bun", "Kouign-amann", "Canelé", "Drip coffee", "House granola"];
  const alsoRuns = [];
  alsoItems.forEach((txt, i) => {
    if (i > 0) {
      alsoRuns.push({ text: "  ·  ", options: { color: C.dotMuted, fontFace: F.body, fontSize: 21 } });
    }
    alsoRuns.push({ text: txt, options: { color: C.textDark, fontFace: F.head, fontSize: 21, charSpacing: -0.42 } });
  });
  slide.addText(alsoRuns, {
    x: 5.5208, y: 9.3655, w: 13.5, h: 0.5,
    align: "left", valign: "middle", margin: 2,
  });
}

// ---------------------------------------------------------------------------
// SLIDE 5 — By the numbers
// ---------------------------------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgCream };

  addChrome(slide, {
    pageCounter: "05 / 10 · BY THE NUMBERS",
    footerTagline: "SMALL BY DESIGN · PROFITABLE BY DISCIPLINE",
  });

  addKicker(slide, "WHERE WE STAND TODAY", 0.8333, 1.25, 10);

  // Headline
  slide.addText([
    { text: "A small shop with ", options: { color: C.textDark,     fontFace: F.head, fontSize: 81, charSpacing: -1.62 } },
    { text: "steady ",            options: { color: C.accentOrange, fontFace: F.head, fontSize: 81, charSpacing: -1.62 } },
    { text: "rhythm.",            options: { color: C.textDark,     fontFace: F.head, fontSize: 81, charSpacing: -1.62 } },
  ], {
    x: 0.8333, y: 1.6094, w: 15, h: 2.2,
    align: "left", valign: "top", margin: 2,
  });

  // Divider
  addRule(slide, 0.8333, 4.5801, 18.3333);

  // Four big stats
  const bigStats = [
    { x: 0.8333,  value: "$40", unit: "k",   label: "MONTHLY REVENUE",     sub: "Steady through the past four quarters." },
    { x: 5.5417,  value: "2",   unit: "yrs", label: "IN OPERATION",        sub: "Opened quietly, grew by word of mouth." },
    { x: 10.25,   value: "3",   unit: null,  label: "PEOPLE ON THE TEAM",  sub: "Owner-baker plus two trained hands." },
    { x: 14.9583, value: "62",  unit: "%",   label: "FROM THE SIGNATURE",  sub: "One product carries the day." },
  ];
  bigStats.forEach((s) => {
    const runs = [
      { text: s.value, options: { color: C.textDark, fontFace: F.head, fontSize: 135, charSpacing: -5.4 } },
    ];
    if (s.unit) {
      runs.push({ text: s.unit, options: { color: C.textDark, fontFace: F.head, fontSize: 60, charSpacing: -5.4 } });
    }
    slide.addText(runs, {
      x: s.x, y: 5.34, w: 4.33, h: 1.73,
      align: "left", valign: "bottom", margin: 2,
    });

    slide.addText(s.label, {
      x: s.x, y: 7.153, w: 4.33, h: 0.25,
      fontFace: F.label, fontSize: 11.25, charSpacing: 2.03,
      color: C.textMuted, align: "left", margin: 2,
    });
    slide.addText(s.sub, {
      x: s.x, y: 7.4551, w: 4.33, h: 0.35,
      fontFace: F.body, fontSize: 12,
      color: C.textMuted, align: "left", margin: 2,
    });
  });

  // Footnote + disclaimer
  slide.addText(
    "Margins are tight but positive. We reinvest most of what we earn into flour, butter, and the people who show up at 4am.",
    { x: 0.8333, y: 8.7051, w: 9, h: 0.75, fontFace: F.body, fontSize: 13.5,
      color: C.textMuted, align: "left", margin: 2 }
  );
  slide.addText("— ILLUSTRATIVE FIGURES, TRAILING 12 MONTHS", {
    x: 12.5, y: 9.075, w: 6.667, h: 0.3,
    fontFace: F.label, fontSize: 10.5, charSpacing: 2.31,
    color: C.accentOrange, align: "right", margin: 2,
  });
}

// ---------------------------------------------------------------------------
// SLIDE 6 — The people
// ---------------------------------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgCream };

  addChrome(slide, {
    pageCounter: "06 / 10 · THE PEOPLE",
    footerTagline: "BUILT ON REGULARS, NOT HYPE",
  });

  addKicker(slide, "THE PEOPLE WE FEED", 0.8333, 1.25, 9);

  // Headline (slightly smaller, three-line)
  slide.addText([
    { text: "A line around the ",  options: { color: C.textDark,     fontFace: F.head, fontSize: 69, charSpacing: -1.38 } },
    { text: "corner",              options: { color: C.accentOrange, fontFace: F.head, fontSize: 69, charSpacing: -1.38 } },
    { text: ", most Saturdays.",   options: { color: C.textDark,     fontFace: F.head, fontSize: 69, charSpacing: -1.38 } },
  ], {
    x: 0.8333, y: 1.6094, w: 9, h: 3.9,
    align: "left", valign: "top",
    lineSpacingMultiple: 1.05, margin: 2,
  });

  // Two stats at the bottom of left column
  slide.addText([
    { text: "~1,800", options: { color: C.textDark, fontFace: F.head, fontSize: 54, charSpacing: -1.08 } },
  ], {
    x: 0.8333, y: 8.85, w: 3.88, h: 0.9,
    align: "left", valign: "top", margin: 2,
  });
  slide.addText("CROISSANTS / MONTH", {
    x: 0.8333, y: 9.85, w: 3.88, h: 0.25,
    fontFace: F.label, fontSize: 10.5, charSpacing: 2.31,
    color: C.accentOrange, align: "left", margin: 2,
  });

  slide.addText([
    { text: "73", options: { color: C.textDark, fontFace: F.head, fontSize: 54, charSpacing: -1.08 } },
    { text: "%",  options: { color: C.textDark, fontFace: F.head, fontSize: 27, charSpacing: -1.08 } },
  ], {
    x: 4.93, y: 8.85, w: 3.88, h: 0.9,
    align: "left", valign: "top", margin: 2,
  });
  slide.addText("REPEAT CUSTOMERS", {
    x: 4.93, y: 9.85, w: 3.88, h: 0.25,
    fontFace: F.label, fontSize: 10.5, charSpacing: 2.31,
    color: C.accentOrange, align: "left", margin: 2,
  });

  // Right column: two pull-quote cards
  // Card 1
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 9.7348, y: 1.25, w: 9.4318, h: 2.9,
    fill: { color: C.cardFill2 }, line: { color: C.cardBorder, width: 0.75 },
  });
  slide.addText(
    "\u201CI drive thirty minutes across the bridge for these. It's the only pastry my daughter asks for by name.\u201D",
    {
      x: 10.33, y: 1.55, w: 8.49, h: 1.9,
      fontFace: F.head, fontSize: 26, charSpacing: -0.52, italic: true,
      color: C.textDark, align: "left", valign: "top",
      lineSpacingMultiple: 1.15, margin: 2,
    }
  );
  slide.addText("— REGULAR SINCE MONTH THREE", {
    x: 10.33, y: 3.78, w: 8.49, h: 0.25,
    fontFace: F.label, fontSize: 10.5, charSpacing: 2.31,
    color: C.accentOrange, align: "left", margin: 2,
  });

  // Card 2
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 9.7348, y: 4.35, w: 9.4318, h: 2.9,
    fill: { color: C.cardFill2 }, line: { color: C.cardBorder, width: 0.75 },
  });
  slide.addText(
    "\u201CThe chocolate-blueberry is one of the best things I've eaten in the city this year. Quiet masterpiece.\u201D",
    {
      x: 10.33, y: 4.65, w: 8.49, h: 1.9,
      fontFace: F.head, fontSize: 26, charSpacing: -0.52, italic: true,
      color: C.textDark, align: "left", valign: "top",
      lineSpacingMultiple: 1.15, margin: 2,
    }
  );
  slide.addText("— NEIGHBORHOOD FOOD WRITER", {
    x: 10.33, y: 6.88, w: 8.49, h: 0.25,
    fontFace: F.label, fontSize: 10.5, charSpacing: 2.31,
    color: C.accentOrange, align: "left", margin: 2,
  });

  // Rating line below the cards
  slide.addText([
    { text: "★ 4.9 ", options: { color: C.accentOrange, fontFace: F.label, fontSize: 10.5 } },
    { text: "across 320+ reviews · Featured in three local publications.",
      options: { color: C.textMuted, fontFace: F.body, fontSize: 13.5 } },
  ], {
    x: 9.7348, y: 7.5, w: 9.4, h: 0.4,
    align: "left", valign: "middle", margin: 2,
  });
}

// ---------------------------------------------------------------------------
// SLIDE 7 — Why it works
// ---------------------------------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgCream };

  addChrome(slide, {
    pageCounter: "07 / 10 · WHY IT WORKS",
    footerTagline: "DEFENSIBLE, ONE SLOW MORNING AT A TIME",
  });

  addKicker(slide, "WHAT MAKES THIS HOLD TOGETHER", 0.8333, 1.25, 7);

  // Headline
  slide.addText([
    { text: "Four quiet ",  options: { color: C.textDark,     fontFace: F.head, fontSize: 81, charSpacing: -1.62 } },
    { text: "advantages.",  options: { color: C.accentOrange, fontFace: F.head, fontSize: 81, charSpacing: -1.62 } },
  ], {
    x: 0.8333, y: 1.6094, w: 14, h: 2.2,
    align: "left", valign: "top", margin: 2,
  });

  // Subhead (right column)
  slide.addText(
    "None of these are loud. Together they make the shop difficult to copy.",
    {
      x: 15.459, y: 3.12, w: 3.82, h: 0.8,
      fontFace: F.body, fontSize: 15,
      color: C.textMuted, align: "left", margin: 2,
    }
  );

  // Divider
  addRule(slide, 0.8333, 4.4967, 18.3333);

  // Four cards
  const cards = [
    { x: 0.8333,  n: "01", title: "A recipe of our own.", body: "The chocolate-coating-plus-jam-core technique was developed in our kitchen. Nobody else on this coast makes it quite the same." },
    { x: 5.5625,  n: "02", title: "Sells out by two.",    body: "Demand comfortably exceeds what three people can bake out of one oven. The ceiling is capacity, not customers." },
    { x: 10.2917, n: "03", title: "Low overhead.",        body: "A corner lease, a lean team, no delivery apps, no marketing spend. The business runs itself on mornings and word-of-mouth." },
    { x: 15.0208, n: "04", title: "A real brand.",        body: "Two years in, the bakery has a name, a voice, and a small cult following — assets that take far longer to build than a kitchen." },
  ];
  cards.forEach((c) => {
    slide.addText(c.n, {
      x: c.x, y: 5.2572, w: 4.27, h: 0.95,
      fontFace: F.head, fontSize: 66, charSpacing: -1.32,
      color: C.accentOrange, align: "left", valign: "top", margin: 2,
    });
    slide.addText(c.title, {
      x: c.x, y: 6.2946, w: 4.27, h: 0.45,
      fontFace: F.head, fontSize: 27, charSpacing: -0.54,
      color: C.textDark, align: "left", margin: 2,
    });
    slide.addText(c.body, {
      x: c.x, y: 6.8175, w: 4.27, h: 1.2,
      fontFace: F.body, fontSize: 13.5,
      color: C.textMuted, align: "left", valign: "top", margin: 2,
    });
  });
}

// ---------------------------------------------------------------------------
// SLIDE 8 — What's next
// ---------------------------------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgCream };

  addChrome(slide, {
    pageCounter: "08 / 10 · WHAT'S NEXT",
    footerTagline: "GROWTH WITHOUT LOSING THE THREAD",
  });

  addKicker(slide, "WHERE THIS COULD GO", 0.8333, 1.25, 9);

  // Headline
  slide.addText([
    { text: "Room to grow, ", options: { color: C.textDark,     fontFace: F.head, fontSize: 78, charSpacing: -1.56 } },
    { text: "carefully.",     options: { color: C.accentOrange, fontFace: F.head, fontSize: 78, charSpacing: -1.56 } },
  ], {
    x: 0.8333, y: 1.6094, w: 13, h: 2.2,
    align: "left", valign: "top", margin: 2,
  });

  // Left-column intro
  slide.addText(
    "The shop is at capacity on its current footprint. With the right partner, there are three directions worth exploring — each independent of the others.",
    {
      x: 0.8333, y: 4.0843, w: 7.88, h: 1.0,
      fontFace: F.body, fontSize: 16.5,
      color: C.textMuted, align: "left", margin: 2,
    }
  );

  // Left-column image card
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8333, y: 7.0833, w: 8.6458, h: 2.9167,
    fill: { color: C.cardFill }, line: { color: C.cardBorder, width: 0.75 },
  });

  // Right-column: three paths, stacked, with dividers above each
  const paths = [
    { y: 3.95, title: "A second kitchen.",     body: "A production-only space to triple output and supply a second pickup window across town.", n: "PATH 01" },
    { y: 5.85, title: "Wholesale, selectively.", body: "Five to ten hand-picked cafés and hotels in the city. High margin, low coordination cost.", n: "PATH 02" },
    { y: 7.75, title: "The signature, frozen.",  body: "Par-baked, flash-frozen croissants shipped direct. The recipe travels; the morning ritual doesn't.", n: "PATH 03" },
  ];
  paths.forEach((p) => {
    // Top rule
    addRule(slide, 10.5208, p.y, 8.6458);
    // Kicker
    addKicker(slide, p.n, 10.5208, p.y + 0.344, 4);
    // Title
    slide.addText(p.title, {
      x: 10.5208, y: p.y + 0.62, w: 8.9, h: 0.55,
      fontFace: F.head, fontSize: 33, charSpacing: -0.66,
      color: C.textDark, align: "left", margin: 2,
    });
    // Body
    slide.addText(p.body, {
      x: 10.5208, y: p.y + 1.18, w: 6.44, h: 0.75,
      fontFace: F.body, fontSize: 13.5,
      color: C.textMuted, align: "left", valign: "top", margin: 2,
    });
  });
}

// ---------------------------------------------------------------------------
// SLIDE 9 — The opportunity (dark)
// ---------------------------------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgDark };

  addChrome(slide, {
    pageCounter: "09 / 10 · THE OPPORTUNITY",
    footerTagline: "OPEN TO THE RIGHT FIT",
    dark: true,
  });

  addKicker(slide, "WHAT WE'RE OPEN TO", 0.8333, 1.25, 10, C.darkAccent);

  // Headline
  slide.addText([
    { text: "Two conversations, one ", options: { color: C.darkCream,  fontFace: F.head, fontSize: 96, charSpacing: -1.92 } },
    { text: "table.",                  options: { color: C.darkAccent, fontFace: F.head, fontSize: 96, charSpacing: -1.92 } },
  ], {
    x: 0.8333, y: 1.6094, w: 19, h: 3.0,
    align: "left", valign: "top", margin: 2,
  });

  // Divider
  addRule(slide, 0.8333, 4.8926, 18.3333, C.darkCardBorder);

  // Two columns: OPTION A and OPTION B
  const options = [
    {
      x: 0.8333, label: "OPTION A · PARTNERSHIP",
      title: "Grow it together.",
      body: "Capital plus operational expertise in exchange for equity. Founder stays on, recipes stay in the family, and the shop expands deliberately.",
      bullets: [
        "Minority or majority equity, negotiable.",
        "3–5 year growth runway.",
        "Founder continues as head baker.",
      ],
    },
    {
      x: 10.4167, label: "OPTION B · ACQUISITION",
      title: "Take the helm.",
      body: "A full transfer — brand, recipes, lease, and the people who know how the ovens run. A generous handover period included.",
      bullets: [
        "100% sale, assets and goodwill.",
        "6-month founder handover.",
        "Valuation on request, under NDA.",
      ],
    },
  ];
  options.forEach((o) => {
    addKicker(slide, o.label, o.x, 5.653, 9.01, C.darkAccent);
    slide.addText(o.title, {
      x: o.x, y: 6.0124, w: 9.01, h: 0.7,
      fontFace: F.head, fontSize: 42, charSpacing: -0.84,
      color: C.darkCream, align: "left", margin: 2,
    });
    slide.addText(o.body, {
      x: o.x, y: 6.8165, w: 7.16, h: 0.85,
      fontFace: F.body, fontSize: 15,
      color: C.darkBody, align: "left", valign: "top", margin: 2,
    });
    // Bullets with → arrows in accent color
    o.bullets.forEach((b, i) => {
      const by = 7.8582 + i * 0.4479;
      slide.addText("→", {
        x: o.x, y: by, w: 0.3, h: 0.32,
        fontFace: F.label, fontSize: 12,
        color: C.darkAccent, align: "left", margin: 2,
      });
      slide.addText(b, {
        x: o.x + 0.28, y: by, w: 6.5, h: 0.32,
        fontFace: F.body, fontSize: 13.5,
        color: C.darkBody, align: "left", valign: "top", margin: 2,
      });
    });
  });
}

// ---------------------------------------------------------------------------
// SLIDE 10 — Contact / thank you
// ---------------------------------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgCream };

  addChrome(slide, {
    pageCounter: "10 / 10 · CONTACT",
    footerTagline: "THANK YOU FOR READING",
    footerRight: "EVERY PIECE MATTERS · APRIL 2026",
  });

  addKicker(slide, "ONE LAST THING", 0.8333, 1.25, 10);

  // Massive headline — "Come by before noon." with "before" in accent
  slide.addText([
    { text: "Come by ", options: { color: C.textDark,     fontFace: F.head, fontSize: 140, charSpacing: -2.8 } },
    { text: "before ",  options: { color: C.accentOrange, fontFace: F.head, fontSize: 140, charSpacing: -2.8 } },
    { text: "noon.",    options: { color: C.textDark,     fontFace: F.head, fontSize: 140, charSpacing: -2.8 } },
  ], {
    x: 0.8333, y: 1.8, w: 18.88, h: 4.5,
    align: "left", valign: "top",
    lineSpacingMultiple: 1.0, margin: 2,
  });

  // Supporting copy
  slide.addText(
    "The best way to understand a bakery is to stand in it. We'd love to meet you over a cortado and a croissant, while the kitchen is still warm.",
    {
      x: 0.8333, y: 6.7135, w: 12, h: 1.2,
      fontFace: F.body, fontSize: 18,
      color: C.textMuted, align: "left", valign: "top", margin: 2,
    }
  );

  // Divider above contact grid
  addRule(slide, 0.8333, 8.4906, 18.3333);

  // Three-column contact grid
  const cols = [
    { x: 0.8333, label: "THE SHOP", big: "Every Piece Matters",    sub: "A corner in San Francisco, CA" },
    { x: 7.1667, label: "HOURS",    big: "Wed – Sun, 7am – 2pm",   sub: "Until we're sold out." },
    { x: 13.5,   label: "TO TALK",  big: "hello@everypiece.co",    sub: "Happy to share more under NDA." },
  ];
  cols.forEach((col) => {
    addKicker(slide, col.label, col.x, 9.0011, 5.84);
    slide.addText(col.big, {
      x: col.x, y: 9.3188, w: 5.84, h: 0.4,
      fontFace: F.head, fontSize: 24, charSpacing: -0.48,
      color: C.textDark, align: "left", margin: 2,
    });
    slide.addText(col.sub, {
      x: col.x, y: 9.7188, w: 5.84, h: 0.35,
      fontFace: F.body, fontSize: 13.5,
      color: C.textMuted, align: "left", margin: 2,
    });
  });
}

// ---------------------------------------------------------------------------
// Write the file
// ---------------------------------------------------------------------------
pres.writeFile({ fileName: "every-piece-matters.pptx" })
  .then((fileName) => {
    console.log(`Saved: ${fileName}`);
  })
  .catch((err) => {
    console.error("Error writing pptx:", err);
    process.exit(1);
  });
