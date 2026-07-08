/**
 * On My Grind — PPTX Replica Builder
 * --------------------------------------------------------------
 * Recreates the HTML deck (On_My_Grind_Deck.html) as a PPTX
 * using pptxgenjs. Canvas is 1920x1080 px → 20" x 11.25" slide.
 *
 * Fonts are kept IDENTICAL to the HTML source:
 *   - Anton        (display headlines, big numbers, marquee)
 *   - Archivo Black (display fallback)
 *   - Instrument Serif (italic serif quote/lede)
 *   - JetBrains Mono (mono labels, corners, footers)
 *
 * Usage:  node build_deck.js
 * Output: On_My_Grind_Deck.pptx
 */

const pptxgen = require("pptxgenjs");

// ─── Unit conversion helpers ────────────────────────────────────
// HTML canvas is 1920x1080 at 96dpi. We map 1px → 1/96 inch.
const px = (n) => n / 96;               // px → inches (positions/sizes)
const fs = (n) => +(n * 0.75).toFixed(2); // px → pt   (font sizes, 1px = 0.75pt)

// Character spacing: CSS "letter-spacing" is in em. PptxGenJS charSpacing
// is in POINTS (library multiplies by 100 internally). Formula: em * fontPt.
const cs = (emVal, fontPx) => +(emVal * fs(fontPx)).toFixed(2);

// ─── Palette (matches :root vars in the HTML) ───────────────────
const C = {
  ink:   "0C0C0C",   // --ink
  bone:  "F3EFE6",   // --bone
  paper: "EBE5D6",   // --paper
  acid:  "C8E93D",   // oklch(0.88 0.19 120) → sRGB
  red:   "E63946",   // --red
  mute:  "6B665C",   // --mute
  phBg:  "D9D3C3",   // placeholder background (on bone slides)
  phInk: "1A1A1A",   // placeholder on ink-bg slides
};

// ─── Font families (authored names preserved exactly) ───────────
const F = {
  display: "Anton",
  displayAlt: "Archivo Black",
  serif:   "Instrument Serif",
  mono:    "JetBrains Mono",
};

// ─── Presentation setup ─────────────────────────────────────────
const pres = new pptxgen();
pres.title  = "On My Grind — Introduction Deck";
pres.author = "OMG";
pres.defineLayout({ name: "CUSTOM_20x11_25", width: 20, height: 11.25 });
pres.layout = "CUSTOM_20x11_25";

// Slide canvas in inches
const W = 20, H = 11.25;

// ─── Reusable chrome: corner header + footer ────────────────────
function addCorner(slide, leftText, rightText, onInk = false) {
  const color = onInk ? C.bone : C.ink;
  const dotColor = onInk ? C.acid : C.ink;

  // Black dot before leftText
  slide.addShape(pres.shapes.OVAL, {
    x: px(40), y: px(45), w: px(10), h: px(10),
    fill: { color: dotColor }, line: { type: "none" },
  });
  // Left corner text (with room after the dot)
  slide.addText(leftText, {
    x: px(58), y: px(36), w: px(900), h: px(28),
    fontFace: F.mono, fontSize: fs(14),
    charSpacing: cs(0.18, 14),
    color, bold: false, margin: 0, valign: "middle",
  });
  // Right corner text
  slide.addText(rightText, {
    x: px(940), y: px(36), w: px(940), h: px(28),
    fontFace: F.mono, fontSize: fs(14),
    charSpacing: cs(0.18, 14),
    color, align: "right", margin: 0, valign: "middle",
  });
}

function addFooter(slide, left, middle, right, onInk = false) {
  const color = onInk ? C.bone : C.ink;
  const y = px(1080 - 34 - 18); // bottom:34px, approx text height
  const baseOpts = {
    y, h: px(22),
    fontFace: F.mono, fontSize: fs(13),
    charSpacing: cs(0.18, 13),
    color, margin: 0, valign: "middle",
  };
  slide.addText(left,   { ...baseOpts, x: px(40),   w: px(600), align: "left"   });
  slide.addText(middle, { ...baseOpts, x: px(640),  w: px(640), align: "center" });
  slide.addText(right,  { ...baseOpts, x: px(1280), w: px(600), align: "right"  });
}

// Tag (outlined mono pill, e.g. "MISSION")
function addTag(slide, label, x, y, opts = {}) {
  const onInk = opts.onInk || false;
  const color = onInk ? C.bone : C.ink;
  const text = label;
  // Approx width: ~12px per char at 14px + padding 20px
  const w  = opts.w  ?? px(Math.max(10, text.length) * 12 + 24);
  const h  = opts.h  ?? px(34);
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { type: "none" },
    line: { color, width: 1.5 },
  });
  slide.addText(text, {
    x, y, w, h,
    fontFace: F.mono, fontSize: fs(14),
    charSpacing: cs(0.12, 14),
    color, margin: 0, align: "center", valign: "middle",
  });
}

// Thick rule
function addRule(slide, x, y, w, thick = 2, onInk = false) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: px(thick),
    fill: { color: onInk ? C.bone : C.ink },
    line: { type: "none" },
  });
}

// ═══════════════════════════════════════════════════════════════
//  SLIDE 01 — COVER
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bone };

  // Decorative diagonal stripe block (bottom-right, subtle)
  // approximated with a rotated tinted rectangle
  s.addShape(pres.shapes.RECTANGLE, {
    x: px(1300), y: px(600), w: px(640), h: px(640),
    rotate: 12,
    fill: { color: C.ink, transparency: 92 },
    line: { type: "none" },
  });

  // Corner header
  addCorner(s, "OMG // INTRODUCTION", "CONFIDENTIAL // FOR UNIVERSAL MUSIC GROUP");

  // EST. 2019 stamp (circle with text, rotated -8deg)
  s.addShape(pres.shapes.OVAL, {
    x: px(1620), y: px(140), w: px(220), h: px(220),
    rotate: -8,
    fill: { type: "none" },
    line: { color: C.ink, width: 3 },
  });
  s.addText("EST. 2019", {
    x: px(1620), y: px(178), w: px(220), h: px(22),
    rotate: -8,
    fontFace: F.mono, fontSize: fs(12),
    charSpacing: cs(0.25, 12),
    color: C.ink, align: "center", valign: "middle", margin: 0,
  });
  s.addText("LA", {
    x: px(1620), y: px(202), w: px(220), h: px(100),
    rotate: -8,
    fontFace: F.display, fontSize: fs(64),
    color: C.ink, align: "center", valign: "middle", margin: 0,
    charSpacing: cs(-0.01, 64),
  });
  s.addText("WEST COAST", {
    x: px(1620), y: px(312), w: px(220), h: px(22),
    rotate: -8,
    fontFace: F.mono, fontSize: fs(11),
    charSpacing: cs(0.22, 11),
    color: C.ink, align: "center", valign: "middle", margin: 0,
  });

  // Eyebrow tagline
  s.addText("A HIP-HOP LABEL // LOS ANGELES, CA", {
    x: px(80), y: px(190), w: px(1460), h: px(36),
    fontFace: F.mono, fontSize: fs(26),
    charSpacing: cs(0.3, 26),
    color: C.ink, margin: 0, valign: "middle",
  });

  // Massive headline "ON / MY / GRIND." — stacked lines
  const bigOpts = {
    fontFace: F.display, fontSize: fs(230),
    color: C.ink, margin: 0, charSpacing: cs(-0.01, 230),
  };
  // Line-height is 0.86 → line stride ~= 230 * 0.86 = 197.8 px
  s.addText("ON", { x: px(80), y: px(250), w: px(1400), h: px(210), align: "left", valign: "top", ...bigOpts });
  s.addText("MY", { x: px(80), y: px(250 + 198), w: px(1400), h: px(210), align: "left", valign: "top", ...bigOpts });
  s.addText([
    { text: "GRIND", options: {} },
    { text: ".",     options: { color: C.red } },
  ], {
    x: px(80), y: px(250 + 396), w: px(1400), h: px(220),
    align: "left", valign: "top",
    fontFace: F.display, fontSize: fs(230),
    charSpacing: cs(-0.01, 230), margin: 0,
  });

  // Marquee strip at bottom (rotated -1.5deg)
  const stripY = px(1080 - 120 - 64);
  s.addShape(pres.shapes.RECTANGLE, {
    x: px(-40), y: stripY, w: px(2000), h: px(64),
    rotate: -1.5,
    fill: { color: C.ink },
    line: { type: "none" },
  });
  s.addText([
    { text: "WE BUILD ARTISTS",  options: { color: C.bone } },
    { text: "  ◆  ",              options: { color: C.acid } },
    { text: "WE BUILD CATALOGS", options: { color: C.bone } },
    { text: "  ◆  ",              options: { color: C.acid } },
    { text: "WE BUILD CULTURE",  options: { color: C.bone } },
    { text: "  ◆  ",              options: { color: C.acid } },
    { text: "WE BUILD ARTISTS",  options: { color: C.bone } },
  ], {
    x: px(-40), y: stripY, w: px(2000), h: px(64),
    rotate: -1.5,
    fontFace: F.display, fontSize: fs(36),
    charSpacing: cs(0.04, 36),
    align: "center", valign: "middle", margin: 0,
  });

  addFooter(s, "PREPARED BY CEO NAME // OMG", "01 / 10", "MONTH YYYY");
}

// ═══════════════════════════════════════════════════════════════
//  SLIDE 02 — MISSION
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bone };
  addCorner(s, "SECTION 01 // WHO WE ARE", "ON MY GRIND");

  // Huge "01" in acid on the right (authored size 860px in Anton is enormous;
  // pull to far-right so it reads as a graphic accent behind the text column).
  s.addText("01", {
    x: px(1280), y: px(140), w: px(680), h: px(900),
    fontFace: F.display, fontSize: fs(700),
    charSpacing: cs(-0.02, 700),
    color: C.acid, align: "right", valign: "top", margin: 0,
  });

  // MISSION tag
  addTag(s, "MISSION", px(80), px(220), { w: px(130) });

  // Big headline stacked
  const h2Opts = {
    fontFace: F.display, fontSize: fs(168),
    charSpacing: cs(-0.01, 168),
    color: C.ink, margin: 0, valign: "top", align: "left",
  };
  // line stride ~= 168 * 0.86 = 144.5 px
  s.addText("ARTISTS", { x: px(80), y: px(280),       w: px(900), h: px(160), ...h2Opts });
  s.addText("FIRST.",   { x: px(80), y: px(280 + 145), w: px(900), h: px(160), ...h2Opts });
  s.addText("ALWAYS.",  { x: px(80), y: px(280 + 290), w: px(900), h: px(160), ...h2Opts });

  // Rule + serif paragraph
  addRule(s, px(80), px(740), px(120), 6);
  s.addText(
    "We sign the voices the majors miss, put them on stage before the algorithm catches up, and keep the paperwork honest.",
    {
      x: px(80), y: px(770), w: px(880), h: px(220),
      fontFace: F.serif, fontSize: fs(46), italic: true,
      color: C.ink, margin: 0, valign: "top", paraSpaceAfter: 0,
      charSpacing: cs(-0.01, 46),
    }
  );

  // Right-hand stacked callouts (4 grid rows). Give more height per row
  // and shrink the value font slightly so long lines fit on one line.
  const rightX = px(980), rightW = px(860);
  const callouts = [
    { k: "WHAT WE ARE", v: "AN INDEPENDENT HIP-HOP LABEL" },
    { k: "WHAT WE DO",  v: "A&R // MANAGEMENT // MASTERS" },
    { k: "WHERE",       v: "LOS ANGELES → EVERYWHERE" },
    { k: "SINCE",       v: "2019 // SEVEN YEARS DEEP" },
  ];
  let rowY = 260;
  const rowStride = 170;
  callouts.forEach((row, i) => {
    // Bottom border for first 3 rows (not the last)
    if (i < callouts.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: rightX, y: px(rowY + rowStride - 6), w: rightW, h: px(2),
        fill: { color: C.ink }, line: { type: "none" },
      });
    }
    // Label
    s.addText(row.k, {
      x: rightX, y: px(rowY + 18), w: rightW, h: px(26),
      fontFace: F.mono, fontSize: fs(14),
      charSpacing: cs(0.2, 14),
      color: C.mute, margin: 0, valign: "top",
    });
    // Value — 44px fits "AN INDEPENDENT HIP-HOP LABEL" within 860px
    s.addText(row.v, {
      x: rightX, y: px(rowY + 56), w: rightW, h: px(96),
      fontFace: F.display, fontSize: fs(44),
      charSpacing: cs(-0.01, 44),
      color: C.ink, margin: 0, valign: "top",
    });
    rowY += rowStride;
  });

  addFooter(s, "OMG // MISSION", "02 / 10", "ARTISTS FIRST. ALWAYS.");
}

// ═══════════════════════════════════════════════════════════════
//  SLIDE 03 — FOUNDER STORY (ink bg)
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.ink };
  addCorner(s, "SECTION 02 // ORIGIN", "FOUNDER NAME", true);

  // Portrait placeholder (rotated -2deg)
  const pw = px(720), ph = px(820), pxx = px(80), pyy = px(180);
  s.addShape(pres.shapes.RECTANGLE, {
    x: pxx, y: pyy, w: pw, h: ph,
    rotate: -2,
    fill: { color: C.phInk },
    line: { color: C.bone, width: 2 },
  });
  // Top-right corner label
  s.addText("// PORTRAIT 01", {
    x: pxx + pw - px(160), y: pyy + px(12), w: px(150), h: px(22),
    rotate: -2,
    fontFace: F.mono, fontSize: fs(12),
    charSpacing: cs(0.1, 12),
    color: C.bone, margin: 0, align: "right", valign: "top",
  });
  // Bottom-left tag
  s.addShape(pres.shapes.RECTANGLE, {
    x: pxx + px(14), y: pyy + ph - px(38), w: px(280), h: px(26),
    rotate: -2,
    fill: { color: C.bone }, line: { type: "none" },
  });
  s.addText("FOUNDER PORTRAIT — B&W", {
    x: pxx + px(14), y: pyy + ph - px(38), w: px(280), h: px(26),
    rotate: -2,
    fontFace: F.mono, fontSize: fs(13),
    charSpacing: cs(0.1, 13),
    color: C.ink, margin: 0, align: "center", valign: "middle",
  });

  // FOUNDER STORY tag
  addTag(s, "FOUNDER STORY", px(900), px(200), { w: px(180), onInk: true });

  // Big serif quote — leading and trailing smart-quotes in acid
  s.addText([
    { text: "“",     options: { color: C.acid, fontFace: F.display, italic: false } },
    { text: "I started OMG out of a one-bedroom in Inglewood with a laptop, a borrowed SM7B, and one artist who trusted me.",
      options: { color: C.bone, fontFace: F.serif, italic: true } },
    { text: "”",     options: { color: C.acid, fontFace: F.display, italic: false } },
  ], {
    x: px(900), y: px(260), w: px(940), h: px(420),
    fontSize: fs(72),
    charSpacing: cs(-0.01, 72),
    margin: 0, valign: "top", paraSpaceAfter: 0,
  });

  // Attribution
  s.addText("— CEO NAME, FOUNDER", {
    x: px(900), y: px(700), w: px(940), h: px(26),
    fontFace: F.mono, fontSize: fs(16),
    charSpacing: cs(0.24, 16),
    color: C.acid, margin: 0, valign: "top",
  });

  // Timeline: rule + 4 columns
  addRule(s, px(900), px(780), px(940), 2, true);

  const tlY = 812, colW = (940 - 28 * 3) / 4;
  const timeline = [
    { yr: "'19", lines: "OMG FOUNDED\nINGLEWOOD, CA", accent: true },
    { yr: "'21", lines: "FIRST GOLD\nSINGLE",        accent: false },
    { yr: "'23", lines: "MOVED HQ TO\nDOWNTOWN LA",  accent: false },
    { yr: "'26", lines: "5 ARTISTS\n14 STAFF",       accent: false },
  ];
  timeline.forEach((col, i) => {
    const cx = px(900 + i * (colW + 28));
    s.addText(col.yr, {
      x: cx, y: px(tlY), w: px(colW), h: px(88),
      fontFace: F.display, fontSize: fs(72),
      charSpacing: cs(-0.01, 72),
      color: col.accent ? C.acid : C.bone,
      margin: 0, valign: "top",
    });
    const [l1, l2] = col.lines.split("\n");
    s.addText([
      { text: l1, options: { breakLine: true } },
      { text: l2, options: {} },
    ], {
      x: cx, y: px(tlY + 82), w: px(colW), h: px(64),
      fontFace: F.mono, fontSize: fs(13),
      charSpacing: cs(0.16, 13),
      color: C.bone, margin: 0, valign: "top",
      paraSpaceAfter: 0,
    });
  });

  addFooter(s, "OMG // ORIGIN", "03 / 10", "FROM A BEDROOM TO A BUILDING", true);
}

// ═══════════════════════════════════════════════════════════════
//  SLIDE 04 — ROSTER
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bone };
  addCorner(s, "SECTION 03 // ROSTER", "05 ARTISTS · 01 LABEL");

  addTag(s, "THE ROSTER", px(80), px(160), { w: px(150) });

  // "FIVE/VOICES." with red slash
  s.addText([
    { text: "FIVE",    options: {} },
    { text: "/",       options: { color: C.red } },
    { text: "VOICES.", options: {} },
  ], {
    x: px(80), y: px(210), w: px(1800), h: px(200),
    fontFace: F.display, fontSize: fs(180),
    charSpacing: cs(-0.01, 180),
    color: C.ink, margin: 0, valign: "top",
  });

  // Italic serif tagline
  s.addText("One sound each. Curated, not collected.", {
    x: px(80), y: px(430), w: px(1100), h: px(60),
    fontFace: F.serif, fontSize: fs(38), italic: true,
    charSpacing: cs(-0.01, 38),
    color: C.ink, margin: 0, valign: "top",
  });

  // 5 artist tiles
  const tileW = (1920 - 160 - 24 * 4) / 5; // 5 tiles, 4 gaps of 24px
  const tileH = 300;
  const tileYBase = 620;
  const artists = [
    { name: "NOVA CINCO", meta: "WEST COAST · MELODIC · SIGNED '20", offset: 0,  rot: -1.5, bg: "ph",   num: "01" },
    { name: "KILO DIOR",  meta: "TRAP · DRILL · SIGNED '21",         offset: 18, rot: 1.2,  bg: "ink",  num: "02" },
    { name: "SAINT AYO",  meta: "BOOM-BAP · LYRICIST · SIGNED '22",  offset: 0,  rot: -2,   bg: "ph",   num: "03" },
    { name: "LIL VESPER", meta: "PLUGG · HYPERPOP · SIGNED '24",     offset: 24, rot: 1.8,  bg: "acid", num: "04" },
    { name: "22KAY",      meta: "R&B-ADJACENT · SIGNED '25",         offset: 0,  rot: -1,   bg: "ph",   num: "05" },
  ];

  artists.forEach((a, i) => {
    const tx = px(80 + i * (tileW + 24));
    const ty = px(tileYBase + a.offset);
    let phFill, phLineColor, labelBg, labelFg, trFg;
    if (a.bg === "ink")  { phFill = C.ink;   phLineColor = C.ink;  labelBg = C.bone; labelFg = C.ink; trFg = C.bone; }
    else if (a.bg === "acid") { phFill = C.acid; phLineColor = C.ink; labelBg = C.ink;  labelFg = C.bone; trFg = C.ink; }
    else                  { phFill = C.phBg;  phLineColor = C.ink;  labelBg = C.ink;  labelFg = C.bone; trFg = C.ink; }

    // Placeholder box
    s.addShape(pres.shapes.RECTANGLE, {
      x: tx, y: ty, w: px(tileW), h: px(tileH),
      rotate: a.rot,
      fill: { color: phFill }, line: { color: phLineColor, width: 2 },
    });
    // Top-right number
    s.addText(a.num, {
      x: tx + px(tileW - 60), y: ty + px(12), w: px(50), h: px(22),
      rotate: a.rot,
      fontFace: F.mono, fontSize: fs(12),
      charSpacing: cs(0.1, 12),
      color: trFg, align: "right", margin: 0, valign: "top",
    });
    // Bottom-left label chip
    const chipW = px(180), chipH = px(24);
    s.addShape(pres.shapes.RECTANGLE, {
      x: tx + px(14), y: ty + px(tileH) - px(38), w: chipW, h: chipH,
      rotate: a.rot,
      fill: { color: labelBg }, line: { type: "none" },
    });
    s.addText(`ARTIST ${a.num} PHOTO`, {
      x: tx + px(14), y: ty + px(tileH) - px(38), w: chipW, h: chipH,
      rotate: a.rot,
      fontFace: F.mono, fontSize: fs(12),
      charSpacing: cs(0.1, 12),
      color: labelFg, margin: 0, align: "center", valign: "middle",
    });

    // Artist name
    s.addText(a.name, {
      x: tx, y: ty + px(tileH + 14), w: px(tileW), h: px(56),
      fontFace: F.display, fontSize: fs(44),
      charSpacing: cs(-0.01, 44),
      color: C.ink, margin: 0, valign: "top",
    });
    // Meta
    s.addText(a.meta, {
      x: tx, y: ty + px(tileH + 72), w: px(tileW), h: px(22),
      fontFace: F.mono, fontSize: fs(12),
      charSpacing: cs(0.14, 12),
      color: C.mute, margin: 0, valign: "top",
    });
  });

  addFooter(s, "OMG // ROSTER", "04 / 10", "CURATED, NOT COLLECTED");
}

// ═══════════════════════════════════════════════════════════════
//  SLIDE 05 — SIGNATURE RELEASES / CATALOG
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bone };
  addCorner(s, "SECTION 04 // CATALOG", "SELECTED RELEASES");

  addTag(s, "HITS & HIGHLIGHTS", px(80), px(140), { w: px(215) });

  // Big two-line title
  s.addText("THE CATALOG", {
    x: px(80), y: px(196), w: px(1760), h: px(124),
    fontFace: F.display, fontSize: fs(130),
    charSpacing: cs(-0.01, 130),
    color: C.ink, margin: 0, valign: "top",
  });
  s.addText("IS THE POINT.", {
    x: px(80), y: px(196 + 112), w: px(1760), h: px(124),
    fontFace: F.display, fontSize: fs(130),
    charSpacing: cs(-0.01, 130),
    color: C.ink, margin: 0, valign: "top",
  });

  // Table area: starts at y=500
  const tX = px(80), tW = px(1760);
  // Columns: # / TITLE / ARTIST / YEAR / PEAK / STREAMS
  // Widened ARTIST and PEAK so the longest cells (NOVA CINCO × KILO,
  // VIRAL · TIKTOK, #7 HOT 100) don't wrap at 36pt Anton.
  const colPx = [80, 660, 380, 180, 280, 180];
  // 80+660+380+180+280+180 = 1760 ✓
  const colStarts = [];
  { let acc = 80; for (const w of colPx) { colStarts.push(acc); acc += w; } }
  const colPxInches = colPx.map(px);
  const colStartsIn = colStarts.map(px);

  // Thick top rule
  s.addShape(pres.shapes.RECTANGLE, {
    x: tX, y: px(500), w: tW, h: px(6),
    fill: { color: C.ink }, line: { type: "none" },
  });

  // Header row (mono, muted)
  const headerY = 514;
  const headers = ["#", "TITLE", "ARTIST", "YEAR", "PEAK", "STREAMS"];
  headers.forEach((h, i) => {
    s.addText(h, {
      x: colStartsIn[i], y: px(headerY), w: colPxInches[i], h: px(30),
      fontFace: F.mono, fontSize: fs(13),
      charSpacing: cs(0.18, 13),
      color: C.mute, margin: 0, valign: "middle",
    });
  });
  // Header bottom border
  s.addShape(pres.shapes.RECTANGLE, {
    x: tX, y: px(headerY + 30), w: tW, h: px(2),
    fill: { color: C.ink }, line: { type: "none" },
  });

  // Release rows
  const rows = [
    ["01", "WESTSIDE GOSPEL",        "NOVA CINCO",        "2022", "GOLD",         "120M"],
    ["02", "GRIND SZN (FT. KILO DIOR)", "NOVA CINCO × KILO", "2023", "PLATINUM",     "340M"],
    ["03", "INK IN MY VEINS",        "SAINT AYO",         "2024", "CRITIC PICK",  "48M"],
    ["04", "DOLLHOUSE MANIAC",       "LIL VESPER",        "2025", "#7 HOT 100",   "210M"],
    ["05", "LATE NIGHT LA",          "22KAY",             "2026", "VIRAL · TIKTOK","62M YTD"],
  ];
  const rowHeight = 72; // 14 + ~44 + 14
  const rowStart = headerY + 32;

  rows.forEach((row, ri) => {
    const ry = rowStart + ri * rowHeight;
    const isAcid = ri === 1; // 02 = acid-row in source

    if (isAcid) {
      // Acid background stretched slightly past edges (mimics -12px margin/padding trick)
      s.addShape(pres.shapes.RECTANGLE, {
        x: tX - px(12), y: px(ry), w: tW + px(24), h: px(rowHeight - 2),
        fill: { color: C.acid }, line: { type: "none" },
      });
    }
    row.forEach((cell, ci) => {
      s.addText(cell, {
        x: colStartsIn[ci], y: px(ry + 10), w: colPxInches[ci], h: px(52),
        fontFace: F.display, fontSize: fs(36),
        charSpacing: cs(0.005, 36),
        color: C.ink, margin: 0, valign: "middle",
      });
    });
    // Row bottom border
    s.addShape(pres.shapes.RECTANGLE, {
      x: tX, y: px(ry + rowHeight - 2), w: tW, h: px(2),
      fill: { color: C.ink }, line: { type: "none" },
    });
  });

  addFooter(s, "OMG // CATALOG", "05 / 10", "ALL FIGURES APPROX · PLACEHOLDER");
}

// ═══════════════════════════════════════════════════════════════
//  SLIDE 06 — STREAMING & SOCIAL / TRACTION (ink bg)
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.ink };
  addCorner(s, "SECTION 05 // TRACTION", "STREAMING + SOCIAL · 2026 YTD", true);

  addTag(s, "BY THE NUMBERS", px(80), px(180), { w: px(200), onInk: true });

  // Big headline with acid asterisk
  const bigOpts = {
    fontFace: F.display, fontSize: fs(120),
    charSpacing: cs(-0.01, 120),
    color: C.bone, margin: 0, valign: "top", align: "left",
  };
  // Line stride 120 * 0.86 = 103.2
  s.addText("WE MOVE",   { x: px(80), y: px(240),       w: px(900), h: px(110), ...bigOpts });
  s.addText("WITHOUT",   { x: px(80), y: px(240 + 103), w: px(900), h: px(110), ...bigOpts });
  s.addText([
    { text: "A MAJOR.", options: {} },
    { text: "*",        options: { color: C.acid } },
  ], {
    x: px(80), y: px(240 + 206), w: px(900), h: px(110),
    fontFace: F.display, fontSize: fs(120),
    charSpacing: cs(-0.01, 120),
    color: C.bone, margin: 0, valign: "top", align: "left",
  });

  s.addText("* SO FAR.", {
    x: px(80), y: px(240 + 316 + 22), w: px(900), h: px(28),
    fontFace: F.mono, fontSize: fs(13),
    charSpacing: cs(0.22, 13),
    color: C.acid, margin: 0, valign: "top",
  });

  // Right-side 2x2 stat grid
  const gx = px(1000), gw = 880; // grid total width inner
  const halfW = gw / 2;
  const cells = [
    { v: "1.8B",  l: "LIFETIME STREAMS\nACROSS ROSTER",     c: C.acid },
    { v: "14.2M", l: "MONTHLY LISTENERS\nCOMBINED (SPOTIFY)", c: C.bone },
    { v: "9.6M",  l: "TIKTOK FOLLOWERS\nROSTER TOTAL",       c: C.bone },
    { v: "+212%", l: "YoY STREAM GROWTH\nTRAILING 12 MONTHS", c: C.acid },
  ];
  cells.forEach((cell, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const cx = gx + px(col * halfW + (col === 1 ? 30 : 0));
    const cy = px(180 + row * 260);
    const cw = px(halfW - (col === 1 ? 30 : 0));

    s.addText(cell.v, {
      x: cx, y: cy + px(20), w: cw, h: px(160),
      fontFace: F.display, fontSize: fs(108),
      charSpacing: cs(-0.02, 108),
      color: cell.c, margin: 0, valign: "top",
    });
    const [l1, l2] = cell.l.split("\n");
    s.addText([
      { text: l1, options: { breakLine: true } },
      { text: l2, options: {} },
    ], {
      x: cx, y: cy + px(196), w: cw, h: px(56),
      fontFace: F.mono, fontSize: fs(15),
      charSpacing: cs(0.22, 15),
      color: C.bone, margin: 0, valign: "top", paraSpaceAfter: 0,
    });
    // Bottom border for each cell (grid-line)
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy + px(260 - 6), w: cw, h: px(2),
      fill: { color: C.bone }, line: { type: "none" },
    });
  });

  addFooter(s, "OMG // TRACTION", "06 / 10", "ALL FIGURES PLACEHOLDER", true);
}

// ═══════════════════════════════════════════════════════════════
//  SLIDE 07 — REVENUE
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bone };
  addCorner(s, "SECTION 06 // BUSINESS", "REVENUE MIX · FY2025");

  addTag(s, "BUSINESS MODEL", px(80), px(160), { w: px(210) });

  // Big stacked title
  const h2Opts = {
    fontFace: F.display, fontSize: fs(170),
    charSpacing: cs(-0.01, 170),
    color: C.ink, margin: 0, valign: "top", align: "left",
  };
  // Line stride 170 * 0.86 = 146.2
  s.addText("FOUR",   { x: px(80), y: px(220),       w: px(900), h: px(160), ...h2Opts });
  s.addText("LINES.", { x: px(80), y: px(220 + 146), w: px(900), h: px(160), ...h2Opts });
  s.addText("ONE BRAND.", { x: px(80), y: px(220 + 292), w: px(900), h: px(160), ...h2Opts });

  // Right side: TTM REVENUE label + $28.4M + EBITDA note
  const rightX = 980, rightW = 860;
  s.addText("TTM REVENUE", {
    x: px(rightX), y: px(180), w: px(rightW), h: px(28),
    fontFace: F.mono, fontSize: fs(18),
    charSpacing: cs(0.22, 18),
    color: C.ink, margin: 0, align: "right", valign: "top",
  });
  s.addText("$28.4M", {
    x: px(rightX), y: px(218), w: px(rightW), h: px(200),
    fontFace: F.display, fontSize: fs(200),
    charSpacing: cs(-0.02, 200),
    color: C.ink, margin: 0, align: "right", valign: "top",
  });
  s.addText("EBITDA MARGIN ~23%", {
    x: px(rightX), y: px(438), w: px(rightW), h: px(28),
    fontFace: F.mono, fontSize: fs(18),
    charSpacing: cs(0.22, 18),
    color: C.mute, margin: 0, align: "right", valign: "top",
  });

  // Revenue mix bars
  const barsX = 980, barsY = 540, barsW = 860;
  s.addText("REVENUE MIX", {
    x: px(barsX), y: px(barsY), w: px(barsW), h: px(24),
    fontFace: F.mono, fontSize: fs(13),
    charSpacing: cs(0.2, 13),
    color: C.mute, margin: 0, valign: "top",
  });

  const bars = [
    { label: "RECORDED MUSIC / MASTERS", pct: 48, color: C.ink },
    { label: "PUBLISHING / SYNC",        pct: 22, color: C.acid },
    { label: "LIVE / TOURING",           pct: 18, color: C.ink },
    { label: "BRAND / MERCH / OTHER",    pct: 12, color: C.red },
  ];
  let by = barsY + 40;
  bars.forEach((b) => {
    // Label + pct row
    s.addText(b.label, {
      x: px(barsX), y: px(by), w: px(barsW - 80), h: px(26),
      fontFace: F.mono, fontSize: fs(15),
      charSpacing: cs(0.16, 15),
      color: C.ink, margin: 0, valign: "top",
    });
    s.addText(`${b.pct}%`, {
      x: px(barsX + barsW - 80), y: px(by), w: px(80), h: px(26),
      fontFace: F.mono, fontSize: fs(15),
      charSpacing: cs(0.16, 15),
      color: C.ink, margin: 0, align: "right", valign: "top",
    });
    // Bar track
    s.addShape(pres.shapes.RECTANGLE, {
      x: px(barsX), y: px(by + 34), w: px(barsW), h: px(28),
      fill: { color: C.phBg }, line: { color: C.ink, width: 2 },
    });
    // Bar fill
    s.addShape(pres.shapes.RECTANGLE, {
      x: px(barsX + 2), y: px(by + 34 + 2), w: px((barsW - 4) * (b.pct / 100)), h: px(24),
      fill: { color: b.color }, line: { type: "none" },
    });
    by += 84;
  });

  addFooter(s, "OMG // BUSINESS", "07 / 10", "FIGURES PLACEHOLDER · AUDITED PACKAGE AVAILABLE");
}

// ═══════════════════════════════════════════════════════════════
//  SLIDE 08 — BRAND + LIVE / OFF-PLATFORM
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bone };
  addCorner(s, "SECTION 07 // OFF-PLATFORM", "BRAND · TOURING · CULTURE");

  addTag(s, "BEYOND THE DSPs", px(80), px(160), { w: px(210) });

  // Big title "THE BRAND/THE ROAD/THE ROOM." — shrink and give ample height.
  // At 130pt it fits the full 1760px width on one line in LibreOffice rendering.
  s.addText([
    { text: "THE BRAND", options: {} },
    { text: "/",         options: { color: C.red } },
    { text: "THE ROAD",  options: {} },
    { text: "/",         options: { color: C.red } },
    { text: "THE ROOM.", options: {} },
  ], {
    x: px(80), y: px(210), w: px(1760), h: px(300),
    fontFace: F.display, fontSize: fs(130),
    charSpacing: cs(-0.01, 130),
    color: C.ink, margin: 0, valign: "top",
  });

  // 3 columns — gap:32, total 1760 → each = (1760 - 64)/3 ≈ 565.3
  const colW = (1760 - 64) / 3;
  const colY = 540, colH = 440;
  const colLeft = [80, 80 + colW + 32, 80 + 2 * (colW + 32)];

  // ── Column 1: BRAND (ink bg)
  {
    const cx = px(colLeft[0]), cy = px(colY), cw = px(colW), ch = px(colH);
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: cw, h: ch,
      fill: { color: C.ink }, line: { type: "none" },
    });
    s.addText("01 // BRAND", {
      x: cx + px(32), y: cy + px(36), w: cw - px(64), h: px(24),
      fontFace: F.mono, fontSize: fs(13),
      charSpacing: cs(0.22, 13),
      color: C.acid, margin: 0, valign: "top",
    });
    s.addText("PARTNER-\nSHIPS", {
      x: cx + px(32), y: cy + px(64), w: cw - px(64), h: px(150),
      fontFace: F.display, fontSize: fs(64),
      charSpacing: cs(-0.01, 64),
      color: C.bone, margin: 0, valign: "top",
    });
    // Rule
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx + px(32), y: cy + px(220), w: cw - px(64), h: px(2),
      fill: { color: C.bone }, line: { type: "none" },
    });
    s.addText([
      { text: "NIKE SB",          options: { breakLine: true } },
      { text: "FENTY BEAUTY",     options: { breakLine: true } },
      { text: "CORONA × LA",      options: { breakLine: true } },
      { text: "DICKIES",          options: { breakLine: true } },
      { text: "RED BULL STUDIOS", options: {} },
    ], {
      x: cx + px(32), y: cy + px(240), w: cw - px(64), h: px(160),
      fontFace: F.mono, fontSize: fs(16),
      charSpacing: cs(0.04, 16),
      color: C.bone, margin: 0, valign: "top",
      lineSpacingMultiple: 1.7, paraSpaceAfter: 0,
    });
    // Big number
    s.addText("$4.1M", {
      x: cx + cw - px(300), y: cy + ch - px(108), w: px(280), h: px(80),
      fontFace: F.display, fontSize: fs(72),
      charSpacing: cs(-0.02, 72),
      color: C.acid, margin: 0, align: "right", valign: "top",
    });
    s.addText("BRAND DEALS (TTM)", {
      x: cx + cw - px(300), y: cy + ch - px(32), w: px(280), h: px(22),
      fontFace: F.mono, fontSize: fs(11),
      charSpacing: cs(0.2, 11),
      color: C.bone, margin: 0, align: "right", valign: "top",
    });
  }

  // ── Column 2: LIVE (acid bg)
  {
    const cx = px(colLeft[1]), cy = px(colY), cw = px(colW), ch = px(colH);
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: cw, h: ch,
      fill: { color: C.acid }, line: { type: "none" },
    });
    s.addText("02 // LIVE", {
      x: cx + px(32), y: cy + px(36), w: cw - px(64), h: px(24),
      fontFace: F.mono, fontSize: fs(13),
      charSpacing: cs(0.22, 13),
      color: C.ink, margin: 0, valign: "top",
    });
    s.addText("TOURING\n& FEST", {
      x: cx + px(32), y: cy + px(64), w: cw - px(64), h: px(150),
      fontFace: F.display, fontSize: fs(64),
      charSpacing: cs(-0.01, 64),
      color: C.ink, margin: 0, valign: "top",
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx + px(32), y: cy + px(220), w: cw - px(64), h: px(2),
      fill: { color: C.ink }, line: { type: "none" },
    });
    s.addText([
      { text: "ROLLING LOUD '24",   options: { breakLine: true } },
      { text: "OUTSIDE LANDS '25",  options: { breakLine: true } },
      { text: "EUROPE HEADLINE '25",options: { breakLine: true } },
      { text: "62 DATES · YTD",     options: { breakLine: true } },
      { text: "94% SELL-THROUGH",   options: {} },
    ], {
      x: cx + px(32), y: cy + px(240), w: cw - px(64), h: px(160),
      fontFace: F.mono, fontSize: fs(16),
      charSpacing: cs(0.04, 16),
      color: C.ink, margin: 0, valign: "top",
      lineSpacingMultiple: 1.7, paraSpaceAfter: 0,
    });
    s.addText("310K", {
      x: cx + cw - px(300), y: cy + ch - px(108), w: px(280), h: px(80),
      fontFace: F.display, fontSize: fs(72),
      charSpacing: cs(-0.02, 72),
      color: C.ink, margin: 0, align: "right", valign: "top",
    });
    s.addText("TICKETS SOLD", {
      x: cx + cw - px(300), y: cy + ch - px(32), w: px(280), h: px(22),
      fontFace: F.mono, fontSize: fs(11),
      charSpacing: cs(0.2, 11),
      color: C.ink, margin: 0, align: "right", valign: "top",
    });
  }

  // ── Column 3: OPERATIONS (bone with ink border)
  {
    const cx = px(colLeft[2]), cy = px(colY), cw = px(colW), ch = px(colH);
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: cw, h: ch,
      fill: { color: C.bone }, line: { color: C.ink, width: 2 },
    });
    s.addText("03 // OPERATIONS", {
      x: cx + px(32), y: cy + px(36), w: cw - px(64), h: px(24),
      fontFace: F.mono, fontSize: fs(13),
      charSpacing: cs(0.22, 13),
      color: C.ink, margin: 0, valign: "top",
    });
    s.addText("TEAM &\nINFRA", {
      x: cx + px(32), y: cy + px(64), w: cw - px(64), h: px(150),
      fontFace: F.display, fontSize: fs(64),
      charSpacing: cs(-0.01, 64),
      color: C.ink, margin: 0, valign: "top",
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx + px(32), y: cy + px(220), w: cw - px(64), h: px(2),
      fill: { color: C.ink }, line: { type: "none" },
    });
    s.addText([
      { text: "14 FULL-TIME",        options: { breakLine: true } },
      { text: "IN-HOUSE A&R × 3",    options: { breakLine: true } },
      { text: "2 STUDIOS // DTLA",   options: { breakLine: true } },
      { text: "PUB ADMIN IN-HOUSE",  options: { breakLine: true } },
      { text: "OWNED MASTERS 92%",   options: {} },
    ], {
      x: cx + px(32), y: cy + px(240), w: cw - px(64), h: px(160),
      fontFace: F.mono, fontSize: fs(16),
      charSpacing: cs(0.04, 16),
      color: C.ink, margin: 0, valign: "top",
      lineSpacingMultiple: 1.7, paraSpaceAfter: 0,
    });
    s.addText("14", {
      x: cx + cw - px(300), y: cy + ch - px(108), w: px(280), h: px(80),
      fontFace: F.display, fontSize: fs(72),
      charSpacing: cs(-0.02, 72),
      color: C.ink, margin: 0, align: "right", valign: "top",
    });
    s.addText("HEADCOUNT", {
      x: cx + cw - px(300), y: cy + ch - px(32), w: px(280), h: px(22),
      fontFace: F.mono, fontSize: fs(11),
      charSpacing: cs(0.2, 11),
      color: C.ink, margin: 0, align: "right", valign: "top",
    });
  }

  addFooter(s, "OMG // OFF-PLATFORM", "08 / 10", "THE BUSINESS AROUND THE MUSIC");
}

// ═══════════════════════════════════════════════════════════════
//  SLIDE 09 — WHY OMG × UNIVERSAL / THE FIT
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bone };
  addCorner(s, "SECTION 08 // THE FIT", "OMG × UMG");

  addTag(s, "WHY NOW · WHY YOU", px(80), px(160), { w: px(230) });

  // Left: big 4-line headline
  const hOpts = {
    fontFace: F.display, fontSize: fs(130),
    charSpacing: cs(-0.01, 130),
    color: C.ink, margin: 0, valign: "top", align: "left",
  };
  // Line stride 130 * 0.9 = 117
  s.addText("WE BROUGHT", { x: px(80), y: px(220),       w: px(900), h: px(130), ...hOpts });
  s.addText("THE FIRE.",   { x: px(80), y: px(220 + 117), w: px(900), h: px(130), ...hOpts });
  s.addText("YOU BRING",   { x: px(80), y: px(220 + 234), w: px(900), h: px(130), ...hOpts });
  s.addText("THE RANGE.",  { x: px(80), y: px(220 + 351), w: px(900), h: px(130), ...hOpts });

  // Right: stacked boxes with slight rotations
  const rX = 1020, rW = 820;

  // OMG box (bone, ink border, rotated -1deg)
  {
    const by = 140, bh = 290;
    s.addShape(pres.shapes.RECTANGLE, {
      x: px(rX), y: px(by), w: px(rW), h: px(bh),
      rotate: -1,
      fill: { color: C.bone }, line: { color: C.ink, width: 3 },
    });
    s.addText("WHAT OMG BRINGS", {
      x: px(rX + 30), y: px(by + 28), w: px(rW - 60), h: px(22),
      rotate: -1,
      fontFace: F.mono, fontSize: fs(13),
      charSpacing: cs(0.22, 13),
      color: C.mute, margin: 0, valign: "top",
    });
    s.addText("CULTURE · CATALOG · COAST.", {
      x: px(rX + 30), y: px(by + 56), w: px(rW - 60), h: px(64),
      rotate: -1,
      fontFace: F.display, fontSize: fs(46),
      charSpacing: cs(-0.01, 46),
      color: C.ink, margin: 0, valign: "top",
    });
    s.addText([
      { text: "→ 5 ARTISTS AT DIFFERENT GROWTH STAGES", options: { breakLine: true } },
      { text: "→ 92% OWNED MASTERS, CLEAN CAP TABLE",    options: { breakLine: true } },
      { text: "→ DEEP LA INDIE / STREETWEAR NETWORK",    options: { breakLine: true } },
      { text: "→ PROVEN A&R: 3 CHART ENTRIES IN 24 MONTHS", options: {} },
    ], {
      x: px(rX + 30), y: px(by + 130), w: px(rW - 60), h: px(150),
      rotate: -1,
      fontFace: F.mono, fontSize: fs(15),
      charSpacing: cs(0.04, 15),
      color: C.ink, margin: 0, valign: "top",
      lineSpacingMultiple: 1.8, paraSpaceAfter: 0,
    });
  }

  // Plus sign
  s.addText("+", {
    x: px(rX), y: px(440), w: px(rW), h: px(100),
    fontFace: F.display, fontSize: fs(100),
    color: C.red, margin: 0, align: "center", valign: "middle",
  });

  // UMG box (ink bg, rotated 1.2deg)
  {
    const by = 560, bh = 290;
    s.addShape(pres.shapes.RECTANGLE, {
      x: px(rX), y: px(by), w: px(rW), h: px(bh),
      rotate: 1.2,
      fill: { color: C.ink }, line: { color: C.ink, width: 3 },
    });
    s.addText("WHAT UMG BRINGS", {
      x: px(rX + 30), y: px(by + 28), w: px(rW - 60), h: px(22),
      rotate: 1.2,
      fontFace: F.mono, fontSize: fs(13),
      charSpacing: cs(0.22, 13),
      color: C.acid, margin: 0, valign: "top",
    });
    s.addText("SCALE · GLOBAL · RANGE.", {
      x: px(rX + 30), y: px(by + 56), w: px(rW - 60), h: px(64),
      rotate: 1.2,
      fontFace: F.display, fontSize: fs(46),
      charSpacing: cs(-0.01, 46),
      color: C.bone, margin: 0, valign: "top",
    });
    s.addText([
      { text: "→ GLOBAL DISTRIBUTION & MARKETING", options: { breakLine: true } },
      { text: "→ SYNC & PUB FIREPOWER",             options: { breakLine: true } },
      { text: "→ CROSS-GENRE COLLABS & A&R REACH",  options: { breakLine: true } },
      { text: "→ CAPITAL FOR TIER-ONE TOURING",     options: {} },
    ], {
      x: px(rX + 30), y: px(by + 130), w: px(rW - 60), h: px(150),
      rotate: 1.2,
      fontFace: F.mono, fontSize: fs(15),
      charSpacing: cs(0.04, 15),
      color: C.bone, margin: 0, valign: "top",
      lineSpacingMultiple: 1.8, paraSpaceAfter: 0,
    });
  }

  // Outcome bar (acid) — give enough height for a graceful 2-line wrap.
  {
    const by = 860, bh = 130;
    s.addShape(pres.shapes.RECTANGLE, {
      x: px(rX), y: px(by), w: px(rW), h: px(bh),
      fill: { color: C.acid }, line: { color: C.ink, width: 3 },
    });
    s.addText("= THE OUTCOME", {
      x: px(rX + 24), y: px(by + 14), w: px(rW - 48), h: px(22),
      fontFace: F.mono, fontSize: fs(13),
      charSpacing: cs(0.22, 13),
      color: C.ink, margin: 0, valign: "top",
    });
    s.addText("A HIP-HOP IMPRINT WITHIN UMG THAT KEEPS ITS TEETH.", {
      x: px(rX + 24), y: px(by + 42), w: px(rW - 48), h: px(80),
      fontFace: F.display, fontSize: fs(28),
      charSpacing: cs(-0.01, 28),
      color: C.ink, margin: 0, valign: "top",
    });
  }

  addFooter(s, "OMG // THE FIT", "09 / 10", "ONE PLUS ONE > TWO");
}

// ═══════════════════════════════════════════════════════════════
//  SLIDE 10 — THE ASK (ink bg)
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.ink };
  addCorner(s, "SECTION 09 // CLOSING", "THE ASK", true);

  addTag(s, "WHAT WE'RE PROPOSING", px(80), px(140), { w: px(280), onInk: true });

  // Massive stacked title with acid middle line
  const hOpts = {
    fontFace: F.display, fontSize: fs(180),
    charSpacing: cs(-0.01, 180),
    margin: 0, valign: "top", align: "left",
  };
  // Line stride 180 * 0.88 = 158.4 ≈ 158
  s.addText("LET'S TALK",       { x: px(80), y: px(200),       w: px(1760), h: px(170), color: C.bone, ...hOpts });
  s.addText("A DEAL",           { x: px(80), y: px(200 + 158), w: px(1760), h: px(170), color: C.acid, ...hOpts });
  s.addText("THAT LASTS.",      { x: px(80), y: px(200 + 316), w: px(1760), h: px(170), color: C.bone, ...hOpts });

  // Three asks at bottom
  const topY = 1080 - 140 - 200; // bottom:140 and ~200 tall block
  // Top separator
  s.addShape(pres.shapes.RECTANGLE, {
    x: px(80), y: px(topY), w: px(1760), h: px(2),
    fill: { color: C.bone }, line: { type: "none" },
  });

  const askW = (1760 - 0) / 3; // 3 equal columns
  const asks = [
    { k: "01 // STRUCTURE", v: "MAJORITY ACQUISITION + EARN-OUT" },
    { k: "02 // AUTONOMY",  v: "OMG OPERATES AS A STANDALONE IMPRINT" },
    { k: "03 // NEXT",      v: "FINANCIALS + LOI INSIDE 30 DAYS" },
  ];
  asks.forEach((a, i) => {
    const cx = px(80 + i * askW);
    const cw = px(askW - 22);
    // Right divider (except last)
    if (i < 2) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: px(80 + (i + 1) * askW - 1), y: px(topY + 22), w: px(2), h: px(150),
        fill: { color: C.bone }, line: { type: "none" },
      });
    }
    s.addText(a.k, {
      x: cx + px(i > 0 ? 22 : 0), y: px(topY + 22), w: cw, h: px(22),
      fontFace: F.mono, fontSize: fs(13),
      charSpacing: cs(0.22, 13),
      color: C.acid, margin: 0, valign: "top",
    });
    s.addText(a.v, {
      x: cx + px(i > 0 ? 22 : 0), y: px(topY + 54), w: cw, h: px(130),
      fontFace: F.display, fontSize: fs(40),
      charSpacing: cs(-0.01, 40),
      color: C.bone, margin: 0, valign: "top",
    });
  });

  addFooter(s, "CEO NAME · EMAIL · PHONE", "10 / 10", "ON MY GRIND // LOS ANGELES", true);
}

// ─── Write ──────────────────────────────────────────────────────
const outFile = process.argv[2] || "On_My_Grind_Deck.pptx";
pres.writeFile({ fileName: outFile }).then((f) => {
  console.log("Wrote:", f);
});
