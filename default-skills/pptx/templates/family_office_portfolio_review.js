const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

// Icons
const { FaChartLine, FaBalanceScale, FaChartPie, FaCalendarAlt, FaExchangeAlt, FaShieldAlt, FaBullseye, FaArrowUp, FaArrowDown, FaHandshake, FaPlayCircle, FaPlusCircle } = require("react-icons/fa");

function renderIconSvg(IconComponent, color = "#000000", size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}

async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "ABC Family Office - Investment Advisory";
  pres.title = "ABC Family Office - Portfolio Review Q1 2026";

  // COLOR PALETTE
  const C = {
    navy: "1B2A4A",
    blue: "2E6CB5",
    lightBlue: "5BA4E6",
    skyBlue: "D6E9F8",
    red: "C0392B",
    darkRed: "922B21",
    white: "FFFFFF",
    offWhite: "F4F6F9",
    gray: "5D6D7E",
    lightGray: "ECF0F1",
    darkGray: "4A4A4A",
    black: "1A1A1A",
    ivvColor: "C0392B",
    aggColor: "2471A3",
  };

  // FONTS
  const H_FONT = "Georgia";
  const B_FONT = "Calibri";

  // Helper: factory for shadow (fresh object each time)
  const makeShadow = () => ({ type: "outer", color: "000000", blur: 4, offset: 2, angle: 135, opacity: 0.10 });

  // Helper: add footer bar to slide
  function addFooter(slide, pageNum) {
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.15, w: 10, h: 0.475, fill: { color: C.navy } });
    slide.addText("ABC Family Office  |  Confidential", { x: 0.5, y: 5.15, w: 7, h: 0.475, fontSize: 9, fontFace: B_FONT, color: C.skyBlue, valign: "middle" });
    slide.addText(String(pageNum), { x: 9, y: 5.15, w: 0.5, h: 0.475, fontSize: 9, fontFace: B_FONT, color: C.skyBlue, align: "right", valign: "middle" });
  }

  // ===== PRECOMPUTE ICONS =====
  const iconLine = await iconToBase64Png(FaChartLine, "#FFFFFF", 256);
  const iconBalance = await iconToBase64Png(FaBalanceScale, "#FFFFFF", 256);
  const iconPie = await iconToBase64Png(FaChartPie, "#FFFFFF", 256);
  const iconCalendar = await iconToBase64Png(FaCalendarAlt, "#FFFFFF", 256);
  const iconExchange = await iconToBase64Png(FaExchangeAlt, "#FFFFFF", 256);
  const iconShield = await iconToBase64Png(FaShieldAlt, "#FFFFFF", 256);
  const iconBullseye = await iconToBase64Png(FaBullseye, "#FFFFFF", 256);
  const iconUp = await iconToBase64Png(FaArrowUp, "#27AE60", 256);
  const iconDown = await iconToBase64Png(FaArrowDown, "#C0392B", 256);
  const iconDownWhite = await iconToBase64Png(FaArrowDown, "#FFFFFF", 256);
  const iconHandshake = await iconToBase64Png(FaHandshake, "#FFFFFF", 256);
  const iconPlay = await iconToBase64Png(FaPlayCircle, "#FFFFFF", 256);
  const iconPlus = await iconToBase64Png(FaPlusCircle, "#FFFFFF", 256);
  const iconArrowUpWhite = await iconToBase64Png(FaArrowUp, "#FFFFFF", 256);

  // ===== PORTFOLIO DATA =====
  // Prices (approximate adjusted close)
  const IVV_PRICES = {
    "2015": 207.42, "2016": 232.65, "2017": 283.28, "2018": 270.63,
    "2019": 355.20, "2020": 375.39, "2021": 483.50, "2022": 395.67,
    "2023": 476.68, "2024": 595.55, "2025": 701.97, "2026Q1": 678.00
  };
  const AGG_PRICES = {
    "2020": 118.17, "2021": 114.03, "2022": 96.97, "2023": 100.71,
    "2024": 97.50, "2025": 99.80, "2026Q1": 99.50
  };

  // Shares purchased
  const ivvShares1 = 1000000 / IVV_PRICES["2015"]; // ~4821
  const ivvShares2 = 1000000 / IVV_PRICES["2020"]; // ~2664
  const totalIVVShares = ivvShares1 + ivvShares2;
  const aggShares1 = 1000000 / AGG_PRICES["2020"]; // ~8462
  const aggShares2 = 2000000 / AGG_PRICES["2023"]; // ~19859
  const totalAGGShares = aggShares1 + aggShares2;

  // Current values
  const ivvCurrentVal = totalIVVShares * IVV_PRICES["2026Q1"];
  const aggCurrentVal = totalAGGShares * AGG_PRICES["2026Q1"];
  const totalCurrentVal = ivvCurrentVal + aggCurrentVal;
  const totalInvested = 5000000;
  const totalGain = totalCurrentVal - totalInvested;
  const totalReturn = ((totalCurrentVal / totalInvested) - 1) * 100;

  // Format helpers
  const fmt = (n) => "$" + (n / 1000000).toFixed(2) + "M";
  const fmtK = (n) => "$" + (n / 1000).toFixed(0) + "K";
  const fmtPct = (n) => (n >= 0 ? "+" : "") + n.toFixed(1) + "%";

  // ================================================================
  // SLIDE 1: TITLE SLIDE
  // ================================================================
  let s1 = pres.addSlide();
  s1.background = { color: C.navy };
  // Accent bar on top
  s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.lightBlue } });
  // Red accent bar
  s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.06, w: 10, h: 0.03, fill: { color: C.red } });
  
  s1.addText("ABC FAMILY OFFICE", { x: 0.8, y: 1.2, w: 8.4, h: 0.7, fontSize: 16, fontFace: B_FONT, color: C.lightBlue, charSpacing: 6, margin: 0 });
  s1.addText("Investment Portfolio Review", { x: 0.8, y: 1.85, w: 8.4, h: 1.0, fontSize: 40, fontFace: H_FONT, color: C.white, bold: true, margin: 0 });
  s1.addText("Q1 2026  |  Prepared April 2026", { x: 0.8, y: 2.9, w: 8.4, h: 0.5, fontSize: 16, fontFace: B_FONT, color: C.skyBlue, margin: 0 });
  
  // Decorative shapes
  s1.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 3.6, w: 1.2, h: 0.04, fill: { color: C.lightBlue } });
  s1.addShape(pres.shapes.RECTANGLE, { x: 2.1, y: 3.6, w: 0.4, h: 0.04, fill: { color: C.red } });
  
  s1.addText("Confidential  |  For Internal Use Only", { x: 0.8, y: 4.3, w: 8.4, h: 0.4, fontSize: 12, fontFace: B_FONT, color: "A8C4E0", margin: 0 });

  // ================================================================
  // SLIDE 2: EXECUTIVE SUMMARY
  // ================================================================
  let s2 = pres.addSlide();
  s2.background = { color: C.offWhite };
  // Top bar
  s2.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.blue } });
  s2.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.06, w: 10, h: 0.03, fill: { color: C.darkGray } });
  s2.addText("Executive Summary", { x: 0.6, y: 0.25, w: 8, h: 0.55, fontSize: 28, fontFace: H_FONT, color: C.navy, bold: true, margin: 0 });

  // KPI Cards - row of 4
  const kpis = [
    { label: "Total Portfolio Value", value: fmt(totalCurrentVal), color: C.blue },
    { label: "Total Invested", value: fmt(totalInvested), color: C.navy },
    { label: "Total Gain/Loss", value: fmt(totalGain), color: totalGain >= 0 ? "27AE60" : C.red },
    { label: "Total Return", value: fmtPct(totalReturn), color: totalGain >= 0 ? "27AE60" : C.red },
  ];
  kpis.forEach((kpi, i) => {
    const x = 0.6 + i * 2.25;
    s2.addShape(pres.shapes.RECTANGLE, { x, y: 1.1, w: 2.05, h: 1.3, fill: { color: C.white }, shadow: makeShadow() });
    s2.addShape(pres.shapes.RECTANGLE, { x, y: 1.1, w: 2.05, h: 0.05, fill: { color: kpi.color } });
    s2.addText(kpi.value, { x, y: 1.3, w: 2.05, h: 0.65, fontSize: 22, fontFace: H_FONT, color: C.navy, bold: true, align: "center", valign: "middle" });
    s2.addText(kpi.label, { x, y: 1.95, w: 2.05, h: 0.35, fontSize: 12, fontFace: B_FONT, color: C.gray, align: "center", valign: "top" });
  });

  // Summary text
  const summaryPoints = [
    "Portfolio initiated on 12/31/2015 with a $1M allocation to IVV (S&P 500 ETF)",
    "Additional $2M contribution on 12/31/2020: $1M IVV + $1M AGG (US Aggregate Bond ETF)",
    "Final $2M contribution on 12/31/2023: $2M allocated entirely to AGG",
    `Total invested capital of $5.0M has grown to ${fmt(totalCurrentVal)} as of Q1 2026`,
  ];
  summaryPoints.forEach((pt, i) => {
    s2.addText(pt, { x: 0.8, y: 2.75 + i * 0.38, w: 8.4, h: 0.36, fontSize: 14, fontFace: B_FONT, color: C.darkGray, bullet: true, margin: 0 });
  });

  // Asset allocation mini chart
  const ivvPct = (ivvCurrentVal / totalCurrentVal * 100).toFixed(0);
  const aggPct = (aggCurrentVal / totalCurrentVal * 100).toFixed(0);
  s2.addText("Current Allocation", { x: 0.8, y: 4.3, w: 3, h: 0.3, fontSize: 11, fontFace: B_FONT, color: C.navy, bold: true, margin: 0 });
  // Stacked horizontal bar
  const barW = 8.4;
  const ivvBarW = barW * (ivvCurrentVal / totalCurrentVal);
  s2.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 4.65, w: ivvBarW, h: 0.28, fill: { color: C.ivvColor } });
  s2.addText(`IVV ${ivvPct}%`, { x: 0.8, y: 4.65, w: ivvBarW, h: 0.28, fontSize: 12, fontFace: B_FONT, color: C.white, align: "center", valign: "middle" });
  s2.addShape(pres.shapes.RECTANGLE, { x: 0.8 + ivvBarW, y: 4.65, w: barW - ivvBarW, h: 0.28, fill: { color: C.aggColor } });
  s2.addText(`AGG ${aggPct}%`, { x: 0.8 + ivvBarW, y: 4.65, w: barW - ivvBarW, h: 0.28, fontSize: 12, fontFace: B_FONT, color: C.white, align: "center", valign: "middle" });

  addFooter(s2, 2);

  // ================================================================
  // SLIDE 3: TRANSACTION HISTORY
  // ================================================================
  let s3 = pres.addSlide();
  s3.background = { color: C.offWhite };
  s3.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.blue } });
  s3.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.06, w: 10, h: 0.03, fill: { color: C.red } });
  s3.addText("Transaction History", { x: 0.6, y: 0.25, w: 8, h: 0.55, fontSize: 28, fontFace: H_FONT, color: C.navy, bold: true, margin: 0 });

  // Timeline cards
  const transactions = [
    { date: "Dec 31, 2015", title: "Initial Investment", details: `$1,000,000 → IVV\n${ivvShares1.toFixed(0)} shares at $${IVV_PRICES["2015"].toFixed(2)}`, color: C.darkGray, icon: iconPlay },
    { date: "Dec 31, 2020", title: "2nd Contribution", details: `$1,000,000 → IVV (${ivvShares2.toFixed(0)} shares at $${IVV_PRICES["2020"].toFixed(2)})\n$1,000,000 → AGG (${aggShares1.toFixed(0)} shares at $${AGG_PRICES["2020"].toFixed(2)})`, color: C.blue, icon: iconArrowUpWhite },
    { date: "Dec 31, 2023", title: "3rd Contribution", details: `$2,000,000 → AGG\n${aggShares2.toFixed(0)} shares at $${AGG_PRICES["2023"].toFixed(2)}`, color: C.aggColor, icon: iconArrowUpWhite },
  ];

  transactions.forEach((t, i) => {
    const y = 0.95 + i * 1.2;
    s3.addShape(pres.shapes.RECTANGLE, { x: 0.6, y, w: 8.8, h: 1.0, fill: { color: C.white }, shadow: makeShadow() });
    s3.addShape(pres.shapes.RECTANGLE, { x: 0.6, y, w: 0.07, h: 1.0, fill: { color: t.color } });
    s3.addShape(pres.shapes.OVAL, { x: 0.9, y: y + 0.2, w: 0.55, h: 0.55, fill: { color: t.color } });
    s3.addImage({ data: t.icon, x: 1.03, y: y + 0.33, w: 0.28, h: 0.28 });
    s3.addText(t.date, { x: 1.7, y: y + 0.08, w: 3, h: 0.3, fontSize: 12, fontFace: B_FONT, color: C.gray, margin: 0 });
    s3.addText(t.title, { x: 1.7, y: y + 0.32, w: 3, h: 0.3, fontSize: 15, fontFace: H_FONT, color: C.navy, bold: true, margin: 0 });
    s3.addText(t.details, { x: 4.8, y: y + 0.1, w: 4.3, h: 0.8, fontSize: 12, fontFace: B_FONT, color: C.darkGray, valign: "middle", margin: 0 });
  });

  // Total row
  s3.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 4.65, w: 8.8, h: 0.4, fill: { color: C.navy } });
  s3.addText("Total Capital Invested", { x: 0.9, y: 4.65, w: 4, h: 0.4, fontSize: 13, fontFace: B_FONT, color: C.white, bold: true, valign: "middle", margin: 0 });
  s3.addText("$5,000,000", { x: 5, y: 4.65, w: 4.2, h: 0.4, fontSize: 16, fontFace: H_FONT, color: C.white, bold: true, align: "right", valign: "middle", margin: 0 });

  addFooter(s3, 3);

  // ================================================================
  // SLIDE 4: PORTFOLIO GROWTH CHART
  // ================================================================
  let s4 = pres.addSlide();
  s4.background = { color: C.offWhite };
  s4.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.blue } });
  s4.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.06, w: 10, h: 0.03, fill: { color: C.red } });
  s4.addText("Portfolio Value Evolution", { x: 0.6, y: 0.25, w: 8, h: 0.55, fontSize: 28, fontFace: H_FONT, color: C.navy, bold: true, margin: 0 });

  // Compute portfolio value at each year end
  const years = ["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026Q1"];
  const labels = ["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","Q1'26"];
  
  const ivvValues = years.map(y => {
    let shares = ivvShares1;
    if (["2020","2021","2022","2023","2024","2025","2026Q1"].includes(y)) shares += ivvShares2;
    return (shares * IVV_PRICES[y]) / 1000000;
  });
  const aggValues = years.map(y => {
    if (["2015","2016","2017","2018","2019"].includes(y)) return 0;
    let shares = aggShares1;
    if (["2023","2024","2025","2026Q1"].includes(y)) shares += aggShares2;
    return (shares * (AGG_PRICES[y] || 0)) / 1000000;
  });
  const totalValues = years.map((y, i) => ivvValues[i] + aggValues[i]);

  // Stacked bar chart
  s4.addChart(pres.charts.BAR, [
    { name: "IVV (S&P 500)", labels, values: ivvValues.map(v => +v.toFixed(2)) },
    { name: "AGG (US Bonds)", labels, values: aggValues.map(v => +v.toFixed(2)) },
  ], {
    x: 0.4, y: 0.95, w: 9.2, h: 3.2,
    barDir: "col",
    barGrouping: "stacked",
    chartColors: [C.ivvColor, C.aggColor],
    chartArea: { fill: { color: C.white }, roundedCorners: true },
    catAxisLabelColor: C.darkGray,
    catAxisLabelFontSize: 9,
    valAxisLabelColor: C.gray,
    valAxisLabelFontSize: 9,
    valGridLine: { color: "E2E8F0", size: 0.5 },
    catGridLine: { style: "none" },
    showLegend: true,
    legendPos: "t",
    legendFontSize: 10, legendFontFace: B_FONT,
    showTitle: true,
    title: "Portfolio Value (USD Millions)",
    titleColor: C.navy,
    titleFontSize: 12, titleFontFace: B_FONT,
    valAxisTitle: "USD (Millions)",
    valAxisTitleColor: C.gray,
    valAxisTitleFontSize: 9,
  });

  // Total value labels above each bar
  // Right boundary is correct, left needs shifting left to fix linear drift
  const s4PlotTop = 1.75, s4PlotBot = 3.85;
  const s4PlotL2 = 0.70, s4PlotR2 = 9.45;
  const s4PlotW2 = s4PlotR2 - s4PlotL2;
  const s4PlotH2 = s4PlotBot - s4PlotTop;
  const s4YMax = 9;
  const s4BarsN = labels.length;
  const s4SlotW = s4PlotW2 / s4BarsN;
  totalValues.forEach((v, i) => {
    const cx = s4PlotL2 + (i + 0.5) * s4SlotW;
    const barTopY = s4PlotBot - (v / s4YMax) * s4PlotH2;
    s4.addText(v.toFixed(1), {
      x: cx - s4SlotW * 0.5, y: barTopY - 0.25, w: s4SlotW, h: 0.23,
      fontSize: 9, fontFace: B_FONT, color: C.navy, bold: true, align: "center", valign: "bottom", margin: 0,
    });
  });

  // Percentage table below totals
  const pctIVV = totalValues.map((v, i) => {
    const total = ivvValues[i] + aggValues[i];
    return total === 0 ? "" : Math.round((ivvValues[i] / total) * 100) + "%";
  });
  const pctAGG = totalValues.map((v, i) => {
    const total = ivvValues[i] + aggValues[i];
    if (total === 0) return "";
    const agg = 100 - Math.round((ivvValues[i] / total) * 100);
    return agg === 0 ? "" : agg + "%";
  });

  const s4Cell = (color, bg) => ({ fontSize: 9, fontFace: B_FONT, color, fill: { color: bg }, align: "center", valign: "middle", bold: true });
  const s4Label = (color, bg) => ({ fontSize: 9, fontFace: B_FONT, color, fill: { color: bg }, align: "center", valign: "middle", bold: true });

  const s4TableRows = [
    [
      { text: "AGG %", options: s4Label(C.white, C.aggColor) },
      ...pctAGG.map(p => ({ text: p, options: s4Cell(C.aggColor, C.lightGray) })),
    ],
    [
      { text: "IVV %", options: s4Label(C.white, C.ivvColor) },
      ...pctIVV.map(p => ({ text: p, options: s4Cell(C.ivvColor, C.white) })),
    ],
  ];

  const s4LabelColW = 0.65;
  const s4DataColW = (9.35 - s4LabelColW) / labels.length;
  const s4ColWidths = [s4LabelColW, ...labels.map(() => s4DataColW)];

  s4.addTable(s4TableRows, {
    x: 0.25, y: 4.2, w: 9.35, colW: s4ColWidths,
    border: { pt: 0.3, color: "D5D8DC" },
    rowH: [0.28, 0.28],
  });

  s4.addText("Table shows year-end asset allocation breakdown between IVV (equity) and AGG (fixed income) as a percentage of total portfolio value.", { x: 0.4, y: 4.8, w: 9.2, h: 0.22, fontSize: 9, fontFace: B_FONT, color: C.gray, italic: true, margin: 0 });
  s4.addText("Source: iShares by BlackRock, Yahoo Finance. Data as of March 2026.", { x: 0.4, y: 4.98, w: 9.2, h: 0.15, fontSize: 7, fontFace: B_FONT, color: C.gray, italic: true, margin: 0 });

  addFooter(s4, 4);

  // ================================================================
  // SLIDE 5: IVV PERFORMANCE DETAIL
  // ================================================================
  let s5 = pres.addSlide();
  s5.background = { color: C.offWhite };
  s5.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.blue } });
  s5.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.06, w: 10, h: 0.03, fill: { color: C.red } });
  s5.addText("IVV — S&P 500 ETF Performance", { x: 0.6, y: 0.25, w: 8, h: 0.55, fontSize: 28, fontFace: H_FONT, color: C.navy, bold: true, margin: 0 });

  // IVV KPI cards
  const ivvTotalInvested = 2000000;
  const ivvGain = ivvCurrentVal - ivvTotalInvested;
  const ivvReturn = ((ivvCurrentVal / ivvTotalInvested) - 1) * 100;
  const ivvKpis = [
    { label: "Current Value", value: fmt(ivvCurrentVal) },
    { label: "Total Invested", value: "$2.00M" },
    { label: "Gain / Loss", value: fmt(ivvGain) },
    { label: "Total Return", value: fmtPct(ivvReturn) },
  ];
  ivvKpis.forEach((k, i) => {
    const x = 0.6 + i * 2.25;
    s5.addShape(pres.shapes.RECTANGLE, { x, y: 1.0, w: 2.05, h: 1.0, fill: { color: C.white }, shadow: makeShadow() });
    s5.addShape(pres.shapes.RECTANGLE, { x, y: 1.0, w: 2.05, h: 0.04, fill: { color: C.darkGray } });
    s5.addText(k.value, { x, y: 1.15, w: 2.05, h: 0.5, fontSize: 20, fontFace: H_FONT, color: C.navy, bold: true, align: "center", valign: "middle" });
    s5.addText(k.label, { x, y: 1.65, w: 2.05, h: 0.3, fontSize: 12, fontFace: B_FONT, color: C.gray, align: "center", valign: "top" });
  });

  // IVV annual returns bar chart
  const ivvAnnualReturns = [1.30, 12.16, 21.76, -4.47, 31.25, 18.40, 28.76, -18.16, 26.32, 24.93];
  const ivvRetLabels = ["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024"];
  s5.addChart(pres.charts.BAR, [{
    name: "IVV Annual Total Return (%)",
    labels: ivvRetLabels,
    values: ivvAnnualReturns,
  }], {
    x: 0.4, y: 2.2, w: 9.2, h: 2.7,
    barDir: "col",
    chartColors: ivvAnnualReturns.map(v => v >= 0 ? "27AE60" : C.red),
    chartArea: { fill: { color: C.white }, roundedCorners: true },
    catAxisLabelColor: C.darkGray,
    catAxisLabelFontSize: 9,
    catAxisLabelFontFace: B_FONT,
    valAxisLabelColor: C.gray,
    valAxisLabelFontSize: 9,
    valAxisLabelFontFace: B_FONT,
    valGridLine: { color: "E2E8F0", size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true,
    dataLabelPosition: "outEnd",
    dataLabelColor: C.darkGray,
    dataLabelFontSize: 9,
    dataLabelFontFace: B_FONT,
    showLegend: false,
    showTitle: true,
    title: "IVV Annual Total Return (%)",
    titleColor: C.navy,
    titleFontSize: 12, titleFontFace: B_FONT,
  });

  s5.addText("Source: Yahoo Finance, iShares by BlackRock. Total returns include dividends reinvested.", { x: 0.5, y: 4.9, w: 9, h: 0.25, fontSize: 8, fontFace: B_FONT, color: C.gray, italic: true, margin: 0 });

  addFooter(s5, 5);

  // ================================================================
  // SLIDE 6: AGG PERFORMANCE DETAIL
  // ================================================================
  let s6 = pres.addSlide();
  s6.background = { color: C.offWhite };
  s6.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.blue } });
  s6.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.06, w: 10, h: 0.03, fill: { color: C.red } });
  s6.addText("AGG — US Aggregate Bond ETF Performance", { x: 0.6, y: 0.25, w: 9, h: 0.55, fontSize: 28, fontFace: H_FONT, color: C.navy, bold: true, margin: 0 });

  const aggTotalInvested = 3000000;
  const aggGain = aggCurrentVal - aggTotalInvested;
  const aggReturn = ((aggCurrentVal / aggTotalInvested) - 1) * 100;
  const aggKpis = [
    { label: "Current Value", value: fmt(aggCurrentVal), neg: false },
    { label: "Total Invested", value: "$3.00M", neg: false },
    { label: "Gain / Loss", value: fmt(aggGain), neg: aggGain < 0 },
    { label: "Total Return", value: fmtPct(aggReturn), neg: aggReturn < 0 },
  ];
  aggKpis.forEach((k, i) => {
    const x = 0.6 + i * 2.25;
    s6.addShape(pres.shapes.RECTANGLE, { x, y: 1.0, w: 2.05, h: 1.0, fill: { color: C.white }, shadow: makeShadow() });
    s6.addShape(pres.shapes.RECTANGLE, { x, y: 1.0, w: 2.05, h: 0.04, fill: { color: C.darkGray } });
    s6.addText(k.value, { x, y: 1.15, w: 2.05, h: 0.5, fontSize: 20, fontFace: H_FONT, color: k.neg ? C.red : C.navy, bold: true, align: "center", valign: "middle" });
    s6.addText(k.label, { x, y: 1.65, w: 2.05, h: 0.3, fontSize: 12, fontFace: B_FONT, color: C.gray, align: "center", valign: "top" });
  });

  // AGG annual returns
  const aggAnnualReturns = [7.51, -1.54, -13.01, 5.53, 1.25, 1.30];
  const aggRetLabels = ["2020","2021","2022","2023","2024","2025"];
  s6.addChart(pres.charts.BAR, [{
    name: "AGG Annual Total Return (%)",
    labels: aggRetLabels,
    values: aggAnnualReturns,
  }], {
    x: 0.4, y: 2.2, w: 9.2, h: 2.7,
    barDir: "col",
    chartColors: aggAnnualReturns.map(v => v >= 0 ? "27AE60" : C.red),
    chartArea: { fill: { color: C.white }, roundedCorners: true },
    catAxisLabelColor: C.darkGray,
    catAxisLabelFontSize: 9,
    catAxisLabelFontFace: B_FONT,
    valAxisLabelColor: C.gray,
    valAxisLabelFontSize: 9,
    valAxisLabelFontFace: B_FONT,
    valGridLine: { color: "E2E8F0", size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true,
    dataLabelPosition: "outEnd",
    dataLabelColor: C.darkGray,
    dataLabelFontSize: 9,
    dataLabelFontFace: B_FONT,
    showLegend: false,
    showTitle: true,
    title: "AGG Annual Total Return (%)",
    titleColor: C.navy,
    titleFontSize: 12, titleFontFace: B_FONT,
  });

  s6.addText("Source: Yahoo Finance, iShares by BlackRock. Total returns include dividends reinvested.", { x: 0.5, y: 4.9, w: 9, h: 0.25, fontSize: 8, fontFace: B_FONT, color: C.gray, italic: true, margin: 0 });

  addFooter(s6, 6);

  // ================================================================
  // SLIDE 7: ASSET ALLOCATION — PIE CHART
  // ================================================================
  let s7 = pres.addSlide();
  s7.background = { color: C.offWhite };
  s7.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.blue } });
  s7.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.06, w: 10, h: 0.03, fill: { color: C.red } });
  s7.addText("Asset Allocation Analysis", { x: 0.6, y: 0.25, w: 8, h: 0.55, fontSize: 28, fontFace: H_FONT, color: C.navy, bold: true, margin: 0 });

  // Two pie charts: By Investment vs Current
  // By cost
  s7.addText("At Cost", { x: 0.6, y: 1.0, w: 4.5, h: 0.35, fontSize: 14, fontFace: B_FONT, color: C.navy, bold: true, align: "center", margin: 0 });
  s7.addChart(pres.charts.DOUGHNUT, [{
    name: "At Cost",
    labels: ["IVV (Equity)", "AGG (Fixed Income)"],
    values: [2, 3],
  }], {
    x: 0.8, y: 1.35, w: 3.8, h: 3.2,
    chartColors: [C.ivvColor, C.aggColor],
    showPercent: true,
    showLegend: true,
    legendPos: "b",
    legendFontSize: 10, legendFontFace: B_FONT,
    dataLabelColor: C.white,
    dataLabelFontSize: 12,
    showTitle: false,
  });

  s7.addText("Current Market Value", { x: 5.0, y: 1.0, w: 4.5, h: 0.35, fontSize: 14, fontFace: B_FONT, color: C.navy, bold: true, align: "center", margin: 0 });
  s7.addChart(pres.charts.DOUGHNUT, [{
    name: "Current",
    labels: ["IVV (Equity)", "AGG (Fixed Income)"],
    values: [+(ivvCurrentVal/1000000).toFixed(2), +(aggCurrentVal/1000000).toFixed(2)],
  }], {
    x: 5.2, y: 1.35, w: 3.8, h: 3.2,
    chartColors: [C.ivvColor, C.aggColor],
    showPercent: true,
    showLegend: true,
    legendPos: "b",
    legendFontSize: 10, legendFontFace: B_FONT,
    dataLabelColor: C.white,
    dataLabelFontSize: 12,
    showTitle: false,
  });

  // Observation + Source
  s7.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 4.7, w: 6.5, h: 0.32, fill: { color: C.navy } });
  s7.addText("Equity weight has increased due to strong S&P 500 performance — consider rebalancing", { x: 0.75, y: 4.7, w: 6.2, h: 0.32, fontSize: 10, fontFace: B_FONT, color: C.white, valign: "middle", margin: 0 });
  s7.addText("Source: iShares by BlackRock, Yahoo Finance. Data as of March 2026.", { x: 7.2, y: 4.7, w: 2.6, h: 0.32, fontSize: 7, fontFace: B_FONT, color: C.gray, italic: true, valign: "middle", margin: 0 });

  addFooter(s7, 7);

  // ================================================================
  // SLIDE 8: UNDERLYING EXPOSURE ANALYSIS
  // ================================================================
  let s7b = pres.addSlide();
  s7b.background = { color: C.offWhite };
  s7b.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.blue } });
  s7b.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.06, w: 10, h: 0.03, fill: { color: C.red } });
  s7b.addText("Underlying Exposure Analysis", { x: 0.6, y: 0.25, w: 9, h: 0.55, fontSize: 28, fontFace: H_FONT, color: C.navy, bold: true, margin: 0 });

  // IVV Top 10 Holdings table (left side)
  s7b.addText("IVV — Top 10 Issuers by Weight", { x: 0.4, y: 0.85, w: 4.5, h: 0.3, fontSize: 13, fontFace: B_FONT, color: C.ivvColor, bold: true, margin: 0 });

  const ivvHoldings = [
    ["Apple (AAPL)", "7.0%"],
    ["Microsoft (MSFT)", "6.5%"],
    ["NVIDIA (NVDA)", "6.0%"],
    ["Amazon (AMZN)", "3.8%"],
    ["Meta Platforms (META)", "2.5%"],
    ["Alphabet A (GOOGL)", "2.1%"],
    ["Alphabet C (GOOG)", "1.8%"],
    ["Berkshire Hathaway (BRK.B)", "1.7%"],
    ["Broadcom (AVGO)", "1.6%"],
    ["Tesla (TSLA)", "1.5%"],
  ];

  const expHdr = (bg) => ({ fontSize: 10, fontFace: B_FONT, color: C.white, fill: { color: bg }, bold: true, align: "center", valign: "middle" });
  const expCell = (alt) => ({ fontSize: 10, fontFace: B_FONT, color: C.darkGray, fill: { color: alt ? C.lightGray : C.white }, valign: "middle" });
  const expPct = (alt) => ({ fontSize: 10, fontFace: B_FONT, color: C.darkGray, fill: { color: alt ? C.lightGray : C.white }, align: "center", valign: "middle", bold: true });

  const ivvRows = [
    [{ text: "#", options: expHdr(C.ivvColor) }, { text: "Issuer", options: expHdr(C.ivvColor) }, { text: "Weight of IVV", options: expHdr(C.ivvColor) }],
    ...ivvHoldings.map((h, i) => [
      { text: String(i + 1), options: { ...expPct(i % 2 === 1), color: C.gray } },
      { text: h[0], options: expCell(i % 2 === 1) },
      { text: h[1], options: expPct(i % 2 === 1) },
    ]),
  ];

  s7b.addTable(ivvRows, {
    x: 0.4, y: 1.2, w: 4.2, colW: [0.35, 2.25, 1.6],
    border: { pt: 0.3, color: "D5D8DC" },
    rowH: [0.3, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28],
  });

  // IVV concentration bar
  const concBarW = 4.2;
  const concBarH = 0.18;
  const concBarY = 4.58;
  const concLabelY = 4.35;
  const ivvTop10Pct = 34.5;
  s7b.addText("Top 10 Concentration", { x: 0.4, y: concLabelY, w: 2.5, h: 0.22, fontSize: 9, fontFace: B_FONT, color: C.gray, margin: 0 });
  s7b.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: concBarY, w: concBarW, h: concBarH, fill: { color: C.lightGray } });
  s7b.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: concBarY, w: concBarW * (ivvTop10Pct / 100), h: concBarH, fill: { color: C.ivvColor } });
  s7b.addText(ivvTop10Pct + "% of IVV", { x: 0.4 + concBarW * (ivvTop10Pct / 100) + 0.1, y: concBarY, w: 1.5, h: concBarH, fontSize: 8, fontFace: B_FONT, color: C.darkGray, align: "left", valign: "middle" });

  // AGG Top 10 Issuers table (right side)
  s7b.addText("AGG — Top 10 Issuers by Weight", { x: 5.4, y: 0.85, w: 4.5, h: 0.3, fontSize: 13, fontFace: B_FONT, color: C.aggColor, bold: true, margin: 0 });

  const aggIssuers = [
    ["US Treasury", "41.5%"],
    ["GNMA (Ginnie Mae)", "10.2%"],
    ["FNMA (Fannie Mae)", "9.1%"],
    ["FHLMC (Freddie Mac)", "5.3%"],
    ["JPMorgan Chase", "1.5%"],
    ["Bank of America", "1.2%"],
    ["Morgan Stanley", "0.9%"],
    ["Goldman Sachs", "0.8%"],
    ["Wells Fargo", "0.7%"],
    ["Citigroup", "0.6%"],
  ];

  const aggRows = [
    [{ text: "#", options: expHdr(C.aggColor) }, { text: "Issuer", options: expHdr(C.aggColor) }, { text: "Weight of AGG", options: expHdr(C.aggColor) }],
    ...aggIssuers.map((h, i) => [
      { text: String(i + 1), options: { ...expPct(i % 2 === 1), color: C.gray } },
      { text: h[0], options: expCell(i % 2 === 1) },
      { text: h[1], options: expPct(i % 2 === 1) },
    ]),
  ];

  s7b.addTable(aggRows, {
    x: 5.4, y: 1.2, w: 4.2, colW: [0.35, 2.25, 1.6],
    border: { pt: 0.3, color: "D5D8DC" },
    rowH: [0.3, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28],
  });

  // AGG concentration bar
  const aggTop10Pct = 71.8;
  s7b.addText("Top 10 Concentration", { x: 5.4, y: concLabelY, w: 2.5, h: 0.22, fontSize: 9, fontFace: B_FONT, color: C.gray, margin: 0 });
  s7b.addShape(pres.shapes.RECTANGLE, { x: 5.4, y: concBarY, w: concBarW, h: concBarH, fill: { color: C.lightGray } });
  s7b.addShape(pres.shapes.RECTANGLE, { x: 5.4, y: concBarY, w: concBarW * (aggTop10Pct / 100), h: concBarH, fill: { color: C.aggColor } });
  s7b.addText(aggTop10Pct + "% of AGG", { x: 5.4 + concBarW * (aggTop10Pct / 100) + 0.1, y: concBarY, w: 1.5, h: concBarH, fontSize: 8, fontFace: B_FONT, color: C.darkGray, align: "left", valign: "middle" });

  // Insight + Source
  s7b.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.85, w: 6.8, h: 0.22, fill: { color: C.navy } });
  s7b.addText("IVV is concentrated in mega-cap tech; AGG is dominated by US government-backed securities", { x: 0.5, y: 4.85, w: 6.6, h: 0.22, fontSize: 8, fontFace: B_FONT, color: C.white, valign: "middle", margin: 0 });
  s7b.addText("Source: iShares by BlackRock. Holdings as of March 2026.", { x: 7.3, y: 4.85, w: 2.5, h: 0.22, fontSize: 7, fontFace: B_FONT, color: C.gray, italic: true, valign: "middle", margin: 0 });

  addFooter(s7b, 8);

  // ================================================================
  // SLIDE 9: RISK ANALYSIS
  // ================================================================
  let s8 = pres.addSlide();
  s8.background = { color: C.offWhite };
  s8.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.blue } });
  s8.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.06, w: 10, h: 0.03, fill: { color: C.red } });
  s8.addText("Risk & Return Metrics", { x: 0.6, y: 0.25, w: 8, h: 0.55, fontSize: 28, fontFace: H_FONT, color: C.navy, bold: true, margin: 0 });

  // Table with icons
  const riskHeader = [
    { text: "Metric", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11, fontFace: B_FONT, align: "left" } },
    { text: "IVV (S&P 500)", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11, fontFace: B_FONT, align: "center" } },
    { text: "AGG (US Bonds)", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11, fontFace: B_FONT, align: "center" } },
    { text: "60/40 Blend", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11, fontFace: B_FONT, align: "center" } },
  ];
  const riskData = [
    ["Annualized Return (10Y)", "12.5%", "1.2%", "8.0%"],
    ["Annualized Volatility", "15.2%", "6.8%", "10.1%"],
    ["Max Drawdown", "-33.7%", "-18.3%", "-21.5%"],
    ["Sharpe Ratio", "0.72", "0.08", "0.62"],
    ["Correlation", "1.00", "-0.15", "—"],
    ["Current Yield", "1.2%", "3.8%", "2.3%"],
    ["Expense Ratio", "0.03%", "0.03%", "0.03%"],
  ];
  const metricIcons = [
    { icon: iconLine, color: "27AE60" },
    { icon: iconBalance, color: C.blue },
    { icon: iconDownWhite, color: C.red },
    { icon: iconBullseye, color: C.lightBlue },
    { icon: iconExchange, color: C.navy },
    { icon: iconLine, color: "27AE60" },
    { icon: iconShield, color: C.gray },
  ];
  const cellOpt = (alt, val) => ({ fontSize: 11, fontFace: B_FONT, color: (val && val.startsWith("-")) ? C.red : C.darkGray, fill: { color: alt ? C.lightGray : C.white }, align: "center", valign: "middle" });
  const cellOptL = (alt) => ({ fontSize: 11, fontFace: B_FONT, color: C.darkGray, fill: { color: alt ? C.lightGray : C.white }, align: "left", valign: "middle" });
  
  const tableRows = [riskHeader];
  riskData.forEach((row, ri) => {
    const alt = ri % 2 === 1;
    tableRows.push([
      { text: "             " + row[0], options: cellOptL(alt) },
      { text: row[1], options: cellOpt(alt, row[1]) },
      { text: row[2], options: cellOpt(alt, row[2]) },
      { text: row[3], options: cellOpt(alt, row[3]) },
    ]);
  });

  s8.addTable(tableRows, {
    x: 0.6, y: 1.0, w: 8.8, colW: [2.8, 2.0, 2.0, 2.0],
    border: { pt: 0.5, color: "D5D8DC" },
    rowH: [0.4, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38],
  });

  // Add icon circles to each metric row
  metricIcons.forEach((m, i) => {
    const rowY = 1.0 + 0.4 + i * 0.38; // header height + row index * row height
    s8.addShape(pres.shapes.OVAL, { x: 0.72, y: rowY + 0.06, w: 0.26, h: 0.26, fill: { color: m.color } });
    s8.addImage({ data: m.icon, x: 0.76, y: rowY + 0.10, w: 0.18, h: 0.18 });
  });

  // Insight box
  s8.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 4.15, w: 8.8, h: 0.85, fill: { color: C.white }, shadow: makeShadow() });
  s8.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 4.15, w: 0.07, h: 0.85, fill: { color: C.lightBlue } });
  s8.addText([
    { text: "Key Insight: ", options: { bold: true, color: C.navy } },
    { text: "The negative correlation between IVV and AGG provides diversification benefits. The 2022 drawdown highlighted a period where both asset classes declined simultaneously — an unusual environment that underscored the importance of monitoring correlation regimes.", options: { color: C.darkGray } },
  ], { x: 0.9, y: 4.18, w: 8.3, h: 0.6, fontSize: 11, fontFace: B_FONT, valign: "middle", margin: 0 });
  s8.addText("Source: iShares by BlackRock, Yahoo Finance. Metrics based on historical data as of March 2026.", { x: 0.9, y: 4.78, w: 8.3, h: 0.18, fontSize: 7, fontFace: B_FONT, color: C.gray, italic: true, margin: 0 });

  addFooter(s8, 9);

  // ================================================================
  // SLIDE 9: CONTRIBUTION & RETURN WATERFALL
  // ================================================================
  let s9 = pres.addSlide();
  s9.background = { color: C.offWhite };
  s9.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.blue } });
  s9.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.06, w: 10, h: 0.03, fill: { color: C.red } });
  s9.addText("Contribution vs. Investment Returns", { x: 0.6, y: 0.25, w: 9, h: 0.55, fontSize: 28, fontFace: H_FONT, color: C.navy, bold: true, margin: 0 });

  // Waterfall-style bar chart showing contributions vs gains
  const ivvGainLot1 = ivvShares1 * IVV_PRICES["2026Q1"] - 1000000;
  const ivvGainLot2 = ivvShares2 * IVV_PRICES["2026Q1"] - 1000000;
  const aggGainLot1 = aggShares1 * AGG_PRICES["2026Q1"] - 1000000;
  const aggGainLot2 = aggShares2 * AGG_PRICES["2026Q1"] - 2000000;

  // Table showing lot-by-lot analysis
  const lotHeader = [
    { text: "Investment Lot", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11, fontFace: B_FONT } },
    { text: "Date", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11, fontFace: B_FONT, align: "center" } },
    { text: "Cost", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11, fontFace: B_FONT, align: "center" } },
    { text: "Current Value", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11, fontFace: B_FONT, align: "center" } },
    { text: "Gain / Loss", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11, fontFace: B_FONT, align: "center" } },
    { text: "Return", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11, fontFace: B_FONT, align: "center" } },
  ];

  const lots = [
    ["IVV Lot 1", "12/31/2015", fmt(1000000), fmt(ivvShares1 * IVV_PRICES["2026Q1"]), fmt(ivvGainLot1), fmtPct((ivvGainLot1/1000000)*100)],
    ["IVV Lot 2", "12/31/2020", fmt(1000000), fmt(ivvShares2 * IVV_PRICES["2026Q1"]), fmt(ivvGainLot2), fmtPct((ivvGainLot2/1000000)*100)],
    ["AGG Lot 1", "12/31/2020", fmt(1000000), fmt(aggShares1 * AGG_PRICES["2026Q1"]), fmt(aggGainLot1), fmtPct((aggGainLot1/1000000)*100)],
    ["AGG Lot 2", "12/31/2023", fmt(2000000), fmt(aggShares2 * AGG_PRICES["2026Q1"]), fmt(aggGainLot2), fmtPct((aggGainLot2/1000000)*100)],
  ];

  const lotRows = [lotHeader];
  lots.forEach((row, ri) => {
    const alt = ri % 2 === 1;
    const gainVal = parseFloat(row[4].replace(/[$M,]/g, ""));
    lotRows.push(row.map((cell, ci) => ({
      text: cell,
      options: {
        fontSize: 11, fontFace: B_FONT,
        color: (ci === 4 || ci === 5) ? (gainVal >= 0 ? "27AE60" : C.red) : C.darkGray,
        fill: { color: alt ? C.lightGray : C.white },
        align: ci === 0 ? "left" : "center",
        bold: ci === 4 || ci === 5,
      }
    })));
  });

  // Total row
  lotRows.push([
    { text: "TOTAL", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11, fontFace: B_FONT } },
    { text: "", options: { fill: { color: C.navy }, color: C.white, fontSize: 11 } },
    { text: "$5.00M", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11, fontFace: B_FONT, align: "center" } },
    { text: fmt(totalCurrentVal), options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11, fontFace: B_FONT, align: "center" } },
    { text: fmt(totalGain), options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11, fontFace: B_FONT, align: "center" } },
    { text: fmtPct(totalReturn), options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11, fontFace: B_FONT, align: "center" } },
  ]);

  s9.addTable(lotRows, {
    x: 0.4, y: 0.95, w: 9.2, colW: [1.7, 1.4, 1.5, 1.6, 1.6, 1.4],
    border: { pt: 0.5, color: "D5D8DC" },
    rowH: [0.33, 0.33, 0.33, 0.33, 0.33, 0.36],
  });

  // Contribution bar chart - grouped: Cost vs Current Value
  s9.addChart(pres.charts.BAR, [
    { name: "Cost Basis ($M)", labels: ["AGG Lot 2","AGG Lot 1","IVV Lot 2","IVV Lot 1"], values: [2.0, 1.0, 1.0, 1.0] },
    { name: "Current Value ($M)", labels: ["AGG Lot 2","AGG Lot 1","IVV Lot 2","IVV Lot 1"], values: [+((aggShares2 * AGG_PRICES["2026Q1"])/1e6).toFixed(1), +((aggShares1 * AGG_PRICES["2026Q1"])/1e6).toFixed(1), +((ivvShares2 * IVV_PRICES["2026Q1"])/1e6).toFixed(1), +((ivvShares1 * IVV_PRICES["2026Q1"])/1e6).toFixed(1)] },
  ], {
    x: 0.4, y: 2.95, w: 9.2, h: 2.15,
    barDir: "bar",
    barGrouping: "clustered",
    chartColors: [C.darkGray, C.blue],
    chartArea: { fill: { color: C.white }, roundedCorners: true },
    catAxisLabelColor: C.darkGray,
    catAxisLabelFontSize: 9,
    catAxisLabelFontFace: B_FONT,
    valAxisLabelColor: C.gray,
    valAxisLabelFontSize: 9,
    valAxisLabelFontFace: B_FONT,
    valGridLine: { color: "E2E8F0", size: 0.5 },
    catGridLine: { style: "none" },
    showLegend: true,
    legendPos: "b",
    legendFontSize: 9, legendFontFace: B_FONT,
    showTitle: false,
    showValue: true,
    dataLabelPosition: "outEnd",
    dataLabelColor: C.darkGray,
    dataLabelFontSize: 9,
    dataLabelFontFace: B_FONT,
    dataLabelFormatCode: "0.0",
  });

  addFooter(s9, 10);
  s9.addText("Source: Portfolio records, iShares by BlackRock. Prices as of March 2026.", { x: 0.5, y: 4.9, w: 9, h: 0.15, fontSize: 7, fontFace: B_FONT, color: C.gray, italic: true, margin: 0 });

  // ================================================================
  // SLIDE 10: TAX ANALYSIS — UNREALIZED GAINS CHART
  // ================================================================
  let s10 = pres.addSlide();
  s10.background = { color: C.offWhite };
  s10.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.blue } });
  s10.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.06, w: 10, h: 0.03, fill: { color: C.red } });
  s10.addText("Tax Obligation Analysis", { x: 0.6, y: 0.25, w: 8, h: 0.55, fontSize: 28, fontFace: H_FONT, color: C.navy, bold: true, margin: 0 });
  s10.addText("Unrealized Gains / Losses Evolution — No Trades Executed", { x: 0.6, y: 0.7, w: 8, h: 0.35, fontSize: 12, fontFace: B_FONT, color: C.gray, italic: true, margin: 0 });

  // Compute unrealized gain per year
  const taxYears = ["2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026Q1"];
  const taxLabels = ["2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","Q1'26"];
  const ltcgRate = 0.238; // 20% + 3.8% NIIT

  const unrealizedGains = taxYears.map(y => {
    let gain = 0;
    // IVV Lot 1: always active
    gain += ivvShares1 * IVV_PRICES[y] - 1000000;
    // IVV Lot 2: from 2020
    if (["2020","2021","2022","2023","2024","2025","2026Q1"].includes(y)) {
      gain += ivvShares2 * IVV_PRICES[y] - 1000000;
    }
    // AGG Lot 1: from 2020
    if (["2020","2021","2022","2023","2024","2025","2026Q1"].includes(y)) {
      gain += aggShares1 * (AGG_PRICES[y] || 0) - 1000000;
    }
    // AGG Lot 2: from 2023
    if (["2023","2024","2025","2026Q1"].includes(y)) {
      gain += aggShares2 * (AGG_PRICES[y] || 0) - 2000000;
    }
    return gain / 1000000;
  });
  const estTaxLiability = unrealizedGains.map(g => Math.max(0, g * ltcgRate));

  // Line chart: unrealized gain + estimated tax
  s10.addChart(pres.charts.LINE, [
    { name: "Unrealized Gain ($M)", labels: taxLabels, values: unrealizedGains.map(v => +v.toFixed(2)) },
    { name: "Est. Tax Liability ($M)", labels: taxLabels, values: estTaxLiability.map(v => +v.toFixed(2)) },
  ], {
    x: 0.4, y: 1.1, w: 9.2, h: 3.0,
    lineSize: 3,
    lineSmooth: false,
    chartColors: ["27AE60", C.darkGray],
    chartArea: { fill: { color: C.white }, roundedCorners: true },
    catAxisLabelColor: C.darkGray,
    catAxisLabelFontSize: 9,
    valAxisLabelColor: C.gray,
    valAxisLabelFontSize: 9,
    valGridLine: { color: "E2E8F0", size: 0.5 },
    catGridLine: { style: "none" },
    showLegend: true,
    legendPos: "t",
    legendFontSize: 10, legendFontFace: B_FONT,
    showTitle: false,
    showMarker: true,
    markerSize: 5,
    showValue: false,
  });

  // Key takeaway box
  s10.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 4.25, w: 8.8, h: 0.78, fill: { color: C.white }, shadow: makeShadow() });
  s10.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 4.25, w: 0.07, h: 0.78, fill: { color: C.lightBlue } });
  s10.addText([
    { text: "Key Takeaway: ", options: { bold: true, color: C.navy } },
    { text: `Since no trades have been executed, all gains remain unrealized with zero current tax obligation. The estimated deferred tax liability at the LTCG rate of 23.8% is approximately $${(Math.max(0, unrealizedGains[unrealizedGains.length-1]) * ltcgRate).toFixed(2)}M. AGG unrealized losses can offset IVV gains if harvested strategically.`, options: { color: C.darkGray } },
  ], { x: 0.9, y: 4.27, w: 8.3, h: 0.55, fontSize: 11, fontFace: B_FONT, valign: "middle", margin: 0 });
  s10.addText("Source: Portfolio records. Tax estimates at 23.8% LTCG rate. For illustrative purposes only — consult your tax advisor.", { x: 0.9, y: 4.82, w: 8.3, h: 0.18, fontSize: 7, fontFace: B_FONT, color: C.gray, italic: true, margin: 0 });

  addFooter(s10, 11);

  // ================================================================
  // SLIDE 11: TAX DETAIL TABLE
  // ================================================================
  let s11 = pres.addSlide();
  s11.background = { color: C.offWhite };
  s11.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.blue } });
  s11.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.06, w: 10, h: 0.03, fill: { color: C.red } });
  s11.addText("Tax Detail — Lot-by-Lot Breakdown", { x: 0.6, y: 0.25, w: 9, h: 0.55, fontSize: 28, fontFace: H_FONT, color: C.navy, bold: true, margin: 0 });

  // Tax detail table
  const taxHeader = [
    { text: "Lot", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, fontFace: B_FONT } },
    { text: "Purchase\nDate", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, fontFace: B_FONT, align: "center", valign: "middle" } },
    { text: "Cost\nBasis", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, fontFace: B_FONT, align: "center", valign: "middle" } },
    { text: "Current\nValue", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, fontFace: B_FONT, align: "center", valign: "middle" } },
    { text: "Unrealized\nGain/Loss", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, fontFace: B_FONT, align: "center", valign: "middle" } },
    { text: "Holding\nPeriod", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, fontFace: B_FONT, align: "center", valign: "middle" } },
    { text: "Tax\nTreatment", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, fontFace: B_FONT, align: "center", valign: "middle" } },
    { text: "Est. Tax\n@ 23.8%", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, fontFace: B_FONT, align: "center", valign: "middle" } },
  ];

  const ivvG1 = ivvShares1 * IVV_PRICES["2026Q1"] - 1000000;
  const ivvG2 = ivvShares2 * IVV_PRICES["2026Q1"] - 1000000;
  const aggG1 = aggShares1 * AGG_PRICES["2026Q1"] - 1000000;
  const aggG2 = aggShares2 * AGG_PRICES["2026Q1"] - 2000000;

  const taxLots = [
    { lot: "IVV Lot 1", date: "12/31/2015", cost: 1000000, curr: ivvShares1 * IVV_PRICES["2026Q1"], gain: ivvG1, period: "10.3 yrs", treatment: "LTCG" },
    { lot: "IVV Lot 2", date: "12/31/2020", cost: 1000000, curr: ivvShares2 * IVV_PRICES["2026Q1"], gain: ivvG2, period: "5.3 yrs", treatment: "LTCG" },
    { lot: "AGG Lot 1", date: "12/31/2020", cost: 1000000, curr: aggShares1 * AGG_PRICES["2026Q1"], gain: aggG1, period: "5.3 yrs", treatment: "LTCG" },
    { lot: "AGG Lot 2", date: "12/31/2023", cost: 2000000, curr: aggShares2 * AGG_PRICES["2026Q1"], gain: aggG2, period: "2.3 yrs", treatment: "LTCG" },
  ];

  const taxRows = [taxHeader];
  taxLots.forEach((t, ri) => {
    const alt = ri % 2 === 1;
    const bg = alt ? C.lightGray : C.white;
    const gainColor = t.gain >= 0 ? "27AE60" : C.red;
    const estTax = t.gain > 0 ? t.gain * ltcgRate : 0;
    taxRows.push([
      { text: t.lot, options: { fontSize: 10, fontFace: B_FONT, color: C.darkGray, fill: { color: bg }, bold: true, valign: "middle" } },
      { text: t.date, options: { fontSize: 10, fontFace: B_FONT, color: C.darkGray, fill: { color: bg }, align: "center", valign: "middle" } },
      { text: fmt(t.cost), options: { fontSize: 10, fontFace: B_FONT, color: C.darkGray, fill: { color: bg }, align: "center", valign: "middle" } },
      { text: fmt(t.curr), options: { fontSize: 10, fontFace: B_FONT, color: C.darkGray, fill: { color: bg }, align: "center", valign: "middle" } },
      { text: fmt(t.gain), options: { fontSize: 10, fontFace: B_FONT, color: gainColor, fill: { color: bg }, align: "center", valign: "middle", bold: true } },
      { text: t.period, options: { fontSize: 10, fontFace: B_FONT, color: C.darkGray, fill: { color: bg }, align: "center", valign: "middle" } },
      { text: t.treatment, options: { fontSize: 10, fontFace: B_FONT, color: C.darkGray, fill: { color: bg }, align: "center", valign: "middle" } },
      { text: estTax > 0 ? fmt(estTax) : "—", options: { fontSize: 10, fontFace: B_FONT, color: estTax > 0 ? C.red : C.gray, fill: { color: bg }, align: "center", valign: "middle", bold: estTax > 0 } },
    ]);
  });

  // Totals row
  const totalUnrealizedGain = ivvG1 + ivvG2 + aggG1 + aggG2;
  const totalEstTax = Math.max(0, ivvG1) * ltcgRate + Math.max(0, ivvG2) * ltcgRate; // only gains taxed
  const netTaxAfterHarvest = (Math.max(0, ivvG1 + ivvG2 + aggG1 + aggG2)) * ltcgRate;
  taxRows.push([
    { text: "TOTAL", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, fontFace: B_FONT } },
    { text: "", options: { fill: { color: C.navy }, color: C.white, fontSize: 10 } },
    { text: "$5.00M", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, fontFace: B_FONT, align: "center", valign: "middle" } },
    { text: fmt(totalCurrentVal), options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, fontFace: B_FONT, align: "center", valign: "middle" } },
    { text: fmt(totalUnrealizedGain), options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, fontFace: B_FONT, align: "center", valign: "middle" } },
    { text: "", options: { fill: { color: C.navy }, color: C.white, fontSize: 10 } },
    { text: "", options: { fill: { color: C.navy }, color: C.white, fontSize: 10 } },
    { text: fmt(totalEstTax), options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, fontFace: B_FONT, align: "center", valign: "middle" } },
  ]);

  s11.addTable(taxRows, {
    x: 0.7, y: 0.95, w: 8.6, colW: [1.0, 1.1, 1.1, 1.1, 1.2, 1.0, 1.0, 1.1],
    border: { pt: 0.5, color: "D5D8DC" },
    rowH: [0.45, 0.4, 0.4, 0.4, 0.4, 0.45],
  });

  // Tax strategy insight cards
  const taxInsights = [
    { title: "No Current Tax Obligation", desc: "Since no trades have been executed, all gains/losses remain unrealized. Tax is deferred until positions are sold.", color: "27AE60" },
    { title: "Tax-Loss Harvesting Opportunity", desc: `AGG Lot 1 has a ${fmt(Math.abs(aggG1))} unrealized loss that can offset IVV gains if harvested, reducing the net taxable gain.`, color: C.blue },
    { title: "Net Tax if Fully Liquidated", desc: `Gross estimated tax liability: ${fmt(totalEstTax)}. After offsetting AGG losses, net tax could be reduced to approximately ${fmt(netTaxAfterHarvest)}.`, color: C.red },
  ];

  taxInsights.forEach((t, i) => {
    const x = 0.5 + i * 3.1;
    s11.addShape(pres.shapes.RECTANGLE, { x, y: 3.65, w: 3.0, h: 1.1, fill: { color: C.white }, shadow: makeShadow() });
    s11.addShape(pres.shapes.RECTANGLE, { x, y: 3.65, w: 3.0, h: 0.05, fill: { color: t.color } });
    s11.addText(t.title, { x: x + 0.12, y: 3.75, w: 2.76, h: 0.28, fontSize: 11, fontFace: H_FONT, color: C.navy, bold: true, margin: 0 });
    s11.addText(t.desc, { x: x + 0.12, y: 4.03, w: 2.76, h: 0.65, fontSize: 9, fontFace: B_FONT, color: C.darkGray, valign: "top", margin: 0 });
  });

  s11.addText("Source: Portfolio records. Tax estimates at 23.8% LTCG rate (20% federal + 3.8% NIIT). For illustrative purposes only — consult your tax advisor.", { x: 0.5, y: 4.82, w: 9, h: 0.18, fontSize: 7, fontFace: B_FONT, color: C.gray, italic: true, margin: 0 });

  addFooter(s11, 12);

  // ================================================================
  // SLIDE 12: RECOMMENDATIONS & OUTLOOK
  // ================================================================
  let s12 = pres.addSlide();
  s12.background = { color: C.navy };
  s12.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.lightBlue } });
  s12.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.06, w: 10, h: 0.03, fill: { color: C.red } });
  s12.addText("Strategic Recommendations", { x: 0.6, y: 0.3, w: 8, h: 0.55, fontSize: 28, fontFace: H_FONT, color: C.white, bold: true, margin: 0 });

  const recs = [
    { icon: iconBalance, title: "Rebalance Portfolio", desc: "Equity weight has drifted above target. Consider trimming IVV to lock in gains and increase AGG allocation to reduce volatility exposure.", accent: C.ivvColor },
    { icon: iconShield, title: "Diversification Enhancement", desc: "Consider adding international equities (e.g., IEFA/EEM) and alternative fixed income (e.g., TIP, HYG) to improve risk-adjusted returns.", accent: C.aggColor },
    { icon: iconBullseye, title: "Tax-Loss Harvesting", desc: "AGG positions purchased in 2020 show unrealized losses. Consider harvesting to offset gains from IVV, then rotate into a similar bond ETF. This is for illustrative purposes only — please consult with your tax advisor or accountant before executing any tax strategy.", accent: "27AE60" },
    { icon: iconHandshake, title: "Next Steps", desc: "Schedule quarterly portfolio review. Monitor interest rate environment for AGG positioning. Evaluate addition of real assets (REITs, commodities) for inflation protection.", accent: C.lightBlue },
  ];

  recs.forEach((r, i) => {
    const y = 1.1 + i * 1.05;
    s12.addShape(pres.shapes.RECTANGLE, { x: 0.6, y, w: 8.8, h: 0.88, fill: { color: "EDF0F2" } });
    s12.addShape(pres.shapes.RECTANGLE, { x: 0.6, y, w: 0.07, h: 0.88, fill: { color: r.accent } });
    s12.addShape(pres.shapes.OVAL, { x: 0.9, y: y + 0.14, w: 0.55, h: 0.55, fill: { color: r.accent } });
    s12.addImage({ data: r.icon, x: 1.03, y: y + 0.27, w: 0.3, h: 0.3 });
    s12.addText(r.title, { x: 1.65, y: y + 0.05, w: 7.5, h: 0.3, fontSize: 14, fontFace: H_FONT, color: C.navy, bold: true, margin: 0 });
    s12.addText(r.desc, { x: 1.65, y: y + 0.38, w: 7.5, h: 0.45, fontSize: 11, fontFace: B_FONT, color: C.darkGray, margin: 0 });
  });

  // Closing
  s12.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 5.15, w: 1.2, h: 0.03, fill: { color: C.lightBlue } });
  s12.addShape(pres.shapes.RECTANGLE, { x: 1.9, y: 5.15, w: 0.4, h: 0.03, fill: { color: C.red } });

  // Write file
  await pres.writeFile({ fileName: "/home/assets/ABC_Family_Office_Portfolio_Review.pptx" });
  console.log("Done!");
}

main().catch(console.error);
