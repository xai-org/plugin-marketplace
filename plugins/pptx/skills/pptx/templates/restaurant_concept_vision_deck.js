/**
 * build_meraki_deck.js
 *
 * Recreates "greek_ann_arbor.pptx" — an 8-slide vibes deck for "Meraki",
 * a Greek café concept in Ann Arbor — using pptxgenjs.
 *
 * Usage:
 *   npm install pptxgenjs
 *   node build_meraki_deck.js
 *
 * Images are read from ./images/ (relative to this script). The 11 PNGs
 * shipped alongside the original deck must be placed there:
 *   image-1-1.png  image-3-1.png  image-3-2.png  image-3-3.png  image-3-4.png
 *   image-5-1.png  image-6-1.png  image-6-2.png  image-6-3.png  image-6-4.png
 *   image-7-1.png
 *
 * The deck uses a non-standard custom layout of 20" x 11.25" (≈ 16:9 widescreen
 * upscaled), matching the source file's <p:sldSz cx="18288000" cy="10287000"/>.
 */

const path = require("path");
const PptxGenJS = require("pptxgenjs");

// ---------- design tokens ----------------------------------------------------

const COLOR = {
  bone:       "F8F5EF",   // primary light background
  cream:      "EFEAE2",   // secondary light background (slide 6)
  navyDeep:   "002A4E",   // primary dark background
  navyMid:    "014069",   // accent navy (eyebrow text, italic accents)
  ink:        "0B1C2C",   // body / heavy display text on light bg
  ochre:      "E1A447",   // accent: Place. / 12 dishes panel / chair italic
  olive:      "646E46",   // accent square + Professor frame
  terracotta: "B95C3A",   // accent: summer in Hydra / by whom.
};

const FONT = "Arial";

// Page geometry (in inches)
const PAGE_W = 20;
const PAGE_H = 11.25;

const IMG = (name) => path.join(__dirname, "images", name);

// ---------- helpers ----------------------------------------------------------

/** Eyebrow label, e.g. "01 — THE IDEA" — small caps with wide tracking. */
function eyebrow(slide, text, x, y, opts = {}) {
  slide.addText(text, {
    x, y,
    w: opts.w ?? 6.0,
    h: opts.h ?? 0.39,
    fontFace: FONT,
    fontSize: 18,
    bold: false,
    color: opts.color ?? COLOR.navyMid,
    charSpacing: 2.5,           // spc=252 in OOXML ≈ 5 pts of tracking in pptxgenjs
    align: "left",
    valign: "top",
    margin: 0.03,
  });
}

/** Muted footer/caption label (slide-number, small overline tags, etc.). */
function muted(slide, text, x, y, w, h, opts = {}) {
  slide.addText(text, {
    x, y, w, h,
    fontFace: FONT,
    fontSize: opts.fontSize ?? 18,
    color: opts.color ?? COLOR.ink,
    transparency: opts.transparency ?? 55,  // alpha 55000 in OOXML
    charSpacing: opts.charSpacing ?? 2.5,
    align: opts.align ?? "left",
    valign: "top",
    italic: opts.italic ?? false,
    margin: 0.03,
  });
}

/** Thin horizontal divider line drawn as a 1px tall filled rectangle. */
function rule(slide, x, y, w, color = COLOR.ink, h = 0.012) {
  slide.addShape("rect", {
    x, y, w, h,
    fill: { color },
    line: { type: "none" },
  });
}

/** Full-bleed background panel (covers half/section of slide). */
function panel(slide, x, y, w, h, color) {
  slide.addShape("rect", {
    x, y, w, h,
    fill: { color },
    line: { type: "none" },
  });
}

// ---------- deck setup -------------------------------------------------------

const pres = new PptxGenJS();
pres.author = "Meraki";
pres.title  = "Meraki — A Greek table in Ann Arbor (Vibes Deck)";
pres.company = "Meraki";

// Custom 20" x 11.25" layout (matches source pptx exactly).
pres.defineLayout({ name: "MERAKI_WIDE", width: PAGE_W, height: PAGE_H });
pres.layout = "MERAKI_WIDE";

// =============================================================================
// SLIDE 1 — Cover: "Meraki"
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.bone };

  // Right half — navy panel with house illustration
  panel(s, 10.24, 0, 9.76, 11.25, COLOR.navyDeep);
  s.addImage({ path: IMG("image-1-1.png"), x: 10.25, y: 0.01, w: 9.74, h: 11.23 });

  // Top eyebrow
  eyebrow(s, "A GREEK TABLE — EST. 2026", 1.04, 0.83, { w: 8.00 });

  // Hero wordmark "Meraki"
  s.addText("Meraki", {
    x: 1.04, y: 3.16, w: 7.24, h: 2.61,
    fontFace: FONT,
    fontSize: 165,
    bold: true,
    color: COLOR.ink,
    charSpacing: -3,         // spc=-165 → ~ -3 pt tracking
    align: "left",
    valign: "top",
    margin: 0,
    paraSpaceAfter: 0,
  });

  // Tagline (italic Greek)
  s.addText("μεράκι · with soul, with love", {
    x: 1.04, y: 5.68, w: 8.62, h: 1.81,
    fontFace: FONT,
    fontSize: 69,
    italic: true,
    color: COLOR.navyMid,
    align: "left",
    valign: "top",
    margin: 0.03,
  });

  // Bottom-left meta block
  muted(s, "VIBES DECK", 1.04, 9.67, 4.50, 0.39);
  s.addText("A Greek table in Ann Arbor.", {
    x: 1.04, y: 10.11, w: 4.50, h: 0.34,
    fontFace: FONT, fontSize: 16, italic: true,
    color: COLOR.ink, align: "left", valign: "top", margin: 0.03,
  });
  muted(s, "VOL. I / 08 SLIDES", 5.71, 10.07, 5.00, 0.39);

  // Caption on top of dark panel (low-opacity bone)
  s.addText("— HYDRA, IN MICHIGAN", {
    x: 10.50, y: 10.71, w: 5.00, h: 0.34,
    fontFace: FONT, fontSize: 18,
    color: COLOR.bone, transparency: 55,
    charSpacing: 2.5,
    align: "left", valign: "top", margin: 0.03,
  });
}

// =============================================================================
// SLIDE 2 — The Idea (text-only on bone)
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.bone };

  eyebrow(s, "01 — THE IDEA", 1.04, 1.04, { w: 18.45 });

  // Big section title
  s.addText("The Idea.", {
    x: 1.04, y: 1.72, w: 18.45, h: 1.30,
    fontFace: FONT, fontSize: 72, bold: true,
    color: COLOR.ink, align: "left", valign: "top", margin: 0.03,
  });

  // Body paragraph with one italic accent ("καφενείο") in navy
  s.addText([
    { text: "A Greek ", options: { color: COLOR.ink } },
    { text: "καφενείο ", options: { italic: true, color: COLOR.navyMid } },
    { text: "reimagined for Ann Arbor — fast, generous, unfussy. Charcoal-grilled souvlaki, hand-pulled phyllo, lemon and oregano on everything. The kind of place you walk into for lunch and end up staying for an afternoon.",
      options: { color: COLOR.ink } },
  ], {
    x: 1.04, y: 3.38, w: 13.73, h: 3.29,
    fontFace: FONT, fontSize: 39,
    align: "left", valign: "top", margin: 0.03,
    paraSpaceAfter: 0,
  });

  // Page counter
  muted(s, "01 / 08", 17.66, 10.07, 2.30, 0.39, { align: "left" });
}

// =============================================================================
// SLIDE 3 — The Place (3-up illustrations on navy)
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.navyDeep };

  // Left column: heading + body on navy
  s.addText("02 — THE PLACE", {
    x: 0.88, y: 0.92, w: 8.00, h: 0.39,
    fontFace: FONT, fontSize: 18,
    color: COLOR.bone, transparency: 55,
    charSpacing: 2.5,
    align: "left", valign: "top", margin: 0.03,
  });

  // "The Place." with italic ochre "Place."
  s.addText([
    { text: "The ",     options: { bold: true,   color: COLOR.bone  } },
    { text: "Place.",   options: { italic: true, color: COLOR.ochre } },
  ], {
    x: 0.88, y: 1.26, w: 6.04, h: 2.07,
    fontFace: FONT, fontSize: 69,
    align: "left", valign: "top", margin: 0.03,
    paraSpaceAfter: 0,
  });

  s.addText("Whitewashed plaster. A long zinc counter. Wooden chairs that don't match. Open kitchen, charcoal smoke, and the sound of a 1970s Greek record playing low.", {
    x: 0.88, y: 3.54, w: 5.15, h: 2.31,
    fontFace: FONT, fontSize: 22,
    color: COLOR.bone,
    align: "left", valign: "top", margin: 0.03,
  });

  // Bottom-left ochre tile (chairs)
  panel(s, 0.88, 8.02, 5.86, 2.31, COLOR.ochre);
  s.addImage({ path: IMG("image-3-1.png"), x: 0.89, y: 8.03, w: 5.84, h: 2.29 });
  s.addText("— BISTRO & TILE", {
    x: 1.14, y: 9.79, w: 4.50, h: 0.34,
    fontFace: FONT, fontSize: 18,
    color: COLOR.bone, transparency: 55,
    charSpacing: 2.5, align: "left", valign: "top", margin: 0.03,
  });

  // Center column: long table illustration
  panel(s, 7.03, 0.83, 5.94, 9.58, COLOR.navyDeep);
  s.addImage({ path: IMG("image-3-2.png"), x: 7.04, y: 0.84, w: 5.92, h: 9.56 });
  s.addText("— THE LONG TABLE", {
    x: 7.29, y: 9.88, w: 5.00, h: 0.34,
    fontFace: FONT, fontSize: 18,
    color: COLOR.bone, transparency: 55,
    charSpacing: 2.5, align: "left", valign: "top", margin: 0.03,
  });

  // Right column top: charcoal & smoke (olive panel)
  panel(s, 13.22, 0.83, 5.94, 4.70, COLOR.olive);
  s.addImage({ path: IMG("image-3-3.png"), x: 13.23, y: 0.84, w: 5.92, h: 4.68 });
  s.addText("— CHARCOAL & SMOKE", {
    x: 13.48, y: 4.99, w: 5.50, h: 0.34,
    fontFace: FONT, fontSize: 18,
    color: COLOR.bone, transparency: 55,
    charSpacing: 2.5, align: "left", valign: "top", margin: 0.03,
  });

  // Right column bottom: blue door (navy panel)
  panel(s, 13.22, 5.72, 5.94, 4.70, COLOR.navyDeep);
  s.addImage({ path: IMG("image-3-4.png"), x: 13.23, y: 5.73, w: 5.92, h: 4.68 });
  s.addText("— BLUE DOOR", {
    x: 13.48, y: 9.88, w: 4.50, h: 0.34,
    fontFace: FONT, fontSize: 18,
    color: COLOR.bone, transparency: 55,
    charSpacing: 2.5, align: "left", valign: "top", margin: 0.03,
  });
}

// =============================================================================
// SLIDE 4 — The Plate (menu list + ochre 12-dishes panel)
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.bone };

  eyebrow(s, "03 — THE PLATE", 1.04, 1.04, { w: 9.07 });
  s.addText("The Plate.", {
    x: 1.04, y: 1.76, w: 9.07, h: 1.30,
    fontFace: FONT, fontSize: 72, bold: true,
    color: COLOR.ink, align: "left", valign: "top", margin: 0.03,
  });

  // Five-row menu, each row ≈ 0.94" tall: hairline rule above + label/title/tag
  // metaW values widened from source so labels fit cleanly across renderers.
  const menuRows = [
    { num: "— 01", title: "Souvlaki ",     tag: "pork, lemon, oregano",      meta: "CHARCOAL",        metaW: 2.30, metaX: 7.65 },
    { num: "— 02", title: "Spanakopita ",  tag: "spinach, feta, dill",        meta: "HAND-PULLED",     metaW: 2.30, metaX: 7.65 },
    { num: "— 03", title: "Horiatiki ",    tag: "tomato, cucumber, feta slab",meta: "COLD",            metaW: 2.30, metaX: 7.65 },
    { num: "— 04", title: "Loukoumades ",  tag: "thyme honey, walnut",        meta: "FRIED TO ORDER",  metaW: 2.85, metaX: 7.10 },
    { num: "— 05", title: "Greek coffee ", tag: "brewed in sand",             meta: "ALL DAY",         metaW: 2.30, metaX: 7.65 },
  ];

  // Top divider above first row
  rule(s, 1.04, 3.34, 8.81, COLOR.ink);

  // OOXML positions: row n number-y values are 3.72, 4.66, 5.60, 6.54, 7.95
  // separators at y = 4.28, 5.22, 6.16, 7.58, 8.52
  const rowYs   = [3.72, 4.66, 5.60, 6.54, 7.95];   // y for "— 0N" eyebrow
  const titleYs = [3.58, 4.52, 5.46, 6.40, 7.82];   // y for title text
  const sepYs   = [4.28, 5.22, 6.16, 7.58, 8.52];   // y for hairlines below row

  menuRows.forEach((r, i) => {
    // Row index "— 0N"
    s.addText(r.num, {
      x: 1.04, y: rowYs[i], w: 0.92, h: 0.34,
      fontFace: FONT, fontSize: 18,
      color: COLOR.ink, transparency: 55,
      charSpacing: 2.5, align: "left", valign: "top", margin: 0.03,
    });

    // Title (bold ink) + descriptor (italic navy)
    s.addText([
      { text: r.title, options: { fontSize: 28.5, color: COLOR.ink     } },
      { text: r.tag,   options: { fontSize: 22.5, color: COLOR.navyMid, italic: true } },
    ], {
      x: 2.12, y: titleYs[i], w: (i === 3 ? 5.14 : 6.88), h: (i === 3 ? 0.98 : 0.51),
      fontFace: FONT,
      align: "left", valign: "top", margin: 0.03,
      paraSpaceAfter: 0,
    });

    // Right-side meta tag
    s.addText(r.meta, {
      x: r.metaX, y: rowYs[i], w: r.metaW, h: 0.34,
      fontFace: FONT, fontSize: 16,
      color: COLOR.ink, transparency: 35,
      charSpacing: 1.5, align: "left", valign: "top", margin: 0.03,
    });

    // Hairline rule below row
    rule(s, 1.04, sepYs[i], 8.81, COLOR.ink);
  });

  // Right ochre panel
  panel(s, 10.48, 0, 9.52, 11.25, COLOR.ochre);

  // "MENU, DISTILLED" eyebrow on panel
  s.addText("MENU, DISTILLED", {
    x: 11.10, y: 0.62, w: 8.52, h: 0.39,
    fontFace: FONT, fontSize: 18,
    color: COLOR.ink, transparency: 55,
    charSpacing: 2.5, align: "left", valign: "top", margin: 0.03,
  });

  // Massive "12 dishes" — rich text mixing huge regular "12" with smaller italic "dishes"
  s.addText([
    { text: "12 ",     options: { fontSize: 240, color: COLOR.ink } },
    { text: "dishes",  options: { fontSize:  43.2, italic: true, color: COLOR.ink } },
  ], {
    x: 11.10, y: 0.97, w: 8.52, h: 2.88,
    fontFace: FONT,
    bold: false,
    align: "left", valign: "top", margin: 0,
    paraSpaceAfter: 0,
  });

  // Footer descriptor on panel
  s.addText("A short, confident menu. Twelve dishes, done extremely well. No truffle oil, no fusion, no apologies.", {
    x: 11.10, y: 8.84, w: 7.80, h: 1.85,
    fontFace: FONT, fontSize: 22, italic: true,
    color: COLOR.ink, align: "left", valign: "top", margin: 0.03,
  });
}

// =============================================================================
// SLIDE 5 — The Light (mood quote + color swatches + sun illustration)
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.bone };

  // Eyebrow
  eyebrow(s, "04 — THE LIGHT", 1.04, 2.94, { w: 8.15 });

  // Big italic quote with terracotta accent on "summer in Hydra"
  s.addText([
    { text: "We want guests to walk in and feel ",
      options: { italic: true, color: COLOR.ink } },
    { text: "summer in Hydra ",
      options: { italic: true, color: COLOR.terracotta } },
    { text: "— even on a grey Michigan Tuesday.",
      options: { italic: true, color: COLOR.ink } },
  ], {
    x: 1.04, y: 3.62, w: 8.15, h: 2.80,
    fontFace: FONT, fontSize: 42,
    align: "left", valign: "top", margin: 0.03,
    paraSpaceAfter: 0,
  });

  // Caption above palette
  s.addText("— MOOD, IN ONE SENTENCE", {
    x: 1.04, y: 6.51, w: 8.15, h: 0.34,
    fontFace: FONT, fontSize: 18,
    color: COLOR.ink, transparency: 55,
    charSpacing: 2.5, align: "left", valign: "top", margin: 0.03,
  });
  // 5 color swatches with labels — each 1" square + label below
  const swatches = [
    { color: COLOR.bone,        label: "BONE"       },
    { color: COLOR.navyMid,     label: "AEGEAN"     },
    { color: COLOR.ochre,       label: "OCHRE"      },
    { color: COLOR.olive,       label: "OLIVE"      },
    { color: COLOR.terracotta,  label: "TERRACOTTA" },
  ];
  swatches.forEach((sw, i) => {
    const x = 1.04 + i * 1.143;
    // Bone tile gets a hairline border so it's visible on the bone background
    const lineOpt = sw.color === COLOR.bone
      ? { color: COLOR.ink, width: 0.5, transparency: 70 }
      : { type: "none" };
    s.addShape("rect", {
      x, y: 7.30, w: 1.0, h: 1.0,
      fill: { color: sw.color },
      line: lineOpt,
    });
    s.addText(sw.label, {
      x, y: 8.34, w: 1.13, h: 0.34,                       // = swatch pitch, no overlap
      fontFace: FONT, fontSize: 12,                       // reduced so labels never truncate
      color: COLOR.ink, transparency: 35,
      charSpacing: 1, align: "left", valign: "top", margin: 0.03,
    });
  });

  // Right half — navy panel + sun/sea illustration
  panel(s, 10.0, 0, 10.0, 11.25, COLOR.navyDeep);
  s.addImage({ path: IMG("image-5-1.png"), x: 10.01, y: 0.01, w: 9.98, h: 11.23 });
  s.addText("— LATE AFTERNOON", {
    x: 10.26, y: 10.71, w: 5.00, h: 0.34,
    fontFace: FONT, fontSize: 18,
    color: COLOR.bone, transparency: 55,
    charSpacing: 2.5, align: "left", valign: "top", margin: 0.03,
  });
}

// =============================================================================
// SLIDE 6 — The People (4-up persona cards on cream)
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  eyebrow(s, "05 — THE PEOPLE", 1.04, 0.83, { w: 18.45, color: COLOR.navyMid });

  // Title: bold ink "For who," + italic terracotta "by whom."
  s.addText([
    { text: "For who, ",  options: { bold: true,   color: COLOR.ink        } },
    { text: "by whom.",   options: { italic: true, color: COLOR.terracotta } },
  ], {
    x: 1.04, y: 1.18, w: 18.45, h: 0.97,
    fontFace: FONT, fontSize: 60,
    align: "left", valign: "top", margin: 0.03,
    paraSpaceAfter: 0,
  });

  // Persona card data
  const cards = [
    {
      x: 1.04, panelColor: COLOR.ochre,    img: "image-6-1.png",
      tag: "— STUDENT",   tagW: 3.50,
      title: "— THE STUDENT",
      body: "Lunch between classes. $14, twenty minutes, leaves full.",
    },
    {
      x: 5.60, panelColor: COLOR.olive,    img: "image-6-2.png",
      tag: "— PROFESSOR", tagW: 3.50,
      title: "— THE PROFESSOR",
      body: "A glass of assyrtiko and a long Friday lunch.",
    },
    {
      x: 10.17, panelColor: COLOR.navyDeep, img: "image-6-3.png",
      tag: "— FAMILY",    tagW: 3.50,
      title: "— THE FAMILY",
      body: "Sunday early dinner. Loud, generous, six people, one big table.",
    },
    {
      x: 14.73, panelColor: COLOR.cream,    img: "image-6-4.png",
      tag: "— REGULAR",   tagW: 3.50,
      title: "— THE REGULAR",
      body: "Coffee at the counter. Knows the cook. Comes three times a week.",
    },
  ];

  cards.forEach((c) => {
    // Background tile
    panel(s, c.x, 2.53, 4.25, 5.66, c.panelColor);
    s.addImage({ path: IMG(c.img), x: c.x + 0.01, y: 2.54, w: 4.23, h: 5.64 });

    // Overlay tag near bottom of tile (light text on color)
    const tagColor = c.panelColor === COLOR.cream ? COLOR.ink : COLOR.bone;
    s.addText(c.tag, {
      x: c.x + 0.26, y: 7.65, w: c.tagW, h: 0.34,
      fontFace: FONT, fontSize: 18,
      color: tagColor, transparency: 55,
      charSpacing: 2.5, align: "left", valign: "top", margin: 0.03,
    });

    // Card title below tile
    s.addText(c.title, {
      x: c.x, y: 8.37, w: 4.36, h: 0.34,
      fontFace: FONT, fontSize: 18,
      color: COLOR.navyMid,
      charSpacing: 2.5, align: "left", valign: "top", margin: 0.03,
    });

    // Card body below title
    s.addText(c.body, {
      x: c.x, y: 8.86, w: 4.36, h: 0.69,
      fontFace: FONT, fontSize: 18,
      color: COLOR.ink, align: "left", valign: "top", margin: 0.03,
    });
  });

  // Footer divider + closing line
  rule(s, 1.04, 9.93, 17.92, COLOR.ink);
  s.addText("Built by a small team — a Greek-trained chef, a Michigan baker, a host who remembers your name on visit two.", {
    x: 1.04, y: 10.19, w: 10.73, h: 0.80,
    fontFace: FONT, fontSize: 20, italic: true,
    color: COLOR.ink, align: "left", valign: "top", margin: 0.03,
  });

  muted(s, "06 / 08", 17.66, 10.60, 2.30, 0.39);
}

// =============================================================================
// SLIDE 7 — Where (map + neighborhood list)
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.bone };

  // Left half: navy panel + map illustration (image extends slightly below frame)
  panel(s, 0, 0, 10.0, 11.25, COLOR.navyDeep);
  // Image is taller (13.5") than the slide, intentionally cropped at the bottom
  // by the slide edge — match the source by setting h=11.25 (sliced to fit).
  s.addImage({ path: IMG("image-7-1.png"), x: 0, y: 0, w: 10.0, h: 11.25 });

  // Map pin (small ochre dot) + "— MERAKI" label
  s.addShape("ellipse", {
    x: 5.20, y: 5.17, w: 0.25, h: 0.25,
    fill: { color: COLOR.ochre },
    line: { type: "none" },
  });
  s.addText("— MERAKI", {
    x: 5.57, y: 5.01, w: 1.64, h: 0.34,
    fontFace: FONT, fontSize: 18,
    color: COLOR.ochre,
    charSpacing: 2.5, align: "left", valign: "top", margin: 0.03,
  });

  // Eyebrow on left dark panel
  s.addText("06 — WHERE", {
    x: 0.83, y: 0.83, w: 8.58, h: 0.39,
    fontFace: FONT, fontSize: 18,
    color: COLOR.bone, transparency: 55,
    charSpacing: 2.5, align: "left", valign: "top", margin: 0.03,
  });

  // Bottom-left address title + sub
  s.addText("Main & Liberty.", {
    x: 0.83, y: 9.30, w: 8.58, h: 0.85,
    fontFace: FONT, fontSize: 48, bold: true,
    color: COLOR.bone, align: "left", valign: "top", margin: 0.03,
  });
  s.addText("DOWNTOWN ANN ARBOR · 48104", {
    x: 0.83, y: 10.12, w: 8.58, h: 0.34,
    fontFace: FONT, fontSize: 18,
    color: COLOR.ochre,
    charSpacing: 2.5, align: "left", valign: "top", margin: 0.03,
  });

  // Right side: neighborhood
  eyebrow(s, "06 — THE NEIGHBORHOOD", 11.04, 1.04, { w: 8.15 });
  s.addText("Right where Ann Arbor walks.", {
    x: 11.04, y: 1.76, w: 8.15, h: 2.50,
    fontFace: FONT, fontSize: 72, bold: true,
    color: COLOR.ink, align: "left", valign: "top", margin: 0.03,
  });

  // 5-row walkability list with hairline rules
  const walks = [
    { label: "State Theatre & Michigan Theater",  time: "2 min walk" },
    { label: "U-M Central Campus / The Diag",     time: "7 min walk" },
    { label: "Kerrytown Market & Shops",          time: "9 min walk" },
    { label: "Nickels Arcade & Liberty retail",   time: "1 min walk" },
    { label: "Wallace House / Literati Bookstore",time: "3 min walk" },
  ];

  // OOXML coords: separators at 4.91, 5.62, 6.32, 7.03, 7.74, 8.44
  const sepYs   = [4.91, 5.62, 6.32, 7.03, 7.74, 8.44];
  const labelYs = [5.11, 5.82, 6.53, 7.23, 7.94];
  const timeYs  = [5.13, 5.84, 6.54, 7.25, 7.96];

  rule(s, 11.04, sepYs[0], 7.92, COLOR.ink);
  walks.forEach((w, i) => {
    s.addText(w.label, {
      x: 11.04, y: labelYs[i], w: 6.30, h: 0.45,         // wide enough to never wrap
      fontFace: FONT, fontSize: 19.5,
      color: COLOR.ink, align: "left", valign: "top", margin: 0.03,
    });
    s.addText(w.time, {
      x: 17.40, y: timeYs[i], w: 1.65, h: 0.34,          // slight extra room for "X min walk"
      fontFace: FONT, fontSize: 18,
      color: COLOR.ink, transparency: 55,
      charSpacing: 2.5, align: "left", valign: "top", margin: 0.03,
    });
    rule(s, 11.04, sepYs[i + 1], 7.92, COLOR.ink);
  });

  // Footer caption
  s.addText("A walk-in lunch crowd by day, a destination dinner spot by night.", {
    x: 11.04, y: 9.60, w: 6.87, h: 0.65,
    fontFace: FONT, fontSize: 20, italic: true,
    color: COLOR.ink, align: "left", valign: "top", margin: 0.03,
  });
}

// =============================================================================
// SLIDE 8 — Invitation (closing CTA on navy)
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.navyDeep };

  // Eyebrow
  s.addText("07 — INVITATION", {
    x: 1.04, y: 1.04, w: 18.45, h: 0.39,
    fontFace: FONT, fontSize: 18,
    color: COLOR.bone, transparency: 55,
    charSpacing: 2.5, align: "left", valign: "top", margin: 0.03,
  });

  // Hero closing line: bold bone "Pull up a " + italic ochre "chair."
  s.addText([
    { text: "Pull up a ", options: { bold: true,   color: COLOR.bone  } },
    { text: "chair.",     options: { italic: true, color: COLOR.ochre } },
  ], {
    x: 1.04, y: 3.40, w: 18.45, h: 2.48,
    fontFace: FONT, fontSize: 165,
    align: "left", valign: "top", margin: 0,
    paraSpaceAfter: 0,
  });

  // Subheading paragraph
  s.addText("We're opening Meraki in late 2026. Looking for partners, neighbors, and a few good cooks. Come eat, come build.", {
    x: 1.04, y: 6.21, w: 11.80, h: 1.40,
    fontFace: FONT, fontSize: 33, italic: true,
    color: COLOR.bone, align: "left", valign: "top", margin: 0.03,
  });

  // 3-up footer: CONTACT / LOCATION / OPENING
  const footers = [
    { label: "CONTACT",  value: "hello@meraki.kitchen", x: 1.04 },
    { label: "LOCATION", value: "Main & Liberty, A2",    x: 7.12 },
    { label: "OPENING",  value: "Autumn 2026",            x: 13.21 },
  ];
  footers.forEach((f) => {
    s.addText(f.label, {
      x: f.x, y: 9.36, w: 5.92, h: 0.34,
      fontFace: FONT, fontSize: 18,
      color: COLOR.bone, transparency: 55,
      charSpacing: 2.5, align: "left", valign: "top", margin: 0.03,
    });
    s.addText(f.value, {
      x: f.x, y: 9.77, w: 5.92, h: 0.55,
      fontFace: FONT, fontSize: 27,
      color: COLOR.bone, align: "left", valign: "top", margin: 0.03,
    });
  });
}

// =============================================================================
// Write file
// =============================================================================
pres.writeFile({ fileName: "greek_ann_arbor.pptx" })
    .then((fname) => console.log(`✓ Wrote ${fname}`))
    .catch((err)  => { console.error("✗ Failed:", err); process.exit(1); });
