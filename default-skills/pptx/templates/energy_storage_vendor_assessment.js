const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const { FaLeaf } = require("react-icons/fa");

// ─── ICON HELPER ──────────────────────────────────────────────────────────────
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

// ─── COLOR PALETTE ────────────────────────────────────────────────────────────
const C = {
  darkGreen:   "1E3A2B",
  medGreen:    "2D5F3F",
  lightGreen:  "4A8C5E",
  accentGreen: "5B9A3C",
  textGreen:   "2C5F2D",
  bgCream:     "F0EFE9",
  white:       "FFFFFF",
  darkText:    "1E3A2B",
  bodyText:    "3D3D3D",
  mutedText:   "6B7B6E",
  lightGray:   "E8E8E3",
  tableStripe: "F5F5F0",
  teslaRed:    "CC1B33",
  fluenceBlue: "2563EB",
  bydGray:     "6B7280",
  gold:        "D4A843",
  footerGreen: "3A6B42",
};

const FONT_H = "Arial Black";
const FONT_B = "Arial";

// ─── HELPER: stat card (dark green bg) ────────────────────────────────────────
function addStatCard(slide, x, y, w, h, bigText, desc) {
  slide.addShape(slide._slideLayout ? "rect" : "rect", {});  // placeholder
  slide.addShape("rect", { x, y, w, h, fill: { color: C.darkGreen }, rectRadius: 0.05 });
  slide.addText([
    { text: bigText, options: { fontSize: 28, bold: true, color: C.accentGreen, breakLine: true, fontFace: FONT_H } },
    { text: desc, options: { fontSize: 11, color: C.white, fontFace: FONT_B } }
  ], { x, y, w, h, align: "center", valign: "middle", margin: 0 });
}
// Fixed version without invalid shape call
function statCard(slide, pres, x, y, w, h, bigText, desc) {
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.darkGreen } });
  slide.addText([
    { text: bigText, options: { fontSize: 26, bold: true, color: C.accentGreen, breakLine: true, fontFace: FONT_H } },
    { text: desc, options: { fontSize: 10.5, color: C.white, fontFace: FONT_B } }
  ], { x, y, w, h, align: "center", valign: "middle", margin: 4 });
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function buildPresentation() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Infrastructure Team";
  pres.title = "Grid Energy Storage System Evaluation";

  const leafWhite = await iconToBase64Png(FaLeaf, "#FFFFFF", 256);
  const leafGreen = await iconToBase64Png(FaLeaf, "#5B9A3C", 256);

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 1 — Title
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const slide = pres.addSlide();
    slide.background = { color: C.darkGreen };
    // Bottom darker band
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.2, w: 10, h: 1.425, fill: { color: "2D5F3F", transparency: 40 } });
    // Leaf icon
    slide.addImage({ data: leafWhite, x: 0.8, y: 0.6, w: 0.7, h: 0.7 });
    // Title
    slide.addText("Grid Energy Storage\nSystem Evaluation", {
      x: 0.8, y: 1.5, w: 8.4, h: 2.0,
      fontSize: 42, fontFace: FONT_H, color: C.white, bold: true, lineSpacingMultiple: 1.1, margin: 0
    });
    // Subtitle
    slide.addText("50 MW Data Center — Technical Assessment & Recommendations", {
      x: 0.8, y: 3.4, w: 8.4, h: 0.4,
      fontSize: 15, fontFace: FONT_B, color: C.accentGreen, italic: true, margin: 0
    });
    // Footer
    slide.addText("Prepared for Management Review  |  April 2026", {
      x: 0.8, y: 4.5, w: 6, h: 0.35,
      fontSize: 12, fontFace: FONT_B, color: C.mutedText, margin: 0
    });
    slide.addText("CONFIDENTIAL", {
      x: 0.8, y: 4.95, w: 3, h: 0.35,
      fontSize: 12, fontFace: FONT_H, color: C.accentGreen, bold: true, margin: 0
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 2 — Executive Summary
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const slide = pres.addSlide();
    slide.background = { color: C.bgCream };
    // Title
    slide.addText("Executive Summary", {
      x: 0.6, y: 0.25, w: 9, h: 0.65,
      fontSize: 36, fontFace: FONT_H, color: C.darkGreen, bold: true, margin: 0
    });

    // Stat boxes
    const stats = [
      { val: "50 MW", label: "Data Center\nPower Requirement", accent: C.darkGreen },
      { val: "200 MWh", label: "Target Storage\nCapacity (4-hr)", accent: C.darkGreen },
      { val: "3", label: "Vendors\nEvaluated", accent: C.gold },
      { val: "93%+", label: "Round-Trip\nEfficiency (all)", accent: C.darkGreen },
    ];
    const boxW = 2.1, boxH = 1.15, startX = 0.6, gap = 0.2;
    stats.forEach((s, i) => {
      const bx = startX + i * (boxW + gap);
      // Card background
      slide.addShape(pres.shapes.RECTANGLE, { x: bx, y: 1.1, w: boxW, h: boxH, fill: { color: C.lightGray } });
      // Top accent bar
      slide.addShape(pres.shapes.RECTANGLE, { x: bx, y: 1.1, w: boxW, h: 0.06, fill: { color: s.accent } });
      // Value
      slide.addText(s.val, {
        x: bx, y: 1.2, w: boxW, h: 0.55,
        fontSize: 28, fontFace: FONT_H, color: C.darkGreen, bold: true, align: "center", valign: "middle", margin: 0
      });
      // Label
      slide.addText(s.label, {
        x: bx, y: 1.72, w: boxW, h: 0.48,
        fontSize: 10, fontFace: FONT_B, color: C.bodyText, align: "center", valign: "top", margin: 0
      });
    });

    // Key Finding section
    slide.addText("Key Finding", {
      x: 0.6, y: 2.55, w: 3, h: 0.35,
      fontSize: 16, fontFace: FONT_H, color: C.darkGreen, bold: true, margin: 0
    });
    slide.addText("All three vendors use LFP chemistry and can meet our 50 MW / 200 MWh requirement.", {
      x: 0.6, y: 2.88, w: 8.8, h: 0.35,
      fontSize: 12, fontFace: FONT_B, color: C.bodyText, margin: 0
    });

    // Three vendor columns
    const vendors = [
      { name: "Tesla Megapack 3", color: C.teslaRed, desc: "Strongest integrated software (Autobidder AI). Megablock cuts costs up to 40%. Ships H2 2026." },
      { name: "Fluence Gridstack Pro", color: C.fluenceBlue, desc: "Best current availability. U.S. manufacturing with ITC domestic content eligibility today." },
      { name: "BYD MC Cube-T", color: C.bydGray, desc: "Highest per-unit energy density (6.4 MWh). Faces FEOC and integration challenges in U.S." },
    ];
    const colW = 2.9, colStart = 0.6, colGap = 0.2;
    vendors.forEach((v, i) => {
      const cx = colStart + i * (colW + colGap);
      // Color bar
      slide.addShape(pres.shapes.RECTANGLE, { x: cx, y: 3.35, w: colW, h: 0.05, fill: { color: v.color } });
      // Vendor name
      slide.addText(v.name, {
        x: cx, y: 3.45, w: colW, h: 0.35,
        fontSize: 14, fontFace: FONT_H, color: C.darkGreen, bold: true, margin: 0
      });
      // Description
      slide.addText(v.desc, {
        x: cx, y: 3.78, w: colW, h: 0.8,
        fontSize: 10.5, fontFace: FONT_B, color: C.bodyText, margin: 0
      });
    });

    // Footnote line
    slide.addShape(pres.shapes.LINE, { x: 0.6, y: 4.72, w: 8.8, h: 0, line: { color: C.darkGreen, width: 0.5 } });
    slide.addText("All technical data sourced from vendor announcements, SEC filings, and industry reporting as of April 2026.", {
      x: 0.6, y: 4.78, w: 8.8, h: 0.4,
      fontSize: 9.5, fontFace: FONT_B, color: C.bodyText, italic: true, margin: 0
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 3 — BESS Market Growth & Outlook
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const slide = pres.addSlide();
    slide.background = { color: C.bgCream };
    slide.addText("BESS Market Growth & Outlook", {
      x: 0.6, y: 0.25, w: 9, h: 0.65,
      fontSize: 36, fontFace: FONT_H, color: C.darkGreen, bold: true, margin: 0
    });

    // Bar chart — U.S. BESS Installations
    slide.addChart(pres.charts.BAR, [{
      name: "GW Installed",
      labels: ["2021", "2022", "2023", "2024", "2025E", "2026E"],
      values: [4.6, 6.1, 7.5, 10.4, 18.0, 24.3]
    }], {
      x: 0.4, y: 1.0, w: 4.6, h: 3.0, barDir: "col",
      showTitle: true, title: "U.S. Utility-Scale BESS Installations (GW)",
      titleColor: C.bodyText, titleFontSize: 11, titleFontFace: FONT_B,
      chartColors: [C.darkGreen],
      showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.bodyText, dataLabelFontSize: 9,
      catAxisLabelColor: C.bodyText, catAxisLabelFontSize: 9,
      valAxisHidden: true, valGridLine: { style: "none" },
      catGridLine: { style: "none" },
      showLegend: false,
    });

    // Pie chart — Data Center BESS Applications
    slide.addChart(pres.charts.DOUGHNUT, [{
      name: "Use Cases",
      labels: ["UPS / Backup", "Peak Shaving", "Grid Interconnect", "Frequency Reg."],
      values: [35, 25, 25, 15]
    }], {
      x: 5.3, y: 1.0, w: 4.2, h: 2.8,
      showTitle: true, title: "Data Center BESS Applications",
      titleColor: C.bodyText, titleFontSize: 11, titleFontFace: FONT_B,
      chartColors: [C.darkGreen, C.medGreen, C.gold, C.accentGreen],
      showPercent: true, showLegend: true, legendPos: "b", legendFontSize: 8,
      dataLabelFontSize: 9, dataLabelColor: C.white,
    });

    // Bottom stat cards
    const bottomStats = [
      { val: "$4.1–6.0B", desc: "Projected AI data center\nstorage market by 2030" },
      { val: "28–38%", desc: "Annual growth rate\n(CAGR 2025–2030)" },
      { val: "3–5 yrs", desc: "Interconnect time saved\nwith BESS + BYOC" },
    ];
    const bsW = 2.93, bsStart = 0.6, bsGap = 0.15;
    bottomStats.forEach((s, i) => {
      const bx = bsStart + i * (bsW + bsGap);
      slide.addShape(pres.shapes.RECTANGLE, { x: bx, y: 4.15, w: bsW, h: 1.1, fill: { color: C.darkGreen } });
      slide.addText([
        { text: s.val, options: { fontSize: 22, bold: true, color: C.accentGreen, breakLine: true, fontFace: FONT_H } },
        { text: s.desc, options: { fontSize: 9.5, color: C.white, fontFace: FONT_B } }
      ], { x: bx, y: 4.15, w: bsW, h: 1.1, align: "center", valign: "middle", margin: 4 });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 4 — Tesla Megapack 3 / Megablock
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const slide = pres.addSlide();
    slide.background = { color: C.bgCream };
    slide.addText("Tesla Megapack 3 / Megablock", {
      x: 0.6, y: 0.25, w: 9, h: 0.65,
      fontSize: 36, fontFace: FONT_H, color: C.darkGreen, bold: true, margin: 0
    });

    // Spec table
    const teslaHeaders = [
      [
        { text: "Specification", options: { fill: { color: C.darkGreen }, color: C.white, bold: true, fontFace: FONT_B, fontSize: 11 } },
        { text: "Megapack 3", options: { fill: { color: C.darkGreen }, color: C.white, bold: true, fontFace: FONT_H, fontSize: 11 } },
        { text: "Megablock", options: { fill: { color: C.darkGreen }, color: C.white, bold: true, fontFace: FONT_H, fontSize: 11 } },
      ]
    ];
    const teslaRows = [
      ["Energy Capacity", "~5.0 MWh / unit", "20 MWh AC (4 × MP3)"],
      ["Chemistry", "LFP", "LFP"],
      ["Inverter", "Integrated SiC", "Integrated SiC"],
      ["Efficiency", "~93.7%", "~93.7%"],
      ["Site Density", "—", "248 MWh AC / acre"],
      ["Thermal", "Simplified thermal bay", "Shared system"],
      ["Grid-Forming", "Yes — synthetic inertia", "Yes"],
      ["Safety", "Integrated fire protection", "Integrated"],
      ["Software", "Autobidder + Powerhub", "Autobidder + Powerhub"],
      ["Warranty", "15-year", "15-year"],
      ["Availability", "Shipping H2 2026", "Shipping H2 2026"],
    ];
    const tData = teslaHeaders.concat(teslaRows.map((row, ri) => row.map((cell, ci) => ({
      text: cell,
      options: {
        fill: { color: ri % 2 === 0 ? C.tableStripe : C.white },
        color: C.bodyText, fontFace: FONT_B, fontSize: 10,
        bold: ci === 0
      }
    }))));
    slide.addTable(tData, {
      x: 0.6, y: 1.0, w: 6.2,
      colW: [1.8, 2.2, 2.2],
      border: { pt: 0.5, color: C.lightGray },
      rowH: [0.32, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3],
    });

    // Right-side stat cards
    const teslaStats = [
      { val: "~10", desc: "Megapack 3 units\nfor 50 MW / 200 MWh" },
      { val: "23%", desc: "Faster installation\n(Megablock)" },
      { val: "40%", desc: "Lower construction\ncost (Megablock)" },
      { val: "50 GWh", desc: "Houston factory\nannual capacity" },
    ];
    teslaStats.forEach((s, i) => {
      statCard(slide, pres, 7.2, 1.0 + i * 1.1, 2.4, 0.95, s.val, s.desc);
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 5 — Fluence Gridstack Pro 5000
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const slide = pres.addSlide();
    slide.background = { color: C.bgCream };
    slide.addText("Fluence Gridstack Pro 5000", {
      x: 0.6, y: 0.25, w: 9, h: 0.65,
      fontSize: 36, fontFace: FONT_H, color: C.darkGreen, bold: true, margin: 0
    });

    const fluenceHeaders = [
      [
        { text: "Specification", options: { fill: { color: C.darkGreen }, color: C.white, bold: true, fontFace: FONT_B, fontSize: 11 } },
        { text: "Details", options: { fill: { color: C.darkGreen }, color: C.white, bold: true, fontFace: FONT_H, fontSize: 11 } },
      ]
    ];
    const fluenceRows = [
      ["Energy Capacity", "4.9–5.6 MWh per 20-ft enclosure"],
      ["Chemistry", "LFP — AESC 530Ah cells"],
      ["Configurations", "2-hour and 4-hour duration"],
      ["Power Conversion", "Integrated PCS; grid-forming capable"],
      ["BMS", "Proprietary — string-level control"],
      ["Thermal", "Liquid cooling, 2/3 fewer chillers"],
      ["Safety", "UL 9540, UL 9540A, NFPA 855 ready"],
      ["Site Density", "40% improved for 100 MW 4-hr project"],
      ["Software", "Fluence OS + Nispera APM"],
      ["Manufacturing", "U.S.-made (AZ, UT, TX)"],
      ["Track Record", "22+ GWh, 90+ U.S. projects"],
    ];
    const fData = fluenceHeaders.concat(fluenceRows.map((row, ri) => row.map((cell, ci) => ({
      text: cell,
      options: {
        fill: { color: ri % 2 === 0 ? C.tableStripe : C.white },
        color: C.bodyText, fontFace: FONT_B, fontSize: 10,
        bold: ci === 0
      }
    }))));
    slide.addTable(fData, {
      x: 0.6, y: 1.0, w: 6.2,
      colW: [1.8, 4.4],
      border: { pt: 0.5, color: C.lightGray },
      rowH: [0.32, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3],
    });

    const fluenceStats = [
      { val: "36–41", desc: "Enclosures needed\nfor 50 MW / 200 MWh" },
      { val: "22+ GWh", desc: "Deployed or contracted\nacross U.S." },
      { val: "ITC \u2713", desc: "Domestic content\nadder eligible now" },
      { val: "$2.3B", desc: "FY2025 revenue\n(proven scale)" },
    ];
    fluenceStats.forEach((s, i) => {
      statCard(slide, pres, 7.2, 1.0 + i * 1.1, 2.4, 0.95, s.val, s.desc);
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 6 — BYD MC Cube-T
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const slide = pres.addSlide();
    slide.background = { color: C.bgCream };
    slide.addText("BYD MC Cube-T", {
      x: 0.6, y: 0.25, w: 9, h: 0.65,
      fontSize: 36, fontFace: FONT_H, color: C.darkGreen, bold: true, margin: 0
    });

    const bydHeaders = [
      [
        { text: "Specification", options: { fill: { color: C.darkGreen }, color: C.white, bold: true, fontFace: FONT_B, fontSize: 11 } },
        { text: "Details", options: { fill: { color: C.darkGreen }, color: C.white, bold: true, fontFace: FONT_H, fontSize: 11 } },
      ]
    ];
    const bydRows = [
      ["Energy Capacity", "6.432 MWh per unit (highest in class)"],
      ["Chemistry", "LFP — BYD Blade Battery (long blade)"],
      ["Integration", "CTS (Cell-to-System) direct integration"],
      ["Power Conversion", "External PCS required"],
      ["Thermal", "Liquid cooling; IP55-rated enclosure"],
      ["Safety", "Blade nail penetration test; UL 9540"],
      ["Footprint", "24.7% smaller vs prior MC Cube"],
      ["Energy Density", "430 Wh/L system-level"],
      ["Software", "BYD BMS; third-party EMS"],
      ["Manufacturing", "Primarily China-based"],
      ["Track Record", "#1 reliability CAISO (CA, 2025)"],
    ];
    const bData = bydHeaders.concat(bydRows.map((row, ri) => row.map((cell, ci) => ({
      text: cell,
      options: {
        fill: { color: ri % 2 === 0 ? C.tableStripe : C.white },
        color: C.bodyText, fontFace: FONT_B, fontSize: 10,
        bold: ci === 0
      }
    }))));
    slide.addTable(bData, {
      x: 0.6, y: 1.0, w: 6.2,
      colW: [1.8, 4.4],
      border: { pt: 0.5, color: C.lightGray },
      rowH: [0.32, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3],
    });

    const bydStats = [
      { val: "~31", desc: "Units needed for\n50 MW / 200 MWh" },
      { val: "6.4 MWh", desc: "Highest per-unit\ncapacity in class" },
      { val: "#1", desc: "CAISO reliability\nranking (CA 2025)" },
      { val: "430 Wh/L", desc: "System energy\ndensity" },
    ];
    bydStats.forEach((s, i) => {
      statCard(slide, pres, 7.2, 1.0 + i * 1.1, 2.4, 0.95, s.val, s.desc);
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 7 — Capacity & Performance Comparison
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const slide = pres.addSlide();
    slide.background = { color: C.bgCream };
    slide.addText("Capacity & Performance Comparison", {
      x: 0.6, y: 0.25, w: 9, h: 0.65,
      fontSize: 36, fontFace: FONT_H, color: C.darkGreen, bold: true, margin: 0
    });

    // Bar chart 1 — Energy Capacity per Unit
    slide.addChart(pres.charts.BAR, [{
      name: "MWh per Unit",
      labels: ["Tesla MP3", "Fluence GSP", "BYD Cube-T"],
      values: [5.0, 5.3, 6.432]
    }], {
      x: 0.3, y: 0.9, w: 4.5, h: 2.3, barDir: "col",
      showTitle: true, title: "Energy Capacity per Unit (MWh)",
      titleColor: C.bodyText, titleFontSize: 10, titleFontFace: FONT_B,
      chartColors: [C.teslaRed, C.fluenceBlue, C.bydGray],
      showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.bodyText, dataLabelFontSize: 9,
      catAxisLabelColor: C.bodyText, catAxisLabelFontSize: 8,
      valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" },
      showLegend: false,
    });

    // Bar chart 2 — Units for 200 MWh
    slide.addChart(pres.charts.BAR, [{
      name: "Units Required",
      labels: ["Tesla MP3", "Fluence GSP", "BYD Cube-T"],
      values: [40, 38, 31]
    }], {
      x: 5.2, y: 0.9, w: 4.5, h: 2.3, barDir: "col",
      showTitle: true, title: "Approx. Units for 200 MWh",
      titleColor: C.bodyText, titleFontSize: 10, titleFontFace: FONT_B,
      chartColors: [C.teslaRed, C.fluenceBlue, C.bydGray],
      showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.bodyText, dataLabelFontSize: 9,
      catAxisLabelColor: C.bodyText, catAxisLabelFontSize: 8,
      valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" },
      showLegend: false,
    });

    // Comparison table
    const cmpHeaders = [
      [
        { text: "Category", options: { fill: { color: C.darkGreen }, color: C.white, bold: true, fontFace: FONT_B, fontSize: 10 } },
        { text: "Tesla Megapack 3", options: { fill: { color: C.darkGreen }, color: C.white, bold: true, fontFace: FONT_H, fontSize: 10 } },
        { text: "Fluence Gridstack Pro", options: { fill: { color: C.darkGreen }, color: C.white, bold: true, fontFace: FONT_H, fontSize: 10 } },
        { text: "BYD MC Cube-T", options: { fill: { color: C.darkGreen }, color: C.white, bold: true, fontFace: FONT_H, fontSize: 10 } },
      ]
    ];
    const cmpRows = [
      ["Integrated PCS", "Yes (SiC)", "Yes", "No (external)"],
      ["Grid-Forming", "Yes", "Yes", "Limited"],
      ["U.S. Manufacturing", "H2 2026", "Now", "China"],
      ["ITC Domestic Content", "Eligible 2026+", "Eligible now", "Not eligible"],
      ["Safety Certs", "UL 9540", "UL 9540/9540A, NFPA", "UL 9540"],
    ];
    const cmpData = cmpHeaders.concat(cmpRows.map((row, ri) => row.map((cell, ci) => ({
      text: cell,
      options: {
        fill: { color: ri % 2 === 0 ? C.tableStripe : C.white },
        color: C.bodyText, fontFace: FONT_B, fontSize: 10,
        bold: ci === 0, align: ci === 0 ? "left" : "center"
      }
    }))));
    slide.addTable(cmpData, {
      x: 0.5, y: 3.35, w: 9.0,
      colW: [2.0, 2.33, 2.33, 2.34],
      border: { pt: 0.5, color: C.lightGray },
      rowH: [0.32, 0.3, 0.3, 0.3, 0.3, 0.3],
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 8 — Vendor Scoring Matrix
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const slide = pres.addSlide();
    slide.background = { color: C.bgCream };
    slide.addText("Vendor Scoring Matrix", {
      x: 0.6, y: 0.25, w: 9, h: 0.65,
      fontSize: 36, fontFace: FONT_H, color: C.darkGreen, bold: true, margin: 0
    });

    // Column headers
    slide.addText("Criteria", { x: 0.6, y: 1.05, w: 2.2, h: 0.35, fontSize: 14, fontFace: FONT_H, color: C.darkGreen, bold: true, margin: 0 });
    slide.addText("Tesla", { x: 2.8, y: 1.05, w: 2.2, h: 0.35, fontSize: 14, fontFace: FONT_H, color: C.teslaRed, bold: true, margin: 0 });
    slide.addText("Fluence", { x: 5.2, y: 1.05, w: 2.2, h: 0.35, fontSize: 14, fontFace: FONT_H, color: C.fluenceBlue, bold: true, margin: 0 });
    slide.addText("BYD", { x: 7.5, y: 1.05, w: 2.0, h: 0.35, fontSize: 14, fontFace: FONT_H, color: C.bydGray, bold: true, margin: 0 });

    const criteria = [
      { name: "Energy Density", t: 8, f: 8, b: 10 },
      { name: "Software / AI", t: 10, f: 8, b: 5 },
      { name: "Safety Certifications", t: 8, f: 10, b: 7 },
      { name: "U.S. Mfg / ITC Eligibility", t: 7, f: 10, b: 3 },
      { name: "Integration Ease", t: 9, f: 9, b: 6 },
      { name: "Deployment Speed", t: 7, f: 9, b: 10 },
      { name: "Track Record", t: 9, f: 9, b: 7 },
    ];

    const rowH = 0.42, startY = 1.5, maxBarW = 1.6;
    criteria.forEach((c, i) => {
      const ry = startY + i * rowH;
      // Alternating row bg
      if (i % 2 === 0) {
        slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: ry, w: 9.0, h: rowH, fill: { color: C.lightGray } });
      }
      // Criteria name
      slide.addText(c.name, { x: 0.6, y: ry, w: 2.2, h: rowH, fontSize: 11, fontFace: FONT_B, color: C.bodyText, valign: "middle", margin: 0 });

      // Tesla bar + score
      const tw = (c.t / 10) * maxBarW;
      slide.addShape(pres.shapes.RECTANGLE, { x: 2.8, y: ry + 0.1, w: tw, h: rowH - 0.2, fill: { color: C.teslaRed } });
      slide.addText(String(c.t), { x: 2.8 + tw + 0.08, y: ry, w: 0.4, h: rowH, fontSize: 11, fontFace: FONT_B, color: C.bodyText, valign: "middle", margin: 0 });

      // Fluence bar + score
      const fw = (c.f / 10) * maxBarW;
      slide.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: ry + 0.1, w: fw, h: rowH - 0.2, fill: { color: C.fluenceBlue } });
      slide.addText(String(c.f), { x: 5.2 + fw + 0.08, y: ry, w: 0.4, h: rowH, fontSize: 11, fontFace: FONT_B, color: C.bodyText, valign: "middle", margin: 0 });

      // BYD bar + score
      const bw = (c.b / 10) * maxBarW;
      slide.addShape(pres.shapes.RECTANGLE, { x: 7.5, y: ry + 0.1, w: bw, h: rowH - 0.2, fill: { color: C.bydGray } });
      slide.addText(String(c.b), { x: 7.5 + bw + 0.08, y: ry, w: 0.4, h: rowH, fontSize: 11, fontFace: FONT_B, color: C.bodyText, valign: "middle", margin: 0 });
    });

    // Total row
    const totalY = startY + criteria.length * rowH + 0.1;
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: totalY, w: 9.0, h: 0.45, fill: { color: C.darkGreen } });
    slide.addText("TOTAL  (out of 70)", { x: 0.6, y: totalY, w: 2.2, h: 0.45, fontSize: 12, fontFace: FONT_H, color: C.white, bold: true, valign: "middle", margin: 0 });
    slide.addText("58", { x: 2.8, y: totalY, w: 2.0, h: 0.45, fontSize: 18, fontFace: FONT_H, color: C.accentGreen, bold: true, valign: "middle", margin: 0 });
    slide.addText("63", { x: 5.2, y: totalY, w: 2.0, h: 0.45, fontSize: 18, fontFace: FONT_H, color: C.accentGreen, bold: true, valign: "middle", margin: 0 });
    slide.addText("48", { x: 7.5, y: totalY, w: 2.0, h: 0.45, fontSize: 18, fontFace: FONT_H, color: C.accentGreen, bold: true, valign: "middle", margin: 0 });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 9 — Key Considerations
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const slide = pres.addSlide();
    slide.background = { color: C.bgCream };
    slide.addText("Key Considerations", {
      x: 0.6, y: 0.25, w: 9, h: 0.65,
      fontSize: 36, fontFace: FONT_H, color: C.darkGreen, bold: true, margin: 0
    });

    const kcHeaders = [
      [
        { text: "Consideration", options: { fill: { color: C.darkGreen }, color: C.white, bold: true, fontFace: FONT_B, fontSize: 10 } },
        { text: "Tesla Megapack 3", options: { fill: { color: C.darkGreen }, color: C.white, bold: true, fontFace: FONT_H, fontSize: 10 } },
        { text: "Fluence Gridstack Pro", options: { fill: { color: C.darkGreen }, color: C.white, bold: true, fontFace: FONT_H, fontSize: 10 } },
        { text: "BYD MC Cube-T", options: { fill: { color: C.darkGreen }, color: C.white, bold: true, fontFace: FONT_H, fontSize: 10 } },
      ]
    ];
    const kcRows = [
      ["Domestic Content\n& ITC", "Houston factory H2 2026;\neligible once operational", "U.S.-made now (AZ, UT, TX);\n10% ITC adder eligible today", "China-based manufacturing;\nnot eligible"],
      ["FEOC Compliance", "Compliant domestic supply\nchain under development", "FEOC-compliant supply\nchain in place", "Faces regulatory headwinds\nin U.S. market"],
      ["Integration\nComplexity", "Fully integrated turnkey:\nbattery + SiC PCS + software", "Fully integrated turnkey:\nbattery + PCS + Nispera APM", "External PCS + third-party\nEMS required"],
      ["Deployment\nTimeline", "Ships H2 2026; best for\nlater timelines or Phase 2", "Shipping now; supports\n2026 COD", "Shipping now; supports\n2026 COD"],
    ];
    const kcData = kcHeaders.concat(kcRows.map((row, ri) => row.map((cell, ci) => ({
      text: cell,
      options: {
        fill: { color: ri % 2 === 0 ? C.tableStripe : C.white },
        color: C.bodyText, fontFace: FONT_B, fontSize: 9.5,
        bold: ci === 0
      }
    }))));
    slide.addTable(kcData, {
      x: 0.4, y: 1.1, w: 9.2,
      colW: [1.7, 2.5, 2.5, 2.5],
      border: { pt: 0.5, color: C.lightGray },
      rowH: [0.35, 0.85, 0.85, 0.85, 0.85],
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 10 — Recommendation
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const slide = pres.addSlide();
    slide.background = { color: C.bgCream };
    slide.addText("Recommendation", {
      x: 0.6, y: 0.25, w: 9, h: 0.65,
      fontSize: 36, fontFace: FONT_H, color: C.darkGreen, bold: true, margin: 0
    });

    const recs = [
      {
        accent: C.fluenceBlue,
        title: "Primary: Fluence Gridstack Pro 5000    63/70",
        body: "Best overall fit. Shipping today, U.S. manufacturing, ITC eligible, grid-forming, proprietary BMS with string-level control, Nispera predictive maintenance. 22+ GWh across 90+ U.S. projects provides execution confidence."
      },
      {
        accent: C.teslaRed,
        title: "Strong Alternative: Tesla Megapack 3 / Megablock    58/70",
        body: "Best for H2 2026+ timelines. Megablock's 20 MWh units cut installation 23% and costs up to 40%. Autobidder AI trading is industry-leading. Recommended for Phase 2 expansion."
      },
      {
        accent: C.bydGray,
        title: "Consider with Caution: BYD MC Cube-T    48/70",
        body: "Highest energy density and #1 CAISO reliability. China manufacturing limits ITC eligibility and poses FEOC risk. Requires separate PCS. Best suited for cost-sensitive international deployments."
      },
    ];

    recs.forEach((r, i) => {
      const ry = 1.15 + i * 1.45;
      // Main card bg
      slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: ry, w: 8.8, h: 1.3, fill: { color: C.darkGreen } });
      // Left accent bar
      slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: ry, w: 0.08, h: 1.3, fill: { color: r.accent } });
      // Title
      slide.addText(r.title, {
        x: 0.85, y: ry + 0.08, w: 8.3, h: 0.4,
        fontSize: 14, fontFace: FONT_H, color: C.white, bold: true, margin: 0
      });
      // Body
      slide.addText(r.body, {
        x: 0.85, y: ry + 0.48, w: 8.3, h: 0.75,
        fontSize: 11, fontFace: FONT_B, color: "D0D0D0", margin: 0
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 11 — Proposed Next Steps
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const slide = pres.addSlide();
    slide.background = { color: C.bgCream };
    slide.addText("Proposed Next Steps", {
      x: 0.6, y: 0.25, w: 9, h: 0.65,
      fontSize: 36, fontFace: FONT_H, color: C.darkGreen, bold: true, margin: 0
    });

    const steps = [
      { num: "1", title: "Issue RFPs to\nFluence and Tesla", desc: "Request pricing, delivery timelines, EPC scope, warranty for 50 MW / 200 MWh." },
      { num: "2", title: "Conduct Site\nAssessment", desc: "Evaluate footprint, interconnection points, and permitting needs." },
      { num: "3", title: "Financial\nModeling", desc: "Model TCO with ITC adders, O&M, degradation, and arbitrage revenue." },
      { num: "4", title: "Vendor\nReference Checks", desc: "Visit operational BESS sites to evaluate uptime and service quality." },
      { num: "5", title: "Board Approval &\nContract Award", desc: "Target Q3 2026 to align with production schedules and project COD." },
    ];

    const stepW = 1.68, stepGap = 0.15, stepsStartX = 0.6;
    steps.forEach((s, i) => {
      const sx = stepsStartX + i * (stepW + stepGap);
      // Big number
      slide.addText(s.num, {
        x: sx, y: 1.2, w: stepW, h: 1.0,
        fontSize: 60, fontFace: FONT_H, color: C.darkGreen, bold: true, align: "center", valign: "bottom", margin: 0
      });
      // Divider line
      slide.addShape(pres.shapes.LINE, { x: sx + 0.4, y: 2.3, w: stepW - 0.8, h: 0, line: { color: C.accentGreen, width: 2.5 } });
      // Step title
      slide.addText(s.title, {
        x: sx, y: 2.5, w: stepW, h: 0.7,
        fontSize: 12, fontFace: FONT_H, color: C.darkGreen, bold: true, align: "center", valign: "top", margin: 0
      });
      // Step desc
      slide.addText(s.desc, {
        x: sx, y: 3.25, w: stepW, h: 1.2,
        fontSize: 10, fontFace: FONT_B, color: C.bodyText, align: "center", valign: "top", margin: 0
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 12 — Thank You
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const slide = pres.addSlide();
    slide.background = { color: C.darkGreen };
    // Leaf icon centered
    slide.addImage({ data: leafWhite, x: 4.5, y: 1.3, w: 1.0, h: 1.0 });
    // Thank You
    slide.addText("Thank You", {
      x: 1, y: 2.4, w: 8, h: 1.0,
      fontSize: 48, fontFace: FONT_H, color: C.white, bold: true, align: "center", valign: "middle", margin: 0
    });
    // Subtitle
    slide.addText("Questions & Discussion", {
      x: 1, y: 3.35, w: 8, h: 0.5,
      fontSize: 16, fontFace: FONT_B, color: C.accentGreen, italic: true, align: "center", margin: 0
    });
    // Decorative line
    slide.addShape(pres.shapes.LINE, { x: 3.8, y: 4.0, w: 2.4, h: 0, line: { color: C.accentGreen, width: 2 } });
    // Footer
    slide.addText("Infrastructure Team  |  April 2026", {
      x: 1, y: 4.25, w: 8, h: 0.5,
      fontSize: 13, fontFace: FONT_B, color: C.mutedText, align: "center", margin: 0
    });
  }

  // ─── WRITE FILE ─────────────────────────────────────────────────────────────
  const outPath = "/home/assets/Grid_Storage_Evaluation.pptx";
  await pres.writeFile({ fileName: outPath });
  console.log("Presentation saved to:", outPath);
}

buildPresentation().catch(err => { console.error(err); process.exit(1); });
