const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

const { FaCheckCircle } = require("react-icons/fa");

// ── MAYO CLINIC PALETTE ─────────────────────────────────────────────
const C = {
  navy:      "002B5C",
  blue:      "003DA5",
  blueLight: "1A5DBF",
  bluePale:  "D6E4F7",
  slate:     "4A6FA5",
  steel:     "7A96BF",
  ice:       "EBF0F7",
  white:     "FFFFFF",
  offWhite:  "F4F6FA",
  accent:    "C8982D",
  accentDk:  "A67C1A",
  accentLt:  "F5EDD4",
  text:      "1B2A4A",
  muted:     "6B7FA0",
  red:       "B8292F",
  green:     "1B7A4E",
  lightLine: "C8D3E2",
};

const FONT_TITLE = "Georgia";
const FONT_BODY  = "Calibri";

// ── ICON HELPER ─────────────────────────────────────────────────────
function renderIconSvg(IconComponent, color, size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}
async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// ── REUSABLE HELPERS ────────────────────────────────────────────────
const makeShadow = () => ({ type: "outer", blur: 4, offset: 1.5, angle: 135, color: "000000", opacity: 0.07 });

function addFooter(slide, num, total) {
  slide.addText(`${num} / ${total}`, { x: 8.8, y: 5.25, w: 0.8, h: 0.25, fontSize: 9, fontFace: FONT_BODY, color: C.muted, align: "right" });
  slide.addText("CONFIDENTIAL", { x: 0.5, y: 5.25, w: 1.5, h: 0.25, fontSize: 9, fontFace: FONT_BODY, color: C.muted, charSpacing: 2 });
  slide.addText("April 2026", { x: 4, y: 5.25, w: 2, h: 0.25, fontSize: 9, fontFace: FONT_BODY, color: C.muted, align: "center" });
}

function addActionTitle(slide, title) {
  slide.addText(title, {
    x: 0.5, y: 0.3, w: 9, h: 0.7,
    fontSize: 16, fontFace: FONT_BODY, color: C.navy, bold: true,
    valign: "top", margin: 0, lineSpacingMultiple: 1.15
  });
  slide.addShape("line", { x: 0.5, y: 1.0, w: 9, h: 0, line: { color: C.lightLine, width: 0.5 } });
}

function addCard(slide, x, y, w, h, fillColor) {
  slide.addShape("rect", { x, y, w, h, fill: { color: fillColor || C.white }, shadow: makeShadow() });
}

// ── MAIN ────────────────────────────────────────────────────────────
async function buildDeck() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Chief Nursing Officer, Mayo Clinic";
  pres.title = "Nursing Documentation Transformation";
  const TOTAL = 12;

  const checkIcon = await iconToBase64Png(FaCheckCircle, `#${C.blue}`);

  // ================================================================
  // SLIDE 1 — Title
  // ================================================================
  let s1 = pres.addSlide();
  s1.background = { color: C.navy };
  s1.addShape("rect", { x: 0, y: 0, w: 10, h: 0.04, fill: { color: C.accent } });
  s1.addText("MAYO CLINIC", { x: 0.5, y: 1.15, w: 9, h: 0.45, fontSize: 14, fontFace: FONT_BODY, color: C.accent, charSpacing: 5, align: "center", margin: 0 });
  s1.addText("Transforming Nursing\nDocumentation", {
    x: 0.5, y: 2.0, w: 9, h: 1.6,
    fontSize: 38, fontFace: FONT_TITLE, color: C.white, bold: true, lineSpacingMultiple: 1.1, align: "center", margin: 0
  });
  s1.addText("An Enterprise Strategy to Reclaim the Bedside,\nReduce Burnout, and Elevate Quality", {
    x: 0.5, y: 3.7, w: 9, h: 0.8,
    fontSize: 15, fontFace: FONT_BODY, color: C.steel, italic: true, lineSpacingMultiple: 1.3, align: "center", margin: 0
  });
  s1.addText("C-Suite Executive Session  |  April 2026", {
    x: 0.5, y: 4.8, w: 9, h: 0.3, fontSize: 10, fontFace: FONT_BODY, color: C.muted, align: "center", margin: 0
  });
  s1.addShape("rect", { x: 0, y: 5.585, w: 10, h: 0.04, fill: { color: C.accent } });
  s1.addText("CONFIDENTIAL", { x: 0.5, y: 5.25, w: 9, h: 0.25, fontSize: 9, fontFace: FONT_BODY, color: C.steel, charSpacing: 2, align: "center" });

  // ================================================================
  // SLIDE 2 — Executive Summary (SCQA)
  // ================================================================
  let s2 = pres.addSlide();
  s2.background = { color: C.offWhite };
  addActionTitle(s2, "Executive Summary: Documentation burden costs Mayo $22M/year and drives 34% turnover intent — a targeted 18-month transformation will recover 60+ min/nurse/shift");
  addFooter(s2, 2, TOTAL);

  const scqaData = [
    { label: "SITUATION", color: C.blue, text: "Mayo employs 14,000+ nurses across 92 care units. EHR documentation is the single largest non-clinical activity, consuming an average of 4.8 hours of every 12-hour shift." },
    { label: "COMPLICATION", color: C.red, text: "Documentation burden has reached a tipping point: burnout intent-to-leave is at 34%, near-miss events linked to documentation gaps rose 18% YoY, and CMS value-based penalties are increasing." },
    { label: "QUESTION", color: C.accent, text: "How can Mayo systematically reduce documentation time by 50%+ while maintaining or improving quality, compliance, and revenue integrity?" },
    { label: "ANSWER", color: C.green, text: "A three-phase, 18-month initiative — leveraging ambient AI, smart templates, and workflow redesign — will recover 60+ min/nurse/shift, yielding $14M in annual savings and measurably improving outcomes." },
  ];
  scqaData.forEach((item, i) => {
    const yPos = 1.1 + i * 1.05;
    addCard(s2, 0.5, yPos, 9, 0.9, C.white);
    s2.addShape("rect", { x: 0.8, y: yPos + 0.30, w: 1.5, h: 0.28, fill: { color: item.color } });
    s2.addText(item.label, { x: 0.8, y: yPos + 0.30, w: 1.5, h: 0.28, fontSize: 10, fontFace: FONT_BODY, color: C.white, bold: true, align: "center", valign: "middle", charSpacing: 1.5 });
    s2.addText(item.text, { x: 2.5, y: yPos + 0.08, w: 6.75, h: 0.75, fontSize: 11, fontFace: FONT_BODY, color: C.text, valign: "middle", lineSpacingMultiple: 1.25 });
  });

  // ================================================================
  // SLIDE 3 — Burning Platform
  // ================================================================
  let s3 = pres.addSlide();
  s3.background = { color: C.offWhite };
  addActionTitle(s3, "Nurses spend 40% of each shift on documentation — more time than on direct patient care — creating an unsustainable operational and human capital crisis");
  addFooter(s3, 3, TOTAL);

  s3.addChart(pres.charts.BAR, [
    { name: "Documentation", labels: ["Mayo Clinic (Current)", "Peer AMC Average", "Top Decile Performer"], values: [40, 32, 22] },
    { name: "Direct Patient Care", labels: ["Mayo Clinic (Current)", "Peer AMC Average", "Top Decile Performer"], values: [28, 35, 42] },
    { name: "Care Coordination", labels: ["Mayo Clinic (Current)", "Peer AMC Average", "Top Decile Performer"], values: [15, 16, 18] },
    { name: "Other Clinical", labels: ["Mayo Clinic (Current)", "Peer AMC Average", "Top Decile Performer"], values: [17, 17, 18] },
  ], {
    x: 0.5, y: 1.15, w: 5.0, h: 3.6,
    barDir: "bar", barGrouping: "stacked",
    chartColors: [C.red, C.blue, C.slate, C.lightLine],
    showValue: true, dataLabelColor: C.white, dataLabelFontSize: 10,
    catAxisLabelColor: C.text, catAxisLabelFontSize: 10,
    valAxisHidden: false, valAxisLabelColor: C.muted, valAxisLabelFontSize: 10,
    showTitle: true, title: "% of Shift Time", titleColor: C.muted, titleFontSize: 10,
    valGridLine: { style: "none" }, catGridLine: { style: "none" },
    showLegend: true, legendPos: "b", legendFontSize: 10, legendColor: C.muted,
  });

  const impactCards = [
    { stat: "34%", desc: "of nurses report intent to leave, citing documentation as the #1 burnout driver", clr: C.red },
    { stat: "18%", desc: "YoY increase in near-miss events attributed to documentation gaps or fatigue", clr: C.accent },
    { stat: "$22M", desc: "estimated annual cost of redundant charting, overtime, and traveler fill", clr: C.blue },
  ];
  impactCards.forEach((card, i) => {
    const yCard = 1.225 + i * 1.2;
    addCard(s3, 6.35, yCard, 2.85, 1.05, C.white);
    s3.addText(card.stat, { x: 6.35, y: yCard + 0.1, w: 2.85, h: 0.4, fontSize: 24, fontFace: FONT_TITLE, color: card.clr, bold: true, align: "center", margin: 0 });
    s3.addText(card.desc, { x: 6.55, y: yCard + 0.52, w: 2.45, h: 0.45, fontSize: 10, fontFace: FONT_BODY, color: C.muted, align: "center", lineSpacingMultiple: 1.2, margin: 0 });
  });
  s3.addText("Source: Mayo Clinic Nursing Workforce Analytics, FY25 Q4; AACN Benchmarking Collaborative 2025", { x: 0.5, y: 4.9, w: 9, h: 0.25, fontSize: 9, fontFace: FONT_BODY, color: C.muted, italic: true });

  // ================================================================
  // SLIDE 4 — Root Cause Analysis
  // ================================================================
  let s4 = pres.addSlide();
  s4.background = { color: C.offWhite };
  addActionTitle(s4, "Five root causes drive 85% of documentation burden — redundant fields and fragmented workflows account for the largest share of recoverable time");
  addFooter(s4, 4, TOTAL);

  s4.addChart(pres.charts.BAR, [{
    name: "% of Total Documentation Burden",
    labels: ["Redundant / duplicate data entry", "Fragmented EHR workflows", "Regulatory & compliance over-doc.", "Lack of ambient capture technology", "Insufficient template optimization"],
    values: [28, 24, 18, 16, 14]
  }], {
    x: 0.4, y: 1.15, w: 5.5, h: 3.5,
    barDir: "bar", chartColors: [C.blue],
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.text, dataLabelFontSize: 11,
    catAxisLabelColor: C.text, catAxisLabelFontSize: 10,
    showTitle: true, title: "% of Total Documentation Burden", titleColor: C.muted, titleFontSize: 10,
    valAxisHidden: false, valAxisLabelColor: C.muted, valAxisLabelFontSize: 10,
    valGridLine: { style: "none" }, catGridLine: { style: "none" },
    showLegend: false,
  });

  addCard(s4, 6.2, 1.2, 3.3, 1.5, C.navy);
  s4.addText("KEY FINDING", { x: 6.4, y: 1.25, w: 2.9, h: 0.3, fontSize: 10, fontFace: FONT_BODY, color: C.accent, bold: true, charSpacing: 1.5, margin: 0 });
  s4.addText("52% of total burden stems from the top two causes — both addressable through technology + workflow redesign within 12 months.", {
    x: 6.4, y: 1.65, w: 2.9, h: 0.8, fontSize: 11, fontFace: FONT_BODY, color: C.white, lineSpacingMultiple: 1.3, margin: 0
  });

  addCard(s4, 6.2, 3.0, 3.3, 1.7, C.white);
  s4.addText("METHODOLOGY", { x: 6.4, y: 3.05, w: 2, h: 0.25, fontSize: 10, fontFace: FONT_BODY, color: C.blue, bold: true, charSpacing: 1.5, margin: 0 });
  const methItems = [
    "Time-motion study across 12 units (n=480 nurses)",
    "EHR click-stream analysis (3.2M interactions)",
    "Focus groups with 60+ bedside nurses",
    "Comparison to AACN Top Decile benchmarks",
  ];
  methItems.forEach((item, i) => {
    s4.addText(`${i+1}.  ${item}`, { x: 6.4, y: 3.38 + i * 0.3, w: 3.04, h: 0.27, fontSize: 10, fontFace: FONT_BODY, color: C.text, margin: 0 });
  });
  s4.addText("Source: Mayo Clinic CNO Office, Time-Motion Study FY25; Epic EHR Analytics", { x: 0.5, y: 4.9, w: 9, h: 0.25, fontSize: 9, fontFace: FONT_BODY, color: C.muted, italic: true });

  // ================================================================
  // SLIDE 5 — Solution Framework
  // ================================================================
  let s5 = pres.addSlide();
  s5.background = { color: C.offWhite };
  addActionTitle(s5, "A three-pillar transformation framework targets 60+ minutes of recovered bedside time per nurse per shift through technology, workflow redesign, and governance");
  addFooter(s5, 5, TOTAL);

  const pillars = [
    { title: "PILLAR 1", name: "Ambient AI &\nSmart Capture", color: C.blue,
      items: ["Voice-to-note assessments", "Auto-populated flowsheets", "AI-drafted discharge notes", "Clinical decision support"],
      impact: "~30 min recovered" },
    { title: "PILLAR 2", name: "Workflow &\nTemplate Redesign", color: C.slate,
      items: ["Eliminate 40% redundant fields", "Cross-unit doc standards", "Exception-based charting", "Standardized handoff notes"],
      impact: "~20 min recovered" },
    { title: "PILLAR 3", name: "Governance &\nSustainability", color: C.accent,
      items: ["Doc governance council", "Burden metrics dashboard", "Regulatory review cycle", "Nurse-led improvement teams"],
      impact: "~10 min recovered" },
  ];

  pillars.forEach((p, i) => {
    const xBase = [0.5, 3.6, 6.7][i];
    addCard(s5, xBase, 1.2, 2.80, 3.7, C.white);
    s5.addShape("rect", { x: xBase, y: 1.2, w: 2.80, h: 0.07, fill: { color: p.color } });
    s5.addText(p.title, { x: xBase, y: 1.4, w: 2.80, h: 0.2, fontSize: 10, fontFace: FONT_BODY, color: p.color, bold: true, charSpacing: 2, align: "center", margin: 0 });
    s5.addText(p.name, { x: xBase, y: 1.62, w: 2.80, h: 0.5, fontSize: 13, fontFace: FONT_TITLE, color: C.navy, bold: true, lineSpacingMultiple: 1.1, align: "center", margin: 0 });
    s5.addShape("line", { x: xBase + 0.15, y: 2.2, w: 2.65, h: 0, line: { color: C.lightLine, width: 0.5 } });
    p.items.forEach((item, j) => {
      const itemY = 2.34 + j * 0.46;
      const itemH = 0.36;
      s5.addImage({ data: checkIcon, x: xBase + 0.25, y: itemY + (itemH - 0.18) / 2, w: 0.18, h: 0.18 });
      s5.addText(item, { x: xBase + 0.52, y: itemY, w: 2.15, h: itemH, fontSize: 10, fontFace: FONT_BODY, color: C.text, valign: "middle", margin: 0 });
    });
    s5.addShape("rect", { x: xBase + 0.15, y: 4.25, w: 2.52, h: 0.45, fill: { color: C.ice } });
    const impactParts = p.impact.split("~");
    s5.addText([
      { text: "~", options: { fontSize: 13, fontFace: "Arial", color: p.color, bold: true } },
      { text: impactParts[1], options: { fontSize: 13, fontFace: FONT_BODY, color: p.color, bold: true } }
    ], { x: xBase + 0.15, y: 4.25, w: 2.52, h: 0.45, align: "center", valign: "middle" });
  });

  // ================================================================
  // SLIDE 6 — Ambient AI Deep Dive
  // ================================================================
  let s6 = pres.addSlide();
  s6.background = { color: C.offWhite };
  addActionTitle(s6, "Ambient AI documentation will auto-generate 70% of nursing notes from voice and device data, reducing manual charting by 30 minutes per shift in pilot units");
  addFooter(s6, 6, TOTAL);

  addCard(s6, 0.5, 1.2, 4.3, 3.6, C.white);
  s6.addText("CURRENT STATE", { x: 0.7, y: 1.35, w: 2, h: 0.25, fontSize: 10, fontFace: FONT_BODY, color: C.red, bold: true, charSpacing: 1.5, margin: 0 });
  const currentSteps = ["Nurse assesses patient", "Walks to workstation", "Logs into EHR", "Manually enters vitals", "Types narrative note", "Reviews & signs"];
  currentSteps.forEach((step, i) => {
    s6.addShape("rect", { x: 0.7, y: 1.72 + i * 0.28, w: 0.12, h: 0.12, fill: { color: C.red } });
    s6.addText(step, { x: 0.92, y: 1.65 + i * 0.28, w: 1.7, h: 0.24, fontSize: 10, fontFace: FONT_BODY, color: C.text, margin: 0 });
  });
  s6.addText([
    { text: "~", options: { fontSize: 10, fontFace: "Arial", color: C.red, bold: true } },
    { text: "48 min per cycle", options: { fontSize: 10, fontFace: FONT_BODY, color: C.red, bold: true } }
  ], { x: 0.7, y: 3.37, w: 2, h: 0.2, margin: 0 });

  s6.addText("FUTURE STATE", { x: 2.7, y: 1.35, w: 2, h: 0.25, fontSize: 10, fontFace: FONT_BODY, color: C.green, bold: true, charSpacing: 1.5, margin: 0 });
  const futureSteps = ["Nurse assesses patient", "Ambient AI captures note", "Device data auto-populates", "AI drafts discharge summary", "Smart alert flags exceptions", "Nurse reviews & confirms"];
  futureSteps.forEach((step, i) => {
    s6.addShape("rect", { x: 2.7, y: 1.72 + i * 0.28, w: 0.12, h: 0.12, fill: { color: C.green } });
    s6.addText(step, { x: 2.92, y: 1.65 + i * 0.28, w: 1.7, h: 0.24, fontSize: 10, fontFace: FONT_BODY, color: C.text, margin: 0 });
  });
  s6.addText([
    { text: "~", options: { fontSize: 10, fontFace: "Arial", color: C.green, bold: true } },
    { text: "18 min per cycle", options: { fontSize: 10, fontFace: FONT_BODY, color: C.green, bold: true } }
  ], { x: 2.7, y: 3.37, w: 2, h: 0.2, margin: 0 });

  s6.addShape("rect", { x: 0.7, y: 3.75, w: 3.9, h: 0.85, fill: { color: C.ice } });
  s6.addText("62% reduction in charting cycle time", { x: 0.8, y: 3.78, w: 3.7, h: 0.3, fontSize: 12, fontFace: FONT_BODY, color: C.navy, bold: true, align: "center", margin: 0 });
  s6.addText("Validated across 3 peer AMC pilots\n(Stanford, UCSF, Cleveland Clinic)", { x: 0.8, y: 4.1, w: 3.7, h: 0.42, fontSize: 10, fontFace: FONT_BODY, color: C.slate, align: "center", lineSpacingMultiple: 1.2, margin: 0 });

  addCard(s6, 5.1, 1.2, 4.4, 3.6, C.white);
  s6.addText("TECHNOLOGY COMPONENTS", { x: 5.1, y: 1.35, w: 4.4, h: 0.25, fontSize: 10, fontFace: FONT_BODY, color: C.navy, bold: true, charSpacing: 1.5, align: "center", margin: 0 });

  const techStack = [
    { name: "Ambient Voice Capture", desc: "NLP-powered microphones capture nurse-patient dialogue and auto-generate SOAP notes" },
    { name: "Device Integration Layer", desc: "Real-time vital sign streaming from bedside monitors directly into EHR flowsheets" },
    { name: "Smart Review Interface", desc: "AI-prepared documentation presented for nurse review and one-click attestation" },
    { name: "Continuous Learning Engine", desc: "PLACEHOLDER" },
  ];
  techStack.forEach((tech, i) => {
    const yTech = 1.65 + i * 0.78;
    s6.addText(tech.name, { x: 5.4, y: yTech, w: 3.8, h: 0.22, fontSize: 11, fontFace: FONT_BODY, color: C.navy, bold: true, margin: 0 });
    s6.addText(tech.desc, { x: 5.4, y: yTech + 0.24, w: 3.8, h: 0.42, fontSize: 10, fontFace: FONT_BODY, color: C.muted, lineSpacingMultiple: 1.2, margin: 0 });
  });
  s6.addText("Source: Peer institution pilot results; vendor performance benchmarks (Nuance DAX, 3M, Epic Ambient)", { x: 0.5, y: 4.9, w: 9, h: 0.25, fontSize: 9, fontFace: FONT_BODY, color: C.muted, italic: true });

  // ================================================================
  // SLIDE 7 — Financial Impact
  // ================================================================
  let s7 = pres.addSlide();
  s7.background = { color: C.offWhite };
  addActionTitle(s7, "The initiative delivers $14M in annual run-rate savings by FY28 with a 14-month payback period — ROI exceeds 280% over 3 years");
  addFooter(s7, 7, TOTAL);

  s7.addChart(pres.charts.BAR, [{
    name: "Value ($M)",
    labels: ["Total\nInvestment", "Reduced\nOvertime", "Traveler\nCost Avoid.", "Retained\nNurse Value", "Quality\nImprovement", "Net Annual\nBenefit"],
    values: [-8.5, 4.0, 4.0, 4.0, 2.5, 14.0]
  }], {
    x: 0.4, y: 1.15, w: 5.8, h: 3.2,
    barDir: "col", chartColors: [C.blue],
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.text, dataLabelFontSize: 10,
    catAxisLabelColor: C.text, catAxisLabelFontSize: 10,
    showTitle: true, title: "Value ($ Millions)", titleColor: C.muted, titleFontSize: 10,
    valAxisHidden: false, valAxisLabelColor: C.muted, valAxisLabelFontSize: 10,
    valAxisMinVal: -15,
    valGridLine: { style: "none" }, catGridLine: { style: "none" },
    showLegend: false,
  });

  const finCards = [
    { label: "Total Investment", value: "$8.5M", sub: "over 18-month implementation", color: C.slate },
    { label: "Annual Run-Rate Savings", value: "$14.0M", sub: "fully realized by FY28", color: C.blue },
    { label: "Payback Period", value: "14 mo.", sub: "breakeven in Q2 FY28", color: C.accent },
    { label: "3-Year ROI", value: "280%+", sub: "cumulative net benefit $33M", color: C.navy },
  ];
  finCards.forEach((fc, i) => {
    const yFc = 1.35 + i * 0.72;
    addCard(s7, 6.5, yFc, 3.0, 0.62, C.white);
    s7.addShape("rect", { x: 6.5, y: yFc, w: 0.06, h: 0.62, fill: { color: fc.color } });
    s7.addText(fc.label, { x: 6.63, y: yFc + 0.01, w: 2.6, h: 0.18, fontSize: 10, fontFace: FONT_BODY, color: C.muted, margin: 0 });
    s7.addText(fc.value, { x: 6.82, y: yFc + 0.2, w: 1.3, h: 0.3, fontSize: 18, fontFace: FONT_TITLE, color: fc.color, bold: true, valign: "middle", margin: 0 });
    s7.addText(fc.sub, { x: 8.27, y: yFc + 0.16, w: 1.2, h: 0.3, fontSize: 10, fontFace: FONT_BODY, color: C.muted, valign: "middle", margin: 0 });
  });
  s7.addText("Source: Mayo Clinic Finance & Nursing Workforce Planning; assumes 90% adoption rate and 15% contingency buffer on all estimates", { x: 0.5, y: 4.9, w: 9, h: 0.25, fontSize: 9, fontFace: FONT_BODY, color: C.muted, italic: true });

  // ================================================================
  // SLIDE 8 — Quality & Safety (with bullet points in CMS/Safety boxes)
  // ================================================================
  let s8 = pres.addSlide();
  s8.background = { color: C.offWhite };
  addActionTitle(s8, "Reduced documentation burden directly improves clinical quality — peer institutions show 25% fewer near-miss events and 15% higher HCAHPS scores within 12 months");
  addFooter(s8, 8, TOTAL);

  const metrics = [
    { name: "Near-Miss Events", unit: "per 1,000 Pt Days", current: "4.2", projected: "3.1", delta: "-26%", deltaColor: C.green },
    { name: "HCAHPS Nurse Comm.", unit: "Percentile", current: "62nd", projected: "78th", delta: "+16pp", deltaColor: C.green },
    { name: "Time-to-Document", unit: "min/shift", current: "288", projected: "180", delta: "-37%", deltaColor: C.green },
    { name: "Doc. Completeness", unit: "%", current: "78%", projected: "94%", delta: "+16pp", deltaColor: C.green },
  ];

  metrics.forEach((m, i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const mx = col === 0 ? 0.5 : 3.49;
    const my = 1.15 + row * 1.85 + (col === 1 ? 0.0125 : 0);
    addCard(s8, mx, my, 2.65, 1.65, C.white);
    s8.addText(m.name, { x: mx, y: my + 0.1, w: 2.65, h: 0.22, fontSize: 11, fontFace: FONT_BODY, color: C.navy, bold: true, align: "center", margin: 0 });
    s8.addText(m.unit, { x: mx, y: my + 0.32, w: 2.65, h: 0.18, fontSize: 10, fontFace: FONT_BODY, color: C.muted, align: "center", margin: 0 });
    s8.addText("Current", { x: mx + 0.15, y: my + 0.6, w: 1.0, h: 0.18, fontSize: 10, fontFace: FONT_BODY, color: C.muted, align: "center", margin: 0 });
    s8.addText("Projected", { x: mx + 1.5, y: my + 0.6, w: 1.0, h: 0.18, fontSize: 10, fontFace: FONT_BODY, color: C.muted, align: "center", margin: 0 });
    s8.addText(m.current, { x: mx + 0.15, y: my + 0.78, w: 1.0, h: 0.35, fontSize: 20, fontFace: FONT_TITLE, color: C.steel, bold: true, align: "center", margin: 0 });
    s8.addText(m.projected, { x: mx + 1.5, y: my + 0.78, w: 1.0, h: 0.35, fontSize: 20, fontFace: FONT_TITLE, color: C.blue, bold: true, align: "center", margin: 0 });
    s8.addText("→", { x: mx + 1.05, y: my + 0.78, w: 0.55, h: 0.35, fontSize: 16, fontFace: FONT_BODY, color: C.muted, align: "center", valign: "middle", margin: 0 });
    s8.addShape("rect", { x: mx + (2.65 - 0.7) / 2, y: my + 1.22, w: 0.7, h: 0.25, fill: { color: m.deltaColor } });
    s8.addText(m.delta, { x: mx + (2.65 - 0.7) / 2, y: my + 1.22, w: 0.7, h: 0.25, fontSize: 10, fontFace: FONT_BODY, color: C.white, bold: true, align: "center", valign: "middle" });
  });

  // CMS Value-Based Impact card — with bullet points
  addCard(s8, 6.47, 1.15, 3.0, 1.65, C.navy);
  s8.addText("CMS VALUE-BASED IMPACT", { x: 6.6, y: 1.18, w: 2.6, h: 0.3, fontSize: 10, fontFace: FONT_BODY, color: C.accent, bold: true, charSpacing: 1, margin: 0 });
  s8.addText([
    { text: "Current penalty exposure of $3.2M annually from HCAHPS-linked metrics.", options: { bullet: true, breakLine: true, fontSize: 10, fontFace: FONT_BODY, color: C.ice } },
    { text: "Projected improvement moves Mayo from 62nd to 78th percentile on nurse communication — protecting $2.1M in VBP revenue.", options: { bullet: true, fontSize: 10, fontFace: FONT_BODY, color: C.ice } },
  ], { x: 6.6, y: 1.41, w: 2.6, h: 1.3, valign: "top", margin: 0, paraSpaceAfter: 6 });

  // Patient Safety Link card — with bullet points
  addCard(s8, 6.47, 3.0, 3.0, 1.65, C.white);
  s8.addText("PATIENT SAFETY LINK", { x: 6.6, y: 3.13, w: 2.5, h: 0.2, fontSize: 10, fontFace: FONT_BODY, color: C.red, bold: true, charSpacing: 1.5, margin: 0 });
  s8.addText([
    { text: "Analysis of 1,240 near-miss events found 38% had a contributing documentation gap.", options: { bullet: true, breakLine: true, fontSize: 10, fontFace: FONT_BODY, color: C.text } },
    { text: "Incomplete handoff notes, delayed vital sign entry, or missed allergy updates.", options: { bullet: true, fontSize: 10, fontFace: FONT_BODY, color: C.text } },
  ], { x: 6.6, y: 3.35, w: 2.72, h: 1.03, valign: "top", margin: 0, paraSpaceAfter: 6 });

  s8.addText("Source: Mayo Patient Safety Office FY25; CMS Hospital VBP Program Data; AHRQ Patient Safety Indicators", { x: 0.5, y: 4.9, w: 9, h: 0.25, fontSize: 9, fontFace: FONT_BODY, color: C.muted, italic: true });

  // ================================================================
  // SLIDE 9 — Workforce & Retention
  // ================================================================
  let s9 = pres.addSlide();
  s9.background = { color: C.offWhite };
  addActionTitle(s9, "Reducing documentation burden is the highest-impact retention lever — modeling shows a 12-point drop in turnover intent, avoiding $6.8M in annual replacement costs");
  addFooter(s9, 9, TOTAL);

  s9.addChart(pres.charts.LINE, [
    { name: "Turnover Intent (%)", labels: ["FY22", "FY23", "FY24", "FY25", "FY26P", "FY27P", "FY28P"], values: [22.0, 26.0, 30.0, 34.0, 30.0, 26.0, 22.0] },
    { name: "Doc Hours/Shift (hrs)", labels: ["FY22", "FY23", "FY24", "FY25", "FY26P", "FY27P", "FY28P"], values: [3.8, 3.8, 3.8, 4.8, 3.8, 3.8, 3.0] },
  ], {
    x: 0.4, y: 1.2, w: 5.5, h: 3.2,
    chartColors: [C.red, C.blue], lineSize: 2.5,
    showMarker: true, markerSize: 6, showValue: true,
    dataLabelPosition: "t",
    dataLabelColor: C.text, dataLabelFontSize: 10,
    catAxisLabelColor: C.text, catAxisLabelFontSize: 10,
    showTitle: true, title: "Turnover Intent (%) vs. Doc Hours per Shift (hrs)", titleColor: C.muted, titleFontSize: 10,
    valAxisLabelColor: C.muted, valAxisLabelFontSize: 10,
    valGridLine: { color: C.lightLine, size: 0.5 }, catGridLine: { style: "none" },
    showLegend: true, legendPos: "b", legendFontSize: 10, legendColor: C.muted,
  });

  const boxW = 2.0;
  const chartCenterX = 0.4 + 5.5 / 2 - boxW / 2;
  s9.addShape("rect", { x: chartCenterX, y: 4.40, w: boxW, h: 0.26, fill: { color: C.navy } });
  s9.addText("Projected post-implementation", { x: chartCenterX, y: 4.40, w: boxW, h: 0.26, fontSize: 10, fontFace: FONT_BODY, color: C.white, italic: true, align: "center", valign: "middle", margin: 0 });

  const retCards = [
    { stat: "$52K", desc: "Average cost to replace one RN (recruiting, onboarding, lost productivity)" },
    { stat: "130", desc: "PLACEHOLDER" },
    { stat: "$6.8M", desc: "PLACEHOLDER" },
  ];
  retCards.forEach((rc, i) => {
    const yRc = 1.2 + i * 1.2;
    addCard(s9, 6.2, yRc, 3.3, 1.05, C.white);
    s9.addText(rc.stat, { x: 6.2, y: yRc + 0.1, w: 3.3, h: 0.35, fontSize: 22, fontFace: FONT_TITLE, color: C.navy, bold: true, align: "center", margin: 0 });
    s9.addText(rc.desc, { x: 6.65, y: yRc + 0.48, w: 2.4, h: 0.48, fontSize: 10, fontFace: FONT_BODY, color: C.muted, align: "center", lineSpacingMultiple: 1.2, margin: 0 });
  });
  s9.addText("Source: NSI Nursing Solutions National Healthcare Retention & RN Staffing Report 2025; Mayo HR Analytics", { x: 0.5, y: 4.9, w: 9, h: 0.25, fontSize: 9, fontFace: FONT_BODY, color: C.muted, italic: true });

  // ================================================================
  // SLIDE 10 — Roadmap
  // ================================================================
  let s10 = pres.addSlide();
  s10.background = { color: C.offWhite };
  addActionTitle(s10, "An 18-month phased implementation begins with quick wins in Q1, scales ambient AI across all units by Q4, and achieves full run-rate savings by FY28 Q2");
  addFooter(s10, 10, TOTAL);

  const phases = [
    { label: "PHASE 1", name: "Foundation", time: "Q1–Q2 FY27", color: C.blue,
      items: ["Deploy ambient AI pilot (5 units)", "EHR template audit & field reduction", "Governance council launch", "Change management rollout"],
      milestone: "30 min/shift saved in pilot" },
    { label: "PHASE 2", name: "Scale", time: "Q3–Q4 FY27", color: C.slate,
      items: ["Expand AI to 40 units", "Device integration live", "Exception-based charting adoption", "Training 2,000+ nurses"],
      milestone: "45 min/shift saved at scale" },
    { label: "PHASE 3", name: "Optimize", time: "Q1–Q2 FY28", color: C.accent,
      items: ["Enterprise-wide deployment (92 units)", "ML model fine-tuning", "Cross-continuum rollout (ambulatory)", "Full ROI realization"],
      milestone: "60+ min/shift; $14M run-rate" },
  ];

  const phaseXPositions = [0.5, 3.625, 6.75];
  phases.forEach((ph, i) => {
    const xPh = phaseXPositions[i];
    s10.addShape("rect", { x: xPh, y: 1.375, w: 2.75, h: 0.35, fill: { color: ph.color, transparency: 20 } });
    s10.addText(`${ph.label}: ${ph.name}  (${ph.time})`, {
      x: xPh, y: 1.375, w: 2.75, h: 0.35, fontSize: 10, fontFace: FONT_BODY, color: C.navy, bold: true, valign: "middle", align: "center", margin: 0
    });
  });

  phases.forEach((ph, i) => {
    const xCard = phaseXPositions[i];
    addCard(s10, xCard, 1.925, 2.75, 2.7, C.white);
    ph.items.forEach((item, j) => {
      const itemY = 2.1 + j * 0.45;
      const itemH = 0.38;
      s10.addImage({ data: checkIcon, x: xCard + 0.2, y: itemY + (itemH - 0.16) / 2, w: 0.16, h: 0.16 });
      s10.addText(item, { x: xCard + 0.44, y: itemY, w: 2.25, h: itemH, fontSize: 10, fontFace: FONT_BODY, color: C.text, valign: "middle", lineSpacingMultiple: 1.2, margin: 0 });
    });
    s10.addShape("rect", { x: xCard + 0.15, y: 4.025, w: 2.45, h: 0.4, fill: { color: ph.color, transparency: 85 } });
    s10.addText(ph.milestone, { x: xCard + 0.15, y: 4.025, w: 2.45, h: 0.4, fontSize: 10, fontFace: FONT_BODY, color: ph.color, bold: true, align: "center", valign: "middle", margin: 0 });
  });

  // ================================================================
  // SLIDE 11 — Risk Mitigation
  // ================================================================
  let s11 = pres.addSlide();
  s11.background = { color: C.offWhite };
  addActionTitle(s11, "Four material risks have been identified and mitigated through structured contingency planning — adoption risk is the primary concern, addressed through co-design and champions");
  addFooter(s11, 11, TOTAL);

  const risks = [
    { risk: "Nurse Adoption\nResistance", likelihood: "High", impact: "High", mitigation: "Co-design with frontline nurses; 120 unit-level champions; incentive-linked adoption KPIs", residual: "Medium" },
    { risk: "AI Accuracy /\nPatient Safety", likelihood: "Medium", impact: "Critical", mitigation: "Mandatory nurse attestation; 99.5% accuracy threshold before scaling; continuous monitoring", residual: "Low" },
    { risk: "EHR Vendor\nDelays", likelihood: "Medium", impact: "Medium", mitigation: "Parallel vendor track (Epic + 3M); contractual SLAs with penalty clauses; internal build fallback", residual: "Low" },
    { risk: "Regulatory\nCompliance", likelihood: "Low", impact: "High", mitigation: "Joint Counsel & Compliance review; CMS/TJC pre-engagement; phased rollout with audit checkpoints", residual: "Low" },
  ];

  const cX = [0.5, 2.27, 3.41, 4.52, 5.91];
  const cW = [2.0, 1.1, 0.9, 0.8, 3.59];
  const hdrLabels = ["RISK", "LIKELIHOOD", "IMPACT", "RESIDUAL", "MITIGATION STRATEGY"];

  s11.addShape("rect", { x: 0.5, y: 1.2, w: 9, h: 0.4, fill: { color: C.navy } });
  hdrLabels.forEach((h, i) => {
    s11.addText(h, { x: cX[i], y: 1.2, w: cW[i], h: 0.4, fontSize: 10, fontFace: FONT_BODY, color: C.white, bold: true, align: "center", valign: "middle", charSpacing: 0.5, margin: 0 });
  });

  risks.forEach((r, idx) => {
    const yRow = 1.7 + idx * 0.85;
    const bgColor = idx % 2 === 0 ? C.white : C.ice;
    s11.addShape("rect", { x: 0.5, y: yRow, w: 9, h: 0.75, fill: { color: bgColor } });
    s11.addText(r.risk, { x: cX[0], y: yRow, w: cW[0], h: 0.75, fontSize: 10, fontFace: FONT_BODY, color: C.navy, bold: true, align: "center", valign: "middle", margin: 0 });

    const lColor = r.likelihood === "High" ? C.accent : r.likelihood === "Medium" ? C.slate : C.green;
    const lPillW = 0.8;
    s11.addShape("rect", { x: cX[1] + (cW[1] - lPillW) / 2, y: yRow + 0.22, w: lPillW, h: 0.28, fill: { color: lColor } });
    s11.addText(r.likelihood, { x: cX[1], y: yRow + 0.22, w: lPillW, h: 0.28, fontSize: 10, fontFace: FONT_BODY, color: C.white, bold: true, align: "center", valign: "middle" });

    const iColor = r.impact === "Critical" ? C.red : r.impact === "High" ? C.accent : r.impact === "Medium" ? C.slate : C.green;
    const iPillW = 0.8;
    s11.addShape("rect", { x: cX[2] + (cW[2] - iPillW) / 2, y: yRow + 0.22, w: iPillW, h: 0.28, fill: { color: iColor } });
    s11.addText(r.impact, { x: cX[2], y: yRow + 0.22, w: iPillW, h: 0.28, fontSize: 10, fontFace: FONT_BODY, color: C.white, bold: true, align: "center", valign: "middle" });

    const resColor = r.residual === "Medium" ? C.accent : C.green;
    const rPillW = 0.8;
    s11.addShape("rect", { x: cX[3] + (cW[3] - rPillW) / 2, y: yRow + 0.22, w: rPillW, h: 0.28, fill: { color: resColor } });
    s11.addText(r.residual, { x: cX[3], y: yRow + 0.22, w: rPillW, h: 0.28, fontSize: 10, fontFace: FONT_BODY, color: C.white, bold: true, align: "center", valign: "middle" });

    s11.addText(r.mitigation, { x: cX[4] + 0.05, y: yRow, w: cW[4] - 0.1, h: 0.75, fontSize: 10, fontFace: FONT_BODY, color: C.text, align: "center", valign: "middle", lineSpacingMultiple: 1.2, margin: 0 });
  });

  // ================================================================
  // SLIDE 12 — Recommendations & Immediate Ask (numbers: 1, 2, 3)
  // ================================================================
  let s12 = pres.addSlide();
  s12.background = { color: C.offWhite };

  s12.addText("Recommendations & Immediate Ask", {
    x: 0.5, y: 0.3, w: 9, h: 0.5, fontSize: 22, fontFace: FONT_TITLE, color: C.navy, bold: true, margin: 0
  });
  s12.addShape("line", { x: 0.5, y: 0.85, w: 9, h: 0, line: { color: C.lightLine, width: 0.5 } });

  const recs = [
    { num: "1", title: "Approve $8.5M Investment", desc: "Authorize the 18-month transformation budget with staged funding gates aligned to Phase 1/2/3 milestones", owner: "CFO + COO", timeline: "Board vote: May 2026" },
    { num: "2", title: "Establish Executive Steering Committee", desc: "CNO-chaired, with CMO, CIO, CFO, and CHRO — meeting biweekly through Phase 1 with monthly cadence thereafter", owner: "CEO", timeline: "Committee formed: May 2026" },
    { num: "3", title: "Launch Pilot in 5 High-Impact Units", desc: "Select pilot units based on highest documentation burden scores; begin ambient AI deployment and template redesign", owner: "CNO + CIO", timeline: "Pilot live: July 2026" },
  ];

  recs.forEach((rec, i) => {
    const yRec = 1.1 + i * 1.25;
    addCard(s12, 0.5, yRec, 5.8, 1.1, C.ice);
    s12.addShape("rect", { x: 0.5, y: yRec, w: 0.7, h: 1.1, fill: { color: C.blue } });
    s12.addText(rec.num, { x: 0.5, y: yRec, w: 0.7, h: 1.1, fontSize: 22, fontFace: FONT_TITLE, color: C.white, bold: true, align: "center", valign: "middle" });
    s12.addText(rec.title, { x: 1.35, y: yRec + 0.06, w: 4.7, h: 0.3, fontSize: 13, fontFace: FONT_BODY, color: C.navy, bold: true, margin: 0 });
    s12.addText(rec.desc, { x: 1.35, y: yRec + 0.38, w: 4.7, h: 0.45, fontSize: 10, fontFace: FONT_BODY, color: C.text, lineSpacingMultiple: 1.2, margin: 0 });
    s12.addText(`Owner: ${rec.owner}`, { x: 1.35, y: yRec + 0.84, w: 2.3, h: 0.2, fontSize: 10, fontFace: FONT_BODY, color: C.accent, bold: true, margin: 0 });
    s12.addText(rec.timeline, { x: 3.7, y: yRec + 0.84, w: 2.4, h: 0.2, fontSize: 10, fontFace: FONT_BODY, color: C.muted, margin: 0 });
  });

  addCard(s12, 6.6, 1.1, 2.9, 3.6, C.navy);
  s12.addText("WHAT WE NEED FROM YOU", { x: 6.6, y: 1.2, w: 2.9, h: 0.45, fontSize: 12, fontFace: FONT_BODY, color: C.white, bold: true, charSpacing: 1, align: "center", valign: "middle", margin: 0 });
  s12.addShape("line", { x: 6.8, y: 1.7, w: 2.5, h: 0, line: { color: C.white, width: 0.5, transparency: 50 } });

  const asks = [
    "Formal alignment on this initiative as a top-3 strategic priority",
    "Budget approval and staged funding commitment by May 2026",
    "PLACEHOLDER",
    "Direction to IT, Compliance, and HR to resource cross-functional team",
  ];
  asks.forEach((ask, i) => {
    const askY = 1.85 + i * 0.62;
    const askH = 0.55;
    s12.addText(`${i+1}.`, { x: 6.8, y: askY, w: 0.25, h: askH, fontSize: 11, fontFace: FONT_BODY, color: C.accent, bold: true, valign: "middle", margin: 0 });
    s12.addText(ask, { x: 7.08, y: askY, w: 2.25, h: askH, fontSize: 10, fontFace: FONT_BODY, color: C.white, valign: "middle", lineSpacingMultiple: 1.2, margin: 0 });
  });

  addFooter(s12, 12, TOTAL);

  // ── WRITE ─────────────────────────────────────────────────────────
  await pres.writeFile({ fileName: "/home/assets/NursingDocTransformation.pptx" });
  console.log("Deck created successfully.");
}

buildDeck().catch(err => { console.error(err); process.exit(1); });
