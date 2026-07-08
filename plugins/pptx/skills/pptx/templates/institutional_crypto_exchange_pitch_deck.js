/**
 * ApeX Series B Investor Deck — replica generator
 *
 * Recreates the 12-slide ApeX-_2.pptx using pptxgenjs.
 * Body and chrome fonts use Arial (a single OOXML typeface — CSS-style
 * fallback chains like "Arial, Helvetica, sans-serif" trigger PowerPoint's
 * Repair prompt because that attribute must hold a single family name).
 * Figures (small caps labels, ticker data, citations, page numbers) use Consolas.
 * Both ship with PowerPoint, so the export renders without font substitution.
 *
 * Usage:
 *   npm install pptxgenjs   # (or: npm install -g pptxgenjs)
 *   node recreate-apex.js
 *
 * Output: ApeX-_2.pptx in the working directory.
 */

const pptxgen = require("pptxgenjs");

// ---------- Theme ----------
const FONT_SANS = "Arial";
const FONT_MONO = "Consolas";

const COLOR = {
  bg:        "0B1220",  // deep navy slide background
  bgPanel:   "111A2E",  // slightly lighter card / panel
  bgPanel2:  "0F1A30",  // alt card
  border:    "1E2A44",  // panel border
  borderSoft:"1A2540",
  white:     "FFFFFF",
  text:      "E5ECF6",  // primary body
  textMute:  "8FA0BD",  // muted body
  textDim:   "5C6E8E",  // dimmer (small caps mono)
  textDimmer:"3F4F6E",
  blue:      "4F8CFF",  // primary accent (ApeX blue)
  blueSoft:  "6C9CFF",
  blueDeep:  "1F3A78",
  blueMid:   "2E4F8F",
  green:     "22C55E",
  greenDim:  "13703A",
  red:       "EF4444",
  redDim:    "5A1E20",
  amber:     "F2B650",
  pillGreenBg: "0F3A24",
  pillGreenTx: "4ADE80",
  pillRedBg:   "3A1518",
  pillRedTx:   "F87171",
  pillAmberBg: "3A2A12",
  pillAmberTx: "F2B650",
};

// ---------- Presentation ----------
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5 inches
const SW = 13.3;
const SH = 7.5;
pres.title = "ApeX — Series B Investor Presentation";
pres.author = "ApeX Markets Ltd.";

// ---------- Helpers ----------
function bg(slide) {
  slide.background = { color: COLOR.bg };
}

function footerChrome(slide, pageNum, totalPages = 12) {
  // Logo diamond
  slide.addShape(pres.shapes.DIAMOND, {
    x: 0.55, y: 7.05, w: 0.22, h: 0.22,
    fill: { type: "none" },
    line: { color: COLOR.textDim, width: 1 },
  });
  // APEX wordmark
  slide.addText("APEX", {
    x: 0.85, y: 6.97, w: 1.2, h: 0.36,
    fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim,
    charSpacing: 4, valign: "middle", margin: 0,
  });
  // Page number
  slide.addText(
    `${String(pageNum).padStart(2, "0")} / ${String(totalPages).padStart(2, "0")}`,
    {
      x: SW - 1.6, y: 6.97, w: 1.1, h: 0.36,
      fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim,
      charSpacing: 3, align: "right", valign: "middle", margin: 0,
    }
  );
}

function eyebrow(slide, text, x = 0.6, y = 0.55, w = 6, color = COLOR.blue) {
  slide.addText(text, {
    x, y, w, h: 0.32,
    fontFace: FONT_MONO, fontSize: 10, color,
    charSpacing: 4, valign: "middle", margin: 0,
  });
}

function bigTitle(slide, text, x = 0.6, y = 0.95, w = 11.5, h = 1.3) {
  slide.addText(text, {
    x, y, w, h,
    fontFace: FONT_SANS, fontSize: 32, bold: true, color: COLOR.white,
    valign: "top", margin: 0,
  });
}

function sectionLabel(slide, text, x, y, w, color = COLOR.textDim) {
  slide.addText(text, {
    x, y, w, h: 0.3,
    fontFace: FONT_MONO, fontSize: 9, color,
    charSpacing: 3, valign: "middle", margin: 0,
  });
}

function hLine(slide, x, y, w, color = COLOR.border, width = 0.75) {
  slide.addShape(pres.shapes.LINE, {
    x, y, w, h: 0,
    line: { color, width },
  });
}

// Draws a line segment from (x1,y1) to (x2,y2) using only NON-NEGATIVE width/height
// (negative cy in OOXML is invalid and triggers PowerPoint's Repair prompt).
// When the segment goes "up" (y2 < y1), we anchor at the lower y and flipV so the
// rendered direction is preserved.
function segLine(slide, x1, y1, x2, y2, lineOpts) {
  const w = Math.abs(x2 - x1);
  const h = Math.abs(y2 - y1);
  const x = Math.min(x1, x2);
  const y = Math.min(y1, y2);
  // The default LINE shape goes from top-left -> bottom-right of its bounding box.
  // If exactly one of the two axes is reversed (going up-right OR down-left),
  // we need flipV so the visible diagonal connects the correct corners.
  const needsFlipV = (x2 >= x1 && y2 < y1) || (x2 < x1 && y2 >= y1);
  slide.addShape(pres.shapes.LINE, {
    x, y, w, h,
    flipV: needsFlipV,
    line: lineOpts,
  });
}

// ============================================================
// SLIDE 1 — TITLE
// ============================================================
function slide1() {
  const s = pres.addSlide();
  bg(s);

  // Top chrome
  s.addText("APEX // CONFIDENTIAL", {
    x: 0.6, y: 0.45, w: 4, h: 0.32,
    fontFace: FONT_MONO, fontSize: 10, color: COLOR.textDim,
    charSpacing: 4, valign: "middle", margin: 0,
  });
  s.addText("SERIES B \u00B7 Q2 2026", {
    x: SW - 4.6, y: 0.45, w: 4, h: 0.32,
    fontFace: FONT_MONO, fontSize: 10, color: COLOR.textDim,
    charSpacing: 4, align: "right", valign: "middle", margin: 0,
  });

  // Eyebrow
  s.addText("INSTITUTIONAL INVESTOR PRESENTATION", {
    x: 0.6, y: 3.4, w: 8, h: 0.4,
    fontFace: FONT_MONO, fontSize: 12, color: COLOR.blue,
    charSpacing: 4, valign: "middle", margin: 0,
  });

  // Wordmark "ApeX" — split colors
  s.addText(
    [
      { text: "Ape", options: { color: COLOR.white } },
      { text: "X",   options: { color: COLOR.blue  } },
    ],
    {
      x: 0.6, y: 3.75, w: 5.5, h: 1.6,
      fontFace: FONT_SANS, fontSize: 110, bold: true,
      valign: "top", margin: 0,
    }
  );

  // Phonetic
  s.addText("/ \u02C8e\u026A.p\u025Bks /", {
    x: 4.55, y: 4.75, w: 2.5, h: 0.5,
    fontFace: FONT_MONO, fontSize: 14, color: COLOR.textDim,
    valign: "middle", margin: 0,
  });

  // Tagline
  s.addText("The institutional venue for global digital asset markets.", {
    x: 0.6, y: 5.65, w: 11, h: 0.6,
    fontFace: FONT_SANS, fontSize: 24, color: COLOR.text,
    valign: "top", margin: 0,
  });

  // Bottom chrome
  s.addShape(pres.shapes.DIAMOND, {
    x: 0.55, y: 7.05, w: 0.22, h: 0.22,
    fill: { type: "none" }, line: { color: COLOR.textDim, width: 1 },
  });
  s.addText("APEX MARKETS LTD.  \u00B7  DUBAI  \u00B7  CAYMAN", {
    x: 0.85, y: 6.97, w: 6, h: 0.36,
    fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim,
    charSpacing: 3, valign: "middle", margin: 0,
  });
  s.addText("STRICTLY PRIVATE & CONFIDENTIAL", {
    x: SW - 5.6, y: 6.97, w: 5, h: 0.36,
    fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim,
    charSpacing: 3, align: "right", valign: "middle", margin: 0,
  });
}

// ============================================================
// SLIDE 2 — THE PROBLEM
// ============================================================
function slide2() {
  const s = pres.addSlide();
  bg(s);

  eyebrow(s, "THE PROBLEM");
  bigTitle(
    s,
    "Institutional flow is migrating on-chain \u2014 but existing venues weren't built to receive it."
  );

  // Three stat columns
  const cols = [
    {
      stat: "68%",
      desc: "of asset managers cite venue risk as their #1 blocker",
      src:  "Coalition Greenwich, Q4 2025",
    },
    {
      stat: "$172B",
      desc: "of customer assets lost on retail-built exchanges since 2019",
      src:  "FTX, Celsius, Voyager, BlockFi, Mt. Gox",
    },
    {
      stat: "12bps",
      desc: "average slippage on $25M block trades \u2014 8\u00D7 equities",
      src:  "Internal benchmarking, top-5 venues",
    },
  ];

  const colW = 3.85;
  const gap  = 0.25;
  const startX = 0.6;
  const topY = 3.25;

  cols.forEach((c, i) => {
    const x = startX + i * (colW + gap);
    // Top divider
    s.addShape(pres.shapes.LINE, {
      x, y: topY, w: colW, h: 0,
      line: { color: COLOR.border, width: 0.75 },
    });
    // Stat
    s.addText(c.stat, {
      x, y: topY + 0.25, w: colW, h: 1.1,
      fontFace: FONT_SANS, fontSize: 64, color: COLOR.blueSoft, bold: false,
      valign: "top", margin: 0,
    });
    // Description
    s.addText(c.desc, {
      x, y: topY + 1.45, w: colW, h: 0.85,
      fontFace: FONT_SANS, fontSize: 14, color: COLOR.text,
      valign: "top", margin: 0,
    });
    // Source
    s.addText(c.src, {
      x, y: topY + 2.20, w: colW, h: 0.35,
      fontFace: FONT_MONO, fontSize: 10, color: COLOR.textDim,
      valign: "top", margin: 0,
    });
  });

  // Bottom paragraph
  s.addText(
    [
      { text: "Today's largest exchanges were architected for retail speculation. The institutional client \u2014 pensions, hedge funds, treasuries \u2014 is forced to choose between liquidity and safety. " , options: { color: COLOR.text } },
      { text: "No venue offers both at scale.", options: { color: COLOR.white, bold: true } },
    ],
    {
      x: 0.6, y: 5.85, w: 11.5, h: 0.9,
      fontFace: FONT_SANS, fontSize: 15,
      valign: "top", margin: 0,
    }
  );

  footerChrome(s, 2);
}

// ============================================================
// SLIDE 3 — MARKET SIZING
// ============================================================
function slide3() {
  const s = pres.addSlide();
  bg(s);

  eyebrow(s, "MARKET SIZING");
  bigTitle(s, "A $4.2T addressable market with no clear institutional leader.");

  // ---- LEFT: Volume bars ----
  const lx = 0.6;
  sectionLabel(s, "2029E ANNUAL ON-VENUE VOLUME", lx, 3.15, 5.5);

  const bars = [
    { label: "Global digital-asset trading (TAM)", value: "$4.2T", frac: 1.00, color: COLOR.blueDeep, lblColor: COLOR.text },
    { label: "Institutional & prime SAM",         value: "$1.6T", frac: 0.50, color: COLOR.blueMid,  lblColor: COLOR.text },
    { label: "ApeX 5-year capture (SOM)",         value: "$240B", frac: 0.10, color: COLOR.blue,     lblColor: COLOR.blue },
  ];

  const barW = 5.5;
  let by = 3.55;
  bars.forEach(b => {
    s.addText(b.label, {
      x: lx, y: by, w: barW - 1.2, h: 0.3,
      fontFace: FONT_SANS, fontSize: 13, color: b.lblColor,
      valign: "middle", margin: 0,
    });
    s.addText(b.value, {
      x: lx + barW - 1.2, y: by, w: 1.2, h: 0.3,
      fontFace: FONT_SANS, fontSize: 13, color: b.lblColor,
      align: "right", valign: "middle", margin: 0,
    });
    // Track
    s.addShape(pres.shapes.RECTANGLE, {
      x: lx, y: by + 0.36, w: barW, h: 0.16,
      fill: { color: COLOR.bgPanel }, line: { type: "none" },
    });
    // Fill
    s.addShape(pres.shapes.RECTANGLE, {
      x: lx, y: by + 0.36, w: barW * b.frac, h: 0.16,
      fill: { color: b.color }, line: { type: "none" },
    });
    by += 0.75;
  });

  // Callout box
  const cy = by + 0.2;
  s.addShape(pres.shapes.RECTANGLE, {
    x: lx, y: cy, w: barW, h: 0.85,
    fill: { color: COLOR.bgPanel }, line: { color: COLOR.border, width: 0.75 },
  });
  s.addText(
    [
      { text: "Institutional share of global volume is forecast to grow from ", options: { color: COLOR.text } },
      { text: "22% \u2192 41%", options: { color: COLOR.blue, bold: true } },
      { text: " by 2029.", options: { color: COLOR.text } },
    ],
    {
      x: lx + 0.2, y: cy + 0.08, w: barW - 0.4, h: 0.45,
      fontFace: FONT_SANS, fontSize: 13,
      valign: "top", margin: 0,
    }
  );
  s.addText("BCG Global Crypto Outlook  \u00B7  ApeX research", {
    x: lx + 0.2, y: cy + 0.50, w: barW - 0.4, h: 0.3,
    fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim,
    valign: "middle", margin: 0,
  });

  // ---- RIGHT: Wallets list ----
  const rx = 7.0;
  const rw = 5.7;
  sectionLabel(s, "WHERE THE WALLETS ARE", rx, 3.15, rw);
  hLine(s, rx, 3.5, rw);

  const wallets = [
    ["Hedge funds & prop trading",      "$1.9T"],
    ["Asset managers & ETF issuers",    "$880B"],
    ["Corporate treasuries",            "$610B"],
    ["Family offices & private banks",  "$520B"],
    ["Sovereign & pension allocators",  "$310B"],
  ];
  let wy = 3.65;
  const rowH = 0.55;
  wallets.forEach((w, i) => {
    s.addText(w[0], {
      x: rx, y: wy, w: rw - 1.2, h: rowH,
      fontFace: FONT_SANS, fontSize: 13, color: COLOR.text,
      valign: "middle", margin: 0,
    });
    s.addText(w[1], {
      x: rx + rw - 1.2, y: wy, w: 1.2, h: rowH,
      fontFace: FONT_SANS, fontSize: 13, color: COLOR.text,
      align: "right", valign: "middle", margin: 0,
    });
    if (i < wallets.length - 1) {
      hLine(s, rx, wy + rowH, rw);
    }
    wy += rowH;
  });
  hLine(s, rx, wy, rw);

  footerChrome(s, 3);
}

// ============================================================
// SLIDE 4 — THE APEX ANSWER
// ============================================================
function slide4() {
  const s = pres.addSlide();
  bg(s);

  eyebrow(s, "THE APEX ANSWER");
  bigTitle(s, "ApeX is the prime venue for sophisticated capital \u2014 built bottom-up for institutions.");

  // Four cards
  const cards = [
    { num: "01", title: "A single matching engine", body: "Spot, perpetual futures, and cross-margin in one consolidated order book \u2014 sub-15\u00B5s round trip." },
    { num: "02", title: "Bank-grade custody",        body: "Qualified, segregated, on-chain auditable. 1:1 proof of reserves verified every block." },
    { num: "03", title: "Real prime services",       body: "Portfolio margin, financing, FIX/REST connectivity, and tri-party settlement out of the box." },
    { num: "04", title: "Compliant by design",       body: "VARA, Cayman CIMA, MAS in-flight. KYB, travel rule, and market surveillance natively integrated." },
  ];

  const cardW = 2.9;
  const cardH = 3.2;
  const cardY = 3.2;
  const startX = 0.6;
  const gap = 0.2;

  cards.forEach((c, i) => {
    const x = startX + i * (cardW + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: cardW, h: cardH,
      fill: { color: COLOR.bgPanel }, line: { color: COLOR.border, width: 0.75 },
    });
    s.addText(c.num, {
      x: x + 0.3, y: cardY + 0.3, w: cardW - 0.6, h: 0.4,
      fontFace: FONT_MONO, fontSize: 13, color: COLOR.blue,
      charSpacing: 3, valign: "middle", margin: 0,
    });
    s.addText(c.title, {
      x: x + 0.3, y: cardY + 0.85, w: cardW - 0.6, h: 0.7,
      fontFace: FONT_SANS, fontSize: 16, bold: true, color: COLOR.white,
      valign: "top", margin: 0,
    });
    s.addText(c.body, {
      x: x + 0.3, y: cardY + 1.65, w: cardW - 0.6, h: 1.4,
      fontFace: FONT_SANS, fontSize: 12, color: COLOR.textMute,
      valign: "top", margin: 0,
    });
  });

  // Bottom italic statement
  s.addText(
    "We are the venue an institution would build for itself \u2014 if it had four years and a $200M engineering budget.",
    {
      x: 0.6, y: 6.45, w: 11.5, h: 0.4,
      fontFace: FONT_SANS, fontSize: 13, italic: true, color: COLOR.textMute,
      valign: "middle", margin: 0,
    }
  );

  footerChrome(s, 4);
}

// ============================================================
// SLIDE 5 — PRODUCT · TRADING (terminal mockup)
// ============================================================
function slide5() {
  const s = pres.addSlide();
  bg(s);

  eyebrow(s, "PRODUCT  \u00B7  TRADING");
  bigTitle(s, "A unified order book across spot, perps, and margin.", 0.6, 0.95, 9, 1.3);

  s.addText("apex.markets/terminal", {
    x: SW - 4.6, y: 2.05, w: 4, h: 0.35,
    fontFace: FONT_MONO, fontSize: 11, color: COLOR.blue,
    align: "right", valign: "middle", margin: 0,
  });

  // Terminal frame
  const tx = 0.6, ty = 2.55, tw = SW - 1.2, th = 4.3;
  s.addShape(pres.shapes.RECTANGLE, {
    x: tx, y: ty, w: tw, h: th,
    fill: { color: "0A1326" }, line: { color: COLOR.border, width: 0.75 },
  });

  // Header bar inside terminal
  const hy = ty + 0.15;
  // LIVE pill
  s.addShape(pres.shapes.OVAL, {
    x: tx + 0.25, y: hy + 0.08, w: 0.12, h: 0.12,
    fill: { color: COLOR.green }, line: { type: "none" },
  });
  s.addText("LIVE", {
    x: tx + 0.42, y: hy, w: 0.6, h: 0.3,
    fontFace: FONT_MONO, fontSize: 10, color: COLOR.text,
    charSpacing: 2, valign: "middle", margin: 0,
  });
  s.addText("BTC-USD", {
    x: tx + 1.0, y: hy, w: 0.9, h: 0.3,
    fontFace: FONT_MONO, fontSize: 11, color: COLOR.text,
    valign: "middle", margin: 0,
  });
  s.addText("$98,427.50", {
    x: tx + 1.95, y: hy, w: 1.4, h: 0.3,
    fontFace: FONT_MONO, fontSize: 11, color: COLOR.white, bold: true,
    valign: "middle", margin: 0,
  });
  s.addText("+2.34%", {
    x: tx + 3.4, y: hy, w: 1.0, h: 0.3,
    fontFace: FONT_MONO, fontSize: 11, color: COLOR.green,
    valign: "middle", margin: 0,
  });

  // Right-side header stats
  const stats = [
    ["24h vol",  "$4.82B",   COLOR.text,  tx + tw - 4.85],
    ["funding",  "+0.0142%", COLOR.green, tx + tw - 3.05],
    ["OI",       "$1.94B",   COLOR.text,  tx + tw - 1.20],
  ];
  stats.forEach(([k, v, c, sx]) => {
    s.addText(k, {
      x: sx, y: hy, w: 0.85, h: 0.3,
      fontFace: FONT_MONO, fontSize: 10, color: COLOR.textDim,
      valign: "middle", margin: 0,
    });
    s.addText(v, {
      x: sx + 0.85, y: hy, w: 1.0, h: 0.3,
      fontFace: FONT_MONO, fontSize: 10, color: c,
      valign: "middle", margin: 0,
    });
  });

  // Divider under header
  s.addShape(pres.shapes.LINE, {
    x: tx, y: ty + 0.6, w: tw, h: 0,
    line: { color: COLOR.border, width: 0.5 },
  });

  // Three columns: order book | chart | order ticket
  const obX = tx + 0.05;
  const obW = 3.45;
  const chX = obX + obW + 0.05;
  const chW = 4.55;
  const otX = chX + chW + 0.05;
  const otW = tw - (otX - tx) - 0.05;

  // ---- ORDER BOOK ----
  // header row
  const obH = ty + 0.75;
  s.addText("PRICE (USD)", { x: obX + 0.15, y: obH, w: 1.1, h: 0.25, fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim, valign: "middle", margin: 0 });
  s.addText("SIZE",        { x: obX + 1.3,  y: obH, w: 1.0, h: 0.25, fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim, align: "right", valign: "middle", margin: 0 });
  s.addText("TOTAL",       { x: obX + 2.3,  y: obH, w: 1.05, h: 0.25, fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim, align: "right", valign: "middle", margin: 0 });

  const asks = [
    ["98,432.10", "0.842", "82,917"],
    ["98,431.50", "1.420", "139,772"],
    ["98,430.80", "2.105", "207,196"],
    ["98,430.20", "3.670", "361,238"],
    ["98,429.60", "4.812", "473,663"],
  ];
  const bids = [
    ["98,426.80", "5.221", "514,108"],
    ["98,426.10", "3.488", "343,310"],
    ["98,425.40", "2.014", "198,311"],
    ["98,424.70", "1.226", "120,668"],
    ["98,424.10", "0.604", "59,448"],
  ];

  const rowH5 = 0.21;
  let ry = obH + 0.27;
  // Asks (red, descending price)
  for (let i = asks.length - 1; i >= 0; i--) {
    const r = asks[i];
    const depth = parseFloat(r[1]) / 5;
    s.addShape(pres.shapes.RECTANGLE, {
      x: obX + 1.3 + (1.0 - depth * 1.0), y: ry + 0.02, w: depth * 2.05, h: rowH5 - 0.03,
      fill: { color: COLOR.redDim, transparency: 30 }, line: { type: "none" },
    });
    s.addText(r[0], { x: obX + 0.15, y: ry, w: 1.1, h: rowH5, fontFace: FONT_MONO, fontSize: 10, color: COLOR.red, valign: "middle", margin: 0 });
    s.addText(r[1], { x: obX + 1.3, y: ry, w: 1.0, h: rowH5, fontFace: FONT_MONO, fontSize: 10, color: COLOR.text, align: "right", valign: "middle", margin: 0 });
    s.addText(r[2], { x: obX + 2.3, y: ry, w: 1.05, h: rowH5, fontFace: FONT_MONO, fontSize: 10, color: COLOR.textMute, align: "right", valign: "middle", margin: 0 });
    ry += rowH5;
  }

  // Mid spread row
  ry += 0.04;
  s.addText("98,427.50", { x: obX + 0.15, y: ry, w: 1.4, h: 0.28, fontFace: FONT_MONO, fontSize: 12, color: COLOR.white, bold: true, valign: "middle", margin: 0 });
  s.addText("\u25B2 0.30", { x: obX + 2.2, y: ry, w: 1.15, h: 0.28, fontFace: FONT_MONO, fontSize: 10, color: COLOR.green, align: "right", valign: "middle", margin: 0 });
  ry += 0.32;

  // Bids (green)
  bids.forEach(r => {
    const depth = parseFloat(r[1]) / 5.5;
    s.addShape(pres.shapes.RECTANGLE, {
      x: obX + 1.3 + (1.0 - depth * 1.0), y: ry + 0.02, w: depth * 2.05, h: rowH5 - 0.03,
      fill: { color: COLOR.greenDim, transparency: 30 }, line: { type: "none" },
    });
    s.addText(r[0], { x: obX + 0.15, y: ry, w: 1.1, h: rowH5, fontFace: FONT_MONO, fontSize: 10, color: COLOR.green, valign: "middle", margin: 0 });
    s.addText(r[1], { x: obX + 1.3, y: ry, w: 1.0, h: rowH5, fontFace: FONT_MONO, fontSize: 10, color: COLOR.text, align: "right", valign: "middle", margin: 0 });
    s.addText(r[2], { x: obX + 2.3, y: ry, w: 1.05, h: rowH5, fontFace: FONT_MONO, fontSize: 10, color: COLOR.textMute, align: "right", valign: "middle", margin: 0 });
    ry += rowH5;
  });

  // ---- CHART AREA ----
  const cTop = ty + 0.75;
  const tfs = ["1m", "5m", "15m", "1H", "4H", "1D"];
  let tfx = chX + 0.15;
  tfs.forEach(t => {
    const sel = t === "1H";
    if (sel) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: tfx - 0.05, y: cTop - 0.02, w: 0.38, h: 0.3,
        fill: { color: COLOR.bgPanel }, line: { color: COLOR.border, width: 0.5 },
      });
    }
    s.addText(t, {
      x: tfx, y: cTop, w: 0.32, h: 0.26,
      fontFace: FONT_MONO, fontSize: 10, color: sel ? COLOR.text : COLOR.textDim,
      align: "center", valign: "middle", margin: 0,
    });
    tfx += 0.36;
  });
  // Position label safely after timeframes
  s.addText("CANDLES  \u00B7  DEPTH  \u00B7  VWAP", {
    x: chX + chW - 2.05, y: cTop, w: 1.95, h: 0.28,
    fontFace: FONT_MONO, fontSize: 8, color: COLOR.textDim,
    charSpacing: 2, align: "right", valign: "middle", margin: 0,
  });

  // Candlestick chart
  const candleAreaX = chX + 0.15;
  const candleAreaY = cTop + 0.45;
  const candleAreaW = chW - 0.3;
  const candleAreaH = 2.85;
  for (let i = 1; i < 4; i++) {
    s.addShape(pres.shapes.LINE, {
      x: candleAreaX, y: candleAreaY + (candleAreaH / 4) * i,
      w: candleAreaW, h: 0,
      line: { color: COLOR.border, width: 0.4, dashType: "dash" },
    });
  }

  const nC = 22;
  const cw = 0.13;
  const cgap = (candleAreaW - nC * cw) / (nC - 1);
  const prices = [];
  let p = 0.15;
  for (let i = 0; i < nC; i++) {
    const drift = i / nC * 0.7;
    const wobble = Math.sin(i * 1.7) * 0.05 + (i % 3 === 0 ? -0.03 : 0.02);
    const open = p;
    const close = Math.max(0.05, Math.min(0.95, drift + 0.15 + wobble));
    const hi = Math.max(open, close) + 0.04 + Math.abs(Math.sin(i * 0.9)) * 0.03;
    const lo = Math.min(open, close) - 0.03 - Math.abs(Math.cos(i * 1.1)) * 0.03;
    prices.push({ open, close, hi, lo });
    p = close;
  }
  const yFromV = v => candleAreaY + candleAreaH * (1 - v);

  for (let i = 0; i < nC - 1; i++) {
    const x1 = candleAreaX + i * (cw + cgap) + cw / 2;
    const x2 = candleAreaX + (i + 1) * (cw + cgap) + cw / 2;
    const y1 = yFromV(prices[i].close);
    const y2 = yFromV(prices[i + 1].close);
    segLine(s, x1, y1, x2, y2, { color: COLOR.blue, width: 0.75, dashType: "dash" });
  }

  prices.forEach((c, i) => {
    const cx = candleAreaX + i * (cw + cgap);
    const up = c.close >= c.open;
    const col = up ? COLOR.green : COLOR.red;
    s.addShape(pres.shapes.LINE, {
      x: cx + cw / 2, y: yFromV(c.hi),
      w: 0, h: yFromV(c.lo) - yFromV(c.hi),
      line: { color: col, width: 0.75 },
    });
    const bodyY = yFromV(Math.max(c.open, c.close));
    const bodyH = Math.max(0.04, Math.abs(yFromV(c.open) - yFromV(c.close)));
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: bodyY, w: cw, h: bodyH,
      fill: { color: col }, line: { type: "none" },
    });
  });

  const lastY = yFromV(prices[nC - 1].close);
  s.addShape(pres.shapes.RECTANGLE, {
    x: candleAreaX + candleAreaW - 0.7, y: lastY - 0.12, w: 0.7, h: 0.24,
    fill: { color: COLOR.blue }, line: { type: "none" },
  });
  s.addText("98,427", {
    x: candleAreaX + candleAreaW - 0.7, y: lastY - 0.12, w: 0.7, h: 0.24,
    fontFace: FONT_MONO, fontSize: 9, color: COLOR.white, bold: true,
    align: "center", valign: "middle", margin: 0,
  });

  // ---- ORDER TICKET ----
  // BUY / SELL toggle
  s.addShape(pres.shapes.RECTANGLE, {
    x: otX + 0.1, y: ty + 0.7, w: otW * 0.5 - 0.15, h: 0.36,
    fill: { color: COLOR.green }, line: { type: "none" },
  });
  s.addText("BUY  /  LONG", {
    x: otX + 0.1, y: ty + 0.7, w: otW * 0.5 - 0.15, h: 0.36,
    fontFace: FONT_MONO, fontSize: 10, color: COLOR.white, bold: true,
    charSpacing: 2, align: "center", valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: otX + otW * 0.5 + 0.05, y: ty + 0.7, w: otW * 0.5 - 0.15, h: 0.36,
    fill: { color: COLOR.bgPanel }, line: { color: COLOR.border, width: 0.5 },
  });
  s.addText("SELL  /  SHORT", {
    x: otX + otW * 0.5 + 0.05, y: ty + 0.7, w: otW * 0.5 - 0.15, h: 0.36,
    fontFace: FONT_MONO, fontSize: 10, color: COLOR.textMute,
    charSpacing: 2, align: "center", valign: "middle", margin: 0,
  });

  // Order types — sized to fit "ICEBERG"
  const types = ["LIMIT", "MARKET", "STOP", "TWAP", "ICEBERG"];
  const typeRowW = otW - 0.2;
  const typeW = typeRowW / 5;
  types.forEach((t, i) => {
    const sel = i === 0;
    const tX = otX + 0.1 + i * typeW;
    if (sel) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: tX, y: ty + 1.15, w: typeW - 0.03, h: 0.26,
        fill: { color: COLOR.bgPanel }, line: { color: COLOR.border, width: 0.5 },
      });
    }
    s.addText(t, {
      x: tX, y: ty + 1.15, w: typeW - 0.03, h: 0.26,
      fontFace: FONT_MONO, fontSize: 8, color: sel ? COLOR.text : COLOR.textDim,
      charSpacing: 1, align: "center", valign: "middle", margin: 0,
    });
  });

  // PRICE field
  s.addText("PRICE (USD)", {
    x: otX + 0.1, y: ty + 1.5, w: otW - 0.2, h: 0.22,
    fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim,
    charSpacing: 1, valign: "middle", margin: 0,
  });
  s.addText("98,420.00", {
    x: otX + 0.1, y: ty + 1.72, w: otW - 0.2, h: 0.3,
    fontFace: FONT_MONO, fontSize: 13, color: COLOR.white,
    valign: "middle", margin: 0,
  });

  // SIZE field
  s.addText("SIZE (BTC)", {
    x: otX + 0.1, y: ty + 2.05, w: otW - 0.2, h: 0.22,
    fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim,
    charSpacing: 1, valign: "middle", margin: 0,
  });
  s.addText("12.500", {
    x: otX + 0.1, y: ty + 2.27, w: otW - 0.2, h: 0.3,
    fontFace: FONT_MONO, fontSize: 13, color: COLOR.white,
    valign: "middle", margin: 0,
  });

  // % buttons
  const pcts = ["25%", "50%", "75%", "MAX"];
  const pctW = (otW - 0.2 - 0.06) / 4;
  pcts.forEach((p, i) => {
    const isMax = p === "MAX";
    s.addShape(pres.shapes.RECTANGLE, {
      x: otX + 0.1 + i * (pctW + 0.02), y: ty + 2.62, w: pctW, h: 0.26,
      fill: { color: COLOR.bgPanel }, line: { color: isMax ? COLOR.blue : COLOR.border, width: 0.5 },
    });
    s.addText(p, {
      x: otX + 0.1 + i * (pctW + 0.02), y: ty + 2.62, w: pctW, h: 0.26,
      fontFace: FONT_MONO, fontSize: 9, color: isMax ? COLOR.blue : COLOR.textMute,
      align: "center", valign: "middle", margin: 0,
    });
  });

  // Leverage row
  s.addText("LEVERAGE", {
    x: otX + 0.1, y: ty + 2.95, w: 1.2, h: 0.22,
    fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim,
    charSpacing: 1, valign: "middle", margin: 0,
  });
  s.addText("10\u00D7", {
    x: otX + otW - 0.7, y: ty + 2.95, w: 0.6, h: 0.22,
    fontFace: FONT_MONO, fontSize: 10, color: COLOR.blue,
    align: "right", valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: otX + 0.1, y: ty + 3.20, w: otW - 0.2, h: 0.06,
    fill: { color: COLOR.bgPanel }, line: { type: "none" },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: otX + 0.1, y: ty + 3.20, w: (otW - 0.2) * 0.4, h: 0.06,
    fill: { color: COLOR.green }, line: { type: "none" },
  });

  // Order summary rows
  const sumRows = [
    ["Order value",   "$1,230,250", COLOR.text],
    ["Initial margin","$123,025",   COLOR.text],
    ["Maker rebate",  "\u22121.5 bps", COLOR.green],
  ];
  let suy = ty + 3.40;
  sumRows.forEach(r => {
    s.addText(r[0], {
      x: otX + 0.1, y: suy, w: otW * 0.5, h: 0.20,
      fontFace: FONT_MONO, fontSize: 9, color: COLOR.textMute,
      valign: "middle", margin: 0,
    });
    s.addText(r[1], {
      x: otX + otW * 0.5, y: suy, w: otW * 0.5 - 0.1, h: 0.20,
      fontFace: FONT_MONO, fontSize: 9, color: r[2],
      align: "right", valign: "middle", margin: 0,
    });
    suy += 0.22;
  });

  // PLACE ORDER button
  s.addShape(pres.shapes.RECTANGLE, {
    x: otX + 0.1, y: ty + 4.10 - 0.06, w: otW - 0.2, h: 0.30,
    fill: { color: COLOR.blue }, line: { type: "none" },
  });
  s.addText("PLACE ORDER  \u00B7  BUY 12.500 BTC", {
    x: otX + 0.1, y: ty + 4.10 - 0.06, w: otW - 0.2, h: 0.30,
    fontFace: FONT_MONO, fontSize: 9, color: COLOR.white, bold: true,
    charSpacing: 2, align: "center", valign: "middle", margin: 0,
  });

  footerChrome(s, 5);
}

// ============================================================
// SLIDE 6 — LIQUIDITY (chart + KPIs)
// ============================================================
function slide6() {
  const s = pres.addSlide();
  bg(s);

  eyebrow(s, "LIQUIDITY");
  bigTitle(s, "Depth and uptime that compete with top-three venues, eighteen months after launch.");

  // ---- LEFT: Chart panel ----
  const px = 0.6, py = 3.05, pw = 6.6, ph = 4.0;
  s.addShape(pres.shapes.RECTANGLE, {
    x: px, y: py, w: pw, h: ph,
    fill: { color: COLOR.bgPanel2 }, line: { color: COLOR.border, width: 0.75 },
  });

  s.addText("MONTHLY NOTIONAL VOLUME", {
    x: px + 0.3, y: py + 0.25, w: 4, h: 0.3,
    fontFace: FONT_MONO, fontSize: 10, color: COLOR.textDim,
    charSpacing: 3, valign: "middle", margin: 0,
  });

  // Legend (top right of panel)
  const legend = [
    { label: "Spot",   color: COLOR.blueDeep },
    { label: "Perps",  color: COLOR.blueMid  },
    { label: "Margin", color: COLOR.blue     },
  ];
  let lgx = px + pw - 1.95;
  legend.forEach(lg => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: lgx, y: py + 0.32, w: 0.14, h: 0.14,
      fill: { color: lg.color }, line: { type: "none" },
    });
    s.addText(lg.label, {
      x: lgx + 0.18, y: py + 0.22, w: 0.55, h: 0.3,
      fontFace: FONT_MONO, fontSize: 10, color: COLOR.textMute,
      valign: "middle", margin: 0,
    });
    lgx += 0.7;
  });

  s.addText("$94.2B", {
    x: px + 0.3, y: py + 0.55, w: 5, h: 0.7,
    fontFace: FONT_SANS, fontSize: 38, bold: true, color: COLOR.white,
    valign: "top", margin: 0,
  });
  s.addText("\u25B2 41% MoM  \u00B7  live as of Apr 2026", {
    x: px + 0.3, y: py + 1.25, w: 4, h: 0.3,
    fontFace: FONT_MONO, fontSize: 11, color: COLOR.green,
    valign: "middle", margin: 0,
  });

  // Chart area
  const cax = px + 0.6, cay = py + 1.7, caw = pw - 0.9, cah = 2.0;

  // Y-axis labels
  ["$1000B", "$750B", "$500B", "$250B"].forEach((lab, i) => {
    s.addText(lab, {
      x: px + 0.05, y: cay + (cah / 4) * i - 0.1, w: 0.55, h: 0.22,
      fontFace: FONT_MONO, fontSize: 8, color: COLOR.textDim,
      align: "right", valign: "middle", margin: 0,
    });
  });

  // Bars: 12 months, stacked spot/perps/margin
  const months = ["May'25","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan'26","Feb","Mar","Apr"];
  // values in fractions of cah (total stacked height growing)
  const totals = [0.10,0.13,0.16,0.20,0.25,0.32,0.40,0.50,0.60,0.72,0.85,0.98];
  const barW = (caw - 0.2) / months.length * 0.55;
  const slot = (caw - 0.2) / months.length;

  totals.forEach((t, i) => {
    const totalH = cah * t;
    const bx = cax + 0.1 + i * slot + (slot - barW) / 2;
    const spotH   = totalH * 0.55;
    const perpsH  = totalH * 0.30;
    const marginH = totalH * 0.15;

    // Spot (bottom, darkest blue)
    s.addShape(pres.shapes.RECTANGLE, {
      x: bx, y: cay + cah - spotH, w: barW, h: spotH,
      fill: { color: COLOR.blueDeep }, line: { type: "none" },
    });
    // Perps (middle)
    s.addShape(pres.shapes.RECTANGLE, {
      x: bx, y: cay + cah - spotH - perpsH, w: barW, h: perpsH,
      fill: { color: COLOR.blueMid }, line: { type: "none" },
    });
    // Margin (top, brightest)
    s.addShape(pres.shapes.RECTANGLE, {
      x: bx, y: cay + cah - totalH, w: barW, h: marginH,
      fill: { color: COLOR.blue }, line: { type: "none" },
    });
  });

  // X-axis labels (every other month)
  months.forEach((m, i) => {
    if (i % 2 !== 0) return;
    const bx = cax + 0.1 + i * slot + (slot - barW) / 2;
    s.addText(m, {
      x: bx - 0.2, y: cay + cah + 0.05, w: barW + 0.4, h: 0.22,
      fontFace: FONT_MONO, fontSize: 8, color: COLOR.textDim,
      align: "center", valign: "middle", margin: 0,
    });
  });

  // ---- RIGHT: KPI list ----
  const rx = 7.6, rw = SW - rx - 0.6;
  const kpis = [
    ["14.7\u00B5s",   "p99 round-trip match latency"],
    ["99.997%",       "platform uptime  \u00B7  trailing 12 mo."],
    ["$28M",          "10bps depth, BTC top-of-book"],
    ["37",            "tier-1 market makers committed"],
    ["1.2M",          "orders / second sustained throughput"],
  ];

  let ky = 3.0;
  const kRowH = 0.85;
  kpis.forEach((k, i) => {
    if (i === 0) hLine(s, rx, ky, rw);
    s.addText(k[0], {
      x: rx, y: ky + 0.10, w: rw, h: 0.45,
      fontFace: FONT_SANS, fontSize: 28, color: COLOR.white,
      valign: "middle", margin: 0,
    });
    s.addText(k[1], {
      x: rx, y: ky + 0.55, w: rw, h: 0.28,
      fontFace: FONT_SANS, fontSize: 12, color: COLOR.textMute,
      valign: "middle", margin: 0,
    });
    hLine(s, rx, ky + kRowH, rw);
    ky += kRowH;
  });

  footerChrome(s, 6);
}

// ============================================================
// SLIDE 7 — CUSTODY & RISK
// ============================================================
function slide7() {
  const s = pres.addSlide();
  bg(s);

  eyebrow(s, "CUSTODY & RISK");
  bigTitle(s, "Bank-grade segregation with on-chain auditability.");

  // ---- LEFT: Custody architecture diagram ----
  const lx = 0.6, ly = 2.65, lw = 6.4, lh = 4.40;
  s.addShape(pres.shapes.RECTANGLE, {
    x: lx, y: ly, w: lw, h: lh,
    fill: { color: COLOR.bgPanel2 }, line: { color: COLOR.border, width: 0.75 },
  });

  s.addText("CUSTODY ARCHITECTURE", {
    x: lx + 0.3, y: ly + 0.18, w: 4, h: 0.28,
    fontFace: FONT_MONO, fontSize: 10, color: COLOR.textDim,
    charSpacing: 3, valign: "middle", margin: 0,
  });

  // Row helper
  function archBox(x, y, w, h, label, title, opts = {}) {
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h,
      fill: { color: opts.fill || COLOR.bgPanel },
      line: { color: opts.border || COLOR.border, width: opts.borderWidth || 0.75 },
    });
    s.addText(label, {
      x: x + 0.2, y: y + 0.10, w: w - 0.4, h: 0.22,
      fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim,
      charSpacing: 2, valign: "middle", margin: 0,
    });
    s.addText(title, {
      x: x + 0.2, y: y + 0.34, w: w - 0.4, h: 0.30,
      fontFace: FONT_SANS, fontSize: 13, color: COLOR.text,
      valign: "middle", margin: 0,
    });
  }

  function arrow(x, y) {
    s.addText("\u2193", {
      x: x - 0.2, y, w: 0.4, h: 0.20,
      fontFace: FONT_SANS, fontSize: 12, color: COLOR.textDim,
      align: "center", valign: "middle", margin: 0,
    });
  }

  const ix = lx + 0.3, iw = lw - 0.6;
  // CLIENT
  archBox(ix, ly + 0.55, iw, 0.7, "CLIENT", "Segregated sub-account  \u00B7  client-controlled keys");
  arrow(lx + lw / 2, ly + 1.30);

  // SOC2 pill (top-right corner of panel — accreditation badge)
  s.addShape(pres.shapes.RECTANGLE, {
    x: lx + lw - 2.05, y: ly + 0.18, w: 1.85, h: 0.22,
    fill: { color: COLOR.blue }, line: { type: "none" },
  });
  s.addText("SOC 2  \u00B7  ISO 27001", {
    x: lx + lw - 2.05, y: ly + 0.18, w: 1.85, h: 0.22,
    fontFace: FONT_MONO, fontSize: 8, color: COLOR.white, bold: true,
    charSpacing: 2, align: "center", valign: "middle", margin: 0,
  });

  // APEX VAULT (highlighted)
  archBox(ix, ly + 1.62, iw, 0.75, "APEX VAULT", "3-of-5 MPC, geo-distributed, HSM-backed", {
    fill: COLOR.bgPanel, border: COLOR.blue, borderWidth: 1.25,
  });
  arrow(lx + lw / 2, ly + 2.42);

  // Two-column COLD / WARM
  archBox(ix, ly + 2.65, iw / 2 - 0.05, 0.7, "COLD  \u00B7  95%",  "Air-gapped, multi-sig");
  archBox(ix + iw / 2 + 0.05, ly + 2.65, iw / 2 - 0.05, 0.7, "WARM  \u00B7  5%", "Settlement & withdrawal queue");
  arrow(lx + lw / 2, ly + 3.40);

  // PROOF OF RESERVES
  archBox(ix, ly + 3.62, iw, 0.7, "PROOF OF RESERVES", "zk-Merkle attestation, every block  \u00B7  public verifier");

  // ---- RIGHT: Risk framework list ----
  const rx = 7.4, rw = SW - rx - 0.6;
  sectionLabel(s, "RISK FRAMEWORK", rx, 2.65, rw);
  hLine(s, rx, 3.0, rw);

  const risks = [
    ["Real-time portfolio margin",       "15ms",  "Cross-product netting; SPAN-style scenarios"],
    ["Auto-deleveraging insurance fund", "$420M", "Funded from trading fees  \u00B7  4\u00D7 peak daily liquidation"],
    ["Surveillance & market integrity",  "24/7",  "Spoofing, layering, wash-trade detection \u2014 Eventus partnership"],
    ["Crime & specie insurance",         "$500M", "Lloyd's of London syndicate  \u00B7  cold-storage coverage"],
    ["Tri-party settlement",             "T+0",   "Off-exchange settlement via Copper, Fireblocks, Komainu"],
  ];
  let ry = 3.13;
  const rh = 0.8;
  risks.forEach((r, i) => {
    s.addText(r[0], {
      x: rx, y: ry, w: rw - 1.0, h: 0.32,
      fontFace: FONT_SANS, fontSize: 14, color: COLOR.text,
      valign: "middle", margin: 0,
    });
    s.addText(r[1], {
      x: rx + rw - 1.0, y: ry, w: 1.0, h: 0.32,
      fontFace: FONT_MONO, fontSize: 11, color: COLOR.blue,
      align: "right", valign: "middle", margin: 0,
    });
    s.addText(r[2], {
      x: rx, y: ry + 0.34, w: rw, h: 0.28,
      fontFace: FONT_SANS, fontSize: 11, color: COLOR.textMute,
      valign: "middle", margin: 0,
    });
    hLine(s, rx, ry + rh - 0.05, rw);
    ry += rh;
  });

  footerChrome(s, 7);
}

// ============================================================
// SLIDE 8 — REGULATION
// ============================================================
function slide8() {
  const s = pres.addSlide();
  bg(s);

  eyebrow(s, "REGULATION");
  bigTitle(s, "A multi-jurisdictional license stack \u2014 institutional-grade from day one.");

  const items = [
    { status: "LIVE",       statusColor: COLOR.green, jur: "UAE",        license: "VARA",        body: "Full VASP license \u2014 broker-dealer & custody categories. HQ Dubai DIFC.",      foot: "Granted Q3 2024",   highlight: false },
    { status: "LIVE",       statusColor: COLOR.green, jur: "CAYMAN",     license: "CIMA",        body: "Virtual Asset Service Provider registration \u2014 derivatives venue.",            foot: "Granted Q1 2025",   highlight: false },
    { status: "IN-FLIGHT",  statusColor: COLOR.amber, jur: "SINGAPORE",  license: "MAS  \u00B7  DPT", body: "Major Payment Institution license, in principle approval received.",         foot: "Expected Q3 2026",  highlight: true  },
    { status: "IN-FLIGHT",  statusColor: COLOR.amber, jur: "EU",         license: "MiCA  \u00B7  CASP", body: "CASP authorisation via Malta MFSA \u2014 passport across 27 member states.", foot: "Expected Q4 2026",  highlight: false },
  ];

  const cardW = 2.93, cardH = 3.05, cardY = 3.0;
  const sx = 0.6, gap = 0.18;

  items.forEach((it, i) => {
    const x = sx + i * (cardW + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: cardW, h: cardH,
      fill: { color: COLOR.bgPanel },
      line: { color: it.highlight ? COLOR.blue : COLOR.border, width: it.highlight ? 1.25 : 0.75 },
    });
    // status dot + text
    s.addShape(pres.shapes.OVAL, {
      x: x + 0.3, y: cardY + 0.34, w: 0.12, h: 0.12,
      fill: { color: it.statusColor }, line: { type: "none" },
    });
    s.addText(it.status, {
      x: x + 0.46, y: cardY + 0.26, w: cardW - 0.5, h: 0.28,
      fontFace: FONT_MONO, fontSize: 9, color: COLOR.text,
      charSpacing: 2, valign: "middle", margin: 0,
    });
    // Jurisdiction
    s.addText(it.jur, {
      x: x + 0.3, y: cardY + 0.65, w: cardW - 0.5, h: 0.3,
      fontFace: FONT_MONO, fontSize: 11, color: COLOR.textDim,
      charSpacing: 3, valign: "middle", margin: 0,
    });
    // License big
    s.addText(it.license, {
      x: x + 0.3, y: cardY + 0.95, w: cardW - 0.5, h: 0.45,
      fontFace: FONT_SANS, fontSize: 22, bold: true, color: COLOR.white,
      valign: "middle", margin: 0,
    });
    // Body
    s.addText(it.body, {
      x: x + 0.3, y: cardY + 1.5, w: cardW - 0.5, h: 1.0,
      fontFace: FONT_SANS, fontSize: 12, color: COLOR.textMute,
      valign: "top", margin: 0,
    });
    // Footer of card
    s.addText(it.foot, {
      x: x + 0.3, y: cardY + cardH - 0.42, w: cardW - 0.5, h: 0.3,
      fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim,
      charSpacing: 2, valign: "middle", margin: 0,
    });
  });

  // ---- Bottom strip ----
  hLine(s, 0.6, 6.20, SW - 1.2);
  const bottomItems = [
    { label: "Bank counterparty relationships", big: "11 institutions",          sub: "incl. Standard Chartered SC Ventures, DBS, Customers Bank" },
    { label: "Travel rule & KYB coverage",      big: "FATF-compliant  \u00B7  73 markets", sub: "Sumsub + Notabene integration  \u00B7  TRP & IVMS-101" },
    { label: "Audit & assurance",               big: "Big-4 audited",             sub: "SOC 1 / SOC 2 Type II  \u00B7  ISO 27001  \u00B7  ISAE 3000 PoR" },
  ];
  const bw = (SW - 1.2) / 3;
  bottomItems.forEach((bi, i) => {
    const x = 0.6 + i * bw;
    s.addText(bi.label, {
      x, y: 6.28, w: bw - 0.2, h: 0.26,
      fontFace: FONT_SANS, fontSize: 11, color: COLOR.textMute,
      valign: "middle", margin: 0,
    });
    s.addText(bi.big, {
      x, y: 6.52, w: bw - 0.2, h: 0.34,
      fontFace: FONT_SANS, fontSize: 16, color: COLOR.white,
      valign: "middle", margin: 0,
    });
    s.addText(bi.sub, {
      x, y: 6.85, w: bw - 0.2, h: 0.24,
      fontFace: FONT_MONO, fontSize: 8, color: COLOR.textDim,
      valign: "middle", margin: 0,
    });
  });

  // Footer (custom — smaller logo, sits at very bottom)
  s.addShape(pres.shapes.DIAMOND, {
    x: 0.55, y: 7.22, w: 0.16, h: 0.16,
    fill: { type: "none" }, line: { color: COLOR.textDim, width: 1 },
  });
  s.addText("APEX", {
    x: 0.76, y: 7.16, w: 1.2, h: 0.28,
    fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim,
    charSpacing: 4, valign: "middle", margin: 0,
  });
  s.addText("08 / 12", {
    x: SW - 1.6, y: 7.16, w: 1.1, h: 0.28,
    fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim,
    charSpacing: 3, align: "right", valign: "middle", margin: 0,
  });
}

// ============================================================
// SLIDE 9 — COMPETITIVE POSITIONING (table)
// ============================================================
function slide9() {
  const s = pres.addSlide();
  bg(s);

  eyebrow(s, "COMPETITIVE POSITIONING");
  bigTitle(s, "ApeX is the only venue that meets institutional requirements end-to-end.");

  // Pill cell renderer
  const Y = "Yes", N = "No";
  function pillCell(text, kind) {
    let bg, tx;
    if (kind === "good")    { bg = COLOR.pillGreenBg; tx = COLOR.pillGreenTx; }
    else if (kind === "bad"){ bg = COLOR.pillRedBg;   tx = COLOR.pillRedTx;   }
    else                    { bg = COLOR.pillAmberBg; tx = COLOR.pillAmberTx; }
    return {
      text,
      options: {
        fill: { color: bg },
        color: tx,
        fontFace: FONT_MONO, fontSize: 10,
        align: "center", valign: "middle",
        margin: [4, 6, 4, 6],
      },
    };
  }
  function plainCell(text, opts = {}) {
    return {
      text,
      options: {
        color: opts.color || COLOR.text,
        fontFace: opts.font || FONT_SANS,
        fontSize: opts.fontSize || 12,
        bold: !!opts.bold,
        align: opts.align || "left",
        valign: "middle",
        fill: { color: opts.fill || "FFFFFF00" }, // we set fills via row-level fill instead
      },
    };
  }

  // Table with header + 6 rows
  const tableX = 0.6, tableY = 2.85, tableW = SW - 1.2;
  const colW = [3.0, 1.45, 1.45, 1.45, 1.45, 1.4, 1.9]; // sums to ~12.1
  const sumColW = colW.reduce((a, b) => a + b, 0);
  const scale = tableW / sumColW;
  const colWScaled = colW.map(c => c * scale);

  const header = [
    { text: "VENUE",              options: { color: COLOR.textDim, fontFace: FONT_MONO, fontSize: 10, charSpacing: 2, valign: "middle", margin: [6, 6, 6, 6] } },
    { text: "REGULATED\nDM*",     options: { color: COLOR.textDim, fontFace: FONT_MONO, fontSize: 10, charSpacing: 2, valign: "middle", margin: [6, 6, 6, 6] } },
    { text: "SEGREGATED\nCUSTODY",options: { color: COLOR.textDim, fontFace: FONT_MONO, fontSize: 10, charSpacing: 2, valign: "middle", margin: [6, 6, 6, 6] } },
    { text: "PORTFOLIO\nMARGIN",  options: { color: COLOR.textDim, fontFace: FONT_MONO, fontSize: 10, charSpacing: 2, valign: "middle", margin: [6, 6, 6, 6] } },
    { text: "PRIME\nSERVICES",    options: { color: COLOR.textDim, fontFace: FONT_MONO, fontSize: 10, charSpacing: 2, valign: "middle", margin: [6, 6, 6, 6] } },
    { text: "FIX / COLO",         options: { color: COLOR.textDim, fontFace: FONT_MONO, fontSize: 10, charSpacing: 2, valign: "middle", margin: [6, 6, 6, 6] } },
    { text: "AVG. DAILY VOLUME",  options: { color: COLOR.textDim, fontFace: FONT_MONO, fontSize: 10, charSpacing: 2, valign: "middle", align: "right", margin: [6, 6, 6, 6] } },
  ];

  function row(venue, dm, cust, pm, prime, fix, vol, opts = {}) {
    const venueColor = opts.highlight ? COLOR.blue : COLOR.text;
    const venueBold = !!opts.highlight;
    const fillCol = opts.highlight ? "152144" : "0B1220";
    return [
      { text: venue, options: { color: venueColor, bold: venueBold, fontFace: FONT_SANS, fontSize: 13, valign: "middle", margin: [10, 8, 10, 8], fill: { color: fillCol } } },
      Object.assign(pillCell(dm.t,    dm.k),    { options: Object.assign({}, pillCell(dm.t,    dm.k).options,    { fill: { color: fillCol } }) }),
      Object.assign(pillCell(cust.t,  cust.k),  { options: Object.assign({}, pillCell(cust.t,  cust.k).options,  { fill: { color: fillCol } }) }),
      Object.assign(pillCell(pm.t,    pm.k),    { options: Object.assign({}, pillCell(pm.t,    pm.k).options,    { fill: { color: fillCol } }) }),
      Object.assign(pillCell(prime.t, prime.k), { options: Object.assign({}, pillCell(prime.t, prime.k).options, { fill: { color: fillCol } }) }),
      Object.assign(pillCell(fix.t,   fix.k),   { options: Object.assign({}, pillCell(fix.t,   fix.k).options,   { fill: { color: fillCol } }) }),
      { text: vol, options: { color: COLOR.text, fontFace: FONT_SANS, fontSize: 13, valign: "middle", align: "right", margin: [10, 8, 10, 8], fill: { color: fillCol } } },
    ];
  }

  // Re-implement pillCell with explicit fill on entry
  function pCell(text, kind, rowFill) {
    let bgC, tx;
    if (kind === "good")      { bgC = COLOR.pillGreenBg; tx = COLOR.pillGreenTx; }
    else if (kind === "bad")  { bgC = COLOR.pillRedBg;   tx = COLOR.pillRedTx;   }
    else                      { bgC = COLOR.pillAmberBg; tx = COLOR.pillAmberTx; }
    // We can't draw a pill (rounded badge) within a table cell easily,
    // so we render the cell with a solid pill-color fill background.
    // To preserve row striping, we let the cell fill be the pill bg color.
    return {
      text,
      options: {
        fill: { color: bgC },
        color: tx,
        fontFace: FONT_MONO, fontSize: 10,
        align: "center", valign: "middle",
        margin: [6, 8, 6, 8],
      },
    };
  }

  function buildRow(venue, cells, highlight = false) {
    const fillCol = highlight ? "152144" : "0B1220";
    const venueCell = {
      text: venue,
      options: {
        color: highlight ? COLOR.blue : COLOR.text,
        bold: highlight,
        fontFace: FONT_SANS, fontSize: 13,
        valign: "middle", margin: [10, 10, 10, 10],
        fill: { color: fillCol },
      },
    };
    const pillCells = cells.slice(0, 5).map(c => pCell(c.t, c.k));
    const volCell = {
      text: cells[5],
      options: {
        color: COLOR.text, fontFace: FONT_SANS, fontSize: 13,
        align: "right", valign: "middle", margin: [10, 10, 10, 10],
        fill: { color: fillCol },
      },
    };
    return [venueCell, ...pillCells, volCell];
  }

  const rows = [
    header,
    buildRow("ApeX", [
      { t: "Full",    k: "good" },
      { t: "Yes",     k: "good" },
      { t: "Yes",     k: "good" },
      { t: "Yes",     k: "good" },
      { t: "Yes",     k: "good" },
      "$3.1B",
    ], true),
    buildRow("Global Retail Exchange A", [
      { t: "Partial", k: "warn" },
      { t: "Pooled",  k: "warn" },
      { t: "Limited", k: "warn" },
      { t: "No",      k: "bad"  },
      { t: "Yes",     k: "good" },
      "$28.4B",
    ]),
    buildRow("US Listed Exchange B", [
      { t: "Full",    k: "good" },
      { t: "Yes",     k: "good" },
      { t: "No",      k: "bad"  },
      { t: "Limited", k: "warn" },
      { t: "No",      k: "bad"  },
      "$4.8B",
    ]),
    buildRow("European Spot Exchange C", [
      { t: "Full",    k: "good" },
      { t: "Yes",     k: "good" },
      { t: "No",      k: "bad"  },
      { t: "No",      k: "bad"  },
      { t: "Partial", k: "warn" },
      "$2.2B",
    ]),
    buildRow("Derivatives Specialist D", [
      { t: "Partial", k: "warn" },
      { t: "Sub-acct",k: "warn" },
      { t: "Yes",     k: "good" },
      { t: "No",      k: "bad"  },
      { t: "Yes",     k: "good" },
      "$3.6B",
    ]),
    buildRow("CME Crypto Complex", [
      { t: "Full",    k: "good" },
      { t: "CCP",     k: "good" },
      { t: "Yes",     k: "good" },
      { t: "Yes",     k: "good" },
      { t: "Yes",     k: "good" },
      "$8.7B",
    ]),
  ];

  s.addTable(rows, {
    x: tableX, y: tableY, w: tableW,
    colW: colWScaled,
    rowH: 0.5,
    border: { type: "solid", pt: 0.5, color: COLOR.border },
    fontFace: FONT_SANS,
  });

  // Bottom note
  s.addText("The only venue combining a full institutional license stack, segregated custody, and prime-broker products at scale.", {
    x: 0.6, y: 6.45, w: SW - 1.2, h: 0.35,
    fontFace: FONT_SANS, fontSize: 12, color: COLOR.text,
    valign: "middle", margin: 0,
  });
  s.addText("* Designated Market regulator  \u00B7  Source: ApeX research, Q1 2026", {
    x: 0.6, y: 6.78, w: SW - 1.2, h: 0.3,
    fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim,
    valign: "middle", margin: 0,
  });

  footerChrome(s, 9);
}

// ============================================================
// SLIDE 10 — REVENUE MODEL
// ============================================================
function slide10() {
  const s = pres.addSlide();
  bg(s);

  eyebrow(s, "REVENUE MODEL");
  bigTitle(s, "Five compounding fee streams \u2014 the same flywheel that built listed exchanges.");

  const streams = [
    { num: "01 \u00B7 TRADING",   title: "Maker / taker fees",        pct: "62%", desc: "Tiered 1.5\u201310 bps. Volume rebates for tier-1 LPs." },
    { num: "02 \u00B7 FINANCING", title: "Margin & lending spread",   pct: "18%", desc: "Borrow/lend book; net interest margin 4\u20136%." },
    { num: "03 \u00B7 CUSTODY",   title: "AUC fees + staking",        pct: "11%", desc: "15\u201325 bps AUC. Native staking yield share, 20%." },
    { num: "04 \u00B7 LISTINGS",  title: "Listing & data fees",       pct: "5%",  desc: "Vetted listings + market-data feed for prop shops." },
    { num: "05 \u00B7 PRIME",     title: "OTC & structured products", pct: "4%",  desc: "RFQ desk, basis trades, structured notes." },
  ];

  const sx = 0.6;
  const sw = SW - 1.2;
  const colN = 5;
  const colWidth = (sw - (colN - 1) * 0.15) / colN;
  const cy = 2.95;

  streams.forEach((st, i) => {
    const x = sx + i * (colWidth + 0.15);
    // Top accent line
    s.addShape(pres.shapes.LINE, {
      x, y: cy, w: colWidth, h: 0,
      line: { color: COLOR.blue, width: 1 },
    });
    // num eyebrow
    s.addText(st.num, {
      x, y: cy + 0.18, w: colWidth, h: 0.3,
      fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim,
      charSpacing: 2, valign: "middle", margin: 0,
    });
    // title
    s.addText(st.title, {
      x, y: cy + 0.5, w: colWidth, h: 0.65,
      fontFace: FONT_SANS, fontSize: 15, bold: true, color: COLOR.white,
      valign: "top", margin: 0,
    });
    // pct big
    s.addText(st.pct, {
      x, y: cy + 1.15, w: colWidth, h: 0.7,
      fontFace: FONT_SANS, fontSize: 40, color: COLOR.blue,
      valign: "top", margin: 0,
    });
    // of revenue
    s.addText("of revenue", {
      x, y: cy + 1.85, w: colWidth, h: 0.3,
      fontFace: FONT_MONO, fontSize: 10, color: COLOR.textMute,
      valign: "middle", margin: 0,
    });
    // description (toward bottom of card area)
    s.addText(st.desc, {
      x, y: cy + 2.85, w: colWidth, h: 0.7,
      fontFace: FONT_SANS, fontSize: 11, color: COLOR.textMute,
      valign: "top", margin: 0,
    });
  });

  // Bottom divider + KPI row
  hLine(s, 0.6, 6.20, SW - 1.2);
  const kpiRow = [
    { big: "$0.42M", lbl: "Revenue per institutional account  \u00B7  annualized" },
    { big: "88%",    lbl: "Gross margin  \u00B7  variable cost mostly compute & rebates" },
    { big: "102%",   lbl: "Net dollar retention  \u00B7  Q1 2026" },
  ];
  const kw = (SW - 1.2) / 3;
  kpiRow.forEach((k, i) => {
    const x = 0.6 + i * kw;
    s.addText(k.big, {
      x, y: 6.30, w: kw - 0.2, h: 0.46,
      fontFace: FONT_SANS, fontSize: 26, color: COLOR.white,
      valign: "middle", margin: 0,
    });
    s.addText(k.lbl, {
      x, y: 6.76, w: kw - 0.2, h: 0.24,
      fontFace: FONT_SANS, fontSize: 10, color: COLOR.textMute,
      valign: "middle", margin: 0,
    });
  });

  // Custom slim footer to give KPI block more breathing room
  s.addShape(pres.shapes.DIAMOND, {
    x: 0.55, y: 7.22, w: 0.16, h: 0.16,
    fill: { type: "none" }, line: { color: COLOR.textDim, width: 1 },
  });
  s.addText("APEX", {
    x: 0.76, y: 7.16, w: 1.2, h: 0.28,
    fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim,
    charSpacing: 4, valign: "middle", margin: 0,
  });
  s.addText("10 / 12", {
    x: SW - 1.6, y: 7.16, w: 1.1, h: 0.28,
    fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim,
    charSpacing: 3, align: "right", valign: "middle", margin: 0,
  });
}

// ============================================================
// SLIDE 11 — FINANCIAL TRAJECTORY (chart + KPIs)
// ============================================================
function slide11() {
  const s = pres.addSlide();
  bg(s);

  eyebrow(s, "FINANCIAL TRAJECTORY");
  bigTitle(s, "A path to $1.4B revenue and 55% EBITDA margin by 2029.");

  // ---- LEFT: chart panel ----
  const px = 0.6, py = 3.0, pw = 6.9, ph = 4.05;
  s.addShape(pres.shapes.RECTANGLE, {
    x: px, y: py, w: pw, h: ph,
    fill: { color: COLOR.bgPanel2 }, line: { color: COLOR.border, width: 0.75 },
  });

  s.addText("REVENUE  \u00B7  2024A \u2013 2029E", {
    x: px + 0.3, y: py + 0.2, w: 3.4, h: 0.3,
    fontFace: FONT_MONO, fontSize: 10, color: COLOR.textDim,
    charSpacing: 3, valign: "middle", margin: 0,
  });
  s.addText("USD millions, fiscal year ending Dec", {
    x: px + 0.3, y: py + 0.5, w: 5, h: 0.3,
    fontFace: FONT_SANS, fontSize: 12, color: COLOR.text,
    valign: "middle", margin: 0,
  });
  // legend
  s.addShape(pres.shapes.RECTANGLE, {
    x: px + pw - 2.55, y: py + 0.32, w: 0.14, h: 0.14,
    fill: { color: COLOR.blue }, line: { type: "none" },
  });
  s.addText("Revenue", {
    x: px + pw - 2.40, y: py + 0.22, w: 0.7, h: 0.3,
    fontFace: FONT_MONO, fontSize: 10, color: COLOR.textMute,
    valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.OVAL, {
    x: px + pw - 1.55, y: py + 0.34, w: 0.12, h: 0.12,
    fill: { color: COLOR.amber }, line: { type: "none" },
  });
  s.addText("EBITDA margin", {
    x: px + pw - 1.40, y: py + 0.22, w: 1.45, h: 0.3,
    fontFace: FONT_MONO, fontSize: 10, color: COLOR.textMute,
    valign: "middle", margin: 0,
  });

  // Chart axes/area
  const cax = px + 0.65, cay = py + 1.05, caw = pw - 0.9, cah = 2.6;
  // grid
  ["$1500", "$1125", "$750", "$375", "$0"].forEach((lab, i) => {
    s.addText(lab, {
      x: px + 0.05, y: cay + (cah / 4) * i - 0.1, w: 0.55, h: 0.22,
      fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim,
      align: "right", valign: "middle", margin: 0,
    });
    if (i > 0) {
      s.addShape(pres.shapes.LINE, {
        x: cax, y: cay + (cah / 4) * i, w: caw, h: 0,
        line: { color: COLOR.border, width: 0.4 },
      });
    }
  });

  // Bars (revenue)
  const years = ["2024A", "2025A", "2026E", "2027E", "2028E", "2029E"];
  const rev   = [32, 148, 385, 720, 1080, 1420];
  const margin= [-8, 18, 38, 49, 55, 55]; // EBITDA margin %
  const maxR = 1500;
  const marginMin = -10, marginMax = 60; // padded so -8% sits inside the chart area
  const slot = caw / years.length;
  const barW = slot * 0.6;

  const bxArr = [];
  rev.forEach((v, i) => {
    const bx = cax + i * slot + (slot - barW) / 2;
    const bh = (v / maxR) * cah;
    bxArr.push(bx + barW / 2);
    s.addShape(pres.shapes.RECTANGLE, {
      x: bx, y: cay + cah - bh, w: barW, h: bh,
      fill: { color: COLOR.blue }, line: { type: "none" },
    });
    // value label above bar
    s.addText(`$${v}M`, {
      x: bx - 0.3, y: cay + cah - bh - 0.32, w: barW + 0.6, h: 0.25,
      fontFace: FONT_SANS, fontSize: 10, color: COLOR.white, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    // margin % inside bar
    s.addText(`${margin[i] >= 0 ? margin[i] : margin[i]}%`, {
      x: bx, y: cay + cah - bh + 0.05, w: barW, h: 0.22,
      fontFace: FONT_MONO, fontSize: 8, color: COLOR.text,
      align: "center", valign: "middle", margin: 0,
    });
  });

  // EBITDA margin line + dots (overlay) — drawn BEFORE year labels so labels sit on top
  const mYs = margin.map(m => cay + cah - ((m - marginMin) / (marginMax - marginMin)) * cah);
  for (let i = 0; i < years.length - 1; i++) {
    segLine(s, bxArr[i], mYs[i], bxArr[i + 1], mYs[i + 1], { color: COLOR.amber, width: 2 });
  }
  bxArr.forEach((bx, i) => {
    s.addShape(pres.shapes.OVAL, {
      x: bx - 0.07, y: mYs[i] - 0.07, w: 0.14, h: 0.14,
      fill: { color: COLOR.amber }, line: { color: COLOR.bg, width: 1 },
    });
  });

  // Year labels — drawn last so they render on top of any line/marker overlap
  years.forEach((yr, i) => {
    const bx = cax + i * slot + (slot - barW) / 2;
    // small bg chip behind label so the marker dot doesn't bleed into the text
    s.addShape(pres.shapes.RECTANGLE, {
      x: bx - 0.18, y: cay + cah + 0.06, w: barW + 0.36, h: 0.22,
      fill: { color: COLOR.bgPanel2 }, line: { type: "none" },
    });
    s.addText(yr, {
      x: bx - 0.2, y: cay + cah + 0.05, w: barW + 0.4, h: 0.22,
      fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim,
      align: "center", valign: "middle", margin: 0,
    });
  });

  // ---- RIGHT: KPIs grid ----
  const rx = 7.85, rw = SW - rx - 0.6;
  sectionLabel(s, "OPERATING KPIS  \u00B7  2029E", rx, 3.0, rw);
  hLine(s, rx, 3.35, rw);

  const kpis = [
    ["$1.4T",   "Annual notional volume"],
    ["3,400",   "Institutional accounts"],
    ["$48B",    "Assets under custody"],
    ["10.1 bps","Blended take rate"],
    ["$780M",   "EBITDA"],
    ["62\u00D7","Volume CAGR vs. 2024A"],
  ];
  const cellW = rw / 2;
  const cellH = 0.85;
  let gy = 3.45;
  for (let i = 0; i < kpis.length; i += 2) {
    [0, 1].forEach(j => {
      const k = kpis[i + j];
      if (!k) return;
      const x = rx + j * cellW;
      s.addText(k[0], {
        x, y: gy, w: cellW - 0.1, h: 0.45,
        fontFace: FONT_SANS, fontSize: 24, color: COLOR.white,
        valign: "middle", margin: 0,
      });
      s.addText(k[1], {
        x, y: gy + 0.45, w: cellW - 0.1, h: 0.3,
        fontFace: FONT_SANS, fontSize: 11, color: COLOR.textMute,
        valign: "middle", margin: 0,
      });
    });
    gy += cellH;
    hLine(s, rx, gy, rw);
  }

  // Bull-case footnote
  s.addText("Bull-case figures  \u00B7  assumes regulatory approvals on plan and 28% institutional volume share at maturity.", {
    x: rx, y: gy + 0.1, w: rw, h: 0.6,
    fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim,
    valign: "top", margin: 0,
  });

  footerChrome(s, 11);
}

// ============================================================
// SLIDE 12 — THE ASK
// ============================================================
function slide12() {
  const s = pres.addSlide();
  bg(s);

  eyebrow(s, "THE ASK");
  bigTitle(s, "$120M Series B to capture the institutional window before it closes.");

  // ---- LEFT: ROUND TERMS ----
  const lx = 0.6, lw = 6.0;
  sectionLabel(s, "ROUND TERMS  \u00B7  INDICATIVE", lx, 2.95, lw);
  hLine(s, lx, 3.30, lw);

  const terms = [
    ["Round size",          "$120M",         COLOR.text],
    ["Pre-money",           "$1.4B",         COLOR.text],
    ["Lead",                "$60M committed",COLOR.text],
    ["Available allocation","$45M",          COLOR.blue],
    ["Close target",        "Q3 2026",       COLOR.text],
  ];
  let ty = 3.45;
  const trh = 0.55;
  terms.forEach((t, i) => {
    s.addText(t[0], {
      x: lx, y: ty, w: lw - 2.5, h: trh,
      fontFace: FONT_SANS, fontSize: 14, color: COLOR.textMute,
      valign: "middle", margin: 0,
    });
    s.addText(t[1], {
      x: lx + lw - 2.5, y: ty, w: 2.5, h: trh,
      fontFace: FONT_SANS, fontSize: 14, color: t[2], bold: t[2] === COLOR.blue,
      align: "right", valign: "middle", margin: 0,
    });
    hLine(s, lx, ty + trh, lw);
    ty += trh;
  });

  // ---- RIGHT: USE OF PROCEEDS (with progress bars) ----
  const rx = 7.0, rw = SW - rx - 0.6;
  sectionLabel(s, "USE OF PROCEEDS", rx, 2.95, rw);

  const uses = [
    { label: "Insurance fund & regulatory capital",     amt: "$54M  \u00B7  45%", frac: 0.45 },
    { label: "Engineering & matching engine R&D",       amt: "$30M  \u00B7  25%", frac: 0.25 },
    { label: "Licensing \u2014 MAS, MiCA, FSA Japan",   amt: "$18M  \u00B7  15%", frac: 0.15 },
    { label: "Institutional sales & prime onboarding",  amt: "$12M  \u00B7  10%", frac: 0.10 },
    { label: "Liquidity incentives & market-maker rebates", amt: "$6M  \u00B7  5%",  frac: 0.05 },
  ];
  let uy = 3.40;
  const uH = 0.58;
  uses.forEach(u => {
    s.addText(u.label, {
      x: rx, y: uy, w: rw - 1.7, h: 0.30,
      fontFace: FONT_SANS, fontSize: 13, color: COLOR.text,
      valign: "middle", margin: 0,
    });
    s.addText(u.amt, {
      x: rx + rw - 1.7, y: uy, w: 1.7, h: 0.30,
      fontFace: FONT_MONO, fontSize: 11, color: COLOR.text,
      align: "right", valign: "middle", margin: 0,
    });
    // bar track
    s.addShape(pres.shapes.RECTANGLE, {
      x: rx, y: uy + 0.34, w: rw, h: 0.08,
      fill: { color: COLOR.bgPanel }, line: { type: "none" },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: rx, y: uy + 0.34, w: rw * u.frac, h: 0.08,
      fill: { color: COLOR.blue }, line: { type: "none" },
    });
    uy += uH;
  });

  // ---- Bottom: closing italic + contact ----
  // bars finish at ~6.32; place italic + contact at 6.55 to clear them
  s.addText(
    [
      { text: "The window for an independent, institution-first venue closes once a default winner emerges. ", options: { color: COLOR.textMute } },
      { text: "We intend to be that winner.", options: { color: COLOR.white, bold: true } },
    ],
    {
      x: 0.6, y: 6.55, w: 8.0, h: 0.55,
      fontFace: FONT_SANS, fontSize: 13, italic: true,
      valign: "top", margin: 0,
    }
  );

  // Contact block — compact, single row of mono text under bold "Contact"
  s.addText("Contact", {
    x: SW - 3.4, y: 6.55, w: 2.8, h: 0.26,
    fontFace: FONT_SANS, fontSize: 11, bold: true, color: COLOR.text,
    align: "right", valign: "middle", margin: 0,
  });
  s.addText("ir@apex.markets   \u00B7   DIFC, Dubai", {
    x: SW - 3.4, y: 6.80, w: 2.8, h: 0.26,
    fontFace: FONT_MONO, fontSize: 10, color: COLOR.blue,
    align: "right", valign: "middle", margin: 0,
  });

  // Footer (slim version - sits flush at bottom)
  s.addShape(pres.shapes.DIAMOND, {
    x: 0.55, y: 7.22, w: 0.16, h: 0.16,
    fill: { type: "none" }, line: { color: COLOR.textDim, width: 1 },
  });
  s.addText("APEX", {
    x: 0.76, y: 7.16, w: 1.2, h: 0.28,
    fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim,
    charSpacing: 4, valign: "middle", margin: 0,
  });
  s.addText("12 / 12", {
    x: SW - 1.6, y: 7.16, w: 1.1, h: 0.28,
    fontFace: FONT_MONO, fontSize: 9, color: COLOR.textDim,
    charSpacing: 3, align: "right", valign: "middle", margin: 0,
  });
}

// ---------- Build ----------
slide1();
slide2();
slide3();
slide4();
slide5();
slide6();
slide7();
slide8();
slide9();
slide10();
slide11();
slide12();

pres.writeFile({ fileName: "ApeX-_2.pptx" }).then(fn => {
  console.log("Wrote: " + fn);
});
