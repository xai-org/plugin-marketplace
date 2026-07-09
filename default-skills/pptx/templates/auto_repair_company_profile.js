// Brian's Auto Repair — Deck Replica
// Generated using pptxgenjs
// Run: npm install pptxgenjs && node generate_deck.js

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.author = "Brian's Auto Repair";
pres.title = "Brian's Auto Repair";

// Custom slide size: 20" x 11.25" (matches the original deck)
pres.defineLayout({ name: "CUSTOM_20x11", width: 20, height: 11.25 });
pres.layout = "CUSTOM_20x11";

let slide;

// ===== Slide 1 =====
slide = pres.addSlide();
slide.background = { color: "141210" };
slide.addText([
  { text: "Brian's — est. 2018", options: { fontSize: 27.0, italic: true, fontFace: "Georgia", color: "F4EFE6" } }
], {
  x: 1.0417, y: 0.625, w: 3.291, h: 0.4688, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Georgia"
});
slide.addText([
  { text: "MIAMI BEACH, FL EUROPEAN MARQUES", options: { fontSize: 18.0, fontFace: "Consolas", color: "C7C3BB", charSpacing: 2.88 } }
], {
  x: 15.8266, y: 0.625, w: 3.1317, h: 0.8916, margin: 0, fit: "shrink", valign: "top", align: "right", lineSpacingMultiple: 1.7, fontFace: "Consolas"
});
slide.addText([
  { text: "Brian's ", options: { fontSize: 180.0, fontFace: "Georgia", color: "F4EFE6", charSpacing: -3.6 } },
  { text: "Auto ", options: { fontSize: 180.0, italic: true, fontFace: "Georgia", color: "C99560", charSpacing: -3.6 } },
  { text: "Repair.", options: { fontSize: 180.0, fontFace: "Georgia", color: "F4EFE6", charSpacing: -3.6 } }
], {
  x: 1.0417, y: 4.2021, w: 18.4542, h: 4.6416, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 0.92, fontFace: "Georgia"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 1.0417, y: 9.3021, w: 17.9167, h: 0.0104, fill: { color: "F4EFE6", transparency: 75 }, line: { type: "none" } });
slide.addText([
  { text: "COLLINS AVE · MIAMI BEACH", options: { fontSize: 18.0, fontFace: "Consolas", color: "D2CEC6", charSpacing: 3.6 } }
], {
  x: 1.0417, y: 9.7188, w: 5.1507, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "European specialty since 2018", options: { fontSize: 25.5, italic: true, fontFace: "Georgia", color: "D2CEC6" } }
], {
  x: 14.1411, y: 9.6042, w: 4.9617, h: 0.4375, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Georgia"
});

// ===== Slide 2 =====
slide = pres.addSlide();
slide.background = { color: "F4EFE6" };
slide.addText([
  { text: "Brian's Auto Repair", options: { fontSize: 21.0, italic: true, fontFace: "Georgia", color: "161412" } }
], {
  x: 1.0417, y: 0.5625, w: 2.6844, h: 0.375, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Georgia"
});
slide.addText([
  { text: "01 / INTRODUCTION", options: { fontSize: 18.0, fontFace: "Consolas", color: "161412", charSpacing: 2.52 } }
], {
  x: 15.8128, y: 0.5885, w: 3.2399, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "MIAMI BEACH · SINCE 2018", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 3.24 } }
], {
  x: 1.0417, y: 1.6667, w: 18.4542, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Eight years of ", options: { fontSize: 99.0, fontFace: "Georgia", color: "161412", charSpacing: -1.48 } },
  { text: "European ", options: { fontSize: 99.0, italic: true, fontFace: "Georgia", color: "96653A", charSpacing: -1.48 } },
  { text: "obsession.", options: { fontSize: 99.0, fontFace: "Georgia", color: "161412", charSpacing: -1.48 } }
], {
  x: 1.0417, y: 2.2812, w: 17.1667, h: 2.7917, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addText([
  { text: "A Miami Beach shop built around one idea: that the cars engineered in Stuttgart, Coventry, and Munich deserve the same care on a humid Florida afternoon as they do in a European dealership.", options: { fontSize: 22.5, fontFace: "Calibri", color: "2B2622" } }
], {
  x: 1.0417, y: 6.1329, w: 8.7979, h: 1.9792, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.55, fontFace: "Calibri"
});
slide.addText([
  { text: "We opened our bay doors in 2018. Eight years later, we are the independent shop of record for a small, particular clientele — and the technicians they trust with vehicles worth defending.", options: { fontSize: 22.5, fontFace: "Calibri", color: "2B2622" } }
], {
  x: 10.4167, y: 6.1329, w: 8.7979, h: 1.9792, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.55, fontFace: "Calibri"
});

// ===== Slide 3 =====
slide = pres.addSlide();
slide.background = { color: "141210" };
slide.addText([
  { text: "Brian's Auto Repair", options: { fontSize: 21.0, italic: true, fontFace: "Georgia", color: "F4EFE6" } }
], {
  x: 1.0417, y: 0.5625, w: 2.6844, h: 0.375, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Georgia"
});
slide.addText([
  { text: "02 / SPECIALTY", options: { fontSize: 18.0, fontFace: "Consolas", color: "F4EFE6", charSpacing: 2.52 } }
], {
  x: 16.3678, y: 0.5885, w: 2.6738, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "02 — SPECIALTY", options: { fontSize: 18.0, fontFace: "Consolas", color: "C99560", charSpacing: 3.24 } }
], {
  x: 1.0417, y: 4.346, w: 18.4542, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "A European ", options: { fontSize: 135.0, fontFace: "Georgia", color: "F4EFE6", charSpacing: -2.03 } },
  { text: "specialty.", options: { fontSize: 135.0, italic: true, fontFace: "Georgia", color: "C99560", charSpacing: -2.03 } }
], {
  x: 1.0417, y: 5.0807, w: 12.9075, h: 3.7917, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 1.0417, y: 9.2106, w: 17.9167, h: 0.0104, fill: { color: "F4EFE6", transparency: 78 }, line: { type: "none" } });
slide.addText([
  { text: "We do not service everything that rolls in. We service what we know — deeply, and without compromise.", options: { fontSize: 21.0, fontFace: "Calibri", color: "BCB8B0" } }
], {
  x: 1.0417, y: 9.5127, w: 7.2958, h: 0.9456, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.55, fontFace: "Calibri"
});
slide.addText([
  { text: "03 / 15", options: { fontSize: 18.0, fontFace: "Consolas", color: "9A9790", charSpacing: 3.6 } }
], {
  x: 17.5581, y: 10.1354, w: 1.4836, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});

// ===== Slide 4 =====
slide = pres.addSlide();
slide.background = { color: "F4EFE6" };
slide.addText([
  { text: "Brian's Auto Repair", options: { fontSize: 21.0, italic: true, fontFace: "Georgia", color: "161412" } }
], {
  x: 1.0417, y: 0.5625, w: 2.6844, h: 0.375, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Georgia"
});
slide.addText([
  { text: "03 / MARQUES", options: { fontSize: 18.0, fontFace: "Consolas", color: "161412", charSpacing: 2.52 } }
], {
  x: 16.738, y: 0.5885, w: 2.3037, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "MARQUES WE SERVICE", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 3.24 } }
], {
  x: 1.0417, y: 1.0417, w: 9.6562, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Three houses. One standard.", options: { fontSize: 63.0, fontFace: "Georgia", color: "161412", charSpacing: -0.94 } }
], {
  x: 1.0417, y: 1.5821, w: 12.7719, h: 0.9167, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addText([
  { text: "Our bays are set up, tooled, and staffed specifically for these three marques and their respective sub-brands.", options: { fontSize: 18.0, fontFace: "Calibri", color: "2B2622" } }
], {
  x: 14.375, y: 1.2441, w: 4.7208, h: 1.2038, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.55, fontFace: "Calibri"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 1.0417, y: 2.9896, w: 17.9167, h: 0.0104, fill: { color: "161412", transparency: 82 }, line: { type: "none" } });
slide.addShape(pres.shapes.RECTANGLE, { x: 1.0417, y: 7.0687, w: 5.9722, h: 0.0104, fill: { color: "161412", transparency: 82 }, line: { type: "none" } });
slide.addShape(pres.shapes.RECTANGLE, { x: 7.0034, y: 3.0, w: 0.0104, h: 4.0791, fill: { color: "161412", transparency: 82 }, line: { type: "none" } });
slide.addText([
  { text: "— 01", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 2.88 } }
], {
  x: 1.4583, y: 3.4583, w: 5.2823, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Mercedes", options: { fontSize: 48.0, fontFace: "Georgia", color: "161412", charSpacing: -0.48 } }
], {
  x: 1.4583, y: 5.1188, w: 5.2823, h: 0.7083, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addText([
  { text: "AMG, Maybach, G-Wagen, SL, classic SLs and Pagodas.", options: { fontSize: 18.0, fontFace: "Calibri", color: "7A7771" } }
], {
  x: 1.4583, y: 5.9105, w: 5.2823, h: 0.7415, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.4, fontFace: "Calibri"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 7.0138, y: 7.0687, w: 5.9722, h: 0.0104, fill: { color: "161412", transparency: 82 }, line: { type: "none" } });
slide.addShape(pres.shapes.RECTANGLE, { x: 12.9756, y: 3.0, w: 0.0104, h: 4.0791, fill: { color: "161412", transparency: 82 }, line: { type: "none" } });
slide.addText([
  { text: "— 02", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 2.88 } }
], {
  x: 7.4305, y: 3.4583, w: 5.2823, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Jaguar Land Rover", options: { fontSize: 48.0, fontFace: "Georgia", color: "161412", charSpacing: -0.48 } }
], {
  x: 7.4305, y: 4.4521, w: 5.2823, h: 1.375, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addText([
  { text: "Range Rover, Defender, F-Type, vintage XJ and E-Type.", options: { fontSize: 18.0, fontFace: "Calibri", color: "7A7771" } }
], {
  x: 7.4305, y: 5.9105, w: 5.2823, h: 0.7415, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.4, fontFace: "Calibri"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 12.986, y: 7.0687, w: 5.9722, h: 0.0104, fill: { color: "161412", transparency: 82 }, line: { type: "none" } });
slide.addText([
  { text: "— 03", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 2.88 } }
], {
  x: 13.4027, y: 3.4583, w: 5.293, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "BMW", options: { fontSize: 48.0, fontFace: "Georgia", color: "161412", charSpacing: -0.48 } }
], {
  x: 13.4027, y: 5.1188, w: 5.293, h: 0.7083, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addText([
  { text: "M Division, X-series, 7-series, classic 2002 and E30.", options: { fontSize: 18.0, fontFace: "Calibri", color: "7A7771" } }
], {
  x: 13.4027, y: 5.9105, w: 5.293, h: 0.7415, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.4, fontFace: "Calibri"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 1.0417, y: 7.0791, w: 5.9722, h: 3.3376, fill: { color: "E8E1D3" }, line: { type: "none" } });
slide.addShape(pres.shapes.RECTANGLE, { x: 7.0034, y: 7.0791, w: 0.0104, h: 3.3376, fill: { color: "161412", transparency: 82 }, line: { type: "none" } });
slide.addText([
  { text: "— Also", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 2.88 } }
], {
  x: 1.4583, y: 7.5374, w: 5.2823, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Sister marques.", options: { fontSize: 33.0, fontFace: "Georgia", color: "161412", charSpacing: -0.33 } }
], {
  x: 1.4583, y: 8.5667, w: 5.2823, h: 0.9583, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addText([
  { text: "Audi, Porsche, MINI — by prior arrangement.", options: { fontSize: 18.0, fontFace: "Calibri", color: "7A7771" } }
], {
  x: 1.4583, y: 9.6084, w: 5.2823, h: 0.3916, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.4, fontFace: "Calibri"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 7.0138, y: 7.0791, w: 5.9722, h: 3.3376, fill: { color: "E8E1D3" }, line: { type: "none" } });
slide.addShape(pres.shapes.RECTANGLE, { x: 12.9756, y: 7.0791, w: 0.0104, h: 3.3376, fill: { color: "161412", transparency: 82 }, line: { type: "none" } });
slide.addText([
  { text: "— Tools", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 2.88 } }
], {
  x: 7.4305, y: 7.5374, w: 5.2823, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Factory diagnostics.", options: { fontSize: 33.0, fontFace: "Georgia", color: "161412", charSpacing: -0.33 } }
], {
  x: 7.4305, y: 8.5667, w: 5.2823, h: 0.9583, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addText([
  { text: "XENTRY, ISTA, SDD — licensed and current.", options: { fontSize: 18.0, fontFace: "Calibri", color: "7A7771" } }
], {
  x: 7.4305, y: 9.6084, w: 5.2823, h: 0.3916, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.4, fontFace: "Calibri"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 12.986, y: 7.0791, w: 5.9722, h: 3.3376, fill: { color: "E8E1D3" }, line: { type: "none" } });
slide.addText([
  { text: "— Parts", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 2.88 } }
], {
  x: 13.4027, y: 7.5374, w: 5.293, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "OEM, always.", options: { fontSize: 33.0, fontFace: "Georgia", color: "161412", charSpacing: -0.33 } }
], {
  x: 13.4027, y: 9.0251, w: 5.293, h: 0.5, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addText([
  { text: "Sourced direct. Aftermarket only on request.", options: { fontSize: 18.0, fontFace: "Calibri", color: "7A7771" } }
], {
  x: 13.4027, y: 9.6084, w: 5.293, h: 0.3916, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.4, fontFace: "Calibri"
});

// ===== Slide 5 =====
slide = pres.addSlide();
slide.background = { color: "F4EFE6" };
slide.addText([
  { text: "Brian's Auto Repair", options: { fontSize: 21.0, italic: true, fontFace: "Georgia", color: "161412" } }
], {
  x: 1.0417, y: 0.5625, w: 2.6844, h: 0.375, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Georgia"
});
slide.addText([
  { text: "04 / ERA", options: { fontSize: 18.0, fontFace: "Consolas", color: "161412", charSpacing: 2.52 } }
], {
  x: 17.478, y: 0.5885, w: 1.5636, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "VINTAGE & MODERN", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 3.24 } }
], {
  x: 1.0417, y: 1.0417, w: 18.4542, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "From carburetors to ", options: { fontSize: 78.0, fontFace: "Georgia", color: "161412", charSpacing: -1.17 } },
  { text: "CAN bus.", options: { fontSize: 78.0, italic: true, fontFace: "Georgia", color: "96653A", charSpacing: -1.17 } }
], {
  x: 1.0417, y: 1.5312, w: 18.4542, h: 2.2083, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 1.0417, y: 4.1146, w: 17.9167, h: 0.0104, fill: { color: "161412", transparency: 82 }, line: { type: "none" } });
slide.addShape(pres.shapes.RECTANGLE, { x: 9.9896, y: 4.125, w: 0.0104, h: 7.0514, fill: { color: "161412", transparency: 82 }, line: { type: "none" } });
slide.addText([
  { text: "01 — VINTAGE", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 3.24 } }
], {
  x: 1.0417, y: 4.7083, w: 8.7014, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "The ", options: { fontSize: 72.0, fontFace: "Georgia", color: "161412", charSpacing: -1.44 } },
  { text: "classics.", options: { fontSize: 72.0, italic: true, fontFace: "Georgia", color: "96653A", charSpacing: -1.44 } }
], {
  x: 1.0417, y: 5.2812, w: 8.7014, h: 0.9915, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 0.95, fontFace: "Georgia"
});
slide.addText([
  { text: "Pre-1990 restorations, sympathetic repairs, and long-term preservation work. We keep a library of workshop manuals and a machinist on call for parts that no longer exist.", options: { fontSize: 18.0, fontFace: "Calibri", color: "2B2622" } }
], {
  x: 1.0417, y: 6.5228, w: 6.0083, h: 1.5911, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.55, fontFace: "Calibri"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 1.0417, y: 8.3639, w: 8.4479, h: 2.8125, fill: { color: "E8E1D3" }, line: { type: "none" } });
slide.addText([
  { text: "PAGODA 280SL · ENGINE BAY", options: { fontSize: 18.0, fontFace: "Consolas", color: "7A7771", charSpacing: 2.52 } }
], {
  x: 1.3438, y: 10.6348, w: 4.7644, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "FIG 05.A", options: { fontSize: 18.0, fontFace: "Consolas", color: "ABA7A0", charSpacing: 2.52 } }
], {
  x: 7.7072, y: 10.6348, w: 1.5636, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "02 — MODERN", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 3.24 } }
], {
  x: 10.5, y: 4.7083, w: 8.7121, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "The ", options: { fontSize: 72.0, fontFace: "Georgia", color: "161412", charSpacing: -1.44 } },
  { text: "current.", options: { fontSize: 72.0, italic: true, fontFace: "Georgia", color: "96653A", charSpacing: -1.44 } }
], {
  x: 10.5, y: 5.2812, w: 8.7121, h: 0.9915, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 0.95, fontFace: "Georgia"
});
slide.addText([
  { text: "Factory-level diagnostics, module coding, ADAS calibration, EV and PHEV service, and over-the-air update troubleshooting for current model-year vehicles.", options: { fontSize: 18.0, fontFace: "Calibri", color: "2B2622" } }
], {
  x: 10.5, y: 6.5228, w: 6.0083, h: 1.5911, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.55, fontFace: "Calibri"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 10.5, y: 8.3639, w: 8.4583, h: 2.8125, fill: { color: "E8E1D3" }, line: { type: "none" } });
slide.addText([
  { text: "G63 AMG · DIAGNOSTIC BAY", options: { fontSize: 18.0, fontFace: "Consolas", color: "7A7771", charSpacing: 2.52 } }
], {
  x: 10.8021, y: 10.6348, w: 4.5738, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "FIG 05.B", options: { fontSize: 18.0, fontFace: "Consolas", color: "ABA7A0", charSpacing: 2.52 } }
], {
  x: 17.1759, y: 10.6348, w: 1.5636, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});

// ===== Slide 6 =====
slide = pres.addSlide();
slide.background = { color: "F4EFE6" };
slide.addText([
  { text: "Brian's Auto Repair", options: { fontSize: 21.0, italic: true, fontFace: "Georgia", color: "161412" } }
], {
  x: 1.0417, y: 0.5625, w: 2.6844, h: 0.375, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Georgia"
});
slide.addText([
  { text: "05 / TECHNICIANS", options: { fontSize: 18.0, fontFace: "Consolas", color: "161412", charSpacing: 2.52 } }
], {
  x: 15.9979, y: 0.5885, w: 3.0493, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "OUR TECHNICIANS", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 3.24 } }
], {
  x: 1.0417, y: 1.0417, w: 10.2997, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Certified by the factory. Proven by ", options: { fontSize: 72.0, fontFace: "Georgia", color: "161412", charSpacing: -1.08 } },
  { text: "experience.", options: { fontSize: 72.0, italic: true, fontFace: "Georgia", color: "96653A", charSpacing: -1.08 } }
], {
  x: 1.0417, y: 1.5312, w: 10.2997, h: 2.0417, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addText([
  { text: "Every technician on our floor holds an active credential from at least one of the governing bodies below.", options: { fontSize: 18.0, fontFace: "Calibri", color: "2B2622" } }
], {
  x: 15.0, y: 2.3691, w: 4.0771, h: 1.2038, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.55, fontFace: "Calibri"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 1.0417, y: 4.1562, w: 8.7083, h: 0.0208, fill: { color: "161412" }, line: { type: "none" } });
slide.addText([
  { text: "— ASE MASTER", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 3.24 } }
], {
  x: 1.0417, y: 4.6354, w: 8.9696, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "ASE Certified.", options: { fontSize: 54.0, fontFace: "Georgia", color: "161412", charSpacing: -0.54 } }
], {
  x: 1.0417, y: 5.125, w: 8.9696, h: 0.7917, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addText([
  { text: "National Institute for Automotive Service Excellence — the baseline, and the benchmark. Every tech on the floor is at minimum ASE certified.", options: { fontSize: 18.0, fontFace: "Calibri", color: "2B2622" } }
], {
  x: 1.0417, y: 6.0833, w: 5.5792, h: 1.5417, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.5, fontFace: "Calibri"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 10.25, y: 4.1562, w: 8.7083, h: 0.0208, fill: { color: "161412" }, line: { type: "none" } });
slide.addText([
  { text: "— FACTORY TRAINED", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 3.24 } }
], {
  x: 10.25, y: 4.6354, w: 8.9696, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Factory Certified.", options: { fontSize: 54.0, fontFace: "Georgia", color: "161412", charSpacing: -0.54 } }
], {
  x: 10.25, y: 5.125, w: 8.9696, h: 0.7917, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addText([
  { text: "Training from the manufacturers themselves — the same programs their authorized dealers attend, on the same schedule.", options: { fontSize: 18.0, fontFace: "Calibri", color: "2B2622" } }
], {
  x: 10.25, y: 6.0833, w: 5.5792, h: 1.1667, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.5, fontFace: "Calibri"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 1.0417, y: 9.3021, w: 17.9167, h: 0.0104, fill: { color: "161412", transparency: 82 }, line: { type: "none" } });
slide.addText([
  { text: "“If a dealer tech can do it, ours can. Most of the time, they trained together.”", options: { fontSize: 30.0, italic: true, fontFace: "Georgia", color: "161412", charSpacing: -0.3 } }
], {
  x: 1.0417, y: 9.9375, w: 14.2222, h: 0.5208, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Georgia"
});
slide.addText([
  { text: "— BRIAN", options: { fontSize: 18.0, fontFace: "Consolas", color: "161412", charSpacing: 2.88 } }
], {
  x: 17.6281, y: 10.1146, w: 1.4136, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});

// ===== Slide 7 =====
slide = pres.addSlide();
slide.background = { color: "141210" };
slide.addText([
  { text: "Brian's Auto Repair", options: { fontSize: 21.0, italic: true, fontFace: "Georgia", color: "F4EFE6" } }
], {
  x: 1.0417, y: 0.5625, w: 2.6844, h: 0.375, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Georgia"
});
slide.addText([
  { text: "06 / SERVICE", options: { fontSize: 18.0, fontFace: "Consolas", color: "F4EFE6", charSpacing: 2.52 } }
], {
  x: 16.738, y: 0.5885, w: 2.3037, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "06 — SERVICE", options: { fontSize: 18.0, fontFace: "Consolas", color: "C99560", charSpacing: 3.24 } }
], {
  x: 1.0417, y: 4.346, w: 18.4542, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "The ", options: { fontSize: 135.0, fontFace: "Georgia", color: "F4EFE6", charSpacing: -2.03 } },
  { text: "white-glove ", options: { fontSize: 135.0, italic: true, fontFace: "Georgia", color: "C99560", charSpacing: -2.03 } },
  { text: "standard.", options: { fontSize: 135.0, fontFace: "Georgia", color: "F4EFE6", charSpacing: -2.03 } }
], {
  x: 1.0417, y: 4.8773, w: 18.4542, h: 3.7917, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 1.0417, y: 9.2106, w: 17.9167, h: 0.0104, fill: { color: "F4EFE6", transparency: 78 }, line: { type: "none" } });
slide.addText([
  { text: "Service work, at the level you would expect from the vehicle itself. Detailed below.", options: { fontSize: 21.0, fontFace: "Calibri", color: "BCB8B0" } }
], {
  x: 1.0417, y: 9.5127, w: 8.1542, h: 0.9456, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.55, fontFace: "Calibri"
});
slide.addText([
  { text: "07 / 15", options: { fontSize: 18.0, fontFace: "Consolas", color: "9A9790", charSpacing: 3.6 } }
], {
  x: 17.5581, y: 10.1354, w: 1.4836, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});

// ===== Slide 8 =====
slide = pres.addSlide();
slide.background = { color: "F4EFE6" };
slide.addText([
  { text: "Brian's Auto Repair", options: { fontSize: 21.0, italic: true, fontFace: "Georgia", color: "161412" } }
], {
  x: 1.0417, y: 0.5625, w: 2.6844, h: 0.375, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Georgia"
});
slide.addText([
  { text: "07 / CONCIERGE", options: { fontSize: 18.0, fontFace: "Consolas", color: "161412", charSpacing: 2.52 } }
], {
  x: 16.3678, y: 0.5885, w: 2.6738, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "ENCLOSED PICKUP & DELIVERY", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 3.24 } }
], {
  x: 1.0417, y: 1.0417, w: 18.4542, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Your vehicle never touches the ", options: { fontSize: 78.0, fontFace: "Georgia", color: "161412", charSpacing: -1.17 } },
  { text: "road.", options: { fontSize: 78.0, italic: true, fontFace: "Georgia", color: "96653A", charSpacing: -1.17 } }
], {
  x: 1.0417, y: 1.5312, w: 18.4542, h: 2.2083, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addText([
  { text: "Every pickup and drop-off — at home, at the hotel, at the hangar — is handled in our enclosed, climate-controlled transporter. No flatbeds. No open exposure. No valet at the shop.", options: { fontSize: 21.0, fontFace: "Calibri", color: "2B2622" } }
], {
  x: 1.0417, y: 4.0312, w: 12.875, h: 0.9456, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.55, fontFace: "Calibri"
});
slide.addText([
  { text: "— 01 / SCHEDULED", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 3.24 } }
], {
  x: 1.3854, y: 6.0706, w: 4.871, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "At your door.", options: { fontSize: 33.0, fontFace: "Georgia", color: "161412", charSpacing: -0.33 } }
], {
  x: 1.3854, y: 6.9873, w: 4.871, h: 0.5, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addText([
  { text: "Home, hotel, marina, hangar. Window of your choosing.", options: { fontSize: 18.0, fontFace: "Calibri", color: "2B2622" } }
], {
  x: 1.3854, y: 7.6123, w: 4.871, h: 0.7917, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.5, fontFace: "Calibri"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 6.4583, y: 7.2113, w: 0.8333, h: 0.0104, fill: { color: "161412", transparency: 60 }, line: { type: "none" } });
slide.addText([
  { text: "— 02 / TRANSPORT", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 3.24 } }
], {
  x: 7.6354, y: 6.0706, w: 4.871, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Enclosed trailer.", options: { fontSize: 33.0, fontFace: "Georgia", color: "161412", charSpacing: -0.33 } }
], {
  x: 7.6354, y: 6.9873, w: 4.871, h: 0.5, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addText([
  { text: "Climate-controlled, fully strapped, GPS-tracked.", options: { fontSize: 18.0, fontFace: "Calibri", color: "2B2622" } }
], {
  x: 7.6354, y: 7.6123, w: 4.871, h: 0.7917, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.5, fontFace: "Calibri"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 12.7083, y: 7.2113, w: 0.8333, h: 0.0104, fill: { color: "161412", transparency: 60 }, line: { type: "none" } });
slide.addText([
  { text: "— 03 / RETURN", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 3.24 } }
], {
  x: 13.8854, y: 6.0706, w: 4.871, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Detailed & ready.", options: { fontSize: 33.0, fontFace: "Georgia", color: "161412", charSpacing: -0.33 } }
], {
  x: 13.8854, y: 6.9873, w: 4.871, h: 0.5, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addText([
  { text: "Returned washed, vacuumed, and the way you left it.", options: { fontSize: 18.0, fontFace: "Calibri", color: "2B2622" } }
], {
  x: 13.8854, y: 7.6123, w: 4.871, h: 0.7917, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.5, fontFace: "Calibri"
});

// ===== Slide 9 =====
slide = pres.addSlide();
slide.background = { color: "F4EFE6" };
slide.addText([
  { text: "Brian's Auto Repair", options: { fontSize: 21.0, italic: true, fontFace: "Georgia", color: "161412" } }
], {
  x: 1.0417, y: 0.5625, w: 2.6844, h: 0.375, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Georgia"
});
slide.addText([
  { text: "08 / LOANERS", options: { fontSize: 18.0, fontFace: "Consolas", color: "161412", charSpacing: 2.52 } }
], {
  x: 16.738, y: 0.5885, w: 2.3037, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "THE LOANER PROGRAM", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 3.24 } }
], {
  x: 1.0417, y: 1.0417, w: 8.6906, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Drive something you ", options: { fontSize: 78.0, fontFace: "Georgia", color: "161412", charSpacing: -1.17 } },
  { text: "like ", options: { fontSize: 78.0, italic: true, fontFace: "Georgia", color: "96653A", charSpacing: -1.17 } },
  { text: "while we work.", options: { fontSize: 78.0, fontFace: "Georgia", color: "161412", charSpacing: -1.17 } }
], {
  x: 1.0417, y: 1.5312, w: 8.6906, h: 3.2917, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addText([
  { text: "Our loaner fleet is not a rental counter. It is a small, curated garage of European vehicles matched to the client and the duration of service.", options: { fontSize: 19.5, fontFace: "Calibri", color: "2B2622" } }
], {
  x: 1.0417, y: 5.1979, w: 6.8667, h: 1.3009, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.55, fontFace: "Calibri"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 10.5208, y: 1.0417, w: 8.4375, h: 2.3958, fill: { color: "E8E1D3" }, line: { type: "none" } });
slide.addText([
  { text: "LOANER · RANGE ROVER SPORT", options: { fontSize: 18.0, fontFace: "Consolas", color: "7A7771", charSpacing: 2.52 } }
], {
  x: 10.8229, y: 2.8958, w: 4.955, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "FLEET 01", options: { fontSize: 18.0, fontFace: "Consolas", color: "ABA7A0", charSpacing: 2.52 } }
], {
  x: 17.1759, y: 2.8958, w: 1.5636, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 10.5208, y: 3.6458, w: 8.4375, h: 2.3958, fill: { color: "E8E1D3" }, line: { type: "none" } });
slide.addText([
  { text: "LOANER · MERCEDES GLE", options: { fontSize: 18.0, fontFace: "Consolas", color: "7A7771", charSpacing: 2.52 } }
], {
  x: 10.8229, y: 5.5, w: 4.0021, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "FLEET 02", options: { fontSize: 18.0, fontFace: "Consolas", color: "ABA7A0", charSpacing: 2.52 } }
], {
  x: 17.1759, y: 5.5, w: 1.5636, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 10.5208, y: 6.25, w: 8.4375, h: 2.3958, fill: { color: "E8E1D3" }, line: { type: "none" } });
slide.addText([
  { text: "LOANER · BMW 5-SERIES", options: { fontSize: 18.0, fontFace: "Consolas", color: "7A7771", charSpacing: 2.52 } }
], {
  x: 10.8229, y: 8.1042, w: 4.0021, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "FLEET 03", options: { fontSize: 18.0, fontFace: "Consolas", color: "ABA7A0", charSpacing: 2.52 } }
], {
  x: 17.1759, y: 8.1042, w: 1.5636, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 1.0417, y: 8.9792, w: 17.9167, h: 0.0104, fill: { color: "161412", transparency: 82 }, line: { type: "none" } });
slide.addText([
  { text: "14", options: { fontSize: 48.0, fontFace: "Georgia", color: "161412", charSpacing: -0.48 } }
], {
  x: 1.0417, y: 9.3646, w: 5.7222, h: 0.7083, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addText([
  { text: "VEHICLES IN ROTATION", options: { fontSize: 18.0, fontFace: "Consolas", color: "6F6C67", charSpacing: 2.88 } }
], {
  x: 1.0417, y: 10.1354, w: 5.7222, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "0", options: { fontSize: 48.0, fontFace: "Georgia", color: "161412", charSpacing: -0.48 } }
], {
  x: 7.2222, y: 9.3646, w: 5.7222, h: 0.7083, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addText([
  { text: "DAILY RATE · COMPLIMENTARY", options: { fontSize: 18.0, fontFace: "Consolas", color: "6F6C67", charSpacing: 2.88 } }
], {
  x: 7.2222, y: 10.1354, w: 5.7222, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "∞", options: { fontSize: 48.0, fontFace: "Georgia", color: "161412", charSpacing: -0.48 } }
], {
  x: 13.4027, y: 9.3646, w: 5.7222, h: 0.7083, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addText([
  { text: "MILEAGE, WITHIN REASON", options: { fontSize: 18.0, fontFace: "Consolas", color: "6F6C67", charSpacing: 2.88 } }
], {
  x: 13.4027, y: 10.1354, w: 5.7222, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});

// ===== Slide 10 =====
slide = pres.addSlide();
slide.background = { color: "F4EFE6" };
slide.addText([
  { text: "Brian's Auto Repair", options: { fontSize: 21.0, italic: true, fontFace: "Georgia", color: "161412" } }
], {
  x: 1.0417, y: 0.5625, w: 2.6844, h: 0.375, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Georgia"
});
slide.addText([
  { text: "09 / CLIENTELE", options: { fontSize: 18.0, fontFace: "Consolas", color: "161412", charSpacing: 2.52 } }
], {
  x: 16.3678, y: 0.5885, w: 2.6738, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "A DISCERNING CLIENTELE", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 3.24 } }
], {
  x: 1.0417, y: 1.0417, w: 18.4542, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "The garages we serve belong to people who ", options: { fontSize: 54.0, fontFace: "Georgia", color: "161412", charSpacing: -0.81 } },
  { text: "notice the details.", options: { fontSize: 54.0, italic: true, fontFace: "Georgia", color: "96653A", charSpacing: -0.81 } }
], {
  x: 1.0417, y: 1.5312, w: 18.4542, h: 1.5417, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addText([
  { text: "Athletes.", options: { fontSize: 33.0, fontFace: "Georgia", color: "161412", charSpacing: -0.33 } }
], {
  x: 1.4688, y: 3.8333, w: 8.2185, h: 0.5457, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.1, fontFace: "Georgia"
});
slide.addText([
  { text: "Professionals whose week is built around training blocks and travel — and whose cars cannot be out of service on a Monday morning.", options: { fontSize: 18.0, fontFace: "Calibri", color: "2B2622" } }
], {
  x: 1.4688, y: 4.5041, w: 8.2185, h: 0.7666, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.45, fontFace: "Calibri"
});
slide.addText([
  { text: "— NFL · NBA · MLB · F1", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 2.88 } }
], {
  x: 1.4688, y: 6.1406, w: 8.2185, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Entertainers.", options: { fontSize: 33.0, fontFace: "Georgia", color: "161412", charSpacing: -0.33 } }
], {
  x: 10.5521, y: 3.8333, w: 8.2185, h: 0.5457, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.1, fontFace: "Georgia"
});
slide.addText([
  { text: "Recording artists, actors, and creators who need privacy at pickup and a shop that will not post a photo of their car without asking.", options: { fontSize: 18.0, fontFace: "Calibri", color: "2B2622" } }
], {
  x: 10.5521, y: 4.5041, w: 8.2185, h: 0.7666, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.45, fontFace: "Calibri"
});
slide.addText([
  { text: "— DISCRETION BY DEFAULT", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 2.88 } }
], {
  x: 10.5521, y: 6.1406, w: 8.2185, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Collectors.", options: { fontSize: 33.0, fontFace: "Georgia", color: "161412", charSpacing: -0.33 } }
], {
  x: 1.4688, y: 7.4427, w: 8.2185, h: 0.5457, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.1, fontFace: "Georgia"
});
slide.addText([
  { text: "Garages of six, twelve, twenty cars — maintained on rotation, documented, and storm-prepped for hurricane season.", options: { fontSize: 18.0, fontFace: "Calibri", color: "2B2622" } }
], {
  x: 1.4688, y: 8.1134, w: 8.2185, h: 0.7666, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.45, fontFace: "Calibri"
});
slide.addText([
  { text: "— FLEET MAINTENANCE", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 2.88 } }
], {
  x: 1.4688, y: 9.75, w: 8.2185, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Enthusiasts.", options: { fontSize: 33.0, fontFace: "Georgia", color: "161412", charSpacing: -0.33 } }
], {
  x: 10.5521, y: 7.4427, w: 8.2185, h: 0.5457, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.1, fontFace: "Georgia"
});
slide.addText([
  { text: "The owner who reads the forums, who brings their own parts list, and who wants a shop that will have the conversation on their level.", options: { fontSize: 18.0, fontFace: "Calibri", color: "2B2622" } }
], {
  x: 10.5521, y: 8.1134, w: 8.2185, h: 0.7666, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.45, fontFace: "Calibri"
});
slide.addText([
  { text: "— BY REFERRAL", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 2.88 } }
], {
  x: 10.5521, y: 9.75, w: 8.2185, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});

// ===== Slide 11 =====
slide = pres.addSlide();
slide.background = { color: "141210" };
slide.addText([
  { text: "Brian's Auto Repair", options: { fontSize: 21.0, italic: true, fontFace: "Georgia", color: "F4EFE6" } }
], {
  x: 1.0417, y: 0.5625, w: 2.6844, h: 0.375, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Georgia"
});
slide.addText([
  { text: "10 / PRESS", options: { fontSize: 18.0, fontFace: "Consolas", color: "F4EFE6", charSpacing: 2.52 } }
], {
  x: 17.1081, y: 0.5885, w: 1.9336, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "AS SEEN ON SOCIAL", options: { fontSize: 18.0, fontFace: "Consolas", color: "C99560", charSpacing: 3.24 } }
], {
  x: 1.0417, y: 1.0417, w: 8.6501, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Built a following one ", options: { fontSize: 78.0, fontFace: "Georgia", color: "F4EFE6", charSpacing: -1.17 } },
  { text: "bay at a time.", options: { fontSize: 78.0, italic: true, fontFace: "Georgia", color: "C99560", charSpacing: -1.17 } }
], {
  x: 1.0417, y: 1.5312, w: 8.6501, h: 2.2083, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addText([
  { text: "142K+", options: { fontSize: 60.0, fontFace: "Georgia", color: "F4EFE6", charSpacing: -0.6 } }
], {
  x: 15.3424, y: 2.4792, w: 3.6159, h: 0.875, margin: 0, fit: "shrink", valign: "top", align: "right", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addText([
  { text: "COMBINED FOLLOWERS", options: { fontSize: 18.0, fontFace: "Consolas", color: "9A9790", charSpacing: 3.24 } }
], {
  x: 15.3424, y: 3.4167, w: 3.6159, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "right", fontFace: "Consolas"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 1.0417, y: 4.1979, w: 5.861, h: 3.026, fill: { color: "1E1A17" }, line: { type: "none" } });
slide.addText([
  { text: "POST · 01", options: { fontSize: 18.0, fontFace: "Consolas", color: "84807B", charSpacing: 2.52 } }
], {
  x: 1.2812, y: 4.4167, w: 1.7487, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "4.2M VIEWS", options: { fontSize: 18.0, fontFace: "Consolas", color: "84807B", charSpacing: 2.52 } }
], {
  x: 4.8128, y: 4.4167, w: 1.9336, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "G63 · ENGINE OUT", options: { fontSize: 18.0, fontFace: "Consolas", color: "84807B", charSpacing: 2.52 } }
], {
  x: 1.2812, y: 6.724, w: 3.0493, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "♥", options: { fontSize: 18.0, fontFace: "Consolas", color: "C99560", charSpacing: 2.52 } }
], {
  x: 6.478, y: 6.724, w: 0.2684, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 7.0693, y: 4.1979, w: 5.8612, h: 3.026, fill: { color: "1E1A17" }, line: { type: "none" } });
slide.addText([
  { text: "POST · 02", options: { fontSize: 18.0, fontFace: "Consolas", color: "84807B", charSpacing: 2.52 } }
], {
  x: 7.3089, y: 4.4167, w: 1.7487, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "1.8M VIEWS", options: { fontSize: 18.0, fontFace: "Consolas", color: "84807B", charSpacing: 2.52 } }
], {
  x: 10.8407, y: 4.4167, w: 1.9336, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "PAGODA · BEFORE / AFTER", options: { fontSize: 18.0, fontFace: "Consolas", color: "84807B", charSpacing: 2.52 } }
], {
  x: 7.3089, y: 6.724, w: 4.3834, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "♥", options: { fontSize: 18.0, fontFace: "Consolas", color: "C99560", charSpacing: 2.52 } }
], {
  x: 12.5059, y: 6.724, w: 0.2684, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 13.0972, y: 4.1979, w: 5.8612, h: 3.026, fill: { color: "1E1A17" }, line: { type: "none" } });
slide.addText([
  { text: "POST · 03", options: { fontSize: 18.0, fontFace: "Consolas", color: "84807B", charSpacing: 2.52 } }
], {
  x: 13.3368, y: 4.4167, w: 1.7487, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "3.1M VIEWS", options: { fontSize: 18.0, fontFace: "Consolas", color: "84807B", charSpacing: 2.52 } }
], {
  x: 16.8685, y: 4.4167, w: 1.9336, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "DEFENDER · FIELD RECOVERY", options: { fontSize: 18.0, fontFace: "Consolas", color: "84807B", charSpacing: 2.52 } }
], {
  x: 13.3368, y: 6.724, w: 4.7644, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "♥", options: { fontSize: 18.0, fontFace: "Consolas", color: "C99560", charSpacing: 2.52 } }
], {
  x: 18.5337, y: 6.724, w: 0.2684, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 1.0417, y: 7.3906, w: 5.861, h: 3.026, fill: { color: "1E1A17" }, line: { type: "none" } });
slide.addText([
  { text: "POST · 04", options: { fontSize: 18.0, fontFace: "Consolas", color: "84807B", charSpacing: 2.52 } }
], {
  x: 1.2812, y: 7.6094, w: 1.7487, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "920K VIEWS", options: { fontSize: 18.0, fontFace: "Consolas", color: "84807B", charSpacing: 2.52 } }
], {
  x: 4.8128, y: 7.6094, w: 1.9336, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "E30 · S52 SWAP", options: { fontSize: 18.0, fontFace: "Consolas", color: "84807B", charSpacing: 2.52 } }
], {
  x: 1.2812, y: 9.9167, w: 2.6738, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "♥", options: { fontSize: 18.0, fontFace: "Consolas", color: "C99560", charSpacing: 2.52 } }
], {
  x: 6.478, y: 9.9167, w: 0.2684, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 7.0693, y: 7.3906, w: 5.8612, h: 3.026, fill: { color: "1E1A17" }, line: { type: "none" } });
slide.addText([
  { text: "POST · 05", options: { fontSize: 18.0, fontFace: "Consolas", color: "84807B", charSpacing: 2.52 } }
], {
  x: 7.3089, y: 7.6094, w: 1.7487, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "2.4M VIEWS", options: { fontSize: 18.0, fontFace: "Consolas", color: "84807B", charSpacing: 2.52 } }
], {
  x: 10.8407, y: 7.6094, w: 1.9336, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "ENCLOSED TRANSPORT", options: { fontSize: 18.0, fontFace: "Consolas", color: "84807B", charSpacing: 2.52 } }
], {
  x: 7.3089, y: 9.9167, w: 3.4305, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "♥", options: { fontSize: 18.0, fontFace: "Consolas", color: "C99560", charSpacing: 2.52 } }
], {
  x: 12.5059, y: 9.9167, w: 0.2684, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 13.0972, y: 7.3906, w: 5.8612, h: 3.026, fill: { color: "1E1A17" }, line: { type: "none" } });
slide.addText([
  { text: "POST · 06", options: { fontSize: 18.0, fontFace: "Consolas", color: "84807B", charSpacing: 2.52 } }
], {
  x: 13.3368, y: 7.6094, w: 1.7487, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "5.0M VIEWS", options: { fontSize: 18.0, fontFace: "Consolas", color: "84807B", charSpacing: 2.52 } }
], {
  x: 16.8685, y: 7.6094, w: 1.9336, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "AMG GT · BRAKE SERVICE", options: { fontSize: 18.0, fontFace: "Consolas", color: "84807B", charSpacing: 2.52 } }
], {
  x: 13.3368, y: 9.9167, w: 4.1928, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "♥", options: { fontSize: 18.0, fontFace: "Consolas", color: "C99560", charSpacing: 2.52 } }
], {
  x: 18.5337, y: 9.9167, w: 0.2684, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});

// ===== Slide 12 =====
slide = pres.addSlide();
slide.background = { color: "F4EFE6" };
slide.addText([
  { text: "Brian's Auto Repair", options: { fontSize: 21.0, italic: true, fontFace: "Georgia", color: "161412" } }
], {
  x: 1.0417, y: 0.5625, w: 2.6844, h: 0.375, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Georgia"
});
slide.addText([
  { text: "11 / TESTIMONIAL", options: { fontSize: 18.0, fontFace: "Consolas", color: "161412", charSpacing: 2.52 } }
], {
  x: 15.9979, y: 0.5885, w: 3.0493, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "WHAT CLIENTS ARE SAYING", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 3.24 } }
], {
  x: 1.0417, y: 1.6064, w: 18.4542, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "“ ", options: { fontSize: 72.0, fontFace: "Georgia", color: "C99560", charSpacing: -0.72 } },
  { text: "Brian's is the only shop in South Florida I trust with the ", options: { fontSize: 72.0, italic: true, fontFace: "Georgia", color: "161412", charSpacing: -0.72 } },
  { text: "'71 SL ", options: { fontSize: 72.0, italic: true, fontFace: "Georgia", color: "96653A", charSpacing: -0.72 } },
  { text: ". They pick it up in the enclosed trailer, return it cleaner than I left it, and the invoice is always exactly what we discussed. ", options: { fontSize: 72.0, italic: true, fontFace: "Georgia", color: "161412", charSpacing: -0.72 } },
  { text: "”", options: { fontSize: 72.0, fontFace: "Georgia", color: "C99560", charSpacing: -0.72 } }
], {
  x: 1.0417, y: 2.3877, w: 16.0938, h: 6.6413, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.1, fontFace: "Georgia"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 1.0417, y: 9.7061, w: 0.625, h: 0.0104, fill: { color: "161412", transparency: 60 }, line: { type: "none" } });
slide.addText([
  { text: "CLIENT · FISHER ISLAND · 6 YEARS", options: { fontSize: 18.0, fontFace: "Consolas", color: "161412", charSpacing: 2.52 } }
], {
  x: 1.9167, y: 9.5706, w: 6.0985, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});

// ===== Slide 13 =====
slide = pres.addSlide();
slide.background = { color: "141210" };
slide.addText([
  { text: "Brian's Auto Repair", options: { fontSize: 21.0, italic: true, fontFace: "Georgia", color: "F4EFE6" } }
], {
  x: 1.0417, y: 0.5625, w: 2.6844, h: 0.375, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Georgia"
});
slide.addText([
  { text: "12 / TRACK RECORD", options: { fontSize: 18.0, fontFace: "Consolas", color: "F4EFE6", charSpacing: 2.52 } }
], {
  x: 15.8128, y: 0.5885, w: 3.2399, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "BY THE NUMBERS", options: { fontSize: 18.0, fontFace: "Consolas", color: "C99560", charSpacing: 3.24 } }
], {
  x: 1.0417, y: 1.0417, w: 18.4542, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Eight years. The receipts.", options: { fontSize: 96.0, fontFace: "Georgia", color: "F4EFE6", charSpacing: -1.44 } }
], {
  x: 1.0417, y: 1.5312, w: 18.4542, h: 2.7083, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 1.0417, y: 4.8229, w: 17.9167, h: 0.0104, fill: { color: "F4EFE6", transparency: 78 }, line: { type: "none" } });
slide.addShape(pres.shapes.RECTANGLE, { x: 5.5104, y: 4.8333, w: 0.0104, h: 3.3229, fill: { color: "F4EFE6", transparency: 78 }, line: { type: "none" } });
slide.addText([
  { text: "8 ", options: { fontSize: 135.0, fontFace: "Georgia", color: "F4EFE6", charSpacing: -2.7 } },
  { text: "yr", options: { fontSize: 48.0, italic: true, fontFace: "Georgia", color: "C99560", charSpacing: -2.7 } }
], {
  x: 1.4167, y: 5.4167, w: 3.8303, h: 1.8229, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 0.95, fontFace: "Georgia"
});
slide.addText([
  { text: "SERVING MIAMI BEACH", options: { fontSize: 18.0, fontFace: "Consolas", color: "B1ADA6", charSpacing: 2.88 } }
], {
  x: 1.4167, y: 7.4062, w: 3.8303, h: 0.7917, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.5, fontFace: "Consolas"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 9.9896, y: 4.8333, w: 0.0104, h: 3.3229, fill: { color: "F4EFE6", transparency: 78 }, line: { type: "none" } });
slide.addText([
  { text: "4.9 ", options: { fontSize: 135.0, fontFace: "Georgia", color: "F4EFE6", charSpacing: -2.7 } },
  { text: "/5", options: { fontSize: 48.0, italic: true, fontFace: "Georgia", color: "C99560", charSpacing: -2.7 } }
], {
  x: 5.8958, y: 5.4167, w: 3.8303, h: 1.8229, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 0.95, fontFace: "Georgia"
});
slide.addText([
  { text: "AVERAGE ACROSS 400+ REVIEWS", options: { fontSize: 18.0, fontFace: "Consolas", color: "B1ADA6", charSpacing: 2.88 } }
], {
  x: 5.8958, y: 7.4062, w: 3.8303, h: 0.7917, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.5, fontFace: "Consolas"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 14.4688, y: 4.8333, w: 0.0104, h: 3.3229, fill: { color: "F4EFE6", transparency: 78 }, line: { type: "none" } });
slide.addText([
  { text: "3K ", options: { fontSize: 135.0, fontFace: "Georgia", color: "F4EFE6", charSpacing: -2.7 } },
  { text: "+", options: { fontSize: 48.0, italic: true, fontFace: "Georgia", color: "C99560", charSpacing: -2.7 } }
], {
  x: 10.375, y: 5.4167, w: 3.8303, h: 1.8229, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 0.95, fontFace: "Georgia"
});
slide.addText([
  { text: "EUROPEAN VEHICLES SERVICED", options: { fontSize: 18.0, fontFace: "Consolas", color: "B1ADA6", charSpacing: 2.88 } }
], {
  x: 10.375, y: 7.4062, w: 3.8303, h: 0.7917, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.5, fontFace: "Consolas"
});
slide.addText([
  { text: "14", options: { fontSize: 135.0, fontFace: "Georgia", color: "F4EFE6", charSpacing: -2.7 } }
], {
  x: 14.8542, y: 5.4167, w: 3.841, h: 1.8229, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 0.95, fontFace: "Georgia"
});
slide.addText([
  { text: "LOANER FLEET IN ROTATION", options: { fontSize: 18.0, fontFace: "Consolas", color: "B1ADA6", charSpacing: 2.88 } }
], {
  x: 14.8542, y: 7.4062, w: 3.841, h: 0.7917, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.5, fontFace: "Consolas"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 1.0417, y: 9.3542, w: 17.9167, h: 0.0104, fill: { color: "F4EFE6", transparency: 78 }, line: { type: "none" } });
slide.addText([
  { text: "Numbers are a starting point. The cars are the proof.", options: { fontSize: 27.0, italic: true, fontFace: "Georgia", color: "BCB8B0", charSpacing: -0.27 } }
], {
  x: 1.0417, y: 9.9896, w: 8.9877, h: 0.4688, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Georgia"
});
slide.addText([
  { text: "— EST. 2018", options: { fontSize: 18.0, fontFace: "Consolas", color: "84807B", charSpacing: 3.24 } }
], {
  x: 16.813, y: 10.125, w: 2.2287, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});

// ===== Slide 14 =====
slide = pres.addSlide();
slide.background = { color: "F4EFE6" };
slide.addText([
  { text: "Brian's Auto Repair", options: { fontSize: 21.0, italic: true, fontFace: "Georgia", color: "161412" } }
], {
  x: 1.0417, y: 0.5625, w: 2.6844, h: 0.375, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Georgia"
});
slide.addText([
  { text: "13 / PROCESS", options: { fontSize: 18.0, fontFace: "Consolas", color: "161412", charSpacing: 2.52 } }
], {
  x: 16.738, y: 0.5885, w: 2.3037, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "OUR PROCESS", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 3.24 } }
], {
  x: 1.0417, y: 1.0417, w: 18.4542, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "From first call to keys back in ", options: { fontSize: 72.0, fontFace: "Georgia", color: "161412", charSpacing: -1.08 } },
  { text: "your hand.", options: { fontSize: 72.0, italic: true, fontFace: "Georgia", color: "96653A", charSpacing: -1.08 } }
], {
  x: 1.0417, y: 1.5312, w: 18.4542, h: 2.0417, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.0, fontFace: "Georgia"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 1.0417, y: 4.1562, w: 3.3166, h: 0.0208, fill: { color: "161412" }, line: { type: "none" } });
slide.addText([
  { text: "— STEP 01", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 2.88 } }
], {
  x: 1.0417, y: 4.4271, w: 3.4161, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Intake call.", options: { fontSize: 30.0, fontFace: "Georgia", color: "161412", charSpacing: -0.3 } }
], {
  x: 1.0417, y: 4.8333, w: 3.4161, h: 0.4792, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.05, fontFace: "Georgia"
});
slide.addText([
  { text: "Ten-minute conversation: vehicle, symptoms, history, and scheduling window.", options: { fontSize: 18.0, fontFace: "Calibri", color: "2B2622" } }
], {
  x: 1.0417, y: 5.4375, w: 3.4161, h: 1.1667, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.5, fontFace: "Calibri"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 4.6916, y: 4.1562, w: 3.3167, h: 0.0208, fill: { color: "161412" }, line: { type: "none" } });
slide.addText([
  { text: "— STEP 02", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 2.88 } }
], {
  x: 4.6916, y: 4.4271, w: 3.4162, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Enclosed pickup.", options: { fontSize: 30.0, fontFace: "Georgia", color: "161412", charSpacing: -0.3 } }
], {
  x: 4.6916, y: 4.8333, w: 3.4162, h: 0.4792, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.05, fontFace: "Georgia"
});
slide.addText([
  { text: "Our transporter collects the vehicle within the arranged window.", options: { fontSize: 18.0, fontFace: "Calibri", color: "2B2622" } }
], {
  x: 4.6916, y: 5.4375, w: 3.4162, h: 1.1667, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.5, fontFace: "Calibri"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 8.3416, y: 4.1562, w: 3.3166, h: 0.0208, fill: { color: "161412" }, line: { type: "none" } });
slide.addText([
  { text: "— STEP 03", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 2.88 } }
], {
  x: 8.3416, y: 4.4271, w: 3.4161, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Diagnosis & quote.", options: { fontSize: 30.0, fontFace: "Georgia", color: "161412", charSpacing: -0.3 } }
], {
  x: 8.3416, y: 4.8333, w: 3.4161, h: 0.9167, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.05, fontFace: "Georgia"
});
slide.addText([
  { text: "Documented inspection. No work begins without a written approval.", options: { fontSize: 18.0, fontFace: "Calibri", color: "2B2622" } }
], {
  x: 8.3416, y: 5.875, w: 3.4161, h: 1.1667, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.5, fontFace: "Calibri"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 11.9915, y: 4.1562, w: 3.3167, h: 0.0208, fill: { color: "161412" }, line: { type: "none" } });
slide.addText([
  { text: "— STEP 04", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 2.88 } }
], {
  x: 11.9915, y: 4.4271, w: 3.4162, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Service & update.", options: { fontSize: 30.0, fontFace: "Georgia", color: "161412", charSpacing: -0.3 } }
], {
  x: 11.9915, y: 4.8333, w: 3.4162, h: 0.4792, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.05, fontFace: "Georgia"
});
slide.addText([
  { text: "Photo updates through the job. Loaner dispatched if requested.", options: { fontSize: 18.0, fontFace: "Calibri", color: "2B2622" } }
], {
  x: 11.9915, y: 5.4375, w: 3.4162, h: 1.1667, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.5, fontFace: "Calibri"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 15.6416, y: 4.1562, w: 3.3166, h: 0.0208, fill: { color: "161412" }, line: { type: "none" } });
slide.addText([
  { text: "— STEP 05", options: { fontSize: 18.0, fontFace: "Consolas", color: "96653A", charSpacing: 2.88 } }
], {
  x: 15.6416, y: 4.4271, w: 3.4161, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Return & debrief.", options: { fontSize: 30.0, fontFace: "Georgia", color: "161412", charSpacing: -0.3 } }
], {
  x: 15.6416, y: 4.8333, w: 3.4161, h: 0.4792, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.05, fontFace: "Georgia"
});
slide.addText([
  { text: "Detailed, delivered, and walked through — top to bottom.", options: { fontSize: 18.0, fontFace: "Calibri", color: "2B2622" } }
], {
  x: 15.6416, y: 5.4375, w: 3.4161, h: 1.1667, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.5, fontFace: "Calibri"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 1.0417, y: 9.3896, w: 17.9167, h: 0.0104, fill: { color: "161412", transparency: 82 }, line: { type: "none" } });
slide.addText([
  { text: "Average turnaround for scheduled service: ", options: { fontSize: 18.0, fontFace: "Calibri", color: "2B2622" } },
  { text: "2–4 business days.", options: { fontSize: 24.0, fontFace: "Georgia", color: "2B2622" } }
], {
  x: 1.0417, y: 9.9001, w: 7.807, h: 0.5583, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.55
});
slide.addText([
  { text: "PROCESS · REV. 2026", options: { fontSize: 18.0, fontFace: "Consolas", color: "7A7771", charSpacing: 3.24 } }
], {
  x: 15.2528, y: 9.9001, w: 3.8167, h: 0.5583, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});

// ===== Slide 15 =====
slide = pres.addSlide();
slide.background = { color: "0E0C0B" };
slide.addText([
  { text: "Brian's Auto Repair", options: { fontSize: 21.0, italic: true, fontFace: "Georgia", color: "F4EFE6" } }
], {
  x: 1.0417, y: 0.5625, w: 2.6844, h: 0.375, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Georgia"
});
slide.addText([
  { text: "14 / CONTACT", options: { fontSize: 18.0, fontFace: "Consolas", color: "F4EFE6", charSpacing: 2.52 } }
], {
  x: 16.738, y: 0.5885, w: 2.3037, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "VISIT THE SHOP", options: { fontSize: 18.0, fontFace: "Consolas", color: "C99560", charSpacing: 3.24 } }
], {
  x: 1.0417, y: 1.0417, w: 18.4542, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Bring us your ", options: { fontSize: 135.0, fontFace: "Georgia", color: "F4EFE6", charSpacing: -2.7 } },
  { text: "best car.", options: { fontSize: 135.0, italic: true, fontFace: "Georgia", color: "C99560", charSpacing: -2.7 } }
], {
  x: 1.0417, y: 1.6562, w: 12.1278, h: 3.6042, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 0.95, fontFace: "Georgia"
});
slide.addText([
  { text: "— LOCATION", options: { fontSize: 18.0, fontFace: "Consolas", color: "C99560", charSpacing: 3.24 } }
], {
  x: 1.0417, y: 6.0521, w: 8.7979, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Collins Avenue Miami Beach, FL", options: { fontSize: 42.0, fontFace: "Georgia", color: "F4EFE6", charSpacing: -0.42 } }
], {
  x: 1.0417, y: 6.4792, w: 8.7979, h: 1.3249, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.1, fontFace: "Georgia"
});
slide.addText([
  { text: "— HOURS", options: { fontSize: 18.0, fontFace: "Consolas", color: "C99560", charSpacing: 3.24 } }
], {
  x: 1.0417, y: 8.2624, w: 8.7979, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "Mon–Fri · 8a–6p Sat by appointment", options: { fontSize: 30.0, fontFace: "Georgia", color: "F4EFE6", charSpacing: -0.3 } }
], {
  x: 1.0417, y: 8.6895, w: 8.7979, h: 0.9583, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.1, fontFace: "Georgia"
});
slide.addText([
  { text: "— APPOINTMENTS", options: { fontSize: 18.0, fontFace: "Consolas", color: "C99560", charSpacing: 3.24 } }
], {
  x: 10.4167, y: 6.0521, w: 8.7979, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "(305) 555–0180 service@briansauto.com", options: { fontSize: 30.0, fontFace: "Georgia", color: "F4EFE6", charSpacing: -0.3 } }
], {
  x: 10.4167, y: 6.4792, w: 8.7979, h: 0.9583, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.1, fontFace: "Georgia"
});
slide.addText([
  { text: "— SOCIAL", options: { fontSize: 18.0, fontFace: "Consolas", color: "C99560", charSpacing: 3.24 } }
], {
  x: 10.4167, y: 7.8958, w: 8.7979, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});
slide.addText([
  { text: "@briansautomiami", options: { fontSize: 30.0, fontFace: "Georgia", color: "F4EFE6", charSpacing: -0.3 } }
], {
  x: 10.4167, y: 8.3229, w: 8.7979, h: 0.5, margin: 0, fit: "shrink", valign: "top", align: "left", lineSpacingMultiple: 1.1, fontFace: "Georgia"
});
slide.addShape(pres.shapes.RECTANGLE, { x: 1.0417, y: 9.6146, w: 17.9167, h: 0.0104, fill: { color: "F4EFE6", transparency: 78 }, line: { type: "none" } });
slide.addText([
  { text: "European marques · vintage & modern · by appointment", options: { fontSize: 24.0, italic: true, fontFace: "Georgia", color: "AFABA4", charSpacing: -0.24 } }
], {
  x: 1.0417, y: 10.0417, w: 8.5392, h: 0.4167, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Georgia"
});
slide.addText([
  { text: "BRIAN'S · EST. 2018", options: { fontSize: 18.0, fontFace: "Consolas", color: "817E78", charSpacing: 3.6 } }
], {
  x: 15.1577, y: 10.1354, w: 3.9146, h: 0.3229, margin: 0, fit: "shrink", valign: "top", align: "left", fontFace: "Consolas"
});


pres.writeFile({ fileName: "Brians_Auto_Repair_Deck_Replica.pptx" })
  .then((fileName) => console.log(`Created: ${fileName}`))
  .catch((err) => { console.error(err); process.exit(1); });
