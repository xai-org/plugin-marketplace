// MAÍZ — una taquería · Ann Arbor 2027
// Recreates restaurant.pptx using pptxgenjs
//
// Usage:  node generate.js
// Output: restaurant.pptx   (same directory as this script)
//
// Assets are expected in ./assets/ (image-1-1.png, image-3-1.png, image-4-1.png .. image-9-1.png)

const pptxgen = require("pptxgenjs");
const path = require("path");

const ASSETS = path.join(__dirname, "assets");

// Palette
const CAL     = "EAE1D1"; // weathered lime-wash (cream)
const ANIL    = "2A4766"; // faded painted wall (navy)
const MASA    = "B4572A"; // toasted tortilla (terracotta)
const INK     = "1F1B16"; // near-black
const MUTED   = "4A3F33"; // warm gray

// Fonts
const HEAD = "Arial";      // bold/black sans used for headlines
const BODY = "Arial";      // body
const ITAL = "Georgia";    // serif italic for accent words (fraunces-ish)

const pres = new pptxgen();

// Custom layout to match the source deck (20" × 11.25", 16:9)
pres.defineLayout({ name: "MAIZ_WIDE", width: 20, height: 11.25 });
pres.layout  = "MAIZ_WIDE";
pres.title   = "MAÍZ — una taquería";
pres.author  = "MAÍZ";
pres.company = "MAÍZ Ann Arbor";

const W = 20;
const H = 11.25;

// ---------- helpers ----------
const eyebrow = (slide, num, label, color = MASA) => {
  slide.addText(
    [
      { text: num,      options: { color, bold: true } },
      { text: "  ·  ",  options: { color: color } },
      { text: label,    options: { color } },
    ],
    {
      x: 1.25, y: 0.83, w: 10, h: 0.45,
      fontFace: BODY, fontSize: 18, charSpacing: 8, margin: 0,
    }
  );
};

// ---------- SLIDE 1 — Cover ----------
{
  const s = pres.addSlide();
  s.background = { color: CAL };

  // Navy top band with wavy bottom (embedded image recreates the hand-drawn curve)
  s.addImage({
    path: path.join(ASSETS, "image-1-1.png"),
    x: 0, y: 0, w: W, h: 2.29,
  });

  // Eyebrow on navy band
  s.addText("ANN ARBOR  ·  A VISION", {
    x: 1.25, y: 0.83, w: 12, h: 0.45,
    fontFace: BODY, fontSize: 18, color: CAL,
    charSpacing: 8, margin: 0,
  });

  // MAÍZ big title
  s.addText("MAÍZ", {
    x: 1.25, y: 3.55, w: 18.0, h: 4.0,
    fontFace: HEAD, fontSize: 330, bold: true, color: ANIL,
    charSpacing: -40, margin: 0,
  });

  // "— una taquería —" tilted slightly (rot = -1.2°)
  s.addText([
    { text: "—  ",          options: { bold: true, color: MASA } },
    { text: "una taquería", options: { bold: true, italic: true, color: MASA } },
    { text: "  —",          options: { bold: true, color: MASA } },
  ], {
    x: 1.56, y: 7.87, w: 17.7, h: 1.31,
    fontFace: ITAL, fontSize: 72, rotate: -1.2, margin: 0,
  });

  // Right-bottom stamp "hecho a mano / EST. 2027"
  s.addText([
    { text: "hecho a",  options: { bold: true, color: MASA, breakLine: true } },
    { text: "mano",     options: { bold: true, color: MASA } },
  ], {
    x: 17.4, y: 9.15, w: 2.2, h: 1.0,
    fontFace: BODY, fontSize: 22, margin: 0,
  });
  s.addText("EST. 2027", {
    x: 17.4, y: 10.25, w: 2.2, h: 0.4,
    fontFace: BODY, fontSize: 14, color: INK, charSpacing: 6, margin: 0,
  });
}

// ---------- SLIDE 2 — The Name ----------
{
  const s = pres.addSlide();
  s.background = { color: CAL };
  eyebrow(s, "01", "THE NAME");

  // Giant MAÍZ
  s.addText("MAÍZ", {
    x: 1.25, y: 1.55, w: 10.5, h: 3.9,
    fontFace: HEAD, fontSize: 260, bold: true, color: ANIL,
    charSpacing: -30, margin: 0,
  });

  // Pronunciation line
  s.addText([
    { text: "/ MA·ˈIS / ", options: { color: INK } },
    { text: "N.",          options: { bold: true, color: MASA } },
    { text: " SPANISH, CORN.", options: { color: INK } },
  ], {
    x: 1.25, y: 5.55, w: 10, h: 0.6,
    fontFace: BODY, fontSize: 22, margin: 0,
  });

  // Right side: headline + three rows
  s.addText("One word. Says what we are.", {
    x: 11.0, y: 2.15, w: 8.0, h: 0.8,
    fontFace: ITAL, fontSize: 28, bold: true, italic: true, color: INK, margin: 0,
  });
  // Divider under headline
  s.addShape(pres.shapes.LINE, {
    x: 11.0, y: 3.25, w: 8.0, h: 0,
    line: { color: INK, width: 0.75 },
  });

  const rows = [
    ["01", "The soul of every dish. If we can't make it, we don't serve it."],
    ["02", "Quiet wink at maize & blue — home, not costume."],
    ["03", "Pronounceable. Memorable. Fits on an awning."],
  ];
  let ry = 3.5;
  rows.forEach(([num, text], i) => {
    s.addText(num, {
      x: 11.0, y: ry, w: 0.9, h: 0.6,
      fontFace: BODY, fontSize: 18, color: MASA, margin: 0,
    });
    s.addText(text, {
      x: 12.0, y: ry, w: 7.1, h: 0.9,
      fontFace: BODY, fontSize: 18, color: INK, margin: 0,
    });
    ry += 1.25;
    if (i < rows.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: 11.0, y: ry - 0.25, w: 8.0, h: 0,
        line: { color: INK, width: 0.5 },
      });
    }
  });
}

// ---------- SLIDE 3 — The Vision ----------
{
  const s = pres.addSlide();
  s.background = { color: ANIL };
  eyebrow(s, "02", "THE VISION", MASA);

  // Big headline (mixed cream + masa italic)
  s.addText([
    { text: "A tortilla shop ", options: { color: CAL } },
    { text: "first.",           options: { color: MASA, italic: true, bold: true } },
    { text: "  A restaurant ",  options: { color: CAL } },
    { text: "second.",          options: { color: MASA, italic: true, bold: true } },
  ], {
    x: 1.25, y: 2.0, w: 10.5, h: 5.0,
    fontFace: HEAD, fontSize: 72, bold: true, margin: 0,
  });

  // Concentric "target" image
  s.addImage({
    path: path.join(ASSETS, "image-3-1.png"),
    x: 12.8, y: 2.65, w: 3.3, h: 3.3,
  });

  // Caption paragraph under target, right column
  s.addText(
    "Nixtamalized corn, stone-ground each morning, pressed and cooked to order. Everything else is built to make that tortilla look good.",
    {
      x: 11.3, y: 6.25, w: 6.7, h: 2.4,
      fontFace: BODY, fontSize: 20, bold: true, italic: true, color: "9AA5B3", margin: 0,
    }
  );
}

// ---------- SLIDE 4 — The Menu ----------
{
  const s = pres.addSlide();
  s.background = { color: CAL };
  eyebrow(s, "03", "THE MENU");

  // Right eyebrow
  s.addText("FOUR FORMATS  ·  ONE FOUNDATION", {
    x: 10.5, y: 0.83, w: 8.25, h: 0.45,
    fontFace: BODY, fontSize: 16, color: INK, align: "right",
    charSpacing: 6, margin: 0,
  });

  // Headline
  s.addText([
    { text: "Everything orbits the ", options: { color: ANIL } },
    { text: "tortilla",               options: { color: MASA, italic: true } },
    { text: ".",                      options: { color: ANIL } },
  ], {
    x: 1.25, y: 1.75, w: 18, h: 1.4,
    fontFace: HEAD, fontSize: 62, bold: true, margin: 0,
  });

  // Four cards
  const cards = [
    { img: "image-4-1.png", name: "Tacos",      tag: "the starting point", body: "Small, two to an order. Fold once, eat over the plate." },
    { img: "image-4-2.png", name: "Quesadillas", tag: "masa + queso",       body: "Thick masa, pressed around cheese and one good thing." },
    { img: "image-4-3.png", name: "Sopes",      tag: "pinched & piled",    body: "Thick disc, raised rim. Beans, crema, cotija. Underrated." },
    { img: "image-4-4.png", name: "Gorditas",   tag: "split & stuffed",    body: "Puffed on the comal, split open, stuffed." },
  ];
  const cardTop = 3.8;
  const cardH   = 6.55;
  const cardW   = 4.15;
  const gap     = 0.2;
  const firstX  = 1.25;

  cards.forEach((c, i) => {
    const cx = firstX + i * (cardW + gap);

    // card background
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardTop, w: cardW, h: cardH,
      fill: { color: "F3ECDC" },
      line: { color: "F3ECDC", width: 0 },
    });

    // illustration
    s.addImage({
      path: path.join(ASSETS, c.img),
      x: cx + 0.3, y: cardTop + 0.3, w: cardW - 0.6, h: 1.8,
      sizing: { type: "contain", w: cardW - 0.6, h: 1.8 },
    });

    // name
    s.addText(c.name, {
      x: cx + 0.4, y: cardTop + 2.35, w: cardW - 0.8, h: 0.7,
      fontFace: HEAD, fontSize: 30, bold: true, color: ANIL, margin: 0,
    });
    // tag
    s.addText(c.tag, {
      x: cx + 0.4, y: cardTop + 3.05, w: cardW - 0.8, h: 0.55,
      fontFace: HEAD, fontSize: 22, bold: true, color: MASA, margin: 0,
    });
    // body (bottom aligned)
    s.addText(c.body, {
      x: cx + 0.4, y: cardTop + 5.05, w: cardW - 0.8, h: 1.3,
      fontFace: BODY, fontSize: 16, color: INK, margin: 0,
    });
  });
}

// ---------- SLIDE 5 — Aesthetic ----------
{
  const s = pres.addSlide();
  s.background = { color: CAL };
  eyebrow(s, "04", "AESTHETIC");

  // Headline
  s.addText([
    { text: "Like a ",      options: { color: ANIL } },
    { text: "puestito ",    options: { color: MASA, italic: true } },
    { text: ", not a postcard.", options: { color: ANIL } },
  ], {
    x: 1.25, y: 1.75, w: 18, h: 1.4,
    fontFace: HEAD, fontSize: 62, bold: true, margin: 0,
  });

  // Left column: THE FEELING
  s.addText("THE FEELING", {
    x: 1.25, y: 4.15, w: 6.0, h: 0.45,
    fontFace: BODY, fontSize: 16, color: INK, charSpacing: 6, margin: 0,
  });

  const feelings = [
    ["✓", "weathered paint  ·  concrete  ·  plywood", MASA],
    ["✓", "hand-lettered signs  ·  chalkboard menus",   MASA],
    ["✓", "honest lighting, scuffed stools, loud kitchen", MASA],
    ["✕", "sombrero kitsch",          INK],
    ["✕", "rainbow serape everything", INK],
    ["✕", "neon, gradients, \"fun\" fonts", INK],
  ];
  let fy = 4.85;
  feelings.forEach(([glyph, text, glyphColor]) => {
    s.addText(glyph, {
      x: 1.25, y: fy, w: 0.6, h: 0.55,
      fontFace: BODY, fontSize: 22, bold: true, color: glyphColor, margin: 0,
    });
    s.addText(text, {
      x: 1.95, y: fy, w: 7.5, h: 0.55,
      fontFace: BODY, fontSize: 20, color: INK, margin: 0,
    });
    fy += 0.72;
  });

  // Right column: THREE COLORS. THAT'S IT.
  s.addText("THREE COLORS. THAT'S IT.", {
    x: 10.5, y: 4.15, w: 8.25, h: 0.45,
    fontFace: BODY, fontSize: 16, color: INK, charSpacing: 6, margin: 0,
  });

  const swatches = [
    { bg: CAL,  name: "cal",  sub: "weathered lime-wash", code: "#EAE1D1", fg: INK,  subFg: MUTED },
    { bg: ANIL, name: "añil", sub: "faded painted wall",  code: "#2A4766", fg: CAL,  subFg: "C7CED8" },
    { bg: MASA, name: "masa", sub: "toasted tortilla",    code: "#B4572A", fg: CAL,  subFg: "F1D9C6" },
  ];
  let sy = 4.85;
  const swX = 10.5;
  const swW = 8.25;
  const swH = 1.3;
  swatches.forEach((sw) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: swX, y: sy, w: swW, h: swH,
      fill: { color: sw.bg },
      line: { color: sw.bg, width: 0 },
    });
    s.addText(sw.name, {
      x: swX + 0.35, y: sy + 0.15, w: 4, h: 0.6,
      fontFace: HEAD, fontSize: 26, bold: true, color: sw.fg, margin: 0,
    });
    s.addText(sw.sub, {
      x: swX + 0.35, y: sy + 0.72, w: 5, h: 0.4,
      fontFace: BODY, fontSize: 14, color: sw.subFg, margin: 0,
    });
    s.addText(sw.code, {
      x: swX + swW - 2.0, y: sy + 0.4, w: 1.8, h: 0.5,
      fontFace: BODY, fontSize: 18, color: sw.fg, align: "right", margin: 0,
    });
    sy += swH + 0.08;
  });

  // Font row
  s.addShape(pres.shapes.RECTANGLE, {
    x: swX, y: sy, w: swW, h: 0.95,
    fill: { color: "F3ECDC" },
    line: { color: "F3ECDC", width: 0 },
  });
  s.addText([
    { text: "Fraunces",  options: { bold: true, color: ANIL } },
    { text: "     " },
    { text: "+ Caveat",  options: { bold: true, color: MASA } },
    { text: "     " },
    { text: "+ DM MONO", options: { color: INK } },
  ], {
    x: swX + 0.35, y: sy + 0.15, w: swW - 0.5, h: 0.65,
    fontFace: BODY, fontSize: 20, margin: 0,
  });
}

// ---------- SLIDE 6 — Location ----------
{
  const s = pres.addSlide();
  s.background = { color: ANIL };
  eyebrow(s, "05", "LOCATION", MASA);

  // Headline
  s.addText([
    { text: "Ann Arbor has a ",  options: { color: CAL } },
    { text: "masa-shaped",        options: { color: MASA, italic: true } },
    { text: " hole in it.",       options: { color: CAL } },
  ], {
    x: 1.25, y: 1.75, w: 18, h: 1.4,
    fontFace: HEAD, fontSize: 62, bold: true, margin: 0,
  });

  // Left: three big stats
  const stats = [
    ["0",      "spots in town making nixtamal tortillas in-house today."],
    ["~124k",  "residents + ~52k students — well-traveled, adventurous palates."],
    ["45 min", "to the nearest real taquería. Too far for a Tuesday."],
  ];
  let sty = 4.5;
  stats.forEach(([num, desc]) => {
    s.addText(num, {
      x: 1.25, y: sty, w: 7, h: 1.1,
      fontFace: HEAD, fontSize: 64, bold: true, color: MASA, margin: 0,
    });
    s.addText(desc, {
      x: 1.25, y: sty + 1.05, w: 7, h: 0.75,
      fontFace: BODY, fontSize: 16, color: "C7CED8", margin: 0,
    });
    sty += 2.1;
  });

  // Right: target-zone panel
  const px = 10.5, py = 4.4, pw = 8.25, ph = 6.3;
  s.addShape(pres.shapes.RECTANGLE, {
    x: px, y: py, w: pw, h: ph,
    fill: { color: CAL }, line: { color: CAL, width: 0 },
  });
  s.addText("TARGET ZONE", {
    x: px + 0.4, y: py + 0.35, w: pw - 0.8, h: 0.45,
    fontFace: BODY, fontSize: 16, bold: true, color: MASA, charSpacing: 6, margin: 0,
  });
  s.addText("Kerrytown  ·  Main  ·  State", {
    x: px + 0.4, y: py + 0.85, w: pw - 0.8, h: 0.75,
    fontFace: HEAD, fontSize: 32, bold: true, color: ANIL, margin: 0,
  });
  // Map illustration
  s.addImage({
    path: path.join(ASSETS, "image-6-1.png"),
    x: px + 0.4, y: py + 1.85, w: pw - 0.8, h: 2.7,
    sizing: { type: "contain", w: pw - 0.8, h: 2.7 },
  });
  s.addText("Walkable. Market close.", {
    x: px + 0.4, y: py + 5.3, w: pw - 0.8, h: 0.5,
    fontFace: BODY, fontSize: 16, color: INK, margin: 0,
  });
}

// ---------- SLIDE 7 — The Space ----------
{
  const s = pres.addSlide();
  s.background = { color: CAL };
  eyebrow(s, "06", "THE SPACE");

  // Headline
  s.addText([
    { text: "Small room. ", options: { color: ANIL } },
    { text: "Loud comal.",  options: { color: MASA, italic: true } },
  ], {
    x: 1.25, y: 1.75, w: 18, h: 1.4,
    fontFace: HEAD, fontSize: 62, bold: true, margin: 0,
  });

  // Left: Floor plan card
  const fx = 1.05, fy = 3.6, fw = 9.2, fh = 7.05;
  s.addShape(pres.shapes.RECTANGLE, {
    x: fx, y: fy, w: fw, h: fh,
    fill: { color: "F3ECDC" }, line: { color: "F3ECDC", width: 0 },
  });
  s.addText("FLOOR PLAN  ·  ~1,400 SQ FT  ·  36 SEATS", {
    x: fx + 0.4, y: fy + 0.3, w: fw - 0.8, h: 0.45,
    fontFace: BODY, fontSize: 16, bold: true, color: MASA, charSpacing: 6, margin: 0,
  });
  s.addImage({
    path: path.join(ASSETS, "image-7-1.png"),
    x: fx + 0.4, y: fy + 0.9, w: fw - 0.8, h: 5.95,
    sizing: { type: "contain", w: fw - 0.8, h: 5.95 },
  });

  // Right: 4 features with thin separators (masa color)
  const featX = 11.25;
  const featW = 7.5;
  const features = [
    ["Open kitchen.",     "The tortilla press is visible from every seat."],
    ["Counter service.",  "Fast, honest, ~$18 per head."],
    ["Salsa bar.",        "Ten salsas, numbered by heat. Help yourself, generously."],
    ["Music, loud.",      "Cumbia, banda, a little Selena. You lean in to talk."],
  ];
  let fty = 3.6;
  // top separator
  s.addShape(pres.shapes.LINE, {
    x: featX, y: fty, w: featW, h: 0,
    line: { color: MASA, width: 0.75 },
  });
  features.forEach(([head, sub]) => {
    s.addText(head, {
      x: featX, y: fty + 0.2, w: featW, h: 0.6,
      fontFace: HEAD, fontSize: 26, bold: true, italic: true, color: ANIL, margin: 0,
    });
    s.addText(sub, {
      x: featX, y: fty + 0.85, w: featW, h: 0.55,
      fontFace: BODY, fontSize: 16, color: INK, margin: 0,
    });
    fty += 1.65;
    s.addShape(pres.shapes.LINE, {
      x: featX, y: fty, w: featW, h: 0,
      line: { color: MASA, width: 0.5 },
    });
  });
}

// ---------- SLIDE 8 — Timeline ----------
{
  const s = pres.addSlide();
  s.background = { color: CAL };
  eyebrow(s, "07", "TIMELINE");

  // Headline
  s.addText([
    { text: "From masa to ", options: { color: ANIL } },
    { text: "doors open.",   options: { color: MASA, italic: true } },
  ], {
    x: 1.25, y: 1.75, w: 18, h: 1.4,
    fontFace: HEAD, fontSize: 62, bold: true, margin: 0,
  });

  // Horizontal timeline at y = 7.0
  const lineY = 7.1;
  const leftX = 1.6;
  const rightX = 18.4;
  s.addShape(pres.shapes.LINE, {
    x: leftX, y: lineY, w: rightX - leftX, h: 0,
    line: { color: INK, width: 0.75 },
  });

  // Five milestones
  const steps = [
    { x: 2.85,  above: true,  q: "Q2–Q3  ·  2026", title: "Recipes & brand",  body: "Sourcing heirloom corn. Testing nixtamal. Logo, voice, menu v1." },
    { x: 6.35,  above: false, q: "Q4  ·  2026",   title: "Location & lease", body: "Scout Main St & Kerrytown. Sign lease. Permits." },
    { x: 10.0,  above: true,  q: "Q1–Q2  ·  2027",title: "Build-out",        body: "Kitchen, tile, mural, sign. Hire kitchen lead." },
    { x: 13.6,  above: false, q: "Q3  ·  2027",   title: "Soft open",        body: "Friends, family, neighbors. Feedback, calibration." },
    { x: 17.2,  above: true,  q: "Q4  ·  2027",   title: "Grand open",       body: "First round of tacos on the house.", grand: true },
  ];

  steps.forEach((st) => {
    // stem line
    const stemH = 1.4;
    const stemY = st.above ? lineY - stemH : lineY;
    s.addShape(pres.shapes.LINE, {
      x: st.x, y: stemY, w: 0, h: stemH,
      line: { color: INK, width: 0.5 },
    });
    // dot
    const dotSize = 0.3;
    const isLast = !!st.grand;
    s.addShape(pres.shapes.OVAL, {
      x: st.x - dotSize / 2, y: lineY - dotSize / 2, w: dotSize, h: dotSize,
      fill: { color: isLast ? ANIL : MASA },
      line: { color: MASA, width: isLast ? 2.5 : 0 },
    });

    // text block - for above items, stack bottom-up so text ends near the stem top
    const blockH = 2.2;
    const blockW = 3.4;
    const bx = st.x - blockW / 2;
    const by = st.above ? stemY - blockH - 0.05 : lineY + stemH + 0.15;

    if (st.above) {
      // Bottom-up layout: body at bottom, title above, quarter on top
      if (isLast) {
        s.addText(st.q, {
          x: bx, y: by + 0.1, w: blockW, h: 0.45,
          fontFace: BODY, fontSize: 16, color: MASA, align: "center", margin: 0,
        });
        s.addText([
          { text: "Grand open", options: { color: MASA, breakLine: true } },
          { text: "¡pásale!",   options: { color: MASA, italic: true } },
        ], {
          x: bx, y: by + 0.55, w: blockW, h: 1.1,
          fontFace: HEAD, fontSize: 24, bold: true, align: "center", margin: 0,
        });
        s.addText(st.body, {
          x: bx, y: by + 1.65, w: blockW, h: 0.5,
          fontFace: BODY, fontSize: 16, color: INK, align: "center", margin: 0,
        });
      } else {
        s.addText(st.q, {
          x: bx, y: by + 0.1, w: blockW, h: 0.45,
          fontFace: BODY, fontSize: 16, color: MASA, align: "center", margin: 0,
        });
        s.addText(st.title, {
          x: bx, y: by + 0.55, w: blockW, h: 0.55,
          fontFace: HEAD, fontSize: 24, bold: true, color: ANIL, align: "center", margin: 0,
        });
        s.addText(st.body, {
          x: bx, y: by + 1.2, w: blockW, h: 1.0,
          fontFace: BODY, fontSize: 16, color: INK, align: "center", margin: 0,
        });
      }
    } else {
      // Below the line: normal top-down
      s.addText(st.q, {
        x: bx, y: by, w: blockW, h: 0.45,
        fontFace: BODY, fontSize: 16, color: MASA, align: "center", margin: 0,
      });
      s.addText(st.title, {
        x: bx, y: by + 0.45, w: blockW, h: 0.55,
        fontFace: HEAD, fontSize: 24, bold: true, color: ANIL, align: "center", margin: 0,
      });
      s.addText(st.body, {
        x: bx, y: by + 1.1, w: blockW, h: 1.0,
        fontFace: BODY, fontSize: 16, color: INK, align: "center", margin: 0,
      });
    }
  });
}

// ---------- SLIDE 9 — What Now ----------
{
  const s = pres.addSlide();
  s.background = { color: ANIL };

  // Faint concentric motif in background
  s.addImage({
    path: path.join(ASSETS, "image-9-1.png"),
    x: 12.5, y: 2.5, w: 9, h: 9,
    transparency: 60,
  });

  eyebrow(s, "08", "WHAT NOW", MASA);

  // Big headline
  s.addText([
    { text: "Tell me what ", options: { color: CAL } },
    { text: "lands.",        options: { color: MASA, italic: true } },
  ], {
    x: 1.25, y: 2.2, w: 18, h: 2.2,
    fontFace: HEAD, fontSize: 120, bold: true, margin: 0,
  });

  // Body
  s.addText(
    "What gets you excited. What makes you wince. Who you know I should talk to — chefs, designers, landlords, neighbors.",
    {
      x: 1.25, y: 6.35, w: 10.5, h: 1.6,
      fontFace: BODY, fontSize: 22, color: "C7CED8", margin: 0,
    }
  );

  // Bottom-left brand mark
  s.addText("MAÍZ", {
    x: 1.25, y: 9.4, w: 4, h: 0.5,
    fontFace: BODY, fontSize: 18, bold: true, color: MASA, charSpacing: 6, margin: 0,
  });
  s.addText("una taquería  ·  ann arbor  ·  2027", {
    x: 1.25, y: 9.85, w: 8, h: 0.55,
    fontFace: BODY, fontSize: 20, italic: true, bold: true, color: CAL, margin: 0,
  });

  // ¡gracias!
  s.addText("¡gracias!", {
    x: 13.5, y: 9.35, w: 5.5, h: 1.0,
    fontFace: HEAD, fontSize: 60, bold: true, italic: true, color: MASA,
    align: "right", margin: 0,
  });
}

// ---------- write ----------
pres.writeFile({ fileName: path.join(__dirname, "restaurant.pptx") })
  .then((f) => console.log("Wrote:", f));
