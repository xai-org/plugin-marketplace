const pptxgen = require("pptxgenjs");
const React = require("react");
const RDS = require("react-dom/server");
const sharp = require("sharp");

// ── Helpers ──────────────────────────────────────────────────────────────────
async function ico(IC, c) {
  const s = RDS.renderToStaticMarkup(React.createElement(IC, { color: c, size: "256" }));
  return "image/png;base64," + (await sharp(Buffer.from(s)).png().toBuffer()).toString("base64");
}

const C = { hd: "4A3F47", ro: "D4879C", rd: "C47A8A", bg: "EDE6E3", ow: "FDF9F8", ch: "404040", mv: "A0939A", lv: "B8A9C4", gn: "8FB8A0", gd: "CFAD8F", wh: "FFFFFF" };

function ft(s, n, p) {
  s.addShape(p.shapes.LINE, { x: .5, y: 5.15, w: 9, h: 0, line: { color: C.mv, width: .5 } });
  s.addText("Sunshine Homes, Vagator  |  Q1 2026 Financial Report  |  Confidential", { x: .5, y: 5.22, w: 7.5, h: .25, fontSize: 7, color: C.mv, fontFace: "Calibri" });
  s.addText(String(n), { x: 9, y: 5.22, w: .5, h: .25, fontSize: 7, color: C.mv, fontFace: "Calibri", align: "right" });
}

function sh(s, t, n, p, iconData) {
  s.addShape(p.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.05, fill: { color: C.hd } });
  s.addShape(p.shapes.LINE, { x: 0, y: 1.05, w: 10, h: 0, line: { color: C.ro, width: 2.5 } });
  if (iconData) {
    s.addShape(p.shapes.OVAL, { x: .4, y: .15, w: .7, h: .7, fill: { color: C.ro } });
    s.addImage({ data: iconData, x: .52, y: .27, w: .46, h: .46 });
    s.addText(t, { x: 1.3, y: .12, w: 8.2, h: .82, fontSize: 24, fontFace: "Georgia", bold: true, color: C.wh, valign: "middle", margin: 0 });
  } else {
    s.addText(t, { x: .5, y: .12, w: 9, h: .82, fontSize: 24, fontFace: "Georgia", bold: true, color: C.wh, valign: "middle", margin: 0 });
  }
  ft(s, n, p);
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const { FaHome, FaClipboardList, FaBed, FaCheckSquare, FaMoneyBillWave, FaFileInvoiceDollar, FaChartLine, FaHandHoldingUsd, FaWrench, FaUsers, FaExclamationTriangle, FaLightbulb, FaBullseye } = require("react-icons/fa");

  const p = new pptxgen();
  p.layout = "LAYOUT_16x9";
  const W = "#FFFFFF";
  const iconH = await ico(FaHome, W);
  const ic = {
    s2: await ico(FaClipboardList, W), s3: await ico(FaHome, W), s4: await ico(FaBed, W),
    s5: await ico(FaCheckSquare, W), s6: await ico(FaMoneyBillWave, W), s7: await ico(FaFileInvoiceDollar, W),
    s8: await ico(FaChartLine, W), s9: await ico(FaHandHoldingUsd, W), s10: await ico(FaWrench, W),
    s11: await ico(FaUsers, W), s12: await ico(FaExclamationTriangle, W), s13: await ico(FaLightbulb, W),
    s14: await ico(FaBullseye, W)
  };

  // ── S1 — Title ─────────────────────────────────────────────────────────────
  let s1 = p.addSlide();
  s1.addShape(p.shapes.RECTANGLE, { x: 0, y: 0, w: 4, h: 5.625, fill: { color: C.ro } });
  s1.addShape(p.shapes.RECTANGLE, { x: 4, y: 0, w: 6, h: 5.625, fill: { color: C.ow } });
  s1.addImage({ data: iconH, x: .6, y: .8, w: .6, h: .6 });
  s1.addText("Q1 2026", { x: .6, y: 1.7, w: 3, h: .4, fontSize: 14, fontFace: "Calibri", color: C.wh, margin: 0, charSpacing: 3 });
  s1.addText([{ text: "Quarterly", options: { breakLine: true } }, { text: "Financial", options: { breakLine: true } }, { text: "Report" }], { x: .6, y: 2.3, w: 3, h: 2, fontSize: 30, fontFace: "Georgia", bold: true, color: C.wh, margin: 0 });
  s1.addText("Sunshine Homes", { x: 4.8, y: 1.5, w: 4.5, h: .8, fontSize: 36, fontFace: "Georgia", bold: true, color: C.hd, margin: 0 });
  s1.addShape(p.shapes.LINE, { x: 4.8, y: 2.35, w: 1.5, h: 0, line: { color: C.hd, width: 2 } });
  s1.addText("6 Studio Rooms  |  Vagator, Goa", { x: 4.8, y: 2.6, w: 4.5, h: .35, fontSize: 12, fontFace: "Calibri", color: C.mv, margin: 0 });
  s1.addText("Airbnb  |  Superhost  |  1-Month Lease", { x: 4.8, y: 2.95, w: 4.5, h: .35, fontSize: 12, fontFace: "Calibri", color: C.mv, margin: 0 });
  s1.addText("Confidential  |  April 2026", { x: 4.8, y: 4.5, w: 4.5, h: .3, fontSize: 10, fontFace: "Calibri", italic: true, color: C.mv, margin: 0 });

  // ── S2 — Executive Summary ─────────────────────────────────────────────────
  let s2 = p.addSlide(); s2.background = { color: C.ow }; sh(s2, "Executive Summary", 2, p, ic.s2);
  [{ v: "\u20B93.75L", l: "Total Revenue", s: "First Quarter" }, { v: "94.4%", l: "Occupancy Rate", s: "17/18 unit-months" }, { v: "\u20B920,000", l: "Monthly Rent", s: "Per unit/month" }, { v: "\u20B92.58L", l: "NOI", s: "68.8% margin" }].forEach((m, i) => { const x = .7 + i * 2.3; s2.addText(m.v, { x, y: 1.4, w: 1.8, h: .55, fontSize: 26, fontFace: "Georgia", bold: true, color: C.ro, align: "center", margin: 0 }); s2.addText(m.l, { x, y: 1.95, w: 1.8, h: .22, fontSize: 10, fontFace: "Calibri", bold: true, color: C.ch, align: "center", margin: 0 }); s2.addText(m.s, { x, y: 2.15, w: 1.8, h: .18, fontSize: 10, fontFace: "Calibri", color: C.mv, align: "center", margin: 0 }); });
  s2.addShape(p.shapes.LINE, { x: .7, y: 2.55, w: 8.6, h: 0, line: { color: C.bg, width: 1 } });
  [{ v: "\u20B91.17L", l: "OpEx", s: "31.2% of revenue", c: C.rd }, { v: "\u20B940,000", l: "CapEx Invested", s: "All completed", c: C.gd }, { v: "\u20B920,000", l: "Vacancy Loss", s: "1 unit \u00D7 1 month", c: C.rd }, { v: "\u20B92.18L", l: "Net to Owner", s: "After OpEx + CapEx", c: C.gn }].forEach((m, i) => { const x = .7 + i * 2.3; s2.addText(m.v, { x, y: 2.8, w: 1.8, h: .55, fontSize: 26, fontFace: "Georgia", bold: true, color: m.c, align: "center", margin: 0 }); s2.addText(m.l, { x, y: 3.35, w: 1.8, h: .22, fontSize: 10, fontFace: "Calibri", bold: true, color: C.ch, align: "center", margin: 0 }); s2.addText(m.s, { x, y: 3.55, w: 1.8, h: .18, fontSize: 10, fontFace: "Calibri", color: C.mv, align: "center", margin: 0 }); });
  s2.addShape(p.shapes.RECTANGLE, { x: .5, y: 4.05, w: 9, h: .65, fill: { color: C.ro } });
  s2.addText("KEY Q2 FOCUS", { x: .7, y: 4.08, w: 1.8, h: .28, fontSize: 10, fontFace: "Calibri", bold: true, color: C.wh, margin: 0, charSpacing: 1 });
  s2.addText("Diversify distribution channels (Booking.com, MakeMyTrip) and prepare monsoon long-stay packages to protect Q3 revenue.", { x: .7, y: 4.32, w: 8.6, h: .3, fontSize: 10, fontFace: "Calibri", color: C.wh, margin: 0 });

  // ── S3 — Portfolio Overview ────────────────────────────────────────────────
  let s3 = p.addSlide(); s3.background = { color: C.ow }; sh(s3, "Portfolio Overview", 3, p, ic.s3);
  s3.addText("Sunshine Homes", { x: .5, y: 1.7, w: 5, h: .45, fontSize: 22, fontFace: "Georgia", bold: true, color: C.hd, margin: 0 });
  s3.addText("Vagator, Goa  |  Vacation Rental  |  Airbnb  |  1-Month Lease  |  Since Jan 2026", { x: .5, y: 2.18, w: 9, h: .22, fontSize: 10, fontFace: "Calibri", color: C.mv, margin: 0 });
  s3.addShape(p.shapes.LINE, { x: .5, y: 2.55, w: 9, h: 0, line: { color: C.bg, width: 1 } });
  [{ v: "6", l: "Studio Rooms", sub: "5 Standard + 1 Family" }, { v: "\u20B920,000", l: "Monthly Rent", sub: "Per unit, fixed rate" }, { v: "Superhost \u2605", l: "Airbnb Status", sub: "Since January 2026" }].forEach((s, i) => { const x = .5 + i * 3.1;
    s3.addText(s.v, { x, y: 2.75, w: 2.8, h: .55, fontSize: 28, fontFace: "Georgia", bold: true, color: i === 2 ? C.gd : C.ro, margin: 0 });
    s3.addText(s.l, { x, y: 3.3, w: 2.8, h: .22, fontSize: 10, fontFace: "Calibri", bold: true, color: C.ch, margin: 0 });
    s3.addText(s.sub, { x, y: 3.5, w: 2.8, h: .2, fontSize: 10, fontFace: "Calibri", color: C.mv, margin: 0 });
  });
  s3.addShape(p.shapes.LINE, { x: .5, y: 3.9, w: 9, h: 0, line: { color: C.bg, width: 1 } });
  s3.addText("Amenities:  Wi-Fi  \u2022  AC  \u2022  Kitchen  \u2022  Parking", { x: .5, y: 4.05, w: 9, h: .22, fontSize: 10, fontFace: "Calibri", color: C.ch, margin: 0 });
  s3.addText("Unit Mix:  Studio 1\u20135 (Standard)  |  Studio 6 (Family)  |  Total monthly potential: \u20B91,20,000", { x: .5, y: 4.32, w: 9, h: .22, fontSize: 10, fontFace: "Calibri", color: C.mv, margin: 0 });

  // ── S4 — Occupancy & Leasing Performance ───────────────────────────────────
  let s4 = p.addSlide(); s4.background = { color: C.ow }; sh(s4, "Occupancy & Leasing Performance", 4, p, ic.s4);
  s4.addText("94.4%", { x: .5, y: 1.3, w: 4.5, h: .65, fontSize: 48, fontFace: "Georgia", bold: true, color: C.ro, margin: 0 });
  s4.addText("Q1 Average Occupancy  |  17 of 18 unit-months filled", { x: .5, y: 1.95, w: 4.5, h: .2, fontSize: 10, fontFace: "Calibri", color: C.ch, margin: 0 });
  s4.addShape(p.shapes.LINE, { x: .5, y: 2.3, w: 4.5, h: 0, line: { color: C.bg, width: .5 } });
  [{ v: "1", l: "Vacant unit-month", sub: "Studio 4, February only", c: C.rd }, { v: "1 Mo", l: "Standard lease duration", sub: "All tenants on 1-month fixed term", c: C.hd }, { v: "18", l: "Total unit-months available", sub: "6 units \u00D7 3 months", c: C.gn }, { v: "\u20B920K", l: "Vacancy cost", sub: "Lost revenue from Studio 4 vacancy", c: C.rd }].forEach((m, i) => { const y = 2.5 + i * .55;
    s4.addShape(p.shapes.RECTANGLE, { x: .5, y, w: .06, h: .42, fill: { color: m.c } });
    s4.addText(m.v, { x: .7, y, w: .8, h: .22, fontSize: 14, fontFace: "Georgia", bold: true, color: m.c, margin: 0 });
    s4.addText(m.l, { x: 1.55, y, w: 3, h: .2, fontSize: 10, fontFace: "Calibri", bold: true, color: C.ch, margin: 0 });
    s4.addText(m.sub, { x: 1.55, y: y + .2, w: 3, h: .18, fontSize: 10, fontFace: "Calibri", color: C.mv, margin: 0 });
  });
  s4.addShape(p.shapes.LINE, { x: 5.2, y: 1.3, w: 0, h: 3.5, line: { color: C.bg, width: .5 } });
  s4.addText("Monthly Occupancy", { x: 5.5, y: 1.3, w: 4, h: .28, fontSize: 12, fontFace: "Georgia", bold: true, color: C.ro, margin: 0 });
  [{ m: "January", v: "100%", pct: 1, d: "6/6 occupied", c: C.gn }, { m: "February", v: "83.3%", pct: .833, d: "5/6 \u2014 Studio 4 vacant", c: C.rd }, { m: "March", v: "100%", pct: 1, d: "6/6 occupied", c: C.gn }].forEach((m, i) => { const y = 1.85 + i * .8;
    s4.addText(m.m, { x: 5.5, y, w: 1.5, h: .2, fontSize: 10, fontFace: "Calibri", bold: true, color: C.ch, margin: 0 });
    s4.addText(m.v, { x: 8, y, w: 1.5, h: .2, fontSize: 10, fontFace: "Georgia", bold: true, color: m.c, align: "right", margin: 0 });
    s4.addShape(p.shapes.RECTANGLE, { x: 5.5, y: y + .25, w: 4, h: .2, fill: { color: C.bg } });
    s4.addShape(p.shapes.RECTANGLE, { x: 5.5, y: y + .25, w: 4 * m.pct, h: .2, fill: { color: m.c } });
    s4.addText(m.d, { x: 5.5, y: y + .48, w: 4, h: .16, fontSize: 10, fontFace: "Calibri", color: C.mv, margin: 0 });
  });
  s4.addText("Studio 4 was re-leased immediately in March, confirming strong local demand.", { x: 5.5, y: 4.35, w: 4, h: .25, fontSize: 10, fontFace: "Calibri", italic: true, color: C.hd, margin: 0 });

  // ── S5 — Occupancy Heatmap by Unit ─────────────────────────────────────────
  let s5 = p.addSlide(); s5.background = { color: C.ow }; sh(s5, "Occupancy Heatmap by Unit", 5, p, ic.s5);
  const h5 = t => ({ text: t, options: { bold: true, color: C.hd, fontSize: 12, fontFace: "Calibri", align: "center", valign: "middle" } });
  const c5 = t => ({ text: t, options: { fontSize: 13, fontFace: "Calibri", align: "center", color: C.gn, valign: "middle", bold: true } });
  const v5 = t => ({ text: t, options: { fontSize: 13, fontFace: "Calibri", align: "center", color: C.rd, bold: true, valign: "middle" } });
  const p5 = (t, f) => ({ text: t, options: { fontSize: 12, fontFace: "Calibri", align: "center", color: f ? C.gn : C.rd, bold: true, valign: "middle" } });
  const u5 = t => ({ text: t, options: { fontSize: 12, fontFace: "Calibri", bold: true, color: C.ch, valign: "middle" } });
  const n5 = t => ({ text: t, options: { fontSize: 11, fontFace: "Calibri", color: C.ch, align: "center", valign: "middle" } });
  s5.addTable([[h5("Unit"), h5("Type"), h5("Jan"), h5("Feb"), h5("Mar"), h5("Q1")], [u5("Studio 1"), n5("Standard"), c5("\u2713"), c5("\u2713"), c5("\u2713"), p5("100%", 1)], [u5("Studio 2"), n5("Standard"), c5("\u2713"), c5("\u2713"), c5("\u2713"), p5("100%", 1)], [u5("Studio 3"), n5("Standard"), c5("\u2713"), c5("\u2713"), c5("\u2713"), p5("100%", 1)], [u5("Studio 4"), n5("Standard"), c5("\u2713"), v5("\u2717"), c5("\u2713"), p5("67%", 0)], [u5("Studio 5"), n5("Standard"), c5("\u2713"), c5("\u2713"), c5("\u2713"), p5("100%", 1)], [u5("Studio 6"), n5("Family"), c5("\u2713"), c5("\u2713"), c5("\u2713"), p5("100%", 1)], [{ text: "Property", options: { fontSize: 12, fontFace: "Calibri", bold: true, color: C.ro, valign: "middle" } }, { text: "", options: {} }, { text: "100%", options: { fontSize: 12, fontFace: "Calibri", bold: true, color: C.ro, align: "center", valign: "middle" } }, { text: "83.3%", options: { fontSize: 12, fontFace: "Calibri", bold: true, color: C.ro, align: "center", valign: "middle" } }, { text: "100%", options: { fontSize: 12, fontFace: "Calibri", bold: true, color: C.ro, align: "center", valign: "middle" } }, { text: "94.4%", options: { fontSize: 12, fontFace: "Calibri", bold: true, color: C.ro, align: "center", valign: "middle" } }]], { x: .5, y: 1.25, w: 9, colW: [1.5, 1.2, 1.7, 1.7, 1.7, 1.2], border: { pt: .5, color: C.bg }, rowH: [.42, .4, .4, .4, .4, .4, .4, .42], autoPage: false });
  s5.addText("\u2713 = Occupied    \u2717 = Vacant    |    Lease type: 1-month fixed term", { x: .5, y: 4.7, w: 9, h: .25, fontSize: 10, fontFace: "Calibri", italic: true, color: C.mv, margin: 0 });

  // ── S6 — Revenue Performance ───────────────────────────────────────────────
  let s6 = p.addSlide(); s6.background = { color: C.ow }; sh(s6, "Revenue Performance", 6, p, ic.s6);
  s6.addChart(p.charts.BAR, [{ name: "R", labels: ["January", "February", "March"], values: [120000, 100000, 120000] }], { x: .5, y: 1.3, w: 5, h: 3.3, barDir: "col", chartColors: [C.ro], showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.ch, catAxisLabelColor: C.mv, catAxisLabelFontSize: 10, valAxisLabelColor: C.mv, valAxisLabelFontSize: 9, valGridLine: { color: C.bg, size: .5 }, catGridLine: { style: "none" }, showLegend: false, valAxisMinVal: 0, showTitle: true, title: "Monthly Room Revenue (\u20B9)", titleColor: C.ch, titleFontSize: 11 });
  s6.addShape(p.shapes.LINE, { x: 5.8, y: 1.3, w: 0, h: 3.5, line: { color: C.bg, width: .5 } });
  s6.addText("\u20B93,75,000", { x: 6.1, y: 1.35, w: 3.4, h: .5, fontSize: 28, fontFace: "Georgia", bold: true, color: C.ro, margin: 0 });
  s6.addText("Total Revenue  |  Q1 2026", { x: 6.1, y: 1.85, w: 3.4, h: .22, fontSize: 10, fontFace: "Calibri", color: C.mv, margin: 0 });
  s6.addShape(p.shapes.LINE, { x: 6.1, y: 2.2, w: 3.4, h: 0, line: { color: C.bg, width: .5 } });
  [["\u20B93,40,000", "Room Rent", "91% of total", C.ch], ["\u20B935,000", "Other Income", "9% of total", C.gd], ["\u20B920,000", "Vacancy Loss", "Studio 4, Feb", C.rd], ["94.9%", "Collection Rate", "Q1 overall", C.gn]].forEach((r, i) => { const y = 2.35 + i * .6;
    s6.addShape(p.shapes.RECTANGLE, { x: 6, y: y, w: .06, h: .4, fill: { color: r[3] } });
    s6.addText(r[0], { x: 6.2, y, w: 1.5, h: .22, fontSize: 14, fontFace: "Georgia", bold: true, color: r[3], margin: 0 });
    s6.addText(r[2], { x: 7.75, y, w: 1.5, h: .22, fontSize: 10, fontFace: "Calibri", italic: true, color: r[3], margin: 0 });
    s6.addText(r[1], { x: 6.2, y: y + .22, w: 3, h: .16, fontSize: 10, fontFace: "Calibri", color: C.mv, margin: 0 });
  });

  // ── S7 — Operating Expenses ────────────────────────────────────────────────
  let s7 = p.addSlide(); s7.background = { color: C.ow }; sh(s7, "Operating Expenses", 7, p, ic.s7);
  s7.addChart(p.charts.PIE, [{ name: "E", labels: ["Maintenance", "PM Fee", "Security", "Utilities", "Cleaning"], values: [35000, 30000, 24000, 18000, 10000] }], { x: .2, y: 1.2, w: 4.5, h: 3.6, chartColors: [C.ro, "5B9EA6", C.gd, "7A8B99", C.lv], showPercent: true, showLegend: false, showTitle: false });
  s7.addShape(p.shapes.LINE, { x: 4.9, y: 1.3, w: 0, h: 3.4, line: { color: C.bg, width: .5 } });
  s7.addText("\u20B91,17,000", { x: 5.2, y: 1.3, w: 4.3, h: .45, fontSize: 24, fontFace: "Georgia", bold: true, color: C.ro, margin: 0 });
  s7.addText("Total OpEx  |  31.2% of Revenue  |  \u20B939,000/mo avg", { x: 5.2, y: 1.75, w: 4.3, h: .2, fontSize: 10, fontFace: "Calibri", color: C.mv, margin: 0 });
  s7.addShape(p.shapes.LINE, { x: 5.2, y: 2.05, w: 4.3, h: 0, line: { color: C.bg, width: .5 } });
  const exp7 = [
    { name: "Maintenance & Repairs", amt: "\u20B935,000", pct: "9.3%", mo: "\u20B911,667/mo", c: C.ro },
    { name: "Property Mgmt Fee", amt: "\u20B930,000", pct: "8.0%", mo: "\u20B910,000/mo", c: "5B9EA6" },
    { name: "Security / Staff", amt: "\u20B924,000", pct: "6.4%", mo: "\u20B98,000/mo", c: C.gd },
    { name: "Utilities (Water, Elec.)", amt: "\u20B918,000", pct: "4.8%", mo: "\u20B96,000/mo", c: "7A8B99" },
    { name: "Cleaning & Misc", amt: "\u20B910,000", pct: "2.7%", mo: "\u20B93,333/mo", c: C.lv },
  ];
  exp7.forEach((e, i) => { const y = 2.2 + i * .5;
    s7.addShape(p.shapes.RECTANGLE, { x: 5.2, y, w: .06, h: .38, fill: { color: e.c } });
    s7.addText(e.name, { x: 5.4, y, w: 2.2, h: .2, fontSize: 10, fontFace: "Calibri", bold: true, color: C.ch, margin: 0 });
    s7.addText(e.amt, { x: 7.6, y, w: .9, h: .2, fontSize: 10, fontFace: "Georgia", bold: true, color: e.c, align: "right", margin: 0 });
    s7.addText(e.pct + " of revenue", { x: 5.4, y: y + .2, w: 3.1, h: .16, fontSize: 10, fontFace: "Calibri", color: C.mv, margin: 0 });
  });

  // ── S8 — Net Operating Income (NOI) ────────────────────────────────────────
  let s8 = p.addSlide(); s8.background = { color: C.ow }; sh(s8, "Net Operating Income (NOI)", 8, p, ic.s8);
  [{ l: "Gross Revenue", v: 375000, w: 5.5, c: C.gn }, { l: "(-) Operating Expenses", v: 117000, w: 1.72, c: C.ro }, { l: "= Net Operating Income", v: 258000, w: 3.78, c: C.hd }].forEach((item, i) => { const y = 1.35 + i * .75; s8.addText(item.l, { x: .5, y, w: 2.5, h: .4, fontSize: 11, fontFace: "Calibri", bold: true, color: C.ch, margin: 0 }); s8.addShape(p.shapes.RECTANGLE, { x: 3, y: y + .05, w: item.w, h: .35, fill: { color: item.c } }); s8.addText("\u20B9" + item.v.toLocaleString("en-IN"), { x: 3 + item.w + .15, y, w: 1.5, h: .4, fontSize: 11, fontFace: "Calibri", color: item.c, bold: true, margin: 0 }); });
  s8.addShape(p.shapes.RECTANGLE, { x: 0, y: 3.65, w: 10, h: 1.15, fill: { color: C.hd } });
  [{ v: "68.8%", l: "NOI Margin" }, { v: "31.2%", l: "OpEx Ratio" }, { v: "\u20B943,000", l: "NOI / Unit (Q1)" }, { v: "\u20B92,18,000", l: "Net to Owner" }].forEach((m, i) => { const x = .5 + i * 2.4; s8.addText(m.v, { x, y: 3.78, w: 2.2, h: .4, fontSize: 22, fontFace: "Georgia", bold: true, color: C.wh, valign: "bottom", margin: 0 }); s8.addText(m.l, { x, y: 4.18, w: 2.2, h: .25, fontSize: 10, fontFace: "Calibri", color: C.ro, valign: "top", margin: 0 }); });

  // ── S9 — Cash Flow & Collections ───────────────────────────────────────────
  let s9 = p.addSlide(); s9.background = { color: C.ow }; sh(s9, "Cash Flow & Collections", 9, p, ic.s9);
  s9.addText("Monthly Inflows", { x: .5, y: 1.3, w: 3, h: .25, fontSize: 11, fontFace: "Georgia", bold: true, color: C.gn, margin: 0 });
  const months = [{ m: "January", v: "\u20B91,31,667" }, { m: "February", v: "\u20B91,11,667" }, { m: "March", v: "\u20B91,31,666" }];
  months.forEach((m, i) => { const x = .5 + i * 3.1;
    s9.addText(m.v, { x, y: 1.65, w: 2.5, h: .3, fontSize: 20, fontFace: "Georgia", bold: true, color: C.gn, margin: 0 });
    s9.addText(m.m, { x, y: 1.95, w: 2.5, h: .2, fontSize: 10, fontFace: "Calibri", color: C.mv, margin: 0 });
  });
  s9.addShape(p.shapes.LINE, { x: .5, y: 2.3, w: 9, h: 0, line: { color: C.bg, width: 1 } });
  s9.addText("Total Inflows: \u20B93,75,000", { x: .5, y: 2.45, w: 5, h: .35, fontSize: 18, fontFace: "Georgia", bold: true, color: C.gn, margin: 0 });
  s9.addText("100% collection rate", { x: 6, y: 2.5, w: 3.5, h: .25, fontSize: 10, fontFace: "Calibri", color: C.gn, align: "right", margin: 0 });
  s9.addShape(p.shapes.LINE, { x: .5, y: 3.15, w: 9, h: 0, line: { color: C.bg, width: .5 } });
  s9.addText("(-) Total Expenditure: \u20B91,57,000", { x: .5, y: 3.25, w: 5, h: .35, fontSize: 18, fontFace: "Georgia", bold: true, color: C.rd, margin: 0 });
  s9.addText("OpEx \u20B91,17,000 + CapEx \u20B940,000  |  41.9% of revenue", { x: 5.5, y: 3.3, w: 4, h: .25, fontSize: 10, fontFace: "Calibri", color: C.rd, align: "right", margin: 0 });
  s9.addShape(p.shapes.LINE, { x: .5, y: 3.95, w: 9, h: 0, line: { color: C.bg, width: 1 } });
  s9.addText("Net to Owner: \u20B92,18,000", { x: .5, y: 4.1, w: 5, h: .4, fontSize: 22, fontFace: "Georgia", bold: true, color: C.hd, margin: 0 });
  s9.addText("After all operating expenses and capital investment", { x: 5.5, y: 4.15, w: 4, h: .3, fontSize: 10, fontFace: "Calibri", color: C.hd, align: "right", margin: 0 });

  // ── S10 — Capital Expenditures (CapEx) ─────────────────────────────────────
  let s10 = p.addSlide(); s10.background = { color: C.ow }; sh(s10, "Capital Expenditures (CapEx)", 10, p, ic.s10);
  s10.addText("\u20B940,000", { x: .5, y: 1.3, w: 3, h: .5, fontSize: 28, fontFace: "Georgia", bold: true, color: C.ro, margin: 0 });
  s10.addText("Total CapEx  |  10.7% of Q1 Revenue  |  All Completed", { x: .5, y: 1.8, w: 6, h: .22, fontSize: 10, fontFace: "Calibri", color: C.mv, margin: 0 });
  s10.addShape(p.shapes.LINE, { x: .5, y: 2.15, w: 9, h: 0, line: { color: C.bg, width: .5 } });
  const proj = [
    { name: "Painting (2 Units)", desc: "Interior repaint for 2 rooms", amt: "\u20B920,000", c: C.ro },
    { name: "Plumbing Upgrades", desc: "Pipe and fixture replacements", amt: "\u20B912,000", c: C.hd },
    { name: "Appliance Replacement", desc: "New appliances for select units", amt: "\u20B98,000", c: C.gd },
  ];
  proj.forEach((pr, i) => { const y = 2.35 + i * .65;
    s10.addShape(p.shapes.RECTANGLE, { x: .5, y, w: .08, h: .5, fill: { color: pr.c } });
    s10.addText(pr.name, { x: .75, y: y + .05, w: 4, h: .2, fontSize: 11, fontFace: "Calibri", bold: true, color: C.ch, margin: 0 });
    s10.addText(pr.desc, { x: .75, y: y + .25, w: 8.75, h: .2, fontSize: 10, fontFace: "Calibri", color: C.mv, align: "center", margin: 0 });
    s10.addText(pr.amt, { x: 5.5, y: y + .05, w: 1.5, h: .2, fontSize: 14, fontFace: "Georgia", bold: true, color: pr.c, align: "right", margin: 0 });
    s10.addText("Completed \u2713", { x: 7.1, y: y + .05, w: 1, h: .2, fontSize: 10, fontFace: "Calibri", color: C.gn, margin: 0 });
    if (i < 2) s10.addShape(p.shapes.LINE, { x: .5, y: y + .55, w: 9, h: 0, line: { color: C.bg, width: .5 } });
  });
  s10.addShape(p.shapes.LINE, { x: .5, y: 4.35, w: 9, h: 0, line: { color: C.bg, width: 1 } });
  s10.addText("Net cash to owner after OpEx and CapEx: \u20B92,18,000", { x: .5, y: 4.5, w: 9, h: .25, fontSize: 10, fontFace: "Calibri", italic: true, color: C.hd, margin: 0 });

  // ── S11 — Tenant Insights & Reviews ────────────────────────────────────────
  let s11 = p.addSlide(); s11.background = { color: C.ow }; sh(s11, "Tenant Insights & Reviews", 11, p, ic.s11);
  s11.addShape(p.shapes.RECTANGLE, { x: 0, y: 1.08, w: 10, h: 1.6, fill: { color: "FBF2F0" } });
  s11.addText([{ text: "4.8", options: { bold: true } }, { text: " / 5.0", options: { bold: false } }], { x: .5, y: 1.35, w: 2.5, h: .55, fontSize: 36, fontFace: "Georgia", color: C.hd, valign: "middle", margin: 0 });
  s11.addText("\u2605 Superhost", { x: .5, y: 1.95, w: 2.5, h: .25, fontSize: 10, fontFace: "Calibri", bold: true, color: C.gd, margin: 0 });
  const subs = [{ l: "Cleanliness", v: 4.9, c: C.gn }, { l: "Communication", v: 4.9, c: C.gn }, { l: "Location", v: 4.7, c: C.gd }, { l: "Value", v: 4.7, c: C.gd }];
  subs.forEach((s, i) => { const y = 1.2 + i * .33;
    s11.addText(s.l, { x: 3.5, y, w: 1.5, h: .28, fontSize: 10, fontFace: "Calibri", bold: true, color: C.ch, margin: 0 });
    s11.addShape(p.shapes.RECTANGLE, { x: 5.2, y: y + .05, w: (s.v / 5) * 3.5, h: .16, fill: { color: s.c } });
    s11.addText(String(s.v), { x: 5.2 + (s.v / 5) * 3.5 + .15, y, w: .6, h: .28, fontSize: 12, fontFace: "Georgia", bold: true, color: C.hd, margin: 0 });
  });
  s11.addShape(p.shapes.LINE, { x: .5, y: 2.85, w: 9, h: 0, line: { color: C.bg, width: 1 } });
  [["Top Markets:", "Mumbai, Delhi, UK, Germany"], ["Lease Term:", "1 month (all tenants)"], ["Unit Mix:", "5 Standard, 1 Family"], ["Repeat Tenants:", "TBD"]].forEach((d, i) => { const x = .5 + (i % 2) * 4.5, y = 3 + Math.floor(i / 2) * .28; s11.addText(d[0], { x, y, w: 1.5, h: .22, fontSize: 10, fontFace: "Calibri", bold: true, color: C.ch, margin: 0 }); s11.addText(d[1], { x: x + 1.5, y, w: 2.5, h: .22, fontSize: 10, fontFace: "Calibri", color: C.mv, margin: 0 }); });
  s11.addText("Guest Feedback", { x: .5, y: 3.7, w: 5, h: .25, fontSize: 11, fontFace: "Georgia", bold: true, color: C.ro, margin: 0 });
  const fb = [
    { stars: "\u2605\u2605\u2605\u2605\u2605", comment: "Loved the location and the clean, well-maintained rooms. The host was very responsive and helpful throughout our stay.", who: "C.N., Jan 2026" },
    { stars: "\u2605\u2605\u2605\u2605\u2606", comment: "Great property overall with a fantastic location in Vagator. The only issue was that the Wi-Fi connection was slow.", who: "A.B., Feb 2026" },
    { stars: "\u2605\u2605\u2605\u2605\u2605", comment: "Perfect for a getaway in Goa. The rooms were spotless. Host communication was excellent throughout the entire stay.", who: "X.Y., Mar 2026" },
  ];
  fb.forEach((f, i) => { const y = 4.0 + i * .35;
    s11.addShape(p.shapes.RECTANGLE, { x: .5, y, w: .06, h: .3, fill: { color: C.ro } });
    s11.addText(f.stars, { x: .7, y, w: .8, h: .3, fontSize: 10, fontFace: "Calibri", color: C.gd, margin: 0 });
    s11.addText("\u201C" + f.comment + "\u201D  \u2014 " + f.who, { x: 1.6, y, w: 7.9, h: .3, fontSize: 10, fontFace: "Calibri", italic: true, color: C.ch, margin: 0 });
  });

  // ── S12 — Risks & Issues ───────────────────────────────────────────────────
  let s12 = p.addSlide(); s12.background = { color: C.ow }; sh(s12, "Risks & Issues", 12, p, ic.s12);
  s12.addText("Risk & Impact", { x: .5, y: 1.35, w: 4.5, h: .25, fontSize: 10, fontFace: "Calibri", bold: true, color: C.hd, align: "center", margin: 0 });
  s12.addText("Mitigation", { x: 5.3, y: 1.35, w: 4.2, h: .25, fontSize: 10, fontFace: "Calibri", bold: true, color: C.hd, align: "center", margin: 0 });
  s12.addShape(p.shapes.LINE, { x: .5, y: 1.62, w: 9, h: 0, line: { color: C.hd, width: 1 } });
  const risks = [
    { name: "Monsoon Vacancy", impact: "Q3 occupancy may drop to ~50% (Jul\u2013Sep)", mit: "Launch long-stay packages; discounted monsoon rates for digital nomads", c: C.rd },
    { name: "Single Platform Risk", impact: "100% Airbnb reliance exposes revenue to policy changes", mit: "List on Booking.com, MakeMyTrip; build direct booking website", c: C.gd },
    { name: "Wi-Fi Complaints", impact: "Negative connectivity reviews may affect bookings", mit: "Upgrade internet plan; install backup connection by Apr 2026", c: C.gd },
    { name: "Maintenance Costs", impact: "Aging fixtures may increase repair frequency", mit: "Preventive maintenance schedule; annual CapEx budget", c: C.gn },
    { name: "Rent Competitiveness", impact: "Market shifts may reduce pricing competitiveness", mit: "Quarterly market analysis; dynamic pricing strategy", c: C.gn },
  ];
  const alt12 = "F5F0EE";
  risks.forEach((r, i) => { const y = 1.7 + i * .72;
    if (i % 2 === 0) s12.addShape(p.shapes.RECTANGLE, { x: .5, y, w: 9, h: .67, fill: { color: alt12 } });
    s12.addShape(p.shapes.OVAL, { x: .6, y: y + .13, w: .14, h: .14, fill: { color: r.c } });
    s12.addText(r.name, { x: .9, y: y + .08, w: 4, h: .22, fontSize: 10, fontFace: "Calibri", bold: true, color: C.ch, margin: 0 });
    s12.addText(r.impact, { x: .9, y: y + .32, w: 4, h: .22, fontSize: 10, fontFace: "Calibri", color: C.mv, margin: 0 });
    s12.addText(r.mit, { x: 5.3, y: y + .1, w: 4.2, h: .48, fontSize: 10, fontFace: "Calibri", color: C.ch, valign: "middle", margin: 0 });
  });

  // ── S13 — Forecast & Outlook ───────────────────────────────────────────────
  let s13 = p.addSlide(); s13.background = { color: C.ow }; sh(s13, "Forecast & Outlook", 13, p, ic.s13);
  [{ q: "Q2 (Apr\u2013Jun)", ss: "Shoulder Season", o: "83%", r: "\u20B93.4L", c: C.gd }, { q: "Q3 (Jul\u2013Sep)", ss: "Monsoon Low", o: "50%", r: "\u20B92.0L", c: C.rd }, { q: "Q4 (Oct\u2013Dec)", ss: "Peak Recovery", o: "89%", r: "\u20B93.6L", c: C.gn }].forEach((q, i) => { const x = .5 + i * 3.1; s13.addText(q.q, { x, y: 1.35, w: 2.8, h: .3, fontSize: 13, fontFace: "Calibri", bold: true, color: C.ch, margin: 0 }); s13.addText(q.ss, { x, y: 1.65, w: 2.8, h: .2, fontSize: 10, fontFace: "Calibri", italic: true, color: C.mv, margin: 0 }); s13.addText(q.o, { x, y: 2, w: 1.2, h: .45, fontSize: 26, fontFace: "Georgia", bold: true, color: q.c, margin: 0 }); s13.addText("Occupancy", { x, y: 2.43, w: 1.2, h: .2, fontSize: 10, fontFace: "Calibri", color: C.mv, margin: 0 }); s13.addText(q.r, { x: x + 1.3, y: 2, w: 1.5, h: .45, fontSize: 26, fontFace: "Georgia", bold: true, color: C.ch, margin: 0 }); s13.addText("Revenue", { x: x + 1.3, y: 2.43, w: 1.5, h: .2, fontSize: 10, fontFace: "Calibri", color: C.mv, margin: 0 }); });
  s13.addShape(p.shapes.LINE, { x: 3.45, y: 1.3, w: 0, h: 1.4, line: { color: C.bg, width: 1 } });
  s13.addShape(p.shapes.LINE, { x: 6.55, y: 1.3, w: 0, h: 1.4, line: { color: C.bg, width: 1 } });
  s13.addShape(p.shapes.RECTANGLE, { x: .5, y: 2.85, w: 9, h: .42, fill: { color: C.hd } });
  s13.addText("2026 Full Year Forecast:  Occupancy ~79%  |  Revenue ~\u20B912.75L  |  NOI ~\u20B98.8L", { x: .5, y: 2.85, w: 9, h: .42, fontSize: 11, fontFace: "Calibri", bold: true, color: C.wh, align: "center", valign: "middle" });
  [{ t: "Q2 Strategy", d: "Target 83% occupancy. Focus on early monsoon bookings. Maintain rent at \u20B920,000/unit." }, { t: "Q3 Strategy", d: "Expect ~50% occupancy. Launch discounted long-stay packages for digital nomads." }, { t: "Q4 Strategy", d: "Peak season. Target 89%+ occupancy. Evaluate rent increase to \u20B922,000\u201325,000/unit." }].forEach((s, i) => { const x = .5 + i * 3.1; s13.addText(s.t, { x, y: 3.55, w: 2.8, h: .28, fontSize: 11, fontFace: "Calibri", bold: true, color: C.ro, margin: 0 }); s13.addText(s.d, { x, y: 3.88, w: 2.8, h: .8, fontSize: 10, fontFace: "Calibri", color: C.ch, margin: 0 }); });
  s13.addShape(p.shapes.LINE, { x: 3.45, y: 3.5, w: 0, h: 1.2, line: { color: C.bg, width: 1 } });
  s13.addShape(p.shapes.LINE, { x: 6.55, y: 3.5, w: 0, h: 1.2, line: { color: C.bg, width: 1 } });

  // ── S14 — Action Plan – Next Quarter ───────────────────────────────────────
  let s14 = p.addSlide(); s14.background = { color: C.ow }; sh(s14, "Action Plan \u2013 Next Quarter", 14, p, ic.s14);
  [{ item: "Investigate Studio 4 vacancy cause", cat: "Occupancy", deadline: "Apr 2026", status: "Priority", sc: C.rd, callout: true }, { item: "List on Booking.com & MakeMyTrip", cat: "Distribution", deadline: "Apr 2026", status: "In Progress", sc: C.gd, callout: true }, { item: "Launch Direct Booking Website", cat: "Revenue", deadline: "May 2026", status: "Planning", sc: C.mv }, { item: "Build Monsoon Long-Stay Packages", cat: "Occupancy", deadline: "May 2026", status: "Planning", sc: C.mv }, { item: "Implement Dynamic Pricing Strategy", cat: "Revenue", deadline: "Apr 2026", status: "Evaluation", sc: C.mv }, { item: "Maintain Superhost Status", cat: "Branding", deadline: "Ongoing", status: "On Track", sc: C.gn }, { item: "Evaluate Q4 Rent Increase", cat: "Revenue", deadline: "Sep 2026", status: "Future", sc: C.mv }].forEach((a, i) => { const y = 1.3 + i * .52;
    if (a.callout) s14.addShape(p.shapes.RECTANGLE, { x: .5, y, w: 9, h: .48, fill: { color: "FBF2F0" } });
    s14.addShape(p.shapes.RECTANGLE, { x: .6, y: y + .1, w: .22, h: .22, fill: { color: C.wh }, line: { color: a.sc, width: 1.5 } });
    if (a.status === "On Track" || a.status === "In Progress") s14.addText("\u2713", { x: .6, y: y + .06, w: .22, h: .28, fontSize: 12, fontFace: "Calibri", bold: true, color: a.sc, align: "center", margin: 0 });
    s14.addText(a.item, { x: 1, y, w: 5.5, h: .25, fontSize: 10, fontFace: "Calibri", bold: true, color: C.ch, margin: 0 });
    s14.addText(a.cat + "  |  " + a.deadline, { x: 1, y: y + .24, w: 5.5, h: .18, fontSize: 10, fontFace: "Calibri", color: C.mv, margin: 0 });
    s14.addText(a.status, { x: 6.8, y: y + .08, w: 1.2, h: .28, fontSize: 10, fontFace: "Calibri", bold: true, color: a.sc, margin: 0 });
  });

  // ── S15 — Thank You ────────────────────────────────────────────────────────
  let s15 = p.addSlide();
  s15.addShape(p.shapes.RECTANGLE, { x: 0, y: 0, w: 6, h: 5.625, fill: { color: C.ow } });
  s15.addShape(p.shapes.RECTANGLE, { x: 6, y: 0, w: 4, h: 5.625, fill: { color: C.ro } });
  s15.addText("Thank You", { x: .6, y: 1.2, w: 5, h: .7, fontSize: 36, fontFace: "Georgia", bold: true, color: C.hd, margin: 0 });
  s15.addShape(p.shapes.LINE, { x: .6, y: 2, w: 1.5, h: 0, line: { color: C.hd, width: 2 } });
  s15.addText("Q1 2026 Performance Review Complete", { x: .6, y: 2.2, w: 5, h: .35, fontSize: 12, fontFace: "Calibri", color: C.mv, margin: 0 });
  s15.addText([{ text: "Prepared by: xyz", options: { breakLine: true } }, { text: "Role: Property Manager", options: { breakLine: true } }, { text: "Contact: xyz@gmail.com  |  +91- 1234567891", options: { breakLine: true } }, { text: "Property: Sunshine Homes, Vagator, Goa" }], { x: .6, y: 3, w: 5, h: 1.2, fontSize: 10, fontFace: "Calibri", color: C.ch, margin: 0 });
  s15.addText("This document is confidential and intended for the property owner only.", { x: .6, y: 4.5, w: 5, h: .3, fontSize: 10, fontFace: "Calibri", italic: true, color: C.mv, margin: 0 });
  s15.addImage({ data: iconH, x: 7.5, y: 1.5, w: .6, h: .6 });
  s15.addText("Sunshine\nHomes", { x: 6.5, y: 2.3, w: 3, h: 1.2, fontSize: 28, fontFace: "Georgia", bold: true, color: C.wh, align: "center", margin: 0 });
  s15.addText("Vagator, Goa", { x: 6.5, y: 3.5, w: 3, h: .3, fontSize: 11, fontFace: "Calibri", color: C.ow, align: "center", margin: 0 });

  // ── Write ──────────────────────────────────────────────────────────────────
  await p.writeFile({ fileName: "sunshine_final.pptx" });
  console.log("Done! → sunshine_final.pptx");
}

main().catch(e => { console.error(e); process.exit(1); });
