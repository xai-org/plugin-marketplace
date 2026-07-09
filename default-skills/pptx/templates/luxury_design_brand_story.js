/**
 * Vespera Atelier — pptxgenjs recreation
 *
 * Usage:
 *   npm install pptxgenjs
 *   node generate_vespera.js
 *
 * The script expects an ./assets/ directory alongside it containing these
 * images (extracted from the original .pptx):
 *   image-1-1.png, image-2-1.png,
 *   image-3-1.png, image-3-2.png, image-3-3.png,
 *   image-4-1.png, image-5-1.png,
 *   image-6-1.png, image-6-2.png, image-6-3.png, image-6-4.png,
 *   image-7-1.png, image-8-1.png
 *
 * Output: Vespera_Atelier.pptx
 */

const PptxGenJS = require("pptxgenjs");

const pres = new PptxGenJS();

// Custom widescreen: 20" × 11.25" (matches original 18288000 × 10287000 EMU)
pres.defineLayout({ name: "VESPERA", width: 20, height: 11.25 });
pres.layout = "VESPERA";

// --------------------------------------------------------------------------
// Design tokens (sampled from the source deck)
// --------------------------------------------------------------------------
const COLOR = {
  bg: "0A0907",          // near-black warm charcoal
  bronze: "8A6A3B",      // warm bronze overlay
  gold: "C69A5A",        // accent gold (roman numerals, page nums)
  ivory: "EDE6D8",       // primary heading white
  parchment: "D8D0BF",   // muted body text
  panelDark: "121110",   // slightly lifted black for collection cards
};

const FONT = "Arial";
const ASSETS = "./assets/";

// Shorthand: opacity percentage → pptxgenjs `transparency` (0 = opaque, 100 = invisible)
const tr = (alphaPct) => 100 - alphaPct;

// --------------------------------------------------------------------------
// Shared scaffolding
// --------------------------------------------------------------------------

/** Warm bronze overlay over the whole slide — lifts the charcoal to something organic. */
function addBronzeOverlay(slide) {
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: 20, h: 11.25,
    fill: { color: COLOR.bronze, transparency: tr(8) },
    line: { type: "none" },
  });
}

/** Four decorative corner bracket marks (L-shapes) — signature "atelier" trim. */
function addCornerBrackets(slide) {
  const L = 0.3;       // arm length
  const T = 0.0104;    // arm thickness (~0.75pt visual line)
  const color = COLOR.ivory;
  const alpha = tr(55);
  const mk = (x, y, w, h) => slide.addShape(pres.ShapeType.rect, {
    x, y, w, h,
    fill: { color, transparency: alpha },
    line: { type: "none" },
  });
  // Top-left
  mk(0.8333, 0.625, L, T);
  mk(0.8333, 0.625, T, L);
  // Top-right
  mk(18.8667, 0.625, L, T);
  mk(19.1583, 0.625, T, L);
  // Bottom-left
  mk(0.8333, 10.6167, L, T);
  mk(0.8333, 10.325, T, L);
  // Bottom-right
  mk(18.8667, 10.6167, L, T);
  mk(19.1583, 10.325, T, L);
}

/** Header chapter marker + bottom brand/page rails shared by slides 2–7. */
function addChapterChrome(slide, { chapterRoman, pageLabel }) {
  // Centered top chapter label
  slide.addText(`CHAPTER ${chapterRoman}`, {
    x: 9.0, y: 0.5833, w: 2.0, h: 0.1833,
    fontFace: FONT, fontSize: 9, charSpacing: 4.5,
    color: COLOR.parchment, transparency: tr(45),
    align: "center", valign: "top", margin: 0,
  });

  // Bottom-left brand
  slide.addText("VESPERA ATELIER", {
    x: 0.8333, y: 10.525, w: 1.9565, h: 0.1833,
    fontFace: FONT, fontSize: 9, charSpacing: 3.6,
    color: COLOR.parchment, transparency: tr(40),
    align: "left", valign: "top", margin: 0,
  });

  // Bottom-right page number
  slide.addText(pageLabel, {
    x: 18.4344, y: 10.525, w: 0.8156, h: 0.1833,
    fontFace: FONT, fontSize: 9, charSpacing: 3.6,
    color: COLOR.gold, transparency: tr(70),
    align: "left", valign: "top", margin: 0,
  });
}

// --------------------------------------------------------------------------
// Slide 1 — Cover: "Atelier"
// --------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: COLOR.bg };
  addBronzeOverlay(s);

  // Full-bleed cover image (centered vessel)
  s.addImage({ path: ASSETS + "image-1-1.png", x: 0, y: 0, w: 20, h: 11.25 });

  // Top rails
  s.addText("MAISON · EST. MMXXI", {
    x: 1.6667, y: 1.25, w: 2.8469, h: 0.2333,
    fontFace: FONT, fontSize: 12, charSpacing: 3.84,
    color: COLOR.parchment, transparency: tr(55),
    align: "left", valign: "top", margin: 0,
  });
  s.addText("VOLUME I", {
    x: 17.1102, y: 1.25, w: 1.3065, h: 0.2333,
    fontFace: FONT, fontSize: 12, charSpacing: 3.84,
    color: COLOR.parchment, transparency: tr(55),
    align: "left", valign: "top", margin: 0,
  });

  // "—— VESPERA ——" flourish above the giant wordmark
  s.addShape(pres.ShapeType.rect, {
    x: 7.7659, y: 4.2458, w: 1.25, h: 0.0104,
    fill: { color: COLOR.bronze, transparency: tr(70) }, line: { type: "none" },
  });
  s.addText("VESPERA", {
    x: 9.3076, y: 4.1635, w: 1.3849, h: 0.2167,
    fontFace: FONT, fontSize: 10.5, charSpacing: 6.3,
    color: COLOR.gold, align: "center", valign: "top", margin: 0,
  });
  s.addShape(pres.ShapeType.rect, {
    x: 10.9841, y: 4.2458, w: 1.25, h: 0.0104,
    fill: { color: COLOR.bronze, transparency: tr(70) }, line: { type: "none" },
  });

  // Giant "Atelier" wordmark
  s.addText("Atelier", {
    x: 1.4167, y: 4.6302, w: 17.1667, h: 1.7292,
    fontFace: FONT, fontSize: 135, charSpacing: -2.03,
    color: COLOR.ivory, align: "center", valign: "top", margin: 0,
    lineSpacingMultiple: 0.9, autoFit: true,
  });

  // Tagline
  s.addText("Sculptural objects for considered interiors", {
    x: 1.4167, y: 6.6927, w: 17.1667, h: 0.4354,
    fontFace: FONT, fontSize: 21, charSpacing: 1.68,
    color: COLOR.parchment, transparency: tr(75),
    align: "center", valign: "top", margin: 0,
  });

  // Bottom rails
  s.addText("A BRAND STUDY", {
    x: 1.6667, y: 9.8083, w: 2.1195, h: 0.2333,
    fontFace: FONT, fontSize: 12, charSpacing: 3.84,
    color: COLOR.parchment, transparency: tr(55),
    align: "left", valign: "top", margin: 0,
  });
  s.addText("NO. 01 — 08", {
    x: 16.774, y: 9.8083, w: 1.6427, h: 0.2333,
    fontFace: FONT, fontSize: 12, charSpacing: 3.84,
    color: COLOR.parchment, transparency: tr(55),
    align: "left", valign: "top", margin: 0,
  });
}

// --------------------------------------------------------------------------
// Chapter-slide helper — for slides 2, 4, 5, 7 (left/right headline layout)
// --------------------------------------------------------------------------
function addChapterSlide({
  chapterRoman, pageLabel, numeral, title, blurb,
  image, imageBox,
  textX, textW,
  blurbW = 4.7208,
}) {
  const s = pres.addSlide();
  s.background = { color: COLOR.bg };
  addBronzeOverlay(s);
  addCornerBrackets(s);
  addChapterChrome(s, { chapterRoman, pageLabel });

  // Image (may be a full-bleed half or a framed block)
  if (image && imageBox) {
    s.addImage({ path: ASSETS + image, x: imageBox.x, y: imageBox.y, w: imageBox.w, h: imageBox.h });
  }

  // Roman numeral kicker
  s.addText(numeral, {
    x: textX, y: 3.2594, w: textW, h: 0.2583,
    fontFace: FONT, fontSize: 13.5, charSpacing: 5.67,
    color: COLOR.parchment, transparency: tr(72),
    align: "left", valign: "top", margin: 0,
  });

  // Large title
  s.addText(title, {
    x: textX, y: 3.976, w: textW, h: 2.2917,
    fontFace: FONT, fontSize: 180, charSpacing: -3.6,
    color: COLOR.ivory, align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 0.9, autoFit: true,
  });

  // Supporting blurb (italic across the deck)
  s.addText(blurb, {
    x: textX, y: 6.8094, w: blurbW, h: 1.2229,
    fontFace: FONT, fontSize: 31.5, charSpacing: 0.16, italic: true,
    color: COLOR.parchment, align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 1.1,
  });

  return s;
}

// --------------------------------------------------------------------------
// Slide 2 — Origin
// --------------------------------------------------------------------------
addChapterSlide({
  chapterRoman: "I", pageLabel: "02 / 08",
  numeral: "I.", title: "Origin",
  blurb: "Born of smoke, shaped by hand, quieted by time.",
  image: "image-2-1.png",
  imageBox: { x: 11.7708, y: 1.9792, w: 6.4583, h: 7.2917 },
  textX: 1.875, textW: 8.3688, blurbW: 5.5792,
});

// --------------------------------------------------------------------------
// Slide 3 — Material (three-column grid)
// --------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: COLOR.bg };
  addBronzeOverlay(s);
  addCornerBrackets(s);
  addChapterChrome(s, { chapterRoman: "II", pageLabel: "03 / 08" });

  // Heading block — upper left
  s.addText("II.", {
    x: 1.875, y: 1.4583, w: 6.7444, h: 0.2583,
    fontFace: FONT, fontSize: 13.5, charSpacing: 5.67,
    color: COLOR.parchment, transparency: tr(72),
    align: "left", valign: "top", margin: 0,
  });
  s.addText("Material", {
    x: 1.875, y: 1.925, w: 7.5, h: 1.9167,
    fontFace: FONT, fontSize: 150, charSpacing: -3,
    color: COLOR.ivory, align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 0.9, autoFit: true,
  });

  // Right-aligned intro (italic)
  s.addText("Three substances, endlessly conversed.", {
    x: 15.7143, y: 2.9, w: 2.4107, h: 0.9417,
    fontFace: FONT, fontSize: 24, charSpacing: 0.12, italic: true,
    color: COLOR.parchment, align: "right", valign: "top", margin: 0,
    lineSpacingMultiple: 1.1, autoFit: true,
  });

  // Three material columns
  const cols = [
    { x: 2.6042, num: "I",   name: "Bronze",  tag: "HAND-FORGED",  img: "image-3-1.png" },
    { x: 8.2292, num: "II",  name: "Crystal", tag: "MOUTH-BLOWN",  img: "image-3-2.png" },
    { x: 13.8542, num: "III", name: "Basalt", tag: "CARVED",       img: "image-3-3.png" },
  ];
  const colTextW = 3.5417;  // match image width so captions can breathe
  cols.forEach(c => {
    s.addImage({ path: ASSETS + c.img, x: c.x, y: 4.7333, w: 3.5417, h: 3.5417 });
    s.addText(c.num, {
      x: c.x, y: 8.6083, w: colTextW, h: 0.2167,
      fontFace: FONT, fontSize: 10.5, charSpacing: 4.41,
      color: COLOR.gold, align: "center", valign: "top", margin: 0,
    });
    s.addText(c.name, {
      x: c.x, y: 8.9083, w: colTextW, h: 0.6,
      fontFace: FONT, fontSize: 33, charSpacing: 0.17,
      color: COLOR.ivory, align: "center", valign: "top", margin: 0,
    });
    s.addText(c.tag, {
      x: c.x, y: 9.6333, w: colTextW, h: 0.2,
      fontFace: FONT, fontSize: 9.75, charSpacing: 3.12,
      color: COLOR.parchment, transparency: tr(55),
      align: "center", valign: "top", margin: 0,
    });
  });
}

// --------------------------------------------------------------------------
// Slide 4 — Form (image on right, text on left)
// --------------------------------------------------------------------------
addChapterSlide({
  chapterRoman: "III", pageLabel: "04 / 08",
  numeral: "III.", title: "Form",
  blurb: "Geometry softened by the logic of living things.",
  image: "image-4-1.png",
  imageBox: { x: 9.0, y: 0.0, w: 11.0, h: 11.25 },
  textX: 1.875, textW: 7.3388,
});

// --------------------------------------------------------------------------
// Slide 5 — Light (full-bleed image, text on right)
// --------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: COLOR.bg };
  addBronzeOverlay(s);

  // Full-bleed image beneath everything
  s.addImage({ path: ASSETS + "image-5-1.png", x: 0, y: 0, w: 20, h: 11.25 });

  addCornerBrackets(s);
  addChapterChrome(s, { chapterRoman: "IV", pageLabel: "05 / 08" });

  s.addText("IV.", {
    x: 9.725, y: 3.2594, w: 8.652, h: 0.2583,
    fontFace: FONT, fontSize: 13.5, charSpacing: 5.67,
    color: COLOR.parchment, transparency: tr(72),
    align: "left", valign: "top", margin: 0,
  });
  s.addText("Light", {
    x: 9.725, y: 3.976, w: 8.652, h: 2.2917,
    fontFace: FONT, fontSize: 180, charSpacing: -3.6,
    color: COLOR.ivory, align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 0.9, autoFit: true,
  });
  s.addText("An object is only what the light discovers in it.", {
    x: 9.725, y: 6.8094, w: 4.7208, h: 1.2229,
    fontFace: FONT, fontSize: 31.5, charSpacing: 0.16, italic: true,
    color: COLOR.parchment, align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 1.1,
  });
}

// --------------------------------------------------------------------------
// Slide 6 — Collection (four product cards)
// --------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: COLOR.bg };
  addBronzeOverlay(s);
  addCornerBrackets(s);
  addChapterChrome(s, { chapterRoman: "V", pageLabel: "06 / 08" });

  // Heading block
  s.addText("V.", {
    x: 1.875, y: 1.4583, w: 6.6745, h: 0.2583,
    fontFace: FONT, fontSize: 13.5, charSpacing: 5.67,
    color: COLOR.parchment, transparency: tr(72),
    align: "left", valign: "top", margin: 0,
  });
  s.addText("Collection", {
    x: 1.875, y: 1.8625, w: 6.6745, h: 1.5417,
    fontFace: FONT, fontSize: 120, charSpacing: -2.4,
    color: COLOR.ivory, align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 0.9, autoFit: true,
  });
  s.addText("Seven pieces, one quiet conversation.", {
    x: 15.8311, y: 2.6313, w: 2.2939, h: 0.7729,
    fontFace: FONT, fontSize: 19.5, charSpacing: 0.1, italic: true,
    color: COLOR.parchment, align: "right", valign: "top", margin: 0,
    lineSpacingMultiple: 1.1,
  });

  // Four product cards
  const cards = [
    { x: 1.875,  num: "N° 01", name: "Aurea",  img: "image-6-1.png" },
    { x: 6.0417, num: "N° 02", name: "Ossa",   img: "image-6-2.png" },
    { x: 10.2083, num: "N° 03", name: "Lumen", img: "image-6-3.png" },
    { x: 14.375, num: "N° 04", name: "Concha", img: "image-6-4.png" },
  ];
  cards.forEach(c => {
    // Dark card background
    s.addShape(pres.ShapeType.rect, {
      x: c.x, y: 4.7917, w: 3.75, h: 5.0,
      fill: { color: COLOR.panelDark }, line: { type: "none" },
    });
    // Product image within card
    s.addImage({ path: ASSETS + c.img, x: c.x + 0.2167, y: 6.175, w: 3.3167, h: 2.7083 });
    // Number and name at bottom of card
    s.addText(c.num, {
      x: c.x + 0.2167, y: 9.0708, w: 3.4162, h: 0.1667,
      fontFace: FONT, fontSize: 8.25, charSpacing: 2.47,
      color: COLOR.gold, align: "left", valign: "top", margin: 0,
    });
    s.addText(c.name, {
      x: c.x + 0.2167, y: 9.2583, w: 3.4162, h: 0.3167,
      fontFace: FONT, fontSize: 16.5, charSpacing: 0.08,
      color: COLOR.ivory, align: "left", valign: "top", margin: 0,
    });
  });
}

// --------------------------------------------------------------------------
// Slide 7 — Atelier (full-bleed image, text on right)
// --------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: COLOR.bg };
  addBronzeOverlay(s);

  s.addImage({ path: ASSETS + "image-7-1.png", x: 0, y: 0, w: 20, h: 11.25 });

  addCornerBrackets(s);
  addChapterChrome(s, { chapterRoman: "VI", pageLabel: "07 / 08" });

  s.addText("VI.", {
    x: 10.125, y: 3.2594, w: 8.24, h: 0.2583,
    fontFace: FONT, fontSize: 13.5, charSpacing: 5.67,
    color: COLOR.parchment, transparency: tr(72),
    align: "left", valign: "top", margin: 0,
  });
  s.addText("Atelier", {
    x: 10.125, y: 3.976, w: 8.24, h: 2.2917,
    fontFace: FONT, fontSize: 180, charSpacing: -3.6,
    color: COLOR.ivory, align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 0.9, autoFit: true,
  });
  s.addText("A single studio. Four hands. Eleven pieces a year.", {
    x: 10.125, y: 6.8094, w: 4.7208, h: 1.2229,
    fontFace: FONT, fontSize: 31.5, charSpacing: 0.16, italic: true,
    color: COLOR.parchment, align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 1.1, autoFit: true,
  });
}

// --------------------------------------------------------------------------
// Slide 8 — Invitation (closing)
// --------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: COLOR.bg };
  addBronzeOverlay(s);

  s.addImage({ path: ASSETS + "image-8-1.png", x: 0, y: 0, w: 20, h: 11.25 });

  // —— VII. —— flourish
  s.addShape(pres.ShapeType.rect, {
    x: 8.416, y: 7.049, w: 1.0417, h: 0.0104,
    fill: { color: COLOR.bronze, transparency: tr(70) }, line: { type: "none" },
  });
  s.addText("VII.", {
    x: 9.7493, y: 6.975, w: 0.5845, h: 0.2,
    fontFace: FONT, fontSize: 9.75, charSpacing: 5.36,
    color: COLOR.gold, align: "left", valign: "top", margin: 0,
  });
  s.addShape(pres.ShapeType.rect, {
    x: 10.5422, y: 7.049, w: 1.0417, h: 0.0104,
    fill: { color: COLOR.bronze, transparency: tr(70) }, line: { type: "none" },
  });

  // Giant "Invitation"
  s.addText("Invitation", {
    x: 6.076, y: 7.5083, w: 8.0834, h: 1.9167,
    fontFace: FONT, fontSize: 150, charSpacing: -2.25,
    color: COLOR.ivory, align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 0.9, autoFit: true,
  });

  // Meta line
  s.addText("By appointment · Private viewings from autumn", {
    x: 6.5548, y: 9.8417, w: 7.0971, h: 0.4635,
    fontFace: FONT, fontSize: 22.5, charSpacing: 1.13,
    color: COLOR.parchment, transparency: tr(80),
    align: "left", valign: "top", margin: 0, autoFit: true,
  });

  // Wordmark
  s.addText("VESPERA · ATELIER", {
    x: 8.6362, y: 10.9302, w: 2.8108, h: 0.2167,
    fontFace: FONT, fontSize: 10.5, charSpacing: 4.72,
    color: COLOR.gold, align: "left", valign: "top", margin: 0,
  });

  // FIN. / page label
  s.addText("FIN.", {
    x: 1.4583, y: 10.3583, w: 0.4794, h: 0.1833,
    fontFace: FONT, fontSize: 9, charSpacing: 2.88,
    color: COLOR.parchment, transparency: tr(50),
    align: "left", valign: "top", margin: 0,
  });
  s.addText("08 / 08", {
    x: 17.8793, y: 10.3583, w: 0.7457, h: 0.1833,
    fontFace: FONT, fontSize: 9, charSpacing: 2.88,
    color: COLOR.parchment, transparency: tr(50),
    align: "left", valign: "top", margin: 0,
  });
}

// --------------------------------------------------------------------------
// Write
// --------------------------------------------------------------------------
pres.writeFile({ fileName: "Vespera_Atelier.pptx" })
  .then(name => console.log("Wrote " + name));
