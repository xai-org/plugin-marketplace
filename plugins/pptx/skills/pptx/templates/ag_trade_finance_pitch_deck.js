/**
 * Whale – Cross-Border Agriculture Factoring
 * Series A Pitch Deck  |  2026
 *
 * Usage:
 *   npm install pptxgenjs
 *   node whale_pitch_deck.js
 */

"use strict";

const pptxgen = require("pptxgenjs");

// ─── Palette ─────────────────────────────────────────────────────────────────
const C = {
  navy:      "0D2545",   // primary dark
  teal:      "028090",   // accent
  seafoam:   "00A896",   // highlight
  white:     "FFFFFF",
  offWhite:  "F5F7FA",
  slate:     "64748B",   // muted text
  dark:      "1E293B",   // body text
  light:     "E2E8F0",   // dividers
  tealDark:  "016B77",
};

// ─── Typography ──────────────────────────────────────────────────────────────
const F = {
  head:   "Calibri",
  body:   "Calibri",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const makeShadow = () => ({
  type: "outer", color: "000000", opacity: 0.12, blur: 6, offset: 2, angle: 135,
});

function sectionHeader(slide, text) {
  slide.addText(text, {
    x: 0.45, y: 0.22, w: 9.1, h: 0.38,
    fontFace: F.head, fontSize: 9, bold: true, color: C.teal,
    charSpacing: 3, align: "left", margin: 0,
  });
}

function slideTitle(slide, title, subtitle = null) {
  slide.addText(title, {
    x: 0.45, y: 0.62, w: 9.1, h: 0.52,
    fontFace: F.head, fontSize: 22, bold: true, color: C.navy,
    align: "left", margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.45, y: 1.18, w: 9.1, h: 0.45,
      fontFace: F.body, fontSize: 12, color: C.slate,
      align: "left", margin: 0,
    });
  }
  // thin divider under title
  slide.addShape("rect", {
    x: 0.45, y: 1.2 + (subtitle ? 0.42 : -0.1), w: 9.1, h: 0.025,
    fill: { color: C.light }, line: { color: C.light, width: 0 },
  });
}

function statCard(slide, x, y, w, h, label, value, sub = null) {
  slide.addShape("rect", {
    x, y, w, h,
    fill: { color: C.white },
    line: { color: C.light, width: 1 },
    shadow: makeShadow(),
  });
  // teal left bar
  slide.addShape("rect", {
    x, y, w: 0.06, h,
    fill: { color: C.teal }, line: { color: C.teal, width: 0 },
  });
  slide.addText(value, {
    x: x + 0.15, y: y + 0.1, w: w - 0.2, h: h * 0.5,
    fontFace: F.head, fontSize: 22, bold: true, color: C.navy,
    align: "left", valign: "middle", margin: 0,
  });
  slide.addText(label, {
    x: x + 0.15, y: y + h * 0.5 + 0.02, w: w - 0.2, h: h * 0.3,
    fontFace: F.body, fontSize: 9, color: C.slate,
    align: "left", margin: 0,
  });
  if (sub) {
    slide.addText(sub, {
      x: x + 0.15, y: y + h * 0.76, w: w - 0.2, h: h * 0.2,
      fontFace: F.body, fontSize: 8, bold: true, color: C.seafoam,
      align: "left", margin: 0,
    });
  }
}

function sectionBlock(slide, x, y, w, h, title, bullets, bgColor = C.offWhite) {
  slide.addShape("rect", {
    x, y, w, h,
    fill: { color: bgColor },
    line: { color: C.light, width: 1 },
  });
  slide.addText(title, {
    x: x + 0.15, y: y + 0.1, w: w - 0.2, h: 0.3,
    fontFace: F.head, fontSize: 10, bold: true, color: C.teal,
    align: "left", margin: 0,
  });
  slide.addText(bullets.map((b, i) => ({
    text: b,
    options: { bullet: true, breakLine: i < bullets.length - 1, fontSize: 9, color: C.dark },
  })), {
    x: x + 0.15, y: y + 0.42, w: w - 0.25, h: h - 0.55,
    fontFace: F.body, align: "left", margin: 0,
  });
}

// ─── Presentation Setup ──────────────────────────────────────────────────────
const pres = new pptxgen();
pres.layout  = "LAYOUT_16x9";
pres.author  = "Whale Capital";
pres.title   = "Whale – Series A Pitch Deck 2026";
pres.subject = "Cross-Border Agriculture Factoring";

// ─── SLIDE 1 · Cover ─────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  // teal accent strip (left)
  s.addShape("rect", {
    x: 0, y: 0, w: 0.18, h: 5.625,
    fill: { color: C.teal }, line: { color: C.teal, width: 0 },
  });

  s.addText("WHALE", {
    x: 0.55, y: 1.3, w: 8, h: 1,
    fontFace: F.head, fontSize: 72, bold: true, color: C.white,
    charSpacing: 8, align: "left", margin: 0,
  });

  s.addText("Cross-Border Agriculture Factoring", {
    x: 0.55, y: 2.4, w: 8, h: 0.55,
    fontFace: F.body, fontSize: 20, color: C.seafoam,
    align: "left", margin: 0,
  });

  s.addText("$25M Series A to capture the $45B cross-border\nag factoring market with AI-driven underwriting.", {
    x: 0.55, y: 3.05, w: 7, h: 0.8,
    fontFace: F.body, fontSize: 13, color: C.light,
    align: "left", margin: 0,
  });

  s.addText("Series A  |  Confidential  |  2026", {
    x: 0.55, y: 4.85, w: 6, h: 0.4,
    fontFace: F.body, fontSize: 9, color: C.slate,
    align: "left", margin: 0,
  });

  s.addText("1 / 12", {
    x: 8.8, y: 5.1, w: 0.9, h: 0.25,
    fontFace: F.body, fontSize: 8, color: C.slate,
    align: "right", margin: 0,
  });
}

// ─── SLIDE 2 · Executive Summary ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  sectionHeader(s, "EXECUTIVE SUMMARY");
  slideTitle(s,
    "Whale has grown 4x to $4.8M revenue by solving the $1.7T ag trade finance gap with 48-hour non-recourse factoring",
    null
  );

  // Three columns
  const cols = [
    {
      x: 0.45, label: "THE OPPORTUNITY",
      items: [
        "$1.7T global trade finance gap with 60–120 day payment cycles",
        "Banks reject ~80% of cross-border ag applications post-Basel III",
        "General factoring lacks commodity and emerging market expertise",
      ],
    },
    {
      x: 3.75, label: "OUR SOLUTION",
      items: [
        "Non-recourse factoring; exporters paid within 48 hours",
        "AI risk engine trained on 10+ years of ag trade data",
        "<1.2% default rate across 40+ countries, 94% approval",
      ],
    },
    {
      x: 7.05, label: "TRACTION & ASK",
      items: [
        "2025 Revenue: $4.8M (4x YoY)",
        "GMV Processed: $142M  |  85+ clients",
        "Blended Yield: 18%  |  NRR: 145%",
        "Series A Raise: $25M to scale 5x",
      ],
    },
  ];

  cols.forEach(col => {
    sectionBlock(s, col.x, 1.7, 3.1, 2.55, col.label, col.items);
  });

  // Stat strip
  const stats = [
    { v: "$4.8M",  l: "2025 Revenue",          sub: "4x YoY"    },
    { v: "$142M",  l: "GMV Processed",          sub: "85+ clients" },
    { v: "18%",    l: "Blended Yield",          sub: "<1.2% default" },
    { v: "145%",   l: "Net Revenue Retention",  sub: "8.5x LTV/CAC" },
    { v: "$25M",   l: "Series A Raise",         sub: "Scale 5x"  },
  ];

  stats.forEach((st, i) => {
    statCard(s, 0.45 + i * 1.88, 4.35, 1.74, 0.92, st.l, st.v, st.sub);
  });

  s.addText("Team:  Trade finance (Citi/IFC) + payments (Stripe) + commodities risk (Goldman) + ag logistics (Bunge/Cargill)", {
    x: 0.45, y: 5.32, w: 9.1, h: 0.22,
    fontFace: F.body, fontSize: 8, italic: true, color: C.slate,
    align: "left", margin: 0,
  });
}

// ─── SLIDE 3 · The Problem ────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  sectionHeader(s, "THE PROBLEM");
  slideTitle(s,
    "Ag exporters lose 60–120 days of working capital per shipment because banks won't underwrite cross-border commodity risk"
  );

  const problems = [
    {
      stat: "60–120 Day DSO",
      items: [
        "Importers wait months for payment",
        "~$380B trapped in working capital globally",
        "Exporters forced to turn down new orders",
      ],
    },
    {
      stat: "~80% Bank Rejection",
      items: [
        "Banks cite country risk and commodity volatility",
        "KYC complexity deters cross-border lending",
        "SMEs hit hardest by rejection rates",
      ],
    },
    {
      stat: "$1.7T Finance Gap",
      items: [
        "Emerging market exporters lack affordable finance",
        "Gap growing 4% annually",
        "SMEs disproportionately affected",
      ],
    },
  ];

  problems.forEach((p, i) => {
    const x = 0.45 + i * 3.12;
    // header card
    s.addShape("rect", {
      x, y: 1.65, w: 2.95, h: 0.6,
      fill: { color: C.navy }, line: { color: C.navy, width: 0 },
    });
    s.addText(p.stat, {
      x: x + 0.12, y: 1.65, w: 2.7, h: 0.6,
      fontFace: F.head, fontSize: 14, bold: true, color: C.white,
      valign: "middle", align: "left", margin: 0,
    });
    sectionBlock(s, x, 2.28, 2.95, 2.8, "", p.items);
  });

  s.addText(
    "Source:  ADB Trade Finance Gap Report, 2024; ICC Global Trade Survey, 2024; Bain/IFC SME Finance Report",
    { x: 0.45, y: 5.3, w: 9.1, h: 0.2, fontFace: F.body, fontSize: 7.5, color: C.slate, italic: true, align: "left", margin: 0 }
  );
}

// ─── SLIDE 4 · Our Solution ───────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  sectionHeader(s, "OUR SOLUTION");
  slideTitle(s,
    "Whale purchases receivables at a discount and pays exporters within 48 hours using AI-driven, ag-specific underwriting"
  );

  // Process steps
  const steps = [
    { n: "01", title: "Submit Invoice",   body: "Exporter uploads invoice & shipping docs via OCR",  badge: "< 5 min"      },
    { n: "02", title: "AI Risk Scoring",  body: "Ag-commodity risk engine scores in real time",       badge: "94% approval" },
    { n: "03", title: "Get Paid in 48h",  body: "Non-recourse funds sent to exporter's account",      badge: "$85K avg"     },
  ];

  steps.forEach((st, i) => {
    const x = 0.45 + i * 3.12;
    s.addShape("rect", { x, y: 1.65, w: 2.95, h: 2.55, fill: { color: C.offWhite }, line: { color: C.light, width: 1 } });
    s.addShape("rect", { x, y: 1.65, w: 2.95, h: 0.06, fill: { color: C.teal }, line: { color: C.teal, width: 0 } });
    s.addText(st.n, { x: x + 0.15, y: 1.72, w: 0.55, h: 0.45, fontFace: F.head, fontSize: 26, bold: true, color: C.teal, margin: 0 });
    s.addText(st.title, { x: x + 0.15, y: 2.2, w: 2.65, h: 0.36, fontFace: F.head, fontSize: 12, bold: true, color: C.navy, margin: 0 });
    s.addText(st.body,  { x: x + 0.15, y: 2.6, w: 2.65, h: 0.7,  fontFace: F.body, fontSize: 10, color: C.dark, margin: 0 });
    // badge
    s.addShape("rect", { x: x + 0.15, y: 3.42, w: 1.5, h: 0.3, fill: { color: C.seafoam }, line: { color: C.seafoam, width: 0 } });
    s.addText(st.badge, { x: x + 0.15, y: 3.42, w: 1.5, h: 0.3, fontFace: F.body, fontSize: 9, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
  });

  // Footer callouts
  const callouts = [
    "Non-recourse — no debt on exporter's balance sheet",
    "Coverage in 40+ countries across LatAm, Africa, and ASEAN",
    "Proprietary risk models trained on 10+ years of ag trade data",
  ];
  s.addText(callouts.map((c, i) => ({
    text: c,
    options: { bullet: true, breakLine: i < callouts.length - 1, fontSize: 9.5, color: C.dark },
  })), { x: 0.45, y: 4.5, w: 9.1, h: 0.9, fontFace: F.body, align: "left", margin: 0 });
}

// ─── SLIDE 5 · Why Now ────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  sectionHeader(s, "WHY NOW");
  slideTitle(s,
    "Four macro tailwinds — supply chain shifts, digital trade docs, bank retreat, and food security mandates — are creating a $45B window"
  );

  const tailwinds = [
    { title: "Supply Chain Reshoring",    stat: "+15%",   sub: "new ag corridors since 2020",    body: "Geopolitical nearshoring is reshaping agricultural trade corridors, creating new financing needs in underserved routes." },
    { title: "Digital Trade Documents",   stat: "+340%",  sub: "eBL adoption since 2022",         body: "Electronic bills of lading and ePhyto certificates are reaching critical mass, enabling real-time verification and underwriting." },
    { title: "Bank Retreat from Trade",   stat: "–22%",   sub: "bank trade finance 2019–24",      body: "Basel III/IV capital requirements have pushed banks further from cross-border SME trade finance, widening the gap." },
    { title: "Food Security Mandates",    stat: "$50B+",  sub: "G7 commitments since 2022",       body: "Governments and multilateral institutions are prioritizing food security, creating policy tailwinds for ag trade enablers." },
  ];

  tailwinds.forEach((tw, i) => {
    const x = 0.45 + i * 2.35;
    s.addShape("rect", { x, y: 1.65, w: 2.2, h: 3.0, fill: { color: C.offWhite }, line: { color: C.light, width: 1 } });
    s.addShape("rect", { x, y: 1.65, w: 2.2, h: 0.06, fill: { color: C.teal }, line: { color: C.teal, width: 0 } });
    s.addText(tw.stat, {
      x: x + 0.12, y: 1.75, w: 1.96, h: 0.55,
      fontFace: F.head, fontSize: 26, bold: true, color: C.teal, margin: 0,
    });
    s.addText(tw.sub, {
      x: x + 0.12, y: 2.32, w: 1.96, h: 0.3,
      fontFace: F.body, fontSize: 8, italic: true, color: C.slate, margin: 0,
    });
    s.addShape("rect", { x: x + 0.12, y: 2.65, w: 1.96, h: 0.022, fill: { color: C.light }, line: { color: C.light, width: 0 } });
    s.addText(tw.title, {
      x: x + 0.12, y: 2.72, w: 1.96, h: 0.36,
      fontFace: F.head, fontSize: 10, bold: true, color: C.navy, margin: 0,
    });
    s.addText(tw.body, {
      x: x + 0.12, y: 3.1, w: 1.96, h: 1.42,
      fontFace: F.body, fontSize: 8.5, color: C.dark, margin: 0,
    });
  });

  s.addText(
    "Sources:  DCSA eBL tracker; BIS Basel III; G7 Elmau/Hiroshima; WTO/UNCTAD",
    { x: 0.45, y: 5.3, w: 9.1, h: 0.2, fontFace: F.body, fontSize: 7.5, color: C.slate, italic: true, align: "left", margin: 0 }
  );
}

// ─── SLIDE 6 · Market Opportunity ────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  sectionHeader(s, "MARKET OPPORTUNITY");
  slideTitle(s,
    "Whale targets a $2.5B addressable market within a $45B cross-border ag factoring segment growing at ~12% CAGR"
  );

  // Concentric bar visualization (simplified as layered shapes)
  const bars = [
    { label: "TAM", value: "$350B", cagr: "~8% CAGR",  w: 5.5,  color: C.navy,    desc: "Total global agricultural trade finance market, including receivables, pre-export, and structured trade finance." },
    { label: "SAM", value: "$45B",  cagr: "~12% CAGR", w: 3.5,  color: C.teal,    desc: "Cross-border agriculture factoring in target corridors: Latin America, Sub-Saharan Africa, and Southeast Asia." },
    { label: "SOM", value: "$2.5B", cagr: "5-year target", w: 2.0, color: C.seafoam, desc: "Addressable within 5 years focusing on soft commodities (cocoa, coffee, grains) in top 15 corridors." },
  ];

  bars.forEach((bar, i) => {
    const y = 1.7 + i * 0.95;
    s.addShape("rect", { x: 0.45, y, w: bar.w, h: 0.7, fill: { color: bar.color }, line: { color: bar.color, width: 0 } });
    s.addText(`${bar.label}  ${bar.value}`, {
      x: 0.6, y, w: bar.w - 0.2, h: 0.7,
      fontFace: F.head, fontSize: 14, bold: true, color: C.white,
      valign: "middle", align: "left", margin: 0,
    });
    s.addText(bar.cagr, {
      x: 0.45 + bar.w + 0.15, y: y + 0.05, w: 1.5, h: 0.3,
      fontFace: F.body, fontSize: 9, bold: true, color: bar.color, margin: 0,
    });
    s.addText(bar.desc, {
      x: 0.45 + bar.w + 0.15, y: y + 0.32, w: 9.1 - bar.w - 0.25, h: 0.38,
      fontFace: F.body, fontSize: 8.5, color: C.dark, margin: 0,
    });
  });

  s.addText(
    "Sources:  ADB Trade Finance Gap Report 2024; Mordor Intelligence 2024; internal corridor analysis",
    { x: 0.45, y: 5.3, w: 9.1, h: 0.2, fontFace: F.body, fontSize: 7.5, color: C.slate, italic: true, align: "left", margin: 0 }
  );
}

// ─── SLIDE 7 · Competitive Landscape ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  sectionHeader(s, "COMPETITIVE LANDSCAPE");
  slideTitle(s,
    "Whale is the only platform combining all six capabilities needed for cross-border ag factoring; competitors cover at most two"
  );

  // Comparison table
  const headers = ["", "Whale", "Traditional Banks", "General Factoring", "Fintech Lenders"];
  const rows = [
    ["Ag-specific underwriting",   "✓", "—",           "—",        "—"       ],
    ["Cross-border focus",         "✓", "US/EU only",  "—",        "US/EU only"],
    ["48-hour funding",            "✓", "—",           "5–14 days","—"       ],
    ["Non-recourse",               "✓", "—",           "Partial",  "—"       ],
    ["Emerging market coverage",   "✓", "Select mkts", "—",        "—"       ],
    ["AI risk engine",             "✓", "—",           "—",        "Generic ML"],
  ];

  const colW = [3.0, 1.4, 1.7, 1.7, 1.7];
  const tableData = [
    headers.map((h, i) => ({
      text: h,
      options: {
        fill: { color: i === 0 ? C.white : i === 1 ? C.navy : C.offWhite },
        color: i === 1 ? C.white : C.navy,
        bold: true, fontSize: 9, align: "center",
      },
    })),
    ...rows.map(row => row.map((cell, i) => ({
      text: cell,
      options: {
        fill: { color: i === 1 ? "E6F7F9" : C.white },
        color: (i === 1 && cell === "✓") ? C.teal : cell === "—" ? C.slate : C.dark,
        bold: (i === 1 && cell === "✓"),
        fontSize: 9.5, align: "center",
      },
    }))),
  ];

  s.addTable(tableData, {
    x: 0.45, y: 1.65, w: 9.1, h: 2.8,
    colW,
    border: { pt: 0.5, color: C.light },
    rowH: 0.38,
  });

  // Moat box
  s.addShape("rect", { x: 0.45, y: 4.55, w: 9.1, h: 0.85, fill: { color: C.offWhite }, line: { color: C.light, width: 1 } });
  s.addShape("rect", { x: 0.45, y: 4.55, w: 0.07, h: 0.85, fill: { color: C.teal }, line: { color: C.teal, width: 0 } });
  s.addText("OUR MOAT", { x: 0.62, y: 4.58, w: 1.5, h: 0.25, fontFace: F.head, fontSize: 8.5, bold: true, color: C.teal, margin: 0 });
  s.addText([
    { text: "10+ years proprietary ag-commodity risk data", options: { bullet: true, breakLine: true, fontSize: 9 } },
    { text: "Models cover 40 countries and 15+ commodity types", options: { bullet: true, breakLine: true, fontSize: 9 } },
    { text: "No competitor has both data depth and operational expertise", options: { bullet: true, fontSize: 9 } },
  ], { x: 0.62, y: 4.84, w: 8.8, h: 0.5, fontFace: F.body, color: C.dark, margin: 0 });
}

// ─── SLIDE 8 · Product Overview ───────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  sectionHeader(s, "PRODUCT OVERVIEW");
  slideTitle(s,
    "Whale's platform automates the full factoring workflow, from invoice OCR to AI risk scoring to multi-currency settlement"
  );

  const features = [
    { title: "Invoice Upload",      body: "Drag-and-drop invoices with automated data extraction via OCR." },
    { title: "Risk Engine",         body: "AI-powered scoring blending trade, country & commodity risk factors." },
    { title: "Instant Pricing",     body: "Real-time discount rates based on risk profile and invoice tenor." },
    { title: "FX Management",       body: "Built-in multi-currency settlement across 25+ currencies." },
    { title: "Portfolio Dashboard", body: "Track funded invoices, payments, and exposure in real time." },
    { title: "Compliance Suite",    body: "Automated KYC/AML, sanctions screening, and full audit trail." },
  ];

  features.forEach((f, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.45 + col * 3.12;
    const y = 1.65 + row * 1.5;
    s.addShape("rect", { x, y, w: 2.97, h: 1.35, fill: { color: C.offWhite }, line: { color: C.light, width: 1 } });
    s.addShape("rect", { x, y, w: 2.97, h: 0.06, fill: { color: C.teal }, line: { color: C.teal, width: 0 } });
    s.addText(f.title, { x: x + 0.15, y: y + 0.12, w: 2.67, h: 0.3,  fontFace: F.head, fontSize: 10.5, bold: true, color: C.navy, margin: 0 });
    s.addText(f.body,  { x: x + 0.15, y: y + 0.46, w: 2.67, h: 0.8,  fontFace: F.body, fontSize: 9, color: C.dark, margin: 0 });
  });

  s.addText(
    "Integrations:  SAP  •  Oracle  •  QuickBooks  •  Customs APIs  •  AIS Ship Tracking  |  12,000+ invoices processed",
    { x: 0.45, y: 5.28, w: 9.1, h: 0.25, fontFace: F.body, fontSize: 8.5, color: C.slate, italic: true, align: "center", margin: 0 }
  );
}

// ─── SLIDE 9 · Business Model ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  sectionHeader(s, "BUSINESS MODEL");
  slideTitle(s,
    "Three-layer revenue model delivers 18% blended annualized yield at <1.2% default rate with 8.5x LTV/CAC"
  );

  const streams = [
    { pct: "2–5%",     label: "Factoring Discount",  desc: "Discount on face value of purchased receivables, varying by risk and tenor." },
    { pct: "0.5–1%",   label: "Service Fee",          desc: "Flat processing fee per transaction covering onboarding, verification, and settlement." },
    { pct: "0.3–0.8%", label: "FX Spread",            desc: "Embedded spread on cross-currency settlements, transparent to clients." },
  ];

  streams.forEach((st, i) => {
    const x = 0.45 + i * 3.12;
    s.addShape("rect", { x, y: 1.65, w: 2.95, h: 1.7, fill: { color: C.offWhite }, line: { color: C.light, width: 1 } });
    s.addShape("rect", { x, y: 1.65, w: 2.95, h: 0.06, fill: { color: C.teal }, line: { color: C.teal, width: 0 } });
    s.addText(st.pct, { x: x + 0.15, y: 1.75, w: 2.65, h: 0.5, fontFace: F.head, fontSize: 22, bold: true, color: C.navy, margin: 0 });
    s.addText("margin", { x: x + 0.15, y: 2.27, w: 2.65, h: 0.22, fontFace: F.body, fontSize: 8, color: C.slate, margin: 0 });
    s.addText(st.label, { x: x + 0.15, y: 2.5, w: 2.65, h: 0.28, fontFace: F.head, fontSize: 10.5, bold: true, color: C.navy, margin: 0 });
    s.addText(st.desc,  { x: x + 0.15, y: 2.82, w: 2.65, h: 0.5, fontFace: F.body, fontSize: 9, color: C.dark, margin: 0 });
  });

  s.addText("Blended take rate: ~3.5% per transaction", {
    x: 0.45, y: 3.45, w: 9.1, h: 0.32,
    fontFace: F.head, fontSize: 11, bold: true, color: C.teal,
    align: "center", margin: 0,
  });

  // Unit economics
  s.addText("UNIT ECONOMICS", {
    x: 0.45, y: 3.85, w: 9.1, h: 0.3,
    fontFace: F.head, fontSize: 9, bold: true, color: C.teal, charSpacing: 2, margin: 0,
  });

  const econ = [
    { v: "$85K",   l: "Avg Invoice Size"   },
    { v: "72 days",l: "Avg Tenor"          },
    { v: "18%",    l: "Blended Ann. Yield" },
    { v: "<1.2%",  l: "Default Rate"       },
    { v: "8.5x",   l: "LTV / CAC"          },
  ];

  econ.forEach((e, i) => {
    statCard(s, 0.45 + i * 1.88, 4.2, 1.74, 1.0, e.l, e.v);
  });
}

// ─── SLIDE 10 · The Team ──────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  sectionHeader(s, "THE TEAM");
  slideTitle(s,
    "Founding team combines 40+ years across trade finance (Citi/IFC), payments (Stripe), risk (Goldman), and ag logistics (Bunge/Cargill)"
  );

  const team = [
    { name: "Maria Rodriguez", role: "CEO & Co-Founder",   bio: "15+ yrs in trade finance at Citi & IFC. Led $2B+ in structured ag deals across LatAm." },
    { name: "James Chen",      role: "CTO & Co-Founder",   bio: "Former VP Eng at Stripe. Built real-time payment infra serving 50M+ txns/year." },
    { name: "Amara Osei",      role: "Chief Risk Officer", bio: "Ex-Goldman commodities risk. PhD Agricultural Economics, Cornell." },
    { name: "Kofi Patel",      role: "Head of Operations", bio: "10 yrs at Bunge & Cargill managing cross-border grain & oilseed logistics." },
  ];

  team.forEach((m, i) => {
    const x = 0.45 + i * 2.35;
    s.addShape("rect", { x, y: 1.65, w: 2.2, h: 2.8, fill: { color: C.offWhite }, line: { color: C.light, width: 1 } });
    s.addShape("rect", { x, y: 1.65, w: 2.2, h: 0.06, fill: { color: C.teal }, line: { color: C.teal, width: 0 } });
    // avatar placeholder circle
    s.addShape("oval", {
      x: x + 0.7, y: 1.78, w: 0.8, h: 0.8,
      fill: { color: C.navy }, line: { color: C.white, width: 2 },
    });
    s.addText(m.name.split(" ").map(n => n[0]).join(""), {
      x: x + 0.7, y: 1.78, w: 0.8, h: 0.8,
      fontFace: F.head, fontSize: 18, bold: true, color: C.white,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(m.name, { x: x + 0.12, y: 2.65, w: 1.96, h: 0.32, fontFace: F.head, fontSize: 10.5, bold: true, color: C.navy, align: "center", margin: 0 });
    s.addText(m.role, { x: x + 0.12, y: 2.98, w: 1.96, h: 0.28, fontFace: F.body, fontSize: 8.5, color: C.teal, align: "center", margin: 0 });
    s.addText(m.bio,  { x: x + 0.12, y: 3.3,  w: 1.96, h: 1.0,  fontFace: F.body, fontSize: 8.5, color: C.dark, align: "left", margin: 0 });
  });

  s.addShape("rect", { x: 0.45, y: 4.55, w: 9.1, h: 0.7, fill: { color: C.offWhite }, line: { color: C.light, width: 1 } });
  s.addShape("rect", { x: 0.45, y: 4.55, w: 0.07, h: 0.7, fill: { color: C.teal }, line: { color: C.teal, width: 0 } });
  s.addText("Advisory Board:", { x: 0.62, y: 4.58, w: 1.4, h: 0.28, fontFace: F.head, fontSize: 8.5, bold: true, color: C.teal, margin: 0 });
  s.addText("Former USDA Under Secretary  •  Ex-Rabobank Global Head of Trade  •  WTO Ag Committee Chair", {
    x: 0.62, y: 4.86, w: 8.8, h: 0.3, fontFace: F.body, fontSize: 9, color: C.dark, margin: 0,
  });
}

// ─── SLIDE 11 · Financials ────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  sectionHeader(s, "FINANCIALS");
  slideTitle(s,
    "Revenue grew 4x YoY to $4.8M in 2025 with 145% NRR; projecting $52M by 2028 via corridor expansion and NRR compounding"
  );

  // Revenue bar chart
  s.addChart(pres.charts.BAR, [
    {
      name: "Revenue ($M)",
      labels: ["2022", "2023", "2024", "2025", "2026E", "2027E", "2028E"],
      values: [0.3, 0.6, 1.2, 4.8, 10.8, 24.3, 52.0],
    },
  ], {
    x: 0.45, y: 1.7, w: 5.8, h: 3.2,
    barDir: "col",
    chartColors: [C.teal],
    chartArea: { fill: { color: C.white }, roundedCorners: false },
    catAxisLabelColor: C.slate,
    valAxisLabelColor: C.slate,
    valGridLine: { color: C.light, size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true,
    dataLabelColor: C.navy,
    dataLabelFontSize: 8,
    showLegend: false,
    showTitle: false,
  });

  // Growth annotations
  const growthLabels = [{ y: 1.75, t: "4x YoY"   }, { y: 2.4, t: "+160%" }, { y: 3.05, t: "+124%" }, { y: 3.7, t: "+86%" }];
  growthLabels.forEach((gl, i) => {
    s.addText(gl.t, {
      x: 3.9 + i * 0.62, y: gl.y, w: 0.7, h: 0.22,
      fontFace: F.body, fontSize: 7.5, bold: true, color: C.seafoam, align: "center", margin: 0,
    });
  });

  s.addText("2024–2028E CAGR: 113%", {
    x: 0.5, y: 4.97, w: 5.5, h: 0.22,
    fontFace: F.head, fontSize: 9, bold: true, color: C.teal, align: "center", margin: 0,
  });

  // Key metrics table
  s.addText("KEY METRICS (2025)", {
    x: 6.55, y: 1.72, w: 3.1, h: 0.28,
    fontFace: F.head, fontSize: 8.5, bold: true, color: C.teal, charSpacing: 2, margin: 0,
  });

  const metrics = [
    { l: "GMV Processed",       v: "$142M"  },
    { l: "Revenue",             v: "$4.8M"  },
    { l: "Gross Margin",        v: "72%"    },
    { l: "Active Clients",      v: "85+"    },
    { l: "Net Revenue Retention", v: "145%" },
    { l: "Avg Revenue / Client", v: "$56K"  },
  ];

  metrics.forEach((m, i) => {
    const y = 2.08 + i * 0.47;
    s.addShape("rect", { x: 6.55, y, w: 3.1, h: 0.42, fill: { color: i % 2 === 0 ? C.offWhite : C.white }, line: { color: C.light, width: 0.5 } });
    s.addText(m.l, { x: 6.7, y, w: 1.9, h: 0.42, fontFace: F.body, fontSize: 9, color: C.slate, valign: "middle", margin: 0 });
    s.addText(m.v, { x: 8.65, y, w: 0.9, h: 0.42, fontFace: F.head, fontSize: 11, bold: true, color: C.navy, align: "right", valign: "middle", margin: 0 });
  });
}

// ─── SLIDE 12 · The Ask ───────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  sectionHeader(s, "THE ASK");
  s.addText("THE ASK", { x: 0.45, y: 0.22, w: 9.1, h: 0.38, fontFace: F.head, fontSize: 9, bold: true, color: C.seafoam, charSpacing: 3, align: "left", margin: 0 });

  s.addText("Raising $25M to scale origination 5x, expand into 3 new corridors,\nand build a $100M+ credit facility by 2028", {
    x: 0.45, y: 0.65, w: 9.1, h: 0.9,
    fontFace: F.head, fontSize: 16, bold: true, color: C.white,
    align: "left", margin: 0,
  });

  s.addText("USE OF FUNDS", {
    x: 0.45, y: 1.65, w: 4.5, h: 0.3,
    fontFace: F.head, fontSize: 8.5, bold: true, color: C.seafoam, charSpacing: 2, margin: 0,
  });

  const uses = [
    { label: "Credit Facility",          desc: "Scale factoring book to $100M+ capacity",        pct: "40%",  amt: "$10M",    w: 3.64 },
    { label: "Engineering & Product",    desc: "AI risk engine v2 & platform scaling",            pct: "25%",  amt: "$6.25M",  w: 2.28 },
    { label: "Market Expansion",         desc: "New corridors: East Africa, ASEAN, South Asia",   pct: "20%",  amt: "$5M",     w: 1.82 },
    { label: "Team & Ops",               desc: "Hire 20+ across risk, sales, compliance",         pct: "15%",  amt: "$3.75M",  w: 1.37 },
  ];

  let xOff = 0.45;
  const barColors = [C.teal, C.seafoam, "028090", "00C9B0"];
  uses.forEach((u, i) => {
    s.addShape("rect", { x: xOff, y: 2.0, w: u.w, h: 0.5, fill: { color: barColors[i] }, line: { color: barColors[i], width: 0 } });
    s.addText(`${u.pct}  ${u.amt}`, {
      x: xOff + 0.1, y: 2.0, w: u.w - 0.12, h: 0.5,
      fontFace: F.head, fontSize: 10, bold: true, color: C.white,
      valign: "middle", align: "left", margin: 0,
    });
    s.addText(u.label, { x: xOff, y: 2.56, w: u.w,     h: 0.28, fontFace: F.head, fontSize: 8.5, bold: true, color: C.white, margin: 0 });
    s.addText(u.desc,  { x: xOff, y: 2.86, w: u.w + 0.1, h: 0.45, fontFace: F.body, fontSize: 7.5, color: C.light, margin: 0 });
    xOff += u.w + 0.06;
  });

  // Milestones
  s.addShape("rect", { x: 0.45, y: 3.45, w: 9.1, h: 0.8, fill: { color: "0A1F38" }, line: { color: "0A1F38", width: 0 } });
  s.addText("KEY MILESTONES BY 2028", { x: 0.65, y: 3.5, w: 3, h: 0.28, fontFace: F.head, fontSize: 8.5, bold: true, color: C.seafoam, charSpacing: 2, margin: 0 });
  s.addText("$500M+ GMV  •  $52M revenue  •  200+ clients", {
    x: 0.65, y: 3.8, w: 8.7, h: 0.35,
    fontFace: F.head, fontSize: 13, bold: true, color: C.white,
    align: "left", margin: 0,
  });

  // Contact
  s.addText("maria@whalecapital.com  |  whalecapital.com  |  Confidential — Do Not Distribute", {
    x: 0.45, y: 5.28, w: 9.1, h: 0.22,
    fontFace: F.body, fontSize: 8, color: C.slate,
    align: "center", margin: 0,
  });

  s.addText("12 / 12", {
    x: 8.8, y: 5.28, w: 0.85, h: 0.22,
    fontFace: F.body, fontSize: 8, color: C.slate,
    align: "right", margin: 0,
  });
}

// ─── Write ────────────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "whale_pitch_deck.pptx" })
  .then(() => console.log("✅  whale_pitch_deck.pptx written successfully."))
  .catch(err => { console.error("❌  Error writing file:", err); process.exit(1); });
