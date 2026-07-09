// dish.js
// Replica of Dish_.pptx using pptxgenjs
//
// Usage:
//   npm install pptxgenjs
//   node dish.js
//
// The ./media/ folder (with the image-*.png files shipped alongside this script)
// must sit in the same directory as this file.

const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();

// ---------------------------------------------------------------------------
// Custom slide size: 20" x 11.25" (matches original deck)
// ---------------------------------------------------------------------------
pres.defineLayout({ name: "DISH_WIDE", width: 20, height: 11.25 });
pres.layout = "DISH_WIDE";
pres.author = "Dish! Brunch Kitchen";
pres.title  = "From Farm to Plate";

// ---------------------------------------------------------------------------
// Palette
// ---------------------------------------------------------------------------
const COLORS = {
  forest:    "2F4A3A",  // deep green (title/dark slides)
  cream:     "F4EDE0",  // primary cream background
  creamAlt:  "FBF7EE",  // slightly warmer cream
  parchment: "EBE1CE",  // card / photo panel background
  ink:       "2A2520",  // body dark
  muted:     "5B524A",  // muted body
  rule:      "C9B89A",  // hairline rule
  terracotta:"B8553A",  // red / accent on cream slides
  gold:      "C99142",  // accent on dark slides
};

const FONT_SERIF = "Garamond";
const FONT_SANS  = "Arial";

// Image paths (same folder as script / media subfolder)
const IMG = (name) => path.join(__dirname, "media", name);

// ---------------------------------------------------------------------------
// Re-usable helpers
// ---------------------------------------------------------------------------
function addBackground(slide, color) {
  slide.background = { color };
}

// Top-left eyebrow/kicker ("CHAPTER ONE · THE HOUSE")
function addKicker(slide, text, color = COLORS.terracotta) {
  slide.addText(text, {
    x: 1.04, y: 1.04, w: 18.45, h: 0.33,
    fontFace: FONT_SANS, fontSize: 18, bold: true,
    color, charSpacing: 6, margin: 0,
  });
}

// Footer left ("DISH! · BRUNCH")
function addFooterLeft(slide, color = COLORS.muted) {
  slide.addText("DISH! · BRUNCH", {
    x: 1.04, y: 10.48, w: 4.50, h: 0.33,
    fontFace: FONT_SANS, fontSize: 18, bold: true,
    color, charSpacing: 6, margin: 0,
  });
}

// Page number (bottom right)
function addPageNum(slide, num, color = COLORS.terracotta, x = 18.68) {
  slide.addText(String(num).padStart(2, "0"), {
    x, y: 10.47, w: 0.60, h: 0.40,
    fontFace: FONT_SERIF, fontSize: 21, italic: true,
    color, align: "right", margin: 0,
  });
}

// Thin horizontal rule
function addRule(slide, x, y, w, color = COLORS.rule, alpha = 25) {
  slide.addShape(pres.ShapeType.rect, {
    x, y, w, h: 0.01,
    fill: { color, transparency: 100 - alpha }, line: { type: "none" },
  });
}

// Small caption label like "PHOTO · PLATED" sitting on a cream chip
function addPhotoLabel(slide, x, y, label, chipWidth) {
  // cream chip
  slide.addShape(pres.ShapeType.rect, {
    x, y, w: chipWidth, h: 0.51,
    fill: { color: COLORS.cream }, line: { type: "none" },
  });
  slide.addText(label, {
    x: x + 0.19, y: y + 0.11, w: chipWidth - 0.2, h: 0.33,
    fontFace: FONT_SANS, fontSize: 18, bold: true,
    color: COLORS.ink, charSpacing: 4, margin: 0,
  });
}

// ===========================================================================
// SLIDE 1 — Title
// ===========================================================================
{
  const s = pres.addSlide();
  addBackground(s, COLORS.forest);

  // Eyebrow
  s.addText("DISH! · EAST END HOUSTON", {
    x: 1.04, y: 1.04, w: 16.87, h: 0.33,
    fontFace: FONT_SANS, fontSize: 18, bold: true,
    color: COLORS.gold, charSpacing: 6, margin: 0,
  });

  // Main title: "From Farm to Plate" — 'to' in gold italic
  s.addText(
    [
      { text: "From Farm ", options: { color: COLORS.cream } },
      { text: "to ",          options: { color: COLORS.gold, italic: true } },
      { text: "Plate",        options: { color: COLORS.cream } },
    ],
    {
      x: 1.04, y: 1.75, w: 17.50, h: 2.30,
      fontFace: FONT_SERIF, fontSize: 110,
      charSpacing: -2, margin: 0, valign: "top",
    }
  );

  // Subtitle
  s.addText(
    "A morning on the brunch line — ingredients, intuition, and a little hot honey.",
    {
      x: 1.04, y: 4.80, w: 17.50, h: 0.70,
      fontFace: FONT_SERIF, fontSize: 28, italic: true,
      color: "EBE1CE", margin: 0,
    }
  );

  // Hairline above the byline row
  addRule(s, 1.04, 8.25, 16.38, COLORS.cream, 25);

  // Left byline
  s.addText("PRESENTED BY", {
    x: 1.04, y: 8.60, w: 3.73, h: 0.33,
    fontFace: FONT_SANS, fontSize: 18, bold: true,
    color: COLORS.gold, charSpacing: 5, margin: 0,
  });
  s.addText("Chef — Dish! Brunch Kitchen", {
    x: 1.04, y: 8.95, w: 6.00, h: 0.50,
    fontFace: FONT_SERIF, fontSize: 27, italic: true,
    color: COLORS.gold, margin: 0,
  });

  // Right byline
  s.addText("A TALK FOR", {
    x: 14.95, y: 8.60, w: 4.00, h: 0.33,
    fontFace: FONT_SANS, fontSize: 18, bold: true,
    color: COLORS.gold, charSpacing: 5, margin: 0, align: "right",
  });
  s.addText("The Cooking School", {
    x: 12.95, y: 8.95, w: 6.00, h: 0.50,
    fontFace: FONT_SERIF, fontSize: 27, italic: true,
    color: COLORS.gold, margin: 0, align: "right",
  });
}

// ===========================================================================
// SLIDE 2 — About Dish!  (2x2 grid of labelled blurbs)
// ===========================================================================
{
  const s = pres.addSlide();
  addBackground(s, COLORS.cream);

  addKicker(s, "CHAPTER ONE · THE HOUSE");

  // Main title
  s.addText("About Dish!", {
    x: 1.04, y: 1.75, w: 18.45, h: 1.27,
    fontFace: FONT_SERIF, fontSize: 84, bold: false,
    color: COLORS.ink, margin: 0,
  });

  // Intro paragraph
  s.addText(
    "A small East End Houston kitchen where BBQ meets brunch — two chefs, two best friends, one menu built on farm-fresh ingredients and homemade technique.",
    {
      x: 1.04, y: 3.27, w: 11.80, h: 1.80,
      fontFace: FONT_SERIF, fontSize: 33,
      color: COLORS.ink, margin: 0, valign: "top",
    }
  );

  // Grid of 2x2 labels
  const cells = [
    { col: 0, row: 0, label: "WHERE",       body: "East End, Houston — a neighborhood spot for locals and late-risers." },
    { col: 1, row: 0, label: "WHAT",        body: "BBQ by day, brunch by morning. One kitchen, two chefs, one menu." },
    { col: 0, row: 1, label: "THE TEAM",    body: "My best friend runs the BBQ pit. I run the brunch line." },
    { col: 1, row: 1, label: "THE KITCHEN", body: "Farm-fresh ingredients, homemade-style plates, nothing shortcut." },
  ];
  const colX = [1.04, 10.42];
  const rowY = [5.74, 8.49];

  cells.forEach(({ col, row, label, body }) => {
    const x = colX[col];
    const y = rowY[row];
    // Hairline
    addRule(s, x, y, 8.54, COLORS.rule, 100);
    // Label
    s.addText(label, {
      x, y: y + 0.23, w: 8.80, h: 0.33,
      fontFace: FONT_SANS, fontSize: 18, bold: true,
      color: COLORS.terracotta, charSpacing: 5, margin: 0,
    });
    // Body
    s.addText(body, {
      x, y: y + 0.69, w: 8.80, h: 1.60,
      fontFace: FONT_SERIF, fontSize: 31.5,
      color: COLORS.ink, margin: 0, valign: "top",
    });
  });

  addFooterLeft(s);
  addPageNum(s, 2);
}

// ===========================================================================
// SLIDE 3 — The Brunch Philosophy (three numbered columns)
// ===========================================================================
{
  const s = pres.addSlide();
  addBackground(s, COLORS.creamAlt);

  addKicker(s, "CHAPTER TWO · THE APPROACH");

  s.addText("The Brunch Philosophy", {
    x: 1.04, y: 1.75, w: 18.45, h: 1.18,
    fontFace: FONT_SERIF, fontSize: 78,
    color: COLORS.ink, margin: 0,
  });

  const cols = [
    {
      x: 1.04,
      num: "I.",
      head: "Start at the farm.",
      body: "Eggs, produce, dairy, and poultry sourced close to home. If it isn’t fresh, it doesn’t go on the plate.",
    },
    {
      x: 7.21,
      num: "II.",
      head: "Cook it like home.",
      body: "Batters mixed by hand. Sauces simmered, not squeezed from a bottle. Waffle irons, cast iron, patience.",
    },
    {
      x: 13.38,
      num: "III.",
      head: "Send it out with a wink.",
      body: "Hot honey on the chicken. Mac on the fries. Comfort food with a little swagger.",
    },
  ];

  cols.forEach(({ x, num, head, body }) => {
    // Big Roman numeral
    s.addText(num, {
      x, y: 3.64, w: 5.75, h: 0.88,
      fontFace: FONT_SERIF, fontSize: 60, italic: true,
      color: COLORS.terracotta, margin: 0,
    });
    // Short underline bar
    slideRuleShort(s, x, 4.70);
    // Headline
    s.addText(head, {
      x, y: 5.03, w: 6.00, h: 0.70,
      fontFace: FONT_SERIF, fontSize: 32,
      color: COLORS.ink, margin: 0,
    });
    // Body
    s.addText(body, {
      x, y: 5.85, w: 5.75, h: 2.0,
      fontFace: FONT_SERIF, fontSize: 19.5,
      color: COLORS.muted, margin: 0, valign: "top",
    });
  });

  addFooterLeft(s);
  addPageNum(s, 3);
}

function slideRuleShort(slide, x, y) {
  slide.addShape(pres.ShapeType.rect, {
    x, y, w: 0.83, h: 0.03,
    fill: { color: COLORS.terracotta }, line: { type: "none" },
  });
}

// ===========================================================================
// SLIDE 4 — The Pantry (six ingredient icons in circles)
// ===========================================================================
{
  const s = pres.addSlide();
  addBackground(s, COLORS.forest);

  addKicker(s, "CHAPTER THREE · FROM THE FARM", COLORS.gold);

  s.addText("The Pantry", {
    x: 1.04, y: 1.75, w: 18.45, h: 1.27,
    fontFace: FONT_SERIF, fontSize: 84,
    color: COLORS.cream, margin: 0,
  });

  s.addText(
    "Six ingredients do most of the work. Everything on the brunch menu is some combination of these.",
    {
      x: 1.04, y: 3.27, w: 14.0, h: 0.89,
      fontFace: FONT_SERIF, fontSize: 27, italic: true,
      color: COLORS.parchment, margin: 0,
    }
  );

  const ingredients = [
    { name: "Eggs",     sub: "FARM, LOCAL",     img: "image-4-1.png", x: 1.55 },
    { name: "Flour",    sub: "MILLED, STONE",   img: "image-4-2.png", x: 4.59 },
    { name: "Hot Honey",sub: "HOUSE INFUSED",   img: "image-4-3.png", x: 7.64 },
    { name: "Chicken",  sub: "PASTURE RAISED",  img: "image-4-4.png", x: 10.69 },
    { name: "Cheese",   sub: "SHARP, AGED",     img: "image-4-5.png", x: 13.74 },
    { name: "Potatoes", sub: "RUSSET, FRESH",   img: "image-4-6.png", x: 16.79 },
  ];

  ingredients.forEach(({ name, sub, img, x }) => {
    // Circle disk as a background (cream)
    s.addShape(pres.ShapeType.ellipse, {
      x, y: 4.78, w: 1.67, h: 1.67,
      fill: { color: COLORS.cream }, line: { type: "none" },
    });
    // The illustrated ingredient image sits on top of the disk, slightly smaller
    s.addImage({ path: IMG(img), x: x + 0.17, y: 4.95, w: 1.33, h: 1.33 });

    // Name label
    s.addText(name, {
      x: x - 0.50, y: 6.60, w: 2.67, h: 0.42,
      fontFace: FONT_SERIF, fontSize: 24,
      color: COLORS.cream, align: "center", margin: 0,
    });
    // Sub caption
    s.addText(sub, {
      x: x - 0.50, y: 7.05, w: 2.67, h: 0.33,
      fontFace: FONT_SANS, fontSize: 13, bold: true,
      color: COLORS.gold, charSpacing: 4,
      align: "center", margin: 0,
    });
  });

  // Footer
  s.addText("DISH! · BRUNCH", {
    x: 1.04, y: 10.48, w: 4.50, h: 0.33,
    fontFace: FONT_SANS, fontSize: 18, bold: true,
    color: COLORS.cream, charSpacing: 6, margin: 0,
  });
  addPageNum(s, 4, COLORS.gold);
}

// ===========================================================================
// SLIDE 5 — Hot Honey Chicken & Waffles (photo left, spec right)
// ===========================================================================
{
  const s = pres.addSlide();
  addBackground(s, COLORS.cream);

  // Left photo panel (9.52" wide) — full-bleed dish image
  s.addImage({ path: IMG("image-5-1.png"), x: 0.0, y: 0.0, w: 10.48, h: 11.25 });

  // Photo label chip (top-left of photo)
  addPhotoLabel(s, 0.42, 0.42, "PHOTO · PLATED", 3.15);

  // Right copy panel
  s.addText("SIGNATURE · DISH NO. 01", {
    x: 11.41, y: 1.04, w: 7.88, h: 0.33,
    fontFace: FONT_SANS, fontSize: 18, bold: true,
    color: COLORS.terracotta, charSpacing: 5, margin: 0,
  });

  s.addText("Hot Honey Chicken & Waffles.", {
    x: 11.41, y: 1.62, w: 7.88, h: 2.98,
    fontFace: FONT_SERIF, fontSize: 58,
    color: COLORS.ink, margin: 0, valign: "top",
  });

  s.addText("The one I put my name on. Sweet, crunch, heat — in that order.", {
    x: 11.41, y: 4.70, w: 6.87, h: 1.10,
    fontFace: FONT_SERIF, fontSize: 27, italic: true,
    color: COLORS.terracotta, margin: 0,
  });

  s.addText(
    "Buttermilk-brined thighs fried to order on a house waffle, finished with a slow pour of chili-infused honey. The waffle is tender inside, crisp at the edges. The honey is the last thing on the plate.",
    {
      x: 11.41, y: 6.00, w: 6.87, h: 2.00,
      fontFace: FONT_SERIF, fontSize: 19.5,
      color: COLORS.muted, margin: 0, valign: "top",
    }
  );

  // Hairline
  addRule(s, 11.41, 8.25, 7.65, COLORS.rule, 100);

  // Two-column detail blocks
  s.addText("ON THE PLATE", {
    x: 11.41, y: 8.60, w: 3.68, h: 0.33,
    fontFace: FONT_SANS, fontSize: 18, bold: true,
    color: COLORS.terracotta, charSpacing: 4, margin: 0,
  });
  s.addText(
    [
      { text: "Buttermilk-brined thigh", options: { breakLine: true } },
      { text: "Cast-iron waffle",        options: { breakLine: true } },
      { text: "Hot honey drizzle",       options: { breakLine: true } },
      { text: "Salted butter" },
    ],
    {
      x: 11.41, y: 9.04, w: 3.85, h: 1.96,
      fontFace: FONT_SERIF, fontSize: 19.5,
      color: COLORS.ink, margin: 0, valign: "top",
      paraSpaceAfter: 4,
    }
  );

  s.addText("TECHNIQUE", {
    x: 15.49, y: 8.60, w: 3.68, h: 0.33,
    fontFace: FONT_SANS, fontSize: 18, bold: true,
    color: COLORS.terracotta, charSpacing: 4, margin: 0,
  });
  s.addText(
    [
      { text: "24-hour brine",            options: { breakLine: true } },
      { text: "Double dredge",            options: { breakLine: true } },
      { text: "325°F fry, finish hot",    options: { breakLine: true } },
      { text: "Honey warmed, never boiled" },
    ],
    {
      x: 15.49, y: 9.04, w: 3.85, h: 1.96,
      fontFace: FONT_SERIF, fontSize: 19.5,
      color: COLORS.ink, margin: 0, valign: "top",
      paraSpaceAfter: 4,
    }
  );

  addPageNum(s, 5, COLORS.terracotta, 19.10);
}

// ===========================================================================
// SLIDE 6 — Eggs, Done Right (two photo cards side by side)
// ===========================================================================
{
  const s = pres.addSlide();
  addBackground(s, COLORS.cream);

  addKicker(s, "BREAKFAST CLASSICS · DISH NO. 02 & 03");

  s.addText("Eggs, Done Right.", {
    x: 1.04, y: 1.71, w: 18.45, h: 1.18,
    fontFace: FONT_SERIF, fontSize: 78,
    color: COLORS.ink, margin: 0,
  });

  s.addText("Two plates that live or die on the yolk.", {
    x: 1.04, y: 3.01, w: 11.80, h: 0.60,
    fontFace: FONT_SERIF, fontSize: 27, italic: true,
    color: COLORS.terracotta, margin: 0,
  });

  // Two photo panels + captions
  const panels = [
    {
      x: 1.04,
      img: "image-6-1.png",
      label: "PHOTO · BENEDICT", labelW: 3.48,
      title: "Eggs Benedict",
      body: "Poached eggs on toasted muffin, country ham, house hollandaise whisked to order. The yolk is the sauce.",
    },
    {
      x: 10.31,
      img: "image-6-2.png",
      label: "PHOTO · OMELET", labelW: 3.14,
      title: "The Omelet",
      body: "Three eggs, low heat, folded — not scrambled. Fillings built to order: sharp cheese, ham, peppers, greens from the garden.",
    },
  ];

  panels.forEach(({ x, img, label, labelW, title, body }) => {
    // photo (fills the card)
    s.addImage({ path: IMG(img), x, y: 4.06, w: 8.65, h: 4.33 });
    // photo label chip
    addPhotoLabel(s, x + 0.25, 4.31, label, labelW);
    // Title
    s.addText(title, {
      x, y: 8.68, w: 8.91, h: 0.80,
      fontFace: FONT_SERIF, fontSize: 42,
      color: COLORS.ink, margin: 0,
    });
    // Body
    s.addText(body, {
      x, y: 9.55, w: 8.91, h: 1.10,
      fontFace: FONT_SERIF, fontSize: 18,
      color: COLORS.muted, margin: 0, valign: "top",
    });
  });

  addFooterLeft(s);
  addPageNum(s, 6);
}

// ===========================================================================
// SLIDE 7 — Mac & Cheese (text left, photo right)
// ===========================================================================
{
  const s = pres.addSlide();
  addBackground(s, COLORS.cream);

  // Right photo panel
  s.addImage({ path: IMG("image-7-1.png"), x: 9.52, y: 0.0, w: 10.48, h: 11.25 });

  // Photo label on photo (top-left of photo)
  addPhotoLabel(s, 9.94, 0.42, "PHOTO · SKILLET", 3.25);

  // LEFT copy column
  s.addText("THE COMFORT BASE · DISH NO. 04", {
    x: 0.94, y: 1.04, w: 7.88, h: 0.33,
    fontFace: FONT_SANS, fontSize: 18, bold: true,
    color: COLORS.terracotta, charSpacing: 5, margin: 0,
  });

  s.addText("Mac & Cheese.", {
    x: 0.94, y: 1.62, w: 7.88, h: 2.00,
    fontFace: FONT_SERIF, fontSize: 72,
    color: COLORS.ink, margin: 0, valign: "top",
  });

  s.addText(
    "The base layer. Lives on its own — and on everything else.",
    {
      x: 0.94, y: 3.72, w: 6.87, h: 1.20,
      fontFace: FONT_SERIF, fontSize: 27, italic: true,
      color: COLORS.terracotta, margin: 0,
    }
  );

  s.addText(
    "Elbows in a four-cheese béchamel, finished under the broiler until the top cracks. Sharp cheddar for bite, gruyère for stretch, parmesan for crust, a little cream cheese for silk.",
    {
      x: 0.94, y: 5.05, w: 6.87, h: 2.00,
      fontFace: FONT_SERIF, fontSize: 19.5,
      color: COLORS.muted, margin: 0, valign: "top",
    }
  );

  addRule(s, 0.94, 7.27, 7.65, COLORS.rule, 100);

  // Two-column details
  s.addText("THE BLEND", {
    x: 0.94, y: 7.62, w: 3.68, h: 0.33,
    fontFace: FONT_SANS, fontSize: 18, bold: true,
    color: COLORS.terracotta, charSpacing: 4, margin: 0,
  });
  s.addText(
    [
      { text: "Sharp cheddar",        options: { breakLine: true } },
      { text: "Gruyère",               options: { breakLine: true } },
      { text: "Parmesan crust",       options: { breakLine: true } },
      { text: "Cream cheese, a touch" },
    ],
    {
      x: 0.94, y: 8.06, w: 3.85, h: 1.96,
      fontFace: FONT_SERIF, fontSize: 19.5,
      color: COLORS.ink, margin: 0, valign: "top", paraSpaceAfter: 4,
    }
  );

  s.addText("WHY IT WORKS", {
    x: 5.01, y: 7.62, w: 3.68, h: 0.33,
    fontFace: FONT_SANS, fontSize: 18, bold: true,
    color: COLORS.terracotta, charSpacing: 4, margin: 0,
  });
  s.addText(
    [
      { text: "Béchamel, not a roux shortcut", options: { breakLine: true } },
      { text: "Elbows hold the sauce",          options: { breakLine: true } },
      { text: "Broiled, not baked dry",         options: { breakLine: true } },
      { text: "Salted aggressively" },
    ],
    {
      x: 5.01, y: 8.06, w: 3.85, h: 1.96,
      fontFace: FONT_SERIF, fontSize: 19.5,
      color: COLORS.ink, margin: 0, valign: "top", paraSpaceAfter: 4,
    }
  );

  addPageNum(s, 7, COLORS.terracotta, 19.10);
}

// ===========================================================================
// SLIDE 8 — Messy Fries (dark photo left, text right)
// ===========================================================================
{
  const s = pres.addSlide();
  addBackground(s, COLORS.cream);

  // Left dark photo panel (full-bleed on left half, green backing visible beyond photo)
  s.addImage({ path: IMG("image-8-1.png"), x: 0.0, y: 0.0, w: 10.48, h: 11.25 });

  // Label chip on photo
  addPhotoLabel(s, 0.42, 0.42, "PHOTO · MESS", 2.80);

  // RIGHT copy
  s.addText("THE MASHUP · DISH NO. 05", {
    x: 11.41, y: 1.04, w: 7.88, h: 0.33,
    fontFace: FONT_SANS, fontSize: 18, bold: true,
    color: COLORS.terracotta, charSpacing: 5, margin: 0,
  });

  s.addText("Messy Fries.", {
    x: 11.41, y: 1.62, w: 7.88, h: 2.00,
    fontFace: FONT_SERIF, fontSize: 72,
    color: COLORS.ink, margin: 0, valign: "top",
  });

  s.addText("Everything we make, stacked on one plate. Eat it with a fork.", {
    x: 11.41, y: 3.72, w: 6.87, h: 1.20,
    fontFace: FONT_SERIF, fontSize: 27, italic: true,
    color: COLORS.terracotta, margin: 0,
  });

  s.addText(
    "House-made waffle fries, blanketed in mac, topped with chopped chicken tenders, finished with two signature sauces. This is the plate where everything on the menu meets.",
    {
      x: 11.41, y: 5.05, w: 6.87, h: 2.00,
      fontFace: FONT_SERIF, fontSize: 19.5,
      color: COLORS.muted, margin: 0, valign: "top",
    }
  );

  addRule(s, 11.41, 7.27, 7.65, COLORS.rule, 100);

  s.addText("THE STACK", {
    x: 11.41, y: 7.62, w: 3.68, h: 0.33,
    fontFace: FONT_SANS, fontSize: 18, bold: true,
    color: COLORS.terracotta, charSpacing: 4, margin: 0,
  });
  s.addText(
    [
      { text: "House waffle fries",        options: { breakLine: true } },
      { text: "Four-cheese mac",           options: { breakLine: true } },
      { text: "Chopped chicken tenders",   options: { breakLine: true } },
      { text: "Two signature sauces" },
    ],
    {
      x: 11.41, y: 8.06, w: 3.85, h: 1.96,
      fontFace: FONT_SERIF, fontSize: 19.5,
      color: COLORS.ink, margin: 0, valign: "top", paraSpaceAfter: 4,
    }
  );

  s.addText("HOUSE SAUCES", {
    x: 15.49, y: 7.62, w: 3.68, h: 0.33,
    fontFace: FONT_SANS, fontSize: 18, bold: true,
    color: COLORS.terracotta, charSpacing: 4, margin: 0,
  });
  s.addText(
    [
      { text: "Smoked honey BBQ",  options: { breakLine: true } },
      { text: "Buttermilk ranch",  options: { breakLine: true } },
      { text: "Green onion, fresh", options: { breakLine: true } },
      { text: "Served hot, eat fast" },
    ],
    {
      x: 15.49, y: 8.06, w: 3.85, h: 1.96,
      fontFace: FONT_SERIF, fontSize: 19.5,
      color: COLORS.ink, margin: 0, valign: "top", paraSpaceAfter: 4,
    }
  );

  addPageNum(s, 8, COLORS.terracotta, 19.10);
}

// ===========================================================================
// SLIDE 9 — Behind the Line (terracotta/cream quote slide)
// ===========================================================================
{
  const s = pres.addSlide();
  addBackground(s, COLORS.terracotta);

  addKicker(s, "CHAPTER FOUR · THE KITCHEN", COLORS.gold);

  s.addText("Behind the Line.", {
    x: 1.04, y: 1.75, w: 15.02, h: 1.80,
    fontFace: FONT_SERIF, fontSize: 96,
    color: COLORS.cream, margin: 0,
  });

  s.addText(
    "Two friends, one kitchen. He works the pit; I work the brunch board. The menu is short on purpose — if we can’t source it fresh or make it by hand, it doesn’t go on.",
    {
      x: 1.04, y: 3.57, w: 12.88, h: 2.50,
      fontFace: FONT_SERIF, fontSize: 34.5, italic: true,
      color: COLORS.cream, margin: 0, valign: "top",
    }
  );

  s.addText("— CHEF · DISH! BRUNCH KITCHEN, EAST END HOUSTON", {
    x: 1.04, y: 6.30, w: 18.45, h: 0.33,
    fontFace: FONT_SANS, fontSize: 18, bold: true,
    color: COLORS.parchment, charSpacing: 5, margin: 0,
  });

  // footer (cream)
  s.addText("DISH! · BRUNCH", {
    x: 1.04, y: 10.48, w: 4.50, h: 0.33,
    fontFace: FONT_SANS, fontSize: 18, bold: true,
    color: COLORS.cream, charSpacing: 6, margin: 0,
  });
  addPageNum(s, 9, COLORS.gold);
}

// ===========================================================================
// SLIDE 10 — Thank you / closing
// ===========================================================================
{
  const s = pres.addSlide();
  addBackground(s, COLORS.cream);

  s.addText("FIN.", {
    x: 1.04, y: 1.17, w: 18.45, h: 0.33,
    fontFace: FONT_SANS, fontSize: 18, bold: true,
    color: COLORS.terracotta, charSpacing: 6, margin: 0,
  });

  // Giant title: "Thank you." with the period in terracotta
  s.addText(
    [
      { text: "Thank you", options: { color: COLORS.ink } },
      { text: ".",          options: { color: COLORS.terracotta } },
    ],
    {
      x: 1.04, y: 1.88, w: 18.45, h: 5.29,
      fontFace: FONT_SERIF, fontSize: 210,
      margin: 0, valign: "top",
    }
  );

  s.addText("Questions welcome — and come by for brunch.", {
    x: 1.04, y: 7.54, w: 18.45, h: 0.80,
    fontFace: FONT_SERIF, fontSize: 33, italic: true,
    color: COLORS.muted, margin: 0,
  });

  addRule(s, 1.04, 8.89, 17.92, COLORS.rule, 100);

  // Three-column footer
  const cols = [
    { x: 1.04,  w: 5.50, label: "FIND US",  body: "Dish! · East End Houston" },
    { x: 7.04,  w: 5.50, label: "HOURS",    body: "Brunch, weekends · BBQ, all week" },
    { x: 13.04, w: 6.00, label: "ASK FOR",  body: "The hot honey chicken & waffles." },
  ];
  cols.forEach(({ x, w, label, body }) => {
    s.addText(label, {
      x, y: 9.31, w, h: 0.33,
      fontFace: FONT_SANS, fontSize: 18, bold: true,
      color: COLORS.terracotta, charSpacing: 5, margin: 0,
    });
    s.addText(body, {
      x, y: 9.71, w, h: 0.60,
      fontFace: FONT_SERIF, fontSize: 24,
      color: COLORS.ink, margin: 0,
    });
  });
}

// ---------------------------------------------------------------------------
// Write file
// ---------------------------------------------------------------------------
pres.writeFile({ fileName: "Dish_.pptx" }).then(fn => {
  console.log(`Saved ${fn}`);
});
