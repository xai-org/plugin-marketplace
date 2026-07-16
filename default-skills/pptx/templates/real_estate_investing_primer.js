// Recreates "Real Estate Investing" deck using pptxgenjs.
// Editorial-style dark-green primer with cream/terracotta palette.

const pptxgen = require("pptxgenjs");
const sharp   = require("sharp");

// Generates a smooth vertical gradient PNG as a base64 data URI.
// Used instead of stacked rectangles (which show visible banding in PowerPoint).
async function makeVerticalGradientDataUri(topHex, botHex, widthPx = 1600, heightPx = 600) {
  const hex2rgb = h => [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
  const [r1,g1,b1] = hex2rgb(topHex);
  const [r2,g2,b2] = hex2rgb(botHex);

  // Build raw RGB buffer, one row at a time (fast — no per-pixel work).
  const buf = Buffer.alloc(widthPx * heightPx * 3);
  for (let y = 0; y < heightPx; y++) {
    const t = y / (heightPx - 1);
    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);
    for (let x = 0; x < widthPx; x++) {
      const i = (y * widthPx + x) * 3;
      buf[i]     = r;
      buf[i + 1] = g;
      buf[i + 2] = b;
    }
  }
  const pngBuffer = await sharp(buf, { raw: { width: widthPx, height: heightPx, channels: 3 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}


// ---------- Palette ----------
const BG            = "181F1B"; // near-black deep forest
const BG_SUNSET_TOP = "C5653E"; // sunset orange top
const CREAM         = "EFE7D4"; // primary light text
const CREAM_DIM     = "BFB8A6"; // secondary / muted
const CREAM_MUTED   = "6C6A5E"; // labels / captions
const ACCENT        = "E89A6D"; // terracotta / coral (the "orange" italic accent)
const ACCENT_DEEP   = "C56F47"; // deeper orange (roof, chart, sun)
const SAGE          = "9CAE87"; // muted sage green
const SAGE_DEEP     = "6E7E5B"; // deeper green for city silhouettes
const DIVIDER       = "2D352F"; // subtle divider / bars background
const DIVIDER_SOFT  = "2A322C";

// ---------- Fonts ----------
const H_FONT = "Cambria";    // serifed, editorial display
const B_FONT = "Calibri";    // clean body

// ---------- Layout constants (LAYOUT_WIDE: 13.333 x 7.5 in) ----------
const SLIDE_W = 13.333;
const SLIDE_H = 7.5;
const MARGIN  = 0.7;

// ---------- Safe line helper ----------
// PowerPoint rejects shapes with zero/negative cx or cy extents (even though
// LibreOffice tolerates them). Lines need a tiny positive extent on both axes,
// and negative w/h must be converted to positive + flipH/flipV.
const EPS = 0.005;
function addLine(slide, opts) {
  let { x, y, w, h, line } = opts;
  const flipH = w < 0;
  const flipV = h < 0;
  if (flipH) { x = x + w; w = -w; }
  if (flipV) { y = y + h; h = -h; }
  if (w < EPS) w = EPS;
  if (h < EPS) h = EPS;
  slide.addShape(pres.shapes.LINE, {
    x, y, w, h, line,
    ...(flipH ? { flipH: true } : {}),
    ...(flipV ? { flipV: true } : {}),
  });
}

// ======================================================================
// Build presentation
// ======================================================================
const pres = new pptxgen();
(async () => {
pres.layout = "LAYOUT_WIDE";
pres.title  = "Real Estate Investing — A Primer";
pres.author = "Primer";

// ----------------------------------------------------------------------
// Header helper (used on slides 2–10)
// ----------------------------------------------------------------------
function addHeader(slide, pageNum, total = 10) {
  // "Real Estate Investing" wordmark, left
  slide.addText(
    [
      { text: "Real Estate ", options: { color: CREAM, bold: false } },
      { text: "Investing",   options: { color: ACCENT, italic: true } },
    ],
    {
      x: MARGIN, y: 0.35, w: 6, h: 0.5,
      fontFace: B_FONT, fontSize: 16, margin: 0, valign: "middle",
    }
  );

  // Page number, right
  slide.addText(
    `${String(pageNum).padStart(2, "0")} / ${total}`,
    {
      x: SLIDE_W - MARGIN - 2, y: 0.35, w: 2, h: 0.5,
      fontFace: B_FONT, fontSize: 13, color: CREAM_DIM,
      align: "right", valign: "middle", margin: 0, charSpacing: 2,
    }
  );

  // Thin horizontal divider under header
  addLine(slide, {
    x: MARGIN, y: 0.95, w: SLIDE_W - 2 * MARGIN, h: 0,
    line: { color: DIVIDER, width: 0.75 },
  });
}

function addSectionLabel(slide, text, y = 1.35) {
  slide.addText(text, {
    x: MARGIN, y, w: 8, h: 0.4,
    fontFace: B_FONT, fontSize: 12, color: CREAM_MUTED,
    charSpacing: 6, margin: 0, valign: "middle",
  });
}

// ======================================================================
// SLIDE 1 — Cover
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };

  // Top-left eyebrow: "An Introduction"
  s.addText(
    [
      { text: "An ",           options: { color: CREAM } },
      { text: "Introduction",  options: { color: CREAM, italic: true } },
    ],
    {
      x: MARGIN, y: 0.55, w: 6, h: 0.45,
      fontFace: B_FONT, fontSize: 16, margin: 0, valign: "middle",
    }
  );

  // Top-right: bullet + "A PRIMER · 2026"
  s.addShape(pres.shapes.OVAL, {
    x: SLIDE_W - MARGIN - 3.0, y: 0.70, w: 0.11, h: 0.11,
    fill: { color: ACCENT }, line: { color: ACCENT, width: 0 },
  });
  s.addText("A PRIMER · 2026", {
    x: SLIDE_W - MARGIN - 2.8, y: 0.55, w: 2.8, h: 0.45,
    fontFace: B_FONT, fontSize: 13, color: CREAM,
    charSpacing: 4, align: "left", valign: "middle", margin: 0,
  });

  // Second row (sub-eyebrow): "10 SLIDES · 5 MINUTES · FOR THE BEGINNER"  |  "FIG. 01 — THE CITY AT DUSK"
  s.addText("10 SLIDES · 5 MINUTES · FOR THE BEGINNER", {
    x: MARGIN, y: 1.10, w: 7, h: 0.4,
    fontFace: B_FONT, fontSize: 12, color: CREAM_DIM,
    charSpacing: 6, margin: 0, valign: "middle",
  });
  s.addText("FIG. 01 — THE CITY AT DUSK", {
    x: SLIDE_W - MARGIN - 5, y: 1.10, w: 5, h: 0.4,
    fontFace: B_FONT, fontSize: 12, color: ACCENT,
    charSpacing: 6, align: "right", margin: 0, valign: "middle",
  });

  // Big title: "Real Estate Investing" — Investing in italic orange
  s.addText(
    [
      { text: "Real Estate ", options: { color: CREAM } },
      { text: "Investing",    options: { color: ACCENT, italic: true } },
    ],
    {
      x: MARGIN, y: 1.7, w: SLIDE_W - 2 * MARGIN, h: 2.2,
      fontFace: H_FONT, fontSize: 88, bold: false, margin: 0, valign: "top",
    }
  );

  // ---- City skyline illustration along the bottom ----
  // back row (dark green, receding)
  const backRow = [
    // [x, w, h]
    [0.4, 1.0, 1.4], [1.5, 0.9, 1.8], [2.5, 1.2, 1.6],
    [3.8, 0.8, 2.0], [4.7, 1.1, 1.5], [5.9, 1.3, 1.9],
    [7.3, 1.0, 1.7], [8.4, 0.9, 1.4], [9.4, 1.2, 1.8],
    [10.7, 0.9, 1.5], [11.7, 1.2, 1.8],
  ];
  backRow.forEach(([x, w, h]) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: SLIDE_H - h - 0.6, w, h,
      fill: { color: SAGE_DEEP, transparency: 55 },
      line: { color: SAGE_DEEP, width: 0, transparency: 100 },
    });
  });

  // front row (cream buildings with windows)
  const frontRow = [
    { x: 0.3,  w: 1.3, h: 1.0, color: CREAM,       windows: 6 },
    { x: 1.7,  w: 1.0, h: 0.8, color: CREAM_DIM,   windows: 3 },
    { x: 2.8,  w: 1.4, h: 0.9, color: CREAM,       windows: 3 },
    { x: 4.3,  w: 0.9, h: 1.9, color: ACCENT,      windows: 9 }, // the orange feature building
    { x: 5.3,  w: 1.2, h: 0.75,color: CREAM,       windows: 3 },
    { x: 6.6,  w: 1.3, h: 0.9, color: CREAM_DIM,   windows: 3 },
    { x: 8.0,  w: 1.1, h: 0.85,color: CREAM,       windows: 3 },
    { x: 9.2,  w: 1.2, h: 0.95,color: CREAM_DIM,   windows: 3 },
    { x: 10.5, w: 1.1, h: 0.8, color: CREAM,       windows: 3 },
    { x: 11.7, w: 1.3, h: 1.0, color: CREAM_DIM,   windows: 6 },
  ];
  frontRow.forEach(b => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: b.x, y: SLIDE_H - b.h - 0.05, w: b.w, h: b.h,
      fill: { color: b.color }, line: { color: b.color, width: 0 },
    });
    // tiny windows: cluster of 3 or 6 small squares near the top
    const rows = b.windows === 9 ? 3 : (b.windows === 6 ? 2 : 1);
    const cols = 3;
    const winColor = b.color === ACCENT ? CREAM : (b.color === CREAM ? SAGE_DEEP : "3A3F36");
    const winSize = 0.06;
    const gapX = 0.10;
    const gapY = 0.12;
    const totalW = cols * winSize + (cols - 1) * gapX;
    const startX = b.x + (b.w - totalW) / 2;
    const startY = SLIDE_H - b.h + 0.10;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        s.addShape(pres.shapes.RECTANGLE, {
          x: startX + c * (winSize + gapX),
          y: startY + r * (winSize + gapY),
          w: winSize, h: winSize,
          fill: { color: winColor },
          line: { color: winColor, width: 0 },
        });
      }
    }
  });
}

// ======================================================================
// SLIDE 2 — WHY (three stats)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, 2);
  addSectionLabel(s, "§ 01 · WHY");

  // Left: pull quote
  s.addText(
    [
      { text: "The only asset class you can ", options: { color: CREAM } },
      { text: "live in",        options: { color: ACCENT, italic: true } },
      { text: ", ",             options: { color: CREAM } },
      { text: "rent out",       options: { color: ACCENT, italic: true } },
      { text: ", ",             options: { color: CREAM } },
      { text: "borrow against", options: { color: ACCENT, italic: true } },
      { text: " , and ",        options: { color: CREAM } },
      { text: "pass down",      options: { color: ACCENT, italic: true } },
      { text: ".",              options: { color: CREAM } },
    ],
    {
      x: MARGIN, y: 1.95, w: 6.0, h: 2.3,
      fontFace: H_FONT, fontSize: 34, margin: 0, valign: "top",
    }
  );

  // Small icon row at bottom-left (Live / Rent / Borrow / Inherit)
  // Simple house icon
  const iconY = 5.6, iconSize = 0.6;
  const icons = [
    { x: MARGIN + 0.1, label: "LIVE" },
    { x: MARGIN + 1.5, label: "RENT" },
    { x: MARGIN + 2.9, label: "BORROW" },
    { x: MARGIN + 4.3, label: "INHERIT" },
  ];
  // House (Live)
  const hx = icons[0].x, hy = iconY;
  // roof triangle via freeform-ish approximation using a small rectangle is hard — use outline
  s.addShape(pres.shapes.RECTANGLE, {
    x: hx + 0.07, y: hy + 0.28, w: iconSize - 0.14, h: iconSize - 0.28,
    fill: { color: BG }, line: { color: ACCENT, width: 1.25 },
  });
  // roof lines
  addLine(s, {
    x: hx + 0.07, y: hy + 0.28, w: (iconSize / 2) - 0.07, h: -0.22,
    line: { color: ACCENT, width: 1.25 },
  });
  addLine(s, {
    x: hx + iconSize / 2, y: hy + 0.06, w: (iconSize / 2) - 0.07, h: 0.22,
    line: { color: ACCENT, width: 1.25 },
  });
  // door
  s.addShape(pres.shapes.RECTANGLE, {
    x: hx + iconSize / 2 - 0.06, y: hy + 0.45, w: 0.12, h: 0.15,
    fill: { color: ACCENT }, line: { color: ACCENT, width: 0 },
  });

  // Arrow (dashed) between Live and Rent
  addLine(s, {
    x: icons[0].x + iconSize + 0.05, y: hy + iconSize / 2,
    w: 0.7, h: 0,
    line: { color: ACCENT, width: 1, dashType: "dash", endArrowType: "triangle" },
  });

  // Rent = coin stack (cylinder approx) — use oval + rectangle
  const rx = icons[1].x;
  s.addShape(pres.shapes.OVAL, {
    x: rx + 0.05, y: hy + 0.25, w: 0.5, h: 0.14,
    fill: { color: BG }, line: { color: ACCENT, width: 1.25 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: rx + 0.05, y: hy + 0.32, w: 0.5, h: 0.28,
    fill: { color: BG }, line: { color: ACCENT, width: 1.25 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: rx + 0.05, y: hy + 0.54, w: 0.5, h: 0.14,
    fill: { color: BG }, line: { color: ACCENT, width: 1.25 },
  });

  // Borrow = bank / pillars
  const bx = icons[2].x;
  // roof triangle -> horizontal line + two sloped lines
  addLine(s, {
    x: bx + 0.03, y: hy + 0.20, w: 0.56, h: 0,
    line: { color: SAGE, width: 1.25 },
  });
  addLine(s, {
    x: bx + 0.03, y: hy + 0.20, w: 0.28, h: -0.16,
    line: { color: SAGE, width: 1.25 },
  });
  addLine(s, {
    x: bx + 0.31, y: hy + 0.04, w: 0.28, h: 0.16,
    line: { color: SAGE, width: 1.25 },
  });
  // columns
  for (let i = 0; i < 3; i++) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: bx + 0.08 + i * 0.18, y: hy + 0.22, w: 0.06, h: 0.36,
      fill: { color: SAGE }, line: { color: SAGE, width: 0 },
    });
  }
  // base
  addLine(s, {
    x: bx + 0.03, y: hy + 0.60, w: 0.56, h: 0,
    line: { color: SAGE, width: 1.5 },
  });

  // Inherit = key: ring + shaft
  const kx = icons[3].x;
  s.addShape(pres.shapes.OVAL, {
    x: kx + 0.03, y: hy + 0.22, w: 0.22, h: 0.22,
    fill: { color: BG }, line: { color: CREAM, width: 1.25 },
  });
  addLine(s, {
    x: kx + 0.25, y: hy + 0.33, w: 0.35, h: 0,
    line: { color: CREAM, width: 1.25 },
  });
  // teeth
  addLine(s, {
    x: kx + 0.50, y: hy + 0.33, w: 0, h: 0.09,
    line: { color: CREAM, width: 1.25 },
  });
  addLine(s, {
    x: kx + 0.58, y: hy + 0.33, w: 0, h: 0.12,
    line: { color: CREAM, width: 1.25 },
  });

  // icon labels
  icons.forEach(i => {
    s.addText(i.label, {
      x: i.x - 0.2, y: iconY + iconSize + 0.12, w: 1.0, h: 0.3,
      fontFace: B_FONT, fontSize: 9, color: CREAM_MUTED,
      align: "center", charSpacing: 4, margin: 0,
    });
  });

  // ------- Right column: three stats -------
  const statX = 7.5, statW = SLIDE_W - MARGIN - statX;

  function addStat(y, value, valueColor, body) {
    s.addText(value, {
      x: statX, y, w: statW, h: 0.95,
      fontFace: H_FONT, fontSize: 60, color: valueColor,
      italic: valueColor === ACCENT, margin: 0, valign: "top",
    });
    s.addText(body, {
      x: statX, y: y + 1.0, w: statW, h: 0.75,
      fontFace: B_FONT, fontSize: 14, color: CREAM, margin: 0, valign: "top",
    });
  }
  addStat(1.7, "$380T", ACCENT,
    "Estimated global value of real estate — larger than all stocks and bonds combined.");
  // divider
  addLine(s, { x: statX, y: 3.55, w: statW, h: 0,
    line: { color: DIVIDER, width: 0.75 } });
  addStat(3.7, "65%", CREAM,
    "Share of U.S. household wealth held as home equity for the median family.");
  addLine(s, { x: statX, y: 5.55, w: statW, h: 0,
    line: { color: DIVIDER, width: 0.75 } });
  addStat(5.7, "4×", CREAM,
    "Typical leverage on a residential purchase — $50k down controls a $250k asset.");
}

// ======================================================================
// SLIDE 3 — FOUR WAYS IN (2×2 grid)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, 3);
  addSectionLabel(s, "§ 02 · FOUR WAYS IN");

  // Grid dimensions
  const gridX = MARGIN, gridY = 1.85;
  const gridW = SLIDE_W - 2 * MARGIN;
  const gridH = SLIDE_H - gridY - 0.6;
  const colW = gridW / 2;
  const rowH = gridH / 2;

  // Outer rectangle border
  s.addShape(pres.shapes.RECTANGLE, {
    x: gridX, y: gridY, w: gridW, h: gridH,
    fill: { color: BG, transparency: 100 },
    line: { color: DIVIDER, width: 0.75 },
  });
  // horizontal divider
  addLine(s, {
    x: gridX, y: gridY + rowH, w: gridW, h: 0,
    line: { color: DIVIDER, width: 0.75 },
  });
  // vertical divider
  addLine(s, {
    x: gridX + colW, y: gridY, w: 0, h: gridH,
    line: { color: DIVIDER, width: 0.75 },
  });

  const cells = [
    { row: 0, col: 0, num: "01", kind: "DIRECT",  title: "Rentals",
      body: "Buy a property. Collect rent. Build equity as the mortgage pays down.",
      tags: "HANDS-ON · HIGHEST CONTROL",  icon: "house" },
    { row: 0, col: 1, num: "02", kind: "PUBLIC",  title: "REITs",
      body: "Buy shares of a company that owns real estate. Trades like a stock, pays dividends.",
      tags: "LIQUID · START WITH $100",    icon: "chart" },
    { row: 1, col: 0, num: "03", kind: "POOLED",  title: "Syndications",
      body: "Join with other investors to buy large deals — apartments, warehouses, hotels.",
      tags: "PASSIVE · ACCREDITED ONLY",   icon: "nodes" },
    { row: 1, col: 1, num: "04", kind: "ACTIVE",  title: "Flips",
      body: "Buy undervalued. Renovate. Sell for a gain. Short timelines, thin margins.",
      tags: "OPERATIONAL · HIGHEST VARIANCE", icon: "triangle" },
  ];

  cells.forEach(c => {
    const cx = gridX + c.col * colW;
    const cy = gridY + c.row * rowH;
    const pad = 0.5;

    // Eyebrow: "01 · DIRECT"
    s.addText(`${c.num}  ·  ${c.kind}`, {
      x: cx + pad, y: cy + pad, w: colW - pad * 2, h: 0.35,
      fontFace: B_FONT, fontSize: 11, color: CREAM_MUTED,
      charSpacing: 5, margin: 0, valign: "middle",
    });
    // Title
    s.addText(c.title, {
      x: cx + pad, y: cy + pad + 0.35, w: colW - pad * 2 - 1.2, h: 0.7,
      fontFace: H_FONT, fontSize: 34, color: CREAM, margin: 0, valign: "middle",
    });
    // Body
    s.addText(c.body, {
      x: cx + pad, y: cy + pad + 1.15, w: colW - pad * 2 - 1.2, h: 0.7,
      fontFace: B_FONT, fontSize: 13, color: CREAM, margin: 0, valign: "top",
    });
    // Bottom tags — anchor to bottom of cell
    s.addText(c.tags, {
      x: cx + pad, y: cy + rowH - 0.60, w: colW - pad * 2, h: 0.45,
      fontFace: B_FONT, fontSize: 11, color: ACCENT,
      charSpacing: 4, margin: 0, valign: "bottom",
    });

    // -------- Icon (top right of cell) --------
    const ix = cx + colW - pad - 0.95;
    const iy = cy + pad + 0.1;
    const isz = 0.95;
    if (c.icon === "house") {
      // roof triangle via two lines + horizontal
      addLine(s, {
        x: ix, y: iy + 0.35, w: isz, h: 0,
        line: { color: CREAM, width: 1.5 },
      });
      addLine(s, {
        x: ix, y: iy + 0.35, w: isz / 2, h: -0.30,
        line: { color: CREAM, width: 1.5 },
      });
      addLine(s, {
        x: ix + isz / 2, y: iy + 0.05, w: isz / 2, h: 0.30,
        line: { color: CREAM, width: 1.5 },
      });
      // walls
      s.addShape(pres.shapes.RECTANGLE, {
        x: ix + 0.02, y: iy + 0.35, w: isz - 0.04, h: isz - 0.4,
        fill: { color: BG, transparency: 100 }, line: { color: CREAM, width: 1.5 },
      });
      // windows
      s.addShape(pres.shapes.RECTANGLE, {
        x: ix + 0.13, y: iy + 0.5, w: 0.14, h: 0.14,
        fill: { color: BG, transparency: 100 }, line: { color: CREAM, width: 1 },
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: ix + isz - 0.27, y: iy + 0.5, w: 0.14, h: 0.14,
        fill: { color: BG, transparency: 100 }, line: { color: CREAM, width: 1 },
      });
      // door
      s.addShape(pres.shapes.RECTANGLE, {
        x: ix + isz / 2 - 0.08, y: iy + 0.75, w: 0.16, h: isz - 0.8,
        fill: { color: ACCENT }, line: { color: ACCENT, width: 0 },
      });
    } else if (c.icon === "chart") {
      // Outlined rectangle + mini bars
      s.addShape(pres.shapes.RECTANGLE, {
        x: ix, y: iy + 0.1, w: isz, h: isz - 0.2,
        fill: { color: BG, transparency: 100 }, line: { color: CREAM, width: 1.5 },
      });
      // bars
      const bars = [
        { h: 0.25, color: ACCENT },
        { h: 0.45, color: CREAM },
        { h: 0.32, color: SAGE },
        { h: 0.50, color: ACCENT },
      ];
      const barBaseY = iy + isz - 0.15;
      const barW = 0.09;
      const startBx = ix + 0.16;
      bars.forEach((b, i) => {
        s.addShape(pres.shapes.RECTANGLE, {
          x: startBx + i * (barW + 0.08),
          y: barBaseY - b.h,
          w: barW, h: b.h,
          fill: { color: b.color }, line: { color: b.color, width: 0 },
        });
      });
    } else if (c.icon === "nodes") {
      // circle + three connecting nodes
      s.addShape(pres.shapes.OVAL, {
        x: ix, y: iy, w: isz, h: isz,
        fill: { color: BG, transparency: 100 }, line: { color: CREAM, width: 1.5 },
      });
      // central node (orange)
      const cxn = ix + isz / 2, cyn = iy + isz / 2;
      s.addShape(pres.shapes.OVAL, {
        x: cxn - 0.08, y: cyn + 0.10, w: 0.16, h: 0.16,
        fill: { color: ACCENT }, line: { color: ACCENT, width: 0 },
      });
      // top-left and top-right nodes
      s.addShape(pres.shapes.OVAL, {
        x: cxn - 0.30, y: cyn - 0.22, w: 0.13, h: 0.13,
        fill: { color: BG, transparency: 100 }, line: { color: CREAM, width: 1.25 },
      });
      s.addShape(pres.shapes.OVAL, {
        x: cxn + 0.17, y: cyn - 0.22, w: 0.13, h: 0.13,
        fill: { color: BG, transparency: 100 }, line: { color: CREAM, width: 1.25 },
      });
      // connecting lines
      addLine(s, {
        x: cxn - 0.24, y: cyn - 0.15, w: 0.25, h: 0.28,
        line: { color: CREAM, width: 1 },
      });
      addLine(s, {
        x: cxn, y: cyn + 0.13, w: 0.24, h: -0.28,
        line: { color: CREAM, width: 1 },
      });
    } else if (c.icon === "triangle") {
      // warning/roof triangle
      addLine(s, {
        x: ix, y: iy + isz - 0.1, w: isz, h: 0,
        line: { color: CREAM, width: 1.5 },
      });
      addLine(s, {
        x: ix, y: iy + isz - 0.1, w: isz / 2, h: -(isz - 0.15),
        line: { color: CREAM, width: 1.5 },
      });
      addLine(s, {
        x: ix + isz / 2, y: iy + 0.05, w: isz / 2, h: isz - 0.15,
        line: { color: CREAM, width: 1.5 },
      });
      // inner little rectangle (house-ish detail)
      s.addShape(pres.shapes.RECTANGLE, {
        x: ix + isz / 2 - 0.11, y: iy + isz - 0.35, w: 0.22, h: 0.25,
        fill: { color: ACCENT }, line: { color: ACCENT, width: 0 },
      });
    }
  });
}

// ======================================================================
// SLIDE 4 — THE RENTAL PATH (cash flow table + big house)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, 4);
  addSectionLabel(s, "§ 03 · THE RENTAL PATH");

  // Big editorial headline
  s.addText(
    [
      { text: "A single door,", options: { color: CREAM, breakLine: true } },
      { text: "monthly.",       options: { color: ACCENT, italic: true } },
    ],
    {
      x: MARGIN, y: 1.95, w: 6.5, h: 2.0,
      fontFace: H_FONT, fontSize: 50, margin: 0, valign: "top",
    }
  );

  // Cash-flow "ledger"
  const tableX = MARGIN, tableY = 4.0, tableW = 5.5;
  const rows = [
    { label: "Rent collected",          value: "$2,400",  bold: false, color: CREAM, labelColor: CREAM },
    { label: "— Mortgage (P&I)",        value: "$1,350",  bold: false, color: CREAM_DIM, labelColor: CREAM_DIM },
    { label: "— Taxes & insurance",     value: "$380",    bold: false, color: CREAM_DIM, labelColor: CREAM_DIM },
    { label: "— Maintenance & vacancy", value: "$270",    bold: false, color: CREAM_DIM, labelColor: CREAM_DIM },
    { label: "Net monthly cash",        value: "$400",    bold: true,  color: ACCENT, labelColor: CREAM, big: true },
  ];
  const rowHeight = 0.6;
  rows.forEach((r, i) => {
    const y = tableY + i * rowHeight;
    s.addText(r.label, {
      x: tableX, y, w: tableW * 0.55, h: rowHeight,
      fontFace: B_FONT, fontSize: r.big ? 18 : 15,
      color: r.labelColor, bold: r.bold, margin: 0, valign: "middle",
    });
    s.addText(r.value, {
      x: tableX + tableW * 0.55, y, w: tableW * 0.45, h: rowHeight,
      fontFace: H_FONT, fontSize: r.big ? 30 : 20,
      color: r.color, bold: false, italic: false,
      align: "right", margin: 0, valign: "middle",
    });
    // divider under each row
    addLine(s, {
      x: tableX, y: y + rowHeight - 0.02, w: tableW, h: 0,
      line: { color: DIVIDER, width: 0.75 },
    });
  });

  // ------- Right side: simple house illustration -------
  // Composition (top→bottom):
  //   roof triangle (wider than walls — overhangs both sides)
  //   chimney sits ON the right slope, drawn BEFORE the roof so the
  //     roof overlaps its bottom and it appears to rise out of the slope
  //   walls: cream outline, no fill, narrower than roof
  //   windows (sage fill, cream mullions), centered door, ground line
  const hx = 9.0, hy = 3.1;
  const hw = 2.8;                    // overall house bounding width
  const wallW = hw - 0.6;            // walls narrower than roof for overhang
  const wallX = hx + (hw - wallW)/2; // center walls under roof
  const wallTop = hy + 1.1;          // where walls begin = roof base
  const wallH = 1.6;

  // "+$400" label with down arrow pointing at roof apex
  s.addText("+$400", {
    x: hx + hw / 2 - 0.9, y: hy - 0.85, w: 1.8, h: 0.6,
    fontFace: H_FONT, fontSize: 28, italic: true, color: ACCENT,
    align: "center", margin: 0, valign: "middle",
  });
  addLine(s, {
    x: hx + hw / 2, y: hy - 0.22, w: 0, h: 0.35,
    line: { color: ACCENT, width: 1.25, endArrowType: "triangle" },
  });

  // Walls FIRST — cream outline, transparent fill, narrower than roof.
  // Drawn before the roof so the roof can overlap the wall top.
  s.addShape(pres.shapes.RECTANGLE, {
    x: wallX, y: wallTop, w: wallW, h: wallH,
    fill: { color: BG, transparency: 100 },
    line: { color: CREAM, width: 1.5 },
  });

  // Chimney — drawn BEFORE the roof so the roof overlaps its base and it
  // appears to pierce through the right slope.
  const chimneyX = hx + hw - 0.85;
  const chimneyW = 0.22;
  const chimneyTop = hy + 0.15;
  const chimneyH = 0.85;
  s.addShape(pres.shapes.RECTANGLE, {
    x: chimneyX, y: chimneyTop, w: chimneyW, h: chimneyH,
    fill: { color: CREAM }, line: { color: CREAM, width: 0 },
  });

  // Roof — drawn LAST so it sits in front of both walls and chimney base.
  // Overlap the wall top by a hair so there's no visible seam.
  s.addShape(pres.shapes.ISOSCELES_TRIANGLE, {
    x: hx, y: hy, w: hw, h: 1.2,
    fill: { color: ACCENT }, line: { color: ACCENT, width: 0 },
  });

  // --- Windows: left and right ---
  const winW = 0.4, winH = 0.5;
  const winY = wallTop + 0.18;
  const winLX = wallX + 0.18;
  const winRX = wallX + wallW - 0.18 - winW;
  [winLX, winRX].forEach(wx => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: wx, y: winY, w: winW, h: winH,
      fill: { color: SAGE, transparency: 55 }, line: { color: CREAM, width: 1.2 },
    });
    // mullions (cross)
    addLine(s, {
      x: wx + winW / 2, y: winY, w: 0, h: winH,
      line: { color: CREAM, width: 1 },
    });
    addLine(s, {
      x: wx, y: winY + winH / 2, w: winW, h: 0,
      line: { color: CREAM, width: 1 },
    });
  });

  // Door — centered, starting from mid-wall down to ground
  const doorW = 0.35;
  const doorH = 0.85;
  const doorX = wallX + (wallW - doorW) / 2;
  const doorY = wallTop + wallH - doorH;
  s.addShape(pres.shapes.RECTANGLE, {
    x: doorX, y: doorY, w: doorW, h: doorH,
    fill: { color: CREAM }, line: { color: CREAM, width: 0 },
  });
  // doorknob
  s.addShape(pres.shapes.OVAL, {
    x: doorX + doorW - 0.09, y: doorY + doorH / 2, w: 0.05, h: 0.05,
    fill: { color: ACCENT_DEEP }, line: { color: ACCENT_DEEP, width: 0 },
  });

  // Ground line — extends beyond the house on both sides
  addLine(s, {
    x: hx - 0.15, y: wallTop + wallH, w: hw + 0.3, h: 0,
    line: { color: CREAM, width: 1.2 },
  });
}

// ======================================================================
// SLIDE 5 — REITS, EXPLAINED (text left + doughnut right)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, 5);
  addSectionLabel(s, "§ 04 · REITS, EXPLAINED");

  // Headline
  s.addText(
    [
      { text: "Buildings, bought by the", options: { color: CREAM, breakLine: true } },
      { text: "share.",                    options: { color: ACCENT, italic: true } },
    ],
    {
      x: MARGIN, y: 2.6, w: 6.5, h: 1.7,
      fontFace: H_FONT, fontSize: 40, margin: 0, valign: "top",
    }
  );

  // Body paragraph
  s.addText(
    [
      { text: "Public REITs hold apartments, warehouses, data centers and malls — and by law must pay out ",
        options: { color: CREAM } },
      { text: "90% of income", options: { color: CREAM, bold: true } },
      { text: " as dividends.", options: { color: CREAM } },
    ],
    {
      x: MARGIN, y: 4.45, w: 6.0, h: 1.1,
      fontFace: B_FONT, fontSize: 15, margin: 0, valign: "top",
    }
  );

  s.addText("Same brokerage, same click as buying any stock.", {
    x: MARGIN, y: 5.55, w: 6.0, h: 0.4,
    fontFace: B_FONT, fontSize: 14, color: CREAM_DIM, margin: 0, valign: "top", italic: false,
  });

  // Doughnut chart — native pptxgenjs DOUGHNUT
  s.addChart(
    pres.charts.DOUGHNUT,
    [{
      name: "Sector mix",
      labels: ["Residential · 30%", "Industrial · 22%", "Retail · 18%", "Office · 14%", "Other · 16%"],
      values: [30, 22, 18, 14, 16],
    }],
    {
      x: 7.3, y: 1.9, w: 5.4, h: 4.5,
      chartArea: { fill: { color: BG }, border: { color: BG, pt: 0 } },
      plotArea:  { fill: { color: BG } },

      chartColors: [ACCENT, SAGE, CREAM, ACCENT_DEEP, SAGE_DEEP],
      holeSize: 60,
      firstSliceAng: 0,

      showLegend: true,
      legendPos: "r",
      legendFontFace: B_FONT,
      legendFontSize: 14,
      legendColor: CREAM,

      showPercent: false,
      showValue: false,
    }
  );

  // "Sector mix" italic label in the hole (overlay text)
  s.addText("Sector mix", {
    x: 7.5, y: 3.8, w: 3.2, h: 0.5,
    fontFace: H_FONT, fontSize: 16, italic: true, color: CREAM,
    align: "center", margin: 0, valign: "middle",
  });
}

// ======================================================================
// SLIDE 6 — LEVERAGE (horizontal bars)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, 6);
  addSectionLabel(s, "§ 05 · LEVERAGE");

  // Headline
  s.addText(
    [
      { text: "Put down ",         options: { color: CREAM } },
      { text: "20%.",              options: { color: ACCENT, italic: true } },
      { text: " Own the whole thing.", options: { color: CREAM } },
    ],
    {
      x: MARGIN, y: 1.9, w: SLIDE_W - 2 * MARGIN, h: 1.3,
      fontFace: H_FONT, fontSize: 44, margin: 0, valign: "top",
    }
  );

  // Bars layout
  const labelX   = MARGIN;
  const labelW   = 2.1;
  const barX     = labelX + labelW + 0.3;
  const barMaxW  = 7.8;     // total available for "100%"
  const pctX     = barX + barMaxW + 0.3;
  const pctW     = 1.4;

  const bars = [
    { topLabel: "Your cash",     subLabel: "DOWN PAYMENT",
      inside: "$50,000",         pct: "20%",  pctColor: CREAM,
      widthFrac: 0.20, fill: SAGE,          trackFill: true, y: 3.8 },
    { topLabel: "The bank's",    subLabel: "MORTGAGE",
      inside: "$250,000 · full property", pct: "100%", pctColor: CREAM,
      widthFrac: 1.00, fill: ACCENT,         trackFill: false, y: 4.75 },
    { topLabel: "Property up 5%", subLabel: "YOUR RETURN",
      inside: "$12,500 gain",    pct: "25%", pctColor: ACCENT,
      widthFrac: 0.05, fill: ACCENT,         trackFill: true,  y: 5.70 },
  ];

  bars.forEach(b => {
    // Left labels
    s.addText(b.topLabel, {
      x: labelX, y: b.y - 0.05, w: labelW, h: 0.4,
      fontFace: H_FONT, fontSize: 18, color: CREAM, margin: 0, valign: "middle",
    });
    s.addText(b.subLabel, {
      x: labelX, y: b.y + 0.32, w: labelW, h: 0.3,
      fontFace: B_FONT, fontSize: 10, color: CREAM_MUTED,
      charSpacing: 3, margin: 0, valign: "middle",
    });

    // Track (only for the 20% bar — rest just show single fill)
    if (b.trackFill) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: barX, y: b.y, w: barMaxW, h: 0.55,
        fill: { color: DIVIDER }, line: { color: DIVIDER, width: 0 },
      });
    }

    // Filled bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: barX, y: b.y, w: barMaxW * b.widthFrac, h: 0.55,
      fill: { color: b.fill }, line: { color: b.fill, width: 0 },
    });

    // Inside/outside label. If the bar is wide enough for the text, place it
    // inside in cream; otherwise place it just to the right of the bar's end.
    const barActualW = barMaxW * b.widthFrac;
    const MIN_INSIDE_W = 1.5;   // minimum bar width to comfortably hold a label
    if (barActualW >= MIN_INSIDE_W) {
      s.addText(b.inside, {
        x: barX + 0.15, y: b.y, w: barActualW - 0.2, h: 0.55,
        fontFace: B_FONT, fontSize: 12, color: CREAM, margin: 0, valign: "middle",
      });
    } else {
      s.addText(b.inside, {
        x: barX + barActualW + 0.15, y: b.y, w: 2.5, h: 0.55,
        fontFace: B_FONT, fontSize: 12, color: CREAM, margin: 0, valign: "middle",
      });
    }

    // Right % label
    s.addText(b.pct, {
      x: pctX, y: b.y - 0.05, w: pctW, h: 0.65,
      fontFace: H_FONT, fontSize: 26, color: b.pctColor,
      italic: b.pct === "25%", align: "right", margin: 0, valign: "middle",
    });
  });

  // Footer disclaimer
  s.addText("FIGURES ILLUSTRATIVE  ·  TAXES, INTEREST AND FEES NOT SHOWN", {
    x: MARGIN, y: 6.8, w: SLIDE_W - 2 * MARGIN, h: 0.35,
    fontFace: B_FONT, fontSize: 11, color: CREAM_MUTED,
    charSpacing: 5, margin: 0, valign: "middle",
  });
}

// ======================================================================
// SLIDE 7 — THE FOUR RETURNS (text + bars)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, 7);
  addSectionLabel(s, "§ 06 · THE FOUR RETURNS");

  // Left column: editorial headline + body
  s.addText(
    [
      { text: "Four streams. ", options: { color: CREAM } },
      { text: "One property.",  options: { color: ACCENT, italic: true } },
    ],
    {
      x: MARGIN, y: 3.0, w: 6.0, h: 1.7,
      fontFace: H_FONT, fontSize: 42, margin: 0, valign: "top",
    }
  );

  s.addText(
    "Most asset classes pay you one way. Real estate typically pays in four — simultaneously.",
    {
      x: MARGIN, y: 4.7, w: 5.5, h: 0.9,
      fontFace: B_FONT, fontSize: 14, color: CREAM, margin: 0, valign: "top",
    }
  );

  // Right column: four progress bars
  const rBarX      = 7.3;
  const rBarMaxW   = SLIDE_W - MARGIN - rBarX - 0.8;
  const rBarTrackH = 0.18;
  const pctRightW  = 0.8;
  const maxPct     = 6; // scale to the biggest (6%) so 6% fills the track

  const items = [
    { name: "Cash flow",        pct: 6, color: ACCENT },
    { name: "Appreciation",     pct: 4, color: SAGE },
    { name: "Principal paydown",pct: 3, color: CREAM },
    { name: "Tax benefits",     pct: 2, color: ACCENT },
  ];
  items.forEach((it, i) => {
    const y = 2.3 + i * 1.15;
    // Label
    s.addText(it.name, {
      x: rBarX, y, w: rBarMaxW - 1.2, h: 0.5,
      fontFace: H_FONT, fontSize: 20, color: CREAM, margin: 0, valign: "middle",
    });
    // Pct text, right
    s.addText(`≈ ${it.pct}%`, {
      x: rBarX + rBarMaxW - pctRightW, y, w: pctRightW + 0.5, h: 0.5,
      fontFace: B_FONT, fontSize: 13, color: CREAM_DIM,
      align: "right", margin: 0, valign: "middle",
    });
    // Track
    s.addShape(pres.shapes.RECTANGLE, {
      x: rBarX, y: y + 0.55, w: rBarMaxW + 0.5, h: rBarTrackH,
      fill: { color: DIVIDER }, line: { color: DIVIDER, width: 0 },
    });
    // Fill
    s.addShape(pres.shapes.RECTANGLE, {
      x: rBarX, y: y + 0.55, w: (rBarMaxW + 0.5) * (it.pct / maxPct), h: rBarTrackH,
      fill: { color: it.color }, line: { color: it.color, width: 0 },
    });
  });

  // Footer disclaimer
  s.addText("ILLUSTRATIVE LONG-RUN AVERAGES  ·  LEVERAGED SINGLE-FAMILY RENTAL", {
    x: rBarX, y: 6.85, w: SLIDE_W - rBarX - MARGIN, h: 0.35,
    fontFace: B_FONT, fontSize: 11, color: CREAM_MUTED,
    charSpacing: 5, margin: 0, valign: "middle",
  });
}

// ======================================================================
// SLIDE 8 — WHAT CAN GO WRONG (4 roman-numeral items in 2x2 grid)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, 8);
  addSectionLabel(s, "§ 07 · WHAT CAN GO WRONG");

  // Headline
  s.addText(
    [
      { text: "Returns aren't ", options: { color: CREAM } },
      { text: "free.",           options: { color: ACCENT, italic: true } },
    ],
    {
      x: MARGIN, y: 1.9, w: SLIDE_W - 2 * MARGIN, h: 1.2,
      fontFace: H_FONT, fontSize: 44, margin: 0, valign: "top",
    }
  );

  const items = [
    { rn: "i.",   title: "Illiquidity",
      body: "Selling a house takes months, not milliseconds. Your money is in drywall, not a brokerage account." },
    { rn: "ii.",  title: "Leverage cuts both ways",
      body: "A 20% drop in price erases 100% of a 20% down payment. The math works in reverse, too." },
    { rn: "iii.", title: "Tenants & toilets",
      body: "Property management is operational work. Vacancy, repairs, and late rent are part of the deal." },
    { rn: "iv.",  title: "Concentration",
      body: "One property, one city, one employer. Diversification is hard when each asset is six figures." },
  ];
  const gridY = 4.0, gridH = 2.6;
  const colW  = (SLIDE_W - 2 * MARGIN) / 2;
  items.forEach((it, i) => {
    const r = Math.floor(i / 2), c = i % 2;
    const cx = MARGIN + c * colW;
    const cy = gridY + r * (gridH / 2 + 0.3);

    // Roman numeral (italic, accent)
    s.addText(it.rn, {
      x: cx, y: cy, w: 0.9, h: 0.45,
      fontFace: H_FONT, fontSize: 26, italic: true, color: ACCENT,
      margin: 0, valign: "top",
    });
    // Title
    s.addText(it.title, {
      x: cx + 0.9, y: cy, w: colW - 1.2, h: 0.45,
      fontFace: H_FONT, fontSize: 22, color: CREAM, margin: 0, valign: "top",
    });
    // Body
    s.addText(it.body, {
      x: cx + 0.9, y: cy + 0.55, w: colW - 1.2, h: 1.0,
      fontFace: B_FONT, fontSize: 13, color: CREAM, margin: 0, valign: "top",
    });
  });
}

// ======================================================================
// SLIDE 9 — STARTER PLAYBOOK (timeline of 4 steps)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, 9);
  addSectionLabel(s, "§ 08 · A STARTER PLAYBOOK");

  // Headline
  s.addText(
    [
      { text: "From ",   options: { color: CREAM } },
      { text: "curious", options: { color: ACCENT, italic: true } },
      { text: " to ",    options: { color: CREAM } },
      { text: "closed.", options: { color: ACCENT, italic: true } },
    ],
    {
      x: MARGIN, y: 1.9, w: SLIDE_W - 2 * MARGIN, h: 0.9,
      fontFace: H_FONT, fontSize: 40, margin: 0, valign: "top",
    }
  );

  // Timeline
  const timelineY = 3.3;
  const steps = [
    { eye: "STEP 01 · WEEK 1",  title: "Learn the language",
      body: "Cap rate. Cash-on-cash. NOI. Twenty terms open every door.",
      tag:  "READ · LISTEN" },
    { eye: "STEP 02 · MONTH 1", title: "Start with a REIT",
      body: "Put $500 into a broad REIT index. Watch the dividends arrive.",
      tag:  "$500 · LIQUID" },
    { eye: "STEP 03 · MONTH 3", title: "Underwrite ten deals",
      body: "On paper only. Build a spreadsheet. Reject nine of them.",
      tag:  "RESEARCH" },
    { eye: "STEP 04 · YEAR 1",  title: "Buy one door",
      body: "House-hack a duplex. Live in one side. Rent the other.",
      tag:  "FIRST CLOSE" },
  ];

  const stepCount = steps.length;
  const stepsX = MARGIN;
  const stepsW = SLIDE_W - 2 * MARGIN;
  const stepW  = stepsW / stepCount;
  const padX   = 0.35;

  // Horizontal timeline line
  const nodeR = 0.18;
  const lineY = timelineY + nodeR;
  addLine(s, {
    x: stepsX + stepW / 2, y: lineY, w: stepsW - stepW, h: 0,
    line: { color: ACCENT, width: 0.75 },
  });

  steps.forEach((st, i) => {
    const sx = stepsX + i * stepW;
    const nodeCx = sx + stepW / 2;

    // Dot
    s.addShape(pres.shapes.OVAL, {
      x: nodeCx - nodeR, y: lineY - nodeR, w: nodeR * 2, h: nodeR * 2,
      fill: { color: ACCENT }, line: { color: ACCENT, width: 0 },
    });

    // Vertical divider between columns (skip first)
    if (i > 0) {
      addLine(s, {
        x: sx, y: timelineY + 0.6, w: 0, h: 3.3,
        line: { color: DIVIDER, width: 0.75 },
      });
    }

    // Eyebrow
    s.addText(st.eye, {
      x: sx + padX, y: timelineY + 0.85, w: stepW - 2 * padX, h: 0.35,
      fontFace: B_FONT, fontSize: 11, color: CREAM_MUTED,
      charSpacing: 3, margin: 0, valign: "top",
    });
    // Title
    s.addText(st.title, {
      x: sx + padX, y: timelineY + 1.20, w: stepW - 2 * padX, h: 1.0,
      fontFace: H_FONT, fontSize: 22, color: CREAM, margin: 0, valign: "top",
    });
    // Body
    s.addText(st.body, {
      x: sx + padX, y: timelineY + 2.20, w: stepW - 2 * padX, h: 1.5,
      fontFace: B_FONT, fontSize: 13, color: CREAM, margin: 0, valign: "top",
    });
    // Tag at bottom
    s.addText(st.tag, {
      x: sx + padX, y: SLIDE_H - 1.1, w: stepW - 2 * padX, h: 0.35,
      fontFace: B_FONT, fontSize: 11, color: CREAM_MUTED,
      charSpacing: 5, margin: 0, valign: "middle",
    });
  });
}

// ======================================================================
// SLIDE 10 — END OF CHAPTER (sunset skyline, quote below)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };    // bottom half is BG
  addHeader(s, 10);

  // Top half: sunset. Rendered as a single high-res PNG gradient (stacked
  // rectangles produced visible banding in PowerPoint).
  const skyH = 3.5;
  const skyDataUri = await makeVerticalGradientDataUri(BG_SUNSET_TOP, "3A2F28", 1600, 700);
  s.addImage({
    data: skyDataUri,
    x: 0, y: 0, w: SLIDE_W, h: skyH,
  });

  // Sun (cream circle, upper right)
  s.addShape(pres.shapes.OVAL, {
    x: SLIDE_W - 3.2, y: 0.9, w: 1.0, h: 1.0,
    fill: { color: "E9D8B0" }, line: { color: "E9D8B0", width: 0 },
  });

  // Foreground dark skyline silhouette
  const silY = 2.4;
  const bldgs = [
    [0.5, 0.8, 0.9], [1.4, 0.5, 0.5], [2.0, 0.7, 0.8], [2.8, 0.4, 0.4],
    [3.3, 0.9, 1.0], [4.3, 0.6, 0.6], [5.0, 0.8, 0.9], [6.0, 0.7, 0.85],
    [6.8, 0.5, 0.6], [7.5, 0.9, 1.0], [8.5, 0.4, 0.5], [9.0, 0.7, 0.8],
    [9.8, 0.8, 0.9], [10.7, 0.5, 0.5], [11.3, 0.4, 0.4], [11.8, 0.9, 1.0],
    [12.8, 0.4, 0.5],
  ];
  bldgs.forEach(([x, w, h]) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: silY + (1.1 - h), w, h: h + 0.2,
      fill: { color: BG }, line: { color: BG, width: 0 },
    });
  });
  // ground fill (extend BG over the rest)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 3.5, w: SLIDE_W, h: SLIDE_H - 3.5,
    fill: { color: BG }, line: { color: BG, width: 0 },
  });

  // Section eyebrow
  s.addText("§ 09 · END OF CHAPTER ONE", {
    x: MARGIN, y: 4.25, w: 8, h: 0.4,
    fontFace: B_FONT, fontSize: 12, color: CREAM_MUTED,
    charSpacing: 6, margin: 0, valign: "middle",
  });

  // Big quote
  s.addText(
    [
      { text: "The best time was ", options: { color: CREAM, bold: true } },
      { text: "ten years ago.",     options: { color: ACCENT, bold: true, italic: true } },
      { text: " The second best is ",options:{ color: CREAM, bold: true } },
      { text: "now.",               options: { color: ACCENT, bold: true, italic: true } },
    ],
    {
      x: MARGIN, y: 4.75, w: SLIDE_W - 2 * MARGIN, h: 1.6,
      fontFace: H_FONT, fontSize: 44, margin: 0, valign: "top",
    }
  );

  // Attribution
  s.addText("— AN OLD PROVERB, ABOUT PLANTING TREES", {
    x: MARGIN, y: 6.7, w: SLIDE_W - 2 * MARGIN, h: 0.4,
    fontFace: B_FONT, fontSize: 12, color: CREAM_MUTED,
    charSpacing: 6, margin: 0, valign: "middle",
  });

  // Page num (need to add again since BG rectangles would have covered)
  // addHeader was called first, but the sunset rectangles were drawn on top.
  // Re-add the wordmark + page num above the sky at z-order top:
  s.addText(
    [
      { text: "Real Estate ", options: { color: CREAM, bold: false } },
      { text: "Investing",   options: { color: ACCENT, italic: true } },
    ],
    {
      x: MARGIN, y: 0.35, w: 6, h: 0.5,
      fontFace: B_FONT, fontSize: 16, margin: 0, valign: "middle",
    }
  );
  s.addText("10 / 10", {
    x: SLIDE_W - MARGIN - 2, y: 0.35, w: 2, h: 0.5,
    fontFace: B_FONT, fontSize: 13, color: CREAM_DIM,
    align: "right", valign: "middle", margin: 0, charSpacing: 2,
  });
}

// ----------------------------------------------------------------------
// Write file
// ----------------------------------------------------------------------
pres.writeFile({ fileName: "Real_estate_investing.pptx" })
  .then(fileName => console.log("Wrote:", fileName));
})();
