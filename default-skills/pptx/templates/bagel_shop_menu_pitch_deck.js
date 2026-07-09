// Bagels & Schmear Co. — Spring 2026 Menu
// Replica of Bagels.pptx built with pptxgenjs
//
// Usage: node bagels.js
// Output: Bagels.pptx in the current working directory

const pptxgen = require("pptxgenjs");

// ---------- Design tokens ----------
const CREAM      = "F2EAD8"; // main light background
const DARK       = "1B1410"; // near-black, text + dark slides
const BROWN      = "3A2C22"; // body text on cream
const RED        = "C23A2A"; // italic accent / dot / callouts
const GOLD       = "C8871F"; // caramel accent on dark slides
const AMBER      = "E8C582"; // warm yellow circle
const OCHRE      = "9A6512"; // small labels / dark-amber
const TAN        = "E2D6B8"; // placeholder image blocks on cream
const TAN_DARK   = "D9C99A"; // slightly deeper tan
const CORAL_BG   = "FBE8E2"; // very light coral tint (unused footer backups)
const TOMATO     = "C23A2A";

// Slide layout (13.33 x 7.5 inches — LAYOUT_WIDE)
const W = 13.33;
const H = 7.5;

const FONT_HEAD = "Arial";
const FONT_BODY = "Arial";

// ---------- Build presentation ----------
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Bagels & Schmear Co.";
pres.title  = "Bagels & Schmear Co. — Spring 2026 Menu";

// ---------- Helpers ----------
// Top header bar that appears on every slide.
// `onDark` flips the text color for the dark slides (3 and 10).
function addHeader(slide, sectionLabel, pageLabel, onDark = false) {
  const textColor = onDark ? CREAM : DARK;
  // little red dot
  slide.addShape(pres.shapes.OVAL, {
    x: 0.55, y: 0.46, w: 0.1, h: 0.1,
    fill: { color: RED }, line: { type: "none" },
  });
  // section label (left)
  slide.addText(sectionLabel, {
    x: 0.75, y: 0.35, w: 5, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 10, bold: false,
    color: textColor, charSpacing: 4, margin: 0,
  });
  // page number (right)
  slide.addText(pageLabel, {
    x: W - 2.2, y: 0.35, w: 1.7, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 10,
    color: textColor, charSpacing: 4,
    align: "right", margin: 0,
  });
}

// A grey/tan "placeholder image" block with caption text
function addPlaceholder(slide, x, y, w, h, caption, fill = TAN) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: fill }, line: { type: "none" },
  });
  slide.addText(caption, {
    x, y, w, h,
    fontFace: FONT_BODY, fontSize: 12, color: BROWN,
    align: "center", valign: "middle",
  });
}

// Thin horizontal rule
function addRule(slide, x, y, w, color = DARK, weight = 1) {
  slide.addShape(pres.shapes.LINE, {
    x, y, w, h: 0,
    line: { color, width: weight },
  });
}

// ===================================================================
// SLIDE 1 — Cover
// ===================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: CREAM };
  addHeader(slide, "EST. 2026  ·  LOWER EAST SIDE", "NO. 01 / 10");

  // Big amber circle on right, partially off-slide
  slide.addShape(pres.shapes.OVAL, {
    x: 9.0, y: 3.2, w: 5.8, h: 5.8,
    fill: { color: AMBER }, line: { type: "none" },
  });

  // Small eyebrow
  slide.addText("A NEIGHBORHOOD MENU  ·  SPRING 2026", {
    x: 0.75, y: 1.4, w: 8, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 12, color: DARK,
    charSpacing: 4, margin: 0,
  });

  // Mega title — split across two lines as separate text boxes
  // Line 1: "Bagels &"
  slide.addText([
    { text: "Bagels ", options: { color: DARK } },
    { text: "&",       options: { color: RED, italic: true } },
  ], {
    x: 0.7, y: 1.85, w: 12, h: 1.9,
    fontFace: FONT_HEAD, fontSize: 110, bold: false,
    color: DARK, margin: 0, valign: "top",
  });
  // Line 2: "Schmear Co."
  slide.addText([
    { text: "Schmear", options: { color: RED, italic: true } },
    { text: " Co.",    options: { color: DARK } },
  ], {
    x: 0.7, y: 3.55, w: 12, h: 1.9,
    fontFace: FONT_HEAD, fontSize: 110, bold: false,
    color: DARK, margin: 0, valign: "top",
  });

  // Short rule + tagline (left)
  slide.addShape(pres.shapes.LINE, {
    x: 0.75, y: 6.2, w: 1.0, h: 0,
    line: { color: DARK, width: 1 },
  });
  slide.addText("Hand-rolled, kettle-boiled, wood-floor oven. For the block.", {
    x: 0.75, y: 6.35, w: 4.6, h: 0.9,
    fontFace: FONT_BODY, fontSize: 16, italic: true,
    color: DARK, margin: 0,
  });

  // Right-side meta (three lines, right-aligned)
  slide.addText(
    "137 ESSEX ST  OPEN 6 AM\nDAILY  CASH OR CARD  ·  NO\nAPPS",
    {
      x: 6.5, y: 6.55, w: 5.6, h: 0.9,
      fontFace: FONT_HEAD, fontSize: 10, color: DARK,
      charSpacing: 4, align: "right", valign: "top", margin: 0,
    }
  );
}

// ===================================================================
// SLIDE 2 — About
// ===================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: CREAM };
  addHeader(slide, "ABOUT", "02 / 10");

  // Small eyebrow
  slide.addText("WHO WE ARE", {
    x: 0.75, y: 0.65, w: 5, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 10, color: DARK,
    charSpacing: 4, margin: 0,
  });

  // Headline (left column)
  slide.addText([
    { text: "A bakery run by ",         options: { color: DARK } },
    { text: "neighbors", options: { color: RED,  italic: true } },
    { text: " , for neighbors.",        options: { color: DARK } },
  ], {
    x: 0.75, y: 1.0, w: 6.5, h: 2.8,
    fontFace: FONT_HEAD, fontSize: 56, bold: false,
    color: DARK, margin: 0, valign: "top",
  });

  // Right column: three image placeholders (one large on top, two below)
  addPlaceholder(slide, 7.6, 0.8, 5.1, 3.5, "[ interior  ·  bakers at 5 AM ]");
  addPlaceholder(slide, 7.6, 4.45, 2.5, 2.0, "[ storefront  ·  essex st ]");
  addPlaceholder(slide, 10.2, 4.45, 2.5, 2.0, "[ hands + dough ]");

  // Four info blocks across bottom-left
  const info = [
    { label: "THE BAKER",  text: "Mira Okonkwo trained at a Montreal bagel house for six years before moving home to the LES in 2023." },
    { label: "THE SHOP",   text: "A 900-sq-ft storefront between Rivington and Delancey. Twelve stools, one oven, one dog bowl." },
    { label: "THE FLOUR",  text: "Milled upstate by Farmer Ground. Water from the tap — it's why the bagels taste like New York." },
    { label: "THE HOURS",  text: "We open at 6 AM. We close when the bagels run out. Usually 2, sometimes noon." },
  ];
  const colW = 3.1;
  const startX = 0.75;
  const colGap = 0.3;
  const rowY1 = 4.55;
  const rowY2 = 5.85;

  info.forEach((block, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = startX + col * (colW + colGap);
    const y = row === 0 ? rowY1 : rowY2;
    slide.addText(block.label, {
      x, y, w: colW, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 9, color: OCHRE,
      charSpacing: 3, bold: false, margin: 0,
    });
    slide.addText(block.text, {
      x, y: y + 0.3, w: colW, h: 1.0,
      fontFace: FONT_BODY, fontSize: 12, color: DARK,
      margin: 0,
    });
  });

  // Tiny footer left
  slide.addText("BAGELS & SCHMEAR CO.", {
    x: 0.75, y: 7.1, w: 4, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 8, color: BROWN,
    charSpacing: 3, margin: 0,
  });
  // Tiny footer right
  slide.addText("EST. 2026  ·  MANHATTAN NY", {
    x: W - 4.2, y: 7.1, w: 3.5, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 9, color: BROWN,
    charSpacing: 3, align: "right", margin: 0,
  });
}

// ===================================================================
// SLIDE 3 — Method (dark)
// ===================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: DARK };
  addHeader(slide, "THE BAGEL", "03 / 10", true);

  // Amber circle on right
  slide.addShape(pres.shapes.OVAL, {
    x: 8.8, y: 1.2, w: 4.5, h: 4.5,
    fill: { color: AMBER }, line: { type: "none" },
  });

  // Eyebrow
  slide.addText("METHOD", {
    x: 0.75, y: 1.35, w: 5, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 10, color: CREAM,
    charSpacing: 4, margin: 0,
  });

  // Headline
  slide.addText([
    { text: "One dough. ",   options: { color: CREAM } },
    { text: "36 hours.",     options: { color: GOLD, italic: true } },
    { text: " No shortcuts.",options: { color: CREAM } },
  ], {
    x: 0.75, y: 1.7, w: 8.2, h: 3.5,
    fontFace: FONT_HEAD, fontSize: 60, bold: false,
    color: CREAM, margin: 0, valign: "top",
  });

  // Four numbered steps across the bottom
  const steps = [
    { n: "01", label: "MIX",        text: "High-gluten flour, barley malt, sea salt, fresh yeast, NYC tap water." },
    { n: "02", label: "COLD PROOF", text: "Shaped by hand, rested overnight in the walk-in. Flavor comes from patience." },
    { n: "03", label: "KETTLE",     text: "Boiled in malt-and-honey water for 60 seconds a side. Chew starts here." },
    { n: "04", label: "BAKE",       text: "On burlap boards, flipped to the stone. Dark crust, tender crumb." },
  ];
  const stepW = 2.85;
  const stepGap = 0.25;
  const stepX0 = 0.75;
  const stepY = 5.6;

  steps.forEach((s, i) => {
    const x = stepX0 + i * (stepW + stepGap);
    slide.addText(s.n, {
      x, y: stepY, w: stepW, h: 0.7,
      fontFace: FONT_HEAD, fontSize: 36, color: GOLD, margin: 0,
    });
    slide.addText(s.label, {
      x, y: stepY + 0.75, w: stepW, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 10, color: CREAM,
      charSpacing: 4, margin: 0,
    });
    slide.addText(s.text, {
      x, y: stepY + 1.1, w: stepW, h: 0.8,
      fontFace: FONT_BODY, fontSize: 11, color: TAN_DARK, margin: 0,
    });
  });
}

// ===================================================================
// SLIDE 4 — The Board (menu)
// ===================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: CREAM };
  addHeader(slide, "THE BOARD", "04 / 10");

  // Eyebrow
  slide.addText("DAILY FLAVORS", {
    x: 0.75, y: 1.0, w: 5, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, color: DARK,
    charSpacing: 4, margin: 0,
  });

  // Headline
  slide.addText("Ten on the board, baked through the day.", {
    x: 0.75, y: 1.35, w: 12, h: 1.7,
    fontFace: FONT_HEAD, fontSize: 52, bold: false, color: DARK,
    margin: 0, valign: "top",
  });

  // Two columns of items
  const bagels = [
    { name: "Plain",                sub: "the control, the classic",                          price: "$2.50", italic: null },
    { name: "Sesame",               sub: "toasted, nutty, heavy-seeded",                       price: "$2.75", italic: null },
    { name: "Poppy",                sub: "black seeds, slightly sweet",                        price: "$2.75", italic: null },
    { name: "Everything",           sub: "poppy, sesame, garlic, onion, pretzel salt, caraway",price: "$3.00", italic: "(house blend)" },
    { name: "Salt",                 sub: "flaky, unapologetic",                                price: "$2.75", italic: null },
    { name: "Onion",                sub: "caramelized edges, deep sweet",                      price: "$2.75", italic: null },
    { name: "Pumpernickel",         sub: "rye, molasses, cocoa",                               price: "$2.75", italic: null },
    { name: "Cinnamon Raisin",      sub: "baked dark, sugar-crackled top",                     price: "$3.00", italic: null },
    { name: "Sourdough Plain",      sub: "five-year starter, tangy, chewier",                  price: "$3.25", italic: null },
    { name: "Baker's Choice",       sub: "asiago · jalapeño cheddar · za'atar · black sesame", price: "$3.50", italic: "(rotating)" },
  ];

  const leftX  = 0.75;
  const rightX = 6.85;
  const colW   = 5.7;
  const rowStart = 3.45;
  const rowH = 0.68;

  // Top rules
  addRule(slide, leftX,  rowStart - 0.1, colW);
  addRule(slide, rightX, rowStart - 0.1, colW);

  for (let i = 0; i < 10; i++) {
    const item = bagels[i];
    const col = i < 5 ? 0 : 1;
    const idx = i % 5;
    const x = col === 0 ? leftX : rightX;
    const y = rowStart + idx * rowH;

    // Name (with optional red italic qualifier)
    const runs = [{ text: item.name, options: { color: DARK, fontSize: 20 } }];
    if (item.italic) {
      runs.push({ text: " " + item.italic, options: { color: RED, italic: true, fontSize: 14 } });
    }
    slide.addText(runs, {
      x, y, w: colW - 1.0, h: 0.4,
      fontFace: FONT_HEAD, margin: 0, valign: "top",
    });
    // Sub-description
    slide.addText(item.sub, {
      x, y: y + 0.35, w: colW - 1.0, h: 0.35,
      fontFace: FONT_BODY, fontSize: 10, color: BROWN, margin: 0,
    });
    // Price (right aligned inside column)
    slide.addText(item.price, {
      x: x + colW - 1.0, y, w: 1.0, h: 0.4,
      fontFace: FONT_HEAD, fontSize: 13, bold: true,
      color: DARK, align: "right", margin: 0, valign: "top",
    });
    // Bottom rule below each item
    addRule(slide, x, y + rowH - 0.05, colW, DARK, 0.75);
  }

  // Footer
  slide.addText("SIX FOR $13  ·  DOZEN FOR $24  ·  HALF-DOZEN MIX & MATCH", {
    x: 0.75, y: 7.1, w: 8, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10, color: DARK,
    charSpacing: 4, margin: 0,
  });
  slide.addText("BAKED 6 AM  ·  10 AM  ·  1 PM", {
    x: W - 4.2, y: 7.1, w: 3.5, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10, color: DARK,
    charSpacing: 4, align: "right", margin: 0,
  });
}

// ===================================================================
// SLIDE 5 — Spreads
// ===================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: CREAM };
  addHeader(slide, "SPREADS", "05 / 10");

  // Eyebrow
  slide.addText("THE SCHMEAR COUNTER", {
    x: 0.75, y: 1.0, w: 6, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, color: DARK,
    charSpacing: 4, margin: 0,
  });

  // Headline — "Twelve spreads. Whipped daily." (italic red on "Whipped daily.")
  slide.addText([
    { text: "Twelve spreads. ",  options: { color: DARK } },
    { text: "Whipped daily.",    options: { color: RED, italic: true } },
  ], {
    x: 0.75, y: 1.4, w: 8.5, h: 1.8,
    fontFace: FONT_HEAD, fontSize: 48, bold: false, color: DARK,
    margin: 0, valign: "top",
  });

  // Intro blurb
  slide.addText(
    "A scoop is $3. Quarter-pound tub $7, half-pound $12. Ask for a taste — we'll hand you a spoon.",
    {
      x: 0.75, y: 3.35, w: 8.0, h: 0.7,
      fontFace: FONT_BODY, fontSize: 13, color: DARK, margin: 0,
    }
  );

  // Two columns of 6 spreads each
  const spreads = [
    { name: "Plain Cream Cheese",    sub: "whole milk, slow-cultured" },
    { name: "Scallion",              sub: "chopped fresh each morning" },
    { name: "Veggie",                sub: "carrot, celery, radish, dill" },
    { name: "Lox Spread",            sub: "house-cured, folded in" },
    { name: "Whitefish Salad",       sub: "smoked, lemon, mayo" },
    { name: "Garden Herb",           sub: "chive, parsley, tarragon" },
    { name: "Honey Walnut",          sub: "clover honey, toasted nuts" },
    { name: "Cinnamon Brown Sugar",  sub: "for the raisin bagel crowd" },
    { name: "Jalapeño Cheddar",      sub: "sharp, smoky, a little heat",          italic: null },
    { name: "Tofu Scallion",         sub: "silken, lemon, white miso",            italic: "(vegan)" },
    { name: "Labneh & Za'atar",      sub: "Sahadi's blend, olive oil" },
    { name: "Salted Butter",         sub: "Vermont creamery — for purists" },
  ];

  const sxL = 0.75, sxR = 4.0, sColW = 3.2;
  const sYStart = 4.1;
  const sRowH = 0.52;

  // Order: column 1 = indices 0,2,4,6,8,10 ; column 2 = 1,3,5,7,9,11 (matches visual left/right interleave)
  const leftCol  = [0, 2, 4, 6, 8, 10];
  const rightCol = [1, 3, 5, 7, 9, 11];

  leftCol.forEach((srcIdx, i) => {
    const s = spreads[srcIdx];
    const y = sYStart + i * sRowH;
    const runs = [{ text: s.name, options: { color: DARK, fontSize: 17 } }];
    if (s.italic) runs.push({ text: " " + s.italic, options: { color: RED, italic: true, fontSize: 12 } });
    slide.addText(runs, { x: sxL, y, w: sColW, h: 0.33, fontFace: FONT_HEAD, margin: 0, valign: "top" });
    slide.addText(s.sub, { x: sxL, y: y + 0.28, w: sColW, h: 0.28,
      fontFace: FONT_BODY, fontSize: 9, color: BROWN, margin: 0 });
  });
  rightCol.forEach((srcIdx, i) => {
    const s = spreads[srcIdx];
    const y = sYStart + i * sRowH;
    const runs = [{ text: s.name, options: { color: DARK, fontSize: 17 } }];
    if (s.italic) runs.push({ text: " " + s.italic, options: { color: RED, italic: true, fontSize: 12 } });
    slide.addText(runs, { x: sxR, y, w: sColW, h: 0.33, fontFace: FONT_HEAD, margin: 0, valign: "top" });
    slide.addText(s.sub, { x: sxR, y: y + 0.28, w: sColW, h: 0.28,
      fontFace: FONT_BODY, fontSize: 9, color: BROWN, margin: 0 });
  });

  // Right-side: two image placeholders stacked
  addPlaceholder(slide, 9.0, 1.0, 3.85, 3.0, "[ 12 tubs, glass case ]");
  addPlaceholder(slide, 9.0, 4.3, 3.85, 3.0, "[ cream cheese spread, top-down ]");
}

// ===================================================================
// SLIDE 6 — Sandwiches
// ===================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: CREAM };
  addHeader(slide, "SANDWICHES", "06 / 10");

  // Eyebrow
  slide.addText("SIGNATURE SANDWICHES", {
    x: 0.75, y: 1.0, w: 6, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, color: DARK,
    charSpacing: 4, margin: 0,
  });

  // Headline
  slide.addText([
    { text: "Six builds. ", options: { color: DARK } },
    { text: "Named for the block.", options: { color: RED, italic: true } },
  ], {
    x: 0.75, y: 1.4, w: 12, h: 1.4,
    fontFace: FONT_HEAD, fontSize: 48, bold: false, color: DARK,
    margin: 0, valign: "top",
  });

  // 3 × 2 grid of sandwich cards
  const sandwiches = [
    { name: "The Essex",    price: "$11",   type: "EVERYTHING BAGEL",       caption: "[ the essex · overhead ]",        text: "House-cured lox, scallion schmear, capers, red onion, tomato, cracked pepper." },
    { name: "The Delancey", price: "$9",    type: "SALT BAGEL",             caption: "[ the delancey · stack ]",        text: "Pastrami from Katz's up the street, spicy mustard, pickles, melted Swiss." },
    { name: "The Rivington",price: "$7.50", type: "PLAIN OR SESAME",        caption: "[ the rivington · egg + cheese ]",text: "Two fried eggs, sharp cheddar, crispy shallot, a stripe of hot honey." },
    { name: "The Seward",   price: "$8.50", type: "EVERYTHING  ·  VEG",     caption: "[ the seward · veg ]",            text: "Tofu scallion spread, cucumber, radish, avocado, sprouts, lemon olive oil." },
    { name: "The Grand",    price: "$10",   type: "PUMPERNICKEL  ·  PRESSED",caption:"[ the grand · tuna melt ]",        text: "Tuna salad with celery & dill, tomato, American cheese, griddled till it sings." },
    { name: "The Hester",   price: "$6.50", type: "CINNAMON RAISIN",        caption: "[ the hester · sweet ]",          text: "Honey-walnut schmear, sliced banana, sea salt, a drizzle of tahini." },
  ];

  const cardW = 3.95, cardGap = 0.15;
  const cardX0 = 0.75;
  const rowY = [3.0, 5.1];
  const imgH = 1.1;

  sandwiches.forEach((s, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = cardX0 + col * (cardW + cardGap);
    const y = rowY[row];

    // image placeholder at top of card
    addPlaceholder(slide, x, y, cardW, imgH, s.caption);

    // Name + price line
    slide.addText(s.name, {
      x, y: y + imgH + 0.1, w: cardW - 1.0, h: 0.4,
      fontFace: FONT_HEAD, fontSize: 20, color: DARK, margin: 0, valign: "top",
    });
    slide.addText(s.price, {
      x: x + cardW - 1.0, y: y + imgH + 0.13, w: 1.0, h: 0.4,
      fontFace: FONT_HEAD, fontSize: 13, bold: true,
      color: DARK, align: "right", margin: 0, valign: "top",
    });
    // Bagel type label
    slide.addText(s.type, {
      x, y: y + imgH + 0.5, w: cardW, h: 0.22,
      fontFace: FONT_HEAD, fontSize: 9, color: OCHRE,
      charSpacing: 3, margin: 0,
    });
    // Description
    slide.addText(s.text, {
      x, y: y + imgH + 0.72, w: cardW, h: 0.55,
      fontFace: FONT_BODY, fontSize: 10, color: DARK, margin: 0,
    });
  });
}

// ===================================================================
// SLIDE 7 — Fish / The Lox Program
// ===================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: CREAM };
  addHeader(slide, "FISH", "07 / 10");

  // Left big image placeholder (fills left half)
  addPlaceholder(slide, 0.75, 1.0, 5.3, 6.0, "[ sliced lox · overhead · against parchment ]");

  // Right: eyebrow
  slide.addText("THE LOX PROGRAM", {
    x: 6.35, y: 1.0, w: 6, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, color: DARK,
    charSpacing: 4, margin: 0,
  });

  // Headline
  slide.addText([
    { text: "Cured in-house.",  options: { color: DARK, breakLine: true } },
    { text: "Sliced to order.", options: { color: RED, italic: true } },
  ], {
    x: 6.35, y: 1.4, w: 6.5, h: 2.3,
    fontFace: FONT_HEAD, fontSize: 44, bold: false, color: DARK,
    margin: 0, valign: "top",
  });

  // Paragraph
  slide.addText(
    "We get whole North Atlantic salmon three times a week from a family boat in New Bedford. Everything is cut by hand on the marble slab behind the counter.",
    {
      x: 6.35, y: 3.85, w: 6.3, h: 1.0,
      fontFace: FONT_BODY, fontSize: 14, color: DARK, margin: 0,
    }
  );

  // Fish list (5 rows)
  const fish = [
    { name: "Classic Nova",     sub: "cold-smoked, 14-day cure",               price: "$14 / qtr lb" },
    { name: "Gravlax",          sub: "salt, sugar, dill, aquavit",             price: "$15 / qtr lb" },
    { name: "Pastrami Lox",     sub: "coriander, black pepper, mustard seed",  price: "$16 / qtr lb" },
    { name: "Smoked Whitefish", sub: "whole, pulled off the bone",             price: "$18 / lb"     },
    { name: "Pickled Herring",  sub: "cream or wine sauce",                    price: "$9 / jar"     },
  ];

  const fX = 6.35, fW = 6.3, fY0 = 5.05, fRowH = 0.55;
  fish.forEach((item, i) => {
    const y = fY0 + i * fRowH;
    slide.addText(item.name, {
      x: fX, y, w: fW - 1.8, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 16, color: DARK, margin: 0, valign: "top",
    });
    slide.addText(item.sub, {
      x: fX, y: y + 0.25, w: fW - 1.8, h: 0.22,
      fontFace: FONT_BODY, fontSize: 9, color: BROWN, margin: 0,
    });
    slide.addText(item.price, {
      x: fX + fW - 1.8, y, w: 1.8, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 12, bold: true,
      color: DARK, align: "right", margin: 0, valign: "top",
    });
    // thin rule under each row
    addRule(slide, fX, y + fRowH - 0.05, fW, BROWN, 0.5);
  });
}

// ===================================================================
// SLIDE 8 — Catering
// ===================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: CREAM };
  addHeader(slide, "CATERING", "08 / 10");

  // Eyebrow
  slide.addText("CATERING & BOXES", {
    x: 0.75, y: 1.15, w: 6, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, color: DARK,
    charSpacing: 4, margin: 0,
  });

  // Headline
  slide.addText([
    { text: "For offices, shivas, brunches, and ", options: { color: DARK } },
    { text: "Sundays.",                            options: { color: RED, italic: true } },
  ], {
    x: 0.75, y: 1.55, w: 12, h: 2.3,
    fontFace: FONT_HEAD, fontSize: 54, bold: false, color: DARK,
    margin: 0, valign: "top",
  });

  // Three boxes
  const boxes = [
    {
      serves: "FEEDS 6–8",
      name:   "Morning Box",
      text:   "Baker's dozen bagels, three tubs of schmear, fruit, butter, napkins, knives. Ready in 24 hours.",
      price:  "$64",
      fill:   CREAM,       // light
      nameColor: DARK,
      textColor: DARK,
      labelColor: OCHRE,
      border: true,
    },
    {
      serves: "FEEDS 10–12  ·  MOST POPULAR",
      name:   "Appetizing Spread",
      text:   "18 bagels, half-pound nova, whitefish salad, cream cheese, pickled onion, tomato, capers, cukes.",
      price:  "$165",
      fill:   RED,         // red featured
      nameColor: CREAM,
      textColor: CREAM,
      labelColor: "F2D4CA",
      border: false,
    },
    {
      serves: "FEEDS 4",
      name:   "Office BEC Run",
      text:   "Four BECs hot in foil, four coffees in a box, a bag of rugelach. Delivered before 9 AM.",
      price:  "$42",
      fill:   CREAM,
      nameColor: DARK,
      textColor: DARK,
      labelColor: OCHRE,
      border: true,
    },
  ];

  const bW = 3.95, bGap = 0.15, bX0 = 0.75, bY = 4.3, bH = 2.5;

  boxes.forEach((b, i) => {
    const x = bX0 + i * (bW + bGap);
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: bY, w: bW, h: bH,
      fill: { color: b.fill },
      line: b.border ? { color: DARK, width: 1 } : { color: b.fill, width: 0 },
    });

    // Label
    slide.addText(b.serves, {
      x: x + 0.3, y: bY + 0.25, w: bW - 0.4, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 10, color: b.labelColor,
      charSpacing: 3, margin: 0,
    });
    // Name
    slide.addText(b.name, {
      x: x + 0.3, y: bY + 0.55, w: bW - 0.4, h: 0.55,
      fontFace: FONT_HEAD, fontSize: 24, color: b.nameColor,
      margin: 0, valign: "top",
    });
    // Body
    slide.addText(b.text, {
      x: x + 0.3, y: bY + 1.2, w: bW - 0.5, h: 0.85,
      fontFace: FONT_BODY, fontSize: 11, color: b.textColor, margin: 0,
    });
    // Price chip (small white rectangle)
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.3, y: bY + bH - 0.6, w: 0.8, h: 0.4,
      fill: { color: CREAM }, line: { color: DARK, width: 1 },
    });
    slide.addText(b.price, {
      x: x + 0.3, y: bY + bH - 0.6, w: 0.8, h: 0.4,
      fontFace: FONT_HEAD, fontSize: 13, bold: true,
      color: DARK, align: "center", valign: "middle", margin: 0,
    });
  });

  // Footer info
  slide.addText("ORDER 24 HOURS AHEAD  ·  CATERING@BAGELSANDSCHMEAR.CO  ·  212 555 0182", {
    x: 0.75, y: 7.1, w: 9, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10, color: DARK,
    charSpacing: 3, margin: 0,
  });
  slide.addText("FREE DELIVERY BELOW HOUSTON", {
    x: W - 4.5, y: 7.1, w: 3.8, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10, color: DARK,
    charSpacing: 3, align: "right", margin: 0,
  });
}

// ===================================================================
// SLIDE 9 — Community
// ===================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: CREAM };
  addHeader(slide, "COMMUNITY", "09 / 10");

  // Eyebrow
  slide.addText("COMMUNITY BOARD", {
    x: 0.75, y: 0.75, w: 6, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, color: DARK,
    charSpacing: 4, margin: 0,
  });

  // Headline
  slide.addText([
    { text: "We bake for the block, ", options: { color: DARK } },
    { text: "not the feed.",           options: { color: RED, italic: true } },
  ], {
    x: 0.75, y: 1.1, w: 7.5, h: 3.2,
    fontFace: FONT_HEAD, fontSize: 54, bold: false, color: DARK,
    margin: 0, valign: "top",
  });

  // Notes list (left)
  const notes = [
    { tag: "MON",    text: "$1 off for service workers in uniform — teachers, nurses, MTA, fire, postal." },
    { tag: "WED",    text: "Free bagel for any kid walking to PS 110, PS 134, or PS 140 with a backpack." },
    { tag: "FRI",    text: "Challah for Shabbat — pre-order by Thursday, pick up after 3 PM." },
    { tag: "DAILY",  text: "End-of-day bagels go to the Bowery Mission in the basket by the door. Help yourself if you need one." },
    { tag: "ALWAYS", text: "Tap water in a real glass. Bathroom is for everyone. Wi-Fi password on the chalkboard." },
  ];

  const nX = 0.75, nY0 = 4.5, nRowH = 0.58;
  const tagW = 0.9;

  notes.forEach((n, i) => {
    const y = nY0 + i * nRowH;
    slide.addText(n.tag, {
      x: nX, y, w: tagW, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 11, bold: true, color: OCHRE,
      charSpacing: 2, margin: 0,
    });
    slide.addText(n.text, {
      x: nX + tagW + 0.2, y, w: 6.2, h: 0.75,
      fontFace: FONT_BODY, fontSize: 12, color: DARK, margin: 0,
    });
  });

  // Right-side two stacked placeholders
  addPlaceholder(slide, 8.4, 0.9, 4.45, 3.0, "[ kids at window, morning ]");
  addPlaceholder(slide, 8.4, 4.1, 4.45, 3.0, "[ chalkboard  ·  community notes ]");
}

// ===================================================================
// SLIDE 10 — Visit (dark)
// ===================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: DARK };
  addHeader(slide, "VISIT", "10 / 10", true);

  // Eyebrow
  slide.addText("FIND US ON ESSEX", {
    x: 0.75, y: 1.35, w: 6, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, color: CREAM,
    charSpacing: 4, margin: 0,
  });

  // Headline: 137 Essex St. (Essex St. in gold italic)
  slide.addText([
    { text: "137 ",      options: { color: CREAM } },
    { text: "Essex St.", options: { color: GOLD, italic: true } },
  ], {
    x: 0.75, y: 1.75, w: 7.5, h: 3.0,
    fontFace: FONT_HEAD, fontSize: 72, bold: false,
    color: CREAM, margin: 0, valign: "top",
  });

  // Short rule
  slide.addShape(pres.shapes.LINE, {
    x: 0.75, y: 4.75, w: 1.0, h: 0,
    line: { color: CREAM, width: 1 },
  });

  // 2x2 info grid
  const info = [
    { label: "HOURS",   text: "Mon–Fri · 6 AM – 3 PM Sat–Sun · 7 AM – 4 PM" },
    { label: "SUBWAY",  text: "F / J / M / Z Essex–Delancey" },
    { label: "PHONE",   text: "(212) 555 – 0182" },
    { label: "ONLINE",  text: "bagelsandschmear.co\n@bagelsandschmearco", italicSecond: true },
  ];
  const iX0 = 0.75, iY0 = 5.0, iColW = 2.95, iColGap = 0.3, iRowH = 1.15;
  info.forEach((blk, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = iX0 + col * (iColW + iColGap);
    const y = iY0 + row * iRowH;
    slide.addText(blk.label, {
      x, y, w: iColW, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 10, color: OCHRE,
      charSpacing: 3, margin: 0,
    });
    if (blk.italicSecond) {
      const parts = blk.text.split("\n");
      slide.addText([
        { text: parts[0], options: { color: CREAM, breakLine: true } },
        { text: parts[1], options: { color: CREAM, italic: true } },
      ], {
        x, y: y + 0.3, w: iColW, h: 0.75,
        fontFace: FONT_BODY, fontSize: 14, margin: 0,
      });
    } else {
      slide.addText(blk.text, {
        x, y: y + 0.3, w: iColW, h: 0.75,
        fontFace: FONT_BODY, fontSize: 14, color: CREAM, margin: 0,
      });
    }
  });

  // Right side: stylized map card
  const mapX = 7.6, mapY = 1.1, mapW = 5.2, mapH = 5.6;
  // slightly lighter dark for the map area
  slide.addShape(pres.shapes.RECTANGLE, {
    x: mapX, y: mapY, w: mapW, h: mapH,
    fill: { color: "2A201A" }, line: { type: "none" },
  });
  // "Streets" — a few diagonal lines
  slide.addShape(pres.shapes.LINE, {
    x: mapX + 0.3, y: mapY + 1.6, w: mapW - 0.6, h: 0.1,
    line: { color: TAN_DARK, width: 1 },
  });
  slide.addShape(pres.shapes.LINE, {
    x: mapX + 0.3, y: mapY + 2.95, w: mapW - 0.6, h: 0.15,
    line: { color: TAN_DARK, width: 1 },
  });
  slide.addShape(pres.shapes.LINE, {
    x: mapX + 0.3, y: mapY + 4.35, w: mapW - 0.6, h: 0.2,
    line: { color: TAN_DARK, width: 1 },
  });
  // vertical-ish lines
  slide.addShape(pres.shapes.LINE, {
    x: mapX + 1.7, y: mapY + 0.3, w: 0.25, h: mapH - 0.6,
    line: { color: TAN_DARK, width: 1 },
  });
  slide.addShape(pres.shapes.LINE, {
    x: mapX + 3.6, y: mapY + 0.3, w: 0.25, h: mapH - 0.6,
    line: { color: TAN_DARK, width: 1 },
  });

  // Street labels
  slide.addText("RIVINGTON ST", {
    x: mapX + 0.5, y: mapY + 1.05, w: 2.5, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, color: TAN_DARK,
    charSpacing: 3, margin: 0,
  });
  slide.addText("ESSEX ST  ↕", {
    x: mapX + 0.5, y: mapY + 2.45, w: 2.5, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, color: TAN_DARK,
    charSpacing: 3, margin: 0,
  });
  slide.addText("DELANCEY ST", {
    x: mapX + 0.5, y: mapY + 3.9, w: 2.5, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, color: TAN_DARK,
    charSpacing: 3, margin: 0,
  });

  // Red pin + "You are here"
  slide.addShape(pres.shapes.OVAL, {
    x: mapX + 2.75, y: mapY + 2.75, w: 0.22, h: 0.22,
    fill: { color: RED }, line: { type: "none" },
  });
  slide.addText("137 ESSEX  ·  YOU ARE HERE", {
    x: mapX + 1.6, y: mapY + 3.05, w: 3.3, h: 0.3,
    fontFace: FONT_HEAD, fontSize: 10, color: CREAM,
    charSpacing: 3, margin: 0,
  });

  // Small caption bottom-left of map
  slide.addText("Lower East Side  ·  scale approx.", {
    x: mapX + 0.3, y: mapY + mapH - 0.5, w: 3.5, h: 0.3,
    fontFace: FONT_BODY, fontSize: 9, color: TAN_DARK, margin: 0,
  });
}

// ---------- Write file ----------
pres.writeFile({ fileName: "Bagels.pptx" })
  .then((name) => console.log("Wrote:", name))
  .catch((err) => { console.error(err); process.exit(1); });
