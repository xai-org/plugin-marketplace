// Russell 2000 — Halo Companies Investment Thesis
// Recreated with pptxgenjs

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333" x 7.5"
pres.title = "Halo Companies of the Russell 2000";
pres.author = "Equity Research";

// Palette
const NAVY = "0E1726";
const NAVY_DEEP = "0A1220";
const CREAM = "F4F0E6";
const CREAM_LIGHT = "F7F3EA";
const CREAM_HIGHLIGHT = "EFE6CF";
const GOLD = "B8923A";
const GOLD_DARK = "8C6F2C";
const GOLD_LIGHT = "E8D9A8";
const RED = "7A1F1F";
const TEXT_DARK = "0E1726";
const TEXT_MUTED = "6B6F76";
const TEXT_MUTED_DARK = "9CA0A8";
const RULE_LIGHT = "D8D3C4";
const WHITE = "FFFFFF";

const FONT_HEAD = "Calibri";
const FONT_BODY = "Calibri";

const SLIDE_W = 13.333;
const SLIDE_H = 7.5;

// ======================================================================
// SLIDE 1 — TITLE / COVER
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  // Big gold circle, top-right (partially off-canvas)
  s.addShape(pres.shapes.OVAL, {
    x: 9.4, y: -2.2, w: 6.6, h: 6.6,
    fill: { color: GOLD_DARK },
    line: { type: "none" },
  });

  // Outlined circle, bottom-right
  s.addShape(pres.shapes.OVAL, {
    x: 10.9, y: 4.4, w: 1.9, h: 1.9,
    fill: { type: "none" },
    line: { color: TEXT_MUTED_DARK, width: 1 },
  });

  // Eyebrow: small ring + label
  s.addShape(pres.shapes.OVAL, {
    x: 0.7, y: 0.66, w: 0.18, h: 0.18,
    fill: { type: "none" },
    line: { color: GOLD, width: 1.25 },
  });
  s.addText("2026 INVESTMENT THESIS", {
    x: 1.0, y: 0.55, w: 6, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true,
    color: GOLD, charSpacing: 6, valign: "middle", margin: 0,
  });

  // Title
  s.addText("Halo Companies of the Russell 2000", {
    x: 0.7, y: 2.7, w: 11.5, h: 1.9,
    fontFace: FONT_HEAD, fontSize: 60, bold: true,
    color: CREAM, valign: "top", margin: 0,
  });

  // Subhead
  s.addText("Where high-asset, low-obsolescence small caps meet a small-cap index repricing.", {
    x: 0.7, y: 4.7, w: 7.6, h: 0.9,
    fontFace: FONT_BODY, fontSize: 16,
    color: TEXT_MUTED_DARK, valign: "top", margin: 0,
  });

  // Bottom-left credit
  s.addText("EQUITY RESEARCH · APRIL 2026", {
    x: 0.7, y: 6.85, w: 6, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 11, bold: false,
    color: TEXT_MUTED_DARK, charSpacing: 6, valign: "middle", margin: 0,
  });
}

// ======================================================================
// SLIDE 2 — THE HALO DEFINITION (table-ish + quadrant chart)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  s.addText("THE HALO DEFINITION", {
    x: 0.7, y: 0.55, w: 8, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 12, bold: false,
    color: TEXT_MUTED, charSpacing: 6, valign: "middle", margin: 0,
  });

  s.addText("A Halo company carries a heavy asset base and a durable business model.", {
    x: 0.7, y: 1.0, w: 12, h: 1.6,
    fontFace: FONT_HEAD, fontSize: 36, bold: true,
    color: TEXT_DARK, valign: "top", margin: 0,
  });

  // Top divider line above the rows
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 2.55, w: 6.4, h: 0,
    line: { color: RULE_LIGHT, width: 1 },
  });

  // Four definition rows on the left
  const rows = [
    { label: "HIGH ASSETS", body: "Tangible balance sheet — real estate, infrastructure, lending books, plant & equipment, deposits." },
    { label: "LOW OBSOLESCENCE", body: "Demand profile that resists technology disruption, secular substitution, or platform shifts." },
    { label: "CASH-GENERATIVE", body: "Profitable today, not promising profitability later. Net income is the entry ticket." },
    { label: "DOMESTICALLY ANCHORED", body: "Revenues tied to U.S. economic activity, insulated from global multinational drag." },
  ];
  const rowY0 = 2.75;
  const rowH = 0.95;
  rows.forEach((r, i) => {
    const ry = rowY0 + i * rowH;
    s.addText(r.label, {
      x: 0.7, y: ry, w: 1.9, h: rowH - 0.2,
      fontFace: FONT_HEAD, fontSize: 11, bold: true,
      color: TEXT_DARK, charSpacing: 3, valign: "top", margin: 0,
    });
    s.addText(r.body, {
      x: 2.75, y: ry, w: 4.3, h: rowH - 0.1,
      fontFace: FONT_BODY, fontSize: 12,
      color: TEXT_DARK, valign: "top", margin: 0,
    });
    // divider under each row
    s.addShape(pres.shapes.LINE, {
      x: 0.7, y: ry + rowH - 0.1, w: 6.4, h: 0,
      line: { color: RULE_LIGHT, width: 0.75 },
    });
  });

  // ---- Quadrant chart on the right ----
  const qx = 7.7, qy = 2.55, qw = 4.95, qh = 4.0;
  // outer frame
  s.addShape(pres.shapes.RECTANGLE, {
    x: qx, y: qy, w: qw, h: qh,
    fill: { color: CREAM_LIGHT },
    line: { color: TEXT_MUTED, width: 0.5 },
  });
  // shaded upper-right "halo" quadrant
  s.addShape(pres.shapes.RECTANGLE, {
    x: qx + qw / 2, y: qy, w: qw / 2, h: qh / 2,
    fill: { color: CREAM_HIGHLIGHT },
    line: { type: "none" },
  });
  // crosshair lines
  s.addShape(pres.shapes.LINE, {
    x: qx, y: qy + qh / 2, w: qw, h: 0,
    line: { color: TEXT_MUTED, width: 0.75 },
  });
  s.addShape(pres.shapes.LINE, {
    x: qx + qw / 2, y: qy, w: 0, h: qh,
    line: { color: TEXT_MUTED, width: 0.75 },
  });

  // Axis labels — top
  s.addText("LOW OBSOLESCENCE", {
    x: qx, y: qy - 0.05, w: qw, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10,
    color: TEXT_MUTED, charSpacing: 4, align: "center", valign: "middle", margin: 0,
  });
  // bottom
  s.addText("HIGH OBSOLESCENCE", {
    x: qx, y: qy + qh - 0.25, w: qw, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10,
    color: TEXT_MUTED, charSpacing: 4, align: "center", valign: "middle", margin: 0,
  });
  // left (rotated)
  s.addText("LIGHT ASSETS", {
    x: qx - 0.6, y: qy + qh / 2 - 0.65, w: 1.4, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10,
    color: TEXT_MUTED, charSpacing: 4, align: "center", valign: "middle",
    rotate: 270, margin: 0,
  });
  // right (rotated)
  s.addText("HEAVY ASSETS", {
    x: qx + qw - 0.8, y: qy + qh / 2 + 0.4, w: 1.4, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10,
    color: TEXT_MUTED, charSpacing: 4, align: "center", valign: "middle",
    rotate: 270, margin: 0,
  });

  // Dots: two non-halo grey dots and one Halo gold dot
  // halo zone gold dot (upper-right)
  s.addShape(pres.shapes.OVAL, {
    x: qx + qw * 0.78, y: qy + qh * 0.20, w: 0.18, h: 0.18,
    fill: { color: GOLD }, line: { type: "none" },
  });
  s.addText("Halo zone", {
    x: qx + qw * 0.78 + 0.22, y: qy + qh * 0.20 - 0.05, w: 1.2, h: 0.3,
    fontFace: FONT_BODY, fontSize: 11, color: TEXT_DARK, valign: "middle", margin: 0,
  });
  // upper-left grey dot
  s.addShape(pres.shapes.OVAL, {
    x: qx + qw * 0.28, y: qy + qh * 0.30, w: 0.18, h: 0.18,
    fill: { color: "C9C4B4" }, line: { type: "none" },
  });
  // lower-left grey dot
  s.addShape(pres.shapes.OVAL, {
    x: qx + qw * 0.22, y: qy + qh * 0.78, w: 0.18, h: 0.18,
    fill: { color: "C9C4B4" }, line: { type: "none" },
  });
  // lower-right grey dot
  s.addShape(pres.shapes.OVAL, {
    x: qx + qw * 0.62, y: qy + qh * 0.72, w: 0.18, h: 0.18,
    fill: { color: "C9C4B4" }, line: { type: "none" },
  });

  // Quadrant caption
  s.addText("The upper-right quadrant — heavy assets, durable demand — is where Halo names cluster.", {
    x: qx, y: qy + qh + 0.15, w: qw, h: 0.5,
    fontFace: FONT_BODY, fontSize: 10, color: TEXT_MUTED, valign: "top", margin: 0,
  });

  // Footer rule + section markers
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 7.0, w: 11.9, h: 0,
    line: { color: RULE_LIGHT, width: 0.75 },
  });
  s.addText("01 / DEFINING HALO", {
    x: 0.7, y: 7.1, w: 4, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10, color: TEXT_MUTED, charSpacing: 4, valign: "middle", margin: 0,
  });
  s.addText("HALO COMPANIES · RUSSELL 2000", {
    x: 7.6, y: 7.1, w: 5, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10, color: TEXT_MUTED, charSpacing: 4, align: "right", valign: "middle", margin: 0,
  });
}

// ======================================================================
// SLIDE 3 — SECTION ONE / WHY SMALL CAPS
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  // Eyebrow
  s.addText("SECTION ONE", {
    x: 0.7, y: 0.55, w: 6, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 12,
    color: GOLD, charSpacing: 5, valign: "middle", margin: 0,
  });
  // Short underline beneath eyebrow
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 0.95, w: 0.9, h: 0,
    line: { color: GOLD, width: 1.25 },
  });

  // Big section title
  s.addText("Why small caps, and why now.", {
    x: 0.7, y: 1.5, w: 12, h: 1.5,
    fontFace: FONT_HEAD, fontSize: 54, bold: true,
    color: CREAM, valign: "top", margin: 0,
  });

  // Lead-in paragraph
  s.addText("Three forces have realigned at the same time — easing rates, broadening earnings, and a 25-year valuation low.", {
    x: 0.7, y: 3.4, w: 11.5, h: 0.6,
    fontFace: FONT_BODY, fontSize: 16,
    color: TEXT_MUTED_DARK, valign: "top", margin: 0,
  });

  // Three columns
  const colData = [
    { tag: "01 · RATES",     stat: "3.50–3.75%", body: "Three consecutive 0.25% Fed cuts in late 2025 lowered borrowing costs for floating-rate small-cap balance sheets." },
    { tag: "02 · EARNINGS",  stat: "+19% EPS",   body: "Russell 2000 2026 EPS growth (Jefferies) — outpacing the 12% projected for large caps as the earnings recession ends." },
    { tag: "03 · VALUATION", stat: "25-yr low",  body: "EV/EBIT for the Russell 2000 vs. Russell 1000 sits near the low end of its 25-year relative range." },
  ];
  const colY = 4.5;
  const colW = 3.85;
  const colGap = 0.25;
  const startX = 0.7;
  colData.forEach((c, i) => {
    const cx = startX + i * (colW + colGap);
    // Top rule
    s.addShape(pres.shapes.LINE, {
      x: cx, y: colY, w: colW, h: 0,
      line: { color: GOLD, width: 0.75 },
    });
    s.addText(c.tag, {
      x: cx, y: colY + 0.12, w: colW, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 12, bold: true,
      color: GOLD, charSpacing: 5, valign: "middle", margin: 0,
    });
    s.addText(c.stat, {
      x: cx, y: colY + 0.5, w: colW, h: 0.95,
      fontFace: FONT_HEAD, fontSize: 40, bold: true,
      color: CREAM, valign: "top", margin: 0,
    });
    s.addText(c.body, {
      x: cx, y: colY + 1.55, w: colW, h: 1.4,
      fontFace: FONT_BODY, fontSize: 12,
      color: TEXT_MUTED_DARK, valign: "top", margin: 0,
    });
  });
}

// ======================================================================
// SLIDE 4 — RUSSELL 2000 TOTAL RETURN + 2026 OUTLOOK
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  s.addText("RUSSELL 2000 · TOTAL RETURN + 2026 OUTLOOK", {
    x: 0.7, y: 0.55, w: 11, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 12,
    color: TEXT_MUTED, charSpacing: 5, valign: "middle", margin: 0,
  });

  s.addText("A reset year, a recovery, and an accelerating 2026.", {
    x: 0.7, y: 1.0, w: 12, h: 0.9,
    fontFace: FONT_HEAD, fontSize: 32, bold: true,
    color: TEXT_DARK, valign: "top", margin: 0,
  });

  // ---- BAR CHART (left) ----
  // Categories and values in the order shown on the slide
  const catLabels = ["2022", "2023", "2024", "2025", "2026 E\nGoldman", "2026 E\nJefferies", "2026 EPS\nconsensus"];
  // Three series so we get the colored grouping (drawdown / historical / forecast)
  // For grouped/clustered bar in PptxGenJS we set barGrouping: 'clustered' but we want stacked-effect of single bar per category with different colors.
  // Trick: use a single series and color by data-point via chartColors plus chartColorsOpacity won't change per-bar color reliably across viewers.
  // Instead build three series where only one has a value per category, others are 0 — this paints each bar in the matching series color.
  const drawdown   = [-20.4, 0,    0,    0,    0,    0,    0   ];
  const historical = [0,     16.9, 11.5, 12.8, 0,    0,    0   ];
  const forecast2026   = [0, 0,    0,    0,    10.0, 14.0, 0   ];
  const epsConsensus   = [0, 0,    0,    0,    0,    0,    19.0];

  const chartData = [
    { name: "Drawdown year",       labels: catLabels, values: drawdown },
    { name: "Historical total return", labels: catLabels, values: historical },
    { name: "2026 forecast",       labels: catLabels, values: forecast2026 },
    { name: "2026 EPS consensus",  labels: catLabels, values: epsConsensus },
  ];

  s.addChart(pres.charts.BAR, chartData, {
    x: 0.55, y: 2.0, w: 7.6, h: 4.6,
    barDir: "col",
    barGrouping: "clustered",
    chartColors: [RED, NAVY, GOLD_LIGHT, GOLD],
    chartArea: { fill: { color: CREAM }, border: { pt: 0, color: CREAM } },
    plotArea: { fill: { color: CREAM } },
    catAxisLabelColor: TEXT_MUTED,
    catAxisLabelFontFace: FONT_BODY,
    catAxisLabelFontSize: 10,
    valAxisLabelColor: TEXT_MUTED,
    valAxisLabelFontFace: FONT_BODY,
    valAxisLabelFontSize: 9,
    valGridLine: { style: "none" },
    catGridLine: { style: "none" },
    valAxisHidden: true,
    showValue: true,
    dataLabelFormatCode: '+0.0"%";\\-0.0"%";;',
    dataLabelFontSize: 11,
    dataLabelFontBold: true,
    dataLabelColor: TEXT_DARK,
    dataLabelPosition: "outEnd",
    showLegend: true,
    legendPos: "b",
    legendColor: TEXT_MUTED,
    legendFontFace: FONT_BODY,
    legendFontSize: 10,
    barGapWidthPct: 70,
  });

  // ---- Right column: 3 callout cards ----
  const cardX = 8.55;
  const cardW = 4.1;

  // Card 1 — 2025 close (white card, dark text)
  s.addShape(pres.shapes.RECTANGLE, {
    x: cardX, y: 2.0, w: cardW, h: 1.55,
    fill: { color: WHITE }, line: { color: RULE_LIGHT, width: 0.75 },
  });
  s.addText("2025 CLOSE", {
    x: cardX + 0.25, y: 2.1, w: cardW - 0.5, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 11, color: TEXT_MUTED, charSpacing: 5, valign: "middle", margin: 0,
  });
  s.addText("+12.8%", {
    x: cardX + 0.25, y: 2.4, w: cardW - 0.5, h: 0.65,
    fontFace: FONT_HEAD, fontSize: 30, bold: true, color: TEXT_DARK, valign: "top", margin: 0,
  });
  s.addText("Lagged Nasdaq 100 (+21.2%) and S&P 500 (+17.9%), but finished the year on a sharp rotation rally.", {
    x: cardX + 0.25, y: 3.0, w: cardW - 0.5, h: 0.6,
    fontFace: FONT_BODY, fontSize: 11, color: TEXT_DARK, valign: "top", margin: 0,
  });

  // Card 2 — 2026 sell-side range (dark card)
  s.addShape(pres.shapes.RECTANGLE, {
    x: cardX, y: 3.7, w: cardW, h: 1.6,
    fill: { color: NAVY }, line: { type: "none" },
  });
  s.addText("2026 SELL-SIDE RANGE", {
    x: cardX + 0.25, y: 3.8, w: cardW - 0.5, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 11, color: GOLD, charSpacing: 5, valign: "middle", margin: 0,
  });
  s.addText("+10% to +14%", {
    x: cardX + 0.25, y: 4.1, w: cardW - 0.5, h: 0.7,
    fontFace: FONT_HEAD, fontSize: 30, bold: true, color: CREAM, valign: "top", margin: 0,
  });
  s.addText("Goldman: 10% baseline, anchored to 2.6% real GDP. Jefferies: 14%, year-end target of 2,825.", {
    x: cardX + 0.25, y: 4.75, w: cardW - 0.5, h: 0.6,
    fontFace: FONT_BODY, fontSize: 11, color: TEXT_MUTED_DARK, valign: "top", margin: 0,
  });

  // Card 3 — Earnings > Multiples (cream highlight, gold left bar)
  s.addShape(pres.shapes.RECTANGLE, {
    x: cardX, y: 5.45, w: cardW, h: 1.3,
    fill: { color: CREAM_HIGHLIGHT }, line: { type: "none" },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: cardX, y: 5.45, w: 0.06, h: 1.3,
    fill: { color: GOLD }, line: { type: "none" },
  });
  s.addText("EARNINGS  >  MULTIPLES", {
    x: cardX + 0.25, y: 5.55, w: cardW - 0.5, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 11, color: GOLD_DARK, charSpacing: 5, valign: "middle", margin: 0,
  });
  s.addText([
    { text: "Consensus Russell 2000 EPS growth of " },
    { text: "~19%", options: { bold: true } },
    { text: " drives the case — vs. ~12% for large caps." },
  ], {
    x: cardX + 0.25, y: 5.85, w: cardW - 0.5, h: 0.85,
    fontFace: FONT_BODY, fontSize: 12, color: TEXT_DARK, valign: "top", margin: 0,
  });

  // Footer
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 7.0, w: 11.9, h: 0,
    line: { color: RULE_LIGHT, width: 0.75 },
  });
  s.addText("02 / RETURNS", {
    x: 0.7, y: 7.1, w: 4, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10, color: TEXT_MUTED, charSpacing: 4, valign: "middle", margin: 0,
  });
  s.addText("SOURCES: FTSE RUSSELL, JEFFERIES, GOLDMAN SACHS (DEC 2025–JAN 2026)", {
    x: 5.5, y: 7.1, w: 7.1, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10, color: TEXT_MUTED, charSpacing: 4, align: "right", valign: "middle", margin: 0,
  });
}

// ======================================================================
// SLIDE 5 — HALO SCREEN — TOP THREE BY NET INCOME
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  s.addText("HALO SCREEN — TOP THREE BY NET INCOME", {
    x: 0.7, y: 0.55, w: 11, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 12, color: TEXT_MUTED, charSpacing: 5, valign: "middle", margin: 0,
  });

  s.addText("Three Russell 2000 names that fit the Halo profile.", {
    x: 0.7, y: 1.0, w: 12, h: 0.9,
    fontFace: FONT_HEAD, fontSize: 32, bold: true, color: TEXT_DARK, valign: "top", margin: 0,
  });

  s.addText("Filtered for: profitable in 2025, total assets greater than $10B, business model durable across rate regimes and technology cycles.", {
    x: 0.7, y: 2.05, w: 11.5, h: 0.7,
    fontFace: FONT_BODY, fontSize: 16, color: TEXT_DARK, valign: "top", margin: 0,
  });

  // Three big stat columns
  const stats = [
    { big: "$10B+", label: "TOTAL ASSETS FLOOR",  body: 'Heavy balance sheets — the "halo" component.' },
    { big: "10+ yrs", label: "OPERATING HISTORY", body: "Tested through 2008, 2020, and the 2022–2023 rate shock." },
    { big: "5%+",    label: "SUSTAINED NET MARGIN", body: "Profitable through cycle, not narrative-driven." },
  ];
  const sx0 = 0.7, sw = 3.85, sgap = 0.25, sy0 = 3.5;
  stats.forEach((st, i) => {
    const x = sx0 + i * (sw + sgap);
    s.addText(st.big, {
      x, y: sy0, w: sw, h: 1.05,
      fontFace: FONT_HEAD, fontSize: 56, bold: true,
      color: GOLD, valign: "top", margin: 0,
    });
    s.addText(st.label, {
      x, y: sy0 + 1.15, w: sw, h: 0.35,
      fontFace: FONT_HEAD, fontSize: 13, color: TEXT_MUTED, charSpacing: 5, valign: "middle", margin: 0,
    });
    s.addText(st.body, {
      x, y: sy0 + 1.6, w: sw, h: 0.9,
      fontFace: FONT_BODY, fontSize: 12, color: TEXT_DARK, valign: "top", margin: 0,
    });
  });

  // Footer
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 7.0, w: 11.9, h: 0,
    line: { color: RULE_LIGHT, width: 0.75 },
  });
  s.addText("03 / THE HALO THREE", {
    x: 0.7, y: 7.1, w: 4, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10, color: TEXT_MUTED, charSpacing: 4, valign: "middle", margin: 0,
  });
  s.addText("SCREENING UNIVERSE: RUSSELL 2000 CONSTITUENTS, FY2025", {
    x: 5.5, y: 7.1, w: 7.1, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10, color: TEXT_MUTED, charSpacing: 4, align: "right", valign: "middle", margin: 0,
  });
}

// ======================================================================
// SLIDE 6 — HALO THREE — PROFILE (3 cards)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  s.addText("HALO THREE — PROFILE", {
    x: 0.7, y: 0.55, w: 11, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 12, color: TEXT_MUTED, charSpacing: 5, valign: "middle", margin: 0,
  });

  s.addText("Asset-rich, durable, and profitable today.", {
    x: 0.7, y: 1.0, w: 12, h: 0.9,
    fontFace: FONT_HEAD, fontSize: 32, bold: true, color: TEXT_DARK, valign: "top", margin: 0,
  });

  // 3 profile cards
  const cards = [
    {
      no: "NO. 01", name: "Starwood Property Trust", ticker: "NYSE : STWD",
      kvs: [["NET INCOME","~$420M"], ["TOTAL ASSETS","~$66B"], ["SECTOR","Mortgage REIT"], ["DIVIDEND","10.9%"]],
      body: "Diversified commercial real-estate lender across the U.S., Europe, and Australia. Loan portfolio spans commercial, residential and infrastructure assets at a sub-3× leverage ratio. Dividend has not been cut since IPO 15+ years ago.",
    },
    {
      no: "NO. 02", name: "UMB Financial", ticker: "NASDAQ : UMBF",
      kvs: [["NET INCOME","~$510M"], ["TOTAL ASSETS","~$68B"], ["SECTOR","Regional Bank"], ["LINEAGE","Since 1913"]],
      body: "Multi-segment financial services franchise with deep deposit base, commercial banking, institutional and asset-servicing arms. Earnings stability across rate cycles; balance sheet that compounds rather than depreciates.",
    },
    {
      no: "NO. 03", name: "Main Street Capital", ticker: "NYSE : MAIN",
      kvs: [["NET INCOME","~$385M"], ["TOTAL ASSETS","~$7.6B"], ["SECTOR","BDC"], ["DIVIDEND","5.6% mo."]],
      body: 'Lower-middle-market lender with 200+ portfolio companies. Investment-grade BBB− credit, debt levels well below regulatory ceiling, and one of the few monthly dividends with a "Safe" Dividend Safety Score.',
    },
  ];

  const cx0 = 0.7, cw = 3.95, cgap = 0.2, cy = 2.0, ch = 4.85;
  cards.forEach((c, i) => {
    const x = cx0 + i * (cw + cgap);
    // Card background
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cy, w: cw, h: ch,
      fill: { color: CREAM_LIGHT }, line: { color: RULE_LIGHT, width: 0.75 },
    });

    // Top: NO. xx (left, gold) and HALO badge (right)
    s.addText(c.no, {
      x: x + 0.25, y: cy + 0.2, w: 1.5, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 11, color: GOLD, charSpacing: 5, valign: "middle", margin: 0,
    });
    // Halo dot + label
    s.addShape(pres.shapes.OVAL, {
      x: x + cw - 1.05, y: cy + 0.27, w: 0.13, h: 0.13,
      fill: { color: GOLD }, line: { type: "none" },
    });
    s.addText("HALO", {
      x: x + cw - 0.85, y: cy + 0.2, w: 0.7, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 11, bold: true, color: GOLD, charSpacing: 5, valign: "middle", margin: 0,
    });

    // Name
    s.addText(c.name, {
      x: x + 0.25, y: cy + 0.5, w: cw - 0.5, h: 0.5,
      fontFace: FONT_HEAD, fontSize: 19, bold: true, color: TEXT_DARK, valign: "top", margin: 0,
    });
    // Ticker
    s.addText(c.ticker, {
      x: x + 0.25, y: cy + 1.0, w: cw - 0.5, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 11, color: TEXT_MUTED, charSpacing: 4, valign: "middle", margin: 0,
    });

    // Divider
    s.addShape(pres.shapes.LINE, {
      x: x + 0.25, y: cy + 1.4, w: cw - 0.5, h: 0,
      line: { color: RULE_LIGHT, width: 0.5 },
    });

    // 2x2 key/values
    const kvX0 = x + 0.25;
    const kvY0 = cy + 1.55;
    const kvColW = (cw - 0.5) / 2;
    c.kvs.forEach((kv, idx) => {
      const r = Math.floor(idx / 2);
      const cidx = idx % 2;
      const kvx = kvX0 + cidx * kvColW;
      const kvy = kvY0 + r * 0.65;
      s.addText(kv[0], {
        x: kvx, y: kvy, w: kvColW, h: 0.25,
        fontFace: FONT_HEAD, fontSize: 9, color: TEXT_MUTED, charSpacing: 4, valign: "middle", margin: 0,
      });
      s.addText(kv[1], {
        x: kvx, y: kvy + 0.25, w: kvColW, h: 0.32,
        fontFace: FONT_HEAD, fontSize: 14, bold: true, color: TEXT_DARK, valign: "middle", margin: 0,
      });
    });

    // Divider before body
    s.addShape(pres.shapes.LINE, {
      x: x + 0.25, y: cy + 3.0, w: cw - 0.5, h: 0,
      line: { color: RULE_LIGHT, width: 0.5 },
    });

    // Body
    s.addText(c.body, {
      x: x + 0.25, y: cy + 3.15, w: cw - 0.5, h: ch - 3.3,
      fontFace: FONT_BODY, fontSize: 11.5, color: TEXT_DARK, valign: "top", margin: 0,
    });
  });

  // Footer
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 7.0, w: 11.9, h: 0,
    line: { color: RULE_LIGHT, width: 0.75 },
  });
  s.addText("04 / THE HALO THREE", {
    x: 0.7, y: 7.1, w: 4, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10, color: TEXT_MUTED, charSpacing: 4, valign: "middle", margin: 0,
  });
  s.addText("FIGURES BASED ON FY2025 REPORTED RESULTS, ROUNDED", {
    x: 5.5, y: 7.1, w: 7.1, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10, color: TEXT_MUTED, charSpacing: 4, align: "right", valign: "middle", margin: 0,
  });
}

// ======================================================================
// SLIDE 7 — HALO LOGIC · THREE PILLARS
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  s.addText("HALO LOGIC · THREE PILLARS MAPPED TO THREE NAMES", {
    x: 0.7, y: 0.55, w: 11, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 12, color: TEXT_MUTED, charSpacing: 5, valign: "middle", margin: 0,
  });

  s.addText("Heavy where it counts. Light on disruption risk.", {
    x: 0.7, y: 1.0, w: 12, h: 0.9,
    fontFace: FONT_HEAD, fontSize: 32, bold: true, color: TEXT_DARK, valign: "top", margin: 0,
  });

  // 3 pillar cards
  const px0 = 0.7, pw = 3.95, pgap = 0.2, py = 2.0, ph = 4.85;

  // ---- PILLAR 01 ----
  {
    const i = 0; const x = px0 + i * (pw + pgap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: py, w: pw, h: ph,
      fill: { color: CREAM_LIGHT }, line: { color: RULE_LIGHT, width: 0.75 },
    });
    s.addText("PILLAR 01", {
      x: x + 0.25, y: py + 0.2, w: 1.6, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 11, bold: true, color: GOLD, charSpacing: 5, valign: "middle", margin: 0,
    });
    s.addShape(pres.shapes.LINE, {
      x: x + 1.95, y: py + 0.36, w: 1.7, h: 0,
      line: { color: GOLD, width: 0.75 },
    });
    s.addText("Real assets, not narratives", {
      x: x + 0.25, y: py + 0.6, w: pw - 0.5, h: 0.5,
      fontFace: FONT_HEAD, fontSize: 18, bold: true, color: TEXT_DARK, valign: "top", margin: 0,
    });
    s.addText("Loan portfolios, deposit franchises, and CRE-secured paper. Replacement value sits on the balance sheet — not inside a forward multiple.", {
      x: x + 0.25, y: py + 1.15, w: pw - 0.5, h: 1.4,
      fontFace: FONT_BODY, fontSize: 12, color: TEXT_DARK, valign: "top", margin: 0,
    });
    // Divider above evidence
    s.addShape(pres.shapes.LINE, {
      x: x + 0.25, y: py + 3.05, w: pw - 0.5, h: 0,
      line: { color: RULE_LIGHT, width: 0.5 },
    });
    s.addText("EVIDENCE", {
      x: x + 0.25, y: py + 3.15, w: pw - 0.5, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 11, color: GOLD_DARK, charSpacing: 5, valign: "middle", margin: 0,
    });
    // Three evidence rows
    const evRows = [["STWD assets","~$66B"], ["UMBF assets","~$68B"], ["MAIN portfolio cos.","200+"]];
    evRows.forEach((row, idx) => {
      const ry = py + 3.55 + idx * 0.4;
      s.addText(row[0], {
        x: x + 0.25, y: ry, w: 2.4, h: 0.3,
        fontFace: FONT_BODY, fontSize: 11, color: TEXT_DARK, valign: "middle", margin: 0,
      });
      s.addText(row[1], {
        x: x + pw - 1.5, y: ry, w: 1.25, h: 0.3,
        fontFace: FONT_HEAD, fontSize: 11, bold: true, color: TEXT_DARK, align: "right", valign: "middle", margin: 0,
      });
      s.addShape(pres.shapes.LINE, {
        x: x + 0.25, y: ry + 0.32, w: pw - 0.5, h: 0,
        line: { color: RULE_LIGHT, width: 0.4 },
      });
    });
  }

  // ---- PILLAR 02 ----
  {
    const i = 1; const x = px0 + i * (pw + pgap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: py, w: pw, h: ph,
      fill: { color: CREAM_LIGHT }, line: { color: RULE_LIGHT, width: 0.75 },
    });
    s.addText("PILLAR 02", {
      x: x + 0.25, y: py + 0.2, w: 1.6, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 11, bold: true, color: GOLD, charSpacing: 5, valign: "middle", margin: 0,
    });
    s.addShape(pres.shapes.LINE, {
      x: x + 1.95, y: py + 0.36, w: 1.7, h: 0,
      line: { color: GOLD, width: 0.75 },
    });
    s.addText("Demand resists the AI cycle", {
      x: x + 0.25, y: py + 0.6, w: pw - 0.5, h: 0.5,
      fontFace: FONT_HEAD, fontSize: 18, bold: true, color: TEXT_DARK, valign: "top", margin: 0,
    });
    s.addText("Lending, deposit-taking, and real-estate finance are not displaced by generative AI — they are operationally enhanced by it. No platform-shift exposure.", {
      x: x + 0.25, y: py + 1.15, w: pw - 0.5, h: 1.4,
      fontFace: FONT_BODY, fontSize: 12, color: TEXT_DARK, valign: "top", margin: 0,
    });

    // Divider
    s.addShape(pres.shapes.LINE, {
      x: x + 0.25, y: py + 3.05, w: pw - 0.5, h: 0,
      line: { color: RULE_LIGHT, width: 0.5 },
    });
    s.addText("DISRUPTION RISK", {
      x: x + 0.25, y: py + 3.15, w: pw - 0.5, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 11, color: TEXT_DARK, bold: true, charSpacing: 4, valign: "middle", margin: 0,
    });
    // Bars: label + track + filled portion
    const barRows = [
      { label: "Mtg. REIT", pct: 0.18, color: GOLD },
      { label: "Reg. Bank", pct: 0.22, color: GOLD },
      { label: "BDC",       pct: 0.16, color: GOLD },
      { label: "SaaS",      pct: 0.62, color: RED  },
    ];
    barRows.forEach((b, idx) => {
      const ry = py + 3.55 + idx * 0.3;
      s.addText(b.label, {
        x: x + 0.25, y: ry, w: 1.2, h: 0.22,
        fontFace: FONT_BODY, fontSize: 10, color: TEXT_DARK, valign: "middle", margin: 0,
      });
      // Track
      const trackX = x + 1.45;
      const trackW = pw - 1.7;
      s.addShape(pres.shapes.RECTANGLE, {
        x: trackX, y: ry + 0.07, w: trackW, h: 0.1,
        fill: { color: GOLD_LIGHT }, line: { type: "none" },
      });
      // Fill
      s.addShape(pres.shapes.RECTANGLE, {
        x: trackX, y: ry + 0.07, w: trackW * b.pct, h: 0.1,
        fill: { color: b.color }, line: { type: "none" },
      });
    });
    s.addText("Lower bar = lower obsolescence risk.", {
      x: x + 0.25, y: py + 4.85, w: pw - 0.5, h: 0.3,
      fontFace: FONT_BODY, fontSize: 10, color: TEXT_MUTED, italic: true, valign: "middle", margin: 0,
    });
  }

  // ---- PILLAR 03 ----
  {
    const i = 2; const x = px0 + i * (pw + pgap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: py, w: pw, h: ph,
      fill: { color: CREAM_LIGHT }, line: { color: RULE_LIGHT, width: 0.75 },
    });
    s.addText("PILLAR 03", {
      x: x + 0.25, y: py + 0.2, w: 1.6, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 11, bold: true, color: GOLD, charSpacing: 5, valign: "middle", margin: 0,
    });
    s.addShape(pres.shapes.LINE, {
      x: x + 1.95, y: py + 0.36, w: 1.7, h: 0,
      line: { color: GOLD, width: 0.75 },
    });
    s.addText("Rate-cut beneficiaries", {
      x: x + 0.25, y: py + 0.6, w: pw - 0.5, h: 0.5,
      fontFace: FONT_HEAD, fontSize: 18, bold: true, color: TEXT_DARK, valign: "top", margin: 0,
    });
    s.addText("Three Fed cuts in late 2025 lowered the federal funds rate to 3.50–3.75%. Spread businesses with floating-rate exposure re-rate first.", {
      x: x + 0.25, y: py + 1.15, w: pw - 0.5, h: 1.4,
      fontFace: FONT_BODY, fontSize: 12, color: TEXT_DARK, valign: "top", margin: 0,
    });

    // Divider
    s.addShape(pres.shapes.LINE, {
      x: x + 0.25, y: py + 3.05, w: pw - 0.5, h: 0,
      line: { color: RULE_LIGHT, width: 0.5 },
    });
    s.addText("FED FUNDS PATH", {
      x: x + 0.25, y: py + 3.15, w: pw - 0.5, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 11, color: TEXT_DARK, bold: true, charSpacing: 4, valign: "middle", margin: 0,
    });

    // Mini-bars: 4 bars with values declining left to right
    const fedRows = [
      { val: "5.25%",  yr: "'24",     pct: 1.00, color: NAVY,        labelColor: TEXT_DARK },
      { val: "4.50%",  yr: "Q3 '25",  pct: 0.86, color: NAVY,        labelColor: TEXT_DARK },
      { val: "3.625%", yr: "Q4 '25",  pct: 0.69, color: GOLD,        labelColor: GOLD_DARK },
      { val: "~3.25%", yr: "'26 E",   pct: 0.62, color: GOLD_LIGHT,  labelColor: GOLD_DARK },
    ];
    const fbX0 = x + 0.3;
    const fbAreaW = pw - 0.6;
    const fbBarW = 0.55;
    const fbSlot = fbAreaW / 4;
    const fbYBase = py + 4.45; // baseline
    const fbHmax = 0.7;
    fedRows.forEach((b, idx) => {
      const bx = fbX0 + idx * fbSlot + (fbSlot - fbBarW) / 2;
      const bh = fbHmax * b.pct;
      const by = fbYBase - bh;
      // value above bar
      s.addText(b.val, {
        x: bx - 0.15, y: by - 0.3, w: fbBarW + 0.3, h: 0.28,
        fontFace: FONT_HEAD, fontSize: 11, bold: true,
        color: b.labelColor, align: "center", valign: "middle", margin: 0,
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: bx, y: by, w: fbBarW, h: bh,
        fill: { color: b.color }, line: { type: "none" },
      });
      // year under bar
      s.addText(b.yr, {
        x: bx - 0.15, y: fbYBase + 0.05, w: fbBarW + 0.3, h: 0.28,
        fontFace: FONT_BODY, fontSize: 10, color: TEXT_MUTED, align: "center", valign: "middle", margin: 0,
      });
    });

    s.addText("Markets pricing in at least two more cuts in 2026.", {
      x: x + 0.25, y: py + 4.95, w: pw - 0.5, h: 0.3,
      fontFace: FONT_BODY, fontSize: 10, color: TEXT_MUTED, italic: true, valign: "middle", margin: 0,
    });
  }

  // Footer
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 7.0, w: 11.9, h: 0,
    line: { color: RULE_LIGHT, width: 0.75 },
  });
  s.addText("05 / HALO LOGIC", {
    x: 0.7, y: 7.1, w: 4, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10, color: TEXT_MUTED, charSpacing: 4, valign: "middle", margin: 0,
  });
  s.addText("WHY THESE THREE, AND NOT THE NEXT 50", {
    x: 5.5, y: 7.1, w: 7.1, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10, color: TEXT_MUTED, charSpacing: 4, align: "right", valign: "middle", margin: 0,
  });
}

// ======================================================================
// SLIDE 8 — HALO OPPORTUNITY SET BY INDEX (table)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  s.addText("HALO OPPORTUNITY SET BY INDEX", {
    x: 0.7, y: 0.55, w: 11, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 12, color: TEXT_MUTED, charSpacing: 5, valign: "middle", margin: 0,
  });

  s.addText("The Russell 2000 has more Halo room than the Dow or S&P 500.", {
    x: 0.7, y: 1.0, w: 12.2, h: 0.9,
    fontFace: FONT_HEAD, fontSize: 30, bold: true, color: TEXT_DARK, valign: "top", margin: 0,
  });

  // Top thick rule
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 2.1, w: 11.9, h: 0,
    line: { color: TEXT_DARK, width: 1.5 },
  });

  // ---- Table built with shapes/text for fine control ----
  const tx = 0.7, tw = 11.9;
  const colWs = [3.4, 2.83, 2.83, 2.84]; // sums to 11.9
  const headerY = 2.15;
  const headerH = 0.65;
  const rowH = 0.7;

  // Russell column highlight band (full height)
  const russellX = tx + colWs[0] + colWs[1] + colWs[2];
  const russellW = colWs[3];
  const totalH = headerH + rowH * 6;
  s.addShape(pres.shapes.RECTANGLE, {
    x: russellX, y: headerY, w: russellW, h: totalH,
    fill: { color: CREAM_HIGHLIGHT }, line: { type: "none" },
  });

  // Header row text
  const headers = ["METRIC", "DOW JONES (30)", "S&P 500", "RUSSELL 2000"];
  let cx = tx;
  headers.forEach((h, i) => {
    s.addText(h, {
      x: cx + 0.25, y: headerY + 0.15, w: colWs[i] - 0.5, h: headerH - 0.3,
      fontFace: FONT_HEAD, fontSize: 11, bold: true,
      color: TEXT_MUTED, charSpacing: 5, valign: "middle", margin: 0,
    });
    cx += colWs[i];
  });

  // Bottom rule of header
  s.addShape(pres.shapes.LINE, {
    x: tx, y: headerY + headerH, w: tw, h: 0,
    line: { color: TEXT_DARK, width: 1 },
  });

  // Rows
  const rowsData = [
    ["Constituents",          "30",       "500",            "~2,000",         false],
    ["Return Dispersion",     "Low",      "Moderate (1×)",  "2× S&P 500",     true],
    ["Domestic Revenue Share","~58%",     "~60%",           "~80%",           true],
    ["2026 EPS Growth (cons.)","~9%",     "~12%",           "~19%",           true],
    ["EV/EBIT vs. 25-yr avg", "In line",  "Above avg",      "Near 25-yr low", true],
    ["Mispricing & alpha room","Limited", "Compressed",     "Fertile ground", true],
  ];
  rowsData.forEach((row, idx) => {
    const ry = headerY + headerH + idx * rowH;
    let xx = tx;
    row.slice(0, 4).forEach((val, ci) => {
      const isMetric = ci === 0;
      const isRussell = ci === 3;
      const russellHighlighted = row[4]; // boolean: gold bold for russell?
      s.addText(val, {
        x: xx + 0.25, y: ry + 0.1, w: colWs[ci] - 0.5, h: rowH - 0.2,
        fontFace: isMetric || (isRussell && russellHighlighted) ? FONT_HEAD : FONT_BODY,
        fontSize: 13,
        bold: isMetric || (isRussell && russellHighlighted),
        color: isRussell && russellHighlighted ? GOLD_DARK : TEXT_DARK,
        valign: "middle", margin: 0,
      });
      xx += colWs[ci];
    });
    // bottom rule for the row (light)
    s.addShape(pres.shapes.LINE, {
      x: tx, y: ry + rowH, w: tw, h: 0,
      line: { color: RULE_LIGHT, width: 0.5 },
    });
  });

  // Footer
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 7.0, w: 11.9, h: 0,
    line: { color: RULE_LIGHT, width: 0.75 },
  });
  s.addText("06 / INDEX COMPARISON", {
    x: 0.7, y: 7.1, w: 5, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10, color: TEXT_MUTED, charSpacing: 4, valign: "middle", margin: 0,
  });
  s.addText("SOURCES: GOLDMAN SACHS, FTSE RUSSELL, ROYCE INVESTMENT PARTNERS", {
    x: 5.0, y: 7.1, w: 7.6, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10, color: TEXT_MUTED, charSpacing: 4, align: "right", valign: "middle", margin: 0,
  });
}

// ======================================================================
// SLIDE 9 — THE ACTIVE EDGE (text-heavy + 3 stats on the right)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  s.addText("THE ACTIVE EDGE", {
    x: 0.7, y: 0.55, w: 11, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 12, color: TEXT_MUTED, charSpacing: 5, valign: "middle", margin: 0,
  });

  s.addText("More dispersion means more Halo to find.", {
    x: 0.7, y: 1.0, w: 12.2, h: 0.9,
    fontFace: FONT_HEAD, fontSize: 32, bold: true, color: TEXT_DARK, valign: "top", margin: 0,
  });

  // Body text on the left (two paragraphs)
  s.addText([
    { text: "Within the Russell 2000, return dispersion is more than twice that of the S&P 500 — a structural feature, not a moment.", options: { breakLine: true } },
    { text: "" , options: { fontSize: 8, breakLine: true } },
    { text: "For a Halo investor, that gap is the opportunity: a denser population of asset-heavy, durable franchises priced as if they belonged to a single small-cap basket." },
  ], {
    x: 0.7, y: 3.4, w: 6.5, h: 3.0,
    fontFace: FONT_BODY, fontSize: 16, color: TEXT_DARK, valign: "top", margin: 0,
    paraSpaceAfter: 12,
  });

  // Three big stats on the right
  const sStats = [
    { num: "1.0×", title: "S&P 500",     sub: "baseline dispersion" },
    { num: "1.1×", title: "DOW 30",      sub: "narrow universe" },
    { num: "2.1×", title: "RUSSELL 2000", sub: "2× S&P 500 dispersion" },
  ];
  const ssX0 = 7.6, ssW = 1.7, ssGap = 0.2, ssY = 3.7;
  sStats.forEach((st, i) => {
    const x = ssX0 + i * (ssW + ssGap);
    s.addText(st.num, {
      x, y: ssY, w: ssW, h: 0.6,
      fontFace: FONT_HEAD, fontSize: 26, bold: true, color: TEXT_DARK,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(st.title, {
      x, y: ssY + 0.7, w: ssW, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 12, color: TEXT_DARK, charSpacing: 3,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(st.sub, {
      x, y: ssY + 1.0, w: ssW + 0.4, h: 0.3,
      fontFace: FONT_BODY, fontSize: 10, color: TEXT_MUTED,
      align: "center", valign: "middle", margin: 0,
    });
  });

  // Footer
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 7.0, w: 11.9, h: 0,
    line: { color: RULE_LIGHT, width: 0.75 },
  });
  s.addText("07 / DISPERSION", {
    x: 0.7, y: 7.1, w: 4, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10, color: TEXT_MUTED, charSpacing: 4, valign: "middle", margin: 0,
  });
  s.addText('"PARTICULARLY FERTILE GROUND FOR ALPHA GENERATION" — GOLDMAN SACHS, DEC 2025', {
    x: 4.5, y: 7.1, w: 8.1, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10, color: TEXT_MUTED, charSpacing: 4, align: "right", valign: "middle", margin: 0,
  });
}

// ======================================================================
// SLIDE 10 — TAKEAWAY / CLOSING
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  // Big partial gold circle, top-right
  s.addShape(pres.shapes.OVAL, {
    x: 9.4, y: -2.6, w: 6.6, h: 6.6,
    fill: { color: GOLD_DARK, transparency: 30 },
    line: { type: "none" },
  });

  s.addText("THE TAKEAWAY", {
    x: 0.7, y: 0.55, w: 6, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 12, color: GOLD, charSpacing: 5, valign: "middle", margin: 0,
  });

  s.addText("Halo investing finds its widest aperture in the Russell 2000 in 2026.", {
    x: 0.7, y: 1.1, w: 11.4, h: 2.2,
    fontFace: FONT_HEAD, fontSize: 48, bold: true, color: CREAM, valign: "top", margin: 0,
  });

  // Three stat blocks
  const tStats = [
    { num: "3",   label: "HALO NAMES IDENTIFIED", body: "STWD, UMBF, MAIN — heavy assets, durable demand, profitable in 2025." },
    { num: "2×",  label: "MORE DISPERSION",       body: "Versus the S&P 500. The opportunity to underwrite name-by-name is structurally larger." },
    { num: "19%", label: "2026 EPS GROWTH",       body: "Consensus for the Russell 2000, vs. ~12% for large caps. Earnings — not multiples — drive the case." },
  ];
  const tx0 = 0.7, tw = 3.85, tgap = 0.25, ty = 4.0;
  tStats.forEach((st, i) => {
    const x = tx0 + i * (tw + tgap);
    s.addText(st.num, {
      x, y: ty, w: tw, h: 0.95,
      fontFace: FONT_HEAD, fontSize: 56, bold: true, color: GOLD, valign: "top", margin: 0,
    });
    s.addText(st.label, {
      x, y: ty + 1.05, w: tw, h: 0.35,
      fontFace: FONT_HEAD, fontSize: 13, color: GOLD, charSpacing: 5, valign: "middle", margin: 0,
    });
    s.addText(st.body, {
      x, y: ty + 1.45, w: tw, h: 1.4,
      fontFace: FONT_BODY, fontSize: 12, color: TEXT_MUTED_DARK, valign: "top", margin: 0,
    });
  });

  // Footer line
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 6.85, w: 11.9, h: 0,
    line: { color: TEXT_MUTED_DARK, width: 0.5 },
  });

  // Footer left: ring + label
  s.addShape(pres.shapes.OVAL, {
    x: 0.7, y: 7.05, w: 0.18, h: 0.18,
    fill: { type: "none" }, line: { color: GOLD, width: 1.25 },
  });
  s.addText("HALO COMPANIES  ·  RUSSELL 2000  ·  2026", {
    x: 1.0, y: 6.95, w: 7, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 12, bold: true, color: GOLD, charSpacing: 5, valign: "middle", margin: 0,
  });

  // Footer right
  s.addText("EQUITY RESEARCH · APRIL 2026", {
    x: 8.5, y: 6.95, w: 4.1, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 11, color: TEXT_MUTED_DARK, charSpacing: 5, align: "right", valign: "middle", margin: 0,
  });
}

// ======================================================================
// WRITE
// ======================================================================
pres.writeFile({ fileName: "Russell_2000_recreated.pptx" })
  .then(fn => console.log("Wrote:", fn));
