// recreate.js - Recreates the iBank Investor Presentation exactly.
// Run:  node recreate.js   (produces iBank_Investor_Presentation.pptx)

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";          // 10" x 5.625"
pres.title  = "iBank Investor Presentation";

// ---------- palette / fonts ----------
const GREEN      = "00C244";
const GREEN_BG   = "E7FAED";
const BLACK      = "000000";
const WHITE      = "FFFFFF";
const GRAY_DK    = "666666";
const GRAY_MD    = "9A9A9A";
const GRAY_LT    = "CCCCCC";
const GRAY_LINE  = "E0E0E0";
const PAGE_BG    = "F5F5F5";
const FONT       = "Aptos";
const FONT_DISP  = "Aptos Display";

// ---------- helpers ----------
function addHeader(slide, pageNum) {
  slide.addText("iBank Investor Presentation", {
    x: 0.4, y: 0.25, w: 4.0, h: 0.3,
    fontSize: 9, fontFace: FONT, color: GRAY_DK, align: "left", margin: 0,
  });
  slide.addText(`${pageNum} / 16`, {
    x: 8.6, y: 0.25, w: 1.0, h: 0.1656,
    fontSize: 9, fontFace: FONT, color: GRAY_DK, align: "right", margin: 0,
  });
}

function addTitle(slide, title, opts = {}) {
  slide.addText(title, {
    x: 0.4, y: 0.55, w: 9.2, h: opts.h || 0.831,
    fontSize: opts.sz || 22, bold: true, fontFace: FONT_DISP,
    color: BLACK, align: "left", margin: 0,
  });
}

function addSource(slide, text) {
  slide.addText(text, {
    x: 0.4, y: 5.28, w: 9.0, h: 0.22,
    fontSize: 7.5, fontFace: FONT, color: GRAY_DK, align: "left", margin: 0,
  });
}

function addLogo(slide, color = BLACK) {
  // 2x2 square logo
  [[4.68,0.75],[4.98,0.75],[4.68,1.05],[4.98,1.05]].forEach(([x,y]) => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.2, h: 0.2, fill: { color }, line: { type: "none" },
    });
  });
}

function bullet(slide, x, y, color = BLACK, size = 0.08) {
  slide.addShape(pres.shapes.OVAL, {
    x, y, w: size, h: size, fill: { color }, line: { type: "none" },
  });
}

// =====================================================================
// SLIDE 1 — Title
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: PAGE_BG };
  addLogo(s, BLACK);

  s.addText("Series A Capital Raise      |      $25,000,000", {
    x: 0.6, y: 2.2861, w: 8.8, h: 0.2576,
    fontSize: 14, bold: true, fontFace: FONT, color: GRAY_DK, align: "center", margin: 0,
  });
  s.addText("iBank", {
    x: 0.6, y: 2.6861, w: 8.8, h: 0.8,
    fontSize: 56, bold: true, fontFace: FONT_DISP, color: BLACK, align: "center", margin: 0,
  });
  s.addText("The AI-Native Investment Bank", {
    x: 0.6, y: 3.3861, w: 8.8, h: 0.7,
    fontSize: 22, fontFace: FONT, color: BLACK, align: "center", margin: 0,
  });

  // three stats
  s.addText("70-80%", { x: 1.55, y: 4.45, w: 2.0, h: 0.3312,
    fontSize: 18, bold: true, fontFace: FONT_DISP, color: BLACK, align: "center", margin: 0 });
  s.addText("Workflow Automated", { x: 1.55, y: 4.85, w: 2.0, h: 0.25,
    fontSize: 9, fontFace: FONT, color: GRAY_DK, align: "center", margin: 0 });

  s.addText("10x", { x: 4.1, y: 4.45, w: 2.0, h: 0.3312,
    fontSize: 18, bold: true, fontFace: FONT_DISP, color: GREEN, align: "center", margin: 0 });
  s.addText("Banker Productivity", { x: 4.1, y: 4.85, w: 2.0, h: 0.25,
    fontSize: 9, fontFace: FONT, color: GRAY_DK, align: "center", margin: 0 });

  s.addText("$80B+", { x: 6.65, y: 4.45, w: 2.0, h: 0.35,
    fontSize: 18, bold: true, fontFace: FONT_DISP, color: BLACK, align: "center", margin: 0 });
  s.addText("Fee Pool Addressable", { x: 6.65, y: 4.85, w: 2.0, h: 0.25,
    fontSize: 9, fontFace: FONT, color: GRAY_DK, align: "center", margin: 0 });

  s.addText("Confidential  |  April 2026", { x: 0.6, y: 5.33, w: 8.8, h: 0.22,
    fontSize: 9, fontFace: FONT, color: GRAY_DK, align: "center", margin: 0 });
}

// =====================================================================
// SLIDE 2 — Executive summary (three columns)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, 2);
  addTitle(s, "iBank automates 70-80% of the M&A deal lifecycle, enabling 3-5 senior bankers to run what traditionally requires 30-50+ professionals");

  // divider line under title
  s.addShape(pres.shapes.LINE, {
    x: 0.4, y: 1.843, w: 9.2, h: 0,
    line: { color: GRAY_LINE, width: 1 },
  });

  const cols = [
    { x: 0.4, head: "The Opportunity", items: [
      "Last major financial services vertical untouched by automation",
      "60-70% comp ratios compress margins; talent caps deal capacity",
      "$80B+ global IB fee pool; $30B M&A advisory; $3-5B SOM in mid-market",
      "$50B+ proven in adjacent verticals: Harvey, Ramp, AlphaSense, Ironclad",
    ]},
    { x: 3.6, head: "The Product", items: [
      "Agentic platform automates end-to-end deal process starting with sell-side M&A",
      "Specialized agents: modeling, docs, data, process, coordination",
      "Human-in-the-loop at every critical decision; agents draft, humans approve",
      "Native VDR eliminates $15-50K per deal; MCP to FactSet, Capital IQ, PitchBook",
    ]},
    { x: 6.8, head: "The Ask", items: [
      "$25M: platform 45%, team 30%, GTM 15%, ops 10%",
      "18-month runway to first revenue inflection",
      "3-5 live deal cycles in 12 months; first design partners in 90 days",
      "Year 5 target: $85M ARR at 75%+ GM across 120+ firms",
    ]},
  ];

  cols.forEach(col => {
    s.addText(col.head, {
      x: col.x, y: 1.929, w: 3.0, h: 0.4,
      fontSize: 14, bold: true, fontFace: FONT_DISP, color: GREEN, margin: 0,
    });
    col.items.forEach((txt, i) => {
      const y = 2.429 + i * 0.62;
      bullet(s, col.x, y + 0.09, BLACK);
      s.addText(txt, {
        x: col.x + 0.2, y: y, w: 2.72, h: 0.55,
        fontSize: 10, fontFace: FONT, color: BLACK, margin: 0, valign: "top",
      });
    });
  });

  addSource(s, "Sources: Dealogic, McKinsey Global Institute, PitchBook. Competitor valuations as of April 2026.");
}

// =====================================================================
// SLIDE 3 — Pain points 2x4 grid
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, 3);
  addTitle(s, "Investment banking, an $80bn+ industry, remains heavily reliant on spreadsheets, email chains and junior banker hours");

  const cells = [
    // row 1
    { x: 0.4,  y: 1.907, num: "60-70%",   label: "Compensation Ratios",  desc: "Highest in financial services. Every rev dollar costs 60-70¢ in people." },
    { x: 2.7,  y: 1.907, num: "10-15",    label: "FTEs Per Mandate",     desc: "Deal capacity capped by headcount. Banks turn away any they can't staff." },
    { x: 5.0,  y: 1.907, num: "80%",      label: "Repetitive Execution", desc: "Of junior banker time; model, format, gather. All automatable." },
    { x: 7.3,  y: 1.907, num: "4-8 wks",  label: "To Prepare a CIM",     desc: "Weeks of manual work per deal. Pitch books and valuations mirror timeline." },
    // row 2
    { x: 0.4,  y: 3.557, num: "$200-500K", label: "Per Junior Banker",    desc: "Fully loaded, before office, compliance, and overhead." },
    { x: 2.7,  y: 3.557, num: "Linear",    label: "Revenue Scaling",      desc: "More deals = proportionally more people. No operating leverage." },
    { x: 5.0,  y: 3.557, num: "$15-50K",   label: "VDR Cost per Deal",    desc: "To Intralinks & Datasite. Commodity service, no differentiation." },
    { x: 7.3,  y: 3.557, num: "1:1",       label: "Capacity : Headcount", desc: "Deal throughput is gated by raw banker hours, the structural ceiling." },
  ];

  cells.forEach(c => {
    // green left accent
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: c.y, w: 0.05, h: 1.45,
      fill: { color: GREEN }, line: { type: "none" },
    });
    // number
    s.addText(c.num, {
      x: c.x + 0.15, y: c.y, w: 2.1, h: 0.5,
      fontSize: 26, bold: true, fontFace: FONT_DISP, color: BLACK, align: "left", margin: 0,
    });
    // label
    s.addText(c.label, {
      x: c.x + 0.15, y: c.y + 0.5, w: 2.1, h: 0.3,
      fontSize: 10.5, bold: true, fontFace: FONT, color: BLACK, align: "left", margin: 0,
    });
    // desc
    s.addText(c.desc, {
      x: c.x + 0.15, y: c.y + 0.82, w: 2.05, h: 0.55,
      fontSize: 9, fontFace: FONT, color: GRAY_DK, align: "left", margin: 0, valign: "top",
    });
  });

  addSource(s, "Sources: Dealogic, Coalition Greenwich, company disclosures.");
}

// =====================================================================
// SLIDE 4 — Platform agents + orchestration engine + human-in-loop
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, 4);
  addTitle(s, "iBank: an agentic AI platform that automates deal workflows from origination to close; an orchestrated network of specialized agents");

  // left column: 5 agent cards
  const agents = [
    { t: "Financial Modeling",       d: "DCF, LBO, comps; iterates on assumptions" },
    { t: "Document Generation",      d: "Pitch decks, CIMs, teasers, process letters" },
    { t: "Data Retrieval",           d: "FactSet, Cap IQ, PitchBook via MCP" },
    { t: "Process Management",       d: "Auctions, bid tracking, comms" },
    { t: "Stakeholder Coordination", d: "Scheduling via Teams, Meet, calendar" },
  ];
  agents.forEach((a, i) => {
    const y = 1.883 + i * 0.66;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.4, y, w: 3.346, h: 0.58,
      fill: { color: PAGE_BG }, line: { type: "none" }, rectRadius: 0.06,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.52, y: y + 0.12, w: 0.06, h: 0.34,
      fill: { color: GREEN }, line: { type: "none" },
    });
    s.addText(a.t, {
      x: 0.7, y: y + 0.08, w: 3.0, h: 0.28,
      fontSize: 11.5, bold: true, fontFace: FONT, color: BLACK, margin: 0,
    });
    s.addText(a.d, {
      x: 0.7, y: y + 0.32, w: 3.0, h: 0.24,
      fontSize: 9, fontFace: FONT, color: GRAY_DK, margin: 0,
    });
  });

  // middle: orchestration engine (black phone-like card)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 4.176, y: 1.891, w: 1.6, h: 3.192,
    fill: { color: BLACK }, line: { type: "none" }, rectRadius: 0.22,
  });
  s.addText("Orchestration", { x: 4.176, y: 2.991, w: 1.6, h: 0.4,
    fontSize: 12, bold: true, fontFace: FONT, color: WHITE, align: "center", margin: 0 });
  s.addText("Engine", { x: 4.176, y: 3.341, w: 1.6, h: 0.4,
    fontSize: 12, bold: true, fontFace: FONT, color: WHITE, align: "center", margin: 0 });
  s.addText("deploys", { x: 4.176, y: 3.891, w: 1.6, h: 0.2,
    fontSize: 9, fontFace: FONT, color: GREEN, align: "center", margin: 0 });
  s.addText("coordinates", { x: 4.176, y: 4.071, w: 1.6, h: 0.2,
    fontSize: 9, fontFace: FONT, color: GREEN, align: "center", margin: 0 });
  s.addText("monitors", { x: 4.176, y: 4.251, w: 1.6, h: 0.2,
    fontSize: 9, fontFace: FONT, color: GREEN, align: "center", margin: 0 });

  // right: human-in-the-loop card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.1, y: 1.883, w: 3.346, h: 3.192,
    fill: { color: PAGE_BG }, line: { type: "none" }, rectRadius: 0.1,
  });
  s.addText("Human-in-the-loop", { x: 6.3, y: 2.033, w: 3.0, h: 0.35,
    fontSize: 14, bold: true, fontFace: FONT, color: GREEN, margin: 0 });
  s.addText("Agents draft. Humans approve.", { x: 6.3, y: 2.302, w: 3.0, h: 0.26,
    fontSize: 12, bold: true, fontFace: FONT, color: BLACK, margin: 0 });
  s.addText("Senior bankers provide judgment. Agents handle execution.", {
    x: 6.3, y: 2.669, w: 3.0, h: 0.5,
    fontSize: 11, fontFace: FONT, color: GRAY_DK, margin: 0, valign: "top",
  });
  s.addText([
    { text: "Pricing, bid selection, final terms, and client communications always route through a human.",
      options: { bullet: true } },
  ], {
    x: 6.3, y: 3.25, w: 3.0, h: 1.0,
    fontSize: 11, fontFace: FONT, color: GRAY_DK, margin: 0,
  });
}

// =====================================================================
// SLIDE 5 — 12-step deal flow, 3 phases, human checkpoints green
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, 5);
  addTitle(s, "A single sell-side mandate flows through 12 automated steps with human checkpoints at 3 critical decision points, end-to-end on one platform",
    { sz: 20, h: 0.755 });

  const phases = [
    { y: 1.907, title: "Phase 1", sub: "Origination & Pitching",
      cells: [
        { t1: "Industry screening", t2: "& target ID",          tag: "AI" },
        { t1: "Pitch materials",    t2: "& CIM prep",           tag: "AI" },
        { t1: "Financial modeling", t2: "(DCF/LBO/comps)",      tag: "AI" },
        { t1: "MD/VP review",       t2: "& approval",           tag: "HUMAN" },
      ]},
    { y: 3.075, title: "Phase 2", sub: "Mandate Execution",
      cells: [
        { t1: "VDR setup (native)",    t2: "",                 tag: "AI" },
        { t1: "Data request",          t2: "management",       tag: "AI" },
        { t1: "Buyer outreach",        t2: "& scheduling",     tag: "AI" },
        { t1: "Management",            t2: "presentation review", tag: "HUMAN" },
      ]},
    { y: 4.267, title: "Phase 3", sub: "Auction & Close",
      cells: [
        { t1: "Multi-round",      t2: "bid tracking",      tag: "AI" },
        { t1: "Bid comparison",   t2: "& analysis",        tag: "AI" },
        { t1: "SPA negotiation",  t2: "support",           tag: "AI" },
        { t1: "Final terms & close", t2: "",               tag: "HUMAN" },
      ]},
  ];

  const xs = [2.352, 4.192, 5.992, 7.812];

  phases.forEach(p => {
    s.addText([
      { text: p.title + " ", options: { breakLine: true, bold: true, fontSize: 11, color: BLACK } },
      { text: p.sub, options: { bold: true, fontSize: 11, color: BLACK } },
    ], { x: 0.4, y: p.y + 0.065, w: 2.0, h: 0.5, fontFace: FONT, margin: 0 });

    p.cells.forEach((c, i) => {
      const isHuman = c.tag === "HUMAN";
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: xs[i], y: p.y, w: 1.7, h: 0.9,
        fill: { color: isHuman ? GREEN : PAGE_BG }, line: { type: "none" }, rectRadius: 0.06,
      });
      s.addText(
        c.t2 ? [
          { text: c.t1, options: { bold: true, fontSize: 10, color: isHuman ? WHITE : BLACK, breakLine: true } },
          { text: c.t2, options: { bold: true, fontSize: 10, color: isHuman ? WHITE : BLACK } },
        ] : [ { text: c.t1, options: { bold: true, fontSize: 10, color: isHuman ? WHITE : BLACK } } ],
        { x: xs[i] + 0.1, y: p.y + 0.07, w: 1.5, h: 0.5, fontFace: FONT, margin: 0 }
      );
      s.addText(c.tag, {
        x: xs[i] + 0.1, y: p.y + 0.6, w: 1.5, h: 0.2,
        fontSize: 9, bold: true, fontFace: FONT,
        color: isHuman ? WHITE : GREEN, margin: 0,
      });
    });
  });

  addSource(s, "HUMAN checkpoints drive pricing, bid selection, final terms, and client communications.");
}

// =====================================================================
// SLIDE 6 — 3-layer platform architecture
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, 6);
  addTitle(s, "PLACEHOLDER",
    { sz: 20, h: 1.05 });

  // Layer 1 (light gray bar)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.916, w: 9.138, h: 0.534,
    fill: { color: PAGE_BG }, line: { type: "none" }, rectRadius: 0.06,
  });
  s.addText("Layer 1  ·  External Data", {
    x: 0.6, y: 2.085, w: 2.5, h: 0.3,
    fontSize: 12, bold: true, fontFace: FONT, color: BLACK, margin: 0,
  });
  s.addText("FactSet   ·   S&P Capital IQ   ·   PitchBook   ·   AlphaSense   ·   SEC EDGAR", {
    x: 2.95, y: 2.085, w: 6.5, h: 0.3,
    fontSize: 12, bold: true, fontFace: FONT, color: BLACK, align: "right", margin: 0,
  });
  s.addText("▼   MCP connectors & external APIs", {
    x: 0.548, y: 2.554, w: 8.805, h: 0.2,
    fontSize: 9, bold: true, fontFace: FONT, color: GREEN, margin: 0,
  });

  // Layer 2 (black orchestration engine)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 2.88, w: 9.2, h: 1.4,
    fill: { color: BLACK }, line: { type: "none" }, rectRadius: 0.06,
  });
  s.addText("Layer 2  ·  Agent Orchestration Engine", {
    x: 0.6, y: 2.96, w: 6.0, h: 0.3,
    fontSize: 12, bold: true, fontFace: FONT, color: WHITE, margin: 0,
  });
  const mods = [
    { x: 0.55, t: "Financial Modeling", d: "DCF, LBO, comps" },
    { x: 2.4,  t: "Doc Generation",     d: "CIMs, decks, letters" },
    { x: 4.25, t: "Native VDR",         d: "Replace Intralinks/Datasite" },
    { x: 6.1,  t: "Auction Manager",    d: "Multi-round tracking" },
    { x: 7.95, t: "SPA Review",         d: "Clause extraction, redline" },
  ];
  mods.forEach(m => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: m.x, y: 3.38, w: 1.75, h: 0.8,
      fill: { color: PAGE_BG }, line: { type: "none" }, rectRadius: 0.06,
    });
    s.addText(m.t, {
      x: m.x, y: 3.43, w: 1.75, h: 0.22,
      fontSize: 10, bold: true, fontFace: FONT, color: BLACK, align: "center", margin: 0,
    });
    s.addText(m.d, {
      x: m.x, y: 3.73, w: 1.75, h: 0.4,
      fontSize: 9, fontFace: FONT, color: GRAY_DK, align: "center", margin: 0,
    });
  });

  s.addText("▼   Outputs & integrations", {
    x: 0.548, y: 4.388, w: 8.805, h: 0.2,
    fontSize: 9, bold: true, fontFace: FONT, color: GREEN, margin: 0,
  });

  // Layer 3 (deliverables)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 4.68, w: 9.138, h: 0.55,
    fill: { color: PAGE_BG }, line: { type: "none" }, rectRadius: 0.06,
  });
  s.addText("Layer 3  ·  Deliverables", {
    x: 0.6, y: 4.82, w: 2.5, h: 0.3,
    fontSize: 12, bold: true, fontFace: FONT, color: BLACK, margin: 0,
  });
  s.addText("Pitch decks & CIMs   ·   Valuation models   ·   Process letters   ·   Client dashboards", {
    x: 2.95, y: 4.82, w: 6.5, h: 0.3,
    fontSize: 12, bold: true, fontFace: FONT, color: BLACK, align: "right", margin: 0,
  });
}

// =====================================================================
// SLIDE 7 — Five structural tailwinds
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, 7);
  addTitle(s, "PLACEHOLDER",
    { sz: 20, h: 0.755 });

  const items = [
    { x: 0.4, n: "1", h: "LLM capabilities crossed the threshold",
      d: "Foundation models now reliably generate financial docs, perform multi-step reasoning, and maintain context across workflows." },
    { x: 2.3, n: "2", h: "MCP enables reliable agent-to-data",
      d: "Model Context Protocol and structured tool-use let agents query FactSet, Capital IQ, & PitchBook in a real-time, auditable way." },
    { x: 4.2, n: "3", h: "Comp costs are unsustainable",
      d: "60-70% comp ratios compress margins. Banks actively seek automation. Pressure is sharpest in the mid-market." },
    { x: 6.1, n: "4", h: "Regulation favors AI workflows",
      d: "Audit trail requirements align perfectly with agents that log every action and decision by default; a tailwind, not a headwind." },
    { x: 8.0, n: "5", h: "Proven in every adjacent vertical",
      d: "Harvey, Legora, Ramp, Fieldguide, AlphaSense, Ironclad. Same S-curve: skepticism → copilot → agentic → platform." },
  ];

  items.forEach(it => {
    s.addText(it.n, {
      x: it.x, y: 1.9, w: 1.6, h: 0.671,
      fontSize: 42, bold: true, fontFace: FONT_DISP, color: GREEN, align: "center", margin: 0,
    });
    // divider line under number
    s.addShape(pres.shapes.LINE, {
      x: it.x, y: 2.65, w: 1.6, h: 0,
      line: { color: GRAY_LINE, width: 1 },
    });
    s.addText(it.h, {
      x: it.x, y: 2.8, w: 1.536, h: 0.431,
      fontSize: 11, bold: true, fontFace: FONT, color: BLACK, align: "center", margin: 0, valign: "top",
    });
    s.addText(it.d, {
      x: it.x, y: 3.412, w: 1.608, h: 1.518,
      fontSize: 10, fontFace: FONT, color: GRAY_DK, align: "left", margin: 0, valign: "top",
    });
  });

  addSource(s, "$50B+ combined enterprise value across proven adjacent-vertical platforms. Sources: PitchBook, company disclosures.");
}

// =====================================================================
// SLIDE 8 — TAM / SAM / SOM
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, 8);
  addTitle(s, "$80B+ global fee pool with a $3-5B serviceable market in mid-market M&A, the most fragmented, underserved, and automation-ready segment",
    { sz: 20, h: 0.755 });

  const tams = [
    { x: 0.416, lbl: "TAM", val: "$80B+", color: BLACK,
      d: "Global IB fee pool incl. M&A, ECM, DCM, and restructuring" },
    { x: 3.516, lbl: "SAM", val: "$30B+", color: BLACK,
      d: "M&A advisory fees globally, the largest, most relationship-driven segment" },
    { x: 6.616, lbl: "SOM", val: "$3-5B", color: GREEN,
      d: "Mid-market and lower-middle-market M&A, most amenable to platform disruption" },
  ];

  tams.forEach(t => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: t.x, y: 1.932, w: 2.9, h: 1.75,
      fill: { color: PAGE_BG }, line: { type: "none" }, rectRadius: 0.08,
    });
    s.addText(t.lbl, {
      x: t.x + 0.25, y: 2.062, w: 2.6, h: 0.3,
      fontSize: 10, bold: true, fontFace: FONT, color: GRAY_DK, margin: 0,
    });
    s.addText(t.val, {
      x: t.x + 0.25, y: 2.382, w: 2.6, h: 0.8,
      fontSize: 40, bold: true, fontFace: FONT_DISP, color: t.color, margin: 0,
    });
    s.addText(t.d, {
      x: t.x + 0.25, y: 3.132, w: 2.6, h: 0.45,
      fontSize: 9.5, fontFace: FONT, color: GRAY_DK, margin: 0, valign: "top",
    });
  });

  s.addText("Why mid-market M&A", {
    x: 0.4, y: 3.892, w: 9.2, h: 0.25,
    fontSize: 12, bold: true, fontFace: FONT, color: GREEN, margin: 0,
  });

  const bullets8 = [
    { x: 0.4, y: 4.175, text: "5,000+ boutique and mid-market firms globally; typical teams of 5-50 professionals" },
    { x: 5.0, y: 4.175, text: "Deal sizes $10-500M; large enough for meaningful fees, small enough that manual overhead is disproportionate" },
    { x: 0.4, y: 4.575, text: "PLACEHOLDER" },
    { x: 5.0, y: 4.575, text: "PLACEHOLDER" },
  ];
  bullets8.forEach(b => {
    bullet(s, b.x, b.y + 0.075, GREEN);
    s.addText(b.text, {
      x: b.x + 0.155, y: b.y, w: 4.4, h: 0.45,
      fontSize: 9, fontFace: FONT, color: BLACK, margin: 0, valign: "top",
    });
  });

  addSource(s, "Sources: Dealogic, McKinsey Global Banking Annual Review, PitchBook, Preqin.");
}

// =====================================================================
// SLIDE 9 — Competitive 2x2 positioning
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, 9);
  addTitle(s, "iBank is the operating system, not a feature. Every competitor solves one piece. No one owns the workflow.",
    { sz: 20, h: 0.755 });

  // axis labels
  s.addText("↑  AI Autonomy", { x: 0.4, y: 1.57, w: 1.3, h: 0.2,
    fontSize: 9, bold: true, fontFace: FONT, color: GRAY_DK, margin: 0 });
  s.addText("Lifecycle Coverage  →", { x: 1.3, y: 1.57, w: 6.6, h: 0.2,
    fontSize: 9, bold: true, fontFace: FONT, color: GRAY_DK, align: "center", margin: 0 });

  // 2x2 quadrants (top-right highlighted green)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.85, y: 1.938, w: 3.3, h: 1.575,
    fill: { color: PAGE_BG }, line: { type: "none" }, rectRadius: 0.06 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.2,  y: 1.938, w: 3.25, h: 1.575,
    fill: { color: GREEN_BG }, line: { type: "none" }, rectRadius: 0.06 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.85, y: 3.562, w: 3.3, h: 1.525,
    fill: { color: PAGE_BG }, line: { type: "none" }, rectRadius: 0.06 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.2,  y: 3.562, w: 3.25, h: 1.525,
    fill: { color: PAGE_BG }, line: { type: "none" }, rectRadius: 0.06 });

  // quadrant labels
  s.addText("Agentic · End-to-end", { x: 4.25, y: 1.988, w: 3.15, h: 0.2,
    fontSize: 8.5, bold: true, fontFace: FONT, color: GREEN, align: "right", margin: 0 });
  s.addText("Copilot · Single task", { x: 0.9, y: 4.838, w: 3.2, h: 0.2,
    fontSize: 8.5, fontFace: FONT, color: GRAY_DK, margin: 0 });

  // big iBank green dot
  s.addShape(pres.shapes.OVAL, {
    x: 6.122, y: 2.428, w: 0.28, h: 0.28,
    fill: { color: GREEN }, line: { type: "none" },
  });
  s.addText("iBank", { x: 6.458, y: 2.342, w: 1.3, h: 0.3,
    fontSize: 12, bold: true, fontFace: FONT, color: GREEN, margin: 0 });

  // competitor dots
  const comps = [
    { x: 2.42,  y: 3.181, name: "Rogo",         tx: 2.65,  ty: 3.161 },
    { x: 1.958, y: 3.59,  name: "Model ML",     tx: 2.188, ty: 3.57 },
    { x: 2.09,  y: 4.126, name: "Finalis",      tx: 2.32,  ty: 4.106 },
    { x: 1.562, y: 4.441, name: "DealCloud",    tx: 1.792, ty: 4.421 },
    { x: 4.4,   y: 3.275, name: "OffDeal",      tx: 4.63,  ty: 3.255 },
    { x: 3.148, y: 3.987, name: "Clarum/Keye",  tx: 3.378, ty: 3.967 },
    { x: 2.75,  y: 3.748, name: "BlueFlame",    tx: 2.98,  ty: 3.728 },
  ];
  comps.forEach(c => {
    s.addShape(pres.shapes.OVAL, {
      x: c.x, y: c.y, w: 0.16, h: 0.16,
      fill: { color: BLACK }, line: { type: "none" },
    });
    s.addText(c.name, {
      x: c.tx, y: c.ty, w: 1.4, h: 0.22,
      fontSize: 8.5, fontFace: FONT, color: BLACK, margin: 0,
    });
  });

  // right-side positioning panel
  s.addText("The positioning", {
    x: 7.55, y: 1.907, w: 2.0, h: 0.25,
    fontSize: 11, bold: true, fontFace: FONT, color: GREEN, margin: 0,
  });
  const posItems = [
    { y: 2.26, text: "Rogo makes analysts faster." },
    { y: 2.9,  text: "DealCloud tracks pipelines." },
    { y: 3.55, text: "OffDeal runs small deals." },
  ];
  posItems.forEach(p => {
    bullet(s, 7.55, p.y + 0.07, GREEN);
    s.addText(p.text, {
      x: 7.7, y: p.y, w: 1.85, h: 0.5,
      fontSize: 9, fontFace: FONT, color: BLACK, margin: 0, valign: "top",
    });
  });
  s.addText("None orchestrate end-to-end deal execution with autonomous agents.", {
    x: 7.55, y: 4.1, w: 1.95, h: 0.7,
    fontSize: 9, fontFace: FONT, color: BLACK, margin: 0, valign: "top",
  });
  // final green takeaway card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.55, y: 4.88, w: 1.95, h: 0.5,
    fill: { color: GREEN }, line: { type: "none" },
  });
  s.addText("iBank is the OS for the AI-native investment bank.", {
    x: 7.55, y: 4.88, w: 1.95, h: 0.5,
    fontSize: 9, bold: true, fontFace: FONT, color: WHITE, align: "center", margin: 0, valign: "middle",
  });

  addSource(s, "Data providers (Cap IQ, FactSet, PitchBook, AlphaSense) are inputs, not competitors.");
}

// =====================================================================
// SLIDE 10 — 3-stage GTM plan
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, 10);
  addTitle(s, "iBank removes the resource constraint and creates a new category of platform-enabled advisory",
    { sz: 20, h: 0.755 });

  const stages = [
    { x: 0.4, n: "1", title: "LAUNCH  ·  M1–12", items: [
      "Deploy with 2–3 partner boutiques with strong deal flow",
      "Prove platform on live sell-side mandates; real deals, real outcomes",
      "Iterate agent accuracy and workflow coverage; build case studies",
      "Target: 3-5 completed deal cycles in the first 12 months",
    ]},
    { x: 3.559, n: "2", title: "SCALE  ·  M12–24", items: [
      "Platform-as-infrastructure for boutiques, sponsors, and independents",
      "Thousands of experienced bankers lack execution infrastructure",
      "Self-serve onboarding with white-glove setup",
      "Subscription base fee + success-based fees per deal activity",
    ]},
    { x: 6.751, n: "3", title: "EXPAND  ·  M24–36", items: [
      "Modular agent services (modeling, VDR, auctions) to PE, FOs, corp dev",
      "Geographic expansion: US/UK → Europe → Middle East → Asia",
      "Add buy-side, restructuring, capital raises, fairness opinions",
      "Marketplace dynamics: data network effects compound platform quality",
    ]},
  ];

  stages.forEach(st => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: st.x, y: 1.95, w: 2.835, h: 3.071,
      fill: { color: PAGE_BG }, line: { type: "none" }, rectRadius: 0.08,
    });
    s.addText(st.n, {
      x: st.x + 0.152, y: 2.1, w: 0.6, h: 0.5,
      fontSize: 28, bold: true, fontFace: FONT_DISP, color: GREEN, margin: 0,
    });
    s.addText(st.title, {
      x: st.x + 0.55, y: 2.213, w: 2.2, h: 0.3,
      fontSize: 10.5, bold: true, fontFace: FONT, color: BLACK, margin: 0, valign: "middle",
    });
    st.items.forEach((it, i) => {
      const y = 2.7 + i * 0.54;
      bullet(s, st.x + 0.176, y + 0.09, GREEN, 0.07);
      s.addText(it, {
        x: st.x + 0.326, y: y, w: 2.45, h: 0.5,
        fontSize: 9.5, fontFace: FONT, color: BLACK, margin: 0, valign: "top",
      });
    });
  });

  addSource(s, "Pricing: subscription base fee per firm + success-based fees tied to deal activity.");
}

// =====================================================================
// SLIDE 11 — comparison table
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, 11);
  addTitle(s, "iBank-enabled firms operate at 15-25% comp ratios vs. 60-70% industry average; margins expand to 75%+ as volume grows without pro rata headcount",
    { sz: 20, h: 0.755 });

  // column headers
  s.addText("Metric", {
    x: 0.441, y: 1.933, w: 3.0, h: 0.3,
    fontSize: 10, bold: true, fontFace: FONT, color: GRAY_DK, margin: 0,
  });
  s.addText("Traditional bank", {
    x: 3.508, y: 1.933, w: 3.0, h: 0.3,
    fontSize: 10, bold: true, fontFace: FONT, color: GRAY_DK, margin: 0,
  });
  s.addText("iBank-enabled firm", {
    x: 6.575, y: 1.933, w: 3.0, h: 0.3,
    fontSize: 10, bold: true, fontFace: FONT, color: GREEN, margin: 0,
  });

  // green outline around iBank column
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.508, y: 1.933, w: 3.051, h: 3.0,
    fill: { type: "none" }, line: { color: GREEN, width: 1.5 },
  });

  const rows = [
    ["Deal team size",          "30-50 professionals",            "3-5 senior bankers + platform"],
    ["Compensation ratio",      "60-70% of revenue",              "15-25% of revenue"],
    ["Time to CIM",             "4-8 weeks",                      "3-5 days"],
    ["VDR cost per deal",       "$15-50K (Intralinks, Datasite)", "Included (native module)"],
    ["Deals per senior banker", "2-3 active mandates",            "7-10 active mandates"],
    ["Marginal cost / next deal","Hire 3-5 people ($500K-1.5M)",  "Incremental compute (~$5K)"],
    ["Scaling model",           "Linear (headcount = capacity)",  "Exponential (platform leverage)"],
  ];

  rows.forEach((r, i) => {
    const y = 2.333 + i * 0.38;
    s.addShape(pres.shapes.LINE, {
      x: 0.4, y: y - 0.1, w: 9.134, h: 0,
      line: { color: GRAY_LINE, width: 0.75 },
    });
    s.addText(r[0], {
      x: 0.441, y, w: 3.0, h: 0.35,
      fontSize: 10, fontFace: FONT, color: BLACK, margin: 0, valign: "top",
    });
    s.addText(r[1], {
      x: 3.508, y, w: 3.0, h: 0.35,
      fontSize: 10, fontFace: FONT, color: GRAY_DK, margin: 0, valign: "top",
    });
    s.addText(r[2], {
      x: 6.575, y, w: 3.0, h: 0.35,
      fontSize: 10, bold: true, fontFace: FONT, color: BLACK, margin: 0, valign: "top",
    });
  });

  addSource(s, "Revenue per deal: $70K–$120K depending on deal size and services used.");
}

// =====================================================================
// SLIDE 12 — 6 risks (2x3 grid)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, 12);
  addTitle(s, "Six key risks are structurally mitigated by design; human-in-the-loop, full audit trails, enterprise-grade security, and a self-motivated target user base",
    { sz: 20, h: 0.755 });

  const risks = [
    { x: 0.408, y: 1.94, h: "Accuracy & hallucination",
      d: "Human-in-the-loop at critical decisions. Validation layers flag inconsistencies before deliverable reaches the client." },
    { x: 3.608, y: 1.94, h: "Regulatory",
      d: "Audit trails by design: every agent action, data retrieval, & human approval is logged. Built for SOC 2, GDPR, & SEC compliance." },
    { x: 6.808, y: 1.94, h: "Data security",
      d: "Enterprise-grade encryption at rest and in transit. Client data isolation. On-prem deployment option for tier-one clients." },
    { x: 0.408, y: 3.64, h: "Adoption",
      d: "Senior bankers are the target, not juniors who need retraining. They understand the pain intimately and are motivated to adopt." },
    { x: 3.608, y: 3.64, h: "Compute costs",
      d: "~$5K per deal in compute vs. $200K+ per analyst per year. GPU prices and inference costs trending down. Favorable trajectory." },
    { x: 6.808, y: 3.64, h: "Client trust",
      d: "Gradual design-partner rollout. Transparent about AI. Senior bankers preserve all client relationships and strategic decisions." },
  ];

  risks.forEach(r => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: r.x, y: r.y, w: 2.795, h: 1.417,
      fill: { color: PAGE_BG }, line: { type: "none" }, rectRadius: 0.08,
    });
    // green dot
    s.addShape(pres.shapes.OVAL, {
      x: r.x + 0.22, y: r.y + 0.237, w: 0.14, h: 0.14,
      fill: { color: GREEN }, line: { type: "none" },
    });
    s.addText(r.h, {
      x: r.x + 0.45, y: r.y + 0.199, w: 2.3, h: 0.3,
      fontSize: 11.5, bold: true, fontFace: FONT, color: BLACK, margin: 0,
    });
    s.addText(r.d, {
      x: r.x + 0.22, y: r.y + 0.55, w: 2.5, h: 0.8,
      fontSize: 9.5, fontFace: FONT, color: GRAY_DK, margin: 0, valign: "top",
    });
  });
}

// =====================================================================
// SLIDE 13 — Team (4 circles)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, 13);
  addTitle(s, "$500B+ in M&A transaction experience x deep AI engineering x fintech product leadership; the exact intersection required to build this",
    { sz: 20, h: 0.755 });

  const people = [
    { cx: 1.1, lx: 0.4, title: "CEO", label: "CEO", domain: "M&A & Capital Markets",
      bio: "25+ years in M&A. Former SMD at a bulge-bracket bank. Led $500B+ in transactions across industrials, TMT, & financial services." },
    { cx: 3.45, lx: 2.75, title: "CPO", label: "CPO", domain: "Banking × Fintech Product",
      bio: "15+ years spanning IB & fintech leadership. Former VP at a top-tier bank turned fintech PM. Built products used by 100M+ people." },
    { cx: 5.8, lx: 5.1, title: "CTO", label: "CTO", domain: "Enterprise Financial Systems",
      bio: "20+ years in enterprise financial systems. Former Chief Architect at a major FS firm. Built real-time trading and regulatory reporting at scale." },
    { cx: 8.15, lx: 7.45, title: "Head of AI", label: "Head of AI", domain: "Agentic AI Infrastructure",
      bio: "Native AI engineer. Previously built AI systems for financial doc gen at scale. MCP integration, LLM orchestration, agentic frameworks." },
  ];

  people.forEach(p => {
    s.addShape(pres.shapes.OVAL, {
      x: p.cx, y: 1.95, w: 0.85, h: 0.85,
      fill: { color: BLACK }, line: { type: "none" },
    });
    s.addText(p.title, {
      x: p.cx, y: 1.95, w: 0.85, h: 0.85,
      fontSize: 12, bold: true, fontFace: FONT, color: WHITE, align: "center", valign: "middle", margin: 0,
    });
    s.addText(p.label, {
      x: p.lx, y: 2.9, w: 2.25, h: 0.3,
      fontSize: 12, bold: true, fontFace: FONT, color: BLACK, align: "center", margin: 0,
    });
    s.addText(p.domain, {
      x: p.lx, y: 3.2, w: 2.25, h: 0.3,
      fontSize: 9.5, fontFace: FONT, color: GREEN, align: "center", margin: 0,
    });
    s.addText(p.bio, {
      x: p.lx + 0.04, y: 3.55, w: 2.17, h: 1.2,
      fontSize: 9.5, fontFace: FONT, color: GRAY_DK, align: "center", margin: 0, valign: "top",
    });
  });

  // advisory line
  s.addShape(pres.shapes.LINE, {
    x: 0.4, y: 4.804, w: 9.2, h: 0,
    line: { color: GRAY_LINE, width: 1 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 4.874, w: 9.2, h: 0.3,
    fill: { color: GREEN }, line: { type: "none" },
  });
  s.addText("Advisory Board: Former CEO of a major European bank    ·    Partner at a top-5 global PE firm    ·    Enterprise AI exec", {
    x: 0.4, y: 4.874, w: 9.2, h: 0.3,
    fontSize: 9, bold: true, fontFace: FONT, color: WHITE, align: "center", valign: "middle", margin: 0,
  });
}

// =====================================================================
// SLIDE 14 — Use of proceeds bar + two bar charts
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, 14);
  addTitle(s, [
    { text: "$25M funds 18 months of buildout and positions iBank for ", options: { bold: true, fontSize: 18, color: BLACK } },
    { text: "$85M ARR ", options: { bold: true, fontSize: 18, color: BLACK } },
    { text: "by Year 5 at greater than ", options: { bold: true, fontSize: 18, color: BLACK } },
    { text: "75% ", options: { bold: true, fontSize: 18, color: BLACK } },
    { text: "gross margin", options: { bold: true, fontSize: 18, color: BLACK } },
  ], { sz: 18, h: 0.68 });

  // "Use of proceeds: $25M"
  s.addText("Use of proceeds: $25M", {
    x: 0.45, y: 1.325, w: 5.0, h: 0.2,
    fontSize: 9.5, bold: true, fontFace: FONT, color: GRAY_DK, margin: 0,
  });

  // stacked proportion bar
  const segs = [
    { x: 0.425, w: 4.14,  color: BLACK,   text: "Platform 45%", txtColor: WHITE },
    { x: 4.565, w: 2.76,  color: GREEN,   text: "Team 30%",     txtColor: WHITE },
    { x: 7.325, w: 1.38,  color: GRAY_MD, text: "GTM 15%",      txtColor: BLACK },
    { x: 8.714, w: 0.836, color: GRAY_LT, text: "Ops 10%",      txtColor: BLACK },
  ];
  segs.forEach(sg => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: sg.x, y: 1.585, w: sg.w, h: 0.18,
      fill: { color: sg.color }, line: { type: "none" },
    });
    s.addText(sg.text, {
      x: sg.x, y: 1.585, w: sg.w, h: 0.18,
      fontSize: 8, bold: true, fontFace: FONT, color: sg.txtColor,
      align: "center", valign: "middle", margin: 0,
    });
  });

  // Chart 1 panel (revenue)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.924, w: 4.475, h: 3.151,
    fill: { color: PAGE_BG }, line: { type: "none" }, rectRadius: 0.06,
  });
  s.addText("Annual revenue ($M)", {
    x: 0.6, y: 2.024, w: 4.2, h: 0.3,
    fontSize: 11, bold: true, fontFace: FONT, color: BLACK, margin: 0,
  });
  // $85M ARR Y5 callout
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 3.55, y: 2.324, w: 1.25, h: 0.32,
    fill: { color: WHITE }, line: { color: GRAY_LINE, width: 1 }, rectRadius: 0.05,
  });
  s.addText("$85M ARR Y5", {
    x: 3.55, y: 2.324, w: 1.25, h: 0.32,
    fontSize: 10, bold: true, fontFace: FONT, color: BLACK,
    align: "center", valign: "middle", margin: 0,
  });
  // revenue bar chart
  s.addChart(pres.charts.BAR, [{
    name: "Revenue",
    labels: ["Y1", "Y2", "Y3", "Y4", "Y5"],
    values: [1.2, 5.8, 18.5, 42, 85],
  }], {
    x: 0.45, y: 2.8, w: 4.4, h: 2.2,
    barDir: "col",
    chartColors: [BLACK],
    chartArea: { fill: { color: PAGE_BG } },
    plotArea:  { fill: { color: PAGE_BG } },
    showValue: true,
    dataLabelPosition: "outEnd",
    dataLabelFormatCode: "\\$#,##0.0",
    dataLabelColor: BLACK,
    dataLabelFontSize: 9,
    dataLabelFontBold: true,
    catAxisLabelColor: GRAY_DK,
    valAxisLabelColor: GRAY_DK,
    catAxisLabelFontSize: 9,
    valAxisLabelFontSize: 9,
    valGridLine: { style: "none" },
    catGridLine: { style: "none" },
    showLegend: false,
  });

  // Chart 2 panel (gross margin)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 1.924, w: 4.475, h: 3.151,
    fill: { color: PAGE_BG }, line: { type: "none" }, rectRadius: 0.06,
  });
  s.addText("Gross margin (%)", {
    x: 5.3, y: 2.024, w: 4.2, h: 0.3,
    fontSize: 11, bold: true, fontFace: FONT, color: BLACK, margin: 0,
  });
  // 75%+ Y5 callout
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 8.25, y: 2.324, w: 1.05, h: 0.32,
    fill: { color: WHITE }, line: { color: GRAY_LINE, width: 1 }, rectRadius: 0.05,
  });
  s.addText("75%+ Y5", {
    x: 8.25, y: 2.324, w: 1.05, h: 0.32,
    fontSize: 10, bold: true, fontFace: FONT, color: BLACK,
    align: "center", valign: "middle", margin: 0,
  });
  s.addChart(pres.charts.BAR, [{
    name: "GM",
    labels: ["Y1", "Y2", "Y3", "Y4", "Y5"],
    values: [40, 55, 65, 70, 75],
  }], {
    x: 5.15, y: 2.8, w: 4.4, h: 2.2,
    barDir: "col",
    chartColors: [GREEN],
    chartArea: { fill: { color: PAGE_BG } },
    plotArea:  { fill: { color: PAGE_BG } },
    showValue: true,
    dataLabelPosition: "outEnd",
    dataLabelFormatCode: "0\"%\"",
    dataLabelColor: BLACK,
    dataLabelFontSize: 9,
    dataLabelFontBold: true,
    catAxisLabelColor: GRAY_DK,
    valAxisLabelColor: GRAY_DK,
    catAxisLabelFontSize: 9,
    valAxisLabelFontSize: 9,
    valGridLine: { style: "none" },
    catGridLine: { style: "none" },
    showLegend: false,
  });
}

// =====================================================================
// SLIDE 15 — Timeline
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, 15);
  addTitle(s, "Onboard 2-3 partners within 90 days, complete first live deal cycle by Month 9, position for Series B at $1.2M+ ARR run-rate",
    { sz: 19, h: 0.717 });

  // horizontal line
  s.addShape(pres.shapes.LINE, {
    x: 0.51, y: 2.258, w: 9.0, h: 0,
    line: { color: BLACK, width: 1.5 },
  });

  const stages = [
    { x: 0.489, cx: 1.645, label: "M1–3",  title: "Close & Mobilize",
      items: [
        "$25M raise; hire 5-7 core engineers",
        "Onboard 2-3 design partners",
        "Integrate FactSet, Cap IQ, PitchBook; begin SOC 2",
      ]},
    { x: 3.634, cx: 4.947, label: "M3–9",  title: "Build & Prove",
      items: [
        "Deploy MVP on live mandates",
        "Complete end-to-end deal cycle",
        "Iterate accuracy, workflow coverage, UX",
      ]},
    { x: 6.78,  cx: 7.97,  label: "M9–18", title: "Scale & Revenue",
      items: [
        "Expand to 10-12 firms",
        "Launch self-serve onboarding",
        "$1.2M+ ARR run-rate; Series B data package",
      ]},
  ];

  stages.forEach(st => {
    // label above node
    s.addText(st.label, {
      x: st.cx - 0.67, y: 1.88, w: 1.6, h: 0.3,
      fontSize: 11, bold: true, fontFace: FONT, color: GREEN, align: "center", margin: 0,
    });
    // big green node dot
    s.addShape(pres.shapes.OVAL, {
      x: st.cx, y: 2.128, w: 0.26, h: 0.26,
      fill: { color: GREEN }, line: { type: "none" },
    });
    // panel
    const pw = (st === stages[2]) ? 2.73 : (st === stages[1] ? 2.8 : 2.832);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: st.x, y: 2.632, w: pw, h: 2.268,
      fill: { color: PAGE_BG }, line: { type: "none" }, rectRadius: 0.08,
    });
    s.addText(st.title, {
      x: st.x + 0.2, y: 2.732, w: 2.6, h: 0.35,
      fontSize: 16, bold: true, fontFace: FONT_DISP, color: BLACK, margin: 0,
    });
    st.items.forEach((it, i) => {
      const y = 3.15 + i * 0.46;
      bullet(s, st.x + 0.25, y + 0.07, GREEN, 0.07);
      s.addText(it, {
        x: st.x + 0.4, y, w: pw - 0.5, h: 0.5,
        fontSize: 10.5, fontFace: FONT, color: BLACK, margin: 0, valign: "top",
      });
    });
  });
}

// =====================================================================
// SLIDE 16 — Closing dark slide
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: BLACK };
  // green logo
  [[4.68,0.75],[4.98,0.75],[4.68,1.05],[4.98,1.05]].forEach(([x,y]) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.2, h: 0.2, fill: { color: GREEN }, line: { type: "none" },
    });
  });

  s.addText("The future of investment banking", {
    x: 0.4, y: 2.0, w: 9.2, h: 0.6,
    fontSize: 26, fontFace: FONT, color: GRAY_DK, align: "center", margin: 0,
  });
  s.addText("is not more bankers.", {
    x: 0.4, y: 2.55, w: 9.2, h: 0.6,
    fontSize: 26, fontFace: FONT, color: WHITE, align: "center", margin: 0,
  });
  s.addText("It's better technology enabling the best bankers to do more.", {
    x: 0.4, y: 3.1, w: 9.2, h: 1.0,
    fontSize: 22, bold: true, fontFace: FONT, color: GREEN, align: "center", margin: 0,
  });

  s.addText("iBank: the operating system for the AI-native investment bank", {
    x: 0.4, y: 4.4, w: 9.2, h: 0.3,
    fontSize: 12, fontFace: FONT, color: WHITE, align: "center", margin: 0,
  });
  s.addText("info@ibank.ai   ·   Confidential   ·   April 2026", {
    x: 0.4, y: 5.15, w: 9.2, h: 0.22,
    fontSize: 10, fontFace: FONT, color: GRAY_DK, align: "center", margin: 0,
  });
}

pres.writeFile({ fileName: "iBank_Investor_Presentation.pptx" });
