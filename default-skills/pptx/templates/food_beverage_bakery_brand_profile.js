// Butter Lane Charlotte — bakery deck recreation
// Run: node butter_lane.js   (requires `npm install pptxgenjs`)

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

// -------- Setup --------
const pres = new pptxgen();
pres.author = "Butter Lane";
pres.title = "Butter Lane Charlotte";

// Original deck is 20" × 11.25" — define a custom layout to preserve coordinates 1:1
pres.defineLayout({ name: "BL_WIDE", width: 20, height: 11.25 });
pres.layout = "BL_WIDE";

// -------- Color palette --------
const COL = {
  cream:    "FAF1DC",
  yellow:   "F4D77A",
  darkBg:   "3A2A1A",
  ink:      "2A1F12",
  ink2:     "3B2A1A",
  brown:    "5A4329",
  tan:      "B7733A",
};

// -------- Helpers --------
const FONT_SERIF = "Georgia";
const FONT_SANS  = "Arial";

const ASSETS = path.join(__dirname, "assets");
const img = (name) => path.join(ASSETS, name);

// Reusable label-with-flanking-rules helper used on the title slide
function labelWithRules(slide, { x, y, w, text, ruleColor = COL.ink2 }) {
  // text centered in width w, with a small horizontal rule on each side
  const ruleW = 0.62;
  const ruleH = 0.02;
  const ruleY = y + 0.16; // visually center against the cap-height of 18pt text
  // Left rule
  slide.addShape(pres.shapes.RECTANGLE, {
    x: x, y: ruleY, w: ruleW, h: ruleH,
    fill: { color: ruleColor }, line: { type: "none" },
  });
  // Right rule
  slide.addShape(pres.shapes.RECTANGLE, {
    x: x + w - ruleW, y: ruleY, w: ruleW, h: ruleH,
    fill: { color: ruleColor }, line: { type: "none" },
  });
  // Centered label text
  slide.addText(text, {
    x: x + ruleW + 0.15, y: y, w: w - 2 * (ruleW + 0.15), h: 0.37,
    fontFace: FONT_SANS, fontSize: 18, color: ruleColor,
    bold: false, charSpacing: 4, align: "center", valign: "middle", margin: 0,
  });
}

// =====================================================================
// SLIDE 1 — Title / cover
// =====================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: COL.cream };

  // Soft yellow glow background
  slide.addImage({ path: img("image1.png"), x: 0, y: 0, w: 20, h: 11.25 });

  // Thin inner border
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.73, y: 0.73, w: 18.54, h: 9.79,
    fill: { type: "none" },
    line: { color: COL.darkBg, width: 0.75, transparency: 65 },
  });

  // Top row: "THE NEIGHBORHOOD BAKERY" — left, BL monogram circle — center, "CHARLOTTE · NC" — right
  // small left rule preceding the label
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 2.40, y: 2.70, w: 0.62, h: 0.02,
    fill: { color: COL.ink2 }, line: { type: "none" },
  });
  slide.addText("THE NEIGHBORHOOD BAKERY", {
    x: 3.20, y: 2.54, w: 5.50, h: 0.37,
    fontFace: FONT_SANS, fontSize: 18, color: COL.ink2,
    charSpacing: 4, align: "left", valign: "middle", margin: 0,
  });

  // BL monogram circle — center top
  slide.addShape(pres.shapes.OVAL, {
    x: 9.48, y: 2.19, w: 1.03, h: 1.03,
    fill: { color: COL.cream },
    line: { color: COL.ink2, width: 1 },
  });
  slide.addText(
    [
      { text: "B", options: { fontFace: FONT_SERIF, fontSize: 28, color: COL.ink, bold: false } },
      { text: " · ", options: { fontFace: FONT_SERIF, fontSize: 18, color: COL.ink } },
      { text: "L", options: { fontFace: FONT_SERIF, fontSize: 28, color: COL.ink, bold: false } },
    ],
    { x: 9.48, y: 2.19, w: 1.03, h: 1.03, align: "center", valign: "middle", margin: 0 }
  );

  // CHARLOTTE · NC — right (rule on far right, label aligned to left of rule)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 16.98, y: 2.70, w: 0.62, h: 0.02,
    fill: { color: COL.ink2 }, line: { type: "none" },
  });
  slide.addText("CHARLOTTE · NC", {
    x: 11.30, y: 2.54, w: 5.50, h: 0.37,
    fontFace: FONT_SANS, fontSize: 18, color: COL.ink2,
    charSpacing: 4, align: "right", valign: "middle", margin: 0,
  });

  // Big serif title — "Butter & Lane" with the ampersand in tan italic
  slide.addText(
    [
      { text: "Butter ", options: { color: COL.ink } },
      { text: "& ",       options: { color: COL.tan, italic: true } },
      { text: "Lane",     options: { color: COL.ink } },
    ],
    {
      x: 1.50, y: 3.80, w: 17.00, h: 2.80,
      fontFace: FONT_SERIF, fontSize: 140,
      align: "center", valign: "middle", margin: 0,
    }
  );

  // Tagline — italic serif
  slide.addText("Bread, pastry & cakes — baked fresh, every morning.", {
    x: 2.17, y: 6.95, w: 15.66, h: 1.10,
    fontFace: FONT_SERIF, fontSize: 36, color: COL.brown,
    italic: true, align: "center", valign: "middle", margin: 0,
  });

  // Bottom row: EST. 2026 — A FAMILY BAKERY (with rules) — NO. 01
  slide.addText("EST. 2026", {
    x: 2.40, y: 8.73, w: 2.50, h: 0.37,
    fontFace: FONT_SANS, fontSize: 18, color: COL.ink2,
    charSpacing: 4, align: "left", valign: "middle", margin: 0,
  });

  // A FAMILY BAKERY with flanking rules
  labelWithRules(slide, { x: 8.02, y: 8.73, w: 4.54, text: "A FAMILY BAKERY" });

  slide.addText("NO. 01", {
    x: 15.10, y: 8.73, w: 2.50, h: 0.37,
    fontFace: FONT_SANS, fontSize: 18, color: COL.ink2,
    charSpacing: 4, align: "right", valign: "middle", margin: 0,
  });
}

// =====================================================================
// Helper for inner content slides — header label + page number footer
// =====================================================================
function addCornerHeader(slide, color = COL.ink) {
  slide.addText("Butter Lane Charlotte", {
    x: 1.04, y: 0.62, w: 5.0, h: 0.33,
    fontFace: FONT_SERIF, fontSize: 21, color: color,
    align: "left", valign: "middle", margin: 0,
  });
}

function addPageNumber(slide, n, color = COL.brown) {
  slide.addText(`0${n} / 08`, {
    x: 17.50, y: 10.33, w: 1.55, h: 0.33,
    fontFace: FONT_SANS, fontSize: 18, color: color,
    charSpacing: 4, align: "right", valign: "middle", margin: 0,
  });
}

// =====================================================================
// SLIDE 2 — A family recipe
// =====================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: COL.cream };

  addCornerHeader(slide);

  // Illustration on the left half
  slide.addImage({ path: img("image2.png"), x: 1.04, y: 2.13, w: 8.81, h: 8.70 });

  // Right column: chapter label, big italic-ish title, body
  slide.addText("CHAPTER ONE", {
    x: 10.62, y: 2.35, w: 8.58, h: 0.42,
    fontFace: FONT_SANS, fontSize: 21, color: COL.tan,
    charSpacing: 6, align: "left", valign: "middle", margin: 0,
  });

  slide.addText("A family recipe.", {
    x: 10.62, y: 3.10, w: 8.58, h: 3.10,
    fontFace: FONT_SERIF, fontSize: 99, color: COL.ink,
    align: "left", valign: "top", margin: 0,
  });

  slide.addText(
    "Butter Lane started where every good loaf does — at the kitchen table. " +
    "Three generations of weekend baking, one neighborhood storefront.",
    {
      x: 10.62, y: 6.80, w: 6.09, h: 2.50,
      fontFace: FONT_SERIF, fontSize: 27, color: COL.ink,
      align: "left", valign: "top", margin: 0, paraSpaceAfter: 8,
    }
  );

  // Footer
  slide.addText("FAMILY · BAKERY · CHARLOTTE", {
    x: 1.04, y: 10.33, w: 6.0, h: 0.33,
    fontFace: FONT_SANS, fontSize: 18, color: COL.brown,
    charSpacing: 6, align: "left", valign: "middle", margin: 0,
  });
  addPageNumber(slide, 2);
}

// =====================================================================
// SLIDE 3 — Fresh from the oven (3 breads)
// =====================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: COL.cream };

  addCornerHeader(slide);

  slide.addText("CHAPTER TWO · BREADS", {
    x: 1.04, y: 1.25, w: 8.0, h: 0.42,
    fontFace: FONT_SANS, fontSize: 21, color: COL.tan,
    charSpacing: 6, align: "left", valign: "middle", margin: 0,
  });

  slide.addText("Fresh from\nthe oven.", {
    x: 1.04, y: 1.88, w: 8.0, h: 2.6,
    fontFace: FONT_SERIF, fontSize: 69, color: COL.ink,
    align: "left", valign: "top", margin: 0,
  });

  slide.addText(
    "Wild-yeasted, slow-fermented, and pulled from the deck oven before you've had your coffee.",
    {
      x: 14.20, y: 2.48, w: 4.80, h: 1.80,
      fontFace: FONT_SERIF, fontSize: 21, color: COL.brown,
      italic: true, align: "right", valign: "top", margin: 0,
    }
  );

  // Three illustrated bread items
  const breads = [
    { x: 1.88,  img: "image3.png", title: "Country Sourdough", desc: "Crackling crust, open crumb. The everyday loaf." },
    { x: 8.12,  img: "image4.png", title: "Seeded Rye",        desc: "Caraway, sunflower, flax. Built for sandwiches." },
    { x: 14.38, img: "image5.png", title: "Honey Brioche",     desc: "Buttery, golden, just-sweet enough." },
  ];
  breads.forEach((b) => {
    slide.addImage({ path: img(b.img), x: b.x, y: 4.42, w: 3.75, h: 3.75 });
    // Use a wider centered text box that extends beyond the image bounds
    slide.addText(b.title, {
      x: b.x - 1.5, y: 8.55, w: 6.75, h: 0.7,
      fontFace: FONT_SERIF, fontSize: 32, color: COL.ink,
      align: "center", valign: "middle", margin: 0,
    });
    slide.addText(b.desc, {
      x: b.x - 1.0, y: 9.30, w: 5.75, h: 1.20,
      fontFace: FONT_SERIF, fontSize: 19, color: COL.brown,
      align: "center", valign: "top", margin: 0,
    });
  });

  addPageNumber(slide, 3);
}

// =====================================================================
// SLIDE 4 — The pastry case (yellow background, 3 pastries)
// =====================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: COL.yellow };

  addCornerHeader(slide, COL.ink2);

  slide.addText("CHAPTER THREE · PASTRY", {
    x: 1.04, y: 1.25, w: 8.0, h: 0.42,
    fontFace: FONT_SANS, fontSize: 21, color: COL.brown,
    charSpacing: 6, align: "left", valign: "middle", margin: 0,
  });

  slide.addText("The pastry\ncase.", {
    x: 1.04, y: 1.88, w: 8.0, h: 2.6,
    fontFace: FONT_SERIF, fontSize: 69, color: COL.ink2,
    align: "left", valign: "top", margin: 0,
  });

  slide.addText(
    "Laminated by hand on a cool marble slab, glazed and stacked while still warm.",
    {
      x: 14.20, y: 2.48, w: 4.80, h: 1.80,
      fontFace: FONT_SERIF, fontSize: 21, color: COL.brown,
      italic: true, align: "right", valign: "top", margin: 0,
    }
  );

  const pastries = [
    { x: 1.88,  img: "image6.png", title: "Almond Croissant",      desc: "Double-baked, frangipane filled." },
    { x: 8.12,  img: "image7.png", title: "Cinnamon Morning Bun",  desc: "Crisp edges, soft middle, citrus sugar." },
    { x: 14.38, img: "image8.png", title: "Brown Butter Cookie",   desc: "Crinkled tops, dark chocolate, sea salt." },
  ];
  pastries.forEach((p) => {
    slide.addImage({ path: img(p.img), x: p.x, y: 4.42, w: 3.75, h: 3.75 });
    slide.addText(p.title, {
      x: p.x - 1.5, y: 8.55, w: 6.75, h: 0.7,
      fontFace: FONT_SERIF, fontSize: 32, color: COL.ink2,
      align: "center", valign: "middle", margin: 0,
    });
    slide.addText(p.desc, {
      x: p.x - 1.0, y: 9.30, w: 5.75, h: 1.20,
      fontFace: FONT_SERIF, fontSize: 19, color: COL.brown,
      align: "center", valign: "top", margin: 0,
    });
  });

  addPageNumber(slide, 4, COL.brown);
}

// =====================================================================
// SLIDE 5 — Custom cakes, made to order
// =====================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: COL.cream };

  addCornerHeader(slide);

  slide.addText("CHAPTER FOUR · CAKES", {
    x: 1.04, y: 1.33, w: 9.0, h: 0.42,
    fontFace: FONT_SANS, fontSize: 21, color: COL.tan,
    charSpacing: 6, align: "left", valign: "middle", margin: 0,
  });

  // Mixed-style title: "Custom cakes, " upright + "made to order." italic
  slide.addText(
    [
      { text: "Custom cakes, ", options: { color: COL.ink } },
      { text: "made to order.", options: { color: COL.ink, italic: true } },
    ],
    {
      x: 1.04, y: 2.08, w: 9.0, h: 4.60,
      fontFace: FONT_SERIF, fontSize: 99,
      align: "left", valign: "top", margin: 0,
    }
  );

  slide.addText(
    "Birthdays, weddings, Tuesdays. Tell us the flavor, the story, and the number of candles — we'll handle the rest.",
    {
      x: 1.04, y: 7.10, w: 8.0, h: 2.0,
      fontFace: FONT_SERIF, fontSize: 27, color: COL.ink,
      align: "left", valign: "top", margin: 0, paraSpaceAfter: 8,
    }
  );

  // Two pill chips
  const pills = [
    { x: 1.04, w: 3.87, label: "TWO WEEKS NOTICE" },
    { x: 5.10, w: 3.74, label: "SIX SERVINGS & UP" },
  ];
  pills.forEach((p) => {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: p.x, y: 9.33, w: p.w, h: 0.60,
      fill: { type: "none" },
      line: { color: COL.brown, width: 0.75 },
      rectRadius: 0.30,
    });
    slide.addText(p.label, {
      x: p.x, y: 9.33, w: p.w, h: 0.60,
      fontFace: FONT_SANS, fontSize: 16, color: COL.brown,
      charSpacing: 6, align: "center", valign: "middle", margin: 0,
    });
  });

  // Cake illustration on right
  slide.addImage({ path: img("image9.png"), x: 10.42, y: 1.25, w: 8.54, h: 8.75 });

  // Footer
  slide.addText("ORDER AHEAD · TWO WEEKS", {
    x: 1.04, y: 10.33, w: 6.0, h: 0.33,
    fontFace: FONT_SANS, fontSize: 18, color: COL.brown,
    charSpacing: 6, align: "left", valign: "middle", margin: 0,
  });
  addPageNumber(slide, 5);
}

// =====================================================================
// SLIDE 6 — Made for the block (dark mode)
// =====================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: COL.darkBg };

  addCornerHeader(slide, COL.yellow);

  slide.addText("CHAPTER FIVE", {
    x: 1.04, y: 2.55, w: 8.0, h: 0.42,
    fontFace: FONT_SANS, fontSize: 21, color: COL.tan,
    charSpacing: 6, align: "left", valign: "middle", margin: 0,
  });

  // Mixed color, italic serif title — final phrase highlighted in yellow
  slide.addText(
    [
      { text: "Made for the block, the morning rush, the ", options: { color: COL.cream, italic: true } },
      { text: "Sunday table.",                                options: { color: COL.yellow, italic: true } },
    ],
    {
      x: 1.04, y: 3.31, w: 9.0, h: 3.50,
      fontFace: FONT_SERIF, fontSize: 56,
      align: "left", valign: "top", margin: 0,
    }
  );

  slide.addText(
    "We bake for our neighbors first — the regulars who know our names and the cafés down the street.",
    {
      x: 1.04, y: 7.10, w: 7.5, h: 2.0,
      fontFace: FONT_SERIF, fontSize: 27, color: COL.cream,
      align: "left", valign: "top", margin: 0, paraSpaceAfter: 8,
    }
  );

  // Storefront illustration on right
  slide.addImage({ path: img("image10.png"), x: 10.42, y: 1.35, w: 8.54, h: 8.54 });

  // Footer
  slide.addText("CHARLOTTE · NC", {
    x: 1.04, y: 10.33, w: 5.0, h: 0.33,
    fontFace: FONT_SANS, fontSize: 18, color: COL.tan,
    charSpacing: 6, align: "left", valign: "middle", margin: 0,
  });
  addPageNumber(slide, 6, COL.tan);
}

// =====================================================================
// SLIDE 7 — For cafés & shops (numbered list)
// =====================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: COL.cream };

  addCornerHeader(slide);

  slide.addText("CHAPTER SIX · WHOLESALE", {
    x: 1.04, y: 1.04, w: 8.69, h: 0.42,
    fontFace: FONT_SANS, fontSize: 21, color: COL.tan,
    charSpacing: 6, align: "left", valign: "middle", margin: 0,
  });

  slide.addText("For cafés &\nshops.", {
    x: 1.04, y: 1.80, w: 8.69, h: 3.0,
    fontFace: FONT_SERIF, fontSize: 87, color: COL.ink,
    align: "left", valign: "top", margin: 0,
  });

  // Three numbered rows separated by hairlines
  const items = [
    { y: 4.67, num: "i",   title: "Daily bread",
      desc: "Standing wholesale orders for sourdough, baguette, and brioche — delivered before opening." },
    { y: 6.82, num: "ii",  title: "Pastry trays",
      desc: "Mixed cases of laminated pastry, cookies, and morning buns — restocked twice a week." },
    { y: 8.96, num: "iii", title: "Custom collaborations",
      desc: "Co-branded pastries and seasonal specials, baked just for your shop." },
  ];

  // Top hairline above first item
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 1.04, y: 4.50, w: 8.44, h: 0.01,
    fill: { color: COL.tan, transparency: 60 }, line: { type: "none" },
  });

  items.forEach((it) => {
    slide.addText(it.num, {
      x: 1.04, y: it.y, w: 0.81, h: 0.62,
      fontFace: FONT_SERIF, fontSize: 33, color: COL.tan,
      italic: true, align: "left", valign: "middle", margin: 0,
    });
    slide.addText(it.title, {
      x: 2.02, y: it.y, w: 7.68, h: 0.62,
      fontFace: FONT_SERIF, fontSize: 33, color: COL.ink,
      align: "left", valign: "middle", margin: 0,
    });
    slide.addText(it.desc, {
      x: 2.02, y: it.y + 0.80, w: 5.98, h: 1.10,
      fontFace: FONT_SERIF, fontSize: 18, color: COL.brown,
      align: "left", valign: "top", margin: 0,
    });
    // Hairline underneath
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 1.04, y: it.y + 1.95, w: 8.44, h: 0.01,
      fill: { color: COL.tan, transparency: 60 }, line: { type: "none" },
    });
  });

  // Basket illustration on right
  slide.addImage({ path: img("image11.png"), x: 10.68, y: 1.76, w: 8.12, h: 8.33 });

  addPageNumber(slide, 7);
}

// =====================================================================
// SLIDE 8 — Come say hello (yellow contact)
// =====================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: COL.yellow };

  addCornerHeader(slide, COL.ink2);

  slide.addText("CHAPTER SEVEN", {
    x: 1.04, y: 1.04, w: 8.69, h: 0.42,
    fontFace: FONT_SANS, fontSize: 21, color: COL.brown,
    charSpacing: 6, align: "left", valign: "middle", margin: 0,
  });

  slide.addText(
    [
      { text: "Come say ", options: { color: COL.ink2 } },
      { text: "hello.",     options: { color: COL.ink2, italic: true } },
    ],
    {
      x: 1.04, y: 1.67, w: 8.69, h: 2.81,
      fontFace: FONT_SERIF, fontSize: 99,
      align: "left", valign: "top", margin: 0,
    }
  );

  // Three labeled blocks
  const contact = [
    { y: 5.11, label: "FIND US",         body: "A neighborhood bakery in Charlotte, NC.",                       italic: false },
    { y: 7.29, label: "HOURS & ORDERS",  body: "Opening soon — follow along for the first day of bread.",      italic: true  },
    { y: 9.48, label: "GET IN TOUCH",    body: "hello@butterlane.bakery",                                       italic: false },
  ];
  contact.forEach((c) => {
    slide.addText(c.label, {
      x: 1.04, y: c.y, w: 8.69, h: 0.40,
      fontFace: FONT_SANS, fontSize: 19.5, color: COL.brown,
      charSpacing: 6, align: "left", valign: "middle", margin: 0,
    });
    slide.addText(c.body, {
      x: 1.04, y: c.y + 0.54, w: 8.69, h: 1.19,
      fontFace: FONT_SERIF, fontSize: 33, color: COL.ink2,
      italic: c.italic, align: "left", valign: "top", margin: 0,
    });
  });

  // Coffee cup illustration
  slide.addImage({ path: img("image12.png"), x: 11.41, y: 2.25, w: 6.67, h: 7.71 });

  addPageNumber(slide, 8, COL.brown);
}

// -------- Write file --------
pres.writeFile({ fileName: "Butter_Lane.pptx" })
    .then(name => console.log("Wrote " + name));
