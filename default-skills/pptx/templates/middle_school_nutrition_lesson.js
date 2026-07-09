// Nutritionist deck — recreated with pptxgenjs
// Slide size: 13.333" × 7.5" (LAYOUT_WIDE / 16:9)

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.title = "Introduction to Nutrition";
pres.author = "Mr. Halsey";

// ---------- Palette ----------
const COLORS = {
  cream:       "F7F1E5",   // page background (warm cream)
  creamSoft:   "EFE8D9",   // slight variant for slide 6
  ink:         "1A1F1C",   // primary dark
  inkSoft:     "3A4140",   // muted body text
  inkMuted:    "707571",   // captions / footers / page numbers
  rule:        "B8B0A0",   // divider lines
  green:       "2F5D3F",   // primary green (italic accent / dark slides)
  greenDeep:   "264C32",   // darker green (slide 3 background)
  orange:      "E5A23B",   // warm orange
  orangeDark:  "B47B22",   // darker orange (icon circle on orange card)
  pink:        "B6446B",   // berry / pink
  pinkSoft:    "C46A87",   // lighter pink (icon circle on pink card)
  blue:        "6E9BBC",   // hydration blue
  blueSoft:    "9BBAD2",   // softer blue
  greenSoft:   "6F8F77",   // soft green (icon circle on green card)
  charcoal:    "1F2421",   // wrap-up dark background
  white:       "FFFFFF",
};

const FONT_HEAD = "Arial";   // headings (bold sans)
const FONT_BODY = "Calibri"; // body
// Note: PowerPoint will substitute these with installed fonts. The original
// uses a similar geometric sans; Arial is the safest universal fallback.

// ---------- Slide-size helpers ----------
const SLIDE_W = 13.333;
const SLIDE_H = 7.5;

// ---------- Reusable header/footer for content slides ----------
function addHeader(slide, sectionNum, sectionLabel, pageNum, totalPages, opts = {}) {
  const eyebrowColor = opts.eyebrowColor || COLORS.ink;
  const dotColor = opts.dotColor || COLORS.ink;
  const pageColor = opts.pageColor || COLORS.inkMuted;
  const ruleColor = opts.ruleColor || COLORS.rule;

  // Eyebrow: "01 · WHAT IS IT"
  slide.addText(
    [
      { text: sectionNum, options: { bold: true, color: eyebrowColor } },
      { text: "  ·  ", options: { color: dotColor } },
      { text: sectionLabel, options: { bold: true, color: eyebrowColor } },
    ],
    {
      x: 0.7, y: 0.4, w: 8, h: 0.4,
      fontFace: FONT_HEAD, fontSize: 11,
      charSpacing: 4, valign: "middle", margin: 0,
    }
  );

  // Page indicator: "02 / 08"
  slide.addText(`${pageNum}  /  ${totalPages}`, {
    x: SLIDE_W - 2.0, y: 0.4, w: 1.3, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 11,
    color: pageColor, charSpacing: 4,
    align: "right", valign: "middle", margin: 0,
  });

  // Horizontal rule under header
  slide.addShape(pres.shapes.LINE, {
    x: 0.7, y: 0.85, w: SLIDE_W - 1.4, h: 0,
    line: { color: ruleColor, width: 0.5 },
  });
}

function addFooter(slide, pageNum, opts = {}) {
  const color = opts.color || COLORS.inkMuted;
  slide.addText("Introduction to Nutrition", {
    x: 0.7, y: SLIDE_H - 0.55, w: 5, h: 0.35,
    fontFace: FONT_BODY, fontSize: 10,
    color, valign: "middle", margin: 0,
  });
  slide.addText(String(pageNum).padStart(2, "0"), {
    x: SLIDE_W - 1.5, y: SLIDE_H - 0.55, w: 0.8, h: 0.35,
    fontFace: FONT_BODY, fontSize: 10,
    color, align: "right", valign: "middle", margin: 0,
  });
}

// =======================================================================
// SLIDE 1 — Title / cover
// =======================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.cream };

  // Top eyebrow row
  s.addText("HEALTH CLASS GRADE 6", {
    x: 0.7, y: 0.5, w: 6, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 12, bold: true,
    color: COLORS.ink, charSpacing: 6,
    valign: "middle", margin: 0,
  });
  s.addText("LESSON 01 OF 12", {
    x: SLIDE_W - 4.7, y: 0.5, w: 4, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 12, bold: true,
    color: COLORS.ink, charSpacing: 6,
    align: "right", valign: "middle", margin: 0,
  });

  // Big headline: "Introduction to" (bold) and "Nutrition." (italic green)
  s.addText("Introduction to", {
    x: 0.7, y: 1.7, w: 12, h: 1.5,
    fontFace: FONT_HEAD, fontSize: 96, bold: true,
    color: COLORS.ink, valign: "middle", margin: 0,
  });
  s.addText("Nutrition.", {
    x: 0.7, y: 3.05, w: 12, h: 1.5,
    fontFace: "Georgia", fontSize: 96, italic: true,
    color: COLORS.green, valign: "middle", margin: 0,
  });

  // Subtitle
  s.addText(
    "A first look at how food fuels the body, the brain, and everything you do.",
    {
      x: 0.7, y: 4.95, w: 7.5, h: 0.9,
      fontFace: FONT_BODY, fontSize: 16,
      color: COLORS.inkSoft, valign: "top", margin: 0,
    }
  );

  // Decorative circles cluster (bottom-right)
  // Small blue
  s.addShape(pres.shapes.OVAL, {
    x: 9.85, y: 4.7, w: 0.55, h: 0.55,
    fill: { color: COLORS.blue }, line: { type: "none" },
  });
  // Pink
  s.addShape(pres.shapes.OVAL, {
    x: 9.7, y: 5.45, w: 0.85, h: 0.85,
    fill: { color: COLORS.pink }, line: { type: "none" },
  });
  // Big green
  s.addShape(pres.shapes.OVAL, {
    x: 10.4, y: 4.85, w: 1.3, h: 1.3,
    fill: { color: COLORS.green }, line: { type: "none" },
  });
  // Large orange
  s.addShape(pres.shapes.OVAL, {
    x: 11.4, y: 4.65, w: 1.55, h: 1.55,
    fill: { color: COLORS.orange }, line: { type: "none" },
  });

  // Bottom rule
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 6.7, w: SLIDE_W - 1.4, h: 0,
    line: { color: COLORS.rule, width: 0.5 },
  });

  // Bottom row: "MR. HALSEY" / "SPRING TERM"
  s.addText("MR. HALSEY", {
    x: 0.7, y: 6.85, w: 4, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 11, bold: true,
    color: COLORS.inkSoft, charSpacing: 6,
    valign: "middle", margin: 0,
  });
  s.addText("SPRING TERM", {
    x: SLIDE_W - 4.7, y: 6.85, w: 4, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 11, bold: true,
    color: COLORS.inkSoft, charSpacing: 6,
    align: "right", valign: "middle", margin: 0,
  });
}

// =======================================================================
// SLIDE 2 — What is it
// =======================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.cream };

  addHeader(s, "01", "WHAT IS IT", "02", "08");

  // Headline with italic green accents on "uses" and "food"
  s.addText(
    [
      { text: "Nutrition is how your body ", options: { bold: true, color: COLORS.ink, fontFace: FONT_HEAD } },
      { text: "uses ", options: { italic: true, color: COLORS.green, fontFace: "Georgia" } },
      { text: "\n", options: { fontFace: FONT_HEAD } },
      { text: "food", options: { italic: true, color: COLORS.green, fontFace: "Georgia" } },
      { text: " to grow, move, and think.", options: { bold: true, color: COLORS.ink, fontFace: FONT_HEAD } },
    ],
    {
      x: 0.7, y: 1.25, w: 12, h: 2.0,
      fontSize: 44,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    }
  );

  // Pills row: Grow (filled), Move, Think, Heal, Sleep
  const pillLabels = ["Grow", "Move", "Think", "Heal", "Sleep"];
  const pillY = 3.85;
  const pillH = 0.65;
  const pillGap = 0.25;
  const pillWidths = [1.25, 1.35, 1.35, 1.25, 1.35];
  let px = 0.7;
  pillLabels.forEach((label, i) => {
    const w = pillWidths[i];
    const isActive = i === 0;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: px, y: pillY, w, h: pillH,
      fill: { color: isActive ? COLORS.ink : COLORS.cream },
      line: { color: COLORS.ink, width: 1 },
      rectRadius: pillH / 2,
    });
    s.addText(label, {
      x: px, y: pillY, w, h: pillH,
      fontFace: FONT_HEAD, fontSize: 16, bold: true,
      color: isActive ? COLORS.cream : COLORS.ink,
      align: "center", valign: "middle", margin: 0,
    });
    px += w + pillGap;
  });

  // Bottom callout block (with vertical green accent line)
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 5.7, w: 0, h: 0.95,
    line: { color: COLORS.green, width: 2.25 },
  });
  s.addText(
    "Every bite is a set of instructions. Your body decides what to do with them — turn it into energy, build a muscle, or store it for later.",
    {
      x: 0.95, y: 5.65, w: 9.5, h: 1.0,
      fontFace: FONT_BODY, fontSize: 14,
      color: COLORS.inkSoft, valign: "top", margin: 0,
    }
  );

  // Footer (shifted slightly to avoid overlap with the callout above)
  addFooter(s, 2);
}

// =======================================================================
// SLIDE 3 — Why it matters (DARK GREEN BACKGROUND)
// =======================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.greenDeep };

  addHeader(s, "02", "WHY IT MATTERS", "03", "08", {
    eyebrowColor: COLORS.cream,
    dotColor: COLORS.cream,
    pageColor: "C8D4C0",
    ruleColor: "5A7860",
  });

  // Headline: "Food shapes everything — your energy, your mood, your focus."
  s.addText(
    [
      { text: "Food shapes ", options: { bold: true, color: COLORS.cream, fontFace: FONT_HEAD } },
      { text: "everything", options: { italic: true, color: COLORS.orange, fontFace: "Georgia" } },
      { text: " — your", options: { bold: true, color: COLORS.cream, fontFace: FONT_HEAD } },
      { text: "\n", options: { fontFace: FONT_HEAD } },
      { text: "energy, your mood, your focus.", options: { bold: true, color: COLORS.cream, fontFace: FONT_HEAD } },
    ],
    {
      x: 0.7, y: 1.2, w: 12, h: 2.0,
      fontSize: 44, valign: "top", margin: 0,
    }
  );

  // Three stat columns with top rule, big stat, paragraph
  const statCols = [
    { stat: "3×", body: "Meals a day set the rhythm of your energy and focus at school." },
    { stat: "60%", body: "Of your body is water — staying hydrated keeps your brain sharp." },
    { stat: "10y", body: "Your bones are still growing through your teens. Food is what builds them." },
  ];
  const colW = 3.7;
  const colGap = 0.4;
  const colsTotalW = colW * 3 + colGap * 2;
  const colsStartX = (SLIDE_W - colsTotalW) / 2;
  const ruleY = 3.55;
  statCols.forEach((c, i) => {
    const x = colsStartX + i * (colW + colGap);
    s.addShape(pres.shapes.LINE, {
      x, y: ruleY, w: colW, h: 0,
      line: { color: "8DA293", width: 0.75 },
    });
    s.addText(c.stat, {
      x, y: ruleY + 0.18, w: colW, h: 1.3,
      fontFace: FONT_HEAD, fontSize: 80, bold: true,
      color: COLORS.cream, valign: "top", margin: 0,
    });
    s.addText(c.body, {
      x, y: ruleY + 1.65, w: colW, h: 1.3,
      fontFace: FONT_BODY, fontSize: 14,
      color: "E4E0D0", valign: "top", margin: 0,
    });
  });

  // Footer
  addFooter(s, 3, { color: "C8D4C0" });
}

// =======================================================================
// SLIDE 4 — The Big Three (Macronutrients) — three colored cards
// =======================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.cream };

  addHeader(s, "03", "THE BIG THREE", "04", "08");

  s.addText("Macronutrients.", {
    x: 0.7, y: 1.15, w: 12, h: 1.0,
    fontFace: FONT_HEAD, fontSize: 56, bold: true,
    color: COLORS.ink, valign: "middle", margin: 0,
  });
  s.addText(
    "The three nutrients your body needs in large amounts every day.",
    {
      x: 0.7, y: 2.15, w: 12, h: 0.5,
      fontFace: FONT_BODY, fontSize: 16,
      color: COLORS.inkSoft, valign: "middle", margin: 0,
    }
  );

  const cards = [
    {
      letter: "C",
      title: "Carbs",
      sub: "ENERGY",
      body: "Bread, rice, pasta, fruit. Your body's main source of fuel.",
      bg: COLORS.orange,
      circle: COLORS.orangeDark,
      titleColor: COLORS.ink,
      subColor: COLORS.ink,
      bodyColor: COLORS.ink,
      letterColor: COLORS.ink,
    },
    {
      letter: "P",
      title: "Protein",
      sub: "BUILD",
      body: "Eggs, beans, fish, chicken. Builds muscle and tissue.",
      bg: COLORS.pink,
      circle: COLORS.pinkSoft,
      titleColor: COLORS.cream,
      subColor: COLORS.cream,
      bodyColor: COLORS.cream,
      letterColor: COLORS.cream,
    },
    {
      letter: "F",
      title: "Fats",
      sub: "STORE",
      body: "Nuts, oils, avocado. Long-lasting energy and protection.",
      bg: COLORS.green,
      circle: COLORS.greenSoft,
      titleColor: COLORS.cream,
      subColor: COLORS.cream,
      bodyColor: COLORS.cream,
      letterColor: COLORS.cream,
    },
  ];

  const cardW = 3.95;
  const cardH = 3.7;
  const cardGap = 0.25;
  const cardsTotalW = cardW * 3 + cardGap * 2;
  const cardsStartX = (SLIDE_W - cardsTotalW) / 2;
  const cardY = 2.95;

  cards.forEach((c, i) => {
    const cx = cardsStartX + i * (cardW + cardGap);

    // Card background
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: cardY, w: cardW, h: cardH,
      fill: { color: c.bg }, line: { type: "none" },
      rectRadius: 0.18,
    });

    // Letter circle
    const circleD = 0.95;
    s.addShape(pres.shapes.OVAL, {
      x: cx + 0.45, y: cardY + 0.45, w: circleD, h: circleD,
      fill: { color: c.circle }, line: { type: "none" },
    });
    s.addText(c.letter, {
      x: cx + 0.45, y: cardY + 0.45, w: circleD, h: circleD,
      fontFace: FONT_HEAD, fontSize: 30, bold: true,
      color: c.letterColor, align: "center", valign: "middle", margin: 0,
    });

    // Title
    s.addText(c.title, {
      x: cx + 0.45, y: cardY + 1.6, w: cardW - 0.9, h: 0.7,
      fontFace: FONT_HEAD, fontSize: 36, bold: true,
      color: c.titleColor, valign: "middle", margin: 0,
    });

    // Subtitle (small caps style label)
    s.addText(c.sub, {
      x: cx + 0.45, y: cardY + 2.32, w: cardW - 0.9, h: 0.35,
      fontFace: FONT_HEAD, fontSize: 12, bold: true,
      color: c.subColor, charSpacing: 4,
      valign: "middle", margin: 0,
    });

    // Body
    s.addText(c.body, {
      x: cx + 0.45, y: cardY + 2.78, w: cardW - 0.9, h: 0.8,
      fontFace: FONT_BODY, fontSize: 13,
      color: c.bodyColor, valign: "top", margin: 0,
    });
  });

  addFooter(s, 4);
}

// =======================================================================
// SLIDE 5 — Micronutrients (2×3 colored grid)
// =======================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.cream };

  addHeader(s, "04", "SMALL BUT MIGHTY", "05", "08");

  // Left column: heading + body + "SIX TO KNOW"
  s.addText("Micro", {
    x: 0.7, y: 1.55, w: 5.5, h: 1.05,
    fontFace: FONT_HEAD, fontSize: 64, bold: true,
    color: COLORS.ink, valign: "middle", margin: 0,
  });
  s.addText("nutrients.", {
    x: 0.7, y: 2.6, w: 5.5, h: 1.05,
    fontFace: "Georgia", fontSize: 64, italic: true,
    color: COLORS.pink, valign: "middle", margin: 0,
  });
  s.addText(
    "Tiny amounts. Huge jobs. Vitamins and minerals keep your body running behind the scenes — strong bones, steady energy, sharp eyes.",
    {
      x: 0.7, y: 3.95, w: 5.4, h: 1.4,
      fontFace: FONT_BODY, fontSize: 14,
      color: COLORS.inkSoft, valign: "top", margin: 0,
    }
  );
  s.addText("SIX TO KNOW", {
    x: 0.7, y: 5.6, w: 5, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 12, bold: true,
    color: COLORS.inkSoft, charSpacing: 6,
    valign: "middle", margin: 0,
  });

  // Right side: 2x3 tiles
  const tiles = [
    { letter: "A",  label: "VISION",   bg: COLORS.orange, fg: COLORS.ink,   labelFg: COLORS.ink },
    { letter: "C",  label: "IMMUNITY", bg: COLORS.green,  fg: COLORS.cream, labelFg: COLORS.cream },
    { letter: "D",  label: "BONES",    bg: COLORS.pink,   fg: COLORS.cream, labelFg: COLORS.cream },
    { letter: "B",  label: "ENERGY",   bg: COLORS.blue,   fg: COLORS.cream, labelFg: COLORS.cream },
    { letter: "Fe", label: "BLOOD",    bg: COLORS.charcoal, fg: COLORS.cream, labelFg: COLORS.cream },
    { letter: "Ca", label: "TEETH",    bg: COLORS.cream,  fg: COLORS.ink,   labelFg: COLORS.ink, border: COLORS.rule },
  ];

  const tileW = 1.7;
  const tileH = 1.7;
  const tileGap = 0.18;
  const gridStartX = 6.85;
  const gridStartY = 1.55;

  tiles.forEach((t, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = gridStartX + col * (tileW + tileGap);
    const y = gridStartY + row * (tileH + tileGap);

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: tileW, h: tileH,
      fill: { color: t.bg },
      line: t.border ? { color: t.border, width: 0.75 } : { type: "none" },
      rectRadius: 0.12,
    });
    // Letter top-left
    s.addText(t.letter, {
      x: x + 0.2, y: y + 0.15, w: tileW - 0.3, h: 0.85,
      fontFace: FONT_HEAD, fontSize: 38, bold: true,
      color: t.fg, valign: "top", margin: 0,
    });
    // Label bottom-left
    s.addText(t.label, {
      x: x + 0.2, y: y + tileH - 0.45, w: tileW - 0.3, h: 0.32,
      fontFace: FONT_HEAD, fontSize: 11, bold: true,
      color: t.labelFg, charSpacing: 3,
      valign: "middle", margin: 0,
    });
  });

  addFooter(s, 5);
}

// =======================================================================
// SLIDE 6 — Five food groups (plate diagram)
// =======================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.creamSoft };

  addHeader(s, "05", "BUILD A BALANCED PLATE", "06", "08");

  s.addText(
    [
      { text: "The ", options: { bold: true, color: COLORS.ink, fontFace: FONT_HEAD } },
      { text: "five", options: { italic: true, color: COLORS.green, fontFace: "Georgia" } },
      { text: " food groups.", options: { bold: true, color: COLORS.ink, fontFace: FONT_HEAD } },
    ],
    {
      x: 0.7, y: 1.15, w: 12, h: 1.0,
      fontSize: 52, valign: "middle", margin: 0,
    }
  );
  s.addText("A simple way to picture a meal: divide your plate.", {
    x: 0.7, y: 2.15, w: 12, h: 0.5,
    fontFace: FONT_BODY, fontSize: 16,
    color: COLORS.inkSoft, valign: "middle", margin: 0,
  });

  // ----- Plate diagram (left side) -----
  // Outer plate circle
  const plateCx = 3.6;
  const plateCy = 4.95;
  const plateR  = 1.85;
  const plateD  = plateR * 2;

  s.addShape(pres.shapes.OVAL, {
    x: plateCx - plateR, y: plateCy - plateR, w: plateD, h: plateD,
    fill: { color: COLORS.creamSoft },
    line: { color: COLORS.ink, width: 1.75 },
  });

  // 2x2 quadrants — render slightly inside the plate so they read as "on" the plate.
  // Each quadrant is half the plate (squareish), arranged 2x2.
  const qSize = 1.55; // each quadrant
  const qGap  = 0.04; // tiny gap between quadrants
  const halfQ = qSize + qGap / 2;
  // Top-left: Vegetables (green circle wedge represented as a circle that bleeds out)
  // To match the original look (a green oval over the top-left + orange square top-right + blue square bottom-left + pink square bottom-right + white center disc "Dairy"):
  const qTL_x = plateCx - halfQ;
  const qTL_y = plateCy - halfQ;
  const qTR_x = plateCx + qGap / 2;
  const qTR_y = plateCy - halfQ;
  const qBL_x = plateCx - halfQ;
  const qBL_y = plateCy + qGap / 2;
  const qBR_x = plateCx + qGap / 2;
  const qBR_y = plateCy + qGap / 2;

  // Top-right square (Fruits — orange)
  s.addShape(pres.shapes.RECTANGLE, {
    x: qTR_x, y: qTR_y, w: qSize, h: qSize,
    fill: { color: COLORS.orange }, line: { type: "none" },
  });
  // Bottom-left square (Grains — blue)
  s.addShape(pres.shapes.RECTANGLE, {
    x: qBL_x, y: qBL_y, w: qSize, h: qSize,
    fill: { color: COLORS.blue }, line: { type: "none" },
  });
  // Bottom-right square (Protein — pink)
  s.addShape(pres.shapes.RECTANGLE, {
    x: qBR_x, y: qBR_y, w: qSize, h: qSize,
    fill: { color: COLORS.pink }, line: { type: "none" },
  });
  // Top-left: a green disc (slightly bleeding outside the plate to mimic original)
  const vegD = 1.85;
  s.addShape(pres.shapes.OVAL, {
    x: plateCx - vegD - 0.05, y: plateCy - vegD - 0.05, w: vegD, h: vegD,
    fill: { color: COLORS.green }, line: { type: "none" },
  });

  // Center "Dairy" disc on top
  const dairyD = 0.95;
  s.addShape(pres.shapes.OVAL, {
    x: plateCx - dairyD / 2, y: plateCy - dairyD / 2, w: dairyD, h: dairyD,
    fill: { color: COLORS.cream },
    line: { color: COLORS.ink, width: 1.25 },
  });
  s.addText("Dairy", {
    x: plateCx - dairyD / 2, y: plateCy - dairyD / 2, w: dairyD, h: dairyD,
    fontFace: FONT_HEAD, fontSize: 13, bold: true,
    color: COLORS.ink, align: "center", valign: "middle", margin: 0,
  });

  // Quadrant labels
  s.addText("Vegetables", {
    x: plateCx - vegD - 0.05, y: plateCy - vegD + 0.35, w: vegD, h: 0.5,
    fontFace: FONT_HEAD, fontSize: 16, bold: true,
    color: COLORS.cream, align: "center", valign: "middle", margin: 0,
  });
  s.addText("Fruits", {
    x: qTR_x, y: qTR_y + 0.25, w: qSize, h: 0.5,
    fontFace: FONT_HEAD, fontSize: 16, bold: true,
    color: COLORS.ink, align: "center", valign: "middle", margin: 0,
  });
  s.addText("Grains", {
    x: qBL_x, y: qBL_y + qSize - 0.75, w: qSize, h: 0.5,
    fontFace: FONT_HEAD, fontSize: 16, bold: true,
    color: COLORS.cream, align: "center", valign: "middle", margin: 0,
  });
  s.addText("Protein", {
    x: qBR_x, y: qBR_y + qSize - 0.75, w: qSize, h: 0.5,
    fontFace: FONT_HEAD, fontSize: 16, bold: true,
    color: COLORS.cream, align: "center", valign: "middle", margin: 0,
  });

  // ----- Legend (right side) -----
  const legend = [
    { color: COLORS.green,  title: "Vegetables", desc: "Spinach, carrots, broccoli", swatchLine: false },
    { color: COLORS.orange, title: "Fruits",     desc: "Apples, berries, oranges",   swatchLine: false },
    { color: COLORS.blue,   title: "Grains",     desc: "Oats, rice, whole-wheat bread", swatchLine: false },
    { color: COLORS.pink,   title: "Protein",    desc: "Beans, eggs, lean meat",     swatchLine: false },
    { color: COLORS.cream,  title: "Dairy",      desc: "Milk, yogurt, cheese",       swatchLine: true },
  ];
  const legendX = 8.4;
  let legendY = 2.95;
  const rowH = 0.8;
  legend.forEach((row) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: legendX, y: legendY + 0.06, w: 0.32, h: 0.32,
      fill: { color: row.color },
      line: row.swatchLine
        ? { color: COLORS.ink, width: 0.75 }
        : { type: "none" },
    });
    s.addText(row.title, {
      x: legendX + 0.55, y: legendY - 0.03, w: 4, h: 0.45,
      fontFace: FONT_HEAD, fontSize: 18, bold: true,
      color: COLORS.ink, valign: "middle", margin: 0,
    });
    s.addText(row.desc, {
      x: legendX + 0.55, y: legendY + 0.36, w: 4.2, h: 0.4,
      fontFace: FONT_BODY, fontSize: 13,
      color: COLORS.inkSoft, valign: "middle", margin: 0,
    });
    legendY += rowH;
  });

  addFooter(s, 6);
}

// =======================================================================
// SLIDE 7 — Hydration (BLUE BG)
// =======================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.blue };

  addHeader(s, "06", "HYDRATION", "07", "08", {
    eyebrowColor: COLORS.cream,
    dotColor: COLORS.cream,
    pageColor: "DCE5EC",
    ruleColor: "9CB6CA",
  });

  // Left text block: "Water is the / quiet nutrient." (italic on quiet) and big "6–8"
  s.addText(
    [
      { text: "Water is the", options: { bold: true, color: COLORS.cream, fontFace: FONT_HEAD, breakLine: true } },
      { text: "quiet ", options: { italic: true, color: "E5DBC4", fontFace: "Georgia" } },
      { text: "nutrient.", options: { bold: true, color: COLORS.cream, fontFace: FONT_HEAD } },
    ],
    {
      x: 0.7, y: 1.7, w: 7.5, h: 2.3,
      fontSize: 60, valign: "top", margin: 0,
    }
  );

  // Big stat 6–8
  s.addText("6–8", {
    x: 0.7, y: 3.95, w: 4, h: 1.4,
    fontFace: FONT_HEAD, fontSize: 100, bold: true,
    color: COLORS.cream, valign: "top", margin: 0,
  });

  s.addText("CUPS OF WATER A DAY", {
    x: 0.7, y: 5.45, w: 6, h: 0.45,
    fontFace: FONT_HEAD, fontSize: 13, bold: true,
    color: "E0E8EE", charSpacing: 6,
    valign: "middle", margin: 0,
  });

  // ----- Right side: glass illustration -----
  // Glass: an open-topped rectangle with water level
  const glassX = 9.6;
  const glassY = 2.0;
  const glassW = 1.85;
  const glassH = 3.2;
  const wallT = 0.06; // wall thickness

  // Left wall
  s.addShape(pres.shapes.RECTANGLE, {
    x: glassX, y: glassY, w: wallT, h: glassH,
    fill: { color: COLORS.cream }, line: { type: "none" },
  });
  // Right wall
  s.addShape(pres.shapes.RECTANGLE, {
    x: glassX + glassW - wallT, y: glassY, w: wallT, h: glassH,
    fill: { color: COLORS.cream }, line: { type: "none" },
  });
  // Bottom
  s.addShape(pres.shapes.RECTANGLE, {
    x: glassX, y: glassY + glassH - wallT, w: glassW, h: wallT,
    fill: { color: COLORS.cream }, line: { type: "none" },
  });
  // Water (fills lower ~75%)
  const waterTop = glassY + glassH * 0.22;
  s.addShape(pres.shapes.RECTANGLE, {
    x: glassX + wallT, y: waterTop,
    w: glassW - 2 * wallT, h: glassH - (waterTop - glassY) - wallT,
    fill: { color: "DDE7EE" }, line: { type: "none" },
  });

  // Caption under glass — give it room so the line doesn't wrap
  s.addText("REFILL, NOT JUST REPLACE.", {
    x: glassX - 1.5, y: glassY + glassH + 0.25, w: glassW + 3.0, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 12, bold: true,
    color: COLORS.cream, charSpacing: 5,
    align: "center", valign: "middle", margin: 0,
  });

  addFooter(s, 7, { color: "DCE5EC" });
}

// =======================================================================
// SLIDE 8 — Wrap up (DARK BG)
// =======================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.charcoal };

  addHeader(s, "07", "WRAP UP", "08", "08", {
    eyebrowColor: COLORS.orange,
    dotColor: COLORS.orange,
    pageColor: "C9CCCB",
    ruleColor: COLORS.orange,
  });

  // Big closing line
  s.addText(
    [
      { text: "Eat the rainbow, drink", options: { bold: true, color: COLORS.cream, fontFace: FONT_HEAD, breakLine: true } },
      { text: "the water, ", options: { bold: true, color: COLORS.cream, fontFace: FONT_HEAD } },
      { text: "fuel the day.", options: { italic: true, color: COLORS.orange, fontFace: "Georgia" } },
    ],
    {
      x: 0.7, y: 1.2, w: 12, h: 2.6,
      fontSize: 54, valign: "top", margin: 0,
    }
  );

  // Three columns: NEXT CLASS / TRY AT HOME / BRING
  const cols = [
    { label: "NEXT CLASS",  body: "Reading a nutrition label." },
    { label: "TRY AT HOME", body: "Build one balanced plate this week." },
    { label: "BRING",       body: "A favorite snack to talk about." },
  ];
  const colW = 3.7;
  const colGap = 0.4;
  const colsTotalW = colW * 3 + colGap * 2;
  const colsStartX = (SLIDE_W - colsTotalW) / 2;
  const ruleY = 4.7;
  cols.forEach((c, i) => {
    const x = colsStartX + i * (colW + colGap);
    s.addShape(pres.shapes.LINE, {
      x, y: ruleY, w: colW, h: 0,
      line: { color: "5A5E5C", width: 0.75 },
    });
    s.addText(c.label, {
      x, y: ruleY + 0.15, w: colW, h: 0.4,
      fontFace: FONT_HEAD, fontSize: 13, bold: true,
      color: COLORS.orange, charSpacing: 5,
      valign: "middle", margin: 0,
    });
    s.addText(c.body, {
      x, y: ruleY + 0.65, w: colW, h: 1.2,
      fontFace: FONT_BODY, fontSize: 16,
      color: COLORS.cream, valign: "top", margin: 0,
    });
  });

  addFooter(s, 8, { color: "C9CCCB" });
}

// ---------- Write file ----------
pres
  .writeFile({ fileName: "/home/assets/Nutritionist-2-recreated.pptx" })
  .then((f) => console.log("Wrote:", f));
