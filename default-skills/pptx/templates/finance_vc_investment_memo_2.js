// AlienTech Labs · IC Memo · Asterion Ventures
// Standalone pptxgenjs script — produces a faithful replica of the source deck.
// Run:   npm install pptxgenjs && node generate.js

const pptxgen = require("pptxgenjs");

// ---------- Setup: custom 20 x 11.25 inch layout ----------
const pres = new pptxgen();
pres.author = "M. Halberd · Asterion Ventures";
pres.title = "AlienTech Labs · IC Memo";
pres.defineLayout({ name: "AV_CUSTOM", width: 20, height: 11.25 });
pres.layout = "AV_CUSTOM";

// ---------- Color palette ----------
const C = {
  bgLight: "F5F2EC",
  bgDark: "2A2620",
  ink: "1A1A1A",
  inkSoft: "3A3631",
  muted: "6B6357",
  rule: "C8BFAE",
  ruleSoft: "E2DCCF",
  cream: "ECE8DF",
  gold: "8A6A3A",
  red: "8A3A3A",
  green: "4A6B3A",
};

// ---------- Fonts ----------
const F = {
  serif: "Georgia",
  mono: "Consolas",
  sans: "Aptos",
};

// ---------- Slide dimensions ----------
const W = 20;
const H = 11.25;
const M = 0.85;

// ---------- Reusable: header + footer ----------
function addHeaderFooter(slide, slideNum, sectionLabel, dark = false) {
  const fg = dark ? C.cream : C.ink;
  const fgSoft = dark ? "ECE8DF" : C.muted;
  const ruleColor = dark ? "4A4640" : C.rule;

  slide.addShape(pres.shapes.LINE, {
    x: M, y: 1.02, w: W - 2 * M, h: 0,
    line: { color: ruleColor, width: 0.5 },
  });

  slide.addText("ASTERION VENTURES", {
    x: M, y: 0.4, w: 3.6, h: 0.5,
    fontFace: F.mono, fontSize: 15, bold: true, color: fg,
    charSpacing: 4, margin: 0, valign: "middle",
  });

  slide.addText(sectionLabel, {
    x: M + 3.8, y: 0.4, w: 10, h: 0.5,
    fontFace: F.mono, fontSize: 15, color: fgSoft,
    charSpacing: 2, margin: 0, valign: "middle",
  });

  slide.addText("CONFIDENTIAL", {
    x: W - M - 3.5, y: 0.4, w: 3.5, h: 0.5,
    fontFace: F.mono, fontSize: 15, color: fgSoft,
    charSpacing: 2, margin: 0, valign: "middle", align: "right",
  });

  slide.addShape(pres.shapes.LINE, {
    x: M, y: H - 0.65, w: W - 2 * M, h: 0,
    line: { color: ruleColor, width: 0.5 },
  });

  slide.addText("ALIENTECH LABS · IC MEMO", {
    x: M, y: H - 0.5, w: 5, h: 0.35,
    fontFace: F.mono, fontSize: 13, color: fgSoft,
    charSpacing: 2, margin: 0, valign: "middle",
  });

  slide.addText("CONFIDENTIAL — INTERNAL USE ONLY", {
    x: W / 2 - 3.5, y: H - 0.5, w: 7, h: 0.35,
    fontFace: F.mono, fontSize: 13, color: C.gold,
    charSpacing: 3, margin: 0, valign: "middle", align: "center",
  });

  slide.addText(`${String(slideNum).padStart(2, "0")} / 12`, {
    x: W - M - 2, y: H - 0.5, w: 2, h: 0.35,
    fontFace: F.mono, fontSize: 13, color: fgSoft,
    charSpacing: 2, margin: 0, valign: "middle", align: "right",
  });
}

// ---------- Reusable: eyebrow + title block ----------
function addTitleBlock(slide, eyebrow, title, dark = false) {
  slide.addText(eyebrow, {
    x: M, y: 1.4, w: 14, h: 0.5,
    fontFace: F.mono, fontSize: 16, color: C.gold,
    charSpacing: 4, bold: true, margin: 0, valign: "middle",
  });

  slide.addText(title, {
    x: M, y: 1.95, w: 18, h: 1.2,
    fontFace: F.serif, fontSize: 54, color: dark ? C.cream : C.ink,
    charSpacing: -1, margin: 0, valign: "middle",
  });
}

// ============================================================
// SLIDE 1 · COVER
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };

  slide.addShape(pres.shapes.LINE, {
    x: M, y: 1.02, w: W - 2 * M, h: 0,
    line: { color: C.rule, width: 0.5 },
  });
  slide.addText("ASTERION VENTURES", {
    x: M, y: 0.4, w: 3.6, h: 0.5,
    fontFace: F.mono, fontSize: 15, bold: true, color: C.ink,
    charSpacing: 4, margin: 0, valign: "middle",
  });
  slide.addText("INVESTMENT COMMITTEE MEMORANDUM", {
    x: M + 3.8, y: 0.4, w: 11, h: 0.5,
    fontFace: F.mono, fontSize: 15, color: C.muted,
    charSpacing: 2, margin: 0, valign: "middle",
  });
  slide.addText("CONFIDENTIAL · DRAFT V3.2", {
    x: W - M - 5.5, y: 0.4, w: 5.5, h: 0.5,
    fontFace: F.mono, fontSize: 15, color: C.muted,
    charSpacing: 2, margin: 0, valign: "middle", align: "right",
  });

  slide.addShape(pres.shapes.OVAL, {
    x: M, y: 1.65, w: 0.95, h: 0.95,
    fill: { type: "none" }, line: { color: C.gold, width: 1 },
  });

  slide.addText("SERIES A · LEAD INVESTMENT", {
    x: M, y: 3.05, w: 12, h: 0.55,
    fontFace: F.mono, fontSize: 19, color: C.gold,
    charSpacing: 4, bold: true, margin: 0, valign: "middle",
  });

  slide.addText("AlienTech Labs", {
    x: M, y: 3.65, w: 18, h: 1.9,
    fontFace: F.serif, fontSize: 96, color: C.ink,
    charSpacing: -2, margin: 0, valign: "middle",
  });

  slide.addText(
    "Commercialising recovered non-terrestrial materials science into civilian platforms across aerospace, advanced manufacturing, and dual-use defence.",
    {
      x: M, y: 5.85, w: 13, h: 1.7,
      fontFace: F.serif, fontSize: 26, italic: true, color: C.inkSoft,
      margin: 0, valign: "top",
    }
  );

  slide.addShape(pres.shapes.LINE, {
    x: M, y: 8.0, w: W - 2 * M, h: 0,
    line: { color: C.rule, width: 0.5 },
  });

  const metrics = [
    { label: "ROUND",     value: "Series A",    sub: "Lead, $500M" },
    { label: "PRE-MONEY", value: "$20.0B",      sub: "$20.5B post" },
    { label: "STAGE",     value: "Pre-revenue", sub: "TRL 4–5 across portfolio" },
    { label: "AUTHOR",    value: "M. Halberd",  sub: "Frontier & Deep Tech · 27 Apr 2026" },
  ];
  const colW = (W - 2 * M) / 4;
  metrics.forEach((m, i) => {
    const cx = M + i * colW;
    slide.addText(m.label, {
      x: cx + 0.15, y: 8.2, w: colW - 0.3, h: 0.4,
      fontFace: F.mono, fontSize: 14, color: C.muted,
      charSpacing: 3, margin: 0, valign: "top",
    });
    slide.addText(m.value, {
      x: cx + 0.15, y: 8.6, w: colW - 0.3, h: 0.65,
      fontFace: F.serif, fontSize: 26, color: C.ink,
      margin: 0, valign: "top",
    });
    slide.addText(m.sub, {
      x: cx + 0.15, y: 9.3, w: colW - 0.3, h: 0.6,
      fontFace: F.mono, fontSize: 14, color: C.muted,
      margin: 0, valign: "top",
    });
    if (i > 0) {
      slide.addShape(pres.shapes.LINE, {
        x: cx, y: 8.2, w: 0, h: 1.65,
        line: { color: C.rule, width: 0.5 },
      });
    }
  });

  slide.addShape(pres.shapes.LINE, {
    x: M, y: 10.0, w: W - 2 * M, h: 0,
    line: { color: C.rule, width: 0.5 },
  });

  slide.addShape(pres.shapes.LINE, {
    x: M, y: H - 0.65, w: W - 2 * M, h: 0,
    line: { color: C.rule, width: 0.5 },
  });
  slide.addText("ALIENTECH LABS · IC MEMO", {
    x: M, y: H - 0.5, w: 5, h: 0.35,
    fontFace: F.mono, fontSize: 13, color: C.muted,
    charSpacing: 2, margin: 0, valign: "middle",
  });
  slide.addText("CONFIDENTIAL — INTERNAL USE ONLY", {
    x: W / 2 - 3.5, y: H - 0.5, w: 7, h: 0.35,
    fontFace: F.mono, fontSize: 13, color: C.gold,
    charSpacing: 3, margin: 0, valign: "middle", align: "center",
  });
  slide.addText("01 / 12", {
    x: W - M - 2, y: H - 0.5, w: 2, h: 0.35,
    fontFace: F.mono, fontSize: 13, color: C.muted,
    charSpacing: 2, margin: 0, valign: "middle", align: "right",
  });
}

// ============================================================
// SLIDE 2 · INVESTMENT SUMMARY
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  addHeaderFooter(slide, 2, "02 · INVESTMENT SUMMARY");
  addTitleBlock(slide, "RECOMMENDATION", "Investment Summary");

  slide.addText(
    "We recommend leading the $500M Series A at $20.0B pre-money, structured in two tranches gated on independent third-party validation of the alloy thermal-stability claims.",
    {
      x: M, y: 3.55, w: 17, h: 1.4,
      fontFace: F.serif, fontSize: 24, italic: true, color: C.inkSoft,
      margin: 0, valign: "top",
    }
  );

  slide.addShape(pres.shapes.LINE, {
    x: M, y: 5.1, w: W - 2 * M, h: 0,
    line: { color: C.ink, width: 1.5 },
  });

  const blocks = [
    { big: "$500", unit: "M", label: "PROPOSED CHEQUE",
      desc: "$300M at close, $200M on Tranche II milestones (Q4 2026)." },
    { big: "2.4",  unit: "%", label: "OWNERSHIP, FULLY DILUTED",
      desc: "Pro-rata rights through Series C; 1× standard liquidation." },
    { big: "8–14", unit: "×", label: "BASE-CASE MOIC, 7-YEAR",
      desc: "Probability-weighted across bear / base / bull. See slide 11." },
  ];
  const bw = (W - 2 * M) / 3;
  blocks.forEach((b, i) => {
    const x0 = M + i * bw;
    if (i > 0) {
      slide.addShape(pres.shapes.LINE, {
        x: x0, y: 5.3, w: 0, h: 2.4,
        line: { color: C.rule, width: 0.5 },
      });
    }
    slide.addText(
      [
        { text: b.big, options: { fontSize: 72, color: C.ink } },
        { text: " " + b.unit, options: { fontSize: 30, color: C.gold } },
      ],
      {
        x: x0 + 0.2, y: 5.4, w: bw - 0.3, h: 1.3,
        fontFace: F.serif, margin: 0, valign: "middle",
      }
    );
    slide.addText(b.label, {
      x: x0 + 0.2, y: 6.75, w: bw - 0.3, h: 0.4,
      fontFace: F.mono, fontSize: 15, color: C.muted,
      charSpacing: 3, margin: 0, valign: "top",
    });
    slide.addText(b.desc, {
      x: x0 + 0.2, y: 7.2, w: bw - 0.3, h: 0.7,
      fontFace: F.sans, fontSize: 17, color: C.inkSoft,
      margin: 0, valign: "top",
    });
  });

  slide.addShape(pres.shapes.LINE, {
    x: M, y: 8.1, w: W - 2 * M, h: 0,
    line: { color: C.rule, width: 0.5 },
  });

  const paras = [
    { lead: "Why now.", body: " Three independent validation labs have replicated the signature 0.41-density / 4.2 GPa-yield datapoint within the last 14 months — moving the science out of single-source territory." },
    { lead: "Why us.", body: " Asterion's 2023 stake in Helion-Adjacent Materials gives unique sourcing diligence the rest of the syndicate cannot replicate." },
    { lead: "Key risk.", body: " Regulatory and provenance uncertainty around the source materials; mitigated by tranche structure and an independent bench-replication covenant." },
  ];
  let py = 8.3;
  paras.forEach((p) => {
    slide.addText(
      [
        { text: p.lead, options: { bold: true, color: C.ink } },
        { text: p.body, options: { color: C.inkSoft } },
      ],
      {
        x: M + 0.4, y: py, w: W - 2 * M - 0.8, h: 0.65,
        fontFace: F.sans, fontSize: 16,
        margin: 0, valign: "top",
      }
    );
    py += 0.7;
  });
}

// ============================================================
// SLIDE 3 · COMPANY OVERVIEW
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  addHeaderFooter(slide, 3, "03 · COMPANY OVERVIEW");
  addTitleBlock(slide, "FOUNDED 2022 · SANDIA, NM", "Company Overview");

  slide.addText(
    "A frontier materials platform with two anchoring programmes — propulsive-lattice alloys and inertial-decoupling structures.",
    {
      x: M, y: 3.55, w: 9.5, h: 1.6,
      fontFace: F.serif, fontSize: 26, color: C.ink,
      margin: 0, valign: "top",
    }
  );

  slide.addText(
    "Founded by Dr. Iris Vance (formerly LANL exotic alloys, 14 yrs) and Dr. Benedikt Roar (ex-Skunk Works, structural integration). Operates a Tier-3 secured fabrication facility under DoE oversight. 84 FTE; 41 PhD.",
    {
      x: M, y: 5.5, w: 9.5, h: 1.7,
      fontFace: F.sans, fontSize: 17, color: C.inkSoft,
      margin: 0, valign: "top",
    }
  );

  slide.addText(
    [
      { text: "The company does not claim to ", options: {} },
      { text: "understand", options: { italic: true } },
      { text: " the underlying physics in full — it operates a deterministic, repeatable manufacturing pathway derived from reverse-engineered crystallographic templates.", options: {} },
    ],
    {
      x: M, y: 7.4, w: 9.5, h: 1.7,
      fontFace: F.sans, fontSize: 17, color: C.inkSoft,
      margin: 0, valign: "top",
    }
  );

  const rx = 11;
  const rw = W - rx - M;
  slide.addText("EXHIBIT 03A · CAP & OPERATING SNAPSHOT", {
    x: rx, y: 3.55, w: rw, h: 0.4,
    fontFace: F.mono, fontSize: 15, color: C.muted,
    charSpacing: 3, margin: 0, valign: "middle",
  });

  const rows = [
    ["Headcount", "84 FTE · 41 PhD"],
    ["Burn (TTM)", "$48M · 22-mo runway"],
    ["Total raised", "$210M (Seed + A-1)"],
    ["Existing cap", "Khosla, Lux, In-Q-Tel, Founders Fund"],
    ["Govt. contracts", "$67M (DARPA, AFRL, DoE)"],
    ["Patents", "31 issued · 84 pending"],
    ["Facility", "Albuquerque · Tier-3 SCIF, 22 ksqft"],
    ["Clearances", "TS/SCI · DoE Q · ITAR registered"],
  ];
  let ry = 4.2;
  const rh = 0.7;
  rows.forEach((r) => {
    slide.addShape(pres.shapes.LINE, {
      x: rx, y: ry, w: rw, h: 0,
      line: { color: C.rule, width: 0.5 },
    });
    slide.addText(r[0], {
      x: rx, y: ry + 0.05, w: 2.9, h: rh,
      fontFace: F.serif, fontSize: 18, color: C.ink,
      margin: 0, valign: "middle",
    });
    slide.addText(r[1], {
      x: rx + 3.0, y: ry + 0.05, w: rw - 3.0, h: rh,
      fontFace: F.mono, fontSize: 15, color: C.inkSoft,
      margin: 0, valign: "middle",
    });
    ry += rh;
  });
  slide.addShape(pres.shapes.LINE, {
    x: rx, y: ry, w: rw, h: 0,
    line: { color: C.rule, width: 0.5 },
  });
}

// ============================================================
// SLIDE 4 · THE TECHNOLOGY (DARK)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgDark };
  addHeaderFooter(slide, 4, "04 · THE TECHNOLOGY", true);
  addTitleBlock(slide, "CORE STACK", "The Technology", true);

  slide.addText(
    "Two interlocking platforms. A face-centred quasicrystalline alloy with anomalously low specific density, and a coupled lattice-resonance structure that produces a measurable, stable mass-effective reduction at room temperature.",
    {
      x: M, y: 3.85, w: 17, h: 1.7,
      fontFace: F.serif, fontSize: 26, italic: true, color: "D4CFC2",
      margin: 0, valign: "top",
    }
  );

  const stats = [
    { label: "SPECIFIC DENSITY",         val: "0.41",  unit: " g/cm³" },
    { label: "YIELD STRENGTH",           val: "4.2",   unit: " GPa" },
    { label: "MASS-EFFECTIVE REDUCTION", val: "−63",   unit: "%" },
    { label: "OPERATING TEMP",           val: "293",   unit: " K" },
  ];
  const sw = (W - 2 * M) / 4;
  const sy = 6.4;
  stats.forEach((s, i) => {
    const sx = M + i * sw;
    if (i > 0) {
      slide.addShape(pres.shapes.LINE, {
        x: sx, y: sy, w: 0, h: 2.4,
        line: { color: "5A544A", width: 0.5 },
      });
    }
    slide.addText(s.label, {
      x: sx + 0.2, y: sy, w: sw - 0.3, h: 0.45,
      fontFace: F.mono, fontSize: 14, color: "ECE8DF",
      charSpacing: 3, margin: 0, valign: "top",
    });
    slide.addText(
      [
        { text: s.val, options: { fontSize: 68, color: C.cream } },
        { text: s.unit, options: { fontSize: 28, color: C.gold } },
      ],
      {
        x: sx + 0.2, y: sy + 0.55, w: sw - 0.3, h: 1.6,
        fontFace: F.serif, margin: 0, valign: "middle",
      }
    );
  });

  slide.addText(
    "Figures from Sandia replication, Mar 2026. Mass-effective reduction measured via Cavendish-modified torsion balance; not yet publishable under MOU.",
    {
      x: M, y: 9.25, w: W - 2 * M, h: 0.7,
      fontFace: F.sans, fontSize: 15, color: "A8A095", italic: true,
      margin: 0, valign: "top",
    }
  );
}

// ============================================================
// SLIDE 5 · DEFENSIBILITY & IP
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  addHeaderFooter(slide, 5, "05 · DEFENSIBILITY & IP");
  addTitleBlock(slide, "MOAT DECOMPOSITION", "Defensibility & IP");

  slide.addText(
    "The moat is sequential, not parallel — each layer compounds on the one beneath it.",
    {
      x: M, y: 3.55, w: 11, h: 1.2,
      fontFace: F.serif, fontSize: 26, color: C.ink,
      margin: 0, valign: "top",
    }
  );

  const layers = [
    { lead: "Substrate scarcity.", body: " Bounded seed material, no synthetic pathway. AlienTech holds 71% of disclosed global stockpile under a DoE custodial arrangement." },
    { lead: "Process IP.", body: " Crystallographic templating method protected by 31 issued patents and a tranche of ITAR-classified trade secrets." },
    { lead: "Clearance & counterparty trust.", body: " Three civilian entities globally hold the facility-clearance combination required to bid." },
    { lead: "Data flywheel.", body: " Lattice telemetry feeds a process-optimisation model now ~3× more sample-efficient than competing approaches." },
  ];
  let ly = 5.1;
  layers.forEach((l) => {
    slide.addText(
      [
        { text: l.lead, options: { bold: true, color: C.ink } },
        { text: l.body, options: { color: C.inkSoft } },
      ],
      {
        x: M + 0.4, y: ly, w: 10.2, h: 1.15,
        fontFace: F.sans, fontSize: 17,
        margin: 0, valign: "top",
      }
    );
    ly += 1.2;
  });

  // Right: concentric rings diagram
  slide.addText("EXHIBIT 05A · DEFENSIBILITY LAYERS", {
    x: 11.2, y: 3.55, w: 8.0, h: 0.4,
    fontFace: F.mono, fontSize: 15, color: C.muted,
    charSpacing: 3, margin: 0, valign: "middle", align: "right",
  });

  const cx = 15.2, cy = 7.5;

  slide.addShape(pres.shapes.OVAL, {
    x: cx - 2.7, y: cy - 2.7, w: 5.4, h: 5.4,
    fill: { type: "none" }, line: { color: C.rule, width: 1 },
  });
  slide.addShape(pres.shapes.OVAL, {
    x: cx - 1.9, y: cy - 1.9, w: 3.8, h: 3.8,
    fill: { type: "none" }, line: { color: C.rule, width: 1 },
  });
  slide.addShape(pres.shapes.OVAL, {
    x: cx - 1.1, y: cy - 1.1, w: 2.2, h: 2.2,
    fill: { type: "none" }, line: { color: C.gold, width: 1 },
  });
  slide.addShape(pres.shapes.OVAL, {
    x: cx - 0.55, y: cy - 0.55, w: 1.1, h: 1.1,
    fill: { color: C.bgDark }, line: { color: C.bgDark, width: 0 },
  });

  // Labels positioned ABOVE each ring crown
  slide.addText("CLEARANCE & TRUST", {
    x: cx - 3, y: cy - 3.05, w: 6, h: 0.4,
    fontFace: F.mono, fontSize: 14, color: C.ink,
    charSpacing: 3, bold: true, margin: 0, valign: "middle", align: "center",
  });
  slide.addText("PROCESS IP", {
    x: cx - 3, y: cy - 2.25, w: 6, h: 0.4,
    fontFace: F.mono, fontSize: 14, color: C.inkSoft,
    charSpacing: 3, bold: true, margin: 0, valign: "middle", align: "center",
  });
  slide.addText("SUBSTRATE", {
    x: cx - 3, y: cy - 1.45, w: 6, h: 0.4,
    fontFace: F.mono, fontSize: 14, color: C.gold,
    charSpacing: 3, bold: true, margin: 0, valign: "middle", align: "center",
  });

  slide.addText(
    [
      { text: "Source", options: { breakLine: true } },
      { text: "Material", options: {} },
    ],
    {
      x: cx - 0.55, y: cy - 0.45, w: 1.1, h: 0.9,
      fontFace: F.serif, fontSize: 12, color: C.cream,
      margin: 0, valign: "middle", align: "center",
    }
  );
}

// ============================================================
// SLIDE 6 · MARKET OPPORTUNITY
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  addHeaderFooter(slide, 6, "06 · MARKET OPPORTUNITY");
  addTitleBlock(slide, "SIZING & SEGMENTATION", "Market Opportunity");

  slide.addText(
    "Three distinct vectors. We underwrite the round on (1) and (3); (2) is upside.",
    {
      x: M, y: 3.55, w: 9, h: 1.7,
      fontFace: F.serif, fontSize: 26, color: C.ink,
      margin: 0, valign: "top",
    }
  );

  slide.addText(
    "Sized bottom-up from public procurement budgets (DoD, NASA, ESA), commercial aerospace material spend, and structural alloy demand in the wide-body and heavy-lift segments.",
    {
      x: M, y: 5.5, w: 9, h: 2.0,
      fontFace: F.sans, fontSize: 17, color: C.inkSoft,
      margin: 0, valign: "top",
    }
  );

  slide.addText(
    "Source: McKinsey Aerospace Materials 2025; SIPRI defence procurement Q4 2025; analyst build, TAM at full-substitution.",
    {
      x: M, y: 7.7, w: 9, h: 1.0,
      fontFace: F.sans, fontSize: 14, color: C.muted, italic: true,
      margin: 0, valign: "top",
    }
  );

  const rx = 10.3;
  const rw = W - rx - M;
  slide.addText("EXHIBIT 06A · TAM / SAM / WEDGE BY VERTICAL (2032)", {
    x: rx, y: 3.55, w: rw, h: 0.5,
    fontFace: F.mono, fontSize: 15, color: C.muted,
    charSpacing: 3, margin: 0, valign: "top",
  });

  const tHeaderY = 4.35;
  const colXs = [rx, rx + 3.6, rx + 5.0, rx + 6.5];
  const colWs = [3.6, 1.4, 1.5, rw - 6.5];
  ["VERTICAL", "TAM", "SAM (10Y)", "WEDGE TARGET"].forEach((h, i) => {
    slide.addText(h, {
      x: colXs[i], y: tHeaderY, w: colWs[i], h: 0.5,
      fontFace: F.mono, fontSize: 14, color: C.ink,
      charSpacing: 3, bold: true, margin: 0, valign: "middle",
    });
  });
  slide.addShape(pres.shapes.LINE, {
    x: rx, y: tHeaderY + 0.55, w: rw, h: 0,
    line: { color: C.ink, width: 1 },
  });

  const tRows = [
    ["Aerospace structures",  "$184B", "$41B", "$2.1B ARR"],
    ["Defence & dual-use",    "$96B",  "$22B", "$1.4B ARR"],
    ["Advanced manufacturing","$310B", "$48B", "$1.8B ARR"],
    ["Space & heavy-lift",    "$42B",  "$14B", "$0.9B ARR"],
  ];
  let tY = tHeaderY + 0.7;
  const trH = 0.7;
  tRows.forEach((r) => {
    r.forEach((cell, i) => {
      slide.addText(cell, {
        x: colXs[i], y: tY, w: colWs[i], h: trH,
        fontFace: i === 0 ? F.serif : F.mono,
        fontSize: i === 0 ? 18 : 15,
        color: C.inkSoft, margin: 0, valign: "middle",
      });
    });
    tY += trH;
    slide.addShape(pres.shapes.LINE, {
      x: rx, y: tY, w: rw, h: 0,
      line: { color: C.rule, width: 0.5 },
    });
  });

  slide.addShape(pres.shapes.LINE, {
    x: rx, y: tY, w: rw, h: 0,
    line: { color: C.ink, width: 1 },
  });
  const totals = ["Total addressable", "$632B", "$125B", "$6.2B ARR"];
  totals.forEach((cell, i) => {
    slide.addText(cell, {
      x: colXs[i], y: tY + 0.05, w: colWs[i], h: trH,
      fontFace: i === 0 ? F.serif : F.mono,
      fontSize: i === 0 ? 18 : 15,
      color: C.ink, bold: true,
      margin: 0, valign: "middle",
    });
  });
  slide.addShape(pres.shapes.LINE, {
    x: rx, y: tY + 0.7, w: rw, h: 0,
    line: { color: C.rule, width: 0.5 },
  });
}

// ============================================================
// SLIDE 7 · DUAL-USE APPLICATIONS
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  addHeaderFooter(slide, 7, "07 · DUAL-USE APPLICATIONS");
  addTitleBlock(slide, "APPLICATION STACK · CIVILIAN → RESTRICTED", "Dual-Use Applications");

  slide.addText("EXHIBIT 07A · APPLICATION STACK BY READINESS LEVEL (TRL)", {
    x: M, y: 3.5, w: 16, h: 0.5,
    fontFace: F.mono, fontSize: 15, color: C.muted,
    charSpacing: 3, margin: 0, valign: "middle",
  });

  const apps = [
    { cat: "CIVILIAN — NEAR TERM", title: "Wide-body airframe substitution", desc: "Replaces titanium-aluminide skin sections at 38% of mass · Boeing & Embraer LOIs", trl: "6" },
    { cat: "CIVILIAN — MID TERM",  title: "Heavy-lift lattice for orbital launch", desc: "Inertial decoupling reduces effective payload mass-fraction by ~22% · 2 customer pilots", trl: "5" },
    { cat: "INDUSTRIAL",           title: "Pressure-vessel skinning for fusion plant", desc: "Containment under 4.2 GPa cyclic loading · Helion + Commonwealth Fusion engaged", trl: "4" },
    { cat: "RESTRICTED",           title: "Hypersonic leading-edge structures", desc: "Funded under AFRL Programme Vertex · separate cap table at our discretion", trl: "5" },
    { cat: "RESEARCH ONLY",        title: "Inertial-decoupling propulsion bench", desc: "Speculative, non-underwritten upside · 7–10 yr horizon if ever", trl: "2" },
  ];

  let ry = 4.25;
  const rowH = 1.15;
  const gap = 0.1;
  const rowW = W - 2 * M;
  apps.forEach((a, i) => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: M, y: ry, w: rowW, h: rowH,
      fill: { color: i % 2 === 0 ? "EEEAE0" : "F0EDE4" },
      line: { color: C.ruleSoft, width: 0.5 },
    });
    slide.addText(a.cat, {
      x: M + 0.35, y: ry, w: 4.2, h: rowH,
      fontFace: F.mono, fontSize: 15, color: C.gold,
      charSpacing: 3, margin: 0, valign: "middle",
    });
    slide.addText(a.title, {
      x: M + 4.7, y: ry + 0.15, w: 12.2, h: 0.45,
      fontFace: F.serif, fontSize: 20, color: C.ink,
      margin: 0, valign: "top",
    });
    slide.addText(a.desc, {
      x: M + 4.7, y: ry + 0.62, w: 12.2, h: 0.45,
      fontFace: F.sans, fontSize: 15, color: C.muted,
      margin: 0, valign: "top",
    });
    slide.addText("TRL", {
      x: rowW + M - 1.6, y: ry + 0.15, w: 1.2, h: 0.3,
      fontFace: F.mono, fontSize: 13, color: C.muted,
      charSpacing: 3, margin: 0, valign: "top", align: "right",
    });
    slide.addText(a.trl, {
      x: rowW + M - 1.6, y: ry + 0.48, w: 1.2, h: 0.6,
      fontFace: F.serif, fontSize: 28, color: C.ink, bold: true,
      margin: 0, valign: "top", align: "right",
    });
    ry += rowH + gap;
  });
}

// ============================================================
// SLIDE 8 · COMMERCIAL ROADMAP
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  addHeaderFooter(slide, 8, "08 · COMMERCIAL ROADMAP");
  addTitleBlock(slide, "USE OF PROCEEDS & SEQUENCING", "Commercial Roadmap");

  slide.addText(
    "The $500M moves AlienTech from bench-validated samples to a 4 ksqft pilot fabrication line by Q3 2027 and commercial launch of the airframe-substitution product in 2028.",
    {
      x: M, y: 3.55, w: 17, h: 1.3,
      fontFace: F.serif, fontSize: 23, italic: true, color: C.inkSoft,
      margin: 0, valign: "top",
    }
  );

  const phases = [
    { year: "2026 — NOW", title: "Validation & pilot line",
      items: ["Tranche I close, $300M", "Sandia replication MOU", "Pilot fab tooling", "Boeing JDA executed"], filled: true },
    { year: "2027", title: "First customer revenue",
      items: ["Tranche II $200M release", "4 ksqft fab online", "$30–60M test-article revenue", "AFRL Vertex Phase II"], filled: false },
    { year: "2028", title: "Commercial product launch",
      items: ["Wide-body skin certification", "Series B raise, $1.5B target", "$180M ARR run-rate", "EU/JP regulatory pathway"], filled: false },
    { year: "2029–2031", title: "Platform consolidation",
      items: ["Heavy-lift lattice GA", "Fusion vessel design wins", "$1.2B+ ARR", "Strategic exit window"], filled: false },
  ];
  const phW = (W - 2 * M) / 4;
  const phY = 5.2;
  phases.forEach((p, i) => {
    const px = M + i * phW;
    if (p.filled) {
      slide.addShape(pres.shapes.OVAL, {
        x: px + 0.05, y: phY, w: 0.32, h: 0.32,
        fill: { color: C.gold }, line: { color: C.gold, width: 1 },
      });
    } else {
      slide.addShape(pres.shapes.OVAL, {
        x: px + 0.05, y: phY, w: 0.32, h: 0.32,
        fill: { type: "none" }, line: { color: C.gold, width: 1 },
      });
    }

    slide.addText(p.year, {
      x: px, y: phY + 0.45, w: phW - 0.25, h: 0.4,
      fontFace: F.mono, fontSize: 14, color: C.gold,
      charSpacing: 3, bold: true, margin: 0, valign: "top",
    });

    slide.addText(p.title, {
      x: px, y: phY + 0.9, w: phW - 0.25, h: 0.95,
      fontFace: F.serif, fontSize: 20, color: C.ink,
      margin: 0, valign: "top",
    });

    slide.addText(
      p.items.map((it, idx) => ({
        text: it,
        options: { breakLine: idx < p.items.length - 1 },
      })),
      {
        x: px, y: phY + 1.95, w: phW - 0.25, h: 1.95,
        fontFace: F.sans, fontSize: 15, color: C.inkSoft,
        margin: 0, valign: "top", paraSpaceAfter: 4,
      }
    );
  });

  slide.addShape(pres.shapes.LINE, {
    x: M, y: 8.4, w: W - 2 * M, h: 0,
    line: { color: C.rule, width: 0.5 },
  });

  slide.addText("USE OF PROCEEDS — $500M", {
    x: M, y: 8.55, w: 8, h: 0.4,
    fontFace: F.mono, fontSize: 14, color: C.gold,
    charSpacing: 4, bold: true, margin: 0, valign: "middle",
  });

  slide.addShape(pres.shapes.LINE, {
    x: M, y: 9.05, w: W - 2 * M, h: 0,
    line: { color: C.rule, width: 0.5 },
  });

  const props = [
    { label: "PILOT FAB LINE",   amt: "$215M", pct: "43%" },
    { label: "SUBSTRATE PROC.",  amt: "$120M", pct: "24%" },
    { label: "R&D / CERT.",      amt: "$95M",  pct: "19%" },
    { label: "G&A · RESERVE",    amt: "$70M",  pct: "14%" },
  ];
  const prW = (W - 2 * M) / 4;
  const prY = 9.2;
  props.forEach((p, i) => {
    const px = M + i * prW;
    slide.addText(p.label, {
      x: px + 0.05, y: prY, w: prW - 0.2, h: 0.4,
      fontFace: F.mono, fontSize: 13, color: C.muted,
      charSpacing: 3, margin: 0, valign: "top",
    });
    slide.addText(
      [
        { text: p.amt, options: { fontSize: 28, color: C.ink } },
        { text: " " + p.pct, options: { fontSize: 13, color: C.muted, fontFace: F.mono } },
      ],
      {
        x: px + 0.05, y: prY + 0.45, w: prW - 0.2, h: 0.6,
        fontFace: F.serif, margin: 0, valign: "middle",
      }
    );
  });
}

// ============================================================
// SLIDE 9 · REGULATORY & EXISTENTIAL RISK
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  addHeaderFooter(slide, 9, "09 · REGULATORY & EXISTENTIAL RISK");
  addTitleBlock(slide, "RISK REGISTER", "Regulatory & Existential Risk");

  const risks = [
    { sev: "HIGH",   sevColor: C.red,   title: "Provenance & custodial chain",      body: "Novel custody framework; adverse review could freeze inventory.", mit: "DoE custodial MOU to 2031; Asterion on audit committee." },
    { sev: "HIGH",   sevColor: C.red,   title: "Export controls (ITAR / EAR)",      body: "Mass-decoupling effect is presumptively defence-classified, capping civilian market.", mit: "Civilian variant tuned below Cat. XV; OFAC counsel retained." },
    { sev: "MEDIUM", sevColor: C.gold,  title: "Replicability of yield datapoint",  body: "Two of three replication labs sit within the same DoE programme.", mit: "Tranche II gated on Max-Planck independent replication." },
    { sev: "MEDIUM", sevColor: C.gold,  title: "Substrate-supply tail risk",        body: "Inventory finite; no synthetic pathway demonstrated.", mit: "Internal target: 4× yield/g by 2029, funded under tranche I." },
    { sev: "MEDIUM", sevColor: C.gold,  title: "Disclosure / public-narrative risk",body: 'The "alien" framing is reputationally hazardous if a programme audit goes adversarial.', mit: 'External comms locked to "exotic-alloy platform" language.' },
    { sev: "TAIL",   sevColor: C.muted, title: "Existential / second-order",        body: "Mass-effective reduction at scale shifts kinetic-impact and launch economics.", mit: "Board ethics charter; pre-emptive DoD policy engagement." },
  ];

  const cols = 3;
  const gap = 0.3;
  const cardW = (W - 2 * M - (cols - 1) * gap) / cols;
  const cardH = 3.35;
  const startY = 3.5;

  risks.forEach((r, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const cx0 = M + col * (cardW + gap);
    const cy0 = startY + row * (cardH + gap);

    slide.addShape(pres.shapes.RECTANGLE, {
      x: cx0, y: cy0, w: cardW, h: cardH,
      fill: { color: "F0EDE4" },
      line: { color: C.rule, width: 0.5 },
    });

    const tagW = r.sev.length * 0.15 + 0.55;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: cx0 + 0.3, y: cy0 + 0.3, w: tagW, h: 0.45,
      fill: { type: "none" }, line: { color: r.sevColor, width: 0.75 },
    });
    slide.addText(r.sev, {
      x: cx0 + 0.3, y: cy0 + 0.3, w: tagW, h: 0.45,
      fontFace: F.mono, fontSize: 12, color: r.sevColor, bold: true,
      charSpacing: 3, margin: 0, valign: "middle", align: "center",
    });

    slide.addText(r.title, {
      x: cx0 + 0.3, y: cy0 + 0.9, w: cardW - 0.6, h: 0.6,
      fontFace: F.serif, fontSize: 20, color: C.ink,
      margin: 0, valign: "top",
    });

    slide.addText(r.body, {
      x: cx0 + 0.3, y: cy0 + 1.55, w: cardW - 0.6, h: 0.95,
      fontFace: F.sans, fontSize: 15, color: C.inkSoft,
      margin: 0, valign: "top",
    });

    slide.addText("MITIGATION", {
      x: cx0 + 0.3, y: cy0 + 2.5, w: cardW - 0.6, h: 0.3,
      fontFace: F.mono, fontSize: 11, color: C.gold,
      charSpacing: 3, bold: true, margin: 0, valign: "top",
    });

    slide.addText(r.mit, {
      x: cx0 + 0.3, y: cy0 + 2.8, w: cardW - 0.6, h: 0.5,
      fontFace: F.sans, fontSize: 15, color: C.inkSoft,
      margin: 0, valign: "top",
    });
  });
}

// ============================================================
// SLIDE 10 · FINANCIALS & VALUATION
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  addHeaderFooter(slide, 10, "10 · FINANCIALS & VALUATION");
  addTitleBlock(slide, "PLAN & COMPARABLE ANALYSIS", "Financials & Valuation");

  const lx = M;
  const lw = 8.6;
  slide.addText("EXHIBIT 10A · OPERATING PLAN ($M)", {
    x: lx, y: 3.55, w: lw, h: 0.5,
    fontFace: F.mono, fontSize: 15, color: C.muted,
    charSpacing: 3, margin: 0, valign: "middle",
  });

  const tHeaderY1 = 4.35;
  const cWidths = [2.4, 1.24, 1.24, 1.24, 1.24, 1.24];
  const cXs = [lx];
  for (let k = 1; k < cWidths.length; k++) cXs.push(cXs[k - 1] + cWidths[k - 1]);
  ["METRIC", "2026E", "2027E", "2028E", "2030E", "2032E"].forEach((h, i) => {
    slide.addText(h, {
      x: cXs[i], y: tHeaderY1, w: cWidths[i], h: 0.5,
      fontFace: F.mono, fontSize: 14, color: C.ink,
      charSpacing: 3, bold: true, margin: 0, valign: "middle",
    });
  });
  slide.addShape(pres.shapes.LINE, {
    x: lx, y: tHeaderY1 + 0.55, w: lw, h: 0,
    line: { color: C.ink, width: 1 },
  });

  const opRows = [
    { label: "Revenue",      vals: ["12", "48", "180", "640", "1,420"], hi: "green" },
    { label: "Gross margin", vals: ["12%", "28%", "44%", "58%", "68%"], hi: "green" },
    { label: "EBITDA",       vals: ["(58)", "(72)", "(40)", "180", "560"], hi: "ebitda" },
    { label: "Cash",         vals: ["540", "468", "1,720", "2,100", "3,400"] },
    { label: "Backlog",      vals: ["95", "340", "1,100", "3,200", "5,800"], hi: "green" },
  ];
  let opY = tHeaderY1 + 0.7;
  const opRH = 0.72;
  opRows.forEach((r) => {
    slide.addText(r.label, {
      x: cXs[0], y: opY, w: cWidths[0], h: opRH,
      fontFace: F.serif, fontSize: 18, color: C.ink,
      margin: 0, valign: "middle",
    });
    r.vals.forEach((v, j) => {
      let color = C.inkSoft;
      if (r.hi === "green" && j === 4) color = C.green;
      if (r.hi === "ebitda") {
        if (j <= 2) color = C.red;
        else color = C.green;
      }
      slide.addText(v, {
        x: cXs[j + 1], y: opY, w: cWidths[j + 1], h: opRH,
        fontFace: F.mono, fontSize: 16, color,
        margin: 0, valign: "middle",
      });
    });
    opY += opRH;
    slide.addShape(pres.shapes.LINE, {
      x: lx, y: opY, w: lw, h: 0,
      line: { color: C.rule, width: 0.5 },
    });
  });

  const rx = 10.2;
  const rw = W - rx - M;
  slide.addText("EXHIBIT 10B · VALUATION TRIANGULATION", {
    x: rx, y: 3.55, w: rw, h: 0.5,
    fontFace: F.mono, fontSize: 15, color: C.muted,
    charSpacing: 3, margin: 0, valign: "middle",
  });

  const vColXs = [rx, rx + 3.2, rx + 5.2];
  const vColWs = [3.2, 2.0, rw - 5.2];
  ["METHOD", "IMPLIED EV", "NOTES"].forEach((h, i) => {
    slide.addText(h, {
      x: vColXs[i], y: tHeaderY1, w: vColWs[i], h: 0.5,
      fontFace: F.mono, fontSize: 14, color: C.ink,
      charSpacing: 3, bold: true, margin: 0, valign: "middle",
    });
  });
  slide.addShape(pres.shapes.LINE, {
    x: rx, y: tHeaderY1 + 0.55, w: rw, h: 0,
    line: { color: C.ink, width: 1 },
  });

  const vRows = [
    ["Comp set: deep-tech A", "$14–22B", "Helion, Anduril, Saronic median."],
    ["2032 fwd revenue",      "$18–28B", "9–14× '32E revenue, disc. 35%."],
    ["Real options (DCF)",    "$22–34B", "Heavy-lift & fusion as call options."],
    ["Substrate floor",       "$6–9B",   "Custodial inventory at strategic value."],
  ];
  let vY = tHeaderY1 + 0.7;
  const vRH = 0.72;
  vRows.forEach((r) => {
    r.forEach((cell, i) => {
      slide.addText(cell, {
        x: vColXs[i], y: vY, w: vColWs[i], h: vRH,
        fontFace: i === 0 ? F.serif : (i === 1 ? F.mono : F.sans),
        fontSize: i === 0 ? 17 : (i === 1 ? 15 : 15),
        color: C.inkSoft, margin: 0, valign: "middle",
      });
    });
    vY += vRH;
    slide.addShape(pres.shapes.LINE, {
      x: rx, y: vY, w: rw, h: 0,
      line: { color: C.rule, width: 0.5 },
    });
  });

  slide.addShape(pres.shapes.LINE, {
    x: rx, y: vY, w: rw, h: 0,
    line: { color: C.ink, width: 1 },
  });
  vY += 0.05;
  ["Recommended entry", "$20.0B", "Mid-point, with tranche protection."].forEach((cell, i) => {
    slide.addText(cell, {
      x: vColXs[i], y: vY, w: vColWs[i], h: vRH,
      fontFace: i === 0 ? F.serif : (i === 1 ? F.mono : F.sans),
      fontSize: i === 0 ? 17 : (i === 1 ? 15 : 15),
      color: C.gold, bold: true,
      margin: 0, valign: "middle",
    });
  });
}

// ============================================================
// SLIDE 11 · RISK-ADJUSTED RETURN
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgLight };
  addHeaderFooter(slide, 11, "11 · RISK-ADJUSTED RETURN");
  addTitleBlock(slide, "SCENARIO ANALYSIS · 7-YEAR HOLD", "Risk-Adjusted Return");

  slide.addText(
    "Probability-weighted gross MOIC of 9.4× clears our frontier-platform hurdle of 6×. The shape of the return is asymmetric — bull case is structural, bear case is bounded by substrate-floor value.",
    {
      x: M, y: 3.55, w: 17, h: 1.4,
      fontFace: F.serif, fontSize: 23, italic: true, color: C.inkSoft,
      margin: 0, valign: "top",
    }
  );

  slide.addShape(pres.shapes.LINE, {
    x: M, y: 5.2, w: W - 2 * M, h: 0,
    line: { color: C.rule, width: 0.5 },
  });

  const scenarios = [
    { name: "BEAR · 30%", color: C.red,   mult: "1.6", desc: "Mass-effective claim fails independent replication; company restructures around alloy-only thesis. Substrate-floor protects principal.", exit: "EV: $32B substrate-rec.", barW: 1.6 },
    { name: "BASE · 50%", color: C.gold,  mult: "9.0", desc: "Wide-body substitution wins on schedule; hypersonic programme contributes margin alongside two industrial design wins. Series C at $80–110B post; book-to-bill clears 1.4×.", exit: "Exit: $190B EV by 2033.", barW: 4.5 },
    { name: "BULL · 20%", color: C.green, mult: "28",  desc: "Heavy-lift lattice + fusion vessel both productise. Becomes the foundational platform for next-generation aerospace and energy infrastructure.", exit: "Exit: $560B+ EV by 2033.", barW: 5.6 },
  ];
  const scW = (W - 2 * M) / 3;
  const scY = 5.4;
  scenarios.forEach((s, i) => {
    const sx = M + i * scW;
    if (i > 0) {
      slide.addShape(pres.shapes.LINE, {
        x: sx, y: scY, w: 0, h: 3.3,
        line: { color: C.rule, width: 0.5 },
      });
    }
    slide.addText(s.name, {
      x: sx + 0.3, y: scY, w: scW - 0.5, h: 0.45,
      fontFace: F.mono, fontSize: 14, color: s.color,
      charSpacing: 3, bold: true, margin: 0, valign: "top",
    });
    slide.addText(
      [
        { text: s.mult, options: { fontSize: 60, color: C.ink } },
        { text: " ×", options: { fontSize: 26, color: C.muted } },
      ],
      {
        x: sx + 0.3, y: scY + 0.5, w: scW - 0.5, h: 1.05,
        fontFace: F.serif, margin: 0, valign: "middle",
      }
    );
    const barY = scY + 1.7;
    slide.addShape(pres.shapes.LINE, {
      x: sx + 0.3, y: barY, w: s.barW, h: 0,
      line: { color: s.color, width: 4 },
    });
    slide.addShape(pres.shapes.LINE, {
      x: sx + 0.3 + s.barW, y: barY, w: 5.6 - s.barW, h: 0,
      line: { color: C.ruleSoft, width: 4 },
    });
    slide.addText(s.desc, {
      x: sx + 0.3, y: scY + 1.9, w: scW - 0.5, h: 1.15,
      fontFace: F.sans, fontSize: 15, color: C.inkSoft,
      margin: 0, valign: "top",
    });
    slide.addText(s.exit, {
      x: sx + 0.3, y: scY + 3.05, w: scW - 0.5, h: 0.4,
      fontFace: F.mono, fontSize: 14, color: C.inkSoft,
      margin: 0, valign: "top",
    });
  });

  const summY = 9.15;
  slide.addShape(pres.shapes.LINE, {
    x: M, y: summY - 0.15, w: W - 2 * M, h: 0,
    line: { color: C.rule, width: 0.5 },
  });
  const summaries = [
    { label: "PROBABILITY-WEIGHTED MOIC",   val: "9.4×" },
    { label: "LOSS-OF-PRINCIPAL PROBABILITY",val: "< 8%" },
    { label: "FRONTIER HURDLE (CLEARS)",    val: "6.0×" },
  ];
  summaries.forEach((s, i) => {
    const sx = M + i * scW;
    slide.addText(s.label, {
      x: sx + 0.3, y: summY, w: scW - 0.5, h: 0.4,
      fontFace: F.mono, fontSize: 13, color: C.muted,
      charSpacing: 3, margin: 0, valign: "top",
    });
    slide.addText(s.val, {
      x: sx + 0.3, y: summY + 0.4, w: scW - 0.5, h: 0.85,
      fontFace: F.serif, fontSize: 38, color: C.ink,
      margin: 0, valign: "top",
    });
  });
}

// ============================================================
// SLIDE 12 · RECOMMENDATION (DARK)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgDark };
  addHeaderFooter(slide, 12, "12 · RECOMMENDATION", true);
  addTitleBlock(slide, "IC ACTION REQUIRED", "Recommendation", true);

  slide.addText(
    "Lead the Series A at $20.0B pre-money with a $500M cheque structured in two gated tranches. The combination of substrate scarcity, sequential moat, and asymmetric upside makes AlienTech a generationally rare frontier-platform bet, and the proposed structure protects principal in the bear case while preserving full participation in the bull.",
    {
      x: M, y: 3.55, w: 17, h: 2.1,
      fontFace: F.serif, fontSize: 23, italic: true, color: "D4CFC2",
      margin: 0, valign: "top",
    }
  );

  slide.addShape(pres.shapes.LINE, {
    x: M, y: 5.95, w: W - 2 * M, h: 0,
    line: { color: C.gold, width: 1 },
  });

  const ay = 6.3;
  const aW = (W - 2 * M) / 3;
  const contentY = ay + 0.5;

  slide.addText("VERDICT", {
    x: M, y: ay, w: aW - 0.3, h: 0.4,
    fontFace: F.mono, fontSize: 14, color: "A8A095",
    charSpacing: 3, margin: 0, valign: "top",
  });
  slide.addText("Strong Recommend.", {
    x: M, y: contentY, w: aW - 0.3, h: 1.5,
    fontFace: F.serif, fontSize: 44, color: C.cream,
    charSpacing: -1, margin: 0, valign: "top",
  });

  slide.addText("CHEQUE", {
    x: M + aW, y: ay, w: aW - 0.3, h: 0.4,
    fontFace: F.mono, fontSize: 14, color: "A8A095",
    charSpacing: 3, margin: 0, valign: "top",
  });
  slide.addText(
    [
      { text: "$500M", options: { fontSize: 44, color: C.cream } },
      { text: "  $300M T-I · $200M T-II", options: { fontSize: 16, color: "A8A095", fontFace: F.mono } },
    ],
    {
      x: M + aW, y: contentY, w: aW - 0.3, h: 1.5,
      fontFace: F.serif, margin: 0, valign: "top",
    }
  );

  slide.addText("CONDITIONS PRECEDENT", {
    x: M + 2 * aW, y: ay, w: aW - 0.3, h: 0.4,
    fontFace: F.mono, fontSize: 14, color: "A8A095",
    charSpacing: 3, margin: 0, valign: "top",
  });
  slide.addText(
    "Independent Max-Planck replication · DoE custodial MOU extended · Board observer + audit-committee seat",
    {
      x: M + 2 * aW, y: contentY, w: aW - 0.3, h: 1.5,
      fontFace: F.sans, fontSize: 17, color: C.cream,
      margin: 0, valign: "top",
    }
  );

  slide.addShape(pres.shapes.LINE, {
    x: M, y: 8.75, w: W - 2 * M, h: 0,
    line: { color: "5A544A", width: 0.5 },
  });

  const soY = 8.95;
  const sponsors = [
    { label: "SPONSOR",      bigA: "M. Halberd",          sub: "Frontier & Deep Tech" },
    { label: "IC DATE",      bigA: "02 May 2026",         sub: "Decision required by 09 May" },
    { label: "CO-INVESTORS", bigA: "Lux · Founders Fund", sub: "$200M syndicate alongside" },
  ];
  sponsors.forEach((s, i) => {
    const sx = M + i * aW;
    slide.addText(s.label, {
      x: sx, y: soY, w: aW - 0.3, h: 0.4,
      fontFace: F.mono, fontSize: 13, color: "A8A095",
      charSpacing: 3, margin: 0, valign: "top",
    });
    slide.addText(s.bigA, {
      x: sx, y: soY + 0.4, w: aW - 0.3, h: 0.65,
      fontFace: F.serif, fontSize: 24, color: C.cream,
      margin: 0, valign: "top",
    });
    slide.addText(s.sub, {
      x: sx, y: soY + 1.05, w: aW - 0.3, h: 0.4,
      fontFace: F.mono, fontSize: 13, color: "A8A095",
      margin: 0, valign: "top",
    });
  });
}

// ---------- Write file ----------
pres.writeFile({ fileName: "AlienTech_IC_Memo.pptx" })
  .then((fileName) => { console.log(`Wrote ${fileName}`); })
  .catch((err) => { console.error("Failed:", err); process.exit(1); });
