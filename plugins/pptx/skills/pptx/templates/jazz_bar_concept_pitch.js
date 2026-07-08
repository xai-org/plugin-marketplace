// Cool Breeze — A Jazz Bar in New York
// PPTX recreation of Cool_Breeze.html using pptxgenjs

const pptxgen = require("pptxgenjs");

// ===== SETUP =====
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333" x 7.5"  (matches 1920x1080 aspect 16:9)
pres.title = "Cool Breeze — A Jazz Bar in New York";
pres.author = "Cool Breeze NYC";

const SLIDE_W = 13.333;
const SLIDE_H = 7.5;

// ===== COLORS (from CSS variables) =====
const C = {
  ink:        "0B0907",
  ink2:       "110D0A",
  ink3:       "1A1410",
  cream:      "F0E6D2",
  creamDim:   "C9BFA9",
  creamLow:   "6E6553",
  brass:      "C9A35C",
  brassDeep:  "8E6F33",
  ember:      "D8693A",
};

// ===== FONTS =====
// Use exact CSS font-family names; user has these installed.
const FONT = {
  display: "Limelight",                  // headings
  serif:   "Cormorant Garamond",         // body
  mono:    "JetBrains Mono",             // accent labels
};

// ===== LAYOUT METRICS =====
// Scale: HTML uses 80px top/bottom, 96px left/right at ~1920x1080.
// pad inset = 80px/96px → with 13.333" wide slide: 96px/1920 * 13.333 ≈ 0.667"
//   80px/1080 * 7.5  ≈ 0.556"
const PAD_X = 0.667;       // left/right inset for content
const PAD_Y = 0.556;       // top/bottom inset for content
const CHROME_TOP = 0.389;  // 56px from top → 56/1080*7.5
const CHROME_BOT = SLIDE_H - 0.389;
const MARK_TOP = 0.264;    // 38px → 38/1080*7.5
const MARK_BOT = SLIDE_H - 0.264;
const CHROME_LEFT = 0.667;
const CHROME_RIGHT = SLIDE_W - 0.667;

// ===== HELPERS =====
function addBackground(slide) {
  slide.background = { color: C.ink };
}

// Top + bottom thin brass rules (chrome).
// HTML uses linear-gradient transparent→brassDeep→transparent with very thin (1px) line.
// We approximate with a thin solid line; gradient tips would barely render.
function addChrome(slide) {
  // Top rule
  slide.addShape(pres.shapes.LINE, {
    x: CHROME_LEFT,
    y: CHROME_TOP,
    w: CHROME_RIGHT - CHROME_LEFT,
    h: 0,
    line: { color: C.brassDeep, width: 0.5 },
  });
  // Bottom rule
  slide.addShape(pres.shapes.LINE, {
    x: CHROME_LEFT,
    y: CHROME_BOT,
    w: CHROME_RIGHT - CHROME_LEFT,
    h: 0,
    line: { color: C.brassDeep, width: 0.5 },
  });
}

// 4 corner mono-sm marks
function addMarks(slide, tl, tr, bl, br) {
  const baseProps = {
    fontFace: FONT.mono,
    fontSize: 8,
    charSpacing: 4,        // ≈ 0.18em letter-spacing
    color: C.creamLow,
    h: 0.25,
    margin: 0,
  };
  const baseW = 4.0;
  // top-left
  slide.addText(tl, {
    ...baseProps, x: PAD_X, y: MARK_TOP - 0.07, w: baseW, align: "left",
  });
  // top-right (brass color per CSS)
  slide.addText(tr, {
    ...baseProps, color: C.brass, x: SLIDE_W - PAD_X - baseW, y: MARK_TOP - 0.07, w: baseW, align: "right",
  });
  // bottom-left
  slide.addText(bl, {
    ...baseProps, x: PAD_X, y: MARK_BOT - 0.18, w: baseW, align: "left",
  });
  // bottom-right
  slide.addText(br, {
    ...baseProps, x: SLIDE_W - PAD_X - baseW, y: MARK_BOT - 0.18, w: baseW, align: "right",
  });
}

// Photo block with subtle brass border (replicates .placeholder.photo)
function addPhoto(slide, imgPath, x, y, w, h) {
  // Border frame (very subtle, brass at low alpha — solid thin line approximates it)
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: C.ink },
    line: { color: C.brassDeep, width: 0.5 },
  });
  slide.addImage({
    path: imgPath,
    x: x + 0.02, y: y + 0.02, w: w - 0.04, h: h - 0.04,
    sizing: { type: "cover", w: w - 0.04, h: h - 0.04 },
  });
}

// ============================================================
// SLIDE 1 — COVER
// ============================================================
function buildCover() {
  const s = pres.addSlide();
  addBackground(s);
  addChrome(s);
  addMarks(s, "EST · MMXXVI", "NEW YORK CITY", "A LISTENING ROOM", "№ 01 / 09");

  // Eyebrow "A J A Z Z B A R" — wide tracking
  s.addText("A   J A Z Z   B A R", {
    x: 0, y: 1.7, w: SLIDE_W, h: 0.35,
    fontFace: FONT.mono, fontSize: 11, color: C.brass,
    charSpacing: 12,
    align: "center",
    margin: 0,
  });

  // COOL  (line 1)
  s.addText("COOL", {
    x: 0, y: 2.15, w: SLIDE_W, h: 1.3,
    fontFace: FONT.display, fontSize: 110, color: C.cream,
    align: "center", valign: "middle",
    charSpacing: 2,
    margin: 0,
  });

  // & ampersand (line 2) — brass, italic Cormorant
  s.addText("&", {
    x: 0, y: 3.4, w: SLIDE_W, h: 1.0,
    fontFace: FONT.serif, fontSize: 90, color: C.brass,
    italic: true,
    align: "center", valign: "middle",
    margin: 0,
  });

  // BREEZE (line 3)
  s.addText("BREEZE", {
    x: 0, y: 4.25, w: SLIDE_W, h: 1.3,
    fontFace: FONT.display, fontSize: 110, color: C.cream,
    align: "center", valign: "middle",
    charSpacing: 2,
    margin: 0,
  });

  // Brass rule under title
  s.addShape(pres.shapes.LINE, {
    x: SLIDE_W/2 - 1.0, y: 5.75, w: 2.0, h: 0,
    line: { color: C.brass, width: 0.75 },
  });

  // Tagline
  s.addText("Saxophone, six strings, & something stirred slowly.", {
    x: 0, y: 5.85, w: SLIDE_W, h: 0.45,
    fontFace: FONT.serif, fontSize: 22, color: C.creamDim,
    italic: true,
    align: "center",
    margin: 0,
  });
}

// ============================================================
// SLIDE 2 — STORY
// ============================================================
function buildStory() {
  const s = pres.addSlide();
  addBackground(s);
  addChrome(s);
  addMarks(s, "COOL BREEZE", "II · ORIGIN", "A LISTENING ROOM", "№ 02 / 09");

  const contentTop = PAD_Y + 0.4;
  const contentH = SLIDE_H - 2 * PAD_Y - 0.8;

  // Two columns: left text, right photo
  const colGap = 0.5;
  const leftW = (SLIDE_W - 2 * PAD_X - colGap) * 0.55;
  const leftX = PAD_X;
  const rightW = (SLIDE_W - 2 * PAD_X - colGap) * 0.45;
  const rightX = leftX + leftW + colGap;

  // section number
  s.addText("CHAPTER ONE", {
    x: leftX, y: contentTop + 0.4, w: leftW, h: 0.3,
    fontFace: FONT.mono, fontSize: 10, color: C.brass,
    charSpacing: 8, margin: 0,
  });

  // section title (with italic em) — keep on 2 visual lines
  s.addText([
    { text: "A place where the", options: { breakLine: true } },
    { text: "night ", options: {} },
    { text: "unspools", options: { italic: true, color: C.brass, fontFace: FONT.serif } },
    { text: ".", options: {} },
  ], {
    x: leftX, y: contentTop + 0.75, w: leftW, h: 2.0,
    fontFace: FONT.display, fontSize: 40, color: C.cream,
    valign: "top", margin: 0,
    paraSpaceAfter: 0,
  });

  // Body paragraphs
  s.addText(
    "Cool Breeze opened on a corner in New York with one quiet ambition: to build a room that listens back. Low ceilings, warm light, and a small stage close enough to feel the breath behind the reed.",
    {
      x: leftX, y: contentTop + 2.85, w: leftW - 0.4, h: 1.4,
      fontFace: FONT.serif, fontSize: 16, color: C.creamDim,
      paraSpaceAfter: 6, margin: 0,
    }
  );

  s.addText(
    "No televisions. No bottle service. Just two players, one bartender, and the soft rustle of ice meeting glass.",
    {
      x: leftX, y: contentTop + 4.3, w: leftW - 0.4, h: 0.85,
      fontFace: FONT.serif, fontSize: 16, color: C.creamDim,
      margin: 0,
    }
  );

  // Pull quote with brass left border
  s.addShape(pres.shapes.LINE, {
    x: leftX, y: contentTop + 5.25, w: 0, h: 0.85,
    line: { color: C.brass, width: 0.75 },
  });
  s.addText(
    "\"We wanted somewhere you could sit alone, order one drink, and stay until last call.\"",
    {
      x: leftX + 0.18, y: contentTop + 5.25, w: leftW - 0.5, h: 0.85,
      fontFace: FONT.serif, fontSize: 17, color: C.cream,
      italic: true, margin: 0,
    }
  );

  // Right photo
  addPhoto(s, "images/founder.png", rightX, contentTop + 0.4, rightW, contentH - 0.4);
}

// ============================================================
// SLIDE 3 — MUSIC
// ============================================================
function buildMusic() {
  const s = pres.addSlide();
  addBackground(s);
  addChrome(s);
  addMarks(s, "COOL BREEZE", "III · THE MUSIC", "REED & STRING", "№ 03 / 09");

  const contentTop = PAD_Y + 0.4;
  const innerW = SLIDE_W - 2 * PAD_X;

  // Header row: title (left) + lede (right)
  s.addText("CHAPTER TWO", {
    x: PAD_X, y: contentTop, w: 4.5, h: 0.3,
    fontFace: FONT.mono, fontSize: 10, color: C.brass,
    charSpacing: 8, margin: 0,
  });

  s.addText([
    { text: "Two voices.", options: { breakLine: true } },
    { text: "One ", options: {} },
    { text: "conversation", options: { italic: true, color: C.brass, fontFace: FONT.serif } },
    { text: ".", options: {} },
  ], {
    x: PAD_X, y: contentTop + 0.35, w: 6.5, h: 1.6,
    fontFace: FONT.display, fontSize: 48, color: C.cream,
    valign: "top", margin: 0,
  });

  // Right-side lede
  s.addText(
    "Our nightly bill is built around a single dialogue — the warm-bodied saxophone and the unhurried six-string — paired with a rotating cast of New York's finest sidemen.",
    {
      x: PAD_X + innerW - 4.5, y: contentTop + 0.6, w: 4.5, h: 1.5,
      fontFace: FONT.serif, fontSize: 15, color: C.creamDim,
      align: "right", margin: 0,
    }
  );

  // Two-column musician grid
  const gridY = contentTop + 2.25;
  const gridH = SLIDE_H - PAD_Y - 0.4 - gridY;
  const gap = 0.45;
  const colW = (innerW - gap) / 2;

  const cols = [
    {
      img: "images/saxophone.png",
      title: "The Saxophone",
      lineage: "In the spirit of · Grover Washington Jr.",
      copy: "Smooth, soulful, slow-burning. Tenor and soprano lines that lean into the groove rather than fight it — the kind of tone that pairs naturally with a low light and a tall glass.",
    },
    {
      img: "images/guitar.png",
      title: "The Guitar",
      lineage: "In the spirit of · Joe Pass",
      copy: "Clean, conversational, unaccompanied when it wants to be. Single-line phrasing and walking chords that hold the room together while the horn takes the long way home.",
    },
  ];

  const photoH = 1.7;
  cols.forEach((col, i) => {
    const cx = PAD_X + i * (colW + gap);
    addPhoto(s, col.img, cx, gridY, colW, photoH);

    s.addText(col.title, {
      x: cx, y: gridY + photoH + 0.1, w: colW, h: 0.45,
      fontFace: FONT.display, fontSize: 22, color: C.cream,
      margin: 0,
    });

    s.addText(col.lineage, {
      x: cx, y: gridY + photoH + 0.55, w: colW, h: 0.25,
      fontFace: FONT.mono, fontSize: 9, color: C.brass,
      charSpacing: 4, margin: 0,
    });

    s.addText(col.copy, {
      x: cx, y: gridY + photoH + 0.85, w: colW, h: 1.4,
      fontFace: FONT.serif, fontSize: 13, color: C.creamDim,
      margin: 0,
    });
  });
}

// ============================================================
// SLIDE 4 — COCKTAIL PROGRAM
// ============================================================
function buildProgram() {
  const s = pres.addSlide();
  addBackground(s);
  addChrome(s);
  addMarks(s, "COOL BREEZE", "IV · THE BAR", "TRADITION & INVENTION", "№ 04 / 09");

  const contentTop = PAD_Y + 0.4;
  const innerW = SLIDE_W - 2 * PAD_X;
  const colGap = 0.55;
  const leftW = (innerW - colGap) * 0.52;
  const leftX = PAD_X;
  const rightW = (innerW - colGap) * 0.48;
  const rightX = leftX + leftW + colGap;

  // Left content
  s.addText("CHAPTER THREE", {
    x: leftX, y: contentTop + 0.4, w: leftW, h: 0.3,
    fontFace: FONT.mono, fontSize: 10, color: C.brass,
    charSpacing: 8, margin: 0,
  });

  s.addText([
    { text: "The bar is its", options: { breakLine: true } },
    { text: "own ", options: {} },
    { text: "instrument", options: { italic: true, color: C.brass, fontFace: FONT.serif } },
    { text: ".", options: {} },
  ], {
    x: leftX, y: contentTop + 0.75, w: leftW, h: 1.7,
    fontFace: FONT.display, fontSize: 46, color: C.cream,
    valign: "top", margin: 0,
  });

  s.addText(
    "Two programs run in parallel behind our marble counter: a canon of pre-Prohibition classics built the way the books prescribe, and an experimental list that borrows from the pastry kitchen, the lab, and the garden.",
    {
      x: leftX, y: contentTop + 2.6, w: leftW - 0.2, h: 1.5,
      fontFace: FONT.serif, fontSize: 16, color: C.creamDim,
      margin: 0,
    }
  );

  s.addText(
    "Every drink is built to share a table with the music — no garnish that demands more attention than the soloist.",
    {
      x: leftX, y: contentTop + 4.15, w: leftW - 0.2, h: 1.0,
      fontFace: FONT.serif, fontSize: 16, color: C.creamDim,
      margin: 0,
    }
  );

  // Right: two pillar cards (image left, body right)
  const pillarH = (SLIDE_H - 2 * PAD_Y - 0.8 - 0.3) / 2;
  const pillars = [
    {
      img: "images/canon.png",
      num: "№ 01",
      title: "The Canon",
      copy: "Hand-cut ice. House orgeat. Vermouths kept cold and dated by the day. A Sazerac built the way it was built in 1859 — and an Old Fashioned poured at room temperature with a single, large rock.",
    },
    {
      img: "images/laboratory.png",
      num: "№ 02",
      title: "The Laboratory",
      copy: "Clarified milk punches. Fat-washed bourbons. Sous-vide infusions. Cordials pressed in-house from greenmarket fruit. Familiar shapes, unfamiliar interiors — the same trick a good standard pulls on the bandstand.",
    },
  ];

  pillars.forEach((p, i) => {
    const py = contentTop + 0.4 + i * (pillarH + 0.25);

    // Card frame
    s.addShape(pres.shapes.RECTANGLE, {
      x: rightX, y: py, w: rightW, h: pillarH,
      fill: { color: C.ink2 },
      line: { color: C.brassDeep, width: 0.5 },
    });

    // Image (left 38% of card)
    const imgW = rightW * 0.38;
    s.addImage({
      path: p.img,
      x: rightX, y: py, w: imgW, h: pillarH,
      sizing: { type: "cover", w: imgW, h: pillarH },
    });

    // Body
    const bodyX = rightX + imgW + 0.25;
    const bodyW = rightW - imgW - 0.45;

    s.addText(p.num, {
      x: rightX + rightW - 1.1, y: py + 0.18, w: 1.0, h: 0.25,
      fontFace: FONT.mono, fontSize: 9, color: C.brass,
      charSpacing: 4, align: "right", margin: 0,
    });

    s.addText(p.title, {
      x: bodyX, y: py + 0.45, w: bodyW, h: 0.55,
      fontFace: FONT.display, fontSize: 22, color: C.cream,
      margin: 0,
    });

    s.addText(p.copy, {
      x: bodyX, y: py + 1.05, w: bodyW, h: pillarH - 1.2,
      fontFace: FONT.serif, fontSize: 13, color: C.creamDim,
      margin: 0,
    });
  });
}

// ============================================================
// SLIDE 5 — MENU
// ============================================================
function buildMenu() {
  const s = pres.addSlide();
  addBackground(s);
  addChrome(s);
  addMarks(s, "COOL BREEZE", "V · A SHORT POUR", "SIX FROM THE LIST", "№ 05 / 09");

  const contentTop = PAD_Y + 0.4;
  const innerW = SLIDE_W - 2 * PAD_X;

  // Header
  s.addText("A SAMPLING", {
    x: PAD_X, y: contentTop, w: 4.5, h: 0.3,
    fontFace: FONT.mono, fontSize: 10, color: C.brass,
    charSpacing: 8, margin: 0,
  });

  s.addText([
    { text: "From ", options: {} },
    { text: "the list", options: { italic: true, color: C.brass, fontFace: FONT.serif } },
    { text: ".", options: {} },
  ], {
    x: PAD_X, y: contentTop + 0.35, w: 7.0, h: 1.0,
    fontFace: FONT.display, fontSize: 40, color: C.cream,
    valign: "top", margin: 0,
  });

  // Right tagline
  s.addText([
    { text: "PRINTED NIGHTLY", options: { breakLine: true } },
    { text: "SUBSTITUTIONS WELCOME", options: { breakLine: true } },
    { text: "NO TWO LISTS ALIKE", options: {} },
  ], {
    x: PAD_X + innerW - 3.5, y: contentTop + 0.3, w: 3.5, h: 1.1,
    fontFace: FONT.mono, fontSize: 9, color: C.creamLow,
    charSpacing: 6, align: "right", margin: 0, lineSpacingMultiple: 1.5,
  });

  // Drinks grid 3x2
  const drinks = [
    { name: "Grover's Lullaby",     price: "$ 18", method: "Canon · Stirred · Tenor-warm",                     desc: "Aged rye, brown-butter washed cognac, demerara, walnut bitters. Served over a single hand-cut rock." },
    { name: "Pass the Six",         price: "$ 17", method: "Canon · Built · Spirit-forward",                  desc: "Mezcal, dry vermouth, Salers, a whisper of Islay. Six clean notes, played in sequence." },
    { name: "Clarified Sunday",     price: "$ 19", method: "Laboratory · Milk Punch · 7-day clarification",   desc: "Bourbon, cold-brew, lapsang, citrus. Strained until it pours like spring water — drinks like a song fading out." },
    { name: "East 4th Sazerac",     price: "$ 19", method: "Canon · Stirred · Absinthe rinse",                desc: "Cognac, rye, Peychaud's, lemon oil. The 1859 build, with a New York address." },
    { name: "Garden, in B-flat",    price: "$ 17", method: "Laboratory · Shaken · Garden cordial",            desc: "Gin, sungold tomato cordial, basil oil, white balsamic. Bright, savory, drawn from the greenmarket." },
    { name: "Last Set",             price: "$ 18", method: "Laboratory · Carbonated · Bottle-aged",           desc: "Cognac, fino sherry, honey, citric. Bottled, rested, and pulled cold — the drink that closes the night." },
  ];

  const gridY = contentTop + 1.65;
  const gridGapX = 0.6;
  const gridGapY = 0.35;
  const gridColW = (innerW - gridGapX) / 2;
  const gridRowH = (SLIDE_H - PAD_Y - 0.4 - gridY - 2 * gridGapY) / 3;

  drinks.forEach((d, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const dx = PAD_X + col * (gridColW + gridGapX);
    const dy = gridY + row * (gridRowH + gridGapY);

    // name + price line (rich text in single textbox so they sit on same baseline)
    s.addText(d.name, {
      x: dx, y: dy, w: gridColW - 0.7, h: 0.5,
      fontFace: FONT.display, fontSize: 22, color: C.cream,
      margin: 0,
    });
    s.addText(d.price, {
      x: dx + gridColW - 0.7, y: dy + 0.12, w: 0.7, h: 0.35,
      fontFace: FONT.mono, fontSize: 11, color: C.brass,
      charSpacing: 6, align: "right", margin: 0,
    });

    // method
    s.addText(d.method, {
      x: dx, y: dy + 0.55, w: gridColW, h: 0.4,
      fontFace: FONT.mono, fontSize: 8, color: C.creamLow,
      charSpacing: 4, valign: "top", margin: 0,
    });

    // description
    s.addText(d.desc, {
      x: dx, y: dy + 0.95, w: gridColW - 0.05, h: gridRowH - 1.05,
      fontFace: FONT.serif, fontSize: 14, color: C.creamDim,
      italic: true, margin: 0,
    });

    // Bottom underline placed AFTER description with a gap (in the gutter between rows)
    s.addShape(pres.shapes.LINE, {
      x: dx, y: dy + gridRowH + gridGapY * 0.5, w: gridColW, h: 0,
      line: { color: C.brassDeep, width: 0.5 },
    });
  });
}

// ============================================================
// SLIDE 6 — ATMOSPHERE
// ============================================================
function buildAtmosphere() {
  const s = pres.addSlide();
  addBackground(s);
  addChrome(s);
  addMarks(s, "COOL BREEZE", "VI · THE ROOM", "FORTY-TWO SEATS · NO TELEVISIONS", "№ 06 / 09");

  const contentTop = PAD_Y + 0.4;
  const innerW = SLIDE_W - 2 * PAD_X;

  // Header
  s.addText("CHAPTER FOUR", {
    x: PAD_X, y: contentTop, w: 4.5, h: 0.3,
    fontFace: FONT.mono, fontSize: 10, color: C.brass,
    charSpacing: 8, margin: 0,
  });

  s.addText([
    { text: "The ", options: {} },
    { text: "room", options: { italic: true, color: C.brass, fontFace: FONT.serif } },
    { text: ".", options: {} },
  ], {
    x: PAD_X, y: contentTop + 0.35, w: 6.0, h: 1.1,
    fontFace: FONT.display, fontSize: 48, color: C.cream,
    valign: "top", margin: 0,
  });

  // Right lede
  s.addText(
    "Forty-two seats, one stage, candlelight on every table, and a marble bar that has heard every secret on the block.",
    {
      x: PAD_X + innerW - 4.2, y: contentTop + 0.5, w: 4.2, h: 1.0,
      fontFace: FONT.serif, fontSize: 15, color: C.creamDim,
      italic: true, align: "right", margin: 0,
    }
  );

  // Atmos grid: 3 columns, 2 rows. a1 spans both rows in col 1; a4 spans cols 2-3 in row 2.
  // grid-template-columns: 1.4fr 1fr 1fr ; rows 1fr 1fr
  const gridY = contentTop + 1.6;
  const gridH = SLIDE_H - PAD_Y - 0.4 - gridY;
  const gap = 0.18;
  const totalGridW = innerW;
  // 1.4 + 1 + 1 = 3.4 fractional units
  const unit = (totalGridW - 2 * gap) / 3.4;
  const col1W = unit * 1.4;
  const col2W = unit * 1.0;
  const col3W = unit * 1.0;
  const rowH = (gridH - gap) / 2;

  // a1: full-room.png — col1, rows 1-2
  addPhoto(s, "images/full-room.png",
    PAD_X, gridY, col1W, gridH);

  // top row col 2: marble-brass.png
  addPhoto(s, "images/marble-brass.png",
    PAD_X + col1W + gap, gridY, col2W, rowH);

  // top row col 3: candle-coupe.png
  addPhoto(s, "images/candle-coupe.png",
    PAD_X + col1W + gap + col2W + gap, gridY, col3W, rowH);

  // a4: banquette.png — bottom row spans cols 2-3
  addPhoto(s, "images/banquette.png",
    PAD_X + col1W + gap, gridY + rowH + gap, col2W + gap + col3W, rowH);
}

// ============================================================
// SLIDE 7 — SCHEDULE
// ============================================================
function buildSchedule() {
  const s = pres.addSlide();
  addBackground(s);
  addChrome(s);
  addMarks(s, "COOL BREEZE", "VII · THE WEEK", "TWO SETS NIGHTLY", "№ 07 / 09");

  const contentTop = PAD_Y + 0.4;
  const innerW = SLIDE_W - 2 * PAD_X;

  // Header
  s.addText("PROGRAMME", {
    x: PAD_X, y: contentTop, w: 4.5, h: 0.3,
    fontFace: FONT.mono, fontSize: 10, color: C.brass,
    charSpacing: 8, margin: 0,
  });

  s.addText([
    { text: "A ", options: {} },
    { text: "week", options: { italic: true, color: C.brass, fontFace: FONT.serif } },
    { text: ", twice nightly.", options: {} },
  ], {
    x: PAD_X, y: contentTop + 0.35, w: 8.0, h: 1.0,
    fontFace: FONT.display, fontSize: 38, color: C.cream,
    valign: "top", margin: 0,
  });

  // Right tagline
  s.addText([
    { text: "SETS AT 8 & 10:30", options: { breakLine: true } },
    { text: "NO COVER · ONE-DRINK MINIMUM", options: { breakLine: true } },
    { text: "RESERVATIONS RECOMMENDED", options: {} },
  ], {
    x: PAD_X + innerW - 4.2, y: contentTop + 0.3, w: 4.2, h: 1.1,
    fontFace: FONT.mono, fontSize: 9, color: C.creamLow,
    charSpacing: 6, align: "right", margin: 0, lineSpacingMultiple: 1.5,
  });

  // Schedule rows
  const rows = [
    { day: "Monday",     act: "Dark — the room rests.",                                                  time: "— —",                       tag: "Closed",          dark: true },
    { day: "Tuesday",    act: "Solo Guitar Sessions",     sub: "Resident · House Six-String",            time: "8:00 · 10:30",              tag: "Quiet Night" },
    { day: "Wednesday",  act: "The Reed & the String",    sub: "Sax · Guitar Duo",                       time: "8:00 · 10:30",              tag: "House Bill" },
    { day: "Thursday",   act: "Standards Night",          sub: "Trio · Guests Welcome to Sit In",        time: "8:00 · 10:30 · 12:30",      tag: "Open Sit-In" },
    { day: "Friday",     act: "Late-Night Quartet",       sub: "Sax · Guitar · Bass · Brushes",          time: "9:00 · 11:30 · 1:30",       tag: "Three Sets" },
    { day: "Saturday",   act: "Featured Guest Series",    sub: "Rotating Headliner — see calendar",      time: "9:00 · 11:30 · 1:30",       tag: "Headliner" },
    { day: "Sunday",     act: "Slow Sunday",              sub: "Solo Sax · Brunch & Negronis",           time: "2:00 · 5:00 · 8:00",        tag: "Day & Evening" },
  ];

  const tableY = contentTop + 1.6;
  const tableH = SLIDE_H - PAD_Y - 0.4 - tableY;
  const rowH = tableH / rows.length;

  // Column widths — needs to fit "Wednesday" without wrapping, time strings, and tag text
  const dayW = 1.7;
  const timeW = 2.2;
  const tagW = 1.7;
  const actW = innerW - dayW - timeW - tagW - 0.45; // gaps
  const dayX = PAD_X;
  const actX = dayX + dayW + 0.15;
  const timeX = actX + actW + 0.15;
  const tagX = timeX + timeW + 0.15;

  // top border
  s.addShape(pres.shapes.LINE, {
    x: PAD_X, y: tableY, w: innerW, h: 0,
    line: { color: C.brass, width: 0.75 },
  });

  rows.forEach((r, i) => {
    const ry = tableY + i * rowH;

    // Bottom border for row
    s.addShape(pres.shapes.LINE, {
      x: PAD_X, y: ry + rowH, w: innerW, h: 0,
      line: { color: C.brassDeep, width: 0.4 },
    });

    const dayColor = r.dark ? C.creamLow : C.cream;

    // Day
    s.addText(r.day, {
      x: dayX, y: ry, w: dayW, h: rowH,
      fontFace: FONT.display, fontSize: 20, color: dayColor,
      valign: "middle", margin: 0,
    });

    // Act + sub
    if (r.dark) {
      // Dark row uses mono uppercase styling for the act
      s.addText(r.act, {
        x: actX, y: ry, w: actW, h: rowH,
        fontFace: FONT.mono, fontSize: 9, color: C.creamLow,
        charSpacing: 6, valign: "middle", margin: 0,
      });
    } else if (r.sub) {
      s.addText([
        { text: r.act, options: { fontFace: FONT.serif, fontSize: 17, color: C.cream, italic: true, breakLine: true } },
        { text: r.sub, options: { fontFace: FONT.mono, fontSize: 8, color: C.creamLow, charSpacing: 6 } },
      ], {
        x: actX, y: ry, w: actW, h: rowH,
        valign: "middle", margin: 0,
        paraSpaceBefore: 0, paraSpaceAfter: 0,
      });
    } else {
      s.addText(r.act, {
        x: actX, y: ry, w: actW, h: rowH,
        fontFace: FONT.serif, fontSize: 17, color: C.cream, italic: true,
        valign: "middle", margin: 0,
      });
    }

    // Time
    s.addText(r.time, {
      x: timeX, y: ry, w: timeW, h: rowH,
      fontFace: FONT.mono, fontSize: 10, color: r.dark ? C.creamLow : C.brass,
      charSpacing: 3, valign: "middle", margin: 0,
    });

    // Tag (right-aligned)
    s.addText(r.tag, {
      x: tagX, y: ry, w: tagW, h: rowH,
      fontFace: FONT.mono, fontSize: 8, color: C.creamLow,
      charSpacing: 3, valign: "middle", align: "right", margin: 0,
    });
  });
}

// ============================================================
// SLIDE 8 — PRIVATE EVENTS
// ============================================================
function buildEvents() {
  const s = pres.addSlide();
  addBackground(s);
  addChrome(s);
  addMarks(s, "COOL BREEZE", "VIII · BUYOUTS & BOOKINGS", "FOR THE QUIETER OCCASIONS", "№ 08 / 09");

  const contentTop = PAD_Y + 0.4;
  const innerW = SLIDE_W - 2 * PAD_X;
  const colGap = 0.55;
  const leftW = (innerW - colGap) * 0.55;
  const leftX = PAD_X;
  const rightW = (innerW - colGap) * 0.45;
  const rightX = leftX + leftW + colGap;

  // Left: section
  s.addText("CHAPTER FIVE", {
    x: leftX, y: contentTop + 0.4, w: leftW, h: 0.3,
    fontFace: FONT.mono, fontSize: 10, color: C.brass,
    charSpacing: 8, margin: 0,
  });

  s.addText([
    { text: "Hold the ", options: {} },
    { text: "room", options: { italic: true, color: C.brass, fontFace: FONT.serif } },
    { text: "", options: { breakLine: true } },
    { text: "for an evening.", options: {} },
  ], {
    x: leftX, y: contentTop + 0.75, w: leftW, h: 1.9,
    fontFace: FONT.display, fontSize: 36, color: C.cream,
    valign: "top", margin: 0,
  });

  s.addText(
    "A small private space and a full buyout are both available. Each booking arrives with a curated bill and a dedicated bartender — we will build a list around your night.",
    {
      x: leftX, y: contentTop + 2.85, w: leftW - 0.2, h: 0.85,
      fontFace: FONT.serif, fontSize: 14, color: C.creamDim,
      margin: 0,
    }
  );

  // Numbered list — single text box for the whole list to ensure clean spacing
  const listY = contentTop + 3.85;
  const listH = SLIDE_H - PAD_Y - 0.4 - listY;
  const numColW = 0.85;

  // Numbers column — y positions chosen to sit on the title baseline of each item
  const numbers = ["№ 01", "№ 02", "№ 03"];
  const numYs = [listY + 0.07, listY + 0.95, listY + 1.84];
  numbers.forEach((n, idx) => {
    s.addText(n, {
      x: leftX, y: numYs[idx], w: numColW, h: 0.3,
      fontFace: FONT.mono, fontSize: 9, color: C.brass,
      charSpacing: 4, margin: 0,
    });
  });

  // The list items rendered as a single rich-text body
  s.addText([
    { text: "The Booth — up to 12 guests",
      options: { fontFace: FONT.display, fontSize: 13, color: C.cream, breakLine: true } },
    { text: "Tucked behind the bar, with its own service. Ideal for an anniversary, a closed deal, a quiet birthday.",
      options: { fontFace: FONT.serif, fontSize: 12, color: C.creamDim, breakLine: true, paraSpaceAfter: 8 } },

    { text: "Half Room — up to 28 guests",
      options: { fontFace: FONT.display, fontSize: 13, color: C.cream, breakLine: true } },
    { text: "The front section of the bar reserved, music still on. Standing or seated.",
      options: { fontFace: FONT.serif, fontSize: 12, color: C.creamDim, breakLine: true, paraSpaceAfter: 8 } },

    { text: "Full Buyout — up to 60 guests",
      options: { fontFace: FONT.display, fontSize: 13, color: C.cream, breakLine: true } },
    { text: "The whole house. Choose the players, build the menu, set the time.",
      options: { fontFace: FONT.serif, fontSize: 12, color: C.creamDim } },
  ], {
    x: leftX + numColW + 0.15, y: listY, w: leftW - numColW - 0.15, h: listH,
    valign: "top", margin: 0,
  });

  // Right photo
  const rightH = SLIDE_H - 2 * PAD_Y - 0.8;
  addPhoto(s, "images/booth.png", rightX, contentTop + 0.4, rightW, rightH - 0.4);
}

// ============================================================
// SLIDE 9 — FIND US
// ============================================================
function buildFind() {
  const s = pres.addSlide();
  addBackground(s);
  addChrome(s);
  addMarks(s, "COOL BREEZE", "IX · FIND US", "PRESS THE BELL · WE'LL ANSWER", "№ 09 / 09");

  const contentTop = PAD_Y + 0.4;
  const innerW = SLIDE_W - 2 * PAD_X;

  // Header
  s.addText("VISIT", {
    x: PAD_X, y: contentTop, w: 4.5, h: 0.3,
    fontFace: FONT.mono, fontSize: 10, color: C.brass,
    charSpacing: 8, margin: 0,
  });

  s.addText([
    { text: "Find the ", options: {} },
    { text: "door", options: { italic: true, color: C.brass, fontFace: FONT.serif } },
    { text: ".", options: {} },
  ], {
    x: PAD_X, y: contentTop + 0.35, w: 7.0, h: 1.0,
    fontFace: FONT.display, fontSize: 44, color: C.cream,
    valign: "top", margin: 0,
  });

  // Right tagline
  s.addText([
    { text: "UNMARKED ENTRANCE", options: { breakLine: true } },
    { text: "LOOK FOR THE BLUE LAMP", options: { breakLine: true } },
    { text: "RING ONCE", options: {} },
  ], {
    x: PAD_X + innerW - 4.2, y: contentTop + 0.3, w: 4.2, h: 1.1,
    fontFace: FONT.mono, fontSize: 9, color: C.creamLow,
    charSpacing: 6, align: "right", margin: 0, lineSpacingMultiple: 1.5,
  });

  // 3-column find-grid
  const gridY = contentTop + 1.7;
  const gap = 0.5;
  const colW = (innerW - 2 * gap) / 3;

  // ----- Block 1: Address -----
  const x1 = PAD_X;
  s.addText("ADDRESS", {
    x: x1, y: gridY, w: colW, h: 0.3,
    fontFace: FONT.mono, fontSize: 10, color: C.brass,
    charSpacing: 8, margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: x1, y: gridY + 0.32, w: colW, h: 0,
    line: { color: C.brassDeep, width: 0.4 },
  });
  s.addText("142 Bleecker", {
    x: x1, y: gridY + 0.45, w: colW, h: 0.55,
    fontFace: FONT.display, fontSize: 26, color: C.cream, margin: 0,
  });
  s.addText([
    { text: "Between Thompson & LaGuardia", options: { breakLine: true } },
    { text: "New York, NY 10012", options: {} },
  ], {
    x: x1, y: gridY + 1.05, w: colW, h: 0.85,
    fontFace: FONT.serif, fontSize: 15, color: C.creamDim, margin: 0,
  });
  s.addText("F · A · C · E TRAINS — W. 4TH", {
    x: x1, y: gridY + 1.95, w: colW, h: 0.3,
    fontFace: FONT.mono, fontSize: 9, color: C.brass,
    charSpacing: 6, margin: 0,
  });

  // ----- Block 2: Hours -----
  const x2 = x1 + colW + gap;
  s.addText("HOURS", {
    x: x2, y: gridY, w: colW, h: 0.3,
    fontFace: FONT.mono, fontSize: 10, color: C.brass,
    charSpacing: 8, margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: x2, y: gridY + 0.32, w: colW, h: 0,
    line: { color: C.brassDeep, width: 0.4 },
  });

  const hours = [
    { d: "Monday",    t: "Closed",         closed: true },
    { d: "Tue — Thu", t: "6 PM — 1 AM" },
    { d: "Friday",    t: "6 PM — 3 AM" },
    { d: "Saturday",  t: "6 PM — 3 AM" },
    { d: "Sunday",    t: "1 PM — 11 PM" },
  ];
  const hourLineY = gridY + 0.5;
  const hourLineH = 0.42;
  hours.forEach((h, i) => {
    const ly = hourLineY + i * hourLineH;
    s.addText(h.d, {
      x: x2, y: ly, w: colW * 0.5, h: hourLineH,
      fontFace: FONT.mono, fontSize: 10, color: C.creamDim,
      charSpacing: 4, valign: "middle", margin: 0,
    });
    s.addText(h.t, {
      x: x2 + colW * 0.5, y: ly, w: colW * 0.5, h: hourLineH,
      fontFace: FONT.mono, fontSize: 10, color: h.closed ? C.creamLow : C.creamDim,
      charSpacing: 4, valign: "middle", align: "right", margin: 0,
    });
    // Dashed under-rule (drawn as a thin solid line — pptxgenjs LINE supports dashType)
    if (i < hours.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: x2, y: ly + hourLineH, w: colW, h: 0,
        line: { color: C.brassDeep, width: 0.3, dashType: "dash" },
      });
    }
  });

  // ----- Block 3: Reservations -----
  const x3 = x2 + colW + gap;
  s.addText("RESERVATIONS", {
    x: x3, y: gridY, w: colW, h: 0.3,
    fontFace: FONT.mono, fontSize: 10, color: C.brass,
    charSpacing: 8, margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: x3, y: gridY + 0.32, w: colW, h: 0,
    line: { color: C.brassDeep, width: 0.4 },
  });
  s.addText("(212) 555-0142", {
    x: x3, y: gridY + 0.45, w: colW, h: 0.55,
    fontFace: FONT.display, fontSize: 26, color: C.cream, margin: 0,
  });
  s.addText("reserve@coolbreezenyc.com", {
    x: x3, y: gridY + 1.05, w: colW, h: 0.4,
    fontFace: FONT.serif, fontSize: 15, color: C.creamDim, margin: 0,
  });
  s.addText("@COOLBREEZE.NYC", {
    x: x3, y: gridY + 1.5, w: colW, h: 0.3,
    fontFace: FONT.mono, fontSize: 9, color: C.brass,
    charSpacing: 6, margin: 0,
  });
  s.addText("Walk-ins kept warm at the bar — first pour is on us if the wait runs long.", {
    x: x3, y: gridY + 1.9, w: colW, h: 1.0,
    fontFace: FONT.serif, fontSize: 13, color: C.creamLow,
    italic: true, margin: 0,
  });

  // ----- Footer sign quote -----
  const footY = SLIDE_H - PAD_Y - 1.0;
  s.addText([
    { text: "\"Stay until last call. The breeze is best after midnight.\"", options: { breakLine: true } },
    { text: "— THE HOUSE", options: { fontFace: FONT.display, color: C.brass, fontSize: 13, charSpacing: 6 } },
  ], {
    x: PAD_X, y: footY, w: innerW - 3.2, h: 0.9,
    fontFace: FONT.serif, fontSize: 16, color: C.creamDim,
    italic: true, margin: 0,
  });

  s.addText([
    { text: "COOL BREEZE · NYC", options: { breakLine: true } },
    { text: "EST · MMXXVI", options: {} },
  ], {
    x: PAD_X + innerW - 3.0, y: footY + 0.1, w: 3.0, h: 0.7,
    fontFace: FONT.mono, fontSize: 9, color: C.creamLow,
    charSpacing: 6, align: "right", margin: 0, lineSpacingMultiple: 1.4,
  });
}

// ===== BUILD =====
buildCover();
buildStory();
buildMusic();
buildProgram();
buildMenu();
buildAtmosphere();
buildSchedule();
buildEvents();
buildFind();

pres.writeFile({ fileName: "Cool_Breeze.pptx" }).then(fn => {
  console.log("Wrote:", fn);
});
