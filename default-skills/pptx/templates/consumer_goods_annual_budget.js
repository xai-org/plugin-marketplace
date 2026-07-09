const pptxgen = require("pptxgenjs");

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "FP&A Team";
  pres.title = "2027 Budget Model - The BeautyCo.";

  const BLACK = "050505";
  const WHITE = "FFFFFF";
  const GOLD = "C8A951";
  const GRAY = "888888";
  const DARK = "1A1A1A";
  const DIM = "555555";
  const LINE = "333333";

  const CH_GOLD = "C8A951";
  const CH_DIM = "666666";

  const totalSlides = 10;

  function footer(slide, num) {
    slide.addText("2027 BUDGET  /  CONFIDENTIAL", { x: 0.6, y: 5.28, w: 5, h: 0.25, fontSize: 11, fontFace: "Calibri", color: GRAY, charSpacing: 1.5, margin: 0 });
    slide.addText(`${String(num).padStart(2, '0')} / ${totalSlides}`, { x: 7.5, y: 5.28, w: 2, h: 0.25, fontSize: 11, fontFace: "Calibri", color: GRAY, align: "right", charSpacing: 1.5, margin: 0 });
  }

  function sectionTag(slide, text) {
    slide.addText(text, { x: 0.6, y: 0.4, w: 5, h: 0.3, fontSize: 11, fontFace: "Calibri", color: GOLD, bold: true, charSpacing: 3, margin: 0 });
  }

  function headline(slide, text, y = 0.75) {
    slide.addText(text, { x: 0.6, y: y, w: 8.8, h: 0.9, fontSize: 22, fontFace: "Calibri Light", color: WHITE, margin: 0 });
  }

  function kpiCallout(slide, items, startX = 7.8, startY = 2.4) {
    items.forEach((k, i) => {
      const yy = startY + i * 1.0;
      slide.addText(k.value, { x: startX, y: yy, w: 2, h: 0.5, fontSize: 30, fontFace: "Calibri Light", color: GOLD, margin: 0 });
      slide.addShape(pres.shapes.LINE, { x: startX, y: yy + 0.48, w: 0.4, h: 0, line: { color: GOLD, width: 1.5 } });
      slide.addText(k.label, { x: startX, y: yy + 0.52, w: 2, h: 0.18, fontSize: 11, fontFace: "Calibri", color: GRAY, charSpacing: 1.5, margin: 0 });
      if (k.sub) {
        slide.addText(k.sub, { x: startX, y: yy + 0.7, w: 2, h: 0.18, fontSize: 12, fontFace: "Calibri", color: GRAY, margin: 0 });
      }
    });
  }

  // SLIDE 1: TITLE
  let s1 = pres.addSlide();
  s1.background = { color: BLACK };
  sectionTag(s1, "T H E   B E A U T Y C O .");
  s1.addText("The 2027 Budget", { x: 0.6, y: 2.0, w: 9, h: 1.2, fontSize: 60, fontFace: "Calibri Light", color: WHITE, margin: 0 });
  s1.addText("€13.3Bn revenue  //  20% operating margin  //  €1.9Bn net income", { x: 0.6, y: 3.3, w: 8, h: 0.5, fontSize: 18, fontFace: "Calibri", color: GRAY, margin: 0 });
  s1.addShape(pres.shapes.LINE, { x: 0.6, y: 5.15, w: 8.8, h: 0, line: { color: LINE, width: 0.5 } });
  s1.addText("A P R I L   2 0 2 6", { x: 0.6, y: 5.28, w: 4, h: 0.25, fontSize: 11, fontFace: "Calibri", color: GRAY, charSpacing: 1.5, margin: 0 });
  s1.addText("F I N A N C E   D I R E C T O R   P R E S E N T A T I O N", { x: 5, y: 5.28, w: 4.5, h: 0.25, fontSize: 11, fontFace: "Calibri", color: GRAY, align: "right", charSpacing: 1.5, margin: 0 });

  // SLIDE 2: EXECUTIVE SUMMARY
  let s2 = pres.addSlide();
  s2.background = { color: BLACK };
  sectionTag(s2, "E X E C U T I V E   S U M M A R Y");
  headline(s2, "€13.3Bn revenue (+6.5%), 20% operating margin, €1.9Bn net income");
  const stats = [
    { value: "€13.3B", label: "BUDGET REVENUE", color: WHITE },
    { value: "74.5%", label: "GROSS MARGIN", color: WHITE },
    { value: "€2.7B", label: "OPERATING PROFIT", color: WHITE },
    { value: "€1.9B", label: "NET INCOME", color: GOLD },
  ];
  stats.forEach((s, i) => {
    const xPos = 0.6 + i * 2.35;
    s2.addText(s.value, { x: xPos, y: 2.05, w: 2.2, h: 0.8, fontSize: 40, fontFace: "Calibri Light", color: s.color, margin: 0 });
    s2.addShape(pres.shapes.LINE, { x: xPos, y: 2.83, w: 0.5, h: 0, line: { color: GOLD, width: 1.5 } });
    s2.addText(s.label, { x: xPos, y: 2.93, w: 2.2, h: 0.25, fontSize: 12, fontFace: "Calibri", color: GRAY, charSpacing: 1.5, margin: 0 });
  });
  s2.addText("Base Year 2026  //  Haircare & Skincare  //  EUR millions  //  24.5% effective tax  //  22,550 FTE", { x: 0.6, y: 4.1, w: 9, h: 0.3, fontSize: 14, fontFace: "Calibri", color: GRAY, margin: 0 });
  footer(s2, 2);

  // SLIDE 3: ASSUMPTIONS
  let s3 = pres.addSlide();
  s3.background = { color: BLACK };
  sectionTag(s3, "A S S U M P T I O N S");
  headline(s3, "All six assumptions benchmarked at or below industry-leading peer levels");
  const assumptions = [
    { yr: "GROWTH", value: "6.5%", desc: "Volume 2.8% + Price/Mix 3.7%" },
    { yr: "GROSS MARGIN", value: "74.5%", desc: "Peer benchmark: 74.2% (+30 bps)" },
    { yr: "OPERATING MARGIN", value: "20.0%", desc: "Parity with industry leader" },
    { yr: "INFLATION", value: "2.2%", desc: "ECB target; raw materials 3.5%" },
    { yr: "TAX RATE", value: "24.5%", desc: "Blended France + global" },
    { yr: "HEADCOUNT", value: "22,550", desc: "+2.5% YoY | €52K avg cost" },
  ];
  assumptions.forEach((a, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const xPos = 0.6 + col * 3.1;
    const yPos = 2.3 + row * 1.5;
    s3.addText(a.yr, { x: xPos, y: yPos, w: 2.8, h: 0.22, fontSize: 11, fontFace: "Calibri", color: GOLD, charSpacing: 1.5, margin: 0 });
    s3.addText(a.value, { x: xPos, y: yPos + 0.25, w: 2.8, h: 0.6, fontSize: 40, fontFace: "Calibri Light", color: WHITE, margin: 0 });
    s3.addText(a.desc, { x: xPos, y: yPos + 0.85, w: 2.8, h: 0.25, fontSize: 13, fontFace: "Calibri", color: GRAY, margin: 0 });
  });
  footer(s3, 3);

  // SLIDE 4: REVENUE
  let s4 = pres.addSlide();
  s4.background = { color: BLACK };
  sectionTag(s4, "R E V E N U E");
  headline(s4, "+€813M revenue growth: 57% from premiumization, 43% from volume");
  s4.addChart(pres.charts.BAR, [{ name: "Growth (%)", labels: ["Volume\nGrowth", "Price / Mix\nPremium", "Total\nGrowth"], values: [2.8, 3.7, 6.5] }], {
    x: 0.4, y: 1.8, w: 6.8, h: 3.1, barDir: "col", chartColors: [CH_GOLD],
    chartArea: { fill: { color: BLACK } }, plotArea: { fill: { color: BLACK } },
    showLegend: false, showValue: true, dataLabelColor: WHITE, dataLabelFontSize: 14, dataLabelPosition: "outEnd",
    dataLabelFormatCode: "0.0\"%\"",
    catAxisLabelColor: GRAY, catAxisLabelFontSize: 11, catAxisLabelFontBold: true,
    valAxisHidden: true, catAxisLineShow: false, valGridLine: { style: "none" }, catGridLine: { style: "none" }, valAxisMaxVal: 8,
  });
  kpiCallout(s4, [
    { value: "€12.5B", label: "2026 BASE", sub: "Prior year revenue" },
    { value: "+€813M", label: "TOTAL GROWTH", sub: "Volume + Price/Mix" },
    { value: "28%", label: "E-COMMERCE", sub: "DTC share of 2027 rev" },
  ], 7.8, 1.8);
  footer(s4, 4);

  // SLIDE 5: SEGMENTS — Grouped bar (2026 vs 2027), €M labels
  let s5 = pres.addSlide();
  s5.background = { color: BLACK };
  sectionTag(s5, "S E G M E N T S");
  headline(s5, "Skincare delivers 66% of growth, Haircare adds €275M at 5.5%");
  s5.addChart(pres.charts.BAR, [
    { name: "2026", labels: ["Haircare", "Skincare"], values: [5000, 7500] },
    { name: "2027", labels: ["Haircare", "Skincare"], values: [5275, 8040] },
  ], {
    x: 0.4, y: 1.8, w: 6.8, h: 3.1, barDir: "col", chartColors: [CH_DIM, CH_GOLD],
    chartArea: { fill: { color: BLACK } }, plotArea: { fill: { color: BLACK } },
    showLegend: true, legendPos: "b", legendFontSize: 11, legendColor: GRAY,
    showValue: true, dataLabelColor: WHITE, dataLabelFontSize: 14, dataLabelPosition: "outEnd",
    dataLabelFormatCode: "\"€\"#,##0\"M\"",
    catAxisLabelColor: GRAY, catAxisLabelFontSize: 11, catAxisLabelFontBold: true,
    valAxisHidden: true, catAxisLineShow: false, valGridLine: { style: "none" }, catGridLine: { style: "none" },
  });
  kpiCallout(s5, [
    { value: "60.4%", label: "SKINCARE SHARE", sub: "Up from 60% in 2026" },
    { value: "+7.2%", label: "SKINCARE GROWTH", sub: "Clean beauty driving share" },
    { value: "+€815M", label: "TOTAL YOY GAIN", sub: "Both segments growing" },
  ], 7.8, 1.8);
  footer(s5, 5);

  // SLIDE 6: CHANNELS — €M labels, inEnd position
  let s6 = pres.addSlide();
  s6.background = { color: BLACK };
  sectionTag(s6, "C H A N N E L S");
  headline(s6, "E-commerce is highest-margin; salon provides sticky, recurring revenue");
  s6.addChart(pres.charts.BAR, [{ name: "Revenue (€M)", labels: ["Professional / Salon", "E-Commerce / DTC", "Retail / Other"], values: [2929, 3728, 6656] }], {
    x: 0.4, y: 1.8, w: 6.8, h: 3.1, barDir: "bar", chartColors: [CH_GOLD],
    chartArea: { fill: { color: BLACK } }, plotArea: { fill: { color: BLACK } },
    showLegend: false, showValue: true, dataLabelColor: WHITE, dataLabelFontSize: 14, dataLabelPosition: "inEnd",
    dataLabelFormatCode: "\"€\"#,##0\"M\"",
    catAxisLabelColor: GRAY, catAxisLabelFontSize: 11, catAxisLabelFontBold: true,
    valGridLine: { style: "none" }, catGridLine: { style: "none" }, valAxisHidden: true, catAxisLineShow: false,
  });
  kpiCallout(s6, [
    { value: "28%", label: "E-COMMERCE / DTC", sub: "Highest margin channel" },
    { value: "4.5%", label: "SALON GROWTH", sub: "Sticky, recurring revenue" },
    { value: "€13.3B", label: "TOTAL 2027 REV", sub: "All channels combined" },
  ], 7.8, 1.8);
  footer(s6, 6);

  // SLIDE 7: GROSS PROFIT — €M data labels
  let s7 = pres.addSlide();
  s7.background = { color: BLACK };
  sectionTag(s7, "G R O S S   P R O F I T");
  headline(s7, "Gross profit +€668M as revenue growth offsets €145M COGS increase");
  s7.addChart(pres.charts.BAR, [{ name: "Impact (€M)", labels: ["Revenue Growth Effect", "COGS Increase", "Net GP Growth"], values: [813, 145, 668] }], {
    x: 0.4, y: 1.8, w: 6.8, h: 3.1, barDir: "col", chartColors: [CH_GOLD, CH_DIM, CH_GOLD],
    chartArea: { fill: { color: BLACK } }, plotArea: { fill: { color: BLACK } },
    showLegend: false, showValue: true, dataLabelColor: WHITE, dataLabelFontSize: 14, dataLabelPosition: "outEnd",
    dataLabelFormatCode: "\"€\"#,##0\"M\"",
    catAxisLabelColor: GRAY, catAxisLabelFontSize: 11, catAxisLabelFontBold: true,
    valAxisHidden: true, catAxisLineShow: false, valGridLine: { style: "none" }, catGridLine: { style: "none" },
  });
  kpiCallout(s7, [
    { value: "€9.3B", label: "2026 GROSS PROFIT", sub: "74.0% margin" },
    { value: "€9.9B", label: "2027 GROSS PROFIT", sub: "74.5% margin" },
    { value: "+7.2%", label: "GP GROWTH", sub: "YoY improvement" },
  ], 7.8, 1.8);
  footer(s7, 7);

  // SLIDE 8: P&L SUMMARY
  let s8 = pres.addSlide();
  s8.background = { color: BLACK };
  sectionTag(s8, "P & L   S U M M A R Y");
  headline(s8, "€1.9B net income (+8.1% YoY) with margin expansion across all lines");
  const hdr = { bold: true, color: GOLD, fill: { color: BLACK }, fontSize: 11 };
  const cell = { color: WHITE, fill: { color: BLACK } };
  const dim = { color: GRAY, fill: { color: BLACK } };
  const bld = { color: WHITE, fill: { color: DARK }, bold: true };
  const gBld = { color: GOLD, fill: { color: DARK }, bold: true };
  const plData = [
    [{ text: "LINE ITEM", options: { ...hdr, charSpacing: 2 } }, { text: "2026", options: { ...hdr, align: "right", charSpacing: 2 } }, { text: "2027", options: { ...hdr, align: "right", charSpacing: 2 } }, { text: "YOY", options: { ...hdr, align: "right", charSpacing: 2 } }],
    [{ text: "Revenue", options: bld }, { text: "12,500", options: { ...bld, align: "right", color: GRAY } }, { text: "13,313", options: { ...bld, align: "right" } }, { text: "+6.5%", options: { ...gBld, align: "right" } }],
    [{ text: "COGS", options: cell }, { text: "(3,250)", options: { ...dim, align: "right" } }, { text: "(3,395)", options: { ...dim, align: "right" } }, { text: "+4.5%", options: { ...dim, align: "right" } }],
    [{ text: "Gross Profit", options: bld }, { text: "9,250", options: { ...bld, align: "right", color: GRAY } }, { text: "9,918", options: { ...bld, align: "right" } }, { text: "+7.2%", options: { ...gBld, align: "right" } }],
    [{ text: "Total OpEx", options: cell }, { text: "(6,750)", options: { ...dim, align: "right" } }, { text: "(7,255)", options: { ...dim, align: "right" } }, { text: "+7.5%", options: { ...dim, align: "right" } }],
    [{ text: "EBIT", options: bld }, { text: "2,500", options: { ...bld, align: "right", color: GRAY } }, { text: "2,663", options: { ...bld, align: "right" } }, { text: "+6.5%", options: { ...gBld, align: "right" } }],
    [{ text: "Net Income", options: { color: GOLD, fill: { color: BLACK }, bold: true } }, { text: "1,750", options: { color: GRAY, fill: { color: BLACK }, bold: true, align: "right" } }, { text: "1,892", options: { color: GOLD, fill: { color: BLACK }, bold: true, align: "right" } }, { text: "+8.1%", options: { color: GOLD, fill: { color: BLACK }, bold: true, align: "right" } }],
  ];
  s8.addTable(plData, { x: 0.6, y: 1.7, w: 6.5, colW: [2.4, 1.2, 1.3, 1.0], fontSize: 14, fontFace: "Calibri", color: WHITE, border: { pt: 0.5, color: LINE }, rowH: [0.38, 0.42, 0.42, 0.44, 0.42, 0.44, 0.46] });
  kpiCallout(s8, [
    { value: "74.5%", label: "GROSS MARGIN", sub: "+50 bps YoY" },
    { value: "20.0%", label: "OPERATING MARGIN", sub: "Parity with leader" },
    { value: "14.2%", label: "NET MARGIN", sub: "+30 bps YoY" },
  ], 7.8, 1.9);
  footer(s8, 8);

  // SLIDE 9: SCENARIOS
  let s9 = pres.addSlide();
  s9.background = { color: BLACK };
  sectionTag(s9, "S C E N A R I O S");
  headline(s9, "EBIT ranges €2.53B to €2.73B. Base case: €2.66B at 20.0%");
  const scenarios = [
    { name: "DOWNSIDE", rev: "€12.9B", revGrowth: "3.5%", ebit: "€2.53B", margin: "19.5%", color: WHITE },
    { name: "BASE", rev: "€13.3B", revGrowth: "6.5%", ebit: "€2.66B", margin: "20.0%", color: WHITE },
    { name: "UPSIDE", rev: "€13.6B", revGrowth: "8.5%", ebit: "€2.73B", margin: "20.5%", color: GOLD },
  ];
  scenarios.forEach((sc, i) => {
    const xPos = 0.6 + i * 3.1;
    s9.addText(sc.name, { x: xPos, y: 1.8, w: 2.8, h: 0.3, fontSize: 12, fontFace: "Calibri", color: GOLD, bold: true, charSpacing: 2, margin: 0 });
    s9.addShape(pres.shapes.LINE, { x: xPos, y: 2.1, w: 2.8, h: 0, line: { color: LINE, width: 0.5 } });
    s9.addText("REVENUE", { x: xPos, y: 2.25, w: 2.8, h: 0.2, fontSize: 11, fontFace: "Calibri", color: GRAY, charSpacing: 1.5, margin: 0 });
    s9.addText(sc.rev, { x: xPos, y: 2.4, w: 2.8, h: 0.5, fontSize: 32, fontFace: "Calibri Light", color: sc.color, margin: 0 });
    s9.addText("GROWTH", { x: xPos, y: 3.05, w: 2.8, h: 0.2, fontSize: 11, fontFace: "Calibri", color: GRAY, charSpacing: 1.5, margin: 0 });
    s9.addText(sc.revGrowth, { x: xPos, y: 3.2, w: 2.8, h: 0.5, fontSize: 30, fontFace: "Calibri Light", color: sc.color, margin: 0 });
    s9.addText("EBIT", { x: xPos, y: 3.8, w: 2.8, h: 0.2, fontSize: 11, fontFace: "Calibri", color: GRAY, charSpacing: 1.5, margin: 0 });
    s9.addText(sc.ebit, { x: xPos, y: 3.95, w: 2.8, h: 0.5, fontSize: 30, fontFace: "Calibri Light", color: sc.color, margin: 0 });
    s9.addText(sc.margin, { x: xPos, y: 4.45, w: 2.8, h: 0.3, fontSize: 15, fontFace: "Calibri", color: GOLD, margin: 0 });
  });
  footer(s9, 9);

  // SLIDE 10: CLOSING
  let s10 = pres.addSlide();
  s10.background = { color: BLACK };
  sectionTag(s10, "T H E   A S K");
  s10.addText("Approve the plan", { x: 0.6, y: 1.8, w: 9, h: 1.0, fontSize: 56, fontFace: "Calibri Light", color: WHITE, margin: 0 });
  s10.addText([
    { text: "The model is built, validated, and ready.", options: { breakLine: true } },
    { text: "We are requesting board approval to execute against the FY2027 budget as presented:" }
  ], { x: 0.6, y: 2.9, w: 8.5, h: 0.7, fontSize: 15, fontFace: "Calibri", color: GRAY, margin: 0 });
  s10.addShape(pres.shapes.LINE, { x: 0.6, y: 3.9, w: 8.8, h: 0, line: { color: LINE, width: 0.5 } });
  const closingStats = [
    { label: "REVENUE TARGET", value: "€13.3B" },
    { label: "OPERATING MARGIN", value: "20.0%" },
    { label: "NET INCOME", value: "€1.9B" },
    { label: "TIMELINE", value: "FY 2027" },
  ];
  closingStats.forEach((c, i) => {
    const xPos = 0.6 + i * 2.35;
    s10.addText(c.label, { x: xPos, y: 4.05, w: 2.2, h: 0.2, fontSize: 11, fontFace: "Calibri", color: GRAY, charSpacing: 1.5, margin: 0 });
    s10.addText(c.value, { x: xPos, y: 4.3, w: 2.2, h: 0.45, fontSize: 28, fontFace: "Calibri Light", color: WHITE, margin: 0 });
  });
  footer(s10, 10);

  await pres.writeFile({ fileName: "2027_Budget_Presentation.pptx" });
  console.log("Done!");
}

main().catch(console.error);
