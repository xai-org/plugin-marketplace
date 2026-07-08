// Recreate "Book_Shop__6_.pptx" — The Reading Room
// Run: node build.js
// Requires: npm install pptxgenjs
// The "images/" folder must contain image-1-1.png ... image-7-1.png
// (the seven illustrations extracted from the original deck).

const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";          // 13.333" x 7.5" (16:9)
pres.title  = "The Reading Room";
pres.author = "The Reading Room";

// =============================================================
// Color palette (sampled from the original deck)
// =============================================================
const BG       = "F4ECE2";   // warm cream background
const INK      = "1F1A17";   // near-black title color
const ACCENT   = "C97B6E";   // dusty terracotta / coral
const ACCENT_D = "B25A4D";   // deeper terracotta
const MUTED    = "8C5A4A";   // brown body text
const SUBTLE   = "C8A99E";   // very muted brown for fine rules
const CARD_BG  = "EFE0D2";   // slightly darker cream for the card on slide 8

// Common geometry helpers
const SLIDE_W = 13.333;
const SLIDE_H = 7.5;

const IMG = (n) => path.join(__dirname, "images", `image-${n}-1.png`);

// =============================================================
// Repeated chrome — header bar + footer with RR monogram
// =============================================================
function addHeader(slide, opts) {
  const left = opts.left || "THE READING ROOM";
  const right = opts.right || "";
  const showLeftBullet = opts.showLeftBullet !== false;

  // Top-left bullet dot
  if (showLeftBullet) {
    slide.addShape(pres.shapes.OVAL, {
      x: 0.83, y: 0.45, w: 0.07, h: 0.07,
      fill: { color: ACCENT }, line: { type: "none" }
    });
  }

  // Left header text
  slide.addText(left, {
    x: 0.99, y: 0.39, w: 3.5, h: 0.23,
    fontFace: "Inter", fontSize: 11, bold: false,
    color: MUTED, charSpacing: 4, margin: 0,
    valign: "middle"
  });

  // Right header text
  if (right) {
    slide.addText(right, {
      x: SLIDE_W - 5.0 - 0.6, y: 0.39, w: 5.0, h: 0.23,
      fontFace: "Inter", fontSize: 11,
      color: MUTED, charSpacing: 4, align: "right", margin: 0,
      valign: "middle"
    });
  }
}

function addFooter(slide, opts) {
  const left = opts.left || "";
  const pageRoman = opts.pageRoman; // e.g. "I. OF VIII"

  const yLine = 6.93;

  // Footer left text
  if (left) {
    slide.addText(left, {
      x: 0.83, y: 6.85, w: 3.5, h: 0.25,
      fontFace: "Inter", fontSize: 10,
      color: MUTED, charSpacing: 4, margin: 0, valign: "middle"
    });
  }

  // Center: small horizontal rule | (RR) | small horizontal rule
  const cxC = SLIDE_W / 2;
  // Left short rule
  slide.addShape(pres.shapes.LINE, {
    x: cxC - 1.10, y: yRule(yLine), w: 0.85, h: 0,
    line: { color: SUBTLE, width: 0.6 }
  });
  // Right short rule
  slide.addShape(pres.shapes.LINE, {
    x: cxC + 0.25, y: yRule(yLine), w: 0.85, h: 0,
    line: { color: SUBTLE, width: 0.6 }
  });
  // Monogram circle
  slide.addShape(pres.shapes.OVAL, {
    x: cxC - 0.21, y: yLine - 0.21, w: 0.42, h: 0.42,
    fill: { color: BG }, line: { color: SUBTLE, width: 0.75 }
  });
  // RR text inside
  slide.addText("RR", {
    x: cxC - 0.21, y: yLine - 0.21, w: 0.42, h: 0.42,
    fontFace: "Georgia", italic: true, fontSize: 11,
    color: MUTED, align: "center", valign: "middle", margin: 0
  });

  // Footer right text (page roman numeral)
  if (pageRoman) {
    slide.addText(pageRoman, {
      x: SLIDE_W - 4.0 - 0.6, y: 6.85, w: 4.0, h: 0.25,
      fontFace: "Inter", fontSize: 10,
      color: MUTED, charSpacing: 4, align: "right", margin: 0,
      valign: "middle"
    });
  }
}

// helper: y for a horizontal line at the *vertical center* of footer monogram
function yRule(yLine) { return yLine; }

// =============================================================
// Reusable: small "section eyebrow" — horizontal bar + label
// e.g. "—— THE CURATION", "—— FOR SCHOOLS"
// =============================================================
function addEyebrow(slide, x, y, label, opts) {
  opts = opts || {};
  const barW = opts.barW || 0.55;
  const barColor = opts.barColor || ACCENT;
  // Short bar
  slide.addShape(pres.shapes.LINE, {
    x: x, y: y + 0.115, w: barW, h: 0,
    line: { color: barColor, width: 1.25 }
  });
  // Label
  slide.addText(label, {
    x: x + barW + 0.18, y: y, w: 6, h: 0.27,
    fontFace: "Inter", fontSize: 12, bold: false,
    color: ACCENT, charSpacing: 5, margin: 0, valign: "middle"
  });
}

// =============================================================
// SLIDE 1 — Cover
// =============================================================
function buildSlide1() {
  const s = pres.addSlide();
  s.background = { color: BG };

  addHeader(s, {
    left: "THE READING ROOM",
    right: "MANHATTAN  ·  NYC"
  });

  // Top-center "№ I"
  s.addText("№ I", {
    x: SLIDE_W / 2 - 1, y: 0.39, w: 2, h: 0.23,
    fontFace: "Georgia", italic: true, fontSize: 11,
    color: MUTED, align: "center", margin: 0, valign: "middle"
  });

  // Eyebrow / kicker line
  s.addText([
    { text: "AN INDEPENDENT BOOKSHOP  ·  ",
      options: { fontFace: "Inter", fontSize: 14, charSpacing: 6, color: ACCENT } },
    { text: "EST. 2026",
      options: { fontFace: "Georgia", italic: true, fontSize: 14, charSpacing: 6, color: ACCENT } }
  ], {
    x: 0.83, y: 1.18, w: 8, h: 0.36, margin: 0, valign: "middle"
  });

  // Big stacked title: "The"  /  "Reading" (italic accent)  /  "Room"
  s.addText("The", {
    x: 0.83, y: 1.65, w: 5.5, h: 1.2,
    fontFace: "Inter", fontSize: 88, bold: true, color: INK,
    align: "left", valign: "top", margin: 0
  });
  s.addText("Reading", {
    x: 0.83, y: 2.78, w: 6.4, h: 1.25,
    fontFace: "Georgia", italic: true, fontSize: 96, color: ACCENT,
    align: "left", valign: "top", margin: 0
  });
  s.addText("Room", {
    x: 0.83, y: 3.95, w: 5.5, h: 1.2,
    fontFace: "Inter", fontSize: 88, bold: true, color: INK,
    align: "left", valign: "top", margin: 0
  });

  // Tagline
  s.addText(
    "A small bookshop with a quiet corner — and a chair that's always free.",
    {
      x: 0.83, y: 5.50, w: 5.6, h: 0.95,
      fontFace: "Georgia", italic: true, fontSize: 16, color: MUTED,
      align: "left", valign: "top", margin: 0
    }
  );

  // Book illustration on the right
  // original image is 1600x1080 -> aspect ~1.48
  s.addImage({
    path: IMG(1),
    x: 7.4, y: 1.95, w: 5.3, h: 3.6
  });

  // Bottom kicker: "CURATED · INDEPENDENT · COZY"
  s.addText("CURATED  ·  INDEPENDENT  ·  COZY", {
    x: 0.83, y: 6.85, w: 5.4, h: 0.25,
    fontFace: "Inter", fontSize: 10, color: MUTED,
    charSpacing: 5, margin: 0, valign: "middle"
  });

  addFooter(s, { pageRoman: "I. OF VIII" });
}

// =============================================================
// SLIDE 2 — Welcome
// =============================================================
function buildSlide2() {
  const s = pres.addSlide();
  s.background = { color: BG };

  addHeader(s, {
    left: "THE READING ROOM",
    right: "A QUIET CORNER OF MANHATTAN"
  });

  // Eyebrow: "—— WELCOME · CHAPTER ONE"
  // Bar
  s.addShape(pres.shapes.LINE, {
    x: 0.83, y: 1.32, w: 0.7, h: 0,
    line: { color: ACCENT, width: 1.25 }
  });
  s.addText([
    { text: "WELCOME",
      options: { fontFace: "Inter", fontSize: 12, color: ACCENT, charSpacing: 5 } },
    { text: "  ·  ",
      options: { fontFace: "Inter", fontSize: 12, color: ACCENT } },
    { text: "CHAPTER ONE",
      options: { fontFace: "Inter", fontSize: 12, color: ACCENT, charSpacing: 5 } }
  ], { x: 1.66, y: 1.20, w: 5, h: 0.27, margin: 0, valign: "middle" });

  // Headline
  s.addText([
    { text: "A quiet corner of Manhattan, just for ",
      options: { fontFace: "Inter", fontSize: 32, color: INK } },
    { text: "readers",
      options: { fontFace: "Georgia", italic: true, fontSize: 32, color: ACCENT } },
    { text: ".",
      options: { fontFace: "Inter", fontSize: 32, color: INK } }
  ], { x: 0.83, y: 1.65, w: 6.5, h: 1.95, margin: 0, valign: "top" });

  // Body
  s.addText(
    "A neighborhood bookshop on a side street — small, carefully chosen, and built around a chair you're welcome to sit in.",
    {
      x: 0.83, y: 3.65, w: 6.0, h: 1.10,
      fontFace: "Georgia", italic: true, fontSize: 14, color: MUTED,
      margin: 0, valign: "top"
    }
  );

  // Three stat columns
  const stats = [
    { num: "1", unit: "shop",   sub: "ON THE CORNER" },
    { num: "3", unit: "floors", sub: "TO WANDER" },
    { num: "∞", unit: "",       sub: "CUPS OF TEA" }
  ];
  const colW = 1.55, gap = 0.30;
  const startX = 0.83;
  const yStat = 5.05;

  stats.forEach((stat, i) => {
    const x = startX + i * (colW + gap);
    // top thin rule
    s.addShape(pres.shapes.LINE, {
      x: x, y: yStat, w: colW - 0.1, h: 0,
      line: { color: SUBTLE, width: 0.6 }
    });
    // big number
    s.addText(stat.num, {
      x: x, y: yStat + 0.07, w: 0.55, h: 0.85,
      fontFace: "Georgia", italic: true, fontSize: 44, color: ACCENT,
      margin: 0, valign: "top"
    });
    // unit (italic)
    if (stat.unit) {
      s.addText(stat.unit, {
        x: x + 0.55, y: yStat + 0.45, w: 0.95, h: 0.30,
        fontFace: "Georgia", italic: true, fontSize: 12, color: MUTED,
        margin: 0, valign: "middle"
      });
    }
    // sub label
    s.addText(stat.sub, {
      x: x, y: yStat + 1.02, w: colW, h: 0.25,
      fontFace: "Inter", fontSize: 9, color: MUTED, charSpacing: 4,
      margin: 0, valign: "middle"
    });
  });

  // Window illustration
  s.addImage({ path: IMG(2), x: 7.7, y: 1.40, w: 4.8, h: 3.85 });

  addFooter(s, { left: "WELCOME", pageRoman: "II. OF VIII" });
}

// =============================================================
// SLIDE 3 — The Curation (3 columns + bookshelf image)
// =============================================================
function buildSlide3() {
  const s = pres.addSlide();
  s.background = { color: BG };

  addHeader(s, {
    left: "THE READING ROOM",
    right: "WHAT'S ON OUR SHELVES"
  });

  addEyebrow(s, 0.83, 1.20, "THE CURATION");

  // Headline
  s.addText([
    { text: "What's on our ",
      options: { fontFace: "Inter", fontSize: 36, color: INK } },
    { text: "shelves",
      options: { fontFace: "Georgia", italic: true, fontSize: 36, color: ACCENT } },
    { text: ".",
      options: { fontFace: "Inter", fontSize: 36, color: INK } }
  ], { x: 0.83, y: 1.65, w: 7.5, h: 0.85, margin: 0, valign: "top" });

  // Sub paragraph (italic)
  s.addText(
    "Three rooms, hand-picked one title at a time — never an algorithm, never a bestseller wall.",
    {
      x: 0.83, y: 2.80, w: 6.0, h: 0.85,
      fontFace: "Georgia", italic: true, fontSize: 13, color: MUTED,
      margin: 0, valign: "top"
    }
  );

  // 3 columns
  const cols = [
    { rom: "i.",   num: "01", title: "Fiction",
      body: "Literary novels, short stories, and translations — chosen one at a time." },
    { rom: "ii.",  num: "02", title: "Non-Fiction",
      body: "Essays, biography, history, and books about the city we live in." },
    { rom: "iii.", num: "03", title: "Children's",
      body: "Picture books, early readers, and middle-grade favorites." }
  ];
  const colW = 1.85, gap = 0.20;
  const startX = 0.83;
  const yCol = 4.10;

  cols.forEach((c, i) => {
    const x = startX + i * (colW + gap);
    // top rule
    s.addShape(pres.shapes.LINE, {
      x: x, y: yCol, w: colW - 0.10, h: 0,
      line: { color: SUBTLE, width: 0.6 }
    });
    // small italic roman index right-aligned at top
    s.addText(c.rom, {
      x: x + colW - 0.55, y: yCol - 0.22, w: 0.40, h: 0.25,
      fontFace: "Georgia", italic: true, fontSize: 10, color: MUTED,
      align: "right", margin: 0, valign: "middle"
    });
    // big number
    s.addText(c.num, {
      x: x, y: yCol + 0.10, w: 1.2, h: 0.65,
      fontFace: "Georgia", italic: true, fontSize: 30, color: ACCENT,
      margin: 0, valign: "top"
    });
    // title
    s.addText(c.title, {
      x: x, y: yCol + 0.78, w: colW, h: 0.45,
      fontFace: "Inter", fontSize: 18, color: INK,
      margin: 0, valign: "top"
    });
    // body
    s.addText(c.body, {
      x: x, y: yCol + 1.30, w: colW - 0.05, h: 1.40,
      fontFace: "Inter", fontSize: 10, color: MUTED,
      margin: 0, valign: "top"
    });
  });

  // Bookshelf image right
  s.addImage({ path: IMG(3), x: 8.40, y: 2.05, w: 3.9, h: 4.0 });

  addFooter(s, { left: "WHAT WE SELL", pageRoman: "III. OF VIII" });
}

// =============================================================
// SLIDE 4 — The Reading Nook (chair illustration + pull quote)
// =============================================================
function buildSlide4() {
  const s = pres.addSlide();
  s.background = { color: BG };

  addHeader(s, {
    left: "THE READING ROOM",
    right: "THE READING NOOK"
  });

  // Chair illustration (centered on left half)
  s.addImage({ path: IMG(4), x: 1.30, y: 1.50, w: 4.4, h: 4.4 });

  // Big italic open quote
  s.addText("\u201C", {
    x: 6.25, y: 1.55, w: 0.6, h: 0.7,
    fontFace: "Georgia", italic: true, fontSize: 36, color: MUTED,
    margin: 0, valign: "top"
  });

  // Pull quote — split into two color runs
  s.addText([
    { text: "A chair, a lamp, a chapter or two — ",
      options: { fontFace: "Georgia", italic: true, fontSize: 30, color: INK } },
    { text: "no purchase necessary",
      options: { fontFace: "Georgia", italic: true, fontSize: 30, color: ACCENT } },
    { text: ".",
      options: { fontFace: "Georgia", italic: true, fontSize: 30, color: INK } }
  ], { x: 6.25, y: 2.20, w: 6.4, h: 2.20, margin: 0, valign: "top" });

  // Small kicker under the quote: "—— STAY AS LONG AS YOU'D LIKE"
  s.addShape(pres.shapes.LINE, {
    x: 6.25, y: 4.60, w: 0.55, h: 0,
    line: { color: MUTED, width: 1 }
  });
  s.addText("STAY AS LONG AS YOU'D LIKE", {
    x: 6.95, y: 4.48, w: 4.5, h: 0.27,
    fontFace: "Inter", fontSize: 11, color: MUTED, charSpacing: 5,
    margin: 0, valign: "middle"
  });

  addFooter(s, { left: "THE NOOK", pageRoman: "IV. OF VIII" });
}

// =============================================================
// SLIDE 5 — For Schools
// =============================================================
function buildSlide5() {
  const s = pres.addSlide();
  s.background = { color: BG };

  addHeader(s, {
    left: "THE READING ROOM",
    right: "FOR SCHOOLS"
  });

  addEyebrow(s, 0.83, 1.05, "FOR SCHOOLS");

  // Headline (two lines)
  s.addText([
    { text: "A bookshop for the ",
      options: { fontFace: "Inter", fontSize: 30, color: INK, breakLine: true } },
    { text: "classroom",
      options: { fontFace: "Georgia", italic: true, fontSize: 30, color: ACCENT } },
    { text: ", too.",
      options: { fontFace: "Inter", fontSize: 30, color: INK } }
  ], { x: 0.83, y: 1.50, w: 7, h: 1.55, margin: 0, valign: "top" });

  // Sub paragraph italic
  s.addText(
    "We work with teachers across the neighborhood — visits, lists, and titles by the box.",
    {
      x: 0.83, y: 3.10, w: 7.0, h: 0.65,
      fontFace: "Georgia", italic: true, fontSize: 14, color: MUTED,
      margin: 0, valign: "top"
    }
  );

  // Three stacked rows
  const rows = [
    {
      rom: "i.",
      lead: "Class visits and ",
      accent: "storytime mornings",
      tail: " for K–6.",
      sub: "BY APPOINTMENT  ·  TUESDAY AND THURSDAY MORNINGS"
    },
    {
      rom: "ii.",
      lead: "",
      accent: "Curated reading lists",
      tail: " built with your teachers.",
      sub: "FREE SERVICE  ·  TAILORED BY GRADE AND THEME"
    },
    {
      rom: "iii.",
      lead: "Bulk titles at a ",
      accent: "15% educator's rate",
      tail: ".",
      sub: "STANDING ACCOUNTS WELCOME  ·  NET 30"
    }
  ];

  const xR = 0.83;
  const wR = 7.6;
  const rowH = 0.85;
  let yR = 3.85;

  rows.forEach((r, idx) => {
    // top rule
    s.addShape(pres.shapes.LINE, {
      x: xR, y: yR, w: wR, h: 0,
      line: { color: SUBTLE, width: 0.6 }
    });
    // roman numeral
    s.addText(r.rom, {
      x: xR, y: yR + 0.10, w: 0.7, h: 0.5,
      fontFace: "Georgia", italic: true, fontSize: 22, color: ACCENT,
      margin: 0, valign: "top"
    });
    // main line
    s.addText([
      { text: r.lead, options: { fontFace: "Inter", fontSize: 17, color: INK } },
      { text: r.accent, options: { fontFace: "Georgia", italic: true, fontSize: 17, color: ACCENT } },
      { text: r.tail, options: { fontFace: "Inter", fontSize: 17, color: INK } }
    ], { x: xR + 0.85, y: yR + 0.10, w: wR - 0.85, h: 0.45, margin: 0, valign: "top" });

    // sub line
    s.addText(r.sub, {
      x: xR + 0.85, y: yR + 0.55, w: wR - 0.85, h: 0.25,
      fontFace: "Inter", fontSize: 9, color: MUTED, charSpacing: 4,
      margin: 0, valign: "middle"
    });

    yR += rowH;
  });

  // Stack of books illustration on the right
  s.addImage({ path: IMG(5), x: 8.95, y: 2.40, w: 3.5, h: 3.4 });

  addFooter(s, { left: "FOR SCHOOLS", pageRoman: "V. OF VIII" });
}

// =============================================================
// SLIDE 6 — For Book Clubs (mirror of slide 5: image left, content right)
// =============================================================
function buildSlide6() {
  const s = pres.addSlide();
  s.background = { color: BG };

  addHeader(s, {
    left: "THE READING ROOM",
    right: "FOR BOOK CLUBS"
  });

  // Teacup illustration (left)
  s.addImage({ path: IMG(6), x: 1.20, y: 1.80, w: 4.0, h: 4.0 });

  // Right column starts here
  const xR = 5.85;
  const wR = 6.7;

  addEyebrow(s, xR, 1.05, "FOR BOOK CLUBS");

  // Headline
  s.addText([
    { text: "Bring the club. We'll bring the ",
      options: { fontFace: "Inter", fontSize: 28, color: INK } },
    { text: "tea",
      options: { fontFace: "Georgia", italic: true, fontSize: 28, color: ACCENT } },
    { text: ".",
      options: { fontFace: "Inter", fontSize: 28, color: INK } }
  ], { x: xR, y: 1.50, w: wR, h: 1.50, margin: 0, valign: "top" });

  // Italic sub
  s.addText(
    "A back room reserved for you, the month's pick discounted, and a quiet hour after the door is locked.",
    {
      x: xR, y: 3.05, w: wR, h: 0.80,
      fontFace: "Georgia", italic: true, fontSize: 13, color: MUTED,
      margin: 0, valign: "top"
    }
  );

  // Three stacked rows
  const rows = [
    {
      rom: "i.",
      lead: "",
      accent: "Back-room booking",
      tail: ", free for groups of six or more.",
      sub: "SEATS UP TO FOURTEEN  ·  RESERVE A WEEK AHEAD"
    },
    {
      rom: "ii.",
      lead: "",
      accent: "10%",
      tail: " off the club's monthly pick.",
      sub: "MEMBERS OF ANY READING GROUP"
    },
    {
      rom: "iii.",
      lead: "Tea, biscuits, and a ",
      accent: "quiet hour",
      tail: " after closing.",
      sub: "SUNDAYS  ·  6PM TO 7PM"
    }
  ];

  const rowH = 0.85;
  let yR = 4.05;

  rows.forEach((r) => {
    // top rule
    s.addShape(pres.shapes.LINE, {
      x: xR, y: yR, w: wR, h: 0,
      line: { color: SUBTLE, width: 0.6 }
    });
    // roman
    s.addText(r.rom, {
      x: xR, y: yR + 0.08, w: 0.7, h: 0.5,
      fontFace: "Georgia", italic: true, fontSize: 19, color: ACCENT,
      margin: 0, valign: "top"
    });
    // main
    s.addText([
      { text: r.lead, options: { fontFace: "Inter", fontSize: 14, color: INK } },
      { text: r.accent, options: { fontFace: "Georgia", italic: true, fontSize: 14, color: ACCENT } },
      { text: r.tail, options: { fontFace: "Inter", fontSize: 14, color: INK } }
    ], { x: xR + 0.75, y: yR + 0.10, w: wR - 0.75, h: 0.40, margin: 0, valign: "top" });
    // sub
    s.addText(r.sub, {
      x: xR + 0.75, y: yR + 0.50, w: wR - 0.75, h: 0.22,
      fontFace: "Inter", fontSize: 8, color: MUTED, charSpacing: 4,
      margin: 0, valign: "middle"
    });
    yR += rowH;
  });

  addFooter(s, { left: "FOR BOOK CLUBS", pageRoman: "VI. OF VIII" });
}

// =============================================================
// SLIDE 7 — Events schedule + candle illustration + pull quote
// =============================================================
function buildSlide7() {
  const s = pres.addSlide();
  s.background = { color: BG };

  addHeader(s, {
    left: "THE READING ROOM",
    right: "EVENINGS & STORY HOURS"
  });

  // Eyebrow: "—— EVENTS · A WEEKLY PROGRAMME"
  s.addShape(pres.shapes.LINE, {
    x: 0.83, y: 1.21, w: 0.55, h: 0,
    line: { color: ACCENT, width: 1.25 }
  });
  s.addText([
    { text: "EVENTS",
      options: { fontFace: "Inter", fontSize: 12, color: ACCENT, charSpacing: 5 } },
    { text: "  ·  ",
      options: { fontFace: "Inter", fontSize: 12, color: ACCENT } },
    { text: "A WEEKLY PROGRAMME",
      options: { fontFace: "Inter", fontSize: 12, color: ACCENT, charSpacing: 5 } }
  ], { x: 1.51, y: 1.10, w: 6, h: 0.27, margin: 0, valign: "middle" });

  // Headline
  s.addText([
    { text: "Evenings & ",
      options: { fontFace: "Inter", fontSize: 36, color: INK } },
    { text: "story hours",
      options: { fontFace: "Georgia", italic: true, fontSize: 36, color: ACCENT } },
    { text: ".",
      options: { fontFace: "Inter", fontSize: 36, color: INK } }
  ], { x: 0.83, y: 1.55, w: 8, h: 0.85, margin: 0, valign: "top" });

  // Schedule rows
  const events = [
    { day: "Tuesdays",   title: "Story Hour for Little Readers",
      sub: "Ages 3 to 7 — a new picture book each week", time: "10:30 AM" },
    { day: "Thursdays",  title: "Author Evenings",
      sub: "Local writers, readings & conversation", time: "7:00 PM" },
    { day: "First Sunday", title: "The Reading Room Book Club",
      sub: "One novel a month — open to all", time: "4:00 PM" },
    { day: "Last Friday",  title: "Candlelit Reading",
      sub: "Quiet hour, lamps low, just the page", time: "8:00 PM" }
  ];

  const evX = 0.83;
  const evW = 7.50;
  const evH = 0.85;
  let evY = 3.30;

  events.forEach((ev, i) => {
    // top rule (also adds rule above first row)
    s.addShape(pres.shapes.LINE, {
      x: evX, y: evY, w: evW, h: 0,
      line: { color: SUBTLE, width: 0.6 }
    });
    // Day (italic accent, left)
    s.addText(ev.day, {
      x: evX, y: evY + 0.13, w: 1.55, h: 0.45,
      fontFace: "Georgia", italic: true, fontSize: 16, color: ACCENT,
      margin: 0, valign: "top"
    });
    // Title (bold-ish ink)
    s.addText(ev.title, {
      x: evX + 1.65, y: evY + 0.13, w: 4.4, h: 0.40,
      fontFace: "Inter", fontSize: 15, color: INK,
      margin: 0, valign: "top"
    });
    // Sub
    s.addText(ev.sub, {
      x: evX + 1.65, y: evY + 0.50, w: 4.4, h: 0.30,
      fontFace: "Inter", fontSize: 10, color: MUTED,
      margin: 0, valign: "top"
    });
    // Time (right aligned)
    s.addText(ev.time, {
      x: evX + 6.10, y: evY + 0.20, w: 1.40, h: 0.40,
      fontFace: "Inter", fontSize: 12, color: INK, align: "right",
      margin: 0, valign: "top"
    });
    evY += evH;
  });

  // Final bottom rule for the schedule
  s.addShape(pres.shapes.LINE, {
    x: evX, y: evY, w: evW, h: 0,
    line: { color: SUBTLE, width: 0.6 }
  });

  // Vertical divider between content and right column
  s.addShape(pres.shapes.LINE, {
    x: 9.10, y: 3.20, w: 0, h: 3.2,
    line: { color: SUBTLE, width: 0.6 }
  });

  // Candle illustration on right
  s.addImage({ path: IMG(7), x: 9.65, y: 2.85, w: 2.4, h: 2.4 });

  // Pull quote under candle
  s.addText([
    { text: "\u201C", options: { fontFace: "Georgia", italic: true, fontSize: 13, color: MUTED } },
    { text: "The candlelit hour is our favorite — ",
      options: { fontFace: "Georgia", italic: true, fontSize: 13, color: INK } },
    { text: "just lamps and pages",
      options: { fontFace: "Georgia", italic: true, fontSize: 13, color: ACCENT } },
    { text: ".\u201D", options: { fontFace: "Georgia", italic: true, fontSize: 13, color: INK } }
  ], { x: 9.30, y: 5.50, w: 3.30, h: 0.95, margin: 0, valign: "top" });

  addFooter(s, { left: "EVENTS", pageRoman: "VII. OF VIII" });
}

// =============================================================
// SLIDE 8 — Membership / Closing card
// =============================================================
function buildSlide8() {
  const s = pres.addSlide();
  s.background = { color: BG };

  addHeader(s, {
    left: "THE READING ROOM",
    right: "MEMBERSHIP"
  });

  // Eyebrow: "—— MEMBERSHIP · — FIN."
  s.addShape(pres.shapes.LINE, {
    x: 0.83, y: 1.41, w: 0.55, h: 0,
    line: { color: ACCENT, width: 1.25 }
  });
  s.addText([
    { text: "MEMBERSHIP",
      options: { fontFace: "Inter", fontSize: 12, color: ACCENT, charSpacing: 5 } },
    { text: "  ·  ",
      options: { fontFace: "Inter", fontSize: 12, color: ACCENT } },
    { text: "— FIN.",
      options: { fontFace: "Georgia", italic: true, fontSize: 12, color: ACCENT, charSpacing: 5 } }
  ], { x: 1.51, y: 1.30, w: 6, h: 0.27, margin: 0, valign: "middle" });

  // Headline
  s.addText([
    { text: "Become a member of ",
      options: { fontFace: "Inter", fontSize: 30, color: INK, breakLine: true } },
    { text: "The Reading Room",
      options: { fontFace: "Georgia", italic: true, fontSize: 30, color: ACCENT } },
    { text: ".",
      options: { fontFace: "Inter", fontSize: 30, color: INK } }
  ], { x: 0.83, y: 1.75, w: 6.5, h: 1.65, margin: 0, valign: "top" });

  // Italic body
  s.addText(
    "A small subscription, a year of small pleasures — a book from us, an evening reserved, and a corner that knows your name.",
    {
      x: 0.83, y: 3.50, w: 6.0, h: 1.10,
      fontFace: "Georgia", italic: true, fontSize: 14, color: MUTED,
      margin: 0, valign: "top"
    }
  );

  // Small contact list with little circular markers
  const contacts = [
    { dot: "filled-accent", text: "readingroom.nyc",       italic: false },
    { dot: "outline",       text: "@thereadingroom",       italic: false },
    { dot: "filled-muted",  text: "A side street, Manhattan", italic: true  }
  ];
  let cY = 4.85;
  contacts.forEach((c, i) => {
    const dotX = 0.83;
    const dotY = cY + 0.10;
    if (c.dot === "filled-accent") {
      s.addShape(pres.shapes.OVAL, {
        x: dotX, y: dotY, w: 0.16, h: 0.16,
        fill: { color: ACCENT }, line: { color: ACCENT_D, width: 0.75 }
      });
    } else if (c.dot === "outline") {
      s.addShape(pres.shapes.OVAL, {
        x: dotX, y: dotY, w: 0.16, h: 0.16,
        fill: { color: BG }, line: { color: MUTED, width: 0.75 }
      });
    } else {
      s.addShape(pres.shapes.OVAL, {
        x: dotX, y: dotY, w: 0.16, h: 0.16,
        fill: { color: MUTED }, line: { type: "none" }
      });
    }
    s.addText(c.text, {
      x: dotX + 0.32, y: cY, w: 4.5, h: 0.36,
      fontFace: c.italic ? "Georgia" : "Inter",
      italic: c.italic,
      fontSize: 14, color: MUTED, margin: 0, valign: "middle"
    });
    cY += 0.45;
  });

  // ---- The membership card on the right ----
  const cardX = 7.40, cardY = 1.50, cardW = 5.20, cardH = 4.60;

  // Subtle pink shadow rectangle behind card
  s.addShape(pres.shapes.RECTANGLE, {
    x: cardX + 0.10, y: cardY + 0.12, w: cardW, h: cardH,
    fill: { color: ACCENT, transparency: 75 }, line: { type: "none" }
  });
  // Card body
  s.addShape(pres.shapes.RECTANGLE, {
    x: cardX, y: cardY, w: cardW, h: cardH,
    fill: { color: CARD_BG }, line: { color: SUBTLE, width: 0.75 }
  });

  // RR seal (filled accent circle, top-right corner overlapping)
  const sealX = cardX + cardW - 0.85;
  const sealY = cardY - 0.55;
  s.addShape(pres.shapes.OVAL, {
    x: sealX, y: sealY, w: 1.30, h: 1.30,
    fill: { color: ACCENT }, line: { type: "none" }
  });
  s.addText("RR", {
    x: sealX, y: sealY + 0.25, w: 1.30, h: 0.45,
    fontFace: "Georgia", italic: true, fontSize: 22, color: BG, align: "center",
    margin: 0, valign: "middle"
  });
  s.addText("EST. 2026", {
    x: sealX, y: sealY + 0.72, w: 1.30, h: 0.30,
    fontFace: "Inter", fontSize: 8, color: BG, charSpacing: 4, align: "center",
    margin: 0, valign: "middle"
  });

  // Card title
  s.addText("The Annual Reader", {
    x: cardX + 0.45, y: cardY + 0.40, w: 3.5, h: 0.45,
    fontFace: "Georgia", italic: true, fontSize: 18, color: ACCENT,
    margin: 0, valign: "middle"
  });

  // Price
  s.addText([
    { text: "$48", options: { fontFace: "Inter", fontSize: 50, color: INK } },
    { text: "  / year", options: { fontFace: "Georgia", italic: true, fontSize: 16, color: MUTED } }
  ], { x: cardX + 0.45, y: cardY + 0.85, w: cardW - 0.7, h: 0.95, margin: 0, valign: "top" });

  // Divider rule
  s.addShape(pres.shapes.LINE, {
    x: cardX + 0.45, y: cardY + 2.00, w: cardW - 0.9, h: 0,
    line: { color: SUBTLE, width: 0.6 }
  });

  // 4 perks list
  const perks = [
    { rom: "i.",   text: "One hand-picked book each season" },
    { rom: "ii.",  text: "10% off every purchase, always" },
    { rom: "iii.", text: "First seat at our author evenings" },
    { rom: "iv.",  text: "The reading nook, on the house" }
  ];
  let py = cardY + 2.15;
  perks.forEach((p, i) => {
    s.addText(p.rom, {
      x: cardX + 0.45, y: py, w: 0.55, h: 0.35,
      fontFace: "Georgia", italic: true, fontSize: 12, color: ACCENT,
      margin: 0, valign: "middle"
    });
    s.addText(p.text, {
      x: cardX + 1.00, y: py, w: cardW - 1.30, h: 0.35,
      fontFace: "Inter", fontSize: 12, color: INK,
      margin: 0, valign: "middle"
    });
    if (i < perks.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: cardX + 0.45, y: py + 0.42, w: cardW - 0.90, h: 0,
        line: { color: SUBTLE, width: 0.5 }
      });
    }
    py += 0.55;
  });

  addFooter(s, { left: "MANHATTAN, NY  ·  EST. 2026", pageRoman: "VIII. — FIN." });
}

// =============================================================
// Build all slides and write
// =============================================================
buildSlide1();
buildSlide2();
buildSlide3();
buildSlide4();
buildSlide5();
buildSlide6();
buildSlide7();
buildSlide8();

pres.writeFile({ fileName: "Book_Shop_Recreated.pptx" })
  .then(name => console.log("Wrote: " + name));
