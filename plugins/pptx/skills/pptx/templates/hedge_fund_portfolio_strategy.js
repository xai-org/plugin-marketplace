const pptxgen = require("pptxgenjs");

async function main() {
  let pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Dragon Portfolio Fund";
  pres.title = "The Dragon Portfolio Strategy";

  const C = {
    bg: "061317", bgAlt: "0D2324", card: "163833",
    mint: "47F19C", green: "40BB84", teal: "1C6B53",
    red: "F0564A", redSoft: "D94E44",
    white: "F0F6F0", gray: "8DA8A0", grayLight: "B8CFC8", grayDark: "5A7A72",
    gold: "F5B731", cyan: "3DD8D8", amber: "F0A830",
    fixedInc: "6BAACC",
  };
  const mkS = () => ({ type: "outer", blur: 10, offset: 3, angle: 135, color: "000000", opacity: 0.35 });
  const TOTAL = 12;

  function addFooter(slide, num) {
    slide.addText(`${num} / ${TOTAL}`, { x: 8.8, y: 5.25, w: 1.0, h: 0.25, fontSize: 8, fontFace: "Calibri", color: C.grayDark, align: "right", margin: 0 });
    slide.addText("CONFIDENTIAL", { x: 0.8, y: 5.25, w: 2, h: 0.25, fontSize: 8, fontFace: "Calibri", color: C.grayDark, charSpacing: 1.5, margin: 0 });
  }

  function addHeader(slide, section, title) {
    slide.addText(section, { x: 0.8, y: 0.2, w: 5, h: 0.3, fontSize: 11, fontFace: "Calibri", bold: true, color: C.green, charSpacing: 3.5, margin: 0 });
    slide.addText(title, { x: 0.8, y: 0.48, w: 8.5, h: 1.0, fontSize: 22, fontFace: "Trebuchet MS", bold: true, color: C.white, margin: 0 });
  }

  // ============================================================
  // SLIDE 1: TITLE
  // ============================================================
  let s1 = pres.addSlide();
  s1.background = { color: C.bg };
  s1.addText("THE DRAGON", { x: 0.8, y: 1.3, w: 8, h: 1.0, fontSize: 54, fontFace: "Trebuchet MS", bold: true, color: C.white, margin: 0 });
  s1.addText("PORTFOLIO", { x: 0.8, y: 2.25, w: 8, h: 0.9, fontSize: 54, fontFace: "Trebuchet MS", bold: true, color: C.mint, margin: 0 });
  s1.addText("An All-Weather Strategy for Growing and Protecting\nWealth Across Every Market Regime", {
    x: 0.8, y: 3.35, w: 7, h: 0.8, fontSize: 16, fontFace: "Calibri", color: C.gray, lineSpacingMultiple: 1.4, margin: 0
  });
  s1.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 4.35, w: 1.2, h: 0.035, fill: { color: C.green } });
  s1.addText("HEDGE FUND STRATEGY OVERVIEW  |  2026", { x: 0.8, y: 4.55, w: 5, h: 0.4, fontSize: 10, fontFace: "Calibri", color: C.grayDark, charSpacing: 3, margin: 0 });

  // ============================================================
  // SLIDE 2: EXECUTIVE SUMMARY
  // ============================================================
  let s2 = pres.addSlide();
  s2.background = { color: C.bg };
  addHeader(s2, "EXECUTIVE SUMMARY", "14.4% CAGR over 100 years by diversifying across regimes, not just asset classes");
  addFooter(s2, 2);

  const summaryItems = [
    { head: "THE PROBLEM", body: "Traditional 60/40 portfolios only perform in growth and disinflation, which represent just 53% of the last century. During the other 47%, investors suffered catastrophic losses.", color: C.red },
    { head: "THE SOLUTION", body: "Five uncorrelated asset classes ensure at least two components produce gains in any environment: equities (24%), long vol (21%), gold (19%), commodity trend (18%), fixed income (18%).", color: C.mint },
    { head: "THE RESULT", body: "14.4% CAGR over 100 years vs. ~9% for 60/40. In 2020, the Dragon returned 52% with an 11% max drawdown vs. 16% return and 33% drawdown for 60/40.", color: C.gold },
  ];
  summaryItems.forEach((item, i) => {
    const x = 0.8 + i * 2.9249;
    s2.addShape(pres.shapes.RECTANGLE, { x, y: 2.0, w: 2.55, h: 2.6, fill: { color: C.card }, shadow: mkS() });
    s2.addShape(pres.shapes.RECTANGLE, { x, y: 2.0, w: 2.55, h: 0.05, fill: { color: item.color } });
    s2.addText(item.head, { x: x + 0.11, y: 2.2, w: 2.3, h: 0.3, fontSize: 15, fontFace: "Trebuchet MS", bold: true, color: item.color, charSpacing: 2, margin: 0 });
    s2.addText(item.body, { x: x + 0.11, y: 2.55, w: 2.37, h: 1.8, fontSize: 11, fontFace: "Calibri", color: C.gray, lineSpacingMultiple: 1.4, margin: 0 });
  });

  // ============================================================
  // SLIDE 3: THE PROBLEM
  // ============================================================
  let s3 = pres.addSlide();
  s3.background = { color: C.bg };
  addHeader(s3, "THE PROBLEM", "60/40 portfolios have failed in 47% of the last century's market regimes");
  addFooter(s3, 3);

  const probStats = [
    { val: "47%", label: "OF LAST 100 YEARS", sub: "spent in Hawk \n(crisis) regimes", color: C.red },
    { val: "96%", label: "LOSS IN REAL TERMS", sub: "\"Buy the dip\" strategy\n1918 to 2018", color: C.red },
    { val: "~0%", label: "REAL BOND YIELD", sub: "Bonds fail as \nPortfolio defense", color: C.amber },
    { val: "0.85", label: "CORRELATION", sub: "Stocks and bonds \nCorrelate in crises", color: C.red },
  ];
  probStats.forEach((s, i) => {
    const x = 0.8 + i * 2.25;
    s3.addShape(pres.shapes.RECTANGLE, { x, y: 2.0, w: 2.0, h: 2.1, fill: { color: C.card }, shadow: mkS() });
    s3.addShape(pres.shapes.RECTANGLE, { x, y: 2.0, w: 2.0, h: 0.05, fill: { color: s.color } });
    s3.addText(s.val, { x, y: 2.15, w: 2.0, h: 0.6, fontSize: 36, fontFace: "Trebuchet MS", bold: true, color: s.color, align: "center", margin: 0 });
    s3.addText(s.label, { x, y: 2.75, w: 2.0, h: 0.25, fontSize: 8, fontFace: "Calibri", bold: true, color: C.grayLight, align: "center", charSpacing: 1.5, margin: 0 });
    s3.addText(s.sub, { x: x + 0.1, y: 3.05, w: 1.8, h: 0.55, fontSize: 11, fontFace: "Calibri", color: C.gray, align: "center", margin: 0, lineSpacingMultiple: 1.2 });
  });

  s3.addText("The assumption that stocks and bonds are anti-correlated is a recency bias. They have moved together more often than not over the full historical record.", {
    x: 0.8, y: 4.5, w: 8.4, h: 0.35, fontSize: 11, fontFace: "Calibri", italic: true, color: C.grayDark, margin: 0
  });

  // ============================================================
  // SLIDE 4: MARKET REGIMES
  // ============================================================
  let s4 = pres.addSlide();
  s4.background = { color: C.bg };
  addHeader(s4, "MARKET REGIMES", "PLACEHOLDER");
  addFooter(s4, 4);

  s4.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.56, w: 4.0, h: 0.45, fill: { color: C.card } });
  s4.addText("SERPENT ERAS: 1947-1963  |  1984-2007", { x: 0.8, y: 1.56, w: 4.0, h: 0.45, fontSize: 16, fontFace: "Calibri", bold: true, color: C.mint, align: "center", valign: "middle", margin: 0 });
  s4.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.55, w: 4.0, h: 0.45, fill: { color: C.card } });
  s4.addText("HAWK ERAS: 1929-1946  |  1964-1983", { x: 5.2, y: 1.55, w: 4.0, h: 0.45, fontSize: 10, fontFace: "Calibri", bold: true, color: C.red, align: "center", valign: "middle", margin: 0 });

  const regimes = [
    { name: "GROWTH", desc: "Rising GDP, earnings expansion, bull markets, credit expansion.", assets: "Winners: Equities, Real Estate", color: C.mint, x: 0.8, y: 2.15 },
    { name: "DEFLATION", desc: "Falling prices, deleveraging, debt defaults, liquidity crises.", assets: "Winners: Long Volatility, Bonds", color: C.cyan, x: 5.2, y: 2.15 },
    { name: "INFLATION", desc: "Rising prices, currency debasement, commodity scarcity, fiat erosion.", assets: "Winners: Gold, Commodity Trend", color: C.gold, x: 0.8, y: 3.75 },
    { name: "STAGFLATION", desc: "Stagnant growth + high inflation, policy impotence.", assets: "Winners: Gold, Trend, Long Vol", color: C.red, x: 5.2, y: 3.75 },
  ];
  regimes.forEach(r => {
    s4.addShape(pres.shapes.RECTANGLE, { x: r.x, y: r.y, w: 4.0, h: 1.4, fill: { color: C.card }, shadow: mkS() });
    s4.addShape(pres.shapes.RECTANGLE, { x: r.x, y: r.y, w: 0.06, h: 1.4, fill: { color: r.color } });
    s4.addText(r.name, { x: r.x + 0.25, y: r.y + 0.1, w: 3.5, h: 0.28, fontSize: 13, fontFace: "Trebuchet MS", bold: true, color: r.color, charSpacing: 2, margin: 0 });
    s4.addText(r.desc, { x: r.x + 0.25, y: r.y + 0.4, w: 3.5, h: 0.45, fontSize: 10, fontFace: "Calibri", color: C.gray, lineSpacingMultiple: 1.25, margin: 0 });
    s4.addText(r.assets, { x: r.x + 0.25, y: r.y + 0.95, w: 3.5, h: 0.25, fontSize: 10, fontFace: "Calibri", bold: true, color: C.grayLight, margin: 0 });
  });

  // ============================================================
  // SLIDE 5: ALLOCATION
  // ============================================================
  let s5 = pres.addSlide();
  s5.background = { color: C.bg };
  addHeader(s5, "THE SOLUTION", "PLACEHOLDER");
  addFooter(s5, 5);

  s5.addChart(pres.charts.DOUGHNUT, [{
    name: "Allocation",
    labels: ["Equities", "Long Volatility", "Gold", "Commodity Trend", "Fixed Income"],
    values: [24, 21, 19, 18, 18],
  }], {
    x: 0.58, y: 1.42, w: 4.5, h: 3.5,
    showPercent: true, dataLabelColor: "FFFFFF", dataLabelFontSize: 10,
    chartColors: [C.mint, C.cyan, C.gold, C.green, C.fixedInc],
    showLegend: false,
  });

  const allocItems = [
    { name: "Equities", pct: "24%", color: C.mint, desc: "Secular growth via US and international stocks" },
    { name: "Long Volatility", pct: "21%", color: C.cyan, desc: "Convex hedging via options strategies" },
    { name: "Gold", pct: "19%", color: C.gold, desc: "Inflation protection and store of value" },
    { name: "Commodity Trend", pct: "18%", color: C.green, desc: "CTA and momentum-based trend following" },
    { name: "Fixed Income", pct: "18%", color: C.fixedInc, desc: "US Treasuries, TIPS, IG bonds" },
  ];
  allocItems.forEach((item, i) => {
    const y = 1.70 + i * 0.65;
    const sx = 4.8;
    s5.addShape(pres.shapes.RECTANGLE, { x: sx, y: y + 0.03, w: 0.2, h: 0.2, fill: { color: item.color } });
    s5.addText(item.pct, { x: sx + 0.425, y: y - 0.04, w: 0.6, h: 0.28, fontSize: 20, fontFace: "Trebuchet MS", bold: true, color: item.color, margin: 0 });
    s5.addText(item.name, { x: sx + 1.17, y: y - 0.08, w: 3.0, h: 0.28, fontSize: 16, fontFace: "Trebuchet MS", bold: true, color: C.white, margin: 0 });
    s5.addText(item.desc, { x: sx + 1.17, y: y + 0.17, w: 3.6, h: 0.22, fontSize: 10.5, fontFace: "Calibri", color: C.gray, margin: 0 });
  });

  // ============================================================
  // SLIDE 6: ASSET CLASS DEEP DIVE
  // ============================================================
  let s6 = pres.addSlide();
  s6.background = { color: C.bg };
  addHeader(s6, "ASSET CLASS DEEP DIVE", "PLACEHOLDER");
  addFooter(s6, 6);

  // Column headers
  s6.addText("Allocation", { x: 0.86, y: 1.56, w: 0.9, h: 0.2, fontSize: 14, fontFace: "Calibri", bold: true, color: C.grayDark, margin: 0 });
  s6.addText("Component", { x: 2.0, y: 1.56, w: 1.5, h: 0.2, fontSize: 14, fontFace: "Calibri", bold: true, color: C.grayDark, margin: 0 });
  s6.addText("Target Regime", { x: 4.0, y: 1.56, w: 1.5, h: 0.2, fontSize: 14, fontFace: "Calibri", bold: true, color: C.grayDark, margin: 0 });
  s6.addText("Implementation", { x: 6.2, y: 1.56, w: 2.0, h: 0.2, fontSize: 14, fontFace: "Calibri", bold: true, color: C.grayDark, margin: 0 });

  const assets = [
    { name: "EQUITIES", pct: "24%", regime: "Growth", impl: "S&P 500, MSCI EAFE, EM", color: C.mint },
    { name: "LONG VOL", pct: "21%", regime: "Crisis / Deflation", impl: "Straddles, tail risk funds", color: C.cyan },
    { name: "GOLD", pct: "19%", regime: "Inflation / Crisis", impl: "GLD, GLDM, physical gold", color: C.gold },
    { name: "COMMODITY", pct: "18%", regime: "Inflation / Deflation", impl: "CTA managers, DBC, COMT", color: C.green },
    { name: "FIXED INC", pct: "18%", regime: "Deflation / Growth", impl: "TLT, TIPS, IG corporates", color: C.fixedInc },
  ];
  assets.forEach((a, i) => {
    const y = 1.8 + i * 0.65;
    s6.addShape(pres.shapes.RECTANGLE, { x: 0.8, y, w: 8.4, h: 0.55, fill: { color: i % 2 === 0 ? C.card : C.bgAlt }, shadow: mkS() });
    s6.addShape(pres.shapes.RECTANGLE, { x: 0.8, y, w: 0.06, h: 0.55, fill: { color: a.color } });
    s6.addText(a.pct, { x: 1.1, y, w: 0.8, h: 0.55, fontSize: 20, fontFace: "Trebuchet MS", bold: true, color: a.color, margin: 0, valign: "middle" });
    s6.addText(a.name, { x: 2.0, y, w: 1.8, h: 0.55, fontSize: 12, fontFace: "Trebuchet MS", bold: true, color: C.white, margin: 0, valign: "middle" });
    s6.addText(a.regime, { x: 4.0, y, w: 2.0, h: 0.55, fontSize: 11, fontFace: "Calibri", bold: true, color: a.color, margin: 0, valign: "middle" });
    s6.addText(a.impl, { x: 6.2, y, w: 2.8, h: 0.55, fontSize: 10, fontFace: "Calibri", color: C.gray, margin: 0, valign: "middle" });
  });

  // ============================================================
  // SLIDE 7: REGIME MATRIX
  // ============================================================
  let s7 = pres.addSlide();
  s7.background = { color: C.bg };
  addHeader(s7, "REGIME MAPPING", "PLACEHOLDER");
  addFooter(s7, 7);

  const hO = (c) => ({ fill: { color: C.bgAlt }, color: c, bold: true, fontSize: 10, align: "center" });
  const cG = (t, s) => ({ text: t, options: { fill: { color: C.card }, color: s ? C.mint : C.grayDark, fontSize: 14, align: "center" } });
  const cA = (t, s) => ({ text: t, options: { fill: { color: C.bgAlt }, color: s ? C.mint : C.grayDark, fontSize: 14, align: "center" } });
  const cR = (t, b) => ({ text: t, options: { fill: { color: b }, color: C.redSoft, fontSize: 14, align: "center" } });

  const tRows = [
    [{ text: "", options: hO(C.white) }, { text: "EQUITIES", options: hO(C.mint) }, { text: "BONDS", options: hO(C.fixedInc) }, { text: "GOLD", options: hO(C.gold) }, { text: "COMMODITY\nTREND", options: hO(C.green) }, { text: "LONG VOL", options: hO(C.cyan) }],
    [{ text: "Growth", options: { fill: { color: C.card }, bold: true, color: C.white, fontSize: 12 } }, cG("\u2605\u2605\u2605", true), cG("\u2605\u2605", true), cG("\u2605", false), cG("\u2605", false), cR("--", C.card)],
    [{ text: "Deflation", options: { fill: { color: C.bgAlt }, bold: true, color: C.white, fontSize: 12 } }, cR("--", C.bgAlt), cA("\u2605\u2605\u2605", true), cA("\u2605\u2605", true), cA("\u2605\u2605", true), cA("\u2605\u2605\u2605", true)],
    [{ text: "Inflation", options: { fill: { color: C.card }, bold: true, color: C.white, fontSize: 12 } }, cG("\u2605", false), cR("--", C.card), cG("\u2605\u2605\u2605", true), cG("\u2605\u2605\u2605", true), cG("\u2605", false)],
    [{ text: "Stagflation", options: { fill: { color: C.bgAlt }, bold: true, color: C.white, fontSize: 12 } }, cR("--", C.bgAlt), cR("--", C.bgAlt), cA("\u2605\u2605\u2605", true), cA("\u2605\u2605", true), cA("\u2605\u2605", true)],
  ];
  s7.addTable(tRows, { x: 0.8, y: 1.6, w: 8.4, colW: [1.4, 1.4, 1.4, 1.4, 1.4, 1.4], rowH: [0.5, 0.55, 0.55, 0.55, 0.55], border: { pt: 0.5, color: C.teal }, fontFace: "Calibri" });

  s7.addText("\u2605\u2605\u2605 = Strong          \u2605\u2605 = Moderate          \u2605 = Marginal          -- = Weak / Negative", { x: 0.8, y: 4.4, w: 8, h: 0.3, fontSize: 10, fontFace: "Calibri", color: C.grayDark });

  // ============================================================
  // SLIDE 8: PERFORMANCE
  // ============================================================
  let s8 = pres.addSlide();
  s8.background = { color: C.bg };
  addHeader(s8, "PERFORMANCE", "14.4% CAGR over 100 years with 3x lower drawdowns in crisis periods");
  addFooter(s8, 8);

  s8.addChart(pres.charts.BAR, [
    { name: "Dragon Portfolio", labels: ["1929-1946\nHawk", "1947-1963\nSerpent", "1964-1983\nHawk", "1984-2007\nSerpent", "2020\nCOVID"], values: [8.2, 12.1, 11.5, 13.8, 52] },
    { name: "60/40 Portfolio", labels: ["1929-1946\nHawk", "1947-1963\nSerpent", "1964-1983\nHawk", "1984-2007\nSerpent", "2020\nCOVID"], values: [2.1, 10.5, 5.8, 12.2, 16] },
  ], {
    x: 0.7, y: 1.45, w: 5.2, h: 3.6, barDir: "col",
    chartColors: [C.mint, C.grayDark],
    catAxisLabelColor: C.gray, valAxisLabelColor: C.gray, catAxisLabelFontSize: 8,
    valGridLine: { color: C.card, size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.grayLight, dataLabelFontSize: 8,
    showLegend: true, legendPos: "b", legendFontSize: 9, legendColor: C.gray,
  });

  const perfStats = [
    { val: "14.4%", label: "CAGR", sub: "100-year backtested return", color: C.mint },
    { val: "52%", label: "2020 RETURN", sub: "vs. 16% for 60/40", color: C.mint },
    { val: "11%", label: "MAX DRAWDOWN", sub: "in 2020 vs. 33% for 60/40", color: C.green },
    { val: "3.2x", label: "OUTPERFORMANCE", sub: "during Hawk (crisis) regimes", color: C.gold },
  ];
  perfStats.forEach((s, i) => {
    const y = 1.55 + i * 0.9;
    s8.addText(s.val, { x: 5.7, y, w: 1.5, h: 0.45, fontSize: 28, fontFace: "Trebuchet MS", bold: true, color: s.color, align: "right", margin: 0 });
    s8.addText(s.label, { x: 7.4, y: y - 0.02, w: 2.3, h: 0.22, fontSize: 10, fontFace: "Calibri", bold: true, color: C.grayLight, charSpacing: 1, margin: 0 });
    s8.addText(s.sub, { x: 7.4, y: y + 0.22, w: 2.3, h: 0.25, fontSize: 10, fontFace: "Calibri", color: C.gray, margin: 0 });
  });

  s8.addText("Note: Performance data is hypothetical and backtested. Past performance is not indicative of future results.", { x: 0.8, y: 5.05, w: 8, h: 0.2, fontSize: 8, fontFace: "Calibri", italic: true, color: C.grayDark });

  // ============================================================
  // SLIDE 9: PORTFOLIO MECHANICS
  // ============================================================
  let s9 = pres.addSlide();
  s9.background = { color: C.bg };
  addHeader(s9, "PORTFOLIO MECHANICS", "CWARP-guided selection plus systematic rebalancing drive compounding returns");
  addFooter(s9, 9);

  // Top row: 2 cards aligned to bottom row width
  const topY = 1.55;
  const topH = 1.5;
  const botY = 3.25;
  const botH = 1.7;
  const colW = 2.1;
  const gap = 0.25;
  const startX = 0.8;

  // Left card: CWARP (spans 2 bottom columns)
  const leftW = colW * 2 + gap;
  s9.addShape(pres.shapes.RECTANGLE, { x: startX, y: topY, w: leftW, h: topH, fill: { color: C.card }, shadow: mkS() });
  s9.addShape(pres.shapes.RECTANGLE, { x: startX, y: topY, w: leftW, h: 0.05, fill: { color: C.mint } });
  s9.addText("CWARP: Measuring What Matters", { x: startX + 0.18, y: topY + 0.18, w: leftW - 0.5, h: 0.3, fontSize: 13, fontFace: "Trebuchet MS", bold: true, color: C.mint, margin: 0 });
  s9.addText("Unlike Sharpe ratio (which measures standalone performance), CWARP measures each asset's contribution to total portfolio wins. Every Dragon component has positive CWARP.", {
    x: startX + 0.18, y: topY + 0.58, w: leftW - 0.5, h: 0.7, fontSize: 10, fontFace: "Calibri", color: C.gray, lineSpacingMultiple: 1.35, margin: 0
  });

  // Right card: Rebalancing (spans 2 bottom columns)
  const rightX = startX + leftW + gap;
  const rightW = colW * 2 + gap;
  s9.addShape(pres.shapes.RECTANGLE, { x: rightX, y: topY, w: rightW, h: topH, fill: { color: C.card }, shadow: mkS() });
  s9.addShape(pres.shapes.RECTANGLE, { x: rightX, y: topY, w: rightW, h: 0.05, fill: { color: C.gold } });
  s9.addText("The Rebalancing Edge", { x: rightX + 0.18, y: topY + 0.18, w: rightW - 0.5, h: 0.3, fontSize: 13, fontFace: "Trebuchet MS", bold: true, color: C.gold, margin: 0 });
  s9.addText("Anti-correlated assets with fixed allocation weights force a disciplined buy-low, sell-high cycle. When gold surges in a crisis, you sell it and buy beaten-down equities at lower cost basis.", {
    x: rightX + 0.18, y: topY + 0.58, w: rightW - 0.5, h: 0.7, fontSize: 10, fontFace: "Calibri", color: C.gray, lineSpacingMultiple: 1.35, margin: 0
  });

  // Bottom row: 4 step cards
  const steps = [
    { num: "1", title: "Crisis Hits", desc: "Markets crash.\nLong vol explodes.\nGold surges.", color: C.red },
    { num: "2", title: "Rebalance", desc: "Sell high-performing\ncrisis assets.\nBuy cheap equities.", color: C.gold },
    { num: "3", title: "Recovery", desc: "Equities recover.\nPortfolio compounds\nat lower cost basis.", color: C.mint },
    { num: "4", title: "Repeat", desc: "Fixed allocations\nforce discipline.\nCycle after cycle.", color: C.green },
  ];
  steps.forEach((st, i) => {
    const x = startX + i * (colW + gap);
    s9.addShape(pres.shapes.RECTANGLE, { x, y: botY, w: colW, h: botH, fill: { color: C.card }, shadow: mkS() });
    s9.addText(st.num, { x, y: botY + 0.1, w: 0.55, h: 0.3, fontSize: 18, fontFace: "Trebuchet MS", bold: true, color: st.color, align: "center", margin: 0 });
    s9.addText(st.title, { x: x + 0.5, y: botY + 0.1, w: 1.5, h: 0.3, fontSize: 12, fontFace: "Trebuchet MS", bold: true, color: C.white, margin: 0 });
    s9.addText(st.desc, { x: x + 0.15, y: botY + 0.5, w: 1.8, h: 1.0, fontSize: 10, fontFace: "Calibri", color: C.gray, align: "center", lineSpacingMultiple: 1.3, margin: 0 });
  });

  // ============================================================
  // SLIDE 10: IMPLEMENTATION
  // ============================================================
  let s10 = pres.addSlide();
  s10.background = { color: C.bg };
  addHeader(s10, "IMPLEMENTATION", "Commingled structure eliminates the \"dead cash\" problem in vol and CTA strategies");
  addFooter(s10, 10);

  const implHeader = [
    { text: "COMPONENT", options: { fill: { color: C.teal }, color: C.white, bold: true, fontSize: 11 } },
    { text: "ALLOCATION", options: { fill: { color: C.teal }, color: C.white, bold: true, fontSize: 11, align: "center" } },
    { text: "INSTRUMENTS", options: { fill: { color: C.teal }, color: C.white, bold: true, fontSize: 11 } },
    { text: "APPROACH", options: { fill: { color: C.teal }, color: C.white, bold: true, fontSize: 11 } },
  ];
  const makeRow = (name, pct, instr, approach, nameColor, bgColor) => [
    { text: name, options: { fill: { color: bgColor }, color: nameColor, bold: true, fontSize: 11, valign: "middle" } },
    { text: pct, options: { fill: { color: bgColor }, color: C.white, fontSize: 12, align: "center", bold: true } },
    { text: instr, options: { fill: { color: bgColor }, color: C.gray, fontSize: 10 } },
    { text: approach, options: { fill: { color: bgColor }, color: C.gray, fontSize: 10 } },
  ];
  const implRows = [
    implHeader,
    makeRow("Equities", "24%", "S&P 500, MSCI World, EM ETFs", "Passive + selective active", C.mint, C.card),
    makeRow("Long Volatility", "21%", "Vol strategies, tail risk funds", "Active management required", C.cyan, C.bgAlt),
    makeRow("Gold", "19%", "GLD, GLDM, physical gold", "Passive, buy-and-hold", C.gold, C.card),
    makeRow("Commodity Trend", "18%", "CTA funds, managed futures", "Active, systematic CTAs", C.green, C.bgAlt),
    makeRow("Fixed Income", "18%", "TLT, TIPS, IG corporates", "Passive, duration-managed", C.fixedInc, C.card),
  ];
  s10.addTable(implRows, { x: 0.8, y: 1.55, w: 8.4, colW: [2.0, 1.2, 2.8, 2.4], rowH: [0.38, 0.38, 0.38, 0.38, 0.38, 0.38], border: { pt: 0.5, color: C.teal }, fontFace: "Calibri" });

  s10.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 4.0, w: 8.4, h: 0.8, fill: { color: C.card }, shadow: mkS() });
  s10.addText("Cash Efficiency is Critical", { x: 1.1, y: 4.08, w: 5, h: 0.22, fontSize: 12, fontFace: "Trebuchet MS", bold: true, color: C.gold, margin: 0 });
  s10.addText("Vol and CTA strategies typically deploy only 2 to 20% of invested capital. A commingled fund structure deploys excess capital across other asset classes, eliminating up to 28% of dead cash.", {
    x: 1.1, y: 4.32, w: 7.8, h: 0.4, fontSize: 10, fontFace: "Calibri", color: C.gray, lineSpacingMultiple: 1.2, margin: 0
  });

  // ============================================================
  // SLIDE 11: WHY NOW
  // ============================================================
  let s11 = pres.addSlide();
  s11.background = { color: C.bg };
  addHeader(s11, "MARKET OUTLOOK", "PLACEHOLDER");
  addFooter(s11, 11);

  const whyNow = [
    { title: "Inflation Uncertainty", desc: "Central banks face persistent inflationary pressures. Traditional bonds offer negative real yields. Gold and commodity trend step in.", color: C.gold },
    { title: "Elevated Valuations", desc: "Equity markets at historically stretched multiples. Long volatility provides asymmetric downside protection when it matters most.", color: C.cyan },
    { title: "Regime Transition", desc: "We may be entering a Hawk period similar to 1964 to 1983. The 60/40 portfolio failed spectacularly during that era.", color: C.red },
    { title: "Correlation Breakdown", desc: "Stocks and bonds have increasingly moved together, invalidating the core premise of traditional diversification.", color: C.mint },
  ];
  whyNow.forEach((w, i) => {
    const y = 1.55 + i * 0.95;
    s11.addShape(pres.shapes.RECTANGLE, { x: 0.8, y, w: 8.4, h: 0.8, fill: { color: C.card }, shadow: mkS() });
    s11.addShape(pres.shapes.RECTANGLE, { x: 0.8, y, w: 0.06, h: 0.8, fill: { color: w.color } });
    s11.addText(w.title, { x: 1.15, y: y + 0.05, w: 3, h: 0.3, fontSize: 15, fontFace: "Trebuchet MS", bold: true, color: w.color, margin: 0 });
    s11.addText(w.desc, { x: 1.15, y: y + 0.4, w: 7.8, h: 0.3, fontSize: 10.5, fontFace: "Calibri", color: C.gray, margin: 0 });
  });

  // ============================================================
  // SLIDE 12: CLOSING + NEXT STEPS
  // ============================================================
  let s12 = pres.addSlide();
  s12.background = { color: C.bg };
  s12.addText("THE DRAGON", { x: 0.8, y: 0.8, w: 8.5, h: 0.8, fontSize: 46, fontFace: "Trebuchet MS", bold: true, color: C.white, margin: 0 });
  s12.addText("PORTFOLIO", { x: 0.8, y: 1.55, w: 8.5, h: 0.8, fontSize: 46, fontFace: "Trebuchet MS", bold: true, color: C.mint, margin: 0 });
  s12.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 2.45, w: 1.2, h: 0.035, fill: { color: C.green } });
  s12.addText("Grow and protect wealth across every market regime.\nOne portfolio. Every environment. A century of resilience.", {
    x: 0.8, y: 2.7, w: 6.5, h: 0.6, fontSize: 15, fontFace: "Calibri", color: C.gray, lineSpacingMultiple: 1.4, margin: 0
  });

  s12.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 3.6, w: 8.4, h: 1.4, fill: { color: C.card }, shadow: mkS() });
  s12.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 3.6, w: 8.4, h: 0.05, fill: { color: C.mint } });
  s12.addText("NEXT STEPS", { x: 1.05, y: 3.77, w: 3, h: 0.3, fontSize: 14, fontFace: "Trebuchet MS", bold: true, color: C.mint, charSpacing: 2, margin: 0 });
  s12.addText([
    { text: "1.  Schedule a deep-dive meeting to review portfolio construction and risk parameters", options: { breakLine: true, fontSize: 12, color: C.grayLight } },
    { text: "2.  Request the Due Diligence Questionnaire (DDQ) and audited track record", options: { breakLine: true, fontSize: 12, color: C.grayLight } },
    { text: "3.  Discuss allocation sizing, fee structure, and onboarding timeline", options: { fontSize: 12, color: C.grayLight } },
  ], { x: 1.05, y: 4.12, w: 7.8, h: 0.7, fontFace: "Calibri", margin: 0, lineSpacingMultiple: 1.4 });

  s12.addText("CONFIDENTIAL  |  FOR QUALIFIED INVESTORS ONLY  |  2026", { x: 0.8, y: 5.15, w: 5, h: 0.25, fontSize: 9, fontFace: "Calibri", color: C.grayDark, charSpacing: 2, margin: 0 });

  await pres.writeFile({ fileName: "/home/assets/Dragon_Portfolio_Strategy_Uploaded.pptx" });
  console.log("Done!");
}

main().catch(console.error);
