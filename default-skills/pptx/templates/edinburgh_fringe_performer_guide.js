// fringe.js — Recreate "Fringe" presentation using pptxgenjs
// Usage: node fringe.js  →  outputs fringe.pptx
//
// Reproduces a 10-slide field guide to the Edinburgh Fringe.
// Slide size: 20" x 11.25" (LAYOUT_WIDE).
// Palette: Yellow FFE600, Off-white F4EFE4, Near-black 0A0A0A, Red E23B2B,
//          Muted warm-gray BDB8A9 / C8C2B4.

const PptxGenJS = require("pptxgenjs");

const pres = new PptxGenJS();
pres.layout = "LAYOUT_WIDE";   // 13.333 x 7.5 — we override below
pres.defineLayout({ name: "FRINGE", width: 20, height: 11.25 });
pres.layout = "FRINGE";

// ---------- Palette ----------
const YELLOW = "FFE600";
const CREAM  = "F4EFE4";
const INK    = "0A0A0A";
const RED    = "E23B2B";
const MUTE1  = "BDB8A9";
const MUTE2  = "C8C2B4";

// ---------- Shared helpers ----------
const FONT = "Arial";

// Default text box defaults; the source deck uses 25400 EMU padding = 0.028"
const PAD = 0.028;

// Shorthand text-run factory. Mirrors the XML "rPr" attributes we extracted.
function run(text, opts = {}) {
  return { text, options: Object.assign({ fontFace: FONT }, opts) };
}

// A tiny helper to add a solid-filled rectangle
function rect(slide, x, y, w, h, fill) {
  slide.addShape(pres.ShapeType.rect, {
    x, y, w, h,
    fill: { color: fill },
    line: { type: "none" },
  });
}

// Rectangle with stroke only (for the slide 10 badge)
function rectStroke(slide, x, y, w, h, color, weight, rotate = 0) {
  const opts = {
    x, y, w, h,
    fill: { type: "none" },
    line: { color, width: weight },
  };
  if (rotate) opts.rotate = rotate;
  slide.addShape(pres.ShapeType.rect, opts);
}

// A text box. Accepts a string OR an array of runs.
function addText(slide, runs, opts) {
  const base = {
    fontFace: FONT,
    color: INK,
    margin: 0.028,        // match the 25400-EMU text box padding
    isTextBox: true,
    valign: "top",
  };
  slide.addText(runs, Object.assign(base, opts));
}

// =====================================================================
// SLIDE 1 — COVER (yellow)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: YELLOW };

  // top-left eyebrow
  addText(s, "EDINBURGH · AUGUST", {
    x: 1.042, y: 1.042, w: 3.386, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });
  // top-right eyebrow (positioned left of the black bar)
  addText(s, "A PRIMER / 01", {
    x: 15.5, y: 1.042, w: 2.1, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
    align: "right",
  });
  // right-side black vertical bar
  rect(s, 17.708, 1.042, 1.25, 7.083, INK);

  // "A field guide for first-time performers."
  addText(s, [
    run("A ",                          { fontSize: 54, italic: true, color: INK }),
    run("field guide ",                { fontSize: 54, bold: true,   color: INK }),
    run("for first-time performers.",  { fontSize: 54, italic: true, color: INK }),
  ], {
    x: 1.042, y: 3.59, w: 9.656, h: 1.542,
    paraSpaceBefore: 0, lineSpacingMultiple: 1.0,
  });

  // Massive "FRINGE" wordmark
  addText(s, "FRINGE", {
    x: 1.042, y: 5.09, w: 16.666, h: 4.483,
    fontSize: 360, color: INK, charSpacing: -14.4,
    lineSpacingMultiple: 0.82, fit: "shrink",
  });

  // Footer-left
  addText(s, "EST. 1947", {
    x: 1.042, y: 9.948, w: 1.388, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });
  // Footer-right
  addText(s, "→ OPEN ACCESS. NO CURATOR.", {
    x: 14.597, y: 9.948, w: 4.492, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });
}

// =====================================================================
// SLIDE 2 — AN OPEN DOOR (cream + black panel)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  // eyebrows
  addText(s, "02 · WHAT IT IS", {
    x: 1.042, y: 1.042, w: 2.422, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });
  addText(s, "OPEN ACCESS FESTIVAL", {
    x: 15.636, y: 1.042, w: 3.422, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });

  // headline
  addText(s, [
    run("AN OPEN ", { fontSize: 165, bold: true,   color: INK, charSpacing: -4.95 }),
    run("DOOR.",    { fontSize: 165, italic: true, color: INK, charSpacing: -4.95 }),
  ], {
    x: 1.042, y: 1.927, w: 9.512, h: 5.896,
    lineSpacingMultiple: 0.85, fit: "shrink",
  });

  // body paragraphs
  addText(s,
    "The Edinburgh Festival Fringe is not programmed. There is no artistic director deciding who performs. If you can find a room and pay the registration, you are in.",
    {
      x: 1.042, y: 8.365, w: 8.154, h: 1.954,
      fontSize: 25.5, color: INK, lineSpacingMultiple: 1.35,
    }
  );
  addText(s,
    "That single rule — open access — is why the Fringe is the largest arts festival on earth, and why it is unlike any other event you will ever play.",
    {
      x: 1.042, y: 10.569, w: 8.154, h: 1.476,
      fontSize: 25.5, color: INK, lineSpacingMultiple: 1.35,
    }
  );

  // Black panel on right
  rect(s, 11.11, 1.927, 7.849, 10.076, INK);

  // Panel heading
  addText(s, "THE RULE.", {
    x: 11.693, y: 2.51, w: 6.882, h: 0.625,
    fontSize: 42, color: YELLOW, charSpacing: -0.84,
    lineSpacingMultiple: 1.0,
  });

  // Sub-line
  addText(s, "NO SELECTION PANEL. NO CURATOR. NO GATEKEEPER.", {
    x: 11.693, y: 3.344, w: 6.882, h: 1.073,
    fontSize: 16.5, color: YELLOW, charSpacing: 1.32,
    lineSpacingMultiple: 1.5,
  });

  // thin yellow divider near bottom of panel
  rect(s, 11.693, 10.112, 6.682, 0.01, YELLOW);

  // Bottom line (cream on black)
  addText(s, "PAY TO REGISTER. FIND A VENUE. PERFORM.", {
    x: 11.693, y: 10.373, w: 6.882, h: 1.089,
    fontSize: 16.5, color: CREAM, charSpacing: 1.32,
    lineSpacingMultiple: 1.5,
  });
}

// =====================================================================
// SLIDE 3 — THE SCALE (black background, yellow numbers)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: INK };

  addText(s, "03 · THE SCALE", {
    x: 1.042, y: 1.042, w: 2.467, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: CREAM,
  });
  addText(s, "AUGUST, EVERY YEAR", {
    x: 15.954, y: 1.042, w: 3.094, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: CREAM,
  });

  // Horizontal dividers
  rect(s, 1.042, 3.844, 17.917, 0.021, CREAM);
  rect(s, 1.042, 6.229, 17.917, 0.021, CREAM);
  rect(s, 1.042, 8.65,  17.917, 0.021, CREAM);

  // --- Row 1: 25 ---
  addText(s, "25", {
    x: 1.042, y: 2.135, w: 3.862, h: 1.542,
    fontSize: 120, color: YELLOW, charSpacing: -4.8, lineSpacingMultiple: 0.9,
  });
  addText(s, "DAYS OF PROGRAMMING, END TO END", {
    x: 5.292, y: 3.073, w: 10.082, h: 0.523,
    fontSize: 33, bold: true, color: CREAM, charSpacing: -0.33,
    lineSpacingMultiple: 1.05,
  });
  addText(s, "The city becomes the festival.", {
    x: 15.479, y: 3.135, w: 3.48, h: 0.474,
    fontSize: 24, italic: true, color: MUTE1, align: "right",
  });

  // --- Row 2: 3,000+ ---
  addText(s, "3,000+", {
    x: 1.042, y: 4.156, w: 4.886, h: 1.542,
    fontSize: 120, color: YELLOW, charSpacing: -4.8, lineSpacingMultiple: 0.9,
  });
  addText(s, "SHOWS REGISTERED EACH YEAR", {
    x: 6.286, y: 5.094, w: 8.461, h: 0.523,
    fontSize: 33, bold: true, color: CREAM, charSpacing: -0.33,
    lineSpacingMultiple: 1.05,
  });
  addText(s, "Theatre, comedy, cabaret, dance, kids, circus.", {
    x: 14.881, y: 5.156, w: 4.077, h: 0.906,
    fontSize: 24, italic: true, color: MUTE1, align: "right",
  });

  // --- Row 3: 300+ ---
  addText(s, "300+", {
    x: 1.042, y: 6.542, w: 3.862, h: 1.542,
    fontSize: 120, color: YELLOW, charSpacing: -4.8, lineSpacingMultiple: 0.9,
  });
  addText(s, "VENUES — FROM CATHEDRALS TO CUPBOARDS", {
    x: 5.292, y: 7.479, w: 9.485, h: 1.004,
    fontSize: 33, bold: true, color: CREAM, charSpacing: -0.33,
    lineSpacingMultiple: 1.05,
  });
  addText(s, "Every spare room in Edinburgh gets a stage.", {
    x: 14.881, y: 7.542, w: 4.077, h: 0.906,
    fontSize: 24, italic: true, color: MUTE1, align: "right",
  });

  // --- Row 4: 60+ ---
  addText(s, "60+", {
    x: 1.042, y: 8.962, w: 3.862, h: 1.542,
    fontSize: 120, color: YELLOW, charSpacing: -4.8, lineSpacingMultiple: 0.9,
  });
  addText(s, "COUNTRIES REPRESENTED ON STAGE", {
    x: 5.292, y: 9.9, w: 9.485, h: 0.523,
    fontSize: 33, bold: true, color: CREAM, charSpacing: -0.33,
    lineSpacingMultiple: 1.05,
  });
  addText(s, "More passports than shows at most festivals.", {
    x: 14.881, y: 9.962, w: 4.077, h: 0.906,
    fontSize: 24, italic: true, color: MUTE1, align: "right",
  });

  // Footer
  addText(s, "SOURCE: FESTIVAL-REPORTED", {
    x: 1.042, y: 11.035, w: 4.332, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: CREAM,
  });
  addText(s, "03 / 10", {
    x: 18.065, y: 11.035, w: 0.977, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: CREAM,
  });
}

// =====================================================================
// SLIDE 4 — THE SHAPE OF AUGUST (cream + 5-column timeline)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  addText(s, "04 · THE SHAPE OF AUGUST", {
    x: 1.042, y: 1.042, w: 4.194, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });
  addText(s, "HOW THE MONTH RUNS", {
    x: 15.769, y: 1.042, w: 3.285, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });

  addText(s, [
    run("THE SHAPE OF ", { fontSize: 135, color: INK, charSpacing: -4.05 }),
    run("AUGUST.",       { fontSize: 135, color: INK, charSpacing: -4.05, italic: true }),
  ], {
    x: 1.042, y: 1.719, w: 18.454, h: 3.357,
    lineSpacingMultiple: 0.88, fit: "shrink",
  });

  // Top and bottom horizontal rules
  rect(s, 1.042, 5.469, 17.917, 0.031, INK);
  rect(s, 1.042, 9.583, 17.917, 0.031, INK);

  // Yellow highlight block for WK 02
  rect(s, 8.208, 5.5, 3.583, 4.083, YELLOW);

  // Vertical dividers between columns
  rect(s, 4.604,  5.5, 0.021, 4.083, INK);
  rect(s, 8.188,  5.5, 0.021, 4.083, INK);
  rect(s, 11.771, 5.5, 0.021, 4.083, INK);
  rect(s, 15.354, 5.5, 0.021, 4.083, INK);

  // Column data
  const cols = [
    { x: 1.333, wk: "WK 00 · LATE JULY", head: "LOAD-IN",         body: "Tech rehearsals, first press calls, programme drops citywide.",       bodyY: 8.204 },
    { x: 4.917, wk: "WK 01",             head: "PREVIEWS",        body: "Work the show in. Small houses. Discounted tickets. Find your ending.", bodyY: 8.204 },
    { x: 8.5,   wk: "WK 02",             head: "REVIEWERS ARRIVE",body: "Critics, industry, producers. The week that sets your run.",           bodyY: 8.525, headH: 0.833 },
    { x: 12.083,wk: "WK 03",             head: "WORD OF MOUTH",   body: "If the show is working, queues start forming. If not, you flyer harder.", bodyY: 8.204, headH: 0.833 },
    { x: 15.667,wk: "WK 04",             head: "AWARDS & EXIT",   body: "Nominations land. Closing nights. Last trains south.",                bodyY: 8.525, headH: 0.833, w: 3.09 },
  ];

  cols.forEach(c => {
    const w = c.w || 3.069;
    addText(s, c.wk, {
      x: c.x, y: 5.833, w, h: 0.276,
      fontSize: 15, charSpacing: 1.8, color: INK,
    });
    addText(s, c.head, {
      x: c.x, y: 6.255, w, h: c.headH || 0.438,
      fontSize: 30, color: INK, charSpacing: -0.6, lineSpacingMultiple: 0.95,
    });
    addText(s, c.body, {
      x: c.x, y: c.bodyY, w, h: 1.004,
      fontSize: 16.5, color: INK, lineSpacingMultiple: 1.4,
    });
  });

  // Footer
  addText(s, "25 DAYS, ROUGHLY", {
    x: 1.042, y: 9.948, w: 2.693, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });
  addText(s, "04 / 10", {
    x: 18.065, y: 9.948, w: 0.977, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });
}

// =====================================================================
// SLIDE 5 — THE VENUE GAME (cream + 4 tier cards)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  addText(s, "05 · THE VENUE GAME", {
    x: 1.042, y: 1.042, w: 3.397, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });
  addText(s, "WHERE YOU END UP MATTERS", {
    x: 14.822, y: 1.042, w: 4.26, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });

  addText(s, [
    run("THE VENUE ", { fontSize: 150, bold: true,   color: INK, charSpacing: -4.5 }),
    run("GAME.",      { fontSize: 150, italic: true, color: INK, charSpacing: -4.5 }),
  ], {
    x: 1.042, y: 1.719, w: 11.702, h: 3.719,
    lineSpacingMultiple: 0.88, fit: "shrink",
  });

  addText(s,
    "Four rough tiers. Where you sit changes your audience, your split, and your press.",
    {
      x: 13.379, y: 3.833, w: 5.579, h: 1.604,
      fontSize: 30, italic: true, color: INK, align: "right",
      lineSpacingMultiple: 1.25,
    }
  );

  // Four tier cards: black / yellow / black / red
  const tiers = [
    { x: 1.042,  bg: INK,    fg: CREAM, label: "TIER 01", head: "THE BIG FOUR",      headH: 0.477, bodyY: 9.279, body: "Pleasance · Underbelly · Assembly · Gilded Balloon. Curated. Competitive. Expensive. Industry eyes.", bodyH: 1.325 },
    { x: 5.583,  bg: YELLOW, fg: INK,   label: "TIER 02", head: "MID-TIER CURATED",  headH: 0.912, bodyY: 9.6,   body: "Summerhall, Monkey Barrel, ZOO. Taste-making. Lower cost. Strong artist support.", bodyH: 1.004 },
    { x: 10.125, bg: INK,    fg: CREAM, label: "TIER 03", head: "FREE FRINGE",       headH: 0.477, bodyY: 9.6,   body: "Pay nothing to play; audiences pay what they can. Built careers in comedy for two decades.", bodyH: 1.004 },
    { x: 14.667, bg: RED,    fg: CREAM, label: "TIER 04", head: "SELF-PRODUCED",     headH: 0.912, bodyY: 9.921, body: "A pub back room. A church hall. A van. Highest risk, highest control.", bodyH: 0.683 },
  ];

  tiers.forEach(t => {
    rect(s, t.x, 5.396, 4.292, 5.5, t.bg);
    addText(s, t.label, {
      x: t.x + 0.333, y: 5.729, w: 3.734, h: 0.276,
      fontSize: 15, charSpacing: 1.5, color: t.fg,
    });
    addText(s, t.head, {
      x: t.x + 0.333, y: 6.151, w: 3.734, h: t.headH,
      fontSize: 33, color: t.fg, charSpacing: -0.66, lineSpacingMultiple: 0.95,
    });
    addText(s, t.body, {
      x: t.x + 0.333, y: t.bodyY, w: 3.734, h: t.bodyH,
      fontSize: 16.5, color: t.fg, lineSpacingMultiple: 1.4,
    });
  });

  // Footer
  addText(s, "CHOOSE BEFORE YOU BOOK FLIGHTS", {
    x: 1.042, y: 11.312, w: 5.292, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });
  addText(s, "05 / 10", {
    x: 18.065, y: 11.312, w: 0.977, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });
}

// =====================================================================
// SLIDE 6 — AN HONEST LEDGER (yellow)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: YELLOW };

  addText(s, "06 · THE ECONOMICS", {
    x: 1.042, y: 1.042, w: 3.25, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });
  addText(s, "BUDGET HONESTLY", {
    x: 16.313, y: 1.042, w: 2.729, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });

  addText(s, [
    run("AN HONEST ", { fontSize: 180, color: INK, charSpacing: -7.2 }),
    run("LEDGER.",    { fontSize: 180, color: INK, charSpacing: -7.2, italic: true }),
  ], {
    x: 1.042, y: 1.719, w: 18.454, h: 4.307,
    lineSpacingMultiple: 0.85, fit: "shrink",
  });

  // Ledger grid dividers
  rect(s, 1.042, 6.028, 17.917, 0.031, INK);     // top horizontal
  rect(s, 1.042, 6.973, 8.958,  0.021, INK);     // row 1 bottom (left)
  rect(s, 10.0,  6.973, 8.958,  0.021, INK);     // row 1 bottom (right)
  rect(s, 1.042, 7.907, 8.958,  0.021, INK);     // row 2 bottom (left)
  rect(s, 10.0,  7.907, 8.958,  0.021, INK);     // row 2 bottom (right)
  rect(s, 1.042, 8.842, 8.958,  0.021, INK);     // row 3 bottom (left)
  rect(s, 10.0,  8.842, 8.958,  0.021, INK);     // row 3 bottom (right)
  rect(s, 9.969, 6.06,  0.031,  0.934, INK);     // vertical middle (row 1)
  rect(s, 9.969, 6.994, 0.031,  0.934, INK);     // vertical middle (row 2)
  rect(s, 9.969, 7.928, 0.031,  0.934, INK);     // vertical middle (row 3)

  // Row data — label (left) / value (right)
  const rows = [
    { y: 6.351, vy: 6.372, lLeft: "FRINGE REGISTRATION",   vLeft:  "Flat Fee / Per Show",         lRight: "VENUE HIRE OR SPLIT", vRight: "Fixed Rent · or 40/60 Door" },
    { y: 7.286, vy: 7.306, lLeft: "ACCOMMODATION · AUGUST", vLeft: "3× — 5× Normal Rate",         lRight: "PRINT & FLYERS",      vRight: "Posters · Handbills · Socials" },
    { y: 8.22,  vy: 8.241, lLeft: "TRAVEL & PER DIEMS",    vLeft:  "Company of 3–5",              lRight: "PR / PUBLICIST",      vRight: "Optional · Often Decisive" },
  ];
  rows.forEach(r => {
    addText(s, r.lLeft, {
      x: 1.458, y: r.y, w: 4.663, h: 0.359,
      fontSize: 21, bold: true, color: INK, charSpacing: -0.11,
    });
    addText(s, r.vLeft, {
      x: 6.222, y: r.vy, w: 3.33, h: 0.351,
      fontSize: 16.5, color: INK, align: "right", lineSpacingMultiple: 1.35,
    });
    addText(s, r.lRight, {
      x: 10.417, y: r.y, w: 4.681, h: 0.359,
      fontSize: 21, bold: true, color: INK, charSpacing: -0.11,
    });
    addText(s, r.vRight, {
      x: 15.198, y: r.vy, w: 3.344, h: 0.351,
      fontSize: 16.5, color: INK, align: "right", lineSpacingMultiple: 1.35,
    });
  });

  // Closing italic line
  addText(s,
    "Most first-time Fringe companies do not break even. They leave with a show, a reel, and a network. Plan accordingly.",
    {
      x: 1.458, y: 9.154, w: 17.621, h: 0.502,
      fontSize: 25.5, italic: true, color: INK, lineSpacingMultiple: 1.3,
    }
  );

  // Footer
  addText(s, "GO IN EYES OPEN", {
    x: 1.042, y: 9.948, w: 2.533, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });
  addText(s, "06 / 10", {
    x: 18.065, y: 9.948, w: 0.977, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });
}

// =====================================================================
// SLIDE 7 — STARS, AND STARDUST (cream + review cards)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  addText(s, "07 · THE REVIEW CYCLE", {
    x: 1.042, y: 1.042, w: 3.663, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });
  addText(s, "STARS MATTER — TO A POINT", {
    x: 14.913, y: 1.042, w: 4.166, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });

  addText(s, [
    run("STARS, AND ", { fontSize: 135, bold: true,                color: INK, charSpacing: -4.05 }),
    run("STARDUST.",   { fontSize: 135, bold: true, italic: true,  color: INK, charSpacing: -4.05 }),
  ], {
    x: 1.042, y: 1.927, w: 10.066, h: 4.992,
    lineSpacingMultiple: 0.88, fit: "shrink",
  });

  addText(s,
    "A four-star review from the right outlet in week two can fill your run. A two-star review can end it. Most shows live in between, and survive on word of mouth.",
    {
      x: 1.042, y: 7.21, w: 7.725, h: 2.125,
      fontSize: 30, italic: true, color: INK, lineSpacingMultiple: 1.25,
    }
  );

  // "4 out of 5 stars" squares below the paragraph
  rect(s, 1.042, 9.71, 0.667, 0.667, INK);
  rect(s, 1.833, 9.71, 0.667, 0.667, INK);
  rect(s, 2.625, 9.71, 0.667, 0.667, INK);
  rect(s, 3.417, 9.71, 0.667, 0.667, INK);
  rect(s, 4.208, 9.71, 0.667, 0.667, MUTE2);   // 5th, muted

  // --- REVIEW CARD 1 (yellow, 5 stars) ---
  rect(s, 11.647, 1.927, 7.311, 2.156, YELLOW);
  [0, 1, 2, 3, 4].forEach(i => {
    rect(s, 11.981 + i * 0.292, 2.219, 0.229, 0.229, INK);
  });
  addText(s,
    "\u201CThe sort of hour that makes you remember why you came up here in the first place.\u201D",
    {
      x: 11.981, y: 2.573, w: 6.844, h: 0.875,
      fontSize: 24, italic: true, color: INK, lineSpacingMultiple: 1.25,
    }
  );
  addText(s, "— BROADSHEET, WK 02", {
    x: 11.981, y: 3.573, w: 6.844, h: 0.26,
    fontSize: 13.5, charSpacing: 1.35, color: INK,
  });

  // --- REVIEW CARD 2 (black, 4 stars cream) ---
  rect(s, 11.647, 4.292, 7.311, 1.74, INK);
  [0, 1, 2, 3].forEach(i => {
    rect(s, 11.981 + i * 0.292, 4.583, 0.229, 0.229, CREAM);
  });
  addText(s,
    "\u201CRagged at the edges, but the voice is unmistakable.\u201D",
    {
      x: 11.981, y: 4.938, w: 6.844, h: 0.458,
      fontSize: 24, italic: true, color: CREAM, lineSpacingMultiple: 1.25,
    }
  );
  addText(s, "— INDUSTRY TRADE", {
    x: 11.981, y: 5.521, w: 6.844, h: 0.26,
    fontSize: 13.5, charSpacing: 1.35, color: CREAM,
  });

  // --- REVIEW CARD 3 (yellow, 3 stars) ---
  rect(s, 11.647, 6.24, 7.311, 2.156, YELLOW);
  [0, 1, 2].forEach(i => {
    rect(s, 11.981 + i * 0.292, 6.531, 0.229, 0.229, INK);
  });
  addText(s,
    "\u201CA show in search of its final ten minutes — and nearly there.\u201D",
    {
      x: 11.981, y: 6.885, w: 6.844, h: 0.875,
      fontSize: 24, italic: true, color: INK, lineSpacingMultiple: 1.25,
    }
  );
  addText(s, "— WEEKLY LISTINGS", {
    x: 11.981, y: 7.885, w: 6.844, h: 0.26,
    fontSize: 13.5, charSpacing: 1.35, color: INK,
  });

  // Footer
  addText(s, "READ THEM ONCE. KEEP PLAYING.", {
    x: 1.042, y: 10.71, w: 4.848, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });
  addText(s, "07 / 10", {
    x: 18.065, y: 10.71, w: 0.977, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });
}

// =====================================================================
// SLIDE 8 — FOUR HOURS (black w/ red rotated strip)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: INK };

  addText(s, "08 · THE FLYERING HOURS", {
    x: 1.042, y: 1.042, w: 4.017, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: CREAM,
  });
  addText(s, "THE UNGLAMOROUS PART", {
    x: 15.412, y: 1.042, w: 3.653, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: CREAM,
  });

  // "FOUR HOURS." headline
  addText(s, [
    run("FOUR ",  { fontSize: 270, color: YELLOW, charSpacing: -10.8 }),
    run("HOURS.", { fontSize: 270, color: CREAM, charSpacing: -10.8, italic: true }),
  ], {
    x: 1.042, y: 1.343, w: 18.454, h: 6.212,
    lineSpacingMultiple: 0.82, fit: "shrink",
  });

  // Red rotated strip across the middle
  s.addShape(pres.ShapeType.rect, {
    x: -1.0, y: 5.4, w: 22.0, h: 1.01,
    fill: { color: RED },
    line: { type: "none" },
    rotate: -4,
  });
  // Rotated repeated caption text
  addText(s,
    "PLACEHOLDER",
    {
      x: -1.0, y: 5.546, w: 22.66, h: 0.76,
      fontSize: 34.5, charSpacing: 2.07, color: CREAM,
      rotate: -4,
    }
  );

  // Body paragraph (with bold inline)
  addText(s, [
    run("Every afternoon on the Royal Mile, in the rain, with ", { fontSize: 25.5, color: CREAM }),
    run("a stack of flyers ", { fontSize: 25.5, color: INK, bold: true }),
    run("and a one-sentence pitch. This is where most of your audience actually comes from — not from the reviews, not from the app.", { fontSize: 25.5, color: CREAM }),
  ], {
    x: 1.042, y: 7.93, w: 11.802, h: 1.476,
    lineSpacingMultiple: 1.35,
  });

  // Footer
  addText(s, "WEAR COMFORTABLE SHOES", {
    x: 1.042, y: 9.948, w: 4.064, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: CREAM,
  });
  addText(s, "08 / 10", {
    x: 18.065, y: 9.948, w: 0.977, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: CREAM,
  });
}

// =====================================================================
// SLIDE 9 — WHAT YOU LEAVE WITH (cream + 3 returns, middle black)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  addText(s, "09 · WHAT YOU LEAVE WITH", {
    x: 1.042, y: 1.042, w: 4.155, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });
  addText(s, "THE REAL RETURN", {
    x: 16.415, y: 1.042, w: 2.627, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });

  addText(s, [
    run("WHAT YOU LEAVE ", { fontSize: 112.5, color: INK, charSpacing: -3.37 }),
    run("WITH.",           { fontSize: 112.5, color: INK, charSpacing: -3.37, italic: true }),
  ], {
    x: 1.042, y: 1.719, w: 18.454, h: 1.427,
    lineSpacingMultiple: 0.88, fit: "shrink",
  });

  // Horizontal rule
  rect(s, 1.042, 4.75, 17.917, 0.031, INK);

  // Center black block
  rect(s, 7.014, 4.781, 5.972, 4.75, INK);

  // Vertical dividers
  rect(s, 6.993,  4.781, 0.021, 4.75, INK);
  rect(s, 12.965, 4.781, 0.021, 4.75, INK);

  // Columns
  const returns = [
    { x: 1.417,  fg: INK,   label: "→ 01", head: "A SHOW THAT WORKS",  headH: 1.071, body: "Twenty-odd performances in front of strangers will find every soft spot in the writing. You leave with a tighter hour." },
    { x: 7.389,  fg: CREAM, label: "→ 02", head: "A ROOM OF PEERS",    headH: 0.556, body: "Other companies, producers, programmers, agents. Relationships that don't exist in your home city exist here by week two." },
    { x: 13.361, fg: INK,   label: "→ 03", head: "A NEXT BOOKING",     headH: 0.556, body: "The tour, the commission, the London transfer. Rarely the headline outcome — often the quiet one that pays for the year." },
  ];

  returns.forEach((r, idx) => {
    const w = idx === 2 ? 5.379 : 5.357;
    addText(s, r.label, {
      x: r.x, y: 5.198, w, h: 0.302,
      fontSize: 16.5, charSpacing: 1.65, color: r.fg,
    });
    addText(s, r.head, {
      x: r.x, y: 5.667, w, h: r.headH,
      fontSize: 39, color: r.fg, charSpacing: -0.78, lineSpacingMultiple: 0.95,
    });
    addText(s, r.body, {
      x: r.x, y: 8.106, w, h: 1.091,
      fontSize: 18, color: r.fg, lineSpacingMultiple: 1.4,
    });
  });

  // Footer
  addText(s, "COUNT THE SOFT RETURNS", {
    x: 1.042, y: 9.948, w: 3.889, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });
  addText(s, "09 / 10", {
    x: 18.065, y: 9.948, w: 0.977, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });
}

// =====================================================================
// SLIDE 10 — GO. (yellow)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: YELLOW };

  addText(s, "10 · GO", {
    x: 1.042, y: 1.042, w: 1.362, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });
  addText(s, "SEE YOU IN AUGUST", {
    x: 16.177, y: 1.042, w: 2.864, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });

  // "GO." headline — huge
  addText(s, "GO.", {
    x: 1.042, y: 1.302, w: 18.454, h: 7.046,
    fontSize: 400, color: INK, charSpacing: -20,
    lineSpacingMultiple: 1.26, fit: "shrink",
  });

  addText(s,
    "Book the venue. Write the show. Print the flyers. Get on the train.",
    {
      x: 1.042, y: 8.64, w: 6.886, h: 1.6,
      fontSize: 42, italic: true, color: INK, lineSpacingMultiple: 1.05,
    }
  );

  // Tilted "EDINBURGH · AUGUST" bordered badge
  rectStroke(s, 14.665, 8.88, 4.292, 0.802, INK, 3, -4);
  addText(s, "EDINBURGH · AUGUST", {
    x: 14.998, y: 9.109, w: 3.754, h: 0.385,
    fontSize: 21, charSpacing: 1.68, color: INK, rotate: -4,
  });

  // Footer rule + labels
  rect(s, 1.042, 10.339, 17.917, 0.021, INK);
  addText(s, "A PRIMER FOR PERFORMERS", {
    x: 1.042, y: 10.61, w: 4.074, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });
  addText(s, "10 / 10", {
    x: 18.065, y: 10.61, w: 0.977, h: 0.302,
    fontSize: 16.5, charSpacing: 1.98, color: INK,
  });
}

// ---------- Write ----------
pres.writeFile({ fileName: "fringe.pptx" })
  .then(name => console.log("Wrote", name));
