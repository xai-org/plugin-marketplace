/**
 * TB Testing and Treatment - Clinic Training Deck
 * Faithful recreation of the provided PPTX via pptxgenjs.
 *
 * Usage:
 *   npm install pptxgenjs
 *   node deck.js
 *
 * Expects an `assets/` folder next to this file containing image1.png ... image22.png
 * (extracted from the original PPTX's ppt/media/ folder).
 */

const pptxgen = require("pptxgenjs");
const path = require("path");

const ASSETS = path.join(__dirname, "assets");
const asset = (name) => path.join(ASSETS, name);

// ---------- Palette ----------
const BG         = "0F172A"; // slide background (deep navy)
const TEXT       = "F1F5F9"; // primary light text
const MUTED      = "94A3B8"; // footer/source text
const SUBTLE     = "CBD5E1"; // secondary body text
const AMBER      = "F59E0B"; // primary accent
const BLUE       = "3B82F6"; // secondary accent
const BLUE_LIGHT = "60A5FA"; // circle stroke
const CYAN       = "22D3EE"; // negative-result accent
const RED        = "EF4444"; // active TB accent
const CARD       = "1E293B"; // card/roundRect fill
const DIVIDER    = "334155"; // faint dashed divider
const SLATE_DARK = "1E293B";

const FONT_HEAD = "Georgia";
const FONT_BODY = "Garamond";

// ---------- Presentation ----------
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10" x 5.625"
pres.title  = "TB Testing and Treatment";
pres.author = "Clinic Training";

// Helper: consistent footer (title + page number) on content slides
function addFooter(slide, pageNum) {
  slide.addText("TB Testing & Treatment", {
    x: 0.6, y: 5.3, w: 6.0, h: 0.3,
    fontFace: FONT_BODY, fontSize: 10, color: MUTED, margin: 0
  });
  slide.addText(String(pageNum), {
    x: 9.0, y: 5.3, w: 0.6, h: 0.3,
    fontFace: FONT_BODY, fontSize: 10, color: MUTED, align: "right", margin: 0
  });
}

// Helper: standard slide background
function addBg(slide) {
  slide.background = { color: BG };
}

// ---------- Slide 1 — Title ----------
{
  const s = pres.addSlide();
  addBg(s);
  s.addText(
    [
      { text: "Screening for Tomorrow", options: { breakLine: true } },
      { text: "Treating for Today" }
    ],
    { x: 0.6, y: 1.35, w: 9.0, h: 1.5,
      fontFace: FONT_HEAD, fontSize: 42, bold: true, color: TEXT, margin: 0 }
  );
  s.addText("TB Testing and Treatment", {
    x: 0.6, y: 2.953, w: 8.8, h: 0.5,
    fontFace: FONT_HEAD, fontSize: 32, bold: true, color: TEXT, margin: 0
  });
  s.addText(
    [
      { text: "Clinic Training · Residents and Nurses", options: { breakLine: true } },
      { text: "San Francisco, California · April 9, 2026" }
    ],
    { x: 0.6, y: 3.609, w: 8.8, h: 0.8,
      fontFace: FONT_BODY, fontSize: 20, bold: true, color: TEXT, margin: 0 }
  );
  s.addText("1", {
    x: 9.0, y: 5.3, w: 0.6, h: 0.3,
    fontFace: FONT_BODY, fontSize: 10, color: MUTED, align: "right", margin: 0
  });
}

// ---------- Slide 2 — Seven Linked Clinical Skills ----------
{
  const s = pres.addSlide();
  addBg(s);

  // Title with "Seven" in accent
  s.addText(
    [
      { text: "Seven", options: { color: TEXT } },
      { text: " Linked Clinical Skills in TB Testing", options: { color: TEXT } }
    ],
    { x: 0.6, y: 0.326, w: 8.8, h: 0.5,
      fontFace: FONT_HEAD, fontSize: 22, bold: true, margin: 0 }
  );

  // Background illustration (stylized apple/lung graphic)
  s.addImage({ path: asset("image8.png"), x: 4.4, y: 0.3, w: 5.0, h: 4.2 });

  // Seven category rows: icon + label
  const items = [
    { img: "image1.png",  label: "Epidemiology" },
    { img: "image2.png",  label: "Patient Profiles" },
    { img: "image3.png",  label: "PPD Flowcharts" },
    { img: "image4.png",  label: "PPD and QuantiFERON" },
    { img: "image5.png",  label: "CXR Findings" },
    { img: "image6.png",  label: "Patient Cases" },
    { img: "image7.png",  label: "References" }
  ];
  items.forEach((it, i) => {
    const y = 1.5 + i * 0.5;
    s.addImage({ path: asset(it.img), x: 0.6, y: y + 0.05, w: 0.28, h: 0.28 });
    s.addText(it.label, {
      x: 1.1, y: y, w: 4.0, h: 0.4,
      fontFace: FONT_HEAD, fontSize: 18, bold: true, color: TEXT,
      valign: "middle", margin: 0
    });
  });

  // Big "1 in 4" callout
  s.addText("1 in 4", {
    x: 4.9, y: 4.012, w: 4.0, h: 0.55,
    fontFace: FONT_HEAD, fontSize: 36, bold: true, color: AMBER,
    align: "center", margin: 0
  });
  s.addText(
    [
      { text: "people globally infected", options: { breakLine: true } },
      { text: "with TB bacteria" }
    ],
    { x: 4.9, y: 4.562, w: 4.0, h: 0.55,
      fontFace: FONT_BODY, fontSize: 16, bold: true, color: TEXT,
      align: "center", margin: 0 }
  );

  addFooter(s, 2);
}

// ---------- Helper: slides 3 & 4 are effectively single-image content slides ----------
function addMapSlide(opts) {
  const s = pres.addSlide();
  addBg(s);
  s.addText(opts.title, {
    x: 0.6, y: 0.326, w: 8.8, h: 0.5,
    fontFace: FONT_HEAD, fontSize: 22, bold: true, color: TEXT, margin: 0
  });
  s.addText(opts.sub, {
    x: 0.6, y: 0.85, w: 4.0, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 18, bold: true, color: TEXT, margin: 0
  });
  s.addImage({ path: asset(opts.img), x: opts.imgX, y: 1.2, w: opts.imgW, h: opts.imgH });
  s.addText(opts.source, {
    x: 0.6, y: 4.9, w: 5.0, h: 0.25,
    fontFace: FONT_BODY, fontSize: 10, italic: true, color: MUTED, margin: 0
  });
  addFooter(s, opts.page);
  return s;
}

// ---------- Slide 3 — US map ----------
addMapSlide({
  title: "US TB Cases Surged to a Record High in 2024",
  sub: "United States · 2024",
  img: "image9.png", imgX: 0.84, imgW: 8.327, imgH: 3.65,
  source: "Source: CDC TB Surveillance Report, 2024",
  page: 3
});

// ---------- Slide 4 — California map ----------
addMapSlide({
  title: "San Francisco Faces a Disproportionate TB Burden",
  sub: "San Francisco · 2024",
  img: "image10.png", imgX: 1.889, imgW: 6.222, imgH: 3.5,
  source: "Source: SF DPH TB Report, 2024",
  page: 4
});

// ---------- Slide 5 — Three patient profiles ----------
{
  const s = pres.addSlide();
  addBg(s);
  s.addText("BCG and Symptom Status Drive the Testing Pathway", {
    x: 0.6, y: 0.3, w: 8.8, h: 0.6,
    fontFace: FONT_HEAD, fontSize: 22, bold: true, color: TEXT, margin: 0
  });

  const profiles = [
    { barX: 0.6,  colX: 0.82, barColor: BLUE,  tag: "BCG Only",  tagColor: BLUE,
      name: "Maria Santos",   mrn: "MRN SF-4471",
      lines: ["Philippines · BCG+", "Asymptomatic", "Routine PPD"] },
    { barX: 3.6,  colX: 3.82, barColor: AMBER, tag: "Latent TB", tagColor: AMBER,
      name: "David Nguyen",   mrn: "MRN SF-4472",
      lines: ["Vietnam · No BCG", "IGRA+ 6 mo ago", "No treatment"] },
    { barX: 6.6,  colX: 6.82, barColor: RED,   tag: "Active TB", tagColor: RED,
      name: "James Okonkwo",  mrn: "MRN SF-4473",
      lines: ["Nigeria · BCG+", "3-wk cough", "Night sweats"] }
  ];
  profiles.forEach(p => {
    // Vertical accent bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: p.barX, y: 1.63, w: 0.05, h: 2.818,
      fill: { color: p.barColor }, line: { color: p.barColor }
    });
    // Category tag
    s.addText(p.tag, {
      x: p.colX, y: 1.63, w: 2.0, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 18, bold: true, color: p.tagColor, margin: 0
    });
    // Name
    s.addText(p.name, {
      x: p.colX, y: 1.98, w: 2.8, h: 0.4,
      fontFace: FONT_HEAD, fontSize: 20, bold: true, color: TEXT, margin: 0
    });
    // MRN
    s.addText(p.mrn, {
      x: p.colX, y: 2.43, w: 2.7, h: 0.25,
      fontFace: FONT_BODY, fontSize: 18, color: TEXT, margin: 0
    });
    // Detail lines
    s.addText(
      p.lines.map((ln, idx) => ({
        text: ln,
        options: { breakLine: idx < p.lines.length - 1 }
      })),
      { x: p.colX, y: 3.13, w: 2.8, h: 1.5,
        fontFace: FONT_BODY, fontSize: 18, color: TEXT, paraSpaceAfter: 4, margin: 0 }
    );
  });

  addFooter(s, 5);
}

// ---------- Helper: PPD flowchart slides (6, 7, 8) ----------
function addFlowchartSlide(opts) {
  const s = pres.addSlide();
  addBg(s);

  // Main title
  s.addText(opts.title, {
    x: 0.6, y: 0.3, w: 8.8, h: 0.6,
    fontFace: FONT_HEAD, fontSize: 22, bold: true, color: TEXT, margin: 0
  });
  // Patient subtitle (italic)
  s.addText(opts.patient, {
    x: 0.6, y: 0.9, w: 7.0, h: 0.25,
    fontFace: FONT_HEAD, fontSize: 16, bold: true, italic: true, color: TEXT, margin: 0
  });
  // Age/country
  s.addText(opts.age, {
    x: 0.6, y: 1.4, w: 3.8, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 18, bold: true, color: TEXT, margin: 0
  });
  // History lines
  s.addText(
    opts.history.map((ln, i) => ({
      text: ln, options: { breakLine: i < opts.history.length - 1 }
    })),
    { x: 0.6, y: 1.9, w: 3.8, h: 1.4,
      fontFace: FONT_BODY, fontSize: 14, color: SUBTLE, paraSpaceAfter: 4, margin: 0 }
  );

  // Three numbered circles + step labels
  const steps = [
    { n: "1", y: 1.35, label: "Patient Presents" },
    { n: "2", y: 2.15, label: "PPD Placed Intradermally" },
    { n: "3", y: 2.95, label: "Read at 48-72 Hours" }
  ];
  steps.forEach(st => {
    s.addShape(pres.shapes.OVAL, {
      x: 4.75, y: st.y, w: 0.5, h: 0.5,
      fill: { color: BG }, line: { color: BLUE_LIGHT, width: 1.5 }
    });
    s.addText(st.n, {
      x: 4.75, y: st.y, w: 0.5, h: 0.5,
      fontFace: FONT_HEAD, fontSize: 14, bold: true, color: BLUE_LIGHT,
      align: "center", valign: "middle", margin: 0
    });
    s.addText(st.label, {
      x: 5.45, y: st.y + 0.05, w: 4.0, h: 0.4,
      fontFace: FONT_HEAD, fontSize: 15, bold: true, color: TEXT,
      valign: "middle", margin: 0
    });
  });

  // Vertical connector lines between circles
  s.addShape(pres.shapes.LINE, {
    x: 5.0, y: 1.85, w: 0, h: 0.3,
    line: { color: BLUE_LIGHT, width: 1 }
  });
  s.addShape(pres.shapes.LINE, {
    x: 5.0, y: 2.65, w: 0, h: 0.3,
    line: { color: BLUE_LIGHT, width: 1 }
  });
  // Stem from circle 3 down to branching point
  s.addShape(pres.shapes.LINE, {
    x: 5.0, y: 3.45, w: 0, h: 0.3,
    line: { color: BLUE_LIGHT, width: 1, dashType: "dash" }
  });
  // Horizontal branch line
  s.addShape(pres.shapes.LINE, {
    x: 2.75, y: 3.75, w: 4.5, h: 0,
    line: { color: BLUE_LIGHT, width: 1, dashType: "dash" }
  });
  // Left/right drops
  s.addShape(pres.shapes.LINE, {
    x: 2.75, y: 3.75, w: 0, h: 0.2,
    line: { color: BLUE_LIGHT, width: 1, dashType: "dash" }
  });
  s.addShape(pres.shapes.LINE, {
    x: 7.25, y: 3.75, w: 0, h: 0.2,
    line: { color: BLUE_LIGHT, width: 1, dashType: "dash" }
  });

  // Two outcome cards
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 3.95, w: 4.3, h: 1.3, rectRadius: 0.08,
    fill: { color: CARD }, line: { color: CYAN, width: 1.5 }
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 3.95, w: 4.3, h: 1.3, rectRadius: 0.08,
    fill: { color: CARD }, line: { color: AMBER, width: 1.5 }
  });

  // NEGATIVE label
  s.addText("NEGATIVE", {
    x: 0.6, y: 4.07, w: 4.3, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 15, bold: true, color: CYAN, align: "center", margin: 0
  });
  s.addText(opts.negThreshold, {
    x: 0.6, y: 4.37, w: 4.3, h: 0.25,
    fontFace: FONT_HEAD, fontSize: 13, bold: true, color: CYAN, align: "center", margin: 0
  });
  s.addText(
    opts.negBody.map((ln, i) => ({ text: ln, options: { breakLine: i < opts.negBody.length - 1 } })),
    { x: 0.75, y: 4.7, w: 4.0, h: 0.55,
      fontFace: FONT_BODY, fontSize: 11, color: SUBTLE, align: "center", margin: 0 }
  );

  // POSITIVE label
  s.addText("POSITIVE", {
    x: 5.1, y: 4.07, w: 4.3, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 15, bold: true, color: AMBER, align: "center", margin: 0
  });
  s.addText(opts.posThreshold, {
    x: 5.1, y: 4.37, w: 4.3, h: 0.25,
    fontFace: FONT_HEAD, fontSize: 13, bold: true, color: AMBER, align: "center", margin: 0
  });
  s.addText(
    opts.posBody.map((ln, i) => ({ text: ln, options: { breakLine: i < opts.posBody.length - 1 } })),
    { x: 5.25, y: 4.7, w: 4.0, h: 0.55,
      fontFace: FONT_BODY, fontSize: 11, color: SUBTLE, align: "center", margin: 0 }
  );

  addFooter(s, opts.page);
}

// ---------- Slide 6 ----------
addFlowchartSlide({
  page: 6,
  title: "BCG Patients: Use IGRA to Confirm Infection",
  patient: "Maria Santos · BCG Only",
  age: "28 y/o · Philippines",
  history: ["BCG vaccine at birth", "Asymptomatic", "Routine employment PPD"],
  negThreshold: "< 10 mm",
  negBody: ["No TB infection.", "BCG does not cause", "false-negatives. Reassure."],
  posThreshold: "≥ 10 mm",
  posBody: ["Likely BCG cross-reactivity.", "Order IGRA.", "If negative, no infection."]
});

// ---------- Slide 7 ----------
addFlowchartSlide({
  page: 7,
  title: "IGRA-Positive Patients Need LTBI Treatment",
  patient: "David Nguyen · Latent TB, No BCG",
  age: "45 y/o · Vietnam",
  history: ["No BCG vaccine", "IGRA positive 6 months ago", "Never treated for LTBI"],
  negThreshold: "< 10 mm",
  negBody: ["False negative possible.", "Prior IGRA positive;", "treat for LTBI."],
  posThreshold: "≥ 10 mm",
  posBody: ["Confirms LTBI.", "Order CXR.", "If normal, start treatment."]
});

// ---------- Slide 8 ----------
addFlowchartSlide({
  page: 8,
  title: "Active TB Can Produce False-Negative PPD",
  patient: "James Okonkwo · Active TB",
  age: "38 y/o · Nigeria",
  history: ["BCG vaccine at birth", "3-week productive cough", "Night sweats, weight loss"],
  negThreshold: "< 5 mm",
  negBody: ["PPD can be falsely negative.", "Continue CXR,", "AFB, NAAT workup."],
  posThreshold: "≥ 5 mm",
  posBody: ["Supports diagnosis.", "Isolate, start RIPE.", "Notify Public Health."]
});

// ---------- Slide 9 — PPD 4-step (image-based) ----------
{
  const s = pres.addSlide();
  addBg(s);
  s.addText("PPD Requires a 48-72 Hour Read Window", {
    x: 0.6, y: 0.3, w: 8.8, h: 0.6,
    fontFace: FONT_HEAD, fontSize: 22, bold: true, color: TEXT, margin: 0
  });
  s.addImage({ path: asset("image11.png"), x: 0.0, y: 1.5, w: 10.0, h: 3.2 });
  addFooter(s, 9);
}

// ---------- Slide 10 — QuantiFERON 3-step ----------
{
  const s = pres.addSlide();
  addBg(s);
  s.addText("QuantiFERON Eliminates BCG Confounding", {
    x: 0.6, y: 0.3, w: 8.8, h: 0.6,
    fontFace: FONT_HEAD, fontSize: 22, bold: true, color: TEXT, margin: 0
  });
  s.addImage({ path: asset("image12.png"), x: 0.0, y: 1.5, w: 10.0, h: 3.2 });
  addFooter(s, 10);
}

// ---------- Slide 11 — Four illustrated CXR patterns ----------
{
  const s = pres.addSlide();
  addBg(s);
  s.addText("Recognize These Four CXR Patterns to Avoid Missed TB", {
    x: 0.6, y: 0.3, w: 8.8, h: 0.6,
    fontFace: FONT_HEAD, fontSize: 22, bold: true, color: TEXT, margin: 0
  });
  const imgs = ["image13.png", "image14.png", "image15.png", "image16.png"];
  const labels = ["Apical Infiltrate", "Cavitary Lesion", "Miliary Pattern", "Hilar Adenopathy"];
  const xs = [0.6, 2.845, 5.095, 7.345];
  imgs.forEach((im, i) => {
    s.addImage({ path: asset(im), x: xs[i], y: 1.456, w: 2.055, h: 1.644 });
    s.addText(labels[i], {
      x: xs[i], y: 3.38, w: 2.055, h: 0.32,
      fontFace: FONT_HEAD, fontSize: 16, bold: true, color: AMBER,
      align: "center", margin: 0
    });
  });
  s.addText("Illustrated patterns, see next slide for actual CXR examples", {
    x: 0.6, y: 4.6, w: 8.8, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 14, bold: true, italic: true, color: TEXT,
    align: "center", margin: 0
  });
  addFooter(s, 11);
}

// ---------- Slide 12 — Real CXR examples ----------
{
  const s = pres.addSlide();
  addBg(s);
  s.addText("Real CXR Examples for Pattern Recognition", {
    x: 0.6, y: 0.3, w: 8.8, h: 0.6,
    fontFace: FONT_HEAD, fontSize: 22, bold: true, color: TEXT, margin: 0
  });
  const imgs = ["image17.png", "image18.png", "image19.png", "image20.png"];
  const labels = ["Apical Infiltrate", "Cavitary Lesion", "Miliary Pattern", "Hilar Adenopathy"];
  const xsI = [0.554, 2.954, 5.354, 7.754];
  const xsL = [0.454, 2.854, 5.254, 7.654];
  imgs.forEach((im, i) => {
    s.addImage({ path: asset(im), x: xsI[i], y: 1.684, w: 1.693, h: 2.257, rounding: true });
    s.addText(labels[i], {
      x: xsL[i], y: 4.099, w: 1.854, h: 0.242,
      fontFace: FONT_HEAD, fontSize: 14, bold: true, color: AMBER,
      align: "center", margin: 0
    });
  });
  addFooter(s, 12);
}

// ---------- Helper: Case Question slide ----------
function addCaseQuestionSlide(opts) {
  const s = pres.addSlide();
  addBg(s);
  s.addText(opts.title, {
    x: 0.6, y: 0.3, w: 8.8, h: 0.6,
    fontFace: FONT_HEAD, fontSize: 22, bold: true, color: TEXT, margin: 0
  });
  s.addText(opts.vignette, {
    x: 0.6, y: 1.2, w: 8.8, h: 0.8,
    fontFace: FONT_HEAD, fontSize: 18, color: TEXT, margin: 0
  });
  s.addText("What is the best next step?", {
    x: 0.6, y: opts.promptY, w: 5.0, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 18, bold: true, color: AMBER, margin: 0
  });
  const ys = [opts.firstChoiceY,
              opts.firstChoiceY + 0.4,
              opts.firstChoiceY + 0.8,
              opts.firstChoiceY + 1.2,
              opts.firstChoiceY + 1.6];
  opts.choices.forEach((c, i) => {
    s.addText(c, {
      x: 0.8, y: ys[i], w: 8.6, h: 0.4,
      fontFace: FONT_HEAD, fontSize: 18, color: TEXT, margin: 0
    });
  });
  addFooter(s, opts.page);
}

// ---------- Helper: Case Answer slide ----------
function addCaseAnswerSlide(opts) {
  const s = pres.addSlide();
  addBg(s);
  s.addText(opts.title, {
    x: 0.6, y: 0.3, w: 8.8, h: 0.6,
    fontFace: FONT_HEAD, fontSize: 22, bold: true, color: TEXT, margin: 0
  });
  // Choices rendered as 5 rows
  const ys = [1.2, 1.62, 2.04, 2.46, 2.88];
  opts.choices.forEach((c, i) => {
    const isCorrect = i === opts.correctIndex;
    s.addText(isCorrect ? c + "  ✓" : c, {
      x: 0.85, y: ys[i], w: 8.5, h: 0.38,
      fontFace: FONT_HEAD, fontSize: 18,
      bold: isCorrect, color: isCorrect ? AMBER : MUTED, margin: 0
    });
  });
  // Amber accent bar next to the correct answer
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: ys[opts.correctIndex] + 0.03, w: 0.06, h: 0.32,
    fill: { color: AMBER }, line: { color: AMBER }
  });
  // Thin divider
  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: 3.51, w: 8.8, h: 0,
    line: { color: DIVIDER, width: 0.5 }
  });
  // Rationale
  s.addText("Rationale:", {
    x: 0.6, y: 3.78, w: 1.5, h: 0.25,
    fontFace: FONT_HEAD, fontSize: 18, bold: true, color: BLUE, margin: 0
  });
  s.addText(opts.rationale, {
    x: 0.6, y: 4.05, w: 8.8, h: 0.8,
    fontFace: FONT_HEAD, fontSize: 18, color: TEXT, margin: 0
  });
  addFooter(s, opts.page);
}

// ---------- Slide 13 — Case 1 Question ----------
addCaseQuestionSlide({
  page: 13,
  title: "Case 1: Recent Live Vaccine",
  vignette: "34-year-old healthcare worker, annual PPD. Received MMR 3 days ago. No TB symptoms, contacts, or prior positive test.",
  promptY: 2.459,
  firstChoiceY: 2.834,
  choices: [
    "A.  Place PPD today",
    "B.  Defer PPD 4+ weeks",
    "C.  Order QuantiFERON instead",
    "D.  Chest X-ray only",
    "E.  Lower-dose PPD"
  ]
});

// ---------- Slide 14 — Case 1 Answer ----------
addCaseAnswerSlide({
  page: 14,
  title: "Case 1: Recent Live Vaccine · Answer",
  choices: [
    "A.  Place PPD today",
    "B.  Defer PPD 4+ weeks",
    "C.  Order QuantiFERON instead",
    "D.  Chest X-ray only",
    "E.  Lower-dose PPD"
  ],
  correctIndex: 1,
  rationale: "Live vaccines suppress TST response, causing false-negatives. CDC recommends waiting 4+ weeks after live vaccine before PPD."
});

// ---------- Slide 15 — Case 2 Question ----------
addCaseQuestionSlide({
  page: 15,
  title: "Case 2: Pediatric BCG",
  vignette: "7-year-old from Somalia, BCG at birth, school TB screening. Healthy, no symptoms. PPD at 72 hours: 12 mm induration.",
  promptY: 2.46,
  firstChoiceY: 2.834,
  choices: [
    "A.  Attribute to BCG, reassure",
    "B.  Order CXR and IGRA",
    "C.  Start isoniazid now",
    "D.  Two-step PPD",
    "E.  Refer peds ID"
  ]
});

// ---------- Slide 16 — Case 2 Answer ----------
addCaseAnswerSlide({
  page: 16,
  title: "Case 2: Pediatric BCG · Answer",
  choices: [
    "A.  Attribute to BCG, reassure",
    "B.  Order CXR and IGRA",
    "C.  Start isoniazid now",
    "D.  Two-step PPD",
    "E.  Refer peds ID"
  ],
  correctIndex: 1,
  rationale: "Positive PPD in BCG-vaccinated child from endemic country should NOT be attributed to BCG. Proceed with CXR and IGRA."
});

// ---------- Slide 17 — Case 3 Question ----------
addCaseQuestionSlide({
  page: 17,
  title: "Case 3: Prior LTBI Treatment",
  vignette: "52-year-old, completed 4 months rifampin for LTBI in 2020 after positive IGRA. Annual PPD: 14 mm. Asymptomatic.",
  promptY: 2.475,
  firstChoiceY: 2.825,
  choices: [
    "A.  New LTBI regimen",
    "B.  Sputum AFB and isolate",
    "C.  Expected positive, screen and CXR only",
    "D.  Switch to IGRA",
    "E.  Repeat PPD"
  ]
});

// ---------- Slide 18 — Case 3 Answer ----------
addCaseAnswerSlide({
  page: 18,
  title: "Case 3: Prior LTBI Treatment · Answer",
  choices: [
    "A.  New LTBI regimen",
    "B.  Sputum AFB and isolate",
    "C.  Expected positive, screen and CXR only",
    "D.  Switch to IGRA",
    "E.  Repeat PPD"
  ],
  correctIndex: 2,
  rationale: "Once positive, TST and IGRA remain positive after treatment. Do not re-test or re-treat. Annual symptom screen and CXR."
});

// ---------- Slide 19 — Five Rules ----------
{
  const s = pres.addSlide();
  addBg(s);
  s.addText("Five Rules to Apply in Clinical Practice", {
    x: 0.6, y: 0.3, w: 8.8, h: 0.6,
    fontFace: FONT_HEAD, fontSize: 22, bold: true, color: TEXT, margin: 0
  });
  const rules = [
    { head: "Positive PPD in BCG-vaccinated patient",          sub: "Order IGRA, never reassure" },
    { head: "Prior IGRA or PPD positive",                      sub: "Remains positive forever, do not re-test" },
    { head: "Symptomatic patient with negative PPD",           sub: "Still workup for active TB" },
    { head: "Live vaccine within 4 weeks",                     sub: "Defer PPD to avoid false-negative" },
    { head: "CXR with infiltrate, cavity, miliary, or hilar adenopathy", sub: "Isolate and collect AFB" }
  ];
  const ruleYs = [1.15, 1.93, 2.71, 3.49, 4.27];
  rules.forEach((r, i) => {
    const y = ruleYs[i];
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: y + 0.05, w: 0.04, h: 0.5,
      fill: { color: AMBER }, line: { color: AMBER }
    });
    s.addText(r.head, {
      x: 0.85, y: y, w: 8.5, h: 0.32,
      fontFace: FONT_HEAD, fontSize: 16, bold: true, color: TEXT, margin: 0
    });
    s.addText(r.sub, {
      x: 0.85, y: y + 0.34, w: 8.5, h: 0.28,
      fontFace: FONT_BODY, fontSize: 14, color: AMBER, margin: 0
    });
  });
  addFooter(s, 19);
}

// ---------- Slide 20 — Thank You ----------
{
  const s = pres.addSlide();
  addBg(s);
  s.addImage({ path: asset("image21.png"), x: 4.4, y: 0.3, w: 5.0, h: 5.0 });
  s.addText("Thank You", {
    x: 0.6, y: 2.0, w: 4.5, h: 0.8,
    fontFace: FONT_HEAD, fontSize: 48, bold: true, color: TEXT, margin: 0
  });
  s.addText("Together, we can end TB", {
    x: 0.6, y: 2.9, w: 4.5, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 22, bold: true, italic: true, color: TEXT, margin: 0
  });
  s.addText(
    [
      { text: "Every test matters", options: { breakLine: true } },
      { text: "Every treatment counts", options: { breakLine: true } },
      { text: "Every patient deserves our best" }
    ],
    { x: 0.6, y: 3.5, w: 4.5, h: 1.2,
      fontFace: FONT_HEAD, fontSize: 18, color: TEXT, paraSpaceAfter: 6, margin: 0 }
  );
}

// ---------- Slide 21 — References ----------
{
  const s = pres.addSlide();
  addBg(s);
  s.addText("References and Resources", {
    x: 0.6, y: 0.3, w: 8.8, h: 0.6,
    fontFace: FONT_HEAD, fontSize: 22, bold: true, color: TEXT, margin: 0
  });
  const refs = [
    "TB in San Francisco",
    "CDC: TB in the United States, 2024",
    "CDC: Latent TB Testing and Treatment",
    "Curry International TB Center",
    "ATS/IDSA: TB Treatment Guidelines",
    "CCHCS TB Care Guide (2025)",
    "CDC: Provisional 2025 TB Data",
    "NTCA: LTBI Guidelines"
  ];
  refs.forEach((r, i) => {
    s.addText(r, {
      x: 0.6, y: 1.2 + i * 0.42, w: 8.8, h: 0.38,
      fontFace: FONT_HEAD, fontSize: 18, color: BLUE, margin: 0
    });
  });
  s.addImage({ path: asset("image22.png"), x: 4.6, y: 0.97, w: 5.0, h: 4.2 });
  addFooter(s, 21);
}

// ---------- Write file ----------
pres.writeFile({ fileName: "TB_Testing_and_Treatment.pptx" })
    .then(fn => console.log("Wrote:", fn));
