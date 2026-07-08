// FLEX — Personal Training Conference Keynote Deck
// Generates a replica of the 8-slide keynote using pptxgenjs.
//
// Run:  node flex_presentation.js
// Outputs: flex_personal_training.pptx

const pptxgen = require("pptxgenjs");

// ---------- Design tokens ----------
const COLOR_BG      = "0A0A0A"; // near-black slide background
const COLOR_TEXT    = "F0EDE4"; // warm off-white (primary text)
const COLOR_MUTED   = "6B6B6B"; // muted gray (labels / metadata)
const COLOR_MUTED_2 = "8A8A8A"; // slightly brighter muted gray
const COLOR_ACCENT  = "C5F000"; // signature lime / chartreuse
const COLOR_STRIKE  = "6B6B6B"; // strike-through "LOSE WEIGHT FAST"
const COLOR_DIV     = "2A2A2A"; // thin divider lines
const COLOR_BLACK   = "0A0A0A"; // text on lime background

const FONT_HEAD = "Arial";   // big display type
const FONT_BODY = "Calibri"; // body copy

// ---------- Layout ----------
// LAYOUT_WIDE is 13.333" x 7.5" (16:9 at higher px)
const SLIDE_W = 13.333;
const SLIDE_H = 7.5;
const MARGIN  = 0.6;  // outer page margin

// ---------- Reusable chrome (top bar / footer) ----------
// The top bar is where the "FLEX" wordmark lives.  On the original render
// the box was too narrow and the word wrapped ("FL" on one line, "EX" on
// the next).  We give it a generous width here so "FLEX" always fits on
// one line, regardless of character spacing.
function addTopBar(slide, sectionLabel) {
  // FLEX wordmark (top-left) — wide box, no wrap, no internal margin so it
  // aligns flush with the left page margin.
  slide.addText("FLEX", {
    x: MARGIN, y: 0.45, w: 3.0, h: 0.45,
    fontFace: FONT_HEAD, fontSize: 14, bold: true,
    color: COLOR_TEXT, charSpacing: 4,
    align: "left", valign: "middle", margin: 0,
    wrap: false,
  });

  // Section label (top-right) — e.g. "02 / 08 — ORIGIN"
  if (sectionLabel) {
    slide.addText(sectionLabel, {
      x: SLIDE_W - MARGIN - 4.0, y: 0.45, w: 4.0, h: 0.45,
      fontFace: FONT_HEAD, fontSize: 11,
      color: COLOR_MUTED_2, charSpacing: 3,
      align: "right", valign: "middle", margin: 0,
    });
  }
}

function addFooter(slide, leftText) {
  if (leftText) {
    slide.addText(leftText, {
      x: MARGIN, y: SLIDE_H - 0.75, w: 8.0, h: 0.35,
      fontFace: FONT_HEAD, fontSize: 10,
      color: COLOR_MUTED, charSpacing: 3,
      align: "left", valign: "middle", margin: 0,
    });
  }
  slide.addText("FLEX / 2026", {
    x: SLIDE_W - MARGIN - 3.0, y: SLIDE_H - 0.75, w: 3.0, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 10,
    color: COLOR_MUTED, charSpacing: 3,
    align: "right", valign: "middle", margin: 0,
  });
}

// ============================================================
// Build presentation
// ============================================================
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = "FLEX — Personal Training";
pres.author = "FLEX";

// ------------------------------------------------------------
// SLIDE 1 — Cover
// ------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: COLOR_BG };

  // Top bar (custom — different from the chrome on 2-8)
  s.addText("FLEX — PERSONAL TRAINING", {
    x: MARGIN, y: 0.45, w: 6.0, h: 0.45,
    fontFace: FONT_HEAD, fontSize: 13,
    color: COLOR_TEXT, charSpacing: 4,
    align: "left", valign: "middle", margin: 0,
    wrap: false,
  });
  s.addText("TAMPA, FL  ·  WORLDWIDE", {
    x: SLIDE_W - MARGIN - 5.0, y: 0.45, w: 5.0, h: 0.45,
    fontFace: FONT_HEAD, fontSize: 13,
    color: COLOR_TEXT, charSpacing: 4,
    align: "right", valign: "middle", margin: 0,
  });

  // Tagline (left)
  s.addText("BODY RECOMPOSITION", {
    x: MARGIN, y: 1.85, w: 6.0, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 15, bold: true,
    color: COLOR_ACCENT, charSpacing: 4,
    align: "left", valign: "middle", margin: 0,
  });

  // Stats (right column)
  const statsX = SLIDE_W - MARGIN - 4.5;
  s.addText([
    { text: "200+ ", options: { bold: true, color: COLOR_TEXT } },
    { text: "CLIENTS",    options: { color: COLOR_MUTED_2 } },
  ], {
    x: statsX, y: 1.85, w: 4.5, h: 0.45,
    fontFace: FONT_HEAD, fontSize: 14, charSpacing: 3,
    align: "right", valign: "middle", margin: 0,
  });
  s.addText([
    { text: "60 ", options: { bold: true, color: COLOR_TEXT } },
    { text: "COUNTRIES", options: { color: COLOR_MUTED_2 } },
  ], {
    x: statsX, y: 2.35, w: 4.5, h: 0.45,
    fontFace: FONT_HEAD, fontSize: 14, charSpacing: 3,
    align: "right", valign: "middle", margin: 0,
  });
  s.addText([
    { text: "1 ", options: { bold: true, color: COLOR_TEXT } },
    { text: "COACH",    options: { color: COLOR_MUTED_2 } },
  ], {
    x: statsX, y: 2.85, w: 4.5, h: 0.45,
    fontFace: FONT_HEAD, fontSize: 14, charSpacing: 3,
    align: "right", valign: "middle", margin: 0,
  });

  // Big FLEX. wordmark — the period is rendered in accent lime as a
  // rich-text run so it scales and positions with the rest of the word
  // (no need for a hand-placed accent shape that can drift at different
  // font renderings).
  s.addText([
    { text: "FLEX", options: { color: COLOR_TEXT } },
    { text: ".",    options: { color: COLOR_ACCENT } },
  ], {
    x: MARGIN, y: 3.7, w: 10.0, h: 2.6,
    fontFace: FONT_HEAD, fontSize: 240, bold: true,
    charSpacing: -2, align: "left", valign: "middle", margin: 0,
  });

  // Footer
  s.addText("CONFERENCE KEYNOTE  ·  2026", {
    x: MARGIN, y: SLIDE_H - 0.75, w: 6.0, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11,
    color: COLOR_MUTED_2, charSpacing: 3,
    align: "left", valign: "middle", margin: 0,
  });
  s.addText("01 / 08", {
    x: SLIDE_W - MARGIN - 3.0, y: SLIDE_H - 0.75, w: 3.0, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11,
    color: COLOR_MUTED_2, charSpacing: 3,
    align: "right", valign: "middle", margin: 0,
  });
}

// ------------------------------------------------------------
// SLIDE 2 — Origin (Tampa, Global)
// ------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: COLOR_BG };
  addTopBar(s, "02 / 08 — ORIGIN");

  s.addText("SECTION 01", {
    x: MARGIN, y: 1.55, w: 6, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, color: COLOR_MUTED_2,
    charSpacing: 3, margin: 0, valign: "middle",
  });
  s.addText("TAMPA, GLOBAL.", {
    x: MARGIN, y: 1.95, w: 10, h: 0.6,
    fontFace: FONT_HEAD, fontSize: 28, bold: true,
    color: COLOR_ACCENT, margin: 0, valign: "middle",
  });

  // Two columns: FROM / TO
  const colW = 5.6;
  const col1X = MARGIN;
  const col2X = MARGIN + 6.4;
  const colY  = 2.95;

  // --- Column 1: FROM / TAMPA FLORIDA ---
  s.addText("FROM", {
    x: col1X, y: colY, w: colW, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, color: COLOR_MUTED_2,
    charSpacing: 3, margin: 0, valign: "middle",
  });
  s.addText("TAMPA\nFLORIDA", {
    x: col1X, y: colY + 0.4, w: colW, h: 1.8,
    fontFace: FONT_HEAD, fontSize: 54, bold: true,
    color: COLOR_TEXT, margin: 0, valign: "top",
    charSpacing: -1,
  });
  s.addText(
    "One coach. One studio floor. A roster that filled up fast — then ran out of local hours in the day.",
    {
      x: col1X, y: colY + 2.35, w: colW, h: 1.0,
      fontFace: FONT_BODY, fontSize: 14, color: COLOR_TEXT,
      margin: 0, valign: "top", paraSpaceAfter: 4,
    }
  );

  // --- Column 2: TO → / EVERY-WHERE ---
  s.addText([
    { text: "TO ",    options: { color: COLOR_MUTED_2 } },
    { text: "\u2192", options: { color: COLOR_ACCENT, bold: true } },
  ], {
    x: col2X, y: colY, w: colW, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, charSpacing: 3,
    margin: 0, valign: "middle",
  });
  s.addText("EVERY-\nWHERE", {
    x: col2X, y: colY + 0.4, w: colW, h: 1.8,
    fontFace: FONT_HEAD, fontSize: 54, bold: true,
    color: COLOR_TEXT, margin: 0, valign: "top",
    charSpacing: -1,
  });
  s.addText(
    "Remote programming moved clients out of my calendar and into a system. The roster went from a neighborhood to a map.",
    {
      x: col2X, y: colY + 2.35, w: colW, h: 1.2,
      fontFace: FONT_BODY, fontSize: 14, color: COLOR_TEXT,
      margin: 0, valign: "top",
    }
  );

  addFooter(s, "27°N  ·  82°W");
}

// ------------------------------------------------------------
// SLIDE 3 — Problem
// ------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: COLOR_BG };
  addTopBar(s, "03 / 08 — PROBLEM");

  s.addText("THE RECOMP PROBLEM", {
    x: MARGIN, y: 1.55, w: 10, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 12, color: COLOR_MUTED_2,
    charSpacing: 3, margin: 0, valign: "middle",
  });

  // "LOSE WEIGHT FAST." — struck through
  s.addText([{ text: "LOSE WEIGHT FAST.", options: { strike: true } }], {
    x: MARGIN, y: 2.1, w: 11, h: 1.15,
    fontFace: FONT_HEAD, fontSize: 68, bold: true,
    color: COLOR_STRIKE, margin: 0, valign: "top",
    charSpacing: -1,
  });

  // "BUILD A BODY THAT HOLDS." — BODY in accent color
  s.addText([
    { text: "BUILD A ", options: { color: COLOR_TEXT } },
    { text: "BODY ",    options: { color: COLOR_ACCENT } },
    { text: "THAT\nHOLDS.", options: { color: COLOR_TEXT } },
  ], {
    x: MARGIN, y: 3.2, w: 11, h: 2.3,
    fontFace: FONT_HEAD, fontSize: 68, bold: true,
    margin: 0, valign: "top", charSpacing: -1,
  });

  // Description paragraph
  s.addText(
    "Cut-and-rebound cycles sell. They don't work. Body recomposition — losing fat and gaining muscle in parallel — takes longer and pays off permanently. That's the only game I coach.",
    {
      x: MARGIN, y: 5.55, w: 9.0, h: 1.1,
      fontFace: FONT_BODY, fontSize: 14, color: COLOR_TEXT,
      margin: 0, valign: "top",
    }
  );

  addFooter(s, "RECOMP  ·  PROGRESSIVE OVERLOAD  ·  PROTEIN  ·  SLEEP");
}

// ------------------------------------------------------------
// SLIDE 4 — Method (three columns)
// ------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: COLOR_BG };
  addTopBar(s, "04 / 08 — METHOD");

  s.addText("SECTION 02", {
    x: MARGIN, y: 1.55, w: 6, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, color: COLOR_MUTED_2,
    charSpacing: 3, margin: 0, valign: "middle",
  });
  s.addText("THE METHOD.", {
    x: MARGIN, y: 1.95, w: 10, h: 0.6,
    fontFace: FONT_HEAD, fontSize: 28, bold: true,
    color: COLOR_TEXT, margin: 0, valign: "middle",
  });

  // Three columns
  const cols = [
    {
      num: "/ 01",
      head: "CUSTOM, NOT\nCOPIED.",
      body: "Every program is written from scratch against your lifts, your schedule, your physiology — not a PDF template with a new name on the front.",
    },
    {
      num: "/ 02",
      head: "LONG HORIZON.",
      body: "Twelve-week blocks inside multi-year arcs. Muscle is built in months, kept for decades. We train for the version of you ten years from now.",
    },
    {
      num: "/ 03",
      head: "ACCOUNTABLE,\nALWAYS.",
      body: "Weekly check-ins, weekly adjustments. Every set and macro logged. The program answers to the data, not the other way around.",
    },
  ];

  const totalW = SLIDE_W - MARGIN * 2;
  const colGap = 0.4;
  const colW   = (totalW - colGap * 2) / 3;
  const topY   = 3.1;

  cols.forEach((c, i) => {
    const x = MARGIN + i * (colW + colGap);
    // Accent divider line on top
    s.addShape(pres.shapes.LINE, {
      x: x, y: topY, w: colW - 0.2, h: 0,
      line: { color: COLOR_ACCENT, width: 1 },
    });
    // Index label
    s.addText(c.num, {
      x: x, y: topY + 0.1, w: colW, h: 0.35,
      fontFace: FONT_HEAD, fontSize: 12, bold: true,
      color: COLOR_ACCENT, charSpacing: 3,
      margin: 0, valign: "middle",
    });
    // Heading
    s.addText(c.head, {
      x: x, y: topY + 0.55, w: colW, h: 1.3,
      fontFace: FONT_HEAD, fontSize: 24, bold: true,
      color: COLOR_TEXT, margin: 0, valign: "top",
    });
    // Body copy
    s.addText(c.body, {
      x: x, y: topY + 2.1, w: colW, h: 1.8,
      fontFace: FONT_BODY, fontSize: 13, color: COLOR_TEXT,
      margin: 0, valign: "top",
    });
  });

  addFooter(s, "PROGRAM  ·  PROGRESS  ·  PROTOCOL");
}

// ------------------------------------------------------------
// SLIDE 5 — By the numbers
// ------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: COLOR_BG };
  addTopBar(s, "05 / 08 — SCALE");

  s.addText("SECTION 03", {
    x: MARGIN, y: 1.35, w: 6, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, color: COLOR_MUTED_2,
    charSpacing: 3, margin: 0, valign: "middle",
  });
  s.addText("BY THE NUMBERS.", {
    x: MARGIN, y: 1.75, w: 10, h: 0.6,
    fontFace: FONT_HEAD, fontSize: 28, bold: true,
    color: COLOR_TEXT, margin: 0, valign: "middle",
  });

  // --- Row 1: 200+ / CLIENTS COACHED ---
  s.addText("200+", {
    x: MARGIN, y: 2.6, w: 4.5, h: 1.6,
    fontFace: FONT_HEAD, fontSize: 120, bold: true,
    color: COLOR_ACCENT, charSpacing: -2,
    margin: 0, valign: "middle", align: "left",
  });
  s.addText("CLIENTS COACHED", {
    x: 5.5, y: 2.85, w: 7.2, h: 0.7,
    fontFace: FONT_HEAD, fontSize: 30, bold: false,
    color: COLOR_TEXT, margin: 0, valign: "middle",
  });
  s.addText("ACTIVE + ALUMNI  ·  BODY RECOMP FOCUS", {
    x: 5.5, y: 3.7, w: 7.2, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 12, color: COLOR_MUTED_2,
    charSpacing: 3, margin: 0, valign: "middle",
  });

  // Horizontal divider
  s.addShape(pres.shapes.LINE, {
    x: MARGIN, y: 4.45, w: SLIDE_W - MARGIN * 2, h: 0,
    line: { color: COLOR_DIV, width: 1 },
  });

  // --- Row 2: 60 / COUNTRIES ON THE ROSTER ---
  s.addText("60", {
    x: MARGIN, y: 4.7, w: 4.5, h: 1.6,
    fontFace: FONT_HEAD, fontSize: 120, bold: true,
    color: COLOR_ACCENT, charSpacing: -2,
    margin: 0, valign: "middle", align: "left",
  });
  s.addText("COUNTRIES ON THE ROSTER", {
    x: 5.5, y: 4.95, w: 7.2, h: 0.7,
    fontFace: FONT_HEAD, fontSize: 30, bold: false,
    color: COLOR_TEXT, margin: 0, valign: "middle",
  });
  s.addText("SIX CONTINENTS  ·  ONE TIME ZONE (MINE)", {
    x: 5.5, y: 5.8, w: 7.2, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 12, color: COLOR_MUTED_2,
    charSpacing: 3, margin: 0, valign: "middle",
  });

  addFooter(s, "NASM-CPT  ·  PN-L1 NUTRITION  ·  8 YRS COACHING");
}

// ------------------------------------------------------------
// SLIDE 6 — Built on Social
// ------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: COLOR_BG };
  addTopBar(s, "06 / 08 — PLAYBOOK");

  // Left column
  s.addText("SECTION 04", {
    x: MARGIN, y: 1.55, w: 6, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, color: COLOR_MUTED_2,
    charSpacing: 3, margin: 0, valign: "middle",
  });
  s.addText([
    { text: "BUILT ON\n",   options: { color: COLOR_TEXT } },
    { text: "SOCIAL.",      options: { color: COLOR_ACCENT } },
  ], {
    x: MARGIN, y: 1.95, w: 6.2, h: 2.4,
    fontFace: FONT_HEAD, fontSize: 60, bold: true,
    margin: 0, valign: "top", charSpacing: -1,
  });
  s.addText(
    "No ad budget. No agency. Just reps on camera — teaching what I'd tell a client, in public.",
    {
      x: MARGIN, y: 4.45, w: 5.5, h: 0.9,
      fontFace: FONT_BODY, fontSize: 14, color: COLOR_TEXT,
      margin: 0, valign: "top",
    }
  );

  // Right column: numbered playbook
  const items = [
    ["/01", "Teach the thing. Every single day."],
    ["/02", "Show the work, not the highlight reel."],
    ["/03", "Client wins in client words."],
    ["/04", "Answer DMs like they're paying clients."],
    ["/05", "Be findable in every time zone."],
  ];
  const rightX = 7.3;
  const rightW = SLIDE_W - MARGIN - rightX;
  const rowH   = 0.65;
  const startY = 2.0;

  // Divider above first row
  s.addShape(pres.shapes.LINE, {
    x: rightX, y: startY, w: rightW, h: 0,
    line: { color: COLOR_DIV, width: 0.75 },
  });

  items.forEach((it, i) => {
    const y = startY + 0.15 + i * rowH;
    s.addText(it[0], {
      x: rightX, y: y, w: 0.9, h: rowH - 0.15,
      fontFace: FONT_HEAD, fontSize: 12, bold: true,
      color: COLOR_ACCENT, charSpacing: 3,
      margin: 0, valign: "middle",
    });
    s.addText(it[1], {
      x: rightX + 1.0, y: y, w: rightW - 1.0, h: rowH - 0.15,
      fontFace: FONT_BODY, fontSize: 15, color: COLOR_TEXT,
      margin: 0, valign: "middle",
    });
    // Bottom divider per row
    s.addShape(pres.shapes.LINE, {
      x: rightX, y: startY + (i + 1) * rowH, w: rightW, h: 0,
      line: { color: COLOR_DIV, width: 0.75 },
    });
  });

  addFooter(s, "CONTENT = DISTRIBUTION = TRUST");
}

// ------------------------------------------------------------
// SLIDE 7 — The Programs (three tiers)
// ------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: COLOR_BG };
  addTopBar(s, "07 / 08 — OFFER");

  s.addText("SECTION 05", {
    x: MARGIN, y: 1.35, w: 6, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, color: COLOR_MUTED_2,
    charSpacing: 3, margin: 0, valign: "middle",
  });
  s.addText("THE PROGRAMS.", {
    x: MARGIN, y: 1.75, w: 10, h: 0.6,
    fontFace: FONT_HEAD, fontSize: 28, bold: true,
    color: COLOR_TEXT, margin: 0, valign: "middle",
  });

  // Three tier cards
  const tiers = [
    {
      eyebrow: "TIER I",
      title: "FOUNDATIONS",
      desc: "For the lifter building a base. Custom 12-week block with monthly recalibration.",
      bullets: ["Custom programming", "Monthly progress review", "Nutrition framework"],
      highlighted: false,
    },
    {
      eyebrow: "TIER II  ·  FLAGSHIP",
      title: "RECOMP\nPROTOCOL",
      desc: "The full signature program. Long-horizon body recomposition, built around your life.",
      bullets: ["Fully custom programming", "Weekly check-ins + macros", "Direct line, 7 days a week"],
      highlighted: true,
    },
    {
      eyebrow: "TIER III",
      title: "INNER CIRCLE",
      desc: "For the client playing the long game. Multi-year coaching for advanced physique work.",
      bullets: ["Everything in Recomp Protocol", "Quarterly strategy calls", "Photoshoot / event peaks"],
      highlighted: false,
    },
  ];

  const cardY = 2.7;
  const cardH = 3.9;
  const totalW = SLIDE_W - MARGIN * 2;
  const gap    = 0.22;
  const cardW  = (totalW - gap * 2) / 3;
  const padX   = 0.35;

  tiers.forEach((t, i) => {
    const x = MARGIN + i * (cardW + gap);
    const bg   = t.highlighted ? COLOR_ACCENT : "151515";
    const txt  = t.highlighted ? COLOR_BLACK : COLOR_TEXT;
    const meta = t.highlighted ? "2A3D00"    : COLOR_MUTED_2;

    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: cardY, w: cardW, h: cardH,
      fill: { color: bg }, line: { color: bg, width: 0 },
    });

    // Eyebrow
    s.addText(t.eyebrow, {
      x: x + padX, y: cardY + 0.3, w: cardW - padX * 2, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 11, color: meta,
      charSpacing: 3, bold: true, margin: 0, valign: "middle",
    });

    // Title
    s.addText(t.title, {
      x: x + padX, y: cardY + 0.65, w: cardW - padX * 2, h: 1.1,
      fontFace: FONT_HEAD, fontSize: 26, bold: true,
      color: txt, margin: 0, valign: "top",
    });

    // Description
    s.addText(t.desc, {
      x: x + padX, y: cardY + 1.85, w: cardW - padX * 2, h: 0.9,
      fontFace: FONT_BODY, fontSize: 12, color: txt,
      margin: 0, valign: "top",
    });

    // Bullets (plain rows, no dots — matches the minimal original)
    const bulletRuns = [];
    t.bullets.forEach((b, bi) => {
      bulletRuns.push({
        text: b,
        options: { breakLine: bi < t.bullets.length - 1 },
      });
    });
    s.addText(bulletRuns, {
      x: x + padX, y: cardY + 2.85, w: cardW - padX * 2, h: 0.95,
      fontFace: FONT_BODY, fontSize: 12, color: txt,
      paraSpaceAfter: 4, margin: 0, valign: "top",
    });
  });

  addFooter(s, "CUSTOM  ·  LONG-TERM  ·  ACCOUNTABLE");
}

// ------------------------------------------------------------
// SLIDE 8 — Vision (closing)
// ------------------------------------------------------------
// Two fixes on this slide:
//   1. The top-left had "FLEX" and "/ WHAT'S NEXT" overlapping.
//      We render them in two separate, vertically stacked text
//      boxes so they never collide.
//   2. "FLEX" stays in its wide top-bar box — same rules as slides 2-7 —
//      so the wordmark does not wrap to a second line.
// ------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: COLOR_BG };

  // --- Top-left: FLEX (row 1) and / WHAT'S NEXT (row 2) ---
  // Separate, stacked boxes with generous widths to eliminate overlap.
  s.addText("FLEX", {
    x: MARGIN, y: 0.45, w: 3.0, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 14, bold: true,
    color: COLOR_TEXT, charSpacing: 4,
    align: "left", valign: "middle", margin: 0,
    wrap: false,
  });
  s.addText("/ WHAT'S NEXT", {
    x: MARGIN, y: 0.88, w: 3.5, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 12, bold: true,
    color: COLOR_ACCENT, charSpacing: 3,
    align: "left", valign: "middle", margin: 0,
    wrap: false,
  });

  // Top-right section label
  s.addText("08 / 08 — VISION", {
    x: SLIDE_W - MARGIN - 4.0, y: 0.45, w: 4.0, h: 0.45,
    fontFace: FONT_HEAD, fontSize: 11,
    color: COLOR_MUTED_2, charSpacing: 3,
    align: "right", valign: "middle", margin: 0,
  });

  // Big vision headline
  s.addText("A GYM IN TAMPA. A\nMAP ON THE WALL.", {
    x: MARGIN, y: 1.8, w: SLIDE_W - MARGIN * 2, h: 3.2,
    fontFace: FONT_HEAD, fontSize: 78, bold: true,
    color: COLOR_TEXT, margin: 0, valign: "top",
    charSpacing: -1,
  });

  // Bottom divider
  s.addShape(pres.shapes.LINE, {
    x: MARGIN, y: 5.75, w: SLIDE_W - MARGIN * 2, h: 0,
    line: { color: COLOR_DIV, width: 1 },
  });

  // Three bottom contact blocks
  const blockY = 5.95;
  const blockW = (SLIDE_W - MARGIN * 2) / 3;

  // 1. TRAIN WITH ME / @FLEX
  s.addText("TRAIN WITH ME", {
    x: MARGIN, y: blockY, w: blockW, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 11, color: COLOR_MUTED_2,
    charSpacing: 3, margin: 0, valign: "middle",
  });
  s.addText("@FLEX", {
    x: MARGIN, y: blockY + 0.35, w: blockW, h: 0.55,
    fontFace: FONT_HEAD, fontSize: 24, bold: true,
    color: COLOR_TEXT, margin: 0, valign: "middle",
  });

  // 2. APPLY / FLEX.CO/APPLY
  s.addText("APPLY", {
    x: MARGIN + blockW, y: blockY, w: blockW, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 11, color: COLOR_MUTED_2,
    charSpacing: 3, margin: 0, valign: "middle",
  });
  s.addText("FLEX.CO/APPLY", {
    x: MARGIN + blockW, y: blockY + 0.35, w: blockW, h: 0.55,
    fontFace: FONT_HEAD, fontSize: 24, bold: true,
    color: COLOR_ACCENT, margin: 0, valign: "middle",
  });

  // 3. INVESTORS · PARTNERS / HELLO@FLEX.CO
  s.addText("INVESTORS  ·  PARTNERS", {
    x: MARGIN + blockW * 2, y: blockY, w: blockW, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 11, color: COLOR_MUTED_2,
    charSpacing: 3, align: "right", margin: 0, valign: "middle",
  });
  s.addText("HELLO@FLEX.CO", {
    x: MARGIN + blockW * 2, y: blockY + 0.35, w: blockW, h: 0.55,
    fontFace: FONT_HEAD, fontSize: 24, bold: true,
    color: COLOR_TEXT, align: "right", margin: 0, valign: "middle",
  });
}

// ---------- Write file ----------
pres.writeFile({ fileName: "flex_personal_training.pptx" })
  .then((fn) => console.log("Wrote", fn))
  .catch((err) => { console.error(err); process.exit(1); });
