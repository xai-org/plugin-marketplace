// manassas.js — Recreate "Manassas Regional · Operator Overview 2026" deck with pptxgenjs.
// Run: node manassas.js   →   produces manassas.pptx
const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333" x 7.5"
pres.author = "Manassas Regional Airport";
pres.title = "Manassas Regional · Operator Overview 2026";

// ---------- Design tokens ----------
const SLIDE_W = 13.333;
const SLIDE_H = 7.5;

const COLOR = {
  navy:      "0E1B2B",
  navyDeep:  "08111C",
  cream:     "EFE8DC",
  creamAlt:  "EBE3D4",
  rust:      "C8732E",
  rustDeep:  "A85B20",
  inkNavy:   "132134",   // body text on cream
  mutedNavy: "4A5A6E",   // secondary text on cream
  mutedCream:"9AA3AF",   // secondary text on navy
  hairlineLight: "C9C2B4", // thin rules on cream
  hairlineDark:  "2A3647", // thin rules on navy
};

const FONT = {
  serif: "Georgia",      // display headlines (serif with weight)
  mono:  "Courier New",  // labels, metadata, page numbers
  body:  "Georgia",      // body copy
};

// ---------- Helper utilities ----------
function hairline(slide, x, y, w, color, opts = {}) {
  slide.addShape(pres.shapes.LINE, {
    x, y, w, h: 0,
    line: { color, width: opts.width || 0.5 },
  });
}

// Chrome = the top/bottom scaffolding that appears on every slide.
// onNavy flips colors for dark slides.
function addChrome({ slide, onNavy, sectionLabel, topRight, pageNum, footerRight, showDot = true }) {
  const labelColor = onNavy ? COLOR.cream : COLOR.inkNavy;
  const mutedColor = onNavy ? COLOR.mutedCream : COLOR.mutedNavy;
  const dotColor   = COLOR.rust;

  // Top-left: • section label
  if (showDot) {
    slide.addShape(pres.shapes.OVAL, {
      x: 0.60, y: 0.56, w: 0.12, h: 0.12,
      fill: { color: dotColor }, line: { type: "none" },
    });
  }
  slide.addText(sectionLabel, {
    x: 0.82, y: 0.45, w: 6, h: 0.35,
    fontFace: FONT.mono, fontSize: 11, color: labelColor,
    charSpacing: 4, bold: false, margin: 0, valign: "middle",
  });

  // Top-right: context tag
  slide.addText(topRight, {
    x: SLIDE_W - 6.6, y: 0.45, w: 6, h: 0.35,
    fontFace: FONT.mono, fontSize: 11, color: labelColor,
    charSpacing: 4, align: "right", margin: 0, valign: "middle",
  });

  // Bottom-left: page number in mono
  slide.addText(pageNum, {
    x: 0.60, y: SLIDE_H - 0.65, w: 3, h: 0.3,
    fontFace: FONT.mono, fontSize: 11, color: labelColor,
    charSpacing: 3, margin: 0, valign: "middle",
  });

  // Bottom-right: footer label in mono
  slide.addText(footerRight, {
    x: SLIDE_W - 6.6, y: SLIDE_H - 0.65, w: 6, h: 0.3,
    fontFace: FONT.mono, fontSize: 11, color: labelColor,
    charSpacing: 4, align: "right", margin: 0, valign: "middle",
  });
}

// ============================================================
// SLIDE 1 — Title / cover
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR.navy };

  addChrome({
    slide, onNavy: true,
    sectionLabel: "MANASSAS REGIONAL · HEF · KHEF",
    topRight: "38.7214° N  77.5153° W",
    pageNum: "01 / 10",
    footerRight: "MANASSAS REGIONAL AIRPORT",
  });

  // Orange kicker
  slide.addText("OPERATOR OVERVIEW · 2026", {
    x: 0.80, y: 3.00, w: 7, h: 0.35,
    fontFace: FONT.mono, fontSize: 13, color: COLOR.rust,
    charSpacing: 5, margin: 0, valign: "middle",
  });

  // Giant serif headline
  slide.addText("The quiet way\ninto Washington.", {
    x: 0.80, y: 3.45, w: 8.2, h: 2.4,
    fontFace: FONT.serif, fontSize: 60, color: COLOR.cream,
    bold: false, margin: 0, valign: "top", lineSpacingMultiple: 1.05,
  });

  // Meta strip
  slide.addText("RWY 16L/34R · 6,200 ft       FAR Part 139 · GA        VA · USA", {
    x: 0.80, y: 5.95, w: 8.5, h: 0.4,
    fontFace: FONT.mono, fontSize: 12, color: COLOR.cream,
    charSpacing: 2, margin: 0, valign: "middle",
  });

  // --- Compass rose decoration (right side) ---
  const cx = 10.60, cy = 3.75;   // center of compass
  const ringColor = COLOR.hairlineDark;
  // Three rings
  [2.30, 1.65, 1.00].forEach((d) => {
    slide.addShape(pres.shapes.OVAL, {
      x: cx - d / 2, y: cy - d / 2, w: d, h: d,
      fill: { type: "none" },
      line: { color: ringColor, width: 0.75 },
    });
  });
  // Cross hairs
  slide.addShape(pres.shapes.LINE, {
    x: cx - 1.40, y: cy, w: 2.80, h: 0,
    line: { color: ringColor, width: 0.75 },
  });
  slide.addShape(pres.shapes.LINE, {
    x: cx, y: cy - 1.40, w: 0, h: 2.80,
    line: { color: ringColor, width: 0.75 },
  });
  // North-pointing triangle (filled wedge)
  slide.addShape(pres.shapes.ISOSCELES_TRIANGLE, {
    x: cx - 0.10, y: cy - 1.15, w: 0.20, h: 1.15,
    fill: { color: COLOR.navyDeep }, line: { color: ringColor, width: 0.75 },
  });
}

// ============================================================
// SLIDE 2 — At a glance (4 stat cards)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR.cream };

  addChrome({
    slide, onNavy: false,
    sectionLabel: "02 · AT A GLANCE",
    topRight: "SECTION I · THE AIRPORT",
    pageNum: "02 / 10",
    footerRight: "AT A GLANCE",
  });

  // Headline
  slide.addText("A full-service regional field, thirty\nminutes from the Capitol.", {
    x: 0.60, y: 1.10, w: 12, h: 2.0,
    fontFace: FONT.serif, fontSize: 48, color: COLOR.inkNavy,
    bold: false, margin: 0, valign: "top", lineSpacingMultiple: 1.08,
  });

  // Four stat cards
  const cardW = 2.85, cardGap = 0.15;
  const startX = 0.60;
  const labelY = 3.80, ruleY = 4.15, valueY = 4.28, captionY = 5.25;

  const stats = [
    { label: "IDENT",      value: "HEF",     unit: "",     caption: "ICAO KHEF" },
    { label: "RUNWAY",     value: "6,200",   unit: "ft",   caption: "Primary 16L/34R · Lit" },
    { label: "DRIVE TO DC",value: "30",      unit: "min",  caption: "To the Mall · off-peak" },
    { label: "ACCESS",     value: "24/7",    unit: "",     caption: "Tower 06:00–22:00 local" },
  ];

  stats.forEach((s, i) => {
    const x = startX + i * (cardW + cardGap);

    // Mono label
    slide.addText(s.label, {
      x, y: labelY, w: cardW, h: 0.3,
      fontFace: FONT.mono, fontSize: 11, color: COLOR.mutedNavy,
      charSpacing: 4, margin: 0, valign: "middle",
    });

    // Hairline under label
    hairline(slide, x, ruleY, cardW - 0.2, COLOR.hairlineLight);

    // Big value in serif
    slide.addText(
      [
        { text: s.value, options: { fontSize: 56, color: COLOR.inkNavy } },
        ...(s.unit ? [{ text: s.unit, options: { fontSize: 20, color: COLOR.inkNavy } }] : []),
      ],
      {
        x, y: valueY, w: cardW, h: 0.95,
        fontFace: FONT.serif, margin: 0, valign: "top",
      }
    );

    // Caption
    slide.addText(s.caption, {
      x, y: captionY, w: cardW, h: 0.3,
      fontFace: FONT.mono, fontSize: 11, color: COLOR.inkNavy,
      charSpacing: 1, margin: 0, valign: "middle",
    });
  });
}

// ============================================================
// SLIDE 3 — Location (headline + map placeholder)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR.cream };

  addChrome({
    slide, onNavy: false,
    sectionLabel: "03 · LOCATION",
    topRight: "VA → DC CORRIDOR",
    pageNum: "03 / 10",
    footerRight: "LOCATION ADVANTAGE",
  });

  // Left: headline + body + links
  slide.addText("Closer to downtown\nthan the airport\neveryone fights over.", {
    x: 0.60, y: 1.10, w: 6.4, h: 2.6,
    fontFace: FONT.serif, fontSize: 38, color: COLOR.inkNavy,
    bold: false, margin: 0, valign: "top", lineSpacingMultiple: 1.06,
  });

  slide.addText(
    "HEF sits on the west side of the Capital Beltway, feeding " +
    "directly onto I-66 toward the District. The drive is short, " +
    "predictable, and free of the approach-traffic that clogs the " +
    "northern corridor.",
    {
      x: 0.60, y: 3.90, w: 6.0, h: 1.70,
      fontFace: FONT.body, fontSize: 14, color: COLOR.inkNavy,
      margin: 0, valign: "top", lineSpacingMultiple: 1.35,
    }
  );

  // Link-style bullets (rust arrow + mono text) in 2 columns
  const links = [
    { label: "The White House · 34 mi", x: 0.60, y: 5.80 },
    { label: "The Pentagon · 28 mi",    x: 3.70, y: 5.80 },
    { label: "Tysons Corner · 22 mi",   x: 0.60, y: 6.20 },
    { label: "Capitol Hill · 36 mi",    x: 3.70, y: 6.20 },
  ];
  links.forEach((l) => {
    slide.addText(
      [
        { text: "→ ", options: { color: COLOR.rust } },
        { text: l.label, options: { color: COLOR.inkNavy } },
      ],
      {
        x: l.x, y: l.y, w: 3.0, h: 0.35,
        fontFace: FONT.mono, fontSize: 12,
        charSpacing: 1, margin: 0, valign: "middle",
      }
    );
  });

  // Right: map placeholder (tan rectangle with diagonal hatch + labels)
  const mapX = 7.50, mapY = 1.10, mapW = 5.30, mapH = 5.30;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: mapX, y: mapY, w: mapW, h: mapH,
    fill: { color: "DDD4BF" }, line: { color: COLOR.hairlineLight, width: 0.5 },
  });
  // Subtle textured overlay (a few full-diagonals across the map area)
  for (let i = 0; i < 14; i++) {
    const step = 0.42;
    // Line runs from left edge at varying y down to top edge at varying x
    const startY = mapY + i * step;
    const endX = mapX + i * step;
    if (startY <= mapY + mapH) {
      slide.addShape(pres.shapes.LINE, {
        x: mapX, y: startY,
        w: Math.min(mapW, mapY + mapH - startY),
        h: Math.min(mapW, mapY + mapH - startY),
        line: { color: "D5CBB5", width: 0.4 },
      });
    }
    if (endX <= mapX + mapW) {
      slide.addShape(pres.shapes.LINE, {
        x: endX, y: mapY,
        w: Math.min(mapW - i * step, mapH),
        h: Math.min(mapW - i * step, mapH),
        line: { color: "D5CBB5", width: 0.4 },
      });
    }
  }

  // DC blob (approximation)
  slide.addShape(pres.shapes.OVAL, {
    x: mapX + 3.80, y: mapY + 0.80, w: 1.10, h: 3.20,
    fill: { color: "CFC3A6" }, line: { type: "none" },
  });

  // IAD dot
  slide.addShape(pres.shapes.OVAL, {
    x: mapX + 3.35, y: mapY + 1.45, w: 0.16, h: 0.16,
    fill: { color: COLOR.mutedNavy }, line: { type: "none" },
  });
  slide.addText("IAD", {
    x: mapX + 3.55, y: mapY + 1.35, w: 0.8, h: 0.3,
    fontFace: FONT.mono, fontSize: 11, color: COLOR.inkNavy,
    margin: 0, valign: "middle",
  });

  // DCA box
  slide.addShape(pres.shapes.RECTANGLE, {
    x: mapX + 4.20, y: mapY + 2.55, w: 0.70, h: 0.35,
    fill: { type: "none" }, line: { color: COLOR.mutedNavy, width: 0.75 },
  });
  slide.addShape(pres.shapes.OVAL, {
    x: mapX + 4.28, y: mapY + 2.65, w: 0.14, h: 0.14,
    fill: { color: COLOR.mutedNavy }, line: { type: "none" },
  });
  slide.addText("DCA", {
    x: mapX + 4.42, y: mapY + 2.58, w: 0.5, h: 0.3,
    fontFace: FONT.mono, fontSize: 10, color: COLOR.inkNavy,
    margin: 0, valign: "middle",
  });
  slide.addText("WASHINGTON D.C.", {
    x: mapX + 3.60, y: mapY + 2.95, w: 1.7, h: 0.3,
    fontFace: FONT.mono, fontSize: 9, color: COLOR.inkNavy,
    charSpacing: 1, margin: 0, valign: "middle",
  });

  // Dashed I-66 line: HEF (bottom-left) to DC (top-right).
  // Use positive h with flipV to render the line going up-and-right.
  slide.addShape(pres.shapes.LINE, {
    x: mapX + 0.35, y: mapY + 1.60, w: 3.55, h: 1.60,
    flipV: true,
    line: { color: COLOR.inkNavy, width: 1.1, dashType: "dash" },
  });
  slide.addText("I-66 · 30 MIN", {
    x: mapX + 1.50, y: mapY + 2.10, w: 1.6, h: 0.3,
    fontFace: FONT.mono, fontSize: 10, color: COLOR.inkNavy,
    margin: 0, valign: "middle",
  });

  // HEF marker (rust ring + fill)
  const hefX = mapX + 0.70, hefY = mapY + 3.20;
  slide.addShape(pres.shapes.OVAL, {
    x: hefX, y: hefY, w: 0.36, h: 0.36,
    fill: { type: "none" }, line: { color: COLOR.rust, width: 1.5 },
  });
  slide.addShape(pres.shapes.OVAL, {
    x: hefX + 0.10, y: hefY + 0.10, w: 0.16, h: 0.16,
    fill: { color: COLOR.rust }, line: { type: "none" },
  });
  slide.addText("HEF  ·  MANASSAS", {
    x: mapX + 0.35, y: mapY + 3.70, w: 2.0, h: 0.3,
    fontFace: FONT.mono, fontSize: 11, color: COLOR.inkNavy,
    charSpacing: 1, margin: 0, valign: "middle",
  });

  // Placeholder caption
  slide.addText("[ PLACEHOLDER · REGIONAL MAP · N.VA → D.C. ]", {
    x: mapX + 0.25, y: mapY + mapH - 0.55, w: mapW - 0.5, h: 0.3,
    fontFace: FONT.mono, fontSize: 10, color: COLOR.mutedNavy,
    charSpacing: 2, margin: 0, valign: "middle",
  });
}

// ============================================================
// SLIDE 4 — Facilities (3 columns)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR.cream };

  addChrome({
    slide, onNavy: false,
    sectionLabel: "04 · FACILITIES",
    topRight: "WHAT'S ON THE FIELD",
    pageNum: "04 / 10",
    footerRight: "FACILITIES & SERVICES",
  });

  // Headline
  slide.addText("Everything a jet operator needs;\nnothing they don't.", {
    x: 0.60, y: 1.10, w: 12.2, h: 2.2,
    fontFace: FONT.serif, fontSize: 42, color: COLOR.inkNavy,
    bold: false, margin: 0, valign: "top", lineSpacingMultiple: 1.08,
  });

  // Three columns
  const cols = [
    {
      num: "01 · FUEL",
      title: "Jet A & 100LL, self- and full-serve",
      body: "Two trucks on rotation. Contract-fuel accepted. Overnight tankering available with prior notice.",
    },
    {
      num: "02 · HANGAR",
      title: "30,000 sq ft heated hangar",
      body: "Accommodates most private jets. Transient space reservable by the night or the month.",
    },
    {
      num: "03 · GROUND",
      title: "Enterprise rental desk on-site",
      body: "Pick up a car inside the terminal; drive onto I-66 in under ten minutes. Crew cars available separately.",
    },
  ];

  const colW = 3.90, colGap = 0.20;
  const startX = 0.60;
  cols.forEach((c, i) => {
    const x = startX + i * (colW + colGap);

    // Mono kicker
    slide.addText(c.num, {
      x, y: 3.70, w: colW, h: 0.3,
      fontFace: FONT.mono, fontSize: 11, color: COLOR.rust,
      charSpacing: 4, margin: 0, valign: "middle",
    });

    // Rule
    hairline(slide, x, 4.05, colW - 0.2, COLOR.hairlineLight);

    // Serif title
    slide.addText(c.title, {
      x, y: 4.18, w: colW - 0.3, h: 1.10,
      fontFace: FONT.serif, fontSize: 22, color: COLOR.inkNavy,
      bold: false, margin: 0, valign: "top", lineSpacingMultiple: 1.15,
    });

    // Body
    slide.addText(c.body, {
      x, y: 5.40, w: colW - 0.3, h: 1.4,
      fontFace: FONT.body, fontSize: 13, color: COLOR.mutedNavy,
      margin: 0, valign: "top", lineSpacingMultiple: 1.35,
    });
  });
}

// ============================================================
// SLIDE 5 — Section II / Experience (split layout)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR.navy };

  // Left half (slightly darker band to suggest hero photo placeholder)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: SLIDE_W * 0.50, h: SLIDE_H,
    fill: { color: COLOR.navyDeep }, line: { type: "none" },
  });
  // Subtle diagonal hatching lines on left side to suggest textured photo placeholder
  const leftHalfW = SLIDE_W * 0.50;
  for (let i = 0; i < 20; i++) {
    const startX = i * 0.45;
    if (startX >= leftHalfW) break;
    const lineLen = Math.min(leftHalfW - startX, SLIDE_H);
    slide.addShape(pres.shapes.LINE, {
      x: startX, y: 0,
      w: lineLen, h: lineLen,
      line: { color: "12203A", width: 0.4 },
    });
  }
  // Simple jet silhouette placeholder (center-left)
  const jetX = 2.0, jetY = 4.10;
  // Fuselage
  slide.addShape(pres.shapes.RECTANGLE, {
    x: jetX, y: jetY + 0.18, w: 2.8, h: 0.22,
    fill: { color: "2A3F5A" }, line: { type: "none" },
  });
  // Tail
  slide.addShape(pres.shapes.RECTANGLE, {
    x: jetX + 1.30, y: jetY - 0.20, w: 0.25, h: 0.40,
    fill: { color: "2A3F5A" }, line: { type: "none" },
  });
  // Wings (wide trapezoid approximated as rectangle)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: jetX - 0.25, y: jetY + 0.35, w: 3.25, h: 0.14,
    fill: { color: "2A3F5A" }, line: { type: "none" },
  });
  // Horizon hairline
  slide.addShape(pres.shapes.LINE, {
    x: 0, y: SLIDE_H * 0.72, w: SLIDE_W * 0.50, h: 0,
    line: { color: "1A2A42", width: 0.75 },
  });

  // Chrome (manually for this split slide — dot on right, different layout)
  // Top-right: SECTION II label + "05" + orange dot (order reversed from others)
  slide.addText("SECTION II · THE EXPERIENCE", {
    x: SLIDE_W - 7.0, y: 0.45, w: 5.2, h: 0.35,
    fontFace: FONT.mono, fontSize: 11, color: COLOR.cream,
    charSpacing: 4, align: "right", margin: 0, valign: "middle",
  });
  slide.addShape(pres.shapes.OVAL, {
    x: SLIDE_W - 1.45, y: 0.56, w: 0.12, h: 0.12,
    fill: { color: COLOR.rust }, line: { type: "none" },
  });
  slide.addText("05", {
    x: SLIDE_W - 1.25, y: 0.45, w: 0.8, h: 0.35,
    fontFace: FONT.mono, fontSize: 11, color: COLOR.rust,
    charSpacing: 3, margin: 0, valign: "middle",
  });

  // Bottom-left page num + placeholder caption
  slide.addText("05 / 10", {
    x: 0.60, y: SLIDE_H - 0.95, w: 3, h: 0.3,
    fontFace: FONT.mono, fontSize: 11, color: COLOR.cream,
    charSpacing: 3, margin: 0, valign: "middle",
  });
  slide.addText("[ PLACEHOLDER · APRON PHOTO · JET AT TWILIGHT ]", {
    x: 0.60, y: SLIDE_H - 0.60, w: 6, h: 0.3,
    fontFace: FONT.mono, fontSize: 10, color: COLOR.mutedCream,
    charSpacing: 2, margin: 0, valign: "middle",
  });
  slide.addText("THE PRIVATE JET EXPERIENCE", {
    x: SLIDE_W - 6.60, y: SLIDE_H - 0.65, w: 6, h: 0.3,
    fontFace: FONT.mono, fontSize: 11, color: COLOR.cream,
    charSpacing: 4, align: "right", margin: 0, valign: "middle",
  });

  // Right half — headline + timeline
  const rx = 7.20;
  slide.addText("Wheels-down to\nwheels-up.", {
    x: rx, y: 1.25, w: 5.8, h: 1.8,
    fontFace: FONT.serif, fontSize: 40, color: COLOR.cream,
    bold: false, margin: 0, valign: "top", lineSpacingMultiple: 1.06,
  });

  slide.addText("A typical turnaround at HEF, from stand to signature.", {
    x: rx, y: 3.10, w: 6.0, h: 0.4,
    fontFace: FONT.mono, fontSize: 11, color: COLOR.mutedCream,
    charSpacing: 1, margin: 0, valign: "middle",
  });

  // Timeline rows
  const rows = [
    { t: "T+0",  d: "Touchdown on 16L. Taxi to FBO ramp." },
    { t: "T+4",  d: "Engines down. Lineman at the door." },
    { t: "T+7",  d: "Enterprise keys in hand, bags curbside." },
    { t: "T+12", d: "On I-66, eastbound." },
  ];
  const rowStart = 3.75, rowH = 0.72;
  rows.forEach((r, i) => {
    const y = rowStart + i * rowH;
    // Rust time stamp
    slide.addText(r.t, {
      x: rx, y: y, w: 1.2, h: 0.55,
      fontFace: FONT.serif, fontSize: 26, color: COLOR.rust,
      bold: false, margin: 0, valign: "middle",
    });
    // Description
    slide.addText(r.d, {
      x: rx + 1.3, y: y, w: 4.75, h: 0.55,
      fontFace: FONT.mono, fontSize: 11, color: COLOR.cream,
      charSpacing: 1, margin: 0, valign: "middle",
    });
    // Hairline divider below each row
    hairline(slide, rx, y + rowH - 0.05, 6.05, COLOR.hairlineDark, { width: 0.5 });
  });
}

// ============================================================
// SLIDE 6 — Fee comparison (bar-chart-style indexed rows)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR.cream };

  addChrome({
    slide, onNavy: false,
    sectionLabel: "06 · FEE COMPARISON",
    topRight: "HEF vs. IAD · INDEXED",
    pageNum: "06 / 10",
    footerRight: "FEE COMPARISON",
  });

  // Headline
  slide.addText("Roughly a third less, line-for-line.", {
    x: 0.60, y: 1.10, w: 12, h: 1.0,
    fontFace: FONT.serif, fontSize: 44, color: COLOR.inkNavy,
    bold: false, margin: 0, valign: "top",
  });

  // Column headers
  slide.addText("FEE CATEGORY", {
    x: 0.60, y: 3.30, w: 2.5, h: 0.3,
    fontFace: FONT.mono, fontSize: 11, color: COLOR.mutedNavy,
    charSpacing: 4, margin: 0, valign: "middle",
  });
  slide.addText("MANASSAS (HEF)", {
    x: 3.30, y: 3.30, w: 4.0, h: 0.3,
    fontFace: FONT.mono, fontSize: 11, color: COLOR.mutedNavy,
    charSpacing: 4, margin: 0, valign: "middle",
  });
  slide.addText("DULLES (IAD) — +50%", {
    x: 8.20, y: 3.30, w: 4.5, h: 0.3,
    fontFace: FONT.mono, fontSize: 11, color: COLOR.mutedNavy,
    charSpacing: 4, margin: 0, valign: "middle",
  });

  // Divider under header
  hairline(slide, 0.60, 3.70, SLIDE_W - 1.20, COLOR.hairlineLight);

  // Fee rows — HEF values are ~index 100, IAD shown +50% relative
  const rows = [
    { label: "Landing",          hef: 0.65, iad: 0.98 },
    { label: "Ramp / parking",   hef: 0.48, iad: 0.85 },
    { label: "Fuel (per gal)",   hef: 0.72, iad: 1.05 },
    { label: "Overnight hangar", hef: 0.55, iad: 0.88 },
  ];
  const rowStartY = 3.90, rowH = 0.72;
  const barMaxHef = 4.60;   // max bar width for HEF column
  const barMaxIad = 4.50;   // max bar width for IAD column
  const hefBarX = 3.30, iadBarX = 8.20;
  const barH = 0.28;

  rows.forEach((r, i) => {
    const y = rowStartY + i * rowH;

    // Label
    slide.addText(r.label, {
      x: 0.60, y: y, w: 2.5, h: 0.5,
      fontFace: FONT.serif, fontSize: 16, color: COLOR.inkNavy,
      margin: 0, valign: "middle",
    });

    // Rust bar (HEF)
    slide.addShape(pres.shapes.RECTANGLE, {
      x: hefBarX, y: y + 0.18, w: r.hef * barMaxHef, h: barH,
      fill: { color: COLOR.rust }, line: { type: "none" },
    });

    // Navy bar (IAD)
    slide.addShape(pres.shapes.RECTANGLE, {
      x: iadBarX, y: y + 0.18, w: r.iad * barMaxIad, h: barH,
      fill: { color: COLOR.inkNavy }, line: { type: "none" },
    });

    // Hairline below each row
    hairline(slide, 0.60, y + 0.70, SLIDE_W - 1.20, COLOR.hairlineLight);
  });
}

// ============================================================
// SLIDE 7 — Reliability (headline + 3 big stats)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR.creamAlt };

  addChrome({
    slide, onNavy: false,
    sectionLabel: "07 · RELIABILITY",
    topRight: "THE COST OF A GROUND STOP",
    pageNum: "07 / 10",
    footerRight: "OPERATIONAL RELIABILITY",
  });

  // Headline
  slide.addText("The departure slot you filed is\nthe departure slot you get.", {
    x: 0.60, y: 1.10, w: 10, h: 1.8,
    fontFace: FONT.serif, fontSize: 42, color: COLOR.inkNavy,
    bold: false, margin: 0, valign: "top", lineSpacingMultiple: 1.08,
  });

  // Body copy
  slide.addText(
    "IAD's commercial traffic means general-aviation aircraft wait behind " +
    "airline banks. At HEF, GA is the priority, not the afterthought. Ground " +
    "stops upstream rarely cascade down to our field.",
    {
      x: 0.60, y: 3.10, w: 6.5, h: 1.30,
      fontFace: FONT.body, fontSize: 15, color: COLOR.inkNavy,
      margin: 0, valign: "top", lineSpacingMultiple: 1.45,
    }
  );

  // Three large stats
  const stats = [
    { big: "~0",      unit: "",    color: COLOR.inkNavy, caption: "airline-driven ground stops at HEF last year" },
    { big: "2",       unit: "min", color: COLOR.inkNavy, caption: "typical taxi from FBO to runway hold-short" },
    { big: "↓ 50%",   unit: "",    color: COLOR.rust,    caption: "fewer operations per day vs. IAD, by a wide margin" },
  ];
  const statW = 4.0, statGap = 0.20, statStartX = 0.60;
  const statY = 4.85, ruleY = 5.95, captionY = 6.05;

  stats.forEach((s, i) => {
    const x = statStartX + i * (statW + statGap);

    slide.addText(
      [
        { text: s.big, options: { fontSize: 60, color: s.color } },
        ...(s.unit ? [{ text: s.unit, options: { fontSize: 22, color: COLOR.mutedNavy } }] : []),
      ],
      {
        x, y: statY, w: statW, h: 1.10,
        fontFace: FONT.serif, margin: 0, valign: "top",
      }
    );

    hairline(slide, x, ruleY, statW - 0.2, COLOR.hairlineLight);

    slide.addText(s.caption, {
      x, y: captionY + 0.05, w: statW - 0.2, h: 0.55,
      fontFace: FONT.mono, fontSize: 10, color: COLOR.inkNavy,
      charSpacing: 1, margin: 0, valign: "top", lineSpacingMultiple: 1.3,
    });
  });
}

// ============================================================
// SLIDE 8 — Drive times table
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR.cream };

  addChrome({
    slide, onNavy: false,
    sectionLabel: "08 · ON THE GROUND",
    topRight: "DRIVE TIMES · OFF-PEAK",
    pageNum: "08 / 10",
    footerRight: "ON-THE-GROUND CONVENIENCE",
  });

  // Headline
  slide.addText("One exit off the terminal, onto a\nroad that moves.", {
    x: 0.60, y: 1.10, w: 12.2, h: 2.0,
    fontFace: FONT.serif, fontSize: 42, color: COLOR.inkNavy,
    bold: false, margin: 0, valign: "top", lineSpacingMultiple: 1.08,
  });

  // Table — hairline rows
  const rows = [
    { place: "The White House",         mi: "34 mi", min: "38 min" },
    { place: "The Pentagon",            mi: "28 mi", min: "32 min" },
    { place: "Tysons Corner",           mi: "22 mi", min: "26 min" },
    { place: "Reston / Dulles corridor",mi: "18 mi", min: "22 min" },
  ];
  const tableX = 0.60, tableW = SLIDE_W - 1.20;
  const firstRowY = 3.55, rowH = 0.78;

  // Top rule
  hairline(slide, tableX, firstRowY - 0.05, tableW, COLOR.hairlineLight);

  rows.forEach((r, i) => {
    const y = firstRowY + i * rowH;

    // Place (serif)
    slide.addText(r.place, {
      x: tableX, y: y, w: 7.5, h: rowH - 0.1,
      fontFace: FONT.serif, fontSize: 24, color: COLOR.inkNavy,
      margin: 0, valign: "middle",
    });

    // Miles (rust mono, right-aligned)
    slide.addText(r.mi, {
      x: 8.60, y: y, w: 1.4, h: rowH - 0.1,
      fontFace: FONT.mono, fontSize: 12, color: COLOR.rust,
      charSpacing: 1, align: "right", margin: 0, valign: "middle",
    });

    // Time (serif)
    slide.addText(r.min, {
      x: 10.30, y: y, w: 2.5, h: rowH - 0.1,
      fontFace: FONT.serif, fontSize: 24, color: COLOR.inkNavy,
      margin: 0, valign: "middle",
    });

    // Hairline below
    hairline(slide, tableX, y + rowH - 0.05, tableW, COLOR.hairlineLight);
  });
}

// ============================================================
// SLIDE 9 — Operator profiles (4 columns A/B/C/D)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR.cream };

  addChrome({
    slide, onNavy: false,
    sectionLabel: "09 · WHO FLIES HERE",
    topRight: "OPERATOR PROFILES",
    pageNum: "09 / 10",
    footerRight: "WHO FLIES HERE",
  });

  // Headline
  slide.addText("A working field, not a\nshowpiece.", {
    x: 0.60, y: 1.10, w: 10, h: 2.0,
    fontFace: FONT.serif, fontSize: 46, color: COLOR.inkNavy,
    bold: false, margin: 0, valign: "top", lineSpacingMultiple: 1.08,
  });

  // Four profile columns
  const profiles = [
    { letter: "A", title: "Corporate flight departments", body: "Recurring trips into the District; predictable fee structure matters." },
    { letter: "B", title: "Charter & fractional",         body: "Quick turns, clean ramp, fuel when they ask for it." },
    { letter: "C", title: "Owner-operators",              body: "Based aircraft in the mid-size hangar, month-to-month." },
    { letter: "D", title: "Government & contract",        body: "Proximity to the Pentagon, quieter profile than the Class B fields." },
  ];

  const colW = 2.85, colGap = 0.20, startX = 0.60;
  const letterY = 3.80, ruleY = 4.15, titleY = 4.30, bodyY = 5.40;

  profiles.forEach((p, i) => {
    const x = startX + i * (colW + colGap);

    // Letter in rust
    slide.addText(p.letter, {
      x, y: letterY, w: 1, h: 0.3,
      fontFace: FONT.mono, fontSize: 12, color: COLOR.rust,
      charSpacing: 2, margin: 0, valign: "middle",
    });

    // Rule
    hairline(slide, x, ruleY, colW - 0.2, COLOR.hairlineLight);

    // Serif title
    slide.addText(p.title, {
      x, y: titleY, w: colW - 0.2, h: 1.15,
      fontFace: FONT.serif, fontSize: 20, color: COLOR.inkNavy,
      bold: false, margin: 0, valign: "top", lineSpacingMultiple: 1.15,
    });

    // Body
    slide.addText(p.body, {
      x, y: bodyY, w: colW - 0.2, h: 1.6,
      fontFace: FONT.body, fontSize: 13, color: COLOR.mutedNavy,
      margin: 0, valign: "top", lineSpacingMultiple: 1.4,
    });
  });
}

// ============================================================
// SLIDE 10 — Closing / call to action (dark)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR.navy };

  addChrome({
    slide, onNavy: true,
    sectionLabel: "10 · PLAN YOUR ARRIVAL",
    topRight: "FILE DIRECT · KHEF",
    pageNum: "10 / 10",
    footerRight: "MANASSAS REGIONAL · HEF",
  });

  // Huge serif CTA
  slide.addText("File for HEF. Land thirty\nminutes from the Capitol.", {
    x: 0.60, y: 1.80, w: 12, h: 3.2,
    fontFace: FONT.serif, fontSize: 58, color: COLOR.cream,
    bold: false, margin: 0, valign: "top", lineSpacingMultiple: 1.08,
  });

  // Divider
  hairline(slide, 0.60, 5.55, SLIDE_W - 1.20, COLOR.hairlineDark);

  // Three contact blocks
  const blocks = [
    { label: "OPERATIONS", value: "+1 (703) 555·0166" },
    { label: "FBO",        value: "fbo@manassasairport.com" },
    { label: "UNICOM",     value: "122.95 · Twr 133.1" },
  ];

  const blockW = 4.0, blockGap = 0.15, blockStartX = 0.60;
  blocks.forEach((b, i) => {
    const x = blockStartX + i * (blockW + blockGap);

    slide.addText(b.label, {
      x, y: 5.80, w: blockW, h: 0.3,
      fontFace: FONT.mono, fontSize: 11, color: COLOR.mutedCream,
      charSpacing: 4, margin: 0, valign: "middle",
    });

    slide.addText(b.value, {
      x, y: 6.15, w: blockW, h: 0.5,
      fontFace: FONT.serif, fontSize: 19, color: COLOR.cream,
      margin: 0, valign: "middle",
    });
  });
}

// ---------- Write ----------
pres
  .writeFile({ fileName: "manassas.pptx" })
  .then((fn) => console.log("Wrote:", fn));
