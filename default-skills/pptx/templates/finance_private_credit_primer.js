// Replica of Private_Credit.pptx — built with pptxgenjs
// Run: node private_credit.js  →  produces Private_Credit.pptx

const pptxgen = require("pptxgenjs");

// ─── Palette ──────────────────────────────────────────────
const BG        = "EFEAE0"; // warm cream background
const BG_CARD   = "F5F0E6"; // slightly lighter card on cream
const DARK_BG   = "2B2824"; // dark card / dark slide background
const DARK_TEXT = "1A1A1A"; // near-black body
const MUTED     = "7A756D"; // muted gray-brown for labels/meta
const MUTED_LT  = "A89F93"; // lighter muted for footers on dark
const ACCENT    = "B85C38"; // terracotta/rust accent
const RULE      = "CFC7B9"; // thin divider color on cream
const RULE_DK   = "4A443E"; // divider on dark
const CREAM_TX  = "EFEAE0"; // cream text on dark bg

// Fonts
const HEADER_FONT = "Arial";
const BODY_FONT   = "Arial";

const pres = new pptxgen();
pres.layout  = "LAYOUT_WIDE";   // 13.333" × 7.5"
pres.author  = "Retail Primer";
pres.title   = "Private Credit — A Retail Primer";

const W = 13.333;
const H = 7.5;
const MARGIN = 0.6;

// ─── Helpers ──────────────────────────────────────────────
function addHeaderFooter(slide, opts) {
  const {
    eyebrowLeft = "",
    pageNum     = "",
    footerLeft  = "PRIVATE CREDIT · A RETAIL PRIMER",
    footerRight = "",
    dark        = false,
  } = opts || {};

  const metaColor   = dark ? MUTED_LT : MUTED;
  const footerColor = dark ? MUTED_LT : MUTED;

  // Top-left eyebrow
  if (eyebrowLeft) {
    slide.addText(eyebrowLeft, {
      x: MARGIN, y: 0.35, w: 8, h: 0.3,
      fontSize: 10, fontFace: HEADER_FONT,
      color: metaColor, charSpacing: 4, bold: false, margin: 0,
    });
  }
  // Top-right page number
  if (pageNum) {
    slide.addText(pageNum, {
      x: W - MARGIN - 2, y: 0.35, w: 2, h: 0.3,
      fontSize: 10, fontFace: HEADER_FONT,
      color: metaColor, charSpacing: 4, align: "right", margin: 0,
    });
  }
  // Bottom-left footer
  if (footerLeft) {
    slide.addText(footerLeft, {
      x: MARGIN, y: H - 0.55, w: 8, h: 0.3,
      fontSize: 10, fontFace: HEADER_FONT,
      color: footerColor, charSpacing: 4, margin: 0,
    });
  }
  // Bottom-right footer
  if (footerRight) {
    slide.addText(footerRight, {
      x: W - MARGIN - 5, y: H - 0.55, w: 5, h: 0.3,
      fontSize: 10, fontFace: HEADER_FONT,
      color: footerColor, charSpacing: 4, align: "right", margin: 0,
    });
  }
}

// ═══════════════════════════════════════════════════════════
// SLIDE 1 — Title
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  addHeaderFooter(s, {
    eyebrowLeft: "A RETAIL PRIMER · 2026",
    pageNum:     "10 MIN READ",
    footerLeft:  "INTRODUCTION · DEFINITIONS · MARKET · PLAYERS · ACCESS",
    footerRight: "01 / 10",
  });

  // Huge title "Private Credit."
  s.addText(
    [
      { text: "Private ", options: { color: DARK_TEXT, bold: false } },
      { text: "Credit.",   options: { color: ACCENT,    italic: true } },
    ],
    {
      x: MARGIN, y: 1.3, w: W - 2 * MARGIN, h: 2.2,
      fontSize: 110, fontFace: HEADER_FONT, valign: "top", margin: 0,
    }
  );

  // Thin divider rule
  s.addShape(pres.shapes.LINE, {
    x: MARGIN, y: 4.55, w: 5.5, h: 0,
    line: { color: RULE, width: 0.75 },
  });

  // Subtitle below rule
  s.addText(
    "The $1.7 trillion corner of finance that used to belong only to institutions.",
    {
      x: MARGIN, y: 4.8, w: 6.2, h: 1.0,
      fontSize: 18, fontFace: BODY_FONT,
      color: DARK_TEXT, margin: 0,
    }
  );
}

// ═══════════════════════════════════════════════════════════
// SLIDE 2 — Definition
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  addHeaderFooter(s, {
    eyebrowLeft: "01 · DEFINITION",
    pageNum:     "02 / 10",
    footerRight: "DEFINITION",
  });

  // Small eyebrow label
  s.addText("WHAT IS PRIVATE CREDIT?", {
    x: MARGIN, y: 1.3, w: 8, h: 0.35,
    fontSize: 11, fontFace: HEADER_FONT,
    color: MUTED, charSpacing: 4, margin: 0,
  });

  // Big definition text (rich)
  s.addText(
    [
      { text: "Loans made ",                           options: { color: DARK_TEXT } },
      { text: "directly",                              options: { color: ACCENT, italic: true } },
      { text: " from non-bank lenders to mostly private companies — negotiated one-on-one, held to maturity, and ",
                                                       options: { color: DARK_TEXT } },
      { text: "never traded",                          options: { color: ACCENT, italic: true } },
      { text: " on a public market.",                  options: { color: DARK_TEXT } },
    ],
    {
      x: MARGIN, y: 1.8, w: W - 2 * MARGIN, h: 2.6,
      fontSize: 36, fontFace: HEADER_FONT, valign: "top",
      paraSpaceAfter: 0, margin: 0,
    }
  );

  // Divider rule above the three columns
  s.addShape(pres.shapes.LINE, {
    x: MARGIN, y: 5.0, w: W - 2 * MARGIN, h: 0,
    line: { color: RULE, width: 0.75 },
  });

  // 3 columns
  const colW = (W - 2 * MARGIN) / 3;
  const cols = [
    { label: "WHO LENDS",   body: "Asset managers, credit funds, BDCs — not banks." },
    { label: "WHO BORROWS", body: "Mid-market companies, often PE-backed." },
    { label: "HOW IT PAYS", body: "Floating-rate coupon, typically 8–12% gross." },
  ];
  cols.forEach((c, i) => {
    const x = MARGIN + i * colW;
    s.addText(c.label, {
      x: x + 0.15, y: 5.25, w: colW - 0.3, h: 0.35,
      fontSize: 10, fontFace: HEADER_FONT,
      color: ACCENT, charSpacing: 4, margin: 0,
    });
    s.addText(c.body, {
      x: x + 0.15, y: 5.6, w: colW - 0.3, h: 1.0,
      fontSize: 14, fontFace: BODY_FONT, color: DARK_TEXT, margin: 0,
    });
  });
}

// ═══════════════════════════════════════════════════════════
// SLIDE 3 — How it differs (two cards: light + dark)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  addHeaderFooter(s, {
    eyebrowLeft: "02 · HOW IT DIFFERS",
    pageNum:     "03 / 10",
    footerRight: "COMPARISON",
  });

  // Title
  s.addText("Two ways a company can borrow.", {
    x: MARGIN, y: 1.0, w: W - 2 * MARGIN, h: 0.8,
    fontSize: 40, fontFace: HEADER_FONT, color: DARK_TEXT, margin: 0,
  });

  // Subtitle
  s.addText("Same economic purpose — very different instruments, investors, and liquidity.", {
    x: MARGIN, y: 1.85, w: W - 2 * MARGIN, h: 0.4,
    fontSize: 14, fontFace: BODY_FONT, color: MUTED, margin: 0,
  });

  // Cards geometry
  const cardY = 2.45, cardH = 4.35;
  const gap = 0.3;
  const cardW = (W - 2 * MARGIN - gap) / 2;
  const leftX  = MARGIN;
  const rightX = MARGIN + cardW + gap;

  // LEFT card (light)
  s.addShape(pres.shapes.RECTANGLE, {
    x: leftX, y: cardY, w: cardW, h: cardH,
    fill: { color: BG_CARD }, line: { color: RULE, width: 0.75 },
  });
  // RIGHT card (dark)
  s.addShape(pres.shapes.RECTANGLE, {
    x: rightX, y: cardY, w: cardW, h: cardH,
    fill: { color: DARK_BG }, line: { type: "none" },
  });

  // Header labels
  const cardPadX = 0.35;
  s.addText("PUBLIC DEBT", {
    x: leftX + cardPadX, y: cardY + 0.3, w: cardW - 2 * cardPadX, h: 0.3,
    fontSize: 11, fontFace: HEADER_FONT, color: MUTED, charSpacing: 4, margin: 0,
  });
  s.addText("Bonds & syndicated loans", {
    x: leftX + cardPadX, y: cardY + 0.6, w: cardW - 2 * cardPadX, h: 0.55,
    fontSize: 24, fontFace: HEADER_FONT, color: DARK_TEXT, margin: 0,
  });
  s.addText("PRIVATE CREDIT", {
    x: rightX + cardPadX, y: cardY + 0.3, w: cardW - 2 * cardPadX, h: 0.3,
    fontSize: 11, fontFace: HEADER_FONT, color: MUTED_LT, charSpacing: 4, margin: 0,
  });
  s.addText("Direct, negotiated loans", {
    x: rightX + cardPadX, y: cardY + 0.6, w: cardW - 2 * cardPadX, h: 0.55,
    fontSize: 24, fontFace: HEADER_FONT, color: CREAM_TX, margin: 0,
  });

  // Divider under title of each card
  s.addShape(pres.shapes.LINE, {
    x: leftX + cardPadX, y: cardY + 1.3, w: cardW - 2 * cardPadX, h: 0,
    line: { color: RULE, width: 0.5 },
  });
  s.addShape(pres.shapes.LINE, {
    x: rightX + cardPadX, y: cardY + 1.3, w: cardW - 2 * cardPadX, h: 0,
    line: { color: RULE_DK, width: 0.5 },
  });

  // Rows
  const rows = [
    ["FORMAT",    "Standardised, tradable securities sold to many investors.",
                  "Bespoke contracts between one lender (or a small club) and the borrower."],
    ["PRICING",   "Marked to market daily — visible price swings.",
                  "Held at fair value — smoother reported returns."],
    ["LIQUIDITY", "High. Sell any business day.",
                  "Low. Usually locked up for years."],
    ["YIELD",     "Lower. Reflects broad demand and transparency.",
                  "Higher — an \"illiquidity premium\" of ~2–4%."],
    ["COVENANTS", "Often \"covenant-lite.\"",
                  "Stronger. Lender negotiates directly."],
  ];

  const rowStart = cardY + 1.45;
  const rowH     = (cardH - 1.6) / rows.length;
  const labelW   = 1.5;

  rows.forEach((r, i) => {
    const y = rowStart + i * rowH;

    // Light card row
    s.addText(r[0], {
      x: leftX + cardPadX, y: y + 0.1, w: labelW, h: 0.3,
      fontSize: 10, fontFace: HEADER_FONT,
      color: MUTED, charSpacing: 4, margin: 0,
    });
    s.addText(r[1], {
      x: leftX + cardPadX + labelW, y: y + 0.05,
      w: cardW - 2 * cardPadX - labelW, h: rowH - 0.1,
      fontSize: 12, fontFace: BODY_FONT, color: DARK_TEXT, margin: 0, valign: "top",
    });

    // Dark card row
    s.addText(r[0], {
      x: rightX + cardPadX, y: y + 0.1, w: labelW, h: 0.3,
      fontSize: 10, fontFace: HEADER_FONT,
      color: MUTED_LT, charSpacing: 4, margin: 0,
    });
    s.addText(r[2], {
      x: rightX + cardPadX + labelW, y: y + 0.05,
      w: cardW - 2 * cardPadX - labelW, h: rowH - 0.1,
      fontSize: 12, fontFace: BODY_FONT, color: CREAM_TX, margin: 0, valign: "top",
    });

    // Row separator (skip before first row)
    if (i > 0) {
      s.addShape(pres.shapes.LINE, {
        x: leftX + cardPadX, y: y, w: cardW - 2 * cardPadX, h: 0,
        line: { color: RULE, width: 0.5 },
      });
      s.addShape(pres.shapes.LINE, {
        x: rightX + cardPadX, y: y, w: cardW - 2 * cardPadX, h: 0,
        line: { color: RULE_DK, width: 0.5 },
      });
    }
  });
}

// ═══════════════════════════════════════════════════════════
// SLIDE 4 — Why it grew (4 columns with stats)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  addHeaderFooter(s, {
    eyebrowLeft: "03 · WHY IT GREW",
    pageNum:     "04 / 10",
    footerRight: "DRIVERS",
  });

  s.addText("Four forces reshaped who lends to whom.", {
    x: MARGIN, y: 1.0, w: W - 2 * MARGIN, h: 0.8,
    fontSize: 40, fontFace: HEADER_FONT, color: DARK_TEXT, margin: 0,
  });

  s.addText("Post-2008, banks pulled back from mid-market lending. Asset managers filled the gap.", {
    x: MARGIN, y: 1.85, w: W - 2 * MARGIN, h: 0.4,
    fontSize: 14, fontFace: BODY_FONT, color: MUTED, margin: 0,
  });

  // Top rule
  const topY = 2.45;
  s.addShape(pres.shapes.LINE, {
    x: MARGIN, y: topY, w: W - 2 * MARGIN, h: 0,
    line: { color: RULE, width: 0.5 },
  });
  // Bottom rule
  const botY = 6.6;
  s.addShape(pres.shapes.LINE, {
    x: MARGIN, y: botY, w: W - 2 * MARGIN, h: 0,
    line: { color: RULE, width: 0.5 },
  });

  const items = [
    { num: "01", head: "Banks retreated.",  body: "Basel III and Dodd-Frank made leveraged mid-market loans expensive for banks to hold.",
      stat: "−50%",  lbl: "BANK SHARE OF LBO DEBT, '08–'23" },
    { num: "02", head: "PE needed debt.",   body: "Private equity buyouts surged — and they need reliable, flexible lenders at closing.",
      stat: "$8T",   lbl: "GLOBAL PRIVATE EQUITY AUM, 2025" },
    { num: "03", head: "Yield was scarce.", body: "A decade of near-zero rates pushed pensions and insurers hunting for income.",
      stat: "0.25%", lbl: "FED FUNDS RATE, A DECADE OF ZIRP" },
    { num: "04", head: "Rates rose.",       body: "Floating-rate loans suddenly paid 10%+ as central banks hiked — the fastest AUM growth on record.",
      stat: "11.8%", lbl: "AVG. DIRECT-LENDING YIELD, 2024" },
  ];

  const colW = (W - 2 * MARGIN) / 4;
  items.forEach((it, i) => {
    const x = MARGIN + i * colW;

    // Vertical separators between columns
    if (i > 0) {
      s.addShape(pres.shapes.LINE, {
        x: x, y: topY + 0.2, w: 0, h: botY - topY - 0.4,
        line: { color: RULE, width: 0.5 },
      });
    }

    // Number
    s.addText(it.num, {
      x: x + 0.25, y: topY + 0.35, w: colW - 0.5, h: 0.35,
      fontSize: 12, fontFace: HEADER_FONT, color: ACCENT, margin: 0,
    });
    // Head
    s.addText(it.head, {
      x: x + 0.25, y: topY + 0.75, w: colW - 0.5, h: 0.5,
      fontSize: 20, fontFace: HEADER_FONT, color: DARK_TEXT, margin: 0,
    });
    // Body
    s.addText(it.body, {
      x: x + 0.25, y: topY + 1.3, w: colW - 0.5, h: 1.4,
      fontSize: 12, fontFace: BODY_FONT, color: DARK_TEXT, margin: 0, valign: "top",
    });
    // Stat (big accent number)
    s.addText(it.stat, {
      x: x + 0.25, y: topY + 3.0, w: colW - 0.5, h: 0.8,
      fontSize: 44, fontFace: HEADER_FONT, color: ACCENT, margin: 0,
    });
    // Stat label
    s.addText(it.lbl, {
      x: x + 0.25, y: topY + 3.85, w: colW - 0.5, h: 0.5,
      fontSize: 9, fontFace: HEADER_FONT, color: MUTED, charSpacing: 3, margin: 0, valign: "top",
    });
  });
}

// ═══════════════════════════════════════════════════════════
// SLIDE 5 — Market today (bar chart + scale check)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  addHeaderFooter(s, {
    eyebrowLeft: "04 · THE MARKET TODAY",
    pageNum:     "05 / 10",
    footerRight: "MARKET SIZE · ILLUSTRATIVE",
  });

  // Title with accent figures
  s.addText(
    [
      { text: "From ",             options: { color: DARK_TEXT } },
      { text: "$0.4T",             options: { color: ACCENT, italic: true } },
      { text: " to ",              options: { color: DARK_TEXT } },
      { text: "$1.7T",             options: { color: ACCENT, italic: true } },
      { text: " in a decade.",     options: { color: DARK_TEXT } },
    ],
    {
      x: MARGIN, y: 1.0, w: W - 2 * MARGIN, h: 0.8,
      fontSize: 40, fontFace: HEADER_FONT, margin: 0,
    }
  );

  s.addText(
    "Global private credit AUM. Illustrative figures — Preqin, BlackRock, IMF Global Financial Stability Report.",
    {
      x: MARGIN, y: 1.85, w: W - 2 * MARGIN - 4, h: 0.6,
      fontSize: 14, fontFace: BODY_FONT, color: MUTED, margin: 0,
    }
  );

  // ——— Left side: manual bar chart ———
  const chartX = MARGIN;
  const chartY = 3.1;
  const chartW = 6.3;
  const chartH = 3.6;
  const years  = ["2014", "2018", "2022", "2025", "2030 E"];
  const values = [0.4, 0.7, 1.2, 1.7, 2.8];
  const labels = ["$0.4T", "$0.7T", "$1.2T", "$1.7T", "~$2.8T"];
  const maxVal = 2.8;
  const barMaxH = 2.8;           // max bar height in inches
  const barBaseY = chartY + barMaxH + 0.5;
  const nBars = values.length;
  const slotW = chartW / nBars;
  const barW  = 0.75;            // inches

  // Baseline rule
  s.addShape(pres.shapes.LINE, {
    x: chartX, y: barBaseY + 0.02, w: chartW, h: 0,
    line: { color: RULE, width: 0.5 },
  });

  values.forEach((v, i) => {
    const h = (v / maxVal) * barMaxH;
    const cx = chartX + i * slotW + (slotW - barW) / 2;
    const by = barBaseY - h;

    let fill = DARK_BG;
    if (i === 3) fill = ACCENT;           // 2025 highlighted
    if (i === 4) fill = "D4C9B3";         // forecast = pale beige

    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: by, w: barW, h: h,
      fill: { color: fill }, line: { type: "none" },
    });

    // Value label above bar
    s.addText(labels[i], {
      x: cx - 0.3, y: by - 0.45, w: barW + 0.6, h: 0.4,
      fontSize: 16, fontFace: HEADER_FONT, color: DARK_TEXT,
      align: "center", margin: 0,
    });
    // Year label below
    s.addText(years[i], {
      x: cx - 0.3, y: barBaseY + 0.12, w: barW + 0.6, h: 0.35,
      fontSize: 12, fontFace: BODY_FONT, color: MUTED,
      align: "center", margin: 0,
    });
  });

  // ——— Right side: scale check ———
  const rx = 7.4;
  s.addText("SCALE CHECK", {
    x: rx, y: 3.1, w: 5, h: 0.3,
    fontSize: 10, fontFace: HEADER_FONT, color: ACCENT, charSpacing: 4, margin: 0,
  });

  s.addText("~4× larger than a decade ago.", {
    x: rx, y: 3.5, w: W - rx - MARGIN, h: 1.3,
    fontSize: 28, fontFace: HEADER_FONT, color: DARK_TEXT, margin: 0,
  });

  // Two mini stat blocks
  const miniY = 5.25;
  s.addText("STILL SMALLER THAN", {
    x: rx, y: miniY, w: 2.6, h: 0.3,
    fontSize: 9, fontFace: HEADER_FONT, color: MUTED, charSpacing: 3, margin: 0,
  });
  s.addText("Global public bond markets ($140T).", {
    x: rx, y: miniY + 0.3, w: 2.6, h: 0.7,
    fontSize: 13, fontFace: BODY_FONT, color: DARK_TEXT, margin: 0,
  });

  s.addText("NOW LARGER THAN", {
    x: rx + 2.8, y: miniY, w: 2.6, h: 0.3,
    fontSize: 9, fontFace: HEADER_FONT, color: MUTED, charSpacing: 3, margin: 0,
  });
  s.addText("Global high-yield bonds ($1.5T).", {
    x: rx + 2.8, y: miniY + 0.3, w: 2.6, h: 0.7,
    fontSize: 13, fontFace: BODY_FONT, color: DARK_TEXT, margin: 0,
  });
}

// ═══════════════════════════════════════════════════════════
// SLIDE 6 — Who runs the money (2x3 card grid)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  addHeaderFooter(s, {
    eyebrowLeft: "05 · WHO RUNS THE MONEY",
    pageNum:     "06 / 10",
    footerRight: "PLAYERS · ILLUSTRATIVE",
  });

  s.addText("Six managers run roughly half the market.", {
    x: MARGIN, y: 1.0, w: W - 2 * MARGIN, h: 0.8,
    fontSize: 36, fontFace: HEADER_FONT, color: DARK_TEXT, margin: 0,
  });
  s.addText("The industry is concentrated — scale is a competitive advantage in sourcing deals.", {
    x: MARGIN, y: 1.8, w: W - 2 * MARGIN, h: 0.4,
    fontSize: 14, fontFace: BODY_FONT, color: MUTED, margin: 0,
  });

  const cards = [
    { n: "01", cat: "DIRECT LENDING",  name: "Apollo Global",
      body: "Acquired Credit Suisse's securitized products arm; pairs insurance balance sheet with direct lending.",
      tier: 1 },
    { n: "02", cat: "DIRECT LENDING",  name: "Blackstone Credit",
      body: "World's largest alternative credit platform; pioneer of the retail-friendly BXPE / BCRED vehicles.",
      tier: 1 },
    { n: "03", cat: "DIRECT LENDING",  name: "Ares Management",
      body: "One of the earliest specialist credit managers; deep mid-market sponsor relationships.",
      tier: 1 },
    { n: "04", cat: "MULTI-STRATEGY",  name: "KKR Credit",
      body: "Leverages the broader KKR PE network; growing fast in asset-based finance.",
      tier: 2 },
    { n: "05", cat: "MULTI-STRATEGY",  name: "Oaktree / Brookfield",
      body: "Distressed-debt heritage; strong in complex and stressed credit situations.",
      tier: 2 },
    { n: "06", cat: "DIRECT LENDING",  name: "HPS Investment Ptrs.",
      body: "Independent specialist — acquired by BlackRock in 2025, now anchoring its private-markets build-out.",
      tier: 2 },
  ];

  const gridX = MARGIN;
  const gridY = 2.35;
  const gridW = W - 2 * MARGIN;
  const gridH = 4.55;
  const colsN = 3, rowsN = 2;
  const gap = 0.2;
  const cW = (gridW - (colsN - 1) * gap) / colsN;
  const cH = (gridH - (rowsN - 1) * gap) / rowsN;

  cards.forEach((c, i) => {
    const col = i % colsN;
    const row = Math.floor(i / colsN);
    const x = gridX + col * (cW + gap);
    const y = gridY + row * (cH + gap);

    // Card
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cW, h: cH,
      fill: { color: BG_CARD }, line: { color: RULE, width: 0.5 },
    });

    // Top meta
    s.addText(`${c.n} · ${c.cat}`, {
      x: x + 0.3, y: y + 0.3, w: cW - 0.6, h: 0.3,
      fontSize: 10, fontFace: HEADER_FONT, color: MUTED, charSpacing: 3, margin: 0,
    });

    // Name
    s.addText(c.name, {
      x: x + 0.3, y: y + 0.65, w: cW - 0.6, h: 0.5,
      fontSize: 22, fontFace: HEADER_FONT, color: DARK_TEXT, margin: 0,
    });

    // AUM TIER indicator position (sits near card bottom)
    const dotY = y + cH - 0.35;
    const dotSize = 0.14;

    // Body — height capped so it cannot bleed into the dot row
    s.addText(c.body, {
      x: x + 0.3, y: y + 1.2, w: cW - 0.6, h: (dotY - 0.1) - (y + 1.2),
      fontSize: 12, fontFace: BODY_FONT, color: DARK_TEXT, margin: 0, valign: "top",
    });

    const filled = c.tier === 1 ? 5 : 3;
    for (let d = 0; d < 5; d++) {
      s.addShape(pres.shapes.OVAL, {
        x: x + 0.3 + d * 0.23, y: dotY, w: dotSize, h: dotSize,
        fill: { color: d < filled ? DARK_TEXT : RULE },
        line: { type: "none" },
      });
    }
    s.addText(`AUM TIER ${c.tier}`, {
      x: x + 0.3 + 5 * 0.23 + 0.1, y: dotY - 0.04, w: cW - 1.8, h: 0.3,
      fontSize: 9, fontFace: HEADER_FONT, color: MUTED, charSpacing: 3, margin: 0,
    });
  });
}

// ═══════════════════════════════════════════════════════════
// SLIDE 7 — Access for retail (table)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  addHeaderFooter(s, {
    eyebrowLeft: "06 · ACCESS FOR RETAIL",
    pageNum:     "07 / 10",
    footerRight: "PRODUCTS · ILLUSTRATIVE TERMS",
  });

  s.addText("Four wrappers now open the door to retail.", {
    x: MARGIN, y: 0.95, w: W - 2 * MARGIN, h: 0.8,
    fontSize: 36, fontFace: HEADER_FONT, color: DARK_TEXT, margin: 0,
  });
  s.addText("They trade off liquidity, minimums, and fees — not all retail products are created equal.", {
    x: MARGIN, y: 1.8, w: W - 2 * MARGIN, h: 0.4,
    fontSize: 14, fontFace: BODY_FONT, color: MUTED, margin: 0,
  });

  // Table geometry
  const tx = MARGIN, ty = 2.3;
  const tw = W - 2 * MARGIN;
  // Column widths (sum to tw)
  const cw = [2.2, 4.0, 1.9, 2.1, 1.9]; // wrapper, what-it-is, min, liq, fees
  const cxs = [];
  { let acc = tx; cw.forEach(w => { cxs.push(acc); acc += w; }); }

  // Header row
  const headerY = ty;
  const headerH = 0.5;
  s.addShape(pres.shapes.LINE, {
    x: tx, y: headerY, w: tw, h: 0,
    line: { color: RULE, width: 0.5 },
  });
  const headers = ["WRAPPER", "WHAT IT IS", "MINIMUM", "LIQUIDITY", "TYPICAL FEES"];
  headers.forEach((h, i) => {
    s.addText(h, {
      x: cxs[i] + 0.1, y: headerY + 0.12, w: cw[i] - 0.2, h: 0.3,
      fontSize: 10, fontFace: HEADER_FONT, color: MUTED, charSpacing: 3, margin: 0,
    });
  });
  s.addShape(pres.shapes.LINE, {
    x: tx, y: headerY + headerH + 0.05, w: tw, h: 0,
    line: { color: RULE, width: 0.5 },
  });

  // Data rows
  const rows = [
    { name: "Public BDC",     sub: "EXCHANGE-TRADED",
      what: "Business Development Companies — listed closed-end funds that lend to mid-market.",
      min: "One share (≈ $20)",   liq: "Daily, on exchange",        fees: "1.5% + 20% over hurdle" },
    { name: "Non-traded BDC", sub: "\"PERPETUAL BDC\"",
      what: "Not exchange-listed; monthly subscriptions, quarterly redemption windows.",
      min: "$2,500",              liq: "Quarterly, ≤5% of NAV",     fees: "1.25% + 12.5% over hurdle" },
    { name: "Interval fund",  sub: "'40 ACT WRAPPER",
      what: "Mutual-fund-like structure holding private loans; mandatory repurchase offers.",
      min: "$1,000",              liq: "Quarterly, 5–25% of NAV",   fees: "0.95 – 1.75% all-in" },
    { name: "ELTIF / LTAF",   sub: "EU & UK RETAIL",
      what: "European Long-Term Investment Fund / UK Long-Term Asset Fund — retail private-markets wrapper.",
      min: "€10,000",             liq: "Monthly – quarterly",       fees: "1.0 – 1.5% + performance" },
  ];

  const rowsTop = headerY + headerH + 0.05;
  const rowH    = (H - 1.0 - rowsTop) / rows.length;   // fit above footer

  rows.forEach((r, i) => {
    const y = rowsTop + i * rowH;

    // row bottom divider
    if (i < rows.length) {
      s.addShape(pres.shapes.LINE, {
        x: tx, y: y + rowH, w: tw, h: 0,
        line: { color: RULE, width: 0.5 },
      });
    }

    // Wrapper name + sub (sub sits right under the name)
    s.addText(r.name, {
      x: cxs[0] + 0.1, y: y + 0.15, w: cw[0] - 0.2, h: 0.5,
      fontSize: 18, fontFace: HEADER_FONT, color: DARK_TEXT, margin: 0, valign: "top",
    });
    s.addText(r.sub, {
      x: cxs[0] + 0.1, y: y + 0.6, w: cw[0] - 0.2, h: 0.28,
      fontSize: 9, fontFace: HEADER_FONT, color: MUTED, charSpacing: 3, margin: 0,
    });

    // What it is
    s.addText(r.what, {
      x: cxs[1] + 0.1, y: y + 0.2, w: cw[1] - 0.2, h: rowH - 0.3,
      fontSize: 12, fontFace: BODY_FONT, color: DARK_TEXT, margin: 0, valign: "top",
    });
    // Minimum
    s.addText(r.min, {
      x: cxs[2] + 0.1, y: y + 0.2, w: cw[2] - 0.2, h: rowH - 0.3,
      fontSize: 12, fontFace: BODY_FONT, color: DARK_TEXT, margin: 0, valign: "top",
    });
    // Liquidity
    s.addText(r.liq, {
      x: cxs[3] + 0.1, y: y + 0.2, w: cw[3] - 0.2, h: rowH - 0.3,
      fontSize: 12, fontFace: BODY_FONT, color: DARK_TEXT, margin: 0, valign: "top",
    });
    // Fees
    s.addText(r.fees, {
      x: cxs[4] + 0.1, y: y + 0.2, w: cw[4] - 0.2, h: rowH - 0.3,
      fontSize: 12, fontFace: BODY_FONT, color: DARK_TEXT, margin: 0, valign: "top",
    });
  });
}

// ═══════════════════════════════════════════════════════════
// SLIDE 8 — What can go wrong (risks list)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  addHeaderFooter(s, {
    eyebrowLeft: "07 · WHAT CAN GO WRONG",
    pageNum:     "08 / 10",
    footerRight: "RISKS",
  });

  // Title
  s.addText(
    [
      { text: "Higher yield is ", options: { color: DARK_TEXT } },
      { text: "never free.",      options: { color: ACCENT, italic: true } },
    ],
    {
      x: MARGIN, y: 1.0, w: W - 2 * MARGIN, h: 0.8,
      fontSize: 40, fontFace: HEADER_FONT, margin: 0,
    }
  );

  s.addText("Five risks every retail investor should price before buying.", {
    x: MARGIN, y: 1.85, w: W - 2 * MARGIN, h: 0.4,
    fontSize: 14, fontFace: BODY_FONT, color: MUTED, margin: 0,
  });

  const items = [
    { n: "01", h: "Illiquidity",        b: "Your money can be locked up for 3–7 years. Even \"semi-liquid\" vehicles can gate redemptions in stress — Blackstone's BCRED hit its redemption cap in 2023." },
    { n: "02", h: "Valuation opacity",  b: "Loans are marked by the manager, not a market. Reported returns look smooth — actual risk may be masked until a default surfaces." },
    { n: "03", h: "Credit cycle",       b: "Defaults sit near historic lows (~2%). A recession could push losses higher on leveraged mid-market borrowers." },
    { n: "04", h: "Fees stack up",      b: "Management + performance + platform fees can reach 3–4% a year, quietly consuming the yield premium." },
    { n: "05", h: "Systemic unknowns",  b: "The IMF and BoE have flagged rapid retail growth and interconnections with insurance as areas to watch." },
  ];

  const listTop = 2.45;
  const listBot = H - 0.9;
  const rowH = (listBot - listTop) / items.length;

  // Top border
  s.addShape(pres.shapes.LINE, {
    x: MARGIN, y: listTop, w: W - 2 * MARGIN, h: 0,
    line: { color: RULE, width: 0.5 },
  });

  items.forEach((it, i) => {
    const y = listTop + i * rowH;
    // number
    s.addText(it.n, {
      x: MARGIN, y: y + 0.2, w: 0.8, h: 0.4,
      fontSize: 14, fontFace: HEADER_FONT, color: ACCENT, margin: 0,
    });
    // heading
    s.addText(it.h, {
      x: MARGIN + 1.0, y: y + 0.2, w: 3.0, h: 0.5,
      fontSize: 20, fontFace: HEADER_FONT, color: DARK_TEXT, margin: 0,
    });
    // body
    s.addText(it.b, {
      x: MARGIN + 4.2, y: y + 0.25, w: W - MARGIN * 2 - 4.2, h: rowH - 0.25,
      fontSize: 13, fontFace: BODY_FONT, color: DARK_TEXT, margin: 0, valign: "top",
    });
    // row bottom rule
    s.addShape(pres.shapes.LINE, {
      x: MARGIN, y: y + rowH, w: W - 2 * MARGIN, h: 0,
      line: { color: RULE, width: 0.5 },
    });
  });
}

// ═══════════════════════════════════════════════════════════
// SLIDE 9 — Retail playbook (5 big numbered columns)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  addHeaderFooter(s, {
    eyebrowLeft: "08 · RETAIL PLAYBOOK",
    pageNum:     "09 / 10",
    footerRight: "PLAYBOOK",
  });

  s.addText("Five questions before you allocate.", {
    x: MARGIN, y: 1.0, w: W - 2 * MARGIN, h: 0.8,
    fontSize: 40, fontFace: HEADER_FONT, color: DARK_TEXT, margin: 0,
  });
  s.addText("Treat private credit as a yield complement — not a substitute for liquidity.", {
    x: MARGIN, y: 1.85, w: W - 2 * MARGIN, h: 0.4,
    fontSize: 14, fontFace: BODY_FONT, color: MUTED, margin: 0,
  });

  const items = [
    { n: "1", h: "Can you lock it up?",  b: "Only commit money you will not need for 3–5 years minimum." },
    { n: "2", h: "What's the wrapper?",  b: "Public BDC vs. interval fund vs. ELTIF — liquidity and fees differ sharply." },
    { n: "3", h: "Who is lending?",      b: "Pick scaled, tenured managers with visible loss history across cycles." },
    { n: "4", h: "What does it cost?",   b: "Compute the total expense ratio — not just the headline management fee." },
    { n: "5", h: "Right-size it.",       b: "A 5–15% sleeve inside a diversified portfolio is a common advisor range." },
  ];

  const topY = 2.55;
  const botY = H - 0.9;
  const colW = (W - 2 * MARGIN) / items.length;

  items.forEach((it, i) => {
    const x = MARGIN + i * colW;

    // Vertical separators
    if (i > 0) {
      s.addShape(pres.shapes.LINE, {
        x: x, y: topY + 0.1, w: 0, h: botY - topY - 0.2,
        line: { color: RULE, width: 0.5 },
      });
    }

    // Big number
    s.addText(it.n, {
      x: x + 0.3, y: topY, w: colW - 0.6, h: 1.3,
      fontSize: 80, fontFace: HEADER_FONT, color: ACCENT, margin: 0, valign: "top",
    });
    // Heading
    s.addText(it.h, {
      x: x + 0.3, y: topY + 1.4, w: colW - 0.6, h: 0.5,
      fontSize: 16, fontFace: HEADER_FONT, color: DARK_TEXT, margin: 0,
    });
    // Body
    s.addText(it.b, {
      x: x + 0.3, y: topY + 1.95, w: colW - 0.6, h: 2.0,
      fontSize: 12, fontFace: BODY_FONT, color: DARK_TEXT, margin: 0, valign: "top",
    });
  });
}

// ═══════════════════════════════════════════════════════════
// SLIDE 10 — Takeaways (DARK slide)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: DARK_BG };

  addHeaderFooter(s, {
    eyebrowLeft: "TAKEAWAYS",
    pageNum:     "10 / 10",
    footerLeft:  "PRIVATE CREDIT · A RETAIL PRIMER · 2026",
    footerRight: "END",
    dark: true,
  });

  // Eyebrow
  s.addText("IN ONE PAGE", {
    x: MARGIN, y: 1.3, w: 8, h: 0.3,
    fontSize: 11, fontFace: HEADER_FONT, color: MUTED_LT, charSpacing: 4, margin: 0,
  });

  // Huge title with accent
  s.addText(
    [
      { text: "A higher yield, in exchange for ", options: { color: CREAM_TX } },
      { text: "time & trust.",                    options: { color: ACCENT, italic: true } },
    ],
    {
      x: MARGIN, y: 1.75, w: W - 2 * MARGIN, h: 2.8,
      fontSize: 64, fontFace: HEADER_FONT, margin: 0, valign: "top",
    }
  );

  // 3 takeaway columns
  const takeaways = [
    { lbl: "REMEMBER", head: "Not a bond",           body: "It's a loan you own until maturity. Smooth marks hide real credit risk." },
    { lbl: "VALUE",    head: "The premium is real", body: "~2–4% extra yield for giving up liquidity and accepting manager discretion." },
    { lbl: "ACTION",   head: "Small, slow, scaled", body: "Allocate a modest sleeve, pick a large manager, and leave it alone for the full term." },
  ];

  const tY = 5.35;
  const tW = (W - 2 * MARGIN) / 3;
  takeaways.forEach((t, i) => {
    const x = MARGIN + i * tW;

    s.addText(t.lbl, {
      x, y: tY, w: tW - 0.4, h: 0.3,
      fontSize: 11, fontFace: HEADER_FONT, color: ACCENT, charSpacing: 4, margin: 0,
    });
    s.addText(t.head, {
      x, y: tY + 0.35, w: tW - 0.4, h: 0.5,
      fontSize: 22, fontFace: HEADER_FONT, color: CREAM_TX, margin: 0,
    });
    s.addText(t.body, {
      x, y: tY + 0.95, w: tW - 0.4, h: 1.2,
      fontSize: 13, fontFace: BODY_FONT, color: CREAM_TX, margin: 0, valign: "top",
    });
  });
}

// ─── Write file ──────────────────────────────────────────
pres.writeFile({ fileName: "Private_Credit.pptx" })
  .then(name => console.log("Wrote:", name))
  .catch(err => { console.error(err); process.exit(1); });
