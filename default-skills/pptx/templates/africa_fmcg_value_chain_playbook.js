/**
 * Trade in Africa — An Operator's Playbook
 * Replica built with pptxgenjs
 *
 * Run:   node trade_in_africa.js
 * Output: Trade_in_Africa.pptx
 */

const PptxGenJS = require("pptxgenjs");

const pptx = new PptxGenJS();

// Slide size: 18288000 x 10287000 EMU => 20" x 11.25"
pptx.defineLayout({ name: "CUSTOM", width: 20, height: 11.25 });
pptx.layout = "CUSTOM";

// ---------------------------------------------------------------------------
// Palette (hex strings, no #)
// ---------------------------------------------------------------------------
const C = {
  cream:     "F5EFE6",  // primary light bg
  creamDeep: "EBE2D2",  // secondary cream bg
  band:      "DED2BD",  // muted band / body on dark
  ink:       "1A1613",  // near-black
  inkSoft:   "3A332D",  // muted text
  terracotta:"C8583A",  // primary accent
  rust:      "9C3F29",  // deeper rust (italic text on cream)
  peach:     "D98A5F",  // on-dark accent
  gold:      "D9A441",
  olive:     "3D4B32",
  olive2:    "5A6B4A",
};

const FONT = "Arial";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function addTop(slide, pageNum, eyebrowText, eyebrowColor, lineColor, numColor) {
  // Top divider line
  slide.addShape("rect", {
    x: 0.75, y: 1.04, w: 18.50, h: 0.01,
    fill: { color: lineColor }, line: { color: lineColor, width: 0 }
  });
  // Page number (top right)
  slide.addText(pageNum, {
    x: 18.00, y: 0.62, w: 1.40, h: 0.28,
    fontFace: FONT, fontSize: 15, color: numColor, align: "right",
    margin: 0
  });
  // Eyebrow (top left)
  if (eyebrowText) {
    slide.addText(eyebrowText, {
      x: 0.75, y: 0.62, w: 8.00, h: 0.34,
      fontFace: FONT, fontSize: 16.5, color: eyebrowColor, align: "left",
      charSpacing: 4, margin: 0
    });
  }
}

function addFooter(slide, text, color) {
  slide.addText(text, {
    x: 0.75, y: 10.47, w: 8.00, h: 0.26,
    fontFace: FONT, fontSize: 13.5, color: color, align: "left",
    charSpacing: 3, margin: 0
  });
}

// Text helper — tight, left-aligned, no margin
function addTxt(slide, text, opts) {
  const base = {
    fontFace: FONT,
    margin: 0,
    align: "left",
    valign: "top",
  };
  slide.addText(text, Object.assign(base, opts));
}

// ---------------------------------------------------------------------------
// SLIDE 1 — Cover
// ---------------------------------------------------------------------------
{
  const s = pptx.addSlide();
  s.background = { color: C.cream };

  // Big terracotta circle (top-right, clipped off-slide)
  s.addShape("ellipse", {
    x: 14.38, y: -1.88, w: 7.50, h: 7.50,
    fill: { color: C.terracotta }, line: { type: "none" }
  });
  // Thin-outline circle overlapping
  s.addShape("ellipse", {
    x: 12.26, y: 1.25, w: 5.45, h: 5.45,
    fill: { type: "none" }, line: { color: C.ink, width: 1.25 }
  });
  // Gold circle
  s.addShape("ellipse", {
    x: 8.12, y: 7.50, w: 1.88, h: 1.88,
    fill: { color: C.gold }, line: { type: "none" }
  });
  // Small olive dot
  s.addShape("ellipse", {
    x: 10.21, y: 9.33, w: 0.67, h: 0.67,
    fill: { color: C.olive }, line: { type: "none" }
  });

  // Masthead line & eyebrows
  addTop(s, "", "", C.ink, C.ink, C.ink);
  addTxt(s, "VOL. 01 · ISSUE 04", {
    x: 0.75, y: 0.62, w: 4.00, h: 0.28,
    fontSize: 15, color: C.ink, charSpacing: 4
  });
  addTxt(s, "SUB-SAHARAN AFRICA / 2026", {
    x: 14.27, y: 0.62, w: 5.10, h: 0.28,
    fontSize: 15, color: C.ink, charSpacing: 4, align: "right"
  });

  // Kicker
  addTxt(s, "AN OPERATOR'S PLAYBOOK", {
    x: 0.75, y: 2.92, w: 10.00, h: 0.34,
    fontSize: 16.5, color: C.rust, charSpacing: 4
  });

  // Big title — "Trade in" (normal) + "Africa." (italic rust)
  s.addText([
    { text: "Trade in ",  options: { color: C.ink,  italic: false, fontFace: FONT, fontSize: 165 } },
    { text: "Africa.",    options: { color: C.rust, italic: true,  fontFace: FONT, fontSize: 165, breakLine: false } },
  ], {
    x: 0.75, y: 3.25, w: 12.00, h: 4.80,
    valign: "top", align: "left", margin: 0, paraSpaceBefore: 0, paraSpaceAfter: 0
  });

  // SUBJECT block
  addTxt(s, "SUBJECT", {
    x: 0.75, y: 8.83, w: 6.65, h: 0.23,
    fontSize: 12, color: C.inkSoft, charSpacing: 4
  });
  addTxt(s, "The FMCG value chain and the allied services shaping how consumer goods move across the continent.", {
    x: 0.75, y: 9.17, w: 6.65, h: 1.29,
    fontSize: 24, color: C.ink
  });

  // FOR block (right)
  addTxt(s, "FOR", {
    x: 16.90, y: 9.67, w: 2.35, h: 0.23,
    fontSize: 12, color: C.inkSoft, charSpacing: 4, align: "right"
  });
  addTxt(s, "Board briefing", {
    x: 16.90, y: 10.01, w: 2.35, h: 0.45,
    fontSize: 24, color: C.ink, align: "right"
  });
}

// ---------------------------------------------------------------------------
// Generic helpers for content slides on cream
// ---------------------------------------------------------------------------
function topRule(s) {
  // Top divider
  s.addShape("rect", { x: 0.75, y: 1.04, w: 18.50, h: 0.01,
    fill: { color: C.ink }, line: { type: "none" } });
}
function topRuleLight(s) {
  s.addShape("rect", { x: 0.75, y: 1.04, w: 18.50, h: 0.01,
    fill: { color: C.cream }, line: { type: "none" } });
}

function eyebrowAndNum(s, eyebrow, num, onDark) {
  if (onDark) {
    addTxt(s, eyebrow, {
      x: 0.75, y: 0.62, w: 10.00, h: 0.34,
      fontSize: 16.5, color: C.peach, charSpacing: 4
    });
    addTxt(s, num, {
      x: 18.00, y: 0.62, w: 1.40, h: 0.28,
      fontSize: 15, color: C.cream, align: "right"
    });
  } else {
    addTxt(s, eyebrow, {
      x: 0.75, y: 0.62, w: 10.00, h: 0.34,
      fontSize: 16.5, color: C.rust, charSpacing: 4
    });
    addTxt(s, num, {
      x: 18.00, y: 0.62, w: 1.40, h: 0.28,
      fontSize: 15, color: C.inkSoft, align: "right"
    });
  }
}

// ---------------------------------------------------------------------------
// SLIDE 2 — The Opportunity
// ---------------------------------------------------------------------------
{
  const s = pptx.addSlide();
  s.background = { color: C.cream };
  topRule(s);
  eyebrowAndNum(s, "THE OPPORTUNITY", "02 / 14", false);

  // Gold circle in lower-right background
  s.addShape("ellipse", {
    x: 18.00, y: 8.12, w: 1.25, h: 1.25,
    fill: { color: C.gold }, line: { type: "none" }
  });

  // Big headline
  s.addText([
    { text: "A billion consumers, ", options: { color: C.ink,  italic: false, fontFace: FONT, fontSize: 96 } },
    { text: "one aisle at a time.",  options: { color: C.rust, italic: true,  fontFace: FONT, fontSize: 96 } }
  ], { x: 0.75, y: 1.88, w: 12.00, h: 5.40, valign: "top", align: "left", margin: 0 });

  // Subtext
  addTxt(s, "Sub-Saharan FMCG is not a single market — it is hundreds of dense, informal, rapidly urbanising retail economies stitched together by a thin layer of modern trade.", {
    x: 0.75, y: 7.53, w: 11.50, h: 2.00,
    fontSize: 24, color: C.inkSoft
  });

  // Right column stat 1 — POPULATION
  addTxt(s, "POPULATION", {
    x: 13.42, y: 1.88, w: 6.01, h: 0.26,
    fontSize: 13.5, color: C.rust, charSpacing: 4
  });
  s.addText([
    { text: "1.2", options: { color: C.ink,        fontFace: FONT, fontSize: 105 } },
    { text: "B",   options: { color: C.terracotta, fontFace: FONT, fontSize: 105 } }
  ], { x: 13.42, y: 2.15, w: 6.01, h: 2.00, valign: "top", margin: 0 });
  addTxt(s, "projected 2.1B by 2050", {
    x: 13.42, y: 3.86, w: 6.01, h: 0.45,
    fontSize: 19.5, color: C.inkSoft
  });

  // Divider
  s.addShape("rect", { x: 13.42, y: 4.80, w: 5.83, h: 0.01,
    fill: { color: C.ink }, line: { type: "none" } });

  // Stat 2 — RETAIL OUTLETS
  addTxt(s, "RETAIL OUTLETS", {
    x: 13.42, y: 5.35, w: 6.01, h: 0.26,
    fontSize: 13.5, color: C.rust, charSpacing: 4
  });
  s.addText([
    { text: "~90", options: { color: C.ink,        fontFace: FONT, fontSize: 105 } },
    { text: "%",   options: { color: C.terracotta, fontFace: FONT, fontSize: 105 } }
  ], { x: 13.42, y: 5.62, w: 6.01, h: 2.00, valign: "top", margin: 0 });
  addTxt(s, "of grocery trade sits in informal shops, kiosks & open markets", {
    x: 13.42, y: 7.34, w: 6.01, h: 0.85,
    fontSize: 19.5, color: C.inkSoft
  });

  addFooter(s, "TRADE IN AFRICA · THE PRIZE", C.inkSoft);
}

// ---------------------------------------------------------------------------
// SLIDE 3 — The Problem (creamDeep bg)
// ---------------------------------------------------------------------------
{
  const s = pptx.addSlide();
  s.background = { color: C.creamDeep };
  topRule(s);
  eyebrowAndNum(s, "THE PROBLEM", "03 / 14", false);

  // Big headline
  s.addText([
    { text: "Global FMCGs arrive with capital and brands. Most stall on the ", options: { color: C.ink,  italic: false, fontFace: FONT, fontSize: 72 } },
    { text: "last mile.", options: { color: C.rust, italic: true, fontFace: FONT, fontSize: 72 } }
  ], { x: 0.75, y: 1.88, w: 17.50, h: 3.20, valign: "top", align: "left", margin: 0 });

  // Three columns
  const cols = [
    { x: 0.75,  num: "01", head: "FRAGMENTATION",    body: "Millions of micro-retailers, each with tiny orders, cash-only payments, and no shared data infrastructure." },
    { x: 7.11,  num: "02", head: "WORKING CAPITAL", body: "Importers, distributors and retailers all need credit. Banks won't underwrite them. The chain starves between shipments." },
    { x: 13.47, num: "03", head: "VISIBILITY",       body: "Goods leave the factory and disappear. What sold, where, to whom, at what price — no one upstream knows." },
  ];
  cols.forEach(col => {
    // Big number
    addTxt(s, col.num, {
      x: col.x, y: 5.35, w: 1.30, h: 1.20,
      fontSize: 66, color: C.terracotta
    });
    // Head
    addTxt(s, col.head, {
      x: col.x + 1.17, y: 6.22, w: 4.50, h: 0.26,
      fontSize: 13.5, color: C.ink, charSpacing: 4
    });
    // Body
    addTxt(s, col.body, {
      x: col.x, y: 6.80, w: 5.95, h: 1.50,
      fontSize: 21, color: C.ink
    });
  });

  addFooter(s, "TRADE IN AFRICA · THE PROBLEM", C.inkSoft);
}

// ---------------------------------------------------------------------------
// SLIDE 4 — The Map (dark bg)
// ---------------------------------------------------------------------------
{
  const s = pptx.addSlide();
  s.background = { color: C.ink };
  topRuleLight(s);
  eyebrowAndNum(s, "THE MAP", "04 / 14", true);

  // Headline
  s.addText([
    { text: "Five stages, from ", options: { color: C.cream, italic: false, fontFace: FONT, fontSize: 66 } },
    { text: "field to shelf.",     options: { color: C.peach, italic: true,  fontFace: FONT, fontSize: 66 } }
  ], { x: 0.75, y: 1.77, w: 16.00, h: 1.50, valign: "top", margin: 0 });

  addTxt(s, "Every operator in consumer goods plays somewhere on this chain. Knowing where value leaks — and where allied services plug it — is the operating thesis.", {
    x: 0.75, y: 3.54, w: 12.00, h: 1.60,
    fontSize: 21, color: C.band
  });

  // Five stage cards
  const stages = [
    { x: 0.75,  tag: "STAGE 01", title: "Sourcing & Inputs", body: "Raw agri commodities, packaging, imported inputs.", hi: false },
    { x: 4.50,  tag: "STAGE 02", title: "Manufacturing",      body: "Local processing, co-packing, formulation for regional taste.", hi: false },
    { x: 8.25,  tag: "STAGE 03", title: "Distribution",       body: "Ports, inland logistics, cold chain, regional hubs.", hi: true },
    { x: 12.00, tag: "STAGE 04", title: "Retail & RTM",       body: "Modern trade, wholesalers, dukas, kiosks, open markets.", hi: false },
    { x: 15.75, tag: "STAGE 05", title: "Consumer",           body: "Purchase, household consumption, brand loyalty, repeat.", hi: false },
  ];

  stages.forEach(st => {
    // Card outline (or filled for highlighted)
    s.addShape("rect", {
      x: st.x, y: 5.83, w: 3.50, h: 3.60,
      fill: st.hi ? { color: C.terracotta } : { type: "none" },
      line: { color: st.hi ? C.terracotta : C.cream, width: 0.8 }
    });
    addTxt(s, st.tag, {
      x: st.x + 0.30, y: 6.17, w: 2.99, h: 0.23,
      fontSize: 12, color: st.hi ? C.cream : C.peach, charSpacing: 4
    });
    addTxt(s, st.title, {
      x: st.x + 0.30, y: 6.55, w: 2.99, h: 1.00,
      fontSize: 27, color: C.cream
    });
    addTxt(s, st.body, {
      x: st.x + 0.30, y: 7.70, w: 2.99, h: 1.50,
      fontSize: 15, color: st.hi ? C.cream : C.band
    });
  });

  // Flow rule + labels
  s.addShape("rect", { x: 0.75, y: 9.85, w: 18.50, h: 0.01,
    fill: { color: C.cream }, line: { type: "none" } });

  addTxt(s, "→ FLOW OF GOODS", {
    x: 0.75, y: 10.05, w: 3.50, h: 0.26,
    fontSize: 13.5, color: C.peach, charSpacing: 3
  });
  addTxt(s, "← FLOW OF CASH & DATA", {
    x: 15.00, y: 10.05, w: 4.25, h: 0.26,
    fontSize: 13.5, color: C.peach, charSpacing: 3, align: "right"
  });

  addFooter(s, "TRADE IN AFRICA · THE MAP", C.cream);
}

// ---------------------------------------------------------------------------
// Reusable stage slide (5, 6, 7, 8)
// ---------------------------------------------------------------------------
function stageSlide(cfg) {
  const s = pptx.addSlide();
  s.background = { color: cfg.bg };
  if (cfg.onDark) topRuleLight(s); else topRule(s);
  eyebrowAndNum(s, cfg.eyebrow, cfg.pageNum, cfg.onDark);

  // Big numeral (left) — color = numeralColor
  addTxt(s, cfg.numeral, {
    x: 0.75, y: 1.60, w: 4.50, h: 3.20,
    fontSize: 260, color: cfg.numeralColor, bold: false, valign: "top"
  });

  // Title (italic rust/peach on accent)
  s.addText(cfg.title, {
    x: 0.75, y: 5.50, w: 9.66, h: 1.60,
    fontFace: FONT, valign: "top", align: "left", margin: 0
  });

  // Intro paragraph
  addTxt(s, cfg.intro, {
    x: 0.75, y: 7.40, w: 9.00, h: 2.00,
    fontSize: 22.5, color: cfg.bodyMuted
  });

  return s;
}

function operatorList(s, items, labelColor, headColor, bodyColor, dotColor) {
  addTxt(s, "OPERATOR DECISIONS", {
    x: 11.12, y: 2.29, w: 8.37, h: 0.26,
    fontSize: 13.5, color: labelColor, charSpacing: 4
  });
  const rowY = [2.84, 4.39, 5.94];
  items.forEach((it, i) => {
    // Square dot
    s.addShape("rect", {
      x: 11.12, y: rowY[i] + 0.15, w: 0.15, h: 0.15,
      fill: { color: dotColor }, line: { type: "none" }
    });
    addTxt(s, it.head, {
      x: 11.50, y: rowY[i], w: 7.97, h: 0.45,
      fontSize: 24, color: headColor, bold: true
    });
    addTxt(s, it.body, {
      x: 11.50, y: rowY[i] + 0.55, w: 7.97, h: 0.90,
      fontSize: 16.5, color: bodyColor
    });
  });
}

// SLIDE 5 — Stage 01: Sourcing & Inputs
{
  const s = stageSlide({
    bg: C.cream, onDark: false,
    eyebrow: "STAGE 01 — SOURCING & INPUTS",
    pageNum: "05 / 14",
    numeral: "01", numeralColor: C.terracotta,
    title: [
      { text: "Where the value chain ", options: { color: C.ink,  italic: false, fontFace: FONT, fontSize: 54 } },
      { text: "starts paying.",         options: { color: C.rust, italic: true,  fontFace: FONT, fontSize: 54 } }
    ],
    intro: "Africa produces much of the world's cocoa, coffee, tea and cashew — but captures a fraction of the processed value. Local sourcing decisions set the ceiling for every stage that follows.",
    bodyMuted: C.inkSoft
  });
  operatorList(s, [
    { head: "Local vs. imported inputs", body: "Tariffs, FX exposure, and AfCFTA rules-of-origin now tilt the math toward local." },
    { head: "Smallholder aggregation",   body: "80% of agri output comes from farms under 2ha. Consistent quality requires cooperatives or aggregators." },
    { head: "Packaging as a bottleneck", body: "Glass, rigid plastics and laminates are scarce and imported; packaging capacity shapes SKU strategy." },
  ], C.rust, C.ink, C.inkSoft, C.terracotta);
  addFooter(s, "STAGE 01 · SOURCING & INPUTS", C.inkSoft);
}

// SLIDE 6 — Stage 02: Manufacturing (creamDeep bg)
{
  const s = stageSlide({
    bg: C.creamDeep, onDark: false,
    eyebrow: "STAGE 02 — MANUFACTURING",
    pageNum: "06 / 14",
    numeral: "02", numeralColor: C.terracotta,
    title: [
      { text: "Local formulation ",    options: { color: C.ink,  italic: false, fontFace: FONT, fontSize: 54 } },
      { text: "beats global SKUs.",    options: { color: C.rust, italic: true,  fontFace: FONT, fontSize: 54 } }
    ],
    intro: "Regional taste, unit economics, and pack sizes diverge sharply from global norms. Winners co-pack locally and build SKUs designed for daily-wage purchasing.",
    bodyMuted: C.inkSoft
  });
  operatorList(s, [
    { head: "Sachet economy",            body: "Single-use sachets and 50g packs dominate. Engineer for the wage, not the shelf." },
    { head: "Co-manufacturing & tolling", body: "Building plants is slow. Toll manufacturers in Kenya, Nigeria and South Africa move new entrants in quarters, not years." },
    { head: "Regulatory & quality",       body: "NAFDAC, KEBS, SABS — each country has its own standards body. Plan registration timelines into launch." },
  ], C.rust, C.ink, C.inkSoft, C.terracotta);
  addFooter(s, "STAGE 02 · MANUFACTURING", C.inkSoft);
}

// SLIDE 7 — Stage 03: Distribution (dark bg, 4 stat cards)
{
  const s = stageSlide({
    bg: C.ink, onDark: true,
    eyebrow: "STAGE 03 — DISTRIBUTION & LOGISTICS",
    pageNum: "07 / 14",
    numeral: "03", numeralColor: C.peach,
    title: [
      { text: "Logistics ",        options: { color: C.cream, italic: false, fontFace: FONT, fontSize: 54 } },
      { text: "is the product.",   options: { color: C.peach, italic: true,  fontFace: FONT, fontSize: 54 } }
    ],
    intro: "Road freight in Sub-Saharan Africa is 2–4× the global cost per tonne-km. Whoever solves the middle mile owns the category.",
    bodyMuted: C.band
  });

  addTxt(s, "THE REALITY ON THE GROUND", {
    x: 11.12, y: 2.29, w: 8.37, h: 0.26,
    fontSize: 13.5, color: C.peach, charSpacing: 4
  });

  const statCards = [
    { x: 11.12, y: 2.84, big: "2–4×", bigSmall: null, body: "Road freight cost vs. global benchmarks per tonne-km." },
    { x: 15.35, y: 2.84, big: "40",   bigSmall: "%", body: "Of perishables lost between farm and shelf due to gaps in cold chain." },
    { x: 11.12, y: 5.69, big: "16",   bigSmall: "d", body: "Average clearance time at major SSA ports — vs. 4 days globally." },
    { x: 15.35, y: 5.69, big: "54",   bigSmall: null, body: "Currencies, customs regimes, and border crossings a continental brand must navigate." },
  ];
  statCards.forEach(c => {
    s.addShape("rect", {
      x: c.x, y: c.y, w: 3.90, h: 2.81,
      fill: { type: "none" }, line: { color: C.cream, width: 0.8 }
    });
    if (c.bigSmall) {
      s.addText([
        { text: c.big,      options: { color: C.peach, fontFace: FONT, fontSize: 72 } },
        { text: c.bigSmall, options: { color: C.peach, fontFace: FONT, fontSize: 42 } }
      ], { x: c.x + 0.31, y: c.y + 0.35, w: 3.39, h: 1.20, valign: "top", margin: 0 });
    } else {
      addTxt(s, c.big, {
        x: c.x + 0.31, y: c.y + 0.35, w: 3.39, h: 1.20,
        fontSize: 72, color: C.peach
      });
    }
    addTxt(s, c.body, {
      x: c.x + 0.31, y: c.y + 1.55, w: 3.39, h: 1.10,
      fontSize: 15, color: C.band
    });
  });

  addFooter(s, "STAGE 03 · DISTRIBUTION", C.cream);
}

// SLIDE 8 — Stage 04: Retail & Route-to-Market
{
  const s = stageSlide({
    bg: C.cream, onDark: false,
    eyebrow: "STAGE 04 — RETAIL & ROUTE-TO-MARKET",
    pageNum: "08 / 14",
    numeral: "04", numeralColor: C.terracotta,
    title: [
      { text: "Informal trade is ", options: { color: C.ink,  italic: false, fontFace: FONT, fontSize: 54 } },
      { text: "the market.",         options: { color: C.rust, italic: true,  fontFace: FONT, fontSize: 54 } }
    ],
    intro: "Supermarkets capture the headlines. Dukas, spazas, boutiques and kiosks capture the wallet. Route-to-market is less a channel strategy than a field operation.",
    bodyMuted: C.inkSoft
  });

  addTxt(s, "CHANNEL MIX · SUB-SAHARAN FMCG", {
    x: 11.12, y: 2.29, w: 8.37, h: 0.26,
    fontSize: 13.5, color: C.rust, charSpacing: 4
  });

  // Channel mix bar (90/10 split)
  // Informal ~90%
  s.addShape("rect", {
    x: 11.12, y: 2.84, w: 7.13, h: 1.02,
    fill: { color: C.terracotta }, line: { type: "none" }
  });
  // Modern ~10%
  s.addShape("rect", {
    x: 18.25, y: 2.84, w: 1.00, h: 1.02,
    fill: { color: C.ink }, line: { type: "none" }
  });
  addTxt(s, "INFORMAL", {
    x: 11.30, y: 3.00, w: 2.00, h: 0.25,
    fontSize: 12, color: C.cream, charSpacing: 3
  });
  addTxt(s, "~90%", {
    x: 11.30, y: 3.25, w: 2.00, h: 0.55,
    fontSize: 25.5, color: C.cream, bold: true
  });
  addTxt(s, "MODERN", {
    x: 18.35, y: 3.05, w: 0.90, h: 0.25,
    fontSize: 10.5, color: C.cream, charSpacing: 3
  });
  addTxt(s, "~10%", {
    x: 18.35, y: 3.30, w: 0.90, h: 0.45,
    fontSize: 19.5, color: C.cream, bold: true
  });

  // Informal outlets label + list
  addTxt(s, "INFORMAL OUTLETS", {
    x: 11.12, y: 4.36, w: 4.01, h: 0.23,
    fontSize: 12, color: C.rust, charSpacing: 4
  });
  addTxt(s, "Dukas · spazas · table-top traders · open markets · kiosks", {
    x: 11.12, y: 4.67, w: 4.01, h: 1.00,
    fontSize: 19.5, color: C.ink
  });
  addTxt(s, "MODERN OUTLETS", {
    x: 15.35, y: 4.36, w: 4.01, h: 0.23,
    fontSize: 12, color: C.inkSoft, charSpacing: 4
  });
  addTxt(s, "Supermarkets · hypermarkets · convenience chains · forecourts", {
    x: 15.35, y: 4.67, w: 4.01, h: 1.00,
    fontSize: 19.5, color: C.ink
  });

  // Pull quote panel
  s.addShape("rect", {
    x: 11.12, y: 5.91, w: 8.12, h: 1.40,
    fill: { color: C.creamDeep }, line: { type: "none" }
  });
  s.addShape("rect", {
    x: 11.12, y: 5.91, w: 0.06, h: 1.40,
    fill: { color: C.terracotta }, line: { type: "none" }
  });
  addTxt(s, "\u201CYou do not sell into Lagos or Nairobi. You sell onto one million shelves, one visit at a time.\u201D", {
    x: 11.44, y: 6.10, w: 7.74, h: 1.00,
    fontSize: 18, color: C.ink, italic: true
  });

  addFooter(s, "STAGE 04 · RETAIL", C.inkSoft);
}

// SLIDE 9 — Stage 05: Consumer (terracotta bg — inverted)
{
  const s = pptx.addSlide();
  s.background = { color: C.terracotta };

  // Top rule in cream
  s.addShape("rect", { x: 0.75, y: 1.04, w: 18.50, h: 0.01,
    fill: { color: C.cream }, line: { type: "none" } });
  addTxt(s, "STAGE 05 — CONSUMER", {
    x: 0.75, y: 0.62, w: 10.00, h: 0.34,
    fontSize: 16.5, color: C.cream, charSpacing: 4
  });
  addTxt(s, "09 / 14", {
    x: 18.00, y: 0.62, w: 1.40, h: 0.28,
    fontSize: 15, color: C.cream, align: "right"
  });

  // Decorative circles (cream) bottom right
  s.addShape("ellipse", {
    x: 15.83, y: 7.08, w: 5.21, h: 5.21,
    fill: { color: C.cream, transparency: 85 }, line: { type: "none" }
  });
  s.addShape("ellipse", {
    x: 15.82, y: 7.07, w: 3.35, h: 3.35,
    fill: { type: "none" }, line: { color: C.cream, width: 0.8 }
  });

  // Big numeral
  addTxt(s, "05", {
    x: 0.75, y: 1.60, w: 4.50, h: 3.20,
    fontSize: 260, color: C.cream, valign: "top"
  });

  // Headline
  s.addText([
    { text: "The consumer is ", options: { color: C.cream, italic: false, fontFace: FONT, fontSize: 60 } },
    { text: "younger, mobile-first, and aspirational.", options: { color: C.cream, italic: true, fontFace: FONT, fontSize: 60 } }
  ], { x: 0.75, y: 5.50, w: 10.00, h: 3.30, valign: "top", margin: 0 });

  // Three Truths list (right column)
  addTxt(s, "THREE TRUTHS", {
    x: 11.12, y: 2.29, w: 8.37, h: 0.26,
    fontSize: 13.5, color: C.cream, charSpacing: 4
  });

  const truths = [
    { head: "60%",          body: "of the population is under 25. Brand loyalty is formed young and on mobile." },
    { head: "M-Pesa first", body: "Mobile money is now the default tender across East Africa. Cash is second, card is third." },
    { head: "Daily baskets", body: "Households shop every 1–2 days. Price per sachet matters more than price per kilo." }
  ];
  const truthY = [2.84, 5.40, 7.96];
  truths.forEach((t, i) => {
    addTxt(s, t.head, {
      x: 11.12, y: truthY[i], w: 8.37, h: 0.90,
      fontSize: 54, color: C.cream
    });
    addTxt(s, t.body, {
      x: 11.12, y: truthY[i] + 0.92, w: 8.37, h: 1.00,
      fontSize: 19.5, color: C.cream
    });
    // Divider
    if (i < 2) {
      s.addShape("rect", {
        x: 11.12, y: truthY[i] + 2.25, w: 8.12, h: 0.01,
        fill: { color: C.cream, transparency: 60 }, line: { type: "none" }
      });
    }
  });

  addFooter(s, "STAGE 05 · CONSUMER", C.cream);
}

// ---------------------------------------------------------------------------
// SLIDE 10 — The Enabling Layer (matrix)
// ---------------------------------------------------------------------------
{
  const s = pptx.addSlide();
  s.background = { color: C.creamDeep };
  topRule(s);
  eyebrowAndNum(s, "THE ENABLING LAYER", "10 / 14", false);

  // Headline
  s.addText([
    { text: "Allied services are ",  options: { color: C.ink,  italic: false, fontFace: FONT, fontSize: 72 } },
    { text: "the invisible half ",   options: { color: C.rust, italic: true,  fontFace: FONT, fontSize: 72 } },
    { text: "of the value chain.",   options: { color: C.ink,  italic: false, fontFace: FONT, fontSize: 72 } }
  ], { x: 0.75, y: 1.88, w: 17.50, h: 3.20, valign: "top", margin: 0 });

  // Matrix column headers: 5 stages
  const colX = [3.46, 6.62, 9.78, 12.93, 16.09];
  const colLabel = ["Sourcing", "Mfg.", "Distribution", "Retail", "Consumer"];
  const colNum   = ["01", "02", "03", "04", "05"];
  colX.forEach((x, i) => {
    addTxt(s, colNum[i], {
      x: x + 0.14, y: 5.40, w: 2.95, h: 0.22,
      fontSize: 10.5, color: C.inkSoft, charSpacing: 3
    });
    addTxt(s, colLabel[i], {
      x: x + 0.14, y: 5.61, w: 2.95, h: 0.32,
      fontSize: 13.5, color: C.ink
    });
  });

  // Row labels + row separators
  const rows = [
    { y: 6.29, label: "Trade finance", bold: true,  color: C.ink,     stages: [1, 0, 0, 0, 0], influence: [0, 1, 1, 1, "dot"], deep: true },
    { y: 7.09, label: "B2B distribution tech", bold: true, color: C.ink, stages: [0, 0, 0, 1, 0], influence: ["dot", 1, 1, 1, 1], deep: true },
    { y: 8.22, label: "Logistics & cold chain",  bold: false, color: C.inkSoft, stages: [0, 0, 0, 0, 0], influence: ["dotS","dotS","dotS","dotS", 0] },
    { y: 9.00, label: "Customs & clearing",      bold: false, color: C.inkSoft, stages: [0, 0, 0, 0, 0], influence: ["dotS", 0, "dotS", 0, 0] },
    { y: 9.77, label: "Mobile money & payments", bold: false, color: C.inkSoft, stages: [0, 0, 0, 0, 0], influence: [0, 0, "dotS", 0, "dotS"] },
  ];

  // Horizontal separator above first row
  s.addShape("rect", { x: 0.75, y: 6.05, w: 18.50, h: 0.01,
    fill: { color: C.ink }, line: { type: "none" } });

  rows.forEach(row => {
    // Label
    addTxt(s, row.label, {
      x: 0.75, y: row.y, w: 2.80, h: 0.45,
      fontSize: 19.5, color: row.color, bold: row.bold
    });
    // Separator below
    s.addShape("rect", { x: 0.75, y: row.y + 0.70, w: 18.50, h: 0.01,
      fill: { color: C.ink }, line: { type: "none" } });

    // Markers per column
    colX.forEach((x, i) => {
      const v = row.stages ? row.stages[i] : 0;
      const inf = row.influence[i];
      const cellCx = x + 1.48;
      const cellCy = row.y + 0.30;
      if (v === 1) {
        // Solid terracotta square (touches stage)
        s.addShape("rect", {
          x: cellCx - 0.14, y: cellCy, w: 0.29, h: 0.29,
          fill: { color: C.terracotta }, line: { type: "none" }
        });
      } else if (inf === 1) {
        // Smaller terracotta square (influence)
        s.addShape("rect", {
          x: cellCx - 0.14, y: cellCy, w: 0.29, h: 0.29,
          fill: { color: C.terracotta }, line: { type: "none" }
        });
      } else if (inf === "dot") {
        // Light dot (indirect)
        s.addShape("ellipse", {
          x: cellCx - 0.06, y: cellCy + 0.08, w: 0.12, h: 0.12,
          fill: { color: C.band }, line: { type: "none" }
        });
      } else if (inf === "dotS") {
        // Small band square
        s.addShape("rect", {
          x: cellCx - 0.10, y: cellCy + 0.04, w: 0.19, h: 0.19,
          fill: { color: C.band }, line: { type: "none" }
        });
      }
    });
  });

  // Legend row
  const legY = 11.00;
  s.addShape("rect", { x: 0.75, y: legY, w: 0.19, h: 0.19,
    fill: { color: C.terracotta }, line: { type: "none" } });
  addTxt(s, "DEEP DIVE AHEAD", {
    x: 1.06, y: legY - 0.02, w: 2.00, h: 0.25,
    fontSize: 10.5, color: C.inkSoft, charSpacing: 3
  });
  s.addShape("rect", { x: 3.21, y: legY + 0.02, w: 0.15, h: 0.15,
    fill: { color: C.terracotta }, line: { type: "none" } });
  addTxt(s, "TOUCHES STAGE", {
    x: 3.48, y: legY - 0.02, w: 2.00, h: 0.25,
    fontSize: 10.5, color: C.inkSoft, charSpacing: 3
  });
  s.addShape("ellipse", { x: 5.62, y: legY + 0.05, w: 0.10, h: 0.10,
    fill: { color: C.inkSoft }, line: { type: "none" } });
  addTxt(s, "INDIRECT INFLUENCE", {
    x: 5.85, y: legY - 0.02, w: 2.50, h: 0.25,
    fontSize: 10.5, color: C.inkSoft, charSpacing: 3
  });

  addFooter(s, "TRADE IN AFRICA · ALLIED SERVICES", C.inkSoft);
}

// ---------------------------------------------------------------------------
// SLIDE 11 — Deep Dive 01: Trade Finance
// ---------------------------------------------------------------------------
{
  const s = pptx.addSlide();
  s.background = { color: C.cream };
  topRule(s);
  eyebrowAndNum(s, "ALLIED SERVICE · DEEP DIVE 01", "11 / 14", false);

  // Title
  s.addText([
    { text: "Trade ",     options: { color: C.ink,  italic: false, fontFace: FONT, fontSize: 78 } },
    { text: "finance.",   options: { color: C.rust, italic: true,  fontFace: FONT, fontSize: 78 } }
  ], { x: 0.75, y: 1.77, w: 11.50, h: 1.60, valign: "top", margin: 0 });

  addTxt(s, "The $81B financing gap between goods ordered and goods paid for.", {
    x: 0.75, y: 3.24, w: 11.00, h: 1.40,
    fontSize: 25.5, color: C.inkSoft
  });

  // Instruments header
  addTxt(s, "INSTRUMENTS IN PLAY", {
    x: 0.75, y: 4.66, w: 10.73, h: 0.30,
    fontSize: 12, color: C.rust, charSpacing: 4
  });

  // 4 instruments in 2 cols x 2 rows
  const instruments = [
    { x: 0.75, y: 5.11, n: "01", head: "Letters of credit",     body: "Bank-guaranteed cross-border imports." },
    { x: 6.21, y: 5.11, n: "02", head: "Invoice factoring",     body: "Distributors sell receivables for working capital." },
    { x: 0.75, y: 5.98, n: "03", head: "Embedded credit",       body: "Retailer BNPL inside B2B ordering apps." },
    { x: 6.21, y: 5.98, n: "04", head: "Supply chain finance",  body: "Anchor-backed funding for tier-2/3 suppliers." }
  ];
  instruments.forEach(inst => {
    addTxt(s, inst.n, {
      x: inst.x, y: inst.y + 0.10, w: 0.40, h: 0.26,
      fontSize: 13.5, color: C.terracotta
    });
    addTxt(s, inst.head, {
      x: inst.x + 0.40, y: inst.y, w: 5.00, h: 0.42,
      fontSize: 19.5, color: C.ink, bold: true
    });
    addTxt(s, inst.body, {
      x: inst.x + 0.40, y: inst.y + 0.40, w: 5.00, h: 0.40,
      fontSize: 15, color: C.inkSoft
    });
  });

  // Right dark panel
  s.addShape("rect", {
    x: 12.58, y: 1.88, w: 6.67, h: 9.14,
    fill: { color: C.ink }, line: { type: "none" }
  });
  // Decorative terracotta circle bottom right
  s.addShape("ellipse", {
    x: 16.75, y: 8.83, w: 3.75, h: 3.75,
    fill: { color: C.terracotta }, line: { type: "none" }
  });

  addTxt(s, "THE GAP", {
    x: 13.17, y: 2.54, w: 5.67, h: 0.26,
    fontSize: 12, color: C.peach, charSpacing: 4
  });
  s.addText([
    { text: "$81", options: { color: C.cream, fontFace: FONT, fontSize: 180 } },
    { text: "B",   options: { color: C.peach, fontFace: FONT, fontSize: 90 } }
  ], { x: 13.17, y: 2.70, w: 5.67, h: 2.60, valign: "top", margin: 0 });
  addTxt(s, "Africa's annual trade finance gap — roughly 40% of all credit requests rejected by commercial banks.", {
    x: 13.17, y: 5.60, w: 4.29, h: 1.80,
    fontSize: 19.5, color: C.cream
  });

  // Source hairline + label
  s.addShape("rect", { x: 13.17, y: 10.31, w: 0.83, h: 0.01,
    fill: { color: C.cream }, line: { type: "none" } });
  addTxt(s, "SOURCE · AFREXIMBANK, 2024", {
    x: 13.17, y: 10.49, w: 5.67, h: 0.22,
    fontSize: 10.5, color: C.cream, charSpacing: 3
  });

  addFooter(s, "DEEP DIVE · TRADE FINANCE", C.inkSoft);
}

// ---------------------------------------------------------------------------
// SLIDE 12 — Deep Dive 02: B2B Distribution Tech (dark bg)
// ---------------------------------------------------------------------------
{
  const s = pptx.addSlide();
  s.background = { color: C.ink };
  topRuleLight(s);
  eyebrowAndNum(s, "ALLIED SERVICE · DEEP DIVE 02", "12 / 14", true);

  // Title
  s.addText([
    { text: "B2B ",                 options: { color: C.cream, italic: false, fontFace: FONT, fontSize: 78 } },
    { text: "distribution tech.",   options: { color: C.peach, italic: true,  fontFace: FONT, fontSize: 78 } }
  ], { x: 0.75, y: 1.77, w: 11.50, h: 1.60, valign: "top", margin: 0 });

  addTxt(s, "The informal-retail unlock: apps that turn one million kiosks into a searchable, addressable channel.", {
    x: 0.75, y: 3.24, w: 11.00, h: 1.40,
    fontSize: 25.5, color: C.band
  });

  addTxt(s, "WHAT THESE PLATFORMS DO", {
    x: 0.75, y: 4.66, w: 10.73, h: 0.30,
    fontSize: 12, color: C.peach, charSpacing: 4
  });

  // 4 numbered items
  const items = [
    { y: 5.11, head: "Aggregate demand from informal retailers", body: "Shopkeepers order via smartphone; platform consolidates and routes to manufacturers." },
    { y: 6.11, head: "Run the middle mile", body: "Shared warehousing and last-mile delivery replace fragmented wholesaler networks." },
    { y: 7.11, head: "Extend embedded credit", body: "Retailer order history becomes an underwriting signal. BNPL at checkout." },
    { y: 8.12, head: "Return first-party data upstream", body: "Sell-out by SKU, outlet, and day — the visibility manufacturers never had." },
  ];
  items.forEach(it => {
    s.addShape("rect", {
      x: 0.75, y: it.y + 0.16, w: 0.15, h: 0.15,
      fill: { color: C.peach }, line: { type: "none" }
    });
    addTxt(s, it.head, {
      x: 1.15, y: it.y, w: 9.13, h: 0.45,
      fontSize: 22.5, color: C.cream, bold: true
    });
    addTxt(s, it.body, {
      x: 1.15, y: it.y + 0.47, w: 9.13, h: 0.45,
      fontSize: 16.5, color: C.band
    });
  });

  // Right panel — cream with platform list
  s.addShape("rect", {
    x: 12.58, y: 1.88, w: 6.67, h: 9.14,
    fill: { type: "none" }, line: { color: C.cream, width: 0.8 }
  });

  addTxt(s, "THE LANDSCAPE", {
    x: 13.01, y: 2.38, w: 5.99, h: 0.26,
    fontSize: 12, color: C.peach, charSpacing: 4
  });
  addTxt(s, "Platforms that have scaled the model across the continent:", {
    x: 13.01, y: 2.91, w: 5.99, h: 1.00,
    fontSize: 19.5, color: C.band
  });

  const platforms = [
    { y: 4.06, name: "TradeDepot",  geo: "NGA · GHA" },
    { y: 5.22, name: "Wasoko",      geo: "KEN · TZA · RWA" },
    { y: 6.39, name: "MaxAB",       geo: "EGY · MAR" },
    { y: 7.56, name: "Twiga Foods", geo: "KEN" },
  ];
  platforms.forEach(p => {
    s.addShape("rect", {
      x: 13.01, y: p.y, w: 5.82, h: 0.96,
      fill: { type: "none" }, line: { color: C.cream, width: 0.8 }
    });
    addTxt(s, p.name, {
      x: 13.27, y: p.y + 0.25, w: 3.20, h: 0.48,
      fontSize: 25.5, color: C.cream, bold: true
    });
    addTxt(s, p.geo, {
      x: 16.50, y: p.y + 0.38, w: 2.30, h: 0.23,
      fontSize: 12, color: C.peach, charSpacing: 3, align: "right"
    });
  });

  // Source hairline + italic tagline
  s.addShape("rect", { x: 13.01, y: 9.71, w: 0.83, h: 0.01,
    fill: { color: C.cream }, line: { type: "none" } });
  addTxt(s, "For brands, these are no longer pilots — they are the channel.", {
    x: 13.01, y: 9.89, w: 5.99, h: 1.00,
    fontSize: 16.5, color: C.band, italic: true
  });

  addFooter(s, "DEEP DIVE · B2B DISTRIBUTION TECH", C.cream);
}

// ---------------------------------------------------------------------------
// SLIDE 13 — The Operator's Playbook (5 principles)
// ---------------------------------------------------------------------------
{
  const s = pptx.addSlide();
  s.background = { color: C.cream };
  topRule(s);
  eyebrowAndNum(s, "THE OPERATOR'S PLAYBOOK", "13 / 14", false);

  // Big headline
  s.addText([
    { text: "Five principles for ",      options: { color: C.ink,  italic: false, fontFace: FONT, fontSize: 72 } },
    { text: "entering FMCG in SSA.",     options: { color: C.rust, italic: true,  fontFace: FONT, fontSize: 72 } }
  ], { x: 0.75, y: 1.77, w: 18.00, h: 2.80, valign: "top", margin: 0 });

  // 5 principles
  const princ = [
    { x: 0.75,  n: "PRINCIPLE 01", head: "Start with the shopkeeper, not the shopper.",     body: "Route-to-market decides everything. Brand and pricing follow." },
    { x: 4.51,  n: "PRINCIPLE 02", head: "Rent the factory, build the brand.",              body: "Toll-manufacturing buys speed. CapEx can wait for proven volume." },
    { x: 8.27,  n: "PRINCIPLE 03", head: "Underwrite the chain, not the counterparty.",     body: "Use trade finance instruments as an operating tool, not a treasury afterthought." },
    { x: 12.03, n: "PRINCIPLE 04", head: "Partner with B2B platforms early.",               body: "They own the distribution data. Their co-marketing is cheaper than building it yourself." },
    { x: 15.78, n: "PRINCIPLE 05", head: "Design for the sachet, price for the day.",       body: "Pack size and price point are the product. Engineer them for daily-wage baskets." },
  ];
  princ.forEach(p => {
    // Terracotta tick above
    s.addShape("rect", {
      x: p.x, y: 4.79, w: 3.47, h: 0.03,
      fill: { color: C.terracotta }, line: { type: "none" }
    });
    addTxt(s, p.n, {
      x: p.x, y: 5.10, w: 3.57, h: 0.26,
      fontSize: 13.5, color: C.rust, charSpacing: 4
    });
    addTxt(s, p.head, {
      x: p.x, y: 5.57, w: 3.57, h: 1.40,
      fontSize: 27, color: C.ink, bold: true
    });
    addTxt(s, p.body, {
      x: p.x, y: 7.05, w: 3.57, h: 1.30,
      fontSize: 15, color: C.inkSoft
    });
  });

  addFooter(s, "THE PLAYBOOK", C.inkSoft);
}

// ---------------------------------------------------------------------------
// SLIDE 14 — Closing (dark, mirrored cover)
// ---------------------------------------------------------------------------
{
  const s = pptx.addSlide();
  s.background = { color: C.ink };

  // Decorative circles (mirrored from cover, in lower-left)
  s.addShape("ellipse", {
    x: -1.88, y: 5.62, w: 7.50, h: 7.50,
    fill: { color: C.terracotta }, line: { type: "none" }
  });
  s.addShape("ellipse", {
    x: 2.29, y: 4.55, w: 5.45, h: 5.45,
    fill: { type: "none" }, line: { color: C.cream, width: 1.25 }
  });
  s.addShape("ellipse", {
    x: 10.00, y: 1.88, w: 1.88, h: 1.88,
    fill: { color: C.gold }, line: { type: "none" }
  });
  s.addShape("ellipse", {
    x: 9.12, y: 1.25, w: 0.67, h: 0.67,
    fill: { color: C.olive2 }, line: { type: "none" }
  });

  // Top rule & masthead
  s.addShape("rect", { x: 0.75, y: 1.04, w: 18.50, h: 0.01,
    fill: { color: C.cream }, line: { type: "none" } });
  addTxt(s, "FIN.", {
    x: 0.75, y: 0.62, w: 2.00, h: 0.28,
    fontSize: 15, color: C.cream, charSpacing: 4
  });
  addTxt(s, "14 / 14", {
    x: 18.00, y: 0.62, w: 1.40, h: 0.28,
    fontSize: 15, color: C.cream, align: "right"
  });

  // THE TAKEAWAY (right-aligned)
  addTxt(s, "THE TAKEAWAY", {
    x: 9.49, y: 2.71, w: 9.76, h: 0.34,
    fontSize: 16.5, color: C.peach, charSpacing: 4, align: "right"
  });

  // Big headline right-aligned
  s.addText([
    { text: "The chain ",     options: { color: C.cream, italic: false, fontFace: FONT, fontSize: 96 } },
    { text: "is ",            options: { color: C.peach, italic: true,  fontFace: FONT, fontSize: 96 } },
    { text: "the opportunity.", options: { color: C.cream, italic: false, fontFace: FONT, fontSize: 96 } }
  ], { x: 7.00, y: 3.20, w: 12.25, h: 3.40, valign: "top", align: "right", margin: 0 });

  addTxt(s, "In Sub-Saharan FMCG, brand is the smaller game. Distribution, credit, and data — the allied layer — is where operators earn the right to sell.", {
    x: 9.59, y: 7.20, w: 9.66, h: 2.00,
    fontSize: 25.5, color: C.band, align: "right"
  });

  // DISCUSSION block (bottom left)
  addTxt(s, "DISCUSSION", {
    x: 0.75, y: 9.72, w: 6.00, h: 0.23,
    fontSize: 12, color: C.peach, charSpacing: 4
  });
  addTxt(s, "Where do we play, and what do we own?", {
    x: 0.75, y: 10.06, w: 8.00, h: 0.55,
    fontSize: 22.5, color: C.cream
  });

  // Bottom right issue tag
  addTxt(s, "TRADE IN AFRICA · VOL. 01", {
    x: 13.00, y: 10.22, w: 6.33, h: 0.23,
    fontSize: 12, color: C.cream, charSpacing: 3, align: "right"
  });
}

// ---------------------------------------------------------------------------
// Save
// ---------------------------------------------------------------------------
pptx.writeFile({ fileName: "Trade_in_Africa.pptx" })
  .then(fn => console.log("Written:", fn));
