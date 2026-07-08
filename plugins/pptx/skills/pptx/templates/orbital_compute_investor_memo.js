// Recreate Investing.pptx using pptxgenjs
// Orbital Compute Investor Memo — 13 slides

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.author = "Orbital Compute";
pres.title = "Orbital Compute / Investor Memo";

// Custom layout — original deck is 20" x 11.25" (16:9 at 2x scale)
pres.defineLayout({ name: "ORB", width: 20, height: 11.25 });
pres.layout = "ORB";

// ===== Design tokens =====
const COLOR = {
  cream:      "F2EFE8",  // main background
  creamDark:  "E8E4DB",  // muted card background
  navy:       "0B1A2B",  // primary dark / title text
  navyDeep:   "0A1626",  // deeper navy overlay (slide 2, 13)
  slate:      "2A3A4D",  // secondary text / dark bars
  blue:       "0039A6",  // primary accent blue
  blueMid:    "1F57C4",  // medium blue (light-blue bar, numbered items contrast)
  blueLight:  "7AA7D9",  // light blue for dark-bg accents
  blueFaint:  "DFE6F3",  // near-parity shading
  white:      "FFFFFF",
};

const FONT = {
  head: "Calibri",
  body: "Calibri",
};

// ===== Helpers =====
const W = 20;           // slide width
const H = 11.25;        // slide height
const M = 1.05;         // left margin
const MR = 1.05;        // right margin

// Section header (top-of-slide eyebrow) + horizontal rule
function addSectionHeader(slide, text) {
  slide.addText(text, {
    x: M, y: 0.62, w: 10, h: 0.4,
    fontFace: FONT.body, fontSize: 14, bold: true,
    color: COLOR.blue, charSpacing: 6, margin: 0,
  });
  // horizontal rule under header
  slide.addShape(pres.shapes.LINE, {
    x: M, y: 1.15, w: W - M - MR, h: 0,
    line: { color: COLOR.slate, width: 0.5, transparency: 40 },
  });
}

// Confidential footer for dark slides
function addDarkFooter(slide, rightText) {
  slide.addText(rightText, {
    x: W - MR - 6, y: H - 0.85, w: 6, h: 0.35,
    fontFace: FONT.body, fontSize: 11, color: COLOR.blueLight,
    align: "right", margin: 0, transparency: 40,
  });
}

// ============================================================
// SLIDE 1 — Title / Thesis
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  // Top eyebrow (left)
  s.addText("ORBITAL COMPUTE / INVESTOR MEMO", {
    x: M, y: 0.62, w: 10, h: 0.4,
    fontFace: FONT.body, fontSize: 15, bold: true,
    color: COLOR.blue, charSpacing: 8, margin: 0,
  });
  // Top right
  s.addText("2026 · Confidential", {
    x: W - MR - 6, y: 0.62, w: 6, h: 0.4,
    fontFace: FONT.body, fontSize: 14, color: COLOR.slate,
    align: "right", margin: 0,
  });

  // THESIS 001
  s.addText("THESIS 001", {
    x: M, y: 3.05, w: 8, h: 0.45,
    fontFace: FONT.body, fontSize: 16, bold: true,
    color: COLOR.blue, charSpacing: 8, margin: 0,
  });

  // Big headline
  s.addText("Data centers belong in orbit.", {
    x: M, y: 3.65, w: W - M - MR, h: 3.3,
    fontFace: FONT.head, fontSize: 92, bold: true,
    color: COLOR.navy, margin: 0, valign: "top",
  });

  // Subtitle
  s.addText(
    "At Starship prices, the unit economics of putting AI training compute in low Earth orbit start to close.",
    {
      x: M, y: 7.35, w: W - M - MR - 4, h: 1.3,
      fontFace: FONT.body, fontSize: 22, color: COLOR.slate,
      margin: 0, valign: "top",
    }
  );

  // Bottom row — left: DOCUMENT
  s.addText("DOCUMENT", {
    x: M, y: H - 1.25, w: 8, h: 0.35,
    fontFace: FONT.body, fontSize: 12, bold: true,
    color: COLOR.slate, margin: 0, transparency: 30,
  });
  s.addText("ORB-001 / REV A", {
    x: M, y: H - 0.85, w: 8, h: 0.4,
    fontFace: FONT.body, fontSize: 15, color: COLOR.navy, margin: 0,
  });

  // Bottom row — right: CLASSIFICATION
  s.addText("CLASSIFICATION", {
    x: W - MR - 9, y: H - 1.25, w: 9, h: 0.35,
    fontFace: FONT.body, fontSize: 12, bold: true,
    color: COLOR.slate, margin: 0, align: "right", transparency: 30,
  });
  s.addText("INVESTOR · INTERNAL", {
    x: W - MR - 7, y: H - 0.85, w: 7, h: 0.4,
    fontFace: FONT.body, fontSize: 15, color: COLOR.navy,
    align: "right", margin: 0,
  });
}

// ============================================================
// SLIDE 2 — Concept / Orbital Module Diagram
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.navyDeep };

  // eyebrow (light blue on dark)
  s.addText("00 / CONCEPT", {
    x: M, y: 0.62, w: 8, h: 0.4,
    fontFace: FONT.body, fontSize: 14, bold: true,
    color: COLOR.blueLight, charSpacing: 6, margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: M, y: 1.15, w: 3, h: 0,
    line: { color: COLOR.blueLight, width: 0.75 },
  });

  // top-right figure label
  s.addText("FIG. 01 — ORBITAL MODULE, NOT TO SCALE", {
    x: W - MR - 11, y: 0.62, w: 11, h: 0.4,
    fontFace: FONT.body, fontSize: 13, color: COLOR.blueLight,
    align: "right", margin: 0, transparency: 30,
  });

  // ----- Orbital module illustration -----
  // Center of diagram roughly x=10, y=5.2
  const cx = 10, cy = 5.2;

  // Radiator array — light cream rectangle with vertical stripes, tilted slightly
  const radX = cx - 2.5, radY = cy - 2.4, radW = 5.0, radH = 1.8;
  // radiator body
  s.addShape(pres.shapes.RECTANGLE, {
    x: radX, y: radY, w: radW, h: radH,
    fill: { color: "DCD7C8" },
    line: { color: "B8B2A0", width: 0.75 },
  });
  // radiator vertical fins
  for (let i = 1; i < 22; i++) {
    s.addShape(pres.shapes.LINE, {
      x: radX + (radW / 22) * i, y: radY, w: 0, h: radH,
      line: { color: "B8B2A0", width: 0.4 },
    });
  }
  // horizontal divider
  s.addShape(pres.shapes.LINE, {
    x: radX, y: radY + radH / 2, w: radW, h: 0,
    line: { color: "B8B2A0", width: 0.5 },
  });
  // heat wavy lines above radiator (simulated with small curved shapes — use short angled lines)
  for (let i = 0; i < 5; i++) {
    const hx = radX + 0.5 + i * (radW - 1) / 4;
    s.addShape(pres.shapes.LINE, {
      x: hx, y: radY - 0.65, w: 0.05, h: 0.6,
      line: { color: "C9A07A", width: 1.5 },
    });
  }

  // Compute module — dark cylinder (stacked dark rectangle + ovals for ends)
  const cmW = 1.8, cmH = 1.15;
  const cmX = cx - cmW / 2, cmY = cy;
  // left end cap (oval)
  s.addShape(pres.shapes.OVAL, {
    x: cmX - 0.22, y: cmY, w: 0.45, h: cmH,
    fill: { color: "1B2838" },
    line: { color: "0A1626", width: 0.5 },
  });
  // right end cap (oval)
  s.addShape(pres.shapes.OVAL, {
    x: cmX + cmW - 0.22, y: cmY, w: 0.45, h: cmH,
    fill: { color: "24344A" },
    line: { color: "0A1626", width: 0.5 },
  });
  // body
  s.addShape(pres.shapes.RECTANGLE, {
    x: cmX, y: cmY, w: cmW, h: cmH,
    fill: { color: "1B2838" },
    line: { type: "none" },
  });
  // vertical ribs on body
  for (let i = 1; i < 5; i++) {
    s.addShape(pres.shapes.LINE, {
      x: cmX + (cmW / 5) * i, y: cmY + 0.05, w: 0, h: cmH - 0.1,
      line: { color: "2A3A4D", width: 0.5 },
    });
  }
  // small optical downlink module under compute
  s.addShape(pres.shapes.RECTANGLE, {
    x: cx - 0.35, y: cmY + cmH + 0.02, w: 0.7, h: 0.12,
    fill: { color: "0B1A2B" }, line: { color: "2A3A4D", width: 0.5 },
  });

  // Solar array — LEFT (two panels, tilted down to left)
  // Each panel is a parallelogram look: we'll draw rectangles and tilt via rotate
  const panelFill = "1F57C4";
  const panelEdge = "0039A6";
  // left panel 1 (outer)
  s.addShape(pres.shapes.PARALLELOGRAM, {
    x: 1.4, y: 4.6, w: 3.2, h: 1.5,
    fill: { color: panelFill }, line: { color: panelEdge, width: 0.75 },
    rotate: 8,
  });
  // left panel 2 (inner, closer to hub)
  s.addShape(pres.shapes.PARALLELOGRAM, {
    x: 4.7, y: 4.9, w: 2.7, h: 1.4,
    fill: { color: panelFill }, line: { color: panelEdge, width: 0.75 },
    rotate: 5,
  });
  // right panel 1 (inner)
  s.addShape(pres.shapes.PARALLELOGRAM, {
    x: 12.6, y: 5.1, w: 2.7, h: 1.4,
    fill: { color: panelFill }, line: { color: panelEdge, width: 0.75 },
    rotate: -5,
  });
  // right panel 2 (outer)
  s.addShape(pres.shapes.PARALLELOGRAM, {
    x: 15.3, y: 4.8, w: 3.2, h: 1.5,
    fill: { color: panelFill }, line: { color: panelEdge, width: 0.75 },
    rotate: -8,
  });

  // Panel grid lines — faint
  function panelGrid(px, py, pw, ph, rows = 4, cols = 8) {
    for (let c = 1; c < cols; c++) {
      s.addShape(pres.shapes.LINE, {
        x: px + (pw / cols) * c, y: py, w: 0, h: ph,
        line: { color: "4B7FD5", width: 0.3 },
      });
    }
    for (let r = 1; r < rows; r++) {
      s.addShape(pres.shapes.LINE, {
        x: px, y: py + (ph / rows) * r, w: pw, h: 0,
        line: { color: "4B7FD5", width: 0.3 },
      });
    }
  }
  panelGrid(1.5, 4.7, 3.0, 1.3);
  panelGrid(4.8, 5.0, 2.5, 1.2);
  panelGrid(12.7, 5.2, 2.5, 1.2);
  panelGrid(15.4, 4.9, 3.0, 1.3);

  // Connector lines from panels to compute module
  s.addShape(pres.shapes.LINE, {
    x: 7.3, y: 5.5, w: cmX - 7.3, h: cmY + cmH / 2 - 5.5,
    line: { color: COLOR.blueLight, width: 0.75, transparency: 40 },
  });
  s.addShape(pres.shapes.LINE, {
    x: cmX + cmW, y: cmY + cmH / 2, w: 12.6 - (cmX + cmW), h: 5.5 - (cmY + cmH / 2),
    line: { color: COLOR.blueLight, width: 0.75, transparency: 40 },
  });

  // Connector from radiator (bottom) to compute top
  s.addShape(pres.shapes.LINE, {
    x: cx, y: radY + radH, w: 0, h: cmY - (radY + radH),
    line: { color: COLOR.blueLight, width: 0.75, transparency: 40 },
  });

  // ----- Labels with letter badges (A, B, C, D) -----
  function addBadge(x, y, letter) {
    s.addShape(pres.shapes.OVAL, {
      x, y, w: 0.42, h: 0.42,
      fill: { type: "none" },
      line: { color: COLOR.blueLight, width: 0.75 },
    });
    s.addText(letter, {
      x, y, w: 0.42, h: 0.42,
      fontFace: FONT.body, fontSize: 13, bold: true,
      color: COLOR.blueLight, align: "center", valign: "middle", margin: 0,
    });
  }

  // A — Radiator array (top label, near radiator)
  s.addText("Radiator array", {
    x: 5.4, y: 2.3, w: 3.6, h: 0.4,
    fontFace: FONT.head, fontSize: 15, italic: true,
    color: COLOR.white, margin: 0, transparency: 10,
  });
  s.addText("120,000 m² · 350 K", {
    x: 5.4, y: 2.7, w: 3.6, h: 0.35,
    fontFace: "Consolas", fontSize: 11,
    color: COLOR.blueLight, margin: 0, transparency: 30,
  });
  addBadge(9.1, 2.4, "A");

  // B — Solar array (left)
  s.addText("Solar array", {
    x: 1.2, y: 3.75, w: 2.5, h: 0.4,
    fontFace: FONT.head, fontSize: 15, italic: true,
    color: COLOR.white, margin: 0, transparency: 10,
  });
  s.addText("1,360 W/m² · AM0", {
    x: 1.2, y: 4.15, w: 2.5, h: 0.35,
    fontFace: "Consolas", fontSize: 11,
    color: COLOR.blueLight, margin: 0, transparency: 30,
  });
  addBadge(3.7, 3.85, "B");

  // C — Compute module (center/below)
  addBadge(cx - 0.21, cmY + cmH + 0.35, "C");
  s.addText("Compute module", {
    x: cx - 1.9, y: cmY + cmH + 0.9, w: 3.8, h: 0.4,
    fontFace: FONT.head, fontSize: 15, italic: true,
    color: COLOR.white, align: "center", margin: 0, transparency: 10,
  });
  s.addText("100 kW  ·  GPU rack", {
    x: cx - 1.9, y: cmY + cmH + 1.3, w: 3.8, h: 0.35,
    fontFace: "Consolas", fontSize: 11,
    color: COLOR.blueLight, align: "center", margin: 0, transparency: 30,
  });

  // D — Optical downlink (right)
  addBadge(14.4, 8.3, "D");
  s.addText("Optical downlink", {
    x: 14.9, y: 8.25, w: 4, h: 0.4,
    fontFace: FONT.head, fontSize: 15, italic: true,
    color: COLOR.white, margin: 0, transparency: 10,
  });
  s.addText("100 Gbps · ground station", {
    x: 14.9, y: 8.65, w: 4, h: 0.35,
    fontFace: "Consolas", fontSize: 11,
    color: COLOR.blueLight, margin: 0, transparency: 30,
  });

  // Dashed line from compute down to Earth surface
  s.addShape(pres.shapes.LINE, {
    x: cx, y: cmY + cmH + 0.15, w: 0.9, h: 3.1,
    line: { color: COLOR.blueLight, width: 0.75, dashType: "dash", transparency: 40 },
  });

  // Earth curve — large ellipse at bottom (light blue)
  s.addShape(pres.shapes.OVAL, {
    x: -10, y: 9.6, w: 40, h: 5,
    fill: { color: "3A6FC4" },
    line: { type: "none" },
  });
  // Earth darker upper rim (to give curve feel)
  s.addShape(pres.shapes.OVAL, {
    x: -10, y: 9.6, w: 40, h: 0.12,
    fill: { color: "5A86D4" },
    line: { type: "none" },
  });

  // wingspan annotation (bottom-right)
  s.addText("~60 m wingspan", {
    x: W - MR - 4, y: 8.8, w: 4, h: 0.3,
    fontFace: "Consolas", fontSize: 10,
    color: COLOR.blueLight, align: "right", margin: 0, transparency: 40,
  });

  // ----- Bottom captions -----
  s.addText("A compute module, deployed.", {
    x: M, y: 9.9, w: 9, h: 0.55,
    fontFace: FONT.head, fontSize: 26,
    color: COLOR.white, margin: 0,
  });
  s.addText(
    "100 kW pathfinder. Solar arrays sun-facing, radiators to deep space, optical downlink to ground. One Starship fairing per module.",
    {
      x: W - MR - 9, y: 9.85, w: 9, h: 1.0,
      fontFace: FONT.body, fontSize: 14, color: COLOR.blueLight,
      align: "right", margin: 0, transparency: 20,
    }
  );
}

// ============================================================
// SLIDE 3 — Context: three stats
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };
  addSectionHeader(s, "01  /  CONTEXT");

  s.addText("AI compute is hitting physical limits — on the ground.", {
    x: M, y: 1.5, w: W - M - MR, h: 2.0,
    fontFace: FONT.head, fontSize: 54, bold: true,
    color: COLOR.navy, margin: 0, valign: "top",
  });

  // three columns
  const colW = 5.5;
  const colY = 5.0;
  const cols = [
    { x: M, label: "POWER", big: "5 GW",
      desc: "Single next-gen training campuses now exceed the draw of a mid-size city." },
    { x: M + 6.0, label: "WATER", big: "~2 L",
      desc: "Evaporative cooling per kWh. Hyperscalers are being zoned out of drought regions." },
    { x: M + 12.0, label: "INTERCONNECT", big: "3–7 yr",
      desc: "Queue time for new grid capacity in the US, UK, and Ireland." },
  ];

  for (const c of cols) {
    // label
    s.addText(c.label, {
      x: c.x, y: colY, w: colW, h: 0.4,
      fontFace: FONT.body, fontSize: 14, bold: true,
      color: COLOR.blue, charSpacing: 6, margin: 0,
    });
    // underline
    s.addShape(pres.shapes.LINE, {
      x: c.x, y: colY + 0.55, w: 1.1, h: 0,
      line: { color: COLOR.blue, width: 0.75 },
    });
    // big number
    s.addText(c.big, {
      x: c.x, y: colY + 0.85, w: colW, h: 1.5,
      fontFace: FONT.head, fontSize: 72,
      color: COLOR.navy, margin: 0, valign: "top",
    });
    // description
    s.addText(c.desc, {
      x: c.x, y: colY + 2.6, w: colW - 0.5, h: 1.5,
      fontFace: FONT.body, fontSize: 18, color: COLOR.slate,
      margin: 0, valign: "top",
    });
  }

  // Bottom line with blue phrase
  s.addText(
    [
      { text: "The bottleneck is no longer silicon. It is ", options: { color: COLOR.navy } },
      { text: "land, water, and watts", options: { color: COLOR.blue } },
      { text: ".", options: { color: COLOR.navy } },
    ],
    {
      x: M, y: H - 1.1, w: W - M - MR, h: 0.5,
      fontFace: FONT.body, fontSize: 18, margin: 0,
    }
  );
}

// ============================================================
// SLIDE 4 — First principles: four rows
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };
  addSectionHeader(s, "02  /  FIRST PRINCIPLES");

  s.addText("A data center is four things in a box.", {
    x: M, y: 1.5, w: W - M - MR, h: 1.3,
    fontFace: FONT.head, fontSize: 54, bold: true,
    color: COLOR.navy, margin: 0,
  });

  const items = [
    ["01", "Power in",  "Orbit: 1,360 W/m² solar, 24/7 above ~600 km dawn-dusk."],
    ["02", "Heat out",  "Orbit: radiators to 3 K deep space. No water, no HVAC."],
    ["03", "Compute",   "GPUs & accelerators. Same silicon, rad-hardened packaging."],
    ["04", "Data pipe", "Optical downlink, 100 Gbps+ per terminal. Already flying."],
  ];

  const rowY0 = 3.7;
  const rowH = 1.35;
  for (let i = 0; i < items.length; i++) {
    const y = rowY0 + i * rowH;
    // number
    s.addText(items[i][0], {
      x: M, y, w: 1.3, h: 0.6,
      fontFace: FONT.head, fontSize: 24,
      color: COLOR.blue, margin: 0,
    });
    // label
    s.addText(items[i][1], {
      x: M + 1.8, y, w: 5, h: 0.7,
      fontFace: FONT.head, fontSize: 28,
      color: COLOR.navy, margin: 0,
    });
    // description (right-aligned column)
    s.addText(items[i][2], {
      x: W - MR - 8, y, w: 8, h: 0.9,
      fontFace: FONT.body, fontSize: 18, color: COLOR.slate,
      margin: 0, valign: "top",
    });
  }

  s.addText(
    [
      { text: "Every input except compute itself is ", options: { color: COLOR.navy } },
      { text: "better in orbit", options: { color: COLOR.blue } },
      { text: ". The only historical blocker was getting mass there.", options: { color: COLOR.navy } },
    ],
    { x: M, y: H - 1.1, w: W - M - MR, h: 0.5, fontFace: FONT.body, fontSize: 18, margin: 0 }
  );
}

// ============================================================
// SLIDE 5 — Launch cost bar chart
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };
  addSectionHeader(s, "03  /  THE UNLOCK");

  s.addText("Launch cost has fallen 100× in 20 years.", {
    x: M, y: 1.5, w: W - M - MR, h: 1.3,
    fontFace: FONT.head, fontSize: 54, bold: true,
    color: COLOR.navy, margin: 0,
  });

  // Chart area (manual — logarithmic visual scale is custom)
  // Plot area
  const plotX = 2.7, plotY = 3.5, plotW = 16.1, plotH = 6.4;
  // baseline (x-axis)
  s.addShape(pres.shapes.LINE, {
    x: plotX, y: plotY + plotH, w: plotW, h: 0,
    line: { color: COLOR.navy, width: 1 },
  });
  // y-axis baseline (subtle)
  s.addShape(pres.shapes.LINE, {
    x: plotX, y: plotY, w: 0, h: plotH,
    line: { color: COLOR.navy, width: 1 },
  });

  // y-axis labels at log positions
  const yLabels = [
    { label: "$60,000/kg", frac: 0.0 },
    { label: "$10,000",    frac: 0.28 },
    { label: "$1,500",     frac: 0.55 },
    { label: "$300",       frac: 0.80 },
    { label: "$100",       frac: 1.0 },
  ];
  for (const yl of yLabels) {
    const yy = plotY + yl.frac * plotH;
    s.addText(yl.label, {
      x: M, y: yy - 0.2, w: 1.6, h: 0.4,
      fontFace: FONT.body, fontSize: 13, color: COLOR.slate,
      align: "right", margin: 0,
    });
  }

  // Bars — heights visually match the original (heights are stylized, not strictly
  // log-proportional to $/kg — the chart emphasizes the Starship comparison).
  const bars = [
    { label: "Shuttle",         year: "2005",      top: "$60k",  hFrac: 0.95, color: COLOR.slate },
    { label: "Falcon 9",        year: "2015",      top: "$2.7k", hFrac: 0.45, color: COLOR.slate },
    { label: "Falcon Heavy",    year: "2020",      top: "$1.5k", hFrac: 0.52, color: COLOR.slate },
    { label: "Starship v1",     year: "2026–27e",  top: "$500",  hFrac: 0.63, color: COLOR.blueLight, highlight: true },
    { label: "Starship mature", year: "~2030e",    top: "$100",  hFrac: 0.80, color: COLOR.blue,      highlight: true },
  ];

  const nBars = bars.length;
  const slotW = plotW / nBars;
  const barW = slotW * 0.55;

  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    const barH = b.hFrac * plotH;
    const bx = plotX + slotW * i + (slotW - barW) / 2;
    const by = plotY + plotH - barH;

    s.addShape(pres.shapes.RECTANGLE, {
      x: bx, y: by, w: barW, h: barH,
      fill: { color: b.color }, line: { type: "none" },
    });

    // top value label
    s.addText(b.top, {
      x: bx - 0.5, y: by - 0.55, w: barW + 1, h: 0.4,
      fontFace: FONT.body, fontSize: 14,
      color: b.highlight ? COLOR.blue : COLOR.navy,
      bold: b.highlight ? true : false,
      align: "center", margin: 0,
    });

    // x-axis category label
    s.addText(
      [
        { text: b.label, options: { color: b.highlight ? COLOR.blue : COLOR.navy, bold: b.highlight ? true : false } },
        { text: "  " + b.year, options: { color: b.highlight ? COLOR.blue : COLOR.slate, fontSize: 12 } },
      ],
      {
        x: bx - 1.0, y: plotY + plotH + 0.15, w: barW + 2.0, h: 0.5,
        fontFace: FONT.body, fontSize: 14, align: "center", margin: 0,
      }
    );
  }

  // Source footer
  s.addText(
    "Source: published contract prices & SpaceX guidance. Mature Starship numbers are directional, not committed.",
    {
      x: M, y: H - 0.85, w: W - M - MR, h: 0.4,
      fontFace: FONT.body, fontSize: 13, color: COLOR.slate,
      margin: 0,
    }
  );
}

// ============================================================
// SLIDE 6 — Unit economics table
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };
  addSectionHeader(s, "04  /  UNIT ECONOMICS");

  s.addText("From $/kg to $/kWh, laid out.", {
    x: M, y: 1.5, w: W - M - MR, h: 1.3,
    fontFace: FONT.head, fontSize: 54, bold: true,
    color: COLOR.navy, margin: 0,
  });

  // table header row
  const tblY = 3.7;
  const cols = { num: M, assumption: M + 1.3, input: 12.3, result: 16.6 };
  const colW = { num: 1.3, assumption: 10.5, input: 4.3, result: 2.4 };

  function headerCell(x, w, text, align) {
    s.addText(text, {
      x, y: tblY, w, h: 0.5,
      fontFace: FONT.body, fontSize: 13, bold: true,
      color: COLOR.slate, margin: 0,
      align, transparency: 30,
    });
  }
  headerCell(cols.num, colW.num, "#", "left");
  headerCell(cols.assumption, colW.assumption, "ASSUMPTION", "left");
  headerCell(cols.input, colW.input, "INPUT", "right");
  headerCell(W - MR - colW.result, colW.result, "RESULT", "right");

  // header divider
  s.addShape(pres.shapes.LINE, {
    x: M, y: tblY + 0.55, w: W - M - MR, h: 0,
    line: { color: COLOR.navy, width: 1 },
  });

  const rows = [
    { k: "A", a: "Launch price, mature Starship", i: "$150/kg", r: "—", rNote: false, aSub: "" },
    { k: "B", a: "System mass per kW IT load", aSub: " (GPU + radiator + bus)", i: "6 kg/kW", r: "$900/kW launch", rNote: false },
    { k: "C", a: "Hardware cost", aSub: " (GPU + platform)", i: "$8,000/kW", r: "$8,900/kW all-in", rNote: false },
    { k: "D", a: "Amortize over 5 yr, 90% duty, free solar", aSub: "", i: "~39,400 kWh/kW", r: "≈ $0.23/kWh", rNote: true, highlight: true },
    { k: "E", a: "Reference: US hyperscaler all-in $/kWh", aSub: "", i: "—", r: "$0.12–0.18/kWh", rNote: false, muted: true },
  ];

  const rowH = 0.95;
  const rowY0 = tblY + 0.85;

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const y = rowY0 + i * rowH;

    // key letter
    s.addText(r.k, {
      x: cols.num, y, w: colW.num, h: 0.6,
      fontFace: FONT.head, fontSize: 22,
      color: COLOR.blue, margin: 0,
    });

    // assumption + sub
    const aRich = r.aSub
      ? [
          { text: r.a, options: { color: r.muted ? COLOR.slate : COLOR.navy } },
          { text: r.aSub, options: { color: COLOR.slate, fontSize: 15 } },
        ]
      : [{ text: r.a, options: { color: r.muted ? COLOR.slate : COLOR.navy } }];
    s.addText(aRich, {
      x: cols.assumption, y, w: colW.assumption, h: 0.7,
      fontFace: FONT.body, fontSize: 20, margin: 0, valign: "top",
    });

    // input
    s.addText(r.i, {
      x: cols.input, y, w: colW.input, h: 0.7,
      fontFace: FONT.body, fontSize: 20, color: COLOR.navy,
      align: "right", margin: 0,
    });

    // result
    s.addText(r.r, {
      x: W - MR - colW.result, y, w: colW.result, h: 0.7,
      fontFace: FONT.body, fontSize: 20,
      color: r.highlight ? COLOR.blue : COLOR.navy,
      bold: r.highlight ? true : false,
      align: "right", margin: 0,
    });

    // row divider (below each row)
    if (i < rows.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: M, y: y + rowH - 0.05, w: W - M - MR, h: 0,
        line: { color: COLOR.slate, width: 0.4, transparency: 70 },
      });
    }
  }

  // footer takeaway
  s.addText(
    [
      { text: "At $150/kg and 6 kg/kW, orbital compute lands within ", options: { color: COLOR.navy } },
      { text: "1.5× of terrestrial", options: { color: COLOR.blue } },
      { text: " — before counting free cooling and free power.", options: { color: COLOR.navy } },
    ],
    {
      x: M, y: H - 0.85, w: W - M - MR, h: 0.5,
      fontFace: FONT.body, fontSize: 18, margin: 0,
    }
  );
}

// ============================================================
// SLIDE 7 — Power: ground vs orbit side-by-side
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };
  addSectionHeader(s, "05  /  POWER");

  s.addText("Orbit has the best solar panel in the solar system.", {
    x: M, y: 1.5, w: W - M - MR, h: 2.0,
    fontFace: FONT.head, fontSize: 54, bold: true,
    color: COLOR.navy, margin: 0, valign: "top",
  });

  // Left column — GROUND (cream, plain)
  const leftX = M, leftY = 5.0, leftW = 8.6;
  s.addText("GROUND", {
    x: leftX, y: leftY, w: leftW, h: 0.4,
    fontFace: FONT.body, fontSize: 14, bold: true,
    color: COLOR.slate, charSpacing: 6, margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: leftX, y: leftY + 0.6, w: leftW, h: 0,
    line: { color: COLOR.slate, width: 0.5, transparency: 50 },
  });
  s.addText("~200 W/m²", {
    x: leftX, y: leftY + 0.85, w: leftW, h: 1.5,
    fontFace: FONT.head, fontSize: 72,
    color: COLOR.navy, margin: 0, valign: "top",
  });
  s.addText("Average after weather, night, latitude.", {
    x: leftX, y: leftY + 2.5, w: leftW, h: 0.5,
    fontFace: FONT.body, fontSize: 18, color: COLOR.slate, margin: 0,
  });
  s.addText(
    [
      { text: "Capacity factor: 20–25%", options: { breakLine: true } },
      { text: "Storage required: 12–16 hr", options: { breakLine: true } },
      { text: "Grid queue: years", options: { breakLine: true } },
      { text: "", options: { breakLine: true } },
      { text: "~5× the flux", options: { color: COLOR.blue } },
      { text: ", ", options: {} },
      { text: "~4× the uptime", options: { color: COLOR.blue } },
      { text: ", no land acquisition.", options: {} },
    ],
    {
      x: leftX, y: leftY + 3.2, w: leftW, h: 2.5,
      fontFace: FONT.body, fontSize: 17, color: COLOR.navy,
      margin: 0, paraSpaceAfter: 6, valign: "top",
    }
  );

  // Right column — DAWN-DUSK LEO (blue filled card)
  const rightX = 10.4, rightY = 4.6, rightW = 8.6, rightH = 6.2;
  s.addShape(pres.shapes.RECTANGLE, {
    x: rightX, y: rightY, w: rightW, h: rightH,
    fill: { color: COLOR.blue }, line: { type: "none" },
  });
  // inner
  const padX = 0.55, padY = 0.45;
  s.addText("DAWN-DUSK LEO", {
    x: rightX + padX, y: rightY + padY, w: rightW - 2 * padX, h: 0.4,
    fontFace: FONT.body, fontSize: 14, bold: true,
    color: COLOR.blueLight, charSpacing: 6, margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: rightX + padX, y: rightY + padY + 0.55, w: rightW - 2 * padX, h: 0,
    line: { color: COLOR.blueLight, width: 0.5, transparency: 40 },
  });
  s.addText("1,360 W/m²", {
    x: rightX + padX, y: rightY + padY + 0.85, w: rightW - 2 * padX, h: 1.5,
    fontFace: FONT.head, fontSize: 72,
    color: COLOR.white, margin: 0, valign: "top",
  });
  s.addText("AM0, continuous, no atmosphere.", {
    x: rightX + padX, y: rightY + padY + 2.5, w: rightW - 2 * padX, h: 0.5,
    fontFace: FONT.body, fontSize: 18, color: COLOR.white,
    margin: 0, transparency: 10,
  });
  s.addText(
    [
      { text: "Capacity factor: > 95%", options: { breakLine: true } },
      { text: "Storage required: < 1 hr eclipse", options: { breakLine: true } },
      { text: "Grid queue: n/a", options: {} },
    ],
    {
      x: rightX + padX, y: rightY + padY + 3.2, w: rightW - 2 * padX, h: 2.5,
      fontFace: FONT.body, fontSize: 17, color: COLOR.white,
      margin: 0, paraSpaceAfter: 6, valign: "top",
    }
  );
}

// ============================================================
// SLIDE 8 — Cooling: formula + cost table
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };
  addSectionHeader(s, "06  /  COOLING");

  s.addText("Space is cold. The hard part is getting heat to space.", {
    x: M, y: 1.5, w: W - M - MR, h: 2.0,
    fontFace: FONT.head, fontSize: 54, bold: true,
    color: COLOR.navy, margin: 0,
  });

  // LEFT — text + formula
  const leftX = M, leftY = 5.1, leftW = 9.0;
  s.addText(
    "Radiative cooling scales with surface area and T⁴. A 100 MW facility running at 350 K radiator temperature needs roughly:",
    {
      x: leftX, y: leftY, w: leftW, h: 1.4,
      fontFace: FONT.body, fontSize: 18, color: COLOR.navy,
      margin: 0, valign: "top",
    }
  );

  // big formula
  s.addText("P = σ · ε · A · T⁴", {
    x: leftX, y: leftY + 1.5, w: leftW, h: 0.9,
    fontFace: FONT.head, fontSize: 46,
    color: COLOR.navy, margin: 0,
  });
  s.addText("Stefan-Boltzmann. Solve for A at P=100 MW, ε=0.9, T=350 K.", {
    x: leftX, y: leftY + 2.4, w: leftW, h: 0.45,
    fontFace: FONT.body, fontSize: 14, color: COLOR.slate, margin: 0,
  });
  // arrow + result
  s.addText(
    [
      { text: "→ ", options: { color: COLOR.navy } },
      { text: "~120,000 m²", options: { color: COLOR.blue, bold: true } },
      { text: " of radiator. One Starship fairing deploys ~15,000 m² of thin-film radiator.",
        options: { color: COLOR.navy } },
    ],
    { x: leftX, y: leftY + 3.0, w: leftW, h: 1.5, fontFace: FONT.body, fontSize: 18, margin: 0, valign: "top" }
  );

  // RIGHT — cost table inside muted card
  const rX = 11.4, rY = 4.5, rW = 7.6, rH = 5.8;
  s.addShape(pres.shapes.RECTANGLE, {
    x: rX, y: rY, w: rW, h: rH,
    fill: { color: COLOR.creamDark }, line: { type: "none" },
  });

  s.addText("COST STRUCTURE, 100 MW", {
    x: rX + 0.4, y: rY + 0.35, w: rW - 0.8, h: 0.4,
    fontFace: FONT.body, fontSize: 14, bold: true,
    color: COLOR.blue, charSpacing: 6, margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: rX + 0.4, y: rY + 0.9, w: rW - 0.8, h: 0,
    line: { color: COLOR.blue, width: 0.75, transparency: 40 },
  });

  const costRows = [
    { label: "Ground: water + chillers", val: "$80M/yr", blue: false },
    { label: "Ground: PUE overhead",     val: "1.4–1.6×", blue: false },
    { label: "Orbit: radiator CAPEX",    val: "~$200M once", blue: true },
    { label: "Orbit: PUE overhead",      val: "~1.05×", blue: true },
  ];
  const crY0 = rY + 1.6;
  const crH = 0.95;
  for (let i = 0; i < costRows.length; i++) {
    const r = costRows[i];
    const y = crY0 + i * crH;
    s.addText(r.label, {
      x: rX + 0.4, y, w: rW * 0.6, h: 0.55,
      fontFace: FONT.body, fontSize: 18,
      color: r.blue ? COLOR.blue : COLOR.navy, margin: 0,
    });
    s.addText(r.val, {
      x: rX + rW - 0.4 - rW * 0.5, y, w: rW * 0.5, h: 0.55,
      fontFace: FONT.body, fontSize: 18,
      color: r.blue ? COLOR.blue : COLOR.navy,
      align: "right", margin: 0,
    });
    // subtle separator
    if (i < costRows.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: rX + 0.4, y: y + crH - 0.07, w: rW - 0.8, h: 0,
        line: { color: COLOR.slate, width: 0.3, transparency: 70 },
      });
    }
  }
}

// ============================================================
// SLIDE 9 — Break-even: sensitivity table
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };
  addSectionHeader(s, "07  /  BREAK-EVEN");

  s.addText("Launch cost is the only remaining variable.", {
    x: M, y: 1.5, w: W - M - MR, h: 1.3,
    fontFace: FONT.head, fontSize: 54, bold: true,
    color: COLOR.navy, margin: 0,
  });

  // sub eyebrow
  s.addText("ALL-IN ORBITAL $/KWH AT 6 KG/KW, 5-YR AMORT", {
    x: M, y: 3.4, w: W - M - MR, h: 0.4,
    fontFace: FONT.body, fontSize: 13, bold: true,
    color: COLOR.slate, margin: 0, transparency: 20,
  });
  s.addShape(pres.shapes.LINE, {
    x: M, y: 3.95, w: W - M - MR, h: 0,
    line: { color: COLOR.navy, width: 0.75 },
  });

  // Table — 4 rows x 6 cols
  const tX = M, tY = 4.1;
  const tW = W - M - MR;
  const nCol = 6;
  const cW = [2.3, (tW - 2.3) / 5, (tW - 2.3) / 5, (tW - 2.3) / 5, (tW - 2.3) / 5, (tW - 2.3) / 5];
  const colXs = [];
  {
    let acc = tX;
    for (const w of cW) { colXs.push(acc); acc += w; }
  }
  const nRow = 4;
  const rH9 = 1.0;

  // Build table cell-by-cell using addShape for fills + addText for values
  // Row 1: header — LAUNCH $/KG → | 1000 | 500 | 250 | 150 | 75
  // Row 2: 10 KG/KW | ...
  // Row 3: 6 KG/KW (highlighted cells)
  // Row 4: 3 KG/KW

  const table9 = [
    ["LAUNCH\n$/KG →", "$1,000", "$500", "$250", "$150", "$75"],
    ["10 KG/KW",       "$0.48",  "$0.35","$0.29","$0.26","$0.24"],
    ["6 KG/KW",        "$0.36",  "$0.28","$0.24","$0.23","$0.22"],
    ["3 KG/KW",        "$0.28",  "$0.24","$0.22","$0.21","$0.21"],
  ];
  // highlights on row index 2 (6 kg/kW): cols 1,2 faint; cols 3,4,5 deep blue
  const highlight = {
    "2-1": "faint",
    "2-2": "faint",
    "2-3": "deep",
    "2-4": "deep",
    "2-5": "deep",
  };

  // Outer border
  s.addShape(pres.shapes.RECTANGLE, {
    x: tX, y: tY, w: tW, h: rH9 * nRow,
    fill: { type: "none" }, line: { color: COLOR.navy, width: 1.25 },
  });

  for (let r = 0; r < nRow; r++) {
    for (let c = 0; c < nCol; c++) {
      const x = colXs[c];
      const y = tY + r * rH9;
      const w = cW[c];
      const h = rH9;

      const hkey = `${r}-${c}`;
      if (highlight[hkey] === "faint") {
        s.addShape(pres.shapes.RECTANGLE, {
          x, y, w, h,
          fill: { color: COLOR.blueFaint }, line: { type: "none" },
        });
      } else if (highlight[hkey] === "deep") {
        s.addShape(pres.shapes.RECTANGLE, {
          x, y, w, h,
          fill: { color: COLOR.blue }, line: { type: "none" },
        });
      }

      const isHeader = r === 0;
      const isRowLabel = c === 0;
      const isDeep = highlight[hkey] === "deep";

      let color, fontSize, bold, charSpacing;
      if (isHeader || isRowLabel) {
        color = COLOR.navy;
        fontSize = 15;
        bold = false;
        charSpacing = 4;
      } else {
        color = isDeep ? COLOR.white : COLOR.navy;
        fontSize = 22;
        bold = isDeep;
        charSpacing = 0;
      }

      s.addText(table9[r][c], {
        x, y, w, h,
        fontFace: FONT.body, fontSize, bold,
        color, align: "center", valign: "middle", margin: 0,
        charSpacing,
      });
    }
  }

  // Row grid lines
  for (let r = 1; r < nRow; r++) {
    s.addShape(pres.shapes.LINE, {
      x: tX, y: tY + r * rH9, w: tW, h: 0,
      line: { color: COLOR.navy, width: 0.5 },
    });
  }
  // Column grid lines
  for (let c = 1; c < nCol; c++) {
    s.addShape(pres.shapes.LINE, {
      x: colXs[c], y: tY, w: 0, h: rH9 * nRow,
      line: { color: COLOR.navy, width: 0.5 },
    });
  }

  // Footer
  s.addText("PARITY ZONE", {
    x: M, y: H - 1.0, w: 3.2, h: 0.5,
    fontFace: FONT.body, fontSize: 14, bold: true,
    color: COLOR.blue, charSpacing: 6, margin: 0,
  });
  s.addText(
    "Shaded cells are at or below terrestrial hyperscaler $/kWh. Every path through them requires Starship at scale.",
    {
      x: M + 3.5, y: H - 1.0, w: W - M - MR - 3.5, h: 0.5,
      fontFace: FONT.body, fontSize: 16, color: COLOR.navy, margin: 0,
    }
  );
}

// ============================================================
// SLIDE 10 — Fit: two outlined cards side-by-side
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };
  addSectionHeader(s, "08  /  FIT");

  s.addText("Training absorbs latency. Inference does not.", {
    x: M, y: 1.5, w: W - M - MR, h: 1.3,
    fontFace: FONT.head, fontSize: 54, bold: true,
    color: COLOR.navy, margin: 0,
  });

  // Cards
  const cardY = 3.8, cardH = 6.0;
  const leftX = M, leftW = 8.6;
  const rightX = 10.4, rightW = 8.6;

  // Left card: FITS IN ORBIT (cream with border)
  s.addShape(pres.shapes.RECTANGLE, {
    x: leftX, y: cardY, w: leftW, h: cardH,
    fill: { type: "none" }, line: { color: COLOR.navy, width: 1 },
  });
  // Right card: STAYS ON EARTH (slightly muted cream)
  s.addShape(pres.shapes.RECTANGLE, {
    x: rightX, y: cardY, w: rightW, h: cardH,
    fill: { color: COLOR.creamDark }, line: { color: COLOR.navy, width: 1 },
  });

  function cardContent(x, y, w, eyebrow, eyebrowColor, title, plus, lines) {
    const pad = 0.55;
    s.addText(eyebrow, {
      x: x + pad, y: y + pad, w: w - 2 * pad, h: 0.4,
      fontFace: FONT.body, fontSize: 14, bold: true,
      color: eyebrowColor, charSpacing: 6, margin: 0,
    });
    // underline
    s.addShape(pres.shapes.LINE, {
      x: x + pad, y: y + pad + 0.55, w: 1.2, h: 0,
      line: { color: eyebrowColor, width: 0.75 },
    });
    s.addText(title, {
      x: x + pad, y: y + pad + 0.95, w: w - 2 * pad, h: 1.0,
      fontFace: FONT.head, fontSize: 34,
      color: COLOR.navy, margin: 0,
    });

    const rows = lines.map((ln, idx) => ({
      text: `${plus}  ${ln}`,
      last: idx === lines.length - 1,
    }));
    const richBlocks = [];
    for (const r of rows) {
      richBlocks.push({
        text: r.text,
        options: {
          color: COLOR.navy,
          breakLine: !r.last,
        },
      });
    }
    s.addText(richBlocks, {
      x: x + pad, y: y + pad + 2.3, w: w - 2 * pad, h: cardH - pad - 2.5,
      fontFace: FONT.body, fontSize: 18, margin: 0,
      paraSpaceAfter: 14, valign: "top",
    });
  }

  cardContent(
    leftX, cardY, leftW,
    "FITS IN ORBIT", COLOR.blue,
    "Training & fine-tuning", "+",
    [
      "Round-trip: weeks, not ms",
      "Data pre-staged, not streamed",
      "Checkpoints, not packets",
      "Power > latency by 100×",
    ]
  );

  cardContent(
    rightX, cardY, rightW,
    "STAYS ON EARTH", COLOR.slate,
    "Real-time inference", "–",
    [
      "<50 ms user SLAs",
      "Ground-station hops add 30–80 ms",
      "Downlink contention",
      "Edge > orbit economics",
    ]
  );

  // Footer
  s.addText(
    [
      { text: "Training is ", options: { color: COLOR.navy } },
      { text: "~60% of hyperscale AI spend", options: { color: COLOR.blue } },
      { text: " and growing. That alone is the TAM.", options: { color: COLOR.navy } },
    ],
    {
      x: M, y: H - 1.0, w: W - M - MR, h: 0.5,
      fontFace: FONT.body, fontSize: 18, margin: 0,
    }
  );
}

// ============================================================
// SLIDE 11 — Build path: 4-phase timeline
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };
  addSectionHeader(s, "09  /  BUILD PATH");

  s.addText("Four launches, four milestones.", {
    x: M, y: 1.5, w: W - M - MR, h: 1.3,
    fontFace: FONT.head, fontSize: 54, bold: true,
    color: COLOR.navy, margin: 0,
  });

  const phases = [
    { title: "Pathfinder",   date: "PHASE 01  ·  2027",
      desc: "100 kW demo sat. Single rack, radiator deploy, optical downlink validated.",
      launches: "1 Starship", launchColor: COLOR.blue, dotColor: COLOR.blue },
    { title: "Pilot cluster", date: "PHASE 02  ·  2028",
      desc: "10 MW. First customer training run. Proof that a full epoch completes in orbit.",
      launches: "3 Starships", launchColor: COLOR.blue, dotColor: COLOR.blue },
    { title: "Production",    date: "PHASE 03  ·  2030",
      desc: "100 MW constellation segment. Multi-tenant. First $/kWh at parity.",
      launches: "~25 Starships", launchColor: COLOR.blue, dotColor: COLOR.blue },
    { title: "Gigawatt scale", date: "PHASE 04  ·  2032+",
      desc: "Modular GW-class facilities. Crossover with terrestrial AI supercomputers.",
      launches: "~250+ Starships", launchColor: COLOR.slate, dotColor: COLOR.slate },
  ];

  const lineY = 4.4;
  const colW11 = (W - M - MR) / 4;
  for (let i = 0; i < phases.length; i++) {
    const p = phases[i];
    const cx11 = M + colW11 * i;
    // dot
    s.addShape(pres.shapes.OVAL, {
      x: cx11, y: lineY, w: 0.32, h: 0.32,
      fill: { color: p.dotColor }, line: { type: "none" },
    });
    // horizontal rule under dot
    s.addShape(pres.shapes.LINE, {
      x: cx11, y: lineY + 0.6, w: colW11 - 0.7, h: 0,
      line: { color: COLOR.slate, width: 0.5, transparency: 50 },
    });
    // phase label (small eyebrow)
    s.addText(p.date, {
      x: cx11, y: lineY + 0.75, w: colW11, h: 0.4,
      fontFace: FONT.body, fontSize: 13, bold: true,
      color: COLOR.blue, charSpacing: 5, margin: 0,
    });
    // title
    s.addText(p.title, {
      x: cx11, y: lineY + 1.3, w: colW11 - 0.4, h: 0.7,
      fontFace: FONT.head, fontSize: 28,
      color: COLOR.navy, margin: 0,
    });
    // description
    s.addText(p.desc, {
      x: cx11, y: lineY + 2.15, w: colW11 - 0.4, h: 2.0,
      fontFace: FONT.body, fontSize: 16, color: COLOR.slate,
      margin: 0, valign: "top",
    });
    // launches
    s.addText(p.launches, {
      x: cx11, y: lineY + 4.2, w: colW11 - 0.4, h: 0.5,
      fontFace: FONT.body, fontSize: 16,
      color: p.launchColor, margin: 0,
    });
  }

  s.addText("Capital intensity is front-loaded at Phase 03. Revenue begins at Phase 02.", {
    x: M, y: H - 1.0, w: W - M - MR, h: 0.5,
    fontFace: FONT.body, fontSize: 18, color: COLOR.navy, margin: 0,
  });
}

// ============================================================
// SLIDE 12 — Timing: three arrows
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };
  addSectionHeader(s, "10  /  TIMING");

  s.addText("Three curves are crossing.", {
    x: M, y: 1.5, w: W - M - MR, h: 1.3,
    fontFace: FONT.head, fontSize: 54, bold: true,
    color: COLOR.navy, margin: 0,
  });

  const curves = [
    { arrow: "↓", title: "Launch cost",
      desc: "Starship Block 2 targeting <$300/kg by 2028. Full reusability closes the gap to $100/kg." },
    { arrow: "↑", title: "AI power demand",
      desc: "Frontier training runs now 100 MW+ and doubling every ~9 months. Grid can't keep up." },
    { arrow: "↑", title: "Compute-per-watt",
      desc: "Next-gen accelerators push 3–5× perf/W. Mass/kW drops commensurately." },
  ];

  const rowY = 4.6;
  const colW12 = 5.5;
  for (let i = 0; i < curves.length; i++) {
    const c = curves[i];
    const x12 = M + i * 6.2;

    s.addText(c.arrow, {
      x: x12, y: rowY, w: 1.5, h: 1.4,
      fontFace: FONT.head, fontSize: 72,
      color: COLOR.blue, margin: 0,
    });

    s.addText(c.title, {
      x: x12, y: rowY + 1.5, w: colW12, h: 0.7,
      fontFace: FONT.head, fontSize: 28,
      color: COLOR.navy, margin: 0,
    });

    s.addText(c.desc, {
      x: x12, y: rowY + 2.3, w: colW12, h: 2.3,
      fontFace: FONT.body, fontSize: 18, color: COLOR.slate,
      margin: 0, valign: "top",
    });
  }

  s.addText(
    "The window to build the first orbital compute company opens in the next 24 months. It does not stay open.",
    {
      x: M, y: H - 1.0, w: W - M - MR, h: 0.5,
      fontFace: FONT.body, fontSize: 18, color: COLOR.navy, margin: 0,
    }
  );
}

// ============================================================
// SLIDE 13 — The Ask (dark closer)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.navy };

  // eyebrow
  s.addText("11  /  THE ASK", {
    x: M, y: 0.62, w: 8, h: 0.4,
    fontFace: FONT.body, fontSize: 14, bold: true,
    color: COLOR.blueLight, charSpacing: 6, margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: M, y: 1.15, w: W - M - MR, h: 0,
    line: { color: COLOR.blueLight, width: 0.5, transparency: 50 },
  });

  // Title
  s.addText("The Pathfinder round.", {
    x: M, y: 2.5, w: W - M - MR, h: 1.4,
    fontFace: FONT.head, fontSize: 60, bold: true,
    color: COLOR.cream, margin: 0,
  });

  // Subtitle
  s.addText(
    "Funding a 100 kW demonstrator, launch manifest, and ground segment. Revenue begins at Phase 02.",
    {
      x: M, y: 4.1, w: 13, h: 1.2,
      fontFace: FONT.body, fontSize: 22, color: COLOR.cream,
      margin: 0, valign: "top", transparency: 15,
    }
  );

  // Three stat columns
  const stats = [
    { label: "ROUND",      big: "$60M",  sub: "Seed extension / Series A." },
    { label: "RUNWAY",     big: "24 mo", sub: "To Pathfinder on-orbit." },
    { label: "MILESTONES", big: "3",     sub: "Radiator, downlink, training epoch." },
  ];
  const statY = 6.6;
  const statColW = 6.0;
  for (let i = 0; i < stats.length; i++) {
    const st = stats[i];
    const x13 = M + i * 6.3;

    s.addText(st.label, {
      x: x13, y: statY, w: statColW, h: 0.4,
      fontFace: FONT.body, fontSize: 14, bold: true,
      color: COLOR.blueLight, charSpacing: 6, margin: 0,
    });
    s.addShape(pres.shapes.LINE, {
      x: x13, y: statY + 0.55, w: 1.2, h: 0,
      line: { color: COLOR.blueLight, width: 0.75, transparency: 30 },
    });
    s.addText(st.big, {
      x: x13, y: statY + 0.85, w: statColW, h: 1.5,
      fontFace: FONT.head, fontSize: 72,
      color: COLOR.white, margin: 0, valign: "top",
    });
    s.addText(st.sub, {
      x: x13, y: statY + 2.5, w: statColW - 0.5, h: 0.7,
      fontFace: FONT.body, fontSize: 17, color: COLOR.cream,
      margin: 0, transparency: 20,
    });
  }

  // Bottom-left brand
  s.addText("ORBITAL COMPUTE", {
    x: M, y: H - 0.7, w: 9, h: 0.35,
    fontFace: FONT.body, fontSize: 12, bold: true,
    color: COLOR.blueLight, margin: 0, transparency: 30,
  });
  // Bottom-right document ref
  s.addText("ORB-001 / REV A  ·  2026", {
    x: W - MR - 9, y: H - 0.7, w: 9, h: 0.35,
    fontFace: FONT.body, fontSize: 12,
    color: COLOR.blueLight, align: "right", margin: 0, transparency: 30,
  });
}

// ===== Save =====
pres.writeFile({ fileName: "Investing.pptx" })
  .then((f) => console.log("Wrote", f))
  .catch((e) => { console.error(e); process.exit(1); });
