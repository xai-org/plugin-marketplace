// Recreation of the 2008 Global Financial Crisis deck
// UNC Charlotte Belk College of Business - MBA Financial Crises Seminar
//
// Usage: node build.js
// Output: output.pptx in the current directory.
//
// Required assets (must be in ./assets/ relative to this script):
//   title_bg.jpg    - pre-composed title slide background (1920x1080)
//   content_bg.jpg  - pre-composed content slide header/background (1920x1080)
//   logo3.png       - Freddie Mac logo
//   logo4.png       - Fannie Mae logo
//   logo5.png       - AIG logo
//   logo6.svg       - Lehman Brothers logo
//   logo7.png       - Bear Stearns logo

const pptxgen = require("pptxgenjs");
const path = require("path");

const ASSETS = path.join(__dirname, "assets");

// =============================================================
// Palette (extracted from the source deck XML)
// =============================================================
const C = {
  green:       "005035",   // UNC Charlotte primary green
  greenBright: "00703C",   // accent green
  red:         "802F2D",   // brick/crimson
  redDark:     "A0411F",   // burnt red (shadow-banking bars)
  gold:        "A49665",   // Crown gold
  goldAlt:     "B9975B",
  olive:       "899064",   // moss/olive green
  ink:         "101820",   // near-black titles
  body:        "333333",   // body text
  bodyMuted:   "4C5258",
  label:       "79808A",   // small caps labels
  muted:       "A6ACB3",   // muted footer / axis
  lightGray:   "E8E8E8",   // card borders, horizontal rules
  cream:       "FAF5E0",   // light cream (callout boxes)
  creamDeep:   "EAE4D4",   // deeper cream (process flow boxes)
  creamSoft:   "DDD6C7",
  offWhite:    "FAFAF7",
  white:       "FFFFFF",
};

const F = {
  title: "Cambria",
  body:  "Calibri",
  label: "Arial Narrow",
};

// =============================================================
// Presentation setup
// =============================================================
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";   // 13.333" x 7.5"
pres.title  = "2008 Global Financial Crisis";
pres.author = "MBA Financial Crises Seminar";

const W = 13.333;  // slide width
const H = 7.5;     // slide height

// ---- helpers ----
// Standard slide footer: "N / 13" left, "SPRING 2026 · CONFIDENTIAL" right,
// with a thin rule above.
function addFooter(slide, pageNum) {
  slide.addShape(pres.shapes.LINE, {
    x: 0.5, y: 7.05, w: W - 1.0, h: 0,
    line: { color: C.lightGray, width: 0.5 },
  });
  slide.addText(`${pageNum} / 13`, {
    x: 0.5, y: 7.15, w: 2.0, h: 0.3,
    fontFace: F.label, fontSize: 9, color: C.muted, align: "left", margin: 0,
  });
  slide.addText("SPRING 2026  ·  CONFIDENTIAL", {
    x: W - 3.5, y: 7.15, w: 3.0, h: 0.3,
    fontFace: F.label, fontSize: 9, color: C.muted, align: "right",
    charSpacing: 2, margin: 0,
  });
}

// Slide title (Cambria bold serif). Returns nothing; positions below the header band.
function addTitle(slide, text) {
  slide.addText(text, {
    x: 0.5, y: 0.85, w: W - 1.0, h: 0.9,
    fontFace: F.title, fontSize: 22, bold: true, color: C.ink,
    align: "left", valign: "top", margin: 0,
  });
}

// Source line (small italic gray) at the bottom above the footer rule.
function addSource(slide, text, y = 6.8) {
  slide.addText(text, {
    x: 0.5, y: y, w: W - 1.0, h: 0.25,
    fontFace: F.body, fontSize: 9, italic: true, color: C.muted,
    align: "left", margin: 0,
  });
}

// =============================================================
// SLIDE 1 — Title
// =============================================================
{
  const s = pres.addSlide();
  s.background = { path: path.join(ASSETS, "title_bg.jpg") };

  // Small eyebrow label
  s.addText("A  POST-MORTEM  ·  MBA FINANCIAL CRISES SEMINAR", {
    x: 0.9, y: 1.5, w: 10, h: 0.35,
    fontFace: F.label, fontSize: 12, color: C.gold,
    charSpacing: 4, bold: false, margin: 0,
  });

  // Main title (big serif)
  s.addText("2008 Global Financial Crisis", {
    x: 0.9, y: 2.6, w: 12, h: 1.3,
    fontFace: F.title, fontSize: 60, bold: true, color: C.white,
    align: "left", valign: "top", margin: 0,
  });

  // Subtitle italic
  s.addText("A causation-first post-mortem: why the system broke, and what remains unfixed seventeen years later.", {
    x: 0.9, y: 4.15, w: 11, h: 0.55,
    fontFace: F.body, fontSize: 18, italic: true, color: C.white,
    align: "left", valign: "top", margin: 0,
  });

  // Bottom-left block: course + affiliation + instructor
  s.addText("MBA FINANCIAL CRISES SEMINAR", {
    x: 0.9, y: 6.05, w: 7, h: 0.3,
    fontFace: F.label, fontSize: 11, color: C.white, bold: true,
    charSpacing: 4, margin: 0,
  });
  s.addText("The Belk College of Business  ·  UNC Charlotte", {
    x: 0.9, y: 6.42, w: 7, h: 0.3,
    fontFace: F.body, fontSize: 13, color: C.white, margin: 0,
  });
  s.addText("Professor’s Name    |    Spring 2026", {
    x: 0.9, y: 6.72, w: 7, h: 0.3,
    fontFace: F.body, fontSize: 12, color: C.white, margin: 0,
  });
}

// =============================================================
// SLIDE 2 — Four causal forces
// =============================================================
{
  const s = pres.addSlide();
  s.background = { path: path.join(ASSETS, "content_bg.jpg") };

  addTitle(s, "The 2008 crisis was a system failure, not a market accident: four aligned forces created it, and two remain live today, continuing to shape systemic risk");

  const cards = [
    { num: "01", cat: "MACRO FUEL",         title: "Loose monetary policy",    desc: "Fed funds at 1% for 31 months (2003-06) pushed investors into risk assets in search of yield.", status: "ADDRESSED",  color: C.green, statusColor: C.green },
    { num: "02", cat: "MARKET MECHANISM",   title: "Originate-to-distribute",  desc: "Banks sold risk downstream via MBS/CDO chains; 80% of subprime MBS rated AAA.",                 status: "PARTIAL",    color: C.gold,  statusColor: C.gold  },
    { num: "03", cat: "CONCENTRATION",      title: "System-critical firms",    desc: "Five institutions at 22-44x leverage held exposures whose failure threatened the whole system.", status: "PARTIAL",    color: C.gold,  statusColor: C.gold  },
    { num: "04", cat: "REGULATORY DESIGN",  title: "$60T outside the perimeter", desc: "Derivatives, SIVs, money markets, and shadow banks were statutorily exempt from oversight.",  status: "LIVE ISSUE", color: C.red,   statusColor: C.red   },
  ];

  const cardY = 2.15, cardH = 3.3, cardW = 2.95, gap = 0.15, startX = 0.5;
  cards.forEach((c, i) => {
    const x = startX + i * (cardW + gap);
    // Top accent bar
    s.addShape(pres.shapes.RECTANGLE, { x, y: cardY, w: cardW, h: 0.08, fill: { color: c.color }, line: { color: c.color, width: 0 } });
    // Card body
    s.addShape(pres.shapes.RECTANGLE, { x, y: cardY + 0.08, w: cardW, h: cardH - 0.08, fill: { color: C.white }, line: { color: C.lightGray, width: 0.75 } });
    // Number
    s.addText(c.num, { x: x + 0.25, y: cardY + 0.2, w: cardW - 0.5, h: 0.7, fontFace: F.title, fontSize: 40, bold: true, color: c.color, margin: 0 });
    // Category label
    s.addText(c.cat, { x: x + 0.25, y: cardY + 0.95, w: cardW - 0.5, h: 0.3, fontFace: F.label, fontSize: 10, color: C.label, charSpacing: 3, margin: 0 });
    // Title
    s.addText(c.title, { x: x + 0.25, y: cardY + 1.25, w: cardW - 0.5, h: 0.45, fontFace: F.body, fontSize: 16, bold: true, color: C.ink, margin: 0 });
    // Description
    s.addText(c.desc, { x: x + 0.25, y: cardY + 1.8, w: cardW - 0.5, h: 1.0, fontFace: F.body, fontSize: 11, color: C.bodyMuted, margin: 0 });
    // Status pill (outlined)
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.25, y: cardY + 2.85, w: cardW - 0.5, h: 0.36, fill: { color: C.white }, line: { color: c.statusColor, width: 0.75 } });
    s.addText([
      { text: "STATUS 2026:  ", options: { color: C.label, bold: false } },
      { text: c.status, options: { color: c.statusColor, bold: true } },
    ], { x: x + 0.35, y: cardY + 2.87, w: cardW - 0.7, h: 0.32, fontFace: F.label, fontSize: 10, charSpacing: 2, margin: 0, align: "left", valign: "middle" });
  });

  // Bottom line banner
  const blY = 5.65;
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: blY, w: W - 1.0, h: 0.9, fill: { color: C.green }, line: { color: C.green, width: 0 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: blY, w: 0.08, h: 0.9, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });
  s.addText("BOTTOM LINE", { x: 0.75, y: blY + 0.08, w: 3, h: 0.3, fontFace: F.label, fontSize: 11, color: C.gold, charSpacing: 4, margin: 0 });
  s.addText("No single actor could have prevented 2008. But forces 03 and 04  (concentration and shadow banking) remain only partially resolved. The next crisis will almost certainly exploit the same structural gap in a different asset class.", {
    x: 0.75, y: blY + 0.37, w: W - 1.5, h: 0.55,
    fontFace: F.body, fontSize: 11, italic: true, color: C.white, margin: 0,
  });

  addSource(s, "Synthesis: Federal Reserve, FCIC Final Report (2011), BIS, IMF; author analysis.");
  addFooter(s, 2);
}

// =============================================================
// SLIDE 3 — Scale of damage (5 stat cards + causal chain bar)
// =============================================================
{
  const s = pres.addSlide();
  s.background = { path: path.join(ASSETS, "content_bg.jpg") };
  addTitle(s, "The crisis erased $11T in household wealth and $2T in GDP, damage that was preventable at no fewer than four intervention points across a 7-year buildup");

  s.addText("Scale of damage is the hook, not the lesson; the next 10 slides explain why it happened and what, if anything, has been fixed.", {
    x: 0.5, y: 2.1, w: W - 1.0, h: 0.35,
    fontFace: F.body, fontSize: 12, italic: true, color: C.bodyMuted, margin: 0,
  });

  const stats = [
    { n: "$2T",   label: "GDP loss 2008–09",      sub: "Real GDP fell 4.3%",    color: C.red   },
    { n: "10%",   label: "Peak unemployment",     sub: "October 2009",          color: C.red   },
    { n: "$11T",  label: "Household wealth lost", sub: "Housing + equities",    color: C.red   },
    { n: "489",   label: "Bank failures",         sub: "2008 - 2013 (FDIC)",    color: C.olive },
    { n: "$4.6T", label: "Govt intervention",     sub: "TARP + Fed facilities", color: C.green },
  ];
  const sY = 2.6, sH = 1.9, sW = 2.45, gap = 0.12, startX = 0.5;
  stats.forEach((st, i) => {
    const x = startX + i * (sW + gap);
    // Card
    s.addShape(pres.shapes.RECTANGLE, { x, y: sY, w: sW, h: sH, fill: { color: C.white }, line: { color: C.lightGray, width: 0.75 } });
    // Left accent bar
    s.addShape(pres.shapes.RECTANGLE, { x, y: sY, w: 0.1, h: sH, fill: { color: st.color }, line: { color: st.color, width: 0 } });
    // Big number
    s.addText(st.n, { x: x + 0.22, y: sY + 0.15, w: sW - 0.35, h: 0.85, fontFace: F.title, fontSize: 44, bold: true, color: st.color, margin: 0 });
    // Label
    s.addText(st.label, { x: x + 0.22, y: sY + 1.05, w: sW - 0.35, h: 0.35, fontFace: F.body, fontSize: 13, bold: true, color: C.ink, margin: 0 });
    // Sub
    s.addText(st.sub, { x: x + 0.22, y: sY + 1.4, w: sW - 0.35, h: 0.35, fontFace: F.body, fontSize: 11, color: C.bodyMuted, margin: 0 });
  });

  // Causal chain header
  s.addText("READ THE CARDS AS A CAUSAL CHAIN:", {
    x: 0.5, y: 4.75, w: W - 1.0, h: 0.3,
    fontFace: F.label, fontSize: 11, bold: true, color: C.ink, charSpacing: 4,
    align: "center", margin: 0,
  });

  // 3 chain bars
  const cbY = 5.1, cbH = 0.5, cbW = 4.07, cbGap = 0.12;
  const chain = [
    { label: "DAMAGE",       desc: "Wealth destroyed, jobs lost",  color: C.red   },
    { label: "COLLATERAL",   desc: "Institutions failed",          color: C.gold  },
    { label: "INTERVENTION", desc: "Government/Fed backstop",      color: C.green },
  ];
  chain.forEach((c, i) => {
    const x = 0.5 + i * (cbW + cbGap);
    s.addShape(pres.shapes.RECTANGLE, { x, y: cbY, w: cbW, h: cbH, fill: { color: c.color }, line: { color: c.color, width: 0 } });
    s.addText([
      { text: c.label, options: { color: C.white, bold: true, charSpacing: 3 } },
      { text: "     " + c.desc, options: { color: C.white, italic: true } },
    ], { x: x + 0.15, y: cbY, w: cbW - 0.3, h: cbH, fontFace: F.label, fontSize: 12, align: "center", valign: "middle", margin: 0 });
  });

  s.addText("Executives intervened with $4.6T to prevent the damage column from widening further, a decision that stabilized markets but entrenched moral hazard (see slide 12).", {
    x: 1.0, y: 5.8, w: W - 2.0, h: 0.4,
    fontFace: F.body, fontSize: 12, italic: true, color: C.bodyMuted, align: "center", margin: 0,
  });

  addSource(s, "Source: Federal Reserve, FDIC, Bureau of Economic Analysis, BLS. Household wealth peak-to-trough 2007Q2–2009Q1.");
  addFooter(s, 3);
}

// =============================================================
// SLIDE 4 — Root causes: Fed funds + home prices + origination mix
// =============================================================
{
  const s = pres.addSlide();
  s.background = { path: path.join(ASSETS, "content_bg.jpg") };
  addTitle(s, "Root causes were not monocausal: loose money fueled a housing bubble that banks then amplified through broken securitization");

  // --- Left column: two stacked charts ---
  s.addText([
    { text: "01   ", options: { color: C.red, bold: true } },
    { text: "FED FUNDS RATE - CUT TO 1% AND HELD", options: { color: C.ink, bold: true } },
  ], { x: 0.5, y: 2.1, w: 6.3, h: 0.35, fontFace: F.label, fontSize: 12, charSpacing: 3, margin: 0 });

  s.addChart(pres.charts.LINE, [{
    name: "Fed Funds Rate",
    labels: ["2001", "2002", "2003", "2004", "2005", "2006"],
    values: [3.9, 1.67, 1.13, 1.35, 3.22, 4.97],
  }], {
    x: 0.5, y: 2.45, w: 6.3, h: 1.9,
    chartColors: [C.green], chartColorsOpacity: 100,
    showValue: false, showLegend: false, lineSize: 3, lineSmooth: true,
    lineDataSymbol: "circle", lineDataSymbolSize: 8,
    catAxisLabelFontFace: F.label, catAxisLabelFontSize: 10, catAxisLabelColor: C.bodyMuted,
    valAxisLabelFontFace: F.label, valAxisLabelFontSize: 10, valAxisLabelColor: C.bodyMuted,
    valGridLine: { style: "solid", size: 0.25, color: C.lightGray },
    catGridLine: { style: "none" },
    valAxisMinVal: 0, valAxisMaxVal: 6, valAxisMajorUnit: 2,
    chartArea: { fill: { color: C.white } },
  });

  s.addText([
    { text: "02   ", options: { color: C.red, bold: true } },
    { text: "HOME PRICES NEARLY DOUBLED (CASE-SHILLER, 2000=100)", options: { color: C.ink, bold: true } },
  ], { x: 0.5, y: 4.5, w: 6.3, h: 0.35, fontFace: F.label, fontSize: 12, charSpacing: 3, margin: 0 });

  s.addChart(pres.charts.BAR, [{
    name: "Case-Shiller", labels: ["2000", "2001", "2002", "2003", "2004", "2005", "2006"],
    values: [100, 108, 120, 134, 158, 180, 190],
  }], {
    x: 0.5, y: 4.85, w: 6.3, h: 1.9, barDir: "col",
    chartColors: [C.red], showValue: true, dataLabelPosition: "outEnd",
    dataLabelFontFace: F.label, dataLabelFontSize: 10, dataLabelColor: C.ink,
    showLegend: false,
    catAxisLabelFontFace: F.label, catAxisLabelFontSize: 10, catAxisLabelColor: C.bodyMuted,
    valAxisLabelFontFace: F.label, valAxisLabelFontSize: 10, valAxisLabelColor: C.bodyMuted,
    valGridLine: { style: "solid", size: 0.25, color: C.lightGray },
    catGridLine: { style: "none" },
    valAxisMinVal: 0, valAxisMaxVal: 200, valAxisMajorUnit: 40,
    chartArea: { fill: { color: C.white } },
  });

  // Vertical divider between columns
  s.addShape(pres.shapes.LINE, { x: 7.0, y: 2.1, w: 0, h: 4.6, line: { color: C.lightGray, width: 1 } });

  // --- Right column: stacked bar + bullets ---
  s.addText([
    { text: "03   ", options: { color: C.red, bold: true } },
    { text: "ORIGINATE-TO-DISTRIBUTE", options: { color: C.ink, bold: true } },
  ], { x: 7.2, y: 2.1, w: 5.6, h: 0.35, fontFace: F.label, fontSize: 12, charSpacing: 3, margin: 0 });

  s.addText("Mortgage origination mix shifted toward subprime (%)", {
    x: 7.2, y: 2.45, w: 5.6, h: 0.3,
    fontFace: F.body, fontSize: 11, italic: true, color: C.bodyMuted, margin: 0,
  });

  const yrs = ["2001", "2002", "2003", "2004", "2005", "2006"];
  s.addChart(pres.charts.BAR, [
    { name: "Prime",    labels: yrs, values: [80, 78, 75, 70, 65, 60] },
    { name: "Alt-A",    labels: yrs, values: [12, 13, 14, 15, 16, 18] },
    { name: "Subprime", labels: yrs, values: [ 8,  9, 11, 15, 19, 22] },
  ], {
    x: 7.2, y: 2.75, w: 5.6, h: 2.5, barDir: "col", barGrouping: "stacked",
    chartColors: [C.green, C.gold, C.red],
    showValue: true, dataLabelPosition: "ctr",
    dataLabelFontFace: F.label, dataLabelFontSize: 9, dataLabelColor: C.white,
    showLegend: true, legendPos: "b", legendFontFace: F.label, legendFontSize: 10, legendColor: C.bodyMuted,
    catAxisLabelFontFace: F.label, catAxisLabelFontSize: 10, catAxisLabelColor: C.bodyMuted,
    valAxisLabelFontFace: F.label, valAxisLabelFontSize: 9, valAxisLabelColor: C.bodyMuted,
    valAxisMinVal: 0, valAxisMaxVal: 100, valAxisMajorUnit: 10,
    valGridLine: { style: "solid", size: 0.25, color: C.lightGray }, catGridLine: { style: "none" },
    chartArea: { fill: { color: C.white } },
  });

  // Bullet points (green circle + text)
  const bullets = [
    "Banks offloaded risk via securitization; zero \"skin in the game\"",
    "Brokers optimized for origination volume, not credit quality",
    "Perverse incentives at every link, from broker to investor",
  ];
  bullets.forEach((b, i) => {
    const by = 5.45 + i * 0.42;
    s.addShape(pres.shapes.OVAL, { x: 7.25, y: by + 0.07, w: 0.18, h: 0.18, fill: { color: C.green }, line: { color: C.green, width: 0 } });
    s.addText(b, { x: 7.55, y: by, w: 5.3, h: 0.35, fontFace: F.body, fontSize: 12, color: C.body, margin: 0 });
  });

  addSource(s, "Source: Federal Reserve FRED, S&P/Case-Shiller, Inside Mortgage Finance");
  addFooter(s, 4);
}

// =============================================================
// SLIDE 5 — Securitization process + tranche bars + 80% callout
// =============================================================
{
  const s = pres.addSlide();
  s.background = { path: path.join(ASSETS, "content_bg.jpg") };
  addTitle(s, "At each of six steps, risk was repackaged and rerated; 80% of 2006–07 subprime MBS ended up rated AAA, and later downgraded to junk");

  // Process flow - 7 boxes with arrows
  const flow = [
    { label: "Subprime\nBorrowers",     dark: false },
    { label: "Mortgage\nOriginators",   dark: false },
    { label: "SPV /\nLoan Pool",        dark: false },
    { label: "MBS\nTranches",           dark: true  },
    { label: "CDO\nStructures",         dark: true  },
    { label: "CDO²\n(Resecuritized)",   dark: false },
    { label: "Global\nInvestors",       dark: false },
  ];
  const fY = 2.15, fH = 1.0, fW = 1.58, fGap = 0.18, fStartX = 0.5;
  flow.forEach((f, i) => {
    const x = fStartX + i * (fW + fGap);
    const bg = f.dark ? C.green : C.creamDeep;
    const txtColor = f.dark ? C.white : C.ink;
    s.addShape(pres.shapes.RECTANGLE, { x, y: fY, w: fW, h: fH, fill: { color: bg }, line: { color: bg, width: 0 } });
    s.addText(f.label, { x, y: fY, w: fW, h: fH, fontFace: F.body, fontSize: 12, bold: true, color: txtColor, align: "center", valign: "middle", margin: 0 });
    if (i < flow.length - 1) {
      const ax = x + fW + 0.01;
      s.addShape(pres.shapes.RIGHT_TRIANGLE, { x: ax, y: fY + fH/2 - 0.07, w: 0.16, h: 0.14, fill: { color: C.gold }, line: { color: C.gold, width: 0 }, rotate: 90 });
    }
  });

  // Left: CDO Tranche structure - horizontal bar chart
  s.addText("CDO TRANCHE STRUCTURE", {
    x: 0.5, y: 3.45, w: 6.5, h: 0.35,
    fontFace: F.label, fontSize: 12, bold: true, color: C.ink, charSpacing: 4, margin: 0,
  });

  const tranches = [
    { name: "AAA Senior",     pct: 80, color: C.green },
    { name: "AA",             pct:  8, color: C.olive },
    { name: "A",              pct:  4, color: C.gold  },
    { name: "BBB Mezzanine",  pct:  4, color: C.gold  },
    { name: "Equity / 1st Loss", pct: 4, color: C.red },
  ];
  const tY = 3.85, tRowH = 0.36, tLabelW = 1.7, tBarMaxW = 4.2;
  tranches.forEach((t, i) => {
    const y = tY + i * tRowH;
    s.addText(t.name, { x: 0.5, y, w: tLabelW, h: tRowH, fontFace: F.body, fontSize: 11, color: C.body, valign: "middle", margin: 0 });
    const barW = (t.pct / 80) * tBarMaxW;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5 + tLabelW + 0.1, y: y + 0.08, w: barW, h: 0.22, fill: { color: t.color }, line: { color: t.color, width: 0 } });
    s.addText(t.pct + "%", {
      x: 0.5 + tLabelW + 0.1 + barW + 0.05, y, w: 0.5, h: tRowH,
      fontFace: F.label, fontSize: 10, bold: true, color: t.color, valign: "middle", margin: 0,
    });
  });
  s.addText("↑  Losses absorbed first (bottom up)", {
    x: 0.5, y: tY + 5 * tRowH + 0.1, w: 5.5, h: 0.3,
    fontFace: F.body, fontSize: 10, italic: true, color: C.bodyMuted, margin: 0,
  });

  // Right: Rating agency failures callout
  const rX = 7.2, rY = 3.45, rW = 5.6, rH = 3.1;
  s.addShape(pres.shapes.RECTANGLE, { x: rX, y: rY, w: rW, h: 0.08, fill: { color: C.red }, line: { color: C.red, width: 0 } });
  s.addShape(pres.shapes.RECTANGLE, { x: rX, y: rY + 0.08, w: rW, h: rH - 0.08, fill: { color: C.cream }, line: { color: C.creamSoft, width: 0.75 } });

  s.addText("RATING AGENCY FAILURES", {
    x: rX + 0.25, y: rY + 0.2, w: rW - 0.5, h: 0.3,
    fontFace: F.label, fontSize: 11, bold: true, color: C.ink, charSpacing: 3, margin: 0,
  });
  s.addText("80%", {
    x: rX + 0.25, y: rY + 0.55, w: rW - 0.5, h: 1.05,
    fontFace: F.title, fontSize: 64, bold: true, color: C.red, margin: 0,
  });
  s.addText("of 2006-07 subprime MBS were rated AAA and later downgraded to junk", {
    x: rX + 0.25, y: rY + 1.55, w: rW - 0.5, h: 0.4,
    fontFace: F.body, fontSize: 12, italic: true, color: C.body, margin: 0,
  });
  const rbullets = [
    "Flawed Gaussian copula models underestimated correlation risk",
    "Issuer-pays business model created structural conflicts of interest",
    "Ratings became marketing tools, not independent risk measures",
  ];
  rbullets.forEach((b, i) => {
    const by = rY + 2.1 + i * 0.32;
    s.addShape(pres.shapes.RECTANGLE, { x: rX + 0.3, y: by + 0.08, w: 0.15, h: 0.15, fill: { color: C.red }, line: { color: C.red, width: 0 } });
    s.addText(b, { x: rX + 0.55, y: by, w: rW - 0.75, h: 0.3, fontFace: F.body, fontSize: 11, color: C.body, margin: 0 });
  });

  addSource(s, "Source: FCIC Final Report (2011), Moody’s, S&P Global");
  addFooter(s, 5);
}

// =============================================================
// SLIDE 6 — Peak leverage + institution table (with logos)
// =============================================================
{
  const s = pres.addSlide();
  s.background = { path: path.join(ASSETS, "content_bg.jpg") };
  addTitle(s, "Five institutions held exposures at 22-44x leverage, 2-4× Basel II’s implicit cap, and none could be allowed to fail without triggering a cascade");

  s.addText("PEAK LEVERAGE (ASSETS / EQUITY)- ALL FIVE EXCEEDED BASEL II'S IMPLICIT CAP OF ~12.5x", {
    x: 0.5, y: 1.95, w: W - 1.0, h: 0.3,
    fontFace: F.label, fontSize: 11, bold: true, color: C.red, charSpacing: 4, margin: 0,
  });

  // Institutions data
  const firms = [
    { name: "BEAR STEARNS",    lev: 33, logo: "logo7.png", role: "Two hedge funds collapsed (Jun '07); massive MBS/CDO exposure",       outcome: "Sold to JPMorgan at $10/share; Fed backstop $30B",                          outcomeBold: false },
    { name: "LEHMAN BROTHERS", lev: 31, logo: "logo6.svg", role: "Largest MBS underwriter; 31:1 leverage; $600B+ assets",               outcome: "Bankruptcy Sept 15, 2008; largest in US history",                           outcomeBold: true  },
    { name: "AIG",             lev: 44, logo: "logo5.png", role: "Wrote $440B in CDS on MBS/CDOs without adequate reserves",            outcome: "Govt bailout: $182B; Fed took 80% equity; notional exposure 3.5x Basel",    outcomeBold: true  },
    { name: "FANNIE MAE",      lev: 23, logo: "logo4.png", role: "Purchased and guaranteed ~50% of US mortgages",                       outcome: "Conservatorship Sept '08; $187B combined",                                  outcomeBold: false },
    { name: "FREDDIE MAC",     lev: 22, logo: "logo3.png", role: "Secondary mortgage market; MBS guarantor",                            outcome: "Conservatorship Sept '08; combined with Fannie",                            outcomeBold: false },
  ];

  // --- Horizontal leverage bars (drawn manually for logo alignment) ---
  const bY = 2.3, rowH = 0.32, logoW = 1.2, labelX = 0.5, barStartX = 2.1, barMaxW = 10.0;
  const maxLev = 50;

  firms.forEach((f, i) => {
    const y = bY + i * rowH;
    // Logo
    s.addImage({
      path: path.join(ASSETS, f.logo),
      x: labelX, y: y + 0.02, w: logoW, h: rowH - 0.04,
      sizing: { type: "contain", w: logoW, h: rowH - 0.04 },
    });
    // Background light bar (full width baseline)
    s.addShape(pres.shapes.RECTANGLE, { x: barStartX, y: y + 0.08, w: barMaxW, h: 0.16, fill: { color: C.lightGray }, line: { color: C.lightGray, width: 0 } });
    // Filled red portion
    const w = (f.lev / maxLev) * barMaxW;
    // Note: bars start around the ~12.5x Basel line (to show excess). Here we'll start from 0 for simplicity.
    s.addShape(pres.shapes.RECTANGLE, { x: barStartX, y: y + 0.08, w, h: 0.16, fill: { color: C.red }, line: { color: C.red, width: 0 } });
    // Value label
    s.addText(f.lev + "x", {
      x: barStartX + w + 0.05, y: y - 0.02, w: 0.7, h: rowH,
      fontFace: F.label, fontSize: 11, bold: true, color: C.ink, valign: "middle", margin: 0,
    });
  });

  // X-axis scale
  const axY = bY + 5 * rowH + 0.02;
  s.addShape(pres.shapes.LINE, { x: barStartX, y: axY, w: barMaxW, h: 0, line: { color: C.bodyMuted, width: 0.5 } });
  [0, 10, 20, 30, 40, 50].forEach(v => {
    const x = barStartX + (v / maxLev) * barMaxW;
    s.addShape(pres.shapes.LINE, { x, y: axY, w: 0, h: 0.05, line: { color: C.bodyMuted, width: 0.5 } });
    s.addText(v + "x", { x: x - 0.3, y: axY + 0.06, w: 0.6, h: 0.25, fontFace: F.label, fontSize: 9, color: C.bodyMuted, align: "center", margin: 0 });
  });

  // --- Institution table ---
  const tX = 0.5, tY = 4.4, colInst = 2.1, colRole = 5.5, colOut = 5.23;
  // Header row
  s.addShape(pres.shapes.RECTANGLE, { x: tX, y: tY, w: colInst + colRole + colOut, h: 0.4, fill: { color: C.green }, line: { color: C.green, width: 0 } });
  s.addText("INSTITUTION", { x: tX, y: tY, w: colInst, h: 0.4, fontFace: F.label, fontSize: 11, bold: true, color: C.white, align: "center", valign: "middle", charSpacing: 2, margin: 0 });
  s.addText("ROLE IN CRISIS", { x: tX + colInst, y: tY, w: colRole, h: 0.4, fontFace: F.label, fontSize: 11, bold: true, color: C.white, align: "center", valign: "middle", charSpacing: 2, margin: 0 });
  s.addText("OUTCOME", { x: tX + colInst + colRole, y: tY, w: colOut, h: 0.4, fontFace: F.label, fontSize: 11, bold: true, color: C.white, align: "center", valign: "middle", charSpacing: 2, margin: 0 });

  // Rows
  const rowYStart = tY + 0.4, rH2 = 0.4;
  firms.forEach((f, i) => {
    const y = rowYStart + i * rH2;
    // Zebra background
    s.addShape(pres.shapes.RECTANGLE, { x: tX, y, w: colInst + colRole + colOut, h: rH2,
      fill: { color: i % 2 === 0 ? C.white : C.offWhite }, line: { color: C.lightGray, width: 0.25 } });
    // Logo
    s.addImage({ path: path.join(ASSETS, f.logo), x: tX + 0.2, y: y + 0.05, w: colInst - 0.4, h: rH2 - 0.1,
      sizing: { type: "contain", w: colInst - 0.4, h: rH2 - 0.1 } });
    s.addText(f.role, { x: tX + colInst + 0.1, y, w: colRole - 0.2, h: rH2, fontFace: F.body, fontSize: 10, color: C.body, align: "center", valign: "middle", margin: 0 });
    s.addText(f.outcome, { x: tX + colInst + colRole + 0.1, y, w: colOut - 0.2, h: rH2,
      fontFace: F.body, fontSize: 10, color: f.outcomeBold ? C.red : C.body, bold: f.outcomeBold,
      align: "center", valign: "middle", margin: 0 });
  });

  addSource(s, "Source: FDIC, Federal Reserve, Treasury Department, SEC filings");
  addFooter(s, 6);
}

// =============================================================
// SLIDE 7 — Six channels grid
// =============================================================
{
  const s = pres.addSlide();
  s.background = { path: path.join(ASSETS, "content_bg.jpg") };
  addTitle(s, "Once Lehman failed on Sep 15, losses transmitted globally in under 30 days via four reinforcing channels");

  const channels = [
    { letter: "T", cat: "TRIGGER",     title: "Subprime defaults rise",    desc: "Housing prices fall, ARM resets, defaults spike, MBS values collapse", color: C.red   },
    { letter: "1", cat: "CHANNEL 1",   title: "Bank balance sheet losses", desc: "Mark-to-market losses, capital erosion, solvency doubts, CDS spreads widen", color: C.red   },
    { letter: "2", cat: "CHANNEL 2",   title: "Interbank market freeze",   desc: "Counterparty fear, LIBOR-OIS spikes, repo seizes, funding dries up",    color: C.red   },
    { letter: "3", cat: "CHANNEL 3",   title: "Money market contagion",    desc: "Reserve Primary Fund 'breaks the buck', $300B MMF redemptions, CP collapse", color: C.gold  },
    { letter: "4", cat: "CHANNEL 4",   title: "Credit crunch hits economy", desc: "Lending freezes, investment falls, spending drops, mass layoffs begin",  color: C.gold  },
    { letter: "G", cat: "GLOBAL",      title: "Global spillover",          desc: "European banks held US MBS; Iceland/Ireland/UK crises; world trade falls 12%", color: C.green },
  ];

  const cW = 4.07, cH = 2.1, cGap = 0.12, startX = 0.5, startY = 2.2;
  channels.forEach((ch, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = startX + col * (cW + cGap);
    const y = startY + row * (cH + cGap);
    // Top accent bar
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: cW, h: 0.08, fill: { color: ch.color }, line: { color: ch.color, width: 0 } });
    // Card body
    s.addShape(pres.shapes.RECTANGLE, { x, y: y + 0.08, w: cW, h: cH - 0.08, fill: { color: C.white }, line: { color: C.lightGray, width: 0.75 } });
    // Circle with letter
    s.addShape(pres.shapes.OVAL, { x: x + 0.3, y: y + 0.4, w: 0.7, h: 0.7, fill: { color: ch.color }, line: { color: ch.color, width: 0 } });
    s.addText(ch.letter, { x: x + 0.3, y: y + 0.4, w: 0.7, h: 0.7, fontFace: F.title, fontSize: 24, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
    // Category label
    s.addText(ch.cat, { x: x + 1.15, y: y + 0.45, w: cW - 1.3, h: 0.3, fontFace: F.label, fontSize: 10, color: C.label, charSpacing: 3, margin: 0 });
    // Title
    s.addText(ch.title, { x: x + 1.15, y: y + 0.72, w: cW - 1.3, h: 0.4, fontFace: F.body, fontSize: 15, bold: true, color: C.ink, margin: 0 });
    // Description
    s.addText(ch.desc, { x: x + 0.3, y: y + 1.3, w: cW - 0.6, h: 0.7, fontFace: F.body, fontSize: 11, color: C.bodyMuted, margin: 0 });
  });

  addSource(s, "Source: Federal Reserve, BIS, IMF Global Financial Stability Report 2009");
  addFooter(s, 7);
}

// =============================================================
// SLIDE 8 — Shadow banking bars + timeline
// =============================================================
{
  const s = pres.addSlide();
  s.background = { path: path.join(ASSETS, "content_bg.jpg") };
  addTitle(s, "$60T in derivatives and $10T+ in shadow banking sat outside the regulatory perimeter by design, not by oversight failure");

  // LEFT: Notional exposure bars
  s.addText("NOTIONAL EXPOSURE BY ENTITY  ($T, 2007)", {
    x: 0.5, y: 2.1, w: 6.5, h: 0.3,
    fontFace: F.label, fontSize: 11, bold: true, color: C.ink, charSpacing: 3, margin: 0,
  });

  const shadow = [
    { name: "OTC derivatives",   v: 60.0 },
    { name: "CDS market",        v:  5.0 },
    { name: "Money market funds",v:  3.5 },
    { name: "Hedge funds",       v:  1.9 },
    { name: "SIVs / conduits",   v:  1.2 },
    { name: "Mortgage brokers",  v:  0.8 },
  ];
  const sbX = 0.5, sbY = 2.5, rowH = 0.3, labelW = 1.5, barMax = 4.4, maxV = 60;
  shadow.forEach((b, i) => {
    const y = sbY + i * rowH;
    s.addText(b.name, { x: sbX, y, w: labelW, h: rowH, fontFace: F.body, fontSize: 11, color: C.body, valign: "middle", margin: 0 });
    const w = (b.v / maxV) * barMax;
    s.addShape(pres.shapes.RECTANGLE, { x: sbX + labelW + 0.05, y: y + 0.06, w, h: 0.18, fill: { color: C.redDark }, line: { color: C.redDark, width: 0 } });
    s.addText("$" + b.v + "T", { x: sbX + labelW + 0.1 + w, y, w: 0.7, h: rowH, fontFace: F.label, fontSize: 10, bold: true, color: C.redDark, valign: "middle", margin: 0 });
  });

  // Horizontal rule
  s.addShape(pres.shapes.LINE, { x: 0.5, y: 4.35, w: 6.5, h: 0, line: { color: C.lightGray, width: 0.75 } });

  // "INSIDE THE PERIMETER"
  s.addText("INSIDE THE PERIMETER", {
    x: 0.5, y: 4.5, w: 6.5, h: 0.3,
    fontFace: F.label, fontSize: 11, bold: true, color: C.green, charSpacing: 3, margin: 0,
  });
  // Regulated banks
  s.addText("Regulated banks", { x: 0.5, y: 4.88, w: labelW, h: rowH, fontFace: F.body, fontSize: 11, color: C.body, valign: "middle", margin: 0 });
  const regW = (13 / maxV) * barMax;
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5 + labelW + 0.05, y: 4.94, w: regW, h: 0.18, fill: { color: C.green }, line: { color: C.green, width: 0 } });
  s.addText("$13T", { x: 0.5 + labelW + 0.1 + regW, y: 4.88, w: 0.7, h: rowH, fontFace: F.label, fontSize: 10, bold: true, color: C.green, valign: "middle", margin: 0 });

  // Green callout
  const coY = 5.45, coH = 0.75;
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: coY, w: 6.5, h: coH, fill: { color: C.green }, line: { color: C.green, width: 0 } });
  s.addText("The unregulated shadow system was 5.4 times larger than the regulated banking system and zero oversight covered it.", {
    x: 0.65, y: coY, w: 6.2, h: coH,
    fontFace: F.body, fontSize: 12, bold: true, italic: true, color: C.white, align: "center", valign: "middle", margin: 0,
  });

  // RIGHT: How did this happen? timeline
  const rX = 7.2;
  s.addText("HOW DID THIS HAPPEN?", {
    x: rX, y: 2.1, w: 5.6, h: 0.3,
    fontFace: F.label, fontSize: 11, bold: true, color: C.ink, charSpacing: 3, margin: 0,
  });
  s.addShape(pres.shapes.LINE, { x: rX, y: 2.45, w: 5.6, h: 0, line: { color: C.lightGray, width: 0.75 } });
  s.addText("Four legislative and institutional decisions built the gap:", {
    x: rX, y: 2.5, w: 5.6, h: 0.3,
    fontFace: F.body, fontSize: 11, italic: true, color: C.bodyMuted, margin: 0,
  });

  const events = [
    { year: "1999", title: "Glass-Steagall repealed",  desc: "Merged commercial + investment banking → too-big-to-fail institutions with deposit-funded trading desks.", color: C.green },
    { year: "2000", title: "CFMA exempts derivatives", desc: "Exempted $60T in OTC derivatives from CFTC/SEC oversight. Zero transparency, zero margin requirements.",  color: C.gold  },
    { year: "2003", title: "Fed declines to regulate", desc: "Had HOEPA authority to regulate subprime lending nationwide. Greenspan’s ideology prevented action.",       color: C.red   },
    { year: "2007", title: "No systemic-risk monitor", desc: "No single regulator could see or act on system-wide interconnections. Risk was everywhere and nowhere.",    color: C.red   },
  ];
  const evY = 2.9, evH = 1.0;
  // Vertical connecting line
  s.addShape(pres.shapes.LINE, { x: rX + 0.25, y: evY + 0.2, w: 0, h: evH * 3 + 0.4, line: { color: C.muted, width: 0.75 } });

  events.forEach((e, i) => {
    const y = evY + i * evH;
    // Circle
    s.addShape(pres.shapes.OVAL, { x: rX + 0.1, y: y + 0.05, w: 0.32, h: 0.32, fill: { color: e.color }, line: { color: e.color, width: 0 } });
    // Year pill
    s.addShape(pres.shapes.RECTANGLE, { x: rX + 0.55, y: y + 0.03, w: 0.85, h: 0.36, fill: { color: e.color }, line: { color: e.color, width: 0 } });
    s.addText(e.year, { x: rX + 0.55, y: y + 0.03, w: 0.85, h: 0.36, fontFace: F.label, fontSize: 11, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
    // Title
    s.addText(e.title, { x: rX + 1.5, y: y, w: 4.1, h: 0.35, fontFace: F.body, fontSize: 12, bold: true, color: C.ink, margin: 0 });
    // Description
    s.addText(e.desc, { x: rX + 1.5, y: y + 0.35, w: 4.1, h: 0.65, fontFace: F.body, fontSize: 10, color: C.bodyMuted, margin: 0 });
  });

  addSource(s, "Source: FCIC Final Report (2011), Congressional Research Service, BIS. Notional values as of 2007.");
  addFooter(s, 8);
}

// =============================================================
// SLIDE 9 — Timeline + three inflection cards
// =============================================================
{
  const s = pres.addSlide();
  s.background = { path: path.join(ASSETS, "content_bg.jpg") };
  addTitle(s, "Three inflection points, Bear (Mar ’08), Lehman (Sep ’08), and TARP (Oct ’08), converted a subprime problem into a global crisis");

  // --- Timeline ---
  const tlY = 2.4;
  const events = [
    { lbl: "Housing peak",     date: "2006",    pos: 0.08, above: true,  inflect: false },
    { lbl: "Bear funds fail",  date: "Jun '07", pos: 0.20, above: false, inflect: false },
    { lbl: "Bear sold to JPM", date: "Mar '08", pos: 0.33, above: true,  inflect: true  },
    { lbl: "Lehman + AIG",     date: "Sep '08", pos: 0.48, above: false, inflect: true  },
    { lbl: "TARP $700B",       date: "Oct '08", pos: 0.62, above: true,  inflect: true  },
    { lbl: "S&P 500 trough",   date: "Mar '09", pos: 0.78, above: false, inflect: false },
    { lbl: "Recession ends",   date: "Jun '09", pos: 0.92, above: true,  inflect: false },
  ];
  const tlStartX = 0.5, tlW = W - 1.0;
  // Main horizontal line
  s.addShape(pres.shapes.LINE, { x: tlStartX, y: tlY, w: tlW, h: 0, line: { color: C.green, width: 1.5 } });

  events.forEach(e => {
    const cx = tlStartX + e.pos * tlW;
    const size = e.inflect ? 0.32 : 0.22;
    // Circle
    s.addShape(pres.shapes.OVAL, {
      x: cx - size/2, y: tlY - size/2, w: size, h: size,
      fill: { color: e.inflect ? C.white : C.green },
      line: { color: e.inflect ? C.red : C.green, width: e.inflect ? 2.5 : 0 },
    });
    // Inner dot for inflection
    if (e.inflect) {
      const inner = 0.14;
      s.addShape(pres.shapes.OVAL, { x: cx - inner/2, y: tlY - inner/2, w: inner, h: inner, fill: { color: C.red }, line: { color: C.red, width: 0 } });
    }
    // Labels (label above, date bold green; alternating top/bottom)
    if (e.above) {
      s.addText(e.lbl,  { x: cx - 1.0, y: tlY - 0.85, w: 2.0, h: 0.25, fontFace: F.body, fontSize: 10, color: C.bodyMuted, align: "center", margin: 0 });
      s.addText(e.date, { x: cx - 1.0, y: tlY - 0.58, w: 2.0, h: 0.25, fontFace: F.label, fontSize: 11, bold: true, color: e.inflect ? C.red : C.green, align: "center", margin: 0 });
    } else {
      s.addText(e.date, { x: cx - 1.0, y: tlY + 0.32, w: 2.0, h: 0.25, fontFace: F.label, fontSize: 11, bold: true, color: e.inflect ? C.red : C.green, align: "center", margin: 0 });
      s.addText(e.lbl,  { x: cx - 1.0, y: tlY + 0.58, w: 2.0, h: 0.25, fontFace: F.body, fontSize: 10, color: C.bodyMuted, align: "center", margin: 0 });
    }
  });

  // --- Three inflection cards ---
  const infl = [
    { num: "INFLECTION 1", title: "Bear Stearns: Mar 2008", big: "$30B",  sub: "Fed backstop to JPMorgan",
      body: "Two internal hedge funds collapsed in Jun '07. By Mar '08, a bank run forced a fire sale at $10/share, down from $170 eighteen months prior.",
      quote: "First test of TBTF doctrine. Fed provided $30B non-recourse loan to JPMorgan to absorb Bear’s toxic assets. Market stabilized temporarily.",
      color: C.gold },
    { num: "INFLECTION 2", title: "Lehman Brothers: Sep 15, 2008", big: "$639B", sub: "Largest bankruptcy in US history",
      body: "31:1 leverage, massive MBS/CDO book, $600B+ assets. Hank Paulson decided no public money, and Lehman filed Chapter 11.",
      quote: "Global panic. Interbank lending froze overnight. Reserve Primary Fund ‘broke the buck.’ $300B in money market redemptions in 48 hours.",
      color: C.red },
    { num: "INFLECTION 3", title: "TARP enacted: Oct 3, 2008", big: "$700B", sub: "Emergency Stabilization Act",
      body: "Congress authorized $700B after the House initially rejected the bill (Sep 29), triggering a 777-point Dow crash, the largest single-day point drop.",
      quote: "Treasury purchased toxic assets + injected capital into banks. Combined with Fed facilities, total intervention reached $4.6T. Markets bottomed 5 months later.",
      color: C.green },
  ];
  const iW = 4.07, iH = 3.4, iGap = 0.12, iY = 3.3;
  infl.forEach((c, i) => {
    const x = 0.5 + i * (iW + iGap);
    s.addShape(pres.shapes.RECTANGLE, { x, y: iY, w: iW, h: 0.08, fill: { color: c.color }, line: { color: c.color, width: 0 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: iY + 0.08, w: iW, h: iH - 0.08, fill: { color: C.white }, line: { color: C.lightGray, width: 0.75 } });

    s.addText(c.num, { x: x + 0.25, y: iY + 0.2, w: iW - 0.5, h: 0.3, fontFace: F.label, fontSize: 10, color: C.label, charSpacing: 3, margin: 0 });
    s.addText(c.title, { x: x + 0.25, y: iY + 0.5, w: iW - 0.5, h: 0.35, fontFace: F.body, fontSize: 14, bold: true, color: C.ink, margin: 0 });
    s.addText(c.big, { x: x + 0.25, y: iY + 0.88, w: iW - 0.5, h: 0.85, fontFace: F.title, fontSize: 50, bold: true, color: c.color, margin: 0 });
    s.addText(c.sub, { x: x + 0.25, y: iY + 1.78, w: iW - 0.5, h: 0.3, fontFace: F.body, fontSize: 11, italic: true, color: C.bodyMuted, margin: 0 });
    s.addText(c.body, { x: x + 0.25, y: iY + 2.08, w: iW - 0.5, h: 0.7, fontFace: F.body, fontSize: 10, color: C.body, margin: 0 });
    // Accent quote (left bar + italic)
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.25, y: iY + 2.78, w: 0.04, h: 0.55, fill: { color: c.color }, line: { color: c.color, width: 0 } });
    s.addText(c.quote, { x: x + 0.4, y: iY + 2.78, w: iW - 0.65, h: 0.55, fontFace: F.body, fontSize: 9.5, italic: true, color: C.body, margin: 0 });
  });

  addSource(s, "Source: NBER, Federal Reserve, Treasury Department, SEC filings");
  addFooter(s, 9);
}

// =============================================================
// SLIDE 10 — Three time-series charts (TED, S&P, VIX)
// =============================================================
{
  const s = pres.addSlide();
  s.background = { path: path.join(ASSETS, "content_bg.jpg") };
  addTitle(s, "Markets priced the crisis in real time: TED spread signaled bank distrust 9 months before Lehman, and VIX peaked 30 days after");

  s.addText("Each indicator confirmed a distinct failure mode - funding markets first, equities second, volatility last. Watch the sequence in future crises.", {
    x: 0.5, y: 2.05, w: W - 1.0, h: 0.35,
    fontFace: F.body, fontSize: 12, italic: true, color: C.bodyMuted, margin: 0,
  });

  const cards = [
    { color: C.green, title: "TED SPREAD  ·  Bank distrust (bps)",
      labels: ["Q1 07","Q3 07","Q1 08","Q3 08","Q4 08","Q1 09","Q3 09"],
      values: [0.2, 0.9, 1.7, 2.1, 4.6, 1.3, 0.3],
      markerIdx: 4, markerLbl: "LEHMAN",
      yMax: 5, yUnit: 1,
      caption: "Signaled distrust in Q3 ‘07, 9 months before Lehman. Peaked at 458 bps, 25x normal.",
    },
    { color: C.red, title: "S&P 500 INDEX  ·  Equity markets",
      labels: ["Jan 07","Jul 07","Jan 08","Jul 08","Jan 09","Jul 09","Jan 10"],
      values: [1450, 1500, 1380, 1270, 900, 990, 1080],
      markerIdx: 3, markerLbl: "LEHMAN",
      yMax: 1600, yUnit: 200,
      caption: "Held up through Bear Stearns; fell 57% peak-to-trough only after Lehman confirmed policy limits.",
    },
    { color: C.gold, title: "CBOE VIX  ·  Implied volatility",
      labels: ["Jan 07","Jul 07","Jan 08","Jul 08","Oct 08","Jan 09","Jul 09","Jan 10"],
      values: [12, 17, 22, 14, 80, 45, 26, 19],
      markerIdx: 4, markerLbl: "LEHMAN+30",
      yMax: 90, yUnit: 10,
      caption: "Peaked at 80, 6x normal, 30 days after Lehman, as markets recalibrated tail risk.",
    },
  ];
  const cW = 4.07, cH = 4.1, cGap = 0.12, cY = 2.5;
  cards.forEach((c, i) => {
    const x = 0.5 + i * (cW + cGap);
    // Accent bar
    s.addShape(pres.shapes.RECTANGLE, { x, y: cY, w: cW, h: 0.08, fill: { color: c.color }, line: { color: c.color, width: 0 } });
    // Body card
    s.addShape(pres.shapes.RECTANGLE, { x, y: cY + 0.08, w: cW, h: cH - 0.08, fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.75 } });
    // Title
    s.addText(c.title, { x: x + 0.2, y: cY + 0.2, w: cW - 0.4, h: 0.3, fontFace: F.label, fontSize: 11, bold: true, color: C.ink, charSpacing: 2, margin: 0 });
    // Chart
    s.addChart(pres.charts.LINE, [{ name: "Series", labels: c.labels, values: c.values }], {
      x: x + 0.15, y: cY + 0.6, w: cW - 0.3, h: 2.4,
      chartColors: [c.color],
      lineSize: 2.5, lineSmooth: true,
      lineDataSymbol: "circle", lineDataSymbolSize: 6, lineDataSymbolLineColor: c.color,
      showLegend: false, showValue: false,
      catAxisLabelFontFace: F.label, catAxisLabelFontSize: 9, catAxisLabelColor: C.bodyMuted,
      valAxisLabelFontFace: F.label, valAxisLabelFontSize: 9, valAxisLabelColor: C.bodyMuted,
      valGridLine: { style: "solid", size: 0.25, color: C.lightGray }, catGridLine: { style: "none" },
      valAxisMinVal: 0, valAxisMaxVal: c.yMax, valAxisMajorUnit: c.yUnit,
      chartArea: { fill: { color: C.offWhite } },
    });
    // Lehman marker pill (approximate x position over chart)
    const pillW = 1.0, chartX = x + 0.15, chartW = cW - 0.3;
    const markerX = chartX + 0.4 + (c.markerIdx / (c.labels.length - 1)) * (chartW - 0.6);
    s.addShape(pres.shapes.RECTANGLE, { x: markerX - pillW/2, y: cY + 0.75, w: pillW, h: 0.28,
      fill: { color: c.color }, line: { color: c.color, width: 0 } });
    s.addText(c.markerLbl, { x: markerX - pillW/2, y: cY + 0.75, w: pillW, h: 0.28,
      fontFace: F.label, fontSize: 9, bold: true, color: C.white, align: "center", valign: "middle", charSpacing: 2, margin: 0 });
    // Caption bordered box
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.2, y: cY + 3.1, w: cW - 0.4, h: 0.8, fill: { color: C.white }, line: { color: c.color, width: 1 } });
    s.addText(c.caption, { x: x + 0.3, y: cY + 3.15, w: cW - 0.6, h: 0.7, fontFace: F.body, fontSize: 10, italic: true, color: C.body, valign: "middle", margin: 0 });
  });

  addSource(s, "Source: Bloomberg, Federal Reserve FRED, CBOE. TED = 3-month LIBOR minus 3-month T-bill. VIX = implied vol, S&P 500 options.");
  addFooter(s, 10);
}

// =============================================================
// SLIDE 11 — Interventions bar chart + structural reforms callout
// =============================================================
{
  const s = pres.addSlide();
  s.background = { path: path.join(ASSETS, "content_bg.jpg") };
  addTitle(s, "$4.6T in emergency support stopped the bleed; four structural reforms narrowed the gaps, yet unfinished work leaves the system exposed to future shocks");

  s.addText("SCALE OF EMERGENCY INTERVENTIONS  ($B)", {
    x: 0.5, y: 2.15, w: 6.5, h: 0.3,
    fontFace: F.label, fontSize: 11, bold: true, color: C.ink, charSpacing: 3, margin: 0,
  });

  s.addChart(pres.charts.BAR, [{
    name: "Interventions",
    labels: ["GSE Conservatorship", "Fiscal Stimulus (ARRA)", "QE1 (MBS + Treas.)", "Fed Facilities (peak)", "TARP"],
    values: [187, 831, 1750, 1200, 700],
  }], {
    x: 0.5, y: 2.5, w: 6.5, h: 4.1, barDir: "bar",
    chartColors: [C.red],
    showValue: true, dataLabelPosition: "outEnd",
    dataLabelFontFace: F.label, dataLabelFontSize: 10, dataLabelColor: C.ink,
    dataLabelFormatCode: "#,##0",
    showLegend: false,
    catAxisLabelFontFace: F.body, catAxisLabelFontSize: 11, catAxisLabelColor: C.body,
    valAxisLabelFontFace: F.label, valAxisLabelFontSize: 9, valAxisLabelColor: C.bodyMuted,
    valGridLine: { style: "solid", size: 0.25, color: C.lightGray }, catGridLine: { style: "none" },
    valAxisMinVal: 0, valAxisMaxVal: 2000, valAxisMajorUnit: 200,
    chartArea: { fill: { color: C.white } },
    barGapWidthPct: 60,
  });

  // Right side: structural reforms callout card
  const rX = 7.2, rY = 2.15, rW = 5.6, rH = 4.45;
  s.addShape(pres.shapes.RECTANGLE, { x: rX, y: rY, w: rW, h: 0.08, fill: { color: C.green }, line: { color: C.green, width: 0 } });
  s.addShape(pres.shapes.RECTANGLE, { x: rX, y: rY + 0.08, w: rW, h: rH - 0.08, fill: { color: C.cream }, line: { color: C.creamSoft, width: 0.75 } });

  s.addText("STRUCTURAL REFORMS", {
    x: rX + 0.3, y: rY + 0.25, w: rW - 0.6, h: 0.3,
    fontFace: F.label, fontSize: 11, bold: true, color: C.ink, charSpacing: 3, margin: 0,
  });

  const reforms = [
    { title: "Dodd-Frank Act (2010)",   desc: "FSOC, OFR, orderly liquidation authority; CFPB for consumer protection." },
    { title: "Volcker Rule",            desc: "Prohibits proprietary trading at depositories; limits on PE / hedge-fund investments." },
    { title: "Basel III",               desc: "CET1 min. 4.5% + buffers; 3% leverage ratio; LCR and NSFR liquidity rules." },
    { title: "OTC derivatives reform",  desc: "Central clearing, swap execution facilities, trade reporting requirements." },
  ];
  const reY = rY + 0.7, reH = 0.92;
  reforms.forEach((r, i) => {
    const y = reY + i * reH;
    s.addShape(pres.shapes.RECTANGLE, { x: rX + 0.3, y, w: 0.07, h: reH - 0.1, fill: { color: C.green }, line: { color: C.green, width: 0 } });
    s.addText(r.title, { x: rX + 0.5, y, w: rW - 0.8, h: 0.3, fontFace: F.body, fontSize: 13, bold: true, color: C.ink, margin: 0 });
    s.addText(r.desc,  { x: rX + 0.5, y: y + 0.32, w: rW - 0.8, h: 0.55, fontFace: F.body, fontSize: 11, color: C.body, margin: 0 });
  });

  addSource(s, "Source: Treasury Department, Federal Reserve, BIS, Dodd-Frank Act of 2010");
  addFooter(s, 11);
}

// =============================================================
// SLIDE 12 — Three lessons cards + forward test banner
// =============================================================
{
  const s = pres.addSlide();
  s.background = { path: path.join(ASSETS, "content_bg.jpg") };
  addTitle(s, "Three lessons for the next crisis: moral hazard is the price of stability, shadow banking always finds the perimeter, and the next trigger is not in last crisis’s asset class");

  s.addText("These are the speaker’s synthesis, not consensus findings. Each lesson inverts a comfortable assumption that 2008 proved false.", {
    x: 0.5, y: 2.15, w: W - 1.0, h: 0.3,
    fontFace: F.body, fontSize: 11, italic: true, color: C.bodyMuted, margin: 0,
  });

  const lessons = [
    { num: "01", title: "Moral hazard is the price of stability",
      body: "The 2008 bailouts worked; they stopped the cascade. But they also confirmed to every SIFI that the state will intervene. Dodd-Frank’s orderly-liquidation authority is untested; no SIFI has failed under it. Until one does, the implicit guarantee remains.",
      take: "Assume TBTF is policy, not doctrine.", color: C.green },
    { num: "02", title: "Shadow banking always finds the perimeter",
      body: "In 2008, risk migrated from banks → SIVs → money markets → derivatives. Post-Dodd-Frank, it migrated again, to CLOs, private credit ($1.7T), non-bank mortgage originators, and crypto. Every new perimeter creates a new outside.",
      take: "Watch flows, not entity types.", color: C.gold },
    { num: "03", title: "The next crisis is not in subprime",
      body: "Post-crisis regulation is retrospective: it closes the door that just opened. The next trigger will be an asset class regulators currently consider safe: sovereign debt, commercial real estate, or an instrument that doesn’t yet have a name. Apply the 2008 framework, not the 2008 answers.",
      take: "Test for the mechanism, not the asset.", color: C.red },
  ];
  const lW = 4.07, lH = 3.5, lGap = 0.12, lY = 2.55;
  lessons.forEach((l, i) => {
    const x = 0.5 + i * (lW + lGap);
    s.addShape(pres.shapes.RECTANGLE, { x, y: lY, w: lW, h: 0.08, fill: { color: l.color }, line: { color: l.color, width: 0 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: lY + 0.08, w: lW, h: lH - 0.08, fill: { color: C.white }, line: { color: C.lightGray, width: 0.75 } });
    s.addText(l.num, { x: x + 0.3, y: lY + 0.2, w: lW - 0.5, h: 0.55, fontFace: F.title, fontSize: 32, bold: true, color: l.color, margin: 0 });
    s.addText(l.title, { x: x + 0.3, y: lY + 0.9, w: lW - 0.5, h: 0.55, fontFace: F.body, fontSize: 14, bold: true, color: C.ink, margin: 0 });
    s.addText(l.body,  { x: x + 0.3, y: lY + 1.5, w: lW - 0.6, h: 1.4, fontFace: F.body, fontSize: 11, color: C.body, margin: 0 });
    // Takeaway strip (colored bar)
    s.addShape(pres.shapes.RECTANGLE, { x, y: lY + lH - 0.55, w: lW, h: 0.55, fill: { color: l.color }, line: { color: l.color, width: 0 } });
    s.addText([
      { text: "TAKEAWAY:   ", options: { bold: true, charSpacing: 2, color: C.white } },
      { text: l.take, options: { italic: true, color: C.white } },
    ], { x: x + 0.25, y: lY + lH - 0.55, w: lW - 0.5, h: 0.55, fontFace: F.label, fontSize: 11, valign: "middle", margin: 0 });
  });

  // Forward test banner
  const fbY = 6.15;
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: fbY, w: W - 1.0, h: 0.5, fill: { color: C.green }, line: { color: C.green, width: 0 } });
  s.addText([
    { text: "FORWARD TEST:   ", options: { bold: true, color: C.gold, charSpacing: 3 } },
    { text: "For each lesson, apply the 2008 framework (Trigger, Channel, Amplifier, Response) to today’s candidates: private credit, CRE, sovereign debt, crypto.",
      options: { italic: true, color: C.white } },
  ], { x: 0.7, y: fbY, w: W - 1.4, h: 0.5, fontFace: F.label, fontSize: 11, valign: "middle", margin: 0 });

  addSource(s, "Synthesis: author. Data sources: FSB Global Monitoring Report 2024 (shadow banking $239T); Federal Reserve FSOC; FCIC (2011).");
  addFooter(s, 12);
}

// =============================================================
// SLIDE 13 — Four open questions
// =============================================================
{
  const s = pres.addSlide();
  s.background = { path: path.join(ASSETS, "content_bg.jpg") };
  addTitle(s, "Four open questions test whether Dodd-Frank’s reforms will hold; the discussion should evaluate each against the three lessons");

  const qs = [
    { q: "Q1", title: "Did asymmetric bailout decisions entrench moral hazard?",
      sub: "How should regulators establish ex-ante criteria for intervention in SIFIs, and can such rules survive political pressure in a crisis?" },
    { q: "Q2", title: "Is 5% risk retention sufficient to realign securitization incentives?",
      sub: "What alternatives (claw-backs, compensation deferrals, risk-sharing tranches) would better align originators and investors?" },
    { q: "Q3", title: "Has Dodd-Frank closed the regulatory gaps that caused the crisis?",
      sub: "With oversight still split across OCC, FDIC, Fed, SEC, and CFTC: does FSOC provide adequate coordination, or just consultation?" },
    { q: "Q4", title: "Where is systemic risk concentrating today?",
      sub: "Evaluate leveraged lending/CLOs, crypto/DeFi, CRE, private credit, and sovereign debt. Apply the 2008 framework: trigger, channel, amplifier." },
  ];
  const qW = 6.2, qH = 1.95, qGap = 0.15, qStartX = 0.5, qStartY = 2.1;
  qs.forEach((item, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = qStartX + col * (qW + qGap);
    const y = qStartY + row * (qH + qGap);
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: qW, h: qH, fill: { color: C.white }, line: { color: C.lightGray, width: 0.75 } });
    // Left green bar
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.1, h: qH, fill: { color: C.green }, line: { color: C.green, width: 0 } });
    // Q number
    s.addText(item.q, { x: x + 0.3, y: y + 0.25, w: 1.1, h: 0.9, fontFace: F.title, fontSize: 40, bold: true, color: C.green, margin: 0 });
    // Title
    s.addText(item.title, { x: x + 1.5, y: y + 0.25, w: qW - 1.7, h: 0.75, fontFace: F.body, fontSize: 15, bold: true, color: C.ink, margin: 0 });
    // Sub
    s.addText(item.sub,   { x: x + 1.5, y: y + 1.05, w: qW - 1.7, h: 0.85, fontFace: F.body, fontSize: 11, color: C.bodyMuted, margin: 0 });
  });

  // Discussion framework line
  s.addText([
    { text: "DISCUSSION FRAMEWORK:   ", options: { bold: true, color: C.green, charSpacing: 3 } },
    { text: "Trigger  →  Channel  →  Amplifier  →  Policy response", options: { italic: true, color: C.body } },
  ], {
    x: 0.5, y: 6.3, w: W - 1.0, h: 0.4,
    fontFace: F.label, fontSize: 12, align: "center", valign: "middle", margin: 0,
  });

  addFooter(s, 13);
}

// =============================================================
// WRITE OUT
// =============================================================
pres.writeFile({ fileName: "output.pptx" }).then(f => console.log("Wrote " + f));
