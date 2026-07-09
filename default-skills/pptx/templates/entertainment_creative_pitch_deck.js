// Recreates Plan_6.pptx — "LEGO BEAST" pitch deck
// Uses pptxgenjs. Slide size: 20" x 11.25" (custom).
const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.defineLayout({ name: "CUSTOM_20x11", width: 20, height: 11.25 });
pres.layout = "CUSTOM_20x11";
pres.author = "Sita";
pres.title = "LEGO BEAST — A PITCH BY SITA";

// --- Palette ---
const C = {
  cream: "FFFDF7",
  dark:  "0F0F14",
  red:   "E6332A",
  yellow:"FFD21E",
  blue:  "2A6BE6",
  green: "2AB14B",
  white: "FFFFFF",
};

const FONT = "Arial";
const SW = 20, SH = 11.25;

// ---------- Helpers ----------
// Draw a LEGO brick (rounded rect base + 4 studs in a slightly skewed 2x2 pattern)
function addBrick(slide, x, y, w, h, color) {
  // base
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, fill: { color }, line: { type: "none" }, rectRadius: Math.min(w, h) * 0.08,
  });
  const s = w * 0.27; // stud diameter
  // studs — skewed 2x2 pattern to give a 3D feel. Positions are fractions of (w, h) from base top-left.
  const positions = [
    [0.215, -0.130],
    [0.631, -0.057],
    [0.163,  0.326],
    [0.579,  0.399],
  ];
  for (const [fx, fy] of positions) {
    slide.addShape(pres.shapes.OVAL, {
      x: x + w * fx, y: y + h * fy, w: s, h: s,
      fill: { color }, line: { type: "none" },
    });
  }
}

// Header dot + slide label (top-left of every content slide)
function addSlideHeader(slide, label, labelColor = C.dark) {
  slide.addShape(pres.shapes.OVAL, {
    x: 1.25, y: 1.145, w: 0.146, h: 0.146,
    fill: { color: labelColor }, line: { type: "none" },
  });
  slide.addText(label, {
    x: 1.542, y: 1.033, w: 6.0, h: 0.4,
    fontFace: FONT, fontSize: 19.5, bold: true, color: labelColor,
    align: "left", valign: "middle", margin: 0,
  });
}

// Footer (left + right)
function addFooter(slide, pageNum, textColor = C.dark) {
  slide.addText("LEGO BEAST — A PITCH BY SITA", {
    x: 1.25, y: 10.55, w: 5.047, h: 0.367,
    fontFace: FONT, fontSize: 18, color: textColor, align: "left", valign: "middle", margin: 0,
  });
  slide.addText(`${String(pageNum).padStart(2, "0")} / 10`, {
    x: 17.525, y: 10.55, w: 1.308, h: 0.367,
    fontFace: FONT, fontSize: 18, color: textColor, align: "right", valign: "middle", margin: 0,
  });
}

// ======================================================================
// SLIDE 1 — COVER
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  // Decorative bricks (top-right, mid-right, and a partial at bottom-left off-slide)
  addBrick(s, 18.229, 0.833, 2.083, 1.667, C.red);
  addBrick(s, 16.354, -0.312, 1.771, 1.417, C.yellow);
  addBrick(s, 17.812, 2.917, 1.458, 1.167, C.blue);
  addBrick(s, 16.146, 2.5,   1.25,  1.0,   C.green);
  addBrick(s, -1.875, 11.958, 1.458, 1.167, C.blue); // off-slide decoration

  // Eyebrow label with blue dot + yellow text on dark bg band
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.25, y: 1.25, w: 5.114, h: 0.602,
    fill: { color: C.dark }, line: { type: "none" },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 1.479, y: 1.478, w: 0.146, h: 0.146,
    fill: { color: C.yellow }, line: { type: "none" },
  });
  s.addText("A PITCH FOR MR. BEAST", {
    x: 1.812, y: 1.367, w: 4.452, h: 0.4,
    fontFace: FONT, fontSize: 19.5, bold: true, color: C.yellow,
    align: "left", valign: "middle", margin: 0,
  });

  // LEGO
  s.addText("LEGO", {
    x: 1.25, y: 1.852, w: 18.025, h: 3.117,
    fontFace: FONT, fontSize: 270, bold: true, color: C.dark,
    align: "left", valign: "middle", margin: 0,
  });
  // BEAST
  s.addText("BEAST", {
    x: 1.25, y: 4.927, w: 18.025, h: 3.117,
    fontFace: FONT, fontSize: 270, bold: true, color: C.red,
    align: "left", valign: "middle", margin: 0,
  });

  // Tagline with yellow highlight on "60 seconds"
  s.addText([
    { text: "Stop-motion brick shorts that re-tell your biggest videos — ", options: {} },
    { text: "60 seconds", options: { highlight: C.yellow } },
    { text: ".", options: {} },
  ], {
    x: 1.25, y: 8.377, w: 15.0, h: 1.233,
    fontFace: FONT, fontSize: 33, color: C.dark,
    align: "left", valign: "top", margin: 0,
  });

  // Author badge
  s.addShape(pres.shapes.OVAL, {
    x: 1.25, y: 10.027, w: 0.583, h: 0.583,
    fill: { color: C.blue }, line: { type: "none" },
  });
  s.addText("S", {
    x: 1.208, y: 10.027, w: 0.667, h: 0.625,
    fontFace: FONT, fontSize: 19.5, bold: true, color: C.white,
    align: "center", valign: "middle", margin: 0,
  });
  s.addText("Pitched by Sita, age 10 · Director & Head of Bricks", {
    x: 2.042, y: 10.129, w: 10.0, h: 0.421,
    fontFace: FONT, fontSize: 21, bold: true, color: C.dark,
    align: "left", valign: "middle", margin: 0,
  });

  addFooter(s, 1);
}

// ======================================================================
// SLIDE 2 — THE SHOW (yellow bg)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.yellow };

  addSlideHeader(s, "SLIDE 02 — THE SHOW", C.dark);

  s.addText("HI, I’M SITA. I BUILT THIS WHOLE DECK OUT OF MY HEAD.", {
    x: 1.25, y: 1.894, w: 17.5, h: 1.942,
    fontFace: FONT, fontSize: 72, bold: true, color: C.dark,
    align: "left", valign: "top", margin: 0,
  });

  s.addText([
    { text: "I watch ", options: {} },
    { text: "every ", options: { bold: true } },
    { text: "one of your videos. I also really, really like bricks. So I had an idea: what if your videos got a ", options: {} },
    { text: "second life ", options: { bold: true } },
    { text: "as tiny stop-motion shorts that kids can watch on repeat?", options: {} },
  ], {
    x: 1.25, y: 4.21, w: 16.0, h: 2.333,
    fontFace: FONT, fontSize: 33, color: C.dark,
    align: "left", valign: "top", margin: 0,
  });

  // Three cards
  const cards = [
    { num: "01", numColor: C.red,   title: "STOP-MOTION",     desc: "Real bricks, frame by frame. Squishy and handmade." },
    { num: "02", numColor: C.blue,  title: "SHORT & LOUD",    desc: "60 seconds. One joke, one twist, one big payoff." },
    { num: "03", numColor: C.green, title: "FOR LITTLE KIDS", desc: "Ages 5–10. Parents can safely press play." },
  ];
  cards.forEach((c, i) => {
    const cx = 1.25 + i * 5.931;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: 7.023, w: 5.639, h: 3.081,
      fill: { color: C.cream }, line: { type: "none" }, rectRadius: 0.1,
    });
    s.addText(c.num, {
      x: cx + 0.458, y: 7.481, w: 4.864, h: 0.792,
      fontFace: FONT, fontSize: 60, color: c.numColor, align: "left", valign: "top", margin: 0,
    });
    s.addText(c.title, {
      x: cx + 0.458, y: 8.335, w: 4.864, h: 0.475,
      fontFace: FONT, fontSize: 24, color: C.dark, align: "left", valign: "middle", margin: 0,
    });
    s.addText(c.desc, {
      x: cx + 0.458, y: 8.915, w: 4.864, h: 0.8,
      fontFace: FONT, fontSize: 19.5, color: C.dark, align: "left", valign: "top", margin: 0,
    });
  });

  addFooter(s, 2);
}

// ======================================================================
// SLIDE 3 — THE IDEA (cream bg)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addSlideHeader(s, "SLIDE 03 — THE IDEA", C.red);

  s.addText([
    { text: "TAKE YOUR ", options: {} },
    { text: "BIGGEST VIDEO ", options: { highlight: C.yellow } },
    { text: ". SHRINK IT TO ", options: {} },
    { text: "60 SECONDS ", options: { color: C.red } },
    { text: "MADE OF ", options: {} },
    { text: "BRICKS", options: { color: C.blue } },
    { text: ".", options: {} },
  ], {
    x: 1.25, y: 1.751, w: 17.0, h: 6.31,
    fontFace: FONT, fontSize: 88.5, bold: true, color: C.dark,
    align: "left", valign: "top", margin: 0,
  });

  s.addText([
    { text: "That’s it. ", options: { bold: true } },
    { text: "Same moments, same chaos — just tiny, and made by hand. Perfect for Shorts, TikTok, and bedtime.", options: {} },
  ], {
    x: 1.25, y: 8.436, w: 16.0, h: 1.2,
    fontFace: FONT, fontSize: 25.5, color: C.dark, align: "left", valign: "top", margin: 0,
  });

  addBrick(s, 16.667, 5.417, 2.083, 1.667, C.red);

  addFooter(s, 3);
}

// ======================================================================
// SLIDE 4 — WHY BRICKS (blue bg)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.blue };
  addSlideHeader(s, "SLIDE 04 — WHY BRICKS", C.yellow);

  s.addText("BRICKS MAKE BIG THINGS FEEL SMALL, AND SMALL THINGS FEEL HUGE.", {
    x: 1.25, y: 1.894, w: 17.0, h: 2.892,
    fontFace: FONT, fontSize: 72, bold: true, color: C.cream,
    align: "left", valign: "top", margin: 0,
  });

  const boxes = [
    { letter: "A", lc: C.red,    title: "KIDS ALREADY LOVE THEM",   desc: "Bricks are the #1 toy on the planet. Your videos + bricks = instant watch." },
    { letter: "B", lc: C.yellow, title: "CHEAPER THAN LIVE-ACTION", desc: "A kitchen table, a phone, patience. No stunts, no travel, no rain delays." },
    { letter: "C", lc: C.green,  title: "REMIX-ABLE FOREVER",       desc: "Same bricks, new story every week. One kit makes 100 shorts." },
    { letter: "D", lc: C.red,    title: "MERCH-READY",              desc: "Kids want the set that was in the video. That’s a whole business." },
  ];
  boxes.forEach((b, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const bx = 1.25 + col * 8.917;
    const by = 5.308 + row * 2.357;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: bx, y: by, w: 8.583, h: 2.023,
      fill: { color: C.cream }, line: { type: "none" }, rectRadius: 0.08,
    });
    s.addText(b.letter, {
      x: bx + 0.458, y: by + 0.417, w: 1.333, h: 0.717,
      fontFace: FONT, fontSize: 54, color: b.lc, align: "left", valign: "middle", margin: 0,
    });
    s.addText(b.title, {
      x: bx + 2.021, y: by + 0.417, w: 6.287, h: 0.5,
      fontFace: FONT, fontSize: 24, color: C.dark, align: "left", valign: "middle", margin: 0,
    });
    s.addText(b.desc, {
      x: bx + 2.021, y: by + 0.875, w: 6.287, h: 1.0,
      fontFace: FONT, fontSize: 19.5, color: C.dark, align: "left", valign: "top", margin: 0,
    });
  });

  addFooter(s, 4, C.cream);
}

// ======================================================================
// SLIDE 5 — HOW IT WORKS (cream bg)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addSlideHeader(s, "SLIDE 05 — HOW IT WORKS", C.blue);

  s.addText("ONE OF YOUR VIDEOS IN. ONE BRICK SHORT OUT.", {
    x: 1.25, y: 1.894, w: 17.167, h: 1.942,
    fontFace: FONT, fontSize: 72, bold: true, color: C.dark,
    align: "left", valign: "top", margin: 0,
  });

  const steps = [
    { n: "1", color: C.red,    step: "STEP 1", title: "PICK A VIDEO",    desc: "Sita’s team picks the juiciest moment from a MrBeast episode." },
    { n: "2", color: C.yellow, step: "STEP 2", title: "STORYBOARD",      desc: "Draw the 10 best shots on paper. Keep the funniest face." },
    { n: "3", color: C.blue,   step: "STEP 3", title: "BUILD & SHOOT",   desc: "Build the set. 12 frames per second. About 720 photos per short." },
    { n: "4", color: C.green,  step: "STEP 4", title: "CUT & POST",      desc: "Add sound effects. Post to MrBeast Shorts. Measure the smiles." },
  ];
  steps.forEach((st, i) => {
    const sx = 1.25 + i * 4.437;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: sx, y: 5.912, w: 4.188, h: 3.033,
      fill: { color: C.cream }, line: { color: "E5E5E0", width: 1 }, rectRadius: 0.1,
    });
    // colored badge circle
    s.addShape(pres.shapes.OVAL, {
      x: sx + 0.354, y: 6.267, w: 0.583, h: 0.583,
      fill: { color: st.color }, line: { type: "none" },
    });
    s.addText(st.n, {
      x: sx + 0.312, y: 6.267, w: 0.667, h: 0.625,
      fontFace: FONT, fontSize: 24, color: C.dark, align: "center", valign: "middle", margin: 0,
    });
    s.addText(st.step, {
      x: sx + 1.083, y: 6.396, w: 1.133, h: 0.367,
      fontFace: FONT, fontSize: 18, bold: true, color: C.dark, align: "left", valign: "middle", margin: 0,
    });
    s.addText(st.title, {
      x: sx + 0.354, y: 7.058, w: 3.584, h: 0.5,
      fontFace: FONT, fontSize: 27, color: C.dark, align: "left", valign: "middle", margin: 0,
    });
    s.addText(st.desc, {
      x: sx + 0.354, y: 7.579, w: 3.584, h: 1.2,
      fontFace: FONT, fontSize: 18, color: C.dark, align: "left", valign: "top", margin: 0,
    });
  });

  // Bottom dark bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.25, y: 9.363, w: 17.5, h: 0.742,
    fill: { color: C.dark }, line: { type: "none" },
  });
  s.addText("TOTAL TIME PER SHORT", {
    x: 1.542, y: 9.571, w: 3.605, h: 0.367,
    fontFace: FONT, fontSize: 18, bold: true, color: C.cream, align: "left", valign: "middle", margin: 0,
  });
  const totals = [
    { y: "2 DAYS ", w: "BUILD",  x: 8.458 },
    { y: "3 DAYS ", w: "SHOOT",  x: 10.975 },
    { y: "1 DAY ",  w: "EDIT",   x: 13.492 },
  ];
  totals.forEach(t => {
    s.addText([
      { text: t.y, options: { color: C.yellow } },
      { text: t.w, options: { color: C.cream } },
    ], { x: t.x, y: 9.571, w: 2.3, h: 0.367, fontFace: FONT, fontSize: 18, bold: true, align: "left", valign: "middle", margin: 0 });
  });
  s.addText([
    { text: "= ", options: { color: C.cream } },
    { text: "1 SHORT / WEEK", options: { color: C.yellow } },
  ], { x: 15.658, y: 9.571, w: 2.884, h: 0.367, fontFace: FONT, fontSize: 18, bold: true, align: "left", valign: "middle", margin: 0 });

  addFooter(s, 5);
}

// ======================================================================
// SLIDE 6 — SAMPLE EPISODE (cream bg)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addSlideHeader(s, "SLIDE 06 — A SAMPLE EPISODE", C.green);

  s.addText("EXAMPLE: YOUR ISLAND EPISODE — IN BRICKS.", {
    x: 1.25, y: 1.894, w: 18.025, h: 1.942,
    fontFace: FONT, fontSize: 72, bold: true, color: C.dark,
    align: "left", valign: "top", margin: 0,
  });

  s.addText([
    { text: "Imaginary short titled ", options: {} },
    { text: "“Last Brick On The Island.” ", options: { bold: true } },
    { text: "60 seconds, six beats.", options: {} },
  ], {
    x: 1.25, y: 4.002, w: 17.0, h: 0.6,
    fontFace: FONT, fontSize: 25.5, color: C.dark, align: "left", valign: "top", margin: 0,
  });

  const beats = [
    { n: "01", t: "0:00", txt: "HOOK: 10 BRICKS STRANDED ON AN ISLAND.",     outer: C.white,  inner: C.red,    textColor: C.dark, brick: C.red   },
    { n: "02", t: "0:08", txt: "RULES: LAST BRICK LEFT WINS.",               outer: C.white,  inner: C.yellow, textColor: C.dark, brick: C.yellow},
    { n: "03", t: "0:20", txt: "FIRST TWIST: COCONUT CATAPULT.",             outer: C.white,  inner: C.blue,   textColor: C.dark, brick: C.blue  },
    { n: "04", t: "0:32", txt: "ALLIANCE — TWO BRICKS TEAM UP.",             outer: C.white,  inner: C.green,  textColor: C.dark, brick: C.green },
    { n: "05", t: "0:44", txt: "BETRAYAL! RED BRICK PUSHES BLUE BRICK.",     outer: C.white,  inner: C.red,    textColor: C.dark, brick: C.red   },
    { n: "06", t: "0:55", txt: "WINNER: YELLOW BRICK. PRIZE DROPS FROM SKY.",outer: C.yellow, inner: C.dark,   textColor: C.cream,brick: C.dark  },
  ];
  beats.forEach((b, i) => {
    const bx = 1.25 + i * 2.948;
    // outer frame
    s.addShape(pres.shapes.RECTANGLE, {
      x: bx, y: 6.424, w: 2.76, h: 3.68,
      fill: { color: b.outer }, line: { type: "none" },
    });
    // inner colored card
    s.addShape(pres.shapes.RECTANGLE, {
      x: bx + 0.042, y: 6.465, w: 2.677, h: 3.597,
      fill: { color: b.inner }, line: { type: "none" },
    });
    // dark label pill for the "01" number
    s.addShape(pres.shapes.RECTANGLE, {
      x: bx + 0.229, y: 6.653, w: 0.558, h: 0.408,
      fill: { color: C.dark }, line: { type: "none" },
    });
    s.addText(b.n, {
      x: bx + 0.333, y: 6.695, w: 0.433, h: 0.367,
      fontFace: FONT, fontSize: 18, bold: true, color: C.cream, align: "left", valign: "middle", margin: 0,
    });
    s.addText(b.t, {
      x: bx + 1.831, y: 6.695, w: 0.783, h: 0.367,
      fontFace: FONT, fontSize: 18, bold: true, color: b.textColor, align: "left", valign: "middle", margin: 0,
    });
    s.addText(b.txt, {
      x: bx + 0.229, y: 8.792, w: 2.385, h: 1.125,
      fontFace: FONT, fontSize: 19.5, color: b.textColor, align: "left", valign: "top", margin: 0,
    });
    // decorative brick at bottom-right inside the card
    addBrick(s, bx + 1.615, 8.583, 0.938, 0.75, b.brick);
  });

  addFooter(s, 6);
}

// ======================================================================
// SLIDE 7 — WHAT YOU GET (red bg)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.red };
  addSlideHeader(s, "SLIDE 07 — WHAT YOU GET", C.yellow);

  s.addText("WHY THIS IS A GOOD DEAL FOR YOU.", {
    x: 1.25, y: 1.894, w: 17.167, h: 1.942,
    fontFace: FONT, fontSize: 72, bold: true, color: C.cream,
    align: "left", valign: "top", margin: 0,
  });

  const stats = [
    { big: "52",   lbl: "SHORTS PER YEAR",   desc: "One a week. Built to feed Shorts & TikTok." },
    { big: "5–10", lbl: "AUDIENCE AGE",      desc: "A younger audience you don’t fully reach yet." },
    { big: "0",    lbl: "NEW VIDEOS NEEDED", desc: "I remix episodes you already shot. No extra work for you." },
  ];
  stats.forEach((st, i) => {
    const sx = 1.25 + i * 5.931;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: sx, y: 5.542, w: 5.639, h: 3.308,
      fill: { color: C.cream }, line: { type: "none" }, rectRadius: 0.1,
    });
    s.addText(st.big, {
      x: sx + 0.458, y: 5.958, w: 4.864, h: 1.233,
      fontFace: FONT, fontSize: 97.5, color: C.dark, align: "left", valign: "middle", margin: 0,
    });
    s.addText(st.lbl, {
      x: sx + 0.458, y: 7.275, w: 4.864, h: 0.421,
      fontFace: FONT, fontSize: 21, color: C.dark, align: "left", valign: "middle", margin: 0,
    });
    s.addText(st.desc, {
      x: sx + 0.458, y: 7.758, w: 4.864, h: 0.8,
      fontFace: FONT, fontSize: 18, color: C.dark, align: "left", valign: "top", margin: 0,
    });
  });

  // Dark summary bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.25, y: 9.183, w: 17.5, h: 0.921,
    fill: { color: C.dark }, line: { type: "none" },
  });
  const tags = [
    { t: "SHORTS FEED",          x: 1.625, w: 2.8 },
    { t: "MERCH LANE",           x: 5.871, w: 2.7 },
    { t: "YOUNGER FANS",         x: 9.955, w: 3.1 },
    { t: "A GREAT STORY TO TELL",x: 14.45, w: 4.2 },
  ];
  tags.forEach(tg => {
    s.addText([
      { text: "+ ", options: { color: C.yellow } },
      { text: tg.t, options: { color: C.cream } },
    ], { x: tg.x, y: 9.454, w: tg.w, h: 0.421, fontFace: FONT, fontSize: 21, align: "left", valign: "middle", margin: 0 });
  });

  addFooter(s, 7, C.cream);
}

// ======================================================================
// SLIDE 8 — PILOT PLAN (cream bg)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addSlideHeader(s, "SLIDE 08 — PILOT PLAN", C.red);

  s.addText("A 12-WEEK PILOT. 3 SHORTS. ONE CLEAR TEST.", {
    x: 1.25, y: 1.7, w: 17.167, h: 2.0,
    fontFace: FONT, fontSize: 60, bold: true, color: C.dark,
    align: "left", valign: "top", margin: 0,
  });

  // Outer card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.25, y: 3.819, w: 17.5, h: 5.179,
    fill: { color: C.cream }, line: { color: C.dark, width: 1 }, rectRadius: 0.08,
  });

  // Gantt rows
  const rows = [
    { label: "PRE-PRODUCTION",         color: C.yellow, span: [1, 2] },
    { label: "SHORT #1 — “ISLAND”",    color: C.red,    span: [3, 6] },
    { label: "SHORT #2 — “MAZE”",      color: C.blue,   span: [5, 8] },
    { label: "SHORT #3 — “CHOCOLATE”", color: C.green,  span: [8, 11] },
    { label: "POST & PREMIERE",        color: null,     span: [] },
  ];

  // Header row
  s.addText("WORKSTREAM", {
    x: 1.583, y: 4.152, w: 2.792, h: 0.367,
    fontFace: FONT, fontSize: 18, bold: true, color: C.dark, align: "left", valign: "middle", margin: 0,
  });
  for (let w = 1; w <= 12; w++) {
    s.addText(`W${w}`, {
      x: 4.312 + (w - 1) * 1.177, y: 4.152, w: 1.198, h: 0.367,
      fontFace: FONT, fontSize: 18, bold: true, color: C.dark, align: "left", valign: "middle", margin: 0,
    });
  }
  // horizontal separator under header
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.583, y: 4.623, w: 16.833, h: 0.017, fill: { color: C.dark }, line: { type: "none" },
  });

  // Data rows
  const rowYs = [4.852, 5.619, 6.385, 7.152, 8.11];
  const barYs = [4.785, 5.552, 6.319, 7.181, 8.044];
  rows.forEach((r, ri) => {
    s.addText(r.label, {
      x: 1.583, y: rowYs[ri], w: 2.792, h: 0.6,
      fontFace: FONT, fontSize: 18, color: C.dark, align: "left", valign: "middle", margin: 0,
    });
    // bars / ticks — 12 weeks
    for (let w = 1; w <= 12; w++) {
      const bx = 4.354 + (w - 1) * 1.177;
      const inSpan = r.span.length && w >= r.span[0] && w <= r.span[1];
      const fill = inSpan ? r.color : C.dark;
      if (inSpan) {
        s.addShape(pres.shapes.RECTANGLE, {
          x: bx, y: barYs[ri], w: 1.115, h: 0.458,
          fill: { color: fill }, line: { type: "none" },
        });
      } else {
        // small tick (thin vertical bar centered in the cell)
        s.addShape(pres.shapes.RECTANGLE, {
          x: bx + 0.54, y: barYs[ri] + 0.15, w: 0.035, h: 0.158,
          fill: { color: C.dark }, line: { type: "none" },
        });
      }
    }
    // row separator
    if (ri < rows.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 1.583, y: rowYs[ri] + 0.538, w: 16.833, h: 0.017,
        fill: { color: C.dark }, line: { type: "none" },
      });
    }
  });

  // Bottom statement with yellow highlight
  s.addText([
    { text: "The test: ", options: { bold: true } },
    { text: "do the 3 shorts hit ", options: {} },
    { text: "10M combined views ", options: { highlight: C.yellow } },
    { text: "in 30 days? If yes, we scale to weekly.", options: {} },
  ], {
    x: 1.25, y: 9.29, w: 17.167, h: 0.6,
    fontFace: FONT, fontSize: 25.5, color: C.dark, align: "left", valign: "top", margin: 0,
  });

  addFooter(s, 8);
}

// ======================================================================
// SLIDE 9 — THE ASK (dark bg)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.dark };
  addSlideHeader(s, "SLIDE 09 — THE ASK", C.yellow);

  s.addText("$25K", {
    x: 1.25, y: 2.058, w: 10.5, h: 4.225,
    fontFace: FONT, fontSize: 240, color: C.yellow,
    align: "left", valign: "middle", margin: 0,
  });
  s.addText("to fund the pilot", {
    x: 11.0, y: 4.496, w: 7.75, h: 0.875,
    fontFace: FONT, fontSize: 60, bold: true, color: C.cream,
    align: "left", valign: "middle", margin: 0,
  });

  s.addText([
    { text: "Enough for a ", options: {} },
    { text: "set of bricks", options: { bold: true } },
    { text: ", a ", options: {} },
    { text: "camera and lights", options: { bold: true } },
    { text: ", a ", options: {} },
    { text: "sound + editing kit", options: { bold: true } },
    { text: ", and a tiny crew of ", options: {} },
    { text: "two grown-ups who know what they’re doing ", options: { bold: true } },
    { text: "so I can still do my homework.", options: {} },
  ], {
    x: 1.25, y: 6.079, w: 17.5, h: 1.5,
    fontFace: FONT, fontSize: 25.5, color: C.cream, align: "left", valign: "top", margin: 0,
  });

  // Budget allocation — 4 blocks, first wider
  const budget = [
    { pct: "40%", lbl: "CREW (GROWN-UPS)", amt: "$10,000", color: C.red,    x: 1.25,   w: 5.121 },
    { pct: "30%", lbl: "BRICKS & SETS",    amt: "$7,500",  color: C.yellow, x: 6.558,  w: 3.939 },
    { pct: "20%", lbl: "CAMERA + LIGHTS",  amt: "$5,000",  color: C.blue,   x: 10.685, w: 3.939 },
    { pct: "10%", lbl: "SOUND + EDIT",     amt: "$2,500",  color: C.green,  x: 14.811, w: 3.939 },
  ];
  budget.forEach(b => {
    // light cream block
    s.addShape(pres.shapes.RECTANGLE, {
      x: b.x, y: 8.235, w: b.w, h: 1.869,
      fill: { color: C.cream }, line: { type: "none" },
    });
    // colored left edge
    s.addShape(pres.shapes.RECTANGLE, {
      x: b.x, y: 8.235, w: 0.1, h: 1.869,
      fill: { color: b.color }, line: { type: "none" },
    });
    s.addText(b.pct, {
      x: b.x + 0.371, y: 8.485, w: b.w - 0.5, h: 0.567,
      fontFace: FONT, fontSize: 42, color: b.color, align: "left", valign: "middle", margin: 0,
    });
    s.addText(b.lbl, {
      x: b.x + 0.371, y: 9.115, w: b.w - 0.5, h: 0.394,
      fontFace: FONT, fontSize: 19.5, color: C.dark, align: "left", valign: "middle", margin: 0,
    });
    s.addText(b.amt, {
      x: b.x + 0.371, y: 9.529, w: b.w - 0.5, h: 0.367,
      fontFace: FONT, fontSize: 18, color: C.dark, align: "left", valign: "middle", margin: 0,
    });
  });

  addFooter(s, 9, C.cream);
}

// ======================================================================
// SLIDE 10 — LET'S BUILD IT. (green bg)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.green };

  // Decorative bricks
  addBrick(s, 0.208,  0.417, 1.25,  1.0,   C.red);
  addBrick(s, 2.083, -0.625, 1.458, 1.167, C.yellow);
  addBrick(s, 18.229, 0.312, 1.146, 0.917, C.yellow);
  addBrick(s, 18.958, 2.292, 1.458, 1.167, C.red);

  s.addText([
    { text: "LET’S BUILD ", options: { color: C.cream } },
    { text: "IT.", options: { color: C.dark } },
  ], {
    x: 1.25, y: 1.706, w: 17.0, h: 4.292,
    fontFace: FONT, fontSize: 180, bold: true, align: "left", valign: "middle", margin: 0,
  });

  s.addText([
    { text: "I already have a storyboard for short #1, a shoebox set, and two very patient parents. I just need a ", options: {} },
    { text: "yes", options: { bold: true } },
    { text: ".", options: {} },
  ], {
    x: 1.25, y: 6.373, w: 16.0, h: 1.5,
    fontFace: FONT, fontSize: 33, color: C.cream, align: "left", valign: "top", margin: 0,
  });

  // Contact card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.25, y: 8.688, w: 17.5, h: 1.417,
    fill: { color: C.cream }, line: { type: "none" }, rectRadius: 0.1,
  });
  s.addShape(pres.shapes.OVAL, {
    x: 1.667, y: 9.021, w: 0.75, h: 0.75,
    fill: { color: C.blue }, line: { type: "none" },
  });
  s.addText("S", {
    x: 1.625, y: 9.021, w: 0.833, h: 0.792,
    fontFace: FONT, fontSize: 25.5, color: C.white, align: "center", valign: "middle", margin: 0,
  });
  s.addText("SITA", {
    x: 2.646, y: 9.035, w: 4.337, h: 0.396,
    fontFace: FONT, fontSize: 25.5, color: C.dark, align: "left", valign: "middle", margin: 0,
  });
  s.addText("Director & Head of Bricks, Lego Beast", {
    x: 2.646, y: 9.431, w: 6.0, h: 0.367,
    fontFace: FONT, fontSize: 18, color: C.dark, align: "left", valign: "middle", margin: 0,
  });
  s.addText("SITA@LEGOBEAST.KID   REPLY BEFORE BEDTIME, PLEASE", {
    x: 10.0, y: 9.021, w: 8.5, h: 0.792,
    fontFace: FONT, fontSize: 18, bold: true, color: C.dark, align: "right", valign: "middle", margin: 0,
  });

  addFooter(s, 10);
}

// ---- Write ----
pres.writeFile({ fileName: "/home/assets/Plan_6_recreated.pptx" })
  .then(f => console.log("Wrote:", f));
