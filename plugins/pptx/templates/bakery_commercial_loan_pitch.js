// Comfort Bakery — Storefront Concept Pitch
// Replica of Plan_2.pptx built with pptxgenjs
//
// Usage:
//   npm install pptxgenjs
//   node build.js
//
// Output: Plan_2.pptx in the current directory.

const pptxgen = require("pptxgenjs");

// -----------------------------------------------------------------------------
// Design tokens (extracted from the original deck)
// -----------------------------------------------------------------------------
const C = {
  bgCream:    "F6F1E8", // main slide background
  bgWarm:     "EEE6D6", // slide 6 background / image placeholder tone
  divider:    "D9CEB8", // subtle tan divider
  muted:      "8A8176", // olive-gray for labels/sources
  medium:     "333331", // secondary dark
  dark:       "1A1A1A", // primary dark text
  black:      "000000",

  // Dark slide (#10) palette
  darkBg:     "1A1A1A",
  darkAlt:    "333333",
  darkMuted:  "888888",
  darkAccent: "C9A783", // warm tan accent
  darkCream:  "D8CFBF", // cream text on dark
  darkCream2: "F6F1E8",
};

const FONT = "Arial";

// Slide size: 20" x 11.25" (matches the original 18288000 × 10287000 EMU)
const SLIDE_W = 20;
const SLIDE_H = 11.25;

// Shared layout landmarks
const MARGIN_L = 1.04;
const MARGIN_R = 1.04;
const CONTENT_W = SLIDE_W - MARGIN_L - MARGIN_R; // 17.92"
const HEADER_Y  = 0.83;   // top header text baseline
const HEADER_DIV_Y = 1.30;  // top divider line
const FOOTER_DIV_Y = 9.92;  // bottom divider line
const FOOTER_Y  = 10.13;  // footer text

// -----------------------------------------------------------------------------
// Build the deck
// -----------------------------------------------------------------------------
const pres = new pptxgen();
pres.defineLayout({ name: "COMFORT", width: SLIDE_W, height: SLIDE_H });
pres.layout = "COMFORT";
pres.title  = "Comfort Bakery — Storefront Concept Pitch";
pres.author = "Comfort Bakery";

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

// Horizontal divider line drawn as a thin rectangle (renders crisply at any zoom)
function hDivider(slide, x, y, w, color = C.divider) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: 0.01,
    fill: { color }, line: { type: "none" },
  });
}

// Vertical divider
function vDivider(slide, x, y, h, color = C.divider) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.01, h,
    fill: { color }, line: { type: "none" },
  });
}

// Common header bar used on slides 2-9 (and a variant on 1 & 10)
function addHeader(slide, sectionLabel, pageLabel, opts = {}) {
  const textColor   = opts.textColor   || C.muted;
  const divColor    = opts.divColor    || C.divider;

  slide.addText(sectionLabel, {
    x: MARGIN_L, y: HEADER_Y, w: 10, h: 0.33,
    fontFace: FONT, fontSize: 18, color: textColor,
    charSpacing: 4, margin: 0, valign: "middle",
  });
  slide.addText(pageLabel, {
    x: SLIDE_W - MARGIN_R - 2.5, y: HEADER_Y, w: 2.5, h: 0.33,
    fontFace: FONT, fontSize: 18, color: textColor,
    charSpacing: 4, margin: 0, align: "right", valign: "middle",
  });
  hDivider(slide, MARGIN_L, HEADER_DIV_Y, CONTENT_W, divColor);
}

function addFooter(slide, leftLabel, rightLabel, opts = {}) {
  const textColor = opts.textColor || C.muted;
  const divColor  = opts.divColor  || C.divider;
  const rightW    = opts.rightW    || 10;

  hDivider(slide, MARGIN_L, FOOTER_DIV_Y, CONTENT_W, divColor);
  slide.addText(leftLabel, {
    x: MARGIN_L, y: FOOTER_Y, w: 10, h: 0.33,
    fontFace: FONT, fontSize: 18, color: textColor,
    charSpacing: 4, margin: 0, valign: "middle",
  });
  slide.addText(rightLabel, {
    x: SLIDE_W - MARGIN_R - rightW, y: FOOTER_Y, w: rightW, h: 0.33,
    fontFace: FONT, fontSize: 18, color: textColor,
    charSpacing: 4, margin: 0, align: "right", valign: "middle",
  });
}

// A rectangular image placeholder (warm cream tone) with a small caption chip
function imagePlaceholder(slide, x, y, w, h, caption, opts = {}) {
  const bg      = opts.bg      || C.bgWarm;
  const border  = opts.border  || C.divider;
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: bg },
    line: { color: border, width: 0.75 },
  });
  if (caption) {
    // Caption chip bottom-left of the placeholder
    const capW = Math.min(w - 0.4, 5.05);
    const capH = 0.51;
    const capX = x + 0.25;
    const capY = y + h - capH - 0.25;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: capX, y: capY, w: capW, h: capH,
      fill: { color: C.bgCream },
      line: { color: border, width: 0.5 },
    });
    slide.addText(caption, {
      x: capX, y: capY, w: capW, h: capH,
      fontFace: FONT, fontSize: 18, color: C.dark,
      align: "center", valign: "middle", margin: 0,
    });
  }
}

// =============================================================================
// SLIDE 1 — Title / Cover
// =============================================================================
function buildSlide1() {
  const slide = pres.addSlide();
  slide.background = { color: C.bgCream };

  // Header (cover variant: brand on left, location/date on right, dark text)
  slide.addText("COMFORT BAKERY", {
    x: MARGIN_L, y: HEADER_Y, w: 10, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.dark, bold: false,
    charSpacing: 4, margin: 0, valign: "middle",
  });
  slide.addText("FRISCO, TX · 2026", {
    x: SLIDE_W - MARGIN_R - 5, y: HEADER_Y, w: 5, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.muted,
    charSpacing: 4, margin: 0, align: "right", valign: "middle",
  });
  hDivider(slide, MARGIN_L, HEADER_DIV_Y, CONTENT_W);

  // Overline
  slide.addText("STOREFRONT CONCEPT PITCH", {
    x: MARGIN_L, y: 2.15, w: 10, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.muted,
    charSpacing: 4, margin: 0, valign: "middle",
  });

  // Giant italic headline
  slide.addText([
    { text: "Comfort,", options: { italic: true, breakLine: true } },
    { text: "baked in.",  options: { italic: true } },
  ], {
    x: MARGIN_L, y: 2.7, w: 10, h: 4.6,
    fontFace: FONT, fontSize: 135, color: C.dark,
    margin: 0, valign: "top", paraSpaceBefore: 0, paraSpaceAfter: 0,
  });

  // Prepared for block
  slide.addText("PREPARED FOR", {
    x: MARGIN_L, y: 9.09, w: 10, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.muted,
    charSpacing: 4, margin: 0, valign: "middle",
  });
  slide.addText("First National Bank — Commercial Lending", {
    x: MARGIN_L, y: 9.43, w: 10, h: 0.55,
    fontFace: FONT, fontSize: 30, color: C.dark,
    margin: 0, valign: "middle",
  });

  // Hero image placeholder (right column, tall)
  imagePlaceholder(
    slide,
    10.72, 2.15, 8.23, 8.28,
    "hero / storefront exterior · morning light",
    { bg: C.bgWarm, border: C.divider }
  );

  // Footer
  hDivider(slide, MARGIN_L, FOOTER_DIV_Y, CONTENT_W);
  slide.addText("01 / 10", {
    x: MARGIN_L, y: FOOTER_Y, w: 2, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.muted,
    charSpacing: 4, margin: 0, valign: "middle",
  });
  slide.addText("GLUTEN-FREE · USDA ORGANIC CERTIFIED", {
    x: SLIDE_W - MARGIN_R - 8, y: FOOTER_Y, w: 8, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.muted,
    charSpacing: 4, margin: 0, align: "right", valign: "middle",
  });
}

// =============================================================================
// SLIDE 2 — The Opportunity
// =============================================================================
function buildSlide2() {
  const slide = pres.addSlide();
  slide.background = { color: C.bgCream };

  addHeader(slide, "§ 01 · THE OPPORTUNITY", "02 / 10");

  // Left: headline + paragraph
  slide.addText([
    { text: "A category with ",     options: {} },
    { text: "nowhere ",              options: { breakLine: false } },
    { text: "dedicated ",            options: { italic: true } },
    { text: "to go.",                options: {} },
  ], {
    x: MARGIN_L, y: 1.94, w: 8.69, h: 3.05,
    fontFace: FONT, fontSize: 72, color: C.dark, bold: false,
    margin: 0, valign: "top",
  });

  slide.addText(
    "Frisco has added 60,000 residents in five years and two dozen new bakeries — yet not one is fully gluten-free. Celiac and gluten-sensitive customers still shop the single shelf at the grocery store.",
    {
      x: MARGIN_L, y: 7.95, w: 5.58, h: 2.0,
      fontFace: FONT, fontSize: 19.5, color: C.dark,
      margin: 0, valign: "top", paraSpaceAfter: 6,
    }
  );

  // Right: two huge stat callouts
  // Stat 1 — "1 in 7"
  slide.addText("1 in 7", {
    x: 10.52, y: 2.2, w: 8.5, h: 2.3,
    fontFace: FONT, fontSize: 165, color: C.dark, bold: false,
    margin: 0, valign: "top",
  });
  slide.addText(
    "U.S. adults avoid gluten for medical or lifestyle reasons.",
    {
      x: 10.52, y: 4.6, w: 4.8, h: 0.9,
      fontFace: FONT, fontSize: 19.5, color: C.dark,
      margin: 0, valign: "top",
    }
  );
  slide.addText("SOURCE · MINTEL, 2024", {
    x: 10.52, y: 5.55, w: 8.5, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.muted,
    charSpacing: 4, margin: 0, valign: "middle",
  });

  // Stat 2 — "0"
  slide.addText("0", {
    x: 10.52, y: 6.35, w: 8.5, h: 2.3,
    fontFace: FONT, fontSize: 165, color: C.dark, bold: false,
    margin: 0, valign: "top",
  });
  slide.addText(
    "Fully dedicated gluten-free bakeries in Frisco today.",
    {
      x: 10.52, y: 8.75, w: 4.8, h: 0.9,
      fontFace: FONT, fontSize: 19.5, color: C.dark,
      margin: 0, valign: "top",
    }
  );
  slide.addText("SOURCE · INTERNAL MARKET SCAN, Q1 2026", {
    x: 10.52, y: 9.38, w: 8.5, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.muted,
    charSpacing: 4, margin: 0, valign: "middle",
  });

  addFooter(slide, "COMFORT BAKERY", "THE OPPORTUNITY");
}

// =============================================================================
// SLIDE 3 — The Market
// =============================================================================
function buildSlide3() {
  const slide = pres.addSlide();
  slide.background = { color: C.bgCream };

  addHeader(slide, "§ 02 · THE MARKET", "03 / 10");

  // Big title spanning full width
  slide.addText("Frisco, Texas — a household built for this.", {
    x: MARGIN_L, y: 1.85, w: CONTENT_W, h: 1.3,
    fontFace: FONT, fontSize: 66, color: C.dark,
    margin: 0, valign: "top",
  });

  // Stat row (4 columns divided by thin verticals)
  const statsY = 5.3;
  const statsH = 2.0;
  const colW   = CONTENT_W / 4;
  const stats = [
    { label: "POPULATION",           value: "230K",  sub: "+42% since 2018" },
    { label: "MEDIAN HOUSEHOLD",     value: "$141K", sub: "2.1× TX median" },
    { label: "GF CATEGORY GROWTH",   value: "+9.8%", sub: "CAGR, 2021–2025" },
    { label: "ORGANIC SPEND INDEX",  value: "128",   sub: "vs. national 100" },
  ];

  // Top and bottom divider for the stat band
  hDivider(slide, MARGIN_L, statsY,           CONTENT_W);
  hDivider(slide, MARGIN_L, statsY + statsH,  CONTENT_W);

  stats.forEach((s, i) => {
    const x = MARGIN_L + i * colW;
    if (i > 0) vDivider(slide, x, statsY + 0.12, statsH - 0.24);

    slide.addText(s.label, {
      x: x + 0.35, y: statsY + 0.22, w: colW - 0.5, h: 0.33,
      fontFace: FONT, fontSize: 18, color: C.muted,
      charSpacing: 4, margin: 0, valign: "middle",
    });
    slide.addText(s.value, {
      x: x + 0.35, y: statsY + 0.62, w: colW - 0.5, h: 0.85,
      fontFace: FONT, fontSize: 42, color: C.dark,
      margin: 0, valign: "middle",
    });
    slide.addText(s.sub, {
      x: x + 0.35, y: statsY + 1.52, w: colW - 0.5, h: 0.33,
      fontFace: FONT, fontSize: 19.5, color: C.muted,
      margin: 0, valign: "middle",
    });
  });

  // Two-column body text below the stats
  slide.addText(
    "Frisco families index above national averages on every marker we care about: disposable income, health-forward grocery spend, and willingness to drive for specialty food.",
    {
      x: MARGIN_L, y: 8.0, w: 8.0, h: 1.5,
      fontFace: FONT, fontSize: 19.5, color: C.dark,
      margin: 0, valign: "top", paraSpaceAfter: 6,
    }
  );
  slide.addText([
    { text: "Our trade area — a 5-mile ring around Legacy West and The Star — contains " },
    { text: "84,000 households", options: { bold: true } },
    { text: " and three pediatric celiac clinics." },
  ], {
    x: 10.52, y: 8.0, w: 8.0, h: 1.5,
    fontFace: FONT, fontSize: 19.5, color: C.dark,
    margin: 0, valign: "top", paraSpaceAfter: 6,
  });

  addFooter(
    slide,
    "COMFORT BAKERY",
    "SOURCES · U.S. CENSUS ACS 2024; NIELSEN SCAN 2025; MINTEL",
    { rightW: 14 }
  );
}

// =============================================================================
// SLIDE 4 — The Concept
// =============================================================================
function buildSlide4() {
  const slide = pres.addSlide();
  slide.background = { color: C.bgCream };

  addHeader(slide, "§ 03 · THE CONCEPT", "04 / 10");

  // Left: concept render placeholder
  imagePlaceholder(
    slide,
    MARGIN_L, 1.85, 7.8, 8.07,
    "concept render · open kitchen counter, marble + oak"
  );

  // Right: headline with italic accent
  slide.addText([
    { text: "A daily ",           options: { breakLine: true } },
    { text: "neighborhood ",      options: { breakLine: true } },
    { text: "bakery — ",          options: {} },
    { text: "without ",           options: { italic: true, breakLine: true } },
    { text: "the flour.",         options: { italic: true } },
  ], {
    x: 9.75, y: 1.85, w: 9.25, h: 4.6,
    fontFace: FONT, fontSize: 72, color: C.dark,
    margin: 0, valign: "top", paraSpaceAfter: 0,
  });

  // Numbered features
  const features = [
    { num: "01 · DEDICATED", body: "Zero wheat on premises. No cross-contamination, no asterisks." },
    { num: "02 · ORGANIC",   body: "Every ingredient USDA certified, sourced regionally where possible." },
    { num: "03 · FAMILIAR",  body: "Sourdough, croissants, birthday cakes — the classics, made right." },
  ];
  const fY0 = 6.8;
  const fGap = 1.02;
  features.forEach((f, i) => {
    const y = fY0 + i * fGap;
    slide.addText(f.num, {
      x: 9.75, y, w: 9.25, h: 0.4,
      fontFace: FONT, fontSize: 19.5, color: C.dark, bold: true,
      charSpacing: 4, margin: 0, valign: "middle",
    });
    slide.addText(f.body, {
      x: 9.75, y: y + 0.42, w: 9.25, h: 0.5,
      fontFace: FONT, fontSize: 19.5, color: C.dark,
      margin: 0, valign: "top",
    });
  });

  addFooter(slide, "COMFORT BAKERY", "THE CONCEPT");
}

// =============================================================================
// SLIDE 5 — The Menu
// =============================================================================
function buildSlide5() {
  const slide = pres.addSlide();
  slide.background = { color: C.bgCream };

  addHeader(slide, "§ 04 · THE MENU", "05 / 10");

  // Left column
  slide.addText("Daily bake, built around comfort.", {
    x: MARGIN_L, y: 1.85, w: 8.2, h: 2.0,
    fontFace: FONT, fontSize: 54, color: C.dark,
    margin: 0, valign: "top",
  });
  slide.addText(
    "Eighteen SKUs across four categories. Seasonal rotation every eight weeks. Custom celebration cakes by appointment.",
    {
      x: MARGIN_L, y: 4.4, w: 6.0, h: 1.5,
      fontFace: FONT, fontSize: 19.5, color: C.dark,
      margin: 0, valign: "top",
    }
  );
  // Avg ticket mega stat
  slide.addText("AVG. TICKET", {
    x: MARGIN_L, y: 8.55, w: 5, h: 0.4,
    fontFace: FONT, fontSize: 19.5, color: C.dark, bold: true,
    charSpacing: 2, margin: 0, valign: "middle",
  });
  slide.addText("$14.20", {
    x: MARGIN_L, y: 9.0, w: 5, h: 0.95,
    fontFace: FONT, fontSize: 54, color: C.dark,
    margin: 0, valign: "middle",
  });

  // Right column — menu list
  const items = [
    { cat: "01 / LOAVES",       name: "Country sourdough", desc: "72-hour ferment, sorghum",   price: "$12"     },
    { cat: "02 / LOAVES",       name: "Seeded rye style",  desc: "Buckwheat, caraway",         price: "$14"     },
    { cat: "03 / VIENNOISERIE", name: "Butter croissant",  desc: "Laminated rice-flour dough", price: "$6"      },
    { cat: "04 / VIENNOISERIE", name: "Morning bun",       desc: "Cardamom, orange zest",      price: "$6.50"   },
    { cat: "05 / PASTRY",       name: "Almond tart",       desc: "Seasonal stone fruit",       price: "$8"      },
    { cat: "06 / CAKES",        name: "Olive-oil citrus",  desc: "Whole, serves 10",           price: "$48"     },
    { cat: "07 / CAKES",        name: "Celebration cakes", desc: "Custom, 48-hr lead",         price: "from $90"},
  ];

  const menuX = 9.35;
  const menuW = SLIDE_W - MARGIN_R - menuX; // ≈ 9.61
  const rowH  = 1.07;
  const rowY0 = 1.85;

  // Column widths within menu area
  const cCat   = 1.75;
  const cName  = 3.1;
  const cDesc  = 3.0;
  // price aligns to right edge

  items.forEach((it, i) => {
    const y = rowY0 + i * rowH;
    // Thin divider between rows (below each except the last)
    if (i > 0) hDivider(slide, menuX, y, menuW);

    // Category label
    slide.addText(it.cat, {
      x: menuX, y: y + 0.22, w: cCat, h: 0.8,
      fontFace: FONT, fontSize: 14, color: C.muted,
      charSpacing: 2, margin: 0, valign: "top",
    });
    // Item name (larger)
    slide.addText(it.name, {
      x: menuX + cCat, y: y + 0.18, w: cName, h: 0.85,
      fontFace: FONT, fontSize: 26, color: C.dark,
      margin: 0, valign: "top",
    });
    // Description
    slide.addText(it.desc, {
      x: menuX + cCat + cName + 0.1, y: y + 0.25, w: cDesc, h: 0.8,
      fontFace: FONT, fontSize: 18, color: C.dark,
      margin: 0, valign: "top",
    });
    // Price (right aligned)
    slide.addText(it.price, {
      x: menuX + cCat + cName + cDesc + 0.1, y: y + 0.25, w: menuW - (cCat + cName + cDesc + 0.1), h: 0.5,
      fontFace: FONT, fontSize: 19.5, color: C.dark,
      align: "right", margin: 0, valign: "top",
    });
  });

  addFooter(slide, "COMFORT BAKERY", "THE MENU · SAMPLING");
}

// =============================================================================
// SLIDE 6 — The Space (warmer background)
// =============================================================================
function buildSlide6() {
  const slide = pres.addSlide();
  slide.background = { color: C.bgWarm };

  addHeader(slide, "§ 05 · THE SPACE", "06 / 10", { divColor: C.divider });

  // Left: headline + description
  slide.addText("2,400 sq ft on Legacy Drive.", {
    x: MARGIN_L, y: 1.85, w: 8.2, h: 2.0,
    fontFace: FONT, fontSize: 54, color: C.dark,
    margin: 0, valign: "top",
  });
  slide.addText(
    "End-cap retail next to a grocery anchor, with a dedicated drive-through lane for pickup orders and an 18-seat café.",
    {
      x: MARGIN_L, y: 4.3, w: 6.0, h: 1.5,
      fontFace: FONT, fontSize: 19.5, color: C.dark,
      margin: 0, valign: "top",
    }
  );

  // Stat row bottom-left
  const statY = 7.9;
  const statH = 1.5;
  hDivider(slide, MARGIN_L, statY, 8.0);
  hDivider(slide, MARGIN_L, statY + statH, 8.0);
  const st = [
    { l: "SEATS",    v: "18" },
    { l: "RENT / MO", v: "$8.4K" },
    { l: "LEASE",    v: "7 yr" },
  ];
  const colW = 2.6;
  st.forEach((s, i) => {
    const x = MARGIN_L + i * colW;
    if (i > 0) vDivider(slide, x, statY + 0.1, statH - 0.2);
    slide.addText(s.l, {
      x: x + 0.3, y: statY + 0.2, w: colW - 0.4, h: 0.33,
      fontFace: FONT, fontSize: 18, color: C.muted,
      charSpacing: 2, margin: 0, valign: "middle",
    });
    slide.addText(s.v, {
      x: x + 0.3, y: statY + 0.58, w: colW - 0.4, h: 0.7,
      fontFace: FONT, fontSize: 36, color: C.dark,
      margin: 0, valign: "middle",
    });
  });

  // Right: floorplan placeholder
  imagePlaceholder(
    slide,
    9.2, 1.85, SLIDE_W - MARGIN_R - 9.2, 7.55,
    "floorplan · 2,400 sqft, retail + open kitchen",
    { bg: C.bgCream, border: C.divider }
  );

  addFooter(
    slide,
    "COMFORT BAKERY",
    "THE SPACE · 5151 LEGACY DR, SUITE 140",
    { divColor: C.divider }
  );
}

// =============================================================================
// SLIDE 7 — The Certifications
// =============================================================================
function buildSlide7() {
  const slide = pres.addSlide();
  slide.background = { color: C.bgCream };

  addHeader(slide, "§ 06 · THE CERTIFICATIONS", "07 / 10");

  // Big title left + paragraph right
  slide.addText("Two seals most bakeries can't carry.", {
    x: MARGIN_L, y: 1.85, w: 10.5, h: 2.5,
    fontFace: FONT, fontSize: 72, color: C.dark,
    margin: 0, valign: "top",
  });
  slide.addText(
    "Both certifications require audited facilities, dedicated equipment, and full ingredient traceability. They are the barrier to entry — and our moat.",
    {
      x: 11.8, y: 3.15, w: 7.16, h: 1.5,
      fontFace: FONT, fontSize: 21, color: C.dark,
      margin: 0, valign: "top", paraSpaceAfter: 8,
    }
  );

  // Two certification cards
  const cardY = 5.65;
  const cardH = 3.75;
  const cards = [
    {
      letter: "G",
      num:    "CERTIFICATION · 01",
      title:  "Gluten-Free Certification Organization",
      body:   "≤10 ppm gluten threshold, verified by third-party lab at every production run and annual on-site audit.",
    },
    {
      letter: "O",
      num:    "CERTIFICATION · 02",
      title:  "USDA Certified Organic",
      body:   "95%+ organic ingredients by weight, chain-of-custody documentation, approved handler status through TDA.",
    },
  ];

  const cardW = (CONTENT_W - 0.4) / 2;
  cards.forEach((card, i) => {
    const x = MARGIN_L + i * (cardW + 0.4);

    // Card border
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: cardW, h: cardH,
      fill: { color: C.bgCream },
      line: { color: C.divider, width: 0.75 },
    });

    // Circle with letter
    slide.addShape(pres.shapes.OVAL, {
      x: x + 0.6, y: cardY + 0.5, w: 1.0, h: 1.0,
      fill: { color: C.bgCream },
      line: { color: C.dark, width: 0.75 },
    });
    slide.addText(card.letter, {
      x: x + 0.6, y: cardY + 0.5, w: 1.0, h: 1.0,
      fontFace: FONT, fontSize: 36, color: C.dark,
      align: "center", valign: "middle", margin: 0,
    });

    // Labels
    slide.addText(card.num, {
      x: x + 0.6, y: cardY + 1.9, w: cardW - 1.2, h: 0.33,
      fontFace: FONT, fontSize: 18, color: C.muted,
      charSpacing: 4, margin: 0, valign: "middle",
    });
    slide.addText(card.title, {
      x: x + 0.6, y: cardY + 2.28, w: cardW - 1.2, h: 0.55,
      fontFace: FONT, fontSize: 27, color: C.dark,
      margin: 0, valign: "top",
    });
    slide.addText(card.body, {
      x: x + 0.6, y: cardY + 2.95, w: cardW - 1.2, h: 1.0,
      fontFace: FONT, fontSize: 19.5, color: C.dark,
      margin: 0, valign: "top",
    });
  });

  addFooter(slide, "COMFORT BAKERY", "THE CERTIFICATIONS");
}

// =============================================================================
// SLIDE 8 — The Customer
// =============================================================================
function buildSlide8() {
  const slide = pres.addSlide();
  slide.background = { color: C.bgCream };

  addHeader(slide, "§ 07 · THE CUSTOMER", "08 / 10");

  // Title top-left
  slide.addText([
    { text: "Three customers,", options: { breakLine: true } },
    { text: "one table.",       options: {} },
  ], {
    x: MARGIN_L, y: 1.85, w: 8.5, h: 2.7,
    fontFace: FONT, fontSize: 66, color: C.dark,
    margin: 0, valign: "top",
  });

  // Lifestyle photo placeholder bottom-left
  imagePlaceholder(
    slide,
    MARGIN_L, 5.2, 7.5, 4.5,
    "lifestyle photo · family at café counter"
  );

  // Right: three personas
  const personas = [
    { age: "38", title: "The Celiac Parent",    body: "Medically restricted. Drives 25+ miles for trusted bakeries today. Buys weekly. Our anchor customer and the one who tells everyone." },
    { age: "44", title: "The Wellness Household", body: "Chooses organic and low-gluten by preference. Higher basket size — pastries, celebration cakes, coffee. Visits 2–3× per month." },
    { age: "29", title: "The Café Regular",     body: "Works from Legacy West cafés. Doesn't know or care it's gluten-free — just likes the croissant. A quiet majority, and the margin driver." },
  ];

  const pX  = 9.35;
  const pW  = SLIDE_W - MARGIN_R - pX;
  const pH  = 2.5;
  const pY0 = 1.85;
  personas.forEach((p, i) => {
    const y = pY0 + i * pH;
    if (i > 0) hDivider(slide, pX, y, pW);

    slide.addText(p.age, {
      x: pX, y: y + 0.2, w: 1.6, h: 1.3,
      fontFace: FONT, fontSize: 54, color: C.dark,
      margin: 0, valign: "top",
    });
    slide.addText(p.title, {
      x: pX + 1.9, y: y + 0.28, w: pW - 1.9, h: 0.55,
      fontFace: FONT, fontSize: 27, color: C.dark,
      margin: 0, valign: "top",
    });
    slide.addText(p.body, {
      x: pX + 1.9, y: y + 0.95, w: pW - 1.9, h: 1.3,
      fontFace: FONT, fontSize: 19.5, color: C.dark,
      margin: 0, valign: "top", paraSpaceAfter: 4,
    });
  });

  addFooter(slide, "COMFORT BAKERY", "THE CUSTOMER");
}

// =============================================================================
// SLIDE 9 — The Financials
// =============================================================================
function buildSlide9() {
  const slide = pres.addSlide();
  slide.background = { color: C.bgCream };

  addHeader(slide, "§ 08 · THE FINANCIALS", "09 / 10");

  // Left column
  slide.addText("Three-year projection.", {
    x: MARGIN_L, y: 1.85, w: 8.2, h: 2.0,
    fontFace: FONT, fontSize: 54, color: C.dark,
    margin: 0, valign: "top",
  });
  slide.addText(
    "Conservative case. Comparable independent bakery data, Texas metro, 2,000–2,800 sq ft footprint.",
    {
      x: MARGIN_L, y: 4.25, w: 5.5, h: 1.5,
      fontFace: FONT, fontSize: 19.5, color: C.dark,
      margin: 0, valign: "top",
    }
  );
  // Break-even + startup capital
  slide.addText("BREAK-EVEN", {
    x: MARGIN_L, y: 7.3, w: 5, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.dark, bold: true,
    charSpacing: 3, margin: 0, valign: "middle",
  });
  slide.addText("Month 14", {
    x: MARGIN_L, y: 7.65, w: 5, h: 0.75,
    fontFace: FONT, fontSize: 42, color: C.dark,
    margin: 0, valign: "middle",
  });
  slide.addText("STARTUP CAPITAL", {
    x: MARGIN_L, y: 8.6, w: 5, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.dark, bold: true,
    charSpacing: 3, margin: 0, valign: "middle",
  });
  slide.addText("$685K", {
    x: MARGIN_L, y: 8.95, w: 5, h: 0.75,
    fontFace: FONT, fontSize: 42, color: C.dark,
    margin: 0, valign: "middle",
  });

  // Right: financial table
  const tX = 8.7;
  const tW = SLIDE_W - MARGIN_R - tX;
  const labelW = 3.8;
  const yearW  = (tW - labelW) / 3;

  const rows = [
    { label: "Revenue",      vals: ["$612K",  "$848K",   "$1.02M"],  emph: true  },
    { label: "COGS (32%)",   vals: ["($196K)", "($271K)", "($326K)"], emph: false },
    { label: "Labor",        vals: ["($214K)", "($254K)", "($285K)"], emph: false },
    { label: "Rent & ops",   vals: ["($138K)", "($142K)", "($146K)"], emph: false },
  ];
  const netRow = { label: "Net income", vals: ["$64K", "$181K", "$263K"] };

  const headerY = 1.85;
  // Year headers
  ["YEAR 1", "YEAR 2", "YEAR 3"].forEach((label, i) => {
    slide.addText(label, {
      x: tX + labelW + i * yearW, y: headerY, w: yearW - 0.1, h: 0.33,
      fontFace: FONT, fontSize: 18, color: C.muted,
      charSpacing: 4, margin: 0, align: "right", valign: "middle",
    });
  });

  const rowH = 1.3;
  const tableTop = headerY + 0.6;

  rows.forEach((r, i) => {
    const y = tableTop + i * rowH;
    hDivider(slide, tX, y, tW);
    slide.addText(r.label, {
      x: tX, y: y + 0.35, w: labelW, h: 0.6,
      fontFace: FONT, fontSize: 27, color: C.dark,
      margin: 0, valign: "middle",
    });
    r.vals.forEach((v, j) => {
      slide.addText(v, {
        x: tX + labelW + j * yearW, y: y + 0.35, w: yearW - 0.1, h: 0.6,
        fontFace: FONT, fontSize: 27, color: C.dark,
        margin: 0, align: "right", valign: "middle",
      });
    });
  });

  // Net income row — stronger divider above
  const netY = tableTop + rows.length * rowH;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: tX, y: netY, w: tW, h: 0.02,
    fill: { color: C.dark }, line: { type: "none" },
  });
  slide.addText(netRow.label, {
    x: tX, y: netY + 0.35, w: labelW, h: 0.6,
    fontFace: FONT, fontSize: 27, color: C.dark,
    margin: 0, valign: "middle",
  });
  netRow.vals.forEach((v, j) => {
    slide.addText(v, {
      x: tX + labelW + j * yearW, y: netY + 0.35, w: yearW - 0.1, h: 0.6,
      fontFace: FONT, fontSize: 27, color: C.dark,
      margin: 0, align: "right", valign: "middle",
    });
  });

  addFooter(
    slide,
    "COMFORT BAKERY",
    "PRO FORMA · INTERNAL MODEL, CONSERVATIVE CASE"
  );
}

// =============================================================================
// SLIDE 10 — The Ask (dark)
// =============================================================================
function buildSlide10() {
  const slide = pres.addSlide();
  slide.background = { color: C.darkBg };

  // Dark variant header: brand left, page right
  slide.addText("COMFORT BAKERY", {
    x: MARGIN_L, y: HEADER_Y, w: 10, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.darkCream2,
    charSpacing: 4, margin: 0, valign: "middle",
  });
  slide.addText("10 / 10", {
    x: SLIDE_W - MARGIN_R - 2.5, y: HEADER_Y, w: 2.5, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.darkMuted,
    charSpacing: 4, margin: 0, align: "right", valign: "middle",
  });
  hDivider(slide, MARGIN_L, HEADER_DIV_Y, CONTENT_W, C.darkAlt);

  // Left: section tag, giant figure, caption
  slide.addText("§ 09 · THE ASK", {
    x: MARGIN_L, y: 1.85, w: 10, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.darkAccent,
    charSpacing: 4, margin: 0, valign: "middle",
  });
  slide.addText("$425K", {
    x: MARGIN_L, y: 2.35, w: 8.5, h: 2.3,
    fontFace: FONT, fontSize: 135, color: C.darkCream2,
    margin: 0, valign: "top",
  });
  slide.addText("SBA 7(A) · 10-YEAR TERM · REQUESTED", {
    x: MARGIN_L, y: 4.7, w: 10, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.darkAccent,
    charSpacing: 4, margin: 0, valign: "middle",
  });

  // Balance description (lower-left)
  slide.addText(
    "Balance of $260K funded by owner equity and family investment, already committed. Personal guarantee and Legacy Drive leasehold as collateral.",
    {
      x: MARGIN_L, y: 7.6, w: 5.3, h: 2.0,
      fontFace: FONT, fontSize: 19.5, color: C.darkCream2,
      margin: 0, valign: "top",
    }
  );

  // Right: USE OF PROCEEDS list
  const rX = 9.35;
  const rW = SLIDE_W - MARGIN_R - rX;
  slide.addText("USE OF PROCEEDS", {
    x: rX, y: 2.6, w: rW, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.darkMuted,
    charSpacing: 4, margin: 0, valign: "middle",
  });

  const useItems = [
    { num: "01", label: "Build-out & fixtures",     price: "$215K" },
    { num: "02", label: "Dedicated GF equipment",   price: "$118K" },
    { num: "03", label: "Opening inventory",        price: "$42K"  },
    { num: "04", label: "Working capital (6 mo)",   price: "$50K"  },
  ];
  const rowY0 = 3.3;
  const rowH  = 0.9;
  useItems.forEach((it, i) => {
    const y = rowY0 + i * rowH;
    if (i > 0) hDivider(slide, rX, y, rW, C.darkAlt);
    slide.addText(it.num, {
      x: rX, y: y + 0.25, w: 0.8, h: 0.5,
      fontFace: FONT, fontSize: 19.5, color: C.darkMuted,
      margin: 0, valign: "middle",
    });
    slide.addText(it.label, {
      x: rX + 1.0, y: y + 0.25, w: rW - 3.0, h: 0.5,
      fontFace: FONT, fontSize: 27, color: C.darkCream2,
      margin: 0, valign: "middle",
    });
    slide.addText(it.price, {
      x: rX + rW - 2.0, y: y + 0.25, w: 2.0, h: 0.5,
      fontFace: FONT, fontSize: 27, color: C.darkAccent,
      align: "right", margin: 0, valign: "middle",
    });
  });

  // Divider below list
  hDivider(slide, rX, rowY0 + useItems.length * rowH, rW, C.darkAlt);

  // Contact block
  slide.addText("CONTACT", {
    x: rX, y: 7.6, w: 3.0, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.darkMuted,
    charSpacing: 4, margin: 0, valign: "middle",
  });
  slide.addText("Comfort Bakery LLC", {
    x: rX + rW - 6, y: 7.6, w: 6, h: 0.4,
    fontFace: FONT, fontSize: 21, color: C.darkCream2,
    align: "right", margin: 0, valign: "middle",
  });
  slide.addText("hello@comfortbakery.co · 214.555.0180", {
    x: rX + rW - 6, y: 8.05, w: 6, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.darkAccent,
    align: "right", margin: 0, valign: "middle",
  });

  // Footer
  hDivider(slide, MARGIN_L, FOOTER_DIV_Y, CONTENT_W, C.darkAlt);
  slide.addText("THANK YOU", {
    x: MARGIN_L, y: FOOTER_Y, w: 5, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.darkMuted,
    charSpacing: 4, margin: 0, valign: "middle",
  });
  slide.addText("FRISCO, TX · 2026", {
    x: SLIDE_W - MARGIN_R - 5, y: FOOTER_Y, w: 5, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.darkMuted,
    charSpacing: 4, margin: 0, align: "right", valign: "middle",
  });
}

// -----------------------------------------------------------------------------
// Build everything and write
// -----------------------------------------------------------------------------
buildSlide1();
buildSlide2();
buildSlide3();
buildSlide4();
buildSlide5();
buildSlide6();
buildSlide7();
buildSlide8();
buildSlide9();
buildSlide10();

pres.writeFile({ fileName: "Plan_2.pptx" })
  .then(f => console.log("Wrote " + f))
  .catch(e => { console.error(e); process.exit(1); });
