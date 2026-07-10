/**
 * AI-Bucket.pptx replica — built with pptxgenjs
 *
 * Run:   node ai_bucket.js
 * Out:   AI-Bucket.pptx
 */

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();

// ---------- Layout: 13.333" x 7.5" (16:9 widescreen) ----------
pres.defineLayout({ name: "CUSTOM_WIDE", width: 13.333, height: 7.5 });
pres.layout = "CUSTOM_WIDE";
pres.title = "AI Bucket — Portfolio Brief";
pres.author = "Research Desk";

// ---------- Palette ----------
const BG       = "0B0B0B";   // deep near-black
const FG       = "FFFFFF";   // white
const MUTED    = "8A8A8A";   // gray muted text
const DIM      = "555555";   // dim lines
const GREEN    = "7FE27E";   // primary green accent (bright)
const GREEN_D  = "5BB85A";   // darker green for donut sleeves
const GREEN_DD = "3F7F3E";   // darkest green for donut sleeves
const GREEN_L  = "A8EEA7";   // lightest green for donut sleeves
const TRACK    = "2A2A2A";   // bar-track / divider
const RED      = "F26C5F";   // negative/red for -22.4% etc.

// ---------- Layout constants ----------
const SLIDE_W = 13.333;
const SLIDE_H = 7.5;
const MARGIN_X = 0.7;

// ---------- Header (top breadcrumb: left • center • right) ----------
function addHeader(slide, leftText, rightText) {
  const headerY = 0.35;

  slide.addText(leftText, {
    x: MARGIN_X, y: headerY, w: 4.5, h: 0.28,
    fontFace: "Consolas", fontSize: 9, color: MUTED,
    charSpacing: 4, align: "left", valign: "middle", margin: 0,
  });

  // center: green diamond + "AI BUCKET"
  slide.addText(
    [
      { text: "◆ ", options: { color: GREEN } },
      { text: "AI BUCKET", options: { color: GREEN } },
    ],
    {
      x: (SLIDE_W - 3) / 2, y: headerY, w: 3, h: 0.28,
      fontFace: "Consolas", fontSize: 9, bold: true,
      charSpacing: 4, align: "center", valign: "middle", margin: 0,
    }
  );

  slide.addText(rightText, {
    x: SLIDE_W - MARGIN_X - 4.5, y: headerY, w: 4.5, h: 0.28,
    fontFace: "Consolas", fontSize: 9, color: MUTED,
    charSpacing: 4, align: "right", valign: "middle", margin: 0,
  });

  // thin divider under header
  slide.addShape(pres.shapes.LINE, {
    x: MARGIN_X, y: 0.68, w: SLIDE_W - 2 * MARGIN_X, h: 0,
    line: { color: DIM, width: 0.5 },
  });
}

// Helper to set dark bg
function darkSlide() {
  const s = pres.addSlide();
  s.background = { color: BG };
  return s;
}

// =========================================================================
// SLIDE 1 — Cover
// =========================================================================
{
  const s = darkSlide();
  addHeader(s, "PORTFOLIO BRIEF · INTERNAL", "Q2 · 2026");

  // Eyebrow
  s.addText("THEMATIC ALLOCATION · EQUITY", {
    x: MARGIN_X, y: 1.75, w: 7, h: 0.3,
    fontFace: "Consolas", fontSize: 10, color: MUTED,
    charSpacing: 4, margin: 0,
  });

  // "AI" (white)
  s.addText("AI", {
    x: MARGIN_X, y: 2.05, w: 6, h: 1.35,
    fontFace: "Arial", fontSize: 96, bold: true, color: FG,
    align: "left", valign: "top", margin: 0,
  });

  // "Bucket." (green)
  s.addText("Bucket.", {
    x: MARGIN_X, y: 3.25, w: 10, h: 1.5,
    fontFace: "Arial", fontSize: 110, bold: true, color: GREEN,
    align: "left", valign: "top", margin: 0,
  });

  // Subtitle
  s.addText(
    "A ten-name, conviction-weighted sleeve capturing the compute, models, and\napplication layer of the artificial intelligence build-out.",
    {
      x: MARGIN_X, y: 5.4, w: 10, h: 0.9,
      fontFace: "Calibri", fontSize: 15, color: "BFBFBF",
      align: "left", valign: "top", margin: 0,
    }
  );

  // Divider above stats
  s.addShape(pres.shapes.LINE, {
    x: MARGIN_X, y: 6.35, w: SLIDE_W - 2 * MARGIN_X, h: 0,
    line: { color: DIM, width: 0.5 },
  });

  // Four stat columns
  const statY = 6.5;
  const labelOpts = {
    fontFace: "Consolas", fontSize: 9, color: MUTED,
    charSpacing: 4, margin: 0, valign: "top",
  };
  const valueOpts = {
    fontFace: "Calibri", fontSize: 16, bold: true, color: FG,
    margin: 0, valign: "top",
  };

  s.addText("INCEPTION",  { x: MARGIN_X,          y: statY,        w: 2.5, h: 0.25, ...labelOpts });
  s.addText("Jan 2024",   { x: MARGIN_X,          y: statY + 0.3,  w: 2.5, h: 0.35, ...valueOpts });

  s.addText("HOLDINGS",   { x: MARGIN_X + 3,      y: statY,        w: 2.5, h: 0.25, ...labelOpts });
  s.addText("10",         { x: MARGIN_X + 3,      y: statY + 0.3,  w: 2.5, h: 0.35, ...valueOpts });

  s.addText("NAV",        { x: MARGIN_X + 6,      y: statY,        w: 2.5, h: 0.25, ...labelOpts });
  s.addText("$248.4M",    { x: MARGIN_X + 6,      y: statY + 0.3,  w: 2.5, h: 0.35, ...valueOpts });

  s.addText("PREPARED BY",{ x: SLIDE_W - MARGIN_X - 3, y: statY,        w: 3, h: 0.25, ...labelOpts, align: "left" });
  s.addText("Research Desk",{ x: SLIDE_W - MARGIN_X - 3, y: statY + 0.3,  w: 3, h: 0.35, ...valueOpts, align: "left" });
}

// =========================================================================
// SLIDE 2 — Thesis
// =========================================================================
{
  const s = darkSlide();
  addHeader(s, "02 · THESIS", "CONSTRUCTION");

  // Eyebrow
  s.addText("INVESTMENT THESIS", {
    x: MARGIN_X, y: 0.95, w: 6, h: 0.3,
    fontFace: "Consolas", fontSize: 10, color: MUTED,
    charSpacing: 4, margin: 0,
  });

  // Big headline, multi-line w/ green "decade-long capex cycle"
  s.addText(
    [
      { text: "AI is a ", options: { color: FG } },
      { text: "decade-long capex cycle", options: { color: GREEN } },
      { text: " — we own the picks, the platforms, and the applications that compound on top.", options: { color: FG } },
    ],
    {
      x: MARGIN_X, y: 1.3, w: SLIDE_W - 2 * MARGIN_X, h: 2.1,
      fontFace: "Arial", fontSize: 34, bold: true,
      align: "left", valign: "top", margin: 0,
    }
  );

  // Four-quadrant pillars
  const colW = (SLIDE_W - 2 * MARGIN_X - 0.6) / 2;   // gap 0.6
  const rowH = 1.55;
  const pillars = [
    { n: "01", tag: "COMPUTE",     title: "Silicon & Infrastructure",
      desc: "Accelerators, memory, networking, and hyperscale power. 35% weight.\nDurable pricing, multi-year backlogs." },
    { n: "02", tag: "MODELS",      title: "Foundation Platforms",
      desc: "Frontier labs and the cloud distribution rails. 30% weight. Winner-\ntakes-most economics." },
    { n: "03", tag: "APPLICATION", title: "Software That Ships AI",
      desc: "Vertical SaaS monetizing AI via ACV expansion. 25% weight. Earliest\ninflection in revenue." },
    { n: "04", tag: "ENABLERS",    title: "Data, Security, Robotics",
      desc: "Picks-and-shovels adjacent to the stack. 10% weight. Diversifies\nsingle-vendor risk." },
  ];

  pillars.forEach((p, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = MARGIN_X + col * (colW + 0.6);
    const y = 3.7 + row * (rowH + 0.4);

    // top divider line
    s.addShape(pres.shapes.LINE, {
      x, y, w: colW, h: 0,
      line: { color: "AAAAAA", width: 0.75 },
    });

    // "01 / COMPUTE" tag
    s.addText(
      [
        { text: `${p.n} / `, options: { color: GREEN } },
        { text: p.tag, options: { color: GREEN } },
      ],
      {
        x, y: y + 0.08, w: colW, h: 0.3,
        fontFace: "Consolas", fontSize: 10, bold: true,
        charSpacing: 4, margin: 0,
      }
    );

    // Title
    s.addText(p.title, {
      x, y: y + 0.42, w: colW, h: 0.4,
      fontFace: "Calibri", fontSize: 18, bold: true, color: FG,
      margin: 0,
    });

    // Description
    s.addText(p.desc, {
      x, y: y + 0.85, w: colW, h: 0.7,
      fontFace: "Calibri", fontSize: 12, color: "B8B8B8",
      margin: 0, valign: "top",
    });
  });
}

// =========================================================================
// SLIDE 3 — The Ten Holdings (table)
// =========================================================================
{
  const s = darkSlide();
  addHeader(s, "03 · HOLDINGS", "10 NAMES");

  // Title
  s.addText("The Ten Holdings", {
    x: MARGIN_X, y: 0.95, w: 7, h: 0.7,
    fontFace: "Arial", fontSize: 34, bold: true, color: FG,
    margin: 0,
  });

  // Right meta
  s.addText("AS OF 22 APR 2026 · NAV $248.4M", {
    x: SLIDE_W - MARGIN_X - 6, y: 1.15, w: 6, h: 0.3,
    fontFace: "Consolas", fontSize: 10, color: MUTED,
    charSpacing: 4, align: "right", margin: 0,
  });

  // Column layout (x positions + widths in inches)
  // #  TICKER  COMPANY               SLEEVE        WEIGHT   PRICE    Δ YTD
  const cols = [
    { key: "num",   x: MARGIN_X + 0.0, w: 0.5,  align: "left"   },
    { key: "tkr",   x: MARGIN_X + 0.7, w: 1.0,  align: "left"   },
    { key: "co",    x: MARGIN_X + 2.0, w: 3.5,  align: "left"   },
    { key: "sleeve",x: MARGIN_X + 5.8, w: 2.0,  align: "left"   },
    { key: "w",     x: MARGIN_X + 8.0, w: 1.2,  align: "right"  },
    { key: "px",    x: MARGIN_X + 9.4, w: 1.2,  align: "right"  },
    { key: "ytd",   x: MARGIN_X + 10.7,w: 1.2,  align: "right"  },
  ];

  const headerY = 1.95;
  const headerOpts = {
    fontFace: "Consolas", fontSize: 9, color: MUTED,
    charSpacing: 4, margin: 0, valign: "middle",
  };
  const headerLabels = {
    num: "#", tkr: "TICKER", co: "COMPANY", sleeve: "SLEEVE",
    w: "WEIGHT", px: "PRICE", ytd: "Δ YTD",
  };
  cols.forEach((c) => {
    s.addText(headerLabels[c.key], {
      x: c.x, y: headerY, w: c.w, h: 0.3,
      align: c.align, ...headerOpts,
    });
  });

  // header underline
  s.addShape(pres.shapes.LINE, {
    x: MARGIN_X, y: headerY + 0.32, w: SLIDE_W - 2 * MARGIN_X, h: 0,
    line: { color: DIM, width: 0.5 },
  });

  // Rows
  const holdings = [
    ["01", "NVX",  "Nova Silicon Labs",  "Compute",     "14.0%", "$412.80", "+38.2%"],
    ["02", "HPRC", "HyperRack Systems",  "Compute",     "11.5%", "$188.45", "+24.6%"],
    ["03", "MMEM", "MosaicMemory",       "Compute",     "9.5%",  "$76.12",  "+19.8%"],
    ["04", "ORCL", "Orcasound Cloud",    "Models",      "12.0%", "$254.09", "+15.4%"],
    ["05", "LFRM", "Lumen Frameworks",   "Models",      "10.0%", "$98.70",  "+28.1%"],
    ["06", "SRCH", "Searchlight Labs",   "Models",      "8.0%",  "$342.55", "+11.2%"],
    ["07", "VXSA", "Vexa Software",      "Application", "9.0%",  "$511.30", "+21.7%"],
    ["08", "BRIO", "Brio Health AI",     "Application", "7.5%",  "$142.18", "+9.4%"],
    ["09", "SENT", "Sentinel Data Sec.", "Enablers",    "9.0%",  "$220.66", "+6.3%"],
    ["10", "KNTR", "Kontur Robotics",    "Enablers",    "9.5%",  "$64.27",  "-4.1%"],
  ];

  const rowStart = headerY + 0.48;
  const rowH = 0.44;

  holdings.forEach((row, i) => {
    const y = rowStart + i * rowH;

    // # (monospace muted)
    s.addText(row[0], {
      x: cols[0].x, y, w: cols[0].w, h: rowH,
      fontFace: "Consolas", fontSize: 11, color: MUTED,
      align: "left", valign: "middle", margin: 0,
    });

    // ticker: pill-style box
    s.addShape(pres.shapes.RECTANGLE, {
      x: cols[1].x, y: y + 0.08, w: 0.85, h: 0.28,
      fill: { color: BG },
      line: { color: "5A5A5A", width: 0.75 },
    });
    s.addText(row[1], {
      x: cols[1].x, y: y + 0.08, w: 0.85, h: 0.28,
      fontFace: "Consolas", fontSize: 10, bold: true, color: FG,
      align: "center", valign: "middle", margin: 0,
    });

    // Company
    s.addText(row[2], {
      x: cols[2].x, y, w: cols[2].w, h: rowH,
      fontFace: "Calibri", fontSize: 13, color: FG,
      align: "left", valign: "middle", margin: 0,
    });

    // Sleeve
    s.addText(row[3], {
      x: cols[3].x, y, w: cols[3].w, h: rowH,
      fontFace: "Calibri", fontSize: 13, color: "CCCCCC",
      align: "left", valign: "middle", margin: 0,
    });

    // Weight (right-aligned, monospace)
    s.addText(row[4], {
      x: cols[4].x, y, w: cols[4].w, h: rowH,
      fontFace: "Consolas", fontSize: 12, color: FG,
      align: "right", valign: "middle", margin: 0,
    });

    // Price
    s.addText(row[5], {
      x: cols[5].x, y, w: cols[5].w, h: rowH,
      fontFace: "Consolas", fontSize: 12, color: FG,
      align: "right", valign: "middle", margin: 0,
    });

    // YTD — green for +, red for -
    const ytdColor = row[6].startsWith("-") ? RED : GREEN;
    s.addText(row[6], {
      x: cols[6].x, y, w: cols[6].w, h: rowH,
      fontFace: "Consolas", fontSize: 12, color: ytdColor,
      align: "right", valign: "middle", margin: 0,
    });

    // Thin divider between rows
    if (i < holdings.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: MARGIN_X, y: y + rowH - 0.01, w: SLIDE_W - 2 * MARGIN_X, h: 0,
        line: { color: "1F1F1F", width: 0.5 },
      });
    }
  });
}

// =========================================================================
// SLIDE 4 — Allocation & Weights (bar list + donut)
// =========================================================================
{
  const s = darkSlide();
  addHeader(s, "04 · ALLOCATION", "WEIGHTS");

  // Eyebrow
  s.addText("SLEEVE DISTRIBUTION", {
    x: MARGIN_X, y: 0.95, w: 6, h: 0.3,
    fontFace: "Consolas", fontSize: 10, color: MUTED,
    charSpacing: 4, margin: 0,
  });

  // Title
  s.addText("Allocation & Weights", {
    x: MARGIN_X, y: 1.3, w: 8, h: 0.7,
    fontFace: "Arial", fontSize: 34, bold: true, color: FG,
    margin: 0,
  });

  // -------- LEFT: BY HOLDING (horizontal bars) --------
  s.addText("BY HOLDING", {
    x: MARGIN_X, y: 2.5, w: 5, h: 0.3,
    fontFace: "Consolas", fontSize: 10, color: MUTED,
    charSpacing: 4, margin: 0,
  });

  const bars = [
    ["NVX",  14.0],
    ["ORCL", 12.0],
    ["HPRC", 11.5],
    ["LFRM", 10.0],
    ["MMEM",  9.5],
    ["KNTR",  9.5],
    ["VXSA",  9.0],
    ["SENT",  9.0],
    ["SRCH",  8.0],
    ["BRIO",  7.5],
  ];

  const barAreaX = MARGIN_X + 1.0;   // start of bar track
  const barAreaW = 3.6;              // total track width
  const barAreaY = 2.95;
  const barRowH  = 0.34;
  const barH     = 0.12;
  const barMax   = 14.0;             // scale baseline

  bars.forEach(([label, pct], i) => {
    const y = barAreaY + i * barRowH;

    // ticker label
    s.addText(label, {
      x: MARGIN_X, y: y - 0.05, w: 0.9, h: 0.22,
      fontFace: "Consolas", fontSize: 11, color: FG,
      align: "left", valign: "middle", margin: 0,
    });

    // track
    s.addShape(pres.shapes.RECTANGLE, {
      x: barAreaX, y: y + 0.04, w: barAreaW, h: barH,
      fill: { color: TRACK }, line: { color: TRACK, width: 0 },
    });

    // value bar
    const w = (pct / barMax) * barAreaW;
    s.addShape(pres.shapes.RECTANGLE, {
      x: barAreaX, y: y + 0.04, w, h: barH,
      fill: { color: GREEN }, line: { color: GREEN, width: 0 },
    });

    // percent label
    s.addText(`${pct.toFixed(1)}%`, {
      x: barAreaX + barAreaW + 0.15, y: y - 0.05, w: 0.9, h: 0.22,
      fontFace: "Consolas", fontSize: 11, color: FG,
      align: "left", valign: "middle", margin: 0,
    });
  });

  // -------- RIGHT: BY SLEEVE (donut) --------
  s.addText("BY SLEEVE", {
    x: 7.3, y: 2.5, w: 4, h: 0.3,
    fontFace: "Consolas", fontSize: 10, color: MUTED,
    charSpacing: 4, margin: 0,
  });

  const donutData = [
    {
      name: "Sleeve",
      labels: ["Compute", "Models", "Application", "Enablers"],
      values: [35.0, 30.0, 16.5, 18.5],
    },
  ];
  s.addChart(pres.charts.DOUGHNUT, donutData, {
    x: 7.5, y: 2.8, w: 3.4, h: 3.2,
    chartColors: [GREEN, GREEN_D, GREEN_L, GREEN_DD],
    chartArea: { fill: { color: BG } },
    plotArea:  { fill: { color: BG } },
    dataBorder: { pt: 2, color: BG },
    showLegend: false,
    showPercent: false,
    showValue: false,
    holeSize: 65,
  });

  // Center label: 100% / EQUITY
  s.addText("100%", {
    x: 7.5, y: 4.05, w: 3.4, h: 0.5,
    fontFace: "Georgia", fontSize: 26, bold: true, color: FG,
    align: "center", valign: "middle", margin: 0,
  });
  s.addText("EQUITY", {
    x: 7.5, y: 4.55, w: 3.4, h: 0.3,
    fontFace: "Consolas", fontSize: 10, color: MUTED,
    charSpacing: 4, align: "center", valign: "middle", margin: 0,
  });

  // Donut legend under chart (2 columns)
  const legend = [
    ["Compute",     "35.0%", GREEN,    7.3],
    ["Models",      "30.0%", GREEN_D,  9.9],
    ["Application", "16.5%", GREEN_L,  7.3],
    ["Enablers",    "18.5%", GREEN_DD, 9.9],
  ];
  legend.forEach(([label, val, color, x], i) => {
    const y = 6.4 + Math.floor(i / 2) * 0.35;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: y + 0.06, w: 0.14, h: 0.14,
      fill: { color }, line: { color, width: 0 },
    });
    s.addText(`${label} · ${val}`, {
      x: x + 0.22, y, w: 2.5, h: 0.28,
      fontFace: "Calibri", fontSize: 12, color: "CCCCCC",
      align: "left", valign: "middle", margin: 0,
    });
  });
}

// =========================================================================
// SLIDE 5 — Key Metrics (table)
// =========================================================================
{
  const s = darkSlide();
  addHeader(s, "05 · METRICS", "FUNDAMENTALS");

  // Eyebrow
  s.addText("FUNDAMENTALS SNAPSHOT", {
    x: MARGIN_X, y: 0.95, w: 6, h: 0.3,
    fontFace: "Consolas", fontSize: 10, color: MUTED,
    charSpacing: 4, margin: 0,
  });

  // Title + right meta
  s.addText("Key Metrics", {
    x: MARGIN_X, y: 1.3, w: 7, h: 0.7,
    fontFace: "Arial", fontSize: 34, bold: true, color: FG, margin: 0,
  });
  s.addText("FY26E · CONSENSUS", {
    x: SLIDE_W - MARGIN_X - 4, y: 1.5, w: 4, h: 0.3,
    fontFace: "Consolas", fontSize: 10, color: MUTED,
    charSpacing: 4, align: "right", margin: 0,
  });

  // Columns
  const metricsCols = [
    { key: "holding", label: "HOLDING",     x: MARGIN_X + 0.0,  w: 2.4, align: "left"  },
    { key: "mcap",    label: "MKT CAP ($B)",x: MARGIN_X + 2.5,  w: 1.6, align: "right" },
    { key: "rev",     label: "REV GR.",     x: MARGIN_X + 4.2,  w: 1.1, align: "right" },
    { key: "gm",      label: "GROSS M.",    x: MARGIN_X + 5.4,  w: 1.1, align: "right" },
    { key: "fcf",     label: "FCF M.",      x: MARGIN_X + 6.6,  w: 1.0, align: "right" },
    { key: "pe",      label: "P/E",         x: MARGIN_X + 7.7,  w: 0.9, align: "right" },
    { key: "evs",     label: "EV/SALES",    x: MARGIN_X + 8.7,  w: 1.1, align: "right" },
    { key: "beta",    label: "BETA",        x: MARGIN_X + 9.9,  w: 0.9, align: "right" },
    { key: "div",     label: "DIV Y.",      x: MARGIN_X + 10.9, w: 1.0, align: "right" },
  ];

  const headerY = 2.15;
  metricsCols.forEach((c) => {
    s.addText(c.label, {
      x: c.x, y: headerY, w: c.w, h: 0.3,
      fontFace: "Consolas", fontSize: 9, color: MUTED,
      charSpacing: 4, align: c.align, valign: "middle", margin: 0,
    });
  });
  s.addShape(pres.shapes.LINE, {
    x: MARGIN_X, y: headerY + 0.32, w: SLIDE_W - 2 * MARGIN_X, h: 0,
    line: { color: DIM, width: 0.5 },
  });

  const rows = [
    ["Nova Silicon Labs", "3,420", "42.1%", "76.4%", "49.8%", "38.2", "22.6", "1.62", "0.05%"],
    ["HyperRack Systems", "186",   "54.8%", "38.2%", "18.1%", "42.7", "5.9",  "1.74", "—"],
    ["MosaicMemory",      "92",    "31.4%", "44.0%", "22.6%", "19.5", "4.2",  "1.45", "0.80%"],
    ["Orcasound Cloud",   "1,840", "22.7%", "70.1%", "32.4%", "32.1", "11.8", "1.08", "0.62%"],
    ["Lumen Frameworks",  "74",    "68.2%", "81.5%", "14.7%", "—",    "18.4", "1.91", "—"],
    ["Searchlight Labs",  "2,110", "18.4%", "58.2%", "28.9%", "26.8", "8.1",  "1.12", "0.45%"],
    ["Vexa Software",     "312",   "29.6%", "79.8%", "34.2%", "51.4", "14.7", "1.22", "—"],
    ["Brio Health AI",    "28",    "47.3%", "72.5%", "9.8%",  "—",    "12.6", "1.38", "—"],
    ["Sentinel Data Sec.","88",    "26.9%", "74.1%", "25.3%", "44.2", "13.9", "1.04", "—"],
    ["Kontur Robotics",   "19",    "61.7%", "32.4%", "-6.1%", "—",    "7.2",  "2.08", "—"],
    ["Bucket Wtd. Avg.",  "—",     "35.8%", "64.7%", "27.9%", "33.1", "12.4", "1.41", "0.21%"],
  ];

  const rowStart = headerY + 0.45;
  const rowH = 0.4;

  rows.forEach((row, i) => {
    const y = rowStart + i * rowH;
    const isAvg = i === rows.length - 1;

    metricsCols.forEach((c, ci) => {
      const color = isAvg && ci === 0 ? GREEN : (isAvg ? FG : (ci === 0 ? FG : "DADADA"));
      const bold  = isAvg;
      const font  = ci === 0 ? "Calibri" : "Consolas";
      const size  = ci === 0 ? 13 : 12;
      s.addText(row[ci], {
        x: c.x, y, w: c.w, h: rowH,
        fontFace: font, fontSize: size, color, bold,
        align: c.align, valign: "middle", margin: 0,
      });
    });

    // Divider line (skip last)
    if (i < rows.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: MARGIN_X, y: y + rowH - 0.01, w: SLIDE_W - 2 * MARGIN_X, h: 0,
        line: { color: "1F1F1F", width: 0.5 },
      });
    } else {
      // heavier line above avg row
      s.addShape(pres.shapes.LINE, {
        x: MARGIN_X, y: y - 0.01, w: SLIDE_W - 2 * MARGIN_X, h: 0,
        line: { color: DIM, width: 0.75 },
      });
    }
  });
}

// =========================================================================
// SLIDE 6 — Performance vs Benchmark
// =========================================================================
{
  const s = darkSlide();
  addHeader(s, "06 · PERFORMANCE", "VS S&P 500");

  // Eyebrow
  s.addText("TOTAL RETURN · REBASED 100", {
    x: MARGIN_X, y: 0.95, w: 6, h: 0.3,
    fontFace: "Consolas", fontSize: 10, color: MUTED,
    charSpacing: 4, margin: 0,
  });

  // Title
  s.addText("Performance vs. Benchmark", {
    x: MARGIN_X, y: 1.3, w: 10, h: 0.7,
    fontFace: "Arial", fontSize: 34, bold: true, color: FG, margin: 0,
  });

  // Line chart (left ~60%)
  const labels = [
    "'24 Q1", "'24 Q2", "'24 Q3", "'24 Q4",
    "'25 Q1", "'25 Q2", "'25 Q3", "'25 Q4",
    "'26 Q1", "Now",
  ];
  const bucket = [100, 118, 128, 125, 140, 148, 140, 170, 200, 254.2];
  const sp500  = [100, 104, 108, 110, 115, 118, 122, 130, 140, 154.8];

  s.addChart(
    pres.charts.LINE,
    [
      { name: "AI Bucket", labels, values: bucket },
      { name: "S&P 500",   labels, values: sp500 },
    ],
    {
      x: 0.5, y: 2.1, w: 8.2, h: 4.9,
      chartColors: [GREEN, "888888"],
      chartArea: { fill: { color: BG } },
      plotArea:  { fill: { color: BG } },
      lineSize: 3, lineSmooth: true,
      showLegend: false,
      catAxisLabelColor: MUTED,
      catAxisLabelFontFace: "Consolas",
      catAxisLabelFontSize: 9,
      valAxisLabelColor: MUTED,
      valAxisLabelFontFace: "Consolas",
      valAxisLabelFontSize: 9,
      valAxisMinVal: 80,
      valAxisMaxVal: 280,
      valAxisMajorUnit: 40,
      valGridLine: { color: "1F1F1F", size: 0.5 },
      catGridLine: { style: "none" },
      lineDataSymbol: "none",
    }
  );

  // Right-side metric stack
  const statX = 9.0;
  const stats = [
    { label: "CAGR (SINCE INCEPTION)", value: "+46.8%",  sub: "vs S&P +21.2%",           color: GREEN },
    { label: "YTD RETURN",             value: "+18.4%",  sub: "vs S&P +6.7%",            color: GREEN },
    { label: "ALPHA (1Y)",             value: "+15.1%",  sub: "Annualised excess return", color: GREEN },
    { label: "SHARPE RATIO",           value: "1.74",    sub: "Risk-adjusted, 3M T-bill", color: FG    },
  ];

  stats.forEach((st, i) => {
    const y = 2.2 + i * 1.25;
    s.addText(st.label, {
      x: statX, y, w: 4, h: 0.28,
      fontFace: "Consolas", fontSize: 9, color: MUTED,
      charSpacing: 4, margin: 0,
    });
    s.addText(st.value, {
      x: statX, y: y + 0.3, w: 4, h: 0.55,
      fontFace: "Arial", fontSize: 32, bold: true, color: st.color, margin: 0,
    });
    s.addText(st.sub, {
      x: statX, y: y + 0.88, w: 4, h: 0.28,
      fontFace: "Calibri", fontSize: 11, color: MUTED, margin: 0,
    });
  });
}

// =========================================================================
// SLIDE 7 — Risk profile (stat cards + bar list + key risks)
// =========================================================================
{
  const s = darkSlide();
  addHeader(s, "07 · RISK", "PROFILE");

  // Eyebrow
  s.addText("RISK PROFILE", {
    x: MARGIN_X, y: 0.95, w: 6, h: 0.3,
    fontFace: "Consolas", fontSize: 10, color: MUTED,
    charSpacing: 4, margin: 0,
  });

  // Title
  s.addText("Concentration, beta, drawdown.", {
    x: MARGIN_X, y: 1.3, w: 10, h: 0.7,
    fontFace: "Arial", fontSize: 32, bold: true, color: FG, margin: 0,
  });

  // LEFT: 2x2 stat cards
  const cardW = 2.4;
  const cardH = 1.85;
  const cardGap = 0.15;
  const leftX = MARGIN_X;
  const cardsY = 2.35;
  const CARD_FILL = "141414";

  const cards = [
    { label: "PORTFOLIO BETA",   value: "1.41",    sub: "Versus S&P 500. Elevated —\nconsistent with the growth tilt.", color: FG },
    { label: "30-DAY VOL.",      value: "24.8%",   sub: "Annualised. ~1.7×\nbenchmark.",                                color: FG },
    { label: "MAX DRAWDOWN",     value: "-22.4%",  sub: "Aug 2024. Fully recovered\nwithin 94 trading days.",            color: RED },
    { label: "TRACKING ERROR",   value: "12.6%",   sub: "Annualised. High by design —\nthis is an active thematic\nsleeve.", color: FG },
  ];

  cards.forEach((c, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = leftX + col * (cardW + cardGap);
    const y = cardsY + row * (cardH + cardGap);

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cardW, h: cardH,
      fill: { color: CARD_FILL },
      line: { color: "222222", width: 0.5 },
    });
    s.addText(c.label, {
      x: x + 0.2, y: y + 0.18, w: cardW - 0.4, h: 0.28,
      fontFace: "Consolas", fontSize: 9, color: MUTED,
      charSpacing: 4, margin: 0,
    });
    s.addText(c.value, {
      x: x + 0.2, y: y + 0.48, w: cardW - 0.4, h: 0.7,
      fontFace: "Arial", fontSize: 38, bold: true, color: c.color, margin: 0,
    });
    s.addText(c.sub, {
      x: x + 0.2, y: y + 1.2, w: cardW - 0.4, h: 0.65,
      fontFace: "Calibri", fontSize: 11, color: "B8B8B8", margin: 0,
    });
  });

  // RIGHT: Concentration Top 5 bars
  const rightX = 5.8;
  const rightW = SLIDE_W - MARGIN_X - rightX;

  s.addText("CONCENTRATION — TOP 5 NAMES", {
    x: rightX, y: cardsY, w: rightW, h: 0.3,
    fontFace: "Consolas", fontSize: 10, color: MUTED,
    charSpacing: 4, margin: 0,
  });

  const top5 = [
    ["NVX",  14.0],
    ["ORCL", 12.0],
    ["HPRC", 11.5],
    ["LFRM", 10.0],
    ["MMEM",  9.5],
  ];
  const tBarX = rightX + 0.9;
  const tBarW = rightW - 1.8;
  const tBarY0 = cardsY + 0.5;
  const tRowH = 0.36;

  top5.forEach(([label, pct], i) => {
    const y = tBarY0 + i * tRowH;
    s.addText(label, {
      x: rightX, y: y - 0.05, w: 0.8, h: 0.22,
      fontFace: "Consolas", fontSize: 11, color: FG,
      valign: "middle", margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: tBarX, y: y + 0.04, w: tBarW, h: 0.12,
      fill: { color: TRACK }, line: { color: TRACK, width: 0 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: tBarX, y: y + 0.04, w: (pct / 14.0) * tBarW, h: 0.12,
      fill: { color: GREEN }, line: { color: GREEN, width: 0 },
    });
    s.addText(`${pct.toFixed(1)}%`, {
      x: tBarX + tBarW + 0.1, y: y - 0.05, w: 0.7, h: 0.22,
      fontFace: "Consolas", fontSize: 11, color: FG,
      align: "right", valign: "middle", margin: 0,
    });
  });

  // Total bar
  const totY = tBarY0 + 5 * tRowH + 0.05;
  s.addShape(pres.shapes.LINE, {
    x: rightX, y: totY, w: rightW, h: 0,
    line: { color: DIM, width: 0.5 },
  });
  s.addText("Top 5 Total", {
    x: rightX, y: totY + 0.08, w: 1.2, h: 0.25,
    fontFace: "Calibri", fontSize: 12, bold: true, color: FG,
    valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: tBarX, y: totY + 0.17, w: tBarW, h: 0.08,
    fill: { color: FG }, line: { color: FG, width: 0 },
  });
  s.addText("57.0%", {
    x: tBarX + tBarW + 0.1, y: totY + 0.08, w: 0.7, h: 0.22,
    fontFace: "Consolas", fontSize: 11, color: FG,
    align: "right", valign: "middle", margin: 0,
  });

  // Key risks box
  const krY = totY + 0.55;
  s.addShape(pres.shapes.RECTANGLE, {
    x: rightX, y: krY, w: rightW, h: 1.55,
    fill: { color: CARD_FILL }, line: { color: "222222", width: 0.5 },
  });
  s.addText("KEY RISKS", {
    x: rightX + 0.25, y: krY + 0.15, w: rightW - 0.5, h: 0.3,
    fontFace: "Consolas", fontSize: 10, color: MUTED,
    charSpacing: 4, margin: 0,
  });
  s.addText(
    [
      { text: "Single-vendor exposure to accelerator supply chain", options: { bullet: true, breakLine: true } },
      { text: "Model commoditisation pressuring frontier-lab margins", options: { bullet: true, breakLine: true } },
      { text: "Regulatory overhang — EU AI Act enforcement phase",    options: { bullet: true } },
    ],
    {
      x: rightX + 0.25, y: krY + 0.45, w: rightW - 0.5, h: 1.05,
      fontFace: "Calibri", fontSize: 12, color: "CCCCCC",
      paraSpaceAfter: 4, margin: 0,
    }
  );
}

// =========================================================================
// SLIDE 8 — Outlook & Next Review
// =========================================================================
{
  const s = darkSlide();
  addHeader(s, "08 · OUTLOOK", "NEXT REVIEW");

  // Eyebrow
  s.addText("12-MONTH OUTLOOK", {
    x: MARGIN_X, y: 0.95, w: 6, h: 0.3,
    fontFace: "Consolas", fontSize: 10, color: MUTED,
    charSpacing: 4, margin: 0,
  });

  // Title
  s.addText("Outlook & Next Review", {
    x: MARGIN_X, y: 1.3, w: 10, h: 0.7,
    fontFace: "Arial", fontSize: 34, bold: true, color: FG, margin: 0,
  });

  // 3 columns
  const colCount = 3;
  const colGap = 0.5;
  const colWidth = (SLIDE_W - 2 * MARGIN_X - (colCount - 1) * colGap) / colCount;
  const topY = 2.4;

  const columns = [
    {
      arrow: "↑ OVERWEIGHT",
      title: "Lean further into compute & frameworks.",
      items: [
        ["NVX  ·  +200 BPS",  "Demand visibility extends to 2028."],
        ["LFRM ·  +150 BPS",  "Enterprise framework adoption accelerating."],
        ["HPRC ·  +100 BPS",  "Liquid-cooling backlog covered through Q4."],
      ],
    },
    {
      arrow: "→ HOLD",
      title: "Monitor monetisation & margin trajectory.",
      items: [
        ["ORCL ·  FLAT", "Capex intensity still compressing FCF."],
        ["VXSA ·  FLAT", "ACV uplift on track; watch churn."],
        ["SENT ·  FLAT", "Waiting for AI-native product cycle."],
      ],
    },
    {
      arrow: "↓ TRIM / REVIEW",
      title: "Reduce where thesis is under pressure.",
      items: [
        ["KNTR ·  -150 BPS", "Path to positive FCF pushed to 2027."],
        ["BRIO ·  -100 BPS", "Reimbursement headwinds in core markets."],
        ["SRCH ·  REVIEW",   "Regulatory pending; decision next quarter."],
      ],
    },
  ];

  columns.forEach((col, i) => {
    const x = MARGIN_X + i * (colWidth + colGap);

    // Top divider
    s.addShape(pres.shapes.LINE, {
      x, y: topY, w: colWidth, h: 0,
      line: { color: "AAAAAA", width: 0.75 },
    });

    // Arrow tag
    s.addText(col.arrow, {
      x, y: topY + 0.1, w: colWidth, h: 0.3,
      fontFace: "Consolas", fontSize: 10, bold: true, color: GREEN,
      charSpacing: 4, margin: 0,
    });

    // Title
    s.addText(col.title, {
      x, y: topY + 0.45, w: colWidth, h: 0.8,
      fontFace: "Calibri", fontSize: 18, bold: true, color: FG,
      valign: "top", margin: 0,
    });

    // Items
    col.items.forEach((item, j) => {
      const y = topY + 1.35 + j * 0.75;

      s.addText(item[0], {
        x, y, w: colWidth, h: 0.28,
        fontFace: "Consolas", fontSize: 11, color: FG,
        charSpacing: 3, margin: 0,
      });
      s.addText(item[1], {
        x, y: y + 0.3, w: colWidth, h: 0.3,
        fontFace: "Calibri", fontSize: 12, color: "B8B8B8", margin: 0,
      });

      // Divider under items (except last)
      if (j < col.items.length - 1) {
        s.addShape(pres.shapes.LINE, {
          x, y: y + 0.68, w: colWidth, h: 0,
          line: { color: "1F1F1F", width: 0.5 },
        });
      }
    });
  });

  // Bottom divider
  const footerY = 6.7;
  s.addShape(pres.shapes.LINE, {
    x: MARGIN_X, y: footerY, w: SLIDE_W - 2 * MARGIN_X, h: 0,
    line: { color: DIM, width: 0.5 },
  });

  // Footer (3 segments)
  const footerOpts = {
    fontFace: "Consolas", fontSize: 8, color: MUTED,
    charSpacing: 2, margin: 0, valign: "middle",
  };
  s.addText("Next committee review · 15 Jul 2026", {
    x: MARGIN_X, y: footerY + 0.15, w: 4, h: 0.3,
    align: "left", ...footerOpts,
  });
  s.addText("Research Desk · Internal only · Not investment advice", {
    x: (SLIDE_W - 6) / 2, y: footerY + 0.15, w: 6, h: 0.3,
    align: "center", ...footerOpts, charSpacing: 1,
  });
  s.addText("Rev 2026.04", {
    x: SLIDE_W - MARGIN_X - 2, y: footerY + 0.15, w: 2, h: 0.3,
    align: "right", ...footerOpts,
  });
}

// ---------- Write file ----------
pres.writeFile({ fileName: "AI-Bucket.pptx" })
  .then((fn) => console.log("Wrote:", fn))
  .catch((err) => { console.error(err); process.exit(1); });
