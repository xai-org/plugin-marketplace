// AI_Stocks_revised.js
// Recreates the "AI Stocks: Risk-Reward Investment Analysis" deck.
//
// Usage:
//   npm install pptxgenjs
//   node AI_Stocks_revised.js
//
// Outputs: AI_Stocks_revised.pptx in the current directory.

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10 x 5.625 in
pres.author = "Portfolio Strategy Research";
pres.title = "AI Stocks: Risk-Reward Investment Analysis";

// ---------------------------------------------------------------------------
// Design tokens
// ---------------------------------------------------------------------------
const C = {
  navy:       "0A1628",
  bg:         "F0F4F8",
  teal:       "0D9488",
  tealLight:  "5EEAD4",
  tealMint:   "99F6E4",
  white:      "FFFFFF",
  slate:      "1E293B",
  slateMid:   "475569",
  slateLight: "94A3B8",
  divider:    "CBD5E1",
  rowAlt:     "E2E8F0",
  // accent palette for stocks / bars
  amber:  "F59E0B",
  blue:   "3B82F6",
  purple: "A78BFA",
  pink:   "EC4899",
  gray:   "94A3B8",
  red:    "EF4444",
  green:  "10B981",
};

const F = { serif: "Georgia", sans: "Calibri" };

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function headerBar(slide) {
  slide.background = { color: C.bg };
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.0,
    fill: { color: C.navy }, line: { color: C.navy, width: 0 },
  });
}

function title(slide, text, opts = {}) {
  slide.addText(text, {
    x: 0.55, y: 0.15, w: 9.0, h: 0.70,
    fontSize: opts.size || 32, bold: true, color: C.white,
    fontFace: F.serif, align: "left", valign: "middle", margin: 0,
  });
}

function source(slide, text) {
  slide.addText(text, {
    x: 0.55, y: 5.20, w: 9.0, h: 0.32,
    fontSize: 10, italic: true, color: C.slateMid,
    fontFace: F.sans, margin: 0,
  });
}

// ===========================================================================
// SLIDE 1 — Title
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  // Decorative offset circles on the right
  s.addShape(pres.shapes.OVAL, {
    x: 6.8, y: -1.0, w: 5.0, h: 5.0,
    fill: { color: "0F2A3F", transparency: 30 },
    line: { color: C.navy, width: 0 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 7.5, y: 0.2, w: 3.5, h: 3.5,
    fill: { color: "143850", transparency: 20 },
    line: { color: C.navy, width: 0 },
  });

  s.addText("AI Stocks", {
    x: 0.7, y: 1.55, w: 8, h: 1.1,
    fontSize: 60, bold: true, color: C.white,
    fontFace: F.serif, margin: 0,
  });
  s.addText("Risk-Reward Investment Analysis", {
    x: 0.7, y: 2.65, w: 8, h: 0.55,
    fontSize: 24, color: C.tealLight, fontFace: F.sans, margin: 0,
  });
  s.addText(
    "PLACEHOLDER",
    { x: 0.7, y: 3.45, w: 8, h: 0.45, fontSize: 14, color: C.slateLight, fontFace: F.sans, margin: 0 }
  );

  // Bottom teal footer bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.10, w: 10, h: 0.53,
    fill: { color: C.teal }, line: { color: C.teal, width: 0 },
  });
  s.addText("April 2026  |  Portfolio Strategy Research", {
    x: 0.55, y: 5.15, w: 9, h: 0.45,
    fontSize: 13, color: C.white, fontFace: F.sans, valign: "middle", margin: 0,
  });
}

// ===========================================================================
// SLIDE 2 — AI Stock Basket: ranked horizontal bar list
// ===========================================================================
{
  const s = pres.addSlide();
  headerBar(s);
  title(s, "The AI Stock Basket");

  s.addText("8 mega-cap names · equal-risk-contribution weighted", {
    x: 0.55, y: 1.10, w: 9.0, h: 0.35,
    fontSize: 14, italic: true, color: C.slateMid, fontFace: F.sans, margin: 0,
  });

  const stocks = [
    ["NVDA",  25, C.teal],
    ["MSFT",  20, "14B8A6"],
    ["GOOGL", 15, C.tealLight],
    ["META",  12, C.amber],
    ["AMZN",  10, C.blue],
    ["AVGO",   8, C.purple],
    ["PLTR",   5, C.pink],
    ["AMD",    5, C.gray],
  ];
  const rowH = 0.42, top = 1.60, barX = 1.85, barMaxW = 6.20;

  stocks.forEach(([tk, wt, color], i) => {
    const cy = top + i * rowH;
    // Ticker
    s.addText(tk, {
      x: 0.55, y: cy + 0.05, w: 1.25, h: 0.32,
      fontSize: 18, bold: true, color: C.slate, fontFace: F.serif, margin: 0,
    });
    // Bar background
    s.addShape(pres.shapes.RECTANGLE, {
      x: barX, y: cy + 0.10, w: barMaxW, h: 0.22,
      fill: { color: C.rowAlt }, line: { color: C.rowAlt, width: 0 },
    });
    // Bar fill
    s.addShape(pres.shapes.RECTANGLE, {
      x: barX, y: cy + 0.10, w: barMaxW * (wt / 25), h: 0.22,
      fill: { color }, line: { color, width: 0 },
    });
    // Weight
    s.addText(`${wt}%`, {
      x: 8.30, y: cy + 0.05, w: 1.10, h: 0.32,
      fontSize: 18, bold: true, color: C.teal, fontFace: F.sans, margin: 0,
    });
  });

  source(s, "Source: Hypothetical equal-risk-contribution weighted basket, rebalanced quarterly.");
}

// ===========================================================================
// SLIDE 3 — Traditional 60/40 baseline
// ===========================================================================
{
  const s = pres.addSlide();
  headerBar(s);
  title(s, "Traditional 60/40 Portfolio Baseline");

  // Horizontal bar chart of asset allocation
  const allocData = [{
    name: "Allocation",
    labels: ["US Large Cap", "Int'l Developed", "Emerging Mkts", "US Bonds", "Int'l Bonds", "REITs"],
    values: [35, 10, 5, 30, 10, 10],
  }];
  s.addChart(pres.charts.BAR, allocData, {
    x: 0.30, y: 1.15, w: 4.85, h: 3.95,
    barDir: "bar",
    chartColors: [C.navy],
    showValue: true,
    dataLabelFontSize: 10,
    dataLabelColor: C.slate,
    catAxisLabelFontSize: 11,
    catAxisLabelColor: C.slateMid,
    valAxisHidden: true,
    showLegend: false,
    plotArea: { fill: { color: C.white } },
  });

  // Stat block on the right (inline, no box)
  s.addText("Historical Performance (10Y Annualized)", {
    x: 5.40, y: 1.20, w: 4.20, h: 0.40,
    fontSize: 14, bold: true, color: C.teal, fontFace: F.sans, margin: 0,
  });
  const stats3 = [
    ["7.8%",   C.teal,  "Annualized Return"],
    ["10.2%",  C.amber, "Annualized Volatility"],
    ["0.57",   C.slate, "Sharpe Ratio"],
    ["-22.4%", C.red,   "Max Drawdown"],
    ["0.82",   C.teal,  "Sortino Ratio"],
  ];
  stats3.forEach(([val, color, label], i) => {
    const y = 1.85 + i * 0.62;
    s.addText(val, {
      x: 5.50, y, w: 1.55, h: 0.45,
      fontSize: 26, bold: true, color, fontFace: F.serif, margin: 0,
    });
    s.addText(label, {
      x: 7.10, y: y + 0.06, w: 2.50, h: 0.40,
      fontSize: 13, color: C.slateMid, fontFace: F.sans, margin: 0,
    });
  });

  source(s, "Benchmark: 60% global equities / 40% global bonds. Data: Jan 2015 – Dec 2024.");
}

// ===========================================================================
// SLIDE 4 — AI Basket standalone performance
// ===========================================================================
{
  const s = pres.addSlide();
  headerBar(s);
  title(s, "AI Basket: Standalone Performance");

  // Line chart: growth of $10K
  const years = ["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024"];
  const lineData = [
    { name: "AI Basket", labels: years, values: [10000,11200,15400,14000,20100,29500,38200,27900,42500,58200] },
    { name: "S&P 500",   labels: years, values: [10000,11300,13700,12900,17100,20300,26100,20700,26100,31400] },
  ];
  s.addChart(pres.charts.LINE, lineData, {
    x: 0.20, y: 1.10, w: 5.95, h: 4.00,
    chartColors: [C.teal, C.slateLight],
    lineSize: 3, lineDataSymbol: "circle", lineDataSymbolSize: 6,
    showLegend: true, legendPos: "t", legendFontSize: 11,
    catAxisLabelFontSize: 10, catAxisLabelColor: C.slateMid,
    valAxisLabelFontSize: 10, valAxisLabelColor: C.slateMid,
    valAxisLabelFormatCode: "$#,##0",
    plotArea: { fill: { color: C.white } },
  });

  // Stat list on right (de-boxed)
  s.addText("AI Basket Metrics", {
    x: 6.40, y: 1.25, w: 3.20, h: 0.40,
    fontSize: 14, bold: true, color: C.teal, fontFace: F.sans, margin: 0,
  });
  const stats4 = [
    ["19.3%",  "Annualized Return"],
    ["24.8%",  "Annualized Volatility"],
    ["0.68",   "Sharpe Ratio"],
    ["-36.1%", "Max Drawdown"],
    ["1.32",   "Beta vs S&P 500"],
  ];
  stats4.forEach(([val, label], i) => {
    const y = 1.65 + i * 0.62;
    s.addText(val, {
      x: 6.40, y, w: 1.55, h: 0.45,
      fontSize: 24, bold: true, color: C.teal, fontFace: F.serif, margin: 0,
    });
    s.addText(label, {
      x: 8.05, y: y + 0.07, w: 1.95, h: 0.40,
      fontSize: 13, color: C.slateMid, fontFace: F.sans, margin: 0,
    });
  });

  source(s, "Growth of $10,000 invested Jan 2015. Hypothetical back-tested returns, net of estimated transaction costs.");
}

// ===========================================================================
// SLIDE 5 — Portfolio Enhancement: Before vs After
// ===========================================================================
{
  const s = pres.addSlide();
  headerBar(s);
  title(s, "Portfolio Enhancement: Before vs After AI");

  // Grouped bar chart: 4 metrics
  const compareData = [
    { name: "Traditional 60/40", labels: ["Ann. Return","Volatility","Sharpe Ratio","Sortino Ratio"], values: [7.80, 10.20, 0.57, 0.82] },
    { name: "55/30/15 AI-Enhanced", labels: ["Ann. Return","Volatility","Sharpe Ratio","Sortino Ratio"], values: [10.40, 11.80, 0.74, 1.12] },
  ];
  s.addChart(pres.charts.BAR, compareData, {
    x: 0.20, y: 1.15, w: 5.85, h: 4.00,
    barDir: "col", barGrouping: "clustered",
    chartColors: [C.slateLight, C.teal],
    showValue: true, dataLabelFontSize: 10, dataLabelColor: C.slate,
    catAxisLabelFontSize: 11, catAxisLabelColor: C.slateMid,
    valAxisHidden: true,
    showLegend: true, legendPos: "t", legendFontSize: 11,
    plotArea: { fill: { color: C.white } },
  });

  // Right-side stat improvements (no boxes)
  const improvements = [
    ["+2.6%",  "Return Boost",         "7.8% \u2192 10.4%",  C.green],
    ["+30%",   "Sharpe Improvement",   "0.57 \u2192 0.74",   C.green],
    ["+1.6%",  "Volatility Cost",      "10.2% \u2192 11.8%", C.red],
    ["+37%",   "Sortino Improvement",  "0.82 \u2192 1.12",   C.green],
  ];
  improvements.forEach(([big, label, sub, arrowColor], i) => {
    const y = 1.30 + i * 1.00;
    s.addText(i % 4 === 2 ? "\u2193" : "\u2191", {
      x: 6.20, y, w: 0.45, h: 0.50,
      fontSize: 28, bold: true, color: arrowColor, fontFace: F.sans, align: "center", margin: 0,
    });
    s.addText(big, {
      x: 6.70, y, w: 1.40, h: 0.50,
      fontSize: 32, bold: true, color: C.slate, fontFace: F.serif, margin: 0,
    });
    s.addText(label, {
      x: 8.15, y: y + 0.05, w: 1.80, h: 0.35,
      fontSize: 14, bold: true, color: C.slate, fontFace: F.sans, margin: 0,
    });
    s.addText(sub, {
      x: 8.15, y: y + 0.42, w: 1.80, h: 0.30,
      fontSize: 11, color: C.slateMid, fontFace: F.sans, margin: 0,
    });
  });

  source(s, "AI-Enhanced = 55% equities, 30% bonds, 15% AI basket. Rebalanced quarterly.");
}

// ===========================================================================
// SLIDE 6 — Efficient Frontier Shift
// ===========================================================================
{
  const s = pres.addSlide();
  headerBar(s);
  title(s, "Efficient Frontier Shift with AI Allocation");

  // Scatter / line: return vs risk
  const frontierData = [
    {
      name: "Traditional Frontier",
      values: [
        { x: 5,  y: 4.2 }, { x: 7, y: 5.8 }, { x: 8.5, y: 6.8 },
        { x: 10, y: 7.8 }, { x: 12.5, y: 8.5 }, { x: 15, y: 9.0 },
        { x: 18, y: 9.3 }, { x: 21, y: 9.5 },
      ],
    },
    {
      name: "AI-Enhanced Frontier",
      values: [
        { x: 5,  y: 4.8 }, { x: 7, y: 6.5 }, { x: 8.5, y: 8.2 },
        { x: 10, y: 9.6 }, { x: 12.5, y: 10.4 }, { x: 15, y: 11.0 },
        { x: 18, y: 11.8 }, { x: 21, y: 12.2 },
      ],
    },
  ];
  s.addChart(pres.charts.SCATTER,
    [
      { name: "X", values: frontierData[0].values.map(p => p.x) },
      ...frontierData.map(d => ({ name: d.name, values: d.values.map(p => p.y) })),
    ],
    {
      x: 0.30, y: 1.10, w: 6.20, h: 4.00,
      chartColors: [C.slateLight, C.teal],
      lineSize: 3, lineDataSymbol: "circle", lineDataSymbolSize: 6,
      catAxisTitle: "Risk (Volatility %)", catAxisTitleFontSize: 11,
      valAxisTitle: "Return (%)", valAxisTitleFontSize: 11,
      showLegend: true, legendPos: "b", legendFontSize: 11,
      plotArea: { fill: { color: C.white } },
    }
  );

  // Right column: Key Insight + comparison block
  s.addText("Key Insight", {
    x: 6.95, y: 1.40, w: 2.70, h: 0.40,
    fontSize: 16, bold: true, color: C.slate, fontFace: F.serif, margin: 0,
  });
  s.addText(
    "The AI-enhanced frontier sits above and to the left of the traditional curve — investors gain return at every risk level.",
    { x: 6.95, y: 2.00, w: 2.70, h: 1.00, fontSize: 13, color: C.slate, fontFace: F.sans, margin: 0 }
  );

  // Divider
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.95, y: 3.10, w: 2.70, h: 0.025,
    fill: { color: C.divider }, line: { color: C.divider, width: 0 },
  });

  s.addText("AT 12% VOLATILITY", {
    x: 6.95, y: 3.20, w: 2.70, h: 0.30,
    fontSize: 11, bold: true, color: C.slateMid, fontFace: F.sans, margin: 0, charSpacing: 1,
  });
  s.addText("Traditional", { x: 6.95, y: 3.55, w: 1.40, h: 0.30, fontSize: 13, color: C.slateMid, fontFace: F.sans, margin: 0 });
  s.addText("8.5%",        { x: 8.45, y: 3.50, w: 1.20, h: 0.35, fontSize: 16, bold: true, color: C.slate, fontFace: F.sans, margin: 0 });
  s.addText("AI-Enhanced", { x: 6.95, y: 3.90, w: 1.40, h: 0.30, fontSize: 13, color: C.slateMid, fontFace: F.sans, margin: 0 });
  s.addText("11.0%",       { x: 8.45, y: 3.85, w: 1.20, h: 0.35, fontSize: 16, bold: true, color: C.teal, fontFace: F.sans, margin: 0 });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.95, y: 4.30, w: 2.70, h: 0.025,
    fill: { color: C.divider }, line: { color: C.divider, width: 0 },
  });
  s.addText("Return pickup", { x: 6.95, y: 4.45, w: 1.40, h: 0.30, fontSize: 13, italic: true, color: C.slateMid, fontFace: F.sans, margin: 0 });
  s.addText("+2.5pp",        { x: 8.45, y: 4.40, w: 1.20, h: 0.40, fontSize: 20, bold: true, color: C.teal, fontFace: F.sans, margin: 0 });
}

// ===========================================================================
// SLIDE 7 — Risk Analysis (table + insight bar)
// ===========================================================================
{
  const s = pres.addSlide();
  headerBar(s);
  title(s, "Risk Analysis: What Investors Should Know");

  // Table
  const headerCell = (t) => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.navy }, align: "left", valign: "middle" } });
  const headerCellR = (t) => ({ ...headerCell(t), options: { ...headerCell(t).options, align: "center" } });
  const cell  = (t) => ({ text: t, options: { color: C.slate,    align: "left",   valign: "middle" } });
  const cellC = (t) => ({ text: t, options: { color: C.slate,    align: "center", valign: "middle" } });
  const chgRed   = (t) => ({ text: t, options: { color: C.red,   align: "center", valign: "middle" } });
  const chgAmber = (t) => ({ text: t, options: { color: C.amber, align: "center", valign: "middle" } });
  const chgGreen = (t) => ({ text: t, options: { color: C.green, align: "center", valign: "middle" } });

  const rows = [
    [headerCell("Risk Metric"), headerCellR("Traditional"), headerCellR("AI-Enhanced"), headerCellR("Change")],
    [cell("Max Drawdown"),         cellC("-22.4%"),    cellC("-26.8%"),  chgRed("-4.4%")],
    [cell("Value-at-Risk (95%)"),  cellC("-1.6%"),     cellC("-1.9%"),   chgRed("-0.3%")],
    [cell("Correlation to S&P 500"), cellC("0.88"),    cellC("0.91"),    chgAmber("+0.03")],
    [cell("Recovery Time (Avg)"),  cellC("8 months"),  cellC("6 months"), chgGreen("-2 mo")],
    [cell("Downside Deviation"),   cellC("6.8%"),      cellC("7.5%"),    chgAmber("+0.7%")],
  ];

  s.addTable(rows, {
    x: 0.50, y: 1.20, w: 9.00,
    colW: [3.00, 2.00, 2.00, 2.00],
    rowH: 0.45,
    fontSize: 13, fontFace: F.sans,
    border: { type: "solid", pt: 0.5, color: C.divider },
    fill: { color: C.white },
  });

  // Insight bar at bottom (with teal accent on left)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.40, y: 4.25, w: 0.10, h: 1.20,
    fill: { color: C.teal }, line: { color: C.teal, width: 0 },
  });
  s.addText(
    "Slightly deeper drawdowns and higher daily VaR are the expected trade-off for an AI-tilted growth allocation — but faster 6-month recovery and a stronger Sortino ratio confirm AI stocks add resilient, high-quality upside.",
    {
      x: 0.65, y: 4.20, w: 9.00, h: 1.30,
      fontSize: 18, color: C.slate, fontFace: F.sans, valign: "middle", margin: 0,
    }
  );
}

// ===========================================================================
// SLIDE 8 — Allocation Sensitivity
// ===========================================================================
{
  const s = pres.addSlide();
  headerBar(s);
  title(s, "AI Allocation Sensitivity: How Much Is Optimal?");

  // Bar chart of Sharpe by allocation
  const sensData = [{
    name: "Sharpe Ratio",
    labels: ["0% (Base)", "5%", "10%", "15%", "20%", "25%", "30%"],
    values: [0.57, 0.62, 0.68, 0.74, 0.73, 0.70, 0.65],
  }];
  s.addChart(pres.charts.BAR, sensData, {
    x: 0.20, y: 1.10, w: 6.10, h: 4.00,
    barDir: "col",
    chartColors: [C.teal],
    showValue: true, dataLabelFontSize: 11, dataLabelColor: C.slate,
    catAxisLabelFontSize: 11, catAxisLabelColor: C.slateMid,
    valAxisHidden: true,
    showLegend: false,
    plotArea: { fill: { color: C.white } },
  });

  // Right column: thesis (de-boxed)
  s.addText("Sweet Spot: 10–20%", {
    x: 6.50, y: 1.40, w: 3.30, h: 0.45,
    fontSize: 18, bold: true, color: C.teal, fontFace: F.serif, margin: 0,
  });
  s.addText(
    [
      { text: "A 10–20% AI allocation maximizes the risk-adjusted return of the blended portfolio.", options: { breakLine: true, paraSpaceAfter: 8 } },
      { text: "Beyond 20%, concentration risk in the tech sector erodes diversification benefits.", options: { breakLine: true, paraSpaceAfter: 8 } },
      { text: "At 15%, the Sharpe ratio peaks at 0.74 — a 30% improvement over the baseline." },
    ],
    { x: 6.50, y: 1.95, w: 3.30, h: 3.10, fontSize: 13, color: C.slate, fontFace: F.sans, margin: 0 }
  );

  source(s, "Analysis assumes pro-rata reduction of equity and bond sleeves to fund AI allocation.");
}

// ===========================================================================
// SLIDE 9 — Key Takeaways: ROADMAP
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  s.addText("Key Takeaways", {
    x: 0.55, y: 0.45, w: 9.0, h: 0.70,
    fontSize: 36, bold: true, color: C.white, fontFace: F.serif, margin: 0,
  });
  s.addText("Four numbers that define the AI-enhanced portfolio thesis", {
    x: 0.55, y: 1.20, w: 9.0, h: 0.40,
    fontSize: 15, italic: true, color: C.slateLight, fontFace: F.sans, margin: 0,
  });

  // Roadmap geometry
  const centers = [1.25, 3.75, 6.25, 8.75];
  const circleD = 1.05;
  const circleY = 2.20;
  const lineY = circleY + circleD / 2 - 0.025;

  // Connecting line
  s.addShape(pres.shapes.RECTANGLE, {
    x: centers[0], y: lineY, w: centers[3] - centers[0], h: 0.05,
    fill: { color: C.teal }, line: { color: C.teal, width: 0 },
  });

  const steps = [
    ["1", "+11.5pp", "Alpha edge",      "AI basket returned 19.3% vs 7.8% for the traditional 60/40 over 10 years."],
    ["2", "+30%",    "Sharpe lift",     "A 15% AI sleeve lifts risk-adjusted returns from 0.57 to 0.74."],
    ["3", "6 mo",    "Faster recovery", "Drawdowns are deeper but resolve in 6 months vs 8 for traditional."],
    ["4", "10–20%",  "Sweet spot",      "Optimal AI allocation; beyond 20%, sector concentration erodes benefits."],
  ];

  steps.forEach(([num, big, label, desc], i) => {
    const cx = centers[i];
    const circleX = cx - circleD / 2;
    // Circle
    s.addShape(pres.shapes.OVAL, {
      x: circleX, y: circleY, w: circleD, h: circleD,
      fill: { color: C.teal },
      line: { color: C.tealLight, width: 3 },
    });
    // Number — vertically centered in circle
    s.addText(num, {
      x: circleX, y: circleY, w: circleD, h: circleD,
      fontSize: 40, bold: true, color: C.white, fontFace: F.serif,
      align: "center", valign: "middle", margin: 0,
    });
    // Big number below circle
    s.addText(big, {
      x: cx - 1.10, y: 3.45, w: 2.20, h: 0.50,
      fontSize: 24, bold: true, color: C.tealLight, fontFace: F.sans,
      align: "center", margin: 0,
    });
    // Label
    s.addText(label, {
      x: cx - 1.10, y: 3.95, w: 2.20, h: 0.35,
      fontSize: 15, bold: true, color: C.white, fontFace: F.sans,
      align: "center", margin: 0,
    });
    // Description
    s.addText(desc, {
      x: cx - 1.15, y: 4.30, w: 2.30, h: 0.85,
      fontSize: 11, color: C.slateLight, fontFace: F.sans,
      align: "center", margin: 0,
    });
  });

  // Footer disclaimer bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.10, w: 10, h: 0.53,
    fill: { color: C.teal }, line: { color: C.teal, width: 0 },
  });
  s.addText(
    "Disclaimer: Hypothetical back-tested results. Past performance does not guarantee future results. Not investment advice.",
    {
      x: 0.55, y: 5.18, w: 9.0, h: 0.40,
      fontSize: 11, italic: true, color: C.white, fontFace: F.sans,
      align: "center", valign: "middle", margin: 0,
    }
  );
}

// ---------------------------------------------------------------------------
pres.writeFile({ fileName: "AI_Stocks_revised.pptx" })
  .then((fn) => console.log(`Created: ${fn}`));
