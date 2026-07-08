// Token Asset Custody — pptxgenjs replica
// Run: node build_deck.js   (requires: npm install pptxgenjs)

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 inches
pres.title = "Digital Asset Custody & Prime Brokerage";
pres.author = "Global Markets · Digital Assets";

// ============== DESIGN TOKENS ==============
const W = 13.333;
const H = 7.5;

const C = {
  bg:        "F0ECE0", // page cream
  cardLight: "F7F3E8", // lighter cream card
  cardWarm:  "F2E5D0", // warm hot tier
  cardBeige: "E8E1CF", // warm tier
  ink:       "1A1A1A", // primary text / dark panel
  dark:      "0B0B0B", // near-black for panels
  body:      "2B2B2B",
  muted:     "8A8578", // muted brown/gray
  mutedSoft: "B5AFA0",
  rule:      "C8C0AE", // hairline
  accent:    "B8432A", // earthy orange-red
  accentBright: "C85332",
  onDark:    "EFE8D6",
  onDarkMuted: "9A9488",
};

const FONT = {
  serif: "Georgia",
  sans:  "Aptos",
  mono:  "Consolas",
};

// ------- helpers -------
function header(slide, num, leftLabel, rightLabel) {
  slide.addText(`${num}  ${leftLabel}`, {
    x: 0.55, y: 0.45, w: 6, h: 0.35,
    fontFace: FONT.sans, fontSize: 10, color: C.muted,
    charSpacing: 4, bold: false, margin: 0, valign: "middle",
  });
  slide.addText(rightLabel, {
    x: W - 6.55, y: 0.45, w: 6, h: 0.35,
    fontFace: FONT.sans, fontSize: 11, color: C.muted,
    align: "right", margin: 0, valign: "middle",
  });
  slide.addShape(pres.shapes.LINE, {
    x: 0.55, y: 0.9, w: W - 1.1, h: 0,
    line: { color: C.rule, width: 0.5 },
  });
}

function hairline(slide, x, y, w, color) {
  slide.addShape(pres.shapes.LINE, {
    x: x, y: y, w: w, h: 0,
    line: { color: color || C.rule, width: 0.5 },
  });
}

// ==========================================================
// SLIDE 1 — TITLE
// ==========================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  // top eyebrow
  s.addText("GLOBAL MARKETS · DIGITAL ASSETS", {
    x: 0.7, y: 0.55, w: 7, h: 0.35,
    fontFace: FONT.sans, fontSize: 11, color: C.muted,
    charSpacing: 6, margin: 0, valign: "middle",
  });
  s.addText("INSTITUTIONAL BRIEFING · 2026", {
    x: W - 7.7, y: 0.55, w: 7, h: 0.35,
    fontFace: FONT.sans, fontSize: 11, color: C.muted,
    charSpacing: 6, align: "right", margin: 0, valign: "middle",
  });

  // big headline (serif, mixed weight: italic amber for "Prime Brokerage")
  s.addText(
    [
      { text: "Digital Asset", options: { color: C.ink, breakLine: true } },
      { text: "Custody & ",   options: { color: C.ink } },
      { text: "Prime",        options: { color: C.accent, italic: true, breakLine: true } },
      { text: "Brokerage",    options: { color: C.accent, italic: true } },
    ],
    {
      x: 0.7, y: 1.1, w: W - 1.4, h: 4.5,
      fontFace: FONT.serif, fontSize: 64,
      valign: "top", margin: 0,
      paraSpaceAfter: 0, paraSpaceBefore: 0,
    }
  );

  // sub
  s.addText(
    "Mapping the institutional servicing opportunity — client demand, custody architecture, financing, and the commercial case for a hybrid build.",
    {
      x: 0.7, y: 5.75, w: 9.5, h: 0.9,
      fontFace: FONT.sans, fontSize: 14, color: C.body,
      valign: "top", margin: 0,
    }
  );

  // divider
  hairline(s, 0.7, 6.75, W - 1.4);

  // footer
  s.addText("Prepared for Institutional Clients", {
    x: 0.7, y: 6.9, w: 6, h: 0.35,
    fontFace: FONT.sans, fontSize: 11, color: C.body, margin: 0, valign: "middle",
  });
  s.addText("Confidential — Discussion Draft", {
    x: W - 6.7, y: 6.9, w: 6, h: 0.35,
    fontFace: FONT.sans, fontSize: 11, color: C.body,
    align: "right", margin: 0, valign: "middle",
  });
}

// ==========================================================
// SLIDE 2 — CONTEXT
// ==========================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "01", "CONTEXT", "The Institutional Opening");

  // Left side: big serif headline with italic amber emphasis
  s.addText(
    [
      { text: "Digital assets have crossed from ", options: { color: C.ink } },
      { text: "alternative", options: { color: C.accent, italic: true } },
      { text: " to ", options: { color: C.ink } },
      { text: "allocatable", options: { color: C.accent, italic: true } },
      { text: ".", options: { color: C.ink } },
    ],
    {
      x: 0.7, y: 1.9, w: 6.0, h: 3.2,
      fontFace: FONT.serif, fontSize: 36,
      valign: "top", margin: 0,
    }
  );

  s.addText(
    [
      { text: "Spot ETF approvals, clearer capital treatment, and maturing market structure have moved the question from ", options: { color: C.body } },
      { text: "whether", options: { color: C.body, italic: true } },
      { text: " to hold crypto to ", options: { color: C.body } },
      { text: "how", options: { color: C.body, italic: true } },
      { text: " to service it.", options: { color: C.body } },
    ],
    {
      x: 0.7, y: 5.35, w: 5.8, h: 1.6,
      fontFace: FONT.sans, fontSize: 14, valign: "top", margin: 0,
    }
  );

  // Right side: 3 shifts with hairlines
  const rx = 7.3;
  const rw = W - rx - 0.7;
  const shifts = [
    ["SHIFT 01", "Regulated ETF wrappers absorb retail flow; institutions need direct exposure and yield."],
    ["SHIFT 02", "Custody, financing and clearing have fragmented across crypto-native venues."],
    ["SHIFT 03", "Allocators want a single trusted counterparty — the role banks have always played."],
  ];
  let y = 1.6;
  const blockH = 1.55;
  shifts.forEach(([label, desc], i) => {
    hairline(s, rx, y, rw);
    s.addText(label, {
      x: rx, y: y + 0.15, w: rw, h: 0.3,
      fontFace: FONT.sans, fontSize: 11, color: C.accent,
      charSpacing: 4, bold: true, margin: 0, valign: "middle",
    });
    s.addText(desc, {
      x: rx, y: y + 0.55, w: rw, h: 0.9,
      fontFace: FONT.sans, fontSize: 14, color: C.ink, margin: 0, valign: "top",
    });
    y += blockH;
  });
  hairline(s, rx, y, rw);
}

// ==========================================================
// SLIDE 3 — DEMAND (four columns)
// ==========================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "02", "DEMAND", "Client Demand Signals");

  s.addText("Four convergent signals from the allocator base.", {
    x: 0.7, y: 1.3, w: W - 1.4, h: 0.9,
    fontFace: FONT.serif, fontSize: 34, color: C.ink, margin: 0,
  });

  const items = [
    ["01", "RFPs for qualified custody", "Mandates now routinely specify bank-grade custody as a pre-condition to allocation."],
    ["02", "Financing against digital assets", "Hedge funds seek USD leverage against BTC/ETH treasuries without full liquidation."],
    ["03", "Cross-venue execution", "Demand for one prime relationship spanning CEX, OTC and on-chain liquidity."],
    ["04", "Staking & yield generation", "Allocators expect institutional-grade staking, lending and basis-yield programs."],
  ];

  const colW = (W - 1.4) / 4;
  const startX = 0.7;
  const topY = 2.9;

  items.forEach(([num, title, desc], i) => {
    const cx = startX + colW * i;
    const contentW = colW - 0.4;
    // top hairline (short)
    hairline(s, cx, topY, contentW * 0.75, C.ink);
    // big number
    s.addText(num, {
      x: cx, y: topY + 0.1, w: contentW, h: 1.1,
      fontFace: FONT.serif, fontSize: 60, color: C.accent, margin: 0, valign: "top",
    });
    // title
    s.addText(title, {
      x: cx, y: topY + 1.35, w: contentW, h: 0.7,
      fontFace: FONT.sans, fontSize: 16, color: C.ink, margin: 0, valign: "top",
    });
    // desc
    s.addText(desc, {
      x: cx, y: topY + 2.1, w: contentW, h: 1.4,
      fontFace: FONT.sans, fontSize: 12, color: C.body, margin: 0, valign: "top",
    });
  });
}

// ==========================================================
// SLIDE 4 — Allocator segments table
// ==========================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "03", "DEMAND", "Allocator Segments & Use Cases");

  s.addText("Five client archetypes drive the servicing opportunity.", {
    x: 0.7, y: 1.2, w: W - 1.4, h: 0.8,
    fontFace: FONT.serif, fontSize: 32, color: C.ink, margin: 0,
  });

  // Column headers
  const hdrY = 2.3;
  const cols = [
    { x: 0.7,  w: 2.7, label: "SEGMENT" },
    { x: 3.55, w: 3.6, label: "PRIMARY USE CASE" },
    { x: 7.3,  w: 2.9, label: "SERVICING NEED" },
    { x: 10.3, w: 2.3, label: "REVENUE DENSITY" },
  ];
  cols.forEach((c) => {
    s.addText(c.label, {
      x: c.x, y: hdrY, w: c.w, h: 0.3,
      fontFace: FONT.sans, fontSize: 10, color: C.muted, charSpacing: 4, margin: 0, valign: "middle",
    });
    hairline(s, c.x, hdrY + 0.4, c.w, C.ink);
  });

  // Rows
  const rows = [
    ["Hedge funds",            "Directional, basis, and market-neutral strategies across spot and derivatives", "Financing, margin, execution",    4],
    ["Asset managers",         "ETF sub-advisory, actively managed crypto strategies, tokenised funds",         "Qualified custody, NAV, fund services", 3],
    ["Corporate treasuries",   "BTC on balance sheet; stablecoin operating accounts",                           "Cold custody, reporting, audit",  2],
    ["Wealth & family offices","Long-only exposure, staking yield, structured products",                        "Segregated custody, reporting, advice", 3],
    ["Banks & broker-dealers", "Sub-custody, white-label client offerings, hedging books",                      "Wholesale custody, liquidity, clearing", 5],
  ];

  const rowStart = 2.9;
  const rowH = 0.85;
  rows.forEach((r, i) => {
    const y = rowStart + i * rowH;
    // segment
    s.addText(r[0], {
      x: cols[0].x, y: y + 0.05, w: cols[0].w, h: rowH - 0.1,
      fontFace: FONT.sans, fontSize: 15, color: C.ink, margin: 0, valign: "top",
    });
    // use case
    s.addText(r[1], {
      x: cols[1].x, y: y + 0.05, w: cols[1].w, h: rowH - 0.1,
      fontFace: FONT.sans, fontSize: 11, color: C.body, margin: 0, valign: "top",
    });
    // servicing need
    s.addText(r[2], {
      x: cols[2].x, y: y + 0.05, w: cols[2].w, h: rowH - 0.1,
      fontFace: FONT.sans, fontSize: 11, color: C.body, margin: 0, valign: "top",
    });
    // revenue density squares (5)
    const sqW = 0.22, sqGap = 0.08;
    for (let j = 0; j < 5; j++) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: cols[3].x + j * (sqW + sqGap), y: y + 0.2, w: sqW, h: sqW,
        fill: { color: j < r[3] ? C.accent : C.rule },
        line: { color: j < r[3] ? C.accent : C.rule, width: 0.5 },
      });
    }
    // row separator (under the row, except last maybe; draw under all)
    hairline(s, 0.7, y + rowH, W - 1.4, C.rule);
  });
}

// ==========================================================
// SLIDE 5 — Market size / revenue pools (horizontal bars)
// ==========================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "04", "MARKET", "Market Size & Revenue Pools");

  // Left: headline + footer para
  s.addText("Servicing revenues compound across the custody and prime stack.", {
    x: 0.7, y: 1.4, w: 5.6, h: 2.2,
    fontFace: FONT.serif, fontSize: 32, color: C.ink, margin: 0, valign: "top",
  });

  s.addText(
    "Directional ranges only. A universal bank captures fee income at every layer where the client already consumes — custody basis points are the foothold; financing and execution are the margin.",
    {
      x: 0.7, y: 5.3, w: 5.6, h: 1.6,
      fontFace: FONT.sans, fontSize: 12, color: C.body, margin: 0, valign: "top",
    }
  );

  // Right: bar chart layers
  const bx = 6.7;
  const bw = W - bx - 0.7;
  const rows = [
    { label: "Custody & safekeeping", note: "~ low bps",         frac: 0.18, color: C.ink },
    { label: "Staking & yield",       note: "~ mid bps",         frac: 0.32, color: C.ink },
    { label: "Execution & clearing",  note: "~ bps / notional",  frac: 0.52, color: C.accent },
    { label: "Financing & margin",    note: "~ spread on balance",frac: 0.72, color: C.accent },
    { label: "Structured & derivatives",note:"~ structuring fee",frac: 0.92, color: C.accent },
  ];
  let ry = 1.45;
  const rowSpacing = 0.92;
  rows.forEach((r) => {
    // label
    s.addText(r.label, {
      x: bx, y: ry, w: bw - 2.2, h: 0.35,
      fontFace: FONT.sans, fontSize: 14, color: C.ink, margin: 0, valign: "middle",
    });
    // note (right)
    s.addText(r.note, {
      x: bx + bw - 2.2, y: ry, w: 2.2, h: 0.35,
      fontFace: FONT.mono, fontSize: 12, color: C.body,
      align: "right", margin: 0, valign: "middle",
    });
    // track (empty bar bg)
    s.addShape(pres.shapes.RECTANGLE, {
      x: bx, y: ry + 0.5, w: bw, h: 0.18,
      fill: { color: C.rule }, line: { color: C.rule, width: 0 },
    });
    // fill
    s.addShape(pres.shapes.RECTANGLE, {
      x: bx, y: ry + 0.5, w: bw * r.frac, h: 0.18,
      fill: { color: r.color }, line: { color: r.color, width: 0 },
    });
    ry += rowSpacing;
  });

  s.addText("Indicative only — relative scale of wallet share by layer.", {
    x: bx, y: ry + 0.1, w: bw, h: 0.4,
    fontFace: FONT.sans, fontSize: 11, color: C.muted, margin: 0, valign: "top",
  });
}

// ==========================================================
// SLIDE 6 — Custody models (4 cards, model C dark)
// ==========================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "05", "CUSTODY", "Custody Models — A Landscape");

  s.addText("Four structural models, differentiated by who holds the keys — and who holds the risk.", {
    x: 0.7, y: 1.3, w: W - 1.4, h: 1.2,
    fontFace: FONT.serif, fontSize: 30, color: C.ink, margin: 0,
  });

  const cards = [
    ["MODEL A", "Self-custody",         "Client controls keys directly. Maximum sovereignty, maximum operational burden.",  "Target: treasuries, protocol DAOs", false],
    ["MODEL B", "Exchange-integrated",  "Assets held at the trading venue. Fast to trade, weakest segregation and recourse.", "Target: high-frequency trading",   false],
    ["MODEL C", "Qualified custodian",  "Regulated third party holds assets in segregated accounts with bank-grade controls.","Target: asset managers, wealth",   true],
    ["MODEL D", "MPC / multi-party",    "Keys split cryptographically across parties — enables programmable policy and co-signing.","Target: prime, institutional ops", false],
  ];

  const cardY = 3.1;
  const cardH = 3.7;
  const gap = 0.18;
  const totalW = W - 1.4;
  const cardW = (totalW - gap * 3) / 4;

  cards.forEach((c, i) => {
    const cx = 0.7 + (cardW + gap) * i;
    const isDark = c[4];
    const bg = isDark ? C.dark : C.cardLight;
    const lineColor = isDark ? C.dark : C.rule;
    const titleColor = isDark ? "FFFFFF" : C.ink;
    const bodyColor = isDark ? C.onDark : C.body;
    const mutedColor = isDark ? C.onDarkMuted : C.muted;

    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardY, w: cardW, h: cardH,
      fill: { color: bg }, line: { color: lineColor, width: 0.75 },
    });
    // label
    s.addText(c[0], {
      x: cx + 0.3, y: cardY + 0.3, w: cardW - 0.6, h: 0.3,
      fontFace: FONT.sans, fontSize: 11, color: C.accent, charSpacing: 4, bold: true,
      margin: 0, valign: "middle",
    });
    // title
    s.addText(c[1], {
      x: cx + 0.3, y: cardY + 0.7, w: cardW - 0.6, h: 0.55,
      fontFace: FONT.sans, fontSize: 18, color: titleColor, margin: 0, valign: "top",
    });
    // desc
    s.addText(c[2], {
      x: cx + 0.3, y: cardY + 1.35, w: cardW - 0.6, h: 1.4,
      fontFace: FONT.sans, fontSize: 12, color: bodyColor, margin: 0, valign: "top",
    });
    // bottom hairline
    s.addShape(pres.shapes.LINE, {
      x: cx + 0.3, y: cardY + cardH - 0.85, w: cardW - 0.6, h: 0,
      line: { color: isDark ? C.onDarkMuted : C.rule, width: 0.5 },
    });
    // target line
    s.addText(c[3], {
      x: cx + 0.3, y: cardY + cardH - 0.75, w: cardW - 0.6, h: 0.6,
      fontFace: FONT.sans, fontSize: 11, color: mutedColor, margin: 0, valign: "top",
    });
  });
}

// ==========================================================
// SLIDE 7 — Incumbent custodian set (3 columns)
// ==========================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "06", "CUSTODY", "The Incumbent Custodian Set");

  s.addText("Three archetypes define today's qualified custody market.", {
    x: 0.7, y: 1.2, w: W - 1.4, h: 0.8,
    fontFace: FONT.serif, fontSize: 30, color: C.ink, margin: 0,
  });

  const items = [
    ["CRYPTO-NATIVE QUALIFIED", "Coinbase Prime",  "Deepest venue connectivity and liquidity; integrated trading, custody and financing under one umbrella. Widely adopted for ETF sub-custody mandates.", "Liquidity & execution depth"],
    ["PURE-PLAY CUSTODY",       "BitGo",           "Specialist institutional custodian with broad asset coverage, multi-sig and MPC wallet infrastructure, and white-label deployments for banks.",     "Asset breadth & white-label"],
    ["TRADFI EXTENSION",        "Fidelity Digital","TradFi pedigree extended into digital; conservative asset coverage, deep pension and RIA channel, bundled with existing relationships.",          "Institutional trust & channel"],
  ];

  const colW = (W - 1.4 - 0.6) / 3;
  const startX = 0.7;
  const topY = 2.3;

  items.forEach(([eyebrow, name, desc, edge], i) => {
    const cx = startX + (colW + 0.3) * i;
    const cw = colW;
    s.addText(eyebrow, {
      x: cx, y: topY, w: cw, h: 0.3,
      fontFace: FONT.sans, fontSize: 11, color: C.muted, charSpacing: 4, margin: 0, valign: "middle",
    });
    s.addText(name, {
      x: cx, y: topY + 0.4, w: cw, h: 0.9,
      fontFace: FONT.serif, fontSize: 32, color: C.ink, margin: 0, valign: "top",
    });
    s.addText(desc, {
      x: cx, y: topY + 1.45, w: cw, h: 1.8,
      fontFace: FONT.sans, fontSize: 13, color: C.body, margin: 0, valign: "top",
    });
    // edge section at bottom
    hairline(s, cx, 5.3, cw);
    s.addText("EDGE", {
      x: cx, y: 5.4, w: cw, h: 0.3,
      fontFace: FONT.sans, fontSize: 10, color: C.muted, charSpacing: 4, margin: 0, valign: "middle",
    });
    s.addText(edge, {
      x: cx, y: 5.7, w: cw, h: 0.4,
      fontFace: FONT.sans, fontSize: 13, color: C.ink, margin: 0, valign: "middle",
    });
  });

  // Full-width hairline + footer
  hairline(s, 0.7, 6.25, W - 1.4);
  s.addText(
    "No single provider dominates — creating room for a universal-bank entrant that consolidates the stack behind a single relationship.",
    {
      x: 0.7, y: 6.4, w: W - 1.4, h: 0.5,
      fontFace: FONT.sans, fontSize: 13, color: C.body, margin: 0, valign: "top",
    }
  );
}

// ==========================================================
// SLIDE 8 — Architecture: Hot/Warm/Cold
// ==========================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "07", "ARCHITECTURE", "Custody Architecture — Hot, Warm, Cold");

  s.addText("A tiered vault balances liquidity against key-compromise risk.", {
    x: 0.7, y: 1.2, w: W - 1.4, h: 1.0,
    fontFace: FONT.serif, fontSize: 30, color: C.ink, margin: 0,
  });

  const tiers = [
    { label: "HOT TIER", pct: "~1–3%", title: "Settlement wallets", desc: "Online, API-addressable. Sized to intraday flow; automated policy caps exposure.", win: "t+0  settlement window", purpose: "Client withdrawals, venue margin", bg: C.cardWarm, txt: C.ink, body: C.body, mono: C.body, accent: C.accent, topLine: C.accent },
    { label: "WARM TIER", pct: "~10–20%", title: "MPC co-signed", desc: "Distributed key shares; quorum approval gate. Supports staking, active rehypothecation.", win: "t+0 – t+1  release window", purpose: "Yield operations, collateral mobility", bg: C.cardBeige, txt: C.ink, body: C.body, mono: C.body, accent: C.muted, topLine: C.muted },
    { label: "COLD TIER", pct: "~80–90%", title: "Air-gapped vault", desc: "HSM-bound keys in geographically distributed sites. Hardware-enforced signing ceremonies.", win: "t+1 – t+2  release window", purpose: "Long-term custody, treasury reserve", bg: C.dark, txt: "FFFFFF", body: C.onDark, mono: C.onDarkMuted, accent: C.accent, topLine: C.dark },
  ];

  const cardY = 3.3;
  const cardH = 3.0;
  const gap = 0.12;
  const totalW = W - 1.4;
  const cardW = (totalW - gap * 2) / 3;

  tiers.forEach((t, i) => {
    const cx = 0.7 + (cardW + gap) * i;
    // top accent stripe
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardY, w: cardW, h: 0.06,
      fill: { color: t.topLine }, line: { color: t.topLine, width: 0 },
    });
    // card body
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardY + 0.06, w: cardW, h: cardH - 0.06,
      fill: { color: t.bg }, line: { color: t.bg, width: 0 },
    });
    // label + pct
    s.addText(t.label, {
      x: cx + 0.25, y: cardY + 0.25, w: cardW - 2.0, h: 0.3,
      fontFace: FONT.sans, fontSize: 11, color: t.accent, charSpacing: 4, bold: true,
      margin: 0, valign: "middle",
    });
    s.addText(t.pct, {
      x: cx + cardW - 1.8, y: cardY + 0.25, w: 1.55, h: 0.3,
      fontFace: FONT.mono, fontSize: 11, color: t.accent,
      align: "right", margin: 0, valign: "middle",
    });
    // title
    s.addText(t.title, {
      x: cx + 0.25, y: cardY + 0.6, w: cardW - 0.5, h: 0.55,
      fontFace: FONT.sans, fontSize: 22, color: t.txt, margin: 0, valign: "top",
    });
    // desc
    s.addText(t.desc, {
      x: cx + 0.25, y: cardY + 1.2, w: cardW - 0.5, h: 1.1,
      fontFace: FONT.sans, fontSize: 12, color: t.body, margin: 0, valign: "top",
    });
    // separator
    s.addShape(pres.shapes.LINE, {
      x: cx + 0.25, y: cardY + cardH - 0.75, w: cardW - 0.5, h: 0,
      line: { color: i === 2 ? C.onDarkMuted : C.rule, width: 0.5 },
    });
    // window (mono)
    s.addText(t.win, {
      x: cx + 0.25, y: cardY + cardH - 0.6, w: cardW - 0.5, h: 0.4,
      fontFace: FONT.mono, fontSize: 12, color: t.body, margin: 0, valign: "middle",
    });
    // purpose line (below card)
    s.addText(
      [
        { text: "Purpose ", options: { color: C.muted } },
        { text: t.purpose, options: { color: C.ink } },
      ],
      {
        x: cx + 0.05, y: cardY + cardH + 0.2, w: cardW, h: 0.4,
        fontFace: FONT.sans, fontSize: 13, margin: 0, valign: "top",
      }
    );
  });
}

// ==========================================================
// SLIDE 9 — Hybrid model (split left/right)
// ==========================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "08", "OUR MODEL", "The Hybrid Model We Recommend");

  // Left column
  s.addText("RECOMMENDATION", {
    x: 0.7, y: 1.3, w: 5.8, h: 0.3,
    fontFace: FONT.sans, fontSize: 11, color: C.accent, charSpacing: 4, bold: true,
    margin: 0, valign: "middle",
  });
  s.addText(
    [
      { text: "Sub-custody for assets.\nPrime for the ", options: { color: C.ink } },
      { text: "client relationship", options: { color: C.ink, italic: true } },
      { text: " .", options: { color: C.ink } },
    ],
    {
      x: 0.7, y: 1.7, w: 5.8, h: 2.7,
      fontFace: FONT.serif, fontSize: 36, margin: 0, valign: "top",
    }
  );
  s.addText(
    "Speed to market without taking on raw key-management risk. We license a qualified custodian for asset safekeeping and wrap it with the financing, clearing and client service our franchise is built for.",
    {
      x: 0.7, y: 5.3, w: 5.8, h: 1.8,
      fontFace: FONT.sans, fontSize: 13, color: C.body, margin: 0, valign: "top",
    }
  );

  // Right column: stacked bars
  const rx = 6.9;
  const rw = W - rx - 0.7;
  const items = [
    { eyebrow: "CLIENT-FACING", title: "Universal Bank — Prime Services",      status: "Owned", dark: true },
    { eyebrow: "LAYER",         title: "Financing, margin, collateral",        status: "Owned", dark: false },
    { eyebrow: "LAYER",         title: "Execution & venue connectivity",       status: "Owned", dark: false },
    { eyebrow: "LAYER",         title: "Reporting, NAV, fund services",        status: "Owned", dark: false },
    { eyebrow: "BASE",          title: "Qualified sub-custodian (keys, vault)",status: "Licensed", dark: false, dashed: true },
  ];
  const rowH = 0.95;
  let yy = 1.3;
  items.forEach((it) => {
    const bg = it.dark ? C.dark : C.cardLight;
    const txt = it.dark ? "FFFFFF" : C.ink;
    const eyebrowCol = it.dark ? C.onDarkMuted : C.accent;
    const statusCol = it.dark ? C.onDarkMuted : C.muted;
    // card
    s.addShape(pres.shapes.RECTANGLE, {
      x: rx, y: yy, w: rw, h: rowH - 0.12,
      fill: { color: bg },
      line: { color: it.dashed ? C.mutedSoft : bg, width: 0.75, dashType: it.dashed ? "dash" : "solid" },
    });
    // eyebrow
    s.addText(it.eyebrow, {
      x: rx + 0.25, y: yy + 0.1, w: rw - 1.6, h: 0.3,
      fontFace: FONT.sans, fontSize: 10, color: eyebrowCol, charSpacing: 4, bold: true,
      margin: 0, valign: "middle",
    });
    // title
    s.addText(it.title, {
      x: rx + 0.25, y: yy + 0.4, w: rw - 1.6, h: 0.4,
      fontFace: FONT.sans, fontSize: 16, color: txt, margin: 0, valign: "middle",
    });
    // status (right)
    s.addText(it.status, {
      x: rx + rw - 1.6, y: yy + 0.1, w: 1.4, h: rowH - 0.3,
      fontFace: FONT.mono, fontSize: 11, color: statusCol,
      align: "right", margin: 0, valign: "middle",
    });
    yy += rowH;
  });
}

// ==========================================================
// SLIDE 10 — Prime services timeline (6 steps)
// ==========================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "09", "PRIME", "Prime Services Across the Stack");

  s.addText("The full institutional workflow — from allocation to settlement.", {
    x: 0.7, y: 1.2, w: W - 1.4, h: 1.1,
    fontFace: FONT.serif, fontSize: 30, color: C.ink, margin: 0,
  });

  const steps = [
    ["01", "Onboarding & KYC",     "Entity onboarding, wallet whitelisting, travel-rule compliance."],
    ["02", "Custody & safekeeping","Segregated accounts, tiered vaults, policy engine."],
    ["03", "Execution",            "Smart order routing across CEX, OTC, RFQ and on-chain."],
    ["04", "Financing",            "USD loans, coin lending, synthetic prime via tri-party."],
    ["05", "Clearing & margin",    "Cross-product margin netting; collateral management."],
    ["06", "Reporting & servicing","Unified statements, tax lots, proof of reserves."],
  ];

  // Timeline bar
  const lineY = 3.4;
  const leftX = 0.95;
  const rightX = W - 0.7;
  s.addShape(pres.shapes.LINE, {
    x: leftX, y: lineY, w: rightX - leftX, h: 0,
    line: { color: C.ink, width: 1.2 },
  });
  const colW = (rightX - leftX) / 6;

  steps.forEach(([num, title, desc], i) => {
    const cx = leftX + colW * i;
    // dot
    s.addShape(pres.shapes.OVAL, {
      x: cx - 0.1, y: lineY - 0.1, w: 0.2, h: 0.2,
      fill: { color: C.accent }, line: { color: C.accent, width: 0 },
    });
    // number
    s.addText(num, {
      x: cx - 0.1, y: lineY + 0.2, w: colW - 0.2, h: 0.3,
      fontFace: FONT.mono, fontSize: 10, color: C.muted,
      charSpacing: 2, margin: 0, valign: "top",
    });
    // title
    s.addText(title, {
      x: cx - 0.1, y: lineY + 0.55, w: colW - 0.2, h: 0.8,
      fontFace: FONT.sans, fontSize: 15, color: C.ink, margin: 0, valign: "top",
    });
    // desc
    s.addText(desc, {
      x: cx - 0.1, y: lineY + 1.35, w: colW - 0.2, h: 1.4,
      fontFace: FONT.sans, fontSize: 11, color: C.body, margin: 0, valign: "top",
    });
  });

  // Callout at bottom
  const calloutY = 5.9;
  const calloutH = 0.9;
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: calloutY, w: W - 1.4, h: calloutH,
    fill: { color: C.cardLight }, line: { color: C.rule, width: 0.5 },
  });
  s.addText("The single integration point", {
    x: 0.95, y: calloutY, w: 4.0, h: calloutH,
    fontFace: FONT.sans, fontSize: 16, color: C.ink, margin: 0, valign: "middle",
  });
  s.addText(
    "Each layer above is billable. Each layer reinforces the next — and each layer is a reason the client consolidates with one counterparty.",
    {
      x: 5.0, y: calloutY, w: W - 5.0 - 0.95, h: calloutH,
      fontFace: FONT.sans, fontSize: 12, color: C.body,
      align: "right", margin: 0, valign: "middle",
    }
  );
}

// ==========================================================
// SLIDE 11 — Financing / Collateral mobility
// ==========================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "10", "PRIME", "Financing, Margin & Collateral Mobility");

  // Left: headline
  s.addText("Financing is where the custody foothold becomes a balance-sheet franchise.", {
    x: 0.7, y: 1.3, w: 5.8, h: 3.0,
    fontFace: FONT.serif, fontSize: 32, color: C.ink, margin: 0,
  });

  // Left: A/B/C list
  const items = [
    ["A", "USD loans vs. crypto collateral",  "Over-collateralised, daily marked, tiered haircut by asset liquidity."],
    ["B", "Coin lending & basis",              "BTC/ETH lent to market-makers and basis desks; spread captured at book level."],
    ["C", "Cross-margining",                   "Net exposure across spot, futures, perpetuals and options via a single margin book."],
  ];
  let ly = 4.7;
  const lSpacing = 0.95;
  items.forEach(([letter, title, desc]) => {
    s.addText(letter, {
      x: 0.7, y: ly, w: 0.7, h: 0.9,
      fontFace: FONT.serif, fontSize: 42, color: C.accent, margin: 0, valign: "top",
    });
    s.addText(title, {
      x: 1.4, y: ly, w: 5.1, h: 0.35,
      fontFace: FONT.sans, fontSize: 14, color: C.ink, margin: 0, valign: "top",
    });
    s.addText(desc, {
      x: 1.4, y: ly + 0.35, w: 5.1, h: 0.55,
      fontFace: FONT.sans, fontSize: 11, color: C.body, margin: 0, valign: "top",
    });
    ly += lSpacing;
  });

  // Right: collateral mobility panel
  const px = 6.95;
  const pw = W - px - 0.7;
  const py = 1.3;
  const ph = 5.7;
  s.addShape(pres.shapes.RECTANGLE, {
    x: px, y: py, w: pw, h: ph,
    fill: { color: C.cardLight }, line: { color: C.rule, width: 0.5 },
  });
  s.addText("COLLATERAL MOBILITY", {
    x: px + 0.3, y: py + 0.25, w: pw - 0.6, h: 0.3,
    fontFace: FONT.sans, fontSize: 11, color: C.muted, charSpacing: 4, bold: true,
    margin: 0, valign: "middle",
  });
  s.addText("One pool of collateral, many venues of use.", {
    x: px + 0.3, y: py + 0.6, w: pw - 0.6, h: 0.4,
    fontFace: FONT.sans, fontSize: 14, color: C.ink, margin: 0, valign: "middle",
  });

  // First row: client posts (light bar, amber left border)
  const row1Y = py + 1.55;
  const rowW = pw - 0.6;
  const rowH = 0.5;
  s.addShape(pres.shapes.RECTANGLE, {
    x: px + 0.3, y: row1Y, w: rowW, h: rowH,
    fill: { color: C.cardBeige }, line: { color: C.cardBeige, width: 0 },
  });
  // amber left edge
  s.addShape(pres.shapes.RECTANGLE, {
    x: px + 0.3, y: row1Y, w: 0.06, h: rowH,
    fill: { color: C.accent }, line: { color: C.accent, width: 0 },
  });
  s.addText(
    [
      { text: "Client posts ", options: { color: C.ink } },
      { text: "BTC, ETH, stablecoin", options: { color: C.ink, bold: true } },
    ],
    { x: px + 0.5, y: row1Y, w: rowW - 2.2, h: rowH,
      fontFace: FONT.sans, fontSize: 13, margin: 0, valign: "middle" }
  );
  s.addText("→ tri-party", {
    x: px + 0.3 + rowW - 2.2, y: row1Y, w: 2.0, h: rowH,
    fontFace: FONT.mono, fontSize: 12, color: C.body,
    align: "right", margin: 0, valign: "middle",
  });

  // arrow down
  s.addText("↓", {
    x: px + 0.3, y: row1Y + rowH + 0.05, w: rowW, h: 0.35,
    fontFace: FONT.mono, fontSize: 16, color: C.muted,
    align: "center", margin: 0, valign: "middle",
  });

  // Second row: dark
  const row2Y = row1Y + rowH + 0.45;
  s.addShape(pres.shapes.RECTANGLE, {
    x: px + 0.3, y: row2Y, w: rowW, h: rowH,
    fill: { color: C.dark }, line: { color: C.dark, width: 0 },
  });
  s.addText(
    [
      { text: "Pledged to ", options: { color: "FFFFFF" } },
      { text: "bank margin book", options: { color: "FFFFFF", bold: true } },
    ],
    { x: px + 0.5, y: row2Y, w: rowW - 2.2, h: rowH,
      fontFace: FONT.sans, fontSize: 13, margin: 0, valign: "middle" }
  );
  s.addText("segregated", {
    x: px + 0.3 + rowW - 2.2, y: row2Y, w: 2.0, h: rowH,
    fontFace: FONT.mono, fontSize: 12, color: C.accent,
    align: "right", margin: 0, valign: "middle",
  });

  // arrow down
  s.addText("↓", {
    x: px + 0.3, y: row2Y + rowH + 0.05, w: rowW, h: 0.35,
    fontFace: FONT.mono, fontSize: 16, color: C.muted,
    align: "center", margin: 0, valign: "middle",
  });

  // Third row: three boxes
  const row3Y = row2Y + rowH + 0.45;
  const bxLabels = ["CEX margin", "Derivatives", "Staking"];
  const bxGap = 0.15;
  const bxW = (rowW - bxGap * 2) / 3;
  bxLabels.forEach((lbl, i) => {
    const bxX = px + 0.3 + (bxW + bxGap) * i;
    s.addShape(pres.shapes.RECTANGLE, {
      x: bxX, y: row3Y, w: bxW, h: rowH,
      fill: { color: C.cardBeige }, line: { color: C.cardBeige, width: 0 },
    });
    s.addText(lbl, {
      x: bxX, y: row3Y, w: bxW, h: rowH,
      fontFace: FONT.sans, fontSize: 13, color: C.ink,
      align: "center", margin: 0, valign: "middle",
    });
  });
}

// ==========================================================
// SLIDE 12 — Risks (2x2 grid)
// ==========================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "11", "RISK", "Operational & Regulatory Risk");

  s.addText("The risks are knowable. They are also non-trivial.", {
    x: 0.7, y: 1.3, w: W - 1.4, h: 0.8,
    fontFace: FONT.serif, fontSize: 32, color: C.ink, margin: 0,
  });

  const items = [
    ["OPERATIONAL", "01", "Key management & signing ceremonies",   "HSM-bound keys, quorum ceremonies, geographic distribution; tested against insider and coercion threat models."],
    ["OPERATIONAL", "02", "Settlement finality & reorg risk",      "Confirmation thresholds calibrated per chain; same-day settlement scheduled only for low-volatility paths."],
    ["REGULATORY",  "03", "Capital & accounting treatment",        "Post-SAB 121 repeal, balance-sheet recognition is workable; Basel prudential treatment remains the live question."],
    ["REGULATORY",  "04", "Jurisdictional fragmentation",          "MiCA, UK FSMA perimeter, SEC / OCC guidance, APAC licenses — a patchwork to navigate for a global product."],
  ];

  const gridX = 0.7;
  const gridTop = 2.5;
  const gridW = W - 1.4;
  const cellW = (gridW - 0.6) / 2;
  const cellH = 2.1;
  const rowGap = 0.5;

  items.forEach((it, i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const cx = gridX + (cellW + 0.6) * col;
    const cy = gridTop + (cellH + rowGap) * row;

    // eyebrow
    s.addText(it[0], {
      x: cx, y: cy, w: cellW - 1.0, h: 0.3,
      fontFace: FONT.sans, fontSize: 11, color: C.accent, charSpacing: 4, bold: true,
      margin: 0, valign: "middle",
    });
    // number right
    s.addText(it[1], {
      x: cx + cellW - 1.0, y: cy, w: 1.0, h: 0.3,
      fontFace: FONT.mono, fontSize: 11, color: C.muted,
      align: "right", margin: 0, valign: "middle",
    });
    // hairline
    hairline(s, cx, cy + 0.4, cellW, C.ink);
    // title
    s.addText(it[2], {
      x: cx, y: cy + 0.55, w: cellW, h: 0.5,
      fontFace: FONT.sans, fontSize: 17, color: C.ink, margin: 0, valign: "top",
    });
    // desc
    s.addText(it[3], {
      x: cx, y: cy + 1.1, w: cellW, h: 0.95,
      fontFace: FONT.sans, fontSize: 12, color: C.body, margin: 0, valign: "top",
    });
  });
}

// ==========================================================
// SLIDE 13 — Build / Partner / Buy
// ==========================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "12", "DECISION", "Build — Partner — Buy");

  s.addText("A partner-led entry sequences risk against time-to-revenue.", {
    x: 0.7, y: 1.2, w: W - 1.4, h: 0.8,
    fontFace: FONT.serif, fontSize: 30, color: C.ink, margin: 0,
  });

  const paths = [
    { label: "PATH 01", title: "Build",   desc: "In-house custody, licensing, vault infrastructure.",             time: "24–36 months", capex: "High",      control: "Full",   risk: "Concentrated", dark: false, recommended: false },
    { label: "PATH 02", title: "Partner", desc: "Sub-custody with qualified provider; bank delivers prime layer.", time: "6–12 months",  capex: "Moderate",  control: "Shared", risk: "Mitigated",    dark: true,  recommended: true },
    { label: "PATH 03", title: "Buy",     desc: "Acquire a crypto-native custodian or trust charter.",            time: "12–24 months", capex: "Very high", control: "Full",   risk: "Integration",  dark: false, recommended: false },
  ];

  const cardY = 2.6;
  const cardH = 4.4;
  const gap = 0.3;
  const totalW = W - 1.4;
  const cardW = (totalW - gap * 2) / 3;

  paths.forEach((p, i) => {
    const cx = 0.7 + (cardW + gap) * i;
    const bg = p.dark ? C.dark : C.cardLight;
    const txt = p.dark ? "FFFFFF" : C.ink;
    const body = p.dark ? C.onDark : C.body;
    const eyebrowC = p.dark ? C.onDarkMuted : C.muted;
    const metricLabelC = p.dark ? C.onDarkMuted : C.accent;
    const metricValueC = p.dark ? "FFFFFF" : C.ink;
    const sepC = p.dark ? C.onDarkMuted : C.rule;

    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardY, w: cardW, h: cardH,
      fill: { color: bg }, line: { color: p.dark ? C.dark : C.rule, width: 0.75 },
    });

    // Recommended pill (on path 2)
    if (p.recommended) {
      const pillW = 1.7, pillH = 0.42;
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx + cardW - pillW - 0.3, y: cardY - pillH / 2, w: pillW, h: pillH,
        fill: { color: C.accent }, line: { color: C.accent, width: 0 },
      });
      s.addText("RECOMMENDED", {
        x: cx + cardW - pillW - 0.3, y: cardY - pillH / 2, w: pillW, h: pillH,
        fontFace: FONT.sans, fontSize: 10, color: "FFFFFF", bold: true, charSpacing: 3,
        align: "center", margin: 0, valign: "middle",
      });
    }

    // eyebrow
    s.addText(p.label, {
      x: cx + 0.35, y: cardY + 0.35, w: cardW - 0.7, h: 0.3,
      fontFace: FONT.sans, fontSize: 11, color: eyebrowC, charSpacing: 4, bold: true,
      margin: 0, valign: "middle",
    });
    // title
    s.addText(p.title, {
      x: cx + 0.35, y: cardY + 0.7, w: cardW - 0.7, h: 0.6,
      fontFace: FONT.sans, fontSize: 26, color: txt, margin: 0, valign: "top",
    });
    // desc
    s.addText(p.desc, {
      x: cx + 0.35, y: cardY + 1.4, w: cardW - 0.7, h: 1.0,
      fontFace: FONT.sans, fontSize: 13, color: body, margin: 0, valign: "top",
    });
    // separator
    s.addShape(pres.shapes.LINE, {
      x: cx + 0.35, y: cardY + 3.05, w: cardW - 0.7, h: 0,
      line: { color: sepC, width: 0.5 },
    });
    // metrics 2x2
    const mx = cx + 0.35;
    const myTop = cardY + 3.2;
    const colGap = (cardW - 0.7) / 2;
    const rowGap2 = 0.55;

    const metrics = [
      ["TIME", p.time, 0, 0],
      ["CAPEX", p.capex, 1, 0],
      ["CONTROL", p.control, 0, 1],
      ["RISK", p.risk, 1, 1],
    ];
    metrics.forEach(([lbl, val, col, row]) => {
      const mmx = mx + colGap * col;
      const mmy = myTop + rowGap2 * row;
      s.addText(lbl, {
        x: mmx, y: mmy, w: colGap - 0.1, h: 0.25,
        fontFace: FONT.sans, fontSize: 10, color: metricLabelC, charSpacing: 3, bold: true,
        margin: 0, valign: "top",
      });
      s.addText(val, {
        x: mmx, y: mmy + 0.25, w: colGap - 0.1, h: 0.3,
        fontFace: FONT.sans, fontSize: 13, color: metricValueC, margin: 0, valign: "top",
      });
    });
  });
}

// ==========================================================
// SLIDE 14 — 18-month roadmap
// ==========================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "13", "PLAN", "18-Month Roadmap");

  s.addText("Three phases, sequenced against client demand.", {
    x: 0.7, y: 1.2, w: W - 1.4, h: 0.9,
    fontFace: FONT.serif, fontSize: 30, color: C.ink, margin: 0,
  });

  const phases = [
    { eyebrow: "Phase 01 · Months 0–6",   title: "Foundation",        items: [
        "Select sub-custodian (Coinbase, BitGo, Fidelity)",
        "Build onboarding, wallet whitelisting",
        "Stand up segregated client accounts",
        "Launch with top-5 anchor clients",
      ], bg: C.cardBeige, dark: false },
    { eyebrow: "Phase 02 · Months 6–12",  title: "Prime build-out",   items: [
        "USD financing against collateral",
        "Smart order routing, OTC desk",
        "Cross-margining for derivatives",
        "Staking & yield programs",
      ], bg: C.cardLight, dark: false },
    { eyebrow: "Phase 03 · Months 12–18", title: "Scale & expand",    items: [
        "Tokenised fund servicing",
        "Structured products & derivatives",
        "Multi-region custody charters",
        "Evaluate in-house key infrastructure",
      ], bg: C.dark, dark: true },
  ];

  const cardY = 2.75;
  const cardH = 4.35;
  const gap = 0.0; // meet flush
  const totalW = W - 1.4;
  const cardW = totalW / 3;

  phases.forEach((p, i) => {
    const cx = 0.7 + cardW * i;
    const txt = p.dark ? "FFFFFF" : C.ink;
    const body = p.dark ? C.onDark : C.body;
    const eyebrowC = p.dark ? C.onDarkMuted : C.accent;

    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardY, w: cardW, h: cardH,
      fill: { color: p.bg }, line: { color: p.bg, width: 0 },
    });
    s.addText(p.eyebrow, {
      x: cx + 0.4, y: cardY + 0.35, w: cardW - 0.8, h: 0.3,
      fontFace: FONT.mono, fontSize: 12, color: eyebrowC, margin: 0, valign: "middle",
    });
    s.addText(p.title, {
      x: cx + 0.4, y: cardY + 0.75, w: cardW - 0.8, h: 0.6,
      fontFace: FONT.sans, fontSize: 22, color: txt, margin: 0, valign: "top",
    });

    // bullets — render as text with unicode "·" prefix (more control over color)
    const bulletColor = p.dark ? C.onDark : C.body;
    const bulletRuns = [];
    p.items.forEach((it, idx) => {
      bulletRuns.push({
        text: "·  " + it,
        options: {
          color: bulletColor,
          breakLine: idx !== p.items.length - 1,
          paraSpaceAfter: 6,
        },
      });
    });
    s.addText(bulletRuns, {
      x: cx + 0.4, y: cardY + 1.55, w: cardW - 0.8, h: 2.5,
      fontFace: FONT.sans, fontSize: 13, margin: 0, valign: "top",
    });
  });
}

// ==========================================================
// SLIDE 15 — Close / next steps
// ==========================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "14", "CLOSE", "The Commercial Case — Next Steps");

  // Left: big serif headline with italic amber emphasis
  s.addText(
    [
      { text: "The custody franchise is a ", options: { color: C.ink } },
      { text: "relationship product", options: { color: C.accent, italic: true } },
      { text: " , and the relationship is the opening.", options: { color: C.ink } },
    ],
    {
      x: 0.7, y: 1.3, w: 6.2, h: 4.2,
      fontFace: FONT.serif, fontSize: 40, margin: 0, valign: "top",
    }
  );
  s.addText(
    "Every incremental service — financing, execution, derivatives — attaches to the custody account. The economics compound. The longer we wait, the more of that wallet is already priced by crypto-native challengers.",
    {
      x: 0.7, y: 5.65, w: 6.2, h: 1.5,
      fontFace: FONT.sans, fontSize: 13, color: C.body, margin: 0, valign: "top",
    }
  );

  // Right: NEXT STEPS list
  const rx = 7.3;
  const rw = W - rx - 0.7;
  s.addText("NEXT STEPS", {
    x: rx, y: 1.4, w: rw, h: 0.3,
    fontFace: FONT.sans, fontSize: 12, color: C.accent, charSpacing: 4, bold: true,
    margin: 0, valign: "middle",
  });
  hairline(s, rx, 1.8, rw);

  const steps = [
    ["01", "Sub-custodian selection",  "Shortlist & RFP within 60 days."],
    ["02", "Anchor-client MoUs",       "Secure five launch commitments pre-build."],
    ["03", "Balance-sheet framework",  "Risk & treasury sign-off on financing product."],
  ];
  let ny = 2.0;
  const stepH = 1.15;
  steps.forEach(([n, t, d]) => {
    s.addText(n, {
      x: rx, y: ny, w: 0.85, h: 0.7,
      fontFace: FONT.serif, fontSize: 30, color: C.accent, margin: 0, valign: "top",
    });
    s.addText(t, {
      x: rx + 0.9, y: ny + 0.1, w: rw - 0.9, h: 0.4,
      fontFace: FONT.sans, fontSize: 15, color: C.ink, margin: 0, valign: "top",
    });
    s.addText(d, {
      x: rx + 0.9, y: ny + 0.5, w: rw - 0.9, h: 0.5,
      fontFace: FONT.sans, fontSize: 12, color: C.body, margin: 0, valign: "top",
    });
    ny += stepH;
    hairline(s, rx, ny - 0.05, rw);
  });
}

// ============== WRITE FILE ==============
pres.writeFile({ fileName: "Token_Asset_Custody.pptx" }).then((name) => {
  console.log(`Wrote ${name}`);
});
