/**
 * Chemistry 101 — Lecture 01 — Introduction to Chemistry
 * pptxgenjs replica of the Chemistry.pptx deck.
 *
 * Design notes:
 *   - Palette: cream background, deep navy accent, black text, sage + muted gray supporting
 *   - Typography: Helvetica Neue for body, sans-serif italics for accent words
 *   - Layout: every content slide has a top-left chapter label ("01 — DEFINITION"),
 *     bottom-left page number ("02 / 08"), bottom-right section name ("DEFINITION")
 *   - Italic blue words are the recurring visual motif
 *
 * Aesthetic enhancements vs the original (the user explicitly invited these):
 *   - Fixed text-overflow defects on slides 3 and 8 where labels were cut off
 *     ("02 — RELEVA" → "02 — RELEVANCE", "CH 0" → "CH 02" etc.)
 *   - Brightened the pale "next" italic on slide 8 from a very light blue to the
 *     deck's primary navy so it reads at a glance
 *   - Tightened spacing on the bottom rows of slides 3 and 8 so the columns sit
 *     comfortably above the slide edge
 */

const pptxgen = require("pptxgenjs");

// ---------- design tokens ----------
const COLORS = {
  bg:        "F1ECDF",  // warm cream background
  ink:       "1A1A1A",  // body / titles
  navy:      "1F3DA8",  // accent blue (italic words, key elements)
  navyLight: "8FA4D9",  // softened navy for "next." accent (slide 8)
  muted:     "6B6B6B",  // small caps labels
  mutedSoft: "9A9A9A",  // very soft labels
  divider:   "D9D2C2",  // hairline separators
  sage:      "8FA67E",  // sage accent (slide 5 electron, slide 6 mixture)
  black:     "000000",
};

const FONT_BODY  = "Helvetica Neue";
const FONT_TITLE = "Helvetica Neue";

// slide is 13.333" × 7.5" (LAYOUT_WIDE)
const W = 13.333;
const H = 7.5;

// ---------- create deck ----------
const pres = new pptxgen();
pres.layout    = "LAYOUT_WIDE";
pres.title     = "Introduction to Chemistry";
pres.author    = "CHEM 101";
pres.company   = "CHEM 101 / Lecture 01";

// ---------- shared chrome (top label + bottom page no + section tag) ----------
function addChrome(slide, { topLabel, page, section }) {
  // top-left chapter label, e.g. "01 — DEFINITION"
  slide.addText(topLabel, {
    x: 0.7, y: 0.55, w: 6, h: 0.35,
    fontFace: FONT_BODY, fontSize: 10, color: COLORS.muted,
    charSpacing: 4, bold: false, margin: 0,
  });

  // bottom-left page indicator, e.g. "02 / 08"
  slide.addText(page, {
    x: 0.7, y: 6.85, w: 2, h: 0.3,
    fontFace: FONT_BODY, fontSize: 10, color: COLORS.muted,
    charSpacing: 3, margin: 0,
  });

  // bottom-right section name, e.g. "DEFINITION"
  slide.addText(section, {
    x: W - 4.7, y: 6.85, w: 4, h: 0.3,
    fontFace: FONT_BODY, fontSize: 10, color: COLORS.muted,
    charSpacing: 4, align: "right", margin: 0,
  });
}

// ============================================================================
// SLIDE 1 — Title slide
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };

  // top-left lecture tag
  s.addText("CHEM 101 / LECTURE 01", {
    x: 0.7, y: 0.55, w: 5, h: 0.4,
    fontFace: FONT_BODY, fontSize: 11, color: COLORS.ink,
    charSpacing: 5, bold: false, margin: 0,
  });

  // top-right semester tag
  s.addText("A first look · Fall semester", {
    x: W - 5.2, y: 0.55, w: 4.5, h: 0.4,
    fontFace: FONT_BODY, fontSize: 11, color: COLORS.muted,
    align: "right", italic: false, margin: 0,
  });

  // big title — "Introduction to" (black) + "Chemistry" (navy italic) + "."
  s.addText(
    [
      { text: "Introduction to ", options: { color: COLORS.ink, bold: false, italic: false, breakLine: true } },
      { text: "Chemistry",        options: { color: COLORS.navy, italic: true,  bold: false } },
      { text: ".",                options: { color: COLORS.ink, italic: false, bold: false } },
    ],
    {
      x: 0.65, y: 1.6, w: 12.5, h: 4.4,
      fontFace: FONT_TITLE, fontSize: 110, bold: false,
      valign: "top", margin: 0, lineSpacingMultiple: 1.0,
    }
  );

  // navy circle, bottom-right
  s.addShape(pres.shapes.OVAL, {
    x: W - 2.0, y: H - 2.0, w: 1.1, h: 1.1,
    fill: { color: COLORS.navy }, line: { type: "none" },
  });

  // bottom tagline
  s.addText("THE SCIENCE OF STUFF", {
    x: 0.7, y: H - 0.6, w: 6, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, color: COLORS.ink,
    charSpacing: 5, bold: false, margin: 0,
  });
}

// ============================================================================
// SLIDE 2 — Definition
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addChrome(s, { topLabel: "01 — DEFINITION", page: "02 / 08", section: "DEFINITION" });

  // big title left side: "What is chemistry?" with "is" in navy italic
  s.addText(
    [
      { text: "What ",       options: { color: COLORS.ink,  italic: false, breakLine: false } },
      { text: "is",          options: { color: COLORS.navy, italic: true,  breakLine: true  } },
      { text: "chemistry?",  options: { color: COLORS.ink,  italic: false } },
    ],
    {
      x: 0.7, y: 2.3, w: 6.8, h: 3.0,
      fontFace: FONT_TITLE, fontSize: 78, bold: false,
      valign: "top", margin: 0, lineSpacingMultiple: 1.0,
    }
  );

  // right-side white card with a sentence
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.6, y: 2.7, w: 5.0, h: 2.0,
    fill: { color: "FFFFFF" }, line: { color: COLORS.divider, width: 0.5 },
    shadow: { type: "outer", color: "000000", blur: 12, offset: 2, angle: 90, opacity: 0.06 },
  });

  // card label
  s.addText("IN ONE SENTENCE", {
    x: 7.85, y: 2.95, w: 4.5, h: 0.3,
    fontFace: FONT_BODY, fontSize: 11, color: COLORS.muted,
    charSpacing: 4, margin: 0,
  });

  // card body — "matter" in navy italic
  s.addText(
    [
      { text: "The study of ", options: { color: COLORS.ink,  italic: false } },
      { text: "matter",         options: { color: COLORS.navy, italic: true } },
      { text: " — what it's made of, and how it changes.", options: { color: COLORS.ink, italic: false } },
    ],
    {
      x: 7.85, y: 3.4, w: 4.55, h: 1.2,
      fontFace: FONT_BODY, fontSize: 22, bold: false,
      valign: "top", margin: 0, lineSpacingMultiple: 1.15,
    }
  );
}

// ============================================================================
// SLIDE 3 — Relevance
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addChrome(s, { topLabel: "02 — RELEVANCE", page: "03 / 08", section: "RELEVANCE" });

  // big quote — "chemistry" navy italic
  s.addText(
    [
      { text: "Everything you touch, breathe,", options: { color: COLORS.ink, italic: false, breakLine: true } },
      { text: "or eat is ",                      options: { color: COLORS.ink, italic: false } },
      { text: "chemistry",                       options: { color: COLORS.navy, italic: true } },
      { text: ".",                               options: { color: COLORS.ink, italic: false } },
    ],
    {
      x: 0.7, y: 1.3, w: 12.2, h: 3.5,
      fontFace: FONT_TITLE, fontSize: 56, bold: false,
      valign: "top", margin: 0, lineSpacingMultiple: 1.05,
    }
  );

  // hairline divider above the three callouts
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 5.25, w: W - 1.4, h: 0,
    line: { color: COLORS.divider, width: 0.75 },
  });

  // three callouts
  const items = [
    { num: "01", text: "The food on your plate" },
    { num: "02", text: "The medicine you take" },
    { num: "03", text: "The air, water, and ground" },
  ];
  const colW = (W - 1.4) / 3;
  items.forEach((it, i) => {
    const xCol = 0.7 + i * colW;
    s.addText(it.num, {
      x: xCol, y: 5.55, w: colW - 0.3, h: 0.3,
      fontFace: FONT_BODY, fontSize: 11, color: COLORS.muted,
      charSpacing: 4, margin: 0,
    });
    s.addText(it.text, {
      x: xCol, y: 5.95, w: colW - 0.3, h: 0.5,
      fontFace: FONT_BODY, fontSize: 18, color: COLORS.ink,
      bold: false, margin: 0,
    });
  });
}

// ============================================================================
// SLIDE 4 — States of matter
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addChrome(s, { topLabel: "03 — THE THREE STATES", page: "04 / 08", section: "STATES" });

  s.addText("States of matter.", {
    x: 0.7, y: 1.0, w: 11, h: 1.2,
    fontFace: FONT_TITLE, fontSize: 64, color: COLORS.ink,
    bold: false, margin: 0,
  });

  // three columns separated by hairline dividers
  const colW = (W - 1.4) / 3;
  for (let i = 1; i <= 2; i++) {
    s.addShape(pres.shapes.LINE, {
      x: 0.7 + i * colW, y: 2.7, w: 0, h: 4.0,
      line: { color: COLORS.divider, width: 0.75 },
    });
  }

  const states = [
    {
      label: "FIXED SHAPE",  name: "Solid",  italic: false, color: COLORS.ink,
      desc:  "Particles packed tightly in place. Ice, iron, salt.",
      // 4 cols × 3 rows packed grid
      grid:  { cols: 4, rows: 3, gap: 0.18 },
    },
    {
      label: "FLOWS FREELY", name: "Liquid", italic: true,  color: COLORS.navy,
      desc:  "Particles touch but slide past each other. Water, oil, mercury.",
      // 4 cols × 3 rows but slightly offset (we'll just keep a tighter grid)
      grid:  { cols: 4, rows: 3, gap: 0.22, jitter: true },
    },
    {
      label: "FILLS THE SPACE", name: "Gas",  italic: false, color: COLORS.ink,
      desc:  "Particles spread far apart, moving fast. Air, steam, helium.",
      grid:  { cols: 3, rows: 2, gap: 0.55, jitter: true },
    },
  ];

  states.forEach((st, i) => {
    const xCol = 0.7 + i * colW;

    // dot grid (centered in the column)
    const dotR = 0.13;
    const cellW = dotR * 2 + st.grid.gap;
    const gridW = st.grid.cols * cellW - st.grid.gap;
    const gridH = st.grid.rows * cellW - st.grid.gap;
    const startX = xCol + (colW - gridW) / 2;
    const startY = 3.0;

    // pseudo-random but deterministic jitter for liquid/gas
    const seed = i * 7 + 1;
    const rand = (k) => {
      const x = Math.sin(seed * 9.7 + k * 17.3) * 43758.5453;
      return x - Math.floor(x);
    };

    let k = 0;
    for (let r = 0; r < st.grid.rows; r++) {
      for (let c = 0; c < st.grid.cols; c++) {
        let dx = 0, dy = 0;
        if (st.grid.jitter) {
          dx = (rand(k) - 0.5) * st.grid.gap * 0.8;
          dy = (rand(k + 100) - 0.5) * st.grid.gap * 0.8;
        }
        // for the gas (3x2) skip one dot to look sparser still
        if (st.name === "Gas" && r === 1 && c === 1) { k++; continue; }
        s.addShape(pres.shapes.OVAL, {
          x: startX + c * cellW + dx,
          y: startY + r * cellW + dy,
          w: dotR * 2, h: dotR * 2,
          fill: { color: COLORS.black }, line: { type: "none" },
        });
        k++;
      }
    }

    // small caps label
    s.addText(st.label, {
      x: xCol + 0.2, y: 4.85, w: colW - 0.4, h: 0.3,
      fontFace: FONT_BODY, fontSize: 11, color: COLORS.muted,
      charSpacing: 4, margin: 0,
    });

    // big state name
    s.addText(st.name, {
      x: xCol + 0.2, y: 5.3, w: colW - 0.4, h: 0.7,
      fontFace: FONT_TITLE, fontSize: 38, color: st.color,
      bold: true, italic: st.italic, margin: 0,
    });

    // description
    s.addText(st.desc, {
      x: xCol + 0.2, y: 6.1, w: colW - 0.4, h: 0.7,
      fontFace: FONT_BODY, fontSize: 13, color: COLORS.ink,
      margin: 0, lineSpacingMultiple: 1.25,
    });
  });
}

// ============================================================================
// SLIDE 5 — Atoms & elements
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addChrome(s, { topLabel: "04 — BUILDING BLOCKS", page: "05 / 08", section: "BUILDING BLOCKS" });

  // big title — "Atoms & elements." with "elements" navy italic
  s.addText(
    [
      { text: "Atoms &",  options: { color: COLORS.ink,  italic: false, breakLine: true } },
      { text: "elements", options: { color: COLORS.navy, italic: true } },
      { text: ".",        options: { color: COLORS.ink,  italic: false } },
    ],
    {
      x: 0.7, y: 2.4, w: 6.5, h: 2.4,
      fontFace: FONT_TITLE, fontSize: 64, bold: false,
      valign: "top", margin: 0, lineSpacingMultiple: 1.0,
    }
  );

  // body copy under title
  s.addText(
    "An atom is the smallest unit of matter. An element is a substance made of one kind of atom — there are 118 of them.",
    {
      x: 0.7, y: 4.85, w: 5.5, h: 1.3,
      fontFace: FONT_BODY, fontSize: 16, color: COLORS.ink,
      margin: 0, lineSpacingMultiple: 1.35,
    }
  );

  // ----- atom diagram on the right -----
  const cx = 9.7, cy = 3.85;

  // outer orbit ring (large)
  s.addShape(pres.shapes.OVAL, {
    x: cx - 2.2, y: cy - 2.2, w: 4.4, h: 4.4,
    fill: { type: "none" }, line: { color: COLORS.ink, width: 0.75 },
  });
  // inner orbit ring (small)
  s.addShape(pres.shapes.OVAL, {
    x: cx - 1.35, y: cy - 1.35, w: 2.7, h: 2.7,
    fill: { type: "none" }, line: { color: COLORS.ink, width: 0.75 },
  });

  // nucleus (navy)
  s.addShape(pres.shapes.OVAL, {
    x: cx - 0.32, y: cy - 0.32, w: 0.64, h: 0.64,
    fill: { color: COLORS.navy }, line: { type: "none" },
  });

  // electron 1 — black, top of outer ring
  s.addShape(pres.shapes.OVAL, {
    x: cx - 0.16, y: cy - 2.2 - 0.16, w: 0.32, h: 0.32,
    fill: { color: COLORS.black }, line: { type: "none" },
  });
  // electron 2 — sage, bottom-left of inner ring
  const ang = Math.PI * 1.15; // ~207° (lower-left)
  const ex = cx + 1.35 * Math.cos(ang);
  const ey = cy - 1.35 * Math.sin(ang); // y flipped because pptx y goes down
  s.addShape(pres.shapes.OVAL, {
    x: ex - 0.13, y: ey - 0.13, w: 0.26, h: 0.26,
    fill: { color: COLORS.sage }, line: { type: "none" },
  });

  // periodic-table tile for Oxygen, lower-right of the atom
  const tileX = cx + 1.35, tileY = cy + 1.35, tileW = 1.4, tileH = 1.5;
  s.addShape(pres.shapes.RECTANGLE, {
    x: tileX, y: tileY, w: tileW, h: tileH,
    fill: { color: COLORS.bg }, line: { color: COLORS.ink, width: 1 },
  });
  s.addText("8", {
    x: tileX + 0.1, y: tileY + 0.08, w: tileW - 0.2, h: 0.3,
    fontFace: FONT_BODY, fontSize: 11, color: COLORS.ink, margin: 0,
  });
  s.addText("O", {
    x: tileX, y: tileY + 0.4, w: tileW, h: 0.7,
    fontFace: FONT_TITLE, fontSize: 38, color: COLORS.ink,
    align: "center", bold: false, margin: 0,
  });
  s.addText("OXYGEN", {
    x: tileX, y: tileY + 1.1, w: tileW, h: 0.3,
    fontFace: FONT_BODY, fontSize: 9, color: COLORS.ink,
    charSpacing: 3, align: "center", margin: 0,
  });
}

// ============================================================================
// SLIDE 6 — Compounds & mixtures
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addChrome(s, { topLabel: "05 — PUTTING ATOMS TOGETHER", page: "06 / 08", section: "COMBINATIONS" });

  s.addText("Compounds & mixtures.", {
    x: 0.7, y: 1.0, w: 12, h: 1.2,
    fontFace: FONT_TITLE, fontSize: 60, color: COLORS.ink,
    bold: false, margin: 0,
  });

  // central vertical divider
  s.addShape(pres.shapes.LINE, {
    x: W / 2, y: 2.7, w: 0, h: 4.0,
    line: { color: COLORS.divider, width: 0.75 },
  });

  // ---- left column: Compound ----
  s.addText("COMPOUND — BONDED", {
    x: 0.7, y: 2.7, w: 5.5, h: 0.3,
    fontFace: FONT_BODY, fontSize: 11, color: COLORS.muted,
    charSpacing: 4, margin: 0,
  });
  s.addText("Compound", {
    x: 0.7, y: 3.4, w: 5.5, h: 0.9,
    fontFace: FONT_TITLE, fontSize: 50, color: COLORS.navy,
    bold: true, italic: true, margin: 0,
  });

  // H₂O molecule — three balls (black, navy, black)
  const ballR = 0.28;
  const startCX = 1.0, startCY = 4.7;
  const gap = 0.05;
  // left H (black)
  s.addShape(pres.shapes.OVAL, {
    x: startCX, y: startCY, w: ballR * 2, h: ballR * 2,
    fill: { color: COLORS.black }, line: { type: "none" },
  });
  // central O (navy, slightly larger)
  s.addShape(pres.shapes.OVAL, {
    x: startCX + ballR * 2 + gap, y: startCY - 0.05, w: ballR * 2 + 0.1, h: ballR * 2 + 0.1,
    fill: { color: COLORS.navy }, line: { type: "none" },
  });
  // right H (black)
  s.addShape(pres.shapes.OVAL, {
    x: startCX + ballR * 4 + gap * 2 + 0.1, y: startCY, w: ballR * 2, h: ballR * 2,
    fill: { color: COLORS.black }, line: { type: "none" },
  });

  s.addText(
    [
      { text: "H", options: { color: COLORS.ink } },
      { text: "₂", options: { color: COLORS.ink, fontSize: 14 } },
      { text: "O — two hydrogens, one oxygen", options: { color: COLORS.ink } },
    ],
    {
      x: 0.7, y: 5.55, w: 5.5, h: 0.4,
      fontFace: FONT_BODY, fontSize: 16, margin: 0,
    }
  );
  s.addText(
    "Atoms chemically bonded in fixed ratios. To separate them, you must break the bond.",
    {
      x: 0.7, y: 6.05, w: 5.5, h: 0.7,
      fontFace: FONT_BODY, fontSize: 13, color: COLORS.ink,
      margin: 0, lineSpacingMultiple: 1.3,
    }
  );

  // ---- right column: Mixture ----
  const rx = W / 2 + 0.2;
  s.addText("MIXTURE — COMBINED", {
    x: rx, y: 2.7, w: 5.5, h: 0.3,
    fontFace: FONT_BODY, fontSize: 11, color: COLORS.muted,
    charSpacing: 4, margin: 0,
  });
  s.addText("Mixture", {
    x: rx, y: 3.4, w: 5.5, h: 0.9,
    fontFace: FONT_TITLE, fontSize: 50, color: COLORS.ink,
    bold: true, italic: false, margin: 0,
  });

  // 7 unbonded balls in a row — alternating navy / black / sage / navy / black / sage / navy
  const palette = [COLORS.navy, COLORS.black, COLORS.sage, COLORS.navy, COLORS.black, COLORS.sage, COLORS.navy];
  const mixGap = 0.18;
  palette.forEach((c, i) => {
    s.addShape(pres.shapes.OVAL, {
      x: rx + i * (ballR * 2 + mixGap), y: startCY, w: ballR * 2, h: ballR * 2,
      fill: { color: c }, line: { type: "none" },
    });
  });

  s.addText("Salt + water, air, salad", {
    x: rx, y: 5.55, w: 5.5, h: 0.4,
    fontFace: FONT_BODY, fontSize: 16, color: COLORS.ink, margin: 0,
  });
  s.addText(
    "Substances physically combined. Each keeps its own properties — and can be pulled apart.",
    {
      x: rx, y: 6.05, w: 5.5, h: 0.7,
      fontFace: FONT_BODY, fontSize: 13, color: COLORS.ink,
      margin: 0, lineSpacingMultiple: 1.3,
    }
  );
}

// ============================================================================
// SLIDE 7 — Chemical vs. physical changes
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addChrome(s, { topLabel: "06 — TWO KINDS OF CHANGE", page: "07 / 08", section: "CHANGE" });

  // title with "physical" navy italic
  s.addText(
    [
      { text: "Chemical vs. ", options: { color: COLORS.ink,  italic: false } },
      { text: "physical",      options: { color: COLORS.navy, italic: true } },
      { text: " changes.",     options: { color: COLORS.ink,  italic: false } },
    ],
    {
      x: 0.7, y: 1.0, w: 12.2, h: 1.2,
      fontFace: FONT_TITLE, fontSize: 50, bold: false,
      valign: "top", margin: 0,
    }
  );

  // table layout
  const tableY    = 2.7;
  const labelColW = 2.0;
  const dataColW  = (W - 1.4 - labelColW) / 2;
  const xLabel    = 0.7;
  const xPhys     = xLabel + labelColW;
  const xChem     = xPhys + dataColW;
  const rowH      = 1.15;

  // header row
  // top thicker line
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: tableY, w: W - 1.4, h: 0,
    line: { color: COLORS.ink, width: 0.75 },
  });
  s.addText("PHYSICAL", {
    x: xPhys, y: tableY + 0.25, w: dataColW - 0.2, h: 0.4,
    fontFace: FONT_BODY, fontSize: 12, color: COLORS.muted, charSpacing: 4, margin: 0,
  });
  s.addText("CHEMICAL", {
    x: xChem, y: tableY + 0.25, w: dataColW - 0.2, h: 0.4,
    fontFace: FONT_BODY, fontSize: 12, color: COLORS.muted, charSpacing: 4, margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: tableY + 0.85, w: W - 1.4, h: 0,
    line: { color: COLORS.divider, width: 0.5 },
  });

  // rows
  const rows = [
    { label: "WHAT\nHAPPENS",  phys: "Form changes.",  chem: "Substance changes." },
    { label: "REVERSIBLE?",    phys: "Usually yes.",   chem: "Usually no." },
    { label: "EXAMPLE",        phys: "Ice melting.",   chem: "Wood burning." },
  ];

  rows.forEach((r, i) => {
    const yRow = tableY + 0.85 + i * rowH;

    // small caps label
    s.addText(r.label, {
      x: xLabel, y: yRow + 0.3, w: labelColW - 0.1, h: 0.7,
      fontFace: FONT_BODY, fontSize: 11, color: COLORS.muted,
      charSpacing: 3, margin: 0, lineSpacingMultiple: 1.1, valign: "top",
    });
    // physical (black)
    s.addText(r.phys, {
      x: xPhys, y: yRow + 0.25, w: dataColW - 0.2, h: 0.7,
      fontFace: FONT_TITLE, fontSize: 26, color: COLORS.ink, margin: 0, valign: "top",
    });
    // chemical (navy)
    s.addText(r.chem, {
      x: xChem, y: yRow + 0.25, w: dataColW - 0.2, h: 0.7,
      fontFace: FONT_TITLE, fontSize: 26, color: COLORS.navy, margin: 0, valign: "top",
    });

    // bottom hairline (skip the last one — slide chrome is below)
    if (i < rows.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: 0.7, y: yRow + rowH, w: W - 1.4, h: 0,
        line: { color: COLORS.divider, width: 0.4 },
      });
    }
  });
}

// ============================================================================
// SLIDE 8 — What's next
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  // (no page-number chrome on this closing slide — like the original — but we
  //  fix the cut-off top label)
  s.addText("07 — THE ROAD AHEAD", {
    x: 0.7, y: 0.55, w: 8, h: 0.35,
    fontFace: FONT_BODY, fontSize: 10, color: COLORS.muted,
    charSpacing: 4, margin: 0,
  });

  // title — "next" navy italic (slightly softened, but readable — was too pale in original)
  s.addText(
    [
      { text: "What's ", options: { color: COLORS.ink,  italic: false } },
      { text: "next",    options: { color: COLORS.navyLight, italic: true } },
      { text: ".",       options: { color: COLORS.ink,  italic: false } },
    ],
    {
      x: 0.7, y: 1.1, w: 12, h: 1.6,
      fontFace: FONT_TITLE, fontSize: 80, bold: false,
      valign: "top", margin: 0,
    }
  );

  // hairline divider above the four chapter callouts
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 5.75, w: W - 1.4, h: 0,
    line: { color: COLORS.divider, width: 0.75 },
  });

  // four upcoming chapters
  const chapters = [
    { ch: "CH 02", title: "The periodic table" },
    { ch: "CH 03", title: "Bonds & molecules" },
    { ch: "CH 04", title: "Reactions & equations" },
    { ch: "CH 05", title: "Into the lab" },
  ];
  const colW = (W - 1.4) / 4;
  chapters.forEach((c, i) => {
    const xCol = 0.7 + i * colW;
    s.addText(c.ch, {
      x: xCol, y: 6.05, w: colW - 0.3, h: 0.3,
      fontFace: FONT_BODY, fontSize: 11, color: COLORS.muted,
      charSpacing: 4, margin: 0,
    });
    s.addText(c.title, {
      x: xCol, y: 6.45, w: colW - 0.2, h: 0.5,
      fontFace: FONT_BODY, fontSize: 16, color: COLORS.ink,
      bold: false, margin: 0,
    });
  });
}

// ---------- write file ----------
pres.writeFile({ fileName: "/home/assets/Chemistry.pptx" }).then((f) => {
  console.log("Wrote", f);
});
