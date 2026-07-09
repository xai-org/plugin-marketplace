/**
 * Fairway & Sons — Marketing Launch Deck
 * Replica generator using pptxgenjs.
 *
 * Slide size: 20" x 11.25" (custom, matches source EMU 18288000 x 10287000)
 * Run: `node Fairway_and_Sons.js` → produces Fairway_and_Sons.pptx
 */

const pptxgen = require("pptxgenjs");

// ----- Brand palette (extracted from source XML) -----
const C = {
  cream:     "F1ECE0", // slide background
  tan:       "D9C9A3", // right-side tan panel on title + final slides
  forestDk:  "1C3128", // darkest green (premium card + slide 2 bg)
  forest:    "2D4A3E", // primary green (eyebrows, accents, italics)
  nearBlk:   "14201B", // near-black text
  gold:      "B8944A", // accent gold
  goldLt:    "D9BE80", // lighter gold (dark-bg variant)
  bodyGrey:  "34433D", // body paragraph text
  white:     "FFFFFF",
  cardGrey:  "E0E0DC", // empty image placeholder fill (approx; not in src)
};

// ----- Fonts -----
const F = {
  header: "Arial",
  body:   "Arial",
};

// ----- Slide dimensions -----
const SLIDE_W = 20;
const SLIDE_H = 11.25;

const pres = new pptxgen();
pres.title = "Fairway & Sons — Marketing Launch Deck";
pres.author = "Fairway & Sons";
pres.defineLayout({ name: "FW_WIDE", width: SLIDE_W, height: SLIDE_H });
pres.layout = "FW_WIDE";

// ----- Small helpers -----
// Source XML spc is in 1/100 pt (spc=540 → +5.4 pt).
// pptxgenjs `charSpacing` is in whole points, so divide by 100.
const cs = (spc) => spc / 100;

// Standard eyebrow row on content slides (category + "N / 10")
function eyebrow(slide, category, pageNum) {
  slide.addText(category, {
    x: 1.25, y: 0.5, w: 6, h: 0.3125,
    fontFace: F.header, fontSize: 18, bold: false,
    color: C.forest, charSpacing: cs(396), margin: 0,
  });
  slide.addText(pageNum, {
    x: 17.6209, y: 0.5, w: 1.25, h: 0.3125,
    fontFace: F.header, fontSize: 18,
    color: C.forest, charSpacing: cs(396), margin: 0,
  });
}

// Section sub-eyebrow (second small line under category)
function subEyebrow(slide, text, y = 1.0417) {
  slide.addText(text, {
    x: 1.25, y, w: 18.025, h: 0.3125,
    fontFace: F.header, fontSize: 18,
    color: C.forest, charSpacing: cs(396), margin: 0,
  });
}

// Big two-tone headline used on most content slides (e.g. "Golf, indoors. Brooklyn, outdoors.")
function bigHeadline(slide, parts, opts = {}) {
  const y = opts.y ?? 1.5;
  const h = opts.h ?? 2.2415;
  const sz = opts.sz ?? 82.5;
  const spc = opts.spc ?? -165;
  slide.addText(
    parts.map((p, i) => ({
      text: p.text,
      options: {
        fontFace: F.header, fontSize: sz,
        color: p.color ?? C.nearBlk,
        italic: !!p.italic,
        charSpacing: cs(spc),
        breakLine: i === parts.length - 1 ? false : !!p.breakLine,
      },
    })),
    { x: 1.25, y, w: 18.025, h, align: "left", margin: 0, valign: "top" }
  );
}

// =====================================================================
// SLIDE 1 — Title
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  // Right-side tan panel
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.2439, y: 0, w: 9.7561, h: 11.25,
    fill: { color: C.tan }, line: { type: "none" },
  });

  // Top eyebrow
  s.addText("FAIRWAY & SONS · WILLIAMSBURG · OPENING FALL '26", {
    x: 1.25, y: 1.0417, w: 8.4054, h: 0.5833,
    fontFace: F.header, fontSize: 18, bold: true,
    color: C.forest, charSpacing: cs(540), margin: 0,
  });

  // Big wordmark "Fairway & Sons."
  s.addText(
    [
      { text: "Fairway ", options: { color: C.nearBlk } },
      { text: "& ",       options: { color: C.gold, italic: true } },
      { text: "Sons.",    options: { color: C.forest, italic: true } },
    ].map((r) => ({
      text: r.text,
      options: {
        fontFace: F.header, fontSize: 135,
        color: r.options.color, italic: !!r.options.italic,
        charSpacing: cs(-405),
      },
    })),
    {
      x: 1.25, y: 3.2995, w: 8.4054, h: 3.4167,
      align: "left", valign: "top", margin: 0,
      lineSpacingMultiple: 0.9,
    }
  );

  // Tagline
  s.addText("An indoor golf club for Brooklyn — bays, putts, and a proper bar.", {
    x: 1.25, y: 7.0078, w: 6.8667, h: 1.0833,
    fontFace: F.header, fontSize: 30, italic: true,
    color: C.bodyGrey, margin: 0,
    lineSpacingMultiple: 1.25,
  });

  // Footer hairline
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.25, y: 9.7656, w: 8.1606, h: 0.0104,
    fill: { color: C.nearBlk }, line: { type: "none" },
  });

  // Footer labels
  s.addText("Marketing Launch Deck", {
    x: 1.25, y: 10.026, w: 3.0296, h: 0.3281,
    fontFace: F.header, fontSize: 18,
    color: C.bodyGrey, charSpacing: cs(108), margin: 0,
  });
  s.addText("Spring 2026", {
    x: 7.8972, y: 10.026, w: 1.5967, h: 0.3281,
    fontFace: F.header, fontSize: 18,
    color: C.bodyGrey, charSpacing: cs(108), margin: 0,
  });
}

// =====================================================================
// SLIDE 2 — Hello, Williamsburg (dark)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.forestDk };

  // Eyebrow (centered)
  s.addText("A NEW CLUBHOUSE ON WYTHE AVE.", {
    x: 4, y: 2.5292, w: 12, h: 0.3125,
    fontFace: F.header, fontSize: 18,
    color: C.cream, charSpacing: cs(396),
    align: "center", margin: 0,
  });

  // Big two-line greeting
  s.addText(
    [
      { text: "Hello, ", options: { fontFace: F.header, fontSize: 142.5, color: C.cream, charSpacing: cs(-356), breakLine: true } },
      { text: "Williamsburg.", options: { fontFace: F.header, fontSize: 142.5, italic: true, color: C.goldLt, charSpacing: cs(-356) } },
    ],
    {
      x: 4.5876, y: 3.1334, w: 10.8247, h: 3.9416,
      align: "center", valign: "top", margin: 0,
    }
  );

  // Supporting line
  s.addText(
    "Eight simulator bays, a short-game room, and a bar that takes both its Old Fashioneds and its 7-irons seriously.",
    {
      x: 3.5625, y: 7.575, w: 12.875, h: 1.1875,
      fontFace: F.header, fontSize: 31.5, italic: true,
      color: C.cream, align: "center", margin: 0,
    }
  );
}

// =====================================================================
// SLIDE 3 — The Concept
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  eyebrow(s, "THE CONCEPT", "03 / 10");
  subEyebrow(s, "WHAT WE'RE BUILDING");

  // Big headline "Golf, indoors. Brooklyn, outdoors."
  s.addText(
    [
      { text: "Golf, ",     options: { fontFace: F.header, fontSize: 82.5, color: C.nearBlk, charSpacing: cs(-165) } },
      { text: "indoors. ",  options: { fontFace: F.header, fontSize: 82.5, italic: true, color: C.forest, charSpacing: cs(-165) } },
      { text: "Brooklyn, ", options: { fontFace: F.header, fontSize: 82.5, color: C.nearBlk, charSpacing: cs(-165) } },
      { text: "outdoors.",  options: { fontFace: F.header, fontSize: 82.5, italic: true, color: C.forest, charSpacing: cs(-165) } },
    ],
    { x: 1.25, y: 1.5, w: 18.025, h: 2.2415, align: "left", margin: 0 }
  );

  // Large dark image placeholder
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.25, y: 4.1999, w: 8.7301, h: 6.1126,
    fill: { color: C.forest }, line: { type: "none" },
  });

  // Image label (bottom-anchored)
  s.addText("INTERIOR — MAIN LOUNGE & BAR", {
    x: 1.5104, y: 4.4603, w: 8.4712, h: 5.6335,
    fontFace: F.header, fontSize: 18,
    color: C.forestDk, charSpacing: cs(288),
    valign: "bottom", margin: 0,
  });

  // Right column body paragraphs
  s.addText(
    "Fairway & Sons is a 12,000 sq ft indoor golf club built into a former warehouse on Wythe. Eight Trackman bays for full swings, a dedicated short-game room, and a lounge that's as good without clubs as with them.",
    {
      x: 10.8135, y: 4.4041, w: 6.6521, h: 2.2292,
      fontFace: F.body, fontSize: 21, color: C.bodyGrey, margin: 0,
    }
  );
  s.addText(
    "We're built for the Tuesday-night date, the Saturday foursome, the Thursday corporate offsite, and the lesson-series regular — all under one roof.",
    {
      x: 10.8135, y: 6.8208, w: 6.6521, h: 1.7917,
      fontFace: F.body, fontSize: 21, color: C.bodyGrey, margin: 0,
    }
  );

  // Gold vertical accent bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.8135, y: 9.1333, w: 0.0312, h: 0.9749,
    fill: { color: C.gold }, line: { type: "none" },
  });

  // Italic callout
  s.addText("A members-club feel, without the membership barrier.", {
    x: 11.1364, y: 9.1333, w: 6.8764, h: 1.0166,
    fontFace: F.header, fontSize: 27, italic: true,
    color: C.forest, margin: 0,
  });
}

// =====================================================================
// SLIDE 4 — The Experience (three cards)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  eyebrow(s, "THE EXPERIENCE", "04 / 10");
  subEyebrow(s, "UNDER ONE ROOF");

  // Headline
  bigHeadline(s, [
    { text: "Three ways to ", color: C.nearBlk },
    { text: "play.",           color: C.forest, italic: true },
  ], { y: 1.5, h: 1.1416 });

  // ---- Card helper for slide 4 ----
  const card = ({ cardX, cardBg, imgBg, label, labelColor, kicker, kickerColor, title, titleColor, body, bodyColor }) => {
    // Outer card
    s.addShape(pres.shapes.RECTANGLE, {
      x: cardX, y: 3.2666, w: 5.6111, h: 7.0459,
      fill: { color: cardBg }, line: { type: "none" },
    });
    // Inner image placeholder
    s.addShape(pres.shapes.RECTANGLE, {
      x: cardX + 0.3438, y: 3.6104, w: 4.9236, h: 3.6875,
      fill: { color: imgBg }, line: { type: "none" },
    });
    // Image label (bottom-anchored)
    s.addText(label, {
      x: cardX + 0.5208, y: 3.7874, w: 4.7171, h: 3.375,
      fontFace: F.header, fontSize: 18,
      color: labelColor, charSpacing: cs(288),
      valign: "bottom", margin: 0,
    });
    // Kicker "01 — THE BAYS"
    s.addText(kicker, {
      x: cardX + 0.3438, y: 7.5895, w: 5.0713, h: 0.3125,
      fontFace: F.header, fontSize: 18, bold: true,
      color: kickerColor, charSpacing: cs(396), margin: 0,
    });
    // Card title
    s.addText(title, {
      x: cardX + 0.3438, y: 7.9645, w: 5.0713, h: 0.75,
      fontFace: F.header, fontSize: 39,
      color: titleColor, charSpacing: cs(-39), margin: 0,
    });
    // Body copy
    s.addText(body, {
      x: cardX + 0.3438, y: 8.8187, w: 5.0713, h: 1.1667,
      fontFace: F.body, fontSize: 18, color: bodyColor, margin: 0,
    });
  };

  // Card 1 — Simulator bay (white card, dark-green image block)
  card({
    cardX: 1.25, cardBg: C.white, imgBg: C.forest,
    label: "SIMULATOR BAY", labelColor: C.forestDk,
    kicker: "01 — THE BAYS", kickerColor: C.forest,
    title: "Full-swing simulators", titleColor: C.nearBlk,
    body: "Eight Trackman bays with a library of 200+ courses, from Pebble Beach to St Andrews. Book by the hour, up to six players per bay.",
    bodyColor: C.bodyGrey,
  });

  // Card 2 — Short-game (dark card, gold image block)
  card({
    cardX: 7.1944, cardBg: C.forestDk, imgBg: C.gold,
    label: "SHORT-GAME ROOM", labelColor: C.cream,
    kicker: "02 — THE GREEN", kickerColor: C.goldLt,
    title: "Putt & chip room", titleColor: C.cream,
    body: "A 1,200 sq ft dedicated short-game room with a contoured bent-grass green and a chipping strip. Drop-in welcome.",
    bodyColor: C.cream,
  });

  // Card 3 — Lounge (white card, dark-green image block)
  card({
    cardX: 13.1388, cardBg: C.white, imgBg: C.forest,
    label: "LOUNGE & BAR", labelColor: C.forestDk,
    kicker: "03 — THE LOUNGE", kickerColor: C.forest,
    title: "Clubhouse & bar", titleColor: C.nearBlk,
    body: "A full bar program, a tight menu from our kitchen, and a lounge you'd happily sit in with no clubs in sight.",
    bodyColor: C.bodyGrey,
  });
}

// =====================================================================
// SLIDE 5 — The Tech (split cream / dark, no page number in source)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  // Right-side dark panel
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10, y: 0, w: 10, h: 11.25,
    fill: { color: C.forestDk }, line: { type: "none" },
  });

  // Eyebrow (low placement per source XML: y=3.24)
  s.addText("THE TECH", {
    x: 1.25, y: 3.2396, w: 8.1542, h: 0.3125,
    fontFace: F.header, fontSize: 18,
    color: C.forest, charSpacing: cs(396), margin: 0,
  });

  // Headline — two-tone
  s.addText(
    [
      { text: "Pro-grade ",  options: { fontFace: F.header, fontSize: 72, color: C.nearBlk, charSpacing: cs(-144) } },
      { text: "data. ",      options: { fontFace: F.header, fontSize: 72, italic: true, color: C.forest, charSpacing: cs(-144) } },
      { text: "Zero ",       options: { fontFace: F.header, fontSize: 72, color: C.nearBlk, charSpacing: cs(-144) } },
      { text: "guesswork.",  options: { fontFace: F.header, fontSize: 72, italic: true, color: C.forest, charSpacing: cs(-144) } },
    ],
    { x: 1.25, y: 3.8021, w: 8.1542, h: 2.0417, align: "left", margin: 0 }
  );

  // Body paragraph
  s.addText(
    "Every bay runs on a Trackman 4 radar system — the same used on the PGA Tour. Ball speed, launch angle, spin, club path, carry — all of it, recorded and synced to your account for every session you play.",
    {
      x: 1.25, y: 6.2188, w: 6.6521, h: 1.6667,
      fontFace: F.body, fontSize: 19.5, color: C.bodyGrey, margin: 0,
    }
  );

  // ---- Right side: 3 stats stacked vertically ----
  const stat = (y, num, label) => {
    s.addText(num, {
      x: 11.0417, y, w: 8.1542, h: 1.2917,
      fontFace: F.header, fontSize: 90, italic: true,
      color: C.goldLt, charSpacing: cs(-180), margin: 0,
    });
    s.addText(label, {
      x: 11.0417, y: y + 1.3333, w: 8.1542, h: 0.3281,
      fontFace: F.header, fontSize: 18,
      color: C.cream, charSpacing: cs(360), margin: 0,
    });
  };

  stat(2.1016, "8", "TRACKMAN 4 BAYS");
  // Divider
  s.addShape(pres.shapes.RECTANGLE, {
    x: 11.0417, y: 4.263, w: 7.9167, h: 0.0104,
    fill: { color: C.cream }, line: { type: "none" },
  });

  stat(4.8151, "200+", "COURSES IN THE LIBRARY");
  s.addShape(pres.shapes.RECTANGLE, {
    x: 11.0417, y: 6.9766, w: 7.9167, h: 0.0104,
    fill: { color: C.cream }, line: { type: "none" },
  });

  stat(7.5286, "12k", "SQ FT, TOTAL VENUE");
}

// =====================================================================
// SLIDE 6 — Amenities (2x2 grid with dividers)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  eyebrow(s, "AMENITIES", "06 / 10");
  subEyebrow(s, "WHAT'S ON-SITE");

  bigHeadline(s, [
    { text: "More than a ", color: C.nearBlk },
    { text: "range.",        color: C.forest, italic: true },
  ], { y: 1.5, h: 1.1416 });

  // Four amenity rows in a 2×2 grid, each with a top divider hairline.
  const amenity = ({ x, y, num, title, body }) => {
    // Divider
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 8.4375, h: 0.0104,
      fill: { color: C.nearBlk }, line: { type: "none" },
    });
    // Number
    s.addText(num, {
      x, y: y + 0.3438, w: 0.9167, h: 0.5833,
      fontFace: F.header, fontSize: 39, italic: true,
      color: C.forest, margin: 0,
    });
    // Title
    s.addText(title, {
      x: x + 1.0833, y: y + 0.3438, w: 7.5748, h: 0.6146,
      fontFace: F.header, fontSize: 31.5,
      color: C.nearBlk, charSpacing: cs(-31), margin: 0,
    });
    // Body
    s.addText(body, {
      x: x + 1.0833, y: y + 1.0, w: 5.5792, h: 1.1291,
      fontFace: F.body, fontSize: 18, color: C.bodyGrey, margin: 0,
    });
  };

  amenity({
    x: 1.25, y: 3.2666, num: "01", title: "The Bar",
    body: "A full cocktail program, twelve drafts, and a short natural-wine list. Open to walk-ins, clubs or no clubs.",
  });
  amenity({
    x: 10.3125, y: 3.2666, num: "02", title: "The Kitchen",
    body: "A tight menu of snacks and small plates from our kitchen — designed to eat between holes, not slow you down.",
  });
  amenity({
    x: 1.25, y: 6.9354, num: "03", title: "Lessons & Fittings",
    body: "PGA-certified coaches on staff, plus club-fitting by appointment with our Trackman-trained fitter.",
  });
  amenity({
    x: 10.3125, y: 6.9354, num: "04", title: "Events & Corporate",
    body: "Full-venue buyouts, corporate leagues, and birthday or bachelor/ette bookings. Up to 120 guests.",
  });
}

// =====================================================================
// SLIDE 7 — Audiences (4 colored columns)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  eyebrow(s, "AUDIENCES", "07 / 10");
  subEyebrow(s, "EVERYONE'S WELCOME");

  bigHeadline(s, [
    { text: "Who it's ", color: C.nearBlk },
    { text: "for.",       color: C.forest, italic: true },
  ], { y: 1.5, h: 1.1416 });

  // Four columns, varying fills
  const col = ({ x, fill, title, caption }) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 3.2666, w: 4.2188, h: 7.0459,
      fill: { color: fill }, line: { type: "none" },
    });
    s.addText(title, {
      x: x + 0.3021, y: 3.5687, w: 3.6, h: 0.6406,
      fontFace: F.header, fontSize: 33,
      color: C.white, margin: 0,
    });
    s.addText(caption, {
      x: x + 0.3021, y: 9.4792, w: 3.723, h: 0.6146,
      fontFace: F.header, fontSize: 18,
      color: C.white, charSpacing: cs(288), margin: 0,
    });
  };

  col({ x: 1.25,    fill: C.forest,   title: "Date night",   caption: "TWO PLAYERS · ONE BAY · A COCKTAIL" });
  col({ x: 5.6771,  fill: C.gold,     title: "The regulars", caption: "WEEKLY LESSONS · LEAGUE NIGHTS" });
  col({ x: 10.1042, fill: C.forestDk, title: "The office",   caption: "OFFSITES · TEAM LEAGUES · BUYOUTS" });
  col({ x: 14.5312, fill: C.cream,    title: "Just curious", caption: "FIRST-TIMERS · WALK-INS WELCOME" });
}

// =====================================================================
// SLIDE 8 — Launch plan (4 timeline columns, text-only)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  eyebrow(s, "LAUNCH PLAN", "08 / 10");
  subEyebrow(s, "ROAD TO OPENING");

  bigHeadline(s, [
    { text: "The ",    color: C.nearBlk },
    { text: "runway.", color: C.forest, italic: true },
  ], { y: 1.6042, h: 1.1416 });

  const milestone = ({ x, date, title, body }) => {
    s.addText(date, {
      x, y: 4.0374, w: 4.1844, h: 0.3125,
      fontFace: F.header, fontSize: 18, bold: true,
      color: C.forest, charSpacing: cs(396), margin: 0,
    });
    s.addText(title, {
      x, y: 4.4541, w: 4.1844, h: 0.6146,
      fontFace: F.header, fontSize: 31.5,
      color: C.nearBlk, charSpacing: cs(-31), margin: 0,
    });
    s.addText(body, {
      x, y: 5.1729, w: 4.1844, h: 1.1291,
      fontFace: F.body, fontSize: 18, color: C.bodyGrey, margin: 0,
    });
  };

  milestone({
    x: 1.25, date: "APR 2026", title: "Announce",
    body: "Brand reveal, press kit, and early-access signups. Local media and founding-member outreach.",
  });
  milestone({
    x: 5.7292, date: "JUN 2026", title: "Preview Nights",
    body: "Invitation-only soft opens for press, founding members, and partners. Feedback loop in public.",
  });
  milestone({
    x: 10.2083, date: "SEP 2026", title: "Open House",
    body: "Two weeks of free walk-in bay time, coach demos, and a neighborhood block party out front.",
  });
  milestone({
    x: 14.6875, date: "OCT 2026", title: "Grand Opening",
    body: "Full operations. Memberships, leagues, corporate bookings, and daily walk-ins all live.",
  });
}

// =====================================================================
// SLIDE 9 — Membership (3 pricing cards)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  eyebrow(s, "MEMBERSHIP", "09 / 10");
  subEyebrow(s, "WAYS IN");

  bigHeadline(s, [
    { text: "Book a bay or ", color: C.nearBlk },
    { text: "belong.",         color: C.forest, italic: true },
  ], { y: 1.5, h: 1.1416 });

  const pcard = ({ x, bg, kickerColor, kicker, priceColor, price, priceLabel, priceLabelSize, priceLabelColor, body, bodyColor, hrColor, bullets, bulletColor }) => {
    // Card
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 3.2666, w: 5.6388, h: 7.0459,
      fill: { color: bg }, line: { type: "none" },
    });
    // Kicker
    s.addText(kicker, {
      x: x + 0.3854, y: 3.6937, w: 5.014, h: 0.3125,
      fontFace: F.header, fontSize: 18, bold: true,
      color: kickerColor, charSpacing: cs(396), margin: 0,
    });
    // Price line
    s.addText(
      [
        { text: price,      options: { fontFace: F.header, fontSize: 45, color: priceColor,      charSpacing: cs(-90) } },
        { text: priceLabel, options: { fontFace: F.header, fontSize: priceLabelSize, color: priceLabelColor, charSpacing: cs(-90) } },
      ],
      { x: x + 0.3854, y: 4.1729, w: 5.014, h: 0.6667, margin: 0, valign: "middle" }
    );
    // Body
    s.addText(body, {
      x: x + 0.3854, y: 5.0479, w: 5.014, h: 1.2917,
      fontFace: F.body, fontSize: 18, color: bodyColor, margin: 0,
    });
    // Divider hairline
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.3854, y: 8.1094, w: 4.868, h: 0.0104,
      fill: { color: hrColor }, line: { type: "none" },
    });
    // Bullet list (source renders as plain lines, not bulleted, per XML)
    const runs = bullets.map((b, i) => ({
      text: b,
      options: {
        fontFace: F.body, fontSize: 18, color: bulletColor,
        breakLine: i !== bullets.length - 1,
      },
    }));
    s.addText(runs, {
      x: x + 0.2104, y: 8.1198, w: 5.1263, h: 2.0,
      margin: 0, valign: "top",
    });
  };

  // Walk-in (white)
  pcard({
    x: 1.25, bg: C.white,
    kicker: "WALK-IN", kickerColor: C.forest,
    price: "$60 ", priceColor: C.nearBlk,
    priceLabel: "/ bay hour", priceLabelSize: 18, priceLabelColor: C.bodyGrey,
    body: "The front door. Book any open bay, any time — no membership required.",
    bodyColor: C.bodyGrey,
    hrColor: C.nearBlk,
    bullets: ["Up to 6 players per bay", "Full Trackman access", "Online booking"],
    bulletColor: C.bodyGrey,
  });

  // The Club (dark, featured)
  pcard({
    x: 7.1805, bg: C.forestDk,
    kicker: "THE CLUB", kickerColor: C.goldLt,
    price: "$295 ", priceColor: C.cream,
    priceLabel: "/ month", priceLabelSize: 18, priceLabelColor: C.cream,
    body: "Our members' tier — the best way to play weekly, with perks at the bar and the coach.",
    bodyColor: C.cream,
    hrColor: C.cream,
    bullets: ["Four bay hours per month", "Short-game room unlimited", "15% off lessons & the bar", "Priority booking"],
    bulletColor: C.cream,
  });

  // Corporate (white)
  pcard({
    x: 13.1111, bg: C.white,
    kicker: "CORPORATE", kickerColor: C.forest,
    price: "Custom ", priceColor: C.nearBlk,
    priceLabel: "/ buyout", priceLabelSize: 18, priceLabelColor: C.bodyGrey,
    body: "Offsites, leagues, and private events — up to 120 guests for a full-venue buyout.",
    bodyColor: C.bodyGrey,
    hrColor: C.nearBlk,
    bullets: ["Full-venue or half-venue", "Dedicated event coordinator", "Catering & bar tabs"],
    bulletColor: C.bodyGrey,
  });
}

// =====================================================================
// SLIDE 10 — Find Us (split layout w/ CTA button + map panel)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  // Right-side gold panel
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.4762, y: 0, w: 9.5238, h: 11.25,
    fill: { color: C.gold }, line: { type: "none" },
  });

  // Eyebrow (no page number on source)
  s.addText("FIND US", {
    x: 1.25, y: 1.0985, w: 8.6446, h: 0.3125,
    fontFace: F.header, fontSize: 18,
    color: C.forest, charSpacing: cs(396), margin: 0,
  });

  // Big two-tone headline
  s.addText(
    [
      { text: "See you on the ", options: { fontFace: F.header, fontSize: 97.5, color: C.nearBlk, charSpacing: cs(-195) } },
      { text: "tee.",             options: { fontFace: F.header, fontSize: 97.5, italic: true, color: C.forest, charSpacing: cs(-195) } },
    ],
    { x: 1.25, y: 1.5568, w: 8.6446, h: 2.6416, align: "left", margin: 0 }
  );

  // Contact row helper
  const row = ({ yDiv, yLabel, yValue, label, value, valueH }) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 1.25, y: yDiv, w: 7.0833, h: 0.0104,
      fill: { color: C.nearBlk }, line: { type: "none" },
    });
    s.addText(label, {
      x: 1.25, y: yLabel, w: 1.8542, h: 0.3125,
      fontFace: F.header, fontSize: 18, bold: true,
      color: C.forest, charSpacing: cs(360), margin: 0,
    });
    s.addText(value, {
      x: 3.0208, y: yValue, w: 5.4719, h: valueH,
      fontFace: F.header, fontSize: 25.5, color: C.nearBlk, margin: 0,
    });
  };

  row({ yDiv: 4.7401, yLabel: 5.0682, yValue: 4.9588, label: "ADDRESS",
        value: "184 Wythe Avenue, Brooklyn, NY 11249", valueH: 0.8542 });
  row({ yDiv: 6.063,  yLabel: 6.3911, yValue: 6.2817, label: "HOURS",
        value: "Mon – Sun · 11am – 1am", valueH: 0.4479 });
  row({ yDiv: 6.9797, yLabel: 7.3078, yValue: 7.1984, label: "ONLINE",
        value: "fairwayandsons.club · @fairwayandsons", valueH: 0.8542 });
  row({ yDiv: 8.3026, yLabel: 8.6307, yValue: 8.5213, label: "PRESS",
        value: "press@fairwayandsons.club", valueH: 0.4479 });

  // Dark CTA button
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.25, y: 9.5109, w: 4.5338, h: 0.7448,
    fill: { color: C.forestDk }, line: { type: "none" },
  });
  s.addText("RESERVE YOUR BAY →", {
    x: 1.625, y: 9.7401, w: 3.9198, h: 0.3281,
    fontFace: F.header, fontSize: 18, bold: true,
    color: C.cream, charSpacing: cs(396), margin: 0,
  });

  // Map label on gold panel
  s.addText("MAP — WYTHE AVE, BROOKLYN", {
    x: 10.8928, y: 0.4167, w: 8.9762, h: 10.4583,
    fontFace: F.header, fontSize: 18,
    color: C.white, charSpacing: cs(324),
    valign: "bottom", margin: 0,
  });
}

// ----- Write -----
pres.writeFile({ fileName: "Fairway_and_Sons.pptx" }).then((fn) => {
  console.log("Wrote:", fn);
});
