// K9 Cuts — Mobile Pet Salon
// Full 9-slide services overview deck recreated with pptxgenjs
// Run: node build.js   →   output: Mobile_K9_Salon.pptx

const pptxgen = require("pptxgenjs");

// -----------------------------------------------------------------------------
// Palette
// -----------------------------------------------------------------------------
const C = {
  cream:     "F3ECE1", // main light background
  creamAlt:  "FBF7EF", // card fill on light slides
  creamDk:   "EBE2D2", // slight darker cream for cards on slide 7
  ink:       "1B1915", // near-black (text + dark slide bg)
  text:      "3A342C", // primary body text
  textMute:  "7A7163", // muted captions / meta
  textSoft:  "A89D88", // softer muted text
  terra:     "BF5A3C", // terracotta accent (primary)
  terraDk:   "9C4328", // darker terracotta
  tan:       "E4CDB1", // tan / illustration bg
  tanDk:     "D9CFBE", // slightly darker warm neutral
  sage:      "8A9B7A", // sage green
  sageDk:    "5F7253", // deep sage
  sagePale:  "E8ECDF", // very pale sage (illustration bg)
};

const F_SANS = "Arial"; // header + body (deck uses Arial throughout)

// -----------------------------------------------------------------------------
// Layout setup
// -----------------------------------------------------------------------------
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";        // 13.333 x 7.5 inches
pres.title  = "K9 Cuts — Mobile Pet Salon";
pres.author = "K9 Cuts";

const SLIDE_W = 13.333;
const SLIDE_H = 7.5;

// -----------------------------------------------------------------------------
// Shared chrome (logo, header meta, footer)
// -----------------------------------------------------------------------------
function addHeader(slide, sectionLabel, opts = {}) {
  const onDark = !!opts.onDark;
  const lightText = onDark ? C.cream : C.text;
  const muted     = onDark ? C.textSoft : C.textMute;

  // Logo dot (terracotta circle with tiny smile)
  slide.addShape(pres.shapes.OVAL, {
    x: 0.55, y: 0.3, w: 0.32, h: 0.32,
    fill: { color: C.terra }, line: { type: "none" },
  });
  // little smile inside logo (thin arc approximated with a small dark rectangle base)
  slide.addShape(pres.shapes.OVAL, {
    x: 0.64, y: 0.44, w: 0.14, h: 0.08,
    fill: { color: C.ink }, line: { type: "none" },
  });

  // "K9 CUTS"
  slide.addText("K9 CUTS", {
    x: 0.95, y: 0.26, w: 2.5, h: 0.4,
    fontFace: F_SANS, fontSize: 13, bold: true,
    color: lightText, charSpacing: 4, valign: "middle", margin: 0,
  });

  // Right-side section meta
  slide.addText(sectionLabel, {
    x: SLIDE_W - 6.5, y: 0.26, w: 6, h: 0.4,
    fontFace: F_SANS, fontSize: 11,
    color: muted, charSpacing: 3, align: "right", valign: "middle", margin: 0,
  });
}

function addFooter(slide, pageNum, opts = {}) {
  const onDark = !!opts.onDark;
  const muted  = onDark ? C.textSoft : C.textMute;

  slide.addText("K9 Cuts — Mobile Pet Salon", {
    x: 0.55, y: SLIDE_H - 0.55, w: 5, h: 0.35,
    fontFace: F_SANS, fontSize: 11, color: muted,
    valign: "middle", margin: 0,
  });

  slide.addText(`${String(pageNum).padStart(2, "0")} / 09`, {
    x: SLIDE_W - 2, y: SLIDE_H - 0.55, w: 1.45, h: 0.35,
    fontFace: F_SANS, fontSize: 11, color: muted,
    align: "right", valign: "middle", margin: 0,
  });
}

// =============================================================================
// SLIDE 1 — COVER
// =============================================================================
function buildSlide1() {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "MOBILE PET SALON  ·  CHARLOTTE, NC");

  // --- Large stacked title ---
  s.addText([
    { text: "Grooming\n",  options: { color: C.ink } },
    { text: "that comes\n", options: { color: C.ink } },
    { text: "to you.",     options: { color: C.terra, italic: true } },
  ], {
    x: 0.55, y: 1.5, w: 7.5, h: 4.2,
    fontFace: F_SANS, fontSize: 80, bold: false,
    valign: "top", margin: 0, lineSpacingMultiple: 1.0,
  });

  // --- Illustration frame: bichon-style dog on tan gradient background ---
  const ix = 8.9, iy = 1.4, iw = 3.9, ih = 3.9;
  // outer tan square
  s.addShape(pres.shapes.RECTANGLE, {
    x: ix, y: iy, w: iw, h: ih,
    fill: { color: C.tan }, line: { type: "none" },
  });
  // radial glow (lighter oval in center behind the dog)
  s.addShape(pres.shapes.OVAL, {
    x: ix + 0.4, y: iy + 0.3, w: iw - 0.8, h: ih - 0.8,
    fill: { color: "EBD8B9" }, line: { type: "none" },
  });
  // Dog body (rounded mass at bottom)
  s.addShape(pres.shapes.OVAL, {
    x: ix + 0.65, y: iy + 2.25, w: 2.6, h: 1.5,
    fill: { color: C.creamAlt }, line: { color: C.ink, width: 0.75 },
  });
  // Dog head (large round)
  s.addShape(pres.shapes.OVAL, {
    x: ix + 0.95, y: iy + 0.75, w: 2.0, h: 2.0,
    fill: { color: C.creamAlt }, line: { color: C.ink, width: 0.75 },
  });
  // Muzzle
  s.addShape(pres.shapes.OVAL, {
    x: ix + 1.45, y: iy + 1.9, w: 1.0, h: 0.7,
    fill: { color: C.tanDk }, line: { type: "none" },
  });
  // Eyes
  s.addShape(pres.shapes.OVAL, {
    x: ix + 1.3,  y: iy + 1.45, w: 0.14, h: 0.14,
    fill: { color: C.ink }, line: { type: "none" },
  });
  s.addShape(pres.shapes.OVAL, {
    x: ix + 2.45, y: iy + 1.45, w: 0.14, h: 0.14,
    fill: { color: C.ink }, line: { type: "none" },
  });
  // Nose
  s.addShape(pres.shapes.OVAL, {
    x: ix + 1.88, y: iy + 2.0,  w: 0.2, h: 0.16,
    fill: { color: C.ink }, line: { type: "none" },
  });
  // Smile (tiny dark oval)
  s.addShape(pres.shapes.OVAL, {
    x: ix + 1.88, y: iy + 2.35, w: 0.2, h: 0.08,
    fill: { color: C.ink }, line: { type: "none" },
  });

  // --- Bottom-left lead paragraph ---
  s.addText(
    "A full-service mobile dog salon serving Charlotte and surrounding neighborhoods. " +
    "One van, one groomer, one very happy dog.",
    {
      x: 0.55, y: 5.85, w: 6.2, h: 1.0,
      fontFace: F_SANS, fontSize: 13, color: C.text,
      lineSpacingMultiple: 1.35, margin: 0,
    }
  );

  // --- Bottom-right meta block ---
  s.addText("SERVICES OVERVIEW  ·  2026", {
    x: SLIDE_W - 5.3, y: 5.55, w: 4.8, h: 0.35,
    fontFace: F_SANS, fontSize: 13, color: C.text,
    charSpacing: 3, bold: false, align: "right", valign: "middle", margin: 0,
  });
  s.addText("K9CUTS.COM", {
    x: SLIDE_W - 5.3, y: 5.95, w: 4.8, h: 0.3,
    fontFace: F_SANS, fontSize: 11, color: C.textMute,
    charSpacing: 2, align: "right", valign: "middle", margin: 0,
  });
  s.addText("999-999-9999", {
    x: SLIDE_W - 5.3, y: 6.25, w: 4.8, h: 0.3,
    fontFace: F_SANS, fontSize: 11, color: C.textMute,
    align: "right", valign: "middle", margin: 0,
  });

  addFooter(s, 1);
}

// =============================================================================
// SLIDE 2 — WHY MOBILE
// =============================================================================
function buildSlide2() {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "02  —  WHY MOBILE");

  // Small eyebrow label
  s.addText("WHY MOBILE GROOMING", {
    x: 0.55, y: 1.1, w: 6, h: 0.4,
    fontFace: F_SANS, fontSize: 14, color: C.terra,
    charSpacing: 3, bold: false, margin: 0,
  });

  // Headline
  s.addText([
    { text: "No crates. No stress.", options: { color: C.ink, breakLine: true } },
    { text: "No traffic.",           options: { color: C.ink, italic: true } },
  ], {
    x: 0.55, y: 1.55, w: 6.6, h: 2.1,
    fontFace: F_SANS, fontSize: 42, bold: false,
    valign: "top", lineSpacingMultiple: 1.05, margin: 0,
  });

  // Lead paragraph
  s.addText(
    "Traditional grooming means drop-off, cages, loud dryers, and a dog who has spent " +
    "eight hours waiting their turn. We pull up to your driveway in a fully self-contained salon van.",
    {
      x: 0.55, y: 3.7, w: 5.2, h: 0.95,
      fontFace: F_SANS, fontSize: 13, color: C.text,
      lineSpacingMultiple: 1.4, margin: 0,
    }
  );

  // --- 4 stat callouts in 2x2 ---
  const stats = [
    { big: "1:1",   bigItalic: true,  caption: "One groomer dedicated to your dog\nfrom bath through blow-dry." },
    { big: "60m",   bigItalic: true,  caption: "Average appointment — in and out,\nwith no all-day salon stays." },
    { big: "0",     bigItalic: false, caption: "Crates, kennels, or shared dryer rooms\nanywhere in the van." },
    { big: "100%",  bigItalic: false, caption: "Self-contained: fresh water, hot water,\nand power all onboard." },
  ];
  const statX = [0.55, 3.4];
  const statY = [4.85, 5.9]; // rows — tightened to avoid footer collision
  stats.forEach((stat, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = statX[col], y = statY[row];

    // Big number — render the italic portion inline for 1:1 → 1:1 and 60m → 60m where 'm' italicizes
    // For mixed-italic numbers we simplify: italic applies to whole string per source styling.
    if (stat.big === "1:1") {
      s.addText([
        { text: "1:", options: { italic: false } },
        { text: "1",  options: { italic: true  } },
      ], {
        x, y, w: 2.6, h: 0.55,
        fontFace: F_SANS, fontSize: 36, color: C.terra, margin: 0, valign: "top",
      });
    } else if (stat.big === "60m") {
      s.addText([
        { text: "60", options: { italic: false } },
        { text: "m",  options: { italic: true  } },
      ], {
        x, y, w: 2.6, h: 0.55,
        fontFace: F_SANS, fontSize: 36, color: C.terra, margin: 0, valign: "top",
      });
    } else {
      s.addText(stat.big, {
        x, y, w: 2.6, h: 0.55,
        fontFace: F_SANS, fontSize: 36, color: C.terra, margin: 0, valign: "top",
      });
    }

    // Caption below
    s.addText(stat.caption, {
      x, y: y + 0.55, w: 2.7, h: 0.55,
      fontFace: F_SANS, fontSize: 10, color: C.text,
      lineSpacingMultiple: 1.3, margin: 0, valign: "top",
    });
  });

  // --- Right side: illustration of salon van ---
  const vx = 7.0, vy = 1.1, vw = 5.8, vh = 4.2;
  s.addShape(pres.shapes.RECTANGLE, {
    x: vx, y: vy, w: vw, h: vh,
    fill: { color: C.tan }, line: { type: "none" },
  });
  // sun
  s.addShape(pres.shapes.OVAL, {
    x: vx + 4.2, y: vy + 0.5, w: 0.75, h: 0.75,
    fill: { color: "F2D99E" }, line: { type: "none" },
  });
  // distant hills / house (triangle approximated with rectangle block)
  s.addShape(pres.shapes.RECTANGLE, {
    x: vx + 0.5, y: vy + 2.2, w: 1.6, h: 1.3,
    fill: { color: "B89D7F" }, line: { type: "none" },
  });
  // tree (green circle + trunk)
  s.addShape(pres.shapes.OVAL, {
    x: vx + 4.9, y: vy + 1.9, w: 0.7, h: 0.7,
    fill: { color: C.sage }, line: { type: "none" },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: vx + 5.2, y: vy + 2.4, w: 0.1, h: 0.5,
    fill: { color: C.sageDk }, line: { type: "none" },
  });
  // van body
  s.addShape(pres.shapes.RECTANGLE, {
    x: vx + 1.9, y: vy + 2.1, w: 2.8, h: 1.3,
    fill: { color: "FAF0DE" }, line: { color: C.ink, width: 1 },
  });
  // van cab (slightly smaller)
  s.addShape(pres.shapes.RECTANGLE, {
    x: vx + 1.5, y: vy + 2.3, w: 0.6, h: 1.1,
    fill: { color: "FAF0DE" }, line: { color: C.ink, width: 1 },
  });
  // van top (roof line darker)
  s.addShape(pres.shapes.RECTANGLE, {
    x: vx + 2.2, y: vy + 2.1, w: 1.0, h: 0.25,
    fill: { color: "7A7163" }, line: { type: "none" },
  });
  // "CUTS" signage
  s.addShape(pres.shapes.RECTANGLE, {
    x: vx + 3.4, y: vy + 2.5, w: 1.2, h: 0.45,
    fill: { color: C.terra }, line: { type: "none" },
  });
  s.addText("CUTS", {
    x: vx + 3.4, y: vy + 2.5, w: 1.2, h: 0.45,
    fontFace: F_SANS, fontSize: 12, bold: true, color: C.cream,
    align: "center", valign: "middle", margin: 0, charSpacing: 2,
  });
  // wheels
  s.addShape(pres.shapes.OVAL, {
    x: vx + 2.0, y: vy + 3.2, w: 0.4, h: 0.4,
    fill: { color: C.ink }, line: { type: "none" },
  });
  s.addShape(pres.shapes.OVAL, {
    x: vx + 4.15, y: vy + 3.2, w: 0.4, h: 0.4,
    fill: { color: C.ink }, line: { type: "none" },
  });
  // ground
  s.addShape(pres.shapes.RECTANGLE, {
    x: vx, y: vy + 3.55, w: vw, h: 0.65,
    fill: { color: "C9A87E" }, line: { type: "none" },
  });

  // Caption tag on image
  s.addShape(pres.shapes.RECTANGLE, {
    x: vx + 0.3, y: vy + vh - 0.55, w: 2.5, h: 0.35,
    fill: { color: C.creamAlt }, line: { type: "none" },
  });
  s.addText("ILLUSTRATION  ·  MOBILE SALON VAN", {
    x: vx + 0.3, y: vy + vh - 0.55, w: 2.5, h: 0.35,
    fontFace: F_SANS, fontSize: 9, color: C.textMute,
    charSpacing: 2, align: "center", valign: "middle", margin: 0,
  });

  // --- Testimonial card (terracotta) overlapping lower part ---
  const tx = 8.2, ty = 4.5, tw = 4.6, th = 2.2;
  s.addShape(pres.shapes.RECTANGLE, {
    x: tx, y: ty, w: tw, h: th,
    fill: { color: C.terraDk }, line: { type: "none" },
  });
  s.addText(
    "\u201CShe used to shake on the way to the groomer. Now she runs to the door when the van pulls up.\u201D",
    {
      x: tx + 0.35, y: ty + 0.3, w: tw - 0.7, h: 1.1,
      fontFace: F_SANS, fontSize: 15, italic: true, color: C.cream,
      lineSpacingMultiple: 1.3, margin: 0, valign: "top",
    }
  );
  s.addText("— CLIENT · DILWORTH, CHARLOTTE", {
    x: tx + 0.35, y: ty + th - 0.55, w: tw - 0.7, h: 0.35,
    fontFace: F_SANS, fontSize: 10, color: C.tan,
    charSpacing: 2, valign: "middle", margin: 0,
  });

  addFooter(s, 2);
}

// =============================================================================
// SLIDE 3 — HOW IT WORKS
// =============================================================================
function buildSlide3() {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "03  —  HOW IT WORKS");

  // Eyebrow
  s.addText("HOW A VISIT WORKS", {
    x: 0.55, y: 1.0, w: 6, h: 0.4,
    fontFace: F_SANS, fontSize: 13, color: C.terra,
    charSpacing: 3, margin: 0, valign: "middle",
  });

  // Headline (italic "driveway.")
  s.addText([
    { text: "Four stops. One " },
    { text: "driveway.", options: { italic: true } },
  ], {
    x: 0.55, y: 1.45, w: 9.5, h: 1.0,
    fontFace: F_SANS, fontSize: 50, color: C.ink,
    margin: 0, valign: "top",
  });

  // Supporting paragraph on right side
  s.addText(
    "From the first text to the final bow, here is exactly what happens when the K9 Cuts van rolls up to your home.",
    {
      x: 9.6, y: 1.55, w: 3.3, h: 1.2,
      fontFace: F_SANS, fontSize: 11, color: C.text,
      lineSpacingMultiple: 1.45, margin: 0, valign: "top",
    }
  );

  // Separator line above cards
  s.addShape(pres.shapes.LINE, {
    x: 0.55, y: 2.95, w: SLIDE_W - 1.1, h: 0,
    line: { color: C.textSoft, width: 0.5 },
  });

  // --- Four step cards ---
  const steps = [
    { num: "STEP 01", time: "~2 MIN",    title: "Book & confirm",
      body: "Tell us your dog's name, breed, and the look you want. We text a confirmation with your groomer's name and an arrival window." },
    { num: "STEP 02", time: "~5 MIN",    title: "We pull up",
      body: "The van parks at your curb and plugs into nothing. We run on our own water and power. A quick hello, a consult, and off we go." },
    { num: "STEP 03", time: "45–90 MIN", title: "The full treatment",
      body: "Bath, blow-dry, haircut, nails, ears — whatever is on the ticket, done in a calm one-on-one setting without the noise of a busy shop." },
    { num: "STEP 04", time: "~3 MIN",    title: "Freshly delivered",
      body: "We walk your dog back to the door with a bandana, a report card, and before and after photos. Rebook while we are still there." },
  ];

  const cardW = 3.0, gap = 0.1, startX = 0.55, topY = 3.15;
  steps.forEach((st, i) => {
    const x = startX + i * (cardW + gap);

    // Step label (top row) - constrained widths so labels stay inside their column
    s.addText(st.num, {
      x, y: topY, w: 1.5, h: 0.3,
      fontFace: F_SANS, fontSize: 10, color: C.textMute,
      charSpacing: 2, margin: 0, valign: "middle",
    });
    s.addText(st.time, {
      x: x + cardW - 1.5, y: topY, w: 1.5, h: 0.3,
      fontFace: F_SANS, fontSize: 10, color: C.textMute,
      charSpacing: 2, align: "right", margin: 0, valign: "middle",
    });

    // Circle with simple mark
    s.addShape(pres.shapes.OVAL, {
      x: x, y: topY + 0.45, w: 0.55, h: 0.55,
      fill: { color: "FFFFFF" },
      line: { color: C.ink, width: 1 },
    });
    // tiny icon glyph inside each circle (simple placeholder per slide)
    if (i === 0) { // minus / message bubble
      s.addShape(pres.shapes.RECTANGLE, {
        x: x + 0.14, y: topY + 0.7, w: 0.27, h: 0.05,
        fill: { color: C.ink }, line: { type: "none" },
      });
    } else if (i === 1) { // car shape
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: x + 0.13, y: topY + 0.63, w: 0.3, h: 0.18,
        fill: { color: C.ink }, line: { type: "none" }, rectRadius: 0.03,
      });
    } else if (i === 2) { // block / square
      s.addShape(pres.shapes.RECTANGLE, {
        x: x + 0.17, y: topY + 0.62, w: 0.22, h: 0.22,
        fill: { color: C.ink }, line: { type: "none" },
      });
    } else { // star -> approximate with small diamond (rotated rectangle)
      s.addShape(pres.shapes.OVAL, {
        x: x + 0.16, y: topY + 0.62, w: 0.22, h: 0.22,
        fill: { color: C.ink }, line: { type: "none" },
      });
    }

    // Title
    s.addText(st.title, {
      x, y: topY + 1.2, w: cardW, h: 0.5,
      fontFace: F_SANS, fontSize: 20, color: C.ink,
      margin: 0, valign: "top",
    });

    // Body
    s.addText(st.body, {
      x, y: topY + 1.8, w: cardW, h: 1.8,
      fontFace: F_SANS, fontSize: 11, color: C.text,
      lineSpacingMultiple: 1.45, margin: 0, valign: "top",
    });
  });

  addFooter(s, 3);
}

// =============================================================================
// SLIDE 4 — SERVICES MENU
// =============================================================================
function buildSlide4() {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "04  —  SERVICES");

  // Eyebrow
  s.addText("THE MENU", {
    x: 0.55, y: 1.0, w: 5, h: 0.4,
    fontFace: F_SANS, fontSize: 13, color: C.terra,
    charSpacing: 3, margin: 0, valign: "middle",
  });

  // Headline
  s.addText([
    { text: "Everything your dog " },
    { text: "needs.", options: { italic: true } },
  ], {
    x: 0.55, y: 1.45, w: 9.5, h: 1.0,
    fontFace: F_SANS, fontSize: 50, color: C.ink,
    margin: 0, valign: "top",
  });

  // Supporting paragraph on right
  s.addText(
    "Mix and match. Build a quick freshen-up or a full spa day — every service below can be added to any appointment.",
    {
      x: 9.6, y: 1.55, w: 3.3, h: 1.2,
      fontFace: F_SANS, fontSize: 11, color: C.text,
      lineSpacingMultiple: 1.45, margin: 0, valign: "top",
    }
  );

  // --- Signature dark card (left) ---
  const cx = 0.55, cy = 3.1, cw = 5.1, ch = 3.6;
  s.addShape(pres.shapes.RECTANGLE, {
    x: cx, y: cy, w: cw, h: ch,
    fill: { color: C.ink }, line: { type: "none" },
  });
  s.addText("SIGNATURE PACKAGE", {
    x: cx + 0.5, y: cy + 0.4, w: cw - 1, h: 0.3,
    fontFace: F_SANS, fontSize: 11, color: C.textSoft,
    charSpacing: 3, margin: 0, valign: "middle",
  });
  s.addText([
    { text: "The Full " },
    { text: "Groom", options: { italic: true, color: C.terra } },
  ], {
    x: cx + 0.5, y: cy + 1.0, w: cw - 1, h: 1.1,
    fontFace: F_SANS, fontSize: 40, color: C.cream,
    margin: 0, valign: "top",
  });
  s.addText(
    "Our most-booked service. Bath, blow-dry, breed-style haircut, nails, ears, and a finishing spritz.",
    {
      x: cx + 0.5, y: cy + ch - 1.15, w: 2.7, h: 0.95,
      fontFace: F_SANS, fontSize: 11, color: C.tan,
      lineSpacingMultiple: 1.4, margin: 0, valign: "top",
    }
  );
  // Decorative circles bottom-right of card
  s.addShape(pres.shapes.OVAL, {
    x: cx + cw - 1.7, y: cy + ch - 1.4, w: 0.95, h: 0.95,
    fill: { color: C.terra }, line: { type: "none" },
  });
  s.addShape(pres.shapes.OVAL, {
    x: cx + cw - 1.15, y: cy + ch - 0.95, w: 0.5, h: 0.5,
    fill: { color: C.sage }, line: { type: "none" },
  });

  // --- 2x3 service cards grid (right) ---
  const services = [
    ["Bath & Blow-Dry",    "Warm water, gentle lather, full fluff finish."],
    ["Haircut & Styling",  "Breed standards or a custom look for your dog."],
    ["Nail Trim & Grind",  "Clipped clean, smoothed soft, never snagging."],
    ["Ear Cleaning",       "Gentle flush that keeps infections away."],
    ["Teeth Brushing",     "Fresher breath, healthier gums over time."],
    ["De-Shedding",        "Undercoat treatment that cuts shedding up to 90%."],
  ];
  const gridX = 5.85, gridY = 3.1;
  const gw = 2.37, gh = 1.74, ggap = 0.08;
  services.forEach((srv, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = gridX + col * (gw + ggap);
    const y = gridY + row * (gh + ggap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: gw, h: gh,
      fill: { color: C.creamAlt }, line: { color: C.tanDk, width: 0.5 },
    });
    const num = String(i + 1).padStart(2, "0");
    s.addText(num, {
      x: x + 0.2, y: y + 0.15, w: 1, h: 0.3,
      fontFace: F_SANS, fontSize: 10, color: C.textMute,
      charSpacing: 2, margin: 0, valign: "middle",
    });
    s.addText(srv[0], {
      x: x + 0.2, y: y + 0.5, w: gw - 0.3, h: 0.4,
      fontFace: F_SANS, fontSize: 16, color: C.ink,
      margin: 0, valign: "top",
    });
    s.addText(srv[1], {
      x: x + 0.2, y: y + gh - 0.8, w: gw - 0.3, h: 0.7,
      fontFace: F_SANS, fontSize: 10, color: C.text,
      lineSpacingMultiple: 1.35, margin: 0, valign: "top",
    });
  });

  addFooter(s, 4);
}

// =============================================================================
// SLIDE 5 — BATH & BLOW-DRY
// =============================================================================
function buildSlide5() {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "05  —  BATH & BLOW-DRY");

  // --- Left illustration area ---
  const ix = 0.55, iy = 1.0, iw = 5.75, ih = 5.15;

  // Terracotta half-circle accent behind frame (top-left)
  s.addShape(pres.shapes.OVAL, {
    x: ix - 0.4, y: iy - 0.35, w: 1.1, h: 1.1,
    fill: { color: C.terra }, line: { type: "none" },
  });

  // Main illustration frame (light blue bathroom scene)
  s.addShape(pres.shapes.RECTANGLE, {
    x: ix, y: iy, w: iw, h: ih,
    fill: { color: "CBD4D7" }, line: { type: "none" },
  });

  // Bubbles scattered
  const bubbles = [
    { x: 1.4, y: 1.7, d: 0.5 },
    { x: 2.7, y: 1.4, d: 0.35 },
    { x: 4.4, y: 1.5, d: 0.55 },
    { x: 5.3, y: 2.0, d: 0.4 },
    { x: 1.3, y: 4.1, d: 0.45 },
    { x: 5.3, y: 4.2, d: 0.5 },
    { x: 5.0, y: 4.9, d: 0.4 },
  ];
  bubbles.forEach(b => {
    s.addShape(pres.shapes.OVAL, {
      x: b.x, y: b.y, w: b.d, h: b.d,
      fill: { color: "EEF0F1", transparency: 20 }, line: { type: "none" },
    });
  });

  // Shower head (small round + thin stem)
  s.addShape(pres.shapes.OVAL, {
    x: 1.85, y: 2.1, w: 0.3, h: 0.3,
    fill: { color: "8A7966" }, line: { type: "none" },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.97, y: 2.38, w: 0.06, h: 0.8,
    fill: { color: "8A7966" }, line: { type: "none" },
  });

  // Bathtub
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.7, y: 3.65, w: 3.5, h: 1.5,
    fill: { color: C.creamAlt }, line: { color: C.ink, width: 1 }, rectRadius: 0.25,
  });
  // Tub water line
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.9, y: 4.05, w: 3.1, h: 0.3,
    fill: { color: "9EB2BA" }, line: { type: "none" },
  });

  // Dog in tub (head + foam on top)
  s.addShape(pres.shapes.OVAL, {
    x: 3.0, y: 3.15, w: 0.95, h: 0.95,
    fill: { color: C.creamAlt }, line: { color: C.ink, width: 0.75 },
  });
  // Foam on head (three little bubbles)
  s.addShape(pres.shapes.OVAL, {
    x: 3.05, y: 2.85, w: 0.38, h: 0.3,
    fill: { color: "FFFFFF" }, line: { color: C.ink, width: 0.6 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 3.35, y: 2.75, w: 0.35, h: 0.3,
    fill: { color: "FFFFFF" }, line: { color: C.ink, width: 0.6 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 3.6,  y: 2.9,  w: 0.32, h: 0.27,
    fill: { color: "FFFFFF" }, line: { color: C.ink, width: 0.6 },
  });
  // Dog eyes
  s.addShape(pres.shapes.OVAL, {
    x: 3.25, y: 3.45, w: 0.07, h: 0.07,
    fill: { color: C.ink }, line: { type: "none" },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 3.58, y: 3.45, w: 0.07, h: 0.07,
    fill: { color: C.ink }, line: { type: "none" },
  });
  // Dog nose
  s.addShape(pres.shapes.OVAL, {
    x: 3.42, y: 3.7, w: 0.1, h: 0.08,
    fill: { color: C.ink }, line: { type: "none" },
  });

  // Caption on illustration
  s.addShape(pres.shapes.RECTANGLE, {
    x: ix + 0.2, y: iy + ih - 0.5, w: 2.6, h: 0.35,
    fill: { color: C.creamAlt }, line: { type: "none" },
  });
  s.addText("ILLUSTRATION  ·  WARM BATH IN THE VAN", {
    x: ix + 0.2, y: iy + ih - 0.5, w: 2.6, h: 0.35,
    fontFace: F_SANS, fontSize: 9, color: C.textMute,
    charSpacing: 2, align: "center", valign: "middle", margin: 0,
  });

  // --- Right content column ---
  const rx = 6.65;
  s.addText("SERVICE 01", {
    x: rx, y: 1.0, w: 4, h: 0.35,
    fontFace: F_SANS, fontSize: 12, color: C.terra,
    charSpacing: 3, margin: 0, valign: "middle",
  });
  s.addText([
    { text: "The " },
    { text: "Bath",       options: { italic: true } },
    { text: " & Blow-Dry" },
  ], {
    x: rx, y: 1.45, w: 6.2, h: 0.85,
    fontFace: F_SANS, fontSize: 38, color: C.ink,
    margin: 0, valign: "top",
  });
  s.addText(
    "A proper wash, not a rinse. Warm water, pH-balanced shampoos tailored to your dog's coat type, " +
    "and a high-velocity dryer that lifts loose undercoat out instead of baking it in.",
    {
      x: rx, y: 2.4, w: 6.15, h: 1.1,
      fontFace: F_SANS, fontSize: 12, color: C.text,
      lineSpacingMultiple: 1.45, margin: 0, valign: "top",
    }
  );
  s.addText("WHAT'S INCLUDED", {
    x: rx, y: 3.6, w: 4, h: 0.3,
    fontFace: F_SANS, fontSize: 11, bold: true, color: C.textMute,
    charSpacing: 3, margin: 0, valign: "middle",
  });

  // Five included-rows (title left, description right, separator line)
  const rows = [
    ["Warm-water double wash",  "Breaks down oils first, then cleans thoroughly."],
    ["Conditioning rinse",      "Leaves the coat soft, never heavy or coated."],
    ["Eco-friendly products",   "Plant-based, free of sulfates and parabens."],
    ["High-velocity blow-out",  "Lifts shed undercoat directly off the skin."],
    ["Finishing brush and spritz","A clean fresh scent that is never perfumed."],
  ];
  const rowStartY = 3.95, rowH = 0.55;
  rows.forEach((r, i) => {
    const y = rowStartY + i * rowH;
    // separator line (top of row)
    s.addShape(pres.shapes.LINE, {
      x: rx, y, w: 6.15, h: 0,
      line: { color: C.tanDk, width: 0.5 },
    });
    s.addText(r[0], {
      x: rx, y: y + 0.08, w: 3.2, h: 0.4,
      fontFace: F_SANS, fontSize: 14, color: C.ink,
      margin: 0, valign: "middle",
    });
    s.addText(r[1], {
      x: rx + 3.3, y: y + 0.08, w: 2.85, h: 0.4,
      fontFace: F_SANS, fontSize: 10, color: C.textMute,
      align: "right", margin: 0, valign: "middle",
    });
  });

  addFooter(s, 5);
}

// =============================================================================
// SLIDE 6 — HAIRCUT & STYLING
// =============================================================================
function buildSlide6() {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "06  —  HAIRCUT & STYLING");

  // --- Left illustration area: grooming table with dog ---
  const ix = 0.55, iy = 1.0, iw = 5.75, ih = 5.15;

  // Sage half-circle accent (top-left)
  s.addShape(pres.shapes.OVAL, {
    x: ix - 0.4, y: iy - 0.35, w: 1.1, h: 1.1,
    fill: { color: C.sageDk }, line: { type: "none" },
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: ix, y: iy, w: iw, h: ih,
    fill: { color: C.tan }, line: { type: "none" },
  });

  // Mirror/wall panel
  s.addShape(pres.shapes.RECTANGLE, {
    x: ix + 0.8, y: iy + 0.5, w: 4.1, h: 2.5,
    fill: { color: C.tanDk, transparency: 30 }, line: { type: "none" },
  });

  // Scissors (abstracted: two tiny circles + crossing lines)
  s.addShape(pres.shapes.OVAL, {
    x: ix + 1.9, y: iy + 1.15, w: 0.18, h: 0.18,
    fill: { color: C.cream }, line: { color: C.ink, width: 0.75 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: ix + 2.05, y: iy + 1.15, w: 0.18, h: 0.18,
    fill: { color: C.cream }, line: { color: C.ink, width: 0.75 },
  });
  s.addShape(pres.shapes.LINE, {
    x: ix + 2.15, y: iy + 1.23, w: 0.8, h: 0,
    line: { color: C.ink, width: 1 },
  });

  // Grooming table top
  s.addShape(pres.shapes.RECTANGLE, {
    x: ix + 0.55, y: iy + 3.65, w: 4.6, h: 0.15,
    fill: { color: "6F5A3F" }, line: { type: "none" },
  });
  // Table legs
  s.addShape(pres.shapes.RECTANGLE, {
    x: ix + 0.75, y: iy + 3.8, w: 0.15, h: 1.1,
    fill: { color: "6F5A3F" }, line: { type: "none" },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: ix + 4.8, y: iy + 3.8, w: 0.15, h: 1.1,
    fill: { color: "6F5A3F" }, line: { type: "none" },
  });

  // Dog body on table (side profile, simplified)
  s.addShape(pres.shapes.OVAL, {
    x: ix + 1.5, y: iy + 2.55, w: 2.6, h: 1.3,
    fill: { color: C.creamAlt }, line: { color: C.ink, width: 0.75 },
  });
  // Dog head
  s.addShape(pres.shapes.OVAL, {
    x: ix + 1.2, y: iy + 2.3, w: 1.1, h: 1.1,
    fill: { color: C.creamAlt }, line: { color: C.ink, width: 0.75 },
  });
  // Tuft on head
  s.addShape(pres.shapes.OVAL, {
    x: ix + 1.5, y: iy + 1.9, w: 0.5, h: 0.5,
    fill: { color: C.creamAlt }, line: { color: C.ink, width: 0.75 },
  });
  // Eye
  s.addShape(pres.shapes.OVAL, {
    x: ix + 1.8, y: iy + 2.65, w: 0.08, h: 0.08,
    fill: { color: C.ink }, line: { type: "none" },
  });
  s.addShape(pres.shapes.OVAL, {
    x: ix + 2.0, y: iy + 2.65, w: 0.08, h: 0.08,
    fill: { color: C.ink }, line: { type: "none" },
  });
  // Tiny hair clippings on table
  s.addShape(pres.shapes.OVAL, {
    x: ix + 2.4, y: iy + 4.0, w: 0.07, h: 0.07,
    fill: { color: "9C8870" }, line: { type: "none" },
  });
  s.addShape(pres.shapes.OVAL, {
    x: ix + 3.0, y: iy + 4.1, w: 0.06, h: 0.06,
    fill: { color: "9C8870" }, line: { type: "none" },
  });
  s.addShape(pres.shapes.OVAL, {
    x: ix + 3.7, y: iy + 4.05, w: 0.07, h: 0.07,
    fill: { color: "9C8870" }, line: { type: "none" },
  });

  // Caption
  s.addShape(pres.shapes.RECTANGLE, {
    x: ix + 0.2, y: iy + ih - 0.5, w: 2.9, h: 0.35,
    fill: { color: C.creamAlt }, line: { type: "none" },
  });
  s.addText("ILLUSTRATION  ·  SCISSOR WORK ON THE TABLE", {
    x: ix + 0.2, y: iy + ih - 0.5, w: 2.9, h: 0.35,
    fontFace: F_SANS, fontSize: 9, color: C.textMute,
    charSpacing: 2, align: "center", valign: "middle", margin: 0,
  });

  // --- Right content column ---
  const rx = 6.65;
  s.addText("SERVICE 02", {
    x: rx, y: 1.0, w: 4, h: 0.35,
    fontFace: F_SANS, fontSize: 12, color: C.terra,
    charSpacing: 3, margin: 0, valign: "middle",
  });
  s.addText([
    { text: "Haircut & " },
    { text: "styling", options: { italic: true } },
  ], {
    x: rx, y: 1.45, w: 6.2, h: 0.85,
    fontFace: F_SANS, fontSize: 38, color: C.ink,
    margin: 0, valign: "top",
  });
  s.addText(
    "Breed-standard cuts if you want them, a clean puppy cut if you don't, and anything in between. " +
    "We consult every time — length, face, paws, and tail — before a blade touches the coat.",
    {
      x: rx, y: 2.4, w: 6.15, h: 1.1,
      fontFace: F_SANS, fontSize: 12, color: C.text,
      lineSpacingMultiple: 1.45, margin: 0, valign: "top",
    }
  );
  s.addText("WHAT'S INCLUDED", {
    x: rx, y: 3.6, w: 4, h: 0.3,
    fontFace: F_SANS, fontSize: 11, bold: true, color: C.textMute,
    charSpacing: 3, margin: 0, valign: "middle",
  });

  const rows = [
    ["Pre-cut consultation",     "Reference photos are always welcome."],
    ["Full body clip and finish","Even lines and a natural silhouette."],
    ["Sanitary and paw-pad trim","Neater feet and a cleaner belly line."],
    ["Face and head shaping",    "Teddy, round, or square — your call."],
    ["Bandana or bow to finish", "Included, or skipped if you prefer."],
  ];
  const rowStartY = 3.95, rowH = 0.55;
  rows.forEach((r, i) => {
    const y = rowStartY + i * rowH;
    s.addShape(pres.shapes.LINE, {
      x: rx, y, w: 6.15, h: 0,
      line: { color: C.tanDk, width: 0.5 },
    });
    s.addText(r[0], {
      x: rx, y: y + 0.08, w: 3.2, h: 0.4,
      fontFace: F_SANS, fontSize: 14, color: C.ink,
      margin: 0, valign: "middle",
    });
    s.addText(r[1], {
      x: rx + 3.3, y: y + 0.08, w: 2.85, h: 0.4,
      fontFace: F_SANS, fontSize: 10, color: C.textMute,
      align: "right", margin: 0, valign: "middle",
    });
  });

  addFooter(s, 6);
}

// =============================================================================
// SLIDE 7 — ESSENTIALS
// =============================================================================
function buildSlide7() {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "07  —  ESSENTIALS");

  // Eyebrow
  s.addText("THE ESSENTIALS", {
    x: 0.55, y: 1.0, w: 5, h: 0.4,
    fontFace: F_SANS, fontSize: 13, color: C.terra,
    charSpacing: 3, margin: 0, valign: "middle",
  });

  // Headline
  s.addText([
    { text: "Nails. Ears. " },
    { text: "Teeth.", options: { italic: true } },
  ], {
    x: 0.55, y: 1.45, w: 9.5, h: 1.0,
    fontFace: F_SANS, fontSize: 50, color: C.ink,
    margin: 0, valign: "top",
  });

  // Support paragraph on right
  s.addText(
    "The small things that make the biggest difference to comfort and long-term health. " +
    "Quick to add to any visit, or booked as a stand-alone freshen-up.",
    {
      x: 9.6, y: 1.55, w: 3.3, h: 1.2,
      fontFace: F_SANS, fontSize: 11, color: C.text,
      lineSpacingMultiple: 1.45, margin: 0, valign: "top",
    }
  );

  // --- Three essential cards ---
  const cards = [
    { label: "ESSENTIAL · 03", time: "~15 MIN", title: "Nail trim & grind",
      desc: "Clipped short, then gently ground smooth so nothing catches on rugs, socks, or skin.",
      bullets: ["Quiet rotary grinder, low vibration", "Dremel-smooth finish on every toe", "Dew claws included at no extra charge"],
      tint: C.creamDk },
    { label: "ESSENTIAL · 04", time: "~10 MIN", title: "Ear clean & pluck",
      desc: "Gentle flush and dry that keeps infections, yeast, and that doggy-ear smell from setting in.",
      bullets: ["Vet-grade, alcohol-free solution", "Careful pluck for breeds that need it", "Visual ear-canal check every visit"],
      tint: C.sagePale },
    { label: "ESSENTIAL · 05", time: "~10 MIN", title: "Teeth & breath",
      desc: "A pup-safe enzymatic brushing between dental visits. Fresher breath and healthier gums.",
      bullets: ["Flavored enzymatic pup-paste", "Soft silicone finger brush", "No fluoride and no xylitol, ever"],
      tint: "F0D9CF" },
  ];

  const cardW = 4.1, cardH = 4.0, cardGap = 0.1, startX = 0.55, startY = 2.7;
  cards.forEach((card, i) => {
    const x = startX + i * (cardW + cardGap);
    // Illustration area (top half)
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cardW, h: 1.55,
      fill: { color: card.tint }, line: { color: C.tanDk, width: 0.5 },
    });
    // Simple dog-paw / shape illustration
    if (i === 0) {
      // Paw with nail grinder
      const pawCx = x + cardW / 2 - 0.7, pawCy = startY + 1.0;
      // Paw pad (round)
      s.addShape(pres.shapes.OVAL, {
        x: pawCx - 0.45, y: pawCy, w: 0.9, h: 0.6,
        fill: { color: C.creamAlt }, line: { color: C.ink, width: 0.75 },
      });
      // Toes (3 little circles on top)
      for (let t = 0; t < 3; t++) {
        s.addShape(pres.shapes.OVAL, {
          x: pawCx - 0.4 + t * 0.3, y: pawCy - 0.35, w: 0.3, h: 0.4,
          fill: { color: C.creamAlt }, line: { color: C.ink, width: 0.75 },
        });
      }
      // Grinder tool (terracotta shape)
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: pawCx + 0.6, y: pawCy - 0.25, w: 1.0, h: 0.25,
        fill: { color: C.terra }, line: { color: C.ink, width: 0.75 }, rectRadius: 0.08,
      });
      s.addShape(pres.shapes.OVAL, {
        x: pawCx + 0.5, y: pawCy - 0.22, w: 0.2, h: 0.2,
        fill: { color: C.ink }, line: { type: "none" },
      });
    } else if (i === 1) {
      // Ear / head profile
      const hx = x + cardW / 2 - 0.7, hy = startY + 0.5;
      s.addShape(pres.shapes.OVAL, {
        x: hx, y: hy, w: 1.4, h: 0.95,
        fill: { color: C.creamAlt }, line: { color: C.ink, width: 0.75 },
      });
      // Ear triangle-ish
      s.addShape(pres.shapes.OVAL, {
        x: hx - 0.1, y: hy + 0.1, w: 0.4, h: 0.55,
        fill: { color: C.tan }, line: { color: C.ink, width: 0.75 },
      });
      // Nose
      s.addShape(pres.shapes.OVAL, {
        x: hx + 1.25, y: hy + 0.45, w: 0.15, h: 0.15,
        fill: { color: C.ink }, line: { type: "none" },
      });
      // Eye
      s.addShape(pres.shapes.OVAL, {
        x: hx + 0.85, y: hy + 0.35, w: 0.08, h: 0.08,
        fill: { color: C.ink }, line: { type: "none" },
      });
      // Droplets (cleaning)
      s.addShape(pres.shapes.OVAL, {
        x: hx + 1.55, y: hy, w: 0.1, h: 0.14,
        fill: { color: "9EB5C1" }, line: { type: "none" },
      });
      s.addShape(pres.shapes.OVAL, {
        x: hx + 1.75, y: hy + 0.25, w: 0.1, h: 0.14,
        fill: { color: "9EB5C1" }, line: { type: "none" },
      });
      // swab stick across
      s.addShape(pres.shapes.RECTANGLE, {
        x: hx - 0.5, y: hy + 0.45, w: 0.55, h: 0.08,
        fill: { color: "8A7966" }, line: { type: "none" },
      });
      s.addShape(pres.shapes.OVAL, {
        x: hx - 0.6, y: hy + 0.42, w: 0.18, h: 0.14,
        fill: { color: "FFFFFF" }, line: { type: "none" },
      });
    } else {
      // Mouth/teeth area
      const mx = x + cardW / 2 - 0.75, my = startY + 0.55;
      // Head
      s.addShape(pres.shapes.OVAL, {
        x: mx, y: my, w: 1.6, h: 0.9,
        fill: { color: C.creamAlt }, line: { color: C.ink, width: 0.75 },
      });
      // Nose black oval
      s.addShape(pres.shapes.OVAL, {
        x: mx + 0.6, y: my + 0.15, w: 0.4, h: 0.3,
        fill: { color: C.ink }, line: { type: "none" },
      });
      // Teeth (small rects below nose) — made wider/taller so they render clearly
      for (let t = 0; t < 4; t++) {
        s.addShape(pres.shapes.RECTANGLE, {
          x: mx + 0.55 + t * 0.14, y: my + 0.55, w: 0.12, h: 0.16,
          fill: { color: "FFFFFF" }, line: { color: C.ink, width: 0.4 },
        });
      }
      // Toothbrush
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: mx - 0.8, y: my + 0.1, w: 1.1, h: 0.15,
        fill: { color: C.terra }, line: { color: C.ink, width: 0.5 }, rectRadius: 0.05,
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: mx + 0.25, y: my + 0.08, w: 0.25, h: 0.2,
        fill: { color: "FFFFFF" }, line: { color: C.ink, width: 0.5 },
      });
    }

    // Content area (bottom)
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY + 1.55, w: cardW, h: cardH - 1.55,
      fill: { color: C.creamAlt }, line: { color: C.tanDk, width: 0.5 },
    });

    // Label + time meta
    s.addText(card.label, {
      x: x + 0.3, y: startY + 1.7, w: cardW * 0.55, h: 0.3,
      fontFace: F_SANS, fontSize: 10, color: C.textMute,
      charSpacing: 2, margin: 0, valign: "middle",
    });
    s.addText(card.time, {
      x: x + cardW * 0.55, y: startY + 1.7, w: cardW * 0.4, h: 0.3,
      fontFace: F_SANS, fontSize: 10, color: C.textMute,
      charSpacing: 2, align: "right", margin: 0, valign: "middle",
    });

    // Title
    s.addText(card.title, {
      x: x + 0.3, y: startY + 2.05, w: cardW - 0.6, h: 0.5,
      fontFace: F_SANS, fontSize: 20, color: C.ink,
      margin: 0, valign: "top",
    });

    // Description
    s.addText(card.desc, {
      x: x + 0.3, y: startY + 2.6, w: cardW - 0.6, h: 0.75,
      fontFace: F_SANS, fontSize: 10, color: C.text,
      lineSpacingMultiple: 1.35, margin: 0, valign: "top",
    });

    // Bullets as plain lines
    s.addText(card.bullets.map((b, idx) => ({
      text: b, options: { breakLine: idx < card.bullets.length - 1 },
    })), {
      x: x + 0.3, y: startY + 3.35, w: cardW - 0.6, h: 0.6,
      fontFace: F_SANS, fontSize: 9.5, color: C.text,
      lineSpacingMultiple: 1.3, margin: 0, valign: "top",
    });
  });

  addFooter(s, 7);
}

// =============================================================================
// SLIDE 8 — SPECIALTY
// =============================================================================
function buildSlide8() {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "08  —  SPECIALTY");

  // Eyebrow
  s.addText("SPECIALTY CARE", {
    x: 0.55, y: 1.0, w: 5, h: 0.4,
    fontFace: F_SANS, fontSize: 13, color: C.terra,
    charSpacing: 3, margin: 0, valign: "middle",
  });

  // Headline stacked
  s.addText([
    { text: "For dogs who\n" },
    { text: "need a " },
    { text: "little extra\n", options: { italic: true } },
    { text: "care.",          options: { italic: true } },
  ], {
    x: 0.55, y: 1.45, w: 6.2, h: 3.0,
    fontFace: F_SANS, fontSize: 46, color: C.ink,
    margin: 0, valign: "top", lineSpacingMultiple: 1.05,
  });

  // Lead paragraph
  s.addText(
    "Puppies on their first-ever groom. Seniors who cannot stand for long. " +
    "Rescues who flinch at new hands. The van is built for exactly these dogs.",
    {
      x: 0.55, y: 4.55, w: 5.5, h: 1.0,
      fontFace: F_SANS, fontSize: 13, color: C.text,
      lineSpacingMultiple: 1.4, margin: 0, valign: "top",
    }
  );

  // Call-to-action line
  s.addText("ADD ANY OF THESE TO A STANDARD SERVICE  →", {
    x: 0.55, y: 5.75, w: 6, h: 0.4,
    fontFace: F_SANS, fontSize: 11, color: C.text,
    charSpacing: 3, margin: 0, valign: "middle",
  });

  // --- 2x3 grid of specialty add-ons on the right ---
  const specs = [
    { num: "01", t: "Puppy's first groom",  d: "A gentle introduction — bath, light brush, and a short nail trim. Builds confidence for every visit to come.", sage: true },
    { num: "02", t: "Senior dog care",      d: "Slower pace, warm towels, and frequent rest breaks. We work around joint comfort, not through it." },
    { num: "03", t: "Anxious dog grooming", d: "Quiet van, dim lighting, and a low-decibel dryer. Extra time is always built into the appointment." },
    { num: "04", t: "De-shedding treatment",d: "Specialty shampoo, conditioner, and an undercoat rake. Cuts shedding up to 90% for four to six weeks." },
    { num: "05", t: "Flea & tick treatment",d: "Medicated bath with a full coat check. We flag anything that looks like it needs a vet visit." },
    { num: "06", t: "Anal gland expression",d: "External expression as part of the bath when needed, never done as a default add-on.", sage: true },
  ];
  const gx = 6.35, gy = 1.0;
  const gw = 2.9, gh = 2.02, gap = 0.08;
  specs.forEach((sp, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = gx + col * (gw + gap);
    const y = gy + row * (gh + gap);

    const bg = sp.sage ? C.sage : C.creamAlt;
    const border = sp.sage ? C.sage : C.tanDk;
    const textColor = sp.sage ? C.cream : C.ink;
    const bodyColor = sp.sage ? C.cream : C.text;
    const numColor  = sp.sage ? C.cream : C.textMute;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: gw, h: gh,
      fill: { color: bg }, line: { color: border, width: 0.5 },
    });

    s.addText(sp.num, {
      x: x + 0.3, y: y + 0.2, w: 1, h: 0.3,
      fontFace: F_SANS, fontSize: 10, color: numColor,
      charSpacing: 2, margin: 0, valign: "middle",
    });

    s.addText(sp.t, {
      x: x + 0.3, y: y + 0.65, w: gw - 0.5, h: 0.45,
      fontFace: F_SANS, fontSize: 16, color: textColor,
      margin: 0, valign: "top",
    });

    s.addText(sp.d, {
      x: x + 0.3, y: y + 1.15, w: gw - 0.5, h: gh - 1.25,
      fontFace: F_SANS, fontSize: 10, color: bodyColor,
      lineSpacingMultiple: 1.35, margin: 0, valign: "top",
    });
  });

  addFooter(s, 8);
}

// =============================================================================
// SLIDE 9 — BOOK NOW (dark)
// =============================================================================
function buildSlide9() {
  const s = pres.addSlide();
  s.background = { color: C.ink };
  addHeader(s, "09  —  BOOK NOW", { onDark: true });

  // Eyebrow
  s.addText("BOOK YOUR FIRST VISIT", {
    x: 0.55, y: 1.0, w: 6, h: 0.4,
    fontFace: F_SANS, fontSize: 13, color: C.terra,
    charSpacing: 3, margin: 0, valign: "middle",
  });

  // Headline stacked
  s.addText([
    { text: "See you in the\n", options: { color: C.cream } },
    { text: "driveway.",        options: { color: C.terra, italic: true } },
  ], {
    x: 0.55, y: 1.5, w: 7.5, h: 2.8,
    fontFace: F_SANS, fontSize: 66, margin: 0, valign: "top",
    lineSpacingMultiple: 1.0,
  });

  // Lead paragraph
  s.addText(
    "Same-day and weekend appointments are open. Text, email, or scan the code — " +
    "we confirm within an hour and send a thirty-minute arrival window the morning of.",
    {
      x: 0.55, y: 4.45, w: 6.5, h: 1.05,
      fontFace: F_SANS, fontSize: 12, color: C.cream,
      lineSpacingMultiple: 1.4, margin: 0, valign: "top",
    }
  );

  // Divider line
  s.addShape(pres.shapes.LINE, {
    x: 0.55, y: 5.65, w: 6.2, h: 0,
    line: { color: C.textSoft, width: 0.5 },
  });

  // Contact grid 2x2
  const contacts = [
    { label: "CALL OR TEXT",  value: "999-999-9999" },
    { label: "EMAIL",         value: "k9cuts@k9cuts.com" },
    { label: "SERVICE AREA",  value: "Charlotte, NC" },
    { label: "HOURS",         value: "Mon–Sat  ·  8a–6p" },
  ];
  const cx = [0.55, 3.35], cyArr = [5.8, 6.4];
  contacts.forEach((c, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    s.addText(c.label, {
      x: cx[col], y: cyArr[row], w: 3, h: 0.25,
      fontFace: F_SANS, fontSize: 9, color: C.textSoft,
      charSpacing: 2, margin: 0, valign: "middle",
    });
    s.addText(c.value, {
      x: cx[col], y: cyArr[row] + 0.22, w: 3, h: 0.32,
      fontFace: F_SANS, fontSize: 13, color: C.cream,
      margin: 0, valign: "middle",
    });
  });

  // --- Right side cream panel with QR info ---
  const px = 7.9, py = 1.0, pw = 4.9, ph = 5.7;
  s.addShape(pres.shapes.RECTANGLE, {
    x: px, y: py, w: pw, h: ph,
    fill: { color: C.cream }, line: { type: "none" },
  });

  s.addText("FASTEST WAY TO BOOK", {
    x: px + 0.4, y: py + 0.35, w: pw - 0.8, h: 0.3,
    fontFace: F_SANS, fontSize: 11, color: C.textMute,
    charSpacing: 3, margin: 0, valign: "middle",
  });

  s.addText("Scan to book online today.", {
    x: px + 0.4, y: py + 0.7, w: pw - 0.8, h: 0.55,
    fontFace: F_SANS, fontSize: 24, color: C.ink,
    margin: 0, valign: "top",
  });

  s.addText(
    "Pick a date, tell us about your dog, and we take it from there. No account needed.",
    {
      x: px + 0.4, y: py + 1.45, w: pw - 0.8, h: 0.7,
      fontFace: F_SANS, fontSize: 11, color: C.text,
      lineSpacingMultiple: 1.4, margin: 0, valign: "top",
    }
  );

  // QR code (drawn procedurally as an 8x8 grid of squares with a fixed pattern)
  const qx = px + 1.1, qy = py + 2.4, qSize = 2.7;
  // Outer QR card with thin border
  s.addShape(pres.shapes.RECTANGLE, {
    x: qx, y: qy, w: qSize, h: qSize,
    fill: { color: C.creamAlt }, line: { color: C.tanDk, width: 0.5 },
  });
  // QR grid - deterministic pseudo-random pattern but respecting 3 corner finder squares
  const n = 10, cell = (qSize - 0.4) / n;
  const qStartX = qx + 0.2, qStartY = qy + 0.2;
  // pattern: 0 = blank, 1 = filled
  const pattern = [
    "1111111 0 1011 1111111".replace(/ /g, ""),
    "1000001 0 1101 1000001".replace(/ /g, ""),
    "1011101 0 1010 1011101".replace(/ /g, ""),
    "1011101 0 0111 1011101".replace(/ /g, ""),
    "1011101 0 1100 1011101".replace(/ /g, ""),
    "1000001 0 1001 1000001".replace(/ /g, ""),
    "1111111 0 1010 1111111".replace(/ /g, ""),
  ];
  // Simplify: render 7x7 grid based on pattern (finders + middle data)
  const qn = 7;
  const qcell = (qSize - 0.4) / qn;
  for (let r = 0; r < qn; r++) {
    for (let c = 0; c < qn; c++) {
      // Finder pattern in three corners
      const inFinderTL = r < 3 && c < 3;
      const inFinderTR = r < 3 && c > 3;
      const inFinderBL = r > 3 && c < 3;
      let filled = false;
      if (inFinderTL || inFinderTR || inFinderBL) {
        // Draw finder cells (outer ring + center)
        const lr = inFinderTL ? r : (inFinderTR ? r : r - 4);
        const lc = inFinderTL ? c : (inFinderTR ? c - 4 : c);
        if (lr === 0 || lr === 2 || lc === 0 || lc === 2 || (lr === 1 && lc === 1)) {
          filled = lr !== 1 || lc !== 1 ? (lr === 0 || lr === 2 || lc === 0 || lc === 2) : true;
        }
      } else {
        // Pseudo-random data cells
        filled = ((r * 31 + c * 17 + 7) % 3) !== 0;
      }
      if (filled) {
        s.addShape(pres.shapes.RECTANGLE, {
          x: qStartX + c * qcell, y: qStartY + r * qcell, w: qcell * 0.9, h: qcell * 0.9,
          fill: { color: C.ink }, line: { type: "none" },
        });
      }
    }
  }

  // URL below QR
  s.addText("K9CUTS.COM/BOOK", {
    x: px + 0.4, y: py + ph - 0.7, w: pw - 0.8, h: 0.35,
    fontFace: F_SANS, fontSize: 12, bold: true, color: C.text,
    charSpacing: 3, margin: 0, valign: "middle",
  });

  addFooter(s, 9, { onDark: true });
}

// -----------------------------------------------------------------------------
// Build all slides and write file
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

pres.writeFile({ fileName: "Mobile_K9_Salon.pptx" })
  .then((f) => console.log("Wrote: " + f));
