// build-mitorx.js
// Regenerates MitoRX.pptx — 15-slide Series B investor deck.
//
// Usage:
//   npm install pptxgenjs
//   node build-mitorx.js
//
// Requires: ./icons/image1.png … image8.png (ship these alongside this file)

const pptxgen = require("pptxgenjs");
const path = require("path");

const ICON_DIR = path.join(__dirname, "icons");
const ICONS = {
  target:      path.join(ICON_DIR, "image1.png"), // teal target/bullseye
  check:       path.join(ICON_DIR, "image2.png"), // teal check-circle
  heart:       path.join(ICON_DIR, "image3.png"), // teal heart
  star:        path.join(ICON_DIR, "image4.png"), // orange star
  arrow:       path.join(ICON_DIR, "image5.png"), // orange arrow-right
  chartLine:   path.join(ICON_DIR, "image6.png"), // white chart-line (used on teal circle)
  microscope:  path.join(ICON_DIR, "image7.png"), // white microscope
  flask:       path.join(ICON_DIR, "image8.png"), // white flask
};

// ---------- Color palette (all confirmed from source XML) ----------
const C = {
  navy:       "0A1628",
  darkTeal:   "0D9488", // header bar
  teal:       "14B8A6", // accent stripe, highlights
  tealDark:   "0B5563", // pipeline header row
  lightTeal:  "CCFBF1", // subtitle text on header
  cardBg:     "E8F3F1", // card fill
  cardBg2:    "F1F5F9", // alt row fill
  cardBorder: "D1D5DB",
  orange:     "F59E0B",
  orangeDk:   "D97706",
  white:      "FFFFFF",
  slate900:   "0F172A", // body text
  slate700:   "334155",
  slate500:   "64748B",
  slate400:   "94A3B8",
  slate300:   "CBD5E1",
  blue:       "3B82F6", // cardiovascular
  blueLt:     "60A5FA",
  purple:     "8B5CF6", // neurodegeneration
  purpleLt:   "A78BFA",
  red:        "DC2626",
};

const FONT_H = "Georgia";
const FONT_B = "Calibri";

// ---------- Presentation setup ----------
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10" x 5.625"
pres.author = "MitoRx LLC";
pres.title  = "MitoRx Series B Investor Presentation";
const SW = 10, SH = 5.625;

// ---------- Reusable chrome ----------
// Teal header band on every content slide (slides 2-14)
function addHeader(slide, title, subtitle) {
  slide.background = { color: C.white };
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: SW, h: 0.95, fill: { color: C.darkTeal }, line: { color: C.darkTeal },
  });
  slide.addText(title, {
    x: 0.5, y: 0.1, w: 9, h: 0.55, margin: 0,
    fontFace: FONT_H, fontSize: 28, bold: true, color: C.white, valign: "middle",
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.5, y: 0.6, w: 9, h: 0.3, margin: 0,
      fontFace: FONT_B, fontSize: 13, color: C.lightTeal, valign: "middle",
    });
  }
}

// "KEY TAKEAWAY" dark-teal bar + italic footer ("MitoRx LLC | CONFIDENTIAL" + "N / 15")
function addFooter(slide, pageNum, takeaway) {
  // Takeaway bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 4.82, w: 9.2, h: 0.42,
    fill: { color: C.darkTeal }, line: { color: C.darkTeal },
  });
  slide.addText(
    [
      { text: "KEY TAKEAWAY:  ", options: { bold: true, color: C.orange, fontFace: FONT_B, fontSize: 12 } },
      { text: takeaway,          options: { color: C.white,  fontFace: FONT_B, fontSize: 12 } },
    ],
    { x: 0.55, y: 4.82, w: 8.9, h: 0.42, margin: 0, valign: "middle" }
  );
  // Page footer
  slide.addText("MitoRx LLC  |  CONFIDENTIAL", {
    x: 0.5, y: 5.32, w: 4, h: 0.25, margin: 0,
    fontFace: FONT_B, fontSize: 9, italic: true, color: C.slate500,
  });
  slide.addText(`${pageNum} / 15`, {
    x: 5.5, y: 5.32, w: 4, h: 0.25, margin: 0,
    fontFace: FONT_B, fontSize: 9, italic: true, color: C.slate500, align: "right",
  });
}

// ============================================================
// SLIDE 1 — Cover
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.navy };
  // Top teal stripe
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: SW, h: 0.06, fill: { color: C.teal }, line: { color: C.teal } });

  // "MitoRx" (white) + "LLC" (teal) — title
  s.addText("MitoRx", {
    x: 0.7, y: 1.15, w: 4.0, h: 0.7, margin: 0,
    fontFace: FONT_H, fontSize: 44, bold: true, color: C.white, valign: "middle",
  });
  s.addText("LLC", {
    x: 3.35, y: 1.15, w: 1.5, h: 0.7, margin: 0,
    fontFace: FONT_H, fontSize: 44, bold: true, color: C.teal, valign: "middle",
  });

  // Tagline
  s.addText("Mitochondria-Targeted Therapeutics for Unmet Medical Needs", {
    x: 0.7, y: 2.0, w: 7.0, h: 0.5, margin: 0,
    fontFace: FONT_B, fontSize: 18, color: C.lightTeal, valign: "middle",
  });

  // Orange accent line
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 2.7, w: 3.0, h: 0,
    line: { color: C.orange, width: 2 },
  });

  // Subtitle
  s.addText("Series B Financing  |  Investor Presentation", {
    x: 0.7, y: 2.9, w: 7, h: 0.4, margin: 0,
    fontFace: FONT_B, fontSize: 15, color: C.slate300, valign: "middle",
  });

  // 4 stat callouts
  const stats = [
    { big: "$30M",  label: "FUNDRAISE"      },
    { big: "$250M", label: "PRE-MONEY"      },
    { big: "6",     label: "PROGRAMS"       },
    { big: "3",     label: "DRUGS TO MARKET"},
  ];
  const statY = 3.7, statW = 2.1;
  stats.forEach((st, i) => {
    const x = 0.7 + i * 2.25;
    s.addText(st.big, {
      x: x, y: statY, w: statW, h: 0.55, margin: 0,
      fontFace: FONT_H, fontSize: 32, bold: true, color: C.orange, align: "left", valign: "middle",
    });
    s.addText(st.label, {
      x: x, y: statY + 0.55, w: statW, h: 0.3, margin: 0,
      fontFace: FONT_B, fontSize: 10, bold: true, color: C.slate400, charSpacing: 3, align: "left", valign: "middle",
    });
  });

  // Bottom footer: CONFIDENTIAL (left) + April 2026 (right)
  s.addText("CONFIDENTIAL", {
    x: 0.7, y: 5.25, w: 4, h: 0.25, margin: 0,
    fontFace: FONT_B, fontSize: 9, italic: true, color: C.slate500,
  });
  s.addText("April 2026", {
    x: 5.3, y: 5.25, w: 4, h: 0.25, margin: 0,
    fontFace: FONT_B, fontSize: 9, italic: true, color: C.slate500, align: "right",
  });
}

// ============================================================
// SLIDE 2 — Executive Summary
// ============================================================
{
  const s = pres.addSlide();
  addHeader(s, "Executive Summary", "Investment thesis and company overview");

  const rows = [
    { icon: ICONS.target, title: "Platform Technology",
      body: "Proprietary mitochondria-targeted drug delivery platform addressing root-cause biology across oncology, cardiovascular, and neurodegenerative diseases" },
    { icon: ICONS.check, title: "Robust Preclinical Data",
      body: "Validated across 5 species (cells, mice, rats, rabbits, dogs, baboons) with statistically significant efficacy in all 6 programs (p < 0.001)" },
    { icon: ICONS.heart, title: "Proven Leadership",
      body: "CEO (30 yrs translational experience), VP R&D, and CSO have collectively brought 3 drugs from bench to market approval" },
    { icon: ICONS.star, title: "Series B: $30M at $250M Valuation",
      body: "Funds allocated to IND-enabling studies for 2 lead candidates, lead optimization, pipeline advancement, and team expansion" },
  ];
  const startY = 1.15, rowH = 0.9;
  rows.forEach((r, i) => {
    const y = startY + i * rowH;
    s.addImage({ path: r.icon, x: 0.55, y: y, w: 0.5, h: 0.5 });
    s.addText(r.title, {
      x: 1.25, y: y - 0.02, w: 8.3, h: 0.35, margin: 0,
      fontFace: FONT_H, fontSize: 17, bold: true, color: C.slate900, valign: "middle",
    });
    s.addText(r.body, {
      x: 1.25, y: y + 0.33, w: 8.3, h: 0.5, margin: 0,
      fontFace: FONT_B, fontSize: 11, color: C.slate700, valign: "top",
    });
  });

  addFooter(s, 2, "Differentiated platform + strong multi-indication data + proven team with 3 drugs to market.");
}

// ============================================================
// SLIDE 3 — The Problem
// ============================================================
{
  const s = pres.addSlide();
  addHeader(s, "The Problem", "PLACEHOLDER");

  // Three stat cards
  const statCards = [
    { big: "1 in 5,000", label: "Primary mitochondrial\ndisease prevalence" },
    { big: ">90%",       label: "Cancers show\nmitochondrial defects" },
    { big: "$350B+",     label: "Combined TAM across\n3 therapeutic areas" },
  ];
  const cardY = 1.25, cardW = 2.75, cardH = 1.45, gap = 0.15;
  const totalW = 3 * cardW + 2 * gap;
  const startX = (SW - totalW) / 2;
  statCards.forEach((c, i) => {
    const x = startX + i * (cardW + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: cardY, w: cardW, h: cardH,
      fill: { color: C.white }, line: { color: C.teal, width: 2 },
    });
    s.addText(c.big, {
      x: x, y: cardY + 0.15, w: cardW, h: 0.65, margin: 0,
      fontFace: FONT_H, fontSize: 30, bold: true, color: C.slate900, align: "center", valign: "middle",
    });
    s.addText(c.label, {
      x: x + 0.1, y: cardY + 0.85, w: cardW - 0.2, h: 0.5, margin: 0,
      fontFace: FONT_B, fontSize: 11, color: C.slate700, align: "center", valign: "top",
    });
  });

  // Critical Unmet Needs header
  s.addText("Critical Unmet Needs", {
    x: 0.5, y: 2.95, w: 9, h: 0.4, margin: 0,
    fontFace: FONT_H, fontSize: 20, bold: true, color: C.orange, valign: "middle",
  });

  // Arrow bullet rows
  const needs = [
    "No FDA-approved drugs specifically targeting mitochondrial dysfunction mechanisms",
    "Current therapies address symptoms, not root-cause mitochondrial pathology",
    "PLACEHOLDER",
    "PLACEHOLDER",
  ];
  const needY = 3.45, needH = 0.32;
  needs.forEach((txt, i) => {
    const y = needY + i * needH;
    s.addImage({ path: ICONS.arrow, x: 0.55, y: y + 0.04, w: 0.22, h: 0.22 });
    s.addText(txt, {
      x: 0.95, y: y, w: 8.8, h: needH, margin: 0,
      fontFace: FONT_B, fontSize: 12, color: C.slate700, valign: "middle",
    });
  });

  addFooter(s, 3, "Undrugged target class with >$350B TAM and zero approved mitochondria-targeted therapies.");
}

// ============================================================
// SLIDE 4 — Our Solution
// ============================================================
{
  const s = pres.addSlide();
  addHeader(s, "Our Solution", "Proprietary mitochondria-targeted drug delivery platform");

  // Two cream cards
  const cardY = 1.2, cardH = 3.45;
  const cardLX = 0.4, cardRX = 5.1, cardW = 4.5;
  [cardLX, cardRX].forEach(x => {
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: cardW, h: cardH,
      fill: { color: C.cardBg }, line: { type: "none" },
    });
  });

  // Left card: Platform Tech
  s.addText("MitoRx Platform Technology", {
    x: cardLX + 0.25, y: cardY + 0.15, w: cardW - 0.5, h: 0.4, margin: 0,
    fontFace: FONT_H, fontSize: 18, bold: true, color: C.darkTeal, valign: "middle",
  });
  const platformPts = [
    "Lipophilic cation conjugation drives mitochondrial membrane accumulation (100-500x enrichment)",
    "PLACEHOLDER",
    "PLACEHOLDER",
    "Multi-species PK/PD confirms slow clearance and enhanced target-site accumulation",
    "Demonstrated oral bioavailability enabling convenient once-daily dosing regimen",
  ];
  const ptStartY = cardY + 0.65, ptH = 0.52;
  platformPts.forEach((p, i) => {
    const y = ptStartY + i * ptH;
    s.addImage({ path: ICONS.check, x: cardLX + 0.2, y: y + 0.02, w: 0.24, h: 0.24 });
    s.addText(p, {
      x: cardLX + 0.55, y: y, w: cardW - 0.75, h: ptH - 0.05, margin: 0,
      fontFace: FONT_B, fontSize: 10.5, color: C.slate700, valign: "top",
    });
  });

  // Right card: Competitive Advantages
  s.addText("Competitive Advantages", {
    x: cardRX + 0.25, y: cardY + 0.15, w: cardW - 0.5, h: 0.4, margin: 0,
    fontFace: FONT_H, fontSize: 18, bold: true, color: C.darkTeal, valign: "middle",
  });
  const adv = [
    { bold: "First-mover advantage",       rest: " in mitochondria-targeted therapeutics" },
    { bold: "Broad IP portfolio",          rest: " with composition-of-matter patents" },
    { bold: "Platform approach",           rest: " enables rapid pipeline expansion" },
    { bold: "Multi-indication validation", rest: " de-risks the platform" },
    { bold: "Favorable safety profile",    rest: " across 5 preclinical species" },
  ];
  adv.forEach((a, i) => {
    const y = ptStartY + i * ptH;
    s.addImage({ path: ICONS.star, x: cardRX + 0.2, y: y + 0.02, w: 0.26, h: 0.26 });
    s.addText(
      [
        { text: a.bold, options: { bold: true, fontFace: FONT_B, fontSize: 11.5, color: C.slate900 } },
        { text: a.rest, options: {             fontFace: FONT_B, fontSize: 11.5, color: C.slate700 } },
      ],
      { x: cardRX + 0.6, y: y, w: cardW - 0.8, h: ptH - 0.05, margin: 0, valign: "middle" }
    );
  });

  addFooter(s, 4, "Platform achieves 100-500x mitochondrial enrichment with favorable PK across all tested species.");
}

// ============================================================
// SLIDE 5 — Pipeline Overview
// ============================================================
{
  const s = pres.addSlide();
  addHeader(s, "Pipeline Overview", "Six programs across three high-value therapeutic areas");

  // Table-style grid: header row + 6 program rows
  const tblX = 0.4, tblY = 1.2, tblW = 9.2;
  const colLabel = 1.5, dataW = (tblW - colLabel) / 5; // 5 stage columns
  const rowH = 0.42, headerH = 0.42;

  // Header row
  s.addShape(pres.shapes.RECTANGLE, {
    x: tblX, y: tblY, w: tblW, h: headerH,
    fill: { color: C.tealDark }, line: { type: "none" },
  });
  const stageLabels = ["PROGRAM", "DISCOVERY", "LEAD OPT.", "PRECLINICAL", "IND-ENABLING", "IND / PHASE I"];
  stageLabels.forEach((lbl, i) => {
    const x = i === 0 ? tblX : tblX + colLabel + (i - 1) * dataW;
    const w = i === 0 ? colLabel : dataW;
    s.addText(lbl, {
      x, y: tblY, w, h: headerH, margin: 0,
      fontFace: FONT_B, fontSize: 10, bold: true, color: C.white, charSpacing: 2, align: "center", valign: "middle",
    });
  });

  // Rows
  const programs = [
    { name: "MRX-101", indic: "Solid Tumors",    color: C.teal,   stages: 4, lead: true  },
    { name: "MRX-102", indic: "Hematological",   color: C.teal,   stages: 3, lead: false },
    { name: "MRX-201", indic: "Atherosclerosis", color: C.blue,   stages: 4, lead: true  },
    { name: "MRX-202", indic: "Heart Failure",   color: C.blue,   stages: 3, lead: false },
    { name: "MRX-301", indic: "Alzheimer's",     color: C.purple, stages: 3, lead: false },
    { name: "MRX-302", indic: "ALS/SOD1",        color: C.purple, stages: 3, lead: false },
  ];
  programs.forEach((p, ri) => {
    const y = tblY + headerH + ri * rowH;
    // Alt row fill
    if (ri % 2 === 0) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: tblX, y, w: tblW, h: rowH, fill: { color: C.cardBg2 }, line: { type: "none" },
      });
    }
    // Left color accent bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: tblX, y: y + 0.04, w: 0.08, h: rowH - 0.08,
      fill: { color: p.color }, line: { type: "none" },
    });
    // Program name + indication (two lines)
    s.addText(
      [
        { text: p.name,  options: { bold: true, fontFace: FONT_B, fontSize: 10.5, color: C.slate900, breakLine: true } },
        { text: p.indic, options: { bold: true, fontFace: FONT_B, fontSize: 10,   color: C.slate700 } },
      ],
      { x: tblX + 0.15, y: y, w: colLabel - 0.2, h: rowH, margin: 0, valign: "middle" }
    );
    // Stage bars
    for (let stg = 0; stg < 5; stg++) {
      const cx = tblX + colLabel + stg * dataW;
      const filled = stg < p.stages;
      const barX = cx + 0.1, barY = y + 0.1, barW = dataW - 0.2, barH = rowH - 0.2;
      if (filled) {
        s.addShape(pres.shapes.RECTANGLE, {
          x: barX, y: barY, w: barW, h: barH,
          fill: { color: p.color }, line: { type: "none" },
        });
      } else {
        s.addShape(pres.shapes.RECTANGLE, {
          x: barX, y: barY, w: barW, h: barH,
          fill: { color: C.white }, line: { color: C.slate300, width: 0.75 },
        });
      }
      // LEAD marker — on the last filled stage for "lead" programs
      if (p.lead && stg === p.stages - 1) {
        s.addText("LEAD", {
          x: barX, y: barY, w: barW, h: barH, margin: 0,
          fontFace: FONT_B, fontSize: 9, bold: true, color: C.white, align: "center", valign: "middle",
        });
      }
    }
  });

  // Legend row (below table)
  const legY = tblY + headerH + 6 * rowH + 0.15;
  const legItems = [
    { label: "Oncology",          color: C.teal   },
    { label: "Cardiovascular",    color: C.blue   },
    { label: "Neurodegeneration", color: C.purple },
  ];
  const legTotalW = 6.0;
  const legStartX = (SW - legTotalW) / 2;
  legItems.forEach((li, i) => {
    const x = legStartX + i * 2.0;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: legY + 0.07, w: 0.3, h: 0.16,
      fill: { color: li.color }, line: { type: "none" },
    });
    s.addText(li.label, {
      x: x + 0.4, y: legY, w: 1.6, h: 0.3, margin: 0,
      fontFace: FONT_B, fontSize: 12, color: C.slate700, valign: "middle",
    });
  });

  addFooter(s, 5, "Two lead candidates IND-ready; 4 additional programs de-risk platform and expand opportunity.");
}

// ============================================================
// SLIDE 6 — Oncology (MRX-101)
// ============================================================
{
  const s = pres.addSlide();
  addHeader(s, "Oncology: Tumor Reduction Efficacy", "MRX-101 demonstrates >90% tumor reduction across multiple models");

  // Chart panel (left) — framed
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.15, w: 5.5, h: 3.45,
    fill: { color: C.white }, line: { color: C.slate300, width: 1 },
  });
  s.addChart(pres.charts.BAR, [
    { name: "Vehicle Control", labels: ["Week 1", "Week 2", "Week 3", "Week 4"], values: [100, 115, 135, 158] },
    { name: "MRX-101 (Low)",   labels: ["Week 1", "Week 2", "Week 3", "Week 4"], values: [100,  72,  45,  22] },
    { name: "MRX-101 (High)",  labels: ["Week 1", "Week 2", "Week 3", "Week 4"], values: [100,  58,  25,   8] },
  ], {
    x: 0.5, y: 1.25, w: 5.3, h: 3.25, barDir: "col",
    showTitle: true, title: "Tumor Volume (% of Baseline) Over 4 Weeks", titleFontSize: 12, titleFontFace: FONT_B, titleColor: C.slate700,
    chartColors: [C.slate400, C.teal, "134E4A"],
    catAxisLabelColor: C.slate700, catAxisLabelFontSize: 10, catAxisLabelFontFace: FONT_B,
    valAxisLabelColor: C.slate700, valAxisLabelFontSize: 10, valAxisLabelFontFace: FONT_B,
    valGridLine: { color: C.cardBorder, size: 0.5 }, catGridLine: { style: "none" },
    showLegend: true, legendPos: "b", legendFontSize: 10, legendColor: C.slate700, legendFontFace: FONT_B,
  });

  // Right metrics card (cream)
  const mX = 6.1, mY = 1.15, mW = 3.5, mH = 3.45;
  s.addShape(pres.shapes.RECTANGLE, {
    x: mX, y: mY, w: mW, h: mH,
    fill: { color: C.cardBg }, line: { color: C.darkTeal, width: 1 },
  });
  s.addText("Key Efficacy Metrics", {
    x: mX + 0.2, y: mY + 0.12, w: mW - 0.4, h: 0.35, margin: 0,
    fontFace: FONT_H, fontSize: 16, bold: true, color: C.darkTeal, valign: "middle",
  });
  const metrics = [
    { big: "92%",     title: "Tumor Reduction",   sub: "Mean reduction at Week 4 (high dose)" },
    { big: "35%",     title: "Complete Response", sub: "Complete tumor eradication in subset"  },
    { big: "2.8x",    title: "Survival Benefit",  sub: "Median OS improvement vs. control"     },
    { big: "p<0.001", title: "Statistical Sig.",  sub: "All endpoints vs. vehicle control"     },
  ];
  const metStartY = mY + 0.55, metH = 0.62;
  metrics.forEach((m, i) => {
    const y = metStartY + i * metH;
    s.addText(m.big, {
      x: mX + 0.15, y: y, w: 1.2, h: metH - 0.05, margin: 0,
      fontFace: FONT_H, fontSize: 22, bold: true, color: C.orange, valign: "middle",
    });
    s.addText(m.title, {
      x: mX + 1.4, y: y, w: mW - 1.55, h: 0.28, margin: 0,
      fontFace: FONT_B, fontSize: 11, bold: true, color: C.slate900, valign: "middle",
    });
    s.addText(m.sub, {
      x: mX + 1.4, y: y + 0.27, w: mW - 1.55, h: 0.3, margin: 0,
      fontFace: FONT_B, fontSize: 9, color: C.slate700, valign: "top",
    });
  });
  // Caption
  s.addText("n=24 per group  |  Xenograft models  |  3 independent studies", {
    x: mX + 0.15, y: mY + mH - 0.3, w: mW - 0.3, h: 0.25, margin: 0,
    fontFace: FONT_B, fontSize: 9, italic: true, color: C.slate700, align: "center", valign: "middle",
  });

  addFooter(s, 6, "MRX-101: 92% tumor reduction (p<0.001), 35% complete response across 3 independent studies.");
}

// ============================================================
// SLIDE 7 — Cardiovascular (MRX-201)
// ============================================================
{
  const s = pres.addSlide();
  addHeader(s, "Cardiovascular: Atherosclerotic Plaque Reduction", "MRX-201 shows significant plaque regression in disease models");

  // Chart panel (left)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.15, w: 5.5, h: 3.45,
    fill: { color: C.white }, line: { color: C.slate300, width: 1 },
  });
  s.addChart(pres.charts.LINE, [
    { name: "Vehicle Control",  labels: ["Baseline", "Week 4", "Week 8", "Week 12", "Week 16"], values: [100, 108, 118, 130, 142] },
    { name: "MRX-201 (10 mg/kg)", labels: ["Baseline", "Week 4", "Week 8", "Week 12", "Week 16"], values: [100,  88,  72,  58,  48] },
    { name: "MRX-201 (30 mg/kg)", labels: ["Baseline", "Week 4", "Week 8", "Week 12", "Week 16"], values: [100,  80,  60,  42,  32] },
  ], {
    x: 0.5, y: 1.25, w: 5.3, h: 3.25,
    showTitle: true, title: "Aortic Plaque Burden (% of Baseline)", titleFontSize: 12, titleFontFace: FONT_B, titleColor: C.slate700,
    chartColors: [C.slate400, C.blueLt, "1D4ED8"],
    lineDataSymbol: "circle", lineDataSymbolSize: 8, lineSize: 3,
    catAxisLabelColor: C.slate700, catAxisLabelFontSize: 10, catAxisLabelFontFace: FONT_B,
    valAxisLabelColor: C.slate700, valAxisLabelFontSize: 10, valAxisLabelFontFace: FONT_B,
    valGridLine: { color: C.cardBorder, size: 0.5 }, catGridLine: { style: "none" },
    showLegend: true, legendPos: "b", legendFontSize: 10, legendColor: C.slate700, legendFontFace: FONT_B,
  });

  // Right metrics card
  const mX = 6.1, mY = 1.15, mW = 3.5, mH = 3.45;
  s.addShape(pres.shapes.RECTANGLE, {
    x: mX, y: mY, w: mW, h: mH,
    fill: { color: C.cardBg }, line: { color: C.darkTeal, width: 1 },
  });
  s.addText("Key Efficacy Metrics", {
    x: mX + 0.2, y: mY + 0.12, w: mW - 0.4, h: 0.35, margin: 0,
    fontFace: FONT_H, fontSize: 16, bold: true, color: C.darkTeal, valign: "middle",
  });
  const metrics = [
    { big: "68%",     title: "Plaque Reduction", sub: "At 16 weeks (30 mg/kg dose)" },
    { big: "\u2193 74%", title: "Inflammation",  sub: "IL-6, TNF-a reduction in aortic tissue" },
    { big: "\u2193 45%", title: "Lipid Profile", sub: "oxLDL reduction vs. baseline" },
    { big: "p<0.001", title: "Statistical Sig.", sub: "Primary and secondary endpoints" },
  ];
  const metStartY = mY + 0.55, metH = 0.62;
  metrics.forEach((m, i) => {
    const y = metStartY + i * metH;
    s.addText(m.big, {
      x: mX + 0.15, y: y, w: 1.2, h: metH - 0.05, margin: 0,
      fontFace: FONT_H, fontSize: 22, bold: true, color: C.orange, valign: "middle",
    });
    s.addText(m.title, {
      x: mX + 1.4, y: y, w: mW - 1.55, h: 0.28, margin: 0,
      fontFace: FONT_B, fontSize: 11, bold: true, color: C.slate900, valign: "middle",
    });
    s.addText(m.sub, {
      x: mX + 1.4, y: y + 0.27, w: mW - 1.55, h: 0.3, margin: 0,
      fontFace: FONT_B, fontSize: 9, color: C.slate700, valign: "top",
    });
  });
  s.addText("ApoE-/- mice  |  n=20/group  |  High-fat diet model", {
    x: mX + 0.15, y: mY + mH - 0.3, w: mW - 0.3, h: 0.25, margin: 0,
    fontFace: FONT_B, fontSize: 9, italic: true, color: C.slate700, align: "center", valign: "middle",
  });

  addFooter(s, 7, "MRX-201: 68% plaque regression + 74% inflammatory marker reduction (p<0.001) in disease models.");
}

// ============================================================
// SLIDE 8 — Neurodegeneration (MRX-301)
// ============================================================
{
  const s = pres.addSlide();
  addHeader(s, "Neurodegeneration: Oxidative Stress & Inflammation", "Compelling neuroprotective activity in SOD1 disease models");

  // Chart panel
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.15, w: 5.5, h: 3.45,
    fill: { color: C.white }, line: { color: C.slate300, width: 1 },
  });
  s.addChart(pres.charts.BAR, [
    { name: "Vehicle Control", labels: ["ROS Levels", "8-OHdG", "IL-1B", "TNF-a", "Motor Score"], values: [100, 100, 100, 100, 35] },
    { name: "MRX-301 Treated", labels: ["ROS Levels", "8-OHdG", "IL-1B", "TNF-a", "Motor Score"], values: [ 28,  32,  22,  30, 78] },
  ], {
    x: 0.5, y: 1.25, w: 5.3, h: 3.25, barDir: "col",
    showTitle: true, title: "Biomarker Levels (% of Disease Control) and Motor Function", titleFontSize: 11, titleFontFace: FONT_B, titleColor: C.slate700,
    chartColors: [C.slate400, C.purpleLt],
    catAxisLabelColor: C.slate700, catAxisLabelFontSize: 10, catAxisLabelFontFace: FONT_B,
    valAxisLabelColor: C.slate700, valAxisLabelFontSize: 10, valAxisLabelFontFace: FONT_B,
    valGridLine: { color: C.cardBorder, size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.slate900, dataLabelFontSize: 9, dataLabelFontFace: FONT_B,
    showLegend: true, legendPos: "b", legendFontSize: 10, legendColor: C.slate700, legendFontFace: FONT_B,
  });

  // Right metrics card
  const mX = 6.1, mY = 1.15, mW = 3.5, mH = 3.45;
  s.addShape(pres.shapes.RECTANGLE, {
    x: mX, y: mY, w: mW, h: mH,
    fill: { color: C.cardBg }, line: { color: C.darkTeal, width: 1 },
  });
  s.addText("Key Efficacy Metrics", {
    x: mX + 0.2, y: mY + 0.12, w: mW - 0.4, h: 0.35, margin: 0,
    fontFace: FONT_H, fontSize: 16, bold: true, color: C.darkTeal, valign: "middle",
  });
  const metrics = [
    { big: "72%",     title: "ROS Reduction",    sub: "Reactive oxygen species in CNS tissue" },
    { big: "70-78%",  title: "Inflammation",     sub: "IL-1B and TNF-a in brain tissue" },
    { big: "2.2x",    title: "Motor Function",   sub: "Improvement in rotarod performance" },
    { big: "p<0.001", title: "Statistical Sig.", sub: "All biomarkers and functional endpoints" },
  ];
  const metStartY = mY + 0.55, metH = 0.62;
  metrics.forEach((m, i) => {
    const y = metStartY + i * metH;
    s.addText(m.big, {
      x: mX + 0.15, y: y, w: 1.2, h: metH - 0.05, margin: 0,
      fontFace: FONT_H, fontSize: 22, bold: true, color: C.orange, valign: "middle",
    });
    s.addText(m.title, {
      x: mX + 1.4, y: y, w: mW - 1.55, h: 0.28, margin: 0,
      fontFace: FONT_B, fontSize: 11, bold: true, color: C.slate900, valign: "middle",
    });
    s.addText(m.sub, {
      x: mX + 1.4, y: y + 0.27, w: mW - 1.55, h: 0.3, margin: 0,
      fontFace: FONT_B, fontSize: 9, color: C.slate700, valign: "top",
    });
  });
  s.addText("SOD1-G93A transgenic mice  |  n=18/group  |  12-week study", {
    x: mX + 0.15, y: mY + mH - 0.3, w: mW - 0.3, h: 0.25, margin: 0,
    fontFace: FONT_B, fontSize: 9, italic: true, color: C.slate700, align: "center", valign: "middle",
  });

  addFooter(s, 8, "MRX-301: 72% ROS reduction, >70% neuroinflammation decrease, 2.2x motor improvement (all p<0.001).");
}

// ============================================================
// SLIDE 9 — PK/PD
// ============================================================
{
  const s = pres.addSlide();
  addHeader(s, "Pharmacokinetics & Pharmacodynamics", "Favorable PK profile with enhanced target-site accumulation across species");

  // Left chart: Half-Life
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.1, w: 4.55, h: 2.2,
    fill: { color: C.white }, line: { color: C.slate300, width: 1 },
  });
  s.addChart(pres.charts.BAR, [
    { name: "T1/2", labels: ["Mouse", "Rat", "Rabbit", "Dog", "Baboon"], values: [4, 9, 14, 23, 29] },
  ], {
    x: 0.5, y: 1.2, w: 4.35, h: 2.05, barDir: "col",
    showTitle: true, title: "Half-Life Across Species (hours)", titleFontSize: 11, titleFontFace: FONT_B, titleColor: C.slate700,
    chartColors: [C.teal],
    catAxisLabelColor: C.slate700, catAxisLabelFontSize: 9, catAxisLabelFontFace: FONT_B,
    valAxisLabelColor: C.slate700, valAxisLabelFontSize: 9,  valAxisLabelFontFace: FONT_B,
    valGridLine: { color: C.cardBorder, size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.slate900, dataLabelFontSize: 9, dataLabelFontFace: FONT_B,
    showLegend: false,
  });

  // Right chart: Mitochondrial Accumulation
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.05, y: 1.1, w: 4.55, h: 2.2,
    fill: { color: C.white }, line: { color: C.slate300, width: 1 },
  });
  s.addChart(pres.charts.BAR, [
    { name: "Accumulation", labels: ["Liver", "Tumor", "Heart", "Brain", "Kidney"], values: [85, 320, 145, 42, 68] },
  ], {
    x: 5.15, y: 1.2, w: 4.35, h: 2.05, barDir: "col",
    showTitle: true, title: "Mitochondrial Accumulation Ratio by Tissue", titleFontSize: 11, titleFontFace: FONT_B, titleColor: C.slate700,
    chartColors: [C.orange],
    catAxisLabelColor: C.slate700, catAxisLabelFontSize: 9, catAxisLabelFontFace: FONT_B,
    valAxisLabelColor: C.slate700, valAxisLabelFontSize: 9,  valAxisLabelFontFace: FONT_B,
    valGridLine: { color: C.cardBorder, size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.slate900, dataLabelFontSize: 9, dataLabelFontFace: FONT_B,
    showLegend: false,
  });

  // PK table
  const hdrOpt = { bold: true, color: C.white, fill: { color: C.darkTeal }, fontFace: FONT_B, fontSize: 11, align: "center", valign: "middle" };
  const pRow   = { color: C.slate900, fill: { color: C.white },    fontFace: FONT_B, fontSize: 11, align: "center", valign: "middle" };
  const altRow = { color: C.slate900, fill: { color: C.cardBg2 },  fontFace: FONT_B, fontSize: 11, align: "center", valign: "middle" };
  const labelCell = { bold: true, color: C.slate900, fontFace: FONT_B, fontSize: 11, align: "left", valign: "middle" };
  const humanCell = (fill) => ({ bold: true, color: C.orange, fill: { color: fill }, fontFace: FONT_B, fontSize: 11, align: "center", valign: "middle" });

  const pkRows = [
    [
      { text: "PK Parameter", options: hdrOpt },
      { text: "Mouse",        options: hdrOpt },
      { text: "Rat",          options: hdrOpt },
      { text: "Dog",          options: hdrOpt },
      { text: "Baboon",       options: hdrOpt },
      { text: "Human (Proj.)",options: hdrOpt },
    ],
    [
      { text: "T1/2 (hr)",   options: { ...labelCell, fill: { color: C.white } } },
      { text: "4.2",         options: pRow },
      { text: "8.6",         options: pRow },
      { text: "22.8",        options: pRow },
      { text: "28.5",        options: pRow },
      { text: "32-40 (est.)",options: humanCell(C.white) },
    ],
    [
      { text: "Cmax (ug/mL)",options: { ...labelCell, fill: { color: C.cardBg2 } } },
      { text: "12.4",        options: altRow },
      { text: "18.7",        options: altRow },
      { text: "24.1",        options: altRow },
      { text: "28.3",        options: altRow },
      { text: "30-35 (est.)",options: humanCell(C.cardBg2) },
    ],
    [
      { text: "Vd (L/kg)",   options: { ...labelCell, fill: { color: C.white } } },
      { text: "2.1",         options: pRow },
      { text: "1.8",         options: pRow },
      { text: "1.5",         options: pRow },
      { text: "1.3",         options: pRow },
      { text: "1.1-1.3 (est.)", options: humanCell(C.white) },
    ],
    [
      { text: "AUC",         options: { ...labelCell, fill: { color: C.cardBg2 } } },
      { text: "48.2",        options: altRow },
      { text: "142",         options: altRow },
      { text: "386",         options: altRow },
      { text: "528",         options: altRow },
      { text: "600+ (est.)", options: humanCell(C.cardBg2) },
    ],
  ];
  s.addTable(pkRows, {
    x: 0.4, y: 3.4, w: 9.2, colW: [1.6, 1.35, 1.35, 1.35, 1.35, 2.2],
    rowH: 0.27, border: { pt: 0.5, color: C.cardBorder },
  });

  addFooter(s, 9, "Allometric scaling predicts 32-40 hr human half-life; 320x tumor accumulation supports therapeutic window.");
}

// ============================================================
// SLIDE 10 — Preclinical Safety
// ============================================================
{
  const s = pres.addSlide();
  addHeader(s, "Preclinical Safety & Tolerability", "PLACEHOLDER");

  // Safety table
  const hdr = { bold: true, color: C.white, fill: { color: C.darkTeal }, fontFace: FONT_B, fontSize: 11, align: "left", valign: "middle" };
  const cell = (alt) => ({ color: C.slate900, fill: { color: alt ? C.cardBg2 : C.white }, fontFace: FONT_B, fontSize: 10.5, align: "left", valign: "middle" });
  const cellC = (alt) => ({ color: C.slate900, fill: { color: alt ? C.cardBg2 : C.white }, fontFace: FONT_B, fontSize: 10.5, align: "center", valign: "middle" });
  const cellTI = (alt) => ({ bold: true, color: C.teal, fill: { color: alt ? C.cardBg2 : C.white }, fontFace: FONT_B, fontSize: 10.5, align: "center", valign: "middle" });
  const labelCell = (alt) => ({ bold: true, color: C.slate900, fill: { color: alt ? C.cardBg2 : C.white }, fontFace: FONT_B, fontSize: 10.5, align: "left", valign: "middle" });

  const safetyRows = [
    [
      { text: "Species",        options: hdr },
      { text: "NOAEL (mg/kg)",  options: { ...hdr, align: "center" } },
      { text: "MTD (mg/kg)",    options: { ...hdr, align: "center" } },
      { text: "TI (MTD/ED50)",  options: { ...hdr, align: "center" } },
      { text: "Key Findings",   options: hdr },
    ],
    [
      { text: "Mouse",  options: labelCell(false) },
      { text: "50",     options: cellC(false) },
      { text: "200",    options: cellC(false) },
      { text: ">25x",   options: cellTI(false) },
      { text: "No organ toxicity at NOAEL; mild, reversible hepatic changes at MTD", options: cell(false) },
    ],
    [
      { text: "Rat",    options: labelCell(true) },
      { text: "40",     options: cellC(true) },
      { text: "160",    options: cellC(true) },
      { text: ">20x",   options: cellTI(true) },
      { text: "No hematological effects; no reproductive toxicity signals", options: cell(true) },
    ],
    [
      { text: "Rabbit", options: labelCell(false) },
      { text: "35",     options: cellC(false) },
      { text: "120",    options: cellC(false) },
      { text: ">18x",   options: cellTI(false) },
      { text: "No cardiovascular QT prolongation; clean hERG profile", options: cell(false) },
    ],
    [
      { text: "Dog",    options: labelCell(true) },
      { text: "30",     options: cellC(true) },
      { text: "100",    options: cellC(true) },
      { text: ">15x",   options: cellTI(true) },
      { text: "No CNS effects; no GI toxicity; favorable tolerability", options: cell(true) },
    ],
    [
      { text: "Baboon", options: labelCell(false) },
      { text: "25",     options: cellC(false) },
      { text: "80",     options: cellC(false) },
      { text: ">12x",   options: cellTI(false) },
      { text: "Clean CBC, chemistry panels; no immunogenicity signals", options: cell(false) },
    ],
  ];
  s.addTable(safetyRows, {
    x: 0.4, y: 1.15, w: 9.2, colW: [1.2, 1.6, 1.4, 1.6, 3.4], rowH: 0.33,
    border: { pt: 0.5, color: C.cardBorder },
  });

  // Bottom left: TI chart
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 3.25, w: 5.3, h: 1.45,
    fill: { color: C.white }, line: { color: C.slate300, width: 1 },
  });
  s.addChart(pres.charts.BAR, [
    { name: "TI", labels: ["Mouse", "Rat", "Rabbit", "Dog", "Baboon"], values: [25, 20, 18, 15, 12] },
  ], {
    x: 0.5, y: 3.3, w: 5.1, h: 1.35, barDir: "col",
    showTitle: true, title: "Therapeutic Index (MTD / ED50)", titleFontSize: 10, titleFontFace: FONT_B, titleColor: C.slate700,
    chartColors: [C.teal],
    catAxisLabelColor: C.slate700, catAxisLabelFontSize: 9, catAxisLabelFontFace: FONT_B,
    valAxisLabelColor: C.slate700, valAxisLabelFontSize: 8, valAxisLabelFontFace: FONT_B,
    valGridLine: { color: C.cardBorder, size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.slate900, dataLabelFontSize: 9, dataLabelFontFace: FONT_B,
    showLegend: false,
  });

  // Bottom right: Safety Highlights
  const hX = 5.85, hY = 3.25, hW = 3.75, hH = 1.45;
  s.addShape(pres.shapes.RECTANGLE, {
    x: hX, y: hY, w: hW, h: hH,
    fill: { color: C.cardBg }, line: { color: C.darkTeal, width: 1 },
  });
  s.addText("Safety Highlights", {
    x: hX + 0.15, y: hY + 0.05, w: hW - 0.3, h: 0.3, margin: 0,
    fontFace: FONT_H, fontSize: 14, bold: true, color: C.darkTeal, valign: "middle",
  });
  const highlights = [
    "No DLTs across all species tested",
    "Clean hERG and cardiovascular safety",
    "No immunogenicity or hypersensitivity",
    "Reversible findings only at supratherapeutic doses",
  ];
  highlights.forEach((h, i) => {
    const y = hY + 0.36 + i * 0.26;
    s.addImage({ path: ICONS.check, x: hX + 0.15, y: y + 0.02, w: 0.2, h: 0.2 });
    s.addText(h, {
      x: hX + 0.42, y, w: hW - 0.55, h: 0.24, margin: 0,
      fontFace: FONT_B, fontSize: 10.5, color: C.slate700, valign: "middle",
    });
  });

  addFooter(s, 10, "TI >12x across all species with no dose-limiting toxicities - wide safety margin for humans.");
}

// ============================================================
// SLIDE 11 — Competitive Landscape
// ============================================================
{
  const s = pres.addSlide();
  addHeader(s, "Competitive Landscape", "MitoRx occupies a unique position with first-mover advantage");

  const hdr = { bold: true, color: C.white, fill: { color: C.darkTeal }, fontFace: FONT_B, fontSize: 11, align: "center", valign: "middle" };
  const hdrL = { ...hdr, align: "left" };
  const labelCell = { bold: true, color: C.slate900, fill: { color: C.white }, fontFace: FONT_B, fontSize: 10.5, align: "left", valign: "middle" };
  const mitoCell = { bold: true, color: C.darkTeal, fill: { color: C.cardBg }, fontFace: FONT_B, fontSize: 10.5, align: "center", valign: "middle" };
  const okCell   = { color: C.slate900, fill: { color: C.white }, fontFace: FONT_B, fontSize: 10.5, align: "center", valign: "middle" };
  const badCell  = { color: C.red,      fill: { color: C.white }, fontFace: FONT_B, fontSize: 10.5, align: "center", valign: "middle" };
  const warnCell = { color: C.orangeDk, fill: { color: C.white }, fontFace: FONT_B, fontSize: 10.5, align: "center", valign: "middle" };

  const compRows = [
    [
      { text: "Capability",              options: hdrL },
      { text: "MitoRx",                  options: hdr  },
      { text: "Traditional\nSmall Molecule", options: hdr  },
      { text: "Antibody-Drug\nConjugates",  options: hdr  },
      { text: "Gene\nTherapy",           options: hdr  },
    ],
    [
      { text: "Mitochondrial targeting", options: labelCell },
      { text: "Direct",                  options: mitoCell },
      { text: "No",                      options: badCell },
      { text: "No",                      options: badCell },
      { text: "Limited",                 options: warnCell },
    ],
    [
      { text: "Multi-indication platform", options: labelCell },
      { text: "6 programs",              options: mitoCell },
      { text: "1-2 typical",             options: warnCell },
      { text: "1-2 typical",             options: warnCell },
      { text: "Single gene",             options: badCell },
    ],
    [
      { text: "Oral bioavailability",    options: labelCell },
      { text: "Yes",                     options: mitoCell },
      { text: "Yes",                     options: okCell },
      { text: "IV only",                 options: badCell },
      { text: "IV only",                 options: badCell },
    ],
    [
      { text: "Manufacturing complexity",options: labelCell },
      { text: "Low",                     options: mitoCell },
      { text: "Low",                     options: okCell },
      { text: "High",                    options: badCell },
      { text: "Very high",               options: badCell },
    ],
    [
      { text: "Redosing flexibility",    options: labelCell },
      { text: "Daily",                   options: mitoCell },
      { text: "Daily",                   options: okCell },
      { text: "Q3W",                     options: warnCell },
      { text: "Single dose",             options: badCell },
    ],
    [
      { text: "Safety profile",          options: labelCell },
      { text: "TI >12x",                 options: mitoCell },
      { text: "Variable",                options: warnCell },
      { text: "Toxicity risk",           options: badCell },
      { text: "Immunogenicity",          options: badCell },
    ],
    [
      { text: "Cost of goods",           options: labelCell },
      { text: "Low",                     options: mitoCell },
      { text: "Low",                     options: okCell },
      { text: "High",                    options: badCell },
      { text: "Very high",               options: badCell },
    ],
  ];
  s.addTable(compRows, {
    x: 0.4, y: 1.15, w: 9.2, colW: [2.6, 1.5, 1.7, 1.7, 1.7], rowH: 0.4,
    border: { pt: 0.5, color: C.cardBorder },
  });

  addFooter(s, 11, "Only orally bioavailable, low-cost mitochondrial targeting platform validated across 3 therapeutic areas.");
}

// ============================================================
// SLIDE 12 — IP & Regulatory
// ============================================================
{
  const s = pres.addSlide();
  addHeader(s, "Intellectual Property & Regulatory Strategy", "Strong IP moat with clear regulatory pathway to IND");

  // Two cream cards
  const cardY = 1.15, cardH = 3.5;
  const lX = 0.4, rX = 5.1, cardW = 4.5;
  [lX, rX].forEach(x => {
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: cardW, h: cardH,
      fill: { color: C.cardBg }, line: { type: "none" },
    });
  });

  // Left: IP portfolio
  s.addText("Intellectual Property Portfolio", {
    x: lX + 0.25, y: cardY + 0.12, w: cardW - 0.5, h: 0.4, margin: 0,
    fontFace: FONT_H, fontSize: 17, bold: true, color: C.darkTeal, valign: "middle",
  });
  const ipItems = [
    { bold: "12 Patent Families Filed",   rest: "  Covering composition of matter, methods of use, and formulation" },
    { bold: "3 Patents Granted",          rest: "  Core platform technology and lead compound structures" },
    { bold: "Protection Through 2042+",   rest: "  20+ years of exclusivity for lead candidates" },
    { bold: "Global Coverage",            rest: "  US, EU, Japan, China, and 15 additional jurisdictions" },
    { bold: "Trade Secrets",              rest: "  Proprietary synthetic routes and manufacturing processes" },
  ];
  const ipStartY = cardY + 0.6, ipH = 0.56;
  ipItems.forEach((it, i) => {
    const y = ipStartY + i * ipH;
    s.addImage({ path: ICONS.check, x: lX + 0.25, y: y + 0.02, w: 0.22, h: 0.22 });
    s.addText(
      [
        { text: it.bold, options: { bold: true, fontFace: FONT_B, fontSize: 11, color: C.slate900 } },
        { text: it.rest, options: {             fontFace: FONT_B, fontSize: 10.5, color: C.slate700 } },
      ],
      { x: lX + 0.55, y, w: cardW - 0.75, h: ipH - 0.05, margin: 0, valign: "top" }
    );
  });

  // Right: IND-Enabling Strategy (numbered steps in orange circles)
  s.addText("IND-Enabling Strategy", {
    x: rX + 0.25, y: cardY + 0.12, w: cardW - 0.5, h: 0.4, margin: 0,
    fontFace: FONT_H, fontSize: 17, bold: true, color: C.darkTeal, valign: "middle",
  });
  const steps = [
    { n: "1", title: "GLP Tox Studies",   sub: "Q3 2026 - Q1 2027  |  28-day rat and dog studies" },
    { n: "2", title: "GMP Manufacturing", sub: "Q3 2026 - Q2 2027  |  Scale-up and validation batches" },
    { n: "3", title: "IND Package",       sub: "Q2 - Q3 2027  |  CMC, pharmacology, toxicology" },
    { n: "4", title: "IND Filing",        sub: "Q4 2027  |  Target MRX-101 first, MRX-201 Q1 2028" },
    { n: "5", title: "Phase I Initiation",sub: "Q1 2028  |  First-in-human dose escalation" },
  ];
  const stepStartY = cardY + 0.6, stepH = 0.56;
  steps.forEach((st, i) => {
    const y = stepStartY + i * stepH;
    // Orange numbered circle
    s.addShape(pres.shapes.OVAL, {
      x: rX + 0.2, y: y + 0.02, w: 0.32, h: 0.32,
      fill: { color: C.orange }, line: { type: "none" },
    });
    s.addText(st.n, {
      x: rX + 0.2, y: y + 0.02, w: 0.32, h: 0.32, margin: 0,
      fontFace: FONT_B, fontSize: 12, bold: true, color: C.white, align: "center", valign: "middle",
    });
    s.addText(st.title, {
      x: rX + 0.62, y: y - 0.02, w: cardW - 0.8, h: 0.28, margin: 0,
      fontFace: FONT_B, fontSize: 11.5, bold: true, color: C.slate900, valign: "middle",
    });
    s.addText(st.sub, {
      x: rX + 0.62, y: y + 0.22, w: cardW - 0.8, h: 0.28, margin: 0,
      fontFace: FONT_B, fontSize: 10, color: C.slate700, valign: "top",
    });
  });

  addFooter(s, 12, "12 patent families through 2042+ with defined IND pathway targeting first-in-human dosing Q1 2028.");
}

// ============================================================
// SLIDE 13 — Leadership Team
// ============================================================
{
  const s = pres.addSlide();
  addHeader(s, "Leadership Team", "Proven track record: 3 drugs brought from bench to market");

  const leaders = [
    { title: "Chief Executive Officer",           badge: "30 yrs  |  3 FDA Approvals",
      body: "Three decades of experience translating technologies from bench to bedside. Led 3 successful drug approvals. Previously held senior leadership roles at top-10 pharma companies. Deep relationships with FDA reviewers and global regulatory agencies.",
      icon: ICONS.chartLine },
    { title: "VP of Research &\nDevelopment",     badge: "R&D Expert  |  IND Specialist",
      body: "Extensive biotech R&D leadership with expertise in preclinical development, IND submissions, and fundraising. Key contributor to 3 marketed drugs. Proven track record in investor presentations and strategic partnerships with big pharma.",
      icon: ICONS.microscope },
    { title: "Chief Scientific Officer",          badge: "Pioneer  |  100+ Papers",
      body: "World-renowned expert in mitochondrial biology and drug targeting. Published 100+ peer-reviewed papers. Co-inventor on core MitoRx platform patents. Led scientific strategy for 3 successful drug programs from discovery to approval.",
      icon: ICONS.flask },
  ];

  const cardY = 1.15, cardH = 3.5, cardW = 2.95, gap = 0.2;
  const totalW = 3 * cardW + 2 * gap;
  const startX = (SW - totalW) / 2;

  leaders.forEach((l, i) => {
    const x = startX + i * (cardW + gap);
    // Card bg
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: cardW, h: cardH,
      fill: { color: C.white }, line: { color: C.cardBorder, width: 1 },
    });
    // Top teal accent bar
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: cardW, h: 0.08,
      fill: { color: C.teal }, line: { type: "none" },
    });
    // Teal circle for icon
    const circleD = 0.9;
    const circleX = x + (cardW - circleD) / 2;
    s.addShape(pres.shapes.OVAL, {
      x: circleX, y: cardY + 0.3, w: circleD, h: circleD,
      fill: { color: C.darkTeal }, line: { type: "none" },
    });
    // Icon on top of circle
    s.addImage({ path: l.icon, x: circleX + 0.2, y: cardY + 0.5, w: 0.5, h: 0.5 });
    // Title (serif)
    s.addText(l.title, {
      x: x + 0.15, y: cardY + 1.3, w: cardW - 0.3, h: 0.6, margin: 0,
      fontFace: FONT_H, fontSize: 14, bold: true, color: C.slate900, align: "center", valign: "middle",
    });
    // Orange badge
    const badgeH = 0.3;
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.2, y: cardY + 1.95, w: cardW - 0.4, h: badgeH,
      fill: { color: C.orange }, line: { type: "none" },
    });
    s.addText(l.badge, {
      x: x + 0.2, y: cardY + 1.95, w: cardW - 0.4, h: badgeH, margin: 0,
      fontFace: FONT_B, fontSize: 10, bold: true, color: C.white, align: "center", valign: "middle",
    });
    // Body
    s.addText(l.body, {
      x: x + 0.2, y: cardY + 2.4, w: cardW - 0.4, h: 1.0, margin: 0,
      fontFace: FONT_B, fontSize: 10, color: C.slate700, align: "center", valign: "top",
    });
  });

  addFooter(s, 13, "Founding team: 3 drugs from discovery through FDA approval - rare proven combination in early biotech.");
}

// ============================================================
// SLIDE 14 — Use of Proceeds
// ============================================================
{
  const s = pres.addSlide();
  addHeader(s, "Series B: $30M Use of Proceeds", "PLACEHOLDER");

  // Pie chart
  s.addChart(pres.charts.PIE,
    [{
      name: "Allocation",
      labels: ["IND-Enabling Studies", "Lead Optimization", "Pipeline Advancement", "Team Expansion", "Operations & G&A"],
      values: [40, 20, 15, 15, 10],
    }],
    {
      x: 0.3, y: 1.1, w: 4.5, h: 3.4,
      chartColors: [C.darkTeal, "134E4A", C.teal, C.orange, C.slate400],
      showLegend: true, legendPos: "b", legendFontSize: 9, legendColor: C.slate700, legendFontFace: FONT_B,
      showPercent: false, showValue: true, dataLabelFontSize: 10, dataLabelColor: C.white, dataLabelFontFace: FONT_B,
      dataLabelFormatCode: "0%", dataLabelFormatScale: 0.01,
    }
  );

  // Right-side breakdown rows
  const rows = [
    { title: "IND-Enabling Studies",   pct: "40%", amt: "$12M",  desc: "GLP tox, GMP manufacturing, IND packages for MRX-101 & MRX-201" },
    { title: "Lead Optimization",      pct: "20%", amt: "$6M",   desc: "SAR studies, formulation development, analog screening" },
    { title: "Pipeline Advancement",   pct: "15%", amt: "$4.5M", desc: "Advance 4 additional programs through preclinical milestones" },
    { title: "Team Expansion",         pct: "15%", amt: "$4.5M", desc: "Hire 12-15 scientists, regulatory affairs, and BD professionals" },
    { title: "Operations & G&A",       pct: "10%", amt: "$3M",   desc: "Facilities, legal, patent prosecution, insurance" },
  ];
  const startY = 1.15, rowH = 0.68;
  const rX = 5.05, rW = 4.55;
  rows.forEach((r, i) => {
    const y = startY + i * rowH;
    s.addText(r.title, {
      x: rX, y, w: rW - 1.6, h: 0.3, margin: 0,
      fontFace: FONT_B, fontSize: 13, bold: true, color: C.slate900, valign: "middle",
    });
    s.addText(r.pct, {
      x: rX + rW - 1.6, y, w: 0.7, h: 0.3, margin: 0,
      fontFace: FONT_B, fontSize: 13, bold: true, color: C.darkTeal, align: "right", valign: "middle",
    });
    s.addText(r.amt, {
      x: rX + rW - 0.85, y, w: 0.85, h: 0.3, margin: 0,
      fontFace: FONT_B, fontSize: 13, bold: true, color: C.darkTeal, align: "right", valign: "middle",
    });
    s.addText(r.desc, {
      x: rX, y: y + 0.3, w: rW, h: 0.3, margin: 0,
      fontFace: FONT_B, fontSize: 10.5, color: C.slate700, valign: "top",
    });
  });

  // Runway callout bullet
  s.addText(
    [
      { text: "\u2022  ",                                                          options: { color: C.orange, bold: true, fontFace: FONT_B, fontSize: 11 } },
      { text: "24-month runway",                                                   options: { color: C.slate900, bold: true, fontFace: FONT_B, fontSize: 11 } },
      { text: " to dual IND filings - key Series C / partnership inflection points, positioning MitoRx for transformative value creation",
        options: { color: C.slate700, fontFace: FONT_B, fontSize: 11 } },
    ],
    { x: 0.6, y: 4.5, w: 9, h: 0.28, margin: 0, valign: "middle" }
  );

  addFooter(s, 14, "$30M funds 24-month runway to dual IND filings - major inflection for Series C or partnership.");
}

// ============================================================
// SLIDE 15 — Why MitoRx (closing, navy)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.navy };
  // Top teal stripe
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: SW, h: 0.06, fill: { color: C.teal }, line: { color: C.teal } });

  s.addText("Why MitoRx", {
    x: 0.7, y: 0.35, w: 9, h: 0.8, margin: 0,
    fontFace: FONT_H, fontSize: 40, bold: true, color: C.white, valign: "middle",
  });

  const reasons = [
    { n: "01", title: "Differentiated Platform",   desc: "Only mitochondria-targeted drug delivery platform in clinical development; first-mover advantage in a $350B+ market" },
    { n: "02", title: "Compelling Data Package",   desc: ">90% tumor reduction, 68% plaque regression, 72% ROS reduction - all p<0.001 across 5 preclinical species" },
    { n: "03", title: "Proven Team",               desc: "CEO, VP R&D, and CSO have collectively brought 3 drugs from bench to market; 30+ years translational experience" },
    { n: "04", title: "Clear Path to Value",       desc: "Dual IND filings within 24 months; defined regulatory strategy with pre-IND FDA engagement planned" },
    { n: "05", title: "Attractive Valuation",      desc: "$250M pre-money with significant upside: IND filing ~$500M+; Phase I data ~$1B+ based on comparable transactions" },
  ];
  const startY = 1.3, rowH = 0.65;
  reasons.forEach((r, i) => {
    const y = startY + i * rowH;
    s.addText(r.n, {
      x: 0.7, y, w: 0.8, h: 0.4, margin: 0,
      fontFace: FONT_H, fontSize: 24, bold: true, color: C.orange, valign: "middle",
    });
    s.addText(r.title, {
      x: 1.55, y, w: 8, h: 0.35, margin: 0,
      fontFace: FONT_H, fontSize: 17, bold: true, color: C.white, valign: "middle",
    });
    s.addText(r.desc, {
      x: 1.55, y: y + 0.32, w: 8, h: 0.3, margin: 0,
      fontFace: FONT_B, fontSize: 10.5, color: C.slate300, valign: "top",
    });
  });

  // Orange accent line
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 4.75, w: 3.0, h: 0,
    line: { color: C.orange, width: 2 },
  });

  // Series B closing line (teal)
  s.addText("Series B  |  $30M  |  $250M Pre-Money Valuation", {
    x: 0.7, y: 4.85, w: 9, h: 0.35, margin: 0,
    fontFace: FONT_B, fontSize: 16, bold: true, color: C.teal, valign: "middle",
  });
  // Footer
  s.addText("CONFIDENTIAL  |  MitoRx LLC  |  April 2026", {
    x: 0.7, y: 5.25, w: 9, h: 0.25, margin: 0,
    fontFace: FONT_B, fontSize: 9, italic: true, color: C.slate500, valign: "middle",
  });
}

// ---------- Write ----------
pres.writeFile({ fileName: "MitoRX.pptx" })
  .then(fn => console.log(`Created: ${fn}`))
  .catch(err => { console.error(err); process.exit(1); });
