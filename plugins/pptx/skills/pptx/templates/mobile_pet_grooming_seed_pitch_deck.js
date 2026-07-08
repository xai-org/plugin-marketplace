// wisp_pitch_deck.js
// Recreates the Wisp dog grooming seed-round pitch deck.
// Usage: node wisp_pitch_deck.js
//
// Dependencies: pptxgenjs  (npm install pptxgenjs)

const pptxgen = require("pptxgenjs");

// ---- Palette ------------------------------------------------------------
const C = {
  cream:    "F2EFE8", // page background (most slides)
  sage:     "A3B5A2", // "Opportunity" slide background + accent on dark slide
  ink:      "1C2321", // primary text + dark-slide background
  muted:    "6D8075", // muted label / accent punctuation (sage-gray)
  body:     "3A4440", // body copy
  body2:    "3E4E45", // body copy on sage background
  softBand: "E8E4D9", // soft off-cream card fill
  softLine: "D9D4C6", // hairline divider on cream
};

const FONT = "Arial";

// Convenience: convert EMU-derived "1800" (100ths of a point) to pt
const pt = (hundredths) => hundredths / 100;
// Convenience: character spacing; pptx .spc is in 1/100 pt; pptxgenjs charSpacing is in pt
const chSp = (spc) => (spc ? spc / 100 : 0);

// ---- Presentation setup -------------------------------------------------
const pres = new pptxgen();
pres.title = "Wisp — Seed Round Pitch Deck";
pres.author = "Alycia / Wisp";
pres.company = "Wisp";

// Slide size: 18288000 x 10287000 EMU = 20" x 11.25"
pres.defineLayout({ name: "WISP_20x1125", width: 20, height: 11.25 });
pres.layout = "WISP_20x1125";

// Reusable helpers
const SLIDE_W = 20;
const MARGIN_L = 1.042;
const MARGIN_R_EDGE = 19.042; // right-edge of content (20 - 1 roughly)
const FOOTER_Y = 10.38;
const HEADER_Y = 0.5;
const EYEBROW_Y = 1.667;
const EYEBROW_Y_TIGHT = 1.458;

// Header/footer row for every content slide.
// `onDark=true` flips label colors to sage on the one dark slide.
function addChrome(slide, opts) {
  const { leftTop, rightTop = "WISP", leftFooter, rightFooter, onDark = false } = opts;
  const labelColor = onDark ? C.sage : C.muted;

  // Top-left eyebrow (section / title)
  slide.addText(leftTop, {
    x: MARGIN_L, y: HEADER_Y, w: 6.0, h: 0.328,
    fontFace: FONT, fontSize: 9, color: labelColor,
    charSpacing: chSp(216), margin: 0, align: "left", valign: "top",
  });
  // Top-right "WISP" wordmark
  slide.addText(rightTop, {
    x: 18.199, y: HEADER_Y, w: 0.842, h: 0.328,
    fontFace: FONT, fontSize: 9, color: labelColor,
    charSpacing: chSp(216), margin: 0, align: "left", valign: "top",
  });
  // Bottom-left footer tag
  slide.addText(leftFooter, {
    x: MARGIN_L, y: FOOTER_Y, w: 10.0, h: 0.328,
    fontFace: FONT, fontSize: 9, color: labelColor,
    charSpacing: chSp(216), margin: 0, align: "left", valign: "top",
  });
  // Bottom-right page number
  slide.addText(rightFooter, {
    x: 17.984, y: FOOTER_Y, w: 1.058, h: 0.328,
    fontFace: FONT, fontSize: 9, color: labelColor,
    charSpacing: chSp(216), margin: 0, align: "left", valign: "top",
  });
}

// Eyebrow label above the big title
function addEyebrow(slide, text, y, onDark = false) {
  slide.addText(text, {
    x: MARGIN_L, y, w: 18.454, h: 0.328,
    fontFace: FONT, fontSize: 9, color: onDark ? C.sage : C.muted,
    charSpacing: chSp(252), margin: 0, align: "left", valign: "top",
  });
}

// =========================================================================
// SLIDE 1 — Title / Cover
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  // Slide 1 uses a wider right-top eyebrow box than other slides; call
  // pieces individually rather than using the default chrome helper.
  s.addText("WISP · MOBILE GROOMING", {
    x: MARGIN_L, y: HEADER_Y, w: 6.0, h: 0.328,
    fontFace: FONT, fontSize: 9, color: C.muted,
    charSpacing: chSp(216), margin: 0, align: "left", valign: "top",
  });
  s.addText("SEED ROUND · 2026", {
    x: 16.003, y: HEADER_Y, w: 3.044, h: 0.328,
    fontFace: FONT, fontSize: 9, color: C.muted,
    charSpacing: chSp(216), margin: 0, align: "left", valign: "top",
  });
  s.addText("ALYCIA / FOUNDER", {
    x: MARGIN_L, y: FOOTER_Y, w: 10.0, h: 0.328,
    fontFace: FONT, fontSize: 9, color: C.muted,
    charSpacing: chSp(216), margin: 0, align: "left", valign: "top",
  });
  s.addText("$250K SEED", {
    x: 17.185, y: FOOTER_Y, w: 1.857, h: 0.328,
    fontFace: FONT, fontSize: 9, color: C.muted,
    charSpacing: chSp(216), margin: 0, align: "left", valign: "top",
  });

  // Big Wisp. wordmark
  s.addText(
    [
      { text: "Wisp", options: { color: C.ink } },
      { text: ".",    options: { color: C.muted } },
    ],
    {
      x: MARGIN_L, y: 2.586, w: 18.454, h: 4.483,
      fontFace: FONT, fontSize: 390, bold: true,
      charSpacing: chSp(-2000), lineSpacingMultiple: 0.82,
      margin: 0, align: "left", valign: "top",
    }
  );

  // Tagline (italic)
  s.addText("A gentler way to groom — at your door, and soon, a flagship in San Diego.", {
    x: MARGIN_L, y: 7.528, w: 10.192, h: 1.385,
    fontFace: FONT, fontSize: 42, italic: true, color: C.body,
    charSpacing: chSp(-42), margin: 0, align: "left", valign: "top",
  });

  // Right-column meta (PITCH DECK / V1.0 + SAN DIEGO, CA)
  s.addText("PITCH DECK / V1.0", {
    x: 16.467, y: 8.174, w: 2.575, h: 0.328,
    fontFace: FONT, fontSize: 9, color: C.muted,
    charSpacing: chSp(108), margin: 0, align: "left", valign: "top",
  });
  s.addText("SAN DIEGO, CA", {
    x: 16.888, y: 8.585, w: 2.154, h: 0.328,
    fontFace: FONT, fontSize: 9, color: C.muted,
    charSpacing: chSp(108), margin: 0, align: "left", valign: "top",
  });
}

// =========================================================================
// SLIDE 2 — The Problem
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addChrome(s, {
    leftTop: "01 / THE PROBLEM",
    leftFooter: "SOURCE: WISP CLIENT SURVEY (N=312), 2025",
    rightFooter: "02 / 08",
  });
  addEyebrow(s, "THE PROBLEM", EYEBROW_Y);

  // Big display headline
  s.addText(
    [
      { text: "Grooming is stuck in the ", options: { color: C.ink, bold: true } },
      { text: "2000s.", options: { color: C.muted, italic: true } },
    ],
    {
      x: MARGIN_L, y: 2.245, w: 18.454, h: 2.971,
      fontFace: FONT, fontSize: 111, bold: true,
      charSpacing: chSp(-444), lineSpacingMultiple: 0.95,
      margin: 0, align: "left", valign: "top",
    }
  );

  // Supporting paragraph
  s.addText(
    "Owners are juggling fluorescent-lit chains, unreliable independents, and long waits. For a $13B U.S. market, the experience hasn't moved in a decade.",
    {
      x: MARGIN_L, y: 5.549, w: 11.802, h: 1.529,
      fontFace: FONT, fontSize: 25.5, color: C.body,
      lineSpacingMultiple: 1.40, margin: 0, align: "left", valign: "top",
    }
  );

  // Three stat blocks
  const stats = [
    {
      x: MARGIN_L,
      big: [
        { text: "68", options: { fontSize: 96, bold: true, color: C.ink } },
        { text: "%",  options: { fontSize: 54, bold: true, color: C.ink } },
      ],
      caption: "of owners report anxiety around their dog's grooming visit.",
    },
    {
      x: 7.208,
      big: [
        { text: "3",  options: { fontSize: 96, bold: true, color: C.ink } },
        { text: "wk", options: { fontSize: 54, bold: true, color: C.ink } },
      ],
      caption: "average wait at premium San Diego salons on weekends.",
    },
    {
      x: 13.375,
      big: [
        { text: "1",    options: { fontSize: 96, bold: true, color: C.ink } },
        { text: "in 4", options: { fontSize: 54, bold: true, color: C.ink } },
      ],
      caption: "owners will pay a meaningful premium for at-home service.",
    },
  ];
  stats.forEach((st) => {
    s.addText(
      st.big.map((r) => ({
        text: r.text,
        options: { ...r.options, charSpacing: chSp(-384), fontFace: FONT },
      })),
      {
        x: st.x, y: 7.745, w: 5.751, h: 1.242,
        lineSpacingMultiple: 0.90, margin: 0, align: "left", valign: "top",
      }
    );
    s.addText(st.caption, {
      x: st.x, y: 9.112, w: 3.862, h: 1.138,
      fontFace: FONT, fontSize: 19.5, color: C.body,
      lineSpacingMultiple: 1.35, margin: 0, align: "left", valign: "top",
    });
  });
}

// =========================================================================
// SLIDE 3 — The Opportunity (sage background)
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.sage };

  addChrome(s, {
    leftTop: "02 / THE OPPORTUNITY",
    leftFooter: "SOURCE: APPA, IBISWORLD, INTERNAL ANALYSIS",
    rightFooter: "03 / 08",
    onDark: true, // on sage, labels flip to ink — override:
  });
  // On sage the original uses ink-dark labels, not sage. Patch:
  // (Overwrite by re-rendering the chrome fields in ink.)
  // Simplest: re-add labels on top in ink.
  const sageLabel = C.ink;
  s.addText("02 / THE OPPORTUNITY", {
    x: MARGIN_L, y: HEADER_Y, w: 6.0, h: 0.328,
    fontFace: FONT, fontSize: 9, color: sageLabel,
    charSpacing: chSp(216), margin: 0, align: "left", valign: "top",
  });
  s.addText("WISP", {
    x: 18.199, y: HEADER_Y, w: 0.842, h: 0.328,
    fontFace: FONT, fontSize: 9, color: sageLabel,
    charSpacing: chSp(216), margin: 0, align: "left", valign: "top",
  });
  s.addText("SOURCE: APPA, IBISWORLD, INTERNAL ANALYSIS", {
    x: MARGIN_L, y: FOOTER_Y, w: 10.0, h: 0.328,
    fontFace: FONT, fontSize: 9, color: sageLabel,
    charSpacing: chSp(216), margin: 0, align: "left", valign: "top",
  });
  s.addText("03 / 08", {
    x: 17.984, y: FOOTER_Y, w: 1.058, h: 0.328,
    fontFace: FONT, fontSize: 9, color: sageLabel,
    charSpacing: chSp(216), margin: 0, align: "left", valign: "top",
  });

  addEyebrow(s, "THE OPPORTUNITY", EYEBROW_Y, /*onDark*/ false);
  // Override eyebrow color to ink (sage bg variant):
  // re-draw:
  s.addText("THE OPPORTUNITY", {
    x: MARGIN_L, y: EYEBROW_Y, w: 9.678, h: 0.328,
    fontFace: FONT, fontSize: 9, color: sageLabel,
    charSpacing: chSp(252), margin: 0, align: "left", valign: "top",
  });

  // Display headline (2-line wrap)
  s.addText("A premium, mobile-first category.", {
    x: MARGIN_L, y: 2.245, w: 9.678, h: 3.762,
    fontFace: FONT, fontSize: 93, bold: true, color: C.ink,
    charSpacing: chSp(-325), lineSpacingMultiple: 0.96,
    margin: 0, align: "left", valign: "top",
  });

  // Right-side supporting paragraph
  s.addText(
    "San Diego spends more per-dog than any top-20 U.S. metro. Mobile grooming is the fastest-growing segment — and still fragmented.",
    {
      x: 11.271, y: 4.152, w: 5.579, h: 1.854,
      fontFace: FONT, fontSize: 22.5, color: C.ink,
      lineSpacingMultiple: 1.45, margin: 0, align: "left", valign: "top",
    }
  );

  // Three stat columns, each with a top rule, big number, caption
  const opp = [
    { x: MARGIN_L, big: "$13 ", unit: "B", caption: "U.S. grooming market, growing 6% YoY." },
    { x: 7.181,    big: "$1.2 ", unit: "B", caption: "SoCal TAM, with mobile as the fastest-growing slice." },
    { x: 13.319,   big: "180 ",  unit: "K", caption: "Dogs in San Diego County — our beachhead." },
  ];
  opp.forEach((o) => {
    // Top hairline rule
    s.addShape(pres.shapes.RECTANGLE, {
      x: o.x, y: 8.113, w: 5.639, h: 0.01,
      fill: { color: C.ink }, line: { type: "none" },
    });
    // Big stat
    s.addText(
      [
        { text: o.big,  options: { fontSize: 66, bold: true, color: C.ink } },
        { text: o.unit, options: { fontSize: 28.5, color: C.body2 } },
      ].map((r) => ({ text: r.text, options: { ...r.options, fontFace: FONT, charSpacing: chSp(-198) } })),
      {
        x: o.x, y: 8.415, w: 5.808, h: 0.958,
        lineSpacingMultiple: 1.0, margin: 0, align: "left", valign: "top",
      }
    );
    // Caption
    s.addText(o.caption, {
      x: o.x, y: 9.477, w: 4.506, h: 0.773,
      fontFace: FONT, fontSize: 19.5, color: C.ink,
      lineSpacingMultiple: 1.35, margin: 0, align: "left", valign: "top",
    });
  });
}

// =========================================================================
// SLIDE 4 — Meet Wisp / What We Do
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addChrome(s, {
    leftTop: "03 / MEET WISP",
    leftFooter: "MOBILE TODAY · FLAGSHIP NEXT",
    rightFooter: "04 / 08",
  });
  addEyebrow(s, "WHAT WE DO", EYEBROW_Y_TIGHT);

  // Display headline
  s.addText("A calmer groom, on your schedule.", {
    x: MARGIN_L, y: 1.953, w: 18.454, h: 2.002,
    fontFace: FONT, fontSize: 72, bold: true, color: C.ink,
    charSpacing: chSp(-252), lineSpacingMultiple: 0.98,
    margin: 0, align: "left", valign: "top",
  });

  // Supporting paragraph
  s.addText(
    "Wisp is a boutique mobile grooming studio serving San Diego. We arrive in a fully-equipped van, work one dog at a time, and deliver a salon-grade groom without the stress of a storefront.",
    {
      x: MARGIN_L, y: 4.413, w: 6.867, h: 1.792,
      fontFace: FONT, fontSize: 21, color: C.ink,
      lineSpacingMultiple: 1.50, margin: 0, align: "left", valign: "top",
    }
  );

  // Right-side visual composition: large cream card + sage + cream card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.784, y: 4.413, w: 8.175, h: 3.146,
    fill: { color: C.softBand }, line: { color: C.softLine, width: 0.75 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.784, y: 7.767, w: 3.983, h: 2.312,
    fill: { color: C.sage }, line: { color: C.muted, width: 0.75 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 14.975, y: 7.767, w: 3.983, h: 2.312,
    fill: { color: C.softBand }, line: { color: C.softLine, width: 0.75 },
  });

  // Service rows (three)
  const services = [
    { y: 8.08, yDiv: 8.559, yTitle: 7.981, num: "01", title: "Full Groom",          right: "from $150",                            rW: 1.209 },
    { y: 8.835, yDiv: 9.314, yTitle: 8.736, num: "02", title: "Spa Add-Ons",        right: "blueberry facial, paw balm, de-shed",  rW: 4.065 },
    { y: 9.59,  yDiv: 10.069, yTitle: 9.491, num: "03", title: "Specialty Breed Cuts", right: "poodle, doodle, terrier, schnauzer", rW: 3.822 },
  ];
  services.forEach((svc, i) => {
    // Divider line at bottom of row
    s.addShape(pres.shapes.RECTANGLE, {
      x: MARGIN_L, y: svc.yDiv, w: 8.992, h: 0.01,
      fill: { color: C.softLine }, line: { type: "none" },
    });
    // Number
    s.addText(svc.num, {
      x: MARGIN_L, y: svc.y, w: 0.75, h: 0.328,
      fontFace: FONT, fontSize: 9, color: C.muted,
      margin: 0, align: "left", valign: "top",
    });
    // Title
    s.addText(svc.title, {
      x: 1.708, y: svc.yTitle, w: (i === 0 ? 7.416 : i === 1 ? 4.51 : 4.753), h: 0.453,
      fontFace: FONT, fontSize: 12, bold: true, color: C.ink,
      charSpacing: chSp(-24), margin: 0, align: "left", valign: "top",
    });
    // Right-side descriptor
    const rightX = (i === 0) ? 8.908 : (i === 1) ? 6.087 : 6.323;
    s.addText(svc.right, {
      x: rightX, y: svc.y, w: svc.rW, h: 0.328,
      fontFace: FONT, fontSize: 9, color: C.body,
      margin: 0, align: "left", valign: "top",
    });
  });
}

// =========================================================================
// SLIDE 5 — Traction
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addChrome(s, {
    leftTop: "04 / TRACTION",
    leftFooter: "T12M ENDING MAR 2026",
    rightFooter: "05 / 08",
  });
  addEyebrow(s, "TRACTION", EYEBROW_Y);

  // Display headline
  s.addText(
    [
      { text: "Ten years, a loyal book, a ", options: { bold: true, italic: false } },
      { text: "waitlist.",                    options: { bold: true, italic: true  } },
    ],
    {
      x: MARGIN_L, y: 2.245, w: 18.454, h: 2.451,
      fontFace: FONT, fontSize: 88.5, color: C.ink,
      charSpacing: chSp(-310), lineSpacingMultiple: 0.98,
      margin: 0, align: "left", valign: "top",
    }
  );

  // Four stat columns with top rules
  const traction = [
    { x: MARGIN_L, big: "10",  unit: "yr", caption: "of hands-on grooming experience." },
    { x: 5.625,    big: "$285", unit: "K", caption: "trailing 12-mo revenue from one van, solo operator." },
    { x: 10.208,   big: "82",   unit: "%", caption: "repeat client rate, 6+ week cadence." },
    { x: 14.792,   big: "140",  unit: "+", caption: "owners currently on the new-client waitlist." },
  ];
  traction.forEach((t) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: t.x, y: 5.8, w: 4.167, h: 0.01,
      fill: { color: C.ink }, line: { type: "none" },
    });
    s.addText(
      [
        { text: t.big,  options: { fontSize: 84, bold: true } },
        { text: t.unit, options: { fontSize: 42, bold: true } },
      ].map((r) => ({ text: r.text, options: { ...r.options, fontFace: FONT, color: C.ink, charSpacing: chSp(-294) } })),
      {
        x: t.x, y: 6.061, w: 4.292, h: 1.092,
        lineSpacingMultiple: 0.90, margin: 0, align: "left", valign: "top",
      }
    );
    s.addText(t.caption, {
      x: t.x, y: 7.236, w: 3.219, h: 0.717,
      fontFace: FONT, fontSize: 18, color: C.body,
      lineSpacingMultiple: 1.35, margin: 0, align: "left", valign: "top",
    });
  });

  // Partners row
  s.addText("TRUSTED PARTNERS & PRESS", {
    x: MARGIN_L, y: 8.90, w: 18.454, h: 0.328,
    fontFace: FONT, fontSize: 9, color: C.muted,
    charSpacing: chSp(108), margin: 0, align: "left", valign: "top",
  });

  // Partner names on a single row with bullet separators
  // We render a single rich-text line for consistent baseline.
  s.addText(
    [
      { text: "PetSmart",           options: { bold: true, color: C.ink,  charSpacing: chSp(-72) } },
      { text: "  ·  ",              options: { bold: true, color: C.muted, charSpacing: chSp(-72) } },
      { text: "Kong",               options: { bold: true, color: C.ink,  charSpacing: chSp(-72) } },
      { text: "  ·  ",              options: { bold: true, color: C.muted, charSpacing: chSp(-72) } },
      { text: "Science Diet",       options: { bold: true, color: C.ink,  charSpacing: chSp(-72) } },
      { text: "  ·  ",              options: { bold: true, color: C.muted, charSpacing: chSp(-72) } },
      { text: "celebrity clientele", options: { bold: true, italic: true, color: C.body, charSpacing: chSp(-72) } },
    ],
    {
      x: MARGIN_L, y: 9.40, w: 18.0, h: 0.75,
      fontFace: FONT, fontSize: 30,
      lineSpacingMultiple: 1.0,
      margin: 0, align: "left", valign: "top",
    }
  );
}

// =========================================================================
// SLIDE 6 — The Team
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addChrome(s, {
    leftTop: "05 / THE TEAM",
    leftFooter: "HIRING 2 GROOMERS POST-CLOSE",
    rightFooter: "06 / 08",
  });
  addEyebrow(s, "FOUNDER", EYEBROW_Y_TIGHT);

  // Left: placeholder portrait card (cream card)
  s.addShape(pres.shapes.RECTANGLE, {
    x: MARGIN_L, y: 1.995, w: 7.688, h: 6.255,
    fill: { color: C.softBand }, line: { color: C.softLine, width: 0.75 },
  });

  // Name + role under portrait
  s.addText("Alycia", {
    x: MARGIN_L, y: 8.542, w: 7.918, h: 0.714,
    fontFace: FONT, fontSize: 39, bold: true, color: C.ink,
    charSpacing: chSp(-78), margin: 0, align: "left", valign: "top",
  });
  s.addText("FOUNDER & HEAD GROOMER", {
    x: MARGIN_L, y: 9.297, w: 7.918, h: 0.328,
    fontFace: FONT, fontSize: 9, color: C.muted,
    charSpacing: chSp(108), margin: 0, align: "left", valign: "top",
  });

  // Right: display headline
  s.addText("Built by a groomer, not a brand.", {
    x: 9.562, y: 2.217, w: 9.678, h: 3.282,
    fontFace: FONT, fontSize: 81, bold: true, color: C.ink,
    charSpacing: chSp(-283), lineSpacingMultiple: 0.96,
    margin: 0, align: "left", valign: "top",
  });

  // Pull quote
  s.addText(
    [
      { text: "\u201C ", options: { fontSize: 50, italic: true, color: C.muted } },
      {
        text: "After ten years behind the clippers, I know what dogs and owners actually want. Wisp is the studio I always wanted to work in. ",
        options: { fontSize: 28, italic: true, color: C.ink },
      },
      { text: "\u201D", options: { fontSize: 28, italic: true, color: C.muted } },
    ].map((r) => ({ text: r.text, options: { ...r.options, fontFace: FONT, charSpacing: chSp(-49) } })),
    {
      x: 9.562, y: 5.80, w: 9.678, h: 2.0,
      lineSpacingMultiple: 1.20, margin: 0, align: "left", valign: "top",
    }
  );

  // Credentials line (moved down slightly to give the quote more clearance)
  s.addText(
    "10+ years grooming · celebrity clientele · certified in specialty breeds · brand partnerships with PetSmart, Kong, and Science Diet.",
    {
      x: 9.562, y: 8.40, w: 9.0, h: 1.31,
      fontFace: FONT, fontSize: 19, color: C.ink,
      lineSpacingMultiple: 1.40, margin: 0, align: "left", valign: "top",
    }
  );
}

// =========================================================================
// SLIDE 7 — The Ask (DARK)
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.ink };

  // Chrome in sage on dark background
  s.addText("06 / THE ASK", {
    x: MARGIN_L, y: HEADER_Y, w: 6.0, h: 0.328,
    fontFace: FONT, fontSize: 9, color: C.sage,
    charSpacing: chSp(216), margin: 0, align: "left", valign: "top",
  });
  s.addText("WISP", {
    x: 18.199, y: HEADER_Y, w: 0.842, h: 0.328,
    fontFace: FONT, fontSize: 9, color: C.sage,
    charSpacing: chSp(216), margin: 0, align: "left", valign: "top",
  });
  s.addText("TARGETING $1.1M ARR BY MONTH 18", {
    x: MARGIN_L, y: FOOTER_Y, w: 10.0, h: 0.328,
    fontFace: FONT, fontSize: 9, color: C.sage,
    charSpacing: chSp(216), margin: 0, align: "left", valign: "top",
  });
  s.addText("07 / 08", {
    x: 17.984, y: FOOTER_Y, w: 1.058, h: 0.328,
    fontFace: FONT, fontSize: 9, color: C.sage,
    charSpacing: chSp(216), margin: 0, align: "left", valign: "top",
  });

  // Eyebrow
  s.addText("THE ASK", {
    x: MARGIN_L, y: EYEBROW_Y, w: 18.454, h: 0.328,
    fontFace: FONT, fontSize: 9, color: C.sage,
    charSpacing: chSp(252), margin: 0, align: "left", valign: "top",
  });

  // $250K monster headline
  s.addText("$250K", {
    x: MARGIN_L, y: 1.62, w: 9.589, h: 4.151,
    fontFace: FONT, fontSize: 240, bold: true, color: C.cream,
    charSpacing: chSp(-1200), lineSpacingMultiple: 0.86,
    margin: 0, align: "left", valign: "top",
  });

  // Italic subhead in sage
  s.addText("Seed round — to open our flagship studio in San Diego.", {
    x: MARGIN_L, y: 5.32, w: 18.454, h: 0.543,
    fontFace: FONT, fontSize: 42, italic: true, color: C.sage,
    charSpacing: chSp(-42), lineSpacingMultiple: 0.86,
    margin: 0, align: "left", valign: "top",
  });

  // Three allocation columns
  const asks = [
    { x: MARGIN_L, pct: "55%", caption: "Build-out & lease of our flagship studio in North Park." },
    { x: 7.181,    pct: "30%", caption: "Hiring 2 senior groomers and a studio manager." },
    { x: 13.319,   pct: "15%", caption: "Brand, booking software, and second mobile van." },
  ];
  asks.forEach((a) => {
    // sage hairline
    s.addShape(pres.shapes.RECTANGLE, {
      x: a.x, y: 8.206, w: 5.639, h: 0.01,
      fill: { color: C.sage }, line: { type: "none" },
    });
    s.addText(a.pct, {
      x: a.x, y: 8.446, w: 5.808, h: 0.969,
      fontFace: FONT, fontSize: 54, bold: true, color: C.sage,
      charSpacing: chSp(-162), margin: 0, align: "left", valign: "top",
    });
    s.addText(a.caption, {
      x: a.x, y: 9.477, w: 3.862, h: 0.773,
      fontFace: FONT, fontSize: 19.5, color: C.cream,
      lineSpacingMultiple: 1.35, margin: 0, align: "left", valign: "top",
    });
  });
}

// =========================================================================
// SLIDE 8 — Contact
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addChrome(s, {
    leftTop: "07 / CONTACT",
    leftFooter: "WISP · EST. 2026",
    rightFooter: "08 / 08",
  });
  addEyebrow(s, "LET'S TALK", EYEBROW_Y_TIGHT);

  // Display headline
  s.addText(
    [
      { text: "Come groom with ", options: { bold: true, italic: false, color: C.ink } },
      { text: "us.",               options: { bold: false, italic: true,  color: C.muted } },
    ],
    {
      x: MARGIN_L, y: 1.995, w: 18.454, h: 2.217,
      fontFace: FONT, fontSize: 87,
      charSpacing: chSp(-348), lineSpacingMultiple: 0.90,
      margin: 0, align: "left", valign: "top",
    }
  );

  // Supporting paragraph
  s.addText(
    "We're raising $250K to open the Wisp flagship in San Diego and expand across SoCal over the next 24 months. We'd love to have you along.",
    {
      x: MARGIN_L, y: 4.42, w: 9.656, h: 0.887,
      fontFace: FONT, fontSize: 21, color: C.body,
      lineSpacingMultiple: 1.45, margin: 0, align: "left", valign: "top",
    }
  );

  // 2x2 contact grid — each cell has hairline, label, value
  const cells = [
    { x: MARGIN_L, y: 6.781, yLbl: 7.021, yVal: 7.411, label: "FOUNDER",   value: "Alycia"         },
    { x: 10.208,   y: 6.781, yLbl: 7.021, yVal: 7.411, label: "EMAIL",     value: "alycia@wisp.dog" },
    { x: MARGIN_L, y: 8.391, yLbl: 8.630, yVal: 9.021, label: "INSTAGRAM", value: "@wisp.grooming"  },
    { x: 10.208,   y: 8.391, yLbl: 8.630, yVal: 9.021, label: "STUDIO",    value: "San Diego, CA"   },
  ];
  cells.forEach((c) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: c.y, w: 8.75, h: 0.01,
      fill: { color: C.ink }, line: { type: "none" },
    });
    s.addText(c.label, {
      x: c.x, y: c.yLbl, w: 9.012, h: 0.328,
      fontFace: FONT, fontSize: 9, color: C.muted,
      charSpacing: chSp(216), margin: 0, align: "left", valign: "top",
    });
    s.addText(c.value, {
      x: c.x, y: c.yVal, w: 9.012, h: 0.604,
      fontFace: FONT, fontSize: 33, bold: true, color: C.ink,
      charSpacing: chSp(-66), margin: 0, align: "left", valign: "top",
    });
  });
}

// ---- Write --------------------------------------------------------------
pres.writeFile({ fileName: "wisp_pitch_deck.pptx" })
  .then((fn) => console.log("Wrote:", fn));
