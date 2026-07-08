// Recreate Portfolio_Review_Q1_2026.pptx using pptxgenjs
// Palette: Dark forest green (#1C2A22), Cream (#F1EADA / #F7F1E2), Gold (#C9A95A / #9D7D3B),
// Deep red accent (#8B1E2C), Muted green (#5F7265), Charcoal text on light (#2D3A30)

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 inches - matches 16:9 wide layout
pres.author = "Ashcombe Family Office";
pres.title = "Portfolio Review Q1 2026";

// ===== Color palette =====
const DARK = "1C2A22";        // Dark forest green background
const DARK_ALT = "243329";    // Slightly lighter dark for accent cards
const CREAM = "F1EADA";       // Primary cream (slide 2, 5, 8)
const CREAM_LIGHT = "F7F1E2"; // Lighter cream (slide 3 background)
const GOLD = "B79A68";        // Primary gold
const GOLD_DARK = "9D7D3B";   // Darker gold
const GOLD_DIAMOND = "C9A95A";// Gold for diamond logo
const RED = "8B1E2C";         // Deep red accent
const MUTED_GREEN = "5F7265"; // Muted sage-green
const TEXT_DARK = "1C2A22";   // Dark text on cream
const TEXT_MUTED_DARK = "6B6358"; // Muted text on cream
const TEXT_ON_DARK = "F1EADA";    // Cream text on dark
const TEXT_MUTED_ON_DARK = "A8A08E"; // Muted text on dark
const DIVIDER_LIGHT = "D8CFB8";   // Divider on cream
const DIVIDER_DARK = "3A4A3D";    // Divider on dark

const FONT_HEAD = "Georgia";      // Serif-feeling headers (use Georgia; italic handled by property)
const FONT_SANS = "Calibri";      // Body / sans
const FONT_MONO = "Consolas";

// Slide dimensions
const SLIDE_W = 13.333;
const SLIDE_H = 7.5;

// ============================================================
// Helper: add header (logo + section label) on every slide
// ============================================================
function addHeader(slide, sectionLabel, onDark) {
  const labelColor = onDark ? TEXT_MUTED_ON_DARK : TEXT_MUTED_DARK;
  const brandColor = onDark ? TEXT_ON_DARK : TEXT_DARK;

  // Diamond logo (rotated square)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.62, y: 0.48, w: 0.16, h: 0.16,
    fill: { color: GOLD_DIAMOND },
    line: { color: GOLD_DIAMOND, width: 0 },
    rotate: 45,
  });

  // Brand name
  slide.addText("ASHCOMBE FAMILY OFFICE", {
    x: 0.9, y: 0.42, w: 4, h: 0.3,
    fontFace: FONT_SANS, fontSize: 10.5, bold: true,
    color: brandColor, charSpacing: 4,
    valign: "middle", margin: 0,
  });

  // Section label (top right)
  slide.addText(sectionLabel, {
    x: SLIDE_W - 3.5 - 0.6, y: 0.42, w: 3.5, h: 0.3,
    fontFace: FONT_SANS, fontSize: 10, bold: false,
    color: labelColor, charSpacing: 4,
    align: "right", valign: "middle", margin: 0,
  });
}

// ============================================================
// Helper: add footer with page number
// ============================================================
function addFooter(slide, leftText, pageNum, onDark) {
  const col = onDark ? TEXT_MUTED_ON_DARK : TEXT_MUTED_DARK;
  if (leftText) {
    slide.addText(leftText, {
      x: 0.6, y: SLIDE_H - 0.48, w: 8, h: 0.3,
      fontFace: FONT_SANS, fontSize: 9,
      color: col, charSpacing: 3,
      valign: "middle", margin: 0,
    });
  }
  slide.addText(`0${pageNum} / 08`, {
    x: SLIDE_W - 1.5, y: SLIDE_H - 0.48, w: 0.9, h: 0.3,
    fontFace: FONT_SANS, fontSize: 9,
    color: col, charSpacing: 3,
    align: "right", valign: "middle", margin: 0,
  });
}

// ============================================================
// SLIDE 1 — Cover
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: DARK };

  addHeader(slide, "PRIVATE & CONFIDENTIAL", true);

  // Small eyebrow label
  slide.addText("QUARTERLY REVIEW · Q1 2026", {
    x: 0.6, y: 2.35, w: 6, h: 0.3,
    fontFace: FONT_SANS, fontSize: 11,
    color: GOLD, charSpacing: 4,
    valign: "middle", margin: 0,
  });

  // Main title "Portfolio Review" — "Portfolio" cream, "Review" italic gold
  slide.addText(
    [
      { text: "Portfolio ", options: { color: CREAM, italic: false } },
      { text: "Review", options: { color: GOLD, italic: true } },
    ],
    {
      x: 0.6, y: 2.85, w: 9.3, h: 1.5,
      fontFace: FONT_HEAD, fontSize: 78, bold: false,
      margin: 0, valign: "top",
    }
  );

  // Decorative diamond (geometric line art) on right side
  // Draw concentric rotated squares using LINE shapes
  const cx = 11.4, cy = 3.7;
  // Outer diamond
  const outerSize = 1.3;
  // Create diamond as 4 lines
  function drawDiamond(centerX, centerY, halfSize, color, width) {
    // Top -> Right
    slide.addShape(pres.shapes.LINE, {
      x: centerX, y: centerY - halfSize, w: halfSize, h: halfSize,
      line: { color, width, type: "solid" },
      flipV: false,
    });
    // Right -> Bottom
    slide.addShape(pres.shapes.LINE, {
      x: centerX, y: centerY, w: halfSize, h: halfSize,
      line: { color, width, type: "solid" },
      flipH: true,
    });
    // Bottom -> Left
    slide.addShape(pres.shapes.LINE, {
      x: centerX - halfSize, y: centerY, w: halfSize, h: halfSize,
      line: { color, width, type: "solid" },
    });
    // Left -> Top
    slide.addShape(pres.shapes.LINE, {
      x: centerX - halfSize, y: centerY - halfSize, w: halfSize, h: halfSize,
      line: { color, width, type: "solid" },
      flipH: true,
    });
  }
  drawDiamond(cx, cy, outerSize, GOLD_DARK, 1);
  drawDiamond(cx, cy, outerSize * 0.65, GOLD_DARK, 1);
  drawDiamond(cx, cy, outerSize * 0.35, GOLD_DARK, 1);
  // Horizontal and vertical lines inside
  slide.addShape(pres.shapes.LINE, {
    x: cx - outerSize, y: cy, w: outerSize * 2, h: 0,
    line: { color: GOLD_DARK, width: 0.75 },
  });
  slide.addShape(pres.shapes.LINE, {
    x: cx, y: cy - outerSize, w: 0, h: outerSize * 2,
    line: { color: GOLD_DARK, width: 0.75 },
  });

  // "PREPARED FOR" label
  slide.addText("PREPARED FOR", {
    x: 0.6, y: 5.3, w: 6, h: 0.3,
    fontFace: FONT_SANS, fontSize: 10,
    color: TEXT_MUTED_ON_DARK, charSpacing: 4,
    valign: "middle", margin: 0,
  });

  slide.addText("The Ashcombe Trust — Principal Beneficiaries", {
    x: 0.6, y: 5.65, w: 10, h: 0.5,
    fontFace: FONT_HEAD, fontSize: 22,
    color: CREAM, bold: false,
    valign: "middle", margin: 0,
  });

  // Footer with reporting period
  slide.addText("REPORTING PERIOD · 01 JAN – 31 MAR 2026", {
    x: 0.6, y: SLIDE_H - 0.48, w: 7, h: 0.3,
    fontFace: FONT_SANS, fontSize: 9.5,
    color: TEXT_MUTED_ON_DARK, charSpacing: 4,
    valign: "middle", margin: 0,
  });
  slide.addText("01 / 08", {
    x: SLIDE_W - 1.5, y: SLIDE_H - 0.48, w: 0.9, h: 0.3,
    fontFace: FONT_SANS, fontSize: 9.5,
    color: TEXT_MUTED_ON_DARK, charSpacing: 3,
    align: "right", valign: "middle", margin: 0,
  });
}

// ============================================================
// SLIDE 2 — Investment Mandate
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: CREAM };

  addHeader(slide, "MANDATE", false);

  // Left column: section label + title + divider + body
  slide.addText("SECTION I", {
    x: 0.6, y: 1.85, w: 4, h: 0.3,
    fontFace: FONT_SANS, fontSize: 10.5,
    color: GOLD_DARK, charSpacing: 4,
    valign: "middle", margin: 0,
  });

  // Title — "Investment" regular, "Mandate" italic
  slide.addText(
    [
      { text: "Investment", options: { color: TEXT_DARK, italic: false, breakLine: true } },
      { text: "Mandate", options: { color: TEXT_DARK, italic: true } },
    ],
    {
      x: 0.6, y: 2.3, w: 6, h: 2,
      fontFace: FONT_HEAD, fontSize: 54, bold: false,
      margin: 0, valign: "top", paraSpaceAfter: 0,
    }
  );

  // Thin divider line
  slide.addShape(pres.shapes.LINE, {
    x: 0.6, y: 4.45, w: 0.5, h: 0,
    line: { color: GOLD_DARK, width: 1 },
  });

  // Body paragraph
  slide.addText(
    "Preserve and compound multi-generational capital through a disciplined balance of public equities and investment-grade fixed income, with measured drawdown across market cycles.",
    {
      x: 0.6, y: 4.7, w: 5.3, h: 1.8,
      fontFace: FONT_SANS, fontSize: 14.5,
      color: TEXT_DARK, valign: "top", margin: 0,
      paraSpaceAfter: 0,
    }
  );

  // Right side: 3 rows x 2 columns of key-value info
  const rightStartX = 7.1;
  const col2X = 10.2;
  const rowY = [2.55, 3.85, 5.15];

  const facts = [
    [
      { label: "MANDATE", value: "70 / 30", sub: "Equities / Fixed Income" },
      { label: "HORIZON", value: "Multi-Generational", sub: "25+ year outlook", small: true },
    ],
    [
      { label: "BASE CURRENCY", value: "USD", sub: "Hedged where prudent" },
      { label: "RISK PROFILE", value: "Moderate", sub: "Vol. target ~ 10%" },
    ],
    [
      { label: "BENCHMARK", value: "70 / 30 Blend", sub: "MSCI ACWI · Agg Bond" },
      { label: "LIQUIDITY", value: "T+3", sub: "Fully liquid mandate" },
    ],
  ];

  facts.forEach((row, rIdx) => {
    row.forEach((cell, cIdx) => {
      const x = cIdx === 0 ? rightStartX : col2X;
      const y = rowY[rIdx];
      slide.addText(cell.label, {
        x, y, w: 3.1, h: 0.3,
        fontFace: FONT_SANS, fontSize: 9.5,
        color: TEXT_MUTED_DARK, charSpacing: 4,
        valign: "middle", margin: 0,
      });
      slide.addText(cell.value, {
        x, y: y + 0.32, w: 3.1, h: 0.55,
        fontFace: FONT_HEAD, fontSize: cell.small ? 18 : 22,
        color: TEXT_DARK, valign: "middle", margin: 0,
      });
      slide.addText(cell.sub, {
        x, y: y + 0.9, w: 3.1, h: 0.3,
        fontFace: FONT_SANS, fontSize: 11,
        color: TEXT_MUTED_DARK, valign: "middle", margin: 0,
      });
    });
  });

  addFooter(slide, "ASHCOMBE FAMILY OFFICE · QUARTERLY REVIEW", 2, false);
}

// ============================================================
// SLIDE 3 — Asset Allocation (donut + table)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: CREAM_LIGHT };

  addHeader(slide, "ALLOCATION", false);

  slide.addText("SECTION II", {
    x: 0.6, y: 0.95, w: 4, h: 0.3,
    fontFace: FONT_SANS, fontSize: 10.5,
    color: GOLD_DARK, charSpacing: 4,
    valign: "middle", margin: 0,
  });

  slide.addText("Asset Allocation", {
    x: 0.6, y: 1.3, w: 10, h: 0.95,
    fontFace: FONT_HEAD, fontSize: 48, bold: false,
    color: TEXT_DARK, valign: "top", margin: 0,
  });

  // Donut chart left
  const donutData = [
    {
      name: "Allocation",
      labels: ["Developed Market Equities", "Emerging Market Equities", "Thematic & Private Equities", "Investment-Grade Fixed Income", "Cash & Equivalents"],
      values: [52, 11, 7, 28, 2],
    },
  ];
  slide.addChart(pres.charts.DOUGHNUT, donutData, {
    x: 0.8, y: 2.8, w: 4.2, h: 4.0,
    chartColors: [DARK, RED, GOLD_DARK, GOLD, MUTED_GREEN],
    showLegend: false,
    showPercent: false,
    showValue: false,
    dataLabelColor: "FFFFFF",
    holeSize: 62,
    chartArea: { fill: { color: CREAM_LIGHT } },
    plotArea: { fill: { color: CREAM_LIGHT } },
  });

  // Center text on donut
  slide.addText("$486.2M", {
    x: 1.8, y: 4.45, w: 2.2, h: 0.55,
    fontFace: FONT_HEAD, fontSize: 28,
    color: TEXT_DARK, align: "center", valign: "middle", margin: 0,
  });
  slide.addText("TOTAL AUM", {
    x: 1.8, y: 5.0, w: 2.2, h: 0.3,
    fontFace: FONT_SANS, fontSize: 9,
    color: TEXT_MUTED_DARK, charSpacing: 4,
    align: "center", valign: "middle", margin: 0,
  });

  // Right side table
  const tableX = 5.8;
  const tableW = 6.9;
  const tableTop = 3.0;
  const rowH = 0.66;

  // Column positions
  const colAsset = { x: tableX + 0.15, w: 3.15 };
  const colWeight = { x: tableX + 3.5, w: 0.95 };
  const colTarget = { x: tableX + 4.55, w: 0.95 };
  const colDelta = { x: tableX + 5.55, w: 1.3 };

  // Header row
  slide.addText("ASSET CLASS", {
    x: colAsset.x, y: tableTop, w: colAsset.w, h: 0.35,
    fontFace: FONT_SANS, fontSize: 9.5,
    color: TEXT_MUTED_DARK, charSpacing: 3,
    valign: "middle", margin: 0,
  });
  slide.addText("WEIGHT", {
    x: colWeight.x, y: tableTop, w: colWeight.w, h: 0.35,
    fontFace: FONT_SANS, fontSize: 9.5,
    color: TEXT_MUTED_DARK, charSpacing: 3,
    align: "right", valign: "middle", margin: 0,
  });
  slide.addText("TARGET", {
    x: colTarget.x, y: tableTop, w: colTarget.w, h: 0.35,
    fontFace: FONT_SANS, fontSize: 9.5,
    color: TEXT_MUTED_DARK, charSpacing: 3,
    align: "right", valign: "middle", margin: 0,
  });
  slide.addText("Δ VS. TARGET", {
    x: colDelta.x, y: tableTop, w: colDelta.w, h: 0.35,
    fontFace: FONT_SANS, fontSize: 9.5,
    color: TEXT_MUTED_DARK, charSpacing: 3,
    align: "right", valign: "middle", margin: 0,
  });

  // Divider under header
  slide.addShape(pres.shapes.LINE, {
    x: tableX, y: tableTop + 0.4, w: tableW, h: 0,
    line: { color: DIVIDER_LIGHT, width: 0.75 },
  });

  const rows = [
    ["Developed Market Equities", "52.0%", "50.0%", "+2.0", TEXT_DARK],
    ["Emerging Market Equities", "11.0%", "13.0%", "−2.0", RED],
    ["Thematic & Private Equities", "7.0%", "7.0%", "0.0", TEXT_DARK],
    ["Investment-Grade Fixed Income", "28.0%", "28.0%", "0.0", TEXT_DARK],
    ["Cash & Equivalents", "2.0%", "2.0%", "0.0", TEXT_DARK],
  ];

  rows.forEach((r, i) => {
    const y = tableTop + 0.55 + i * rowH;
    slide.addText(r[0], {
      x: colAsset.x, y, w: colAsset.w, h: rowH - 0.1,
      fontFace: FONT_SANS, fontSize: 14,
      color: TEXT_DARK, valign: "middle", margin: 0,
    });
    slide.addText(r[1], {
      x: colWeight.x, y, w: colWeight.w, h: rowH - 0.1,
      fontFace: FONT_SANS, fontSize: 14,
      color: TEXT_DARK, align: "right", valign: "middle", margin: 0,
    });
    slide.addText(r[2], {
      x: colTarget.x, y, w: colTarget.w, h: rowH - 0.1,
      fontFace: FONT_SANS, fontSize: 14,
      color: TEXT_DARK, align: "right", valign: "middle", margin: 0,
    });
    slide.addText(r[3], {
      x: colDelta.x, y, w: colDelta.w, h: rowH - 0.1,
      fontFace: FONT_SANS, fontSize: 14,
      color: r[4], align: "right", valign: "middle", margin: 0,
    });
    // Row divider line
    slide.addShape(pres.shapes.LINE, {
      x: tableX, y: y + rowH - 0.08, w: tableW, h: 0,
      line: { color: DIVIDER_LIGHT, width: 0.5 },
    });
  });

  addFooter(slide, "AS OF 31 MARCH 2026 · FIGURES IN USD", 3, false);
}

// ============================================================
// SLIDE 4 — Performance vs. Benchmark
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: CREAM };

  addHeader(slide, "PERFORMANCE", false);

  slide.addText("SECTION III", {
    x: 0.6, y: 0.95, w: 4, h: 0.3,
    fontFace: FONT_SANS, fontSize: 10.5,
    color: GOLD_DARK, charSpacing: 4,
    valign: "middle", margin: 0,
  });

  // Title with italic "vs."
  slide.addText(
    [
      { text: "Performance ", options: { italic: false } },
      { text: "vs.", options: { italic: true } },
      { text: " Benchmark", options: { italic: false } },
    ],
    {
      x: 0.6, y: 1.3, w: 11, h: 0.95,
      fontFace: FONT_HEAD, fontSize: 44,
      color: TEXT_DARK, valign: "top", margin: 0,
    }
  );

  // 4 KPI callouts
  const kpis = [
    { label: "QUARTER · NET", value: "+4.82", unit: "%", sub: "vs. Benchmark +3.91%" },
    { label: "YEAR TO DATE", value: "+4.82", unit: "%", sub: "Alpha +91 bps" },
    { label: "1-YEAR", value: "+14.36", unit: "%", sub: "Alpha +112 bps" },
    { label: "5-YEAR · ANN.", value: "+9.74", unit: "%", sub: "Alpha +84 bps" },
  ];

  const kpiY = 2.45;
  const kpiW = 3.0;
  kpis.forEach((k, i) => {
    const x = 0.6 + i * kpiW;
    slide.addText(k.label, {
      x, y: kpiY, w: kpiW - 0.2, h: 0.3,
      fontFace: FONT_SANS, fontSize: 10,
      color: TEXT_MUTED_DARK, charSpacing: 3.5, bold: true,
      valign: "middle", margin: 0,
    });
    // Big number + small %
    slide.addText(
      [
        { text: k.value, options: { fontSize: 44, color: TEXT_DARK } },
        { text: " " + k.unit, options: { fontSize: 20, color: TEXT_DARK } },
      ],
      {
        x, y: kpiY + 0.35, w: kpiW - 0.2, h: 0.85,
        fontFace: FONT_HEAD, valign: "middle", margin: 0,
      }
    );
    slide.addText(k.sub, {
      x, y: kpiY + 1.2, w: kpiW - 0.2, h: 0.3,
      fontFace: FONT_SANS, fontSize: 11,
      color: TEXT_MUTED_DARK, valign: "middle", margin: 0,
    });
  });

  // Horizontal divider under KPIs
  slide.addShape(pres.shapes.LINE, {
    x: 0.6, y: 4.2, w: SLIDE_W - 1.2, h: 0,
    line: { color: DIVIDER_LIGHT, width: 0.75 },
  });

  // Chart label
  slide.addText("CUMULATIVE RETURN · TRAILING 12 MONTHS (INDEXED TO 100)", {
    x: 0.6, y: 4.3, w: 8, h: 0.3,
    fontFace: FONT_SANS, fontSize: 10,
    color: TEXT_MUTED_DARK, charSpacing: 3.5,
    valign: "middle", margin: 0,
  });

  // Line chart (trailing 12m)
  const months = ["APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC", "JAN", "FEB", "MAR"];
  const portfolio = [100, 101.8, 104.2, 103.5, 103.0, 105.8, 107.5, 109.0, 110.2, 111.5, 112.8, 114.4];
  const benchmark = [100, 101.2, 103.0, 102.8, 102.5, 104.5, 106.0, 107.5, 108.8, 110.0, 111.4, 113.3];

  slide.addChart(
    pres.charts.LINE,
    [
      { name: "Portfolio", labels: months, values: portfolio },
      { name: "70/30 Benchmark", labels: months, values: benchmark },
    ],
    {
      x: 0.6, y: 4.7, w: 8.8, h: 2.2,
      chartColors: [TEXT_DARK, GOLD],
      lineSize: 2.5,
      lineSmooth: false,
      lineDataSymbol: "none",
      showLegend: true,
      legendPos: "b",
      legendFontSize: 10,
      legendColor: TEXT_MUTED_DARK,
      catAxisLabelColor: TEXT_MUTED_DARK,
      catAxisLabelFontSize: 9,
      catAxisLabelFontFace: FONT_HEAD,
      valAxisHidden: true,
      valGridLine: { color: DIVIDER_LIGHT, size: 0.5 },
      catGridLine: { style: "none" },
      chartArea: { fill: { color: CREAM } },
      plotArea: { fill: { color: CREAM } },
      showValue: false,
      // Dashed benchmark line
      lineDash: "solid",
    }
  );

  // Right side: Risk-adjusted metrics
  const rightX = 9.9;
  const rightW = 2.9;
  slide.addText("RISK-ADJUSTED METRICS", {
    x: rightX, y: 4.3, w: rightW, h: 0.3,
    fontFace: FONT_SANS, fontSize: 10,
    color: TEXT_MUTED_DARK, charSpacing: 3.5,
    valign: "middle", margin: 0,
  });

  const metrics = [
    ["Volatility", "9.8%"],
    ["Sharpe Ratio", "0.84"],
    ["Max Drawdown", "−6.2%"],
    ["Beta", "0.92"],
    ["Tracking Error", "1.4%"],
  ];
  const metY = 4.7;
  const metRowH = 0.42;
  metrics.forEach((m, i) => {
    const y = metY + i * metRowH;
    slide.addText(m[0], {
      x: rightX, y, w: rightW * 0.6, h: metRowH,
      fontFace: FONT_SANS, fontSize: 12,
      color: TEXT_DARK, valign: "middle", margin: 0,
    });
    slide.addText(m[1], {
      x: rightX + rightW * 0.55, y, w: rightW * 0.45, h: metRowH,
      fontFace: FONT_SANS, fontSize: 12,
      color: TEXT_DARK, align: "right", valign: "middle", margin: 0,
    });
    // Divider under each
    slide.addShape(pres.shapes.LINE, {
      x: rightX, y: y + metRowH - 0.02, w: rightW, h: 0,
      line: { color: DIVIDER_LIGHT, width: 0.4 },
    });
  });

  addFooter(slide, "NET OF FEES · USD · BENCHMARK: 70% MSCI ACWI / 30% BLOOMBERG GLOBAL AGG", 4, false);
}

// ============================================================
// SLIDE 5 — Equity Sector Exposure
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: CREAM };

  addHeader(slide, "SECTOR EXPOSURE", false);

  slide.addText("SECTION IV", {
    x: 0.6, y: 0.95, w: 4, h: 0.3,
    fontFace: FONT_SANS, fontSize: 10.5,
    color: GOLD_DARK, charSpacing: 4,
    valign: "middle", margin: 0,
  });

  slide.addText("Equity Sector Exposure", {
    x: 0.6, y: 1.3, w: 10, h: 0.95,
    fontFace: FONT_HEAD, fontSize: 44,
    color: TEXT_DARK, valign: "top", margin: 0,
  });

  // Left: sector weights list
  slide.addText("WEIGHTS · PORTFOLIO VS. MSCI ACWI", {
    x: 0.6, y: 2.5, w: 6, h: 0.3,
    fontFace: FONT_SANS, fontSize: 10,
    color: TEXT_MUTED_DARK, charSpacing: 3.5,
    valign: "middle", margin: 0,
  });

  const sectors = [
    ["Information Tech.", "24.0", "23.0"],
    ["Financials", "18.0", "16.0"],
    ["Healthcare", "14.0", "12.0"],
    ["Industrials", "12.0", "11.0"],
    ["Consumer Disc.", "10.0", "11.0"],
    ["Consumer Staples", "8.0", "7.0"],
    ["Energy", "6.0", "8.0"],
    ["Communication", "5.0", "7.0"],
    ["Utilities & Other", "3.0", "5.0"],
  ];

  const secY = 2.95;
  const secRowH = 0.38;
  const secLeftX = 0.6;
  const secValueX = 4.8;
  sectors.forEach((s, i) => {
    const y = secY + i * secRowH;
    slide.addText(s[0], {
      x: secLeftX, y, w: 3.8, h: secRowH,
      fontFace: FONT_SANS, fontSize: 13,
      color: TEXT_DARK, valign: "middle", margin: 0,
    });
    // Portfolio (bold dark) / Benchmark (muted)
    slide.addText(
      [
        { text: s[1], options: { bold: true, color: TEXT_DARK } },
        { text: " / ", options: { color: TEXT_MUTED_DARK } },
        { text: s[2], options: { color: TEXT_MUTED_DARK } },
      ],
      {
        x: secValueX, y, w: 1.5, h: secRowH,
        fontFace: FONT_SANS, fontSize: 13,
        align: "right", valign: "middle", margin: 0,
      }
    );
  });

  // Legend
  const legendY = secY + sectors.length * secRowH + 0.15;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: secLeftX, y: legendY + 0.08, w: 0.28, h: 0.1,
    fill: { color: TEXT_DARK }, line: { color: TEXT_DARK, width: 0 },
  });
  slide.addText("Portfolio", {
    x: secLeftX + 0.35, y: legendY, w: 1, h: 0.28,
    fontFace: FONT_SANS, fontSize: 10,
    color: TEXT_DARK, valign: "middle", margin: 0,
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: secLeftX + 1.5, y: legendY + 0.08, w: 0.28, h: 0.1,
    fill: { color: GOLD }, line: { color: GOLD, width: 0 },
  });
  slide.addText("Benchmark", {
    x: secLeftX + 1.85, y: legendY, w: 1.2, h: 0.28,
    fontFace: FONT_SANS, fontSize: 10,
    color: TEXT_DARK, valign: "middle", margin: 0,
  });

  // Right: Regional breakdown
  const regionX = 7.6;
  const regionW = 5.2;
  slide.addText("REGIONAL BREAKDOWN", {
    x: regionX, y: 2.5, w: regionW, h: 0.3,
    fontFace: FONT_SANS, fontSize: 10,
    color: TEXT_MUTED_DARK, charSpacing: 3.5,
    valign: "middle", margin: 0,
  });

  const regions = [
    ["North America", "58.0%"],
    ["Europe (ex. UK)", "16.0%"],
    ["United Kingdom", "6.0%"],
    ["Japan", "7.0%"],
    ["Asia ex-Japan", "9.0%"],
    ["Rest of World", "4.0%"],
  ];

  const regY = 2.9;
  const regRowH = 0.5;
  regions.forEach((r, i) => {
    const y = regY + i * regRowH;
    slide.addText(r[0], {
      x: regionX, y, w: regionW * 0.6, h: regRowH,
      fontFace: FONT_SANS, fontSize: 14,
      color: TEXT_DARK, valign: "middle", margin: 0,
    });
    slide.addText(r[1], {
      x: regionX + regionW * 0.55, y, w: regionW * 0.45, h: regRowH,
      fontFace: FONT_SANS, fontSize: 14,
      color: TEXT_DARK, align: "right", valign: "middle", margin: 0,
    });
    slide.addShape(pres.shapes.LINE, {
      x: regionX, y: y + regRowH - 0.02, w: regionW, h: 0,
      line: { color: DIVIDER_LIGHT, width: 0.4 },
    });
  });

  // Active tilts callout card at bottom right
  const cardY = regY + regions.length * regRowH + 0.2;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: regionX, y: cardY, w: regionW, h: 1.15,
    fill: { color: CREAM_LIGHT }, line: { color: CREAM_LIGHT, width: 0 },
  });
  // Left accent bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: regionX, y: cardY, w: 0.06, h: 1.15,
    fill: { color: RED }, line: { color: RED, width: 0 },
  });
  slide.addText("ACTIVE TILTS", {
    x: regionX + 0.25, y: cardY + 0.15, w: regionW - 0.4, h: 0.3,
    fontFace: FONT_SANS, fontSize: 10,
    color: RED, charSpacing: 3.5, bold: true,
    valign: "middle", margin: 0,
  });
  slide.addText(
    "Overweight Technology and Healthcare; modest underweight in Energy and Communication Services reflects valuation discipline.",
    {
      x: regionX + 0.25, y: cardY + 0.48, w: regionW - 0.4, h: 0.65,
      fontFace: FONT_SANS, fontSize: 12,
      color: TEXT_DARK, valign: "top", margin: 0,
    }
  );

  addFooter(slide, "EQUITY SLEEVE ONLY · 70% OF TOTAL PORTFOLIO", 5, false);
}

// ============================================================
// SLIDE 6 — Ten Largest Holdings
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: CREAM };

  addHeader(slide, "HOLDINGS", false);

  slide.addText("SECTION V", {
    x: 0.6, y: 0.95, w: 4, h: 0.3,
    fontFace: FONT_SANS, fontSize: 10.5,
    color: GOLD_DARK, charSpacing: 4,
    valign: "middle", margin: 0,
  });

  slide.addText("Ten Largest Holdings", {
    x: 0.6, y: 1.3, w: 10, h: 0.95,
    fontFace: FONT_HEAD, fontSize: 44,
    color: TEXT_DARK, valign: "top", margin: 0,
  });

  // Left holdings table
  const holdingsX = 0.6;
  const colNum = { x: holdingsX, w: 0.45 };
  const colName = { x: holdingsX + 0.45, w: 2.4 };
  const colSec = { x: holdingsX + 2.85, w: 1.8 };
  const colWt = { x: holdingsX + 4.65, w: 0.9 };
  const colQTD = { x: holdingsX + 5.55, w: 0.9 };

  const headerY = 2.55;

  slide.addText("#", {
    x: colNum.x, y: headerY, w: colNum.w, h: 0.35,
    fontFace: FONT_SANS, fontSize: 10,
    color: TEXT_MUTED_DARK, charSpacing: 3,
    valign: "middle", margin: 0,
  });
  slide.addText("HOLDING", {
    x: colName.x, y: headerY, w: colName.w, h: 0.35,
    fontFace: FONT_SANS, fontSize: 10,
    color: TEXT_MUTED_DARK, charSpacing: 3,
    valign: "middle", margin: 0,
  });
  slide.addText("SECTOR", {
    x: colSec.x, y: headerY, w: colSec.w, h: 0.35,
    fontFace: FONT_SANS, fontSize: 10,
    color: TEXT_MUTED_DARK, charSpacing: 3,
    valign: "middle", margin: 0,
  });
  slide.addText("WEIGHT", {
    x: colWt.x, y: headerY, w: colWt.w, h: 0.35,
    fontFace: FONT_SANS, fontSize: 10,
    color: TEXT_MUTED_DARK, charSpacing: 3,
    align: "right", valign: "middle", margin: 0,
  });
  slide.addText("QTD", {
    x: colQTD.x, y: headerY, w: colQTD.w, h: 0.35,
    fontFace: FONT_SANS, fontSize: 10,
    color: TEXT_MUTED_DARK, charSpacing: 3,
    align: "right", valign: "middle", margin: 0,
  });

  slide.addShape(pres.shapes.LINE, {
    x: holdingsX, y: headerY + 0.38, w: 5.85, h: 0,
    line: { color: DIVIDER_LIGHT, width: 0.6 },
  });

  const holdings = [
    ["01", "Microsoft Corp.", "Technology", "4.8%", "+8.2%", TEXT_DARK],
    ["02", "Nestlé S.A.", "Staples", "3.6%", "+3.1%", TEXT_DARK],
    ["03", "Berkshire Hathaway", "Financials", "3.4%", "+6.4%", TEXT_DARK],
    ["04", "ASML Holding N.V.", "Technology", "3.1%", "+11.7%", TEXT_DARK],
    ["05", "Johnson & Johnson", "Healthcare", "2.9%", "+2.4%", TEXT_DARK],
    ["06", "LVMH Moët Hennessy", "Consumer Disc.", "2.7%", "+5.8%", TEXT_DARK],
    ["07", "Visa Inc.", "Financials", "2.5%", "+4.9%", TEXT_DARK],
    ["08", "TSMC", "Technology", "2.3%", "+9.6%", TEXT_DARK],
    ["09", "Roche Holding AG", "Healthcare", "2.1%", "−1.8%", RED],
    ["10", "UnitedHealth Group", "Healthcare", "2.0%", "+3.6%", TEXT_DARK],
  ];

  const hRowY = 3.05;
  const hRowH = 0.4;
  holdings.forEach((h, i) => {
    const y = hRowY + i * hRowH;
    slide.addText(h[0], {
      x: colNum.x, y, w: colNum.w, h: hRowH,
      fontFace: FONT_SANS, fontSize: 12,
      color: TEXT_MUTED_DARK, valign: "middle", margin: 0,
    });
    slide.addText(h[1], {
      x: colName.x, y, w: colName.w, h: hRowH,
      fontFace: FONT_SANS, fontSize: 12, bold: true,
      color: TEXT_DARK, valign: "middle", margin: 0,
    });
    slide.addText(h[2], {
      x: colSec.x, y, w: colSec.w, h: hRowH,
      fontFace: FONT_SANS, fontSize: 12,
      color: TEXT_MUTED_DARK, valign: "middle", margin: 0,
    });
    slide.addText(h[3], {
      x: colWt.x, y, w: colWt.w, h: hRowH,
      fontFace: FONT_SANS, fontSize: 12,
      color: TEXT_DARK, align: "right", valign: "middle", margin: 0,
    });
    slide.addText(h[4], {
      x: colQTD.x, y, w: colQTD.w, h: hRowH,
      fontFace: FONT_SANS, fontSize: 12,
      color: h[5], align: "right", valign: "middle", margin: 0,
    });
    slide.addShape(pres.shapes.LINE, {
      x: holdingsX, y: y + hRowH - 0.01, w: 5.85, h: 0,
      line: { color: DIVIDER_LIGHT, width: 0.3 },
    });
  });

  // Right side — 3 stat callouts
  const statsX = 8.2;
  const stats = [
    { label: "TOP 10 CONCENTRATION", value: "29.4", unit: "%", sub: "of total portfolio" },
    { label: "NUMBER OF POSITIONS", value: "148", unit: "", sub: "across equities & fixed income" },
    { label: "AVG. HOLDING TENURE", value: "6.2", unit: "yrs", sub: "long-term ownership orientation" },
  ];

  stats.forEach((s, i) => {
    const y = 2.55 + i * 1.45;
    slide.addText(s.label, {
      x: statsX, y, w: 4.5, h: 0.28,
      fontFace: FONT_SANS, fontSize: 10,
      color: TEXT_MUTED_DARK, charSpacing: 3.5, bold: true,
      valign: "middle", margin: 0,
    });
    slide.addText(
      [
        { text: s.value, options: { fontSize: 48, color: TEXT_DARK } },
        { text: s.unit ? " " + s.unit : "", options: { fontSize: 20, color: TEXT_DARK } },
      ],
      {
        x: statsX, y: y + 0.3, w: 4.5, h: 0.82,
        fontFace: FONT_HEAD, valign: "middle", margin: 0,
      }
    );
    slide.addText(s.sub, {
      x: statsX, y: y + 1.12, w: 4.5, h: 0.3,
      fontFace: FONT_SANS, fontSize: 11,
      color: TEXT_MUTED_DARK, valign: "middle", margin: 0,
    });
  });

  addFooter(slide, "EQUITY HOLDINGS · WEIGHTS AS A PERCENTAGE OF TOTAL PORTFOLIO", 6, false);
}

// ============================================================
// SLIDE 7 — Fixed Income Composition (dark theme)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: DARK };

  addHeader(slide, "FIXED INCOME", true);

  slide.addText("SECTION VI", {
    x: 0.6, y: 0.95, w: 4, h: 0.3,
    fontFace: FONT_SANS, fontSize: 10.5,
    color: GOLD, charSpacing: 4,
    valign: "middle", margin: 0,
  });

  // Title — "Fixed Income" cream, "Composition" italic gold
  slide.addText(
    [
      { text: "Fixed Income ", options: { color: CREAM, italic: false } },
      { text: "Composition", options: { color: GOLD, italic: true } },
    ],
    {
      x: 0.6, y: 1.3, w: 11, h: 0.95,
      fontFace: FONT_HEAD, fontSize: 44,
      valign: "top", margin: 0,
    }
  );

  // === Left column ===
  // Credit quality distribution — horizontal stacked segmented bar
  slide.addText("CREDIT QUALITY DISTRIBUTION", {
    x: 0.6, y: 2.55, w: 6, h: 0.3,
    fontFace: FONT_SANS, fontSize: 10,
    color: TEXT_MUTED_ON_DARK, charSpacing: 3.5,
    valign: "middle", margin: 0,
  });

  // Stacked horizontal bar: 42, 28, 18, 9, 3 (total 100)
  const creditTotal = 100;
  const creditX = 0.6;
  const creditY = 2.95;
  const creditW = 6.2;
  const creditH = 0.55;
  const creditData = [
    { val: 42, color: CREAM, label: "42%", labelColor: TEXT_DARK, letter: "AAA" },
    { val: 28, color: GOLD, label: "28%", labelColor: TEXT_DARK, letter: "AA" },
    { val: 18, color: GOLD_DARK, label: "18%", labelColor: CREAM, letter: "A" },
    { val: 9, color: "6B6458", label: "9%", labelColor: CREAM, letter: "BBB" },
    { val: 3, color: RED, label: "3%", labelColor: CREAM, letter: "BB" },
  ];
  let offsetX = creditX;
  creditData.forEach((c) => {
    const segW = (c.val / creditTotal) * creditW;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: offsetX, y: creditY, w: segW, h: creditH,
      fill: { color: c.color }, line: { color: c.color, width: 0 },
    });
    slide.addText(c.label, {
      x: offsetX, y: creditY, w: segW, h: creditH,
      fontFace: FONT_SANS, fontSize: c.val < 5 ? 9 : 11,
      color: c.labelColor, align: "center", valign: "middle",
      margin: 0, bold: false,
    });
    // Letter label below segment
    slide.addText(c.letter, {
      x: offsetX, y: creditY + creditH + 0.1, w: segW, h: 0.28,
      fontFace: FONT_SANS, fontSize: 9.5,
      color: TEXT_MUTED_ON_DARK, charSpacing: 3,
      align: "center", valign: "top", margin: 0,
    });
    offsetX += segW;
  });

  // Maturity profile — bar chart
  slide.addText("MATURITY PROFILE", {
    x: 0.6, y: 4.2, w: 6, h: 0.3,
    fontFace: FONT_SANS, fontSize: 10,
    color: TEXT_MUTED_ON_DARK, charSpacing: 3.5,
    valign: "middle", margin: 0,
  });

  // Bar chart values (visually: one bar stands out taller, highlighted cream — 3-5Y)
  // From image: 0-1Y short, 1-3Y medium, 3-5Y tallest (cream), 5-7Y large (gold), 7-10Y med, 10Y+ short (dark gold)
  const matLabels = ["0–1Y", "1–3Y", "3–5Y", "5–7Y", "7–10Y", "10Y+"];
  const matValues = [8, 18, 28, 22, 15, 9];
  // Use chart with per-data-point colors via multiple single-value "series"? Simpler: one series, chartColors per bar
  slide.addChart(
    pres.charts.BAR,
    [{ name: "Maturity", labels: matLabels, values: matValues }],
    {
      x: 0.6, y: 4.55, w: 6.2, h: 2.1,
      barDir: "col",
      chartColors: [GOLD, GOLD, CREAM, GOLD, GOLD, GOLD_DARK],
      chartColorsOpacity: 100,
      showLegend: false,
      showValue: false,
      barGapWidthPct: 40,
      catAxisLabelColor: TEXT_MUTED_ON_DARK,
      catAxisLabelFontSize: 9.5,
      catAxisLabelFontFace: FONT_SANS,
      valAxisHidden: true,
      valGridLine: { style: "none" },
      catGridLine: { style: "none" },
      chartArea: { fill: { color: DARK }, border: { pt: 0, color: DARK } },
      plotArea: { fill: { color: DARK }, border: { pt: 0, color: DARK } },
      // Try per-bar coloring via series option
      barColors: true,
    }
  );

  // === Right column: Composition by type ===
  const typeX = 7.5;
  const typeW = 5.3;
  slide.addText("COMPOSITION BY TYPE", {
    x: typeX, y: 2.55, w: typeW, h: 0.3,
    fontFace: FONT_SANS, fontSize: 10,
    color: TEXT_MUTED_ON_DARK, charSpacing: 3.5,
    valign: "middle", margin: 0,
  });

  const types = [
    ["US Treasuries", "38.0%"],
    ["Investment-Grade Corporates", "29.0%"],
    ["Agency & Securitised", "14.0%"],
    ["Sovereign & Supranational", "11.0%"],
    ["Municipal (Tax-Exempt)", "6.0%"],
    ["Emerging Market Debt", "2.0%"],
  ];
  const typeY = 2.95;
  const typeRowH = 0.47;
  types.forEach((t, i) => {
    const y = typeY + i * typeRowH;
    slide.addText(t[0], {
      x: typeX, y, w: typeW * 0.7, h: typeRowH,
      fontFace: FONT_SANS, fontSize: 13.5,
      color: CREAM, valign: "middle", margin: 0,
    });
    slide.addText(t[1], {
      x: typeX + typeW * 0.6, y, w: typeW * 0.4, h: typeRowH,
      fontFace: FONT_SANS, fontSize: 13.5,
      color: CREAM, align: "right", valign: "middle", margin: 0,
    });
    slide.addShape(pres.shapes.LINE, {
      x: typeX, y: y + typeRowH - 0.02, w: typeW, h: 0,
      line: { color: DIVIDER_DARK, width: 0.4 },
    });
  });

  // Two bottom-right stats: Avg duration & yield to maturity
  const twoY = 5.95;
  slide.addText("AVG. DURATION", {
    x: typeX, y: twoY, w: typeW / 2 - 0.2, h: 0.25,
    fontFace: FONT_SANS, fontSize: 10,
    color: TEXT_MUTED_ON_DARK, charSpacing: 3.5,
    valign: "middle", margin: 0,
  });
  slide.addText(
    [
      { text: "4.8", options: { fontSize: 40, color: CREAM } },
      { text: "  yrs", options: { fontSize: 16, color: TEXT_MUTED_ON_DARK } },
    ],
    {
      x: typeX, y: twoY + 0.3, w: typeW / 2 - 0.2, h: 0.75,
      fontFace: FONT_HEAD, valign: "middle", margin: 0,
    }
  );

  slide.addText("YIELD TO MATURITY", {
    x: typeX + typeW / 2, y: twoY, w: typeW / 2 - 0.2, h: 0.25,
    fontFace: FONT_SANS, fontSize: 10,
    color: TEXT_MUTED_ON_DARK, charSpacing: 3.5,
    valign: "middle", margin: 0,
  });
  slide.addText(
    [
      { text: "4.62", options: { fontSize: 40, color: CREAM } },
      { text: "  %", options: { fontSize: 16, color: TEXT_MUTED_ON_DARK } },
    ],
    {
      x: typeX + typeW / 2, y: twoY + 0.3, w: typeW / 2 - 0.2, h: 0.75,
      fontFace: FONT_HEAD, valign: "middle", margin: 0,
    }
  );

  addFooter(slide, "FIXED INCOME SLEEVE · 30% OF TOTAL PORTFOLIO", 7, true);
}

// ============================================================
// SLIDE 8 — Outlook & Next Steps
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: CREAM };

  addHeader(slide, "OUTLOOK", false);

  slide.addText("SECTION VII", {
    x: 0.6, y: 0.95, w: 4, h: 0.3,
    fontFace: FONT_SANS, fontSize: 10.5,
    color: GOLD_DARK, charSpacing: 4,
    valign: "middle", margin: 0,
  });

  slide.addText("Outlook & Next Steps", {
    x: 0.6, y: 1.3, w: 10, h: 0.95,
    fontFace: FONT_HEAD, fontSize: 44,
    color: TEXT_DARK, valign: "top", margin: 0,
  });

  // Three columns: Market View | Proposed Actions | Governance (dark card)
  const col1X = 0.6, col1W = 4.0;
  const col2X = 5.0, col2W = 4.0;
  const col3X = 9.2, col3W = 3.7;

  // === Col 1: Market View ===
  slide.addText("MARKET VIEW", {
    x: col1X, y: 2.5, w: col1W, h: 0.3,
    fontFace: FONT_SANS, fontSize: 10,
    color: RED, charSpacing: 3.5, bold: true,
    valign: "middle", margin: 0,
  });
  slide.addText(
    "Dispersion across regions and styles is widening. We expect a constructive but uneven equity backdrop, with rates plateauing through year-end.",
    {
      x: col1X, y: 2.88, w: col1W, h: 1.3,
      fontFace: FONT_SANS, fontSize: 13.5,
      color: TEXT_DARK, valign: "top", margin: 0, paraSpaceAfter: 0,
    }
  );
  // Divider
  slide.addShape(pres.shapes.LINE, {
    x: col1X, y: 4.35, w: col1W - 0.3, h: 0,
    line: { color: DIVIDER_LIGHT, width: 0.6 },
  });
  // Bullet sub-list (no actual bullets — just lines, from the original)
  slide.addText(
    [
      { text: "Earnings resilient in mega-cap tech", options: { breakLine: true } },
      { text: "Credit spreads tight; quality bias warranted", options: { breakLine: true } },
      { text: "EM FX headwinds easing into H2", options: {} },
    ],
    {
      x: col1X, y: 4.55, w: col1W, h: 1.3,
      fontFace: FONT_SANS, fontSize: 12.5,
      color: TEXT_DARK, valign: "top", margin: 0, paraSpaceAfter: 4,
    }
  );

  // === Col 2: Proposed Actions ===
  slide.addText("PROPOSED ACTIONS", {
    x: col2X, y: 2.5, w: col2W, h: 0.3,
    fontFace: FONT_SANS, fontSize: 10,
    color: RED, charSpacing: 3.5, bold: true,
    valign: "middle", margin: 0,
  });

  const actions = [
    ["01", "Rebalance EM equities back to 13% target"],
    ["02", "Extend duration modestly to 5.2 yrs"],
    ["03", "Trim two single-name tech positions for tax efficiency"],
    ["04", "Initiate 2% allocation to municipals for after-tax yield"],
  ];
  actions.forEach((a, i) => {
    const y = 2.88 + i * 0.95;
    slide.addText(a[0], {
      x: col2X, y, w: col2W, h: 0.28,
      fontFace: FONT_SANS, fontSize: 10,
      color: TEXT_MUTED_DARK, charSpacing: 3.5,
      valign: "middle", margin: 0,
    });
    slide.addText(a[1], {
      x: col2X, y: y + 0.3, w: col2W - 0.2, h: 0.6,
      fontFace: FONT_SANS, fontSize: 14, bold: true,
      color: TEXT_DARK, valign: "top", margin: 0,
    });
  });

  // === Col 3: Governance (dark card) ===
  slide.addText("GOVERNANCE", {
    x: col3X, y: 2.5, w: col3W, h: 0.3,
    fontFace: FONT_SANS, fontSize: 10,
    color: RED, charSpacing: 3.5, bold: true,
    valign: "middle", margin: 0,
  });

  // Dark card
  slide.addShape(pres.shapes.RECTANGLE, {
    x: col3X, y: 2.88, w: col3W, h: 4.1,
    fill: { color: DARK }, line: { color: DARK, width: 0 },
  });

  // Quote
  slide.addText(
    "“Capital preserved through cycles is capital that compounds for the next generation.”",
    {
      x: col3X + 0.3, y: 3.05, w: col3W - 0.6, h: 1.3,
      fontFace: FONT_HEAD, fontSize: 14.5, italic: false,
      color: CREAM, valign: "top", margin: 0, paraSpaceAfter: 0,
    }
  );

  // Divider
  slide.addShape(pres.shapes.LINE, {
    x: col3X + 0.3, y: 4.55, w: col3W - 0.6, h: 0,
    line: { color: DIVIDER_DARK, width: 0.6 },
  });

  // Next review
  slide.addText("NEXT REVIEW", {
    x: col3X + 0.3, y: 4.7, w: col3W - 0.6, h: 0.28,
    fontFace: FONT_SANS, fontSize: 10,
    color: TEXT_MUTED_ON_DARK, charSpacing: 3.5, bold: true,
    valign: "middle", margin: 0,
  });
  slide.addText("14 July 2026", {
    x: col3X + 0.3, y: 5.0, w: col3W - 0.6, h: 0.45,
    fontFace: FONT_HEAD, fontSize: 20,
    color: CREAM, valign: "middle", margin: 0,
  });
  slide.addText("Q2 Review · Ashcombe Estate", {
    x: col3X + 0.3, y: 5.45, w: col3W - 0.6, h: 0.28,
    fontFace: FONT_SANS, fontSize: 11,
    color: TEXT_MUTED_ON_DARK, valign: "middle", margin: 0,
  });

  // Contact
  slide.addText("CONTACT", {
    x: col3X + 0.3, y: 5.95, w: col3W - 0.6, h: 0.28,
    fontFace: FONT_SANS, fontSize: 10,
    color: TEXT_MUTED_ON_DARK, charSpacing: 3.5, bold: true,
    valign: "middle", margin: 0,
  });
  slide.addText(
    [
      { text: "Eleanor Whitcomb, CFA", options: { bold: true, color: CREAM } },
      { text: "  Chief Investment Officer", options: { color: TEXT_MUTED_ON_DARK } },
    ],
    {
      x: col3X + 0.3, y: 6.25, w: col3W - 0.6, h: 0.7,
      fontFace: FONT_SANS, fontSize: 12.5,
      valign: "top", margin: 0,
    }
  );

  addFooter(slide, "ASHCOMBE FAMILY OFFICE · PRIVATE & CONFIDENTIAL", 8, false);
}

// ============================================================
// Write file
// ============================================================
pres.writeFile({ fileName: "Portfolio_Review_Q1_2026.pptx" })
  .then(fileName => console.log(`Saved: ${fileName}`))
  .catch(err => { console.error(err); process.exit(1); });
