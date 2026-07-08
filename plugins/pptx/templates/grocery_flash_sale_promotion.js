// Milestone Mart - Flash Sale Week
// Recreation of Milestone_Mart_Flash_Sale__1_.pptx using pptxgenjs
//
// Usage: node recreate.js
// Output: Milestone_Mart_Flash_Sale.pptx

const pptxgen = require("pptxgenjs");

// ----- Palette -----
const COLOR = {
  cream:      "F3EAD7", // main slide background
  creamLight: "FBF6E8", // light cream (card body on hero)
  sand:       "ECD9B0", // product image placeholder (on cream cards)
  sandDark:   "D8C79E", // placeholder on hero (slightly darker tone)
  sandBorder: "C9B78A", // dashed border for image placeholders
  green:      "2B4A2E", // forest green — accents, hero card bg, footer bar
  greenDark:  "1F3521", // darker green for deep accents
  red:        "C7361E", // tomato red — primary CTA / badges
  redDeep:    "A62C18", // darker red for strike-through contrast if needed
  gold:       "D8A421", // gold star, price on hero
  ink:        "1F1A14", // near-black for body
  inkSoft:    "4A3D2C", // muted body
  white:      "FFFFFF",
  cardBorder: "D8C79E", // subtle card hairline
};

// ----- Fonts -----
const FONT_HEAD = "Fraunces";
const FONT_BODY = "-apple-system";
const FONT_MONO = "JetBrains Mono";

// ----- Helpers -----
function makeShadow() {
  return { type: "outer", blur: 8, offset: 2, angle: 90, color: "000000", opacity: 0.08 };
}

/**
 * Draw the milestone•mart wordmark at a given position.
 */
function addLogo(slide, x, y) {
  slide.addText(
    [
      { text: "milestone",                          options: { italic: true, color: COLOR.ink, fontFace: FONT_HEAD } },
      { text: " ",                                   options: {} },
      { text: "●",                                   options: { color: COLOR.red, bold: true, fontFace: FONT_BODY } },
      { text: " ",                                   options: {} },
      { text: "mart",                                options: { italic: true, color: COLOR.ink, fontFace: FONT_HEAD } },
    ],
    { x: x, y: y, w: 3.2, h: 0.45, fontSize: 18, margin: 0, valign: "middle" }
  );
}

/**
 * Top-right label (eyebrow) on every slide.
 */
function addEyebrow(slide, text, colorHex) {
  slide.addText(text, {
    x: 13.5, y: 0.45, w: 6.0, h: 0.4,
    fontSize: 12, bold: true, color: colorHex || COLOR.inkSoft,
    fontFace: FONT_BODY, align: "right", valign: "middle",
    charSpacing: 4, margin: 0,
  });
}

/**
 * Footer page number ("N / 10") and optional left text.
 */
function addPageFooter(slide, pageNum, totalPages, leftText) {
  // thin horizontal rule
  slide.addShape("line", {
    x: 0.6, y: 10.6, w: 18.8, h: 0,
    line: { color: COLOR.sandBorder, width: 0.5 },
  });
  if (leftText) {
    slide.addText(leftText, {
      x: 0.6, y: 10.7, w: 12, h: 0.4,
      fontSize: 11, color: COLOR.inkSoft, fontFace: FONT_BODY, margin: 0, valign: "middle",
    });
  }
  slide.addText(`${String(pageNum).padStart(2, "0")} / ${String(totalPages).padStart(2, "0")}`, {
    x: 17.5, y: 10.7, w: 1.9, h: 0.4,
    fontSize: 11, color: COLOR.inkSoft, fontFace: FONT_BODY, align: "right", margin: 0, valign: "middle",
  });
}

// ====================================================================
// BUILD PRESENTATION
// ====================================================================

const pres = new pptxgen();
pres.title = "Milestone Mart — Flash Sale Week";
pres.author = "Milestone Mart";

// Custom 16:9 layout at 20" x 11.25" to match the source file
pres.defineLayout({ name: "MM_WIDE", width: 20, height: 11.25 });
pres.layout = "MM_WIDE";

const TOTAL = 10;

// ====================================================================
// SLIDE 1 — COVER
// ====================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  addLogo(s, 0.6, 0.45);
  addEyebrow(s, "EST. IN YOUR NEIGHBORHOOD", COLOR.inkSoft);

  // Big multi-line headline "Flash / Sale / Week."
  s.addText(
    [
      { text: "Flash", options: { color: COLOR.ink, bold: true, breakLine: true } },
      { text: "Sale",  options: { color: COLOR.green, italic: true, bold: true, breakLine: true } },
      { text: "Week.", options: { color: COLOR.ink, bold: true } },
    ],
    {
      x: 0.6, y: 1.3, w: 12, h: 6.5,
      fontSize: 130, fontFace: FONT_HEAD,
      lineSpacingMultiple: 0.95, margin: 0, valign: "top",
    }
  );

  // Four info blocks at the bottom
  const infoY = 8.1;
  const infoBlocks = [
    { label: "SEVEN DAYS ONLY",   value: "Apr 28 — May 4, 2026" },
    { label: "HOW LOW",           value: "10–30% off everyday prices — cheaper than the big chains, online and offline." },
    { label: "WHERE",             value: "24 Larch Street" },
  ];
  const infoXs = [0.6, 3.2, 9.5];
  const infoWs = [2.5, 5.9, 3.5];
  infoBlocks.forEach((blk, i) => {
    s.addText(blk.label, {
      x: infoXs[i], y: infoY, w: infoWs[i], h: 0.35,
      fontSize: 12, bold: true, color: COLOR.inkSoft, fontFace: FONT_BODY,
      charSpacing: 3, margin: 0,
    });
    s.addText(blk.value, {
      x: infoXs[i], y: infoY + 0.4, w: infoWs[i], h: 1.3,
      fontSize: 16, bold: true, color: COLOR.ink, fontFace: FONT_BODY,
      margin: 0, valign: "top",
    });
  });
  // "Open 7am–11pm all week" — sub-line under WHERE
  s.addText("Open 7am–11pm all week", {
    x: 9.5, y: 8.85, w: 3.5, h: 0.4,
    fontSize: 13, color: COLOR.inkSoft, fontFace: FONT_BODY, margin: 0,
  });

  // 30% OFF stamp (red circle, bottom-right)
  const cx = 16.5, cy = 7.4, r = 1.55;
  s.addShape("ellipse", {
    x: cx - r, y: cy - r, w: r * 2, h: r * 2,
    fill: { color: COLOR.red },
    line: { color: COLOR.red, width: 1 },
    shadow: makeShadow(),
  });
  s.addText("30%", {
    x: cx - r, y: cy - 0.8, w: r * 2, h: 1.0,
    fontSize: 72, bold: true, color: COLOR.creamLight,
    fontFace: FONT_HEAD, align: "center", valign: "middle", margin: 0,
  });
  s.addText("UP TO OFF", {
    x: cx - r, y: cy + 0.25, w: r * 2, h: 0.5,
    fontSize: 18, bold: true, color: COLOR.creamLight,
    fontFace: FONT_BODY, align: "center", valign: "middle",
    charSpacing: 4, margin: 0,
  });

  // Bottom green marquee bar with star-separated repeating text
  const marqueeY = 10.6, marqueeH = 0.65;
  s.addShape("rect", {
    x: 0, y: marqueeY, w: 20, h: marqueeH,
    fill: { color: COLOR.green }, line: { color: COLOR.green, width: 0 },
  });
  const marqueeItems = [
    "GOOD FOOD, GOOD PRICES",
    "APR 28 — MAY 4",
    "A NEW DEAL EVERY DAY",
    "MILESTONE MART",
    "STOCK UP & SAVE",
    "GOOD FOOD, GOOD PRICES",
  ];
  const segW = 20 / marqueeItems.length;
  marqueeItems.forEach((txt, i) => {
    s.addText("★", {
      x: i * segW, y: marqueeY, w: 0.4, h: marqueeH,
      fontSize: 14, color: COLOR.gold, align: "center", valign: "middle",
      fontFace: FONT_BODY, margin: 0,
    });
    s.addText(txt, {
      x: i * segW + 0.4, y: marqueeY, w: segW - 0.4, h: marqueeH,
      fontSize: 11, bold: true, color: COLOR.creamLight, fontFace: FONT_BODY,
      align: "left", valign: "middle", charSpacing: 3, margin: 0,
    });
  });
}

// ====================================================================
// SLIDE 2 — HOW THE WEEK WORKS
// ====================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  addLogo(s, 0.6, 0.45);
  addEyebrow(s, "HOW THE WEEK WORKS", COLOR.red);

  // Big headline
  s.addText(
    [
      { text: "A new theme",  options: { color: COLOR.ink, bold: true, breakLine: true } },
      { text: "every ",       options: { color: COLOR.ink, bold: true } },
      { text: "day.",         options: { color: COLOR.ink, italic: true, bold: true } },
    ],
    { x: 0.6, y: 1.4, w: 10, h: 2.9, fontSize: 68, fontFace: FONT_HEAD, lineSpacingMultiple: 1.0, margin: 0, valign: "top" }
  );

  // Descriptive paragraph
  s.addText(
    [
      { text: "Seven days, seven categories in the spotlight. Every item in the store is 10–30% off — the daily theme just gets " },
      { text: "extra", options: { italic: true } },
      { text: " love: bigger stacks, freshest picks, and the loudest red tags." },
    ],
    { x: 0.6, y: 4.5, w: 8.5, h: 1.5, fontSize: 15, color: COLOR.ink, fontFace: FONT_BODY, margin: 0 }
  );

  // Three numbered steps
  const steps = [
    { n: "01", h: "Walk in, any day that week",     d: "Sale tags on every aisle. No app, no coupon, no membership." },
    { n: "02", h: "Follow the tomato-red tag",      d: "Red tag = flash price. Strike-through shows what the big chains charge." },
    { n: "03", h: "Check the daily hero",            d: "The themed category gets the deepest cuts of the week — plan around it." },
  ];
  steps.forEach((st, i) => {
    const y = 6.3 + i * 1.05;
    s.addText(st.n, {
      x: 0.6, y: y, w: 0.9, h: 0.5,
      fontSize: 26, bold: true, color: COLOR.red, fontFace: FONT_HEAD, margin: 0, valign: "top",
    });
    s.addText(st.h, {
      x: 1.6, y: y, w: 7.5, h: 0.45,
      fontSize: 18, bold: true, color: COLOR.ink, fontFace: FONT_BODY, margin: 0, valign: "top",
    });
    s.addText(st.d, {
      x: 1.6, y: y + 0.5, w: 7.5, h: 0.5,
      fontSize: 12, color: COLOR.inkSoft, fontFace: FONT_BODY, margin: 0, valign: "top",
    });
  });

  // Right-side grid of 7 day cards (2 cols x 3 rows + 1 full-width finale)
  const days = [
    { day: "TUE · APR 28", title: "Produce Tuesday",    desc: "Market-fresh fruit & veg, 25% off",          tag: "OPENING" },
    { day: "WED · APR 29", title: "Butcher's Wednesday", desc: "Meat & seafood counter, 20% off" },
    { day: "THU · APR 30", title: "Pantry Thursday",     desc: "Rice, oil, pasta & more, 15% off" },
    { day: "FRI · MAY 01", title: "Snack Friday",        desc: "Chips, chocolate, biscuits, 20% off" },
    { day: "SAT · MAY 02", title: "Sip Saturday",        desc: "Beverages & alcohol, 15–25% off" },
    { day: "SUN · MAY 03", title: "Household Sunday",    desc: "Cleaning & personal care, 20% off" },
  ];
  const gridX = 11.1, gridY = 2.0, cellW = 4.15, cellH = 1.55, gap = 0.15;
  days.forEach((d, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = gridX + col * (cellW + gap);
    const y = gridY + row * (cellH + gap);
    s.addShape("rect", {
      x, y, w: cellW, h: cellH,
      fill: { color: COLOR.creamLight },
      line: { color: COLOR.cardBorder, width: 0.75 },
    });
    s.addText(d.day, {
      x: x + 0.25, y: y + 0.2, w: cellW - 0.5, h: 0.3,
      fontSize: 10, color: COLOR.inkSoft, fontFace: FONT_BODY, charSpacing: 3, margin: 0,
    });
    s.addText(d.title, {
      x: x + 0.25, y: y + 0.5, w: cellW - 0.5, h: 0.5,
      fontSize: 20, bold: true, color: COLOR.ink, fontFace: FONT_HEAD, margin: 0,
    });
    s.addText(d.desc, {
      x: x + 0.25, y: y + 1.1, w: cellW - 0.5, h: 0.35,
      fontSize: 12, bold: true, color: COLOR.ink, fontFace: FONT_BODY, margin: 0,
    });
    if (d.tag) {
      s.addShape("rect", {
        x: x + cellW - 1.15, y: y - 0.02, w: 1.0, h: 0.32,
        fill: { color: COLOR.red }, line: { color: COLOR.red, width: 0 },
      });
      s.addText(d.tag, {
        x: x + cellW - 1.15, y: y - 0.02, w: 1.0, h: 0.32,
        fontSize: 9, bold: true, color: COLOR.creamLight, fontFace: FONT_BODY,
        align: "center", valign: "middle", charSpacing: 3, margin: 0,
      });
    }
  });

  // Finale (full-width, row 4)
  const finY = gridY + 3 * (cellH + gap);
  const finW = cellW * 2 + gap;
  s.addShape("rect", {
    x: gridX, y: finY, w: finW, h: cellH,
    fill: { color: COLOR.creamLight },
    line: { color: COLOR.cardBorder, width: 0.75 },
  });
  s.addText("MON · MAY 04", {
    x: gridX + 0.25, y: finY + 0.2, w: finW - 0.5, h: 0.3,
    fontSize: 10, color: COLOR.inkSoft, fontFace: FONT_BODY, charSpacing: 3, margin: 0,
  });
  s.addText("Family Monday — baby, kids & pets", {
    x: gridX + 0.25, y: finY + 0.5, w: finW - 0.5, h: 0.5,
    fontSize: 20, bold: true, color: COLOR.ink, fontFace: FONT_HEAD, margin: 0,
  });
  s.addText("Up to 30% off across family aisles", {
    x: gridX + 0.25, y: finY + 1.1, w: finW - 0.5, h: 0.35,
    fontSize: 12, bold: true, color: COLOR.ink, fontFace: FONT_BODY, margin: 0,
  });
  s.addShape("rect", {
    x: gridX + finW - 1.15, y: finY - 0.02, w: 1.0, h: 0.32,
    fill: { color: COLOR.red }, line: { color: COLOR.red, width: 0 },
  });
  s.addText("FINALE", {
    x: gridX + finW - 1.15, y: finY - 0.02, w: 1.0, h: 0.32,
    fontSize: 9, bold: true, color: COLOR.creamLight, fontFace: FONT_BODY,
    align: "center", valign: "middle", charSpacing: 3, margin: 0,
  });

  addPageFooter(s, 2, TOTAL, "Apr 28 — May 4, 2026 · 24 Larch Street");
}

// ====================================================================
// SLIDES 3-9 — PRODUCT GRIDS (shared renderer)
// ====================================================================
function buildProductSlide(opts) {
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  addLogo(s, 0.6, 0.45);
  addEyebrow(s, opts.eyebrow, COLOR.red);

  // Headline — first word plain, second italic, period
  s.addText(
    [
      { text: opts.titleWord1 + " ", options: { color: COLOR.ink, bold: true } },
      { text: opts.titleWord2,        options: { color: COLOR.green, italic: true, bold: true } },
      { text: ".",                    options: { color: COLOR.ink, bold: true } },
    ],
    { x: 0.6, y: 2.0, w: 14, h: 1.4, fontSize: 64, fontFace: FONT_HEAD, margin: 0, valign: "top" }
  );

  // Right-aligned savings info
  s.addText(opts.savingsLabel, {
    x: 14.5, y: 2.15, w: 5.0, h: 0.3,
    fontSize: 11, color: COLOR.inkSoft, fontFace: FONT_BODY, align: "right",
    charSpacing: 3, margin: 0,
  });
  s.addText(opts.savingsRange, {
    x: 14.5, y: 2.45, w: 5.0, h: 0.55,
    fontSize: 28, italic: true, bold: true, color: COLOR.red, fontFace: FONT_HEAD,
    align: "right", margin: 0,
  });
  s.addText(opts.heroLabel, {
    x: 14.5, y: 3.0, w: 5.0, h: 0.3,
    fontSize: 10, color: COLOR.inkSoft, fontFace: FONT_BODY, align: "right",
    charSpacing: 3, margin: 0,
  });

  // Horizontal rule separating headline from product grid
  s.addShape("line", {
    x: 0.6, y: 3.6, w: 18.8, h: 0,
    line: { color: COLOR.sandBorder, width: 0.5 },
  });

  // ---- Product grid (4 cols x 2 rows) ----
  const gridX = 0.6, gridY = 3.85, cellW = 4.6, cellH = 3.1, gap = 0.15;

  opts.products.forEach((p, i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = gridX + col * (cellW + gap);
    const y = gridY + row * (cellH + gap);
    const isHero = (i === 0);

    // Card background
    s.addShape("rect", {
      x, y, w: cellW, h: cellH,
      fill: { color: isHero ? COLOR.green : COLOR.creamLight },
      line: { color: isHero ? COLOR.green : COLOR.cardBorder, width: 0.75 },
    });

    // Image placeholder area (upper ~55% of card)
    const imgX = x + 0.25, imgY = y + 0.25, imgW = cellW - 0.5, imgH = 1.5;
    s.addShape("rect", {
      x: imgX, y: imgY, w: imgW, h: imgH,
      fill: { color: isHero ? COLOR.sandDark : COLOR.sand },
      line: { color: isHero ? COLOR.creamLight : COLOR.sandBorder, width: 1.0, dashType: "dash" },
    });

    // Discount badge (top-right corner, spans the card border)
    s.addShape("rect", {
      x: x + cellW - 0.95, y: y - 0.02, w: 0.85, h: 0.32,
      fill: { color: COLOR.red }, line: { color: COLOR.red, width: 0 },
    });
    s.addText(p.discount, {
      x: x + cellW - 0.95, y: y - 0.02, w: 0.85, h: 0.32,
      fontSize: 11, bold: true, color: COLOR.creamLight, fontFace: FONT_BODY,
      align: "center", valign: "middle", margin: 0,
    });

    // Image-area label (small pill in the middle of the placeholder)
    const labelW = isHero ? Math.min(imgW - 0.2, 3.7) : Math.min(imgW - 0.2, 3.4);
    const labelX = imgX + (imgW - labelW) / 2;
    s.addShape("rect", {
      x: labelX, y: imgY + imgH / 2 - 0.17, w: labelW, h: 0.34,
      fill: { color: isHero ? COLOR.green : COLOR.creamLight },
      line: { color: isHero ? COLOR.creamLight : COLOR.cardBorder, width: 0.5 },
    });
    s.addText(p.tag, {
      x: labelX, y: imgY + imgH / 2 - 0.17, w: labelW, h: 0.34,
      fontSize: isHero ? 7.5 : 8, bold: true,
      color: isHero ? COLOR.creamLight : COLOR.ink, fontFace: FONT_MONO,
      align: "center", valign: "middle", charSpacing: 1, margin: 0,
    });

    // Product name
    s.addText(p.name, {
      x: x + 0.25, y: y + 1.95, w: cellW - 0.5, h: 0.4,
      fontSize: 17, bold: true, color: isHero ? COLOR.creamLight : COLOR.ink, fontFace: FONT_BODY,
      margin: 0,
    });
    // Sub / description
    s.addText(p.sub, {
      x: x + 0.25, y: y + 2.35, w: cellW - 0.5, h: 0.3,
      fontSize: 11, color: isHero ? COLOR.sand : COLOR.inkSoft, fontFace: FONT_BODY, margin: 0,
    });

    // Price line: strikethrough old, big new
    s.addText(
      [
        { text: p.oldPrice + " ", options: { strike: "sngStrike", color: isHero ? COLOR.sand : COLOR.inkSoft, fontSize: 13 } },
        { text: p.newPrice,       options: { bold: true, color: isHero ? COLOR.gold : COLOR.red, fontSize: 22 } },
      ],
      { x: x + 0.25, y: y + 2.65, w: cellW - 0.5, h: 0.4, fontFace: FONT_BODY, margin: 0, valign: "middle" }
    );
  });

  // Footer "Also on sale" line + page number
  addPageFooter(s, opts.pageNum, TOTAL, opts.alsoText);
  return s;
}

// ---- Slide 3: Produce Tuesday ----
buildProductSlide({
  pageNum: 3,
  eyebrow: "DAY 1 · PRODUCE TUESDAY",
  titleWord1: "Fresh",  titleWord2: "produce",
  savingsLabel: "EVERYDAY SAVINGS", savingsRange: "15 – 30% off", heroLabel: "TUE APR 28 · HERO DAY",
  alsoText: "Also on sale: broccoli crowns · cucumbers · bell peppers · romaine · russet potatoes · yellow onions · cilantro · lemons",
  products: [
    { discount: "−30%", tag: "HERO · LOCAL STRAWBERRIES · 1 pint", name: "Local strawberries", sub: "1 pint · grown 40 miles away", oldPrice: "$5.49", newPrice: "$3.79" },
    { discount: "−22%", tag: "BANANAS · per lb",                    name: "Bananas",             sub: "per lb",                          oldPrice: "$0.69", newPrice: "$0.54" },
    { discount: "−25%", tag: "HASS AVOCADOS · 4-pack",              name: "Hass avocados",       sub: "4-pack · ripe & ready",           oldPrice: "$5.99", newPrice: "$4.49" },
    { discount: "−20%", tag: "BEEFSTEAK TOMATOES · per lb",         name: "Beefsteak tomatoes",  sub: "per lb · vine-ripened",           oldPrice: "$2.49", newPrice: "$1.99" },
    { discount: "−18%", tag: "BABY SPINACH · 10 oz clamshell",      name: "Organic baby spinach", sub: "10 oz clamshell",                oldPrice: "$4.29", newPrice: "$3.49" },
    { discount: "−28%", tag: "HONEYCRISP APPLES · 3 lb bag",        name: "Honeycrisp apples",   sub: "3 lb bag",                        oldPrice: "$6.99", newPrice: "$4.99" },
    { discount: "−15%", tag: "CARROTS · 2 lb bag",                  name: "Carrots",             sub: "2 lb bag",                        oldPrice: "$2.29", newPrice: "$1.94" },
    { discount: "−25%", tag: "BLUEBERRIES · 6 oz",                  name: "Blueberries",         sub: "6 oz · plump pick",               oldPrice: "$3.99", newPrice: "$2.99" },
  ],
});

// ---- Slide 4: Butcher's Wednesday ----
buildProductSlide({
  pageNum: 4,
  eyebrow: "DAY 2 · BUTCHER'S WEDNESDAY",
  titleWord1: "Meat, dairy &", titleWord2: "bakery",
  savingsLabel: "COUNTER SAVINGS", savingsRange: "15 – 25% off", heroLabel: "WED APR 29 · HERO DAY",
  alsoText: "Also on sale: pork loin · bone-in chicken · tilapia · shrimp 21/25 · sharp cheddar · butter sticks · croissants · bagels 6-ct",
  products: [
    { discount: "−25%", tag: "HERO · RIBEYE STEAK · per lb",        name: "USDA Choice ribeye",      sub: "per lb · cut fresh daily",   oldPrice: "$17.99", newPrice: "$13.49" },
    { discount: "−20%", tag: "GROUND BEEF 85/15 · per lb",          name: "Ground beef 85/15",       sub: "per lb",                     oldPrice: "$6.49",  newPrice: "$5.19" },
    { discount: "−22%", tag: "CHICKEN THIGHS · family pack",        name: "Chicken thighs",          sub: "family pack, boneless",      oldPrice: "$8.99",  newPrice: "$6.99" },
    { discount: "−18%", tag: "ATLANTIC SALMON · per lb",            name: "Atlantic salmon fillet",  sub: "per lb · fresh never-frozen", oldPrice: "$11.99", newPrice: "$9.79" },
    { discount: "−15%", tag: "WHOLE MILK · 1 gal",                   name: "Whole milk",              sub: "1 gallon · local dairy",     oldPrice: "$3.99",  newPrice: "$3.39" },
    { discount: "−20%", tag: "LARGE EGGS · 12 ct",                   name: "Grade A large eggs",      sub: "12 ct · cage-free",          oldPrice: "$4.49",  newPrice: "$3.59" },
    { discount: "−16%", tag: "GREEK YOGURT · 32 oz",                 name: "Plain Greek yogurt",      sub: "32 oz tub",                  oldPrice: "$5.49",  newPrice: "$4.59" },
    { discount: "−25%", tag: "SOURDOUGH BOULE · baked daily",        name: "Sourdough boule",         sub: "500g · baked in-house",      oldPrice: "$5.99",  newPrice: "$4.49" },
  ],
});

// ---- Slide 5: Pantry Thursday ----
buildProductSlide({
  pageNum: 5,
  eyebrow: "DAY 3 · PANTRY THURSDAY",
  titleWord1: "Pantry &", titleWord2: "frozen",
  savingsLabel: "STOCK-UP SAVINGS", savingsRange: "12 – 28% off", heroLabel: "THU APR 30 · HERO DAY",
  alsoText: "Also on sale: brown rice 5 lb · canola oil 1 gal · peanut butter · honey · black beans 6-pk · frozen berries · frozen dumplings · waffles 10-ct",
  products: [
    { discount: "−28%", tag: "HERO · JASMINE RICE · 10 lb bag",   name: "Jasmine rice, 10 lb",     sub: "new-crop · long grain",  oldPrice: "$17.99", newPrice: "$12.99" },
    { discount: "−22%", tag: "EXTRA VIRGIN OLIVE OIL · 1 L",       name: "Extra virgin olive oil",  sub: "1 liter · cold-pressed", oldPrice: "$12.99", newPrice: "$9.99" },
    { discount: "−20%", tag: "SPAGHETTI · 1 lb × 4",               name: "Spaghetti, 4-pack",       sub: "4 × 1 lb boxes",         oldPrice: "$5.99",  newPrice: "$4.79" },
    { discount: "−15%", tag: "INSTANT NOODLES · 20-pack",          name: "Instant noodles",         sub: "20-pack variety box",    oldPrice: "$13.49", newPrice: "$11.49" },
    { discount: "−18%", tag: "CANNED TOMATOES · 28 oz × 6",        name: "Whole peeled tomatoes",   sub: "6 × 28 oz cans",         oldPrice: "$10.99", newPrice: "$8.99" },
    { discount: "−25%", tag: "FROZEN PIZZA · 12\"",                 name: "Frozen margherita pizza", sub: "12-inch · 2-pack",       oldPrice: "$7.99",  newPrice: "$5.99" },
    { discount: "−20%", tag: "FROZEN MIXED VEG · 2 lb",            name: "Frozen mixed vegetables", sub: "2 lb bag",               oldPrice: "$4.99",  newPrice: "$3.99" },
    { discount: "−23%", tag: "ICE CREAM · 1.5 qt tub",             name: "Vanilla bean ice cream",  sub: "1.5 qt tub · churned slow", oldPrice: "$6.49", newPrice: "$4.99" },
  ],
});

// ---- Slide 6: Snack Friday ----
buildProductSlide({
  pageNum: 6,
  eyebrow: "DAY 4 · SNACK FRIDAY",
  titleWord1: "Snacks &", titleWord2: "drinks",
  savingsLabel: "BASKET-FILLERS", savingsRange: "15 – 30% off", heroLabel: "FRI MAY 01 · HERO DAY",
  alsoText: "Also on sale: tortilla chips · salsa · popcorn · granola bars · sparkling water 8-pk · sports drinks · iced tea · apple juice",
  products: [
    { discount: "−30%", tag: "HERO · KETTLE CHIPS · 8 oz × 2",     name: "Kettle chips, 2-pack",    sub: "2 × 8 oz bags · sea salt",  oldPrice: "$7.99",  newPrice: "$5.59" },
    { discount: "−20%", tag: "DARK CHOCOLATE BAR · 3.5 oz × 3",    name: "Dark chocolate, 3-pack",  sub: "3 × 3.5 oz · 70% cacao",    oldPrice: "$8.49",  newPrice: "$6.79" },
    { discount: "−22%", tag: "TRAIL MIX · 24 oz tub",              name: "Trail mix",               sub: "24 oz · nut & fruit",       oldPrice: "$11.99", newPrice: "$9.29" },
    { discount: "−18%", tag: "SHORTBREAD BISCUITS · 14 oz tin",    name: "Butter shortbread",       sub: "14 oz gift tin",            oldPrice: "$6.99",  newPrice: "$5.69" },
    { discount: "−25%", tag: "COLA · 12-pack cans",                name: "Cola, 12-pack",           sub: "12 × 12 fl oz cans",        oldPrice: "$7.99",  newPrice: "$5.99" },
    { discount: "−20%", tag: "ORANGE JUICE · 52 fl oz",            name: "Not-from-concentrate OJ", sub: "52 fl oz · no pulp",        oldPrice: "$5.49",  newPrice: "$4.39" },
    { discount: "−28%", tag: "SPRING WATER · 24 × 500 ml",         name: "Spring water, 24-pack",   sub: "24 × 500 ml bottles",       oldPrice: "$4.99",  newPrice: "$3.59" },
    { discount: "−15%", tag: "COLD BREW COFFEE · 32 fl oz",        name: "Cold brew coffee",        sub: "32 fl oz bottle",           oldPrice: "$6.99",  newPrice: "$5.94" },
  ],
});

// ---- Slide 7: Sip Saturday ----
buildProductSlide({
  pageNum: 7,
  eyebrow: "DAY 5 · SIP SATURDAY · 21+",
  titleWord1: "Beer, wine &", titleWord2: "spirits",
  savingsLabel: "CELLAR SAVINGS", savingsRange: "10 – 25% off", heroLabel: "SAT MAY 02 · HERO DAY",
  alsoText: "Please drink responsibly · 21+ with valid ID. Also on sale: rosé · malbec · chardonnay · stout 4-pk · vodka 1L · gin 750ml · rum 750ml",
  products: [
    { discount: "−25%", tag: "HERO · CRAFT LAGER · 12-pack",       name: "Local craft lager, 12-pk", sub: "12 × 12 oz bottles",        oldPrice: "$19.99", newPrice: "$14.99" },
    { discount: "−18%", tag: "IPA · 6-pack cans",                  name: "West coast IPA, 6-pk",     sub: "6 × 16 oz cans",            oldPrice: "$13.99", newPrice: "$11.49" },
    { discount: "−20%", tag: "PINOT NOIR · 750 ml",                name: "Pinot noir",               sub: "750 ml · Willamette Valley", oldPrice: "$17.99", newPrice: "$14.39" },
    { discount: "−15%", tag: "SAUVIGNON BLANC · 750 ml",           name: "Sauvignon blanc",          sub: "750 ml · Marlborough",      oldPrice: "$12.99", newPrice: "$11.04" },
    { discount: "−22%", tag: "PROSECCO · 750 ml",                  name: "Prosecco DOC",             sub: "750 ml · extra dry",        oldPrice: "$14.99", newPrice: "$11.69" },
    { discount: "−15%", tag: "BLANCO TEQUILA · 750 ml",            name: "100% agave blanco tequila", sub: "750 ml",                   oldPrice: "$27.99", newPrice: "$23.79" },
    { discount: "−18%", tag: "BOURBON · 750 ml",                   name: "Small-batch bourbon",      sub: "750 ml · 46% ABV",          oldPrice: "$32.99", newPrice: "$26.99" },
    { discount: "−20%", tag: "HARD SELTZER · 8-pack",              name: "Hard seltzer variety",     sub: "8 × 12 oz cans",            oldPrice: "$14.99", newPrice: "$11.99" },
  ],
});

// ---- Slide 8: Household Sunday ----
buildProductSlide({
  pageNum: 8,
  eyebrow: "DAY 6 · HOUSEHOLD SUNDAY",
  titleWord1: "Home &", titleWord2: "personal",
  savingsLabel: "HOME AISLE SAVINGS", savingsRange: "15 – 25% off", heroLabel: "SUN MAY 03 · HERO DAY",
  alsoText: "Also on sale: all-purpose cleaner · bleach · dish pods 60-ct · facial tissue · deodorant · razors · cotton pads · hand soap refill",
  products: [
    { discount: "−25%", tag: "HERO · LAUNDRY DETERGENT · 150 oz",  name: "Liquid laundry detergent", sub: "150 oz · ~96 loads",    oldPrice: "$19.99", newPrice: "$14.99" },
    { discount: "−20%", tag: "DISH SOAP · 28 oz",                  name: "Lemon dish soap",          sub: "28 oz · grease-cutting", oldPrice: "$4.99",  newPrice: "$3.99" },
    { discount: "−18%", tag: "PAPER TOWELS · 12 rolls",            name: "Paper towels, 12-pack",    sub: "12 mega rolls",         oldPrice: "$21.99", newPrice: "$17.99" },
    { discount: "−22%", tag: "BATH TISSUE · 24 rolls",             name: "Bath tissue, 24-pack",     sub: "24 double rolls · 2-ply", oldPrice: "$22.99", newPrice: "$17.89" },
    { discount: "−20%", tag: "SHAMPOO · 32 oz pump",               name: "Daily shampoo",            sub: "32 oz pump bottle",     oldPrice: "$8.99",  newPrice: "$7.19" },
    { discount: "−15%", tag: "BODY WASH · 18 fl oz",               name: "Moisturizing body wash",   sub: "18 fl oz · oat + honey", oldPrice: "$6.49",  newPrice: "$5.49" },
    { discount: "−25%", tag: "TOOTHPASTE · 6 oz × 3",              name: "Toothpaste, 3-pack",       sub: "3 × 6 oz · fluoride",   oldPrice: "$9.99",  newPrice: "$7.49" },
    { discount: "−20%", tag: "TRASH BAGS · 80 ct",                 name: "Kitchen trash bags",       sub: "80 ct · 13-gal drawstring", oldPrice: "$14.99", newPrice: "$11.99" },
  ],
});

// ---- Slide 9: Family Monday (Finale) ----
buildProductSlide({
  pageNum: 9,
  eyebrow: "DAY 7 · FAMILY MONDAY · FINALE",
  titleWord1: "Baby, kids &", titleWord2: "pets",
  savingsLabel: "FAMILY FINALE", savingsRange: "15 – 30% off", heroLabel: "MON MAY 04 · DEEPEST CUTS",
  alsoText: "Also on sale: training pants · kids' yogurt 8-pk · animal crackers · crayons 24-ct · wet cat food · dog treats · bird seed · guinea pig hay",
  products: [
    { discount: "−30%", tag: "HERO · DIAPERS · size 3, 144 ct box", name: "Diapers, size 3",      sub: "144 ct box · one-month supply", oldPrice: "$44.99", newPrice: "$31.49" },
    { discount: "−22%", tag: "BABY WIPES · 900 ct tub",             name: "Sensitive baby wipes", sub: "900 ct · fragrance-free",      oldPrice: "$22.99", newPrice: "$17.89" },
    { discount: "−20%", tag: "BABY FORMULA · 28 oz",                name: "Infant formula, stage 1", sub: "28 oz tub",                 oldPrice: "$34.99", newPrice: "$27.99" },
    { discount: "−18%", tag: "BABY FOOD POUCHES · 16-pack",         name: "Baby food pouches",    sub: "16 × 3.5 oz · mixed flavors",  oldPrice: "$18.99", newPrice: "$15.49" },
    { discount: "−25%", tag: "KIDS' CEREAL · 24 oz",                name: "Whole-grain kids' cereal", sub: "24 oz box · family size",   oldPrice: "$5.99",  newPrice: "$4.49" },
    { discount: "−20%", tag: "JUICE BOXES · 32-pack",               name: "Kids' juice boxes",    sub: "32 × 6.75 fl oz",              oldPrice: "$11.49", newPrice: "$9.19" },
    { discount: "−22%", tag: "DRY DOG FOOD · 30 lb bag",            name: "Chicken & rice dog food", sub: "30 lb bag · adult formula", oldPrice: "$44.99", newPrice: "$34.99" },
    { discount: "−20%", tag: "CAT LITTER · 35 lb box",              name: "Clumping cat litter",  sub: "35 lb · low-dust",             oldPrice: "$18.99", newPrice: "$15.19" },
  ],
});

// ====================================================================
// SLIDE 10 — CLOSING / SEE YOU AT THE MART
// ====================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  addLogo(s, 0.6, 0.45);
  addEyebrow(s, "SEE YOU THIS WEEK", COLOR.inkSoft);

  // Massive closing headline
  s.addText(
    [
      { text: "See you at the", options: { color: COLOR.ink,  bold: true, breakLine: true } },
      { text: "mart.",           options: { color: COLOR.red,  bold: true, italic: true } },
    ],
    { x: 0.6, y: 1.2, w: 19, h: 5.5, fontSize: 130, fontFace: FONT_HEAD, lineSpacingMultiple: 1.0, margin: 0, valign: "top" }
  );

  // Four info columns with hairline above each
  const infoY = 7.3, colW = 4.35, colGap = 0.25;
  const xs = [0.6, 0.6 + (colW + colGap), 0.6 + 2 * (colW + colGap), 0.6 + 3 * (colW + colGap)];
  const cols = [
    { label: "WHEN",     big: "Apr 28 — May 4",    sub: "Tuesday through Monday, 2026" },
    { label: "HOURS",    big: "7 am — 11 pm",      sub: "Every day of the sale" },
    { label: "WHERE",    big: "24 Larch Street",   sub: "Corner of Larch & 6th · free parking" },
    { label: "TALK TO US", big: "hello@milestone.mart", sub: "(555) 014-2026 · @milestonemart" },
  ];
  cols.forEach((c, i) => {
    s.addShape("line", { x: xs[i], y: infoY, w: colW - 0.1, h: 0, line: { color: COLOR.inkSoft, width: 0.5 } });
    s.addText(c.label, {
      x: xs[i], y: infoY + 0.15, w: colW, h: 0.3,
      fontSize: 11, bold: true, color: COLOR.inkSoft, fontFace: FONT_BODY, charSpacing: 3, margin: 0,
    });
    s.addText(c.big, {
      x: xs[i], y: infoY + 0.55, w: colW, h: 0.5,
      fontSize: 20, bold: true, color: COLOR.ink, fontFace: FONT_BODY, margin: 0,
    });
    s.addText(c.sub, {
      x: xs[i], y: infoY + 1.1, w: colW, h: 0.35,
      fontSize: 12, color: COLOR.inkSoft, fontFace: FONT_BODY, margin: 0,
    });
  });

  // Three pill-shaped callouts bottom-left
  const pillY = 9.5, pillH = 0.45;
  const pills = [
    { text: "10-30% OFF",         bg: COLOR.red,   fg: COLOR.creamLight, w: 1.7 },
    { text: "7 DAYS ONLY",        bg: COLOR.green, fg: COLOR.creamLight, w: 1.8 },
    { text: "A NEW HERO EVERY DAY", bg: COLOR.gold, fg: COLOR.ink,       w: 2.7 },
  ];
  let px = 0.6;
  pills.forEach((p) => {
    s.addShape("rect", {
      x: px, y: pillY, w: p.w, h: pillH,
      fill: { color: p.bg }, line: { color: p.bg, width: 0 },
    });
    s.addText(p.text, {
      x: px, y: pillY, w: p.w, h: pillH,
      fontSize: 12, bold: true, color: p.fg, fontFace: FONT_BODY,
      align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });
    px += p.w + 0.15;
  });

  // Fine print (right side)
  s.addText("While supplies last · No rainchecks on doorbusters · Prices shown are vs. our matched big-chain everyday prices.", {
    x: 9.5, y: 9.55, w: 10, h: 0.4,
    fontSize: 11, color: COLOR.inkSoft, fontFace: FONT_BODY, align: "right", margin: 0,
  });

  addPageFooter(s, 10, TOTAL, "Milestone Mart · Good food, good prices, good neighbors.");
}

// ----- Save -----
pres.writeFile({ fileName: "Milestone_Mart_Flash_Sale.pptx" })
  .then((fn) => console.log("Wrote:", fn));
