// Cam. — internal deck (replica via pptxgenjs)
// Replicates Mouse.pptx: custom 20x11.25" widescreen, warm off-white palette,
// Arial, horizontal-rule-driven editorial layout.

const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.author = "Cam";
pres.title = "Cam — Internal Deck";

// --- Custom layout: 20" x 11.25" (matches source file's 18288000 x 10287000 EMU) ---
pres.defineLayout({ name: "CAM_CUSTOM", width: 20, height: 11.25 });
pres.layout = "CAM_CUSTOM";

// --- Palette ---
const BG        = "F5F4F0";   // warm off-white
const INK       = "111111";   // primary text / hairlines on slide 8
const MUTED     = "6B6863";   // secondary text
const HAIRLINE  = "DCD9D2";   // subtle rules
const IMG_TINT  = "ECEAE4";   // image-area placeholder tint (slide 4)
const PLACE_TX  = "EFEDE6";   // on-image overlay text
const FAINT_TX  = "A8A59E";   // slide 7 fig label
const PILL_FILL = "F2F0EA";   // slide 7 rounded shape fill

// --- Typography ---
const FONT = "Arial";

// --- Layout constants ---
const MARGIN_L = 1.04;
const MARGIN_R = 1.04;         // => right edge content anchor = 20 - 1.04 = 18.96
const CONTENT_W = 20 - MARGIN_L - MARGIN_R; // 17.92
const HEADER_Y = 0.58;
const FOOTER_Y = 10.38;

// --- Helpers ---------------------------------------------------------------

function addChrome(slide, { section, pageNum, footerLabel, showSectionHeader = true }) {
  // Top-left wordmark "CAM"
  slide.addText("CAM", {
    x: MARGIN_L, y: HEADER_Y, w: 1.5, h: 0.34,
    fontFace: FONT, fontSize: 18, bold: true, color: INK,
    charSpacing: 6, margin: 0,
  });

  // Top-right section tag (e.g. "02 — A NOTE")
  slide.addText(section, {
    x: 12.0, y: HEADER_Y, w: 7.0, h: 0.33,
    fontFace: FONT, fontSize: 18, color: MUTED,
    charSpacing: 2.5, align: "right", margin: 0,
  });

  if (showSectionHeader !== false && section) {
    // (section header below the wordmark is added per-slide where it differs)
  }

  // Bottom-left running footer (slide title)
  if (footerLabel) {
    slide.addText(footerLabel, {
      x: MARGIN_L, y: FOOTER_Y, w: 6, h: 0.33,
      fontFace: FONT, fontSize: 18, color: MUTED,
      charSpacing: 0.75, margin: 0,
    });
  }

  // Bottom-right page number
  if (pageNum) {
    slide.addText(pageNum, {
      x: 18.01, y: FOOTER_Y, w: 1.5, h: 0.33,
      fontFace: FONT, fontSize: 18, color: MUTED,
      charSpacing: 0.75, align: "right", margin: 0,
    });
  }
}

function addEyebrow(slide, text, y = 1.04) {
  // All-caps muted label that lives just below the wordmark, e.g. "THE PROBLEM"
  slide.addText(text, {
    x: MARGIN_L, y, w: CONTENT_W, h: 0.34,
    fontFace: FONT, fontSize: 18, color: MUTED,
    charSpacing: 5, margin: 0,
  });
}

function addDisplayHeadline(slide, text, { y, h, size = 66, w = CONTENT_W }) {
  slide.addText(text, {
    x: MARGIN_L, y, w, h,
    fontFace: FONT, fontSize: size, color: INK,
    charSpacing: -2, margin: 0, valign: "top",
  });
}

function addHairline(slide, { x, y, w, color = HAIRLINE }) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: 0.01,
    fill: { color }, line: { type: "none" },
  });
}

function setBackground(slide) {
  slide.background = { color: BG };
}

// =============================================================================
// SLIDE 1 — Cover
// =============================================================================
{
  const s = pres.addSlide();
  setBackground(s);

  // Header
  s.addText("CAM", {
    x: MARGIN_L, y: HEADER_Y, w: 1.5, h: 0.34,
    fontFace: FONT, fontSize: 18, bold: true, color: INK,
    charSpacing: 6, margin: 0,
  });
  s.addText("INTERNAL · APR 2026", {
    x: 12.0, y: HEADER_Y, w: 7.0, h: 0.33,
    fontFace: FONT, fontSize: 18, color: MUTED,
    charSpacing: 2.5, align: "right", margin: 0,
  });

  // Huge "Cam." wordmark
  s.addText("Cam.", {
    x: MARGIN_L, y: 7.16, w: 15, h: 2.77,
    fontFace: FONT, fontSize: 240, bold: false, color: INK,
    charSpacing: -10, margin: 0, valign: "top",
  });

  // "DECK 01 / 10"
  s.addText("DECK 01 / 10", {
    x: 16.5, y: 9.89, w: 2.54, h: 0.36,
    fontFace: FONT, fontSize: 19.5, color: INK,
    align: "right", margin: 0,
  });
}

// =============================================================================
// SLIDE 2 — A note
// =============================================================================
{
  const s = pres.addSlide();
  setBackground(s);
  addChrome(s, { section: "02 — A NOTE", pageNum: "02 10", footerLabel: "A note to the team" });

  addEyebrow(s, "A NOTE TO THE TEAM", 2.29);

  s.addText("Everything that follows is a first draft. A direction, not a decision.", {
    x: MARGIN_L, y: 3.09, w: 14.81, h: 0.9,
    fontFace: FONT, fontSize: 33, color: INK,
    charSpacing: -0.6, margin: 0, valign: "top",
  });

  s.addText(
    "We're here to build one quiet, unfussy object and do it better than anyone has bothered to in twenty years. " +
    "The work is small in surface area and very large in the details. " +
    "If you want a product where the details matter, you're in the right room.",
    {
      x: MARGIN_L, y: 4.19, w: 14.81, h: 2.2,
      fontFace: FONT, fontSize: 25.5, color: MUTED,
      charSpacing: -0.25, margin: 0, valign: "top",
      paraSpaceAfter: 0,
    },
  );

  s.addText("— THE FOUNDER", {
    x: MARGIN_L, y: 6.62, w: 6, h: 0.36,
    fontFace: FONT, fontSize: 19.5, color: MUTED,
    charSpacing: 0.4, margin: 0,
  });
}

// =============================================================================
// SLIDE 3 — The problem
// =============================================================================
{
  const s = pres.addSlide();
  setBackground(s);
  addChrome(s, { section: "03 — THE PROBLEM", pageNum: "03 10", footerLabel: "The problem with the double-click" });

  addEyebrow(s, "THE PROBLEM", 1.04);

  addDisplayHeadline(
    s,
    "The double-click is the oldest workaround in computing, and nobody has fixed it.",
    { y: 1.64, h: 2.85, size: 66 },
  );

  // Left: huge "1983" — default insets needed so LibreOffice honors normAutofit
  s.addText("1983", {
    x: MARGIN_L, y: 7.33, w: 8.80, h: 2.10,
    fontFace: FONT, fontSize: 165, color: INK,
    charSpacing: -6.5, valign: "top",
  });

  s.addText("YEAR THE CONVENTION WAS SET. IT HAS NOT MOVED SINCE.", {
    x: MARGIN_L, y: 9.58, w: 8.80, h: 0.67,
    fontFace: FONT, fontSize: 19.5, color: MUTED,
    charSpacing: 1.2, margin: 0,
  });

  // Right column, two stats separated by hairlines
  addHairline(s, { x: 10.417, y: 6.904, w: 8.542 });
  addHairline(s, { x: 10.417, y: 9.015, w: 8.542 });

  s.addText("TIMING WINDOW", {
    x: 10.42, y: 7.21, w: 8.28, h: 0.33,
    fontFace: FONT, fontSize: 18, color: MUTED,
    charSpacing: 2.5, margin: 0,
  });
  s.addText("500ms by default, tuned by the OS, invisible to the user.", {
    x: 10.42, y: 7.64, w: 8.28, h: 0.96,
    fontFace: FONT, fontSize: 25.5, color: INK, margin: 0, valign: "top",
  });

  s.addText("FAILURE RATE, OBSERVED", {
    x: 10.42, y: 9.32, w: 8.28, h: 0.33,
    fontFace: FONT, fontSize: 18, color: MUTED,
    charSpacing: 2.5, margin: 0,
  });
  s.addText("1 in 6 double-clicks registers as two single clicks.", {
    x: 10.42, y: 9.75, w: 8.28, h: 0.5,
    fontFace: FONT, fontSize: 25.5, color: INK, margin: 0, valign: "top",
  });
}

// =============================================================================
// SLIDE 4 — Research (image + numbered list)
// =============================================================================
{
  const s = pres.addSlide();
  setBackground(s);
  addChrome(s, { section: "04 — RESEARCH", pageNum: "04 10", footerLabel: "What people actually do" });

  addEyebrow(s, "WHAT PEOPLE ACTUALLY DO", 1.04);
  addDisplayHeadline(s, "We watched four hundred hours of hands at desks.", { y: 1.64, h: 1.91, size: 66 });

  // Image (left). Behind it, a tinted rect acts as a background frame.
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.042, y: 4.089, w: 8.948, h: 6.120,
    fill: { color: IMG_TINT }, line: { type: "none" },
  });
  s.addImage({
    path: path.join(__dirname, "images/research.jpeg"),
    x: 1.042, y: 4.089, w: 8.948, h: 6.120,
    sizing: { type: "cover", w: 8.948, h: 6.120 },
  });
  // Overlay labels on the image
  s.addText("[FIG. 04 — OBSERVATION]", {
    x: 6.57, y: 4.38, w: 3.22, h: 0.33,
    fontFace: FONT, fontSize: 18, color: PLACE_TX, margin: 0,
  });
  s.addText("Field study · 412 hrs · n = 38", {
    x: 1.33, y: 9.67, w: 4.0, h: 0.33,
    fontFace: FONT, fontSize: 18, color: PLACE_TX,
    charSpacing: 0.75, margin: 0,
  });

  // Numbered list on the right with hairlines between rows.
  const rows = [
    { n: "01", t: "They click twice, wait, and click again when nothing happens." },
    { n: "02", t: "They press harder the second time. It doesn't help." },
    { n: "03", t: "The second click lands off-axis from the first." },
    { n: "04", t: "They quietly blame themselves, not the device." },
  ];
  // Hairline Ys from the source XML
  const hairYs = [4.656, 6.116, 7.577, 8.604, 9.631];
  hairYs.forEach((y) => addHairline(s, { x: 10.823, y, w: 8.135 }));

  // Numbered list positions from source
  const listYs = [5.06, 6.52, 7.98, 9.01];
  rows.forEach((row, i) => {
    s.addText(row.n, {
      x: 10.82, y: listYs[i], w: 0.83, h: 0.33,
      fontFace: FONT, fontSize: 18, color: MUTED, margin: 0,
    });
    s.addText(row.t, {
      x: 11.82, y: listYs[i] - 0.10, w: 7.35, h: 0.91,
      fontFace: FONT, fontSize: 24, color: INK, margin: 0, valign: "top",
    });
  });
}

// =============================================================================
// SLIDE 5 — Our answer
// =============================================================================
{
  const s = pres.addSlide();
  setBackground(s);
  addChrome(s, { section: "05 — THE ANSWER", pageNum: "05 10", footerLabel: "Our answer" });

  addEyebrow(s, "OUR ANSWER", 1.88);

  addDisplayHeadline(
    s,
    "A pointing device where the click — single and double — is the best click you have ever used. Everything else on the object exists to support that.",
    { y: 2.76, h: 4.3, size: 66 },
  );

  // Hairline above the three columns
  addHairline(s, { x: MARGIN_L, y: 7.334, w: 17.917 });

  // Three columns across the bottom
  const cols = [
    { x: 1.04,  label: "ONE FOCUS",   body: "The click. Not a feature list." },
    { x: 7.21,  label: "ONE OBJECT",  body: "A single piece of aluminum, one surface." },
    { x: 13.38, label: "ONE PROMISE", body: "Feels inevitable the first time you use it." },
  ];
  cols.forEach((c) => {
    s.addText(c.label, {
      x: c.x, y: 7.72, w: 5.75, h: 0.33,
      fontFace: FONT, fontSize: 18, color: MUTED,
      charSpacing: 2.5, margin: 0,
    });
    s.addText(c.body, {
      x: c.x, y: 8.15, w: 5.75, h: 1.0,
      fontFace: FONT, fontSize: 22.5, color: INK, margin: 0, valign: "top",
    });
  });
}

// =============================================================================
// SLIDE 6 — The click (image + spec pairs)
// =============================================================================
{
  const s = pres.addSlide();
  setBackground(s);
  addChrome(s, { section: "06 — THE CLICK", pageNum: "06 10", footerLabel: "The click" });

  addEyebrow(s, "THE CLICK", 1.04);
  addDisplayHeadline(s, "The double-click, detected by intent.", { y: 1.64, h: 0.98, size: 66 });

  s.addText(
    "A custom low-travel switch paired with a calibrated haptic return. " +
    "The device reads pressure curve, position delta, and cadence — and commits to " +
    "single or double before your hand expects a reply. No timing window to learn. " +
    "No second click to chase.",
    {
      x: MARGIN_L, y: 3.91, w: 8.15, h: 2.91,
      fontFace: FONT, fontSize: 25.5, color: INK,
      charSpacing: -0.25, margin: 0, valign: "top",
    },
  );

  // 2x2 grid of spec labels + values
  const specs = [
    { x: 1.04, y: 7.28, label: "ACTUATION",       value: "38g, linear" },
    { x: 6.02, y: 7.28, label: "HAPTIC RETURN",   value: "2.1ms, voice-coil" },
    { x: 1.04, y: 8.66, label: "INTENT MODEL",    value: "On-device, <1ms" },
    { x: 6.02, y: 8.66, label: "FALSE-DOUBLE RATE", value: "Under 0.3%" },
  ];
  specs.forEach((sp) => {
    s.addText(sp.label, {
      x: sp.x, y: sp.y, w: 4.35, h: 0.33,
      fontFace: FONT, fontSize: 18, color: MUTED,
      charSpacing: 2.5, margin: 0,
    });
    s.addText(sp.value, {
      x: sp.x, y: sp.y + 0.39, w: 4.35, h: 0.45,
      fontFace: FONT, fontSize: 22.5, color: INK, margin: 0, valign: "top",
    });
  });

  // Right-side image
  s.addImage({
    path: path.join(__dirname, "images/switch.jpeg"),
    x: 11.29, y: 3.15, w: 7.67, h: 7.05,
    sizing: { type: "cover", w: 7.67, h: 7.05 },
  });
  s.addText("[FIG. 06 — SWITCH DETAIL]", {
    x: 15.39, y: 3.45, w: 3.37, h: 0.33,
    fontFace: FONT, fontSize: 18, color: PLACE_TX, margin: 0,
  });
  s.addText("Prototype · P-07 · April 2026", {
    x: 11.58, y: 9.67, w: 3.8, h: 0.33,
    fontFace: FONT, fontSize: 18, color: PLACE_TX,
    charSpacing: 0.75, margin: 0,
  });
}

// =============================================================================
// SLIDE 7 — The shape (pill render + spec list)
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: "ECEAE4" };  // slightly warmer tint for this slide
  addChrome(s, { section: "07 — THE SHAPE", pageNum: "07 10", footerLabel: "The shape" });

  // Fig label top-left, lighter than the usual eyebrow
  s.addText("[FIG. 07 — HERO · PLACEHOLDER RENDER]", {
    x: MARGIN_L, y: 1.88, w: 6.0, h: 0.33,
    fontFace: FONT, fontSize: 18, color: FAINT_TX,
    charSpacing: 0.75, margin: 0,
  });

  // The pill shape (placeholder render)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.73, y: 3.96, w: 8.54, h: 3.33,
    fill: { color: PILL_FILL }, line: { type: "none" },
    rectRadius: 1.6,
    shadow: { type: "outer", color: "000000", blur: 30, offset: 10, angle: 135, opacity: 0.08 },
  });

  // Bottom-left eyebrow + headline
  addEyebrow(s, "THE SHAPE", 6.81);
  addDisplayHeadline(s, "One surface. One piece of aluminum. No logo on top.", {
    y: 7.40, h: 2.85, size: 66, w: 9.66,
  });

  // Right-side spec list
  const specs = [
    ["LENGTH", "112 mm"],
    ["WIDTH",  "62 mm"],
    ["HEIGHT", "26 mm"],
    ["MASS",   "94 g"],
    ["SHELL",  "6061-T6, one piece"],
  ];
  specs.forEach(([label, val], i) => {
    s.addText(
      [
        { text: label + "  ", options: { color: MUTED } },
        { text: val, options: { color: INK } },
      ],
      {
        x: 15.73, y: 7.83 + i * 0.475, w: 3.23, h: 0.52,
        fontFace: FONT, fontSize: 18,
        align: "right", margin: 0, valign: "top",
      },
    );
  });
}

// =============================================================================
// SLIDE 8 — Principles (2x2 with top rules)
// =============================================================================
{
  const s = pres.addSlide();
  setBackground(s);
  addChrome(s, { section: "08 — PRINCIPLES", pageNum: "08 10", footerLabel: "Principles" });

  addEyebrow(s, "PRINCIPLES", 1.04);
  addDisplayHeadline(s, "Four rules every decision has to clear.", { y: 1.64, h: 0.98, size: 66 });

  // Top rules above each quadrant, stronger INK hairlines
  addHairline(s, { x: 1.042,  y: 3.320, w: 8.458, color: INK });
  addHairline(s, { x: 10.500, y: 3.320, w: 8.458, color: INK });
  addHairline(s, { x: 1.042,  y: 6.549, w: 8.458, color: INK });
  addHairline(s, { x: 10.500, y: 6.549, w: 8.458, color: INK });

  const quads = [
    { x: 1.04,  y: 3.66, n: "01",
      h: "One object, one purpose.",
      b: "It points, it clicks. No screen, no charger puck, no ecosystem. If a feature needs an app, it doesn't belong." },
    { x: 10.50, y: 3.66, n: "02",
      h: "The hand sets the shape.",
      b: "Symmetric, ambidextrous, invisible under the palm. We fit the median hand and the long tail both." },
    { x: 1.04,  y: 6.89, n: "03",
      h: "Restraint over feature-count.",
      b: "Every buttonless surface is a decision defended. What we leave out is the product." },
    { x: 10.50, y: 6.89, n: "04",
      h: "Built to last ten years.",
      b: "Replaceable cell, replaceable switch, one-piece shell that outlives the electronics inside it." },
  ];
  quads.forEach((q) => {
    s.addText(q.n, {
      x: q.x, y: q.y, w: 8.71, h: 0.33,
      fontFace: FONT, fontSize: 18, color: MUTED,
      charSpacing: 1.1, margin: 0,
    });
    s.addText(q.h, {
      x: q.x, y: q.y + 0.48, w: 8.71, h: 0.55,
      fontFace: FONT, fontSize: 33, color: INK,
      charSpacing: -0.6, margin: 0, valign: "top",
    });
    s.addText(q.b, {
      x: q.x, y: q.y + 1.17, w: 6.65, h: 1.2,
      fontFace: FONT, fontSize: 19.5, color: MUTED, margin: 0, valign: "top",
    });
  });
}

// =============================================================================
// SLIDE 9 — Roadmap (editorial table)
// =============================================================================
{
  const s = pres.addSlide();
  setBackground(s);
  addChrome(s, { section: "09 — ROADMAP", pageNum: "09 10", footerLabel: "Roadmap" });

  addEyebrow(s, "ROADMAP", 1.04);
  addDisplayHeadline(s, "The shape of the year.", { y: 1.64, h: 0.98, size: 66 });

  // Column header labels
  const colX = [1.04, 4.00, 15.17];
  const colW = [2.958, 11.167, 3.791];
  const headers = ["WHEN", "WHAT", "WHO LEADS"];
  headers.forEach((h, i) => {
    s.addText(h, {
      x: colX[i], y: 3.55, w: colW[i], h: 0.34,
      fontFace: FONT, fontSize: 18, color: MUTED,
      charSpacing: 2.5, margin: 0,
    });
  });

  // Top rule under headers (strong INK), subsequent rules HAIRLINE
  const ruleYs = [4.076, 5.279, 6.482, 7.685, 8.888, 10.091];
  ruleYs.forEach((y, idx) => {
    const color = idx === 0 ? INK : HAIRLINE;
    addHairline(s, { x: 1.042,  y, w: 2.958, color });
    addHairline(s, { x: 4.000,  y, w: 11.167, color });
    addHairline(s, { x: 15.167, y, w: 3.791, color });
  });

  const rows = [
    ["Q2 · now",  "Prototype P-08. Switch finalized. Shell in CNC.",        "Hardware · Tactile"],
    ["Q3",         "Tooling begins. Firmware feature-complete.",              "Hardware · Firmware"],
    ["Q4",         "First run. 200 units to team, friends, and ten design studios.", "Ops · Comms"],
    ["Q1 · 2027",  "Reviewer units out. Store goes live.",                    "Comms · Product"],
    ["Q2 · 2027",  "Public launch. First thousand shipped.",                  "Everyone in this room"],
  ];
  const rowYs = [4.46, 5.66, 6.87, 8.07, 9.27];
  rows.forEach((r, i) => {
    s.addText(r[0], {
      x: colX[0], y: rowYs[i], w: colW[0], h: 0.48,
      fontFace: FONT, fontSize: 19.5, color: INK, margin: 0, valign: "top",
    });
    s.addText(r[1], {
      x: colX[1], y: rowYs[i], w: 11.25, h: 0.48,
      fontFace: FONT, fontSize: 25.5, color: INK, margin: 0, valign: "top",
    });
    s.addText(r[2], {
      x: colX[2], y: rowYs[i], w: 3.66, h: 0.48,
      fontFace: FONT, fontSize: 19.5, color: MUTED, margin: 0, valign: "top",
    });
  });
}

// =============================================================================
// SLIDE 10 — Close (full-bleed image w/ overlay text)
// =============================================================================
{
  const s = pres.addSlide();
  setBackground(s);

  // Full-bleed image
  s.addImage({
    path: path.join(__dirname, "images/close.jpeg"),
    x: 0, y: 0, w: 20, h: 11.25,
    sizing: { type: "cover", w: 20, h: 11.25 },
  });

  // Overlay bottom-left eyebrow + display headline, over a light-enough area
  s.addText("WHAT WE'RE BUILDING TOGETHER", {
    x: MARGIN_L, y: 7.74, w: 12.88, h: 0.34,
    fontFace: FONT, fontSize: 18, color: MUTED,
    charSpacing: 5, margin: 0,
  });
  s.addText("One object. Done once. Done properly. That's the whole job.", {
    x: MARGIN_L, y: 8.34, w: 12.88, h: 1.91,
    fontFace: FONT, fontSize: 66, color: INK,
    charSpacing: -2, margin: 0, valign: "top",
  });

  // Bottom-right colophon
  s.addText("CAM · INTERNAL APR 2026\n10 / 10", {
    x: 16.86, y: 9.35, w: 2.5, h: 0.9,
    fontFace: FONT, fontSize: 18, color: MUTED,
    align: "right", margin: 0, valign: "top",
  });
}

// --- Write + post-process ---------------------------------------------------
// pptxgenjs emits a mix of <a:bodyPr ...></a:bodyPr> (with <a:normAutofit/> child)
// and self-closing <a:bodyPr .../> (no autofit) depending on options like
// margin:0. This pass normalises all body properties to include <a:normAutofit/>
// so PowerPoint will shrink oversized text (notably "1983" on slide 3) to fit.

const AdmZip = require("adm-zip");

const outPath = path.join(__dirname, "Mouse.pptx");

pres.writeFile({ fileName: outPath }).then((fn) => {
  const zip = new AdmZip(fn);
  zip.getEntries().forEach((entry) => {
    if (!/^ppt\/slides\/slide\d+\.xml$/.test(entry.entryName)) return;
    let xml = entry.getData().toString("utf8");
    // (a) self-closing <a:bodyPr .../>  →  open/close with <a:normAutofit/>
    xml = xml.replace(
      /<a:bodyPr([^>]*)\/>/g,
      "<a:bodyPr$1><a:normAutofit/></a:bodyPr>",
    );
    // (b) empty <a:bodyPr ...></a:bodyPr>  →  inject <a:normAutofit/>
    xml = xml.replace(
      /<a:bodyPr([^>]*)><\/a:bodyPr>/g,
      "<a:bodyPr$1><a:normAutofit/></a:bodyPr>",
    );
    // (c) replace any <a:spAutoFit/> child with <a:normAutofit/> (shrink-to-fit
    // rather than resize-shape-to-text)
    xml = xml.replace(/<a:spAutoFit\s*\/>/g, "<a:normAutofit/>");
    zip.updateFile(entry.entryName, Buffer.from(xml, "utf8"));
  });
  zip.writeZip(outPath);
  console.log("Wrote:", fn);
});
