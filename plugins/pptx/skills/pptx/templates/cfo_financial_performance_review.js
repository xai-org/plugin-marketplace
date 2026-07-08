// Polymera Industries · FY2025 Year-End Review
// Recreates Deliverable_12.pptx using pptxgenjs.

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333" x 7.5"
pres.title = "Polymera Industries · FY2025 Year-End Review";
pres.author = "Margaret Chen";

// ============================================================================
// PALETTE
// ============================================================================
const C = {
  bg: "F1EADD",        // warm cream background
  ink: "1A1A1A",       // near black for primary text
  inkSoft: "2B2B2B",
  muted: "8A8275",     // muted brown-gray (labels, footers)
  rule: "C9BFAE",      // subtle rule line
  blue: "3A7A9A",      // teal-blue
  blueDk: "2F6680",
  orange: "E76A1F",    // primary orange
  orangeDk: "C0561A",
  peach: "F2C39A",     // light peach
  peachLt: "F8DABE",
  green: "4F7F58",     // forest green
  greenDk: "3F6847",
  black: "111111",
  cardLt: "E8DFCE",    // slightly darker card on cream
  white: "FFFFFF",
};

const SLIDE_W = 13.333;
const SLIDE_H = 7.5;

// Fonts
const FH = "Arial"; // headline font (substitute for sans display)
const FB = "Calibri"; // body font

// ============================================================================
// HELPERS
// ============================================================================
function addHeader(slide, sectionLabel) {
  // Black dot
  slide.addShape(pres.shapes.OVAL, {
    x: 0.55, y: 0.42, w: 0.22, h: 0.22,
    fill: { color: C.ink }, line: { color: C.ink, width: 0 },
  });
  // Brand
  slide.addText("POLYMERA INDUSTRIES", {
    x: 0.85, y: 0.32, w: 4, h: 0.42,
    fontFace: FB, fontSize: 11, bold: true, color: C.ink,
    charSpacing: 4, valign: "middle", margin: 0,
  });
  // Section right
  slide.addText(sectionLabel, {
    x: SLIDE_W - 6.5, y: 0.32, w: 6, h: 0.42,
    fontFace: FB, fontSize: 11, bold: true, color: C.ink,
    charSpacing: 4, align: "right", valign: "middle", margin: 0,
  });
}

function addFooter(slide, leftText, pageNum) {
  slide.addText(leftText, {
    x: 0.55, y: SLIDE_H - 0.55, w: 9, h: 0.32,
    fontFace: FB, fontSize: 10.5, color: C.muted,
    charSpacing: 3, valign: "middle", margin: 0,
  });
  slide.addText(`${String(pageNum).padStart(2, "0")} / 09`, {
    x: SLIDE_W - 2.0, y: SLIDE_H - 0.55, w: 1.5, h: 0.32,
    fontFace: FB, fontSize: 10.5, color: C.muted,
    charSpacing: 3, align: "right", valign: "middle", margin: 0,
  });
}

// Cylinder drawing — draws a 3D-style cylinder at (x,y,w,h) in "inches"
// The body is the full height; we draw the back ellipse as a top oval and
// the bottom ellipse, plus the side rectangle and outline arcs.
function drawCylinder(slide, x, y, w, h, fill, dark) {
  const ellipseH = Math.min(0.5, h * 0.18);
  // Body rectangle (between top and bottom ellipse centers)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: x, y: y + ellipseH / 2, w: w, h: h - ellipseH,
    fill: { color: fill }, line: { color: C.ink, width: 1.25 },
  });
  // Hide vertical lines from rectangle's left/right by overlaying thin fill strips
  // (the rectangle outline runs around all 4 sides, but the side lines visually become
  // the cylinder sides — this is fine).

  // Bottom ellipse — drawn on top of body bottom edge
  slide.addShape(pres.shapes.OVAL, {
    x: x, y: y + h - ellipseH, w: w, h: ellipseH,
    fill: { color: dark }, line: { color: C.ink, width: 1.25 },
  });
  // Top ellipse — solid lighter rim
  slide.addShape(pres.shapes.OVAL, {
    x: x, y: y, w: w, h: ellipseH,
    fill: { color: fill }, line: { color: C.ink, width: 1.25 },
  });
  // Cover the rectangle outline that crosses through top ellipse area
  slide.addShape(pres.shapes.RECTANGLE, {
    x: x + 0.01, y: y + ellipseH / 2 - 0.02, w: w - 0.02, h: 0.04,
    fill: { color: fill }, line: { color: fill, width: 0 },
  });
}

// ============================================================================
// SLIDE 1 — TITLE
// ============================================================================
function slide1() {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addHeader(slide, "FY2025 · CONFIDENTIAL");

  // Eyebrow
  slide.addText("FISCAL YEAR 2025 · YEAR-END REVIEW", {
    x: 0.85, y: 1.95, w: 8, h: 0.4,
    fontFace: FB, fontSize: 13, color: C.inkSoft,
    charSpacing: 4, valign: "middle", margin: 0,
  });

  // Headline
  slide.addText("A year of\nmeasured\nmomentum.", {
    x: 0.85, y: 2.45, w: 7.5, h: 3.7,
    fontFace: FH, fontSize: 72, bold: true, color: C.ink,
    valign: "top", margin: 0,
  });

  // Pill: "PRESENTED BY MARGARET CHEN, CFO"
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.85, y: 6.25, w: 4.0, h: 0.45,
    fill: { color: C.bg }, line: { color: C.ink, width: 1 },
    rectRadius: 0.22,
  });
  slide.addText("PRESENTED BY MARGARET CHEN, CFO", {
    x: 0.85, y: 6.25, w: 4.0, h: 0.45,
    fontFace: FB, fontSize: 10.5, bold: true, color: C.ink,
    charSpacing: 3, align: "center", valign: "middle", margin: 0,
  });
  slide.addText("April 27, 2026", {
    x: 5.0, y: 6.25, w: 2.5, h: 0.45,
    fontFace: FB, fontSize: 12, color: C.inkSoft,
    valign: "middle", margin: 0,
  });

  // Right side illustration: concentric circles + capsule + dots
  const cx = 10.55, cy = 4.05;
  // outer circle
  slide.addShape(pres.shapes.OVAL, {
    x: cx - 2.2, y: cy - 2.2, w: 4.4, h: 4.4,
    fill: { color: "FFFFFF", transparency: 100 }, line: { color: C.muted, width: 0.75 },
  });
  // inner circle
  slide.addShape(pres.shapes.OVAL, {
    x: cx - 1.65, y: cy - 1.65, w: 3.3, h: 3.3,
    fill: { color: "FFFFFF", transparency: 100 }, line: { color: C.muted, width: 0.75 },
  });
  // Capsule (extruder body)
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: cx - 1.4, y: cy - 0.45, w: 2.6, h: 0.7,
    fill: { color: C.blue }, line: { color: C.ink, width: 1.25 },
    rectRadius: 0.35,
  });
  // Capsule inner stripes (vents)
  for (let i = 0; i < 3; i++) {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx - 1.18 + i * 0.32, y: cy - 0.27, w: 0.18, h: 0.5,
      fill: { color: C.blueDk }, line: { color: C.blueDk, width: 0 },
      rectRadius: 0.09,
    });
  }
  // Nozzle (triangle-ish via small trapezoid)
  slide.addShape(pres.shapes.RIGHT_TRIANGLE, {
    x: cx + 1.2, y: cy - 0.35, w: 0.4, h: 0.7,
    fill: { color: C.blue }, line: { color: C.ink, width: 1.25 },
  });
  // Orange dot at nozzle tip
  slide.addShape(pres.shapes.OVAL, {
    x: cx + 1.55, y: cy - 0.08, w: 0.18, h: 0.18,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });

  // Pellet dots scattered below capsule
  const pellets = [
    [-1.0, 0.8, C.peach], [-0.55, 0.7, C.peach], [-0.1, 0.65, C.peach],
    [-1.2, 1.15, C.orange], [-0.8, 1.1, C.orange], [-0.4, 1.05, C.orange],
    [0.0, 1.0, C.orange], [0.4, 1.0, C.orange], [0.8, 1.05, C.orange],
    [1.15, 1.1, C.orange],
    [-0.9, 1.45, C.orange], [-0.45, 1.4, C.orange], [-0.05, 1.35, C.orange],
    [0.35, 1.35, C.orange], [0.75, 1.4, C.orange], [1.1, 1.45, C.orange],
    [-0.5, 1.7, C.orange], [-0.05, 1.65, C.orange], [0.4, 1.65, C.orange],
  ];
  for (const [dx, dy, col] of pellets) {
    slide.addShape(pres.shapes.OVAL, {
      x: cx + dx - 0.1, y: cy + dy - 0.07, w: 0.22, h: 0.13,
      fill: { color: col }, line: { color: col, width: 0 },
    });
  }

  addFooter(slide, "POLYMERA INDUSTRIES · EST. 1998", 1);
}

// ============================================================================
// SLIDE 2 — HEADLINE NUMBER
// ============================================================================
function slide2() {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addHeader(slide, "02 · THE HEADLINE");

  // Eyebrow
  slide.addText("THE HEADLINE NUMBER", {
    x: 0.85, y: 1.5, w: 6, h: 0.35,
    fontFace: FB, fontSize: 12, color: C.muted,
    charSpacing: 4, valign: "middle", margin: 0,
  });

  // Big number: $78.4M (M is muted)
  slide.addText(
    [
      { text: "$78.4", options: { color: C.ink } },
      { text: "M", options: { color: C.muted } },
    ],
    {
      x: 0.85, y: 1.85, w: 8.5, h: 2.1,
      fontFace: FH, fontSize: 150, bold: true,
      valign: "top", margin: 0,
    }
  );

  // Body text
  slide.addText(
    [
      { text: "Total revenue for FY2025 — our strongest year on record, up " },
      { text: "+12.3%", options: { bold: true } },
      { text: " from $69.8M in FY2024." },
    ],
    {
      x: 0.85, y: 4.15, w: 7.4, h: 0.8,
      fontFace: FB, fontSize: 16, color: C.inkSoft,
      valign: "top", margin: 0,
    }
  );

  // Three KPI columns, each with horizontal rule
  const kpiY = 5.05;
  const colW = 2.55;
  const colXs = [0.85, 0.85 + colW + 0.15, 0.85 + 2 * (colW + 0.15)];
  const kpis = [
    { label: "GROSS MARGIN", val: "31.6", suffix: "%", delta: "▲ 240 bps" },
    { label: "OPERATING INCOME", val: "$11.2", suffix: "M", delta: "▲ 18.6% YoY" },
    { label: "FREE CASH FLOW", val: "$8.7", suffix: "M", delta: "▲ 22.4% YoY" },
  ];
  kpis.forEach((k, i) => {
    const cx = colXs[i];
    // rule
    slide.addShape(pres.shapes.LINE, {
      x: cx, y: kpiY, w: colW - 0.2, h: 0.001,
      line: { color: C.ink, width: 0.75 },
    });
    slide.addText(k.label, {
      x: cx, y: kpiY + 0.1, w: colW, h: 0.32,
      fontFace: FB, fontSize: 11, color: C.muted,
      charSpacing: 3, valign: "middle", margin: 0,
    });
    slide.addText(
      [
        { text: k.val, options: { color: C.ink, bold: true } },
        { text: k.suffix, options: { color: C.muted, bold: true, fontSize: 26 } },
      ],
      {
        x: cx, y: kpiY + 0.45, w: colW, h: 0.7,
        fontFace: FH, fontSize: 40,
        valign: "top", margin: 0,
      }
    );
    slide.addText(k.delta, {
      x: cx, y: kpiY + 1.2, w: colW, h: 0.32,
      fontFace: FB, fontSize: 12, color: C.ink,
      valign: "middle", margin: 0,
    });
  });

  // Right side: bar chart illustration with dotted trendline
  const bx = 9.7;
  const by = 2.0;
  const bars = [
    { h: 1.3, color: C.peach },
    { h: 2.2, color: C.blue },
    { h: 2.7, color: C.blue },
    { h: 3.3, color: C.orange },
  ];
  const barW = 0.55;
  const gap = 0.18;
  const baseY = by + 3.5;
  bars.forEach((b, i) => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: bx + i * (barW + gap), y: baseY - b.h, w: barW, h: b.h,
      fill: { color: b.color }, line: { color: C.ink, width: 1 },
    });
  });
  // Dotted trendline (approximation via dashed line segments)
  const pts = bars.map((b, i) => [bx + i * (barW + gap) + barW / 2, baseY - b.h + 0.05]);
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    slide.addShape(pres.shapes.LINE, {
      x: x1, y: y1, w: x2 - x1, h: y2 - y1,
      line: { color: C.ink, width: 1.25, dashType: "dash" },
    });
  }
  // Triangle at trendline endpoint
  slide.addShape(pres.shapes.ISOSCELES_TRIANGLE, {
    x: pts[pts.length - 1][0] - 0.1, y: pts[pts.length - 1][1] - 0.18, w: 0.2, h: 0.2,
    fill: { color: C.ink }, line: { color: C.ink, width: 0 },
  });

  addFooter(slide, "SOURCE: AUDITED FINANCIAL STATEMENTS, FY2025", 2);
}

// ============================================================================
// SLIDE 3 — QUARTERLY REVENUE
// ============================================================================
function slide3() {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addHeader(slide, "03 · REVENUE BY QUARTER");

  slide.addText("QUARTERLY REVENUE · FY2025", {
    x: 0.85, y: 1.5, w: 8, h: 0.35,
    fontFace: FB, fontSize: 12, color: C.muted,
    charSpacing: 4, valign: "middle", margin: 0,
  });

  slide.addText("Four quarters,\nfour steps up.", {
    x: 0.85, y: 1.9, w: 9, h: 1.8,
    fontFace: FH, fontSize: 54, bold: true, color: C.ink,
    valign: "top", margin: 0,
  });

  // Four cylinders, increasing height
  const colXs = [0.85, 4.0, 7.15, 10.3];
  const cylW = 2.4;
  const heights = [0.8, 1.6, 2.2, 2.6]; // visual heights
  const baseY = 5.5;
  const fills = [C.peachLt, C.peach, C.orange, C.orangeDk];
  const darks = [C.peach, C.orangeDk, C.orangeDk, "9C4514"];

  for (let i = 0; i < 4; i++) {
    const x = colXs[i];
    const h = heights[i];
    drawCylinder(slide, x, baseY - h, cylW, h, fills[i], darks[i]);
  }

  // Rule + labels under each cylinder
  for (let i = 0; i < 4; i++) {
    const x = colXs[i];
    // horizontal rule
    slide.addShape(pres.shapes.LINE, {
      x: x, y: 5.65, w: cylW, h: 0.001,
      line: { color: C.ink, width: 0.75 },
    });
    slide.addText(`Q${i + 1}`, {
      x: x, y: 5.7, w: cylW, h: 0.3,
      fontFace: FB, fontSize: 11, color: C.muted,
      valign: "middle", margin: 0,
    });
    const vals = ["$17.2M", "$19.0M", "$20.6M", "$21.6M"];
    const deltas = ["▲ 6.1%", "▲ 10.5%", "▲ 14.2%", "▲ 18.0%"];
    slide.addText(vals[i], {
      x: x, y: 6.0, w: cylW, h: 0.5,
      fontFace: FH, fontSize: 30, bold: true, color: C.ink,
      valign: "top", margin: 0,
    });
    slide.addText(deltas[i], {
      x: x, y: 6.55, w: cylW, h: 0.3,
      fontFace: FB, fontSize: 12, color: C.ink,
      valign: "middle", margin: 0,
    });
  }

  addFooter(slide, "EACH QUARTER OUTPERFORMED THE PRIOR", 3);
}

// ============================================================================
// SLIDE 4 — PRODUCT MIX
// ============================================================================
function slide4() {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addHeader(slide, "04 · PRODUCT MIX");

  slide.addText("WHERE THE REVENUE CAME FROM", {
    x: 0.85, y: 1.5, w: 8, h: 0.35,
    fontFace: FB, fontSize: 12, color: C.muted,
    charSpacing: 4, valign: "middle", margin: 0,
  });

  slide.addText("Three lines of\nbusiness.", {
    x: 0.85, y: 1.9, w: 7, h: 1.8,
    fontFace: FH, fontSize: 54, bold: true, color: C.ink,
    valign: "top", margin: 0,
  });

  slide.addText(
    "Packaging remains our anchor. Industrial parts saw the largest jump as automotive demand recovered.",
    {
      x: 0.85, y: 3.85, w: 6.2, h: 0.8,
      fontFace: FB, fontSize: 16, color: C.inkSoft,
      valign: "top", margin: 0,
    }
  );

  // Right side illustrations
  // Bottle (orange, with label)
  const bx = 8.6, by = 2.6;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: bx + 0.55, y: by, w: 0.85, h: 0.4,
    fill: { color: C.orangeDk }, line: { color: C.ink, width: 1 },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: bx + 0.3, y: by + 0.4, w: 1.35, h: 0.3,
    fill: { color: C.orange }, line: { color: C.ink, width: 1 },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: bx, y: by + 0.7, w: 1.95, h: 1.85,
    fill: { color: C.orange }, line: { color: C.ink, width: 1 },
  });
  // Label panel
  slide.addShape(pres.shapes.RECTANGLE, {
    x: bx + 0.2, y: by + 1.05, w: 1.55, h: 1.25,
    fill: { color: C.peachLt }, line: { color: C.ink, width: 1 },
  });

  // Industrial gear (blue donut + bolts)
  const gcx = 11.5, gcy = 3.0;
  // outer dark dots (bolts) — 8 around
  for (let i = 0; i < 8; i++) {
    const ang = (i / 8) * Math.PI * 2;
    const r = 1.2;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: gcx + Math.cos(ang) * r - 0.13,
      y: gcy + Math.sin(ang) * r - 0.13,
      w: 0.26, h: 0.26,
      fill: { color: C.ink }, line: { color: C.ink, width: 0 },
    });
  }
  // outer disc
  slide.addShape(pres.shapes.OVAL, {
    x: gcx - 1.05, y: gcy - 1.05, w: 2.1, h: 2.1,
    fill: { color: C.blue }, line: { color: C.ink, width: 1.25 },
  });
  // inner hole
  slide.addShape(pres.shapes.OVAL, {
    x: gcx - 0.4, y: gcy - 0.4, w: 0.8, h: 0.8,
    fill: { color: C.bg }, line: { color: C.ink, width: 1.25 },
  });

  // Cup/container (peach) — positioned to avoid overlapping the gear and bottom rule
  const ux = 11.6, uy = 3.7;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: ux, y: uy, w: 1.4, h: 1.3,
    fill: { color: C.peach }, line: { color: C.ink, width: 1 },
  });
  // cup interior lines
  slide.addShape(pres.shapes.LINE, {
    x: ux + 0.2, y: uy + 0.45, w: 1.0, h: 0.001,
    line: { color: C.ink, width: 0.75 },
  });
  slide.addShape(pres.shapes.LINE, {
    x: ux + 0.2, y: uy + 0.75, w: 1.0, h: 0.001,
    line: { color: C.ink, width: 0.75 },
  });

  // Bottom rule
  slide.addShape(pres.shapes.LINE, {
    x: 0.85, y: 5.4, w: SLIDE_W - 1.7, h: 0.001,
    line: { color: C.rule, width: 0.75 },
  });

  // Three columns at bottom
  const segs = [
    { label: "PACKAGING", pct: "52", sub: "$40.8M" },
    { label: "INDUSTRIAL PARTS", pct: "31", sub: "$24.3M · ▲ 19%" },
    { label: "CONSUMER GOODS", pct: "17", sub: "$13.3M" },
  ];
  const segXs = [0.85, 5.4, 9.95];
  segs.forEach((s, i) => {
    const x = segXs[i];
    // small square mark
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 5.6, w: 0.22, h: 0.22,
      fill: { color: "FFFFFF", transparency: 100 }, line: { color: C.ink, width: 1 },
    });
    slide.addText(s.label, {
      x: x + 0.3, y: 5.55, w: 3.5, h: 0.3,
      fontFace: FB, fontSize: 11, color: C.ink, bold: true,
      charSpacing: 3, valign: "middle", margin: 0,
    });
    slide.addText(
      [
        { text: s.pct, options: { color: C.ink, bold: true } },
        { text: "%", options: { color: C.muted, bold: true, fontSize: 28 } },
      ],
      {
        x: x, y: 5.9, w: 3, h: 0.8,
        fontFace: FH, fontSize: 50,
        valign: "top", margin: 0,
      }
    );
    slide.addText(s.sub, {
      x: x, y: 6.65, w: 3, h: 0.3,
      fontFace: FB, fontSize: 11.5, color: C.inkSoft,
      valign: "middle", margin: 0,
    });
  });

  addFooter(slide, "FY2025 NET REVENUE, BY SEGMENT", 4);
}

// ============================================================================
// SLIDE 5 — OPERATIONS
// ============================================================================
function slide5() {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addHeader(slide, "05 · OPERATIONS");

  slide.addText("WHAT WE MADE, WHERE WE MADE IT", {
    x: 0.85, y: 1.5, w: 8, h: 0.35,
    fontFace: FB, fontSize: 12, color: C.muted,
    charSpacing: 4, valign: "middle", margin: 0,
  });

  slide.addText("412 million units\nshipped.", {
    x: 0.85, y: 1.9, w: 8, h: 1.8,
    fontFace: FH, fontSize: 54, bold: true, color: C.ink,
    valign: "top", margin: 0,
  });

  slide.addText(
    "Across four plants, three shifts, and a record uptime of 92.4%. Every region grew throughput year over year.",
    {
      x: 0.85, y: 3.85, w: 6.2, h: 0.85,
      fontFace: FB, fontSize: 16, color: C.inkSoft,
      valign: "top", margin: 0,
    }
  );

  // Right: 5 segmented cylinders (silos)
  const silos = [
    { fill: C.blue, dark: C.blueDk },
    { fill: C.orange, dark: C.orangeDk },
    { fill: C.peach, dark: C.peachLt },
    { fill: C.green, dark: C.greenDk },
    { fill: C.black, dark: "000000" },
  ];
  const silosX = 7.5;
  const silosY = 2.0;
  const silosW = 0.95;
  const silosH = 2.7;
  const silosGap = 0.15;
  silos.forEach((s, i) => {
    const x = silosX + i * (silosW + silosGap);
    drawCylinder(slide, x, silosY, silosW, silosH, s.fill, s.dark);
    // horizontal banding (3 segments)
    for (let b = 1; b < 3; b++) {
      const yLine = silosY + (silosH * b) / 3;
      slide.addShape(pres.shapes.LINE, {
        x: x + 0.04, y: yLine, w: silosW - 0.08, h: 0.001,
        line: { color: C.ink, width: 0.6 },
      });
    }
  });
  // Base platform (slats)
  const platY = silosY + silosH + 0.05;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: silosX - 0.1, y: platY, w: 5 * silosW + 4 * silosGap + 0.2, h: 0.35,
    fill: { color: C.cardLt }, line: { color: C.ink, width: 0.75 },
  });
  // vertical slat lines (5 slats, one per silo)
  for (let i = 1; i < 5; i++) {
    const slatX = silosX - 0.1 + i * (5 * silosW + 4 * silosGap + 0.2) / 5;
    slide.addShape(pres.shapes.LINE, {
      x: slatX, y: platY, w: 0.001, h: 0.35,
      line: { color: C.ink, width: 0.6 },
    });
  }

  // Bottom rules + KPIs (4 columns)
  const kpiY = 5.3;
  const kpiW = (SLIDE_W - 1.7) / 4;
  const kpis = [
    { label: "MANUFACTURING PLANTS", val: "4", suffix: "", sub: "OH · TX · NC · AZ" },
    { label: "RESIN PROCESSED", val: "36k", suffix: "t", sub: "▲ 8.2%" },
    { label: "THROUGHPUT / SHIFT", val: "1,840", suffix: "", sub: "▲ 11.6%" },
    { label: "ON-TIME DELIVERY", val: "96.1", suffix: "%", sub: "▲ 380 bps" },
  ];
  kpis.forEach((k, i) => {
    const x = 0.85 + i * kpiW;
    slide.addShape(pres.shapes.LINE, {
      x: x, y: kpiY, w: kpiW - 0.3, h: 0.001,
      line: { color: C.ink, width: 0.75 },
    });
    slide.addText(k.label, {
      x: x, y: kpiY + 0.08, w: kpiW, h: 0.32,
      fontFace: FB, fontSize: 11, color: C.muted,
      charSpacing: 3, valign: "middle", margin: 0,
    });
    slide.addText(
      [
        { text: k.val, options: { color: C.ink, bold: true } },
        { text: k.suffix, options: { color: C.muted, bold: true, fontSize: 28 } },
      ],
      {
        x: x, y: kpiY + 0.4, w: kpiW, h: 0.85,
        fontFace: FH, fontSize: 44,
        valign: "top", margin: 0,
      }
    );
    slide.addText(k.sub, {
      x: x, y: kpiY + 1.25, w: kpiW, h: 0.3,
      fontFace: FB, fontSize: 12, color: C.ink,
      valign: "middle", margin: 0,
    });
  });

  addFooter(slide, "OPERATIONAL METRICS, FY2025", 5);
}

// ============================================================================
// SLIDE 6 — MARGINS & COSTS
// ============================================================================
function slide6() {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addHeader(slide, "06 · MARGINS & COSTS");

  slide.addText("MARGIN STORY", {
    x: 0.85, y: 1.5, w: 6, h: 0.35,
    fontFace: FB, fontSize: 12, color: C.muted,
    charSpacing: 4, valign: "middle", margin: 0,
  });

  slide.addText("Resin softened.\nMargins lifted.", {
    x: 0.85, y: 1.9, w: 7, h: 1.85,
    fontFace: FH, fontSize: 50, bold: true, color: C.ink,
    valign: "top", margin: 0,
  });

  // Operating income on right
  slide.addText("OPERATING INCOME", {
    x: 8.5, y: 1.5, w: 4.5, h: 0.35,
    fontFace: FB, fontSize: 12, color: C.muted,
    charSpacing: 4, align: "right", valign: "middle", margin: 0,
  });
  slide.addText(
    [
      { text: "$11.2", options: { color: C.ink, bold: true } },
      { text: "M", options: { color: C.muted, bold: true, fontSize: 50 } },
    ],
    {
      x: 7.5, y: 1.85, w: 5.5, h: 1.5,
      fontFace: FH, fontSize: 90,
      align: "right", valign: "top", margin: 0,
    }
  );
  slide.addText("▲ 18.6% YoY", {
    x: 8.5, y: 3.5, w: 4.5, h: 0.4,
    fontFace: FB, fontSize: 14, color: C.ink,
    align: "right", valign: "middle", margin: 0,
  });

  // Vertical divider between left & right halves at the bottom
  slide.addShape(pres.shapes.LINE, {
    x: 5.4, y: 4.4, w: 0.001, h: 2.3,
    line: { color: C.rule, width: 0.75 },
  });

  // LEFT: cylinder showing resin level dropping
  // Cylinder body
  const lcx = 1.3, lcy = 4.1, lcw = 1.7, lch = 2.5;
  drawCylinder(slide, lcx, lcy, lcw, lch, C.peach, C.orange);
  // overlay a darker fill on bottom half to show "filled level"
  slide.addShape(pres.shapes.RECTANGLE, {
    x: lcx, y: lcy + lch * 0.55, w: lcw, h: lch * 0.4,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });
  // arrow pointing down
  slide.addShape(pres.shapes.LINE, {
    x: lcx + lcw / 2, y: lcy + 0.4, w: 0.001, h: lch * 0.5 - 0.1,
    line: { color: C.ink, width: 1.5, endArrowType: "triangle" },
  });

  // KPI text next to left cylinder
  slide.addText("AVG. RESIN COST / KG", {
    x: 3.4, y: 4.45, w: 2.4, h: 0.3,
    fontFace: FB, fontSize: 11, color: C.muted,
    charSpacing: 3, valign: "middle", margin: 0,
  });
  slide.addText("$1.84", {
    x: 3.4, y: 4.75, w: 2.0, h: 0.6,
    fontFace: FH, fontSize: 32, bold: true, color: C.ink,
    valign: "top", margin: 0,
  });
  slide.addText("▼ 9.2% YoY", {
    x: 3.4, y: 5.4, w: 2.0, h: 0.3,
    fontFace: FB, fontSize: 12, color: C.ink,
    valign: "middle", margin: 0,
  });
  slide.addText(
    "PE/PP spot prices eased through H2 as global supply normalized.",
    {
      x: 3.4, y: 5.85, w: 2.0, h: 0.9,
      fontFace: FB, fontSize: 11.5, color: C.inkSoft,
      valign: "top", margin: 0,
    }
  );

  // RIGHT: orange cylinder ascending (segmented)
  const rcx = 6.0, rcy = 4.1, rcw = 1.0, rch = 2.5;
  drawCylinder(slide, rcx, rcy, rcw, rch, C.orange, C.orangeDk);
  // segment lines (4 segments)
  for (let i = 1; i < 4; i++) {
    const yLine = rcy + (rch * i) / 4;
    slide.addShape(pres.shapes.LINE, {
      x: rcx + 0.04, y: yLine, w: rcw - 0.08, h: 0.001,
      line: { color: C.ink, width: 0.6 },
    });
  }
  // "I" mark on top (single small line)
  slide.addShape(pres.shapes.LINE, {
    x: rcx + rcw / 2, y: rcy - 0.25, w: 0.001, h: 0.18,
    line: { color: C.ink, width: 1.5 },
  });

  slide.addText("GROSS MARGIN", {
    x: 7.4, y: 4.45, w: 3, h: 0.3,
    fontFace: FB, fontSize: 11, color: C.muted,
    charSpacing: 3, valign: "middle", margin: 0,
  });
  slide.addText(
    [
      { text: "31.6", options: { color: C.ink, bold: true } },
      { text: "%", options: { color: C.muted, bold: true, fontSize: 22 } },
    ],
    {
      x: 7.4, y: 4.75, w: 3, h: 0.7,
      fontFace: FH, fontSize: 32,
      valign: "top", margin: 0,
    }
  );
  slide.addText("▲ 240 bps YoY", {
    x: 7.4, y: 5.4, w: 3, h: 0.3,
    fontFace: FB, fontSize: 12, color: C.ink,
    valign: "middle", margin: 0,
  });
  slide.addText(
    "Better mix and energy contracts added another 90 bps on top.",
    {
      x: 7.4, y: 5.85, w: 2.5, h: 0.9,
      fontFace: FB, fontSize: 11.5, color: C.inkSoft,
      valign: "top", margin: 0,
    }
  );

  addFooter(slide, "COST OF GOODS SOLD & GROSS MARGIN, FY2025", 6);
}

// ============================================================================
// SLIDE 7 — PEOPLE & SUSTAINABILITY
// ============================================================================
function slide7() {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addHeader(slide, "07 · PEOPLE & SUSTAINABILITY");

  slide.addText("BEYOND THE P&L", {
    x: 0.85, y: 1.5, w: 6, h: 0.35,
    fontFace: FB, fontSize: 12, color: C.muted,
    charSpacing: 4, valign: "middle", margin: 0,
  });

  slide.addText("A team of 487. A cleaner pellet.", {
    x: 0.85, y: 1.9, w: SLIDE_W - 1.7, h: 1.0,
    fontFace: FH, fontSize: 48, bold: true, color: C.ink,
    valign: "top", margin: 0,
  });

  // Two cards side by side
  const cardY = 3.4;
  const cardH = 3.3;
  const cardW = (SLIDE_W - 1.7 - 0.3) / 2;

  // LEFT card — light
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.85, y: cardY, w: cardW, h: cardH,
    fill: { color: C.cardLt }, line: { color: C.ink, width: 1 },
  });
  slide.addText("HEADCOUNT", {
    x: 1.15, y: cardY + 0.2, w: 4, h: 0.32,
    fontFace: FB, fontSize: 12, color: C.muted,
    charSpacing: 3, valign: "middle", margin: 0,
  });
  slide.addText("487", {
    x: 1.15, y: cardY + 0.55, w: 4, h: 1.1,
    fontFace: FH, fontSize: 64, bold: true, color: C.ink,
    valign: "top", margin: 0,
  });
  slide.addText("+34 net hires across the four plants and HQ.", {
    x: 1.15, y: cardY + 1.6, w: cardW - 0.6, h: 0.4,
    fontFace: FB, fontSize: 13, color: C.inkSoft,
    valign: "middle", margin: 0,
  });

  // Person icons — two rows
  const peopleColors = [
    C.blue, C.blue, C.blue, C.blue,
    C.orange, C.orange, C.orange,
    C.peach, C.peach, C.peach,
    C.green, C.green, C.green, C.green,
  ];
  const personW = 0.32, personH = 0.5;
  const startX = 1.15, startY = cardY + 2.15;
  const perRow = peopleColors.length;
  for (let i = 0; i < perRow; i++) {
    const x = startX + i * (personW + 0.04);
    const c = peopleColors[i];
    // head
    slide.addShape(pres.shapes.OVAL, {
      x: x + 0.07, y: startY, w: 0.18, h: 0.18,
      fill: { color: c }, line: { color: C.ink, width: 0.6 },
    });
    // body — rounded rect
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: startY + 0.18, w: personW, h: 0.32,
      fill: { color: c }, line: { color: C.ink, width: 0.6 },
      rectRadius: 0.08,
    });
  }
  // Second row — fewer
  const row2Colors = [C.blue, C.blue, C.orange, C.orange, C.orange, C.peach, C.peach, C.green, C.green, C.green];
  const startY2 = startY + 0.62;
  for (let i = 0; i < row2Colors.length; i++) {
    const x = startX + i * (personW + 0.04);
    const c = row2Colors[i];
    slide.addShape(pres.shapes.OVAL, {
      x: x + 0.07, y: startY2, w: 0.18, h: 0.18,
      fill: { color: c }, line: { color: C.ink, width: 0.6 },
    });
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: startY2 + 0.18, w: personW, h: 0.32,
      fill: { color: c }, line: { color: C.ink, width: 0.6 },
      rectRadius: 0.08,
    });
  }

  // RIGHT card — dark
  const rx = 0.85 + cardW + 0.3;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: rx, y: cardY, w: cardW, h: cardH,
    fill: { color: C.black }, line: { color: C.black, width: 0 },
  });
  slide.addText("RECYCLED RESIN CONTENT", {
    x: rx + 0.3, y: cardY + 0.2, w: 5, h: 0.32,
    fontFace: FB, fontSize: 12, color: "9A9286",
    charSpacing: 3, valign: "middle", margin: 0,
  });
  slide.addText(
    [
      { text: "28", options: { color: C.bg, bold: true } },
      { text: "%", options: { color: "6E665A", bold: true, fontSize: 28 } },
    ],
    {
      x: rx + 0.3, y: cardY + 0.55, w: 4, h: 1.1,
      fontFace: FH, fontSize: 64,
      valign: "top", margin: 0,
    }
  );
  slide.addText("Up from 19% in FY2024. Target: 35% by end of FY2026.", {
    x: rx + 0.3, y: cardY + 1.6, w: cardW - 0.6, h: 0.4,
    fontFace: FB, fontSize: 13, color: C.bg,
    valign: "middle", margin: 0,
  });

  // Progress bars
  slide.addText("FY24 → FY25 → FY26 TARGET", {
    x: rx + 0.3, y: cardY + 2.2, w: 4, h: 0.3,
    fontFace: FB, fontSize: 10, color: "9A9286",
    charSpacing: 3, valign: "middle", margin: 0,
  });
  // Three bars
  const barW = (cardW - 0.7) / 3 - 0.1;
  const barY = cardY + 2.55;
  const barColors = ["6E665A", "9A9286", "C7BCAB"]; // FY24 small, FY25 mid, FY26 wide(target)
  const barFills = [0.55, 1.0, 1.0]; // visual fill ratio
  const labels = ["19%", "28%", "35%"];
  for (let i = 0; i < 3; i++) {
    const bx = rx + 0.3 + i * (barW + 0.15);
    // track
    slide.addShape(pres.shapes.RECTANGLE, {
      x: bx, y: barY, w: barW, h: 0.08,
      fill: { color: "3A352D" }, line: { color: "3A352D", width: 0 },
    });
    // fill
    slide.addShape(pres.shapes.RECTANGLE, {
      x: bx, y: barY, w: barW * barFills[i], h: 0.08,
      fill: { color: barColors[i] }, line: { color: barColors[i], width: 0 },
    });
    slide.addText(labels[i], {
      x: bx, y: barY + 0.18, w: barW, h: 0.3,
      fontFace: FB, fontSize: 12, color: C.bg,
      valign: "middle", margin: 0,
    });
  }

  addFooter(slide, "WORKFORCE & ESG METRICS, FY2025", 7);
}

// ============================================================================
// SLIDE 8 — OUTLOOK FY2026
// ============================================================================
function slide8() {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addHeader(slide, "08 · OUTLOOK FY2026");

  slide.addText("LOOKING FORWARD", {
    x: 0.85, y: 1.5, w: 6, h: 0.35,
    fontFace: FB, fontSize: 12, color: C.muted,
    charSpacing: 4, valign: "middle", margin: 0,
  });

  slide.addText("Three priorities for the year ahead.", {
    x: 0.85, y: 1.9, w: SLIDE_W - 1.7, h: 1.0,
    fontFace: FH, fontSize: 44, bold: true, color: C.ink,
    valign: "top", margin: 0,
  });

  // Three cards
  const cardY = 3.5;
  const cardH = 3.2;
  const cardW = (SLIDE_W - 1.7 - 0.6) / 3;
  const cardsX = [0.85, 0.85 + cardW + 0.3, 0.85 + 2 * (cardW + 0.3)];

  // Card 1 — light, factory illustration
  slide.addShape(pres.shapes.RECTANGLE, {
    x: cardsX[0], y: cardY, w: cardW, h: cardH,
    fill: { color: C.cardLt }, line: { color: C.ink, width: 1 },
  });
  slide.addText("01", {
    x: cardsX[0] + 0.3, y: cardY + 0.2, w: 1, h: 0.3,
    fontFace: FB, fontSize: 11, color: C.muted,
    valign: "middle", margin: 0,
  });
  // Factory illustration — compact, centered horizontally in card upper area
  const illuW = 1.6, illuH = 1.0;
  const f1cx = cardsX[0] + cardW / 2;
  const f1x = f1cx - illuW / 2, f1y = cardY + 0.85;
  // chimney first (drawn behind roof)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: f1x + 1.15, y: f1y - 0.25, w: 0.16, h: 0.5,
    fill: { color: C.bg }, line: { color: C.ink, width: 1 },
  });
  // smoke
  slide.addShape(pres.shapes.OVAL, {
    x: f1x + 1.32, y: f1y - 0.45, w: 0.28, h: 0.16,
    fill: { color: "FFFFFF", transparency: 100 }, line: { color: C.ink, width: 1 },
  });
  // roof (triangle)
  slide.addShape(pres.shapes.ISOSCELES_TRIANGLE, {
    x: f1x, y: f1y, w: illuW, h: 0.4,
    fill: { color: C.blue }, line: { color: C.ink, width: 1 },
  });
  // body
  slide.addShape(pres.shapes.RECTANGLE, {
    x: f1x, y: f1y + 0.4, w: illuW, h: 0.6,
    fill: { color: C.blue }, line: { color: C.ink, width: 1 },
  });
  // windows
  slide.addShape(pres.shapes.RECTANGLE, {
    x: f1x + 0.25, y: f1y + 0.55, w: 0.35, h: 0.4,
    fill: { color: C.bg }, line: { color: C.ink, width: 0.7 },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: f1x + 0.85, y: f1y + 0.55, w: 0.35, h: 0.4,
    fill: { color: C.bg }, line: { color: C.ink, width: 0.7 },
  });

  slide.addText("Open Plant 5 in Reno, NV.", {
    x: cardsX[0] + 0.3, y: cardY + 2.05, w: cardW - 0.6, h: 0.8,
    fontFace: FH, fontSize: 17, bold: true, color: C.ink,
    valign: "top", margin: 0,
  });
  slide.addText("Adds 18% capacity. Targeted online by Q3 FY26.", {
    x: cardsX[0] + 0.3, y: cardY + 2.78, w: cardW - 0.6, h: 0.4,
    fontFace: FB, fontSize: 11.5, color: C.inkSoft,
    valign: "top", margin: 0,
  });

  // Card 2 — light, recycle arrows illustration
  slide.addShape(pres.shapes.RECTANGLE, {
    x: cardsX[1], y: cardY, w: cardW, h: cardH,
    fill: { color: C.cardLt }, line: { color: C.ink, width: 1 },
  });
  slide.addText("02", {
    x: cardsX[1] + 0.3, y: cardY + 0.2, w: 1, h: 0.3,
    fontFace: FB, fontSize: 11, color: C.muted,
    valign: "middle", margin: 0,
  });
  // Recycle arrows — two curved arrows facing each other
  const r2cx = cardsX[1] + cardW / 2, r2cy = cardY + 1.3;
  slide.addShape(pres.shapes.CIRCULAR_ARROW, {
    x: r2cx - 0.7, y: r2cy - 0.45, w: 1.4, h: 0.7,
    fill: { color: C.green }, line: { color: C.ink, width: 1 },
    rotate: 0,
  });
  slide.addShape(pres.shapes.CIRCULAR_ARROW, {
    x: r2cx - 0.7, y: r2cy - 0.05, w: 1.4, h: 0.7,
    fill: { color: C.green }, line: { color: C.ink, width: 1 },
    rotate: 180,
  });

  slide.addText("Reach 35% recycled content.", {
    x: cardsX[1] + 0.3, y: cardY + 2.05, w: cardW - 0.6, h: 0.8,
    fontFace: FH, fontSize: 17, bold: true, color: C.ink,
    valign: "top", margin: 0,
  });
  slide.addText("Two new PCR resin contracts already signed for FY26.", {
    x: cardsX[1] + 0.3, y: cardY + 2.78, w: cardW - 0.6, h: 0.4,
    fontFace: FB, fontSize: 11.5, color: C.inkSoft,
    valign: "top", margin: 0,
  });

  // Card 3 — DARK, target illustration
  slide.addShape(pres.shapes.RECTANGLE, {
    x: cardsX[2], y: cardY, w: cardW, h: cardH,
    fill: { color: C.black }, line: { color: C.black, width: 0 },
  });
  slide.addText("03", {
    x: cardsX[2] + 0.3, y: cardY + 0.2, w: 1, h: 0.3,
    fontFace: FB, fontSize: 11, color: "9A9286",
    valign: "middle", margin: 0,
  });
  // Concentric ovals (target)
  const t3cx = cardsX[2] + cardW / 2, t3cy = cardY + 1.3;
  // outer
  slide.addShape(pres.shapes.OVAL, {
    x: t3cx - 1.1, y: t3cy - 0.45, w: 2.2, h: 0.9,
    fill: { color: "FFFFFF", transparency: 100 }, line: { color: C.bg, width: 1 },
  });
  // middle
  slide.addShape(pres.shapes.OVAL, {
    x: t3cx - 0.8, y: t3cy - 0.32, w: 1.6, h: 0.64,
    fill: { color: "FFFFFF", transparency: 100 }, line: { color: C.bg, width: 1 },
  });
  // bullseye orange
  slide.addShape(pres.shapes.OVAL, {
    x: t3cx - 0.45, y: t3cy - 0.2, w: 0.9, h: 0.4,
    fill: { color: C.orange }, line: { color: C.bg, width: 1 },
  });
  // small dot in center
  slide.addShape(pres.shapes.OVAL, {
    x: t3cx - 0.13, y: t3cy - 0.12, w: 0.26, h: 0.24,
    fill: { color: C.bg }, line: { color: C.bg, width: 0 },
  });
  // dollar sign
  slide.addText("$", {
    x: t3cx - 0.18, y: t3cy - 0.18, w: 0.36, h: 0.36,
    fontFace: FH, fontSize: 14, bold: true, color: C.ink,
    align: "center", valign: "middle", margin: 0,
  });

  slide.addText("Grow revenue to $88M.", {
    x: cardsX[2] + 0.3, y: cardY + 2.05, w: cardW - 0.6, h: 0.8,
    fontFace: FH, fontSize: 17, bold: true, color: C.bg,
    valign: "top", margin: 0,
  });
  slide.addText("Guidance range $86–90M, gross margin 32–33%.", {
    x: cardsX[2] + 0.3, y: cardY + 2.78, w: cardW - 0.6, h: 0.4,
    fontFace: FB, fontSize: 11.5, color: C.bg,
    valign: "top", margin: 0,
  });

  addFooter(slide, "FORWARD-LOOKING STATEMENT · SUBJECT TO RISKS", 8);
}

// ============================================================================
// SLIDE 9 — THANK YOU
// ============================================================================
function slide9() {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addHeader(slide, "09 · THANK YOU");

  slide.addText("FY2025 YEAR-END REVIEW", {
    x: 0.85, y: 1.7, w: 6, h: 0.35,
    fontFace: FB, fontSize: 12, color: C.muted,
    charSpacing: 4, valign: "middle", margin: 0,
  });

  slide.addText("Thank\nyou.", {
    x: 0.85, y: 2.05, w: 6, h: 3.2,
    fontFace: FH, fontSize: 96, bold: true, color: C.ink,
    valign: "top", margin: 0,
  });

  slide.addText("Questions? Let's talk numbers.", {
    x: 0.85, y: 5.4, w: 6, h: 0.4,
    fontFace: FB, fontSize: 16, color: C.inkSoft,
    valign: "middle", margin: 0,
  });

  // Contact block
  slide.addText("MARGARET CHEN", {
    x: 0.85, y: 5.95, w: 2.5, h: 0.32,
    fontFace: FB, fontSize: 11, color: C.muted, bold: true,
    charSpacing: 3, valign: "middle", margin: 0,
  });
  slide.addText("Chief Financial Officer", {
    x: 0.85, y: 6.25, w: 2.5, h: 0.32,
    fontFace: FB, fontSize: 13, color: C.ink,
    valign: "middle", margin: 0,
  });
  // vertical separator
  slide.addShape(pres.shapes.LINE, {
    x: 3.4, y: 6.0, w: 0.001, h: 0.5,
    line: { color: C.muted, width: 0.75 },
  });
  slide.addText("m.chen@polymera.co", {
    x: 3.55, y: 6.18, w: 3, h: 0.32,
    fontFace: FB, fontSize: 13, color: C.ink,
    valign: "middle", margin: 0,
  });

  // Right side: bullseye with planet/dot decoration
  const rcx = 10.5, rcy = 4.0;
  // outer ring
  slide.addShape(pres.shapes.OVAL, {
    x: rcx - 2.4, y: rcy - 2.4, w: 4.8, h: 4.8,
    fill: { color: "FFFFFF", transparency: 100 }, line: { color: C.muted, width: 0.75 },
  });
  // inner ring
  slide.addShape(pres.shapes.OVAL, {
    x: rcx - 1.8, y: rcy - 1.8, w: 3.6, h: 3.6,
    fill: { color: "FFFFFF", transparency: 100 }, line: { color: C.muted, width: 0.75 },
  });
  // big orange ring
  slide.addShape(pres.shapes.OVAL, {
    x: rcx - 1.3, y: rcy - 1.3, w: 2.6, h: 2.6,
    fill: { color: C.orange }, line: { color: C.ink, width: 1 },
  });
  // white middle
  slide.addShape(pres.shapes.OVAL, {
    x: rcx - 0.7, y: rcy - 0.7, w: 1.4, h: 1.4,
    fill: { color: C.white }, line: { color: C.ink, width: 1 },
  });
  // black center
  slide.addShape(pres.shapes.OVAL, {
    x: rcx - 0.3, y: rcy - 0.3, w: 0.6, h: 0.6,
    fill: { color: C.ink }, line: { color: C.ink, width: 0 },
  });

  // Orbiting "planet" dots — colored ovals along the rings
  const orbits = [
    { ang: -90, r: 2.4, c: C.blue, w: 0.32, h: 0.18 },     // top
    { ang: 200, r: 2.4, c: C.peach, w: 0.32, h: 0.18 },    // bottom-left of outer
    { ang: 70, r: 2.4, c: C.peach, w: 0.32, h: 0.18 },     // upper right of outer
    { ang: 60, r: 2.4, c: C.peach, w: 0.28, h: 0.16 },     // small right
    { ang: 180, r: 1.8, c: C.blue, w: 0.32, h: 0.18 },     // left of inner
    { ang: 100, r: 2.4, c: C.peach, w: 0.28, h: 0.16 },    // bottom right
  ];
  for (const o of orbits) {
    const rad = (o.ang * Math.PI) / 180;
    const x = rcx + Math.cos(rad) * o.r - o.w / 2;
    const y = rcy + Math.sin(rad) * o.r - o.h / 2;
    slide.addShape(pres.shapes.OVAL, {
      x: x, y: y, w: o.w, h: o.h,
      fill: { color: o.c }, line: { color: C.ink, width: 0.6 },
    });
  }

  addFooter(slide, "POLYMERA INDUSTRIES · CONFIDENTIAL", 9);
}

// ============================================================================
// BUILD
// ============================================================================
slide1();
slide2();
slide3();
slide4();
slide5();
slide6();
slide7();
slide8();
slide9();

// pptxgenjs 4.0.1 emits a few patterns that PowerPoint's strict validator rejects
// (notably: multiple <a:pPr> elements inside a single <a:p> when an addText call has
// multiple {text,options} runs without breakLine between them). The most reliable fix
// is to round-trip the file through LibreOffice, which rewrites the OOXML using its
// own conservative serializer. This matches what valid pptx files look like and
// eliminates the "PowerPoint found a problem with content" repair dialog.
async function libreOfficeRoundTrip(filename) {
  const fs = require("fs");
  const path = require("path");
  const { execSync } = require("child_process");
  const os = require("os");

  const abs = path.resolve(filename);
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "pptxfix-"));

  // soffice converts .pptx -> .pptx using its OOXML writer.
  // Requires LibreOffice (`soffice`) installed on PATH.
  execSync(
    `soffice --headless --convert-to pptx --outdir "${tmpDir}" "${abs}"`,
    { stdio: "pipe" }
  );

  const fixed = path.join(tmpDir, path.basename(filename));
  if (!fs.existsSync(fixed)) {
    throw new Error("LibreOffice round-trip failed — output file not found.");
  }
  fs.copyFileSync(fixed, abs);
  execSync(`rm -rf "${tmpDir}"`);
}

(async () => {
  const fileName = "Polymera_FY2025_YearEndReview.pptx";
  await pres.writeFile({ fileName });
  await libreOfficeRoundTrip(fileName);
  console.log("Wrote and fixed:", fileName);
})();
