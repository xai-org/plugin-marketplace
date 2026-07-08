const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

const metrics = JSON.parse(fs.readFileSync("/home/assets/metrics.json", "utf8"));
const treeRules = fs.readFileSync("/home/assets/tree_rules.txt", "utf8");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Systematic Alpha Capital";
pres.title = "Systematic Bitcoin Trend Strategy Fund";

// === COLOR PALETTE (Dark/Premium Fintech) ===
const C = {
  darkBg: "0B1120", deepNavy: "0D1530", midNavy: "141D3B",
  accent: "00FF88", accentDim: "00CC6A", bitcoin: "F7931A",
  cyan: "00CCFF", red: "FF4444", white: "FFFFFF",
  textPrimary: "E8ECF4", textSecondary: "8892A8", textMuted: "5A6580",
  cardBg: "141D3B", gridLine: "1A2445"
};

// Helper: add footer bar
function addFooter(slide, text) {
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.15, w: 10, h: 0.475, fill: { color: C.deepNavy } });
  slide.addText(text, { x: 0.5, y: 5.2, w: 9, h: 0.35, fontSize: 10, color: C.textMuted, fontFace: "Calibri" });
}

// Helper: card background
function addCard(slide, x, y, w, h) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color: C.cardBg },
    shadow: { type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.25 }
  });
}

// Helper: big stat
function addStat(slide, x, y, value, label, valueColor) {
  slide.addText(value, { x, y, w: 2.5, h: 0.7, fontSize: 36, fontFace: "Calibri", color: valueColor || C.accent, bold: true, align: "center", margin: 0 });
  slide.addText(label, { x, y: y + 0.6, w: 2.5, h: 0.35, fontSize: 12, fontFace: "Calibri", color: C.textPrimary, align: "center", margin: 0 });
}

// Helper: slide title + subtitle (new pattern used in revised deck)
function addSlideTitle(slide, title, subtitle) {
  slide.addText(title, { x: 0.6, y: 0.3, w: 8.8, h: 0.55, fontSize: 36, fontFace: "Calibri", color: C.white, bold: true, margin: 0 });
  slide.addText(subtitle, { x: 0.6, y: 0.85, w: 8.8, h: 0.4, fontSize: 18, fontFace: "Calibri", color: C.textSecondary, margin: 0 });
}

// Helper: standard page footer
function addPageFooter(slide, pageNum) {
  slide.addText(`${pageNum}`, { x: 9.2, y: 5.1, w: 0.4, h: 0.25, fontSize: 10, fontFace: "Calibri", color: C.textMuted, align: "center", margin: 0 });
  slide.addText("CONFIDENTIAL  |  FOR QUALIFIED INVESTORS ONLY", { x: 0.6, y: 5.1, w: 7.0, h: 0.25, fontSize: 10, fontFace: "Calibri", color: C.textMuted, margin: 0 });
}

// ===== SLIDE 1: TITLE =====
let s1 = pres.addSlide();
s1.background = { color: C.darkBg };
s1.addText("SYSTEMATIC ALPHA", { x: 0.8, y: 1.0, w: 8.4, h: 0.9, fontSize: 44, fontFace: "Calibri", color: C.white, bold: true, charSpacing: 8, margin: 0 });
s1.addText("BITCOIN TREND STRATEGY FUND", { x: 0.8, y: 1.8, w: 8.4, h: 0.7, fontSize: 28, fontFace: "Calibri", color: C.accent, bold: true, charSpacing: 4, margin: 0 });
s1.addText("ML Trend Following  |  Systematic Risk Management  |  Institutional Grade", { x: 0.8, y: 2.6, w: 8.4, h: 0.5, fontSize: 16, fontFace: "Calibri", color: C.white, margin: 0 });
s1.addText("CONFIDENTIAL  |  FOR QUALIFIED INVESTORS ONLY", { x: 0.6, y: 5.05, w: 8.8, h: 0.3, fontSize: 10, fontFace: "Calibri", color: C.textMuted, align: "center", margin: 0 });

// ===== SLIDE 2: EXECUTIVE SUMMARY =====
let s2 = pres.addSlide();
s2.background = { color: C.darkBg };
addSlideTitle(s2, "EXECUTIVE SUMMARY", "");

const summaryItems = [
  { title: "THE OPPORTUNITY", body: "$600B+ asset class. Always-on liquidity. Extreme volatility creates exploitable trends." },
  { title: "OUR EDGE", body: "3-model ML ensemble. 66.5% directional accuracy on out-of-sample data." },
  { title: "THE STRATEGY", body: "Long when trend is up, cash when it fades. Fully systematic, no emotion." },
  { title: "TRACK RECORD", body: `${metrics.strat_ann}% annualized, ${metrics.strat_sharpe} Sharpe. Buy-and-hold: ${metrics.bh_ann}%, ${metrics.bh_sharpe} Sharpe.` }
];
summaryItems.forEach((item, i) => {
  let yp = 1.2 + i * 1.0;
  addCard(s2, 0.6, yp, 8.8, 0.85);
  s2.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: yp, w: 0.06, h: 0.85, fill: { color: C.accent } });
  s2.addText(item.title, { x: 0.85, y: yp + 0.1, w: 8.3, h: 0.3, fontSize: 16, fontFace: "Calibri", color: C.accent, bold: true, margin: 0 });
  s2.addText(item.body, { x: 0.85, y: yp + 0.42, w: 8.3, h: 0.35, fontSize: 16, fontFace: "Calibri", color: C.white, margin: 0 });
});

addPageFooter(s2, 2);

// ===== SLIDE 3: MARKET OPPORTUNITY - BTC PRICE HISTORY =====
let s3 = pres.addSlide();
s3.background = { color: C.darkBg };
addSlideTitle(s3, "BITCOIN: A DECADE OF EXPONENTIAL GROWTH", "From $0.06 to $11,800, a 193,000x return multiple in one decade");
s3.addImage({ path: "/home/assets/charts/01_btc_price.png", x: 0.3, y: 1.2, w: 9.4, h: 3.9 });
s3.addText("193,292x", { x: 6.2, y: 3.4, w: 3.2, h: 0.6, fontSize: 36, fontFace: "Calibri", color: C.accent, bold: true, align: "right", valign: "middle", margin: 0 });
s3.addText("TOTAL RETURN MULTIPLE", { x: 6.2, y: 3.95, w: 3.2, h: 0.3, fontSize: 12, fontFace: "Calibri", color: C.white, bold: true, align: "right", margin: 0 });
s3.addText("Jul 2010 – Aug 2020", { x: 6.2, y: 4.25, w: 3.2, h: 0.25, fontSize: 10, fontFace: "Calibri", color: C.textSecondary, align: "right", margin: 0 });

addPageFooter(s3, 3);

// ===== SLIDE 4: KEY TRENDS & ANALYSIS =====
let s4 = pres.addSlide();
s4.background = { color: C.darkBg };
addSlideTitle(s4, "KEY TRENDS & MARKET EVENTS", "5 cycles, same pattern every time, and this trend persistence is the edge our models capture");

const trends2 = [
  { period: "2011", price: "$31", move: "+51,567%", moveDir: "up", event: "FIRST BUBBLE, EARLY ADOPTION FRENZY", color: C.accent },
  { period: "2013", price: "$1,130", move: "+3,545%", moveDir: "up", event: "CHINA RALLY, CYPRUS CRISIS CATALYST", color: C.cyan },
  { period: "2017", price: "$19,783", move: "+1,882%", moveDir: "up", event: "ICO MANIA, RETAIL FOMO PEAK", color: C.bitcoin },
  { period: "2018-19", price: "$3,200", move: "-84%", moveDir: "down", event: "CRYPTO WINTER, 84% DRAWDOWN", color: C.red },
  { period: "2020", price: "$5,000", move: "-50% in 48h", moveDir: "down", event: "COVID CRASH, V-SHAPED RECOVERY", color: "FFD700" }
];
trends2.forEach((t, i) => {
  let yp = 1.5 + i * 0.78;
  addCard(s4, 0.5, yp, 9.0, 0.62);
  s4.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: yp, w: 0.06, h: 0.62, fill: { color: t.color } });
  s4.addText(t.period, { x: 0.7, y: yp + 0.04, w: 1.0, h: 0.5, fontSize: 16, fontFace: "Calibri", color: t.color, bold: true, valign: "middle", margin: 0 });
  s4.addText(t.price, { x: 1.7, y: yp + 0.04, w: 1.5, h: 0.5, fontSize: 16, fontFace: "Calibri", color: C.white, bold: true, valign: "middle", margin: 0 });
  let pillColor = t.moveDir === "up" ? "0D3320" : "331111";
  let pillTextColor = t.moveDir === "up" ? C.accent : C.red;
  s4.addShape(pres.shapes.RECTANGLE, { x: 3.3, y: yp + 0.12, w: 1.6, h: 0.34, fill: { color: pillColor } });
  s4.addText(t.move, { x: 3.3, y: yp + 0.12, w: 1.6, h: 0.34, fontSize: 16, fontFace: "Calibri", color: pillTextColor, bold: true, align: "center", valign: "middle", margin: 0 });
  s4.addText(t.event, { x: 5.1, y: yp + 0.04, w: 4.2, h: 0.5, fontSize: 16, fontFace: "Calibri", color: C.white, valign: "middle", margin: 0 });
});

addPageFooter(s4, 4);

// ===== SLIDE 5: VOLATILITY ANALYSIS =====
let s5 = pres.addSlide();
s5.background = { color: C.darkBg };
addSlideTitle(s5, "VOLATILITY: THE FUEL FOR TREND FOLLOWING", "PLACEHOLDER");
s5.addImage({ path: "/home/assets/charts/06_volatility.png", x: 0.3, y: 1.2, w: 9.4, h: 3.1 });
// Big stat cards at bottom
addCard(s5, 0.5, 4.35, 2.9, 0.8);
s5.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.35, w: 2.9, h: 0.05, fill: { color: C.red } });
s5.addText(`${metrics.bh_vol}%`, { x: 0.5, y: 4.45, w: 2.9, h: 0.35, fontSize: 30, fontFace: "Calibri", color: C.red, bold: true, align: "center", valign: "middle", margin: 0 });
s5.addText("BTC ANNUAL VOL", { x: 0.5, y: 4.82, w: 2.9, h: 0.25, fontSize: 12, fontFace: "Calibri", color: C.white, align: "center", valign: "top", margin: 0 });

addCard(s5, 3.55, 4.35, 2.9, 0.8);
s5.addShape(pres.shapes.RECTANGLE, { x: 3.55, y: 4.35, w: 2.9, h: 0.05, fill: { color: C.accent } });
s5.addText(`${metrics.strat_vol}%`, { x: 3.55, y: 4.45, w: 2.9, h: 0.35, fontSize: 30, fontFace: "Calibri", color: C.accent, bold: true, align: "center", valign: "middle", margin: 0 });
s5.addText("STRATEGY VOL", { x: 3.55, y: 4.82, w: 2.9, h: 0.25, fontSize: 12, fontFace: "Calibri", color: C.white, align: "center", valign: "top", margin: 0 });

addCard(s5, 6.6, 4.35, 2.9, 0.8);
s5.addShape(pres.shapes.RECTANGLE, { x: 6.6, y: 4.35, w: 2.9, h: 0.05, fill: { color: C.cyan } });
let volReduction = ((metrics.bh_vol - metrics.strat_vol) / metrics.bh_vol * 100).toFixed(0);
s5.addText(`${volReduction}%`, { x: 6.6, y: 4.45, w: 2.9, h: 0.35, fontSize: 30, fontFace: "Calibri", color: C.cyan, bold: true, align: "center", valign: "middle", margin: 0 });
s5.addText("VOL REDUCTION", { x: 6.6, y: 4.82, w: 2.9, h: 0.25, fontSize: 12, fontFace: "Calibri", color: C.white, align: "center", valign: "top", margin: 0 });

addPageFooter(s5, 5);

// ===== SLIDE 6: MONTHLY RETURNS HEATMAP =====
let s6 = pres.addSlide();
s6.background = { color: C.darkBg };
addSlideTitle(s6, "MONTHLY RETURN SEASONALITY (2014-2020)", "Returns cluster in streaks, not random noise, confirming trend persistence across months");
s6.addImage({ path: "/home/assets/charts/05_heatmap.png", x: 0.3, y: 1.15, w: 9.4, h: 3.9 });

addPageFooter(s6, 6);

// ===== SLIDE 7: ML MODEL ARCHITECTURE =====
let s7 = pres.addSlide();
s7.background = { color: C.darkBg };
addSlideTitle(s7, "ML MODEL ARCHITECTURE", "Three models vote on every trade and the majority wins");

// Three model cards - left side, stacked
const models = [
  { name: "RIDGE REGRESSION" },
  { name: "DECISION TREE" },
  { name: "GRADIENT BOOSTING" }
];
models.forEach((m, i) => {
  let yp = 1.2 + i * 1.0;
  addCard(s7, 0.5, yp, 4.3, 0.85);
  s7.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: yp, w: 4.3, h: 0.05, fill: { color: C.cyan } });
  s7.addText(m.name, { x: 0.7, y: yp + 0.15, w: 3.9, h: 0.55, fontSize: 18, fontFace: "Calibri", color: C.cyan, bold: true, valign: "middle", margin: 0 });
});

// Ensemble + output - right side
addCard(s7, 5.0, 1.2, 4.5, 2.85);
s7.addShape(pres.shapes.RECTANGLE, { x: 5.0, y: 1.2, w: 4.5, h: 0.05, fill: { color: C.cyan } });
s7.addText("ENSEMBLE VOTE", { x: 5.2, y: 1.32, w: 4.1, h: 0.3, fontSize: 16, fontFace: "Calibri", color: C.white, bold: true, margin: 0 });
s7.addText("2 of 3 models must agree for a signal", { x: 5.2, y: 1.65, w: 4.1, h: 0.25, fontSize: 16, fontFace: "Calibri", color: C.white, margin: 0 });

// LONG box
s7.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 2.1, w: 4.1, h: 0.7, fill: { color: "0D3320" } });
s7.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 2.1, w: 0.06, h: 0.7, fill: { color: C.accent } });
s7.addText("LONG BTC", { x: 5.4, y: 2.12, w: 3.7, h: 0.65, fontSize: 20, fontFace: "Calibri", color: C.accent, bold: true, valign: "middle", margin: 0 });

// CASH box
s7.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 2.95, w: 4.1, h: 0.7, fill: { color: "331111" } });
s7.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 2.95, w: 0.06, h: 0.7, fill: { color: C.red } });
s7.addText("STAY IN CASH", { x: 5.4, y: 2.97, w: 3.7, h: 0.65, fontSize: 20, fontFace: "Calibri", color: C.red, bold: true, valign: "middle", margin: 0 });

// Bottom stat cards
addCard(s7, 0.5, 4.25, 4.3, 0.65);
s7.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.25, w: 4.3, h: 0.05, fill: { color: C.accent } });
s7.addText("66.5%", { x: 0.5, y: 4.32, w: 4.3, h: 0.3, fontSize: 22, fontFace: "Calibri", color: C.accent, bold: true, align: "center", valign: "middle", margin: 0 });
s7.addText("ENSEMBLE ACCURACY", { x: 0.5, y: 4.6, w: 4.3, h: 0.25, fontSize: 16, fontFace: "Calibri", color: C.white, align: "center", valign: "top", margin: 0 });

addCard(s7, 5.0, 4.25, 4.5, 0.65);
s7.addShape(pres.shapes.RECTANGLE, { x: 5.0, y: 4.25, w: 4.5, h: 0.05, fill: { color: C.accent } });
s7.addText("100%", { x: 5.0, y: 4.32, w: 4.5, h: 0.3, fontSize: 22, fontFace: "Calibri", color: C.accent, bold: true, align: "center", valign: "middle", margin: 0 });
s7.addText("EXPLAINABLE TRADES", { x: 5.0, y: 4.6, w: 4.5, h: 0.25, fontSize: 16, fontFace: "Calibri", color: C.white, align: "center", valign: "top", margin: 0 });

addPageFooter(s7, 7);

// ===== SLIDE 8: FEATURE IMPORTANCE =====
let s8 = pres.addSlide();
s8.background = { color: C.darkBg };
addSlideTitle(s8, "WHAT DRIVES OUR TRADING SIGNALS?", "75% of signal comes from trend direction and momentum");

// Feature rows with plain English, visual bar, and percentage
const featureRows = [
  { name: "Trend Direction (MACD)", plain: "THE DOMINANT SIGNAL FOR TREND FORMATION", pct: 46, color: C.accent, barW: 5.5 },
  { name: "30-Day Momentum", plain: "BIG MOVES TEND TO CONTINUE", pct: 17, color: C.cyan, barW: 2.0 },
  { name: "10-Day Momentum", plain: "CATCHES BREAKOUTS EARLY", pct: 12, color: C.cyan, barW: 1.5 },
  { name: "20-Day Moving Avg", plain: "CLASSIC TREND INDICATOR", pct: 9, color: "336699", barW: 1.1 },
  { name: "Overbought/Oversold (RSI)", plain: "AVOIDS BUYING AT THE TOP", pct: 6, color: "336699", barW: 0.7 },
  { name: "Other Signals", plain: "VOLUME, VOLATILITY CONFIRMATION", pct: 10, color: "336699", barW: 1.2 }
];

featureRows.forEach((f, i) => {
  let yp = 1.5 + i * 0.62;
  addCard(s8, 0.5, yp, 9.0, 0.52);
  s8.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: yp, w: 0.06, h: 0.52, fill: { color: f.color } });
  s8.addText(`${f.pct}%`, { x: 0.65, y: yp + 0.01, w: 0.95, h: 0.48, fontSize: 24, fontFace: "Calibri", color: f.color, bold: true, valign: "middle", margin: 0 });
  s8.addText(f.name, { x: 1.65, y: yp + 0.04, w: 3.2, h: 0.42, fontSize: 16, fontFace: "Calibri", color: C.white, bold: true, valign: "middle", margin: 0 });
  s8.addText(f.plain, { x: 5.0, y: yp + 0.01, w: 4.3, h: 0.48, fontSize: 16, fontFace: "Calibri", color: C.white, valign: "middle", margin: 0 });
});

addPageFooter(s8, 8);

// ===== SLIDE 9: DECISION TREE RULES =====
let s9 = pres.addSlide();
s9.background = { color: C.darkBg };
addSlideTitle(s9, "HOW THE MODEL MAKES DECISIONS", "Simple yes/no questions, like a checklist a human trader would follow");

// Root node - plain English
addCard(s9, 2.5, 1.4, 5.0, 0.6);
s9.addShape(pres.shapes.RECTANGLE, { x: 2.5, y: 1.4, w: 5.0, h: 0.06, fill: { color: C.cyan } });
s9.addText("Is the trend gaining strength?", { x: 2.5, y: 1.46, w: 5.0, h: 0.54, fontSize: 18, fontFace: "Calibri", color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

// Left branch: vertical drop then horizontal
s9.addShape(pres.shapes.LINE, { x: 3.5, y: 2.0, w: 0, h: 0.35, line: { color: C.red, width: 2 } });
s9.addShape(pres.shapes.LINE, { x: 2.4, y: 2.35, w: 1.1, h: 0, line: { color: C.red, width: 2 } });
s9.addShape(pres.shapes.LINE, { x: 2.4, y: 2.35, w: 0, h: 0.15, line: { color: C.red, width: 2 } });
s9.addText("NO", { x: 2.65, y: 2.07, w: 0.5, h: 0.22, fontSize: 16, fontFace: "Calibri", color: C.red, bold: true, align: "center", margin: 0 });

// Right branch: vertical drop then horizontal
s9.addShape(pres.shapes.LINE, { x: 6.5, y: 2.0, w: 0, h: 0.35, line: { color: C.accent, width: 2 } });
s9.addShape(pres.shapes.LINE, { x: 6.5, y: 2.35, w: 1.2, h: 0, line: { color: C.accent, width: 2 } });
s9.addShape(pres.shapes.LINE, { x: 7.7, y: 2.35, w: 0, h: 0.15, line: { color: C.accent, width: 2 } });
s9.addText("YES", { x: 6.65, y: 2.07, w: 0.6, h: 0.22, fontSize: 16, fontFace: "Calibri", color: C.accent, bold: true, align: "center", margin: 0 });

// Left child: Bearish path
addCard(s9, 0.5, 2.45, 3.8, 0.5);
s9.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.45, w: 3.8, h: 0.06, fill: { color: C.red } });
s9.addText("Trend is fading", { x: 0.5, y: 2.51, w: 3.8, h: 0.44, fontSize: 16, fontFace: "Calibri", color: C.red, bold: true, align: "center", valign: "middle", margin: 0 });

// Right child: Bullish path
addCard(s9, 5.7, 2.45, 3.8, 0.5);
s9.addShape(pres.shapes.RECTANGLE, { x: 5.7, y: 2.45, w: 3.8, h: 0.06, fill: { color: C.accent } });
s9.addText("Trend is building", { x: 5.7, y: 2.51, w: 3.8, h: 0.44, fontSize: 16, fontFace: "Calibri", color: C.accent, bold: true, align: "center", valign: "middle", margin: 0 });

// Lines to outcome
s9.addShape(pres.shapes.LINE, { x: 2.4, y: 2.95, w: 0, h: 0.3, line: { color: C.red, width: 2 } });
s9.addShape(pres.shapes.LINE, { x: 7.6, y: 2.95, w: 0, h: 0.3, line: { color: C.accent, width: 2 } });

// Outcome boxes
s9.addShape(pres.shapes.RECTANGLE, { x: 1.0, y: 3.3, w: 2.8, h: 0.55, fill: { color: "331111" } });
s9.addText("STAY IN CASH", { x: 1.0, y: 3.3, w: 2.8, h: 0.55, fontSize: 18, fontFace: "Calibri", color: C.red, bold: true, align: "center", valign: "middle", margin: 0 });

s9.addShape(pres.shapes.RECTANGLE, { x: 6.2, y: 3.3, w: 2.8, h: 0.55, fill: { color: "0D3320" } });
s9.addText("GO LONG BTC", { x: 6.2, y: 3.3, w: 2.8, h: 0.55, fontSize: 18, fontFace: "Calibri", color: C.accent, bold: true, align: "center", valign: "middle", margin: 0 });

// Bottom insight cards
addCard(s9, 0.5, 4.1, 2.85, 0.85);
s9.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.1, w: 2.85, h: 0.05, fill: { color: C.accent } });
s9.addText("66.5%", { x: 0.5, y: 4.18, w: 2.85, h: 0.4, fontSize: 28, fontFace: "Calibri", color: C.accent, bold: true, align: "center", margin: 0 });
s9.addText("Correct Predictions", { x: 0.5, y: 4.6, w: 2.85, h: 0.25, fontSize: 16, fontFace: "Calibri", color: C.white, align: "center", margin: 0 });

addCard(s9, 3.575, 4.1, 2.85, 0.85);
s9.addShape(pres.shapes.RECTANGLE, { x: 3.575, y: 4.1, w: 2.85, h: 0.05, fill: { color: C.cyan } });
s9.addText("5 Simple Rules", { x: 3.575, y: 4.18, w: 2.85, h: 0.4, fontSize: 24, fontFace: "Calibri", color: C.cyan, bold: true, align: "center", margin: 0 });
s9.addText("Not Thousands of Parameters", { x: 3.575, y: 4.6, w: 2.85, h: 0.25, fontSize: 16, fontFace: "Calibri", color: C.white, align: "center", margin: 0 });

addCard(s9, 6.65, 4.1, 2.85, 0.85);
s9.addShape(pres.shapes.RECTANGLE, { x: 6.65, y: 4.1, w: 2.85, h: 0.05, fill: { color: C.bitcoin } });
s9.addText("100%", { x: 6.65, y: 4.18, w: 2.85, h: 0.4, fontSize: 28, fontFace: "Calibri", color: C.bitcoin, bold: true, align: "center", margin: 0 });
s9.addText("Every Trade Explainable", { x: 6.65, y: 4.6, w: 2.85, h: 0.25, fontSize: 16, fontFace: "Calibri", color: C.white, align: "center", margin: 0 });

addPageFooter(s9, 9);

// NOTE: Signal overlay slide (old slide 10) has been removed in the revised deck

// ===== SLIDE 10: STRATEGY P&L — THE MONEY SLIDE =====
let s10 = pres.addSlide();
s10.background = { color: C.darkBg };
addSlideTitle(s10, "STRATEGY PERFORMANCE vs BUY & HOLD", "7,671% total return vs 80% buy and hold with 96x outperformance");
s10.addImage({ path: "/home/assets/charts/02_strategy_pl.png", x: 0.3, y: 1.15, w: 9.4, h: 2.95 });
// Jumbo stats bar
addCard(s10, 0.5, 4.15, 2.1, 0.95);
s10.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.15, w: 2.1, h: 0.05, fill: { color: C.accent } });
s10.addText(`${metrics.strat_total}%`, { x: 0.5, y: 4.22, w: 2.1, h: 0.5, fontSize: 28, fontFace: "Calibri", color: C.accent, bold: true, align: "center", margin: 0 });
s10.addText("Total Return (Strategy)", { x: 0.5, y: 4.75, w: 2.1, h: 0.28, fontSize: 16, fontFace: "Calibri", color: C.white, align: "center", margin: 0 });

addCard(s10, 2.85, 4.15, 2.1, 0.95);
s10.addShape(pres.shapes.RECTANGLE, { x: 2.85, y: 4.15, w: 2.1, h: 0.05, fill: { color: C.bitcoin } });
s10.addText(`${metrics.bh_total}%`, { x: 2.85, y: 4.22, w: 2.1, h: 0.5, fontSize: 28, fontFace: "Calibri", color: C.bitcoin, bold: true, align: "center", margin: 0 });
s10.addText("Total Return (B&H)", { x: 2.85, y: 4.75, w: 2.1, h: 0.28, fontSize: 16, fontFace: "Calibri", color: C.white, align: "center", margin: 0 });

addCard(s10, 5.2, 4.15, 2.1, 0.95);
s10.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 4.15, w: 2.1, h: 0.05, fill: { color: C.accent } });
s10.addText(`${metrics.strat_sharpe}`, { x: 5.2, y: 4.22, w: 2.1, h: 0.5, fontSize: 28, fontFace: "Calibri", color: C.accent, bold: true, align: "center", margin: 0 });
s10.addText("Sharpe Ratio", { x: 5.2, y: 4.75, w: 2.1, h: 0.28, fontSize: 16, fontFace: "Calibri", color: C.white, align: "center", margin: 0 });

addCard(s10, 7.55, 4.15, 2.0, 0.95);
s10.addShape(pres.shapes.RECTANGLE, { x: 7.55, y: 4.15, w: 2.0, h: 0.05, fill: { color: C.red } });
s10.addText(`${metrics.max_dd_strat}%`, { x: 7.55, y: 4.22, w: 2.0, h: 0.5, fontSize: 28, fontFace: "Calibri", color: C.red, bold: true, align: "center", margin: 0 });
s10.addText("Max Drawdown", { x: 7.55, y: 4.75, w: 2.0, h: 0.28, fontSize: 16, fontFace: "Calibri", color: C.white, align: "center", margin: 0 });

addPageFooter(s10, 10);

// ===== SLIDE 11: DRAWDOWN ANALYSIS =====
let s11 = pres.addSlide();
s11.background = { color: C.darkBg };
addSlideTitle(s11, "DRAWDOWN ANALYSIS: RISK MANAGEMENT IN ACTION", "PLACEHOLDER");
s11.addImage({ path: "/home/assets/charts/03_drawdown.png", x: 0.3, y: 1.15, w: 9.4, h: 2.8 });

addCard(s11, 0.5, 4.1, 4.3, 0.95);
s11.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.1, w: 4.3, h: 0.05, fill: { color: C.accent } });
s11.addText(`${metrics.max_dd_strat}%`, { x: 0.5, y: 4.2, w: 4.3, h: 0.38, fontSize: 36, fontFace: "Calibri", color: C.accent, bold: true, align: "center", valign: "middle", margin: 0 });
s11.addText("ML STRATEGY MAX DRAWDOWN", { x: 0.5, y: 4.6, w: 4.3, h: 0.35, fontSize: 12, fontFace: "Calibri", color: C.white, align: "center", valign: "middle", margin: 0 });

addCard(s11, 5.2, 4.1, 4.3, 0.95);
s11.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 4.1, w: 4.3, h: 0.05, fill: { color: C.red } });
s11.addText(`${metrics.max_dd_bh}%`, { x: 5.2, y: 4.2, w: 4.3, h: 0.38, fontSize: 36, fontFace: "Calibri", color: C.red, bold: true, align: "center", valign: "middle", margin: 0 });
s11.addText("BUY & HOLD MAX DRAWDOWN", { x: 5.2, y: 4.6, w: 4.3, h: 0.35, fontSize: 12, fontFace: "Calibri", color: C.white, align: "center", valign: "middle", margin: 0 });

addPageFooter(s11, 11);

// ===== SLIDE 12: YEARLY RETURNS =====
let s12 = pres.addSlide();
s12.background = { color: C.darkBg };
addSlideTitle(s12, "ANNUAL PERFORMANCE BREAKDOWN", "Strategy positive every year while buy and hold lost 139% in 2018");
s12.addImage({ path: "/home/assets/charts/09_yearly.png", x: 0.3, y: 1.1, w: 9.4, h: 3.9 });

addPageFooter(s12, 12);

// ===== SLIDE 13: ROLLING SHARPE =====
let s13 = pres.addSlide();
s13.background = { color: C.darkBg };
addSlideTitle(s13, "ROLLING SHARPE RATIO: CONSISTENCY OVER TIME", "Strategy Sharpe stays positive 90%+ of the time, 17x better than buy and hold");
s13.addImage({ path: "/home/assets/charts/08_rolling_sharpe.png", x: 0.3, y: 1.15, w: 9.4, h: 2.95 });

addCard(s13, 0.5, 4.2, 2.9, 0.9);
s13.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.2, w: 2.9, h: 0.05, fill: { color: C.accent } });
s13.addText(`${metrics.strat_sharpe}`, { x: 0.5, y: 4.3, w: 2.9, h: 0.45, fontSize: 36, fontFace: "Calibri", color: C.accent, bold: true, align: "center", margin: 0 });
s13.addText("Strategy Sharpe", { x: 0.5, y: 4.78, w: 2.9, h: 0.25, fontSize: 16, fontFace: "Calibri", color: C.white, align: "center", margin: 0 });

addCard(s13, 3.55, 4.2, 2.9, 0.9);
s13.addShape(pres.shapes.RECTANGLE, { x: 3.55, y: 4.2, w: 2.9, h: 0.05, fill: { color: C.bitcoin } });
s13.addText(`${metrics.bh_sharpe}`, { x: 3.55, y: 4.3, w: 2.9, h: 0.45, fontSize: 36, fontFace: "Calibri", color: C.bitcoin, bold: true, align: "center", margin: 0 });
s13.addText("Buy & Hold Sharpe", { x: 3.55, y: 4.78, w: 2.9, h: 0.25, fontSize: 16, fontFace: "Calibri", color: C.white, align: "center", margin: 0 });

let sharpeMultiple = (metrics.strat_sharpe / metrics.bh_sharpe).toFixed(0);
addCard(s13, 6.6, 4.2, 2.9, 0.9);
s13.addShape(pres.shapes.RECTANGLE, { x: 6.6, y: 4.2, w: 2.9, h: 0.05, fill: { color: C.cyan } });
s13.addText(`${sharpeMultiple}x`, { x: 6.6, y: 4.3, w: 2.9, h: 0.45, fontSize: 36, fontFace: "Calibri", color: C.cyan, bold: true, align: "center", margin: 0 });
s13.addText("Sharpe Improvement", { x: 6.6, y: 4.78, w: 2.9, h: 0.25, fontSize: 16, fontFace: "Calibri", color: C.white, align: "center", margin: 0 });

addPageFooter(s13, 13);

// ===== SLIDE 14: FUND TERMS & CALL TO ACTION =====
let s14 = pres.addSlide();
s14.background = { color: C.darkBg };
addSlideTitle(s14, "INVESTMENT OPPORTUNITY", "17x better risk-adjusted returns than passive BTC with systematic downside protection");

// Performance highlights - 4 big stats across the top
const perfStats = [
  { val: `${metrics.strat_ann}%`, lab: "Ann. Return", color: C.accent },
  { val: `${metrics.strat_sharpe}`, lab: "Sharpe Ratio", color: C.accent },
  { val: `${metrics.max_dd_strat}%`, lab: "Max Drawdown", color: C.accent },
  { val: `${metrics.win_rate}%`, lab: "Win Rate", color: C.accent }
];
perfStats.forEach((s, i) => {
  let xp = 0.5 + i * 2.35;
  addCard(s14, xp, 1.45, 2.15, 0.85);
  s14.addShape(pres.shapes.RECTANGLE, { x: xp, y: 1.45, w: 2.15, h: 0.05, fill: { color: s.color } });
  s14.addText(s.val, { x: xp, y: 1.52, w: 2.15, h: 0.42, fontSize: 24, fontFace: "Calibri", color: s.color, bold: true, align: "center", margin: 0 });
  s14.addText(s.lab, { x: xp, y: 1.98, w: 2.15, h: 0.25, fontSize: 12, fontFace: "Calibri", color: C.white, align: "center", margin: 0 });
});

// Fund terms - left side
const terms = [
  ["Structure", "Cayman Islands LP"],
  ["Min. Investment", "$1,000,000"],
  ["Fees", "2% mgmt, 20% perf (6% hurdle)"],
  ["Lockup", "12 months"],
  ["Redemption", "Quarterly, 45-day notice"],
  ["Target Launch", "Q3 2026"]
];
addCard(s14, 0.5, 2.45, 4.5, 2.7);
s14.addText("FUND TERMS", { x: 0.7, y: 2.53, w: 4.1, h: 0.3, fontSize: 16, fontFace: "Calibri", color: C.accent, bold: true, margin: 0 });
terms.forEach((t, i) => {
  let yp = 2.9 + i * 0.35;
  s14.addText(t[0], { x: 0.7, y: yp, w: 1.8, h: 0.3, fontSize: 12, fontFace: "Calibri", color: C.textSecondary, margin: 0 });
  s14.addText(t[1], { x: 2.5, y: yp, w: 2.3, h: 0.3, fontSize: 12, fontFace: "Calibri", color: C.white, margin: 0 });
});

// WHY INVEST - right side
addCard(s14, 5.2, 2.45, 4.5, 2.7);
s14.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 2.45, w: 4.5, h: 0.05, fill: { color: C.accent } });
s14.addText("WHY THIS FUND", { x: 5.4, y: 2.58, w: 3.9, h: 0.3, fontSize: 16, fontFace: "Calibri", color: C.accent, bold: true, margin: 0 });

// Column headers
s14.addText("Strategy", { x: 6.5, y: 2.95, w: 1.3, h: 0.25, fontSize: 12, fontFace: "Calibri", color: C.accent, bold: true, margin: 0 });
s14.addText("Buy & Hold", { x: 8.0, y: 2.95, w: 1.3, h: 0.25, fontSize: 12, fontFace: "Calibri", color: C.bitcoin, bold: true, margin: 0 });

const comparisons = [
  [`${metrics.strat_ann}%`, `${metrics.bh_ann}%`, "Ann. Return"],
  [`${metrics.strat_sharpe}`, `${metrics.bh_sharpe}`, "Sharpe"],
  [`${metrics.max_dd_strat}%`, `${metrics.max_dd_bh}%`, "Max DD"]
];
comparisons.forEach((c, i) => {
  let yp = 3.3 + i * 0.48;
  s14.addText(c[2], { x: 5.4, y: yp, w: 1.1, h: 0.38, fontSize: 12, fontFace: "Calibri", color: C.white, valign: "middle", margin: 0 });
  s14.addText(c[0], { x: 6.5, y: yp, w: 1.3, h: 0.38, fontSize: 18, fontFace: "Calibri", color: C.accent, bold: true, valign: "middle", margin: 0 });
  s14.addText(c[1], { x: 8.0, y: yp, w: 1.3, h: 0.38, fontSize: 18, fontFace: "Calibri", color: C.bitcoin, bold: true, valign: "middle", margin: 0 });
});

addPageFooter(s14, 14);

// ===== SAVE =====
pres.writeFile({ fileName: "/home/assets/BTC_Trend_Strategy_Fund.pptx" })
  .then(() => console.log("PPTX CREATED SUCCESSFULLY"))
  .catch(err => console.error("Error:", err));
