// Trattoria Malden — Investor Pitch Deck
// Recreated with pptxgenjs from Deliverable_2.pptx
//
// Usage:  node generate.js
// Output: ./Trattoria_Malden_Pitch.pptx

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333" x 7.5"  (source deck uses widescreen 16:9 @ 13.33")
pres.title = "Trattoria Malden — Investor Pitch, Spring 2026";
pres.author = "Trattoria Malden";

// ---------- Design tokens ----------
const COLORS = {
  darkGreen: "1E3628",        // Primary dark-green background
  cream: "F2EBDD",            // Light cream background for content slides
  creamAlt: "FAF5EB",         // Warmer cream (used for white-on-dark body text)
  peach: "E9B787",            // Peach/gold accent
  peachDim: "F5EBD7",         // Dim cream used with alpha
  terracotta: "B8532F",       // Terracotta/burnt-orange accent
  terracottaDim: "C45A34",    // Bolder terracotta (italic accents)
  textDark: "1E3628",         // Dark green used as body text on cream
  textMuted: "6F6A5E",        // Muted gray-olive for captions
  textMutedLight: "8A8577",   // Even lighter muted text
  imgBox: "DDD6C3",           // Light warm-gray for image placeholders
  olive: "8B7E3F",            // Olive gold used in one stat
  goldBar: "BFA248",          // Mustard/gold bar (MKTG segment)
  workingCapBar: "B89F6F",    // Muted gold for working capital bar
  white: "FFFFFF",
  caption: "EFE7D5",          // Near-cream caption pill background
  dividerCream: "C9BFA6",     // Divider line on cream bg
  dividerDark: "3A4F3F",      // Divider line on dark-green bg
};

const FONTS = {
  head: "Arial",   // Sans; both header and body use Arial per source
  body: "Arial",
};

// Convenience — dimensions of LAYOUT_WIDE
const W = 13.333;
const H = 7.5;

// ---------- Reusable bits ----------
/**
 * Adds the small orange bullet dot + italic "Trattoria Malden" brand mark in the
 * top-left corner of every slide.
 */
function addBrandMark(slide, darkBg = false) {
  slide.addShape(pres.shapes.OVAL, {
    x: 0.75, y: 0.605, w: 0.0625, h: 0.0625,
    fill: { color: COLORS.terracotta }, line: { type: "none" },
  });
  slide.addText("Trattoria Malden", {
    x: 0.92, y: 0.5, w: 2.0, h: 0.32,
    fontFace: FONTS.body, fontSize: 13, italic: true,
    color: darkBg ? COLORS.creamAlt : COLORS.textDark,
    margin: 0, valign: "middle",
  });
}

/**
 * Top-right section label (e.g. "01 · THE VISION").
 */
function addTopRightLabel(slide, text, darkBg = false) {
  slide.addText(text, {
    x: W - 5.75, y: 0.5, w: 5.0, h: 0.32,
    fontFace: FONTS.body, fontSize: 9, charSpacing: 0,
    color: darkBg ? COLORS.peachDim : COLORS.textMutedLight,
    align: "right", valign: "middle", margin: 0,
    transparency: darkBg ? 40 : 0,
  });
}

/**
 * Footer: "INVESTOR PITCH"  ·····  "NN / 10"
 */
function addFooter(slide, pageNum, darkBg = false) {
  const c = darkBg ? COLORS.peachDim : COLORS.textMutedLight;
  const trans = darkBg ? 45 : 0;
  slide.addText("INVESTOR PITCH", {
    x: 0.75, y: H - 0.5, w: 3, h: 0.3,
    fontFace: FONTS.body, fontSize: 9, charSpacing: 0,
    color: c, transparency: trans, margin: 0, valign: "middle",
  });
  slide.addText(`${String(pageNum).padStart(2, "0")} / 10`, {
    x: W - 3, y: H - 0.5, w: 2.25, h: 0.3,
    fontFace: FONTS.body, fontSize: 9, charSpacing: 0,
    color: c, transparency: trans, margin: 0,
    align: "right", valign: "middle",
  });
}

/**
 * Image placeholder box: a warm-gray rectangle with a small cream caption pill
 * in the lower-left (to mirror the source deck's placeholder treatment).
 */
function addImagePlaceholder(slide, x, y, w, h, caption, { captionInside = true } = {}) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: COLORS.imgBox }, line: { type: "none" },
  });
  if (caption) {
    const padX = 0.2, padY = 0.1;
    const capH = 0.3;
    // Estimate caption width at 8pt with charSpacing 1: ~0.065" per char + 0.4" padding
    const capW = Math.min(w - padX * 2, caption.length * 0.07 + 0.35);
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x + padX, y: y + h - capH - padY, w: capW, h: capH,
      fill: { color: COLORS.caption }, line: { color: COLORS.dividerCream, width: 0.5 },
    });
    slide.addText(caption, {
      x: x + padX, y: y + h - capH - padY, w: capW, h: capH,
      fontFace: FONTS.body, fontSize: 8, charSpacing: 0,
      color: COLORS.textMuted, align: "center", valign: "middle", margin: 0,
    });
  }
}

// ================================================================
//  SLIDE 1 — Title / Cover
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.darkGreen };

  addBrandMark(s, true);
  addTopRightLabel(s, "INVESTOR PITCH · SPRING 2026", true);

  // Eyebrow label
  s.addText("A NEIGHBORHOOD TRATTORIA · MALDEN, MA", {
    x: 1.25, y: 1.55, w: 7, h: 0.35,
    fontFace: FONTS.body, fontSize: 12, charSpacing: 4,
    color: COLORS.peach, margin: 0,
  });

  // Giant hero wordmark: "Pasta, piano piano."
  s.addText(
    [
      { text: "Pasta, ", options: { color: COLORS.creamAlt } },
      { text: "piano piano.", options: { color: COLORS.peach, italic: true } },
    ],
    {
      x: 1.25, y: 1.95, w: 7.25, h: 2.35,
      fontFace: FONTS.head, fontSize: 80, bold: false,
      margin: 0, valign: "top",
      charSpacing: -2,
    }
  );

  // Subhead
  s.addText(
    "Handmade pasta, honest wine, and the kind of warm, unhurried dinner Malden doesn't have yet.",
    {
      x: 1.25, y: 4.6, w: 6.9, h: 0.9,
      fontFace: FONTS.body, fontSize: 15, color: COLORS.creamAlt,
      margin: 0, valign: "top",
    }
  );

  // Three-stat footer (RAISING · FROM · OPENING)
  const statY = 6.35, labelH = 0.22, valueH = 0.65;
  const stats = [
    { label: "RAISING", value: "$200,000",         x: 1.25, w: 2.2 },
    { label: "FROM",    value: "5 Friends & Family", x: 3.45, w: 3.4 },
    { label: "OPENING", value: "Fall 2026",        x: 6.85, w: 2.2 },
  ];
  stats.forEach(({ label, value, x, w }) => {
    s.addText(label, {
      x, y: statY, w: w + 0.5, h: labelH,
      fontFace: FONTS.body, fontSize: 9, charSpacing: 0,
      color: COLORS.peachDim, transparency: 45, margin: 0, valign: "top",
    });
    s.addText(value, {
      x, y: statY + labelH + 0.07, w, h: valueH,
      fontFace: FONTS.head, fontSize: 22, color: COLORS.creamAlt,
      margin: 0, valign: "top",
    });
  });

  // Right-hand hero image placeholder (warm interior photo)
  const imgX = 9.7, imgY = 1.25, imgW = W - imgX - 0.4, imgH = 5.9;
  s.addShape(pres.shapes.RECTANGLE, {
    x: imgX, y: imgY, w: imgW, h: imgH,
    fill: { color: "2A4638" }, line: { type: "none" },  // slightly lighter than bg so it's visible
  });
  // Caption pill across the bottom of the image
  s.addShape(pres.shapes.RECTANGLE, {
    x: imgX, y: imgY + imgH - 0.42, w: imgW, h: 0.42,
    fill: { color: "1A2F24" }, line: { type: "none" },
  });
  s.addText("IMAGE · WARM TRATTORIA INTERIOR AT DUSK, CANDLELIGHT, WINE GLASSES", {
    x: imgX + 0.1, y: imgY + imgH - 0.42, w: imgW - 0.2, h: 0.42,
    fontFace: FONTS.body, fontSize: 7, charSpacing: 0,
    color: COLORS.peachDim, transparency: 20,
    margin: 0, valign: "middle",
  });
}

// ================================================================
//  SLIDE 2 — The Vision
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.cream };

  addBrandMark(s, false);
  addTopRightLabel(s, "01 · THE VISION", false);
  addFooter(s, 2, false);

  // Eyebrow
  s.addText("THE VISION", {
    x: 0.75, y: 1.85, w: 3, h: 0.3,
    fontFace: FONTS.body, fontSize: 11, charSpacing: 4,
    color: COLORS.terracottaDim, margin: 0,
  });

  // Large statement
  s.addText(
    "A small, hand-built room where the pasta is rolled that morning & the wine pours are honest.",
    {
      x: 0.75, y: 2.2, w: 12, h: 2.45,
      fontFace: FONTS.head, fontSize: 44, color: COLORS.textDark,
      margin: 0, valign: "top", charSpacing: -1,
    }
  );

  // Short divider line
  s.addShape(pres.shapes.LINE, {
    x: 0.75, y: 4.95, w: 0.9, h: 0,
    line: { color: COLORS.dividerCream, width: 0.75 },
  });

  // Three columns: Cucina / Cantina / Casa
  const col = [
    {
      h: "Cucina",
      b: "A tight menu of 6 pastas, 4 antipasti, 3 secondi. Rotates with the season. Made by hand, every service.",
      x: 0.75,
    },
    {
      h: "Cantina",
      b: "40 bottles, mostly Italian, mostly under $60. Focused on small producers. No pretense.",
      x: 5.2,
    },
    {
      h: "Casa",
      b: "48 seats. Candlelight, warm wood, a bar you can eat at alone and feel at home.",
      x: 9.65,
    },
  ];
  col.forEach(({ h, b, x }) => {
    s.addText(h, {
      x, y: 5.25, w: 3.4, h: 0.45,
      fontFace: FONTS.head, fontSize: 19, italic: true,
      color: COLORS.terracottaDim, margin: 0, valign: "top",
    });
    s.addText(b, {
      x, y: 5.75, w: 3.4, h: 1.25,
      fontFace: FONTS.body, fontSize: 12, color: COLORS.textDark,
      margin: 0, valign: "top",
    });
  });
}

// ================================================================
//  SLIDE 3 — The Opportunity  (Why Malden)
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.cream };

  addBrandMark(s, false);
  addTopRightLabel(s, "02 · THE OPPORTUNITY", false);
  addFooter(s, 3, false);

  // Eyebrow
  s.addText("WHY MALDEN", {
    x: 0.75, y: 1.35, w: 3, h: 0.3,
    fontFace: FONTS.body, fontSize: 11, charSpacing: 4,
    color: COLORS.terracottaDim, margin: 0,
  });

  // Headline with italic terracotta ending
  s.addText(
    [
      { text: "A dense, diverse neighborhood —", options: { color: COLORS.textDark, breakLine: true } },
      { text: "without a real trattoria.", options: { color: COLORS.terracottaDim, italic: true } },
    ],
    {
      x: 0.75, y: 1.7, w: 6.2, h: 2.4,
      fontFace: FONTS.head, fontSize: 36,
      margin: 0, valign: "top", charSpacing: -1,
    }
  );

  // Body paragraph
  s.addText(
    "Malden has the density and disposable income of its Somerville and Medford neighbors, but none of the chef-driven Italian that's defined those neighborhoods for a decade. The Orange Line puts 250,000 people within 15 minutes.",
    {
      x: 0.75, y: 4.15, w: 6.2, h: 1.0,
      fontFace: FONTS.body, fontSize: 11, color: COLORS.textDark,
      margin: 0, valign: "top",
    }
  );

  // Divider
  s.addShape(pres.shapes.LINE, {
    x: 0.75, y: 5.3, w: 6.2, h: 0,
    line: { color: COLORS.dividerCream, width: 0.75 },
  });

  // 2x2 stats grid
  const statCells = [
    { v: "65k", l: "RESIDENTS WITHIN 1 MILE",            x: 0.75, y: 5.35 },
    { v: "3 min", l: "WALK FROM ORANGE LINE",            x: 3.75, y: 5.35 },
    { v: "0", l: "HANDMADE-PASTA TRATTORIAS IN MALDEN",  x: 0.75, y: 6.15 },
    { v: "+18%", l: "MEDIAN INCOME GROWTH, 5 YRS",       x: 3.75, y: 6.15 },
  ];
  statCells.forEach(({ v, l, x, y }) => {
    s.addText(v, {
      x, y, w: 2.8, h: 0.5,
      fontFace: FONTS.head, fontSize: 28, color: COLORS.darkGreen,
      margin: 0, valign: "top",
    });
    s.addText(l, {
      x, y: y + 0.5, w: 3.0, h: 0.3,
      fontFace: FONTS.body, fontSize: 8, charSpacing: 0,
      color: COLORS.textMuted, margin: 0, valign: "top",
    });
  });

  // Right-side image placeholders
  addImagePlaceholder(s, 7.5, 1.0, 5.1, 3.5, "IMAGE · MALDEN CENTER AT GOLDEN HOUR, ORANGE LINE STATION IN VIEW");
  addImagePlaceholder(s, 7.5, 4.7,  2.45, 2.25, "STOREFRONT FACADE");
  addImagePlaceholder(s, 10.15, 4.7, 2.45, 2.25, "NEIGHBORHOOD LIFE");
}

// ================================================================
//  SLIDE 4 — The Menu
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.cream };

  addBrandMark(s, false);
  addTopRightLabel(s, "03 · THE MENU", false);
  addFooter(s, 4, false);

  // Eyebrow
  s.addText("THE MENU", {
    x: 0.75, y: 1.35, w: 3, h: 0.3,
    fontFace: FONTS.body, fontSize: 11, charSpacing: 4,
    color: COLORS.terracottaDim, margin: 0,
  });

  // Headline with italic "Made that morning."
  s.addText(
    [
      { text: "Short. Seasonal. ", options: { color: COLORS.textDark } },
      { text: "Made that morning.", options: { color: COLORS.terracottaDim, italic: true } },
    ],
    {
      x: 0.75, y: 1.7, w: 10, h: 1.0,
      fontFace: FONTS.head, fontSize: 36,
      margin: 0, valign: "top", charSpacing: -1,
    }
  );

  // Right-aligned italic tagline
  s.addText("— a sample, autumn '26", {
    x: 9.5, y: 1.95, w: 3, h: 0.5,
    fontFace: FONTS.head, fontSize: 18, italic: true,
    color: COLORS.textMutedLight, margin: 0, valign: "top",
  });

  // Top divider
  s.addShape(pres.shapes.LINE, {
    x: 0.75, y: 2.95, w: 11.85, h: 0,
    line: { color: COLORS.dividerCream, width: 0.75 },
  });

  // Menu columns
  const menuCols = [
    {
      x: 0.75,
      section: "ANTIPASTI",
      items: [
        ["Focaccia, olio nuovo",     "warm, torn at the table"],
        ["Burrata & stone fruit",    "basil, aged balsamic"],
        ["Vitello tonnato",          "capers, lemon"],
        ["Polpette della nonna",     "sunday gravy, grana"],
      ],
    },
    {
      x: 5.05,
      section: "PASTA · ROLLED DAILY",
      items: [
        ["Tagliatelle al ragù",        "6-hour bolognese, no tomato"],
        ["Cacio e pepe",               "tonnarelli, black pepper"],
        ["Agnolotti del plin",         "brown butter, sage"],
        ["Rigatoni all'amatriciana",   "guanciale, pecorino"],
        ["Gnocchi di patate",          "brown butter, hazelnut"],
        ["Linguine alle vongole",      "white wine, chili"],
      ],
    },
    {
      x: 9.35,
      section: "SECONDI & DOLCI",
      items: [
        ["Branzino al forno",       "fennel, castelvetrano"],
        ["Pollo alla diavola",      "half chicken, chili, lemon"],
        ["Bistecca fiorentina",     "for two, rosemary oil"],
      ],
      desserts: [
        ["Tiramisù",                "my mother's recipe"],
        ["Affogato",                "espresso, vanilla gelato"],
      ],
    },
  ];

  menuCols.forEach(col => {
    // Section header
    s.addText(col.section, {
      x: col.x, y: 3.15, w: 3.8, h: 0.3,
      fontFace: FONTS.body, fontSize: 10, charSpacing: 3,
      color: COLORS.darkGreen, margin: 0,
    });
    // Items
    let y = 3.6;
    col.items.forEach(([name, desc]) => {
      s.addText(name, {
        x: col.x, y, w: 3.8, h: 0.32,
        fontFace: FONTS.head, fontSize: 14, color: COLORS.textDark,
        margin: 0, valign: "top",
      });
      s.addText(desc, {
        x: col.x, y: y + 0.3, w: 3.8, h: 0.25,
        fontFace: FONTS.body, fontSize: 9, color: COLORS.textMuted,
        margin: 0, valign: "top",
      });
      y += 0.58;
    });
    // Desserts — separated by a thin line
    if (col.desserts) {
      y += 0.05;
      s.addShape(pres.shapes.LINE, {
        x: col.x, y, w: 3.8, h: 0,
        line: { color: COLORS.dividerCream, width: 0.5 },
      });
      y += 0.2;
      col.desserts.forEach(([name, desc]) => {
        s.addText(name, {
          x: col.x, y, w: 3.8, h: 0.32,
          fontFace: FONTS.head, fontSize: 14, color: COLORS.textDark,
          margin: 0, valign: "top",
        });
        s.addText(desc, {
          x: col.x, y: y + 0.3, w: 3.8, h: 0.25,
          fontFace: FONTS.body, fontSize: 9, color: COLORS.textMuted,
          margin: 0, valign: "top",
        });
        y += 0.58;
      });
    }
  });
}

// ================================================================
//  SLIDE 5 — The Team
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.cream };

  addBrandMark(s, false);
  addTopRightLabel(s, "04 · THE TEAM", false);
  addFooter(s, 5, false);

  // Left portrait placeholder
  addImagePlaceholder(s, 0.75, 1.05, 5.25, 5.6, "PORTRAIT · CHEF IN APRON, KITCHEN IN BACKGROUND, NATURAL LIGHT");

  // Right content column
  const rx = 6.5;

  s.addText("THE CHEF & OWNER", {
    x: rx, y: 2.05, w: 4, h: 0.3,
    fontFace: FONTS.body, fontSize: 11, charSpacing: 4,
    color: COLORS.terracottaDim, margin: 0,
  });

  s.addText("[ Your Name ]", {
    x: rx, y: 2.4, w: 6, h: 0.95,
    fontFace: FONTS.head, fontSize: 48, color: COLORS.textDark,
    margin: 0, valign: "top",
  });

  s.addText("A chef's restaurant, finally their own.", {
    x: rx, y: 3.35, w: 6, h: 0.55,
    fontFace: FONTS.head, fontSize: 20, italic: true,
    color: COLORS.terracottaDim, margin: 0, valign: "top",
  });

  s.addText(
    [
      { text: "[ 2–3 sentences on your cooking career — kitchens you've worked in, what drew you to Italian, the dish your mother taught you. This is the slide where investors decide they're backing ", options: {} },
      { text: "you", options: { italic: true } },
      { text: ", not the concept. ]", options: {} },
    ],
    {
      x: rx, y: 4.1, w: 6.2, h: 1.3,
      fontFace: FONTS.body, fontSize: 12, color: COLORS.textDark,
      margin: 0, valign: "top",
    }
  );

  // Divider
  s.addShape(pres.shapes.LINE, {
    x: rx, y: 5.5, w: 6.0, h: 0,
    line: { color: COLORS.dividerCream, width: 0.75 },
  });

  // 3-row facts (label | value)
  const facts = [
    { label: "YRS",  value: "[ 15+ ] in professional kitchens" },
    { label: "PAST", value: "[ notable restaurants, roles ]" },
    { label: "FROM", value: "[ hometown / family roots ]" },
  ];
  let fy = 5.7;
  facts.forEach(({ label, value }) => {
    s.addText(label, {
      x: rx, y: fy, w: 0.8, h: 0.3,
      fontFace: FONTS.body, fontSize: 9, charSpacing: 3,
      color: COLORS.textMuted, margin: 0, valign: "middle",
    });
    s.addText(value, {
      x: rx + 0.9, y: fy, w: 5.2, h: 0.3,
      fontFace: FONTS.body, fontSize: 12, color: COLORS.textDark,
      italic: label !== "YRS",
      margin: 0, valign: "middle",
    });
    fy += 0.4;
  });
}

// ================================================================
//  SLIDE 6 — The Space
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.cream };

  addBrandMark(s, false);
  addTopRightLabel(s, "05 · THE SPACE", false);
  addFooter(s, 6, false);

  // Eyebrow
  s.addText("THE SPACE", {
    x: 0.75, y: 1.35, w: 3, h: 0.3,
    fontFace: FONTS.body, fontSize: 11, charSpacing: 4,
    color: COLORS.terracottaDim, margin: 0,
  });

  // Headline with italic "three minutes"
  s.addText(
    [
      { text: "48 seats, ", options: { color: COLORS.textDark } },
      { text: "three minutes ", options: { color: COLORS.terracottaDim, italic: true } },
      { text: "from the T.", options: { color: COLORS.textDark } },
    ],
    {
      x: 0.75, y: 1.7, w: 9, h: 1.0,
      fontFace: FONTS.head, fontSize: 38,
      margin: 0, valign: "top", charSpacing: -1,
    }
  );

  // Top-right target label
  s.addText("TARGET", {
    x: 10.5, y: 1.7, w: 2, h: 0.3,
    fontFace: FONTS.body, fontSize: 10, charSpacing: 3,
    color: COLORS.terracottaDim, align: "right", margin: 0,
  });
  s.addText("Malden Center, MA", {
    x: 10.0, y: 2.0, w: 2.5, h: 0.4,
    fontFace: FONTS.head, fontSize: 16, italic: true,
    color: COLORS.textDark, align: "right", margin: 0,
  });

  // Hero image + two smaller image placeholders
  addImagePlaceholder(s, 0.75, 3.05, 6.75, 2.4,  "HERO · CANDLELIT DINING ROOM, EXPOSED BRICK, WOOD TABLES");
  addImagePlaceholder(s, 0.75, 5.55, 3.25, 1.4,  "OPEN KITCHEN PASS");
  addImagePlaceholder(s, 4.25, 5.55, 3.25, 1.4,  "BAR · 8 SEATS, MARBLE");

  // Right column: THE ROOM / THE LAYOUT / THE HOURS
  const rx = 7.9;

  s.addText("THE ROOM", {
    x: rx, y: 3.05, w: 4, h: 0.3,
    fontFace: FONTS.body, fontSize: 10, charSpacing: 3,
    color: COLORS.darkGreen, margin: 0,
  });
  s.addText(
    "1,800 sq ft corner storefront. Tall windows, original tin ceiling. Exposed brick already in place — the buildout is about restraint, not reinvention.",
    {
      x: rx, y: 3.4, w: 5, h: 0.95,
      fontFace: FONTS.body, fontSize: 11, color: COLORS.textDark,
      margin: 0, valign: "top",
    }
  );

  s.addText("THE LAYOUT", {
    x: rx, y: 4.5, w: 4, h: 0.3,
    fontFace: FONTS.body, fontSize: 10, charSpacing: 3,
    color: COLORS.darkGreen, margin: 0,
  });
  s.addText(
    [
      { text: "· 40 seats in the dining room",                   options: { breakLine: true } },
      { text: "· 8-seat marble bar, full wine pours",            options: { breakLine: true } },
      { text: "· Open pasta station, visible from the room",     options: { breakLine: true } },
      { text: "· Sidewalk cafe, 12 seats in season",             options: {} },
    ],
    {
      x: rx, y: 4.85, w: 5, h: 1.3,
      fontFace: FONTS.body, fontSize: 11, color: COLORS.textDark,
      margin: 0, valign: "top", paraSpaceAfter: 2,
    }
  );

  s.addText("THE HOURS", {
    x: rx, y: 6.25, w: 4, h: 0.3,
    fontFace: FONTS.body, fontSize: 10, charSpacing: 3,
    color: COLORS.darkGreen, margin: 0,
  });
  s.addText("Dinner only, Tue–Sun. Weekend lunch in year two.", {
    x: rx, y: 6.6, w: 5, h: 0.35,
    fontFace: FONTS.body, fontSize: 11, color: COLORS.textDark,
    margin: 0, valign: "top",
  });
}

// ================================================================
//  SLIDE 7 — The Ask  (dark green)
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.darkGreen };

  addBrandMark(s, true);
  addTopRightLabel(s, "06 · THE ASK", true);
  addFooter(s, 7, true);

  // Eyebrow
  s.addText("THE ASK", {
    x: 0.75, y: 1.85, w: 3, h: 0.3,
    fontFace: FONTS.body, fontSize: 11, charSpacing: 4,
    color: COLORS.peach, margin: 0,
  });

  // Huge $200,000 headline with a small terracotta square on the period
  s.addText("$200,000.", {
    x: 0.75, y: 2.2, w: 10, h: 1.65,
    fontFace: FONTS.head, fontSize: 100, color: COLORS.creamAlt,
    margin: 0, valign: "top", charSpacing: -3,
  });
  // Small orange square accent (the "dot" after $200,000)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 4.82, y: 3.5, w: 0.14, h: 0.14,
    fill: { color: COLORS.terracotta }, line: { type: "none" },
  });

  // Subhead paragraph (italic)
  s.addText(
    "From five friends and family, at $40,000 each. Structured as convertible notes with a modest preferred return — a drink on the house, forever, included.",
    {
      x: 0.75, y: 4.2, w: 9.5, h: 1.0,
      fontFace: FONTS.head, fontSize: 19, italic: true,
      color: COLORS.creamAlt, transparency: 10,
      margin: 0, valign: "top",
    }
  );

  // Divider
  s.addShape(pres.shapes.LINE, {
    x: 0.75, y: 5.45, w: 11.85, h: 0,
    line: { color: COLORS.dividerDark, width: 0.75 },
  });

  // Four stats
  const cells = [
    { label: "INVESTORS",     value: "5",    sub: "Friends & family",        x: 0.75 },
    { label: "PER INVESTOR",  value: "$40k", sub: "Equal check size",        x: 3.85 },
    { label: "STRUCTURE",     value: "Note", sub: "Convertible, 5-yr term",  x: 6.95 },
    { label: "TARGET RETURN", value: "2×",   sub: "By year 5, plus preferred", x: 10.05 },
  ];
  cells.forEach(({ label, value, sub, x }) => {
    s.addText(label, {
      x, y: 5.7, w: 3.2, h: 0.28,
      fontFace: FONTS.body, fontSize: 9, charSpacing: 0,
      color: COLORS.peachDim, transparency: 40, margin: 0, valign: "top",
    });
    s.addText(value, {
      x, y: 5.98, w: 2.8, h: 0.65,
      fontFace: FONTS.head, fontSize: 34, color: COLORS.creamAlt,
      margin: 0, valign: "top",
    });
    s.addText(sub, {
      x, y: 6.7, w: 3.2, h: 0.3,
      fontFace: FONTS.body, fontSize: 10, color: COLORS.peachDim,
      transparency: 25, margin: 0, valign: "top",
    });
  });
}

// ================================================================
//  SLIDE 8 — Use of Funds
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.cream };

  addBrandMark(s, false);
  addTopRightLabel(s, "07 · USE OF FUNDS", false);
  addFooter(s, 8, false);

  // Eyebrow
  s.addText("USE OF FUNDS", {
    x: 0.75, y: 1.35, w: 3, h: 0.3,
    fontFace: FONTS.body, fontSize: 11, charSpacing: 4,
    color: COLORS.terracottaDim, margin: 0,
  });

  // Headline
  s.addText(
    [
      { text: "Where the ", options: { color: COLORS.textDark } },
      { text: "$200,000 ", options: { color: COLORS.terracottaDim, italic: true } },
      { text: "goes.", options: { color: COLORS.textDark } },
    ],
    {
      x: 0.75, y: 1.7, w: 10, h: 1.0,
      fontFace: FONTS.head, fontSize: 38,
      margin: 0, valign: "top", charSpacing: -1,
    }
  );

  // 100%-stacked bar. Total bar width = 11.85", split by percentages.
  const barX = 0.75, barY = 2.9, barTotalW = 11.85, barH = 0.55;
  const segments = [
    { label: "BUILDOUT · 45%",   pct: 45, fill: COLORS.darkGreen,     text: COLORS.creamAlt },
    { label: "EQUIPMENT · 25%",  pct: 25, fill: COLORS.terracotta,    text: COLORS.creamAlt },
    { label: "WORKING · 15%",    pct: 15, fill: COLORS.workingCapBar, text: COLORS.creamAlt },
    { label: "OPENING · 10%",    pct: 10, fill: "5A6B4D",             text: COLORS.creamAlt },
    { label: "5%",               pct:  5, fill: COLORS.goldBar,       text: COLORS.creamAlt },
  ];
  let sx = barX;
  segments.forEach(seg => {
    const segW = (seg.pct / 100) * barTotalW;
    s.addShape(pres.shapes.RECTANGLE, {
      x: sx, y: barY, w: segW, h: barH,
      fill: { color: seg.fill }, line: { type: "none" },
    });
    s.addText(seg.label, {
      x: sx + 0.1, y: barY, w: segW - 0.15, h: barH,
      fontFace: FONTS.body, fontSize: seg.pct <= 5 ? 8 : (seg.pct <= 10 ? 9 : 11),
      charSpacing: 0, color: seg.text, margin: 0, valign: "middle",
    });
    sx += segW;
  });

  // Divider under bar
  s.addShape(pres.shapes.LINE, {
    x: barX, y: barY + barH + 0.22, w: barTotalW, h: 0,
    line: { color: COLORS.dividerCream, width: 0.75 },
  });

  // 5 detail columns below. Square color chip + label + $ value + description.
  const detailY = barY + barH + 0.45;
  const colW = barTotalW / 5;
  const details = [
    { label: "BUILDOUT",        amt: "$90k", fill: COLORS.darkGreen,     desc: "Kitchen, bar, dining room finish-out. Leveraging existing brick & ceiling." },
    { label: "EQUIPMENT",       amt: "$50k", fill: COLORS.terracotta,    desc: "Pasta extruder, sheeter, ranges, refrigeration, small-wares. Mix new & used." },
    { label: "WORKING CAPITAL", amt: "$30k", fill: COLORS.workingCapBar, desc: "Three months of rent, payroll & utilities reserve for a soft first quarter." },
    { label: "OPENING INVENTORY", amt: "$20k", fill: "5A6B4D",           desc: "Opening wine list, dry goods, pantry & first two weeks of protein." },
    { label: "MARKETING",       amt: "$10k", fill: COLORS.goldBar,       desc: "Brand, signage, photography, friends-&-press soft opening." },
  ];
  details.forEach((d, i) => {
    const cx = barX + i * colW;
    // color chip
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: detailY + 0.06, w: 0.16, h: 0.16,
      fill: { color: d.fill }, line: { type: "none" },
    });
    // label
    s.addText(d.label, {
      x: cx + 0.25, y: detailY, w: colW - 0.3, h: 0.3,
      fontFace: FONTS.body, fontSize: 9, charSpacing: 3,
      color: COLORS.textMuted, margin: 0, valign: "middle",
    });
    // amount
    s.addText(d.amt, {
      x: cx, y: detailY + 0.38, w: colW - 0.2, h: 0.6,
      fontFace: FONTS.head, fontSize: 30,
      color: d.label === "BUILDOUT"           ? COLORS.darkGreen
           : d.label === "EQUIPMENT"          ? COLORS.terracotta
           : d.label === "WORKING CAPITAL"    ? COLORS.workingCapBar
           : d.label === "OPENING INVENTORY"  ? "5A6B4D"
           :                                    COLORS.goldBar,
      margin: 0, valign: "top",
    });
    // description
    s.addText(d.desc, {
      x: cx, y: detailY + 1.1, w: colW - 0.25, h: 1.0,
      fontFace: FONTS.body, fontSize: 10, color: COLORS.textDark,
      margin: 0, valign: "top",
    });
  });
}

// ================================================================
//  SLIDE 9 — Rough Economics
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.cream };

  addBrandMark(s, false);
  addTopRightLabel(s, "08 · ROUGH ECONOMICS", false);
  addFooter(s, 9, false);

  // Eyebrow
  s.addText("ROUGH ECONOMICS", {
    x: 0.75, y: 1.35, w: 3.5, h: 0.3,
    fontFace: FONTS.body, fontSize: 11, charSpacing: 4,
    color: COLORS.terracottaDim, margin: 0,
  });

  // Headline with italic "conservatively."
  s.addText(
    [
      { text: "The math, ", options: { color: COLORS.textDark } },
      { text: "conservatively.", options: { color: COLORS.terracottaDim, italic: true } },
    ],
    {
      x: 0.75, y: 1.7, w: 8.5, h: 1.0,
      fontFace: FONTS.head, fontSize: 38,
      margin: 0, valign: "top", charSpacing: -1,
    }
  );

  // Right-aligned 2-line note
  s.addText(
    [
      { text: "Based on 48 seats, $28 avg check, 5 dinner services/wk.", options: { breakLine: true } },
      { text: "Projections are planning estimates, not promises.",      options: {} },
    ],
    {
      x: 8.8, y: 2.05, w: 3.8, h: 0.75,
      fontFace: FONTS.body, fontSize: 10, color: COLORS.textMuted,
      align: "right", margin: 0, valign: "top",
    }
  );

  // Divider under headline
  s.addShape(pres.shapes.LINE, {
    x: 0.75, y: 2.95, w: 11.85, h: 0,
    line: { color: COLORS.dividerCream, width: 0.75 },
  });

  // Top row: 4 stat cells
  const stats = [
    { label: "AVG CHECK",     value: "$42", sub: "Food + wine, per guest" },
    { label: "COVERS / NIGHT",value: "75",  sub: "1.5 turns on 48 seats" },
    { label: "FOOD COST",     value: "30%", sub: "In line with category" },
    { label: "TARGET EBITDA", value: "12%", sub: "Year 2, steady state" },
  ];
  const statTop = 3.15, statColW = 11.85 / 4;
  stats.forEach((st, i) => {
    const x = 0.75 + i * statColW;
    s.addText(st.label, {
      x, y: statTop, w: statColW - 0.2, h: 0.3,
      fontFace: FONTS.body, fontSize: 10, charSpacing: 3,
      color: COLORS.textMuted, margin: 0, valign: "top",
    });
    s.addText(st.value, {
      x, y: statTop + 0.35, w: statColW - 0.2, h: 0.6,
      fontFace: FONTS.head, fontSize: 32, color: COLORS.textDark,
      margin: 0, valign: "top",
    });
    s.addText(st.sub, {
      x, y: statTop + 1.0, w: statColW - 0.2, h: 0.3,
      fontFace: FONTS.body, fontSize: 10, color: COLORS.textMuted,
      margin: 0, valign: "top",
    });
  });

  // Divider between stats and table
  s.addShape(pres.shapes.LINE, {
    x: 0.75, y: 4.55, w: 11.85, h: 0,
    line: { color: COLORS.dividerCream, width: 0.75 },
  });

  // 3-column projections table
  const tblY = 4.75;
  const colStarts = [0.75, 2.5, 5.95, 9.4];  // first col is metric name, then Y1/Y2/Y3
  const headers = ["", "YEAR 1 · OPENING", "YEAR 2 · STEADY", "YEAR 3 · LUNCH ADDED"];
  headers.forEach((h, i) => {
    if (!h) return;
    s.addText(
      [
        { text: h.split(" · ")[0], options: { color: COLORS.textDark } },
        { text: " · " + h.split(" · ")[1], options: { color: COLORS.textMutedLight } },
      ],
      {
        x: colStarts[i], y: tblY, w: 3.2, h: 0.3,
        fontFace: FONTS.body, fontSize: 10, charSpacing: 2,
        margin: 0, valign: "middle",
      }
    );
  });

  // Row divider below header
  s.addShape(pres.shapes.LINE, {
    x: 0.75, y: tblY + 0.45, w: 11.85, h: 0,
    line: { color: COLORS.dividerCream, width: 0.5 },
  });

  // Data rows
  const rows = [
    { metric: "Revenue",      vals: ["$820k",       "$1.15M", "$1.45M"], divider: false },
    { metric: "Gross Margin", vals: ["64%",         "67%",    "68%"],    divider: true  },
    { metric: "EBITDA",       vals: ["~ break-even","$140k",  "$205k"],  divider: false },
  ];
  let ry = tblY + 0.6;
  const rowH = 0.55;
  rows.forEach(row => {
    // Metric name (italic)
    s.addText(row.metric, {
      x: colStarts[0], y: ry, w: 1.6, h: rowH,
      fontFace: FONTS.head, fontSize: 16, italic: true,
      color: COLORS.textDark, margin: 0, valign: "middle",
    });
    // Values
    row.vals.forEach((v, i) => {
      s.addText(v, {
        x: colStarts[i + 1], y: ry, w: 3.2, h: rowH,
        fontFace: FONTS.head, fontSize: 20, color: COLORS.textDark,
        margin: 0, valign: "middle",
      });
    });
    if (row.divider) {
      s.addShape(pres.shapes.LINE, {
        x: 0.75, y: ry + rowH, w: 11.85, h: 0,
        line: { color: COLORS.dividerCream, width: 0.5 },
      });
    }
    ry += rowH;
  });
}

// ================================================================
//  SLIDE 10 — Thank You
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.darkGreen };

  addBrandMark(s, true);
  addTopRightLabel(s, "09 · THANK YOU", true);
  addFooter(s, 10, true);

  // Eyebrow
  s.addText("THANK YOU", {
    x: 0.75, y: 1.35, w: 3, h: 0.3,
    fontFace: FONTS.body, fontSize: 11, charSpacing: 4,
    color: COLORS.peach, margin: 0,
  });

  // Big multi-line headline: "Come build a neighborhood table with me."
  s.addText(
    [
      { text: "Come ", options: { color: COLORS.creamAlt } },
      { text: "build ", options: { color: COLORS.peach, italic: true } },
      { text: "a neighborhood table with me.", options: { color: COLORS.creamAlt } },
    ],
    {
      x: 0.75, y: 1.7, w: 7.5, h: 3.5,
      fontFace: FONTS.head, fontSize: 60,
      margin: 0, valign: "top", charSpacing: -2,
    }
  );

  // Italic subhead
  s.addText(
    "The next step is a tasting dinner, at home, for anyone who wants in. Eat the pasta, pour the wine, decide from there.",
    {
      x: 0.75, y: 5.25, w: 7.0, h: 0.9,
      fontFace: FONTS.head, fontSize: 16, italic: true,
      color: COLORS.creamAlt, transparency: 10,
      margin: 0, valign: "top",
    }
  );

  // Divider
  s.addShape(pres.shapes.LINE, {
    x: 0.75, y: 6.05, w: 6.5, h: 0,
    line: { color: COLORS.dividerDark, width: 0.75 },
  });

  // Two-column contact/next footer
  const contactY = 6.2;
  s.addText("CONTACT", {
    x: 0.75, y: contactY, w: 2.5, h: 0.22,
    fontFace: FONTS.body, fontSize: 9, charSpacing: 0,
    color: COLORS.peachDim, transparency: 45, margin: 0,
  });
  s.addText("[ your name ]", {
    x: 0.75, y: contactY + 0.2, w: 3.5, h: 0.3,
    fontFace: FONTS.head, fontSize: 14, color: COLORS.creamAlt,
    margin: 0, valign: "top",
  });
  s.addText("[ email · phone ]", {
    x: 0.75, y: contactY + 0.48, w: 3.5, h: 0.26,
    fontFace: FONTS.body, fontSize: 10, color: COLORS.peachDim,
    transparency: 25, margin: 0, valign: "top",
  });

  s.addText("NEXT", {
    x: 3.75, y: contactY, w: 2.5, h: 0.22,
    fontFace: FONTS.body, fontSize: 9, charSpacing: 0,
    color: COLORS.peachDim, transparency: 45, margin: 0,
  });
  s.addText("Tasting, May", {
    x: 3.75, y: contactY + 0.2, w: 3.5, h: 0.3,
    fontFace: FONTS.head, fontSize: 14, color: COLORS.creamAlt,
    margin: 0, valign: "top",
  });
  s.addText("Six seats, my kitchen", {
    x: 3.75, y: contactY + 0.48, w: 3.5, h: 0.26,
    fontFace: FONTS.body, fontSize: 10, color: COLORS.peachDim,
    transparency: 25, margin: 0, valign: "top",
  });

  // Right-side image placeholder
  const imgX = 8.0, imgY = 1.0, imgW = 4.55, imgH = 5.75;
  s.addShape(pres.shapes.RECTANGLE, {
    x: imgX, y: imgY, w: imgW, h: imgH,
    fill: { color: "2A4638" }, line: { type: "none" },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: imgX, y: imgY + imgH - 0.38, w: imgW, h: 0.38,
    fill: { color: "1A2F24" }, line: { type: "none" },
  });
  s.addText("IMAGE · PASTA ON A WOOD BOARD, FLOUR, HANDS", {
    x: imgX + 0.1, y: imgY + imgH - 0.38, w: imgW - 0.2, h: 0.38,
    fontFace: FONTS.body, fontSize: 8, charSpacing: 0,
    color: COLORS.peachDim, transparency: 20,
    margin: 0, valign: "middle",
  });
}

// ---------- Save ----------
pres.writeFile({ fileName: "Trattoria_Malden_Pitch.pptx" })
  .then(fn => console.log("Wrote:", fn));
