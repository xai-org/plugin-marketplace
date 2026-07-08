// Rebuild v3: structural diversity, real charts, fewer boxes
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Orthopedics & PT Group";
pres.title = "Standardizing Patient Forms & Assessments";

const NAVY = "0F3B5C";
const NAVY_DARK = "082A44";
const TEAL = "2C8A9E";
const TEAL_LIGHT = "5FB3C4";
const TEAL_PALE = "C5E2E8";
const BG_LIGHT = "F5FAFB";
const BG_INSIGHT = "FFF8E1";
const WHITE = "FFFFFF";
const SLATE = "1E293B";
const SLATE_2 = "334155";
const MUTED = "64748B";
const HAIRLINE = "D9E2E8";
const RED = "C0392B";
const RED_PALE = "F4D7D2";
const GREEN = "1F9D55";
const GREEN_PALE = "C7E9D5";
const GOLD = "C9A227";
const GOLD_DARK = "8B6914";
const AMBER = "E08E0B";

const SW = 13.333, SH = 7.5;
const TOTAL = 17;

async function icon(IconCmp, color = NAVY, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconCmp, { color: "#" + color, size: String(size) })
  );
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + png.toString("base64");
}

function addFooter(slide, n, dark = false) {
  slide.addText(
    `CONFIDENTIAL  |  Orthopedics & PT Group — All-Staff Meeting  |  ${n} / ${TOTAL}`,
    { x: 0.5, y: SH - 0.32, w: SW - 1, h: 0.25, fontSize: 9, fontFace: "Calibri",
      color: dark ? "9CB3C9" : MUTED, align: "center", margin: 0 }
  );
}

// Lighter title — thin teal accent bar instead of full navy slab
function addLightTitle(slide, eyebrow, title) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 0.55, w: 0.5, h: 0.08, fill: { color: TEAL }, line: { color: TEAL }
  });
  slide.addText(eyebrow.toUpperCase(), {
    x: 1.2, y: 0.4, w: 11, h: 0.4, fontSize: 11, fontFace: "Calibri", bold: true,
    color: TEAL, charSpacing: 2.5, valign: "middle", margin: 0
  });
  slide.addText(title, {
    x: 0.6, y: 0.85, w: SW - 1.2, h: 1.0,
    fontSize: 24, fontFace: "Calibri", bold: true, color: NAVY,
    valign: "top", margin: 0, lineSpacingMultiple: 1.1
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 1.95, w: SW - 1.2, h: 0.02,
    fill: { color: HAIRLINE }, line: { color: HAIRLINE }
  });
}

function addInsight(slide, x, y, w, label, body) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: 0.7, fill: { color: BG_INSIGHT }, line: { color: BG_INSIGHT }
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.1, h: 0.7, fill: { color: GOLD }, line: { color: GOLD }
  });
  slide.addText([
    { text: label.toUpperCase() + "  ", options: { bold: true, color: GOLD_DARK, fontSize: 11, charSpacing: 1.5 } },
    { text: body, options: { color: SLATE, fontSize: 13 } },
  ], { x: x + 0.25, y, w: w - 0.4, h: 0.7, fontFace: "Calibri", valign: "middle", margin: 0 });
}

(async () => {

// =================================================================
// SLIDE 1 — TITLE (kept)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addShape(pres.shapes.OVAL, {
    x: SW - 4, y: -2, w: 6, h: 6, fill: { color: TEAL, transparency: 70 }, line: { color: NAVY }
  });
  s.addShape(pres.shapes.OVAL, {
    x: SW - 2.2, y: 4.2, w: 3.5, h: 3.5, fill: { color: TEAL_LIGHT, transparency: 80 }, line: { color: NAVY }
  });
  s.addText("CLINICAL OPERATIONS  |  Q2 2026", {
    x: 0.8, y: 1.6, w: 9, h: 0.4, fontSize: 14, fontFace: "Calibri", bold: true,
    color: TEAL_LIGHT, charSpacing: 3, margin: 0
  });
  s.addText("Standardizing Patient\nForms & Assessments", {
    x: 0.8, y: 2.2, w: 11, h: 2.4, fontSize: 56, fontFace: "Georgia", bold: true,
    color: WHITE, valign: "top", margin: 0, lineSpacingMultiple: 1.05
  });
  s.addText("One framework, one workflow, one source of truth — live across the practice in 12 weeks", {
    x: 0.8, y: 4.85, w: 11, h: 0.9, fontSize: 19, fontFace: "Calibri", italic: true,
    color: "CADCFC", margin: 0
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: SH - 0.9, w: SW, h: 0.9, fill: { color: NAVY_DARK }, line: { color: NAVY_DARK }
  });
  s.addText([
    { text: "All-Staff Meeting", options: { bold: true, color: WHITE } },
    { text: "    |    ", options: { color: TEAL_LIGHT } },
    { text: "Orthopedics & Physical Therapy Group", options: { color: "CADCFC" } },
  ], { x: 0.8, y: SH - 0.85, w: 11, h: 0.8, fontSize: 14, fontFace: "Calibri", valign: "middle", margin: 0 });
}

// =================================================================
// SLIDE 2 — AGENDA: horizontal track at top (NEW pattern)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addLightTitle(s, "Today's agenda  |  ~30 minutes",
    "Five sections will move us from today's fragmented intake\nto a fully standardized framework — live in 12 weeks");

  // Horizontal track — 5 stops along a line
  const items = [
    { n: "01", h: "The Problem", t: "What it's costing us today", time: "5 min", tx: 0.04 },
    { n: "02", h: "The Framework", t: "Six tools, one workflow", time: "8 min" },
    { n: "03", h: "Benefits", t: "What changes for everyone", time: "5 min" },
    { n: "04", h: "Implementation", t: "12-week rollout plan", time: "5 min" },
    { n: "05", h: "Your Role", t: "6-month KPIs + the ask", time: "7 min" },
  ];
  const trackY = 2.85;
  const trackX = 0.9;
  const trackW = SW - 1.8;
  // Track line
  s.addShape(pres.shapes.RECTANGLE, {
    x: trackX, y: trackY + 0.4, w: trackW, h: 0.04,
    fill: { color: TEAL_PALE }, line: { color: TEAL_PALE }
  });
  // Stops
  const stopGap = trackW / (items.length - 1);
  items.forEach((it, i) => {
    const cx = trackX + i * stopGap;
    s.addShape(pres.shapes.OVAL, {
      x: cx - 0.42, y: trackY, w: 0.84, h: 0.84,
      fill: { color: WHITE }, line: { color: TEAL, width: 3 }
    });
    s.addText(it.n, {
      x: cx - 0.42, y: trackY, w: 0.84, h: 0.84,
      fontSize: 16, fontFace: "Georgia", bold: true, color: NAVY,
      align: "center", valign: "middle", margin: 0
    });
    // Section name above
    s.addText(it.time.toUpperCase(), {
      x: cx - 1.0, y: trackY - 0.45, w: 2.0, h: 0.3,
      fontSize: 10, fontFace: "Calibri", bold: true, color: TEAL,
      align: "center", charSpacing: 1.5, margin: 0
    });
    // Title below
    s.addText(it.h, {
      x: cx - 1.2, y: trackY + 0.95, w: 2.4, h: 0.4,
      fontSize: 16, fontFace: "Calibri", bold: true, color: NAVY,
      align: "center", margin: 0
    });
    s.addText(it.t, {
      x: cx - 1.2 + (it.tx || 0), y: trackY + 1.35, w: 2.4, h: 0.5,
      fontSize: 12, fontFace: "Calibri", color: SLATE_2,
      align: "center", margin: 0, lineSpacingMultiple: 1.2
    });
  });

  // Bottom takeaways panel — full width, dark
  const pY = 5.3;
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: pY, w: SW - 1.2, h: 1.5, fill: { color: NAVY }, line: { color: NAVY }
  });
  s.addText("BY THE END OF THIS MEETING, YOU'LL LEAVE WITH:", {
    x: 0.85, y: pY + 0.18, w: SW - 1.7, h: 0.3, fontSize: 11, fontFace: "Calibri", bold: true,
    color: TEAL_LIGHT, charSpacing: 2, margin: 0
  });
  const takeaways = [
    { n: "1", t: "A shared understanding of the\nproblem and the framework" },
    { n: "2", t: "Clarity on which tools you'll use\nand what's expected of your role" },
    { n: "3", t: "A clear sense of the 12-week\ntimeline and next two weeks" },
  ];
  const tColW = (SW - 1.6) / 3;
  takeaways.forEach((tk, i) => {
    const tx = 0.8 + i * tColW;
    s.addText(tk.n, {
      x: tx, y: pY + 0.55, w: 0.5, h: 0.7,
      fontSize: 28, fontFace: "Georgia", bold: true, color: TEAL_LIGHT,
      valign: "top", margin: 0
    });
    s.addText(tk.t, {
      x: tx + 0.5, y: pY + 0.6, w: tColW - 0.7, h: 0.8,
      fontSize: 13, fontFace: "Calibri", color: "CADCFC",
      margin: 0, lineSpacingMultiple: 1.25
    });
  });

  addFooter(s, 2);
}

// =================================================================
// SLIDE 3 — PROBLEM as horizontal bar chart (NEW: real chart)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addLightTitle(s, "Diagnosis  |  March 2026 internal audit",
    "Three structural gaps are eroding patient experience and\noutcome visibility — and they affect nearly every visit");

  // Horizontal bar chart — % of visits affected
  s.addText("% OF VISITS AFFECTED BY EACH GAP", {
    x: 0.6, y: 2.25, w: 7, h: 0.3, fontSize: 11, fontFace: "Calibri", bold: true,
    color: MUTED, charSpacing: 1.5, margin: 0
  });

  s.addChart(pres.charts.BAR, [{
    name: "% of visits",
    labels: ["Inconsistent\nscreening", "Duplicated\nforms", "Documentation\nvariation"],
    values: [100, 87, 100],
  }], {
    x: 0.4, y: 2.6, w: 7.8, h: 4.2, barDir: "bar",
    chartColors: [TEAL],
    chartArea: { fill: { color: WHITE } },
    plotArea: { fill: { color: WHITE } },
    catAxisLabelColor: NAVY, catAxisLabelFontSize: 13, catAxisLabelFontBold: true,
    valAxisLabelColor: MUTED, valAxisLabelFontSize: 10,
    valAxisMinVal: 0, valAxisMaxVal: 100,
    valGridLine: { color: HAIRLINE, size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd",
    dataLabelColor: NAVY, dataLabelFontSize: 14, dataLabelFontBold: true,
    dataLabelFormatCode: "0\\%",
    showLegend: false,
    barGapWidthPct: 60,
  });

  // Right side — supporting detail per gap, no boxes
  const gaps = [
    { color: RED, h: "Inconsistent screening",
      t: "All 4 providers use a different pain scale (VAS, NRS, custom). Outcomes can't be compared." },
    { color: AMBER, h: "Duplicated forms",
      t: "Patients fill 2-3 overlapping intake forms across visits — 30% of fields collected twice." },
    { color: NAVY, h: "Documentation variation",
      t: "Zero providers use a shared eval template — making chart-pulls and audits painful." },
  ];
  let gy = 2.6;
  gaps.forEach((g, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 8.4, y: gy + 0.05, w: 0.08, h: 1.05,
      fill: { color: g.color }, line: { color: g.color }
    });
    s.addText(g.h, {
      x: 8.6, y: gy, w: 4.3, h: 0.4,
      fontSize: 16, fontFace: "Calibri", bold: true, color: NAVY, margin: 0
    });
    s.addText(g.t, {
      x: 8.6, y: gy + 0.42, w: 4.3, h: 0.85,
      fontSize: 13, fontFace: "Calibri", color: SLATE_2,
      margin: 0, lineSpacingMultiple: 1.3
    });
    gy += 1.4;
  });

  s.addText("Source: Internal practice audit (n=240 visits across 4 providers, March 1–28, 2026)", {
    x: 0.6, y: SH - 0.6, w: SW - 1.2, h: 0.25, fontSize: 9, fontFace: "Calibri",
    italic: true, color: MUTED, align: "center", margin: 0
  });

  addFooter(s, 3);
}

// =================================================================
// SLIDE 4 — DOUGHNUT: where the 15 minutes goes (NEW)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addLightTitle(s, "Impact by the numbers",
    "Of the ~15 minutes of admin per patient, two-thirds is pure\nredundancy — repeating history and re-keying data");

  // Doughnut on the left
  s.addText("WHERE THE 15 MINUTES GOES", {
    x: 0.6, y: 2.25, w: 7, h: 0.3, fontSize: 11, fontFace: "Calibri", bold: true,
    color: MUTED, charSpacing: 1.5, margin: 0
  });

  s.addChart(pres.charts.DOUGHNUT, [{
    name: "Time breakdown",
    labels: ["Repeating history (6 min)", "Filling redundant forms (5 min)", "Admin re-entry (3 min)", "Other (1 min)"],
    values: [6, 5, 3, 1],
  }], {
    x: 0.5, y: 2.5, w: 6.5, h: 4.7,
    chartColors: [NAVY, TEAL, TEAL_LIGHT, HAIRLINE],
    chartArea: { fill: { color: WHITE } },
    plotArea: { fill: { color: WHITE } },
    showLegend: true, legendPos: "b", legendFontSize: 11, legendColor: SLATE,
    showValue: false,
    dataLabelColor: WHITE, dataLabelFontSize: 12, dataLabelFontBold: true,
    holeSize: 65,
    showTitle: false,
  });

  // Center label inside doughnut
  s.addText("~15", {
    x: 2.0, y: 4.0, w: 3.5, h: 0.6,
    fontSize: 36, fontFace: "Georgia", bold: true, color: NAVY,
    align: "center", margin: 0
  });
  s.addText("minutes / patient", {
    x: 2.0, y: 4.55, w: 3.5, h: 0.3,
    fontSize: 11, fontFace: "Calibri", color: MUTED,
    align: "center", margin: 0
  });

  // Right side — 4 stacked stat rows
  const stats = [
    { n: "5+", l: "different intake forms in use today", bench: "Best practice: 1" },
    { n: "30%", l: "of patient data is captured redundantly", bench: "Target: <5%" },
    { n: "3×", l: "patients repeat history per visit", bench: "Target: 1×" },
    { n: "60", l: "staff hours per week burned on admin", bench: "= 1.5 FTEs of waste" },
  ];
  let y = 2.55;
  const rowH = 0.95;
  stats.forEach((st, i) => {
    s.addText(st.n, {
      x: 7.4, y, w: 1.8, h: rowH - 0.1,
      fontSize: 38, fontFace: "Georgia", bold: true, color: TEAL,
      valign: "middle", margin: 0
    });
    s.addText(st.l, {
      x: 9.3, y: y + 0.05, w: 4.0, h: 0.4,
      fontSize: 14, fontFace: "Calibri", bold: true, color: NAVY,
      valign: "middle", margin: 0
    });
    s.addText(st.bench, {
      x: 9.3, y: y + 0.42, w: 4.0, h: 0.35,
      fontSize: 11, fontFace: "Calibri", italic: true, color: TEAL,
      valign: "middle", margin: 0
    });
    if (i < stats.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 7.4, y: y + rowH - 0.05, w: 5.4, h: 0.01,
        fill: { color: HAIRLINE }, line: { color: HAIRLINE }
      });
    }
    y += rowH;
  });

  s.addText("Source: Internal practice audit, March 2026 (n=240 visits, 4 providers)", {
    x: 0.6, y: SH - 0.6, w: SW - 1.2, h: 0.25, fontSize: 9, fontFace: "Calibri",
    italic: true, color: MUTED, align: "center", margin: 0
  });

  addFooter(s, 4);
}

// =================================================================
// SLIDE 5 — DATA REDUNDANCY HEATMAP (NEW pattern, no pipeline)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addLightTitle(s, "The redundancy problem  |  current state",
    "The same patient information is captured up to 4 times across\na single visit — with no shared baseline at any point");

  // Heatmap grid: 8 data fields × 4 touchpoints
  const fields = [
    "Demographics", "Insurance info", "Chief complaint",
    "Pain rating", "Medical history", "Medications",
    "Functional limits", "Goals of care",
  ];
  const stages = ["Check-In", "PT Eval", "Ortho Referral", "Ortho Eval"];
  // X = collected (creates redundancy), - = not collected
  const matrix = [
    [1, 1, 1, 1], // demographics — collected everywhere
    [1, 1, 1, 1], // insurance
    [1, 1, 1, 1], // chief complaint
    [1, 1, 1, 1], // pain — and with DIFFERENT scales
    [0, 1, 1, 1], // history
    [1, 1, 1, 1], // meds
    [0, 1, 0, 1], // functional
    [0, 1, 0, 1], // goals
  ];

  const gridX = 5.5, gridY = 2.55;
  const cellW = 1.55, cellH = 0.5;
  const labelW = 2.4;

  // Column headers
  stages.forEach((st, j) => {
    s.addText(st, {
      x: gridX + j * cellW, y: gridY - 0.45, w: cellW, h: 0.4,
      fontSize: 12, fontFace: "Calibri", bold: true, color: NAVY,
      align: "center", margin: 0
    });
  });

  // Row labels + cells
  fields.forEach((f, i) => {
    const ry = gridY + i * cellH;
    s.addText(f, {
      x: gridX - labelW - 0.1, y: ry, w: labelW, h: cellH,
      fontSize: 12, fontFace: "Calibri", color: SLATE_2,
      align: "right", valign: "middle", margin: 0
    });
    matrix[i].forEach((v, j) => {
      const cx = gridX + j * cellW;
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx + 0.04, y: ry + 0.04, w: cellW - 0.08, h: cellH - 0.08,
        fill: { color: v ? TEAL : BG_LIGHT },
        line: { color: WHITE, width: 1 }
      });
      if (v) {
        s.addText("✕", {
          x: cx, y: ry, w: cellW, h: cellH,
          fontSize: 16, fontFace: "Calibri", bold: true, color: WHITE,
          align: "center", valign: "middle", margin: 0
        });
      }
    });
  });

  // Legend
  s.addShape(pres.shapes.RECTANGLE, {
    x: gridX, y: gridY + 8 * cellH + 0.15, w: 0.25, h: 0.2,
    fill: { color: TEAL }, line: { color: TEAL }
  });
  s.addText("✕  Field collected (creates redundant data entry)", {
    x: gridX + 0.35, y: gridY + 8 * cellH + 0.1, w: 5, h: 0.3,
    fontSize: 10, fontFace: "Calibri", italic: true, color: MUTED,
    valign: "middle", margin: 0
  });

  // Left side — call-out + summary stats
  s.addText("THE SAME 6 FIELDS,\nCOLLECTED 3-4 TIMES.", {
    x: 0.6, y: 2.55, w: 2.3, h: 1.4,
    fontSize: 20, fontFace: "Georgia", bold: true, color: NAVY,
    margin: 0, lineSpacingMultiple: 1.1
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 4.0, w: 0.8, h: 0.05, fill: { color: TEAL }, line: { color: TEAL }
  });
  s.addText("Pain ratings are captured with DIFFERENT scales at each step (VAS, NRS, custom) — making them impossible to compare.", {
    x: 0.6, y: 4.15, w: 2.3, h: 1.5,
    fontSize: 12, fontFace: "Calibri", color: SLATE,
    margin: 0, lineSpacingMultiple: 1.35
  });
  s.addText("28", {
    x: 0.6, y: 5.7, w: 1.0, h: 0.6,
    fontSize: 38, fontFace: "Georgia", bold: true, color: TEAL, margin: 0
  });
  s.addText("redundant\nfield captures\nper visit", {
    x: 1.55, y: 5.75, w: 1.4, h: 0.7,
    fontSize: 11, fontFace: "Calibri", color: SLATE_2,
    margin: 0, lineSpacingMultiple: 1.2
  });

  addInsight(s, 0.6, 6.55, SW - 1.2, "Result",
    "No shared baseline exists at any step — outcomes can't be tracked, and patients pay the cost in redundancy and friction.");

  addFooter(s, 5);
}

// =================================================================
// SLIDE 6 — SOLUTION (full-bleed dark, kept)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addShape(pres.shapes.OVAL, {
    x: -2, y: 3, w: 6, h: 6, fill: { color: TEAL, transparency: 75 }, line: { color: NAVY }
  });
  s.addShape(pres.shapes.OVAL, {
    x: SW - 3, y: -2, w: 5, h: 5, fill: { color: TEAL_LIGHT, transparency: 85 }, line: { color: NAVY }
  });
  s.addText("THE SOLUTION", {
    x: 0.8, y: 1.4, w: 6, h: 0.4, fontSize: 14, fontFace: "Calibri", bold: true,
    color: TEAL_LIGHT, charSpacing: 3, margin: 0
  });
  s.addText("One framework will replace 5+ intake variants\nwith a single source of truth for every patient.", {
    x: 0.8, y: 1.95, w: SW - 1.6, h: 2.6,
    fontSize: 40, fontFace: "Georgia", bold: true, color: WHITE,
    valign: "top", margin: 0, lineSpacingMultiple: 1.1
  });

  const ic1 = await icon(fa.FaClipboardCheck, TEAL_LIGHT, 256);
  const ic2 = await icon(fa.FaUsers, TEAL_LIGHT, 256);
  const ic3 = await icon(fa.FaChartLine, TEAL_LIGHT, 256);
  const pillars = [
    { ic: ic1, h: "Validated tools", t: "Six evidence-based assessments — DASH, LEFS, ODI, NDI, NRS, PSFS" },
    { ic: ic2, h: "Unified workflow", t: "One five-stage process with clear ownership at every handoff" },
    { ic: ic3, h: "Outcome tracking", t: "Quantified patient progress — payer-ready and audit-ready" },
  ];
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 5.3, w: SW - 1.6, h: 0.02,
    fill: { color: TEAL_LIGHT, transparency: 50 }, line: { color: NAVY }
  });
  const pcolW = (SW - 1.6) / 3;
  pillars.forEach((p, i) => {
    const x = 0.8 + i * pcolW;
    s.addImage({ data: p.ic, x: x + 0.2, y: 5.6, w: 0.65, h: 0.65 });
    s.addText(p.h, {
      x: x + 1.05, y: 5.55, w: pcolW - 1.1, h: 0.4,
      fontSize: 19, fontFace: "Calibri", bold: true, color: WHITE, margin: 0
    });
    s.addText(p.t, {
      x: x + 1.05, y: 5.95, w: pcolW - 1.1, h: 0.7,
      fontSize: 13, fontFace: "Calibri", color: "9CB3C9", margin: 0,
      lineSpacingMultiple: 1.25
    });
  });

  addFooter(s, 6, true);
}

// =================================================================
// SLIDE 7 — TOOLS TABLE (kept, slimmed)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addLightTitle(s, "The standardized toolkit",
    "Six validated, freely available tools cover every body region —\neach takes <5 minutes and slots into the existing visit cadence");

  const headerRow = [
    { text: "ASSESSMENT TOOL", options: { bold: true, color: WHITE, fill: { color: NAVY }, valign: "middle", fontSize: 12 } },
    { text: "BODY REGION", options: { bold: true, color: WHITE, fill: { color: NAVY }, valign: "middle", fontSize: 12 } },
    { text: "WHEN TO USE", options: { bold: true, color: WHITE, fill: { color: NAVY }, valign: "middle", fontSize: 12 } },
    { text: "WHO ADMINISTERS", options: { bold: true, color: WHITE, fill: { color: NAVY }, valign: "middle", fontSize: 12 } },
  ];
  const rows = [
    ["DASH", "Upper extremity", "Initial eval + every 4 weeks", "PT / PTA"],
    ["LEFS", "Lower extremity", "Initial eval + every 4 weeks", "PT / PTA"],
    ["Oswestry (ODI)", "Lumbar spine", "Initial eval + every 4 weeks", "PT / PTA"],
    ["Neck Disability Index", "Cervical spine", "Initial eval + every 4 weeks", "PT / PTA"],
    ["Numeric Pain Scale (NRS)", "All regions", "Every visit", "Any clinical staff"],
    ["Patient-Specific Functional", "All regions", "Initial eval + discharge", "PT"],
  ];
  const tableData = [headerRow];
  rows.forEach((r, i) => {
    const fill = i % 2 === 0 ? BG_LIGHT : WHITE;
    tableData.push(r.map((c, j) => ({
      text: c,
      options: { fill: { color: fill }, color: SLATE, bold: j === 0, valign: "middle", fontSize: 15 }
    })));
  });
  s.addTable(tableData, {
    x: 0.6, y: 2.25, w: SW - 1.2, colW: [3, 3, 4.4, 2.733],
    fontFace: "Calibri", rowH: 0.6,
    border: { type: "solid", pt: 0.5, color: HAIRLINE },
  });

  addInsight(s, 0.6, 6.45, SW - 1.2, "Key insight",
    "All six tools are free, validated, and total <5 minutes per visit — zero licensing cost, zero new vendor contracts.");

  addFooter(s, 7);
}

// =================================================================
// SLIDE 8 — DASH & LEFS with horizontal IMPROVEMENT BAR (NEW chart)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addLightTitle(s, "Deep dive: extremity assessments",
    "DASH and LEFS will become our default upper- and lower-\nextremity measures, both re-administered every 4 weeks");

  const tools = [
    {
      code: "DASH", full: "Disabilities of the Arm, Shoulder & Hand",
      facts: [
        { l: "Items", v: "30" }, { l: "Score", v: "0–100" },
        { l: "MCID", v: "10–15" }, { l: "Time", v: "~5 min" },
      ],
      // Horizontal improvement bar: lower = better
      scale: { min: 0, max: 100, lowerBetter: true,
        pre: 65, post: 32, mcid: 13,
        preLabel: "Pre-tx 65", postLabel: "Post-tx 32" },
      insight: "Typical rotator cuff repair patients improve 25–35 points over 12 weeks — well above MCID.",
    },
    {
      code: "LEFS", full: "Lower Extremity Functional Scale",
      facts: [
        { l: "Items", v: "20" }, { l: "Score", v: "0–80" },
        { l: "MCID", v: "9" }, { l: "Time", v: "~3 min" },
      ],
      // Higher = better
      scale: { min: 0, max: 80, lowerBetter: false,
        pre: 35, post: 68, mcid: 9,
        preLabel: "Pre-tx 35", postLabel: "Post-tx 68" },
      insight: "More sensitive than the WOMAC for early-stage knee OA — better at detecting small changes.",
    },
  ];

  const colW = (SW - 1.6) / 2;
  tools.forEach((tool, i) => {
    const x = 0.6 + i * (colW + 0.4);

    s.addText(tool.code, {
      x, y: 2.25, w: colW, h: 0.95,
      fontSize: 48, fontFace: "Georgia", bold: true, color: NAVY, margin: 0
    });
    s.addText(tool.full, {
      x, y: 3.15, w: colW, h: 0.4,
      fontSize: 14, fontFace: "Calibri", italic: true, color: TEAL, margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 3.55, w: 1.4, h: 0.05, fill: { color: TEAL }, line: { color: TEAL }
    });

    // 4-stat fact row
    const fW = colW / 4;
    tool.facts.forEach((f, k) => {
      const fx = x + k * fW;
      s.addText(f.v, {
        x: fx, y: 3.7, w: fW, h: 0.45,
        fontSize: 20, fontFace: "Georgia", bold: true, color: NAVY,
        align: "center", margin: 0
      });
      s.addText(f.l.toUpperCase(), {
        x: fx, y: 4.18, w: fW, h: 0.25,
        fontSize: 9, fontFace: "Calibri", bold: true, color: MUTED,
        align: "center", charSpacing: 1, margin: 0
      });
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 4.55, w: colW, h: 0.01, fill: { color: HAIRLINE }, line: { color: HAIRLINE }
    });

    // Improvement scale visualization
    s.addText("TYPICAL PATIENT TRAJECTORY", {
      x, y: 4.7, w: colW, h: 0.25,
      fontSize: 9, fontFace: "Calibri", bold: true, color: MUTED, charSpacing: 1, margin: 0
    });
    const sc = tool.scale;
    const scaleY = 5.3;
    const scaleX = x + 0.1;
    const scaleW = colW - 0.2;
    // Background track
    s.addShape(pres.shapes.RECTANGLE, {
      x: scaleX, y: scaleY, w: scaleW, h: 0.18,
      fill: { color: BG_LIGHT }, line: { color: HAIRLINE }
    });
    // Position helpers
    const range = sc.max - sc.min;
    const prePos = (sc.pre - sc.min) / range;
    const postPos = (sc.post - sc.min) / range;
    // Improvement segment line (between pre and post)
    const segStart = Math.min(prePos, postPos) * scaleW;
    const segEnd = Math.max(prePos, postPos) * scaleW;
    s.addShape(pres.shapes.RECTANGLE, {
      x: scaleX + segStart, y: scaleY + 0.07, w: segEnd - segStart, h: 0.04,
      fill: { color: TEAL_PALE }, line: { color: TEAL_PALE }
    });
    // Pre marker (red dot)
    s.addShape(pres.shapes.OVAL, {
      x: scaleX + prePos * scaleW - 0.11, y: scaleY - 0.03, w: 0.22, h: 0.22,
      fill: { color: RED }, line: { color: WHITE, width: 1.5 }
    });
    // Post marker (green dot)
    s.addShape(pres.shapes.OVAL, {
      x: scaleX + postPos * scaleW - 0.11, y: scaleY - 0.03, w: 0.22, h: 0.22,
      fill: { color: GREEN }, line: { color: WHITE, width: 1.5 }
    });
    // Min/Max labels
    s.addText(String(sc.min), {
      x: scaleX - 0.2, y: scaleY + 0.25, w: 0.4, h: 0.25,
      fontSize: 9, fontFace: "Calibri", color: MUTED, align: "center", margin: 0
    });
    s.addText(String(sc.max), {
      x: scaleX + scaleW - 0.2, y: scaleY + 0.25, w: 0.4, h: 0.25,
      fontSize: 9, fontFace: "Calibri", color: MUTED, align: "center", margin: 0
    });
    // Pre/Post callouts (above the dots)
    const preXc = scaleX + prePos * scaleW;
    const postXc = scaleX + postPos * scaleW;
    s.addText(sc.preLabel, {
      x: preXc - 0.7, y: scaleY - 0.45, w: 1.4, h: 0.3,
      fontSize: 11, fontFace: "Calibri", bold: true, color: RED,
      align: "center", margin: 0
    });
    s.addText(sc.postLabel, {
      x: postXc - 0.7, y: scaleY - 0.45, w: 1.4, h: 0.3,
      fontSize: 11, fontFace: "Calibri", bold: true, color: GREEN,
      align: "center", margin: 0
    });
    // Direction note
    s.addText(sc.lowerBetter ? "← LOWER = BETTER" : "HIGHER = BETTER →", {
      x: scaleX, y: scaleY + 0.5, w: scaleW, h: 0.25,
      fontSize: 9, fontFace: "Calibri", italic: true, color: MUTED,
      align: "center", margin: 0
    });

    // Key insight at bottom
    addInsight(s, x, 6.4, colW, "Key insight", tool.insight);
  });

  // Vertical divider between tools
  s.addShape(pres.shapes.RECTANGLE, {
    x: SW / 2 - 0.01, y: 2.25, w: 0.02, h: 4.85,
    fill: { color: HAIRLINE }, line: { color: HAIRLINE }
  });

  addFooter(s, 8);
}

// =================================================================
// SLIDE 9 — ODI & NRS with same trajectory pattern
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG_LIGHT };
  addLightTitle(s, "Deep dive: spine & pain",
    "Oswestry will be our gold standard for lumbar spine; the NRS\nreplaces every current pain scale at every visit");

  const tools = [
    {
      code: "ODI", full: "Oswestry Disability Index",
      facts: [
        { l: "Items", v: "10" }, { l: "Score", v: "0–100%" },
        { l: "MCID", v: "6 pts" }, { l: "Time", v: "~5 min" },
      ],
      scale: { min: 0, max: 100, lowerBetter: true,
        pre: 48, post: 18, mcid: 6,
        preLabel: "Pre-tx 48%", postLabel: "Post-tx 18%" },
      insight: "ODI is required by most major payers for lumbar spine pre-auth — strengthens our reimbursement case.",
    },
    {
      code: "NRS", full: "Numeric Pain Rating Scale (0–10)",
      facts: [
        { l: "Items", v: "1" }, { l: "Score", v: "0–10" },
        { l: "MCID", v: "2 pts" }, { l: "Time", v: "<30s" },
      ],
      scale: { min: 0, max: 10, lowerBetter: true,
        pre: 7, post: 2, mcid: 2,
        preLabel: "Pre-tx 7", postLabel: "Post-tx 2" },
      insight: "Most-validated pain scale in PT literature — takes <30 seconds and replaces every other pain scale.",
    },
  ];

  const colW = (SW - 1.6) / 2;
  tools.forEach((tool, i) => {
    const x = 0.6 + i * (colW + 0.4);

    s.addText(tool.code, {
      x, y: 2.25, w: colW, h: 0.95,
      fontSize: 48, fontFace: "Georgia", bold: true, color: NAVY, margin: 0
    });
    s.addText(tool.full, {
      x, y: 3.15, w: colW, h: 0.4,
      fontSize: 14, fontFace: "Calibri", italic: true, color: TEAL, margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 3.55, w: 1.4, h: 0.05, fill: { color: TEAL }, line: { color: TEAL }
    });

    const fW = colW / 4;
    tool.facts.forEach((f, k) => {
      const fx = x + k * fW;
      s.addText(f.v, {
        x: fx, y: 3.7, w: fW, h: 0.45,
        fontSize: 20, fontFace: "Georgia", bold: true, color: NAVY,
        align: "center", margin: 0
      });
      s.addText(f.l.toUpperCase(), {
        x: fx, y: 4.18, w: fW, h: 0.25,
        fontSize: 9, fontFace: "Calibri", bold: true, color: MUTED,
        align: "center", charSpacing: 1, margin: 0
      });
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 4.55, w: colW, h: 0.01, fill: { color: HAIRLINE }, line: { color: HAIRLINE }
    });

    s.addText("TYPICAL PATIENT TRAJECTORY", {
      x, y: 4.7, w: colW, h: 0.25,
      fontSize: 9, fontFace: "Calibri", bold: true, color: MUTED, charSpacing: 1, margin: 0
    });
    const sc = tool.scale;
    const scaleY = 5.3;
    const scaleX = x + 0.1;
    const scaleW = colW - 0.2;
    s.addShape(pres.shapes.RECTANGLE, {
      x: scaleX, y: scaleY, w: scaleW, h: 0.18,
      fill: { color: WHITE }, line: { color: HAIRLINE }
    });
    const range = sc.max - sc.min;
    const prePos = (sc.pre - sc.min) / range;
    const postPos = (sc.post - sc.min) / range;
    const segStart = Math.min(prePos, postPos) * scaleW;
    const segEnd = Math.max(prePos, postPos) * scaleW;
    s.addShape(pres.shapes.RECTANGLE, {
      x: scaleX + segStart, y: scaleY + 0.07, w: segEnd - segStart, h: 0.04,
      fill: { color: TEAL_PALE }, line: { color: TEAL_PALE }
    });
    s.addShape(pres.shapes.OVAL, {
      x: scaleX + prePos * scaleW - 0.11, y: scaleY - 0.03, w: 0.22, h: 0.22,
      fill: { color: RED }, line: { color: WHITE, width: 1.5 }
    });
    s.addShape(pres.shapes.OVAL, {
      x: scaleX + postPos * scaleW - 0.11, y: scaleY - 0.03, w: 0.22, h: 0.22,
      fill: { color: GREEN }, line: { color: WHITE, width: 1.5 }
    });
    s.addText(String(sc.min), {
      x: scaleX - 0.2, y: scaleY + 0.25, w: 0.4, h: 0.25,
      fontSize: 9, fontFace: "Calibri", color: MUTED, align: "center", margin: 0
    });
    s.addText(String(sc.max), {
      x: scaleX + scaleW - 0.2, y: scaleY + 0.25, w: 0.4, h: 0.25,
      fontSize: 9, fontFace: "Calibri", color: MUTED, align: "center", margin: 0
    });
    const preXc = scaleX + prePos * scaleW;
    const postXc = scaleX + postPos * scaleW;
    s.addText(sc.preLabel, {
      x: preXc - 0.7, y: scaleY - 0.45, w: 1.4, h: 0.3,
      fontSize: 11, fontFace: "Calibri", bold: true, color: RED,
      align: "center", margin: 0
    });
    s.addText(sc.postLabel, {
      x: postXc - 0.7, y: scaleY - 0.45, w: 1.4, h: 0.3,
      fontSize: 11, fontFace: "Calibri", bold: true, color: GREEN,
      align: "center", margin: 0
    });
    s.addText(sc.lowerBetter ? "← LOWER = BETTER" : "HIGHER = BETTER →", {
      x: scaleX, y: scaleY + 0.5, w: scaleW, h: 0.25,
      fontSize: 9, fontFace: "Calibri", italic: true, color: MUTED,
      align: "center", margin: 0
    });

    addInsight(s, x, 6.4, colW, "Key insight", tool.insight);
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: SW / 2 - 0.01, y: 2.25, w: 0.02, h: 4.85,
    fill: { color: HAIRLINE }, line: { color: HAIRLINE }
  });

  addFooter(s, 9);
}

// =================================================================
// SLIDE 10 — SWIMLANE GRID (NEW pattern: roles × stages)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addLightTitle(s, "The standardized workflow",
    "A swimlane workflow assigns each assessment to a clear owner —\neliminating ad-hoc tool selection at every stage");

  const stages = ["Check-In", "Initial Eval", "Treatment", "Re-Assess", "Discharge"];
  const lanes = [
    { role: "Admin", color: TEAL_LIGHT, cells: [
      "Unified intake form\nNRS pain rating\nInsurance verify", "", "", "", ""
    ]},
    { role: "PT", color: NAVY, cells: [
      "", "Region tool\n(DASH/LEFS/ODI/NDI)\nPSFS goals", "Progress notes\nin standard template",
      "Repeat region tool\nCompare to baseline", "Final scores\nDischarge summary"
    ]},
    { role: "PTA", color: TEAL, cells: [
      "", "", "NRS every visit\nTreatment notes", "", ""
    ]},
  ];

  const gridX = 1.6, gridY = 2.55;
  const colW = (SW - 1.7 - gridX) / stages.length;
  const rowH = 1.35;

  // Stage headers
  stages.forEach((st, j) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: gridX + j * colW, y: gridY - 0.5, w: colW - 0.05, h: 0.45,
      fill: { color: BG_LIGHT }, line: { color: BG_LIGHT }
    });
    s.addText(`${j + 1}. ${st}`, {
      x: gridX + j * colW, y: gridY - 0.5, w: colW - 0.05, h: 0.45,
      fontSize: 13, fontFace: "Calibri", bold: true, color: NAVY,
      align: "center", valign: "middle", margin: 0
    });
  });

  // Lanes
  lanes.forEach((lane, i) => {
    const ly = gridY + i * rowH;
    // Role label on left
    s.addShape(pres.shapes.RECTANGLE, {
      x: gridX - 1.0, y: ly + 0.05, w: 0.08, h: rowH - 0.15,
      fill: { color: lane.color }, line: { color: lane.color }
    });
    s.addText(lane.role, {
      x: gridX - 0.82, y: ly + 0.05, w: 0.95, h: rowH - 0.15,
      fontSize: 16, fontFace: "Calibri", bold: true, color: NAVY,
      valign: "middle", margin: 0
    });
    // Lane background hairline
    s.addShape(pres.shapes.RECTANGLE, {
      x: gridX, y: ly + rowH - 0.05, w: stages.length * colW - 0.05, h: 0.01,
      fill: { color: HAIRLINE }, line: { color: HAIRLINE }
    });
    // Cells
    lane.cells.forEach((cell, j) => {
      if (cell) {
        const cx = gridX + j * colW + 0.1;
        s.addShape(pres.shapes.RECTANGLE, {
          x: cx, y: ly + 0.1, w: colW - 0.25, h: rowH - 0.3,
          fill: { color: lane.color, transparency: 85 }, line: { color: lane.color }
        });
        s.addText(cell, {
          x: cx, y: ly + 0.1, w: colW - 0.25, h: rowH - 0.3,
          fontSize: 11, fontFace: "Calibri", color: SLATE,
          align: "center", valign: "middle", margin: 0, lineSpacingMultiple: 1.25
        });
      }
    });
  });

  addInsight(s, 0.6, 6.45, SW - 1.2, "Result",
    "Every assessment has one owner. No more ad-hoc tool selection. Patient data flows continuously from check-in through discharge.");

  addFooter(s, 10);
}

// =================================================================
// SLIDE 11 — OUTCOME TRAJECTORY LINE CHART (NEW: real chart, no pipeline)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addLightTitle(s, "After: what trended outcomes look like",
    "The new model produces a continuous, comparable score for every\npatient — turning subjective progress into measurable data");

  // Line chart showing two example patient trajectories
  s.addText("EXAMPLE PATIENT TRAJECTORIES OVER A 12-WEEK COURSE", {
    x: 0.6, y: 2.25, w: 9, h: 0.3, fontSize: 11, fontFace: "Calibri", bold: true,
    color: MUTED, charSpacing: 1.5, margin: 0
  });

  s.addChart(pres.charts.LINE, [
    {
      name: "Shoulder pt (DASH, ↓ better)",
      labels: ["Wk 0", "Wk 2", "Wk 4", "Wk 6", "Wk 8", "Wk 10", "Wk 12"],
      values: [68, 60, 52, 44, 38, 33, 30],
    },
    {
      name: "Knee pt (LEFS scaled, ↑ better)",
      labels: ["Wk 0", "Wk 2", "Wk 4", "Wk 6", "Wk 8", "Wk 10", "Wk 12"],
      values: [32, 38, 45, 52, 58, 63, 70],
    },
  ], {
    x: 0.4, y: 2.55, w: 8.6, h: 4.3,
    chartColors: [NAVY, TEAL],
    chartArea: { fill: { color: WHITE } },
    plotArea: { fill: { color: WHITE } },
    catAxisLabelColor: SLATE, catAxisLabelFontSize: 11,
    valAxisLabelColor: MUTED, valAxisLabelFontSize: 10,
    valAxisMinVal: 0, valAxisMaxVal: 100,
    valGridLine: { color: HAIRLINE, size: 0.5 },
    catGridLine: { style: "none" },
    showLegend: true, legendPos: "b", legendFontSize: 10, legendColor: SLATE,
    lineDataSymbol: "circle", lineDataSymbolSize: 8,
    lineSize: 3,
    showTitle: false,
  });

  // Right side — what the data unlocks
  s.addText("WHAT THIS UNLOCKS", {
    x: 9.4, y: 2.55, w: 3.5, h: 0.3, fontSize: 11, fontFace: "Calibri", bold: true,
    color: TEAL, charSpacing: 1.5, margin: 0
  });

  const wins = [
    { h: "For patients", t: "See concrete progress at every re-eval. Motivating, not abstract." },
    { h: "For PTs", t: "Catch plateaus early. Adjust treatment when data flatlines." },
    { h: "For payers", t: "Demonstrate medical necessity with trended scores, not narrative." },
    { h: "For practice", t: "Aggregate across patients to show outcomes by provider, condition, payer." },
  ];
  let wy = 2.85;
  wins.forEach((w) => {
    s.addText(w.h, {
      x: 9.4, y: wy, w: 3.5, h: 0.32,
      fontSize: 13, fontFace: "Calibri", bold: true, color: NAVY, margin: 0
    });
    s.addText(w.t, {
      x: 9.4, y: wy + 0.3, w: 3.5, h: 0.6,
      fontSize: 11, fontFace: "Calibri", color: SLATE_2,
      margin: 0, lineSpacingMultiple: 1.3
    });
    wy += 0.92;
  });

  addFooter(s, 11);
}

// =================================================================
// SLIDE 12 — DUMBBELL CHART (NEW: paired before/after on number lines)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addLightTitle(s, "Before vs after  |  six metrics",
    "Across six measurable dimensions, every gap closes — most by\n80%+ in the first six months");

  const metrics = [
    { label: "Standardized intake forms", before: 0, after: 100, unit: "%" },
    { label: "Standardized pain measurement", before: 25, after: 100, unit: "%" },
    { label: "Functional assessments captured", before: 10, after: 95, unit: "%" },
    { label: "Patients re-stating history (avg)", before: 3, after: 1, unit: "×", invert: true },
    { label: "Outcome data in chart", before: 5, after: 100, unit: "%" },
    { label: "Charts using shared template", before: 0, after: 100, unit: "%" },
  ];

  // Headers
  s.addText("METRIC", {
    x: 0.6, y: 2.25, w: 4.8, h: 0.3, fontSize: 10, fontFace: "Calibri", bold: true,
    color: MUTED, charSpacing: 1.5, margin: 0
  });
  s.addText("BEFORE  →  AFTER", {
    x: 5.5, y: 2.25, w: 6.5, h: 0.3, fontSize: 10, fontFace: "Calibri", bold: true,
    color: MUTED, charSpacing: 1.5, margin: 0
  });
  s.addText("CHANGE", {
    x: 12.0, y: 2.25, w: 1.2, h: 0.3, fontSize: 10, fontFace: "Calibri", bold: true,
    color: MUTED, charSpacing: 1.5, align: "right", margin: 0
  });

  // Chart area constants
  const lineX = 5.5, lineW = 6.3;
  const startY = 2.7;
  const rowH = 0.7;

  metrics.forEach((m, i) => {
    const ry = startY + i * rowH;
    // Subtle row background
    if (i % 2 === 0) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.6, y: ry, w: SW - 1.2, h: rowH,
        fill: { color: BG_LIGHT }, line: { color: BG_LIGHT }
      });
    }
    // Metric label
    s.addText(m.label, {
      x: 0.7, y: ry, w: 4.7, h: rowH,
      fontSize: 14, fontFace: "Calibri", bold: true, color: NAVY,
      valign: "middle", margin: 0
    });
    // Number line track
    const trackY = ry + rowH / 2 - 0.02;
    s.addShape(pres.shapes.RECTANGLE, {
      x: lineX, y: trackY, w: lineW, h: 0.04,
      fill: { color: HAIRLINE }, line: { color: HAIRLINE }
    });
    // Compute positions on a 0-100 scale (or 0-3 for the inverted one)
    const scaleMax = m.invert ? 3 : 100;
    const bPos = m.before / scaleMax;
    const aPos = m.after / scaleMax;
    // Connecting line between before and after
    const segL = Math.min(bPos, aPos) * lineW;
    const segR = Math.max(bPos, aPos) * lineW;
    s.addShape(pres.shapes.RECTANGLE, {
      x: lineX + segL, y: trackY - 0.02, w: segR - segL, h: 0.08,
      fill: { color: TEAL_PALE }, line: { color: TEAL_PALE }
    });
    // Before dot (red)
    s.addShape(pres.shapes.OVAL, {
      x: lineX + bPos * lineW - 0.13, y: trackY - 0.11, w: 0.26, h: 0.26,
      fill: { color: RED }, line: { color: WHITE, width: 2 }
    });
    // After dot (green)
    s.addShape(pres.shapes.OVAL, {
      x: lineX + aPos * lineW - 0.13, y: trackY - 0.11, w: 0.26, h: 0.26,
      fill: { color: GREEN }, line: { color: WHITE, width: 2 }
    });
    // Labels next to dots
    const beforeLabel = `${m.before}${m.unit}`;
    const afterLabel = `${m.after}${m.unit}`;
    // Position before label to the left of red dot
    s.addText(beforeLabel, {
      x: lineX + bPos * lineW - 0.7, y: trackY - 0.42, w: 0.6, h: 0.3,
      fontSize: 10, fontFace: "Calibri", bold: true, color: RED,
      align: "right", valign: "middle", margin: 0
    });
    // After label to the right of green dot
    s.addText(afterLabel, {
      x: lineX + aPos * lineW + 0.1, y: trackY - 0.42, w: 0.6, h: 0.3,
      fontSize: 10, fontFace: "Calibri", bold: true, color: GREEN,
      align: "left", valign: "middle", margin: 0
    });
    // Change column (right side)
    let change;
    if (m.invert) {
      const pct = Math.round(((m.before - m.after) / m.before) * 100);
      change = `−${pct}%`;
    } else {
      const delta = m.after - m.before;
      change = delta > 0 ? `+${delta}pp` : `${delta}pp`;
    }
    s.addText(change, {
      x: 12.0, y: ry, w: 1.2, h: rowH,
      fontSize: 16, fontFace: "Calibri", bold: true, color: TEAL,
      align: "right", valign: "middle", margin: 0
    });
  });

  // Scale markers below
  const scaleY = startY + 6 * rowH + 0.05;
  [0, 25, 50, 75, 100].forEach((mark) => {
    const xPos = lineX + (mark / 100) * lineW;
    s.addShape(pres.shapes.RECTANGLE, {
      x: xPos - 0.005, y: scaleY, w: 0.01, h: 0.08,
      fill: { color: MUTED }, line: { color: MUTED }
    });
    s.addText(`${mark}%`, {
      x: xPos - 0.3, y: scaleY + 0.1, w: 0.6, h: 0.25,
      fontSize: 9, fontFace: "Calibri", color: MUTED, align: "center", margin: 0
    });
  });

  addFooter(s, 12);
}

// =================================================================
// SLIDE 13 — RADAR CHART of patient experience (NEW)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addLightTitle(s, "Patient experience  |  current vs. future state",
    "Patients gain on every dimension that matters — most visibly,\nthey'll see their own progress for the first time");

  // Radar chart
  s.addChart(pres.charts.RADAR, [
    {
      name: "Today",
      labels: ["Low form\nburden", "Short wait\ntimes", "Provider\ncommunication", "Visible\nprogress", "Coordinated\ncare", "Overall\nsatisfaction"],
      values: [3, 5, 5, 2, 4, 5],
    },
    {
      name: "After rollout",
      labels: ["Low form\nburden", "Short wait\ntimes", "Provider\ncommunication", "Visible\nprogress", "Coordinated\ncare", "Overall\nsatisfaction"],
      values: [9, 8, 8, 9, 9, 9],
    },
  ], {
    x: 0.4, y: 2.3, w: 7.2, h: 4.9,
    radarStyle: "standard",
    chartColors: [MUTED, TEAL],
    chartColorsOpacity: 30,
    chartArea: { fill: { color: WHITE } },
    plotArea: { fill: { color: WHITE } },
    catAxisLabelColor: NAVY, catAxisLabelFontSize: 11, catAxisLabelFontBold: true,
    valAxisLabelColor: MUTED, valAxisLabelFontSize: 9,
    valAxisMinVal: 0, valAxisMaxVal: 10,
    showLegend: true, legendPos: "b", legendFontSize: 11, legendColor: SLATE,
    lineSize: 2.5,
    showTitle: false,
  });

  // Right side — quantified benefits
  s.addText("WHAT CHANGES, CONCRETELY", {
    x: 7.9, y: 2.3, w: 5.0, h: 0.3, fontSize: 11, fontFace: "Calibri", bold: true,
    color: TEAL, charSpacing: 1.5, margin: 0
  });

  const benefits = [
    { stat: "1", unit: "form", l: "Down from 3 — one unified intake replaces every variant" },
    { stat: "−10", unit: "min", l: "Average wait time saved per visit, freed by less paperwork" },
    { stat: "65→30", unit: "", l: "Visible DASH score improvement on a typical 12-week course" },
    { stat: "0", unit: "re-explains", l: "Patient data follows them from check-in through discharge" },
  ];
  let by = 2.65;
  benefits.forEach((b) => {
    s.addText([
      { text: b.stat, options: { fontSize: 28, color: TEAL, bold: true } },
      { text: " " + b.unit, options: { fontSize: 14, color: TEAL_LIGHT, bold: true } },
    ], {
      x: 7.9, y: by, w: 5.0, h: 0.45, fontFace: "Georgia", margin: 0
    });
    s.addText(b.l, {
      x: 7.9, y: by + 0.45, w: 5.0, h: 0.5,
      fontSize: 12, fontFace: "Calibri", color: SLATE_2,
      margin: 0, lineSpacingMultiple: 1.3
    });
    by += 1.05;
  });

  addFooter(s, 13);
}

// =================================================================
// SLIDE 14 — STACKED HORIZONTAL BARS by role (NEW: real chart)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addLightTitle(s, "Staff impact  |  hours reclaimed per week",
    "Every role gains hours back — and the practice unlocks\npayer-ready outcome data for the first time");

  // Stacked horizontal bar showing time saved per week per role, broken down
  s.addText("WEEKLY HOURS RECLAIMED BY ROLE (PRACTICE-WIDE)", {
    x: 0.6, y: 2.25, w: 9, h: 0.3, fontSize: 11, fontFace: "Calibri", bold: true,
    color: MUTED, charSpacing: 1.5, margin: 0
  });

  s.addChart(pres.charts.BAR, [
    {
      name: "Less form filling",
      labels: ["Admin staff", "PTs & PTAs", "Practice (mgmt)"],
      values: [22, 14, 4],
    },
    {
      name: "Less data re-entry",
      labels: ["Admin staff", "PTs & PTAs", "Practice (mgmt)"],
      values: [12, 6, 3],
    },
    {
      name: "Faster chart prep",
      labels: ["Admin staff", "PTs & PTAs", "Practice (mgmt)"],
      values: [8, 10, 5],
    },
  ], {
    x: 0.4, y: 2.55, w: 8.4, h: 4.3, barDir: "bar", barGrouping: "stacked",
    chartColors: [NAVY, TEAL, TEAL_LIGHT],
    chartArea: { fill: { color: WHITE } },
    plotArea: { fill: { color: WHITE } },
    catAxisLabelColor: NAVY, catAxisLabelFontSize: 13, catAxisLabelFontBold: true,
    valAxisLabelColor: MUTED, valAxisLabelFontSize: 10,
    valAxisMinVal: 0, valAxisMaxVal: 50,
    valAxisTitle: "Hours per week",
    valAxisTitleFontSize: 10, valAxisTitleColor: MUTED,
    showValAxisTitle: true,
    valGridLine: { color: HAIRLINE, size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true, dataLabelColor: WHITE, dataLabelFontSize: 11, dataLabelFontBold: true,
    showLegend: true, legendPos: "b", legendFontSize: 10, legendColor: SLATE,
    barGapWidthPct: 60,
  });

  // Right side — the "key win" per role with stat
  const wins = [
    { role: "ADMIN", stat: "42 hrs", l: "back per week — equivalent to one full-time staff member" },
    { role: "CLINICAL", stat: "30 hrs", l: "of PT/PTA time freed for patient care, not paperwork" },
    { role: "PRACTICE", stat: "100%", l: "of evals will produce trended, payer-ready data" },
  ];
  let wy = 2.55;
  wins.forEach((w) => {
    s.addText(w.role, {
      x: 9.0, y: wy, w: 4.0, h: 0.3,
      fontSize: 11, fontFace: "Calibri", bold: true, color: TEAL,
      charSpacing: 2, margin: 0
    });
    s.addText(w.stat, {
      x: 9.0, y: wy + 0.3, w: 4.0, h: 0.55,
      fontSize: 32, fontFace: "Georgia", bold: true, color: NAVY, margin: 0
    });
    s.addText(w.l, {
      x: 9.0, y: wy + 0.85, w: 4.0, h: 0.55,
      fontSize: 12, fontFace: "Calibri", color: SLATE_2,
      margin: 0, lineSpacingMultiple: 1.3
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 9.0, y: wy + 1.4, w: 4.0, h: 0.01,
      fill: { color: HAIRLINE }, line: { color: HAIRLINE }
    });
    wy += 1.5;
  });

  addFooter(s, 14);
}

// =================================================================
// SLIDE 15 — ROADMAP (Gantt) — kept as the only timeline
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addLightTitle(s, "12-week implementation roadmap",
    "We will roll out in four phases over 12 weeks — preparation,\ntraining, a 2-provider pilot, then full launch");

  const axisX = 1.7, axisY = 6.4, axisW = SW - 2.3;
  const weekW = axisW / 12;

  const phases = [
    { label: "Preparation", startW: 0, dur: 2, color: NAVY,
      items: ["Finalize forms", "Reference guides", "EMR template updates"] },
    { label: "Staff Training", startW: 2, dur: 2, color: TEAL,
      items: ["Hands-on workshops", "Practice scoring", "Admin workflow review"] },
    { label: "Pilot Launch", startW: 4, dur: 4, color: GOLD,
      items: ["2 providers go live", "Daily check-ins", "Refine as needed"] },
    { label: "Full Rollout", startW: 8, dur: 4, color: GREEN,
      items: ["All providers live", "Weekly team huddles", "Ongoing support"] },
  ];

  const rowH = 0.95;
  const firstRowY = 2.5;

  phases.forEach((p, i) => {
    const y = firstRowY + i * rowH;
    s.addText(`PHASE ${i + 1}`, {
      x: 0.5, y: y + 0.05, w: 1.1, h: 0.25, fontSize: 10, fontFace: "Calibri", bold: true,
      color: MUTED, charSpacing: 1.5, margin: 0
    });
    s.addText(p.label, {
      x: 0.5, y: y + 0.27, w: 1.15, h: 0.35, fontSize: 15, fontFace: "Calibri", bold: true,
      color: NAVY, margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: axisX, y: y + 0.1, w: axisW, h: 0.5,
      fill: { color: BG_LIGHT }, line: { color: BG_LIGHT }
    });
    const barX = axisX + p.startW * weekW;
    const barW = p.dur * weekW;
    s.addShape(pres.shapes.RECTANGLE, {
      x: barX, y: y + 0.1, w: barW, h: 0.5,
      fill: { color: p.color }, line: { color: p.color }
    });
    s.addText(`Wk ${p.startW + 1}–${p.startW + p.dur}`, {
      x: barX, y: y + 0.1, w: barW, h: 0.5,
      fontSize: 12, fontFace: "Calibri", bold: true, color: WHITE,
      align: "center", valign: "middle", margin: 0
    });
    s.addText(p.items.join("  •  "), {
      x: Math.max(barX - 0.3, axisX), y: y + 0.63, w: Math.min(axisW, barW + 4), h: 0.3,
      fontSize: 11, fontFace: "Calibri", italic: true, color: SLATE, margin: 0
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: axisX, y: axisY, w: axisW, h: 0.02, fill: { color: SLATE }, line: { color: SLATE }
  });
  for (let w = 0; w <= 12; w++) {
    const x = axisX + w * weekW;
    s.addShape(pres.shapes.RECTANGLE, {
      x: x - 0.005, y: axisY, w: 0.01, h: 0.08, fill: { color: SLATE }, line: { color: SLATE }
    });
    if (w % 2 === 0) {
      s.addText(`Wk ${w}`, {
        x: x - 0.4, y: axisY + 0.1, w: 0.8, h: 0.25,
        fontSize: 10, fontFace: "Calibri", color: MUTED, align: "center", margin: 0
      });
    }
  }
  s.addText("WEEKS FROM KICKOFF", {
    x: 0.5, y: axisY + 0.4, w: SW - 1, h: 0.25, fontSize: 9, fontFace: "Calibri", bold: true,
    color: MUTED, align: "center", charSpacing: 2, margin: 0
  });

  addFooter(s, 15);
}

// =================================================================
// SLIDE 16 — RADAR of KPIs target vs current (NEW chart type)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addLightTitle(s, "Expected outcomes  |  6-month KPI targets",
    "By month 6, we target 80%+ on every KPI — a step-change\nfrom baseline on every dimension we'll measure");

  s.addChart(pres.charts.RADAR, [
    {
      name: "Today (baseline)",
      labels: ["Documentation\nconsistency", "Patient\nsatisfaction", "Admin time\nsaved", "Outcome\ntracking", "Payer\ncompliance"],
      values: [10, 60, 0, 5, 30],
    },
    {
      name: "6-month target",
      labels: ["Documentation\nconsistency", "Patient\nsatisfaction", "Admin time\nsaved", "Outcome\ntracking", "Payer\ncompliance"],
      values: [85, 90, 70, 95, 80],
    },
  ], {
    x: 0.4, y: 2.3, w: 7.6, h: 4.9,
    radarStyle: "standard",
    chartColors: [MUTED, TEAL],
    chartColorsOpacity: 30,
    chartArea: { fill: { color: WHITE } },
    plotArea: { fill: { color: WHITE } },
    catAxisLabelColor: NAVY, catAxisLabelFontSize: 11, catAxisLabelFontBold: true,
    valAxisLabelColor: MUTED, valAxisLabelFontSize: 9,
    valAxisMinVal: 0, valAxisMaxVal: 100,
    showLegend: true, legendPos: "b", legendFontSize: 11, legendColor: SLATE,
    lineSize: 2.5,
    showTitle: false,
  });

  // KPI table on the right
  s.addText("KPI TARGETS BY MONTH 6", {
    x: 8.4, y: 2.3, w: 4.5, h: 0.3, fontSize: 11, fontFace: "Calibri", bold: true,
    color: TEAL, charSpacing: 1.5, margin: 0
  });

  const kpis = [
    { name: "Documentation consistency", from: "10%", to: "85%" },
    { name: "Patient satisfaction", from: "60%", to: "90%" },
    { name: "Admin time saved", from: "0", to: "15 min/pt" },
    { name: "Outcome tracking", from: "5%", to: "95%" },
    { name: "Payer compliance", from: "30%", to: "80%" },
  ];
  let ky = 2.7;
  kpis.forEach((k, i) => {
    s.addText(k.name, {
      x: 8.4, y: ky, w: 2.7, h: 0.4,
      fontSize: 12, fontFace: "Calibri", bold: true, color: NAVY,
      valign: "middle", margin: 0
    });
    s.addText([
      { text: k.from, options: { color: MUTED, fontSize: 11 } },
      { text: "  →  ", options: { color: TEAL, fontSize: 11, bold: true } },
      { text: k.to, options: { color: TEAL, fontSize: 14, bold: true } },
    ], {
      x: 11.1, y: ky, w: 2.1, h: 0.4,
      fontFace: "Calibri", align: "right", valign: "middle", margin: 0
    });
    if (i < kpis.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 8.4, y: ky + 0.42, w: 4.8, h: 0.01,
        fill: { color: HAIRLINE }, line: { color: HAIRLINE }
      });
    }
    ky += 0.55;
  });

  addInsight(s, 8.4, 5.6, 4.8, "Why this matters",
    "Hitting 80%+ on every KPI gives us payer leverage and audit-readiness for the first time.");

  addFooter(s, 16);
}

// =================================================================
// SLIDE 17 — THE ASK (full-bleed dark)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addShape(pres.shapes.OVAL, {
    x: SW - 4, y: SH - 3, w: 6, h: 6, fill: { color: TEAL, transparency: 80 }, line: { color: NAVY }
  });
  s.addText("THE ASK", {
    x: 0.8, y: 0.7, w: 6, h: 0.4, fontSize: 14, fontFace: "Calibri", bold: true,
    color: TEAL_LIGHT, charSpacing: 3, margin: 0
  });
  s.addText("Three role-specific asks will determine\nwhether we hit the 12-week timeline.", {
    x: 0.8, y: 1.2, w: SW - 1.6, h: 1.7, fontSize: 36, fontFace: "Georgia", bold: true,
    color: WHITE, valign: "top", margin: 0, lineSpacingMultiple: 1.05
  });

  const ic1 = await icon(fa.FaUserMd, TEAL_LIGHT, 256);
  const ic2 = await icon(fa.FaStethoscope, TEAL_LIGHT, 256);
  const ic3 = await icon(fa.FaClipboardList, TEAL_LIGHT, 256);
  const rows = [
    { ic: ic1, role: "PTs", t: "Review the assessment tools for your caseload. Attend a scoring calibration session. Champion the process with your PTAs." },
    { ic: ic2, role: "PTAs", t: "Learn the NRS and documentation templates. Flag any workflow issues during the pilot. Ask questions early and often." },
    { ic: ic3, role: "Admin", t: "Switch to the unified intake form. Help patients understand the new paperwork flow. Give us feedback on bottlenecks." },
  ];
  let y = 3.6;
  const rowH = 1.0;
  rows.forEach((r, i) => {
    s.addImage({ data: r.ic, x: 0.9, y: y + 0.1, w: 0.6, h: 0.6 });
    s.addText(r.role, {
      x: 1.75, y: y, w: 1.6, h: 0.8, fontSize: 24, fontFace: "Georgia", bold: true,
      color: TEAL_LIGHT, valign: "middle", margin: 0
    });
    s.addText(r.t, {
      x: 3.55, y: y, w: SW - 4.3, h: 0.8, fontSize: 15, fontFace: "Calibri",
      color: "CADCFC", valign: "middle", margin: 0, lineSpacingMultiple: 1.2
    });
    if (i < rows.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: y + rowH - 0.05, w: SW - 1.6, h: 0.01,
        fill: { color: TEAL_LIGHT, transparency: 70 }, line: { color: NAVY }
      });
    }
    y += rowH;
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: SH - 1.0, w: SW, h: 0.6, fill: { color: NAVY_DARK }, line: { color: NAVY_DARK }
  });
  s.addText("Questions? Let's discuss — this works best when everyone has a voice in how we roll it out.", {
    x: 0.5, y: SH - 1.0, w: SW - 1, h: 0.6, fontSize: 15, fontFace: "Calibri", italic: true,
    color: TEAL_LIGHT, align: "center", valign: "middle", margin: 0
  });

  addFooter(s, 17, true);
}

await pres.writeFile({ fileName: "rebuilt.pptx" });
console.log("Saved rebuilt.pptx");
})();
