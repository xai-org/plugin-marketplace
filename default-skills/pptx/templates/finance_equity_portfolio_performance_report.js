const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

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

// Generate a simple colored square PNG for legend use
async function colorSquarePng(hexColor, size = 64) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="6" fill="#${hexColor}"/></svg>`;
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

async function main() {
  const {
    FaChartLine, FaChartPie, FaShieldAlt, FaExchangeAlt, FaBalanceScale,
    FaGlobe, FaArrowUp, FaArrowDown, FaBullseye, FaCheckCircle,
    FaCalendarAlt, FaCogs, FaMicrochip, FaHeartbeat, FaShoppingCart,
    FaUniversity, FaIndustry, FaComments, FaAppleAlt, FaEllipsisH,
    FaLightbulb, FaRocket, FaStar
  } = require("react-icons/fa");

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Portfolio Management Team";
  pres.title = "Direct Equity Selection Strategy – Q1 2026 Investment Committee Report";

  // === COLOR PALETTE ===
  const C = {
    navy: "1A2744",
    darkNavy: "0F1B33",
    midBlue: "2B4B7E",
    accent: "3B82F6",
    accentLight: "60A5FA",
    accentDark: "2563EB",
    gold: "F59E0B",
    green: "10B981",
    red: "EF4444",
    white: "FFFFFF",
    offWhite: "F8FAFC",
    lightGray: "E2E8F0",
    medGray: "94A3B8",
    darkText: "1E293B",
    bodyText: "334155",
    subtleText: "64748B",
  };

  // Sector colors - consistent across slide 7
  const SECTOR_COLORS = {
    "Technology": C.accent,
    "Health Care": "10B981",
    "Cons. Disc.": "F59E0B",
    "Financials": C.midBlue,
    "Industrials": "8B5CF6",
    "Comm. Svc.": "EC4899",
    "Cons. Staples": "6366F1",
    "Other": C.medGray,
  };

  // Sector icons
  const SECTOR_ICONS = {
    "Technology": FaMicrochip,
    "Health Care": FaHeartbeat,
    "Cons. Disc.": FaShoppingCart,
    "Financials": FaUniversity,
    "Industrials": FaIndustry,
    "Comm. Svc.": FaComments,
    "Cons. Staples": FaAppleAlt,
    "Other": FaEllipsisH,
  };

  const makeShadow = () => ({ type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.12 });
  const FONT_H = "Georgia";
  const FONT_B = "Calibri";

  // Pre-render all sector icons
  const sectorIconData = {};
  for (const [name, icon] of Object.entries(SECTOR_ICONS)) {
    sectorIconData[name] = await iconToBase64Png(icon, "#" + SECTOR_COLORS[name], 256);
  }

  // Pre-render icons for slide 13 and 14
  const iconGlobe = await iconToBase64Png(FaGlobe, "#" + C.accentLight, 512);
  const iconRocket = await iconToBase64Png(FaRocket, "#" + C.accent, 256);
  const iconStar = await iconToBase64Png(FaStar, "#" + C.gold, 256);
  const iconShield = await iconToBase64Png(FaShieldAlt, "#" + C.green, 256);
  const iconBullseye = await iconToBase64Png(FaBullseye, "#" + C.accentLight, 256);
  const iconChart = await iconToBase64Png(FaChartLine, "#" + C.green, 256);
  const iconCheckCircle = await iconToBase64Png(FaCheckCircle, "#" + C.green, 256);

  // Helper: footer
  function addFooter(slide, text = "Confidential – For Investment Committee Use Only") {
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.15, w: 10, h: 0.475, fill: { color: C.navy } });
    slide.addText(text, { x: 0.5, y: 5.15, w: 9, h: 0.475, fontSize: 8, fontFace: FONT_B, color: C.medGray, valign: "middle" });
  }

  // Helper: top bar
  function addTopBar(slide, title) {
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.navy } });
    slide.addText(title, { x: 0.6, y: 0, w: 9, h: 0.9, fontSize: 22, fontFace: FONT_H, color: C.white, bold: true, valign: "middle", margin: 0 });
  }

  // =========================================
  // SLIDE 1: TITLE SLIDE (FIX #1 - more visually attractive)
  // =========================================
  let s1 = pres.addSlide();
  s1.background = { color: C.darkNavy };

  // Left accent bar
  s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.accent } });

  // Decorative geometric shapes on right side for visual interest
  s1.addShape(pres.shapes.RECTANGLE, { x: 7.5, y: -0.5, w: 3.5, h: 3.5, fill: { color: C.accent, transparency: 92 }, rotate: 25 });
  s1.addShape(pres.shapes.RECTANGLE, { x: 8.2, y: 0.3, w: 2.5, h: 2.5, fill: { color: C.accentLight, transparency: 88 }, rotate: 40 });
  s1.addShape(pres.shapes.RECTANGLE, { x: 7.0, y: 3.0, w: 4.0, h: 4.0, fill: { color: C.midBlue, transparency: 90 }, rotate: 15 });

  // Large chart icon watermark on the right
  s1.addImage({ data: await iconToBase64Png(FaChartLine, "#1E3A5F", 512), x: 7.2, y: 1.2, w: 2.8, h: 2.8 });

  // Thin horizontal line
  s1.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 3.55, w: 5.5, h: 0.004, fill: { color: C.accent, transparency: 40 } });

  s1.addText("Direct Equity\nSelection Strategy", { x: 0.8, y: 0.6, w: 6.5, h: 2.2, fontSize: 42, fontFace: FONT_H, color: C.white, bold: true, lineSpacingMultiple: 1.1, margin: 0 });
  s1.addText("Quarterly Investment Committee Report  |  Q1 2026", { x: 0.8, y: 2.7, w: 6, h: 0.5, fontSize: 16, fontFace: FONT_B, color: C.accentLight, margin: 0 });
  s1.addText("Prepared for the Beneficial Owners", { x: 0.8, y: 3.2, w: 6, h: 0.4, fontSize: 13, fontFace: FONT_B, color: C.medGray, margin: 0 });

  // Bottom area: date + KPI preview strip
  s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.2, w: 10, h: 1.425, fill: { color: C.navy, transparency: 50 } });
  s1.addText("April 10, 2026  |  Portfolio Management Team", { x: 0.8, y: 4.3, w: 5, h: 0.35, fontSize: 11, fontFace: FONT_B, color: C.medGray, margin: 0 });

  // Mini KPI teasers at the bottom
  const miniKPIs = [
    { label: "YTD", value: "+8.7%" },
    { label: "1-Year", value: "+22.4%" },
    { label: "Alpha (Ann.)", value: "+2.5%" },
  ];
  for (let i = 0; i < miniKPIs.length; i++) {
    const mx = 0.8 + i * 2.2;
    s1.addText(miniKPIs[i].label, { x: mx, y: 4.7, w: 1.8, h: 0.3, fontSize: 9, fontFace: FONT_B, color: C.medGray, margin: 0 });
    s1.addText(miniKPIs[i].value, { x: mx, y: 4.95, w: 1.8, h: 0.4, fontSize: 20, fontFace: FONT_H, color: C.green, bold: true, margin: 0 });
  }

  s1.addText("CONFIDENTIAL", { x: 7.5, y: 5.1, w: 2, h: 0.3, fontSize: 9, fontFace: FONT_B, color: C.medGray, align: "right", charSpacing: 4, margin: 0 });

  // =========================================
  // SLIDE 2: AGENDA
  // =========================================
  let s2 = pres.addSlide();
  s2.background = { color: C.offWhite };
  addTopBar(s2, "Agenda");

  const agenda = [
    ["01", "Strategy Overview", "Philosophy, objectives & investment universe", "3"],
    ["02", "Performance Summary", "Returns vs. S&P 500, attribution analysis", "4"],
    ["03", "Portfolio Snapshot", "Holdings, sector allocation & top positions", "6"],
    ["04", "Sector & Style Tilts", "Growth, quality, and technology exposure", "7"],
    ["05", "Valuation Multiples", "P/E, P/S, and portfolio vs. benchmark", "9"],
    ["06", "Risk Management", "Tracking error, drawdowns & diversification", "10"],
    ["07", "Recent Transactions", "Key buys and sells in Q1 2026", "12"],
    ["08", "Outlook & Positioning", "Forward guidance and portfolio adjustments", "13"],
  ];
  // Header row
  s2.addText("Item", { x: 0.6, y: 1.02, w: 0.55, h: 0.22, fontSize: 9, fontFace: FONT_B, color: C.medGray, valign: "middle", margin: 0 });
  s2.addText("Section", { x: 1.25, y: 1.02, w: 3.0, h: 0.22, fontSize: 9, fontFace: FONT_B, color: C.medGray, valign: "middle", margin: 0 });
  s2.addText("Description", { x: 4.3, y: 1.02, w: 4.3, h: 0.22, fontSize: 9, fontFace: FONT_B, color: C.medGray, valign: "middle", margin: 0 });
  s2.addText("Page", { x: 8.8, y: 1.02, w: 0.6, h: 0.22, fontSize: 9, fontFace: FONT_B, color: C.medGray, align: "right", valign: "middle", margin: 0 });
  s2.addShape(pres.shapes.LINE, { x: 0.6, y: 1.26, w: 8.8, h: 0, line: { color: "94A3B8", width: 1 } });

  for (let i = 0; i < agenda.length; i++) {
    const yBase = 1.35 + i * 0.46;
    s2.addText(agenda[i][0], { x: 0.6, y: yBase, w: 0.55, h: 0.42, fontSize: 16, fontFace: FONT_H, color: C.accent, bold: true, valign: "middle", margin: 0 });
    s2.addText(agenda[i][1], { x: 1.25, y: yBase, w: 3.0, h: 0.42, fontSize: 14, fontFace: FONT_B, color: C.darkText, bold: true, valign: "middle", margin: 0 });
    s2.addText(agenda[i][2], { x: 4.3, y: yBase, w: 4.3, h: 0.42, fontSize: 11, fontFace: FONT_B, color: C.subtleText, valign: "middle", margin: 0 });
    s2.addText(agenda[i][3], { x: 8.8, y: yBase, w: 0.6, h: 0.42, fontSize: 12, fontFace: FONT_B, color: C.medGray, align: "right", valign: "middle", margin: 0 });
    if (i < agenda.length - 1) {
      s2.addShape(pres.shapes.LINE, { x: 0.6, y: yBase + 0.46, w: 8.8, h: 0, line: { color: "94A3B8", width: 0.75 } });
    }
  }
  addFooter(s2);

  // =========================================
  // SLIDE 3: STRATEGY OVERVIEW (FIX #2 - objectives higher, better card spacing)
  // =========================================
  let s3 = pres.addSlide();
  s3.background = { color: C.offWhite };
  addTopBar(s3, "Strategy Overview");

  // Left column - description
  s3.addText("Investment Philosophy", { x: 0.6, y: 1.1, w: 4.5, h: 0.35, fontSize: 16, fontFace: FONT_H, color: C.darkText, bold: true, margin: 0 });
  s3.addText(
    "We seek to outperform the S&P 500 through a concentrated portfolio of 50–100 high-conviction U.S. equities. The strategy emphasizes companies with superior revenue growth, high operating margins, and durable competitive advantages, with a deliberate tilt toward technology and innovation-driven sectors.",
    { x: 0.6, y: 1.5, w: 4.3, h: 1.4, fontSize: 11, fontFace: FONT_B, color: C.bodyText, lineSpacingMultiple: 1.4, valign: "top", margin: 0 }
  );

  // Right column - key metrics cards - evenly distributed across available height
  const cards3 = [
    ["Benchmark", "S&P 500 TR"],
    ["Holdings", "50 – 100 stocks"],
    ["Style Tilt", "Growth / Quality"],
    ["Inception", "January 2018"],
  ];
  const cardStartY = 1.1;
  const cardEndY = 4.55; // just above objectives area
  const cardH = 0.65;
  const cardGap = (cardEndY - cardStartY - cards3.length * cardH) / (cards3.length - 1);
  for (let i = 0; i < cards3.length; i++) {
    const cx = 5.6;
    const cy = cardStartY + i * (cardH + cardGap);
    s3.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: 3.8, h: cardH, fill: { color: C.white }, shadow: makeShadow() });
    s3.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: 0.07, h: cardH, fill: { color: C.accent } });
    s3.addText(cards3[i][0], { x: cx + 0.25, y: cy, w: 1.5, h: cardH, fontSize: 10, fontFace: FONT_B, color: C.subtleText, valign: "middle", margin: 0 });
    s3.addText(cards3[i][1], { x: cx + 1.7, y: cy, w: 2.0, h: cardH, fontSize: 13, fontFace: FONT_B, color: C.darkText, bold: true, valign: "middle", margin: 0 });
  }

  // Objectives - moved higher, spanning full width
  s3.addText("Key Objectives", { x: 0.6, y: 3.1, w: 4.5, h: 0.35, fontSize: 14, fontFace: FONT_H, color: C.darkText, bold: true, margin: 0 });
  const objectives = [
    "Outperform S&P 500 by 200–400 bps annually over full market cycles",
    "Maintain tracking error between 3–6% for disciplined risk management",
    "Achieve superior risk-adjusted returns (Sharpe ratio > 1.0)",
  ];
  s3.addText(
    objectives.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < objectives.length - 1 } })),
    { x: 0.6, y: 3.5, w: 8.8, h: 1.2, fontSize: 11, fontFace: FONT_B, color: C.bodyText, paraSpaceAfter: 6, margin: 0 }
  );
  addFooter(s3);

  // =========================================
  // SLIDE 4: PERFORMANCE SUMMARY
  // =========================================
  let s4 = pres.addSlide();
  s4.background = { color: C.offWhite };
  addTopBar(s4, "Performance Summary");

  const kpis = [
    { label: "YTD Return", value: "+8.7%", sub: "vs. +6.2% S&P 500", color: C.green },
    { label: "1-Year Return", value: "+22.4%", sub: "vs. +18.1% S&P 500", color: C.green },
    { label: "Since Inception (Ann.)", value: "+14.8%", sub: "vs. +12.3% S&P 500", color: C.green },
    { label: "Excess Return (Ann.)", value: "+2.5%", sub: "Annualized alpha", color: C.accent },
  ];
  for (let i = 0; i < kpis.length; i++) {
    const kx = 0.5 + i * 2.32;
    s4.addShape(pres.shapes.RECTANGLE, { x: kx, y: 1.1, w: 2.15, h: 1.4, fill: { color: C.white }, shadow: makeShadow() });
    s4.addText(kpis[i].label, { x: kx, y: 1.15, w: 2.15, h: 0.35, fontSize: 9.5, fontFace: FONT_B, color: C.subtleText, align: "center", valign: "middle", margin: 0 });
    s4.addText(kpis[i].value, { x: kx, y: 1.45, w: 2.15, h: 0.55, fontSize: 28, fontFace: FONT_H, color: kpis[i].color, bold: true, align: "center", valign: "middle", margin: 0 });
    s4.addText(kpis[i].sub, { x: kx, y: 2.0, w: 2.15, h: 0.35, fontSize: 8.5, fontFace: FONT_B, color: C.subtleText, align: "center", valign: "middle", margin: 0 });
  }

  s4.addText("Cumulative Growth of $100 (Since Inception, Jan 2018)", { x: 0.6, y: 2.7, w: 8, h: 0.35, fontSize: 12, fontFace: FONT_B, color: C.darkText, bold: true, margin: 0 });
  // FIX #3 - no Arial: specify fontFace on all chart axis labels
  s4.addChart(pres.charts.LINE, [
    { name: "Strategy", labels: ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "Q1 2026"], values: [100, 118, 132, 172, 148, 178, 212, 248, 270] },
    { name: "S&P 500", labels: ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "Q1 2026"], values: [100, 112, 125, 158, 134, 160, 188, 218, 232] },
  ], {
    x: 0.4, y: 3.0, w: 9.2, h: 2.0,
    chartColors: [C.accent, C.medGray],
    lineSize: 2.5, lineSmooth: true,
    showLegend: true, legendPos: "b", legendFontSize: 9, legendColor: C.subtleText, legendFontFace: FONT_B,
    catAxisLabelColor: C.subtleText, catAxisLabelFontSize: 8, catAxisLabelFontFace: FONT_B,
    valAxisLabelColor: C.subtleText, valAxisLabelFontSize: 8, valAxisLabelFontFace: FONT_B,
    valGridLine: { color: C.lightGray, size: 0.5 }, catGridLine: { style: "none" },
    valAxisMinVal: 80,
    chartArea: { fill: { color: C.white }, roundedCorners: true },
  });
  s4.addText("Source: Internal portfolio accounting & Bloomberg. Data as of March 31, 2026. Past performance is not indicative of future results.", {
    x: 0.5, y: 4.85, w: 9, h: 0.25, fontSize: 7.5, fontFace: FONT_B, color: C.subtleText, italic: true, margin: 0
  });
  addFooter(s4);

  // =========================================
  // SLIDE 5: ANNUAL RETURNS
  // =========================================
  let s5 = pres.addSlide();
  s5.background = { color: C.offWhite };
  addTopBar(s5, "Year-by-Year Performance");

  s5.addChart(pres.charts.BAR, [
    { name: "Strategy", labels: ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "YTD '26"], values: [-2.1, 18.0, 11.8, 30.3, -14.0, 20.3, 19.1, 17.0, 8.7] },
    { name: "S&P 500", labels: ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "YTD '26"], values: [-4.4, 12.0, 11.5, 26.3, -16.1, 19.4, 17.5, 16.0, 6.2] },
  ], {
    x: 0.5, y: 1.1, w: 9, h: 3.4, barDir: "col", barGrouping: "clustered",
    showTitle: true, title: "Annual Returns (%)",  titleColor: C.darkText, titleFontSize: 12, titleFontFace: FONT_B,
    chartColors: [C.accent, C.lightGray],
    showLegend: true, legendPos: "t", legendFontSize: 9, legendColor: C.subtleText, legendFontFace: FONT_B,
    catAxisLabelColor: C.subtleText, catAxisLabelFontSize: 9, catAxisLabelFontFace: FONT_B,
    valAxisLabelColor: C.subtleText, valAxisLabelFontSize: 8, valAxisLabelFontFace: FONT_B,
    valGridLine: { color: C.lightGray, size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.darkText, dataLabelFontSize: 9, dataLabelFontFace: FONT_B,
    chartArea: { fill: { color: C.white }, roundedCorners: true },
  });

  s5.addText("The strategy has outperformed the benchmark in 7 of 8 full calendar years since inception, with particularly strong relative performance in growth-oriented markets.", {
    x: 0.6, y: 4.55, w: 8.8, h: 0.3, fontSize: 10, fontFace: FONT_B, color: C.bodyText, italic: true, margin: 0
  });
  s5.addText("Source: Internal portfolio accounting & Bloomberg. Data as of March 31, 2026.", {
    x: 0.6, y: 4.85, w: 8.8, h: 0.25, fontSize: 7.5, fontFace: FONT_B, color: C.subtleText, italic: true, margin: 0
  });
  addFooter(s5);

  // =========================================
  // SLIDE 6: TOP 10 HOLDINGS
  // =========================================
  let s6 = pres.addSlide();
  s6.background = { color: C.offWhite };
  addTopBar(s6, "Portfolio Snapshot – Top 10 Holdings");

  function weightFill(pctStr) {
    const v = parseFloat(pctStr);
    const min = 2.4, max = 5.8;
    const t = Math.max(0, Math.min(1, (v - min) / (max - min)));
    const r = Math.round(248 - t * 69), g = Math.round(250 - t * 56), b = Math.round(252 + t * 1);
    return r.toString(16).padStart(2,'0') + g.toString(16).padStart(2,'0') + b.toString(16).padStart(2,'0');
  }
  function ytdFill(pctStr) {
    const v = parseFloat(pctStr);
    if (v > 0) { const t = Math.min(v / 22, 1); return { bg: rgbHex2({r:Math.round(240-t*50),g:Math.round(252-t*12),b:Math.round(245-t*30)}), color: "047857" }; }
    if (v < 0) { const t = Math.min(Math.abs(v) / 22, 1); return { bg: rgbHex2({r:254,g:Math.round(226-t*30),b:Math.round(226-t*30)}), color: "DC2626" }; }
    return { bg: C.offWhite, color: C.bodyText };
  }
  function rgbHex2(o){return o.r.toString(16).padStart(2,'0')+o.g.toString(16).padStart(2,'0')+o.b.toString(16).padStart(2,'0');}
  const convBg = { "Very High": "86EFAC", "High": "BBF7D0", "Medium": "FDE68A" };
  const convTxt = { "Very High": "064E3B", "High": "047857", "Medium": "92400E" };

  // Sector icon lookup for the table
  const sectorIconMap = {"Technology":"Technology","Comm. Svc.":"Comm. Svc.","Cons. Disc.":"Cons. Disc.","Health Care":"Health Care","Financials":"Financials","Cons. Staples":"Cons. Staples"};

  // Cols: #, Company, Sector, Icon, Sub-Sector, Weight, YTD, Thesis, Conv
  const hOpt = (txt,al) => ({text:txt,options:{bold:true,color:C.white,fill:{color:C.navy},fontSize:9,fontFace:FONT_B,align:al||"center",valign:"middle"}});
  const s6H = [hOpt("#"), hOpt("Company","left"), hOpt("Sector","left"), hOpt(""), hOpt("Sub-Sector","left"), hOpt("Weight"), hOpt("YTD"), hOpt("Investment Thesis","left"), hOpt("Conv.")];

  const hRaw = [
    ["1","Microsoft","Technology","Cloud / AI","5.8%","+12.3%","PLACEHOLDER","V.High"],
    ["2","NVIDIA","Technology","AI / Datacenter","5.2%","+18.7%","Near-monopoly in AI training GPUs; data center demand accelerating","V.High"],
    ["3","Alphabet","Comm. Svc.","Digital Ads","4.6%","+9.1%","Unassailable search moat + Gemini AI + cloud growth inflection","High"],
    ["4","Amazon","Cons. Disc.","E-Commerce","4.3%","+15.2%","PLACEHOLDER","V.High"],
    ["5","Eli Lilly","Health Care","Pharma / GLP-1","3.8%","+7.4%","Blockbuster GLP-1 pipeline (Mounjaro/Zepbound) with $50B+ TAM","Medium"],
    ["6","Visa","Financials","Payments","3.2%","+6.8%","Global payments duopoly; secular shift from cash to digital","High"],
    ["7","ServiceNow","Technology","Cloud / SaaS","2.9%","+22.1%","Enterprise workflow automation leader; strong net retention","High"],
    ["8","Costco","Cons. Staples","Retail","2.7%","+4.3%","Membership loyalty model; defensive positioning with pricing power","Medium"],
    ["9","Broadcom","Technology","Semiconductors","2.5%","+14.6%","AI/networking chip demand surge; VMware integration upside","High"],
    ["10","UnitedHealth","Health Care","Insurance","2.4%","+3.1%","Largest U.S. insurer; Optum health services vertical integration","Medium"],
  ];

  // Map display conv labels
  const convMap = {"V.High":"Very High","High":"High","Medium":"Medium"};

  // j: 0=#, 1=Company, 2=Sector, 3=Sub-Sector, 4=Weight, 5=YTD, 6=Thesis, 7=Conv
  // But table has extra icon column at index 3, so: 0=#,1=Company,2=Sector,3=icon(empty),4=SubSector,5=Weight,6=YTD,7=Thesis,8=Conv
  const hData = [s6H, ...hRaw.map((r,i)=>{
    const base = i%2===0 ? C.offWhite : C.white;
    const sector = r[2];
    const convKey = convMap[r[7]] || r[7];
    // Build 9 cells: #, Company, Sector, IconPlaceholder, SubSector, Weight, YTD, Thesis, Conv
    const cells = [
      {text:r[0],options:{fontSize:8,fontFace:FONT_B,color:C.bodyText,fill:{color:base},align:"center",valign:"middle"}},
      {text:r[1],options:{fontSize:11,fontFace:FONT_B,color:C.darkText,bold:true,fill:{color:base},align:"left",valign:"middle"}},
      {text:sector,options:{fontSize:9,fontFace:FONT_B,color:C.bodyText,fill:{color:base},align:"left",valign:"middle"}},
      {text:"",options:{fontSize:8,fontFace:FONT_B,fill:{color:base},valign:"middle"}},
      {text:r[3],options:{fontSize:9,fontFace:FONT_B,color:C.bodyText,fill:{color:base},align:"left",valign:"middle"}},
      {text:r[4],options:{fontSize:10,fontFace:FONT_B,color:C.darkText,bold:true,fill:{color:weightFill(r[4])},align:"center",valign:"middle"}},
      (()=>{const yf=ytdFill(r[5]);return{text:r[5],options:{fontSize:10,fontFace:FONT_B,color:yf.color,bold:true,fill:{color:yf.bg},align:"center",valign:"middle"}};})(),
      {text:r[6],options:{fontSize:8.5,fontFace:FONT_B,color:C.subtleText,fill:{color:base},align:"left",valign:"middle"}},
      {text:convKey,options:{fontSize:9,fontFace:FONT_B,color:convTxt[convKey]||C.bodyText,bold:true,fill:{color:convBg[convKey]||base},align:"center",valign:"middle"}},
    ];
    return cells;
  })];

  const s6TY = 1.05;
  const s6RH = 0.33;
  s6.addTable(hData, {
    x:0.4, y:s6TY, w:9.2,
    colW:[0.23, 1.05, 0.86, 0.35, 1.05, 0.63, 0.63, 3.52, 0.74],
    border:{pt:0.5,color:C.lightGray},
    rowH:[0.27,...Array(10).fill(s6RH)],
    margin:[1,3,1,3],
  });

  // Place sector icons in col 3 (icon column)
  const s6IconX = 0.4 + 0.23 + 1.05 + 0.86 + 0.05;
  for(let i=0;i<hRaw.length;i++){
    const sector = hRaw[i][2];
    if(sectorIconData[sector]){
      const iy = s6TY + 0.27 + i*s6RH + 0.04;
      s6.addImage({data:sectorIconData[sector],x:s6IconX,y:iy,w:0.24,h:0.24});
    }
  }

  s6.addText([
    {text:"Top 10 = 37.4%  |  72 holdings  |  ",options:{fontSize:9,fontFace:FONT_B,color:C.subtleText}},
    {text:"V.High",options:{fontSize:9,fontFace:FONT_B,color:"064E3B",bold:true}},
    {text:"  ",options:{fontSize:9,fontFace:FONT_B,color:C.subtleText}},
    {text:"High",options:{fontSize:9,fontFace:FONT_B,color:"047857",bold:true}},
    {text:"  ",options:{fontSize:9,fontFace:FONT_B,color:C.subtleText}},
    {text:"Medium",options:{fontSize:9,fontFace:FONT_B,color:"92400E",bold:true}},
  ],{x:0.5,y:4.78,w:4.8,h:0.2,valign:"middle",margin:0});
  s6.addText("Source: Internal records. Data as of March 31, 2026.",{
    x:5.4,y:4.78,w:4.1,h:0.2,fontSize:9,fontFace:FONT_B,color:C.medGray,italic:true,align:"right",valign:"middle",margin:0
  });
  addFooter(s6);

  // =========================================
  // SLIDE 7: SECTOR ALLOCATION
  // =========================================
  let s7 = pres.addSlide();
  s7.background = { color: C.offWhite };
  addTopBar(s7, "Sector Allocation");

  s7.addText("Sector Weights",{x:0.4,y:0.98,w:3.5,h:0.3,fontSize:13,fontFace:FONT_H,color:C.darkText,bold:true,margin:0});

  const sectorNames = ["Technology","Health Care","Cons. Disc.","Financials","Industrials","Comm. Svc.","Cons. Staples","Other"];
  const sectorVals = [32,14,13,11,9,8,6,7];
  const sectorSP = [29,13,11,13,9,9,6,10];
  const sectorColorArr = sectorNames.map(n=>SECTOR_COLORS[n]);

  // Doughnut chart
  s7.addChart(pres.charts.DOUGHNUT, [{
    name:"Sectors", labels:sectorNames, values:sectorVals,
  }], {
    x:0.1, y:1.25, w:4.0, h:3.5,
    chartColors:sectorColorArr,
    showPercent:true, showLegend:false,
    dataLabelColor:C.white, dataLabelFontSize:12, dataLabelFontFace:FONT_B, dataLabelFontBold:true,
  });

  // Icons outside the doughnut at approximate sector positions
  // Doughnut center ~ (2.1, 2.75), radius ~ 1.5
  const cx7=2.1, cy7=3.0, r7=1.7;
  let cumAngle = 0;
  for (let i=0; i<sectorNames.length; i++) {
    const sliceAngle = (sectorVals[i]/100)*360;
    const midAngle = cumAngle + sliceAngle/2;
    const rad = (midAngle - 90) * Math.PI / 180;
    const ix = cx7 + r7 * Math.cos(rad) - 0.15;
    const iy = cy7 + r7 * Math.sin(rad) - 0.15;
    s7.addImage({ data:sectorIconData[sectorNames[i]], x:ix, y:iy, w:0.3, h:0.3 });
    cumAngle += sliceAngle;
  }

  // Active column conditional formatting helper
  function activeFill(delta) {
    if(delta>0){const t=Math.min(delta/3,1);return{r:Math.round(220-t*30),g:Math.round(252-t*10),b:Math.round(231-t*10)};}
    if(delta<0){const t=Math.min(Math.abs(delta)/3,1);return{r:Math.round(254-t*0),g:Math.round(226-t*30),b:Math.round(226-t*30)};}
    return{r:248,g:250,b:252};
  }
  function rgbHex(o){return o.r.toString(16).padStart(2,'0')+o.g.toString(16).padStart(2,'0')+o.b.toString(16).padStart(2,'0');}

  // Table
  s7.addText("Portfolio vs. S&P 500 by Sector", { x:4.3, y:1.0, w:5.5, h:0.35, fontSize:13, fontFace:FONT_H, color:C.darkText, bold:true, margin:0 });
  const s7H = [
    {text:"",options:{bold:true,color:C.white,fill:{color:C.navy},fontSize:9,fontFace:FONT_B}},
    {text:"Sector",options:{bold:true,color:C.white,fill:{color:C.navy},fontSize:10,fontFace:FONT_B,align:"left"}},
    {text:"Portfolio",options:{bold:true,color:C.white,fill:{color:C.navy},fontSize:10,fontFace:FONT_B,align:"center"}},
    {text:"S&P 500",options:{bold:true,color:C.white,fill:{color:C.navy},fontSize:10,fontFace:FONT_B,align:"center"}},
    {text:"Active",options:{bold:true,color:C.white,fill:{color:C.navy},fontSize:10,fontFace:FONT_B,align:"center"}},
  ];
  const s7Rows = sectorNames.map((name,i)=>{
    const delta = sectorVals[i]-sectorSP[i];
    const deltaStr = delta>0?`+${delta}%`:delta<0?`${delta}%`:"0%";
    const deltaColor = delta>0?C.green:delta<0?C.red:C.bodyText;
    const bg = i%2===0?C.offWhite:C.white;
    const actBg = rgbHex(activeFill(delta));
    return [
      {text:"",options:{fontSize:9,fontFace:FONT_B,fill:{color:bg},valign:"middle"}},
      {text:name,options:{fontSize:10.5,fontFace:FONT_B,color:C.darkText,bold:true,fill:{color:bg},align:"left",valign:"middle"}},
      {text:`${sectorVals[i]}%`,options:{fontSize:11,fontFace:FONT_B,color:C.accent,bold:true,fill:{color:bg},align:"center",valign:"middle"}},
      {text:`${sectorSP[i]}%`,options:{fontSize:10.5,fontFace:FONT_B,color:C.subtleText,fill:{color:bg},align:"center",valign:"middle"}},
      {text:deltaStr,options:{fontSize:10.5,fontFace:FONT_B,color:deltaColor,bold:true,fill:{color:actBg},align:"center",valign:"middle"}},
    ];
  });
  const s7TX=4.3, s7TY=1.3, s7RH=0.38;
  s7.addTable([s7H,...s7Rows], {
    x:s7TX, y:s7TY, w:5.3,
    colW:[0.45,1.5,1.0,1.0,0.85],
    border:{pt:0.5,color:C.lightGray},
    rowH:Array(9).fill(s7RH),
    margin:[2,5,2,5],
  });
  for(let i=0;i<sectorNames.length;i++){
    const iconY=s7TY+(i+1)*s7RH+0.04;
    s7.addImage({data:sectorIconData[sectorNames[i]],x:s7TX+0.08,y:iconY,w:0.28,h:0.28});
  }
  s7.addText("Source: Internal portfolio accounting & S&P Dow Jones Indices. Data as of March 31, 2026.",{
    x:0.6,y:4.85,w:8.8,h:0.25,fontSize:7.5,fontFace:FONT_B,color:C.medGray,italic:true,margin:0
  });
  addFooter(s7);

  // =========================================
  // SLIDE 8: STYLE & FACTOR TILTS - redesigned
  // =========================================
  let s8 = pres.addSlide();
  s8.background = { color: C.offWhite };
  addTopBar(s8, "Style & Factor Exposure");

  // Left accent bar on content area
  s8.addShape(pres.shapes.RECTANGLE, { x:0.5, y:1.05, w:0.06, h:3.75, fill:{color:C.accent} });

  s8.addChart(pres.charts.BAR, [
    { name:"Strategy", labels:["Rev. Growth","EPS Growth","Op. Margin","ROE","Debt/Assets"], values:[18.2,22.5,28.4,32.1,28] },
    { name:"S&P 500", labels:["Rev. Growth","EPS Growth","Op. Margin","ROE","Debt/Assets"], values:[8.4,12.1,19.8,22.4,42] },
  ], {
    x:0.7, y:1.05, w:5.0, h:3.7, barDir:"bar",
    chartColors:[C.accent,"A0AEC0"],
    showLegend:true, legendPos:"t", legendFontSize:9, legendColor:C.subtleText, legendFontFace:FONT_B,
    catAxisLabelColor:C.darkText, catAxisLabelFontSize:9.5, catAxisLabelFontFace:FONT_B,
    valAxisLabelColor:C.subtleText, valAxisLabelFontSize:8, valAxisLabelFontFace:FONT_B,
    valGridLine:{color:C.lightGray,size:0.5}, catGridLine:{style:"none"},
    showValue:true, dataLabelPosition:"outEnd", dataLabelColor:C.darkText, dataLabelFontSize:8.5, dataLabelFontFace:FONT_B,
    chartArea:{fill:{color:C.white},roundedCorners:true},
  });

  const s8Icon1 = await iconToBase64Png(FaChartLine, "#" + C.accent, 256);
  const s8Icon2 = await iconToBase64Png(FaShieldAlt, "#" + C.accentDark, 256);
  const s8Icon3 = await iconToBase64Png(FaBullseye, "#" + C.midBlue, 256);
  const tiltIcons = [s8Icon1, s8Icon2, s8Icon3];
  const tiltColors = [C.accent, C.accent, C.accent];
  const tilts = [
    { title:"Higher Growth", desc:"Revenue growth 2.2x the benchmark — focused on expanding TAMs and market leaders." },
    { title:"Superior Margins", desc:"Operating margins 43% above S&P 500 — pricing power and operational efficiency." },
    { title:"Lower Leverage", desc:"Debt-to-equity 34% below benchmark — financially resilient businesses." },
  ];
  for (let i=0;i<tilts.length;i++){
    const ty = 1.1 + i*1.3;
    s8.addShape(pres.shapes.RECTANGLE, { x:5.9, y:ty, w:3.7, h:1.0, fill:{color:C.white}, shadow:makeShadow() });
    s8.addShape(pres.shapes.RECTANGLE, { x:5.9, y:ty, w:0.07, h:1.0, fill:{color:tiltColors[i]} });
    s8.addImage({ data:tiltIcons[i], x:6.1, y:ty+0.2, w:0.45, h:0.45 });
    s8.addText(tilts[i].title, { x:6.65, y:ty+0.08, w:2.8, h:0.3, fontSize:12, fontFace:FONT_B, color:C.darkText, bold:true, margin:0 });
    s8.addText(tilts[i].desc, { x:6.65, y:ty+0.4, w:2.8, h:0.55, fontSize:9, fontFace:FONT_B, color:C.subtleText, lineSpacingMultiple:1.3, margin:0 });
  }
  s8.addText("Source: Bloomberg, FactSet. Data as of March 31, 2026. Growth rates are FY forward estimates (consensus).",{
    x:0.6,y:4.85,w:8.8,h:0.25,fontSize:7.5,fontFace:FONT_B,color:C.medGray,italic:true,margin:0
  });
  addFooter(s8);

  // =========================================
  // SLIDE 9: VALUATION MULTIPLES - redesigned
  // =========================================
  let s9 = pres.addSlide();
  s9.background = { color: C.offWhite };
  addTopBar(s9, "Valuation Multiples");

  // Big KPI comparison cards instead of just a chart
  const valMetrics = [
    { label:"Fwd P/E", strat:"24.3x", sp:"20.1x", delta:"+21%", color:C.accent },
    { label:"P/S", strat:"6.8x", sp:"3.2x", delta:"+113%", color:C.accent },
    { label:"EV/EBITDA", strat:"18.2x", sp:"14.8x", delta:"+23%", color:C.accent },
    { label:"PEG Ratio", strat:"1.25x", sp:"1.62x", delta:"-23%", color:C.green },
  ];
  for(let i=0;i<valMetrics.length;i++){
    const vx=0.5+i*2.32;
    s9.addShape(pres.shapes.RECTANGLE,{x:vx,y:1.1,w:2.15,h:1.6,fill:{color:C.white},shadow:makeShadow()});
    s9.addText(valMetrics[i].label,{x:vx,y:1.15,w:2.15,h:0.3,fontSize:11,fontFace:FONT_B,color:C.subtleText,align:"center",margin:0});
    s9.addText(valMetrics[i].strat,{x:vx,y:1.4,w:2.15,h:0.45,fontSize:26,fontFace:FONT_H,color:C.accent,bold:true,align:"center",margin:0});
    s9.addText("S&P: "+valMetrics[i].sp,{x:vx,y:1.85,w:2.15,h:0.3,fontSize:10.5,fontFace:FONT_B,color:C.bodyText,align:"center",margin:0});
    // Delta badge
    const isNeg = valMetrics[i].delta.startsWith("-");
    s9.addShape(pres.shapes.RECTANGLE,{x:vx+0.65,y:2.15,w:0.85,h:0.3,fill:{color:isNeg?"DCFCE7":"FEE2E2"}});
    s9.addText(valMetrics[i].delta,{x:vx+0.65,y:2.15,w:0.85,h:0.3,fontSize:10,fontFace:FONT_B,color:isNeg?"059669":"DC2626",bold:true,align:"center",valign:"middle",margin:0});
  }

  // Chart below
  s9.addChart(pres.charts.BAR, [
    { name:"Strategy", labels:["Fwd P/E","P/S","EV/EBITDA","PEG Ratio"], values:[24.3,6.8,18.2,1.25] },
    { name:"S&P 500", labels:["Fwd P/E","P/S","EV/EBITDA","PEG Ratio"], values:[20.1,3.2,14.8,1.62] },
  ], {
    x:0.4, y:2.85, w:5.5, h:1.95, barDir:"col",
    chartColors:[C.accent,C.lightGray],
    showLegend:true, legendPos:"t", legendFontSize:8, legendColor:C.subtleText, legendFontFace:FONT_B,
    catAxisLabelColor:C.subtleText, catAxisLabelFontSize:10, catAxisLabelFontFace:FONT_B,
    valAxisLabelColor:C.subtleText, valAxisLabelFontSize:8, valAxisLabelFontFace:FONT_B,
    valAxisNumFmt:"0.0",
    valGridLine:{color:C.lightGray,size:0.5}, catGridLine:{style:"none"},
    showValue:true, dataLabelPosition:"outEnd", dataLabelColor:C.darkText, dataLabelFontSize:9.5, dataLabelFontFace:FONT_B,
    dataLabelFormatCode:"0.0#",
    chartArea:{fill:{color:C.white},roundedCorners:true},
  });

  // Right: insight card
  s9.addShape(pres.shapes.RECTANGLE,{x:6.2,y:2.85,w:3.4,h:1.95,fill:{color:C.white},shadow:makeShadow()});
  s9.addShape(pres.shapes.RECTANGLE,{x:6.2,y:2.85,w:0.07,h:1.95,fill:{color:C.gold}});
  s9.addImage({data:iconStar,x:6.4,y:2.95,w:0.4,h:0.4});
  s9.addText("Key Insight",{x:6.85,y:2.95,w:2.6,h:0.4,fontSize:13,fontFace:FONT_H,color:C.darkText,bold:true,margin:0});
  s9.addText("On a growth-adjusted basis (PEG), the strategy is 23% cheaper than the S&P 500 — we pay less per unit of growth. The premium narrows as earnings growth materializes.",
    {x:6.45,y:3.4,w:3.0,h:1.25,fontSize:10.5,fontFace:FONT_B,color:C.bodyText,lineSpacingMultiple:1.35,margin:0}
  );
  s9.addText("Source: Bloomberg, FactSet consensus estimates. Data as of March 31, 2026.",{
    x:0.6,y:4.85,w:8.8,h:0.25,fontSize:7.5,fontFace:FONT_B,color:C.medGray,italic:true,margin:0
  });
  addFooter(s9);

  // =========================================
  // SLIDE 10: RISK METRICS - larger cards
  // =========================================
  let s10 = pres.addSlide();
  s10.background = { color: C.offWhite };
  addTopBar(s10, "Risk Management & Metrics");

  const riskMetrics = [
    { label:"Sharpe Ratio", value:"1.12", bench:"Benchmark: 0.92 (S&P 500)", valColor:"059669" },
    { label:"Tracking Error", value:"4.3%", bench:"Within target range: 3–6%", valColor:C.darkText },
    { label:"Max Drawdown", value:"-18.2%", bench:"S&P 500 drawdown: -22.8%", valColor:"059669" },
    { label:"Beta", value:"1.05", bench:"Slightly above market (1.0)", valColor:C.darkText },
    { label:"Information Ratio", value:"0.58", bench:"Top quartile among peers", valColor:"059669" },
    { label:"Active Share", value:"62%", bench:"High conviction threshold", valColor:C.darkText },
  ];
  for(let i=0;i<riskMetrics.length;i++){
    const col=i%3, row=Math.floor(i/3);
    const mx=0.4+col*3.15, my=1.15+row*1.85;
    s10.addShape(pres.shapes.RECTANGLE,{x:mx,y:my,w:2.95,h:1.65,fill:{color:C.white},shadow:makeShadow()});
    s10.addText(riskMetrics[i].label,{x:mx,y:my+0.12,w:2.95,h:0.35,fontSize:12,fontFace:FONT_B,color:C.darkText,bold:true,align:"center",margin:0});
    s10.addText(riskMetrics[i].value,{x:mx,y:my+0.45,w:2.95,h:0.6,fontSize:32,fontFace:FONT_H,color:riskMetrics[i].valColor,bold:true,align:"center",margin:0});
    s10.addText(riskMetrics[i].bench,{x:mx,y:my+1.1,w:2.95,h:0.4,fontSize:10.5,fontFace:FONT_B,color:C.subtleText,align:"center",margin:0});
  }
  s10.addText("All metrics within policy guidelines.  |  Source: Internal risk systems. Data as of March 31, 2026.",{
    x:0.5,y:4.85,w:9,h:0.25,fontSize:8,fontFace:FONT_B,color:C.medGray,italic:true,margin:0
  });
  addFooter(s10);

  // =========================================
  // SLIDE 11: INVESTMENT POLICIES - better space
  // =========================================
  let s11 = pres.addSlide();
  s11.background = { color: C.offWhite };
  addTopBar(s11, "Investment Policies & Guidelines");

  const policies = [
    ["Guideline", "Description", "Limit", "Current", "Status"],
    ["Single position max", "Limits concentration in any one stock", "≤ 7%", "5.8%", "✓"],
    ["Top 10 concentration", "Cap on combined top holdings weight", "≤ 45%", "37.4%", "✓"],
    ["Sector deviation", "Max over/underweight vs. benchmark", "± 10%", "+3% max", "✓"],
    ["Minimum holdings", "Ensures adequate diversification", "≥ 50", "72", "✓"],
    ["Maximum holdings", "Maintains high-conviction focus", "≤ 100", "72", "✓"],
    ["Cash max", "Limits uninvested capital drag", "≤ 5%", "2.1%", "✓"],
    ["Tracking error", "Controls deviation from benchmark", "3–6%", "4.3%", "✓"],
    ["Non-U.S. ADRs max", "Limits foreign equity exposure", "≤ 10%", "4.2%", "✓"],
  ];
  const polTable = policies.map((row,ri) => row.map((c,ci) => ({
    text:c,
    options:{
      fontSize: ri===0 ? 9 : (ci===1 ? 9 : 10),
      fontFace:FONT_B,
      bold: ri===0,
      italic: ci===1 && ri>0,
      color: ri===0 ? C.white : (ci===4&&ri>0 ? C.green : (ci===1&&ri>0 ? C.subtleText : C.bodyText)),
      fill:{color: ri===0 ? C.navy : (ri%2===0 ? C.white : C.offWhite)},
      align: ci<=1 ? "left" : "center",
      valign:"middle",
    }
  })));
  s11.addTable(polTable, {
    x:0.5, y:1.1, w:6.5,
    colW:[1.4,2.24,0.8,0.9,0.6],
    border:{pt:0.5,color:C.lightGray},
    rowH:Array(9).fill(0.42),
    margin:[3,5,3,5],
  });

  // Right: Compliance summary card
  s11.addShape(pres.shapes.RECTANGLE,{x:7.15,y:1.1,w:2.55,h:3.78,fill:{color:C.white},shadow:makeShadow()});
  s11.addShape(pres.shapes.RECTANGLE,{x:7.15,y:1.1,w:0.07,h:3.78,fill:{color:C.green}});
  s11.addImage({data:iconCheckCircle,x:7.8,y:1.35,w:1.1,h:1.1});
  s11.addText("FULLY\nCOMPLIANT",{x:7.35,y:2.55,w:2.15,h:0.7,fontSize:17,fontFace:FONT_H,color:C.green,bold:true,align:"center",lineSpacingMultiple:1.1,margin:0});
  s11.addText("8 of 8 guidelines met",{x:7.35,y:3.3,w:2.15,h:0.35,fontSize:11,fontFace:FONT_B,color:C.darkText,align:"center",margin:0});
  s11.addText("No waivers or exceptions\nhave been requested",{x:7.35,y:3.7,w:2.15,h:0.5,fontSize:10,fontFace:FONT_B,color:C.subtleText,align:"center",lineSpacingMultiple:1.3,margin:0});
  s11.addText("As of March 31, 2026",{x:7.35,y:4.3,w:2.15,h:0.3,fontSize:9,fontFace:FONT_B,color:C.medGray,align:"center",italic:true,margin:0});
  addFooter(s11);

  // =========================================
  // SLIDE 12: RECENT TRANSACTIONS
  // =========================================
  let s12 = pres.addSlide();
  s12.background = { color: C.offWhite };
  addTopBar(s12, "Key Transactions – Q1 2026");

  // Buys
  s12.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.2, w: 4.3, h: 0.4, fill: { color: "DCFCE7" } });
  s12.addText("NEW POSITIONS / ADDITIONS", { x: 0.7, y: 1.2, w: 4.0, h: 0.4, fontSize: 11, fontFace: FONT_B, color: C.green, bold: true, valign: "middle", margin: 0 });

  const buys = [
    ["Palantir Technologies", "+1.8%", "AI/enterprise analytics; strong gov't & commercial pipeline"],
    ["Intuitive Surgical", "+1.5%", "Robotic surgery leader; aging population tailwind"],
    ["CrowdStrike", "+1.2%", "Cybersecurity consolidation play; platform expansion"],
    ["Added to NVIDIA", "+0.8%", "Increased conviction on data center growth trajectory"],
  ];
  for (let i = 0; i < buys.length; i++) {
    const by = 1.75 + i * 0.55;
    if (i > 0) s12.addShape(pres.shapes.LINE, { x: 0.5, y: by - 0.02, w: 4.3, h: 0, line: { color: "94A3B8", width: 0.5 } });
    s12.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: by, w: 0.06, h: 0.45, fill: { color: C.green } });
    s12.addText(buys[i][0], { x: 0.7, y: by, w: 1.6, h: 0.45, fontSize: 10, fontFace: FONT_B, color: C.darkText, bold: true, valign: "middle", margin: 0 });
    s12.addText(buys[i][1], { x: 2.3, y: by, w: 0.7, h: 0.45, fontSize: 10, fontFace: FONT_B, color: C.green, bold: true, valign: "middle", margin: 0 });
    s12.addText(buys[i][2], { x: 3.0, y: by, w: 1.8, h: 0.45, fontSize: 8.5, fontFace: FONT_B, color: C.subtleText, valign: "middle", lineSpacingMultiple: 1.1, margin: 0 });
  }

  // Sells
  s12.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.2, w: 4.3, h: 0.4, fill: { color: "FEE2E2" } });
  s12.addText("EXITS / REDUCTIONS", { x: 5.4, y: 1.2, w: 4.0, h: 0.4, fontSize: 11, fontFace: FONT_B, color: C.red, bold: true, valign: "middle", margin: 0 });

  const sells = [
    ["Tesla", "−2.1%", "Margin compression; increased competition concerns"],
    ["PayPal", "−1.4%", "Competitive headwinds; redeployed to higher-conviction"],
    ["Intel", "−1.0%", "Foundry strategy uncertainty; execution risk"],
    ["Trimmed Apple", "−0.5%", "Valuation discipline; modest growth outlook"],
  ];
  for (let i = 0; i < sells.length; i++) {
    const sy = 1.75 + i * 0.55;
    if (i > 0) s12.addShape(pres.shapes.LINE, { x: 5.2, y: sy - 0.02, w: 4.3, h: 0, line: { color: "94A3B8", width: 0.5 } });
    s12.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: sy, w: 0.06, h: 0.45, fill: { color: C.red } });
    s12.addText(sells[i][0], { x: 5.4, y: sy, w: 1.45, h: 0.45, fontSize: 10, fontFace: FONT_B, color: C.darkText, bold: true, valign: "middle", margin: 0 });
    s12.addText(sells[i][1], { x: 6.85, y: sy, w: 0.7, h: 0.45, fontSize: 10, fontFace: FONT_B, color: C.red, bold: true, valign: "middle", margin: 0 });
    s12.addText(sells[i][2], { x: 7.55, y: sy, w: 1.95, h: 0.45, fontSize: 8.5, fontFace: FONT_B, color: C.subtleText, valign: "middle", lineSpacingMultiple: 1.1, margin: 0 });
  }

  // Turnover as styled cards
  const turnData = [
    { label:"Q1 Turnover", value:"8.2%", icon:"↻" },
    { label:"Annual. Turnover", value:"~28%", icon:"📊" },
    { label:"Net Buys", value:"$14.3M", icon:"💰" },
    { label:"Cash Position", value:"2.1%", icon:"🏦" },
  ];
  for(let i=0;i<turnData.length;i++){
    const tx=0.5+i*2.32;
    s12.addShape(pres.shapes.RECTANGLE,{x:tx,y:3.95,w:2.15,h:0.85,fill:{color:C.white},shadow:makeShadow()});
    s12.addText(turnData[i].label,{x:tx,y:3.98,w:2.15,h:0.25,fontSize:8.5,fontFace:FONT_B,color:C.subtleText,align:"center",margin:0});
    s12.addText(turnData[i].value,{x:tx,y:4.22,w:2.15,h:0.45,fontSize:18,fontFace:FONT_H,color:C.accent,bold:true,align:"center",margin:0});
  }
  s12.addText("Source: Internal trading records. Transactions executed January–March 2026.",{
    x:0.6,y:4.88,w:8.8,h:0.2,fontSize:7.5,fontFace:FONT_B,color:C.medGray,italic:true,margin:0
  });
  addFooter(s12);

  // =========================================
  // SLIDE 13: MARKET OUTLOOK - improved
  // =========================================
  let s13 = pres.addSlide();
  s13.background = { color: C.offWhite };
  addTopBar(s13, "Market Outlook & Portfolio Positioning");

  // Left panel with dark background
  s13.addShape(pres.shapes.RECTANGLE,{x:0.4,y:1.1,w:4.6,h:3.7,fill:{color:C.navy}});
  s13.addImage({data:iconGlobe,x:0.6,y:1.25,w:0.5,h:0.5});
  s13.addText("Macro Outlook",{x:1.15,y:1.25,w:3.5,h:0.4,fontSize:15,fontFace:FONT_H,color:C.white,bold:true,valign:"middle",margin:0});

  const outlook = [
    "U.S. GDP growth moderating to ~2.0%; economy remains positive",
    "Fed expected to hold rates through mid-2026; gradual easing in H2",
    "Corporate earnings growth robust at ~10% y/y; tech leading",
    "AI infrastructure spending continues as a secular growth driver",
    "Geopolitical risks warrant diversified positioning",
    "Inflation trending toward 2.5% target; shelter costs normalizing",
    "Credit spreads remain tight; no signs of imminent recession",
    "U.S. labor market resilient; unemployment steady near 4.0%",
    "PLACEHOLDER",
  ];
  s13.addText(
    outlook.map((t,i)=>({text:t,options:{bullet:true,breakLine:i<outlook.length-1,color:C.lightGray}})),
    {x:0.7,y:1.75,w:4.1,h:2.3,fontSize:10,fontFace:FONT_B,color:C.lightGray,paraSpaceAfter:2,margin:0}
  );

  // Bottom-left: macro data points inside dark panel - centered
  s13.addShape(pres.shapes.LINE,{x:0.75,y:4.15,w:3.9,h:0,line:{color:"334155",width:0.5}});
  const s13Stats = [
    {label:"GDP Growth", value:"~2.0%"},
    {label:"Fed Funds", value:"5.25%"},
    {label:"EPS Growth", value:"~10%"},
  ];
  for(let i=0;i<s13Stats.length;i++){
    const sx=0.75+i*1.4;
    s13.addText(s13Stats[i].label,{x:sx,y:4.2,w:1.3,h:0.2,fontSize:8,fontFace:FONT_B,color:C.medGray,align:"center",margin:0});
    s13.addText(s13Stats[i].value,{x:sx,y:4.38,w:1.3,h:0.3,fontSize:16,fontFace:FONT_H,color:C.white,bold:true,align:"center",margin:0});
  }

  // Right: positioning cards
  s13.addText("Portfolio Positioning",{x:5.3,y:1.1,w:4.5,h:0.3,fontSize:15,fontFace:FONT_H,color:C.darkText,bold:true,margin:0});

  const positions = [
    {action:"OVERWEIGHT",items:"AI infrastructure, cybersecurity,\nhealthcare innovation"},
    {action:"NEUTRAL",items:"Financials, industrials,\nconsumer staples"},
    {action:"UNDERWEIGHT",items:"Energy, utilities, REITs,\ntraditional media"},
  ];
  const posColors = [C.green, C.accent, C.red];
  const posIcons = [FaArrowUp, FaBalanceScale, FaArrowDown];
  // Distribute 3 cards to match left panel (y:1.1 to y:4.8, h=3.7)
  // Card h=1.05, gap=(3.7-3.15)/2=0.275
  for(let i=0;i<positions.length;i++){
    const py=1.45+i*1.13;
    const cardH=1.05;
    s13.addShape(pres.shapes.RECTANGLE,{x:5.3,y:py,w:4.35,h:cardH,fill:{color:C.white},shadow:makeShadow()});
    s13.addShape(pres.shapes.RECTANGLE,{x:5.3,y:py,w:0.07,h:cardH,fill:{color:posColors[i]}});
    const posIconData = await iconToBase64Png(posIcons[i],"#"+posColors[i],256);
    s13.addImage({data:posIconData,x:5.55,y:py+0.28,w:0.45,h:0.45});
    s13.addText(positions[i].action,{x:6.1,y:py,w:1.3,h:cardH,fontSize:11,fontFace:FONT_B,color:posColors[i],bold:true,valign:"middle",margin:0});
    s13.addText(positions[i].items,{x:7.3,y:py,w:2.25,h:cardH,fontSize:10,fontFace:FONT_B,color:C.bodyText,valign:"middle",lineSpacingMultiple:1.3,margin:0});
  }

  s13.addText("Forward-looking statements reflect the portfolio manager's current views and are subject to change.",{
    x:0.5,y:4.88,w:9,h:0.2,fontSize:7.5,fontFace:FONT_B,color:C.medGray,italic:true,margin:0
  });
  addFooter(s13);

  // =========================================
  // SLIDE 14: SUMMARY & KEY TAKEAWAYS (FIX #9 - complete redesign)
  // =========================================
  let s14 = pres.addSlide();
  s14.background = { color: C.darkNavy };

  // Left accent bar
  s14.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.accent } });

  // Decorative shapes (matching slide 1 for bookend effect)
  s14.addShape(pres.shapes.RECTANGLE, { x: 7.8, y: -0.3, w: 3.0, h: 3.0, fill: { color: C.accent, transparency: 93 }, rotate: 20 });
  s14.addShape(pres.shapes.RECTANGLE, { x: 8.5, y: 3.5, w: 2.5, h: 2.5, fill: { color: C.midBlue, transparency: 90 }, rotate: 35 });

  s14.addText("Key Takeaways", { x: 0.8, y: 0.35, w: 8, h: 0.55, fontSize: 30, fontFace: FONT_H, color: C.white, bold: true, margin: 0 });

  // Cards layout instead of plain numbered list
  const takeaways = [
    { icon: iconChart, title: "Strong Performance", desc: "+8.7% YTD vs. +6.2% S&P 500, with +2.5% annualized alpha since inception.", color: C.green },
    { icon: iconRocket, title: "Disciplined Process", desc: "All 72 holdings meet our quality criteria — higher growth, superior margins, strong balance sheets.", color: C.accent },
    { icon: iconShield, title: "Fully Compliant", desc: "Every investment guideline and risk limit is within policy. No exceptions or waivers requested.", color: C.green },
    { icon: iconBullseye, title: "Thoughtful Positioning", desc: "Added AI and cybersecurity exposure while trimming names with deteriorating fundamentals.", color: C.accentLight },
    { icon: iconStar, title: "Attractive Valuation", desc: "Despite a nominal P/E premium, the portfolio's PEG ratio is 23% below the benchmark.", color: C.gold },
  ];

  for (let i = 0; i < takeaways.length; i++) {
    const ty = 1.05 + i * 0.78;
    // Semi-transparent card background
    s14.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: ty, w: 9.1, h: 0.68, fill: { color: C.white, transparency: 90 } });
    s14.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: ty, w: 0.06, h: 0.68, fill: { color: takeaways[i].color } });

    // Icon
    s14.addImage({ data: takeaways[i].icon, x: 0.75, y: ty + 0.1, w: 0.45, h: 0.45 });

    // Title
    s14.addText(takeaways[i].title, { x: 1.35, y: ty + 0.03, w: 3.0, h: 0.3, fontSize: 13, fontFace: FONT_B, color: C.white, bold: true, margin: 0 });

    // Description
    s14.addText(takeaways[i].desc, { x: 1.35, y: ty + 0.32, w: 8.0, h: 0.33, fontSize: 10.5, fontFace: FONT_B, color: C.lightGray, margin: 0 });
  }

  // Bottom closing
  s14.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 5.0, w: 3.5, h: 0.003, fill: { color: C.accent, transparency: 50 } });
  s14.addText("Thank you for your continued trust and confidence.", { x: 0.8, y: 5.05, w: 8, h: 0.35, fontSize: 12, fontFace: FONT_B, color: C.medGray, italic: true, margin: 0 });

  // =========================================
  // Write file
  // =========================================
  await pres.writeFile({ fileName: "/home/assets/InvestmentCommittee_Q1_2026.pptx" });
  console.log("Done");
}

main().catch(e => { console.error(e); process.exit(1); });
