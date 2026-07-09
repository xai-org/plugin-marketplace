/**
 * Water_Polo.pptx replica — built with pptxgenjs
 *
 * Layout: 20" x 11.25" custom (matches original 18288000 x 10287000 EMU)
 * Fonts : Arial throughout
 *
 * Palette:
 *   Navy deep   0A2540  (slide 2,5,7 bg)
 *   Navy darker 061A30  (slide 3 bg)
 *   Navy mid    144B7A  (slide 1,8 bg)
 *   Off-white   F5FBFD  (slide 4,6 bg / primary light text)
 *   Teal accent 00D4C4
 *   Cyan accent 4FD8EB
 *
 * Media: 16 decorative PNGs are read from ./media/ and embedded.
 *
 * Run:    node build_water_polo.js
 * Output: Water_Polo.pptx
 */

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

const MEDIA_DIR = path.join(__dirname, "media");

// ---------- helpers ----------------------------------------------------------

/** Load media/<file> and return a base64 data URI for pptxgenjs. */
function img(file) {
  const buf = fs.readFileSync(path.join(MEDIA_DIR, file));
  return "image/png;base64," + buf.toString("base64");
}

/** Convert an OOXML %-alpha (e.g. 65) to pptxgenjs transparency (0-100). */
const trans = (alphaPct) => 100 - alphaPct;

// Colors -----------------------------------------------------------------------
const C = {
  navyDeep:   "0A2540",
  navyDark:   "061A30",
  navyMid:    "144B7A",
  offWhite:   "F5FBFD",
  teal:       "00D4C4",
  cyan:       "4FD8EB",
};

const FONT = "Arial";

// ---------- presentation setup ----------------------------------------------

const pres = new pptxgen();
pres.defineLayout({ name: "CUSTOM_20x11_25", width: 20, height: 11.25 });
pres.layout = "CUSTOM_20x11_25";
pres.title = "Water Polo 101";
pres.author = "Your Name";

// Fresh shadow factory (pptxgenjs mutates shadow objects in place)
const cardShadow = () => ({
  type: "outer", color: "000000", opacity: 0.18, blur: 8, offset: 3, angle: 90,
});

// =============================================================================
// SLIDE 1 — Title
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.navyMid };

  // Decorative ball (top-right, off slide)
  s.addImage({
    data: img("image-1-1.png"),
    x: 15.0, y: -1.458, w: 6.458, h: 6.458,
    transparency: 5,   // alphaModFix 95000 -> 5% transparent
  });

  // Decorative concentric circles (bottom-left, off slide)
  s.addImage({
    data: img("image-1-2.png"),
    x: -2.291, y: 6.25, w: 9.375, h: 9.375,
    transparency: 50,
  });

  // Top eyebrow
  s.addText("HOMEROOM · A SPORT WORTH KNOWING", {
    x: 1.0417, y: 1.4583, w: 16.874, h: 0.325,
    fontFace: FONT, fontSize: 18, color: C.cyan, charSpacing: 5,
    margin: 0, align: "left",
  });

  // Main title — "WATER POLO" / "101." (stacked two lines)
  s.addText([
    { text: "WATER POLO",
      options: { bold: true, color: C.offWhite, fontSize: 172, fontFace: FONT, charSpacing: -7, breakLine: true } },
    { text: "101.",
      options: { italic: true, color: C.teal,     fontSize: 172, fontFace: FONT, charSpacing: -7 } },
  ], {
    x: 1.0417, y: 2.358, w: 17.5, h: 5.822,
    margin: 0, valign: "top", align: "left", paraSpaceAfter: 0,
  });

  // Bottom-left credit line
  s.addText([
    { text: "PRESENTED BY ",      options: { color: C.offWhite, transparency: trans(65), fontSize: 18, fontFace: FONT, charSpacing: 4 } },
    { text: "YOUR NAME ",         options: { color: C.offWhite,                          fontSize: 18, fontFace: FONT, charSpacing: 4 } },
    { text: "PERIOD 2 · HOMEROOM",options: { color: C.offWhite, transparency: trans(65), fontSize: 18, fontFace: FONT, charSpacing: 4 } },
  ], {
    x: 1.0417, y: 9.296, w: 12.0, h: 0.55,
    margin: 0, align: "left", valign: "top",
  });

  // Bottom-right tagline
  s.addText([
    { text: "EIGHT SLIDES ",      options: { color: C.offWhite,                          fontSize: 18, fontFace: FONT, charSpacing: 4 } },
    { text: "ZERO YAWNS PROMISED",options: { color: C.offWhite, transparency: trans(65), fontSize: 18, fontFace: FONT, charSpacing: 4 } },
  ], {
    x: 11.0, y: 9.296, w: 7.958, h: 0.55,
    margin: 0, align: "right", valign: "top",
  });
}

// =============================================================================
// reusable content-slide chrome (top + bottom labels)
// =============================================================================
function addChrome(s, slideNum, topicUpper, darkLabelBase /* true => dark bg => light label color */) {
  const labelColor = darkLabelBase ? C.offWhite : C.navyDeep;
  s.addText(`${String(slideNum).padStart(2, "0")} / 08`, {
    x: 1.0417, y: 0.625, w: 3.5, h: 0.325,
    fontFace: FONT, fontSize: 18, color: labelColor, transparency: trans(55),
    charSpacing: 3, margin: 0, align: "left",
  });
  s.addText(topicUpper, {
    x: 13.5, y: 0.625, w: 5.5, h: 0.325,
    fontFace: FONT, fontSize: 18, color: labelColor, transparency: trans(55),
    charSpacing: 3, margin: 0, align: "right",
  });
  // Bottom footer: "WATER POLO 101" left, page num right
  s.addText("WATER POLO 101", {
    x: 1.0417, y: 10.446, w: 4.5, h: 0.325,
    fontFace: FONT, fontSize: 18, color: labelColor, charSpacing: 4,
    margin: 0, align: "left",
  });
  s.addText(String(slideNum).padStart(2, "0"), {
    x: 17.0, y: 10.446, w: 2.0, h: 0.325,
    fontFace: FONT, fontSize: 18, color: labelColor, charSpacing: 4,
    margin: 0, align: "right",
  });
}

// =============================================================================
// SLIDE 2 — The Game
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.navyDeep };
  addChrome(s, 2, "THE GAME", true);

  s.addText("CHAPTER 01", {
    x: 1.0417, y: 1.667, w: 9.678, h: 0.325,
    fontFace: FONT, fontSize: 18, color: C.teal, charSpacing: 5, margin: 0, align: "left",
  });

  s.addText([
    { text: "Handball. Soccer. ", options: { bold: true,  color: C.offWhite, fontSize: 84, fontFace: FONT, charSpacing: -3, breakLine: true } },
    { text: "Underwater ",         options: { italic: true, color: C.teal,     fontSize: 84, fontFace: FONT, charSpacing: -3 } },
    { text: "wrestling.",          options: { bold: true,  color: C.offWhite, fontSize: 84, fontFace: FONT, charSpacing: -3 } },
  ], {
    x: 1.0417, y: 2.325, w: 9.678, h: 4.335,
    margin: 0, valign: "top", align: "left", paraSpaceAfter: 0,
  });

  s.addText("Two teams. One ball. A deep pool. No feet touching bottom — ever.", {
    x: 1.0417, y: 7.243, w: 6.867, h: 1.5,
    fontFace: FONT, fontSize: 22, color: C.offWhite, margin: 0, valign: "top",
  });

  // Teal planet illustration
  s.addImage({ data: img("image-2-1.png"), x: 11.885, y: 1.458, w: 6.458, h: 6.458 });
}

// =============================================================================
// SLIDE 3 — The Pool
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.navyDark };
  addChrome(s, 3, "THE POOL", true);

  s.addText("CHAPTER 02", {
    x: 1.0417, y: 1.458, w: 4.658, h: 0.325,
    fontFace: FONT, fontSize: 18, color: C.teal, charSpacing: 5, margin: 0, align: "left",
  });

  s.addText([
    { text: "The field is ", options: { bold: true,  color: C.offWhite, fontSize: 84, fontFace: FONT, charSpacing: -3 } },
    { text: "liquid.",        options: { italic: true, color: C.teal,     fontSize: 84, fontFace: FONT, charSpacing: -3 } },
  ], {
    x: 1.0417, y: 2.116, w: 4.658, h: 3.5,
    margin: 0, valign: "top", align: "left", paraSpaceAfter: 0,
  });

  // Right-side caption
  s.addText([
    { text: "30 meters long. 20 wide. 2m+ deep. ", options: { color: C.offWhite, fontSize: 19.5, fontFace: FONT } },
    { text: "Nobody touches the floor.",            options: { color: C.cyan,     fontSize: 19.5, fontFace: FONT } },
  ], {
    x: 14.443, y: 3.167, w: 4.6, h: 1.2,
    margin: 0, align: "right", valign: "top",
  });

  // Pool diagram (full-width)
  s.addImage({ data: img("image-3-1.png"), x: 1.875, y: 5.184, w: 16.25, h: 4.583 });
}

// =============================================================================
// SLIDE 4 — The Gear (four cards)
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addChrome(s, 4, "THE GEAR", false);

  s.addText("CHAPTER 03", {
    x: 1.0417, y: 1.458, w: 18.454, h: 0.325,
    fontFace: FONT, fontSize: 18, color: C.teal, charSpacing: 5, margin: 0, align: "left",
  });

  s.addText("Four things. That's it.", {
    x: 1.0417, y: 2.116, w: 18.454, h: 2.2,
    fontFace: FONT, fontSize: 84, bold: true, color: C.navyDeep,
    charSpacing: -3, margin: 0, valign: "top", align: "left",
  });

  const cards = [
    { x: 1.0417,  fill: C.navyDeep, labelCol: C.teal,                 titleCol: C.offWhite, descCol: C.offWhite, descAlpha: 65,
      label: "01 / BALL",  title: "Yellow ball.",    desc: "Textured. Floats. One-hand grip.",
      img: "image-4-1.png", imgX: 2.0833, imgY: 6.169, imgW: 2.083, imgH: 2.083 },
    { x: 5.625,   fill: C.teal,     labelCol: C.navyDeep, labelAlpha: 75, titleCol: C.navyDeep, descCol: C.navyDeep, descAlpha: 75,
      label: "02 / CAP",   title: "Numbered cap.",   desc: "Protects ears. Marks the team.",
      img: "image-4-2.png", imgX: 6.5625, imgY: 6.311, imgW: 2.291, imgH: 2.083 },
    { x: 10.2083, fill: C.cyan,     labelCol: C.navyDeep, labelAlpha: 75, titleCol: C.navyDeep, descCol: C.navyDeep, descAlpha: 75,
      label: "03 / SUIT",  title: "Tough suit.",     desc: "Double-stitched. Hard to grab.",
      img: "image-4-3.png", imgX: 11.354, imgY: 6.207, imgW: 1.875, imgH: 2.291 },
    { x: 14.7917, fill: C.navyDeep, labelCol: C.teal,                 titleCol: C.offWhite, descCol: C.offWhite, descAlpha: 65,
      label: "04 / GOAL",  title: "Floating goal.",  desc: "3m wide. 90cm above water.",
      img: "image-4-4.png", imgX: 15.625, imgY: 6.415, imgW: 2.5,   imgH: 1.875 },
  ];

  for (const c of cards) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: c.x, y: 4.992, w: 4.167, h: 5.125,
      fill: { color: c.fill }, line: { color: c.fill, width: 0 },
      rectRadius: 0.12, shadow: cardShadow(),
    });

    // label (e.g. "01 / BALL")
    const labelOpts = { fontFace: FONT, fontSize: 18, color: c.labelCol, charSpacing: 4, margin: 0, align: "left" };
    if (c.labelAlpha !== undefined) labelOpts.transparency = trans(c.labelAlpha);
    s.addText(c.label, { x: c.x + 0.375, y: 5.367, w: 3.8, h: 0.325, ...labelOpts });

    s.addImage({ data: img(c.img), x: c.imgX, y: c.imgY, w: c.imgW, h: c.imgH });

    s.addText(c.title, {
      x: c.x + 0.375, y: 8.772, w: 3.519, h: 0.55,
      fontFace: FONT, fontSize: 21, bold: true, color: c.titleCol, margin: 0, align: "left",
    });
    s.addText(c.desc, {
      x: c.x + 0.375, y: 9.33, w: 3.519, h: 0.75,
      fontFace: FONT, fontSize: 18, color: c.descCol, transparency: trans(c.descAlpha),
      margin: 0, align: "left",
    });
  }
}

// =============================================================================
// SLIDE 5 — The Goal
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.navyDeep };
  addChrome(s, 5, "THE GOAL", true);

  // Shooter + goal illustration (left)
  s.addImage({ data: img("image-5-1.png"), x: 1.891, y: 2.865, w: 7.292, h: 5.833 });

  s.addText("CHAPTER 04", {
    x: 10.866, y: 2.094, w: 8.335, h: 0.325,
    fontFace: FONT, fontSize: 18, color: C.teal, charSpacing: 5, margin: 0, align: "left",
  });

  s.addText([
    { text: "Throw ball. Into ", options: { bold: true,  color: C.offWhite, fontSize: 84, fontFace: FONT, charSpacing: -3 } },
    { text: "net. ",              options: { italic: true, color: C.teal,     fontSize: 84, fontFace: FONT, charSpacing: -3 } },
    { text: "Score one.",         options: { bold: true,  color: C.offWhite, fontSize: 84, fontFace: FONT, charSpacing: -3 } },
  ], {
    x: 10.866, y: 2.752, w: 8.335, h: 3.5,
    margin: 0, valign: "top", align: "left", paraSpaceAfter: 0,
  });

  // Two big stats
  s.addText("1", {
    x: 10.866, y: 6.556, w: 2.85, h: 0.9,
    fontFace: FONT, fontSize: 54, bold: true, color: C.teal, margin: 0, align: "left",
  });
  s.addText("POINT PER GOAL", {
    x: 10.866, y: 7.41, w: 3.4, h: 0.6,
    fontFace: FONT, fontSize: 18, color: C.offWhite, transparency: trans(65),
    charSpacing: 4, margin: 0, align: "left",
  });

  s.addText([
    { text: "4 × 8", options: { bold: true, color: C.teal, fontSize: 54, fontFace: FONT, charSpacing: -2 } },
    { text: "min",   options: { bold: true, color: C.teal, fontSize: 21, fontFace: FONT, charSpacing: -2 } },
  ], {
    x: 14.257, y: 6.556, w: 4.842, h: 0.9,
    margin: 0, align: "left", valign: "bottom",
  });
  s.addText("QUARTERS, RUNNING CLOCK", {
    x: 14.257, y: 7.41, w: 5.5, h: 0.6,
    fontFace: FONT, fontSize: 18, color: C.offWhite, transparency: trans(65),
    charSpacing: 4, margin: 0, align: "left",
  });

  // Thin divider
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.866, y: 8.477, w: 5.417, h: 0.015,
    fill: { color: C.offWhite }, line: { color: C.offWhite, width: 0 },
  });

  s.addText("Most goals at the buzzer wins. No ties at the finals — shootouts decide it.", {
    x: 10.866, y: 8.818, w: 7.5, h: 0.85,
    fontFace: FONT, fontSize: 18, color: C.offWhite, margin: 0, align: "left",
  });
}

// =============================================================================
// SLIDE 6 — The Rules (2 x 3 grid)
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addChrome(s, 6, "THE RULES", false);

  s.addText("CHAPTER 05", {
    x: 1.0417, y: 1.458, w: 9.657, h: 0.325,
    fontFace: FONT, fontSize: 18, color: C.teal, charSpacing: 5, margin: 0, align: "left",
  });

  s.addText([
    { text: "Six rules. ",       options: { bold: true,  color: C.navyDeep, fontSize: 84, fontFace: FONT, charSpacing: -3 } },
    { text: "Don't break them.", options: { italic: true, color: C.teal,     fontSize: 84, fontFace: FONT, charSpacing: -3 } },
  ], {
    x: 1.0417, y: 2.116, w: 11.5, h: 2.5,
    margin: 0, valign: "top", align: "left", paraSpaceAfter: 0,
  });

  // Speech-bubble decoration top-right
  s.addImage({ data: img("image-6-1.png"), x: 17.083, y: 2.388, w: 1.875, h: 1.875 });

  const rules = [
    { n: "01", title: "One hand only.",       desc: "Goalie is the only exception." },
    { n: "02", title: "30-second shot clock.",desc: "Shoot or surrender the ball." },
    { n: "03", title: "No sinking the ball.", desc: "Push it under — turnover." },
    { n: "04", title: "Ordinary foul.",       desc: "Minor grab: free pass awarded." },
    { n: "05", title: "Major foul = 20s out.",desc: "Team plays down a player." },
    { n: "06", title: "Three strikes, ejected.",desc: "Three majors and you're done." },
  ];
  const colXs  = [1.0417, 7.264, 13.486];
  const rowYs  = [4.888, 6.197];

  rules.forEach((r, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const cx = colXs[col], cy = rowYs[row];
    s.addText(r.n, {
      x: cx, y: cy + 0.063, w: 0.55, h: 0.325,
      fontFace: FONT, fontSize: 18, color: C.teal, charSpacing: 2, margin: 0, align: "left",
    });
    s.addText(r.title, {
      x: cx + 0.708, y: cy, w: 4.0, h: 0.45,
      fontFace: FONT, fontSize: 24, bold: true, color: C.navyDeep, margin: 0, align: "left",
    });
    s.addText(r.desc, {
      x: cx + 0.708, y: cy + 0.471, w: 4.0, h: 0.5,
      fontFace: FONT, fontSize: 18, color: C.navyDeep, transparency: trans(65),
      margin: 0, align: "left",
    });
  });
}

// =============================================================================
// SLIDE 7 — The Players (four cards + eggbeater banner)
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.navyDeep };
  addChrome(s, 7, "THE PLAYERS", true);

  s.addText("CHAPTER 06", {
    x: 1.0417, y: 1.458, w: 9.275, h: 0.325,
    fontFace: FONT, fontSize: 18, color: C.teal, charSpacing: 5, margin: 0, align: "left",
  });

  s.addText([
    { text: "Seven in. Each a ", options: { bold: true,  color: C.offWhite, fontSize: 84, fontFace: FONT, charSpacing: -3 } },
    { text: "specialist.",        options: { italic: true, color: C.teal,     fontSize: 84, fontFace: FONT, charSpacing: -3 } },
  ], {
    x: 1.0417, y: 2.116, w: 9.275, h: 2.7,
    margin: 0, valign: "top", align: "left", paraSpaceAfter: 0,
  });

  s.addText("6 field players + 1 goalie. 6 subs wait on deck.", {
    x: 16.1, y: 3.588, w: 2.856, h: 0.9,
    fontFace: FONT, fontSize: 18, color: C.offWhite, transparency: trans(65),
    margin: 0, align: "right", valign: "top",
  });

  const players = [
    { x: 1.0417,  label: "#1 · RED CAP",           title: "Goalie",  desc: "Two hands. Owns the 5m zone.",   img: "image-7-1.png" },
    { x: 5.6042,  label: "#2 · HOLE SET",          title: "Center",  desc: "Parks 2m out. Takes all the hits.", img: "image-7-2.png" },
    { x: 10.1667, label: "#3–#4 · WINGS",          title: "Wings",   desc: "Sharp angles. Quick catches.",   img: "image-7-3.png" },
    { x: 14.7292, label: "#5–#7 · POINT + DRIVERS",title: "Drivers", desc: "Swim. Cut. Shoot from outside.", img: "image-7-4.png" },
  ];

  for (const p of players) {
    // Card: slightly lighter-than-bg fill with thin cyan outline (matches original)
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: p.x, y: 4.847, w: 4.229, h: 3.413,
      fill: { color: "10304A" }, line: { color: C.cyan, width: 1.25 },
      rectRadius: 0.12,
    });
    s.addImage({ data: img(p.img), x: p.x + 0.3, y: 5.147, w: 1.25, h: 1.146 });
    s.addText(p.label, {
      x: p.x + 0.3, y: 6.501, w: 3.738, h: 0.325,
      fontFace: FONT, fontSize: 18, color: C.teal, charSpacing: 4, margin: 0, align: "left",
    });
    s.addText(p.title, {
      x: p.x + 0.3, y: 6.888, w: 3.738, h: 0.45,
      fontFace: FONT, fontSize: 21, bold: true, color: C.offWhite, margin: 0, align: "left",
    });
    s.addText(p.desc, {
      x: p.x + 0.3, y: 7.338, w: 3.738, h: 0.5,
      fontFace: FONT, fontSize: 18, color: C.offWhite, transparency: trans(65),
      margin: 0, align: "left",
    });
  }

  // Eggbeater banner — darker teal background with bright teal left accent bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.0417, y: 8.842, w: 17.917, h: 1.208,
    fill: { color: "0E3F3C" }, line: { color: "0E3F3C", width: 0 },
  });
  // Bright teal left accent bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.0417, y: 8.842, w: 0.08, h: 1.208,
    fill: { color: C.teal }, line: { color: C.teal, width: 0 },
  });
  // Small eggbeater icon
  s.addImage({ data: img("image-7-5.png"), x: 1.442, y: 9.134, w: 0.833, h: 0.625 });

  s.addText([
    { text: "Every player does the ",   options: { color: C.offWhite, fontSize: 19.5, fontFace: FONT } },
    { text: "eggbeater kick ",           options: { color: C.teal,     fontSize: 19.5, fontFace: FONT, bold: true } },
    { text: "— a non-stop treading motion that keeps you high in the water.",
      options: { color: C.offWhite, fontSize: 19.5, fontFace: FONT } },
  ], {
    x: 2.525, y: 9.12, w: 15.8, h: 0.7,
    margin: 0, align: "left", valign: "middle",
  });
}

// =============================================================================
// SLIDE 8 — Why It Rules / closing
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.navyMid };
  addChrome(s, 8, "WHY IT RULES", true);

  // Faint ball in bottom-right (off slide)
  s.addImage({
    data: img("image-8-1.png"),
    x: 14.167, y: 6.667, w: 8.333, h: 8.333,
    transparency: 75,  // alpha 25000 -> 75% transparent
  });

  s.addText("FINAL CHAPTER", {
    x: 1.0417, y: 1.458, w: 18.454, h: 0.325,
    fontFace: FONT, fontSize: 18, color: C.teal, charSpacing: 5, margin: 0, align: "left",
  });

  s.addText([
    { text: "Swim. Wrestle. Throw. ", options: { bold: true,  color: C.offWhite, fontSize: 90, fontFace: FONT, charSpacing: -3 } },
    { text: "Repeat.",                  options: { italic: true, color: C.teal,     fontSize: 90, fontFace: FONT, charSpacing: -3 } },
  ], {
    x: 1.0417, y: 2.116, w: 18.454, h: 2.4,
    margin: 0, valign: "top", align: "left", paraSpaceAfter: 0,
  });

  // Three big stats split by thin verticals
  const statCols = [
    { x: 1.0417, num: [{ text: "3 ", opts: { bold: true, color: C.teal, fontSize: 72, fontFace: FONT, charSpacing: -2 } },
                       { text: "mi",  opts: { color: C.offWhite,       fontSize: 24, fontFace: FONT } }],
      label: "SWUM PER GAME", desc: "Average distance covered by a field player." },
    { x: 7.3555, num: [{ text: "0", opts: { bold: true, color: C.teal, fontSize: 72, fontFace: FONT, charSpacing: -2 } }],
      label: "FEET ON THE FLOOR", desc: "Treading water for 32 straight minutes." },
    { x: 13.328, num: [{ text: "1869", opts: { bold: true, color: C.teal, fontSize: 72, fontFace: FONT, charSpacing: -2 } }],
      label: "YEAR IT WAS INVENTED", desc: "Oldest team sport at the modern Olympics." },
  ];

  for (const col of statCols) {
    s.addText(
      col.num.map(r => ({ text: r.text, options: r.opts })),
      { x: col.x, y: 5.458, w: 5.37, h: 1.1, margin: 0, align: "left", valign: "bottom" }
    );
    s.addText(col.label, {
      x: col.x, y: 6.625, w: 6.0, h: 0.325,
      fontFace: FONT, fontSize: 18, color: C.offWhite, transparency: trans(65),
      charSpacing: 4, margin: 0, align: "left",
    });
    s.addText(col.desc, {
      x: col.x, y: 7.033, w: 4.5, h: 0.9,
      fontFace: FONT, fontSize: 19.5, color: C.offWhite, margin: 0, align: "left",
    });
  }

  // Two vertical dividers between stat columns
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.014, y: 5.042, w: 0.015, h: 3.505,
    fill: { color: C.offWhite }, line: { color: C.offWhite, width: 0 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 12.986, y: 5.042, w: 0.015, h: 3.505,
    fill: { color: C.offWhite }, line: { color: C.offWhite, width: 0 },
  });

  // Horizontal divider above closing line
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.0417, y: 9.047, w: 17.917, h: 0.015,
    fill: { color: C.offWhite }, line: { color: C.offWhite, width: 0 },
  });

  // Closing line left
  s.addText([
    { text: "Now you know. ",    options: { color: C.offWhite, fontSize: 27, fontFace: FONT } },
    { text: "Come to a game.",   options: { color: C.teal,     fontSize: 27, fontFace: FONT } },
  ], {
    x: 1.0417, y: 9.388, w: 9.0, h: 0.95,
    margin: 0, align: "left", valign: "top",
  });

  // Closing question right
  s.addText("QUESTIONS? SERIOUSLY, ASK ME ANYTHING.", {
    x: 9.0, y: 9.42, w: 9.958, h: 0.85,
    fontFace: FONT, fontSize: 18, color: C.offWhite, transparency: trans(65),
    charSpacing: 4, margin: 0, align: "right", valign: "top",
  });
}

// -----------------------------------------------------------------------------
const outPath = path.join(__dirname, "Water_Polo.pptx");
pres.writeFile({ fileName: outPath }).then(f => console.log("Wrote:", f));
