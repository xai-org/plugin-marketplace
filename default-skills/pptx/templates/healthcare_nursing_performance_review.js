const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fs = require("fs");

function renderIconSvg(IC, color, size = 256) {
  return ReactDOMServer.renderToStaticMarkup(React.createElement(IC, { color, size: String(size) }));
}
async function iconPng(IC, color, sz = 256) {
  return "image/png;base64," + (await sharp(Buffer.from(renderIconSvg(IC, color, sz))).png().toBuffer()).toString("base64");
}
function b64(p, m) { return `${m};base64,${fs.readFileSync(p).toString("base64")}`; }

async function buildDeck() {
  const { FaHospital, FaExclamationTriangle, FaPills, FaUsers, FaClipboardCheck } = require("react-icons/fa");
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Nursing Administration";
  pres.title = "Q1 2026 Nursing Performance Review";

  const C = {
    navy: "0F2B3C", teal: "0D7377", tealLight: "14A3A8", mint: "A7E8D0",
    white: "FFFFFF", offWhite: "F4F7F6", lightGray: "E8EDED",
    gray: "6B7F82", dkGray: "4A5C60", darkText: "1A2E35",
    red: "D94452", amber: "E8A838", green: "2D9B6E", coral: "E07A5F",
  };
  const F = "Calibri";
  const shadow = () => ({ type: "outer", blur: 4, offset: 2, angle: 135, color: "000000", opacity: 0.08 });

  // Real hospital photo
  const hospitalPhoto = b64("/home/assets/hospital_real.jpg", "image/jpeg");
  const logoSmall = b64("/home/assets/sutter_logo_white.png", "image/png");
  const logoBig = b64("/home/assets/sutter_logo_big.png", "image/png");

  const TX = 0.5, TY = 0.38, TW = 9, TH = 0.35;
  const LBL_Y = 0.2, BODY_Y = 0.85, FTR_Y = 5.25, FTR_H = 0.375;
  const CH = FTR_Y - 0.25 - BODY_Y;

  function addFooter(sl, n, src) {
    sl.addShape(pres.shapes.RECTANGLE, { x: 0, y: FTR_Y, w: 10, h: FTR_H, fill: { color: C.navy } });
    sl.addImage({ data: logoSmall, x: 0.35, y: FTR_Y + (FTR_H - 0.18) / 2, w: 1.2, h: 0.18 });
    sl.addText(src || "Nursing Department  |  Confidential", { x: 1.7, y: FTR_Y, w: 7.0, h: FTR_H, fontSize: 7, fontFace: F, color: C.white, valign: "middle", align: "center", margin: 0, italic: !!src });
    sl.addText(`${n} / 10`, { x: 9, y: FTR_Y, w: 0.7, h: FTR_H, fontSize: 7, fontFace: F, color: C.white, align: "right", valign: "middle", margin: 0 });
  }
  function addLabel(sl, t) { sl.addText(t, { x: TX, y: LBL_Y, w: TW, h: 0.18, fontSize: 9, fontFace: F, color: C.teal, charSpacing: 3, bold: true, margin: 0 }); }
  function addTitle(sl, t) { sl.addText(t, { x: TX, y: TY, w: TW, h: TH, fontSize: 14, fontFace: F, color: C.darkText, bold: true, margin: 0, valign: "middle" }); }

  // ══════════════════════════════════════════════
  // SLIDE 1 — TITLE (real photo, single big logo)
  // ══════════════════════════════════════════════
  let s1 = pres.addSlide();
  s1.background = { color: C.navy };
  s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.teal } });

  // Real hospital photo — fills entire right side
  s1.addImage({ data: hospitalPhoto, x: 5, y: 0, w: 5, h: 5.625, sizing: { type: "cover", w: 5, h: 5.625 } });
  s1.addShape(pres.shapes.RECTANGLE, { x: 5, y: 0, w: 5, h: 5.625, fill: { color: C.navy, transparency: 35 } });

  s1.addText("Q1 2026\nNursing Performance Review", { x: 0.55, y: 1.3, w: 4.2, h: 1.5, fontSize: 30, fontFace: F, color: C.white, bold: true, lineSpacingMultiple: 1.15, margin: 0 });
  s1.addShape(pres.shapes.RECTANGLE, { x: 0.55, y: 3.0, w: 3.6, h: 0.03, fill: { color: C.teal } });
  s1.addText("Presented to the Director of Nursing  |  April 14, 2026", { x: 0.55, y: 3.2, w: 4.2, h: 0.25, fontSize: 11, fontFace: F, color: C.gray, margin: 0 });
  s1.addText("Reporting Period: January – March 2026", { x: 0.55, y: 3.5, w: 4.2, h: 0.22, fontSize: 10, fontFace: F, color: C.gray, margin: 0 });

  // Hospital icon + label at bottom-left (moved from top)
  const hospIco = await iconPng(FaHospital, "#14A3A8", 256);
  s1.addImage({ data: hospIco, x: 0.55, y: 4.45, w: 0.5, h: 0.5 });
  s1.addText("SUTTER HEALTH ROSEVILLE", { x: 1.2, y: 4.47, w: 3.8, h: 0.45, fontSize: 12, fontFace: F, color: C.tealLight, charSpacing: 3, valign: "middle", margin: 0 });

  // ══════════════════════════════════════════════
  // SLIDE 2 — EXEC SUMMARY (% on ALL cards)
  // ══════════════════════════════════════════════
  let s2 = pres.addSlide();
  s2.background = { color: C.offWhite };
  addFooter(s2, 2, "Sources: Epic EHR, Kronos Workforce, NHSN  |  All comparisons vs. Q4 2025");
  addLabel(s2, "EXECUTIVE SUMMARY");
  addTitle(s2, "Q1 exceeded 4 of 5 KPI targets; nurse turnover is the sole area requiring Q2 intervention.");

  // ALL cards now have % sign
  const kpis = [
    { metric: "Fall Rate", val: "2.1%", unit: "per 1K pt-days", vs: "▼ 18% QoQ", target: "Target: < 3.0%", status: "green" },
    { metric: "Med Errors", val: "0.8%", unit: "of admin.", vs: "▼ 0.3pp QoQ", target: "Target: < 1.0%", status: "green" },
    { metric: "Readmission", val: "11.2%", unit: "30-day", vs: "▼ 1.1pp QoQ", target: "Target: < 12.0%", status: "green" },
    { metric: "Turnover", val: "14.6%", unit: "annualized", vs: "▲ 0.9pp QoQ", target: "Target: < 13.0%", status: "red" },
    { metric: "Compliance", val: "94%", unit: "avg score", vs: "▲ 2pp QoQ", target: "Target: ≥ 90%", status: "green" },
  ];
  const kW = 1.72, kGap = 0.1, kSX = (10 - (5 * kW + 4 * kGap)) / 2;
  for (let i = 0; i < kpis.length; i++) {
    const k = kpis[i], kx = kSX + i * (kW + kGap), ky = BODY_Y + 0.05, sc = k.status === "green" ? C.green : C.red;
    s2.addShape(pres.shapes.RECTANGLE, { x: kx, y: ky, w: kW, h: 2.1, fill: { color: C.white }, shadow: shadow() });
    s2.addShape(pres.shapes.RECTANGLE, { x: kx, y: ky, w: kW, h: 0.05, fill: { color: sc } });
    s2.addText(k.metric, { x: kx, y: ky + 0.15, w: kW, h: 0.3, fontSize: 10, fontFace: F, color: C.dkGray, bold: true, align: "center", margin: 0 });
    s2.addText(k.val, { x: kx, y: ky + 0.4, w: kW, h: 0.6, fontSize: 30, fontFace: F, color: C.darkText, bold: true, align: "center", valign: "middle", margin: 0 });
    s2.addText(k.unit, { x: kx, y: ky + 0.95, w: kW, h: 0.2, fontSize: 9, fontFace: F, color: C.dkGray, align: "center", margin: 0 });
    s2.addText(k.vs, { x: kx, y: ky + 1.2, w: kW, h: 0.25, fontSize: 10, fontFace: F, color: sc, bold: true, align: "center", margin: 0 });
    s2.addText(k.target, { x: kx, y: ky + 1.5, w: kW, h: 0.25, fontSize: 9, fontFace: F, color: C.dkGray, align: "center", margin: 0 });
    s2.addText(k.status === "green" ? "ON TARGET" : "AT RISK", { x: kx + (kW - 1) / 2, y: ky + 1.78, w: 1, h: 0.22, fontSize: 7, fontFace: F, color: C.white, bold: true, align: "center", valign: "middle", margin: 0, fill: { color: sc } });
  }
  const narY = BODY_Y + 2.3, narH = FTR_Y - 0.15 - narY;
  s2.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: narY, w: 9, h: narH, fill: { color: C.white }, shadow: shadow() });
  s2.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: narY, w: 0.06, h: narH, fill: { color: C.teal } });
  s2.addText("Key Findings & Recommended Actions", { x: 0.75, y: narY + 0.06, w: 8.5, h: 0.28, fontSize: 13, fontFace: F, color: C.darkText, bold: true, margin: 0 });
  s2.addText([
    { text: "1. ", options: { bold: true, color: C.teal } },
    { text: "Patient safety metrics are at historic lows. Fall rate (2.1/1K pt-days) and med error rate (0.8%) both outperform NDNQI national benchmarks and internal targets. Sustained by hourly rounding improvements and BCMA enforcement.", options: { breakLine: true } },
    { text: "2. ", options: { bold: true, color: C.teal } },
    { text: "30-day readmission improved for the fourth consecutive quarter to 11.2%, now below the 12% CMS benchmark. CHF readmission (18.4%) remains the persistent outlier and requires a dedicated cross-functional discharge planning taskforce in Q2.", options: { breakLine: true } },
    { text: "3. ", options: { bold: true, color: C.red } },
    { text: "Nurse turnover reversed its 3-quarter downward trend, rising 0.9pp to 14.6%. Voluntary exits account for 48% of separations, with exit interviews citing schedule inflexibility (62%) and limited growth paths (41%). Q2 mentorship and flexible scheduling pilots are critical.", options: { breakLine: true } },
    { text: "4. ", options: { bold: true, color: C.teal } },
    { text: "ED compliance (90% avg) is the weakest department across all 5 audit categories. Hand hygiene (88%) and fall protocol (87%) are the primary gaps. A dedicated compliance coach and weekly micro-audits are planned for Q2 to close to 93%+.", options: {} },
  ], { x: 0.75, y: narY + 0.34, w: 8.5, h: narH - 0.4, fontSize: 9, fontFace: F, color: C.darkText, margin: 0, paraSpaceAfter: 3, lineSpacingMultiple: 1.1 });

  // ══════════════════════════════════════════════
  // SLIDE 3 — FALL RATE (moved annotation far from gray line, fixed spacing)
  // ══════════════════════════════════════════════
  let s3 = pres.addSlide();
  s3.background = { color: C.offWhite };
  addFooter(s3, 3, "Source: Epic Falls Module  |  Benchmark: NDNQI 2025 National Database");
  addLabel(s3, "PATIENT SAFETY");
  addTitle(s3, "Fall rate dropped 18% to 2.1 per 1K patient-days, now 30% below NDNQI benchmark.");

  s3.addChart(pres.charts.LINE, [
    { name: "2025 Actual", labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      values: [3.10, 2.90, 3.20, 2.80, 2.70, 2.50, 2.90, 3.00, 2.60, 2.50, 2.60, 2.50] },
    { name: "2026 Q1", labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      values: [2.40, 2.10, 1.90, null, null, null, null, null, null, null, null, null] },
  ], {
    x: 0.5, y: BODY_Y, w: 6.0, h: CH,
    chartColors: [C.gray, C.teal], lineSize: 3, lineSmooth: true,
    showMarker: true, markerSize: 6,
    showValue: true, dataLabelFontSize: 7, dataLabelFontFace: F, dataLabelColor: C.darkText, dataLabelPosition: "t",
    dataLabelFormatCode: "0.00",
    catAxisLabelColor: C.dkGray, valAxisLabelColor: C.dkGray, catAxisLabelFontSize: 8, catAxisLabelFontFace: F, valAxisLabelFontSize: 8, valAxisLabelFontFace: F,
    valGridLine: { color: C.lightGray, size: 0.5 }, catGridLine: { style: "none" },
    showLegend: true, legendPos: "b", legendFontSize: 8, legendColor: C.dkGray, legendFontFace: F,
    chartArea: { fill: { color: C.white } },
    valAxisMaxVal: 3.5,
  });

  // Benchmark line — nudged down to align with 3.0 gridline
  s3.addShape(pres.shapes.LINE, { x: 0.9, y: BODY_Y + 0.68, w: 5.2, h: 0, line: { color: C.coral, width: 1.5, dashType: "dash" } });
  s3.addText("NDNQI Benchmark: 3.0", { x: 3.8, y: BODY_Y + 0.43, w: 2.5, h: 0.2, fontSize: 7, fontFace: F, color: C.coral, bold: true, margin: 0, align: "right" });

  const rX = 6.85, rW = 2.85, mod1H = 1.65, modGap = 0.15, mod2H = CH - mod1H - modGap;

  // Green module
  s3.addShape(pres.shapes.RECTANGLE, { x: rX, y: BODY_Y, w: rW, h: mod1H, fill: { color: C.white }, shadow: shadow() });
  s3.addShape(pres.shapes.RECTANGLE, { x: rX, y: BODY_Y, w: 0.06, h: mod1H, fill: { color: C.green } });
  s3.addText("Q1 2026 Average", { x: rX + 0.2, y: BODY_Y + 0.1, w: rW - 0.3, h: 0.2, fontSize: 9, fontFace: F, color: C.dkGray, margin: 0 });
  s3.addText("2.1", { x: rX + 0.2, y: BODY_Y + 0.35, w: rW - 0.3, h: 0.5, fontSize: 38, fontFace: F, color: C.darkText, bold: true, margin: 0 });
  s3.addText("per 1,000 patient-days", { x: rX + 0.2, y: BODY_Y + 0.9, w: rW - 0.3, h: 0.2, fontSize: 9, fontFace: F, color: C.dkGray, margin: 0 });
  s3.addText("▼ 18% vs Q4 2025 (2.6 avg)", { x: rX + 0.2, y: BODY_Y + 1.2, w: rW - 0.3, h: 0.25, fontSize: 9, fontFace: F, color: C.green, bold: true, margin: 0 });

  // Key Drivers — 8 concise bullet points to fill module
  const mod2Y = BODY_Y + mod1H + modGap;
  s3.addShape(pres.shapes.RECTANGLE, { x: rX, y: mod2Y, w: rW, h: mod2H, fill: { color: C.white }, shadow: shadow() });
  s3.addShape(pres.shapes.RECTANGLE, { x: rX, y: mod2Y, w: 0.06, h: mod2H, fill: { color: C.teal } });
  s3.addText("Key Drivers of Improvement", { x: rX + 0.2, y: mod2Y + 0.1, w: rW - 0.3, h: 0.28, fontSize: 12, fontFace: F, color: C.teal, bold: true, margin: 0 });
  s3.addText([
    { text: "•  Hourly rounding compliance: 72% → 91%", options: { breakLine: true } },
    { text: "•  High-risk fall screening in Med-Surg/Ortho", options: { breakLine: true } },
    { text: "•  Bed alarms standardized across all units", options: { breakLine: true } },
    { text: "•  Post-fall huddle protocol in ICU/Tele", options: { breakLine: true } },
    { text: "•  Night shift staffing ratio: 1:6 → 1:5", options: { breakLine: true } },
    { text: "•  Toileting assist protocol for 65+ patients", options: { breakLine: true } },
    { text: "•  Fall risk signage posted at every bedside", options: { breakLine: true } },
    { text: "•  Non-slip footwear provided at admission", options: {} },
  ], { x: rX + 0.18, y: mod2Y + 0.42, w: rW - 0.28, h: mod2H - 0.5, fontSize: 8, fontFace: F, color: C.darkText, margin: 0, paraSpaceAfter: 3, lineSpacingMultiple: 1.15 });

  // ══════════════════════════════════════════════
  // SLIDE 4 — MED ERRORS (fixed target line position)
  // ══════════════════════════════════════════════
  let s4 = pres.addSlide();
  s4.background = { color: C.offWhite };
  addFooter(s4, 4, "Source: Epic Medication Administration Records  |  BCMA scan rate: 94% → 97% during Q1");
  addLabel(s4, "MEDICATION SAFETY");
  addTitle(s4, "Med error rate fell 27% to 0.80% after barcode scanning enforcement.");

  s4.addChart(pres.charts.BAR, [
    { name: "Error Rate %", labels: ["Oct '25","Nov '25","Dec '25","Jan '26","Feb '26","Mar '26"],
      values: [1.20, 1.10, 1.10, 1.00, 0.80, 0.60] },
  ], {
    x: 0.5, y: BODY_Y, w: 5.8, h: CH, barDir: "col",
    chartColors: [C.teal],
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.darkText, dataLabelFontSize: 10, dataLabelFontFace: F,
    dataLabelFormatCode: "0.00",
    catAxisLabelColor: C.dkGray, valAxisLabelColor: C.dkGray, catAxisLabelFontSize: 9, catAxisLabelFontFace: F, valAxisLabelFontSize: 8, valAxisLabelFontFace: F,
    valGridLine: { color: C.lightGray, size: 0.5 }, catGridLine: { style: "none" },
    showLegend: false,
    chartArea: { fill: { color: C.white } },
    valAxisMaxVal: 1.4, valAxisMinVal: 0,
  });

  // Target line at 1.0 — calculate position: 1.0/1.4 of chart plot area
  // Plot area approx: top = BODY_Y + 0.15, bottom = BODY_Y + CH - 0.4
  const s4plotTop = BODY_Y + 0.15, s4plotBot = BODY_Y + CH - 0.4;
  const s4plotH = s4plotBot - s4plotTop;
  const s4targetY = s4plotBot - (1.0 / 1.4) * s4plotH;
  s4.addShape(pres.shapes.LINE, { x: 0.9, y: s4targetY, w: 5.0, h: 0, line: { color: C.coral, width: 1.5, dashType: "dash" } });
  s4.addText("── Target: < 1.00%", { x: 3.5, y: s4targetY - 0.25, w: 2.5, h: 0.2, fontSize: 7, fontFace: F, color: C.coral, bold: true, margin: 0, align: "right" });

  const m4x = 6.65, m4w = 3.1, m4h1 = 1.55, m4g = 0.15, m4h2 = CH - m4h1 - m4g;
  s4.addShape(pres.shapes.RECTANGLE, { x: m4x, y: BODY_Y, w: m4w, h: m4h1, fill: { color: C.white }, shadow: shadow() });
  s4.addShape(pres.shapes.RECTANGLE, { x: m4x, y: BODY_Y, w: 0.06, h: m4h1, fill: { color: C.green } });
  s4.addText("Q1 Average", { x: m4x + 0.2, y: BODY_Y + 0.08, w: m4w - 0.3, h: 0.2, fontSize: 9, fontFace: F, color: C.dkGray, margin: 0 });
  s4.addText("0.80%", { x: m4x + 0.2, y: BODY_Y + 0.25, w: m4w - 0.3, h: 0.55, fontSize: 36, fontFace: F, color: C.darkText, bold: true, margin: 0 });
  s4.addText("▼ 0.3pp vs Q4 2025 (1.13% avg)", { x: m4x + 0.2, y: BODY_Y + 0.8, w: m4w - 0.3, h: 0.25, fontSize: 9, fontFace: F, color: C.green, bold: true, margin: 0 });
  s4.addText("Below 1.00% target for 2 consecutive months", { x: m4x + 0.2, y: BODY_Y + 1.08, w: m4w - 0.3, h: 0.25, fontSize: 9, fontFace: F, color: C.dkGray, margin: 0 });

  const m4y2 = BODY_Y + m4h1 + m4g;
  s4.addShape(pres.shapes.RECTANGLE, { x: m4x, y: m4y2, w: m4w, h: m4h2, fill: { color: C.white }, shadow: shadow() });
  s4.addShape(pres.shapes.RECTANGLE, { x: m4x, y: m4y2, w: 0.06, h: m4h2, fill: { color: C.amber } });
  s4.addText("Error Type Distribution (Q1)", { x: m4x + 0.2, y: m4y2 + 0.1, w: m4w - 0.3, h: 0.25, fontSize: 10, fontFace: F, color: C.dkGray, bold: true, margin: 0 });
  const errs = [{n:"Wrong time",p:38,c:C.teal},{n:"Omission",p:27,c:C.tealLight},{n:"Wrong dose",p:19,c:C.amber},{n:"Documentation",p:16,c:C.gray}];
  for (let e = 0; e < errs.length; e++) {
    const ey = m4y2 + 0.5 + e * 0.5;
    s4.addText(errs[e].n, { x: m4x + 0.2, y: ey, w: 1.2, h: 0.3, fontSize: 9, fontFace: F, color: C.darkText, margin: 0, valign: "middle" });
    s4.addShape(pres.shapes.RECTANGLE, { x: m4x + 1.4, y: ey + 0.05, w: (errs[e].p / 38) * 1.2, h: 0.2, fill: { color: errs[e].c } });
    s4.addText(`${errs[e].p}%`, { x: m4x + 1.4 + (errs[e].p / 38) * 1.2 + 0.08, y: ey, w: 0.5, h: 0.3, fontSize: 9, fontFace: F, color: C.darkText, bold: true, margin: 0, valign: "middle" });
  }

  // ══════════════════════════════════════════════
  // SLIDE 5 — READMISSIONS (fixed target line, PIE chart on right)
  // ══════════════════════════════════════════════
  let s5 = pres.addSlide();
  s5.background = { color: C.offWhite };
  addFooter(s5, 5, "Source: Epic Readmission Tracker  |  CMS Hospital Readmissions Reduction Program benchmark");
  addLabel(s5, "PATIENT OUTCOMES");
  addTitle(s5, "Readmissions fell to 11.20% (4th straight quarterly decline); CHF persists at 18.40%.");

  s5.addChart(pres.charts.BAR, [
    { name: "Readmission %", labels: ["Q2 '25","Q3 '25","Q4 '25","Q1 '26"], values: [13.80, 13.10, 12.30, 11.20] },
  ], {
    x: 0.5, y: BODY_Y, w: 4.3, h: CH, barDir: "col",
    chartColors: [C.navy],
    showValue: true, dataLabelPosition: "inEnd", dataLabelColor: C.white, dataLabelFontSize: 11, dataLabelFontFace: F,
    dataLabelFormatCode: "0.00",
    catAxisLabelColor: C.dkGray, valAxisLabelColor: C.dkGray, catAxisLabelFontFace: F, valAxisLabelFontFace: F,
    catAxisLabelFontSize: 9, valAxisLabelFontSize: 8,
    valGridLine: { color: C.lightGray, size: 0.5 }, catGridLine: { style: "none" },
    showLegend: false,
    showTitle: true, title: "Quarterly Trend (All-Cause)", titleColor: C.dkGray, titleFontSize: 9, titleFontFace: F,
    chartArea: { fill: { color: C.white } },
    valAxisMaxVal: 16, valAxisMinVal: 0,
  });

  // CMS target at 12.0 — calculate position
  const s5plotTop = BODY_Y + 0.45, s5plotBot = BODY_Y + CH - 0.4;
  const s5plotH = s5plotBot - s5plotTop;
  const s5targetY = s5plotBot - (12.0 / 16.0) * s5plotH;
  s5.addShape(pres.shapes.LINE, { x: 0.9, y: s5targetY, w: 3.5, h: 0, line: { color: C.coral, width: 1.5, dashType: "dash" } });
  s5.addText("── CMS Target: 12.00%", { x: 0.9, y: s5targetY + 0.05, w: 2.5, h: 0.2, fontSize: 7, fontFace: F, color: C.coral, bold: true, margin: 0 });

  // PIE chart instead of bar chart
  s5.addChart(pres.charts.PIE, [
    { name: "Readmission by Diagnosis", labels: ["CHF","Pneumonia","COPD","Sepsis","Hip/Knee"], values: [18.40, 14.20, 12.10, 10.80, 7.30] },
  ], {
    x: 5.1, y: BODY_Y, w: 4.6, h: CH,
    chartColors: [C.coral, C.amber, C.teal, C.tealLight, C.lightGray],
    showPercent: true, dataLabelFontSize: 9, dataLabelColor: C.darkText, dataLabelFontFace: F,
    showLegend: true, legendPos: "b", legendFontSize: 8, legendColor: C.dkGray, legendFontFace: F,
    showTitle: true, title: "By Primary Diagnosis (Q1 2026)", titleColor: C.dkGray, titleFontSize: 9, titleFontFace: F,
    chartArea: { fill: { color: C.white } },
  });

  // ══════════════════════════════════════════════
  // SLIDE 6 — TURNOVER (labels above markers, expanded risk signal)
  // ══════════════════════════════════════════════
  let s6 = pres.addSlide();
  s6.background = { color: C.offWhite };
  addFooter(s6, 6, "Source: Kronos Workforce Analytics, Exit Interview Database  |  NSI benchmark: 18.4%");
  addLabel(s6, "WORKFORCE");
  addTitle(s6, "Turnover rose 0.9pp to 14.60% as voluntary exits (48% of separations) outpaced hires.");

  s6.addChart(pres.charts.LINE, [
    { name: "Turnover %", labels: ["Q2 '25","Q3 '25","Q4 '25","Q1 '26"], values: [16.20, 15.10, 13.70, 14.60] },
    { name: "Vacancy %", labels: ["Q2 '25","Q3 '25","Q4 '25","Q1 '26"], values: [8.50, 7.20, 6.10, 6.80] },
  ], {
    x: 0.5, y: BODY_Y, w: 5.3, h: CH,
    chartColors: [C.red, C.amber], lineSize: 3, lineSmooth: true,
    showMarker: true, markerSize: 7,
    showValue: true, dataLabelPosition: "t", dataLabelFontSize: 8, dataLabelFontFace: F,
    dataLabelFormatCode: "0.00",
    catAxisLabelColor: C.dkGray, valAxisLabelColor: C.dkGray, catAxisLabelFontFace: F, valAxisLabelFontFace: F,
    catAxisLabelFontSize: 9, valAxisLabelFontSize: 8,
    valGridLine: { color: C.lightGray, size: 0.5 }, catGridLine: { style: "none" },
    showLegend: true, legendPos: "b", legendFontSize: 8, legendColor: C.dkGray, legendFontFace: F,
    showTitle: true, title: "Turnover & Vacancy Rate Trend", titleColor: C.dkGray, titleFontSize: 9, titleFontFace: F,
    chartArea: { fill: { color: C.white } },
    valAxisMaxVal: 18, valAxisMinVal: 0,
  });

  // Target at 13% — calculated from axis bounds
  const s6plotTop = BODY_Y + 0.45, s6plotBot = BODY_Y + CH - 0.4, s6plotH = s6plotBot - s6plotTop;
  const s6targetY = s6plotBot - (13.0 / 18.0) * s6plotH;
  s6.addShape(pres.shapes.LINE, { x: 0.9, y: s6targetY, w: 4.5, h: 0, line: { color: C.darkText, width: 1, dashType: "dash" } });
  s6.addText("Target: 13.00%", { x: 0.9, y: s6targetY - 0.25, w: 1.8, h: 0.2, fontSize: 7, fontFace: F, color: C.darkText, bold: true, margin: 0 });

  const s6rH1 = 2.6, s6g = 0.15, s6rH2 = CH - s6rH1 - s6g;
  s6.addChart(pres.charts.DOUGHNUT, [
    { name: "Reasons", labels: ["Voluntary","Retirement","Internal Xfer","Termination"], values: [48, 22, 18, 12] },
  ], {
    x: 6.1, y: BODY_Y, w: 3.6, h: s6rH1,
    chartColors: [C.red, C.tealLight, C.mint, C.lightGray],
    showPercent: true, dataLabelFontSize: 9, dataLabelColor: C.darkText, dataLabelFontFace: F,
    showLegend: true, legendPos: "b", legendFontSize: 7, legendColor: C.dkGray, legendFontFace: F,
    showTitle: true, title: "Separation Reasons (Q1)", titleColor: C.dkGray, titleFontSize: 9, titleFontFace: F,
    chartArea: { fill: { color: C.white } },
  });

  // Risk Signal — EXPANDED with bullet points to fill space
  const s6ry = BODY_Y + s6rH1 + s6g;
  s6.addShape(pres.shapes.RECTANGLE, { x: 6.1, y: s6ry, w: 3.6, h: s6rH2, fill: { color: C.white }, shadow: shadow() });
  s6.addShape(pres.shapes.RECTANGLE, { x: 6.1, y: s6ry, w: 0.06, h: s6rH2, fill: { color: C.red } });
  s6.addText("Risk Signal", { x: 6.3, y: s6ry + 0.08, w: 3.3, h: 0.22, fontSize: 10, fontFace: F, color: C.red, bold: true, margin: 0 });
  s6.addText([
    { text: "•  Schedule inflexibility cited by 62% of voluntary exits", options: { breakLine: true } },
    { text: "•  Limited growth paths cited by 41% of voluntary exits", options: { breakLine: true } },
    { text: "•  Night shift and weekend turnover 2.3x higher than day shift", options: { breakLine: true } },
    { text: "•  New grad retention at 6 months dropped from 88% to 79%", options: { breakLine: true } },
    { text: "•  Travel nurse dependency increased 15% QoQ ($320K cost)", options: {} },
  ], { x: 6.28, y: s6ry + 0.32, w: 3.32, h: s6rH2 - 0.4, fontSize: 8, fontFace: F, color: C.darkText, margin: 0, paraSpaceAfter: 3, lineSpacingMultiple: 1.15 });

  // ══════════════════════════════════════════════
  // SLIDES 7-10 (unchanged from v6)
  // ══════════════════════════════════════════════

  // SLIDE 7
  let s7 = pres.addSlide();
  s7.background = { color: C.offWhite };
  addFooter(s7, 7, "Source: QA Audit Records  |  Scores = avg across 5 compliance categories per department");
  addLabel(s7, "REGULATORY COMPLIANCE");
  addTitle(s7, "All departments improved compliance QoQ; ED remains the only unit below 90% target.");
  s7.addChart(pres.charts.BAR, [
    { name: "Q4 2025", labels: ["Med-Surg","ICU","L&D","ED","Telemetry","Ortho"], values: [90, 88, 95, 85, 91, 89] },
    { name: "Q1 2026", labels: ["Med-Surg","ICU","L&D","ED","Telemetry","Ortho"], values: [93, 94, 97, 90, 95, 92] },
  ], {
    x: 0.5, y: BODY_Y, w: 9, h: CH, barDir: "col", chartColors: [C.lightGray, C.teal],
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.darkText, dataLabelFontSize: 9, dataLabelFontFace: F,
    catAxisLabelColor: C.dkGray, valAxisLabelColor: C.dkGray, catAxisLabelFontSize: 10, catAxisLabelFontFace: F, valAxisLabelFontSize: 8, valAxisLabelFontFace: F,
    valGridLine: { color: C.lightGray, size: 0.5 }, catGridLine: { style: "none" },
    showLegend: true, legendPos: "b", legendFontSize: 8, legendColor: C.dkGray, legendFontFace: F,
    chartArea: { fill: { color: C.white } }, valAxisMinVal: 75, valAxisMaxVal: 100,
  });
  // Target at 90% — adjusted plot area estimates for accuracy
  const s7plotTop = BODY_Y + 0.1, s7plotBot = BODY_Y + CH - 0.55, s7plotH = s7plotBot - s7plotTop;
  const s7targetY = s7plotBot - ((90 - 75) / (100 - 75)) * s7plotH;
  s7.addShape(pres.shapes.LINE, { x: 0.9, y: s7targetY, w: 8.2, h: 0, line: { color: C.coral, width: 1.5, dashType: "dash" } });
  s7.addText("Org Target: 90%", { x: 0.9, y: s7targetY + 0.05, w: 2, h: 0.2, fontSize: 7, fontFace: F, color: C.coral, bold: true, margin: 0 });

  // SLIDE 8
  let s8 = pres.addSlide();
  s8.background = { color: C.offWhite };
  addFooter(s8, 8, "Source: QA Audit Records  |  Monthly random sampling, n=50+ per category per dept");
  addLabel(s8, "COMPLIANCE DETAIL");
  addTitle(s8, "ED hand hygiene (88%) and fall protocol (87%) are the key compliance gaps for Q2.");
  function cC(v){return v>=95?C.green:v>=90?C.tealLight:v>=85?C.amber:C.red}function cB(v){return v>=95?"E6F5EE":v>=90?"E0F4F4":v>=85?"FFF3DC":"FCE4E4"}
  const cd=[["","Med-Surg","ICU","L&D","ED","Telemetry","Ortho"],["Hand Hygiene",96,98,99,88,94,95],["Fall Protocol",91,95,97,87,93,90],["Med Reconciliation",94,92,96,91,96,93],["Documentation",90,93,98,93,97,91],["Infection Control",93,96,97,90,94,89]];
  let tR=[];tR.push(cd[0].map(h=>({text:h,options:{fill:{color:C.navy},color:C.white,bold:true,fontSize:9,fontFace:F,align:"center",valign:"middle"}})));
  for(let r=1;r<cd.length;r++){let row=[{text:cd[r][0],options:{fill:{color:C.white},color:C.darkText,bold:true,fontSize:9,fontFace:F,valign:"middle"}}];for(let c=1;c<cd[r].length;c++){const v=cd[r][c];row.push({text:`${v}%`,options:{fill:{color:cB(v)},color:cC(v),bold:true,fontSize:10,fontFace:F,align:"center",valign:"middle"}})}tR.push(row)}
  s8.addTable(tR,{x:0.5,y:BODY_Y+0.1,w:9,h:2.7,colW:[1.8,1.2,1.2,1.2,1.2,1.2,1.2],rowH:[0.4,0.44,0.44,0.44,0.44,0.44],border:{pt:0.5,color:C.lightGray},margin:[0.05,0.1,0.05,0.1],fontFace:F});
  // Legend — centered with right shift to account for box+text visual weight
  const legItems = [{l:"≥ 95%  Exceeds",b:"E6F5EE"},{l:"90–94%  Meets",b:"E0F4F4"},{l:"85–89%  Caution",b:"FFF3DC"},{l:"< 85%  Below",b:"FCE4E4"}];
  const legItemW = 2.15, legTotalW = 4 * legItemW, legStartX = (10 - legTotalW) / 2 + 0.15;
  legItems.forEach((lg,i)=>{const lx=legStartX+i*legItemW;s8.addShape(pres.shapes.RECTANGLE,{x:lx,y:BODY_Y+3.0,w:0.2,h:0.2,fill:{color:lg.b},line:{color:C.lightGray,width:0.5}});s8.addText(lg.l,{x:lx+0.25,y:BODY_Y+3.0,w:1.7,h:0.2,fontSize:8,fontFace:F,color:C.dkGray,valign:"middle",margin:0})});
  s8.addShape(pres.shapes.RECTANGLE,{x:0.5,y:BODY_Y+3.5,w:9,h:0.6,fill:{color:C.white},shadow:shadow()});
  s8.addShape(pres.shapes.RECTANGLE,{x:0.5,y:BODY_Y+3.5,w:0.06,h:0.6,fill:{color:C.amber}});
  s8.addText("Insight: ",{x:0.7,y:BODY_Y+3.5,w:0.55,h:0.6,fontSize:10,fontFace:F,color:C.amber,bold:true,margin:0,valign:"middle"});
  s8.addText("L&D leads in 4 of 5 categories (avg 97.4%). ED trails in all 5. Ortho infection control (89%) is an emerging watch item.",{x:1.2,y:BODY_Y+3.5,w:8,h:0.6,fontSize:10,fontFace:F,color:C.darkText,margin:0,valign:"middle"});

  // SLIDE 9
  let s9 = pres.addSlide();s9.background={color:C.offWhite};
  addFooter(s9,9,"All targets approved by CNO  |  Progress reported at monthly Nursing Quality Committee");
  addLabel(s9,"Q2 2026 ACTION PLAN");addTitle(s9,"Four Q2 priorities with quantified targets, named owners, and June deadlines.");
  s9.addText("TARGET",{x:6.5,y:BODY_Y-0.05,w:1,h:0.18,fontSize:7,fontFace:F,color:C.dkGray,bold:true,align:"center",margin:0});
  s9.addText("OWNER",{x:7.6,y:BODY_Y-0.05,w:1.05,h:0.18,fontSize:7,fontFace:F,color:C.dkGray,bold:true,align:"center",margin:0});
  s9.addText("TIMING",{x:8.7,y:BODY_Y-0.05,w:0.7,h:0.18,fontSize:7,fontFace:F,color:C.dkGray,bold:true,align:"center",margin:0});
  const pri=[{t:"Reduce Nurse Turnover",tgt:"≤ 12%",own:"CNO / HR",wn:"Apr–Jun",d:"Launch mentorship program, pilot flexible scheduling in Med-Surg and ICU, analyze exit interview",ic:FaUsers,cl:C.red},{t:"Close ED Compliance Gap",tgt:"≥ 93%",own:"ED Nurse Mgr",wn:"Apr–Jun",d:"Assign dedicated compliance coach, implement weekly micro-audits, deploy real-time dashboard",ic:FaClipboardCheck,cl:C.amber},{t:"Sustain Fall Rate Below Benchmark",tgt:"< 1.80",own:"Patient Safety",wn:"Ongoing",d:"Extend bed alarms to ED, enforce hourly rounding via EHR tracking, high-risk screening to all units",ic:FaExclamationTriangle,cl:C.green},{t:"Drive Med Errors Below 0.50%",tgt:"< 0.50%",own:"Pharmacy / Nsg",wn:"May–Jun",d:"Raise BCMA scan compliance to 98%, integrate smart pump alerts, launch near-miss reporting",ic:FaPills,cl:C.tealLight}];
  for(let i=0;i<pri.length;i++){const p=pri[i],cy=BODY_Y+0.15+i*1.0;
  s9.addShape(pres.shapes.RECTANGLE,{x:0.5,y:cy,w:9,h:0.9,fill:{color:C.white},shadow:shadow()});
  s9.addShape(pres.shapes.RECTANGLE,{x:0.5,y:cy,w:0.06,h:0.9,fill:{color:p.cl}});
  const ico=await iconPng(p.ic,`#${p.cl}`,256);s9.addImage({data:ico,x:0.72,y:cy+0.25,w:0.4,h:0.4});
  s9.addText(p.t,{x:1.25,y:cy+0.13,w:4.5,h:0.3,fontSize:13,fontFace:F,color:C.darkText,bold:true,margin:0,valign:"middle"});
  s9.addText(p.d,{x:1.25,y:cy+0.45,w:5,h:0.35,fontSize:9,fontFace:F,color:C.dkGray,margin:0,valign:"middle"});
  s9.addShape(pres.shapes.RECTANGLE,{x:6.5,y:cy+0.275,w:1,h:0.35,fill:{color:p.cl,transparency:85}});
  s9.addText(p.tgt,{x:6.5,y:cy+0.275,w:1,h:0.35,fontSize:11,fontFace:F,color:p.cl,bold:true,align:"center",valign:"middle",margin:0});
  s9.addText(p.own,{x:7.6,y:cy+0.275,w:1.05,h:0.35,fontSize:9,fontFace:F,color:C.darkText,bold:true,align:"center",valign:"middle",margin:0});
  s9.addText(p.wn,{x:8.7,y:cy+0.275,w:0.7,h:0.35,fontSize:9,fontFace:F,color:C.dkGray,align:"center",valign:"middle",margin:0})}

  // SLIDE 10
  let s10=pres.addSlide();s10.background={color:C.navy};
  s10.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:0.12,h:5.625,fill:{color:C.teal}});
  s10.addText("NEXT STEPS & DECISION POINTS",{x:TX,y:LBL_Y,w:TW,h:0.18,fontSize:9,fontFace:F,color:C.tealLight,charSpacing:3,bold:true,margin:0});
  s10.addText("Three decisions needed from the Director of Nursing to execute the Q2 plan.",{x:TX,y:TY,w:TW,h:TH,fontSize:14,fontFace:F,color:C.white,bold:true,margin:0,valign:"middle"});
  const asks=[{n:"1",t:"Approve Flexible Scheduling Pilot",d:"Med-Surg and ICU, 90-day trial starting May 1. Modified shift differentials. Cost: $45K; projected value: $180K.",dl:"Decision by: April 25"},{n:"2",t:"Fund Dedicated ED Compliance Coach",d:"0.5 FTE reallocation from float pool for 6 months. Weekly micro-audits and dashboard. ROI: $120K in avoided findings.",dl:"Decision by: April 30"},{n:"3",t:"Endorse CHF Readmission Taskforce",d:"Cross-functional team to redesign CHF discharge protocol. Target: reduce from 18.40% to <14.00% by Q4 2026.",dl:"Decision by: May 15"}];
  for(let a=0;a<asks.length;a++){const ay=BODY_Y+0.2+a*1.3;
  s10.addShape(pres.shapes.RECTANGLE,{x:0.5,y:ay,w:9,h:1.1,fill:{color:C.white,transparency:92}});
  s10.addShape(pres.shapes.RECTANGLE,{x:0.5,y:ay,w:0.06,h:1.1,fill:{color:C.tealLight}});
  s10.addShape(pres.shapes.OVAL,{x:0.7,y:ay+0.3,w:0.5,h:0.5,fill:{color:C.teal}});
  s10.addText(asks[a].n,{x:0.7,y:ay+0.3,w:0.5,h:0.5,fontSize:18,fontFace:F,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
  s10.addText(asks[a].t,{x:1.4,y:ay+0.18,w:5.5,h:0.3,fontSize:14,fontFace:F,color:C.white,bold:true,margin:0,valign:"middle"});
  s10.addText(asks[a].d,{x:1.4,y:ay+0.5,w:6,h:0.45,fontSize:9,fontFace:F,color:C.mint,margin:0,valign:"middle",lineSpacingMultiple:1.15});
  s10.addShape(pres.shapes.RECTANGLE,{x:7.8,y:ay+0.41,w:1.55,h:0.28,fill:{color:C.teal}});
  s10.addText(asks[a].dl,{x:7.8,y:ay+0.41,w:1.55,h:0.28,fontSize:8,fontFace:F,color:C.white,bold:true,align:"center",valign:"middle",margin:0})}
  s10.addShape(pres.shapes.RECTANGLE,{x:0.5,y:5.0,w:9,h:0.02,fill:{color:C.teal,transparency:50}});
  s10.addText("Data: Epic EHR, Kronos, NHSN, QA Audit Records  |  Jan 1 – Mar 31, 2026  |  Next review: July 2026",{x:0.5,y:5.05,w:9,h:0.18,fontSize:8,fontFace:F,color:C.gray,margin:0});
  s10.addImage({data:logoBig,x:0.5,y:5.3,w:1.8,h:0.22});

  await pres.writeFile({ fileName: "/home/assets/Q1_2026_Nursing_Performance_Review.pptx" });
  console.log("Done.");
}
buildDeck().catch(e => { console.error(e); process.exit(1); });
