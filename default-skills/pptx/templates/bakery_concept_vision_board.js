// pastry_ann_arbor.js
// Recreates "pastry_ann_arbor.pptx" using pptxgenjs.
// Run:  node pastry_ann_arbor.js
// Requires: npm install pptxgenjs   (or:  npm install -g pptxgenjs)

const pptxgen = require("pptxgenjs");

// ---------- Setup ----------
const pres = new pptxgen();
pres.title = "Pastry, plainly. — Ann Arbor";
pres.defineLayout({ name: "CUSTOM_20x1125", width: 20, height: 11.25 });
pres.layout = "CUSTOM_20x1125";

// ---------- Palette ----------
const C = {
  cream:        "F9EFD4",
  cream2:       "F4EAD8",
  cream3:       "FAF3E2",
  cream4:       "FFF4D4",
  butter:       "F7E9BF",
  butterDk:     "E8DCC0",
  ochre:        "D49A4A",
  ochreCard:    "ECDFC6",
  brand:        "C0392B",   // red accent
  rust:         "C34A35",
  brown:        "2B1D12",
  brownDk:      "3A2615",
  brownDk2:     "5A3A20",
  brownMid:     "4A3220",
  caramel:      "8A4A18",
  caramel2:     "D8A050",
  caramel3:     "F0D090",
  caramel4:     "D8A86C",
  cocoa:        "3A2615",
  butterPat:    "E8D4A8",
  marble:       "ECEAD8",
  sage:         "4A5734",
  sage2:        "5A6A3A",
  sageLite:     "7A8A4E",
  creamHi:      "FAECC8",
  creamHi2:     "FAEBC8",
  paleSand:     "F0E2C2",
  pendBulb:     "FFE9A8",
  pendShadow:   "28190A",
  ceilingTrim:  "8A5A30",
  floor:        "5A3A20",
  goldGlow:     "E8C878",
  cream5:       "FAF3E2",
  windowSill:   "B8A878",
  windowSill2:  "8A7A4A",
  benchBrown:   "4A2E18",
};

// Convert XML "spc" (1/100 of a point) to pptxgenjs "charSpacing" (points).
const spc = (v) => v / 100;
// Convert XML "sz" (1/100 of a point) to pptxgenjs "fontSize" (points).
const sz = (v) => v / 100;

const FONT = "Arial";

// ============================================================
//  SLIDE 1 — Cover
// ============================================================
function slide1() {
  const s = pres.addSlide();
  // Left cream panel
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 20, h: 11.25, fill: { color: C.cream }, line: { color: C.cream }
  });
  // Right ochre panel
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10, y: 0, w: 10, h: 11.25, fill: { color: C.ochre }, line: { color: C.ochre }
  });

  // Top-left mark — small red dot + tiny eyebrow
  s.addShape(pres.shapes.OVAL, {
    x: 1.146, y: 1.195, w: 0.104, h: 0.104,
    fill: { color: C.brand }, line: { color: C.brand }
  });
  s.addText("A VISION BOARD", {
    x: 1.438, y: 1.146, w: 2.098, h: 0.245, margin: 0,
    fontFace: FONT, fontSize: sz(1200), color: C.brownMid, charSpacing: spc(336), align: "left"
  });
  s.addText("/", {
    x: 3.64, y: 1.146, w: 0.176, h: 0.245, margin: 0,
    fontFace: FONT, fontSize: sz(1200), color: C.brownMid, charSpacing: spc(336), align: "left"
  });
  s.addText("ANN ARBOR, MI", {
    x: 3.921, y: 1.146, w: 1.959, h: 0.245, margin: 0,
    fontFace: FONT, fontSize: sz(1200), color: C.brownMid, charSpacing: spc(336), align: "left"
  });

  // Big headline "Daily & good." with red ampersand
  s.addText([
    { text: "Daily ",  options: { italic: true, color: C.brown,  fontFace: FONT, fontSize: sz(16500), charSpacing: spc(-660) } },
    { text: "& ",      options: { italic: true, color: C.brand,  fontFace: FONT, fontSize: sz(16500), charSpacing: spc(-660) } },
    { text: "good.",   options: { italic: true, color: C.brown,  fontFace: FONT, fontSize: sz(16500), charSpacing: spc(-660) } },
  ], { x: 1.146, y: 3.304, w: 9.12, h: 4.075, margin: 0, align: "left", valign: "top" });

  // Body line bottom-left
  s.addText("A neighborhood pastry shop. Baked every morning. Honest prices. No theatrics.", {
    x: 1.146, y: 9.537, w: 3.862, h: 0.608, margin: 0,
    fontFace: FONT, fontSize: sz(1200), color: C.brownMid, charSpacing: spc(48), align: "left"
  });
  // Eyebrow on left, bottom-right
  s.addText("VOL. 01 SPRING 2026 MOOD & DIRECTION", {
    x: 7.274, y: 9.292, w: 1.893, h: 0.854, margin: 0,
    fontFace: FONT, fontSize: sz(975), color: C.brownMid, charSpacing: spc(215), align: "right"
  });

  // Right panel — concentric circles
  s.addShape(pres.shapes.OVAL, {
    x: 12.594, y: 3.219, w: 4.812, h: 4.812,
    fill: { color: C.ochre }, line: { color: C.creamHi2, width: 0.75 }
  });
  s.addShape(pres.shapes.OVAL, {
    x: 12.698, y: 3.323, w: 4.604, h: 4.604,
    fill: { color: C.ochre }, line: { color: C.creamHi2, width: 0.75 }
  });
  // Inner stamp text
  s.addText("— Est. 2026 —", {
    x: 14.085, y: 4.331, w: 1.83, h: 0.213, margin: 0,
    fontFace: FONT, fontSize: sz(1050), color: C.creamHi, charSpacing: spc(420), align: "center"
  });
  s.addText("Pastry, plainly.", {
    x: 12.594, y: 4.815, w: 4.812, h: 1.704, margin: 0,
    fontFace: FONT, fontSize: sz(6300), italic: true, color: C.creamHi, align: "center", valign: "middle",
    wrap: false
  });
  s.addText("Ann Arbor · Michigan", {
    x: 13.872, y: 6.769, w: 2.257, h: 0.192, margin: 0,
    fontFace: FONT, fontSize: sz(900), color: C.creamHi, charSpacing: spc(360), align: "center"
  });
}

// ============================================================
//  SLIDE 2 — The Promise (three columns)
// ============================================================
function slide2() {
  const s = pres.addSlide();
  s.background = { color: C.cream2 };

  // Faint horizontal rule under the eyebrow
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.146, y: 2.391, w: 17.708, h: 0.01,
    fill: { color: C.brown, transparency: 75 }, line: { color: C.brown, transparency: 75 }
  });

  // Eyebrow
  s.addText("CH. 01 — THE PROMISE", {
    x: 1.146, y: 1.854, w: 2.61, h: 0.245, margin: 0,
    fontFace: FONT, fontSize: sz(1200), color: C.brand, charSpacing: spc(216), align: "left"
  });
  // Right-side title
  s.addText([
    { text: "Three things, ", options: { color: C.brown,    fontFace: FONT, fontSize: sz(7200), charSpacing: spc(-180) } },
    { text: "done well.",     options: { italic: true, color: C.caramel, fontFace: FONT, fontSize: sz(7200), charSpacing: spc(-180) } },
  ], { x: 9.69, y: 1.042, w: 9.439, h: 1.057, margin: 0, align: "left" });

  // Three vertical separators between columns
  const colSep = (x) => s.addShape(pres.shapes.RECTANGLE, {
    x, y: 3.026, w: 0.01, h: 7.391,
    fill: { color: C.brown, transparency: 82 }, line: { color: C.brown, transparency: 82 }
  });
  colSep(7.038);
  colSep(12.941);

  // Column data
  const cols = [
    { x: 1.667, num: "i.",   title: "Baked daily.",    body: "Out of the oven before the sidewalk fills. Whatever doesn't sell, doesn't reappear.",      bodyH: 1.267 },
    { x: 7.569, num: "ii.",  title: "Actually good.",  body: "European butter. Real vanilla. Slow-fermented dough. The boring details that change everything.", bodyH: 1.675 },
    { x: 13.472, num: "iii.",title: "Fairly priced.",  body: "A great croissant should be a treat, not a flex. Under five dollars. We promise.",         bodyH: 1.267 },
  ];
  for (const c of cols) {
    s.addText(c.num, {
      x: c.x, y: 3.651, w: 4.996, h: 0.213, margin: 0,
      fontFace: FONT, fontSize: sz(1050), color: C.brand, charSpacing: spc(263), align: "left"
    });
    s.addText(c.title, {
      x: c.x, y: 5.802, w: 4.996, h: 0.708, margin: 0,
      fontFace: FONT, fontSize: sz(4800), italic: true, color: C.brown, charSpacing: spc(-96), align: "left"
    });
    s.addText(c.body, {
      x: c.x, y: 6.76, w: 3.862, h: c.bodyH, margin: 0,
      fontFace: FONT, fontSize: sz(2100), color: C.brownMid, align: "left", valign: "top"
    });
  }

  // Footer
  s.addText("02 · Promise", {
    x: 0.833, y: 10.525, w: 1.597, h: 0.266, margin: 0,
    fontFace: FONT, fontSize: sz(1350), color: C.brown, charSpacing: spc(270), align: "left"
  });
  s.addText("02 / 08", {
    x: 18.331, y: 10.525, w: 0.919, h: 0.266, margin: 0,
    fontFace: FONT, fontSize: sz(1350), color: C.brown, charSpacing: spc(270), align: "left"
  });
}

// ============================================================
//  SLIDE 3 — The Menu
// ============================================================
function slide3() {
  const s = pres.addSlide();
  s.background = { color: C.cream3 };

  // Eyebrow
  s.addText("CH. 02 — THE MENU", {
    x: 1.146, y: 1.042, w: 7.601, h: 0.245, margin: 0,
    fontFace: FONT, fontSize: sz(1200), color: C.brand, charSpacing: spc(216), align: "left"
  });
  // Headline
  s.addText([
    { text: "A short list, ", options: { color: C.brown, fontFace: FONT, fontSize: sz(9000), charSpacing: spc(-315) } },
    { text: "kept short.",   options: { italic: true, color: C.sage, fontFace: FONT, fontSize: sz(9000), charSpacing: spc(-315) } },
  ], { x: 1.146, y: 1.537, w: 7.601, h: 2.312, margin: 0, align: "left" });

  // Body paragraph
  s.addText("Twelve items. The classics, made well, on rotation. Two specials a week — whatever the season is up to.", {
    x: 1.146, y: 8.745, w: 5.15, h: 1.401, margin: 0,
    fontFace: FONT, fontSize: sz(2250), italic: true, color: C.brownMid, align: "left", valign: "top"
  });

  // Menu card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 9.463, y: 1.042, w: 9.392, h: 9.375,
    fill: { color: C.ochreCard }, line: { color: C.brown, width: 0.75 }
  });
  // Card header rule
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.056, y: 1.932, w: 8.204, h: 0.01,
    fill: { color: C.brown, transparency: 75 }, line: { color: C.brown, transparency: 75 }
  });
  // Card header labels
  s.addText("The Daily List", {
    x: 10.056, y: 1.51, w: 1.538, h: 0.213, margin: 0,
    fontFace: FONT, fontSize: sz(1050), color: C.brownMid, charSpacing: spc(294), align: "left"
  });
  s.addText("From the oven, 7am", {
    x: 16.222, y: 1.51, w: 2.122, h: 0.213, margin: 0,
    fontFace: FONT, fontSize: sz(1050), color: C.brownMid, charSpacing: spc(294), align: "left"
  });

  // Menu items
  const items = [
    { yDiv: 3.263, yName: 2.255, ySub: 2.776, yPrice: 2.418, name: [
        { t: "Croissant", italic: true,  color: C.caramel },
        { t: ", plain",   italic: false, color: C.brown },
      ], sub: "72-hour fermentation, French butter", price: "$4.50" },
    { yDiv: 4.448, yName: 3.44,  ySub: 3.961, yPrice: 3.603, name: [
        { t: "Pain au ",  italic: false, color: C.brown },
        { t: "chocolat",  italic: true,  color: C.caramel },
      ], sub: "Two batons of dark Valrhona", price: "$4.75" },
    { yDiv: 5.634, yName: 4.626, ySub: 5.146, yPrice: 4.789, name: [
        { t: "Kouign-amann", italic: true, color: C.caramel },
      ], sub: "Caramelized, salted, stubborn", price: "$4.50" },
    { yDiv: 6.78,  yName: 5.811, ySub: 6.292, yPrice: 5.949, name: [
        { t: "Morning bun", italic: false, color: C.brown },
      ], sub: "Cardamom, orange, raw sugar", price: "$4.25" },
    { yDiv: 7.965, yName: 6.957, ySub: 7.477, yPrice: 7.12,  name: [
        { t: "Seasonal ", italic: false, color: C.brown },
        { t: "galette",   italic: true,  color: C.caramel },
      ], sub: "Whatever the farmer's market said yes to", price: "$4.75" },
    { yDiv: null, yName: 8.142, ySub: 8.663, yPrice: 8.305,  name: [
        { t: "Sourdough ", italic: false, color: C.brown },
        { t: "miche",      italic: true,  color: C.caramel },
      ], sub: "Half loaf, sliced on request", price: "$6.00" },
  ];

  for (const it of items) {
    if (it.yDiv !== null) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 10.056, y: it.yDiv, w: 8.204, h: 0.01,
        fill: { color: C.brown, transparency: 78 }, line: { color: C.brown, transparency: 78 }
      });
    }
    s.addText(it.name.map(n => ({
      text: n.t,
      options: { italic: n.italic, color: n.color, fontFace: FONT, fontSize: sz(2700), charSpacing: spc(-27) }
    })), {
      x: 10.056, y: it.yName, w: 7.479, h: 0.521, margin: 0, align: "left"
    });
    s.addText(it.sub, {
      x: 10.056, y: it.ySub, w: 7.479, h: 0.362, margin: 0,
      fontFace: FONT, fontSize: sz(1650), italic: true, color: C.brownMid, align: "left"
    });
    s.addText(it.price, {
      x: 17.63, y: it.yPrice, w: 0.714, h: 0.31, margin: 0,
      fontFace: FONT, fontSize: sz(1650), color: C.brown, charSpacing: spc(83), align: "left"
    });
  }

  // "NOTHING OVER $6" stamp (rotated ~ -2°; XML rot = -359998 ≈ slight tilt)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 15.815, y: 9.382, w: 2.448, h: 0.458,
    fill: { type: "none" }, line: { color: C.brand, width: 1.5 },
    rotate: 358
  });
  s.addText("NOTHING OVER $6", {
    x: 16.044, y: 9.528, w: 2.073, h: 0.208, margin: 0,
    fontFace: FONT, fontSize: sz(1050), color: C.brand, charSpacing: spc(315), align: "left",
    rotate: 358
  });
}

// ============================================================
//  SLIDE 4 — The Room (left text + right interior illustration)
// ============================================================
function slide4() {
  const s = pres.addSlide();
  s.background = { color: C.brown };

  // Eyebrow
  s.addText("CH. 03 — THE ROOM", {
    x: 0.938, y: 1.146, w: 8.369, h: 0.245, margin: 0,
    fontFace: FONT, fontSize: sz(1200), color: C.caramel4, charSpacing: spc(216), align: "left"
  });
  // Headline
  s.addText("Warm wood, cold marble.", {
    x: 0.938, y: 1.662, w: 8.369, h: 2.854, margin: 0,
    fontFace: FONT, fontSize: sz(11250), italic: true, color: C.cream2, charSpacing: spc(-337), align: "left"
  });
  // Body
  s.addText("Twelve seats. Tin ceiling. A single brass pendant over the counter. The kind of small room you remember the smell of.", {
    x: 0.938, y: 4.995, w: 4.935, h: 1.85, margin: 0,
    fontFace: FONT, fontSize: sz(2100), color: C.cream2, align: "left", valign: "top"
  });

  // Color palette swatches (5 squares with outer thin frame)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.938, y: 8.064, w: 8.125, h: 2.04,
    fill: { type: "none" }, line: { color: C.cream2, width: 0.75 }
  });
  const swatches = [
    { x: 0.948, fill: C.brownDk,    label: "COCOA",   color: C.cream2 },
    { x: 2.569, fill: C.rust,       label: "TOMATO",  color: C.cream2 },
    { x: 4.19,  fill: C.butterPat,  label: "BUTTER",  color: C.brownDk },
    { x: 5.81,  fill: C.sage2,      label: "SAGE",    color: C.cream2 },
    { x: 7.431, fill: C.marble,     label: "MARBLE",  color: C.brownDk },
  ];
  for (const sw of swatches) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: sw.x, y: 8.074, w: 1.621, h: 2.02,
      fill: { color: sw.fill }, line: { color: sw.fill }
    });
    s.addText(sw.label, {
      x: sw.x + 0.146, y: 8.22, w: 1.413, h: 1.77, margin: 0,
      fontFace: FONT, fontSize: sz(825), color: sw.color, charSpacing: spc(149),
      align: "left", valign: "bottom"
    });
  }

  // Right-side illustration: room interior
  // Right wall block (full)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10, y: 0, w: 10, h: 11.25,
    fill: { color: C.brownDk }, line: { color: C.brownDk }
  });
  // Upper wall (sand)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10, y: 0, w: 10, h: 7.875,
    fill: { color: C.paleSand }, line: { color: C.paleSand }
  });
  // Floor band
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10, y: 7.875, w: 10, h: 3.375,
    fill: { color: C.brownDk2 }, line: { color: C.brownDk2 }
  });
  // Counter (dark wood)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.6, y: 5.583, w: 8.8, h: 2.517,
    fill: { color: "3A2410" }, line: { color: "3A2410" }
  });
  // Counter top-edge highlight
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.6, y: 5.583, w: 8.8, h: 0.042,
    fill: { color: C.ceilingTrim }, line: { color: C.ceilingTrim }
  });
  // Pastries on the counter (rounded rectangles)
  const pastries = [
    { x: 11.302, w: 0.938, h: 0.521, fill: C.caramel2 },
    { x: 12.969, w: 0.729, h: 0.521, fill: C.caramel3 },
    { x: 14.427, w: 1.146, h: 0.417, fill: C.caramel2 },
    { x: 16.302, w: 0.729, h: 0.521, fill: C.caramel3 },
    { x: 17.76,  w: 0.938, h: 0.521, fill: C.caramel2 },
  ];
  for (const p of pastries) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: p.x, y: 7.042, w: p.w, h: p.h,
      fill: { color: p.fill }, line: { color: p.fill }, rectRadius: 0.08
    });
  }

  // 3 pendant lights — cord (thin dark rect) + glowing bulb
  const pendantsX = [12.083, 14.583, 17.083];
  const cordX     = [12.5,   15.0,   17.5];
  for (let i = 0; i < 3; i++) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: cordX[i], y: 0, w: 0.042, h: 2.292,
      fill: { color: C.pendShadow, transparency: 40 },
      line: { color: C.pendShadow, transparency: 40 }
    });
    s.addShape(pres.shapes.OVAL, {
      x: pendantsX[i], y: 1.854, w: 0.875, h: 0.875,
      fill: { color: C.pendBulb }, line: { color: C.pendBulb }
    });
  }
}

// ============================================================
//  SLIDE 5 — The Window (storefront illustration)
// ============================================================
function slide5() {
  const s = pres.addSlide();
  // Full-bleed background
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 20, h: 11.25,
    fill: { color: C.butterDk }, line: { color: C.butterDk }
  });

  // Eyebrow
  s.addText("CH. 04 — THE WINDOW", {
    x: 1.146, y: 1.146, w: 7.332, h: 0.245, margin: 0,
    fontFace: FONT, fontSize: sz(1200), color: C.brand, charSpacing: spc(216), align: "left"
  });
  // Headline
  s.addText("A corner shop, on a quiet block.", {
    x: 1.146, y: 1.578, w: 7.332, h: 2.104, margin: 0,
    fontFace: FONT, fontSize: sz(8250), italic: true, color: C.brown, charSpacing: spc(-247), align: "left"
  });
  // Body
  s.addText("Painted brick. Cream awning with red stripes. A wooden bench out front for waiting, or for the dog.", {
    x: 1.146, y: 8.085, w: 4.077, h: 1.733, margin: 0,
    fontFace: FONT, fontSize: sz(2100), italic: true, color: C.brown, align: "left", valign: "top"
  });
  // Footer eyebrow
  s.addText("— REFERENCE MOOD —", {
    x: 1.146, y: 9.943, w: 4.077, h: 0.202, margin: 0,
    fontFace: FONT, fontSize: sz(975), color: C.brownMid, charSpacing: spc(244), align: "left"
  });

  // Storefront — base brick block
  s.addShape(pres.shapes.RECTANGLE, {
    x: 9.861, y: 4.375, w: 9.167, h: 6.875,
    fill: { color: C.rust }, line: { color: C.rust }
  });
  // Awning frame (dark band)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 9.861, y: 4.375, w: 9.167, h: 0.729,
    fill: { color: C.brown }, line: { color: C.brown }
  });
  // Awning sign text
  s.addText("— Pastry, plainly. —", {
    x: 9.724, y: 4.5, w: 9.442, h: 0.573, margin: 0,
    fontFace: FONT, fontSize: sz(3000), italic: true, color: "F7E9BF", charSpacing: spc(120), align: "center"
  });
  // Awning underline (red stripe)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 9.653, y: 5.0, w: 9.583, h: 0.729,
    fill: { color: C.rust }, line: { color: C.rust }
  });

  // Window pane (cream with dark frame)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.486, y: 5.729, w: 7.917, h: 4.688,
    fill: { color: C.cream4 }, line: { color: C.brown, width: 4.5 }
  });
  // Vertical mullions
  s.addShape(pres.shapes.RECTANGLE, {
    x: 13.083, y: 5.792, w: 0.062, h: 4.562,
    fill: { color: C.brown }, line: { color: C.brown }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 15.681, y: 5.792, w: 0.062, h: 4.562,
    fill: { color: C.brown }, line: { color: C.brown }
  });
  // Window sill bars (one per pane bottom)
  const sillX = [10.632, 13.229, 15.826];
  const sillW = [2.368, 2.368, 2.431];
  for (let i = 0; i < 3; i++) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: sillX[i], y: 9.979, w: sillW[i], h: 0.062,
      fill: { color: C.brown }, line: { color: C.brown }
    });
  }
  // Pastries in window
  const winPastries = [
    { x: 10.653, y: 9.646, w: 0.521, h: 0.333 },
    { x: 11.278, y: 9.688, w: 0.625, h: 0.292 },
    { x: 12.215, y: 9.667, w: 0.573, h: 0.312 },
    { x: 13.458, y: 9.667, w: 0.729, h: 0.312 },
    { x: 14.5,   y: 9.625, w: 0.833, h: 0.354 },
    { x: 15.889, y: 9.646, w: 0.573, h: 0.333 },
    { x: 16.681, y: 9.667, w: 0.573, h: 0.312 },
    { x: 17.514, y: 9.688, w: 0.521, h: 0.292 },
  ];
  for (const p of winPastries) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: p.x, y: p.y, w: p.w, h: p.h,
      fill: { color: C.caramel2 }, line: { color: C.caramel2 }, rectRadius: 0.08
    });
  }

  // Bench in front of window
  s.addShape(pres.shapes.RECTANGLE, {
    x: 13.507, y: 10.521, w: 1.875, h: 0.729,
    fill: { color: C.brown }, line: { color: C.brown }
  });

  // Tree (rounded canopy + trunk)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 18.194, y: 5.625, w: 2.083, h: 2.917,
    fill: { color: C.sageLite }, line: { color: C.sageLite }, rectRadius: 0.5
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 19.132, y: 5.625, w: 0.208, h: 5.625,
    fill: { color: C.benchBrown }, line: { color: C.benchBrown }
  });

  // Small green topiary on left of storefront
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 8.611, y: 10.812, w: 2.083, h: 0.521,
    fill: { color: C.sage }, line: { color: C.sage }, rectRadius: 0.2
  });

  // Sidewalk strip
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.736, y: 11.042, w: 15.417, h: 0.208,
    fill: { color: C.windowSill }, line: { color: C.windowSill }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.736, y: 11.042, w: 15.417, h: 0.021,
    fill: { color: C.windowSill2 }, line: { color: C.windowSill2 }
  });
}

// ============================================================
//  SLIDE 6 — The Hands (timeline, 5 columns)
// ============================================================
function slide6() {
  const s = pres.addSlide();
  s.background = { color: C.butter };

  // Top horizontal rule
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.146, y: 3.067, w: 17.708, h: 0.01,
    fill: { color: C.brown, transparency: 75 }, line: { color: C.brown, transparency: 75 }
  });
  // Eyebrow
  s.addText("CH. 05 — THE HANDS", {
    x: 1.146, y: 1.061, w: 9.12, h: 0.245, margin: 0,
    fontFace: FONT, fontSize: sz(1200), color: C.brand, charSpacing: spc(216), align: "left"
  });
  // Headline
  s.addText([
    { text: "A day, ",     options: { color: C.brown,   fontFace: FONT, fontSize: sz(9750), charSpacing: spc(-292) } },
    { text: "folded in.",  options: { italic: true, color: C.caramel, fontFace: FONT, fontSize: sz(9750), charSpacing: spc(-292) } },
  ], { x: 1.146, y: 1.494, w: 9.12, h: 1.281, margin: 0, align: "left" });
  // Right side body
  s.addText("Most of what we sell at seven in the morning began the morning before. Patience is the actual ingredient on the shelf.", {
    x: 13.919, y: 1.042, w: 4.935, h: 1.733, margin: 0,
    fontFace: FONT, fontSize: sz(2100), italic: true, color: C.brownMid, align: "right", valign: "top"
  });

  // Five column dividers
  for (const xv of [4.677, 8.219, 11.76, 15.302]) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: xv, y: 3.702, w: 0.01, h: 6.715,
      fill: { color: C.brown, transparency: 82 }, line: { color: C.brown, transparency: 82 }
    });
  }

  // 5 timeline columns
  const steps = [
    { x: 1.458, w: 2.993, time: "— 04:00 —", title: "Lights on.",
      body: "Ovens up to temperature. Yesterday's slow-fermented dough comes out of the cold." },
    { x: 5.0,   w: 2.993, time: "— 05:30 —", title: "Shape, score.",
      body: "Croissants rolled and folded. Galettes pleated by hand. Loaves slashed for steam." },
    { x: 8.542, w: 2.993, time: "— 06:45 —", title: "Into the oven.",
      body: "Steam in for the first eight minutes. The shop starts to smell like a bakery." },
    { x: 12.083,w: 2.993, time: "— 07:00 —", title: "Door open.",
      body: "First coffee poured for the first customer. It is almost always the same regular, the one who waits at the door." },
    { x: 15.625,w: 3.004, time: "— 14:00 —", title: "Sold out.",
      body: "If the case is empty, the case stays empty. Tomorrow's batch is already proofing in the walk-in." },
  ];
  for (const st of steps) {
    s.addText(st.time, {
      x: st.x, y: 4.015, w: st.w, h: 0.213, margin: 0,
      fontFace: FONT, fontSize: sz(1050), color: C.brand, charSpacing: spc(263), align: "left"
    });
    s.addText(st.title, {
      x: st.x, y: 5.519, w: st.w, h: 0.457, margin: 0,
      fontFace: FONT, fontSize: sz(2850), italic: true, color: C.brown, align: "left"
    });
    s.addText(st.body, {
      x: st.x, y: 6.081, w: st.w, h: 1.371, margin: 0,
      fontFace: FONT, fontSize: sz(1650), color: C.brownMid, align: "left", valign: "top"
    });
  }
}

// ============================================================
//  SLIDE 7 — The Neighborhood (dark sage left, map right)
// ============================================================
function slide7() {
  const s = pres.addSlide();
  s.background = { color: C.sage };

  // Eyebrow
  s.addText("CH. 06 — THE NEIGHBORHOOD", {
    x: 0.938, y: 1.146, w: 9.305, h: 0.245, margin: 0,
    fontFace: FONT, fontSize: sz(1200), color: C.goldGlow, charSpacing: spc(216), align: "left"
  });
  // Headline
  s.addText([
    { text: "A walk-in shop, for ", options: { color: C.cream5,   fontFace: FONT, fontSize: sz(10350), charSpacing: spc(-310) } },
    { text: "a walking town.",      options: { italic: true, color: C.goldGlow, fontFace: FONT, fontSize: sz(10350), charSpacing: spc(-310) } },
  ], { x: 0.938, y: 1.662, w: 9.305, h: 5.143, margin: 0, align: "left" });
  // Body
  s.addText("Ann Arbor already has the feet on the street. Students, professors, dog-walkers, parents on a Saturday loop. We just need to be on their way.", {
    x: 0.938, y: 7.388, w: 5.365, h: 1.975, margin: 0,
    fontFace: FONT, fontSize: sz(2400), italic: true, color: C.cream5, align: "left", valign: "top"
  });

  // Faint divider above stats
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.938, y: 9.85, w: 9.034, h: 0.01,
    fill: { color: C.cream5, transparency: 75 }, line: { color: C.cream5, transparency: 75 }
  });

  // Big stats (3 columns)
  const stats = [
    { x: 0.938, big: "~200",  label: "WALK-INS / DAY TARGET" },
    { x: 3.949, big: "3 mi",  label: "FROM MAIN & CAMPUS" },
    { x: 6.96,  big: "7 — 14",label: "OPEN HOURS" },
  ];
  for (const st of stats) {
    s.addText(st.big, {
      x: st.x, y: 10.15, w: 3.102, h: 0.708, margin: 0,
      fontFace: FONT, fontSize: sz(4800), color: C.cream5, align: "left"
    });
    s.addText(st.label, {
      x: st.x, y: 10.92, w: 3.102, h: 0.25, margin: 0,
      fontFace: FONT, fontSize: sz(975), color: C.cream5, charSpacing: spc(215), align: "left"
    });
  }

  // Right side: map block (lighter sage panel)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.909, y: 0, w: 9.091, h: 11.25,
    fill: { color: C.sage2 }, line: { color: C.sage2 }
  });
  // Map card (cream)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 11.742, y: 2.482, w: 7.424, h: 7.424,
    fill: { color: C.cream5 }, line: { color: C.brown, width: 0.75 }
  });
  // Faint inner overlay (matches XML, very subtle)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 11.753, y: 2.492, w: 7.403, h: 7.403,
    fill: { color: C.brown, transparency: 92 }, line: { type: "none" }
  });
  // Two horizontal grid lines + two vertical grid lines (faint)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 11.753, y: 4.565, w: 7.403, h: 0.167,
    fill: { color: C.brown, transparency: 88 }, line: { type: "none" }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 11.753, y: 7.082, w: 7.403, h: 0.167,
    fill: { color: C.brown, transparency: 88 }, line: { type: "none" }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 14.714, y: 2.492, w: 0.167, h: 7.403,
    fill: { color: C.brown, transparency: 88 }, line: { type: "none" }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 17.527, y: 2.492, w: 0.167, h: 7.403,
    fill: { color: C.brown, transparency: 88 }, line: { type: "none" }
  });

  // Site A — red marker + label
  s.addShape(pres.shapes.OVAL, {
    x: 14.474, y: 4.326, w: 0.479, h: 0.479,
    fill: { color: C.brand }, line: { color: C.cream5, width: 3 }
  });
  s.addText("SITE A · KERRYTOWN", {
    x: 13.783, y: 4.857, w: 1.945, h: 0.202, margin: 0,
    fontFace: FONT, fontSize: sz(975), color: C.brownMid, charSpacing: spc(176), align: "left"
  });

  // Site B — dark marker + label
  s.addShape(pres.shapes.OVAL, {
    x: 17.288, y: 6.843, w: 0.479, h: 0.479,
    fill: { color: C.brown, transparency: 50 }, line: { color: C.cream5, width: 3 }
  });
  s.addText("SITE B · OLD WEST SIDE", {
    x: 16.455, y: 6.922, w: 2.228, h: 0.202, margin: 0,
    fontFace: FONT, fontSize: sz(975), color: C.brownMid, charSpacing: spc(176), align: "left"
  });
}

// ============================================================
//  SLIDE 8 — Sign-off (centered cover-style)
// ============================================================
function slide8() {
  const s = pres.addSlide();
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 20, h: 11.25,
    fill: { color: C.cream }, line: { color: C.cream }
  });

  // Top eyebrows (left + right)
  s.addText("— SIGN-OFF —", {
    x: 1.146, y: 0.833, w: 1.642, h: 0.213, margin: 0,
    fontFace: FONT, fontSize: sz(1050), color: C.brownMid, charSpacing: spc(294), align: "left"
  });
  s.addText("VOL. 01 / SPRING 2026", {
    x: 16.418, y: 0.833, w: 2.52, h: 0.213, margin: 0,
    fontFace: FONT, fontSize: sz(1050), color: C.brownMid, charSpacing: spc(294), align: "left"
  });

  // Centered eyebrow
  s.addText("— A WORKING NAME —", {
    x: 8.514, y: 1.544, w: 2.972, h: 0.245, margin: 0,
    fontFace: FONT, fontSize: sz(1200), color: C.brownMid, charSpacing: spc(384), align: "center"
  });

  // Massive headline "Flour & hour." — stacks across two lines like the original
  s.addText([
    { text: "Flour ",  options: { italic: true, color: C.brown, fontFace: FONT, fontSize: sz(21000), charSpacing: spc(-840) } },
    { text: "& ",      options: { italic: true, color: C.brand, fontFace: FONT, fontSize: sz(21000), charSpacing: spc(-840), breakLine: true } },
    { text: "hour.",   options: { italic: true, color: C.brown, fontFace: FONT, fontSize: sz(21000), charSpacing: spc(-840) } },
  ], { x: 5.0, y: 1.9, w: 10, h: 5.0, margin: 0, align: "center", valign: "top", paraSpaceBefore: 0, paraSpaceAfter: 0, lineSpacingMultiple: 0.95 });

  // Decorative dividing dot with two short lines
  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.458, y: 7.076, w: 1.25, h: 0.01,
    fill: { color: C.caramel, transparency: 30 }, line: { color: C.caramel, transparency: 30 }
  });
  s.addShape(pres.shapes.OVAL, {
    x: 9.958, y: 7.039, w: 0.083, h: 0.083,
    fill: { color: C.brand }, line: { color: C.brand }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.292, y: 7.076, w: 1.25, h: 0.01,
    fill: { color: C.caramel, transparency: 30 }, line: { color: C.caramel, transparency: 30 }
  });

  // Caption
  s.addText("A pastry shop. Ann Arbor.", {
    x: 7.772, y: 8.06, w: 4.456, h: 0.521, margin: 0,
    fontFace: FONT, fontSize: sz(2700), italic: true, color: C.caramel, charSpacing: spc(54), align: "center"
  });
  s.addText("Open at seven. Closed when it's gone. Probably a corner you already walk past.", {
    x: 7.095, y: 8.831, w: 5.81, h: 0.917, margin: 0,
    fontFace: FONT, fontSize: sz(2250), color: C.brownMid, align: "center", valign: "top"
  });

  // Bottom tagline row
  s.addText("BAKED DAILY", {
    x: 6.944, y: 10.245, w: 1.477, h: 0.213, margin: 0,
    fontFace: FONT, fontSize: sz(1050), color: C.brownMid, charSpacing: spc(294), align: "left"
  });
  s.addText("·", {
    x: 8.63, y: 10.248, w: 0.173, h: 0.208, margin: 0,
    fontFace: FONT, fontSize: sz(1050), color: C.brownMid, charSpacing: spc(294), align: "left"
  });
  s.addText("ACTUALLY GOOD", {
    x: 9.011, y: 10.245, w: 1.843, h: 0.213, margin: 0,
    fontFace: FONT, fontSize: sz(1050), color: C.brownMid, charSpacing: spc(294), align: "left"
  });
  s.addText("·", {
    x: 11.061, y: 10.248, w: 0.173, h: 0.208, margin: 0,
    fontFace: FONT, fontSize: sz(1050), color: C.brownMid, charSpacing: spc(294), align: "left"
  });
  s.addText("FAIRLY PRICED", {
    x: 11.443, y: 10.245, w: 1.697, h: 0.213, margin: 0,
    fontFace: FONT, fontSize: sz(1050), color: C.brownMid, charSpacing: spc(294), align: "left"
  });
}

// ---------- Build & save ----------
slide1();
slide2();
slide3();
slide4();
slide5();
slide6();
slide7();
slide8();

pres.writeFile({ fileName: "pastry_ann_arbor.pptx" })
  .then(name => console.log("Wrote: " + name))
  .catch(err => { console.error(err); process.exit(1); });
