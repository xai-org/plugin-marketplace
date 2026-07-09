// Bridgewater_edited.pptx generator (pptxgenjs)
// Recreates the 13-slide deck exactly: dark navy theme, gold accent, Georgia headings, Calibri body.
//
// Run: node bridgewater.js  (requires `npm install -g pptxgenjs` or local install)

const pptxgen = require("pptxgenjs");

// ---------- palette / typography constants ----------
const BG        = "040406";  // page background
const CARD      = "0C1526";  // primary card fill
const CARD2     = "111D33";  // secondary card (slide 7 AIA Labs, slide 10 peer AUM)
const STRIPE    = "040406";  // alternating row fill (matches bg)
const GOLD      = "C49B2A";  // primary gold
const GOLD2     = "DEBC5E";  // lighter gold (AIA Labs accent)
const WHITE     = "F0F0F2";  // primary text
const MUTED     = "636B7E";  // muted body text
const FOOTER    = "6A7082";  // footer text
const RULE      = "2E3340";  // divider line on slide 10
const TEAL      = "3A8DA3";  // S&P 500 bar (slide 8)
const DONUT_A   = "C49B2A";  // donut slice 1 - Bonds
const DONUT_B   = "3A5A7A";  // donut slice 2 - Equities
const DONUT_C   = "636B7E";  // donut slice 3 - Cash
const DONUT_D   = "F9F9F9";  // donut slice 4 outline (Other is near-white)

const F_HEAD    = "Georgia";
const F_BODY    = "Calibri";

// Default opts for every text box: zero internal padding (matches source lIns=tIns=rIns=bIns=0).
const TB = { margin: 0 };

// ---------- setup ----------
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10" x 5.625"
pres.author  = "Bridgewater Associates";
pres.title   = "Bridgewater Associates - Hedge Fund Products";

// ---------- helpers ----------
// Header (small gold eyebrow + big white title + footer + page number) shared by slides 2-12
function addHeader(slide, eyebrow, title, pageNum) {
  slide.addText(eyebrow, {
    ...TB, x: 0.6, y: 0.35, w: 5.0, h: 0.2,
    fontSize: 8, charSpacing: 3, color: GOLD, fontFace: F_BODY, valign: "middle",
  });
  slide.addText(title, {
    ...TB, x: 0.6, y: 0.6, w: 8.8, h: 0.45,
    fontSize: 25, bold: true, color: WHITE, fontFace: F_HEAD, valign: "middle",
  });
  slide.addText("BRIDGEWATER ASSOCIATES", {
    ...TB, x: 0.6, y: 5.35, w: 4.0, h: 0.2,
    fontSize: 6.5, charSpacing: 2, color: FOOTER, fontFace: F_BODY, valign: "middle",
  });
  slide.addText(`${pageNum} / 13`, {
    ...TB, x: 8.5, y: 5.35, w: 0.9, h: 0.2,
    fontSize: 6.5, color: FOOTER, fontFace: F_BODY, align: "right", valign: "middle",
  });
}

function rect(slide, x, y, w, h, color) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color }, line: { color, width: 0 },
  });
}
function oval(slide, x, y, w, h, color) {
  slide.addShape(pres.shapes.OVAL, {
    x, y, w, h, fill: { color }, line: { color, width: 0 },
  });
}

// ----------------------------------------------------------
// SLIDE 1 — Title
// ----------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: BG };

  s.addText("Bridgewater", {
    ...TB, x: 0.6, y: 1.4, w: 9.0, h: 1.5,
    fontSize: 72, bold: true, color: WHITE, fontFace: F_HEAD, valign: "middle",
  });
  s.addText("Associates, LP", {
    ...TB, x: 0.6, y: 2.8, w: 9.0, h: 1.15,
    fontSize: 44, color: GOLD, fontFace: F_HEAD, valign: "middle",
  });
  s.addText("Hedge Fund Products", {
    ...TB, x: 0.6, y: 4.1, w: 7.0, h: 0.6,
    fontSize: 26, color: MUTED, fontFace: F_BODY, valign: "middle",
  });
  s.addText("APRIL 2026  |  CONFIDENTIAL", {
    ...TB, x: 0.6, y: 5.2, w: 4.0, h: 0.2,
    fontSize: 9, color: FOOTER, fontFace: F_BODY, valign: "middle",
  });
}

// ----------------------------------------------------------
// SLIDE 2 — Executive Summary (3 cards: Platform / Market / Edge)
// ----------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, "EXECUTIVE SUMMARY", "Record 2025 across a $92B platform", "02");

  // 3 cards with top-gold-accent bar
  const cards = [
    { x: 0.475, title: "THE PLATFORM", body: [
      "Six strategies on platform.",
      "Pure Alpha +34% in 2025.",
      "All Weather delivered +20%.",
      "ALLW ETF crossed $1B.",
    ]},
    { x: 3.575, title: "THE MARKET", body: [
      "Global HF AUM passed $5T.",
      "Double-digit returns streak.",
      "64% raising HF exposure.",
      "Two-decade inflow high.",
    ]},
    { x: 6.675, title: "THE EDGE", body: [
      "Systematic macro process.",
      "AUM capped for returns.",
      "60%+ employee owned.",
      "AIA Labs raised $5B.",
    ]},
  ];
  cards.forEach(c => {
    rect(s, c.x, 1.8071, 2.85, 2.4429, CARD);
    rect(s, c.x, 1.8071, 2.85, 0.025, GOLD); // top gold bar
    s.addText(c.title, {
      ...TB, x: c.x + 0.2, y: 2.0571, w: 2.45, h: 0.3,
      fontSize: 20, bold: true, charSpacing: 2, color: GOLD, fontFace: F_BODY, valign: "middle",
    });
    s.addText(
      c.body.map((t, i) => ({ text: t, options: { breakLine: i < c.body.length - 1 } })),
      {
        ...TB, x: c.x + 0.2, y: 2.5571, w: 2.45, h: 2.8,
        fontSize: 12, color: WHITE, fontFace: F_BODY, valign: "top", lineSpacingMultiple: 1.5,
      }
    );
  });
}

// ----------------------------------------------------------
// SLIDE 3 — The Firm (timeline + stats + leadership)
// ----------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, "THE FIRM", "A 50-year global macro pioneer", "03");

  // horizontal timeline rule + 6 nodes (thicker rule, nudged down slightly)
  rect(s, 0.6, 1.7475, 8.7963, 0.05, GOLD);
  // Timeline labels/descriptions live in <p:grpSp> in the edited file; their absolute
  // positions (resolved through the group transform) are used directly here.
  const timeline = [
    { x: 1.05,  label: "1975", t1: "Founded by",  t2: "Ray Dalio",   tx: 0.6986, lw: 0.8528 },
    { x: 2.6,   label: "1991", t1: "Pure Alpha",  t2: "launched",    tx: 2.0,    lw: 1.35   },
    { x: 4.15,  label: "1996", t1: "All Weather", t2: "launched",    tx: 3.55,   lw: 1.35   },
    { x: 5.7,   label: "2022", t1: "Nir Bar Dea", t2: "named CEO",   tx: 5.1,    lw: 1.35   },
    { x: 7.25,  label: "2023", t1: "AIA Labs",    t2: "launched",    tx: 6.65,   lw: 1.35   },
    { x: 8.8,   label: "2025", t1: "ALLW ETF",    t2: "record year", tx: 8.4569, lw: 0.8361 },
  ];
  timeline.forEach(n => {
    oval(s, n.x, 1.68, 0.15, 0.15, GOLD);
    s.addText(n.label, {
      ...TB, x: n.tx, y: 1.95, w: n.lw, h: 0.22,
      fontSize: 13, bold: true, color: GOLD, fontFace: F_HEAD, align: "center", valign: "middle",
    });
    s.addText([
      { text: n.t1, options: { breakLine: true } },
      { text: n.t2 },
    ], {
      ...TB, x: n.tx, y: 2.2, w: n.lw, h: 0.5,
      fontSize: 11, color: WHITE, fontFace: F_BODY, align: "center", valign: "middle",
      lineSpacingMultiple: 1.25,
    });
  });

  // Left card — 4 stats
  rect(s, 0.6, 3.05, 4.3, 2.05, CARD);
  const stats = [
    { x: 0.8, y: 3.2, v: "$92B",   lbl: "AUM (Sep 2025)"          },
    { x: 2.9, y: 3.2, v: "150+",   lbl: "Markets traded globally" },
    { x: 0.8, y: 4.1, v: "1,700+", lbl: "Employees worldwide"     },
    { x: 2.9, y: 4.1, v: "60%+",   lbl: "Employee equity ownership" },
  ];
  stats.forEach(st => {
    s.addText(st.v, {
      ...TB, x: st.x, y: st.y, w: 1.8, h: 0.4,
      fontSize: 22, bold: true, color: GOLD, fontFace: F_HEAD, valign: "middle",
    });
    s.addText(st.lbl, {
      ...TB, x: st.x, y: st.y + 0.38, w: 1.8, h: 0.22,
      fontSize: 9, color: WHITE, fontFace: F_BODY, valign: "middle",
    });
  });

  // Right card — leadership (nudged left slightly)
  rect(s, 5.0463, 3.05, 4.35, 2.05, CARD);
  s.addText("LEADERSHIP", {
    ...TB, x: 5.2463, y: 3.2, w: 3.0, h: 0.3,
    fontSize: 20, bold: true, charSpacing: 2, color: GOLD, fontFace: F_BODY, valign: "middle",
  });
  const leaders = [
    { y: 3.65, name: "Nir Bar Dea",          role: "Chief Executive Officer"  },
    { y: 3.98, name: "Greg Jensen",          role: "Co-CIO, Alpha Engine"     },
    { y: 4.31, name: "Bob Prince",           role: "Co-CIO, Portfolio Resilience" },
    { y: 4.64, name: "Karen Karniol-Tambour", role: "Co-CIO, Asia Strategies" },
  ];
  leaders.forEach(l => {
    s.addText(l.name, {
      ...TB, x: 5.2463, y: l.y, w: 2.0, h: 0.28,
      fontSize: 12, bold: true, color: WHITE, fontFace: F_BODY, valign: "middle",
    });
    s.addText(l.role, {
      ...TB, x: 7.2463, y: l.y, w: 2.1, h: 0.28,
      fontSize: 12, color: MUTED, fontFace: F_BODY, valign: "middle",
    });
  });
}

// ----------------------------------------------------------
// SLIDE 4 — Product Suite (2 columns of strategy cards)
// ----------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, "PRODUCT SUITE", "Six strategies, all double-digit in 2025", "04");

  // Left column header (default font size — `sz` attribute removed in edited version)
  s.addText("ALPHA ENGINE", {
    ...TB, x: 0.64, y: 1.395, w: 4.5, h: 0.3,
    bold: true, charSpacing: 2, color: GOLD, fontFace: F_BODY, valign: "middle",
  });

  // Left column: 2 big cards (Pure Alpha, AIA Labs) — card with left-gold bar
  // Cards in edited file are wrapped in groups with transform offsets; resolved abs positions used here.
  const bigCards = [
    { y: 2.455,  v: "+34%", title: "Pure Alpha", sub: "Flagship macro, 12-18% vol target" },
    { y: 3.535,  v: "+11%", title: "AIA Labs",   sub: "AI/ML-driven, $5B+ raised" },
  ];
  bigCards.forEach(c => {
    rect(s, 0.64, c.y, 0.05, 0.91, GOLD);
    rect(s, 0.68, c.y, 4.16, 0.91, CARD);
    s.addText(c.v, {
      ...TB, x: 0.89, y: c.y + 0.1, w: 1.5, h: 0.45,
      fontSize: 28, bold: true, color: GOLD, fontFace: F_HEAD, valign: "middle",
    });
    s.addText(c.title, {
      ...TB, x: 2.44, y: c.y + 0.1, w: 2.2, h: 0.3,
      fontSize: 16, bold: true, color: WHITE, fontFace: F_HEAD, valign: "middle",
    });
    s.addText(c.sub, {
      ...TB, x: 2.44, y: c.y + 0.45, w: 2.2, h: 0.3,
      fontSize: 11, color: MUTED, fontFace: F_BODY, valign: "middle",
    });
  });

  // Right column header (default font size, nudged right and narrower)
  s.addText("TOTAL PORTFOLIO STRATEGIES", {
    ...TB, x: 5.32, y: 1.395, w: 3.96, h: 0.3,
    bold: true, charSpacing: 2, color: GOLD, fontFace: F_BODY, valign: "middle",
  });

  // Right column: 4 small cards (also in groups; x shifted +0.08 to 5.32/5.36/5.57/6.82)
  const smallCards = [
    { y: 1.895, v: "+20%",  title: "All Weather",      sub: "Risk parity, ETF (ALLW) launched" },
    { y: 2.715, v: "+37%",  title: "Asia Total Return", sub: "Asia macro, USD class" },
    { y: 3.535, v: "+34%",  title: "China Total Return",sub: "China-focused, $5.5B AUM" },
    { y: 4.355, v: "Hedge", title: "Defensive Alpha",   sub: "Bear-market protection" },
  ];
  smallCards.forEach(c => {
    rect(s, 5.32, c.y, 0.04, 0.65, GOLD);
    rect(s, 5.36, c.y, 3.92, 0.65, CARD);
    s.addText(c.v, {
      ...TB, x: 5.57, y: c.y + 0.05, w: 1.2, h: 0.3,
      fontSize: 18, bold: true, color: GOLD, fontFace: F_HEAD, valign: "middle",
    });
    s.addText(c.title, {
      ...TB, x: 6.82, y: c.y + 0.02, w: 2.5, h: 0.28,
      fontSize: 14, bold: true, color: WHITE, fontFace: F_HEAD, valign: "middle",
    });
    s.addText(c.sub, {
      ...TB, x: 6.82, y: c.y + 0.32, w: 2.5, h: 0.22,
      fontSize: 10, color: MUTED, fontFace: F_BODY, valign: "middle",
    });
  });
}

// ----------------------------------------------------------
// SLIDE 5 — Pure Alpha (3 stats + chart)
// ----------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, "PURE ALPHA", "Best return in 50 years", "05");

  // Top-left stat card
  rect(s, 0.6, 1.25, 4.3, 0.7, CARD);
  // stats nudged slightly down; numbers up to 20pt, labels up to 10pt
  const ptStats = [
    { x: 0.8, v: "+34%",   lbl: "2025 Return (PA II)"  },
    { x: 2.2, v: "+11%",   lbl: "3-Yr Compounded"      },
    { x: 3.6, v: "4 of 34",lbl: "Losing Years"         },
  ];
  ptStats.forEach(st => {
    s.addText(st.v, {
      ...TB, x: st.x, y: 1.3417, w: 1.2, h: 0.3,
      fontSize: 20, bold: true, color: GOLD, fontFace: F_HEAD, valign: "middle",
    });
    s.addText(st.lbl, {
      ...TB, x: st.x, y: 1.6417, w: 1.2, h: 0.22,
      fontSize: 10, color: MUTED, fontFace: F_BODY, valign: "middle",
    });
  });

  // Description paragraph (blank line between sentence groups); body pushed down, 13.5pt, lnSpc 1.45
  s.addText([
    { text: "Pure Alpha positions across 150+ liquid markets", options: { breakLine: true } },
    { text: "based on growth and inflation environments.",     options: { breakLine: true } },
    { text: "",                                                options: { breakLine: true } },
    { text: "The 2025 rebound reflects CEO Bar Dea's restructuring,", options: { breakLine: true } },
    { text: "a deliberate AUM cut from $154B to $92B,",               options: { breakLine: true } },
    { text: "and tariff-induced macro volatility." },
  ], {
    ...TB, x: 0.6, y: 2.25, w: 4.3, h: 2.5,
    fontSize: 13.5, color: WHITE, fontFace: F_BODY, valign: "top", lineSpacingMultiple: 1.45,
  });

  // Chart card on right
  rect(s, 5.2, 1.25, 4.3, 3.8, CARD);
  s.addText("PURE ALPHA II ANNUAL RETURNS (%)", {
    ...TB, x: 5.4, y: 1.35, w: 3.8, h: 0.22,
    fontSize: 8, charSpacing: 1, color: GOLD, fontFace: F_BODY, valign: "middle",
  });

  // Column chart: 2019-2025 returns
  s.addChart(pres.charts.BAR, [{
    name: "Return",
    labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
    values: [16, 9, -5, 32, 7, 3, 34],
  }], {
    x: 5.3, y: 1.65, w: 4.1, h: 3.2,
    barDir: "col",
    chartColors: [GOLD],
    chartArea: { fill: { color: CARD } },
    plotArea: { fill: { color: CARD } },
    catAxisLabelColor: MUTED, catAxisLabelFontFace: "Arial", catAxisLabelFontSize: 9,
    valAxisLabelColor: MUTED, valAxisLabelFontFace: "Arial", valAxisLabelFontSize: 8,
    catAxisLineColor: "888888", valAxisLineColor: "888888",
    valGridLine: { style: "none" }, catGridLine: { style: "none" },
    showValue: true, dataLabelColor: WHITE, dataLabelFontFace: "Arial", dataLabelFontSize: 10,
    dataLabelPosition: "outEnd",
    showLegend: false,
    valAxisMajorUnit: 10,
  });
}

// ----------------------------------------------------------
// SLIDE 6 — All Weather (4 regime cards + doughnut + 3 stats)
// ----------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, "ALL WEATHER", "Risk-balanced returned +20% in 2025", "06");

  // 2x2 regime cards — cards shorter, rows packed tighter; headers up to 12pt
  const quads = [
    { x: 0.6,  y: 1.7383, head: "RISING GROWTH",    body: "Equities, Corp, EM Debt"  },
    { x: 2.85, y: 1.7383, head: "RISING INFLATION", body: "IL Bonds, Commodities"    },
    { x: 0.6,  y: 2.9168, head: "FALLING GROWTH",   body: "Nominal Bonds, IL Bonds"  },
    { x: 2.85, y: 2.9168, head: "FALLING INFLATION",body: "Equities, Nominal Bonds"  },
  ];
  quads.forEach(q => {
    rect(s, q.x, q.y, 2.05, 0.9456, CARD);
    s.addText(q.head, {
      ...TB, x: q.x + 0.12, y: q.y + 0.0879, w: 1.8, h: 0.2,
      fontSize: 12, bold: true, charSpacing: 1, color: GOLD, fontFace: F_BODY, valign: "middle",
    });
    s.addText(q.body, {
      ...TB, x: q.x + 0.12, y: q.y + 0.3879, w: 1.85, h: 0.7,
      fontSize: 12, color: WHITE, fontFace: F_BODY, valign: "top", lineSpacingMultiple: 1.3,
    });
  });

  // Doughnut chart (allocation breakdown) — top right, tightened
  s.addChart(pres.charts.DOUGHNUT, [{
    name: "ALLW",
    labels: ["Bonds 55%", "Equities 22%", "Cash 20%", "Other 3%"],
    values: [55, 22, 20, 3],
  }], {
    x: 5.4, y: 1.496, w: 4.0, h: 2.2326,
    chartColors: [DONUT_A, DONUT_B, DONUT_C, DONUT_D],
    chartArea: { fill: { color: BG } },
    plotArea: { fill: { color: BG } },
    dataBorder: { pt: 0.75, color: "F9F9F9" },
    holeSize: 50,
    showLegend: true,
    legendPos: "b",
    legendColor: WHITE,
    legendFontSize: 9,
  });

  // Bottom right — 3 stat card (narrower, lower, repositioned)
  rect(s, 5.4, 3.8759, 4.0, 0.8241, CARD);
  const awStats = [
    { x: 5.4571, v: "+20%", lbl: "2025 Return"      },
    { x: 6.8571, v: "$1B+", lbl: "ALLW ETF Inflows" },
    { x: 8.2571, v: "1996", lbl: "Year Launched"    },
  ];
  awStats.forEach(st => {
    s.addText(st.v, {
      ...TB, x: st.x, y: 3.9976, w: 1.1429, h: 0.381,
      fontSize: 20, bold: true, color: GOLD, fontFace: F_HEAD, align: "center", valign: "middle",
    });
    s.addText(st.lbl, {
      ...TB, x: st.x, y: 4.3905, w: 1.1429, h: 0.2381,
      fontSize: 9, color: MUTED, fontFace: F_BODY, align: "center", valign: "middle",
    });
  });
}

// ----------------------------------------------------------
// SLIDE 7 — Growth Engines (Asia panel | AIA Labs panel)
// ----------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, "GROWTH ENGINES", "Geographic and tech alpha engines", "07");

  // Left panel — Asia (dark card, gold top rule) — narrower
  rect(s, 0.6, 1.2, 4.9418, 3.85, CARD);
  rect(s, 0.6, 1.2, 4.9418, 0.025, GOLD);
  s.addText("Asia Investment Strategies", {
    ...TB, x: 0.8, y: 1.4, w: 4.0, h: 0.3,
    fontSize: 16, bold: true, color: WHITE, fontFace: F_HEAD, valign: "middle",
  });
  s.addText("Managed by co-CIO Karen Karniol-Tambour", {
    ...TB, x: 0.8, y: 1.72, w: 4.0, h: 0.2,
    fontSize: 11, color: MUTED, fontFace: F_BODY, valign: "middle",
  });
  const asiaRows = [
    { y: 2.2, v: "+37%",  sub: "Asia Total Return 15 (USD)" },
    { y: 2.9, v: "+34%",  sub: "China Total Return (USD)"   },
    { y: 3.6, v: "$5.5B", sub: "China AUM (BCIM subsidiary)"},
  ];
  asiaRows.forEach(r => {
    s.addText(r.v, {
      ...TB, x: 0.8, y: r.y, w: 1.4, h: 0.4,
      fontSize: 24, bold: true, color: GOLD, fontFace: F_HEAD, valign: "middle",
    });
    s.addText(r.sub, {
      ...TB, x: 2.2, y: r.y + 0.05, w: 3.5, h: 0.3,
      fontSize: 12, color: WHITE, fontFace: F_BODY, valign: "middle",
    });
  });
  s.addText(
    "30% of global allocators plan to add Asia exposure in 2026, making it the second-most targeted region after Europe.",
    { ...TB, x: 0.8, y: 4.3, w: 5.0, h: 0.5,
      fontSize: 11, color: MUTED, fontFace: F_BODY, valign: "middle", lineSpacingMultiple: 1.3 }
  );

  // Right panel — AIA Labs (wider, shifted left; stats at 24pt; body muted at 11pt)
  rect(s, 5.9, 1.2, 3.5, 3.85, CARD2);
  rect(s, 5.9, 1.2, 3.5, 0.025, GOLD2);
  s.addText("AIA Labs", {
    ...TB, x: 6.1, y: 1.4, w: 2.8, h: 0.3,
    fontSize: 16, bold: true, color: WHITE, fontFace: F_HEAD, valign: "middle",
  });
  s.addText("Co-CIO Greg Jensen + Chief Scientist Jasjeet Sekhon", {
    ...TB, x: 6.1, y: 1.72, w: 3.2037, h: 0.2,
    fontSize: 11, color: MUTED, fontFace: F_BODY, valign: "middle",
  });
  const aiaRows = [
    { y: 2.2, v: "+11%",  sub: "2025 Return"    },
    { y: 2.9, v: "$5B+",  sub: "Capital Raised" },
    { y: 3.6, v: "2023",  sub: "Year Launched"  },
  ];
  aiaRows.forEach(r => {
    s.addText(r.v, {
      ...TB, x: 6.1, y: r.y, w: 1.2, h: 0.4,
      fontSize: 24, bold: true, color: GOLD2, fontFace: F_HEAD, valign: "middle",
    });
    s.addText(r.sub, {
      ...TB, x: 7.3, y: r.y + 0.05, w: 1.6, h: 0.3,
      fontSize: 12, color: WHITE, fontFace: F_BODY, valign: "middle",
    });
  });
  s.addText(
    "Uses machine learning as the primary basis for investment decisions across global markets.",
    { ...TB, x: 6.1, y: 4.3, w: 2.9418, h: 0.5,
      fontSize: 11, color: MUTED, fontFace: F_BODY, valign: "middle", lineSpacingMultiple: 1.3 }
  );
}

// ----------------------------------------------------------
// SLIDE 8 — 2025 Performance (full-width horizontal bar chart)
// ----------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, "2025 PERFORMANCE", "Most strategies outperformed the S&P 500", "08");

  rect(s, 0.6, 1.15, 8.8, 4.0, CARD);

  // Horizontal bars: single series with per-point colors (7 entries in chartColors).
  // S&P 500 is teal, all others gold. Labels bold, light-gold, 12pt, outside bars.
  const labels = ["Asia Total Return", "Pure Alpha II", "China Total Return",
                  "Pure Alpha I", "All Weather", "S&P 500", "AIA Labs"];
  const vals   = [37, 34, 34, 33, 20, 17, 11];
  s.addChart(pres.charts.BAR, [
    { name: "Return %", labels, values: vals },
  ], {
    x: 0.7, y: 1.25, w: 8.6, h: 3.8,
    barDir: "bar",
    chartColors: [GOLD, GOLD, GOLD, GOLD, GOLD, TEAL, GOLD],
    chartArea: { fill: { color: CARD } },
    plotArea: { fill: { color: CARD } },
    catAxisLabelColor: WHITE, catAxisLabelFontFace: "Arial", catAxisLabelFontSize: 11,
    valAxisLabelColor: MUTED, valAxisLabelFontFace: "Arial", valAxisLabelFontSize: 9,
    catAxisLineColor: "888888", valAxisLineColor: "888888",
    valGridLine: { style: "none" }, catGridLine: { style: "none" },
    showValue: true,
    dataLabelColor: GOLD2, dataLabelFontFace: "Arial", dataLabelFontSize: 12, dataLabelFontBold: true,
    dataLabelPosition: "outEnd",
    showLegend: false,
    valAxisMaxVal: 40,
  });
}

// ----------------------------------------------------------
// SLIDE 9 — Market Overview (4 big stats + 4 bulleted rows)
// ----------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, "MARKET OVERVIEW", "Global HF AUM surpassed $5T", "09");

  // Top band — 4 big stats (band pushed down slightly and shortened)
  rect(s, 0.6, 1.2, 8.8, 1.0278, CARD);
  const mStats = [
    { x: 0.85, v: "$5.7T", l1: "Global HF AUM",   l2: "(2026 Est.)" },
    { x: 3.05, v: "9.1%",  l1: "CAGR",             l2: "2026 to 2031" },
    { x: 5.25, v: "73%",   l1: "N. America",       l2: "Market Share" },
    { x: 7.45, v: "$24B",  l1: "Expected Net",     l2: "Inflows 2026" },
  ];
  mStats.forEach(m => {
    s.addText(m.v, {
      ...TB, x: m.x, y: 1.27, w: 1.8, h: 0.45,
      fontSize: 26, bold: true, color: GOLD, fontFace: F_HEAD, align: "center", valign: "middle",
    });
    s.addText([
      { text: m.l1, options: { breakLine: true } },
      { text: m.l2 },
    ], {
      ...TB, x: m.x, y: 1.75, w: 1.8, h: 0.4,
      fontSize: 9, color: MUTED, fontFace: F_BODY, align: "center", valign: "middle",
    });
  });

  // Bulleted rows — left gold tick + bold title + body
  const rows = [
    { y: 2.5,  title: "60/40 Breakdown",      body: "Stock-bond correlations failing to diversify, driving allocators toward hedge funds" },
    { y: 3.15, title: "Higher Rate Regime",   body: "Structural carry lifts returns for market-neutral and relative value strategies" },
    { y: 3.8,  title: "AI/Systematic Growth", body: "Quant strategies growing at 11.6% CAGR, deepest data pipelines ever" },
    { y: 4.45, title: "Institutional Demand", body: "64% of allocators increasing HF exposure in 2026, private banks leading" },
  ];
  rows.forEach(r => {
    rect(s, 0.6, r.y, 0.04, 0.5, GOLD);
    s.addText(r.title, {
      ...TB, x: 0.85, y: r.y, w: 2.4, h: 0.5,
      fontSize: 14, bold: true, color: WHITE, fontFace: F_BODY, valign: "middle",
    });
    s.addText(r.body, {
      ...TB, x: 3.3, y: r.y, w: 6.1, h: 0.5,
      fontSize: 12, color: WHITE, fontFace: F_BODY, valign: "middle",
    });
  });
}

// ----------------------------------------------------------
// SLIDE 10 — Competitive Landscape (chart left, AUM list right)
// ----------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, "COMPETITIVE LANDSCAPE", "Outperformed peers by 20+ points", "10");

  // Left chart card
  rect(s, 0.6, 1.15, 5.3, 3.9, CARD);
  s.addText("2025 FLAGSHIP RETURNS (%)", {
    ...TB, x: 0.8, y: 1.25, w: 4.0, h: 0.2,
    fontSize: 8, charSpacing: 1, color: GOLD, fontFace: F_BODY, valign: "middle",
  });
  s.addChart(pres.charts.BAR, [{
    name: "Return",
    labels: ["Bridgewater", "D.E. Shaw", "AQR", "Point72", "Man Group", "Millennium", "Citadel"],
    values: [34, 28, 20, 14, 12, 10.5, 10.2],
  }], {
    x: 0.7, y: 1.5, w: 5.1, h: 3.4,
    barDir: "bar",
    chartColors: [GOLD],
    chartArea: { fill: { color: CARD } },
    plotArea: { fill: { color: CARD } },
    catAxisLabelColor: WHITE, catAxisLabelFontFace: "Arial", catAxisLabelFontSize: 10,
    valAxisLabelColor: MUTED, valAxisLabelFontFace: "Arial", valAxisLabelFontSize: 9,
    catAxisLineColor: "888888", valAxisLineColor: "888888",
    valGridLine: { style: "none" }, catGridLine: { style: "none" },
    showValue: true, dataLabelColor: GOLD2, dataLabelFontFace: "Arial", dataLabelFontSize: 11,
    dataLabelPosition: "outEnd",
    showLegend: false,
    valAxisMajorUnit: 10,
  });

  // Right peer-AUM card
  rect(s, 6.1, 1.15, 3.35, 3.9, CARD2);
  s.addText("PEER AUM", {
    ...TB, x: 6.3, y: 1.3, w: 3.0, h: 0.2,
    fontSize: 8, charSpacing: 2, color: GOLD, fontFace: F_BODY, valign: "middle",
  });
  const peers = [
    { y: 1.6,  name: "Point72",    aum: "$221B" },
    { y: 2.05, name: "Man Group",  aum: "$193B" },
    { y: 2.5,  name: "Bridgewater",aum: "$92B"  },
    { y: 2.95, name: "Millennium", aum: "$84B"  },
    { y: 3.4,  name: "AQR",        aum: "$75B+" },
    { y: 3.85, name: "Citadel",    aum: "$67B"  },
    { y: 4.3,  name: "D.E. Shaw",  aum: "$60B+" },
  ];
  peers.forEach((p, i) => {
    s.addText(p.name, {
      ...TB, x: 6.3, y: p.y, w: 1.8, h: 0.25,
      fontSize: 11, color: WHITE, fontFace: F_BODY, valign: "middle",
    });
    s.addText(p.aum, {
      ...TB, x: 8.1, y: p.y, w: 1.1, h: 0.25,
      fontSize: 11, bold: true, color: GOLD, fontFace: F_BODY, align: "right", valign: "middle",
    });
    // separator rule between rows (not under the last one)
    if (i < peers.length - 1) rect(s, 6.3, p.y + 0.32, 2.9, 0.005, RULE);
  });
}

// ----------------------------------------------------------
// SLIDE 11 — 2026 Outlook (4 numbered rows, alternating fills)
// ----------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, "2026 OUTLOOK", "Four forces shaping 2026 alpha", "11");

  const forces = [
    { y: 1.2,  num: "01", title: "Modern Mercantilism",
      body: "Once-in-a-century shift toward protectionism reshaping trade, technology, and power between the US, China, and Europe",
      fill: CARD },
    { y: 2.15, num: "02", title: "AI Transformation",
      body: "AI infrastructure investment reshaping markets. AIA Labs leverages AI/ML while positioning for technology-driven shifts",
      fill: STRIPE },
    { y: 3.1,  num: "03", title: "Interest Rate Risk",
      body: "Co-CIO Jensen warns Fed easing could fuel bubbles while long-end bonds face historic supply pressure",
      fill: CARD },
    { y: 4.05, num: "04", title: "Institutional Decay",
      body: "PLACEHOLDER",
      fill: STRIPE },
  ];
  forces.forEach(f => {
    rect(s, 0.6,  f.y, 0.04, 0.78, GOLD);
    rect(s, 0.64, f.y, 8.8,  0.78, f.fill);
    s.addText(f.num, {
      ...TB, x: 0.85, y: f.y + 0.05, w: 0.5, h: 0.3,
      fontSize: 16, bold: true, color: GOLD, fontFace: F_BODY, valign: "middle",
    });
    s.addText(f.title, {
      ...TB, x: 1.4, y: f.y + 0.05, w: 2.5, h: 0.3,
      fontSize: 14, bold: true, color: WHITE, fontFace: F_HEAD, valign: "middle",
    });
    // Body text valign switched from middle -> top, line spacing 1.25
    s.addText(f.body, {
      ...TB, x: 3.9, y: f.y + 0.05, w: 5.3, h: 0.65,
      fontSize: 12, color: WHITE, fontFace: F_BODY, valign: "top", lineSpacingMultiple: 1.25,
    });
  });
}

// ----------------------------------------------------------
// SLIDE 12 — Key Considerations (5 alternating rows)
// ----------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, "KEY CONSIDERATIONS", "Structural considerations to weigh", "12");

  const cons = [
    { y: 1.255, title: "AUM Reduction",    body: "Cut from $154B to $92B lifts returns but caps capacity",   fill: CARD },
    { y: 2.035, title: "Macro Dependency", body: "Returns tied to volatile macro and policy regimes",        fill: STRIPE },
    { y: 2.815, title: "AI/ML Maturity",   body: "AIA Labs trails established quants like Two Sigma, D.E. Shaw", fill: CARD },
    { y: 3.595, title: "Fee Structure",    body: "Institutional-only access with top-tier performance fees", fill: STRIPE },
    { y: 4.375, title: "Founder Transition",body: "First full cycle without Ray Dalio in portfolio decisions", fill: CARD },
  ];
  cons.forEach(c => {
    rect(s, 1.0786, c.y, 7.8429, 0.65, c.fill);
    s.addText(c.title, {
      ...TB, x: 1.2786, y: c.y + 0.05, w: 2.4, h: 0.55,
      fontSize: 13, bold: true, color: GOLD, fontFace: F_BODY, valign: "middle",
    });
    s.addText(c.body, {
      ...TB, x: 3.7786, y: c.y + 0.05, w: 6.0, h: 0.55,
      fontSize: 12, color: WHITE, fontFace: F_BODY, valign: "middle",
    });
  });
}

// ----------------------------------------------------------
// SLIDE 13 — Closing / Contact
// ----------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: BG };

  s.addText("Bridgewater", {
    ...TB, x: 0.6, y: 1.5, w: 8.0, h: 0.85,
    fontSize: 60, bold: true, color: WHITE, fontFace: F_HEAD, valign: "middle",
  });
  s.addText("Associates, LP", {
    ...TB, x: 0.6, y: 2.3, w: 8.0, h: 0.6,
    fontSize: 36, color: GOLD, fontFace: F_HEAD, valign: "middle",
  });
  s.addText("One Glendinning Place, Westport, CT 06880", {
    ...TB, x: 0.6, y: 3.3, w: 6.0, h: 0.25,
    fontSize: 14, color: MUTED, fontFace: F_BODY, valign: "middle",
  });
  s.addText("www.bridgewater.com", {
    ...TB, x: 0.6, y: 3.6, w: 5.0, h: 0.25,
    fontSize: 14, color: GOLD, fontFace: F_BODY, valign: "middle",
  });
  s.addText("© 2026 Bridgewater Associates, LP. All rights reserved.", {
    ...TB, x: 0.6, y: 5.0, w: 5.0, h: 0.2,
    fontSize: 9, color: FOOTER, fontFace: F_BODY, valign: "middle",
  });
}

// ---------- write ----------
pres.writeFile({ fileName: "Bridgewater_edited.pptx" })
  .then(fn => console.log("Wrote", fn));
