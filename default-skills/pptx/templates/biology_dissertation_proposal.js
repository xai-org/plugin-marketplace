/**
 * Committee Meeting — Year 2
 * Dissertation Track Plan: Roots, Microbes, and the Cereal Rhizosphere
 *
 * Regenerates the 8-slide committee presentation using pptxgenjs.
 * Run:  node build_presentation.js
 */

const pptxgen = require("pptxgenjs");

// ---------- Design tokens ----------
const COLOR = {
  darkBg:       "1B2420",   // dark slide background (slide 1 + open-question band)
  cream:        "F1EDE3",   // main light background (slides 2, 3, 5, 8)
  beige:        "E8DFC8",   // warmer alt background (slides 4, 7)
  cardCream:    "F5EFE2",   // lighter card fill on beige background
  ink:          "1B2420",   // near-black body text on light bg
  body:         "3B3F3A",   // dark grey body
  muted:        "7A7F76",   // muted labels (uppercase eyebrow)
  mutedLight:   "A7A79A",   // muted labels on dark bg
  forest:       "3B5D3A",   // primary accent green
  forestDeep:   "2C4A2B",   // deeper green
  moss:         "7A9A6A",   // secondary moss
  terracotta:   "C26A33",   // accent orange/terracotta
  terracottaSoft:"D48A5B",  // softer terracotta
  hairline:     "C9C4B4",   // subtle divider on light bg
  hairlineDark: "2A3530",   // divider on dark bg
  greenIce:     "CADCFC",   // unused - placeholder
  subtitleOnDark:"C9C4B4",  // subtitle on dark slide
  titleOnDark:  "EFE9D9",   // title color on dark bg
};

const FONT = {
  head: "Georgia",
  body: "Calibri",
  mono: "Consolas",
};

// ---------- Presentation setup ----------
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";  // 13.3 x 7.5 in
pres.title = "Committee Meeting — Year 2";
pres.author = "Graduate Researcher";

const W = 13.333;   // slide width
const H = 7.5;      // slide height
const MARGIN_X = 0.85;

// ---------- helpers ----------
function addEyebrow(slide, label, pageStr, onDark = false) {
  const labelColor = onDark ? COLOR.mutedLight : COLOR.muted;
  slide.addText(label, {
    x: MARGIN_X, y: 0.55, w: 8, h: 0.35,
    fontFace: FONT.body, fontSize: 10, bold: false,
    color: labelColor, charSpacing: 4, margin: 0,
  });
  slide.addText(pageStr, {
    x: W - MARGIN_X - 2, y: 0.55, w: 2, h: 0.35,
    fontFace: FONT.body, fontSize: 10,
    color: labelColor, charSpacing: 4, align: "right", margin: 0,
  });
}

function addTitle(slide, text, opts = {}) {
  const {
    y = 1.55, h = 1.5, size = 40, color = COLOR.ink,
    w = W - 2 * MARGIN_X, italic = false, runs = null, x = MARGIN_X,
  } = opts;
  if (runs) {
    slide.addText(runs, {
      x, y, w, h,
      fontFace: FONT.head, fontSize: size, color,
      valign: "top", margin: 0,
    });
  } else {
    slide.addText(text, {
      x, y, w, h,
      fontFace: FONT.head, fontSize: size, color, italic,
      valign: "top", margin: 0,
    });
  }
}

// ======================================================================
// SLIDE 1  —  Title / dark cover
// ======================================================================
function slide1() {
  const s = pres.addSlide();
  s.background = { color: COLOR.darkBg };

  addEyebrow(s, "COMMITTEE MEETING — YEAR 2", "01 / 08", true);

  // Small "DISSERTATION TRACK PLAN" chip (bordered box)
  s.addShape(pres.shapes.RECTANGLE, {
    x: MARGIN_X, y: 1.55, w: 3.1, h: 0.45,
    fill: { color: COLOR.darkBg },
    line: { color: COLOR.mutedLight, width: 0.75 },
  });
  s.addText("DISSERTATION TRACK PLAN", {
    x: MARGIN_X, y: 1.55, w: 3.1, h: 0.45,
    fontFace: FONT.body, fontSize: 10, color: COLOR.subtitleOnDark,
    charSpacing: 4, align: "center", valign: "middle", margin: 0,
  });

  // Main title
  addTitle(s, "Roots, Microbes, and the Cereal Rhizosphere", {
    y: 2.25, h: 2.1, size: 54, color: COLOR.titleOnDark,
    w: W - 2 * MARGIN_X - 1.5,
  });

  // Subtitle
  s.addText(
    "Single-cell transcriptomics and spatial metagenomics to map who lives where along cereal roots — and what each partner is doing.",
    {
      x: MARGIN_X, y: 4.55, w: 10.5, h: 1.0,
      fontFace: FONT.body, fontSize: 16, color: COLOR.subtitleOnDark,
      valign: "top", margin: 0,
    }
  );

  // Bottom hairline above footer meta
  s.addShape(pres.shapes.LINE, {
    x: MARGIN_X, y: 6.25, w: W - 2 * MARGIN_X, h: 0,
    line: { color: COLOR.hairlineDark, width: 0.75 },
  });

  // Footer metadata — 3 columns
  const metaY = 6.45;
  const col1X = MARGIN_X;
  const col2X = 4.6;
  const col3X = 8.2;

  // STUDENT
  s.addText("STUDENT", {
    x: col1X, y: metaY, w: 2.5, h: 0.3,
    fontFace: FONT.body, fontSize: 9, color: COLOR.mutedLight,
    charSpacing: 3, margin: 0,
  });
  s.addText("GRADUATE RESEARCHER · Y2", {
    x: col1X, y: metaY + 0.32, w: 3.5, h: 0.3,
    fontFace: FONT.body, fontSize: 11, bold: true, color: COLOR.titleOnDark,
    charSpacing: 1, margin: 0,
  });

  // PROGRAM
  s.addText("PROGRAM", {
    x: col2X, y: metaY, w: 2.5, h: 0.3,
    fontFace: FONT.body, fontSize: 9, color: COLOR.mutedLight,
    charSpacing: 3, margin: 0,
  });
  s.addText("PLANT BIOLOGY / MICROBIOME", {
    x: col2X, y: metaY + 0.32, w: 3.5, h: 0.3,
    fontFace: FONT.body, fontSize: 11, bold: true, color: COLOR.titleOnDark,
    charSpacing: 1, margin: 0,
  });

  // DATE
  s.addText("DATE", {
    x: col3X, y: metaY, w: 2.5, h: 0.3,
    fontFace: FONT.body, fontSize: 9, color: COLOR.mutedLight,
    charSpacing: 3, margin: 0,
  });
  s.addText([
    { text: "APRIL 2026", options: { bold: true, color: COLOR.titleOnDark } },
    { text: "   PROPOSING 2 FIRST-AUTHOR PAPERS", options: { color: COLOR.mutedLight } },
  ], {
    x: col3X, y: metaY + 0.32, w: 5.0, h: 0.3,
    fontFace: FONT.body, fontSize: 11, charSpacing: 1, margin: 0,
  });
}

// ======================================================================
// SLIDE 2  —  Background + root diagram
// ======================================================================
function slide2() {
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  addEyebrow(s, "BACKGROUND", "02 / 08");

  // Headline with italic accent word
  addTitle(s, null, {
    y: 1.15, h: 1.0, size: 36,
    runs: [
      { text: "Cereal roots are ", options: { color: COLOR.ink } },
      { text: "ecosystems", options: { color: COLOR.forest, italic: true } },
      { text: ", not organs.", options: { color: COLOR.ink } },
    ],
  });

  // Left column body text (two paragraphs)
  const leftW = 6.0;
  s.addText([
    { text: "A single maize or wheat root hosts ", options: {} },
    { text: "hundreds of bacterial and fungal taxa", options: { bold: true } },
    { text: " whose collective metabolism shapes nitrogen uptake, drought tolerance, and yield.", options: { breakLine: true } },
    { text: " ", options: { breakLine: true } },
    { text: "But cereals and microbes don't meet as averages. They meet at ", options: {} },
    { text: "cell-scale interfaces", options: { bold: true } },
    { text: " — a meristem cortex cell, a root hair, an emerging lateral — each with its own chemistry.", options: {} },
  ], {
    x: MARGIN_X, y: 2.35, w: leftW, h: 2.9,
    fontFace: FONT.body, fontSize: 15, color: COLOR.body,
    valign: "top", paraSpaceAfter: 10, margin: 0,
  });

  // Hairline above stats
  s.addShape(pres.shapes.LINE, {
    x: MARGIN_X, y: 5.35, w: leftW, h: 0,
    line: { color: COLOR.hairline, width: 0.75 },
  });

  // Three stats
  const statY = 5.55;
  const statW = 1.95;
  const stats = [
    { big: "~40%",  sub: "of global calories from cereals" },
    { big: ">10³",  sub: "microbial taxa per root" },
    { big: "µm",    sub: "scale of every real interaction" },
  ];
  stats.forEach((st, i) => {
    const x = MARGIN_X + i * statW;
    if (st.bigRuns) {
      s.addText(st.bigRuns, {
        x, y: statY, w: statW - 0.1, h: 0.7,
        valign: "top", margin: 0,
      });
    } else {
      s.addText(st.big, {
        x, y: statY, w: statW - 0.1, h: 0.7,
        fontFace: FONT.head, fontSize: 36, color: COLOR.forest,
        valign: "top", margin: 0,
      });
    }
    s.addText(st.sub, {
      x, y: statY + 0.75, w: statW - 0.1, h: 0.6,
      fontFace: FONT.body, fontSize: 11, color: COLOR.body,
      valign: "top", margin: 0,
    });
  });

  // ---- Right: root diagram ----
  const diagX = 7.6;
  const diagY = 2.2;
  const colW  = 1.0;
  const colH  = 4.6;

  // faint background panel
  s.addShape(pres.shapes.RECTANGLE, {
    x: diagX - 0.2, y: diagY - 0.15, w: 4.9, h: colH + 0.35,
    fill: { color: "EBE6D6" }, line: { color: "EBE6D6", width: 0 },
  });

  // Stacked root zones (5 segments, lighter→darker green top→bottom)
  const zones = [
    { label: "MERISTEM",    color: "BCCF9E", h: 0.70 },
    { label: "ELONGATION",  color: "A7C185", h: 0.80 },
    { label: "MATURATION",  color: "8EAB6A", h: 0.95 },
    { label: "ROOT HAIRS",  color: "5E7F42", h: 1.15 },
    { label: "LATERAL ROOTS", color: "3F5E2A", h: 1.00 },
  ];
  let cy = diagY;
  zones.forEach((z) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: diagX + 0.2, y: cy, w: colW, h: z.h,
      fill: { color: z.color }, line: { color: "2C4A2B", width: 0.75 },
    });
    // small connector line
    s.addShape(pres.shapes.LINE, {
      x: diagX + 0.2 + colW, y: cy + z.h / 2, w: 0.7, h: 0,
      line: { color: COLOR.muted, width: 0.5 },
    });
    // label
    s.addText(z.label, {
      x: diagX + 0.2 + colW + 0.75, y: cy + z.h / 2 - 0.15, w: 2.6, h: 0.3,
      fontFace: FONT.mono, fontSize: 10, color: COLOR.body,
      charSpacing: 2, valign: "middle", margin: 0,
    });
    cy += z.h;
  });

  // small lateral root curves at bottom (decorative)
  s.addShape(pres.shapes.LINE, {
    x: diagX - 0.4, y: cy - 0.05, w: 0.6, h: 0.6,
    line: { color: "3F5E2A", width: 3 },
    flipH: true,
  });
  s.addShape(pres.shapes.LINE, {
    x: diagX + 0.2 + colW, y: cy - 0.05, w: 0.6, h: 0.5,
    line: { color: "3F5E2A", width: 3 },
  });

  // Row-of-dots pattern on left of segments (subtle)
  for (let i = 0; i < 14; i++) {
    s.addShape(pres.shapes.OVAL, {
      x: diagX + 0.05, y: diagY + 0.15 + i * 0.32, w: 0.06, h: 0.06,
      fill: { color: COLOR.body }, line: { color: COLOR.body, width: 0 },
    });
  }
}

// ======================================================================
// SLIDE 3  —  The Problem (two columns + dark band)
// ======================================================================
function slide3() {
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  addEyebrow(s, "THE PROBLEM", "03 / 08");

  addTitle(s, "Today's root–microbiome studies lose the two details that matter most.", {
    y: 1.1, h: 1.4, size: 34,
  });

  // --- Two columns ---
  const colY = 3.0;
  const col1X = MARGIN_X;
  const col2X = 7.0;
  const colW = 5.5;

  // top hairlines
  s.addShape(pres.shapes.LINE, {
    x: col1X, y: colY, w: colW, h: 0,
    line: { color: COLOR.ink, width: 1 },
  });
  s.addShape(pres.shapes.LINE, {
    x: col2X, y: colY, w: colW, h: 0,
    line: { color: COLOR.ink, width: 1 },
  });

  // LOST DIMENSION 01
  s.addText("LOST DIMENSION 01", {
    x: col1X, y: colY + 0.15, w: colW, h: 0.3,
    fontFace: FONT.body, fontSize: 11, color: COLOR.terracotta,
    charSpacing: 4, margin: 0,
  });
  s.addText("Cell identity", {
    x: col1X, y: colY + 0.5, w: colW, h: 0.55,
    fontFace: FONT.head, fontSize: 24, color: COLOR.ink, margin: 0,
  });
  s.addText(
    "Bulk RNA-seq on whole roots averages over meristem, cortex, endodermis, and stele — the cells that actually respond differ in opposite directions.",
    {
      x: col1X, y: colY + 1.2, w: colW, h: 1.7,
      fontFace: FONT.body, fontSize: 14, color: COLOR.body, margin: 0,
    }
  );

  // LOST DIMENSION 02
  s.addText("LOST DIMENSION 02", {
    x: col2X, y: colY + 0.15, w: colW, h: 0.3,
    fontFace: FONT.body, fontSize: 11, color: COLOR.terracotta,
    charSpacing: 4, margin: 0,
  });
  s.addText("Spatial structure", {
    x: col2X, y: colY + 0.5, w: colW, h: 0.55,
    fontFace: FONT.head, fontSize: 24, color: COLOR.ink, margin: 0,
  });
  s.addText(
    "Amplicon and shotgun metagenomics grind the root into a tube of DNA. We learn who is present, never who sits on which tissue, at which depth, next to whom.",
    {
      x: col2X, y: colY + 1.2, w: colW, h: 1.7,
      fontFace: FONT.body, fontSize: 14, color: COLOR.body, margin: 0,
    }
  );

  // --- Open Question dark band ---
  const bandY = 5.95;
  const bandH = 1.05;
  s.addShape(pres.shapes.RECTANGLE, {
    x: MARGIN_X, y: bandY, w: W - 2 * MARGIN_X, h: bandH,
    fill: { color: COLOR.darkBg }, line: { color: COLOR.darkBg, width: 0 },
  });
  s.addText("OPEN QUESTION", {
    x: MARGIN_X + 0.4, y: bandY, w: 2.4, h: bandH,
    fontFace: FONT.body, fontSize: 11, color: COLOR.moss,
    charSpacing: 4, valign: "middle", margin: 0,
  });
  s.addText(
    "Which host cell states recruit which microbial consortia, and where along the root does that negotiation happen?",
    {
      x: MARGIN_X + 3.0, y: bandY, w: W - 2 * MARGIN_X - 3.4, h: bandH,
      fontFace: FONT.head, fontSize: 17, color: COLOR.titleOnDark, italic: true,
      valign: "middle", margin: 0,
    }
  );
}

// ======================================================================
// SLIDE 4  —  Why Now (three cards + footer strip)
// ======================================================================
function slide4() {
  const s = pres.addSlide();
  s.background = { color: COLOR.beige };

  addEyebrow(s, "WHY NOW", "04 / 08");

  addTitle(s, "The technical pieces finally line up for a cell-resolved, spatially-aware answer.", {
    y: 1.1, h: 1.4, size: 32,
  });

  // Three cards
  const cards = [
    {
      year: "2022→",
      title: "Plant snRNA-seq matured",
      body: "Published atlases for Arabidopsis, maize, and rice roots give a reference for cell-type calling in cereals.",
    },
    {
      year: "2023→",
      title: "Spatial transcriptomics at µm scale",
      body: "Visium HD, Stereo-seq, and MERFISH now resolve root tissues in intact sections — not just dissociated cells.",
    },
    {
      year: "2024→",
      title: "Microbial FISH + spatial -omics",
      body: "HiPR-FISH and SEER protocols allow in-situ microbial localization compatible with host RNA readouts.",
    },
  ];

  const cardY = 2.95;
  const cardH = 3.4;
  const gap = 0.2;
  const totalW = W - 2 * MARGIN_X;
  const cardW = (totalW - 2 * gap) / 3;

  cards.forEach((c, i) => {
    const cx = MARGIN_X + i * (cardW + gap);

    // card body
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardY, w: cardW, h: cardH,
      fill: { color: COLOR.cardCream },
      line: { color: COLOR.hairline, width: 0.5 },
    });

    // year label
    s.addText(c.year, {
      x: cx + 0.3, y: cardY + 0.3, w: cardW - 0.6, h: 0.4,
      fontFace: FONT.body, fontSize: 12, color: COLOR.forest,
      charSpacing: 3, margin: 0,
    });

    // title
    s.addText(c.title, {
      x: cx + 0.3, y: cardY + 0.75, w: cardW - 0.6, h: 1.0,
      fontFace: FONT.head, fontSize: 20, color: COLOR.ink,
      valign: "top", margin: 0,
    });

    // body
    s.addText(c.body, {
      x: cx + 0.3, y: cardY + 1.85, w: cardW - 0.6, h: 1.4,
      fontFace: FONT.body, fontSize: 13, color: COLOR.body,
      valign: "top", margin: 0,
    });
  });

  // Bottom "THE OPENING" strip
  const stripY = 6.65;
  s.addShape(pres.shapes.LINE, {
    x: MARGIN_X, y: stripY, w: W - 2 * MARGIN_X, h: 0,
    line: { color: COLOR.ink, width: 0.75 },
  });
  s.addText("THE OPENING", {
    x: MARGIN_X, y: stripY + 0.15, w: 2.0, h: 0.4,
    fontFace: FONT.body, fontSize: 11, color: COLOR.terracotta,
    charSpacing: 4, valign: "middle", margin: 0,
  });
  s.addText(
    "No group has yet combined all three on a cereal root — the niche this thesis moves into.",
    {
      x: MARGIN_X + 2.2, y: stripY + 0.15, w: W - 2 * MARGIN_X - 2.2, h: 0.4,
      fontFace: FONT.body, fontSize: 14, color: COLOR.ink,
      valign: "middle", margin: 0,
    }
  );
}

// ======================================================================
// SLIDE 5  —  Thesis Aims (two columns with method/output rows)
// ======================================================================
function slide5() {
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  addEyebrow(s, "THESIS AIMS", "05 / 08");

  addTitle(s, "Two aims, one integrated question.", {
    y: 1.1, h: 1.0, size: 34,
  });

  const colY = 2.5;
  const col1X = MARGIN_X;
  const col2X = 7.0;
  const colW = 5.5;

  // Top accent lines — green for AIM 01, terracotta for AIM 02
  s.addShape(pres.shapes.LINE, {
    x: col1X, y: colY, w: colW, h: 0,
    line: { color: COLOR.forest, width: 2 },
  });
  s.addShape(pres.shapes.LINE, {
    x: col2X, y: colY, w: colW, h: 0,
    line: { color: COLOR.terracotta, width: 2 },
  });

  // AIM 01
  s.addText("AIM 01", {
    x: col1X, y: colY + 0.12, w: colW, h: 0.35,
    fontFace: FONT.body, fontSize: 12, color: COLOR.forest,
    charSpacing: 4, margin: 0,
  });
  s.addText("A single-cell transcriptomic atlas of the cereal root under microbial challenge", {
    x: col1X, y: colY + 0.55, w: colW, h: 1.25,
    fontFace: FONT.head, fontSize: 22, color: COLOR.ink,
    valign: "top", margin: 0,
  });

  // AIM 02
  s.addText("AIM 02", {
    x: col2X, y: colY + 0.12, w: colW, h: 0.35,
    fontFace: FONT.body, fontSize: 12, color: COLOR.terracotta,
    charSpacing: 4, margin: 0,
  });
  s.addText("A spatially-resolved microbial census of the same root tissues", {
    x: col2X, y: colY + 0.55, w: colW, h: 1.25,
    fontFace: FONT.head, fontSize: 22, color: COLOR.ink,
    valign: "top", margin: 0,
  });

  // Method / Output rows
  const rowY = 4.35;
  const labelW = 1.2;
  const valueX1 = col1X + labelW + 0.15;
  const valueX2 = col2X + labelW + 0.15;
  const valueW = colW - labelW - 0.15;

  // top hairline of meta rows
  s.addShape(pres.shapes.LINE, {
    x: col1X, y: rowY, w: colW, h: 0,
    line: { color: COLOR.hairline, width: 0.75 },
  });
  s.addShape(pres.shapes.LINE, {
    x: col2X, y: rowY, w: colW, h: 0,
    line: { color: COLOR.hairline, width: 0.75 },
  });

  // method row
  s.addText("METHOD", {
    x: col1X, y: rowY + 0.15, w: labelW, h: 0.5,
    fontFace: FONT.body, fontSize: 10, color: COLOR.muted,
    charSpacing: 3, valign: "top", margin: 0,
  });
  s.addText("snRNA-seq of maize + wheat roots, axenic vs. SynCom-inoculated", {
    x: valueX1, y: rowY + 0.15, w: valueW, h: 0.75,
    fontFace: FONT.body, fontSize: 13, color: COLOR.body,
    valign: "top", margin: 0,
  });
  s.addText("METHOD", {
    x: col2X, y: rowY + 0.15, w: labelW, h: 0.5,
    fontFace: FONT.body, fontSize: 10, color: COLOR.muted,
    charSpacing: 3, valign: "top", margin: 0,
  });
  s.addText("HiPR-FISH + spatial transcriptomics on paired root sections", {
    x: valueX2, y: rowY + 0.15, w: valueW, h: 0.75,
    fontFace: FONT.body, fontSize: 13, color: COLOR.body,
    valign: "top", margin: 0,
  });

  // divider between method and output
  const divY = rowY + 1.0;
  s.addShape(pres.shapes.LINE, {
    x: col1X, y: divY, w: colW, h: 0,
    line: { color: COLOR.hairline, width: 0.75 },
  });
  s.addShape(pres.shapes.LINE, {
    x: col2X, y: divY, w: colW, h: 0,
    line: { color: COLOR.hairline, width: 0.75 },
  });

  // output row
  s.addText("OUTPUT", {
    x: col1X, y: divY + 0.15, w: labelW, h: 0.5,
    fontFace: FONT.body, fontSize: 10, color: COLOR.muted,
    charSpacing: 3, valign: "top", margin: 0,
  });
  s.addText("Cell-type-resolved response programs; candidate host receptors & transporters", {
    x: valueX1, y: divY + 0.15, w: valueW, h: 0.75,
    fontFace: FONT.body, fontSize: 13, color: COLOR.body,
    valign: "top", margin: 0,
  });
  s.addText("OUTPUT", {
    x: col2X, y: divY + 0.15, w: labelW, h: 0.5,
    fontFace: FONT.body, fontSize: 10, color: COLOR.muted,
    charSpacing: 3, valign: "top", margin: 0,
  });
  s.addText("Taxa localized to root zone, tissue, and neighboring cell state", {
    x: valueX2, y: divY + 0.15, w: valueW, h: 0.75,
    fontFace: FONT.body, fontSize: 13, color: COLOR.body,
    valign: "top", margin: 0,
  });

  // bottom hairline spanning both cols
  const bottomY = divY + 0.95;
  s.addShape(pres.shapes.LINE, {
    x: MARGIN_X, y: bottomY, w: W - 2 * MARGIN_X, h: 0,
    line: { color: COLOR.ink, width: 0.75 },
  });

  // "THE INTEGRATION" strip
  s.addText("THE INTEGRATION", {
    x: MARGIN_X, y: bottomY + 0.15, w: 2.2, h: 0.4,
    fontFace: FONT.body, fontSize: 11, color: COLOR.forest,
    charSpacing: 4, valign: "middle", margin: 0,
  });
  s.addText(
    "A joint map where every root cell state is annotated with the microbial neighborhood that surrounds it.",
    {
      x: MARGIN_X + 2.4, y: bottomY + 0.15, w: W - 2 * MARGIN_X - 2.4, h: 0.4,
      fontFace: FONT.body, fontSize: 14, color: COLOR.ink,
      valign: "middle", margin: 0,
    }
  );
}

// ======================================================================
// SLIDE 6  —  Aim 1 experimental framework (matrix + workflow)
// ======================================================================
function slide6() {
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  addEyebrow(s, "AIM 1 · EXPERIMENTAL FRAMEWORK", "06 / 08");

  addTitle(s, "A maize × wheat × SynCom atlas at single-nucleus resolution.", {
    y: 1.1, h: 1.0, size: 30,
  });

  // ---- Left: DESIGN matrix ----
  const leftX = MARGIN_X;
  s.addText("DESIGN — 2 × 2 × 3", {
    x: leftX, y: 2.35, w: 5, h: 0.35,
    fontFace: FONT.body, fontSize: 11, color: COLOR.muted,
    charSpacing: 4, margin: 0,
  });

  // Build matrix table
  const hdrCell = (txt) => ({
    text: txt,
    options: {
      fill: { color: COLOR.darkBg },
      color: COLOR.titleOnDark,
      fontFace: FONT.body, fontSize: 11,
      align: "center", valign: "middle",
      charSpacing: 3, bold: false,
      margin: 0.08,
    },
  });
  const rowLabel = (name, cond) => ({
    text: [
      { text: name, options: { fontFace: FONT.body, fontSize: 13, color: COLOR.ink, breakLine: true } },
      { text: cond, options: { fontFace: FONT.body, fontSize: 10, color: COLOR.muted, charSpacing: 3 } },
    ],
    options: {
      fill: { color: "E8DFC8" },
      valign: "middle",
      margin: [0.1, 0.15, 0.1, 0.15],
    },
  });
  // cells with dots (unicode dots work here inside table as regular text content);
  // we'll use simple hollow/filled dot chars
  const hostOnly = {
    text: "●  ○",
    options: {
      fill: { color: "F5EFE2" },
      color: COLOR.forest,
      fontFace: FONT.body, fontSize: 18,
      align: "center", valign: "middle",
      margin: 0.08,
    },
  };
  const hostAndMicrobe = {
    text: [
      { text: "●", options: { color: COLOR.forest } },
      { text: "  ", options: {} },
      { text: "●", options: { color: COLOR.terracotta } },
    ],
    options: {
      fill: { color: "F5EFE2" },
      fontFace: FONT.body, fontSize: 18,
      align: "center", valign: "middle",
      margin: 0.08,
    },
  };

  const tblData = [
    [
      hdrCell(""),
      hdrCell("MERISTEM"),
      hdrCell("ELONGATION"),
      hdrCell("MATURATION"),
      hdrCell("LATERAL"),
    ],
    [rowLabel("Maize B73", "AXENIC"), hostOnly, hostOnly, hostOnly, hostOnly],
    [rowLabel("Maize B73", "SYNCOM"), hostAndMicrobe, hostAndMicrobe, hostAndMicrobe, hostAndMicrobe],
    [rowLabel("Wheat Fielder", "AXENIC"), hostOnly, hostOnly, hostOnly, hostOnly],
    [rowLabel("Wheat Fielder", "SYNCOM"), hostAndMicrobe, hostAndMicrobe, hostAndMicrobe, hostAndMicrobe],
  ];

  s.addTable(tblData, {
    x: leftX, y: 2.7, w: 6.6,
    colW: [1.6, 1.25, 1.25, 1.25, 1.25],
    rowH: [0.5, 0.55, 0.55, 0.55, 0.55],
    border: { pt: 0.5, color: COLOR.darkBg },
    fontFace: FONT.body, fontSize: 12,
  });

  // Legend
  const legY = 5.55;
  // green dot
  s.addShape(pres.shapes.OVAL, {
    x: leftX, y: legY + 0.05, w: 0.17, h: 0.17,
    fill: { color: COLOR.forest }, line: { color: COLOR.forest, width: 0 },
  });
  s.addText("HOST (SNRNA-SEQ)", {
    x: leftX + 0.25, y: legY, w: 2.8, h: 0.3,
    fontFace: FONT.body, fontSize: 11, color: COLOR.body,
    charSpacing: 3, valign: "middle", margin: 0,
  });
  // terracotta dot
  s.addShape(pres.shapes.OVAL, {
    x: leftX + 2.7, y: legY + 0.05, w: 0.17, h: 0.17,
    fill: { color: COLOR.terracotta }, line: { color: COLOR.terracotta, width: 0 },
  });
  s.addText("MICROBIAL (16S / ITS)", {
    x: leftX + 2.95, y: legY, w: 3.0, h: 0.3,
    fontFace: FONT.body, fontSize: 11, color: COLOR.body,
    charSpacing: 3, valign: "middle", margin: 0,
  });

  // ---- Right: WORKFLOW steps ----
  const rX = 8.1;
  s.addText("WORKFLOW", {
    x: rX, y: 2.35, w: 4, h: 0.35,
    fontFace: FONT.body, fontSize: 11, color: COLOR.muted,
    charSpacing: 4, margin: 0,
  });

  const steps = [
    { n: "1", t: "Gnotobiotic growth", b: "Seedlings in sterile calcined-clay columns; defined 12-member SynCom at DAG 5." },
    { n: "2", t: "Zonal dissection",   b: "Meristem, elongation, maturation, and lateral-emergence zones harvested separately at DAG 14 + 21." },
    { n: "3", t: "Parallel readouts",  b: "Nuclei → 10x Multiome (RNA + ATAC). Rhizoplane wash → 16S / ITS / shotgun." },
    { n: "4", t: "Integration",        b: "Map host cell-state shifts to microbial community shifts per zone." },
  ];
  let sy = 2.7;
  const stepH = 0.95;
  steps.forEach((st, i) => {
    // number
    s.addText(st.n, {
      x: rX, y: sy, w: 0.6, h: stepH,
      fontFace: FONT.head, fontSize: 28, color: COLOR.forest,
      valign: "top", margin: 0,
    });
    // title
    s.addText(st.t, {
      x: rX + 0.6, y: sy, w: 4.2, h: 0.35,
      fontFace: FONT.body, fontSize: 13, bold: true, color: COLOR.ink,
      margin: 0,
    });
    // body
    s.addText(st.b, {
      x: rX + 0.6, y: sy + 0.33, w: 4.2, h: 0.65,
      fontFace: FONT.body, fontSize: 11, color: COLOR.body,
      valign: "top", margin: 0,
    });
    // divider (skip below last)
    if (i < steps.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: rX, y: sy + stepH + 0.03, w: 4.8, h: 0,
        line: { color: COLOR.hairline, width: 0.5 },
      });
    }
    sy += stepH + 0.1;
  });
}

// ======================================================================
// SLIDE 7  —  Aim 2 experimental framework
// ======================================================================
function slide7() {
  const s = pres.addSlide();
  s.background = { color: COLOR.beige };

  addEyebrow(s, "AIM 2 · EXPERIMENTAL FRAMEWORK", "07 / 08");

  addTitle(s, "Paired sections, two stains: host transcripts and microbial 16S in register.", {
    y: 1.1, h: 1.4, size: 30,
  });

  // ---- Left: two stacked section diagrams ----
  const lX = MARGIN_X;
  s.addText("PER-ZONE SERIAL SECTIONS", {
    x: lX, y: 2.7, w: 5, h: 0.35,
    fontFace: FONT.body, fontSize: 11, color: COLOR.muted,
    charSpacing: 4, margin: 0,
  });

  // Section A card
  const secW = 5.2;
  const secH = 1.6;
  const secAy = 3.15;
  s.addShape(pres.shapes.RECTANGLE, {
    x: lX, y: secAy, w: secW, h: secH,
    fill: { color: COLOR.cardCream },
    line: { color: COLOR.body, width: 0.75 },
  });
  s.addText("SECTION A · HOST mRNA", {
    x: lX + 0.25, y: secAy + 0.12, w: secW - 0.5, h: 0.3,
    fontFace: FONT.mono, fontSize: 11, color: COLOR.forest,
    charSpacing: 2, margin: 0,
  });
  // tissue oval with inner grid (stylized)
  const ovAX = lX + secW / 2 - 1.3;
  const ovAY = secAy + 0.55;
  s.addShape(pres.shapes.OVAL, {
    x: ovAX, y: ovAY, w: 2.6, h: 0.85,
    fill: { color: COLOR.cardCream }, line: { color: COLOR.ink, width: 0.75 },
  });
  // small grid inside oval
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 8; c++) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: ovAX + 0.4 + c * 0.22, y: ovAY + 0.15 + r * 0.2, w: 0.2, h: 0.18,
        fill: { color: "A7C185" }, line: { color: "7A9A6A", width: 0.3 },
      });
    }
  }

  // Section B card
  const secBy = 5.05;
  s.addShape(pres.shapes.RECTANGLE, {
    x: lX, y: secBy, w: secW, h: secH,
    fill: { color: COLOR.cardCream },
    line: { color: COLOR.body, width: 0.75 },
  });
  s.addText("SECTION B · MICROBIAL 16S (HiPR–FISH)", {
    x: lX + 0.25, y: secBy + 0.12, w: secW - 0.5, h: 0.3,
    fontFace: FONT.mono, fontSize: 11, color: COLOR.terracotta,
    charSpacing: 2, margin: 0,
  });
  const ovBX = lX + secW / 2 - 1.3;
  const ovBY = secBy + 0.55;
  s.addShape(pres.shapes.OVAL, {
    x: ovBX, y: ovBY, w: 2.6, h: 0.85,
    fill: { color: COLOR.cardCream }, line: { color: COLOR.ink, width: 0.75 },
  });
  // Inner oval + scattered microbial dots around it
  s.addShape(pres.shapes.OVAL, {
    x: ovBX + 0.5, y: ovBY + 0.2, w: 1.6, h: 0.45,
    fill: { color: COLOR.cardCream }, line: { color: COLOR.ink, width: 0.5 },
  });
  const dotCount = 28;
  for (let i = 0; i < dotCount; i++) {
    const angle = (i / dotCount) * Math.PI * 2;
    const rx = 1.1; const ry = 0.34;
    const cx = ovBX + 1.3 + Math.cos(angle) * rx;
    const cy = ovBY + 0.425 + Math.sin(angle) * ry;
    s.addShape(pres.shapes.OVAL, {
      x: cx - 0.05, y: cy - 0.05, w: 0.1, h: 0.1,
      fill: { color: i % 3 === 0 ? COLOR.forest : COLOR.terracotta },
      line: { type: "none" },
    });
  }

  // Registration bracket (right side of the two sections)
  const bX = lX + secW + 0.1;
  s.addShape(pres.shapes.LINE, {
    x: bX, y: secAy + 0.4, w: 0, h: secBy + secH - secAy - 0.8,
    line: { color: COLOR.body, width: 1 },
  });
  s.addShape(pres.shapes.LINE, {
    x: bX, y: secAy + 0.4, w: 0.2, h: 0,
    line: { color: COLOR.body, width: 1 },
  });
  s.addShape(pres.shapes.LINE, {
    x: bX, y: secBy + secH - 0.4, w: 0.2, h: 0,
    line: { color: COLOR.body, width: 1 },
  });
  s.addText("REGISTER", {
    x: bX + 0.2, y: (secAy + secBy + secH) / 2 - 0.2, w: 0.5, h: 0.4,
    fontFace: FONT.mono, fontSize: 11, color: COLOR.body,
    charSpacing: 2, valign: "middle", margin: 0,
  });

  // ---- Right: What We Measure ----
  const rX = 7.5;
  s.addText("WHAT WE MEASURE", {
    x: rX, y: 2.7, w: 5, h: 0.35,
    fontFace: FONT.body, fontSize: 11, color: COLOR.muted,
    charSpacing: 4, margin: 0,
  });

  const items = [
    {
      label: "SECTION A",
      title: "Visium HD / Stereo-seq",
      body:  "Host mRNA at ~2 µm bins → cell-type map of the same tissue slice",
      color: COLOR.terracotta,
    },
    {
      label: "SECTION B (SERIAL)",
      title: "HiPR-FISH (10-probe combinatorial)",
      body:  "Up to 10²–10³ taxa localized in situ on matched anatomy",
      color: COLOR.terracotta,
    },
    {
      label: "REGISTRATION",
      title: "Shared fiducials + DAPI anatomy",
      body:  "Host cell state ↔ microbial neighborhood at single-cell radius",
      color: COLOR.terracotta,
    },
  ];
  let iy = 3.15;
  const rowH = 1.1;
  items.forEach((it) => {
    // left accent bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: rX, y: iy + 0.05, w: 0.04, h: rowH - 0.15,
      fill: { color: it.color }, line: { color: it.color, width: 0 },
    });
    s.addText(it.label, {
      x: rX + 0.2, y: iy, w: 5, h: 0.3,
      fontFace: FONT.body, fontSize: 11, color: it.color,
      charSpacing: 4, margin: 0,
    });
    s.addText(it.title, {
      x: rX + 0.2, y: iy + 0.28, w: 5.2, h: 0.4,
      fontFace: FONT.head, fontSize: 16, color: COLOR.ink,
      valign: "top", margin: 0,
    });
    s.addText(it.body, {
      x: rX + 0.2, y: iy + 0.68, w: 5.2, h: 0.4,
      fontFace: FONT.body, fontSize: 11, color: COLOR.body,
      valign: "top", margin: 0,
    });
    iy += rowH;
  });

  // hairline + controls note
  const ctrlY = iy + 0.1;
  s.addShape(pres.shapes.LINE, {
    x: rX, y: ctrlY, w: W - rX - MARGIN_X, h: 0,
    line: { color: COLOR.hairline, width: 0.5 },
  });
  s.addText(
    "Controls: axenic sections (probe specificity), mock SynCom of labeled isolates (abundance ground truth), and cross-validation against Aim 1's dissociated readouts.",
    {
      x: rX, y: ctrlY + 0.12, w: W - rX - MARGIN_X, h: 0.8,
      fontFace: FONT.body, fontSize: 11, color: COLOR.body, italic: true,
      valign: "top", margin: 0,
    }
  );
}

// ======================================================================
// SLIDE 8  —  Publication roadmap + Gantt timeline
// ======================================================================
function slide8() {
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  addEyebrow(s, "PUBLICATION ROADMAP & TIMELINE", "08 / 08");

  addTitle(s, "Two first-author papers, bridged by a shared integrated dataset.", {
    y: 1.1, h: 1.0, size: 34,
  });

  // ---- Two paper cards ----
  const cardY = 2.5;
  const cardH = 2.4;
  const gap = 0.3;
  const totalW = W - 2 * MARGIN_X;
  const cardW = (totalW - gap) / 2;

  // Paper 01 card
  const c1X = MARGIN_X;
  s.addShape(pres.shapes.LINE, {
    x: c1X, y: cardY, w: cardW, h: 0,
    line: { color: COLOR.forest, width: 2 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: c1X, y: cardY + 0.02, w: cardW, h: cardH - 0.02,
    fill: { color: "EADFC4" },
    line: { color: "EADFC4", width: 0 },
  });
  s.addText("PAPER 01 · TARGET SUBMISSION Q4 2026", {
    x: c1X + 0.3, y: cardY + 0.25, w: cardW - 0.6, h: 0.35,
    fontFace: FONT.body, fontSize: 11, color: COLOR.forest,
    charSpacing: 3, margin: 0,
  });
  s.addText("A single-nucleus atlas of cereal root cell responses to a defined SynCom", {
    x: c1X + 0.3, y: cardY + 0.7, w: cardW - 0.6, h: 0.95,
    fontFace: FONT.head, fontSize: 17, color: COLOR.ink,
    valign: "top", margin: 0,
  });
  s.addText("First paired maize + wheat snRNA-seq atlas under microbial challenge; identifies cell-type-specific response modules.", {
    x: c1X + 0.3, y: cardY + 1.55, w: cardW - 0.6, h: 0.6,
    fontFace: FONT.body, fontSize: 11, color: COLOR.body,
    valign: "top", margin: 0,
  });
  s.addText("TARGET: NATURE PLANTS / CELL HOST & MICROBE", {
    x: c1X + 0.3, y: cardY + cardH - 0.38, w: cardW - 0.6, h: 0.3,
    fontFace: FONT.body, fontSize: 10, color: COLOR.muted,
    charSpacing: 3, margin: 0,
  });

  // Paper 02 card
  const c2X = c1X + cardW + gap;
  s.addShape(pres.shapes.LINE, {
    x: c2X, y: cardY, w: cardW, h: 0,
    line: { color: COLOR.terracotta, width: 2 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: c2X, y: cardY + 0.02, w: cardW, h: cardH - 0.02,
    fill: { color: "EADFC4" },
    line: { color: "EADFC4", width: 0 },
  });
  s.addText("PAPER 02 · TARGET SUBMISSION Q3 2027", {
    x: c2X + 0.3, y: cardY + 0.25, w: cardW - 0.6, h: 0.35,
    fontFace: FONT.body, fontSize: 11, color: COLOR.terracotta,
    charSpacing: 3, margin: 0,
  });
  s.addText("Spatially-resolved microbial neighborhoods map onto root cell states", {
    x: c2X + 0.3, y: cardY + 0.7, w: cardW - 0.6, h: 0.95,
    fontFace: FONT.head, fontSize: 17, color: COLOR.ink,
    valign: "top", margin: 0,
  });
  s.addText("Integrates Aim 1 atlas with HiPR-FISH + spatial transcriptomics to link host cell identity to local microbial community composition.", {
    x: c2X + 0.3, y: cardY + 1.55, w: cardW - 0.6, h: 0.6,
    fontFace: FONT.body, fontSize: 11, color: COLOR.body,
    valign: "top", margin: 0,
  });
  s.addText("TARGET: NATURE MICROBIOLOGY / SCIENCE", {
    x: c2X + 0.3, y: cardY + cardH - 0.38, w: cardW - 0.6, h: 0.3,
    fontFace: FONT.body, fontSize: 10, color: COLOR.muted,
    charSpacing: 3, margin: 0,
  });

  // ---- Timeline Gantt ----
  const timelineY = 5.35;
  s.addText("TIMELINE — Y2 → Y5", {
    x: MARGIN_X, y: timelineY, w: 4, h: 0.3,
    fontFace: FONT.body, fontSize: 11, color: COLOR.muted,
    charSpacing: 4, margin: 0,
  });

  const quarters = ["Y2 Q3", "Y2 Q4", "Y3 Q1", "Y3 Q2", "Y3 Q3", "Y3 Q4",
                    "Y4 Q1", "Y4 Q2", "Y4 Q3", "Y4 Q4", "Y5 Q1", "Y5 Q2"];
  const tlX = MARGIN_X;
  const tlW = W - 2 * MARGIN_X;
  const slotW = tlW / quarters.length;
  const barY = timelineY + 0.4;
  const barH = 0.25;

  // Color blocks per quarter
  // Phases: 0=setup (grey), 1=Paper1 data (forest), 2=Paper1 submit (deep green),
  //         3=Paper2 spatial (terracotta), 4=Paper2 submit (deep terracotta), 5=thesis (ink)
  const phaseColors = ["9A9A8E", "3F5E2A", "2C4A2B", "C26A33", "8A4A22", "1B2420"];
  const phaseByQ = [0, 0, 1, 1, 1, 1, 3, 3, 3, 4, 5, 5];
  // Note: slide shows grey at Y2 Q3, dark green at Y2 Q4 (Paper 1 submission start),
  // then forest green bars through Y3, terracotta Y4, deep terracotta end of Y4, ink for Y5.
  // Mapping to match the thumbnail more closely:
  const phaseByQ2 = [0, 2, 1, 1, 1, 4, 3, 3, 3, 3, 5, 5];

  quarters.forEach((q, i) => {
    const x = tlX + i * slotW;
    // bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.05, y: barY, w: slotW - 0.1, h: barH,
      fill: { color: phaseColors[phaseByQ2[i]] },
      line: { color: phaseColors[phaseByQ2[i]], width: 0 },
    });
    // quarter label below
    s.addText(q, {
      x, y: barY + barH + 0.08, w: slotW, h: 0.3,
      fontFace: FONT.body, fontSize: 10, color: COLOR.body,
      align: "center", charSpacing: 1, margin: 0,
    });
  });

  // Legend (two rows)
  const legY1 = barY + 0.95;
  const legY2 = legY1 + 0.35;
  const legend1 = [
    { c: phaseColors[0], t: "SYNCOM & GNOTOBIOTIC SETUP" },
    { c: phaseColors[1], t: "PAPER 1 — DATA & ANALYSIS" },
    { c: phaseColors[2], t: "PAPER 1 — SUBMISSION" },
  ];
  const legend2 = [
    { c: phaseColors[3], t: "PAPER 2 — SPATIAL DATA" },
    { c: phaseColors[4], t: "PAPER 2 — SUBMISSION" },
    { c: phaseColors[5], t: "THESIS WRITING & DEFENSE" },
  ];

  function drawLegend(items, y) {
    let lx = MARGIN_X;
    items.forEach((item) => {
      s.addShape(pres.shapes.OVAL, {
        x: lx, y: y + 0.06, w: 0.16, h: 0.16,
        fill: { color: item.c }, line: { color: item.c, width: 0 },
      });
      s.addText(item.t, {
        x: lx + 0.24, y, w: 3.8, h: 0.3,
        fontFace: FONT.body, fontSize: 10, color: COLOR.ink,
        charSpacing: 3, valign: "middle", margin: 0,
      });
      lx += 4.0;
    });
  }
  drawLegend(legend1, legY1);
  drawLegend(legend2, legY2);
}

// ---------- build all ----------
slide1();
slide2();
slide3();
slide4();
slide5();
slide6();
slide7();
slide8();

pres.writeFile({ fileName: "committee_presentation.pptx" })
  .then((fn) => console.log("Wrote:", fn));
