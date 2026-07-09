/**
 * Florist Replica - "Petal & Stem" presentation generator
 *
 * Recreates an 8-slide editorial-style florist deck (20" x 11.25"),
 * using cream backgrounds, Cormorant Garamond + Inter typography,
 * and embedded illustrative PNGs.
 *
 * Run:    node florist_replica.js
 * Output: Florist_replica.pptx
 *
 * Requires: pptxgenjs  (npm i pptxgenjs)
 *           ./images/image1.png ... image9.png  (in same folder as this script)
 */

const path = require("path");
const fs = require("fs");
const pptxgen = require("pptxgenjs");

// ---------------------------------------------------------------------------
// Theme
// ---------------------------------------------------------------------------
const COLOR = {
  bg:        "F6F1E7",  // page cream
  card:      "FAF6EE",  // image card cream (slightly lighter)
  ink:       "2C2820",  // headline / display ink
  muted:     "6E6657",  // small caps / labels / secondary text
  divider:   "D8CFBA",  // hairline separators on contact card
};

const FONT = {
  display: "Cormorant Garamond", // headlines & body serif
  label:   "Inter",              // small caps labels & page numbers
};

// ---------------------------------------------------------------------------
// Image embedding (base64)
// ---------------------------------------------------------------------------
const IMG_DIR = path.join(__dirname, "images");
function imgData(name) {
  const buf = fs.readFileSync(path.join(IMG_DIR, name));
  return "image/png;base64," + buf.toString("base64");
}
const IMG = {
  vine:     imgData("image1.png"),  // Slide 1 - vertical vine
  potTall:  imgData("image2.png"),  // Slide 2 - tall potted plant
  bouquet:  imgData("image3.png"),  // Slide 3 - bouquet (panel i)
  vase:     imgData("image4.png"),  // Slide 3 - low vase   (panel ii)
  arch:     imgData("image5.png"),  // Slide 3 & 6 - floral arch (panel iii)
  trio:     imgData("image6.png"),  // Slide 4 - three bouquets
  potFull:  imgData("image7.png"),  // Slide 5 - full vase
  wreath:   imgData("image8.png"),  // Slide 7 - oval wreath
  garland:  imgData("image9.png"),  // Slide 8 - small garland
};

// ---------------------------------------------------------------------------
// Presentation setup
// ---------------------------------------------------------------------------
const pres = new pptxgen();
pres.author = "Petal & Stem";
pres.title  = "Petal & Stem - An Introduction";

// Custom 20" x 11.25" canvas (matches the source deck exactly)
pres.defineLayout({ name: "FLORIST_20x11_25", width: 20, height: 11.25 });
pres.layout = "FLORIST_20x11_25";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Small caps label (Inter, tracked-out, muted brown)
function addLabel(slide, text, x, y, w, h, opts = {}) {
  slide.addText(text, {
    x, y, w, h,
    fontFace: FONT.label,
    fontSize: opts.fontSize || 18,
    color:    opts.color   || COLOR.muted,
    charSpacing: opts.charSpacing != null ? opts.charSpacing : 5.76,
    align:    opts.align   || "left",
    valign:   opts.valign  || "top",
    margin:   0,
    bold:     false,
  });
}

// Editorial display text. `runs` is an array of { text, italic } pieces.
function addDisplay(slide, runs, x, y, w, h, opts = {}) {
  const arr = runs.map((r, i) => ({
    text: r.text,
    options: {
      italic: !!r.italic,
      fontFace: FONT.display,
      fontSize: opts.fontSize || 69,
      color:    opts.color   || COLOR.ink,
      charSpacing: opts.charSpacing != null ? opts.charSpacing : 0,
      breakLine: i < runs.length - 1 ? false : false, // we keep all runs inline
    },
  }));
  slide.addText(arr, {
    x, y, w, h,
    align:  opts.align  || "left",
    valign: opts.valign || "top",
    margin: 0,
  });
}

// Cormorant Garamond body / supporting text
function addBody(slide, text, x, y, w, h, opts = {}) {
  slide.addText(text, {
    x, y, w, h,
    fontFace: FONT.display,
    fontSize: opts.fontSize || 24,
    color:    opts.color   || COLOR.ink,
    italic:   !!opts.italic,
    align:    opts.align   || "left",
    valign:   opts.valign  || "top",
    margin:   0,
  });
}

// 0.75" thin "rule" used as a divider under titles (rendered as a flat rect).
function addRule(slide, x, y, opts = {}) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y,
    w: opts.w != null ? opts.w : 0.75,
    h: opts.h != null ? opts.h : 0.012,
    fill: { color: opts.color || COLOR.ink },
    line: { type: "none" },
  });
}

// Footer that appears on every interior slide: "Petal & Stem" + "NN / 08"
function addFooter(slide, pageNum) {
  slide.addText(
    [
      { text: "Petal & Stem", options: { italic: true } },
    ],
    {
      x: 1.25, y: 10.25, w: 4, h: 0.42,
      fontFace: FONT.display,
      fontSize: 22.5,
      color: COLOR.ink,
      charSpacing: 0.9,
      margin: 0,
      align: "left",
    }
  );
  slide.addText(`${String(pageNum).padStart(2, "0")} / 08`, {
    x: 17.40, y: 10.28, w: 1.45, h: 0.35,
    fontFace: FONT.label,
    fontSize: 18,
    color: COLOR.muted,
    charSpacing: 5.04,
    align: "left",
    margin: 0,
  });
}

// ---------------------------------------------------------------------------
// SLIDE 1 - Cover
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: COLOR.bg };

  // Top corner labels
  addLabel(s, "EST. 2026",              1.25, 0.83, 2.10, 0.35);
  addLabel(s, "A NEIGHBORHOOD FLORIST", 13.61, 0.83, 5.30, 0.35);

  // Decorative vines down each side. Right vine is mirrored (rotated 180°
  // in the source -> we just flip horizontally here for the same effect).
  s.addImage({ data: IMG.vine, x: 0.625, y: 0.94, w: 3.333, h: 9.375 });
  s.addImage({ data: IMG.vine, x: 16.04, y: 0.94, w: 3.333, h: 9.375, flipH: true });

  // Eyebrow
  addLabel(s, "A NEW FLORIST", 8.16, 3.42, 3.68, 0.38, {
    align: "center", fontSize: 19.5, charSpacing: 8.19,
  });

  // Big wordmark - "Petal & Stem" with Stem in italic.
  // Dimensions match the source deck exactly. PowerPoint will render
  // Cormorant Garamond at 165pt cleanly in this box; previewing on a
  // system without that font installed will show a sans-serif fallback
  // that may wrap, but the .pptx itself is correct.
  addDisplay(
    s,
    [
      { text: "Petal & ", italic: false },
      { text: "Stem",     italic: true  },
    ],
    4.62, 4.48, 10.77, 2.22,
    { fontSize: 165, charSpacing: -4.12, align: "center" }
  );

  // Hairline rule under wordmark
  addRule(s, 9.625, 6.69);

  // Tagline
  addBody(
    s, "Fresh flowers, beautifully arranged.",
    7.34, 7.33, 5.32, 0.55,
    { fontSize: 30, italic: true, color: COLOR.muted, align: "center" }
  );

  // Bottom corner labels
  addLabel(s, "VOL. I",          1.25, 10.11, 1.30, 0.35);
  addLabel(s, "AN INTRODUCTION", 15.19, 10.11, 3.70, 0.35);
}

// ---------------------------------------------------------------------------
// SLIDE 2 - The Idea
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: COLOR.bg };

  addLabel(s, "NO. 01 — THE IDEA", 1.25, 1.04, 18.0, 0.35);

  addDisplay(
    s,
    [
      { text: "A small shop built around " },
      { text: "flowers", italic: true },
      { text: "." },
    ],
    1.25, 4.01, 8.48, 3.06,
    { fontSize: 69, charSpacing: -1.03 }
  );

  addRule(s, 1.25, 7.41);

  addBody(
    s,
    "A place to find a thoughtful bouquet on a Tuesday, an arrangement for the dinner table, or the flowers for a wedding morning.",
    1.25, 7.71, 5.80, 2.04,
    { fontSize: 24 }
  );

  s.addImage({ data: IMG.potTall, x: 11.40, y: 1.86, w: 6.48, h: 8.02 });

  addFooter(s, 2);
}

// ---------------------------------------------------------------------------
// SLIDE 3 - What We Make (3-up grid)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: COLOR.bg };

  addLabel(s, "NO. 02 — WHAT WE MAKE", 1.25, 1.04, 18.0, 0.35);

  addDisplay(
    s,
    [
      { text: "Three ways to bring flowers " },
      { text: "home", italic: true },
      { text: "." },
    ],
    1.25, 1.64, 18.0, 0.96,
    { fontSize: 63, charSpacing: -0.63 }
  );

  // Three cards, each with cream tile + image + roman numeral + label + caption
  const cards = [
    { x: 1.25,   img: IMG.bouquet, num: "i.",   title: "Fresh Bouquets",      caption: "For Tuesdays and table-tops." },
    { x: 7.28,   img: IMG.vase,    num: "ii.",  title: "Custom Arrangements", caption: "For the moments that matter." },
    { x: 13.31,  img: IMG.arch,    num: "iii.", title: "Event Flowers",       caption: "For weddings and gatherings." },
  ];
  cards.forEach(c => {
    // Tile
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: 2.98, w: 5.44, h: 5.13,
      fill: { color: COLOR.card },
      line: { type: "none" },
    });
    // Illustration
    s.addImage({ data: c.img, x: c.x + 0.26, y: 3.24, w: 4.92, h: 4.61 });
    // Roman numeral
    addBody(s, c.num, c.x, 8.38, 5.44, 0.40, {
      fontSize: 21, italic: true, color: COLOR.muted, align: "center",
    });
    // Title
    addBody(s, c.title, c.x, 8.83, 5.44, 0.52, {
      fontSize: 31.5, color: COLOR.ink, align: "center",
    });
    // Caption
    addBody(s, c.caption, c.x, 9.44, 5.44, 0.40, {
      fontSize: 19.5, italic: true, color: COLOR.muted, align: "center",
    });
  });

  addFooter(s, 3);
}

// ---------------------------------------------------------------------------
// SLIDE 4 - Fresh Bouquets (text left, image right)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: COLOR.bg };

  addLabel(s, "I. — A WEEKLY HABIT", 1.25, 2.20, 8.48, 0.35);

  addDisplay(
    s,
    [
      { text: "Fresh " },
      { text: "Bouquets", italic: true },
      { text: "." },
    ],
    1.25, 2.80, 8.48, 2.38,
    { fontSize: 84, charSpacing: -1.68 }
  );

  addRule(s, 1.25, 5.51);

  addBody(
    s,
    "A new selection each week, gathered the morning they arrive. Wrapped in paper, ready to carry home.",
    1.25, 5.81, 6.65, 1.64,
    { fontSize: 25.5 }
  );

  // Three feature stats. The value-cell widths are deliberately a touch wider
  // than the original so values like "Wednesday" and "Petite · Full" stay
  // on a single line under any reasonable font-fallback.
  const stats = [
    { x: 1.25, label: "FROM",     value: "$28",          w: 1.35 },
    { x: 2.80, label: "NEW EACH", value: "Wednesday",    w: 2.30 },
    { x: 5.30, label: "SIZES",    value: "Petite · Full", w: 2.10 },
  ];
  stats.forEach(st => {
    addLabel(s, st.label, st.x, 7.99, st.w, 0.34, { charSpacing: 4.32 });
    addBody(s, st.value, st.x, 8.48, st.w, 0.44, {
      fontSize: 24, italic: true,
    });
  });

  // Image card on right
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.52, y: 1.29, w: 8.23, h: 8.50,
    fill: { color: COLOR.card },
    line: { type: "none" },
  });
  s.addImage({ data: IMG.trio, x: 10.95, y: 1.72, w: 7.38, h: 7.65 });

  addFooter(s, 4);
}

// ---------------------------------------------------------------------------
// SLIDE 5 - Custom Arrangements (image left, text right)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: COLOR.bg };

  // Image card on left
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.25, y: 1.29, w: 8.23, h: 8.50,
    fill: { color: COLOR.card },
    line: { type: "none" },
  });
  s.addImage({ data: IMG.potFull, x: 1.68, y: 1.72, w: 7.38, h: 7.65 });

  addLabel(s, "II. — MADE TO ORDER", 10.52, 2.20, 8.48, 0.35);

  addDisplay(
    s,
    [
      { text: "Custom " },
      { text: "Arrangements", italic: true },
      { text: "." },
    ],
    10.52, 2.80, 8.48, 2.38,
    { fontSize: 84, charSpacing: -1.68 }
  );

  addRule(s, 10.52, 5.51);

  addBody(
    s,
    "Birthdays, anniversaries, a quiet thank you. Tell us the colors, the feeling, the person \u2014 we'll do the rest.",
    10.52, 5.81, 6.65, 1.64,
    { fontSize: 25.5 }
  );

  const stats = [
    { x: 10.52, label: "FROM",        value: "$65",      vw: 1.05 },
    { x: 12.07, label: "ORDER AHEAD", value: "48 hours", vw: 2.52 },
    { x: 15.09, label: "DELIVERY",    value: "Local",    vw: 1.75 },
  ];
  stats.forEach(st => {
    addLabel(s, st.label, st.x, 7.99, st.vw, 0.34, { charSpacing: 4.32 });
    addBody(s, st.value, st.x, 8.48, st.vw, 0.44, {
      fontSize: 24, italic: true,
    });
  });

  addFooter(s, 5);
}

// ---------------------------------------------------------------------------
// SLIDE 6 - Event Flowers (text left, image right)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: COLOR.bg };

  addLabel(s, "III. — FOR THE DAY", 1.25, 2.20, 8.48, 0.35);

  addDisplay(
    s,
    [
      { text: "Event " },
      { text: "Flowers", italic: true },
      { text: "." },
    ],
    1.25, 2.80, 8.48, 2.38,
    { fontSize: 84, charSpacing: -1.68 }
  );

  addRule(s, 1.25, 5.51);

  addBody(
    s,
    "Weddings, dinners, milestones. From a single bridal bouquet to a full venue \u2014 we plan, source, and install with care.",
    1.25, 5.81, 6.65, 1.64,
    { fontSize: 25.5 }
  );

  // Three feature stats - widened columns to keep "Consultation" / "4-8 weeks"
  // from running into each other (in the original they collide visually).
  const stats = [
    { x: 1.25, label: "BEGINS",    value: "Consultation", w: 2.10 },
    { x: 3.55, label: "LEAD TIME", value: "4\u20138 weeks", w: 2.10 },
    { x: 5.85, label: "SCOPE",     value: "Full Service",  w: 2.10 },
  ];
  stats.forEach(st => {
    addLabel(s, st.label, st.x, 7.99, st.w, 0.34, { charSpacing: 4.32 });
    addBody(s, st.value, st.x, 8.48, st.w, 0.44, {
      fontSize: 24, italic: true,
    });
  });

  // Image card on right
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.52, y: 1.29, w: 8.23, h: 8.50,
    fill: { color: COLOR.card },
    line: { type: "none" },
  });
  s.addImage({ data: IMG.arch, x: 10.95, y: 1.72, w: 7.38, h: 7.65 });

  addFooter(s, 6);
}

// ---------------------------------------------------------------------------
// SLIDE 7 - Opening Soon (centered)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: COLOR.bg };

  addLabel(s, "NO. 04 — OPENING SOON", 7.51, 2.34, 4.98, 0.35, {
    align: "center",
  });

  // Centered oval wreath
  s.addImage({ data: IMG.wreath, x: 8.33, y: 3.03, w: 3.33, h: 2.08 });

  // "May 2026" - dimensions match the source deck (auto-fit handles wrap-
  // ping in PowerPoint with Cormorant Garamond installed).
  addDisplay(
    s,
    [
      { text: "May ", italic: false },
      { text: "2026", italic: true },
    ],
    7.25, 5.48, 5.50, 1.67,
    { fontSize: 134, charSpacing: -2.92, align: "center" }
  );

  addRule(s, 9.625, 7.48);

  addBody(
    s, "204 Linden Lane \u00B7 corner of Mulberry & Vine",
    6.99, 8.06, 6.03, 0.47,
    { fontSize: 25.5, italic: true, color: COLOR.muted, align: "center" }
  );

  addFooter(s, 7);
}

// ---------------------------------------------------------------------------
// SLIDE 8 - Stay In Touch (text left, contact card right)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: COLOR.bg };

  addLabel(s, "NO. 05 — STAY IN TOUCH", 1.25, 2.42, 8.48, 0.35);

  addDisplay(
    s,
    [
      { text: "With ",            italic: false },
      { text: "love",             italic: true  },
      { text: ", from the shop.", italic: false },
    ],
    1.25, 3.02, 8.48, 2.21,
    { fontSize: 78, charSpacing: -1.56 }
  );

  addRule(s, 1.25, 5.52);

  addBody(
    s,
    "Pre-orders open the week we do. Drop a line anytime \u2014 we'd love to hear from you.",
    1.25, 5.83, 5.80, 1.04,
    { fontSize: 24 }
  );

  // Decorative garland in bottom-left
  s.addImage({ data: IMG.garland, x: 1.25, y: 7.77, w: 4.92, h: 2.15 });

  // Contact "card" on the right - 5 rows separated by hairline rules
  const rows = [
    { label: "VISIT",   value: "204 Linden Lane",        italic: false },
    { label: "WRITE",   value: "hello@petalandstem.shop", italic: true  },
    { label: "CALL",    value: "(555) 014 \u2014 0286",  italic: false },
    { label: "FOLLOW",  value: "@petalandstem",           italic: true  },
    { label: "HOURS",   value: "Tue \u2013 Sat 9 \u2013 6", italic: false },
  ];
  const rowGap = 0.96;
  const startY = 3.14;            // top hairline
  const labelOffset = 0.36;       // label sits below its top rule
  const valueOffset = 0.26;       // value sits slightly higher
  // Top-most divider
  addRule(s, 10.52, startY, { w: 8.23, color: COLOR.divider });
  rows.forEach((r, i) => {
    const topY = startY + i * rowGap;
    addLabel(s, r.label, 10.52, topY + labelOffset, 1.96, 0.35, {
      charSpacing: 4.68,
    });
    addBody(s, r.value, 12.73, topY + valueOffset, 6.20, 0.49, {
      fontSize: 27, italic: r.italic,
    });
    // Bottom rule for this row
    addRule(s, 10.52, topY + rowGap, { w: 8.23, color: COLOR.divider });
  });

  addFooter(s, 8);
}

// ---------------------------------------------------------------------------
// Write file
// ---------------------------------------------------------------------------
pres.writeFile({ fileName: "Florist_replica.pptx" })
  .then(name => console.log("Wrote", name))
  .catch(err => { console.error(err); process.exit(1); });
