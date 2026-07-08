/**
 * LIHTC_Portfolio_Final_v9.js
 * Goldman Sachs — Fixed Income | Municipal Securities
 * LIHTC Bond Portfolio — Managing Director Review
 * PptxGenJS rebuild · April 2025
 *
 * Usage:
 *   npm install pptxgenjs
 *   node LIHTC_Portfolio_Final_v9.js
 */

const pptxgen = require("pptxgenjs");

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  navy:      "0B2344",   // GS deep navy (background / dark slides)
  navyMid:   "1A3A5C",   // secondary dark
  gold:      "B5935A",   // GS warm gold accent
  goldLight: "D4AF70",
  white:     "FFFFFF",
  offWhite:  "F5F4F0",
  slate:     "4A5568",
  midGrey:   "718096",
  lightGrey: "E2E8F0",
  bodyText:  "1A202C",
  green:     "2D6A4F",
  amber:     "92400E",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const makeShadow = () => ({
  type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.12,
});

const FOOTER_Y  = 5.25;
const FOOTER_H  = 0.32;
const SLIDE_W   = 10;
const SLIDE_H   = 5.625;

/** Add a standard confidential footer + page indicator */
function addFooter(slide, leftText, pageNum) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: FOOTER_Y, w: SLIDE_W, h: FOOTER_H,
    fill: { color: C.navy }, line: { color: C.navy },
  });
  slide.addText(leftText, {
    x: 0.3, y: FOOTER_Y, w: 7, h: FOOTER_H,
    fontSize: 7, color: C.gold, valign: "middle", bold: false,
    fontFace: "Calibri", margin: 0,
  });
  slide.addText(`${pageNum} / 13`, {
    x: 8.9, y: FOOTER_Y, w: 0.9, h: FOOTER_H,
    fontSize: 7, color: C.midGrey, align: "right", valign: "middle",
    fontFace: "Calibri", margin: 0,
  });
}

/** Dark section-label header strip */
function addSectionBadge(slide, label, y = 0.18) {
  slide.addText(label, {
    x: 0.35, y, w: 9.3, h: 0.3,
    fontSize: 7.5, color: C.gold, bold: true, fontFace: "Calibri",
    charSpacing: 3, margin: 0,
  });
}

/** Slide title block */
function addTitle(slide, title, subtitle, titleY = 0.55) {
  slide.addText(title, {
    x: 0.35, y: titleY, w: 9.3, h: 0.5,
    fontSize: 22, bold: true, color: C.navy,
    fontFace: "Georgia", margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.35, y: titleY + 0.52, w: 9.3, h: 0.35,
      fontSize: 10, color: C.slate, fontFace: "Calibri", margin: 0,
    });
  }
}

/** KPI stat card */
function addKpiCard(slide, value, label, sublabel, x, y, w = 2.1, h = 1.0) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: C.offWhite }, line: { color: C.lightGrey, pt: 0.75 },
    shadow: makeShadow(),
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.07, h,
    fill: { color: C.gold }, line: { color: C.gold },
  });
  slide.addText(value, {
    x: x + 0.13, y: y + 0.08, w: w - 0.18, h: 0.42,
    fontSize: 22, bold: true, color: C.navy, fontFace: "Georgia",
    valign: "top", margin: 0,
  });
  slide.addText(label, {
    x: x + 0.13, y: y + 0.5, w: w - 0.18, h: 0.22,
    fontSize: 9, bold: true, color: C.bodyText, fontFace: "Calibri",
    margin: 0,
  });
  if (sublabel) {
    slide.addText(sublabel, {
      x: x + 0.13, y: y + 0.72, w: w - 0.18, h: 0.2,
      fontSize: 7.5, color: C.midGrey, fontFace: "Calibri", margin: 0,
    });
  }
}

/** Footnote / disclaimer line */
function addDisclaimer(slide, text) {
  slide.addText(text, {
    x: 0.35, y: FOOTER_Y - 0.28, w: 9.3, h: 0.25,
    fontSize: 6.5, color: C.midGrey, fontFace: "Calibri",
    italic: true, margin: 0,
  });
}

// ─── Presentation init ────────────────────────────────────────────────────────
let pres = new pptxgen();
pres.layout  = "LAYOUT_16x9";
pres.author  = "Goldman Sachs — Fixed Income";
pres.title   = "LIHTC Bond Portfolio — Managing Director Review";
pres.subject = "CONFIDENTIAL | April 2025";

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 1 — Cover
// ══════════════════════════════════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.navy };

  // top gold bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: SLIDE_W, h: 0.08,
    fill: { color: C.gold }, line: { color: C.gold },
  });

  // firm wordmark
  s.addText("GOLDMAN SACHS", {
    x: 0.5, y: 0.22, w: 9, h: 0.36,
    fontSize: 13, bold: true, color: C.white, fontFace: "Georgia",
    charSpacing: 4, margin: 0,
  });
  s.addText("FIXED INCOME  |  MUNICIPAL SECURITIES", {
    x: 0.5, y: 0.56, w: 9, h: 0.25,
    fontSize: 8.5, color: C.gold, fontFace: "Calibri",
    charSpacing: 2, margin: 0,
  });

  // divider
  s.addShape(pres.shapes.LINE, {
    x: 0.5, y: 0.88, w: 9, h: 0,
    line: { color: C.gold, width: 0.75 },
  });

  // main title
  s.addText("LIHTC Bond Portfolio", {
    x: 0.5, y: 1.05, w: 9, h: 0.72,
    fontSize: 38, bold: true, color: C.white, fontFace: "Georgia",
    margin: 0,
  });
  s.addText("Managing Director Portfolio Review", {
    x: 0.5, y: 1.78, w: 9, h: 0.36,
    fontSize: 14, color: C.goldLight, fontFace: "Calibri",
    italic: true, margin: 0,
  });
  s.addText("Yield, Credit Quality, and Social Impact\nin a Persistent Housing Scarcity Environment", {
    x: 0.5, y: 2.22, w: 9, h: 0.6,
    fontSize: 11, color: C.lightGrey, fontFace: "Calibri",
    margin: 0,
  });

  // hero KPIs
  const kpis = [
    { v: "$2.4B",     l: "Total Portfolio AUM",       sub: "" },
    { v: "200–250 bps", l: "Spread Over AAA GO Munis", sub: "" },
    { v: "97.3%",     l: "Median Occupancy Rate",     sub: "" },
    { v: "< 0.5%",    l: "Cumulative Foreclosure",    sub: "" },
  ];
  const startX = 0.5, gap = 2.28;
  kpis.forEach((k, i) => {
    let x = startX + i * gap;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 3.05, w: 2.1, h: 1.1,
      fill: { color: C.navyMid }, line: { color: C.gold, pt: 0.5 },
    });
    s.addText(k.v, {
      x: x + 0.1, y: 3.12, w: 1.9, h: 0.5,
      fontSize: 20, bold: true, color: C.gold, fontFace: "Georgia",
      valign: "top", margin: 0,
    });
    s.addText(k.l, {
      x: x + 0.1, y: 3.62, w: 1.9, h: 0.42,
      fontSize: 8, color: C.lightGrey, fontFace: "Calibri", margin: 0,
    });
  });

  addFooter(s, "CONFIDENTIAL   |   April 2025   |   For Internal Use Only", 1);
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 2 — Executive Summary
// ══════════════════════════════════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.white };

  addSectionBadge(s, "EXECUTIVE SUMMARY");
  addTitle(s, "Portfolio at a Glance",
    "Key metrics as of Q1 2025 — LIHTC Bond Portfolio");

  // left column — KPI grid (2×3)
  const kpis = [
    { v: "$2.4B",    l: "Total AUM",          sub: "57 discrete bond positions" },
    { v: "4.72%",    l: "Avg. Tax-Equiv. Yield", sub: "vs. 3.85% IG Corp benchmark" },
    { v: "6.8 yrs",  l: "Effective Duration", sub: "Below peer-group avg of 8.2 yrs" },
    { v: "97.3%",    l: "Median Occupancy",   sub: "Wtd avg across portfolio" },
    { v: "1.43x",    l: "Avg. DSCR",          sub: "Covenant floor ≥ 1.25x" },
    { v: "0.31%",    l: "Cumul. Foreclosure", sub: "vs. 1.8% IG muni universe" },
  ];
  const col = [0.3, 2.55], rowY = [1.2, 2.42, 3.64];
  kpis.forEach((k, i) => {
    addKpiCard(s, k.v, k.l, k.sub, col[i % 2], rowY[Math.floor(i / 2)], 2.05, 1.0);
  });

  // right column — scatter placeholder + recommendation box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.0, y: 1.15, w: 4.65, h: 2.55,
    fill: { color: C.offWhite }, line: { color: C.lightGrey },
  });
  s.addText("Risk / Return Scatter\n(LIHTC vs. Comp Set)\nCharts generated at runtime", {
    x: 5.0, y: 1.15, w: 4.65, h: 2.55,
    fontSize: 9, color: C.midGrey, align: "center", valign: "middle",
    fontFace: "Calibri", italic: true, margin: 0,
  });
  s.addText("RISK / RETURN POSITIONING", {
    x: 5.0, y: 1.0, w: 4.65, h: 0.2,
    fontSize: 7.5, color: C.gold, bold: true, charSpacing: 2,
    fontFace: "Calibri", margin: 0,
  });

  // recommendation callout
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.0, y: 3.85, w: 4.65, h: 1.05,
    fill: { color: C.navy }, line: { color: C.navy }, shadow: makeShadow(),
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.0, y: 3.85, w: 0.07, h: 1.05,
    fill: { color: C.gold }, line: { color: C.gold },
  });
  s.addText("Recommendation", {
    x: 5.12, y: 3.9, w: 4.4, h: 0.22,
    fontSize: 8.5, bold: true, color: C.gold, fontFace: "Calibri", margin: 0,
  });
  s.addText(
    "Modest duration extension + selective 4% LIHTC bond addition. " +
    "Optimization adds ~18 bps to blended after-tax yield with minimal credit degradation.",
    {
      x: 5.12, y: 4.12, w: 4.4, h: 0.68,
      fontSize: 9, color: C.white, fontFace: "Calibri", margin: 0,
    }
  );

  addDisclaimer(s, "TEY = Tax-Equivalent Yield at 37% marginal rate. Default rate = 30-yr cumulative foreclosure. Past performance not indicative of future results.");
  addFooter(s, "CONFIDENTIAL   |   April 2025   |   For Internal Use Only", 2);
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 3 — Core Investment Thesis
// ══════════════════════════════════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.white };

  addSectionBadge(s, "CORE INVESTMENT THESIS");
  addTitle(s, "Four Structural Advantages");

  const pillars = [
    {
      num: "01",
      title: "Credit Structural Protection",
      body:  "Multi-layer default buffer: HFA/FHA agency oversight, mandatory 6-month DSRF, covenant DSCR floor ≥ 1.25×. 30-yr cumulative foreclosure: 0.31% vs. 1.8% IG muni universe.",
      icon:  "🏛",
    },
    {
      num: "02",
      title: "After-Tax Yield Premium",
      body:  "Tax-equivalent yield of 4.72% at 37% bracket outperforms IG Corp A (3.85%) by +87 bps and AAA GO Muni TEY (3.52%) by +120 bps on a risk-adjusted basis.",
      icon:  "📈",
    },
    {
      num: "03",
      title: "Low Correlation / Diversification",
      body:  "Beta to S&P 500: 0.14. Correlation to IG Corp: 0.38. Annualized volatility 2.1% vs. 4.8% for IG Corp. Max drawdown −4.2% at COVID trough.",
      icon:  "📊",
    },
    {
      num: "04",
      title: "Legislative Tailwind (2025 Bill)",
      body:  "50% → 25% bond-financing threshold reform unlocks ~$18B incremental annual tax-exempt bond volume and a +40% expansion in the investable LIHTC bond universe.",
      icon:  "⚖",
    },
  ];

  const col = [0.3, 5.15];
  const row = [1.15, 3.0];
  pillars.forEach((p, i) => {
    const x = col[i % 2];
    const y = row[Math.floor(i / 2)];
    const w = 4.55, h = 1.6;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h,
      fill: { color: C.offWhite }, line: { color: C.lightGrey },
      shadow: makeShadow(),
    });
    // gold number badge
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.55, h,
      fill: { color: C.navy }, line: { color: C.navy },
    });
    s.addText(p.num, {
      x: x + 0.02, y: y + 0.55, w: 0.51, h: 0.48,
      fontSize: 16, bold: true, color: C.gold,
      align: "center", fontFace: "Georgia", margin: 0,
    });
    s.addText(p.title, {
      x: x + 0.65, y: y + 0.12, w: w - 0.78, h: 0.32,
      fontSize: 10.5, bold: true, color: C.navy, fontFace: "Georgia", margin: 0,
    });
    s.addText(p.body, {
      x: x + 0.65, y: y + 0.44, w: w - 0.78, h: 1.08,
      fontSize: 8.5, color: C.bodyText, fontFace: "Calibri", margin: 0,
    });
  });

  addFooter(s, "CONFIDENTIAL   |   April 2025   |   For Internal Use Only", 3);
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 4 — Program Overview / Legislative Threshold
// ══════════════════════════════════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.white };

  addSectionBadge(s, "PROGRAM OVERVIEW");
  addTitle(s,
    "The 2025 One Big Beautiful Bill Act: Threshold Reform",
    "50% → 25% bond-financing threshold unlocks material expansion in 4% LIHTC deal flow and investable universe");

  // before / after visual
  const arrowY = 2.1;
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 1.6, w: 3.2, h: 1.5,
    fill: { color: "F0EDE8" }, line: { color: C.lightGrey },
  });
  s.addText("BEFORE", {
    x: 0.3, y: 1.62, w: 3.2, h: 0.25,
    fontSize: 8, bold: true, color: C.midGrey, align: "center",
    fontFace: "Calibri", charSpacing: 2, margin: 0,
  });
  s.addText("50%", {
    x: 0.3, y: 1.9, w: 3.2, h: 0.72,
    fontSize: 42, bold: true, color: C.amber, align: "center",
    fontFace: "Georgia", margin: 0,
  });
  s.addText("Prior threshold for 4% LIHTC eligibility", {
    x: 0.3, y: 2.62, w: 3.2, h: 0.38,
    fontSize: 8, color: C.slate, align: "center", fontFace: "Calibri", margin: 0,
  });

  s.addText("→", {
    x: 3.6, y: arrowY, w: 0.7, h: 0.65,
    fontSize: 28, bold: true, color: C.gold, align: "center",
    fontFace: "Georgia", margin: 0,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 4.4, y: 1.6, w: 3.2, h: 1.5,
    fill: { color: C.navy }, line: { color: C.navy },
  });
  s.addText("AFTER — 2025 ACT", {
    x: 4.4, y: 1.62, w: 3.2, h: 0.25,
    fontSize: 8, bold: true, color: C.gold, align: "center",
    fontFace: "Calibri", charSpacing: 2, margin: 0,
  });
  s.addText("25%", {
    x: 4.4, y: 1.9, w: 3.2, h: 0.72,
    fontSize: 42, bold: true, color: C.gold, align: "center",
    fontFace: "Georgia", margin: 0,
  });
  s.addText("2025 One Big Beautiful Bill Act", {
    x: 4.4, y: 2.62, w: 3.2, h: 0.38,
    fontSize: 8, color: C.lightGrey, align: "center", fontFace: "Calibri", margin: 0,
  });

  // implication stats (right column)
  const stats = [
    { v: "~$18B",  l: "Est. additional annual tax-exempt bond volume for 4% LIHTC" },
    { v: "+40%",   l: "Projected increase in investable LIHTC bond universe (3-yr)" },
    { v: "2–3×",   l: "Potential increase in mid-market deal flow from previously excluded sponsors" },
    { v: "~25 bps", l: "PLACEHOLDER" },
  ];
  stats.forEach((st, i) => {
    const y = 1.6 + i * 0.82;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 8.0, y: y, w: 1.7, h: 0.7,
      fill: { color: C.offWhite }, line: { color: C.lightGrey },
    });
    s.addText(st.v, {
      x: 8.0, y: y + 0.04, w: 1.7, h: 0.35,
      fontSize: 15, bold: true, color: C.navy, align: "center",
      fontFace: "Georgia", margin: 0,
    });
    s.addText(st.l, {
      x: 8.0, y: y + 0.38, w: 1.7, h: 0.28,
      fontSize: 6.5, color: C.slate, align: "center",
      fontFace: "Calibri", margin: 0,
    });
  });

  // PORTFOLIO IMPLICATIONS label
  s.addText("PORTFOLIO IMPLICATIONS", {
    x: 7.85, y: 1.4, w: 2.0, h: 0.2,
    fontSize: 7.5, bold: true, color: C.gold, charSpacing: 2,
    fontFace: "Calibri", margin: 0,
  });

  addDisclaimer(s, "Legislative threshold change applies to tax-exempt private activity bonds. Consult tax counsel. Projections are GS internal estimates.");
  addFooter(s, "CONFIDENTIAL   |   April 2025   |   For Internal Use Only", 4);
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 5 — Portfolio Composition
// ══════════════════════════════════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.white };

  addSectionBadge(s, "PORTFOLIO COMPOSITION");
  addTitle(s,
    "Portfolio Structure & Allocation",
    "57 positions across 23 states — AUM $2.4B as of March 31, 2025");

  // Geographic table
  s.addText("GEOGRAPHIC CONCENTRATION", {
    x: 0.3, y: 1.2, w: 4.5, h: 0.22,
    fontSize: 7.5, bold: true, color: C.gold, charSpacing: 2,
    fontFace: "Calibri", margin: 0,
  });

  const geoRows = [
    [{ text: "State", options: { bold: true, color: C.white } },
     { text: "Pos.", options: { bold: true, color: C.white } },
     { text: "AUM ($M)", options: { bold: true, color: C.white } }],
    ["California",  "9",  "$382"],
    ["New York",    "7",  "$294"],
    ["Texas",       "6",  "$241"],
    ["Florida",     "5",  "$188"],
    ["Illinois",    "4",  "$154"],
    ["Washington",  "4",  "$142"],
    ["Other (17)",  "22", "$999"],
  ];
  const tableData = geoRows.map((row, ri) => {
    if (ri === 0) return row; // header with styled options
    return row.map(cell => ({
      text: cell,
      options: {
        fill: { color: ri % 2 === 1 ? C.offWhite : C.white },
        color: C.bodyText, fontSize: 9, fontFace: "Calibri",
      },
    }));
  });
  s.addTable(tableData, {
    x: 0.3, y: 1.42, w: 4.5, h: 2.2,
    colW: [2.3, 0.9, 1.3],
    border: { pt: 0.5, color: C.lightGrey },
    fill: { color: C.white },
  });

  // Chart placeholders — runtime charting (donut, maturity bar, rating bar)
  const charts = [
    { title: "Allocation by Structure", x: 5.05, y: 1.15, w: 2.3, h: 2.2 },
    { title: "Maturity Profile",        x: 7.45, y: 1.15, w: 2.3, h: 2.2 },
    { title: "Rating Distribution (% AUM)", x: 0.3, y: 3.75, w: 4.5, h: 1.1 },
  ];
  charts.forEach(ch => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: ch.x, y: ch.y, w: ch.w, h: ch.h,
      fill: { color: C.offWhite }, line: { color: C.lightGrey },
    });
    s.addText(ch.title + "\n[chart generated at runtime]", {
      x: ch.x, y: ch.y, w: ch.w, h: ch.h,
      fontSize: 8, color: C.midGrey, align: "center", valign: "middle",
      fontFace: "Calibri", italic: true, margin: 0,
    });
  });

  addDisclaimer(s, "Position count and AUM as of March 31, 2025. Rating reflects Moody's/S&P on senior bonds; unrated positions carry internal GS equivalent rating.");
  addFooter(s, "CONFIDENTIAL   |   April 2025   |   For Internal Use Only", 5);
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 6 — Financial Performance / Yield & Spread
// ══════════════════════════════════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.white };

  addSectionBadge(s, "FINANCIAL PERFORMANCE");
  addTitle(s,
    "Yield & Spread Analysis: YTM / YTW",
    "200–250 bps over AAA GO munis; tax-equivalent yields competitive with or superior to taxable IG alternatives");

  // Waterfall chart placeholder
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 1.15, w: 5.5, h: 3.6,
    fill: { color: C.offWhite }, line: { color: C.lightGrey },
  });
  s.addText("Waterfall / Spread Chart\n[generated at runtime]", {
    x: 0.3, y: 1.15, w: 5.5, h: 3.6,
    fontSize: 9, color: C.midGrey, align: "center", valign: "middle",
    fontFace: "Calibri", italic: true, margin: 0,
  });

  // Yield comparison table
  s.addText("YIELD COMPARISON", {
    x: 6.05, y: 1.1, w: 3.65, h: 0.22,
    fontSize: 7.5, bold: true, color: C.gold, charSpacing: 2,
    fontFace: "Calibri", margin: 0,
  });

  const yields = [
    { val: "4.72%", label: "LIHTC Bonds (TEY)", sub: "37% marginal rate adjusted", highlight: true },
    { val: "3.85%", label: "IG Corp Index (A-rated)", sub: "Bloomberg US Corp A 5–10yr", highlight: false },
    { val: "3.52%", label: "AAA GO Muni (TEY)", sub: "Bloomberg AAA Muni 10yr", highlight: false },
    { val: "3.91%", label: "US Agg (TEY equiv.)", sub: "Bloomberg US Agg Bond Index", highlight: false },
  ];
  yields.forEach((y, i) => {
    const ry = 1.38 + i * 0.82;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.05, y: ry, w: 3.65, h: 0.72,
      fill: { color: y.highlight ? C.navy : C.offWhite },
      line: { color: C.lightGrey },
      shadow: y.highlight ? makeShadow() : undefined,
    });
    if (y.highlight) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 6.05, y: ry, w: 0.07, h: 0.72,
        fill: { color: C.gold }, line: { color: C.gold },
      });
    }
    s.addText(y.val, {
      x: 6.2, y: ry + 0.06, w: 1.1, h: 0.42,
      fontSize: 20, bold: true,
      color: y.highlight ? C.gold : C.navy,
      fontFace: "Georgia", margin: 0,
    });
    s.addText(y.label, {
      x: 7.35, y: ry + 0.06, w: 2.25, h: 0.24,
      fontSize: 8.5, bold: true,
      color: y.highlight ? C.white : C.bodyText,
      fontFace: "Calibri", margin: 0,
    });
    s.addText(y.sub, {
      x: 7.35, y: ry + 0.3, w: 2.25, h: 0.2,
      fontSize: 7.5, color: y.highlight ? C.goldLight : C.midGrey,
      fontFace: "Calibri", margin: 0,
    });
  });

  addDisclaimer(s, "TEY = Tax-Equivalent Yield, 37% federal marginal rate. YTW as of March 31, 2025. Bloomberg indices as of same date. Past performance is not indicative of future results.");
  addFooter(s, "CONFIDENTIAL   |   April 2025   |   For Internal Use Only", 6);
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 7 — Credit Quality
// ══════════════════════════════════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.white };

  addSectionBadge(s, "CREDIT QUALITY");
  addTitle(s,
    "Credit Quality & Structural Protections",
    "Multi-layer default buffer; 30-year cumulative foreclosure rate 0.31% vs. 1.8% IG muni universe");

  // 4 headline KPI cards
  const kpis = [
    { v: "1.43x",     l: "Avg. DSCR",         sub: "Portfolio weighted avg" },
    { v: "0.31%",     l: "Cumul. Foreclosure", sub: "30-yr track record" },
    { v: "6 months",  l: "Reserve Coverage",   sub: "Mandatory debt service reserve" },
    { v: "HFA / FHA", l: "Agency Oversight",   sub: "Third-party credit surveillance" },
  ];
  kpis.forEach((k, i) => {
    addKpiCard(s, k.v, k.l, k.sub, 0.3 + i * 2.38, 1.15, 2.12, 1.0);
  });

  // DSCR & foreclosure chart placeholders
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 2.38, w: 4.7, h: 2.35,
    fill: { color: C.offWhite }, line: { color: C.lightGrey },
  });
  s.addText("DSCR Distribution Chart\n[runtime]", {
    x: 0.3, y: 2.38, w: 4.7, h: 2.35,
    fontSize: 9, color: C.midGrey, align: "center", valign: "middle",
    fontFace: "Calibri", italic: true, margin: 0,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 2.38, w: 4.5, h: 2.35,
    fill: { color: C.offWhite }, line: { color: C.lightGrey },
  });
  s.addText("Foreclosure Rate Comparison\n[runtime]", {
    x: 5.2, y: 2.38, w: 4.5, h: 2.35,
    fontSize: 9, color: C.midGrey, align: "center", valign: "middle",
    fontFace: "Calibri", italic: true, margin: 0,
  });

  addDisclaimer(s, "Foreclosure data: Moody's Investors Service, NCSHA, GS internal. DSCR per annual audited financials. Covenant floor is portfolio minimum contractual threshold.");
  addFooter(s, "CONFIDENTIAL   |   April 2025   |   For Internal Use Only", 7);
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 8 — Risk Analytics / Duration & Stress
// ══════════════════════════════════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.white };

  addSectionBadge(s, "RISK ANALYTICS");
  addTitle(s,
    "Duration Profile & Interest Rate Stress Testing",
    "Effective duration 6.8 yrs — defensively positioned relative to peer universe; positive carry preserved through +200 bps shock");

  // Duration KPIs
  const durKpis = [
    { v: "6.8 yrs", l: "Effective Duration",   sub: "" },
    { v: "5.2 yrs", l: "Modified Duration",     sub: "" },
    { v: "0.68",    l: "Convexity (mod.)",       sub: "" },
  ];
  durKpis.forEach((k, i) => {
    addKpiCard(s, k.v, k.l, k.sub, 0.3 + i * 2.38, 1.15, 2.12, 0.85);
  });

  // Duration chart placeholder
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.1, y: 1.1, w: 2.6, h: 0.95,
    fill: { color: C.offWhite }, line: { color: C.lightGrey },
  });
  s.addText("Duration vs. Peers [runtime]", {
    x: 7.1, y: 1.1, w: 2.6, h: 0.95,
    fontSize: 7.5, color: C.midGrey, align: "center", valign: "middle",
    fontFace: "Calibri", italic: true, margin: 0,
  });

  // Stress table
  s.addText("INTEREST RATE STRESS SCENARIOS", {
    x: 0.3, y: 2.2, w: 9.4, h: 0.22,
    fontSize: 7.5, bold: true, color: C.gold, charSpacing: 2,
    fontFace: "Calibri", margin: 0,
  });

  const stressRows = [
    [{ text: "Scenario",         options: { bold: true, color: C.white, fill: { color: C.navy } } },
     { text: "Rate Δ",           options: { bold: true, color: C.white, fill: { color: C.navy } } },
     { text: "Price Δ",          options: { bold: true, color: C.white, fill: { color: C.navy } } },
     { text: "P&L ($M)",         options: { bold: true, color: C.white, fill: { color: C.navy } } }],
    ["Base Case",                "Flat",           "—",       "—"],
    ["+100 bps Parallel",        "+100 bps",       "−6.3%",   "−$151"],
    ["+200 bps Parallel",        "+200 bps",       "−12.1%",  "−$290"],
    ["2008 GFC Credit Stress",   "+75/Spd+120",    "−9.8%",   "−$235"],
    ["Stagflation (1970s)",      "+350 bps grad.", "−18.4%",  "−$442"],
    ["Rally −150 bps",           "−150 bps",       "+10.8%",  "+$259"],
  ];
  const stressData = stressRows.map((row, ri) => {
    if (ri === 0) return row;
    return row.map((cell, ci) => ({
      text: cell,
      options: {
        fill: { color: ri % 2 === 1 ? C.offWhite : C.white },
        color: (ci > 0 && cell.startsWith("+") && ci === 3) ? C.green
               : (ci > 0 && cell.startsWith("−"))           ? C.amber
               : C.bodyText,
        fontSize: 9, fontFace: "Calibri",
      },
    }));
  });
  s.addTable(stressData, {
    x: 0.3, y: 2.45, w: 9.4, h: 2.2,
    colW: [3.0, 1.8, 1.8, 1.8],
    border: { pt: 0.5, color: C.lightGrey },
  });

  // Key takeaway
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 4.68, w: 9.4, h: 0.42,
    fill: { color: "EFF6FF" }, line: { color: "BFDBFE" },
  });
  s.addText("Key Takeaway: Even under +200 bps parallel shift, the portfolio retains positive carry for 14 months before total return turns negative. " +
    "Shorter duration (6.8 yr vs. 8.2 yr peer avg) provides a meaningful convexity buffer without sacrificing material yield.", {
    x: 0.45, y: 4.7, w: 9.1, h: 0.38,
    fontSize: 8, color: C.navy, fontFace: "Calibri", italic: true, margin: 0,
  });

  addDisclaimer(s, "Duration and convexity computed on option-adjusted basis. P&L impact based on portfolio DV01. Stress scenarios are hypothetical and for risk management purposes only.");
  addFooter(s, "CONFIDENTIAL   |   April 2025   |   For Internal Use Only", 8);
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 9 — After-Tax Benchmarking / TEY Cross-Asset
// ══════════════════════════════════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.white };

  addSectionBadge(s, "AFTER-TAX BENCHMARKING");
  addTitle(s,
    "Tax-Equivalent Yield — Cross-Asset Comparison",
    "LIHTC bonds outperform taxable IG alternatives across all marginal rate scenarios above 24%");

  // TEY chart placeholder
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 1.15, w: 5.8, h: 3.6,
    fill: { color: C.offWhite }, line: { color: C.lightGrey },
  });
  s.addText("TEY vs. Marginal Rate Chart\n[runtime]", {
    x: 0.3, y: 1.15, w: 5.8, h: 3.6,
    fontSize: 9, color: C.midGrey, align: "center", valign: "middle",
    fontFace: "Calibri", italic: true, margin: 0,
  });

  // AT 37% callouts
  s.addText("AT 37% BRACKET", {
    x: 6.35, y: 1.1, w: 3.35, h: 0.22,
    fontSize: 7.5, bold: true, color: C.gold, charSpacing: 2,
    fontFace: "Calibri", margin: 0,
  });

  const callouts = [
    { v: "+87 bps",  l: "vs. IG Corp A",   sub: "Risk-adjusted outperformance",       col: C.green },
    { v: "+120 bps", l: "vs. AAA Muni",    sub: "Same tax treatment; superior spread", col: C.green },
    { v: "−110 bps", l: "vs. HY Corp BB",  sub: "Better Sharpe; 0.31% vs. ~3% default", col: C.amber },
  ];
  callouts.forEach((c, i) => {
    const y = 1.38 + i * 1.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.35, y, w: 3.35, h: 0.95,
      fill: { color: C.offWhite }, line: { color: C.lightGrey },
      shadow: makeShadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.35, y, w: 0.07, h: 0.95,
      fill: { color: c.col }, line: { color: c.col },
    });
    s.addText(c.v, {
      x: 6.48, y: y + 0.08, w: 1.4, h: 0.42,
      fontSize: 22, bold: true, color: c.col, fontFace: "Georgia", margin: 0,
    });
    s.addText(c.l, {
      x: 6.48, y: y + 0.5, w: 3.1, h: 0.22,
      fontSize: 9, bold: true, color: C.bodyText, fontFace: "Calibri", margin: 0,
    });
    s.addText(c.sub, {
      x: 6.48, y: y + 0.7, w: 3.1, h: 0.2,
      fontSize: 7.5, color: C.midGrey, fontFace: "Calibri", margin: 0,
    });
  });

  addDisclaimer(s, "NIIT = Net Investment Income Tax (3.8%), applicable on passive income above $200K single / $250K MFJ. LIHTC bond income is generally exempt. HY Corp yield shown pre-default-loss-adjustment.");
  addFooter(s, "CONFIDENTIAL   |   April 2025   |   For Internal Use Only", 9);
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 10 — Operational Performance / Occupancy
// ══════════════════════════════════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.white };

  addSectionBadge(s, "OPERATIONAL PERFORMANCE");
  addTitle(s,
    "Occupancy & Property-Level Performance",
    "97.3% weighted-average occupancy — structurally supported by below-market rents at 60% AMI");

  // Chart placeholder
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 1.15, w: 5.5, h: 3.6,
    fill: { color: C.offWhite }, line: { color: C.lightGrey },
  });
  s.addText("Occupancy Trend Chart\n[runtime]", {
    x: 0.3, y: 1.15, w: 5.5, h: 3.6,
    fontSize: 9, color: C.midGrey, align: "center", valign: "middle",
    fontFace: "Calibri", italic: true, margin: 0,
  });

  // KPI cards
  const kpis = [
    { v: "97.3%",     l: "Wtd Avg Occupancy",    sub: "Portfolio, Q1 2025" },
    { v: "3.2 yrs",   l: "Avg Tenant Tenure",     sub: "Below-market rent drives retention" },
    { v: "98.1%",     l: "Rent Collection Rate",  sub: "12-month trailing average" },
    { v: "$0.82/sf",  l: "Avg Operating Expense", sub: "vs. $1.15/sf market-rate comp" },
  ];
  kpis.forEach((k, i) => {
    addKpiCard(s, k.v, k.l, k.sub, 6.0, 1.15 + i * 0.93, 3.65, 0.83);
  });

  addDisclaimer(s, "Occupancy data per HFA compliance reports and tax credit investor annual certifications. Market-rate comparables: CBRE U.S. Multifamily Q1 2025 Snapshot.");
  addFooter(s, "CONFIDENTIAL   |   April 2025   |   For Internal Use Only", 10);
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 11 — ESG Impact
// ══════════════════════════════════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.navy };

  addSectionBadge(s, "ESG IMPACT");
  s.addText("Quantifiable Social Impact Metrics", {
    x: 0.35, y: 0.55, w: 9.3, h: 0.5,
    fontSize: 22, bold: true, color: C.white,
    fontFace: "Georgia", margin: 0,
  });
  s.addText("Affordable housing bond portfolios deliver measurable, auditable community impact — aligned with institutional ESG frameworks and reporting standards", {
    x: 0.35, y: 1.08, w: 9.3, h: 0.35,
    fontSize: 9.5, color: C.goldLight, fontFace: "Calibri", italic: true, margin: 0,
  });

  // Top 3 large KPIs
  const big = [
    { v: "14,200+", l: "Affordable Units Financed",  sub: "Across 57 portfolio properties" },
    { v: "38,500+", l: "Residents Housed",            sub: "Est. 2.7 persons/unit" },
    { v: "$1.8B",   l: "Rent Savings Generated",      sub: "vs. market-rate alternatives" },
  ];
  big.forEach((k, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.3 + i * 3.25, y: 1.6, w: 3.0, h: 1.25,
      fill: { color: C.navyMid }, line: { color: C.gold, pt: 0.5 },
    });
    s.addText(k.v, {
      x: 0.3 + i * 3.25 + 0.1, y: 1.65, w: 2.8, h: 0.55,
      fontSize: 28, bold: true, color: C.gold,
      fontFace: "Georgia", margin: 0,
    });
    s.addText(k.l, {
      x: 0.3 + i * 3.25 + 0.1, y: 2.2, w: 2.8, h: 0.25,
      fontSize: 9.5, bold: true, color: C.white, fontFace: "Calibri", margin: 0,
    });
    s.addText(k.sub, {
      x: 0.3 + i * 3.25 + 0.1, y: 2.45, w: 2.8, h: 0.3,
      fontSize: 8, color: C.goldLight, fontFace: "Calibri", margin: 0,
    });
  });

  // Bottom 3 smaller KPIs
  const small = [
    { v: "$312M", l: "Est. Local Economic Impact",   sub: "Construction + operating phase" },
    { v: "62%",   l: "Households Below 50% AMI",     sub: "Deepest affordability targeting" },
    { v: "18",    l: "States with HFA Partnership",  sub: "Oversight & compliance coverage" },
  ];
  small.forEach((k, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.3 + i * 3.25, y: 3.1, w: 3.0, h: 1.05,
      fill: { color: "152944" }, line: { color: C.navyMid },
    });
    s.addText(k.v, {
      x: 0.3 + i * 3.25 + 0.12, y: 3.15, w: 2.76, h: 0.45,
      fontSize: 22, bold: true, color: C.goldLight,
      fontFace: "Georgia", margin: 0,
    });
    s.addText(k.l, {
      x: 0.3 + i * 3.25 + 0.12, y: 3.6, w: 2.76, h: 0.2,
      fontSize: 8.5, bold: true, color: C.lightGrey, fontFace: "Calibri", margin: 0,
    });
    s.addText(k.sub, {
      x: 0.3 + i * 3.25 + 0.12, y: 3.8, w: 2.76, h: 0.28,
      fontSize: 7.5, color: C.midGrey, fontFace: "Calibri", margin: 0,
    });
  });

  addDisclaimer(s, "Impact metrics represent portfolio-level estimates based on HFA reporting, tax credit investor disclosures, and GS internal analysis. Methodology available on request.");
  addFooter(s, "CONFIDENTIAL   |   April 2025   |   For Internal Use Only", 11);
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 12 — Portfolio Analytics / Correlation
// ══════════════════════════════════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.white };

  addSectionBadge(s, "PORTFOLIO ANALYTICS");
  addTitle(s,
    "Correlation to Broader Credit Markets",
    "Low correlation to IG credit and equities — meaningful portfolio diversification benefit");

  // Correlation chart placeholder
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 1.15, w: 5.5, h: 3.6,
    fill: { color: C.offWhite }, line: { color: C.lightGrey },
  });
  s.addText("Correlation Heatmap / Rolling Chart\n[runtime]", {
    x: 0.3, y: 1.15, w: 5.5, h: 3.6,
    fontSize: 9, color: C.midGrey, align: "center", valign: "middle",
    fontFace: "Calibri", italic: true, margin: 0,
  });

  // Risk-adjusted metrics
  s.addText("RISK-ADJUSTED METRICS", {
    x: 6.05, y: 1.1, w: 3.65, h: 0.22,
    fontSize: 7.5, bold: true, color: C.gold, charSpacing: 2,
    fontFace: "Calibri", margin: 0,
  });

  const riskMetrics = [
    { v: "0.82",   l: "Sharpe Ratio",       sub: "3-yr trailing" },
    { v: "2.1%",   l: "Ann. Volatility",    sub: "vs. 4.8% IG Corp" },
    { v: "0.14",   l: "Beta to S&P 500",    sub: "Near-zero equity sensitivity" },
    { v: "−4.2%",  l: "Max Drawdown",       sub: "COVID trough, 2020" },
    { v: "0.38",   l: "Corr. to IG Corp",   sub: "Material diversification benefit" },
  ];
  riskMetrics.forEach((m, i) => {
    const y = 1.38 + i * 0.68;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.05, y, w: 3.65, h: 0.6,
      fill: { color: C.offWhite }, line: { color: C.lightGrey },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.05, y, w: 0.07, h: 0.6,
      fill: { color: C.gold }, line: { color: C.gold },
    });
    s.addText(m.v, {
      x: 6.18, y: y + 0.04, w: 1.1, h: 0.35,
      fontSize: 18, bold: true, color: C.navy, fontFace: "Georgia", margin: 0,
    });
    s.addText(m.l, {
      x: 7.3, y: y + 0.05, w: 2.25, h: 0.22,
      fontSize: 8.5, bold: true, color: C.bodyText, fontFace: "Calibri", margin: 0,
    });
    s.addText(m.sub, {
      x: 7.3, y: y + 0.27, w: 2.25, h: 0.2,
      fontSize: 7.5, color: C.midGrey, fontFace: "Calibri", margin: 0,
    });
  });

  addDisclaimer(s, "Monthly return data sourced from Bloomberg. Sharpe ratio uses 5.3% risk-free rate (3-mo T-Bill avg). Max drawdown calculated on total return basis.");
  addFooter(s, "CONFIDENTIAL   |   April 2025   |   For Internal Use Only", 12);
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 13 — Recommendations
// ══════════════════════════════════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.navy };

  // top label
  s.addText("RECOMMENDATIONS", {
    x: 0.35, y: 0.18, w: 9.3, h: 0.28,
    fontSize: 7.5, color: C.gold, bold: true, charSpacing: 3,
    fontFace: "Calibri", margin: 0,
  });
  s.addText("THE CASE IN BRIEF", {
    x: 0.35, y: 0.48, w: 9.3, h: 0.22,
    fontSize: 9, color: C.midGrey, fontFace: "Calibri",
    charSpacing: 2, margin: 0,
  });
  s.addText("Portfolio Optimization Roadmap", {
    x: 0.35, y: 0.7, w: 9.3, h: 0.42,
    fontSize: 20, bold: true, color: C.white,
    fontFace: "Georgia", margin: 0,
  });

  // 4 recommendation rows
  const recs = [
    {
      num: "01",
      title: "ADD 4% LIHTC BONDS",
      body:  "Increase allocation by $150–200M over 6 months, targeting new issuance unlocked by the 25% bond threshold. Estimated yield improvement: +18 bps to blended TEY.",
      kpi: "4.72%", kpiLabel: "Tax-equiv. yield at 37% bracket",
    },
    {
      num: "02",
      title: "EXTEND DURATION SELECTIVELY",
      body:  "Extend from 6.8 to 7.5–8.0 yrs via 15-yr bullet maturities, capturing the steeper muni curve without overextending in a higher-for-longer rate environment.",
      kpi: "< 0.5%", kpiLabel: "Cumulative foreclosure — 30-yr history",
    },
    {
      num: "03",
      title: "GEOGRAPHIC DIVERSIFICATION",
      body:  "Reduce CA from 16% → 12% of AUM and add FL, AZ, and CO positions, mitigating single-state legislative risk without yield sacrifice.",
      kpi: "97.3%", kpiLabel: "Median portfolio occupancy",
    },
    {
      num: "04",
      title: "SECONDARY MARKET OPPORTUNISM",
      body:  "Set limit orders 15–20 bps wide of fair value. The trading desk has identified a pipeline of ~$80M at attractive relative valuations.",
      kpi: "1.43x", kpiLabel: "Average debt service coverage ratio",
    },
  ];

  recs.forEach((r, i) => {
    const y  = 1.25 + i * 0.93;
    const h  = 0.82;

    // main card
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.3, y, w: 7.0, h,
      fill: { color: C.navyMid }, line: { color: "2A4F78" },
    });
    // number
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.3, y, w: 0.55, h,
      fill: { color: C.gold }, line: { color: C.gold },
    });
    s.addText(r.num, {
      x: 0.3, y: y + 0.2, w: 0.55, h: 0.42,
      fontSize: 13, bold: true, color: C.navy,
      align: "center", fontFace: "Georgia", margin: 0,
    });
    s.addText(r.title, {
      x: 0.98, y: y + 0.06, w: 6.2, h: 0.24,
      fontSize: 9.5, bold: true, color: C.gold,
      fontFace: "Calibri", charSpacing: 1, margin: 0,
    });
    s.addText(r.body, {
      x: 0.98, y: y + 0.3, w: 6.2, h: 0.46,
      fontSize: 8.5, color: C.lightGrey, fontFace: "Calibri", margin: 0,
    });

    // KPI pull-quote on right
    s.addShape(pres.shapes.RECTANGLE, {
      x: 7.45, y, w: 2.2, h,
      fill: { color: "112235" }, line: { color: "2A4F78" },
    });
    s.addText(r.kpi, {
      x: 7.5, y: y + 0.06, w: 2.1, h: 0.42,
      fontSize: 20, bold: true, color: C.gold,
      fontFace: "Georgia", margin: 0,
    });
    s.addText(r.kpiLabel, {
      x: 7.5, y: y + 0.5, w: 2.1, h: 0.28,
      fontSize: 7.5, color: C.goldLight, fontFace: "Calibri", margin: 0,
    });
  });

  addFooter(s, "CONFIDENTIAL  |  April 2025  |  For Internal Use Only", 13);
}

// ─── Write file ───────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "LIHTC_Portfolio_Final_v9_rebuilt.pptx" })
  .then(() => console.log("✅  LIHTC_Portfolio_Final_v9_rebuilt.pptx written successfully."))
  .catch(err => console.error("❌  Error writing file:", err));
