// build.js — recreates "RE_Agent_for_Sherman_Oaks.pptx" using pptxgenjs.
// Usage: node build.js
// Requires: npm install pptxgenjs
// Assets: map.png (slide 2) and ventura.png (slide 6) must sit next to this file.

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

// --------------------------------------------------------------------------
// Palette & typography
// --------------------------------------------------------------------------
const C = {
  navy:   "1A2E3B",  // dark navy — primary
  slate:  "4A5A66",  // slate gray — body / caption
  gold:   "8A6D3B",  // dark gold — accent
  light:  "C9A961",  // light gold — dark-bg accent
  cream:  "F5F1EA",  // page background
  paper:  "FBF8F2",  // photo-label & map-card background
  beige:  "E4DCCB",  // photo frame
  rule:   "C9BFA9",  // thin divider line
};

const FONT = "Arial";

// --------------------------------------------------------------------------
// Asset loading (base64)
// --------------------------------------------------------------------------
function loadImage(file) {
  const abs = path.join(__dirname, file);
  const b64 = fs.readFileSync(abs).toString("base64");
  return `image/png;base64,${b64}`;
}
const MAP_IMG = loadImage("map.png");
const VENTURA_IMG = loadImage("ventura.png");

// --------------------------------------------------------------------------
// Presentation setup — custom 20" x 11.25" slide
// --------------------------------------------------------------------------
const pres = new pptxgen();
pres.defineLayout({ name: "SHERMAN_OAKS", width: 20, height: 11.25 });
pres.layout = "SHERMAN_OAKS";
pres.title = "A Buyer's Introduction — Sherman Oaks";
pres.author = "Real Estate Agent for Sherman Oaks";

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------
// spc is in 1/100 points (OOXML); pptxgenjs charSpacing is in points.
const spcPt = (spc) => (spc ? spc / 100 : 0);

// Standard page header (diamond + "SHERMAN OAKS" + page indicator)
function addHeader(slide, pageLabel, darkMode = false) {
  const textColor = darkMode ? C.cream : C.slate;
  const diamondStroke = darkMode ? C.cream : C.navy;

  // Diamond (rotated square outline)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: darkMode ? 0.84 : 1.044,
    y: darkMode ? 0.88 : 1.086,
    w: 0.25, h: 0.25,
    fill: { type: "none" },
    line: { color: diamondStroke, width: 0.94 },
    rotate: 45,
  });

  // "SHERMAN OAKS"
  slide.addText("SHERMAN OAKS", {
    x: darkMode ? 1.23 : 1.44,
    y: darkMode ? 0.85 : 1.06,
    w: 2.58, h: 0.34,
    fontFace: FONT, fontSize: 18, color: textColor,
    charSpacing: spcPt(324),
    margin: 0, valign: "middle",
  });

  // Right-side page indicator (e.g. "02 / 08 · LOCATION")
  slide.addText(pageLabel.text, {
    x: pageLabel.x, y: darkMode ? 0.83 : 1.04,
    w: pageLabel.w, h: 0.38,
    fontFace: FONT, fontSize: 18, color: textColor,
    charSpacing: spcPt(180),
    margin: 0, valign: "middle",
  });
}

// Slide title (large navy heading appearing just below header)
function addSlideTitle(slide, text) {
  slide.addText(text, {
    x: 1.04, y: 1.80, w: 18.45, h: 0.79,
    fontFace: FONT, fontSize: 51, color: C.navy,
    charSpacing: spcPt(-76),
    margin: 0, valign: "middle",
  });
}

// Thin horizontal divider
function hr(slide, x, y, w, color = C.rule) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: 0.013,
    fill: { color },
    line: { type: "none" },
  });
}

// Photo-placeholder frame (beige block with cream label bar containing caption)
function photoFrame(slide, x, y, w, h, label, labelBox) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: C.beige },
    line: { color: C.rule, width: 0.94 },
  });
  // cream label background
  slide.addShape(pres.shapes.RECTANGLE, {
    x: labelBox.x, y: labelBox.y, w: labelBox.w, h: labelBox.h,
    fill: { color: C.paper },
    line: { color: C.rule, width: 0.94 },
  });
  slide.addText(label, {
    x: labelBox.x + 0.2, y: labelBox.y + 0.12,
    w: labelBox.w - 0.4, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.slate,
    charSpacing: spcPt(108),
    align: "center", valign: "middle", margin: 0,
  });
}

// --------------------------------------------------------------------------
// SLIDE 1 — Title / cover
// --------------------------------------------------------------------------
function slide1() {
  const s = pres.addSlide();
  s.background = { color: C.cream };

  // Eyebrow — top left
  s.addText("A BUYER'S INTRODUCTION", {
    x: 0.83, y: 0.83, w: 5.91, h: 0.37,
    fontFace: FONT, fontSize: 19.5, color: C.gold,
    charSpacing: spcPt(429), bold: false,
    margin: 0, valign: "middle",
  });

  // Top-right volume marker
  s.addText("VOL. 01 · 2026", {
    x: 17.12, y: 0.83, w: 2.13, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.slate,
    charSpacing: spcPt(180),
    margin: 0, valign: "middle", align: "right",
  });

  // Giant masthead: "Sherman Oaks."
  s.addText(
    [
      { text: "Sherman ", options: { color: C.navy, fontFace: FONT, fontSize: 150, charSpacing: spcPt(-375) } },
      { text: "Oaks.",    options: { color: C.gold, fontFace: FONT, fontSize: 150, charSpacing: spcPt(-375), italic: true } },
    ],
    { x: 1.04, y: 2.52, w: 18.67, h: 4.01, margin: 0, valign: "top", align: "left" }
  );

  // Body paragraph
  s.addText(
    "A quiet corner of the San Fernando Valley, shaped by tree-lined streets, good schools, and an easy relationship with the rest of Los Angeles.",
    {
      x: 1.04, y: 6.91, w: 11.80, h: 1.59,
      fontFace: FONT, fontSize: 28.5, color: C.slate,
      margin: 0, valign: "top",
    }
  );

  // Bottom-left city line
  s.addText("LOS ANGELES · CALIFORNIA · 91403 / 91423", {
    x: 0.83, y: 10.13, w: 6.66, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.slate,
    charSpacing: spcPt(216),
    margin: 0, valign: "middle",
  });

  // Bottom-right coordinates
  s.addText("34.1508° N 118.4489° W", {
    x: 15.20, y: 9.82, w: 3.97, h: 0.35,
    fontFace: FONT, fontSize: 19.5, color: C.navy,
    charSpacing: spcPt(216),
    margin: 0, valign: "middle", align: "right",
  });
  s.addText("ELEV. 725 FT · ZIP 91403", {
    x: 15.20, y: 10.13, w: 3.97, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.slate,
    charSpacing: spcPt(216),
    margin: 0, valign: "middle", align: "right",
  });
}

// --------------------------------------------------------------------------
// SLIDE 2 — Location & Orientation
// --------------------------------------------------------------------------
function slide2() {
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addHeader(s, { text: "02 / 08 · LOCATION", x: 15.81, w: 3.24 });
  addSlideTitle(s, "Location & Orientation.");

  // Intro paragraph
  s.addText(
    "Tucked into the south-central Valley between the 101 and 405, Sherman Oaks sits fifteen minutes from the Westside and twenty from the studios.",
    {
      x: 1.04, y: 3.29, w: 7.92, h: 1.39,
      fontFace: FONT, fontSize: 24, color: C.navy,
      margin: 0, valign: "top",
    }
  );

  // Distance rows — each row: label (left), miles (middle), time (gold, right)
  const rows = [
    ["Downtown Los Angeles",    "16 mi", "~30 min"],
    ["Beverly Hills",           "8 mi",  "~22 min"],
    ["Santa Monica & the coast","13 mi", "~28 min"],
    ["Burbank (studios & BUR)", "7 mi",  "~16 min"],
    ["LAX",                     "19 mi", "~35 min"],
  ];
  const rowYs = [5.15, 5.82, 6.49, 7.16, 7.83];
  const hrYs  = [4.98, 5.65, 6.32, 6.99, 7.67, 8.33]; // 6 rules (top + between + bottom)

  hrYs.forEach((y) => hr(s, 1.042, y, 7.687));

  rows.forEach(([label, miles, mins], i) => {
    const y = rowYs[i];
    s.addText(label, {
      x: 1.04, y, w: 5.04, h: 0.38,
      fontFace: FONT, fontSize: 19.5, color: C.navy,
      margin: 0, valign: "middle",
    });
    s.addText(miles, {
      x: 5.85, y, w: 1.21, h: 0.38,
      fontFace: FONT, fontSize: 19.5, color: C.slate,
      charSpacing: spcPt(78), align: "right",
      margin: 0, valign: "middle",
    });
    s.addText(mins, {
      x: 6.98, y, w: 1.75, h: 0.38,
      fontFace: FONT, fontSize: 19.5, color: C.gold,
      charSpacing: spcPt(78), align: "right",
      margin: 0, valign: "middle",
    });
  });

  // MAP CARD — right half
  s.addShape(pres.shapes.RECTANGLE, {
    x: 9.56, y: 3.29, w: 9.40, h: 7.13,
    fill: { color: C.paper },
    line: { color: C.rule, width: 0.94 },
  });

  // Map illustration image (roads)
  s.addImage({
    data: MAP_IMG,
    x: 9.575, y: 3.304, w: 9.370, h: 7.027,
  });

  // Labels overlaying the map
  s.addText("SAN FERNANDO VALLEY", {
    x: 9.83, y: 3.55, w: 3.56, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.slate,
    charSpacing: spcPt(180), margin: 0, valign: "middle",
  });
  s.addText("N ↑", {
    x: 18.25, y: 3.55, w: 0.53, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.slate,
    charSpacing: spcPt(180), margin: 0, valign: "middle",
  });
  s.addText("I-405 ▲", {
    x: 12.28, y: 4.03, w: 1.15, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.gold,
    charSpacing: spcPt(180), margin: 0, valign: "middle",
  });
  s.addText("· STUDIO CITY", {
    x: 10.24, y: 4.93, w: 2.14, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.slate,
    charSpacing: spcPt(180), margin: 0, valign: "middle",
  });
  s.addText("· ENCINO", {
    x: 15.62, y: 5.28, w: 1.41, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.slate,
    charSpacing: spcPt(180), margin: 0, valign: "middle",
  });
  s.addText("US-101 ▶", {
    x: 9.83, y: 6.38, w: 1.42, h: 0.38,
    fontFace: FONT, fontSize: 18, color: C.gold,
    charSpacing: spcPt(180), margin: 0, valign: "middle",
  });

  // Sherman Oaks dot + label
  s.addShape(pres.shapes.OVAL, {
    x: 13.01, y: 6.64, w: 0.187, h: 0.187,
    fill: { color: C.gold }, line: { type: "none" },
  });
  s.addText("Sherman Oaks", {
    x: 13.30, y: 6.87, w: 2.03, h: 0.38,
    fontFace: FONT, fontSize: 21, color: C.navy,
    margin: 0, valign: "middle",
  });

  s.addText("· BEL AIR", {
    x: 11.45, y: 8.51, w: 1.40, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.slate,
    charSpacing: spcPt(180), margin: 0, valign: "middle",
  });
  s.addText("SANTA MONICA MTNS", {
    x: 15.64, y: 9.18, w: 3.15, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.slate,
    charSpacing: spcPt(180), margin: 0, valign: "middle",
  });

  // Figure caption block at bottom of map card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 9.76, y: 9.74, w: 7.70, h: 0.48,
    fill: { color: C.paper },
    line: { color: C.rule, width: 0.94 },
  });
  s.addText("FIG. 01 — NEIGHBORHOOD CONTEXT, NOT TO SCALE", {
    x: 9.92, y: 9.83, w: 7.61, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.slate,
    charSpacing: spcPt(144),
    margin: 0, valign: "middle",
  });
}

// --------------------------------------------------------------------------
// SLIDE 3 — The Neighborhood Character
// --------------------------------------------------------------------------
function slide3() {
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addHeader(s, { text: "03 / 08 · CHARACTER", x: 15.63, w: 3.42 });
  addSlideTitle(s, "The Neighborhood Character.");

  // Large left photo frame
  photoFrame(
    s, 1.04, 3.12, 10.33, 6.28,
    "PHOTO — TREE-LINED RESIDENTIAL STREET",
    { x: 2.97, y: 6.01, w: 6.47, h: 0.52 }
  );

  // Top-right photo frame
  photoFrame(
    s, 11.66, 3.12, 7.30, 3.00,
    "PHOTO — VENTURA BLVD STOREFRONTS",
    { x: 12.31, y: 4.36, w: 5.99, h: 0.52 }
  );

  // Bottom-right photo frame
  photoFrame(
    s, 11.66, 6.41, 7.30, 3.00,
    "PHOTO — TRADITIONAL RANCH-STYLE HOME",
    { x: 12.06, y: 7.65, w: 6.51, h: 0.52 }
  );

  // Caption paragraph below photos (mixed bold + regular)
  s.addText(
    [
      { text: "A mix of ", options: { color: C.slate } },
      { text: "ranch, traditional, and contemporary ", options: { color: C.navy, bold: true } },
      { text: "homes sit beneath mature trees on walkable streets. The feel is suburban and residential, but Ventura Boulevard — the neighborhood's commercial spine — keeps daily life close at hand.",
        options: { color: C.slate } },
    ],
    {
      x: 1.04, y: 9.66, w: 15.02, h: 0.80,
      fontFace: FONT, fontSize: 19.5,
      margin: 0, valign: "top",
    }
  );
}

// --------------------------------------------------------------------------
// SLIDE 4 — Housing Market at a Glance
// --------------------------------------------------------------------------
function slide4() {
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addHeader(s, { text: "04 / 08 · MARKET", x: 16.16, w: 2.88 });
  addSlideTitle(s, "Housing Market at a Glance.");

  // 6 metric cards in a 3x2 grid, each with: top navy rule, label, big number (optional gold suffix), caption.
  const metrics = [
    { x: 1.04, y1: 3.86, y2: 6.90, col: 0 },
    { x: 7.22, y1: 3.86, y2: 6.90, col: 1 },
    { x: 13.40, y1: 3.86, y2: 6.90, col: 2 },
  ];

  const cards = [
    // row 1
    { x: 1.04,  top: 3.86, label: "MEDIAN SALE PRICE",          big: "$1.42 ", suffix: "M", sub: "Single-family · Q1 2026" },
    { x: 7.22,  top: 3.86, label: "PRICE / SQ FT",              big: "$712",   suffix: "",  sub: "+4.1% YoY" },
    { x: 13.40, top: 3.86, label: "MEDIAN DAYS ON MARKET",      big: "28",     suffix: "",  sub: "Balanced pacing" },
    // row 2
    { x: 1.04,  top: 6.90, label: "INVENTORY (ACTIVE LISTINGS)", big: "142",   suffix: "",  sub: "Across 91403 & 91423" },
    { x: 7.22,  top: 6.90, label: "SALE-TO-LIST RATIO",          big: "99 ",   suffix: "%", sub: "Healthy buyer leverage" },
    { x: 13.40, top: 6.90, label: "5-YR APPRECIATION",           big: "+32 ",  suffix: "%", sub: "Single-family · 2021–2026" },
  ];

  cards.forEach((c) => {
    // navy top rule
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: c.top, w: 5.56, h: 0.013,
      fill: { color: C.navy }, line: { type: "none" },
    });
    // all-caps label
    s.addText(c.label, {
      x: c.x, y: c.top + 0.31, w: 5.72, h: 0.34,
      fontFace: FONT, fontSize: 18, color: C.slate,
      charSpacing: spcPt(324),
      margin: 0, valign: "middle",
    });
    // big number + optional gold suffix
    const runs = [
      { text: c.big, options: { color: C.navy, fontFace: FONT, fontSize: 82.5, charSpacing: spcPt(-165) } },
    ];
    if (c.suffix) {
      runs.push({ text: c.suffix, options: { color: C.gold, fontFace: FONT, fontSize: 36, charSpacing: spcPt(-165) } });
    }
    s.addText(runs, {
      x: c.x, y: c.top + 0.79, w: 5.72, h: 1.19,
      margin: 0, valign: "middle",
    });
    // caption
    s.addText(c.sub, {
      x: c.x, y: c.top + 2.13, w: 5.72, h: 0.33,
      fontFace: FONT, fontSize: 18, color: C.slate,
      charSpacing: spcPt(72),
      margin: 0, valign: "middle",
    });
  });

  // Source footer
  s.addText("SOURCE — PLACEHOLDER FIGURES FOR PRESENTATION USE. REPLACE WITH CURRENT MLS DATA BEFORE PITCH.", {
    x: 1.04, y: 10.13, w: 18.45, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.slate,
    charSpacing: spcPt(180),
    margin: 0, valign: "middle",
  });
}

// --------------------------------------------------------------------------
// SLIDE 5 — Lifestyle & Amenities
// --------------------------------------------------------------------------
function slide5() {
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addHeader(s, { text: "05 / 08 · LIFESTYLE", x: 15.63, w: 3.42 });
  addSlideTitle(s, "Lifestyle & Amenities.");

  // 4 numbered sections on the left
  const items = [
    {
      ruleY: 3.21, headY: 3.41, numY: 3.49, bodyY: 3.89,
      head: "Dining & Ventura Boulevard", headW: 4.22, num: "01",
      body: "A four-mile commercial corridor of cafes, bistros, and neighborhood staples — walking distance from most homes south of the 101.",
    },
    {
      ruleY: 4.92, headY: 5.12, numY: 5.20, bodyY: 5.60,
      head: "Parks & Recreation", headW: 2.96, num: "02",
      body: "Sherman Oaks Park, Van Nuys Sherman Oaks Rec Center, and quick access to hiking along Mulholland and Fryman Canyon.",
    },
    {
      ruleY: 6.64, headY: 6.84, numY: 6.92, bodyY: 7.32,
      head: "Shopping & Daily Errands", headW: 3.93, num: "03",
      body: "Westfield Fashion Square and The Sherman Oaks Galleria anchor the area; specialty grocers line Ventura.",
    },
    {
      ruleY: 8.35, headY: 8.55, numY: 8.63, bodyY: 9.03,
      head: "Arts & Entertainment", headW: 3.17, num: "04",
      body: "Minutes from studio lots in Burbank, Universal City, and Studio City — and from the Hollywood Bowl.",
    },
  ];

  items.forEach((it) => {
    hr(s, 1.042, it.ruleY, 8.65);
    s.addText(it.head, {
      x: 1.04, y: it.headY, w: it.headW, h: 0.42,
      fontFace: FONT, fontSize: 24, color: C.navy,
      margin: 0, valign: "middle",
    });
    s.addText(it.num, {
      x: 9.36, y: it.numY, w: 0.41, h: 0.33,
      fontFace: FONT, fontSize: 18, color: C.slate,
      charSpacing: spcPt(180),
      margin: 0, valign: "middle",
    });
    s.addText(it.body, {
      x: 1.04, y: it.bodyY, w: 8.91, h: 0.74,
      fontFace: FONT, fontSize: 18, color: C.slate,
      margin: 0, valign: "top",
    });
  });

  // Two photo frames on the right
  photoFrame(
    s, 10.31, 3.21, 8.65, 3.77,
    "PHOTO — VENTURA BLVD CAFE PATIO",
    { x: 11.86, y: 4.83, w: 5.54, h: 0.52 }
  );
  photoFrame(
    s, 10.31, 7.27, 8.65, 3.15,
    "PHOTO — FRYMAN CANYON TRAILHEAD",
    { x: 11.74, y: 8.58, w: 5.80, h: 0.52 }
  );
}

// --------------------------------------------------------------------------
// SLIDE 6 — Ventura Boulevard Retail
// --------------------------------------------------------------------------
function slide6() {
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addHeader(s, { text: "06 / 08 · VENTURA BLVD", x: 15.11, w: 3.97 });
  addSlideTitle(s, "Ventura Boulevard Retail.");

  // Intro paragraph
  s.addText(
    "Four miles of independent shops, neighborhood anchors, and two covered centers run the length of the neighborhood — most of it walkable from the residential streets just off the boulevard.",
    {
      x: 1.04, y: 3.08, w: 8.80, h: 1.84,
      fontFace: FONT, fontSize: 24, color: C.navy,
      margin: 0, valign: "top",
    }
  );

  // 6 category blocks in a 2x3 grid
  const cats = [
    { col: 0, row: 0, head: "Covered Centers",        headW: 2.29, num: "01", body: "Westfield Fashion Square · Sherman Oaks Galleria" },
    { col: 1, row: 0, head: "Grocery & Specialty Food", headW: 3.42, num: "02", body: "Trader Joe's · Whole Foods · Gelson's · Erewhon · Bristol Farms" },
    { col: 0, row: 1, head: "Home & Design",          headW: 2.13, num: "03", body: "Crate & Barrel · West Elm · Room & Board · CB2 · independents" },
    { col: 1, row: 1, head: "Apparel & Goods",        headW: 2.30, num: "04", body: "Bloomingdale's · Macy's · Lululemon · local boutiques" },
    { col: 0, row: 2, head: "Fitness & Wellness",     headW: 2.56, num: "05", body: "Equinox · SoulCycle · Orangetheory · neighborhood studios" },
    { col: 1, row: 2, head: "Cafés & Everyday",       headW: 2.42, num: "06", body: "Blue Bottle · Alfred · Great White · independent bakeries" },
  ];
  const colX = [1.04, 5.78];
  const numX = [5.04, 9.78];
  const ruleYs = [5.215, 6.828, 8.442];
  const headYs = [5.39, 7.01, 8.62];
  const numYs  = [5.43, 7.05, 8.66];
  const bodyYs = [5.84, 7.45, 9.06];

  cats.forEach((c) => {
    const x = colX[c.col];
    const nx = numX[c.col];
    hr(s, x, ruleYs[c.row], 4.32);
    s.addText(c.head, {
      x, y: headYs[c.row], w: c.headW, h: 0.38,
      fontFace: FONT, fontSize: 21, color: C.navy,
      margin: 0, valign: "middle",
    });
    s.addText(c.num, {
      x: nx, y: numYs[c.row], w: 0.40, h: 0.33,
      fontFace: FONT, fontSize: 18, color: C.slate,
      charSpacing: spcPt(144),
      margin: 0, valign: "middle",
    });
    s.addText(c.body, {
      x, y: bodyYs[c.row], w: 4.45, h: 0.74,
      fontFace: FONT, fontSize: 18, color: C.slate,
      margin: 0, valign: "top",
    });
  });

  // Ventura corridor illustration card (right side)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.76, y: 3.08, w: 8.19, h: 5.30,
    fill: { color: C.paper },
    line: { color: C.rule, width: 0.94 },
  });
  // The ventura.png already contains "Ventura Blvd", "~4 MI · RETAIL CORRIDOR", and "WOODMAN SEPULVEDA BEVERLY"
  s.addImage({
    data: VENTURA_IMG,
    x: 10.777, y: 3.095, w: 8.168, h: 5.275,
  });

  // Three summary stats below the card
  const stats = [
    { x: 10.76, big: "4 ",   suffix: "mi", label: "RETAIL CORRIDOR LENGTH",  labelH: 0.67 },
    { x: 13.58, big: "400 ", suffix: "+",  label: "SHOPS & EATERIES",        labelH: 0.67 },
    { x: 16.39, big: "2",    suffix: "",   label: "COVERED SHOPPING CENTERS",labelH: 0.98 },
  ];
  stats.forEach((st) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: st.x, y: 8.63, w: 2.565, h: 0.013,
      fill: { color: C.navy }, line: { type: "none" },
    });
    const runs = [{ text: st.big, options: { color: C.navy, fontFace: FONT, fontSize: 42 } }];
    if (st.suffix) {
      runs.push({ text: st.suffix, options: { color: C.gold, fontFace: FONT, fontSize: 21 } });
    }
    s.addText(runs, {
      x: st.x, y: 8.79, w: 2.65, h: 0.62,
      margin: 0, valign: "middle",
    });
    s.addText(st.label, {
      x: st.x, y: 9.48, w: 2.65, h: st.labelH,
      fontFace: FONT, fontSize: 18, color: C.slate,
      charSpacing: spcPt(108),
      margin: 0, valign: "top",
    });
  });
}

// --------------------------------------------------------------------------
// SLIDE 7 — Schools & Family Life
// --------------------------------------------------------------------------
function slide7() {
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addHeader(s, { text: "07 / 08 · FAMILY LIFE", x: 15.28, w: 3.79 });
  addSlideTitle(s, "Schools & Family Life.");

  // Intro paragraph
  s.addText(
    "A mix of well-regarded public magnets and established private schools makes the area a durable choice for families planning a long stay.",
    {
      x: 1.04, y: 3.12, w: 8.91, h: 1.34,
      fontFace: FONT, fontSize: 24, color: C.navy,
      margin: 0, valign: "top",
    }
  );

  // 5 school rows
  const schools = [
    { ruleY: 4.71, nameY: 4.94, gradeY: 5.33, ratingY: 4.87, name: "Sherman Oaks Elementary Charter", grade: "K–6 · PUBLIC MAGNET", rating: "9",  ratingX: 9.13, ratingW: 0.64 },
    { ruleY: 5.76, nameY: 5.99, gradeY: 6.38, ratingY: 5.92, name: "Dixie Canyon Community Charter",  grade: "K–5 · PUBLIC",        rating: "8",  ratingX: 9.13, ratingW: 0.64 },
    { ruleY: 6.81, nameY: 7.04, gradeY: 7.43, ratingY: 6.97, name: "Van Nuys Middle School",          grade: "6–8 · PUBLIC MAGNET", rating: "8",  ratingX: 9.13, ratingW: 0.64 },
    { ruleY: 7.86, nameY: 8.09, gradeY: 8.48, ratingY: 8.02, name: "Notre Dame High School",          grade: "9–12 · PRIVATE",      rating: "9",  ratingX: 9.13, ratingW: 0.64 },
    { ruleY: 8.91, nameY: 9.13, gradeY: 9.53, ratingY: 9.07, name: "Buckley School",                   grade: "K–12 · INDEPENDENT", rating: "10", ratingX: 8.92, ratingW: 0.85, bottomRule: true },
  ];

  schools.forEach((sc) => {
    hr(s, 1.042, sc.ruleY, 8.65);
    s.addText(sc.name, {
      x: 1.04, y: sc.nameY, w: 8.07, h: 0.39,
      fontFace: FONT, fontSize: 21, color: C.navy,
      margin: 0, valign: "middle",
    });
    s.addText(sc.grade, {
      x: 1.04, y: sc.gradeY, w: 8.07, h: 0.33,
      fontFace: FONT, fontSize: 18, color: C.slate,
      charSpacing: spcPt(144),
      margin: 0, valign: "middle",
    });
    s.addText(
      [
        { text: sc.rating, options: { color: C.gold, fontFace: FONT, fontSize: 27 } },
        { text: "/10",    options: { color: C.slate, fontFace: FONT, fontSize: 18 } },
      ],
      {
        x: sc.ratingX, y: sc.ratingY, w: sc.ratingW, h: 0.47,
        margin: 0, valign: "middle", align: "left",
      }
    );
    if (sc.bottomRule) hr(s, 1.042, 9.96, 8.65);
  });

  // Right side: photo frame + 4 stats
  photoFrame(
    s, 10.31, 3.12, 8.65, 4.33,
    "PHOTO — FAMILY AT NEIGHBORHOOD PARK",
    { x: 11.48, y: 5.03, w: 6.30, h: 0.52 }
  );

  // Stats 2x2
  const stats = [
    { x: 10.31, y: 7.66, big: "34%", label: "HOUSEHOLDS WITH CHILDREN",     labelH: 0.35 },
    { x: 14.78, y: 7.66, big: "72%", label: "OWNER-OCCUPIED HOMES",         labelH: 0.35 },
    { x: 10.31, y: 8.99, big: "12",  label: "PUBLIC & PRIVATE SCHOOLS WITHIN 2 MI", labelH: 0.67 },
    { x: 14.78, y: 8.99, big: "A–",  label: "NICHE NEIGHBORHOOD GRADE",      labelH: 0.67 },
  ];
  stats.forEach((st) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: st.x, y: st.y, w: 4.18, h: 0.013,
      fill: { color: C.navy }, line: { type: "none" },
    });
    s.addText(st.big, {
      x: st.x, y: st.y + 0.16, w: 4.30, h: 0.58,
      fontFace: FONT, fontSize: 39, color: C.navy,
      margin: 0, valign: "middle",
    });
    s.addText(st.label, {
      x: st.x, y: st.y + 0.81, w: 4.30, h: st.labelH,
      fontFace: FONT, fontSize: 18, color: C.slate,
      charSpacing: spcPt(108),
      margin: 0, valign: "top",
    });
  });
}

// --------------------------------------------------------------------------
// SLIDE 8 — Closing (dark)
// --------------------------------------------------------------------------
function slide8() {
  const s = pres.addSlide();
  s.background = { color: C.navy };

  addHeader(s, { text: "08 / 08 · CLOSING", x: 16.19, w: 3.06 }, true);

  // "IN SUMMARY" gold eyebrow
  s.addText("IN SUMMARY", {
    x: 1.04, y: 1.90, w: 18.67, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.light,
    charSpacing: spcPt(396),
    margin: 0, valign: "middle",
  });

  // Giant concluding statement (with italic gold "neighborhood")
  s.addText(
    [
      { text: "A Valley address that lives like a ",
        options: { color: C.cream, fontFace: FONT, fontSize: 90, charSpacing: spcPt(-180) } },
      { text: "neighborhood ",
        options: { color: C.light, fontFace: FONT, fontSize: 90, charSpacing: spcPt(-180), italic: true } },
      { text: ", not a commute.",
        options: { color: C.cream, fontFace: FONT, fontSize: 90, charSpacing: spcPt(-180) } },
    ],
    { x: 1.04, y: 2.61, w: 17.17, h: 3.87, margin: 0, valign: "top" }
  );

  // Divider before 4-column summary
  hr(s, 1.04, 7.26, 18.12, C.cream);

  // 4 summary columns
  const cols = [
    { x: 1.04,  head: "01 / LOCATION",  body: "Central to the Westside, studios, and downtown.",      bodyH: 0.89 },
    { x: 5.68,  head: "02 / CHARACTER", body: "Tree-lined streets and a walkable commercial core.",   bodyH: 0.89 },
    { x: 10.31, head: "03 / FAMILY",    body: "Strong schools and an owner-occupied base.",           bodyH: 0.89 },
    { x: 14.95, head: "04 / VALUE",     body: "Steady long-term appreciation across cycles.",         bodyH: 1.32 },
  ];
  cols.forEach((c) => {
    s.addText(c.head, {
      x: c.x, y: 7.69, w: 4.35, h: 0.33,
      fontFace: FONT, fontSize: 18, color: C.light,
      charSpacing: spcPt(180),
      margin: 0, valign: "middle",
    });
    s.addText(c.body, {
      x: c.x, y: 8.12, w: 4.35, h: c.bodyH,
      fontFace: FONT, fontSize: 25.5, color: C.cream,
      margin: 0, valign: "top",
    });
  });

  // Bottom-left / right footers
  s.addText("SHERMAN OAKS · 91403 / 91423", {
    x: 0.83, y: 10.13, w: 4.82, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.cream,
    charSpacing: spcPt(216),
    margin: 0, valign: "middle",
  });
  s.addText("END · VOL. 01 · 2026", {
    x: 16.12, y: 10.13, w: 3.14, h: 0.33,
    fontFace: FONT, fontSize: 18, color: C.cream,
    charSpacing: spcPt(216),
    margin: 0, valign: "middle", align: "right",
  });
}

// --------------------------------------------------------------------------
// Build & save
// --------------------------------------------------------------------------
slide1();
slide2();
slide3();
slide4();
slide5();
slide6();
slide7();
slide8();

pres.writeFile({ fileName: "RE_Agent_for_Sherman_Oaks.pptx" }).then((file) => {
  console.log(`Wrote: ${file}`);
});
