// Mindful Readers — pitch deck replica
// Rebuilds the Mindful_Readers.pptx file using pptxgenjs.
// Run with:  node mindful_readers.js
//
// Uses universally-available fonts (Georgia / Calibri / Consolas) so
// the layout holds up on any machine. Swap the F_DISPLAY / F_BODY / F_MONO
// constants below for "Cormorant Garamond" / "Figtree" / "JetBrains Mono"
// if those fonts are installed on the viewing system.
//
// Image handling: source photos are cropped (cover-style) with `sharp`
// to match each target box's aspect ratio before embedding, so images
// never stretch no matter how PowerPoint / LibreOffice renders them.

const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

// ---------- Palette ----------
const CREAM      = "F2EDE3";
const CREAM_ALT  = "EBE4D4";
const DIVIDER    = "D8CFBC";
const INK        = "2A2A24";
const INK_SOFT   = "4A4A40";
const MOSS_DARK  = "5C6B52";
const MOSS_LIGHT = "7E8D6F";
const TERRACOTTA = "B87A5C";
const PAPER      = CREAM;

// ---------- Fonts ----------
const F_DISPLAY = "Georgia";   // serif headline
const F_BODY    = "Calibri";   // sans body
const F_MONO    = "Consolas";  // small-caps / labels

// ---------- Presentation setup ----------
const pres = new pptxgen();
pres.defineLayout({ name: "WIDE_20", width: 20, height: 11.25 });
pres.layout  = "WIDE_20";
pres.author  = "Mindful Readers";
pres.title   = "Mindful Readers — Spring 2026";
pres.company = "Mindful Readers";

const IMG_DIR = path.join(__dirname, "images");
const IMG = (name) => path.join(IMG_DIR, name);

// Crop an image (cover-fit) to match a target box aspect, return base64 data URL.
// Keeps the centre of the image and trims whichever axis is over-wide.
async function coverFitBase64(filename, targetW, targetH) {
  const src = IMG(filename);
  const meta = await sharp(src).metadata();
  const srcRatio = meta.width / meta.height;
  const tgtRatio = targetW / targetH;

  let cropW = meta.width, cropH = meta.height, cropX = 0, cropY = 0;
  if (srcRatio > tgtRatio) {
    // source is wider — trim sides
    cropW = Math.round(meta.height * tgtRatio);
    cropX = Math.round((meta.width - cropW) / 2);
  } else if (srcRatio < tgtRatio) {
    // source is taller — trim top/bottom
    cropH = Math.round(meta.width / tgtRatio);
    cropY = Math.round((meta.height - cropH) / 2);
  }
  const buf = await sharp(src)
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .jpeg({ quality: 88 })
    .toBuffer();
  return "data:image/jpeg;base64," + buf.toString("base64");
}

// ---------- Helpers ----------
function addFooter(slide, pageNum, labelColor = MOSS_DARK) {
  slide.addText("MINDFUL READERS", {
    x: 0.625, y: 10.55, w: 3.5, h: 0.35,
    fontFace: F_MONO, fontSize: 10, color: labelColor,
    charSpacing: 6, margin: 0, valign: "middle",
  });
  slide.addText(String(pageNum).padStart(2, "0"), {
    x: 19.0, y: 10.55, w: 0.5, h: 0.35,
    fontFace: F_MONO, fontSize: 10, color: MOSS_DARK,
    charSpacing: 6, align: "right", margin: 0, valign: "middle",
  });
}

function smallCaps(slide, text, opts) {
  slide.addText(text, {
    fontFace: F_MONO, fontSize: 11, color: MOSS_DARK,
    charSpacing: 8, margin: 0, valign: "middle",
    ...opts,
  });
}

function displayHeading(slide, textOrRuns, opts) {
  slide.addText(textOrRuns, {
    fontFace: F_DISPLAY, fontSize: 54, color: INK,
    margin: 0, valign: "top",
    ...opts,
  });
}

function bodyText(slide, text, opts) {
  slide.addText(text, {
    fontFace: F_BODY, fontSize: 16, color: INK_SOFT,
    margin: 0, paraSpaceAfter: 0, valign: "top",
    lineSpacingMultiple: 1.35,
    ...opts,
  });
}

(async () => {

// ================================================================
// SLIDE 1 — Cover
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: PAPER };

  s.addImage({
    data: await coverFitBase64("image1.jpeg", 9.0, 11.25),
    x: 11.0, y: 0, w: 9.0, h: 11.25,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 11.0, h: 11.25, fill: { color: PAPER }, line: { type: "none" },
  });

  s.addShape(pres.shapes.OVAL, {
    x: 1.042, y: 1.35, w: 0.22, h: 0.22,
    fill: { color: MOSS_LIGHT }, line: { type: "none" },
  });
  smallCaps(s, "MINDFUL READERS · CAPITOL HILL, DC", {
    x: 1.45, y: 1.22, w: 9.0, h: 0.45, fontSize: 12, charSpacing: 6,
  });

  displayHeading(s, [
    { text: "A calmer path to ", options: { color: INK } },
    { text: "reading.",          options: { color: TERRACOTTA, italic: true } },
  ], {
    x: 1.042, y: 2.3, w: 9.4, h: 4.2, fontSize: 88,
  });

  bodyText(s,
    "Private reading tutoring for K–12 students, rooted in the Orton–Gillingham method and the science of a regulated nervous system.",
    { x: 1.042, y: 6.9, w: 8.5, h: 2.0, fontSize: 20 }
  );

  smallCaps(s, "SPRING 2026 / FOR FAMILIES & SCHOOLS", {
    x: 1.042, y: 9.7, w: 9.2, h: 0.4, fontSize: 12, charSpacing: 10,
  });
}

// ================================================================
// SLIDE 2 — 01 / The Landscape
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: PAPER };

  smallCaps(s, "01 / THE LANDSCAPE", {
    x: 1.042, y: 2.0, w: 9.0, h: 0.4, fontSize: 12, charSpacing: 12,
  });

  displayHeading(s,
    "Reading is the single strongest predictor of school success — and one in three DC students is behind.",
    { x: 1.042, y: 2.7, w: 8.8, h: 5.0, fontSize: 42 }
  );

  bodyText(s,
    "The gap rarely closes on its own. Children who struggle in third grade are four times more likely to leave high school without a diploma.",
    { x: 1.042, y: 7.85, w: 8.5, h: 1.6, fontSize: 17 }
  );

  const cards = [
    { y: 1.042, big: "1 in 3",    bigColor: MOSS_DARK,  label: "DC elementary students reading below grade level" },
    { y: 4.194, big: "15–20%",    bigColor: MOSS_DARK,  label: "of students show signs of dyslexia" },
    { y: 7.347, big: "4×",        bigColor: TERRACOTTA, label: "more likely to not graduate if behind by third grade" },
  ];
  cards.forEach(c => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 10.417, y: c.y, w: 8.542, h: 2.861,
      fill: { color: CREAM_ALT }, line: { type: "none" },
    });
    s.addText(c.big, {
      x: 10.917, y: c.y + 0.55, w: 7.768, h: 1.3,
      fontFace: F_DISPLAY, fontSize: 60, color: c.bigColor,
      margin: 0, valign: "middle",
    });
    bodyText(s, c.label, {
      x: 10.917, y: c.y + 1.95, w: 7.768, h: 0.6, fontSize: 15,
    });
  });

  addFooter(s, 2);
}

// ================================================================
// SLIDE 3 — 02 / The Problem
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: PAPER };

  smallCaps(s, "02 / THE PROBLEM", {
    x: 1.042, y: 1.042, w: 15.0, h: 0.4, fontSize: 12, charSpacing: 12,
  });

  displayHeading(s, "A dysregulated brain cannot decode.", {
    x: 1.042, y: 1.7, w: 16.0, h: 1.2, fontSize: 56,
  });

  bodyText(s,
    "Reading requires the prefrontal cortex to be online — attention, working memory, pattern recognition. When a child is anxious, restless, or shut down, those circuits go quiet.",
    { x: 1.042, y: 3.1, w: 12.0, h: 1.8, fontSize: 18 }
  );

  const symptoms = [
    { x: 1.042,  quote: "\u201CI hate reading.\u201D",         body: "A protective shutdown after years of struggling through the same letters." },
    { x: 7.181,  quote: "\u201CI can\u2019t sit still.\u201D", body: "Unresolved energy in the body blocks the focus reading demands." },
    { x: 13.319, quote: "\u201CI already did it.\u201D",       body: "A stressed brain cannot hold information from one week to the next." },
  ];
  symptoms.forEach(sy => {
    smallCaps(s, "SYMPTOM", { x: sy.x, y: 5.2, w: 5.808, h: 0.35, fontSize: 11 });
    s.addText(sy.quote, {
      x: sy.x, y: 5.65, w: 5.808, h: 0.8,
      fontFace: F_DISPLAY, fontSize: 30, color: INK, italic: true,
      margin: 0, valign: "top",
    });
    bodyText(s, sy.body, { x: sy.x, y: 6.55, w: 5.808, h: 1.2, fontSize: 15 });
  });

  addFooter(s, 3);
}

// ================================================================
// SLIDE 4 — Body first. / Mind next. (two-panel)
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: PAPER };

  // LEFT panel — moss green
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10.0, h: 11.25, fill: { color: MOSS_DARK }, line: { type: "none" },
  });
  smallCaps(s, "PART ONE", {
    x: 0.833, y: 1.042, w: 8.583, h: 0.4, fontSize: 12, color: PAPER, charSpacing: 12,
  });
  s.addText("Body first.", {
    x: 0.833, y: 3.8, w: 8.583, h: 1.5,
    fontFace: F_DISPLAY, fontSize: 72, color: PAPER, italic: true,
    margin: 0, valign: "top",
  });
  bodyText(s,
    "Ten to fifteen minutes of guided breath and movement to bring the nervous system into a focused, learning-ready state.",
    { x: 0.833, y: 5.5, w: 6.5, h: 2.2, fontSize: 18, color: PAPER }
  );
  smallCaps(s, "YOGA · BREATH · REGULATION", {
    x: 0.833, y: 9.88, w: 9.0, h: 0.4, fontSize: 11, color: PAPER, charSpacing: 8,
  });

  // RIGHT panel — cream alt
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.0, y: 0, w: 10.0, h: 11.25, fill: { color: CREAM_ALT }, line: { type: "none" },
  });
  smallCaps(s, "PART TWO", {
    x: 10.833, y: 1.042, w: 8.583, h: 0.4, fontSize: 12, color: MOSS_DARK, charSpacing: 12,
  });
  s.addText("Mind next.", {
    x: 10.833, y: 3.6, w: 8.583, h: 1.5,
    fontFace: F_DISPLAY, fontSize: 72, color: TERRACOTTA, italic: true,
    margin: 0, valign: "top",
  });
  bodyText(s,
    "Forty-five minutes of structured, multisensory literacy work using the Orton–Gillingham method — the gold standard for children with dyslexia.",
    { x: 10.833, y: 5.3, w: 6.5, h: 2.6, fontSize: 18 }
  );
  smallCaps(s, "ORTON–GILLINGHAM · STRUCTURED LITERACY", {
    x: 10.833, y: 9.88, w: 9.0, h: 0.4, fontSize: 11, color: MOSS_DARK, charSpacing: 8,
  });
}

// ================================================================
// SLIDE 5 — 03 / The Method (4 numbered rows)
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: PAPER };

  smallCaps(s, "03 / THE METHOD", {
    x: 1.042, y: 2.9, w: 8.0, h: 0.4, fontSize: 12, charSpacing: 12,
  });
  displayHeading(s, "Orton–Gillingham: the gold standard for teaching reading.", {
    x: 1.042, y: 3.6, w: 8.0, h: 2.8, fontSize: 40,
  });
  bodyText(s,
    "Developed in the 1930s and endorsed by the International Dyslexia Association, OG is the approach most research-backed for students who struggle with decoding — and it works for typical readers, too.",
    { x: 1.042, y: 6.5, w: 8.0, h: 2.5, fontSize: 15 }
  );

  const rows = [
    { n: "01", y: 2.2, title: "Multisensory",             body: "Seeing, saying, hearing, and tracing letters at the same time — engaging multiple pathways to the brain." },
    { n: "02", y: 4.1, title: "Sequential & Cumulative",  body: "Each new concept builds on the last. Nothing is skipped, and gaps are filled before moving on." },
    { n: "03", y: 6.0, title: "Diagnostic",               body: "Every lesson is shaped by what the child did the day before — never a scripted program." },
    { n: "04", y: 7.9, title: "Explicit",                 body: "Rules of English are taught, not guessed. Students learn why a word is spelled the way it is." },
  ];
  [3.9, 5.8, 7.7].forEach(y => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 9.677, y: y, w: 9.281, h: 0.01, fill: { color: DIVIDER }, line: { type: "none" },
    });
  });
  rows.forEach(r => {
    s.addText(r.n, {
      x: 9.677, y: r.y, w: 1.958, h: 0.8,
      fontFace: F_DISPLAY, fontSize: 40, color: MOSS_DARK, italic: true,
      margin: 0, valign: "middle",
    });
    s.addText(r.title, {
      x: 11.969, y: r.y, w: 7.199, h: 0.55,
      fontFace: F_BODY, fontSize: 20, bold: true, color: INK, margin: 0, valign: "middle",
    });
    bodyText(s, r.body, { x: 11.969, y: r.y + 0.6, w: 7.199, h: 1.1, fontSize: 14 });
  });

  addFooter(s, 5);
}

// ================================================================
// SLIDE 6 — 04 / The Yoga Half (left image + right text grid)
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: PAPER };

  s.addImage({
    data: await coverFitBase64("image2.jpeg", 8.5, 11.25),
    x: 0, y: 0, w: 8.5, h: 11.25,
  });

  smallCaps(s, "04 / THE YOGA HALF", {
    x: 9.438, y: 1.9, w: 10.0, h: 0.4, fontSize: 12, charSpacing: 12,
  });
  displayHeading(s, "Ten minutes of breath changes the next fifty.", {
    x: 9.438, y: 2.5, w: 10.0, h: 1.8, fontSize: 40,
  });
  bodyText(s,
    "Every session opens with a short, age-appropriate yoga and breathing practice. The science is straightforward: when the vagus nerve is toned and the body feels safe, the learning brain comes online.",
    { x: 9.438, y: 4.5, w: 8.5, h: 1.9, fontSize: 16 }
  );

  const grid = [
    { x: 9.438, y: 6.7, label: "BREATH",    value: "Four-count inhale, six-count exhale" },
    { x: 14.5,  y: 6.7, label: "MOVEMENT",  value: "Cross-lateral poses that activate both hemispheres" },
    { x: 9.438, y: 8.2, label: "FOCUS",     value: "Drishti — a single gaze point to anchor attention" },
    { x: 14.5,  y: 8.2, label: "TRANSITION",value: "A seated pause before opening the first book" },
  ];
  grid.forEach(g => {
    smallCaps(s, g.label, { x: g.x, y: g.y, w: 4.699, h: 0.3, fontSize: 10 });
    s.addText(g.value, {
      x: g.x, y: g.y + 0.35, w: 4.699, h: 1.0,
      fontFace: F_BODY, fontSize: 15, color: INK, margin: 0, valign: "top",
    });
  });

  addFooter(s, 6, PAPER); // brand label in cream since it sits over the image
}

// ================================================================
// SLIDE 7 — 05 / Inside the Hour (5-column timeline)
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: PAPER };

  smallCaps(s, "05 / INSIDE THE HOUR", {
    x: 1.042, y: 1.042, w: 18.454, h: 0.4, fontSize: 12, charSpacing: 12,
  });
  displayHeading(s, "A typical sixty-minute session.", {
    x: 1.042, y: 1.7, w: 18.454, h: 1.2, fontSize: 52,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.042, y: 3.3, w: 17.917, h: 0.04, fill: { color: DIVIDER }, line: { type: "none" },
  });

  const cols = [
    { x: 1.042,  time: "0–10 MIN",  timeColor: MOSS_DARK,  title: "Arrive & breathe", body: "Shoes off. A short breath practice and a few grounding poses." },
    { x: 4.692,  time: "10–20 MIN", timeColor: MOSS_DARK,  title: "Warm-up & review", body: "Sound cards, previously taught patterns, quick wins to build confidence." },
    { x: 8.342,  time: "20–40 MIN", timeColor: TERRACOTTA, title: "New concept",      body: "Direct, multisensory instruction of one new phoneme, rule, or pattern." },
    { x: 11.992, time: "40–55 MIN", timeColor: TERRACOTTA, title: "Apply in text",    body: "Decodable reading, writing, and spelling using the day's pattern." },
    { x: 15.642, time: "55–60 MIN", timeColor: MOSS_DARK,  title: "Close & reflect",  body: "One proud sentence. A final slow breath. Home." },
  ];
  cols.forEach(c => {
    smallCaps(s, c.time, { x: c.x, y: 3.5, w: 3.416, h: 0.35, fontSize: 11, color: c.timeColor });
    s.addText(c.title, {
      x: c.x, y: 3.95, w: 3.416, h: 0.55,
      fontFace: F_BODY, fontSize: 20, bold: true, color: INK, margin: 0, valign: "middle",
    });
    bodyText(s, c.body, { x: c.x, y: 4.6, w: 3.416, h: 2.0, fontSize: 14 });
  });

  addFooter(s, 7);
}

// ================================================================
// SLIDE 8 — 06 / Who We Serve (4 grade bands)
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: PAPER };

  smallCaps(s, "06 / WHO WE SERVE", {
    x: 1.042, y: 3.3, w: 9.0, h: 0.4, fontSize: 12, charSpacing: 12,
  });
  displayHeading(s, "Every reader learns differently.", {
    x: 1.042, y: 4.0, w: 9.0, h: 2.0, fontSize: 46,
  });
  bodyText(s,
    "We work with students across the K–12 range, from children whose schools flagged them for early intervention to high-schoolers who slipped through and are quietly behind.",
    { x: 1.042, y: 6.2, w: 8.0, h: 2.5, fontSize: 16 }
  );

  const bands = [
    { y: 2.4,  tag: "K–2",  title: "Early readers building the foundation", body: "Letter sounds, blending, the first hundred words." },
    { y: 3.95, tag: "3–5",  title: "Students identified with dyslexia",     body: "Children who need structured, explicit decoding — not more practice." },
    { y: 5.82, tag: "6–8",  title: "Anxious or reluctant readers",          body: "Avoidance, meltdowns, \u201CI\u2019m just not a reader.\u201D The yoga half meets them here." },
    { y: 7.7,  tag: "9–12", title: "High-schoolers closing gaps",            body: "Discreet, respectful work on the skills no one ever taught them explicitly." },
  ];
  [3.45, 5.32, 7.2].forEach(y => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 10.417, y: y, w: 8.542, h: 0.01, fill: { color: DIVIDER }, line: { type: "none" },
    });
  });
  bands.forEach(b => {
    s.addText(b.tag, {
      x: 10.417, y: b.y + 0.05, w: 1.4, h: 0.4,
      fontFace: F_MONO, fontSize: 13, color: MOSS_LIGHT,
      charSpacing: 8, margin: 0, valign: "middle",
    });
    s.addText(b.title, {
      x: 12.0, y: b.y, w: 7.0, h: 0.5,
      fontFace: F_BODY, fontSize: 18, bold: true, color: INK, margin: 0, valign: "middle",
    });
    bodyText(s, b.body, { x: 12.0, y: b.y + 0.5, w: 7.0, h: 1.0, fontSize: 13.5 });
  });

  addFooter(s, 8);
}

// ================================================================
// SLIDE 9 — 07 / Meet Your Tutor (left image + right text)
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: PAPER };

  s.addImage({
    data: await coverFitBase64("image3.jpeg", 10.0, 11.25),
    x: 0, y: 0, w: 10.0, h: 11.25,
  });
  smallCaps(s, "TUTOR · LEAD INSTRUCTOR", {
    x: 0.625, y: 10.32, w: 4.5, h: 0.35, fontSize: 10, color: PAPER, charSpacing: 10,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.0, y: 0, w: 10.0, h: 11.25, fill: { color: PAPER }, line: { type: "none" },
  });
  smallCaps(s, "07 / MEET YOUR TUTOR", {
    x: 10.938, y: 1.0, w: 8.369, h: 0.4, fontSize: 12, charSpacing: 12,
  });
  displayHeading(s, [
    { text: "Twenty years on the mat and in the ", options: { color: INK } },
    { text: "margins.",                              options: { color: TERRACOTTA, italic: true } },
  ], {
    x: 10.938, y: 1.7, w: 8.369, h: 3.2, fontSize: 48,
  });
  bodyText(s,
    "Mindful Readers is led by a teacher with two decades of classroom experience, a master's in special education, and a parallel practice as a certified yoga instructor. The two trainings converged the moment she watched a student's reading unlock after a single session of breath work.",
    { x: 10.938, y: 5.0, w: 8.0, h: 3.2, fontSize: 15 }
  );

  const creds = [
    { x: 10.938, y: 8.414, label: "EDUCATION",     value: "M.Ed., Special Education" },
    { x: 15.208, y: 8.414, label: "CERTIFICATION", value: "OG Associate Level" },
    { x: 10.938, y: 9.433, label: "YOGA",          value: "RYT-200, Kids' Yoga" },
    { x: 15.208, y: 9.433, label: "EXPERIENCE",    value: "20 years in the classroom" },
  ];
  creds.forEach(c => {
    smallCaps(s, c.label, { x: c.x, y: c.y, w: 4.0, h: 0.3, fontSize: 10 });
    s.addText(c.value, {
      x: c.x, y: c.y + 0.35, w: 4.0, h: 0.5,
      fontFace: F_BODY, fontSize: 15, color: INK, margin: 0, valign: "middle",
    });
  });
}

// ================================================================
// SLIDE 10 — 08 / Services (two cards)
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: PAPER };

  smallCaps(s, "08 / SERVICES", {
    x: 1.042, y: 1.042, w: 18.454, h: 0.4, fontSize: 12, charSpacing: 12,
  });
  displayHeading(s, "Two ways to work together.", {
    x: 1.042, y: 1.7, w: 18.454, h: 1.2, fontSize: 52,
  });

  // CARD 1 — cream
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.042, y: 3.181, w: 8.708, h: 7.027,
    fill: { color: CREAM_ALT }, line: { type: "none" },
  });
  smallCaps(s, "OFFERING 01",  { x: 1.708, y: 3.9, w: 7.596, h: 0.35, fontSize: 11 });
  s.addText("One-on-one tutoring", {
    x: 1.708, y: 4.4, w: 7.596, h: 0.8,
    fontFace: F_DISPLAY, fontSize: 36, color: INK, margin: 0, valign: "top",
  });
  bodyText(s,
    "Private, sixty-minute sessions combining yoga and Orton–Gillingham instruction. Tailored to your child's diagnostic profile and rebuilt every week based on progress.",
    { x: 1.708, y: 5.4, w: 7.596, h: 2.5, fontSize: 14 }
  );
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.708, y: 8.42, w: 7.375, h: 0.01, fill: { color: DIVIDER }, line: { type: "none" },
  });
  smallCaps(s, "FORMAT",   { x: 1.708, y: 8.72, w: 3.0, h: 0.3, fontSize: 10 });
  s.addText("60 min · 1–3× per week", {
    x: 1.708, y: 9.05, w: 3.0, h: 0.5,
    fontFace: F_BODY, fontSize: 13, color: INK, margin: 0, valign: "middle",
  });
  smallCaps(s, "LOCATION", { x: 5.3, y: 8.72, w: 4.0, h: 0.3, fontSize: 10 });
  s.addText("Eastern Market studio or in-home", {
    x: 5.3, y: 9.05, w: 4.0, h: 0.5,
    fontFace: F_BODY, fontSize: 13, color: INK, margin: 0, valign: "middle",
  });

  // CARD 2 — moss
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.25, y: 3.181, w: 8.708, h: 7.027,
    fill: { color: MOSS_DARK }, line: { type: "none" },
  });
  smallCaps(s, "OFFERING 02", { x: 10.917, y: 3.9, w: 7.596, h: 0.35, fontSize: 11, color: PAPER });
  s.addText("Group yoga & literacy", {
    x: 10.917, y: 4.4, w: 7.596, h: 0.8,
    fontFace: F_DISPLAY, fontSize: 36, color: PAPER, margin: 0, valign: "top",
  });
  bodyText(s,
    "Small-group classes (four students max) pairing kid-friendly yoga with shared literacy games. Great for siblings, classmates, or reluctant readers who thrive with peers.",
    { x: 10.917, y: 5.4, w: 7.596, h: 2.5, fontSize: 14, color: PAPER }
  );
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.917, y: 8.42, w: 7.375, h: 0.01, fill: { color: PAPER }, line: { type: "none" },
  });
  smallCaps(s, "FORMAT",   { x: 10.917, y: 8.72, w: 3.0, h: 0.3, fontSize: 10, color: PAPER });
  s.addText("75 min · weekly · max 4", {
    x: 10.917, y: 9.05, w: 3.0, h: 0.5,
    fontFace: F_BODY, fontSize: 13, color: PAPER, margin: 0, valign: "middle",
  });
  smallCaps(s, "LOCATION", { x: 15.5, y: 8.72, w: 3.0, h: 0.3, fontSize: 10, color: PAPER });
  s.addText("Eastern Market studio", {
    x: 15.5, y: 9.05, w: 3.0, h: 0.5,
    fontFace: F_BODY, fontSize: 13, color: PAPER, margin: 0, valign: "middle",
  });

  addFooter(s, 10);
}

// ================================================================
// SLIDE 11 — 09 / From a Parent (big pull quote)
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: PAPER };

  smallCaps(s, "09 / FROM A PARENT", {
    x: 1.667, y: 2.3, w: 17.0, h: 0.4, fontSize: 12, charSpacing: 12,
  });

  s.addText(
    "\u201C Our son went from hiding books under the couch to reading his little sister bedtime stories. It took ten weeks. \u201D",
    {
      x: 1.667, y: 3.1, w: 16.5, h: 5.2,
      fontFace: F_DISPLAY, fontSize: 54, color: TERRACOTTA, italic: false,
      margin: 0, valign: "top",
    }
  );

  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.667, y: 8.75, w: 0.583, h: 0.02, fill: { color: INK_SOFT }, line: { type: "none" },
  });
  s.addText("M. & J. · PARENTS · LINCOLN PARK", {
    x: 2.458, y: 8.58, w: 9.0, h: 0.4,
    fontFace: F_MONO, fontSize: 10, color: INK_SOFT, charSpacing: 8,
    margin: 0, valign: "middle",
  });

  addFooter(s, 11);
}

// ================================================================
// SLIDE 12 — The Next Step (contact / close)
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: PAPER };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 11.5, h: 11.25, fill: { color: PAPER }, line: { type: "none" },
  });

  s.addShape(pres.shapes.OVAL, {
    x: 1.042, y: 0.9, w: 0.22, h: 0.22,
    fill: { color: MOSS_LIGHT }, line: { type: "none" },
  });
  smallCaps(s, "MINDFUL READERS", {
    x: 1.45, y: 0.83, w: 5.0, h: 0.4, fontSize: 13, charSpacing: 10,
  });

  smallCaps(s, "THE NEXT STEP", {
    x: 1.042, y: 1.8, w: 9.7, h: 0.4, fontSize: 12, color: TERRACOTTA, charSpacing: 12,
  });

  displayHeading(s, [
    { text: "A free 20-minute ", options: { color: INK } },
    { text: "consultation.",     options: { color: TERRACOTTA, italic: true } },
  ], {
    x: 1.042, y: 2.5, w: 10.0, h: 4.0, fontSize: 68,
  });

  bodyText(s,
    "A no-pressure phone call to talk about your child, answer your questions, and decide together whether we're a fit.",
    { x: 1.042, y: 6.8, w: 8.0, h: 1.5, fontSize: 17 }
  );

  const contacts = [
    { x: 1.042, y: 8.05, label: "EMAIL",       value: "hello@mindfulreaders.co" },
    { x: 5.938, y: 8.05, label: "PHONE",       value: "(202) 555–0147" },
    { x: 1.042, y: 9.25, label: "STUDIO",      value: "412 8th Street SE Washington, DC 20003" },
    { x: 5.938, y: 9.25, label: "BOOK ONLINE", value: "mindfulreaders.co/book" },
  ];
  contacts.forEach(c => {
    smallCaps(s, c.label, { x: c.x, y: c.y, w: 4.656, h: 0.3, fontSize: 10 });
    s.addText(c.value, {
      x: c.x, y: c.y + 0.35, w: 4.656, h: 0.8,
      fontFace: F_BODY, fontSize: 15, color: INK, margin: 0, valign: "top",
    });
  });

  s.addImage({
    data: await coverFitBase64("image4.jpeg", 8.5, 11.25),
    x: 11.5, y: 0, w: 8.5, h: 11.25,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 11.5, y: 9.8, w: 8.5, h: 1.45,
    fill: { color: INK, transparency: 65 }, line: { type: "none" },
  });
  s.addText("On the Hill, for the Hill.", {
    x: 12.0, y: 10.15, w: 7.8, h: 0.6,
    fontFace: F_DISPLAY, fontSize: 26, color: PAPER, italic: true,
    margin: 0, valign: "middle",
  });
}

// ---------- Save ----------
const fn = await pres.writeFile({ fileName: "Mindful_Readers.pptx" });
console.log("Wrote: " + fn);

})().catch(err => { console.error(err); process.exit(1); });
