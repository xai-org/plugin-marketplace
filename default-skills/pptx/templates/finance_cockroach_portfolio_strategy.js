/**
 * generate_deck.js
 *
 * Recreates "The Cockroach Portfolio" slide deck (12 slides, 16x9, dark theme)
 * using pptxgenjs. Coordinates, colors, fonts, and font sizes are extracted
 * from the original pptx's XML so this regenerates the deck byte-for-visual.
 *
 * Slide 6's waterfall chart is an embedded image in the original pptx.
 * This script references ./assets/image1.png for that slide. If the file is
 * missing, slide 6 renders without the chart (the right-hand callout card
 * is native and unaffected).
 *
 * Usage:
 *   npm install pptxgenjs
 *   node generate_deck.js
 *
 * Output: ./output/TheCockroachPortfolio.pptx
 */

const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

// -------------------------------------------------------------------------
// DESIGN TOKENS
// -------------------------------------------------------------------------
const C = {
  bg:         "000000",  // slide background
  card:       "111111",  // card / body-row background
  cardHead:   "1A1A1A",  // table-header / label-row background
  divider:    "333333",  // thin divider lines
  accent:     "4466FF",  // primary blue
  white:      "FFFFFF",
  textMute:   "999999",  // body gray
  textMute2:  "BBBBBB",  // slightly lighter gray (limitations slide)
  textFoot:   "666666",  // footer gray
  cellStrong: "7AC89A",  // matrix "Strong" cell fill
  cellStrongText: "0E2A3F",
  cellWeak:   "B5443D",  // matrix "Weak" cell fill
  cellMixed:  "111111",  // matrix "Mixed" cell fill
  sp500Bar:   "C8A96B",  // S&P 500 gold/tan series color
};

const F = {
  serif: "Source Serif Pro",
  sans:  "Source Sans Pro",
};

// -------------------------------------------------------------------------
// BOOTSTRAP
// -------------------------------------------------------------------------
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10" x 5.625"
pres.author = "Dylan Grice Framework";
pres.title  = "The Cockroach Portfolio";

// Reusable outer shadow (pptxgenjs mutates option objects — use a factory).
const makeShadow = () => ({
  type: "outer", color: "000000", blur: 8, offset: 3, angle: 135, opacity: 0.4,
});

// Footer that appears on slides 2..11 (and in modified form on 1 and 12).
function addStandardFooter(slide, pageNum) {
  slide.addText("CONFIDENTIAL", {
    x: 0.8, y: 5.25, w: 2.0, h: 0.25, margin: 0,
    fontFace: F.sans, fontSize: 9, color: C.textFoot,
    align: "left", valign: "middle",
  });
  slide.addText(`${pageNum} / 12`, {
    x: 9.0, y: 5.25, w: 0.7, h: 0.25, margin: 0,
    fontFace: F.sans, fontSize: 9, color: C.textFoot,
    align: "right", valign: "middle",
  });
}

// Eyebrow (e.g. "EXECUTIVE SUMMARY")
function addEyebrow(slide, text) {
  slide.addText(text, {
    x: 0.8, y: 0.45, w: 5.0, h: 0.3, margin: 0,
    fontFace: F.sans, fontSize: 11, bold: true, color: C.accent,
    charSpacing: 3, align: "left", valign: "middle",
  });
}

// Slide headline (26pt Serif)
function addHeadline(slide, text) {
  slide.addText(text, {
    x: 0.8, y: 0.85, w: 8.4, h: 0.7, margin: 0,
    fontFace: F.serif, fontSize: 26, bold: true, color: C.white,
    align: "left", valign: "middle",
  });
}

// =========================================================================
// SLIDE 1 — COVER
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  // Top thin blue bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.05, fill: { color: C.accent }, line: { color: C.accent },
  });

  // Bottom dark bar (subtle footer strip)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.3, w: 10, h: 0.325, fill: { color: C.card }, line: { color: C.card },
  });

  // Eyebrow
  s.addText("PORTFOLIO MANAGEMENT STRATEGY", {
    x: 0.8, y: 1.4, w: 5.544, h: 0.3, margin: 0,
    fontFace: F.sans, fontSize: 11, bold: true, color: C.accent,
    charSpacing: 3, align: "left", valign: "middle",
  });

  // Main title (50pt)
  s.addText([
    { text: "The Cockroach", options: { breakLine: true } },
    { text: "Portfolio" },
  ], {
    x: 0.8, y: 1.9, w: 8.0, h: 2.2, margin: 0,
    fontFace: F.serif, fontSize: 50, bold: true, color: C.white,
    align: "left", valign: "middle",
  });

  // Subtitle
  s.addText([
    { text: "A resilient, all-weather strategy for capital preservation", options: { breakLine: true } },
    { text: "and steady compounding across every economic regime." },
  ], {
    x: 0.8, y: 4.0, w: 6.0, h: 0.7, margin: 0,
    fontFace: F.sans, fontSize: 14, color: C.textMute,
    align: "left", valign: "middle", lineSpacingMultiple: 1.5,
  });

  // Footer tag line
  s.addText("DYLAN GRICE'S ORIGINAL FRAMEWORK  //  CONFIDENTIAL  //  2026", {
    x: 0.8, y: 5.32, w: 8.0, h: 0.28, margin: 0,
    fontFace: F.sans, fontSize: 9, color: C.textFoot,
    charSpacing: 3, align: "left", valign: "middle",
  });
}

// =========================================================================
// SLIDE 2 — EXECUTIVE SUMMARY  (three cards)
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addEyebrow(s, "EXECUTIVE SUMMARY");
  addHeadline(s, "8.5% CAGR, 22% max drawdown, 4 ETFs.");

  const cards = [
    { x: 0.8,  title: "THE PROBLEM",
      body: "Stock-bond correlation hits 0.85 in crises. Investors suffered -37% in 2008 and -60% real losses in the 1970s." },
    { x: 3.65, title: "THE SOLUTION",
      body: "25% equities, 25% bonds, 25% gold, 25% cash. Rebalanced quarterly. Each asset is purpose-built for one of four macro regimes: growth, inflation, deflation, and recession." },
    { x: 6.5,  title: "THE RESULT",
      body: "8.49% CAGR (2001-2026). 0.72 Sharpe ratio. 22% max drawdown vs. 55% for the S&P 500. Blended expense ratio under 0.09%, with full implementation possible in under 30 minutes." },
  ];
  const cardW = 2.7, cardY = 1.75, cardH = 3.2;

  cards.forEach(card => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: card.x, y: cardY, w: cardW, h: cardH,
      fill: { color: C.card }, line: { color: C.card },
      shadow: makeShadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: card.x, y: cardY, w: cardW, h: 0.05,
      fill: { color: C.accent }, line: { color: C.accent },
    });
    s.addText(card.title, {
      x: card.x + 0.2, y: cardY + 0.25, w: cardW - 0.4, h: 0.3, margin: 0,
      fontFace: F.sans, fontSize: 14, bold: true, color: C.accent,
      charSpacing: 3, align: "left", valign: "middle",
    });
    s.addText(card.body, {
      x: card.x + 0.2, y: cardY + 0.75, w: cardW - 0.4, h: 2.2, margin: 0,
      fontFace: F.sans, fontSize: 12, color: C.white,
      align: "left", valign: "top", lineSpacingMultiple: 1.4,
    });
  });

  s.addText("Source: Backtest via testfolio.io (2001-2026). Dividends reinvested, quarterly rebalance. Past performance not indicative of future results.", {
    x: 0.8, y: 5.05, w: 8.4, h: 0.2, margin: 0,
    fontFace: F.sans, fontSize: 8, italic: true, color: C.textFoot,
    align: "left", valign: "middle",
  });
  addStandardFooter(s, 2);
}

// =========================================================================
// SLIDE 3 — THE ORIGIN  (timeline + quote card)
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addEyebrow(s, "THE ORIGIN");
  addHeadline(s, "Survive first. The rest is optional.");

  const rows = [
    { year: "1982",
      title: "Browne's Permanent Portfolio",
      desc: "The original: 25% stocks, 25% bonds, 25% gold, 25% cash. Built for four macro regimes." },
    { year: "2012",
      title: "Dylan Grice coins the Cockroach",
      desc: "At SocGen, Grice framed capital preservation as evolutionary survival; a simple, maximally robust algorithm." },
    { year: "2020s",
      title: "Mutiny Fund revives the idea",
      desc: "Jason Buck and Taylor Pearson added trend following, long volatility, and crypto futures to the framework." },
  ];
  const topY = 1.7, rowGap = 1.15;

  rows.forEach((r, i) => {
    const y = topY + i * rowGap;

    // Year pill
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: y, w: 0.9, h: 0.38,
      fill: { color: C.accent }, line: { color: C.accent },
    });
    s.addText(r.year, {
      x: 0.8, y: y, w: 0.9, h: 0.38, margin: 0,
      fontFace: F.serif, fontSize: 13, bold: true, color: C.white,
      align: "center", valign: "middle",
    });

    // Connecting vertical line between pills (except after last)
    if (i < rows.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 1.22, y: y + 0.38, w: 0.05, h: rowGap - 0.38,
        fill: { color: C.divider }, line: { color: C.divider },
      });
    }

    // Row title
    s.addText(r.title, {
      x: 1.9, y: y - 0.12, w: 3.4, h: 0.35, margin: 0,
      fontFace: F.serif, fontSize: 12, bold: true, color: C.white,
      align: "left", valign: "middle",
    });

    // Row description
    s.addText(r.desc, {
      x: 1.9, y: y + 0.22, w: 3.5, h: 0.6, margin: 0,
      fontFace: F.sans, fontSize: 10, color: C.textMute,
      align: "left", valign: "top", lineSpacingMultiple: 1.3,
    });
  });

  // Quote card (right side)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.7, y: 1.75, w: 3.5, h: 3.2,
    fill: { color: C.card }, line: { color: C.card },
    shadow: makeShadow(),
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.7, y: 1.75, w: 0.05, h: 3.2,
    fill: { color: C.accent }, line: { color: C.accent },
  });
  s.addText([
    { text: "Cockroaches may not be able to build nuclear bombs, but they can withstand nuclear war.", options: { breakLine: true } },
    { text: " ", options: { breakLine: true } },
    { text: "They survive." },
  ], {
    x: 6.0, y: 2.05, w: 2.9, h: 1.9, margin: 0,
    fontFace: F.serif, fontSize: 15, italic: true, color: C.white,
    align: "left", valign: "middle", lineSpacingMultiple: 1.4,
  });
  s.addText("Dylan Grice, SocGen, 2012", {
    x: 6.0, y: 4.2, w: 2.9, h: 0.3, margin: 0,
    fontFace: F.sans, fontSize: 11, bold: true, color: C.accent,
    align: "left", valign: "middle",
  });

  addStandardFooter(s, 3);
}

// =========================================================================
// SLIDE 4 — THE FRAMEWORK  (4 rows: regime | asset | ticker)
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addEyebrow(s, "THE FRAMEWORK");
  addHeadline(s, "Four regimes. Four assets. 25% each.");

  const rows = [
    { regime: "GROWTH",    asset: "Equities",  ticker: "VTI / SPY" },
    { regime: "INFLATION", asset: "Gold",      ticker: "GLD / IAUM" },
    { regime: "DEFLATION", asset: "Gov. Bonds", ticker: "TLT / GOVT" },
    { regime: "RECESSION", asset: "Cash",      ticker: "BIL / SHV" },
  ];
  const rowH = 0.73, topY = 1.78;

  rows.forEach((r, i) => {
    const y = topY + i * rowH;

    s.addText(r.regime, {
      x: 0.8, y: y, w: 2.0, h: 0.5, margin: 0,
      fontFace: F.sans, fontSize: 16, bold: true, color: C.accent,
      charSpacing: 3, align: "left", valign: "middle",
    });

    s.addText(r.asset, {
      x: 3.5, y: y - 0.05, w: 3.5, h: 0.6, margin: 0,
      fontFace: F.serif, fontSize: 28, bold: true, color: C.white,
      align: "center", valign: "middle",
    });

    s.addText(r.ticker, {
      x: 6.5, y: y, w: 2.7, h: 0.5, margin: 0,
      fontFace: F.sans, fontSize: 13, color: C.textMute,
      charSpacing: 1, align: "right", valign: "middle",
    });

    // Divider line between rows (not after last)
    if (i < rows.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: y + rowH - 0.04, w: 8.4, h: 0.01,
        fill: { color: C.divider }, line: { color: C.divider },
      });
    }
  });

  addStandardFooter(s, 4);
}

// =========================================================================
// SLIDE 5 — REGIME MAPPING  (5x5 matrix table)
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addEyebrow(s, "REGIME MAPPING");
  addHeadline(s, "Every row has a strong cell.");

  // Build the 5-column, 5-row colored matrix.
  const hdrStyle = { fill: { color: C.cardHead }, color: C.accent, bold: true,
                     fontFace: F.sans, fontSize: 14, align: "center", valign: "middle" };
  const rowHdrStyle = { fill: { color: C.cardHead }, color: C.white, bold: true,
                        fontFace: F.sans, fontSize: 14, align: "center", valign: "middle" };
  const strong = { fill: { color: C.cellStrong }, color: C.cellStrongText, bold: true,
                   fontFace: F.sans, fontSize: 12, align: "center", valign: "middle" };
  const weak   = { fill: { color: C.cellWeak },   color: C.white, bold: true,
                   fontFace: F.sans, fontSize: 12, align: "center", valign: "middle" };
  const mixed  = { fill: { color: C.cellMixed },  color: C.white,
                   fontFace: F.sans, fontSize: 12, align: "center", valign: "middle" };

  const table = [
    [ { text: "", options: { fill: { color: C.cardHead } } },
      { text: "GROWTH",    options: hdrStyle },
      { text: "INFLATION", options: hdrStyle },
      { text: "DEFLATION", options: hdrStyle },
      { text: "RECESSION", options: hdrStyle } ],
    [ { text: "Equities",   options: rowHdrStyle },
      { text: "Strong", options: strong }, { text: "Weak", options: weak },
      { text: "Mixed",  options: mixed  }, { text: "Weak", options: weak } ],
    [ { text: "Gov. Bonds", options: rowHdrStyle },
      { text: "Mixed",  options: mixed  }, { text: "Weak",   options: weak },
      { text: "Strong", options: strong }, { text: "Strong", options: strong } ],
    [ { text: "Gold",       options: rowHdrStyle },
      { text: "Mixed",  options: mixed  }, { text: "Strong", options: strong },
      { text: "Mixed",  options: mixed  }, { text: "Strong", options: strong } ],
    [ { text: "Cash",       options: rowHdrStyle },
      { text: "Weak",   options: weak   }, { text: "Mixed",  options: mixed  },
      { text: "Strong", options: strong }, { text: "Strong", options: strong } ],
  ];

  s.addTable(table, {
    x: 0.8, y: 1.75, w: 8.4,
    colW: [1.5, 1.725, 1.725, 1.725, 1.725],
    rowH: [0.5, 0.55, 0.55, 0.55, 0.55],
    border: { type: "solid", color: C.bg, pt: 1 },
  });

  s.addText("In 2022 inflation, gold held flat while stocks fell 25% and bonds fell 17%. The cockroach always has ballast.", {
    x: 0.8, y: 4.58, w: 8.1, h: 0.42, margin: 0,
    fontFace: F.sans, fontSize: 12, italic: true, color: C.textMute,
    align: "left", valign: "middle",
  });

  addStandardFooter(s, 5);
}

// =========================================================================
// SLIDE 6 — HISTORICAL PERFORMANCE  (waterfall image + stat callout card)
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addEyebrow(s, "HISTORICAL PERFORMANCE");
  addHeadline(s, "96% of S&P returns. 40% of S&P risk.");

  // Waterfall chart (original deck embeds this as image1.png)
  const imagePath = path.join(__dirname, "assets", "image1.png");
  if (fs.existsSync(imagePath)) {
    s.addImage({
      path: imagePath,
      x: 0.3, y: 1.65, w: 6.5, h: 3.3,
    });
  } else {
    // Graceful fallback — placeholder box so the rest of the slide renders
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.3, y: 1.65, w: 6.5, h: 3.3,
      fill: { color: C.card }, line: { color: C.divider, width: 1 },
    });
    s.addText("(assets/image1.png missing — waterfall chart not rendered)", {
      x: 0.3, y: 1.65, w: 6.5, h: 3.3, margin: 0,
      fontFace: F.sans, fontSize: 10, color: C.textFoot,
      align: "center", valign: "middle",
    });
  }

  // Stat callout card (right)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.9, y: 1.75, w: 2.3, h: 3.2,
    fill: { color: C.card }, line: { color: C.card },
    shadow: makeShadow(),
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.9, y: 1.75, w: 0.05, h: 3.2,
    fill: { color: C.accent }, line: { color: C.accent },
  });

  s.addText("$100K in 2001", {
    x: 7.15, y: 1.95, w: 1.8, h: 0.3, margin: 0,
    fontFace: F.sans, fontSize: 12, bold: true, color: C.white,
    align: "left", valign: "middle",
  });
  s.addText("$685K", {
    x: 7.15, y: 2.3, w: 1.8, h: 0.6, margin: 0,
    fontFace: F.serif, fontSize: 32, bold: true, color: C.accent,
    align: "left", valign: "middle",
  });
  s.addText("Cockroach", {
    x: 7.15, y: 2.9, w: 1.8, h: 0.25, margin: 0,
    fontFace: F.sans, fontSize: 11, color: C.accent,
    align: "left", valign: "middle",
  });
  s.addText("$735K", {
    x: 7.15, y: 3.25, w: 1.8, h: 0.6, margin: 0,
    fontFace: F.serif, fontSize: 32, bold: true, color: C.textMute,
    align: "left", valign: "middle",
  });
  s.addText("S&P 500", {
    x: 7.15, y: 3.85, w: 1.8, h: 0.25, margin: 0,
    fontFace: F.sans, fontSize: 11, color: C.textMute,
    align: "left", valign: "middle",
  });
  s.addText([
    { text: "Similar endpoint.", options: { breakLine: true } },
    { text: "Very different journey." },
  ], {
    x: 7.15, y: 4.2, w: 1.8, h: 0.6, margin: 0,
    fontFace: F.serif, fontSize: 13, italic: true, color: C.white,
    align: "left", valign: "middle", lineSpacingMultiple: 1.3,
  });

  addStandardFooter(s, 6);
}

// =========================================================================
// SLIDE 7 — THE VOLATILITY TAX  (4-row table + key insight card)
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addEyebrow(s, "THE VOLATILITY TAX");
  addHeadline(s, "A 50% loss needs 100% to recover.");

  const hdrS = { fill: { color: C.cardHead }, color: C.accent, bold: true,
                 fontFace: F.sans, fontSize: 14, align: "center", valign: "middle" };
  const lossCell = (fill) => ({ fill: { color: fill }, color: C.accent, bold: true,
                                fontFace: F.sans, fontSize: 18, align: "center", valign: "middle" });
  const gainCell = (fill) => ({ fill: { color: fill }, color: C.white,
                                fontFace: F.sans, fontSize: 18, align: "center", valign: "middle" });
  const recCell  = (fill) => ({ fill: { color: fill }, color: C.textMute,
                                fontFace: F.sans, fontSize: 16, align: "center", valign: "middle" });

  const fillAlt = (i) => (i % 2 === 0 ? C.card : C.cardHead);

  const tbl = [
    [ { text: "LOSS",           options: hdrS },
      { text: "GAIN TO RECOVER", options: hdrS },
      { text: "EST. RECOVERY",   options: hdrS } ],
  ];
  const rowsData = [
    ["-10%", "+11%",  "1 yr"],
    ["-25%", "+33%",  "2 yrs"],
    ["-50%", "+100%", "4-5 yrs"],
    ["-75%", "+300%", "10+ yrs"],
  ];
  rowsData.forEach((r, i) => {
    const f = fillAlt(i);
    tbl.push([
      { text: r[0], options: lossCell(f) },
      { text: r[1], options: gainCell(f) },
      { text: r[2], options: recCell(f)  },
    ]);
  });

  s.addTable(tbl, {
    x: 0.8, y: 1.75, w: 5.0,
    colW: [1.5, 1.75, 1.75],
    rowH: [0.45, 0.55, 0.55, 0.55, 0.55],
    border: { type: "solid", color: C.bg, pt: 1 },
  });

  // Key insight card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.9, y: 1.75, w: 3.3, h: 2.65,
    fill: { color: C.card }, line: { color: C.card },
    shadow: makeShadow(),
  });
  s.addText("KEY INSIGHT", {
    x: 6.15, y: 1.9, w: 2.8, h: 0.25, margin: 0,
    fontFace: F.sans, fontSize: 14, bold: true, color: C.accent,
    charSpacing: 3, align: "left", valign: "middle",
  });
  s.addText("A 10% return punctuated by 50% crashes loses to a steady 5% return.", {
    x: 6.15, y: 2.3, w: 2.8, h: 1.3, margin: 0,
    fontFace: F.sans, fontSize: 14, color: C.white,
    align: "left", valign: "middle", lineSpacingMultiple: 1.4,
  });
  s.addText([
    { text: "Cockroach recovers in ~2 years.", options: { breakLine: true } },
    { text: "S&P 500: 4+ years post-2008." },
  ], {
    x: 6.15, y: 3.65, w: 2.8, h: 0.7, margin: 0,
    fontFace: F.sans, fontSize: 11, color: C.textMute,
    align: "left", valign: "middle", lineSpacingMultiple: 1.4,
  });

  addStandardFooter(s, 7);
}

// =========================================================================
// SLIDE 8 — THE REBALANCING EDGE  (4 step cards + bottom banner)
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addEyebrow(s, "THE REBALANCING EDGE");
  addHeadline(s, "Buy low, sell high. Every quarter.");

  const steps = [
    { num: "01", head: "ASSET RISES",  body: "One holding outperforms, its weight exceeds 25%" },
    { num: "02", head: "TRIM WINNER",  body: "Rebalancing forces selling high-performing assets" },
    { num: "03", head: "ASSET FALLS",  body: "One holding slips under target weight" },
    { num: "04", head: "BUY LOW",      body: "Rebalancing buys the dip" },
  ];
  const cardW = 1.9125, cardH = 1.7, cardY = 1.8417;
  // Original card x-positions: 0.8, 2.9625, 5.125, 7.2875 (stride = 2.1625)
  const startX = 0.8, stride = 2.1625;

  steps.forEach((st, i) => {
    const x = startX + i * stride;

    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: cardY, w: cardW, h: cardH,
      fill: { color: C.card }, line: { color: C.card },
      shadow: makeShadow(),
    });

    s.addText(st.num, {
      x: x + 0.15, y: cardY + 0.13, w: 0.8, h: 0.5, margin: 0,
      fontFace: F.serif, fontSize: 28, bold: true, color: C.accent,
      align: "left", valign: "middle",
    });
    s.addText(st.head, {
      x: x + 0.15, y: cardY + 0.62, w: cardW - 0.25, h: 0.3, margin: 0,
      fontFace: F.sans, fontSize: 11, bold: true, color: C.white,
      charSpacing: 3, align: "left", valign: "middle",
    });
    s.addText(st.body, {
      x: x + 0.15, y: cardY + 1.0, w: cardW - 0.25, h: 0.65, margin: 0,
      fontFace: F.sans, fontSize: 10.5, color: C.textMute,
      align: "left", valign: "top", lineSpacingMultiple: 1.3,
    });
  });

  // Bottom summary bar (with top accent strip)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 3.84, w: 8.4, h: 0.9,
    fill: { color: C.card }, line: { color: C.card },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 3.84, w: 8.4, h: 0.05,
    fill: { color: C.accent }, line: { color: C.accent },
  });
  s.addText([
    { text: "Rebalancing converts uncorrelated volatility into a structural return premium.", options: { breakLine: true } },
    { text: "Research estimates this premium at 0.5 to 1.0% annually." },
  ], {
    x: 1.0, y: 3.99, w: 8.0, h: 0.65, margin: 0,
    fontFace: F.sans, fontSize: 13, color: C.white,
    align: "left", valign: "middle", lineSpacingMultiple: 1.3,
  });

  addStandardFooter(s, 8);
}

// =========================================================================
// SLIDE 9 — CRISIS RESILIENCE  (native bar chart + "why it works" card)
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addEyebrow(s, "CRISIS RESILIENCE");
  addHeadline(s, "Worst crash: -12% vs. -55% S&P.");

  // Clustered column chart: Cockroach vs S&P 500 peak-to-trough drawdowns
  const chartData = [
    { name: "Cockroach", labels: ["Dot-Com\n2001-02", "GFC\n2008", "COVID\n2020", "Inflation\n2022"],
      values: [5, 12, 8, 7] },
    { name: "S&P 500",   labels: ["Dot-Com\n2001-02", "GFC\n2008", "COVID\n2020", "Inflation\n2022"],
      values: [49, 55, 34, 25] },
  ];

  s.addChart(pres.charts.BAR, chartData, {
    x: 0.8, y: 1.85, w: 5.8, h: 3.0,
    barDir: "col",
    barGapWidthPct: 150,
    chartColors: [C.accent, C.sp500Bar],
    chartArea: { fill: { color: C.bg } },
    plotArea:  { fill: { color: C.bg } },

    // Title
    showTitle: true, title: "Peak-to-Trough Drawdown (%, absolute)",
    titleFontFace: F.sans, titleFontSize: 11, titleColor: C.white,

    // Axes
    catAxisLabelFontFace: F.sans, catAxisLabelFontSize: 11, catAxisLabelColor: C.textMute,
    valAxisLabelFontFace: F.sans, valAxisLabelFontSize: 12, valAxisLabelColor: C.textFoot,
    valAxisMaxVal: 80, valAxisMinVal: 0,
    valGridLine: { style: "none" },
    catGridLine: { style: "none" },
    valAxisLineColor: "888888",
    catAxisLineColor: "888888",

    // Data labels
    showValue: true,
    dataLabelFontFace: F.sans, dataLabelFontSize: 10, dataLabelColor: C.white,
    dataLabelPosition: "outEnd",

    // Legend
    showLegend: true, legendPos: "b",
    legendFontFace: F.sans, legendFontSize: 11, legendColor: C.white,
  });

  // Right card: WHY IT WORKS
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.6, y: 1.85, w: 2.6, h: 3.0,
    fill: { color: C.card }, line: { color: C.card },
    shadow: makeShadow(),
  });
  s.addText("WHY IT WORKS", {
    x: 6.8, y: 2.05, w: 2.2, h: 0.25, margin: 0,
    fontFace: F.sans, fontSize: 14, bold: true, color: C.accent,
    charSpacing: 3, align: "left", valign: "middle",
  });
  const notes = [
    { t: "2001: Bonds saved it",  y: 2.5 },
    { t: "2008: Bonds +28%",      y: 2.9 },
    { t: "2020: Gold +25%",       y: 3.3 },
    { t: "2022: Gold held flat",  y: 3.7 },
  ];
  notes.forEach(n => {
    s.addText(n.t, {
      x: 6.8, y: n.y, w: 2.2, h: 0.35, margin: 0,
      fontFace: F.sans, fontSize: 12, color: C.textMute,
      align: "left", valign: "middle",
    });
  });
  s.addText([
    { text: "Every crisis had", options: { breakLine: true } },
    { text: "a ballast asset." },
  ], {
    x: 6.8, y: 4.15, w: 2.2, h: 0.5, margin: 0,
    fontFace: F.serif, fontSize: 15, italic: true, color: C.white,
    align: "left", valign: "middle", lineSpacingMultiple: 1.2,
  });

  addStandardFooter(s, 9);
}

// =========================================================================
// SLIDE 10 — LIMITATIONS  (4 accented rows)
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addEyebrow(s, "LIMITATIONS");
  addHeadline(s, "Survival, at the cost of upside.");

  const rows = [
    { label: "Bull Market Lag",
      desc: "With 75% outside equities, the cockroach trails the S&P 500 by ~2% CAGR in sustained rallies like 2010-2021." },
    { label: "Tax Drag",
      desc: "Quarterly rebalancing triggers taxable events. After-tax drag: 0.3-0.5% annually. Use tax-advantaged accounts." },
    { label: "Cash Drag",
      desc: "25% in cash/T-Bills earns under 1% when rates are near zero. This was a cost from 2009-2021." },
    { label: "Gold Has No Yield",
      desc: "Gold pays no dividends and fell 28% in 2013. Its role is crisis hedge, not return generator." },
  ];
  const startY = 1.75, gap = 0.77;

  rows.forEach((r, i) => {
    const y = startY + i * gap;

    // Left blue accent bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: y, w: 0.05, h: 0.5,
      fill: { color: C.accent }, line: { color: C.accent },
    });

    s.addText(r.label, {
      x: 1.0, y: y, w: 2.7, h: 0.5, margin: 0,
      fontFace: F.serif, fontSize: 18, bold: true, color: C.white,
      align: "left", valign: "middle",
    });
    s.addText(r.desc, {
      x: 3.85, y: y - 0.05, w: 5.35, h: 0.6, margin: 0,
      fontFace: F.sans, fontSize: 13, color: C.textMute2,
      align: "left", valign: "middle", lineSpacingMultiple: 1.3,
    });
  });

  addStandardFooter(s, 10);
}

// =========================================================================
// SLIDE 11 — IMPLEMENTATION  (5-column ETF table + bottom banner)
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addEyebrow(s, "IMPLEMENTATION");
  addHeadline(s, "4 ETFs. Under 0.09%. 30 min setup.");

  const hdr = { fill: { color: C.cardHead }, color: C.accent, bold: true,
                fontFace: F.sans, fontSize: 14, align: "center", valign: "middle" };
  const aClassCell = (fill) => ({ fill: { color: fill }, color: C.accent, bold: true,
                                  fontFace: F.sans, fontSize: 14, align: "center", valign: "middle" });
  const bodyCell   = (fill) => ({ fill: { color: fill }, color: C.white,
                                  fontFace: F.sans, fontSize: 16, align: "center", valign: "middle" });
  const fillAlt = (i) => (i % 2 === 0 ? C.card : C.cardHead);

  const rowsData = [
    ["Equities",   "VTI or SPY",   "0.03%", "25%", "Growth offense"],
    ["Gov. Bonds", "TLT or GOVT",  "0.05%", "25%", "Deflation defense"],
    ["Gold",       "GLD or IAUM",  "0.09%", "25%", "Inflation hedge"],
    ["Cash",       "BIL or SHV",   "0.05%", "25%", "Recession stability"],
  ];

  const tbl = [[
    { text: "ASSET\nCLASS", options: hdr },
    { text: "ETF",   options: hdr },
    { text: "COST",  options: hdr },
    { text: "WEIGHT", options: hdr },
    { text: "ROLE",  options: hdr },
  ]];
  rowsData.forEach((r, i) => {
    const f = fillAlt(i);
    tbl.push([
      { text: r[0], options: aClassCell(f) },
      { text: r[1], options: bodyCell(f) },
      { text: r[2], options: bodyCell(f) },
      { text: r[3], options: bodyCell(f) },
      { text: r[4], options: bodyCell(f) },
    ]);
  });

  s.addTable(tbl, {
    x: 0.8, y: 1.75, w: 8.4,
    colW: [1.5, 1.6, 1.2, 1.1, 3.0],
    rowH: [0.45, 0.5, 0.5, 0.5, 0.5],
    border: { type: "solid", color: C.bg, pt: 1 },
  });

  // Bottom banner
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 4.3, w: 8.4, h: 0.65,
    fill: { color: C.card }, line: { color: C.card },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 4.3, w: 8.4, h: 0.05,
    fill: { color: C.accent }, line: { color: C.accent },
  });
  s.addText("Rebalance quarterly (Jan / Apr / Jul / Oct). If any asset drifts beyond +/-5% from target, rebalance all to equal weight. Estimated cost: under $10 per quarter.", {
    x: 1.0, y: 4.42, w: 8.0, h: 0.5, margin: 0,
    fontFace: F.sans, fontSize: 12, color: C.textMute,
    align: "left", valign: "middle", lineSpacingMultiple: 1.3,
  });

  addStandardFooter(s, 11);
}

// =========================================================================
// SLIDE 12 — NEXT STEPS  (3 stacked step rows + bottom brand strip)
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  // Top blue bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.05, fill: { color: C.accent }, line: { color: C.accent },
  });

  addEyebrow(s, "NEXT STEPS");
  addHeadline(s, "3 moves. 2 one-time. 1 forever.");

  const steps = [
    { num: "01", title: "Select ETFs and fund accounts",
      desc: "Choose one ETF per asset class. Fund with equal 25% splits. Prefer tax-advantaged accounts (IRA/401k).",
      tag: "WEEK 1" },
    { num: "02", title: "Set quarterly rebalance calendar",
      desc: "Schedule 4 dates per year. First trading day of Jan, Apr, Jul. About 30 minutes each.",
      tag: "WEEK 1" },
    { num: "03", title: "Define tolerance bands",
      desc: "Only rebalance when any asset drifts beyond +/-5% from 25% target. Reduces unnecessary trades and tax events.",
      tag: "ONGOING" },
  ];
  const topY = 1.75, rowH = 0.9, rowGap = 1.1;

  steps.forEach((st, i) => {
    const y = topY + i * rowGap;

    // Row card
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: y, w: 8.4, h: rowH,
      fill: { color: C.card }, line: { color: C.card },
      shadow: makeShadow(),
    });

    // Step number
    s.addText(st.num, {
      x: 1.0, y: y + 0.15, w: 0.85, h: 0.55, margin: 0,
      fontFace: F.serif, fontSize: 26, bold: true, color: C.accent,
      align: "left", valign: "middle",
    });

    // Title
    s.addText(st.title, {
      x: 1.85, y: y + 0.12, w: 5.5, h: 0.35, margin: 0,
      fontFace: F.serif, fontSize: 16, bold: true, color: C.white,
      align: "left", valign: "middle",
    });

    // Description
    s.addText(st.desc, {
      x: 1.85, y: y + 0.47, w: 5.8, h: 0.4, margin: 0,
      fontFace: F.sans, fontSize: 12, color: C.textMute,
      align: "left", valign: "top", lineSpacingMultiple: 1.3,
    });

    // Tag pill
    s.addShape(pres.shapes.RECTANGLE, {
      x: 8.05, y: y + 0.25, w: 1.0, h: 0.4,
      fill: { color: C.accent }, line: { color: C.accent },
    });
    s.addText(st.tag, {
      x: 8.05, y: y + 0.25, w: 1.0, h: 0.4, margin: 0,
      fontFace: F.sans, fontSize: 10, bold: true, color: C.white,
      charSpacing: 1, align: "center", valign: "middle",
    });
  });

  // Bottom brand strip
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.3, w: 10, h: 0.325,
    fill: { color: C.card }, line: { color: C.card },
  });
  s.addText("COCKROACH PORTFOLIO  //  SURVIVE. COMPOUND. PROSPER.  //  CONFIDENTIAL", {
    x: 0.8, y: 5.32, w: 8.0, h: 0.28, margin: 0,
    fontFace: F.sans, fontSize: 9, color: C.textFoot,
    charSpacing: 3, align: "left", valign: "middle",
  });
}

// -------------------------------------------------------------------------
// WRITE FILE
// -------------------------------------------------------------------------
const outDir = path.join(__dirname, "output");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

pres.writeFile({ fileName: path.join(outDir, "TheCockroachPortfolio.pptx") })
  .then(f => console.log(`✔ Wrote ${f}`))
  .catch(err => { console.error(err); process.exit(1); });
