// Recreate Meta Platforms FY2025 Equity Research deck
// Usage: node recreate.js

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333" x 7.5"
pres.author = "Equity Research";
pres.title = "Meta Platforms, Inc. - FY2025 Annual Review";

// ---------- palette ----------
const C = {
  navy: "1C2B33",
  blue: "0081FB",
  blueDark: "0064E0",
  green: "42B72A",
  red: "E41E3F",
  orange: "E89D0E",
  gold: "D4A017",
  grayBg: "F5F6F7",
  grayBorder: "DADDE1",
  grayMuted: "65676B",
  grayLabel: "B0B3B8",
  black: "050505",
  white: "FFFFFF",
};

const SLIDE_W = 13.333;
const SLIDE_H = 7.5;

// ---------- reusable helpers ----------
function addSlideFrame(slide, pageNumber) {
  // light gray background
  slide.background = { color: C.grayBg };

  // dark footer bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 7.2, w: SLIDE_W, h: 0.3,
    fill: { color: C.navy }, line: { color: C.navy },
  });
  slide.addText("Meta Platforms, Inc. (NASDAQ: META) | FY2025 Equity Research", {
    x: 0.4, y: 7.2, w: 8, h: 0.3,
    fontSize: 9, fontFace: "Arial", color: C.white, valign: "middle", margin: 0,
  });
  slide.addText(String(pageNumber), {
    x: SLIDE_W - 0.8, y: 7.2, w: 0.4, h: 0.3,
    fontSize: 9, fontFace: "Arial", color: C.white, valign: "middle", align: "right", margin: 0,
  });
}

function addHeader(slide, title, subtitle) {
  slide.addText(title, {
    x: 0.5, y: 0.35, w: 12.3, h: 0.7,
    fontSize: 32, fontFace: "Arial", bold: true, color: C.navy, margin: 0, valign: "middle",
  });
  slide.addText(subtitle, {
    x: 0.5, y: 1.05, w: 12.3, h: 0.35,
    fontSize: 13, fontFace: "Arial", italic: true, color: C.grayMuted, margin: 0, valign: "middle",
  });
}

// card with a left blue rail
function addRailCard(slide, x, y, w, h, railColor = C.blue) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: C.white }, line: { color: C.grayBorder, width: 1 },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.08, h,
    fill: { color: railColor }, line: { color: railColor },
  });
}

// ========================================================================
// SLIDE 1 — Cover
// ========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  // blue left rail
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.3, h: SLIDE_H,
    fill: { color: C.blue }, line: { color: C.blue },
  });

  // EQUITY RESEARCH
  s.addText("EQUITY RESEARCH", {
    x: 0.8, y: 1.5, w: 10, h: 0.4,
    fontSize: 14, fontFace: "Arial", bold: true, color: C.blue, charSpacing: 4, margin: 0, valign: "middle",
  });

  // INTERNET & INTERACTIVE MEDIA
  s.addText("INTERNET & INTERACTIVE MEDIA", {
    x: 0.8, y: 1.95, w: 10, h: 0.4,
    fontSize: 12, fontFace: "Arial", color: C.grayBorder, charSpacing: 4, margin: 0, valign: "middle",
  });

  // Meta Platforms, Inc.
  s.addText("Meta Platforms, Inc.", {
    x: 0.8, y: 2.9, w: 11, h: 1.1,
    fontSize: 54, fontFace: "Arial", bold: true, color: C.white, margin: 0, valign: "middle",
  });

  // NASDAQ: META
  s.addText("NASDAQ: META", {
    x: 0.8, y: 4.1, w: 10, h: 0.5,
    fontSize: 22, fontFace: "Arial", bold: true, color: C.blue, margin: 0, valign: "middle",
  });

  // FY2025 Annual Review
  s.addText("FY2025 Annual Review", {
    x: 0.8, y: 4.6, w: 10, h: 0.5,
    fontSize: 18, fontFace: "Arial", italic: true, color: C.grayBorder, margin: 0, valign: "middle",
  });

  // blue divider line
  s.addShape(pres.shapes.LINE, {
    x: 0.8, y: 5.25, w: 3.5, h: 0,
    line: { color: C.blue, width: 2 },
  });

  // Prepared for Monday Executive Meeting
  s.addText("Prepared for Monday Executive Meeting", {
    x: 0.8, y: 5.65, w: 10, h: 0.35,
    fontSize: 13, fontFace: "Arial", color: C.grayBorder, margin: 0, valign: "middle",
  });

  // April 13, 2026
  s.addText("April 13, 2026", {
    x: 0.8, y: 6.0, w: 10, h: 0.35,
    fontSize: 13, fontFace: "Arial", bold: true, color: C.white, margin: 0, valign: "middle",
  });
}

// ========================================================================
// SLIDE 2 — Executive Summary
// ========================================================================
{
  const s = pres.addSlide();
  addSlideFrame(s, 2);
  addHeader(s, "Executive Summary", "Strong operations, but valuation already reflects the growth story");

  // Left big card (Investment Thesis)
  addRailCard(s, 0.5, 1.6, 7.8, 5.3);

  s.addText("INVESTMENT THESIS", {
    x: 0.75, y: 1.75, w: 7, h: 0.3,
    fontSize: 11, fontFace: "Arial", bold: true, color: C.navy, charSpacing: 3, margin: 0, valign: "middle",
  });

  s.addText("A dominant ad franchise trading near fair value.", {
    x: 0.75, y: 2.15, w: 7.3, h: 0.6,
    fontSize: 22, fontFace: "Arial", bold: true, color: C.navy, margin: 0, valign: "middle",
  });

  s.addText(
    "Meta's 22.2% revenue growth and 41.44% operating margin confirm a durable, high-quality franchise — but a one-time tax spike and an 87.1% surge in AI capex compress near-term earnings and free cash flow, leaving the $638.00 blended target only 4.2% above the current price.",
    {
      x: 0.75, y: 2.85, w: 7.3, h: 1.5,
      fontSize: 12, fontFace: "Arial", color: C.black, margin: 0, valign: "top",
    }
  );

  // Three mini stat cards inside
  const statCards = [
    { x: 0.75, label: "REVENUE GROWTH", value: "+22.2%", vc: C.green, sub: "$200.97B total" },
    { x: 3.25, label: "OPERATING MARGIN", value: "41.44%", vc: C.red, sub: "vs. 42.18% prior" },
    { x: 5.75, label: "FCF MARGIN", value: "21.69%", vc: C.blue, sub: "capex-pressured" },
  ];
  statCards.forEach(c => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: 4.5, w: 2.3, h: 2.2,
      fill: { color: C.grayBg }, line: { color: C.grayBorder, width: 1 },
    });
    s.addText(c.label, {
      x: c.x, y: 4.65, w: 2.3, h: 0.3,
      fontSize: 9, fontFace: "Arial", bold: true, color: C.grayMuted,
      charSpacing: 2, align: "center", valign: "middle", margin: 0,
    });
    s.addText(c.value, {
      x: c.x, y: 5.05, w: 2.3, h: 1.1,
      fontSize: 36, fontFace: "Arial", bold: true, color: c.vc,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(c.sub, {
      x: c.x, y: 6.2, w: 2.3, h: 0.35,
      fontSize: 10, fontFace: "Arial", italic: true, color: C.grayMuted,
      align: "center", valign: "middle", margin: 0,
    });
  });

  // Right key metrics card
  addRailCard(s, 8.5, 1.6, 4.35, 5.3);

  s.addText("KEY METRICS", {
    x: 8.75, y: 1.75, w: 3.9, h: 0.3,
    fontSize: 11, fontFace: "Arial", bold: true, color: C.navy, charSpacing: 3, margin: 0, valign: "middle",
  });

  const metrics = [
    ["Net Margin", "30.08%"],
    ["ROE", "27.83%"],
    ["ROA", "16.52%"],
    ["P/E Ratio", "26.07"],
    ["P/S Ratio", "7.84"],
    ["EV / EBIT", "18.66"],
    ["EV / Revenue", "7.73"],
    ["Debt / Equity", "0.27"],
    ["Current Ratio", "2.60"],
  ];
  const mStartY = 2.25;
  const mRowH = 0.5;
  metrics.forEach((m, i) => {
    const y = mStartY + i * mRowH;
    s.addText(m[0], {
      x: 8.75, y, w: 2, h: mRowH,
      fontSize: 12, fontFace: "Arial", color: C.black, valign: "middle", margin: 0,
    });
    s.addText(m[1], {
      x: 10.75, y, w: 1.9, h: mRowH,
      fontSize: 13, fontFace: "Arial", bold: true, color: C.navy, align: "right", valign: "middle", margin: 0,
    });
    // light divider
    if (i < metrics.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: 8.75, y: y + mRowH, w: 3.9, h: 0,
        line: { color: C.grayBorder, width: 0.5 },
      });
    }
  });
}

// ========================================================================
// SLIDE 3 — Business Overview
// ========================================================================
{
  const s = pres.addSlide();
  addSlideFrame(s, 3);
  addHeader(s, "Business Overview", "Two operating segments anchored by a global ad-supported platform");

  const cols = [
    {
      x: 0.5, title: "FAMILY OF APPS",
      sub: "Facebook • Instagram • WhatsApp • Messenger • Threads",
      big: "$198.76B", meta: "FY2025 Revenue | +22.4% YoY | 98.9% of total",
      rows: [
        ["Advertising Revenue", "$196.18B", "+22.1% YoY", C.green],
        ["Operating Income", "$102.47B", "+17.6% YoY", C.green],
        ["Segment Margin", "52%", "vs. 54% prior", C.red],
      ],
    },
    {
      x: 6.85, title: "REALITY LABS",
      sub: "AR/VR Hardware • Horizon Worlds • Metaverse R&D",
      big: "$2.21B", meta: "FY2025 Revenue | +2.8% YoY | 1.1% of total",
      rows: [
        ["Operating Loss", "-$19.19B", "vs. -$17.73B", C.red],
        ["Segment Margin", "-870%", "vs. -826%", C.red],
        ["Cumulative Loss", ">$60.00B", "since 2020", C.red],
      ],
    },
  ];

  cols.forEach(col => {
    // header bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: col.x, y: 1.55, w: 6, h: 0.7,
      fill: { color: C.blue }, line: { color: C.blue },
    });
    s.addText(col.title, {
      x: col.x + 0.3, y: 1.55, w: 5.5, h: 0.7,
      fontSize: 14, fontFace: "Arial", bold: true, color: C.white,
      charSpacing: 3, valign: "middle", margin: 0,
    });

    // body card
    s.addShape(pres.shapes.RECTANGLE, {
      x: col.x, y: 2.25, w: 6, h: 4.7,
      fill: { color: C.white }, line: { color: C.grayBorder, width: 1 },
    });

    s.addText(col.sub, {
      x: col.x + 0.3, y: 2.4, w: 5.5, h: 0.35,
      fontSize: 12, fontFace: "Arial", italic: true, color: C.grayMuted, valign: "middle", margin: 0,
    });

    s.addText(col.big, {
      x: col.x + 0.3, y: 2.8, w: 5.5, h: 0.9,
      fontSize: 44, fontFace: "Arial", bold: true, color: C.navy, valign: "middle", margin: 0,
    });

    s.addText(col.meta, {
      x: col.x + 0.3, y: 3.75, w: 5.5, h: 0.35,
      fontSize: 11, fontFace: "Arial", color: C.black, valign: "middle", margin: 0,
    });

    // rows
    col.rows.forEach((r, i) => {
      const ry = 4.25 + i * 0.85;
      // divider line
      s.addShape(pres.shapes.LINE, {
        x: col.x + 0.3, y: ry, w: 5.5, h: 0,
        line: { color: C.grayBorder, width: 0.5 },
      });
      s.addText(r[0], {
        x: col.x + 0.3, y: ry + 0.05, w: 5.5, h: 0.3,
        fontSize: 11, fontFace: "Arial", color: C.black, valign: "middle", margin: 0,
      });
      s.addText(r[1], {
        x: col.x + 0.3, y: ry + 0.32, w: 2.5, h: 0.45,
        fontSize: 18, fontFace: "Arial", bold: true, color: C.navy, valign: "middle", margin: 0,
      });
      s.addText(r[2], {
        x: col.x + 2.9, y: ry + 0.32, w: 2.9, h: 0.45,
        fontSize: 16, fontFace: "Arial", bold: true, color: r[3], valign: "middle", margin: 0,
      });
    });
  });
}

// ========================================================================
// SLIDE 4 — Revenue Growth & Mix
// ========================================================================
{
  const s = pres.addSlide();
  addSlideFrame(s, 4);
  addHeader(s, "Revenue Growth & Mix", "Consistent ~22% top-line growth; advertising remains the engine");

  // Bar chart - Total Revenue
  s.addChart(pres.charts.BAR, [{
    name: "Total Revenue ($B)",
    labels: ["FY2023", "FY2024", "FY2025"],
    values: [134.90, 164.50, 200.97],
  }], {
    x: 0.3, y: 1.5, w: 7.5, h: 5.5, barDir: "col",
    showTitle: true, title: "Total Revenue ($B)", titleFontSize: 14, titleColor: C.navy,
    chartColors: [C.blue],
    chartArea: { fill: { color: C.grayBg } },
    plotArea: { fill: { color: C.grayBg } },
    catAxisLabelColor: C.black, catAxisLabelFontSize: 11, catAxisLabelFontFace: "Arial",
    valAxisLabelColor: C.black, valAxisLabelFontSize: 10, valAxisLabelFontFace: "Arial",
    valGridLine: { style: "none" }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "$0.00\"B\"",
    dataLabelFontSize: 12, dataLabelFontBold: true, dataLabelColor: C.navy,
    showLegend: false, barGapWidthPct: 80,
  });

  // Donut chart - Revenue by Geography
  s.addChart(pres.charts.DOUGHNUT, [{
    name: "Geography",
    labels: ["US & Canada", "Asia-Pacific", "Europe", "Rest of World"],
    values: [39, 27, 23, 11],
  }], {
    x: 7.8, y: 1.5, w: 5.3, h: 3.0,
    showTitle: true, title: "FY2025 Revenue by Geography", titleFontSize: 13, titleColor: C.navy,
    chartColors: [C.navy, C.blue, C.blueDark, C.grayLabel],
    chartArea: { fill: { color: C.grayBg } },
    plotArea: { fill: { color: C.grayBg } },
    showLegend: true, legendPos: "r", legendFontSize: 10, legendColor: C.black,
    showPercent: true, dataLabelColor: C.white, dataLabelFontSize: 10,
    holeSize: 55,
  });

  // Segment contribution card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.8, y: 4.8, w: 5.3, h: 2.15,
    fill: { color: C.white }, line: { color: C.grayBorder, width: 1 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.8, y: 4.8, w: 5.3, h: 0.5,
    fill: { color: C.grayBg }, line: { color: C.grayBorder, width: 1 },
  });
  s.addText("SEGMENT CONTRIBUTION", {
    x: 7.95, y: 4.8, w: 5, h: 0.5,
    fontSize: 11, fontFace: "Arial", bold: true, color: C.navy,
    charSpacing: 3, valign: "middle", margin: 0,
  });
  s.addText("FAMILY OF APPS", {
    x: 7.95, y: 5.4, w: 3, h: 0.3,
    fontSize: 9, fontFace: "Arial", bold: true, color: C.grayMuted,
    charSpacing: 2, valign: "middle", margin: 0,
  });
  s.addText("$198.76B", {
    x: 7.95, y: 5.7, w: 3, h: 0.45,
    fontSize: 22, fontFace: "Arial", bold: true, color: C.navy, valign: "middle", margin: 0,
  });
  s.addText("98.9%", {
    x: 10.8, y: 5.7, w: 2.2, h: 0.45,
    fontSize: 22, fontFace: "Arial", bold: true, color: C.blue,
    align: "right", valign: "middle", margin: 0,
  });
  s.addText("REALITY LABS", {
    x: 7.95, y: 6.2, w: 3, h: 0.3,
    fontSize: 9, fontFace: "Arial", bold: true, color: C.grayMuted,
    charSpacing: 2, valign: "middle", margin: 0,
  });
  s.addText("$2.21B", {
    x: 7.95, y: 6.5, w: 3, h: 0.4,
    fontSize: 20, fontFace: "Arial", bold: true, color: C.navy, valign: "middle", margin: 0,
  });
  s.addText("1.1%", {
    x: 10.8, y: 6.5, w: 2.2, h: 0.4,
    fontSize: 20, fontFace: "Arial", bold: true, color: C.blue,
    align: "right", valign: "middle", margin: 0,
  });
}

// ========================================================================
// SLIDE 5 — Profitability Analysis
// ========================================================================
{
  const s = pres.addSlide();
  addSlideFrame(s, 5);
  addHeader(s, "Profitability Analysis", "Operating strength masked by 2025 tax anomaly");

  // Grouped bar: Operating Income & Net Income
  s.addChart(pres.charts.BAR, [
    { name: "Operating Income", labels: ["FY2023", "FY2024", "FY2025"], values: [46.75, 69.38, 83.28] },
    { name: "Net Income", labels: ["FY2023", "FY2024", "FY2025"], values: [39.10, 62.36, 60.46] },
  ], {
    x: 0.3, y: 1.5, w: 8.6, h: 5.5, barDir: "col", barGrouping: "clustered",
    showTitle: true, title: "Operating & Net Income ($B)", titleFontSize: 14, titleColor: C.navy,
    chartColors: [C.blue, C.blueDark],
    chartArea: { fill: { color: C.grayBg } },
    plotArea: { fill: { color: C.grayBg } },
    catAxisLabelColor: C.black, catAxisLabelFontSize: 11, catAxisLabelFontFace: "Arial",
    valAxisLabelColor: C.black, valAxisLabelFontSize: 10, valAxisLabelFontFace: "Arial",
    valGridLine: { style: "none" }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "$0.00\"B\"",
    dataLabelFontSize: 11, dataLabelFontBold: true, dataLabelColor: C.navy,
    showLegend: true, legendPos: "b", legendFontSize: 11, legendColor: C.black,
    barGapWidthPct: 60,
  });

  // Right side: 4 stat cards
  const pCards = [
    { label: "Operating Margin", value: "41.44%", prior: "prior: 42.18%" },
    { label: "Net Margin", value: "30.08%", prior: "prior: 37.91%" },
    { label: "Effective Tax Rate", value: "29.64%", prior: "prior: 11.75%" },
    { label: "ROE", value: "27.83%", prior: "prior: 34.14%" },
  ];
  pCards.forEach((c, i) => {
    const y = 1.6 + i * 1.4;
    addRailCard(s, 9.1, y, 3.85, 1.25);
    s.addText(c.label, {
      x: 9.35, y: y + 0.1, w: 3.5, h: 0.3,
      fontSize: 11, fontFace: "Arial", bold: true, color: C.black, margin: 0, valign: "middle",
    });
    s.addText(c.value, {
      x: 9.35, y: y + 0.4, w: 2.2, h: 0.75,
      fontSize: 32, fontFace: "Arial", bold: true, color: C.navy, margin: 0, valign: "middle",
    });
    s.addText(c.prior, {
      x: 11.55, y: y + 0.55, w: 1.3, h: 0.35,
      fontSize: 10, fontFace: "Arial", italic: true, color: C.grayMuted, margin: 0, valign: "middle",
    });
  });
}

// ========================================================================
// SLIDE 6 — Cash Flow & Capital Allocation
// ========================================================================
{
  const s = pres.addSlide();
  addSlideFrame(s, 6);
  addHeader(s, "Cash Flow & Capital Allocation", "PLACEHOLDER");

  // Grouped bar: OCF, Capex, FCF
  s.addChart(pres.charts.BAR, [
    { name: "Operating Cash Flow", labels: ["FY2023", "FY2024", "FY2025"], values: [71.11, 91.33, 115.80] },
    { name: "Capital Expenditure", labels: ["FY2023", "FY2024", "FY2025"], values: [27.05, 37.26, 69.69] },
    { name: "Free Cash Flow", labels: ["FY2023", "FY2024", "FY2025"], values: [43.01, 52.10, 43.59] },
  ], {
    x: 0.3, y: 1.5, w: 8.6, h: 5.5, barDir: "col", barGrouping: "clustered",
    showTitle: true, title: "Cash Flow Profile ($B)", titleFontSize: 14, titleColor: C.navy,
    chartColors: [C.blue, C.blueDark, C.navy],
    chartArea: { fill: { color: C.grayBg } },
    plotArea: { fill: { color: C.grayBg } },
    catAxisLabelColor: C.black, catAxisLabelFontSize: 11, catAxisLabelFontFace: "Arial",
    valAxisLabelColor: C.black, valAxisLabelFontSize: 10, valAxisLabelFontFace: "Arial",
    valGridLine: { style: "none" }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "$0.00\"B\"",
    dataLabelFontSize: 10, dataLabelFontBold: true, dataLabelColor: C.navy,
    showLegend: true, legendPos: "b", legendFontSize: 11, legendColor: C.black,
    barGapWidthPct: 50,
  });

  // Right: 4 stat cards
  const cfCards = [
    { label: "Operating Cash Flow", value: "+26.8%", vc: C.green, sub: "to $115.80B" },
    { label: "Capital Expenditure", value: "+87.1%", vc: C.green, sub: "to $69.69B" },
    { label: "Free Cash Flow", value: "-16.3%", vc: C.red, sub: "to $43.59B" },
    { label: "Capital Returns", value: "$31.57B", vc: C.navy, sub: "buybacks + dividends" },
  ];
  cfCards.forEach((c, i) => {
    const y = 1.6 + i * 1.4;
    addRailCard(s, 9.1, y, 3.85, 1.25);
    s.addText(c.label, {
      x: 9.35, y: y + 0.08, w: 3.5, h: 0.3,
      fontSize: 11, fontFace: "Arial", bold: true, color: C.black,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(c.value, {
      x: 9.35, y: y + 0.38, w: 3.5, h: 0.55,
      fontSize: 28, fontFace: "Arial", bold: true, color: c.vc,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(c.sub, {
      x: 9.35, y: y + 0.93, w: 3.5, h: 0.28,
      fontSize: 10, fontFace: "Arial", italic: true, color: C.grayMuted,
      align: "center", valign: "middle", margin: 0,
    });
  });
}

// ========================================================================
// SLIDE 7 — Balance Sheet Strength
// ========================================================================
{
  const s = pres.addSlide();
  addSlideFrame(s, 7);
  addHeader(s, "Balance Sheet Strength", "PLACEHOLDER");

  // Balance sheet table
  const headerFill = { fill: { color: C.navy } };
  const bsRows = [
    [
      { text: "($B)", options: { bold: true, color: C.white, ...headerFill, align: "left" } },
      { text: "FY2025", options: { bold: true, color: C.white, ...headerFill, align: "right" } },
      { text: "FY2024", options: { bold: true, color: C.white, ...headerFill, align: "right" } },
      { text: "Change", options: { bold: true, color: C.white, ...headerFill, align: "right" } },
    ],
    [
      { text: "Cash & Equivalents", options: { color: C.black } },
      { text: "35.87", options: { color: C.black, align: "right" } },
      { text: "43.89", options: { color: C.black, align: "right" } },
      { text: "-18.3%", options: { color: C.red, bold: true, align: "right" } },
    ],
    [
      { text: "Marketable Securities", options: { color: C.black } },
      { text: "45.72", options: { color: C.black, align: "right" } },
      { text: "33.93", options: { color: C.black, align: "right" } },
      { text: "+34.8%", options: { color: C.green, bold: true, align: "right" } },
    ],
    [
      { text: "Total Current Assets", options: { color: C.black } },
      { text: "108.72", options: { color: C.black, align: "right" } },
      { text: "100.05", options: { color: C.black, align: "right" } },
      { text: "+8.7%", options: { color: C.green, bold: true, align: "right" } },
    ],
    [
      { text: "Property & Equipment, Net", options: { color: C.black } },
      { text: "176.40", options: { color: C.black, align: "right" } },
      { text: "121.35", options: { color: C.black, align: "right" } },
      { text: "+45.4%", options: { color: C.green, bold: true, align: "right" } },
    ],
    [
      { text: "Total Assets", options: { color: C.black } },
      { text: "366.02", options: { color: C.black, align: "right" } },
      { text: "276.05", options: { color: C.black, align: "right" } },
      { text: "+32.6%", options: { color: C.green, bold: true, align: "right" } },
    ],
    [
      { text: "Total Current Liabilities", options: { color: C.black } },
      { text: "41.84", options: { color: C.black, align: "right" } },
      { text: "33.60", options: { color: C.black, align: "right" } },
      { text: "+24.5%", options: { color: C.green, bold: true, align: "right" } },
    ],
    [
      { text: "Long-term Debt", options: { color: C.black } },
      { text: "58.74", options: { color: C.black, align: "right" } },
      { text: "28.83", options: { color: C.black, align: "right" } },
      { text: "+103.8%", options: { color: C.green, bold: true, align: "right" } },
    ],
    [
      { text: "Total Liabilities", options: { color: C.black } },
      { text: "148.78", options: { color: C.black, align: "right" } },
      { text: "93.42", options: { color: C.black, align: "right" } },
      { text: "+59.3%", options: { color: C.green, bold: true, align: "right" } },
    ],
    [
      { text: "Stockholders' Equity", options: { color: C.black } },
      { text: "217.24", options: { color: C.black, align: "right" } },
      { text: "182.64", options: { color: C.black, align: "right" } },
      { text: "+18.9%", options: { color: C.green, bold: true, align: "right" } },
    ],
  ];
  s.addTable(bsRows, {
    x: 0.4, y: 1.5, w: 8.5, colW: [3.2, 1.8, 1.8, 1.7],
    rowH: 0.42,
    fontSize: 11, fontFace: "Arial", valign: "middle",
    border: { type: "solid", pt: 0.5, color: C.grayBorder },
  });

  // Analyst note
  addRailCard(s, 0.4, 5.9, 8.5, 1.1);
  s.addText("ANALYST NOTE", {
    x: 0.65, y: 5.95, w: 8, h: 0.3,
    fontSize: 10, fontFace: "Arial", bold: true, color: C.navy,
    charSpacing: 3, valign: "middle", margin: 0,
  });
  s.addText(
    "Assets grew 32.6% driven by AI infrastructure buildout. Long-term debt doubled via November 2025 notes; a prudent use of low-cost capital.",
    {
      x: 0.65, y: 6.25, w: 8.15, h: 0.7,
      fontSize: 11, fontFace: "Arial", color: C.black, valign: "top", margin: 0,
    }
  );

  // Right side mini cards
  const bsCards = [
    { label: "Current Ratio", value: "2.60", sub: "Strong liquidity" },
    { label: "Debt / Equity", value: "0.27", sub: "Conservative leverage" },
    { label: "Cash & Securities", value: "$81.59B", sub: "Ample reserves" },
  ];
  bsCards.forEach((c, i) => {
    const y = 1.5 + i * 1.3;
    addRailCard(s, 9.1, y, 3.85, 1.15);
    s.addText(c.label, {
      x: 9.35, y: y + 0.08, w: 3.5, h: 0.3,
      fontSize: 11, fontFace: "Arial", bold: true, color: C.black,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(c.value, {
      x: 9.35, y: y + 0.38, w: 3.5, h: 0.5,
      fontSize: 24, fontFace: "Arial", bold: true, color: C.navy,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(c.sub, {
      x: 9.35, y: y + 0.85, w: 3.5, h: 0.28,
      fontSize: 10, fontFace: "Arial", italic: true, color: C.grayMuted,
      align: "center", valign: "middle", margin: 0,
    });
  });

  // Overall assessment card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 9.1, y: 5.45, w: 3.85, h: 1.55,
    fill: { color: C.white }, line: { color: C.grayBorder, width: 1 },
  });
  s.addText("OVERALL ASSESSMENT", {
    x: 9.1, y: 5.55, w: 3.85, h: 0.35,
    fontSize: 11, fontFace: "Arial", bold: true, color: C.navy,
    charSpacing: 3, align: "center", valign: "middle", margin: 0,
  });
  s.addText("Investment-grade balance sheet with flexibility to sustain the AI capex cycle.", {
    x: 9.25, y: 5.95, w: 3.55, h: 1.0,
    fontSize: 11, fontFace: "Arial", color: C.black,
    align: "center", valign: "middle", margin: 0,
  });
}

// ========================================================================
// SLIDE 8 — Industry & Competitive Position
// ========================================================================
{
  const s = pres.addSlide();
  addSlideFrame(s, 8);
  addHeader(s, "Industry & Competitive Position", "Structural leader in digital advertising with widening AI moat");

  // Market position card
  addRailCard(s, 0.4, 1.5, 12.55, 1.25);
  s.addText("MARKET POSITION", {
    x: 0.7, y: 1.6, w: 12, h: 0.3,
    fontSize: 11, fontFace: "Arial", bold: true, color: C.navy,
    charSpacing: 3, valign: "middle", margin: 0,
  });
  s.addText(
    "Meta operates the world's largest social media ecosystem and ranks #2 in global digital advertising behind Alphabet. AI-driven ad targeting has translated investments into measurable revenue lift; a core driver of FY25's 22.2% growth.",
    {
      x: 0.7, y: 1.9, w: 12, h: 0.8,
      fontSize: 12, fontFace: "Arial", color: C.black, valign: "top", margin: 0,
    }
  );

  // Porter's five forces rows
  const forces = [
    { label: "Competitive Rivalry", rating: "HIGH", color: C.red, desc: "Alphabet, TikTok, Amazon, and Snap compete for ad dollars and user attention." },
    { label: "Supplier Power", rating: "MODERATE", color: C.orange, desc: "Concentrated chip suppliers (NVIDIA) drive AI infrastructure cost pressure." },
    { label: "Threat of Substitutes", rating: "MODERATE", color: C.orange, desc: "Short-video platforms and AI search apps can shift user time." },
    { label: "Buyer Power", rating: "LOW", color: C.green, desc: "Fragmented global advertiser base; no single customer dependency." },
    { label: "Threat of New Entry", rating: "LOW", color: C.green, desc: "Network effects and data scale create formidable entry barriers." },
  ];
  forces.forEach((f, i) => {
    const y = 2.95 + i * 0.82;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.4, y, w: 12.55, h: 0.72,
      fill: { color: C.white }, line: { color: C.grayBorder, width: 1 },
    });
    s.addText(f.label, {
      x: 0.7, y, w: 3.5, h: 0.72,
      fontSize: 14, fontFace: "Arial", bold: true, color: C.navy,
      valign: "middle", margin: 0,
    });
    // Badge
    s.addShape(pres.shapes.RECTANGLE, {
      x: 4.4, y: y + 0.17, w: 1.5, h: 0.4,
      fill: { color: f.color }, line: { color: f.color },
    });
    s.addText(f.rating, {
      x: 4.4, y: y + 0.17, w: 1.5, h: 0.4,
      fontSize: 11, fontFace: "Arial", bold: true, color: C.white,
      charSpacing: 2, align: "center", valign: "middle", margin: 0,
    });
    s.addText(f.desc, {
      x: 6.1, y, w: 6.6, h: 0.72,
      fontSize: 11, fontFace: "Arial", color: C.black,
      valign: "middle", margin: 0,
    });
  });
}

// ========================================================================
// SLIDE 9 — SWOT Analysis
// ========================================================================
{
  const s = pres.addSlide();
  addSlideFrame(s, 9);
  addHeader(s, "SWOT Analysis", "Dominant franchise, but investor-heavy bets and regulatory overhang persist");

  const quads = [
    { x: 0.4, y: 1.5, title: "STRENGTHS", color: C.green, items: [
      "Global scale: billions of DAUs across FoA",
      "52% FoA operating margin",
      "$81.59B cash & securities position",
      "ROE of 27.83% despite tax headwind",
      "AI-driven ad targeting improvements",
    ]},
    { x: 6.85, y: 1.5, title: "WEAKNESSES", color: C.orange, items: [
      "Reality Labs loss: -$19.19B (2025)",
      "Heavy reliance on advertising (97.6%)",
      "Capex surge pressuring near-term FCF",
      "2025 effective tax rate spike to 29.64%",
      "Founder voting control limits governance",
    ]},
    { x: 0.4, y: 4.35, title: "OPPORTUNITIES", color: C.blue, items: [
      "Monetization of WhatsApp & Threads",
      "AI-generated content & Llama commercialization",
      "Reels continues taking share from TikTok",
      "Business messaging & commerce expansion",
      "Enterprise AI infrastructure leverage",
    ]},
    { x: 6.85, y: 4.35, title: "THREATS", color: C.red, items: [
      "Regulatory scrutiny (EU DMA, US antitrust)",
      "Privacy/ATT changes impacting ad attribution",
      "TikTok & YouTube competitive pressure",
      "AI capex overrun risk vs. monetization",
      "Macro ad spending cyclicality",
    ]},
  ];

  quads.forEach(q => {
    // Colored header
    s.addShape(pres.shapes.RECTANGLE, {
      x: q.x, y: q.y, w: 6.1, h: 0.55,
      fill: { color: q.color }, line: { color: q.color },
    });
    s.addText(q.title, {
      x: q.x + 0.3, y: q.y, w: 5.5, h: 0.55,
      fontSize: 14, fontFace: "Arial", bold: true, color: C.white,
      charSpacing: 3, valign: "middle", margin: 0,
    });
    // White body
    s.addShape(pres.shapes.RECTANGLE, {
      x: q.x, y: q.y + 0.55, w: 6.1, h: 2.1,
      fill: { color: C.white }, line: { color: C.grayBorder, width: 1 },
    });
    // Items
    const bulletItems = q.items.map((t, i) => ({
      text: t,
      options: { bullet: true, breakLine: i < q.items.length - 1 },
    }));
    s.addText(bulletItems, {
      x: q.x + 0.3, y: q.y + 0.7, w: 5.7, h: 1.9,
      fontSize: 12, fontFace: "Arial", color: C.black, paraSpaceAfter: 4,
    });
  });
}

// ========================================================================
// SLIDE 10 — Valuation I: DCF
// ========================================================================
{
  const s = pres.addSlide();
  addSlideFrame(s, 10);
  addHeader(s, "Valuation I: Discounted Cash Flow", "Intrinsic value anchored to normalized FCF and long-term growth");

  // Projected FCF bar chart
  s.addChart(pres.charts.BAR, [{
    name: "Projected FCF",
    labels: ["Y1", "Y2", "Y3", "Y4", "Y5"],
    values: [57.50, 64.97, 72.12, 78.61, 84.12],
  }], {
    x: 0.3, y: 1.5, w: 7.5, h: 5.5, barDir: "col",
    showTitle: true, title: "Projected Free Cash Flow ($B)", titleFontSize: 14, titleColor: C.navy,
    chartColors: [C.blue],
    chartArea: { fill: { color: C.grayBg } },
    plotArea: { fill: { color: C.grayBg } },
    catAxisLabelColor: C.black, catAxisLabelFontSize: 11, catAxisLabelFontFace: "Arial",
    valAxisLabelColor: C.black, valAxisLabelFontSize: 10, valAxisLabelFontFace: "Arial",
    valGridLine: { style: "none" }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "$0.00\"B\"",
    dataLabelFontSize: 11, dataLabelFontBold: true, dataLabelColor: C.navy,
    showLegend: false, barGapWidthPct: 60,
  });

  // Key Assumptions title
  s.addText("Key Assumptions", {
    x: 8.0, y: 1.5, w: 5, h: 0.4,
    fontSize: 14, fontFace: "Arial", bold: true, color: C.navy, valign: "middle", margin: 0,
  });

  // Key assumptions table
  const dcfRows = [
    [
      { text: "Assumption", options: { bold: true, color: C.white, fill: { color: C.navy } } },
      { text: "Value", options: { bold: true, color: C.white, fill: { color: C.navy }, align: "right" } },
    ],
    [{ text: "Base FCF (normalized)", options: { color: C.black } }, { text: "$50.00B", options: { color: C.black, align: "right" } }],
    [{ text: "Explicit forecast period", options: { color: C.black } }, { text: "5 years", options: { color: C.black, align: "right" } }],
    [{ text: "Year 1 FCF growth", options: { color: C.black } }, { text: "15.00%", options: { color: C.black, align: "right" } }],
    [{ text: "Terminal growth rate", options: { color: C.black } }, { text: "3.50%", options: { color: C.black, align: "right" } }],
    [{ text: "Discount rate (WACC)", options: { color: C.black } }, { text: "8.50%", options: { color: C.black, align: "right" } }],
    [{ text: "Tax rate (through-cycle)", options: { color: C.black } }, { text: "15.00%", options: { color: C.black, align: "right" } }],
    [{ text: "Net cash position", options: { color: C.black } }, { text: "$22.85B", options: { color: C.black, align: "right" } }],
    [{ text: "Diluted shares", options: { color: C.black } }, { text: "2,574M", options: { color: C.black, align: "right" } }],
  ];
  s.addTable(dcfRows, {
    x: 8.0, y: 1.95, w: 4.95, colW: [3.0, 1.95],
    rowH: 0.38,
    fontSize: 11, fontFace: "Arial", valign: "middle",
    border: { type: "solid", pt: 0.5, color: C.grayBorder },
  });

  // DCF result card
  addRailCard(s, 8.0, 5.45, 4.95, 1.55);
  s.addText("DCF VALUATION RESULT", {
    x: 8.0, y: 5.55, w: 4.95, h: 0.35,
    fontSize: 11, fontFace: "Arial", bold: true, color: C.navy,
    charSpacing: 3, align: "center", valign: "middle", margin: 0,
  });
  s.addText("$566.49", {
    x: 8.0, y: 5.95, w: 4.95, h: 0.65,
    fontSize: 36, fontFace: "Arial", bold: true, color: C.blue,
    align: "center", valign: "middle", margin: 0,
  });
  s.addText("DOWNSIDE: -7.5%", {
    x: 8.0, y: 6.6, w: 4.95, h: 0.35,
    fontSize: 16, fontFace: "Arial", bold: true, color: C.red,
    align: "center", valign: "middle", margin: 0,
  });
}

// ========================================================================
// SLIDE 11 — Valuation II: Relative P/E Multiple
// ========================================================================
{
  const s = pres.addSlide();
  addSlideFrame(s, 11);
  addHeader(s, "Valuation II: Relative P/E Multiple", "Normalized earnings adjusted for 2025 tax anomaly");

  // Why normalize earnings card
  addRailCard(s, 0.4, 1.5, 12.55, 1.35);
  s.addText("WHY NORMALIZE EARNINGS?", {
    x: 0.7, y: 1.6, w: 12, h: 0.3,
    fontSize: 11, fontFace: "Arial", bold: true, color: C.navy,
    charSpacing: 3, valign: "middle", margin: 0,
  });
  s.addText(
    "Meta's FY2025 effective tax rate of 29.64% is nearly 3x FY2024's 11.75%, driven by deferred tax movements ($18.74B). We normalize using a 15% through-cycle rate. Normalized EPS: $28.38 vs. reported $23.49.",
    {
      x: 0.7, y: 1.95, w: 12, h: 0.85,
      fontSize: 12, fontFace: "Arial", color: C.black, valign: "top", margin: 0,
    }
  );

  // Normalization Build-up
  s.addText("Normalization Build-up", {
    x: 0.4, y: 3.0, w: 6, h: 0.4,
    fontSize: 13, fontFace: "Arial", bold: true, color: C.navy, valign: "middle", margin: 0,
  });
  const normRows = [
    [
      { text: "Line Item", options: { bold: true, color: C.white, fill: { color: C.navy } } },
      { text: "Value", options: { bold: true, color: C.white, fill: { color: C.navy }, align: "right" } },
    ],
    [{ text: "Pre-tax Income FY25", options: { color: C.black } }, { text: "$85.93B", options: { color: C.black, align: "right" } }],
    [{ text: "(-) Normalized Tax @ 15%", options: { color: C.black } }, { text: "$12.89B", options: { color: C.black, align: "right" } }],
    [{ text: "Normalized Net Income", options: { color: C.black, bold: true } }, { text: "$73.04B", options: { color: C.black, bold: true, align: "right" } }],
    [{ text: "÷ Diluted Shares", options: { color: C.black } }, { text: "2,574M", options: { color: C.black, align: "right" } }],
    [{ text: "Normalized EPS", options: { color: C.black, bold: true } }, { text: "$28.38", options: { color: C.black, bold: true, align: "right" } }],
    [{ text: "× Target P/E Multiple", options: { color: C.black } }, { text: "25.00x", options: { color: C.black, align: "right" } }],
    [{ text: "Implied Price", options: { color: C.black, bold: true } }, { text: "$709.50", options: { color: C.black, bold: true, align: "right" } }],
  ];
  s.addTable(normRows, {
    x: 0.4, y: 3.45, w: 6.05, colW: [3.6, 2.45],
    rowH: 0.4,
    fontSize: 11, fontFace: "Arial", valign: "middle",
    border: { type: "solid", pt: 0.5, color: C.grayBorder },
  });

  // Multiple Context
  s.addText("Multiple Context", {
    x: 6.85, y: 3.0, w: 6, h: 0.4,
    fontSize: 13, fontFace: "Arial", bold: true, color: C.navy, valign: "middle", margin: 0,
  });
  const multRows = [
    [
      { text: "Metric", options: { bold: true, color: C.white, fill: { color: C.navy } } },
      { text: "Value", options: { bold: true, color: C.white, fill: { color: C.navy }, align: "right" } },
    ],
    [{ text: "META current P/E", options: { color: C.black } }, { text: "26.07x", options: { color: C.black, align: "right" } }],
    [{ text: "Peer range", options: { color: C.black } }, { text: "22x to 30x", options: { color: C.black, align: "right" } }],
    [{ text: "Target multiple applied", options: { color: C.black, bold: true } }, { text: "25.00x", options: { color: C.black, bold: true, align: "right" } }],
  ];
  s.addTable(multRows, {
    x: 6.85, y: 3.45, w: 6.1, colW: [3.6, 2.5],
    rowH: 0.4,
    fontSize: 11, fontFace: "Arial", valign: "middle",
    border: { type: "solid", pt: 0.5, color: C.grayBorder },
  });

  // Implied fair value card
  addRailCard(s, 6.85, 5.2, 6.1, 1.8);
  s.addText("IMPLIED FAIR VALUE", {
    x: 6.85, y: 5.3, w: 6.1, h: 0.35,
    fontSize: 11, fontFace: "Arial", bold: true, color: C.navy,
    charSpacing: 3, align: "center", valign: "middle", margin: 0,
  });
  s.addText("$709.50", {
    x: 6.85, y: 5.7, w: 6.1, h: 0.75,
    fontSize: 40, fontFace: "Arial", bold: true, color: C.blue,
    align: "center", valign: "middle", margin: 0,
  });
  s.addText("UPSIDE: +15.8%", {
    x: 6.85, y: 6.45, w: 6.1, h: 0.4,
    fontSize: 18, fontFace: "Arial", bold: true, color: C.green,
    align: "center", valign: "middle", margin: 0,
  });
}

// ========================================================================
// SLIDE 12 — Valuation Summary (horizontal bar comparison)
// ========================================================================
{
  const s = pres.addSlide();
  addSlideFrame(s, 12);
  addHeader(s, "Valuation Summary", "Blended target reflects balance between intrinsic & relative approaches");

  s.addText("Methodology Comparison", {
    x: 0.5, y: 1.8, w: 3.5, h: 0.4,
    fontSize: 14, fontFace: "Arial", bold: true, color: C.navy, valign: "middle", margin: 0,
  });

  // Layout:
  // X axis from 3.9 to 12.3 ("$0" to "$800")
  // Max value = 800. Each $100 = (12.3-3.9)/8 = 1.05"
  // Current line at 612.42 → x = 3.9 + 612.42/100 * 1.05 = 3.9 + 6.43 = 10.33"
  const X0 = 3.9, SCALE = 1.05; // per $100

  // Current marker pill
  s.addShape(pres.shapes.RECTANGLE, {
    x: 9.55, y: 1.75, w: 1.9, h: 0.5,
    fill: { color: C.red }, line: { color: C.red },
  });
  s.addText("Current: $612.42", {
    x: 9.55, y: 1.75, w: 1.9, h: 0.5,
    fontSize: 12, fontFace: "Arial", bold: true, color: C.white,
    align: "center", valign: "middle", margin: 0,
  });

  // Dashed red vertical "current" line
  const currentX = X0 + 6.1242 * SCALE;
  s.addShape(pres.shapes.LINE, {
    x: currentX, y: 2.3, w: 0, h: 4.3,
    line: { color: C.red, width: 2.5, dashType: "dash" },
  });

  // Bars
  const bars = [
    { label: "DCF (Intrinsic)", value: 566.49, color: C.navy, textColor: C.white, valueColor: C.navy },
    { label: "Relative P/E", value: 709.50, color: C.blue, textColor: C.white, valueColor: C.blue },
    { label: "Blended Target", value: 638.00, color: C.blue, textColor: C.white, valueColor: C.blue },
  ];
  bars.forEach((b, i) => {
    const y = 2.6 + i * 1.2;
    const w = b.value * SCALE / 100 * 100; // value * 1.05/100 ... simplify
    const barW = (b.value / 100) * SCALE;
    // label on left
    s.addText(b.label, {
      x: 0.5, y: y + 0.1, w: 3.3, h: 0.6,
      fontSize: 14, fontFace: "Arial", bold: true, color: C.navy,
      align: "right", valign: "middle", margin: 0,
    });
    // bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: X0, y, w: barW, h: 0.8,
      fill: { color: b.color }, line: { color: b.color },
    });
    // value label inside or after bar
    if (b.label === "DCF (Intrinsic)") {
      // on the dark bar - put text at right end inside
      s.addText("$566.49", {
        x: X0 + barW - 1.2, y, w: 1.1, h: 0.8,
        fontSize: 16, fontFace: "Arial", bold: true, color: C.white,
        align: "right", valign: "middle", margin: 0,
      });
    } else {
      // blue bars - put value to the right
      const valueStr = "$" + b.value.toFixed(2);
      s.addText(valueStr, {
        x: X0 + barW + 0.1, y, w: 1.5, h: 0.8,
        fontSize: 16, fontFace: "Arial", bold: true, color: b.valueColor,
        align: "left", valign: "middle", margin: 0,
      });
    }
  });

  // X-axis line
  const axisY = 6.65;
  s.addShape(pres.shapes.LINE, {
    x: X0, y: axisY, w: 8.4, h: 0,
    line: { color: C.grayLabel, width: 1 },
  });

  // Axis ticks & labels
  const ticks = [0, 200, 400, 600, 800];
  ticks.forEach(t => {
    const tx = X0 + (t / 100) * SCALE;
    // small tick
    s.addShape(pres.shapes.LINE, {
      x: tx, y: axisY, w: 0, h: 0.08,
      line: { color: C.grayLabel, width: 1 },
    });
    s.addText("$" + t, {
      x: tx - 0.5, y: axisY + 0.1, w: 1, h: 0.35,
      fontSize: 11, fontFace: "Arial", color: C.grayMuted,
      align: "center", valign: "middle", margin: 0,
    });
  });
}

// ========================================================================
// SLIDE 13 — Investment Risks
// ========================================================================
{
  const s = pres.addSlide();
  addSlideFrame(s, 13);
  addHeader(s, "Investment Risks", "Key downside factors to monitor");

  const risks = [
    { title: "AI Capex Overrun Risk", rating: "HIGH", color: C.red,
      desc: "$69.69B in FY25 capex represents 34.7% of revenue. If AI spending fails to generate sufficient revenue uplift, free cash flow compression will extend beyond 2026." },
    { title: "Regulatory & Antitrust", rating: "HIGH", color: C.red,
      desc: "EU DMA enforcement and US antitrust actions could force product changes, structural remedies, or material fines that disrupt Meta's core advertising business model." },
    { title: "Reality Labs Cash Burn", rating: "MEDIUM", color: C.orange,
      desc: "Cumulative Reality Labs losses exceed $60B since 2020, with FY25 adding another -$19.19B. There is no clear timeline to segment profitability." },
    { title: "Ad Market Cyclicality", rating: "MEDIUM", color: C.orange,
      desc: "97.6% revenue dependence on advertising exposes Meta to macroeconomic downturns, recessionary ad spend contraction, and shifting consumer behavior patterns." },
    { title: "Competitive Displacement", rating: "MEDIUM", color: C.orange,
      desc: "TikTok, YouTube Shorts, and emerging AI-native platforms compete intensely for user attention, time spent, and an increasing share of global digital ad budgets." },
    { title: "Tax Rate Normalization", rating: "LOW", color: C.green,
      desc: "FY25 effective tax rate of 29.64% versus FY24's 11.75% reflects deferred tax dynamics. The elevated rate may persist if it proves structural going forward." },
  ];

  // 2 columns x 3 rows
  risks.forEach((r, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 6.35;
    const y = 1.5 + row * 1.85;
    // card
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 6.1, h: 1.7,
      fill: { color: C.white }, line: { color: C.grayBorder, width: 1 },
    });
    // colored rail
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.1, h: 1.7,
      fill: { color: r.color }, line: { color: r.color },
    });
    // title
    s.addText(r.title, {
      x: x + 0.25, y: y + 0.1, w: 3.8, h: 0.45,
      fontSize: 15, fontFace: "Arial", bold: true, color: C.navy, valign: "middle", margin: 0,
    });
    // badge
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 4.75, y: y + 0.18, w: 1.2, h: 0.38,
      fill: { color: r.color }, line: { color: r.color },
    });
    s.addText(r.rating, {
      x: x + 4.75, y: y + 0.18, w: 1.2, h: 0.38,
      fontSize: 10, fontFace: "Arial", bold: true, color: C.white,
      charSpacing: 2, align: "center", valign: "middle", margin: 0,
    });
    // description
    s.addText(r.desc, {
      x: x + 0.25, y: y + 0.65, w: 5.65, h: 1.0,
      fontSize: 11, fontFace: "Arial", color: C.black, valign: "top", margin: 0,
    });
  });
}

// ========================================================================
// SLIDE 14 — Recommendation
// ========================================================================
{
  const s = pres.addSlide();
  addSlideFrame(s, 14);
  addHeader(s, "Recommendation", "Final rating, target price, and supporting rationale");

  // HOLD big card (gold outline)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.5, w: 12.55, h: 2.5,
    fill: { color: C.white }, line: { color: C.gold, width: 3 },
  });
  s.addText("HOLD", {
    x: 0.4, y: 1.65, w: 12.55, h: 1.5,
    fontSize: 96, fontFace: "Arial", bold: true, color: C.gold,
    align: "center", valign: "middle", margin: 0,
  });
  // target price line with colored pieces
  s.addText([
    { text: "Target Price: ", options: { color: C.navy, bold: true } },
    { text: "$638.00", options: { color: C.gold, bold: true } },
    { text: "  |  ", options: { color: C.navy, bold: true } },
    { text: "Current: $612.42", options: { color: C.navy, bold: true } },
    { text: "  |  ", options: { color: C.navy, bold: true } },
    { text: "Upside: ", options: { color: C.navy, bold: true } },
    { text: "+4.2%", options: { color: C.green, bold: true } },
  ], {
    x: 0.4, y: 3.3, w: 12.55, h: 0.55,
    fontSize: 18, fontFace: "Arial",
    align: "center", valign: "middle", margin: 0,
  });

  // Rationale card
  addRailCard(s, 0.4, 4.2, 12.55, 2.8);
  s.addText("RATIONALE", {
    x: 0.7, y: 4.3, w: 12, h: 0.35,
    fontSize: 11, fontFace: "Arial", bold: true, color: C.navy,
    charSpacing: 3, valign: "middle", margin: 0,
  });

  const rationale = [
    { bold: "Strong franchise:", rest: " 22.2% revenue growth and 41.44% operating margin." },
    { bold: "Earnings under pressure:", rest: " tax spike and AI capex compress near-term EPS and FCF." },
    { bold: "Fair, not cheap:", rest: " $638.00 target offers only +4.2% upside versus current price." },
    { bold: "Upgrade catalysts:", rest: " capex normalization, Reality Labs loss narrowing, AI monetization proof." },
  ];
  rationale.forEach((r, i) => {
    const ry = 4.8 + i * 0.55;
    // blue square bullet
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.85, y: ry + 0.1, w: 0.22, h: 0.22,
      fill: { color: C.blue }, line: { color: C.blue },
    });
    s.addText([
      { text: r.bold, options: { bold: true, color: C.navy } },
      { text: r.rest, options: { color: C.grayMuted } },
    ], {
      x: 1.2, y: ry, w: 11.5, h: 0.45,
      fontSize: 13, fontFace: "Arial", valign: "middle", margin: 0,
    });
  });
}

// ========================================================================
// SLIDE 15 — Appendix & Disclaimer
// ========================================================================
{
  const s = pres.addSlide();
  addSlideFrame(s, 15);
  addHeader(s, "Appendix & Disclaimer", "Supporting data and disclosures");

  s.addText("Three-Year Financial Summary ($B, except per-share)", {
    x: 0.4, y: 1.5, w: 8.5, h: 0.4,
    fontSize: 13, fontFace: "Arial", bold: true, color: C.navy, valign: "middle", margin: 0,
  });

  const apxRows = [
    [
      { text: "Metric", options: { bold: true, color: C.white, fill: { color: C.navy }, align: "center" } },
      { text: "FY2023", options: { bold: true, color: C.white, fill: { color: C.navy }, align: "center" } },
      { text: "FY2024", options: { bold: true, color: C.white, fill: { color: C.navy }, align: "center" } },
      { text: "FY2025", options: { bold: true, color: C.white, fill: { color: C.navy }, align: "center" } },
    ],
    [{ text: "Total Revenue", options: { color: C.black, align: "center" } }, { text: "134.90", options: { color: C.black, align: "center" } }, { text: "164.50", options: { color: C.black, align: "center" } }, { text: "200.97", options: { color: C.black, align: "center" } }],
    [{ text: "Operating Income", options: { color: C.black, align: "center" } }, { text: "46.75", options: { color: C.black, align: "center" } }, { text: "69.38", options: { color: C.black, align: "center" } }, { text: "83.28", options: { color: C.black, align: "center" } }],
    [{ text: "Net Income", options: { color: C.black, align: "center" } }, { text: "39.10", options: { color: C.black, align: "center" } }, { text: "62.36", options: { color: C.black, align: "center" } }, { text: "60.46", options: { color: C.black, align: "center" } }],
    [{ text: "Diluted EPS ($)", options: { color: C.black, align: "center" } }, { text: "14.87", options: { color: C.black, align: "center" } }, { text: "23.86", options: { color: C.black, align: "center" } }, { text: "23.49", options: { color: C.black, align: "center" } }],
    [{ text: "Operating Cash Flow", options: { color: C.black, align: "center" } }, { text: "71.11", options: { color: C.black, align: "center" } }, { text: "91.33", options: { color: C.black, align: "center" } }, { text: "115.80", options: { color: C.black, align: "center" } }],
    [{ text: "Capital Expenditure", options: { color: C.black, align: "center" } }, { text: "27.05", options: { color: C.black, align: "center" } }, { text: "37.26", options: { color: C.black, align: "center" } }, { text: "69.69", options: { color: C.black, align: "center" } }],
    [{ text: "Free Cash Flow", options: { color: C.black, align: "center" } }, { text: "43.01", options: { color: C.black, align: "center" } }, { text: "52.10", options: { color: C.black, align: "center" } }, { text: "43.59", options: { color: C.black, align: "center" } }],
    [{ text: "Total Assets", options: { color: C.black, align: "center" } }, { text: "n/a", options: { color: C.black, align: "center" } }, { text: "276.05", options: { color: C.black, align: "center" } }, { text: "366.02", options: { color: C.black, align: "center" } }],
    [{ text: "Total Liabilities", options: { color: C.black, align: "center" } }, { text: "n/a", options: { color: C.black, align: "center" } }, { text: "93.42", options: { color: C.black, align: "center" } }, { text: "148.78", options: { color: C.black, align: "center" } }],
    [{ text: "Stockholders' Equity", options: { color: C.black, align: "center" } }, { text: "n/a", options: { color: C.black, align: "center" } }, { text: "182.64", options: { color: C.black, align: "center" } }, { text: "217.24", options: { color: C.black, align: "center" } }],
    [{ text: "Long-term Debt", options: { color: C.black, align: "center" } }, { text: "n/a", options: { color: C.black, align: "center" } }, { text: "28.83", options: { color: C.black, align: "center" } }, { text: "58.74", options: { color: C.black, align: "center" } }],
  ];
  s.addTable(apxRows, {
    x: 0.4, y: 1.95, w: 8.3, colW: [3.2, 1.7, 1.7, 1.7],
    rowH: 0.38,
    fontSize: 11, fontFace: "Arial", valign: "middle",
    border: { type: "solid", pt: 0.5, color: C.grayBorder },
  });

  // Sources card
  addRailCard(s, 9.0, 2.4, 3.95, 2.0);
  s.addText("SOURCES", {
    x: 9.25, y: 2.5, w: 3.7, h: 0.3,
    fontSize: 11, fontFace: "Arial", bold: true, color: C.navy,
    charSpacing: 3, valign: "middle", margin: 0,
  });
  s.addText([
    { text: "Meta Platforms Form 10-K (FY2025), filed Jan 29, 2026", options: { bullet: true, breakLine: true } },
    { text: "Company investor relations disclosures", options: { bullet: true, breakLine: true } },
    { text: "Internal valuation models (DCF & relative P/E)", options: { bullet: true } },
  ], {
    x: 9.25, y: 2.85, w: 3.7, h: 1.5,
    fontSize: 10, fontFace: "Arial", color: C.black, valign: "top", paraSpaceAfter: 4,
  });

  // Disclaimer card
  addRailCard(s, 9.0, 4.6, 3.95, 1.6);
  s.addText("DISCLAIMER", {
    x: 9.25, y: 4.7, w: 3.7, h: 0.3,
    fontSize: 11, fontFace: "Arial", bold: true, color: C.navy,
    charSpacing: 3, valign: "middle", margin: 0,
  });
  s.addText(
    "For internal use only. Analyst's view as of April 13, 2026. Forward-looking statements involve risks. Not investment advice.",
    {
      x: 9.25, y: 5.05, w: 3.7, h: 1.1,
      fontSize: 10, fontFace: "Arial", italic: true, color: C.grayMuted, valign: "top",
    }
  );
}

// ---------- save ----------
pres.writeFile({ fileName: "/home/assets/output.pptx" }).then(f => {
  console.log("Saved:", f);
});
