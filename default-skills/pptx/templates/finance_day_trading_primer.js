/**
 * Day Trading, Explained — pptxgenjs recreation
 *
 * Faithfully reproduces the dark, editorial deck defined in the HTML source
 * (1920×1080 stage) as a 13.333" × 7.5" widescreen PowerPoint.
 *
 * Design system (translated from the HTML CSS vars):
 *   --bg        #16120E  warm off-black       (oklch 0.16 0.01 60)
 *   --bg-2      #1E1915  slightly lifted card bg
 *   --bg-3      #25201B  lifted bg 3
 *   --fg        #F4F1EB  warm off-white
 *   --fg-dim    #C3BDB1  dimmed body text
 *   --fg-muted  #8A8478  muted captions / chrome
 *   --rule      #44403A  strong rule
 *   --rule-soft #33302B  soft rule / card border
 *   --accent    #E6B55A  warm gold
 *   --accent-2  #C17B5B  clay rust
 *   --up        #7FC98A  green tickers
 *   --dn        #D37B6A  red tickers
 *
 * Fonts:
 *   serif  → "Georgia"         (standin for Instrument Serif — widely available)
 *   sans   → "Calibri"         (standin for Geist)
 *   mono   → "Consolas"        (standin for JetBrains Mono)
 *
 * Coordinate conversion: HTML is 1920×1080 px, deck is 13.333×7.5 inches.
 * 1 px ≈ 0.006944 inches. Slide padding "100px" ≈ 0.694".
 */

const pptxgen = require("pptxgenjs");

// ---- Design tokens ----
const COLORS = {
  bg:       "16120E",
  bg2:      "1E1915",
  bg3:      "25201B",
  fg:       "F4F1EB",
  fgDim:    "C3BDB1",
  fgMuted:  "8A8478",
  rule:     "44403A",
  ruleSoft: "33302B",
  accent:   "E6B55A",
  accent2:  "C17B5B",
  up:       "7FC98A",
  dn:       "D37B6A",
};

const FONTS = {
  serif: "Georgia",
  sans:  "Calibri",
  mono:  "Consolas",
};

// ---- Helpers ----
const px = (n) => n * (13.333 / 1920); // 1920px wide stage → 13.333" slide
const PAD = px(100);                    // standard left/right page padding

// ---- Create presentation ----
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";            // 13.333" × 7.5"
pres.author = "Day Trading Primer";
pres.company = "Day Trading · Explained";
pres.title = "Day Trading, Explained";
pres.subject = "A primer for the absolute beginner";

const SLIDE_W = 13.333;
const SLIDE_H = 7.5;

// ---------------------------------------------------------------
// Shared chrome: top eyebrow bar & bottom footer with rule
// ---------------------------------------------------------------
function addChromeTop(slide, leftText, rightText = "DAY TRADING · EXPLAINED") {
  // accent dot
  slide.addShape(pres.shapes.OVAL, {
    x: PAD, y: px(52) + px(8),
    w: px(8), h: px(8),
    fill: { color: COLORS.accent },
    line: { color: COLORS.accent, width: 0 },
  });
  // left label (with leading space to clear dot)
  slide.addText(leftText, {
    x: PAD + px(20), y: px(44),
    w: px(800), h: px(32),
    fontFace: FONTS.mono, fontSize: 11,
    color: COLORS.fgMuted,
    charSpacing: 2,
    margin: 0, valign: "middle", align: "left",
  });
  // right label
  slide.addText(rightText, {
    x: SLIDE_W - PAD - px(800), y: px(44),
    w: px(800), h: px(32),
    fontFace: FONTS.mono, fontSize: 11,
    color: COLORS.fgMuted,
    charSpacing: 2,
    margin: 0, valign: "middle", align: "right",
  });
}

function addChromeBottom(slide, pageNum) {
  const y = SLIDE_H - px(44) - px(16);
  const leftLabel = "DAY TRADING";
  const rightLabel = String(pageNum).padStart(2, "0");

  // left label
  slide.addText(leftLabel, {
    x: PAD, y: y,
    w: px(260), h: px(32),
    fontFace: FONTS.mono, fontSize: 11,
    color: COLORS.fgMuted,
    charSpacing: 2,
    margin: 0, valign: "middle", align: "left",
  });
  // right page number
  slide.addText(rightLabel, {
    x: SLIDE_W - PAD - px(100), y: y,
    w: px(100), h: px(32),
    fontFace: FONTS.mono, fontSize: 11,
    color: COLORS.fgMuted,
    charSpacing: 2,
    margin: 0, valign: "middle", align: "right",
  });
  // thin rule between them
  const ruleX = PAD + px(260) + px(24);
  const ruleW = SLIDE_W - PAD - px(100) - px(24) - ruleX;
  slide.addShape(pres.shapes.LINE, {
    x: ruleX, y: y + px(16),
    w: ruleW, h: 0,
    line: { color: COLORS.ruleSoft, width: 0.75 },
  });
}

// Subtle grid-background hint: a few very faint grid lines.
// We keep this OPTIONAL per slide and use very thin lines to suggest the HTML's
// radial-masked grid, without cluttering the slide.
function addSubtleGrid(slide) {
  const step = px(160);
  const color = "1F1A15"; // just above bg
  const inset = px(60);
  // vertical lines
  for (let x = inset; x < SLIDE_W - inset; x += step) {
    slide.addShape(pres.shapes.LINE, {
      x: x, y: inset, w: 0, h: SLIDE_H - 2 * inset,
      line: { color, width: 0.4 },
    });
  }
  // horizontal lines
  for (let y = inset; y < SLIDE_H - inset; y += step) {
    slide.addShape(pres.shapes.LINE, {
      x: inset, y: y, w: SLIDE_W - 2 * inset, h: 0,
      line: { color, width: 0.4 },
    });
  }
}

// Reusable: a "card" — dark lifted rectangle with soft border
function addCard(slide, x, y, w, h) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: COLORS.bg2 },
    line: { color: COLORS.ruleSoft, width: 0.75 },
  });
}

// Reusable: eyebrow text (mono, uppercase, gold, tracked)
function addEyebrow(slide, text, x, y, w) {
  slide.addText(text.toUpperCase(), {
    x, y, w, h: px(36),
    fontFace: FONTS.mono, fontSize: 12,
    color: COLORS.accent,
    charSpacing: 3,
    margin: 0, valign: "top", align: "left",
  });
}

// Reusable: section H2 — serif, potentially with italic gold span
// `parts` is an array: [{text, italic?, accent?}]
function addH2(slide, parts, x, y, w, h, fontSize = 44) {
  const runs = parts.map((p, i) => ({
    text: p.text,
    options: {
      italic: !!p.italic,
      color: p.accent ? COLORS.accent : COLORS.fg,
      breakLine: !!p.breakLine,
    },
  }));
  slide.addText(runs, {
    x, y, w, h,
    fontFace: FONTS.serif, fontSize,
    color: COLORS.fg,
    charSpacing: -1,
    margin: 0, valign: "top", align: "left",
    paraSpaceAfter: 0,
  });
}

// ---------------------------------------------------------------
// SLIDE 01 — TITLE
// ---------------------------------------------------------------
function slide01() {
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addSubtleGrid(s);

  // Top-left badge "A PRIMER · 2026" with accent dot
  s.addShape(pres.shapes.OVAL, {
    x: PAD, y: px(52) + px(8),
    w: px(8), h: px(8),
    fill: { color: COLORS.accent },
    line: { color: COLORS.accent, width: 0 },
  });
  s.addText("A PRIMER · 2026", {
    x: PAD + px(20), y: px(44),
    w: px(500), h: px(32),
    fontFace: FONTS.mono, fontSize: 11,
    color: COLORS.fgMuted,
    charSpacing: 2,
    margin: 0, valign: "middle", align: "left",
  });
  // Top-right exchanges
  s.addText("NYSE · NASDAQ · CBOE", {
    x: SLIDE_W - PAD - px(500), y: px(44),
    w: px(500), h: px(32),
    fontFace: FONTS.mono, fontSize: 11,
    color: COLORS.fgMuted,
    charSpacing: 2,
    margin: 0, valign: "middle", align: "right",
  });

  // Eyebrow
  addEyebrow(s, "For the absolute beginner", PAD, px(360), px(1200));

  // Giant title "Day Trading, explained." — italic accent on "explained."
  s.addText([
    { text: "Day Trading,", options: { color: COLORS.fg, breakLine: true } },
    { text: "explained.",  options: { color: COLORS.accent, italic: true } },
  ], {
    x: PAD, y: px(420),
    w: px(1700), h: px(400),
    fontFace: FONTS.serif, fontSize: 96,
    charSpacing: -2,
    margin: 0, valign: "top", align: "left",
    paraSpaceAfter: 0,
  });

  // Bottom row: slide count (left) and tickers (right)
  const bottomY = SLIDE_H - px(90) - px(16);
  s.addText("13 SLIDES", {
    x: PAD, y: bottomY,
    w: px(300), h: px(32),
    fontFace: FONTS.mono, fontSize: 11,
    color: COLORS.fgMuted,
    charSpacing: 2,
    margin: 0, valign: "middle", align: "left",
  });

  // Tickers: SPY ▲ 0.42%   QQQ ▲ 0.71%   AAPL ▼ 0.18%   NVDA ▲ 1.93%
  // Laid out as rich-text on the right side.
  const tickerRuns = [
    { text: "SPY ",    options: { color: COLORS.fgMuted } },
    { text: "▲ 0.42%", options: { color: COLORS.up } },
    { text: "   QQQ ", options: { color: COLORS.fgMuted } },
    { text: "▲ 0.71%", options: { color: COLORS.up } },
    { text: "   AAPL ",options: { color: COLORS.fgMuted } },
    { text: "▼ 0.18%", options: { color: COLORS.dn } },
    { text: "   NVDA ",options: { color: COLORS.fgMuted } },
    { text: "▲ 1.93%", options: { color: COLORS.up } },
  ];
  s.addText(tickerRuns, {
    x: SLIDE_W - PAD - px(900), y: bottomY,
    w: px(900), h: px(32),
    fontFace: FONTS.mono, fontSize: 11,
    charSpacing: 2,
    margin: 0, valign: "middle", align: "right",
  });
}

// ---------------------------------------------------------------
// SLIDE 02 — WHAT IT IS
// ---------------------------------------------------------------
function slide02() {
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };

  addChromeTop(s, "02 / WHAT IT IS");

  // eyebrow
  addEyebrow(s, "Definition", PAD, px(180), px(1000));

  // headline with italic accent on "single"
  s.addText([
    { text: "Buying and selling the same", options: { color: COLORS.fg, breakLine: true } },
    { text: "security within a ",          options: { color: COLORS.fg } },
    { text: "single",                      options: { color: COLORS.accent, italic: true } },
    { text: " day.",                       options: { color: COLORS.fg } },
  ], {
    x: PAD, y: px(230),
    w: px(1700), h: px(260),
    fontFace: FONTS.serif, fontSize: 60,
    charSpacing: -1,
    margin: 0, valign: "top", align: "left",
    paraSpaceAfter: 0,
  });

  // body
  s.addText(
    "A day trader opens and closes positions before the market closes — usually minutes or hours apart — aiming to profit from small price movements. No overnight exposure. No long-term thesis. Just the session.",
    {
      x: PAD, y: px(540),
      w: px(1400), h: px(260),
      fontFace: FONTS.sans, fontSize: 20,
      color: COLORS.fgDim,
      margin: 0, valign: "top", align: "left",
      paraSpaceAfter: 0,
    }
  );

  addChromeBottom(s, 2);
}

// ---------------------------------------------------------------
// SLIDE 03 — HOW IT DIFFERS FROM INVESTING (table)
// ---------------------------------------------------------------
function slide03() {
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };

  addChromeTop(s, "03 / COMPARISON");

  addH2(
    s,
    [
      { text: "How it differs from " },
      { text: "investing", italic: true, accent: true },
      { text: "." },
    ],
    PAD, px(150), px(1700), px(220), 54
  );

  // Custom table: 3 columns × 5 rows. Header row + 4 data rows, each
  // separated by soft 1px rules.
  const tableTop = px(420);
  const rowH = px(116);
  const colX = [PAD, PAD + px(560), PAD + px(1100)];
  const colW = [px(540), px(540), px(540)];

  // Header row — mono uppercase
  const headerY = tableTop;
  const headers = ["", "DAY TRADING", "INVESTING"];
  headers.forEach((t, i) => {
    s.addText(t, {
      x: colX[i], y: headerY, w: colW[i], h: px(50),
      fontFace: FONTS.mono, fontSize: 11,
      color: COLORS.fgMuted,
      charSpacing: 3,
      margin: 0, valign: "top", align: "left",
    });
  });
  // rule under header
  s.addShape(pres.shapes.LINE, {
    x: PAD, y: headerY + px(60),
    w: SLIDE_W - 2 * PAD, h: 0,
    line: { color: COLORS.ruleSoft, width: 0.75 },
  });

  // Data rows
  const rows = [
    ["Horizon",             "Minutes to hours",            "Years to decades"],
    ["Analysis",            "Price action, charts, volume", "Earnings, fundamentals, macro"],
    ["Goal",                "Small, repeatable edges",      "Compounding over time"],
    ["Cost of being wrong", "Immediate, realized",          "Paper loss until sold"],
  ];
  rows.forEach((row, rIdx) => {
    const y = headerY + px(60) + rIdx * rowH + px(20);
    // key (serif, larger)
    s.addText(row[0], {
      x: colX[0], y: y, w: colW[0], h: rowH - px(40),
      fontFace: FONTS.serif, fontSize: 22,
      color: COLORS.fg,
      margin: 0, valign: "top", align: "left",
    });
    // day trading value
    s.addText(row[1], {
      x: colX[1], y: y + px(6), w: colW[1], h: rowH - px(40),
      fontFace: FONTS.sans, fontSize: 16,
      color: COLORS.fgDim,
      margin: 0, valign: "top", align: "left",
    });
    // investing value
    s.addText(row[2], {
      x: colX[2], y: y + px(6), w: colW[2], h: rowH - px(40),
      fontFace: FONTS.sans, fontSize: 16,
      color: COLORS.fgDim,
      margin: 0, valign: "top", align: "left",
    });
    // bottom rule for this row
    s.addShape(pres.shapes.LINE, {
      x: PAD, y: headerY + px(60) + (rIdx + 1) * rowH,
      w: SLIDE_W - 2 * PAD, h: 0,
      line: { color: COLORS.ruleSoft, width: 0.75 },
    });
  });

  addChromeBottom(s, 3);
}

// ---------------------------------------------------------------
// SLIDE 04 — A DAY IN THE LIFE (4 cards)
// ---------------------------------------------------------------
function slide04() {
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };

  addChromeTop(s, "04 / A DAY");

  addH2(s, [{ text: "A day in the life." }], PAD, px(150), px(1700), px(120), 60);

  // 4 cards across
  const cards = [
    { k: "06:30 — PRE-MARKET", h: "Scan",    p: "Review overnight news, earnings, futures. Build a watchlist of 3–5 candidates with clear catalysts." },
    { k: "09:30 — THE OPEN",   h: "Execute", p: "Highest volume and volatility. Setups trigger quickly. Size small; let the session settle before pressing." },
    { k: "11:30 — MIDDAY",     h: "Wait",    p: "Volume fades. Most pros step away. Bad trades tend to happen here out of boredom, not conviction." },
    { k: "15:00 — THE CLOSE",  h: "Flatten", p: "Volume returns. Positions are closed out before the bell. No open risk held overnight." },
  ];
  const gap = px(40);
  const usableW = SLIDE_W - 2 * PAD;
  const cardW = (usableW - 3 * gap) / 4;
  const cardH = px(520);
  const cardY = px(320);

  cards.forEach((c, i) => {
    const x = PAD + i * (cardW + gap);
    addCard(s, x, cardY, cardW, cardH);

    // inner padding ~ 36px
    const ix = x + px(36);
    const iw = cardW - px(72);

    // k label (mono, muted, uppercase)
    s.addText(c.k, {
      x: ix, y: cardY + px(32),
      w: iw, h: px(36),
      fontFace: FONTS.mono, fontSize: 10,
      color: COLORS.fgMuted,
      charSpacing: 3,
      margin: 0, valign: "top", align: "left",
    });
    // headline (serif)
    s.addText(c.h, {
      x: ix, y: cardY + px(86),
      w: iw, h: px(70),
      fontFace: FONTS.serif, fontSize: 28,
      color: COLORS.fg,
      margin: 0, valign: "top", align: "left",
    });
    // paragraph
    s.addText(c.p, {
      x: ix, y: cardY + px(180),
      w: iw, h: cardH - px(210),
      fontFace: FONTS.sans, fontSize: 15,
      color: COLORS.fgDim,
      margin: 0, valign: "top", align: "left",
      paraSpaceAfter: 0,
    });
  });

  addChromeBottom(s, 4);
}

// ---------------------------------------------------------------
// SLIDE 05 — CORE VOCABULARY (two-column indexed list)
// ---------------------------------------------------------------
function slide05() {
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };

  addChromeTop(s, "05 / LANGUAGE");

  addH2(s, [{ text: "The core vocabulary." }], PAD, px(150), px(1700), px(120), 60);

  const items = [
    { n: "01", t: "Bid / Ask",    d: "What buyers will pay vs. what sellers will accept." },
    { n: "02", t: "Spread",       d: "The gap between them — your instant cost of entry." },
    { n: "03", t: "Liquidity",    d: "How easily a position can be exited without moving price." },
    { n: "04", t: "Volatility",   d: "Size of price movement. Where profit and risk both live." },
    { n: "05", t: "Long / Short", d: "Betting on a rise vs. betting on a fall." },
    { n: "06", t: "Stop-loss",    d: "A pre-placed order that caps the damage if wrong." },
    { n: "07", t: "Margin",       d: "Borrowed capital — amplifies gains and losses alike." },
    { n: "08", t: "Slippage",     d: "The difference between expected fill and actual fill." },
  ];

  const listTop = px(320);
  const rowH = px(110);
  const usableW = SLIDE_W - 2 * PAD;
  const colGap = px(64);
  const colW = (usableW - colGap) / 2;

  // Top rule for each column
  for (let col = 0; col < 2; col++) {
    const colX = PAD + col * (colW + colGap);
    s.addShape(pres.shapes.LINE, {
      x: colX, y: listTop, w: colW, h: 0,
      line: { color: COLORS.ruleSoft, width: 0.75 },
    });
  }

  items.forEach((it, idx) => {
    const col = idx < 4 ? 0 : 1;
    const row = idx % 4;
    const colX = PAD + col * (colW + colGap);
    const y = listTop + row * rowH + px(22);

    // index number (mono, gold)
    s.addText(it.n, {
      x: colX, y: y,
      w: px(70), h: px(40),
      fontFace: FONTS.mono, fontSize: 12,
      color: COLORS.accent,
      charSpacing: 2,
      margin: 0, valign: "top", align: "left",
    });
    // term (serif)
    s.addText(it.t, {
      x: colX + px(85), y: y - px(6),
      w: px(290), h: px(50),
      fontFace: FONTS.serif, fontSize: 22,
      color: COLORS.fg,
      margin: 0, valign: "top", align: "left",
    });
    // definition (sans, dim)
    s.addText(it.d, {
      x: colX + px(390), y: y,
      w: colW - px(390), h: px(70),
      fontFace: FONTS.sans, fontSize: 14,
      color: COLORS.fgDim,
      margin: 0, valign: "top", align: "left",
    });
    // bottom rule for this row
    s.addShape(pres.shapes.LINE, {
      x: colX, y: listTop + (row + 1) * rowH, w: colW, h: 0,
      line: { color: COLORS.ruleSoft, width: 0.75 },
    });
  });

  addChromeBottom(s, 5);
}

// ---------------------------------------------------------------
// SLIDE 06 — COMMON STRATEGIES (4 cards like slide 4)
// ---------------------------------------------------------------
function slide06() {
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };

  addChromeTop(s, "06 / STRATEGIES");

  addH2(s, [{ text: "Common strategies." }], PAD, px(150), px(1700), px(180), 54);

  s.addText(
    "Four well-worn templates. None are secret — edge comes from execution.",
    {
      x: PAD, y: px(340),
      w: px(1600), h: px(60),
      fontFace: FONTS.sans, fontSize: 18,
      color: COLORS.fgDim,
      margin: 0, valign: "top", align: "left",
    }
  );

  const cards = [
    { k: "PATTERN 01", h: "Scalping",  p: "Dozens of tiny trades per day. Tight stops, thin margins. Speed and low commissions matter more than thesis." },
    { k: "PATTERN 02", h: "Momentum",  p: "Ride a stock that is already moving hard on volume. Enter on continuation, exit when the thrust stalls." },
    { k: "PATTERN 03", h: "Breakout",  p: "Trade the move after price clears a well-defined level. Reward clarity; invalidation is equally clear." },
    { k: "PATTERN 04", h: "Reversal",  p: "Fade an overextended move back to its mean. Higher hit-rate, but catches the rare sharp trend." },
  ];
  const gap = px(40);
  const usableW = SLIDE_W - 2 * PAD;
  const cardW = (usableW - 3 * gap) / 4;
  const cardH = px(480);
  const cardY = px(460);

  cards.forEach((c, i) => {
    const x = PAD + i * (cardW + gap);
    addCard(s, x, cardY, cardW, cardH);
    const ix = x + px(36);
    const iw = cardW - px(72);

    s.addText(c.k, {
      x: ix, y: cardY + px(32),
      w: iw, h: px(36),
      fontFace: FONTS.mono, fontSize: 10,
      color: COLORS.fgMuted,
      charSpacing: 3,
      margin: 0, valign: "top", align: "left",
    });
    s.addText(c.h, {
      x: ix, y: cardY + px(86),
      w: iw, h: px(70),
      fontFace: FONTS.serif, fontSize: 28,
      color: COLORS.fg,
      margin: 0, valign: "top", align: "left",
    });
    s.addText(c.p, {
      x: ix, y: cardY + px(180),
      w: iw, h: cardH - px(210),
      fontFace: FONTS.sans, fontSize: 15,
      color: COLORS.fgDim,
      margin: 0, valign: "top", align: "left",
    });
  });

  addChromeBottom(s, 6);
}

// ---------------------------------------------------------------
// SLIDE 07 — TOOLS OF THE TRADE (two-col: text + numbered list)
// ---------------------------------------------------------------
function slide07() {
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };

  addChromeTop(s, "07 / TOOLS");

  // LEFT column: title + body (wider column + smaller font so title fits on one line)
  addH2(s, [{ text: "Tools of the trade." }], PAD, px(200), px(820), px(160), 44);
  s.addText(
    "A trader's desk is deliberately boring — five reliable tools, used consistently, beat twenty fancy ones used haphazardly.",
    {
      x: PAD, y: px(370),
      w: px(820), h: px(260),
      fontFace: FONTS.sans, fontSize: 17,
      color: COLORS.fgDim,
      margin: 0, valign: "top", align: "left",
    }
  );

  // RIGHT column: indexed list
  const items = [
    { n: "01", t: "Broker & platform",  d: "Fast execution, reasonable fees, a usable order ticket." },
    { n: "02", t: "Charting software",  d: "Real-time prices, candles, a couple of indicators. Not twenty." },
    { n: "03", t: "Scanner",            d: "Surface the day's movers filtered by volume, gap, or news." },
    { n: "04", t: "Journal",            d: "Every trade logged. Without it, you can't improve — you can only remember." },
  ];
  const listX = PAD + px(920);
  const listW = SLIDE_W - PAD - listX;
  const listTop = px(200);
  const rowH = px(140);

  // Top rule
  s.addShape(pres.shapes.LINE, {
    x: listX, y: listTop, w: listW, h: 0,
    line: { color: COLORS.ruleSoft, width: 0.75 },
  });

  items.forEach((it, i) => {
    const y = listTop + i * rowH + px(26);
    s.addText(it.n, {
      x: listX, y: y,
      w: px(70), h: px(40),
      fontFace: FONTS.mono, fontSize: 11,
      color: COLORS.accent,
      charSpacing: 2,
      margin: 0, valign: "top", align: "left",
    });
    s.addText(it.t, {
      x: listX + px(90), y: y - px(8),
      w: listW - px(90), h: px(50),
      fontFace: FONTS.serif, fontSize: 24,
      color: COLORS.fg,
      margin: 0, valign: "top", align: "left",
    });
    s.addText(it.d, {
      x: listX + px(90), y: y + px(40),
      w: listW - px(90), h: px(60),
      fontFace: FONTS.sans, fontSize: 14,
      color: COLORS.fgDim,
      margin: 0, valign: "top", align: "left",
    });
    // bottom rule
    s.addShape(pres.shapes.LINE, {
      x: listX, y: listTop + (i + 1) * rowH, w: listW, h: 0,
      line: { color: COLORS.ruleSoft, width: 0.75 },
    });
  });

  addChromeBottom(s, 7);
}

// ---------------------------------------------------------------
// SLIDE 08 — RISK (big quote)
// ---------------------------------------------------------------
function slide08() {
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addSubtleGrid(s);

  addChromeTop(s, "08 / RISK");

  addEyebrow(s, "The first principle", PAD, px(200), px(1200));

  // Big 2-line serif quote with italic accent phrase
  s.addText([
    { text: "You cannot control whether a trade wins.", options: { color: COLORS.fg, breakLine: true } },
    { text: "You can only control ", options: { color: COLORS.fg } },
    { text: "how much you lose", options: { color: COLORS.accent, italic: true } },
    { text: " when it doesn't.", options: { color: COLORS.fg } },
  ], {
    x: PAD, y: px(260),
    w: px(1700), h: px(500),
    fontFace: FONTS.serif, fontSize: 40,
    charSpacing: -1,
    margin: 0, valign: "top", align: "left",
    paraSpaceAfter: 0,
  });

  // Body below
  s.addText(
    "Before entry, every trader should know the exact dollar amount at risk and the exact price that proves them wrong. Without that, it isn't a trade — it's a hope.",
    {
      x: PAD, y: px(800),
      w: px(1500), h: px(160),
      fontFace: FONTS.sans, fontSize: 18,
      color: COLORS.fgDim,
      margin: 0, valign: "top", align: "left",
    }
  );

  addChromeBottom(s, 8);
}

// ---------------------------------------------------------------
// SLIDE 09 — POSITION SIZING (big number + stat grid)
// ---------------------------------------------------------------
function slide09() {
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };

  addChromeTop(s, "09 / SIZING");

  // LEFT: eyebrow + title + body (narrower column so right side has room for big 1% + 3 stats)
  addEyebrow(s, "The rule most beginners skip", PAD, px(200), px(900));

  addH2(
    s,
    [
      { text: "Risk no more than", breakLine: true },
      { text: "one percent", italic: true, accent: true },
      { text: " per trade." },
    ],
    PAD, px(260), px(760), px(280), 40
  );

  s.addText(
    "On a $10,000 account, that is $100 of risk per position — not $100 invested. The position size is derived from the stop-loss distance, not picked by feel.",
    {
      x: PAD, y: px(600),
      w: px(760), h: px(260),
      fontFace: FONTS.sans, fontSize: 17,
      color: COLORS.fgDim,
      margin: 0, valign: "top", align: "left",
    }
  );

  // RIGHT: giant 1% number + 3 stats below
  const rightX = PAD + px(840);
  const rightW = SLIDE_W - PAD - rightX;

  // "1%" huge — give it plenty of width and height to avoid cropping
  s.addText("1%", {
    x: rightX, y: px(200),
    w: rightW, h: px(340),
    fontFace: FONTS.serif, fontSize: 140,
    color: COLORS.accent,
    charSpacing: -4,
    margin: 0, valign: "top", align: "left",
    bold: false,
  });

  // horizontal rule
  s.addShape(pres.shapes.LINE, {
    x: rightX, y: px(560),
    w: rightW, h: 0,
    line: { color: COLORS.rule, width: 1 },
  });

  // 3 stat columns
  const stats = [
    { k: "ACCOUNT",          v: "$10,000", gold: false },
    { k: "MAX RISK / TRADE", v: "$100",    gold: true  },
    { k: "LOSSES TO RUIN",   v: "100",     gold: false },
  ];
  const statY = px(600);
  const statGap = px(24);
  const statW = (rightW - 2 * statGap) / 3;
  stats.forEach((st, i) => {
    const x = rightX + i * (statW + statGap);
    s.addText(st.k, {
      x: x, y: statY,
      w: statW, h: px(40),
      fontFace: FONTS.mono, fontSize: 9,
      color: COLORS.fgMuted,
      charSpacing: 3,
      margin: 0, valign: "top", align: "left",
    });
    s.addText(st.v, {
      x: x, y: statY + px(44),
      w: statW, h: px(100),
      fontFace: FONTS.serif, fontSize: 32,
      color: st.gold ? COLORS.accent : COLORS.fg,
      margin: 0, valign: "top", align: "left",
    });
  });

  addChromeBottom(s, 9);
}

// ---------------------------------------------------------------
// SLIDE 10 — PSYCHOLOGY (3 cards)
// ---------------------------------------------------------------
function slide10() {
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };

  addChromeTop(s, "10 / MIND");

  addH2(
    s,
    [
      { text: "Psychology & " },
      { text: "discipline", italic: true, accent: true },
      { text: "." },
    ],
    PAD, px(150), px(1700), px(120), 60
  );

  s.addText(
    "Strategy is the easy part. The hard part is behaving consistently when real money is moving in real time.",
    {
      x: PAD, y: px(290),
      w: px(1600), h: px(80),
      fontFace: FONTS.sans, fontSize: 18,
      color: COLORS.fgDim,
      margin: 0, valign: "top", align: "left",
    }
  );

  const cards = [
    { k: "TENDENCY 01", h: "FOMO entries",    p: "Chasing a move after it has already run. The best setups are often the ones already missed — skip them." },
    { k: "TENDENCY 02", h: "Revenge trading", p: "Forcing the next trade to recover a loss. Each one compounds the emotional hole rather than closing it." },
    { k: "TENDENCY 03", h: "Overtrading",     p: "Mistaking activity for progress. Three A-plus setups will out-earn thirty mediocre ones, every time." },
  ];
  const gap = px(40);
  const usableW = SLIDE_W - 2 * PAD;
  const cardW = (usableW - 2 * gap) / 3;
  const cardH = px(430);
  const cardY = px(430);

  cards.forEach((c, i) => {
    const x = PAD + i * (cardW + gap);
    addCard(s, x, cardY, cardW, cardH);
    const ix = x + px(36);
    const iw = cardW - px(72);

    s.addText(c.k, {
      x: ix, y: cardY + px(32),
      w: iw, h: px(36),
      fontFace: FONTS.mono, fontSize: 11,
      color: COLORS.fgMuted,
      charSpacing: 3,
      margin: 0, valign: "top", align: "left",
    });
    s.addText(c.h, {
      x: ix, y: cardY + px(86),
      w: iw, h: px(140),
      fontFace: FONTS.serif, fontSize: 28,
      color: COLORS.fg,
      margin: 0, valign: "top", align: "left",
    });
    s.addText(c.p, {
      x: ix, y: cardY + px(240),
      w: iw, h: cardH - px(270),
      fontFace: FONTS.sans, fontSize: 15,
      color: COLORS.fgDim,
      margin: 0, valign: "top", align: "left",
    });
  });

  addChromeBottom(s, 10);
}

// ---------------------------------------------------------------
// SLIDE 11 — THE HARD NUMBERS (3 big stat cards)
// ---------------------------------------------------------------
function slide11() {
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };

  addChromeTop(s, "11 / REALITY");

  addEyebrow(s, "The hard numbers", PAD, px(200), px(1200));

  addH2(s, [{ text: "Most people lose money." }], PAD, px(250), px(1700), px(120), 60);

  const cards = [
    { stat: "~80%", h: "of retail day traders lose money",    p: "Across multiple regulator and academic studies, the majority of active retail day traders finish the year in the red, net of fees." },
    { stat: "<1%",  h: "meaningfully outperform",             p: "Only a small minority earn returns above a passive market benchmark after accounting for time, taxes, and commissions." },
    { stat: "$25k", h: "U.S. pattern-day-trader minimum",      p: "FINRA rules require a $25,000 account balance to day trade stocks frequently in a U.S. margin account." },
  ];
  const gap = px(40);
  const usableW = SLIDE_W - 2 * PAD;
  const cardW = (usableW - 2 * gap) / 3;
  const cardH = px(540);
  const cardY = px(430);

  cards.forEach((c, i) => {
    const x = PAD + i * (cardW + gap);
    addCard(s, x, cardY, cardW, cardH);
    const ix = x + px(36);
    const iw = cardW - px(72);

    // giant stat (serif, gold) — sized to fit the card width on a single line
    s.addText(c.stat, {
      x: ix, y: cardY + px(30),
      w: iw, h: px(150),
      fontFace: FONTS.serif, fontSize: 72,
      color: COLORS.accent,
      charSpacing: -3,
      margin: 0, valign: "top", align: "left",
    });
    // sub-headline (serif, fg)
    s.addText(c.h, {
      x: ix, y: cardY + px(200),
      w: iw, h: px(120),
      fontFace: FONTS.serif, fontSize: 22,
      color: COLORS.fg,
      margin: 0, valign: "top", align: "left",
    });
    // paragraph
    s.addText(c.p, {
      x: ix, y: cardY + px(340),
      w: iw, h: cardH - px(360),
      fontFace: FONTS.sans, fontSize: 15,
      color: COLORS.fgDim,
      margin: 0, valign: "top", align: "left",
    });
  });

  addChromeBottom(s, 11);
}

// ---------------------------------------------------------------
// SLIDE 12 — BEFORE YOU BEGIN (5-item numbered list)
// ---------------------------------------------------------------
function slide12() {
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };

  addChromeTop(s, "12 / CHECKLIST");

  addH2(s, [{ text: "Before you begin." }], PAD, px(150), px(1700), px(120), 60);

  s.addText(
    "A short checklist worth completing honestly — in order — before any real capital is put at risk.",
    {
      x: PAD, y: px(290),
      w: px(1600), h: px(60),
      fontFace: FONTS.sans, fontSize: 18,
      color: COLORS.fgDim,
      margin: 0, valign: "top", align: "left",
    }
  );

  const items = [
    { n: "01", t: "Paper trade first",                d: "Run your plan on simulated capital until results are consistent over dozens of sessions." },
    { n: "02", t: "Use money you can afford to lose", d: "Never rent money, emergency funds, or borrowed capital. The pressure alone will distort your decisions." },
    { n: "03", t: "Write a rulebook",                 d: "Entries, exits, max daily loss, max trades per day. If it isn't written, it will drift under stress." },
    { n: "04", t: "Understand the tax treatment",     d: "Short-term gains are taxed as ordinary income in most jurisdictions. Factor it into expectations." },
    { n: "05", t: "Expect a long apprenticeship",     d: "Most profitable traders describe the first year as education, not earnings." },
  ];

  const listX = PAD;
  const listW = SLIDE_W - 2 * PAD;
  const listTop = px(400);
  const rowH = px(100);

  // Top rule
  s.addShape(pres.shapes.LINE, {
    x: listX, y: listTop, w: listW, h: 0,
    line: { color: COLORS.ruleSoft, width: 0.75 },
  });

  items.forEach((it, i) => {
    const y = listTop + i * rowH + px(22);
    // index
    s.addText(it.n, {
      x: listX, y: y,
      w: px(70), h: px(40),
      fontFace: FONTS.mono, fontSize: 12,
      color: COLORS.accent,
      charSpacing: 2,
      margin: 0, valign: "top", align: "left",
    });
    // title (serif) — wider column + slightly smaller font so it stays on one line
    s.addText(it.t, {
      x: listX + px(90), y: y - px(4),
      w: px(850), h: px(50),
      fontFace: FONTS.serif, fontSize: 22,
      color: COLORS.fg,
      margin: 0, valign: "top", align: "left",
    });
    // description
    s.addText(it.d, {
      x: listX + px(960), y: y,
      w: listW - px(960), h: px(80),
      fontFace: FONTS.sans, fontSize: 14,
      color: COLORS.fgDim,
      margin: 0, valign: "top", align: "left",
    });
    // bottom rule
    s.addShape(pres.shapes.LINE, {
      x: listX, y: listTop + (i + 1) * rowH, w: listW, h: 0,
      line: { color: COLORS.ruleSoft, width: 0.75 },
    });
  });

  addChromeBottom(s, 12);
}

// ---------------------------------------------------------------
// SLIDE 13 — CLOSE ("Small edges, repeated patiently…")
// ---------------------------------------------------------------
function slide13() {
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addSubtleGrid(s);

  addChromeTop(s, "13 / END");

  // In summary eyebrow, then the big summary line
  addEyebrow(s, "In summary", PAD, px(340), px(1200));

  s.addText([
    { text: "Small edges, ",             options: { color: COLORS.fg } },
    { text: "repeated patiently,",       options: { color: COLORS.accent, italic: true, breakLine: true } },
    { text: "with strict control of loss.", options: { color: COLORS.fg } },
  ], {
    x: PAD, y: px(400),
    w: px(1700), h: px(300),
    fontFace: FONTS.serif, fontSize: 52,
    charSpacing: -1,
    margin: 0, valign: "top", align: "left",
    paraSpaceAfter: 0,
  });

  s.addText(
    "That, and nothing more glamorous, is the craft. Everything on the preceding slides exists only to serve that one sentence.",
    {
      x: PAD, y: px(720),
      w: px(1500), h: px(200),
      fontFace: FONTS.sans, fontSize: 18,
      color: COLORS.fgDim,
      margin: 0, valign: "top", align: "left",
    }
  );

  // Bottom: THANK YOU · END · QUESTIONS?
  const y = SLIDE_H - px(90) - px(16);
  s.addText("THANK YOU", {
    x: PAD, y: y,
    w: px(400), h: px(32),
    fontFace: FONTS.mono, fontSize: 11,
    color: COLORS.fgMuted,
    charSpacing: 2,
    margin: 0, valign: "middle", align: "left",
  });
  s.addText("· END ·", {
    x: (SLIDE_W - px(200)) / 2, y: y,
    w: px(200), h: px(32),
    fontFace: FONTS.mono, fontSize: 11,
    color: COLORS.fgMuted,
    charSpacing: 2,
    margin: 0, valign: "middle", align: "center",
  });
  s.addText("QUESTIONS?", {
    x: SLIDE_W - PAD - px(400), y: y,
    w: px(400), h: px(32),
    fontFace: FONTS.mono, fontSize: 11,
    color: COLORS.fgMuted,
    charSpacing: 2,
    margin: 0, valign: "middle", align: "right",
  });
}

// ---- Build all slides ----
slide01();
slide02();
slide03();
slide04();
slide05();
slide06();
slide07();
slide08();
slide09();
slide10();
slide11();
slide12();
slide13();

// ---- Write output ----
const outPath = process.argv[2] || "Day_Trading.pptx";
pres.writeFile({ fileName: outPath }).then((fn) => {
  console.log("Wrote:", fn);
});
