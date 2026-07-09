// canterbury.js - Faithful pptxgenjs recreation of Canterbury.pptx
// Usage: node canterbury.js  (requires ./images/ folder with the 14 PNGs)

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.defineLayout({ name: "CANTERBURY", width: 20, height: 11.25 });
pres.layout = "CANTERBURY";
pres.author = "Spencer";
pres.title = "The Canterbury Tales";

// ---------- palette ----------
const C = {
  burgundyBg: "4A1520",
  creamBg:    "F2E9D8",
  greenBg:    "1B2A1C",
  gold:       "B8923A",
  burgundy:   "6B1F2E",
  dark:       "1A1512",
  cream:      "F2E9D8",
  white:      "FFFFFF",
};

// alpha (0..1) -> pptxgenjs transparency (0..100)
const tr = (alpha) => Math.round((1 - alpha) * 100);

// Draw the thin border rect present on every slide
function addBorder(slide, lineColor) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.458, y: 0.458, w: 19.083, h: 10.333,
    fill: { type: "none" },
    line: { color: lineColor, width: 0.6, transparency: tr(0.22), dashType: "solid" },
  });
}

// Convenience: standard text box defaults
function T(slide, text, opts) {
  slide.addText(text, Object.assign({
    fontFace: "Arial",
    margin: 0.02,
    valign: "top",
    isTextBox: true,
    shrinkText: true,
  }, opts));
}

// Header labels (top-left chapter, top-right "N OF VIII")
function addHeader(slide, left, right, accentColor) {
  T(slide, left, {
    x: 1.042, y: 1.042, w: 6.6, h: 0.35,
    fontSize: 19.5, charSpacing: 5.85, color: accentColor, align: "left",
  });
  // right-aligned to slide edge
  T(slide, right, {
    x: 16.6, y: 1.042, w: 2.45, h: 0.35,
    fontSize: 19.5, charSpacing: 5.85, color: accentColor, align: "right",
  });
}

// Thin horizontal divider (tiny-height filled rectangle)
function divider(slide, x, y, w, color = C.gold, alpha = 0.5) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: 0.02,
    fill: { color, transparency: tr(alpha) },
    line: { type: "none" },
  });
}

// ===================================================================
// SLIDE 1 — Title
// ===================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.burgundyBg };
  addBorder(s, C.gold);

  T(s, "M · CCC · LXXXVII", {
    x: 1.042, y: 1.042, w: 3.81, h: 0.35,
    fontSize: 19.5, charSpacing: 5.85, color: C.gold, align: "left",
  });
  T(s, "ENGLISH LITERATURE SOPHOMORE PRESENTATION", {
    x: 8.179, y: 1.042, w: 11.103, h: 0.35,
    fontSize: 19.5, charSpacing: 5.85, color: C.gold, align: "left",
  });
  T(s, "A MEDIEVAL MASTERWORK", {
    x: 1.042, y: 1.717, w: 10.5, h: 0.6,
    fontSize: 19.5, charSpacing: 6.24, color: C.gold, transparency: tr(0.7), align: "left",
  });
  T(s, "The Canterbury Tales", {
    x: 1.042, y: 2.458, w: 8.736, h: 5.187,
    fontSize: 126, charSpacing: -1.26, color: C.cream, align: "left",
  });

  divider(s, 1.042, 8.21, 2.343);
  T(s, "✦", {
    x: 3.573, y: 8.02, w: 0.438, h: 0.433,
    fontSize: 21, charSpacing: 8.4, color: C.gold, align: "left",
  });
  divider(s, 4.115, 8.21, 2.343);

  T(s, "by Geoffrey Chaucer", {
    x: 1.042, y: 8.828, w: 8.736, h: 0.497,
    fontSize: 28.5, italic: true, color: C.gold, align: "left",
  });

  s.addImage({
    path: "images/image-1-1.png",
    x: 11.741, y: 1.885, w: 5.833, h: 7.229,
  });

  s.addText([
    { text: "PRESENTED BY — ", options: { fontSize: 19.5, charSpacing: 5.85, color: C.gold } },
    { text: "[YOUR NAME]",    options: { fontSize: 21,   charSpacing: 5.85, color: C.gold, italic: true } },
  ], {
    x: 1.042, y: 9.858, w: 8.5, h: 0.392,
    fontFace: "Arial", margin: 0.02, valign: "top", align: "left", isTextBox: true, shrinkText: true,
  });

  T(s, "I OF VIII", {
    x: 17.219, y: 9.879, w: 1.823, h: 0.35,
    fontSize: 19.5, charSpacing: 5.85, color: C.gold, align: "left",
  });
}

// ===================================================================
// SLIDE 2 — The Poet
// ===================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.creamBg };
  addBorder(s, C.burgundy);

  T(s, "I · THE POET", {
    x: 1.042, y: 1.042, w: 2.724, h: 0.35,
    fontSize: 19.5, charSpacing: 5.85, color: C.burgundy, align: "left",
  });
  T(s, "II OF VIII", {
    x: 17.062, y: 1.042, w: 1.979, h: 0.35,
    fontSize: 19.5, charSpacing: 5.85, color: C.burgundy, align: "left",
  });

  s.addImage({ path: "images/image-2-1.png", x: 2.917, y: 3.019, w: 4.583, h: 5.417 });

  T(s, "C. 1343 — 1400", {
    x: 10.625, y: 2.162, w: 8.583, h: 0.45,
    fontSize: 19.5, charSpacing: 6.24, color: C.burgundy, transparency: tr(0.7), align: "left",
  });
  T(s, "Geoffrey Chaucer", {
    x: 10.625, y: 2.862, w: 8.583, h: 2.247,
    fontSize: 81, charSpacing: -0.81, color: C.burgundy, align: "left",
  });

  divider(s, 10.625, 5.632, 7.791);
  T(s, "✦", {
    x: 18.604, y: 5.442, w: 0.438, h: 0.433,
    fontSize: 21, charSpacing: 8.4, color: C.gold, align: "left",
  });

  T(s, "Diplomat, courtier, customs officer — and the first great poet to write in English.", {
    x: 10.625, y: 6.208, w: 5.794, h: 1.623,
    fontSize: 33, italic: true, color: C.dark, align: "left",
  });

  // Three stat columns (widened value boxes so text fits on one line)
  const stats = [
    { label: "ERA",      value: "Late Middle Ages", x: 10.625, wL: 2.517, wV: 3.0 },
    { label: "LANGUAGE", value: "Middle English",   x: 13.9,   wL: 2.181, wV: 2.6 },
    { label: "WRITTEN",  value: "1387 – 1400",      x: 16.8,   wL: 1.696, wV: 2.3 },
  ];
  for (const st of stats) {
    T(s, st.label, {
      x: st.x, y: 8.373, w: st.wL, h: 0.421,
      fontSize: 19.5, charSpacing: 3.9, color: C.burgundy, align: "left",
    });
    T(s, st.value, {
      x: st.x, y: 8.814, w: st.wV, h: 0.52,
      fontSize: 25.5, color: C.white, align: "left",
    });
  }
}

// ===================================================================
// SLIDE 3 — The Frame
// ===================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.greenBg };
  addBorder(s, C.gold);

  T(s, "II · THE FRAME", {
    x: 1.042, y: 1.042, w: 3.181, h: 0.35,
    fontSize: 19.5, charSpacing: 5.85, color: C.gold, align: "left",
  });
  T(s, "III OF VIII", {
    x: 16.906, y: 1.042, w: 2.136, h: 0.35,
    fontSize: 19.5, charSpacing: 5.85, color: C.gold, align: "left",
  });
  T(s, "A STORY INSIDE A STORY", {
    x: 0.773, y: 1.686, w: 18.454, h: 0.5,
    fontSize: 19.5, charSpacing: 6.24, color: C.gold, transparency: tr(0.7), align: "center",
  });

  s.addText([
    { text: "From the Tabard Inn ", options: { fontSize: 72, charSpacing: -0.72, color: C.cream } },
    { text: "to Canterbury.",       options: { fontSize: 72, charSpacing: -0.72, color: C.gold, italic: true } },
  ], {
    x: 0.773, y: 2.428, w: 18.454, h: 2.002,
    fontFace: "Arial", margin: 0.02, valign: "top", align: "center", isTextBox: true, shrinkText: true,
  });

  s.addImage({ path: "images/image-3-1.png", x: 2.708, y: 5.117, w: 14.583, h: 3.021 });

  const steps = [
    { num: "I.",   numGeom: [5.674, 8.659, 0.294, 0.542], cap: "29 pilgrims meet",          capGeom: [4.633, 9.242, 2.376, 0.464] },
    { num: "II.",  numGeom: [9.11,  8.659, 0.422, 0.542], cap: "Each tells a tale",         capGeom: [8.176, 9.242, 2.289, 0.464] },
    { num: "III.", numGeom: [13.266,8.659, 0.551, 0.542], cap: "Best storyteller wins dinner", capGeom: [11.632, 9.242, 3.846, 0.464] },
  ];
  for (const st of steps) {
    T(s, st.num, {
      x: st.numGeom[0], y: st.numGeom[1], w: st.numGeom[2], h: st.numGeom[3],
      fontSize: 30, italic: true, color: C.gold, transparency: tr(0.55), align: "left",
    });
    T(s, st.cap, {
      x: st.capGeom[0], y: st.capGeom[1], w: st.capGeom[2], h: st.capGeom[3],
      fontSize: 22.5, color: C.cream, align: "left",
    });
  }
}

// ===================================================================
// SLIDE 4 — The Company
// ===================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.creamBg };
  addBorder(s, C.burgundy);

  T(s, "III · THE COMPANY", {
    x: 1.042, y: 1.042, w: 3.923, h: 0.35,
    fontSize: 19.5, charSpacing: 5.85, color: C.burgundy, align: "left",
  });
  T(s, "IV OF VIII", {
    x: 16.957, y: 1.042, w: 2.085, h: 0.35,
    fontSize: 19.5, charSpacing: 5.85, color: C.burgundy, align: "left",
  });
  T(s, "A CROSS-SECTION OF MEDIEVAL ENGLAND", {
    x: 1.042, y: 1.558, w: 18.454, h: 0.5,
    fontSize: 19.5, charSpacing: 6.24, color: C.burgundy, transparency: tr(0.7), align: "left",
  });
  T(s, "Twenty-nine Pilgrims", {
    x: 1.042, y: 2.05, w: 18.454, h: 1.144,
    fontSize: 81, charSpacing: -0.81, color: C.burgundy, align: "left",
  });

  const pilgrims = [
    { img: "images/image-4-1.png", imgX: 1.779,  name: "The Knight",   nameCenter: 2.404, sub: "VALOR"  },
    { img: "images/image-4-2.png", imgX: 4.818,  name: "Wife of Bath", nameCenter: 5.443, sub: "WIT"    },
    { img: "images/image-4-3.png", imgX: 7.856,  name: "The Miller",   nameCenter: 8.481, sub: "BAWDY"  },
    { img: "images/image-4-4.png", imgX: 10.894, name: "The Pardoner", nameCenter: 11.519, sub: "GREEDY" },
    { img: "images/image-4-5.png", imgX: 13.932, name: "The Prioress", nameCenter: 14.557, sub: "PIOUS"  },
    { img: "images/image-4-6.png", imgX: 16.97,  name: "The Host",     nameCenter: 17.595, sub: "JOVIAL" },
  ];
  for (const p of pilgrims) {
    s.addImage({ path: p.img, x: p.imgX, y: 6.221, w: 1.25, h: 1.667 });
    T(s, p.name, {
      x: p.nameCenter - 1.25, y: 8.033, w: 2.5, h: 0.5,
      fontSize: 21, color: C.burgundy, align: "center",
    });
    T(s, p.sub, {
      x: p.nameCenter - 1.25, y: 8.592, w: 2.5, h: 0.45,
      fontSize: 18, charSpacing: 3.96, color: C.burgundy, transparency: tr(0.75), align: "center",
    });
  }

  T(s, "KNIGHTS · CLERGY · TRADESPEOPLE · ROGUES — ALL ON THE SAME MUDDY ROAD.", {
    x: 1.042, y: 9.829, w: 18.454, h: 0.421,
    fontSize: 19.5, charSpacing: 4.88, color: C.burgundy, transparency: tr(0.6), align: "left",
  });
}

// ===================================================================
// SLIDE 5 — Knight's Tale
// ===================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.burgundyBg };
  addBorder(s, C.gold);

  T(s, "IV · TALE THE FIRST", {
    x: 1.042, y: 1.042, w: 4.287, h: 0.35,
    fontSize: 19.5, charSpacing: 5.85, color: C.gold, align: "left",
  });
  T(s, "V OF VIII", {
    x: 17.113, y: 1.042, w: 1.928, h: 0.35,
    fontSize: 19.5, charSpacing: 5.85, color: C.gold, align: "left",
  });
  T(s, "A TALE OF CHIVALRY", {
    x: 1.042, y: 1.993, w: 9.104, h: 0.5,
    fontSize: 19.5, charSpacing: 6.24, color: C.gold, transparency: tr(0.7), align: "left",
  });
  T(s, "The Knight's Tale", {
    x: 1.042, y: 2.631, w: 9.104, h: 2.41,
    fontSize: 87, charSpacing: -0.87, color: C.cream, align: "left",
  });

  divider(s, 1.042, 5.502, 4.055);
  T(s, "✦", {
    x: 5.284, y: 5.312, w: 0.438, h: 0.433,
    fontSize: 21, charSpacing: 8.4, color: C.gold, align: "left",
  });
  divider(s, 5.826, 5.502, 4.055);

  T(s, "Two noble cousins imprisoned in Athens fall in love with the same woman — and resolve it, as knights do, with a tournament.", {
    x: 1.042, y: 6.016, w: 9.5, h: 2.45,
    fontSize: 33, italic: true, color: C.cream, transparency: tr(0.85), align: "left",
  });

  T(s, "THEME", {
    x: 1.042, y: 8.7, w: 2.3, h: 0.421,
    fontSize: 19.5, charSpacing: 4.29, color: C.gold, align: "left",
  });
  T(s, "Love & Fate", {
    x: 1.042, y: 9.15, w: 3.0, h: 0.52,
    fontSize: 25.5, color: C.cream, align: "left",
  });
  T(s, "TONE", {
    x: 4.5, y: 8.7, w: 2.268, h: 0.421,
    fontSize: 19.5, charSpacing: 4.29, color: C.gold, align: "left",
  });
  T(s, "Courtly, Heroic", {
    x: 4.5, y: 9.15, w: 3.2, h: 0.52,
    fontSize: 25.5, color: C.cream, align: "left",
  });

  s.addImage({ path: "images/image-5-1.png", x: 12.232, y: 2.706, w: 5.417, h: 6.042 });
}

// ===================================================================
// SLIDE 6 — Wife of Bath's Tale
// ===================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.creamBg };
  addBorder(s, C.burgundy);

  T(s, "V · TALE THE SECOND", {
    x: 1.042, y: 1.042, w: 4.597, h: 0.35,
    fontSize: 19.5, charSpacing: 5.85, color: C.burgundy, align: "left",
  });
  T(s, "VI OF VIII", {
    x: 16.957, y: 1.042, w: 2.085, h: 0.35,
    fontSize: 19.5, charSpacing: 5.85, color: C.burgundy, align: "left",
  });

  s.addImage({ path: "images/image-6-1.png", x: 2.351, y: 2.706, w: 5.417, h: 6.042 });

  T(s, "A TALE OF SOVEREIGNTY", {
    x: 10.119, y: 2.339, w: 9.105, h: 0.5,
    fontSize: 19.5, charSpacing: 6.24, color: C.burgundy, transparency: tr(0.7), align: "left",
  });
  T(s, "The Wife of Bath's Tale", {
    x: 10.119, y: 2.976, w: 9.105, h: 2.247,
    fontSize: 81, charSpacing: -0.81, color: C.burgundy, align: "left",
  });

  divider(s, 10.119, 5.684, 4.055);
  T(s, "✦", {
    x: 14.361, y: 5.494, w: 0.438, h: 0.433,
    fontSize: 21, charSpacing: 8.4, color: C.gold, align: "left",
  });
  divider(s, 14.904, 5.684, 4.055);

  s.addText([
    { text: "A knight must answer one question to save his life: ", options: { fontSize: 33, italic: true, color: C.dark } },
    { text: "\"What do women most desire?\"",                       options: { fontSize: 33, italic: true, color: C.burgundy } },
  ], {
    x: 10.119, y: 6.198, w: 8.8, h: 1.8,
    fontFace: "Arial", margin: 0.02, valign: "top", align: "left", isTextBox: true, shrinkText: true,
  });

  T(s, "THEME", {
    x: 10.119, y: 8.196, w: 2.652, h: 0.421,
    fontSize: 19.5, charSpacing: 4.29, color: C.burgundy, align: "left",
  });
  T(s, "Power in Marriage", {
    x: 10.119, y: 8.637, w: 3.5, h: 0.52,
    fontSize: 25.5, color: C.white, align: "left",
  });
  T(s, "TONE", {
    x: 13.95, y: 8.196, w: 2.371, h: 0.421,
    fontSize: 19.5, charSpacing: 4.29, color: C.burgundy, align: "left",
  });
  T(s, "Bold, Subversive", {
    x: 13.95, y: 8.637, w: 3.5, h: 0.52,
    fontSize: 25.5, color: C.white, align: "left",
  });
}

// ===================================================================
// SLIDE 7 — Major Themes
// ===================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.greenBg };
  addBorder(s, C.gold);

  T(s, "VI · IDEAS THAT RUN THROUGH", {
    x: 1.042, y: 1.042, w: 6.548, h: 0.35,
    fontSize: 19.5, charSpacing: 5.85, color: C.gold, align: "left",
  });
  T(s, "VII OF VIII", {
    x: 16.8, y: 1.042, w: 2.241, h: 0.35,
    fontSize: 19.5, charSpacing: 5.85, color: C.gold, align: "left",
  });
  T(s, "WHAT CHAUCER WAS REALLY WRITING ABOUT", {
    x: 1.042, y: 1.558, w: 18.454, h: 0.5,
    fontSize: 19.5, charSpacing: 6.24, color: C.gold, transparency: tr(0.7), align: "left",
  });
  T(s, "Major Themes", {
    x: 1.042, y: 2.05, w: 18.454, h: 1.062,
    fontSize: 75, charSpacing: -0.75, color: C.cream, align: "left",
  });

  const cards = [
    { x: 1.042,  num: "I.",   title: "Social Class & Corruption", body: "Chaucer skewers a Church grown wealthy, and peasants grown proud.", bodyH: 0.979 },
    { x: 5.599,  num: "II.",  title: "Women & Power",             body: "Who holds the reins in love, marriage, and the household?",         bodyH: 0.667 },
    { x: 10.156, num: "III.", title: "Courtly Love & Desire",     body: "The noble ideal — and its messy, human counterpart.",               bodyH: 0.667 },
    { x: 14.714, num: "IV.",  title: "Faith, Fate & Hypocrisy",   body: "Pilgrims speak of God — but what do their tales actually reveal?",  bodyH: 0.667 },
  ];
  for (const c of cards) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: 3.696, w: 4.245, h: 5.787,
      fill: { type: "none" },
      line: { color: C.cream, width: 0.6, transparency: tr(0.25), dashType: "solid" },
    });
    T(s, c.num, {
      x: c.x + 0.383, y: 4.162, w: 3.582, h: 0.5,
      fontSize: 33, italic: true, color: C.gold, align: "left",
    });
    T(s, c.title, {
      x: c.x + 0.383, y: 4.787, w: 3.582, h: 1.004,
      fontSize: 31.5, color: C.cream, align: "left",
    });
    T(s, c.body, {
      x: c.x + 0.383, y: 5.917, w: 3.75, h: c.bodyH + 0.5,
      fontSize: 15, charSpacing: 0.3, color: C.cream, transparency: tr(0.75), align: "left",
    });
  }

  divider(s, 1.042, 10.049, 8.197);
  T(s, "✦ ✦ ✦", {
    x: 9.427, y: 9.9, w: 1.23, h: 0.35,
    fontSize: 16.5, charSpacing: 6.6, color: C.gold, align: "left",
  });
  divider(s, 10.761, 10.049, 8.198);
}

// ===================================================================
// SLIDE 8 — The Legacy
// ===================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.creamBg };
  addBorder(s, C.burgundy);

  T(s, "VII · THE LEGACY", {
    x: 1.042, y: 1.042, w: 3.69, h: 0.35,
    fontSize: 19.5, charSpacing: 5.85, color: C.burgundy, align: "left",
  });
  T(s, "VIII OF VIII", {
    x: 16.644, y: 1.042, w: 2.398, h: 0.35,
    fontSize: 19.5, charSpacing: 5.85, color: C.burgundy, align: "left",
  });

  T(s, "\u201C", {
    x: 1.042, y: 3.024, w: 8.691, h: 1.792,
    fontSize: 180, italic: true, color: C.gold, transparency: tr(0.5), align: "left",
  });
  T(s, "The father of English literature.", {
    x: 1.042, y: 5.086, w: 8.691, h: 2.198,
    fontSize: 45, italic: true, color: C.burgundy, align: "left",
  });

  divider(s, 1.042, 7.642, 2.374);
  T(s, "✦", {
    x: 3.604, y: 7.451, w: 0.438, h: 0.433,
    fontSize: 21, charSpacing: 8.4, color: C.gold, align: "left",
  });
  T(s, "SIX CENTURIES AND STILL READ", {
    x: 1.042, y: 8.051, w: 8.691, h: 0.421,
    fontSize: 19.5, charSpacing: 4.29, color: C.burgundy, align: "left",
  });

  const rows = [
    { img: "images/image-8-1.png", imgY: 3.058, title: "Elevated English",         titleGeom: [12.042, 2.869, 7.124, 0.548], body: "Chose the people's tongue over Latin or French.", bodyGeom: [12.042, 3.438, 7.124, 0.998] },
    { img: "images/image-8-2.png", imgY: 5.154, title: "Invented the \"Character\"", titleGeom: [12.042, 5.204, 6.266, 0.548], body: "Real, flawed people — not archetypes.",           bodyGeom: [12.042, 5.772, 6.266, 0.52]  },
    { img: "images/image-8-3.png", imgY: 7.25,  title: "Shaped Every Writer Since", titleGeom: [12.042, 7.06,  7.124, 0.548], body: "Shakespeare, Dickens, Zadie Smith — all owe him.", bodyGeom: [12.042, 7.629, 7.124, 0.998] },
  ];
  for (const r of rows) {
    s.addImage({ path: r.img, x: 10.521, y: r.imgY, w: 1.146, h: 1.146 });
    T(s, r.title, {
      x: r.titleGeom[0], y: r.titleGeom[1], w: r.titleGeom[2], h: r.titleGeom[3],
      fontSize: 27, color: C.burgundy, align: "left",
    });
    T(s, r.body, {
      x: r.bodyGeom[0], y: r.bodyGeom[1], w: r.bodyGeom[2], h: r.bodyGeom[3],
      fontSize: 25.5, color: C.white, transparency: tr(0.75), align: "left",
    });
  }
  // Row dividers between icon rows
  divider(s, 10.521, 4.769, 8.438, C.burgundy, 0.2);
  divider(s, 10.521, 6.675, 8.438, C.burgundy, 0.2);
}

pres.writeFile({ fileName: "Canterbury.pptx" }).then((fn) => console.log("Wrote", fn));
