/**
 * Vermilion Sky — 2026 Voyage Portfolio (Press Edition)
 * Recreated with pptxgenjs from the source deck.
 *
 * Requirements: `npm install pptxgenjs`
 * Run with:     `node vermilion-sky-pr-deck-2026.js`
 *
 * Fonts used (installed locally on the presenter's machine):
 *   - Lora            (serif display / numerals)
 *   - Inter           (sans body)
 *   - JetBrains Mono  (monospace eyebrow labels)
 *
 * Slide canvas: 20" x 11.25" (custom wide).
 */

const pptxgen = require("pptxgenjs");

// ---------- Design tokens ----------
const NAVY      = "0A1F3D"; // primary background
const IVORY     = "F4EDE4"; // primary type on dark
const SAND      = "E6DCCB"; // secondary body text
const DUSTY     = "C8B89B"; // tertiary / eyebrow caps
const VERMILION = "D97757"; // accent (circle, emphasis, key stats)

const F_SERIF = "Lora";
const F_SANS  = "Inter";
const F_MONO  = "JetBrains Mono";

// Canvas (inches)
const SW = 20.0;
const SH = 11.25;

// ---------- Presentation setup ----------
const pres = new pptxgen();
pres.title   = "Vermilion Sky — 2026 Voyage Portfolio";
pres.author  = "Vermilion Sky";
pres.company = "Vermilion Sky";
pres.defineLayout({ name: "VS_WIDE", width: SW, height: SH });
pres.layout = "VS_WIDE";

// ---------- Helpers ----------
const mono = (text, opts = {}) => ({
  text,
  options: Object.assign(
    { fontFace: F_MONO, fontSize: 8.25, color: IVORY, charSpacing: 1.8 },
    opts
  ),
});

function addNavyBg(slide) {
  slide.background = { color: NAVY };
}

// Corner tick marks (used around framed plates). Short horizontal + vertical lines.
function addCornerTicks(slide, x, y, w, h, color = IVORY) {
  const L = 0.302, T = 0.01;
  // Top-left
  slide.addShape(pres.shapes.RECTANGLE, { x: x,           y: y,           w: L, h: T, fill: { color }, line: { color, width: 0 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: x,           y: y,           w: T, h: L, fill: { color }, line: { color, width: 0 } });
  // Top-right
  slide.addShape(pres.shapes.RECTANGLE, { x: x + w - L,   y: y,           w: L, h: T, fill: { color }, line: { color, width: 0 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: x + w - T,   y: y,           w: T, h: L, fill: { color }, line: { color, width: 0 } });
  // Bottom-left
  slide.addShape(pres.shapes.RECTANGLE, { x: x,           y: y + h - T,   w: L, h: T, fill: { color }, line: { color, width: 0 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: x,           y: y + h - L,   w: T, h: L, fill: { color }, line: { color, width: 0 } });
  // Bottom-right
  slide.addShape(pres.shapes.RECTANGLE, { x: x + w - L,   y: y + h - T,   w: L, h: T, fill: { color }, line: { color, width: 0 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: x + w - T,   y: y + h - L,   w: T, h: L, fill: { color }, line: { color, width: 0 } });
}

// Header row: small caps running head left + right. Used on interior slides.
function addRunningHead(slide, left, right) {
  slide.addText(left, {
    x: 0.833, y: 0.583, w: 6, h: 0.22,
    fontFace: F_MONO, fontSize: 7.5, color: IVORY, charSpacing: 1.8,
    align: "left", valign: "top", margin: 0,
  });
  slide.addText(right, {
    x: SW - 6 - 0.833, y: 0.583, w: 6, h: 0.22,
    fontFace: F_MONO, fontSize: 7.5, color: IVORY, charSpacing: 1.8,
    align: "right", valign: "top", margin: 0,
  });
}

// Footer row: small caps L/R
function addRunningFoot(slide, left, right) {
  slide.addText(left, {
    x: 0.833, y: 10.531, w: 6, h: 0.22,
    fontFace: F_MONO, fontSize: 7.5, color: IVORY, charSpacing: 1.8,
    align: "left", valign: "top", margin: 0,
  });
  slide.addText(right, {
    x: SW - 6 - 0.833, y: 10.531, w: 6, h: 0.22,
    fontFace: F_MONO, fontSize: 7.5, color: IVORY, charSpacing: 1.8,
    align: "right", valign: "top", margin: 0,
  });
}

// Thin horizontal rule
function hr(slide, x, y, w, color = IVORY) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: 0.012,
    fill: { color }, line: { color, width: 0 },
  });
}

// Thin vertical rule
function vr(slide, x, y, h, color = IVORY) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.012, h,
    fill: { color }, line: { color, width: 0 },
  });
}

// Small ivory circle
function dot(slide, x, y, d = 0.083, color = IVORY) {
  slide.addShape(pres.shapes.OVAL, {
    x: x - d / 2, y: y - d / 2, w: d, h: d,
    fill: { color }, line: { color, width: 0 },
  });
}

// ===================================================================
// SLIDE 1 — COVER
// ===================================================================
{
  const s = pres.addSlide();
  addNavyBg(s);

  // Concentric vermilion circles + filled disk (sun/horizon motif)
  s.addShape(pres.shapes.OVAL, {
    x: 14.146, y: 0.625, w: 5.229, h: 5.229,
    fill: { type: "solid", color: NAVY }, line: { color: VERMILION, width: 0.75 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 14.771, y: 1.25, w: 3.979, h: 3.979,
    fill: { type: "solid", color: NAVY }, line: { color: VERMILION, width: 0.75 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 15.417, y: 1.875, w: 2.708, h: 2.708,
    fill: { color: VERMILION }, line: { color: VERMILION, width: 0 },
  });

  // Lower band (very subtle tone shift: horizon line)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 6.065, w: SW, h: 0.012,
    fill: { color: IVORY, transparency: 70 },
    line: { color: IVORY, width: 0 },
  });

  // Brand mark top-left: small ringed dot + wordmark
  s.addShape(pres.shapes.OVAL, {
    x: 0.833, y: 0.58, w: 0.28, h: 0.28,
    fill: { type: "solid", color: NAVY }, line: { color: IVORY, width: 0.5 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 0.923, y: 0.67, w: 0.10, h: 0.10,
    fill: { color: IVORY }, line: { color: IVORY, width: 0 },
  });
  s.addText("VERMILION SKY", {
    x: 1.21, y: 0.607, w: 3.0, h: 0.25,
    fontFace: F_MONO, fontSize: 9.75, color: IVORY, charSpacing: 3.1,
    valign: "middle", margin: 0,
  });

  // Top right edition label
  s.addText("№ 07 · PRESS EDITION", {
    x: 16.0, y: 0.617, w: SW - 16.0 - 0.833, h: 0.25,
    fontFace: F_MONO, fontSize: 9, color: IVORY, charSpacing: 1.1,
    align: "right", valign: "middle", margin: 0,
  });

  // Eyebrow
  s.addText("THE 2026 VOYAGE PORTFOLIO", {
    x: 0.833, y: 3.125, w: 10, h: 0.3,
    fontFace: F_MONO, fontSize: 8.25, color: VERMILION, charSpacing: 2.3,
    valign: "top", margin: 0,
  });

  // Main oversize headline (two lines with italic accents)
  s.addText(
    [
      { text: "Where the ",    options: { fontFace: F_SERIF, italic: false } },
      { text: "sky",           options: { fontFace: F_SERIF, italic: true  } },
      { text: " ",             options: { fontFace: F_SERIF, italic: false, breakLine: true } },
      { text: "meets",         options: { fontFace: F_SERIF, italic: false } },
      { text: " the water.",   options: { fontFace: F_SERIF, italic: false } },
    ],
    {
      x: 0.833, y: 3.55, w: 18.9, h: 6.0,
      fontFace: F_SERIF, fontSize: 150, color: IVORY, charSpacing: -3,
      valign: "top", margin: 0, lineSpacingMultiple: 0.95,
    }
  );

  // Bottom left meta
  s.addText("A PORTFOLIO FOR TRADE PARTNERS", {
    x: 0.833, y: 9.938, w: 6, h: 0.22,
    fontFace: F_MONO, fontSize: 8.25, color: DUSTY, charSpacing: 1.65,
    valign: "top", margin: 0,
  });
  s.addText("Season 2026 · Three horizons, one ship.", {
    x: 0.833, y: 10.19, w: 8, h: 0.36,
    fontFace: F_SERIF, fontSize: 18, color: IVORY,
    valign: "top", margin: 0,
  });

  // Bottom right meta
  s.addText("RELEASE", {
    x: 16.5, y: 9.938, w: SW - 16.5 - 0.833, h: 0.22,
    fontFace: F_MONO, fontSize: 8.25, color: DUSTY, charSpacing: 1.65,
    align: "right", valign: "top", margin: 0,
  });
  s.addText("April 2026", {
    x: 16.5, y: 10.19, w: SW - 16.5 - 0.833, h: 0.36,
    fontFace: F_SERIF, fontSize: 18, color: IVORY,
    align: "right", valign: "top", margin: 0,
  });
}

// ===================================================================
// SLIDE 2 — SEASON AT A GLANCE
// ===================================================================
{
  const s = pres.addSlide();
  addNavyBg(s);

  addRunningHead(s, "VERMILION SKY · 2026", "02 / 10 · SEASON AT A GLANCE");
  addRunningFoot(s, "PRESS & TRADE PARTNERS", "CONFIDENTIAL — EMBARGOED UNTIL 05.26");

  // Eyebrow
  s.addText("SEASON AT A GLANCE", {
    x: 0.833, y: 1.458, w: 18.9, h: 0.3,
    fontFace: F_MONO, fontSize: 8.25, color: VERMILION, charSpacing: 2.3,
    valign: "top", margin: 0,
  });

  // Display headline with italic accent "Three"
  s.addText(
    [
      { text: "A single season. ",             options: { italic: false } },
      { text: "Three",                         options: { italic: true, color: VERMILION } },
      { text: " unmistakable horizons.",       options: { italic: false } },
    ],
    {
      x: 0.833, y: 1.82, w: 16.5, h: 2.4,
      fontFace: F_SERIF, fontSize: 72, color: IVORY, charSpacing: -1.4,
      valign: "top", margin: 0, lineSpacingMultiple: 1.05,
    }
  );

  // --- Stats row ---
  const statY_label = 5.167;
  const statY_num   = 5.526;
  const statY_body  = 7.005;
  const numH        = 1.40;
  const bodyH       = 0.56;

  const stats = [
    { x: 0.833, labelX: 0.833, labelW: 4.281, label: "ITINERARIES",    num: "42",  body: "Across Northern Europe, the Mediterranean and the Transpacific.", numColor: IVORY },
    { x: 5.833, labelX: 5.833, labelW: 3.852, label: "PORTS OF CALL",  num: "118", body: "Spanning 27 countries, 4 time zones of sailing.",                 numColor: IVORY },
    { x: 10.417,labelX: 10.417,labelW: 3.852, label: "SAILING NIGHTS", num: "284", body: "March 2026 through February 2027.",                                numColor: IVORY },
    { x: 15.0,  labelX: 15.0,  labelW: 4.292, label: "GUEST CAPACITY", num: "620", body: "One vessel. Intentionally small. Intentionally slow.",            numColor: VERMILION },
  ];

  // Vertical dividers between stat columns
  vr(s, 5.406, 4.792, 3.073);
  vr(s, 9.99,  4.792, 3.073);
  vr(s, 14.573,4.792, 3.073);

  stats.forEach(st => {
    s.addText(st.label, {
      x: st.labelX, y: statY_label, w: st.labelW, h: 0.25,
      fontFace: F_MONO, fontSize: 8.25, color: DUSTY, charSpacing: 1.65,
      valign: "top", margin: 0,
    });
    s.addText(st.num, {
      x: st.x, y: statY_num, w: st.labelW, h: numH,
      fontFace: F_SERIF, fontSize: 105, color: st.numColor, charSpacing: -3.15,
      valign: "top", margin: 0,
    });
    s.addText(st.body, {
      x: st.x, y: statY_body, w: 2.9, h: bodyH,
      fontFace: F_SANS, fontSize: 11.25, color: SAND,
      valign: "top", margin: 0, lineSpacingMultiple: 1.35,
    });
  });

  // Three horizon entries at the bottom
  const horiz = [
    { x: 0.833,  num: "I.",   main: "Northern Europe ", tail: "the latitude of light." },
    { x: 7.083,  num: "II.",  main: "Mediterranean ",  tail: "the oldest blue." },
    { x: 13.333, num: "III.", main: "Transpacific ",   tail: "Asia & the American coast." },
  ];
  horiz.forEach(h => {
    s.addText(h.num, {
      x: h.x, y: 9.047, w: 6, h: 0.25,
      fontFace: F_MONO, fontSize: 9, color: VERMILION, charSpacing: 1.08,
      valign: "top", margin: 0,
    });
    s.addText(
      [
        { text: h.main, options: { italic: false } },
        { text: h.tail, options: { italic: true, color: DUSTY } },
      ],
      {
        x: h.x, y: 9.312, w: 6.0, h: 0.75,
        fontFace: F_SERIF, fontSize: 22.5, color: IVORY,
        valign: "top", margin: 0,
      }
    );
  });
}

// ===================================================================
// SLIDE 3 — BRAND POSITIONING
// ===================================================================
{
  const s = pres.addSlide();
  addNavyBg(s);

  addRunningHead(s, "VERMILION SKY · 2026", "03 / 10 · BRAND POSITIONING");
  addRunningFoot(s, "PRESS & TRADE PARTNERS", "CONFIDENTIAL — EMBARGOED UNTIL 05.26");

  // Eyebrow
  s.addText("WHAT WE STAND FOR", {
    x: 0.833, y: 1.667, w: 9.656, h: 0.25,
    fontFace: F_MONO, fontSize: 8.25, color: VERMILION, charSpacing: 2.3,
    valign: "top", margin: 0,
  });

  // Large editorial paragraph
  s.addText(
    [
      { text: "We are the ",                             options: { italic: false } },
      { text: "quiet counterpoint",                      options: { italic: true, color: VERMILION } },
      { text: " to the modern cruise — a small ship for guests who measure a journey in ", options: { italic: false } },
      { text: "light, longitude, and long dinners.",     options: { italic: true, color: DUSTY } },
    ],
    {
      x: 0.833, y: 2.109, w: 9.9, h: 4.2,
      fontFace: F_SERIF, fontSize: 48, color: IVORY, charSpacing: -0.7,
      valign: "top", margin: 0, lineSpacingMultiple: 1.05,
    }
  );

  // Horizontal divider above the three pillars
  hr(s, 0.833, 6.459, 9.375);

  // Three pillars
  const pillars = [
    { x: 0.833, label: "SMALL BY DESIGN",   body: "One vessel, 620 guests, 1:1.4 crew ratio. Ports that larger ships cannot enter." },
    { x: 4.097, label: "SLOW BY CONVICTION", body: "Average 14-night itineraries with double-nights in 9 marquee ports." },
    { x: 7.361, label: "CURATED ASHORE",     body: "Every shore programme is produced with a local author, chef, or curator." },
  ];
  pillars.forEach(p => {
    s.addText(p.label, {
      x: p.x, y: 6.886, w: 2.933, h: 0.25,
      fontFace: F_MONO, fontSize: 8.25, color: DUSTY, charSpacing: 1.65,
      valign: "top", margin: 0,
    });
    s.addText(p.body, {
      x: p.x, y: 7.183, w: 2.933, h: 1.2,
      fontFace: F_SANS, fontSize: 12, color: SAND,
      valign: "top", margin: 0, lineSpacingMultiple: 1.4,
    });
  });

  // Right-hand image plate (framed)
  const plateX = 11.25, plateY = 1.667, plateW = 7.917, plateH = 7.672;
  s.addShape(pres.shapes.RECTANGLE, {
    x: plateX, y: plateY, w: plateW, h: plateH,
    fill: { color: IVORY, transparency: 92 }, // very faint tint
    line: { color: IVORY, width: 0.5 },
  });
  addCornerTicks(s, plateX, plateY, plateW, plateH);

  // Plate label top-right
  s.addText("PLATE 03 · 4:5", {
    x: plateX + plateW - 1.45, y: plateY + 0.18, w: 1.25, h: 0.22,
    fontFace: F_MONO, fontSize: 7.5, color: IVORY, charSpacing: 1.5,
    align: "right", valign: "top", margin: 0,
  });

  // Plate footer caption
  s.addText("EDITORIAL STILL · TO BE SUPPLIED", {
    x: plateX, y: 9.63, w: 4.0, h: 0.25,
    fontFace: F_MONO, fontSize: 9, color: DUSTY, charSpacing: 1.08,
    valign: "top", margin: 0,
  });
  s.addText("F/2.8 · 1/250", {
    x: plateX + plateW - 1.5, y: 9.63, w: 1.5, h: 0.25,
    fontFace: F_MONO, fontSize: 9, color: DUSTY, charSpacing: 1.08,
    align: "right", valign: "top", margin: 0,
  });
}

// ===================================================================
// VOYAGE CARD HELPER (slides 4, 5, 6)
// ===================================================================
function addVoyageSlide(cfg) {
  const s = pres.addSlide();
  addNavyBg(s);
  addRunningHead(s, cfg.head.left, cfg.head.right);
  addRunningFoot(s, cfg.foot.left, cfg.foot.right);

  const contentX = cfg.contentX;   // x-origin of the content column (text side)
  const mapX     = cfg.mapX;       // x-origin of the map frame

  // Eyebrow: "II.  MEDITERRANEAN" etc.
  s.addText(
    [
      { text: cfg.num + " ", options: { italic: false } },
      { text: cfg.region,    options: { italic: false } },
    ],
    {
      x: contentX, y: 1.458, w: 7.725, h: 0.25,
      fontFace: F_MONO, fontSize: 8.25, color: VERMILION, charSpacing: 2.3,
      valign: "top", margin: 0,
    }
  );

  // Headline (with italic accent word). Height adjusts for one- vs two-line titles.
  const twoLine = !!cfg.titleTwoLine;
  const titleH  = twoLine ? 2.9 : 1.5;
  const bodyY   = twoLine ? 4.85 : 3.83;

  s.addText(
    [
      { text: cfg.titleMain, options: { italic: false } },
      { text: cfg.titleItalic, options: { italic: true } },
      { text: cfg.titleTail || "", options: { italic: false } },
    ],
    {
      x: contentX, y: 1.82, w: 7.725, h: titleH,
      fontFace: F_SERIF, fontSize: 60, color: IVORY, charSpacing: -1.2,
      valign: "top", margin: 0, lineSpacingMultiple: 1.0,
    }
  );

  // Body copy
  s.addText(cfg.body, {
    x: contentX, y: bodyY, w: 7.0, h: 1.35,
    fontFace: F_SANS, fontSize: 13.5, color: SAND,
    valign: "top", margin: 0, lineSpacingMultiple: 1.45,
  });

  // ---- Departures table ----
  const tblY0 = twoLine ? 6.45 : 5.43;
  hr(s, contentX, tblY0, 7.5);

  // Column positions (relative to contentX)
  const col1X = contentX + 0.209;   // DEPARTURES
  const col2X = contentX + 3.209;   // NIGHTS
  const col3X = contentX + 4.735;   // FROM / PER GUEST
  const col1W = 2.673, col2W = 1.193, col3W = 2.646;

  // short rules above each column header
  hr(s, contentX + 0.0, tblY0 + 0.245, 3.0);
  hr(s, contentX + 3.0, tblY0 + 0.245, 1.526);
  hr(s, contentX + 4.527, tblY0 + 0.245, 2.974);

  // Column headers
  s.addText("DEPARTURES", {
    x: col1X, y: tblY0 + 0.40, w: col1W, h: 0.25,
    fontFace: F_MONO, fontSize: 8.25, color: DUSTY, charSpacing: 1.65,
    valign: "top", margin: 0,
  });
  s.addText("NIGHTS", {
    x: col2X, y: tblY0 + 0.40, w: col2W, h: 0.25,
    fontFace: F_MONO, fontSize: 8.25, color: DUSTY, charSpacing: 1.65,
    valign: "top", margin: 0,
  });
  s.addText("FROM / PER GUEST", {
    x: col3X, y: tblY0 + 0.40, w: col3W, h: 0.25,
    fontFace: F_MONO, fontSize: 8.25, color: DUSTY, charSpacing: 1.65,
    valign: "top", margin: 0,
  });

  // Rows
  const rowYs = [tblY0 + 0.895, tblY0 + 1.562, tblY0 + 2.229];
  // separators between rows (below col headers, between rows, at bottom)
  hr(s, contentX, tblY0 + 0.697, 3.0);
  hr(s, contentX + 3.0, tblY0 + 0.697, 1.526);
  hr(s, contentX + 4.527, tblY0 + 0.697, 2.974);
  hr(s, contentX, tblY0 + 1.365, 3.0);
  hr(s, contentX + 3.0, tblY0 + 1.365, 1.526);
  hr(s, contentX + 4.527, tblY0 + 1.365, 2.974);
  hr(s, contentX, tblY0 + 2.031, 3.0);
  hr(s, contentX + 3.0, tblY0 + 2.031, 1.526);
  hr(s, contentX + 4.527, tblY0 + 2.031, 2.974);
  hr(s, contentX, tblY0 + 2.865, 3.0);
  hr(s, contentX + 3.0, tblY0 + 2.865, 1.526);
  hr(s, contentX + 4.527, tblY0 + 2.865, 2.974);

  cfg.rows.forEach((row, i) => {
    const rY = rowYs[i];
    s.addText(row.route, {
      x: col1X, y: rY, w: col1W, h: 0.55,
      fontFace: F_SANS, fontSize: 13.5, color: IVORY,
      valign: "top", margin: 0, lineSpacingMultiple: 1.15,
    });
    s.addText(row.nights, {
      x: col2X, y: rY, w: col2W, h: 0.5,
      fontFace: F_SERIF, fontSize: 16.5, color: IVORY,
      valign: "top", margin: 0,
    });
    s.addText(row.price, {
      x: col3X, y: rY, w: col3W, h: 0.5,
      fontFace: F_SERIF, fontSize: 16.5, color: row.highlight ? VERMILION : IVORY,
      valign: "top", margin: 0,
    });
  });

  // ---- Map frame ----
  const mapY = 1.458, mapW = 9.583, mapH = 8.333;
  s.addShape(pres.shapes.RECTANGLE, {
    x: mapX, y: mapY, w: mapW, h: mapH,
    fill: { color: IVORY, transparency: 92 },
    line: { color: IVORY, width: 0.5 },
  });
  addCornerTicks(s, mapX, mapY, mapW, mapH);

  // Map label top-right of frame
  s.addText(cfg.mapLabel, {
    x: mapX + mapW - 1.0, y: mapY + 0.18, w: 0.8, h: 0.22,
    fontFace: F_MONO, fontSize: 7.5, color: IVORY, charSpacing: 1.5,
    align: "right", valign: "top", margin: 0,
  });

  // Compass mark (N + crosshair) — upper right interior
  if (cfg.compass) {
    const cx = mapX + mapW - 0.85;
    const cy = mapY + 0.95;
    s.addShape(pres.shapes.OVAL, {
      x: cx - 0.20, y: cy - 0.20, w: 0.40, h: 0.40,
      fill: { type: "solid", color: NAVY },
      line: { color: IVORY, width: 0.5 },
    });
    // cross lines
    s.addShape(pres.shapes.LINE, {
      x: cx - 0.30, y: cy, w: 0.60, h: 0,
      line: { color: IVORY, width: 0.5 },
    });
    s.addShape(pres.shapes.LINE, {
      x: cx, y: cy - 0.30, w: 0, h: 0.60,
      line: { color: IVORY, width: 0.5 },
    });
    s.addText("N", {
      x: cx - 0.15, y: cy - 0.55, w: 0.30, h: 0.22,
      fontFace: F_SERIF, fontSize: 10, color: IVORY, italic: true,
      align: "center", valign: "middle", margin: 0,
    });
  }

  // City labels inside the map (stylized placeholder)
  if (cfg.cityLabels) {
    cfg.cityLabels.forEach(c => {
      s.addText(c.name, {
        x: mapX + c.rx - 0.9, y: mapY + c.ry - 0.12, w: 1.8, h: 0.25,
        fontFace: F_MONO, fontSize: 8.5, color: c.color || VERMILION, charSpacing: 1.2,
        align: c.align || "left", valign: "middle", margin: 0,
      });
    });
  }

  // Optional extra map annotation lines (e.g., "INTL. DATE LINE", "— 5 SEA DAYS —")
  if (cfg.mapAnnotations) {
    cfg.mapAnnotations.forEach(a => {
      s.addText(a.text, {
        x: mapX + a.rx, y: mapY + a.ry, w: a.w || 2.0, h: 0.25,
        fontFace: F_MONO, fontSize: 8.5, color: a.color || IVORY, charSpacing: 1.2,
        align: a.align || "left", valign: "top", margin: 0,
      });
    });
  }

  // Latitude guide lines (for Northern Europe slide)
  if (cfg.latLines) {
    cfg.latLines.forEach(l => {
      const y = mapY + l.ry;
      // dashed latitude line
      s.addShape(pres.shapes.LINE, {
        x: mapX + 0.5, y: y, w: mapW - 1.0, h: 0,
        line: { color: IVORY, width: 0.4, dashType: "dash", transparency: 60 },
      });
      s.addText(l.label, {
        x: mapX + 0.25, y: y - 0.13, w: 1.0, h: 0.22,
        fontFace: F_MONO, fontSize: 7.5, color: IVORY, charSpacing: 0.8,
        align: "left", valign: "middle", margin: 0,
      });
    });
  }

  return s;
}

// ---- Slide 4: Mediterranean ----
addVoyageSlide({
  head: { left: "VOYAGE II · THE OLDEST BLUE", right: "04 / 10 · MEDITERRANEAN" },
  foot: { left: "SEASON 2026",                  right: "APR — OCT" },
  num: "II.", region: "MEDITERRANEAN",
  titleMain: "The oldest ", titleItalic: "blue", titleTail: ".",
  body: "From Barcelona's afternoon cafés to the marble quiet of the Aegean, a 14-night arc through seven countries where the sea is older than the word for it. Designed with food writer A. Caruso and the Peloponnese Heritage Trust.",
  contentX: 0.833,
  mapX: 9.583,
  mapLabel: "MAP · 04",
  compass: true,
  cityLabels: [
    { name: "BARCELONA", rx: 2.3, ry: 2.8, color: VERMILION },
    { name: "PIRAEUS",   rx: 7.6, ry: 3.8, color: VERMILION, align: "right" },
  ],
  rows: [
    { route: "Barcelona → Piraeus",          nights: "14", price: "$8,940" },
    { route: "Valletta ↔ Istanbul",          nights: "12", price: "$7,620" },
    { route: "Lisbon → Nice (Grand Opener)", nights: "10", price: "$6,180", highlight: true },
  ],
});

// ---- Slide 5: Northern Europe (map on LEFT, content on RIGHT) ----
addVoyageSlide({
  head: { left: "VOYAGE I · THE LATITUDE OF LIGHT", right: "05 / 10 · NORTHERN EUROPE" },
  foot: { left: "SEASON 2026",                       right: "MAY — SEP" },
  num: "I.", region: "NORTHERN EUROPE",
  titleMain: "The latitude of ", titleItalic: "light", titleTail: ".",
  titleTwoLine: true,
  body: "Copenhagen to the 78th parallel and back — a 16-night passage through fjords, northern light, and the shy summer dark. Guest lectures by polar historian Dr. S. Marchetti; on-deck astronomy nightly after 23:00.",
  contentX: 11.667,
  mapX: 0.833,
  mapLabel: "MAP · 05",
  compass: false,
  latLines: [
    { label: "78° N", ry: 0.75 },
    { label: "67° N", ry: 2.9  },
    { label: "60° N", ry: 5.05 },
  ],
  cityLabels: [
    { name: "SVALBARD",   rx: 5.0, ry: 0.70, color: VERMILION },
    { name: "ÅLESUND",    rx: 3.7, ry: 4.25, color: IVORY },
    { name: "BERGEN",     rx: 3.7, ry: 5.15, color: IVORY },
    { name: "COPENHAGEN", rx: 3.0, ry: 6.70, color: VERMILION },
  ],
  rows: [
    { route: "Copenhagen → Tromsø",   nights: "12", price: "$9,240" },
    { route: "Copenhagen ↔ Svalbard", nights: "16", price: "$11,980", highlight: true },
    { route: "Bergen → Reykjavík",    nights: "11", price: "$8,460" },
  ],
});

// ---- Slide 6: Transpacific ----
addVoyageSlide({
  head: { left: "VOYAGE III · ASIA & THE AMERICAN COAST", right: "06 / 10 · TRANSPACIFIC" },
  foot: { left: "SEASON 2026",                             right: "OCT 2026 — FEB 2027" },
  num: "III.", region: "TRANSPACIFIC",
  titleMain: "Asia & ", titleItalic: "the American coast", titleTail: ".",
  titleTwoLine: true,
  body: "A 22-night crossing that moves with the season — from Singapore's equatorial heat to Jeju's volcanic coast, Tokyo's neon patience, and finally the Pacific itself, arriving under the Golden Gate. Five sea-days without land; every one of them worth the passage.",
  contentX: 0.833,
  mapX: 9.583,
  mapLabel: "MAP · 06",
  compass: false,
  cityLabels: [
    { name: "TOKYO",         rx: 5.5, ry: 1.9, color: IVORY },
    { name: "JEJU",          rx: 5.2, ry: 2.7, color: IVORY },
    { name: "HONG KONG",     rx: 4.6, ry: 4.0, color: IVORY },
    { name: "SINGAPORE",     rx: 3.7, ry: 6.3, color: VERMILION },
    { name: "SAN FRANCISCO", rx: 8.1, ry: 2.9, color: VERMILION, align: "right" },
  ],
  mapAnnotations: [
    { text: "INTL. DATE LINE", rx: 6.1, ry: 1.0, color: VERMILION, w: 1.8 },
    { text: "— 5 SEA DAYS —",  rx: 6.1, ry: 1.4, color: IVORY,     w: 1.8 },
  ],
  rows: [
    { route: "Singapore → San Francisco",      nights: "22", price: "$14,620", highlight: true },
    { route: "Hong Kong → Tokyo",              nights: "12", price: "$9,180" },
    { route: "Tokyo → San Francisco (Pacific)",nights: "14", price: "$10,940" },
  ],
});

// ===================================================================
// SLIDE 7 — THE VESSEL
// ===================================================================
{
  const s = pres.addSlide();
  addNavyBg(s);
  addRunningHead(s, "VERMILION SKY · 2026", "07 / 10 · ONBOARD");
  addRunningFoot(s, "PRESS & TRADE PARTNERS", "M/V HELIOS · REFIT 2025");

  // Eyebrow
  s.addText("THE VESSEL", {
    x: 0.833, y: 1.458, w: 18.883, h: 0.25,
    fontFace: F_MONO, fontSize: 8.25, color: VERMILION, charSpacing: 2.3,
    valign: "top", margin: 0,
  });

  // Headline
  s.addText(
    [
      { text: "One ship, ",               options: { italic: false } },
      { text: "refit in ivory and oak",   options: { italic: true } },
      { text: ".",                         options: { italic: false } },
    ],
    {
      x: 0.833, y: 1.82, w: 16.1, h: 1.2,
      fontFace: F_SERIF, fontSize: 66, color: IVORY, charSpacing: -1.3,
      valign: "top", margin: 0,
    }
  );

  // Three plates (4:3 framed placeholders)
  const plateW = 4.069, plateH = 3.979, plateY = 4.375;
  const platesX = [0.833, 5.153, 9.472];
  const plateLabels = ["PLATE 07-A", "PLATE 07-B", "PLATE 07-C"];
  const plateTitles = [
    { main: "The Observation Library", italic: null },
    { main: "Restaurant ", italic: "Ember" },
    { main: "Veranda Suite, typical",  italic: null },
  ];
  const plateBodies = [
    "Port-side. Double-height. Quiet hours 22:00–07:00.",
    "A single tasting menu changed every 48 hours with the coast.",
    "42 m² · private teak veranda · every cabin outward-facing.",
  ];

  platesX.forEach((px, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: px, y: plateY, w: plateW, h: plateH,
      fill: { color: IVORY, transparency: 92 },
      line: { color: IVORY, width: 0.5 },
    });
    addCornerTicks(s, px, plateY, plateW, plateH);

    // Aspect label
    s.addText("3:4", {
      x: px + plateW - 0.55, y: plateY + 0.18, w: 0.4, h: 0.22,
      fontFace: F_MONO, fontSize: 7.5, color: IVORY, charSpacing: 1.5,
      align: "right", valign: "top", margin: 0,
    });

    // Label caps
    s.addText(plateLabels[i], {
      x: px, y: 8.542, w: plateW, h: 0.25,
      fontFace: F_MONO, fontSize: 8.25, color: DUSTY, charSpacing: 1.65,
      valign: "top", margin: 0,
    });

    // Plate title (mixed italic)
    const pt = plateTitles[i];
    const titleRuns = [{ text: pt.main, options: { italic: false } }];
    if (pt.italic) titleRuns.push({ text: pt.italic, options: { italic: true } });
    s.addText(titleRuns, {
      x: px, y: 8.755, w: plateW, h: 0.4,
      fontFace: F_SERIF, fontSize: 16.5, color: IVORY,
      valign: "top", margin: 0,
    });

    s.addText(plateBodies[i], {
      x: px, y: 9.15, w: plateW, h: 0.55,
      fontFace: F_SANS, fontSize: 10.5, color: SAND,
      valign: "top", margin: 0, lineSpacingMultiple: 1.35,
    });
  });

  // Vertical divider separating plates from stats panel
  vr(s, 13.74, 4.375, 5.344);

  // -------- Right-hand at-a-glance panel --------
  const rX = 14.167;

  s.addText("M/V HELIOS · AT A GLANCE", {
    x: rX, y: 4.375, w: 5.15, h: 0.25,
    fontFace: F_MONO, fontSize: 8.25, color: DUSTY, charSpacing: 1.65,
    valign: "top", margin: 0,
  });

  const glanceStats = [
    [{ label: "LENGTH", num: "184", unit: "m" }, { label: "BEAM",   num: "24",  unit: "m" }],
    [{ label: "SUITES", num: "310", unit: ""  }, { label: "GUESTS", num: "620", unit: ""  }],
    [{ label: "CREW",   num: "440", unit: ""  }, { label: "DECKS",  num: "7",   unit: ""  }],
  ];
  const rowYs = [4.776, 5.641, 6.505];
  glanceStats.forEach((pair, i) => {
    const rowY = rowYs[i];
    pair.forEach((cell, j) => {
      const cx = rX + (j === 0 ? 0 : 2.604);
      s.addText(cell.label, {
        x: cx, y: rowY, w: 2.479, h: 0.22,
        fontFace: F_MONO, fontSize: 7.5, color: DUSTY, charSpacing: 0.9,
        valign: "top", margin: 0,
      });
      s.addText(
        [
          { text: cell.num,  options: { fontFace: F_SERIF, fontSize: 25.5, color: IVORY } },
          { text: cell.unit, options: { fontFace: F_SERIF, fontSize: 13,   color: IVORY, baseline: -15 } },
        ],
        {
          x: cx, y: rowY + 0.14, w: 2.479, h: 0.55,
          fontFace: F_SERIF, color: IVORY, valign: "top", margin: 0,
        }
      );
    });
  });

  // Included list heading + divider
  hr(s, rX, 7.453, 5.0);
  s.addText("INCLUDED, WITHOUT NEGOTIATION", {
    x: rX, y: 7.755, w: 5.15, h: 0.25,
    fontFace: F_MONO, fontSize: 8.25, color: DUSTY, charSpacing: 1.65,
    valign: "top", margin: 0,
  });

  const included = [
    "All shore excursions",
    "Beverages & wine pairings",
    "Guest-author programming",
    "Gratuities, laundry, Wi-Fi",
  ];
  const incYs = [8.135, 8.555, 8.974, 9.393];
  const incSeps = [8.461, 8.88, 9.299];
  incSeps.forEach(y => hr(s, rX, y, 5.0));

  included.forEach((txt, i) => {
    s.addText(txt, {
      x: rX, y: incYs[i], w: 4.5, h: 0.32,
      fontFace: F_SANS, fontSize: 11.25, color: SAND,
      valign: "middle", margin: 0,
    });
    s.addText("—", {
      x: rX + 4.843, y: incYs[i], w: 0.3, h: 0.32,
      fontFace: F_SANS, fontSize: 11.25, color: VERMILION,
      align: "left", valign: "middle", margin: 0,
    });
  });
}

// ===================================================================
// SLIDE 8 — PRICING & BOOKING WINDOWS
// ===================================================================
{
  const s = pres.addSlide();
  addNavyBg(s);
  addRunningHead(s, "VERMILION SKY · 2026", "08 / 10 · PRICING & BOOKING");
  addRunningFoot(s, "TRADE PARTNERS", "COMMISSION SCHEDULE AVAILABLE ON REQUEST");

  // Eyebrow
  s.addText("PRICING & BOOKING WINDOWS", {
    x: 0.833, y: 1.458, w: 18.883, h: 0.25,
    fontFace: F_MONO, fontSize: 8.25, color: VERMILION, charSpacing: 2.3,
    valign: "top", margin: 0,
  });

  // Display headline
  s.addText(
    [
      { text: "Three ",   options: { italic: false } },
      { text: "rates",    options: { italic: true } },
      { text: ", three ", options: { italic: false } },
      { text: "windows",  options: { italic: true } },
      { text: " , and a quiet bonus for early partners.", options: { italic: false } },
    ],
    {
      x: 0.833, y: 1.82, w: 18.883, h: 1.9,
      fontFace: F_SERIF, fontSize: 60, color: IVORY, charSpacing: -1.2,
      valign: "top", margin: 0, lineSpacingMultiple: 1.05,
    }
  );

  // ---- Three tier columns ----
  // Middle column gets a subtle highlight fill to indicate "most popular"
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.944, y: 4.583, w: 6.111, h: 3.352,
    fill: { color: IVORY, transparency: 92 },
    line: { color: IVORY, width: 0 },
  });

  // Column dividers (thin vertical rules flanking the middle tier)
  vr(s, 6.934,  4.583, 3.352);
  vr(s, 13.045, 4.583, 3.352);

  const tiers = [
    { x: 0.833,  w: 5.812, eyebrow: "TIER I · HORIZON",     name: "Ocean-view suite",   price: "$6,180",  body: "Per guest · double occupancy · 10-night minimum. 32 m² with floor-to-ceiling window." },
    { x: 7.403,  w: 5.34,  eyebrow: "TIER II · VERANDA",    name: "Private teak veranda", price: "$8,940",  body: "Per guest · double occupancy · 42 m² · most popular across all three voyages." },
    { x: 13.514, w: 5.822, eyebrow: "TIER III · OWNER'S",   name: "Duplex, fore & aft", price: "$18,400", body: "Per guest · 96 m² · six suites fleet-wide. Includes private shore car." },
  ];

  tiers.forEach(t => {
    s.addText(t.eyebrow, {
      x: t.x, y: 5.0, w: t.w, h: 0.25,
      fontFace: F_MONO, fontSize: 8.25, color: VERMILION, charSpacing: 1.65,
      valign: "top", margin: 0,
    });
    s.addText(t.name, {
      x: t.x, y: 5.34, w: t.w, h: 0.4,
      fontFace: F_SERIF, fontSize: 19.5, color: IVORY,
      valign: "top", margin: 0,
    });
    s.addText(
      [
        { text: t.price,  options: { fontFace: F_SERIF, fontSize: 69, color: IVORY, charSpacing: -2.07 } },
        { text: " from",  options: { fontFace: F_SERIF, fontSize: 14, color: IVORY, italic: true, baseline: -40 } },
      ],
      {
        x: t.x, y: 5.95, w: t.w, h: 1.1,
        fontFace: F_SERIF, color: IVORY, valign: "top", margin: 0,
      }
    );
    s.addText(t.body, {
      x: t.x, y: 7.10, w: t.w, h: 0.75,
      fontFace: F_SANS, fontSize: 11.25, color: SAND,
      valign: "top", margin: 0, lineSpacingMultiple: 1.4,
    });
  });

  // Bottom booking-window row
  hr(s, 0.833, 9.129, 18.333);

  const windows = [
    { x: 0.833,  eyebrow: "WINDOW",       big: "Booking calendar", small: "",                               emphasize: false, mainSize: 15   },
    { x: 5.521,  eyebrow: "TRADE PREVIEW",big: "05 May 2026",      small: "Partners only · +4% commission", emphasize: false, mainSize: 16.5 },
    { x: 10.208, eyebrow: "PUBLIC OPEN",  big: "19 May 2026",      small: "All itineraries available",       emphasize: false, mainSize: 16.5 },
    { x: 14.896, eyebrow: "LATE-RELEASE", big: "15 Aug 2026",      small: "Transpacific allocations refresh", emphasize: true, mainSize: 16.5 },
  ];
  windows.forEach(w => {
    s.addText(w.eyebrow, {
      x: w.x, y: 9.431, w: 4.399, h: 0.25,
      fontFace: F_MONO, fontSize: 8.25, color: w.emphasize ? VERMILION : DUSTY, charSpacing: 1.65,
      valign: "top", margin: 0,
    });
    s.addText(w.big, {
      x: w.x, y: 9.665, w: 4.399, h: 0.38,
      fontFace: F_SERIF, fontSize: w.mainSize, color: w.emphasize ? VERMILION : IVORY,
      valign: "top", margin: 0,
    });
    if (w.small) {
      s.addText(w.small, {
        x: w.x, y: 10.0, w: 4.399, h: 0.3,
        fontFace: F_SANS, fontSize: 9.75, color: SAND,
        valign: "top", margin: 0,
      });
    }
  });
}

// ===================================================================
// SLIDE 9 — PRESS PROGRAMME & CALENDAR
// ===================================================================
// NOTE: Fixed the right-side overlap / off-slide issue from the source
// deck. Calendar text boxes were too narrow and pushed past the slide
// edge. Here the right column is laid out within a proper right-bound
// safe zone (ends at x = 19.167).
{
  const s = pres.addSlide();
  addNavyBg(s);
  addRunningHead(s, "VERMILION SKY · 2026", "09 / 10 · PRESS PROGRAMME");
  addRunningFoot(s, "TRADE & MEDIA",        "PRESS KIT · ISSUE 07");

  // Eyebrow
  s.addText("PRESS PROGRAMME & CALENDAR", {
    x: 0.833, y: 1.458, w: 18.883, h: 0.25,
    fontFace: F_MONO, fontSize: 8.25, color: VERMILION, charSpacing: 2.3,
    valign: "top", margin: 0,
  });

  // Display headline
  s.addText(
    [
      { text: "A ",                     options: { italic: false } },
      { text: "year of stories",        options: { italic: true } },
      { text: ", told one port at a time.", options: { italic: false } },
    ],
    {
      x: 0.833, y: 1.82, w: 18.5, h: 1.2,
      fontFace: F_SERIF, fontSize: 60, color: IVORY, charSpacing: -1.2,
      valign: "top", margin: 0,
    }
  );

  // -------------------- LEFT: PRESS HIGHLIGHTS --------------------
  s.addText("PRESS HIGHLIGHTS", {
    x: 0.833, y: 4.167, w: 8.798, h: 0.25,
    fontFace: F_MONO, fontSize: 8.25, color: DUSTY, charSpacing: 1.65,
    valign: "top", margin: 0,
  });
  hr(s, 0.833, 4.568, 8.542);

  const highlights = [
    { num: "01", title: "Conde Nast Traveler · feature in July issue",  body: "Eight-page photo essay, Northern Europe sailing." },
    { num: "02", title: "FT Weekend · long-read, the new slow cruise",  body: "Commissioned · publishes mid-season." },
    { num: "03", title: "Monocle Radio · partner series, three episodes", body: "One per voyage · recorded at sea." },
    { num: "04", title: "Trade fams · three hosted sailings, 60 agents",  body: "One per route · applications open May 12." },
  ];
  const hiYs    = [4.807, 5.872, 6.936, 8.001];
  const hiSepYs = [5.632, 6.697, 7.761, 8.826];
  hiSepYs.forEach(y => hr(s, 0.833, y, 8.542));

  highlights.forEach((h, i) => {
    const y = hiYs[i];
    s.addText(h.num, {
      x: 0.833, y: y, w: 0.917, h: 0.7,
      fontFace: F_SERIF, fontSize: 25.5, color: VERMILION,
      valign: "top", margin: 0,
    });
    s.addText(h.title, {
      x: 1.875, y: y, w: 7.5, h: 0.4,  // widened from source (was ~5.0)
      fontFace: F_SERIF, fontSize: 18, color: IVORY,
      valign: "top", margin: 0,
    });
    s.addText(h.body, {
      x: 1.875, y: y + 0.37, w: 7.5, h: 0.3,
      fontFace: F_SANS, fontSize: 10.5, color: SAND,
      valign: "top", margin: 0,
    });
  });

  // -------------------- RIGHT: CALENDAR (overlap-fixed layout) --------------------
  // Column layout inside a right-bound safe zone. Slide right edge is 20".
  // Label column:  10.5 – 12.0   (width 1.5)
  // Spine X    :  12.2
  // Text column:  12.45 – 19.167 (width 6.717)  ← this is the key fix
  const CAL_LEFT   = 10.5;
  const CAL_RIGHT  = 19.167; // = SW - 0.833 (right safety margin)
  const SPINE_X    = 12.2;
  const LABEL_W    = 1.5;
  const TEXT_X     = 12.45;
  const TEXT_W     = CAL_RIGHT - TEXT_X; // 6.717"

  s.addText("CALENDAR", {
    x: CAL_LEFT, y: 4.167, w: CAL_RIGHT - CAL_LEFT, h: 0.25,
    fontFace: F_MONO, fontSize: 8.25, color: DUSTY, charSpacing: 1.65,
    valign: "top", margin: 0,
  });

  // Vertical timeline spine
  vr(s, SPINE_X, 4.568, 4.375);

  // Bottom terminus dot (vermilion)
  dot(s, SPINE_X + 0.006, 8.938, 0.09, VERMILION);

  const cal = [
    { when: "Apr 26", title: "Season opener, Lisbon",       body: "Christening + press night aboard.", emphasize: false, y: 4.568 },
    { when: "Jun 26", title: "Midnight sun fam, Tromsø",    body: "20 agents · 6 nights.",             emphasize: false, y: 5.434 },
    { when: "Sep 26", title: "Press salon, Istanbul",       body: "Travel & food editors, by invitation.", emphasize: false, y: 6.3   },
    { when: "Nov 26", title: "Transpacific launch, Singapore", body: "Gala send-off · 22-night inaugural.", emphasize: true,  y: 7.166 },
  ];
  cal.forEach(c => {
    const color = c.emphasize ? VERMILION : IVORY;
    // Month/year label
    s.addText(c.when, {
      x: CAL_LEFT, y: c.y, w: LABEL_W, h: 0.35,
      fontFace: F_SERIF, fontSize: 16.5, color: color,
      align: "right", valign: "top", margin: 0,
    });
    // Connector dot on the spine
    dot(s, SPINE_X + 0.006, c.y + 0.165, c.emphasize ? 0.11 : 0.09,
        c.emphasize ? VERMILION : IVORY);
    // Event title
    s.addText(c.title, {
      x: TEXT_X, y: c.y, w: TEXT_W, h: 0.35,
      fontFace: F_SERIF, fontSize: 16.5, color: color,
      valign: "top", margin: 0,
    });
    // Event body
    s.addText(c.body, {
      x: TEXT_X, y: c.y + 0.30, w: TEXT_W, h: 0.3,
      fontFace: F_SANS, fontSize: 9.75, color: SAND,
      valign: "top", margin: 0,
    });
  });
}

// ===================================================================
// SLIDE 10 — THANK YOU / CONTACT
// ===================================================================
{
  const s = pres.addSlide();
  addNavyBg(s);
  addRunningHead(s, "VERMILION SKY · 2026", "10 / 10 · CONTACT");
  addRunningFoot(s, "PRESS & TRADE PARTNERS", "THANK YOU.");

  // Concentric circles mirroring the cover (upper-right)
  s.addShape(pres.shapes.OVAL, {
    x: 15.917, y: 1.146, w: 3.354, h: 3.354,
    fill: { type: "solid", color: NAVY }, line: { color: VERMILION, width: 0.75 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 16.458, y: 1.667, w: 2.292, h: 2.292,
    fill: { color: VERMILION }, line: { color: VERMILION, width: 0 },
  });

  // Eyebrow
  s.addText("THANK YOU.", {
    x: 0.833, y: 1.875, w: 11.8, h: 0.25,
    fontFace: F_MONO, fontSize: 8.25, color: VERMILION, charSpacing: 2.3,
    valign: "top", margin: 0,
  });

  // Closing headline
  s.addText(
    [
      { text: "The horizon ", options: { italic: false } },
      { text: "is a",         options: { italic: true, color: VERMILION } },
      { text: " ",            options: { italic: false, breakLine: true } },
      { text: "place",        options: { italic: true, color: VERMILION } },
      { text: " we're going ",options: { italic: false } },
      { text: " ",            options: { italic: false, breakLine: true } },
      { text: "together.",    options: { italic: false } },
    ],
    {
      x: 0.833, y: 2.318, w: 13.5, h: 5.8,
      fontFace: F_SERIF, fontSize: 99, color: IVORY, charSpacing: -2,
      valign: "top", margin: 0, lineSpacingMultiple: 0.96,
    }
  );

  // Horizontal divider before contact band
  hr(s, 0.833, 8.323, 18.333);

  // Brand lockup (small ringed dot + wordmark)
  s.addShape(pres.shapes.OVAL, {
    x: 1.208, y: 8.71, w: 0.28, h: 0.28,
    fill: { type: "solid", color: NAVY }, line: { color: IVORY, width: 0.5 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 1.298, y: 8.80, w: 0.10, h: 0.10,
    fill: { color: IVORY }, line: { color: IVORY, width: 0 },
  });
  s.addText("VERMILION SKY", {
    x: 1.59, y: 8.73, w: 3.5, h: 0.25,
    fontFace: F_MONO, fontSize: 9.75, color: IVORY, charSpacing: 3.1,
    valign: "middle", margin: 0,
  });

  s.addText("Press & trade enquiries are welcome for all three 2026 voyages.", {
    x: 0.833, y: 9.083, w: 4.5, h: 0.6,
    fontFace: F_SANS, fontSize: 11.25, color: SAND,
    valign: "top", margin: 0, lineSpacingMultiple: 1.35,
  });

  const contacts = [
    { x: 6.131,  label: "PRESS",  name: "Margaux Laurent",             line: "press@vermilionsky.co    +44 20 7946 0042" },
    { x: 10.615, label: "TRADE",  name: "Theo Nakamura",               line: "partners@vermilionsky.co    +1 415 555 0188" },
    { x: 15.099, label: "STUDIO", name: "London · Oslo · San Francisco", line: "vermilionsky.co" },
  ];
  contacts.forEach(c => {
    s.addText(c.label, {
      x: c.x, y: 8.708, w: 4.189, h: 0.25,
      fontFace: F_MONO, fontSize: 8.25, color: DUSTY, charSpacing: 1.65,
      valign: "top", margin: 0,
    });
    s.addText(c.name, {
      x: c.x, y: 8.98, w: 4.189, h: 0.35,
      fontFace: F_SERIF, fontSize: 16.5, color: IVORY,
      valign: "top", margin: 0,
    });
    s.addText(c.line, {
      x: c.x, y: 9.31, w: 4.189, h: 0.5,
      fontFace: F_SANS, fontSize: 11.25, color: SAND,
      valign: "top", margin: 0,
    });
  });
}

// ---------- Write file ----------
pres.writeFile({ fileName: "vermilion-sky-pr-deck-2026.pptx" })
  .then(fn => console.log(`Wrote ${fn}`))
  .catch(err => { console.error(err); process.exit(1); });
