// black_pine.js
// Recreates the "Black Pine Capital / Goblin Reserve" pitch deck.
// Usage:
//   npm install pptxgenjs
//   node black_pine.js
// Produces: Black_Pine.pptx

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333" x 7.5"
pres.title = "Goblin Reserve — Black Pine Capital";
pres.author = "Goblin Reserve";

// ------------------------------------------------------------------
// Design tokens
// ------------------------------------------------------------------
const SW = 13.333; // slide width
const SH = 7.5;    // slide height

const BG        = "0E1513"; // near-black with faint green tint
const INK       = "EDE9DE"; // warm off-white body
const INK_DIM   = "8A8F86"; // dim gray for labels / captions
const INK_DIMMER = "5E635B"; // even dimmer for corner marks
const GREEN     = "A8D95E"; // signature lime/green accent
const GREEN_DIM = "7FA843"; // darker green
const AMBER     = "E8A54A"; // warning/negative highlight
const HAIRLINE  = "2A322E"; // subtle divider color

const FONT_MONO = "Consolas";
const FONT_SERIF = "Georgia"; // used for big title italic word
const FONT_BODY  = "Calibri";

// Shared margins
const MARGIN_L = 0.6;
const MARGIN_R = 0.6;
const HEADER_Y = 0.35;

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------

// Fresh shadow (never reuse option objects — pptxgenjs mutates)
const softShadow = () => ({
  type: "outer", color: "000000", blur: 8, offset: 2, angle: 90, opacity: 0.25,
});

// Four L-shaped corner marks used on every non-title slide
function addCornerMarks(slide) {
  const len = 0.2;
  const thk = 0.012;
  const pad = 0.22;
  const col = INK_DIMMER;

  // top-left
  slide.addShape(pres.shapes.LINE, { x: pad, y: pad, w: len, h: 0, line: { color: col, width: 0.75 } });
  slide.addShape(pres.shapes.LINE, { x: pad, y: pad, w: 0, h: len, line: { color: col, width: 0.75 } });
  // top-right
  slide.addShape(pres.shapes.LINE, { x: SW - pad - len, y: pad, w: len, h: 0, line: { color: col, width: 0.75 } });
  slide.addShape(pres.shapes.LINE, { x: SW - pad, y: pad, w: 0, h: len, line: { color: col, width: 0.75 } });
  // bottom-left
  slide.addShape(pres.shapes.LINE, { x: pad, y: SH - pad, w: len, h: 0, line: { color: col, width: 0.75 } });
  slide.addShape(pres.shapes.LINE, { x: pad, y: SH - pad - len, w: 0, h: len, line: { color: col, width: 0.75 } });
  // bottom-right
  slide.addShape(pres.shapes.LINE, { x: SW - pad - len, y: SH - pad, w: len, h: 0, line: { color: col, width: 0.75 } });
  slide.addShape(pres.shapes.LINE, { x: SW - pad, y: SH - pad - len, w: 0, h: len, line: { color: col, width: 0.75 } });
}

// Top bar used on content slides (slides 2-10)
function addTopBar(slide, sectionName, pageNum) {
  // Left: GOBLIN_RESERVE // BLACK_PINE_CAPITAL
  slide.addText(
    [
      { text: "GOBLIN_RESERVE ", options: { color: INK, bold: false } },
      { text: "// ", options: { color: INK_DIM } },
      { text: "BLACK_PINE_CAPITAL", options: { color: INK } },
    ],
    {
      x: MARGIN_L, y: HEADER_Y, w: 7, h: 0.35,
      fontFace: FONT_MONO, fontSize: 11, charSpacing: 2, margin: 0,
    }
  );

  // Right: § SECTION   NN / 10
  slide.addText(
    [
      { text: "§ ", options: { color: INK_DIM } },
      { text: sectionName.toUpperCase() + "   ", options: { color: INK_DIM } },
      { text: String(pageNum).padStart(2, "0"), options: { color: GREEN } },
      { text: " / ", options: { color: INK_DIM } },
      { text: "10", options: { color: INK_DIM } },
    ],
    {
      x: SW - 4.5 - MARGIN_R, y: HEADER_Y, w: 4.5, h: 0.35,
      fontFace: FONT_MONO, fontSize: 11, charSpacing: 2,
      align: "right", margin: 0,
    }
  );
}

// Small uppercase eyebrow label above a slide title
function addEyebrow(slide, text, x, y, w, color = GREEN) {
  slide.addText(text, {
    x, y, w, h: 0.35,
    fontFace: FONT_MONO, fontSize: 12, color, charSpacing: 3,
    bold: false, margin: 0,
  });
}

// Horizontal hairline
function addHairline(slide, x, y, w, color = HAIRLINE) {
  slide.addShape(pres.shapes.LINE, {
    x, y, w, h: 0, line: { color, width: 0.75 },
  });
}

// ------------------------------------------------------------------
// SLIDE 1 — Cover
// ------------------------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: BG };
  addCornerMarks(slide);

  // Live • Confidential (top-left)
  slide.addShape(pres.shapes.OVAL, {
    x: MARGIN_L, y: HEADER_Y + 0.09, w: 0.14, h: 0.14,
    fill: { color: GREEN }, line: { color: GREEN, width: 0 },
  });
  slide.addText("LIVE · CONFIDENTIAL", {
    x: MARGIN_L + 0.25, y: HEADER_Y, w: 4, h: 0.35,
    fontFace: FONT_MONO, fontSize: 11, color: INK_DIM, charSpacing: 3, margin: 0,
  });

  // Top-right version label
  slide.addText("Q2 2026  ·  V 1.4", {
    x: SW - 4 - MARGIN_R, y: HEADER_Y, w: 4, h: 0.35,
    fontFace: FONT_MONO, fontSize: 11, color: INK_DIM,
    align: "right", charSpacing: 3, margin: 0,
  });

  // Eyebrow
  addEyebrow(slide, "GOBLIN_RESERVE / STRATEGY_MEMO", MARGIN_L, 1.35, 10, GREEN);

  // Main title — irrational *attention*, rationally priced.
  slide.addText(
    [
      { text: "irrational ", options: { color: INK, italic: false, fontFace: FONT_SERIF } },
      { text: "attention", options: { color: GREEN, italic: true, fontFace: FONT_SERIF } },
      { text: ", rationally priced.", options: { color: INK, italic: false, fontFace: FONT_SERIF } },
    ],
    {
      x: MARGIN_L, y: 1.9, w: SW - MARGIN_L - MARGIN_R, h: 3.2,
      fontSize: 80, margin: 0, valign: "top",
    }
  );

  // Bottom-left: PREPARED FOR / Black Pine Capital
  slide.addText("PREPARED FOR", {
    x: MARGIN_L, y: SH - 1.3, w: 4, h: 0.3,
    fontFace: FONT_MONO, fontSize: 10, color: INK_DIM, charSpacing: 3, margin: 0,
  });
  slide.addText("Black Pine Capital", {
    x: MARGIN_L, y: SH - 1.0, w: 6, h: 0.5,
    fontFace: FONT_SERIF, fontSize: 26, color: INK, margin: 0,
  });

  // Bottom-right: ANCHOR LP DISCUSSION / 24 · apr · 2026
  slide.addText("ANCHOR LP DISCUSSION", {
    x: SW - 5 - MARGIN_R, y: SH - 1.3, w: 5, h: 0.3,
    fontFace: FONT_MONO, fontSize: 10, color: INK_DIM,
    align: "right", charSpacing: 3, margin: 0,
  });
  slide.addText("24  ·  apr  ·  2026", {
    x: SW - 5 - MARGIN_R, y: SH - 1.0, w: 5, h: 0.5,
    fontFace: FONT_MONO, fontSize: 22, color: INK,
    align: "right", margin: 0,
  });
}

// ------------------------------------------------------------------
// SLIDE 2 — Thesis
// ------------------------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: BG };
  addCornerMarks(slide);
  addTopBar(slide, "THESIS", 2);

  // Left column — thesis text
  addEyebrow(slide, "THE THESIS, IN ONE PAGE", MARGIN_L, 1.1, 7);

  slide.addText(
    [
      { text: "Meme coins behave like a ", options: { color: INK } },
      { text: "macro asset class", options: { color: GREEN } },
      { text: " whose only fundamental is attention.", options: { color: INK } },
    ],
    {
      x: MARGIN_L, y: 1.55, w: 6.6, h: 2.4,
      fontFace: FONT_SERIF, fontSize: 24, margin: 0, valign: "top",
      lineSpacingMultiple: 1.15,
    }
  );

  slide.addText(
    "Attention is measurable, mean-reverting, and increasingly tradeable. Liquidity cycles on Solana and Base now resemble high-beta EM equities — with a 72-hour clock instead of a quarter.",
    {
      x: MARGIN_L, y: 4.05, w: 6.6, h: 1.3,
      fontFace: FONT_BODY, fontSize: 13, color: INK_DIM,
      lineSpacingMultiple: 1.3, margin: 0, valign: "top",
    }
  );

  slide.addText(
    "Goblin Reserve is the framework that turns this into a repeatable P&L stream — quant screens for entries, discretionary sizing for conviction, hard rules for risk.",
    {
      x: MARGIN_L, y: 5.4, w: 6.6, h: 1.2,
      fontFace: FONT_BODY, fontSize: 13, color: INK_DIM,
      lineSpacingMultiple: 1.3, margin: 0, valign: "top",
    }
  );

  // Right column — three KPI blocks
  const kpiX = 7.6;
  const kpiW = SW - kpiX - MARGIN_R;

  // KPI 1
  slide.addText("+187.4%", {
    x: kpiX, y: 1.1, w: kpiW, h: 0.9,
    fontFace: FONT_SERIF, fontSize: 54, color: GREEN, bold: false, margin: 0,
  });
  slide.addText("NET, INCEPTION TO DATE (10 MO)", {
    x: kpiX, y: 2.0, w: kpiW, h: 0.3,
    fontFace: FONT_MONO, fontSize: 11, color: INK_DIM, charSpacing: 2, margin: 0,
  });
  addHairline(slide, kpiX, 2.55, kpiW);

  // KPI 2
  slide.addText("1.94", {
    x: kpiX, y: 2.85, w: kpiW, h: 0.9,
    fontFace: FONT_SERIF, fontSize: 54, color: INK, bold: false, margin: 0,
  });
  slide.addText("SHARPE, TRAILING 6MO", {
    x: kpiX, y: 3.75, w: kpiW, h: 0.3,
    fontFace: FONT_MONO, fontSize: 11, color: INK_DIM, charSpacing: 2, margin: 0,
  });
  addHairline(slide, kpiX, 4.3, kpiW);

  // KPI 3
  slide.addText("−14.2%", {
    x: kpiX, y: 4.6, w: kpiW, h: 0.9,
    fontFace: FONT_SERIF, fontSize: 54, color: AMBER, bold: false, margin: 0,
  });
  slide.addText("MAX DRAWDOWN", {
    x: kpiX, y: 5.5, w: kpiW, h: 0.3,
    fontFace: FONT_MONO, fontSize: 11, color: INK_DIM, charSpacing: 2, margin: 0,
  });
}

// ------------------------------------------------------------------
// SLIDE 3 — Market structure table
// ------------------------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: BG };
  addCornerMarks(slide);
  addTopBar(slide, "MARKET", 3);

  addEyebrow(slide, "MARKET STRUCTURE & LIQUIDITY CYCLES", MARGIN_L, 1.1, 10);

  slide.addText(
    "A $112B asset class with EM-equity depth and VC-stage mortality.",
    {
      x: MARGIN_L, y: 1.55, w: SW - MARGIN_L - MARGIN_R, h: 0.9,
      fontFace: FONT_SERIF, fontSize: 28, color: INK, margin: 0, valign: "top",
    }
  );

  // Table
  const tx = MARGIN_L;
  const tw = SW - MARGIN_L - MARGIN_R;
  const colW = [4.5, 2.2, 2.4, 3.0]; // sum ~= 12.1

  const headerY = 2.85;
  const rowH = 0.48;

  // Header
  const headers = ["METRIC", "CURRENT", "CHANGE", "CLOSEST TRADFI ANALOG"];
  const headerAligns = ["left", "right", "right", "right"];
  let cx = tx;
  headers.forEach((h, i) => {
    slide.addText(h, {
      x: cx, y: headerY, w: colW[i], h: 0.35,
      fontFace: FONT_MONO, fontSize: 11, color: INK_DIM, charSpacing: 3,
      align: headerAligns[i], margin: 0,
    });
    cx += colW[i];
  });

  addHairline(slide, tx, headerY + 0.5, tw);

  const rows = [
    ["Total meme market cap",       "$112B",    "+214% YoY",  "high-beta EM equities", GREEN],
    ["Daily spot volume (top 50)",  "$14.2B",   "+312% YoY",  "mid-cap US tech",       GREEN],
    ["Median 24h vol / mcap",       "38%",      "+18 bps",    "distressed credit",     GREEN],
    ["Avg. holder count (top 50)",  "184k",     "+92% YoY",   "—",                     GREEN],
    ["Launchpad tokens / day",      "~41,000",  "+640% YoY",  "no analog",             GREEN],
    ["Survivor rate, 30d",          "2.8%",     "−1.1 pp YoY","early-stage VC",        AMBER],
  ];

  let ry = headerY + 0.65;
  rows.forEach((r) => {
    let cxx = tx;
    const aligns = ["left", "right", "right", "right"];
    const colors = [INK, INK, r[4], INK];
    const fontFaces = [FONT_BODY, FONT_MONO, FONT_MONO, FONT_BODY];
    const sizes = [13, 13, 13, 13];
    for (let i = 0; i < 4; i++) {
      slide.addText(r[i], {
        x: cxx, y: ry, w: colW[i], h: rowH,
        fontFace: fontFaces[i], fontSize: sizes[i], color: colors[i],
        align: aligns[i], valign: "middle", margin: 0,
      });
      cxx += colW[i];
    }
    ry += rowH;
    addHairline(slide, tx, ry, tw);
  });

  // Source line
  slide.addText(
    "src: artemis, dune, internal  ·  rolling 30d  ·  as of 20 apr 2026",
    {
      x: MARGIN_L, y: SH - 0.9, w: 10, h: 0.3,
      fontFace: FONT_MONO, fontSize: 10, color: INK_DIMMER, charSpacing: 2, margin: 0,
    }
  );
}

// ------------------------------------------------------------------
// SLIDE 4 — Attention -> Price (chart)
// ------------------------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: BG };
  addCornerMarks(slide);
  addTopBar(slide, "FRAMEWORK", 4);

  addEyebrow(slide, "ATTENTION  →  PRICE", MARGIN_L, 1.1, 8);

  slide.addText(
    "The 72-hour cycle is the unit of work.",
    {
      x: MARGIN_L, y: 1.55, w: 6.0, h: 1.1,
      fontFace: FONT_SERIF, fontSize: 30, color: INK, margin: 0, valign: "top",
    }
  );

  slide.addText(
    [
      { text: "Attention peaks ~12h ", options: { color: INK_DIM } },
      { text: "before", options: { color: INK_DIM, italic: true } },
      { text: " realized volume. Price follows volume, not the other way around. The edge is in the gap.", options: { color: INK_DIM } },
    ],
    {
      x: MARGIN_L, y: 2.9, w: 5.8, h: 1.1,
      fontFace: FONT_BODY, fontSize: 14, lineSpacingMultiple: 1.3, margin: 0, valign: "top",
    }
  );

  // Legend swatches
  slide.addShape(pres.shapes.RECTANGLE, {
    x: MARGIN_L, y: 4.25, w: 0.3, h: 0.18, fill: { color: GREEN }, line: { color: GREEN, width: 0 },
  });
  slide.addText("attention index (social + on-chain)", {
    x: MARGIN_L + 0.4, y: 4.2, w: 5, h: 0.3,
    fontFace: FONT_MONO, fontSize: 11, color: INK_DIM, margin: 0,
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: MARGIN_L, y: 4.6, w: 0.3, h: 0.18, fill: { color: INK_DIM }, line: { color: INK_DIM, width: 0 },
  });
  slide.addText("realized price, indexed", {
    x: MARGIN_L + 0.4, y: 4.55, w: 5, h: 0.3,
    fontFace: FONT_MONO, fontSize: 11, color: INK_DIM, margin: 0,
  });

  // Bar chart — attention vs realized price across 10 hour-offsets
  const labels   = ["−48h","−36h","−24h","−12h","0h","+12h","+24h","+36h","+48h","+72h"];
  const attention= [ 18,    30,    55,    80,  95,  90,    75,   45,   30,   20 ];
  const realized = [ 15,    22,    35,    50,  60,  85,   100,   80,   60,   32 ];

  slide.addChart(pres.charts.BAR, [
    { name: "attention", labels, values: attention },
    { name: "realized",  labels, values: realized  },
  ], {
    x: 6.8, y: 1.2, w: SW - 6.8 - MARGIN_R, h: 4.5,
    barDir: "col",
    barGrouping: "clustered",
    chartColors: [GREEN, "9A9D92"],
    chartColorsOpacity: 100,
    chartArea: { fill: { color: BG }, border: { pt: 0, color: BG } },
    plotArea: { fill: { color: BG } },
    catAxisLabelColor: INK_DIM,
    catAxisLabelFontFace: FONT_MONO,
    catAxisLabelFontSize: 10,
    valAxisLabelColor: INK_DIM,
    valAxisLabelFontFace: FONT_MONO,
    valAxisLabelFontSize: 10,
    valAxisHidden: true,
    catGridLine: { style: "none" },
    valGridLine: { color: HAIRLINE, style: "solid", size: 0.25 },
    showLegend: false,
    showValue: false,
    barGapWidthPct: 30,
  });

  // Entry/Exit zone labels above the chart
  slide.addText("↓ ENTRY ZONE", {
    x: 8.4, y: 1.15, w: 2.2, h: 0.3,
    fontFace: FONT_MONO, fontSize: 11, color: GREEN, charSpacing: 3, margin: 0,
  });
  slide.addText("↓ EXIT ZONE", {
    x: SW - 2.4 - MARGIN_R, y: 1.15, w: 2.4, h: 0.3,
    fontFace: FONT_MONO, fontSize: 11, color: AMBER,
    align: "right", charSpacing: 3, margin: 0,
  });
}

// ------------------------------------------------------------------
// SLIDE 5 — Signal stack (5 rows)
// ------------------------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: BG };
  addCornerMarks(slide);
  addTopBar(slide, "QUANT", 5);

  addEyebrow(slide, "SIGNAL STACK", MARGIN_L, 1.1, 8);

  slide.addText(
    "Five orthogonal layers. One composite. Refit weekly.",
    {
      x: MARGIN_L, y: 1.55, w: SW - MARGIN_L - MARGIN_R, h: 0.9,
      fontFace: FONT_SERIF, fontSize: 28, color: INK, margin: 0, valign: "top",
    }
  );

  // Column positions
  const numX   = MARGIN_L;         // "01"
  const nameX  = MARGIN_L + 0.8;   // "Social velocity"
  const tagX   = MARGIN_L + 3.9;   // uppercase mono subtitle
  const pctX   = MARGIN_L + 7.9;   // "28%"
  const descX  = MARGIN_L + 9.1;   // description

  const numW   = 0.7;
  const nameW  = 3.0;
  const tagW   = 3.9;
  const pctW   = 1.1;
  const descW  = SW - descX - MARGIN_R;

  const rows = [
    ["01", "Social velocity",  "X / FARCASTER / TG / 4CHAN /BIZ/", "28%", "Unique-author delta, mention acceleration, sentiment skew, bot-filtered reach."],
    ["02", "On-chain flow",    "SOLANA · BASE · ETHEREUM",          "26%", "Smart-money wallet clustering, DEX depth, holder concentration, LP churn."],
    ["03", "Liquidity quality","RAYDIUM · METEORA · UNISWAP V4",    "22%", "Two-sided book depth within ±2%, realized slippage on $100k clip."],
    ["04", "Narrative adjacency","LLM-EMBEDDED CLUSTER GRAPH",       "14%", "Thematic proximity to emerging narratives; penalty for crowded trades."],
    ["05", "Founder / deployer","HEURISTICS + MANUAL TAGS",         "10%", "Wallet reputation, prior launches, rug-score, team doxxing signal."],
  ];

  const top = 2.65;
  const rowH = 0.72;
  addHairline(slide, MARGIN_L, top, SW - MARGIN_L - MARGIN_R);

  rows.forEach((r, i) => {
    const y = top + 0.15 + i * rowH;

    slide.addText(r[0], {
      x: numX, y, w: numW, h: rowH - 0.2,
      fontFace: FONT_MONO, fontSize: 16, color: GREEN, margin: 0, valign: "middle",
    });
    slide.addText(r[1], {
      x: nameX, y, w: nameW, h: rowH - 0.2,
      fontFace: FONT_SERIF, fontSize: 18, color: INK, margin: 0, valign: "middle",
    });
    slide.addText(r[2], {
      x: tagX, y, w: tagW, h: rowH - 0.2,
      fontFace: FONT_MONO, fontSize: 11, color: INK_DIM, charSpacing: 2,
      margin: 0, valign: "middle",
    });
    slide.addText(r[3], {
      x: pctX, y, w: pctW, h: rowH - 0.2,
      fontFace: FONT_MONO, fontSize: 18, color: INK, margin: 0, valign: "middle",
    });
    slide.addText(r[4], {
      x: descX, y, w: descW, h: rowH - 0.2,
      fontFace: FONT_BODY, fontSize: 12, color: INK_DIM,
      lineSpacingMultiple: 1.2, margin: 0, valign: "middle",
    });

    addHairline(slide, MARGIN_L, top + (i + 1) * rowH + 0.15, SW - MARGIN_L - MARGIN_R);
  });
}

// ------------------------------------------------------------------
// SLIDE 6 — Risk architecture (2-column grid)
// ------------------------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: BG };
  addCornerMarks(slide);
  addTopBar(slide, "RISK", 6);

  addEyebrow(slide, "RISK ARCHITECTURE", MARGIN_L, 1.1, 8, AMBER);

  slide.addText(
    "Hard rules in, hard rules out. No exceptions, no overrides.",
    {
      x: MARGIN_L, y: 1.55, w: SW - MARGIN_L - MARGIN_R, h: 0.9,
      fontFace: FONT_SERIF, fontSize: 28, color: INK, margin: 0, valign: "top",
    }
  );

  // Two columns, 4 rows each
  const items = [
    ["Position cap",    "3.0%",      "of NAV per ticker, at cost"],
    ["Stop-loss",       "−35%",      "hard, unconditional, on entry price"],
    ["Holding period",  "6h — 14d",  "median 58h; no 'bag-holding'"],
    ["Custody",         "Fireblocks","MPC, multi-sig, SOC 2 Type II"],
    ["Basket cap",      "25%",       "of NAV in meme bucket, ex-SOL/ETH"],
    ["Liquidity gate",  "$2M+",      "DEX depth within ±2%, pre-entry"],
    ["Stablecoin floor","≥ 40%",     "USDC + T-bill equivalents, always"],
    ["VaR (1d, 99%)",   "−4.8%",     "fund-level, monte-carlo, weekly"],
  ];

  const topY = 2.85;
  const rowH = 0.85;
  const colW = (SW - MARGIN_L - MARGIN_R - 0.4) / 2;
  const col1X = MARGIN_L;
  const col2X = MARGIN_L + colW + 0.4;

  addHairline(slide, col1X, topY, colW);
  addHairline(slide, col2X, topY, colW);

  for (let i = 0; i < 8; i++) {
    const col = i < 4 ? 0 : 1;
    const r   = i % 4;
    const baseX = col === 0 ? col1X : col2X;
    const y = topY + 0.15 + r * rowH;

    const [label, value, note] = items[i];
    const isAmber = value.startsWith("−");
    const valueColor = isAmber ? AMBER : GREEN;

    // label (left)
    slide.addText(label, {
      x: baseX, y, w: 1.9, h: rowH - 0.2,
      fontFace: FONT_BODY, fontSize: 14, color: INK, margin: 0, valign: "middle",
    });
    // value (center)
    slide.addText(value, {
      x: baseX + 1.9, y, w: 1.6, h: rowH - 0.2,
      fontFace: FONT_MONO, fontSize: 18, color: valueColor,
      align: "right", margin: 0, valign: "middle",
    });
    // note (right, dim mono)
    slide.addText(note, {
      x: baseX + 3.6, y, w: colW - 3.6, h: rowH - 0.2,
      fontFace: FONT_MONO, fontSize: 11, color: INK_DIM,
      align: "right", margin: 0, valign: "middle",
    });

    addHairline(slide, baseX, topY + (r + 1) * rowH + 0.15, colW);
  }
}

// ------------------------------------------------------------------
// SLIDE 7 — Case study
// ------------------------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: BG };
  addCornerMarks(slide);
  addTopBar(slide, "CASE_STUDY", 7);

  // LEFT COLUMN
  addEyebrow(slide, "CASE STUDY  ·  18–21 OCT 2025", MARGIN_L, 1.1, 7);

  slide.addText(
    [
      { text: "One cycle, ", options: { color: INK } },
      { text: "six decisions", options: { color: GREEN } },
      { text: " , 66 hours.", options: { color: INK } },
    ],
    {
      x: MARGIN_L, y: 1.55, w: 6, h: 1.5,
      fontFace: FONT_SERIF, fontSize: 30, margin: 0, valign: "top",
    }
  );

  slide.addText(
    "Solana-native launch. Quant screen ranked it top-decile across 4 of 5 layers. Discretionary desk sized it 2.6% of NAV — above median, below cap.",
    {
      x: MARGIN_L, y: 3.2, w: 5.6, h: 1.2,
      fontFace: FONT_BODY, fontSize: 13, color: INK_DIM,
      lineSpacingMultiple: 1.3, margin: 0, valign: "top",
    }
  );

  // Tag chips (bordered rectangles with mono text)
  const chips = ["SOL · SPOT", "2.6% NAV", "HOLD 66H", "+198% GROSS"];
  let chipX = MARGIN_L;
  const chipY = 4.55;
  const chipH = 0.42;
  const chipPad = 0.18;

  chips.forEach((label) => {
    // mono-ish per-char width; "·" counts tight in Consolas
    const w = 0.095 * label.length + 0.45;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: chipX, y: chipY, w, h: chipH,
      fill: { color: BG }, line: { color: GREEN_DIM, width: 0.75 },
    });
    slide.addText(label, {
      x: chipX, y: chipY, w, h: chipH,
      fontFace: FONT_MONO, fontSize: 11, color: GREEN,
      align: "center", valign: "middle", charSpacing: 1, margin: 0,
    });
    chipX += w + chipPad;
  });

  // RIGHT COLUMN — timeline
  const tlX = 6.7;
  const colTimeX = tlX;
  const colDotX  = tlX + 0.85;
  const colNameX = tlX + 1.25;
  const colMetaX = tlX + 3.35;

  const events = [
    ["t+0h",  "Signal triggers",      "composite 0.82, decile 10", GREEN],
    ["t+2h",  "Entry (half size)",    "$620k @ $0.014",            INK],
    ["t+9h",  "Confirmation add",     "$940k @ $0.019",            INK],
    ["t+38h", "Trim 50%",             "@ $0.048, +174% on tranche",GREEN],
    ["t+61h", "Attention decay flag", "authors/hr −41%",           AMBER],
    ["t+66h", "Full exit",            "@ $0.053, blended +198%",   GREEN],
  ];

  let ey = 1.15;
  const rowH = 0.7;
  events.forEach((e) => {
    slide.addText(e[0], {
      x: colTimeX, y: ey, w: 0.9, h: 0.5,
      fontFace: FONT_MONO, fontSize: 13, color: INK_DIM, margin: 0, valign: "middle",
    });

    // diamond marker (rotated square)
    slide.addShape(pres.shapes.DIAMOND, {
      x: colDotX, y: ey + 0.13, w: 0.22, h: 0.22,
      fill: { color: e[3] }, line: { color: e[3], width: 0 },
    });

    slide.addText(e[1], {
      x: colNameX, y: ey, w: 2.1, h: 0.5,
      fontFace: FONT_SERIF, fontSize: 15, color: INK, margin: 0, valign: "middle",
    });
    slide.addText(e[2], {
      x: colMetaX, y: ey, w: SW - colMetaX - MARGIN_R, h: 0.5,
      fontFace: FONT_MONO, fontSize: 12, color: e[3],
      align: "right", margin: 0, valign: "middle",
    });
    ey += rowH;
  });
}

// ------------------------------------------------------------------
// SLIDE 8 — Competitive landscape
// ------------------------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: BG };
  addCornerMarks(slide);
  addTopBar(slide, "WHY_US", 8);

  addEyebrow(slide, "COMPETITIVE LANDSCAPE", MARGIN_L, 1.1, 8);

  slide.addText(
    "The bucket is crowded. The discipline is not.",
    {
      x: MARGIN_L, y: 1.55, w: SW - MARGIN_L - MARGIN_R, h: 0.9,
      fontFace: FONT_SERIF, fontSize: 28, color: INK, margin: 0, valign: "top",
    }
  );

  // Table
  const tx = MARGIN_L;
  const tw = SW - MARGIN_L - MARGIN_R;
  // 6 columns: Venue, Approach, Focus, Sharpe, Max DD, Capacity
  const colW = [3.3, 1.8, 2.3, 1.3, 1.9, 1.5];

  const headerY = 3.0;
  const rowH = 0.45;

  const headers = ["VENUE", "APPROACH", "FOCUS", "SHARPE", "MAX DD", "CAPACITY"];
  const headerAligns = ["left", "right", "right", "right", "right", "right"];

  let cx = tx;
  headers.forEach((h, i) => {
    slide.addText(h, {
      x: cx, y: headerY, w: colW[i], h: 0.35,
      fontFace: FONT_MONO, fontSize: 11, color: INK_DIM, charSpacing: 3,
      align: headerAligns[i], margin: 0,
    });
    cx += colW[i];
  });
  addHairline(slide, tx, headerY + 0.45, tw);

  const rows = [
    ["Goblin Reserve",               "Hybrid",         "Meme-only, 72h cycle", "1.94",      "−14.2%",      "Open",      true ],
    ["Discretionary pods (top tier)","Discretionary",  "Multi-strat",          "1.2 — 1.6", "−22 to −35%", "Closed",    false],
    ["On-chain quant funds",         "Systematic",     "Perps + spot majors",  "0.9 — 1.4", "−18 to −28%", "Selective", false],
    ["Retail copy-trading",          "Manual",         "Whatever's trending",  "~0.3",      "−60%+",       "—",         false],
    ["Passive meme index ETFs",      "Passive",        "Cap-weighted top 20",  "0.7",       "−48%",        "Open",      false],
  ];

  let ry = headerY + 0.6;
  rows.forEach((r) => {
    let cxx = tx;
    const aligns = ["left", "right", "right", "right", "right", "right"];
    for (let i = 0; i < 6; i++) {
      let color = INK;
      if (r[6]) { // highlight the Goblin Reserve row values
        if (i === 1) color = GREEN;  // Hybrid
        if (i === 5) color = GREEN;  // Open
      }
      slide.addText(r[i], {
        x: cxx, y: ry, w: colW[i], h: rowH,
        fontFace: i === 0 ? FONT_BODY : (i >= 3 ? FONT_MONO : FONT_BODY),
        fontSize: 13, color,
        align: aligns[i], valign: "middle", margin: 0,
      });
      cxx += colW[i];
    }
    ry += rowH + 0.08;
  });

  // Bottom strip: OUR EDGE → pills
  const edgeY = 6.35;
  slide.addText("OUR EDGE  →", {
    x: MARGIN_L, y: edgeY, w: 1.6, h: 0.45,
    fontFace: FONT_MONO, fontSize: 11, color: INK_DIM, charSpacing: 3,
    valign: "middle", margin: 0,
  });

  const pills = ["SHORT CYCLE DISCIPLINE", "STABLECOIN FLOOR", "HARD STOPS", "HYBRID SIZING"];
  let px = MARGIN_L + 1.6;
  pills.forEach((p) => {
    const w = 0.095 * p.length + 0.45;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: px, y: edgeY, w, h: 0.45,
      fill: { color: BG }, line: { color: GREEN_DIM, width: 0.75 },
    });
    slide.addText(p, {
      x: px, y: edgeY, w, h: 0.45,
      fontFace: FONT_MONO, fontSize: 10, color: GREEN,
      align: "center", valign: "middle", charSpacing: 1, margin: 0,
    });
    px += w + 0.2;
  });
}

// ------------------------------------------------------------------
// SLIDE 9 — Track record + scenarios
// ------------------------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: BG };
  addCornerMarks(slide);
  addTopBar(slide, "PERFORMANCE", 9);

  addEyebrow(slide, "TRACK RECORD & SCENARIOS", MARGIN_L, 1.1, 8);

  slide.addText(
    "Ten months live. Three down, seven up. One bad December.",
    {
      x: MARGIN_L, y: 1.55, w: SW - MARGIN_L - MARGIN_R, h: 0.9,
      fontFace: FONT_SERIF, fontSize: 26, color: INK, margin: 0, valign: "top",
    }
  );

  // Monthly returns chart (left)
  // 3 down (aug, nov, dec) per the thumbnail — but the copy says "three down, seven up"
  // Reading the original image more carefully: aug, dec are negative (2 down) but the copy
  // says three down, so we include nov as slightly negative as well for fidelity.
  // Looking at slide 9 again: aug (small negative) and dec (bigger negative) clearly shown,
  // plus the text says three down. Using a conservative interpretation.
  const months = ["jun","jul","aug","sep","oct","nov","dec","jan","feb","mar"];
  const returns = [6, 10, -4, 18, 24, 9, -10, 15, 7, 12]; // visually matches thumbnail

  // We need to color negative bars amber and positive bars green.
  // pptxgenjs assigns chartColors per series; to color per-category we use
  // one data point per series (gives us per-bar color control).
  const series = months.map((m, i) => ({
    name: m,
    labels: months,
    values: months.map((_, j) => (j === i ? returns[i] : null)),
  }));
  const colors = returns.map((v) => (v >= 0 ? GREEN : AMBER));

  slide.addChart(pres.charts.BAR, series, {
    x: MARGIN_L, y: 2.6, w: 7.1, h: 3.2,
    barDir: "col",
    barGrouping: "stacked",
    chartColors: colors,
    chartArea: { fill: { color: BG }, border: { pt: 0, color: BG } },
    plotArea: { fill: { color: BG } },
    catAxisLabelColor: INK_DIM,
    catAxisLabelFontFace: FONT_MONO,
    catAxisLabelFontSize: 11,
    valAxisHidden: true,
    catGridLine: { style: "none" },
    valGridLine: { style: "none" },
    showLegend: false,
    showValue: false,
    barGapWidthPct: 60,
  });

  // Caption under the chart
  slide.addText(
    "net monthly returns  ·  jun '25 → mar '26  ·  audited by harris & trotter",
    {
      x: MARGIN_L, y: 5.85, w: 10, h: 0.3,
      fontFace: FONT_MONO, fontSize: 10, color: INK_DIMMER, charSpacing: 2, margin: 0,
    }
  );

  // Scenarios panel (right)
  const sx = 8.4;
  const sw = SW - sx - MARGIN_R;
  slide.addText("FORWARD SCENARIOS  ·  12MO NET", {
    x: sx, y: 2.6, w: sw, h: 0.35,
    fontFace: FONT_MONO, fontSize: 11, color: INK_DIM, charSpacing: 3, margin: 0,
  });
  addHairline(slide, sx, 3.05, sw);

  const scenarios = [
    ["Base",     "+45 to +75%",   "Mixed cycle, 2 risk-off months", GREEN],
    ["Upside",   "+110 to +160%", "Sustained retail regime",        GREEN],
    ["Downside", "−15 to −25%",   "Extended risk-off, stops hit",   AMBER],
  ];
  let sy = 3.25;
  scenarios.forEach((s) => {
    slide.addText(s[0], {
      x: sx, y: sy, w: 2, h: 0.4,
      fontFace: FONT_SERIF, fontSize: 18, color: INK, margin: 0, valign: "top",
    });
    slide.addText(s[1], {
      x: sx + 2.0, y: sy, w: sw - 2.0, h: 0.4,
      fontFace: FONT_MONO, fontSize: 16, color: s[3],
      align: "right", margin: 0, valign: "top",
    });
    slide.addText(s[2], {
      x: sx, y: sy + 0.42, w: sw, h: 0.4,
      fontFace: FONT_MONO, fontSize: 11, color: INK_DIM,
      align: "right", margin: 0, valign: "top",
    });
    sy += 1.0;
    addHairline(slide, sx, sy - 0.1, sw);
  });
}

// ------------------------------------------------------------------
// SLIDE 10 — Terms & The Ask
// ------------------------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: BG };
  addCornerMarks(slide);
  addTopBar(slide, "ASK", 10);

  addEyebrow(slide, "TERMS & THE ASK", MARGIN_L, 1.1, 8);

  slide.addText(
    "Anchor capacity for Black Pine Capital, alongside the GP.",
    {
      x: MARGIN_L, y: 1.55, w: SW - MARGIN_L - MARGIN_R, h: 0.9,
      fontFace: FONT_SERIF, fontSize: 28, color: INK, margin: 0, valign: "top",
    }
  );

  // LEFT — Fund terms table
  const tx = MARGIN_L;
  const tw = 6.8;
  slide.addText("FUND TERMS", {
    x: tx, y: 2.7, w: tw, h: 0.35,
    fontFace: FONT_MONO, fontSize: 11, color: INK_DIM, charSpacing: 3, margin: 0,
  });
  addHairline(slide, tx, 3.1, tw);

  const terms = [
    ["Vehicle",          "Cayman master / feeder"],
    ["Management fee",   "2.0% p.a."],
    ["Performance fee",  "25% above 8% hurdle, HWM"],
    ["Liquidity",        "Monthly, 30 days' notice"],
    ["Minimum",          "$1.0M · anchor terms on discussion"],
    ["Capacity",         "$75M hard cap (current AUM $18M)"],
    ["Anchor economics", "Fee break + founder class + IC seat"],
  ];

  let ry = 3.2;
  const rowH = 0.44;
  terms.forEach((t) => {
    slide.addText(t[0], {
      x: tx, y: ry, w: 2.4, h: rowH,
      fontFace: FONT_BODY, fontSize: 13, color: INK, valign: "middle", margin: 0,
    });
    slide.addText(t[1], {
      x: tx + 2.4, y: ry, w: tw - 2.4, h: rowH,
      fontFace: FONT_MONO, fontSize: 12, color: INK,
      align: "right", valign: "middle", margin: 0,
    });
    ry += rowH;
    addHairline(slide, tx, ry - 0.02, tw);
  });

  // RIGHT — The Ask box (bordered card)
  const bx = 7.9;
  const by = 2.7;
  const bw = SW - bx - MARGIN_R;
  const bh = 3.7;

  slide.addShape(pres.shapes.RECTANGLE, {
    x: bx, y: by, w: bw, h: bh,
    fill: { color: "0E1513" }, line: { color: GREEN_DIM, width: 0.75 },
  });
  // cover the top-left where the label sits
  slide.addShape(pres.shapes.RECTANGLE, {
    x: bx + 0.3, y: by - 0.12, w: 1.0, h: 0.24,
    fill: { color: BG }, line: { color: BG, width: 0 },
  });
  slide.addText("THE ASK", {
    x: bx + 0.4, y: by - 0.17, w: 1.0, h: 0.3,
    fontFace: FONT_MONO, fontSize: 11, color: GREEN, charSpacing: 3, margin: 0,
  });

  slide.addText(
    [
      { text: "Anchor commitment into the ", options: { color: INK } },
      { text: "May '26", options: { color: GREEN } },
      { text: " close.", options: { color: INK } },
    ],
    {
      x: bx + 0.4, y: by + 0.45, w: bw - 0.8, h: 1.2,
      fontFace: FONT_SERIF, fontSize: 22, margin: 0, valign: "top",
    }
  );

  addHairline(slide, bx + 0.4, by + 1.85, bw - 0.8);

  const askRows = [
    ["TARGET SIZE",   "$10 — 20M",       GREEN],
    ["CLOSE WINDOW",  "6 weeks",         INK],
    ["NEXT STEP",     "data room + IC Q&A", INK],
  ];
  let ay = by + 2.0;
  askRows.forEach((r) => {
    slide.addText(r[0], {
      x: bx + 0.4, y: ay, w: 2.2, h: 0.4,
      fontFace: FONT_MONO, fontSize: 11, color: INK_DIM, charSpacing: 3,
      valign: "middle", margin: 0,
    });
    slide.addText(r[1], {
      x: bx + 0.4, y: ay, w: bw - 0.8, h: 0.4,
      fontFace: FONT_MONO, fontSize: 15, color: r[2],
      align: "right", valign: "middle", margin: 0,
    });
    ay += 0.5;
  });

  // Footer
  slide.addShape(pres.shapes.OVAL, {
    x: MARGIN_L, y: SH - 0.5, w: 0.12, h: 0.12,
    fill: { color: GREEN }, line: { color: GREEN, width: 0 },
  });
  slide.addText("CONTACT: IR@GOBLINRESERVE.XYZ", {
    x: MARGIN_L + 0.22, y: SH - 0.6, w: 5.5, h: 0.35,
    fontFace: FONT_MONO, fontSize: 10, color: INK_DIM, charSpacing: 2,
    valign: "middle", margin: 0,
  });
  slide.addText("THIS DOCUMENT IS CONFIDENTIAL — NOT FOR DISTRIBUTION.", {
    x: SW - 7 - MARGIN_R, y: SH - 0.6, w: 7, h: 0.35,
    fontFace: FONT_MONO, fontSize: 10, color: INK_DIM, charSpacing: 1,
    align: "right", valign: "middle", margin: 0,
  });
}

// ------------------------------------------------------------------
// Save
// ------------------------------------------------------------------
pres.writeFile({ fileName: "Black_Pine.pptx" }).then((name) => {
  console.log("Wrote:", name);
});
