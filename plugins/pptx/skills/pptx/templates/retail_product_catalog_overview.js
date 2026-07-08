// the_lovely_duckling.js
// Recreates "The Lovely Duckling" presentation using pptxgenjs.
//
// Usage:
//   npm install pptxgenjs
//   node the_lovely_duckling.js
//
// Expects an `assets/` folder alongside this file containing:
//   - duck-icon.png
//   - studio.jpeg
//   - classics.jpeg
// These are the images extracted from the original deck.

const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();

// Original deck uses a custom 20" x 11.25" 16:9 canvas
pres.defineLayout({ name: "LD_WIDE", width: 20, height: 11.25 });
pres.layout = "LD_WIDE";
pres.title = "The Lovely Duckling";
pres.author = "The Lovely Duckling";

// ---- Palette (extracted from source) --------------------------------------
const C = {
  navy:       "14232C",  // deep near-black navy (primary dark)
  teal:       "1E5A7A",  // brand teal-navy
  blueMid:    "3E9CC4",  // mid bright blue
  blueSoft:   "7FC5E3",  // soft blue
  blueIce:    "CFE6F1",  // pale ice blue
  blueBg:     "EAF4FA",  // very pale blue background
  creamBg:    "FBF5E4",  // cream background
  sand:       "F3E9CF",  // warm sand
  yellow:     "FFD84D",  // brand yellow
  yellowDeep: "FFC21F",  // deeper yellow
  yellowSoft: "FFE58A",  // soft yellow
  slate:      "3A4A55",  // body-text slate
  white:      "FFFFFF",
  black:      "000000",
};

const FONT_SERIF = "Georgia";
const FONT_MONO  = "Courier New";
const FONT_SANS  = "Arial";

const ASSET = (name) => path.join(__dirname, "assets", name);

// ---------------------------------------------------------------------------
// SLIDE 1 — Hero / title
// ---------------------------------------------------------------------------
(() => {
  const s = pres.addSlide();
  s.background = { color: C.navy };

  // faint decorative dots (simulate low-alpha white via slightly lighter navy)
  const dot = (x, y, d) =>
    s.addShape(pres.shapes.OVAL, {
      x, y, w: d, h: d,
      fill: { color: "2A3B45" }, line: { type: "none" },
    });
  dot(1.2, 1.35, 0.875);
  dot(2.8, 8.325, 0.458);
  dot(17.2, 2.25, 0.604);
  dot(18.4, 6.975, 0.333);

  // Big yellow sun-circle on the right
  s.addShape(pres.shapes.OVAL, {
    x: 10.625, y: 1.562, w: 8.125, h: 8.125,
    fill: { color: C.yellowSoft }, line: { type: "none" },
  });

  // "HERO · THE ORIGINAL" chip inside the circle
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 12.821, y: 5.391, w: 3.733, h: 0.469,
    rectRadius: 0.23,
    fill: { color: C.white }, line: { color: C.navy, width: 1, dashType: "dash" },
  });
  s.addText("HERO · THE ORIGINAL", {
    x: 12.921, y: 5.484, w: 3.532, h: 0.323, margin: 0,
    fontFace: FONT_MONO, fontSize: 12, color: C.navy, align: "center",
    charSpacing: 2,
  });

  // Top-left: duck icon + brand
  s.addImage({ path: ASSET("duck-icon.png"), x: 1.042, y: 1.042, w: 0.583, h: 0.583 });
  s.addText("THE LOVELY DUCKLING", {
    x: 1.812, y: 1.193, w: 4.012, h: 0.323, margin: 0,
    fontFace: FONT_MONO, fontSize: 12, color: C.white, bold: true,
    charSpacing: 2,
  });

  // EST tagline
  s.addText("EST. 2019 · BATH TIME, CURATED", {
    x: 1.042, y: 2.922, w: 11.802, h: 0.37, margin: 0,
    fontFace: FONT_MONO, fontSize: 12, color: C.yellow, charSpacing: 2,
  });

  // Hero headline
  s.addText("Lovely little ducks, delivered.", {
    x: 1.042, y: 3.542, w: 11.802, h: 2.592, margin: 0,
    fontFace: FONT_SERIF, fontSize: 60, color: C.white, italic: true,
  });

  // Sub-description
  s.addText(
    "A small-batch rubber duck shop for collectors, gift-givers, and anyone who thinks bath time deserves a friend.",
    {
      x: 1.042, y: 6.383, w: 7.725, h: 2.242, margin: 0,
      fontFace: FONT_SANS, fontSize: 22, color: C.white,
    }
  );

  // Footer: URL pill
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.042, y: 9.88, w: 3.204, h: 0.536,
    rectRadius: 0.27, fill: { color: C.creamBg }, line: { type: "none" },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 1.229, y: 10.075, w: 0.15, h: 0.15,
    fill: { color: C.yellowDeep }, line: { type: "none" },
  });
  s.addText("thelovelyduckling.com", {
    x: 1.438, y: 9.984, w: 2.704, h: 0.37, margin: 0,
    fontFace: FONT_SANS, fontSize: 12, color: C.navy,
  });

  // Footer: meta pill (outlined)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 4.391, y: 9.88, w: 4.225, h: 0.536,
    rectRadius: 0.27,
    fill: { color: C.navy }, line: { color: C.white, width: 0.75 },
  });
  s.addText("Company overview · Spring 2026", {
    x: 4.579, y: 9.984, w: 3.977, h: 0.37, margin: 0,
    fontFace: FONT_SANS, fontSize: 12, color: C.white,
  });
})();

// ---------------------------------------------------------------------------
// SLIDE 2 — Hello from the tub (intro + 2x2 tiles)
// ---------------------------------------------------------------------------
(() => {
  const s = pres.addSlide();
  s.background = { color: C.creamBg };

  s.addText("HELLO FROM THE TUB", {
    x: 1.042, y: 2.339, w: 9.678, h: 0.37, margin: 0,
    fontFace: FONT_MONO, fontSize: 12, color: C.teal, charSpacing: 2,
  });

  s.addText("We make the little yellow moment of your day.", {
    x: 1.042, y: 2.958, w: 8.154, h: 2.772, margin: 0,
    fontFace: FONT_SERIF, fontSize: 42, color: C.navy, italic: true,
  });

  s.addText(
    "The Lovely Duckling is a family-run shop designing and curating rubber ducks that are nicer than the ones rattling around the bottom of your childhood toy bin.",
    {
      x: 1.042, y: 6.022, w: 7.725, h: 1.954, margin: 0,
      fontFace: FONT_SANS, fontSize: 17, color: C.slate,
    }
  );

  s.addText(
    "Better materials. Softer squeaks. Characters you'd actually want on your shelf.",
    {
      x: 1.042, y: 8.163, w: 7.725, h: 0.998, margin: 0,
      fontFace: FONT_SANS, fontSize: 17, color: C.slate,
    }
  );

  // 2x2 tile grid on the right
  const tile = (x, y, w, h, color) =>
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w, h, rectRadius: 0.2,
      fill: { color }, line: { type: "none" },
    });
  const chip = (x, y, w, text, textColor) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w, h: 0.469, rectRadius: 0.23,
      fill: { color: C.white }, line: { type: "none" },
    });
    s.addText(text, {
      x: x + 0.1, y: y + 0.093, w: w - 0.2, h: 0.323, margin: 0,
      fontFace: FONT_MONO, fontSize: 12, color: textColor, align: "center",
      charSpacing: 2,
    });
  };

  // Top-left tile: studio photo
  tile(11.271, 1.042, 3.74, 4.583, C.blueIce);
  s.addImage({
    path: ASSET("studio.jpeg"),
    x: 11.271, y: 1.042, w: 3.74, h: 4.583,
    sizing: { type: "cover", w: 3.74, h: 4.583 },
  });

  // Top-right tile: sand with "STUDIO SHOT" chip
  tile(15.219, 1.042, 3.74, 4.583, C.sand);
  chip(15.942, 3.099, 2.293, "STUDIO SHOT", C.slate);

  // Bottom-left: yellow with "THEMED FLOCK" chip
  tile(11.271, 5.833, 3.74, 4.583, C.yellowSoft);
  chip(11.904, 7.891, 2.473, "THEMED FLOCK", C.navy);

  // Bottom-right: ice-blue with "GIFT SET" chip
  tile(15.219, 5.833, 3.74, 4.583, C.blueIce);
  chip(16.212, 7.891, 1.753, "GIFT SET", C.teal);
})();

// ---------------------------------------------------------------------------
// SLIDE 3 — Our Story (3-column timeline)
// ---------------------------------------------------------------------------
(() => {
  const s = pres.addSlide();
  s.background = { color: C.blueBg };

  s.addText("OUR STORY", {
    x: 1.042, y: 1.042, w: 18.454, h: 0.37, margin: 0,
    fontFace: FONT_MONO, fontSize: 12, color: C.teal, charSpacing: 2,
  });

  s.addText("From one bathtub to a very happy flock.", {
    x: 1.042, y: 1.62, w: 18.454, h: 1.862, margin: 0,
    fontFace: FONT_SERIF, fontSize: 42, color: C.navy, italic: true,
  });

  const col = (x, yr, head, body) => {
    s.addText(yr, {
      x, y: 4.065, w: 5.865, h: 0.708, margin: 0,
      fontFace: FONT_SERIF, fontSize: 32, color: C.blueMid, italic: true,
    });
    s.addText(head, {
      x, y: 4.94, w: 5.865, h: 0.52, margin: 0,
      fontFace: FONT_SANS, fontSize: 17, color: C.navy, bold: true,
    });
    s.addText(body, {
      x, y: 5.626, w: 5.865, h: 1.9, margin: 0,
      fontFace: FONT_SANS, fontSize: 14, color: C.slate,
    });
  };

  col(1.042, "2019", "A hobby, then a habit.",
    "Started in a kitchen in Brighton, sorting hand-painted ducks into shoeboxes for a weekend market stall."
  );
  col(7.153, "2022", "Designs of our own.",
    "Launched our first original collection — twelve characters drawn on the back of an envelope, still best-sellers today."
  );
  col(13.264, "Today", "A tidy little flock.",
    "Over 140 designs shipped to 32 countries, all from one small studio that still smells faintly of bath foam."
  );
})();

// ---------------------------------------------------------------------------
// SLIDE 4 — The Collection (4 product cards)
// ---------------------------------------------------------------------------
(() => {
  const s = pres.addSlide();
  s.background = { color: C.creamBg };

  s.addText("THE COLLECTION", {
    x: 1.042, y: 1.042, w: 7.2, h: 0.37, margin: 0,
    fontFace: FONT_MONO, fontSize: 12, color: C.teal, charSpacing: 2,
  });
  s.addText("Four ways to bring home a duck.", {
    x: 1.042, y: 1.62, w: 7.2, h: 1.862, margin: 0,
    fontFace: FONT_SERIF, fontSize: 42, color: C.navy, italic: true,
  });
  s.addText(
    "Every duck passes a squeeze test, a float test, and a small-but-serious cuteness review.",
    {
      x: 14.452, y: 1.748, w: 4.506, h: 1.733, margin: 0,
      fontFace: FONT_SANS, fontSize: 14, color: C.slate, align: "right",
    }
  );

  // card builder
  const card = ({
    x, fullColor, topColor,
    chipText, chipColor, chipBg,
    number, title, blurb, textColor, numberColor,
  }) => {
    // full card background (rounded)
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: 4.023, w: 4.292, h: 6.394, rectRadius: 0.2,
      fill: { color: fullColor }, line: { type: "none" },
    });
    // top "image area"
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 4.023, w: 4.292, h: 3.333,
      fill: { color: topColor }, line: { type: "none" },
    });
    // chip
    const chipW = Math.max(2.1, 0.14 * chipText.length + 0.7);
    const chipX = x + (4.292 - chipW) / 2;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: chipX, y: 5.455, w: chipW, h: 0.469, rectRadius: 0.23,
      fill: { color: chipBg }, line: { type: "none" },
    });
    s.addText(chipText, {
      x: chipX, y: 5.549, w: chipW, h: 0.323, margin: 0,
      fontFace: FONT_MONO, fontSize: 12, color: chipColor, align: "center",
      charSpacing: 2,
    });
    // number label
    s.addText(number, {
      x: x + 0.291, y: 7.648, w: 3.82, h: 0.323, margin: 0,
      fontFace: FONT_MONO, fontSize: 12, color: numberColor, charSpacing: 2,
    });
    // title
    s.addText(title, {
      x: x + 0.291, y: 7.992, w: 3.82, h: 0.516, margin: 0,
      fontFace: FONT_SERIF, fontSize: 20, color: textColor, italic: true,
    });
    // blurb
    s.addText(blurb, {
      x: x + 0.291, y: 8.57, w: 3.82, h: 0.887, margin: 0,
      fontFace: FONT_SANS, fontSize: 14, color: textColor,
    });
  };

  card({
    x: 1.042, fullColor: C.yellow, topColor: C.yellowSoft,
    chipText: "CLASSIC · YELLOW", chipColor: C.navy, chipBg: C.white,
    number: "01 — CORE", title: "The Classics",
    blurb: "The one you're picturing. Done properly.",
    textColor: C.navy, numberColor: C.navy,
  });
  card({
    x: 5.583, fullColor: C.blueSoft, topColor: C.blueIce,
    chipText: "CHARACTER FLOCK", chipColor: C.teal, chipBg: C.white,
    number: "02 — CHARACTER", title: "Themed Flocks",
    blurb: "Costumed characters. A whole cast.",
    textColor: C.white, numberColor: C.white,
  });
  card({
    x: 10.125, fullColor: C.sand, topColor: C.sand,
    chipText: "SIZE RANGE", chipColor: C.slate, chipBg: C.white,
    number: "03 — SIZES", title: "Little & Large",
    blurb: "Pocket, palm, and tub-filling.",
    textColor: C.navy, numberColor: C.navy,
  });
  card({
    x: 14.667, fullColor: C.teal, topColor: C.teal,
    chipText: "GIFT BOX", chipColor: C.white, chipBg: C.black,
    number: "04 — GIFTS", title: "Gift Sets",
    blurb: "Curated boxes, ready to give.",
    textColor: C.white, numberColor: C.white,
  });
})();

// ---------------------------------------------------------------------------
// SLIDE 5 — The Classics (yellow hero with circular photo + price chips)
// ---------------------------------------------------------------------------
(() => {
  const s = pres.addSlide();
  s.background = { color: C.yellow };

  // decorative background circles (partially off-slide)
  s.addShape(pres.shapes.OVAL, {
    x: -1.25, y: 7.708, w: 5.417, h: 5.417,
    fill: { color: C.yellowDeep }, line: { type: "none" },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 15.625, y: -2.083, w: 6.458, h: 6.458,
    fill: { color: C.yellowSoft }, line: { type: "none" },
  });

  s.addText("01 · THE CLASSICS", {
    x: 1.042, y: 2.941, w: 8.798, h: 0.37, margin: 0,
    fontFace: FONT_MONO, fontSize: 12, color: C.navy, charSpacing: 2,
  });
  s.addText("The yellow one, but worth keeping.", {
    x: 1.042, y: 3.519, w: 8.798, h: 1.862, margin: 0,
    fontFace: FONT_SERIF, fontSize: 42, color: C.navy, italic: true,
  });
  s.addText(
    "Hand-finished in food-safe natural rubber with a softer squeak and a face we redraw until it's right. Three icons to start, each in three shades of yellow.",
    {
      x: 1.042, y: 5.693, w: 6.652, h: 1.954, margin: 0,
      fontFace: FONT_SANS, fontSize: 17, color: C.navy,
    }
  );

  // Price chips
  const chip = (x, w, text) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: 7.981, w, h: 0.536, rectRadius: 0.27,
      fill: { color: C.creamBg }, line: { type: "none" },
    });
    s.addText(text, {
      x: x + 0.1, y: 8.085, w: w - 0.2, h: 0.37, margin: 0,
      fontFace: FONT_SANS, fontSize: 12, color: C.navy, align: "center",
    });
  };
  chip(1.042, 2.263, "The Original · £9");
  chip(3.45, 2.346, "The Rounder · £11");
  chip(5.942, 2.728, "The Long-Neck · £12");

  // Circular hero photo
  s.addImage({
    path: ASSET("classics.jpeg"),
    x: 11.292, y: 2.333, w: 6.792, h: 6.792,
    rounding: true,
    sizing: { type: "cover", w: 6.792, h: 6.792 },
  });
})();

// ---------------------------------------------------------------------------
// SLIDE 6 — Themed Flocks (6-column grid)
// ---------------------------------------------------------------------------
(() => {
  const s = pres.addSlide();
  s.background = { color: C.creamBg };

  s.addText("02 · THEMED FLOCKS", {
    x: 1.042, y: 1.042, w: 18.454, h: 0.37, margin: 0,
    fontFace: FONT_MONO, fontSize: 12, color: C.teal, charSpacing: 2,
  });
  s.addText("A duck for every kind of person.", {
    x: 1.042, y: 1.62, w: 10, h: 1.862, margin: 0,
    fontFace: FONT_SERIF, fontSize: 42, color: C.navy, italic: true,
  });
  s.addText("Six ongoing flocks, new characters drop every season.", {
    x: 14.881, y: 2.594, w: 4.077, h: 0.887, margin: 0,
    fontFace: FONT_SANS, fontSize: 14, color: C.slate, align: "right",
  });

  // Column builder
  const colBuilder = ({
    x, fullColor, topColor,
    chipText, chipColor, chipBg,
    title, blurb, textColor,
  }) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: 4.023, w: 2.812, h: 6.394, rectRadius: 0.2,
      fill: { color: fullColor }, line: { type: "none" },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 4.023, w: 2.812, h: 4.881,
      fill: { color: topColor }, line: { type: "none" },
    });
    const chipW = Math.max(1.35, 0.13 * chipText.length + 0.5);
    const chipX = x + (2.812 - chipW) / 2;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: chipX, y: 6.229, w: chipW, h: 0.469, rectRadius: 0.23,
      fill: { color: chipBg }, line: { type: "none" },
    });
    s.addText(chipText, {
      x: chipX, y: 6.323, w: chipW, h: 0.323, margin: 0,
      fontFace: FONT_MONO, fontSize: 12, color: chipColor, align: "center",
      charSpacing: 2,
    });
    s.addText(title, {
      x: x + 0.229, y: 9.133, w: 2.438, h: 0.396, margin: 0,
      fontFace: FONT_SERIF, fontSize: 15, color: textColor, italic: true,
    });
    s.addText(blurb, {
      x: x + 0.229, y: 9.488, w: 2.438, h: 0.742, margin: 0,
      fontFace: FONT_SANS, fontSize: 12, color: textColor,
    });
  };

  colBuilder({
    x: 1.042, fullColor: C.blueSoft, topColor: C.blueIce,
    chipText: "SEAFARERS", chipColor: C.teal, chipBg: C.white,
    title: "Seafarers", blurb: "Sailors, pirates, tiny captains.", textColor: C.white,
  });
  colBuilder({
    x: 4.062, fullColor: C.yellow, topColor: C.yellowSoft,
    chipText: "PROFESSIONALS", chipColor: C.navy, chipBg: C.white,
    title: "Professionals", blurb: "Doctors, chefs, the boss duck.", textColor: C.navy,
  });
  colBuilder({
    x: 7.083, fullColor: C.teal, topColor: C.teal,
    chipText: "HOLIDAY", chipColor: C.white, chipBg: C.black,
    title: "Holiday", blurb: "Santa, pumpkin, cupid.", textColor: C.white,
  });
  colBuilder({
    x: 10.104, fullColor: C.sand, topColor: C.sand,
    chipText: "STORYBOOK", chipColor: C.slate, chipBg: C.white,
    title: "Storybook", blurb: "Princes, dragons, small wizards.", textColor: C.navy,
  });
  colBuilder({
    x: 13.125, fullColor: C.yellowDeep, topColor: C.yellowSoft,
    chipText: "SPORTY", chipColor: C.navy, chipBg: C.white,
    title: "Sporty", blurb: "Footballers, yogis, swimmers.", textColor: C.navy,
  });
  colBuilder({
    x: 16.146, fullColor: C.blueMid, topColor: C.blueIce,
    chipText: "RARE BIRDS", chipColor: C.teal, chipBg: C.white,
    title: "Rare Birds", blurb: "Limited runs, numbered editions.", textColor: C.white,
  });
})();

// ---------------------------------------------------------------------------
// SLIDE 7 — Little & Large (4 size cards)
// ---------------------------------------------------------------------------
(() => {
  const s = pres.addSlide();
  s.background = { color: C.blueBg };

  s.addText("03 · LITTLE & LARGE", {
    x: 1.042, y: 1.042, w: 18.454, h: 0.37, margin: 0,
    fontFace: FONT_MONO, fontSize: 12, color: C.teal, charSpacing: 2,
  });
  s.addText("Every size the tub will allow.", {
    x: 1.042, y: 1.62, w: 18.454, h: 1.862, margin: 0,
    fontFace: FONT_SERIF, fontSize: 42, color: C.navy, italic: true,
  });

  const sizeCard = ({ x, bg, size, sizeColor, sizeSize, label, labelColor, desc, descColor, price, priceColor }) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: 4.065, w: 4.26, h: 6.352, rectRadius: 0.2,
      fill: { color: bg }, line: { type: "none" },
    });
    // size number block — height scales with font size
    const sizeH = sizeSize / 72 + 0.3;
    s.addText(size, {
      x: x + 0.365, y: 4.481, w: 3.53, h: sizeH, margin: 0,
      fontFace: FONT_SERIF, fontSize: sizeSize, color: sizeColor, italic: true, align: "center",
    });
    const labelY = 4.481 + sizeH + 0.1;
    s.addText(label, {
      x: x + 0.365, y: labelY, w: 3.53, h: 0.52, margin: 0,
      fontFace: FONT_SANS, fontSize: 17, color: labelColor, bold: true, align: "center",
    });
    s.addText(desc, {
      x: x + 0.365, y: labelY + 0.56, w: 3.53, h: 0.887, margin: 0,
      fontFace: FONT_SANS, fontSize: 14, color: descColor, align: "center",
    });
    s.addText(price, {
      x: x + 0.365, y: labelY + 1.45, w: 3.53, h: 0.323, margin: 0,
      fontFace: FONT_MONO, fontSize: 12, color: priceColor, align: "center", charSpacing: 2,
    });
  };

  sizeCard({
    x: 1.042, bg: C.white, size: '2"', sizeColor: C.blueMid, sizeSize: 54,
    label: "Tiny", labelColor: C.navy,
    desc: "Pocket flocks & party favours.", descColor: C.slate,
    price: "from £4", priceColor: C.teal,
  });
  sizeCard({
    x: 5.594, bg: C.white, size: '3"', sizeColor: C.blueMid, sizeSize: 72,
    label: "Classic", labelColor: C.navy,
    desc: "The one that fits the hand.", descColor: C.slate,
    price: "from £9", priceColor: C.teal,
  });
  sizeCard({
    x: 10.146, bg: C.white, size: '5"', sizeColor: C.blueMid, sizeSize: 90,
    label: "Chonky", labelColor: C.navy,
    desc: "Desk companion, shelf resident.", descColor: C.slate,
    price: "from £18", priceColor: C.teal,
  });
  sizeCard({
    x: 14.698, bg: C.teal, size: '10"', sizeColor: C.yellow, sizeSize: 108,
    label: "The Big One", labelColor: C.white,
    desc: "Tub-filler. Gift-that-lands.", descColor: C.white,
    price: "from £42", priceColor: C.yellow,
  });
})();

// ---------------------------------------------------------------------------
// SLIDE 8 — Gift Sets (text list + image tile)
// ---------------------------------------------------------------------------
(() => {
  const s = pres.addSlide();
  s.background = { color: C.creamBg };

  s.addText("04 · GIFT SETS", {
    x: 1.042, y: 0.835, w: 8.841, h: 0.37, margin: 0,
    fontFace: FONT_MONO, fontSize: 12, color: C.teal, charSpacing: 2,
  });
  s.addText("Pre-packed, pre-loved, ready to give.", {
    x: 1.042, y: 1.413, w: 8.841, h: 2.772, margin: 0,
    fontFace: FONT_SERIF, fontSize: 42, color: C.navy, italic: true,
  });
  s.addText(
    "Curated boxes for new babies, new homes, new hires, and the friend who just needs a duck. Wrapped in recycled paper. A handwritten note if you want one.",
    {
      x: 1.042, y: 4.393, w: 6.867, h: 1.954, margin: 0,
      fontFace: FONT_SANS, fontSize: 17, color: C.slate,
    }
  );

  // List of gift sets
  const row = (y, bold, rest, price) => {
    s.addText(
      [
        { text: bold, options: { bold: true } },
        { text: rest, options: { bold: false } },
      ],
      {
        x: 1.042, y, w: 7.0, h: 0.525, margin: 0,
        fontFace: FONT_SANS, fontSize: 17, color: C.navy,
      }
    );
    s.addText(price, {
      x: 8.3, y, w: 1.5, h: 0.525, margin: 0,
      fontFace: FONT_MONO, fontSize: 17, color: C.teal, align: "right",
    });
  };

  row(6.909, "The Welcome Baby ", "— 3 ducks & a book", "£34");
  s.addShape(pres.shapes.LINE, {
    x: 1.042, y: 7.58, w: 8.583, h: 0,
    line: { color: C.navy, width: 0.5 },
  });
  row(7.924, "The Housewarming ", "— 5 ducks, one big", "£58");
  s.addShape(pres.shapes.LINE, {
    x: 1.042, y: 8.595, w: 8.583, h: 0,
    line: { color: C.navy, width: 0.5 },
  });
  row(8.938, "The Full Flock ", "— 12 ducks, themed", "£96");
  s.addShape(pres.shapes.LINE, {
    x: 1.042, y: 9.609, w: 8.583, h: 0,
    line: { color: C.navy, width: 0.5 },
  });
  row(9.953, "Mystery Monthly ", "— a surprise, subscribed", "£14/mo");

  // Image tile on right
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 11.333, y: 2.396, w: 6.667, h: 6.667, rectRadius: 0.25,
    fill: { color: C.sand }, line: { type: "none" },
  });
  // Label chip centered on tile
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 12.26, y: 5.495, w: 4.813, h: 0.469, rectRadius: 0.23,
    fill: { color: C.white }, line: { type: "none" },
  });
  s.addText("GIFT BOX · 3 DUCKS + NOTE", {
    x: 12.344, y: 5.589, w: 4.645, h: 0.323, margin: 0,
    fontFace: FONT_MONO, fontSize: 12, color: C.slate, align: "center", charSpacing: 2,
  });
})();

// ---------------------------------------------------------------------------
// SLIDE 9 — Customer testimonial on dark navy
// ---------------------------------------------------------------------------
(() => {
  const s = pres.addSlide();
  s.background = { color: C.teal };

  // Giant yellow opening quote mark, top right
  s.addText("\u201C", {
    x: 17.0, y: 0.208, w: 2.5, h: 3.5, margin: 0,
    fontFace: FONT_SERIF, fontSize: 220, color: C.yellow, italic: true,
  });

  s.addText("WHAT CUSTOMERS SAY", {
    x: 1.042, y: 3.144, w: 11.856, h: 0.37, margin: 0,
    fontFace: FONT_MONO, fontSize: 12, color: C.yellow, charSpacing: 2,
  });

  s.addText(
    [
      { text: "I bought one duck on a whim and now I own seventeen. ", options: { color: C.white, breakLine: false } },
      { text: "Send help, or more ducks.", options: { color: C.yellow } },
    ],
    {
      x: 1.042, y: 3.889, w: 13.5, h: 3.5, margin: 0,
      fontFace: FONT_SERIF, fontSize: 44, italic: true,
    }
  );

  // Yellow dot + attribution
  s.addShape(pres.shapes.OVAL, {
    x: 1.042, y: 7.489, w: 0.75, h: 0.75,
    fill: { color: C.yellow }, line: { type: "none" },
  });
  s.addText("Priya R.", {
    x: 2.0, y: 7.413, w: 5.227, h: 0.52, margin: 0,
    fontFace: FONT_SANS, fontSize: 17, color: C.white, bold: true,
  });
  s.addText("Customer since 2023 · 17 ducks strong", {
    x: 2.0, y: 7.892, w: 5.227, h: 0.465, margin: 0,
    fontFace: FONT_SANS, fontSize: 14, color: C.white,
  });

  // Stats bottom-right
  s.addText("4.9", {
    x: 12.467, y: 9.067, w: 3.67, h: 1.042, margin: 0,
    fontFace: FONT_SERIF, fontSize: 48, color: C.yellow, italic: true, align: "right",
  });
  s.addText("avg. review · 2,400+ ratings", {
    x: 11.467, y: 10.067, w: 4.67, h: 0.392, margin: 0,
    fontFace: FONT_SANS, fontSize: 12, color: C.white, align: "right",
  });
  s.addText("32", {
    x: 16.637, y: 9.067, w: 2.321, h: 1.042, margin: 0,
    fontFace: FONT_SERIF, fontSize: 48, color: C.yellow, italic: true, align: "right",
  });
  s.addText("countries shipped to", {
    x: 16.137, y: 10.067, w: 2.821, h: 0.392, margin: 0,
    fontFace: FONT_SANS, fontSize: 12, color: C.white, align: "right",
  });
})();

// ---------------------------------------------------------------------------
// SLIDE 10 — Closing / contact
// ---------------------------------------------------------------------------
(() => {
  const s = pres.addSlide();
  s.background = { color: C.navy };

  // Faint decorative dots (simulate low-alpha white via slightly lighter navy)
  const dot = (x, y, d) =>
    s.addShape(pres.shapes.OVAL, {
      x, y, w: d, h: d,
      fill: { color: "2A3B45" }, line: { type: "none" },
    });
  dot(1.6, 2.025, 1.292);
  dot(4.4, 9.225, 0.625);
  dot(17.208, 3.15, 0.792);
  dot(14.742, 8.767, 0.458);

  s.addText("COME SAY HI", {
    x: 8.351, y: 2.011, w: 3.298, h: 0.37, margin: 0,
    fontFace: FONT_MONO, fontSize: 12, color: C.yellow, align: "center", charSpacing: 2,
  });

  s.addText("Find your duck.", {
    x: 4.28, y: 2.672, w: 11.44, h: 1.708, margin: 0,
    fontFace: FONT_SERIF, fontSize: 80, color: C.white, italic: true, align: "center",
  });

  s.addText(
    "Browse the full flock, build a gift box, or just scroll and see which one looks at you the right way.",
    {
      x: 5.172, y: 4.589, w: 9.656, h: 1.692, margin: 0,
      fontFace: FONT_SANS, fontSize: 22, color: C.white, align: "center",
    }
  );

  // Big white URL pill
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.683, y: 6.864, w: 8.634, h: 1.438, rectRadius: 0.72,
    fill: { color: C.white }, line: { type: "none" },
  });
  s.addText("thelovelyduckling.com", {
    x: 6.137, y: 7.156, w: 7.726, h: 0.896, margin: 0,
    fontFace: FONT_SERIF, fontSize: 36, color: C.navy, italic: true, align: "center",
  });

  // Three small outlined pills
  const pill = (x, w, text) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: 8.885, w, h: 0.562, rectRadius: 0.28,
      fill: { color: C.navy }, line: { color: C.white, width: 0.75 },
    });
    s.addText(text, {
      x: x + 0.1, y: 8.989, w: w - 0.2, h: 0.396, margin: 0,
      fontFace: FONT_SANS, fontSize: 13, color: C.white, align: "center",
    });
  };
  pill(3.796, 4.291, "@thelovelyduckling · Instagram");
  pill(8.295, 4.061, "hello@thelovelyduckling.com");
  pill(12.565, 3.639, "Free UK shipping over £25");

  // Bottom wordmark
  s.addImage({ path: ASSET("duck-icon.png"), x: 7.813, y: 10.292, w: 0.333, h: 0.333 });
  s.addText("THE LOVELY DUCKLING", {
    x: 8.233, y: 10.318, w: 4.012, h: 0.323, margin: 0,
    fontFace: FONT_MONO, fontSize: 12, color: C.white, align: "center", charSpacing: 2,
  });
})();

// ---------------------------------------------------------------------------
pres.writeFile({ fileName: "The_Lovely_Duckling.pptx" }).then((f) =>
  console.log("Wrote:", f)
);
