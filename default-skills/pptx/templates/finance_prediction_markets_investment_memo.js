// Poly_Market_vs_Kalshi replica — pptxgenjs
const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.title = "Prediction Markets Investment Memo";
pres.author = "J.P. Morgan — Associate Review";

// ---------- Palette ----------
const COLORS = {
  bg: "F1EDE3",       // warm cream background
  card: "F7F3E8",     // slightly lighter card fill
  ink: "0F1724",      // primary near-black navy
  inkSoft: "1E2A3A",  // slightly softer ink for body
  body: "2A3440",     // body copy
  muted: "8A8576",    // muted warm grey for labels/eyebrows
  rule: "C9C3B2",     // thin rule / card border
  gold: "C08B3C",     // gold accent
  green: "2D4A3E",    // dark forest green (bar charts)
  red: "8B2C2C",      // dark red bullet (risks)
  darkBg: "0F1724",   // dark slide background
  onDark: "F1EDE3",   // light text on dark
  onDarkMuted: "8A8576",
};

const FONT_HEAD = "Calibri"; // using clean sans; header font
const FONT_BODY = "Calibri";

// Slide size constants (inches)
const W = 13.333;
const H = 7.5;
const M = 0.83; // left/right margin

// Helper — eyebrow text (small caps, spaced)
function addEyebrow(slide, text, opts = {}) {
  slide.addText(text, {
    x: opts.x ?? M,
    y: opts.y ?? 0.42,
    w: opts.w ?? 6,
    h: 0.3,
    fontFace: FONT_HEAD,
    fontSize: 9.5,
    color: opts.color ?? COLORS.muted,
    bold: false,
    charSpacing: 4,
    align: opts.align ?? "left",
    margin: 0,
  });
}

// Helper — top/bottom page rule lines and footer
function addChrome(slide, eyebrowLeft, eyebrowRight, pageNum, footerRight = "PREDICTION MARKETS THESIS", darkMode = false) {
  const muted = darkMode ? COLORS.onDarkMuted : COLORS.muted;
  const rule = darkMode ? "2A3440" : COLORS.rule;

  // Top eyebrows
  addEyebrow(slide, eyebrowLeft, { x: M, y: 0.5, w: 6, color: muted });
  addEyebrow(slide, eyebrowRight, { x: W - M - 6, y: 0.5, w: 6, align: "right", color: muted });

  // Top rule
  slide.addShape(pres.shapes.LINE, {
    x: M, y: 0.85, w: W - 2 * M, h: 0,
    line: { color: rule, width: 0.5 },
  });

  // Bottom rule
  slide.addShape(pres.shapes.LINE, {
    x: M, y: 6.82, w: W - 2 * M, h: 0,
    line: { color: rule, width: 0.5 },
  });

  // Footer: page num + right caption
  addEyebrow(slide, pageNum, { x: M, y: 6.95, w: 3, color: muted });
  addEyebrow(slide, footerRight, { x: W - M - 6, y: 6.95, w: 6, align: "right", color: muted });
}

// =========================================================
// SLIDE 1 — Title / Cover
// =========================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };

  addChrome(
    s,
    "PREDICTION MARKETS / INVESTMENT MEMO",
    "Q2 2026 · CONFIDENTIAL DRAFT",
    "01 / 09",
    "PREDICTION MARKETS THESIS"
  );

  // Eyebrow above headline
  addEyebrow(s, "CATEGORY THESIS", { x: M, y: 1.35, w: 6, color: COLORS.muted });

  // Headline — "Prediction markets, priced." with gold italic "priced"
  s.addText(
    [
      { text: "Prediction markets, ", options: { color: COLORS.ink, bold: false } },
      { text: "priced", options: { color: COLORS.gold, italic: true } },
      { text: ".", options: { color: COLORS.ink } },
    ],
    {
      x: M, y: 1.75, w: W - 2 * M, h: 1.8,
      fontFace: FONT_HEAD,
      fontSize: 72,
      bold: false,
      align: "left",
      valign: "top",
      margin: 0,
    }
  );

  // Subhead
  s.addText(
    "A liquidity and depth comparison of Kalshi and Polymarket —\nand the case for taking an early position in the category.",
    {
      x: M, y: 4.25, w: 8, h: 1.2,
      fontFace: FONT_BODY,
      fontSize: 18,
      color: COLORS.body,
      align: "left",
      valign: "top",
      margin: 0,
      paraSpaceAfter: 4,
    }
  );

  // Bottom info card with border, two columns
  s.addShape(pres.shapes.RECTANGLE, {
    x: M, y: 5.85, w: W - 2 * M, h: 0.75,
    fill: { type: "none" },
    line: { color: COLORS.rule, width: 0.75 },
  });

  // Column 1: PREPARED FOR
  addEyebrow(s, "PREPARED FOR", { x: M + 0.25, y: 5.95, w: 3, color: COLORS.muted });
  s.addText("Associate review — J.P. Morgan", {
    x: M + 0.25, y: 6.2, w: 4, h: 0.35,
    fontFace: FONT_BODY, fontSize: 13, color: COLORS.ink, margin: 0,
  });

  // Column 2: HORIZON
  addEyebrow(s, "HORIZON", { x: M + 3.9, y: 5.95, w: 3, color: COLORS.muted });
  s.addText("Pre-IPO / late-stage secondary", {
    x: M + 3.9, y: 6.2, w: 5, h: 0.35,
    fontFace: FONT_BODY, fontSize: 13, color: COLORS.ink, margin: 0,
  });
}

// =========================================================
// SLIDE 2 — The category has arrived + 3 stats
// =========================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addChrome(s, "01 · CATEGORY", "THE CATEGORY HAS ARRIVED", "02 / 09");

  // Headline
  s.addText("The category has arrived.", {
    x: M, y: 1.15, w: W - 2 * M, h: 0.9,
    fontFace: FONT_HEAD, fontSize: 44, color: COLORS.ink, margin: 0,
  });

  // Intro paragraph
  s.addText(
    "What was a crypto-adjacent curiosity in 2020 is now a regulated, venture-backed asset class with exchange-grade infrastructure and institutional counter-parties on both sides of the book.",
    {
      x: M, y: 2.05, w: 9.5, h: 1.1,
      fontFace: FONT_BODY, fontSize: 16, color: COLORS.body, margin: 0,
    }
  );

  // Three stats
  const colW = (W - 2 * M) / 3;
  const stats = [
    {
      big: [
        { text: "~$25", options: { color: COLORS.ink } },
        { text: "B", options: { color: COLORS.gold, italic: true, fontSize: 36 } },
      ],
      label: "EST. 2025 CUMULATIVE NOTIONAL",
      body: "Traded across the two leading venues during the 2024 U.S. election cycle and its aftermath.",
    },
    {
      big: [
        { text: "14×", options: { color: COLORS.ink } },
      ],
      label: "YOY VOLUME GROWTH",
      body: "Peak monthly turnover at the category leader vs. the same month prior year.",
    },
    {
      big: [
        { text: "2", options: { color: COLORS.ink } },
        { text: "/2", options: { color: COLORS.gold, italic: true, fontSize: 36 } },
      ],
      label: "LEADERS NOW REGULATED-COMPLIANT IN U.S.",
      body: "CFTC-recognized DCM status or equivalent onshore pathway established for both venues.",
    },
  ];

  stats.forEach((st, i) => {
    const cx = M + i * colW;
    // Big number
    s.addText(st.big, {
      x: cx, y: 3.55, w: colW - 0.4, h: 1.0,
      fontFace: FONT_HEAD, fontSize: 64, bold: false,
      align: "left", valign: "top", margin: 0,
    });
    // Label
    addEyebrow(s, st.label, { x: cx, y: 4.75, w: colW - 0.4, color: COLORS.muted });
    // Body
    s.addText(st.body, {
      x: cx, y: 5.05, w: colW - 0.4, h: 1.3,
      fontFace: FONT_BODY, fontSize: 12, color: COLORS.body, margin: 0,
    });
  });
}

// =========================================================
// SLIDE 3 — Two leaders, divergent rails (two cards)
// =========================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addChrome(s, "02 · STRUCTURE", "TWO LEADERS, DIVERGENT RAILS", "03 / 09");

  s.addText("Two leaders, divergent rails.", {
    x: M, y: 1.15, w: W - 2 * M, h: 0.9,
    fontFace: FONT_HEAD, fontSize: 44, color: COLORS.ink, margin: 0,
  });

  s.addText(
    "Same product category, meaningfully different distribution, settlement, and regulatory posture.",
    {
      x: M, y: 2.05, w: 11, h: 0.5,
      fontFace: FONT_BODY, fontSize: 14, color: COLORS.body, margin: 0,
    }
  );

  const cardY = 2.95;
  const cardH = 3.3;
  const cardW = (W - 2 * M - 0.5) / 2;

  const cards = [
    {
      x: M,
      label: "VENUE A",
      name: "Kalshi",
      badge: "CFTC-REGULATED DCM",
      badgeColor: COLORS.gold,
      rows: [
        ["RAILS", "USD, ACH, card · fiat-native"],
        ["SETTLEMENT", "Cash-settled event contracts"],
        ["JURISDICTION", "U.S. onshore, KYC required"],
        ["BREADTH", "Econ, weather, macro, sports, politics"],
        ["PRIMARY EDGE", "Institutional-friendly compliance wrapper"],
      ],
    },
    {
      x: M + cardW + 0.5,
      label: "VENUE B",
      name: "Polymarket",
      badge: "ON-CHAIN · USDC",
      badgeColor: COLORS.muted,
      rows: [
        ["RAILS", "USDC on Polygon · crypto-native"],
        ["SETTLEMENT", "UMA optimistic oracle resolution"],
        ["JURISDICTION", "Global; re-entering U.S. via licensed affiliate"],
        ["BREADTH", "Politics, geopolitics, culture, crypto, sports"],
        ["PRIMARY EDGE", "Listing speed & long-tail market creation"],
      ],
    },
  ];

  cards.forEach((c) => {
    // Card
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: cardY, w: cardW, h: cardH,
      fill: { color: COLORS.card },
      line: { color: COLORS.rule, width: 0.75 },
    });

    // Venue label
    addEyebrow(s, c.label, { x: c.x + 0.3, y: cardY + 0.25, w: 2, color: COLORS.muted });

    // Venue name
    s.addText(c.name, {
      x: c.x + 0.3, y: cardY + 0.5, w: 3.5, h: 0.55,
      fontFace: FONT_HEAD, fontSize: 26, bold: true, color: COLORS.ink, margin: 0,
    });

    // Badge (right side) — outlined rectangle
    const badgeW = c.badge.length * 0.085 + 0.4;
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x + cardW - 0.3 - badgeW, y: cardY + 0.3, w: badgeW, h: 0.3,
      fill: { type: "none" },
      line: { color: c.badgeColor, width: 0.75 },
    });
    s.addText(c.badge, {
      x: c.x + cardW - 0.3 - badgeW, y: cardY + 0.3, w: badgeW, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 9, color: c.badgeColor, charSpacing: 3,
      align: "center", valign: "middle", margin: 0,
    });

    // Horizontal separator under name
    s.addShape(pres.shapes.LINE, {
      x: c.x + 0.3, y: cardY + 1.2, w: cardW - 0.6, h: 0,
      line: { color: COLORS.rule, width: 0.5 },
    });

    // Rows
    const rowStartY = cardY + 1.5;
    const rowH = 0.33;
    c.rows.forEach((r, i) => {
      addEyebrow(s, r[0], { x: c.x + 0.3, y: rowStartY + i * rowH, w: 1.6, color: COLORS.muted });
      s.addText(r[1], {
        x: c.x + 1.95, y: rowStartY + i * rowH - 0.04, w: cardW - 2.25, h: 0.35,
        fontFace: FONT_BODY, fontSize: 12, color: COLORS.ink, margin: 0,
      });
    });
  });
}

// =========================================================
// SLIDE 4 — Ownership & capitalization (two cards)
// =========================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addChrome(s, "03 · CAP TABLE", "OWNERSHIP & CAPITALIZATION", "04 / 09");

  s.addText("Ownership & capitalization.", {
    x: M, y: 1.15, w: W - 2 * M, h: 0.9,
    fontFace: FONT_HEAD, fontSize: 44, color: COLORS.ink, margin: 0,
  });

  s.addText(
    "Both businesses are founder-led, privately held, and backed by a tier-one investor base. Secondary access is available in both names.",
    {
      x: M, y: 2.05, w: 11, h: 0.75,
      fontFace: FONT_BODY, fontSize: 14, color: COLORS.body, margin: 0,
    }
  );

  const cardY = 3.05;
  const cardH = 3.3;
  const cardW = (W - 2 * M - 0.5) / 2;

  const cards = [
    {
      x: M,
      label: "KALSHI, INC.",
      name: "Founder-led · Y Combinator lineage",
      rows: [
        ["FOUNDERS", "Tarek Mansour (CEO), Luana Lopes Lara"],
        ["FOUNDED", "2018 · HQ New York, NY"],
        ["NOTABLE BACKERS", "Sequoia, Charles Schwab, Henry Kravis, Neo, YC"],
        ["LAST ROUND", "Series C, mid-2025 · reported valuation ~$2B"],
        ["OWNERSHIP", "Private · founders + VC · no public float"],
      ],
    },
    {
      x: M + cardW + 0.5,
      label: "POLYMARKET (BLOCKRATIZE, INC.)",
      name: "Founder-led · crypto-native cap table",
      rows: [
        ["FOUNDER", "Shayne Coplan (CEO)"],
        ["FOUNDED", "2020 · HQ New York, NY"],
        ["NOTABLE BACKERS", "Founders Fund, 1confirmation, Vitalik Buterin, Point72 Ventures"],
        ["LAST ROUND", "Growth round, 2025 · reported valuation >$1B"],
        ["OWNERSHIP", "Private · strategic acquisition of QCX (licensed DCM) for U.S. re-entry"],
      ],
    },
  ];

  cards.forEach((c) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: cardY, w: cardW, h: cardH,
      fill: { color: COLORS.card },
      line: { color: COLORS.rule, width: 0.75 },
    });

    // Top label
    addEyebrow(s, c.label, { x: c.x + 0.3, y: cardY + 0.3, w: cardW - 0.6, color: COLORS.muted });

    // Name (bold)
    s.addText(c.name, {
      x: c.x + 0.3, y: cardY + 0.6, w: cardW - 0.6, h: 0.6,
      fontFace: FONT_HEAD, fontSize: 22, bold: true, color: COLORS.ink, margin: 0,
    });

    // Rows
    const rowStartY = cardY + 1.55;
    const rowH = 0.32;
    c.rows.forEach((r, i) => {
      s.addText(r[0], {
        x: c.x + 0.3, y: rowStartY + i * rowH, w: 1.5, h: 0.3,
        fontFace: FONT_HEAD, fontSize: 9.5, color: COLORS.muted, charSpacing: 3, margin: 0,
      });
      s.addText(r[1], {
        x: c.x + 1.85, y: rowStartY + i * rowH - 0.04, w: cardW - 2.15, h: 0.4,
        fontFace: FONT_BODY, fontSize: 12, color: COLORS.ink, margin: 0,
      });
    });
  });

  // Disclaimer
  s.addText(
    "Valuations are press-reported / secondary-indicated; subject to confirmation via data room.",
    {
      x: M, y: 6.5, w: 10, h: 0.3,
      fontFace: FONT_BODY, fontSize: 9, color: COLORS.muted, italic: false, margin: 0,
    }
  );
}

// =========================================================
// SLIDE 5 — Liquidity / Volume at scale (horizontal bars)
// =========================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addChrome(s, "04 · LIQUIDITY", "VOLUME AT SCALE", "05 / 09");

  s.addText("Liquidity is no longer the bottleneck.", {
    x: M, y: 1.15, w: W - 2 * M, h: 0.9,
    fontFace: FONT_HEAD, fontSize: 40, color: COLORS.ink, margin: 0,
  });

  s.addText(
    "Peak-month notional on both venues now rivals mid-tier crypto exchanges. The 2024 U.S. election was the forcing function; post-election retention is the signal.",
    {
      x: M, y: 2.05, w: 11, h: 0.8,
      fontFace: FONT_BODY, fontSize: 14, color: COLORS.body, margin: 0,
    }
  );

  // Header row
  const tableY = 3.25;
  const labelColX = M;
  const labelColW = 2.1;
  const barColX = M + 2.3;
  const barColW = 8.2;
  const valColX = W - M - 1.5;
  const valColW = 1.5;

  addEyebrow(s, "VENUE / MONTH", { x: labelColX, y: tableY, w: labelColW, color: COLORS.muted });
  addEyebrow(s, "MONTHLY NOTIONAL (USD)", { x: barColX, y: tableY, w: barColW, color: COLORS.muted });
  addEyebrow(s, "VALUE", { x: valColX, y: tableY, w: valColW, align: "right", color: COLORS.muted });

  // Rule under header
  s.addShape(pres.shapes.LINE, {
    x: M, y: tableY + 0.32, w: W - 2 * M, h: 0,
    line: { color: COLORS.rule, width: 0.5 },
  });

  // Rows — label, barFraction (0..1), color, value
  const rows = [
    { label: "Polymarket · Nov '24", frac: 1.0, color: COLORS.gold, value: "~$2.6B" },
    { label: "Kalshi · Nov '24", frac: 0.30, color: COLORS.ink, value: "~$780M" },
    { label: "Polymarket · Q1 '26 avg", frac: 0.42, color: COLORS.gold, value: "~$1.1B" },
    { label: "Kalshi · Q1 '26 avg", frac: 0.26, color: COLORS.ink, value: "~$680M" },
    { label: "Open interest (agg.)", frac: 0.48, color: COLORS.green, value: "~$1.25B" },
  ];

  const rowStartY = tableY + 0.55;
  const rowH = 0.55;
  const barH = 0.22;

  rows.forEach((r, i) => {
    const ry = rowStartY + i * rowH;
    // Label
    s.addText(r.label, {
      x: labelColX, y: ry - 0.04, w: labelColW, h: 0.45,
      fontFace: FONT_BODY, fontSize: 11, color: COLORS.ink, margin: 0, valign: "middle",
    });
    // Bar background (track)
    s.addShape(pres.shapes.RECTANGLE, {
      x: barColX, y: ry + 0.08, w: barColW, h: barH,
      fill: { color: "E3DDCB" },
      line: { type: "none" },
    });
    // Bar fill
    s.addShape(pres.shapes.RECTANGLE, {
      x: barColX, y: ry + 0.08, w: barColW * r.frac, h: barH,
      fill: { color: r.color },
      line: { type: "none" },
    });
    // Value
    s.addText(r.value, {
      x: valColX, y: ry - 0.04, w: valColW, h: 0.45,
      fontFace: FONT_BODY, fontSize: 11, color: COLORS.ink,
      align: "right", valign: "middle", margin: 0,
    });
  });

  // Footnote
  s.addText(
    "Figures are illustrative estimates triangulated from press disclosures, public on-chain data (Polymarket), and third-party trackers. Final memo to be sourced against vendor-of-record.",
    {
      x: M, y: 6.35, w: 11.5, h: 0.3,
      fontFace: FONT_BODY, fontSize: 9, color: COLORS.muted, margin: 0,
    }
  );
}

// =========================================================
// SLIDE 6 — Depth (two mini order-book cards)
// =========================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addChrome(s, "05 · DEPTH", "ORDER-BOOK QUALITY", "06 / 09");

  s.addText("Depth: where the two venues diverge.", {
    x: M, y: 1.15, w: W - 2 * M, h: 0.9,
    fontFace: FONT_HEAD, fontSize: 40, color: COLORS.ink, margin: 0,
  });

  s.addText(
    "On flagship contracts, inside spreads are <1¢ on both venues. Beyond the top-of-book, Polymarket carries more passive resting liquidity; Kalshi clears faster on large tickets via market-maker programs.",
    {
      x: M, y: 2.05, w: 11.5, h: 0.8,
      fontFace: FONT_BODY, fontSize: 14, color: COLORS.body, margin: 0,
    }
  );

  const cardY = 3.3;
  const cardH = 3.0;
  const cardW = (W - 2 * M - 0.5) / 2;

  const books = [
    {
      x: M,
      title: "Flagship political contract · Polymarket",
      maxQty: 412000,
      rows: [
        ["$0.63", 412000],
        ["$0.62", 348700],
        ["$0.61", 241100],
        ["$0.60", 172400],
        ["$0.59", 118900],
        ["$0.58", 76200],
      ],
      footL: "Inside spread 1¢",
      footR: "Depth @ ±3¢ ≈ $1.4M",
    },
    {
      x: M + cardW + 0.5,
      title: "Flagship macro contract · Kalshi",
      maxQty: 214500,
      rows: [
        ["$0.71", 214500],
        ["$0.70", 188300],
        ["$0.69", 154600],
        ["$0.68", 116100],
        ["$0.67", 91200],
        ["$0.66", 71800],
      ],
      footL: "Inside spread 1¢",
      footR: "Depth @ ±3¢ ≈ $0.8M",
    },
  ];

  books.forEach((bk) => {
    // Card
    s.addShape(pres.shapes.RECTANGLE, {
      x: bk.x, y: cardY, w: cardW, h: cardH,
      fill: { color: COLORS.card },
      line: { color: COLORS.rule, width: 0.75 },
    });

    // Title
    s.addText(bk.title, {
      x: bk.x + 0.3, y: cardY + 0.2, w: cardW - 2, h: 0.35,
      fontFace: FONT_HEAD, fontSize: 13, bold: true, color: COLORS.ink, margin: 0,
    });

    // YES · illustrative (right aligned)
    s.addText("YES · illustrative", {
      x: bk.x + cardW - 1.8, y: cardY + 0.23, w: 1.5, h: 0.3,
      fontFace: FONT_BODY, fontSize: 9, color: COLORS.muted,
      align: "right", margin: 0,
    });

    // Rows
    const rowsY = cardY + 0.75;
    const rowH = 0.27;
    const priceX = bk.x + 0.3;
    const priceW = 0.65;
    const barX = bk.x + 1.05;
    const barW = cardW - 2.3;
    const qtyX = bk.x + cardW - 1.1;
    const qtyW = 0.85;
    const barH = 0.17;

    bk.rows.forEach((r, i) => {
      const ry = rowsY + i * rowH;
      // Price label
      s.addText(r[0], {
        x: priceX, y: ry - 0.02, w: priceW, h: 0.25,
        fontFace: FONT_BODY, fontSize: 10, color: COLORS.muted, margin: 0, valign: "middle",
      });
      // Bar track
      s.addShape(pres.shapes.RECTANGLE, {
        x: barX, y: ry + 0.04, w: barW, h: barH,
        fill: { color: "E3DDCB" }, line: { type: "none" },
      });
      // Bar fill
      s.addShape(pres.shapes.RECTANGLE, {
        x: barX, y: ry + 0.04, w: barW * (r[1] / bk.maxQty), h: barH,
        fill: { color: COLORS.green }, line: { type: "none" },
      });
      // Qty
      s.addText(r[1].toLocaleString(), {
        x: qtyX, y: ry - 0.02, w: qtyW, h: 0.25,
        fontFace: FONT_BODY, fontSize: 10, color: COLORS.ink,
        align: "right", valign: "middle", margin: 0,
      });
    });

    // Footer of card
    s.addText(bk.footL, {
      x: bk.x + 0.3, y: cardY + cardH - 0.45, w: 3, h: 0.3,
      fontFace: FONT_BODY, fontSize: 10, color: COLORS.ink, margin: 0,
    });
    s.addText(bk.footR, {
      x: bk.x + cardW - 3.3, y: cardY + cardH - 0.45, w: 3, h: 0.3,
      fontFace: FONT_BODY, fontSize: 10, color: COLORS.ink,
      align: "right", margin: 0,
    });
  });
}

// =========================================================
// SLIDE 7 — Users / Target demographics
// =========================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addChrome(s, "06 · USERS", "TARGET DEMOGRAPHICS", "07 / 09");

  s.addText("Who is actually trading.", {
    x: M, y: 1.15, w: W - 2 * M, h: 0.9,
    fontFace: FONT_HEAD, fontSize: 40, color: COLORS.ink, margin: 0,
  });

  s.addText(
    "The core user is a 25–44, male-skewed, financially literate prosumer. Kalshi over-indexes on U.S.-onshore finance workers; Polymarket over-indexes on crypto-native international users.",
    {
      x: M, y: 2.05, w: 11.5, h: 0.8,
      fontFace: FONT_BODY, fontSize: 14, color: COLORS.body, margin: 0,
    }
  );

  // Four stats in a row with top-line rule above each
  const rowY = 3.1;
  const cols = 4;
  const colW = (W - 2 * M - 0.6) / cols;

  const stats = [
    { label: "AGE 25–44", big: [{ text: "68%", options: { color: COLORS.ink } }], body: "Of active monthly users across both venues." },
    { label: "MALE / FEMALE", big: [
        { text: "82", options: { color: COLORS.ink } },
        { text: "/18", options: { color: COLORS.gold, italic: true, fontSize: 28 } },
      ], body: "Gender skew remains wide — a growth vector." },
    { label: "MEDIAN HHI", big: [{ text: "$128k", options: { color: COLORS.ink } }], body: "Survey-reported; correlates with brokerage / options users." },
    { label: "ALREADY TRADE DERIVATIVES", big: [{ text: "61%", options: { color: COLORS.ink } }], body: "Crossover with retail options — directly relevant to wirehouse distribution." },
  ];

  stats.forEach((st, i) => {
    const cx = M + i * (colW + 0.2);
    // Top rule (short, above the stat)
    s.addShape(pres.shapes.LINE, {
      x: cx, y: rowY, w: 2.2, h: 0,
      line: { color: COLORS.ink, width: 0.75 },
    });
    // Label
    addEyebrow(s, st.label, { x: cx, y: rowY + 0.15, w: colW, color: COLORS.muted });
    // Big number
    s.addText(st.big, {
      x: cx, y: rowY + 0.4, w: colW, h: 0.85,
      fontFace: FONT_HEAD, fontSize: 44, bold: false, margin: 0, valign: "top",
    });
    // Body
    s.addText(st.body, {
      x: cx, y: rowY + 1.35, w: colW - 0.2, h: 0.9,
      fontFace: FONT_BODY, fontSize: 11, color: COLORS.body, margin: 0,
    });
  });

  // Two archetype columns at bottom
  const archY = 5.5;
  const archW = (W - 2 * M - 0.5) / 2;

  const archetypes = [
    {
      x: M,
      label: "KALSHI — USER ARCHETYPE",
      text: "U.S.-based finance professional, 28–45, uses Robinhood or IBKR, treats event contracts as macro hedges or entertainment-adjacent speculation.",
    },
    {
      x: M + archW + 0.5,
      label: "POLYMARKET — USER ARCHETYPE",
      text: "Global crypto-native, 22–40, already holds USDC, treats markets as information instruments and social commentary as much as PnL.",
    },
  ];

  archetypes.forEach((a) => {
    addEyebrow(s, a.label, { x: a.x, y: archY, w: archW, color: COLORS.muted });
    s.addText(a.text, {
      x: a.x, y: archY + 0.22, w: archW, h: 1.3,
      fontFace: FONT_BODY, fontSize: 13, color: COLORS.ink, margin: 0,
    });
  });
}

// =========================================================
// SLIDE 8 — Thesis / Why now (DARK slide)
// =========================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.darkBg };
  addChrome(s, "07 · THESIS", "WHY NOW", "08 / 09", "PREDICTION MARKETS THESIS", true);

  // Gold eyebrow
  addEyebrow(s, "THE OPPORTUNITY", { x: M, y: 1.15, w: 6, color: COLORS.gold });

  // Headline
  s.addText("Early exposure to exchange-style rails before the category consolidates.", {
    x: M, y: 1.5, w: W - 2 * M, h: 1.65,
    fontFace: FONT_HEAD, fontSize: 38, color: COLORS.onDark, margin: 0,
  });

  // Three thesis rows with roman-numeral indicators, separated by rules
  const items = [
    { num: "i.", title: "Liquidity has cleared the bar", body: "Monthly notional is no longer a novelty figure. Depth on flagship contracts supports ticket sizes that matter to a prop desk or family office." },
    { num: "ii.", title: "Regulatory overhang is resolving, not expanding", body: "Kalshi's DCM status is now settled case law; Polymarket's licensed-DCM acquisition closes the U.S. access gap. The regulatory discount compresses from here." },
    { num: "iii.", title: "Two viable winners — pair-trade, don't pick", body: "Different rails, different audiences, limited direct overlap in contract listings. The right position is exposure to both through secondary or late-stage primary." },
  ];

  const startY = 3.35;
  const itemH = 1.05;
  const numW = 0.7;
  const contentX = M + numW + 0.15;

  items.forEach((it, i) => {
    const iy = startY + i * itemH;
    // Top rule for each item
    s.addShape(pres.shapes.LINE, {
      x: M, y: iy, w: W - 2 * M, h: 0,
      line: { color: "2A3440", width: 0.5 },
    });
    // Roman numeral in gold italic
    s.addText(it.num, {
      x: M, y: iy + 0.18, w: numW, h: 0.5,
      fontFace: FONT_HEAD, fontSize: 22, italic: true, color: COLORS.gold,
      align: "left", margin: 0,
    });
    // Title
    s.addText(it.title, {
      x: contentX, y: iy + 0.15, w: W - 2 * M - numW - 0.3, h: 0.4,
      fontFace: FONT_HEAD, fontSize: 16, bold: true, color: COLORS.onDark, margin: 0,
    });
    // Body
    s.addText(it.body, {
      x: contentX, y: iy + 0.55, w: W - 2 * M - numW - 0.3, h: 0.5,
      fontFace: FONT_BODY, fontSize: 12, color: COLORS.onDark, margin: 0,
    });
  });

  // Final rule under last item
  s.addShape(pres.shapes.LINE, {
    x: M, y: startY + items.length * itemH, w: W - 2 * M, h: 0,
    line: { color: "2A3440", width: 0.5 },
  });
}

// =========================================================
// SLIDE 9 — Risks & next steps
// =========================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addChrome(s, "08 · RISKS", "RISK FACTORS & NEXT STEPS", "09 / 09", "PREPARED FOR ASSOCIATE REVIEW — J.P. MORGAN");

  s.addText("Risks we'd underwrite against.", {
    x: M, y: 1.15, w: W - 2 * M, h: 0.9,
    fontFace: FONT_HEAD, fontSize: 40, color: COLORS.ink, margin: 0,
  });

  // 2x2 risk grid
  const risks = [
    { title: "Regulatory reversal", body: "A successor CFTC commission could narrow the definition of permissible event contracts; materially compresses TAM." },
    { title: "Election-cycle concentration", body: "~40% of all-time notional still sits around a single category. Sustained non-election breadth is the signal we need to see." },
    { title: "Settlement / oracle disputes", body: "Polymarket's UMA model has already seen contested resolutions. Reputational tail risk, especially on politically charged markets." },
    { title: "Incumbent entry", body: "A CME or ICE launch of event contracts at zero-take-rate would re-price both names before we exit." },
  ];

  const gridStartY = 2.4;
  const gridColW = (W - 2 * M - 0.5) / 2;
  const gridRowH = 1.1;
  const dotSize = 0.11;

  risks.forEach((r, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const rx = M + col * (gridColW + 0.5);
    const ry = gridStartY + row * gridRowH;

    // Red dot
    s.addShape(pres.shapes.OVAL, {
      x: rx, y: ry + 0.08, w: dotSize, h: dotSize,
      fill: { color: COLORS.red },
      line: { type: "none" },
    });

    // Title
    s.addText(r.title, {
      x: rx + 0.3, y: ry, w: gridColW - 0.3, h: 0.35,
      fontFace: FONT_HEAD, fontSize: 14, bold: true, color: COLORS.ink, margin: 0,
    });
    // Body
    s.addText(r.body, {
      x: rx + 0.3, y: ry + 0.35, w: gridColW - 0.3, h: 0.7,
      fontFace: FONT_BODY, fontSize: 11, color: COLORS.body, margin: 0,
    });
  });

  // Horizontal rule separating risks from next steps
  s.addShape(pres.shapes.LINE, {
    x: M, y: 4.85, w: W - 2 * M, h: 0,
    line: { color: COLORS.rule, width: 0.5 },
  });

  // Three "NEXT STEP" columns
  const stepsY = 5.1;
  const stepColW = (W - 2 * M - 0.6) / 3;
  const steps = [
    { label: "NEXT STEP · 1", body: "Request data-room access on both names via our secondary desk." },
    { label: "NEXT STEP · 2", body: "Sourcing call with two market-makers active on each venue to confirm depth assumptions." },
    { label: "NEXT STEP · 3", body: "Draft sizing note — 30/70 split favoring the onshore-regulated name for a JPM-friendly risk frame." },
  ];
  steps.forEach((st, i) => {
    const sx = M + i * (stepColW + 0.3);
    addEyebrow(s, st.label, { x: sx, y: stepsY, w: stepColW, color: COLORS.muted });
    s.addText(st.body, {
      x: sx, y: stepsY + 0.22, w: stepColW, h: 1.4,
      fontFace: FONT_BODY, fontSize: 14, color: COLORS.ink, margin: 0,
    });
  });
}

// ---------- Write ----------
pres.writeFile({ fileName: "Poly_Market_vs_Kalshi.pptx" }).then((f) => {
  console.log("Wrote:", f);
});
