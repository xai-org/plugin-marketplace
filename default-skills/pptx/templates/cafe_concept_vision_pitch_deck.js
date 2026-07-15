/*
 * dessert_spot.js
 *
 * Recreates "dessert_spot.pptx" — the "Marginalia" dessert café vision deck —
 * using pptxgenjs.
 *
 * Usage:
 *   npm install pptxgenjs
 *   node dessert_spot.js
 *
 * Expects an `assets/` folder next to this file containing the original
 * illustrations:
 *   image-1-1.png  image-1-2.png  image-1-3.png
 *   image-2-1.png  image-2-2.png
 *   image-3-1.png
 *   image-4-1.png … image-4-6.png
 *   image-5-1.png
 *   image-6-1.png … image-6-4.png
 *   image-7-1.png
 *   image-8-1.png  image-8-2.png
 *
 * Output: dessert_spot.pptx in the current working directory.
 */

const pptxgen = require("pptxgenjs");
const path = require("path");

// ---------------------------------------------------------------------------
// Palette — extracted from the source deck
// ---------------------------------------------------------------------------
const C = {
  espresso:    "2B1810", // deep brown — primary text + slide-edge background
  cream:       "F4E9D8", // warm cream — slide 1 + slide 3 + slide 6 page color
  paper:       "FBF6EE", // off-white — slide 2 + 4 + 5 + 7 page color
  terracotta:  "C97B5C", // accent / italic-emphasis word + slide 8 background
  cocoa:       "6B4423", // muted brown — body copy + small captions
};

// ---------------------------------------------------------------------------
// Setup — custom 20" × 11.25" widescreen layout (matches source)
// ---------------------------------------------------------------------------
const pres = new pptxgen();
pres.title  = "Marginalia — A Vision Deck";
pres.author = "Marginalia";
pres.defineLayout({ name: "CUSTOM", width: 20, height: 11.25 });
pres.layout = "CUSTOM";

const SW = 20;     // slide width (in)
const SH = 11.25;  // slide height (in)

// Resolve image paths relative to this script
const img = (name) => path.join(__dirname, "assets", name);

// ---------------------------------------------------------------------------
// Helper: page chrome shared by slides 2–8 (top rule, header, footer, page #)
// ---------------------------------------------------------------------------
function addChrome(slide, sectionTitle, pageNum, opts = {}) {
  const ruleColor    = opts.ruleColor    || C.espresso;
  const textColor    = opts.textColor    || C.espresso;
  const includeRule  = opts.includeRule !== false;

  // Thin horizontal rule near the top
  if (includeRule) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 1.25, y: 1.07, w: 17.5, h: 0.01,
      fill: { color: ruleColor }, line: { type: "none" },
    });
  }

  // Top-left wordmark
  slide.addText("MARGINALIA · A VISION", {
    x: 1.25, y: 0.60, w: 6, h: 0.34,
    fontFace: "Arial", fontSize: 9, charSpacing: 2.16,
    color: textColor, bold: false, italic: false,
    align: "left", valign: "top", margin: 0,
  });

  // Top-right section name (italic)
  slide.addText(sectionTitle, {
    x: SW - 1.25 - 4, y: 0.58, w: 4, h: 0.39,
    fontFace: "Arial", fontSize: 9, charSpacing: 0.72,
    color: textColor, italic: true,
    align: "right", valign: "top", margin: 0,
  });

  // Bottom-left location (italic)
  slide.addText("Ann Arbor, Michigan", {
    x: 1.25, y: 10.38, w: 4, h: 0.41,
    fontFace: "Arial", fontSize: 9.75,
    color: textColor, italic: true,
    align: "left", valign: "top", margin: 0,
  });

  // Bottom-right page number
  slide.addText(`pp. ${String(pageNum).padStart(2, "0")}`, {
    x: SW - 1.25 - 1, y: 10.42, w: 1, h: 0.34,
    fontFace: "Arial", fontSize: 9, charSpacing: 2.16,
    color: textColor,
    align: "right", valign: "top", margin: 0,
  });
}

// Layered page background: solid color + 40% white wash (matches source XML)
function addPageBackground(slide, color) {
  slide.background = { color: C.espresso }; // outer dark frame
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: SW, h: SH,
    fill: { color }, line: { type: "none" },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: SW, h: SH,
    fill: { color: "FFFFFF", transparency: 60 }, line: { type: "none" },
  });
}

// ---------------------------------------------------------------------------
// SLIDE 1 — Cover
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  addPageBackground(s, C.cream);

  // Decorative branches in opposite corners (image-1-2 is rotated 180°)
  s.addImage({ path: img("image-1-1.png"), x: 17.69, y: 0.625, w: 1.46, h: 1.46 });
  s.addImage({ path: img("image-1-2.png"), x: 0.83,  y: 8.96,  w: 1.46, h: 1.46, rotate: 180 });

  // Top tagline
  s.addText("— A VISION DECK · MMXXVI —", {
    x: 0, y: 0.94, w: SW, h: 0.34,
    fontFace: "Arial", fontSize: 9, charSpacing: 2.16,
    color: C.cocoa, align: "center", valign: "top", margin: 0,
  });

  // Hero cake illustration, centered horizontally (image-1-3 is 520×572 → ratio 0.909)
  // Source places it at x=8.643, y=2.463, w=2.708, h=2.979
  const heroW = 2.708, heroH = 2.979;
  s.addImage({
    path: img("image-1-3.png"),
    x: (SW - heroW) / 2, y: 2.463, w: heroW, h: heroH,
  });

  // Wordmark — large italic "Marginalia"
  s.addText("Marginalia", {
    x: 0, y: 5.86, w: SW, h: 2.02,
    fontFace: "Arial", fontSize: 150, italic: true,
    color: C.espresso, align: "center", valign: "top", margin: 0,
  });

  // Tagline flanked by short rules
  const taglineY = 8.255;
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.51, y: taglineY + 0.26, w: 0.83, h: 0.01,
    fill: { color: C.cocoa }, line: { type: "none" },
  });
  s.addText("a dessert café for slow afternoons", {
    x: 0, y: taglineY, w: SW, h: 0.55,
    fontFace: "Arial", fontSize: 28.5, italic: true,
    color: C.cocoa, align: "center", valign: "top", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 12.66, y: taglineY + 0.26, w: 0.83, h: 0.01,
    fill: { color: C.cocoa }, line: { type: "none" },
  });

  // Bottom location
  s.addText("ANN ARBOR · MICHIGAN", {
    x: 0, y: 10.32, w: SW, h: 0.34,
    fontFace: "Arial", fontSize: 9, charSpacing: 2.16,
    color: C.cocoa, align: "center", valign: "top", margin: 0,
  });
}

// ---------------------------------------------------------------------------
// SLIDE 2 — The Idea
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  addPageBackground(s, C.paper);
  addChrome(s, "The Idea", 2);

  // ¶ THE IDEA pretitle
  s.addText("¶ THE IDEA", {
    x: 1.25, y: 2.80, w: 8.48, h: 0.34,
    fontFace: "Arial", fontSize: 9, charSpacing: 2.16,
    color: C.terracotta, align: "left", valign: "top", margin: 0,
  });

  // Main statement with italic colored emphasis on "stay"
  s.addText([
    { text: "A bakery you can ",   options: { color: C.espresso } },
    { text: "stay",                options: { color: C.terracotta, italic: true } },
    { text: " in.",                options: { color: C.espresso } },
  ], {
    x: 1.25, y: 3.51, w: 9.5, h: 1.71,
    fontFace: "Arial", fontSize: 28.5,
    align: "left", valign: "top", margin: 0,
  });

  // Body copy
  s.addText(
    "Pastries from a real oven, coffee pulled with care, and a quiet room full of secondhand books — open to anyone with an afternoon to spend.",
    {
      x: 1.25, y: 5.64, w: 9, h: 2.10,
      fontFace: "Arial", fontSize: 12.75,
      color: C.cocoa, align: "left", valign: "top", margin: 0,
      paraSpaceAfter: 0,
    }
  );

  // BAKE · BREW · LINGER row (terracotta dots between cocoa words)
  const rowY = 8.36;
  let cx = 1.25;
  const seg = (text, color) => {
    s.addText(text, {
      x: cx, y: rowY, w: 5, h: 0.34,
      fontFace: "Arial", fontSize: 9, charSpacing: 2.16,
      color, align: "left", valign: "top", margin: 0,
    });
  };
  seg("BAKE", C.cocoa);        cx += 1.16;
  seg("·",    C.terracotta);   cx += 0.49;
  seg("BREW", C.cocoa);        cx += 1.24;
  seg("·",    C.terracotta);   cx += 0.49;
  seg("LINGER", C.cocoa);

  // Right-side illustrations: book + coffee cup
  s.addImage({ path: img("image-2-1.png"), x: 12.25, y: 2.70, w: 3.94, h: 3.14 });
  s.addImage({ path: img("image-2-2.png"), x: 13.85, y: 5.23, w: 2.86, h: 3.12 });
}

// ---------------------------------------------------------------------------
// SLIDE 3 — The Feeling
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  addPageBackground(s, C.cream);
  addChrome(s, "The Feeling", 3);

  // Hero illustration centered
  s.addImage({ path: img("image-3-1.png"), x: 6.77, y: 1.35, w: 6.46, h: 5.17 });

  // Pull-quote — large italic, centered
  s.addText("\u201CStay as long as the chapter is good.\u201D", {
    x: 0.99, y: 8.52, w: 18.02, h: 0.87,
    fontFace: "Arial", fontSize: 54, italic: true,
    color: C.espresso, align: "center", valign: "top", margin: 0,
  });

  // Attribution
  s.addText("— THE ONLY HOUSE RULE", {
    x: 0.99, y: 9.60, w: 18.02, h: 0.34,
    fontFace: "Arial", fontSize: 9, charSpacing: 2.16,
    color: C.cocoa, align: "center", valign: "top", margin: 0,
  });
}

// ---------------------------------------------------------------------------
// SLIDE 4 — The Menu (2x3 grid of items)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  addPageBackground(s, C.paper);
  addChrome(s, "The Menu", 4);

  // Title
  s.addText("From the case, & the kitchen.", {
    x: 1.25, y: 1.46, w: 13, h: 1.31,
    fontFace: "Arial", fontSize: 33, italic: true,
    color: C.espresso, align: "left", valign: "top", margin: 0,
  });

  // Section glyph (Roman numeral IV)
  s.addText("\u00B6 \u2163", {
    x: 18.23, y: 2.17, w: 1, h: 0.36,
    fontFace: "Arial", fontSize: 9, charSpacing: 2.16,
    color: C.terracotta, align: "left", valign: "top", margin: 0,
  });

  // 6 menu items: { image, title, subtitle (two lines), grid x/y }
  const items = [
    // Top row — y reference 3.12
    { img: "image-4-1.png", iw: 1.67, ih: 1.83, ix: 3.12,  iy: 3.12,
      title: "Layer cakes",  sub: ["sliced by the wedge,", "on thrifted china"] },
    { img: "image-4-2.png", iw: 1.67, ih: 1.50, ix: 9.17,  iy: 3.29,
      title: "Pies & tarts", sub: ["seasonal fruit", "from Argus & the market"] },
    { img: "image-4-3.png", iw: 1.67, ih: 1.33, ix: 15.21, iy: 3.38,
      title: "Pastries",     sub: ["laminated, every", "morning before sunrise"] },
    // Bottom row — y reference 7.13
    { img: "image-4-4.png", iw: 1.67, ih: 1.33, ix: 3.12,  iy: 7.13,
      title: "Cookies",      sub: ["six on the counter,", "still warm by ten"] },
    { img: "image-4-5.png", iw: 1.67, ih: 1.36, ix: 9.17,  iy: 7.11,
      title: "Fruit bowls",  sub: ["something light", "for longer stays"] },
    { img: "image-4-6.png", iw: 1.67, ih: 1.83, ix: 15.21, iy: 6.88,
      title: "Coffee & tea", sub: ["one bean, one leaf,", "done properly"] },
  ];

  // Column dividers (faint horizontal rules under each item)
  const dividerXs   = [1.25, 7.29, 13.33];
  const dividerYTop = 6.56;
  const dividerYBot = 10.31;
  for (const dx of dividerXs) {
    [dividerYTop, dividerYBot].forEach((dy) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x: dx, y: dy, w: 5.42, h: 0.01,
        fill: { color: C.cocoa, transparency: 75 }, line: { type: "none" },
      });
    });
  }

  // Render each item
  items.forEach((it) => {
    const colCenter = it.ix + it.iw / 2;     // image's centerline
    const tw = 5.0;                          // text column width
    const tx = colCenter - tw / 2;           // text-block left so labels center under image

    s.addImage({ path: img(it.img), x: it.ix, y: it.iy, w: it.iw, h: it.ih });

    s.addText(it.title, {
      x: tx, y: it.iy + it.ih + 0.20, w: tw, h: 0.57,
      fontFace: "Arial", fontSize: 13.5, italic: true,
      color: C.espresso, align: "center", valign: "top", margin: 0,
    });

    s.addText(
      [
        { text: it.sub[0], options: { breakLine: true } },
        { text: it.sub[1] },
      ],
      {
        x: tx, y: it.iy + it.ih + 0.85, w: tw, h: 0.75,
        fontFace: "Arial", fontSize: 9, italic: true,
        color: C.cocoa, align: "center", valign: "top", margin: 0,
      }
    );
  });
}

// ---------------------------------------------------------------------------
// SLIDE 5 — The Space (storefront + 3-column descriptions)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  addPageBackground(s, C.paper);
  addChrome(s, "The Space", 5);

  s.addText("One room, three corners.", {
    x: 1.25, y: 1.46, w: 13, h: 1.31,
    fontFace: "Arial", fontSize: 33, italic: true,
    color: C.espresso, align: "left", valign: "top", margin: 0,
  });

  s.addText("\u00B6 \u2164", {
    x: 18.29, y: 2.17, w: 1, h: 0.36,
    fontFace: "Arial", fontSize: 9, charSpacing: 2.16,
    color: C.terracotta, align: "left", valign: "top", margin: 0,
  });

  // Storefront illustration centered
  s.addImage({ path: img("image-5-1.png"), x: 6.77, y: 3.12, w: 6.46, h: 4.61 });

  // Three columns: i. ii. iii.
  const cols = [
    { x: 1.25,  num: "i.",   head: "A counter you can see across",
      body: "the bake case at the front, the espresso bar lit warm." },
    { x: 7.36,  num: "ii.",  head: "A reading room in the back",
      body: "soft chairs, low lamps, a wall of books — borrow or bring." },
    { x: 13.47, num: "iii.", head: "A long shared table",
      body: "for laptops, journals, conversations that take a while." },
  ];

  cols.forEach((c) => {
    // Short top rule above each column
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: 8.03, w: 5.28, h: 0.01,
      fill: { color: C.espresso }, line: { type: "none" },
    });
    s.addText(c.num, {
      x: c.x, y: 8.23, w: 5.44, h: 0.36,
      fontFace: "Arial", fontSize: 9.75, charSpacing: 2.34,
      color: C.terracotta, align: "left", valign: "top", margin: 0,
    });
    s.addText(c.head, {
      x: c.x, y: 8.65, w: 5.44, h: 0.40,
      fontFace: "Arial", fontSize: 11.25, italic: true,
      color: C.espresso, align: "left", valign: "top", margin: 0,
    });
    s.addText(c.body, {
      x: c.x, y: 9.12, w: 5.44, h: 0.90,
      fontFace: "Arial", fontSize: 9,
      color: C.cocoa, align: "left", valign: "top", margin: 0,
    });
  });
}

// ---------------------------------------------------------------------------
// SLIDE 6 — Who It's For (illustrations on left, persona list on right)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  addPageBackground(s, C.cream);
  addChrome(s, "Who It's For", 6);

  // Left-side scattered illustrations
  s.addImage({ path: img("image-6-1.png"), x: 1.99, y: 2.32, w: 3.12, h: 2.40 }); // book
  s.addImage({ path: img("image-6-3.png"), x: 6.24, y: 4.64, w: 2.54, h: 2.75 }); // coffee
  s.addImage({ path: img("image-6-2.png"), x: 5.29, y: 6.65, w: 2.75, h: 2.33 }); // pastry plate
  s.addImage({ path: img("image-6-4.png"), x: 1.62, y: 7.89, w: 1.25, h: 1.25 }); // small accent

  // Right-side title
  s.addText([
    { text: "For the people who like to ", options: { color: C.espresso } },
    { text: "stay.",                       options: { color: C.terracotta } },
  ], {
    x: 9.70, y: 2.30, w: 9.32, h: 1.97,
    fontFace: "Arial", fontSize: 33, italic: true,
    align: "left", valign: "top", margin: 0,
  });

  // Persona rows
  const rows = [
    { num: "0 1", who: "the grad student",         note: "— who needs a softer desk than the library" },
    { num: "0 2", who: "the first-date couple",    note: "— who wanted somewhere with cake" },
    { num: "0 3", who: "the sunday reader",        note: "— three hours, one book, one croissant" },
    { num: "0 4", who: "the off-shift writer",     note: "— tea, notebook, the corner banquette" },
    { num: "0 5", who: "the friends who walked over", note: "— just to see what we had today" },
  ];

  // y coords from source: numerals at 4.87, 5.80, 6.74, 7.68, 8.62
  // dividers at:                   5.40, 6.34, 7.28, 8.21, 9.15
  const numYs   = [4.87, 5.80, 6.74, 7.68, 8.62];
  const divYs   = [5.40, 6.34, 7.28, 8.21, 9.15];

  rows.forEach((r, i) => {
    const ny = numYs[i];
    s.addText(r.num, {
      x: 9.70, y: ny, w: 0.6, h: 0.34,
      fontFace: "Arial", fontSize: 9, charSpacing: 2.16,
      color: C.terracotta, align: "left", valign: "top", margin: 0,
    });
    s.addText(r.who, {
      x: 10.32, y: ny - 0.13, w: 4.0, h: 0.51,
      fontFace: "Arial", fontSize: 12, italic: true,
      color: C.espresso, align: "left", valign: "top", margin: 0,
    });
    s.addText(r.note, {
      x: 13.91, y: ny - 0.03, w: 5.0, h: 0.39,
      fontFace: "Arial", fontSize: 9, italic: true,
      color: C.cocoa, align: "left", valign: "top", margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 9.70, y: divYs[i], w: 9.05, h: 0.01,
      fill: { color: C.cocoa, transparency: 69 }, line: { type: "none" },
    });
  });
}

// ---------------------------------------------------------------------------
// SLIDE 7 — The Neighborhood
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  addPageBackground(s, C.paper);
  addChrome(s, "The Neighborhood", 7);

  s.addText("\u00B6 ANN ARBOR", {
    x: 1.25, y: 1.67, w: 8.74, h: 0.34,
    fontFace: "Arial", fontSize: 9, charSpacing: 2.16,
    color: C.terracotta, align: "left", valign: "top", margin: 0,
  });

  s.addText("A college town that already loves a long afternoon.", {
    x: 1.25, y: 2.28, w: 9.5, h: 2.54,
    fontFace: "Arial", fontSize: 28.5, italic: true,
    color: C.espresso, align: "left", valign: "top", margin: 0,
  });

  s.addText(
    "Walking distance to campus, the library, and the bookstores on State Street — a few blocks from the river, near the corner where you'd expect a place like this to be.",
    {
      x: 1.25, y: 5.19, w: 9.0, h: 2.61,
      fontFace: "Arial", fontSize: 12.75,
      color: C.cocoa, align: "left", valign: "top", margin: 0,
    }
  );

  // Three stat columns
  const stats = [
    { x: 1.25, num: "~50k",   l1: "students within",  l2: "a mile" },
    { x: 4.18, num: "~3 mo.", l1: "a long winter",    l2: "that needs warming" },
    { x: 7.11, num: "1",      l1: "spot like this,",  l2: "that doesn't exist yet" },
  ];

  stats.forEach((st) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: st.x, y: 8.26, w: 2.62, h: 0.01,
      fill: { color: C.espresso }, line: { type: "none" },
    });
    s.addText(st.num, {
      x: st.x, y: 8.46, w: 2.7, h: 0.62,
      fontFace: "Arial", fontSize: 21, italic: true,
      color: C.terracotta, align: "left", valign: "top", margin: 0,
    });
    s.addText(
      [
        { text: st.l1, options: { breakLine: true } },
        { text: st.l2 },
      ],
      {
        x: st.x, y: 9.14, w: 2.7, h: 0.85,
        fontFace: "Arial", fontSize: 9.75, italic: true,
        color: C.cocoa, align: "left", valign: "top", margin: 0,
      }
    );
  });

  // Map illustration on the right
  s.addImage({ path: img("image-7-1.png"), x: 11.69, y: 3.46, w: 6.04, h: 4.59 });
}

// ---------------------------------------------------------------------------
// SLIDE 8 — Fin. (terracotta/dark closing slide)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();

  // Solid terracotta + white wash + cream wash (3-layer warmth, matches source)
  s.background = { color: C.espresso };
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: SW, h: SH,
    fill: { color: C.terracotta }, line: { type: "none" },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: SW, h: SH,
    fill: { color: "FFFFFF", transparency: 60 }, line: { type: "none" },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: SW, h: SH,
    fill: { color: C.cream, transparency: 82 }, line: { type: "none" },
  });

  // Decorative branches (top-right + flipped bottom-left)
  s.addImage({ path: img("image-8-1.png"), x: 17.60, y: 0.73, w: 1.46, h: 1.46 });
  s.addImage({ path: img("image-8-2.png"), x: 0.94,  y: 8.85, w: 1.46, h: 1.46, rotate: 180 });

  // Top rule + chrome (cream-on-terracotta)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.25, y: 1.07, w: 17.5, h: 0.01,
    fill: { color: C.cream }, line: { type: "none" },
  });
  s.addText("MARGINALIA · A VISION", {
    x: 1.25, y: 0.60, w: 6, h: 0.34,
    fontFace: "Arial", fontSize: 9, charSpacing: 2.16,
    color: C.cream, align: "left", valign: "top", margin: 0,
  });
  s.addText("Fin.", {
    x: SW - 1.25 - 4, y: 0.58, w: 4, h: 0.39,
    fontFace: "Arial", fontSize: 9, charSpacing: 0.72,
    color: C.cream, italic: true, align: "right", valign: "top", margin: 0,
  });

  // Eyebrow
  s.addText("— IN THE MARGINS, THE BEST NOTES —", {
    x: 0, y: 2.98, w: SW, h: 0.34,
    fontFace: "Arial", fontSize: 9, charSpacing: 2.16,
    color: C.cream, align: "center", valign: "top", margin: 0,
  });

  // Hero closing line
  s.addText("Let's open the door.", {
    x: 0, y: 3.80, w: SW, h: 3.54,
    fontFace: "Arial", fontSize: 63, italic: true,
    color: C.cream, align: "center", valign: "top", margin: 0,
  });

  // Sub-line flanked by short rules
  const subY = 8.04;
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.18, y: subY + 0.22, w: 0.62, h: 0.01,
    fill: { color: C.cream, transparency: 40 }, line: { type: "none" },
  });
  s.addText("a dessert café · ann arbor · 2026", {
    x: 0, y: 7.82, w: SW, h: 0.49,
    fontFace: "Arial", fontSize: 12, italic: true,
    color: C.cream, align: "center", valign: "top", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 12.19, y: subY + 0.22, w: 0.62, h: 0.01,
    fill: { color: C.cream, transparency: 40 }, line: { type: "none" },
  });

  // Footer
  s.addText("thank you for reading.", {
    x: 1.25, y: 10.38, w: 4, h: 0.41,
    fontFace: "Arial", fontSize: 9.75, italic: true,
    color: C.cream, align: "left", valign: "top", margin: 0,
  });
  s.addText("pp. 08", {
    x: SW - 1.25 - 1, y: 10.42, w: 1, h: 0.34,
    fontFace: "Arial", fontSize: 9, charSpacing: 2.16,
    color: C.cream, align: "right", valign: "top", margin: 0,
  });
}

// ---------------------------------------------------------------------------
// Write the file
// ---------------------------------------------------------------------------
pres.writeFile({ fileName: "dessert_spot.pptx" })
    .then((fn) => console.log(`Wrote ${fn}`))
    .catch((err) => { console.error(err); process.exit(1); });
