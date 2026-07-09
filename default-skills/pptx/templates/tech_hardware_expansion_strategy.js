/*
 * The Case for Expansion — pptxgenjs replica
 *
 * Replicates the 10-slide editorial memo deck (20" x 11.25", WSJ-editorial palette).
 * Run with:  node build.js
 *
 * The four figures (slide 1 drone schematic, slide 3 demand-vs-capacity chart,
 * slide 5 floor plan, slide 6 headcount grid) are reconstructed from native
 * pptxgenjs shapes — so the whole deck is fully editable in PowerPoint.
 */

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.defineLayout({ name: "EDITORIAL", width: 20, height: 11.25 });
pres.layout = "EDITORIAL";
pres.title = "The Case for Expansion";

/* ---------- Design tokens ---------- */
const C = {
  bg:      "F5F1EA",   // warm paper
  card:    "EFEADF",   // card tint (slightly darker paper)
  ink:     "14110F",   // near-black text
  muted:   "6B6057",   // warm gray caption
  rule:    "3A332C",   // rule lines (softer than ink)
  rust:    "B8573A",   // editorial rust accent
  rustLt:  "E8CFC0",   // rust tint
};
const F = {
  serif: "Georgia",     // display serif
  mono:  "Consolas",    // caption / eyebrow
  sans:  "Calibri",     // body fallback
};

/* ---------- Master ---------- */
pres.defineSlideMaster({
  title: "MAIN",
  width: 20,
  height: 11.25,
  background: { color: C.bg },
});

/* ---------- helpers ---------- */
const W = 20, H = 11.25;
const LM = 1.33, RM = 18.75; // left/right content edges
const FOOT_Y = 10.60;

function header(slide, eyebrowLeft, eyebrowRight) {
  slide.addText(eyebrowLeft, {
    x: LM, y: 0.50, w: 6, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2,
  });
  slide.addText(eyebrowRight, {
    x: W - LM - 5, y: 0.50, w: 5, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2,
    align: "right",
  });
}
function footer(slide, page) {
  slide.addText("THE CASE FOR EXPANSION", {
    x: LM, y: FOOT_Y, w: 4, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2,
  });
  slide.addText(page, {
    x: W - LM - 3, y: FOOT_Y, w: 3, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2,
    align: "right",
  });
}
function hLine(slide, x, y, w, opts = {}) {
  slide.addShape("line", {
    x, y, w, h: 0,
    line: { color: opts.color || C.rule, width: opts.width || 0.75, dashType: opts.dash || "solid" },
  });
}
function vLine(slide, x, y, h, opts = {}) {
  slide.addShape("line", {
    x, y, w: 0, h,
    line: { color: opts.color || C.rule, width: opts.width || 0.75, dashType: opts.dash || "solid" },
  });
}

/* =====================================================================
 * SLIDE 1 — Cover
 * ===================================================================== */
{
  const s = pres.addSlide({ masterName: "MAIN" });
  header(s, "DRONES CO. INTERNAL MEMO", "APRIL 2026");

  // "A memo to the team" marker
  s.addShape("line", { x: LM, y: 1.51, w: 0.83, h: 0, line: { color: C.ink, width: 1 } });
  s.addText("A MEMO TO THE TEAM", {
    x: 2.35, y: 1.42, w: 3, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.ink, charSpacing: 2,
  });

  // --- Drone schematic (right side, shifted up to avoid footer) ---
  drawDrone(s, 11.30, 1.40, 7.10);

  // Figure caption (above the drone, top-right editorial style)
  s.addText("Fig. 00 — The product.", {
    x: 15.8, y: 0.95, w: 3.2, h: 0.28,
    fontFace: F.serif, fontSize: 13, italic: true, color: C.ink, align: "right",
  });
  s.addText([
    { text: "01 ", options: { bold: true } },
    { text: "QUAD FRAME · 450 MM SPAN" },
  ], {
    x: 14.8, y: 1.18, w: 4.2, h: 0.22,
    fontFace: F.mono, fontSize: 8, color: C.ink, charSpacing: 2, align: "right",
  });
  s.addText([
    { text: "02 ", options: { bold: true } },
    { text: "TWIN-REDUNDANT AVIONICS" },
  ], {
    x: 14.8, y: 1.36, w: 4.2, h: 0.22,
    fontFace: F.mono, fontSize: 8, color: C.ink, charSpacing: 2, align: "right",
  });

  // Volume tag
  s.addText("VOL. 01 · STRATEGY", {
    x: LM, y: 3.57, w: 10, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.ink, charSpacing: 2, bold: true,
  });

  // Hero title
  s.addText([
    { text: "The case for " },
    { text: "expansion", options: { italic: true } },
    { text: "." },
  ], {
    x: LM, y: 3.90, w: 11, h: 2.6,
    fontFace: F.serif, fontSize: 96, color: C.ink, valign: "top",
    margin: 0,
  });

  // Subhead
  s.addText(
    "Why the next year is the year we stop being constrained by our own factory — and start being constrained only by our ambition.",
    {
      x: LM, y: 7.20, w: 5.2, h: 2.4,
      fontFace: F.serif, fontSize: 20, color: C.ink, valign: "top",
    }
  );

  // Divider above metadata
  hLine(s, LM, 9.44, 17.33, { color: C.ink, width: 0.75 });

  // Metadata row
  const meta = [
    ["AUDIENCE",  "Full team",            LM],
    ["DURATION",  "~10 minutes",          5.79],
    ["DECISION",  "Direction, not budget",10.25],
    ["AUTHOR",    "The founding team",    14.71],
  ];
  meta.forEach(([label, val, x]) => {
    s.addText(label, {
      x, y: 9.74, w: 4.08, h: 0.22,
      fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2,
    });
    s.addText(val, {
      x, y: 9.99, w: 4.08, h: 0.35,
      fontFace: F.serif, fontSize: 16, color: C.ink,
    });
  });

  footer(s, "01 / 10");
}

// ------- drone drawing helper -------
function drawDrone(s, x, y, size) {
  const cx = x + size / 2;
  const cy = y + size / 2;
  const r  = size * 0.47;

  // 1. Compass circle (dashed, behind everything)
  s.addShape("ellipse", {
    x: cx - r, y: cy - r, w: r * 2, h: r * 2,
    fill: { color: C.bg },
    line: { color: C.muted, pt: 0.75, dashType: "dash" },
  });

  // 2. compass letters (outside the circle edges)
  [["N", cx,     y + 0.05],
   ["S", cx,     y + size - 0.25],
   ["E", x + size - 0.15, cy - 0.11],
   ["W", x + 0.05,        cy - 0.11]].forEach(([ltr, lx, ly]) => {
    s.addText(ltr, { x: lx - 0.2, y: ly, w: 0.4, h: 0.22,
      fontFace: F.mono, fontSize: 9, color: C.muted, align: "center" });
  });

  // 3. inner crosshair (on top of compass)
  s.addShape("line", { x: cx - r, y: cy, w: r * 2, h: 0,
    line: { color: C.muted, width: 0.5, dashType: "dash" } });
  s.addShape("line", { x: cx, y: cy - r, w: 0, h: r * 2,
    line: { color: C.muted, width: 0.5, dashType: "dash" } });

  // 4. four rotor booms → each corner
  const d = size * 0.33;
  const corners = [
    [cx - d, cy - d], // NW
    [cx + d, cy - d], // NE
    [cx - d, cy + d], // SW
    [cx + d, cy + d], // SE
  ];
  corners.forEach(([rx, ry]) => {
    s.addShape("line", { x: cx, y: cy, w: rx - cx, h: ry - cy,
      line: { color: C.ink, width: 1.5 } });
  });

  // 5. rotor discs (tinted) + dashed outline
  const rotR = size * 0.11;
  corners.forEach(([rx, ry]) => {
    s.addShape("ellipse", {
      x: rx - rotR, y: ry - rotR, w: rotR * 2, h: rotR * 2,
      fill: { color: C.rustLt },
      line: { color: C.rust, pt: 0.75, dashType: "dash" },
    });
    // hub
    s.addShape("ellipse", {
      x: rx - 0.07, y: ry - 0.07, w: 0.14, h: 0.14,
      fill: { color: C.bg }, line: { color: C.ink, pt: 1 },
    });
    s.addShape("ellipse", {
      x: rx - 0.03, y: ry - 0.03, w: 0.06, h: 0.06,
      fill: { color: C.ink }, line: { color: C.ink, pt: 0 },
    });
    // rust arc suggestion
    s.addShape("line", {
      x: rx - rotR * 0.5, y: ry - rotR * 0.9,
      w: rotR, h: 0,
      line: { color: C.rust, width: 2 },
    });
  });

  // 6. central body (battery + FC)
  const bw = size * 0.19, bh = size * 0.16;
  const bx = cx - bw / 2, by = cy - bh / 2;
  s.addShape("rect", {
    x: bx, y: by, w: bw, h: bh,
    fill: { color: C.bg }, line: { color: C.ink, pt: 1.25 },
    rectRadius: 0.05,
  });
  s.addText("LIPO 6S", {
    x: bx, y: by + 0.02, w: bw, h: 0.28,
    fontFace: F.mono, fontSize: 7, color: C.ink, align: "center",
  });
  s.addShape("line", { x: bx + 0.05, y: by + bh * 0.42, w: bw - 0.10, h: 0,
    line: { color: C.ink, width: 0.5 } });
  s.addShape("rect", {
    x: bx + 0.05, y: by + bh * 0.48, w: bw - 0.10, h: bh * 0.35,
    fill: { color: C.ink }, line: { color: C.ink, pt: 0 },
    rectRadius: 0.02,
  });
  s.addText("• • FC · v3 • •", {
    x: bx, y: by + bh * 0.48, w: bw, h: bh * 0.35,
    fontFace: F.mono, fontSize: 7, color: C.bg, align: "center", valign: "middle",
  });

  // 7. 450 MM span dimension line (bottom)
  const dimY = y + size - 0.35;
  s.addShape("line", {
    x: cx - d, y: dimY, w: d * 2, h: 0,
    line: { color: C.ink, width: 0.75 },
  });
  s.addShape("line", { x: cx - d, y: dimY - 0.07, w: 0, h: 0.14,
    line: { color: C.ink, width: 0.75 } });
  s.addShape("line", { x: cx + d, y: dimY - 0.07, w: 0, h: 0.14,
    line: { color: C.ink, width: 0.75 } });
  s.addShape("rect", { x: cx - 0.35, y: dimY - 0.12, w: 0.70, h: 0.24,
    fill: { color: C.bg }, line: { color: C.bg, pt: 0 } });
  s.addText("450 MM", {
    x: cx - 0.5, y: dimY - 0.12, w: 1.0, h: 0.24,
    fontFace: F.mono, fontSize: 8, color: C.ink, align: "center", valign: "middle",
  });
}

/* =====================================================================
 * SLIDE 2 — Baseline (state of the company)
 * ===================================================================== */
{
  const s = pres.addSlide({ masterName: "MAIN" });
  header(s, "§ I · BASELINE", "WHERE WE ARE TODAY");

  s.addText("STATE OF THE COMPANY", {
    x: LM, y: 1.00, w: 8, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2,
  });

  // hero
  s.addText("A small shop doing\nserious work.", {
    x: LM, y: 1.40, w: 9, h: 2.6,
    fontFace: F.serif, fontSize: 72, color: C.ink, valign: "top",
  });

  s.addText([
    { text: "In three years we’ve gone from a bench and a soldering iron to a " },
    { text: "real product line", options: { italic: true } },
    { text: " with real customers who keep coming back." },
  ], {
    x: LM, y: 5.40, w: 4.5, h: 3.5,
    fontFace: F.serif, fontSize: 20, color: C.ink, valign: "top",
  });

  s.addText("EVERY NUMBER BELOW IS WHAT WE’VE EARNED, TOGETHER.", {
    x: LM, y: 10.10, w: 10, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2,
  });

  // Right column — stat rows
  const rows = [
    ["People on the team",         "12",    ""],
    ["Units shipped to date",      "1,840", ""],
    ["Active customers",           "94",    ""],
    ["Revenue, trailing 12 months","$4.2",  "M"],
    ["Reorder rate",               "71",    "%"],
    ["Current lead time",          "14",    "WEEKS"],
  ];

  const RX = 10.50, RW = 8.17;
  const top = 2.65, step = 0.99;
  // top rule
  hLine(s, RX, top, RW, { color: C.muted, width: 0.75 });
  rows.forEach((r, i) => {
    const y = top + step * i;
    // label
    s.addText(r[0], {
      x: RX, y: y + 0.35, w: RW - 2, h: 0.35,
      fontFace: F.serif, fontSize: 16, color: C.ink,
    });
    // big number (right aligned, leaves room at right for unit)
    const suffixW = r[2] ? (r[2].length > 2 ? 0.75 : 0.35) : 0;
    s.addText(r[1], {
      x: RX + 3, y: y + 0.15, w: RW - 3.1 - suffixW, h: 0.75,
      fontFace: F.serif, fontSize: 40, color: C.ink, align: "right", valign: "middle",
      margin: 0,
    });
    // unit suffix (small, baseline aligned to bottom of number)
    if (r[2]) {
      s.addText(r[2], {
        x: RX + RW - suffixW - 0.02, y: y + 0.58, w: suffixW, h: 0.30,
        fontFace: F.mono, fontSize: 8, color: C.muted, align: "left", valign: "bottom", charSpacing: 1,
      });
    }
    // bottom rule
    hLine(s, RX, y + step, RW, { color: C.muted, width: 0.75 });
  });

  footer(s, "02 / 10");
}

/* =====================================================================
 * SLIDE 3 — The problem (demand vs capacity)
 * ===================================================================== */
{
  const s = pres.addSlide({ masterName: "MAIN" });
  header(s, "§ II · THE PROBLEM", "DEMAND VS. CAPACITY");

  s.addText("THE PROBLEM, IN ONE PICTURE", {
    x: LM, y: 1.83, w: 8, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2,
  });

  s.addText("Demand is\noutpacing us.", {
    x: LM, y: 2.20, w: 5.1, h: 3.6,
    fontFace: F.serif, fontSize: 54, color: C.ink, valign: "top",
  });

  s.addText([
    { text: "Orders are " },
    { text: "compounding", options: { italic: true } },
    { text: ". Our factory is not." },
  ], {
    x: LM, y: 6.20, w: 4.5, h: 1.1,
    fontFace: F.serif, fontSize: 24, color: C.ink, valign: "top",
  });

  hLine(s, LM, 7.68, 0.67, { color: C.ink, width: 0.75 });

  s.addText(
    "Quoted lead time has doubled in the last nine months. Two of our three largest deals last quarter were lost to capacity, not to competitors.",
    {
      x: LM, y: 7.95, w: 4.8, h: 1.7,
      fontFace: F.serif, fontSize: 16, color: C.ink, valign: "top",
    }
  );

  // --- Chart region ---
  drawDemandChart(s, 6.54, 2.3, 12.12, 6.0);

  // chart legend
  s.addShape("line", { x: 6.54, y: 8.49, w: 0.3, h: 0,
    line: { color: C.rust, width: 2.5 } });
  s.addText("INBOUND DEMAND", {
    x: 6.94, y: 8.42, w: 3, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2,
  });
  s.addShape("line", { x: 8.72, y: 8.49, w: 0.3, h: 0,
    line: { color: C.ink, width: 1.2, dashType: "dash" } });
  s.addText("SHIPPING CAPACITY", {
    x: 9.15, y: 8.42, w: 3, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2,
  });

  footer(s, "03 / 10");
}

function drawDemandChart(s, x, y, w, h) {
  // Horizontal guide lines (subtle)
  const gy1 = y + h * 0.15, gy2 = y + h * 0.55, gy3 = y + h * 0.92;
  hLine(s, x, gy1, w, { color: C.muted, width: 0.4 });
  hLine(s, x, gy2, w, { color: C.muted, width: 0.4 });
  hLine(s, x + 0.2, gy3, w - 0.2, { color: C.ink, width: 0.75 });

  // HIGH/LOW labels — boxed
  s.addShape("rect", { x: x + 0.15, y: gy1 - 0.16, w: 0.85, h: 0.32,
    fill: { color: C.bg }, line: { color: C.bg, width: 0 } });
  s.addText("HIGH", { x: x + 0.15, y: gy1 - 0.16, w: 0.85, h: 0.32,
    fontFace: F.serif, fontSize: 12, color: C.ink, align: "center", valign: "middle", italic: true });
  s.addShape("rect", { x: x + 0.15, y: gy3 - 0.14, w: 0.75, h: 0.28,
    fill: { color: C.bg }, line: { color: C.bg, width: 0 } });
  s.addText("LOW", { x: x + 0.15, y: gy3 - 0.14, w: 0.75, h: 0.28,
    fontFace: F.serif, fontSize: 11, color: C.ink, align: "center", valign: "middle", italic: true });

  // Demand curve — S-curve as Bezier-like sequence of small segments
  // We'll fake a smooth curve with a series of line segments along y = sigmoid
  const N = 60;
  const xL = x + 0.3, xR = x + w - 0.4;
  const yHigh = y + h * 0.12, yLow = y + h * 0.90;
  const pts = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    // sigmoid centered at 0.5
    const s_val = 1 / (1 + Math.exp(-(t - 0.5) * 9));
    const px = xL + (xR - xL) * t;
    const py = yLow - (yLow - yHigh) * s_val;
    pts.push([px, py]);
  }
  // light rust fill area under the curve — approximate with polygon-like horizontal bands
  // (pptxgenjs doesn't natively polygon, so we'll skip fill and just draw the line prominently)
  for (let i = 0; i < pts.length - 1; i++) {
    s.addShape("line", {
      x: pts[i][0], y: pts[i][1],
      w: pts[i + 1][0] - pts[i][0],
      h: pts[i + 1][1] - pts[i][1],
      line: { color: C.rust, width: 3 },
    });
  }
  // Demand label
  s.addText("Demand", {
    x: xR - 1.2, y: yHigh - 0.35, w: 1.4, h: 0.35,
    fontFace: F.serif, fontSize: 16, color: C.ink, italic: true, align: "right",
  });

  // Capacity — dashed stair-step
  const caps = [
    [xL,                  y + h * 0.77],
    [xL + (xR - xL) * 0.2,y + h * 0.77],
    [xL + (xR - xL) * 0.2,y + h * 0.65],
    [xL + (xR - xL) * 0.5,y + h * 0.65],
    [xL + (xR - xL) * 0.5,y + h * 0.55],
    [xL + (xR - xL) * 0.75,y + h * 0.55],
    [xL + (xR - xL) * 0.75,y + h * 0.48],
    [xR,                  y + h * 0.48],
  ];
  for (let i = 0; i < caps.length - 1; i++) {
    s.addShape("line", {
      x: caps[i][0], y: caps[i][1],
      w: caps[i + 1][0] - caps[i][0],
      h: caps[i + 1][1] - caps[i][1],
      line: { color: C.ink, width: 1.5, dashType: "dash" },
    });
  }
  // Capacity label
  s.addText("Capacity", {
    x: xR - 1.4, y: y + h * 0.42, w: 1.6, h: 0.35,
    fontFace: F.serif, fontSize: 16, color: C.ink, italic: true, align: "right",
  });

  // X-axis labels
  const labels = ["Q1'24", "Q3'24", "Q1'25", "Q3'25", "Q1'26"];
  labels.forEach((lbl, i) => {
    const px = xL + (xR - xL) * (i / (labels.length - 1));
    s.addText(lbl, {
      x: px - 0.5, y: gy3 + 0.05, w: 1.0, h: 0.28,
      fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 1, align: "center",
    });
  });
}

/* =====================================================================
 * SLIDE 4 — The proposal (two levers)
 * ===================================================================== */
{
  const s = pres.addSlide({ masterName: "MAIN" });
  header(s, "§ III · THE PROPOSAL", "TWO LEVERS");

  s.addText("WHAT WE’RE PROPOSING", {
    x: LM, y: 1.00, w: 10, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2,
  });

  s.addText("Pull two levers, in that order.", {
    x: LM, y: 1.30, w: 17.85, h: 2.4,
    fontFace: F.serif, fontSize: 72, color: C.ink, valign: "top",
  });

  s.addText([
    { text: "We don’t need a new product, a new market, or a new story. We need " },
    { text: "more of what already works", options: { italic: true } },
    { text: " — delivered faster, and built by more hands." },
  ], {
    x: LM, y: 4.10, w: 7.5, h: 2.5,
    fontFace: F.serif, fontSize: 24, color: C.ink, valign: "top",
  });

  // Two columns at bottom
  const colW = 8.33, colLx = LM, colRx = 10.33;
  // top rules
  hLine(s, colLx, 6.88, colW, { color: C.ink, width: 0.75 });
  hLine(s, colRx, 6.88, colW, { color: C.ink, width: 0.75 });

  // LEVER 01
  s.addText("LEVER 01", {
    x: colLx, y: 7.15, w: 6, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2,
  });
  s.addText("Scale manufacturing capacity.", {
    x: colLx, y: 7.45, w: colW, h: 0.75,
    fontFace: F.serif, fontSize: 30, color: C.ink,
  });
  s.addText(
    "A second assembly cell, new test fixtures, and a proper supply-chain lead. Cut lead time in half; more than double monthly throughput without sacrificing the quality we’re known for.",
    {
      x: colLx, y: 8.35, w: 7.5, h: 1.6,
      fontFace: F.serif, fontSize: 16, color: C.ink, valign: "top",
    }
  );
  s.addText([
    { text: "TARGET: ", options: { color: C.muted } },
    { text: "SHIP IN 6 WEEKS, NOT 14", options: { color: C.ink, bold: true } },
  ], {
    x: colLx, y: 10.10, w: 8, h: 0.25,
    fontFace: F.mono, fontSize: 10, charSpacing: 2,
  });

  // LEVER 02
  s.addText("LEVER 02", {
    x: colRx, y: 7.15, w: 6, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2,
  });
  s.addText("Grow the team, deliberately.", {
    x: colRx, y: 7.45, w: colW, h: 0.75,
    fontFace: F.serif, fontSize: 30, color: C.ink,
  });
  s.addText(
    "Six hires over two quarters — weighted to production and firmware, with a first real GTM hire. No middle-management layer; we stay flat, we stay fast.",
    {
      x: colRx, y: 8.35, w: 7.5, h: 1.6,
      fontFace: F.serif, fontSize: 16, color: C.ink, valign: "top",
    }
  );
  s.addText([
    { text: "TARGET: ", options: { color: C.muted } },
    { text: "12 PEOPLE → 18 PEOPLE", options: { color: C.ink, bold: true } },
  ], {
    x: colRx, y: 10.10, w: 8, h: 0.25,
    fontFace: F.mono, fontSize: 10, charSpacing: 2,
  });

  footer(s, "04 / 10");
}

/* =====================================================================
 * SLIDE 5 — Lever 01 (manufacturing)
 * ===================================================================== */
{
  const s = pres.addSlide({ masterName: "MAIN" });
  header(s, "§ III.A · LEVER 01", "MANUFACTURING CAPACITY");

  // Lever 01 eyebrow
  s.addText([
    { text: "Lever 01   ", options: { fontFace: F.mono, color: C.ink, charSpacing: 2 } },
    { text: "Scale manufacturing capacity", options: { fontFace: F.serif, italic: true, color: C.ink } },
  ], {
    x: LM, y: 1.02, w: 8.74, h: 0.35,
    fontSize: 13,
  });
  hLine(s, LM, 1.50, 8.74, { color: C.ink, width: 0.75 });

  // Hero
  s.addText("Build the second line.", {
    x: LM, y: 1.92, w: 9, h: 1.6,
    fontFace: F.serif, fontSize: 60, color: C.ink,
  });

  // Subcopy
  s.addText([
    { text: "One line is a workshop. Two lines is a factory. " },
    { text: "That’s the inflection.", options: { italic: true } },
  ], {
    x: LM, y: 4.35, w: 5, h: 1.5,
    fontFace: F.serif, fontSize: 24, color: C.ink, valign: "top",
  });

  // Stat rows (left column)
  const statY = 6.26;
  hLine(s, LM, statY, 8.74, { color: C.muted, width: 0.75 });
  const rows5 = [
    ["MOVE",         "Second assembly cell, parallel to current line", ""],
    ["THROUGHPUT",   "Monthly units shipped",                          "75 → 180"],
    ["LEAD TIME",    "Quote to door",                                  "14 → 6 WKS"],
    ["TEST COVERAGE","Automated bench per unit",                       "60 → 100%"],
    ["TIMELINE",     "Tooling in, first unit off line",                "~5 mo."],
  ];
  rows5.forEach((r, i) => {
    const ry = statY + 0.33 + i * 0.66;
    s.addText(r[0], { x: LM, y: ry - 0.05, w: 1.96, h: 0.25,
      fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2 });
    s.addText(r[1], { x: 3.46, y: ry - 0.10, w: 5.5, h: 0.35,
      fontFace: F.serif, fontSize: 15, color: C.ink });
    if (r[2]) {
      s.addText(r[2], { x: 7.5, y: ry - 0.18, w: 2.7, h: 0.5,
        fontFace: F.serif, fontSize: 22, color: C.ink, align: "right" });
    }
    hLine(s, LM, statY + 0.66 * (i + 1), 8.74, { color: C.muted, width: 0.75 });
  });

  // --- Floor plan (right) ---
  s.addShape("rect", {
    x: 11.07, y: 1.12, w: 7.60, h: 7.28,
    fill: { color: C.card }, line: { color: C.card, width: 0 },
  });
  s.addText("FIG. 01 · FLOOR PLAN, PROPOSED", {
    x: 11.41, y: 1.42, w: 5, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.ink, charSpacing: 2,
  });
  s.addText("1 : 120", {
    x: 16.7, y: 1.42, w: 1.7, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2, align: "right",
  });
  hLine(s, 11.41, 1.78, 6.91, { color: C.ink, width: 0.5 });

  drawFloorPlan(s, 11.41, 2.04, 6.91, 6.03);

  // Quote card
  s.addShape("rect", {
    x: 11.07, y: 8.74, w: 7.60, h: 1.51,
    fill: { color: C.card }, line: { color: C.card, width: 0 },
  });
  s.addText("“We stop saying no to customers because of our own throughput ceiling.”", {
    x: 11.48, y: 9.12, w: 7.04, h: 0.85,
    fontFace: F.serif, fontSize: 16, italic: true, color: C.ink, valign: "middle",
  });

  footer(s, "05 / 10");
}

function drawFloorPlan(s, x, y, w, h) {
  // Outer frame
  s.addShape("rect", {
    x, y, w, h,
    fill: { color: C.bg }, line: { color: C.ink, width: 1.25 },
  });
  // Center dashed divider
  s.addShape("line", {
    x: x + w / 2, y: y + 0.2, w: 0, h: h - 0.4,
    line: { color: C.ink, width: 0.75, dashType: "dash" },
  });

  // Line A column (left) & Line B column (right)
  const steps = ["KIT & STAGE", "FRAME ASM", "AVIONICS", "TEST", "PACK & SHIP"];
  const colTop = y + 0.35;
  const colBot = y + h - 0.35;
  const boxH = 0.55;
  const gap = (colBot - colTop - boxH * steps.length) / (steps.length - 1);
  const leftW  = w / 2 - 0.50;
  const rightW = w / 2 - 0.50;
  const leftX  = x + 0.25;
  const rightX = x + w / 2 + 0.25;

  // Headers
  s.addText("LINE A · EXISTING", {
    x: leftX,  y: y + 0.12, w: leftW,  h: 0.25,
    fontFace: F.serif, fontSize: 12, color: C.ink, align: "center", italic: true,
  });
  s.addText("LINE B · PROPOSED", {
    x: rightX, y: y + 0.12, w: rightW, h: 0.25,
    fontFace: F.serif, fontSize: 12, color: C.ink, align: "center", italic: true,
  });

  steps.forEach((stp, i) => {
    const by = colTop + i * (boxH + gap) + 0.25;

    // connector line above
    if (i > 0) {
      s.addShape("line", {
        x: leftX + leftW / 2, y: by - gap, w: 0, h: gap,
        line: { color: C.ink, width: 1 },
      });
      s.addShape("line", {
        x: rightX + rightW / 2, y: by - gap, w: 0, h: gap,
        line: { color: C.rust, width: 1 },
      });
    }
    // Line A box
    s.addShape("rect", {
      x: leftX, y: by, w: leftW, h: boxH,
      fill: { color: C.bg }, line: { color: C.ink, width: 1 },
    });
    s.addText(stp, {
      x: leftX, y: by, w: leftW, h: boxH,
      fontFace: F.mono, fontSize: 9, color: C.ink, charSpacing: 2, align: "center", valign: "middle", bold: true,
    });
    // Line B box (rust tinted)
    s.addShape("rect", {
      x: rightX, y: by, w: rightW, h: boxH,
      fill: { color: C.rustLt }, line: { color: C.rust, width: 1 },
    });
    s.addText(stp, {
      x: rightX, y: by, w: rightW, h: boxH,
      fontFace: F.mono, fontSize: 9, color: C.ink, charSpacing: 2, align: "center", valign: "middle", bold: true,
    });
  });
}

/* =====================================================================
 * SLIDE 6 — Lever 02 (team)
 * ===================================================================== */
{
  const s = pres.addSlide({ masterName: "MAIN" });
  header(s, "§ III.B · LEVER 02", "GROW THE TEAM");

  s.addText([
    { text: "Lever 02   ", options: { fontFace: F.mono, color: C.ink, charSpacing: 2 } },
    { text: "Grow the team, deliberately", options: { fontFace: F.serif, italic: true, color: C.ink } },
  ], {
    x: LM, y: 1.02, w: 8.74, h: 0.35,
    fontSize: 13,
  });
  hLine(s, LM, 1.50, 8.74, { color: C.ink, width: 0.75 });

  s.addText("Six hires. Two quarters.", {
    x: LM, y: 1.92, w: 9, h: 1.6,
    fontFace: F.serif, fontSize: 60, color: C.ink,
  });

  s.addText([
    { text: "Weighted where the " },
    { text: "bottleneck actually is", options: { italic: true } },
    { text: " — the factory floor and firmware — not where it’s fashionable." },
  ], {
    x: LM, y: 4.35, w: 5.5, h: 2.1,
    fontFace: F.serif, fontSize: 24, color: C.ink, valign: "top",
  });

  const statY = 6.75;
  hLine(s, LM, statY, 8.74, { color: C.muted, width: 0.75 });
  const rows6 = [
    ["Q2 2026",   "Production tech · Supply-chain lead",      "+2"],
    ["Q3 2026",   "Firmware eng. · Production tech",          "+2"],
    ["Q4 2026",   "Field applications · First GTM hire",      "+2"],
    ["ENDPOINT",  "Headcount by year end",                    "18"],
    ["STRUCTURE", "No new management layer — we stay flat",   ""],
  ];
  rows6.forEach((r, i) => {
    const ry = statY + 0.33 + i * 0.66;
    s.addText(r[0], { x: LM, y: ry - 0.05, w: 1.96, h: 0.25,
      fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2 });
    s.addText(r[1], { x: 3.46, y: ry - 0.10, w: 6.2, h: 0.35,
      fontFace: F.serif, fontSize: 15, color: C.ink });
    if (r[2]) {
      s.addText(r[2], { x: 7.5, y: ry - 0.18, w: 2.7, h: 0.5,
        fontFace: F.serif, fontSize: 22, color: C.ink, align: "right" });
    }
    hLine(s, LM, statY + 0.66 * (i + 1), 8.74, { color: C.muted, width: 0.75 });
  });

  // --- Headcount grid (right) ---
  s.addShape("rect", {
    x: 11.07, y: 1.12, w: 7.60, h: 7.28,
    fill: { color: C.card }, line: { color: C.card, width: 0 },
  });
  s.addText("FIG. 02 · HEADCOUNT COMPOSITION", {
    x: 11.41, y: 1.42, w: 5, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.ink, charSpacing: 2,
  });
  s.addText("12 → 18", {
    x: 16.7, y: 1.42, w: 1.7, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2, align: "right",
  });
  hLine(s, 11.41, 1.78, 6.91, { color: C.ink, width: 0.5 });

  drawHeadcountGrid(s, 11.41, 2.04, 6.91, 6.03);

  // Quote card
  s.addShape("rect", {
    x: 11.07, y: 8.74, w: 7.60, h: 1.51,
    fill: { color: C.card }, line: { color: C.card, width: 0 },
  });
  s.addText("“We hire for the bottleneck, not for the org chart we wish we had.”", {
    x: 11.48, y: 9.12, w: 7.04, h: 0.85,
    fontFace: F.serif, fontSize: 16, italic: true, color: C.ink, valign: "middle",
  });

  footer(s, "06 / 10");
}

function drawHeadcountGrid(s, x, y, w, h) {
  // Two labeled groups: TODAY · 12  and  PROPOSED · 18
  s.addText("TODAY · 12", {
    x: x, y: y + 0.25, w: w / 2, h: 0.35,
    fontFace: F.serif, fontSize: 16, color: C.ink, align: "center",
  });
  s.addText("PROPOSED · 18", {
    x: x + w / 2, y: y + 0.25, w: w / 2, h: 0.35,
    fontFace: F.serif, fontSize: 16, color: C.rust, align: "center",
  });

  // Palette: production=black, firmware=dark gray, hardware=medium gray, new hires=rust
  const cPro = "14110F", cFw = "3A332C", cHw = "8A7F76", cNew = C.rust;

  // TODAY grid (12 cells, 2 cols x 6 rows), colors hand-placed to match image
  const todayCols = [
    // col 0                   col 1
    ["hw", "fw", "fw", "pro", "pro", "pro"],
    ["hw", "hw", "fw", "pro", "pro", "pro"],
  ];
  // PROPOSED grid (18 cells, 2 cols x 9 rows) with rust new hires mixed in
  const propCols = [
    ["new","hw","fw","new","pro","pro","pro","pro","pro"],
    ["hw","hw","fw","pro","new","new","pro","pro","pro"],
  ];
  const paint = { pro: cPro, fw: cFw, hw: cHw, new: cNew };

  const cell = 0.32;
  const gap  = 0.03;
  // TODAY block, bottom-aligned
  const todayRows = todayCols[0].length;
  const todayW = 2 * cell + gap;
  const todayH = todayRows * cell + (todayRows - 1) * gap;
  const tX = x + w / 4 - todayW / 2;
  const baseY = y + h - 0.7;
  const tY = baseY - todayH;
  todayCols.forEach((col, ci) => {
    col.forEach((k, ri) => {
      s.addShape("rect", {
        x: tX + ci * (cell + gap),
        y: tY + ri * (cell + gap),
        w: cell, h: cell,
        fill: { color: paint[k] }, line: { color: paint[k], width: 0 },
      });
    });
  });

  // PROPOSED block
  const propRows = propCols[0].length;
  const propW = 2 * cell + gap;
  const propH = propRows * cell + (propRows - 1) * gap;
  const pX = x + 3 * w / 4 - propW / 2;
  const pY = baseY - propH;
  propCols.forEach((col, ci) => {
    col.forEach((k, ri) => {
      s.addShape("rect", {
        x: pX + ci * (cell + gap),
        y: pY + ri * (cell + gap),
        w: cell, h: cell,
        fill: { color: paint[k] }, line: { color: paint[k], width: 0 },
      });
    });
  });

  // Baseline under grids
  hLine(s, x + 0.4, baseY + 0.05, w - 0.8, { color: C.ink, width: 0.75 });

  // Legend
  const lY = baseY + 0.30;
  const legend = [
    ["PRODUCTION", cPro],
    ["FIRMWARE",   cFw],
    ["HARDWARE",   cHw],
    ["NEW HIRES",  cNew],
  ];
  const legW = w / legend.length;
  legend.forEach((L, i) => {
    const lx = x + legW * i + 0.2;
    s.addShape("rect", {
      x: lx, y: lY + 0.05, w: 0.18, h: 0.18,
      fill: { color: L[1] }, line: { color: L[1], width: 0 },
    });
    s.addText(L[0], {
      x: lx + 0.28, y: lY, w: legW - 0.4, h: 0.3,
      fontFace: F.mono, fontSize: 9, charSpacing: 2,
      color: L[0] === "NEW HIRES" ? C.rust : C.ink,
    });
  });
}

/* =====================================================================
 * SLIDE 7 — Upside (three things)
 * ===================================================================== */
{
  const s = pres.addSlide({ masterName: "MAIN" });
  header(s, "§ IV · THE UPSIDE", "WHAT THIS UNLOCKS");

  s.addText("WHAT THIS UNLOCKS", {
    x: LM, y: 1.00, w: 10, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2,
  });
  s.addText([
    { text: "Three things we " },
    { text: "can’t do today", options: { italic: true } },
    { text: "." },
  ], {
    x: LM, y: 1.30, w: 17.85, h: 1.5,
    fontFace: F.serif, fontSize: 60, color: C.ink, valign: "top",
  });
  s.addText([
    { text: "The point of expanding isn’t to be bigger. It’s to be able to say " },
    { text: "yes", options: { italic: true } },
    { text: " to the work we keep turning down." },
  ], {
    x: LM, y: 3.10, w: 12, h: 1.5,
    fontFace: F.serif, fontSize: 22, color: C.ink, valign: "top",
  });

  const cols = [
    {
      x: LM, num: "01",
      head: "Take the enterprise deals we currently decline.",
      body: "Two named accounts asked for 200+ unit orders this year. We couldn’t quote a believable delivery date. With Line B and six-week lead times, we can — and that’s roughly a third of a year’s revenue each.",
    },
    {
      x: 7.28, num: "02",
      head: "Ship firmware on a monthly cadence, not a quarterly one.",
      body: "A second firmware engineer pulls us out of reactive patching. Customers get the features they keep asking for; we stop burning nights on field fixes.",
    },
    {
      x: 13.22, num: "03",
      head: "Develop the next product line in parallel, not instead-of.",
      bodyRich: [
        { text: "Right now every engineer moonlighting on R&D is an engineer not shipping. More throughput and more hands means we can explore the " },
        { text: "next", options: { italic: true } },
        { text: " thing without stopping the current one." },
      ],
    },
  ];
  cols.forEach(c => {
    hLine(s, c.x, 7.01, 5.44, { color: C.ink, width: 0.75 });
    s.addText(c.num, {
      x: c.x, y: 7.20, w: 5.61, h: 1.05,
      fontFace: F.serif, fontSize: 64, color: C.ink,
    });
    s.addText(c.head, {
      x: c.x, y: 8.45, w: 5.61, h: 0.75,
      fontFace: F.serif, fontSize: 18, color: C.ink, bold: true, valign: "top",
    });
    s.addText(c.body ? c.body : c.bodyRich, {
      x: c.x, y: 9.30, w: 5.61, h: 1.20,
      fontFace: F.serif, fontSize: 13, color: C.ink, valign: "top",
    });
  });

  footer(s, "07 / 10");
}

/* =====================================================================
 * SLIDE 8 — Investment
 * ===================================================================== */
{
  const s = pres.addSlide({ masterName: "MAIN" });
  header(s, "§ V · THE INVESTMENT", "WHAT IT COSTS");

  s.addText("WHAT IT COSTS", {
    x: LM, y: 1.00, w: 8, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2,
  });

  s.addText("A real number,\nnot a rounding\nerror.", {
    x: LM, y: 2.10, w: 8, h: 3.8,
    fontFace: F.serif, fontSize: 60, color: C.ink, valign: "top",
  });

  s.addText([
    { text: "Being honest about the bill is part of earning the " },
    { text: "yes", options: { italic: true } },
    { text: ". Here it is, in whole dollars." },
  ], {
    x: LM, y: 7.29, w: 5.2, h: 1.6,
    fontFace: F.serif, fontSize: 20, color: C.ink, valign: "top",
  });

  s.addText("FIGURES COVER THE 12 MONTHS FROM Q2 2026 THROUGH Q1 2027.", {
    x: LM, y: 10.10, w: 10, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2,
  });

  // Right column — budget bars
  const items = [
    ["Tooling & Line B build-out",       "$620K", 620],
    ["Six new hires (loaded)",           "$780K", 780],
    ["Inventory & parts float",          "$340K", 340],
    ["Facility (expand current lease)",  "$180K", 180],
    ["Contingency (10%)",                "$190K", 190],
  ];
  const max = 2110; // total
  const BX = 9.76, BW = 8.91;
  const labelW = 2.17, barX = 12.09, barW = 5.08;
  const valueX = 17.33;

  items.forEach((it, i) => {
    const y = 1.25 + i * 0.66;
    s.addText(it[0], {
      x: BX, y, w: labelW, h: 0.55,
      fontFace: F.serif, fontSize: 13, color: C.ink, valign: "middle",
    });
    // bar track (tinted)
    s.addShape("rect", {
      x: barX, y: y + 0.20, w: barW, h: 0.13,
      fill: { color: "E8E2D2" }, line: { color: "E8E2D2", width: 0 },
    });
    // filled portion
    const filled = (it[2] / max) * barW;
    s.addShape("rect", {
      x: barX, y: y + 0.20, w: filled, h: 0.13,
      fill: { color: C.ink }, line: { color: C.ink, width: 0 },
    });
    // value
    s.addText(it[1], {
      x: valueX, y: y + 0.05, w: 1.35, h: 0.45,
      fontFace: F.serif, fontSize: 20, color: C.ink, align: "right", valign: "middle",
    });
  });

  // Total divider and big number
  hLine(s, BX, 6.67, BW, { color: C.ink, width: 0.75 });
  s.addText("TOTAL ASK, 12 MONTHS", {
    x: BX, y: 7.50, w: 3, h: 0.25,
    fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2,
  });
  s.addText("$2.11 M", {
    x: 12.07, y: 6.95, w: 6.60, h: 1.0,
    fontFace: F.serif, fontSize: 56, color: C.ink, align: "right",
  });
  s.addText("≈ 8 MONTHS OF CURRENT REVENUE · EXPECTED PAYBACK INSIDE YEAR TWO", {
    x: 9.49, y: 10.10, w: 9.3, h: 0.25,
    fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2, align: "right",
  });

  footer(s, "08 / 10");
}

/* =====================================================================
 * SLIDE 9 — Risks
 * ===================================================================== */
{
  const s = pres.addSlide({ masterName: "MAIN" });
  header(s, "§ VI · RISKS", "WHAT WE’RE TAKING SERIOUSLY");

  s.addText("RISKS WE’RE TAKING SERIOUSLY", {
    x: LM, y: 1.00, w: 10, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2,
  });

  s.addText("The honest list.", {
    x: LM, y: 1.30, w: 17.85, h: 1.5,
    fontFace: F.serif, fontSize: 60, color: C.ink, valign: "top",
  });

  s.addText([
    { text: "None of these are deal-breakers. All of them are reasons we’ll stage the work and " },
    { text: "keep a hand on the brake", options: { italic: true } },
    { text: "." },
  ], {
    x: LM, y: 3.10, w: 10, h: 1.8,
    fontFace: F.serif, fontSize: 22, color: C.ink, valign: "top",
  });

  // Risks list
  const risks = [
    { tag: "R·01",
      head: "We hire faster than we can onboard and quality slips.",
      mit: "Hires are staged across three quarters with overlap, not a single wave. Every new production hire pairs for four weeks before solo sign-off on a unit." },
    { tag: "R·02",
      head: "Demand softens mid-build and we’re stuck with two lines and no orders.",
      mit: "Line B tooling is phased: cell frame & benches in month 1–2, test fixtures only once order book crosses the agreed trigger. Clear off-ramp at month 3." },
    { tag: "R·03",
      head: "Supply chain (motors, ESCs, carbon) can’t keep up with doubled pull-through.",
      mitRich: [
        { text: "Supply-chain lead is the " },
        { text: "first", options: { italic: true } },
        { text: " hire, not the last. Second source qualified for every top-5 BOM item before Line B goes live." },
      ] },
    { tag: "R·04",
      head: "We lose the workshop culture that made us good.",
      mit: "No management layer. Flat structure preserved. First question in every hiring loop is still “would you want to share a bench with this person.”" },
  ];
  const rowStartY = 5.05;
  const rowH = 1.34;
  risks.forEach((r, i) => {
    const y = rowStartY + i * rowH;
    hLine(s, LM, y, 17.33, { color: C.rule, width: 0.75 });

    s.addText(r.tag, {
      x: LM, y: y + 0.30, w: 0.8, h: 0.25,
      fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2,
    });
    s.addText(r.head, {
      x: 2.46, y: y + 0.20, w: 7.1, h: 0.90,
      fontFace: F.serif, fontSize: 18, color: C.ink, valign: "top",
    });
    s.addText("MITIGATION", {
      x: 9.79, y: y + 0.30, w: 9.14, h: 0.25,
      fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2,
    });
    s.addText(r.mit || r.mitRich, {
      x: 9.79, y: y + 0.60, w: 8.9, h: 0.70,
      fontFace: F.serif, fontSize: 12, color: C.ink, valign: "top",
    });
  });
  hLine(s, LM, rowStartY + 4 * rowH, 17.33, { color: C.rule, width: 0.75 });

  footer(s, "09 / 10");
}

/* =====================================================================
 * SLIDE 10 — The ask
 * ===================================================================== */
{
  const s = pres.addSlide({ masterName: "MAIN" });
  header(s, "§ VII · THE ASK", "WHAT WE’RE ASKING OF YOU");

  s.addText("WHAT WE’RE ASKING OF YOU", {
    x: LM, y: 1.00, w: 10, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2,
  });

  s.addText([
    { text: "Align on the direction — " },
    { text: "not the dollars, yet", options: { italic: true } },
    { text: "." },
  ], {
    x: LM, y: 1.30, w: 12, h: 2.6,
    fontFace: F.serif, fontSize: 60, color: C.ink, valign: "top",
  });

  s.addText(
    "If the room agrees this is the right shape of 2026, we’ll come back in two weeks with a staged budget and a hiring plan for each of you to pressure-test.",
    {
      x: LM, y: 4.08, w: 10, h: 1.5,
      fontFace: F.serif, fontSize: 22, color: C.ink, valign: "top",
    }
  );

  hLine(s, LM, 5.79, 17.33, { color: C.ink, width: 0.75 });

  const asks = [
    { x: LM,   n: "01", head: "Say yes to the direction.",
      body: "Two levers: scale manufacturing, grow the team. Order matters — capacity first, then hires that serve it." },
    { x: 7.28, n: "02", head: "Volunteer for a working group.",
      body: "Three groups: Line B design, hiring loops, supplier qualification. Pick one by end of week. Everyone picks one." },
    { x: 13.22,n: "03", head: "Bring the objections you didn’t raise today.",
      body: "The honest list on the previous slide was ours. We want yours. Better to hear them now than in month four." },
  ];
  asks.forEach(a => {
    s.addText(a.n, {
      x: a.x, y: 6.13, w: 5.61, h: 0.25,
      fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2,
    });
    s.addText(a.head, {
      x: a.x, y: 6.40, w: 5.61, h: 0.45,
      fontFace: F.serif, fontSize: 20, color: C.ink,
    });
    s.addText(a.body, {
      x: a.x, y: 6.95, w: 5.61, h: 1.2,
      fontFace: F.serif, fontSize: 13, color: C.ink, valign: "top",
    });
  });

  // Custom footer
  s.addText("THE CASE FOR EXPANSION", {
    x: LM, y: FOOT_Y, w: 4, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2,
  });
  s.addText("10 / 10 · END.", {
    x: W - LM - 3, y: FOOT_Y, w: 3, h: 0.22,
    fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2, align: "right",
  });
}

/* ---------- Save ---------- */
pres.writeFile({ fileName: "The_Case_for_Expansion.pptx" })
  .then(name => console.log(`Wrote ${name}`))
  .catch(err => { console.error(err); process.exit(1); });
