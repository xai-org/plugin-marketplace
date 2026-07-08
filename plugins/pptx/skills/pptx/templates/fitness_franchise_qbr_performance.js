const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fs = require("fs");
const { FaChartLine, FaUsers, FaFire, FaTrophy, FaBullseye, FaArrowUp, FaHeartbeat, FaFlag, FaRocket, FaRunning, FaChartBar, FaMedal, FaCheckCircle } = require("react-icons/fa");

function renderIconSvg(IC, color, size = 256) { return ReactDOMServer.renderToStaticMarkup(React.createElement(IC, { color, size: String(size) })); }
async function iconPng(IC, color) { return "image/png;base64," + (await sharp(Buffer.from(renderIconSvg(IC, color))).png().toBuffer()).toString("base64"); }
async function filePng(p) { return "image/png;base64," + fs.readFileSync(p).toString("base64"); }

// ═══════════════════════════════════════════════════
// DESIGN SYSTEM
// ═══════════════════════════════════════════════════

// Refined OTF Zone Palette — softened for executive feel
const C = {
  navy:    "0B1D33",   // Primary dark
  navyMid: "122A45",   // Card backgrounds on dark
  navyLt:  "1A3556",   // Lighter navy for accents
  white:   "FFFFFF",
  offWhite:"F7F8FA",   // Light slide bg
  warmGray:"E8EAED",   // Cards, table fills
  midGray: "8C95A1",   // Secondary text
  darkGray:"3D4A5C",   // Body text on light
  // Zone colors — muted/refined
  zGray:   "8B919A",
  zBlue:   "2B7BBF",
  zGreen:  "4DA855",
  zOrange: "E87A1E",
  zRed:    "D44333",
  // Accent
  brandOr: "F5821F",   // Pure OTF orange for key moments
};

// Grid constants (inches)
const G = {
  L: 0.6,        // Left margin
  R: 9.4,        // Right edge
  W: 8.8,        // Content width
  titleY: 0.45,  // Title baseline
  subtY: 0.95,   // Subtitle Y
  bodyY: 1.35,   // Body content start
  footY: 5.22,   // Footer Y
  footH: 0.4,    // Footer height
};

const makeShadow = () => ({ type: "outer", blur: 4, offset: 1, angle: 135, color: "000000", opacity: 0.08 });

async function build() {
  let pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "L5 Fitness";
  pres.title = "Q1 2025 Performance Review";

  const splat = await filePng("splat_v2.png");
  const splatW = await filePng("splat_white.png");
  const ic = {
    chartW: await iconPng(FaChartLine, "#FFFFFF"),
    usersW: await iconPng(FaUsers, "#FFFFFF"),
    fireW:  await iconPng(FaFire, "#FFFFFF"),
    trophyW:await iconPng(FaTrophy, "#FFFFFF"),
    bullsW: await iconPng(FaBullseye, "#FFFFFF"),
    heartW: await iconPng(FaHeartbeat, "#FFFFFF"),
    flagW:  await iconPng(FaFlag, "#FFFFFF"),
    runW:   await iconPng(FaRunning, "#FFFFFF"),
    medalW: await iconPng(FaMedal, "#FFFFFF"),
    chartO: await iconPng(FaChartLine, `#${C.brandOr}`),
    usersO: await iconPng(FaUsers, `#${C.brandOr}`),
    bullsO: await iconPng(FaBullseye, `#${C.brandOr}`),
    heartO: await iconPng(FaHeartbeat, `#${C.brandOr}`),
    fireO:  await iconPng(FaFire, `#${C.brandOr}`),
    flagO:  await iconPng(FaFlag, `#${C.brandOr}`),
    runO:   await iconPng(FaRunning, `#${C.brandOr}`),
    barO:   await iconPng(FaChartBar, `#${C.brandOr}`),
    checkG: await iconPng(FaCheckCircle, `#${C.zGreen}`),
  };

  // ── Reusable slide builders ──
  function darkSlide() {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.04, fill: { color: C.brandOr } });
    return s;
  }
  function lightSlide() {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.04, fill: { color: C.brandOr } });
    return s;
  }
  function addFooter(s, dark = false) {
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: G.footY, w: 10, h: G.footH, fill: { color: dark ? "070F1A" : C.navy } });
    s.addImage({ data: splat, x: 0.35, y: G.footY + 0.05, w: 0.28, h: 0.28 });
    s.addText("ORANGETHEORY FITNESS  |  L5 FITNESS  |  Q1 2025", {
      x: 0.75, y: G.footY, w: 8, h: G.footH, fontSize: 7.5, fontFace: "Arial", color: C.midGray, valign: "middle", charSpacing: 2.5, margin: 0
    });
  }
  function darkTitle(s, icon, text) {
    s.addImage({ data: icon, x: G.L, y: G.titleY - 0.05, w: 0.32, h: 0.32 });
    s.addText(text, { x: G.L + 0.42, y: G.titleY - 0.1, w: 8, h: 0.45, fontSize: 24, fontFace: "Arial Black", color: C.white, bold: true, margin: 0 });
  }
  function lightTitle(s, icon, text) {
    s.addImage({ data: icon, x: G.L, y: G.titleY - 0.05, w: 0.32, h: 0.32 });
    s.addText(text, { x: G.L + 0.42, y: G.titleY - 0.1, w: 8, h: 0.45, fontSize: 24, fontFace: "Arial Black", color: C.navy, bold: true, margin: 0 });
  }
  // Focus slide subtitle bar
  function focusSubtitle(s, text, dark = true) {
    const col = dark ? C.brandOr : C.brandOr;
    s.addText(text, { x: G.L, y: G.subtY - 0.05, w: G.W, h: 0.3, fontSize: 9.5, fontFace: "Arial", color: col, bold: true, charSpacing: 1.5, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: G.L, y: G.subtY + 0.25, w: G.W, h: 0.02, fill: { color: dark ? C.navyLt : C.warmGray } });
  }
  // Reusable "KEY INSIGHT" bar (navy bg, orange header, white text)
  function addInsightBar(s, text, y, w, opts = {}) {
    const x = opts.x || G.L;
    const h = opts.h || 0.7;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.navy } });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.04, fill: { color: C.brandOr } });
    s.addText("KEY INSIGHT", { x: x + 0.2, y: y + 0.1, w: 2, h: 0.2, fontSize: 10, fontFace: "Arial", color: C.brandOr, bold: true, charSpacing: 2, margin: 0 });
    s.addText(text, { x: x + 0.2, y: y + 0.32, w: w - 0.4, h: h - 0.42, fontSize: 11, fontFace: "Calibri", color: "D0D8E0", valign: "top", margin: 0 });
  }

  // ═══════════════════════════════════════════════════
  // SLIDE 1: TITLE
  // ═══════════════════════════════════════════════════
  const s1 = darkSlide();
  s1.addImage({ data: splatW, x: 5.8, y: -0.3, w: 5.5, h: 5.5, transparency: 92 });
  s1.addImage({ data: splat, x: G.L, y: 1.1, w: 0.65, h: 0.65 });
  s1.addText("L5 FITNESS", { x: G.L + 0.8, y: 1.15, w: 4, h: 0.5, fontSize: 13, fontFace: "Arial", color: C.brandOr, charSpacing: 6, bold: true, margin: 0 });
  s1.addText("Q1 2025", { x: G.L, y: 2.1, w: 7, h: 0.7, fontSize: 52, fontFace: "Arial Black", color: C.white, bold: true, margin: 0 });
  s1.addText("Performance Review", { x: G.L, y: 2.75, w: 7, h: 0.65, fontSize: 40, fontFace: "Arial Black", color: C.brandOr, bold: true, margin: 0 });
  s1.addShape(pres.shapes.RECTANGLE, { x: G.L, y: 3.65, w: 1.0, h: 0.035, fill: { color: C.brandOr } });
  s1.addText("42 Studios  |  6 Regions  |  20,344 Active Members", { x: G.L, y: 3.9, w: 6, h: 0.3, fontSize: 13, fontFace: "Calibri", color: C.midGray, margin: 0 });
  s1.addText("January – March 2025", { x: G.L, y: 4.25, w: 4, h: 0.3, fontSize: 12, fontFace: "Calibri", color: C.midGray, italic: true, margin: 0 });
  // Zone strip
  [C.zGray, C.zBlue, C.zGreen, C.zOrange, C.zRed].forEach((c, i) => {
    s1.addShape(pres.shapes.RECTANGLE, { x: i * 2, y: 5.58, w: 2, h: 0.045, fill: { color: c } });
  });

  // ═══════════════════════════════════════════════════
  // SLIDE 2: EXECUTIVE SUMMARY
  // ═══════════════════════════════════════════════════
  const s2 = lightSlide();
  lightTitle(s2, ic.chartO, "Executive Summary");

  const cards = [
    { label: "ACTIVE MEMBERS", val: "20,344", sub: "Across 42 studios", accent: C.zOrange },
    { label: "NET GROWTH", val: "+835", sub: "79% of studios grew", accent: C.zGreen },
    { label: "NEW JOINS", val: "2,621", sub: "Q1 acquisitions", accent: C.zOrange },
    { label: "LEADS CAPTURED", val: "14,578", sub: "Group-wide pipeline", accent: C.zBlue },
  ];
  cards.forEach((c, i) => {
    const x = G.L + i * 2.25;
    s2.addShape(pres.shapes.RECTANGLE, { x, y: 1.1, w: 2.05, h: 1.5, fill: { color: C.white }, shadow: makeShadow() });
    s2.addShape(pres.shapes.RECTANGLE, { x, y: 1.1, w: 2.05, h: 0.04, fill: { color: c.accent } });
    s2.addText(c.label, { x: x + 0.15, y: 1.25, w: 1.8, h: 0.2, fontSize: 8, fontFace: "Arial", color: C.midGray, bold: true, charSpacing: 2, margin: 0 });
    s2.addText(c.val, { x: x + 0.15, y: 1.5, w: 1.8, h: 0.5, fontSize: 30, fontFace: "Arial Black", color: C.navy, bold: true, margin: 0 });
    s2.addText(c.sub, { x: x + 0.15, y: 2.1, w: 1.8, h: 0.2, fontSize: 10, fontFace: "Calibri", color: C.midGray, margin: 0 });
  });

  const takeaways = [
    { text: "33 of 42 studios posted positive net member growth — a strong Q1 foundation", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: "Calibri", color: C.darkGray } },
    { text: "Close Rate averaged 56.5% — above industry benchmarks", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: "Calibri", color: C.darkGray } },
    { text: "120-Day Retention at 80.3% — 34 studios above the 75% KPI threshold", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: "Calibri", color: C.darkGray } },
    { text: "Workouts/Member/Week at 1.64 avg — our biggest opportunity (OTF target: 1.8)", options: { bullet: true, fontSize: 12, fontFace: "Calibri", color: C.darkGray } },
  ];
  s2.addText("Key Takeaways", { x: G.L, y: 2.85, w: 4, h: 0.3, fontSize: 14, fontFace: "Arial", color: C.navy, bold: true, margin: 0 });
  s2.addText(takeaways, { x: G.L, y: 3.15, w: G.W, h: 1.8, paraSpaceAfter: 5 });
  addFooter(s2);

  // ═══════════════════════════════════════════════════
  // SLIDE 3: KPI SCORECARD
  // ═══════════════════════════════════════════════════
  const s3 = darkSlide();
  darkTitle(s3, ic.heartW, "Group KPI Scorecard");

  const kpis = [
    { m: "Close Rate", v: "56.5%", t: ">60%", zone: "orange", status: "WITHIN RANGE" },
    { m: "Lead-to-Join", v: "18.5%", t: ">20%", zone: "orange", status: "WITHIN RANGE" },
    { m: "120-Day Retention", v: "80.3%", t: ">75%", zone: "green", status: "ON TARGET" },
    { m: "Workouts/Week", v: "1.64", t: "1.80", zone: "blue", status: "NEEDS FOCUS" },
    { m: "HRM Usage", v: "81.4%", t: ">80%", zone: "green", status: "ON TARGET" },
    { m: "Booking Rate", v: "47.2%", t: ">50%", zone: "orange", status: "WITHIN RANGE" },
  ];
  const zc = { green: C.zGreen, orange: C.zOrange, blue: C.zBlue };

  kpis.forEach((k, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = G.L + col * 3.0;
    const y = 1.05 + row * 2.0;
    s3.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.8, h: 1.75, fill: { color: C.navyMid } });
    s3.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.8, h: 0.04, fill: { color: zc[k.zone] } });
    s3.addText(k.m, { x: x + 0.2, y: y + 0.15, w: 2.4, h: 0.2, fontSize: 10, fontFace: "Arial", color: C.midGray, bold: true, margin: 0 });
    s3.addText(k.v, { x: x + 0.2, y: y + 0.4, w: 2.4, h: 0.55, fontSize: 34, fontFace: "Arial Black", color: C.white, bold: true, margin: 0 });
    s3.addText(`Target: ${k.t}`, { x: x + 0.2, y: y + 1.0, w: 1.3, h: 0.2, fontSize: 9.5, fontFace: "Calibri", color: zc[k.zone], bold: true, margin: 0 });
    s3.addShape(pres.shapes.RECTANGLE, { x: x + 0.2, y: y + 1.3, w: 1.2, h: 0.25, fill: { color: zc[k.zone] } });
    s3.addText(k.status, { x: x + 0.2, y: y + 1.3, w: 1.2, h: 0.25, fontSize: 7, fontFace: "Arial", color: C.white, bold: true, align: "center", valign: "middle", charSpacing: 2, margin: 0 });
  });
  // Legend removed in revised version

  // ═══════════════════════════════════════════════════
  // SLIDE 4: TOP PERFORMERS
  // ═══════════════════════════════════════════════════
  const s4 = darkSlide();
  darkTitle(s4, ic.trophyW, "Q1 Top Performers");
  s4.addText("Studios leading the way across key metrics", { x: G.L + 0.42, y: G.subtY - 0.1, w: 6, h: 0.25, fontSize: 11, fontFace: "Calibri", color: C.midGray, italic: true, margin: 0 });
  s4.addImage({ data: splatW, x: 7.5, y: 2.0, w: 3, h: 3, transparency: 93 });

  const top5 = [
    ["#1", "Grosse Pointe Woods", "MI", "90% retention · 70% close · 1.92 workouts/wk"],
    ["#2", "Santa Fe", "NM/TX", "Highest lead-to-join at 26% · 93 new joins"],
    ["#3", "Shorewood", "IL", "Best close rate at 75% · 89% retention"],
    ["#4", "Royal Oak", "MI", "114 new joins · 2nd highest in group"],
    ["#5", "Naperville", "IL", "+69 net growth · strongest member gains"],
  ];
  top5.forEach((r, i) => {
    const y = 1.3 + i * 0.72;
    s4.addShape(pres.shapes.RECTANGLE, { x: G.L, y, w: G.W, h: 0.58, fill: { color: C.navyMid } });
    s4.addShape(pres.shapes.RECTANGLE, { x: G.L, y, w: 0.05, h: 0.58, fill: { color: C.brandOr } });
    s4.addText(r[0], { x: G.L + 0.2, y, w: 0.45, h: 0.58, fontSize: 15, fontFace: "Arial Black", color: C.brandOr, valign: "middle", margin: 0 });
    s4.addText(r[1], { x: G.L + 0.7, y, w: 2.5, h: 0.58, fontSize: 13, fontFace: "Arial", color: C.white, bold: true, valign: "middle", margin: 0 });
    s4.addText(r[2], { x: G.L + 3.2, y, w: 0.6, h: 0.58, fontSize: 10, fontFace: "Arial", color: C.midGray, valign: "middle", margin: 0 });
    s4.addText(r[3], { x: G.L + 3.9, y, w: 4.7, h: 0.58, fontSize: 11, fontFace: "Calibri", color: "C8CDD4", valign: "middle", margin: 0 });
  });
  addFooter(s4, true);

  // ═══════════════════════════════════════════════════
  // SLIDE 5: REGIONAL PERFORMANCE
  // ═══════════════════════════════════════════════════
  const s5 = lightSlide();
  lightTitle(s5, ic.barO, "Regional Performance");

  s5.addChart(pres.charts.BAR, [{
    name: "Close Rate %", labels: ["MO", "MI", "IL", "NM/TX", "ID", "UT"], values: [61.2, 59.9, 56.9, 56.8, 50.8, 48.2]
  }], {
    x: G.L, y: 1.0, w: 4.1, h: 2.15, barDir: "col",
    showTitle: true, title: "Close Rate by Region", titleColor: C.navy, titleFontSize: 10,
    chartColors: [C.zOrange], chartArea: { fill: { color: C.white }, roundedCorners: true },
    catAxisLabelColor: C.darkGray, valAxisLabelColor: C.darkGray, catAxisLabelFontSize: 9,
    valGridLine: { color: C.warmGray, size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.navy, dataLabelFontSize: 9,
    showLegend: false, valAxisMinVal: 30
  });
  s5.addChart(pres.charts.BAR, [{
    name: "Workouts/Wk", labels: ["NM/TX", "ID", "UT", "IL", "MI", "MO"], values: [1.77, 1.74, 1.69, 1.63, 1.59, 1.55]
  }], {
    x: 5.3, y: 1.0, w: 4.1, h: 2.15, barDir: "col",
    showTitle: true, title: "Workouts per Member per Week", titleColor: C.navy, titleFontSize: 10,
    chartColors: [C.zBlue], chartArea: { fill: { color: C.white }, roundedCorners: true },
    catAxisLabelColor: C.darkGray, valAxisLabelColor: C.darkGray, catAxisLabelFontSize: 9,
    valGridLine: { color: C.warmGray, size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.navy, dataLabelFontSize: 9,
    showLegend: false, valAxisMinVal: 1.3
  });

  const tH = [["Region", "Studios", "Avg Members", "Net Change", "Close %", "Retention", "HRM %"].map(t => ({
    text: t, options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 9, fontFace: "Arial", align: t === "Region" ? "left" : "center" }
  }))];
  const tR = [
    ["Illinois (12)", "12", "491", "+27", "56.9%", "81.0%", "78.1%"],
    ["Michigan (10)", "10", "548", "+23", "59.9%", "78.1%", "84.2%"],
    ["Missouri (6)", "6", "376", "+25", "61.2%", "83.4%", "81.3%"],
    ["Utah (6)", "6", "477", "-4", "48.2%", "80.5%", "74.3%"],
    ["NM/TX (5)", "5", "440", "+23", "56.8%", "81.8%", "89.1%"],
    ["Idaho (3)", "3", "552", "+13", "50.8%", "75.9%", "85.8%"],
  ].map(r => r.map((c, ci) => ({ text: c, options: { fontSize: 9, fontFace: "Calibri", align: ci === 0 ? "left" : "center", fill: { color: ci === 0 ? C.warmGray : C.white }, color: c.startsWith("-") ? C.zRed : C.darkGray, bold: ci === 0 } })));
  s5.addTable([...tH, ...tR], { x: G.L, y: 3.3, w: 7.0, h: 1.5, border: { pt: 0.5, color: C.warmGray }, colW: [1.2, 0.6, 1.0, 1.0, 0.85, 0.95, 0.85], rowH: [0.21, 0.21, 0.21, 0.21, 0.21, 0.21, 0.21] });

  // Utah Alert callout (added in revised version)
  s5.addShape(pres.shapes.RECTANGLE, { x: 7.8, y: 3.3, w: 1.6, h: 1.5, fill: { color: C.navy } });
  s5.addShape(pres.shapes.RECTANGLE, { x: 7.8, y: 3.3, w: 1.6, h: 0.04, fill: { color: C.brandOr } });
  s5.addText("UTAH ALERT", { x: 7.9, y: 3.42, w: 1.4, h: 0.2, fontSize: 10, fontFace: "Arial", color: C.brandOr, bold: true, charSpacing: 1, margin: 0 });
  s5.addText("5 of 6 studios posted negative net change. Q2 turnaround priority.", { x: 7.9, y: 3.7, w: 1.4, h: 1.0, fontSize: 10.5, fontFace: "Calibri", color: "D0D8E0", margin: 0 });

  addFooter(s5);

  // ═══════════════════════════════════════════════════
  // SLIDE 6: GROWTH
  // ═══════════════════════════════════════════════════
  const s6 = lightSlide();
  lightTitle(s6, ic.usersO, "Growth & Member Acquisition");

  s6.addChart(pres.charts.BAR, [{
    name: "New Joins", labels: ["Shorewood", "Salt Lake City", "Orland Park", "Naperville", "Coronado", "Santa Fe", "Boise", "Royal Oak", "Grosse Pointe Woods", "Central West End"], values: [76, 80, 82, 88, 90, 93, 96, 114, 122, 130]
  }], {
    x: G.L, y: 1.0, w: 5.5, h: 3.0, barDir: "bar",
    showTitle: true, title: "Top 10 — New Joins (Q1)", titleColor: C.navy, titleFontSize: 10,
    chartColors: [C.zOrange], chartArea: { fill: { color: C.white }, roundedCorners: true },
    catAxisLabelColor: C.darkGray, catAxisLabelFontSize: 9, valAxisLabelColor: C.darkGray,
    valGridLine: { color: C.warmGray, size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.navy, dataLabelFontSize: 9,
    showLegend: false
  });

  const gCards = [
    { l: "JOINS + WINBACKS", v: "5,233", a: C.zGreen },
    { l: "TOTAL CHURNS", v: "3,043", a: C.zRed },
    { l: "NET GROWTH", v: "+835", a: C.zOrange },
    { l: "STUDIOS GROWING", v: "33/42", a: C.zGreen },
  ];
  gCards.forEach((c, i) => {
    const y = 1.05 + i * 0.82;
    s6.addShape(pres.shapes.RECTANGLE, { x: 6.5, y, w: 2.9, h: 0.68, fill: { color: C.white }, shadow: makeShadow() });
    s6.addShape(pres.shapes.RECTANGLE, { x: 6.5, y, w: 0.05, h: 0.68, fill: { color: c.a } });
    s6.addText(c.l, { x: 6.7, y, w: 1.3, h: 0.68, fontSize: 8, fontFace: "Arial", color: C.midGray, bold: true, valign: "middle", charSpacing: 1, margin: 0 });
    s6.addText(c.v, { x: 7.9, y, w: 1.4, h: 0.68, fontSize: 22, fontFace: "Arial Black", color: C.navy, bold: true, align: "right", valign: "middle", margin: 0 });
  });
  // Utah warning text removed in revised version
  addFooter(s6);

  // ═══════════════════════════════════════════════════
  // SLIDE 7: SALES FUNNEL
  // ═══════════════════════════════════════════════════
  const s7 = lightSlide();
  lightTitle(s7, ic.bullsO, "Sales Funnel Deep Dive");

  const funnel = [
    { stage: "Leads Captured", val: "14,578", w: 7.4, c: C.zGray, z: "ZONE 1" },
    { stage: "Booked (47.2%)", val: "~6,881", w: 5.9, c: C.zBlue, z: "ZONE 2" },
    { stage: "Intros Taken (60.5%)", val: "~4,163", w: 4.5, c: C.zGreen, z: "ZONE 3" },
    { stage: "Closed (56.5%)", val: "~2,352", w: 3.3, c: C.zOrange, z: "ZONE 4" },
    { stage: "Joined", val: "2,621*", w: 2.4, c: C.zRed, z: "ZONE 5" },
  ];
  funnel.forEach((f, i) => {
    const y = 0.95 + i * 0.68;
    s7.addShape(pres.shapes.RECTANGLE, { x: G.L, y, w: f.w, h: 0.5, fill: { color: f.c } });
    s7.addText(f.stage, { x: G.L + 0.15, y, w: f.w * 0.5, h: 0.5, fontSize: 11, fontFace: "Arial", color: C.white, bold: true, valign: "middle", margin: 0 });
    s7.addText(f.val, { x: G.L + f.w * 0.5, y, w: f.w * 0.5 - 0.15, h: 0.5, fontSize: 16, fontFace: "Arial Black", color: C.white, bold: true, valign: "middle", align: "right", margin: 0 });
    // Zone pill
    const px = G.L + f.w + 0.2;
    s7.addShape(pres.shapes.OVAL, { x: px, y: y + 0.1, w: 0.3, h: 0.3, fill: { color: f.c } });
    s7.addText(String(i + 1), { x: px, y: y + 0.1, w: 0.3, h: 0.3, fontSize: 11, fontFace: "Arial", color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  });
  s7.addText("*Includes winbacks and other joins beyond direct lead conversion", { x: G.L, y: 4.45, w: 8, h: 0.2, fontSize: 8, fontFace: "Calibri", color: C.midGray, italic: true, margin: 0 });

  // KEY INSIGHT box (revised: navy dark box instead of white box with orange left bar)
  s7.addShape(pres.shapes.RECTANGLE, { x: 5.8, y: 3.0, w: 3.6, h: 1.3, fill: { color: C.navy } });
  s7.addShape(pres.shapes.RECTANGLE, { x: 5.8, y: 3.0, w: 3.6, h: 0.04, fill: { color: C.brandOr } });
  s7.addText("KEY INSIGHT", { x: 6.0, y: 3.12, w: 2, h: 0.25, fontSize: 10, fontFace: "Arial", color: C.brandOr, bold: true, charSpacing: 2, margin: 0 });
  s7.addText("Biggest drop-off at booking (47%). Improving by 5 pts could yield 730 additional intros per quarter.", { x: 6.0, y: 3.45, w: 3.2, h: 0.75, fontSize: 11, fontFace: "Calibri", color: "D0D8E0", margin: 0 });

  addFooter(s7);

  // ═══════════════════════════════════════════════════
  // SLIDE 8: FOCUS #1 — WORKOUTS/WK
  // ═══════════════════════════════════════════════════
  const s8 = darkSlide();
  darkTitle(s8, ic.runW, "Focus #1: Workouts per Member per Week");
  focusSubtitle(s8, "GROUP AVG: 1.64  |  OTF TARGET: 1.80  |  ONLY 9 OF 42 STUDIOS AT TARGET");

  s8.addChart(pres.charts.BAR, [{
    name: "Workouts/Wk", labels: ["Lehi", "Provo/Orem", "GPW", "Santa Fe", "ABQ West", "Eagle Island", "Algonquin", "So. Elgin", "Shorewood", "ABQ NE Hts"], values: [2.09, 1.93, 1.92, 1.89, 1.88, 1.84, 1.84, 1.83, 1.83, 1.82]
  }], {
    x: G.L, y: G.bodyY, w: 5.2, h: 3.3, barDir: "bar",
    chartColors: [C.zOrange], chartArea: { fill: { color: C.navyMid }, roundedCorners: true },
    catAxisLabelColor: "D0D8E0", catAxisLabelFontSize: 9, valAxisLabelColor: "D0D8E0",
    valGridLine: { color: C.navyLt, size: 0.5 }, catGridLine: { style: "none" },
    showValue: false, showLegend: false, showTitle: false
  });

  // Right panel
  s8.addShape(pres.shapes.RECTANGLE, { x: 6.1, y: G.bodyY, w: 3.3, h: 3.3, fill: { color: C.navyMid } });
  s8.addShape(pres.shapes.RECTANGLE, { x: 6.1, y: G.bodyY, w: 3.3, h: 0.04, fill: { color: C.brandOr } });
  s8.addText("WHY IT MATTERS", { x: 6.25, y: G.bodyY + 0.15, w: 3, h: 0.2, fontSize: 10, fontFace: "Arial", color: C.brandOr, bold: true, charSpacing: 3, margin: 0 });
  const wm1 = [
    { text: "Higher visit frequency = better retention & lifetime value", options: { bullet: true, breakLine: true, fontSize: 11, fontFace: "Calibri", color: "D0D8E0" } },
    { text: "Members at 2x/wk are 3x more likely to stay past 6 months", options: { bullet: true, breakLine: true, fontSize: 11, fontFace: "Calibri", color: "D0D8E0" } },
    { text: "Direct correlation with revenue per member", options: { bullet: true, fontSize: 11, fontFace: "Calibri", color: "D0D8E0" } },
  ];
  s8.addText(wm1, { x: 6.25, y: G.bodyY + 0.45, w: 3, h: 1.2, paraSpaceAfter: 4 });
  s8.addText("Q2 ACTIONS", { x: 6.25, y: G.bodyY + 1.75, w: 3, h: 0.2, fontSize: 10, fontFace: "Arial", color: C.zGreen, bold: true, charSpacing: 3, margin: 0 });
  const wm2 = [
    { text: "Nudge campaigns for 1x/wk members", options: { bullet: true, breakLine: true, fontSize: 11, fontFace: "Calibri", color: "D0D8E0" } },
    { text: "Study Lehi (2.09) & Provo scheduling", options: { bullet: true, breakLine: true, fontSize: 11, fontFace: "Calibri", color: "D0D8E0" } },
    { text: "Coach outreach for 7+ day absences", options: { bullet: true, breakLine: true, fontSize: 11, fontFace: "Calibri", color: "D0D8E0" } },
    { text: "Regional workout challenges", options: { bullet: true, fontSize: 11, fontFace: "Calibri", color: "D0D8E0" } },
  ];
  s8.addText(wm2, { x: 6.25, y: G.bodyY + 2.0, w: 3, h: 1.15, paraSpaceAfter: 3 });
  addFooter(s8, true);

  // ═══════════════════════════════════════════════════
  // SLIDE 9: FOCUS #2 — LEAD-TO-JOIN
  // ═══════════════════════════════════════════════════
  const s9 = lightSlide();
  lightTitle(s9, ic.bullsO, "Focus #2: Lead-to-Join Conversion");
  focusSubtitle(s9, "GROUP AVG: 18.5%  |  TARGET: 20%+  |  3 LEVERS: BOOK → SHOW → CLOSE", false);

  s9.addChart(pres.charts.BAR, [{
    name: "L2J %", labels: ["Eagle Island", "Santa Fe", "Am. Fork", "Commerce Twp", "Shorewood", "Boise", "ABQ West", "Naperville", "Ellisville", "Royal Oak"], values: [27.1, 26.0, 24.1, 24.0, 22.8, 22.5, 21.8, 21.5, 20.4, 20.3]
  }], {
    x: G.L, y: G.bodyY, w: 5.2, h: 2.7, barDir: "bar",
    chartColors: [C.zGreen], chartArea: { fill: { color: C.white }, roundedCorners: true },
    catAxisLabelColor: C.darkGray, catAxisLabelFontSize: 9, valAxisLabelColor: C.darkGray,
    valGridLine: { color: C.warmGray, size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.navy, dataLabelFontSize: 9,
    showLegend: false, showTitle: false
  });

  // Conversion math — centered, big
  s9.addShape(pres.shapes.RECTANGLE, { x: 6.1, y: G.bodyY, w: 3.3, h: 2.7, fill: { color: C.navy } });
  s9.addShape(pres.shapes.RECTANGLE, { x: 6.1, y: G.bodyY, w: 3.3, h: 0.04, fill: { color: C.brandOr } });
  s9.addText("CONVERSION MATH", { x: 6.1, y: G.bodyY + 0.15, w: 3.3, h: 0.25, fontSize: 10, fontFace: "Arial", color: C.brandOr, bold: true, charSpacing: 3, align: "center", margin: 0 });
  const cm = [
    { text: "1. BOOKING: 47.2%", options: { breakLine: true, fontSize: 15, fontFace: "Arial", color: C.white, bold: true, align: "center" } },
    { text: "+5% = ~730 more intros", options: { breakLine: true, fontSize: 11, fontFace: "Calibri", color: C.midGray, align: "center" } },
    { text: " ", options: { breakLine: true, fontSize: 6 } },
    { text: "2. SHOW RATE: 60.5%", options: { breakLine: true, fontSize: 15, fontFace: "Arial", color: C.white, bold: true, align: "center" } },
    { text: "~40% are no-shows", options: { breakLine: true, fontSize: 11, fontFace: "Calibri", color: C.midGray, align: "center" } },
    { text: " ", options: { breakLine: true, fontSize: 6 } },
    { text: "3. CLOSE: 56.5%", options: { breakLine: true, fontSize: 15, fontFace: "Arial", color: C.white, bold: true, align: "center" } },
    { text: "Our strongest stage", options: { fontSize: 11, fontFace: "Calibri", color: C.midGray, align: "center" } },
  ];
  s9.addText(cm, { x: 6.1, y: G.bodyY + 0.45, w: 3.3, h: 2.1, valign: "middle" });

  // Q2 PRIORITY insight bar (revised: styled like KEY INSIGHT bars)
  s9.addShape(pres.shapes.RECTANGLE, { x: G.L, y: 4.2, w: G.W, h: 0.55, fill: { color: C.navy } });
  s9.addShape(pres.shapes.RECTANGLE, { x: G.L, y: 4.2, w: G.W, h: 0.04, fill: { color: C.brandOr } });
  s9.addText([
    { text: "Q2 PRIORITY: ", options: { fontSize: 11, fontFace: "Arial", color: C.brandOr, bold: true } },
    { text: "Booking + show rate are our biggest levers. Eagle Island books 50% AND converts 75.7% of taken intros.", options: { fontSize: 11, fontFace: "Calibri", color: "D0D8E0" } },
  ], { x: G.L + 0.2, y: 4.24, w: G.W - 0.4, h: 0.47, valign: "middle", margin: 0 });
  addFooter(s9);

  // ═══════════════════════════════════════════════════
  // SLIDE 10: FOCUS #3 — CLOSE RATE
  // ═══════════════════════════════════════════════════
  const s10 = lightSlide();
  lightTitle(s10, ic.fireO, "Focus #3: Close Rate");
  focusSubtitle(s10, "GROUP AVG: 56.5%  |  TARGET: 60%+  |  DIRECT REVENUE DRIVER", false);

  s10.addChart(pres.charts.BAR, [{
    name: "Close %", labels: ["Ellisville", "Shorewood", "Commerce Twp", "GPW", "So. Elgin", "R.O. Woodward", "Algonquin", "Northville", "Am. Fork", "St Charles MO"], values: [76.1, 75.3, 74.3, 70.1, 65.0, 65.5, 64.8, 65.4, 61.7, 49.4]
  }], {
    x: G.L, y: G.bodyY, w: 4.3, h: 2.7, barDir: "bar",
    showTitle: true, title: "Highest Close Rates", titleColor: C.navy, titleFontSize: 10,
    chartColors: [C.zOrange], chartArea: { fill: { color: C.white }, roundedCorners: true },
    catAxisLabelColor: C.darkGray, catAxisLabelFontSize: 8, valAxisLabelColor: C.darkGray,
    valGridLine: { color: C.warmGray, size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.navy, dataLabelFontSize: 8,
    showLegend: false, valAxisMinVal: 40
  });
  s10.addChart(pres.charts.BAR, [{
    name: "Close %", labels: ["Sugar House", "Lehi", "Chi Millennium", "Provo/Orem", "Troy", "Boise"], values: [38.0, 41.2, 41.7, 42.4, 43.7, 45.8]
  }], {
    x: 5.3, y: G.bodyY, w: 4.1, h: 2.7, barDir: "bar",
    showTitle: true, title: "Biggest Opportunity — Below 46%", titleColor: C.navy, titleFontSize: 10,
    chartColors: [C.zRed], chartArea: { fill: { color: C.white }, roundedCorners: true },
    catAxisLabelColor: C.darkGray, catAxisLabelFontSize: 8, valAxisLabelColor: C.darkGray,
    valGridLine: { color: C.warmGray, size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.navy, dataLabelFontSize: 8,
    showLegend: false, valAxisMinVal: 20
  });

  // KEY INSIGHT bar (revised: navy bg instead of white box)
  s10.addShape(pres.shapes.RECTANGLE, { x: G.L, y: 4.2, w: G.W, h: 0.55, fill: { color: C.navy } });
  s10.addShape(pres.shapes.RECTANGLE, { x: G.L, y: 4.2, w: G.W, h: 0.04, fill: { color: C.brandOr } });
  s10.addText([
    { text: "KEY INSIGHT: ", options: { fontSize: 11, fontFace: "Arial", color: C.brandOr, bold: true } },
    { text: "Lifting our bottom-10 studios by just 10 points translates to ~200+ additional members per quarter.", options: { fontSize: 11, fontFace: "Calibri", color: "D0D8E0" } },
  ], { x: G.L + 0.2, y: 4.24, w: G.W - 0.4, h: 0.47, valign: "middle", margin: 0 });
  addFooter(s10);

  // ═══════════════════════════════════════════════════
  // SLIDE 11: RETENTION
  // ═══════════════════════════════════════════════════
  const s11 = lightSlide();
  lightTitle(s11, ic.heartO, "Retention & Engagement");

  s11.addChart(pres.charts.BAR, [{
    name: "120-Day Retention %", labels: ["Cottleville", "Algonquin", "Am. Fork", "GPW", "St. Charles IL", "Shorewood", "Provo/Orem", "Lombard", "Ellisville", "Chi Millen."], values: [96.9, 91.3, 91.2, 90.0, 89.5, 89.1, 86.0, 85.7, 84.6, 84.6]
  }], {
    x: G.L, y: 1.0, w: 5.6, h: 3.2, barDir: "bar",
    showTitle: true, title: "Top 10 — 120-Day Retention", titleColor: C.navy, titleFontSize: 10,
    chartColors: [C.zGreen], chartArea: { fill: { color: C.white }, roundedCorners: true },
    catAxisLabelColor: C.darkGray, catAxisLabelFontSize: 9, valAxisLabelColor: C.darkGray,
    valGridLine: { color: C.warmGray, size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.navy, dataLabelFontSize: 9,
    showLegend: false, valAxisMinVal: 70
  });

  s11.addShape(pres.shapes.RECTANGLE, { x: 6.5, y: 1.0, w: 2.9, h: 3.2, fill: { color: C.navy } });
  s11.addShape(pres.shapes.RECTANGLE, { x: 6.5, y: 1.0, w: 2.9, h: 0.04, fill: { color: C.brandOr } });
  s11.addText("RETENTION WINS", { x: 6.65, y: 1.15, w: 2.6, h: 0.25, fontSize: 10, fontFace: "Arial", color: C.brandOr, bold: true, charSpacing: 2, margin: 0 });
  const rW = [
    { text: "Cottleville at 97% — exceptional stickiness", options: { bullet: true, breakLine: true, fontSize: 12.5, fontFace: "Calibri", color: "D0D8E0" } },
    { text: "34 of 42 above 75% KPI", options: { bullet: true, breakLine: true, fontSize: 12.5, fontFace: "Calibri", color: "D0D8E0" } },
    { text: "Missouri leads at 83.4%", options: { bullet: true, breakLine: true, fontSize: 12.5, fontFace: "Calibri", color: "D0D8E0" } },
    { text: "8 studios below 75% need intervention", options: { bullet: true, fontSize: 12.5, fontFace: "Calibri", color: C.zRed } },
  ];
  s11.addText(rW, { x: 6.65, y: 1.5, w: 2.6, h: 2.5, paraSpaceAfter: 10 });

  // KEY INSIGHT bar (revised: navy bg bar instead of italic text)
  s11.addShape(pres.shapes.RECTANGLE, { x: G.L, y: 4.35, w: G.W, h: 0.55, fill: { color: C.navy } });
  s11.addShape(pres.shapes.RECTANGLE, { x: G.L, y: 4.35, w: G.W, h: 0.04, fill: { color: C.brandOr } });
  s11.addText([
    { text: "KEY INSIGHT: ", options: { fontSize: 11, fontFace: "Arial", color: C.brandOr, bold: true } },
    { text: "Higher workouts/wk correlates directly with better retention. Solving visit frequency will improve this metric.", options: { fontSize: 11, fontFace: "Calibri", color: "D0D8E0" } },
  ], { x: G.L + 0.2, y: 4.39, w: G.W - 0.4, h: 0.47, valign: "middle", margin: 0 });
  addFooter(s11);

  // ═══════════════════════════════════════════════════
  // SLIDE 12: STUDIO SPOTLIGHTS
  // ═══════════════════════════════════════════════════
  const s12 = darkSlide();
  darkTitle(s12, ic.medalW, "Studio Spotlights");
  s12.addImage({ data: splatW, x: 7.5, y: 3.2, w: 3, h: 3, transparency: 93 });

  const spots = [
    { s: "Cottleville", r: "MO", stat: "96.9% retention", note: "Highest in the group — members love being there" },
    { s: "Central West End", r: "MO", stat: "130 new joins", note: "Most acquisitions · 862 leads captured" },
    { s: "Chicago Lincoln Park", r: "IL", stat: "+144 net growth", note: "Best net change — strong winback strategy" },
    { s: "Ellisville", r: "MO", stat: "76.1% close rate", note: "Top closer — great coaching converts" },
    { s: "Algonquin", r: "IL", stat: "91.3% retention", note: "1.84 workouts/wk · 65% close · quietly dominant" },
    { s: "NM/TX Region", r: "", stat: "89.1% HRM", note: "Highest HRM adoption — members fully invested" },
  ];
  spots.forEach((sp, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = G.L + col * 4.5;
    const y = 1.0 + row * 1.25;
    s12.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.2, h: 1.05, fill: { color: C.navyMid } });
    s12.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.04, h: 1.05, fill: { color: C.brandOr } });
    s12.addText(sp.s, { x: x + 0.15, y: y + 0.05, w: 2.0, h: 0.25, fontSize: 12, fontFace: "Arial", color: C.white, bold: true, margin: 0 });
    if (sp.r) s12.addText(sp.r, { x: x + 2.2, y: y + 0.05, w: 0.5, h: 0.25, fontSize: 9, fontFace: "Arial", color: C.midGray, margin: 0 });
    s12.addText(sp.stat, { x: x + 2.7, y: y + 0.05, w: 1.3, h: 0.25, fontSize: 11, fontFace: "Arial", color: C.brandOr, bold: true, align: "right", margin: 0 });
    s12.addText(sp.note, { x: x + 0.15, y: y + 0.4, w: 3.9, h: 0.55, fontSize: 12, fontFace: "Calibri", color: "B0B8C4", margin: 0 });
  });
  addFooter(s12, true);

  // ═══════════════════════════════════════════════════
  // SLIDE 13: Q2 PRIORITIES
  // ═══════════════════════════════════════════════════
  const s13 = lightSlide();
  lightTitle(s13, ic.flagO, "Q2 Strategic Priorities");
  s13.addText("Three metrics. Clear targets. Measurable progress.", { x: G.L + 0.42, y: G.subtY - 0.1, w: 7, h: 0.25, fontSize: 12, fontFace: "Calibri", color: C.midGray, italic: true, margin: 0 });

  const prios = [
    { n: "01", t: "BOOST VISIT FREQUENCY", tgt: "1.64 → 1.75 workouts/wk", acts: ["Nudge campaigns for 1x/wk members", "Study Lehi & Provo scheduling patterns", "Coach outreach for 7+ day absences", "Regional workout challenges"], ac: C.zBlue },
    { n: "02", t: "IMPROVE LEAD CONVERSION", tgt: "18.5% → 21% lead-to-join", acts: ["Standardize 24-hour booking confirmation", "Intro reminder call + text protocol", "Share Eagle Island & Santa Fe best practices", "Booking rate push: target 52%+"], ac: C.zOrange },
    { n: "03", t: "ELEVATE CLOSE RATE", tgt: "56.5% → 60% close rate", acts: ["Utah regional improvement initiative", "Peer mentoring: pair low with top closers", "Standardize intro experience playbook", "Weekly tracking with GM accountability"], ac: C.zGreen },
  ];
  prios.forEach((p, i) => {
    const y = 1.2 + i * 1.25;
    s13.addShape(pres.shapes.RECTANGLE, { x: G.L, y, w: G.W, h: 1.1, fill: { color: C.white }, shadow: makeShadow() });
    s13.addShape(pres.shapes.RECTANGLE, { x: G.L, y, w: 0.05, h: 1.1, fill: { color: p.ac } });
    s13.addText(p.n, { x: G.L + 0.2, y, w: 0.55, h: 1.1, fontSize: 26, fontFace: "Arial Black", color: C.brandOr, valign: "middle", margin: 0 });
    s13.addText(p.t, { x: 1.4, y: y + 0.1, w: 2.6, h: 0.25, fontSize: 12, fontFace: "Arial", color: C.navy, bold: true, margin: 0 });
    s13.addText(p.tgt, { x: 1.4, y: y + 0.38, w: 2.6, h: 0.2, fontSize: 10.5, fontFace: "Calibri", color: C.brandOr, bold: true, margin: 0 });
    // Bullet point actions (revised: bullets instead of plain newline text)
    const actBullets = p.acts.map((a, ai) => ({
      text: a,
      options: { bullet: true, breakLine: ai < p.acts.length - 1, fontSize: 10, fontFace: "Calibri", color: C.darkGray }
    }));
    s13.addText(actBullets, { x: 4.2, y: y + 0.05, w: 5, h: 1.0, valign: "middle", paraSpaceAfter: 2 });
  });
  addFooter(s13);

  // ═══════════════════════════════════════════════════
  // SLIDE 14: CLOSING
  // ═══════════════════════════════════════════════════
  const s14 = darkSlide();
  s14.addImage({ data: splatW, x: 4.5, y: -1.5, w: 7, h: 7, transparency: 94 });
  // Splat logo moved to center-top (revised)
  s14.addImage({ data: splat, x: 4.35, y: 0.5, w: 1.3, h: 1.3 });

  s14.addText("We Have the Foundation.", { x: 0.5, y: 2.1, w: 9, h: 0.65, fontSize: 38, fontFace: "Arial Black", color: C.white, bold: true, align: "center", margin: 0 });
  s14.addText("Now Let's Build.", { x: 0.5, y: 2.75, w: 9, h: 0.65, fontSize: 38, fontFace: "Arial Black", color: C.brandOr, bold: true, align: "center", margin: 0 });
  s14.addShape(pres.shapes.RECTANGLE, { x: 3.8, y: 3.55, w: 2.4, h: 0.03, fill: { color: C.brandOr } });

  s14.addText("33 studios growing. 20,344 members strong. Real momentum.", { x: 0.5, y: 3.85, w: 9, h: 0.35, fontSize: 14, fontFace: "Calibri", color: C.midGray, align: "center", margin: 0 });
  s14.addText([
    { text: "Q2 Focus:  ", options: { fontSize: 14, fontFace: "Arial", color: C.white, bold: true } },
    { text: "Visit Frequency  +  Lead Conversion  +  Close Rate", options: { fontSize: 14, fontFace: "Arial", color: C.brandOr, bold: true } },
  ], { x: 0.5, y: 4.3, w: 9, h: 0.35, align: "center", margin: 0 });
  s14.addText("Every studio has a role to play. Every leader makes the difference.", { x: 0.5, y: 4.7, w: 9, h: 0.3, fontSize: 12, fontFace: "Calibri", color: C.midGray, align: "center", italic: true, margin: 0 });

  [C.zGray, C.zBlue, C.zGreen, C.zOrange, C.zRed].forEach((c, i) => {
    s14.addShape(pres.shapes.RECTANGLE, { x: i * 2, y: 5.58, w: 2, h: 0.045, fill: { color: c } });
  });

  await pres.writeFile({ fileName: "/home/assets/Q1_Performance_Review.pptx" });
  console.log("Executive deck built.");
}
build().catch(console.error);
