/**
 * Oklo Investment Memo — PPTX recreation via pptxgenjs
 *
 * Recreates the 10-slide NK Ventures / Clean Energy Practice investor memo.
 * Source layout is 20" x 11.25" (2x scale of LAYOUT_WIDE). We use LAYOUT_WIDE
 * (13.333" x 7.5") and scale every source coordinate by 2/3.
 *
 * Run:  node oklo_memo.js
 */

const pptxgen = require("pptxgenjs");

// ---------- Palette ----------
const BG          = "0F0F0F";   // slide background (near-black)
const CARD        = "1C1C1C";   // card fill
const CARD_ALT    = "2A2A2A";   // lighter card fill
const ORANGE      = "D65A2A";   // accent orange
const ORANGE_DK   = "6A2C14";   // dark orange (fills / muted accents)
const CREAM       = "E9E6DF";   // primary text
const WARM        = "9A9690";   // secondary / body text
const DIM         = "6B6864";   // labels / footer text
const LINE        = "3A3A3A";   // rule lines

// ---------- Fonts ----------
const MONO = "Consolas";     // metadata, labels, numbers
const SERIF_BODY = "Calibri"; // body + headings (sans — deck uses clean sans)
const DISPLAY = "Calibri";

// ---------- Scale source 20x11.25 -> 13.333x7.5 ----------
const S = 2 / 3;
const x = v => +(v * S).toFixed(3);
const y = v => +(v * S).toFixed(3);
const w = v => +(v * S).toFixed(3);
const h = v => +(v * S).toFixed(3);
// Font size also scales
const fs = v => Math.max(5, +(v * S).toFixed(1));

// ---------- Setup ----------
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = "Oklo Investment Memo";
pres.author = "NK Ventures / Clean Energy Practice";

// Default slide background
function newSlide() {
  const s = pres.addSlide();
  s.background = { color: BG };
  return s;
}

// ---------- Helpers ----------
function sectionTag(slide, num, label) {
  // "01 / MACRO" style
  slide.addText(
    [
      { text: `${num} / `, options: { color: ORANGE, bold: false } },
      { text: label,       options: { color: ORANGE, bold: false } },
    ],
    {
      x: x(1.15), y: y(1.04), w: w(18.24), h: h(0.34),
      fontFace: MONO, fontSize: fs(14), charSpacing: 2,
      margin: 0, valign: "top",
    }
  );
}

function footer(slide, label, page) {
  slide.addText("NK VENTURES / OKLO INVESTMENT MEMO", {
    x: x(1.15), y: y(10.80), w: w(4.32), h: h(0.23),
    fontFace: MONO, fontSize: fs(10), color: DIM, charSpacing: 1,
    margin: 0,
  });
  slide.addText(label, {
    x: x(8.5), y: y(10.80), w: w(3.0), h: h(0.23),
    fontFace: MONO, fontSize: fs(10), color: DIM, charSpacing: 1,
    align: "center", margin: 0,
  });
  slide.addText(page, {
    x: x(17.99), y: y(10.80), w: w(0.95), h: h(0.23),
    fontFace: MONO, fontSize: fs(10), color: DIM, charSpacing: 1,
    align: "right", margin: 0,
  });
}

function bigTitle(slide, text, fsPt = 44) {
  slide.addText(text, {
    x: x(1.15), y: y(1.68), w: w(18.24), h: h(0.9),
    fontFace: DISPLAY, fontSize: fs(fsPt), color: CREAM,
    bold: false, margin: 0, valign: "top",
  });
}

function subtitle(slide, text, yPos = 2.63, hPos = 1.14) {
  slide.addText(text, {
    x: x(1.15), y: y(yPos), w: w(16.09), h: h(hPos),
    fontFace: SERIF_BODY, fontSize: fs(22), color: WARM,
    margin: 0, valign: "top",
  });
}

// ================================================================
// SLIDE 1 — TITLE
// ================================================================
(function slide1() {
  const s = newSlide();

  // Top header row — brand / meta
  s.addText("NK VENTURES / CLEAN ENERGY PRACTICE", {
    x: x(1.15), y: y(1.04), w: w(10), h: h(0.26),
    fontFace: MONO, fontSize: fs(12), color: CREAM, charSpacing: 2,
    margin: 0,
  });
  s.addText("Q2 2026 / IC MEMO", {
    x: x(13.5), y: y(1.04), w: w(5.43), h: h(0.26),
    fontFace: MONO, fontSize: fs(12), color: CREAM, charSpacing: 2,
    align: "right", margin: 0,
  });

  // Ticker / action line — orange
  s.addText("NYSE : OKLO ———— INITIATE BUY", {
    x: x(1.15), y: y(1.26), w: w(18.24), h: h(0.30),
    fontFace: MONO, fontSize: fs(14), color: ORANGE, bold: true, charSpacing: 2,
    margin: 0,
  });

  // Oklo.
  s.addText("Oklo.", {
    x: x(1.15), y: y(1.97), w: w(18.24), h: h(1.96),
    fontFace: DISPLAY, fontSize: fs(110), color: CREAM,
    bold: false, margin: 0, valign: "top",
  });

  // Tagline
  s.addText(
    "A pure-play bet on sovereign, 24/7 base load power — the missing half of the clean energy transition.",
    {
      x: x(1.15), y: y(4.27), w: w(13.95), h: h(1.19),
      fontFace: SERIF_BODY, fontSize: fs(28), color: CREAM,
      margin: 0, valign: "top",
    }
  );

  // Prepared by
  s.addText("PREPARED BY WILLIAM / APRIL 2026", {
    x: x(1.15), y: y(5.41), w: w(8), h: h(0.26),
    fontFace: MONO, fontSize: fs(11), color: DIM, charSpacing: 2,
    margin: 0,
  });

  // Right-bottom: short rule + tag
  s.addShape(pres.shapes.LINE, {
    x: x(14.41), y: y(5.52), w: w(0.38), h: 0,
    line: { color: ORANGE, width: 1.5 },
  });
  s.addText("PARTNERS PRESENTATION · ~10 MIN", {
    x: x(14.93), y: y(5.43), w: w(5), h: h(0.23),
    fontFace: MONO, fontSize: fs(11), color: DIM, charSpacing: 2,
    margin: 0,
  });

})();

// ================================================================
// SLIDE 2 — MACRO
// ================================================================
(function slide2() {
  const s = newSlide();
  sectionTag(s, "01", "MACRO");

  // Headline with colored spans
  s.addText(
    [
      { text: "Renewables solved ", options: { color: CREAM } },
      { text: "daytime.",           options: { color: WARM } },
      { text: " Base load is the ", options: { color: CREAM } },
      { text: "unsolved half.",     options: { color: ORANGE } },
    ],
    {
      x: x(1.15), y: y(1.68), w: w(15.02), h: h(1.44),
      fontFace: DISPLAY, fontSize: fs(44), color: CREAM,
      margin: 0, valign: "top",
    }
  );

  // Chart area — draw a schematic "grid demand" (white curve) + "solar supply" (orange filled arc)
  // Coordinates in source coords: x 1.15 -> 18.86, y 3.83 -> 7.79 (width 17.71, height 3.96)
  const cx0 = 1.15, cy0 = 3.83, cw = 17.71, ch = 3.96;
  const chartX = x(cx0), chartY = y(cy0), chartW = w(cw), chartH = h(ch);

  // baseline
  s.addShape(pres.shapes.LINE, {
    x: chartX, y: chartY + chartH, w: chartW, h: 0,
    line: { color: LINE, width: 0.75 },
  });

  // Grid-demand curve: approximate a broad plateau (white) using a LINE chart
  const hours = Array.from({ length: 24 }, (_, i) => i); // 0..23
  // Smooth demand: low at night, peak around 18:00
  const demand = hours.map(hr => {
    const base = 0.35;
    const morning = 0.25 * Math.exp(-Math.pow((hr - 9)/4, 2));
    const evening = 0.55 * Math.exp(-Math.pow((hr - 19)/3, 2));
    return base + morning + evening;
  });
  // Solar: bell centered at 12
  const solar = hours.map(hr => Math.max(0, Math.exp(-Math.pow((hr - 12)/3.6, 2)) - 0.02));

  // Use pptxgenjs native LINE + AREA overlay via an overlaid chart
  // Build two series for a combo chart
  s.addChart(
    [
      {
        type: pres.charts.AREA,
        data: [{ name: "Solar Supply", labels: hours.map(String), values: solar.map(v => +v.toFixed(3)) }],
        options: { chartColors: [ORANGE], barGrouping: "standard" },
      },
      {
        type: pres.charts.LINE,
        data: [{ name: "Grid Demand", labels: hours.map(String), values: demand.map(v => +v.toFixed(3)) }],
        options: { chartColors: [CREAM], lineSize: 2.5, lineSmooth: true },
      },
    ],
    {
      x: chartX, y: chartY, w: chartW, h: chartH,
      chartArea: { fill: { color: BG }, border: { color: BG, pt: 0 } },
      plotArea:  { fill: { color: BG } },
      showLegend: false,
      showTitle: false,
      catAxisLabelColor: DIM, catAxisLabelFontFace: MONO, catAxisLabelFontSize: fs(9),
      valAxisHidden: true,
      valGridLine: { style: "none" },
      catGridLine: { style: "none" },
      catAxisLineColor: LINE,
      catAxisLabelFormatCode: "General",
      lineDataSymbol: "none",
    }
  );

  // "BASE LOAD GAP" callout — short vertical tick on the right dusk side
  s.addShape(pres.shapes.LINE, {
    x: x(14.4), y: y(5.4), w: 0, h: h(1.8),
    line: { color: ORANGE, width: 1, dashType: "dash" },
  });
  s.addText("BASE LOAD GAP", {
    x: x(14.65), y: y(5.7), w: w(2.5), h: h(0.3),
    fontFace: MONO, fontSize: fs(10), color: ORANGE, charSpacing: 1,
    margin: 0,
  });

  // Bottom 3-column legend + descriptions
  // Col 1 — GRID DEMAND (white line marker)
  s.addShape(pres.shapes.LINE, {
    x: x(1.15), y: y(8.40), w: w(0.29), h: 0,
    line: { color: CREAM, width: 2 },
  });
  s.addText("GRID DEMAND", {
    x: x(1.58), y: y(8.29), w: w(4), h: h(0.26),
    fontFace: MONO, fontSize: fs(11), color: CREAM, charSpacing: 2, margin: 0,
  });
  s.addText(
    "Continuous — peaks at dusk when data centers, EVs and HVAC run hardest.",
    {
      x: x(1.15), y: y(8.62), w: w(5.74), h: h(1.2),
      fontFace: SERIF_BODY, fontSize: fs(16), color: WARM, margin: 0, valign: "top",
    }
  );

  // Col 2 — SOLAR SUPPLY (orange swatch)
  s.addShape(pres.shapes.RECTANGLE, {
    x: x(7.22), y: y(8.33), w: w(0.29), h: h(0.12),
    fill: { color: ORANGE }, line: { color: ORANGE, width: 0 },
  });
  s.addText("SOLAR SUPPLY", {
    x: x(7.65), y: y(8.29), w: w(4), h: h(0.26),
    fontFace: MONO, fontSize: fs(11), color: CREAM, charSpacing: 2, margin: 0,
  });
  s.addText(
    "Abundant at noon, absent when the grid needs it most. Storage helps — it does not replace base load.",
    {
      x: x(7.22), y: y(8.62), w: w(5.74), h: h(1.5),
      fontFace: SERIF_BODY, fontSize: fs(16), color: WARM, margin: 0, valign: "top",
    }
  );

  // Col 3 — THE WEDGE (orange outlined pill)
  s.addShape(pres.shapes.RECTANGLE, {
    x: x(13.28), y: y(8.29), w: w(1.42), h: h(0.34),
    fill: { color: BG }, line: { color: ORANGE, width: 1 },
  });
  s.addText("THE WEDGE", {
    x: x(13.28), y: y(8.29), w: w(1.42), h: h(0.34),
    fontFace: MONO, fontSize: fs(10), color: ORANGE, charSpacing: 2,
    align: "center", valign: "middle", margin: 0,
  });
  s.addText(
    "Fission is the only carbon-free, dispatchable, siteable source at scale. Everything else requires storage arbitrage or emissions.",
    {
      x: x(13.28), y: y(8.75), w: w(5.74), h: h(1.9),
      fontFace: SERIF_BODY, fontSize: fs(16), color: WARM, margin: 0, valign: "top",
    }
  );

  footer(s, "MACRO", "02 / 10");
})();

// ================================================================
// SLIDE 3 — COMPANY SNAPSHOT
// ================================================================
(function slide3() {
  const s = newSlide();
  sectionTag(s, "02", "COMPANY");
  bigTitle(s, "Company snapshot.");

  // Tighter row layout to fit within 11.25" source canvas.
  // Rows start at 3.13 and compress to finish at ~10.35. Row pitch = 0.80.
  const rowYs = [3.13, 3.93, 4.73, 5.53, 6.33, 7.13, 7.93, 8.73, 9.53];
  const cardL_x = x(1.15), cardL_y = y(3.13), cardL_w = w(9.84), cardL_h = h(7.2);
  s.addShape(pres.shapes.RECTANGLE, {
    x: cardL_x, y: cardL_y, w: cardL_w, h: cardL_h,
    fill: { color: CARD }, line: { color: LINE, width: 0.5 },
  });

  const rowData = [
    { k: "TICKER",            v: "NYSE : OKLO" },
    { k: "HEADQUARTERS",      v: "Santa Clara, CA" },
    { k: "FOUNDED",           v: "2013 (as UPower Technologies)" },
    { k: "PUBLIC VIA",        v: "SPAC merger with AltC Acquisition Corp / May 9, 2024" },
    { k: "BUSINESS MODEL",    v: "Build-own-operate — sells electricity under long-term PPAs" },
    { k: "FLAGSHIP PRODUCT",  v: "Aurora Powerhouse · 15 – 75 MWe fast microreactor" },
    { k: "FUEL",              v: "HALEU metallic fuel · 10+ year refueling cycle" },
    { k: "STAGE",             v: "Pre-revenue · NRC combined license application in progress" },
    { k: "CUSTOMER PIPELINE", v: "~2,100 MW of signed non-binding letters of intent" },
  ];

  // row separators between rows
  rowYs.slice(1).forEach(yy => {
    s.addShape(pres.shapes.LINE, {
      x: x(1.16), y: y(yy), w: w(9.82), h: 0,
      line: { color: LINE, width: 0.5 },
    });
  });

  rowData.forEach((r, i) => {
    const yy = rowYs[i] + 0.28;
    s.addText(r.k, {
      x: x(1.45), y: y(yy), w: w(2.79), h: h(0.24),
      fontFace: MONO, fontSize: fs(10), color: DIM, charSpacing: 2,
      margin: 0, valign: "top",
    });
    s.addText(r.v, {
      x: x(4.49), y: y(yy - 0.05), w: w(5.40), h: h(0.7),
      fontFace: SERIF_BODY, fontSize: fs(14), color: CREAM,
      margin: 0, valign: "top",
    });
  });

  // Right column — image placeholder card (taller, balances left card)
  const cardR_x = x(11.82), cardR_y = y(3.13), cardR_w = w(7.03), cardR_h = h(4.8);
  s.addShape(pres.shapes.RECTANGLE, {
    x: cardR_x, y: cardR_y, w: cardR_w, h: cardR_h,
    fill: { color: CARD_ALT }, line: { color: LINE, width: 0.5 },
  });
  s.addText("AURORA POWERHOUSE RENDERING / PRODUCT SHOT", {
    x: cardR_x, y: cardR_y, w: cardR_w, h: cardR_h,
    fontFace: MONO, fontSize: fs(11), color: DIM, charSpacing: 2,
    align: "center", valign: "middle", margin: 0,
  });

  // Right column — pitch card directly under image
  const pitchX = x(11.82), pitchY = y(8.1), pitchW = w(7.03), pitchH = h(2.23);
  s.addShape(pres.shapes.RECTANGLE, {
    x: pitchX, y: pitchY, w: pitchW, h: pitchH,
    fill: { color: ORANGE_DK }, line: { color: ORANGE_DK, width: 0 },
  });
  s.addText("THE PITCH IN ONE LINE", {
    x: x(12.17), y: y(8.35), w: w(6.53), h: h(0.23),
    fontFace: MONO, fontSize: fs(10), color: ORANGE, charSpacing: 2,
    margin: 0,
  });
  s.addText(
    "Oklo sells 24/7 clean electricity under 20-year contracts — not reactors. It is the only listed pure-play on this business model.",
    {
      x: x(12.17), y: y(8.72), w: w(6.53), h: h(1.55),
      fontFace: SERIF_BODY, fontSize: fs(14), color: CREAM, margin: 0, valign: "top",
    }
  );

  footer(s, "COMPANY", "03 / 10");
})();

// ================================================================
// SLIDE 4 — TECHNOLOGY
// ================================================================
(function slide4() {
  const s = newSlide();
  sectionTag(s, "03", "TECHNOLOGY");
  bigTitle(s, "The Aurora Powerhouse.");
  subtitle(s,
    "A liquid-metal-cooled fast microreactor designed from day one to be factory-built, truck-shipped, and operated autonomously."
  );

  // Left: diagram placeholder
  s.addShape(pres.shapes.RECTANGLE, {
    x: x(1.15), y: y(4.48), w: w(8.88), h: h(6.06),
    fill: { color: CARD }, line: { color: LINE, width: 0.5 },
  });
  s.addText("AURORA CUTAWAY DIAGRAM CORE / COOLANT LOOP / POWERHOUSE SHELL", {
    x: x(1.27), y: y(4.74), w: w(8.63), h: h(5.58),
    fontFace: MONO, fontSize: fs(11), color: DIM, charSpacing: 2,
    align: "center", valign: "middle", margin: 0,
  });

  // Right: 2x2 stat grid
  const statCell = (cx, cy, big, unit, label) => {
    s.addShape(pres.shapes.LINE, {
      x: x(cx), y: y(cy), w: w(3.87), h: 0,
      line: { color: LINE, width: 0.5 },
    });
    s.addText(big, {
      x: x(cx), y: y(cy + 0.22), w: w(2.5), h: h(0.8),
      fontFace: DISPLAY, fontSize: fs(52), color: CREAM, margin: 0, valign: "top",
    });
    s.addText(unit, {
      x: x(cx + 2.45), y: y(cy + 0.58), w: w(1.2), h: h(0.38),
      fontFace: SERIF_BODY, fontSize: fs(18), color: WARM, margin: 0, valign: "top",
    });
    s.addText(label, {
      x: x(cx), y: y(cy + 1.07), w: w(3.99), h: h(0.22),
      fontFace: MONO, fontSize: fs(10), color: DIM, charSpacing: 2, margin: 0,
    });
  };

  statCell(10.78, 4.48, "15 – 75", "MWe",  "PER UNIT OUTPUT");
  statCell(14.98, 4.48, "10+",     "yrs",  "BETWEEN REFUELING");
  statCell(10.78, 6.06, "<2",      "acres","SITE FOOTPRINT");
  // HALEU doesn't get a unit — it IS the value
  s.addShape(pres.shapes.LINE, {
    x: x(14.98), y: y(6.06), w: w(3.87), h: 0,
    line: { color: LINE, width: 0.5 },
  });
  s.addText("HALEU", {
    x: x(14.98), y: y(6.28), w: w(3), h: h(0.79),
    fontFace: DISPLAY, fontSize: fs(48), color: CREAM, margin: 0, valign: "top",
  });
  s.addText("METALLIC FUEL", {
    x: x(14.98), y: y(7.13), w: w(3.99), h: h(0.22),
    fontFace: MONO, fontSize: fs(10), color: DIM, charSpacing: 2, margin: 0,
  });

  // "WHY IT'S DIFFERENTIATED" header
  s.addText("WHY IT'S DIFFERENTIATED", {
    x: x(10.78), y: y(7.73), w: w(8.32), h: h(0.23),
    fontFace: MONO, fontSize: fs(11), color: ORANGE, charSpacing: 2, margin: 0,
  });

  // Three numbered rows
  const diffRow = (num, yy, bold, rest) => {
    s.addText(num, {
      x: x(10.78), y: y(yy), w: w(0.55), h: h(0.72),
      fontFace: MONO, fontSize: fs(14), color: ORANGE, bold: true, margin: 0, valign: "top",
    });
    s.addText(
      [
        { text: bold + " ", options: { color: CREAM, bold: true } },
        { text: rest,       options: { color: WARM  } },
      ],
      {
        x: x(11.4), y: y(yy), w: w(7.6), h: h(0.8),
        fontFace: SERIF_BODY, fontSize: fs(14), margin: 0, valign: "top",
      }
    );
  };
  diffRow("01", 8.13, "Passive safety.",    "No active pumps required for shutdown — physics, not software, cools the core.");
  diffRow("02", 8.99, "Factory economics.", "Small, repeatable units compress build time from ~10 yrs to 18–24 months.");
  diffRow("03", 9.86, "Siteable near load.","Footprint fits next to data centers, industrial parks, remote grids.");

  footer(s, "TECHNOLOGY", "04 / 10");
})();

// ================================================================
// SLIDE 5 — REGULATORY
// ================================================================
(function slide5() {
  const s = newSlide();
  sectionTag(s, "04", "REGULATORY");
  bigTitle(s, "Regulatory path: the work is visible.");
  subtitle(s,
    "Oklo is the only advanced reactor company with a full NRC licensing cycle behind it — including a public failure it has learned from."
  );

  // Timeline horizontal rule
  s.addShape(pres.shapes.LINE, {
    x: x(1.15), y: y(4.79), w: w(17.71), h: 0,
    line: { color: LINE, width: 0.75 },
  });

  const milestones = [
    { cx: 1.19, year: "2016",    title: "DOE site use permit",          body: "First private company to receive a site permit at Idaho National Laboratory.", filled: true  },
    { cx: 4.17, year: "2020",    title: "NRC docketed COLA",            body: "First advanced non-LWR combined license application accepted for review.",      filled: true  },
    { cx: 7.16, year: "JAN 2022",title: "COLA denied — without prejudice", body: "NRC cited information gaps; core technology not rejected. Refiling path laid out.", filled: true  },
    { cx: 10.15,year: "2024",    title: "Licensing Project Plan filed", body: "Pre-application work with NRC restarted; INL fuel agreements signed.",           filled: true  },
    { cx: 13.13,year: "2025",    title: "COLA refiled (Phase 1)",       body: "Aurora-INL target site, phased review to compress NRC timeline.",                filled: true  },
    { cx: 16.12,year: "2027E",   title: "First license issuance",       body: "Management target — positions first Powerhouse for 2027–2028 operation.",       filled: false },
  ];

  milestones.forEach(m => {
    // Dot — filled orange vs. outlined for future
    s.addShape(pres.shapes.OVAL, {
      x: x(m.cx), y: y(4.60), w: w(0.19), h: h(0.19),
      fill: { color: m.filled ? ORANGE : BG },
      line: { color: ORANGE, width: 1.25 },
    });
    // Year (orange if future)
    s.addText(m.year, {
      x: x(m.cx - 0.04), y: y(5.08), w: w(2.5), h: h(0.26),
      fontFace: MONO, fontSize: fs(11),
      color: m.filled ? WARM : ORANGE, charSpacing: 2,
      margin: 0,
    });
    // Title
    s.addText(m.title, {
      x: x(m.cx - 0.04), y: y(5.40), w: w(2.86), h: h(0.7),
      fontFace: SERIF_BODY, fontSize: fs(16), color: CREAM,
      margin: 0, valign: "top",
    });
    // Body
    s.addText(m.body, {
      x: x(m.cx - 0.04), y: y(6.15), w: w(2.86), h: h(1.6),
      fontFace: SERIF_BODY, fontSize: fs(12), color: WARM,
      margin: 0, valign: "top",
    });
  });

  // Read-through callout bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: x(1.15), y: y(7.99), w: w(17.71), h: h(1.39),
    fill: { color: CARD }, line: { color: LINE, width: 0.5 },
  });
  // READ-THROUGH pill
  s.addShape(pres.shapes.RECTANGLE, {
    x: x(1.53), y: y(8.51), w: w(1.79), h: h(0.34),
    fill: { color: BG }, line: { color: ORANGE, width: 1 },
  });
  s.addText("READ-THROUGH", {
    x: x(1.53), y: y(8.51), w: w(1.79), h: h(0.34),
    fontFace: MONO, fontSize: fs(10), color: ORANGE, charSpacing: 2,
    align: "center", valign: "middle", margin: 0,
  });
  // Body with colored span
  s.addText(
    [
      { text: "The 2022 denial forced Oklo to restructure its safety case earlier than any peer. It is now ",
        options: { color: CREAM } },
      { text: "two or more years ahead ", options: { color: ORANGE } },
      { text: "of other advanced-reactor applicants on documented NRC engagement.",
        options: { color: CREAM } },
    ],
    {
      x: x(3.82), y: y(8.29), w: w(15.08), h: h(1.0),
      fontFace: SERIF_BODY, fontSize: fs(16), margin: 0, valign: "middle",
    }
  );

  // footer (slide 5 has different y)
  s.addText("NK VENTURES / OKLO INVESTMENT MEMO", {
    x: x(1.15), y: y(9.64), w: w(4.32), h: h(0.23),
    fontFace: MONO, fontSize: fs(10), color: DIM, charSpacing: 1, margin: 0,
  });
  s.addText("REGULATORY", {
    x: x(11.05), y: y(9.64), w: w(1.32), h: h(0.23),
    fontFace: MONO, fontSize: fs(10), color: DIM, charSpacing: 1, margin: 0,
  });
  s.addText("05 / 10", {
    x: x(17.99), y: y(9.64), w: w(0.95), h: h(0.23),
    fontFace: MONO, fontSize: fs(10), color: DIM, charSpacing: 1, align: "right", margin: 0,
  });
})();

// ================================================================
// SLIDE 6 — FINANCIAL HISTORY (2x3 cards)
// ================================================================
(function slide6() {
  const s = newSlide();
  sectionTag(s, "05", "FINANCIALS");
  bigTitle(s, "Financial history — from MIT lab to NYSE.");

  const cards = [
    { cx: 1.15, cy: 3.13, year: "2013–2019",  title: "Seed & Series A",          body: "Founded by Jacob DeWitte and Caroline Cochran at MIT. Backed by Y Combinator, Cyan Banister, Mithril.", tag: "01 / 06" },
    { cx: 10.12,cy: 3.13, year: "2021",        title: "Series B",                 body: "~$25M raised; commercial scale-up and NRC filing funded.", tag: "02 / 06" },
    { cx: 1.15, cy: 5.54, year: "JUL 2023",    title: "AltC merger announced",    body: "Deal with Sam Altman-led AltC Acquisition Corp at ~$850M pro-forma equity value — a disciplined SPAC mark for the cycle.", tag: "03 / 06" },
    { cx: 10.12,cy: 5.54, year: "MAY 2024",    title: "Listing on NYSE",          body: "~$306M gross cash to balance sheet at close. Trades as OKLO.", tag: "04 / 06" },
    { cx: 1.15, cy: 7.95, year: "2024",        title: "Atomic Alchemy acquisition", body: "All-stock deal brings radioisotope + recycling capabilities in-house.", tag: "05 / 06" },
    { cx: 10.12,cy: 7.95, year: "2025",        title: "Commercial traction",      body: "LOI pipeline grows past 2,000 MW; data-center, defense and utility customers signed.", tag: "06 / 06" },
  ];

  cards.forEach(c => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: x(c.cx), y: y(c.cy), w: w(8.73), h: h(2.16),
      fill: { color: CARD }, line: { color: LINE, width: 0.5 },
    });
    // left accent line
    s.addShape(pres.shapes.RECTANGLE, {
      x: x(c.cx), y: y(c.cy), w: w(0.05), h: h(2.16),
      fill: { color: ORANGE }, line: { color: ORANGE, width: 0 },
    });
    // year
    s.addText(c.year, {
      x: x(c.cx + 0.38), y: y(c.cy + 0.34), w: w(3), h: h(0.26),
      fontFace: MONO, fontSize: fs(11), color: ORANGE, charSpacing: 2, margin: 0,
    });
    // tag (top right)
    s.addText(c.tag, {
      x: x(c.cx + 7.52), y: y(c.cy + 0.38), w: w(1.0), h: h(0.20),
      fontFace: MONO, fontSize: fs(9), color: DIM, charSpacing: 2, align: "right", margin: 0,
    });
    // title
    s.addText(c.title, {
      x: x(c.cx + 0.38), y: y(c.cy + 0.68), w: w(8.2), h: h(0.41),
      fontFace: SERIF_BODY, fontSize: fs(20), color: CREAM, margin: 0, valign: "top",
    });
    // body
    s.addText(c.body, {
      x: x(c.cx + 0.38), y: y(c.cy + 1.17), w: w(8.2), h: h(0.85),
      fontFace: SERIF_BODY, fontSize: fs(13), color: WARM, margin: 0, valign: "top",
    });
  });

  // footer
  s.addText("NK VENTURES / OKLO INVESTMENT MEMO", {
    x: x(1.15), y: y(10.37), w: w(4.32), h: h(0.23),
    fontFace: MONO, fontSize: fs(10), color: DIM, charSpacing: 1, margin: 0,
  });
  s.addText("FINANCIALS", {
    x: x(11.05), y: y(10.37), w: w(1.32), h: h(0.23),
    fontFace: MONO, fontSize: fs(10), color: DIM, charSpacing: 1, margin: 0,
  });
  s.addText("06 / 10", {
    x: x(17.99), y: y(10.37), w: w(0.95), h: h(0.23),
    fontFace: MONO, fontSize: fs(10), color: DIM, charSpacing: 1, align: "right", margin: 0,
  });
})();

// ================================================================
// SLIDE 7 — CAPITAL STRUCTURE
// ================================================================
(function slide7() {
  const s = newSlide();
  sectionTag(s, "06", "FINANCIALS");
  bigTitle(s, "Capital structure: funded to licensing, not to revenue.");

  // Left: 2x2 big-stat grid
  const statBig = (cx, cy, val, valColor, label, body) => {
    s.addText(val, {
      x: x(cx), y: y(cy), w: w(4.0), h: h(0.85),
      fontFace: DISPLAY, fontSize: fs(54), color: valColor, margin: 0, valign: "top",
    });
    s.addText(label, {
      x: x(cx), y: y(cy + 0.92), w: w(4.29), h: h(0.26),
      fontFace: MONO, fontSize: fs(10), color: DIM, charSpacing: 2, margin: 0,
    });
    s.addText(body, {
      x: x(cx), y: y(cy + 1.28), w: w(4.29), h: h(1.5),
      fontFace: SERIF_BODY, fontSize: fs(13), color: WARM, margin: 0, valign: "top",
    });
  };

  statBig(1.15, 3.13, "$275M+", CREAM,  "CASH & EQUIVALENTS",    "Post-merger balance with periodic ATM top-ups. Directional — refer to latest 10-Q.");
  statBig(5.82, 3.13, "Zero",   ORANGE, "LONG-TERM DEBT",        "Equity-funded through licensing; no near-term refinancing risk.");
  statBig(1.15, 6.10, "~$40M",  CREAM,  "ANNUAL OPERATING BURN", "Scales with NRC engagement and Aurora-INL site work.");
  statBig(5.82, 6.10, "~140M",  CREAM,  "SHARES OUTSTANDING",    "ATM + equity incentive dilution to be modeled each quarter.");

  // Bottom left — funding posture card (compressed to fit)
  s.addShape(pres.shapes.RECTANGLE, {
    x: x(1.15), y: y(8.60), w: w(8.84), h: h(1.90),
    fill: { color: ORANGE_DK }, line: { color: ORANGE_DK, width: 0 },
  });
  s.addText("FUNDING POSTURE", {
    x: x(1.49), y: y(8.80), w: w(8.40), h: h(0.23),
    fontFace: MONO, fontSize: fs(10), color: ORANGE, charSpacing: 2, margin: 0,
  });
  s.addText(
    "Current cash funds operations through the targeted NRC licensing milestone. Expect one further strategic raise — likely project-level, with a hyperscaler or utility anchor — before first Powerhouse revenue.",
    {
      x: x(1.49), y: y(9.12), w: w(8.40), h: h(1.40),
      fontFace: SERIF_BODY, fontSize: fs(12), color: CREAM, margin: 0, valign: "top",
    }
  );

  // Right: runway schematic
  s.addText("CASH RUNWAY VS. LICENSING MILESTONES", {
    x: x(10.82), y: y(3.13), w: w(8.28), h: h(0.23),
    fontFace: MONO, fontSize: fs(11), color: DIM, charSpacing: 2, margin: 0,
  });
  // outer frame
  s.addShape(pres.shapes.RECTANGLE, {
    x: x(10.82), y: y(3.60), w: w(8.04), h: h(4.50),
    fill: { color: BG }, line: { color: LINE, width: 0.5 },
  });

  const years = [
    { label: "2029", yy: 3.95 },
    { label: "2028", yy: 5.10 },
    { label: "2027", yy: 6.25 },
    { label: "2026", yy: 7.65 },
  ];
  years.forEach(yr => {
    s.addText(yr.label, {
      x: x(11.12), y: y(yr.yy), w: w(0.71), h: h(0.22),
      fontFace: MONO, fontSize: fs(10), color: DIM, charSpacing: 1, margin: 0,
    });
    s.addShape(pres.shapes.LINE, {
      x: x(11.91), y: y(yr.yy + 0.11), w: w(6.64), h: 0,
      line: { color: LINE, width: 0.5, dashType: "dash" },
    });
  });

  // First revenue diamond (2029 level)
  s.addShape(pres.shapes.DIAMOND, {
    x: x(12.18), y: y(4.35), w: w(0.22), h: h(0.22),
    fill: { color: BG }, line: { color: CREAM, width: 1.2 },
  });
  s.addText("FIRST REVENUE ★", {
    x: x(12.55), y: y(4.30), w: w(2.5), h: h(0.23),
    fontFace: MONO, fontSize: fs(10), color: CREAM, charSpacing: 2, margin: 0,
  });

  // Projected raise marker (2028)
  s.addShape(pres.shapes.RECTANGLE, {
    x: x(12.00), y: y(5.45), w: w(0.7), h: h(0.05),
    fill: { color: ORANGE }, line: { color: ORANGE, width: 0 },
  });
  s.addText("PROJECTED RAISE", {
    x: x(12.91), y: y(5.37), w: w(2.5), h: h(0.23),
    fontFace: MONO, fontSize: fs(10), color: ORANGE, charSpacing: 2, margin: 0,
  });

  // Current cash bar (from ~2026 up through ~2027)
  s.addShape(pres.shapes.RECTANGLE, {
    x: x(11.87), y: y(5.90), w: w(0.83), h: h(1.80),
    fill: { color: ORANGE }, line: { color: ORANGE, width: 0 },
  });
  s.addText("CURRENT CASH", {
    x: x(12.91), y: y(6.40), w: w(2.5), h: h(0.22),
    fontFace: MONO, fontSize: fs(10), color: CREAM, charSpacing: 2, margin: 0,
  });

  // schematic caption
  s.addText("Directional schematic · figures subject to quarterly update", {
    x: x(10.82), y: y(8.25), w: w(8.28), h: h(0.30),
    fontFace: MONO, fontSize: fs(9), color: DIM, charSpacing: 1, margin: 0,
  });

  footer(s, "FINANCIALS", "07 / 10");
})();

// ================================================================
// SLIDE 8 — PEOPLE
// ================================================================
(function slide8() {
  const s = newSlide();
  sectionTag(s, "07", "PEOPLE");
  bigTitle(s, "Leadership & board.");
  subtitle(s,
    "Founders still run it. A board rebuilt in 2025 around utility, industrial and capital-markets operators."
  );

  // Outer frame
  s.addShape(pres.shapes.RECTANGLE, {
    x: x(1.15), y: y(4.35), w: w(17.71), h: h(5.25),
    fill: { color: CARD }, line: { color: LINE, width: 0.5 },
  });

  const people = [
    { cx: 1.16, cy: 4.36, name: "Jacob DeWitte",   role: "CO-FOUNDER & CEO",        line: "",                                 body: "MIT nuclear engineering PhD. Has run Oklo since founding in 2013 — the through-line for technology and licensing strategy." },
    { cx: 7.06, cy: 4.36, name: "Caroline Cochran",role: "CO-FOUNDER & COO",        line: "",                                 body: "MIT nuclear engineering. Leads product, manufacturing and Powerhouse site execution." },
    { cx: 12.95,cy: 4.36, name: "Craig Bealmear",  role: "CHIEF FINANCIAL OFFICER", line: "",                                 body: "Former BP and Renewable Energy Group CFO. Brought in to institutionalize reporting post-SPAC." },
    { cx: 1.16, cy: 6.82, name: "Jeff Immelt",     role: "CHAIR OF THE BOARD",      line: "Former GE CEO (2001–2017)",         body: "Assumed chair in April 2025. Deep utility and heavy-industry relationships; legitimizes Oklo with infrastructure capital." },
    { cx: 7.06, cy: 6.82, name: "Michael Klein",   role: "DIRECTOR",                line: "Founder, M. Klein & Co.",           body: "Serial SPAC architect. AltC sponsor lead — continues to back the story on the capital markets side." },
    { cx: 12.95,cy: 6.82, name: "Richard Kinzley", role: "DIRECTOR",                line: "Former CFO, Black Hills Corp.",     body: "Regulated-utility finance veteran; audit committee chair." },
  ];

  people.forEach(p => {
    // thin divider cells (subtle inner border)
    s.addShape(pres.shapes.RECTANGLE, {
      x: x(p.cx), y: y(p.cy), w: w(5.89), h: h(p.line ? 2.77 : 2.45),
      fill: { color: CARD }, line: { color: LINE, width: 0.3 },
    });
    s.addText(p.name, {
      x: x(p.cx + 0.33), y: y(p.cy + 0.34), w: w(5.38), h: h(0.45),
      fontFace: SERIF_BODY, fontSize: fs(22), color: CREAM, margin: 0, valign: "top",
    });
    s.addText(p.role, {
      x: x(p.cx + 0.33), y: y(p.cy + 0.82), w: w(5.38), h: h(0.23),
      fontFace: MONO, fontSize: fs(10), color: ORANGE, charSpacing: 2, margin: 0,
    });
    if (p.line) {
      s.addText(p.line, {
        x: x(p.cx + 0.33), y: y(p.cy + 1.20), w: w(5.38), h: h(0.28),
        fontFace: SERIF_BODY, fontSize: fs(13), color: WARM, italic: true, margin: 0, valign: "top",
      });
    }
    s.addText(p.body, {
      x: x(p.cx + 0.33), y: y(p.cy + (p.line ? 1.62 : 1.20)), w: w(5.38), h: h(1.1),
      fontFace: SERIF_BODY, fontSize: fs(13), color: WARM, margin: 0, valign: "top",
    });
  });

  // Note line
  s.addText(
    [
      { text: "Note  ", options: { color: ORANGE, bold: true } },
      { text: "Sam Altman was Chair post-merger; stepped down April 2025 to avoid related-party conflict as OpenAI evaluated clean-power supply deals. He remains a material shareholder.",
        options: { color: WARM } },
    ],
    {
      x: x(1.15), y: y(9.93), w: w(18.24), h: h(0.68),
      fontFace: SERIF_BODY, fontSize: fs(13), margin: 0, valign: "top",
    }
  );

  footer(s, "PEOPLE", "08 / 10");
})();

// ================================================================
// SLIDE 9 — VALUATION
// ================================================================
(function slide9() {
  const s = newSlide();
  sectionTag(s, "08", "VALUATION");
  bigTitle(s, "Valuation framework.");
  subtitle(s,
    "A pre-revenue name priced on option value. We frame it as a 3-scenario real-options call, anchored to licensing and first-fleet deployment."
  );

  // Three scenario cards
  const scenarios = [
    { cx: 1.15,  label: "BEAR", mult: "0.4×", body: "Licensing slips 18+ months. One customer cohort only.", spot: "-40%", spotColor: WARM,  highlight: false },
    { cx: 7.10,  label: "BASE", mult: "1.0×", body: "Aurora licensed 2027. First 2 Powerhouses online 2028. Pipeline converts at ~30%.", spot: "Spot", spotColor: CREAM, highlight: false },
    { cx: 13.06, label: "BULL", mult: "2.3×", body: "Hyperscaler anchor deal + fuel-recycling revenue pull-forward. Fleet orders accelerate.", spot: "+130%", spotColor: ORANGE, highlight: true  },
  ];

  scenarios.forEach(sc => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: x(sc.cx), y: y(4.31), w: w(5.79), h: h(3.19),
      fill: { color: CARD },
      line: { color: sc.highlight ? ORANGE : LINE, width: sc.highlight ? 1.25 : 0.5 },
    });
    // multiplier big, right side
    s.addText(sc.mult, {
      x: x(sc.cx + 4.58), y: y(4.65), w: w(1.05), h: h(0.57),
      fontFace: DISPLAY, fontSize: fs(36),
      color: sc.highlight ? ORANGE : CREAM, align: "right", margin: 0, valign: "top",
    });
    // label
    s.addText(sc.label, {
      x: x(sc.cx + 0.34), y: y(4.92), w: w(2), h: h(0.26),
      fontFace: MONO, fontSize: fs(11), color: sc.highlight ? ORANGE : CREAM,
      charSpacing: 2, margin: 0,
    });
    // body
    s.addText(sc.body, {
      x: x(sc.cx + 0.34), y: y(5.35), w: w(5.26), h: h(1.5),
      fontFace: SERIF_BODY, fontSize: fs(14), color: WARM, margin: 0, valign: "top",
    });
    // separator line
    s.addShape(pres.shapes.LINE, {
      x: x(sc.cx + 0.34), y: y(6.79), w: w(5.10), h: 0,
      line: { color: LINE, width: 0.5 },
    });
    // spot row
    s.addText("VS. SPOT", {
      x: x(sc.cx + 0.34), y: y(6.97), w: w(1.2), h: h(0.23),
      fontFace: MONO, fontSize: fs(10), color: DIM, charSpacing: 2, margin: 0,
    });
    s.addText(sc.spot, {
      x: x(sc.cx + 4.28), y: y(6.97), w: w(1.35), h: h(0.23),
      fontFace: MONO, fontSize: fs(11), color: sc.spotColor, charSpacing: 1,
      bold: sc.highlight, align: "right", margin: 0,
    });
  });

  // Peer context header
  s.addText("LISTED PEER CONTEXT", {
    x: x(1.15), y: y(7.92), w: w(18.24), h: h(0.23),
    fontFace: MONO, fontSize: fs(11), color: DIM, charSpacing: 2, margin: 0,
  });

  // Table
  // Header row
  s.addShape(pres.shapes.RECTANGLE, {
    x: x(1.15), y: y(8.28), w: w(17.71), h: h(0.5),
    fill: { color: CARD_ALT }, line: { color: LINE, width: 0.3 },
  });
  const headers = [
    { t: "COMPANY",      cx: 1.41, cw: 1.54 },
    { t: "TECH",         cx: 2.86, cw: 4.63 },
    { t: "STAGE",        cx: 7.36, cw: 3.86 },
    { t: "READ-THROUGH", cx: 11.10,cw: 7.71 },
  ];
  headers.forEach(h0 => {
    s.addText(h0.t, {
      x: x(h0.cx), y: y(8.44), w: w(h0.cw), h: h(0.22),
      fontFace: MONO, fontSize: fs(10), color: DIM, charSpacing: 2, margin: 0,
    });
  });

  // Row 1: Oklo
  s.addText("Oklo", {
    x: x(1.41), y: y(8.94), w: w(1.54), h: h(0.4),
    fontFace: SERIF_BODY, fontSize: fs(16), color: ORANGE, bold: true, margin: 0, valign: "top",
  });
  s.addText("Fast microreactor (BOO)", {
    x: x(2.86), y: y(9.00), w: w(4.63), h: h(0.35),
    fontFace: SERIF_BODY, fontSize: fs(13), color: CREAM, margin: 0, valign: "top",
  });
  s.addText("NRC Phase 1 refile", {
    x: x(7.36), y: y(9.00), w: w(3.86), h: h(0.35),
    fontFace: SERIF_BODY, fontSize: fs(13), color: CREAM, margin: 0, valign: "top",
  });
  s.addText("Vertically integrated incl. fuel recycling.", {
    x: x(11.10), y: y(9.00), w: w(7.71), h: h(0.35),
    fontFace: SERIF_BODY, fontSize: fs(13), color: WARM, margin: 0, valign: "top",
  });

  // row divider
  s.addShape(pres.shapes.LINE, {
    x: x(1.16), y: y(9.47), w: w(17.69), h: 0,
    line: { color: LINE, width: 0.3 },
  });

  // Row 2: NuScale
  s.addText("NuScale", {
    x: x(1.41), y: y(9.66), w: w(1.54), h: h(0.4),
    fontFace: SERIF_BODY, fontSize: fs(16), color: CREAM, bold: true, margin: 0, valign: "top",
  });
  s.addText("Light-water SMR (licensor)", {
    x: x(2.86), y: y(9.73), w: w(4.63), h: h(0.35),
    fontFace: SERIF_BODY, fontSize: fs(13), color: CREAM, margin: 0, valign: "top",
  });
  s.addText("Design certified 2023", {
    x: x(7.36), y: y(9.73), w: w(3.86), h: h(0.35),
    fontFace: SERIF_BODY, fontSize: fs(13), color: CREAM, margin: 0, valign: "top",
  });
  s.addText("CFPP anchor cancelled; pivoting to direct industrial sales.", {
    x: x(11.10), y: y(9.73), w: w(7.71), h: h(0.35),
    fontFace: SERIF_BODY, fontSize: fs(13), color: WARM, margin: 0, valign: "top",
  });

  // outer table border
  s.addShape(pres.shapes.RECTANGLE, {
    x: x(1.15), y: y(8.28), w: w(17.71), h: h(1.92),
    fill: { type: "none" }, line: { color: LINE, width: 0.3 },
  });

  // footer (slide 9 uses y=10.47)
  s.addText("NK VENTURES / OKLO INVESTMENT MEMO", {
    x: x(1.15), y: y(10.47), w: w(4.32), h: h(0.23),
    fontFace: MONO, fontSize: fs(10), color: DIM, charSpacing: 1, margin: 0,
  });
  s.addText("VALUATION", {
    x: x(11.11), y: y(10.47), w: w(1.19), h: h(0.23),
    fontFace: MONO, fontSize: fs(10), color: DIM, charSpacing: 1, margin: 0,
  });
  s.addText("09 / 10", {
    x: x(17.99), y: y(10.47), w: w(0.95), h: h(0.23),
    fontFace: MONO, fontSize: fs(10), color: DIM, charSpacing: 1, align: "right", margin: 0,
  });
})();

// ================================================================
// SLIDE 10 — RECOMMENDATION
// ================================================================
(function slide10() {
  const s = newSlide();

  // Top half uses dark-orange tint band as background
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 13.333, h: y(7.66),
    fill: { color: ORANGE_DK }, line: { color: ORANGE_DK, width: 0 },
  });

  // Section tag
  s.addText(
    [
      { text: "09 / ",            options: { color: ORANGE } },
      { text: "RECOMMENDATION",    options: { color: ORANGE } },
    ],
    {
      x: x(1.15), y: y(1.04), w: w(18.24), h: h(0.34),
      fontFace: MONO, fontSize: fs(14), charSpacing: 2, margin: 0,
    }
  );

  // THE ASK label
  s.addText("THE ASK", {
    x: x(1.15), y: y(1.68), w: w(18.24), h: h(0.30),
    fontFace: MONO, fontSize: fs(12), color: ORANGE, charSpacing: 2, margin: 0,
  });

  // Main headline with OKLO. in orange
  s.addText(
    [
      { text: "Initiate a position in ", options: { color: CREAM } },
      { text: "OKLO.",                    options: { color: ORANGE } },
    ],
    {
      x: x(1.15), y: y(2.31), w: w(16.09), h: h(1.33),
      fontFace: DISPLAY, fontSize: fs(60), margin: 0, valign: "top",
    }
  );

  // Subtitle
  s.addText(
    "Sized as a high-conviction, long-duration call on base load. Entry over three tranches tied to NRC milestones.",
    {
      x: x(1.15), y: y(4.02), w: w(16.09), h: h(1.19),
      fontFace: SERIF_BODY, fontSize: fs(20), color: CREAM, margin: 0, valign: "top",
    }
  );

  // Three tranche columns
  const tranches = [
    { cx: 1.15,  num: "TRANCHE 1", title: "Initiate now",                body: "1/3 of target weight — ahead of NRC acceptance signal." },
    { cx: 7.13,  num: "TRANCHE 2", title: "On licensing progression",    body: "1/3 on NRC Phase 1 review completion." },
    { cx: 13.12, num: "TRANCHE 3", title: "On first customer PPA",       body: "Final 1/3 on binding hyperscaler or utility contract." },
  ];
  tranches.forEach(t => {
    // top rule
    s.addShape(pres.shapes.LINE, {
      x: x(t.cx), y: y(5.16), w: w(5.74), h: 0,
      line: { color: ORANGE, width: 1 },
    });
    s.addText(t.num, {
      x: x(t.cx), y: y(5.42), w: w(5.91), h: h(0.23),
      fontFace: MONO, fontSize: fs(11), color: ORANGE, charSpacing: 2, margin: 0,
    });
    s.addText(t.title, {
      x: x(t.cx), y: y(5.76), w: w(5.91), h: h(0.5),
      fontFace: SERIF_BODY, fontSize: fs(20), color: CREAM, margin: 0, valign: "top",
    });
    s.addText(t.body, {
      x: x(t.cx), y: y(6.31), w: w(5.91), h: h(0.55),
      fontFace: SERIF_BODY, fontSize: fs(13), color: CREAM, margin: 0, valign: "top",
    });
  });

  // Bottom meta line
  s.addText("NK VENTURES / CLEAN ENERGY PRACTICE / WILLIAM / APRIL 2026", {
    x: x(1.15), y: y(6.90), w: w(10), h: h(0.23),
    fontFace: MONO, fontSize: fs(10), color: CREAM, charSpacing: 2, margin: 0,
  });
  s.addText("THANK YOU — Q & A", {
    x: x(13), y: y(6.90), w: w(5.94), h: h(0.23),
    fontFace: MONO, fontSize: fs(10), color: CREAM, charSpacing: 2, align: "right", margin: 0,
  });
})();

// ---------- Write ----------
pres.writeFile({ fileName: "Oklo_Investment_Memo.pptx" })
  .then(fn => console.log("Wrote:", fn));
