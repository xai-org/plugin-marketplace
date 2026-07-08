const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

// ── Color Palette ──
const C = {
  navy:      "1B3A5C",
  navyDark:  "152E4A",
  gold:      "D4A843",
  white:     "FFFFFF",
  offWhite:  "F5F6F8",
  lightGray: "E8ECF0",
  midGray:   "8C9AAE",
  darkText:  "1E2D3D",
  bodyText:  "333333",
  blue:      "2E75B6",
  lightBlue: "5B9BD5",
  teal:      "0D9488",
  green:     "4CAF50",
  orange:    "E8913A",
  red:       "C0392B",
  chartBlue: "2E75B6",
  chartGreen:"27AE60",
  chartOrange:"E67E22",
  chartTeal: "16A085",
  chartRed:  "E74C3C",
};

const FONT_HEADER = "Trebuchet MS";
const FONT_BODY   = "Calibri";

// ── Icon rendering helpers ──
async function iconToBase64Png(IconComponent, color = "#000000", size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// ── Helper: add standard navy header bar ──
function addHeaderBar(slide, pres, title) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.75,
    fill: { color: C.navy },
  });
  slide.addText(title, {
    x: 0.5, y: 0, w: 9, h: 0.75,
    fontSize: 18, fontFace: FONT_HEADER, color: C.white,
    bold: true, valign: "middle", margin: 0,
    charSpacing: 2,
  });
}

// ── Helper: spec table ──
function addSpecTable(slide, specs, x, y, w) {
  const rows = specs.map(([label, value]) => [
    { text: label, options: { fontSize: 9, fontFace: FONT_BODY, bold: true, color: C.darkText, fill: { color: C.offWhite }, border: [{ pt: 0.5, color: C.lightGray }], valign: "middle", margin: [2, 4, 2, 4] } },
    { text: value, options: { fontSize: 9, fontFace: FONT_BODY, color: C.bodyText, fill: { color: C.white }, border: [{ pt: 0.5, color: C.lightGray }], valign: "middle", margin: [2, 4, 2, 4] } },
  ]);
  slide.addTable(rows, { x, y, w, colW: [w * 0.32, w * 0.68], rowH: 0.28 });
}

// ── Helper: gold left accent stripe ──
function addGoldStripe(slide, pres) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.08, h: 5.625,
    fill: { color: C.gold },
  });
}

// ── Helper: shadow factory ──
const makeShadow = () => ({ type: "outer", color: "000000", blur: 4, offset: 2, angle: 135, opacity: 0.1 });

async function buildPresentation() {
  // Load icons
  const { FaSeedling, FaTint, FaFlask, FaCheckCircle, FaChartLine, FaShieldAlt, FaClock, FaDollarSign } = require("react-icons/fa");

  // Load city seal
  const sealPath = path.join(__dirname, "hanford_seal.png");
  const sealBase64 = "image/png;base64," + fs.readFileSync(sealPath).toString("base64");

  // Pre-render icons
  const iconSeedling = await iconToBase64Png(FaSeedling, "#4CAF50", 256);
  const iconTint     = await iconToBase64Png(FaTint, "#2E75B6", 256);
  const iconFlask    = await iconToBase64Png(FaFlask, "#4CAF50", 256);
  const iconCheck    = await iconToBase64Png(FaCheckCircle, "#FFFFFF", 256);
  const iconChart    = await iconToBase64Png(FaChartLine, "#FFFFFF", 256);
  const iconShield   = await iconToBase64Png(FaShieldAlt, "#FFFFFF", 256);
  const iconClock    = await iconToBase64Png(FaClock, "#FFFFFF", 256);
  const iconDollar   = await iconToBase64Png(FaDollarSign, "#FFFFFF", 256);

  let pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "City of Hanford Water Division";
  pres.title  = "Drinking Water Quality Improvement Solutions";

  // ═══════════════════════════════════════════
  // SLIDE 1: TITLE
  // ═══════════════════════════════════════════
  {
    let slide = pres.addSlide();
    slide.background = { color: C.navy };
    addGoldStripe(slide, pres);

    // Title text
    slide.addText([
      { text: "DRINKING WATER", options: { fontSize: 36, bold: true, breakLine: true, charSpacing: 3 } },
      { text: "QUALITY IMPROVEMENT", options: { fontSize: 36, bold: true, breakLine: true, charSpacing: 3 } },
      { text: "SOLUTIONS", options: { fontSize: 36, bold: true, charSpacing: 3 } },
    ], {
      x: 0.6, y: 0.8, w: 5.8, h: 2.5,
      fontFace: FONT_HEADER, color: C.white, valign: "top", margin: 0,
    });

    // Subtitle
    slide.addText("CITY OF HANFORD, CALIFORNIA", {
      x: 0.6, y: 3.3, w: 5.8, h: 0.5,
      fontSize: 14, fontFace: FONT_BODY, color: C.gold,
      bold: true, charSpacing: 2, margin: 0,
    });

    // City seal
    slide.addImage({
      data: sealBase64,
      x: 7.2, y: 0.7, w: 2.3, h: 2.3,
    });

    // Footer line
    slide.addShape(pres.shapes.LINE, {
      x: 0.6, y: 4.8, w: 8.8, h: 0,
      line: { color: C.gold, width: 1 },
    });
    slide.addText("Prepared for City Council  •  Water Division  •  April 2026", {
      x: 0.6, y: 4.9, w: 8.8, h: 0.4,
      fontSize: 11, fontFace: FONT_BODY, color: C.midGray, margin: 0,
    });
  }

  // ═══════════════════════════════════════════
  // SLIDE 2: EXECUTIVE SUMMARY
  // ═══════════════════════════════════════════
  {
    let slide = pres.addSlide();
    slide.background = { color: C.white };
    addHeaderBar(slide, pres, "EXECUTIVE SUMMARY");

    // Description text
    const summaryItems = [
      { label: "System:", desc: "100% groundwater — 14 active wells serving ~57,000 residents" },
      { label: "Challenge:", desc: "Multiple contaminants exceed CA health goals; 202 EPA violations on record (171 health-based)" },
      { label: "Objective:", desc: "Evaluate four treatment solutions with costs, timelines, and a phased recommendation" },
    ];
    let ty = 0.95;
    summaryItems.forEach(item => {
      slide.addText([
        { text: item.label + " ", options: { bold: true } },
        { text: item.desc },
      ], {
        x: 0.5, y: ty, w: 5.5, h: 0.3,
        fontSize: 10, fontFace: FONT_BODY, color: C.bodyText, margin: 0,
      });
      ty += 0.3;
    });

    // Pie chart - violations
    slide.addText("202 EPA Violations by Type", {
      x: 0.5, y: 2.0, w: 3.5, h: 0.35,
      fontSize: 12, fontFace: FONT_HEADER, color: C.navy, bold: true, margin: 0,
    });
    slide.addChart(pres.charts.PIE, [{
      name: "Violations",
      labels: ["Health-Based (171)", "Monitoring (22)", "Other (9)"],
      values: [171, 22, 9],
    }], {
      x: 0.5, y: 2.35, w: 3.2, h: 2.6,
      showPercent: true,
      showLegend: true,
      legendPos: "b",
      legendFontSize: 8,
      chartColors: [C.navy, C.blue, C.lightBlue],
      dataLabelColor: C.white,
      dataLabelFontSize: 9,
    });

    // Stat callouts on the right
    const stats = [
      { num: "14", label: "Active Wells", sub: "100% groundwater supply" },
      { num: "57K", label: "Residents Served", sub: "Kings County seat" },
      { num: "26/100", label: "Water Quality Score", sub: "Grade: D (third-party)" },
    ];
    let sy = 1.2;
    stats.forEach(s => {
      // Background card
      slide.addShape(pres.shapes.RECTANGLE, {
        x: 5.5, y: sy, w: 4.0, h: 1.15,
        fill: { color: C.offWhite },
        shadow: makeShadow(),
      });
      slide.addText(s.num, {
        x: 5.7, y: sy + 0.05, w: 1.6, h: 0.7,
        fontSize: 28, fontFace: FONT_HEADER, color: C.navy, bold: true,
        valign: "middle", margin: 0,
      });
      slide.addText(s.label, {
        x: 7.3, y: sy + 0.1, w: 2.0, h: 0.35,
        fontSize: 12, fontFace: FONT_HEADER, color: C.navy, bold: true,
        valign: "middle", margin: 0,
      });
      slide.addText(s.sub, {
        x: 7.3, y: sy + 0.45, w: 2.0, h: 0.3,
        fontSize: 9, fontFace: FONT_BODY, color: C.midGray,
        valign: "top", margin: 0,
      });
      sy += 1.3;
    });
  }

  // ═══════════════════════════════════════════
  // SLIDE 3: CONTAMINANT PROFILE
  // ═══════════════════════════════════════════
  {
    let slide = pres.addSlide();
    slide.background = { color: C.white };
    addHeaderBar(slide, pres, "CONTAMINANT PROFILE");

    // Horizontal bar chart
    slide.addText("Contaminant Levels Relative to MCL (%)", {
      x: 0.5, y: 0.9, w: 4.5, h: 0.3,
      fontSize: 11, fontFace: FONT_HEADER, color: C.navy, bold: true, margin: 0,
    });
    slide.addChart(pres.charts.BAR, [{
      name: "Detected (% of MCL)",
      labels: ["Nitrate (NO3)", "1,2,3-TCP", "Arsenic", "Total THMs", "Chromium-6", "Lead (90th %)"],
      values: [72, 85, 60, 78, 45, 55],
    }], {
      x: 0.3, y: 1.2, w: 4.8, h: 3.5,
      barDir: "bar",
      chartColors: [C.navy],
      catAxisLabelColor: C.bodyText,
      catAxisLabelFontSize: 9,
      valAxisLabelColor: C.midGray,
      valAxisLabelFontSize: 8,
      valGridLine: { color: C.lightGray, size: 0.5 },
      catGridLine: { style: "none" },
      showValue: true,
      dataLabelPosition: "outEnd",
      dataLabelColor: C.darkText,
      dataLabelFontSize: 8,
      showLegend: false,
    });

    // Sources of Contamination - right side
    slide.addText("Sources of Contamination", {
      x: 5.5, y: 0.9, w: 4.0, h: 0.3,
      fontSize: 11, fontFace: FONT_HEADER, color: C.navy, bold: true, margin: 0,
    });

    const sources = [
      { icon: iconSeedling, text: "Agricultural runoff drives nitrate and legacy pesticide (TCP, DBCP) contamination throughout the Kings County aquifer." },
      { icon: iconTint, text: "Chlorination byproducts (THMs) form during disinfection — the city's only current treatment step." },
      { icon: iconFlask, text: "Naturally occurring arsenic and chromium-6 leach from geologic formations into the Central Valley aquifer." },
    ];
    let srcY = 1.35;
    sources.forEach(s => {
      slide.addImage({ data: s.icon, x: 5.6, y: srcY + 0.05, w: 0.35, h: 0.35 });
      slide.addText(s.text, {
        x: 6.1, y: srcY, w: 3.5, h: 0.9,
        fontSize: 9, fontFace: FONT_BODY, color: C.bodyText, valign: "top", margin: 0,
      });
      srcY += 1.05;
    });

    // Footer
    slide.addText("Data: City of Hanford CCRs, EWG Tap Water Database", {
      x: 0.5, y: 5.1, w: 9, h: 0.3,
      fontSize: 8, fontFace: FONT_BODY, color: C.midGray, italic: true, margin: 0,
    });
  }

  // ═══════════════════════════════════════════
  // SLIDE 4: SOLUTION 1 - GAC
  // ═══════════════════════════════════════════
  {
    let slide = pres.addSlide();
    slide.background = { color: C.white };
    addHeaderBar(slide, pres, "SOLUTION 1: GRANULAR ACTIVATED CARBON (GAC)");
    addGoldStripe(slide, pres);

    // Left section - description
    slide.addText("Wellhead Adsorption Treatment", {
      x: 0.4, y: 0.9, w: 4.5, h: 0.35,
      fontSize: 13, fontFace: FONT_HEADER, color: C.navy, bold: true, margin: 0,
    });

    const gacBullets = [
      "CA State Water Board's best available technology for 1,2,3-TCP removal",
      "Dual-vessel pressure systems installed at each affected wellhead",
      "PLACEHOLDER",
    ];
    slide.addText(
      gacBullets.map((t, i) => ({
        text: t,
        options: { bullet: true, breakLine: i < gacBullets.length - 1 },
      })),
      {
        x: 0.4, y: 1.3, w: 4.3, h: 1.2,
        fontSize: 9, fontFace: FONT_BODY, color: C.bodyText, valign: "top", margin: 0,
        paraSpaceAfter: 4,
      }
    );

    // Process flow on right
    slide.addText("Treatment Process (Proposed)", {
      x: 5.2, y: 0.9, w: 4.5, h: 0.35,
      fontSize: 13, fontFace: FONT_HEADER, color: C.navy, bold: true, margin: 0,
    });

    const processSteps = [
      { name: "Raw Groundwater", desc: "Well pump extracts from aquifer" },
      { name: "Pre-Filtration", desc: "Sediment removal screen" },
      { name: "GAC Vessel 1 (Lead)", desc: "Primary adsorption of organics" },
      { name: "GAC Vessel 2 (Lag)", desc: "Polishing & redundancy" },
      { name: "Chlorination", desc: "Final disinfection" },
      { name: "Distribution System", desc: "Clean water to residents" },
    ];
    let py = 1.35;
    processSteps.forEach((step, i) => {
      slide.addShape(pres.shapes.RECTANGLE, {
        x: 5.3, y: py, w: 4.2, h: 0.32,
        fill: { color: i % 2 === 0 ? C.offWhite : C.white },
      });
      // Blue left accent
      slide.addShape(pres.shapes.RECTANGLE, {
        x: 5.3, y: py, w: 0.06, h: 0.32,
        fill: { color: C.blue },
      });
      slide.addText(step.name, {
        x: 5.5, y: py, w: 1.8, h: 0.32,
        fontSize: 8, fontFace: FONT_BODY, color: C.navy, bold: true,
        valign: "middle", margin: 0,
      });
      slide.addText(step.desc, {
        x: 7.3, y: py, w: 2.1, h: 0.32,
        fontSize: 7.5, fontFace: FONT_BODY, color: C.midGray,
        valign: "middle", margin: 0,
      });
      py += 0.35;
    });

    // Spec table
    addSpecTable(slide, [
      ["Configuration", "8-10 dual-vessel pairs, 12 ft. pressure vessels"],
      ["Capacity", "500-875 GPM per pair (5,000-7,000 GPM total)"],
      ["Target Contaminant", "1,2,3-TCP, THMs, DBCP, PFAS, taste & odor"],
      ["Capital Cost", "$8M - $14M"],
      ["Annual O&M", "$600K - $1.2M (carbon replacement + labor)"],
      ["Lead Time", "18 - 24 months (design to operation)"],
    ], 0.4, 3.55, 9.2);
  }

  // ═══════════════════════════════════════════
  // SLIDE 5: SOLUTION 2 - ION EXCHANGE
  // ═══════════════════════════════════════════
  {
    let slide = pres.addSlide();
    slide.background = { color: C.white };
    addHeaderBar(slide, pres, "SOLUTION 2: ION EXCHANGE (IX) TREATMENT");
    addGoldStripe(slide, pres);

    slide.addText("Selective Resin Technology for Inorganics", {
      x: 0.4, y: 0.9, w: 4.5, h: 0.35,
      fontSize: 13, fontFace: FONT_HEADER, color: C.navy, bold: true, margin: 0,
    });

    const ixBullets = [
      "Selective resins swap harmful ions (nitrate, Cr-6, arsenic) for benign chloride ions",
      "PLACEHOLDER",
      "Reduces lifecycle waste and operating costs vs. single-pass designs",
    ];
    slide.addText(
      ixBullets.map((t, i) => ({
        text: t,
        options: { bullet: true, breakLine: i < ixBullets.length - 1 },
      })),
      {
        x: 0.4, y: 1.3, w: 4.3, h: 1.2,
        fontSize: 9, fontFace: FONT_BODY, color: C.bodyText, valign: "top", margin: 0,
        paraSpaceAfter: 4,
      }
    );

    // 20-year cost pie/donut chart
    slide.addText("20-Year Cost Breakdown ($M)", {
      x: 5.2, y: 0.9, w: 4.5, h: 0.35,
      fontSize: 13, fontFace: FONT_HEADER, color: C.navy, bold: true, margin: 0,
    });

    slide.addChart(pres.charts.DOUGHNUT, [{
      name: "IX Lifecycle",
      labels: ["Capital Equipment", "Installation & Site", "Resin & Media (20yr)", "Brine Disposal (20yr)", "Labor & Energy (20yr)"],
      values: [3.5, 4.5, 4.0, 6.0, 3.0],
    }], {
      x: 5.3, y: 1.25, w: 4.2, h: 2.4,
      showPercent: true,
      showLegend: true,
      legendPos: "b",
      legendFontSize: 7,
      chartColors: [C.navy, C.blue, C.lightBlue, C.chartOrange, C.midGray],
      dataLabelColor: C.white,
      dataLabelFontSize: 8,
    });

    // Spec table
    addSpecTable(slide, [
      ["Configuration", "Regenerable SBA resin vessels at 4-6 wellheads"],
      ["Capacity", "400-700 GPM per well; brine mgmt. system req."],
      ["Target Contaminant", "Nitrate, chromium-6, arsenic, perchlorate, selenium"],
      ["Capital Cost", "$6M - $10M"],
      ["Annual O&M", "$400K - $900K (resin, brine disposal, salt)"],
      ["Lead Time", "12 - 18 months"],
    ], 0.4, 3.85, 9.2);
  }

  // ═══════════════════════════════════════════
  // SLIDE 6: SOLUTION 3 - CENTRALIZED PLANT
  // ═══════════════════════════════════════════
  {
    let slide = pres.addSlide();
    slide.background = { color: C.white };
    addHeaderBar(slide, pres, "SOLUTION 3: CENTRALIZED TREATMENT PLANT");
    addGoldStripe(slide, pres);

    slide.addText("Multi-Barrier Central Facility", {
      x: 0.4, y: 0.9, w: 4.5, h: 0.35,
      fontSize: 13, fontFace: FONT_HEADER, color: C.navy, bold: true, margin: 0,
    });

    const centralBullets = [
      "Consolidates all raw well water through a single multi-barrier facility",
      "Combines GAC, IX, UV, and chlorination treatment",
      "Maximum operational control; highest capital investment and longest timeline",
    ];
    slide.addText(
      centralBullets.map((t, i) => ({
        text: t,
        options: { bullet: true, breakLine: i < centralBullets.length - 1 },
      })),
      {
        x: 0.4, y: 1.3, w: 4.3, h: 1.2,
        fontSize: 9, fontFace: FONT_BODY, color: C.bodyText, valign: "top", margin: 0,
        paraSpaceAfter: 4,
      }
    );

    // Stacked bar chart - spend by year
    slide.addText("Centralized Plant Spend by Year ($M)", {
      x: 5.2, y: 0.9, w: 4.5, h: 0.35,
      fontSize: 13, fontFace: FONT_HEADER, color: C.navy, bold: true, margin: 0,
    });
    slide.addChart(pres.charts.BAR, [
      { name: "Design & CEQA", labels: ["Year 1", "Year 2", "Year 3", "Year 4"], values: [5, 2, 0, 0] },
      { name: "Construction", labels: ["Year 1", "Year 2", "Year 3", "Year 4"], values: [0, 10, 15, 3] },
      { name: "O&M", labels: ["Year 1", "Year 2", "Year 3", "Year 4"], values: [0, 0, 0.5, 2] },
    ], {
      x: 5.2, y: 1.25, w: 4.4, h: 2.4,
      barDir: "col",
      barGrouping: "stacked",
      chartColors: [C.navy, C.blue, C.lightBlue],
      showLegend: true,
      legendPos: "b",
      legendFontSize: 7,
      catAxisLabelColor: C.bodyText,
      valAxisLabelColor: C.midGray,
      valGridLine: { color: C.lightGray, size: 0.5 },
      catGridLine: { style: "none" },
      valAxisLabelFontSize: 8,
      catAxisLabelFontSize: 8,
    });

    // Spec table
    addSpecTable(slide, [
      ["Configuration", "Central plant: GAC + IX + UV + Cl2 disinfection"],
      ["Capacity", "8-12 MGD peak day (20-year demand horizon)"],
      ["Target Contaminant", "All identified - future-proofed for emerging regulations"],
      ["Capital Cost", "$25M - $40M (plant, transmission, land, CEQA)"],
      ["Annual O&M", "$1.5M - $2.5M (staffing, chemicals, media)"],
      ["Lead Time", "36 - 48 months (CEQA + design + construction)"],
    ], 0.4, 3.85, 9.2);
  }

  // ═══════════════════════════════════════════
  // SLIDE 7: SOLUTION 4 - BLENDING
  // ═══════════════════════════════════════════
  {
    let slide = pres.addSlide();
    slide.background = { color: C.white };
    addHeaderBar(slide, pres, "SOLUTION 4: BLENDING & NEW WELL DEVELOPMENT");
    addGoldStripe(slide, pres);

    slide.addText("Dilution Through Deeper, Cleaner Source Wells", {
      x: 0.4, y: 0.9, w: 5.0, h: 0.35,
      fontSize: 13, fontFace: FONT_HEADER, color: C.navy, bold: true, margin: 0,
    });

    const blendBullets = [
      "Drill new production wells into deeper, less-contaminated aquifer zones",
      "PLACEHOLDER",
      "Lower-technology approach; carries long-term risk if deeper aquifer degrades",
    ];
    slide.addText(
      blendBullets.map((t, i) => ({
        text: t,
        options: { bullet: true, breakLine: i < blendBullets.length - 1 },
      })),
      {
        x: 0.4, y: 1.3, w: 4.5, h: 1.2,
        fontSize: 9, fontFace: FONT_BODY, color: C.bodyText, valign: "top", margin: 0,
        paraSpaceAfter: 4,
      }
    );

    // Radar chart - comparison
    slide.addChart(pres.charts.RADAR, [
      { name: "Blending", labels: ["Cost", "Speed", "Effectiveness", "Reliability", "Scalability", "Regulatory\nCertainty"], values: [9, 7, 5, 4, 5, 3] },
      { name: "GAC+IX Combined", labels: ["Cost", "Speed", "Effectiveness", "Reliability", "Scalability", "Regulatory\nCertainty"], values: [6, 7, 9, 8, 8, 9] },
    ], {
      x: 5.3, y: 0.85, w: 4.3, h: 2.85,
      chartColors: [C.chartOrange, C.navy],
      showLegend: true,
      legendPos: "b",
      legendFontSize: 8,
      catAxisLabelColor: C.bodyText,
      catAxisLabelFontSize: 8,
    });

    // Spec table
    addSpecTable(slide, [
      ["Configuration", "3-5 new deep wells (600-1,000 ft) + valves"],
      ["Capacity", "500-1,000 GPM per new well"],
      ["Target Contaminant", "Dilutes all contaminants (does not remove)"],
      ["Capital Cost", "$4M - $8M (drilling, equipping, pipeline tie-ins)"],
      ["Annual O&M", "$200K - $500K (pumping energy, monitoring)"],
      ["Lead Time", "14 - 22 months (hydrogeologic study + drilling)"],
    ], 0.4, 3.85, 9.2);
  }

  // ═══════════════════════════════════════════
  // SLIDE 8: FOUR-SOLUTION COMPARISON TABLE
  // ═══════════════════════════════════════════
  {
    let slide = pres.addSlide();
    slide.background = { color: C.white };
    addHeaderBar(slide, pres, "FOUR-SOLUTION COMPARISON");

    const headerOpts = { fontSize: 8.5, fontFace: FONT_BODY, bold: true, color: C.white, fill: { color: C.navy }, valign: "middle", align: "center", border: [{ pt: 0.5, color: C.navy }], margin: [2, 3, 2, 3] };
    const cellOpts   = (alt) => ({ fontSize: 8, fontFace: FONT_BODY, color: C.bodyText, fill: { color: alt ? C.offWhite : C.white }, valign: "middle", align: "center", border: [{ pt: 0.5, color: C.lightGray }], margin: [2, 3, 2, 3] });
    const critOpts   = (alt) => ({ fontSize: 8, fontFace: FONT_BODY, color: C.navy, bold: true, fill: { color: alt ? C.offWhite : C.white }, valign: "middle", align: "left", border: [{ pt: 0.5, color: C.lightGray }], margin: [2, 3, 2, 3] });

    const compData = [
      ["Criteria", "GAC (Wellhead)", "Ion Exchange (Wellhead)", "Centralized Plant", "Blending & New Wells"],
      ["Capital Cost", "$8M-$14M", "$6M-$10M", "$25M-$40M", "$4M-$8M"],
      ["Annual O&M", "$600K-$1.2M", "$400K-$900K", "$1.5M-$2.5M", "$200K-$500K"],
      ["Lead Time", "18-24 mo.", "12-18 mo.", "36-48 mo.", "14-22 mo."],
      ["TCP Removal", "Excellent", "None", "Excellent", "Partial (dilution)"],
      ["Nitrate Removal", "None", "Excellent", "Excellent", "Partial (dilution)"],
      ["Cr-6 / Arsenic", "Limited", "Excellent", "Excellent", "Partial (dilution)"],
      ["THM Reduction", "Excellent", "None", "Excellent", "Limited"],
      ["Scalability", "Modular", "Modular", "High (20-yr)", "Limited by aquifer"],
      ["Long-Term Risk", "Low", "Low", "Lowest", "High (aquifer trend)"],
      ["Regulatory Fit", "Organics only", "Inorganics only", "Comprehensive", "Uncertain"],
    ];

    const tableRows = compData.map((row, ri) => {
      if (ri === 0) {
        return row.map(cell => ({ text: cell, options: headerOpts }));
      }
      const alt = ri % 2 === 0;
      return row.map((cell, ci) => ({
        text: cell,
        options: ci === 0 ? critOpts(alt) : cellOpts(alt),
      }));
    });

    slide.addTable(tableRows, {
      x: 0.3, y: 0.95, w: 9.4,
      colW: [1.4, 1.9, 2.1, 2.0, 2.0],
      rowH: 0.38,
    });
  }

  // ═══════════════════════════════════════════
  // SLIDE 9: 20-YEAR TCO
  // ═══════════════════════════════════════════
  {
    let slide = pres.addSlide();
    slide.background = { color: C.white };
    addHeaderBar(slide, pres, "20-YEAR TOTAL COST OF OWNERSHIP");

    slide.addText("Estimated lifecycle cost including capital investment and cumulative O&M (2026 dollars)", {
      x: 0.5, y: 0.9, w: 9, h: 0.3,
      fontSize: 10, fontFace: FONT_BODY, color: C.midGray, italic: true, margin: 0,
    });

    slide.addChart(pres.charts.BAR, [
      { name: "Capital ($M)", labels: ["GAC Wellhead", "Ion Exchange", "Centralized Plant", "Blending/Wells", "GAC + IX\n(Recommended)"], values: [11, 8, 32.5, 6, 19] },
      { name: "20-Year O&M ($M)", labels: ["GAC Wellhead", "Ion Exchange", "Centralized Plant", "Blending/Wells", "GAC + IX\n(Recommended)"], values: [18, 13, 40, 7, 31] },
    ], {
      x: 0.3, y: 1.3, w: 9.4, h: 3.8,
      barDir: "col",
      barGrouping: "clustered",
      chartColors: [C.navy, C.blue],
      showLegend: true,
      legendPos: "b",
      legendFontSize: 9,
      catAxisLabelColor: C.bodyText,
      catAxisLabelFontSize: 9,
      valAxisLabelColor: C.midGray,
      valAxisLabelFontSize: 8,
      valGridLine: { color: C.lightGray, size: 0.5 },
      catGridLine: { style: "none" },
      showValue: true,
      dataLabelPosition: "outEnd",
      dataLabelColor: C.darkText,
      dataLabelFontSize: 8,
    });
  }

  // ═══════════════════════════════════════════
  // SLIDE 10: RECOMMENDATION
  // ═══════════════════════════════════════════
  {
    let slide = pres.addSlide();
    slide.background = { color: C.white };
    addHeaderBar(slide, pres, "RECOMMENDATION");

    // Accent bar under header
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0.75, w: 10, h: 0.04,
      fill: { color: C.gold },
    });

    slide.addText("Phased GAC + Ion Exchange Combined Wellhead Approach", {
      x: 0.5, y: 0.95, w: 9, h: 0.35,
      fontSize: 14, fontFace: FONT_HEADER, color: C.navy, bold: true, margin: 0,
    });

    slide.addText([
      { text: "Deploy GAC at wells with organic contamination (TCP, THMs) and IX at wells with elevated nitrate and chromium-6.", options: { breakLine: true } },
      { text: "Use blending from new deeper wells as a supplementary strategy to reduce treatment load where feasible." },
    ], {
      x: 0.5, y: 1.35, w: 9, h: 0.6,
      fontSize: 9.5, fontFace: FONT_BODY, color: C.bodyText, valign: "top", margin: 0,
    });

    // Left - Why This Approach
    slide.addText("Why This Approach", {
      x: 0.5, y: 2.1, w: 4.5, h: 0.35,
      fontSize: 12, fontFace: FONT_HEADER, color: C.navy, bold: true, margin: 0,
    });

    const whyBullets = [
      "Addresses all six identified contaminants",
      "Combined capital: $14M-$24M\n(vs. $25M-$40M centralized)",
      "Fastest path to compliance: 12-24 months phased",
      "Modular - prioritize highest-risk wells first",
      "Proven technology with CA DDW approval",
      "Eligible for SRF, Prop 1, and BIL grant funding",
    ];
    slide.addText(
      whyBullets.map((t, i) => ({
        text: t,
        options: { bullet: true, breakLine: i < whyBullets.length - 1 },
      })),
      {
        x: 0.5, y: 2.5, w: 4.5, h: 2.8,
        fontSize: 9.5, fontFace: FONT_BODY, color: C.bodyText, valign: "top", margin: 0,
        paraSpaceAfter: 4,
      }
    );

    // Right - Cost Breakdown donut
    slide.addText("Cost Breakdown", {
      x: 5.5, y: 2.1, w: 4.0, h: 0.35,
      fontSize: 12, fontFace: FONT_HEADER, color: C.navy, bold: true, margin: 0,
    });
    slide.addChart(pres.charts.DOUGHNUT, [{
      name: "Investment",
      labels: ["GAC Capital", "IX Capital", "GAC O&M (Annual)", "IX O&M (Annual)"],
      values: [11, 8, 0.9, 0.65],
    }], {
      x: 5.5, y: 2.4, w: 4.0, h: 2.8,
      showPercent: true,
      showLegend: true,
      legendPos: "b",
      legendFontSize: 8,
      chartColors: [C.navy, C.blue, C.chartOrange, C.lightBlue],
      dataLabelColor: C.white,
      dataLabelFontSize: 8,
    });
  }

  // ═══════════════════════════════════════════
  // SLIDE 11: IMPLEMENTATION ROADMAP
  // ═══════════════════════════════════════════
  {
    let slide = pres.addSlide();
    slide.background = { color: C.white };
    addHeaderBar(slide, pres, "IMPLEMENTATION ROADMAP");

    // Key Milestones header
    slide.addText("Key Milestones", {
      x: 0.5, y: 0.9, w: 9, h: 0.3,
      fontSize: 12, fontFace: FONT_HEADER, color: C.navy, bold: true, margin: 0,
    });

    // Milestone timeline
    const milestones = [
      { month: "Month 1", label: "Council\nauthorization" },
      { month: "Month 6", label: "First IX equipment\ndelivered" },
      { month: "Month 14", label: "First wells\nin compliance" },
      { month: "Month 24", label: "Full system\noperational" },
      { month: "Month 30", label: "DDW validation\ncomplete" },
    ];
    const mlStartX = 0.5;
    const mlWidth = 9.0;
    const mlSpacing = mlWidth / (milestones.length);
    milestones.forEach((m, i) => {
      const cx = mlStartX + i * mlSpacing + mlSpacing / 2;
      // Circle marker
      slide.addShape(pres.shapes.OVAL, {
        x: cx - 0.12, y: 1.72, w: 0.24, h: 0.24,
        fill: { color: C.navy },
      });
      // Label above
      slide.addText(m.label, {
        x: cx - 0.7, y: 1.25, w: 1.4, h: 0.45,
        fontSize: 7.5, fontFace: FONT_BODY, color: C.bodyText,
        align: "center", valign: "bottom", margin: 0,
      });
      // Month below
      slide.addText(m.month, {
        x: cx - 0.5, y: 2.0, w: 1.0, h: 0.25,
        fontSize: 7.5, fontFace: FONT_BODY, color: C.navy, bold: true,
        align: "center", valign: "top", margin: 0,
      });
    });
    // Timeline line
    slide.addShape(pres.shapes.LINE, {
      x: mlStartX + mlSpacing / 2, y: 1.84, w: mlWidth - mlSpacing, h: 0,
      line: { color: C.navy, width: 2 },
    });

    // Gantt chart (horizontal bar)
    slide.addChart(pres.charts.BAR, [
      { name: "Start", labels: ["Assessment\n& Design", "SRF/Prop 1\nApplications", "IX Deploy\n(Priority Wells)", "GAC Deploy\n(TCP Wells)", "Supplemental\nWell Drilling", "Optimization\n& Monitoring"], values: [0, 1, 6, 10, 8, 22] },
      { name: "Duration", labels: ["Assessment\n& Design", "SRF/Prop 1\nApplications", "IX Deploy\n(Priority Wells)", "GAC Deploy\n(TCP Wells)", "Supplemental\nWell Drilling", "Optimization\n& Monitoring"], values: [6, 4, 8, 12, 10, 8] },
    ], {
      x: 0.3, y: 2.4, w: 9.4, h: 3.0,
      barDir: "bar",
      barGrouping: "stacked",
      chartColors: [C.white, C.navy],
      showLegend: false,
      catAxisLabelColor: C.bodyText,
      catAxisLabelFontSize: 8,
      valAxisLabelColor: C.midGray,
      valAxisLabelFontSize: 8,
      valGridLine: { color: C.lightGray, size: 0.5 },
      catGridLine: { style: "none" },
      valAxisTitle: "Months",
      valAxisTitleFontSize: 8,
      valAxisTitleColor: C.midGray,
    });
  }

  // ═══════════════════════════════════════════
  // SLIDE 12: FUNDING & FINANCIAL STRATEGY
  // ═══════════════════════════════════════════
  {
    let slide = pres.addSlide();
    slide.background = { color: C.white };
    addHeaderBar(slide, pres, "FUNDING & FINANCIAL STRATEGY");

    // Horizontal bar chart
    slide.addChart(pres.charts.BAR, [{
      name: "Funding ($M)",
      labels: ["CA State Revolving Fund", "CA SRF (Forgiveness)", "Proposition 1 Water Bond", "BIL/SAFER Program", "City Match"],
      values: [8, 4, 3.5, 2.5, 3],
    }], {
      x: 0.3, y: 0.95, w: 4.5, h: 2.7,
      barDir: "bar",
      chartColors: [C.navy],
      showLegend: false,
      catAxisLabelColor: C.bodyText,
      catAxisLabelFontSize: 8,
      valAxisLabelColor: C.midGray,
      valAxisLabelFontSize: 8,
      valGridLine: { color: C.lightGray, size: 0.5 },
      catGridLine: { style: "none" },
      showValue: true,
      dataLabelPosition: "outEnd",
      dataLabelColor: C.darkText,
      dataLabelFontSize: 8,
    });

    // Funding table on right/bottom
    const fundHeaderOpts = { fontSize: 8, fontFace: FONT_BODY, bold: true, color: C.white, fill: { color: C.navy }, valign: "middle", align: "center", border: [{ pt: 0.5, color: C.navy }], margin: [2, 3, 2, 3] };
    const fundCellOpts = (alt) => ({ fontSize: 7.5, fontFace: FONT_BODY, color: C.bodyText, fill: { color: alt ? C.offWhite : C.white }, valign: "middle", border: [{ pt: 0.5, color: C.lightGray }], margin: [2, 3, 2, 3] });

    const fundingData = [
      ["Funding Source", "Type", "Potential", "Notes"],
      ["City Match", "Local funds", "~$3M", "Rate-supported capital contribution"],
      ["BIL / SAFER Program", "Grant", "Up to $2.5M", "Federal + state emerging contaminant funds"],
      ["Proposition 1 Water Bond", "Grant", "Up to $3.5M", "DDW-administered; contamination priority"],
      ["CA SRF (Forgiveness)", "Forgiveness", "Up to $4M", "DAC principal forgiveness available"],
      ["CA State Revolving Fund", "Loan", "Up to $8M", "1-3% interest; primary funding vehicle"],
    ];
    const fundRows = fundingData.map((row, ri) => {
      if (ri === 0) return row.map(cell => ({ text: cell, options: fundHeaderOpts }));
      const alt = ri % 2 === 0;
      return row.map(cell => ({ text: cell, options: fundCellOpts(alt) }));
    });
    slide.addTable(fundRows, {
      x: 0.3, y: 3.85, w: 9.4,
      colW: [2.2, 1.2, 1.5, 4.5],
      rowH: 0.28,
    });
  }

  // ═══════════════════════════════════════════
  // SLIDE 13: RECOMMENDED NEXT STEPS
  // ═══════════════════════════════════════════
  {
    let slide = pres.addSlide();
    slide.background = { color: C.navy };
    addGoldStripe(slide, pres);

    slide.addText("RECOMMENDED NEXT STEPS", {
      x: 0.5, y: 0.35, w: 9, h: 0.55,
      fontSize: 24, fontFace: FONT_HEADER, color: C.white, bold: true,
      charSpacing: 2, margin: 0,
    });

    const nextSteps = [
      "Council authorization to proceed with engineering assessment (RFP)",
      "PLACEHOLDER",
      "Submit SRF and Proposition 1 funding applications - Q2 2026",
      "Commission hydrogeologic study for supplemental well sites",
      "Launch public outreach on water quality improvement program",
      "Target Phase 1 construction start: Q4 2026",
    ];
    slide.addText(
      nextSteps.map((t, i) => ({
        text: `${i + 1}.  ${t}`,
        options: { breakLine: i < nextSteps.length - 1 },
      })),
      {
        x: 0.6, y: 1.15, w: 8.5, h: 2.6,
        fontSize: 12, fontFace: FONT_BODY, color: C.white,
        valign: "top", margin: 0,
        paraSpaceAfter: 8,
      }
    );

    // Footer area
    slide.addShape(pres.shapes.LINE, {
      x: 0.6, y: 4.0, w: 8.8, h: 0,
      line: { color: C.gold, width: 1 },
    });

    // City seal
    slide.addImage({
      data: sealBase64,
      x: 7.8, y: 4.2, w: 1.2, h: 1.2,
    });

    slide.addText([
      { text: "City of Hanford Water Division", options: { bold: true, breakLine: true } },
      { text: "Utilities & Engineering Department  •  559-585-2550", options: { breakLine: true } },
      { text: "900 S. 10th Avenue, Hanford, CA 93230" },
    ], {
      x: 0.6, y: 4.2, w: 6.5, h: 1.1,
      fontSize: 10, fontFace: FONT_BODY, color: C.midGray,
      valign: "top", margin: 0,
    });
  }

  // ── Write file ──
  const outputPath = "/home/assets/hanford_water_solutions.pptx";
  await pres.writeFile({ fileName: outputPath });
  console.log("Presentation saved to:", outputPath);
}

buildPresentation().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
