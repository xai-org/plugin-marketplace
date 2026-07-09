// wakeline.js
// Recreates the "Wakeline — Prospectus Vol. 01" deck with pptxgenjs.
//
// USAGE:
//   1) npm install pptxgenjs
//   2) Place the asset images in ./wakeline_assets/  (see ASSETS list below)
//      - image-1-1.jpeg  (slide 1 full-bleed dark-lake background)
//      - image-2-1.jpeg  (slide 2 ocean photo)
//      - image-4-1.png   (slide 4 phase-A icon)
//      - image-4-2.png   (slide 4 phase-B icon)
//      - image-4-3.png   (slide 4 phase-C icon)
//      - image-4-4.png   (slide 4 phase-D icon)
//      - image-6-1.jpeg  (slide 6 lake/dock full-bleed)
//      - image-6-2.png   (slide 6 radar/compass)
//      - image-7-1.png   (slide 7 gear icon)
//      - image-7-2.png   (slide 7 safety icon)
//      - image-7-3.png   (slide 7 season icon)
//   3) node wakeline.js
//
// Slide dimensions are a custom 20" x 11.25" widescreen layout, matching the
// original deck. Coordinates and font sizes are ported directly from the
// source PPTX's OOXML.

const pptxgen = require("pptxgenjs");

// -------- Theme --------
const C = {
  cream:    "F2EEE6",
  creamAlt: "EDE6D6",
  creamAlt2:"E4DAC2",
  ink:      "0A0E14",
  inkSoft:  "2A3240",
  inkDeep:  "020813",
  navy:     "0B2545",
  navy2:    "061425",
  navy3:    "05101E",
  gold:     "E8A23B",
  goldSoft: "F4C06B",
  goldDeep: "C9801F",
  rust:     "B55A2A",
  teal:     "2A6B7A",
  slate:    "5E6B7A",
};
const FONT = "Arial";
const IMG = "./wakeline_assets";

// -------- Presentation Setup --------
const pres = new pptxgen();
pres.title = "Wakeline — Prospectus Vol. 01";
pres.author = "Wakeline Studio";
pres.defineLayout({ name: "WAKELINE_20x11_25", width: 20, height: 11.25 });
pres.layout = "WAKELINE_20x11_25";

// -------- Helpers --------
// Corner bracket frame (top-left, top-right, bottom-left, bottom-right)
function addCornerFrame(slide, color, transparency = 45) {
  const armLen = 0.302;
  const armThk = 0.01;
  // Top-left
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.292, y: 0.292, w: armLen, h: armThk, fill: { color, transparency }, line: { type: "none" } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.292, y: 0.292, w: armThk, h: armLen, fill: { color, transparency }, line: { type: "none" } });
  // Top-right
  slide.addShape(pres.shapes.RECTANGLE, { x: 19.406, y: 0.292, w: armLen, h: armThk, fill: { color, transparency }, line: { type: "none" } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 19.698, y: 0.292, w: armThk, h: armLen, fill: { color, transparency }, line: { type: "none" } });
  // Bottom-left
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.292, y: 10.948, w: armLen, h: armThk, fill: { color, transparency }, line: { type: "none" } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.292, y: 10.656, w: armThk, h: armLen, fill: { color, transparency }, line: { type: "none" } });
  // Bottom-right
  slide.addShape(pres.shapes.RECTANGLE, { x: 19.406, y: 10.948, w: armLen, h: armThk, fill: { color, transparency }, line: { type: "none" } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 19.698, y: 10.656, w: armThk, h: armLen, fill: { color, transparency }, line: { type: "none" } });
}

// Small header logo: dot + WAKELINE wordmark at x=1.667
function addHeaderLogo(slide, textColor, label = "WAKELINE") {
  slide.addShape(pres.shapes.OVAL, {
    x: 1.667, y: 0.615, w: 0.146, h: 0.146,
    fill: { color: C.gold }, line: { type: "none" }
  });
  slide.addText(label, {
    x: 1.958, y: 0.523, w: 3.25, h: 0.37,
    fontFace: FONT, fontSize: 11, color: textColor,
    valign: "middle", margin: 0
  });
}

// Top-right section marker: short dash + label.
function addSectionMarker(slide, label, labelColor, dashColor, _unused) {
  const dashX = 15.1;
  const labelX = 15.5;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: dashX, y: 0.682, w: 0.25, h: 0.01,
    fill: { color: dashColor, transparency: 50 }, line: { type: "none" }
  });
  slide.addText(label, {
    x: labelX, y: 0.549, w: 4.2, h: 0.318,
    fontFace: FONT, fontSize: 11, color: labelColor,
    align: "left", valign: "middle", margin: 0,
    transparency: 28
  });
}

// Vertical rotated side label on the left edge of the slide.
// When pptxgenjs rotates a text box, it rotates around the box's center, so we
// position the (unrotated) box horizontally such that its center lands near
// x ≈ 0.22" (inside the left margin, outside any content).
function addSideLabel(slide, text, color, transparency = 45) {
  const boxW = 4.0;
  const boxH = 0.4;
  const targetCenterX = 0.22;
  const x = targetCenterX - boxW / 2; // negative: box extends off-slide, rotation brings it on-slide
  slide.addText(text, {
    x, y: 4.5, w: boxW, h: boxH,
    fontFace: FONT, fontSize: 11, color,
    align: "center", valign: "middle",
    rotate: 270, transparency, margin: 0
  });
}

// ========================================================================
// SLIDE 1 — COVER
// ========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.inkDeep };

  // Full-bleed background photo
  s.addImage({ path: `${IMG}/image-1-1.jpeg`, x: 0, y: 0, w: 20, h: 11.25 });
  // Subtle dark overlays (two passes)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 20, h: 11.25,
    fill: { color: "000000", transparency: 40 }, line: { type: "none" }
  });

  // Corner frame (cream)
  addCornerFrame(s, C.cream, 45);

  // Header logo
  addHeaderLogo(s, C.cream);

  // Top-right: EST. 2026 · TAHOE with small dash
  addSectionMarker(s, "EST. 2026 · TAHOE", C.cream, C.cream, 4.0);

  // Left stack: PROSPECTUS / VOL. 01 with square marker
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.833, y: 1.529, w: 0.146, h: 0.146,
    fill: { color: C.gold }, line: { type: "none" }
  });
  s.addText("PROSPECTUS / VOL. 01", {
    x: 1.167, y: 1.464, w: 3.964, h: 0.318,
    fontFace: FONT, fontSize: 11, color: C.gold,
    valign: "middle", margin: 0
  });

  // Top-right badge "01" in a gold circle outline
  s.addShape(pres.shapes.OVAL, {
    x: 18.562, y: 1.458, w: 0.604, h: 0.604,
    fill: { type: "none" },
    line: { color: C.gold, width: 1 }
  });
  s.addText("01", {
    x: 18.628, y: 1.573, w: 0.48, h: 0.417,
    fontFace: FONT, fontSize: 10.5, italic: true, color: C.gold,
    align: "center", valign: "middle", margin: 0
  });

  // Right-hand labels: NORTH SHORE / 39.24° N
  s.addText("NORTH SHORE", {
    x: 16.691, y: 2.25, w: 2.8, h: 0.328,
    fontFace: FONT, fontSize: 11, color: C.cream,
    align: "right", valign: "middle", margin: 0
  });
  s.addText("39.24° N", {
    x: 16.691, y: 2.641, w: 2.8, h: 0.328,
    fontFace: FONT, fontSize: 11, color: C.cream,
    align: "right", valign: "middle", margin: 0, transparency: 56
  });

  // Hero headline: Find / your / line.
  s.addText("Find", {
    x: 0.833, y: 3.579, w: 10, h: 2.6,
    fontFace: FONT, fontSize: 140, bold: false, color: C.cream,
    valign: "top", margin: 0
  });
  s.addText("your", {
    x: 0.833, y: 6.058, w: 10, h: 2.6,
    fontFace: FONT, fontSize: 140, color: C.cream,
    valign: "top", margin: 0
  });
  s.addText("line.", {
    x: 6.807, y: 5.814, w: 6.5, h: 3.0,
    fontFace: FONT, fontSize: 140, italic: true, color: C.gold,
    valign: "top", margin: 0
  });

  // Subheadline
  s.addText("— A PRIVATE WAKEBOARDING COACHING STUDIO ON LAKE TAHOE", {
    x: 0.833, y: 9.178, w: 18.883, h: 0.343,
    fontFace: FONT, fontSize: 17, color: C.cream,
    valign: "middle", margin: 0, transparency: 15
  });

  // Thin divider
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.833, y: 9.656, w: 18.333, h: 0.01,
    fill: { color: C.cream, transparency: 78 }, line: { type: "none" }
  });

  // Bottom row
  s.addText("WAKELINE ’26", {
    x: 0.833, y: 10.38, w: 3.5, h: 0.328,
    fontFace: FONT, fontSize: 11, color: C.cream,
    valign: "middle", margin: 0
  });
  s.addText("— SPEC / 08 OF 08 —", {
    x: 5.982, y: 10.38, w: 8.0, h: 0.328,
    fontFace: FONT, fontSize: 11, color: C.cream,
    align: "center", valign: "middle", margin: 0, transparency: 50
  });
  s.addText("FILMED COACHING · GLASS-CALM MORNINGS BY INVITATION & BOOKING", {
    x: 10.0, y: 10.14, w: 9.167, h: 0.56,
    fontFace: FONT, fontSize: 11, color: C.cream,
    align: "right", valign: "middle", margin: 0, transparency: 15
  });
}

// ========================================================================
// SLIDE 2 — INTRODUCTION
// ========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addCornerFrame(s, C.ink, 45);
  addHeaderLogo(s, C.ink);
  addSectionMarker(s, "02 / INTRO", C.ink, C.ink, 3.2);
  addSideLabel(s, "PROSPECTUS — WAKELINE ’26", C.ink, 45);

  // Section label
  s.addText("INTRODUCTION", {
    x: 1.354, y: 1.576, w: 3.5, h: 0.328,
    fontFace: FONT, fontSize: 11, color: C.goldDeep,
    valign: "middle", margin: 0
  });

  // Headline
  s.addText([
    { text: "A studio on the ", options: { color: C.ink } },
    { text: "water.", options: { color: C.goldDeep, italic: true } }
  ], {
    x: 1.354, y: 2.154, w: 9.5, h: 2.665,
    fontFace: FONT, fontSize: 64, valign: "top", margin: 0
  });

  // Body
  s.addText(
    "Wakeline is a small-batch wakeboarding coaching studio on the north shore of Lake Tahoe. Built for riders who want serious technique — filmed, dialed, and reviewed — on a glass-calm mountain lake at six thousand feet.",
    {
      x: 1.354, y: 5.519, w: 7.081, h: 2.156,
      fontFace: FONT, fontSize: 14, color: C.inkSoft, valign: "top", margin: 0,
      paraSpaceAfter: 2
    }
  );

  // Divider above stats
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.354, y: 8.375, w: 8.125, h: 0.021,
    fill: { color: C.ink }, line: { type: "none" }
  });

  // Stat 1: 1:1
  s.addText([
    { text: "1", options: { color: C.ink } },
    { text: ":", options: { color: C.goldDeep, italic: true } },
    { text: "1", options: { color: C.ink } },
  ], {
    x: 1.354, y: 8.729, w: 2.583, h: 1.05,
    fontFace: FONT, fontSize: 46, valign: "top", margin: 0
  });
  s.addText("COACH TO RIDER", {
    x: 1.354, y: 9.844, w: 2.583, h: 0.615,
    fontFace: FONT, fontSize: 11, color: C.slate,
    valign: "top", margin: 0
  });

  // Stat 2: 4
  s.addText("4", {
    x: 4.167, y: 8.729, w: 2.583, h: 1.05,
    fontFace: FONT, fontSize: 46, color: C.ink, valign: "top", margin: 0
  });
  s.addText("RIDERS PER DAY, MAX", {
    x: 4.167, y: 9.833, w: 2.583, h: 0.615,
    fontFace: FONT, fontSize: 11, color: C.slate,
    valign: "top", margin: 0
  });

  // Stat 3: 24'
  s.addText([
    { text: "24", options: { color: C.ink } },
    { text: "′", options: { color: C.goldDeep, italic: true } },
  ], {
    x: 6.979, y: 8.729, w: 2.583, h: 1.05,
    fontFace: FONT, fontSize: 46, valign: "top", margin: 0
  });
  s.addText("MALIBU TOW BOAT", {
    x: 6.979, y: 9.844, w: 2.583, h: 0.615,
    fontFace: FONT, fontSize: 11, color: C.slate,
    valign: "top", margin: 0
  });

  // Right ocean photo
  s.addImage({
    path: `${IMG}/image-2-1.jpeg`,
    x: 10.208, y: 1.562, w: 8.958, h: 8.854,
    sizing: { type: "cover", w: 8.958, h: 8.854 }
  });

  // Photo caption overlays
  s.addText("FIG. 01 — STUDIO", {
    x: 10.667, y: 1.979, w: 6.18, h: 0.328,
    fontFace: FONT, fontSize: 11, color: C.cream,
    valign: "middle", margin: 0
  });
  s.addText("35MM · ISO 200", {
    x: 16.174, y: 1.979, w: 2.617, h: 0.328,
    fontFace: FONT, fontSize: 11, color: C.cream,
    align: "right", valign: "middle", margin: 0
  });
  s.addText("NORTH SHORE", {
    x: 10.667, y: 9.672, w: 2.366, h: 0.328,
    fontFace: FONT, fontSize: 11, color: C.cream,
    valign: "middle", margin: 0
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 13.262, y: 9.83, w: 2.432, h: 0.01,
    fill: { color: C.cream, transparency: 40 }, line: { type: "none" }
  });
  s.addText("TAHOE VISTA, CA", {
    x: 16.006, y: 9.672, w: 2.786, h: 0.328,
    fontFace: FONT, fontSize: 11, color: C.cream,
    align: "right", valign: "middle", margin: 0
  });
}

// ========================================================================
// SLIDE 3 — HEAD COACH
// ========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  // Huge ghosted "3" top-right
  s.addText("3", {
    x: 17.771, y: 0.208, w: 2.104, h: 4.375,
    fontFace: FONT, fontSize: 260, italic: true, color: C.gold,
    valign: "top", align: "center", margin: 0, transparency: 92
  });

  addCornerFrame(s, C.cream, 45);
  addHeaderLogo(s, C.cream);
  addSectionMarker(s, "03 / HEAD COACH", C.cream, C.cream, 3.8);
  addSideLabel(s, "WAKELINE — THE COACH", C.cream, 45);

  // Big gold left card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.833, y: 1.354, w: 5.417, h: 9.062,
    fill: { color: C.gold, transparency: 55 }, line: { type: "none" }
  });

  // Gold rotated diamond
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.177, y: 1.768, w: 0.146, h: 0.146,
    fill: { color: C.gold }, line: { type: "none" }, rotate: 45
  });
  s.addText("WWA · IV", {
    x: 1.448, y: 1.703, w: 1.8, h: 0.318,
    fontFace: FONT, fontSize: 11, color: C.cream,
    valign: "middle", margin: 0
  });

  // Giant "W" in the card
  s.addText("W", {
    x: 1.509, y: 3.024, w: 4.157, h: 5.042,
    fontFace: FONT, fontSize: 240, italic: true, color: C.gold,
    align: "center", valign: "middle", margin: 0
  });

  // Progress dash row (4 filled + 6 faded)
  const dashY = 8.812;
  const dashW = 0.337, dashH = 0.031;
  for (let i = 0; i < 10; i++) {
    const x = 1.177 + i * 0.399;
    const filled = i < 4;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: dashY, w: dashW, h: dashH,
      fill: filled ? { color: C.gold } : { color: C.cream, transparency: 75 },
      line: { type: "none" }
    });
  }

  // Bottom labels inside gold card
  s.addText("COACH · EST. 2026", {
    x: 1.177, y: 9.5, w: 3.209, h: 0.615,
    fontFace: FONT, fontSize: 11, color: C.cream,
    valign: "middle", margin: 0, transparency: 15
  });
  s.addText([
    { text: "39.24° N", options: { breakLine: true } },
    { text: "120.05° W" }
  ], {
    x: 4.109, y: 8.911, w: 1.9, h: 1.204,
    fontFace: FONT, fontSize: 11, color: C.cream,
    align: "right", valign: "middle", margin: 0, transparency: 15
  });

  // Right content: HEAD COACH label
  s.addText("HEAD COACH", {
    x: 7.083, y: 1.367, w: 4.0, h: 0.328,
    fontFace: FONT, fontSize: 11, color: C.gold,
    valign: "middle", margin: 0
  });
  // Headline
  s.addText([
    { text: "Fifteen years on the ", options: { color: C.cream } },
    { text: "water.", options: { color: C.gold, italic: true } }
  ], {
    x: 7.083, y: 1.862, w: 12.446, h: 2.625,
    fontFace: FONT, fontSize: 65, valign: "top", margin: 0
  });

  // Pull quote
  s.addText(
    "I don’t teach tricks. I teach the line you ride between them — where the board wants to go, and how to get out of its way.",
    {
      x: 7.5, y: 5.463, w: 11.0, h: 1.791,
      fontFace: FONT, fontSize: 21, italic: true, color: C.cream,
      valign: "top", margin: 0
    }
  );
  s.addText("— THE COACH", {
    x: 7.5, y: 7.433, w: 6.0, h: 0.379,
    fontFace: FONT, fontSize: 11, color: C.gold,
    valign: "middle", margin: 0, transparency: 10
  });

  // Bottom divider
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.083, y: 8.778, w: 12.083, h: 0.01,
    fill: { color: C.cream, transparency: 78 }, line: { type: "none" }
  });

  // 3 columns bottom
  const cols3 = [
    { x: 7.083,  head: "EXPERIENCE", body: "15 yrs competitive riding" },
    { x: 11.222, head: "TITLES",     body: "Multi-time WWA World Champion" },
    { x: 15.361, head: "CREDENTIALS",body: "USCG Captain · WWA Level III Coach" },
  ];
  cols3.forEach(col => {
    s.addText(col.head, {
      x: col.x, y: 9.122, w: 3.92, h: 0.328,
      fontFace: FONT, fontSize: 11, color: C.cream,
      valign: "middle", margin: 0, transparency: 35
    });
    s.addText(col.body, {
      x: col.x, y: 9.554, w: 3.92, h: 0.904,
      fontFace: FONT, fontSize: 18, color: C.cream, valign: "top", margin: 0
    });
  });
}

// ========================================================================
// SLIDE 4 — THE METHOD (4 PHASES)
// ========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addCornerFrame(s, C.ink, 45);
  addHeaderLogo(s, C.ink);
  addSectionMarker(s, "04 / METHOD", C.ink, C.ink, 3.2);
  addSideLabel(s, "THE METHOD — 04", C.ink, 45);

  // Section label + headline
  s.addText("THE METHOD", {
    x: 0.833, y: 1.367, w: 3.0, h: 0.328,
    fontFace: FONT, fontSize: 11, color: C.goldDeep,
    valign: "middle", margin: 0
  });
  s.addText([
    { text: "Four phases. One ", options: { color: C.ink } },
    { text: "clean ",            options: { color: C.goldDeep, italic: true } },
    { text: "line.",              options: { color: C.ink } },
  ], {
    x: 0.833, y: 1.841, w: 13.0, h: 2.385,
    fontFace: FONT, fontSize: 56, valign: "top", margin: 0
  });

  // Right-side meta lines
  ["PROGRESSIVE FRAMEWORK", "FILMED & REVIEWED", "NOTES AFTER EACH SET"].forEach((t, i) => {
    s.addText(t, {
      x: 14.461, y: 2.835 + i * 0.45, w: 4.706, h: 0.492,
      fontFace: FONT, fontSize: 11, color: C.slate,
      align: "right", valign: "middle", margin: 0
    });
  });

  // Connector A ─── B ─── C ─── D
  const letters = ["A", "B", "C", "D"];
  const letterX = [0.833, 6.863, 12.893, 18.936];
  const lineStartX = [1.3, 7.33, 13.373];
  letters.forEach((L, i) => {
    s.addText(L, {
      x: letterX[i], y: 4.914, w: 0.33, h: 0.328,
      fontFace: FONT, fontSize: 11, color: C.goldDeep,
      valign: "middle", margin: 0
    });
    if (i < 3) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: lineStartX[i], y: 5.052, w: 5.313, h: 0.01,
        fill: { color: C.ink }, line: { type: "none" }
      });
    }
  });

  // 4 phase columns
  const phases = [
    { x: 0.833,  roman: "i.",   color: C.goldDeep, title: "Stance & edge",  label: "PHASE A",
      body: "Reading the water, finding neutral, carrying an edge without fighting it. The base layer everything stacks on.",
      icon: "image-4-1.png", iconX: 4.646 },
    { x: 5.521,  roman: "ii.",  color: C.goldDeep, title: "Pop & pressure", label: "PHASE B",
      body: "Loading the line, staying tall off the wake, learning to trust the rebound before you ever leave the water.",
      icon: "image-4-2.png", iconX: 9.333 },
    { x: 10.208, roman: "iii.", color: C.rust,     title: "Air & rotation", label: "PHASE C",
      body: "Inverts, grabs, spins. Built from the ground up — so you land with the handle, not in the water next to it.",
      icon: "image-4-3.png", iconX: 14.021 },
    { x: 14.896, roman: "iv.",  color: C.teal,     title: "Style & film",   label: "PHASE D",
      body: "Every set is filmed. We watch it back on the dock. The goal isn’t more tricks — it’s tricks that look like yours.",
      icon: "image-4-4.png", iconX: 18.708 },
  ];
  phases.forEach(p => {
    s.addText(p.roman, {
      x: p.x, y: 5.909, w: 4.399, h: 0.867,
      fontFace: FONT, fontSize: 44, italic: true, color: p.color,
      valign: "top", margin: 0
    });
    // Icon box (square frame + icon)
    s.addShape(pres.shapes.RECTANGLE, {
      x: p.iconX - 0.02, y: 5.889, w: 0.498, h: 0.498,
      fill: { type: "none" }, line: { color: C.slate, width: 0.75 }
    });
    s.addImage({
      path: `${IMG}/${p.icon}`,
      x: p.iconX, y: 5.909, w: 0.458, h: 0.458
    });
    s.addText(p.label, {
      x: p.x, y: 6.817, w: 4.399, h: 0.328,
      fontFace: FONT, fontSize: 11, color: C.slate,
      valign: "middle", margin: 0
    });
    s.addText(p.title, {
      x: p.x, y: 7.249, w: 4.399, h: 1.092,
      fontFace: FONT, fontSize: 24, color: C.ink, valign: "top", margin: 0
    });
    s.addText(p.body, {
      x: p.x, y: 8.487, w: 4.399, h: 1.6,
      fontFace: FONT, fontSize: 12, color: C.inkSoft, valign: "top", margin: 0,
      paraSpaceAfter: 2
    });
  });
}

// ========================================================================
// SLIDE 5 — PROGRAMS TABLE
// ========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.navy2 };

  // Ghosted $ top-right
  s.addText("$", {
    x: 17.343, y: 7.0, w: 2.115, h: 3.875,
    fontFace: FONT, fontSize: 230, italic: true, color: C.gold,
    align: "center", valign: "top", margin: 0, transparency: 94
  });

  addCornerFrame(s, C.cream, 45);
  addHeaderLogo(s, C.cream);
  addSectionMarker(s, "05 / PROGRAMS & PACKAGES", C.cream, C.cream, 5.2);
  addSideLabel(s, "PROGRAMS — 05", C.cream, 45);

  // Section header
  s.addText("PROGRAMS", {
    x: 0.833, y: 1.367, w: 3.0, h: 0.328,
    fontFace: FONT, fontSize: 11, color: C.gold,
    valign: "middle", margin: 0
  });
  s.addText([
    { text: "Six ways to ", options: { color: C.cream } },
    { text: "ride.",         options: { color: C.gold, italic: true } }
  ], {
    x: 0.833, y: 1.799, w: 18.883, h: 1.01,
    fontFace: FONT, fontSize: 46, valign: "top", margin: 0
  });

  // Table column x/w layout
  const COLS = [
    { x: 0.833, w: 1.146, head: "№",        align: "left" },
    { x: 1.979, w: 4.965, head: "PROGRAM",  align: "left" },
    { x: 6.944, w: 7.639, head: "FOR",      align: "left" },
    { x: 14.583, w: 2.292, head: "DURATION",align: "left" },
    { x: 16.875, w: 2.292, head: "FROM",    align: "right" },
  ];
  // Header row
  COLS.forEach(c => {
    s.addText(c.head, {
      x: c.x, y: 3.247, w: c.w, h: 0.365,
      fontFace: FONT, fontSize: 11, color: C.cream,
      align: c.align, valign: "middle", margin: 0, transparency: 45
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: 3.716, w: c.w, h: 0.01,
      fill: { color: C.cream, transparency: 78 }, line: { type: "none" }
    });
  });

  // Rows
  const rows = [
    { num: "01", prog: [{ text: "First ", c: C.cream },      { text: "Line",   c: C.gold, it: true }], desc: "Private 1:1 intro. Up on the board by lunch — or the second set is on us.", dur: "90 min", price: "$225" },
    { num: "02", prog: [{ text: "Intermediate", c: C.cream }],                                          desc: "Edge control, wake jumps, and the grabs that make them look intentional.",  dur: "2 hr",   price: "$340" },
    { num: "03", prog: [{ text: "Advanced / ", c: C.cream }, { text: "Trick",  c: C.gold, it: true }], desc: "Inverts and rotations. Filmed coaching, dock review, full session notes.",  dur: "2 hr",   price: "$395" },
    { num: "04", prog: [{ text: "Groms (8–15)", c: C.cream }],                                          desc: "Youth program with shore-side dry-land before every set. Booster vest provided.", dur: "90 min", price: "$195" },
    { num: "05", prog: [{ text: "Crew Session", c: C.cream }],                                          desc: "Up to four riders, rotating sets, one coach. Bring your people.",            dur: "3 hr",   price: "$780" },
    { num: "06", prog: [{ text: "Three-Day ", c: C.cream },  { text: "Clinic", c: C.gold, it: true }], desc: "Morning water, afternoon video review. Breakthrough package — guaranteed.", dur: "3 days", price: "$1,850" },
  ];
  const rowYs = [3.893, 4.912, 5.931, 6.949, 7.968, 8.793];
  const rowHs = [0.717, 0.717, 0.717, 0.717, 0.523, 0.722];

  rows.forEach((r, i) => {
    const y = rowYs[i];
    const h = rowHs[i];
    // № col
    s.addText(r.num, {
      x: 0.833, y, w: 1.146, h,
      fontFace: FONT, fontSize: 11, color: C.gold,
      valign: "middle", margin: 0, transparency: 15
    });
    // Program col (rich text)
    s.addText(
      r.prog.map(p => ({ text: p.text, options: { color: p.c, italic: !!p.it } })),
      {
        x: 1.979, y, w: 5.114, h,
        fontFace: FONT, fontSize: 22, valign: "middle", margin: 0
      }
    );
    // Description col
    s.addText(r.desc, {
      x: 6.944, y, w: 7.535, h,
      fontFace: FONT, fontSize: 11, color: C.cream, valign: "middle", margin: 0, transparency: 20
    });
    // Duration col
    s.addText(r.dur, {
      x: 14.583, y, w: 2.292, h,
      fontFace: FONT, fontSize: 11, color: C.cream, valign: "middle", margin: 0, transparency: 30
    });
    // Price col
    s.addText(r.price, {
      x: 16.792, y, w: 2.375, h,
      fontFace: FONT, fontSize: 21, color: C.gold, align: "right", valign: "middle", margin: 0
    });
    // Row separator (not under last row)
    if (i < rows.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.833, y: y + h + 0.1, w: 18.333, h: 0.01,
        fill: { color: C.cream, transparency: 82 }, line: { type: "none" }
      });
    }
  });
}

// ========================================================================
// SLIDE 6 — THE LAKE
// ========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.navy3 };
  s.addImage({ path: `${IMG}/image-6-1.jpeg`, x: 0, y: 0, w: 20, h: 11.25 });
  // Darken overlay bottom-left for text legibility
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.2, w: 9.5, h: 6.05,
    fill: { color: "000000", transparency: 55 }, line: { type: "none" }
  });

  addCornerFrame(s, C.cream, 45);
  addHeaderLogo(s, C.cream);
  addSectionMarker(s, "06 / THE LAKE", C.cream, C.cream, 3.3);
  addSideLabel(s, "THE LAKE — 06", C.cream, 45);

  // Section + headline
  s.addText("THE LAKE", {
    x: 0.833, y: 1.354, w: 6.438, h: 0.328,
    fontFace: FONT, fontSize: 11, color: C.gold,
    valign: "middle", margin: 0
  });
  s.addText([
    { text: "Glass by ", options: { color: C.cream } },
    { text: "seven.",     options: { color: C.gold, italic: true } }
  ], {
    x: 0.833, y: 2.057, w: 9.438, h: 2.865,
    fontFace: FONT, fontSize: 75, valign: "top", margin: 0
  });

  // Body
  s.addText(
    "We launch from Tahoe Vista before the wind lifts. 1,645 feet deep, dead-flat mornings, and a run-in that stretches for miles. The best conditions in North America, at altitude.",
    {
      x: 0.833, y: 5.589, w: 6.579, h: 2.156,
      fontFace: FONT, fontSize: 14, color: C.cream, valign: "top", margin: 0, transparency: 12,
      paraSpaceAfter: 2
    }
  );

  // Divider above stat grid
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.833, y: 8.411, w: 6.25, h: 0.01,
    fill: { color: C.cream, transparency: 78 }, line: { type: "none" }
  });

  // Stat grid 2x2
  const meta = [
    { x: 0.833, y: 8.755, label: "LOCATION",    value: "Tahoe Vista, CA" },
    { x: 4.104, y: 8.755, label: "ELEVATION",   value: "6,225 ft" },
    { x: 0.833, y: 9.82,  label: "COORDINATES", value: "39.2416° N 120.0498° W" },
    { x: 4.104, y: 9.82,  label: "SEASON",      value: "May — October" },
  ];
  meta.forEach(m => {
    s.addText(m.label, {
      x: m.x, y: m.y, w: 3.069, h: 0.328,
      fontFace: FONT, fontSize: 11, color: C.cream,
      valign: "middle", margin: 0, transparency: 40
    });
    s.addText(m.value, {
      x: m.x, y: m.y + 0.391, w: 3.269, h: 0.425,
      fontFace: FONT, fontSize: 16, color: C.cream, valign: "top", margin: 0
    });
  });

  // Right-side radar box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 12.5, y: 2.833, w: 6.667, h: 6.667,
    fill: { color: C.inkDeep, transparency: 50 }, line: { type: "none" }
  });
  s.addImage({
    path: `${IMG}/image-6-2.png`,
    x: 12.802, y: 3.135, w: 6.062, h: 6.062
  });
  // Corner labels on radar box
  s.addText("N 39.24°", {
    x: 12.698, y: 2.989, w: 1.8, h: 0.328,
    fontFace: FONT, fontSize: 11, color: C.cream, valign: "middle", margin: 0, transparency: 40
  });
  s.addText("W 120.05°", {
    x: 17.1, y: 2.989, w: 2.0, h: 0.328,
    fontFace: FONT, fontSize: 11, color: C.cream, align: "right", valign: "middle", margin: 0, transparency: 40
  });
  s.addText("ELEV 6,225′", {
    x: 12.698, y: 9.057, w: 2.2, h: 0.328,
    fontFace: FONT, fontSize: 11, color: C.cream, valign: "middle", margin: 0, transparency: 40
  });
  s.addText("DEPTH 1,645′", {
    x: 16.839, y: 9.057, w: 2.213, h: 0.328,
    fontFace: FONT, fontSize: 11, color: C.cream, align: "right", valign: "middle", margin: 0, transparency: 40
  });
  // Gold "NORTH SHORE TAHOE" pill
  s.addShape(pres.shapes.RECTANGLE, {
    x: 16.107, y: 9.187, w: 3.3, h: 0.594,
    fill: { color: C.gold }, line: { type: "none" }
  });
  s.addText("NORTH SHORE TAHOE", {
    x: 16.107, y: 9.187, w: 3.3, h: 0.594,
    fontFace: FONT, fontSize: 10, bold: true, color: C.navy2,
    align: "center", valign: "middle", margin: 0
  });
}

// ========================================================================
// SLIDE 7 — LOGISTICS (3 CARDS)
// ========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addCornerFrame(s, C.ink, 45);
  addHeaderLogo(s, C.ink);
  addSectionMarker(s, "07 / LOGISTICS", C.slate, C.slate, 3.4);
  addSideLabel(s, "LOGISTICS — 07", C.ink, 45);

  // Section label + headline
  s.addText("WHAT’S INCLUDED", {
    x: 0.833, y: 1.367, w: 4.0, h: 0.328,
    fontFace: FONT, fontSize: 11, color: C.goldDeep,
    valign: "middle", margin: 0
  });
  s.addText([
    { text: "Gear, safety, ", options: { color: C.ink } },
    { text: "season.",         options: { color: C.goldDeep, italic: true } }
  ], {
    x: 0.833, y: 1.841, w: 12.0, h: 2.385,
    fontFace: FONT, fontSize: 56, valign: "top", margin: 0
  });
  s.addText("FULL QUIVER & VESTS TWO ON BOARD · EVERY SET MAY — OCTOBER · 7 DAYS", {
    x: 14.591, y: 2.685, w: 4.576, h: 1.542,
    fontFace: FONT, fontSize: 11, color: C.slate,
    align: "right", valign: "top", margin: 0, paraSpaceAfter: 4
  });

  // Three-card container shadow (subtle dark strip below)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.833, y: 4.768, w: 18.333, h: 6.381,
    fill: { color: C.ink, transparency: 88 }, line: { type: "none" }
  });

  const cards = [
    { x: 0.833, fill: C.creamAlt,  labelColor: C.goldDeep, label: "01 / GEAR",
      title1: "Bring ", title2: "yourself.",
      body: "We provide a full quiver so you can try what fits you. Swap mid-session, any time.",
      items: ["RONIX & SLINGSHOT BOARDS", "LIQUID FORCE BINDINGS", "USCG TYPE III VESTS", "WETSUITS (MAY — JUNE)"],
      icon: "image-7-1.png", iconX: 5.701 },
    { x: 6.951, fill: C.creamAlt2, labelColor: C.rust,     label: "02 / SAFETY",
      title1: "Two on ", title2: "board.",
      body: "USCG-certified captain plus a dedicated spotter on every set. Radios, AED, and O₂ on the boat.",
      items: ["USCG MASTER CAPTAIN", "WILDERNESS FIRST RESPONDER", "FULL WAIVER & MEDICAL INTAKE"],
      icon: "image-7-2.png", iconX: 11.819 },
    { x: 13.069, fill: C.creamAlt, labelColor: C.teal,     label: "03 / SEASON",
      title1: "May — ", title2: "October.",
      body: "Dawn patrol at 06:30. Evening sets until 19:00. Book early for July & August — weekends fill six weeks out.",
      items: ["7 DAYS A WEEK IN SEASON", "FREE RESCHEDULE ON WIND", "PRIVATE CHARTERS OFF-SEASON"],
      icon: "image-7-3.png", iconX: 17.937 },
  ];
  cards.forEach(c => {
    // card bg
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: 4.768, w: 6.097, h: 6.381,
      fill: { color: c.fill }, line: { type: "none" }
    });
    // icon with framed box
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.iconX - 0.125, y: 5.039, w: 1.083, h: 1.083,
      fill: { type: "none" }, line: { color: C.slate, width: 0.75 }
    });
    s.addImage({ path: `${IMG}/${c.icon}`, x: c.iconX, y: 5.164, w: 0.833, h: 0.833 });

    // label
    s.addText(c.label, {
      x: c.x + 0.375, y: 5.185, w: 3.0, h: 0.328,
      fontFace: FONT, fontSize: 11, color: c.labelColor,
      valign: "middle", margin: 0
    });
    // title
    s.addText([
      { text: c.title1, options: { color: C.ink } },
      { text: c.title2, options: { color: C.ink, italic: true } }
    ], {
      x: c.x + 0.375, y: 5.93, w: 5.508, h: 1.297,
      fontFace: FONT, fontSize: 30, valign: "top", margin: 0
    });
    // body
    s.addText(c.body, {
      x: c.x + 0.375, y: 7.372, w: 5.508, h: 1.3,
      fontFace: FONT, fontSize: 11, color: C.inkSoft,
      valign: "top", margin: 0, paraSpaceAfter: 2
    });
    // feature list
    s.addText(
      c.items.map((t, i) => ({
        text: t,
        options: { breakLine: i < c.items.length - 1 }
      })),
      {
        x: c.x + 0.2, y: 8.71, w: 5.606, h: 2.3,
        fontFace: FONT, fontSize: 11, color: C.slate,
        valign: "top", margin: 0, paraSpaceAfter: 4
      }
    );
  });
}

// ========================================================================
// SLIDE 8 — BOOK A SESSION (CLOSER)
// ========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.navy2 };

  // Gold tint overlay
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 20, h: 11.25,
    fill: { color: "3E2F18" }, line: { type: "none" }
  });
  // Two large outer rings for ambience (low alpha)
  s.addShape(pres.shapes.OVAL, {
    x: 12.906, y: -0.894, w: 11.688, h: 11.688,
    fill: { color: C.gold, transparency: 90 }, line: { type: "none" }
  });
  s.addShape(pres.shapes.OVAL, {
    x: 13.948, y: 0.148, w: 9.604, h: 9.604,
    fill: { color: C.gold, transparency: 82 }, line: { type: "none" }
  });
  // Big solid tan sun
  s.addShape(pres.shapes.OVAL, {
    x: 11.667, y: 1.408, w: 7.083, h: 7.083,
    fill: { color: C.goldSoft }, line: { type: "none" }
  });
  // Horizontal line across middle (behind text)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.783, w: 20, h: 0.01,
    fill: { color: C.gold, transparency: 50 }, line: { type: "none" }
  });

  addCornerFrame(s, C.cream, 45);
  addHeaderLogo(s, C.cream);
  addSectionMarker(s, "08 / BOOK", C.cream, C.cream, 2.8);

  // Small gold square + BOOK A SESSION
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.833, y: 1.424, w: 0.146, h: 0.146,
    fill: { color: C.gold }, line: { type: "none" }
  });
  s.addText("BOOK A SESSION", {
    x: 1.167, y: 1.359, w: 3.2, h: 0.318,
    fontFace: FONT, fontSize: 11, color: C.gold,
    valign: "middle", margin: 0
  });

  // Huge headline
  s.addText([
    { text: "See you at ", options: { color: C.cream } },
    { text: "dawn.",        options: { color: C.gold, italic: true } }
  ], {
    x: 0.833, y: 1.849, w: 15.021, h: 4.661,
    fontFace: FONT, fontSize: 130, valign: "top", margin: 0
  });

  // Divider
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.833, y: 8.365, w: 18.333, h: 0.01,
    fill: { color: C.cream, transparency: 78 }, line: { type: "none" }
  });

  // Three contact columns
  s.addText("BOOK ONLINE", {
    x: 0.833, y: 9.48, w: 5.453, h: 0.328,
    fontFace: FONT, fontSize: 11, color: C.cream,
    valign: "middle", margin: 0, transparency: 40
  });
  s.addText("wakeline.co/book", {
    x: 0.833, y: 9.913, w: 5.453, h: 0.546,
    fontFace: FONT, fontSize: 22, italic: true, color: C.gold,
    valign: "middle", margin: 0
  });
  s.addText("DIRECT", {
    x: 6.669, y: 9.48, w: 4.544, h: 0.328,
    fontFace: FONT, fontSize: 11, color: C.cream,
    valign: "middle", margin: 0, transparency: 40
  });
  s.addText("(530) 555-0142", {
    x: 6.669, y: 9.913, w: 4.544, h: 0.546,
    fontFace: FONT, fontSize: 22, color: C.cream,
    valign: "middle", margin: 0
  });
  s.addText("LOCATION", {
    x: 11.622, y: 8.976, w: 5.453, h: 0.328,
    fontFace: FONT, fontSize: 11, color: C.cream,
    valign: "middle", margin: 0, transparency: 40
  });
  s.addText("North Tahoe Marina Tahoe Vista, CA", {
    x: 11.622, y: 9.408, w: 5.453, h: 1.05,
    fontFace: FONT, fontSize: 22, color: C.cream,
    valign: "top", margin: 0
  });

  // Circle stamp bottom-right
  s.addShape(pres.shapes.OVAL, {
    x: 17.458, y: 8.708, w: 1.708, h: 1.708,
    fill: { type: "none" }, line: { color: C.gold, width: 1 },
    rotate: -8
  });
  s.addText([
    { text: "Find",  options: { breakLine: true } },
    { text: "your", options: { breakLine: true } },
    { text: "line" }
  ], {
    x: 17.406, y: 9.017, w: 0.85, h: 1.2,
    fontFace: FONT, fontSize: 17, italic: true, color: C.gold,
    align: "center", valign: "top", margin: 0
  });
  s.addText("EST · 2026", {
    x: 18.01, y: 9.23, w: 1.209, h: 0.685,
    fontFace: FONT, fontSize: 9, color: C.gold,
    align: "center", valign: "middle", margin: 0, transparency: 10
  });
}

// -------- Write --------
pres.writeFile({ fileName: "wakeboarding_recreated.pptx" })
  .then(fn => console.log(`Wrote ${fn}`))
  .catch(err => { console.error(err); process.exit(1); });
