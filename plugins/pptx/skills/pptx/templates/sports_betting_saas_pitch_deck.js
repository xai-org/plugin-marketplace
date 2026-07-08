/**
 * Edge Labs — SaaS Seed Pitch Deck
 * Replica built with pptxgenjs
 *
 * Usage:  node build_deck.js
 * Output: SaaS_Deck.pptx
 */

const pptxgen = require("pptxgenjs");

// ---------- design tokens ----------
const INK       = "000000";          // body / titles
const MUTE      = "6B7280";          // secondary gray text
const RULE      = "D1D5DB";          // thin dividers
const RULE_SOFT = "E5E7EB";          // super-subtle grid lines
const GREEN     = "4ADE80";          // signature brand green
const GREEN_SOFT= "BBF7D0";          // light green area-fill
const ORANGE    = "EA8C14";          // accent on slide 4 only
const PAPER     = "FFFFFF";

const HEAD_FONT = "Arial";           // sans-serif, neutral
const BODY_FONT = "Arial";

// ---------- geometry ----------
// Match the original 20" × 11.25" canvas
const W = 20;
const H = 11.25;

const pres = new pptxgen();
pres.defineLayout({ name: "EDGE_WIDE", width: W, height: H });
pres.layout = "EDGE_WIDE";
pres.author = "Edge Labs, Inc.";
pres.company = "Edge Labs";
pres.title = "Edge — Seed Pitch";

// ================================================================
// helpers
// ================================================================

/** Top "terminal" header bar with pipe separators. Used on every slide. */
function addTopChrome(slide, left, right) {
  const yTop = 0.35;

  // left-side eyebrow group
  slide.addText(left[0], {
    x: 0.5, y: yTop, w: 2.0, h: 0.3,
    fontFace: HEAD_FONT, fontSize: 9, color: INK, bold: true,
    charSpacing: 3, margin: 0, valign: "middle",
  });
  // pipe
  slide.addText("│", {
    x: 2.4, y: yTop, w: 0.2, h: 0.3,
    fontFace: HEAD_FONT, fontSize: 9, color: MUTE,
    margin: 0, valign: "middle",
  });
  slide.addText(left[1], {
    x: 2.7, y: yTop, w: 5.5, h: 0.3,
    fontFace: HEAD_FONT, fontSize: 9, color: INK, bold: true,
    charSpacing: 3, margin: 0, valign: "middle",
  });

  // right-side group
  if (right && right.length >= 1) {
    if (right.length === 1) {
      slide.addText(right[0], {
        x: W - 2.0, y: yTop, w: 1.5, h: 0.3,
        fontFace: HEAD_FONT, fontSize: 9, color: INK, bold: true,
        charSpacing: 3, margin: 0, valign: "middle", align: "right",
      });
    } else {
      slide.addText(right[0], {
        x: W - 5.5, y: yTop, w: 3.2, h: 0.3,
        fontFace: HEAD_FONT, fontSize: 9, color: INK, bold: true,
        charSpacing: 3, margin: 0, valign: "middle", align: "right",
      });
      slide.addText("│", {
        x: W - 2.2, y: yTop, w: 0.2, h: 0.3,
        fontFace: HEAD_FONT, fontSize: 9, color: MUTE,
        margin: 0, valign: "middle", align: "center",
      });
      slide.addText(right[1], {
        x: W - 2.0, y: yTop, w: 1.5, h: 0.3,
        fontFace: HEAD_FONT, fontSize: 9, color: INK, bold: true,
        charSpacing: 3, margin: 0, valign: "middle", align: "right",
      });
    }
  }
}

/** Footer text — small, uppercase, tracked. */
function addFooter(slide, left, right) {
  const y = H - 0.55;
  if (left) {
    slide.addText(left, {
      x: 0.5, y, w: 10, h: 0.3,
      fontFace: HEAD_FONT, fontSize: 9, color: INK, bold: true,
      charSpacing: 3, margin: 0, valign: "middle",
    });
  }
  if (right) {
    slide.addText(right, {
      x: W - 10.5, y, w: 10, h: 0.3,
      fontFace: HEAD_FONT, fontSize: 9, color: INK, bold: true,
      charSpacing: 3, margin: 0, valign: "middle", align: "right",
    });
  }
}

/** Eyebrow label (small uppercase muted) */
function eyebrow(slide, text, x, y, w = 6) {
  slide.addText(text, {
    x, y, w, h: 0.3,
    fontFace: HEAD_FONT, fontSize: 10, color: INK, bold: true,
    charSpacing: 3, margin: 0, valign: "middle",
  });
}

// ================================================================
// SLIDE 1 — Cover
// ================================================================
function slide1() {
  const s = pres.addSlide();
  s.background = { color: PAPER };

  addTopChrome(s,
    ["EDGE / TERMINAL", "SEED · CONFIDENTIAL"],
    ["MLB · 2026 SEASON", "V0.8 BETA"]
  );

  // section marker
  s.addText("01 / 08   SEED PITCH · APRIL 2026", {
    x: 0.8, y: 2.6, w: 10, h: 0.4,
    fontFace: HEAD_FONT, fontSize: 11, color: INK, bold: true,
    charSpacing: 3, margin: 0,
  });

  // giant brand wordmark
  s.addText("Edge.", {
    x: 0.8, y: 3.0, w: 10, h: 2.6,
    fontFace: HEAD_FONT, fontSize: 140, color: INK, bold: true,
    margin: 0, valign: "top",
  });

  // tagline
  s.addText("The right plays at the right time, every time.", {
    x: 0.8, y: 5.9, w: 11, h: 0.6,
    fontFace: BODY_FONT, fontSize: 22, color: INK,
    margin: 0,
  });

  // stats strip (STAGE / MARKET / USERS / EDGE)
  const statY = 7.0;
  const stats = [
    { label: "STAGE",  value: "Seed"      },
    { label: "MARKET", value: "MLB · US"  },
    { label: "USERS",  value: "100 paid"  },
    { label: "EDGE",   value: "+10.2%"    },
  ];
  stats.forEach((stat, i) => {
    const x = 0.8 + i * 1.5;
    s.addText(stat.label, {
      x, y: statY, w: 1.4, h: 0.3,
      fontFace: HEAD_FONT, fontSize: 9, color: INK, bold: true,
      charSpacing: 3, margin: 0,
    });
    s.addText(stat.value, {
      x, y: statY + 0.35, w: 1.4, h: 0.4,
      fontFace: BODY_FONT, fontSize: 16, color: INK,
      margin: 0,
    });
  });

  // ----- right panel: Today's Top Picks -----
  const panelX = 11.0;
  const panelW = 8.0;

  s.addText("TODAY'S TOP PICKS", {
    x: panelX, y: 1.4, w: panelW - 2.0, h: 0.3,
    fontFace: HEAD_FONT, fontSize: 10, color: INK, bold: true,
    charSpacing: 3, margin: 0,
  });
  s.addText("LIVE · 14:32 ET", {
    x: panelX + panelW - 3.0, y: 1.4, w: 3.0, h: 0.3,
    fontFace: HEAD_FONT, fontSize: 10, color: INK, bold: true,
    charSpacing: 3, margin: 0, align: "right",
  });

  const picks = [
    ["ML",     "LAD @ SF",      "−138", "+7.4%"],
    ["F5 RL",  "NYY −0.5",      "+112", "+6.8%"],
    ["TOTAL",  "HOU/SEA u8.5",  "−105", "+5.1%"],
    ["K PROP", "Skenes o7.5",   "−118", "+4.6%"],
    ["TB HR",  "Judge YES",     "+310", "+3.2%"],
  ];
  let rowY = 2.0;
  const rowH = 0.6;
  picks.forEach((row) => {
    s.addText(row[0], {
      x: panelX, y: rowY, w: 1.2, h: rowH,
      fontFace: HEAD_FONT, fontSize: 10, color: INK, bold: true,
      charSpacing: 3, margin: 0, valign: "middle",
    });
    s.addText(row[1], {
      x: panelX + 1.3, y: rowY, w: 3.5, h: rowH,
      fontFace: BODY_FONT, fontSize: 14, color: INK,
      margin: 0, valign: "middle",
    });
    s.addText(row[2], {
      x: panelX + 4.8, y: rowY, w: 1.5, h: rowH,
      fontFace: BODY_FONT, fontSize: 14, color: INK,
      margin: 0, valign: "middle", align: "right",
    });
    s.addText(row[3], {
      x: panelX + 6.4, y: rowY, w: 1.5, h: rowH,
      fontFace: BODY_FONT, fontSize: 14, color: INK, bold: true,
      margin: 0, valign: "middle", align: "right",
    });
    rowY += rowH;
  });

  // ----- cumulative ROI area chart -----
  const chartX = 11.0;
  const chartY = 8.0;
  const chartW = 8.3;
  const chartH = 1.8;

  // dotted zero-line baseline
  s.addShape(pres.shapes.LINE, {
    x: chartX + 0.2, y: chartY + chartH - 0.25, w: chartW - 0.4, h: 0,
    line: { color: INK, width: 1, dashType: "dash" },
  });

  // Area chart with monotonic rise
  s.addChart(pres.charts.AREA,
    [{
      name: "Cumulative ROI",
      labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      values: [1, 1.3, 1.6, 1.8, 2.2, 2.5, 2.9, 3.3, 3.6, 3.9, 4.1, 4.4, 4.6, 4.73],
    }],
    {
      x: chartX, y: chartY, w: chartW, h: chartH,
      chartColors: [GREEN],
      chartColorsOpacity: 35,
      showLegend: false,
      showTitle: false,
      showValue: false,
      catAxisHidden: true,
      valAxisHidden: true,
      catGridLine: { style: "none" },
      valGridLine: { style: "none" },
      lineSize: 3,
      lineSmooth: true,
      chartArea: { fill: { color: PAPER }, border: { color: PAPER, pt: 0 } },
      plotArea: { fill: { color: PAPER } },
    }
  );

  // chart caption strip
  s.addText("CUMULATIVE ROI · 12 MO", {
    x: chartX, y: H - 1.1, w: 6, h: 0.3,
    fontFace: HEAD_FONT, fontSize: 9, color: INK, bold: true,
    charSpacing: 3, margin: 0,
  });
  s.addText("+47.3 UNITS", {
    x: chartX + chartW - 3, y: H - 1.1, w: 3, h: 0.3,
    fontFace: HEAD_FONT, fontSize: 9, color: INK, bold: true,
    charSpacing: 3, margin: 0, align: "right",
  });

  addFooter(s, "CONFIDENTIAL · DO NOT DISTRIBUTE", "EDGE LABS, INC. · 2026");
}

// ================================================================
// SLIDE 2 — The Inefficiency
// ================================================================
function slide2() {
  const s = pres.addSlide();
  s.background = { color: PAPER };

  addTopChrome(s, ["MARKET", "MLB · HOLD & LINE DISPERSION"], ["02 / 08"]);

  eyebrow(s, "02 THE INEFFICIENCY", 0.8, 1.3, 6);

  s.addText("Baseball pricing is noisy, and the books know it.", {
    x: 0.8, y: 1.7, w: W - 1.6, h: 1.1,
    fontFace: HEAD_FONT, fontSize: 48, color: INK, bold: true,
    margin: 0,
  });

  s.addText(
    "162 games, thin markets, and mid-tier bookmakers slow to move on starter news, park factors, and bullpen state. That gap is measurable — and persistent.",
    {
      x: 0.8, y: 3.0, w: 13, h: 1.0,
      fontFace: BODY_FONT, fontSize: 18, color: INK,
      margin: 0,
    }
  );

  // three-column stats
  const stats = [
    {
      label: "HOLD VS. NFL SIDES",
      value: "2.4×",
      desc: "MLB sides carry materially wider margins than NFL — more room to find mispriced sides on soft books.",
    },
    {
      label: "LINE DISPERSION, TOP 8 BOOKS",
      value: "11.3¢",
      desc: "Average spread between the sharpest and softest price on MLB sides and totals at t-minus-60.",
    },
    {
      label: "SLOW-MOVE WINDOW",
      value: "18 min",
      desc: "Median lag from a sharp book's move to the median soft book — time enough to find and take the price.",
    },
  ];

  const colW = 5.0;
  const colGap = 1.3;
  const startX = 0.8;
  const colY = 4.8;

  stats.forEach((stat, i) => {
    const x = startX + i * (colW + colGap);
    s.addText(stat.label, {
      x, y: colY, w: colW, h: 0.3,
      fontFace: HEAD_FONT, fontSize: 11, color: INK, bold: true,
      charSpacing: 3, margin: 0,
    });
    s.addText(stat.value, {
      x, y: colY + 0.45, w: colW, h: 1.4,
      fontFace: HEAD_FONT, fontSize: 72, color: INK, bold: true,
      margin: 0,
    });
    s.addText(stat.desc, {
      x, y: colY + 2.5, w: colW - 0.5, h: 1.5,
      fontFace: BODY_FONT, fontSize: 15, color: INK,
      margin: 0,
    });
  });

  addFooter(s, "SOURCE: INTERNAL LINE-SCRAPE, APR 2024 – MAR 2026", "EDGE LABS, INC.");
}

// ================================================================
// SLIDE 3 — Product / Dashboard mockup
// ================================================================
function slide3() {
  const s = pres.addSlide();
  s.background = { color: PAPER };

  addTopChrome(s, ["PRODUCT", "DASHBOARD · TODAY'S SLATE"], ["03 / 08"]);

  // browser chrome bar
  const browserY = 1.3;
  s.addShape(pres.shapes.OVAL, {
    x: 0.8, y: browserY + 0.05, w: 0.15, h: 0.15,
    fill: { color: INK }, line: { color: INK, width: 0 },
  });
  s.addText("app.edge.bet", {
    x: 1.05, y: browserY, w: 2.0, h: 0.3,
    fontFace: BODY_FONT, fontSize: 12, color: INK,
    margin: 0, valign: "middle",
  });
  s.addText("/dashboard", {
    x: 3.0, y: browserY, w: 2.0, h: 0.3,
    fontFace: BODY_FONT, fontSize: 12, color: MUTE,
    margin: 0, valign: "middle",
  });
  s.addText("14:32:06 ET", {
    x: W - 3.0, y: browserY, w: 2.5, h: 0.3,
    fontFace: BODY_FONT, fontSize: 12, color: MUTE,
    margin: 0, valign: "middle", align: "right",
  });

  // divider
  s.addShape(pres.shapes.LINE, {
    x: 0.8, y: 1.7, w: W - 1.6, h: 0,
    line: { color: RULE_SOFT, width: 0.75 },
  });

  // left sidebar
  const sideX = 0.8;
  s.addText("Edge", {
    x: sideX, y: 2.0, w: 2, h: 0.5,
    fontFace: HEAD_FONT, fontSize: 22, color: INK, bold: true,
    margin: 0,
  });
  const navItems = [
    "TODAY'S SLATE",
    "LINE SHOP",
    "BANKROLL",
    "HISTORY",
    "ALERTS",
    "SETTINGS",
  ];
  navItems.forEach((item, i) => {
    s.addText(item, {
      x: sideX, y: 2.9 + i * 0.45, w: 2.2, h: 0.35,
      fontFace: HEAD_FONT, fontSize: 10, color: INK, bold: true,
      charSpacing: 3, margin: 0, valign: "middle",
    });
  });

  // bankroll at bottom of sidebar
  const bankrollY = 8.5;
  s.addText("BANKROLL", {
    x: sideX, y: bankrollY, w: 2, h: 0.3,
    fontFace: HEAD_FONT, fontSize: 9, color: INK, bold: true,
    charSpacing: 3, margin: 0,
  });
  s.addText("$12,480.25", {
    x: sideX, y: bankrollY + 0.3, w: 2.5, h: 0.4,
    fontFace: BODY_FONT, fontSize: 16, color: INK, bold: true,
    margin: 0,
  });
  s.addText("+$318.50 today", {
    x: sideX, y: bankrollY + 0.7, w: 2.5, h: 0.3,
    fontFace: BODY_FONT, fontSize: 10, color: MUTE,
    margin: 0,
  });

  // main header
  const mainX = 3.6;
  s.addText("Today's Slate — 11 games", {
    x: mainX, y: 2.1, w: 8, h: 0.5,
    fontFace: HEAD_FONT, fontSize: 24, color: INK, bold: true,
    margin: 0,
  });
  s.addText("UPDATED 14:32:06 ET · 23 EDGES ≥ 2.0%", {
    x: mainX, y: 2.6, w: 6, h: 0.3,
    fontFace: HEAD_FONT, fontSize: 9, color: MUTE, bold: true,
    charSpacing: 3, margin: 0,
  });

  // top-right filters
  const filters = ["ALL MARKETS", "EV ≥ 2%", "CONF ≥ MED", "SORT · EV ▼"];
  filters.forEach((f, i) => {
    s.addText(f, {
      x: 13.5 + i * 1.5, y: 2.1, w: 1.5, h: 0.3,
      fontFace: HEAD_FONT, fontSize: 9, color: INK, bold: true,
      charSpacing: 3, margin: 0, align: i === filters.length - 1 ? "right" : "left",
    });
  });

  // KPI row
  const kpis = [
    { label: "PICKS TODAY",        value: "23" },
    { label: "AVG EV",             value: "+4.8%" },
    { label: "RECOMMENDED UNITS",  value: "14.2u" },
    { label: "30-DAY ROI",         value: "+11.4%" },
    { label: "MODEL CONFIDENCE",   value: "0.72" },
  ];
  const kpiY = 3.2;
  kpis.forEach((k, i) => {
    const x = mainX + i * 3.15;
    s.addText(k.label, {
      x, y: kpiY, w: 3, h: 0.3,
      fontFace: HEAD_FONT, fontSize: 9, color: INK, bold: true,
      charSpacing: 3, margin: 0,
    });
    s.addText(k.value, {
      x, y: kpiY + 0.3, w: 3, h: 0.5,
      fontFace: BODY_FONT, fontSize: 22, color: INK, bold: true,
      margin: 0,
    });
  });

  // data table
  const tableY = 4.5;
  const colHeaders = ["TIP", "GAME", "MARKET", "PICK", "LINE", "FAIR", "EV", "CONF"];
  const colXs = [3.6, 4.4, 6.8, 9.0, 11.4, 12.8, 14.3, 15.8];
  const colWidths = [0.8, 2.4, 2.2, 2.4, 1.4, 1.5, 1.5, 1.5];

  colHeaders.forEach((h, i) => {
    s.addText(h, {
      x: colXs[i], y: tableY, w: colWidths[i], h: 0.3,
      fontFace: HEAD_FONT, fontSize: 9, color: MUTE, bold: true,
      charSpacing: 3, margin: 0,
      align: i >= 4 ? "right" : "left",
    });
  });

  const rows = [
    ["19:10", "LAD @ SF",  "Moneyline",  "LAD",          "−138", "−168", "+7.4%", ""],
    ["19:05", "NYY @ BOS", "F5 Run Line","NYY −0.5",     "+112", "+98",  "+6.8%", ""],
    ["21:40", "HOU @ SEA", "Total",      "Under 8.5",    "−105", "−121", "+5.1%", ""],
    ["18:40", "PIT @ CHC", "Strikeouts", "Skenes o7.5",  "−118", "−134", "+4.6%", ""],
    ["19:10", "TB @ NYY",  "Player HR",  "A. Judge YES", "+310", "+268", "+3.2%", ""],
    ["20:15", "ATL @ PHI", "Moneyline",  "ATL",          "+104", "−108", "+5.9%", ""],
    ["22:05", "SD @ ARI",  "Total F5",   "Over 4.5",     "−110", "−126", "+4.1%", ""],
  ];
  const rowH = 0.5;
  rows.forEach((row, rIdx) => {
    const y = tableY + 0.5 + rIdx * rowH;
    row.forEach((cell, cIdx) => {
      const isEV = cIdx === 6;
      s.addText(cell, {
        x: colXs[cIdx], y, w: colWidths[cIdx], h: rowH,
        fontFace: BODY_FONT, fontSize: 13,
        color: INK, bold: isEV || cIdx === 1,
        margin: 0, valign: "middle",
        align: cIdx >= 4 ? "right" : "left",
      });
    });
  });

  addFooter(s, "ILLUSTRATIVE UI · LIVE BETA IN PRODUCTION", "EDGE LABS, INC.");
}

// ================================================================
// SLIDE 4 — How it works (pipeline)
// ================================================================
function slide4() {
  const s = pres.addSlide();
  s.background = { color: PAPER };

  addTopChrome(s, ["SYSTEM", "PIPELINE · INGEST → PRICE → SHIP"], ["04 / 08"]);

  eyebrow(s, "04 HOW IT WORKS", 0.8, 1.3, 6);

  s.addText("A pricing engine, not a pick factory.", {
    x: 0.8, y: 1.7, w: W - 1.6, h: 1.1,
    fontFace: HEAD_FONT, fontSize: 48, color: INK, bold: true,
    margin: 0,
  });

  s.addText(
    "We ingest data, simulate outcomes, compare to posted lines, and alert only when EV and confidence clear our thresholds.",
    {
      x: 0.8, y: 3.0, w: 14, h: 1.0,
      fontFace: BODY_FONT, fontSize: 18, color: INK,
      margin: 0,
    }
  );

  // four pipeline stages
  const stages = [
    {
      num: "01 · INGEST",
      title: "Data layer",
      desc: "Statcast pitch-by-pitch, park factors, weather, umpire tendencies, bullpen state, and live line feeds from 14 books.",
      bullets: ["↳ 2.1M pitches/season", "↳ 14 books, 1-sec polling"],
      hasArrow: true,
    },
    {
      num: "02 · PRICE",
      title: "Model stack",
      desc: "Ensemble of a hierarchical Bayesian run-scoring model and a calibrated gradient-boosted prop model; outputs fair odds.",
      bullets: ["↳ Calibrated log-loss 0.648", "↳ Daily re-fit · 2,400 games"],
      hasArrow: true,
    },
    {
      num: "03 · FILTER",
      title: "Edge gate",
      desc: "Only markets clearing EV ≥ 2% after vig and confidence ≥ 0.5 make the slate. Kelly-fractional sizing is computed per pick.",
      bullets: ["↳ ~23 picks/day avg", "↳ 0.25-Kelly default"],
      hasArrow: true,
    },
    {
      num: "04 · SHIP",
      title: "Delivery",
      desc: "Picks land in the dashboard with line-shop across books; push + SMS alerts on high-EV moves and lineup scratches.",
      bullets: ["↳ Web · iOS · SMS", "↳ Median alert < 900 ms"],
      hasArrow: false,
    },
  ];

  const colW = 4.2;
  const colGap = 0.4;
  const startX = 0.8;
  const baseY = 4.6;

  stages.forEach((stage, i) => {
    const x = startX + i * (colW + colGap);

    // stage label
    s.addText(stage.num, {
      x, y: baseY, w: colW, h: 0.3,
      fontFace: HEAD_FONT, fontSize: 10, color: MUTE, bold: true,
      charSpacing: 3, margin: 0,
    });
    // stage title
    s.addText(stage.title, {
      x, y: baseY + 0.4, w: colW, h: 0.5,
      fontFace: HEAD_FONT, fontSize: 22, color: INK, bold: true,
      margin: 0,
    });
    // stage description
    s.addText(stage.desc, {
      x, y: baseY + 1.0, w: colW - 0.3, h: 1.8,
      fontFace: BODY_FONT, fontSize: 14, color: INK,
      margin: 0,
    });
    // bullets near bottom
    const bulletY = 9.1;
    stage.bullets.forEach((b, bi) => {
      s.addText(b, {
        x, y: bulletY + bi * 0.3, w: colW, h: 0.3,
        fontFace: BODY_FONT, fontSize: 11, color: INK,
        margin: 0,
      });
    });

    // orange triangular arrow (except last)
    if (stage.hasArrow) {
      const ax = x + colW - 0.4;
      const ay = baseY + 2.2;
      s.addShape(pres.shapes.RIGHT_TRIANGLE, {
        x: ax, y: ay, w: 0.35, h: 0.35,
        fill: { color: ORANGE },
        line: { color: ORANGE, width: 0 },
        rotate: 270,
      });
    }
  });

  addFooter(s, "ARCHITECTURE AS OF APR 2026", "EDGE LABS, INC.");
}

// ================================================================
// SLIDE 5 — Back-verified performance
// ================================================================
function slide5() {
  const s = pres.addSlide();
  s.background = { color: PAPER };

  addTopChrome(s, ["PERFORMANCE", "BACK-VERIFIED · 24-MONTH SAMPLE"], ["05 / 08"]);

  eyebrow(s, "05 BACK-VERIFIED EDGE", 0.8, 1.3, 6);

  s.addText("+10.2% ROI against closing lines at the top five books.", {
    x: 0.8, y: 1.7, w: W - 1.6, h: 1.8,
    fontFace: HEAD_FONT, fontSize: 48, color: INK, bold: true,
    margin: 0,
  });

  // chart title + n count
  s.addText("Cumulative units · Apr 2024 — Mar 2026", {
    x: 0.8, y: 4.1, w: 7, h: 0.4,
    fontFace: HEAD_FONT, fontSize: 16, color: INK, bold: true,
    margin: 0,
  });
  s.addText("N = 11,842 BETS", {
    x: 7.5, y: 4.15, w: 3, h: 0.35,
    fontFace: HEAD_FONT, fontSize: 10, color: INK, bold: true,
    charSpacing: 3, margin: 0, align: "right",
  });

  // main area chart — cumulative edge vs flat benchmark
  const months = ["Apr '24", "Jun '24", "Aug '24", "Oct '24", "Dec '24",
                  "Feb '25", "Apr '25", "Jun '25", "Aug '25", "Oct '25",
                  "Dec '25", "Feb '26", "Mar '26"];
  const edgeSeries      = [0, 3, 5, 4, 11, 15, 19, 23, 30, 36, 41, 45, 47.3];

  s.addChart(pres.charts.AREA,
    [
      { name: "Edge Strategy", labels: months, values: edgeSeries },
    ],
    {
      x: 0.8, y: 4.6, w: 9.5, h: 4.8,
      chartColors: [GREEN],
      chartColorsOpacity: 35,
      showLegend: false,
      showTitle: false,
      lineSize: 3,
      lineSmooth: false,
      catAxisLabelColor: MUTE,
      catAxisLabelFontSize: 9,
      catAxisLabelFontFace: BODY_FONT,
      valAxisLabelColor: MUTE,
      valAxisLabelFontSize: 9,
      valAxisLabelFontFace: BODY_FONT,
      valAxisMinVal: 0,
      valAxisMaxVal: 60,
      valAxisMajorUnit: 15,
      valGridLine: { color: RULE_SOFT, size: 0.5 },
      catGridLine: { style: "none" },
      chartArea: { fill: { color: PAPER }, border: { color: PAPER, pt: 0 } },
      plotArea: { fill: { color: PAPER } },
    }
  );

  // (benchmark is shown via the legend text below — the series itself is so flat
  // relative to the Edge Strategy that overlaying it added visual noise)

  // chart legend line
  s.addText("EDGE STRATEGY", {
    x: 0.8, y: 9.5, w: 2, h: 0.3,
    fontFace: HEAD_FONT, fontSize: 9, color: INK, bold: true,
    charSpacing: 3, margin: 0,
  });
  s.addText("CLOSING-LINE BENCHMARK", {
    x: 3.0, y: 9.5, w: 3, h: 0.3,
    fontFace: HEAD_FONT, fontSize: 9, color: MUTE, bold: true,
    charSpacing: 3, margin: 0,
  });

  // right-side stat column
  const stats = [
    { label: "ROI VS. CLOSING LINES", desc: "Net of 4.5% avg hold across 5 top books", value: "+10.2%" },
    { label: "SHARPE RATIO",          desc: "Daily unit P&L, annualized",                value: "2.14"   },
    { label: "HIT RATE · +EV PICKS",  desc: "vs. 52.4% break-even at −110",              value: "55.8%"  },
    { label: "CLV BEAT RATE",         desc: "% of bets on the right side of close",      value: "61.3%"  },
  ];

  const rightX = 11.8;
  const statY0 = 4.1;
  const statStep = 1.4;

  stats.forEach((st, i) => {
    const y = statY0 + i * statStep;
    s.addText(st.label, {
      x: rightX, y, w: 4.5, h: 0.3,
      fontFace: HEAD_FONT, fontSize: 10, color: INK, bold: true,
      charSpacing: 3, margin: 0,
    });
    s.addText(st.desc, {
      x: rightX, y: y + 0.32, w: 4.5, h: 0.3,
      fontFace: BODY_FONT, fontSize: 12, color: INK,
      margin: 0,
    });
    s.addText(st.value, {
      x: rightX + 4.3, y: y - 0.05, w: 3.5, h: 0.9,
      fontFace: HEAD_FONT, fontSize: 40, color: INK, bold: true,
      margin: 0, align: "right",
    });
  });

  addFooter(s, "WALK-FORWARD, OUT-OF-SAMPLE. NO SURVIVORSHIP BIAS.", "EDGE LABS, INC.");
}

// ================================================================
// SLIDE 6 — Traction
// ================================================================
function slide6() {
  const s = pres.addSlide();
  s.background = { color: PAPER };

  addTopChrome(s, ["TRACTION", "BETA · 100 PAID USERS"], ["06 / 08"]);

  eyebrow(s, "06 TRACTION", 0.8, 1.3, 6);

  s.addText("100 paid users in a closed beta, retaining at institutional rates.", {
    x: 0.8, y: 1.7, w: W - 1.6, h: 1.8,
    fontFace: HEAD_FONT, fontSize: 44, color: INK, bold: true,
    margin: 0,
  });

  // six stat callouts (2 cols × 3 rows on left half)
  const callouts = [
    [
      { label: "PAID USERS",       value: "100",    desc: "Closed beta · invite-only" },
      { label: "MRR",              value: "$9.9K",  desc: "$99/mo flat · no tiers yet" },
    ],
    [
      { label: "WEEKLY ACTIVE",    value: "94%",    desc: "Placed ≥ 1 pick in last 7d" },
      { label: "3-MONTH RETENTION",value: "88%",    desc: "Cohorted from Jan 2026 launch" },
    ],
    [
      { label: "WAITLIST",         value: "2,140",  desc: "Organic · 0 paid acquisition" },
      { label: "NPS",              value: "71",     desc: "n = 68 responses" },
    ],
  ];

  const coStartX = 0.8;
  const coColW = 3.6;
  const coStartY = 4.4;
  const coRowH = 1.9;

  callouts.forEach((row, ri) => {
    row.forEach((c, ci) => {
      const x = coStartX + ci * coColW;
      const y = coStartY + ri * coRowH;
      s.addText(c.label, {
        x, y, w: coColW, h: 0.3,
        fontFace: HEAD_FONT, fontSize: 10, color: INK, bold: true,
        charSpacing: 3, margin: 0,
      });
      s.addText(c.value, {
        x, y: y + 0.3, w: coColW, h: 1.0,
        fontFace: HEAD_FONT, fontSize: 48, color: INK, bold: true,
        margin: 0,
      });
      s.addText(c.desc, {
        x, y: y + 1.3, w: coColW - 0.3, h: 0.4,
        fontFace: BODY_FONT, fontSize: 12, color: INK,
        margin: 0,
      });
    });
  });

  // right side: weekly paid-users bar chart
  s.addText("Paid users · weekly", {
    x: 10.0, y: 4.2, w: 5, h: 0.4,
    fontFace: HEAD_FONT, fontSize: 18, color: INK, bold: true,
    margin: 0,
  });
  s.addText("JAN — APR 2026", {
    x: W - 5.0, y: 4.25, w: 4.5, h: 0.35,
    fontFace: HEAD_FONT, fontSize: 10, color: INK, bold: true,
    charSpacing: 3, margin: 0, align: "right",
  });

  // 14-week bars climbing from 6 to 80
  const weeks = ["W1", "", "", "", "W5", "", "", "", "W9", "", "", "", "", "W14"];
  const values = [6, 9, 13, 17, 22, 28, 33, 39, 47, 54, 61, 68, 77, 81];

  s.addChart(pres.charts.BAR,
    [{ name: "Paid users", labels: weeks, values: values }],
    {
      x: 10.0, y: 4.8, w: 9.2, h: 4.8,
      barDir: "col",
      chartColors: [GREEN],
      showLegend: false,
      showTitle: false,
      showValue: false,
      catAxisLabelColor: MUTE,
      catAxisLabelFontSize: 9,
      catAxisLabelFontFace: BODY_FONT,
      valAxisLabelColor: MUTE,
      valAxisLabelFontSize: 9,
      valAxisLabelFontFace: BODY_FONT,
      valAxisMinVal: 0,
      valAxisMaxVal: 100,
      valAxisMajorUnit: 25,
      valGridLine: { color: RULE_SOFT, size: 0.5 },
      catGridLine: { style: "none" },
      barGapWidthPct: 40,
      chartArea: { fill: { color: PAPER }, border: { color: PAPER, pt: 0 } },
      plotArea: { fill: { color: PAPER } },
    }
  );

  s.addText("PAID USERS · END OF WEEK", {
    x: 10.0, y: 9.7, w: 5, h: 0.3,
    fontFace: HEAD_FONT, fontSize: 9, color: INK, bold: true,
    charSpacing: 3, margin: 0,
  });
  s.addText("+18% WK/WK AVG", {
    x: 13.5, y: 9.7, w: 3, h: 0.3,
    fontFace: HEAD_FONT, fontSize: 9, color: MUTE, bold: true,
    charSpacing: 3, margin: 0,
  });

  addFooter(s, "BETA COHORT, JAN — APR 2026. $99/MO FLAT.", "EDGE LABS, INC.");
}

// ================================================================
// SLIDE 7 — Market sizing
// ================================================================
function slide7() {
  const s = pres.addSlide();
  s.background = { color: PAPER };

  addTopChrome(s, ["MARKET", "US LEGAL SPORTS BETTING"], ["07 / 08"]);

  eyebrow(s, "07 MARKET", 0.8, 1.3, 6);

  s.addText("A $120B handle market with an underserved serious bettor.", {
    x: 0.8, y: 1.7, w: W - 1.6, h: 1.8,
    fontFace: HEAD_FONT, fontSize: 44, color: INK, bold: true,
    margin: 0,
  });

  // TAM/SAM/SOM/WEDGE — left side
  const rows = [
    { label: "TAM",   value: "$120B", desc: "US legal sports betting handle, 2025" },
    { label: "SAM",   value: "$38B",  desc: "MLB + MLB-adjacent handle in legal US states" },
    { label: "SOM",   value: "$1.4B", desc: "Serious bettors · wager > $10K/year on MLB" },
    { label: "WEDGE", value: "$180M", desc: "Tools & data subscriptions addressable at $99–299/mo" },
  ];

  const rowY0 = 4.6;
  const rowStep = 1.3;

  rows.forEach((r, i) => {
    const y = rowY0 + i * rowStep;
    s.addText(r.label, {
      x: 0.8, y, w: 1.4, h: 0.6,
      fontFace: HEAD_FONT, fontSize: 11, color: INK, bold: true,
      charSpacing: 3, margin: 0, valign: "middle",
    });
    s.addText(r.value, {
      x: 2.5, y, w: 2.5, h: 0.6,
      fontFace: HEAD_FONT, fontSize: 32, color: INK, bold: true,
      margin: 0, valign: "middle",
    });
    s.addText(r.desc, {
      x: 5.2, y, w: 4.2, h: 0.7,
      fontFace: BODY_FONT, fontSize: 12, color: INK,
      margin: 0, valign: "middle", align: "right",
    });
  });

  // Right panel: "Why now" narrative
  const rightX = 11.5;
  s.addText("Why now.", {
    x: rightX, y: 4.3, w: 7, h: 0.6,
    fontFace: HEAD_FONT, fontSize: 24, color: INK, bold: true,
    margin: 0,
  });

  s.addText(
    "38 states legal and counting. Handle has 4×'d since 2020. Mid-tier books have multiplied — and so has the dispersion between their prices.",
    {
      x: rightX, y: 5.0, w: 7.5, h: 1.4,
      fontFace: BODY_FONT, fontSize: 16, color: INK,
      margin: 0,
    }
  );

  s.addText(
    "Books still optimize for casual users. The serious MLB bettor has spreadsheets and a Discord. We give them a terminal.",
    {
      x: rightX, y: 6.6, w: 7.5, h: 1.4,
      fontFace: BODY_FONT, fontSize: 16, color: INK,
      margin: 0,
    }
  );

  s.addText("SOURCES · AGA Q4 2025 · STATE REGULATORS · INTERNAL EST.", {
    x: rightX, y: 9.5, w: 7.5, h: 0.3,
    fontFace: HEAD_FONT, fontSize: 9, color: INK, bold: true,
    charSpacing: 3, margin: 0, align: "right",
  });

  addFooter(s, "FIGURES ARE PUBLIC-MARKET ESTIMATES; WEDGE IS INTERNAL.", "EDGE LABS, INC.");
}

// ================================================================
// SLIDE 8 — Team & raise
// ================================================================
function slide8() {
  const s = pres.addSlide();
  s.background = { color: PAPER };

  addTopChrome(s, ["CLOSE", "TEAM · RAISE · USE OF FUNDS"], ["08 / 08"]);

  eyebrow(s, "08 TEAM & RAISE", 0.8, 1.3, 6);

  s.addText("A quant, a builder, $1.5M to scale the slate.", {
    x: 0.8, y: 1.7, w: W - 1.6, h: 1.0,
    fontFace: HEAD_FONT, fontSize: 44, color: INK, bold: true,
    margin: 0,
  });

  // Left: three people blocks
  const people = [
    {
      initials: "AK", name: "[Founder Name]",  role: "CEO · MODELING",
      bio: "Ex-quant at a top HFT firm. Built MLB run-scoring models as a side project for 6 years before it became this.",
    },
    {
      initials: "JR", name: "[Co-founder Name]", role: "CTO · PLATFORM",
      bio: "Previously staff eng at a consumer fintech. Owns ingest, app, and the line-shop engine end-to-end.",
    },
    {
      initials: "—",  name: "Advisors",          role: "ADVISORY",
      bio: "[Advisor 1] · ex-sportsbook head of trading. [Advisor 2] · consumer-SaaS GTM, scaled two prior companies past $10M ARR.",
    },
  ];

  const pX0 = 0.8;
  const pY0 = 3.8;
  const pStep = 1.9;

  people.forEach((p, i) => {
    const y = pY0 + i * pStep;
    s.addText(p.initials, {
      x: pX0, y: y + 0.1, w: 1.2, h: 0.5,
      fontFace: HEAD_FONT, fontSize: 16, color: INK,
      margin: 0,
    });
    s.addText(p.name, {
      x: pX0 + 1.5, y, w: 6, h: 0.5,
      fontFace: HEAD_FONT, fontSize: 20, color: INK, bold: true,
      margin: 0,
    });
    s.addText(p.role, {
      x: pX0 + 1.5, y: y + 0.5, w: 6, h: 0.3,
      fontFace: HEAD_FONT, fontSize: 10, color: INK, bold: true,
      charSpacing: 3, margin: 0,
    });
    s.addText(p.bio, {
      x: pX0 + 1.5, y: y + 0.85, w: 8.5, h: 0.9,
      fontFace: BODY_FONT, fontSize: 12, color: INK,
      margin: 0,
    });
  });

  // Right: seed raise hero
  const rightX = 11.5;
  s.addText("SEED RAISE", {
    x: rightX, y: 3.7, w: 4, h: 0.3,
    fontFace: HEAD_FONT, fontSize: 11, color: INK, bold: true,
    charSpacing: 3, margin: 0,
  });

  s.addText("$1.5M", {
    x: rightX, y: 4.1, w: 6, h: 1.8,
    fontFace: HEAD_FONT, fontSize: 110, color: INK, bold: true,
    margin: 0,
  });

  s.addText("18 months runway · post-money target TBD", {
    x: rightX, y: 6.0, w: 7, h: 0.5,
    fontFace: BODY_FONT, fontSize: 16, color: INK,
    margin: 0,
  });

  // use-of-funds rows
  const uses = [
    { label: "Engineering (3 hires)",  pct: "55%" },
    { label: "Data & modeling",         pct: "20%" },
    { label: "GTM & growth",            pct: "15%" },
    { label: "Ops, legal, buffer",      pct: "10%" },
  ];
  const usY0 = 7.0;
  uses.forEach((u, i) => {
    const y = usY0 + i * 0.55;
    s.addText(u.label, {
      x: rightX, y, w: 5, h: 0.4,
      fontFace: BODY_FONT, fontSize: 13, color: INK,
      margin: 0, valign: "middle",
    });
    s.addText(u.pct, {
      x: rightX + 5.0, y, w: 2.5, h: 0.4,
      fontFace: HEAD_FONT, fontSize: 13, color: INK, bold: true,
      margin: 0, valign: "middle", align: "right",
    });
  });

  // contact links
  s.addText("> hello@edge.bet", {
    x: rightX, y: 9.7, w: 3, h: 0.3,
    fontFace: HEAD_FONT, fontSize: 11, color: INK, bold: true,
    margin: 0,
  });
  s.addText("> edge.bet/deck", {
    x: rightX + 2.3, y: 9.7, w: 3, h: 0.3,
    fontFace: HEAD_FONT, fontSize: 11, color: INK, bold: true,
    margin: 0,
  });

  addFooter(s, "THANK YOU · QUESTIONS WELCOME", "EDGE LABS, INC. · CONFIDENTIAL");
}

// ================================================================
// build
// ================================================================
slide1();
slide2();
slide3();
slide4();
slide5();
slide6();
slide7();
slide8();

pres.writeFile({ fileName: "SaaS_Deck.pptx" })
  .then((name) => console.log("Wrote " + name));
