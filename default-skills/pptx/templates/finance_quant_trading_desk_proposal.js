const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaChartLine, FaExchangeAlt, FaBasketballBall, FaUsers,
  FaDollarSign, FaBolt, FaChessKnight, FaRocket, FaShieldAlt,
  FaArrowRight, FaCrosshairs, FaDatabase, FaBalanceScale
} = require("react-icons/fa");

function renderIconSvg(IconComponent, color = "#000000", size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}
async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// ============================================================
// JUMP TRADING PALETTE - HYBRID LIGHT/DARK
// Source: brandfetch.com/jumptrading.com
//   Pomegranate #EE322F | Alabaster #F8F8F8 | Cod Gray #080808
// Dark bookends (slides 1, 10), light content (slides 2-9).
// ONE accent (red). Everything else grayscale.
// ============================================================

// Dark theme (title + closing slides)
const D_BG       = "080808";
const D_PANEL    = "141414";
const D_CARD     = "1A1A1A";
const D_TEXT     = "F8F8F8";
const D_LIGHT    = "C8C8C8";
const D_MUTED    = "808080";
const D_DIM      = "5A5A5A";
const D_RULE     = "2A2A2A";

// Light theme (content slides)
const L_BG       = "F8F8F8";  // Alabaster - Jump's actual site bg
const L_PANEL    = "FFFFFF";  // pure white for raised panels
const L_CARD     = "FFFFFF";  // cards pop off the alabaster bg
const L_TEXT     = "080808";  // Cod Gray - primary text
const L_SUBTEXT  = "333333";  // dense body
const L_MUTED    = "6C6C6C";  // captions
const L_DIM      = "A0A0A0";  // tertiary / chart secondary
const L_RULE     = "D8D8D8";
const L_BORDER   = "E5E5E5";  // light card outline

// Accent - consistent across both themes
const ACCENT     = "EE322F";  // Pomegranate - THE accent
const ACCENT_DIM = "B02522";  // lower-intensity red for chart gradient

// Typography
const HFONT = "Arial Black";
const SFONT = "Arial";
const BFONT = "Arial";

const SW = 13.3;
const SH = 7.5;
const ML = 0.6;
const MR = 0.6;
const CW = SW - ML - MR;

let PRES;

// ------------ Helpers ------------
// Each helper takes a theme object so the same function works in light and dark.

const THEME_DARK = {
  bg: D_BG, panel: D_PANEL, card: D_CARD,
  text: D_TEXT, subtext: D_LIGHT, muted: D_MUTED, dim: D_DIM,
  rule: D_RULE, border: D_RULE
};
const THEME_LIGHT = {
  bg: L_BG, panel: L_PANEL, card: L_CARD,
  text: L_TEXT, subtext: L_SUBTEXT, muted: L_MUTED, dim: L_DIM,
  rule: L_RULE, border: L_BORDER
};

function addRule(slide, x, y, w, color) {
  slide.addShape(PRES.shapes.RECTANGLE, {
    x: x, y: y, w: w, h: 0.015, fill: { color: color }, line: { type: "none" }
  });
}

function addSlideHeader(slide, T, sectionLabel, subtitle, opts = {}) {
  const startY = opts.startY || 0.3;
  slide.addText(sectionLabel, {
    x: ML, y: startY, w: CW, h: 0.25,
    fontSize: 10, fontFace: SFONT, bold: true, color: ACCENT, charSpacing: 3, align: "left", margin: 0
  });
  if (typeof subtitle === "string") {
    slide.addText(subtitle, {
      x: ML, y: startY + 0.25, w: CW, h: 0.7,
      fontSize: 22, fontFace: HFONT, color: T.text, align: "left", margin: 0, lineSpacingMultiple: 1.1
    });
  } else {
    slide.addText(subtitle, {
      x: ML, y: startY + 0.25, w: CW, h: 0.7,
      align: "left", margin: 0, lineSpacingMultiple: 1.1
    });
  }
  addRule(slide, ML, startY + 1.0, CW, T.rule);
}

function addKeyTakeaway(slide, T, text, y) {
  const ty = y || 6.55;
  slide.addShape(PRES.shapes.RECTANGLE, {
    x: ML, y: ty, w: CW, h: 0.5, fill: { color: T.card }, line: { type: "none" }
  });
  slide.addShape(PRES.shapes.RECTANGLE, {
    x: ML, y: ty, w: 0.05, h: 0.5, fill: { color: ACCENT }, line: { type: "none" }
  });
  slide.addText([
    { text: "KEY TAKEAWAY  ", options: { bold: true, fontSize: 9, fontFace: SFONT, color: ACCENT, charSpacing: 2 } },
    { text: text, options: { fontSize: 9.5, fontFace: BFONT, color: T.subtext } }
  ], {
    x: ML + 0.2, y: ty, w: CW - 0.3, h: 0.5, align: "left", valign: "middle", margin: 0
  });
}

function addSource(slide, T, text, pageNum) {
  slide.addText(text, {
    x: ML, y: 7.15, w: CW - 0.5, h: 0.25,
    fontSize: 7.5, fontFace: BFONT, italic: true, color: T.muted, align: "left", margin: 0
  });
  slide.addText(String(pageNum).padStart(2, "0"), {
    x: SW - ML - 0.4, y: 7.15, w: 0.4, h: 0.25,
    fontSize: 8, fontFace: SFONT, bold: true, color: ACCENT, align: "right", margin: 0
  });
}

// Canonical stat callout - big number, muted label, red bar left.
function addStatCallout(slide, T, x, y, w, h, value, label) {
  slide.addShape(PRES.shapes.RECTANGLE, {
    x: x, y: y, w: 0.05, h: h, fill: { color: ACCENT }, line: { type: "none" }
  });
  slide.addText(value, {
    x: x + 0.2, y: y + 0.02, w: w - 0.3, h: h * 0.55,
    fontSize: 32, fontFace: HFONT, color: T.text, align: "left", valign: "bottom", margin: 0
  });
  slide.addText(label, {
    x: x + 0.2, y: y + h * 0.62, w: w - 0.3, h: h * 0.38,
    fontSize: 11, fontFace: BFONT, color: T.muted, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.2
  });
}

async function buildDeck() {
  let pres = new pptxgen();
  PRES = pres;
  pres.layout = "LAYOUT_WIDE";
  pres.author = "Jump Trading Group";
  pres.title = "Sports Prediction Markets Desk: Internal Pitch";

  // ================================================================
  // SLIDE 1: TITLE (DARK)
  // ================================================================
  const T1 = THEME_DARK;
  let s1 = pres.addSlide();
  s1.background = { color: T1.bg };

  s1.addShape(PRES.shapes.RECTANGLE, {
    x: 8.0, y: 0, w: 5.3, h: SH, fill: { color: T1.panel }, line: { type: "none" }
  });

  s1.addText("SPORTS PREDICTION MARKETS DESK", {
    x: ML, y: 1.0, w: 7.0, h: 0.3,
    fontSize: 10, fontFace: SFONT, bold: true, color: ACCENT, charSpacing: 3, align: "left", margin: 0
  });
  addRule(s1, ML, 1.35, 2.5, ACCENT);

  s1.addText("Quantitative\nTrading in\nPrediction\nMarkets", {
    x: ML, y: 1.6, w: 7.0, h: 3.6,
    fontSize: 48, fontFace: HFONT, color: T1.text, align: "left", valign: "top",
    margin: 0, lineSpacingMultiple: 1.05
  });

  s1.addText("A proposal to establish a 5-person quant trading\ndesk targeting NBA and NCAA sports prediction\nmarkets with $15M in initial capital allocation", {
    x: ML, y: 5.4, w: 6.5, h: 1.0,
    fontSize: 13, fontFace: BFONT, color: T1.subtext, align: "left", margin: 0, lineSpacingMultiple: 1.4
  });

  addRule(s1, ML, 6.35, 2.0, T1.rule);

  s1.addText("Prepared for Jump Trading Group\nApril 2026", {
    x: ML, y: 6.5, w: 4.0, h: 0.5,
    fontSize: 10, fontFace: SFONT, bold: true, color: T1.muted, align: "left", margin: 0, lineSpacingMultiple: 1.3
  });

  addStatCallout(s1, T1, 8.4, 1.0, 4.3, 1.15, "$44B", "Total prediction market\nnotional volume, 2025");
  addStatCallout(s1, T1, 8.4, 2.4, 4.3, 1.15, "130x", "Volume growth from\nearly 2024");
  addStatCallout(s1, T1, 8.4, 3.8, 4.3, 1.15, "$15M", "Proposed initial\ncapital allocation");
  addStatCallout(s1, T1, 8.4, 5.2, 4.3, 1.15, "5", "Quant team\nheadcount");

  s1.addText("Source: Keyrock/Dune Analytics, Gambling Insider, Bloomberg (2025-2026)", {
    x: 8.4, y: 6.9, w: 4.5, h: 0.25,
    fontSize: 7, fontFace: BFONT, italic: true, color: T1.muted, align: "left", margin: 0
  });
  s1.addText("01", {
    x: SW - 0.8, y: 6.9, w: 0.3, h: 0.25,
    fontSize: 8, fontFace: SFONT, bold: true, color: ACCENT, align: "right", margin: 0
  });

  // ================================================================
  // SLIDE 2: EXECUTIVE SUMMARY (LIGHT)
  // ================================================================
  const T = THEME_LIGHT;
  let s2 = pres.addSlide();
  s2.background = { color: T.bg };

  addSlideHeader(s2, T, "EXECUTIVE SUMMARY", [
    { text: "Prediction markets are the ", options: { fontSize: 22, fontFace: HFONT, color: T.text } },
    { text: "fastest-growing derivatives category", options: { fontSize: 22, fontFace: HFONT, color: ACCENT } },
    { text: " in U.S. finance", options: { fontSize: 22, fontFace: HFONT, color: T.text } }
  ]);

  const statW = 2.8;
  const statGap = 0.25;
  const stats = [
    { val: "$44B", label: "Total prediction market\nnotional volume (2025)" },
    { val: "85%", label: "Kalshi volume from\nsports contracts" },
    { val: "$15M", label: "Proposed desk\ncapital allocation" },
    { val: "13.3%", label: "Year 1 target\nreturn on capital" }
  ];
  stats.forEach((s, i) => {
    const sx = ML + i * (statW + statGap);
    // Card with subtle border since bg is near-white
    s2.addShape(PRES.shapes.RECTANGLE, {
      x: sx, y: 1.55, w: statW, h: 1.15, fill: { color: T.card },
      line: { color: T.border, width: 0.5 }
    });
    addStatCallout(s2, T, sx + 0.1, 1.6, statW - 0.2, 1.0, s.val, s.label);
  });

  const colY = 3.05;
  const colContentH = 3.1;
  s2.addText("Why prediction markets now", {
    x: ML, y: colY, w: 5.8, h: 0.35,
    fontSize: 14, fontFace: SFONT, bold: true, color: T.text, align: "left", margin: 0
  });
  addRule(s2, ML, colY + 0.38, 5.8, T.rule);

  const leftItems = [
    { tag: "Market size", bold: "Sports prediction volume exceeded $37B in 2025 across Kalshi and Polymarket alone.", body: "Total industry notional volume reached $44B, with monthly run rates exceeding $13B by the end of the year." },
    { tag: "Growth rate", bold: "Volume grew 130x from early 2024 to late 2025.", body: "Kalshi grew from $300M to $50B annualized volume. Polymarket now processes 19M+ trades per month." },
    { tag: "Institutional entry", bold: "Jump Trading already provides liquidity to Kalshi and Polymarket at the firm level.", body: "The firm has deployed 20+ staff to prediction markets. This proposal carves out a dedicated sports trading desk." }
  ];
  const leftItemH = (colContentH - 0.5) / leftItems.length;
  leftItems.forEach((item, i) => {
    const iy = colY + 0.5 + i * leftItemH;
    s2.addText(item.tag, {
      x: ML, y: iy, w: 1.55, h: 0.3,
      fontSize: 9.5, fontFace: SFONT, bold: true, color: ACCENT, align: "left", valign: "middle", margin: 0
    });
    s2.addText(item.bold, {
      x: ML + 1.65, y: iy, w: 4.15, h: 0.3,
      fontSize: 11, fontFace: SFONT, bold: true, color: T.text, align: "left", valign: "middle", margin: 0
    });
    s2.addText(item.body, {
      x: ML + 1.65, y: iy + 0.32, w: 4.15, h: 0.5,
      fontSize: 10, fontFace: BFONT, color: T.muted, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.25
    });
  });

  const rx = 6.8;
  const rxW = CW - (rx - ML);
  s2.addText("Our positioning against this market", {
    x: rx, y: colY, w: rxW, h: 0.35,
    fontSize: 14, fontFace: SFONT, bold: true, color: T.text, align: "left", margin: 0
  });
  addRule(s2, rx, colY + 0.38, rxW, T.rule);

  const rightItems = [
    { num: "1", text: "Deploy Jump's low-latency infrastructure and cross-asset risk models to capture spreads in NBA and NCAA prediction contract markets" },
    { num: "2", text: "Exploit cross-platform arbitrage between Kalshi, Polymarket, and traditional sportsbooks on events with divergent implied probabilities" },
    { num: "3", text: "Build proprietary models using play-by-play data, player tracking, and NLP pipelines to systematically identify mispriced contracts" },
    { num: "4", text: "Target $3.4M gross revenue in Year 1 with a 5-person team and $15M capital provision" }
  ];
  const rightItemH = (colContentH - 0.5) / rightItems.length;
  rightItems.forEach((item, i) => {
    const iy = colY + 0.5 + i * rightItemH;
    s2.addShape(PRES.shapes.OVAL, {
      x: rx + 0.05, y: iy + 0.08, w: 0.32, h: 0.32, fill: { color: ACCENT }, line: { type: "none" }
    });
    s2.addText(item.num, {
      x: rx + 0.05, y: iy + 0.08, w: 0.32, h: 0.32,
      fontSize: 11, fontFace: HFONT, color: "FFFFFF", align: "center", valign: "middle", margin: 0
    });
    s2.addText(item.text, {
      x: rx + 0.5, y: iy, w: rxW - 0.6, h: rightItemH - 0.05,
      fontSize: 11, fontFace: BFONT, color: T.subtext, align: "left", valign: "middle", margin: 0, lineSpacingMultiple: 1.25
    });
  });

  addKeyTakeaway(s2, T, "Jump's firm-level prediction market engagement validates the asset class; this desk focuses that capability on sports, the highest-volume segment.");
  addSource(s2, T, "Source: Keyrock/Dune Analytics; Gambling Insider Prediction Market Statistics (Feb 2026); Bloomberg (Feb 2026); The Block (Dec 2025)", 2);

  // ================================================================
  // SLIDE 3: MARKET DEFINITION (LIGHT)
  // ================================================================
  let s3 = pres.addSlide();
  s3.background = { color: T.bg };

  addSlideHeader(s3, T, "MARKET DEFINITION", [
    { text: "NBA and NCAA basketball offer ", options: { fontSize: 22, fontFace: HFONT, color: T.text } },
    { text: "high-frequency liquidity", options: { fontSize: 22, fontFace: HFONT, color: ACCENT } },
    { text: " with structural mispricing", options: { fontSize: 22, fontFace: HFONT, color: T.text } }
  ]);

  const colLabels = ["NBA Game Lines", "NBA Player Props", "NCAA Games", "NCAA Futures", "Cross-Platform"];
  const colDescs = [
    "Moneyline, spread, and totals contracts across ~1,300 regular season and playoff games each year. Deep order books with continuous trading volume.",
    "Points, assists, rebounds, and combo props per player per game. Strong retail bias toward star players creates consistent systematic mispricing.",
    "350+ Division I teams across 5,000+ games each season. Mid-major matchups remain significantly under-covered by institutional market makers.",
    "Conference tournament winners, season win totals, and March Madness bracket contracts. 67 tournament games played across just 3 weeks.",
    "Same-event arbitrage between Kalshi, Polymarket, and traditional sportsbooks where identical outcomes trade at meaningfully different prices."
  ];
  const colMethods = [
    "Win probability models, Elo ratings, lineup-adjusted simulations, rest/travel factors",
    "Bayesian player models, Second Spectrum tracking data, minutes projections, matchup features",
    "Power ratings, tempo-free metrics, conference strength indices, travel fatigue signals",
    "Monte Carlo tournament simulation, BPI-adjusted bracket models, futures curve analysis",
    "Real-time multi-venue price monitoring, latency-optimized order routing, settlement arb"
  ];

  const gridY = 1.45;
  const gridW = 2.25;
  const gridGap = 0.15;
  const cardBottom = 4.85;

  colLabels.forEach((label, i) => {
    const gx = ML + i * (gridW + gridGap);
    const cardH = cardBottom - gridY - 0.4;

    // Full card with subtle border, red top accent
    s3.addShape(PRES.shapes.RECTANGLE, {
      x: gx, y: gridY, w: gridW, h: 0.45 + cardH - 0.05, fill: { color: T.card },
      line: { color: T.border, width: 0.5 }
    });
    s3.addShape(PRES.shapes.RECTANGLE, {
      x: gx, y: gridY, w: gridW, h: 0.04, fill: { color: ACCENT }, line: { type: "none" }
    });
    s3.addText(label, {
      x: gx, y: gridY, w: gridW, h: 0.45,
      fontSize: 12, fontFace: SFONT, bold: true, color: T.text, align: "center", valign: "middle", margin: 0
    });

    s3.addText(colDescs[i], {
      x: gx + 0.12, y: gridY + 0.55, w: gridW - 0.24, h: cardH * 0.5,
      fontSize: 11, fontFace: BFONT, color: T.subtext, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.3
    });

    addRule(s3, gx + 0.12, gridY + 0.55 + cardH * 0.52, gridW - 0.24, T.rule);
    s3.addText("METHODS", {
      x: gx + 0.12, y: gridY + 0.55 + cardH * 0.55, w: gridW - 0.24, h: 0.2,
      fontSize: 9, fontFace: SFONT, bold: true, color: ACCENT, charSpacing: 2, align: "left", margin: 0
    });
    s3.addText(colMethods[i], {
      x: gx + 0.12, y: gridY + 0.55 + cardH * 0.55 + 0.22, w: gridW - 0.24, h: cardH * 0.32,
      fontSize: 10.5, fontFace: BFONT, color: T.muted, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.3
    });
  });

  const bsy = cardBottom + 0.2;
  const bsw = (CW - 0.4) / 3;
  addStatCallout(s3, T, ML, bsy, bsw, 1.1, "85%", "Kalshi volume from sports contracts.\nSports is the primary volume engine.");
  addStatCallout(s3, T, ML + bsw + 0.2, bsy, bsw, 1.1, "2-5%", "Spread opportunity per cross-platform\narbitrage trade on identical events");
  addStatCallout(s3, T, ML + 2 * (bsw + 0.2), bsy, bsw, 1.1, "$13B/mo", "Monthly prediction market volume\nby late 2025, continuous liquidity");

  addKeyTakeaway(s3, T, "NBA and NCAA combine high frequency, deep liquidity, and structural retail bias - ideal conditions for quantitative market making and arbitrage.");
  addSource(s3, T, "Source: Kalshi platform data; Gambling Insider (Feb 2026); ChainCatcher/RootData Jump Trading analysis (Feb 2026)", 3);

  // ================================================================
  // SLIDE 4: CORE STRATEGIES (LIGHT) - FIXED: larger cards, no overflow
  // ================================================================
  let s4 = pres.addSlide();
  s4.background = { color: T.bg };

  addSlideHeader(s4, T, "CORE STRATEGIES", [
    { text: "Four strategies targeting ", options: { fontSize: 22, fontFace: HFONT, color: T.text } },
    { text: "spread capture", options: { fontSize: 22, fontFace: HFONT, color: ACCENT } },
    { text: " and ", options: { fontSize: 22, fontFace: HFONT, color: T.text } },
    { text: "contract mispricing", options: { fontSize: 22, fontFace: HFONT, color: ACCENT } }
  ]);

  const strategies = [
    {
      icon: FaExchangeAlt,
      title: "Cross-Platform Spread Arbitrage",
      what: "Simultaneously buy underpriced and sell overpriced contracts when the same NBA or NCAA game trades at different implied probabilities across Kalshi, Polymarket, and sports books.",
      edge: "Jump's latency infrastructure captures 2-5% spreads before convergence occurs.",
      capital: "$4M deployed",
      riskProfile: "Low (market-neutral)"
    },
    {
      icon: FaDollarSign,
      title: "Contract Market Making",
      what: "Provide continuous two-sided liquidity in game outcome contracts, earning the bid-ask spread on every fill. Automated quoting adjusts in real time based on inventory and market volatility.",
      edge: "Current MM margins run 2-4%. Our models tighten quoted spreads while managing directional risk.",
      capital: "$8M deployed",
      riskProfile: "Low-Medium"
    },
    {
      icon: FaCrosshairs,
      title: "Retail Sentiment Exploitation",
      what: "Identify where retail flow pushes implied odds away from true probability. Public bias toward favorites, star players, and primetime matchups creates systematic mispricing in props and game totals.",
      edge: "Contrarian positioning driven by quantitative models. Backtested edge spans 10+ years of NBA data.",
      capital: "Within MM capital",
      riskProfile: "Medium (directional)"
    },
    {
      icon: FaBolt,
      title: "In-Game Momentum Trading",
      what: "Live contract prices overreact to scoring runs and momentum shifts. Our win probability models identify when market prices deviate from fair value during gameplay.",
      edge: "Sub-second signal processing + mean-reversion patterns. Single-game exposure capped at 2%.",
      capital: "Within MM capital",
      riskProfile: "Medium-High"
    }
  ];

  const s4cardW = (CW - 0.15) / 2;  // 5.90" per card, gap 0.15"
  const s4cardH = 2.40;
  const s4cardGap = 0.15;
  for (let i = 0; i < strategies.length; i++) {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const cx = ML + col * (s4cardW + s4cardGap);
    const cy = 1.50 + row * (s4cardH + s4cardGap);
    const s = strategies[i];

    s4.addShape(PRES.shapes.RECTANGLE, {
      x: cx, y: cy, w: s4cardW, h: s4cardH, fill: { color: T.card },
      line: { color: T.border, width: 0.5 }
    });
    s4.addShape(PRES.shapes.RECTANGLE, {
      x: cx, y: cy, w: 0.05, h: s4cardH, fill: { color: ACCENT }, line: { type: "none" }
    });

    const ic = await iconToBase64Png(s.icon, "#" + ACCENT, 256);
    s4.addImage({ data: ic, x: cx + 0.25, y: cy + 0.17, w: 0.34, h: 0.34 });

    s4.addText(s.title, {
      x: cx + 0.70, y: cy + 0.14, w: s4cardW - 0.85, h: 0.40,
      fontSize: 14, fontFace: SFONT, bold: true, color: T.text, align: "left", valign: "middle", margin: 0
    });

    // WHAT (left half) and EDGE (right half) side-by-side
    const halfW = (s4cardW - 0.25) / 2;
    const whatX = cx + 0.25;
    const edgeX = cx + 0.25 + halfW + 0.22;

    s4.addText("WHAT", {
      x: whatX, y: cy + 0.61, w: 1.5, h: 0.20,
      fontSize: 8.5, fontFace: SFONT, bold: true, color: ACCENT, charSpacing: 2, align: "left", margin: 0
    });
    s4.addText(s.what, {
      x: whatX, y: cy + 0.86, w: halfW - 0.05, h: 0.70,
      fontSize: 9, fontFace: BFONT, color: T.subtext, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.3
    });

    s4.addText("EDGE", {
      x: edgeX, y: cy + 0.61, w: 1.5, h: 0.20,
      fontSize: 8.5, fontFace: SFONT, bold: true, color: ACCENT, charSpacing: 2, align: "left", margin: 0
    });
    s4.addText(s.edge, {
      x: edgeX, y: cy + 0.84, w: halfW - 0.1, h: 0.40,
      fontSize: 9, fontFace: BFONT, color: T.subtext, italic: true, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.2
    });

    addRule(s4, cx + 0.25, cy + s4cardH - 0.32, s4cardW - 0.40, T.rule);
    s4.addText([
      { text: "CAPITAL   ", options: { fontSize: 8.5, fontFace: SFONT, bold: true, color: T.muted, charSpacing: 1.5 } },
      { text: s.capital, options: { fontSize: 9, fontFace: SFONT, bold: true, color: T.text } }
    ], {
      x: cx + 0.25, y: cy + s4cardH - 0.28, w: (s4cardW - 0.40) / 2, h: 0.25, align: "left", valign: "middle", margin: 0
    });
    s4.addText([
      { text: "RISK   ", options: { fontSize: 8.5, fontFace: SFONT, bold: true, color: T.muted, charSpacing: 1.5 } },
      { text: s.riskProfile, options: { fontSize: 9, fontFace: SFONT, bold: true, color: T.text } }
    ], {
      x: cx + 0.25 + (s4cardW - 0.40) / 2, y: cy + s4cardH - 0.28, w: (s4cardW - 0.40) / 2, h: 0.25, align: "right", valign: "middle", margin: 0
    });
  }

  addKeyTakeaway(s4, T, "The four strategies are complementary: MM provides baseline revenue, arbitrage captures risk-free spreads, and directional strategies add alpha.");
  addSource(s4, T, "Source: Internal strategy analysis; ChainCatcher prediction market maker margin data (Feb 2026); platform API documentation", 4);

  // ================================================================
  // SLIDE 5: COMPETITIVE EDGE (LIGHT)
  // ================================================================
  let s5 = pres.addSlide();
  s5.background = { color: T.bg };

  addSlideHeader(s5, T, "COMPETITIVE EDGE", [
    { text: "Jump's existing infrastructure provides ", options: { fontSize: 22, fontFace: HFONT, color: T.text } },
    { text: "structural advantages", options: { fontSize: 22, fontFace: HFONT, color: ACCENT } },
    { text: " over retail participants", options: { fontSize: 22, fontFace: HFONT, color: T.text } }
  ]);

  const edges = [
    {
      icon: FaBolt,
      title: "Latency & Infrastructure",
      items: [
        "Microwave and fiber network enabling sub-millisecond",
        "ASIC-accelerated signal processing across Jump's equities trading desk since 2017",
        "PLACEHOLDER",
        "Cross-platform order routing engine purpose-built for multi-venue execution"
      ]
    },
    {
      icon: FaDatabase,
      title: "Data & Models",
      items: [
        "PLACEHOLDER",
        "NLP pipeline processing injury reports, lineup changes, breaking news signals",
        "PLACEHOLDER",
        "Bayesian updating framework for computing live win probability"
      ]
    },
    {
      icon: FaShieldAlt,
      title: "Risk & Capital",
      items: [
        "$15M dedicated capital enabling position sizing that captures meaningful spread",
        "Real-time portfolio-level risk management spanning all open prediction market",
        "Correlation-aware hedging across related game outcomes and player positions",
        "PLACEHOLDER"
      ]
    }
  ];

  const ecw = 3.7;
  const ecgap = 0.35;
  for (let i = 0; i < edges.length; i++) {
    const ex = ML + i * (ecw + ecgap);
    const ey = 1.55;
    const eh = 4.55;

    s5.addShape(PRES.shapes.RECTANGLE, {
      x: ex, y: ey, w: ecw, h: eh, fill: { color: T.card },
      line: { color: T.border, width: 0.5 }
    });
    s5.addShape(PRES.shapes.RECTANGLE, {
      x: ex, y: ey, w: ecw, h: 0.05, fill: { color: ACCENT }, line: { type: "none" }
    });

    const eIcon = await iconToBase64Png(edges[i].icon, "#" + ACCENT, 256);
    s5.addImage({ data: eIcon, x: ex + 0.25, y: ey + 0.3, w: 0.4, h: 0.4 });
    s5.addText(edges[i].title, {
      x: ex + 0.75, y: ey + 0.3, w: ecw - 1.0, h: 0.4,
      fontSize: 16, fontFace: SFONT, bold: true, color: T.text, align: "left", valign: "middle", margin: 0
    });
    addRule(s5, ex + 0.25, ey + 0.85, ecw - 0.5, T.rule);

    const bulletStartY = ey + 1.0;
    const bulletAreaH = eh - 1.15;
    const bulletSpacing = bulletAreaH / edges[i].items.length;
    edges[i].items.forEach((item, j) => {
      const iy = bulletStartY + j * bulletSpacing;
      s5.addShape(PRES.shapes.RECTANGLE, {
        x: ex + 0.25, y: iy + 0.13, w: 0.1, h: 0.03,
        fill: { color: ACCENT }, line: { type: "none" }
      });
      s5.addText(item, {
        x: ex + 0.45, y: iy, w: ecw - 0.6, h: bulletSpacing - 0.05,
        fontSize: 11, fontFace: BFONT, color: T.subtext,
        valign: "top", align: "left", margin: 0, lineSpacingMultiple: 1.3
      });
    });
  }

  addKeyTakeaway(s5, T, "Jump's moat in prediction markets mirrors its equities HFT edge: speed, quantitative depth, and risk discipline, applied to a retail-heavy market.");
  addSource(s5, T, "Source: Jump Trading infrastructure overview (Hot Chips 34, 2022); DDN case study; internal capability assessment", 5);

  // ================================================================
  // SLIDE 6: TEAM & CAPITAL (LIGHT)
  // ================================================================
  let s6 = pres.addSlide();
  s6.background = { color: T.bg };

  addSlideHeader(s6, T, "TEAM & CAPITAL DEPLOYMENT", "Five-person desk with $15M across market making, arbitrage, and reserve");

  const teamX = ML;
  const teamW = 5.8;
  s6.addText("TEAM COMPOSITION", {
    x: teamX, y: 1.55, w: teamW, h: 0.3,
    fontSize: 11, fontFace: SFONT, bold: true, color: ACCENT, charSpacing: 2, align: "left", margin: 0
  });
  addRule(s6, teamX, 1.88, teamW, T.rule);

  const roles = [
    { role: "Lead Quant / Portfolio Manager", desc: "Overall strategy direction, risk oversight, P&L responsibility, and stakeholder reporting" },
    { role: "Sports Quant Researcher", desc: "NBA/NCAA modeling, feature engineering, backtesting, model validation and ongoing calibration" },
    { role: "Execution Engineer", desc: "Low-latency order routing, API integration with Kalshi/Polymarket, and infrastructure scaling" },
    { role: "Data Scientist", desc: "Alternative data pipelines, NLP for injury/lineup signals, and real-time feature computation" },
    { role: "Risk & Operations Analyst", desc: "Position monitoring, compliance tracking, settlement reconciliation, and drawdown management" }
  ];

  roles.forEach((r, i) => {
    const ry = 2.1 + i * 0.85;
    s6.addShape(PRES.shapes.OVAL, {
      x: teamX + 0.05, y: ry + 0.05, w: 0.32, h: 0.32, fill: { color: ACCENT }, line: { type: "none" }
    });
    s6.addText(String(i + 1), {
      x: teamX + 0.05, y: ry + 0.05, w: 0.32, h: 0.32,
      fontSize: 11, fontFace: HFONT, color: "FFFFFF", align: "center", valign: "middle", margin: 0
    });
    s6.addText(r.role, {
      x: teamX + 0.5, y: ry, w: teamW - 0.6, h: 0.3,
      fontSize: 13, fontFace: SFONT, bold: true, color: T.text, align: "left", margin: 0
    });
    s6.addText(r.desc, {
      x: teamX + 0.5, y: ry + 0.32, w: teamW - 0.6, h: 0.3,
      fontSize: 10, fontFace: BFONT, color: T.muted, align: "left", margin: 0
    });
    if (i < roles.length - 1) addRule(s6, teamX + 0.5, ry + 0.72, teamW - 0.6, T.rule);
  });

  const capX = 7.0;
  const capW = CW - (capX - ML);
  s6.addText("CAPITAL ALLOCATION", {
    x: capX, y: 1.55, w: capW, h: 0.3,
    fontSize: 11, fontFace: SFONT, bold: true, color: ACCENT, charSpacing: 2, align: "left", margin: 0
  });
  addRule(s6, capX, 1.88, capW, T.rule);

  // Donut with callout labels - labels positioned outside each slice with leader lines
  // Allocation: NBA 33%, NCAA 20%, Cross 27%, Reserve 20%
  const slices = [
    { label: "NBA Market Making",  value: "$5M", pct: "33%", color: ACCENT,     pctNum: 0.33 },
    { label: "NCAA Market Making", value: "$3M", pct: "20%", color: ACCENT_DIM, pctNum: 0.20 },
    { label: "Cross-Platform Arb", value: "$4M", pct: "27%", color: "8A8A8A",   pctNum: 0.27 },
    { label: "Capital Reserve",    value: "$3M", pct: "20%", color: "C8C8C8",   pctNum: 0.20 }
  ];

  // Donut geometry - centered in right panel with room for callouts around it
  const chartH = 2.4;
  const chartW = chartH;
  const donutCx = capX + capW / 2;               // center X
  const donutCy = 3.8;                           // center Y (fixed; gives room above/below)
  const chartX = donutCx - chartW / 2;
  const chartY = donutCy - chartH / 2;
  const outerR = chartW / 2;                     // outer radius
  const labelR = outerR + 0.35;                  // leader-line endpoint
  const textR  = outerR + 0.45;                  // where text boxes start

  s6.addChart(pres.charts.DOUGHNUT, [{
    name: "Allocation",
    labels: slices.map(s => s.label),
    values: slices.map(s => s.pctNum * 100)
  }], {
    x: chartX, y: chartY, w: chartW, h: chartH,
    chartColors: slices.map(s => s.color),
    showPercent: false,
    showTitle: false,
    showLegend: false,
    showValue: false,
    holeSize: 55
  });

  // Compute slice midpoint angles (0° = 12 o'clock, clockwise) and draw callouts
  let cumulative = 0;
  slices.forEach((s, i) => {
    const midPct = cumulative + s.pctNum / 2;
    cumulative += s.pctNum;
    const angleRad = midPct * 2 * Math.PI - Math.PI / 2;   // 0 rad = 3 o'clock; offset -90° so 0 rad = 12
    const cosA = Math.cos(angleRad);
    const sinA = Math.sin(angleRad);

    // Leader line: from donut edge to label anchor
    const x1 = donutCx + outerR * cosA;
    const y1 = donutCy + outerR * sinA;
    const x2 = donutCx + labelR * cosA;
    const y2 = donutCy + labelR * sinA;
    s6.addShape(PRES.shapes.LINE, {
      x: Math.min(x1, x2), y: Math.min(y1, y2),
      w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
      line: { color: s.color, width: 1, beginArrowType: "none", endArrowType: "none" },
      flipH: x2 < x1, flipV: y2 < y1
    });

    // Label box position - anchored on the side away from center
    const onRight = cosA >= 0;
    const boxW = 1.8;
    const boxH = 0.55;
    const labelX = onRight ? (donutCx + textR * cosA) : (donutCx + textR * cosA - boxW);
    const labelY = donutCy + textR * sinA - boxH / 2;
    const textAlign = onRight ? "left" : "right";

    // Small color swatch as a visual connector
    const swatchSize = 0.1;
    const swatchX = onRight ? labelX : (labelX + boxW - swatchSize);
    s6.addShape(PRES.shapes.RECTANGLE, {
      x: swatchX, y: labelY + 0.06, w: swatchSize, h: swatchSize,
      fill: { color: s.color }, line: { type: "none" }
    });

    // Label name on top
    s6.addText(s.label, {
      x: onRight ? labelX + 0.18 : labelX, y: labelY,
      w: boxW - 0.18, h: 0.25,
      fontSize: 10, fontFace: SFONT, bold: true, color: T.text,
      align: textAlign, valign: "middle", margin: 0
    });
    // Value + pct below
    s6.addText([
      { text: s.value, options: { fontSize: 11, fontFace: HFONT, color: T.text } },
      { text: "  ·  " + s.pct, options: { fontSize: 9.5, fontFace: BFONT, color: T.muted } }
    ], {
      x: labelX, y: labelY + 0.25,
      w: boxW, h: 0.3,
      align: textAlign, valign: "middle", margin: 0
    });
  });

  // Center-of-donut total (positioned inside the hole - hole diameter ~1.32", so stay well within)
  s6.addText("$15M", {
    x: donutCx - 0.5, y: donutCy - 0.3, w: 1.0, h: 0.36,
    fontSize: 18, fontFace: HFONT, color: T.text, align: "center", valign: "middle", margin: 0
  });
  s6.addText("TOTAL CAPITAL", {
    x: donutCx - 0.5, y: donutCy + 0.05, w: 1.0, h: 0.2,
    fontSize: 6.5, fontFace: SFONT, bold: true, color: ACCENT, charSpacing: 1.5, align: "center", valign: "middle", margin: 0
  });

  addKeyTakeaway(s6, T, "The team mirrors Jump's proven pod structure: lean, autonomous, and directly accountable. The 20% reserve buffers strategy scaling.");
  addSource(s6, T, "Source: Internal headcount and capital planning; Jump Trading organizational model", 6);

  // ================================================================
  // SLIDE 7: FINANCIAL PROJECTIONS (LIGHT)
  // ================================================================
  let s7 = pres.addSlide();
  s7.background = { color: T.bg };

  addSlideHeader(s7, T, "FINANCIAL PROJECTIONS", [
    { text: "Year 1 targets ", options: { fontSize: 22, fontFace: HFONT, color: T.text } },
    { text: "$3.4M gross revenue, 13.3% ROC", options: { fontSize: 22, fontFace: HFONT, color: ACCENT } },
    { text: ", and 1.8 estimated Sharpe ratio", options: { fontSize: 22, fontFace: HFONT, color: T.text } }
  ]);

  const chartTop = 1.55;
  const chartBottom = 6.3;
  s7.addText("QUARTERLY REVENUE VS. OPERATING COSTS ($K)", {
    x: ML, y: chartTop, w: 6.5, h: 0.3,
    fontSize: 10, fontFace: SFONT, bold: true, color: ACCENT, charSpacing: 2, align: "left", margin: 0
  });

  // Revenue red (primary), Costs muted gray (secondary) - semantic two-tone
  s7.addChart(pres.charts.BAR, [
    { name: "Revenue", labels: ["Q1", "Q2", "Q3", "Q4"], values: [450, 680, 920, 1350] },
    { name: "Costs", labels: ["Q1", "Q2", "Q3", "Q4"], values: [380, 350, 340, 330] }
  ], {
    x: ML, y: chartTop + 0.4, w: 6.5, h: chartBottom - chartTop - 0.4, barDir: "col",
    chartColors: [ACCENT, "A0A0A0"],
    chartArea: { fill: { type: "none" }, border: { pt: 0, color: "FFFFFF" } },
    plotArea: { fill: { type: "none" }, border: { pt: 0, color: "FFFFFF" } },
    catAxisLabelColor: T.subtext, valAxisLabelColor: T.muted,
    catAxisLabelFontFace: BFONT, valAxisLabelFontFace: BFONT,
    catAxisLabelFontSize: 12, valAxisLabelFontSize: 11,
    valGridLine: { style: "none" },
    catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: T.text,
    dataLabelFontSize: 11, dataLabelFontFace: BFONT,
    showLegend: true, legendPos: "b", legendColor: T.subtext,
    legendFontSize: 12, legendFontFace: BFONT
  });

  const prx = 7.6;
  const prxW = CW - (prx - ML);
  s7.addText("YEAR 1 SUMMARY", {
    x: prx, y: chartTop, w: prxW, h: 0.3,
    fontSize: 11, fontFace: SFONT, bold: true, color: ACCENT, charSpacing: 2, align: "left", margin: 0
  });
  addRule(s7, prx, chartTop + 0.33, prxW, T.rule);

  const plItems = [
    { label: "Gross Revenue", val: "$3.4M" },
    { label: "Operating Costs", val: "$1.4M" },
    { label: "Net P&L", val: "$2.0M" },
    { label: "Return on Capital", val: "13.3%" },
    { label: "Sharpe Ratio (est.)", val: "1.8" }
  ];
  const summaryHeight = 3.2;
  const plRowH = summaryHeight / plItems.length;
  plItems.forEach((p, i) => {
    const py = chartTop + 0.45 + i * plRowH;
    if (i < plItems.length - 1) addRule(s7, prx, py + plRowH - 0.05, prxW, T.rule);
    s7.addText(p.label, {
      x: prx, y: py, w: 3.0, h: plRowH - 0.05,
      fontSize: 12, fontFace: BFONT, color: T.subtext, align: "left", valign: "middle", margin: 0
    });
    s7.addText(p.val, {
      x: prx + 3.0, y: py, w: prxW - 3.0, h: plRowH - 0.05,
      fontSize: 20, fontFace: HFONT, color: T.text, align: "right", valign: "middle", margin: 0
    });
  });

  const assumpY = chartTop + 0.45 + summaryHeight + 0.2;
  s7.addText("ASSUMPTIONS", {
    x: prx, y: assumpY, w: prxW, h: 0.25,
    fontSize: 9, fontFace: SFONT, bold: true, color: ACCENT, charSpacing: 2, align: "left", margin: 0
  });
  s7.addText("Average spread capture of 2.5% on market-making volume with 60% fill rate. Cross-platform arbitrage targets 3.5% margin with $800K average monthly deployment. Q1 ramp includes infrastructure build-out and API integration. Costs include team compensation, data feeds, and platform fees. Year 2 targets $5.2M gross as strategies mature.", {
    x: prx, y: assumpY + 0.25, w: prxW, h: 1.1,
    fontSize: 9, fontFace: BFONT, color: T.muted, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.35
  });

  addKeyTakeaway(s7, T, "Year 1 is a ramp year. Revenue accelerates through Q3-Q4 as models calibrate and capital deployment scales. Success triggers $30M capital expansion in Year 2.");
  addSource(s7, T, "Source: Internal financial modeling; platform fee schedules; market-making margin benchmarks (ChainCatcher, Feb 2026)", 7);

  // ================================================================
  // SLIDE 8: RISK FRAMEWORK (LIGHT) - FIXED: wider IMPACT col
  // ================================================================
  let s8 = pres.addSlide();
  s8.background = { color: T.bg };

  addSlideHeader(s8, T, "RISK FRAMEWORK", [
    { text: "Prediction markets carry ", options: { fontSize: 22, fontFace: HFONT, color: T.text } },
    { text: "regulatory, liquidity, and model risks", options: { fontSize: 22, fontFace: HFONT, color: ACCENT } }
  ]);

  // Impact by INTENSITY: HIGH = solid red / MED = mid-gray / LOW = light-gray outline
  const risks = [
    {
      risk: "Regulatory\nUncertainty", impact: "HIGH", impactColor: "FFFFFF", impactBg: ACCENT, impactBorder: ACCENT,
      detail: "State gaming commissions challenging CFTC jurisdiction over sports contracts. Multiple cease-and-desist orders issued to Kalshi. NY gaming commission initiated legal action. Event contract vs. gambling classification remains unresolved at both levels.",
      mitigation: "Diversify across CFTC-regulated (Kalshi) and crypto-native (Polymarket) platforms. Maintain flexibility to shift capital into non-sports contracts if regulation tightens. Legal counsel engaged for state-level compliance review."
    },
    {
      risk: "Market Making\nMargin Compression", impact: "MED", impactColor: "FFFFFF", impactBg: "6C6C6C", impactBorder: "6C6C6C",
      detail: "Spreads compressing from 4-5% to ~2% as institutional players enter. DraftKings, Robinhood, and Coinbase building own exchange infrastructure. Jump already provides liquidity at the firm level.",
      mitigation: "Focus on less liquid NCAA markets with wider margins. Supplement MM revenue with directional alpha from proprietary models. Scale trading volume to offset margin compression via higher throughput."
    },
    {
      risk: "Liquidity &\nCounterparty Risk", impact: "MED", impactColor: "FFFFFF", impactBg: "6C6C6C", impactBorder: "6C6C6C",
      detail: "Nascent asset class with limited off-peak depth. Platform downtime, settlement disputes, or sudden liquidity withdrawal could strand deployed trading capital.",
      mitigation: "$3M capital reserve (20%) as liquidity buffer. No single venue holds >40% of deployed capital. Strict per-contract and per-platform position limits enforced via automated monitoring."
    },
    {
      risk: "Model Risk &\nBlack Swan Events", impact: "LOW", impactColor: "6C6C6C", impactBg: "F8F8F8", impactBorder: "C8C8C8",
      detail: "Game cancellations, player suspensions, or controversial outcomes could invalidate settlement logic. Model assumptions may fail during unprecedented game situations.",
      mitigation: "Event-level stop losses on all open positions. Single-game exposure capped at 2% of total capital. Correlated contract hedging where available. Monthly stress tests run against historical scenarios."
    }
  ];

  const tx = ML;
  const tw = CW;
  const headerY = 1.55;
  const headerH = 0.4;
  const rowH = 1.15;
  // Widened IMPACT column 0.9 -> 1.2 so header doesn't wrap
  const colWs = [1.7, 1.2, 4.3, 4.9];

  s8.addShape(PRES.shapes.RECTANGLE, {
    x: tx, y: headerY, w: tw, h: headerH, fill: { color: "EFEFEF" },
    line: { color: T.border, width: 0.5 }
  });
  s8.addShape(PRES.shapes.RECTANGLE, {
    x: tx, y: headerY, w: tw, h: 0.03, fill: { color: ACCENT }, line: { type: "none" }
  });
  const headers = ["RISK FACTOR", "IMPACT", "DESCRIPTION", "MITIGATION STRATEGY"];
  let hx = tx;
  headers.forEach((h, i) => {
    s8.addText(h, {
      x: hx + 0.15, y: headerY, w: colWs[i] - 0.3, h: headerH,
      fontSize: 10, fontFace: SFONT, bold: true, color: ACCENT, charSpacing: 2,
      align: i === 1 ? "center" : "left", valign: "middle", margin: 0
    });
    hx += colWs[i];
  });

  risks.forEach((r, i) => {
    const ry = headerY + headerH + i * rowH;
    const rowBg = i % 2 === 0 ? T.card : "FAFAFA";
    s8.addShape(PRES.shapes.RECTANGLE, {
      x: tx, y: ry, w: tw, h: rowH, fill: { color: rowBg },
      line: { color: T.border, width: 0.3 }
    });

    let cx = tx;
    s8.addText(r.risk, {
      x: cx + 0.15, y: ry, w: colWs[0] - 0.3, h: rowH,
      fontSize: 11, fontFace: SFONT, bold: true, color: T.text, align: "left", valign: "middle", margin: 0, lineSpacingMultiple: 1.2
    });
    cx += colWs[0];

    // Impact pill
    const pillW = 0.8;
    const pillH = 0.3;
    const pillX = cx + (colWs[1] - pillW) / 2;
    const pillY = ry + (rowH - pillH) / 2;
    s8.addShape(PRES.shapes.ROUNDED_RECTANGLE, {
      x: pillX, y: pillY, w: pillW, h: pillH,
      fill: { color: r.impactBg },
      line: { color: r.impactBorder, width: 0.75 },
      rectRadius: 0.05
    });
    s8.addText(r.impact, {
      x: pillX, y: pillY, w: pillW, h: pillH,
      fontSize: 10, fontFace: SFONT, bold: true, color: r.impactColor, charSpacing: 1,
      align: "center", valign: "middle", margin: 0
    });
    cx += colWs[1];

    s8.addText(r.detail, {
      x: cx + 0.15, y: ry + 0.08, w: colWs[2] - 0.3, h: rowH - 0.16,
      fontSize: 10, fontFace: BFONT, color: T.subtext, align: "left", valign: "middle", margin: 0, lineSpacingMultiple: 1.25
    });
    cx += colWs[2];

    s8.addText(r.mitigation, {
      x: cx + 0.15, y: ry + 0.08, w: colWs[3] - 0.3, h: rowH - 0.16,
      fontSize: 10, fontFace: BFONT, color: T.subtext, align: "left", valign: "middle", margin: 0, lineSpacingMultiple: 1.25
    });
  });

  addKeyTakeaway(s8, T, "Regulatory risk is the primary concern; the CFTC-vs-state battle is unresolved. Platform and contract diversification is the key mitigation lever.");
  addSource(s8, T, "Source: Bloomberg (Feb 2026); The Block regulatory analysis (Dec 2025); SCCG Management prediction market report (Apr 2026)", 8);

  // ================================================================
  // SLIDE 9: EXECUTION TIMELINE (LIGHT)
  // ================================================================
  let s9 = pres.addSlide();
  s9.background = { color: T.bg };

  addSlideHeader(s9, T, "EXECUTION TIMELINE", "Twelve-month phased deployment from build through March Madness");

  const tlY = 1.55;
  s9.addText("TYPICAL DEPLOYMENT PROGRESSION", {
    x: ML, y: tlY, w: CW, h: 0.25,
    fontSize: 9, fontFace: SFONT, bold: true, color: ACCENT, charSpacing: 2, align: "left", margin: 0
  });

  const phases = [
    { num: "1", label: "MONTH 1-2", title: "Infrastructure Build",
      desc: "Team onboarding and access provisioning. API integration with Kalshi and Polymarket exchange endpoints. Execution engine deployment on Jump's infrastructure. Data pipeline setup for play-by-play feeds, player tracking, and odds scraping." },
    { num: "2", label: "MONTH 3-4", title: "Paper Trading",
      desc: "Live paper trading across all four strategies with full risk monitoring. Model calibration using real NBA season data. Risk parameter tuning and position limit testing. Backtesting validation against historical odds datasets." },
    { num: "3", label: "MONTH 5-8", title: "Live Ramp",
      desc: "Deploy initial $5M live capital across NBA market making. Scale to cross-platform arbitrage positions. Begin NCAA regular season coverage. Activate systematic strategy on player prop market contracts." },
    { num: "4", label: "MONTH 9-12", title: "Full Operations",
      desc: "Full $15M capital deployment across all strategies. March Madness intensive: 67 tournament games in 3 weeks. NCAA futures and conference markets. Year 1 performance review and Year 2 planning." }
  ];

  // Timeline: label row, horizontal line, dots, title row, cards
  const labelY = 1.96;   // phase label (MONTH X-Y)
  const lineY  = 2.55;   // horizontal connector line
  const dotY   = 2.38;   // circle dot center row
  const titleY = 2.95;   // phase title
  const cardY  = 3.45;   // card top
  const cardH  = 2.35;   // card height
  const pw = 2.70;
  const pgap = 0.30;

  // Horizontal connecting line across all 4 phases
  s9.addShape(PRES.shapes.RECTANGLE, {
    x: ML + 0.30, y: lineY, w: CW - 0.60, h: 0.04, fill: { color: T.rule }, line: { type: "none" }
  });

  phases.forEach((p, i) => {
    const px = ML + i * (pw + pgap);

    // Phase label
    s9.addText(p.label, {
      x: px, y: labelY, w: pw, h: 0.30,
      fontSize: 9, fontFace: SFONT, bold: true, color: ACCENT, charSpacing: 2, align: "center", margin: 0
    });

    // Number circle
    s9.addShape(PRES.shapes.OVAL, {
      x: px + pw / 2 - 0.19, y: dotY, w: 0.38, h: 0.38, fill: { color: ACCENT }, line: { type: "none" }
    });
    s9.addText(p.num, {
      x: px + pw / 2 - 0.19, y: dotY, w: 0.38, h: 0.38,
      fontSize: 13, fontFace: HFONT, color: "FFFFFF", align: "center", valign: "middle", margin: 0
    });

    // Phase title
    s9.addText(p.title, {
      x: px, y: titleY, w: pw, h: 0.40,
      fontSize: 15, fontFace: SFONT, bold: true, color: T.text, align: "center", margin: 0
    });

    // Card
    s9.addShape(PRES.shapes.RECTANGLE, {
      x: px, y: cardY, w: pw, h: cardH, fill: { color: T.card },
      line: { color: T.border, width: 0.5 }
    });
    s9.addShape(PRES.shapes.RECTANGLE, {
      x: px, y: cardY, w: pw, h: 0.04, fill: { color: ACCENT }, line: { type: "none" }
    });
    s9.addText(p.desc, {
      x: px + 0.20, y: cardY + 0.15, w: pw - 0.35, h: cardH - 0.20,
      fontSize: 10, fontFace: BFONT, color: T.subtext, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.35
    });
  });

  addKeyTakeaway(s9, T, "Phased deployment de-risks capital: paper trading validates models before live capital moves, with March Madness as the Year 1 stress test.");
  addSource(s9, T, "Source: Internal deployment planning; NBA/NCAA season calendars", 9);

  // ================================================================
  // SLIDE 10: RECOMMENDATION (DARK) - FIXED: thesis text fits in panel
  // ================================================================
  const T10 = THEME_DARK;
  let s10 = pres.addSlide();
  s10.background = { color: T10.bg };

  s10.addShape(PRES.shapes.RECTANGLE, {
    x: 8.5, y: 0, w: 4.8, h: SH, fill: { color: T10.panel }, line: { type: "none" }
  });

  s10.addText("RECOMMENDATION", {
    x: ML, y: 0.4, w: 7.5, h: 0.3,
    fontSize: 10, fontFace: SFONT, bold: true, color: ACCENT, charSpacing: 3, align: "left", margin: 0
  });
  addRule(s10, ML, 0.75, 2.5, ACCENT);

  s10.addText("Prediction markets are structurally identical to the derivatives markets Jump already dominates. The opportunity is to apply proven capabilities to a $44B market where the majority of participants are retail and institutional coverage remains nascent.", {
    x: ML, y: 0.9, w: 7.5, h: 0.9,
    fontSize: 12, fontFace: BFONT, color: T10.subtext, align: "left", margin: 0, lineSpacingMultiple: 1.4
  });

  const asks = [
    { num: "01", text: "Authorize a 5-person quantitative trading desk focused on NBA and NCAA sports prediction markets, reporting through the existing quantitative trading division structure." },
    { num: "02", text: "Commit $15M in initial capital: NBA market making ($5M), NCAA market making ($3M), cross-platform arbitrage ($4M), strategic reserve ($3M)." },
    { num: "03", text: "Approve headcount for 4 additional quants: 1 sports researcher, 1 execution engineer, 1 data scientist, and 1 risk/operations analyst." },
    { num: "04", text: "12-month performance gate: 13%+ return on capital, Sharpe >1.5. Success triggers $30M expansion to NFL, MLB, and international sports markets." }
  ];

  asks.forEach((a, i) => {
    const ay = 2.0 + i * 0.95;
    addRule(s10, ML, ay, 7.5, T10.rule);
    s10.addText(a.num, {
      x: ML, y: ay + 0.12, w: 0.9, h: 0.6,
      fontSize: 30, fontFace: HFONT, color: ACCENT, align: "left", valign: "top", margin: 0
    });
    s10.addText(a.text, {
      x: ML + 1.0, y: ay + 0.15, w: 6.3, h: 0.7,
      fontSize: 12, fontFace: BFONT, color: T10.subtext, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.3
    });
  });

  // WHY NOW rule at 0.95" below last item, matching the inter-item spacing exactly
  const whyNowRuleY = 2.0 + 4 * 0.95;  // 5.80
  addRule(s10, ML, whyNowRuleY, 7.5, T10.rule);
  s10.addText([
    { text: "WHY NOW   ", options: { fontSize: 10, fontFace: SFONT, bold: true, color: ACCENT, charSpacing: 2 } },
    { text: "Jump has already committed 20+ staff and equity stakes in Kalshi and Polymarket at the firm level. A dedicated sports desk converts that strategic position into a structured P&L with clear accountability, proven strategies, and a well-defined path to scale.", options: { fontSize: 11, fontFace: BFONT, color: T10.subtext } }
  ], {
    x: ML, y: whyNowRuleY + 0.1, w: 7.5, h: 0.8,
    align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.3
  });

  s10.addText("Source: Internal strategy and financial planning; Bloomberg prediction market coverage (Feb 2026)", {
    x: ML, y: 6.9, w: 7.5, h: 0.25,
    fontSize: 7.5, fontFace: BFONT, italic: true, color: T10.muted, align: "left", margin: 0
  });
  s10.addText("10", {
    x: 7.3, y: 6.9, w: 0.5, h: 0.25,
    fontSize: 8, fontFace: SFONT, bold: true, color: ACCENT, align: "right", margin: 0
  });

  s10.addText("THESIS", {
    x: 9.0, y: 0.6, w: 3.8, h: 0.3,
    fontSize: 10, fontFace: SFONT, bold: true, color: ACCENT, charSpacing: 3, align: "left", margin: 0
  });
  addRule(s10, 9.0, 0.95, 2.5, ACCENT);

  s10.addText("The Same\nEdge,\nA New\nMarket", {
    x: 9.0, y: 1.2, w: 3.8, h: 3.0,
    fontSize: 42, fontFace: HFONT, color: T10.text, align: "left", valign: "top",
    margin: 0, lineSpacingMultiple: 1.05
  });

  s10.addText([
    { text: "Prediction markets are binary derivatives.\nJump has traded derivatives for 25 years.\n\nThe participants are retail.\nThe spreads are wide.\nThe infrastructure requirements are high.\n\n", options: { fontSize: 11, fontFace: BFONT, color: T10.subtext } },
    { text: "This is our market.", options: { fontSize: 11, fontFace: SFONT, bold: true, color: ACCENT } }
  ], {
    x: 9.0, y: 4.4, w: 3.8, h: 2.6,
    align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.4
  });

  await pres.writeFile({ fileName: "/home/assets/sports_prediction_markets_desk.pptx" });
  console.log("Presentation created successfully.");
}

buildDeck().catch(err => { console.error(err); process.exit(1); });
