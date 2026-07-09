// Emerald Cloud Lab — Executive Pitch Deck
// Recreates the uploaded PPTX using pptxgenjs.
//
// Run: node build.js   →   outputs ./emerald_cloud_lab.pptx

const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaLaptopCode,
  FaRobot,
  FaProjectDiagram,
  FaChartLine,
  FaDollarSign,
  FaShareAlt,
  FaFileAlt,
  FaGlobe,
} = require("react-icons/fa");

// ────────────────────────────────────────────────────────────────────────────
// Palette
// ────────────────────────────────────────────────────────────────────────────
const BG_NAVY       = "0F1E35";   // deep navy background
const TEAL          = "2EE5BA";   // primary teal accent
const TEAL_DIM      = "1FB896";   // darker teal (chart bars)
const WHITE         = "FFFFFF";
const TEXT_MUTED    = "94A3B8";   // muted slate for body/captions
const TEXT_DIMMER   = "64748B";   // axis labels, footer
const ROW_ALT       = "1A2B45";   // alternating table row
const ROW_HEADER    = "14243E";   // table header row
const AMBER         = "F5B041";   // in-house/warning color
const MAUVE         = "C07C94";   // CRO color (pink/mauve)
const PINK_HIGH     = "FF6B6B";   // HIGH risk tag
const AMBER_MED     = "F5A623";   // MEDIUM risk tag
const GRAY_BAR      = "6B7A91";   // stat comparison bars (muted)

// ────────────────────────────────────────────────────────────────────────────
// Icon rasterization helper
// ────────────────────────────────────────────────────────────────────────────
function renderIconSvg(IconComponent, color, size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}

async function iconPng(IconComponent, color = "#" + TEAL, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ────────────────────────────────────────────────────────────────────────────
// Shared slide furniture
// ────────────────────────────────────────────────────────────────────────────
// Fresh shadow object per call (pptxgenjs mutates shadow options in place)
const makeShadow = () => ({
  type: "outer", blur: 8, offset: 2, angle: 90, color: "000000", opacity: 0.25,
});

function addFooter(slide, pageNum) {
  slide.addText(
    [
      { text: "CONFIDENTIAL", options: { color: TEXT_DIMMER } },
      { text: "  |  ", options: { color: TEXT_DIMMER } },
      { text: "Prepared for Executive Leadership", options: { color: TEXT_DIMMER } },
    ],
    { x: 0.4, y: 5.32, w: 6, h: 0.25, fontSize: 9, fontFace: "Calibri", margin: 0 }
  );
  if (pageNum !== null && pageNum !== undefined) {
    slide.addText(String(pageNum), {
      x: 9.4, y: 5.32, w: 0.3, h: 0.25,
      fontSize: 9, fontFace: "Calibri", color: TEXT_DIMMER,
      align: "right", margin: 0,
    });
  }
}

// Eyebrow (small, teal, wide-tracked all-caps) + big white title
function addEyebrowAndTitle(slide, eyebrow, title, opts = {}) {
  const titleY = opts.titleY ?? 0.55;
  const titleH = opts.titleH ?? 0.75;
  const titleW = opts.titleW ?? 9.2;
  slide.addText(eyebrow, {
    x: 0.4, y: 0.22, w: 9, h: 0.3,
    fontSize: 11, fontFace: "Calibri", bold: true,
    color: TEXT_MUTED, charSpacing: 6, margin: 0,
  });
  slide.addText(title, {
    x: 0.4, y: titleY, w: titleW, h: titleH,
    fontSize: 28, fontFace: "Calibri", bold: true,
    color: WHITE, margin: 0,
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Build the deck
// ────────────────────────────────────────────────────────────────────────────
async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";   // 10" × 5.625"
  pres.title = "Emerald Cloud Lab: The Case for Cloud-First R&D";
  pres.author = "Executive Leadership";

  // Pre-rasterize icons used across the deck
  const iconCommand  = await iconPng(FaLaptopCode,     "#" + TEAL, 256);
  const iconRun      = await iconPng(FaRobot,          "#" + TEAL, 256);
  const iconExplore  = await iconPng(FaProjectDiagram, "#" + TEAL, 256);
  const iconAnalyze  = await iconPng(FaChartLine,      "#" + TEAL, 256);
  const iconDollar   = await iconPng(FaDollarSign,     "#" + TEAL, 256);
  const iconFlex     = await iconPng(FaShareAlt,       "#" + TEAL, 256);
  const iconRepro    = await iconPng(FaFileAlt,        "#" + TEAL, 256);
  const iconAccess   = await iconPng(FaGlobe,          "#" + TEAL, 256);

  // ══════════════════════════════════════════════════════════════════════
  // SLIDE 1 — Title
  // ══════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: BG_NAVY };
    // Top teal bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.12,
      fill: { color: TEAL }, line: { type: "none" },
    });
    // Eyebrow
    s.addText("STRATEGIC R&D INFRASTRUCTURE", {
      x: 0.5, y: 1.45, w: 9, h: 0.35,
      fontSize: 13, fontFace: "Calibri", bold: true,
      color: TEAL, charSpacing: 8, align: "center", margin: 0,
    });
    // Main title (two lines)
    s.addText(
      [
        { text: "Emerald Cloud Lab:", options: { breakLine: true } },
        { text: "The Case for Cloud-First R&D" },
      ],
      {
        x: 0.5, y: 1.85, w: 9, h: 1.6,
        fontSize: 40, fontFace: "Calibri", bold: true,
        color: WHITE, align: "center", margin: 0,
      }
    );
    // Teal divider line
    s.addShape(pres.shapes.LINE, {
      x: 4.25, y: 3.72, w: 1.5, h: 0,
      line: { color: TEAL, width: 2 },
    });
    // Sub-title
    s.addText("A Decision Framework for Executive Leadership", {
      x: 0.5, y: 3.9, w: 9, h: 0.35,
      fontSize: 14, fontFace: "Calibri",
      color: TEXT_MUTED, align: "center", margin: 0,
    });
    // Date
    s.addText("April 2026", {
      x: 0.5, y: 4.3, w: 9, h: 0.3,
      fontSize: 12, fontFace: "Calibri",
      color: TEXT_MUTED, align: "center", margin: 0,
    });
    // Confidential footer (no page number on title)
    s.addText(
      [
        { text: "CONFIDENTIAL", options: { color: TEXT_DIMMER } },
        { text: "  |  ", options: { color: TEXT_DIMMER } },
        { text: "Prepared for Executive Leadership", options: { color: TEXT_DIMMER } },
      ],
      { x: 0.4, y: 5.32, w: 6, h: 0.25, fontSize: 9, fontFace: "Calibri", margin: 0 }
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // SLIDE 2 — Executive Summary: three stats
  // ══════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: BG_NAVY };
    addEyebrowAndTitle(s, "EXECUTIVE SUMMARY", "Lower cost. Higher throughput. Faster starts.");

    // Three stat columns: COST / SPEED / OUTPUT
    const stats = [
      { label: "COST",   big: "50%",   sub: "lower Year 1 spend vs.\nin-house ($1.3M vs. $2.6M)" },
      { label: "SPEED",  big: "<24 hrs", sub: "to first experiment\n(12 hrs avg. turnaround)" },
      { label: "OUTPUT", big: "7x",    sub: "sample throughput per\nscientist (46,620 vs. 6,660/yr)" },
    ];
    const colW = 3.0;
    const colStartX = 0.5;
    stats.forEach((st, i) => {
      const x = colStartX + i * colW;
      s.addText(st.label, {
        x, y: 1.5, w: colW, h: 0.3,
        fontSize: 11, fontFace: "Calibri", bold: true,
        color: TEAL, charSpacing: 6, align: "center", margin: 0,
      });
      s.addText(st.big, {
        x, y: 1.85, w: colW, h: 0.9,
        fontSize: 54, fontFace: "Calibri", bold: true,
        color: WHITE, align: "center", margin: 0,
      });
      s.addText(st.sub, {
        x, y: 2.85, w: colW, h: 0.6,
        fontSize: 11, fontFace: "Calibri",
        color: TEXT_MUTED, align: "center", margin: 0,
      });
    });

    // Supporting evidence header
    s.addText("SUPPORTING EVIDENCE", {
      x: 0.4, y: 3.75, w: 9, h: 0.3,
      fontSize: 11, fontFace: "Calibri", bold: true,
      color: TEAL, charSpacing: 6, margin: 0,
    });

    // Bullets
    s.addText(
      [
        { text: "ECL operates 24/7/365; experiments run while you sleep", options: { bullet: true, breakLine: true } },
        { text: "200+ instrument models controlled through a single software interface (Command Center)", options: { bullet: true, breakLine: true } },
        { text: "Zero physical infrastructure, staffing, or maintenance required", options: { bullet: true, breakLine: true } },
        { text: "Every protocol codified in Symbolic Lab Language (SLL); push-button reproducibility, ALCOA+ compliant", options: { bullet: true } },
      ],
      {
        x: 0.45, y: 4.1, w: 9.1, h: 1.15,
        fontSize: 11, fontFace: "Calibri",
        color: WHITE, paraSpaceAfter: 3, margin: 0,
      }
    );

    addFooter(s, 2);
  }

  // ══════════════════════════════════════════════════════════════════════
  // SLIDE 3 — How it works: 4-step workflow with icons
  // ══════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: BG_NAVY };
    addEyebrowAndTitle(s, "HOW IT WORKS", "A single workspace for your entire scientific workflow.");

    const steps = [
      { icon: iconCommand,  title: "1. Command", desc: "PLACEHOLDER" },
      { icon: iconRun,      title: "2. Run",     desc: "PLACEHOLDER" },
      { icon: iconExplore,  title: "3. Explore", desc: "ECL Constellation organizes data into a knowledge graph, growing with every experiment" },
      { icon: iconAnalyze,  title: "4. Analyze", desc: "Command Center provides 4,500+ tools to plot, analyze, and visualize your results" },
    ];

    const colW = 2.25;
    const startX = 0.35;
    const iconY = 1.55;
    const iconSize = 0.9;
    const titleY = 2.7;
    const descY = 3.15;

    steps.forEach((step, i) => {
      const colX = startX + i * colW;
      const iconCenterX = colX + colW / 2;
      // Icon
      s.addImage({
        data: step.icon,
        x: iconCenterX - iconSize / 2, y: iconY,
        w: iconSize, h: iconSize,
      });
      // Connector line between icons (not after last)
      if (i < steps.length - 1) {
        const nextIconCenterX = colX + colW + colW / 2;
        s.addShape(pres.shapes.LINE, {
          x: iconCenterX + iconSize / 2 + 0.05, y: iconY + iconSize / 2,
          w: nextIconCenterX - iconCenterX - iconSize - 0.1, h: 0,
          line: { color: TEAL_DIM, width: 1 },
        });
      }
      // Step title
      s.addText(step.title, {
        x: colX, y: titleY, w: colW, h: 0.38,
        fontSize: 18, fontFace: "Calibri", bold: true,
        color: WHITE, align: "center", margin: 0,
      });
      // Description
      s.addText(step.desc, {
        x: colX + 0.15, y: descY, w: colW - 0.3, h: 1.0,
        fontSize: 10.5, fontFace: "Calibri",
        color: TEXT_MUTED, align: "center", margin: 0,
      });
    });

    // Divider line above footer strip
    s.addShape(pres.shapes.LINE, {
      x: 0.4, y: 4.55, w: 9.2, h: 0,
      line: { color: "2A3B55", width: 1 },
    });

    // Footer strip with bullet-separated highlights
    s.addText(
      [
        { text: "200+ instruments",  options: { color: TEAL, bold: true } },
        { text: "   ·   ",            options: { color: TEXT_MUTED } },
        { text: "24/7/365 operation", options: { color: WHITE } },
        { text: "   ·   ",            options: { color: TEXT_MUTED } },
        { text: "ALCOA+ compliant",   options: { color: WHITE } },
        { text: "   ·   ",            options: { color: TEXT_MUTED } },
        { text: "Push-button reproducibility", options: { color: WHITE } },
        { text: "   ·   ",            options: { color: TEXT_MUTED } },
        { text: "~5 new instruments/month", options: { color: TEAL, bold: true } },
      ],
      {
        x: 0.4, y: 4.72, w: 9.2, h: 0.4,
        fontSize: 11, fontFace: "Calibri",
        align: "center", margin: 0,
      }
    );

    addFooter(s, 3);
  }

  // ══════════════════════════════════════════════════════════════════════
  // SLIDE 4 — Where we stand: comparison grid (manual shapes for portability)
  // ══════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: BG_NAVY };
    addEyebrowAndTitle(s, "WHERE WE STAND", "Neither option is fast and affordable.");

    const gridX = 0.4, gridY = 1.45;
    const colWs = [2.3, 2.3, 2.3, 2.3];
    const colXs = [gridX, gridX + colWs[0], gridX + colWs[0] + colWs[1], gridX + colWs[0] + colWs[1] + colWs[2]];
    const headerH = 0.55;
    const rowH = 0.55;
    const rowYs = [gridY + headerH,
                   gridY + headerH + rowH,
                   gridY + headerH + rowH * 2,
                   gridY + headerH + rowH * 3];

    // Header cells (columns 2-4: In-House, CRO, The gap)
    const headerLabels = [
      { big: "In-House", small: "Build your own lab",      color: WHITE },
      { big: "CRO",      small: "Outsource experiments",   color: WHITE },
      { big: "The gap",  small: "Fast + affordable + flexible", color: TEAL },
    ];
    headerLabels.forEach((h, i) => {
      const x = colXs[i + 1];
      s.addText(h.big, {
        x, y: gridY, w: colWs[i + 1], h: 0.32,
        fontSize: 17, fontFace: "Calibri", bold: true,
        color: h.color, align: "center", valign: "bottom", margin: 0,
      });
      s.addText(h.small, {
        x, y: gridY + 0.3, w: colWs[i + 1], h: 0.22,
        fontSize: 10, fontFace: "Calibri",
        color: TEXT_MUTED, align: "center", valign: "top", margin: 0,
      });
    });

    // Row label + value rows. Alternating fill per row.
    const rowDefs = [
      { label: "Upfront cost",          cells: [{ ok: false, t: "$2–10M buildout" }, { ok: true, t: "Pay-per-use" },           { ok: true, t: "Low" }] },
      { label: "Time to first\nexperiment", cells: [{ ok: false, t: "6–18 months" },     { ok: false, t: "4–8 weeks" },           { ok: true, t: "Days" }] },
      { label: "IP ownership",          cells: [{ ok: true,  t: "Full" },             { ok: false, t: "Shared / contested" }, { ok: true, t: "Full" }] },
      { label: "Flexibility",           cells: [{ ok: true,  t: "Full" },             { ok: false, t: "Vendor-constrained" }, { ok: true, t: "Full" }] },
    ];

    rowDefs.forEach((row, rIdx) => {
      const ry = rowYs[rIdx];
      // Label cell background (darker)
      s.addShape(pres.shapes.RECTANGLE, {
        x: colXs[0], y: ry, w: colWs[0], h: rowH,
        fill: { color: ROW_HEADER }, line: { type: "none" },
      });
      // Data cell backgrounds (alternating)
      const dataFill = rIdx % 2 === 0 ? ROW_ALT : "152642";
      for (let c = 1; c < 4; c++) {
        s.addShape(pres.shapes.RECTANGLE, {
          x: colXs[c], y: ry, w: colWs[c], h: rowH,
          fill: { color: dataFill }, line: { type: "none" },
        });
      }
      // Label
      s.addText(row.label, {
        x: colXs[0] + 0.15, y: ry, w: colWs[0] - 0.2, h: rowH,
        fontSize: 12, fontFace: "Calibri", bold: true,
        color: WHITE, valign: "middle", margin: 0,
      });
      // Data cells
      row.cells.forEach((cell, cIdx) => {
        const cx = colXs[cIdx + 1];
        const color = cell.ok ? TEAL : PINK_HIGH;
        const mark = cell.ok ? "✓" : "✗";
        s.addText(
          [
            { text: mark + "  ", options: { color, bold: true } },
            { text: cell.t,      options: { color, bold: true, italic: true } },
          ],
          {
            x: cx + 0.15, y: ry, w: colWs[cIdx + 1] - 0.2, h: rowH,
            fontSize: 12, fontFace: "Calibri", valign: "middle", margin: 0,
          }
        );
      });
    });

    // "The Question" callout at the bottom
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.4, y: 4.55, w: 9.2, h: 0.7,
      fill: { color: ROW_ALT }, line: { type: "none" },
    });
    // Left teal accent bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.4, y: 4.55, w: 0.05, h: 0.7,
      fill: { color: TEAL }, line: { type: "none" },
    });
    s.addText("THE\nQUESTION", {
      x: 0.55, y: 4.6, w: 1.4, h: 0.6,
      fontSize: 10, fontFace: "Calibri", bold: true,
      color: TEAL, charSpacing: 4, valign: "middle", margin: 0,
    });
    s.addText("How do we build capacity for Series B, without in-house capital or CRO trade-offs?", {
      x: 2.0, y: 4.6, w: 7.5, h: 0.6,
      fontSize: 13, fontFace: "Calibri", bold: true,
      color: WHITE, valign: "middle", margin: 0,
    });

    addFooter(s, 4);
  }

  // ══════════════════════════════════════════════════════════════════════
  // SLIDE 5 — The Problem: 3 big stats + bullets
  // ══════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: BG_NAVY };
    addEyebrowAndTitle(s, "THE PROBLEM", "Traditional R&D is stuck.");

    const stats = [
      { label: "ACCESS", big: "80%+", sub: "of scientists cite instrument\naccess as a major impediment" },
      { label: "DELAYS", big: "30%+", sub: "of scientists suffer project\ndelays exceeding six months" },
      { label: "LABOR",  big: ">50%", sub: "of scientist time is spent on\nmanual labor, not science" },
    ];
    const colW = 3.0;
    const startX = 0.5;
    stats.forEach((st, i) => {
      const x = startX + i * colW;
      s.addText(st.label, {
        x, y: 1.5, w: colW, h: 0.3,
        fontSize: 11, fontFace: "Calibri", bold: true,
        color: TEAL, charSpacing: 6, align: "center", margin: 0,
      });
      s.addText(st.big, {
        x, y: 1.85, w: colW, h: 0.9,
        fontSize: 60, fontFace: "Calibri", bold: true,
        color: WHITE, align: "center", margin: 0,
      });
      s.addText(st.sub, {
        x, y: 2.85, w: colW, h: 0.6,
        fontSize: 11, fontFace: "Calibri",
        color: TEXT_MUTED, align: "center", margin: 0,
      });
    });

    // What this means header
    s.addText("WHAT THIS MEANS", {
      x: 0.4, y: 3.75, w: 9, h: 0.3,
      fontSize: 11, fontFace: "Calibri", bold: true,
      color: TEAL, charSpacing: 6, margin: 0,
    });

    s.addText(
      [
        { text: "In-house buildout costs $2-10M + 6-18 months; capital Series A/B can't spare", options: { bullet: { code: "25CF" }, breakLine: true } },
        { text: "CRO onboarding averages ≥1 month per experiment; incompatible with 12-month milestones", options: { bullet: { code: "25CF" }, breakLine: true } },
        { text: "Onboarding delays are unpredictable by design; no SLA, no vendor lock-in leverage", options: { bullet: { code: "25CF" } } },
      ],
      {
        x: 0.45, y: 4.1, w: 9.1, h: 1.15,
        fontSize: 11, fontFace: "Calibri",
        color: WHITE, paraSpaceAfter: 5, margin: 0,
      }
    );

    addFooter(s, 5);
  }

  // ══════════════════════════════════════════════════════════════════════
  // SLIDE 6 — Financial impact: grouped bar chart + sample stats
  // ══════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: BG_NAVY };
    addEyebrowAndTitle(s, "FINANCIAL IMPACT", "Half the cost. Seven times the samples.");

    // Grouped bar chart — R&D Expenditure by Year ($M)
    const chartData = [
      { name: "In-House",        labels: ["Year 1", "Year 2", "Year 3"], values: [3, 4, 5] },
      { name: "CRO",             labels: ["Year 1", "Year 2", "Year 3"], values: [4, 6, 8] },
      { name: "Cloud Lab (ECL)", labels: ["Year 1", "Year 2", "Year 3"], values: [1, 3, 4] },
    ];
    s.addChart(pres.charts.BAR, chartData, {
      x: 0.3, y: 1.45, w: 5.6, h: 3.05,
      barDir: "col", barGrouping: "clustered",
      chartColors: [AMBER, MAUVE, TEAL],
      showTitle: true, title: "R&D Expenditure by Year ($M)",
      titleColor: TEXT_MUTED, titleFontSize: 12, titleFontFace: "Calibri",
      chartArea: { fill: { color: BG_NAVY }, border: { pt: 0, color: BG_NAVY } },
      plotArea: { fill: { color: BG_NAVY } },
      catAxisLabelColor: TEXT_MUTED, catAxisLabelFontSize: 10, catAxisLabelFontFace: "Calibri",
      valAxisLabelColor: TEXT_MUTED, valAxisLabelFontSize: 10, valAxisLabelFontFace: "Calibri",
      valAxisHidden: true,
      catGridLine: { style: "none" },
      valGridLine: { style: "none" },
      showValue: true,
      dataLabelColor: WHITE, dataLabelFontSize: 10, dataLabelFontFace: "Calibri",
      dataLabelPosition: "outEnd",
      showLegend: true, legendPos: "b",
      legendColor: TEXT_MUTED, legendFontSize: 10, legendFontFace: "Calibri",
    });

    // Right column: CUMULATIVE SAMPLES
    s.addText("CUMULATIVE SAMPLES", {
      x: 6.3, y: 1.45, w: 3.4, h: 0.3,
      fontSize: 11, fontFace: "Calibri", bold: true,
      color: TEAL, charSpacing: 6, margin: 0,
    });

    const sampleRows = [
      { year: "Year 1", big: "46.6K", sub: "In-House: 6.7K  ·  CRO: 6.7K" },
      { year: "Year 2", big: "93.2K", sub: "In-House: 13.3K  ·  CRO: 13.3K" },
      { year: "Year 3", big: "140K",  sub: "In-House: 20K  ·  CRO: 20K" },
    ];
    sampleRows.forEach((row, i) => {
      const yTop = 1.82 + i * 0.92;
      s.addText(row.year, {
        x: 6.3, y: yTop, w: 3.4, h: 0.28,
        fontSize: 12, fontFace: "Calibri", bold: true,
        color: WHITE, margin: 0,
      });
      s.addText(row.big, {
        x: 6.3, y: yTop + 0.25, w: 3.4, h: 0.5,
        fontSize: 28, fontFace: "Calibri", bold: true,
        color: TEAL, margin: 0,
      });
      s.addText(row.sub, {
        x: 6.3, y: yTop + 0.72, w: 3.4, h: 0.22,
        fontSize: 9, fontFace: "Calibri",
        color: TEXT_MUTED, margin: 0,
      });
    });

    // Bottom line
    s.addText("BOTTOM LINE", {
      x: 0.4, y: 4.58, w: 9, h: 0.3,
      fontSize: 11, fontFace: "Calibri", bold: true,
      color: TEAL, charSpacing: 6, margin: 0,
    });
    s.addText(
      [
        { text: "Year 1: ",                  options: { color: WHITE } },
        { text: "$1.3M",                     options: { color: TEAL, bold: true } },
        { text: " vs. $2.6M (in-house) vs. $3.8M (CRO). Per sample: ", options: { color: WHITE } },
        { text: "~$28",                      options: { color: TEAL, bold: true } },
        { text: " vs. ~$270 vs. ~$385.",     options: { color: WHITE } },
      ],
      { x: 0.4, y: 4.9, w: 9.2, h: 0.35, fontSize: 12, fontFace: "Calibri", margin: 0 }
    );

    addFooter(s, 6);
  }

  // ══════════════════════════════════════════════════════════════════════
  // SLIDE 7 — Cost comparison detailed grid (manual shapes for portability)
  // ══════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: BG_NAVY };
    addEyebrowAndTitle(
      s,
      "COST COMPARISON",
      "ECL eliminates $1.5M in buildout and 6 technicians.",
      { titleH: 0.55 }
    );

    const gridX = 0.4, gridY = 1.55;
    const colWs = [2.9, 2.1, 2.1, 2.1];
    const colXs = [0, 0, 0, 0];
    colXs[0] = gridX;
    colXs[1] = colXs[0] + colWs[0];
    colXs[2] = colXs[1] + colWs[1];
    colXs[3] = colXs[2] + colWs[2];

    const headerH = 0.42;
    const rowHs   = [0.35, 0.35, 0.60, 0.35, 0.35, 0.35];
    const rowYs = [];
    let yAcc = gridY + headerH;
    for (let i = 0; i < rowHs.length; i++) {
      rowYs.push(yAcc);
      yAcc += rowHs[i];
    }

    // Column header pills (only for data columns, with colored fill)
    const headerSpecs = [
      { label: "In-House",  fill: AMBER, color: BG_NAVY },
      { label: "CRO",       fill: MAUVE, color: WHITE },
      { label: "Cloud Lab", fill: TEAL,  color: BG_NAVY },
    ];
    headerSpecs.forEach((h, i) => {
      const x = colXs[i + 1] + 0.15, w = colWs[i + 1] - 0.3;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: gridY + 0.04, w, h: headerH - 0.08,
        fill: { color: h.fill }, line: { type: "none" },
      });
      s.addText(h.label, {
        x, y: gridY + 0.04, w, h: headerH - 0.08,
        fontSize: 13, fontFace: "Calibri", bold: true,
        color: h.color, align: "center", valign: "middle", margin: 0,
      });
    });

    // Row content
    const rowDefs = [
      { label: "Initial Buildout Costs",             cells: ["$1.5M", "$0", "$0"] },
      { label: "Instrumentation Maintenance / Year", cells: ["$150K", "$0", "$0"] },
      { label: "R&D Team Required",
        cells: ["3 Scientists\n6 Technicians", "1 PM + 3 Scientists\n6 Techs + 1 In-House", "3 Scientists"] },
      { label: "R&D Headcount Costs / Year",         cells: ["$1.07M", "$150K",  "$450K"] },
      { label: "External Costs / Year",              cells: ["$0",     "$1.87M", "$696K"] },
      { label: "Samples Processed / Year",           cells: ["6,660",  "6,660",  "46,620"] },
    ];
    const dataColors = [AMBER, MAUVE, TEAL];

    rowDefs.forEach((row, rIdx) => {
      const ry = rowYs[rIdx];
      const rh = rowHs[rIdx];
      // Label cell fill (darker)
      s.addShape(pres.shapes.RECTANGLE, {
        x: colXs[0], y: ry, w: colWs[0], h: rh,
        fill: { color: ROW_HEADER }, line: { type: "none" },
      });
      // Data fills (alternating ROW_ALT / slightly darker)
      const dataFill = rIdx % 2 === 0 ? ROW_ALT : "152642";
      for (let c = 1; c < 4; c++) {
        s.addShape(pres.shapes.RECTANGLE, {
          x: colXs[c], y: ry, w: colWs[c], h: rh,
          fill: { color: dataFill }, line: { type: "none" },
        });
      }
      // Row label
      s.addText(row.label, {
        x: colXs[0] + 0.15, y: ry, w: colWs[0] - 0.2, h: rh,
        fontSize: 11, fontFace: "Calibri", bold: true,
        color: WHITE, valign: "middle", margin: 0,
      });
      // Data cells
      row.cells.forEach((txt, cIdx) => {
        const isCloudLab = cIdx === 2;
        s.addText(txt, {
          x: colXs[cIdx + 1], y: ry, w: colWs[cIdx + 1], h: rh,
          fontSize: 11, fontFace: "Calibri",
          color: dataColors[cIdx], bold: isCloudLab,
          align: "center", valign: "middle", margin: 0,
        });
      });
    });

    // Bottom line
    s.addText("BOTTOM LINE", {
      x: 0.4, y: 4.6, w: 9, h: 0.28,
      fontSize: 11, fontFace: "Calibri", bold: true,
      color: TEAL, charSpacing: 6, margin: 0,
    });
    s.addText(
      [
        { text: "7× the samples with ",  options: { color: WHITE } },
        { text: "3 scientists;",          options: { color: WHITE, bold: true } },
        { text: " no technicians, no buildout. Year 1: ", options: { color: WHITE } },
        { text: "$1.15M",                 options: { color: TEAL, bold: true } },
        { text: " vs. $2.72M (in-house) vs. $2.02M (CRO).", options: { color: WHITE } },
      ],
      { x: 0.4, y: 4.88, w: 9.2, h: 0.4, fontSize: 11, fontFace: "Calibri", margin: 0 }
    );

    addFooter(s, 7);
  }

  // ══════════════════════════════════════════════════════════════════════
  // SLIDE 8 — Remote access: horizontal bar comparison
  // ══════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: BG_NAVY };
    addEyebrowAndTitle(s, "REMOTE ACCESS", "Only ECL enables 100% remote wet lab work.");

    // 4 rows: label on left, bar on right with value at end
    const rows = [
      { label: "Workforce wanting remote-work options\npost-pandemic ¹", pct: 99,  barColor: GRAY_BAR,  valueColor: WHITE,  showBar: true },
      { label: "Workforce wanting to work remotely\nat least part-time ²", pct: 59, barColor: GRAY_BAR, valueColor: WHITE,  showBar: true },
      { label: "Experiments that can run remotely\nin traditional wet labs", pct: 0, barColor: null,    valueColor: AMBER,  showBar: false },
      { label: "Experiments that can run remotely\non the ECL platform", pct: 100, barColor: TEAL,     valueColor: WHITE,  showBar: true },
    ];

    const labelX = 0.4, labelW = 3.3;
    const barStartX = 3.85;
    const barMaxW = 5.65;
    const rowStartY = 1.55;
    const rowH = 0.65;
    const rowGap = 0.22;

    // Vertical divider between labels and bars
    s.addShape(pres.shapes.LINE, {
      x: barStartX - 0.05, y: rowStartY - 0.05, w: 0, h: (rowH + rowGap) * rows.length - rowGap + 0.1,
      line: { color: "2A3B55", width: 1 },
    });

    rows.forEach((r, i) => {
      const y = rowStartY + i * (rowH + rowGap);
      // Label
      s.addText(r.label, {
        x: labelX, y: y, w: labelW, h: rowH,
        fontSize: 11, fontFace: "Calibri",
        color: TEXT_MUTED, align: "right", valign: "middle", margin: 0,
      });
      if (r.showBar) {
        const barW = Math.max(0.4, (r.pct / 100) * barMaxW);
        s.addShape(pres.shapes.RECTANGLE, {
          x: barStartX, y: y + 0.08, w: barW, h: rowH - 0.16,
          fill: { color: r.barColor }, line: { type: "none" },
        });
        // Percent label at end of bar (inside, right-aligned)
        s.addText(`${r.pct}%`, {
          x: barStartX + barW - 0.95, y: y + 0.08, w: 0.85, h: rowH - 0.16,
          fontSize: 18, fontFace: "Calibri", bold: true,
          color: r.valueColor, align: "right", valign: "middle", margin: 0,
        });
      } else {
        // 0% -- no bar, just large amber text next to the divider
        s.addText("0%", {
          x: barStartX + 0.1, y: y, w: 1.2, h: rowH,
          fontSize: 32, fontFace: "Calibri", bold: true,
          color: r.valueColor, valign: "middle", margin: 0,
        });
      }
    });

    addFooter(s, 8);
  }

  // ══════════════════════════════════════════════════════════════════════
  // SLIDE 9 — Why Cloud Lab: 4-column icon grid + bottom stats
  // ══════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: BG_NAVY };
    addEyebrowAndTitle(
      s,
      "WHY CLOUD LAB",
      "Four barriers down: efficiency, flexibility, reproducibility, access.",
      { titleH: 0.55 }
    );

    const cols = [
      { icon: iconDollar, title: "Efficiency",     desc: "50% lower Year 1 spend;\nzero buildout, zero\nmaintenance overhead" },
      { icon: iconFlex,   title: "Flexibility",    desc: "200+ instruments on demand;\n~5 new models onboarded\nper month" },
      { icon: iconRepro,  title: "Reproducibility", desc: "Every protocol codified in SLL;\npush-button re-execution;\nALCOA+ compliant data" },
      { icon: iconAccess, title: "Accessibility",  desc: "100% remote operation;\naccess from anywhere;\nno co-location required" },
    ];

    const colW = 2.3;
    const startX = 0.45;
    const iconY = 1.5;
    const iconSize = 0.7;
    cols.forEach((col, i) => {
      const x = startX + i * colW;
      const iconCenterX = x + colW / 2;
      s.addImage({
        data: col.icon,
        x: iconCenterX - iconSize / 2, y: iconY,
        w: iconSize, h: iconSize,
      });
      s.addText(col.title, {
        x, y: iconY + iconSize + 0.1, w: colW, h: 0.35,
        fontSize: 16, fontFace: "Calibri", bold: true,
        color: WHITE, align: "center", margin: 0,
      });
      s.addText(col.desc, {
        x: x + 0.1, y: iconY + iconSize + 0.5, w: colW - 0.2, h: 0.95,
        fontSize: 10.5, fontFace: "Calibri",
        color: TEXT_MUTED, align: "center", margin: 0,
      });
    });

    // Divider line
    s.addShape(pres.shapes.LINE, {
      x: 0.5, y: 4.05, w: 9, h: 0,
      line: { color: "2A3B55", width: 1 },
    });

    // Bottom stat row
    const bottomStats = [
      { big: "46,620",   sub: "samples/yr per team" },
      { big: "24/7/365", sub: "facility operation" },
      { big: "0% → 100%", sub: "remote experiments" },
      { big: "4,500+",   sub: "analysis functions" },
    ];
    bottomStats.forEach((st, i) => {
      const x = startX + i * colW;
      s.addText(st.big, {
        x, y: 4.2, w: colW, h: 0.5,
        fontSize: 24, fontFace: "Calibri", bold: true,
        color: TEAL, align: "center", margin: 0,
      });
      s.addText(st.sub, {
        x, y: 4.72, w: colW, h: 0.3,
        fontSize: 10.5, fontFace: "Calibri",
        color: TEXT_MUTED, align: "center", margin: 0,
      });
    });

    addFooter(s, 9);
  }

  // ══════════════════════════════════════════════════════════════════════
  // SLIDE 10 — Data Value: area chart + bulleted list
  // ══════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: BG_NAVY };
    addEyebrowAndTitle(s, "DATA VALUE", "Every experiment compounds your knowledge graph.", { titleH: 0.55 });

    // Exponential growth area chart (reaches ~3500 at x=10)
    const xs = Array.from({ length: 11 }, (_, i) => i);  // 0..10
    const ys = xs.map((x) => Math.round(Math.pow(1.85, x) * 6));
    s.addChart(pres.charts.AREA, [
      { name: "ECL data objects", labels: xs.map(String), values: ys },
    ], {
      x: 0.3, y: 1.55, w: 5.7, h: 3.2,
      chartColors: [TEAL],
      chartColorsOpacity: 90,
      showTitle: true, title: "Scientific data generated on ECL (thousands of objects)",
      titleColor: TEXT_MUTED, titleFontSize: 11, titleFontFace: "Calibri",
      chartArea: { fill: { color: BG_NAVY }, border: { pt: 0, color: BG_NAVY } },
      plotArea: { fill: { color: BG_NAVY } },
      catAxisLabelColor: TEXT_MUTED, catAxisLabelFontSize: 9, catAxisLabelFontFace: "Calibri",
      valAxisLabelColor: TEXT_MUTED, valAxisLabelFontSize: 9, valAxisLabelFontFace: "Calibri",
      valAxisMinVal: 0,
      catGridLine: { style: "none" },
      valGridLine: { style: "none" },
      showLegend: false,
    });

    // Right panel header
    s.addText("DATA FROM ECL IS", {
      x: 6.3, y: 1.55, w: 3.4, h: 0.3,
      fontSize: 11, fontFace: "Calibri", bold: true,
      color: TEAL, charSpacing: 6, margin: 0,
    });

    // Bullet list
    s.addText(
      [
        { text: "Highly structured",              options: { bullet: { code: "25CF" }, breakLine: true } },
        { text: "Indexed and searchable",         options: { bullet: { code: "25CF" }, breakLine: true } },
        { text: "Instantly available online",     options: { bullet: { code: "25CF" }, breakLine: true } },
        { text: "Linked to experimental techniques", options: { bullet: { code: "25CF" }, breakLine: true } },
        { text: "Push-button reproducible",       options: { bullet: { code: "25CF" } } },
      ],
      {
        x: 6.3, y: 1.95, w: 3.5, h: 2.4,
        fontSize: 12, fontFace: "Calibri",
        color: WHITE, paraSpaceAfter: 8, margin: 0,
      }
    );

    // Caption / note
    s.addText(
      "Traditional lab data: <40% accessible after 2 years (Current Biology, 2014). ECL data is structured, indexed, and searchable indefinitely.",
      {
        x: 0.4, y: 4.88, w: 9.2, h: 0.35,
        fontSize: 10, fontFace: "Calibri", italic: true,
        color: TEAL, margin: 0,
      }
    );

    addFooter(s, 10);
  }

  // ══════════════════════════════════════════════════════════════════════
  // SLIDE 11 — Risks & Mitigation: 3 risk cards with severity pills
  // ══════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: BG_NAVY };
    addEyebrowAndTitle(s, "RISKS & MITIGATION", "Three risks. All manageable.");

    const risks = [
      {
        title: "IP & Data Security",
        level: "HIGH",      levelColor: PINK_HIGH,
        desc:  "Proprietary protocols and data reside on ECL infrastructure in Austin, TX",
        mit:   "Enterprise agreements: encryption-at-rest, SOC 2 Type II, contractual IP ownership. Retain raw data exports locally. ALCOA+ audit trail.",
      },
      {
        title: "Vendor Dependency",
        level: "MEDIUM",    levelColor: AMBER_MED,
        desc:  "Single-vendor reliance creates switching cost risk if ECL changes pricing or terms",
        mit:   "12-month contracts with data portability and protocol export. SLL docs in vendor-agnostic formats. Identify 1-2 backup CROs.",
      },
      {
        title: "Instrument / Assay Gaps",
        level: "MEDIUM",    levelColor: AMBER_MED,
        desc:  "ECL may not cover 100% of assays; novel proprietary methods or late-stage organic synthesis",
        mit:   "Assay compatibility audit during 90-day POC. ECL onboards ~5 new instruments/month. Hybrid ECL + targeted CRO for gaps.",
      },
    ];

    const cardX = 0.4, cardW = 9.2, cardH = 0.95;
    const startY = 1.45, gap = 0.2;

    risks.forEach((r, i) => {
      const y = startY + i * (cardH + gap);
      // Card fill
      s.addShape(pres.shapes.RECTANGLE, {
        x: cardX, y, w: cardW, h: cardH,
        fill: { color: ROW_ALT }, line: { type: "none" },
      });
      // Left teal bar
      s.addShape(pres.shapes.RECTANGLE, {
        x: cardX, y, w: 0.06, h: cardH,
        fill: { color: TEAL }, line: { type: "none" },
      });
      // Title
      s.addText(r.title, {
        x: cardX + 0.2, y: y + 0.08, w: 6, h: 0.3,
        fontSize: 14, fontFace: "Calibri", bold: true,
        color: WHITE, margin: 0,
      });
      // Severity pill
      s.addShape(pres.shapes.RECTANGLE, {
        x: cardX + cardW - 1.0, y: y + 0.12, w: 0.85, h: 0.25,
        fill: { color: r.levelColor }, line: { type: "none" },
      });
      s.addText(r.level, {
        x: cardX + cardW - 1.0, y: y + 0.12, w: 0.85, h: 0.25,
        fontSize: 9, fontFace: "Calibri", bold: true,
        color: WHITE, charSpacing: 2, align: "center", valign: "middle", margin: 0,
      });
      // Description
      s.addText(r.desc, {
        x: cardX + 0.2, y: y + 0.38, w: cardW - 0.3, h: 0.25,
        fontSize: 10.5, fontFace: "Calibri",
        color: TEXT_MUTED, margin: 0,
      });
      // Mitigation
      s.addText(
        [
          { text: "Mitigation: ", options: { color: TEAL, bold: true } },
          { text: r.mit,          options: { color: WHITE } },
        ],
        {
          x: cardX + 0.2, y: y + 0.62, w: cardW - 0.3, h: 0.32,
          fontSize: 10.5, fontFace: "Calibri", margin: 0,
        }
      );
    });

    // Caption
    s.addText(
      "All risks reduce to LOW residual severity with countermeasures. Phased adoption further limits exposure.",
      {
        x: 0.4, y: 5.0, w: 9.2, h: 0.25,
        fontSize: 10, fontFace: "Calibri", italic: true,
        color: TEAL, margin: 0,
      }
    );

    addFooter(s, 11);
  }

  // ══════════════════════════════════════════════════════════════════════
  // SLIDE 12 — Implementation: three-phase timeline
  // ══════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: BG_NAVY };
    addEyebrowAndTitle(s, "IMPLEMENTATION", "Phased approach: POC → Scale → Integrate.");

    // Timeline: horizontal line with 3 circles
    const lineY = 1.55;
    s.addShape(pres.shapes.LINE, {
      x: 0.4, y: lineY, w: 9.2, h: 0,
      line: { color: TEAL_DIM, width: 1.5 },
    });
    const circleCenters = [1.9, 5.0, 8.1];
    const circleR = 0.14;
    circleCenters.forEach((cx) => {
      s.addShape(pres.shapes.OVAL, {
        x: cx - circleR, y: lineY - circleR, w: 2 * circleR, h: 2 * circleR,
        fill: { color: TEAL }, line: { type: "none" },
      });
    });

    const phases = [
      {
        title: "Phase 1: POC",
        sub:   "Months 1-3",
        items: [
          "Select 2-3 core assays",
          "Onboard team to Command Center",
          "Benchmark vs. CRO baselines",
          "Validate ALCOA+ data quality",
          "Define KPIs: cost, cycle time, integrity",
        ],
      },
      {
        title: "Phase 2: Scale",
        sub:   "Months 4-9",
        items: [
          "Expand to 10+ assay types",
          "Integrate data pipeline",
          "Negotiate enterprise contract",
          "Establish hybrid CRO model",
          "Target 50K+ samples/yr/scientist",
        ],
      },
      {
        title: "Phase 3: Integrate",
        sub:   "Months 10-12",
        items: [
          "ECL as primary platform",
          "Retire 60-80% of CRO contracts",
          "Build SLL expertise (2-3 users)",
          "Data governance + ML readiness",
          "Full ROI assessment for board",
        ],
      },
    ];

    const colW = 3.05;
    const startX = 0.4;
    phases.forEach((p, i) => {
      const x = startX + i * colW;
      // Phase title
      s.addText(p.title, {
        x: x + 0.1, y: 1.9, w: colW - 0.2, h: 0.35,
        fontSize: 17, fontFace: "Calibri", bold: true,
        color: TEAL, margin: 0,
      });
      // Sub-months
      s.addText(p.sub, {
        x: x + 0.1, y: 2.27, w: colW - 0.2, h: 0.25,
        fontSize: 10.5, fontFace: "Calibri",
        color: TEXT_MUTED, margin: 0,
      });
      // Bullets
      s.addText(
        p.items.map((item, idx) => ({
          text: item,
          options: { bullet: { code: "25CF" }, breakLine: idx < p.items.length - 1 },
        })),
        {
          x: x + 0.15, y: 2.6, w: colW - 0.3, h: 1.95,
          fontSize: 11, fontFace: "Calibri",
          color: WHITE, paraSpaceAfter: 6, margin: 0,
        }
      );
      // Vertical divider between columns (not after last)
      if (i < phases.length - 1) {
        s.addShape(pres.shapes.LINE, {
          x: x + colW, y: 1.95, w: 0, h: 2.55,
          line: { color: "2A3B55", width: 1 },
        });
      }
    });

    // Go/no-go note
    s.addText(
      [
        { text: "GO/NO-GO GATES: ", options: { color: TEAL, bold: true, charSpacing: 3 } },
        {
          text:    " Phase 1→2 requires ≥80% assay success and ≤10% cost variance vs. CRO. Phase 2→3 requires enterprise contract and data pipeline sign-off.",
          options: { color: WHITE },
        },
      ],
      { x: 0.4, y: 4.75, w: 9.2, h: 0.5, fontSize: 10.5, fontFace: "Calibri", margin: 0 }
    );

    addFooter(s, 12);
  }

  // ══════════════════════════════════════════════════════════════════════
  // SLIDE 13 — Recommendation / Call to action
  // ══════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: BG_NAVY };
    // Top teal bar (echo of title slide)
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.12,
      fill: { color: TEAL }, line: { type: "none" },
    });

    // Eyebrow + title
    s.addText("RECOMMENDATION", {
      x: 0.4, y: 0.35, w: 9, h: 0.3,
      fontSize: 11, fontFace: "Calibri", bold: true,
      color: TEAL, charSpacing: 6, margin: 0,
    });
    s.addText("Adopt ECL, starting with a 90-day POC.", {
      x: 0.4, y: 0.7, w: 9.2, h: 0.55,
      fontSize: 28, fontFace: "Calibri", bold: true,
      color: WHITE, margin: 0,
    });
    s.addText("Four actions to move this forward in the next 30 days:", {
      x: 0.4, y: 1.35, w: 9.2, h: 0.3,
      fontSize: 14, fontFace: "Calibri",
      color: TEXT_MUTED, margin: 0,
    });

    // 4 numbered actions
    const actions = [
      { num: "1", verb: "APPROVE",    h: "POC scope & budget",      body: "Allocate $50-100K for platform fees and experiment costs over a 90-day window." },
      { num: "2", verb: "ASSIGN",     h: "Cross-functional team",   body: "Head of R&D as sponsor, 2 computational scientists, 1 data engineer." },
      { num: "3", verb: "ONBOARD",    h: "ECL enterprise contract", body: "Negotiate data security terms, IP ownership clauses, and SOC 2 requirements." },
      { num: "4", verb: "CHECKPOINT", h: "Review at 30 & 90 days",  body: "Review early results at day 30; go/no-go decision for scale-up at day 90." },
    ];

    const colW = 2.3;
    const startX = 0.4;
    actions.forEach((a, i) => {
      const x = startX + i * colW;
      // Big teal numeral
      s.addText(a.num, {
        x, y: 2.0, w: colW, h: 0.85,
        fontSize: 60, fontFace: "Calibri", bold: true,
        color: TEAL, margin: 0,
      });
      // Verb (teal small caps)
      s.addText(a.verb, {
        x, y: 2.92, w: colW, h: 0.28,
        fontSize: 10, fontFace: "Calibri", bold: true,
        color: TEAL, charSpacing: 4, margin: 0,
      });
      // Heading
      s.addText(a.h, {
        x, y: 3.22, w: colW - 0.1, h: 0.52,
        fontSize: 13, fontFace: "Calibri", bold: true,
        color: WHITE, margin: 0,
      });
      // Body
      s.addText(a.body, {
        x, y: 3.78, w: colW - 0.15, h: 1.0,
        fontSize: 10.5, fontFace: "Calibri",
        color: TEXT_MUTED, margin: 0,
      });
    });

    // Bottom divider
    s.addShape(pres.shapes.LINE, {
      x: 0.4, y: 4.85, w: 9.2, h: 0,
      line: { color: "2A3B55", width: 1 },
    });

    // Decision needed by
    s.addText(
      [
        { text: "DECISION NEEDED BY", options: { color: TEAL, bold: true, charSpacing: 4 } },
        { text: "   ",                options: { color: WHITE } },
        { text: "End of Q2 2026, to stay on Series B timeline.", options: { color: WHITE, bold: true } },
      ],
      { x: 0.4, y: 4.97, w: 9.2, h: 0.3, fontSize: 11, fontFace: "Calibri", margin: 0 }
    );

    // Footer (no page number per original)
    s.addText(
      [
        { text: "CONFIDENTIAL", options: { color: TEXT_DIMMER } },
        { text: "  |  ", options: { color: TEXT_DIMMER } },
        { text: "Prepared for Executive Leadership", options: { color: TEXT_DIMMER } },
      ],
      { x: 0.4, y: 5.32, w: 6, h: 0.25, fontSize: 9, fontFace: "Calibri", margin: 0 }
    );
  }

  // ────────────────────────────────────────────────────────────────────────
  // Write file
  // ────────────────────────────────────────────────────────────────────────
  await pres.writeFile({ fileName: "emerald_cloud_lab.pptx" });
  console.log("Wrote emerald_cloud_lab.pptx");
}

build().catch((e) => { console.error(e); process.exit(1); });
