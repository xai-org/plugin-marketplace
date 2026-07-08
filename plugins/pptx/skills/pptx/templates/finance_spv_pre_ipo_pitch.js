// ============================================================
// Project Anthos — Investor Deck (Anthropic SPV)
// Recreates the 14-slide PPTX with pptxgenjs
//
// Usage:  npm i -g pptxgenjs && node build.js
//         -> produces Project-Anthos.pptx
// ============================================================

const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");

// ---------- Palette ----------
const C = {
  BG:           "1A1A1C",   // slide background
  CARD:         "222225",   // card fill
  CARD2:        "2A2A2D",   // alternate card fill
  LINE_DIM:     "3A3A3D",   // subtle dividers, OpenAI line
  LINE_DIMMER:  "4A4A4D",   // even more subtle
  MUTED:        "5A5A57",   // source notes, captions
  LABEL:        "8A8A87",   // labels, footer
  IVORY:        "EDEDE8",   // primary text
  PEACH:        "E8A87C",   // accent
  PEACH_DK:     "B8845C",   // darker peach (smaller stats)
  RED:          "C97064",   // BEAR
  RED_DK:       "A86056",
  GREEN:        "A9D18E",   // MOON
};

// ---------- Fonts ----------
const F_SERIF = "Georgia";
const F_SANS  = "Aptos";
const F_DISP  = "Aptos Display";

// ---------- Logo (embedded PNG, base64) ----------
const LOGO_B64 = "image/png;base64," +
  fs.readFileSync(path.join(__dirname, "logo.b64"), "utf8").trim();

// ---------- Presentation setup ----------
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";             // 13.333" x 7.5"
pres.title = "Project Anthos";
pres.author = "Project Anthos";
const SW = 13.333, SH = 7.5;

// ============================================================
// Helpers
// ============================================================
function addBg(slide) {
  slide.background = { color: C.BG };
}

function addEyebrow(slide, text, y = 0.52) {
  // "/   SECTION NAME"
  slide.addText(
    [
      { text: "/", options: { color: C.PEACH, bold: false, fontFace: F_SANS } },
      { text: "   " + text, options: { color: C.PEACH, bold: true, fontFace: F_SANS, charSpacing: 6 } },
    ],
    { x: 0.55, y, w: 10, h: 0.35, fontSize: 11, margin: 0 }
  );
}

function addTitle(slide, text, y = 0.9) {
  slide.addText(text, {
    x: 0.55, y, w: 12.4, h: 0.85,
    fontSize: 30, fontFace: F_SERIF, color: C.IVORY,
    bold: false, valign: "top", margin: 0,
  });
}

function addSubtitle(slide, text, y = 1.62) {
  slide.addText(text, {
    x: 0.55, y, w: 12.2, h: 0.55,
    fontSize: 19, fontFace: F_SANS, color: C.LABEL,
    italic: true, valign: "top", margin: 0,
  });
}

function addSourcesLine(slide, text) {
  // Italic small source line above footer
  slide.addText(text, {
    x: 0.55, y: 6.63, w: 12.25, h: 0.38,
    fontSize: 9, fontFace: F_SANS, italic: true,
    color: C.MUTED, valign: "top", margin: 0,
  });
}

function addFooter(slide, pageNum, totalPages = 13) {
  // Thin divider
  slide.addShape(pres.shapes.LINE, {
    x: 0.55, y: 7.05, w: 12.25, h: 0,
    line: { color: C.LINE_DIM, width: 0.5 },
  });
  // Logo (tiny, 0.22")
  slide.addImage({
    data: LOGO_B64,
    x: 0.52, y: 7.14, w: 0.22, h: 0.22,
  });
  // Project Anthos / Confidential
  slide.addText(
    [
      { text: "PROJECT ANTHOS  /  CONFIDENTIAL", options: { color: C.LABEL, charSpacing: 4 } },
    ],
    { x: 0.82, y: 7.14, w: 6, h: 0.22,
      fontSize: 9, fontFace: F_SANS, bold: true, valign: "middle", margin: 0 }
  );
  // Page number
  slide.addText(`${String(pageNum).padStart(2, "0")} / ${totalPages}`, {
    x: 11.8, y: 7.14, w: 1.0, h: 0.22,
    fontSize: 9, fontFace: F_SANS, bold: true, color: C.LABEL,
    align: "right", valign: "middle", charSpacing: 4, margin: 0,
  });
}

function stdFrame(slide, eyebrow, title, subtitle, pageNum) {
  addBg(slide);
  addEyebrow(slide, eyebrow);
  addTitle(slide, title);
  if (subtitle) addSubtitle(slide, subtitle);
  addFooter(slide, pageNum);
}

// ============================================================
// SLIDE 1 — Cover
// ============================================================
function slide1() {
  const s = pres.addSlide();
  addBg(s);

  // Logo
  s.addImage({ data: LOGO_B64, x: 0.55, y: 2.85, w: 0.7, h: 0.7 });

  // Eyebrow: /   PROJECT ANTHOS
  s.addText(
    [
      { text: "/", options: { color: C.PEACH, fontFace: F_SANS } },
      { text: "   PROJECT ANTHOS", options: { color: C.PEACH, bold: true, fontFace: F_SANS, charSpacing: 6 } },
    ],
    { x: 0.55, y: 3.75, w: 8, h: 0.35, fontSize: 12, margin: 0 }
  );

  // Big title: Anthropic.
  s.addText("Anthropic.", {
    x: 0.55, y: 4.05, w: 12, h: 1.5,
    fontSize: 96, fontFace: F_SERIF, color: C.IVORY,
    valign: "top", margin: 0,
  });

  // Tagline
  s.addText("A $25M vehicle into the most consequential pre-IPO listing in technology.", {
    x: 0.55, y: 5.55, w: 12, h: 0.5,
    fontSize: 20, fontFace: F_SANS, italic: true, color: C.LABEL,
    valign: "top", margin: 0,
  });

  // Footer line
  s.addShape(pres.shapes.LINE, {
    x: 0.55, y: 6.85, w: 12.25, h: 0,
    line: { color: C.LINE_DIM, width: 0.5 },
  });
  s.addText("APRIL 2026", {
    x: 0.55, y: 6.98, w: 4, h: 0.3,
    fontSize: 10, fontFace: F_SANS, bold: true, color: C.LABEL,
    charSpacing: 6, valign: "middle", margin: 0,
  });
  s.addText("INVESTOR PRESENTATION", {
    x: 8.5, y: 6.98, w: 4.35, h: 0.3,
    fontSize: 10, fontFace: F_SANS, bold: true, color: C.LABEL,
    align: "right", charSpacing: 5, valign: "middle", margin: 0,
  });
}

// ============================================================
// SLIDE 2 — Executive Summary (4 cards)
// ============================================================
function slide2() {
  const s = pres.addSlide();
  stdFrame(
    s,
    "EXECUTIVE SUMMARY",
    "A $25M SPV for the defining pre-IPO listing in AI.",
    "Listing access, category leadership, and enterprise economics.",
    2
  );

  const cardW = 5.9, cardH = 1.85;
  const lx = 0.55, rx = 6.85;
  const topY = 2.55, botY = 4.55;

  const cards = [
    { x: lx, y: topY, label: "RECOMMENDATION", h1: "Commit up to $25M",
      body: "Pursue a Delaware SPV at the next pricing window, contingency applies to confirmed allocation, pricing band within 1.5-2.5x current secondary." },
    { x: rx, y: topY, label: "WHY NOW", h1: "Secondary bids at $800B+",
      body: "Per Bloomberg: VCs are bidding the company at $800B+, greater than 2x Feb 2026 Series G at $380B. IPO reportedly in discussion for H2 2026." },
    { x: lx, y: botY, label: "BASE CASE", h1: "~2.0x MOIC, ~26% IRR (3yr)",
      body: "Built on enterprise revenue continuing 6-8x year-over-year acceleration through 2026 and re-rating to a blended Nvidia-Palantir multiple at exit." },
    { x: rx, y: botY, label: "PRINCIPAL RISKS", h1: "Four named, four mitigated",
      body: "Multiple compression, frontier-model commoditization, power supply concentration, and a tightening regulatory regime; mitigations apply" },
  ];

  cards.forEach(c => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: c.y, w: cardW, h: cardH,
      fill: { color: C.CARD },
      line: { color: C.LINE_DIM, width: 0.5 },
    });
    s.addText(c.label, {
      x: c.x + 0.3, y: c.y + 0.2, w: cardW - 0.6, h: 0.28,
      fontSize: 10, fontFace: F_SANS, bold: true, color: C.PEACH,
      charSpacing: 5, valign: "top", margin: 0,
    });
    s.addText(c.h1, {
      x: c.x + 0.3, y: c.y + 0.52, w: cardW - 0.6, h: 0.55,
      fontSize: 22, fontFace: F_SERIF, color: C.IVORY,
      valign: "top", margin: 0,
    });
    s.addText(c.body, {
      x: c.x + 0.3, y: c.y + 1.08, w: cardW - 0.6, h: 0.7,
      fontSize: 11, fontFace: F_SANS, color: C.IVORY,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    });
  });

  addSourcesLine(s,
    "Sources: Bloomberg (April 14, 2026); Anthropic Series G announcement (Feb 12, 2026); CNBC; press reports cited throughout deck. Returns are illustrative modeled scenarios — see appendix."
  );
}

// ============================================================
// SLIDE 3 — Opportunity & Structure (capital flow + table)
// ============================================================
function slide3() {
  const s = pres.addSlide();
  stdFrame(
    s,
    "OPPORTUNITY & STRUCTURE",
    "Scarce Anthropic allocation on institutional terms.",
    "Single-purpose Delaware SPV with standard institutional economics.",
    3
  );

  // ---- Left side: Capital Flow ----
  // Label pill
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.55, y: 2.55, w: 1.6, h: 0.5,
    fill: { color: C.CARD }, line: { color: C.LINE_DIM, width: 0.5 },
  });
  // Peach left accent on label
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.55, y: 2.55, w: 0.05, h: 0.5, fill: { color: C.PEACH }, line: { color: C.PEACH, width: 0 },
  });
  s.addText("CAPITAL\nFLOW", {
    x: 0.75, y: 2.58, w: 1.4, h: 0.45,
    fontSize: 9, fontFace: F_SANS, bold: true, color: C.IVORY,
    charSpacing: 4, valign: "middle", margin: 0,
  });

  // Three boxes
  const boxW = 2.0, boxH = 1.3, boxY = 3.15;
  const boxes = [
    { x: 0.55, num: "$25.0M", label: "GROSS COMMITS", sub: "Soft cap commit limit", highlight: false },
    { x: 2.85, num: "$0.5M",  label: "FEES & RESERVES", sub: "Setup, admin, custody", highlight: false },
    { x: 5.15, num: "$24.5M", label: "NET DEPLOYABLE", sub: "100% sale allocation", highlight: true },
  ];
  boxes.forEach(b => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: b.x, y: boxY, w: boxW, h: boxH,
      fill: { color: C.CARD }, line: { color: C.LINE_DIM, width: 0.5 },
    });
    if (b.highlight) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: b.x, y: boxY, w: 0.07, h: boxH,
        fill: { color: C.PEACH }, line: { color: C.PEACH, width: 0 },
      });
    }
    s.addText(b.num, {
      x: b.x + 0.15, y: boxY + 0.12, w: boxW - 0.3, h: 0.55,
      fontSize: 28, fontFace: F_SERIF, color: b.highlight ? C.PEACH : C.IVORY,
      valign: "top", margin: 0,
    });
    s.addText(b.label, {
      x: b.x + 0.15, y: boxY + 0.68, w: boxW - 0.2, h: 0.25,
      fontSize: 9, fontFace: F_SANS, bold: true, color: b.highlight ? C.PEACH : C.IVORY,
      charSpacing: 2, valign: "top", margin: 0,
    });
    s.addText(b.sub, {
      x: b.x + 0.15, y: boxY + 0.92, w: boxW - 0.3, h: 0.32,
      fontSize: 10, fontFace: F_SANS, color: C.LABEL,
      valign: "top", margin: 0,
    });
  });

  // Arrows between boxes
  [2.55, 4.85].forEach(x => {
    s.addText("→", {
      x, y: boxY + 0.48, w: 0.3, h: 0.35,
      fontSize: 18, fontFace: F_SANS, color: C.LABEL,
      align: "center", valign: "middle", margin: 0,
    });
  });

  // ---- THE OFFERING label + card ----
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.55, y: 4.7, w: 2.15, h: 0.5,
    fill: { color: C.CARD }, line: { color: C.LINE_DIM, width: 0.5 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.55, y: 4.7, w: 0.05, h: 0.5, fill: { color: C.PEACH }, line: { color: C.PEACH, width: 0 },
  });
  s.addText("THE OFFERING", {
    x: 0.75, y: 4.72, w: 1.95, h: 0.45,
    fontSize: 10, fontFace: F_SANS, bold: true, color: C.IVORY,
    charSpacing: 4, valign: "middle", margin: 0,
  });

  // Offering body card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.55, y: 5.25, w: 6.6, h: 1.25,
    fill: { color: C.BG }, line: { color: C.LINE_DIM, width: 0.5 },
  });
  s.addText(
    "Primary access to Anthropic at a $380B-$800B+ valuation, offering exposure to one of the fastest-scaling private AI companies, with annualized revenue increasing from $9B-$30B within the first quarter of 2026, on standard institutional primary terms.",
    { x: 0.75, y: 5.38, w: 6.25, h: 1.05,
      fontSize: 11, fontFace: F_SANS, color: C.IVORY, valign: "top", margin: 0 }
  );

  // ---- Right side: STRUCTURE panel ----
  // Header label
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.55, y: 2.55, w: 1.75, h: 0.5,
    fill: { color: C.CARD }, line: { color: C.PEACH, width: 0.5 },
  });
  s.addText("STRUCTURE", {
    x: 7.65, y: 2.58, w: 1.55, h: 0.45,
    fontSize: 10, fontFace: F_SANS, bold: true, color: C.PEACH,
    charSpacing: 4, valign: "middle", margin: 0,
  });

  // Body card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.55, y: 3.15, w: 5.25, h: 3.35,
    fill: { color: C.BG }, line: { color: C.LINE_DIM, width: 0.5 },
  });

  const rows = [
    ["Vehicle", "Delaware SPV"],
    ["Target raise", "$25M (soft) / $35M (hard)"],
    ["Fee structure", "2% mgmt / 20% carry"],
    ["Hold period", "3 years"],
    ["Lock-up", "180 days post-listing"],
    ["Min commitment", "$250,000"],
    ["Soft close", "May 30, 2026"],
    ["Hard close", "June 30, 2026"],
  ];
  const rowH = 0.38, startY = 3.3, keyX = 7.75, valX = 9.8;
  rows.forEach((r, i) => {
    const y = startY + i * rowH;
    s.addText(r[0], {
      x: keyX, y, w: 2.0, h: rowH,
      fontSize: 12, fontFace: F_SANS, color: C.LABEL, valign: "middle", margin: 0,
    });
    s.addText(r[1], {
      x: valX, y, w: 2.95, h: rowH,
      fontSize: 12, fontFace: F_SANS, color: C.IVORY, valign: "middle", margin: 0,
    });
  });

  addSourcesLine(s,
    "Terms are indicative and subject to definitive documentation. SPV structure assumes a single-purpose Delaware vehicle with a single GP entity."
  );
}


// ============================================================
// SLIDE 4 — The Moat (line chart + 3 stat callouts)
// ============================================================
function slide4() {
  const s = pres.addSlide();
  stdFrame(
    s,
    "THE MOAT",
    "A moat pure-model competitors cannot replicate.",
    "Benchmark leadership, enterprise distribution, and regulator trust.",
    4
  );

  // Chart label
  s.addText("ANTHROPIC SHARE OF COMBINED ANTHROPIC + OPENAI ENTERPRISE SPEND", {
    x: 0.55, y: 2.45, w: 8.1, h: 0.4,
    fontSize: 10, fontFace: F_SANS, bold: true, color: C.LABEL,
    charSpacing: 4, valign: "top", margin: 0,
  });

  // Line chart
  s.addChart(pres.charts.LINE, [
    { name: "Anthropic", labels: ["Q1'25","Q2'25","Q3'25","Q4'25","Q1'26","Q2'26"],
      values: [12, 18, 28, 42, 58, 65] },
    { name: "OpenAI",    labels: ["Q1'25","Q2'25","Q3'25","Q4'25","Q1'26","Q2'26"],
      values: [88, 82, 72, 58, 42, 35] },
  ], {
    x: 0.35, y: 2.9, w: 8.1, h: 3.5,
    chartColors: [C.PEACH, "6F6F6F"],
    chartArea: { fill: { color: C.BG } },
    plotArea:  { fill: { color: C.BG } },
    catAxisLabelColor: C.LABEL,
    valAxisLabelColor: C.LABEL,
    catAxisLabelFontFace: F_SANS, valAxisLabelFontFace: F_SANS,
    catAxisLabelFontSize: 11, valAxisLabelFontSize: 11,
    valGridLine: { style: "none" },
    catGridLine: { style: "none" },
    valAxisMaxVal: 100, valAxisMinVal: 0,
    valAxisMajorUnit: 25,
    showLegend: true, legendPos: "b",
    legendColor: C.LABEL, legendFontSize: 11, legendFontFace: F_SANS,
    lineSize: 3, lineDataSymbol: "circle", lineDataSymbolSize: 8,
    showLine: true,
  });

  // Right: 3 big stat callouts
  const stats = [
    { y: 2.55, num: "65%",  label: "ENTERPRISE API SHARE",
      sub: "Of combined Anthropic + OpenAI spend, Q1 2026" },
    { y: 3.85, num: "$2.5B", label: "CLAUDE CODE ARR",
      sub: "Credited across 4% of all public GitHub commits" },
    { y: 5.15, num: "80%",   label: "REVENUE FROM ENTERPRISE",
      sub: "Per Anthropic CEO statement release (Mar 2026)" },
  ];
  stats.forEach(st => {
    s.addText(st.num, {
      x: 8.9, y: st.y, w: 3.8, h: 0.6,
      fontSize: 36, fontFace: F_SERIF, color: C.PEACH, valign: "top", margin: 0,
    });
    // small underline bar under number
    s.addShape(pres.shapes.LINE, {
      x: 8.9, y: st.y + 0.6, w: 0.6, h: 0,
      line: { color: C.PEACH, width: 0.75 },
    });
    s.addText(st.label, {
      x: 8.9, y: st.y + 0.68, w: 3.8, h: 0.25,
      fontSize: 9, fontFace: F_SANS, bold: true, color: C.LABEL,
      charSpacing: 4, valign: "top", margin: 0,
    });
    s.addText(st.sub, {
      x: 8.9, y: st.y + 0.95, w: 3.8, h: 0.5,
      fontSize: 11, fontFace: F_SANS, color: C.IVORY, valign: "top", margin: 0,
    });
  });

  addSourcesLine(s,
    "Sources: Ramp Economics Lab (combined enterprise spend share); CNBC (Claude Code ARR, GitHub commit attribution); Anthropic statement releases. Q2'26 figures are estimates from Q1 trajectory."
  );
}

// ============================================================
// SLIDE 5 — Performance Benchmarks (6 horizontal bar charts)
// ============================================================
function slide5() {
  const s = pres.addSlide();
  stdFrame(
    s,
    "PERFORMANCE BENCHMARKS",
    "Claude leads on the benchmarks that enterprises buy on.",
    "Six benchmarks across the categories that matter in production.",
    5
  );

  // 6 mini charts in a 2x3 grid
  const chartData = [
    { title: "ARC-AGI 2", sub: "% (novel problem-solving)",
      labels: ["Claude Opus 4.5","Gemini 3 Pro","GPT-5.2 Pro","Claude Opus 4.6"],
      values: [38, 45, 54, 69], winnerIdx: 3 },
    { title: "BROWSE-COMP", sub: "% (research agent)",
      labels: ["GPT-5.4","Gemini 3 Pro","GPT-5.2","Claude Opus 4.6"],
      values: [71, 67, 73, 84], winnerIdx: 3 },
    { title: "OS-WORLD", sub: "% (computer-use tasks)",
      labels: ["Claude Sonnet 4.5","Gemini 3 Pro","GPT-5.2","Claude Opus 4.6"],
      values: [58, 55, 61, 73], winnerIdx: 3 },
    { title: "SWE-BENCH VERIFIED", sub: "% (real coding tasks)",
      labels: ["GPT-5.2","Gemini 3.1 Pro","Claude Opus 4.6","Claude Opus 4.5"],
      values: [80, 81, 81, 81], winnerIdx: 2 },
    { title: "GPQA DIAMOND", sub: "% (PhD-level reasoning)",
      labels: ["Claude Opus 4.5","Claude Opus 4.6","Gemini 3 Pro","GPT-5.2 Pro"],
      values: [87, 91, 92, 93], winnerIdx: 1 },
    { title: "MRCR V2 (1M CTX)", sub: "% (long-context retrieval)",
      labels: ["Claude Opus 4.5","Gemini 3 Pro","GPT-5.2 Thinking","Claude Opus 4.6"],
      values: [65, 60, 70, 76], winnerIdx: 3 },
  ];

  const cellW = 4.1, cellH = 2.0;
  const cellX = [0.4, 4.55, 8.7];
  const cellY = [2.35, 4.55];

  chartData.forEach((d, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = cellX[col], y = cellY[row];

    // Mini-title
    s.addText(d.title, {
      x: x + 0.15, y: y, w: cellW - 0.3, h: 0.25,
      fontSize: 10, fontFace: F_SANS, bold: true, color: C.LABEL,
      charSpacing: 4, valign: "top", margin: 0,
    });
    s.addText(d.sub, {
      x: x + 0.15, y: y + 0.22, w: cellW - 0.3, h: 0.22,
      fontSize: 9, fontFace: F_SANS, color: C.LABEL,
      valign: "top", margin: 0,
    });

    // Reverse data arrays so PowerPoint renders winner at bottom
    const revLabels = [...d.labels].reverse();
    const revValues = [...d.values].reverse();

    s.addChart(pres.charts.BAR, [{
      name: d.title,
      labels: revLabels,
      values: revValues,
    }], {
      x: x, y: y + 0.48, w: cellW, h: cellH - 0.5,
      barDir: "bar",
      chartColors: [C.PEACH], // Will be overridden by chartColorsOpacity? No -- one series only, so just peach
      // Since we need different colors per bar, we need to use multi-series OR barColors
      // pptxgenjs supports chartColors array matching category count when invertedColors flag isn't used.
      // Actually: for single-series bar, chartColors[0] applies to all bars. We need a different approach:
      // Use showValue + manual tint via barColor - pptxgenjs doesn't support per-bar color directly.
      // Workaround: use N series each with one value where only winner's index has value, rest null.
      // Simpler: just color all bars peach here; visual impact is small at this size.
      chartArea: { fill: { color: C.BG } },
      plotArea:  { fill: { color: C.BG } },
      catAxisLabelColor: C.IVORY,
      valAxisLabelColor: C.LABEL,
      catAxisLabelFontFace: F_SANS, valAxisLabelFontFace: F_SANS,
      catAxisLabelFontSize: 9, valAxisLabelFontSize: 9,
      showValue: true, dataLabelColor: C.IVORY, dataLabelFontSize: 9,
      dataLabelPosition: "outEnd",
      valGridLine: { style: "none" },
      catGridLine: { style: "none" },
      showLegend: false,
      showValAxis: false,
      valAxisMaxVal: 100,
      barGapWidthPct: 40,
      invertedColors: revValues.map((_, j) => (j === (revValues.length - 1 - d.winnerIdx)) ? C.PEACH : "5B5B5B"),
    });
  });

  addSourcesLine(s,
    "Sources: Vellum AI (Claude Opus 4.6 benchmarks, Feb 2026); Anthropic system cards; OpenAI/Google official model cards. Scores reflect published numbers as of Feb–Mar 2026; method varies by lab."
  );
}

// ============================================================
// SLIDE 6 — Revenue Quality (stacked bar + 3 stats)
// ============================================================
function slide6() {
  const s = pres.addSlide();
  stdFrame(
    s,
    "REVENUE QUALITY",
    "Revenue tripled to $30B, now 80%+ enterprise.",
    "Run-rate up from $9B to $30B in Q1 2026; Claude Code at $2.5B.",
    6
  );

  // Chart label
  s.addText("ANNUALIZED REVENUE BY SEGMENT  /  $B  /  EST.", {
    x: 0.55, y: 2.45, w: 8.0, h: 0.32,
    fontSize: 10, fontFace: F_SANS, bold: true, color: C.LABEL,
    charSpacing: 4, valign: "top", margin: 0,
  });

  // Stacked bar data: Enterprise API / Claude Code / Claude.ai / Other
  const cats = ["2023", "2024", "2025", "Mar 2026"];
  s.addChart(pres.charts.BAR, [
    { name: "Enterprise API",   labels: cats, values: [0.3, 2.5, 5.5, 18.0] },
    { name: "Claude Code",      labels: cats, values: [0.0, 0.2, 1.0,  7.5] },
    { name: "Claude.ai (Pro/Team)", labels: cats, values: [0.1, 0.8, 1.5, 2.5] },
    { name: "Other / partners", labels: cats, values: [0.1, 0.5, 1.0, 2.0] },
  ], {
    x: 0.3, y: 2.8, w: 8.2, h: 3.7,
    barDir: "col", barGrouping: "stacked",
    chartColors: [C.PEACH, C.PEACH_DK, "6F6F6F", "4F4F4F"],
    chartArea: { fill: { color: C.BG } },
    plotArea:  { fill: { color: C.BG } },
    catAxisLabelColor: C.LABEL,
    valAxisLabelColor: C.LABEL,
    catAxisLabelFontFace: F_SANS, valAxisLabelFontFace: F_SANS,
    catAxisLabelFontSize: 11, valAxisLabelFontSize: 10,
    valGridLine: { style: "none" },
    catGridLine: { style: "none" },
    valAxisMaxVal: 35, valAxisMinVal: 0, valAxisMajorUnit: 5,
    showLegend: true, legendPos: "b",
    legendColor: C.LABEL, legendFontSize: 10, legendFontFace: F_SANS,
    barGapWidthPct: 80,
  });

  // Right: 3 stats
  const stats = [
    { y: 2.55, num: "$9B → $30B", label: "ARR GROWTH IN ONE QUARTER",
      sub: "End Dec 2025 to end Mar 2026", peach: true, big: 28 },
    { y: 3.85, num: "80%", label: "ENTERPRISE REVENUE",
      sub: "Per Official company statement (Mar 2026)", peach: false, big: 32 },
    { y: 5.15, num: "4×", label: "BUSINESS SUBSCRIBERS",
      sub: "Quadrupled YTD per Anthropic Series G filing", peach: false, big: 32 },
  ];
  stats.forEach(st => {
    s.addText(st.num, {
      x: 8.9, y: st.y, w: 4.0, h: 0.7,
      fontSize: st.big, fontFace: F_SERIF,
      color: st.peach ? C.PEACH : C.IVORY, valign: "top", margin: 0,
    });
    s.addText(st.label, {
      x: 8.9, y: st.y + 0.7, w: 4.0, h: 0.25,
      fontSize: 9, fontFace: F_SANS, bold: true, color: C.LABEL,
      charSpacing: 4, valign: "top", margin: 0,
    });
    s.addText(st.sub, {
      x: 8.9, y: st.y + 0.95, w: 4.0, h: 0.45,
      fontSize: 11, fontFace: F_SANS, color: C.IVORY, valign: "top", margin: 0,
    });
  });

  addSourcesLine(s,
    "Sources: TradingKey; CNBC (Anthropic Series G announcement, Feb 12, 2026); TechCrunch (Apr 15, 2026, citing Bloomberg). Segment mix is modeled — Total run-rate figures are press-reported."
  );
}


// ============================================================
// SLIDE 7 — Public Market Context (two horizontal bar charts)
// ============================================================
function slide7() {
  const s = pres.addSlide();
  stdFrame(
    s,
    "PUBLIC MARKET CONTEXT",
    "Among the largest tech listings and biggest AI IPO ever.",
    "Implied valuation vs. top IPOs, and likely capital raised vs. all-time top five.",
    7
  );

  // Left chart label
  s.addText("LISTING VALUATION  /  $B  /  COMPARABLE IPOs", {
    x: 0.55, y: 2.45, w: 6.0, h: 0.32,
    fontSize: 10, fontFace: F_SANS, bold: true, color: C.LABEL,
    charSpacing: 4, valign: "top", margin: 0,
  });

  // Left chart: listing valuations.
  // PptxGenJS renders horizontal bars with data[last] at TOP, data[0] at BOTTOM.
  // So put Anthropic first to render it at the bottom.
  const leftCats = ["Anthropic (target, est.)", "Saudi Aramco (2019)", "Alibaba (2014)", "Meta (2012)", "Visa (2008)"];
  const leftVals = [800, 1700, 168, 104, 17];
  const leftColors = [C.PEACH, "6F6F6F", "6F6F6F", "6F6F6F", "6F6F6F"];
  s.addChart(pres.charts.BAR, [{
    name: "Listing $B", labels: leftCats, values: leftVals,
  }], {
    x: 0.35, y: 2.85, w: 6.2, h: 3.55,
    barDir: "bar",
    chartColors: [C.PEACH],
    chartArea: { fill: { color: C.BG } },
    plotArea:  { fill: { color: C.BG } },
    catAxisLabelColor: C.IVORY, valAxisLabelColor: C.LABEL,
    catAxisLabelFontFace: F_SANS, valAxisLabelFontFace: F_SANS,
    catAxisLabelFontSize: 10, valAxisLabelFontSize: 9,
    showValue: true, dataLabelColor: C.IVORY, dataLabelFontSize: 10,
    dataLabelPosition: "outEnd",
    valGridLine: { style: "none" }, catGridLine: { style: "none" },
    valAxisMaxVal: 1800, valAxisMajorUnit: 200,
    showLegend: false, barGapWidthPct: 50,
    invertedColors: leftColors,
  });

  // Right chart label
  s.addText("CAPITAL RAISED AT IPO  /  $B  /  ALL-TIME TOP RANKED", {
    x: 6.75, y: 2.45, w: 6.1, h: 0.32,
    fontSize: 10, fontFace: F_SANS, bold: true, color: C.LABEL,
    charSpacing: 4, valign: "top", margin: 0,
  });

  const rightCats = ["Anthropic (target, est.)", "Saudi Aramco (2019)", "ICBC (2006)", "Alibaba (2014)", "SoftBank (2018)"];
  const rightVals = [40, 26, 22, 22, 21];
  const rightColors = [C.PEACH, "6F6F6F", "6F6F6F", "6F6F6F", "6F6F6F"];
  s.addChart(pres.charts.BAR, [{
    name: "Capital $B", labels: rightCats, values: rightVals,
  }], {
    x: 6.55, y: 2.85, w: 6.3, h: 3.55,
    barDir: "bar",
    chartColors: [C.PEACH],
    chartArea: { fill: { color: C.BG } },
    plotArea:  { fill: { color: C.BG } },
    catAxisLabelColor: C.IVORY, valAxisLabelColor: C.LABEL,
    catAxisLabelFontFace: F_SANS, valAxisLabelFontFace: F_SANS,
    catAxisLabelFontSize: 10, valAxisLabelFontSize: 9,
    showValue: true, dataLabelColor: C.IVORY, dataLabelFontSize: 10,
    dataLabelPosition: "outEnd",
    valGridLine: { style: "none" }, catGridLine: { style: "none" },
    valAxisMaxVal: 45, valAxisMajorUnit: 5,
    showLegend: false, barGapWidthPct: 50,
    invertedColors: rightColors,
  });

  addSourcesLine(s,
    "Sources: Bloomberg/PYMNTS (Apr 14, 2026, $800B+ secondary marks); historical IPO data per Tadawul, NYSE, HKEX. Anthropic IPO size is illustrative; assumes c.5% primary issuance at list valuation."
  );
}

// ============================================================
// SLIDE 8 — Track Record (six timeline cards)
// ============================================================
function slide8() {
  const s = pres.addSlide();
  stdFrame(
    s,
    "TRACK RECORD",
    "Three years of model leadership and revenue growth.",
    "Sustained model leadership, enterprise scaling, and sharp valuation repricing.",
    8
  );

  const items = [
    { year: "2023",     num: "$0.5B",  head: "INITIAL CLAUDE LAUNCH", body: "API access, Claude 2 / Instant",       accent: C.IVORY },
    { year: "2024",     num: "$4B",    head: "CLAUDE 3 FAMILY",       body: "Sonnet, Opus, Haiku release",          accent: C.IVORY },
    { year: "2025",     num: "$9B",    head: "ARR YEAR-END",          body: "Series F at $183B post-money",         accent: C.IVORY },
    { year: "FEB 2026", num: "$30B",   head: "SERIES G CLOSED",       body: "$380B post-money, 2nd-l",              accent: C.PEACH },
    { year: "MAR 2026", num: "$30B",   head: "ARR EXIT-RATE",         body: "Tripled in one quarter; Q1'26",        accent: C.PEACH },
    { year: "APR 2026", num: "$800B+", head: "SECONDARY BIDS",        body: "Offers pre-IPO above OpenAI",          accent: C.PEACH },
  ];

  const cardW = 3.85, cardH = 1.75;
  const colX = [0.55, 4.75, 8.95];
  const rowY = [2.65, 4.65];

  items.forEach((it, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = colX[col], y = rowY[row];

    // Card body
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cardW, h: cardH,
      fill: { color: C.CARD }, line: { color: C.LINE_DIM, width: 0.5 },
    });
    // Left accent stripe
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.08, h: cardH,
      fill: { color: it.accent }, line: { color: it.accent, width: 0 },
    });

    // Year label
    s.addText(it.year, {
      x: x + 0.25, y: y + 0.15, w: cardW - 0.5, h: 0.28,
      fontSize: 10, fontFace: F_SANS, bold: true,
      color: it.accent === C.PEACH ? C.PEACH : C.IVORY,
      charSpacing: 5, valign: "top", margin: 0,
    });
    // Big number
    s.addText(it.num, {
      x: x + 0.25, y: y + 0.42, w: cardW - 0.5, h: 0.62,
      fontSize: 32, fontFace: F_SERIF, color: C.IVORY, valign: "top", margin: 0,
    });
    // Head label
    s.addText(it.head, {
      x: x + 0.25, y: y + 1.05, w: cardW - 0.5, h: 0.28,
      fontSize: 11, fontFace: F_SANS, bold: true, color: C.IVORY,
      charSpacing: 4, valign: "top", margin: 0,
    });
    // Body
    s.addText(it.body, {
      x: x + 0.25, y: y + 1.33, w: cardW - 0.5, h: 0.35,
      fontSize: 11, fontFace: F_SANS, color: C.LABEL, valign: "top", margin: 0,
    });
  });

  // Arrows between cards (between col1-2 and col2-3, on both rows)
  const arrows = [
    { x: 4.4,  y: rowY[0] + cardH/2 - 0.2, color: C.IVORY },
    { x: 8.6,  y: rowY[0] + cardH/2 - 0.2, color: C.IVORY },
    { x: 4.4,  y: rowY[1] + cardH/2 - 0.2, color: C.PEACH },
    { x: 8.6,  y: rowY[1] + cardH/2 - 0.2, color: C.PEACH },
  ];
  arrows.forEach(a => {
    s.addText("→", {
      x: a.x, y: a.y, w: 0.35, h: 0.4,
      fontSize: 22, fontFace: F_SANS, color: a.color,
      align: "center", valign: "middle", margin: 0,
    });
  });

  addSourcesLine(s,
    "Sources: Anthropic press releases; CNBC; Crunchbase; Bloomberg. 2023 and 2024 ARR figures are press-reported estimates; 2025–2026 figures are from Anthropic Series G announcement press reports."
  );
}

// ============================================================
// SLIDE 9 — Market Opportunity ($1.5T TAM + 4 bars)
// ============================================================
function slide9() {
  const s = pres.addSlide();
  stdFrame(
    s,
    "MARKET OPPORTUNITY",
    "$1.5T+ TAM by 2030; the math works without AGI.",
    "Coding, enterprise agents, infrastructure, and consumer AI; billions at single-digit share.",
    9
  );

  // ---- Left: massive $1,500B + paragraph ----
  s.addText("$1,500B", {
    x: 0.55, y: 2.55, w: 6.3, h: 1.3,
    fontSize: 78, fontFace: F_SERIF, color: C.PEACH, valign: "top", margin: 0,
  });

  // Small caps "2030E TAM" right-aligned underneath the big number
  s.addText("2030E TAM", {
    x: 4.2, y: 3.60, w: 2.5, h: 0.3,
    fontSize: 11, fontFace: F_SANS, bold: true, color: C.PEACH,
    charSpacing: 5, align: "right", valign: "middle", margin: 0,
  });

  // Divider
  s.addShape(pres.shapes.LINE, {
    x: 0.55, y: 4.05, w: 6.3, h: 0,
    line: { color: C.LINE_DIM, width: 0.5 },
  });

  s.addText("COMBINED 2030E TAM  /  AI-NATIVE SOFTWARE & TOOLS", {
    x: 0.55, y: 4.15, w: 6.3, h: 0.5,
    fontSize: 11, fontFace: F_SANS, bold: true, color: C.IVORY,
    charSpacing: 2, valign: "top", margin: 0,
  });

  s.addText(
    "At a 4-5% blended share of the enterprise AI profit pool, Anthropic can support a materially larger earnings base than current underwriting implies, with operating leverage accruing to a concentrated cohort of frontier providers.",
    { x: 0.55, y: 4.75, w: 6.3, h: 1.8,
      fontSize: 12, fontFace: F_SERIF, color: C.LABEL, valign: "top", margin: 0,
      paraSpaceAfter: 4 }
  );

  // ---- Right: 4 segment bars ----
  s.addText("BY SEGMENT    /    2030E REVENUE POOL    /    $B", {
    x: 7.2, y: 2.45, w: 5.8, h: 0.32,
    fontSize: 10, fontFace: F_SANS, bold: true, color: C.LABEL,
    charSpacing: 2, valign: "top", margin: 0,
  });

  const segs = [
    { name: "Enterprise AI workflows", total: 600, share: "~3% = $18B",  barPct: 1.00 },
    { name: "Coding & developer tools", total: 280, share: "~10% = $28B", barPct: 0.47 },
    { name: "AI infrastructure / API",  total: 380, share: "~5% = $19B",  barPct: 0.63 },
    { name: "Consumer AI assistants",   total: 240, share: "~3% = $7B",   barPct: 0.40 },
  ];

  const segY0 = 2.85, segH = 0.95, barY_rel = 0.32, barH = 0.22;
  const maxBarW = 4.6;

  segs.forEach((sg, i) => {
    const y = segY0 + i * segH;

    s.addText(sg.name, {
      x: 7.2, y, w: 5.6, h: 0.32,
      fontSize: 15, fontFace: F_SERIF, color: C.IVORY, valign: "top", margin: 0,
    });

    // Background bar (dim)
    s.addShape(pres.shapes.RECTANGLE, {
      x: 7.2, y: y + barY_rel, w: maxBarW, h: barH,
      fill: { color: C.LINE_DIM }, line: { color: C.LINE_DIM, width: 0 },
    });
    // Value bar (peach, proportional)
    s.addShape(pres.shapes.RECTANGLE, {
      x: 7.2, y: y + barY_rel, w: maxBarW * sg.barPct, h: barH,
      fill: { color: C.PEACH }, line: { color: C.PEACH, width: 0 },
    });
    // Value label right of bar
    s.addText(`$${sg.total}B`, {
      x: 11.9, y: y + barY_rel - 0.05, w: 0.95, h: 0.32,
      fontSize: 12, fontFace: F_SANS, color: C.IVORY, valign: "top", margin: 0,
    });
    // Share line (italic)
    s.addText(sg.share, {
      x: 7.2, y: y + barY_rel + barH + 0.04, w: 4.6, h: 0.28,
      fontSize: 11, fontFace: F_SANS, italic: true, color: C.LABEL,
      valign: "top", margin: 0,
    });
  });

  addSourcesLine(s,
    "Sources: TAM figures are blended estimates from IDC, Gartner, Bain, and Bond AI reports (2024-2026 vintage). Implied share calculations are illustrative. 'Enterprise API leadership'  from LLM API spend."
  );
}


// ============================================================
// SLIDE 10 — Valuation & Comps (scatter/bubble) + reading panel
// ============================================================
function slide10() {
  const s = pres.addSlide();
  stdFrame(
    s,
    "VALUATION & COMPS",
    "$800B at ~27x revenue, comparable growth.",
    "X-axis: LTM revenue growth. Y-axis: EV/Revenue. Bubble size: market cap.",
    10
  );

  // Manual bubble chart using ellipses positioned in a chart area.
  // Chart area: x=0.4..8.6, y=2.5..6.4
  const chartX = 0.9, chartY = 2.55, chartW = 7.7, chartH = 3.9;

  // Y axis ticks (0, 9.375, 18.75, 37.5, 56.25, 75) and X axis (0% -- 600%)
  // We'll do: yMax = 75 (EV/Rev), xMax = 600% (growth)

  const xToInch = (x) => chartX + (x / 600) * chartW;
  const yToInch = (y) => chartY + chartH - (y / 75) * chartH;

  // Y axis labels (left)
  const yTicks = [75, 56.25, 37.5, 18.75, 9.375, 0];
  yTicks.forEach(t => {
    const ypos = yToInch(t);
    s.addText(`${t}x`, {
      x: chartX - 0.75, y: ypos - 0.13, w: 0.7, h: 0.25,
      fontSize: 10, fontFace: F_SANS, color: C.LABEL,
      align: "right", valign: "middle", margin: 0,
    });
    // gridline
    s.addShape(pres.shapes.LINE, {
      x: chartX, y: ypos, w: chartW, h: 0,
      line: { color: C.LINE_DIM, width: 0.4 },
    });
  });

  // X axis labels (bottom)
  const xTicks = [0, 100, 200, 300, 400, 500, 600];
  xTicks.forEach(t => {
    const xpos = xToInch(t);
    s.addText(`${t}%`, {
      x: xpos - 0.3, y: chartY + chartH + 0.05, w: 0.6, h: 0.25,
      fontSize: 10, fontFace: F_SANS, color: C.LABEL,
      align: "center", valign: "top", margin: 0,
    });
  });

  // Bubbles: [growth%, ev/rev, radius inches, label, sublabel, color]
  // Growth figures approximate; from deck
  const bubbles = [
    { g: 80,  m: 66,   r: 0.38, lab: "Palantir",            sub: "66x  •  $347B", color: "5F5F5F" },
    { g: 90,  m: 22,   r: 0.80, lab: "Nvidia",              sub: "22x  •  $4.8T", color: "5F5F5F" },
    { g: 30,  m: 12,   r: 0.72, lab: "Microsoft",           sub: "12x  •  $3.7T", color: "5F5F5F" },
    { g: 150, m: 9.5,  r: 0.25, lab: "CoreWeave",           sub: "9.5x  •  $41B", color: "5F5F5F" },
    { g: 280, m: 34,   r: 0.45, lab: "OpenAI",              sub: "34x  •  $852B", color: "5F5F5F" },
    { g: 540, m: 27,   r: 0.45, lab: "Anthropic (target)",  sub: "27x  •  $800B", color: C.PEACH },
  ];

  bubbles.forEach(b => {
    const cx = xToInch(b.g), cy = yToInch(b.m);
    s.addShape(pres.shapes.OVAL, {
      x: cx - b.r, y: cy - b.r, w: b.r * 2, h: b.r * 2,
      fill: { color: b.color, transparency: 25 },
      line: { color: b.color, width: 1 },
    });
    const isPeach = b.color === C.PEACH;
    if (isPeach) {
      // Place Anthropic label to the LEFT of bubble (to avoid reading panel on right)
      s.addText(b.lab, {
        x: cx - b.r - 2.35, y: cy - 0.22, w: 2.3, h: 0.28,
        fontSize: 12, fontFace: F_SERIF,
        color: C.PEACH, align: "right", valign: "top", margin: 0,
      });
      s.addText(b.sub, {
        x: cx - b.r - 2.35, y: cy + 0.02, w: 2.3, h: 0.28,
        fontSize: 10, fontFace: F_SANS,
        color: C.LABEL, align: "right", valign: "top", margin: 0,
      });
    } else {
      // Other bubbles: label to the right
      s.addText(b.lab, {
        x: cx + b.r + 0.05, y: cy - 0.22, w: 2.3, h: 0.28,
        fontSize: 12, fontFace: F_SERIF,
        color: C.IVORY, valign: "top", margin: 0,
      });
      s.addText(b.sub, {
        x: cx + b.r + 0.05, y: cy + 0.02, w: 2.3, h: 0.28,
        fontSize: 10, fontFace: F_SANS,
        color: C.LABEL, valign: "top", margin: 0,
      });
    }
  });

  // ---- Right panel: reading the chart ----
  const rx = 9.1;
  s.addText("READING THE CHART", {
    x: rx, y: 2.55, w: 3.7, h: 0.3,
    fontSize: 11, fontFace: F_SANS, bold: true, color: C.PEACH,
    charSpacing: 5, valign: "top", margin: 0,
  });

  const readings = [
    { head: "Growth justifies the multiple.",
      body: "Anthropic's 540% LTM growth is ~5× the AI peer median, and at 27x revenue sits below Palantir (66x)." },
    { head: "Asymmetry vs OpenAI.",
      body: "OpenAI prices at ~34x on higher absolute valuation. Anthropic offers similar exposure at a structural discount." },
    { head: "Strip Claude.ai to enterprise.",
      body: "Enterprise-only multiple drops to ~22x, matching Nvidia." },
  ];
  let ry = 2.95;
  readings.forEach(r => {
    s.addText(r.head, {
      x: rx, y: ry, w: 3.8, h: 0.35,
      fontSize: 14, fontFace: F_SERIF, color: C.IVORY, valign: "top", margin: 0,
    });
    s.addText(r.body, {
      x: rx, y: ry + 0.35, w: 3.8, h: 0.9,
      fontSize: 10.5, fontFace: F_SANS, color: C.LABEL, valign: "top", margin: 0,
    });
    ry += 1.25;
  });

  addSourcesLine(s,
    "Sources: NVDA, PLTR, MSFT, CRWV market caps and revenue per April 2026 SEC filings and multiples.vc. OpenAI valuation per October 2025 round and February 2026 secondary"
  );
}

// ============================================================
// SLIDE 11 — Returns & Sensitivity (4 scenario columns)
// ============================================================
function slide11() {
  const s = pres.addSlide();
  stdFrame(
    s,
    "RETURNS & SENSITIVITY",
    "Base case: ~2.0x MOIC and ~26% IRR over 3 years.",
    "Entry at $800B, 3-year hold, net of 2/20 fees. Modeled, not a forecast.",
    11
  );

  const cols = [
    { name: "BEAR", exit: "$600B",  moic: "0.71x",  irr: "(11%)",  delta: "−29%",  arr: "$45B exit ARR",  color: C.RED },
    { name: "BASE", exit: "$1.6T",  moic: "1.95x",  irr: "+25%",   delta: "+95%",  arr: "$80B exit ARR",  color: C.IVORY },
    { name: "BULL", exit: "$2.5T",  moic: "3.05x",  irr: "+45%",   delta: "+205%", arr: "$140B exit ARR", color: C.PEACH },
    { name: "MOON", exit: "$4.0T",  moic: "4.85x",  irr: "+69%",   delta: "+385%", arr: "$220B exit ARR", color: C.GREEN },
  ];

  const colW = 2.95, colX0 = 0.55, gap = 0.15;

  cols.forEach((c, i) => {
    const x = colX0 + i * (colW + gap);

    // Column header: colored scenario name
    s.addText(c.name, {
      x, y: 2.6, w: colW, h: 0.3,
      fontSize: 13, fontFace: F_SANS, bold: true, color: c.color,
      align: "center", charSpacing: 6, valign: "top", margin: 0,
    });
    // Divider under header
    s.addShape(pres.shapes.LINE, {
      x: x + 0.15, y: 3.00, w: colW - 0.3, h: 0,
      line: { color: C.LINE_DIM, width: 0.5 },
    });

    // EXIT VALUATION label
    s.addText("EXIT VALUATION (YR 3)", {
      x, y: 3.15, w: colW, h: 0.3,
      fontSize: 10, fontFace: F_SANS, color: C.LABEL,
      align: "center", charSpacing: 4, valign: "top", margin: 0,
    });
    // Exit value (big)
    s.addText(c.exit, {
      x, y: 3.44, w: colW, h: 0.68,
      fontSize: 40, fontFace: F_SERIF, color: c.color,
      align: "center", valign: "top", margin: 0,
    });

    // MOIC label + value
    s.addText("MOIC", {
      x, y: 4.22, w: colW, h: 0.28,
      fontSize: 10, fontFace: F_SANS, color: C.LABEL,
      align: "center", charSpacing: 4, valign: "top", margin: 0,
    });
    s.addText(c.moic, {
      x, y: 4.48, w: colW, h: 0.62,
      fontSize: 34, fontFace: F_SERIF, color: c.color,
      align: "center", valign: "top", margin: 0,
    });

    // IRR label + value
    s.addText("IRR", {
      x, y: 5.15, w: colW, h: 0.28,
      fontSize: 10, fontFace: F_SANS, color: C.LABEL,
      align: "center", charSpacing: 4, valign: "top", margin: 0,
    });
    s.addText(c.irr, {
      x, y: 5.42, w: colW, h: 0.62,
      fontSize: 34, fontFace: F_SERIF, color: c.color,
      align: "center", valign: "top", margin: 0,
    });

    // Delta + ARR at the bottom
    s.addText(c.delta, {
      x, y: 6.12, w: colW, h: 0.3,
      fontSize: 14, fontFace: F_SANS, bold: true, color: c.color,
      align: "center", valign: "top", margin: 0,
    });
    s.addText(c.arr, {
      x, y: 6.4, w: colW, h: 0.28,
      fontSize: 11, fontFace: F_SANS, italic: true, color: C.LABEL,
      align: "center", valign: "top", margin: 0,
    });
  });

  addSourcesLine(s,
    "3-yr hold  //  180-day lock-up  //  net of 2/20  //  base assumes Anthropic continues current enterprise trajectory and a re-rating to ~20x on exit ARR. All scenarios modeled. See assumptions in appendix A1."
  );
}

// ============================================================
// SLIDE 12 — Risks & Mitigants (table)
// ============================================================
function slide12() {
  const s = pres.addSlide();
  stdFrame(
    s,
    "RISKS & MITIGANTS",
    "Five material risks, all mitigated and monitored.",
    "Risks are identifiable, monitorable, and mitigated at the proposed entry.",
    12
  );

  // Three column headers
  const headers = [
    { x: 1.6, w: 3.8, text: "RISK",          color: C.RED   },
    { x: 5.5, w: 3.8, text: "MITIGANT",      color: C.GREEN },
    { x: 9.3, w: 3.55,text: "MONITORING KPI", color: C.IVORY },
  ];
  headers.forEach(h => {
    s.addText(h.text, {
      x: h.x, y: 2.50, w: h.w, h: 0.35,
      fontSize: 13, fontFace: F_SANS, bold: true, color: h.color,
      charSpacing: 6, valign: "top", margin: 0,
    });
  });
  // Header underline
  s.addShape(pres.shapes.LINE, {
    x: 0.55, y: 2.95, w: 12.25, h: 0,
    line: { color: C.LINE_DIM, width: 0.5 },
  });

  const rows = [
    { sev: "HIGH", sevColor: C.RED,   risk: "Multiple compression at IPO",
      mit: "Position-size to bear case; structure SPV with hold flexibility past lock-up duration timeline.",
      kpi: "Sector EV/Rev vs 6mo trailing average" },
    { sev: "HIGH", sevColor: C.RED,   risk: "Frontier-model commoditization",
      mit: "Anthropic's enterprise distribution and safety moat are not replicable by raw model parity.",
      kpi: "Claude Code ARR growth vs open-source agent adoption" },
    { sev: "MED",  sevColor: C.PEACH, risk: "Compute & power concentration",
      mit: "Multi-cloud strategy (AWS, Microsoft, GCP) and own-DC build provide redundancy.",
      kpi: "GPU delivery vs schedule; power-PPA execution" },
    { sev: "MED",  sevColor: C.PEACH, risk: "Regulatory tightening",
      mit: "Anthropic's voluntary safety-first posture is a strategic asset in regulated procurement.",
      kpi: "AISI policy positions; enterprise procurement process" },
    { sev: "MED",  sevColor: C.PEACH, risk: "Lock-up & secondary volatility",
      mit: "Returns are specifically measured based on a comprehensive three-year holding period.",
      kpi: "Implied vol from listed AI peers; secondary tape post-lock" },
  ];

  let ry = 3.15;
  const rowH = 0.72;
  rows.forEach((r, i) => {
    // Severity chip
    s.addText(r.sev, {
      x: 0.55, y: ry, w: 0.95, h: 0.35,
      fontSize: 14, fontFace: F_SANS, bold: true, color: r.sevColor,
      charSpacing: 4, valign: "top", margin: 0,
    });
    // Risk name
    s.addText(r.risk, {
      x: 1.6, y: ry, w: 3.8, h: 0.65,
      fontSize: 13, fontFace: F_SANS, bold: true, color: C.IVORY,
      valign: "top", margin: 0,
    });
    // Mitigant
    s.addText(r.mit, {
      x: 5.5, y: ry, w: 3.8, h: 0.65,
      fontSize: 11, fontFace: F_SANS, color: C.IVORY, valign: "top", margin: 0,
    });
    // KPI (italic)
    s.addText(r.kpi, {
      x: 9.3, y: ry, w: 3.55, h: 0.65,
      fontSize: 11, fontFace: F_SANS, italic: true, color: C.LABEL,
      valign: "top", margin: 0,
    });
    // Row separator
    if (i < rows.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: 0.55, y: ry + rowH, w: 12.25, h: 0,
        line: { color: C.LINE_DIM, width: 0.3 },
      });
    }
    ry += rowH;
  });

  addSourcesLine(s,
    "Sources: Bloomberg, CNBC, multiples.vc, MorphLLM (DeepSeek/MiniMax/Qwen pricing data). Severity ratings are GP assessment as of April 2026."
  );
}

// ============================================================
// SLIDE 13 — Decision Required (two cards with numbered items)
// ============================================================
function slide13() {
  const s = pres.addSlide();
  stdFrame(
    s,
    "DECISION REQUIRED",
    "Soft-circle by May 30. Hard close June 30.",
    "Three things we need from each LP, three things you'll receive from us:",
    13
  );

  const cards = [
    { x: 0.55, title: "FROM EACH LP",
      items: [
        { n: "01", h: "Indicative Commitment",  body: "Soft-circle size and timing by May 30." },
        { n: "02", h: "Accredited Investor Docs", body: "Standard pack; we'll send template by May 1." },
        { n: "03", h: "Funding Wire Deadline",  body: "$250K minimum to escrow account by June 30." },
      ]
    },
    { x: 6.85, title: "FROM PROJECT ANTHOS",
      items: [
        { n: "01", h: "Allocation Confirmation", body: "Within 5 business days of soft close." },
        { n: "02", h: "Quarterly Reporting",     body: "NAV marks, position changes, lock-up status." },
        { n: "03", h: "Transparent Audit",       body: "Annual third-party audit of SPV holdings and fees." },
      ]
    },
  ];

  const cardW = 5.95, cardH = 3.75;

  cards.forEach(c => {
    // Card bg
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: 2.55, w: cardW, h: cardH,
      fill: { color: C.CARD }, line: { color: C.LINE_DIM, width: 0.5 },
    });
    // Header label
    s.addText(c.title, {
      x: c.x + 0.35, y: 2.75, w: cardW - 0.5, h: 0.32,
      fontSize: 11, fontFace: F_SANS, bold: true, color: C.PEACH,
      charSpacing: 5, valign: "top", margin: 0,
    });

    let y = 3.25;
    c.items.forEach(it => {
      // Big peach number
      s.addText(it.n, {
        x: c.x + 0.35, y, w: 0.9, h: 0.6,
        fontSize: 30, fontFace: F_SERIF, color: C.PEACH, valign: "top", margin: 0,
      });
      // Heading
      s.addText(it.h, {
        x: c.x + 1.25, y, w: cardW - 1.4, h: 0.48,
        fontSize: 22, fontFace: F_SERIF, color: C.IVORY, valign: "top", margin: 0,
      });
      // Body
      s.addText(it.body, {
        x: c.x + 1.25, y: y + 0.48, w: cardW - 1.4, h: 0.45,
        fontSize: 12, fontFace: F_SANS, color: C.LABEL, valign: "top", margin: 0,
      });
      y += 1.10;
    });
  });

  addSourcesLine(s,
    "Indicative timeline only. Allocation, timing, and closing remain subject to definitive documentation and applicable closing conditions. Nothing herein constitutes a legally binding commitment."
  );
}

// ============================================================
// SLIDE 14 — Appendix A1 (8 rows of label/value)
// ============================================================
function slide14() {
  const s = pres.addSlide();
  addBg(s);
  // Custom eyebrow with extra " / ASSUMPTIONS & SOURCES"
  s.addText(
    [
      { text: "/", options: { color: C.PEACH, fontFace: F_SANS } },
      { text: "   APPENDIX A1", options: { color: C.PEACH, bold: true, fontFace: F_SANS, charSpacing: 5 } },
      { text: "    /    ASSUMPTIONS & SOURCES", options: { color: C.PEACH, bold: true, fontFace: F_SANS, charSpacing: 5 } },
    ],
    { x: 0.55, y: 0.52, w: 12, h: 0.35, fontSize: 11, margin: 0 }
  );
  addTitle(s, "Base case assumptions, multiples, and cited sources.");
  addFooter(s, 14, 14);

  const rows = [
    { k: "ENTRY VALUATION",     v: "$800B (per Bloomberg secondary marks, April 14, 2026; Anthropic resisting per same report)." },
    { k: "HOLD PERIOD",         v: "3 years from SPV close (~June 2029 exit)." },
    { k: "BASE ARR TRAJECTORY", v: "$30B (Mar '26) → $50B ('26 EOY) → $80B ('29 exit); implied 38% CAGR vs current 6x/qtr." },
    { k: "EXIT MULTIPLE (BASE)", v: "20x exit ARR, between Nvidia (22x) and Microsoft (12x); discount to Palantir (66x)." },
    { k: "BEAR / BULL / MOON",  v: "Multiples flex 12.5x / 18x / 18x; ARR flex $45B / $140B / $220B at exit." },
    { k: "FEES",                v: "2% annual management on committed; 20% carry over 8% pref; modeled net to LP." },
    { k: "LIQUIDITY",           v: "Lock-up 180 days post-listing; secondary marks may be available before that, not modeled." },
    { k: "DILUTION",            v: "Assumed 0% additional primary dilution between SPV close and exit (best-case; revisit if Anthropic raises again)." },
  ];

  const startY = 2.4, rowH = 0.5, keyX = 0.55, valX = 3.55;
  rows.forEach((r, i) => {
    const y = startY + i * rowH;
    s.addText(r.k, {
      x: keyX, y, w: 2.9, h: rowH,
      fontSize: 12, fontFace: F_SANS, bold: true, color: C.PEACH,
      charSpacing: 2, valign: "middle", margin: 0,
    });
    s.addText(r.v, {
      x: valX, y, w: 9.3, h: rowH,
      fontSize: 12, fontFace: F_SANS, color: C.IVORY, valign: "middle", margin: 0,
    });
  });

  addSourcesLine(s,
    "Sources cited throughout deck: Anthropic press releases (anthropic.com/news); Bloomberg (April 14, 2026); CNBC (Feb 12, 2026 Series G coverage); TechCrunch (April 15, 2026); TradingKey; PYMNTS; Sacra; Vellum AI (Claude Opus 4.6 benchmarks); MorphLLM; multiples.vc (public comp valuation data); SEC filings for Nvidia, Palantir, CoreWeave, Microsoft."
  );
}

// ============================================================
// Main
// ============================================================
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
slide13();
slide14();

pres.writeFile({ fileName: "Project-Anthos.pptx" })
  .then(f => console.log("Wrote:", f));
