const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

// ── Resolve media directory (beside this script) ──
const MEDIA = path.join(__dirname, "media");
function img(name) { return path.join(MEDIA, name); }

// ── Color palette ──
const C = {
  navy:      "1E2A3A",
  navyDark:  "172231",
  gold:      "C5A55A",
  white:     "FFFFFF",
  offWhite:  "F7F8FA",
  lightGray: "E8EAED",
  midGray:   "9CA3AF",
  darkGray:  "4B5563",
  text:      "1F2937",
  textLight: "6B7280",
  cream:     "FDF6E3",
  red:       "C0392B",
  amber:     "D4A017",
  green:     "27AE60",
  blueGray:  "2D3E50",
};

// ── Presentation setup ──
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10" x 5.625"
pres.author = "Goldman Sachs";
pres.title  = "Project Helix - Tempus AI Acquisition";

// ── Helper: standard content slide header ──
function addContentHeader(slide, title, slideNum, totalSlides) {
  // White background is default
  // Title
  slide.addText(title, {
    x: 0.6, y: 0.3, w: 8.4, h: 0.7,
    fontSize: 18, fontFace: "Arial", bold: true, color: C.text,
    margin: 0,
  });
  // Tempus logo top-right
  slide.addImage({ path: img("image1.png"), x: 9.15, y: 0.3, w: 0.45, h: 0.45 });
  // Source/Note area and page number
  if (slideNum) {
    slide.addText(`${slideNum} / ${totalSlides}`, {
      x: 9.0, y: 5.15, w: 0.7, h: 0.3,
      fontSize: 9, color: C.midGray, align: "right", fontFace: "Arial",
    });
  }
}

function addSourceNote(slide, source, note) {
  let y = 4.85;
  if (source) {
    slide.addText(`Source: ${source}`, {
      x: 0.6, y: y, w: 8.0, h: 0.2,
      fontSize: 7, italic: true, color: C.midGray, fontFace: "Arial", margin: 0,
    });
    y += 0.18;
  }
  if (note) {
    slide.addText(`Note: ${note}`, {
      x: 0.6, y: y, w: 8.0, h: 0.2,
      fontSize: 7, italic: true, color: C.midGray, fontFace: "Arial", margin: 0,
    });
  }
}

// ═══════════════════════════════════════════════════════
// SLIDE 1 – Title Slide (Dark Navy Background)
// ═══════════════════════════════════════════════════════
(function slide1() {
  const s = pres.addSlide();
  s.background = { color: C.navyDark };

  // Gold top bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.04, fill: { color: C.gold } });

  // Logo + PROJECT HELIX
  s.addImage({ path: img("image1.png"), x: 0.7, y: 0.4, w: 0.5, h: 0.5 });
  s.addText("P R O J E C T   H E L I X", {
    x: 1.35, y: 0.45, w: 3.5, h: 0.4,
    fontSize: 14, fontFace: "Arial", color: C.gold, charSpacing: 2, margin: 0,
  });

  // Company name
  s.addText("Tempus AI, Inc. (NASDAQ: TEM)", {
    x: 0.7, y: 1.1, w: 8.5, h: 0.65,
    fontSize: 32, fontFace: "Arial", bold: true, color: C.white, margin: 0,
  });

  // Subtitle italic gold
  s.addText("Potential Acquisition at $14-16B Enterprise Value", {
    x: 0.7, y: 1.8, w: 8, h: 0.45,
    fontSize: 18, fontFace: "Arial", italic: true, color: C.gold, margin: 0,
  });

  // Description
  s.addText("AI-Enabled Precision Medicine & Diagnostics Platform", {
    x: 0.7, y: 2.4, w: 8, h: 0.35,
    fontSize: 13, fontFace: "Arial", color: C.midGray, margin: 0,
  });

  // Location/stats line
  s.addText("Chicago, IL  |  FY25 Revenue $1.27B (+83% YoY)  |  Market Cap ~$8.9B", {
    x: 0.7, y: 2.8, w: 8, h: 0.3,
    fontSize: 11, fontFace: "Arial", color: C.midGray, margin: 0,
  });

  // Horizontal rule
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 3.25, w: 8.6, h: 0,
    line: { color: C.gold, width: 1 },
  });

  // KPI Cards
  const kpis = [
    { value: "$1.27B",  label: "FY25 Revenue" },
    { value: "+83%",    label: "YoY Growth" },
    { value: "3,000+",  label: "US Providers" },
    { value: "$330M",   label: "Est. Synergies" },
    { value: "$764M",   label: "Cash Position" },
  ];
  const cardW = 1.62;
  const gap = 0.12;
  const startX = 0.7;
  const cardY = 3.55;
  const cardH = 1.1;
  kpis.forEach((kpi, i) => {
    const cx = startX + i * (cardW + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardY, w: cardW, h: cardH,
      fill: { color: C.blueGray },
    });
    s.addText(kpi.value, {
      x: cx, y: cardY + 0.15, w: cardW, h: 0.5,
      fontSize: 22, fontFace: "Arial", bold: true, color: C.gold, align: "center", margin: 0,
    });
    s.addText(kpi.label, {
      x: cx, y: cardY + 0.65, w: cardW, h: 0.3,
      fontSize: 9, fontFace: "Arial", color: C.midGray, align: "center", margin: 0,
    });
  });

  // Footer
  s.addText("GOLDMAN SACHS  |  HEALTHCARE M&A  |  CONFIDENTIAL  |  April 2026", {
    x: 0, y: 5.1, w: 10, h: 0.35,
    fontSize: 8, fontFace: "Arial", color: C.midGray, align: "center", charSpacing: 1,
  });
})();

// ═══════════════════════════════════════════════════════
// SLIDE 2 – Executive Summary
// ═══════════════════════════════════════════════════════
(function slide2() {
  const s = pres.addSlide();
  addContentHeader(s, "We recommend pursuing Tempus AI at $14-16B EV via 60/40 cash/stock, creating $330M in synergies", 2, 14);

  // Table data
  const hdrOpts = { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, fontFace: "Arial" };
  const cellOpts = { fontSize: 9, fontFace: "Arial", color: C.text };
  const rows = [
    [
      { text: "Dimension", options: hdrOpts },
      { text: "Key Finding", options: hdrOpts },
      { text: "Implication", options: hdrOpts },
    ],
    [
      { text: "Market", options: { ...cellOpts, bold: true } },
      { text: "AI precision medicine: $3.9B SOM, 31% CAGR to 2030", options: cellOpts },
      { text: "Structural tailwind supports premium valuation", options: cellOpts },
    ],
    [
      { text: "Company", options: { ...cellOpts, bold: true } },
      { text: "$1.27B FY25 revenue (+83% YoY); largest clinical+molecular dataset", options: cellOpts },
      { text: "Only scaled platform combining Dx, data, and AI", options: cellOpts },
    ],
    [
      { text: "Valuation", options: { ...cellOpts, bold: true } },
      { text: "Implied EV $12-18B across DCF, comps, precedents (5-19x)", options: cellOpts },
      { text: "Current ~7x EV/Rev = 35-100% upside in control txn", options: cellOpts },
    ],
    [
      { text: "Synergies", options: { ...cellOpts, bold: true } },
      { text: "$330M cumulative: $180M rev, $90M cost, $60M data", options: cellOpts },
      { text: "Synergies justify 25-35% of implied premium", options: cellOpts },
    ],
    [
      { text: "Structure", options: { ...cellOpts, bold: true } },
      { text: "60% cash / 40% stock at $14-16B (60-80% premium)", options: cellOpts },
      { text: "Stock aligns founder-CEO; leverage at 2.5-3.0x", options: cellOpts },
    ],
    [
      { text: "Risks", options: { ...cellOpts, bold: true } },
      { text: "Data privacy (HIGH), FDA (MED), concentration (MED)", options: cellOpts },
      { text: "All addressable via SPA protections and DD", options: cellOpts },
    ],
    [
      { text: "Next Step", options: { ...cellOpts, bold: true } },
      { text: "Approach CEO Lefkofsky within 2 weeks; 16-week close", options: cellOpts },
      { text: "Window before competing interest crystallizes", options: cellOpts },
    ],
  ];

  s.addTable(rows, {
    x: 0.6, y: 1.15, w: 8.8,
    colW: [1.4, 3.9, 3.5],
    border: { pt: 0.5, color: C.lightGray },
    rowH: [0.35, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38],
  });

  // Recommendation box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 4.2, w: 8.8, h: 0.45,
    fill: { color: C.cream },
  });
  s.addText([
    { text: "RECOMMENDATION: ", options: { bold: true, fontSize: 9, fontFace: "Arial", color: C.text } },
    { text: "Initiate Phase 1 engagement immediately - Tempus\u2019s accelerating growth and approaching profitability create urgency", options: { fontSize: 9, fontFace: "Arial", color: C.text } },
  ], { x: 0.75, y: 4.22, w: 8.5, h: 0.42, margin: 0 });

  addSourceNote(s,
    "Company filings, Capital IQ, Goldman Sachs estimates",
    "All financial data as of FY25 (ended Dec 2025) unless otherwise noted. Market data as of 11-Apr-2026."
  );
})();

// ═══════════════════════════════════════════════════════
// SLIDE 3 – Market Overview (TAM/SAM/SOM)
// ═══════════════════════════════════════════════════════
(function slide3() {
  const s = pres.addSlide();
  addContentHeader(s, "Precision medicine AI is a $3.9B addressable market growing 31% annually", 3, 14);

  // TAM/SAM/SOM concentric circles (using ovals)
  // Outer: TAM
  s.addShape(pres.shapes.OVAL, {
    x: 0.6, y: 1.2, w: 4.4, h: 3.5,
    fill: { color: "D6DCE4" },
  });
  s.addText([
    { text: "TAM: $246.7B", options: { bold: true, fontSize: 12, fontFace: "Arial", color: C.text, breakLine: true } },
    { text: "Precision Medicine (2030E)", options: { fontSize: 9, fontFace: "Arial", color: C.textLight } },
  ], { x: 1.2, y: 1.5, w: 2.5, h: 0.7, margin: 0 });

  // Middle: SAM
  s.addShape(pres.shapes.OVAL, {
    x: 1.2, y: 1.9, w: 3.5, h: 2.6,
    fill: { color: "CADCFC" },
  });
  s.addText([
    { text: "SAM: $14.5B", options: { bold: true, fontSize: 11, fontFace: "Arial", color: C.text, breakLine: true } },
    { text: "AI in Precision Medicine", options: { fontSize: 9, fontFace: "Arial", color: C.textLight } },
  ], { x: 1.7, y: 2.2, w: 2.3, h: 0.6, margin: 0, align: "center" });

  // Inner: SOM
  s.addShape(pres.shapes.OVAL, {
    x: 1.7, y: 2.8, w: 2.6, h: 1.8,
    fill: { color: C.navy },
  });
  s.addText([
    { text: "SOM: $3.9B", options: { bold: true, fontSize: 11, fontFace: "Arial", color: C.gold, breakLine: true } },
    { text: "AI Dx & Screening", options: { fontSize: 9, fontFace: "Arial", color: C.white, breakLine: true } },
    { text: "CAGR ~31%", options: { fontSize: 9, fontFace: "Arial", color: C.white } },
  ], { x: 1.9, y: 3.1, w: 2.2, h: 0.9, margin: 0, align: "center" });

  // Right side stats cards
  const stats = [
    { icon: "image2.png", value: "~36%", desc: "AI Precision Med CAGR 2025-2030E" },
    { icon: "image3.png", value: "30%+", desc: "Oncology Market Share - largest therapeutic area" },
    { icon: "image4.png", value: "700+", desc: "FDA AI/ML Devices Cleared to date" },
    { icon: "image5.png", value: "$80B", desc: "MedTech M&A Deal Value (2025, +18% YoY)" },
  ];
  const cardStartY = 1.2;
  const cardH2 = 0.72;
  const cardGap = 0.12;
  stats.forEach((st, i) => {
    const cy = cardStartY + i * (cardH2 + cardGap);
    // Card background
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.3, y: cy, w: 4.3, h: cardH2,
      fill: { color: C.offWhite },
    });
    // Left accent line
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.3, y: cy, w: 0.04, h: cardH2,
      fill: { color: C.lightGray },
    });
    // Icon
    s.addImage({ path: img(st.icon), x: 5.55, y: cy + 0.11, w: 0.5, h: 0.5 });
    // Value
    s.addText(st.value, {
      x: 6.2, y: cy + 0.05, w: 3.2, h: 0.35,
      fontSize: 20, fontFace: "Arial", bold: true, color: C.text, margin: 0,
    });
    // Description
    s.addText(st.desc, {
      x: 6.2, y: cy + 0.38, w: 3.2, h: 0.28,
      fontSize: 9, fontFace: "Arial", color: C.textLight, margin: 0,
    });
  });

  addSourceNote(s,
    "MarketsandMarkets (2025), Grand View Research, FDA CDRH database, Bain & Company Global Healthcare Private Equity Report (2025)",
    "TAM/SAM/SOM estimates based on 2030E projections. CAGR calculated on 2025-2030E basis."
  );
})();

// ═══════════════════════════════════════════════════════
// SLIDE 4 – Platform Overview
// ═══════════════════════════════════════════════════════
(function slide4() {
  const s = pres.addSlide();
  addContentHeader(s, "Tempus\u2019s closed-loop platform creates an unreplicable moat across diagnostics, data, and pharma", 4, 14);

  const segments = [
    { icon: "image6.png", title: "Genomics / Diagnostics", desc: "NGS, PCR, hereditary testing (xT, xR, xF); 217K+ tests/quarter; 53 locations across 6 countries" },
    { icon: "image7.png", title: "Data & AI Platform", desc: "World\u2019s largest clinical+molecular library; multimodal data from 3,000+ US providers; 7M+ pathology slides" },
    { icon: "image8.png", title: "Life Sciences (Insights)", desc: "Data licensing to pharma; $940M remaining TCV; 140% NRR; AstraZeneca, Merck, BioNTech partnerships" },
    { icon: "image9.png", title: "Clinical Applications", desc: "Hub, Lens, Next, TIME, Algos - AI clinical decision support deployed at point of care" },
  ];

  const startY = 1.15;
  const rowH = 0.72;
  const rowGap = 0.08;
  segments.forEach((seg, i) => {
    const cy = startY + i * (rowH + rowGap);
    // Card bg
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: cy, w: 8.8, h: rowH,
      fill: { color: C.offWhite },
    });
    // Left accent bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: cy, w: 0.05, h: rowH,
      fill: { color: C.navy },
    });
    // Icon
    s.addImage({ path: img(seg.icon), x: 0.85, y: cy + 0.13, w: 0.55, h: 0.55 });
    // Title
    s.addText(seg.title, {
      x: 1.6, y: cy + 0.1, w: 7.5, h: 0.3,
      fontSize: 13, fontFace: "Arial", bold: true, color: C.text, margin: 0,
    });
    // Description
    s.addText(seg.desc, {
      x: 1.6, y: cy + 0.4, w: 7.5, h: 0.3,
      fontSize: 9.5, fontFace: "Arial", color: C.textLight, margin: 0,
    });
  });

  // Recent M&A callout box
  const maCY = startY + 4 * (rowH + rowGap) + 0.05;
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: maCY, w: 8.8, h: 0.45,
    fill: { color: C.cream },
  });
  s.addText([
    { text: "Recent M&A:  ", options: { bold: true, fontSize: 9, fontFace: "Arial", color: C.text } },
    { text: "Ambry Genetics ($600M, Feb \u201925)  |  Deep 6 AI ($17M, Mar \u201925)  |  Paige ($81M, Aug \u201925) - 3 acquisitions in 12 months", options: { fontSize: 9, fontFace: "Arial", color: C.text } },
  ], { x: 0.75, y: maCY + 0.03, w: 8.5, h: 0.4, margin: 0 });

  addSourceNote(s,
    "Company filings, Tempus AI 10-K (FY25), press releases",
    "Test volumes and provider counts reflect FY25 reported figures. TCV = total contract value; NRR = net revenue retention."
  );
})();

// ═══════════════════════════════════════════════════════
// SLIDE 5 – Financial Performance (chart + metrics)
// ═══════════════════════════════════════════════════════
(function slide5() {
  const s = pres.addSlide();
  addContentHeader(s, "Revenue grew 83% to $1.27B in FY25 with improving unit economics", 5, 14);

  // Stacked bar chart - Revenue by Segment ($M)
  s.addChart(pres.charts.BAR, [
    { name: "Genomics & Data", labels: ["FY23", "FY24", "FY25"], values: [250, 440, 750] },
    { name: "Insights",        labels: ["FY23", "FY24", "FY25"], values: [85, 250, 520] },
  ], {
    x: 0.4, y: 1.2, w: 5.0, h: 3.3,
    barDir: "col",
    barGrouping: "stacked",
    chartColors: [C.navy, C.gold],
    showTitle: true,
    title: "Revenue by Segment ($M)",
    titleFontSize: 10,
    titleColor: C.text,
    catAxisLabelColor: C.darkGray,
    catAxisLabelFontSize: 9,
    valAxisLabelColor: C.darkGray,
    valAxisLabelFontSize: 8,
    valGridLine: { color: C.lightGray, size: 0.5 },
    catGridLine: { style: "none" },
    showLegend: true,
    legendPos: "b",
    legendFontSize: 8,
    legendColor: C.darkGray,
  });

  // Right side metric cards
  const metrics = [
    { label: "Gross Margin", value: "62.7%", note: "+15pp YoY", noteColor: C.gold },
    { label: "Adj. EBITDA", value: "~Breakeven", note: "Q3\u201925 first positive", noteColor: C.green },
    { label: "Net Rev. Retention", value: "140%", note: "Data licensing driven", noteColor: C.gold },
    { label: "Remaining TCV", value: "$940M", note: "Multi-year pharma contracts", noteColor: C.gold },
  ];
  const mStartY = 1.2;
  const mH = 0.62;
  const mGap = 0.06;
  metrics.forEach((m, i) => {
    const my = mStartY + i * (mH + mGap);
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.6, y: my, w: 4.0, h: mH,
      fill: { color: C.offWhite },
    });
    s.addText(m.label, {
      x: 5.75, y: my + 0.03, w: 3.7, h: 0.2,
      fontSize: 8, fontFace: "Arial", color: C.textLight, margin: 0,
    });
    s.addText(m.value, {
      x: 5.75, y: my + 0.2, w: 1.8, h: 0.35,
      fontSize: 20, fontFace: "Arial", bold: true, color: C.text, margin: 0,
    });
    s.addText(m.note, {
      x: 7.5, y: my + 0.25, w: 2.0, h: 0.25,
      fontSize: 9, fontFace: "Arial", color: m.noteColor, margin: 0,
    });
  });

  // Path to Profitability callout
  const ptpY = mStartY + 4 * (mH + mGap);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.6, y: ptpY, w: 4.0, h: 0.65,
    fill: { color: C.offWhite },
  });
  // Trend icon
  s.addImage({ path: img("image2.png"), x: 5.75, y: ptpY + 0.08, w: 0.45, h: 0.45 });
  s.addText("Path to Profitability", {
    x: 6.3, y: ptpY + 0.05, w: 3.1, h: 0.25,
    fontSize: 10, fontFace: "Arial", bold: true, color: C.text, margin: 0,
  });
  s.addText("Operating leverage accelerating; FY26E rev $1.63B (+28% YoY)", {
    x: 6.3, y: ptpY + 0.3, w: 3.1, h: 0.28,
    fontSize: 8, fontFace: "Arial", color: C.textLight, margin: 0,
  });

  addSourceNote(s,
    "Company filings, Tempus AI 10-K (FY25), Goldman Sachs estimates",
    "Revenue by segment is approximate based on disclosed mix. Adj. EBITDA excludes SBC. FY26E based on GS equity research estimates."
  );
})();

// ═══════════════════════════════════════════════════════
// SLIDE 6 – Competitive Landscape
// ═══════════════════════════════════════════════════════
(function slide6() {
  const s = pres.addSlide();
  addContentHeader(s, "Tempus is the only platform combining AI, diagnostics, and data at scale", 6, 14);

  // Scatter quadrant background
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 1.15, w: 4.7, h: 3.5,
    fill: { color: C.offWhite },
  });

  // Y-axis label
  s.addText("AI / DATA CAPABILITY", {
    x: 0.05, y: 2.5, w: 0.5, h: 2.0,
    fontSize: 7, fontFace: "Arial", color: C.midGray, rotate: 270, align: "center", charSpacing: 1,
  });
  // X-axis label
  s.addText("DIAGNOSTICS BREADTH", {
    x: 1.5, y: 4.55, w: 3.0, h: 0.25,
    fontSize: 7, fontFace: "Arial", color: C.midGray, align: "center", charSpacing: 1,
  });

  // Company bubbles
  // TEMPUS AI (top right, large)
  s.addShape(pres.shapes.OVAL, {
    x: 3.2, y: 1.3, w: 1.8, h: 1.2,
    fill: { color: C.navy },
  });
  s.addText([
    { text: "TEMPUS AI", options: { bold: true, fontSize: 9, color: C.white, breakLine: true } },
    { text: "Data+Dx+AI Leader", options: { fontSize: 7, color: C.midGray } },
  ], { x: 3.2, y: 1.5, w: 1.8, h: 0.8, align: "center", fontFace: "Arial", margin: 0 });

  // FLATIRON (top left)
  s.addShape(pres.shapes.OVAL, {
    x: 1.2, y: 1.7, w: 1.6, h: 1.1,
    fill: { color: "D6DCE4" },
  });
  s.addText([
    { text: "FLATIRON", options: { bold: true, fontSize: 8, color: C.text, breakLine: true } },
    { text: "Data-rich, no lab", options: { fontSize: 7, color: C.textLight } },
  ], { x: 1.2, y: 1.9, w: 1.6, h: 0.7, align: "center", fontFace: "Arial", margin: 0 });

  // GUARDANT (mid right)
  s.addShape(pres.shapes.OVAL, {
    x: 3.0, y: 2.8, w: 1.6, h: 1.1,
    fill: { color: "B0BEC5" },
  });
  s.addText([
    { text: "GUARDANT", options: { bold: true, fontSize: 8, color: C.text, breakLine: true } },
    { text: "Liquid biopsy focus", options: { fontSize: 7, color: C.textLight } },
  ], { x: 3.0, y: 3.0, w: 1.6, h: 0.7, align: "center", fontFace: "Arial", margin: 0 });

  // VERACYTE (bottom left)
  s.addShape(pres.shapes.OVAL, {
    x: 1.0, y: 3.1, w: 1.5, h: 1.0,
    fill: { color: "D6DCE4" },
  });
  s.addText([
    { text: "VERACYTE", options: { bold: true, fontSize: 8, color: C.text, breakLine: true } },
    { text: "Niche genomic Dx", options: { fontSize: 7, color: C.textLight } },
  ], { x: 1.0, y: 3.3, w: 1.5, h: 0.6, align: "center", fontFace: "Arial", margin: 0 });

  // Comparison table (right side)
  const tHdr = { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 9, fontFace: "Arial", align: "center" };
  const tCell = { fontSize: 9, fontFace: "Arial", color: C.text, align: "center" };
  const tCellL = { fontSize: 9, fontFace: "Arial", color: C.text };
  s.addTable([
    [
      { text: "Company", options: { ...tHdr, align: "left" } },
      { text: "FY25 Rev", options: tHdr },
      { text: "Growth", options: tHdr },
      { text: "Mkt Cap", options: tHdr },
    ],
    [
      { text: "Tempus AI", options: { ...tCellL, bold: true } },
      { text: "$1,270M", options: tCell },
      { text: "+83%", options: tCell },
      { text: "~$8.9B", options: tCell },
    ],
    [
      { text: "Guardant Health", options: tCellL },
      { text: "$982M", options: tCell },
      { text: "+33%", options: tCell },
      { text: "~$13B", options: tCell },
    ],
    [
      { text: "Veracyte", options: tCellL },
      { text: "$446M", options: tCell },
      { text: "+15%", options: tCell },
      { text: "~$2.3B", options: tCell },
    ],
    [
      { text: "Flatiron Health (1)", options: tCellL },
      { text: "Private", options: tCell },
      { text: "N/A", options: tCell },
      { text: "Acq. $1.9B", options: tCell },
    ],
  ], {
    x: 5.5, y: 1.15, w: 4.1,
    colW: [1.3, 0.9, 0.9, 1.0],
    border: { pt: 0.5, color: C.lightGray },
    rowH: [0.32, 0.32, 0.32, 0.32, 0.32],
  });

  // Advantage cards
  const advCards = [
    { title: "Largest Dataset", desc: "7M+ pathology slides; 3,000+ US provider network" },
    { title: "Full Stack Platform", desc: "Only player with lab ops + data + AI + clinical apps" },
    { title: "Pharma Revenue", desc: "$940M remaining TCV; 140% NRR; top-5 pharma clients" },
  ];
  advCards.forEach((card, i) => {
    const cy = 3.05 + i * 0.58;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.5, y: cy, w: 4.1, h: 0.52,
      fill: { color: C.offWhite },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.5, y: cy, w: 0.04, h: 0.52,
      fill: { color: C.gold },
    });
    s.addText(card.title, {
      x: 5.7, y: cy + 0.03, w: 3.7, h: 0.22,
      fontSize: 10, fontFace: "Arial", bold: true, color: C.text, margin: 0,
    });
    s.addText(card.desc, {
      x: 5.7, y: cy + 0.25, w: 3.7, h: 0.22,
      fontSize: 8, fontFace: "Arial", color: C.textLight, margin: 0,
    });
  });

  addSourceNote(s,
    "Capital IQ, company filings, Goldman Sachs estimates. Market data as of 11-Apr-2026",
    "(1) Flatiron Health acquired by Roche in 2018 for $1.9bn. Revenue and growth data based on most recent fiscal year reported."
  );
})();

// ═══════════════════════════════════════════════════════
// SLIDE 7 – Precedent Transactions
// ═══════════════════════════════════════════════════════
(function slide7() {
  const s = pres.addSlide();
  addContentHeader(s, "Precedent transactions at 5-19x EV/Revenue validate strategic value", 7, 14);

  const hdr = { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 9, fontFace: "Arial" };
  const c = { fontSize: 9, fontFace: "Arial", color: C.text };
  const rows = [
    [
      { text: "Date", options: hdr },
      { text: "Acquirer", options: hdr },
      { text: "Target", options: hdr },
      { text: "Deal Value", options: hdr },
      { text: "EV/Rev", options: hdr },
      { text: "Strategic Rationale", options: hdr },
    ],
    [
      { text: "Dec 2025", options: c },
      { text: "Abbott", options: c },
      { text: "Exact Sciences", options: c },
      { text: "$21.0B", options: c },
      { text: "7.0x", options: c },
      { text: "Cancer Dx scale; Cologuard CRC screening", options: c },
    ],
    [
      { text: "Nov 2025", options: c },
      { text: "GE HealthCare", options: c },
      { text: "Intelerad", options: c },
      { text: "$2.3B", options: c },
      { text: "~8x", options: c },
      { text: "Cloud imaging; AI workflow", options: c },
    ],
    [
      { text: "Aug 2025", options: c },
      { text: "Tempus AI", options: c },
      { text: "Paige", options: c },
      { text: "$81M", options: c },
      { text: "N/M", options: c },
      { text: "7M pathology slides; FDA-cleared AI", options: c },
    ],
    [
      { text: "Feb 2025", options: c },
      { text: "Tempus AI", options: c },
      { text: "Ambry Genetics", options: c },
      { text: "$600M", options: c },
      { text: "2.0x", options: c },
      { text: "Hereditary testing; 25%+ growth", options: c },
    ],
    [
      { text: "2024", options: c },
      { text: "Veracyte", options: c },
      { text: "C2i Genomics", options: c },
      { text: "$95M", options: c },
      { text: "N/A", options: c },
      { text: "MRD & liquid biopsy", options: c },
    ],
    [
      { text: "2018", options: c },
      { text: "Roche", options: c },
      { text: "Flatiron Health", options: c },
      { text: "$1.9B", options: c },
      { text: "~19x", options: c },
      { text: "Oncology EHR data platform", options: c },
    ],
  ];
  s.addTable(rows, {
    x: 0.6, y: 1.15, w: 8.8,
    colW: [0.85, 1.2, 1.2, 0.9, 0.75, 3.9],
    border: { pt: 0.5, color: C.lightGray },
    rowH: [0.35, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38],
  });

  // Key Insight callout
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 3.95, w: 8.8, h: 0.65,
    fill: { color: C.cream },
  });
  s.addImage({ path: img("image11.png"), x: 0.75, y: 4.02, w: 0.45, h: 0.45 });
  s.addText([
    { text: "KEY INSIGHT:  ", options: { bold: true, fontSize: 9, fontFace: "Arial", color: C.text } },
    { text: "Median EV/Revenue for AI diagnostics: 5-10x; data platform premium ~19x (Roche/Flatiron). Tempus at ~7x implies 35-100% upside in a control transaction, supporting $12-18B EV range.", options: { fontSize: 9, fontFace: "Arial", color: C.text } },
  ], { x: 1.3, y: 3.98, w: 8.0, h: 0.6, margin: 0 });

  addSourceNote(s,
    "Capital IQ, Dealogic, company filings, press releases",
    "EV/Revenue based on LTM revenue at announcement. N/M = not meaningful; N/A = not available. Excludes earn-out consideration where applicable."
  );
})();

// ═══════════════════════════════════════════════════════
// SLIDE 8 – Valuation Football Field
// ═══════════════════════════════════════════════════════
(function slide8() {
  const s = pres.addSlide();
  addContentHeader(s, "Triangulated valuation of $12-18B implies 35-100% upside, with DCF and precedents converging at $14-16B", 8, 14);

  // Background for chart area
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 1.2, w: 9.0, h: 3.4,
    fill: { color: "FDFBF0" },
  });

  // Implied range shading ($12-18B zone)
  // Scale: $6B at x=0.6, $20B at x=9.6 → each $1B = 0.643"
  const bToX = (b) => 0.6 + (b - 6) * (9.0 / 14);
  s.addShape(pres.shapes.RECTANGLE, {
    x: bToX(12), y: 1.2, w: bToX(18) - bToX(12), h: 3.4,
    fill: { color: "F5F0D8", transparency: 40 },
  });

  // Grid lines and labels
  const gridVals = [6, 8, 10, 12, 14, 16, 18, 20];
  gridVals.forEach(v => {
    const gx = bToX(v);
    s.addShape(pres.shapes.LINE, {
      x: gx, y: 1.2, w: 0, h: 3.4,
      line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(`$${v}B`, {
      x: gx - 0.35, y: 1.0, w: 0.7, h: 0.2,
      fontSize: 7, fontFace: "Arial", color: C.midGray, align: "center", margin: 0,
    });
  });

  // Bar data
  const bars = [
    { label: "Current Trading", low: 8.9, high: 8.9, color: C.midGray },
    { label: "EV/Revenue (FY26E)", low: 9.8, high: 14.6, color: "7B9BC0" },
    { label: "EV/Revenue (FY27E)", low: 10.2, high: 16.2, color: "5B83AB" },
    { label: "Precedent Txns", low: 11.4, high: 17.8, color: C.navy },
    { label: "DCF (WACC 11-13%)", low: 12.0, high: 18.5, color: "0F1B2D" },
  ];
  const barStartY = 1.45;
  const barH = 0.35;
  const barGap = 0.28;
  bars.forEach((b, i) => {
    const by = barStartY + i * (barH + barGap);
    // Label
    s.addText(b.label, {
      x: 0.6, y: by, w: 2.2, h: barH,
      fontSize: 9, fontFace: "Arial", color: C.text, valign: "middle", margin: 0,
    });
    // Bar
    const x1 = bToX(b.low);
    const x2 = bToX(b.high);
    const bw = Math.max(x2 - x1, 0.1);
    s.addShape(pres.shapes.RECTANGLE, {
      x: x1, y: by + 0.05, w: bw, h: barH - 0.1,
      fill: { color: b.color },
    });
    // Low label
    s.addText(`$${b.low}B`, {
      x: x1 - 0.55, y: by, w: 0.5, h: barH,
      fontSize: 8, fontFace: "Arial", color: C.darkGray, align: "right", valign: "middle", margin: 0,
    });
    // High label (if different)
    if (b.high !== b.low) {
      s.addText(`$${b.high}B`, {
        x: x2 + 0.05, y: by, w: 0.5, h: barH,
        fontSize: 8, fontFace: "Arial", color: C.darkGray, valign: "middle", margin: 0,
      });
    }
  });

  // Implied range label
  s.addText("IMPLIED RANGE: $12-18B", {
    x: 0, y: 4.65, w: 10, h: 0.25,
    fontSize: 11, fontFace: "Arial", bold: true, color: C.gold, align: "center",
  });

  addSourceNote(s,
    "Capital IQ, Goldman Sachs estimates, company filings",
    "FY26E Rev $1.63bn; FY27E Rev $2.03bn; EV/Rev 6-8x (growth premium applied). DCF assumes terminal growth 4%, WACC 11-13%, 10-year projection period."
  );
})();

// ═══════════════════════════════════════════════════════
// SLIDE 9 – Synergies
// ═══════════════════════════════════════════════════════
(function slide9() {
  const s = pres.addSlide();
  addContentHeader(s, "$180M revenue synergies and $90M cost takeout drive $330M value creation", 9, 14);

  // Stacked bar chart - Cumulative Synergies
  s.addChart(pres.charts.BAR, [
    { name: "Revenue Synergies", labels: ["Year 1", "Year 2", "Year 3"], values: [40, 80, 100] },
    { name: "Cost Synergies",    labels: ["Year 1", "Year 2", "Year 3"], values: [20, 40, 50] },
    { name: "Data Monetization", labels: ["Year 1", "Year 2", "Year 3"], values: [5, 15, 30] },
  ], {
    x: 0.4, y: 1.2, w: 4.8, h: 3.0,
    barDir: "col",
    barGrouping: "stacked",
    chartColors: [C.navy, C.gold, "2D3E50"],
    showTitle: true,
    title: "Cumulative Synergies ($M)",
    titleFontSize: 10,
    titleColor: C.text,
    catAxisLabelColor: C.darkGray,
    catAxisLabelFontSize: 9,
    valAxisLabelColor: C.darkGray,
    valAxisLabelFontSize: 8,
    valGridLine: { color: C.lightGray, size: 0.5 },
    catGridLine: { style: "none" },
    showLegend: true,
    legendPos: "b",
    legendFontSize: 7,
    legendColor: C.darkGray,
  });

  // Synergy breakdown cards (right side)
  const syns = [
    { title: "Revenue Synergies", amount: "$180M", desc: "Cross-sell diagnostics; accelerate pharma data licensing; expand trial matching" },
    { title: "Cost Synergies", amount: "$90M", desc: "Consolidate lab ops & overhead; shared IT; procurement leverage" },
    { title: "Data Monetization", amount: "$60M", desc: "Combined datasets for new AI products; foundation model training" },
  ];
  const sStartY = 1.2;
  const sH = 0.72;
  const sGap = 0.1;
  syns.forEach((syn, i) => {
    const sy = sStartY + i * (sH + sGap);
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.5, y: sy, w: 4.1, h: sH,
      fill: { color: C.offWhite },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.5, y: sy, w: 0.04, h: sH,
      fill: { color: C.navy },
    });
    s.addText(syn.title, {
      x: 5.7, y: sy + 0.06, w: 2.5, h: 0.25,
      fontSize: 10, fontFace: "Arial", bold: true, color: C.text, margin: 0,
    });
    s.addText(syn.amount, {
      x: 8.3, y: sy + 0.06, w: 1.2, h: 0.25,
      fontSize: 14, fontFace: "Arial", bold: true, color: C.gold, align: "right", margin: 0,
    });
    s.addText(syn.desc, {
      x: 5.7, y: sy + 0.35, w: 3.7, h: 0.3,
      fontSize: 8, fontFace: "Arial", color: C.textLight, margin: 0,
    });
  });

  // Total line
  s.addShape(pres.shapes.LINE, {
    x: 5.5, y: 3.7, w: 4.1, h: 0,
    line: { color: C.text, width: 1 },
  });
  s.addText("TOTAL", {
    x: 5.7, y: 3.78, w: 2.5, h: 0.25,
    fontSize: 11, fontFace: "Arial", bold: true, color: C.text, margin: 0,
  });
  s.addText("$330M", {
    x: 8.3, y: 3.78, w: 1.2, h: 0.25,
    fontSize: 14, fontFace: "Arial", bold: true, color: C.gold, align: "right", margin: 0,
  });
  s.addText("3-year cumulative run-rate estimate", {
    x: 5.7, y: 4.05, w: 3.7, h: 0.2,
    fontSize: 8, fontFace: "Arial", color: C.textLight, margin: 0,
  });

  // Bottom callout cards
  // Unrivaled Data Moat
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 4.35, w: 4.3, h: 0.5,
    fill: { color: C.offWhite },
  });
  s.addImage({ path: img("image7.png"), x: 0.75, y: 4.38, w: 0.4, h: 0.4 });
  s.addText("Unrivaled Data Moat", {
    x: 1.25, y: 4.36, w: 3.5, h: 0.2,
    fontSize: 9, fontFace: "Arial", bold: true, color: C.gold, margin: 0,
  });
  s.addText("7M+ pathology slides, largest clinical+molecular dataset, 3K+ providers", {
    x: 1.25, y: 4.55, w: 3.5, h: 0.2,
    fontSize: 7.5, fontFace: "Arial", color: C.textLight, margin: 0,
  });

  // Platform Optionality
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y: 4.35, w: 4.5, h: 0.5,
    fill: { color: C.offWhite },
  });
  // Rocket icon (image13 - white on white, so we use a placeholder approach)
  s.addImage({ path: img("image13.png"), x: 5.25, y: 4.38, w: 0.4, h: 0.4 });
  s.addText("Platform Optionality", {
    x: 5.75, y: 4.36, w: 3.7, h: 0.2,
    fontSize: 9, fontFace: "Arial", bold: true, color: C.gold, margin: 0,
  });
  s.addText("Expansion into cardiology, neuropsych, radiology; Ambry cross-sell", {
    x: 5.75, y: 4.55, w: 3.7, h: 0.2,
    fontSize: 7.5, fontFace: "Arial", color: C.textLight, margin: 0,
  });

  addSourceNote(s,
    "PLACEHOLDER",
    "Synergy estimates are cumulative 3-year run-rate projections. Revenue synergies assume 18-24 month ramp. Cost synergies net of one-time integration costs (~$45mm)."
  );
})();

// ═══════════════════════════════════════════════════════
// SLIDE 10 – Management & Board
// ═══════════════════════════════════════════════════════
(function slide10() {
  const s = pres.addSlide();
  addContentHeader(s, "Lefkofsky\u2019s track record and Nobel laureate-led board provide governance credibility", 10, 14);

  // CEO card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 1.15, w: 4.4, h: 1.85,
    fill: { color: C.offWhite },
  });
  // CEO photo
  s.addImage({ path: img("image14.jpeg"), x: 0.8, y: 1.3, w: 1.2, h: 1.2, rounding: true });
  s.addText("Eric Lefkofsky  |  Founder & CEO  |  Since 2015", {
    x: 2.15, y: 1.3, w: 2.7, h: 0.3,
    fontSize: 9, fontFace: "Arial", bold: true, color: C.gold, margin: 0,
  });
  s.addText("JD, U of Michigan | Co-founded Groupon, Echo Global, Mediaocean | GP Lightbank VC | Co-founder Pathos AI | Founded Tempus after wife\u2019s breast cancer Dx", {
    x: 2.15, y: 1.65, w: 2.7, h: 0.9,
    fontSize: 8, fontFace: "Arial", color: C.textLight, margin: 0,
  });

  // Executive table
  const eHdr = { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 8.5, fontFace: "Arial" };
  const eCell = { fontSize: 8.5, fontFace: "Arial", color: C.text };
  s.addTable([
    [
      { text: "Executive", options: eHdr },
      { text: "Title", options: eHdr },
      { text: "Background", options: eHdr },
    ],
    [
      { text: "Ryan Fukushima", options: eCell },
      { text: "President & COO", options: eCell },
      { text: "Employee #1; operational leader", options: eCell },
    ],
    [
      { text: "Jim Rogers", options: eCell },
      { text: "CFO", options: eCell },
      { text: "Financial strategy & capital markets", options: eCell },
    ],
    [
      { text: "Kevin White, Ph.D.", options: eCell },
      { text: "Pres., Genomics", options: eCell },
      { text: "Former UChicago professor", options: eCell },
    ],
  ], {
    x: 0.6, y: 3.2, w: 4.4,
    colW: [1.4, 1.3, 1.7],
    border: { pt: 0.5, color: C.lightGray },
    rowH: [0.28, 0.32, 0.32, 0.32],
  });

  // Board of Directors (right side)
  s.addText("Board of Directors", {
    x: 5.5, y: 1.15, w: 4.0, h: 0.35,
    fontSize: 14, fontFace: "Arial", bold: true, color: C.text, margin: 0,
  });

  const boardMembers = [
    { name: "Jennifer Doudna, Ph.D.", desc: "Nobel Laureate (CRISPR); UC Berkeley; J&J Board" },
    { name: "Peter J. Barris", desc: "NEA Chairman; Groupon & Sprout Social boards" },
    { name: "David R. Epstein", desc: "Former CEO Seagen (acquired by Pfizer, $43B)" },
    { name: "Scott Gottlieb, M.D.", desc: "Former FDA Commissioner (Advisory Board)" },
  ];
  boardMembers.forEach((bm, i) => {
    const by = 1.7 + i * 0.7;
    // Medal/award icon
    s.addImage({ path: img("image15.png"), x: 5.5, y: by + 0.02, w: 0.4, h: 0.4 });
    s.addText(bm.name, {
      x: 6.05, y: by, w: 3.5, h: 0.25,
      fontSize: 11, fontFace: "Arial", bold: true, color: C.text, margin: 0,
    });
    s.addText(bm.desc, {
      x: 6.05, y: by + 0.28, w: 3.5, h: 0.22,
      fontSize: 8, fontFace: "Arial", color: C.textLight, margin: 0,
    });
  });

  addSourceNote(s,
    "Company proxy statement (2025), SEC filings, public biographical records",
    "Board composition as of most recent proxy filing. Advisory Board members noted where applicable."
  );
})();

// ═══════════════════════════════════════════════════════
// SLIDE 11 – Risk Assessment
// ═══════════════════════════════════════════════════════
(function slide11() {
  const s = pres.addSlide();
  addContentHeader(s, "Five identified risks are addressable - data privacy is highest-priority DD workstream", 11, 14);

  const risks = [
    { name: "Data Privacy & HIPAA", level: "HIGH", levelColor: C.red, desc: "Robust de-identification; HIPAA-compliant infrastructure; contractual reps & warranties in SPA" },
    { name: "Regulatory / FDA Risk", level: "MED", levelColor: C.amber, desc: "700+ AI/ML devices FDA-authorized; multiple clearances including Paige Prostate Detect" },
    { name: "Oncology Concentration", level: "MED", levelColor: C.amber, desc: "Expanding into cardiology, neuropsych, radiology; Ambry diversifies into hereditary & rare disease" },
    { name: "Profitability Timeline", level: "MED", levelColor: C.amber, desc: "Adj. EBITDA breakeven Q3\u201925; gross margins +15pp YoY; operating leverage in platform model" },
    { name: "Integration Complexity", level: "LOW", levelColor: C.green, desc: "3 acquisitions in 12 months executed successfully; Ambry under original leadership" },
  ];

  const rStartY = 1.15;
  const rH = 0.65;
  const rGap = 0.12;
  risks.forEach((risk, i) => {
    const ry = rStartY + i * (rH + rGap);
    // Row background (alternating)
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: ry, w: 8.8, h: rH,
      fill: { color: i % 2 === 0 ? C.offWhite : C.white },
    });
    // Risk name
    s.addText(risk.name, {
      x: 0.8, y: ry + 0.1, w: 2.8, h: 0.45,
      fontSize: 11, fontFace: "Arial", bold: true, color: C.text, valign: "middle", margin: 0,
    });
    // Level badge
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 3.8, y: ry + 0.15, w: 0.7, h: 0.35,
      fill: { color: risk.levelColor },
      rectRadius: 0.05,
    });
    s.addText(risk.level, {
      x: 3.8, y: ry + 0.15, w: 0.7, h: 0.35,
      fontSize: 8, fontFace: "Arial", bold: true, color: C.white, align: "center", valign: "middle", margin: 0,
    });
    // Description
    s.addText(risk.desc, {
      x: 4.7, y: ry + 0.1, w: 4.6, h: 0.45,
      fontSize: 9, fontFace: "Arial", color: C.textLight, valign: "middle", margin: 0,
    });
  });

  addSourceNote(s,
    "Goldman Sachs risk assessment, regulatory filings, HIPAA compliance review",
    "Risk ratings reflect Goldman Sachs internal assessment framework. HIGH = material impact if unmitigated; MED = manageable with standard DD; LOW = minimal residual risk."
  );
})();

// ═══════════════════════════════════════════════════════
// SLIDE 12 – Deal Structure Options
// ═══════════════════════════════════════════════════════
(function slide12() {
  const s = pres.addSlide();
  addContentHeader(s, "We recommend 60/40 cash/stock at $14-16B EV to balance leverage, seller alignment, and retention", 12, 14);

  // Gold accent line under title
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 1.0, w: 1.5, h: 0.04,
    fill: { color: C.gold },
  });

  const structures = [
    {
      header: "RECOMMENDED",
      title: "60% Cash / 40% Stock",
      color: C.navy,
      headerColor: C.gold,
      textColor: C.white,
      items: ["Implied EV: $14-16B", "Premium: 60-80%", "Aligns Lefkofsky via stock", "Leverage: 2.5-3.0x", "Earn-out on data KPIs"],
    },
    {
      header: "ALTERNATIVE A",
      title: "All Cash",
      color: "F0F1F3",
      headerColor: C.midGray,
      textColor: C.text,
      items: ["Implied EV: $13-15B", "Premium: 45-70%", "Clean execution", "Leverage: 4.0-4.5x", "Key talent departure risk"],
    },
    {
      header: "ALTERNATIVE B",
      title: "Stock-for-Stock",
      color: "F0F1F3",
      headerColor: C.midGray,
      textColor: C.text,
      items: ["Implied EV: $15-18B", "Tax-deferred for holders", "Full upside alignment", "No leverage impact", "Shareholder approval req\u2019d"],
    },
  ];

  const cardW = 2.85;
  const cardGap = 0.15;
  const cardStartX = 0.6;
  const cardY = 1.2;
  const cardH = 3.35;

  structures.forEach((st, i) => {
    const cx = cardStartX + i * (cardW + cardGap);
    // Card background
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardY, w: cardW, h: cardH,
      fill: { color: st.color },
    });
    // Header label
    s.addText(st.header, {
      x: cx, y: cardY + 0.15, w: cardW, h: 0.25,
      fontSize: 8, fontFace: "Arial", color: st.headerColor, align: "center", charSpacing: 2, margin: 0,
    });
    // Title
    s.addText(st.title, {
      x: cx, y: cardY + 0.45, w: cardW, h: 0.4,
      fontSize: 16, fontFace: "Arial", bold: true, color: st.textColor, align: "center", margin: 0,
    });
    // Gold divider
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx + 0.8, y: cardY + 0.9, w: cardW - 1.6, h: 0.03,
      fill: { color: C.gold },
    });
    // Checklist items
    st.items.forEach((item, j) => {
      const iy = cardY + 1.1 + j * 0.4;
      // Checkmark icon
      s.addImage({ path: img("image17.png"), x: cx + 0.25, y: iy + 0.02, w: 0.28, h: 0.28 });
      s.addText(item, {
        x: cx + 0.6, y: iy, w: cardW - 0.8, h: 0.3,
        fontSize: 10, fontFace: "Arial", color: st.textColor, valign: "middle", margin: 0,
      });
    });
  });

  addSourceNote(s,
    "Goldman Sachs structuring analysis, Capital IQ, comparable transaction terms",
    "Premium calculated vs. undisturbed 30-day VWAP. Leverage multiples based on pro forma Adj. EBITDA. All structures assume no regulatory break fee."
  );
})();

// ═══════════════════════════════════════════════════════
// SLIDE 13 – Timeline & Partnerships
// ═══════════════════════════════════════════════════════
(function slide13() {
  const s = pres.addSlide();
  addContentHeader(s, "Three acquisitions and $200M+ in pharma collaborations since IPO signal execution capacity", 13, 14);

  // Gold accent line
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 1.0, w: 1.5, h: 0.04,
    fill: { color: C.gold },
  });

  // Timeline
  const timelineY = 1.4;
  // Horizontal line
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: timelineY + 0.55, w: 8.6, h: 0,
    line: { color: C.navy, width: 2 },
  });

  // Timeline events
  const events = [
    { x: 0.9, date: "Jun 2024", desc: "IPO $411M raised", above: true },
    { x: 2.3, date: "Jun 2024", desc: "SoftBank JV", above: false },
    { x: 3.9, date: "Nov 2024", desc: "Ambry ($600M)", above: true },
    { x: 5.3, date: "Mar 2025", desc: "Deep 6 AI ($17M)", above: false },
    { x: 6.6, date: "May 2025", desc: "AZ $200M collab", above: true },
    { x: 7.9, date: "Aug 2025", desc: "Paige ($81M)", above: false },
    { x: 9.0, date: "Jan 2026", desc: "FY25: $1.27B", above: true },
  ];

  events.forEach(ev => {
    // Dot
    const dotColor = ev === events[events.length - 1] ? C.gold : C.navy;
    s.addShape(pres.shapes.OVAL, {
      x: ev.x - 0.09, y: timelineY + 0.46, w: 0.18, h: 0.18,
      fill: { color: dotColor },
    });
    if (ev.above) {
      s.addText(ev.date, {
        x: ev.x - 0.5, y: timelineY - 0.25, w: 1.0, h: 0.2,
        fontSize: 8, fontFace: "Arial", bold: true, color: C.text, align: "center", margin: 0,
      });
      s.addText(ev.desc, {
        x: ev.x - 0.6, y: timelineY - 0.05, w: 1.2, h: 0.2,
        fontSize: 7, fontFace: "Arial", color: C.textLight, align: "center", margin: 0,
      });
    } else {
      s.addText(ev.date, {
        x: ev.x - 0.5, y: timelineY + 0.75, w: 1.0, h: 0.2,
        fontSize: 8, fontFace: "Arial", bold: true, color: C.text, align: "center", margin: 0,
      });
      s.addText(ev.desc, {
        x: ev.x - 0.6, y: timelineY + 0.93, w: 1.2, h: 0.2,
        fontSize: 7, fontFace: "Arial", color: C.textLight, align: "center", margin: 0,
      });
    }
  });

  // Partner table
  const ptHdr = { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 9, fontFace: "Arial" };
  const ptCell = { fontSize: 9, fontFace: "Arial", color: C.text };
  s.addTable([
    [
      { text: "Partner", options: ptHdr },
      { text: "Type", options: ptHdr },
      { text: "Details & Strategic Value", options: ptHdr },
    ],
  ], {
    x: 0.6, y: 2.7, w: 8.8,
    colW: [1.8, 1.3, 5.7],
    border: { pt: 0.5, color: C.lightGray },
    rowH: [0.3],
  });

  // Partner rows with logos
  const partners = [
    { logo: "image18.png", logoW: 1.2, logoH: 0.25, type: "Data Licensing", details: "$200M multi-year AI collaboration for oncology foundation model" },
    { logo: "image19.png", logoW: 1.0, logoH: 0.22, type: "Precision Med", details: "AI-driven precision medicine partnership (March 2026)" },
    { logo: "image20.png", logoW: 1.2, logoH: 0.2, type: "Data Licensing", details: "Multimodal data licensing for immunotherapy development" },
    { logo: "image21.jpg", logoW: 1.0, logoH: 0.22, type: "Platform", details: "Genomics platform integration partner for NGS workflows" },
    { logo: "image22.jpg", logoW: 1.2, logoH: 0.22, type: "Joint Venture", details: "SB Tempus: AI healthcare expansion in Japan" },
  ];

  partners.forEach((p, i) => {
    const py = 3.05 + i * 0.35;
    // Row bg
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: py, w: 8.8, h: 0.35,
      fill: { color: i % 2 === 0 ? C.white : C.offWhite },
    });
    // Logo
    s.addImage({
      path: img(p.logo),
      x: 0.8 + (1.4 - p.logoW) / 2, y: py + (0.35 - p.logoH) / 2,
      w: p.logoW, h: p.logoH,
    });
    // Type
    s.addText(p.type, {
      x: 2.4, y: py, w: 1.3, h: 0.35,
      fontSize: 9, fontFace: "Arial", color: C.text, valign: "middle", margin: 0,
    });
    // Details
    s.addText(p.details, {
      x: 3.7, y: py, w: 5.7, h: 0.35,
      fontSize: 9, fontFace: "Arial", color: C.text, valign: "middle", margin: 0,
    });
    // Border bottom
    s.addShape(pres.shapes.LINE, {
      x: 0.6, y: py + 0.35, w: 8.8, h: 0,
      line: { color: C.lightGray, width: 0.5 },
    });
  });

  addSourceNote(s,
    "Company filings, press releases, SEC filings, ClinicalTrials.gov",
    "Partnership values represent total contract value where disclosed. SoftBank JV refers to SB Tempus joint venture entity for Japan market."
  );
})();

// ═══════════════════════════════════════════════════════
// SLIDE 14 – Next Steps (Dark Navy)
// ═══════════════════════════════════════════════════════
(function slide14() {
  const s = pres.addSlide();
  s.background = { color: C.navyDark };

  // Gold top bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.04, fill: { color: C.gold } });

  // Title
  s.addText("Immediate next step: Approach Lefkofsky within 2 weeks", {
    x: 0.7, y: 0.4, w: 8.6, h: 0.6,
    fontSize: 24, fontFace: "Arial", bold: true, color: C.white, margin: 0,
  });
  // Subtitle
  s.addText("16-week timeline to close", {
    x: 0.7, y: 1.0, w: 8, h: 0.35,
    fontSize: 14, fontFace: "Arial", italic: true, color: C.gold, margin: 0,
  });

  // Phase cards
  const phases = [
    { phase: "PHASE 1", weeks: "Weeks 1-2", desc: "Approach management via CEO Lefkofsky; execute NDA; request data room; engage regulatory counsel" },
    { phase: "PHASE 2", weeks: "Weeks 3-6", desc: "Detailed DD on data assets, IP portfolio, lab operations; validate revenue model & pharma contracts" },
    { phase: "PHASE 3", weeks: "Weeks 7-10", desc: "Finalize valuation & synergy model; negotiate structure (60/40 recommended); draft definitive agreement" },
    { phase: "PHASE 4", weeks: "Weeks 11-16", desc: "Board & shareholder approval; Hart-Scott-Rodino; regulatory clearances; integration planning" },
  ];

  const pStartY = 1.55;
  const pH = 0.72;
  const pGap = 0.15;

  phases.forEach((ph, i) => {
    const py = pStartY + i * (pH + pGap);
    // Card background
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: py, w: 8.6, h: pH,
      fill: { color: C.blueGray },
    });
    // Left accent
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: py, w: 0.05, h: pH,
      fill: { color: C.gold },
    });
    // Phase label
    s.addText(ph.phase, {
      x: 1.0, y: py + 0.08, w: 1.5, h: 0.2,
      fontSize: 8, fontFace: "Arial", color: C.gold, charSpacing: 2, margin: 0,
    });
    // Weeks
    s.addText(ph.weeks, {
      x: 1.0, y: py + 0.3, w: 1.5, h: 0.3,
      fontSize: 13, fontFace: "Arial", bold: true, color: C.white, margin: 0,
    });
    // Description
    s.addText(ph.desc, {
      x: 2.7, y: py + 0.1, w: 6.4, h: 0.5,
      fontSize: 10, fontFace: "Arial", color: "CADCFC", valign: "middle", margin: 0,
    });
  });

  // Footer
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 5.0, w: 8.6, h: 0,
    line: { color: C.gold, width: 0.5 },
  });
  s.addText("GOLDMAN SACHS  |  HEALTHCARE M&A  |  STRICTLY PRIVATE & CONFIDENTIAL", {
    x: 0, y: 5.1, w: 10, h: 0.2,
    fontSize: 7, fontFace: "Arial", color: C.midGray, align: "center", charSpacing: 1,
  });
  s.addText("For discussion purposes only. April 2026.", {
    x: 0, y: 5.28, w: 10, h: 0.2,
    fontSize: 7, fontFace: "Arial", italic: true, color: C.midGray, align: "center",
  });
})();

// ── Write file ──
const OUTPUT = path.join(__dirname, "TempusAI_Final.pptx");
pres.writeFile({ fileName: OUTPUT }).then(() => {
  console.log("Created: " + OUTPUT);
}).catch(err => {
  console.error("Error:", err);
});
