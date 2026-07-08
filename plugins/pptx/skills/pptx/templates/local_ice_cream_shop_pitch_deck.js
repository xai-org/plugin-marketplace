// Maple & Main Ice Cream – recreation using pptxgenjs
// Palette (from original PPTX):
//   Cream bg:     F3EAD8
//   Dark brown:   2A1B10
//   Sec. brown:   4A3422
//   Terracotta:   B85528
//   Amber:        C78A2C  (used on dark slides)
//   Card cream:   EBDFC6
//
// All coords are inches. Slide = 13.333" × 7.5" (LAYOUT_WIDE).

const pptxgen = require("pptxgenjs");

// ---- Colors ----
const CREAM   = "F3EAD8";
const DARK    = "2A1B10";
const DARK2   = "4A3422";
const TERRA   = "B85528";
const AMBER   = "C78A2C";
const CARD    = "EBDFC6";

// ---- Layout constants ----
const SLIDE_W = 13.333;
const SLIDE_H = 7.5;

const MARGIN_L = 0.6;
const MARGIN_R = 0.6;
const HEADER_Y = 0.45;
const FOOTER_Y = 7.08;

const FONT_BODY = "Arial";

// ---- Helpers ----------------------------------------------------------------

// Draw the heart-with-two-scoops logo as a group of shapes.
// Anchor (x,y) is the top-left of the bounding box of size (w,h).
// The logo is two circles sitting above an inverted-V (the cone), drawn with
// stroked outlines only — matches the wireframe look in the original.
function drawLogo(slide, pres, x, y, w, h, color, strokeW) {
  // Scoop (circle) radius: each circle ~ 40% of width, overlapping slightly.
  const r = w * 0.28;              // circle radius
  const cy1 = y + r;                // circle vertical center
  const cx1 = x + r;                // left circle center x
  const cx2 = x + w - r;            // right circle center x

  // Left scoop
  slide.addShape(pres.shapes.OVAL, {
    x: cx1 - r, y: cy1 - r, w: r * 2, h: r * 2,
    fill: { type: "none" },
    line: { color, width: strokeW },
  });
  // Right scoop
  slide.addShape(pres.shapes.OVAL, {
    x: cx2 - r, y: cy1 - r, w: r * 2, h: r * 2,
    fill: { type: "none" },
    line: { color, width: strokeW },
  });

  // The cone: an inverted V that starts at the outer edges of the two
  // scoops (at cy1 level) and converges at a point near the bottom-center.
  const tipX = x + w / 2;
  const tipY = y + h;
  const leftAnchorX  = x;
  const rightAnchorX = x + w;
  const anchorY      = cy1;

  // Left cone stroke
  slide.addShape(pres.shapes.LINE, {
    x: leftAnchorX, y: anchorY,
    w: tipX - leftAnchorX, h: tipY - anchorY,
    line: { color, width: strokeW },
    flipV: false,
  });
  // Right cone stroke
  slide.addShape(pres.shapes.LINE, {
    x: tipX, y: anchorY,
    w: rightAnchorX - tipX, h: tipY - anchorY,
    line: { color, width: strokeW },
    flipV: true,
  });
}

// Small version of the logo for the header (stroke-only heart silhouette).
// Matches the tiny mark preceding the "MAPLE & MAIN · ICE CREAM" wordmark.
function drawSmallLogo(slide, pres, x, y, size, color) {
  drawLogo(slide, pres, x, y, size, size, color, 1.25);
}

// Standard header: small logo + brand mark (left) and coordinates (right).
function addHeader(slide, pres, { onDark = false } = {}) {
  const fg = onDark ? CREAM : DARK;
  const logoSize = 0.28;
  drawSmallLogo(slide, pres, MARGIN_L, HEADER_Y - 0.02, logoSize, fg);

  slide.addText("MAPLE & MAIN  ·  ICE CREAM", {
    x: MARGIN_L + logoSize + 0.18, y: HEADER_Y - 0.05, w: 5, h: 0.35,
    fontFace: FONT_BODY, fontSize: 10, bold: true,
    color: fg, charSpacing: 4, margin: 0, valign: "middle",
  });

  slide.addText("00.0000° N  ·  00.0000° W", {
    x: SLIDE_W - MARGIN_R - 4, y: HEADER_Y - 0.05, w: 4, h: 0.35,
    fontFace: FONT_BODY, fontSize: 10, bold: true,
    color: fg, charSpacing: 4, margin: 0, valign: "middle", align: "right",
  });
}

// Standard footer: city label (left) and page N / total (right).
function addFooter(slide, page, total, { onDark = false } = {}) {
  const fg = onDark ? CREAM : DARK;
  slide.addText("ANN ARBOR, MICHIGAN", {
    x: MARGIN_L, y: FOOTER_Y, w: 5, h: 0.3,
    fontFace: FONT_BODY, fontSize: 10, bold: true,
    color: fg, charSpacing: 4, margin: 0, valign: "middle",
  });
  slide.addText(`${String(page).padStart(2, "0")} / ${String(total).padStart(2, "0")}`, {
    x: SLIDE_W - MARGIN_R - 3, y: FOOTER_Y, w: 3, h: 0.3,
    fontFace: FONT_BODY, fontSize: 10, bold: true,
    color: fg, charSpacing: 4, margin: 0, valign: "middle", align: "right",
  });
}

function addEyebrow(slide, text, x, y, color) {
  slide.addText(text, {
    x, y, w: 8, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, bold: true,
    color, charSpacing: 6, margin: 0, valign: "middle",
  });
}

// ---- Presentation -----------------------------------------------------------

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = "Maple & Main Ice Cream";
pres.author = "Maple & Main";

const TOTAL = 9;

// ---------------------------------------------------------------------------
// SLIDE 1 — Cover
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: CREAM };
  addHeader(s, pres);
  addFooter(s, 1, TOTAL);

  // Big decorative logo bleeding off the right edge
  drawLogo(s, pres, 8.5, 1.9, 5.8, 4.7, DARK, 3.5);

  // Eyebrow
  addEyebrow(s, "EST. 2026  ·  A NEW NEIGHBORHOOD SCOOP SHOP", MARGIN_L, 1.55, TERRA);

  // Wordmark "Maple & Main" — the ampersand is terracotta.
  // Original bleeds under the big logo, so the box extends past the logo.
  s.addText(
    [
      { text: "Maple ",   options: { color: DARK,  fontFace: "Georgia" } },
      { text: "& ",       options: { color: TERRA, fontFace: "Georgia", italic: true } },
      { text: "Main",     options: { color: DARK,  fontFace: "Georgia" } },
    ],
    {
      x: MARGIN_L, y: 2.15, w: 13, h: 2.5,
      fontSize: 120, bold: false, margin: 0, valign: "top",
    }
  );

  // Tagline lower-left
  s.addText("Small-batch ice cream, rooted in Michigan. Coming soon to Ann Arbor.", {
    x: MARGIN_L, y: 5.6, w: 6.5, h: 0.9,
    fontFace: FONT_BODY, fontSize: 18, color: DARK,
    margin: 0, valign: "top",
  });
}

// ---------------------------------------------------------------------------
// SLIDE 2 — A letter to the neighborhood
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: CREAM };
  addHeader(s, pres);
  addFooter(s, 2, TOTAL);

  addEyebrow(s, "A LETTER TO THE NEIGHBORHOOD", MARGIN_L, 1.35, TERRA);

  s.addText(
    "Ann Arbor has a great bookstore, a great farmer’s market, and a great diner on every corner.",
    {
      x: MARGIN_L, y: 1.85, w: 8.3, h: 2.2,
      fontFace: FONT_BODY, fontSize: 34, color: DARK,
      margin: 0, valign: "top",
    }
  );

  s.addText("We think it deserves a great ice cream shop, too.", {
    x: MARGIN_L, y: 4.3, w: 8.3, h: 1.6,
    fontFace: FONT_BODY, fontSize: 34, color: TERRA, italic: true,
    margin: 0, valign: "top",
  });

  // Small decorative leaf shape (approximated as a rotated pie/arc)
  s.addShape(pres.shapes.PIE, {
    x: 10.9, y: 2.3, w: 1.4, h: 1.4,
    fill: { color: AMBER },
    line: { color: DARK, width: 1 },
    rotate: 215,
  });
  // Leaf vein lines
  s.addShape(pres.shapes.LINE, {
    x: 11.0, y: 2.75, w: 0.95, h: 0.55,
    line: { color: DARK, width: 1.25 },
  });
  s.addShape(pres.shapes.LINE, {
    x: 11.25, y: 2.75, w: 0.35, h: 0.25,
    line: { color: DARK, width: 1.25 },
  });
  s.addShape(pres.shapes.LINE, {
    x: 11.4, y: 2.85, w: 0.45, h: 0.2,
    line: { color: DARK, width: 1.25 },
  });
}

// ---------------------------------------------------------------------------
// SLIDE 3 — The idea, briefly (dark)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: DARK };
  addHeader(s, pres, { onDark: true });
  addFooter(s, 3, TOTAL, { onDark: true });

  // Big outline logo (cream) bleeding off the bottom-left
  drawLogo(s, pres, -1.6, 2.6, 5.8, 4.7, CREAM, 3.5);

  addEyebrow(s, "THE IDEA, BRIEFLY", MARGIN_L, 1.75, AMBER);

  s.addText(
    [
      { text: "A small scoop shop that churns what’s ", options: { color: CREAM } },
      { text: "in season", options: { color: AMBER, italic: true } },
      { text: ", sources from farms we can ", options: { color: CREAM } },
      { text: "drive to", options: { color: AMBER, italic: true } },
      { text: ", and stays open late enough to become a ", options: { color: CREAM } },
      { text: "habit", options: { color: AMBER, italic: true } },
      { text: ".", options: { color: CREAM } },
    ],
    {
      x: MARGIN_L, y: 2.35, w: 12.0, h: 4.0,
      fontFace: FONT_BODY, fontSize: 40,
      margin: 0, valign: "top",
    }
  );
}

// ---------------------------------------------------------------------------
// SLIDE 4 — Four things we care about (2×2 grid)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: CREAM };
  addHeader(s, pres);
  addFooter(s, 4, TOTAL);

  s.addText("Four things we care about.", {
    x: MARGIN_L, y: 1.1, w: 12, h: 1.1,
    fontFace: FONT_BODY, fontSize: 48, color: DARK,
    margin: 0, valign: "middle",
  });

  const items = [
    ["01", "Small batch",  "Churned in-house. Two flavors introduced each week."],
    ["02", "Seasonal",     "Menus follow the Michigan calendar, not the grocery aisle."],
    ["03", "Neighborly",   "A front porch on Main Street. Kids, dogs, long conversations."],
    ["04", "Honest",       "Real cream, real fruit, real names on every card."],
  ];

  const cellW = 5.9;
  const cellH = 1.55;
  const colX = [MARGIN_L, MARGIN_L + cellW + 0.3];
  const rowY = [2.5, 4.2];

  items.forEach(([num, title, body], i) => {
    const cx = colX[i % 2];
    const cy = rowY[Math.floor(i / 2)];

    // Divider line above each cell
    s.addShape(pres.shapes.LINE, {
      x: cx, y: cy - 0.08, w: cellW, h: 0,
      line: { color: DARK2, width: 0.5, transparency: 60 },
    });

    // Number (terracotta)
    s.addText(num, {
      x: cx, y: cy + 0.05, w: 0.8, h: 0.5,
      fontFace: FONT_BODY, fontSize: 14, color: TERRA, bold: true,
      charSpacing: 2, margin: 0, valign: "top",
    });

    // Title
    s.addText(title, {
      x: cx + 0.85, y: cy, w: cellW - 1.0, h: 0.55,
      fontFace: FONT_BODY, fontSize: 22, color: DARK,
      margin: 0, valign: "top",
    });

    // Body
    s.addText(body, {
      x: cx + 0.85, y: cy + 0.55, w: cellW - 1.0, h: 0.9,
      fontFace: FONT_BODY, fontSize: 13, color: DARK2,
      margin: 0, valign: "top",
    });
  });

  // Closing divider under the last row
  s.addShape(pres.shapes.LINE, {
    x: colX[0], y: rowY[1] + cellH, w: cellW, h: 0,
    line: { color: DARK2, width: 0.5, transparency: 60 },
  });
  s.addShape(pres.shapes.LINE, {
    x: colX[1], y: rowY[1] + cellH, w: cellW, h: 0,
    line: { color: DARK2, width: 0.5, transparency: 60 },
  });
}

// ---------------------------------------------------------------------------
// SLIDE 5 — Opening menu · Autumn edition
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: CREAM };
  addHeader(s, pres);
  addFooter(s, 5, TOTAL);

  // LEFT column
  addEyebrow(s, "OPENING MENU  ·  AUTUMN EDITION", MARGIN_L, 1.3, TERRA);

  s.addText("Six flavors,\nrotating weekly.", {
    x: MARGIN_L, y: 1.75, w: 5.5, h: 1.9,
    fontFace: FONT_BODY, fontSize: 44, color: DARK,
    margin: 0, valign: "top",
  });

  s.addText(
    "Two classics stay on the board. The other four follow what farmers bring us each week. When a flavor sells out, it’s gone until next season.",
    {
      x: MARGIN_L, y: 3.75, w: 5.3, h: 1.3,
      fontFace: FONT_BODY, fontSize: 14, color: DARK,
      margin: 0, valign: "top",
    }
  );

  // Badge: rounded rect with a small dot + label
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: MARGIN_L, y: 5.1, w: 4.6, h: 0.55,
    fill: { type: "none" },
    line: { color: DARK, width: 0.75 },
    rectRadius: 0.05,
  });
  s.addShape(pres.shapes.OVAL, {
    x: MARGIN_L + 0.2, y: 5.25, w: 0.25, h: 0.25,
    fill: { color: TERRA },
    line: { color: DARK, width: 0.5 },
  });
  s.addText("AUTUMN BOARD  ·  OCT – NOV", {
    x: MARGIN_L + 0.55, y: 5.1, w: 4.0, h: 0.55,
    fontFace: FONT_BODY, fontSize: 12, bold: true, color: DARK,
    charSpacing: 4, margin: 0, valign: "middle",
  });

  // RIGHT panel (menu card on slightly darker cream)
  const panelX = 6.7;
  const panelY = 1.15;
  const panelW = 6.0;
  const panelH = 6.25;

  s.addShape(pres.shapes.RECTANGLE, {
    x: panelX, y: panelY, w: panelW, h: panelH,
    fill: { color: CARD },
    line: { color: DARK2, width: 0.75, transparency: 60 },
  });

  // Panel header row
  s.addText("FLAVOR", {
    x: panelX + 0.3, y: panelY + 0.25, w: 3, h: 0.4,
    fontFace: FONT_BODY, fontSize: 11, bold: true, color: DARK,
    charSpacing: 4, margin: 0, valign: "middle",
  });
  s.addText("WEEK OF", {
    x: panelX + panelW - 2.3, y: panelY + 0.25, w: 2.0, h: 0.4,
    fontFace: FONT_BODY, fontSize: 11, bold: true, color: DARK,
    charSpacing: 4, margin: 0, valign: "middle", align: "right",
  });

  // Flavor rows
  const flavors = [
    ["Cider-donut custard",  "Wasem Fruit Farm cider, brown butter",    "HOUSE FAVORITE"],
    ["Black walnut & honey", "Michigan black walnuts, wildflower honey", ""],
    ["Maple & toasted oat",  "Stateside grade-A syrup, steel-cut oats", "VEGAN ON REQUEST"],
    ["Concord grape sorbet", "Paw Paw grapes, no stabilizers",           ""],
    ["Pumpkin caramel swirl","Roasted sugar pumpkin, smoked salt caramel", ""],
    ["Brown-bread vanilla",  "Zingerman’s loaf, Tahitian vanilla",        ""],
  ];

  const rowStartY = panelY + 0.75;
  const rowH = 0.88;

  flavors.forEach(([name, sub, tag], i) => {
    const ry = rowStartY + i * rowH;

    // Name
    s.addText(name, {
      x: panelX + 0.3, y: ry, w: 4.3, h: 0.4,
      fontFace: FONT_BODY, fontSize: 18, color: DARK,
      margin: 0, valign: "top",
    });
    // Subtitle
    s.addText(sub, {
      x: panelX + 0.3, y: ry + 0.4, w: 4.3, h: 0.35,
      fontFace: FONT_BODY, fontSize: 12, color: DARK2,
      margin: 0, valign: "top",
    });
    // Right-side tag
    if (tag) {
      s.addText(tag, {
        x: panelX + panelW - 2.8, y: ry + 0.08, w: 2.5, h: 0.4,
        fontFace: FONT_BODY, fontSize: 10, bold: true, color: TERRA,
        charSpacing: 4, margin: 0, align: "right", valign: "top",
      });
    }
    // Divider (skip before the first row — it's under the header)
    if (i >= 0) {
      s.addShape(pres.shapes.LINE, {
        x: panelX + 0.3, y: ry - 0.08, w: panelW - 0.6, h: 0,
        line: { color: DARK2, width: 0.5, transparency: 70 },
      });
    }
  });
}

// ---------------------------------------------------------------------------
// SLIDE 6 — Sourcing map
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: CREAM };
  addHeader(s, pres);
  addFooter(s, 6, TOTAL);

  // LEFT: map panel
  const mapX = MARGIN_L;
  const mapY = 1.4;
  const mapW = 5.8;
  const mapH = 5.4;

  addEyebrow(s, "SOURCING MAP  ·  SOUTHEAST MICHIGAN", mapX, 0.95, TERRA);

  // Map card
  s.addShape(pres.shapes.RECTANGLE, {
    x: mapX, y: mapY, w: mapW, h: mapH,
    fill: { color: CARD },
    line: { color: DARK2, width: 0.75, transparency: 60 },
  });

  // Faint grid lines
  const gridCols = 7;
  const gridRows = 7;
  for (let i = 1; i < gridCols; i++) {
    const gx = mapX + (mapW / gridCols) * i;
    s.addShape(pres.shapes.LINE, {
      x: gx, y: mapY, w: 0, h: mapH,
      line: { color: DARK2, width: 0.4, transparency: 85 },
    });
  }
  for (let j = 1; j < gridRows; j++) {
    const gy = mapY + (mapH / gridRows) * j;
    s.addShape(pres.shapes.LINE, {
      x: mapX, y: gy, w: mapW, h: 0,
      line: { color: DARK2, width: 0.4, transparency: 85 },
    });
  }

  // Michigan Lower Peninsula mitten — polyline approximation via segments
  // Coordinates roughly within the map box (relative fractions of mapW,mapH)
  const poly = [
    [0.35, 0.18], [0.52, 0.15], [0.62, 0.18], [0.72, 0.30],
    [0.78, 0.45], [0.80, 0.58], [0.76, 0.70], [0.72, 0.80],
    [0.60, 0.88], [0.48, 0.90], [0.38, 0.88], [0.30, 0.82],
    [0.26, 0.72], [0.25, 0.60], [0.26, 0.48], [0.24, 0.35],
    [0.28, 0.24], [0.35, 0.18],
  ];
  for (let i = 0; i < poly.length - 1; i++) {
    const [fx1, fy1] = poly[i];
    const [fx2, fy2] = poly[i + 1];
    const x1 = mapX + fx1 * mapW, y1 = mapY + fy1 * mapH;
    const x2 = mapX + fx2 * mapW, y2 = mapY + fy2 * mapH;
    const lx = Math.min(x1, x2), ly = Math.min(y1, y2);
    const lw = Math.abs(x2 - x1), lh = Math.abs(y2 - y1);
    const flipV = (x1 < x2) !== (y1 < y2);
    s.addShape(pres.shapes.LINE, {
      x: lx, y: ly, w: lw, h: lh,
      line: { color: DARK, width: 2 },
      flipV,
    });
  }

  // Small "thumb" (Upper Peninsula stub to the right)
  const thumb = [
    [0.82, 0.30], [0.88, 0.32], [0.90, 0.42], [0.86, 0.50], [0.82, 0.48], [0.82, 0.30],
  ];
  for (let i = 0; i < thumb.length - 1; i++) {
    const [fx1, fy1] = thumb[i];
    const [fx2, fy2] = thumb[i + 1];
    const x1 = mapX + fx1 * mapW, y1 = mapY + fy1 * mapH;
    const x2 = mapX + fx2 * mapW, y2 = mapY + fy2 * mapH;
    const lx = Math.min(x1, x2), ly = Math.min(y1, y2);
    const lw = Math.abs(x2 - x1), lh = Math.abs(y2 - y1);
    const flipV = (x1 < x2) !== (y1 < y2);
    s.addShape(pres.shapes.LINE, {
      x: lx, y: ly, w: lw, h: lh,
      line: { color: DARK, width: 2 },
      flipV,
    });
  }

  // Ann Arbor radar circles + dot
  const aaCx = mapX + 0.55 * mapW;
  const aaCy = mapY + 0.65 * mapH;
  [0.55, 0.38].forEach(r => {
    s.addShape(pres.shapes.OVAL, {
      x: aaCx - r, y: aaCy - r, w: r * 2, h: r * 2,
      fill: { type: "none" },
      line: { color: TERRA, width: 0.75, transparency: 40 },
    });
  });
  s.addShape(pres.shapes.OVAL, {
    x: aaCx - 0.1, y: aaCy - 0.1, w: 0.2, h: 0.2,
    fill: { color: TERRA },
    line: { color: TERRA, width: 0.5 },
  });
  // Callout line + label
  s.addShape(pres.shapes.LINE, {
    x: aaCx + 0.55, y: aaCy, w: 0.55, h: 0,
    line: { color: DARK, width: 1 },
  });
  s.addText("ANN ARBOR", {
    x: aaCx + 1.1, y: aaCy - 0.18, w: 1.3, h: 0.35,
    fontFace: FONT_BODY, fontSize: 10, bold: true, color: DARK,
    charSpacing: 4, margin: 0, valign: "middle",
  });

  // Coordinate label
  s.addText("00.0000° N  00.0000° W", {
    x: mapX + 0.2, y: mapY + mapH - 0.45, w: 2.5, h: 0.3,
    fontFace: FONT_BODY, fontSize: 8, bold: true, color: DARK,
    charSpacing: 3, margin: 0, valign: "middle",
  });

  // RIGHT: headline + sources list
  const rx = 7.0;
  s.addText("Made in Ann Arbor.", {
    x: rx, y: 1.15, w: 6.0, h: 1.1,
    fontFace: FONT_BODY, fontSize: 44, color: DARK,
    margin: 0, valign: "top",
  });

  s.addText(
    "Milk within sixty miles. Fruit from the orchards that raised us. Honey and syrup from the same state we stand in.",
    {
      x: rx, y: 2.9, w: 5.8, h: 1.1,
      fontFace: FONT_BODY, fontSize: 14, color: DARK,
      margin: 0, valign: "top",
    }
  );

  // Sources table: Name | City | Distance
  const sources = [
    ["Calder Dairy",         "Carleton, MI",    "38 mi"],
    ["Wasem Fruit Farm",     "Milan, MI",       "14 mi"],
    ["Kapnick Orchards",     "Britton, MI",     "41 mi"],
    ["Zingerman’s Creamery", "Ann Arbor, MI",   "2 mi"],
    ["Slow Farm",            "Ann Arbor, MI",   "6 mi"],
    ["Michigan maple syrup", "Northern LP",     "—"],
  ];
  const listY0 = 4.15;
  const listRowH = 0.45;
  const distW = 1.0;
  const cityW = 2.0;

  sources.forEach(([name, city, dist], i) => {
    const y = listY0 + i * listRowH;
    // Divider (above row)
    s.addShape(pres.shapes.LINE, {
      x: rx, y: y - 0.05, w: 5.8, h: 0,
      line: { color: DARK2, width: 0.5, transparency: 70 },
    });
    // Name
    s.addText(name, {
      x: rx, y, w: 5.8 - cityW - distW - 0.2, h: 0.4,
      fontFace: FONT_BODY, fontSize: 14, color: DARK,
      margin: 0, valign: "middle",
    });
    // City
    s.addText(city, {
      x: rx + 5.8 - cityW - distW - 0.1, y, w: cityW, h: 0.4,
      fontFace: FONT_BODY, fontSize: 13, color: DARK2,
      margin: 0, valign: "middle",
    });
    // Distance
    s.addText(dist, {
      x: rx + 5.8 - distW, y, w: distW, h: 0.4,
      fontFace: FONT_BODY, fontSize: 13, color: TERRA,
      margin: 0, align: "right", valign: "middle",
    });
  });
  // Final divider
  s.addShape(pres.shapes.LINE, {
    x: rx, y: listY0 + sources.length * listRowH - 0.05, w: 5.8, h: 0,
    line: { color: DARK2, width: 0.5, transparency: 70 },
  });
}

// ---------------------------------------------------------------------------
// SLIDE 7 — The space
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: CREAM };
  addHeader(s, pres);
  addFooter(s, 7, TOTAL);

  // LEFT text block
  addEyebrow(s, "THE SPACE", MARGIN_L, 1.3, TERRA);

  s.addText("A warm room to\nstand in.", {
    x: MARGIN_L, y: 1.75, w: 5.5, h: 1.9,
    fontFace: FONT_BODY, fontSize: 44, color: DARK,
    margin: 0, valign: "top",
  });

  s.addText(
    "Reclaimed oak, tile that can take a spill, a big window facing west for afternoon light. Enough stools at the counter for a conversation with whoever’s scooping.",
    {
      x: MARGIN_L, y: 3.75, w: 5.5, h: 1.6,
      fontFace: FONT_BODY, fontSize: 15, color: DARK,
      margin: 0, valign: "top",
    }
  );

  s.addText("Open late on Fridays. Dogs welcome on the patio.", {
    x: MARGIN_L, y: 5.2, w: 5.5, h: 0.8,
    fontFace: FONT_BODY, fontSize: 15, color: DARK,
    margin: 0, valign: "top",
  });

  // RIGHT: three image placeholder cards
  const gap = 0.15;
  const bigX = 6.9;
  const bigY = 1.25;
  const bigW = 3.0;
  const bigH = 5.5;
  const smallX = bigX + bigW + gap;
  const smallW = 3.0;
  const smallH = (bigH - gap) / 2;

  // Big left card
  s.addShape(pres.shapes.RECTANGLE, {
    x: bigX, y: bigY, w: bigW, h: bigH,
    fill: { color: CARD },
    line: { color: DARK2, width: 0.75, transparency: 60 },
  });
  s.addText("COUNTER  ·  VIEW FROM DOOR", {
    x: bigX + 0.12, y: bigY + bigH - 0.5, w: bigW - 0.24, h: 0.35,
    fontFace: FONT_BODY, fontSize: 9, bold: true, color: DARK,
    charSpacing: 2, margin: 0, valign: "middle",
  });

  // Small top-right
  s.addShape(pres.shapes.RECTANGLE, {
    x: smallX, y: bigY, w: smallW, h: smallH,
    fill: { color: CARD },
    line: { color: DARK2, width: 0.75, transparency: 60 },
  });
  s.addText("DETAIL  ·  TILE + OAK", {
    x: smallX + 0.15, y: bigY + smallH - 0.5, w: smallW - 0.3, h: 0.35,
    fontFace: FONT_BODY, fontSize: 9, bold: true, color: DARK,
    charSpacing: 3, margin: 0, valign: "middle",
  });

  // Small bottom-right
  s.addShape(pres.shapes.RECTANGLE, {
    x: smallX, y: bigY + smallH + gap, w: smallW, h: smallH,
    fill: { color: CARD },
    line: { color: DARK2, width: 0.75, transparency: 60 },
  });
  s.addText("PATIO  ·  LATE AFTERNOON", {
    x: smallX + 0.15, y: bigY + smallH + gap + smallH - 0.5, w: smallW - 0.3, h: 0.35,
    fontFace: FONT_BODY, fontSize: 9, bold: true, color: DARK,
    charSpacing: 3, margin: 0, valign: "middle",
  });
}

// ---------------------------------------------------------------------------
// SLIDE 8 — How to be part of it (3 cards)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: CREAM };
  addHeader(s, pres);
  addFooter(s, 8, TOTAL);

  s.addText("How to be part of it.", {
    x: MARGIN_L, y: 1.15, w: 8.5, h: 1.0,
    fontFace: FONT_BODY, fontSize: 46, color: DARK,
    margin: 0, valign: "middle",
  });

  s.addText("THREE WAYS", {
    x: 9.2, y: 1.4, w: 3, h: 0.5,
    fontFace: FONT_BODY, fontSize: 14, bold: true, color: TERRA,
    charSpacing: 6, margin: 0, valign: "middle",
  });

  const cards = [
    ["01", "Taste with us",     "We’re hosting preview nights this autumn. Bring honest opinions. Leave with extra pints."],
    ["02", "Tell us a flavor",  "Every menu has one neighbor-suggested flavor. Drop a note at the card table on Main."],
    ["03", "Work the counter",  "We’re hiring scoopers, dishwashers, and a weekend baker. High-school welcome."],
  ];

  const cardW = 3.9;
  const cardH = 3.3;
  const cardGap = 0.22;
  const cardY = 2.7;
  const startX = MARGIN_L;

  cards.forEach(([num, title, body], i) => {
    const cx = startX + i * (cardW + cardGap);
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardY, w: cardW, h: cardH,
      fill: { color: CARD },
      line: { color: DARK2, width: 0.75, transparency: 60 },
    });
    s.addText(num, {
      x: cx + 0.35, y: cardY + 0.3, w: 1.5, h: 0.5,
      fontFace: FONT_BODY, fontSize: 18, color: TERRA,
      margin: 0, valign: "top",
    });
    s.addText(title, {
      x: cx + 0.35, y: cardY + 0.85, w: cardW - 0.7, h: 0.6,
      fontFace: FONT_BODY, fontSize: 26, color: DARK,
      margin: 0, valign: "top",
    });
    s.addText(body, {
      x: cx + 0.35, y: cardY + 1.6, w: cardW - 0.7, h: 1.6,
      fontFace: FONT_BODY, fontSize: 13, color: DARK,
      margin: 0, valign: "top",
    });
  });
}

// ---------------------------------------------------------------------------
// SLIDE 9 — Grand opening (dark)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: DARK };
  addHeader(s, pres, { onDark: true });
  addFooter(s, 9, TOTAL, { onDark: true });

  // Big outline logo bleeding off bottom-left
  drawLogo(s, pres, -1.6, 3.0, 5.8, 4.7, CREAM, 3.5);

  // LEFT block
  addEyebrow(s, "GRAND OPENING", MARGIN_L, 2.55, AMBER);

  s.addText(
    [
      { text: "This ",      options: { color: CREAM, fontFace: "Georgia" } },
      { text: "autumn.",    options: { color: AMBER, fontFace: "Georgia", italic: true } },
    ],
    {
      x: MARGIN_L, y: 3.05, w: 6.0, h: 2.5,
      fontSize: 88, margin: 0, valign: "top",
    }
  );

  // RIGHT column (info panel)
  const rx = 7.4;
  const rw = 5.3;

  const rows = [
    ["WHERE",          [{ text: "Downtown Ann Arbor ", options: { color: CREAM } },
                        { text: "address revealed soon", options: { color: CREAM, italic: true, transparency: 40 } }]],
    ["PREVIEW NIGHTS", [{ text: "Dates posted in October", options: { color: CREAM } }]],
    ["SAY HELLO",      [{ text: "hello@mapleandmain.co", options: { color: CREAM } }]],
  ];

  const rowStartY = 2.55;
  const rowH = 1.25;

  rows.forEach(([label, textRuns], i) => {
    const ry = rowStartY + i * rowH;
    // Top divider
    s.addShape(pres.shapes.LINE, {
      x: rx, y: ry - 0.05, w: rw, h: 0,
      line: { color: CREAM, width: 0.5, transparency: 60 },
    });
    s.addText(label, {
      x: rx, y: ry + 0.05, w: rw, h: 0.35,
      fontFace: FONT_BODY, fontSize: 12, bold: true, color: AMBER,
      charSpacing: 6, margin: 0, valign: "middle",
    });
    s.addText(textRuns, {
      x: rx, y: ry + 0.45, w: rw, h: 0.6,
      fontFace: FONT_BODY, fontSize: 18, margin: 0, valign: "top",
    });
  });
  // Bottom divider
  s.addShape(pres.shapes.LINE, {
    x: rx, y: rowStartY + rows.length * rowH - 0.05, w: rw, h: 0,
    line: { color: CREAM, width: 0.5, transparency: 60 },
  });
}

// ---------------------------------------------------------------------------

pres.writeFile({ fileName: "Ice_cream_shop.pptx" })
  .then(() => console.log("Wrote Ice_cream_shop.pptx"))
  .catch(err => { console.error(err); process.exit(1); });
