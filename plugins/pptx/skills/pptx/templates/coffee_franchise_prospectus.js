// Savanna Coffee — Franchise Prospectus
// Recreates the HTML deck as a PPTX using pptxgenjs.
//
// Source HTML uses 1920 x 1080 px slides. We use LAYOUT_WIDE (13.333" x 7.5")
// so the px -> inch scale is exactly 13.333 / 1920 = 0.006944.
// Font sizes scale by (13.333 / 1920) * 72 = 0.5  (so 1 px ≈ 0.5 pt).

const pptxgen = require("pptxgenjs");
const path = require("path");

// ---------- Geometry helpers ----------
const SLIDE_W_IN = 13.333;
const SLIDE_H_IN = 7.5;
const PX_TO_IN = SLIDE_W_IN / 1920;            // 0.006944
const PX_TO_PT = (SLIDE_W_IN / 1920) * 72;     // 0.5

const inch = (px) => +(px * PX_TO_IN).toFixed(4);
const pt   = (px) => +(px * PX_TO_PT).toFixed(2);

// Padding inside each slide chrome: 64px top/bottom, 96px left/right
const PAD_X_PX = 96;
const PAD_Y_PX = 64;
const CONTENT_W_PX = 1920 - 2 * PAD_X_PX; // 1728
const CONTENT_H_PX = 1080 - 2 * PAD_Y_PX; // 952

// ---------- Color palette (from CSS :root) ----------
const C = {
  bone:      "EFE9DA",
  bone2:     "DDD3B8",
  paper:     "F5F0DF",
  espresso:  "14241B",
  espresso2: "1E3327",
  dusk:      "3F5D3A",
  acacia:    "6B8E4E",
  acacia2:   "B7C66A",
  sage:      "8FA37A",
  // approximations of the rgba(20,36,27,...) ink shades on bone background
  rule:        "C9C2AF",  // ~0.18 alpha espresso on bone
  ruleStrong:  "8C8775",  // ~0.45 alpha espresso on bone
  ink60:       "6E6E5F",  // ~0.62 alpha espresso on bone
  ink40:       "9C9587",  // ~0.42 alpha espresso on bone
  // dark-slide variants (rgba bone on espresso)
  boneSoft55:  "8E887A", // 0.55 alpha bone over espresso
  boneSoft20:  "3A4640", // 0.20 alpha bone over espresso
  boneSoft82:  "C5BFAE",
  boneSoft75:  "B5AFA0",
  boneSoft18:  "374440",
};

// ---------- Fonts ----------
const F_DISPLAY = "Libre Caslon Text";
const F_BODY    = "Inter Tight";
const F_MONO    = "JetBrains Mono";

// ---------- Construct deck ----------
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333" x 7.5"
pres.title = "Savanna Coffee — Franchise Opportunity";
pres.author = "Savanna Coffee Co.";

// ============================================================
// Shared chrome: top bar (logo + wordmark + right label) and
// bottom bar (left footer + page count). Two color modes.
// ============================================================
function addChrome(slide, opts) {
  const {
    rightLabel,
    bottomLeft,
    pageLabel,
    dark = false,
  } = opts;

  // Color tokens depending on bg
  const topMutedColor    = dark ? C.boneSoft55 : C.ink60;     // top right label
  const bottomMutedColor = dark ? C.boneSoft55 : C.ink40;     // bottom bar text
  const wordmarkColor    = dark ? C.bone       : C.espresso;
  const ringOuterColor   = dark ? C.bone       : C.espresso;
  const ringInnerColor   = dark ? C.acacia2    : C.acacia;
  const hrColor          = dark ? C.boneSoft20 : C.rule;

  // ---- Top bar: y = PAD_Y_PX (64px), logo aligned to baseline ~78px
  // Logo: 28px round dot containing 16px inner dot (inset 6)
  const logoX = PAD_X_PX;
  const logoY = PAD_Y_PX + 4;   // small visual nudge
  slide.addShape(pres.shapes.OVAL, {
    x: inch(logoX), y: inch(logoY), w: inch(28), h: inch(28),
    fill: { color: ringOuterColor }, line: { color: ringOuterColor, width: 0 },
  });
  slide.addShape(pres.shapes.OVAL, {
    x: inch(logoX + 6), y: inch(logoY + 6), w: inch(16), h: inch(16),
    fill: { color: ringInnerColor }, line: { color: ringInnerColor, width: 0 },
  });

  // Wordmark — Libre Caslon Text 20px = 10pt
  slide.addText("Savanna Coffee", {
    x: inch(logoX + 28 + 14), y: inch(PAD_Y_PX - 2),
    w: inch(500), h: inch(36),
    fontFace: F_DISPLAY, fontSize: pt(20), bold: true,
    color: wordmarkColor, valign: "middle", margin: 0,
    charSpacing: 0.4, // ~0.02em
  });

  // Right label — JetBrains Mono uppercase tracked. font-size 15px = 7.5pt
  slide.addText((rightLabel || "").toUpperCase(), {
    x: inch(1920 - PAD_X_PX - 600), y: inch(PAD_Y_PX - 2),
    w: inch(600), h: inch(36),
    fontFace: F_BODY, fontSize: pt(15),
    color: topMutedColor, align: "right", valign: "middle",
    charSpacing: 2.1, // 0.14em tracking ~ 15px*0.14 = 2.1
    bold: false, margin: 0,
  });

  // Top hr is part of slide internal layout — actual HTML doesn't draw a
  // top rule (it's only between sections), so we skip it.

  // ---- Bottom bar: monospace 13px = 6.5pt
  const bottomY = 1080 - PAD_Y_PX - 18;
  slide.addText(bottomLeft || "", {
    x: inch(PAD_X_PX), y: inch(bottomY),
    w: inch(CONTENT_W_PX - 200), h: inch(20),
    fontFace: F_MONO, fontSize: pt(13),
    color: bottomMutedColor, valign: "middle", margin: 0,
    charSpacing: 0.5, // 0.04em
  });
  slide.addText(pageLabel || "", {
    x: inch(1920 - PAD_X_PX - 200), y: inch(bottomY),
    w: inch(200), h: inch(20),
    fontFace: F_MONO, fontSize: pt(13),
    color: bottomMutedColor, align: "right", valign: "middle", margin: 0,
    charSpacing: 0.5,
  });
}

// Helper: horizontal rule line
function addHr(slide, xPx, yPx, wPx, color) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: inch(xPx), y: inch(yPx), w: inch(wPx), h: inch(1),
    fill: { color: color }, line: { color: color, width: 0 },
  });
}

// Helper: vertical rule line
function addVr(slide, xPx, yPx, hPx, color) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: inch(xPx), y: inch(yPx), w: inch(1), h: inch(hPx),
    fill: { color: color }, line: { color: color, width: 0 },
  });
}

// ============================================================
// SLIDE 01 — COVER
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.espresso };

  // Decorative concentric rings (cover-ring) — bottom-right, partly off-canvas
  // ring center at (1920 - 140 + 340, 1080 - 140 + 340) = (2120, 1280) but
  // since fill must be transparent, we draw rings as ovals with no fill and
  // a colored line, then layer two more inner ones.
  const ringSize = 680;
  const ringX = 1920 - 140 - ringSize; // = 1100
  const ringY = 1080 - 140 - ringSize; //  =  260
  // Outer ring  - acacia  35% alpha on espresso ~ #2C4030 ish
  slide.addShape(pres.shapes.OVAL, {
    x: inch(ringX), y: inch(ringY), w: inch(ringSize), h: inch(ringSize),
    fill: { type: "solid", color: C.espresso }, // fill same as bg = transparent look
    line: { color: "364732", width: 1 },
  });
  // Mid ring (inset 60)
  slide.addShape(pres.shapes.OVAL, {
    x: inch(ringX + 60), y: inch(ringY + 60),
    w: inch(ringSize - 120), h: inch(ringSize - 120),
    fill: { color: C.espresso },
    line: { color: "2A3528", width: 1 },
  });
  // Inner ring (inset 140)
  slide.addShape(pres.shapes.OVAL, {
    x: inch(ringX + 140), y: inch(ringY + 140),
    w: inch(ringSize - 280), h: inch(ringSize - 280),
    fill: { color: C.espresso },
    line: { color: "1F2A1F", width: 1 },
  });

  addChrome(slide, {
    rightLabel: "Franchise Prospectus · 2026",
    bottomLeft: "SAV / FRANCHISE / CA · WA",
    pageLabel:  "01 / 09",
    dark: true,
  });

  // Eyebrow — JetBrains Mono 14px = 7pt, color acacia-2, tracked
  slide.addText("A FRANCHISE OPPORTUNITY", {
    x: inch(PAD_X_PX), y: inch(330),
    w: inch(800), h: inch(24),
    fontFace: F_BODY, fontSize: pt(14),
    color: C.acacia2, charSpacing: 2.8, valign: "bottom", margin: 0,
  });

  // Cover title — Libre Caslon Text 168px = 84pt
  // "From one\nsmall shop\nto a hundred." with "a hundred" italic acacia-2
  // 3 lines × ~168 × 0.9 line-height ≈ 454px tall; reserve plenty of room.
  slide.addText(
    [
      { text: "From one",         options: { color: C.bone, breakLine: true } },
      { text: "small shop",       options: { color: C.bone, breakLine: true } },
      { text: "to ",              options: { color: C.bone, breakLine: false } },
      { text: "a hundred",        options: { color: C.acacia2, italic: true, breakLine: false } },
      { text: ".",                options: { color: C.bone } },
    ],
    {
      x: inch(PAD_X_PX), y: inch(370),
      w: inch(1100), h: inch(580),
      fontFace: F_DISPLAY, fontSize: pt(168),
      lineSpacingMultiple: 0.9,
      charSpacing: -1.7, // -0.02em letter-spacing on 168px ~= -3.4px = -1.7pt
      valign: "top", margin: 0, paraSpaceAfter: 0,
    }
  );

  // Cover meta column - on the right, bordered-left, gap 80
  // From CSS: cover-body grid 1.1fr / 0.9fr, gap 80, total content 1728
  // So left col ~ (1728-80)*1.1/2 = 906, right col = 1728-80-906 = 742
  const metaX = PAD_X_PX + 906 + 80;          // ≈ 1082
  const metaW = 1728 - 906 - 80;              // ≈ 742, but cover-meta itself max-width 480
  // Vertical line — left border 1px, height ~ 360px starting around y=560
  const metaTop = 560;
  addVr(slide, metaX, metaTop, 360, C.boneSoft20);

  const metaInnerX = metaX + 36; // padding-left:36px
  const metaInnerW = 480;        // cover-meta max-width

  // Block 1: Prepared for
  slide.addText([
    { text: "PREPARED FOR\n", options: { color: C.acacia2, fontSize: pt(12), fontFace: F_BODY, charSpacing: 2.4, breakLine: true } },
    { text: "Qualified Franchise Candidates", options: { color: C.bone, fontSize: pt(18), fontFace: F_BODY, bold: false } },
  ], {
    x: inch(metaInnerX), y: inch(metaTop),
    w: inch(metaInnerW), h: inch(64),
    valign: "top", margin: 0, paraSpaceAfter: pt(6),
  });

  // Block 2: Prepared by
  slide.addText([
    { text: "PREPARED BY\n", options: { color: C.acacia2, fontSize: pt(12), fontFace: F_BODY, charSpacing: 2.4, breakLine: true } },
    { text: "Office of the COO — Savanna Coffee Co.", options: { color: C.bone, fontSize: pt(18), fontFace: F_BODY } },
  ], {
    x: inch(metaInnerX), y: inch(metaTop + 92),
    w: inch(metaInnerW), h: inch(64),
    valign: "top", margin: 0, paraSpaceAfter: pt(6),
  });

  // Block 3: Confidential
  slide.addText([
    { text: "CONFIDENTIAL\n", options: { color: C.acacia2, fontSize: pt(12), fontFace: F_BODY, charSpacing: 2.4, breakLine: true } },
    { text: "This document contains forward-looking information intended solely for the recipient. Not an offer to sell a franchise.",
      options: { color: C.boneSoft75, fontSize: pt(16), fontFace: F_BODY } },
  ], {
    x: inch(metaInnerX), y: inch(metaTop + 184),
    w: inch(metaInnerW), h: inch(160),
    valign: "top", margin: 0,
    lineSpacingMultiple: 1.55,
  });
}

// ============================================================
// SLIDE 02 — STORY
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bone };
  addChrome(slide, {
    rightLabel: "The Story",
    bottomLeft: "Figures approximate; based on corporate historical records.",
    pageLabel:  "02 / 09",
  });

  // Body starts at top y = 64 + 36 (top bar) + 72 (margin-top) = 172
  const bodyY = PAD_Y_PX + 36 + 72; // 172
  // Two equal columns, gap 96
  const colW = (CONTENT_W_PX - 96) / 2; // 816
  const leftX = PAD_X_PX;
  const rightX = PAD_X_PX + colW + 96; // 912

  // ---- LEFT
  // Eyebrow
  slide.addText("01 · ORIGIN", {
    x: inch(leftX), y: inch(bodyY),
    w: inch(colW), h: inch(24),
    fontFace: F_BODY, fontSize: pt(14), color: C.dusk,
    charSpacing: 2.8, margin: 0, valign: "top",
  });

  // Headline 96px = 48pt, "Built one\ncup at a time." with "a time." italic dusk
  slide.addText([
    { text: "Built one",   options: { color: C.espresso, breakLine: true } },
    { text: "cup at ",     options: { color: C.espresso, breakLine: false } },
    { text: "a time.",     options: { color: C.dusk, italic: true } },
  ], {
    x: inch(leftX), y: inch(bodyY + 48),
    w: inch(colW), h: inch(280),
    fontFace: F_DISPLAY, fontSize: pt(96),
    lineSpacingMultiple: 0.95,
    charSpacing: -1.0, // -0.02em on 96px ≈ -2px = -1pt
    margin: 0, valign: "top",
  });

  // Story paragraphs — Libre Caslon Text 24px = 12pt, line-height 1.5
  // With Caslon installed (user environment) each paragraph fits in ~144px.
  // We separate them generously so even sans-serif fallback won't collide.
  slide.addText(
    "Savanna Coffee began as a 200 sq. ft. counter in a small town outside San Francisco — one roaster, one pastry case, and an uncompromising standard for what a cup of coffee should be.",
    {
      x: inch(leftX), y: inch(bodyY + 380),
      w: inch(560), h: inch(220),
      fontFace: F_DISPLAY, fontSize: pt(24), color: C.espresso2,
      lineSpacingMultiple: 1.5, margin: 0, valign: "top",
    }
  );
  slide.addText(
    "Fifteen years later, that same standard operates at scale across more than one hundred shops on the West Coast, serving the same coffee, the same butter-chocolate croissant, and the same quiet ritual to millions of guests a year.",
    {
      x: inch(leftX), y: inch(bodyY + 620),
      w: inch(560), h: inch(220),
      fontFace: F_DISPLAY, fontSize: pt(24), color: C.espresso2,
      lineSpacingMultiple: 1.5, margin: 0, valign: "top",
    }
  );

  // ---- RIGHT timeline (anchored bottom of column)
  // Each row: 140px year | 1fr title | auto kpi, 22px padding-bottom + border
  const tlData = [
    ["2010", "A 200 sq. ft. counter opens in a small town outside San Francisco.", "Shop 01"],
    ["2013", "First wholesale roastery brought in-house. Signature croissant debuts.", "Shops 01 → 06"],
    ["2017", "Expansion into Los Angeles and San Diego.", "Shops 06 → 34"],
    ["2021", "Seattle market opens; first Savanna roasting facility built to spec.", "Shops 34 → 72"],
    ["2026", "100+ shops. Franchise program opens to qualified operators.", "Today"],
  ];
  const tlRowH = 145; // ~28 title line + extra spacing for two-line wraps
  const tlTotalH = tlRowH * tlData.length;
  // Anchor near bottom of body (above bottom bar at y = 1080-64-18 = 998)
  const tlBottom = 1080 - PAD_Y_PX - 60; // ~956
  const tlTop = tlBottom - tlTotalH;     // ~302
  const yearW = 140;
  const kpiW = 200;
  const titleX = rightX + yearW + 32;
  const titleW = colW - yearW - 32 - kpiW - 32;

  // Top border line
  addHr(slide, rightX, tlTop, colW, C.rule);

  tlData.forEach((row, i) => {
    const y = tlTop + 24 + i * tlRowH; // padding-top + spacing
    // Year — JetBrains Mono 20px = 10pt, dusk
    slide.addText(row[0], {
      x: inch(rightX), y: inch(y),
      w: inch(yearW), h: inch(28),
      fontFace: F_BODY, fontSize: pt(20), color: C.dusk,
      charSpacing: 0.8, margin: 0, valign: "top",
    });
    // Title — Libre Caslon Text 28px = 14pt
    slide.addText(row[1], {
      x: inch(titleX), y: inch(y - 4),
      w: inch(titleW), h: inch(96),
      fontFace: F_DISPLAY, fontSize: pt(28), color: C.espresso,
      lineSpacingMultiple: 1.25, margin: 0, valign: "top",
    });
    // KPI — JetBrains Mono uppercase 14px = 7pt
    slide.addText(row[2].toUpperCase(), {
      x: inch(rightX + colW - kpiW), y: inch(y),
      w: inch(kpiW), h: inch(28),
      fontFace: F_BODY, fontSize: pt(14), color: C.ink60,
      charSpacing: 1.1, align: "right", margin: 0, valign: "top",
    });
    // Bottom border (skip last)
    if (i < tlData.length - 1) {
      addHr(slide, rightX, tlTop + (i + 1) * tlRowH, colW, C.rule);
    }
  });
}

// ============================================================
// SLIDE 03 — TRACTION
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bone };
  addChrome(slide, {
    rightLabel: "Footprint & Traction",
    bottomLeft: "Figures illustrative; confirm against current FDD.",
    pageLabel:  "03 / 09",
  });

  // Body margin-top 48
  const bodyY = PAD_Y_PX + 36 + 48; // 148

  // ---- HEAD: 2 cols
  // Left: eyebrow + h2 (88px=44pt)
  slide.addText("02 · BY THE NUMBERS", {
    x: inch(PAD_X_PX), y: inch(bodyY),
    w: inch(600), h: inch(24),
    fontFace: F_BODY, fontSize: pt(14), color: C.dusk,
    charSpacing: 2.8, margin: 0, valign: "top",
  });
  slide.addText("A proven\nWest Coast operator.", {
    x: inch(PAD_X_PX), y: inch(bodyY + 32),
    w: inch(800), h: inch(280),
    fontFace: F_DISPLAY, fontSize: pt(88), color: C.espresso,
    lineSpacingMultiple: 0.95, charSpacing: -0.9, margin: 0, valign: "top",
  });

  // Right: paragraph 20px=10pt, max-width 520
  slide.addText(
    "100+ shops across four of the country's most demanding coffee markets. Fifteen years of consecutive year-over-year same-store growth, company-operated through 2025.",
    {
      x: inch(PAD_X_PX + 864 + 96), y: inch(bodyY + 90),
      w: inch(520), h: inch(160),
      fontFace: F_BODY, fontSize: pt(20), color: C.ink60,
      lineSpacingMultiple: 1.5, margin: 0, valign: "bottom",
    }
  );

  // ---- KPI grid — 4 cols
  const kpiTop = bodyY + 290;
  const kpiH = 220;
  addHr(slide, PAD_X_PX, kpiTop, CONTENT_W_PX, C.rule);
  addHr(slide, PAD_X_PX, kpiTop + kpiH, CONTENT_W_PX, C.rule);
  const kpis = [
    { label: "Shops open",           value: "108", unit: "locations", sub: "Company-operated across California & Washington." },
    { label: "Years operating",      value: "15",  unit: "years",     sub: "Profitable at the unit level since year two." },
    { label: "Guests served / yr",   value: "24",  unit: "M",         sub: "Roughly one guest every 1.3 seconds, system-wide." },
    { label: "Same-store growth",    value: "+9",  unit: "% YoY",     sub: "Trailing three-year average across mature units." },
  ];
  const kpiColW = CONTENT_W_PX / 4; // 432
  kpis.forEach((k, i) => {
    const cx = PAD_X_PX + i * kpiColW;
    const innerX = cx + (i === 0 ? 0 : 40);
    const innerW = kpiColW - (i === 0 ? 40 : 80) + (i === 3 ? 40 : 0);
    // Label — mono 13px = 6.5pt
    slide.addText(k.label.toUpperCase(), {
      x: inch(innerX), y: inch(kpiTop + 32),
      w: inch(innerW), h: inch(20),
      fontFace: F_BODY, fontSize: pt(13), color: C.dusk,
      charSpacing: 2.1, margin: 0, valign: "top",
    });
    // Value 120px=60pt + small unit 36px=18pt
    slide.addText([
      { text: k.value, options: { color: C.espresso, fontSize: pt(120), fontFace: F_DISPLAY, charSpacing: -3.6 } },
      { text: " " + k.unit, options: { color: C.dusk, fontSize: pt(36), fontFace: F_BODY } },
    ], {
      x: inch(innerX), y: inch(kpiTop + 80),
      w: inch(innerW), h: inch(140),
      lineSpacingMultiple: 0.9, valign: "top", margin: 0,
    });
    // Vertical separator (right edge of cell, not last)
    if (i < 3) {
      addVr(slide, cx + kpiColW, kpiTop + 16, kpiH - 32, C.rule);
    }
  });

  // Subtitles — fit below value
  kpis.forEach((k, i) => {
    const cx = PAD_X_PX + i * kpiColW;
    const innerX = cx + (i === 0 ? 0 : 40);
    slide.addText(k.sub, {
      x: inch(innerX), y: inch(kpiTop + kpiH + 14),
      w: inch(280), h: inch(48),
      fontFace: F_BODY, fontSize: pt(16), color: C.ink60,
      lineSpacingMultiple: 1.4, margin: 0, valign: "top",
    });
  });

  // ---- Map row
  const mapTop = kpiTop + kpiH + 70;
  const mapH = 200;
  // Left: map placeholder (1.4fr) | Right: city-list (1fr)
  const mapTotalW = CONTENT_W_PX - 80; // gap 80
  const mapLeftW = Math.round(mapTotalW * 1.4 / 2.4);  // ~989
  const mapRightW = mapTotalW - mapLeftW;              // ~659
  const mapRightX = PAD_X_PX + mapLeftW + 80;

  // Map placeholder: bone-2 with diagonal stripe pattern (simulated with solid)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: inch(PAD_X_PX), y: inch(mapTop),
    w: inch(mapLeftW), h: inch(mapH),
    fill: { color: C.bone2 },
    line: { color: C.rule, width: 0.75 },
  });

  // City dots inside map (4 cities horizontally)
  const cities = [
    { n: "42", lbl: "SF Bay",      big: true  },
    { n: "18", lbl: "Seattle",     big: false },
    { n: "32", lbl: "Los Angeles", big: true  },
    { n: "16", lbl: "San Diego",   big: false },
  ];
  const cityRegionLeft = PAD_X_PX + 80;
  const cityRegionW = mapLeftW - 160;
  cities.forEach((c, i) => {
    const cxCenter = cityRegionLeft + (cityRegionW / cities.length) * (i + 0.5);
    const cy = mapTop + mapH / 2;
    const dotSize = c.big ? 22 : 14;
    const haloSize = c.big ? 42 : 26;
    // Halo (subtle)
    slide.addShape(pres.shapes.OVAL, {
      x: inch(cxCenter - haloSize/2), y: inch(cy - haloSize/2),
      w: inch(haloSize), h: inch(haloSize),
      fill: { color: C.acacia, transparency: 80 },
      line: { color: C.acacia, width: 0 },
    });
    // Dot
    slide.addShape(pres.shapes.OVAL, {
      x: inch(cxCenter - dotSize/2), y: inch(cy - dotSize/2),
      w: inch(dotSize), h: inch(dotSize),
      fill: { color: C.espresso }, line: { color: C.espresso, width: 0 },
    });
    // Number above dot — Libre Caslon 22px = 11pt
    slide.addText(c.n, {
      x: inch(cxCenter - 60), y: inch(cy - 60),
      w: inch(120), h: inch(28),
      fontFace: F_DISPLAY, fontSize: pt(22), color: C.dusk,
      align: "center", valign: "bottom", margin: 0,
    });
    // Label below — mono 13px = 6.5pt uppercase
    slide.addText(c.lbl.toUpperCase(), {
      x: inch(cxCenter - 80), y: inch(cy + 24),
      w: inch(160), h: inch(20),
      fontFace: F_BODY, fontSize: pt(13), color: C.espresso,
      charSpacing: 1.6, align: "center", valign: "top", margin: 0,
    });
  });

  // City list (right side) — 4 rows of: name | bar | count
  const list = [
    { name: "San Francisco Bay", w: 100, count: "42 shops" },
    { name: "Los Angeles",       w: 76,  count: "32 shops" },
    { name: "Seattle",           w: 43,  count: "18 shops" },
    { name: "San Diego",         w: 38,  count: "16 shops" },
  ];
  const listRowH = (mapH - 8) / list.length;
  const barW = 120;
  const barTrackH = 6;
  list.forEach((r, i) => {
    const ry = mapTop + i * listRowH + 18;
    // Name — Libre Caslon 22px = 11pt
    slide.addText(r.name, {
      x: inch(mapRightX), y: inch(ry),
      w: inch(mapRightW - barW - 120), h: inch(28),
      fontFace: F_DISPLAY, fontSize: pt(22), color: C.espresso,
      margin: 0, valign: "top",
    });
    // Bar track at right end before count (right-aligned blocks)
    const countX = mapRightX + mapRightW - 100;
    const barX = countX - barW - 24;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: inch(barX), y: inch(ry + 12),
      w: inch(barW), h: inch(barTrackH),
      fill: { color: C.bone2 }, line: { color: C.bone2, width: 0 },
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x: inch(barX), y: inch(ry + 12),
      w: inch(barW * r.w / 100), h: inch(barTrackH),
      fill: { color: C.acacia }, line: { color: C.acacia, width: 0 },
    });
    // Count — mono 16px = 8pt
    slide.addText(r.count.toUpperCase(), {
      x: inch(countX), y: inch(ry),
      w: inch(100), h: inch(28),
      fontFace: F_BODY, fontSize: pt(16), color: C.dusk,
      charSpacing: 1.3, align: "right", margin: 0, valign: "top",
    });
    // Bottom border
    addHr(slide, mapRightX, ry + listRowH - 8, mapRightW, C.rule);
  });
}

// ============================================================
// SLIDE 04 — WHY SAVANNA WINS
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bone };
  addChrome(slide, {
    rightLabel: "Why Savanna Wins",
    bottomLeft: "Qualitative claims supported by internal NPS and guest research, 2023–2025.",
    pageLabel:  "04 / 09",
  });

  // Body margin-top 56
  const bodyY = PAD_Y_PX + 36 + 56; // 156
  const colW = (CONTENT_W_PX - 80) / 2; // 824
  const leftX = PAD_X_PX;
  const rightX = PAD_X_PX + colW + 80;

  // LEFT
  slide.addText("03 · DIFFERENTIATION", {
    x: inch(leftX), y: inch(bodyY),
    w: inch(600), h: inch(24),
    fontFace: F_BODY, fontSize: pt(14), color: C.dusk,
    charSpacing: 2.8, margin: 0, valign: "top",
  });
  // Headline 104px = 52pt: "Quality is the\nonly moat." with "moat." italic dusk
  slide.addText([
    { text: "Quality is the", options: { color: C.espresso, breakLine: true } },
    { text: "only ",          options: { color: C.espresso, breakLine: false } },
    { text: "moat.",          options: { color: C.dusk, italic: true } },
  ], {
    x: inch(leftX), y: inch(bodyY + 32),
    w: inch(colW), h: inch(280),
    fontFace: F_DISPLAY, fontSize: pt(104),
    lineSpacingMultiple: 0.92, charSpacing: -1.0, margin: 0, valign: "top",
  });
  // Intro 20px=10pt
  slide.addText(
    "We do not compete on speed, price, or loyalty apps. We compete on the cup in the guest's hand and the croissant next to it — and we have for fifteen years.",
    {
      x: inch(leftX), y: inch(bodyY + 340),
      w: inch(540), h: inch(140),
      fontFace: F_BODY, fontSize: pt(20), color: C.ink60,
      lineSpacingMultiple: 1.55, margin: 0, valign: "top",
    }
  );

  // Standard line block
  const stdY = bodyY + 540;
  addHr(slide, leftX, stdY, colW, C.rule);
  slide.addText("OUR STANDARD, IN ONE LINE", {
    x: inch(leftX), y: inch(stdY + 28),
    w: inch(colW), h: inch(20),
    fontFace: F_BODY, fontSize: pt(13), color: C.dusk,
    charSpacing: 2.1, margin: 0, valign: "top",
  });
  slide.addText(
    "Every cup served at a franchise shop must be indistinguishable from the first one we ever poured.",
    {
      x: inch(leftX), y: inch(stdY + 60),
      w: inch(540), h: inch(140),
      fontFace: F_DISPLAY, fontSize: pt(30), color: C.espresso,
      italic: true, lineSpacingMultiple: 1.35, margin: 0, valign: "top",
    }
  );

  // RIGHT — diff list
  const diffs = [
    { n: "01", h: "Extreme quality, enforced end-to-end.", p: "In-house roastery, single-sourced beans, daily QA on every espresso machine in the network. Master-roaster sign-off on every lot before it ships to a shop." },
    { n: "02", h: "The butter-chocolate croissant.",       p: "A proprietary laminated pastry baked off from a central commissary and finished on-site. Now the single highest-margin SKU in the system and the #1 reason guests name when asked why they return." },
    { n: "03", h: "A brand guests already know.",          p: "Fifteen years of West Coast density mean franchisees open on day one into neighborhoods where the name, the cup, and the croissant are already familiar." },
    { n: "04", h: "Operator discipline over novelty.",     p: "No seasonal gimmicks, no app-driven discount cycles. A small, deliberate menu that staff can execute flawlessly and guests can trust to be the same every visit." },
  ];
  const diffTop = bodyY;
  const diffRowH = 168;
  // Top border
  addHr(slide, rightX, diffTop, colW, C.rule);
  diffs.forEach((d, i) => {
    const dy = diffTop + 28 + i * diffRowH;
    // Number — mono 16px=8pt acacia
    slide.addText(d.n, {
      x: inch(rightX), y: inch(dy + 10),
      w: inch(56), h: inch(20),
      fontFace: F_BODY, fontSize: pt(16), color: C.acacia,
      charSpacing: 1.6, margin: 0, valign: "top",
    });
    // h3 — Libre Caslon 34px = 17pt
    slide.addText(d.h, {
      x: inch(rightX + 56 + 24), y: inch(dy),
      w: inch(colW - 80), h: inch(40),
      fontFace: F_DISPLAY, fontSize: pt(34), color: C.espresso,
      lineSpacingMultiple: 1.1, charSpacing: -0.3, margin: 0, valign: "top",
    });
    // p — Inter Tight 17px = 8.5pt ink-60
    slide.addText(d.p, {
      x: inch(rightX + 56 + 24), y: inch(dy + 50),
      w: inch(colW - 80), h: inch(96),
      fontFace: F_BODY, fontSize: pt(17), color: C.ink60,
      lineSpacingMultiple: 1.55, margin: 0, valign: "top",
    });
    // Bottom border
    addHr(slide, rightX, dy + diffRowH - 28, colW, C.rule);
  });
}

// ============================================================
// SLIDE 05 — THE SIGNATURE
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.espresso };
  addChrome(slide, {
    rightLabel: "The Signature",
    bottomLeft: "Margin and ticket-lift figures are internal averages, trailing 12 months.",
    pageLabel:  "05 / 09",
    dark: true,
  });

  // Body grid 1.05 / 1, gap 96, margin-top 48
  const bodyY = PAD_Y_PX + 36 + 48; // 148
  const totalW = CONTENT_W_PX - 96;
  const leftW = Math.round(totalW * 1.05 / 2.05); // ~836
  const rightW = totalW - leftW;                  // ~796
  const leftX = PAD_X_PX;
  const rightX = PAD_X_PX + leftW + 96;

  // RIGHT: croissants image, height ~720 (centered vertically in body area)
  const sigImgH = 720;
  const sigImgY = bodyY + 30;
  // Use an overlay shape behind the image as the dark frame in case of any gap
  slide.addShape(pres.shapes.RECTANGLE, {
    x: inch(rightX), y: inch(sigImgY),
    w: inch(rightW), h: inch(sigImgH),
    fill: { color: "0d1812" }, line: { color: C.boneSoft18, width: 0.75 },
  });
  slide.addImage({
    path: path.resolve(__dirname, "croissants.png"),
    x: inch(rightX), y: inch(sigImgY),
    w: inch(rightW), h: inch(sigImgH),
    sizing: { type: "cover", w: inch(rightW), h: inch(sigImgH) },
  });

  // Caption box bottom-left of image — mono 12px=6pt
  const capY = sigImgY + sigImgH - 18 - 28;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: inch(rightX + 18), y: inch(capY),
    w: inch(280), h: inch(28),
    fill: { color: "1A2A21", transparency: 25 },
    line: { color: "1A2A21", width: 0 },
  });
  slide.addText("LAMINATED · IN-HOUSE · DAILY", {
    x: inch(rightX + 18 + 12), y: inch(capY),
    w: inch(280 - 24), h: inch(28),
    fontFace: F_BODY, fontSize: pt(12), color: C.boneSoft82,
    charSpacing: 1.9, valign: "middle", margin: 0,
  });

  // LEFT
  // Eyebrow — acacia2
  slide.addText("04 · PRODUCT", {
    x: inch(leftX), y: inch(bodyY + 60),
    w: inch(leftW), h: inch(24),
    fontFace: F_BODY, fontSize: pt(14), color: C.acacia2,
    charSpacing: 2.8, margin: 0, valign: "top",
  });

  // Title — Libre Caslon italic 128px = 64pt
  // "The Butter-Chocolate" non-italic span, then italic "Croissant."
  slide.addText([
    { text: "The Butter-Chocolate", options: { italic: false, color: C.bone, breakLine: true } },
    { text: "Croissant.",           options: { italic: true,  color: C.bone } },
  ], {
    x: inch(leftX), y: inch(bodyY + 96),
    w: inch(leftW), h: inch(320),
    fontFace: F_DISPLAY, fontSize: pt(128),
    lineSpacingMultiple: 0.95, charSpacing: -1.3, margin: 0, valign: "top",
  });

  // Body 24px=12pt
  slide.addText(
    "Laminated with cultured European butter, folded thirty-two times, and filled with a 64% dark chocolate baton at the final turn. Produced at our Bay Area commissary and finished in-shop each morning.",
    {
      x: inch(leftX), y: inch(bodyY + 510),
      w: inch(560), h: inch(180),
      fontFace: F_DISPLAY, fontSize: pt(24), color: C.boneSoft82,
      lineSpacingMultiple: 1.5, margin: 0, valign: "top",
    }
  );

  // Stats — top border line, 3 stats 48px gap
  const statTop = bodyY + 720;
  addHr(slide, leftX, statTop, 560, C.boneSoft20);
  const stats = [
    { v: "#1",  l: "SKU by units"     },
    { v: "72%", l: "Gross margin"     },
    { v: "1.8×",l: "Avg. ticket lift" },
  ];
  const statColW = 560 / 3;
  stats.forEach((s, i) => {
    slide.addText(s.v, {
      x: inch(leftX + i * statColW), y: inch(statTop + 28),
      w: inch(statColW - 24), h: inch(72),
      fontFace: F_DISPLAY, fontSize: pt(56), color: C.acacia2,
      lineSpacingMultiple: 1.0, charSpacing: -1.1, margin: 0, valign: "top",
    });
    slide.addText(s.l.toUpperCase(), {
      x: inch(leftX + i * statColW), y: inch(statTop + 100),
      w: inch(statColW - 24), h: inch(20),
      fontFace: F_BODY, fontSize: pt(12), color: C.boneSoft55,
      charSpacing: 1.9, margin: 0, valign: "top",
    });
  });
}

// ============================================================
// SLIDE 06 — UNIT ECONOMICS
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bone };
  addChrome(slide, {
    rightLabel: "Unit Economics",
    bottomLeft: "Figures illustrative only. Not a guarantee of future performance.",
    pageLabel:  "06 / 09",
  });

  const bodyY = PAD_Y_PX + 36 + 48; // 148

  // ---- HEAD: 2 cols
  slide.addText("05 · THE BUSINESS", {
    x: inch(PAD_X_PX), y: inch(bodyY),
    w: inch(600), h: inch(24),
    fontFace: F_BODY, fontSize: pt(14), color: C.dusk,
    charSpacing: 2.8, margin: 0, valign: "top",
  });
  slide.addText("Built for\noperators.", {
    x: inch(PAD_X_PX), y: inch(bodyY + 32),
    w: inch(700), h: inch(180),
    fontFace: F_DISPLAY, fontSize: pt(88), color: C.espresso,
    lineSpacingMultiple: 0.95, charSpacing: -0.9, margin: 0, valign: "top",
  });
  slide.addText(
    "Illustrative unit economics for a single Savanna café. Actual results vary by market, format, and operator; franchisees should review the current Franchise Disclosure Document before relying on any figure.",
    {
      x: inch(PAD_X_PX + 864 + 96), y: inch(bodyY + 80),
      w: inch(500), h: inch(140),
      fontFace: F_BODY, fontSize: pt(18), color: C.ink60,
      lineSpacingMultiple: 1.5, margin: 0, valign: "bottom",
    }
  );

  // ---- GRID: 1.1fr / 1fr, gap 64
  const gridTop = bodyY + 240;
  const gridTotalW = CONTENT_W_PX - 64;
  const gridLeftW = Math.round(gridTotalW * 1.1 / 2.1); // ~872
  const gridRightW = gridTotalW - gridLeftW;            // ~792
  const gridLeftX = PAD_X_PX;
  const gridRightX = PAD_X_PX + gridLeftW + 64;

  // ---- LEFT: econ-table
  const econRows = [
    { k: "Initial investment range",     v: "$480K – $720K",    strong: false },
    { k: "Franchise fee (one-time)",     v: "$45,000",          strong: false },
    { k: "Royalty",                      v: "6.0% of gross sales", strong: false },
    { k: "Brand fund",                   v: "2.0% of gross sales", strong: false },
    { k: "Average unit volume (AUV)",    v: "$1.46M",           strong: false },
    { k: "Food & beverage COGS",         v: "26 – 28%",         strong: false },
    { k: "Shop-level EBITDA margin",     v: "22 – 25%",         strong: true  },
  ];
  // Top strong border
  addHr(slide, gridLeftX, gridTop, gridLeftW, C.ruleStrong);
  const econRowH = 60;
  econRows.forEach((r, i) => {
    const ry = gridTop + i * econRowH + 14;
    slide.addText(r.k, {
      x: inch(gridLeftX), y: inch(ry),
      w: inch(gridLeftW - 240), h: inch(36),
      fontFace: F_DISPLAY, fontSize: pt(24), color: C.espresso,
      margin: 0, valign: "top",
    });
    slide.addText(r.v, {
      x: inch(gridLeftX + gridLeftW - 240), y: inch(ry),
      w: inch(240), h: inch(36),
      fontFace: F_BODY, fontSize: pt(r.strong ? 28 : 22),
      color: r.strong ? C.espresso : C.dusk,
      align: "right", margin: 0, valign: "top",
      charSpacing: 0.4,
    });
    addHr(slide, gridLeftX, gridTop + (i + 1) * econRowH, gridLeftW, C.rule);
  });
  // Foot
  slide.addText("ILLUSTRATIVE. PLACEHOLDERS — CONFIRM AGAINST 2026 FDD.", {
    x: inch(gridLeftX), y: inch(gridTop + econRows.length * econRowH + 12),
    w: inch(gridLeftW), h: inch(20),
    fontFace: F_BODY, fontSize: pt(12), color: C.ink40,
    charSpacing: 1.7, margin: 0, valign: "top",
  });

  // ---- RIGHT: econ-chart panel
  const panelH = econRows.length * econRowH + 12; // align bottom with table
  slide.addShape(pres.shapes.RECTANGLE, {
    x: inch(gridRightX), y: inch(gridTop),
    w: inch(gridRightW), h: inch(panelH),
    fill: { color: C.paper }, line: { color: C.rule, width: 0.75 },
  });
  // h4
  slide.addText("YEAR-ONE → YEAR-THREE REVENUE RAMP", {
    x: inch(gridRightX + 40), y: inch(gridTop + 30),
    w: inch(gridRightW - 80), h: inch(20),
    fontFace: F_BODY, fontSize: pt(13), color: C.dusk,
    charSpacing: 2.1, margin: 0, valign: "top",
  });
  // Bars
  const barRows = [
    { y: "YEAR 01", w: 58,  v: "$1.05M" },
    { y: "YEAR 02", w: 78,  v: "$1.32M" },
    { y: "YEAR 03", w: 92,  v: "$1.46M" },
    { y: "MATURE",  w: 100, v: "$1.62M" },
  ];
  const barsTop = gridTop + 80;
  const barRowH = 48;
  barRows.forEach((b, i) => {
    const by = barsTop + i * barRowH;
    // Year label
    slide.addText(b.y, {
      x: inch(gridRightX + 40), y: inch(by + 4),
      w: inch(120), h: inch(22),
      fontFace: F_BODY, fontSize: pt(15), color: C.ink60,
      charSpacing: 1.2, margin: 0, valign: "middle",
    });
    // Track
    const trackX = gridRightX + 40 + 120 + 20;
    const trackW = gridRightW - (40 + 120 + 20 + 90 + 20 + 40);
    slide.addShape(pres.shapes.RECTANGLE, {
      x: inch(trackX), y: inch(by + 4),
      w: inch(trackW), h: inch(22),
      fill: { color: C.bone2 }, line: { color: C.bone2, width: 0 },
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x: inch(trackX), y: inch(by + 4),
      w: inch(trackW * b.w / 100), h: inch(22),
      fill: { color: C.acacia }, line: { color: C.acacia, width: 0 },
    });
    // Value
    slide.addText(b.v, {
      x: inch(trackX + trackW + 20), y: inch(by),
      w: inch(90), h: inch(30),
      fontFace: F_DISPLAY, fontSize: pt(20), color: C.espresso,
      align: "right", margin: 0, valign: "middle",
    });
  });
  // Payback divider + row
  const paybackY = barsTop + barRows.length * barRowH + 20;
  addHr(slide, gridRightX + 40, paybackY, gridRightW - 80, C.rule);
  slide.addText("TARGET PAYBACK PERIOD", {
    x: inch(gridRightX + 40), y: inch(paybackY + 28),
    w: inch(gridRightW - 80 - 200), h: inch(28),
    fontFace: F_BODY, fontSize: pt(13), color: C.dusk,
    charSpacing: 2.1, margin: 0, valign: "middle",
  });
  slide.addText([
    { text: "2.8", options: { color: C.espresso, fontSize: pt(56), fontFace: F_DISPLAY, charSpacing: -1.1 } },
    { text: " years", options: { color: C.dusk, fontSize: pt(20), fontFace: F_BODY } },
  ], {
    x: inch(gridRightX + gridRightW - 220), y: inch(paybackY + 14),
    w: inch(180), h: inch(56),
    align: "right", margin: 0, valign: "middle",
  });
}

// ============================================================
// SLIDE 07 — SUPPORT
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bone };
  addChrome(slide, {
    rightLabel: "Franchisee Support",
    bottomLeft: "Program details summarized; full obligations and rights in the FDD.",
    pageLabel:  "07 / 09",
  });

  const bodyY = PAD_Y_PX + 36 + 56; // 156

  // HEAD
  slide.addText("06 · PARTNERSHIP", {
    x: inch(PAD_X_PX), y: inch(bodyY),
    w: inch(600), h: inch(24),
    fontFace: F_BODY, fontSize: pt(14), color: C.dusk,
    charSpacing: 2.8, margin: 0, valign: "top",
  });
  slide.addText("We open\nshops with you.", {
    x: inch(PAD_X_PX), y: inch(bodyY + 32),
    w: inch(700), h: inch(180),
    fontFace: F_DISPLAY, fontSize: pt(88), color: C.espresso,
    lineSpacingMultiple: 0.95, charSpacing: -0.9, margin: 0, valign: "top",
  });
  slide.addText(
    "First-time franchise investors are our primary partner. The program is built so an operator with capital and discipline — but no prior café experience — can open and run a Savanna shop on our playbook.",
    {
      x: inch(PAD_X_PX + 864 + 96), y: inch(bodyY + 80),
      w: inch(520), h: inch(140),
      fontFace: F_BODY, fontSize: pt(20), color: C.ink60,
      lineSpacingMultiple: 1.5, margin: 0, valign: "bottom",
    }
  );

  // 3 sup-cards
  const cards = [
    {
      phase: "Phase 01 · Pre-open",
      h: "Site, build, & approval.",
      items: [
        "Territory analysis and site selection with our real estate team.",
        "Architectural and build-out packages to spec, from any of three approved formats.",
        "Equipment sourcing through our supply chain at corporate-negotiated pricing.",
        "Permit and inspection support in every market we operate in.",
      ],
    },
    {
      phase: "Phase 02 · Training",
      h: "Savanna Academy.",
      items: [
        "Six-week operator certification at our Bay Area training shop.",
        "Two-week barista immersion for your opening team.",
        "Commissary & pastry-handling certification for shift leads.",
        "On-site opening team embedded for the first thirty days of trading.",
      ],
    },
    {
      phase: "Phase 03 · Ongoing",
      h: "Running the shop.",
      items: [
        "Dedicated franchise business consultant and quarterly P&L review.",
        "Coffee and pastry supply direct from our roastery and commissary.",
        "Regional and brand-fund marketing, creative, and local-store programs.",
        "POS, inventory, labor, and guest-feedback platform included in royalty.",
      ],
    },
  ];
  const gridTop = bodyY + 280;
  const cardW = CONTENT_W_PX / 3;
  // Top strong border
  addHr(slide, PAD_X_PX, gridTop, CONTENT_W_PX, C.ruleStrong);

  cards.forEach((c, i) => {
    const cx = PAD_X_PX + i * cardW;
    const innerX = cx + (i === 0 ? 0 : 36);
    const innerW = cardW - (i === 0 ? 36 : 72) + (i === 2 ? 36 : 0);
    // Phase
    slide.addText(c.phase.toUpperCase(), {
      x: inch(innerX), y: inch(gridTop + 36),
      w: inch(innerW), h: inch(20),
      fontFace: F_BODY, fontSize: pt(12), color: C.acacia,
      charSpacing: 2.2, margin: 0, valign: "top",
    });
    // h3 — Libre Caslon 38px = 19pt
    slide.addText(c.h, {
      x: inch(innerX), y: inch(gridTop + 64),
      w: inch(innerW), h: inch(70),
      fontFace: F_DISPLAY, fontSize: pt(38), color: C.espresso,
      lineSpacingMultiple: 1.05, charSpacing: -0.4, margin: 0, valign: "top",
    });
    // Items
    const liTop = gridTop + 150;
    const liH = 80;
    c.items.forEach((li, j) => {
      const ly = liTop + j * liH;
      // Em-dash bullet
      slide.addText("—", {
        x: inch(innerX), y: inch(ly),
        w: inch(20), h: inch(20),
        fontFace: F_BODY, fontSize: pt(17), color: C.dusk,
        margin: 0, valign: "top",
      });
      slide.addText(li, {
        x: inch(innerX + 26), y: inch(ly),
        w: inch(innerW - 30), h: inch(72),
        fontFace: F_BODY, fontSize: pt(17), color: C.espresso2,
        lineSpacingMultiple: 1.4, margin: 0, valign: "top",
      });
      // Dashed bottom border (use solid as fallback)
      addHr(slide, innerX, ly + liH - 6, innerW, C.rule);
    });
    // Right vertical separator (between cards, not last)
    if (i < 2) {
      addVr(slide, cx + cardW, gridTop + 16, liTop - gridTop + 4 * liH + 16, C.rule);
    }
  });
}

// ============================================================
// SLIDE 08 — EXPANSION
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bone };
  addChrome(slide, {
    rightLabel: "Expansion Plan",
    bottomLeft: "Territory availability and investment ranges subject to change.",
    pageLabel:  "08 / 09",
  });

  const bodyY = PAD_Y_PX + 36 + 56; // 156
  const totalW = CONTENT_W_PX - 96;
  const leftW = Math.round(totalW * 1 / 2.1);     // ~777
  const rightW = totalW - leftW;                   // ~855
  const leftX = PAD_X_PX;
  const rightX = PAD_X_PX + leftW + 96;

  // LEFT
  slide.addText("07 · WHERE WE'RE GOING", {
    x: inch(leftX), y: inch(bodyY),
    w: inch(leftW), h: inch(24),
    fontFace: F_BODY, fontSize: pt(14), color: C.dusk,
    charSpacing: 2.8, margin: 0, valign: "top",
  });
  // Headline 104px = 52pt: "Three\nformats, one\nstandard." with "standard." italic dusk
  slide.addText([
    { text: "Three",          options: { color: C.espresso, breakLine: true } },
    { text: "formats, one",   options: { color: C.espresso, breakLine: true } },
    { text: "standard.",      options: { color: C.dusk, italic: true } },
  ], {
    x: inch(leftX), y: inch(bodyY + 32),
    w: inch(leftW), h: inch(380),
    fontFace: F_DISPLAY, fontSize: pt(104),
    lineSpacingMultiple: 0.92, charSpacing: -1.0, margin: 0, valign: "top",
  });
  slide.addText(
    "We are awarding territories in existing Savanna markets — where brand awareness is already high — and in select second-ring metros where our research shows strong daypart demand and acceptable rents.",
    {
      x: inch(leftX), y: inch(bodyY + 440),
      w: inch(leftW - 40), h: inch(160),
      fontFace: F_BODY, fontSize: pt(20), color: C.ink60,
      lineSpacingMultiple: 1.55, margin: 0, valign: "top",
    }
  );

  // Formats list
  const formats = [
    { n: "Flagship café",      sz: "1,800 – 2,400 sq. ft.", inv: "$620K – $720K" },
    { n: "Neighborhood shop",  sz: "900 – 1,400 sq. ft.",   inv: "$480K – $580K" },
    { n: "Kiosk & transit",    sz: "200 – 500 sq. ft.",     inv: "$210K – $290K" },
  ];
  const fmtTop = bodyY + 620;
  addHr(slide, leftX, fmtTop, leftW, C.rule);
  const fmtRowH = 64;
  formats.forEach((f, i) => {
    const fy = fmtTop + 22 + i * fmtRowH;
    slide.addText(f.n, {
      x: inch(leftX), y: inch(fy),
      w: inch(leftW * 0.42), h: inch(36),
      fontFace: F_DISPLAY, fontSize: pt(28), color: C.espresso,
      margin: 0, valign: "top",
    });
    slide.addText(f.sz.toUpperCase(), {
      x: inch(leftX + leftW * 0.42), y: inch(fy + 6),
      w: inch(leftW * 0.30), h: inch(24),
      fontFace: F_BODY, fontSize: pt(14), color: C.ink60,
      charSpacing: 1.4, margin: 0, valign: "top",
    });
    slide.addText(f.inv.toUpperCase(), {
      x: inch(leftX + leftW * 0.72), y: inch(fy + 4),
      w: inch(leftW * 0.28), h: inch(24),
      fontFace: F_BODY, fontSize: pt(16), color: C.dusk,
      charSpacing: 0.6, align: "right", margin: 0, valign: "top",
    });
    addHr(slide, leftX, fmtTop + 22 + (i + 1) * fmtRowH - 6, leftW, C.rule);
  });

  // RIGHT — target panel
  const panelY = bodyY;
  const panelH = CONTENT_H_PX - 36 - 56 - 60;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: inch(rightX), y: inch(panelY),
    w: inch(rightW), h: inch(panelH),
    fill: { color: C.paper }, line: { color: C.rule, width: 0.75 },
  });
  slide.addText("2026 – 2028 TARGET TERRITORIES", {
    x: inch(rightX + 40), y: inch(panelY + 36),
    w: inch(rightW - 80), h: inch(20),
    fontFace: F_BODY, fontSize: pt(13), color: C.dusk,
    charSpacing: 2.1, margin: 0, valign: "top",
  });

  const targets = [
    { p: "Sacramento & East Bay", s: "Existing CA market · infill",          u: "12 units" },
    { p: "Orange County",         s: "Adjacent to LA market",                 u: "10 units" },
    { p: "Portland, OR",          s: "New market · regional density play",   u: "8 units"  },
    { p: "Phoenix & Scottsdale",  s: "New market · suburban",                u: "6 units"  },
    { p: "Denver metro",          s: "New market · pilot",                   u: "4 units"  },
  ];
  const tgtTop = panelY + 90;
  const tgtRowH = 76;
  targets.forEach((t, i) => {
    const ty = tgtTop + i * tgtRowH;
    slide.addText(t.p, {
      x: inch(rightX + 40), y: inch(ty + 14),
      w: inch(rightW - 80 - 100), h: inch(34),
      fontFace: F_DISPLAY, fontSize: pt(24), color: C.espresso,
      margin: 0, valign: "top",
    });
    slide.addText(t.s, {
      x: inch(rightX + 40), y: inch(ty + 40),
      w: inch(rightW - 80 - 100), h: inch(20),
      fontFace: F_BODY, fontSize: pt(14), color: C.ink60,
      margin: 0, valign: "top",
    });
    slide.addText(t.u.toUpperCase(), {
      x: inch(rightX + rightW - 140), y: inch(ty + 18),
      w: inch(100), h: inch(24),
      fontFace: F_BODY, fontSize: pt(14), color: C.dusk,
      charSpacing: 1.1, align: "right", margin: 0, valign: "top",
    });
    addHr(slide, rightX + 40, ty + tgtRowH - 4, rightW - 80, C.rule);
  });

  // Totals
  const totY = tgtTop + targets.length * tgtRowH + 18;
  addHr(slide, rightX + 40, totY, rightW - 80, C.ruleStrong);
  slide.addText("TARGETED AWARDS · 2026 – 2028", {
    x: inch(rightX + 40), y: inch(totY + 28),
    w: inch(rightW - 80 - 220), h: inch(28),
    fontFace: F_BODY, fontSize: pt(13), color: C.dusk,
    charSpacing: 2.1, margin: 0, valign: "middle",
  });
  slide.addText([
    { text: "40", options: { color: C.espresso, fontSize: pt(64), fontFace: F_DISPLAY, charSpacing: -1.3 } },
    { text: " units", options: { color: C.dusk, fontSize: pt(20), fontFace: F_BODY } },
  ], {
    x: inch(rightX + rightW - 240), y: inch(totY + 12),
    w: inch(200), h: inch(60),
    align: "right", margin: 0, valign: "middle",
  });
}

// ============================================================
// SLIDE 09 — CTA
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bone2 };
  addChrome(slide, {
    rightLabel: "Next Step",
    bottomLeft: "Not an offer. Offers made only via FDD in states where registered.",
    pageLabel:  "09 / 09",
  });

  // body centered vertically (margin auto auto), 2 cols 1.2/1, gap 96
  const totalW = CONTENT_W_PX - 96;
  const leftW = Math.round(totalW * 1.2 / 2.2);     // ~890
  const rightW = totalW - leftW;                     // ~742
  const leftX = PAD_X_PX;
  const rightX = PAD_X_PX + leftW + 96;
  const bodyCenterY = 540; // mid of 1080

  // LEFT
  const leftBlockH = 540;
  const leftTop = bodyCenterY - leftBlockH / 2;
  slide.addText("08 · LET'S TALK", {
    x: inch(leftX), y: inch(leftTop),
    w: inch(600), h: inch(24),
    fontFace: F_BODY, fontSize: pt(14), color: C.dusk,
    charSpacing: 2.8, margin: 0, valign: "top",
  });
  // CTA title 136px = 68pt: "Open the\nnext Savanna." with "Savanna." italic dusk
  slide.addText([
    { text: "Open the",    options: { color: C.espresso, breakLine: true } },
    { text: "next ",       options: { color: C.espresso, breakLine: false } },
    { text: "Savanna.",    options: { color: C.dusk, italic: true } },
  ], {
    x: inch(leftX), y: inch(leftTop + 40),
    w: inch(leftW), h: inch(420),
    fontFace: F_DISPLAY, fontSize: pt(136),
    lineSpacingMultiple: 0.92, charSpacing: -1.4, margin: 0, valign: "top",
  });
  slide.addText(
    "If you'd like to be considered for a territory, the path from first conversation to awarded agreement typically runs sixty to ninety days.",
    {
      x: inch(leftX), y: inch(leftTop + 480),
      w: inch(520), h: inch(80),
      fontFace: F_BODY, fontSize: pt(22), color: C.espresso2,
      lineSpacingMultiple: 1.5, margin: 0, valign: "top",
    }
  );

  // RIGHT — CTA panel
  const steps = [
    { n: "01", t: "Discovery call",                       d: "30 minutes with the franchise development team." },
    { n: "02", t: "Mutual qualification & FDD review",    d: "We share the current Franchise Disclosure Document; you review with counsel." },
    { n: "03", t: "Discovery day in San Francisco",       d: "On-site with the founding team, roastery, and commissary." },
    { n: "04", t: "Territory award & agreement",          d: "Signed franchise agreement and deposit; Academy start date scheduled." },
  ];
  const panelH = 620;
  const panelY = bodyCenterY - panelH / 2;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: inch(rightX), y: inch(panelY),
    w: inch(rightW), h: inch(panelH),
    fill: { color: C.paper }, line: { color: C.ruleStrong, width: 0.75 },
  });
  slide.addText("FROM HERE → SIGNED AGREEMENT", {
    x: inch(rightX + 44), y: inch(panelY + 36),
    w: inch(rightW - 88), h: inch(20),
    fontFace: F_BODY, fontSize: pt(13), color: C.dusk,
    charSpacing: 2.1, margin: 0, valign: "top",
  });

  const stepsTop = panelY + 90;
  const stepRowH = 110;
  steps.forEach((s, i) => {
    const sy = stepsTop + i * stepRowH;
    slide.addText(s.n, {
      x: inch(rightX + 44), y: inch(sy + 22),
      w: inch(42), h: inch(22),
      fontFace: F_BODY, fontSize: pt(14), color: C.acacia,
      charSpacing: 1.1, margin: 0, valign: "top",
    });
    slide.addText(s.t, {
      x: inch(rightX + 44 + 42 + 18), y: inch(sy + 14),
      w: inch(rightW - 44 - 44 - 42 - 18), h: inch(36),
      fontFace: F_DISPLAY, fontSize: pt(26), color: C.espresso,
      lineSpacingMultiple: 1.25, margin: 0, valign: "top",
    });
    slide.addText(s.d, {
      x: inch(rightX + 44 + 42 + 18), y: inch(sy + 50),
      w: inch(rightW - 44 - 44 - 42 - 18), h: inch(36),
      fontFace: F_BODY, fontSize: pt(15), color: C.ink60,
      lineSpacingMultiple: 1.4, margin: 0, valign: "top",
    });
    if (i < steps.length - 1) {
      addHr(slide, rightX + 44, sy + stepRowH - 4, rightW - 88, C.rule);
    }
  });

  // Contact
  const contactY = stepsTop + steps.length * stepRowH + 16;
  addHr(slide, rightX + 44, contactY, rightW - 88, C.ruleStrong);
  slide.addText("FRANCHISE DEVELOPMENT", {
    x: inch(rightX + 44), y: inch(contactY + 28),
    w: inch(220), h: inch(24),
    fontFace: F_BODY, fontSize: pt(12), color: C.dusk,
    charSpacing: 1.9, margin: 0, valign: "top",
  });
  slide.addText("franchise@savannacoffee.co · (415) 555-0140", {
    x: inch(rightX + 44 + 220), y: inch(contactY + 26),
    w: inch(rightW - 88 - 220), h: inch(36),
    fontFace: F_DISPLAY, fontSize: pt(18), color: C.espresso,
    align: "right", margin: 0, valign: "top",
  });
}

// ============================================================
// Save the presentation
// ============================================================
const outPath = path.resolve(__dirname, "Savanna_Coffee_Franchise_Deck.pptx");
pres.writeFile({ fileName: outPath }).then(() => {
  console.log("Wrote:", outPath);
});
