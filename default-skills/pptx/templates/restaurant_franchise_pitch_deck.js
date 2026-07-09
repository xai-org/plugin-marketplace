/**
 * Muy Bonita Tacos — Investor Deck Recreation
 * Rebuilt with pptxgenjs to match the original 17-slide presentation.
 *
 * Run:
 *   npm install pptxgenjs
 *   node muy_bonita_tacos.js
 */

const pptxgen = require("pptxgenjs");

// ---------------------------------------------------------------------------
// Palette
// ---------------------------------------------------------------------------
const C = {
  cream:      "F3E9D2",   // main light background
  creamAlt:   "F8F0DD",   // slightly lighter cream variant
  creamLine:  "EADDBC",   // subtle divider tone
  terracotta: "C1440E",   // brand red/orange
  green:      "2E4A2B",   // forest green
  gold:       "F2B705",   // yellow/gold
  brown:      "9C5A2C",   // warm brown
  ink:        "1A1410",   // near-black ink text
  inkSoft:    "2A1D12",   // dark brown alt
  muted:      "4E3826",   // muted label brown
  white:      "FFFFFF",
  // slide-6 delivery menu dark background
  deliveryBg: "2A1D12",
};

// Fonts — serif italic for display headlines, monospace for labels, sans for body.
const F = {
  serif:  "Georgia",         // used italic for headlines and numbers
  mono:   "Consolas",        // used for small-caps style labels / dates / page numbers
  sans:   "Calibri",         // body copy
};

// ---------------------------------------------------------------------------
// Presentation setup — 20" x 11.25" custom widescreen to match original
// ---------------------------------------------------------------------------
const pres = new pptxgen();
pres.defineLayout({ name: "MB_WIDE", width: 20, height: 11.25 });
pres.layout = "MB_WIDE";
pres.author = "Muy Bonita Tacos";
pres.title  = "Muy Bonita Tacos — Investor Presentation Spring 2026";

const W = 20;
const H = 11.25;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
// Shared footer (page counter left + brand tag right). Text color adapts.
function addFooter(slide, pageNum, textColor = C.muted) {
  slide.addText(`${String(pageNum).padStart(2, "0")} / 17`, {
    x: 0.9, y: H - 0.75, w: 3, h: 0.35,
    fontFace: F.mono, fontSize: 16, color: textColor,
    charSpacing: 3, align: "left", valign: "middle", margin: 0,
  });
  slide.addText("MUY BONITA  ·  EST. 2014", {
    x: W - 5.5, y: H - 0.75, w: 4.6, h: 0.35,
    fontFace: F.mono, fontSize: 16, color: textColor,
    charSpacing: 3, align: "right", valign: "middle", margin: 0,
  });
}

// Small-caps section kicker at top-left (e.g. "01 — THE THESIS")
function addKicker(slide, text, color = C.terracotta) {
  slide.addText(text, {
    x: 0.9, y: 0.65, w: 12, h: 0.45,
    fontFace: F.mono, fontSize: 18, color, charSpacing: 4,
    bold: false, align: "left", valign: "middle", margin: 0,
  });
}

// Large italic serif headline (used on most content slides).
function addHeadline(slide, text, opts = {}) {
  slide.addText(text, {
    x: opts.x ?? 0.9,
    y: opts.y ?? 1.35,
    w: opts.w ?? 18,
    h: opts.h ?? 2.4,
    fontFace: F.serif, fontSize: opts.size ?? 52,
    italic: true, bold: false,
    color: opts.color ?? C.ink,
    align: "left", valign: "top", margin: 0,
  });
}

// ---------------------------------------------------------------------------
// SLIDE 1 — Cover
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  // Top kicker
  s.addText("INVESTOR PRESENTATION  ·  SPRING 2026", {
    x: 0.9, y: 0.65, w: 14, h: 0.45,
    fontFace: F.mono, fontSize: 20, color: C.terracotta,
    charSpacing: 5, align: "left", valign: "middle", margin: 0,
  });

  // Decorative shapes (left: terracotta standalone block; right: green tall rect + gold circle)
  // Terracotta rectangle — smaller, floating above title with a gap
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.1, y: 1.4, w: 2.0, h: 2.9,
    fill: { color: C.terracotta }, line: { color: C.terracotta },
  });

  // Green tall rectangle on the right
  s.addShape(pres.shapes.RECTANGLE, {
    x: 14.3, y: 1.6, w: 2.3, h: 3.8,
    fill: { color: C.green }, line: { color: C.green },
  });

  // Gold circle upper right
  s.addShape(pres.shapes.OVAL, {
    x: 16.9, y: 1.1, w: 1.7, h: 1.7,
    fill: { color: C.gold }, line: { color: C.gold },
  });

  // Main title — large italic serif (sits below the block with a gap)
  s.addText("Muy Bonita\nTacos.", {
    x: 0.9, y: 5.6, w: 13, h: 2.8,
    fontFace: F.serif, fontSize: 92, italic: true,
    color: C.ink, align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 0.95,
  });

  // Tagline — extra gap below title
  s.addText("Hand-pressed tortillas, family recipes,\nfast-casual service.", {
    x: 0.9, y: 9.0, w: 11, h: 1.4,
    fontFace: F.serif, fontSize: 24, italic: true,
    color: C.muted, align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 1.15,
  });

  // Bottom-right URL
  s.addText("MUYBONITA.CO  /  INVESTORS", {
    x: W - 7, y: H - 0.75, w: 6.1, h: 0.35,
    fontFace: F.mono, fontSize: 18, color: C.muted, charSpacing: 4,
    align: "right", valign: "middle", margin: 0,
  });
}

// ---------------------------------------------------------------------------
// SLIDE 2 — The Thesis
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addKicker(s, "01  —  THE THESIS", C.terracotta);

  // Headline with terracotta accent on "$14B category"
  s.addText([
    { text: "Fast-casual Mexican is a ",  options: { color: C.ink } },
    { text: "$14B category",               options: { color: C.terracotta } },
    { text: " — and almost none of it is actually made by hand.", options: { color: C.ink } },
  ], {
    x: 0.9, y: 1.3, w: 18.2, h: 4.3,
    fontFace: F.serif, fontSize: 62, italic: true,
    align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 1.1,
  });

  // Three columns at bottom: Assembled / Industrial / Ours
  const colY = 8.1;
  const colW = 5.6;
  const colH = 2.3;
  const gap = 0.4;
  const startX = 0.9;

  const cols = [
    { title: "Assembled",  body: "Tortillas shipped frozen, warmed on a\nflat-top. The default.",            line: C.ink,        titleColor: C.ink },
    { title: "Industrial", body: "Proteins pre-cooked, held in pans for\nhours. Speed over soul.",          line: C.ink,        titleColor: C.ink },
    { title: "Ours",       body: "Tortillas pressed when you order.\nProteins cooked to fire. No heat lamps.", line: C.terracotta, titleColor: C.terracotta },
  ];

  cols.forEach((c, i) => {
    const x = startX + i * (colW + gap);
    // top divider
    s.addShape(pres.shapes.LINE, {
      x, y: colY - 0.15, w: colW - 0.5, h: 0,
      line: { color: c.line, width: 1.2 },
    });
    // title
    s.addText(c.title, {
      x, y: colY, w: colW, h: 0.6,
      fontFace: F.serif, fontSize: 26, italic: true, color: c.titleColor,
      align: "left", valign: "top", margin: 0,
    });
    // body
    s.addText(c.body, {
      x, y: colY + 0.7, w: colW - 0.3, h: colH - 0.7,
      fontFace: F.sans, fontSize: 15, color: C.muted,
      align: "left", valign: "top", margin: 0,
      lineSpacingMultiple: 1.3,
    });
  });

  addFooter(s, 2);
}

// ---------------------------------------------------------------------------
// SLIDE 3 — Our Story
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addKicker(s, "02  —  OUR STORY", C.terracotta);

  // Left column: headline + body paragraphs
  s.addText("Started with a\ncomal and a\nkitchen table.", {
    x: 0.9, y: 1.8, w: 9.5, h: 3.6,
    fontFace: F.serif, fontSize: 56, italic: true, color: C.ink,
    align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 1.0,
  });

  s.addText("In 2014, Hector Ramirez began pressing tortillas out of his mother's kitchen in Austin, selling them at the Mueller farmers' market under a hand-painted sign: Muy Bonita.", {
    x: 0.9, y: 5.6, w: 5.6, h: 2.4,
    fontFace: F.sans, fontSize: 17, color: C.ink,
    align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 1.45,
  });

  s.addText("Twelve years and nine locations later, every tortilla is still pressed to order — and every recipe still traces back to Doña Rosa's handwritten notebook from Puebla.", {
    x: 0.9, y: 7.55, w: 5.6, h: 2.4,
    fontFace: F.sans, fontSize: 17, color: C.ink,
    align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 1.45,
  });

  // Right side: 2x2 grid of colored year tiles
  const tiles = [
    { x: 10.8, y: 1.2, color: C.terracotta, year: "2014", label: "FIRST MARKET STALL" },
    { x: 15.3, y: 1.2, color: C.green,      year: "2016", label: "BRICK & MORTAR, S.\nLAMAR" },
    { x: 10.8, y: 5.6, color: C.gold,       year: "2019", label: "THIRD LOCATION" },
    { x: 15.3, y: 5.6, color: C.brown,      year: "2023", label: "EXPANSION, 9 UNITS" },
  ];
  const tileW = 4.2;
  const tileH = 4.0;

  tiles.forEach((t) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: t.x, y: t.y, w: tileW, h: tileH,
      fill: { color: t.color }, line: { color: t.color },
    });
    s.addText(t.year, {
      x: t.x + 0.3, y: t.y + 0.25, w: tileW - 0.6, h: 1.2,
      fontFace: F.serif, fontSize: 44, italic: true, color: C.creamAlt,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(t.label, {
      x: t.x + 0.3, y: t.y + tileH - 1.0, w: tileW - 0.6, h: 0.9,
      fontFace: F.mono, fontSize: 18, color: C.creamAlt, charSpacing: 3,
      align: "left", valign: "top", margin: 0,
      lineSpacingMultiple: 1.25,
    });
  });

  addFooter(s, 3);
}

// ---------------------------------------------------------------------------
// SLIDE 4 — Our Kitchen (terracotta full-bleed)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.terracotta };

  addKicker(s, "03  —  OUR KITCHEN", C.gold);

  // Headline in cream italic — sized to fit on a single line
  s.addText("Every plate starts with a twelve-second press.", {
    x: 0.9, y: 1.3, w: 18.2, h: 1.5,
    fontFace: F.serif, fontSize: 48, italic: true, color: C.creamAlt,
    align: "left", valign: "top", margin: 0,
  });

  // Huge yellow statistic
  s.addText("1,840", {
    x: 0.9, y: 5.4, w: 10, h: 3.3,
    fontFace: F.serif, fontSize: 180, italic: true, color: C.gold,
    align: "left", valign: "top", margin: 0,
  });

  s.addText("TORTILLAS PRESSED PER LOCATION, PER DAY (AVG.)", {
    x: 0.9, y: 8.85, w: 11, h: 0.5,
    fontFace: F.mono, fontSize: 18, color: C.creamAlt, charSpacing: 3,
    align: "left", valign: "top", margin: 0,
  });

  // Right-side body paragraph — narrower column so it wraps to ~5 lines
  s.addText("Heirloom Mexican corn is nixtamalized on site, ground into masa each morning, and pressed the moment a guest orders. Nothing sits. Nothing freezes.", {
    x: 12.5, y: 5.7, w: 5.2, h: 3.5,
    fontFace: F.sans, fontSize: 17, color: C.creamAlt,
    align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 1.45,
  });

  addFooter(s, 4, C.creamAlt);
}

// ---------------------------------------------------------------------------
// SLIDE 5 — What Makes Us Different (2x2 numbered items)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addKicker(s, "04  —  WHAT MAKES US DIFFERENT", C.terracotta);

  s.addText("Four things, done right.", {
    x: 0.9, y: 1.3, w: 18, h: 1.4,
    fontFace: F.serif, fontSize: 58, italic: true, color: C.ink,
    align: "left", valign: "top", margin: 0,
  });

  const items = [
    { x: 0.9,  y: 3.2, chipColor: C.gold,       num: "0 1", title: "Heirloom corn, nixtamalized daily",
      body: "Olotillo and Bolita Amarilla, sourced from a co-op in Oaxaca." },
    { x: 10.4, y: 3.2, chipColor: C.terracotta, num: "0 2", title: "Tortillas pressed to order",
      body: "No par-baking. No warming drawer. Never more than 90 seconds old." },
    { x: 0.9,  y: 5.3, chipColor: C.green,      num: "0 3", title: "Family recipes from Puebla",
      body: "Al pastor marinates 18 hours. Mole from Doña Rosa's notebook." },
    { x: 10.4, y: 5.3, chipColor: C.brown,      num: "0 4", title: "Local produce & proteins",
      body: "Richardson Farms pork, Johnson's Backyard Garden produce." },
  ];

  items.forEach((it) => {
    // square color chip with number
    s.addShape(pres.shapes.RECTANGLE, {
      x: it.x, y: it.y, w: 1.1, h: 1.1,
      fill: { color: it.chipColor }, line: { color: it.chipColor },
    });
    s.addText(it.num, {
      x: it.x, y: it.y, w: 1.1, h: 1.1,
      fontFace: F.mono, fontSize: 22, color: C.creamAlt, charSpacing: 4,
      align: "center", valign: "middle", margin: 0,
    });
    // title
    s.addText(it.title, {
      x: it.x + 1.5, y: it.y - 0.05, w: 7.4, h: 0.8,
      fontFace: F.serif, fontSize: 25, italic: true, color: C.ink,
      align: "left", valign: "top", margin: 0,
    });
    // body
    s.addText(it.body, {
      x: it.x + 1.5, y: it.y + 0.75, w: 7.4, h: 1.5,
      fontFace: F.sans, fontSize: 15, color: C.muted,
      align: "left", valign: "top", margin: 0,
      lineSpacingMultiple: 1.35,
    });
  });

  addFooter(s, 5);
}

// ---------------------------------------------------------------------------
// SLIDE 6 — Hand-Pressed, Not Shipped (6-step timeline)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addKicker(s, "05  —  HAND-PRESSED, NOT SHIPPED", C.terracotta);

  s.addText("From kernel to hand, in six steps.", {
    x: 0.9, y: 1.3, w: 18, h: 1.6,
    fontFace: F.serif, fontSize: 58, italic: true, color: C.ink,
    align: "left", valign: "top", margin: 0,
  });

  // Timeline horizontal rules
  const tlY = 7.2;
  const tlH = 2.5;
  s.addShape(pres.shapes.LINE, { x: 0.9, y: tlY,       w: W - 1.8, h: 0, line: { color: C.ink, width: 1 } });
  s.addShape(pres.shapes.LINE, { x: 0.9, y: tlY + tlH, w: W - 1.8, h: 0, line: { color: C.ink, width: 1 } });

  const steps = [
    { time: "04:30",   label: "Corn\nnixtamalized in\ncal" },
    { time: "06:00",   label: "Stone-ground\ninto masa" },
    { time: "11:00",   label: "Doors open" },
    { time: "+12 sec", label: "Tortilla pressed\nto order" },
    { time: "+45 sec", label: "Charred on the\ncomal" },
    { time: "+90 sec", label: "In your hand" },
  ];
  const cellW = (W - 1.8) / 6;

  steps.forEach((st, i) => {
    const x = 0.9 + i * cellW;
    // vertical divider between cells (skip first)
    if (i > 0) {
      s.addShape(pres.shapes.LINE, {
        x, y: tlY, w: 0, h: tlH, line: { color: C.ink, width: 1 },
      });
    }
    // time label
    s.addText(st.time, {
      x: x + 0.3, y: tlY + 0.3, w: cellW - 0.4, h: 0.5,
      fontFace: F.mono, fontSize: 22, color: C.terracotta, charSpacing: 2,
      align: "left", valign: "top", margin: 0,
    });
    // description
    s.addText(st.label, {
      x: x + 0.3, y: tlY + 1.1, w: cellW - 0.4, h: 1.3,
      fontFace: F.serif, fontSize: 18, italic: true, color: C.ink,
      align: "left", valign: "top", margin: 0,
      lineSpacingMultiple: 1.15,
    });
  });

  addFooter(s, 6);
}

// ---------------------------------------------------------------------------
// SLIDE 7 — The Sourcing (green full-bleed quote)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.green };

  addKicker(s, "06  —  THE SOURCING", C.gold);

  // Large gold open-quote mark
  s.addText("“", {
    x: 0.7, y: 3.0, w: 2.5, h: 2.2,
    fontFace: F.serif, fontSize: 180, italic: true, bold: true, color: C.gold,
    align: "left", valign: "top", margin: 0,
  });

  // Quote body
  s.addText("If I can't tell you the name of the farm, we don't buy it. We cook for our neighbors the same way we cook for our family.", {
    x: 0.9, y: 5.3, w: 18, h: 3.2,
    fontFace: F.serif, fontSize: 48, italic: true, color: C.creamAlt,
    align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 1.15,
  });

  // Attribution
  s.addText("HECTOR RAMIREZ  —  FOUNDER & CHEF", {
    x: 0.9, y: 8.8, w: 12, h: 0.5,
    fontFace: F.mono, fontSize: 20, color: C.gold, charSpacing: 4,
    align: "left", valign: "middle", margin: 0,
  });

  addFooter(s, 7, C.creamAlt);
}

// ---------------------------------------------------------------------------
// SLIDE 8 — The Dine-In Menu (4 count callouts)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addKicker(s, "07  —  THE DINE-IN MENU", C.terracotta);

  // Two-column intro: headline left, paragraph right
  s.addText("Small menu. Big\nintention.", {
    x: 0.9, y: 1.3, w: 10, h: 2.8,
    fontFace: F.serif, fontSize: 58, italic: true, color: C.ink,
    align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 1.0,
  });

  s.addText("Twenty-two items, six proteins, three salsas made fresh every morning. We kept it small on purpose — every item earns its place on the comal.", {
    x: 11.0, y: 1.55, w: 6.2, h: 2.8,
    fontFace: F.sans, fontSize: 17, color: C.ink,
    align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 1.45,
  });

  // Four number callouts at the bottom with top accent lines
  const callY = 7.6;
  const callCells = [
    { num: "06", label: "SIGNATURE TACOS",    color: C.terracotta },
    { num: "04", label: "PLATES & BOWLS",     color: C.green      },
    { num: "08", label: "SIDES & SOPAS",      color: C.gold       },
    { num: "04", label: "AGUAS & AGUA FRESCAS", color: C.brown    },
  ];
  const callW = (W - 1.8) / 4;

  callCells.forEach((c, i) => {
    const x = 0.9 + i * callW;
    // top accent line (short)
    s.addShape(pres.shapes.LINE, {
      x, y: callY, w: callW - 0.8, h: 0,
      line: { color: c.color, width: 1.2 },
    });
    s.addText(c.num, {
      x, y: callY + 0.2, w: callW - 0.5, h: 1.6,
      fontFace: F.serif, fontSize: 80, italic: true, color: c.color,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(c.label, {
      x, y: callY + 1.75, w: callW - 0.3, h: 0.5,
      fontFace: F.mono, fontSize: 18, color: C.muted, charSpacing: 3,
      align: "left", valign: "top", margin: 0,
    });
  });

  addFooter(s, 8);
}

// ---------------------------------------------------------------------------
// SLIDE 9 — Signature Tacos (menu)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addKicker(s, "08  —  SIGNATURE TACOS", C.terracotta);

  s.addText("Six tacos. Every one a story.", {
    x: 0.9, y: 1.3, w: 12, h: 1.4,
    fontFace: F.serif, fontSize: 54, italic: true, color: C.ink,
    align: "left", valign: "top", margin: 0,
  });

  // Right-side label
  s.addText("SERVED ON HOUSE-PRESSED CORN", {
    x: 12.5, y: 1.75, w: 6.8, h: 0.5,
    fontFace: F.mono, fontSize: 18, color: C.terracotta, charSpacing: 3,
    align: "right", valign: "top", margin: 0,
  });

  // Menu items — six tacos arranged in 2 columns x 3 rows
  const tacos = [
    { col: 0, row: 0, name: "Al Pastor",  desc: "Marinated pork, pineapple, onion, cilantro", price: "$4.75", dot: C.terracotta },
    { col: 1, row: 0, name: "Carnitas",   desc: "Slow-braised pork shoulder, salsa verde",    price: "$4.50", dot: C.brown },
    { col: 0, row: 1, name: "Pollo Asado",desc: "Guajillo-rubbed chicken, charred corn",      price: "$4.50", dot: C.gold },
    { col: 1, row: 1, name: "Barbacoa",   desc: "Beef cheek, consomé, white onion",            price: "$5.25", dot: "8B2500" },
    { col: 0, row: 2, name: "Hongos",     desc: "Oyster mushrooms, epazote, lime crema",       price: "$4.25", dot: C.green },
    { col: 1, row: 2, name: "Pescado",    desc: "Crispy gulf snapper, cabbage, chipotle",      price: "$5.50", dot: C.brown },
  ];

  const colX = [0.9, 10.3];
  const rowY0 = 3.6;
  const rowH = 1.75;
  const colW = 9.0;

  tacos.forEach((t) => {
    const x = colX[t.col];
    const y = rowY0 + t.row * rowH;
    // colored dot
    s.addShape(pres.shapes.OVAL, {
      x, y: y + 0.05, w: 0.55, h: 0.55,
      fill: { color: t.dot }, line: { color: t.dot },
    });
    // name (italic serif)
    s.addText(t.name, {
      x: x + 0.85, y, w: colW - 3.0, h: 0.6,
      fontFace: F.serif, fontSize: 24, italic: true, color: C.ink,
      align: "left", valign: "top", margin: 0,
    });
    // description
    s.addText(t.desc, {
      x: x + 0.85, y: y + 0.6, w: colW - 1.4, h: 0.6,
      fontFace: F.sans, fontSize: 14, color: C.muted,
      align: "left", valign: "top", margin: 0,
    });
    // price right-aligned
    s.addText(t.price, {
      x: x + colW - 1.8, y: y + 0.05, w: 1.7, h: 0.6,
      fontFace: F.mono, fontSize: 27, color: C.terracotta,
      align: "right", valign: "top", margin: 0,
    });
    // faint divider beneath the row
    s.addShape(pres.shapes.LINE, {
      x, y: y + rowH - 0.15, w: colW - 0.3, h: 0,
      line: { color: C.creamLine, width: 0.75 },
    });
  });

  addFooter(s, 9);
}

// ---------------------------------------------------------------------------
// SLIDE 10 — Sides & Salsas
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addKicker(s, "09  —  SIDES & SALSAS", C.terracotta);

  s.addText("Made every morning, sold by sundown.", {
    x: 0.9, y: 1.3, w: 18, h: 1.4,
    fontFace: F.serif, fontSize: 54, italic: true, color: C.ink,
    align: "left", valign: "top", margin: 0,
  });

  // Left column: SIDES
  s.addText("SIDES", {
    x: 0.9, y: 3.6, w: 4, h: 0.4,
    fontFace: F.mono, fontSize: 18, color: C.terracotta, charSpacing: 3,
    align: "left", valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: 0.9, y: 4.1, w: 9, h: 0, line: { color: C.creamLine, width: 0.75 },
  });

  const sides = [
    { name: "Frijoles charros",  desc: "Pinto beans, bacon, chile de árbol",   price: "$4"    },
    { name: "Elote callejero",   desc: "Grilled corn, cotija, lime, chile",    price: "$5"    },
    { name: "Arroz rojo",        desc: "Tomato rice, fresh cilantro",          price: "$3.50" },
    { name: "Chips & guacamole", desc: "Made-to-order, twice daily",           price: "$7"    },
  ];

  sides.forEach((it, i) => {
    const y = 4.3 + i * 1.25;
    s.addText(it.name, {
      x: 0.9, y, w: 7, h: 0.5,
      fontFace: F.serif, fontSize: 22, italic: true, color: C.ink,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(it.desc, {
      x: 0.9, y: y + 0.55, w: 7.5, h: 0.5,
      fontFace: F.sans, fontSize: 14, color: C.muted,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(it.price, {
      x: 7.8, y, w: 2, h: 0.5,
      fontFace: F.mono, fontSize: 24, color: C.terracotta,
      align: "right", valign: "top", margin: 0,
    });
    s.addShape(pres.shapes.LINE, {
      x: 0.9, y: y + 1.1, w: 9, h: 0, line: { color: C.creamLine, width: 0.75 },
    });
  });

  // Right column: SALSA BAR
  s.addText("SALSA BAR", {
    x: 11.0, y: 3.6, w: 4, h: 0.4,
    fontFace: F.mono, fontSize: 18, color: C.terracotta, charSpacing: 3,
    align: "left", valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: 11.0, y: 4.1, w: 8, h: 0, line: { color: C.creamLine, width: 0.75 },
  });

  const salsas = [
    { name: "Verde cruda",     level: "MILD",   color: C.green      },
    { name: "Roja asada",      level: "MEDIUM", color: C.terracotta },
    { name: "Habanero negra",  level: "HOT",    color: "2F241B"     },
  ];

  salsas.forEach((it, i) => {
    const y = 4.3 + i * 1.25;
    s.addShape(pres.shapes.OVAL, {
      x: 11.0, y: y + 0.05, w: 0.8, h: 0.8,
      fill: { color: it.color }, line: { color: it.color },
    });
    s.addText(it.name, {
      x: 12.1, y, w: 7, h: 0.55,
      fontFace: F.serif, fontSize: 22, italic: true, color: C.ink,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(it.level, {
      x: 12.1, y: y + 0.6, w: 4, h: 0.5,
      fontFace: F.mono, fontSize: 18, color: C.muted, charSpacing: 3,
      align: "left", valign: "top", margin: 0,
    });
    s.addShape(pres.shapes.LINE, {
      x: 11.0, y: y + 1.1, w: 8, h: 0, line: { color: C.creamLine, width: 0.75 },
    });
  });

  // Footer line under the salsa section
  s.addText("Included with every plate. Always.", {
    x: 11.0, y: 8.15, w: 8, h: 0.5,
    fontFace: F.serif, fontSize: 17, italic: true, color: C.ink,
    align: "left", valign: "top", margin: 0,
  });

  addFooter(s, 10);
}

// ---------------------------------------------------------------------------
// SLIDE 11 — The Delivery Menu (dark brown background)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.deliveryBg };

  addKicker(s, "10  —  THE DELIVERY MENU", C.gold);

  // Headline left
  s.addText("A menu built for the\ntwelve-minute car\nride.", {
    x: 0.9, y: 1.3, w: 10.5, h: 3.7,
    fontFace: F.serif, fontSize: 54, italic: true, color: C.creamAlt,
    align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 1.0,
  });

  // Paragraph right — narrower column
  s.addText("We won't send anything that doesn't travel well. Hot items in vented boxes, tortillas packed separate, salsas sealed — and every order built to be assembled at the table.", {
    x: 11.5, y: 1.55, w: 5.8, h: 3.0,
    fontFace: F.sans, fontSize: 16, color: C.creamAlt,
    align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 1.45,
  });

  // Three columns bottom
  const colY = 7.7;
  const cellW = (W - 2.0) / 3;
  const cells = [
    { title: "Taco Kits",    body: "Components delivered separate. You\nassemble.",         line: C.terracotta },
    { title: "Family Packs", body: "Feeds four. One protein, rice, beans, salsas.",         line: C.gold       },
    { title: "Party Trays",  body: "For 10–30. Order by 3pm the day before.",               line: C.green      },
  ];
  cells.forEach((c, i) => {
    const x = 1.0 + i * cellW;
    s.addShape(pres.shapes.LINE, {
      x, y: colY, w: cellW - 0.5, h: 0, line: { color: c.line, width: 1.2 },
    });
    s.addText(c.title, {
      x, y: colY + 0.15, w: cellW - 0.3, h: 0.8,
      fontFace: F.serif, fontSize: 32, italic: true, color: C.creamAlt,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(c.body, {
      x, y: colY + 1.1, w: cellW - 0.5, h: 1.6,
      fontFace: F.sans, fontSize: 15, color: C.creamAlt,
      align: "left", valign: "top", margin: 0,
      lineSpacingMultiple: 1.35,
    });
  });

  addFooter(s, 11, C.creamAlt);
}

// ---------------------------------------------------------------------------
// SLIDE 12 — Family Packs & Taco Kits (3 pricing cards)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addKicker(s, "11  —  FAMILY PACKS & TACO KITS", C.terracotta);

  s.addText("Built for a table, not a single seat.", {
    x: 0.9, y: 1.3, w: 18, h: 1.4,
    fontFace: F.serif, fontSize: 54, italic: true, color: C.ink,
    align: "left", valign: "top", margin: 0,
  });

  const cards = [
    { x: 0.9,  bg: C.creamAlt,   txt: C.ink,       subTxt: C.muted,       label: C.terracotta, price: C.terracotta, serves: "SERVES 3–4",    title: "The Kit",    priceTxt: "$42",
      items: ["— 12 hand-pressed tortillas", "— 2 proteins of choice", "— Rice, beans, pickled onions", "— All three salsas"] },
    { x: 7.35, bg: C.terracotta, txt: C.creamAlt,  subTxt: C.creamAlt,    label: C.gold,       price: C.gold,       serves: "SERVES 4–6",    title: "The Family", priceTxt: "$68",
      items: ["— 18 tortillas", "— 3 proteins", "— Elote callejero", "— Chips, guac & all salsas", "— Horchata pitcher"] },
    { x: 13.8, bg: C.creamAlt,   txt: C.ink,       subTxt: C.muted,       label: C.terracotta, price: C.terracotta, serves: "SERVES 10–12",  title: "The Fiesta", priceTxt: "$145",
      items: ["— 36 tortillas", "— 4 proteins", "— Rice, beans, elote", "— Guac, chips, 4 salsas", "— Two agua frescas"] },
  ];

  const cardW = 5.35;
  const cardH = 7.0;
  const cardY = 3.1;

  cards.forEach((c) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: cardY, w: cardW, h: cardH,
      fill: { color: c.bg }, line: { color: c.bg },
    });
    s.addText(c.serves, {
      x: c.x + 0.5, y: cardY + 0.45, w: cardW - 1, h: 0.45,
      fontFace: F.mono, fontSize: 18, color: c.label, charSpacing: 4,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(c.title, {
      x: c.x + 0.5, y: cardY + 1.0, w: cardW - 1, h: 0.9,
      fontFace: F.serif, fontSize: 36, italic: true, color: c.txt,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(c.priceTxt, {
      x: c.x + 0.5, y: cardY + 2.0, w: cardW - 1, h: 0.8,
      fontFace: F.serif, fontSize: 32, italic: true, color: c.price,
      align: "left", valign: "top", margin: 0,
    });
    // thin divider
    s.addShape(pres.shapes.LINE, {
      x: c.x + 0.5, y: cardY + 3.05, w: cardW - 1, h: 0,
      line: { color: c.subTxt, width: 0.5 },
    });
    // item list
    s.addText(c.items.map((t, idx) => ({
      text: t,
      options: { breakLine: idx < c.items.length - 1 }
    })), {
      x: c.x + 0.5, y: cardY + 3.25, w: cardW - 1, h: cardH - 3.5,
      fontFace: F.sans, fontSize: 15, color: c.subTxt,
      align: "left", valign: "top", margin: 0,
      paraSpaceAfter: 6,
      lineSpacingMultiple: 1.3,
    });
  });

  addFooter(s, 12);
}

// ---------------------------------------------------------------------------
// SLIDE 13 — Unit Economics (table)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addKicker(s, "12  —  UNIT ECONOMICS", C.terracotta);

  s.addText("Craft doesn't have to cost margin.", {
    x: 0.9, y: 1.3, w: 18, h: 1.4,
    fontFace: F.serif, fontSize: 54, italic: true, color: C.ink,
    align: "left", valign: "top", margin: 0,
  });

  // Header row
  const headerY = 3.4;
  s.addText("METRIC", {
    x: 0.9, y: headerY, w: 6, h: 0.45,
    fontFace: F.mono, fontSize: 18, color: C.terracotta, charSpacing: 3,
    align: "left", valign: "middle", margin: 0,
  });
  s.addText("FY2025", {
    x: 9.0, y: headerY, w: 4, h: 0.45,
    fontFace: F.mono, fontSize: 18, color: C.terracotta, charSpacing: 3,
    align: "right", valign: "middle", margin: 0,
  });
  s.addText("CONTEXT", {
    x: 13.5, y: headerY, w: 6, h: 0.45,
    fontFace: F.mono, fontSize: 18, color: C.terracotta, charSpacing: 3,
    align: "left", valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: 0.9, y: headerY + 0.55, w: W - 1.8, h: 0, line: { color: C.ink, width: 1 },
  });

  const rows = [
    { metric: "Average unit volume", value: "$1.82M",    ctx: "Category avg: $1.3M" },
    { metric: "Food cost",           value: "29%",       ctx: "Premium sourcing, disciplined menu" },
    { metric: "Labor",               value: "27%",       ctx: "Cross-trained line, no chef-y bottleneck" },
    { metric: "Four-wall margin",    value: "21%",       ctx: "Top quartile for fast-casual" },
    { metric: "Payback period",      value: "28 months", ctx: "Build-out: ~$720K" },
  ];

  const rowH = 1.2;
  const row0Y = headerY + 0.7;
  rows.forEach((r, i) => {
    const y = row0Y + i * rowH;
    s.addText(r.metric, {
      x: 0.9, y, w: 7.5, h: rowH - 0.1,
      fontFace: F.serif, fontSize: 26, italic: true, color: C.ink,
      align: "left", valign: "middle", margin: 0,
    });
    s.addText(r.value, {
      x: 8.5, y, w: 4.5, h: rowH - 0.1,
      fontFace: F.serif, fontSize: 30, italic: true, color: C.terracotta,
      align: "right", valign: "middle", margin: 0,
    });
    s.addText(r.ctx, {
      x: 13.5, y, w: 6, h: rowH - 0.1,
      fontFace: F.sans, fontSize: 13, color: C.muted,
      align: "left", valign: "middle", margin: 0,
    });
    // divider
    s.addShape(pres.shapes.LINE, {
      x: 0.9, y: y + rowH - 0.05, w: W - 1.8, h: 0,
      line: { color: C.creamLine, width: 0.5 },
    });
  });

  addFooter(s, 13);
}

// ---------------------------------------------------------------------------
// SLIDE 14 — The Customer (4 big stats)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addKicker(s, "13  —  THE CUSTOMER", C.terracotta);

  s.addText("They come back. Often.", {
    x: 0.9, y: 1.3, w: 18, h: 1.4,
    fontFace: F.serif, fontSize: 54, italic: true, color: C.ink,
    align: "left", valign: "top", margin: 0,
  });

  // Four large stats at the bottom
  const statY = 7.9;
  const stats = [
    { num: "4.8×",    color: C.terracotta, label: "Visits per month, loyalty members" },
    { num: "68%",     color: C.green,      label: "Delivery orders from repeat guests" },
    { num: "$18.40",  color: C.gold,       label: "Average dine-in ticket"             },
    { num: "$44",     color: C.brown,      label: "Average delivery ticket"            },
  ];
  const sW = (W - 1.8) / 4;

  stats.forEach((st, i) => {
    const x = 0.9 + i * sW;
    s.addText(st.num, {
      x, y: statY, w: sW - 0.3, h: 1.5,
      fontFace: F.serif, fontSize: 72, italic: true, color: st.color,
      align: "left", valign: "top", margin: 0,
    });
    // short accent line under the number
    s.addShape(pres.shapes.LINE, {
      x, y: statY + 1.55, w: 0.8, h: 0,
      line: { color: st.color, width: 1.5 },
    });
    s.addText(st.label, {
      x, y: statY + 1.7, w: sW - 0.3, h: 0.6,
      fontFace: F.sans, fontSize: 13, color: C.ink,
      align: "left", valign: "top", margin: 0,
    });
  });

  addFooter(s, 14);
}

// ---------------------------------------------------------------------------
// SLIDE 15 — Growth Plan
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addKicker(s, "14  —  GROWTH PLAN", C.terracotta);

  s.addText("Forty units by 2030, every one company-\noperated.", {
    x: 0.9, y: 1.3, w: 18, h: 2.5,
    fontFace: F.serif, fontSize: 54, italic: true, color: C.ink,
    align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 1.05,
  });

  // Horizontal timeline rule
  const lineY = 7.3;
  s.addShape(pres.shapes.LINE, {
    x: 1.2, y: lineY, w: W - 2.4, h: 0, line: { color: C.ink, width: 0.75 },
  });

  const points = [
    { x: 0.9,  color: C.green,      year: "NOW",  big: "9 units",   loc: "Austin metro" },
    { x: 5.7,  color: C.gold,       year: "2027", big: "+6 units",  loc: "San Antonio, Houston" },
    { x: 10.5, color: C.terracotta, year: "2028", big: "+12 units", loc: "Dallas, Phoenix" },
    { x: 15.3, color: C.brown,      year: "2030", big: "40 units",  loc: "Southwest region" },
  ];

  points.forEach((p) => {
    // dot with ring
    s.addShape(pres.shapes.OVAL, {
      x: p.x, y: lineY - 0.35, w: 0.7, h: 0.7,
      fill: { color: C.cream }, line: { color: p.color, width: 2 },
    });
    s.addShape(pres.shapes.OVAL, {
      x: p.x + 0.2, y: lineY - 0.15, w: 0.3, h: 0.3,
      fill: { color: p.color }, line: { color: p.color },
    });
    s.addText(p.year, {
      x: p.x, y: lineY + 0.55, w: 4, h: 0.45,
      fontFace: F.mono, fontSize: 20, color: p.color, charSpacing: 3,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(p.big, {
      x: p.x, y: lineY + 1.05, w: 4.5, h: 1.3,
      fontFace: F.serif, fontSize: 46, italic: true, color: p.color,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(p.loc, {
      x: p.x, y: lineY + 2.5, w: 4.5, h: 0.45,
      fontFace: F.sans, fontSize: 13, color: C.ink,
      align: "left", valign: "top", margin: 0,
    });
  });

  addFooter(s, 15);
}

// ---------------------------------------------------------------------------
// SLIDE 16 — The Ask (terracotta full-bleed)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.terracotta };

  addKicker(s, "15  —  THE ASK", C.gold);

  s.addText("$14M Series A — to open the next\neighteen.", {
    x: 0.9, y: 1.3, w: 18, h: 3.2,
    fontFace: F.serif, fontSize: 62, italic: true, color: C.creamAlt,
    align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 1.05,
  });

  // Three-column allocation
  const colY = 7.5;
  const colW = (W - 2.0) / 3;
  const allocs = [
    { num: "$9.8M", label: "New unit build-outs" },
    { num: "$2.6M", label: "Central commissary + masa ops" },
    { num: "$1.6M", label: "Brand, hiring, working capital" },
  ];
  allocs.forEach((a, i) => {
    const x = 1.0 + i * colW;
    s.addShape(pres.shapes.LINE, {
      x, y: colY, w: colW - 0.6, h: 0, line: { color: C.gold, width: 1 },
    });
    s.addText(a.num, {
      x, y: colY + 0.25, w: colW - 0.3, h: 1.6,
      fontFace: F.serif, fontSize: 76, italic: true, color: C.gold,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(a.label, {
      x, y: colY + 1.95, w: colW - 0.3, h: 0.6,
      fontFace: F.sans, fontSize: 15, color: C.creamAlt,
      align: "left", valign: "top", margin: 0,
    });
  });

  addFooter(s, 16, C.creamAlt);
}

// ---------------------------------------------------------------------------
// SLIDE 17 — FIN / Gracias
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  // ·FIN· kicker
  s.addText("·  FIN  ·", {
    x: 0.9, y: 0.8, w: 6, h: 0.6,
    fontFace: F.mono, fontSize: 21, color: C.terracotta, charSpacing: 5,
    align: "left", valign: "middle", margin: 0,
  });

  // Gold circle (stylized tortilla) upper right — outer scalloped ring + inner disc
  // Slightly larger outer oval gives the "edge" look
  s.addShape(pres.shapes.OVAL, {
    x: 16.5, y: 1.0, w: 2.5, h: 2.5,
    fill: { color: C.gold }, line: { color: "D89E04", width: 1.5 },
  });
  // Inner disc to suggest a rim
  s.addShape(pres.shapes.OVAL, {
    x: 16.75, y: 1.25, w: 2.0, h: 2.0,
    fill: { color: C.gold }, line: { color: "D89E04", width: 1 },
  });
  // Small dots inside to suggest tortilla texture
  s.addShape(pres.shapes.OVAL, {
    x: 17.4, y: 1.95, w: 0.12, h: 0.12, fill: { color: C.brown }, line: { color: C.brown },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 17.9, y: 2.15, w: 0.1,  h: 0.1,  fill: { color: C.brown }, line: { color: C.brown },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 17.6, y: 2.45, w: 0.11, h: 0.11, fill: { color: C.brown }, line: { color: C.brown },
  });

  // Giant italic "Gracias." to match original
  s.addText("Gracias.", {
    x: 0.7, y: 5.6, w: 14, h: 3.2,
    fontFace: "Georgia", fontSize: 200, italic: true, bold: false, color: C.ink,
    align: "left", valign: "top", margin: 0,
  });

  // Contact block bottom-right
  s.addText([
    { text: "HECTOR RAMIREZ  —  FOUNDER", options: { breakLine: true } },
    { text: "HECTOR@MUYBONITA.CO",        options: { breakLine: true } },
    { text: "512  ·  555  ·  0184" },
  ], {
    x: 11.5, y: 8.2, w: 7.8, h: 2.2,
    fontFace: F.mono, fontSize: 18, color: C.muted, charSpacing: 3,
    align: "right", valign: "top", margin: 0,
    lineSpacingMultiple: 1.6,
  });
}

// ---------------------------------------------------------------------------
// Write file
// ---------------------------------------------------------------------------
pres.writeFile({ fileName: "Muy_Bonita_Tacos.pptx" })
  .then((fileName) => console.log(`Saved: ${fileName}`));
