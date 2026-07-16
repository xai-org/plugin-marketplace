/**
 * Canyon Terra Pitch Deck
 * Recreated using pptxgenjs
 *
 * Usage:
 *   npm install pptxgenjs
 *   node canyon-terra-pitch-deck.js
 */

const pptxgen = require("pptxgenjs");

// ============================================================
// PALETTE (extracted from the source deck)
// ============================================================
const C = {
  ink:       "1F1A14", // near-black / dark umber (dark bg, primary text)
  inkSoft:   "3D352A", // deep brown (secondary text, borders on dark)
  cream:     "F4EEE4", // primary light background
  sand:      "EBE3D4", // secondary light background
  dune:      "D6CCBC", // warm sand (alt panels)
  taupe:     "A89680", // muted brown-gray (labels, dividers, rule lines)
  terracotta:"C8653E", // accent orange (italic highlights, accents)
  sunset:    "DB8A5E", // softer terracotta variant
  apricot:   "F4D9B4", // pale apricot (slide 7 "THE YEAR" card)
  sage:      "8A9B7F", // sage green (figures, accents)
  forest:    "5E6E55", // deep forest green (slide 7 bg)
  slate:     "3E5F6B", // blue-slate (slide 6 accent)
  khaki:     "7A6850", // warm khaki (slide 3 accent)
};

// Typography
const FONT_HEAD = "Georgia";
const FONT_BODY = "Calibri";
const FONT_MONO = "Consolas";

// ============================================================
// SETUP
// ============================================================
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10" x 5.625"
pres.author = "Canyon Terra";
pres.title  = "Canyon Terra — Partner Review";

const W = 10;
const H = 5.625;

// ============================================================
// HELPERS
// ============================================================

// Eyebrow (top-left brand) + top-right section label
function addHeaderBar(slide, sectionLabel, onDark = false) {
  const brandColor = onDark ? C.cream : C.ink;
  const labelColor = onDark ? C.taupe : C.taupe;
  slide.addText("Canyon Terra", {
    x: 0.5, y: 0.33, w: 3, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 11, italic: true, color: brandColor,
    margin: 0,
  });
  slide.addText(sectionLabel, {
    x: W - 4.5, y: 0.33, w: 4, h: 0.3,
    fontFace: FONT_MONO, fontSize: 9, color: labelColor,
    align: "right", charSpacing: 3, margin: 0,
  });
}

// Thin horizontal rule
function addRule(slide, x, y, w, color = C.taupe, width = 0.75) {
  slide.addShape(pres.shapes.LINE, {
    x, y, w, h: 0,
    line: { color, width, transparency: 40 },
  });
}

// Small-caps style label (fake small caps via upper case + spacing)
function smallCaps(text) { return String(text).toUpperCase(); }

// ============================================================
// SLIDE 1 — TITLE / WHAT'S NEXT (dark)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.ink };

  addHeaderBar(s, "WHAT'S NEXT · 09 / 09", true);

  // Eyebrow block (left)
  s.addText("PARTNER REVIEW · 2026", {
    x: 0.5, y: 1.15, w: 4.5, h: 0.3,
    fontFace: FONT_MONO, fontSize: 9.5, color: C.taupe,
    charSpacing: 3, margin: 0,
  });

  // Main headline
  s.addText([
    { text: "Let's build a ",  options: { color: C.cream } },
    { text: "building ",       options: { color: C.cream, breakLine: true } },
    { text: "worth ",          options: { color: C.cream } },
    { text: "moving ",         options: { color: C.terracotta, italic: true } },
    { text: "for.",            options: { color: C.terracotta, italic: true } },
  ], {
    x: 0.5, y: 1.55, w: 4.8, h: 2.3,
    fontFace: FONT_HEAD, fontSize: 34, bold: false,
    margin: 0, lineSpacingMultiple: 1.05,
  });

  // Body paragraph
  s.addText(
    "We're raising the first partner round to complete site control, concept architecture, and operator selection. Financial model follows in Volume 02.",
    {
      x: 0.5, y: 4.0, w: 4.5, h: 1.0,
      fontFace: FONT_BODY, fontSize: 11, color: C.dune,
      paraSpaceAfter: 4, margin: 0,
    }
  );

  // Right column — roadmap list
  const rx = 5.6;          // left edge of right col
  const qCol = rx;         // quarter label column
  const tCol = rx + 1.05;  // description column
  const rowY = [1.55, 2.25, 2.95, 3.65];
  const quarters  = ["Q3", "Q4", "Q1 '27", "Q2 '27"];
  const items = [
    "Site control · Old Town parcel",
    "Concept architecture · interior partners",
    "Operator selection · brand build",
    "Capital stack · Volume 02 financials",
  ];

  // divider above the list
  addRule(s, rx, 1.4, 3.9, C.inkSoft, 1);

  quarters.forEach((q, i) => {
    s.addText(q, {
      x: qCol, y: rowY[i], w: 0.9, h: 0.35,
      fontFace: FONT_HEAD, fontSize: 15, italic: true, color: C.sunset,
      margin: 0, valign: "top",
    });
    s.addText(items[i], {
      x: tCol, y: rowY[i] + 0.04, w: 2.9, h: 0.4,
      fontFace: FONT_BODY, fontSize: 11.5, color: C.cream,
      margin: 0, valign: "top",
    });
    // row divider
    addRule(s, rx, rowY[i] + 0.55, 3.9, C.inkSoft, 0.75);
  });

  // Footer
  addRule(s, 0.5, 5.05, 9, C.inkSoft, 0.75);
  s.addText("Canyon Terra", {
    x: 0.5, y: 5.15, w: 3, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10, italic: true, color: C.taupe,
    margin: 0,
  });
  s.addText("CONFIDENTIAL · FOR PARTNER REVIEW ONLY", {
    x: W - 4.5, y: 5.15, w: 4, h: 0.3,
    fontFace: FONT_MONO, fontSize: 8.5, color: C.taupe,
    align: "right", charSpacing: 2, margin: 0,
  });
}

// ============================================================
// SLIDE 2 — THE OPPORTUNITY (light, 3 big stats)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addHeaderBar(s, "THE OPPORTUNITY · 02 / 09");
  addRule(s, 0.5, 0.72, 9, C.taupe, 0.75);

  // Headline (mixed)
  s.addText([
    { text: "Scottsdale has world-class visitors and world-class ", options: { color: C.ink } },
    { text: "residents. ", options: { color: C.ink } },
    { text: "The housing stock serves neither well.", options: { color: C.terracotta, italic: true } },
  ], {
    x: 0.5, y: 1.0, w: 9, h: 1.4,
    fontFace: FONT_HEAD, fontSize: 26,
    lineSpacingMultiple: 1.15, margin: 0,
  });

  // Three stat cards
  const cards = [
    { big: "11.5M",   label: "annual visitors to Greater Scottsdale",
      tag: "— LOOKING FOR A STAY LONGER THAN A HOTEL" },
    { big: "$1.2M+",  label: "median home price, Old Town zip",
      tag: "— PRICING OUT THE MOBILE PROFESSIONAL CLASS" },
    { big: "< 4%",    label: "of rental inventory is hospitality-grade",
      tag: "— FEW OPTIONS BETWEEN AIRBNB AND ROTE APARTMENTS" },
  ];

  const cardY = 3.0;
  const cardW = 2.85;
  const gap   = 0.25;
  const totalW = cardW * 3 + gap * 2;
  const startX = (W - totalW) / 2;

  cards.forEach((c, i) => {
    const x = startX + i * (cardW + gap);

    // thin top rule
    s.addShape(pres.shapes.LINE, {
      x, y: cardY, w: cardW, h: 0,
      line: { color: C.taupe, width: 0.75 },
    });

    s.addText(c.big, {
      x, y: cardY + 0.1, w: cardW, h: 0.8,
      fontFace: FONT_HEAD, fontSize: 42, color: C.ink,
      margin: 0, valign: "top",
    });
    s.addText(c.label, {
      x, y: cardY + 0.95, w: cardW, h: 0.55,
      fontFace: FONT_BODY, fontSize: 11.5, color: C.inkSoft, italic: true,
      margin: 0, valign: "top",
    });
    s.addText(c.tag, {
      x, y: cardY + 1.55, w: cardW, h: 0.4,
      fontFace: FONT_MONO, fontSize: 8, color: C.taupe,
      charSpacing: 2, margin: 0, valign: "top",
    });
  });

  // Footer
  addRule(s, 0.5, 5.05, 9, C.taupe, 0.75);
  s.addText("FIGURES ILLUSTRATIVE · TO BE VALIDATED IN FEASIBILITY PHASE", {
    x: 0.5, y: 5.15, w: 9, h: 0.3,
    fontFace: FONT_MONO, fontSize: 8.5, color: C.taupe,
    align: "center", charSpacing: 2, margin: 0,
  });
}

// ============================================================
// SLIDE 3 — THE CONCEPT (dark, three numbered pillars + courtyard graphic)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.ink };

  addHeaderBar(s, "THE CONCEPT · 03 / 09", true);
  addRule(s, 0.5, 0.72, 9, C.inkSoft, 0.75);

  // LEFT: positioning text
  s.addText("POSITIONING", {
    x: 0.5, y: 1.0, w: 4, h: 0.3,
    fontFace: FONT_MONO, fontSize: 9, color: C.taupe,
    charSpacing: 3, margin: 0,
  });

  s.addText([
    { text: "Hotel-grade living. ", options: { color: C.cream } },
    { text: "Any length of stay.",  options: { color: C.sunset, italic: true } },
  ], {
    x: 0.5, y: 1.35, w: 5.0, h: 1.4,
    fontFace: FONT_HEAD, fontSize: 28,
    lineSpacingMultiple: 1.1, margin: 0,
  });

  s.addText(
    "Canyon Terra is a single building operated as a private residence club — where the finishes, service, and amenity program are calibrated to hospitality standards, and the lease terms flex from three nights to three years.",
    {
      x: 0.5, y: 2.85, w: 5.0, h: 1.5,
      fontFace: FONT_BODY, fontSize: 11.5, color: C.dune,
      margin: 0, paraSpaceAfter: 4,
    }
  );

  // Three pillars across bottom-left
  const pillars = [
    { n: "01", t: "Designed",   d: "Architecture and interiors as the first amenity" },
    { n: "02", t: "Serviced",   d: "Concierge, housekeeping, F&B on demand" },
    { n: "03", t: "Programmed", d: "A calendar that creates community" },
  ];
  const pY = 4.5;
  const pW = 1.65;
  const pGap = 0.05;
  pillars.forEach((p, i) => {
    const x = 0.5 + i * (pW + pGap);
    s.addText(p.n, {
      x, y: pY, w: pW, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 12, italic: true, color: C.sunset,
      margin: 0,
    });
    s.addText(p.t, {
      x, y: pY + 0.3, w: pW, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 13, color: C.cream,
      margin: 0,
    });
    s.addText(p.d, {
      x, y: pY + 0.6, w: pW, h: 0.5,
      fontFace: FONT_BODY, fontSize: 8.5, color: C.taupe,
      margin: 0,
    });
  });

  // RIGHT: "Courtyard study" abstract graphic
  // Frame
  const fx = 6.3, fy = 1.0, fw = 3.2, fh = 3.6;
  s.addShape(pres.shapes.RECTANGLE, {
    x: fx, y: fy, w: fw, h: fh,
    fill: { color: C.inkSoft }, line: { color: C.inkSoft, width: 0 },
  });
  // Three vertical "columns" (sage / taupe / khaki) suggesting a courtyard elevation
  const colorsCols = [C.sage, C.taupe, C.khaki];
  const colW = 0.75, colGap = 0.2;
  const colsTotal = colW * 3 + colGap * 2;
  const colStart = fx + (fw - colsTotal) / 2;
  colorsCols.forEach((col, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: colStart + i * (colW + colGap),
      y: fy + 0.5, w: colW, h: fh - 1.0,
      fill: { color: col }, line: { color: col, width: 0 },
    });
  });
  // Ground line
  s.addShape(pres.shapes.LINE, {
    x: fx + 0.2, y: fy + fh - 0.35, w: fw - 0.4, h: 0,
    line: { color: C.taupe, width: 1 },
  });
  // Caption under frame
  s.addText("FIG. 01 · COURTYARD STUDY", {
    x: fx, y: fy + fh + 0.1, w: fw, h: 0.3,
    fontFace: FONT_MONO, fontSize: 8, color: C.taupe,
    align: "center", charSpacing: 2, margin: 0,
  });
}

// ============================================================
// SLIDE 4 — LOCATION (light, schematic map + walk list + pull quote)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addHeaderBar(s, "LOCATION · 04 / 09");
  addRule(s, 0.5, 0.72, 9, C.taupe, 0.75);

  // Headline
  s.addText([
    { text: "Old Town Scottsdale ", options: { color: C.ink } },
    { text: "— walkable, cultural, and short on places to stay.", options: { color: C.ink } },
  ], {
    x: 0.5, y: 1.0, w: 9, h: 0.9,
    fontFace: FONT_HEAD, fontSize: 22,
    lineSpacingMultiple: 1.15, margin: 0,
  });

  // LEFT: schematic map panel
  const mx = 0.5, my = 2.25, mw = 5.2, mh = 2.6;
  s.addShape(pres.shapes.RECTANGLE, {
    x: mx, y: my, w: mw, h: mh,
    fill: { color: C.sand }, line: { color: C.taupe, width: 0.5 },
  });
  s.addText("SITE CONTEXT · NOT TO SCALE", {
    x: mx + 0.15, y: my + 0.1, w: 3, h: 0.25,
    fontFace: FONT_MONO, fontSize: 8, color: C.taupe,
    charSpacing: 2, margin: 0,
  });

  // Labeled neighborhood markers (approximate)
  const mapPins = [
    { label: "FASHION SQ.",  x: mx + 3.4, y: my + 0.55 },
    { label: "MUSEUMS",      x: mx + 0.5, y: my + 1.05 },
    { label: "WATERFRONT",   x: mx + 0.5, y: my + 2.15 },
    { label: "OLD TOWN",     x: mx + 3.8, y: my + 2.15 },
  ];
  mapPins.forEach((p) => {
    s.addText(p.label, {
      x: p.x, y: p.y, w: 1.5, h: 0.25,
      fontFace: FONT_MONO, fontSize: 7.5, color: C.inkSoft,
      charSpacing: 1.5, margin: 0,
    });
  });

  // Central site marker: small square with label
  const sx = mx + mw/2 - 0.45, sy = my + mh/2 - 0.22;
  s.addShape(pres.shapes.RECTANGLE, {
    x: sx, y: sy, w: 0.22, h: 0.22,
    fill: { color: C.terracotta }, line: { color: C.terracotta, width: 0 },
  });
  s.addText("CANYON TERRA", {
    x: sx + 0.28, y: sy - 0.02, w: 1.4, h: 0.28,
    fontFace: FONT_MONO, fontSize: 8, color: C.ink, bold: true,
    charSpacing: 2, margin: 0,
  });

  // Dotted walking circles (two concentric rings around site)
  s.addShape(pres.shapes.OVAL, {
    x: mx + mw/2 - 0.9, y: my + mh/2 - 0.9, w: 1.8, h: 1.8,
    fill: { type: "none" },
    line: { color: C.taupe, width: 0.5, dashType: "dash", transparency: 40 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: mx + mw/2 - 1.55, y: my + mh/2 - 1.05, w: 3.1, h: 2.1,
    fill: { type: "none" },
    line: { color: C.taupe, width: 0.5, dashType: "dash", transparency: 60 },
  });

  // RIGHT: walk-time list
  const lx = 6.1;
  s.addText("WITHIN A 10-MINUTE WALK", {
    x: lx, y: 2.25, w: 3.5, h: 0.25,
    fontFace: FONT_MONO, fontSize: 9, color: C.taupe,
    charSpacing: 2.5, margin: 0,
  });
  addRule(s, lx, 2.55, 3.4, C.taupe, 0.75);

  const walks = [
    { p: "Scottsdale Fashion Square",      t: "3 min"  },
    { p: "Old Town dining & galleries",    t: "6 min"  },
    { p: "Waterfront promenade",           t: "8 min"  },
    { p: "Museum of Contemporary Art",     t: "12 min" },
  ];
  walks.forEach((w, i) => {
    const y = 2.7 + i * 0.45;
    s.addText(w.p, {
      x: lx, y, w: 2.6, h: 0.35,
      fontFace: FONT_HEAD, fontSize: 12, color: C.ink,
      margin: 0, valign: "middle",
    });
    s.addText(w.t, {
      x: lx + 2.6, y, w: 0.85, h: 0.35,
      fontFace: FONT_MONO, fontSize: 10, color: C.terracotta, italic: true,
      align: "right", margin: 0, valign: "middle",
    });
    addRule(s, lx, y + 0.4, 3.4, C.taupe, 0.5);
  });

  // Bottom pull quote
  s.addText('"The only zip code in Arizona where someone will walk to dinner."', {
    x: 0.5, y: 5.05, w: 9, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, italic: true, color: C.inkSoft,
    align: "center", margin: 0,
  });
}

// ============================================================
// SLIDE 5 — THE RESIDENT (two-resident comparison)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addHeaderBar(s, "THE RESIDENT · 05 / 09");
  addRule(s, 0.5, 0.72, 9, C.taupe, 0.75);

  s.addText([
    { text: "Two residents. ",       options: { color: C.ink } },
    { text: "One standard of living.",options: { color: C.terracotta, italic: true } },
  ], {
    x: 0.5, y: 1.0, w: 9, h: 0.8,
    fontFace: FONT_HEAD, fontSize: 26, margin: 0,
  });

  // Two panels side by side
  const panels = [
    {
      bg: C.sage,
      figTag: "FIG. 02 · THE RESIDENT",
      title: "The Long Lease",
      share: "~ 75% OF INVENTORY",
      body:  "Young professional, remote-first, six-figure income. Relocating from L.A., S.F., or N.Y.C. Signs 12-month terms and treats the building like a private club.",
      tags:  ["6–24 MONTH LEASES", "STUDIOS, 1BR, 2BR", "DAILY AMENITY USE"],
    },
    {
      bg: C.terracotta,
      figTag: "FIG. 03 · THE VISITOR",
      title: "The Extended Stay",
      share: "~ 25% OF INVENTORY",
      body:  "Visiting athlete during spring training, film talent, CEO on sabbatical, family between homes. Stays two weeks to four months, values discretion and service.",
      tags:  ["NIGHTLY TO 6 MONTHS", "1BR & 2BR ONLY", "CONCIERGE, HOUSEKEEPING"],
    },
  ];

  const pY0 = 2.0;
  const pH  = 3.0;
  const pW  = 4.4;
  const pGap = 0.2;
  const pStart = (W - (pW*2 + pGap)) / 2;

  panels.forEach((p, i) => {
    const x = pStart + i * (pW + pGap);

    // Color header block (top half of panel)
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: pY0, w: pW, h: 0.95,
      fill: { color: p.bg }, line: { color: p.bg, width: 0 },
    });
    s.addText(p.figTag, {
      x: x + 0.2, y: pY0 + 0.6, w: pW - 0.4, h: 0.3,
      fontFace: FONT_MONO, fontSize: 8, color: C.cream,
      charSpacing: 2, margin: 0,
    });

    // Body area (sand)
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: pY0 + 0.95, w: pW, h: pH - 0.95,
      fill: { color: C.sand }, line: { color: C.sand, width: 0 },
    });

    s.addText(p.title, {
      x: x + 0.25, y: pY0 + 1.1, w: pW - 0.5, h: 0.4,
      fontFace: FONT_HEAD, fontSize: 20, color: C.ink,
      margin: 0,
    });
    s.addText(p.share, {
      x: x + 0.25, y: pY0 + 1.55, w: pW - 0.5, h: 0.25,
      fontFace: FONT_MONO, fontSize: 9, color: C.terracotta,
      charSpacing: 2, margin: 0,
    });

    s.addText(p.body, {
      x: x + 0.25, y: pY0 + 1.85, w: pW - 0.5, h: 0.85,
      fontFace: FONT_BODY, fontSize: 10.5, color: C.inkSoft,
      margin: 0,
    });

    // Tag row at bottom
    const tagY = pY0 + pH - 0.3;
    s.addText(p.tags.join("   ·   "), {
      x: x + 0.25, y: tagY, w: pW - 0.5, h: 0.25,
      fontFace: FONT_MONO, fontSize: 7.5, color: C.taupe,
      charSpacing: 1.5, margin: 0,
    });
  });
}

// ============================================================
// SLIDE 6 — AMENITY PROGRAM (four pillars + abstract pool image block)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addHeaderBar(s, "AMENITY PROGRAM · 06 / 09");
  addRule(s, 0.5, 0.72, 9, C.taupe, 0.75);

  s.addText("FOUR PILLARS", {
    x: 0.5, y: 1.0, w: 4, h: 0.3,
    fontFace: FONT_MONO, fontSize: 9, color: C.taupe,
    charSpacing: 3, margin: 0,
  });

  s.addText([
    { text: "The amenities ", options: { color: C.ink } },
    { text: "are the product.", options: { color: C.terracotta, italic: true } },
  ], {
    x: 0.5, y: 1.3, w: 5.0, h: 0.7,
    fontFace: FONT_HEAD, fontSize: 24, margin: 0,
  });

  s.addText(
    "Every square foot of common space is designed to hold up against the private clubs and five-star resorts a Canyon Terra resident already belongs to.",
    {
      x: 0.5, y: 2.15, w: 4.8, h: 1.2,
      fontFace: FONT_BODY, fontSize: 11, color: C.inkSoft,
      margin: 0,
    }
  );

  // LEFT: abstract "rooftop infinity edge" illustration
  const ix = 0.5, iy = 3.55, iw = 4.8, ih = 1.5;
  // water (slate)
  s.addShape(pres.shapes.RECTANGLE, {
    x: ix, y: iy, w: iw, h: ih * 0.55,
    fill: { color: C.slate }, line: { color: C.slate, width: 0 },
  });
  // sand beneath
  s.addShape(pres.shapes.RECTANGLE, {
    x: ix, y: iy + ih * 0.55, w: iw, h: ih * 0.45,
    fill: { color: C.terracotta }, line: { color: C.terracotta, width: 0 },
  });
  s.addText("FIG. 04 · ROOFTOP INFINITY EDGE", {
    x: ix + 0.15, y: iy + ih - 0.3, w: iw - 0.3, h: 0.25,
    fontFace: FONT_MONO, fontSize: 8, color: C.cream,
    charSpacing: 2, margin: 0,
  });

  // RIGHT: 2x2 grid of pillars
  const gx = 5.6, gy = 1.0;
  const gW = 1.95, gH = 2.0, gGap = 0.1;

  const pillars = [
    { n: "01", title: "Rooftop Infinity Pool",
      d: "South-facing with Camelback views. Cabanas, day beds, and an all-day pool café." },
    { n: "02", title: "Recovery & Fitness",
      d: "Sauna, cold plunge, red-light room. Boutique gym with trainers on retainer." },
    { n: "03", title: "Pilates & Yoga",
      d: "Dedicated reformer studio, daily class schedule included for residents." },
    { n: "04", title: "The Studio",
      d: "Co-working lounge with phone rooms, espresso bar, and a library." },
  ];

  pillars.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = gx + col * (gW + gGap);
    const y = gy + row * (gH + gGap);

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: gW, h: gH,
      fill: { color: C.sand }, line: { color: C.sand, width: 0 },
    });

    s.addText(p.n, {
      x: x + 0.18, y: y + 0.15, w: gW - 0.3, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 11, italic: true, color: C.terracotta,
      margin: 0,
    });
    s.addText(p.title, {
      x: x + 0.18, y: y + 0.45, w: gW - 0.3, h: 0.6,
      fontFace: FONT_HEAD, fontSize: 13, color: C.ink,
      margin: 0,
    });
    s.addText(p.d, {
      x: x + 0.18, y: y + 1.0, w: gW - 0.3, h: gH - 1.1,
      fontFace: FONT_BODY, fontSize: 9.5, color: C.inkSoft,
      margin: 0,
    });
  });
}

// ============================================================
// SLIDE 7 — FLEXIBLE STAY MODEL (forest bg, four lease products + timeline)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.forest };

  addHeaderBar(s, "FLEXIBLE STAY MODEL · 07 / 09", true);
  // brand color override for eyebrow + label on green
  // (already cream / taupe — fine)
  addRule(s, 0.5, 0.72, 9, C.sage, 1);

  // Headline
  s.addText([
    { text: "One inventory. ", options: { color: C.cream } },
    { text: "Four lease products.", options: { color: C.apricot, italic: true } },
  ], {
    x: 0.5, y: 1.0, w: 9, h: 0.8,
    fontFace: FONT_HEAD, fontSize: 28, margin: 0,
  });

  // Timeline strip
  const tY = 2.15;
  addRule(s, 0.5, tY, 9, C.sage, 1);
  // tick marks + labels
  const ticks = ["3 NIGHTS", "1 MONTH", "3 MONTHS", "12 MONTHS", "24 MONTHS +"];
  ticks.forEach((t, i) => {
    const x = 0.5 + (i * (9 / (ticks.length - 1)));
    // tick dot
    s.addShape(pres.shapes.OVAL, {
      x: x - 0.06, y: tY - 0.06, w: 0.12, h: 0.12,
      fill: { color: C.apricot }, line: { color: C.apricot, width: 0 },
    });
    // label
    s.addText(t, {
      x: x - 0.9, y: tY + 0.12, w: 1.8, h: 0.3,
      fontFace: FONT_MONO, fontSize: 8, color: C.cream,
      align: "center", charSpacing: 2, margin: 0,
    });
  });

  // Four product cards
  const cards = [
    { tag: "3–29 nights",  title: "THE RETREAT",
      d: "Nightly rate, daily housekeeping, fully furnished. Spring-training and event windows.",
      bg: C.ink },
    { tag: "1–5 months",   title: "THE SEASON",
      d: "Monthly rate, light housekeeping. Snowbird and relocation-friendly.",
      bg: C.ink },
    { tag: "6–12 months",  title: "THE YEAR",
      d: "Annual lease, unfurnished or designer-furnished, full amenity access.",
      bg: C.apricot, dark: true },
    { tag: "13+ months",   title: "THE RESIDENCE",
      d: "Multi-year with renewal incentives, storage, parking, guest suite credits.",
      bg: C.ink },
  ];

  const cY = 2.8;
  const cH = 1.95;
  const cW = 2.15;
  const cGap = 0.13;
  const cStart = (W - (cW * 4 + cGap * 3)) / 2;

  cards.forEach((c, i) => {
    const x = cStart + i * (cW + cGap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cY, w: cW, h: cH,
      fill: { color: c.bg }, line: { color: c.bg, width: 0 },
    });
    const textColor = c.dark ? C.ink : C.cream;
    const bodyColor = c.dark ? C.inkSoft : C.dune;
    const tagColor  = c.dark ? C.forest : C.apricot;

    s.addText(c.tag, {
      x: x + 0.18, y: cY + 0.15, w: cW - 0.36, h: 0.28,
      fontFace: FONT_MONO, fontSize: 8.5, color: tagColor, italic: true,
      charSpacing: 1.5, margin: 0,
    });
    s.addText(c.title, {
      x: x + 0.18, y: cY + 0.45, w: cW - 0.36, h: 0.4,
      fontFace: FONT_HEAD, fontSize: 16, color: textColor,
      charSpacing: 1, margin: 0,
    });
    s.addText(c.d, {
      x: x + 0.18, y: cY + 0.95, w: cW - 0.36, h: cH - 1.05,
      fontFace: FONT_BODY, fontSize: 9.5, color: bodyColor,
      margin: 0,
    });
  });

  // Footer caption
  s.addText(
    "Target mix: 75% leases of 6+ months · 25% short-stay inventory rotated as a premium pool.",
    {
      x: 0.5, y: 5.05, w: 9, h: 0.35,
      fontFace: FONT_BODY, fontSize: 10.5, color: C.apricot, italic: true,
      align: "center", margin: 0,
    }
  );
}

// ============================================================
// SLIDE 8 — EXPERIENCE CALENDAR
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addHeaderBar(s, "EXPERIENCE CALENDAR · 08 / 09");
  addRule(s, 0.5, 0.72, 9, C.taupe, 0.75);

  s.addText([
    { text: "A building that ", options: { color: C.ink } },
    { text: "programs itself.", options: { color: C.terracotta, italic: true } },
  ], {
    x: 0.5, y: 1.0, w: 9, h: 0.7,
    fontFace: FONT_HEAD, fontSize: 26, margin: 0,
  });

  s.addText(
    "A resident-only calendar run by an in-house Experience Director — the amenity that separates a good building from a great one.",
    {
      x: 0.5, y: 1.75, w: 9, h: 0.6,
      fontFace: FONT_BODY, fontSize: 12, color: C.inkSoft, italic: true,
      margin: 0,
    }
  );

  // Calendar: 4 columns x 2 rows of event cards (8 total)
  const events = [
    { day: "MON",       cat: "WELLNESS", t: "Morning Flow",      d: "Reformer Pilates · 07:00" },
    { day: "WED",       cat: "DINING",   t: "Supper Club",       d: "Rotating chef · private dining" },
    { day: "THU",       cat: "SERVICE",  t: "Studio Hours",      d: "Tax & trust office hours" },
    { day: "FRI",       cat: "SOCIAL",   t: "Sunset Swim",       d: "Rooftop DJ · poolside service" },
    { day: "SAT",       cat: "WELLNESS", t: "Trail & Coffee",    d: "Pinnacle Peak hike + espresso" },
    { day: "SUN",       cat: "CULTURE",  t: "Collector's Tour",  d: "Private visit · local gallery" },
    { day: "MONTHLY",   cat: "DINING",   t: "Vintner's Table",   d: "Winemaker dinner, 24 seats" },
    { day: "QUARTERLY", cat: "SOCIAL",   t: "Courtyard Cinema",  d: "Open-air film · invited guests" },
  ];

  const catColor = {
    WELLNESS: C.sage,
    DINING:   C.terracotta,
    SERVICE:  C.taupe,
    SOCIAL:   C.sunset,
    CULTURE:  C.inkSoft,
  };

  const gx = 0.5, gy = 2.55;
  const cW = 2.2, cH = 1.2, cGapX = 0.1, cGapY = 0.1;
  const gridStart = (W - (cW * 4 + cGapX * 3)) / 2;

  events.forEach((e, i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = gridStart + col * (cW + cGapX);
    const y = gy + row * (cH + cGapY);

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cW, h: cH,
      fill: { color: C.sand }, line: { color: C.sand, width: 0 },
    });

    // left accent stripe
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.05, h: cH,
      fill: { color: catColor[e.cat] || C.taupe },
      line: { color: catColor[e.cat] || C.taupe, width: 0 },
    });

    s.addText(e.day, {
      x: x + 0.15, y: y + 0.08, w: cW - 0.3, h: 0.22,
      fontFace: FONT_MONO, fontSize: 8, color: C.inkSoft, bold: true,
      charSpacing: 2, margin: 0,
    });
    s.addText(e.cat, {
      x: x + 0.15, y: y + 0.08, w: cW - 0.3, h: 0.22,
      fontFace: FONT_MONO, fontSize: 8, color: catColor[e.cat] || C.taupe,
      align: "right", charSpacing: 2, margin: 0,
    });
    s.addText(e.t, {
      x: x + 0.15, y: y + 0.35, w: cW - 0.3, h: 0.35,
      fontFace: FONT_HEAD, fontSize: 13, color: C.ink,
      margin: 0,
    });
    s.addText(e.d, {
      x: x + 0.15, y: y + 0.72, w: cW - 0.3, h: 0.45,
      fontFace: FONT_BODY, fontSize: 9, color: C.inkSoft,
      margin: 0,
    });
  });
}

// ============================================================
// SLIDE 9 — WHAT'S NEXT (dark, closing — same as opener)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.ink };

  addHeaderBar(s, "WHAT'S NEXT · 09 / 09", true);

  s.addText("PARTNER REVIEW · 2026", {
    x: 0.5, y: 1.15, w: 4.5, h: 0.3,
    fontFace: FONT_MONO, fontSize: 9.5, color: C.taupe,
    charSpacing: 3, margin: 0,
  });

  s.addText([
    { text: "Let's build a ",  options: { color: C.cream } },
    { text: "building ",       options: { color: C.cream, breakLine: true } },
    { text: "worth ",          options: { color: C.cream } },
    { text: "moving ",         options: { color: C.terracotta, italic: true } },
    { text: "for.",            options: { color: C.terracotta, italic: true } },
  ], {
    x: 0.5, y: 1.55, w: 4.8, h: 2.3,
    fontFace: FONT_HEAD, fontSize: 34,
    margin: 0, lineSpacingMultiple: 1.05,
  });

  s.addText(
    "We're raising the first partner round to complete site control, concept architecture, and operator selection. Financial model follows in Volume 02.",
    {
      x: 0.5, y: 4.0, w: 4.5, h: 1.0,
      fontFace: FONT_BODY, fontSize: 11, color: C.dune,
      margin: 0,
    }
  );

  const rx = 5.6;
  const rowY = [1.55, 2.25, 2.95, 3.65];
  const quarters  = ["Q3", "Q4", "Q1 '27", "Q2 '27"];
  const items = [
    "Site control · Old Town parcel",
    "Concept architecture · interior partners",
    "Operator selection · brand build",
    "Capital stack · Volume 02 financials",
  ];

  addRule(s, rx, 1.4, 3.9, C.inkSoft, 1);

  quarters.forEach((q, i) => {
    s.addText(q, {
      x: rx, y: rowY[i], w: 0.9, h: 0.35,
      fontFace: FONT_HEAD, fontSize: 15, italic: true, color: C.sunset,
      margin: 0, valign: "top",
    });
    s.addText(items[i], {
      x: rx + 1.05, y: rowY[i] + 0.04, w: 2.9, h: 0.4,
      fontFace: FONT_BODY, fontSize: 11.5, color: C.cream,
      margin: 0, valign: "top",
    });
    addRule(s, rx, rowY[i] + 0.55, 3.9, C.inkSoft, 0.75);
  });

  addRule(s, 0.5, 5.05, 9, C.inkSoft, 0.75);
  s.addText("Canyon Terra", {
    x: 0.5, y: 5.15, w: 3, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10, italic: true, color: C.taupe,
    margin: 0,
  });
  s.addText("CONFIDENTIAL · FOR PARTNER REVIEW ONLY", {
    x: W - 4.5, y: 5.15, w: 4, h: 0.3,
    fontFace: FONT_MONO, fontSize: 8.5, color: C.taupe,
    align: "right", charSpacing: 2, margin: 0,
  });
}

// ============================================================
// WRITE FILE
// ============================================================
pres.writeFile({ fileName: "canyon-terra-pitch-deck.pptx" })
  .then((fileName) => console.log(`Wrote ${fileName}`));
