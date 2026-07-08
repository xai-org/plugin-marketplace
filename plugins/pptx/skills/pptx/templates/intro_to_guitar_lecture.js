// Intro_to_Guitar replica built with pptxgenjs
// Layout: LAYOUT_WIDE → 13.333 x 7.5 inches
const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333" x 7.5"
pres.title = "An Introduction to Guitar";
pres.author = "Prof. R. Almeida";

// ---- Palette ----
const BG_CREAM   = "F2EFE6";   // warm off-white / bone
const BG_DARK    = "1C1A16";   // near-black warm
const INK        = "1C1A16";   // primary text
const INK_SOFT   = "2A2722";   // body on cream
const MUTED      = "8A857B";   // subdued labels/eyebrows
const DIV_LINE   = "C9C3B5";   // hairline divider
const PANEL      = "E8E2D1";   // slightly darker panel on cream
const PANEL_LINE = "D4CDB8";   // panel border
const CREAM_ON_DARK = "EFECE2";

// ---- Fonts ----
const F_TITLE = "Georgia";     // serif italic big titles
const F_BODY  = "Calibri";     // body
const F_SANS  = "Calibri";

// ---- Slide dimensions ----
const W = 13.333;
const H = 7.5;

// ---- Helpers ----
function addEyebrow(slide, leftText, rightText, color = MUTED) {
  slide.addText(leftText, {
    x: 0.6, y: 0.45, w: 7, h: 0.35,
    fontFace: F_SANS, fontSize: 11, color, charSpacing: 4, bold: false,
    margin: 0,
  });
  if (rightText) {
    slide.addText(rightText, {
      x: W - 7.6, y: 0.45, w: 7, h: 0.35,
      fontFace: F_SANS, fontSize: 11, color, charSpacing: 4, align: "right",
      margin: 0,
    });
  }
}

function addFooter(slide, pageStr, color = MUTED) {
  slide.addText("An Introduction to Guitar", {
    x: 0.6, y: H - 0.55, w: 5, h: 0.3,
    fontFace: F_SANS, fontSize: 11, color, margin: 0,
  });
  slide.addText(pageStr, {
    x: W - 1.6, y: H - 0.55, w: 1, h: 0.3,
    fontFace: F_SANS, fontSize: 11, color, align: "right", margin: 0,
  });
}

// ====================================================================
// SLIDE 1 – Title / Cover
// ====================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG_CREAM };

  // Dark right panel (roughly 37% of width)
  const panelX = 8.4;
  s.addShape(pres.shapes.RECTANGLE, {
    x: panelX, y: 0, w: W - panelX, h: H,
    fill: { color: BG_DARK }, line: { color: BG_DARK, width: 0 },
  });

  // Eyebrow top-left
  s.addText("MUS 101  ·  LECTURE 01  ·  PROF. R. ALMEIDA", {
    x: 0.6, y: 0.7, w: 7, h: 0.4,
    fontFace: F_SANS, fontSize: 12, color: MUTED, charSpacing: 4, margin: 0,
  });

  // Big italic title
  s.addText("an\nintroduction\nto guitar.", {
    x: 0.6, y: 1.3, w: 7.5, h: 3.8,
    fontFace: F_TITLE, fontSize: 82, italic: true, color: INK,
    lineSpacingMultiple: 1.0, margin: 0,
  });

  // Bottom-left meta: Course / Duration
  s.addText("Course", {
    x: 0.6, y: 6.15, w: 3, h: 0.3,
    fontFace: F_SANS, fontSize: 11, color: MUTED, margin: 0,
  });
  s.addText("Foundations of Popular Music", {
    x: 0.6, y: 6.45, w: 3.6, h: 0.3,
    fontFace: F_SANS, fontSize: 13, color: INK_SOFT, margin: 0,
  });
  s.addText("Duration", {
    x: 3.6, y: 6.15, w: 3, h: 0.3,
    fontFace: F_SANS, fontSize: 11, color: MUTED, margin: 0,
  });
  s.addText("10 slides  ·  50 minutes", {
    x: 3.6, y: 6.45, w: 3.6, h: 0.3,
    fontFace: F_SANS, fontSize: 13, color: INK_SOFT, margin: 0,
  });

  // Decorative staff lines on dark panel
  const staffX = panelX + 0.4;
  const staffW = W - panelX - 0.8;
  const staffY = 1.8;
  for (let i = 0; i < 4; i++) {
    s.addShape(pres.shapes.LINE, {
      x: staffX, y: staffY + i * 0.45, w: staffW, h: 0,
      line: { color: "5A544A", width: 0.75 },
    });
  }

  // Epigraph quote
  s.addText('"Six strings. Twelve notes.\nA lifetime of music."', {
    x: panelX + 0.4, y: 5.6, w: staffW, h: 1.1,
    fontFace: F_TITLE, fontSize: 22, italic: true, color: CREAM_ON_DARK,
    lineSpacingMultiple: 1.15, margin: 0,
  });
  s.addText("— LECTURE EPIGRAPH", {
    x: panelX + 0.4, y: 6.85, w: staffW, h: 0.3,
    fontFace: F_SANS, fontSize: 10, color: "8E887C", charSpacing: 4, margin: 0,
  });
}

// ====================================================================
// SLIDE 2 – Rationale: why guitar?
// ====================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG_CREAM };

  addEyebrow(s, "02  ·  RATIONALE", "WHY THIS INSTRUMENT?");

  s.addText("why guitar?", {
    x: 0.6, y: 0.95, w: 10, h: 1.2,
    fontFace: F_TITLE, fontSize: 60, italic: true, color: INK, margin: 0,
  });

  // Horizontal hairline across content below title
  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: 2.45, w: W - 1.2, h: 0,
    line: { color: DIV_LINE, width: 0.75 },
  });

  // Three columns
  const colY = 2.7;
  const colH = 4.1;
  const colStartX = 0.6;
  const colGap = 0.2;
  const colW = (W - 1.2 - 2 * colGap) / 3;

  const items = [
    {
      num: "01",
      head: "Portable & accessible.",
      body: "Lightweight, affordable, and playable without amplification or accompaniment.",
    },
    {
      num: "02",
      head: "Harmonic & melodic.",
      body: "One of the few instruments that comfortably plays chords, bass lines, and melody at once.",
    },
    {
      num: "03",
      head: "Lingua franca of modern music.",
      body: "Central to folk, blues, rock, country, jazz, and pop — a shared vocabulary across genres.",
    },
  ];

  items.forEach((it, i) => {
    const x = colStartX + i * (colW + colGap);

    // Vertical divider between columns (left side of cols 2 and 3)
    if (i > 0) {
      s.addShape(pres.shapes.LINE, {
        x: x - colGap / 2, y: colY + 0.1, w: 0, h: colH - 0.4,
        line: { color: DIV_LINE, width: 0.75 },
      });
    }

    // Big italic number
    s.addText(it.num, {
      x: x + 0.1, y: colY + 0.1, w: colW - 0.2, h: 1.1,
      fontFace: F_TITLE, fontSize: 54, italic: true, color: INK, margin: 0,
    });

    // Headline
    s.addText(it.head, {
      x: x + 0.1, y: colY + 2.1, w: colW - 0.2, h: 0.7,
      fontFace: F_BODY, fontSize: 22, color: INK, margin: 0,
    });

    // Body copy
    s.addText(it.body, {
      x: x + 0.1, y: colY + 2.95, w: colW - 0.3, h: 1.1,
      fontFace: F_BODY, fontSize: 13, color: "6B655A",
      lineSpacingMultiple: 1.35, margin: 0,
    });
  });

  addFooter(s, "02 / 10");
}

// ====================================================================
// SLIDE 3 – Anatomy: know the instrument
// ====================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG_CREAM };

  addEyebrow(s, "03  ·  ANATOMY", "");

  // Left column
  s.addText("know the\ninstrument.", {
    x: 0.6, y: 0.95, w: 5.5, h: 2.1,
    fontFace: F_TITLE, fontSize: 50, italic: true, color: INK,
    lineSpacingMultiple: 1.0, margin: 0,
  });

  s.addText(
    "Every guitar — acoustic or electric — shares the same four regions. Learn the names; they're the vocabulary we'll use all term.",
    {
      x: 0.6, y: 3.2, w: 4.8, h: 1.2,
      fontFace: F_BODY, fontSize: 13, color: "6B655A",
      lineSpacingMultiple: 1.45, margin: 0,
    }
  );

  // Label list A-D (two columns)
  const labels = [
    ["A", "Headstock", "B", "Neck & frets"],
    ["C", "Body & soundhole", "D", "Bridge & saddle"],
  ];
  labels.forEach((row, idx) => {
    const y = 4.8 + idx * 0.42;
    s.addText(
      [
        { text: row[0] + " ", options: { bold: true, color: INK } },
        { text: row[1], options: { color: INK_SOFT } },
      ],
      { x: 0.6, y, w: 2.6, h: 0.35, fontFace: F_BODY, fontSize: 14, margin: 0 }
    );
    s.addText(
      [
        { text: row[2] + " ", options: { bold: true, color: INK } },
        { text: row[3], options: { color: INK_SOFT } },
      ],
      { x: 3.2, y, w: 3, h: 0.35, fontFace: F_BODY, fontSize: 14, margin: 0 }
    );
  });

  // Right panel
  const pX = 6.5, pY = 0.7, pW = 6.2, pH = 6.1;
  s.addShape(pres.shapes.RECTANGLE, {
    x: pX, y: pY, w: pW, h: pH,
    fill: { color: PANEL }, line: { color: PANEL_LINE, width: 1 },
  });

  // Labels floating in the panel
  s.addText("A  ·  HEADSTOCK", {
    x: pX + 0.4, y: pY + 0.5, w: pW - 0.8, h: 0.4,
    fontFace: F_SANS, fontSize: 13, color: INK, charSpacing: 4, align: "center", margin: 0,
  });
  s.addText("B  ·  NECK / FRETS", {
    x: pX + 0.4, y: pY + 2.35, w: pW - 0.8, h: 0.4,
    fontFace: F_SANS, fontSize: 13, color: INK, charSpacing: 4, align: "center", margin: 0,
  });

  // Diagram placeholder caption
  s.addShape(pres.shapes.RECTANGLE, {
    x: pX + 1.1, y: pY + 2.95, w: pW - 2.2, h: 0.5,
    fill: { color: PANEL }, line: { color: PANEL_LINE, width: 1 },
  });
  s.addText("[ GUITAR DIAGRAM — FULL-LENGTH REFERENCE PHOTO ]", {
    x: pX + 1.1, y: pY + 2.95, w: pW - 2.2, h: 0.5,
    fontFace: F_SANS, fontSize: 13, color: MUTED, charSpacing: 3, align: "center", valign: "middle", margin: 0,
  });

  s.addText("C  ·  BODY / SOUNDHOLE", {
    x: pX + 0.4, y: pY + 3.85, w: pW - 0.8, h: 0.4,
    fontFace: F_SANS, fontSize: 13, color: INK, charSpacing: 4, align: "center", margin: 0,
  });
  s.addText("D  ·  BRIDGE", {
    x: pX + 0.4, y: pY + 5.25, w: pW - 0.8, h: 0.4,
    fontFace: F_SANS, fontSize: 13, color: INK, charSpacing: 4, align: "center", margin: 0,
  });

  addFooter(s, "03 / 10");
}

// ====================================================================
// SLIDE 4 – Tuning
// ====================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG_CREAM };

  addEyebrow(s, "04  ·  STANDARD TUNING", "LOW  →  HIGH");

  s.addText("tuning.", {
    x: 0.6, y: 0.95, w: 10, h: 1.1,
    fontFace: F_TITLE, fontSize: 60, italic: true, color: INK, margin: 0,
  });

  // Strings table (left side)
  const tableX = 0.6;
  const tableY = 2.55;
  const tableW = 6.0;
  const rowH = 0.6;
  const rows = [
    ["6th", "E", "LOW  ·  THICKEST"],
    ["5th", "A", "—"],
    ["4th", "D", "—"],
    ["3rd", "G", "—"],
    ["2nd", "B", "—"],
    ["1st", "E", "HIGH  ·  THINNEST"],
  ];

  // Top divider
  s.addShape(pres.shapes.LINE, {
    x: tableX, y: tableY, w: tableW, h: 0,
    line: { color: DIV_LINE, width: 0.75 },
  });

  rows.forEach((r, i) => {
    const y = tableY + i * rowH;

    // Ordinal (left)
    s.addText(r[0], {
      x: tableX, y: y + 0.1, w: 0.8, h: rowH - 0.1,
      fontFace: F_SANS, fontSize: 12, color: INK_SOFT, valign: "middle", margin: 0,
    });

    // Big italic note letter
    s.addText(r[1], {
      x: tableX + 1.2, y: y + 0.05, w: 1.2, h: rowH,
      fontFace: F_TITLE, fontSize: 34, italic: true, color: INK,
      valign: "middle", margin: 0,
    });

    // Right note
    s.addText(r[2], {
      x: tableX + 3.6, y: y + 0.1, w: 2.4, h: rowH - 0.1,
      fontFace: F_SANS, fontSize: 11, color: MUTED, charSpacing: 3,
      valign: "middle", margin: 0,
    });

    // Bottom divider for this row
    s.addShape(pres.shapes.LINE, {
      x: tableX, y: y + rowH, w: tableW, h: 0,
      line: { color: DIV_LINE, width: 0.75 },
    });
  });

  // Right side – mnemonic
  s.addText("REMEMBER IT AS", {
    x: 7.4, y: 3.0, w: 5.4, h: 0.35,
    fontFace: F_SANS, fontSize: 12, color: MUTED, charSpacing: 4, margin: 0,
  });

  s.addText(
    [
      { text: "E", options: { bold: true } },
      { text: "ddie " },
      { text: "A", options: { bold: true } },
      { text: "te " },
      { text: "D", options: { bold: true } },
      { text: "ynamite, " },
      { text: "G", options: { bold: true } },
      { text: "ood " },
      { text: "B", options: { bold: true } },
      { text: "ye " },
      { text: "E", options: { bold: true } },
      { text: "ddie." },
    ],
    {
      x: 7.4, y: 3.45, w: 5.4, h: 1.1,
      fontFace: F_BODY, fontSize: 26, color: INK, margin: 0,
    }
  );

  s.addText(
    "Use a clip-on tuner or phone app. Always tune up to the note, never down — it holds pitch better.",
    {
      x: 7.4, y: 4.9, w: 4.5, h: 1.1,
      fontFace: F_BODY, fontSize: 12, color: "6B655A",
      lineSpacingMultiple: 1.45, margin: 0,
    }
  );

  addFooter(s, "04 / 10");
}

// ====================================================================
// SLIDE 5 – Posture
// ====================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG_CREAM };

  addEyebrow(s, "05  ·  POSTURE", "SIT TALL  ·  BREATHE  ·  RELAX SHOULDERS");

  s.addText("how to hold the guitar.", {
    x: 0.6, y: 0.95, w: 12, h: 1.1,
    fontFace: F_TITLE, fontSize: 54, italic: true, color: INK, margin: 0,
  });

  // Two columns A / B
  const col1X = 0.6, col2X = 6.95;
  const colWid = 5.8;
  const sectY = 2.65;

  [
    { x: col1X, label: "A  ·  SEATED POSITION", placeholder: "[ POSTURE REFERENCE — SEATED ]",
      body: "Rest the waist of the guitar on your dominant-side thigh.\nNeck angles slightly upward, roughly 30°.\nRight forearm drapes over the upper bout, not clamped." },
    { x: col2X, label: "B  ·  FRETTING HAND", placeholder: "[ HAND REFERENCE — FRETTING POSITION ]",
      body: "Thumb centered behind the neck, not wrapped over the top.\nPress strings with fingertips, just behind each fret.\nWrist straight — if it hurts, reset the posture." },
  ].forEach((c) => {
    s.addText(c.label, {
      x: c.x, y: sectY, w: colWid, h: 0.35,
      fontFace: F_SANS, fontSize: 12, color: MUTED, charSpacing: 4, margin: 0,
    });

    // Placeholder panel
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: sectY + 0.5, w: colWid, h: 2.1,
      fill: { color: PANEL }, line: { color: PANEL_LINE, width: 1 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x + 1.2, y: sectY + 1.3, w: colWid - 2.4, h: 0.5,
      fill: { color: PANEL }, line: { color: PANEL_LINE, width: 1 },
    });
    s.addText(c.placeholder, {
      x: c.x + 1.2, y: sectY + 1.3, w: colWid - 2.4, h: 0.5,
      fontFace: F_SANS, fontSize: 13, color: MUTED, charSpacing: 3,
      align: "center", valign: "middle", margin: 0,
    });

    // Body text
    s.addText(c.body, {
      x: c.x, y: sectY + 2.85, w: colWid, h: 1.4,
      fontFace: F_BODY, fontSize: 14, color: INK_SOFT,
      lineSpacingMultiple: 1.4, margin: 0,
    });
  });

  addFooter(s, "05 / 10");
}

// ====================================================================
// SLIDE 6 – Notation: reading chords & tabs
// ====================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG_CREAM };

  addEyebrow(s, "06  ·  NOTATION", "TWO SYSTEMS, ONE FRETBOARD");

  s.addText("reading chords & tabs.", {
    x: 0.6, y: 0.95, w: 12, h: 1.1,
    fontFace: F_TITLE, fontSize: 50, italic: true, color: INK, margin: 0,
  });

  // ---- Left side: Chord diagram ----
  s.addText("A  ·  CHORD DIAGRAM", {
    x: 0.6, y: 2.2, w: 5.8, h: 0.35,
    fontFace: F_SANS, fontSize: 12, color: MUTED, charSpacing: 4, margin: 0,
  });
  s.addText("vertical grid", {
    x: 0.6, y: 2.55, w: 5.8, h: 0.8,
    fontFace: F_TITLE, fontSize: 32, italic: true, color: INK, margin: 0,
  });

  // Draw chord diagram (6 strings × 5 frets)
  const cx = 0.8, cy = 3.6;
  const stringSpacing = 0.42;
  const fretSpacing = 0.52;
  const numStrings = 6, numFrets = 4;
  const gridW = stringSpacing * (numStrings - 1);
  const gridH = fretSpacing * numFrets;

  // Nut (thick top line)
  s.addShape(pres.shapes.RECTANGLE, {
    x: cx, y: cy, w: gridW, h: 0.06,
    fill: { color: INK }, line: { color: INK, width: 0 },
  });

  // Vertical strings
  for (let i = 0; i < numStrings; i++) {
    s.addShape(pres.shapes.LINE, {
      x: cx + i * stringSpacing, y: cy, w: 0, h: gridH,
      line: { color: "7A7468", width: 0.75 },
    });
  }
  // Horizontal frets
  for (let i = 1; i <= numFrets; i++) {
    s.addShape(pres.shapes.LINE, {
      x: cx, y: cy + i * fretSpacing, w: gridW, h: 0,
      line: { color: "7A7468", width: 0.75 },
    });
  }

  // String markers above nut: × × ○ ○ ○ ○
  const markers = ["×", "×", "○", "○", "○", "○"];
  markers.forEach((m, i) => {
    s.addText(m, {
      x: cx + i * stringSpacing - 0.15, y: cy - 0.4, w: 0.3, h: 0.3,
      fontFace: F_BODY, fontSize: 14, color: MUTED,
      align: "center", valign: "middle", margin: 0,
    });
  });

  // Finger dot (at 2nd fret, 2nd string from left) with "3"
  const dotX = cx + 1 * stringSpacing - 0.17;
  const dotY = cy + 1 * fretSpacing + (fretSpacing - 0.34) / 2;
  s.addShape(pres.shapes.OVAL, {
    x: dotX, y: dotY, w: 0.34, h: 0.34,
    fill: { color: INK }, line: { color: INK, width: 0 },
  });
  s.addText("3", {
    x: dotX, y: dotY, w: 0.34, h: 0.34,
    fontFace: F_BODY, fontSize: 10, color: "FFFFFF", bold: true,
    align: "center", valign: "middle", margin: 0,
  });

  // "2" label above column 1 (small ghost reference in extract) - omit to stay clean

  // Caption below
  s.addText(
    [
      { text: "Strings run " },
      { text: "vertically", options: { bold: true } },
      { text: ", frets " },
      { text: "horizontally", options: { bold: true } },
      { text: ". Dots show finger placement; numbers indicate which finger." },
    ],
    {
      x: 0.6, y: 6.05, w: 5.8, h: 0.8,
      fontFace: F_BODY, fontSize: 12, color: "6B655A",
      lineSpacingMultiple: 1.45, margin: 0,
    }
  );

  // ---- Right side: Tablature ----
  s.addText("B  ·  TABLATURE (TAB)", {
    x: 6.95, y: 2.2, w: 5.8, h: 0.35,
    fontFace: F_SANS, fontSize: 12, color: MUTED, charSpacing: 4, margin: 0,
  });
  s.addText("six horizontal lines", {
    x: 6.95, y: 2.55, w: 5.8, h: 0.8,
    fontFace: F_TITLE, fontSize: 32, italic: true, color: INK, margin: 0,
  });

  // Tab panel
  const tX = 6.95, tY = 3.55, tW = 5.8, tH = 2.25;
  s.addShape(pres.shapes.RECTANGLE, {
    x: tX, y: tY, w: tW, h: tH,
    fill: { color: PANEL }, line: { color: PANEL_LINE, width: 1 },
  });

  // 6 horizontal tab lines
  const tabLineGap = 0.22;
  const tabStartY = tY + 0.45;
  const tabStartX = tX + 0.4;
  const tabEndX = tX + tW - 0.3;
  const labelsTab = ["e", "B", "G", "D", "A", "E"];
  for (let i = 0; i < 6; i++) {
    const ly = tabStartY + i * tabLineGap;
    s.addShape(pres.shapes.LINE, {
      x: tabStartX + 0.25, y: ly, w: tabEndX - tabStartX - 0.25, h: 0,
      line: { color: INK, width: 0.5 },
    });
    s.addText(labelsTab[i] + "|", {
      x: tabStartX - 0.05, y: ly - 0.13, w: 0.4, h: 0.26,
      fontFace: "Consolas", fontSize: 11, color: INK, valign: "middle", margin: 0,
    });
  }

  // Tab numbers at various positions (simple scattered pattern)
  const tabDots = [
    // [stringIndex 0=high e top, fretNum, xFraction]
    [0, "0", 0.18], [0, "0", 0.55],
    [1, "1", 0.30], [1, "1", 0.55], [1, "1", 0.85],
    [2, "0", 0.42], [2, "0", 0.55], [2, "0", 0.80],
    [3, "2", 0.20], [3, "2", 0.42], [3, "2", 0.55],
    [4, "3", 0.13], [4, "3", 0.48],
  ];
  const tabTrackW = tabEndX - tabStartX - 0.25;
  tabDots.forEach(([si, num, frac]) => {
    const ly = tabStartY + si * tabLineGap;
    s.addText(num, {
      x: tabStartX + 0.25 + frac * tabTrackW - 0.1, y: ly - 0.14, w: 0.2, h: 0.28,
      fontFace: "Consolas", fontSize: 11, color: INK, align: "center", valign: "middle", margin: 0,
    });
  });

  s.addText(
    [
      { text: "Top line is the high-E string. Numbers are " },
      { text: "fret positions", options: { bold: true } },
      { text: ", read left → right in time." },
    ],
    {
      x: 6.95, y: 6.05, w: 5.8, h: 0.8,
      fontFace: F_BODY, fontSize: 12, color: "6B655A",
      lineSpacingMultiple: 1.45, margin: 0,
    }
  );

  addFooter(s, "06 / 10");
}

// ====================================================================
// SLIDE 7 – Open chords
// ====================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG_CREAM };

  addEyebrow(s, "07  ·  OPEN CHORDS", "FOUR SHAPES, HUNDREDS OF SONGS");

  s.addText("your first chords.", {
    x: 0.6, y: 1.15, w: 12, h: 1.1,
    fontFace: F_TITLE, fontSize: 54, italic: true, color: INK, margin: 0,
  });

  s.addText(
    "Master these four and you can play a startling amount of popular music — learn them in order, switch slowly, accuracy before speed.",
    {
      x: 0.6, y: 2.85, w: 5.5, h: 1.0,
      fontFace: F_BODY, fontSize: 13, color: "6B655A",
      lineSpacingMultiple: 1.45, margin: 0,
    }
  );

  // 4 chord cards
  const chordsY = 4.1;
  const chordsH = 2.6;
  const chordsCount = 4;
  const chordStartX = 0.6;
  const chordTotalW = W - 1.2;
  const chordGap = 0.18;
  const chordW = (chordTotalW - chordGap * (chordsCount - 1)) / chordsCount;

  const chords = [
    // dots: [stringIndex 0-5 (left to right), fretNum 1-4]
    { name: "Em",  sub: "EASIEST  ·  2 FINGERS",   dots: [[1, 1], [2, 1]] },
    { name: "Am",  sub: "3 FINGERS",               dots: [[1, 1], [2, 1], [3, 2]] },
    { name: "C",   sub: "BRIGHT  ·  3 FINGERS",    dots: [[1, 2], [2, 1], [3, 1]] },
    { name: "G",   sub: "FULL  ·  3–4 FINGERS",    dots: [[1, 2], [2, 1], [5, 2]] },
  ];

  chords.forEach((ch, idx) => {
    const cxCard = chordStartX + idx * (chordW + chordGap);

    // Card bg
    s.addShape(pres.shapes.RECTANGLE, {
      x: cxCard, y: chordsY, w: chordW, h: chordsH,
      fill: { color: BG_CREAM }, line: { color: PANEL_LINE, width: 1 },
    });

    // Chord name
    s.addText(ch.name, {
      x: cxCard, y: chordsY + 0.15, w: chordW, h: 0.8,
      fontFace: F_TITLE, fontSize: 36, italic: true, color: INK,
      align: "center", margin: 0,
    });

    // Mini chord grid
    const numS = 6, numF = 4;
    const ssp = 0.18;  // string spacing
    const fsp = 0.28;  // fret spacing
    const gridWm = ssp * (numS - 1);
    const gridHm = fsp * numF;
    const gcx = cxCard + (chordW - gridWm) / 2;
    const gcy = chordsY + 1.15;

    // Nut
    s.addShape(pres.shapes.RECTANGLE, {
      x: gcx, y: gcy, w: gridWm, h: 0.04,
      fill: { color: INK }, line: { color: INK, width: 0 },
    });
    // Strings
    for (let i = 0; i < numS; i++) {
      s.addShape(pres.shapes.LINE, {
        x: gcx + i * ssp, y: gcy, w: 0, h: gridHm,
        line: { color: "6B655A", width: 0.5 },
      });
    }
    // Frets
    for (let i = 1; i <= numF; i++) {
      s.addShape(pres.shapes.LINE, {
        x: gcx, y: gcy + i * fsp, w: gridWm, h: 0,
        line: { color: "6B655A", width: 0.5 },
      });
    }
    // Dots: [stringIndex (0 left), fretIndex 1-based]
    ch.dots.forEach(([si, fi]) => {
      const dotSize = 0.16;
      s.addShape(pres.shapes.OVAL, {
        x: gcx + si * ssp - dotSize / 2,
        y: gcy + (fi - 1) * fsp + (fsp - dotSize) / 2,
        w: dotSize, h: dotSize,
        fill: { color: INK }, line: { color: INK, width: 0 },
      });
    });

    // Sub label
    s.addText(ch.sub, {
      x: cxCard, y: chordsY + chordsH - 0.4, w: chordW, h: 0.3,
      fontFace: F_SANS, fontSize: 10, color: MUTED, charSpacing: 3,
      align: "center", margin: 0,
    });
  });

  addFooter(s, "07 / 10");
}

// ====================================================================
// SLIDE 8 – Rhythm / strumming
// ====================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG_CREAM };

  addEyebrow(s, "08  ·  RHYTHM", "THE UNIVERSAL PATTERN");

  s.addText("strumming & rhythm.", {
    x: 0.6, y: 0.95, w: 12, h: 1.1,
    fontFace: F_TITLE, fontSize: 54, italic: true, color: INK, margin: 0,
  });

  // Left column: headline + body
  s.addText(
    [
      { text: "Keep your hand " },
      { text: "always moving", options: { italic: true } },
      { text: " — down on the beat, up on the &." },
    ],
    {
      x: 0.6, y: 3.1, w: 5.8, h: 1.8,
      fontFace: F_BODY, fontSize: 26, color: INK,
      lineSpacingMultiple: 1.25, margin: 0,
    }
  );

  s.addText(
    'The motion of your strumming arm is a metronome. Even on "rests," the hand keeps swinging; you simply miss the strings. This is the single most important concept in rhythm guitar.',
    {
      x: 0.6, y: 4.95, w: 5.4, h: 1.6,
      fontFace: F_BODY, fontSize: 12, color: "6B655A",
      lineSpacingMultiple: 1.45, margin: 0,
    }
  );

  // Right: rhythm grid (8 boxes)
  const rgX = 6.9, rgY = 3.3;
  const rgCount = 8;
  const boxW = 0.62;
  const boxGap = 0.08;
  const totalRgW = rgCount * boxW + (rgCount - 1) * boxGap;

  // Beat labels above: 1 & 2 & 3 & 4 &
  const beats = ["1", "&", "2", "&", "3", "&", "4", "&"];
  beats.forEach((bt, i) => {
    const bx = rgX + i * (boxW + boxGap);
    s.addText(bt, {
      x: bx, y: rgY, w: boxW, h: 0.4,
      fontFace: F_BODY, fontSize: 16,
      color: (i % 2 === 0) ? INK : MUTED,
      align: "center", margin: 0,
    });
  });

  // Boxes row: pattern of played/muted
  // Sequence from image: up (muted), down, up, down (muted), up, down, up  — with filled dark boxes for "played"
  // Pattern: [muted, played, played, muted, played, played, played, played]? Looking at slide image:
  // Order beneath 1 & 2 & 3 & 4 &:
  //   ↑ (empty box), ↓ (filled), ↑ (filled), ↓ (empty), ↑ (filled), ↓ (filled), ↑ (filled), (extra filled)
  const pattern = [
    { arrow: "↑", played: false },
    { arrow: "↓", played: true },
    { arrow: "↑", played: true },
    { arrow: "↓", played: false },
    { arrow: "↑", played: true },
    { arrow: "↓", played: true },
    { arrow: "↑", played: true },
    { arrow: "↑", played: true },
  ];

  const boxY = rgY + 0.55;
  const boxH = 0.8;
  pattern.forEach((p, i) => {
    const bx = rgX + i * (boxW + boxGap);
    if (p.played) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: bx, y: boxY, w: boxW, h: boxH,
        fill: { color: INK }, line: { color: INK, width: 0 },
      });
      s.addText(p.arrow, {
        x: bx, y: boxY, w: boxW, h: boxH,
        fontFace: F_BODY, fontSize: 20, color: "FFFFFF",
        align: "center", valign: "middle", margin: 0,
      });
    } else {
      s.addShape(pres.shapes.RECTANGLE, {
        x: bx, y: boxY, w: boxW, h: boxH,
        fill: { color: BG_CREAM }, line: { color: DIV_LINE, width: 1 },
      });
      s.addText(p.arrow, {
        x: bx, y: boxY, w: boxW, h: boxH,
        fontFace: F_BODY, fontSize: 20, color: INK,
        align: "center", valign: "middle", margin: 0,
      });
    }
  });

  // Legend below boxes: DOWNBEAT  [■] PLAYED  [□] MUTED / AIR
  const legY = boxY + boxH + 0.25;
  s.addText("DOWNBEAT", {
    x: rgX, y: legY, w: 1.3, h: 0.3,
    fontFace: F_SANS, fontSize: 11, color: MUTED, charSpacing: 3, margin: 0,
  });

  // Played swatch
  s.addShape(pres.shapes.RECTANGLE, {
    x: rgX + 1.45, y: legY + 0.06, w: 0.16, h: 0.16,
    fill: { color: INK }, line: { color: INK, width: 0 },
  });
  s.addText("PLAYED", {
    x: rgX + 1.7, y: legY, w: 1.2, h: 0.3,
    fontFace: F_SANS, fontSize: 11, color: MUTED, charSpacing: 3, margin: 0,
  });

  // Muted swatch
  s.addShape(pres.shapes.RECTANGLE, {
    x: rgX + 2.95, y: legY + 0.06, w: 0.16, h: 0.16,
    fill: { color: BG_CREAM }, line: { color: DIV_LINE, width: 1 },
  });
  s.addText("MUTED / AIR", {
    x: rgX + 3.2, y: legY, w: 2.0, h: 0.3,
    fontFace: F_SANS, fontSize: 11, color: MUTED, charSpacing: 3, margin: 0,
  });

  addFooter(s, "08 / 10");
}

// ====================================================================
// SLIDE 9 – Daily 20
// ====================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG_CREAM };

  addEyebrow(s, "09  ·  THE DAILY 20", "SHORT  ·  CONSISTENT  ·  FOCUSED");

  s.addText("practicing.", {
    x: 0.6, y: 0.95, w: 10, h: 1.1,
    fontFace: F_TITLE, fontSize: 54, italic: true, color: INK, margin: 0,
  });

  s.addText(
    "Twenty minutes daily beats two hours weekly. Break it into four focused blocks — no phones, no tabs open, no multitasking.",
    {
      x: 0.6, y: 2.15, w: 5.8, h: 1.0,
      fontFace: F_BODY, fontSize: 13, color: "6B655A",
      lineSpacingMultiple: 1.45, margin: 0,
    }
  );

  // Top divider
  const blocksY = 3.5;
  const blocksCount = 4;
  const blocksStartX = 0.6;
  const blocksTotalW = W - 1.2;
  const blockGap = 0.1;
  const blockW = (blocksTotalW - (blocksCount - 1) * blockGap) / blocksCount;
  const blockH = 2.2;

  const blocks = [
    { mins: "5", label: "min", head: "Warm-up",      body: "Chromatic finger exercises. Slow, clean, relaxed." },
    { mins: "5", label: "min", head: "Chord changes",body: "Two chords, metronome at 60 bpm. Count switches per minute." },
    { mins: "5", label: "min", head: "Strumming",    body: "One pattern on one chord. Lock to the click." },
    { mins: "5", label: "min", head: "Play a song",  body: "Something you love. Mistakes allowed — momentum matters." },
  ];

  blocks.forEach((b, i) => {
    const x = blocksStartX + i * (blockW + blockGap);

    // Top hairline
    s.addShape(pres.shapes.LINE, {
      x, y: blocksY, w: blockW - 0.2, h: 0,
      line: { color: DIV_LINE, width: 0.75 },
    });

    // Big minute number + "min"
    s.addText(
      [
        { text: b.mins, options: { fontFace: F_TITLE, fontSize: 64, italic: true, color: INK } },
        { text: "  " + b.label, options: { fontFace: F_SANS, fontSize: 11, color: MUTED, charSpacing: 3 } },
      ],
      {
        x: x, y: blocksY + 0.15, w: blockW, h: 1.1,
        margin: 0,
      }
    );

    // Head
    s.addText(b.head, {
      x, y: blocksY + 1.35, w: blockW - 0.2, h: 0.45,
      fontFace: F_BODY, fontSize: 17, color: INK, margin: 0,
    });

    // Body
    s.addText(b.body, {
      x, y: blocksY + 1.85, w: blockW - 0.2, h: 0.9,
      fontFace: F_BODY, fontSize: 11, color: "6B655A",
      lineSpacingMultiple: 1.35, margin: 0,
    });
  });

  // Bottom commitment bar
  const commitY = H - 1.4;
  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: commitY, w: W - 1.2, h: 0,
    line: { color: DIV_LINE, width: 0.75 },
  });

  s.addText("DAILY COMMITMENT", {
    x: 0.6, y: commitY + 0.15, w: 4, h: 0.3,
    fontFace: F_SANS, fontSize: 11, color: MUTED, charSpacing: 4, margin: 0,
  });

  s.addText("20 minutes  ·  7 days  ·  no exceptions", {
    x: W - 6.6, y: commitY + 0.1, w: 6, h: 0.45,
    fontFace: F_TITLE, fontSize: 20, italic: true, color: INK,
    align: "right", margin: 0,
  });

  addFooter(s, "09 / 10");
}

// ====================================================================
// SLIDE 10 – Action plan (dark)
// ====================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG_DARK };

  addEyebrow(s, "10  ·  YOUR FIRST MONTH", "ONE STEP PER WEEK", "8A857B");

  // Title: two-tone "action plan."
  s.addText(
    [
      { text: "action ", options: { color: CREAM_ON_DARK } },
      { text: "plan.",   options: { color: "3B362E" } },
    ],
    {
      x: 0.6, y: 0.95, w: 12, h: 1.4,
      fontFace: F_TITLE, fontSize: 72, italic: true,
      margin: 0,
    }
  );

  // Top divider
  const weekY = 3.0;
  const weekCount = 4;
  const weekStartX = 0.6;
  const weekTotalW = W - 1.2;
  const weekGap = 0.15;
  const weekW = (weekTotalW - (weekCount - 1) * weekGap) / weekCount;
  const weekH = 3.2;

  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: weekY, w: W - 1.2, h: 0,
    line: { color: "4A443B", width: 0.75 },
  });

  const weeks = [
    { n: "WEEK 01", head: "Tune it. Hold it. Name the parts.",
      body: "By Friday: tune from memory and recite the six string names unprompted." },
    { n: "WEEK 02", head: "Learn Em and Am cleanly.",
      body: "Every note rings. No buzzes. Switch between them 20 times in a minute." },
    { n: "WEEK 03", head: "Add C and G. Strum the down-up pattern.",
      body: "Loop all four chords to a 60 bpm click for five minutes without stopping." },
    { n: "WEEK 04", head: "Play one full song, end to end.",
      body: "Performance matters. Record it. Bring it to lecture on day 30." },
  ];

  weeks.forEach((w, i) => {
    const x = weekStartX + i * (weekW + weekGap);

    // Vertical divider between columns
    if (i > 0) {
      s.addShape(pres.shapes.LINE, {
        x: x - weekGap / 2, y: weekY + 0.1, w: 0, h: weekH - 0.2,
        line: { color: "4A443B", width: 0.75 },
      });
    }

    // Label
    s.addText(w.n, {
      x: x + 0.1, y: weekY + 0.3, w: weekW - 0.2, h: 0.35,
      fontFace: F_SANS, fontSize: 12, color: "8A857B", charSpacing: 4, margin: 0,
    });

    // Headline
    s.addText(w.head, {
      x: x + 0.1, y: weekY + 0.75, w: weekW - 0.2, h: 1.2,
      fontFace: F_BODY, fontSize: 20, color: CREAM_ON_DARK,
      lineSpacingMultiple: 1.2, margin: 0,
    });

    // Body
    s.addText(w.body, {
      x: x + 0.1, y: weekY + 2.1, w: weekW - 0.25, h: 1.1,
      fontFace: F_BODY, fontSize: 12, color: "A8A295",
      lineSpacingMultiple: 1.45, margin: 0,
    });
  });

  // Bottom bar divider
  const footY = H - 1.0;
  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: footY, w: W - 1.2, h: 0,
    line: { color: "4A443B", width: 0.75 },
  });

  // Bottom-left italic farewell
  s.addText(
    [
      { text: "See you in 30 days", options: { color: CREAM_ON_DARK } },
      { text: " — ", options: { color: CREAM_ON_DARK } },
      { text: "bring the guitar.", options: { color: "3B362E" } },
    ],
    {
      x: 0.6, y: footY + 0.18, w: 8, h: 0.45,
      fontFace: F_TITLE, fontSize: 22, italic: true, margin: 0,
    }
  );

  // Bottom-right end-of-lecture tag
  s.addText("MUS 101  ·  END OF LECTURE 01", {
    x: W - 6.6, y: footY + 0.28, w: 6, h: 0.3,
    fontFace: F_SANS, fontSize: 11, color: "8A857B", charSpacing: 4,
    align: "right", margin: 0,
  });
}

// ---- Write file ----
const outPath = "/home/assets/Intro_to_Guitar-replica.pptx";
pres.writeFile({ fileName: outPath }).then((f) => {
  console.log("Wrote:", f);
});
