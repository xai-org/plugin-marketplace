/**
 * retro_tech_shop.js
 *
 * Replica of retro_tech_shop.pptx using pptxgenjs.
 *
 * Usage:
 *   npm install pptxgenjs
 *   node retro_tech_shop.js
 *
 * Produces: retro_tech_shop.pptx in the current working directory.
 */

const pptxgen = require("pptxgenjs");

// ---------- EMBEDDED IMAGES (base64) ----------
// The original deck bundles 18 illustrated PNGs.  They are embedded here
// so this single file reproduces the deck without any external assets.
// The block is injected just below this line.
// ---------- EMBEDDED IMAGES (base64) ----------
const image_3_1 = "data:image/png;base64,PLACEHOLDER";
const image_3_2 = "data:image/png;base64,PLACEHOLDER";
const image_4_1 = "data:image/png;base64,PLACEHOLDER";
const image_4_2 = "data:image/png;base64,PLACEHOLDER";
const image_4_3 = "data:image/png;base64,PLACEHOLDER";
const image_6_1 = "data:image/png;base64,PLACEHOLDER";
const image_6_2 = "data:image/png;base64,PLACEHOLDER";
const image_6_3 = "data:image/png;base64,PLACEHOLDER";
const image_6_4 = "data:image/png;base64,PLACEHOLDER";
const image_6_5 = "data:image/png;base64,PLACEHOLDER";
const image_6_6 = "data:image/png;base64,PLACEHOLDER";
const image_6_7 = "data:image/png;base64,PLACEHOLDER";
const image_6_8 = "data:image/png;base64,PLACEHOLDER";
const image_8_1 = "data:image/png;base64,PLACEHOLDER";
const image_8_2 = "data:image/png;base64,PLACEHOLDER";
const image_8_3 = "data:image/png;base64,PLACEHOLDER";
const image_8_4 = "data:image/png;base64,PLACEHOLDER";
const image_8_5 = "data:image/png;base64,PLACEHOLDER";

// ---------- PALETTE ----------
const C = {
  bg:        "FAF8F3",  // page background (warm cream)
  ink:       "1A1A1A",  // body / titles
  inkSoft:   "4A4A47",  // secondary text
  mute:      "8A8A85",  // muted grey headings
  mute2:     "7A766A",  // secondary muted
  line:      "D8D4C7",  // hairline rules
  lineSoft:  "C9C2B0",  // softer rules
  tan:       "B8956A",  // signature tan accent
  tanDeep:   "8A6A44",  // italic accent brown
  tanBright: "D9A35B",  // DOS-terminal plate
  tanLight:  "D9B07A",  // light tan (opening-soon)
  plateCream:"EFE6D0",  // plate background
  plateCream2:"F0EAD9", // alt plate cream
  gridCream: "F4EDE0",  // grid plate
  sage:      "D9DCCB",  // sage (grey-era tint)
  red:       "C44536",  // accent red (book spines)
  maroon:    "6B3A2E",  // dark red spine
  navy:      "1F2A38",  // navy spine
  forest:    "2E3B2A",  // forest spine
  coal:      "2B2A27",  // near-black spine
  planDark:  "14130F",  // dark plan background
  planPanel: "33302A",  // plan panel fill
};

// ---------- HELPERS ----------
// Convert a plain hex like "8A8A85" plus alpha 0-100 to pptxgenjs transparency
// (pptxgenjs uses `transparency: 0-100` where 100 is fully transparent).
function trans(pct) { return { transparency: 100 - pct }; }

// Font families
const FONT_SANS  = "Arial";
const FONT_SERIF = "Georgia";

// Build a tracked-caps text option object.  The source deck uses large
// character-spacing on the small caption/eyebrow lines.
function caps(size, color, spacing) {
  return {
    fontFace: FONT_SANS, fontSize: size, color: color,
    charSpacing: spacing != null ? spacing : 4,
    bold: false, italic: false, valign: "top", margin: 0,
  };
}

// ---------- PRESENTATION ----------
const pres = new pptxgen();
pres.title  = "TERMINAL — Aesthetic Study";
pres.author = "Terminal Ann Arbor";

// Custom slide size: 20in × 11.25in (matches the source 18288000 × 10287000 EMU).
pres.defineLayout({ name: "TERMINAL_20x11", width: 20, height: 11.25 });
pres.layout = "TERMINAL_20x11";

// Shared slide background
function newSlide(bg) {
  const s = pres.addSlide();
  s.background = { color: bg || C.bg };
  return s;
}

// ============================================================
// SLIDE 1 — COVER: TERMiNAL
// ============================================================
{
  const s = newSlide();

  // Eyebrow (top-left): "ANN ARBOR, MICHIGAN · EST. 2026"
  s.addText("ANN ARBOR, MICHIGAN · EST. 2026", {
    x: 0.92, y: 0.75, w: 8, h: 0.34, ...caps(14, C.mute, 10), margin: 0,
  });

  // Eyebrow (top-right): "AESTHETIC STUDY / VOL. 01"
  s.addText("AESTHETIC STUDY / VOL. 01", {
    x: 14.01, y: 0.75, w: 5.22, h: 0.34,
    ...caps(14, C.mute, 10), align: "right", margin: 0,
  });

  // Big wordmark: TERMiNAL  — italic brown 'i'
  s.addText(
    [
      { text: "TERM", options: { color: C.ink } },
      { text: "i",    options: { color: C.tanDeep, italic: true } },
      { text: "NAL",  options: { color: C.ink } },
    ],
    {
      x: 0.92, y: 6.01, w: 18.71, h: 3.25,
      fontFace: FONT_SANS, fontSize: 270,
      bold: false, charSpacing: -12,
      align: "left", valign: "top", margin: 0,
    }
  );

  // Tagline (italic serif)
  s.addText("a computer café, opening soon on Liberty Street.", {
    x: 0.92, y: 9.70, w: 18.71, h: 0.55,
    fontFace: FONT_SERIF, fontSize: 26, italic: true, color: C.inkSoft,
    align: "left", valign: "top", margin: 0,
  });

  // Bottom-left footer: "COFFEE · PASTRY · MACHINES · BOOKS"
  s.addText("COFFEE · PASTRY · MACHINES · BOOKS", {
    x: 0.92, y: 10.20, w: 10, h: 0.34, ...caps(13, C.ink, 8), margin: 0,
  });

  // Bottom-right: "TEASER 01 / 10"
  s.addText("TEASER 01 / 10", {
    x: 14.48, y: 10.20, w: 4.71, h: 0.34,
    ...caps(13, C.mute, 10), align: "right", margin: 0,
  });
}


// ============================================================
// SLIDE 2 — THE IDEA, IN ONE SENTENCE
// ============================================================
{
  const s = newSlide();

  // Eyebrow
  s.addText("THE IDEA, IN ONE SENTENCE", {
    x: 1.88, y: 2.22, w: 16.74, h: 0.41,
    ...caps(13, C.ink, 9), margin: 0,
  });

  // Big pull quote with italic brown "Macintosh SE,"
  s.addText(
    [
      { text: "A quiet room in Ann Arbor where you can order a flat white, sit down with a ",
        options: { color: C.ink } },
      { text: "Macintosh SE,",
        options: { color: C.tanDeep, italic: true } },
      { text: " and lose an hour to BASIC.",
        options: { color: C.ink } },
    ],
    {
      x: 1.88, y: 3.15, w: 16.09, h: 4.88,
      fontFace: FONT_SANS, fontSize: 82, bold: false,
      align: "left", valign: "top", margin: 0,
      lineSpacingMultiple: 1.05, charSpacing: -4,
    }
  );

  // Attribution
  s.addText("— FOUNDER'S NOTE", {
    x: 1.88, y: 9.10, w: 16.74, h: 0.34,
    ...caps(13, C.mute, 10), margin: 0,
  });
}

// ============================================================
// SLIDE 3 — 03 ERA: BEIGE & GREY
// ============================================================
{
  const s = newSlide();

  // Top rule
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.75, y: 1.07, w: 18.5, h: 0.012,
    fill: { color: C.line }, line: { color: C.line, width: 0 },
  });
  // Bottom rule
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.75, y: 10.17, w: 18.5, h: 0.012,
    fill: { color: C.line }, line: { color: C.line, width: 0 },
  });
  // Center vertical divider
  s.addShape(pres.shapes.RECTANGLE, {
    x: 9.995, y: 1.08, w: 0.012, h: 9.09,
    fill: { color: C.line }, line: { color: C.line, width: 0 },
  });

  // Eyebrow (top-left) & (top-right)
  s.addText("03 — ERA", { x: 0.75, y: 0.58, w: 4, h: 0.34,
    ...caps(13, C.mute, 9), margin: 0 });
  s.addText("BEIGE & GREY, 1981–1999", {
    x: 14.0, y: 0.58, w: 5.38, h: 0.34,
    ...caps(13, C.mute, 9), align: "right", margin: 0,
  });

  // Footer
  s.addText("TERMINAL / AESTHETIC STUDY", { x: 0.75, y: 10.37, w: 7, h: 0.34,
    ...caps(13, C.mute, 9), margin: 0 });
  s.addText("03", {
    x: 18.6, y: 10.37, w: 0.8, h: 0.34, ...caps(13, C.mute, 9),
    align: "right", margin: 0,
  });

  // ---- LEFT COLUMN ----
  s.addText("1981 — 1990", { x: 1.42, y: 1.91, w: 8.15, h: 0.36,
    ...caps(14, C.mute, 12), margin: 0 });

  s.addText(
    [
      { text: "Beige ",   options: { color: C.ink } },
      { text: "box,",     options: { color: C.tanDeep, italic: true } },
      { text: " warm plastic.", options: { color: C.ink } },
    ],
    {
      x: 1.42, y: 2.57, w: 8.15, h: 1.94,
      fontFace: FONT_SANS, fontSize: 54, bold: false,
      charSpacing: -3, align: "left", valign: "top", margin: 0,
      lineSpacingMultiple: 1.05,
    }
  );

  s.addText(
    "The IBM PC, the original Macintosh, the Model M keyboard. The sound of a floppy seeking. Soft cream cases that yellowed in the sun.",
    {
      x: 1.42, y: 4.80, w: 6.65, h: 1.44,
      fontFace: FONT_SERIF, fontSize: 18, italic: true, color: C.inkSoft,
      align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.3,
    }
  );

  // Beige computer illustration (with cream plate behind)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.42, y: 6.61, w: 7.91, h: 2.73,
    fill: { color: C.plateCream2 }, line: { type: "none" },
  });
  s.addImage({ data: image_3_1, x: 1.42, y: 6.61, w: 7.91, h: 2.73 });

  // ---- RIGHT COLUMN ----
  s.addText("1990 — 1999", { x: 10.67, y: 1.91, w: 8.15, h: 0.36,
    ...caps(14, C.mute, 12), margin: 0 });

  s.addText(
    [
      { text: "Grey ",    options: { color: C.ink } },
      { text: "plastic,", options: { color: C.tanDeep, italic: true } },
      { text: " CRT glow.", options: { color: C.ink } },
    ],
    {
      x: 10.67, y: 2.57, w: 8.15, h: 1.94,
      fontFace: FONT_SANS, fontSize: 54, bold: false,
      charSpacing: -3, align: "left", valign: "top", margin: 0,
      lineSpacingMultiple: 1.05,
    }
  );

  s.addText(
    "Compaq towers, 17-inch Trinitrons, the Windows 95 startup chime. Cool dove grey, dark under the desk, green text at night.",
    {
      x: 10.67, y: 4.80, w: 6.65, h: 1.44,
      fontFace: FONT_SERIF, fontSize: 18, italic: true, color: C.inkSoft,
      align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.3,
    }
  );

  // Grey computer illustration (with sage plate behind)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.67, y: 6.61, w: 7.91, h: 2.73,
    fill: { color: C.sage }, line: { type: "none" },
  });
  s.addImage({ data: image_3_2, x: 10.67, y: 6.61, w: 7.91, h: 2.73 });
}

// ============================================================
// SLIDE 4 — THE MOOD (SIX PLATES)
// ============================================================
{
  const s = newSlide();

  // Top rule
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.92, y: 2.02, w: 18.17, h: 0.012,
    fill: { color: C.line }, line: { color: C.line, width: 0 },
  });

  // Title: The mood.
  s.addText(
    [
      { text: "The ", options: { color: C.ink } },
      { text: "mood.", options: { color: C.tanDeep, italic: true } },
    ],
    {
      x: 0.92, y: 0.75, w: 6.5, h: 0.94,
      fontFace: FONT_SANS, fontSize: 54, bold: true,
      charSpacing: -3, align: "left", valign: "top", margin: 0,
    }
  );

  // Top-right caption
  s.addText("FIG. 04 — SIX PLATES", {
    x: 13.0, y: 1.35, w: 6.08, h: 0.34,
    ...caps(13, C.mute, 9), align: "right", margin: 0,
  });

  // ---- PLATE: TAN/DOS (left, tall) ----
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.92, y: 2.41, w: 5.93, h: 8.09,
    fill: { color: C.tanBright, transparency: 72 }, // 28% alpha
    line: { type: "none" },
  });
  // DOS lines
  [
    ["C:\\> LOGIN TERMINAL", 2.80],
    ["USER: GUEST",          3.23],
    ["WELCOME.",             3.67],
  ].forEach(([txt, yy]) => {
    s.addText(txt, {
      x: 1.34, y: yy, w: 5.23, h: 0.48,
      fontFace: "Consolas", fontSize: 20, color: "2A1F12",
      bold: false, charSpacing: 4, align: "left", valign: "top", margin: 0,
    });
  });

  // ---- PLATE A (keyboard, top-middle) ----
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.03, y: 2.41, w: 5.93, h: 3.95,
    fill: { color: C.plateCream }, line: { type: "none" },
  });
  s.addImage({ data: image_4_1, x: 7.03, y: 2.41, w: 5.93, h: 3.95 });
  s.addText("PLATE A", { x: 7.25, y: 2.61, w: 3, h: 0.34,
    ...caps(12, C.inkSoft, 8), margin: 0 });

  // ---- PLATE B (coffee, top-right, dark) ----
  s.addShape(pres.shapes.RECTANGLE, {
    x: 13.15, y: 2.41, w: 5.93, h: 3.95,
    fill: { color: C.ink }, line: { type: "none" },
  });
  s.addImage({ data: image_4_2, x: 13.15, y: 2.41, w: 5.93, h: 3.95 });
  s.addText("PLATE B", { x: 13.37, y: 2.61, w: 3, h: 0.34,
    ...caps(12, C.plateCream, 8), margin: 0 });

  // ---- TAN color chip (bottom, mid-left) ----
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.03, y: 6.55, w: 2.87, h: 3.95,
    fill: { color: C.tan }, line: { type: "none" },
  });
  s.addText("TAN", { x: 7.25, y: 6.75, w: 2.5, h: 0.34,
    ...caps(12, C.ink, 8), margin: 0 });
  s.addText("#B8956A", { x: 7.25, y: 10.00, w: 2.5, h: 0.34,
    ...caps(12, C.ink, 6), align: "right", margin: 0 });

  // ---- GRID plate ----
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.09, y: 6.55, w: 2.87, h: 3.95,
    fill: { color: C.gridCream }, line: { type: "none" },
  });
  // draw a pixel-grid (24px → about 16×22 cells on a 2.87×3.95 plate)
  {
    const cols = 16, rows = 22;
    const x0 = 10.09, y0 = 6.55, w = 2.87, h = 3.95;
    for (let i = 1; i < cols; i++) {
      s.addShape(pres.shapes.LINE, {
        x: x0 + (w * i / cols), y: y0, w: 0, h: h,
        line: { color: "EFE6D0", width: 0.5 },
      });
    }
    for (let j = 1; j < rows; j++) {
      s.addShape(pres.shapes.LINE, {
        x: x0, y: y0 + (h * j / rows), w: w, h: 0,
        line: { color: "EFE6D0", width: 0.5 },
      });
    }
  }
  s.addText("GRID", { x: 10.31, y: 6.75, w: 2.5, h: 0.34,
    ...caps(12, C.ink, 8), margin: 0 });
  s.addText("24px pixel", { x: 10.31, y: 10.00, w: 2.5, h: 0.34,
    ...caps(12, C.inkSoft, 4), align: "right", italic: true, margin: 0 });

  // ---- PLATE C (stacked-book spines, bottom-right) ----
  s.addShape(pres.shapes.RECTANGLE, {
    x: 13.15, y: 6.55, w: 5.93, h: 3.95,
    fill: { color: C.plateCream }, line: { type: "none" },
  });
  s.addImage({ data: image_4_3, x: 13.15, y: 6.55, w: 5.93, h: 3.95 });
  s.addText("PLATE C", { x: 13.37, y: 6.75, w: 3, h: 0.34,
    ...caps(12, C.inkSoft, 8), margin: 0 });
}

// ============================================================
// SLIDE 5 — MENU (Coffee Bar + Pastry Case)
// ============================================================
{
  const s = newSlide();

  // Page title "Menu." top-left — soft watermark-style (very pale)
  s.addText(
    [
      { text: "Menu", options: { color: C.lineSoft } },
      { text: ".",    options: { color: C.lineSoft, italic: true } },
    ],
    {
      x: 0.4, y: 0.6, w: 8, h: 1.4,
      fontFace: FONT_SANS, fontSize: 60, bold: true, charSpacing: -2,
      align: "left", valign: "top", margin: 0,
    }
  );

  // ---- Two 2-column menus ----
  function menuSection(left, headerLeft, headerRight, items) {
    // Section headers
    s.addText(headerLeft, {
      x: left, y: 2.24, w: 5, h: 0.46, ...caps(16, C.ink, 10), bold: true, margin: 0,
    });
    s.addText(headerRight, {
      x: left + 6.5, y: 2.24, w: 2, h: 0.46,
      fontFace: FONT_SERIF, fontSize: 16, italic: true, color: C.tanDeep,
      align: "right", valign: "top", margin: 0,
    });
    // Header rule
    s.addShape(pres.shapes.RECTANGLE, {
      x: left, y: 2.84, w: 8.48, h: 0.012,
      fill: { color: C.inkSoft }, line: { type: "none" },
    });

    // Rows
    items.forEach((row, i) => {
      const y = 3.43 + i * 1.26;
      // Item name
      s.addText(row.name, {
        x: left, y: y, w: 6.5, h: 0.54,
        fontFace: FONT_SANS, fontSize: 26, color: C.ink, bold: false,
        align: "left", valign: "top", margin: 0,
      });
      // Description
      s.addText(row.desc, {
        x: left, y: y + 0.57, w: 7.57, h: 0.32,
        fontFace: FONT_SANS, fontSize: 13, color: C.mute, bold: false,
        charSpacing: 2, align: "left", valign: "top", margin: 0,
      });
      // Price (right)
      s.addText(row.price, {
        x: left + 7.60, y: y + 0.15, w: 0.97, h: 0.36,
        fontFace: FONT_SANS, fontSize: 18, color: C.ink, bold: false,
        align: "right", valign: "top", margin: 0, charSpacing: 2,
      });
      // Underline between rows (not after last)
      if (i < items.length - 1) {
        s.addShape(pres.shapes.RECTANGLE, {
          x: left, y: y + 1.06, w: 8.48, h: 0.012,
          fill: { color: C.line }, line: { type: "none" },
        });
      }
    });
  }

  menuSection(1.00, "COFFEE BAR", "a.m. — p.m.", [
    { name: "Drip, daily roast",    desc: "Single-origin, rotating. Served in ceramic.", price: "$ 3.50" },
    { name: "Flat white",           desc: "Two shots, whole milk, dense micro-foam.",    price: "$ 5.00" },
    { name: "Cortado",              desc: "Equal parts espresso & steamed milk.",        price: "$ 4.50" },
    { name: "Pour-over, by origin", desc: "Ethiopia, Guatemala, Sumatra.",                price: "$ 6.00" },
    { name: "Loose-leaf tea",       desc: "For the long sessions.",                      price: "$ 4.00" },
  ]);

  menuSection(10.52, "PASTRY CASE", "baked near.", [
    { name: "Butter croissant",      desc: "Flaky, plain, the way it should be.", price: "$ 4.25" },
    { name: "Morning bun",           desc: "Cardamom sugar, orange zest.",        price: "$ 5.00" },
    { name: "Almond financier",      desc: "Brown butter, small format.",         price: "$ 3.75" },
    { name: "Sourdough toast",       desc: "Cultured butter, flaky salt.",        price: "$ 4.50" },
    { name: "Chocolate chip cookie", desc: "Weighed in grams. Served warm.",      price: "$ 3.50" },
  ]);
}

// ============================================================
// SLIDE 6 — THE MACHINES (8-up grid)
// ============================================================
{
  const s = newSlide();

  // Rule
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.92, y: 2.02, w: 18.17, h: 0.012,
    fill: { color: C.line }, line: { type: "none" },
  });

  // Title: The machines.
  s.addText(
    [
      { text: "The ", options: { color: C.ink } },
      { text: "machines.", options: { color: C.tanDeep, italic: true } },
    ],
    {
      x: 0.92, y: 0.75, w: 10, h: 0.94,
      fontFace: FONT_SANS, fontSize: 54, bold: true,
      charSpacing: -3, align: "left", valign: "top", margin: 0,
    }
  );

  s.addText("A ROTATING COLLECTION. EIGHT BAYS.\nFIRST-COME, FIRST-SERVED.", {
    x: 10.0, y: 1.05, w: 9.08, h: 0.64,
    ...caps(13, C.mute, 9), align: "right", margin: 0, lineSpacingMultiple: 1.2,
  });

  // Grid of 8 machines: 4 cols × 2 rows, tile w≈4.29, h≈2.92
  // Each tile has a colored plate behind the transparent illustration.
  const machines = [
    { img: image_6_1, plate: C.plateCream,  name: "Macintosh SE",    tag: "1987 · HYPERCARD" },
    { img: image_6_2, plate: C.plateCream,  name: "IBM PC",          tag: "1981 · MS-DOS 3.3" },
    { img: image_6_3, plate: C.ink,         name: "NeXTcube",        tag: "1990 · NEXTSTEP"   },
    { img: image_6_4, plate: C.plateCream,  name: "Sun SPARCstation",tag: "1994 · SUNOS"      },
    { img: image_6_5, plate: C.sage,        name: "Dell OptiPlex",   tag: "1998 · WIN 95"     },
    { img: image_6_6, plate: C.ink,         name: "ThinkPad 701c",   tag: "1995 · BUTTERFLY"  },
    { img: image_6_7, plate: C.plateCream,  name: "Keyboard bar",    tag: "TRY BEFORE YOU BUY"},
    { img: image_6_8, plate: C.sage,        name: "Tinker station",  tag: "BRING YOUR OWN"    },
  ];
  const cellW = 4.29, cellH = 2.92, gap = 0.34;
  machines.forEach((m, i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = 0.92 + col * (cellW + gap);
    const y = 2.49 + row * (cellH + 1.25); // 2.49 + (row==0 ? 0 : 4.17)
    // colored plate behind the illustration
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cellW, h: cellH,
      fill: { color: m.plate }, line: { type: "none" },
    });
    s.addImage({ data: m.img, x, y, w: cellW, h: cellH });
    s.addText(m.name, {
      x, y: y + cellH + 0.19, w: cellW + 0.13, h: 0.39,
      fontFace: FONT_SANS, fontSize: 22, color: C.ink, bold: false,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(m.tag, {
      x, y: y + cellH + 0.62, w: cellW + 0.13, h: 0.34,
      ...caps(12, C.mute, 9), margin: 0,
    });
  });
}

// ============================================================
// SLIDE 7 — LIBRARY (two rows of book spines)
// ============================================================
{
  const s = newSlide();

  // ---- Left column text ----
  s.addText("07 — LIBRARY", {
    x: 0.92, y: 3.67, w: 5.58, h: 0.30,
    ...caps(13, C.mute, 10), margin: 0,
  });

  s.addText(
    [
      { text: "A small ",  options: { color: C.ink, breakLine: true } },
      { text: "library ",  options: { color: C.tanDeep, italic: true } },
      { text: "of\nprogramming books.", options: { color: C.ink } },
    ],
    {
      x: 0.92, y: 4.35, w: 5.58, h: 4.55,
      fontFace: FONT_SANS, fontSize: 56, bold: true,
      charSpacing: -3, align: "left", valign: "top", margin: 0,
      lineSpacingMultiple: 1.02,
    }
  );

  s.addText(
    "K&R, SICP, the Dragon Book, Knuth in four volumes, a full shelf of early O'Reilly animals. Free to read. Please don't leave with them.",
    {
      x: 0.92, y: 9.19, w: 5.58, h: 1.27,
      fontFace: FONT_SERIF, fontSize: 14, italic: true, color: C.inkSoft,
      align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.4,
    }
  );

  // ---- Shelves (hairlines) ----
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.17, y: 5.52, w: 11.92, h: 0.03,
    fill: { color: C.ink }, line: { type: "none" },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.17, y: 10.39, w: 11.92, h: 0.03,
    fill: { color: C.ink }, line: { type: "none" },
  });

  // ---- Book spine helper ----
  // spineX/Y/W/H are the outer spine; title sits inside.
  // All books are rendered upside-down in the source (rot=180).  Rather than
  // rotating text (which is fragile), we draw spines right-side-up which
  // reads more naturally in a presentation — same layout, same colors.
  function book(x, y, w, h, spineColor, textColor, title, fontSize) {
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h,
      fill: { color: spineColor }, line: { type: "none" },
    });
    // Inner title area - centered vertically, rotated -90 so it reads top→bottom
    s.addText(title, {
      x: x + w * 0.05, y: y + h * 0.05, w: w * 0.9, h: h * 0.9,
      fontFace: FONT_SANS, fontSize: fontSize || 7,
      color: textColor, bold: false, charSpacing: 6,
      align: "center", valign: "middle", margin: 0,
      rotate: 270,
    });
  }

  // Row 1 — 16 books (y ~= 3.48)
  // Each entry: [x, w, h, spineColor, textColor, title]
  const row1 = [
    [ 7.17, 0.479, 1.938, C.coal,       C.plateCream, "K & R"        ],
    [ 7.71, 0.375, 1.833, C.tanDeep,    C.plateCream, "C"            ],
    [ 8.15, 0.604, 2.062, C.ink,        C.plateCream, "SICP"         ],
    [ 8.81, 0.438, 1.896, C.tan,        C.plateCream, "TAOCP I"      ],
    [ 9.31, 0.438, 1.896, C.tan,        C.plateCream, "TAOCP II"     ],
    [ 9.81, 0.438, 1.896, C.tan,        C.plateCream, "TAOCP III"    ],
    [10.31, 0.646, 1.792, C.forest,     C.plateCream, "UNIX ENV"     ],
    [11.02, 0.500, 1.958, C.plateCream, C.ink,        "DRAGON"       ],
    [11.58, 0.354, 1.812, C.maroon,     C.plateCream, "AWK"          ],
    [12.00, 0.542, 2.000, C.navy,       C.plateCream, "PLAN 9"       ],
    [12.60, 0.458, 1.917, C.mute,       C.plateCream, "ANSI C"       ],
    [13.12, 0.396, 1.854, C.coal,       C.plateCream, "LIONS"        ],
    [13.58, 0.521, 1.979, C.red,        C.plateCream, "LISP"         ],
    [14.17, 0.417, 1.875, C.ink,        C.plateCream, "CODE"         ],
    [14.65, 0.479, 1.938, C.plateCream, C.ink,        "CLRS"         ],
    [15.19, 0.354, 1.812, C.inkSoft,    C.plateCream, "PERL"         ],
  ];
  row1.forEach(([x, w, h, sc, tc, t]) => {
    book(x, 5.52 - h, w, h, sc, tc, t, 7);
  });

  // Row 2 — 16 books (bottom shelf, y anchored to 10.39)
  const row2 = [
    [ 7.17, 0.542, 2.000, C.tanDeep,    C.plateCream, "O'REILLY"     ],
    [ 7.77, 0.417, 1.875, C.plateCream, C.ink,        "CAMEL"        ],
    [ 8.25, 0.375, 1.833, C.coal,       C.plateCream, "SED"          ],
    [ 8.69, 0.458, 1.917, C.red,        C.plateCream, "PRAGMATIC"    ],
    [ 9.21, 0.625, 1.771, C.ink,        C.plateCream, "TCP/IP VOL 1" ],
    [ 9.90, 0.625, 1.771, C.ink,        C.plateCream, "TCP/IP VOL 2" ],
    [10.58, 0.396, 1.854, C.maroon,     C.plateCream, "VIM"          ],
    [11.04, 0.438, 1.896, C.tan,        C.plateCream, "MAKE"         ],
    [11.54, 0.500, 1.958, C.navy,       C.plateCream, "ALGORITHMS"   ],
    [12.10, 0.354, 1.812, C.forest,     C.plateCream, "EMACS"        ],
    [12.52, 0.521, 1.979, C.plateCream, C.ink,        "PAIP"         ],
    [13.10, 0.458, 1.917, C.inkSoft,    C.plateCream, "FORTH"        ],
    [13.62, 0.396, 1.854, C.red,        C.plateCream, "SCHEME"       ],
    [14.08, 0.583, 2.042, C.ink,        C.plateCream, "MYTHICAL M-M" ],
    [14.73, 0.417, 1.875, C.mute,       C.plateCream, "APUE"         ],
    [15.21, 0.438, 1.896, C.coal,       C.plateCream, "COMPILERS"    ],
  ];
  row2.forEach(([x, w, h, sc, tc, t]) => {
    book(x, 10.39 - h, w, h, sc, tc, t, 7);
  });
}

// ============================================================
// SLIDE 8 — A DAY AT TERMINAL (5-column timeline)
// ============================================================
{
  const s = newSlide();

  // Rule
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.92, y: 2.02, w: 18.17, h: 0.012,
    fill: { color: C.line }, line: { type: "none" },
  });

  // Title: A day at Terminal.
  s.addText(
    [
      { text: "A day at ", options: { color: C.ink } },
      { text: "Terminal.", options: { color: C.tanDeep, italic: true } },
    ],
    {
      x: 0.92, y: 0.75, w: 12, h: 0.94,
      fontFace: FONT_SANS, fontSize: 54, bold: true,
      charSpacing: -3, align: "left", valign: "top", margin: 0,
    }
  );

  s.addText("07:00 — 22:00 OPEN EVERY DAY BUT TUESDAY", {
    x: 11.0, y: 1.05, w: 8.08, h: 0.64,
    ...caps(13, C.mute, 9), align: "right", margin: 0, lineSpacingMultiple: 1.2,
  });

  // 5 columns
  const cols = [
    { x: 0.92, w: 3.44, vlineX: 4.55, img: image_8_1, time: "07:00",
      title: "Open.",
      desc: "Espresso pulls, croissants out of the oven. A quiet half-hour before anyone arrives." },
    { x: 4.85, w: 3.13, vlineX: 8.18, img: image_8_2, time: "09:00",
      title: "Students.",
      desc: "Engineering kids with problem sets. Bay 02 is taken. The SE is free." },
    { x: 8.49, w: 3.13, vlineX: 11.82, img: image_8_3, time: "13:00",
      title: "Quiet hour.",
      desc: "Sourdough toast, a second cortado, someone reading SICP cover-to-cover." },
    { x: 12.12, w: 3.13, vlineX: 15.45, img: image_8_4, time: "17:00",
      title: "Workshop.",
      desc: "Thursdays: a short talk. Assembly, CP/M, retro graphics. Small crowd. Folding chairs." },
    { x: 15.75, w: 3.13, vlineX: null,  img: image_8_5, time: "22:00",
      title: "Close.",
      desc: "Lights down. A last soft green glow from the CRT in the window." },
  ];
  cols.forEach((c, i) => {
    // Vertical divider between columns
    if (c.vlineX != null) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: c.vlineX, y: 2.54, w: 0.012, h: 7.96,
        fill: { color: C.line }, line: { type: "none" },
      });
    }
    // Time label
    s.addText(c.time, {
      x: c.x, y: 2.79, w: c.w, h: 0.30,
      ...caps(14, C.tanDeep, 9), margin: 0,
    });
    // Title
    s.addText(c.title, {
      x: c.x, y: 3.25, w: c.w, h: 0.50,
      fontFace: FONT_SANS, fontSize: 26, color: C.ink, bold: false,
      align: "left", valign: "top", margin: 0,
    });
    // Description
    s.addText(c.desc, {
      x: c.x, y: 3.88, w: c.w, h: 1.15,
      fontFace: FONT_SERIF, fontSize: 14, italic: true, color: C.inkSoft,
      align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.4,
    });
    // Bottom illustration block (with colored plate)
    // (first col 3.34 wide, others 3.04 — from source XML)
    const imgW = (i === 0) ? 3.34 : 3.04;
    const platecolor = (i === 4) ? C.ink : C.plateCream;
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: 8.67, w: imgW, h: 1.58,
      fill: { color: platecolor }, line: { type: "none" },
    });
    s.addImage({ data: c.img, x: c.x, y: 8.67, w: imgW, h: 1.58 });
    // Time tag top-left of image
    s.addText(c.time, {
      x: c.x + 0.22, y: 8.86, w: 1, h: 0.24,
      ...caps(10, i === 4 ? C.plateCream : C.inkSoft, 8), margin: 0,
    });
  });
}

// ============================================================
// SLIDE 9 — ROUGH PLAN (floor plan)
// ============================================================
{
  const s = newSlide();

  s.addText("09 — SPACE", {
    x: 0.92, y: 0.75, w: 7.47, h: 0.30,
    ...caps(13, C.mute, 10), margin: 0,
  });

  // Title: Rough plan.
  s.addText(
    [
      { text: "Rough ", options: { color: C.ink } },
      { text: "plan.",  options: { color: C.tanLight, italic: true } },
    ],
    {
      x: 0.92, y: 1.32, w: 10, h: 1.08,
      fontFace: FONT_SANS, fontSize: 60, bold: true,
      charSpacing: -3, align: "left", valign: "top", margin: 0,
    }
  );

  s.addText(
    "One long room. Coffee at the front, books along the west wall, machines on shared oak benches. Big windows onto Liberty.",
    {
      x: 0.92, y: 2.65, w: 7.47, h: 1.2,
      fontFace: FONT_SERIF, fontSize: 18, italic: true, color: C.mute2,
      align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.35,
    }
  );

  // Legend (colored swatches + labels)
  const legend = [
    { y: 9.35, label: "COFFEE BAR · PASTRY CASE" },
    { y: 9.67, label: "LIBRARY · WEST WALL" },
    { y: 9.98, label: "WORKBENCHES · MACHINES" },
    { y:10.29, label: "WINDOW SEATING" },
  ];
  legend.forEach(l => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.92, y: l.y, w: 0.21, h: 0.21,
      fill: { color: C.tanLight }, line: { color: C.tanDeep, width: 0.5 },
    });
    s.addText(l.label, {
      x: 1.31, y: l.y - 0.02, w: 7.07, h: 0.25,
      ...caps(11, C.mute, 9), margin: 0,
    });
  });

  // Plan background (dark)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.92, y: 0.75, w: 10.16, h: 9.75,
    fill: { color: C.planDark }, line: { type: "none" },
  });

  // Room zone drawer
  function zone(x, y, w, h, letter, name) {
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h,
      fill: { color: C.planPanel },
      line: { color: "2A1F12", width: 0.75 },
    });
    s.addText(letter, {
      x: x + 0.13, y: y + 0.10, w: 0.5, h: 0.20,
      ...caps(8, C.mute2, 6), margin: 0,
    });
    s.addText(name, {
      x: x + 0.13, y: y + 0.29, w: w - 0.2, h: 0.38,
      fontFace: FONT_SERIF, fontSize: 16, italic: true, color: C.plateCream,
      align: "left", valign: "top", margin: 0,
    });
  }
  zone( 9.34, 1.54, 3.31, 2.95, "A", "Coffee bar");
  zone( 9.34, 4.65, 1.69, 5.48, "B", "Library");
  zone(11.16, 4.65, 4.93, 5.48, "C", "Workbenches");
  zone(16.23, 1.54, 2.70, 8.60, "D", "Window seating");
  zone(12.79, 1.54, 3.31, 2.95, "E", "Tinker bench");
}

// ============================================================
// SLIDE 10 — CLOSING: OPENING SOON ON LIBERTY
// ============================================================
{
  const s = newSlide();

  // Top eyebrows
  s.addText("TERMINAL / ANN ARBOR", {
    x: 0.92, y: 0.75, w: 8, h: 0.34, ...caps(14, C.mute, 10), margin: 0,
  });
  s.addText("TEASER 10 / 10", {
    x: 14.48, y: 0.75, w: 4.71, h: 0.34,
    ...caps(14, C.mute, 10), align: "right", margin: 0,
  });

  // "Opening soon," (italic tan)
  s.addText("Opening soon,", {
    x: 0.92, y: 3.48, w: 18.71, h: 0.78,
    fontFace: FONT_SANS, fontSize: 50, italic: true, color: C.tanLight,
    bold: false, align: "left", valign: "top", margin: 0,
  });

  // "on Liberty." — "on" in muted tone, "Liberty" italic tan, period tan
  s.addText(
    [
      { text: "on ",      options: { color: C.line } },
      { text: "Liberty",  options: { color: C.tanLight, italic: true } },
      { text: ".",        options: { color: C.tanLight } },
    ],
    {
      x: 0.92, y: 4.48, w: 18.71, h: 2.24,
      fontFace: FONT_SANS, fontSize: 160, bold: false,
      charSpacing: -6, align: "left", valign: "top", margin: 0,
    }
  );

  // Follow line
  s.addText("FOLLOW · @TERMINAL.ANNARBOR · FALL 2026", {
    x: 0.92, y: 7.45, w: 18.71, h: 0.36,
    ...caps(15, C.line, 12), margin: 0,
  });

  // Footer
  s.addText("A COMPUTER CAFÉ.", {
    x: 0.92, y: 10.20, w: 6, h: 0.34, ...caps(13, C.mute, 10), margin: 0,
  });
  s.addText("HELLO@TERMINAL.CAFE", {
    x: 13, y: 10.20, w: 6.2, h: 0.34,
    ...caps(13, C.line, 10), align: "right", margin: 0,
  });
}

// ---------- WRITE ----------
pres.writeFile({ fileName: "retro_tech_shop.pptx" })
    .then(fn => console.log("Wrote", fn));
