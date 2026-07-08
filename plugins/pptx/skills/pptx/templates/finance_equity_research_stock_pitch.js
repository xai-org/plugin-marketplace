/**
 * Recreate PYPL Investment Memo deck via pptxgenjs.
 * Layout: LAYOUT_WIDE (13.333" x 7.5")
 */

const pptxgen = require("pptxgenjs");

// ---- Palette ----------------------------------------------------------------
const C = {
  ink:        "0F0F0E", // near-black for dark slides
  cream:      "F1EDE2", // parchment body background
  creamSoft:  "E8E2D2", // card fill on cream slides
  creamLine:  "C9C2AF", // hairlines on cream
  textDark:   "1A1A18", // body text on cream
  textMute:   "6B6657", // muted/secondary text on cream
  textOnDark: "E8E2D2", // body text on dark
  textMuteDk: "8A8470", // muted on dark
  gold:       "B8923B", // accent gold
  goldSoft:   "D9B772", // softer gold (italic accent on slide 4)
  rust:       "8B2E1F", // terracotta / accent rust
  rustDark:   "6B2415", // darker rust (slide 4 background)
  hairline:   "B8B2A0",
};

// ---- Fonts ------------------------------------------------------------------
const F = {
  serif: "Georgia",     // display + body serif
  mono:  "Courier New", // monospaced labels
  sans:  "Calibri",     // body sans
};

// ---- Layout constants -------------------------------------------------------
const SLIDE_W = 13.333;
const SLIDE_H = 7.5;
const MARGIN_X = 0.6;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Meridian Capital";
pres.title  = "PYPL Investment Memo";

// =============================================================================
// Helper: page header band (kicker top-left, confidential top-right, hairline)
// =============================================================================
function addHeader(slide, kicker, page, opts = {}) {
  const dark = !!opts.dark;
  const kickerColor = dark ? C.textOnDark : C.textDark;
  const muteColor   = dark ? C.textMuteDk : C.textMute;
  const lineColor   = dark ? C.textMuteDk : C.hairline;

  slide.addText(kicker, {
    x: MARGIN_X, y: 0.38, w: 8, h: 0.35,
    fontFace: F.mono, fontSize: 11, bold: true,
    color: kickerColor, charSpacing: 4, margin: 0,
  });

  if (opts.confidential) {
    slide.addText(opts.confidential, {
      x: SLIDE_W - 4 - MARGIN_X, y: 0.38, w: 4, h: 0.35,
      fontFace: F.mono, fontSize: 10,
      color: muteColor, charSpacing: 3, align: "right", margin: 0,
    });
  } else {
    slide.addText(page, {
      x: SLIDE_W - 1.2 - MARGIN_X, y: 0.38, w: 1.2, h: 0.35,
      fontFace: F.mono, fontSize: 10,
      color: muteColor, charSpacing: 3, align: "right", margin: 0,
    });
  }

  // Hairline under header
  slide.addShape(pres.shapes.LINE, {
    x: MARGIN_X, y: 0.78, w: SLIDE_W - MARGIN_X * 2, h: 0,
    line: { color: lineColor, width: 0.5 },
  });
}

// =============================================================================
// Helper: footer band (left tag, right page number, hairline above)
// =============================================================================
function addFooter(slide, leftTag, page, opts = {}) {
  const dark = !!opts.dark;
  const muteColor = dark ? C.textMuteDk : C.textMute;
  const lineColor = dark ? C.textMuteDk : C.hairline;

  slide.addShape(pres.shapes.LINE, {
    x: MARGIN_X, y: 7.0, w: SLIDE_W - MARGIN_X * 2, h: 0,
    line: { color: lineColor, width: 0.5 },
  });

  slide.addText(leftTag, {
    x: MARGIN_X, y: 7.08, w: 9, h: 0.32,
    fontFace: F.mono, fontSize: 10,
    color: muteColor, charSpacing: 3, margin: 0,
  });

  slide.addText(page, {
    x: SLIDE_W - 1.4 - MARGIN_X, y: 7.08, w: 1.4, h: 0.32,
    fontFace: F.mono, fontSize: 10,
    color: muteColor, charSpacing: 3, align: "right", margin: 0,
  });
}

// =============================================================================
// SLIDE 1 — Title / cover
// =============================================================================
function buildSlide1() {
  const s = pres.addSlide();
  s.background = { color: C.ink };

  addHeader(s, "MERIDIAN CAPITAL  ·  INTERNAL MEMO", "01 / 09", {
    dark: true,
    confidential: "CONFIDENTIAL  ·  APR 2026",
  });

  // LEFT: kicker + giant PYPL logotype
  s.addText("LONG IDEA / SINGLE NAME", {
    x: MARGIN_X, y: 3.55, w: 7, h: 0.35,
    fontFace: F.mono, fontSize: 12,
    color: C.textMuteDk, charSpacing: 4, margin: 0,
  });

  // PYPL — "P" in cream, "YPL" in gold italic
  s.addText(
    [
      { text: "P",   options: { color: C.textOnDark, italic: false } },
      { text: "YPL", options: { color: C.gold, italic: true } },
    ],
    {
      x: MARGIN_X - 0.1, y: 3.85, w: 7.2, h: 2.5,
      fontFace: F.serif, fontSize: 180, bold: false, margin: 0,
      valign: "top",
    }
  );

  // RIGHT: thesis block
  const RX = 7.4;
  const RW = SLIDE_W - RX - MARGIN_X;

  s.addText("THESIS", {
    x: RX, y: 2.85, w: RW, h: 0.3,
    fontFace: F.mono, fontSize: 11, charSpacing: 4,
    color: C.textMuteDk, margin: 0,
  });
  s.addText("A profitable, cash-generative payments network trading like a melting ice cube.", {
    x: RX, y: 3.2, w: RW, h: 1.3,
    fontFace: F.serif, fontSize: 22,
    color: C.textOnDark, margin: 0, valign: "top",
  });

  // Divider
  s.addShape(pres.shapes.LINE, {
    x: RX, y: 4.55, w: RW, h: 0,
    line: { color: C.textMuteDk, width: 0.5 },
  });

  // 2x2 metadata grid
  const grid = [
    { label: "RECOMMENDATION", value: "Initiate Long",  col: 0, row: 0 },
    { label: "ALLOCATION",     value: "$750K / 5.0%",   col: 1, row: 0 },
    { label: "ANALYST",        value: "PM Review",      col: 0, row: 1 },
    { label: "HORIZON",        value: "18\u201324 mo.", col: 1, row: 1 },
  ];
  const colW = RW / 2;
  const rowH = 0.85;
  const gridY = 4.85;
  grid.forEach((g) => {
    const gx = RX + g.col * colW;
    const gy = gridY + g.row * rowH;
    s.addText(g.label, {
      x: gx, y: gy, w: colW - 0.1, h: 0.28,
      fontFace: F.mono, fontSize: 10, charSpacing: 3,
      color: C.textMuteDk, margin: 0,
    });
    s.addText(g.value, {
      x: gx, y: gy + 0.28, w: colW - 0.1, h: 0.45,
      fontFace: F.serif, fontSize: 18,
      color: C.textOnDark, margin: 0,
    });
  });

  addFooter(s, "PYPL  ·  NASDAQ", "01 / 09", { dark: true });
}

// =============================================================================
// SLIDE 2 — Situation: metrics grid + setup paragraph
// =============================================================================
function buildSlide2() {
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addHeader(s, "SITUATION", "02");

  // Section kicker (rust)
  s.addText("\u2014 WHERE THE STOCK SITS TODAY", {
    x: MARGIN_X, y: 1.0, w: 8, h: 0.3,
    fontFace: F.mono, fontSize: 11, charSpacing: 4,
    color: C.rust, margin: 0,
  });

  // Big headline (serif)
  s.addText("A scaled payments franchise priced as if growth were already gone.", {
    x: MARGIN_X, y: 1.35, w: 9.5, h: 1.5,
    fontFace: F.serif, fontSize: 36,
    color: C.textDark, margin: 0, valign: "top",
  });

  // LEFT: metrics grid (2 cols x 4 rows)
  const metrics = [
    { l: "PRICE (4/24)",     v: "$50.48", suffix: "" },
    { l: "MARKET CAP",       v: "$45.4",  suffix: "B" },
    { l: "TRAILING P/E",     v: "9.3",    suffix: "x" },
    { l: "FORWARD P/E",      v: "9.5",    suffix: "x" },
    { l: "EV / EBITDA",      v: "7.1",    suffix: "x" },
    { l: "EV / FCF",         v: "8.5",    suffix: "x" },
    { l: "ACTIVE ACCOUNTS",  v: "439",    suffix: "M" },
    { l: "FY25 TPV",         v: "$1.7",   suffix: "T" },
  ];

  const gridX = MARGIN_X;
  const gridY = 3.4;
  const gridW = 6.0;
  const colW  = gridW / 2;
  const rowH  = 0.78;

  // Top divider
  s.addShape(pres.shapes.LINE, {
    x: gridX, y: gridY, w: gridW, h: 0,
    line: { color: C.hairline, width: 0.5 },
  });

  metrics.forEach((m, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx  = gridX + col * colW;
    const cy  = gridY + row * rowH + 0.05;

    s.addText(m.l, {
      x: cx + 0.15, y: cy + 0.02, w: colW - 0.3, h: 0.26,
      fontFace: F.mono, fontSize: 10, charSpacing: 3,
      color: C.textMute, margin: 0,
    });
    s.addText(
      [
        { text: m.v, options: { fontSize: 22, color: C.textDark } },
        { text: m.suffix ? "  " + m.suffix : "", options: { fontSize: 11, color: C.textMute } },
      ],
      {
        x: cx + 0.15, y: cy + 0.28, w: colW - 0.3, h: 0.42,
        fontFace: F.serif, margin: 0, valign: "top",
      }
    );

    // Horizontal hairline below each row (except last); col separator
    if (row < 3) {
      // bottom hairline of this row
      s.addShape(pres.shapes.LINE, {
        x: gridX, y: cy + rowH - 0.05, w: gridW, h: 0,
        line: { color: C.hairline, width: 0.5 },
      });
    }
  });

  // Bottom divider for the grid
  s.addShape(pres.shapes.LINE, {
    x: gridX, y: gridY + 4 * rowH, w: gridW, h: 0,
    line: { color: C.hairline, width: 0.5 },
  });
  // Column separator (vertical)
  s.addShape(pres.shapes.LINE, {
    x: gridX + colW, y: gridY, w: 0, h: 4 * rowH,
    line: { color: C.hairline, width: 0.5 },
  });

  // RIGHT: "THE SETUP"
  const RX = 7.4;
  const RW = SLIDE_W - RX - MARGIN_X;

  s.addText("\u2014 THE SETUP", {
    x: RX, y: gridY + 0.05, w: RW, h: 0.3,
    fontFace: F.mono, fontSize: 11, charSpacing: 4,
    color: C.rust, margin: 0,
  });
  s.addText("Down ~36% from the 52-week high. Same business, different multiple.", {
    x: RX, y: gridY + 0.4, w: RW, h: 1.0,
    fontFace: F.serif, fontSize: 20,
    color: C.textDark, margin: 0, valign: "top",
  });

  s.addText(
    [
      { text: "FY25 EPS grew ~15%, the company bought back ~$6B of stock, and initiated a $0.14 quarterly dividend. Yet PYPL trades at " },
      { text: "9.3x", options: { fontFace: F.mono } },
      { text: " earnings \u2014 roughly 30% below the financial-services average and 77% below its own ten-year mean of " },
      { text: "~40x", options: { fontFace: F.mono } },
      { text: "." },
    ],
    {
      x: RX, y: gridY + 1.55, w: RW, h: 1.6,
      fontFace: F.sans, fontSize: 13,
      color: C.textDark, margin: 0, valign: "top",
      paraSpaceAfter: 0,
    }
  );

  s.addText("Source: Yahoo Finance, FullRatio, StockAnalysis (Apr 2026)", {
    x: RX, y: gridY + 3.2, w: RW, h: 0.3,
    fontFace: F.sans, fontSize: 11,
    color: C.textMute, italic: false, margin: 0,
  });

  addFooter(s, "PYPL  ·  INVESTMENT MEMO", "02 / 09");
}

// =============================================================================
// SLIDE 3 — Thesis: three column cards
// =============================================================================
function buildSlide3() {
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addHeader(s, "THESIS", "03");

  s.addText("\u2014 THREE REASONS THE PRICE IS WRONG", {
    x: MARGIN_X, y: 1.0, w: 9, h: 0.3,
    fontFace: F.mono, fontSize: 11, charSpacing: 4,
    color: C.rust, margin: 0,
  });

  s.addText("Deep value, intact economics, optionality on the turnaround.", {
    x: MARGIN_X, y: 1.35, w: 12, h: 1.5,
    fontFace: F.serif, fontSize: 36,
    color: C.textDark, margin: 0, valign: "top",
  });

  // Three cards
  const cards = [
    {
      kicker: "I  ·  VALUATION",
      title:  "Priced like a no-growth utility.",
      body:   "9.3x trailing earnings against a 10-yr average near 40x and a peer average above 30x. Even modest re-rating to a mid-teens multiple implies meaningful upside before any earnings growth.",
      stat:   "77%",
      caption:"Below 10y mean",
      bigFont: F.serif,
    },
    {
      kicker: "II  ·  CASH ENGINE",
      title:  "The buyback is the catalyst we already own.",
      body:   "~$6B of repurchases in 2025 against a $45B cap retires the float at >13% per year. Shares outstanding already down 6.8% YoY. Compounds EPS even with flat top-line.",
      stat:   "~13%",
      caption:"Annual share retirement",
      bigFont: F.serif,
    },
    {
      kicker: "III  ·  OPTIONALITY",
      title:  "Free call on agentic-AI commerce & Venmo monetization.",
      body:   "Chriss-led pivot to Fastlane checkout, agentic payments and Venmo ads. We pay nothing for execution; any traction re-rates the multiple.",
      stat:   "$123",
      caption:"DCF fair value (Simply Wall St)",
      bigFont: F.serif,
    },
  ];

  const cardY = 3.4;
  const cardH = 3.45;
  const gap   = 0.25;
  const totalW = SLIDE_W - MARGIN_X * 2;
  const cardW = (totalW - 2 * gap) / 3;

  cards.forEach((c, i) => {
    const cx = MARGIN_X + i * (cardW + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardY, w: cardW, h: cardH,
      fill: { color: C.creamSoft },
      line: { color: C.creamSoft, width: 0 },
    });

    // Kicker
    s.addText(c.kicker, {
      x: cx + 0.3, y: cardY + 0.25, w: cardW - 0.6, h: 0.3,
      fontFace: F.mono, fontSize: 10, charSpacing: 4,
      color: C.rust, margin: 0,
    });
    // Title
    s.addText(c.title, {
      x: cx + 0.3, y: cardY + 0.6, w: cardW - 0.6, h: 1.05,
      fontFace: F.serif, fontSize: 18,
      color: C.textDark, margin: 0, valign: "top",
    });
    // Body
    s.addText(c.body, {
      x: cx + 0.3, y: cardY + 1.65, w: cardW - 0.6, h: 1.2,
      fontFace: F.sans, fontSize: 11.5,
      color: C.textDark, margin: 0, valign: "top",
    });

    // Stat row at bottom
    s.addText(
      [
        { text: c.stat, options: { fontSize: 38, color: C.textDark } },
        { text: "  " + c.caption, options: { fontSize: 11, color: C.textMute, fontFace: F.sans } },
      ],
      {
        x: cx + 0.3, y: cardY + cardH - 0.95, w: cardW - 0.6, h: 0.85,
        fontFace: F.serif, margin: 0, valign: "top",
      }
    );
  });

  addFooter(s, "PYPL  ·  INVESTMENT MEMO", "03 / 09");
}

// =============================================================================
// SLIDE 4 — Section divider, terracotta background
// =============================================================================
function buildSlide4() {
  const s = pres.addSlide();
  s.background = { color: C.rustDark };

  addHeader(s, "PART TWO", "04", { dark: true });

  s.addText("\u2014 SECTION II", {
    x: MARGIN_X, y: 2.1, w: 8, h: 0.3,
    fontFace: F.mono, fontSize: 11, charSpacing: 4,
    color: C.goldSoft, margin: 0,
  });

  s.addText(
    [
      { text: "Cheaper than its peers, ", options: { italic: false, color: C.cream } },
      { text: "cheaper than itself.",     options: { italic: true,  color: C.goldSoft } },
    ],
    {
      x: MARGIN_X, y: 2.5, w: SLIDE_W - MARGIN_X * 2, h: 3.6,
      fontFace: F.serif, fontSize: 78,
      margin: 0, valign: "top",
    }
  );

  addFooter(s, "COMPARABLE MULTIPLES  ·  HISTORICAL CONTEXT", "04 / 09", { dark: true });
}

// =============================================================================
// SLIDE 5 — Peer comp table
// =============================================================================
function buildSlide5() {
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addHeader(s, "PEER MULTIPLES", "05");

  s.addText("\u2014 PAYMENTS & SOFTWARE COMP SET", {
    x: MARGIN_X, y: 1.0, w: 9, h: 0.3,
    fontFace: F.mono, fontSize: 11, charSpacing: 4,
    color: C.rust, margin: 0,
  });

  s.addText("PYPL is the cheapest profitable payments name in the comp set.", {
    x: MARGIN_X, y: 1.35, w: 12, h: 1.4,
    fontFace: F.serif, fontSize: 32,
    color: C.textDark, margin: 0, valign: "top",
  });

  // Custom table built from rows of text + lines (row 1 = highlighted dark band)
  const tblX = MARGIN_X;
  const tblY = 3.0;
  const tblW = SLIDE_W - MARGIN_X * 2;

  // Column layout: name (with ticker below) + 5 numeric columns
  const colWeights = [3.4, 1.6, 1.5, 1.7, 2.2, 1.7];
  const totalWeight = colWeights.reduce((a,b) => a+b, 0);
  const colWidths = colWeights.map(w => (tblW * w) / totalWeight);
  const colX = [];
  let cur = tblX;
  colWidths.forEach(w => { colX.push(cur); cur += w; });

  const headers = ["COMPANY", "MKT CAP", "FWD P/E", "EV / EBITDA", "REV GROWTH (YOY)", "FCF YIELD"];

  // Header row
  headers.forEach((h, i) => {
    const align = i === 0 ? "left" : "right";
    s.addText(h, {
      x: colX[i] + (i === 0 ? 0.05 : 0), y: tblY, w: colWidths[i] - 0.1, h: 0.4,
      fontFace: F.mono, fontSize: 10, charSpacing: 3,
      color: C.textMute, align, margin: 0,
    });
  });
  // Hairline under header
  s.addShape(pres.shapes.LINE, {
    x: tblX, y: tblY + 0.45, w: tblW, h: 0,
    line: { color: C.hairline, width: 0.5 },
  });

  // Data rows
  const rows = [
    { name: "PayPal",     ticker: "PYPL",  vals: ["$45B",  "9.5x", "7.1x", "~4%",  "~12%"],  highlight: true },
    { name: "Visa",       ticker: "V",     vals: ["$640B", "28x",  "22x",  "~10%", "~3.5%"], highlight: false },
    { name: "Mastercard", ticker: "MA",    vals: ["$510B", "31x",  "25x",  "~12%", "~3%"],   highlight: false },
    { name: "XYZ Block",  ticker: "XYZ",   vals: ["$45B",  "19x",  "14x",  "~9%",  "~5%"],   highlight: false },
    { name: "Adyen",      ticker: "ADYEY", vals: ["$48B",  "36x",  "25x",  "~22%", "~2%"],   highlight: false },
    { name: "Shopify",    ticker: "SHOP",  vals: ["$155B", "62x",  "48x",  "~24%", "~2%"],   highlight: false },
  ];

  const rowH = 0.55;
  const rowsStartY = tblY + 0.5;

  rows.forEach((r, i) => {
    const ry = rowsStartY + i * rowH;

    // Highlight band (PYPL row only, spans columns 1..3)
    if (r.highlight) {
      // Dark band that starts at company column and extends through "EV / EBITDA"
      const bandStart = tblX;
      const bandEnd   = colX[3] + colWidths[3];
      s.addShape(pres.shapes.RECTANGLE, {
        x: bandStart, y: ry, w: bandEnd - bandStart, h: rowH,
        fill: { color: C.ink }, line: { color: C.ink, width: 0 },
      });
      // Lighter band continues across rev growth + fcf yield
      const band2Start = colX[4];
      const band2End   = colX[5] + colWidths[5];
      s.addShape(pres.shapes.RECTANGLE, {
        x: band2Start, y: ry, w: band2End - band2Start, h: rowH,
        fill: { color: C.ink }, line: { color: C.ink, width: 0 },
      });
    }

    const nameColor   = r.highlight ? C.cream      : C.textDark;
    const tickerColor = r.highlight ? C.textMuteDk : C.textMute;
    const valColor    = r.highlight ? C.cream      : C.textDark;

    // Company name + ticker (stacked)
    s.addText(r.name, {
      x: colX[0] + 0.1, y: ry + 0.05, w: colWidths[0] - 0.2, h: 0.3,
      fontFace: F.serif, fontSize: 16,
      color: nameColor, margin: 0,
    });
    s.addText(r.ticker, {
      x: colX[0] + 0.1, y: ry + 0.32, w: colWidths[0] - 0.2, h: 0.22,
      fontFace: F.mono, fontSize: 9, charSpacing: 3,
      color: tickerColor, margin: 0,
    });

    // Numeric values
    r.vals.forEach((v, j) => {
      s.addText(v, {
        x: colX[j+1], y: ry + 0.13, w: colWidths[j+1] - 0.05, h: 0.4,
        fontFace: F.mono, fontSize: 13,
        color: valColor, align: "right", margin: 0,
      });
    });

    // Hairline under each row
    s.addShape(pres.shapes.LINE, {
      x: tblX, y: ry + rowH, w: tblW, h: 0,
      line: { color: C.hairline, width: 0.5 },
    });
  });

  // Source line at bottom
  s.addText("INDICATIVE MULTIPLES  ·  SPRING 2026  ·  SOURCE: YAHOO FINANCE, STOCKANALYSIS, SIMPLY WALL ST", {
    x: MARGIN_X, y: 6.95, w: SLIDE_W - MARGIN_X * 2 - 1.0, h: 0.3,
    fontFace: F.mono, fontSize: 9.5, charSpacing: 3,
    color: C.textMute, margin: 0,
  });
  s.addText("05 / 09", {
    x: SLIDE_W - 1.0 - MARGIN_X, y: 6.95, w: 1.0, h: 0.3,
    fontFace: F.mono, fontSize: 10, charSpacing: 3,
    color: C.textMute, align: "right", margin: 0,
  });
  // Hairline
  s.addShape(pres.shapes.LINE, {
    x: MARGIN_X, y: 6.92, w: SLIDE_W - MARGIN_X * 2, h: 0,
    line: { color: C.hairline, width: 0.5 },
  });
}

// =============================================================================
// SLIDE 6 — Historical valuation: line chart + 3 stat blocks
// =============================================================================
function buildSlide6() {
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addHeader(s, "HISTORICAL VALUATION", "06");

  s.addText("\u2014 PYPL TRAILING P/E, 2015\u20132026", {
    x: MARGIN_X, y: 1.05, w: 9, h: 0.3,
    fontFace: F.mono, fontSize: 11, charSpacing: 4,
    color: C.rust, margin: 0,
  });

  s.addText("Trading at the lowest multiple of its public life.", {
    x: MARGIN_X, y: 1.4, w: 12, h: 1.0,
    fontFace: F.serif, fontSize: 32,
    color: C.textDark, margin: 0, valign: "top",
  });

  // ---- LEFT: Area chart ---------------------------------------------------
  // Approximate annual trailing P/E from 2015 to 2026
  const labels = ["'15","'16","'17","'18","'19","'20","'21","'22","'23","'24","'25","'26"];
  const values = [ 23,  28,   42,  58,   65,  79,   55,  38,  30,   22,  12,   9.3 ];

  s.addChart(pres.charts.AREA, [
    { name: "Trailing P/E", labels, values }
  ], {
    x: 0.4, y: 2.65, w: 6.4, h: 4.0,
    chartArea: { fill: { color: C.cream }, border: { color: C.cream, pt: 0 } },
    plotArea:  { fill: { color: C.cream } },
    chartColors: [C.creamLine],
    chartColorsOpacity: 60,
    lineDataSymbol: "none",
    lineSize: 2,
    showLegend: false,
    showTitle: false,

    catAxisLabelFontFace: F.mono,
    catAxisLabelFontSize: 9,
    catAxisLabelColor: C.textMute,
    catAxisLineColor: C.hairline,
    catGridLine: { style: "none" },

    valAxisLabelFontFace: F.mono,
    valAxisLabelFontSize: 9,
    valAxisLabelColor: C.textMute,
    valAxisLabelFormatCode: "0\\x",
    valAxisMinVal: 0,
    valAxisMaxVal: 80,
    valAxisMajorUnit: 20,
    valGridLine: { color: C.hairline, size: 0.5 },
    valAxisLineColor: C.cream,

    showValAxisTitle: false,
  });

  // 10-year mean dashed reference line ~40x — overlay
  // chart plot area roughly: x=0.85..6.7, y top (80x)≈2.85, y bottom (0x)≈6.4
  // For 40x: y = 2.85 + (1 - 40/80)*(6.4-2.85) = 2.85 + 0.5*3.55 = 4.625
  s.addShape(pres.shapes.LINE, {
    x: 0.95, y: 4.625, w: 5.7, h: 0,
    line: { color: C.textMute, width: 0.75, dashType: "dash" },
  });
  s.addText("10y mean ~40x", {
    x: 5.0, y: 4.32, w: 1.7, h: 0.25,
    fontFace: F.mono, fontSize: 9,
    color: C.textMute, margin: 0, align: "right",
  });

  // Highlight Jun '20 peak ~79.6x (data index 5)
  // x position: plot starts ~0.95, plot ends ~6.65 → idx 5 of 12: at 0.95 + (5+0.5)/12*5.7 ≈ 3.56
  // y for 79.6x: 2.85 + (1 - 79.6/80)*3.55 ≈ 2.86
  s.addShape(pres.shapes.OVAL, {
    x: 3.46, y: 2.78, w: 0.14, h: 0.14,
    fill: { color: C.rust }, line: { color: C.rust, width: 0 },
  });
  s.addText("Jun '20 · 79.6x", {
    x: 3.0, y: 2.55, w: 1.4, h: 0.25,
    fontFace: F.mono, fontSize: 9,
    color: C.rust, margin: 0,
  });

  // Highlight TODAY at end of line — last point at idx 11
  // x ≈ 0.95 + (11+0.5)/12 * 5.7 = 0.95 + 5.46 = 6.41
  // y for 9.3: 2.85 + (1 - 9.3/80)*3.55 ≈ 6.0
  s.addShape(pres.shapes.OVAL, {
    x: 6.34, y: 5.93, w: 0.14, h: 0.14,
    fill: { color: C.rust }, line: { color: C.rust, width: 0 },
  });
  s.addText("TODAY · 9.3x", {
    x: 5.55, y: 6.15, w: 1.3, h: 0.28,
    fontFace: F.mono, fontSize: 9, bold: true,
    color: C.textDark, margin: 0, align: "center",
  });

  // ---- RIGHT: 3 stat blocks ----------------------------------------------
  const RX = 7.4;
  const RW = SLIDE_W - RX - MARGIN_X;

  const blocks = [
    {
      stat: "9.3x",
      label: "TODAY",
      body:  "Trailing P/E, Apr 2026 \u00b7 effectively a single-digit multiple on a profitable network business.",
      color: C.textDark,
    },
    {
      stat: "40.2x",
      label: "10-YEAR MEAN",
      body:  "Long-run multiple before the post-2021 de-rating cycle.",
      color: C.textMute,
    },
    {
      stat: "\u221277%",
      label: "DISCOUNT TO HISTORY",
      body:  "Either the market is permanently right, or PYPL is the cheapest it has ever been.",
      color: C.rust,
    },
  ];

  const blockY = 2.8;
  const blockH = 1.35;

  blocks.forEach((b, i) => {
    const by = blockY + i * blockH;

    // Big stat (left of block)
    s.addText(b.stat, {
      x: RX, y: by, w: 2.15, h: 0.85,
      fontFace: F.serif, fontSize: 42,
      color: b.color, margin: 0, valign: "top",
    });
    // Label
    s.addText(b.label, {
      x: RX + 2.25, y: by + 0.25, w: RW - 2.25, h: 0.28,
      fontFace: F.mono, fontSize: 10, charSpacing: 4,
      color: C.textMute, margin: 0,
    });
    // Body
    s.addText(b.body, {
      x: RX + 2.25, y: by + 0.55, w: RW - 2.25, h: 0.7,
      fontFace: F.sans, fontSize: 11.5,
      color: C.textDark, margin: 0, valign: "top",
    });

    // Hairline between blocks (not after last)
    if (i < blocks.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: RX, y: by + blockH - 0.05, w: RW, h: 0,
        line: { color: C.hairline, width: 0.5 },
      });
    }
  });

  addFooter(s, "SOURCE: FULLRATIO, MACROTRENDS", "06 / 09");
}

// =============================================================================
// SLIDE 7 — Fundamentals: cream card + dark card
// =============================================================================
function buildSlide7() {
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addHeader(s, "FUNDAMENTALS & CAPITAL RETURN", "07");

  s.addText("\u2014 WHAT WE ARE ACTUALLY BUYING", {
    x: MARGIN_X, y: 1.05, w: 9, h: 0.3,
    fontFace: F.mono, fontSize: 11, charSpacing: 4,
    color: C.rust, margin: 0,
  });

  s.addText("A balance sheet that funds the thesis without us.", {
    x: MARGIN_X, y: 1.4, w: 12, h: 1.0,
    fontFace: F.serif, fontSize: 32,
    color: C.textDark, margin: 0, valign: "top",
  });

  // Two cards
  const cardY = 2.8;
  const cardH = 4.05;
  const gap   = 0.3;
  const totalW = SLIDE_W - MARGIN_X * 2;
  const cardW  = (totalW - gap) / 2;

  // ---- LEFT: cream card --------------------------------------------------
  const lx = MARGIN_X;
  s.addShape(pres.shapes.RECTANGLE, {
    x: lx, y: cardY, w: cardW, h: cardH,
    fill: { color: C.creamSoft }, line: { color: C.creamSoft, width: 0 },
  });
  s.addText("CASH & CAPITAL RETURN", {
    x: lx + 0.35, y: cardY + 0.3, w: cardW - 0.7, h: 0.3,
    fontFace: F.mono, fontSize: 10, charSpacing: 4,
    color: C.textMute, margin: 0,
  });
  s.addText(
    [
      { text: "$6", options: { color: C.textDark } },
      { text: "B",  options: { color: C.rust } },
    ],
    {
      x: lx + 0.35, y: cardY + 0.65, w: cardW - 0.7, h: 1.1,
      fontFace: F.serif, fontSize: 70, margin: 0, valign: "top",
    }
  );
  s.addText("Buybacks executed in 2025 against a $45B market cap \u2014 share count down ~6.8% YoY.", {
    x: lx + 0.35, y: cardY + 1.95, w: cardW - 0.7, h: 0.8,
    fontFace: F.sans, fontSize: 12.5,
    color: C.textDark, margin: 0, valign: "top",
  });

  // Bullets at bottom of card (using arrow glyph)
  const bullets1 = [
    "$14.8B cash, $11.6B debt \u2014 net cash positive.",
    "New $0.14 quarterly dividend initiated FY25.",
    "EV/FCF of 8.5x \u2192 ~12% FCF yield to enterprise.",
  ];
  bullets1.forEach((b, i) => {
    const by = cardY + 2.85 + i * 0.32;
    s.addText("\u2192", {
      x: lx + 0.35, y: by, w: 0.3, h: 0.28,
      fontFace: F.sans, fontSize: 12,
      color: C.rust, margin: 0,
    });
    s.addText(b, {
      x: lx + 0.65, y: by, w: cardW - 1.0, h: 0.28,
      fontFace: F.sans, fontSize: 11.5,
      color: C.textDark, margin: 0,
    });
  });

  // ---- RIGHT: dark card --------------------------------------------------
  const rx = MARGIN_X + cardW + gap;
  s.addShape(pres.shapes.RECTANGLE, {
    x: rx, y: cardY, w: cardW, h: cardH,
    fill: { color: C.ink }, line: { color: C.ink, width: 0 },
  });
  s.addText("PROFITABILITY", {
    x: rx + 0.35, y: cardY + 0.3, w: cardW - 0.7, h: 0.3,
    fontFace: F.mono, fontSize: 10, charSpacing: 4,
    color: C.textMuteDk, margin: 0,
  });
  s.addText(
    [
      { text: "25.7", options: { color: C.cream } },
      { text: "%",    options: { color: C.gold } },
    ],
    {
      x: rx + 0.35, y: cardY + 0.65, w: cardW - 0.7, h: 1.1,
      fontFace: F.serif, fontSize: 70, margin: 0, valign: "top",
    }
  );
  s.addText("Return on Equity, FY25 Q4 \u2014 up materially under Chriss\u2019s margin-first reset.", {
    x: rx + 0.35, y: cardY + 1.95, w: cardW - 0.7, h: 0.8,
    fontFace: F.sans, fontSize: 12.5,
    color: C.textOnDark, margin: 0, valign: "top",
  });

  const bullets2 = [
    "FY25 EPS growth ~15%; FY26 guidance low-single-digits.",
    "Debt/Equity 0.49x \u2014 investment-grade balance sheet.",
    "TPV $475B in Q4 alone; Venmo + BNPL still expanding.",
  ];
  bullets2.forEach((b, i) => {
    const by = cardY + 2.85 + i * 0.32;
    s.addText("\u2192", {
      x: rx + 0.35, y: by, w: 0.3, h: 0.28,
      fontFace: F.sans, fontSize: 12,
      color: C.gold, margin: 0,
    });
    s.addText(b, {
      x: rx + 0.65, y: by, w: cardW - 1.0, h: 0.28,
      fontFace: F.sans, fontSize: 11.5,
      color: C.textOnDark, margin: 0,
    });
  });

  // Footer (no top hairline since cards extend almost to footer)
  s.addText("SOURCE: PYPL Q4 FY25, YAHOO FINANCE", {
    x: MARGIN_X, y: 7.08, w: 9, h: 0.32,
    fontFace: F.mono, fontSize: 10, charSpacing: 3,
    color: C.textMute, margin: 0,
  });
  s.addText("07 / 09", {
    x: SLIDE_W - 1.4 - MARGIN_X, y: 7.08, w: 1.4, h: 0.32,
    fontFace: F.mono, fontSize: 10, charSpacing: 3,
    color: C.textMute, align: "right", margin: 0,
  });
}

// =============================================================================
// SLIDE 8 — Risks: 2x2 grid
// =============================================================================
function buildSlide8() {
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addHeader(s, "RISKS & MITIGANTS", "08");

  s.addText("\u2014 WHAT COULD BREAK THE THESIS", {
    x: MARGIN_X, y: 1.0, w: 9, h: 0.3,
    fontFace: F.mono, fontSize: 11, charSpacing: 4,
    color: C.rust, margin: 0,
  });

  s.addText("The bear case is structural, not financial \u2014 and it is already in the price.", {
    x: MARGIN_X, y: 1.35, w: 12, h: 1.5,
    fontFace: F.serif, fontSize: 32,
    color: C.textDark, margin: 0, valign: "top",
  });

  const risks = [
    {
      num: "01",
      title: "Branded checkout share loss to Apple Pay.",
      body:  "Apple Pay holds ~55% U.S. mobile wallet share vs ~30% combined for PayPal + Venmo; branded checkout grew only 1% in Q4.",
      mit:   "MITIGANT  \u00b7  FASTLANE ROLLOUT, NFL P2P DEAL, CHRISS RESET",
    },
    {
      num: "02",
      title: "Margin compression from Stripe / Adyen.",
      body:  "Unbranded processing remains a gross-margin headwind; FY26 transaction-margin-dollar guidance came in soft.",
      mit:   "MITIGANT  \u00b7  BUYBACK OFFSETS EPS IMPACT AT THIS MULTIPLE",
    },
    {
      num: "03",
      title: "Securities-law investigations.",
      body:  "Several plaintiffs\u2019 firms (Pomerantz, Kessler Topaz) opened probes in early 2026. Headline risk > financial risk.",
      mit:   "MITIGANT  \u00b7  POSITION SIZE CAPPED AT 5% OF BOOK",
    },
    {
      num: "04",
      title: "Technical break of $40 support.",
      body:  "Bear technical case sees a measured target of ~$21 if $40 fails on a head-and-shoulders pattern.",
      mit:   "MITIGANT  \u00b7  SCALE ENTRY; 25% RESERVED IF DRAWDOWN >15%",
    },
  ];

  const startY = 3.25;
  const colGap = 0.4;
  const rowGap = 0.3;
  const totalW = SLIDE_W - MARGIN_X * 2;
  const cellW  = (totalW - colGap) / 2;
  const cellH  = 1.65;

  risks.forEach((r, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx  = MARGIN_X + col * (cellW + colGap);
    const cy  = startY + row * (cellH + rowGap);

    // Top divider line
    s.addShape(pres.shapes.LINE, {
      x: cx, y: cy, w: cellW, h: 0,
      line: { color: C.textDark, width: 0.75 },
    });

    // Big number on left
    s.addText(r.num, {
      x: cx + 0.05, y: cy + 0.15, w: 0.8, h: 0.7,
      fontFace: F.serif, fontSize: 32,
      color: C.rust, margin: 0,
    });
    // Title (allow 2 lines)
    s.addText(r.title, {
      x: cx + 0.95, y: cy + 0.15, w: cellW - 1.0, h: 0.7,
      fontFace: F.serif, fontSize: 17,
      color: C.textDark, margin: 0, valign: "top",
    });
    // Body
    s.addText(r.body, {
      x: cx + 0.95, y: cy + 0.85, w: cellW - 1.0, h: 0.6,
      fontFace: F.sans, fontSize: 11,
      color: C.textDark, margin: 0, valign: "top",
    });
    // Mitigant
    s.addText(r.mit, {
      x: cx + 0.95, y: cy + cellH - 0.3, w: cellW - 1.0, h: 0.28,
      fontFace: F.mono, fontSize: 9, charSpacing: 3,
      color: C.textMute, margin: 0,
    });
  });

  addFooter(s, "PYPL  ·  INVESTMENT MEMO", "08 / 09");
}

// =============================================================================
// SLIDE 9 — Recommendation: dark slide with right-side data card
// =============================================================================
function buildSlide9() {
  const s = pres.addSlide();
  s.background = { color: C.ink };

  addHeader(s, "RECOMMENDATION", "09", { dark: true });

  // LEFT: action headline + paragraph
  s.addText("\u2014 ACTION", {
    x: MARGIN_X, y: 1.0, w: 6, h: 0.3,
    fontFace: F.mono, fontSize: 11, charSpacing: 4,
    color: C.goldSoft, margin: 0,
  });

  s.addText(
    [
      { text: "Initiate a ", options: { color: C.cream } },
      { text: "5%",          options: { color: C.gold, italic: true } },
      { text: " long. Underwrite the buyback.", options: { color: C.cream } },
    ],
    {
      x: MARGIN_X, y: 1.35, w: 7.2, h: 3.0,
      fontFace: F.serif, fontSize: 56,
      margin: 0, valign: "top",
    }
  );

  s.addText(
    "We are paying ~9x earnings for a profitable, cash-generative payments network actively retiring its own float. We don\u2019t need the turnaround to work \u2014 we just need it not to break. Re-rating to a 14x multiple on flat FY27 EPS implies ~50% upside; the buyback compounds underneath.",
    {
      x: MARGIN_X, y: 4.55, w: 7.0, h: 1.8,
      fontFace: F.sans, fontSize: 14,
      color: C.textOnDark, margin: 0, valign: "top",
    }
  );

  // RIGHT: position sizing card (slightly lighter dark on dark? — original looks identical bg, just bordered)
  const rx = 8.1;
  const ry = 1.05;
  const rw = SLIDE_W - rx - MARGIN_X;
  const rh = 5.85;

  // The card is essentially the same bg, just bordered with hairlines — use very subtle lighter rect
  s.addShape(pres.shapes.RECTANGLE, {
    x: rx, y: ry, w: rw, h: rh,
    fill: { color: "151513" }, line: { color: C.textMuteDk, width: 0.5 },
  });

  s.addText("POSITION SIZING", {
    x: rx + 0.35, y: ry + 0.3, w: rw - 0.7, h: 0.3,
    fontFace: F.mono, fontSize: 11, charSpacing: 4,
    color: C.textMuteDk, margin: 0,
  });

  const sizing = [
    { l: "Fund AUM",            v: "$15.0M",   highlight: false },
    { l: "Max single-name",     v: "5.0%",     highlight: false },
    { l: "PYPL allocation",     v: "$750,000", highlight: true },
    { l: "Initial tranche (75%)", v: "$562,500", highlight: false },
    { l: "Reserve (25%)",       v: "$187,500", highlight: false },
    { l: "Approx. shares @ $50", v: "~15,000",  highlight: false },
  ];

  const rowsStartY = ry + 0.85;
  const rowHeight  = 0.62;

  sizing.forEach((row, i) => {
    const yy = rowsStartY + i * rowHeight;
    s.addText(row.l, {
      x: rx + 0.35, y: yy, w: rw * 0.55, h: 0.4,
      fontFace: F.sans, fontSize: 12,
      color: C.textOnDark, margin: 0, valign: "middle",
    });
    s.addText(row.v, {
      x: rx + rw * 0.45, y: yy, w: rw * 0.5, h: 0.4,
      fontFace: F.serif, fontSize: 22,
      color: row.highlight ? C.gold : C.cream,
      align: "right", margin: 0, valign: "middle",
    });
    // Hairline under each (except last)
    s.addShape(pres.shapes.LINE, {
      x: rx + 0.35, y: yy + 0.5, w: rw - 0.7, h: 0,
      line: { color: C.textMuteDk, width: 0.4 },
    });
  });

  // Footnote at bottom of card
  s.addText(
    "Scale into reserve on drawdowns >15% from entry. Re-evaluate at FY27 mid-year or on any change to the buyback authorization.",
    {
      x: rx + 0.35, y: ry + rh - 0.85, w: rw - 0.7, h: 0.7,
      fontFace: F.sans, fontSize: 10.5,
      color: C.textMuteDk, margin: 0, valign: "top",
    }
  );

  addFooter(s, "MERIDIAN CAPITAL  ·  INTERNAL \u2014 NOT FOR DISTRIBUTION", "09 / 09", { dark: true });
}

// ---- Build ------------------------------------------------------------------
buildSlide1();
buildSlide2();
buildSlide3();
buildSlide4();
buildSlide5();
buildSlide6();
buildSlide7();
buildSlide8();
buildSlide9();

pres.writeFile({ fileName: "/home/assets/PYPL-Investment-Memo.pptx" })
    .then((fn) => console.log("Wrote:", fn))
    .catch((e) => { console.error(e); process.exit(1); });
