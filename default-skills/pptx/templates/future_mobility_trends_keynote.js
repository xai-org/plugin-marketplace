/**
 * The Future of Mobility — Keynote
 * Complete pptxgenjs replica of future_of_mobility.pptx
 *
 * Run:  node future_of_mobility.js
 * Deps: npm install pptxgenjs
 *
 * Image assets are expected in ./images/ :
 *   image-1-1.jpeg   (slide 1  — Mustang / hero)
 *   image-3-1.png    (slide 3  — inflection chart)
 *   image-6-1.png    (slide 6  — S-curve chart)
 *   image-12-1.png   (slide 12 — sunset/car backdrop)
 *   image-14-1.png   (slide 14 — eVTOL technical diagram)
 *   image-15-1.jpeg  (slide 15 — architecture / rooftop backdrop)
 */

const PptxGenJS = require("pptxgenjs");

const pres = new PptxGenJS();
pres.layout = "LAYOUT_WIDE";                // 13.333 × 7.5 in — same 16:9 ratio as original
pres.title   = "The Future of Mobility";
pres.author  = "Keynote · April 2026";

// ---------------------------------------------------------------------------
//  DESIGN TOKENS
// ---------------------------------------------------------------------------
const C = {
  cream      : "F4EFE6",      // canonical light background
  creamSoft  : "EFE8DB",      // slide 15 card row hint
  ink        : "0A0E0F",      // near-black
  inkMute    : "3A3E3F",      // body text
  inkFaint   : "8A8E8F",      // micro captions / dividers
  lime       : "E8FF3C",      // signature accent
  red        : "D84315",      // secondary accent (stats, alerts)
  white      : "FFFFFF",
};

const F = {
  display : "Helvetica Neue",
  body    : "Helvetica Neue",
  mono    : "Helvetica Neue",
};

// Slide dimensions (LAYOUT_WIDE)
const W = 13.333;
const H = 7.5;

// ---------------------------------------------------------------------------
//  SHARED HELPERS
// ---------------------------------------------------------------------------
/** Top utility bar: page tag on left, deck title on right */
function addTopBar(slide, leftText, rightText = "THE FUTURE OF MOBILITY", onDark = false) {
  const color = onDark ? C.cream : C.ink;
  slide.addText(leftText, {
    x: 0.5, y: 0.25, w: 6, h: 0.3,
    fontFace: F.body, fontSize: 9, color, charSpacing: 2,
    align: "left", valign: "middle",
  });
  slide.addText(rightText, {
    x: W - 6.5, y: 0.25, w: 6, h: 0.3,
    fontFace: F.body, fontSize: 9, color, charSpacing: 2,
    align: "right", valign: "middle",
  });
}

/** Bottom utility bar: page numerator on left, section on right */
function addBottomBar(slide, page, section, onDark = false) {
  const color = onDark ? C.cream : C.ink;
  slide.addText(`${String(page).padStart(2, "0")} / 18`, {
    x: 0.5, y: H - 0.45, w: 3, h: 0.3,
    fontFace: F.body, fontSize: 9, color,
    align: "left", valign: "middle",
  });
  slide.addText(section, {
    x: W - 6.5, y: H - 0.45, w: 6, h: 0.3,
    fontFace: F.body, fontSize: 9, color, charSpacing: 2,
    align: "right", valign: "middle",
  });
}

/** Small section eyebrow — lime on dark sections when needed */
function addEyebrow(slide, text, x, y, w, color = C.ink) {
  slide.addText(text, {
    x, y, w, h: 0.28,
    fontFace: F.body, fontSize: 10, color, charSpacing: 3, bold: false,
    valign: "top",
  });
}

// ===========================================================================
//  SLIDE 1 — HERO / TITLE
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.ink };

  // Hero image full-bleed
  s.addImage({ path: "./images/image-1-1.jpeg", x: 0, y: 0, w: W, h: H, sizing: { type: "cover", w: W, h: H } });

  // Dark-ish tint for contrast (subtle overlay)
  s.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: W, h: H,
    fill: { color: C.ink, transparency: 55 }, line: { type: "none" },
  });

  // Top bar (on dark)
  s.addText("KEYNOTE · APRIL 2026", {
    x: 0.5, y: 0.25, w: 6, h: 0.3,
    fontFace: F.body, fontSize: 9, color: C.cream, charSpacing: 2,
    align: "left", valign: "middle",
  });
  s.addText("THE FUTURE OF MOBILITY", {
    x: W - 6.5, y: 0.25, w: 6, h: 0.3,
    fontFace: F.body, fontSize: 9, color: C.cream, charSpacing: 2,
    align: "right", valign: "middle",
  });

  // Eyebrow
  s.addText("A KEYNOTE IN THREE PARTS", {
    x: 0.7, y: 2.85, w: 6, h: 0.3,
    fontFace: F.body, fontSize: 11, color: C.lime, charSpacing: 3,
    align: "left", valign: "middle",
  });

  // Hero title — "The Future of" + italic "of" + "Mobility"
  s.addText(
    [
      { text: "The Future ", options: { color: C.cream } },
      { text: "of",           options: { color: C.cream, italic: true } },
      { text: "\nMobility",   options: { color: C.cream } },
    ],
    {
      x: 0.7, y: 3.2, w: 10.5, h: 2.6,
      fontFace: F.display, fontSize: 82, bold: false,
      align: "left", valign: "top", charSpacing: -2,
    }
  );

  // Three parts footer links
  const parts = [
    { x: 0.7,  label: "I ELECTRIFICATION" },
    { x: 3.4,  label: "II AUTONOMY" },
    { x: 5.7,  label: "III THE THIRD DIMENSION" },
  ];
  parts.forEach(p => {
    s.addText(p.label, {
      x: p.x, y: 6.4, w: 3.2, h: 0.3,
      fontFace: F.body, fontSize: 9, color: C.cream, charSpacing: 2,
      align: "left", valign: "middle",
    });
  });

  // Footer
  s.addText("01 / 18", {
    x: 0.5, y: H - 0.45, w: 3, h: 0.3,
    fontFace: F.body, fontSize: 9, color: C.cream,
    align: "left", valign: "middle",
  });
  s.addText("— SPEAKER, CONFERENCE, 2026 —", {
    x: W - 6.5, y: H - 0.45, w: 6, h: 0.3,
    fontFace: F.body, fontSize: 9, color: C.cream, charSpacing: 2,
    align: "right", valign: "middle",
  });
}

// ===========================================================================
//  SLIDE 2 — WHERE WE'VE BEEN (timeline cards)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTopBar(s, "02 · CONTEXT");
  addBottomBar(s, 2, "CONTEXT");

  addEyebrow(s, "WHERE WE'VE BEEN", 0.7, 1.25, 4);

  s.addText("A century of the car, mostly unchanged.", {
    x: 0.7, y: 1.65, w: 10, h: 1.8,
    fontFace: F.display, fontSize: 40, color: C.ink, bold: false,
    charSpacing: -1, align: "left", valign: "top",
  });

  // Timeline cards — 5 columns, last one dark
  const items = [
    { year: "1908",   title: "Model T",     body: "Internal combustion, mass-produced.",   dark: false },
    { year: "1956",   title: "Interstate",  body: "The car reshapes the American city.",   dark: false },
    { year: "1973",   title: "Oil Shock",   body: "Fuel economy becomes politics.",        dark: false },
    { year: "1997",   title: "Prius",       body: "The first mainstream hybrid.",          dark: false },
    { year: "2012 —", title: "Model S",     body: "Software eats the car.",                dark: true  },
  ];

  const startY = 4.45;
  const cardH  = 2.4;
  const gap    = 0.04;
  const totalW = 12.133;
  const cardW  = (totalW - gap * 4) / 5;
  let cursorX  = 0.6;

  // Top divider line above cards
  s.addShape(pres.ShapeType.line, {
    x: 0.6, y: startY - 0.05, w: totalW, h: 0,
    line: { color: C.inkFaint, width: 0.5 },
  });

  items.forEach((it) => {
    if (it.dark) {
      s.addShape(pres.ShapeType.rect, {
        x: cursorX, y: startY, w: cardW, h: cardH,
        fill: { color: C.ink }, line: { type: "none" },
      });
    }
    const textColor = it.dark ? C.cream : C.ink;
    const mutedCol  = it.dark ? C.cream : C.inkMute;
    const yearCol   = it.dark ? C.lime  : C.inkFaint;

    s.addText(it.year, {
      x: cursorX + 0.18, y: startY + 0.18, w: cardW - 0.3, h: 0.28,
      fontFace: F.body, fontSize: 10, color: yearCol, charSpacing: 2,
      align: "left", valign: "top",
    });
    s.addText(it.title, {
      x: cursorX + 0.18, y: startY + 0.5, w: cardW - 0.3, h: 1.15,
      fontFace: F.display, fontSize: 28, color: textColor, bold: false,
      charSpacing: -0.5, align: "left", valign: "top",
    });
    s.addText(it.body, {
      x: cursorX + 0.18, y: startY + cardH - 0.75, w: cardW - 0.3, h: 0.65,
      fontFace: F.body, fontSize: 10, color: mutedCol,
      align: "left", valign: "top",
    });

    // Vertical divider line to the right of non-last, non-dark cards
    if (it !== items[items.length - 1] && !items[items.indexOf(it) + 1].dark) {
      // handled implicitly by equal spacing; skip drawing to keep clean
    }

    cursorX += cardW + gap;
  });
}

// ===========================================================================
//  SLIDE 3 — THE INFLECTION POINT (chart PNG on right)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTopBar(s, "03 · CONTEXT");
  addBottomBar(s, 3, "THE INFLECTION POINT");

  addEyebrow(s, "THE INFLECTION POINT", 0.7, 1.4, 5);

  s.addText("Three curves are bending at the same time.", {
    x: 0.7, y: 1.75, w: 5.9, h: 2.6,
    fontFace: F.display, fontSize: 42, color: C.ink, bold: false,
    charSpacing: -1, align: "left", valign: "top",
  });

  s.addText(
    "Battery cost, autonomous capability, and electric aviation have each crossed thresholds that looked decades away in 2015. The next fifteen years will not resemble the last fifty.",
    {
      x: 0.7, y: 4.6, w: 5.6, h: 2.1,
      fontFace: F.body, fontSize: 14, color: C.inkMute,
      align: "left", valign: "top", lineSpacingMultiple: 1.35,
    }
  );

  // The chart PNG
  s.addImage({ path: "./images/image-3-1.png", x: 7.0, y: 1.1, w: 5.8, h: 5.4 });
}

// ===========================================================================
//  SLIDE 4 — ARC OF TALK (3-up)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTopBar(s, "04 · AGENDA");
  addBottomBar(s, 4, "AGENDA");

  addEyebrow(s, "THE ARC OF THIS TALK", 0.7, 1.3, 5);

  s.addText("Three shifts in motion.", {
    x: 0.7, y: 1.65, w: 11, h: 1.1,
    fontFace: F.display, fontSize: 44, color: C.ink, bold: false,
    charSpacing: -1, align: "left", valign: "top",
  });

  // 3 columns with divider line above each
  const parts = [
    { roman: "I",   title: "Electrification",     body: "The powertrain changes. Then the factory. Then the grid.",     slides: "SLIDES 05–09" },
    { roman: "II",  title: "Autonomy",            body: "Cars stop needing drivers. Then stop needing to be owned.",    slides: "SLIDES 10–12" },
    { roman: "III", title: "The Third Dimension", body: "The sky opens up to short-range, electric, quiet flight.",     slides: "SLIDES 13–18" },
  ];

  const colW = 3.85;
  const gap  = 0.15;
  const startX = 0.7;
  const topY = 3.6;

  parts.forEach((p, i) => {
    const cx = startX + i * (colW + gap);

    // Divider line above
    s.addShape(pres.ShapeType.line, {
      x: cx, y: topY, w: colW, h: 0,
      line: { color: C.ink, width: 0.75 },
    });

    // Roman numeral
    s.addText(p.roman, {
      x: cx, y: topY + 0.12, w: colW, h: 0.3,
      fontFace: F.body, fontSize: 11, color: C.red, charSpacing: 2,
      align: "left", valign: "top",
    });

    // Title (italic)
    s.addText(p.title, {
      x: cx, y: topY + 0.5, w: colW, h: 1.35,
      fontFace: F.display, fontSize: 30, color: C.ink, italic: true,
      charSpacing: -0.5, align: "left", valign: "top",
    });

    // Body
    s.addText(p.body, {
      x: cx, y: topY + 1.95, w: colW, h: 1.1,
      fontFace: F.body, fontSize: 14, color: C.inkMute,
      align: "left", valign: "top", lineSpacingMultiple: 1.35,
    });

    // Slides label near bottom
    s.addText(p.slides, {
      x: cx, y: H - 1.25, w: colW, h: 0.3,
      fontFace: F.body, fontSize: 9, color: C.inkFaint, charSpacing: 2,
      align: "left", valign: "top",
    });
  });
}

// ===========================================================================
//  SLIDE 5 — PART I DIVIDER (dark, single slash)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.ink };
  addTopBar(s, "PART I OF III", "ELECTRIFICATION", true);
  addBottomBar(s, 5, "I · ELECTRIFICATION", true);

  // Single lime slash (rotated rectangle)
  s.addShape(pres.ShapeType.rect, {
    x: 6.5, y: 2.4, w: 0.36, h: 2.5, rotate: 15,
    fill: { color: C.lime }, line: { type: "none" },
  });

  // PART ONE eyebrow
  s.addText("PART ONE", {
    x: 0.7, y: 5.2, w: 3, h: 0.3,
    fontFace: F.body, fontSize: 11, color: C.lime, charSpacing: 3,
    align: "left", valign: "top",
  });

  // Big title
  s.addText("Electrification.", {
    x: 0.7, y: 5.6, w: 9, h: 1.2,
    fontFace: F.display, fontSize: 54, color: C.cream, bold: false,
    charSpacing: -1, align: "left", valign: "top",
  });

  // Right-hand pull quote
  s.addText('"First the powertrain. Then the factory. Then the grid."', {
    x: 9.5, y: 5.55, w: 3.3, h: 1.4,
    fontFace: F.display, fontSize: 16, color: C.cream, italic: true,
    align: "right", valign: "top", lineSpacingMultiple: 1.3,
  });
}

// ===========================================================================
//  SLIDE 6 — EV S-CURVE
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTopBar(s, "06 · I. ELECTRIFICATION");
  addBottomBar(s, 6, "I · ELECTRIFICATION");

  addEyebrow(s, "THE EV S-CURVE", 0.7, 1.25, 4);

  s.addText("Adoption isn't linear. It's already compounding.", {
    x: 0.7, y: 1.6, w: 12, h: 1.8,
    fontFace: F.display, fontSize: 40, color: C.ink, bold: false,
    charSpacing: -1, align: "left", valign: "top",
  });

  // Chart image
  s.addImage({ path: "./images/image-6-1.png", x: 0.7, y: 3.6, w: 6.6, h: 3.3 });

  // Right column body
  s.addText(
    "EVs went from 1% of new cars sold globally in 2015 to over one in five today. Every previous S-curve — smartphones, solar, streaming — went vertical right at this point.",
    {
      x: 7.7, y: 3.7, w: 5.2, h: 2.1,
      fontFace: F.body, fontSize: 14, color: C.inkMute,
      align: "left", valign: "top", lineSpacingMultiple: 1.35,
    }
  );

  // Stat trio
  const statsY = 5.95;
  const stats = [
    { label: "2015",  val: "1%",  color: C.ink  },
    { label: "2020",  val: "5%",  color: C.ink  },
    { label: "TODAY", val: "22%", color: C.red  },
  ];
  stats.forEach((st, i) => {
    const x = 7.7 + i * 1.6;
    s.addText(st.label, {
      x, y: statsY, w: 1.4, h: 0.3,
      fontFace: F.body, fontSize: 10, color: st.color === C.red ? C.red : C.inkFaint, charSpacing: 2,
      align: "left", valign: "top",
    });
    s.addText(st.val, {
      x, y: statsY + 0.32, w: 1.4, h: 0.7,
      fontFace: F.display, fontSize: 34, color: st.color, bold: false,
      charSpacing: -1, align: "left", valign: "top",
    });
  });
}

// ===========================================================================
//  SLIDE 7 — BATTERY ECONOMICS (full lime background, chart via pptxgenjs)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.lime };

  // Top / bottom bars — drawn manually so they contrast with lime bg
  s.addText("07 · I. ELECTRIFICATION", {
    x: 0.5, y: 0.25, w: 6, h: 0.3,
    fontFace: F.body, fontSize: 9, color: C.ink, charSpacing: 2,
    align: "left", valign: "middle",
  });
  s.addText("THE FUTURE OF MOBILITY", {
    x: W - 6.5, y: 0.25, w: 6, h: 0.3,
    fontFace: F.body, fontSize: 9, color: C.ink, charSpacing: 2,
    align: "right", valign: "middle",
  });
  s.addText("07 / 18", {
    x: 0.5, y: H - 0.45, w: 3, h: 0.3,
    fontFace: F.body, fontSize: 9, color: C.ink, align: "left", valign: "middle",
  });
  s.addText("I · ELECTRIFICATION", {
    x: W - 6.5, y: H - 0.45, w: 6, h: 0.3,
    fontFace: F.body, fontSize: 9, color: C.ink, charSpacing: 2,
    align: "right", valign: "middle",
  });

  addEyebrow(s, "BATTERY ECONOMICS", 0.7, 1.1, 4, C.ink);

  s.addText("The one number that changed everything.", {
    x: 0.7, y: 1.45, w: 6.2, h: 2.7,
    fontFace: F.display, fontSize: 44, color: C.ink, bold: false,
    charSpacing: -1, align: "left", valign: "top", lineSpacingMultiple: 1.0,
  });

  // Body with bold inline emphasis
  s.addText(
    [
      { text: "Lithium-ion pack price has fallen ",  options: { color: C.ink } },
      { text: "~90%",                                options: { color: C.ink, bold: true } },
      { text: " in fifteen years. Below ",           options: { color: C.ink } },
      { text: "$100/kWh",                            options: { color: C.ink, bold: true } },
      { text: ", an EV costs the same to build as a gasoline car — before any fuel savings.", options: { color: C.ink } },
    ],
    {
      x: 0.7, y: 4.75, w: 5.8, h: 2.1,
      fontFace: F.body, fontSize: 14, align: "left", valign: "top",
      lineSpacingMultiple: 1.35,
    }
  );

  // Vertical divider line between text and chart
  s.addShape(pres.ShapeType.line, {
    x: 7.0, y: 1.4, w: 0, h: 5.4,
    line: { color: C.ink, width: 0.75 },
  });

  // Chart label
  s.addText("LITHIUM-ION PACK PRICE, $/KWH", {
    x: 7.3, y: 1.45, w: 5.5, h: 0.3,
    fontFace: F.body, fontSize: 10, color: C.ink, charSpacing: 2,
    align: "left", valign: "top",
  });

  // Bar chart — built natively with pptxgenjs
  const chartData = [{
    name: "Pack price",
    labels: ["2010", "2015", "2020", "2025", "2030 EST."],
    values: [1200, 650, 140, 95, 60],
  }];
  s.addChart(pres.ChartType.bar, chartData, {
    x: 7.3, y: 1.9, w: 5.5, h: 4.9,
    barDir: "col",
    barGrouping: "clustered",
    chartColors: [C.ink, C.ink, C.ink, C.red, "8A9A2F"],
    chartColorsOpacity: 100,
    showValue: true,
    dataLabelFontFace: F.body,
    dataLabelFontSize: 10,
    dataLabelColor: C.ink,
    dataLabelPosition: "outEnd",
    dataLabelFormatCode: '"$"#,##0',
    catAxisLabelFontFace: F.body,
    catAxisLabelFontSize: 9,
    catAxisLabelColor: C.ink,
    valAxisHidden: true,
    catGridLine: { style: "none" },
    valGridLine: { style: "none" },
    showLegend: false,
    plotArea: { fill: { color: C.lime } },
    chartArea: { fill: { color: C.lime } },
    barGapWidthPct: 60,
    catAxisLineShow: false,
  });
}

// ===========================================================================
//  SLIDE 8 — TABLE (Beyond the Passenger Car)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTopBar(s, "08 · I. ELECTRIFICATION");
  addBottomBar(s, 8, "I · ELECTRIFICATION");

  addEyebrow(s, "BEYOND THE PASSENGER CAR", 0.7, 1.2, 5);

  s.addText("The sedan isn't the story. Everything that moves is.", {
    x: 0.7, y: 1.55, w: 12, h: 1.7,
    fontFace: F.display, fontSize: 38, color: C.ink, bold: false,
    charSpacing: -1, align: "left", valign: "top",
  });

  // Table
  const head = [
    { text: "SEGMENT",         options: { bold: false, color: C.inkFaint, fontSize: 10, charSpacing: 2 } },
    { text: "ELECTRIC TODAY",  options: { bold: false, color: C.inkFaint, fontSize: 10, charSpacing: 2, align: "center" } },
    { text: "ELECTRIC BY 2035",options: { bold: false, color: C.inkFaint, fontSize: 10, charSpacing: 2, align: "center" } },
    { text: "WHAT UNLOCKS IT", options: { bold: false, color: C.inkFaint, fontSize: 10, charSpacing: 2 } },
  ];
  const rows = [
    ["Passenger cars",          "22%", "70%",  "Price parity. Charging ubiquity."],
    ["Two- & three-wheelers",   "45%", "90%",  "Already cheaper in Asia. Already won."],
    ["Urban delivery vans",     "14%", "80%",  "Fixed routes, depot charging, TCO math."],
    ["City buses",              "55%", "95%",  "Public procurement leading the way."],
    ["Long-haul trucks",         "3%", "35%",  "Megawatt charging corridors, pack density."],
    ["Short-hop aircraft",      "<1%", "~15%", "eVTOL certification + vertiport build-out."],
  ];
  const body = rows.map(r => [
    { text: r[0], options: { bold: true,  color: C.ink,  fontSize: 14, valign: "middle" } },
    { text: r[1], options: { bold: false, color: C.ink,  fontSize: 18, align: "center", valign: "middle" } },
    { text: r[2], options: { bold: false, color: C.red,  fontSize: 18, align: "center", valign: "middle" } },
    { text: r[3], options: { bold: false, color: C.inkMute, fontSize: 12, valign: "middle" } },
  ]);

  s.addTable([head, ...body], {
    x: 0.7, y: 3.7, w: 12.0,
    colW: [3.0, 2.0, 2.2, 4.8],
    rowH: [0.4, 0.44, 0.44, 0.44, 0.44, 0.44, 0.44],
    border: { type: "solid", pt: 0.5, color: C.inkFaint },
    fontFace: F.body,
  });
}

// ===========================================================================
//  SLIDE 9 — GRID QUESTION (dark, 4 stat cards on right)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.ink };
  addTopBar(s, "09 · I. ELECTRIFICATION", "THE FUTURE OF MOBILITY", true);
  addBottomBar(s, 9, "I · ELECTRIFICATION", true);

  addEyebrow(s, "THE GRID QUESTION", 0.7, 1.4, 5, C.lime);

  s.addText("The car becomes a battery on wheels.", {
    x: 0.7, y: 1.75, w: 6.0, h: 2.4,
    fontFace: F.display, fontSize: 42, color: C.cream, bold: false,
    charSpacing: -1, align: "left", valign: "top",
  });

  s.addText(
    "A parked fleet of 300 million EVs is the largest distributed storage asset humans have ever built — if we let it talk to the grid.",
    {
      x: 0.7, y: 4.6, w: 5.6, h: 2.1,
      fontFace: F.body, fontSize: 14, color: C.cream,
      align: "left", valign: "top", lineSpacingMultiple: 1.35,
    }
  );

  // 4 stat cards (2x2) on right half
  const stats = [
    { val: "+25%", body: "additional electricity\ndemand from full EV\nadoption by 2040." },
    { val: "90%",  body: "of an EV's life is spent\nparked — plugged in is\noptional." },
    { val: "2×",   body: "more storage in one Model\n3 pack than an average\nU.S. home uses in 3 days." },
    { val: "$T",   body: "of grid upgrades\ndeferred by smart\nbidirectional charging." },
  ];
  const gridX = 7.3;
  const gridY = 1.6;
  const cellW = 2.85;
  const cellH = 2.55;
  const gapX  = 0.25;
  const gapY  = 0.2;

  stats.forEach((st, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx = gridX + col * (cellW + gapX);
    const cy = gridY + row * (cellH + gapY);

    // Top divider line
    s.addShape(pres.ShapeType.line, {
      x: cx, y: cy, w: cellW, h: 0,
      line: { color: C.cream, width: 0.5 },
    });

    // Big stat
    s.addText(st.val, {
      x: cx, y: cy + 0.1, w: cellW, h: 1.05,
      fontFace: F.display, fontSize: 54, color: C.lime, bold: false,
      charSpacing: -2, align: "left", valign: "top",
    });

    // Body
    s.addText(st.body, {
      x: cx, y: cy + 1.3, w: cellW, h: 1.1,
      fontFace: F.body, fontSize: 12, color: C.cream,
      align: "left", valign: "top", lineSpacingMultiple: 1.3,
    });
  });
}

// ===========================================================================
//  SLIDE 10 — PART II DIVIDER (double slash)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.ink };
  addTopBar(s, "PART II OF III", "AUTONOMY", true);
  addBottomBar(s, 10, "II · AUTONOMY", true);

  // Two lime slashes
  s.addShape(pres.ShapeType.rect, {
    x: 6.2, y: 2.4, w: 0.36, h: 2.5, rotate: 15,
    fill: { color: C.lime }, line: { type: "none" },
  });
  s.addShape(pres.ShapeType.rect, {
    x: 7.0, y: 2.4, w: 0.36, h: 2.5, rotate: 15,
    fill: { color: C.lime }, line: { type: "none" },
  });

  s.addText("PART TWO", {
    x: 0.7, y: 5.2, w: 3, h: 0.3,
    fontFace: F.body, fontSize: 11, color: C.lime, charSpacing: 3,
    align: "left", valign: "top",
  });
  s.addText("Autonomy.", {
    x: 0.7, y: 5.6, w: 9, h: 1.2,
    fontFace: F.display, fontSize: 54, color: C.cream, bold: false,
    charSpacing: -1, align: "left", valign: "top",
  });

  s.addText(
    [
      { text: '"The steering wheel is the vestigial organ of the 20', options: { color: C.cream, italic: true } },
      { text: "th",                                                    options: { color: C.cream, italic: true, superscript: true } },
      { text: ' century."',                                            options: { color: C.cream, italic: true } },
    ],
    {
      x: 9.5, y: 5.4, w: 3.3, h: 1.6,
      fontFace: F.display, fontSize: 16,
      align: "right", valign: "top", lineSpacingMultiple: 1.3,
    }
  );
}

// ===========================================================================
//  SLIDE 11 — SAE LEVELS 0 - 5
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTopBar(s, "11 · II. AUTONOMY");
  addBottomBar(s, 11, "II · AUTONOMY");

  addEyebrow(s, "FROM ASSIST TO AGENT", 0.7, 1.2, 5);

  s.addText("Five levels. We've quietly crossed the hardest one.", {
    x: 0.7, y: 1.55, w: 12, h: 1.8,
    fontFace: F.display, fontSize: 38, color: C.ink, bold: false,
    charSpacing: -1, align: "left", valign: "top",
  });

  const levels = [
    { n: "0",   label: "NO AUTOMATION", body: "Human drives everything.",                              dark: false },
    { n: "1",   label: "ASSIST",        body: "Cruise control, lane-keep.",                            dark: false },
    { n: "2",   label: "PARTIAL",       body: "Hands off, eyes on. Shipping now.",                     dark: false },
    { n: "3",   label: "CONDITIONAL",   body: "Hands off, eyes off — within a domain. *We are here.*",dark: true  },
    { n: "4–5", label: "FULL",          body: "Robotaxis in cities. Everywhere, eventually.",          dark: false },
  ];

  const topY = 3.85;
  const cardH = 2.9;
  const gap = 0.1;
  const totalW = 12.0;
  const cardW  = (totalW - gap * 4) / 5;
  let cx = 0.7;

  levels.forEach((lv) => {
    // Divider line above each (except behind dark card)
    if (!lv.dark) {
      s.addShape(pres.ShapeType.line, {
        x: cx, y: topY, w: cardW, h: 0,
        line: { color: C.inkFaint, width: 0.5 },
      });
    }

    if (lv.dark) {
      s.addShape(pres.ShapeType.rect, {
        x: cx, y: topY, w: cardW, h: cardH,
        fill: { color: C.ink }, line: { type: "none" },
      });
    }
    const big   = lv.dark ? C.lime : C.ink;
    const lab   = lv.dark ? C.lime : C.inkFaint;
    const body  = lv.dark ? C.cream : C.inkMute;

    s.addText(lv.n, {
      x: cx + 0.15, y: topY + 0.18, w: cardW - 0.3, h: 0.95,
      fontFace: F.display, fontSize: 52, color: big, bold: false,
      charSpacing: -1, align: "left", valign: "top",
    });
    s.addText(lv.label, {
      x: cx + 0.15, y: topY + 1.2, w: cardW - 0.3, h: 0.3,
      fontFace: F.body, fontSize: 10, color: lab, charSpacing: 2,
      align: "left", valign: "top",
    });

    // Body — slide 11 row 4 has italic "We are here"
    if (lv.dark) {
      s.addText(
        [
          { text: "Hands off, eyes off — within a domain. ", options: { color: body } },
          { text: "We are here.",                             options: { color: body, italic: true } },
        ],
        {
          x: cx + 0.15, y: topY + 1.55, w: cardW - 0.3, h: 1.2,
          fontFace: F.body, fontSize: 12,
          align: "left", valign: "top", lineSpacingMultiple: 1.35,
        }
      );
    } else {
      s.addText(lv.body, {
        x: cx + 0.15, y: topY + 1.55, w: cardW - 0.3, h: 1.2,
        fontFace: F.body, fontSize: 12, color: body,
        align: "left", valign: "top", lineSpacingMultiple: 1.35,
      });
    }

    cx += cardW + gap;
  });
}

// ===========================================================================
//  SLIDE 12 — ROBOTAXIS AT SCALE (image bg + glass cards)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.ink };

  // Full-bleed image
  s.addImage({ path: "./images/image-12-1.png", x: 0, y: 0, w: W, h: H, sizing: { type: "cover", w: W, h: H } });

  // Subtle dark overlay on left for legibility
  s.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: W * 0.55, h: H,
    fill: { color: C.ink, transparency: 25 }, line: { type: "none" },
  });

  addTopBar(s, "12 · II. AUTONOMY", "THE FUTURE OF MOBILITY", true);
  addBottomBar(s, 12, "II · AUTONOMY", true);

  addEyebrow(s, "ROBOTAXIS AT SCALE", 0.7, 2.0, 5, C.lime);

  s.addText("Rides, not cars.", {
    x: 0.7, y: 2.4, w: 6.5, h: 1.3,
    fontFace: F.display, fontSize: 54, color: C.cream, bold: false,
    charSpacing: -1, align: "left", valign: "top",
  });

  s.addText(
    "A robotaxi runs 20 hours a day. A private car runs 1. The per-mile cost of the former drops below public transit in dense cities — and the economics of owning a car for urbanites quietly stop making sense.",
    {
      x: 0.7, y: 4.1, w: 5.6, h: 2.5,
      fontFace: F.body, fontSize: 13, color: C.cream,
      align: "left", valign: "top", lineSpacingMultiple: 1.35,
    }
  );

  // 2x2 translucent cards on right half
  const cards = [
    { label: "COST PER MILE",      big: "$0.35",  sub: "Projected robotaxi, 2030",       note: "vs. $0.72 private car · $0.90 human rideshare" },
    { label: "UTILIZATION",        big: "20×",    sub: "Robotaxi vs. private vehicle",   note: "~83% of day driving vs. ~4%" },
    { label: "CARS PER 1,000 PEOPLE", big: "↓ 40%", sub: "Dense cities, 2040 scenario", note: "Fewer vehicles, more trips." },
    { label: "URBAN LAND",         big: "30%",    sub: "Freed from parking",             note: "The single biggest land-use shift since the highway." },
  ];

  const gX = 7.2;
  const gY = 1.7;
  const cW = 2.85;
  const cH = 2.55;
  const gap = 0.15;

  cards.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = gX + col * (cW + gap);
    const y = gY + row * (cH + gap);

    // Translucent dark card
    s.addShape(pres.ShapeType.rect, {
      x, y, w: cW, h: cH,
      fill: { color: C.ink, transparency: 55 },
      line: { color: C.cream, width: 0.25, transparency: 60 },
    });

    s.addText(c.label, {
      x: x + 0.2, y: y + 0.2, w: cW - 0.25, h: 0.28,
      fontFace: F.body, fontSize: 9, color: C.cream, charSpacing: 2,
      align: "left", valign: "top",
    });
    s.addText(c.big, {
      x: x + 0.2, y: y + 0.52, w: cW - 0.4, h: 0.95,
      fontFace: F.display, fontSize: 46, color: C.lime, bold: false,
      charSpacing: -2, align: "left", valign: "top",
    });
    s.addText(c.sub, {
      x: x + 0.2, y: y + 1.55, w: cW - 0.4, h: 0.35,
      fontFace: F.body, fontSize: 11, color: C.cream, bold: false,
      align: "left", valign: "top",
    });
    s.addText(c.note, {
      x: x + 0.2, y: y + 1.95, w: cW - 0.4, h: 0.55,
      fontFace: F.body, fontSize: 10, color: C.cream,
      align: "left", valign: "top", lineSpacingMultiple: 1.3,
    });
  });
}

// ===========================================================================
//  SLIDE 13 — PART III DIVIDER (triple slash)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.ink };
  addTopBar(s, "PART III OF III", "THE THIRD DIMENSION", true);
  addBottomBar(s, 13, "III · THE THIRD DIMENSION", true);

  // Three lime slashes
  [5.9, 6.7, 7.5].forEach((x) => {
    s.addShape(pres.ShapeType.rect, {
      x, y: 2.4, w: 0.36, h: 2.5, rotate: 15,
      fill: { color: C.lime }, line: { type: "none" },
    });
  });

  s.addText("PART THREE", {
    x: 0.7, y: 4.25, w: 3, h: 0.3,
    fontFace: F.body, fontSize: 11, color: C.lime, charSpacing: 3,
    align: "left", valign: "top",
  });
  s.addText("The Third\nDimension.", {
    x: 0.7, y: 4.6, w: 8, h: 2.2,
    fontFace: F.display, fontSize: 54, color: C.cream, bold: false,
    charSpacing: -1, align: "left", valign: "top", lineSpacingMultiple: 1.0,
  });

  s.addText('"For a hundred years we moved in two axes. The sky is the next one."', {
    x: 9.5, y: 5.4, w: 3.3, h: 1.6,
    fontFace: F.display, fontSize: 16, color: C.cream, italic: true,
    align: "right", valign: "top", lineSpacingMultiple: 1.3,
  });
}

// ===========================================================================
//  SLIDE 14 — EVTOL EXPLAINED
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTopBar(s, "14 · III. THE THIRD DIMENSION");
  addBottomBar(s, 14, "III · THE THIRD DIMENSION");

  addEyebrow(s, "EVTOL, EXPLAINED", 0.7, 1.2, 5);

  s.addText("A helicopter, minus the noise, carbon, and crashes.", {
    x: 0.7, y: 1.55, w: 12, h: 1.8,
    fontFace: F.display, fontSize: 38, color: C.ink, bold: false,
    charSpacing: -1, align: "left", valign: "top",
  });

  // eVTOL diagram
  s.addImage({ path: "./images/image-14-1.png", x: 0.7, y: 3.8, w: 5.6, h: 2.4 });

  // Right body
  s.addText(
    "Distributed electric propulsion — many small rotors, not one big one — makes aircraft quiet, simple, and redundant. That changes everything about where they can land.",
    {
      x: 7.1, y: 3.55, w: 5.5, h: 1.8,
      fontFace: F.body, fontSize: 13, color: C.inkMute,
      align: "left", valign: "top", lineSpacingMultiple: 1.35,
    }
  );

  // 2x2 stats grid
  const stats = [
    { lab: "NOISE",         big: "–100×",      sub: "vs. helicopter"       },
    { lab: "EMISSIONS",     big: "0",          sub: "at the vehicle"       },
    { lab: "RANGE",         big: "100–250 mi", sub: "per charge"           },
    { lab: "MOVING PARTS",  big: "~10×",       sub: "fewer than helicopter"},
  ];
  stats.forEach((st, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 7.1 + col * 2.8;
    const y = 5.55 + row * 0.7;

    s.addText(st.lab, {
      x, y, w: 2.6, h: 0.22,
      fontFace: F.body, fontSize: 9, color: C.inkFaint, charSpacing: 2,
      align: "left", valign: "top",
    });
    s.addText(st.big, {
      x, y: y + 0.2, w: 2.0, h: 0.4,
      fontFace: F.display, fontSize: 18, color: C.ink, bold: false,
      align: "left", valign: "top",
    });
    s.addText(st.sub, {
      x: x + 1.55, y: y + 0.28, w: 1.1, h: 0.3,
      fontFace: F.body, fontSize: 9, color: C.inkMute,
      align: "left", valign: "top",
    });
  });
}

// ===========================================================================
//  SLIDE 15 — THE VERTIPORT NETWORK (image bg, 3 columns)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.ink };

  s.addImage({ path: "./images/image-15-1.jpeg", x: 0, y: 0, w: W, h: H, sizing: { type: "cover", w: W, h: H } });
  s.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: W, h: H,
    fill: { color: C.ink, transparency: 40 }, line: { type: "none" },
  });

  addTopBar(s, "15 · III. THE THIRD DIMENSION", "THE FUTURE OF MOBILITY", true);
  addBottomBar(s, 15, "III · THE THIRD DIMENSION", true);

  addEyebrow(s, "THE VERTIPORT NETWORK", 0.7, 0.8, 5, C.lime);

  s.addText("The airport shrinks to a rooftop.", {
    x: 0.7, y: 1.15, w: 10, h: 1.8,
    fontFace: F.display, fontSize: 44, color: C.cream, bold: false,
    charSpacing: -1, align: "left", valign: "top",
  });

  const cols = [
    { lab: "FOOTPRINT", title: "A basketball court.",            body: "Commercial vertiports need ~1/100th the land of a regional airport. A rooftop or parking-garage deck is enough." },
    { lab: "TRIP",      title: "Manhattan → JFK in 7 minutes.",  body: "The same ride that takes 60+ minutes by road. Time, priced in dollars, finally becomes a commodity you can buy back." },
    { lab: "PRICE",     title: "Helicopter today. Taxi by 2035.",body: "Launch pricing is luxury. Scale, electrification, and autonomy collapse per-seat cost by an order of magnitude." },
  ];
  const colW = 3.85;
  const gap = 0.15;
  const startX = 0.7;
  const topY = 4.0;

  cols.forEach((c, i) => {
    const cx = startX + i * (colW + gap);

    s.addShape(pres.ShapeType.line, {
      x: cx, y: topY, w: colW, h: 0,
      line: { color: C.cream, width: 0.5 },
    });

    s.addText(c.lab, {
      x: cx, y: topY + 0.1, w: colW, h: 0.3,
      fontFace: F.body, fontSize: 10, color: C.lime, charSpacing: 2,
      align: "left", valign: "top",
    });

    s.addText(c.title, {
      x: cx, y: topY + 0.45, w: colW, h: 1.3,
      fontFace: F.display, fontSize: 22, color: C.cream, italic: true,
      charSpacing: -0.3, align: "left", valign: "top", lineSpacingMultiple: 1.15,
    });

    s.addText(c.body, {
      x: cx, y: topY + 1.75, w: colW, h: 1.5,
      fontFace: F.body, fontSize: 12, color: C.cream,
      align: "left", valign: "top", lineSpacingMultiple: 1.35,
    });
  });
}

// ===========================================================================
//  SLIDE 16 — A DAY IN 2040 (itinerary)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTopBar(s, "16 · SYNTHESIS");
  addBottomBar(s, 16, "SYNTHESIS");

  addEyebrow(s, "A DAY IN 2040", 0.7, 1.25, 4);

  s.addText("Three modes, one journey, no one behind the wheel.", {
    x: 0.7, y: 1.6, w: 12, h: 1.8,
    fontFace: F.display, fontSize: 38, color: C.ink, bold: false,
    charSpacing: -1, align: "left", valign: "top",
  });

  const stops = [
    { time: "07:42", title: "e-Bike to the corner.",     body: "Rented, picked up from the rack. 4 minutes, $0.60.",  dot: C.ink },
    { time: "07:48", title: "Robotaxi across town.",     body: "Shared, electric, no driver. 22 minutes, $3.80.",      dot: C.ink },
    { time: "08:14", title: "eVTOL to the airport.",     body: "Rooftop to rooftop. 7 minutes, $42.",                  dot: C.red },
    { time: "08:26", title: "Electric regional jet.",    body: "300 miles, zero emissions, airline seat.",            dot: C.ink },
  ];

  const colW = 2.9;
  const gap = 0.15;
  const startX = 0.7;
  const topY = 4.1;

  stops.forEach((st, i) => {
    const cx = startX + i * (colW + gap);

    // dot + time
    s.addShape(pres.ShapeType.ellipse, {
      x: cx, y: topY + 0.02, w: 0.22, h: 0.22,
      fill: { color: st.dot }, line: { type: "none" },
    });
    s.addText(st.time, {
      x: cx + 0.35, y: topY, w: 2.0, h: 0.3,
      fontFace: F.body, fontSize: 11, color: st.dot, charSpacing: 1,
      align: "left", valign: "top",
    });

    // Horizontal line under time
    s.addShape(pres.ShapeType.line, {
      x: cx, y: topY + 0.45, w: colW, h: 0,
      line: { color: C.ink, width: 0.75 },
    });

    // Title italic
    s.addText(st.title, {
      x: cx, y: topY + 0.6, w: colW, h: 0.55,
      fontFace: F.display, fontSize: 19, color: C.ink, italic: true,
      charSpacing: -0.3, align: "left", valign: "top",
    });

    s.addText(st.body, {
      x: cx, y: topY + 1.2, w: colW, h: 1.2,
      fontFace: F.body, fontSize: 12, color: C.inkMute,
      align: "left", valign: "top", lineSpacingMultiple: 1.35,
    });
  });

  // Bottom summary bar
  s.addShape(pres.ShapeType.line, {
    x: 0.7, y: 6.25, w: 12.0, h: 0,
    line: { color: C.inkFaint, width: 0.5 },
  });
  s.addText("DOOR TO GATE", {
    x: 0.7, y: 6.35, w: 3, h: 0.3,
    fontFace: F.body, fontSize: 10, color: C.inkFaint, charSpacing: 2,
    align: "left", valign: "top",
  });
  s.addText(
    [
      { text: "44 minutes · $46.40 · ",        options: { color: C.ink,  italic: true } },
      { text: "no parking, no car, no keys",   options: { color: C.red,  italic: true } },
    ],
    {
      x: 4.5, y: 6.35, w: 8.2, h: 0.55,
      fontFace: F.display, fontSize: 22,
      align: "right", valign: "top",
    }
  );
}

// ===========================================================================
//  SLIDE 17 — SECOND ORDER EFFECTS (2x3 grid)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTopBar(s, "17 · SYNTHESIS");
  addBottomBar(s, 17, "SYNTHESIS");

  addEyebrow(s, "SECOND-ORDER EFFECTS", 0.7, 1.2, 5);

  s.addText("The mobility stack reshapes what sits on top of it.", {
    x: 0.7, y: 1.55, w: 12, h: 1.5,
    fontFace: F.display, fontSize: 32, color: C.ink, bold: false,
    charSpacing: -1, align: "left", valign: "top",
  });

  const items = [
    { lab: "CITIES",       title: "Parking disappears. Streets become rooms.",    body: "30% of urban land is currently used to store idle cars. Robotaxis and shared fleets return it to housing, parks, commerce." },
    { lab: "ENERGY",       title: "Oil demand peaks. The grid gets a co-pilot.",  body: "Road transport is 45% of oil. Electrified, it shifts to a grid that EVs themselves help stabilize." },
    { lab: "GEOGRAPHY",    title: "The commute stretches. Proximity loosens.",    body: 'A 100-mile eVTOL hop in 30 minutes redraws what "near" means. Housing, labor, and real estate all reprice.' },
    { lab: "LABOR",        title: "10M driving jobs transition over 20 years.",   body: "The largest occupation in many U.S. states. The policy question of the decade." },
    { lab: "SUPPLY CHAIN", title: "Lithium is the new barrel.",                    body: "A new map of resource geopolitics: copper, nickel, cobalt, rare earths." },
    { lab: "SAFETY",       title: "1.2M road deaths a year is not a fact of life.",body: "94% of crashes involve human error. Autonomy is a public-health intervention." },
  ];

  const colW = 3.85;
  const rowH = 1.55;
  const gapX = 0.15;
  const gapY = 0.2;
  const startX = 0.7;
  const startY = 3.35;

  items.forEach((it, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const cx = startX + col * (colW + gapX);
    const cy = startY + row * (rowH + gapY);

    // Divider
    s.addShape(pres.ShapeType.line, {
      x: cx, y: cy, w: colW, h: 0,
      line: { color: C.ink, width: 0.75 },
    });

    s.addText(it.lab, {
      x: cx, y: cy + 0.08, w: colW, h: 0.26,
      fontFace: F.body, fontSize: 9, color: C.inkFaint, charSpacing: 2,
      align: "left", valign: "top",
    });

    s.addText(it.title, {
      x: cx, y: cy + 0.34, w: colW, h: 0.65,
      fontFace: F.display, fontSize: 15, color: C.ink, italic: true,
      charSpacing: -0.3, align: "left", valign: "top", lineSpacingMultiple: 1.15,
    });

    s.addText(it.body, {
      x: cx, y: cy + 0.95, w: colW, h: 0.6,
      fontFace: F.body, fontSize: 9.5, color: C.inkMute,
      align: "left", valign: "top", lineSpacingMultiple: 1.3,
    });
  });
}

// ===========================================================================
//  SLIDE 18 — CLOSING (lime background, huge headline)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.lime };

  // Top bar
  s.addText("CLOSING", {
    x: 0.5, y: 0.25, w: 6, h: 0.3,
    fontFace: F.body, fontSize: 9, color: C.ink, charSpacing: 2,
    align: "left", valign: "middle",
  });
  s.addText("THE FUTURE OF MOBILITY", {
    x: W - 6.5, y: 0.25, w: 6, h: 0.3,
    fontFace: F.body, fontSize: 9, color: C.ink, charSpacing: 2,
    align: "right", valign: "middle",
  });

  // Massive headline — multi-line with italic "will be quiet"
  s.addText(
    [
      { text: "The revolution ",      options: { color: C.ink } },
      { text: "will be quiet,",       options: { color: C.ink, italic: true } },
      { text: " electric,\nand overhead.", options: { color: C.ink } },
    ],
    {
      x: 0.7, y: 1.1, w: 12.0, h: 4.4,
      fontFace: F.display, fontSize: 72, bold: false,
      charSpacing: -2, align: "left", valign: "top", lineSpacingMultiple: 1.05,
    }
  );

  // Divider
  s.addShape(pres.ShapeType.line, {
    x: 0.7, y: 5.85, w: 12.0, h: 0,
    line: { color: C.ink, width: 0.75 },
  });

  // Bottom body
  s.addText(
    "The car didn't kill the horse in a single year. It did so in twenty — then the century rearranged itself around it. We are, right now, in year three.",
    {
      x: 0.7, y: 6.05, w: 6.2, h: 1.2,
      fontFace: F.body, fontSize: 13, color: C.ink,
      align: "left", valign: "top", lineSpacingMultiple: 1.35,
    }
  );

  // Right-side "THANK YOU" + "Questions →"
  s.addText("THANK YOU.", {
    x: W - 4.5, y: 6.05, w: 4, h: 0.3,
    fontFace: F.body, fontSize: 10, color: C.ink, charSpacing: 3,
    align: "right", valign: "top",
  });
  s.addText("Questions →", {
    x: W - 4.5, y: 6.42, w: 4, h: 0.6,
    fontFace: F.display, fontSize: 24, color: C.ink, italic: true,
    align: "right", valign: "top",
  });

  // Bottom bar
  s.addText("18 / 18", {
    x: 0.5, y: H - 0.45, w: 3, h: 0.3,
    fontFace: F.body, fontSize: 9, color: C.ink,
    align: "left", valign: "middle",
  });
  s.addText("— FIN —", {
    x: W - 6.5, y: H - 0.45, w: 6, h: 0.3,
    fontFace: F.body, fontSize: 9, color: C.ink, charSpacing: 2,
    align: "right", valign: "middle",
  });
}

// ---------------------------------------------------------------------------
//  EXPORT
// ---------------------------------------------------------------------------
pres.writeFile({ fileName: "future_of_mobility.pptx" })
    .then((fn) => console.log(`✓ Wrote ${fn}`));
