// Recreation of 70_s.pptx — "Maison Solène" deck
// Uses pptxgenjs. Run: node recreate.js
const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.defineLayout({ name: "MS_WIDE", width: 20, height: 11.25 });
pres.layout = "MS_WIDE";
pres.author = "Maison Solène";
pres.title = "Maison Solène — Vol. I";

// -------- Palette --------
const C = {
  sienna:     "D98656",
  siennaDeep: "C4653A",
  oxblood:    "5A1E10",
  brownDeep:  "3D2418",
  brownDark:  "2A1A10",
  espresso:   "25160C",
  cream:      "FDF2D5",
  creamLt:    "FFF8E6",
  sand:       "E8DCC2",
  paper:      "F1E7D3",
  gold:       "E8B866",
  goldLt:     "F6D89A",
  ochre:      "C8953A",
  wheat:      "D9A856",
  terra:      "A04A24",
  plum:       "5A2A3A",
  olive:      "6B7A3A",
  forest:     "3D4A1E",
  forestDk:   "191E0C",
  olive2:     "4A5A2A",
  brick:      "7E3A1C",
};

const FONT_SERIF = "Georgia";
const FONT_MONO = "Consolas";
const FONT_SANS = "Calibri";

// Slide dims
const W = 20;
const H = 11.25;

// -------- Helper: header bar (page no · title · M · S) --------
function addHeader(slide, pageNum, title, inkColor, lineColor) {
  slide.addText(`${pageNum} / 08`, {
    x: 0.7, y: 0.45, w: 2, h: 0.4,
    fontFace: FONT_MONO, fontSize: 11, color: inkColor, charSpacing: 3,
    margin: 0,
  });
  slide.addText(`— ${title} —`, {
    x: 7, y: 0.45, w: 6, h: 0.4,
    fontFace: FONT_MONO, fontSize: 11, color: inkColor, align: "center", charSpacing: 3,
    margin: 0,
  });
  slide.addText([
    { text: "M", options: { fontFace: FONT_SERIF, italic: false } },
    { text: "  ·  ", options: { fontFace: FONT_MONO } },
    { text: "S", options: { fontFace: FONT_SERIF } },
  ], {
    x: W - 2.7, y: 0.45, w: 2, h: 0.4,
    fontSize: 12, color: inkColor, align: "right", charSpacing: 2,
    margin: 0,
  });
  slide.addShape(pres.shapes.LINE, {
    x: 0.7, y: 0.95, w: W - 1.4, h: 0,
    line: { color: lineColor, width: 0.5 },
  });
}

// Header monogram used on title/closing slides
function addMonogram(slide, x, y, color) {
  slide.addText([
    { text: "M", options: { fontFace: FONT_SERIF } },
    { text: "  ·  ", options: { fontFace: FONT_MONO } },
    { text: "S", options: { fontFace: FONT_SERIF } },
  ], {
    x, y, w: 2, h: 0.5,
    fontSize: 14, color, charSpacing: 3, margin: 0,
  });
}

// ============================================================
// SLIDE 1 — COVER
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.sienna };

  // Decorative circles (top-left big, bottom-right smaller)
  s.addShape(pres.shapes.OVAL, {
    x: -2.5, y: -2.5, w: 6.5, h: 6.5,
    fill: { color: C.goldLt, transparency: 75 },
    line: { type: "none" },
  });
  s.addShape(pres.shapes.OVAL, {
    x: W - 2.5, y: H - 4, w: 3.5, h: 3.5,
    fill: { color: C.goldLt, transparency: 80 },
    line: { type: "none" },
  });

  // Outer frame (thin cream rectangle border)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.4, w: W - 1.0, h: H - 0.8,
    fill: { type: "none" },
    line: { color: C.creamLt, width: 0.5, transparency: 40 },
  });

  // Dark footer band
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: H - 1.85, w: W, h: 1.85,
    fill: { color: C.brownDeep }, line: { type: "none" },
  });

  // Re-draw frame bottom over footer (thin line)
  s.addShape(pres.shapes.LINE, {
    x: 0.5, y: H - 0.4, w: W - 1.0, h: 0,
    line: { color: C.creamLt, width: 0.5, transparency: 40 },
  });

  // Top-left monogram
  addMonogram(s, 0.9, 0.75, C.creamLt);

  // Top-right tagline
  s.addText("A HOUSE OF INTERIORS  ·  EST. 2026", {
    x: W - 7.5, y: 0.8, w: 6.6, h: 0.4,
    fontFace: FONT_MONO, fontSize: 12, color: C.creamLt,
    align: "right", charSpacing: 4, margin: 0,
  });

  // Main title — "Maison Solène"
  s.addText([
    { text: "Maison ", options: { italic: false } },
    { text: "Solène", options: { italic: true } },
  ], {
    x: 0.7, y: 3.5, w: W - 1.4, h: 3.2,
    fontFace: FONT_SERIF, fontSize: 165, color: C.cream,
    align: "center", valign: "middle", margin: 0,
    shadow: { type: "outer", color: "000000", blur: 18, offset: 4, angle: 135, opacity: 0.2 },
  });

  // Thin lines left/right under title
  s.addShape(pres.shapes.LINE, {
    x: 1.0, y: 6.9, w: 1.0, h: 0,
    line: { color: C.creamLt, width: 1 },
  });
  s.addShape(pres.shapes.LINE, {
    x: W - 2.0, y: 6.9, w: 1.0, h: 0,
    line: { color: C.creamLt, width: 1 },
  });

  // Footer text (inside dark band)
  s.addText("VELVET  ·  TRAVERTINE  ·  BURNT SIENNA  ·  SUN", {
    x: 0.5, y: H - 1.55, w: W - 1.0, h: 0.6,
    fontFace: FONT_MONO, fontSize: 14, color: C.cream,
    align: "center", charSpacing: 6, margin: 0,
  });

  s.addText("VOL. I  —  MMXXVI", {
    x: 1.0, y: H - 0.85, w: 5, h: 0.4,
    fontFace: FONT_MONO, fontSize: 11, color: C.cream,
    align: "left", charSpacing: 3, margin: 0,
  });
  s.addText("LOS ANGELES  ·  MARRAKECH", {
    x: W - 6.0, y: H - 0.85, w: 5, h: 0.4,
    fontFace: FONT_MONO, fontSize: 11, color: C.cream,
    align: "right", charSpacing: 3, margin: 0,
  });
}

// ============================================================
// SLIDE 2 — A MANIFESTO
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.oxblood };

  addHeader(s, "01", "A MANIFESTO", C.cream, C.cream);

  // Right-side sun/circle composition
  s.addShape(pres.shapes.OVAL, {
    x: W - 6.5, y: -2.5, w: 9, h: 9,
    fill: { color: C.brownDeep, transparency: 40 }, line: { type: "none" },
  });
  s.addShape(pres.shapes.OVAL, {
    x: W - 4.8, y: 0.8, w: 4.8, h: 4.8,
    fill: { color: C.gold, transparency: 40 }, line: { type: "none" },
  });
  s.addShape(pres.shapes.OVAL, {
    x: W - 3.8, y: 1.6, w: 3.0, h: 3.0,
    fill: { color: C.goldLt }, line: { type: "none" },
  });

  // Section label
  s.addText("WE BELIEVE", {
    x: 1.0, y: 1.7, w: 6, h: 0.5,
    fontFace: FONT_MONO, fontSize: 13, color: C.gold,
    charSpacing: 6, margin: 0,
  });

  // Big title "A room should hum."
  s.addText([
    { text: "A room",   options: { breakLine: true } },
    { text: "should",   options: { breakLine: true } },
    { text: "hum.",     options: { italic: true, color: C.gold } },
  ], {
    x: 1.0, y: 2.3, w: 9, h: 5.5,
    fontFace: FONT_SERIF, fontSize: 88, color: C.cream,
    valign: "top", margin: 0, paraSpaceAfter: 0,
  });

  // Right body paragraph (under sun)
  s.addText([
    { text: "Modernism asked rooms to be ", options: {} },
    { text: "quiet.", options: { italic: true, color: C.gold } },
    { text: " We disagree. A home is a body — it should be warm to the touch, generous at the hip, and honest about its desires.", options: {} },
  ], {
    x: 10.2, y: 5.6, w: 8.3, h: 1.6,
    fontFace: FONT_SANS, fontSize: 16, color: C.cream,
    valign: "top", margin: 0, paraSpaceAfter: 6,
  });

  s.addText([
    { text: "We design interiors the way a good record is pressed: with ", options: {} },
    { text: "heat,", options: { italic: true, color: C.gold } },
    { text: " with ", options: {} },
    { text: "grain,", options: { italic: true, color: C.gold } },
    { text: " with a first side you can't skip.", options: {} },
  ], {
    x: 10.2, y: 7.4, w: 8.3, h: 1.2,
    fontFace: FONT_SANS, fontSize: 16, color: C.cream,
    valign: "top", margin: 0,
  });

  // Signature block (S in circle + name)
  s.addShape(pres.shapes.OVAL, {
    x: 10.3, y: 9.1, w: 0.7, h: 0.7,
    fill: { type: "none" }, line: { color: C.gold, width: 1 },
  });
  s.addText("S", {
    x: 10.3, y: 9.1, w: 0.7, h: 0.7,
    fontFace: FONT_SERIF, fontSize: 18, color: C.gold,
    align: "center", valign: "middle", margin: 0,
  });
  s.addText("Solène Darrieux", {
    x: 11.2, y: 9.1, w: 5, h: 0.4,
    fontFace: FONT_SERIF, fontSize: 20, color: C.gold,
    italic: true, margin: 0,
  });
  s.addText("FOUNDER  ·  CREATIVE DIRECTOR", {
    x: 11.2, y: 9.5, w: 6, h: 0.3,
    fontFace: FONT_MONO, fontSize: 10, color: C.cream,
    charSpacing: 4, margin: 0,
  });

  // Bottom page marker
  s.addText("—  i  —", {
    x: 0, y: H - 0.5, w: W, h: 0.3,
    fontFace: FONT_MONO, fontSize: 10, color: C.cream,
    align: "center", charSpacing: 4, margin: 0,
  });
}

// ============================================================
// SLIDE 3 — THE ERA, REIMAGINED
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.paper };

  addHeader(s, "02", "THE ERA, REIMAGINED", C.brownDeep, C.brownDeep);

  // Title
  s.addText([
    { text: "Not a revival. A", options: { breakLine: true } },
    { text: "continuation.",   options: { italic: true, color: C.siennaDeep } },
  ], {
    x: 0.7, y: 1.4, w: 12, h: 2.6,
    fontFace: FONT_SERIF, fontSize: 72, color: C.brownDeep,
    valign: "top", margin: 0,
  });

  // Right paragraph
  s.addText("We take the gestures that made the 1970s the last great interior decade — warmth, curve, craft, conversation — and build them for a family that travels, collects, and entertains in 2026.", {
    x: 13.3, y: 1.55, w: 5.8, h: 2.2,
    fontFace: FONT_SANS, fontSize: 15, color: C.brownDeep,
    valign: "top", margin: 0, paraSpaceAfter: 0,
  });

  // Swatch grid — 1 big left (tall), 2x2 on right
  // Big left card (wheat)
  const leftX = 0.7, leftY = 4.3, leftW = 8.5, leftH = 5.9;
  s.addShape(pres.shapes.RECTANGLE, {
    x: leftX, y: leftY, w: leftW, h: leftH,
    fill: { color: C.wheat }, line: { type: "none" },
  });
  s.addText("THE CONVERSATION PIT", {
    x: leftX + 0.35, y: leftY + leftH - 0.85, w: leftW * 0.65, h: 0.4,
    fontFace: FONT_SERIF, fontSize: 18, color: C.creamLt,
    italic: true, charSpacing: 2, margin: 0,
  });
  s.addText("NO. 01 · SUNKEN", {
    x: leftX + leftW * 0.55, y: leftY + leftH - 0.8, w: leftW * 0.42, h: 0.35,
    fontFace: FONT_MONO, fontSize: 10, color: C.creamLt,
    align: "right", charSpacing: 2, margin: 0, transparency: 30,
  });

  // 2x2 right grid
  const rgX = 9.5, rgY = 4.3;
  const cellW = 4.75, cellH = 2.85, gap = 0.2;

  // Row 1
  // Plum
  s.addShape(pres.shapes.RECTANGLE, {
    x: rgX, y: rgY, w: cellW, h: cellH,
    fill: { color: C.plum }, line: { type: "none" },
  });
  s.addText([
    { text: "ARCHES &", options: { breakLine: true } },
    { text: "APERTURE",  options: {} },
  ], {
    x: rgX + 0.25, y: rgY + cellH - 1.1, w: cellW * 0.5, h: 0.9,
    fontFace: FONT_SERIF, fontSize: 14, color: C.creamLt, italic: true,
    margin: 0,
  });
  s.addText([
    { text: "NO. 02",  options: { breakLine: true } },
    { text: "OPENINGS", options: {} },
  ], {
    x: rgX + cellW * 0.5, y: rgY + cellH - 0.85, w: cellW * 0.47, h: 0.7,
    fontFace: FONT_MONO, fontSize: 9, color: C.creamLt,
    align: "right", charSpacing: 2, margin: 0,
  });

  // Olive
  s.addShape(pres.shapes.RECTANGLE, {
    x: rgX + cellW + gap, y: rgY, w: cellW, h: cellH,
    fill: { color: C.olive }, line: { type: "none" },
  });
  s.addText("BOUCLÉ & CORK", {
    x: rgX + cellW + gap + 0.25, y: rgY + cellH - 0.7, w: cellW * 0.55, h: 0.45,
    fontFace: FONT_SERIF, fontSize: 14, color: C.creamLt, italic: true,
    margin: 0,
  });
  s.addText("NO. 03  ·  SURFACES", {
    x: rgX + cellW + gap + cellW * 0.5, y: rgY + cellH - 0.65, w: cellW * 0.47, h: 0.35,
    fontFace: FONT_MONO, fontSize: 9, color: C.creamLt,
    align: "right", charSpacing: 2, margin: 0,
  });

  // Row 2
  // Dark brown
  s.addShape(pres.shapes.RECTANGLE, {
    x: rgX, y: rgY + cellH + gap, w: cellW, h: cellH,
    fill: { color: C.brownDeep }, line: { type: "none" },
  });
  s.addText("THE WARM PALETTE", {
    x: rgX + 0.25, y: rgY + cellH * 2 + gap - 0.7, w: cellW * 0.55, h: 0.45,
    fontFace: FONT_SERIF, fontSize: 14, color: C.creamLt, italic: true,
    margin: 0,
  });
  s.addText("NO. 04  ·  COLOR", {
    x: rgX + cellW * 0.5, y: rgY + cellH * 2 + gap - 0.65, w: cellW * 0.47, h: 0.35,
    fontFace: FONT_MONO, fontSize: 9, color: C.creamLt,
    align: "right", charSpacing: 2, margin: 0,
  });

  // Ochre
  s.addShape(pres.shapes.RECTANGLE, {
    x: rgX + cellW + gap, y: rgY + cellH + gap, w: cellW, h: cellH,
    fill: { color: C.ochre }, line: { type: "none" },
  });
  s.addText("SUNSET STRIPES", {
    x: rgX + cellW + gap + 0.25, y: rgY + cellH * 2 + gap - 0.7, w: cellW * 0.55, h: 0.45,
    fontFace: FONT_SERIF, fontSize: 14, color: C.creamLt, italic: true,
    margin: 0,
  });
  s.addText("NO. 05  ·  PATTERN", {
    x: rgX + cellW + gap + cellW * 0.5, y: rgY + cellH * 2 + gap - 0.65, w: cellW * 0.47, h: 0.35,
    fontFace: FONT_MONO, fontSize: 9, color: C.creamLt,
    align: "right", charSpacing: 2, margin: 0,
  });

  // Bottom footer
  s.addText("ARCHIVE PLATE  ·  02", {
    x: 0.7, y: H - 0.55, w: 5, h: 0.3,
    fontFace: FONT_MONO, fontSize: 10, color: C.brownDeep,
    charSpacing: 3, margin: 0,
  });
  s.addText("SAMPLED FROM A 1973 VERNER PANTON SHOWROOM", {
    x: 5, y: H - 0.55, w: 10, h: 0.3,
    fontFace: FONT_MONO, fontSize: 10, color: C.brownDeep, transparency: 30,
    align: "center", charSpacing: 3, margin: 0,
  });
  addMonogram(s, W - 2.5, H - 0.6, C.brownDeep);
}

// ============================================================
// SLIDE 4 — HOUSE RULES
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.sand };

  addHeader(s, "03", "HOUSE RULES", C.brownDeep, C.brownDeep);

  // Title
  s.addText([
    { text: "Our ",          options: {} },
    { text: "philosophy,",   options: { italic: true, color: C.terra } },
    { text: " in",           options: { breakLine: true } },
    { text: "four rooms.",   options: {} },
  ], {
    x: 0.7, y: 1.4, w: 12, h: 2.7,
    fontFace: FONT_SERIF, fontSize: 72, color: C.brownDeep,
    valign: "top", margin: 0,
  });

  // Right body
  s.addText("Every project is governed by four simple rules, in order. When a decision gets hard, we run it through them, top to bottom, until one answers.", {
    x: 13.3, y: 2.4, w: 5.8, h: 1.5,
    fontFace: FONT_SANS, fontSize: 14, color: C.brownDeep,
    valign: "top", margin: 0,
  });

  // Divider line across middle
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 4.6, w: W - 1.4, h: 0,
    line: { color: C.brownDeep, width: 0.5, transparency: 50 },
  });

  // Four columns of rules
  const rules = [
    { num: "i.",   title: ["Soft before ", "sharp."],  body: "Every hard edge earns its place. Curves first — arches, bouclé, banquettes — then, only where needed, the knife-edge of travertine or brass.", label: "— FORM —" },
    { num: "ii.",  title: ["Warm before ", "cool."],   body: "We build palettes from the sun outward — terracotta, ochre, cognac, oxblood. Cool tones appear as punctuation, never as the sentence.",       label: "— PALETTE —" },
    { num: "iii.", title: ["Made before ", "bought."], body: "Seventy percent of every project is commissioned — woven, carved, thrown, or upholstered by a named maker we can call by their first name.", label: "— CRAFT —" },
    { num: "iv.",  title: ["Lived before ", "styled."],body: "A home is not a photograph. We design for the second year, the dinner that runs late, the dog on the sofa, the record left out of its sleeve.",label: "— LIFE —" },
  ];

  const colStart = 0.7;
  const colW = (W - 1.4) / 4;
  const colTop = 4.85;

  rules.forEach((r, i) => {
    const cx = colStart + i * colW;

    // Vertical divider (except for first)
    if (i > 0) {
      s.addShape(pres.shapes.LINE, {
        x: cx, y: colTop, w: 0, h: 5.2,
        line: { color: C.brownDeep, width: 0.5, transparency: 60 },
      });
    }

    // Roman numeral (top right of column)
    s.addText(r.num, {
      x: cx + colW - 1.0, y: colTop + 0.05, w: 0.8, h: 0.6,
      fontFace: FONT_SERIF, fontSize: 26, color: C.terra, italic: true,
      align: "right", margin: 0,
    });

    // Icon / motif (simple geometric shape)
    if (i === 0) {
      // arch
      s.addShape(pres.shapes.ARC, {
        x: cx + 0.35, y: colTop + 0.2, w: 1.3, h: 0.9,
        fill: { type: "none" }, line: { color: C.terra, width: 1.5 },
      });
    } else if (i === 1) {
      // concentric circles / sun
      s.addShape(pres.shapes.OVAL, {
        x: cx + 0.35, y: colTop + 0.15, w: 1.1, h: 1.1,
        fill: { type: "none" }, line: { color: C.terra, width: 1 },
      });
      s.addShape(pres.shapes.OVAL, {
        x: cx + 0.55, y: colTop + 0.35, w: 0.7, h: 0.7,
        fill: { type: "none" }, line: { color: C.terra, width: 1 },
      });
      s.addShape(pres.shapes.OVAL, {
        x: cx + 0.7, y: colTop + 0.5, w: 0.4, h: 0.4,
        fill: { color: C.gold }, line: { type: "none" },
      });
    } else if (i === 2) {
      // grid pattern
      for (let gx = 0; gx < 4; gx++) {
        s.addShape(pres.shapes.LINE, {
          x: cx + 0.35 + gx * 0.25, y: colTop + 0.2, w: 0, h: 0.9,
          line: { color: C.terra, width: 1 },
        });
      }
      for (let gy = 0; gy < 4; gy++) {
        s.addShape(pres.shapes.LINE, {
          x: cx + 0.35, y: colTop + 0.2 + gy * 0.3, w: 0.75, h: 0,
          line: { color: C.terra, width: 1 },
        });
      }
    } else {
      // squiggle + dots
      s.addShape(pres.shapes.OVAL, {
        x: cx + 0.35, y: colTop + 0.2, w: 0.18, h: 0.18,
        fill: { color: C.terra }, line: { type: "none" },
      });
      s.addShape(pres.shapes.OVAL, {
        x: cx + 1.4, y: colTop + 0.3, w: 0.2, h: 0.2,
        fill: { color: C.gold }, line: { type: "none" },
      });
      s.addShape(pres.shapes.LINE, {
        x: cx + 0.4, y: colTop + 0.7, w: 1.1, h: 0,
        line: { color: C.terra, width: 1.5 },
      });
    }

    // Title
    s.addText([
      { text: r.title[0], options: {} },
      { text: r.title[1], options: { italic: true, color: C.terra } },
    ], {
      x: cx + 0.3, y: colTop + 1.45, w: colW - 0.5, h: 0.7,
      fontFace: FONT_SERIF, fontSize: 24, color: C.brownDeep,
      margin: 0,
    });

    // Body
    s.addText(r.body, {
      x: cx + 0.3, y: colTop + 2.25, w: colW - 0.5, h: 2.0,
      fontFace: FONT_SANS, fontSize: 12, color: C.brownDeep,
      valign: "top", margin: 0,
    });

    // Bottom rule line
    s.addShape(pres.shapes.LINE, {
      x: cx + 0.3, y: colTop + 4.6, w: colW - 0.6, h: 0,
      line: { color: C.terra, width: 0.5 },
    });

    // Label
    s.addText(r.label, {
      x: cx + 0.3, y: colTop + 4.75, w: colW - 0.5, h: 0.3,
      fontFace: FONT_MONO, fontSize: 10, color: C.terra,
      charSpacing: 4, margin: 0,
    });
  });
}

// ============================================================
// SLIDE 5 — WHAT WE DO
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.forest };

  addHeader(s, "04", "WHAT WE DO", C.cream, C.cream);

  // Title (left)
  s.addText([
    { text: "Four",         options: { breakLine: true } },
    { text: "movements,",   options: { italic: true, color: C.gold } },
    { text: " one",         options: { breakLine: true } },
    { text: "house.",       options: {} },
  ], {
    x: 0.7, y: 1.4, w: 9.5, h: 4.5,
    fontFace: FONT_SERIF, fontSize: 80, color: C.cream,
    valign: "top", margin: 0,
  });

  // Intro body
  s.addText("We work with a small number of clients each year — typically four to six residences, one hospitality project, and one object we believe in enough to manufacture.", {
    x: 0.7, y: 6.3, w: 8, h: 1.2,
    fontFace: FONT_SANS, fontSize: 14, color: C.cream,
    margin: 0,
  });

  // Big image placeholder (gold block, bottom-left)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 7.7, w: 8, h: 3.0,
    fill: { color: C.gold }, line: { type: "none" },
  });
  s.addText("THE ATELIER  ·  VENICE CA", {
    x: 0.9, y: 10.3, w: 5, h: 0.3,
    fontFace: FONT_MONO, fontSize: 11, color: C.cream,
    charSpacing: 3, margin: 0,
  });
  s.addText("PLATE V  ·  A", {
    x: 5.9, y: 10.3, w: 2.6, h: 0.3,
    fontFace: FONT_MONO, fontSize: 11, color: C.cream,
    align: "right", charSpacing: 3, margin: 0,
  });

  // Right side: 4 row items
  const services = [
    { num: "i.",   title: "Full Residence", body: "Architectural collaboration, interior scheme, commissioned furniture, art & object curation, installation.", dur: "12 – 24 MO" },
    { num: "ii.",  title: "Single Room",    body: "One room, designed as if it were the only room — usually a primary suite, library, or conversation room.", dur: "4 – 8 MO" },
    { num: "iii.", title: "Hospitality",    body: "Boutique hotels, restaurants and private clubs where guests should feel they have arrived somewhere with a point of view.", dur: "18 – 36 MO" },
    { num: "iv.",  title: "The Atelier",    body: "A small line of commissioned pieces — lounge chairs, sconces, rugs — produced in editions of twelve.", dur: "BY EDITION" },
  ];

  const rX = 10.4, rY = 1.4, rW = W - 0.7 - rX;
  const rowH = 1.65;

  // Top line
  s.addShape(pres.shapes.LINE, {
    x: rX, y: rY, w: rW, h: 0,
    line: { color: C.cream, width: 0.5, transparency: 50 },
  });

  services.forEach((sv, i) => {
    const y = rY + 0.3 + i * rowH;
    s.addText(sv.num, {
      x: rX, y: y, w: 0.8, h: 0.6,
      fontFace: FONT_SERIF, fontSize: 22, color: C.gold, italic: true,
      margin: 0,
    });
    s.addText(sv.title, {
      x: rX + 0.7, y: y - 0.05, w: 3.0, h: 0.7,
      fontFace: FONT_SERIF, fontSize: 28, color: C.cream,
      margin: 0,
    });
    s.addText(sv.body, {
      x: rX + 3.9, y: y + 0.02, w: 3.8, h: 1.2,
      fontFace: FONT_SANS, fontSize: 12, color: C.cream,
      valign: "top", margin: 0,
    });
    s.addText(sv.dur, {
      x: rX + rW - 1.5, y: y + 0.05, w: 1.5, h: 0.3,
      fontFace: FONT_MONO, fontSize: 11, color: C.gold,
      align: "right", charSpacing: 3, margin: 0,
    });
    // Divider under row
    s.addShape(pres.shapes.LINE, {
      x: rX, y: y + rowH - 0.3, w: rW, h: 0,
      line: { color: C.cream, width: 0.5, transparency: 50 },
    });
  });

  // Bottom page marker
  s.addText("—  v  —", {
    x: W - 3, y: H - 0.5, w: 2.3, h: 0.3,
    fontFace: FONT_MONO, fontSize: 10, color: C.cream,
    align: "right", charSpacing: 4, margin: 0,
  });
}

// ============================================================
// SLIDE 6 — THE PROCESS
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.paper };

  addHeader(s, "05", "THE PROCESS", C.brownDeep, C.brownDeep);

  // Title
  s.addText([
    { text: "Five movements, one ", options: {} },
    { text: "house.",                options: { italic: true, color: C.siennaDeep } },
  ], {
    x: 0.7, y: 1.3, w: W - 1.4, h: 1.7,
    fontFace: FONT_SERIF, fontSize: 72, color: C.brownDeep,
    valign: "top", margin: 0,
  });

  // Intro (left)
  s.addText("Every project follows the same five phases — unhurried, legible, and billed against a fixed scope. No surprises except the ones we intend.", {
    x: 0.7, y: 3.5, w: 9, h: 1.0,
    fontFace: FONT_SANS, fontSize: 14, color: C.brownDeep,
    margin: 0,
  });

  // Typical span (right)
  s.addText("TYPICAL SPAN  ·  14 TO 24 MONTHS", {
    x: W - 7.5, y: 3.9, w: 6.8, h: 0.3,
    fontFace: FONT_MONO, fontSize: 12, color: C.siennaDeep,
    align: "right", charSpacing: 4, margin: 0,
  });

  // 5 phase cards
  const phases = [
    { phase: "PHASE I",   num: "01", title: "Listen",     body: "A long conversation in your current home. We learn how you live before we draw a single line.", time: "2 – 3 weeks", label: "CONVERSATION", arrow: "→  CONVERSATION",  bg: C.gold,       ink: C.brownDeep },
    { phase: "PHASE II",  num: "02", title: "Sketch",     body: "Plans, moodboards, material palettes, and a written brief presented as one bound volume.",      time: "6 – 10 weeks",label: "DRAWING",      arrow: "→  DRAWING",       bg: C.siennaDeep, ink: C.creamLt   },
    { phase: "PHASE III", num: "03", title: "Commission", body: "We place every order: mills, weavers, stone yards, the ceramicist in Puglia, the upholsterer in Lisbon.", time: "3 – 6 months", label: "PLACING",   arrow: "→  PROCUREMENT",   bg: C.terra,      ink: C.creamLt   },
    { phase: "PHASE IV",  num: "04", title: "Build",      body: "We live on site through every trade. No client decision asked twice. Daily photos in a private journal.", time: "6 – 14 mo",    label: "ON SITE",    arrow: "→  CONSTRUCTION",  bg: C.olive2,     ink: C.creamLt   },
    { phase: "PHASE V",   num: "05", title: "Install",    body: "Three days, start to finish. We hand you the keys with music on, a record playing, and dinner ready.",    time: "72 hours",     label: "THE HAND-OFF",arrow: "→  KEYS",         bg: C.brownDeep,  ink: C.creamLt   },
  ];

  const cardTop = 4.9;
  const cardH = 5.4;
  const cardGap = 0.15;
  const availW = W - 1.4;
  const cardW = (availW - cardGap * 4) / 5;

  phases.forEach((p, i) => {
    const cx = 0.7 + i * (cardW + cardGap);

    // Card bg
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardTop, w: cardW, h: cardH,
      fill: { color: p.bg }, line: { type: "none" },
    });

    // Top phase label + number
    s.addText(p.phase, {
      x: cx + 0.2, y: cardTop + 0.25, w: cardW - 0.8, h: 0.3,
      fontFace: FONT_MONO, fontSize: 9, color: p.ink, transparency: 25,
      charSpacing: 1, margin: 0,
    });
    s.addText(p.num, {
      x: cx + cardW - 0.55, y: cardTop + 0.25, w: 0.35, h: 0.3,
      fontFace: FONT_MONO, fontSize: 9, color: p.ink, transparency: 25,
      align: "right", charSpacing: 0, margin: 0,
    });

    // Icon (small geometric placeholder per phase)
    const iconX = cx + 0.3, iconY = cardTop + 0.85, iconSize = 0.8;
    if (i === 0) {
      // arch with dot (Listen)
      s.addShape(pres.shapes.ARC, {
        x: iconX, y: iconY, w: iconSize, h: iconSize,
        fill: { type: "none" }, line: { color: p.ink, width: 1.5 },
      });
      s.addShape(pres.shapes.OVAL, {
        x: iconX + iconSize/2 - 0.07, y: iconY + iconSize/2 - 0.07, w: 0.14, h: 0.14,
        fill: { color: p.ink }, line: { type: "none" },
      });
    } else if (i === 1) {
      // document (Sketch)
      s.addShape(pres.shapes.RECTANGLE, {
        x: iconX + 0.1, y: iconY, w: iconSize * 0.7, h: iconSize,
        fill: { type: "none" }, line: { color: p.ink, width: 1.5 },
      });
      for (let k = 0; k < 3; k++) {
        s.addShape(pres.shapes.LINE, {
          x: iconX + 0.2, y: iconY + 0.2 + k * 0.18, w: iconSize * 0.45, h: 0,
          line: { color: p.ink, width: 1 },
        });
      }
    } else if (i === 2) {
      // shapes grid (Commission)
      s.addShape(pres.shapes.OVAL, {
        x: iconX, y: iconY, w: 0.3, h: 0.3,
        fill: { type: "none" }, line: { color: p.ink, width: 1.5 },
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: iconX + 0.4, y: iconY, w: 0.3, h: 0.3,
        fill: { type: "none" }, line: { color: p.ink, width: 1.5 },
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: iconX, y: iconY + 0.45, w: 0.7, h: 0.3,
        fill: { type: "none" }, line: { color: p.ink, width: 1.5 },
      });
    } else if (i === 3) {
      // triangle/house (Build)
      s.addShape(pres.shapes.ISOSCELES_TRIANGLE, {
        x: iconX, y: iconY, w: iconSize, h: iconSize,
        fill: { type: "none" }, line: { color: p.ink, width: 1.5 },
      });
    } else {
      // plus in circle (Install)
      s.addShape(pres.shapes.OVAL, {
        x: iconX, y: iconY, w: iconSize, h: iconSize,
        fill: { type: "none" }, line: { color: p.ink, width: 1.5 },
      });
      s.addShape(pres.shapes.LINE, {
        x: iconX + 0.2, y: iconY + iconSize/2, w: iconSize - 0.4, h: 0,
        line: { color: p.ink, width: 1.5 },
      });
      s.addShape(pres.shapes.LINE, {
        x: iconX + iconSize/2, y: iconY + 0.2, w: 0, h: iconSize - 0.4,
        line: { color: p.ink, width: 1.5 },
      });
    }

    // Title
    s.addText(p.title, {
      x: cx + 0.25, y: cardTop + 2.0, w: cardW - 0.5, h: 0.7,
      fontFace: FONT_SERIF, fontSize: 28, color: p.ink, italic: true,
      margin: 0,
    });

    // Body
    s.addText(p.body, {
      x: cx + 0.25, y: cardTop + 2.85, w: cardW - 0.5, h: 1.7,
      fontFace: FONT_SANS, fontSize: 11, color: p.ink,
      valign: "top", margin: 0,
    });

    // Divider
    s.addShape(pres.shapes.LINE, {
      x: cx + 0.25, y: cardTop + 4.6, w: cardW - 0.5, h: 0,
      line: { color: p.ink, width: 0.5, transparency: 40 },
    });

    // Time (full card width)
    s.addText(p.time, {
      x: cx + 0.2, y: cardTop + 4.75, w: cardW - 0.4, h: 0.35,
      fontFace: FONT_SERIF, fontSize: 16, color: p.ink, italic: true,
      margin: 0,
    });

    // Arrow below card
    s.addText(p.arrow, {
      x: cx + 0.1, y: cardTop + cardH + 0.15, w: cardW + 0.3, h: 0.3,
      fontFace: FONT_MONO, fontSize: 9, color: C.siennaDeep,
      charSpacing: 2, margin: 0,
    });
  });
}

// ============================================================
// SLIDE 7 — A RECENT PROJECT
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.espresso };

  addHeader(s, "06", "A RECENT PROJECT", C.cream, C.cream);

  // Big pill/ellipse image (gold)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.7, y: 1.4, w: 10, h: 6.0,
    fill: { color: C.gold }, line: { type: "none" },
    rectRadius: 2.9,
  });

  // Plate caption (below ellipse)
  s.addText("PLATE VII  ·  CONVERSATION PIT, SOUTH ELEVATION", {
    x: 0.9, y: 6.9, w: 8, h: 0.3,
    fontFace: FONT_MONO, fontSize: 10, color: C.cream,
    charSpacing: 3, margin: 0,
  });
  s.addText("shot on Portra 400", {
    x: 8.3, y: 6.9, w: 2.3, h: 0.3,
    fontFace: FONT_SERIF, fontSize: 11, color: C.cream, italic: true,
    align: "right", margin: 0,
  });

  // 3 small swatches below
  const swatchY = 7.6, swatchW = 3.15, swatchH = 3.1, swatchGap = 0.2;
  const swatchColors = [
    { color: C.siennaDeep, label: "VII · B",  ink: C.cream },
    { color: C.gold,       label: "VII · C",  ink: C.brownDeep },
    { color: C.olive2,     label: "VII · D",  ink: C.cream },
  ];
  swatchColors.forEach((sw, i) => {
    const sx = 0.7 + i * (swatchW + swatchGap);
    s.addShape(pres.shapes.RECTANGLE, {
      x: sx, y: swatchY, w: swatchW, h: swatchH,
      fill: { color: sw.color }, line: { type: "none" },
    });
    s.addText(sw.label, {
      x: sx + 0.1, y: swatchY + swatchH - 0.45, w: swatchW - 0.2, h: 0.3,
      fontFace: FONT_MONO, fontSize: 10, color: sw.ink, transparency: 15,
      charSpacing: 0, margin: 0,
    });
  });

  // Right side: Case study
  const rX = 11.4;
  s.addText("CASE STUDY  ·  NO. 14", {
    x: rX, y: 1.5, w: 7, h: 0.35,
    fontFace: FONT_MONO, fontSize: 12, color: C.gold,
    charSpacing: 4, margin: 0,
  });

  s.addText([
    { text: "Casa",        options: { breakLine: true } },
    { text: "Albaricoque", options: { italic: true, color: C.siennaDeep } },
  ], {
    x: rX, y: 2.0, w: 8, h: 2.6,
    fontFace: FONT_SERIF, fontSize: 72, color: C.cream,
    valign: "top", margin: 0,
  });

  s.addText("A private residence above the Pacific, Malibu CA.", {
    x: rX, y: 4.7, w: 7.8, h: 0.5,
    fontFace: FONT_SERIF, fontSize: 18, color: C.cream, italic: true,
    margin: 0,
  });

  // Divider
  s.addShape(pres.shapes.LINE, {
    x: rX, y: 5.4, w: 7.8, h: 0,
    line: { color: C.cream, width: 0.5, transparency: 50 },
  });

  // Stats grid (2 columns x 3 rows)
  const stats = [
    ["SCOPE",     "Full residence",                 "FOOTPRINT",   "9,400 sq ft"],
    ["DURATION",  "22 months",                      "COMMISSIONS", "84 pieces"],
    ["MATERIALS", "Travertine · cork oak · wool bouclé", "COMPLETED", "Autumn 2025"],
  ];
  const statTop = 5.6;
  stats.forEach((row, i) => {
    const y = statTop + i * 0.85;
    s.addText(row[0], {
      x: rX, y, w: 3.8, h: 0.25,
      fontFace: FONT_MONO, fontSize: 10, color: C.gold,
      charSpacing: 3, margin: 0,
    });
    s.addText(row[1], {
      x: rX, y: y + 0.3, w: 3.8, h: 0.5,
      fontFace: FONT_SERIF, fontSize: 15, color: C.cream,
      valign: "top", margin: 0,
    });
    s.addText(row[2], {
      x: rX + 4.0, y, w: 3.8, h: 0.25,
      fontFace: FONT_MONO, fontSize: 10, color: C.gold,
      charSpacing: 3, margin: 0,
    });
    s.addText(row[3], {
      x: rX + 4.0, y: y + 0.3, w: 3.8, h: 0.5,
      fontFace: FONT_SERIF, fontSize: 15, color: C.cream,
      valign: "top", margin: 0,
    });
  });

  // Divider
  s.addShape(pres.shapes.LINE, {
    x: rX, y: 8.3, w: 7.8, h: 0,
    line: { color: C.cream, width: 0.5, transparency: 50 },
  });

  // Quote
  s.addText("\u201C", {
    x: rX, y: 8.45, w: 0.7, h: 0.8,
    fontFace: FONT_SERIF, fontSize: 48, color: C.gold, italic: true,
    margin: 0,
  });
  s.addText("They designed a house that sounds like our family when it is happiest. We did not know that was a thing houses could do.", {
    x: rX, y: 9.25, w: 7.8, h: 1.1,
    fontFace: FONT_SERIF, fontSize: 14, color: C.cream, italic: true,
    margin: 0,
  });
  s.addText("— THE CLIENT · HOUSE JOURNAL", {
    x: rX, y: 10.35, w: 8.5, h: 0.3,
    fontFace: FONT_MONO, fontSize: 9, color: C.cream, transparency: 20,
    charSpacing: 0, margin: 0,
  });
}

// ============================================================
// SLIDE 8 — CLOSING (THE DOOR IS OPEN)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  // Outer thin frame
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 0.5, w: W - 1.6, h: H - 1.0,
    fill: { type: "none" },
    line: { color: C.gold, width: 0.5, transparency: 50 },
  });

  // Big decorative circle (right side)
  s.addShape(pres.shapes.OVAL, {
    x: W - 7, y: 3, w: 9, h: 9,
    fill: { color: C.goldLt, transparency: 50 }, line: { type: "none" },
  });

  // Top-left monogram
  addMonogram(s, 1.3, 0.95, C.gold);

  // Top-right volume
  s.addText("VOL. I  ·  PLATE 08", {
    x: W - 6, y: 1.0, w: 5, h: 0.35,
    fontFace: FONT_MONO, fontSize: 12, color: C.gold,
    align: "right", charSpacing: 4, margin: 0,
  });

  // Section label
  s.addText("THE DOOR IS OPEN", {
    x: 1.3, y: 1.75, w: 8, h: 0.4,
    fontFace: FONT_MONO, fontSize: 13, color: C.ochre,
    charSpacing: 6, margin: 0,
  });

  // Headline
  s.addText([
    { text: "Shall we begin a", options: { breakLine: true } },
    { text: "house?",            options: { italic: true, color: C.ochre } },
  ], {
    x: 1.3, y: 2.3, w: W - 2.6, h: 3.2,
    fontFace: FONT_SERIF, fontSize: 96, color: C.gold,
    valign: "top", margin: 0,
  });

  // Body paragraph
  s.addText([
    { text: "We accept a small number of new commissions each year. If the work in this volume speaks to you, ", options: {} },
    { text: "write us a letter", options: { italic: true, color: C.ochre } },
    { text: " — on paper if you have it, by screen if you don't. We'll reply in kind.", options: {} },
  ], {
    x: 1.3, y: 6.1, w: 11.5, h: 1.5,
    fontFace: FONT_SANS, fontSize: 17, color: C.ochre,
    valign: "top", margin: 0,
  });

  // Divider line
  s.addShape(pres.shapes.LINE, {
    x: 1.3, y: 7.9, w: W - 2.6, h: 0,
    line: { color: C.gold, width: 0.5, transparency: 40 },
  });

  // 3 contact columns
  const contactY = 8.2;
  const contactW = (W - 2.6) / 3;

  // WRITE
  s.addText("—  WRITE  —", {
    x: 1.3, y: contactY, w: contactW, h: 0.35,
    fontFace: FONT_MONO, fontSize: 11, color: C.ochre,
    charSpacing: 5, margin: 0,
  });
  s.addText([
    { text: "bonjour@",   options: { italic: true } },
    { text: " maisonsolene.co", options: {} },
  ], {
    x: 1.3, y: 8.7, w: contactW, h: 0.6,
    fontFace: FONT_SERIF, fontSize: 18, color: C.gold,
    margin: 0,
  });

  // CALL
  s.addText("—  CALL  —", {
    x: 1.3 + contactW, y: contactY, w: contactW, h: 0.35,
    fontFace: FONT_MONO, fontSize: 11, color: C.ochre,
    align: "center", charSpacing: 5, margin: 0,
  });
  s.addText("+1 310 · 555 · 0173", {
    x: 1.3 + contactW, y: 8.7, w: contactW, h: 0.6,
    fontFace: FONT_SERIF, fontSize: 20, color: C.gold,
    align: "center", margin: 0,
  });
  s.addText("Tues–Fri · 10–4 PT", {
    x: 1.3 + contactW, y: 9.35, w: contactW, h: 0.3,
    fontFace: FONT_MONO, fontSize: 9, color: C.ochre, transparency: 25,
    align: "center", charSpacing: 0, margin: 0,
  });

  // VISIT
  s.addText("—  VISIT  —", {
    x: 1.3 + contactW * 2, y: contactY, w: contactW, h: 0.35,
    fontFace: FONT_MONO, fontSize: 11, color: C.ochre,
    align: "right", charSpacing: 5, margin: 0,
  });
  s.addText("The Atelier", {
    x: 1.3 + contactW * 2, y: 8.7, w: contactW, h: 0.55,
    fontFace: FONT_SERIF, fontSize: 20, color: C.gold,
    align: "right", margin: 0,
  });
  s.addText("2241 Abbot Kinney · Venice", {
    x: 1.3 + contactW * 2 - 1.0, y: 9.35, w: contactW + 1.0, h: 0.3,
    fontFace: FONT_MONO, fontSize: 9, color: C.ochre, transparency: 25,
    align: "right", charSpacing: 0, margin: 0,
  });
}

// -------- Save --------
pres.writeFile({ fileName: "70_s_recreated.pptx" })
  .then(name => console.log("Wrote", name))
  .catch(err => { console.error(err); process.exit(1); });
