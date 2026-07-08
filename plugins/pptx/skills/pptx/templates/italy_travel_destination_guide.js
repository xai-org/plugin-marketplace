// italy.js — Recreate "La Bella Italia" travel-edit deck with pptxgenjs
// Run: node italy.js  ->  italy.pptx

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333" x 7.5"
pres.title = "La Bella Italia";
pres.author = "A Travel Edit";

const W = 13.333;
const H = 7.5;

// ---------- Palette ----------
const CREAM       = "EDE0CA";   // primary cream
const CREAM_DEEP  = "E5D6BC";   // shaded cream
const INK         = "1B1310";   // near-black
const INK_SOFT    = "3A2E26";   // brown ink
const RED         = "9F3A28";   // accent terracotta-red
const GOLD        = "E8A53A";   // accent gold (Eternal)
const SKY_TOP     = "F2C58A";   // sky upper
const SKY_MID     = "E89A56";   // sky mid
const SKY_LOW     = "C56F35";   // sky lower
const HILL_FAR    = "7A4326";   // distant hill
const HILL_MID    = "5A2E1C";   // mid hill
const HILL_NEAR   = "3F1F12";   // near hill
const SUN         = "F7E2A8";   // pale sun
const SUN_RING    = "FBE8B8";   // sun glow
const TREE        = "2A1108";   // cypress dark
const ROOF        = "3F1F12";   // little house roof
const NAVY        = "1F4860";   // venezia base
const NAVY_DEEP   = "133247";   // venezia deeper
const NAVY_DARK   = "0E2536";   // venezia silhouette
const MOON        = "EFE6CE";   // venezia moon
const ESPRESSO    = "1F1207";   // roma chocolate bg
const ESPRESSO_2  = "281710";   // roma slight shade
const ESPRESSO_HL = "EFE3CB";   // roma title cream
const MAP_LAND    = "D9B879";   // italy map landmass
const MAP_WATER   = "E5D2A6";   // map sea wash
const MAP_LINE    = "8C6B3A";   // map outline / wave
const SEA         = "2C5F73";   // amalfi sea

// ---------- Helpers ----------
const SERIF = "Georgia";
const SANS  = "Helvetica";
// monospace-ish for labels (uses platform default for monospace)
const MONO  = "Courier New";

function chapterHeader(slide, opts) {
  // Top row: chapter left, center label, right meta
  const { left, center, right, color = INK_SOFT } = opts;
  if (left)  slide.addText(left,  { x: 0.55, y: 0.30, w: 5.5, h: 0.30, fontFace: MONO, fontSize: 9,  color, charSpacing: 4, margin: 0 });
  if (center) slide.addText(center, { x: (W-4)/2, y: 0.30, w: 4, h: 0.30, fontFace: MONO, fontSize: 9, color, charSpacing: 4, align: "center", margin: 0 });
  if (right) slide.addText(right, { x: W-6.05, y: 0.30, w: 5.5, h: 0.30, fontFace: MONO, fontSize: 9, color, charSpacing: 4, align: "right", margin: 0 });
}

function footer(slide, opts) {
  // Roman numeral, center caption, page number, with a thin horizontal rule between
  const { roman, caption, page, color = INK_SOFT, lineColor } = opts;
  const lc = lineColor || color;
  const y = H - 0.45;
  slide.addText(roman, { x: 0.55, y, w: 0.7, h: 0.3, fontFace: MONO, fontSize: 9, color, charSpacing: 3, margin: 0 });
  // line left
  slide.addShape(pres.shapes.LINE, { x: 1.25, y: y + 0.16, w: 4.6, h: 0, line: { color: lc, width: 0.5 } });
  // caption
  slide.addText(caption, { x: 5.85, y, w: 4.0, h: 0.3, fontFace: MONO, fontSize: 9, color, charSpacing: 4, align: "center", margin: 0 });
  // line right
  slide.addShape(pres.shapes.LINE, { x: 9.85, y: y + 0.16, w: 2.65, h: 0, line: { color: lc, width: 0.5 } });
  // page
  slide.addText(page, { x: W - 1.6, y, w: 1.1, h: 0.3, fontFace: MONO, fontSize: 9, color, charSpacing: 3, align: "right", margin: 0 });
}

function smallLabel(slide, text, x, y, w, opts = {}) {
  slide.addText(text, {
    x, y, w, h: 0.28,
    fontFace: MONO, fontSize: 9, color: opts.color || INK_SOFT,
    charSpacing: opts.charSpacing != null ? opts.charSpacing : 4,
    align: opts.align || "left", margin: 0,
    bold: opts.bold || false,
  });
}

// Diamond marker (rotated square)
function diamond(slide, cx, cy, size, color) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: cx - size/2, y: cy - size/2, w: size, h: size,
    fill: { color }, line: { type: "none" }, rotate: 45,
  });
}

// ===================================================================
// SLIDE 1 — COVER
// ===================================================================
function slide1() {
  const s = pres.addSlide();
  s.background = { color: CREAM };

  // Right-side illustrated panel (sunset over Tuscan hills)
  const panelX = 7.7;
  const panelW = W - panelX;

  // Sky bands (faux gradient via stacked rectangles)
  const skyBands = [
    [0.00, 1.40, "F4D29A"],
    [1.40, 1.20, "F0BC78"],
    [2.60, 1.00, "EB9F50"],
    [3.60, 0.80, "DD8038"],
  ];
  skyBands.forEach(([y, h, c]) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: panelX, y, w: panelW, h,
      fill: { color: c }, line: { type: "none" },
    });
  });

  // Sun glow + sun
  s.addShape(pres.shapes.OVAL, {
    x: panelX + 2.3, y: 1.6, w: 2.6, h: 2.6,
    fill: { color: SUN_RING }, line: { type: "none" },
  });
  s.addShape(pres.shapes.OVAL, {
    x: panelX + 2.7, y: 2.0, w: 1.8, h: 1.8,
    fill: { color: SUN }, line: { type: "none" },
  });

  // Bird marks (small ~ shapes via tiny lines)
  function bird(x, y) {
    s.addShape(pres.shapes.LINE, { x, y, w: 0.18, h: 0.05, line: { color: HILL_NEAR, width: 1.3 } });
    s.addShape(pres.shapes.LINE, { x: x + 0.18, y: y + 0.05, w: 0.18, h: -0.05, line: { color: HILL_NEAR, width: 1.3 } });
  }
  bird(panelX + 1.4, 2.1);
  bird(panelX + 1.9, 2.5);
  bird(panelX + 0.9, 2.8);

  // Distant rolling hills
  s.addShape(pres.shapes.RECTANGLE, { x: panelX, y: 4.40, w: panelW, h: 0.55, fill: { color: HILL_FAR }, line: { type: "none" } });
  // Gentle bumps using ovals atop the hill bands
  s.addShape(pres.shapes.OVAL, { x: panelX + 0.2, y: 4.10, w: 2.6, h: 0.7, fill: { color: HILL_FAR }, line: { type: "none" } });
  s.addShape(pres.shapes.OVAL, { x: panelX + 2.6, y: 4.20, w: 2.4, h: 0.6, fill: { color: HILL_FAR }, line: { type: "none" } });

  // Mid hill
  s.addShape(pres.shapes.RECTANGLE, { x: panelX, y: 4.95, w: panelW, h: 0.55, fill: { color: HILL_MID }, line: { type: "none" } });
  s.addShape(pres.shapes.OVAL, { x: panelX + 0.4, y: 4.70, w: 2.0, h: 0.55, fill: { color: HILL_MID }, line: { type: "none" } });
  s.addShape(pres.shapes.OVAL, { x: panelX + 2.4, y: 4.75, w: 3.0, h: 0.5,  fill: { color: HILL_MID }, line: { type: "none" } });

  // Cypress trees (tall ovals)
  function cypress(x, y, h, w = 0.14) {
    s.addShape(pres.shapes.OVAL, { x, y, w, h, fill: { color: TREE }, line: { type: "none" } });
  }
  cypress(panelX + 1.15, 4.55, 0.55);
  cypress(panelX + 1.32, 4.50, 0.60);
  cypress(panelX + 1.49, 4.55, 0.55);
  cypress(panelX + 1.66, 4.50, 0.60);
  cypress(panelX + 1.83, 4.58, 0.50);

  // Little farmhouse
  s.addShape(pres.shapes.RECTANGLE, { x: panelX + 3.55, y: 4.78, w: 0.30, h: 0.30, fill: { color: ROOF }, line: { type: "none" } });
  s.addShape(pres.shapes.RECTANGLE, { x: panelX + 3.50, y: 4.70, w: 0.40, h: 0.10, fill: { color: ROOF }, line: { type: "none" } });

  // Single tree on right
  s.addShape(pres.shapes.OVAL, { x: panelX + 4.55, y: 4.78, w: 0.30, h: 0.32, fill: { color: "8C4A22" }, line: { type: "none" } });
  s.addShape(pres.shapes.RECTANGLE, { x: panelX + 4.69, y: 5.05, w: 0.04, h: 0.10, fill: { color: HILL_NEAR }, line: { type: "none" } });

  // Foreground field (striped)
  s.addShape(pres.shapes.RECTANGLE, { x: panelX, y: 5.50, w: panelW, h: 2.0, fill: { color: HILL_NEAR }, line: { type: "none" } });
  for (let i = 0; i < 8; i++) {
    s.addShape(pres.shapes.LINE, {
      x: panelX, y: 5.62 + i * 0.22, w: panelW, h: 0,
      line: { color: "2A0F06", width: 0.6 },
    });
  }

  // Postcard stamp (rotated frame top-right)
  const stampX = W - 2.65, stampY = 0.35, stampW = 2.10, stampH = 1.25;
  s.addShape(pres.shapes.RECTANGLE, {
    x: stampX, y: stampY, w: stampW, h: stampH,
    fill: { type: "none" }, line: { color: "F4DAB6", width: 1 },
    rotate: -6,
  });
  s.addText("POSTA AEREA", { x: stampX + 0.10, y: stampY + 0.08, w: 1.3, h: 0.20, fontFace: MONO, fontSize: 7, color: "F4DAB6", charSpacing: 3, rotate: -6, margin: 0 });
  s.addText("L. 200",      { x: stampX + 1.45, y: stampY + 0.08, w: 0.6, h: 0.20, fontFace: MONO, fontSize: 7, color: "F4DAB6", charSpacing: 2, align: "right", rotate: -6, margin: 0 });
  s.addText("DESTINATION", { x: stampX + 0.10, y: stampY + 0.30, w: 1.3, h: 0.20, fontFace: MONO, fontSize: 7, color: "F4DAB6", charSpacing: 3, rotate: -6, margin: 0 });
  s.addText("Italia",      { x: stampX + 0.10, y: stampY + 0.48, w: 1.95, h: 0.45, fontFace: SERIF, fontSize: 22, italic: true, color: "F4DAB6", rotate: -6, margin: 0 });
  s.addText("Roma · Firenze", { x: stampX + 0.10, y: stampY + 0.92, w: 1.95, h: 0.18, fontFace: MONO, fontSize: 6, color: "F4DAB6", charSpacing: 2, rotate: -6, margin: 0 });
  s.addText("Venezia · Napoli", { x: stampX + 0.10, y: stampY + 1.05, w: 1.95, h: 0.18, fontFace: MONO, fontSize: 6, color: "F4DAB6", charSpacing: 2, rotate: -6, margin: 0 });

  // ----- Left text panel -----

  // Top row labels
  diamond(s, 0.72, 0.46, 0.16, INK);
  s.addText("A TRAVEL EDIT", { x: 0.95, y: 0.32, w: 3, h: 0.30, fontFace: MONO, fontSize: 10, color: INK, charSpacing: 5, margin: 0 });
  s.addText("MMXXVI · VOL. I", { x: 3.5, y: 0.32, w: 3.5, h: 0.30, fontFace: MONO, fontSize: 10, color: INK_SOFT, charSpacing: 5, margin: 0 });

  // Section eyebrow
  s.addShape(pres.shapes.LINE, { x: 0.55, y: 1.30, w: 0.5, h: 0, line: { color: RED, width: 1.2 } });
  s.addText("LA BELLA ITALIA", { x: 1.15, y: 1.16, w: 4, h: 0.28, fontFace: MONO, fontSize: 11, color: RED, charSpacing: 5, bold: true, margin: 0 });

  // Big title: "Italia" with "ia" in italic red
  s.addText([
    { text: "Ital", options: { fontFace: SERIF, fontSize: 140, color: INK } },
    { text: "ia",   options: { fontFace: SERIF, fontSize: 140, color: RED, italic: true } },
  ], {
    x: 0.55, y: 1.50, w: 7.0, h: 2.6,
    fontFace: SERIF, valign: "top", margin: 0,
  });

  // Subtitle
  s.addText("Eight reasons to pack a small bag, a good\nappetite, and a slow itinerary.", {
    x: 0.55, y: 4.55, w: 6.7, h: 1.0,
    fontFace: SERIF, fontSize: 18, italic: true, color: INK,
    margin: 0, lineSpacingMultiple: 1.2,
  });

  // Divider
  s.addShape(pres.shapes.LINE, { x: 0.55, y: 6.10, w: 6.95, h: 0, line: { color: INK_SOFT, width: 0.5 } });

  // Bottom 3 columns
  smallLabel(s, "FROM",        0.55, 6.28, 1.6);
  smallLabel(s, "TO",          2.55, 6.28, 1.6);
  smallLabel(s, "BEST MONTHS", 4.85, 6.28, 2.0);
  s.addText("ANYWHERE", { x: 0.55, y: 6.55, w: 1.8, h: 0.28, fontFace: MONO, fontSize: 10, color: INK, charSpacing: 4, margin: 0 });
  s.addText("ROMA · FIRENZE ·\nVENEZIA", { x: 2.55, y: 6.55, w: 2.2, h: 0.55, fontFace: MONO, fontSize: 10, color: INK, charSpacing: 4, margin: 0, lineSpacingMultiple: 1.1 });
  s.addText("APR — OCT", { x: 4.85, y: 6.55, w: 2.0, h: 0.28, fontFace: MONO, fontSize: 10, color: INK, charSpacing: 4, margin: 0 });

  footer(s, { roman: "I", caption: "COVER · ITALIA", page: "001 / 008" });
}

// ===================================================================
// SLIDE 2 — IL BEL PAESE
// ===================================================================
function slide2() {
  const s = pres.addSlide();
  s.background = { color: CREAM };

  chapterHeader(s, {
    left: "CHAPTER ONE · IL BEL PAESE",
    center: "GEOGRAPHY",
    right: "41.9°N · 12.5°E",
  });

  // Eyebrow
  s.addShape(pres.shapes.LINE, { x: 0.55, y: 1.20, w: 0.5, h: 0, line: { color: RED, width: 1.2 } });
  s.addText("A PENINSULA", { x: 1.15, y: 1.06, w: 4, h: 0.28, fontFace: MONO, fontSize: 11, color: RED, charSpacing: 5, bold: true, margin: 0 });

  // Big title
  s.addText([
    { text: "The boot of\n", options: { fontFace: SERIF, fontSize: 80, color: INK } },
    { text: "Europe.",       options: { fontFace: SERIF, fontSize: 80, color: RED, italic: true } },
  ], {
    x: 0.55, y: 1.45, w: 7.0, h: 2.6,
    valign: "top", margin: 0, lineSpacingMultiple: 1.0,
  });

  // Description
  s.addText(
    "A peninsula of twenty regions, each with its own dialect, dish,\nand patron saint. From Alpine peaks to Sicilian shores, no two\nvalleys feel the same.",
    { x: 0.55, y: 4.05, w: 6.7, h: 1.4,
      fontFace: SERIF, fontSize: 15, color: INK_SOFT,
      margin: 0, lineSpacingMultiple: 1.4 }
  );

  // ----- Map panel (right) -----
  const mx = 7.55, my = 0.65, mw = 5.30, mh = 6.10;
  // frame
  s.addShape(pres.shapes.RECTANGLE, {
    x: mx, y: my, w: mw, h: mh,
    fill: { color: MAP_WATER }, line: { color: MAP_LINE, width: 0.75 },
  });

  // Map labels (top)
  s.addText("PLATE I — ITALIA", { x: mx + 0.20, y: my + 0.18, w: 2, h: 0.22, fontFace: MONO, fontSize: 8, color: INK_SOFT, charSpacing: 3, margin: 0 });
  s.addText("SCALA 1 : 6,000,000", { x: mx + mw - 2.20, y: my + 0.18, w: 2, h: 0.22, fontFace: MONO, fontSize: 8, color: INK_SOFT, charSpacing: 3, align: "right", margin: 0 });

  // Wave pattern (subtle)
  for (let row = 0; row < 18; row++) {
    const yy = my + 0.50 + row * 0.32;
    if (yy > my + mh - 0.30) break;
    for (let col = 0; col < 14; col++) {
      const xx = mx + 0.20 + col * 0.36;
      s.addShape(pres.shapes.LINE, {
        x: xx, y: yy, w: 0.14, h: 0.04,
        line: { color: MAP_LINE, width: 0.4 },
      });
      s.addShape(pres.shapes.LINE, {
        x: xx + 0.14, y: yy + 0.04, w: 0.14, h: -0.04,
        line: { color: MAP_LINE, width: 0.4 },
      });
    }
  }

  // Italy "boot" shape via stacked overlapping ovals (stylized, not literal)
  const cx = mx + mw / 2 + 0.05;
  const piece = (x, y, w, h, rot = 0) => s.addShape(pres.shapes.OVAL, {
    x, y, w, h, rotate: rot,
    fill: { color: MAP_LAND }, line: { type: "none" },
  });

  // top (Alps area)
  piece(cx - 0.65, my + 0.95, 1.0, 0.55, -10);
  // upper neck
  piece(cx - 0.45, my + 1.30, 0.85, 0.85);
  // body upper
  piece(cx - 0.55, my + 1.85, 0.95, 1.30);
  // body mid
  piece(cx - 0.50, my + 2.85, 0.85, 1.20);
  // body lower (bend)
  piece(cx - 0.40, my + 3.85, 0.85, 1.20, 8);
  // boot foot (toe pointing left)
  piece(cx - 0.85, my + 4.80, 1.20, 0.55, -10);
  // heel pointing right
  piece(cx + 0.10, my + 4.85, 0.55, 0.45, 10);

  // Sardinia (small island left)
  s.addShape(pres.shapes.OVAL, {
    x: mx + 0.45, y: my + 3.65, w: 0.40, h: 0.85,
    fill: { color: MAP_LAND }, line: { type: "none" }, rotate: -8,
  });
  // Sicily (bottom)
  s.addShape(pres.shapes.OVAL, {
    x: cx - 0.85, y: my + 5.40, w: 1.30, h: 0.40,
    fill: { color: MAP_LAND }, line: { type: "none" },
  });

  // City dots + labels
  function city(x, y, name, opts = {}) {
    s.addShape(pres.shapes.OVAL, {
      x: x - 0.04, y: y - 0.04, w: 0.10, h: 0.10,
      fill: { color: "8B2A1A" }, line: { type: "none" },
    });
    s.addText(name, {
      x: x + 0.08, y: y - 0.13, w: 1.2, h: 0.26,
      fontFace: SERIF, fontSize: 10,
      italic: opts.italic !== false, bold: !!opts.bold,
      color: INK, margin: 0,
    });
  }
  city(cx - 0.20, my + 1.55, "Milano");
  city(cx + 0.45, my + 1.55, "Venezia");
  city(cx + 0.05, my + 2.85, "Firenze");
  city(cx + 0.10, my + 3.65, "Roma", { bold: true });
  city(cx + 0.35, my + 4.30, "Napoli");
  city(cx - 0.40, my + 5.55, "Palermo");

  // Sea labels
  s.addText("Mar Tirreno", { x: mx + 0.55, y: my + 3.30, w: 1.2, h: 0.22, fontFace: SERIF, fontSize: 9, italic: true, color: INK_SOFT, margin: 0 });
  s.addText("Mare Adriatico", { x: cx + 1.40, y: my + 3.20, w: 1.4, h: 0.22, fontFace: SERIF, fontSize: 9, italic: true, color: INK_SOFT, margin: 0 });
  s.addText("Mar Mediterraneo", { x: mx + 1.0, y: my + 5.40, w: 1.7, h: 0.22, fontFace: SERIF, fontSize: 9, italic: true, color: INK_SOFT, margin: 0 });

  // Compass rose (bottom-right of map)
  const compX = mx + mw - 0.65, compY = my + mh - 0.65;
  s.addShape(pres.shapes.OVAL, { x: compX - 0.22, y: compY - 0.22, w: 0.44, h: 0.44, fill: { type: "none" }, line: { color: INK_SOFT, width: 0.6 } });
  s.addShape(pres.shapes.LINE, { x: compX, y: compY - 0.22, w: 0, h: 0.44, line: { color: INK_SOFT, width: 0.6 } });
  s.addShape(pres.shapes.LINE, { x: compX - 0.22, y: compY, w: 0.44, h: 0, line: { color: INK_SOFT, width: 0.6 } });

  // Stat row at the bottom-left
  s.addShape(pres.shapes.LINE, { x: 0.55, y: 6.10, w: 6.95, h: 0, line: { color: INK_SOFT, width: 0.5 } });

  function stat(x, big, unit, label) {
    s.addText([
      { text: big,  options: { fontFace: SERIF, fontSize: 30, color: INK } },
      { text: unit ? " " + unit : "", options: { fontFace: MONO, fontSize: 9, color: INK_SOFT, charSpacing: 3 } },
    ], { x, y: 6.30, w: 2.2, h: 0.55, margin: 0, valign: "bottom" });
    s.addText(label, { x, y: 6.85, w: 2.2, h: 0.28, fontFace: MONO, fontSize: 8, color: INK_SOFT, charSpacing: 3, margin: 0 });
  }
  stat(0.55, "20", "",      "REGIONS, EACH WITH ITS OWN KITCHEN");
  stat(2.85, "7,600", "km", "OF COASTLINE, TWO SEAS, ONE BOOT");
  stat(5.15, "59", "",      "UNESCO SITES — MOST IN THE WORLD");

  footer(s, { roman: "II", caption: "THE PENINSULA", page: "002 / 008" });
}

// ===================================================================
// SLIDE 3 — ROMA
// ===================================================================
function slide3() {
  const s = pres.addSlide();
  s.background = { color: ESPRESSO };

  chapterHeader(s, {
    left: "CHAPTER TWO · ROMA",
    right: "753 BC → AD ∞",
    color: "8E7B66",
  });

  // SPQR row
  s.addText("· S · P · Q · R ·", {
    x: 0.55, y: 0.95, w: 5, h: 0.45,
    fontFace: MONO, fontSize: 16, color: ESPRESSO_HL, charSpacing: 8, margin: 0,
  });

  // Big title: "Rome, the\nEternal City." with Eternal in gold italic
  s.addText([
    { text: "Rome, the\n",   options: { fontFace: SERIF, fontSize: 110, color: ESPRESSO_HL } },
    { text: "Eternal ",       options: { fontFace: SERIF, fontSize: 110, color: GOLD, italic: true } },
    { text: "City.",          options: { fontFace: SERIF, fontSize: 110, color: ESPRESSO_HL } },
  ], {
    x: 0.55, y: 1.45, w: 12.0, h: 3.6,
    valign: "top", margin: 0, lineSpacingMultiple: 1.0,
  });

  // Faint moon (subtle dark circle to right)
  s.addShape(pres.shapes.OVAL, {
    x: 9.5, y: 1.55, w: 1.6, h: 1.6,
    fill: { color: "2A1B12" }, line: { type: "none" },
  });

  // Skyline silhouettes (very dark) — cypress tree forms + dome
  function ovalDark(x, y, w, h) {
    s.addShape(pres.shapes.OVAL, { x, y, w, h, fill: { color: ESPRESSO_2 }, line: { type: "none" } });
  }
  function rectDark(x, y, w, h) {
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: ESPRESSO_2 }, line: { type: "none" } });
  }
  // Pines on the left
  ovalDark(0.20, 5.55, 0.30, 0.95);
  ovalDark(0.55, 5.45, 0.32, 1.05);
  // Colosseum-ish base center
  ovalDark(3.40, 5.50, 3.50, 1.30);
  rectDark(3.40, 5.95, 3.50, 0.85);
  // Distant cypresses
  ovalDark(2.10, 5.65, 0.20, 0.85);
  ovalDark(2.30, 5.70, 0.20, 0.80);
  // Right side dome cluster (St Peter's-ish)
  ovalDark(9.30, 5.10, 2.40, 1.50);   // big dome
  rectDark(9.30, 5.80, 2.40, 1.00);
  ovalDark(8.60, 5.55, 1.20, 0.95);   // side dome
  rectDark(8.60, 5.95, 1.20, 0.85);
  ovalDark(11.40, 5.55, 1.20, 0.95);  // side dome
  rectDark(11.40, 5.95, 1.20, 0.85);

  // Quote on left
  // small vertical rule
  s.addShape(pres.shapes.LINE, { x: 0.65, y: 5.45, w: 0, h: 1.15, line: { color: "8E7B66", width: 0.7 } });
  s.addText(
    "A city built in layers — empire beneath baroque\nbeneath espresso. Walk five minutes and cross\ntwo thousand years.",
    { x: 0.85, y: 5.40, w: 6.0, h: 1.15,
      fontFace: SERIF, fontSize: 14, italic: true, color: ESPRESSO_HL,
      margin: 0, lineSpacingMultiple: 1.3 }
  );
  s.addText("— FIELD NOTES, TRASTEVERE", {
    x: 0.85, y: 6.55, w: 4, h: 0.22, fontFace: MONO, fontSize: 9, color: "8E7B66", charSpacing: 3, margin: 0,
  });

  // Right list of monuments with dates
  const listX = 8.70, listW = 3.95;
  function row(y, date, name) {
    s.addText(date, { x: listX, y, w: 0.85, h: 0.32, fontFace: MONO, fontSize: 9, color: GOLD, charSpacing: 3, margin: 0, valign: "middle" });
    s.addText(name, { x: listX + 0.95, y, w: listW - 0.95, h: 0.32, fontFace: SERIF, fontSize: 16, italic: true, color: ESPRESSO_HL, margin: 0, valign: "middle" });
    s.addShape(pres.shapes.LINE, { x: listX, y: y + 0.36, w: listW, h: 0, line: { color: "5A4736", width: 0.5 } });
  }
  row(5.10, "80 AD",  "Colosseo");
  row(5.55, "128 AD", "Pantheon");
  row(6.00, "1626",   "San Pietro");
  row(6.45, "TODAY",  "Trastevere");

  footer(s, { roman: "III", caption: "ROMA · CAPUT MUNDI", page: "003 / 008", color: "8E7B66", lineColor: "5A4736" });
}

// ===================================================================
// SLIDE 4 — FIRENZE
// ===================================================================
function slide4() {
  const s = pres.addSlide();
  s.background = { color: CREAM };

  chapterHeader(s, {
    left: "CHAPTER THREE · FIRENZE",
    center: "TOSCANA",
    right: "43.7°N · 11.2°E",
  });

  // Eyebrow
  s.addShape(pres.shapes.LINE, { x: 0.55, y: 1.20, w: 0.5, h: 0, line: { color: RED, width: 1.2 } });
  s.addText("THE CRADLE", { x: 1.15, y: 1.06, w: 4, h: 0.28, fontFace: MONO, fontSize: 11, color: RED, charSpacing: 5, bold: true, margin: 0 });

  // Big title
  s.addText([
    { text: "Where the\n",     options: { fontFace: SERIF, fontSize: 64, color: INK } },
    { text: "Renaissance\n",   options: { fontFace: SERIF, fontSize: 64, color: RED, italic: true } },
    { text: "began.",          options: { fontFace: SERIF, fontSize: 64, color: INK } },
  ], {
    x: 0.55, y: 1.45, w: 6.5, h: 3.4,
    valign: "top", margin: 0, lineSpacingMultiple: 1.0,
  });

  // Drop cap "A" + body
  s.addText("A", {
    x: 0.55, y: 4.50, w: 0.65, h: 0.95,
    fontFace: SERIF, fontSize: 56, italic: true, color: RED, margin: 0,
  });
  s.addText(
    "walkable masterpiece of ochre rooftops and sculpted\nmarble, where Michelangelo, Brunelleschi, and the\nMedici set the course of Western art for five hundred\nyears.",
    { x: 1.25, y: 4.55, w: 5.6, h: 1.45,
      fontFace: SERIF, fontSize: 13, color: INK_SOFT,
      margin: 0, lineSpacingMultiple: 1.35 }
  );

  // Numbered list
  const listY = 5.95;
  s.addShape(pres.shapes.LINE, { x: 0.55, y: listY, w: 6.5, h: 0, line: { color: INK_SOFT, width: 0.5 } });
  function numRow(y, num, text, date) {
    s.addText(num, { x: 0.55, y, w: 0.55, h: 0.24, fontFace: SERIF, fontSize: 12, italic: true, color: RED, margin: 0 });
    s.addText(text, { x: 1.20, y, w: 4.5, h: 0.24, fontFace: SERIF, fontSize: 12, color: INK, margin: 0 });
    s.addText(date, { x: 5.70, y, w: 1.35, h: 0.24, fontFace: MONO, fontSize: 9, color: INK_SOFT, charSpacing: 3, align: "right", margin: 0 });
    s.addShape(pres.shapes.LINE, { x: 0.55, y: y + 0.26, w: 6.5, h: 0, line: { color: INK_SOFT, width: 0.3 } });
  }
  numRow(listY + 0.08, "i.",   "Il Duomo & Brunelleschi's Dome", "1436");
  numRow(listY + 0.34, "ii.",  "Galleria degli Uffizi",          "1581");
  numRow(listY + 0.60, "iii.", "Ponte Vecchio at sunset",         "1345");
  numRow(listY + 0.86, "iv.",  "A Tuscan vineyard, an hour south","Chianti");

  // ----- Right: 1 large image card + 2 smaller cards -----
  const rxBase = 7.30;
  const rwBase = W - rxBase - 0.45; // 5.56

  // Large card: Florence skyline at sunset
  const c1x = rxBase, c1y = 0.65, c1w = rwBase, c1h = 3.55;
  s.addShape(pres.shapes.RECTANGLE, { x: c1x, y: c1y, w: c1w, h: c1h, fill: { color: SKY_TOP }, line: { type: "none" } });
  // sky bands
  s.addShape(pres.shapes.RECTANGLE, { x: c1x, y: c1y + 0.50, w: c1w, h: 0.80, fill: { color: "F0BC78" }, line: { type: "none" } });
  s.addShape(pres.shapes.RECTANGLE, { x: c1x, y: c1y + 1.30, w: c1w, h: 0.80, fill: { color: "EB9F50" }, line: { type: "none" } });
  // distant hills
  s.addShape(pres.shapes.OVAL, { x: c1x - 0.5, y: c1y + 1.85, w: 3.0, h: 0.7, fill: { color: HILL_FAR }, line: { type: "none" } });
  s.addShape(pres.shapes.OVAL, { x: c1x + 2.5, y: c1y + 1.95, w: 3.5, h: 0.6, fill: { color: HILL_FAR }, line: { type: "none" } });
  // ground
  s.addShape(pres.shapes.RECTANGLE, { x: c1x, y: c1y + 2.10, w: c1w, h: 1.45, fill: { color: HILL_NEAR }, line: { type: "none" } });
  // bird marks
  s.addShape(pres.shapes.LINE, { x: c1x + 1.3, y: c1y + 0.35, w: 0.18, h: 0.04, line: { color: HILL_NEAR, width: 1.2 } });
  s.addShape(pres.shapes.LINE, { x: c1x + 1.48, y: c1y + 0.39, w: 0.18, h: -0.04, line: { color: HILL_NEAR, width: 1.2 } });
  s.addShape(pres.shapes.LINE, { x: c1x + 4.3, y: c1y + 0.50, w: 0.18, h: 0.04, line: { color: HILL_NEAR, width: 1.2 } });
  s.addShape(pres.shapes.LINE, { x: c1x + 4.48, y: c1y + 0.54, w: 0.18, h: -0.04, line: { color: HILL_NEAR, width: 1.2 } });

  // Duomo group (center)
  const dx = c1x + c1w/2 - 0.40;
  // body
  s.addShape(pres.shapes.RECTANGLE, { x: dx - 0.40, y: c1y + 1.95, w: 1.20, h: 0.60, fill: { color: "EBD9B5" }, line: { type: "none" } });
  // dome
  s.addShape(pres.shapes.OVAL, { x: dx - 0.30, y: c1y + 1.45, w: 1.00, h: 0.85, fill: { color: "B5391E" }, line: { type: "none" } });
  // lantern
  s.addShape(pres.shapes.RECTANGLE, { x: dx + 0.13, y: c1y + 1.20, w: 0.14, h: 0.30, fill: { color: "EBD9B5" }, line: { type: "none" } });
  // campanile (bell tower) right
  s.addShape(pres.shapes.RECTANGLE, { x: dx + 0.95, y: c1y + 1.50, w: 0.30, h: 1.05, fill: { color: "EBD9B5" }, line: { type: "none" } });
  for (let i = 0; i < 3; i++) {
    s.addShape(pres.shapes.RECTANGLE, { x: dx + 1.02, y: c1y + 1.65 + i*0.25, w: 0.16, h: 0.10, fill: { color: "5A2E1C" }, line: { type: "none" } });
  }
  // Two small towers flanking
  s.addShape(pres.shapes.RECTANGLE, { x: c1x + 0.85, y: c1y + 2.05, w: 0.28, h: 0.50, fill: { color: "EBD9B5" }, line: { type: "none" } });
  s.addShape(pres.shapes.OVAL,      { x: c1x + 0.83, y: c1y + 1.92, w: 0.32, h: 0.20, fill: { color: "B5391E" }, line: { type: "none" } });
  s.addShape(pres.shapes.RECTANGLE, { x: c1x + c1w - 1.15, y: c1y + 2.05, w: 0.28, h: 0.50, fill: { color: "EBD9B5" }, line: { type: "none" } });
  s.addShape(pres.shapes.OVAL,      { x: c1x + c1w - 1.17, y: c1y + 1.92, w: 0.32, h: 0.20, fill: { color: "B5391E" }, line: { type: "none" } });

  // Caption strip
  s.addShape(pres.shapes.RECTANGLE, { x: c1x + 0.20, y: c1y + c1h - 0.40, w: 2.30, h: 0.28, fill: { color: "1B1310" }, line: { type: "none" } });
  s.addText("FIRENZE · IL DUOMO", { x: c1x + 0.30, y: c1y + c1h - 0.40, w: 2.20, h: 0.28, fontFace: MONO, fontSize: 8, color: CREAM, charSpacing: 3, valign: "middle", margin: 0 });

  // Two small cards row
  const c2x = rxBase, c2y = c1y + c1h + 0.20;
  const c2w = (c1w - 0.20) / 2, c2h = 2.50;
  // Card A — David on dark
  s.addShape(pres.shapes.RECTANGLE, { x: c2x, y: c2y, w: c2w, h: c2h, fill: { color: "1B1310" }, line: { type: "none" } });
  // David: simple head silhouette (light)
  s.addShape(pres.shapes.OVAL, { x: c2x + c2w/2 - 0.30, y: c2y + 0.50, w: 0.60, h: 0.80, fill: { color: "E5DCC8" }, line: { type: "none" } });
  // neck
  s.addShape(pres.shapes.RECTANGLE, { x: c2x + c2w/2 - 0.10, y: c2y + 1.20, w: 0.20, h: 0.20, fill: { color: "E5DCC8" }, line: { type: "none" } });
  // shoulders/torso
  s.addShape(pres.shapes.OVAL, { x: c2x + c2w/2 - 0.40, y: c2y + 1.30, w: 0.80, h: 0.60, fill: { color: "E5DCC8" }, line: { type: "none" } });
  // base
  s.addShape(pres.shapes.RECTANGLE, { x: c2x + c2w/2 - 0.50, y: c2y + 1.85, w: 1.00, h: 0.18, fill: { color: "5A4736" }, line: { type: "none" } });

  s.addShape(pres.shapes.RECTANGLE, { x: c2x + 0.18, y: c2y + c2h - 0.40, w: 1.85, h: 0.28, fill: { color: "0F0905" }, line: { type: "none" } });
  s.addText("MARMO · MARBLE", { x: c2x + 0.28, y: c2y + c2h - 0.40, w: 1.75, h: 0.28, fontFace: MONO, fontSize: 8, color: CREAM, charSpacing: 3, valign: "middle", margin: 0 });
  // small italic title
  s.addText("DAVID · 1504", { x: c2x, y: c2y + 1.95, w: c2w, h: 0.30, fontFace: SERIF, fontSize: 10, italic: true, color: CREAM, align: "center", charSpacing: 1, margin: 0 });

  // Card B — Tuscan hills with cypress
  const c3x = c2x + c2w + 0.20;
  s.addShape(pres.shapes.RECTANGLE, { x: c3x, y: c2y, w: c2w, h: c2h, fill: { color: "F0BC78" }, line: { type: "none" } });
  // sky band
  s.addShape(pres.shapes.RECTANGLE, { x: c3x, y: c2y + 0.55, w: c2w, h: 0.50, fill: { color: "EBA868" }, line: { type: "none" } });
  // hill green (clipped to card width)
  s.addShape(pres.shapes.OVAL, { x: c3x, y: c2y + 1.20, w: c2w, h: 1.30, fill: { color: "8B7A2A" }, line: { type: "none" } });
  s.addShape(pres.shapes.RECTANGLE, { x: c3x, y: c2y + 1.85, w: c2w, h: 0.65, fill: { color: "8B7A2A" }, line: { type: "none" } });
  // farmhouse + cypress
  s.addShape(pres.shapes.RECTANGLE, { x: c3x + c2w/2 - 0.10, y: c2y + 1.30, w: 0.20, h: 0.25, fill: { color: ROOF }, line: { type: "none" } });
  // cypresses
  for (let i = 0; i < 4; i++) {
    s.addShape(pres.shapes.OVAL, { x: c3x + c2w/2 - 0.40 + i*0.20, y: c2y + 1.10, w: 0.12, h: 0.50, fill: { color: TREE }, line: { type: "none" } });
  }
  s.addShape(pres.shapes.OVAL, { x: c3x + c2w/2 + 0.30, y: c2y + 1.10, w: 0.12, h: 0.50, fill: { color: TREE }, line: { type: "none" } });
  s.addShape(pres.shapes.OVAL, { x: c3x + c2w/2 + 0.50, y: c2y + 1.05, w: 0.12, h: 0.55, fill: { color: TREE }, line: { type: "none" } });

  s.addShape(pres.shapes.RECTANGLE, { x: c3x + 0.18, y: c2y + c2h - 0.40, w: 1.95, h: 0.28, fill: { color: "0F0905" }, line: { type: "none" } });
  s.addText("TOSCANA · CHIANTI", { x: c3x + 0.28, y: c2y + c2h - 0.40, w: 1.85, h: 0.28, fontFace: MONO, fontSize: 8, color: CREAM, charSpacing: 3, valign: "middle", margin: 0 });

  footer(s, { roman: "IV", caption: "FIRENZE · THE RENAISSANCE", page: "004 / 008" });
}

// ===================================================================
// SLIDE 5 — COSTIERA AMALFITANA
// ===================================================================
function slide5() {
  const s = pres.addSlide();
  s.background = { color: CREAM };

  chapterHeader(s, {
    left: "CHAPTER FOUR · COSTIERA",
    center: "CAMPANIA",
    right: "40.6°N · 14.6°E",
  });

  // Eyebrow
  s.addShape(pres.shapes.LINE, { x: 0.55, y: 1.20, w: 0.5, h: 0, line: { color: RED, width: 1.2 } });
  s.addText("THE COAST", { x: 1.15, y: 1.06, w: 4, h: 0.28, fontFace: MONO, fontSize: 11, color: RED, charSpacing: 5, bold: true, margin: 0 });

  // Big title
  s.addText([
    { text: "The ",     options: { fontFace: SERIF, fontSize: 70, color: INK } },
    { text: "Amalfi\n", options: { fontFace: SERIF, fontSize: 70, color: RED, italic: true } },
    { text: "Coast.",   options: { fontFace: SERIF, fontSize: 70, color: INK } },
  ], {
    x: 0.55, y: 1.45, w: 6.5, h: 2.6,
    valign: "top", margin: 0, lineSpacingMultiple: 1.05,
  });

  // Description
  s.addText(
    "Lemon groves clinging to cliffs, pastel\nvillages stitched along the Tyrrhenian, and\nroads that turn every drive into cinema.",
    { x: 0.55, y: 4.05, w: 6.0, h: 1.4,
      fontFace: SERIF, fontSize: 16, color: INK_SOFT,
      margin: 0, lineSpacingMultiple: 1.35 }
  );

  // Divider above town list
  s.addShape(pres.shapes.LINE, { x: 0.55, y: 5.65, w: 6.5, h: 0, line: { color: INK_SOFT, width: 0.5 } });

  // 2x2 town list
  function town(x, y, name, label) {
    s.addShape(pres.shapes.LINE, { x, y: y - 0.05, w: 0, h: 0.65, line: { color: RED, width: 0.7 } });
    s.addText(name,  { x: x + 0.12, y, w: 2.6, h: 0.30, fontFace: SERIF, fontSize: 15, italic: true, color: INK, margin: 0 });
    s.addText(label, { x: x + 0.12, y: y + 0.30, w: 2.6, h: 0.26, fontFace: MONO, fontSize: 9, color: INK_SOFT, charSpacing: 3, margin: 0 });
  }
  town(0.55, 5.85, "Positano", "THE POSTCARD ONE");
  town(3.20, 5.85, "Ravello",  "MUSIC IN THE CLOUDS");
  town(0.55, 6.40, "Capri",    "AN ISLAND LUNCH");
  town(3.20, 6.40, "Sorrento", "LIMONCELLO, ALWAYS");

  // ---------- Right illustration: Amalfi cliff & sea ----------
  const ax = 7.30, ay = 0.75, aw = W - ax - 0.45, ah = 6.0;
  // sky base
  s.addShape(pres.shapes.RECTANGLE, { x: ax, y: ay, w: aw, h: ah * 0.55, fill: { color: SKY_TOP }, line: { type: "none" } });
  s.addShape(pres.shapes.RECTANGLE, { x: ax, y: ay + 0.60, w: aw, h: 1.20, fill: { color: "F0BC78" }, line: { type: "none" } });
  s.addShape(pres.shapes.RECTANGLE, { x: ax, y: ay + 1.80, w: aw, h: 1.40, fill: { color: "EB9F50" }, line: { type: "none" } });

  // Sun
  s.addShape(pres.shapes.OVAL, { x: ax + aw - 1.5, y: ay + 0.85, w: 1.10, h: 1.10, fill: { color: SUN }, line: { type: "none" } });

  // Lemons (top-left)
  s.addShape(pres.shapes.OVAL, { x: ax + 0.50, y: ay + 0.20, w: 0.32, h: 0.40, fill: { color: "F2CB39" }, line: { type: "none" } });
  s.addShape(pres.shapes.OVAL, { x: ax + 0.85, y: ay + 0.30, w: 0.32, h: 0.40, fill: { color: "F2CB39" }, line: { type: "none" } });
  // leaves
  s.addShape(pres.shapes.OVAL, { x: ax + 0.55, y: ay + 0.05, w: 0.18, h: 0.10, fill: { color: "2E5C2A" }, line: { type: "none" }, rotate: -20 });
  s.addShape(pres.shapes.OVAL, { x: ax + 0.90, y: ay + 0.10, w: 0.18, h: 0.10, fill: { color: "2E5C2A" }, line: { type: "none" }, rotate: -10 });

  // Cliff (brown landform)
  s.addShape(pres.shapes.RECTANGLE, { x: ax, y: ay + 3.20, w: aw, h: 2.80, fill: { color: HILL_NEAR }, line: { type: "none" } });
  // cliff top curve (kept within panel bounds)
  s.addShape(pres.shapes.OVAL, { x: ax, y: ay + 2.80, w: aw, h: 1.20, fill: { color: HILL_NEAR }, line: { type: "none" } });

  // Sea (right portion)
  const seaX = ax + aw * 0.55;
  s.addShape(pres.shapes.RECTANGLE, { x: seaX, y: ay + 3.40, w: aw - aw*0.55, h: 2.60, fill: { color: SEA }, line: { type: "none" } });
  // wave lines
  for (let i = 0; i < 4; i++) {
    s.addShape(pres.shapes.LINE, { x: seaX + 0.10, y: ay + 4.0 + i*0.35, w: aw - aw*0.55 - 0.20, h: 0, line: { color: "5A8AA0", width: 0.6 } });
  }
  // little sailboats
  function boat(bx, by) {
    s.addShape(pres.shapes.RECTANGLE, { x: bx, y: by + 0.18, w: 0.30, h: 0.06, fill: { color: "F0E6D2" }, line: { type: "none" } });
    s.addShape(pres.shapes.LINE, { x: bx + 0.15, y: by, w: 0, h: 0.18, line: { color: "1B1310", width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: bx + 0.15, y: by, w: 0.10, h: 0.18, fill: { color: "F0E6D2" }, line: { type: "none" } });
  }
  boat(seaX + 1.30, ay + 4.55);
  boat(seaX + 1.95, ay + 4.85);

  // Pastel houses cluster (on cliff)
  function house(hx, hy, color, hw = 0.42, hh = 0.42) {
    // body
    s.addShape(pres.shapes.RECTANGLE, { x: hx, y: hy, w: hw, h: hh, fill: { color }, line: { type: "none" } });
    // roof
    s.addShape(pres.shapes.RECTANGLE, { x: hx - 0.03, y: hy - 0.08, w: hw + 0.06, h: 0.10, fill: { color: "8B3A1F" }, line: { type: "none" } });
    // window
    s.addShape(pres.shapes.RECTANGLE, { x: hx + hw/2 - 0.04, y: hy + 0.12, w: 0.09, h: 0.10, fill: { color: INK }, line: { type: "none" } });
  }
  const villX = ax + 1.2, villY = ay + 3.10;
  house(villX,        villY,        "EFD2A4");
  house(villX + 0.55, villY - 0.05, "C26641");
  house(villX + 1.10, villY + 0.05, "F0E6D2");
  house(villX,        villY + 0.55, "E8C046");
  house(villX + 0.55, villY + 0.50, "C26641");
  house(villX + 1.10, villY + 0.55, "EFD2A4");
  house(villX - 0.10, villY + 1.05, "F0E6D2");
  house(villX + 0.55, villY + 1.00, "D49E80");
  house(villX + 1.10, villY + 1.05, "C26641");
  // dome church
  s.addShape(pres.shapes.RECTANGLE, { x: villX + 1.65, y: villY + 0.50, w: 0.40, h: 0.55, fill: { color: "F0E6D2" }, line: { type: "none" } });
  s.addShape(pres.shapes.OVAL,      { x: villX + 1.70, y: villY + 0.30, w: 0.30, h: 0.30, fill: { color: "BFA13A" }, line: { type: "none" } });

  // Caption pill at bottom of art
  s.addShape(pres.shapes.RECTANGLE, { x: ax + 0.18, y: ay + ah - 0.42, w: 2.05, h: 0.28, fill: { color: CREAM }, line: { color: INK_SOFT, width: 0.5 } });
  s.addText("COSTA D'AMALFI · UNESCO 1997", { x: ax + 0.20, y: ay + ah - 0.42, w: 2.0, h: 0.28, fontFace: MONO, fontSize: 7.5, color: INK_SOFT, charSpacing: 2, valign: "middle", margin: 0 });

  footer(s, { roman: "V", caption: "COSTIERA AMALFITANA", page: "005 / 008" });
}

// ===================================================================
// SLIDE 6 — VENEZIA
// ===================================================================
function slide6() {
  const s = pres.addSlide();
  s.background = { color: NAVY };

  chapterHeader(s, {
    left: "CHAPTER FIVE · VENEZIA",
    right: "118 ISLANDS · 417 BRIDGES",
    color: "94B0BF",
  });

  // Moon (top-right) with subtle glow ring
  s.addShape(pres.shapes.OVAL, { x: 11.20, y: 0.55, w: 1.30, h: 1.30, fill: { color: "1A3D54" }, line: { type: "none" } });
  s.addShape(pres.shapes.OVAL, { x: 11.30, y: 0.65, w: 1.10, h: 1.10, fill: { color: MOON }, line: { type: "none" } });

  // Top decorative label "A CITY ON" with diamonds + lines (centered above big title)
  const cyTop = 1.90;
  // left line
  s.addShape(pres.shapes.LINE, { x: 3.80, y: cyTop, w: 2.20, h: 0, line: { color: "94B0BF", width: 0.6 } });
  diamond(s, 6.10, cyTop, 0.10, "94B0BF");
  s.addText("A CITY ON", { x: 6.20, y: cyTop - 0.13, w: 2.10, h: 0.26, fontFace: MONO, fontSize: 11, color: "C9D6DD", align: "center", margin: 0 });
  diamond(s, 8.40, cyTop, 0.10, "94B0BF");
  s.addShape(pres.shapes.LINE, { x: 8.50, y: cyTop, w: 2.20, h: 0, line: { color: "94B0BF", width: 0.6 } });

  // Skyline silhouettes (dark teal)
  function sil(x, y, w, h, color = NAVY_DARK) {
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color }, line: { type: "none" } });
  }
  function silOval(x, y, w, h, color = NAVY_DARK) {
    s.addShape(pres.shapes.OVAL, { x, y, w, h, fill: { color }, line: { type: "none" } });
  }
  // ground/water line band
  sil(0, 4.50, W, 0.05, NAVY_DEEP);
  sil(0, 4.55, W, 0.30, NAVY_DEEP);

  // Left low building (San Marco-ish blocks)
  sil(0.60, 3.85, 1.80, 0.70);
  // crenellation row
  for (let i = 0; i < 6; i++) sil(0.65 + i*0.30, 3.70, 0.18, 0.18);

  // Cluster center: dome + tower
  silOval(5.00, 2.65, 1.50, 1.20);
  silOval(5.40, 2.40, 1.10, 1.10);
  silOval(5.80, 2.55, 1.30, 1.20);
  sil(5.10, 3.50, 1.90, 1.10);
  // campanile (positioned to start below the "A CITY ON" label)
  sil(7.10, 2.40, 0.45, 2.20);
  silOval(7.05, 2.20, 0.55, 0.30);

  // San Marco-like wider building right of center
  sil(8.50, 3.60, 1.60, 1.00);
  silOval(8.40, 3.30, 1.80, 0.60);

  // Right column tower under moon
  sil(11.50, 2.10, 0.45, 2.50);
  silOval(11.45, 1.95, 0.55, 0.30);

  // Big title "Venezia." in serif italic cream
  s.addText("Venezia.", {
    x: 1.5, y: 2.45, w: 10.5, h: 1.95,
    fontFace: SERIF, fontSize: 132, italic: true, color: ESPRESSO_HL,
    align: "center", margin: 0,
  });

  // Subtitle below
  s.addText("Where the streets are water and the traffic hums in oar-strokes.", {
    x: 1.0, y: 4.55, w: 11.3, h: 0.45,
    fontFace: SERIF, fontSize: 18, color: ESPRESSO_HL, align: "center", margin: 0,
  });

  // Gondola small sketch under subtitle
  s.addShape(pres.shapes.OVAL, { x: 6.30, y: 5.05, w: 0.75, h: 0.10, fill: { color: NAVY_DARK }, line: { type: "none" } });
  s.addShape(pres.shapes.LINE, { x: 6.40, y: 5.10, w: 0.55, h: -0.20, line: { color: "8B3A1F", width: 1 } });

  // Stat row
  s.addShape(pres.shapes.LINE, { x: 0.55, y: 5.80, w: W - 1.1, h: 0, line: { color: "94B0BF", width: 0.5 } });

  function vstat(x, big, unit, label) {
    s.addText([
      { text: big, options: { fontFace: SERIF, fontSize: 38, color: ESPRESSO_HL } },
      { text: unit ? " " + unit : "", options: { fontFace: MONO, fontSize: 9, color: "94B0BF", charSpacing: 3 } },
    ], { x, y: 6.00, w: 3.0, h: 0.65, margin: 0, valign: "bottom" });
    s.addText(label, { x, y: 6.65, w: 3.0, h: 0.28, fontFace: MONO, fontSize: 8, color: "94B0BF", charSpacing: 3, margin: 0 });
  }
  vstat(0.55,  "118",   "",    "ISLANDS STITCHED TOGETHER BY BRIDGES");
  vstat(3.65,  "417",   "",    "BRIDGES ACROSS THE CANALS");
  vstat(6.85,  "1,600", "yrs", "SINCE THE FIRST PILINGS WERE SUNK");
  vstat(10.20, "0",     "",    "CARS IN THE HISTORIC CENTRE");

  footer(s, { roman: "VI", caption: "VENEZIA · LA SERENISSIMA", page: "006 / 008", color: "94B0BF", lineColor: "4A6B7B" });
}

// ===================================================================
// SLIDE 7 — LA CUCINA
// ===================================================================
function slide7() {
  const s = pres.addSlide();
  s.background = { color: CREAM };

  chapterHeader(s, {
    left: "CHAPTER SIX · A MENU BY REGION",
    center: "LA TAVOLA",
    right: "20 CUCINE · 1 LINGUA",
  });

  // Eyebrow
  s.addShape(pres.shapes.LINE, { x: 0.55, y: 1.20, w: 0.5, h: 0, line: { color: RED, width: 1.2 } });
  s.addText("A PARTIAL MENU", { x: 1.15, y: 1.06, w: 4, h: 0.28, fontFace: MONO, fontSize: 11, color: RED, charSpacing: 5, bold: true, margin: 0 });

  // Big title: "La cucina italiana." with cucina red italic
  s.addText([
    { text: "La ",         options: { fontFace: SERIF, fontSize: 76, color: INK } },
    { text: "cucina ",     options: { fontFace: SERIF, fontSize: 76, color: RED, italic: true } },
    { text: "italiana.",   options: { fontFace: SERIF, fontSize: 76, color: INK } },
  ], {
    x: 0.55, y: 1.40, w: 12, h: 1.5,
    valign: "top", margin: 0,
  });

  // Italic deck
  s.addText("Twenty regions, twenty kitchens — choose any one and you've already won.", {
    x: 0.55, y: 3.05, w: 11, h: 0.4,
    fontFace: SERIF, fontSize: 18, italic: true, color: INK_SOFT, margin: 0,
  });

  // Two columns of dishes
  const colY = 3.65;
  const colHeaderColor = RED;

  function colHeader(x, w, text) {
    s.addText(text, { x, y: colY, w, h: 0.28, fontFace: MONO, fontSize: 10, color: colHeaderColor, charSpacing: 5, bold: true, margin: 0 });
    s.addShape(pres.shapes.LINE, { x, y: colY + 0.32, w, h: 0, line: { color: INK_SOFT, width: 0.5 } });
  }

  function dish(x, y, w, name, desc, region) {
    s.addText(name, { x, y, w: w - 1.7, h: 0.32, fontFace: SERIF, fontSize: 17, italic: true, color: RED, margin: 0 });
    s.addText(region, { x: x + w - 1.7, y, w: 1.7, h: 0.32, fontFace: MONO, fontSize: 9, color: INK_SOFT, charSpacing: 3, align: "right", valign: "middle", margin: 0 });
    s.addText(desc, { x, y: y + 0.34, w, h: 0.26, fontFace: SERIF, fontSize: 10, color: INK_SOFT, margin: 0 });
    s.addShape(pres.shapes.LINE, { x, y: y + 0.66, w, h: 0, line: { color: INK_SOFT, width: 0.3 } });
  }

  // Column 1: Primi
  const c1x = 0.55, c1w = 5.0;
  colHeader(c1x, c1w, "PRIMI · THE FIRST PLATE");
  dish(c1x, colY + 0.50, c1w, "Cacio e Pepe",          "Tonnarelli, pecorino, black pepper. Three ingredients, one religion.", "LAZIO");
  dish(c1x, colY + 1.25, c1w, "Tagliatelle al Ragù",   "The original — slow-cooked, beef and pork, never spaghetti.",          "EMILIA-ROMAGNA");
  dish(c1x, colY + 2.00, c1w, "Risotto alla Milanese", "Saffron-gold, finished with bone marrow.",                              "LOMBARDIA");
  dish(c1x, colY + 2.75, c1w, "Pizza Margherita",      "Tomato, mozzarella, basil — the colours of the flag.",                 "CAMPANIA");

  // Column 2: Dolci & Caffè
  const c2x = 5.85, c2w = 5.0;
  colHeader(c2x, c2w, "DOLCI & CAFFÈ");
  dish(c2x, colY + 0.50, c2w, "Tiramisù",         "Espresso, mascarpone, cocoa. Picked-me-up, literally.", "VENETO");
  dish(c2x, colY + 1.25, c2w, "Cannoli",          "Crisp shell, sweet ricotta, a pinch of pistachio.",      "SICILIA");
  dish(c2x, colY + 2.00, c2w, "Gelato Artigianale","Pistacchio, fior di latte, stracciatella — never American.", "OVUNQUE");
  dish(c2x, colY + 2.75, c2w, "Espresso, in piedi","Standing at the bar, one euro, never to-go.",            "ITALIA");

  // Right illustration card — pasta plate still life
  const ix = 11.10, iy = 3.30, iw = 1.85, ih = 3.55;
  s.addShape(pres.shapes.RECTANGLE, { x: ix, y: iy, w: iw, h: ih, fill: { color: CREAM_DEEP }, line: { color: INK_SOFT, width: 0.4 } });
  s.addText("TAVOLA NO. 1", { x: ix + 0.08, y: iy + 0.12, w: 0.95, h: 0.20, fontFace: MONO, fontSize: 6.5, color: INK_SOFT, charSpacing: 2, margin: 0 });
  s.addText("MISE EN PLACE", { x: ix + iw - 0.95, y: iy + 0.12, w: 0.87, h: 0.20, fontFace: MONO, fontSize: 6.5, color: INK_SOFT, charSpacing: 2, align: "right", margin: 0 });

  // Plate of pasta
  const py = iy + 1.30;
  s.addShape(pres.shapes.OVAL, { x: ix + 0.20, y: py, w: 1.45, h: 0.85, fill: { color: "F4ECDA" }, line: { color: INK_SOFT, width: 0.5 } });
  s.addShape(pres.shapes.OVAL, { x: ix + 0.35, y: py + 0.15, w: 1.15, h: 0.55, fill: { color: "E5C77A" }, line: { type: "none" } });
  // basil dots
  s.addShape(pres.shapes.OVAL, { x: ix + 0.65, y: py + 0.25, w: 0.10, h: 0.05, fill: { color: "2E5C2A" }, line: { type: "none" } });
  s.addShape(pres.shapes.OVAL, { x: ix + 0.95, y: py + 0.30, w: 0.10, h: 0.05, fill: { color: "2E5C2A" }, line: { type: "none" } });

  // wine glass (left)
  s.addShape(pres.shapes.OVAL, { x: ix + 0.25, y: py - 0.85, w: 0.40, h: 0.55, fill: { color: "6E1620" }, line: { type: "none" } });
  s.addShape(pres.shapes.LINE, { x: ix + 0.45, y: py - 0.30, w: 0, h: 0.40, line: { color: INK_SOFT, width: 0.7 } });
  s.addShape(pres.shapes.RECTANGLE, { x: ix + 0.30, y: py + 0.10, w: 0.30, h: 0.04, fill: { color: INK_SOFT }, line: { type: "none" } });

  // bread (top right)
  s.addShape(pres.shapes.OVAL, { x: ix + 1.15, y: py - 0.45, w: 0.55, h: 0.20, fill: { color: "C9924C" }, line: { type: "none" } });

  // olive oil bottle
  s.addShape(pres.shapes.RECTANGLE, { x: ix + 0.55, y: py + 1.05, w: 0.35, h: 0.70, fill: { color: "4F6B2A" }, line: { type: "none" } });
  s.addShape(pres.shapes.RECTANGLE, { x: ix + 0.65, y: py + 0.85, w: 0.15, h: 0.22, fill: { color: "8B5A2A" }, line: { type: "none" } });
  // label
  s.addShape(pres.shapes.RECTANGLE, { x: ix + 0.58, y: py + 1.20, w: 0.29, h: 0.30, fill: { color: "F0E6D2" }, line: { type: "none" } });
  s.addText("olio", { x: ix + 0.58, y: py + 1.22, w: 0.29, h: 0.25, fontFace: SERIF, fontSize: 6, italic: true, color: INK_SOFT, align: "center", margin: 0 });

  // tomatoes
  s.addShape(pres.shapes.OVAL, { x: ix + 1.05, y: py + 1.30, w: 0.32, h: 0.32, fill: { color: "B5391E" }, line: { type: "none" } });
  s.addShape(pres.shapes.OVAL, { x: ix + 1.30, y: py + 1.40, w: 0.32, h: 0.32, fill: { color: "B5391E" }, line: { type: "none" } });

  // Quote at bottom
  s.addText('"Mangia bene, ridi spesso."', {
    x: ix + 0.05, y: iy + ih - 0.35, w: iw - 0.10, h: 0.28,
    fontFace: SERIF, fontSize: 9, italic: true, color: INK_SOFT, align: "center", margin: 0,
  });

  footer(s, { roman: "VII", caption: "LA CUCINA · THE TABLE", page: "007 / 008" });
}

// ===================================================================
// SLIDE 8 — ANDIAMO (FINALE)
// ===================================================================
function slide8() {
  const s = pres.addSlide();
  s.background = { color: CREAM };

  // Top decorative arches (8 thin arcs, with a diamond at each apex)
  const archCount = 8;
  const archY = 0.20;
  const archH = 0.75;
  const margin = 0.55;
  const totalW = W - margin * 2;
  const archW = totalW / archCount;
  for (let i = 0; i < archCount; i++) {
    const x = margin + i * archW;
    // Top half of an oval — using oval and a cream cover rectangle below to mask the bottom half
    s.addShape(pres.shapes.OVAL, {
      x, y: archY, w: archW * 0.95, h: archH * 2.0,
      fill: { type: "none" }, line: { color: "B89274", width: 0.7 },
    });
    // diamond at apex
    diamond(s, x + (archW * 0.95) / 2, archY + 0.20, 0.12, RED);
  }
  // mask lower half of arches with cream rectangle (covers everything below archY + archH)
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: archY + archH, w: W, h: 1.20, fill: { color: CREAM }, line: { type: "none" } });

  // Header row: FINALE — ANDIAMO — THE LAST PAGE
  const headerY = 1.30;
  smallLabel(s, "FINALE", 0.55, headerY, 1.5);
  // Center label box
  s.addText("ANDIAMO", { x: (W - 2)/2, y: headerY, w: 2, h: 0.28, fontFace: MONO, fontSize: 10, color: INK_SOFT, charSpacing: 5, align: "center", margin: 0 });
  // line + diamonds + sublabel
  const subY = headerY + 0.34;
  s.addShape(pres.shapes.LINE, { x: 4.10, y: subY + 0.10, w: 1.05, h: 0, line: { color: "B89274", width: 0.6 } });
  diamond(s, 5.25, subY + 0.10, 0.10, RED);
  s.addText("THE ONLY QUESTION LEFT", { x: 5.40, y: subY, w: 3.0, h: 0.26, fontFace: MONO, fontSize: 9, color: RED, charSpacing: 4, align: "center", bold: true, margin: 0 });
  diamond(s, 8.45, subY + 0.10, 0.10, RED);
  s.addShape(pres.shapes.LINE, { x: 8.60, y: subY + 0.10, w: 1.05, h: 0, line: { color: "B89274", width: 0.6 } });
  smallLabel(s, "THE LAST PAGE", W - 2.0, headerY, 1.5, { align: "right" });

  // Big "Andiamo?" centered
  s.addText("Andiamo?", {
    x: 0.55, y: 2.65, w: W - 1.1, h: 2.20,
    fontFace: SERIF, fontSize: 140, italic: true, color: INK,
    align: "center", margin: 0,
  });

  // Quote — Verdi, with "Italy" highlighted in red italic
  s.addText([
    { text: "“You may have the universe if I may have ", options: { fontFace: SERIF, fontSize: 16, color: INK } },
    { text: "Italy",                                       options: { fontFace: SERIF, fontSize: 16, color: RED, italic: true } },
    { text: ".”",                                          options: { fontFace: SERIF, fontSize: 16, color: INK } },
  ], {
    x: 1.5, y: 5.20, w: W - 3, h: 0.4,
    align: "center", margin: 0,
  });
  s.addText("— GIUSEPPE VERDI", {
    x: 1.5, y: 5.65, w: W - 3, h: 0.28,
    fontFace: MONO, fontSize: 9, color: INK_SOFT, charSpacing: 4, align: "center", margin: 0,
  });

  // Divider
  s.addShape(pres.shapes.LINE, { x: 0.55, y: 6.20, w: W - 1.1, h: 0, line: { color: INK_SOFT, width: 0.5 } });

  // Four seasons row
  function season(x, w, name, label) {
    s.addShape(pres.shapes.LINE, { x, y: 6.35, w: 0, h: 0.65, line: { color: RED, width: 0.7 } });
    s.addText(name,  { x: x + 0.12, y: 6.40, w: w - 0.20, h: 0.30, fontFace: SERIF, fontSize: 16, italic: true, color: INK, margin: 0 });
    s.addText(label, { x: x + 0.12, y: 6.70, w: w - 0.20, h: 0.30, fontFace: MONO, fontSize: 8, color: INK_SOFT, charSpacing: 3, margin: 0 });
  }
  const seasonW = (W - 1.1) / 4;
  season(0.55 + seasonW * 0, seasonW, "Spring", "COOL MORNINGS, WISTERIA, FEWER CROWDS");
  season(0.55 + seasonW * 1, seasonW, "Summer", "COAST, LEMONS, LONG WARM EVENINGS");
  season(0.55 + seasonW * 2, seasonW, "Autumn", "HARVEST, TRUFFLES, GOLDEN LIGHT");
  season(0.55 + seasonW * 3, seasonW, "Winter", "EMPTY PIAZZAS, OPERA, ESPRESSO");

  footer(s, { roman: "VIII", caption: "ANDIAMO · FINE", page: "008 / 008" });
}

// Build all slides
slide1();
slide2();
slide3();
slide4();
slide5();
slide6();
slide7();
slide8();

pres.writeFile({ fileName: "italy.pptx" }).then(fn => {
  console.log("Wrote", fn);
});
