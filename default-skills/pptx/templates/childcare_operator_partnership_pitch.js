// generate.js
// Recreates Day_Care.pptx using pptxgenjs.
// Usage: node generate.js   (requires: npm install pptxgenjs)
//
// The two images (image-3-1.png, image-4-1.jpeg) are embedded as base64
// strings loaded from img_b64.js, so this produces a single self-contained
// .pptx output without needing any loose image files.

const pptxgen = require("pptxgenjs");
const { IMG_MAP, IMG_PHOTO } = require("./img_b64.js");

// ---------- Palette (exact hex values from source XML) ----------
const C = {
  bg:        "F2ECE0", // cream background
  darkBg:    "11213A", // dark navy (slide 9)
  ink:       "1B2A3A", // main text / near-black navy
  inkSoft:   "35475B", // secondary ink
  muted:     "6B7786", // labels, captions
  accent:    "B85C3A", // terracotta accent
  accentLt:  "D98A68", // lighter accent (dark slide)
  rule:      "C9BFAA", // thin rule lines
  card:      "FAF6EC", // card fill on cream bg
  cardDim:   "EDE5D4", // alt card fill (map panel, totals row)
  cream:     "FAF6EC", // same as card — used on dark slide
};

const FONT = "Arial";

// ---------- Instance ----------
const pres = new pptxgen();
// Custom 20" x 11.25" canvas (matches the source sldSz of 18288000 x 10287000 EMU)
pres.defineLayout({ name: "HO_20x1125", width: 20, height: 11.25 });
pres.layout = "HO_20x1125";

// ---------- Helpers ----------
// Converts a raw `spc` value from the source XML (hundredths of a point) into
// pptxgenjs charSpacing (points). Source uses values like 432 -> +4.32pt tracking.
const spc = (v) => (v == null ? undefined : v / 100);
// Converts `sz` from source (hundredths of a point) to pptxgenjs fontSize (points).
const fs  = (v) => v / 100;

// Standard text-box body options. The source uses 25400 EMU internal margin
// on every text box (~0.028"), so we mirror that with a near-zero margin.
const TB = { margin: 0.03, valign: "top", fontFace: FONT, isTextBox: true };

// Shorthand for a simple solid-fill rect
function rect(slide, x, y, w, h, color) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color }, line: { type: "none" },
  });
}
function oval(slide, x, y, w, h, color) {
  slide.addShape(pres.shapes.OVAL, {
    x, y, w, h, fill: { color }, line: { type: "none" },
  });
}

// ============================================================
// SLIDE 1 — Cover
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  // Orange wordmark dot
  oval(s, 1.0417, 1.0885, 0.2292, 0.2292, C.accent);

  // "Harbor & Oak — Early Learning" wordmark
  s.addText(
    [
      { text: "Harbor & Oak ", options: { color: C.ink, charSpacing: spc(-19) } },
      { text: "— Early Learning", options: { color: C.muted, charSpacing: spc(-19) } },
    ],
    { ...TB, x: 1.3958, y: 1.0417, w: 3.8573, h: 0.3646, fontSize: fs(1950) }
  );

  // Eyebrow label
  s.addText("OPERATOR PARTNERSHIP · 2026", {
    ...TB, x: 1.0417, y: 2.1999, w: 8.4053, h: 0.3646,
    fontSize: fs(1800), color: C.accent, charSpacing: spc(432),
  });

  // Big hero headline
  s.addText(
    [
      { text: "An early learning center for the ", options: { color: C.ink, charSpacing: spc(-252) } },
      { text: "North Shore.", options: { color: C.accent, italic: true, charSpacing: spc(-252) } },
    ],
    { ...TB, x: 1.0417, y: 2.8145, w: 8.4053, h: 3.6068,
      fontSize: fs(8400), lineSpacingMultiple: 0.98 }
  );

  // Italic subhead (source uses 120% line spacing, but pptxgenjs's
  // lineSpacingMultiple renders tighter than PowerPoint; 1.05 gives a
  // visual match to the source render)
  s.addText(
    "A turnkey opportunity to operate a licensed Group Child Care program in West Brighton, Staten Island.",
    { ...TB, x: 1.0417, y: 6.7962, w: 7.725, h: 1.6916,
      fontSize: fs(3300), italic: true, color: C.inkSoft,
      lineSpacingMultiple: 1.05 }
  );

  // Thin horizontal rule above the meta row
  rect(s, 1.0417, 9.0312, 8.1605, 0.0104, C.rule);

  // LOCATION block
  s.addText("LOCATION", {
    ...TB, x: 1.0417, y: 9.375, w: 3.9451, h: 0.3333,
    fontSize: fs(1800), color: C.muted, charSpacing: spc(324),
  });
  s.addText("Forest Avenue corridor West Brighton, SI 10310", {
    ...TB, x: 1.0417, y: 9.7708, w: 3.9451, h: 0.6875,
    fontSize: fs(1950), color: C.ink,
  });

  // PREPARED FOR block
  s.addText("PREPARED FOR", {
    ...TB, x: 5.3719, y: 9.375, w: 3.9451, h: 0.3333,
    fontSize: fs(1800), color: C.muted, charSpacing: spc(324),
  });
  s.addText(
    [
      { text: "Prospective operating partners ", options: { color: C.ink } },
      { text: "Confidential · April 2026", options: { color: C.muted } },
    ],
    { ...TB, x: 5.3719, y: 9.7708, w: 3.9451, h: 0.6875, fontSize: fs(1950) }
  );

  // Vertical divider splitting the slide into left content / right empty
  rect(s, 10.2438, 0, 0.0104, 11.25, C.rule);
}

// ============================================================
// Shared helpers for content slides (2–8): eyebrow + footer
// ============================================================
function addEyebrow(slide, num, label) {
  slide.addText(
    [
      { text: `${num} / 09 `, options: { color: C.muted, charSpacing: spc(432) } },
      { text: label,          options: { color: C.accent, charSpacing: spc(432) } },
    ],
    { ...TB, x: 1.25, y: 1.0417, w: 18.025, h: 0.3646, fontSize: fs(1800) }
  );
}
function addFooter(slide, y, tag) {
  slide.addText("HARBOR & OAK · EARLY LEARNING", {
    ...TB, x: 1.25, y, w: 4.9953, h: 0.3333,
    fontSize: fs(1800), color: C.ink, charSpacing: spc(144),
  });
  // Right-aligned tag; use right edge at 18.846 to match source
  slide.addText(tag, {
    ...TB, x: 12.85, y, w: 5.996, h: 0.3333,
    fontSize: fs(1800), color: C.muted, charSpacing: spc(144),
    align: "right",
  });
}

// ============================================================
// SLIDE 2 — The Opportunity (three-stat grid)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addEyebrow(s, "02", "THE OPPORTUNITY");

  // Section headline
  s.addText(
    [
      { text: "Staten Island has the city's highest share of young families ", options: { color: C.ink, charSpacing: spc(-165) } },
      { text: "— and too few licensed seats.", options: { color: C.accent, italic: true, charSpacing: spc(-165) } },
    ],
    { ...TB, x: 1.25, y: 1.7396, w: 15.0208, h: 2.9505, fontSize: fs(6600) }
  );

  // Top + bottom rules spanning the stat grid
  rect(s, 1.25, 5.5711, 17.5, 0.0104, C.rule);
  rect(s, 1.25, 9.9062, 17.5, 0.0104, C.rule);

  // Two thin vertical dividers between the three stats
  rect(s, 7.0833,  5.5815, 0.0104, 4.3247, C.rule);
  rect(s, 12.9167, 5.5815, 0.0104, 4.3247, C.rule);

  // --- Stat 1 --------------------------------------------------
  s.addText(
    [
      { text: "~",    options: { color: C.ink,    charSpacing: spc(-270) } },
      { text: "8.3k", options: { color: C.accent, italic: true, charSpacing: spc(-270) } },
    ],
    { ...TB, x: 1.25, y: 6.0815, w: 5.5792, h: 1.4375, fontSize: fs(9000) }
  );
  s.addText(
    "Children under age 5 living in Staten Island's North Shore Community District 1",
    { ...TB, x: 1.25, y: 7.6649, w: 5.5792, h: 0.7165, fontSize: fs(1800), color: C.inkSoft }
  );
  s.addText("Source · NYC DCP ACS estimates", {
    ...TB, x: 1.25, y: 8.4855, w: 5.5792, h: 0.3333, fontSize: fs(1800), color: C.muted,
  });

  // --- Stat 2 --------------------------------------------------
  s.addText("36%", {
    ...TB, x: 7.5104, y: 6.0815, w: 5.1393, h: 1.4375,
    fontSize: fs(9000), color: C.accent, italic: true, charSpacing: spc(-270),
  });
  s.addText(
    "Share of NYC households with children under 6 in which all parents work — highest demand cohort",
    { ...TB, x: 7.5104, y: 7.6649, w: 5.1393, h: 1.0539, fontSize: fs(1800), color: C.inkSoft }
  );
  s.addText("Source · ACS 5-year, citywide", {
    ...TB, x: 7.5104, y: 8.8229, w: 5.1393, h: 0.3333, fontSize: fs(1800), color: C.muted,
  });

  // --- Stat 3 --------------------------------------------------
  s.addText("2.1×", {
    ...TB, x: 13.3438, y: 6.0815, w: 5.1393, h: 1.4375,
    fontSize: fs(9000), color: C.accent, italic: true, charSpacing: spc(-270),
  });
  s.addText(
    "Children under 5 per licensed infant / toddler seat on the North Shore — a structural deficit",
    { ...TB, x: 13.3438, y: 7.6649, w: 5.1393, h: 1.0539, fontSize: fs(1800), color: C.inkSoft }
  );
  s.addText("Source · DOHMH Child Care Connect registry", {
    ...TB, x: 13.3438, y: 8.8229, w: 5.1393, h: 0.625, fontSize: fs(1800), color: C.muted,
  });

  addFooter(s, 10.3333, "02 / 09 · OPPORTUNITY");
}

// ============================================================
// SLIDE 3 — The Neighborhood (map + side facts)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addEyebrow(s, "03", "THE NEIGHBORHOOD");

  // Section headline (three coloured runs)
  s.addText(
    [
      { text: "West Brighton sits at the center of the ", options: { color: C.ink, charSpacing: spc(-165) } },
      { text: "North Shore's ", options: { color: C.accent, italic: true, charSpacing: spc(-165) } },
      { text: "commuter spine.", options: { color: C.ink, charSpacing: spc(-165) } },
    ],
    { ...TB, x: 1.25, y: 1.7396, w: 16.0938, h: 2.0156, fontSize: fs(6600) }
  );

  // Map panel (light cream tint) + the embedded map image on top of it
  rect(s, 1.25, 4.3385, 8.7301, 6.0117, C.cardDim);
  s.addImage({ data: IMG_MAP, x: 1.2604, y: 4.349, w: 8.7093, h: 5.9909 });

  // --- Map pins (dot + label chip) -----------------------------
  // "Site" pin: larger dark-navy dot
  oval(s, 5.0924, 7.1541, 0.2083, 0.2083, C.darkBg);
  rect(s, 5.4049, 7.0448, 3.4927, 0.4271, C.card);
  s.addText(
    [
      { text: "Site ",                 options: { color: C.ink, bold: true } },
      { text: "· Forest Ave & Broadway", options: { color: C.ink } },
    ],
    { ...TB, x: 5.4987, y: 7.0968, w: 3.41, h: 0.3646, fontSize: fs(1800) }
  );

  // "S48 / S46 bus" pin
  oval(s, 2.4797, 8.5477, 0.1458, 0.1458, C.accent);
  rect(s, 2.7297, 8.4227, 2.7583, 0.3958, C.card);
  s.addText("S48 / S46 bus — 2 min", {
    ...TB, x: 2.8234, y: 8.4748, w: 2.6541, h: 0.3333,
    fontSize: fs(1800), color: C.ink,
  });

  // "St. George Ferry" pin
  oval(s, 7.1826, 8.334, 0.1209, 0.1458, C.accent);
  rect(s, 7.4077, 8.0632, 2.562, 0.6875, C.card);
  s.addText("St. George Ferry — 8 min", {
    ...TB, x: 7.5015, y: 8.1152, w: 2.4578, h: 0.625,
    fontSize: fs(1800), color: C.ink,
  });

  // "Snug Harbor" pin
  oval(s, 3.6989, 6.2712, 0.1458, 0.1458, C.accent);
  rect(s, 3.9489, 6.1462, 2.9943, 0.3958, C.card);
  s.addText("Snug Harbor Cultural Ctr.", {
    ...TB, x: 4.0426, y: 6.1982, w: 2.8966, h: 0.3333,
    fontSize: fs(1800), color: C.ink,
  });

  // "PS 45 Catchment" pin
  oval(s, 6.3117, 9.1468, 0.1458, 0.1458, C.accent);
  rect(s, 6.5617, 9.0218, 2.147, 0.3958, C.card);
  s.addText("PS 45 Catchment", {
    ...TB, x: 6.6554, y: 9.0739, w: 2.0428, h: 0.3333,
    fontSize: fs(1800), color: C.ink,
  });

  // Caption below the map panel
  s.addText("map · west brighton, si 10310 — illustrative", {
    ...TB, x: 4.1014, y: 9.8607, w: 5.8298, h: 0.3333,
    fontSize: fs(1800), color: C.muted, charSpacing: spc(144),
  });

  // --- Right column: 5 label/value rows with thin rules ---------
  const rows = [
    { lbl: "MEDIAN HH", val: "$78,400 in ZIP 10310 — above borough median, with a high share of dual-earner households." },
    { lbl: "UNDER 5",   val: "~1,850 children under age 5 within a 1-mile catchment of Forest Ave & Broadway." },
    { lbl: "TRANSIT",   val: "SIM1 express, S40 / S46 / S48 bus lines, and the St. George Ferry connect the site to Lower Manhattan in < 45 min." },
    { lbl: "ANCHORS",   val: "Snug Harbor, Richmond University Medical Center, and the Forest Ave retail corridor drive daily foot traffic." },
    { lbl: "SUPPLY",    val: "Only 7 DOHMH-licensed centers in the catchment — none opened since 2021." },
  ];
  const rowYs = [
    { labelY: 4.3802, valY: 4.3385, ruleY: 5.2363 },
    { labelY: 5.4759, valY: 5.4342, ruleY: 6.332  },
    { labelY: 6.5716, valY: 6.5299, ruleY: 7.7933 },
    { labelY: 8.0329, valY: 7.9912, ruleY: 9.2546 },
    { labelY: 9.4941, valY: 9.4525, ruleY: null   },
  ];
  rows.forEach((r, i) => {
    s.addText(r.lbl, {
      ...TB, x: 10.8135, y: rowYs[i].labelY, w: 1.75, h: 0.3333,
      fontSize: fs(1800), color: C.muted, charSpacing: spc(144),
    });
    s.addText(r.val, {
      ...TB, x: 12.6885, y: rowYs[i].valY, w: 6.2434,
      h: i === 2 || i === 3 ? 1.1383 : 0.7728,
      fontSize: fs(1950), color: C.ink,
    });
    if (rowYs[i].ruleY != null) {
      rect(s, 10.8135, rowYs[i].ruleY, 7.9365, 0.0104, C.rule);
    }
  });

  addFooter(s, 10.7669, "03 / 09 · WEST BRIGHTON");
}

// ============================================================
// SLIDE 4 — The Facility (photo + label/value list)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addEyebrow(s, "04", "THE FACILITY");

  s.addText(
    [
      { text: "A ground-floor space ", options: { color: C.ink, charSpacing: spc(-165) } },
      { text: "pre-wired ", options: { color: C.accent, italic: true, charSpacing: spc(-165) } },
      { text: "for Article 47 build-out.", options: { color: C.ink, charSpacing: spc(-165) } },
    ],
    { ...TB, x: 1.25, y: 1.7396, w: 16.0938, h: 2.0156, fontSize: fs(6600) }
  );

  // Photo of the classroom
  s.addImage({ data: IMG_PHOTO, x: 1.2604, y: 4.4531, w: 7.828, h: 5.35 });

  // Right column: 6 rows separated by thin rules
  const rows = [
    { lbl: "TOTAL SF",    val: [
        { text: "5,400 ",                           options: { color: C.accent, italic: true } },
        { text: "sf · ground floor + rear yard",     options: { color: C.ink } } ] },
    { lbl: "CLASSROOMS", val: [{ text: "4 rooms · infant, toddler, 2s, 3–4s", options: { color: C.ink } }] },
    { lbl: "OUTDOOR",    val: [{ text: "~1,100 sf fenced yard, south-facing",  options: { color: C.ink } }] },
    { lbl: "ZONING",     val: [{ text: "R4-1 with C1-2 overlay — UG3 use as-of-right", options: { color: C.ink } }] },
    { lbl: "CONDITION",  val: [{ text: "White-box delivery · new HVAC, sprinkler, ADA entry", options: { color: C.ink } }] },
    { lbl: "LEASE",      val: [{ text: "10-year term, tenant improvement allowance negotiable", options: { color: C.ink } }] },
  ];

  // Layout: 6 evenly-spaced rows in the right column. Each row has the label
  // at x=9.72 and the value at x=13.83, with a rule above it.
  const rowTop = 4.4427, rowH = 0.95;
  rect(s, 9.7238, rowTop, 9.026, 0.0104, C.rule); // top rule
  rows.forEach((r, i) => {
    const y = rowTop + rowH * i;
    s.addText(r.lbl, {
      ...TB, x: 9.7238, y: y + 0.26, w: 4.2258, h: 0.3333,
      fontSize: fs(1800), color: C.muted, charSpacing: spc(216),
    });
    s.addText(r.val, {
      ...TB, x: 13.8265, y: y + 0.18, w: 5.0709, h: 0.8415,
      fontSize: fs(2400),
    });
    // Rule BELOW each row
    rect(s, 9.7238, y + rowH, 9.026, 0.0104, C.rule);
  });

  addFooter(s, 10.67, "04 / 09 · FACILITY");
}

// ============================================================
// SLIDE 5 — Regulatory Path (four numeral cards: i, ii, iii, iv)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addEyebrow(s, "05", "REGULATORY PATH");

  s.addText(
    [
      { text: "Licensing runs through ",               options: { color: C.ink,    charSpacing: spc(-165) } },
      { text: "DOHMH ",                                 options: { color: C.accent, italic: true, charSpacing: spc(-165) } },
      { text: "under Health Code Article 47.",          options: { color: C.ink,    charSpacing: spc(-165) } },
    ],
    { ...TB, x: 1.25, y: 1.7396, w: 17.1667, h: 2.0156, fontSize: fs(6600) }
  );

  // Body paragraph
  s.addText(
    "A Group Child Care permit is required to serve three or more children under age 6 for more than five hours per week in a non-residential setting. The path is well-mapped but sequential — operators should plan for a 9–12 month pre-opening window.",
    { ...TB, x: 1.25, y: 3.9635, w: 15.0208, h: 1.3102, fontSize: fs(2100), color: C.inkSoft }
  );

  // Four cards across
  const cards = [
    { x: 1.25,    num: "i",   title: "Permit Application", body: "DOHMH Bureau of Child Care permit; plan review by the Bureau's architects prior to any construction.", foot: "NYC Health Code · Art. 47" },
    { x: 5.6979, num: "ii",  title: "Physical Plant",      body: "35 sf indoor / 30 sf outdoor per child, dedicated nap & diapering areas, egress, and lead / radon clearance.", foot: "24 RCNY · §47.21" },
    { x: 10.1458, num: "iii", title: "Staffing & Ratios",  body: "Director w/ NY-certified credentials; staff-to-child ratios from 1:4 (infants) to 1:10 (preschool).",        foot: "24 RCNY · §47.23" },
    { x: 14.5938, num: "iv",  title: "Inspections",        body: "FDNY Place of Assembly (if ≥75), DOB Letter of No Objection, and an initial DOHMH on-site inspection before opening.", foot: "FDNY · DOB · DOHMH" },
  ];
  cards.forEach(c => {
    rect(s, c.x, 5.8988, 4.1562, 4.1623, C.card);
    s.addText(c.num, {
      ...TB, x: c.x + 0.3021, y: 6.2425, w: 3.6586, h: 0.625,
      fontSize: fs(4200), color: C.accent, italic: true,
    });
    s.addText(c.title, {
      ...TB, x: c.x + 0.3021, y: 6.9717, w: 3.6586, h: 0.3916,
      fontSize: fs(2100), color: C.ink,
    });
    s.addText(c.body, {
      ...TB, x: c.x + 0.3021, y: 7.4674, w: 3.6586, h: 1.8,
      fontSize: fs(1800), color: C.inkSoft,
    });
    s.addText(c.foot, {
      ...TB, x: c.x + 0.3021, y: 9.4256, w: 3.6586, h: 0.3333,
      fontSize: fs(1800), color: C.muted, charSpacing: spc(108),
    });
  });

  addFooter(s, 10.4777, "05 / 09 · REGULATORY");
}

// ============================================================
// SLIDE 6 — Program Model (5-column table)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addEyebrow(s, "06", "PROGRAM MODEL");

  s.addText(
    [
      { text: "A mixed-age center sized to the market, ", options: { color: C.ink,    charSpacing: spc(-165) } },
      { text: "not ",                                      options: { color: C.accent, italic: true, charSpacing: spc(-165) } },
      { text: "the room.",                                 options: { color: C.ink,    charSpacing: spc(-165) } },
    ],
    { ...TB, x: 1.25, y: 1.7396, w: 16.0938, h: 2.0156, fontSize: fs(6600) }
  );

  s.addText(
    "Proposed licensed capacity of 76 children across four rooms, with staffing ratios set at or below the Article 47 maximums.",
    { ...TB, x: 1.25, y: 3.9635, w: 13.9479, h: 0.8874, fontSize: fs(2100), color: C.inkSoft }
  );

  // Column x-origins and widths (from parsed XML)
  const cols = [
    { x: 1.25,    w: 4.8999, textX: 1.5,    textW: 4.5469, align: "left"  },
    { x: 6.1499,  w: 3.1499, textX: 6.3999, textW: 2.7444, align: "left"  },
    { x: 9.2998,  w: 3.1499, textX: 9.5498, textW: 2.7444, align: "left"  },
    { x: 12.4497, w: 3.1499, textX: 12.6997, textW: 2.7444, align: "left" },
    { x: 15.5996, w: 3.1504, textX: 15.8496, textW: 2.7449, align: "left" },
  ];
  const headers = ["AGE GROUP", "ROOM SIZE", "CAPACITY", "STAFF : CHILD", "TUITION · MONTHLY"];
  const dataRows = [
    ["Infants · 6 wk – 17 mo",  "900 sf",   "12", "1 : 4",  "$2,850"],
    ["Toddlers · 18 – 35 mo",   "1,000 sf", "16", "1 : 5",  "$2,550"],
    ["Twos · 2 – 3 yr",         "1,050 sf", "18", "1 : 6",  "$2,350"],
    ["Preschool · 3 – 5 yr",    "1,200 sf", "30", "1 : 10", "$2,150"],
  ];

  // Header row
  headers.forEach((h, i) => {
    s.addText(h, {
      ...TB, x: cols[i].textX, y: 5.6009, w: cols[i].textW, h: 0.6823,
      fontSize: fs(1800), color: C.muted, charSpacing: spc(252),
    });
    // Dark underline beneath each header cell
    rect(s, cols[i].x, 6.4499, cols[i].w, 0.0104, C.ink);
  });

  // Data rows — body rows use larger numbers in the CAPACITY column
  const rowYs = [
    { textY: 6.6686, ruleY: 7.2832 },
    { textY: 7.5020, ruleY: 8.1165 },
    { textY: 8.3353, ruleY: 8.9499 },
    { textY: 9.1686, ruleY: 9.7832 },
  ];
  dataRows.forEach((row, r) => {
    row.forEach((cell, c) => {
      const isCapacity = c === 2;
      const isRatio    = c === 3;
      s.addText(cell, {
        ...TB, x: cols[c].textX, y: rowYs[r].textY, w: cols[c].textW, h: 0.4479,
        fontSize: isCapacity ? fs(2550) : fs(1950),
        color: isRatio ? C.inkSoft : C.ink,
      });
    });
    // Row separator rule
    cols.forEach(col => rect(s, col.x, rowYs[r].ruleY, col.w, 0.0104, C.rule));
  });

  // Totals row (dim-filled cards across all 5 columns)
  const totals = ["Total licensed capacity", "4,150 sf programmed", "76", "—", "blended $2,380"];
  totals.forEach((cell, c) => {
    rect(s, cols[c].x, 9.7936, cols[c].w, 0.8281, C.cardDim);
    const isCapacity = c === 2;
    const isRatio    = c === 3;
    s.addText(cell, {
      ...TB, x: cols[c].textX, y: 10.002, w: cols[c].textW, h: 0.4531,
      fontSize: isCapacity ? fs(2550) : fs(1950),
      color: isCapacity ? C.accent : (isRatio ? C.inkSoft : C.ink),
    });
  });

  addFooter(s, 11.0384, "06 / 09 · PROGRAM");
}

// ============================================================
// SLIDE 7 — Unit Economics (P&L table + three large callouts)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addEyebrow(s, "07", "UNIT ECONOMICS");

  s.addText(
    [
      { text: "At 85% enrollment, the center clears ", options: { color: C.ink,    charSpacing: spc(-165) } },
      { text: "mid-teens ",                             options: { color: C.accent, italic: true, charSpacing: spc(-165) } },
      { text: "margin.",                                options: { color: C.ink,    charSpacing: spc(-165) } },
    ],
    { ...TB, x: 1.25, y: 1.7396, w: 16.0938, h: 2.0156, fontSize: fs(6600) }
  );

  // -------- Left column: P&L table --------
  // Top dark rule
  rect(s, 1.25, 4.3385, 9.1362, 0.0104, C.ink);

  // Helper for one P&L row: label, (sub-label), %, $ amount
  function plRow(labelY, ruleY, label, pct, amt, opts = {}) {
    s.addText(label, {
      ...TB, x: 1.25, y: labelY, w: 6.1057, h: 0.3333,
      fontSize: fs(1800), color: opts.isBold ? C.ink : C.ink,
      italic: opts.isItalic || false,
    });
    s.addText(pct, {
      ...TB, x: 7.3446, y: labelY, w: 0.9167, h: 0.3333,
      fontSize: fs(1800), color: C.muted, align: "right",
    });
    s.addText(amt, {
      ...TB, x: 8.4279, y: labelY - 0.052, w: 1.9583, h: 0.3958,
      fontSize: opts.bigAmt ? fs(2700) : fs(2250),
      color: opts.amtColor || C.ink, align: "right",
    });
    if (ruleY != null) rect(s, 1.25, ruleY, 9.1362, 0.0104, C.rule);
  }

  plRow(4.5469, 4.9948, "Tuition revenue · 65 FTE × $2,380 × 12", "100%", "$1,856k");
  plRow(5.2031, 5.651,  "Teacher wages & benefits",               "48%",  "($891k)");
  // Sub-caption under the wages row (indented slightly)
  s.addText("14 lead + 6 assistants", {
    ...TB, x: 1.4792, y: 5.8073, w: 5.8766, h: 0.3333,
    fontSize: fs(1800), color: C.muted,
  });
  s.addText("—", {
    ...TB, x: 8.4279, y: 5.8073, w: 1.9583, h: 0.3333,
    fontSize: fs(1800), color: C.muted, align: "right",
  });
  rect(s, 1.25, 6.2448, 9.1362, 0.0104, C.rule);

  plRow(6.4531, 6.901,  "Occupancy · rent, utilities, CAM", "18%", "($334k)");
  plRow(7.1094, 7.5573, "Food, supplies, curriculum",       "7%",  "($130k)");
  plRow(7.7656, 8.2135, "Insurance, licensing, admin",      "6%",  "($111k)");
  plRow(8.4219, 8.8698, "Marketing & enrollment",           "3%",  "($56k)");

  // Totals row: heavier dark rule above + a thin one below
  rect(s, 1.25, 8.8802, 9.1362, 0.0104, C.ink);
  rect(s, 1.25, 9.7865, 9.1362, 0.0208, C.ink);
  s.addText("Operating margin · Year 2 stabilized", {
    ...TB, x: 1.25, y: 9.2448, w: 6.1057, h: 0.3333,
    fontSize: fs(2100), color: C.ink, italic: true,
  });
  s.addText("18%", {
    ...TB, x: 7.3446, y: 9.2344, w: 0.9167, h: 0.3333,
    fontSize: fs(1800), color: C.muted, align: "right",
  });
  s.addText("$334k", {
    ...TB, x: 8.4279, y: 9.1198, w: 1.9583, h: 0.4792,
    fontSize: fs(2700), color: C.accent, align: "right",
  });

  // Footnote below totals
  s.addText(
    "Model assumes 48 operating weeks, 5% annual tuition growth, and a Year 1 ramp from 55% to 80% enrollment. Build-out capex not included.",
    { ...TB, x: 1.25, y: 9.9948, w: 9.4103, h: 0.7415, fontSize: fs(1800), color: C.muted }
  );

  // -------- Right column: three big stat callouts --------
  // $1.86M
  s.addText(
    [
      { text: "$",    options: { color: C.ink,    charSpacing: spc(-210) } },
      { text: "1.86", options: { color: C.accent, italic: true, charSpacing: spc(-210) } },
      { text: "M",    options: { color: C.ink,    charSpacing: spc(-210) } },
    ],
    { ...TB, x: 11.1362, y: 4.3385, w: 7.842, h: 0.9167, fontSize: fs(6000) }
  );
  s.addText("STABILIZED ANNUAL REVENUE", {
    ...TB, x: 11.1362, y: 5.2969, w: 7.842, h: 0.3333,
    fontSize: fs(1800), color: C.muted, charSpacing: spc(324),
  });

  // 18%
  s.addText(
    [
      { text: "18", options: { color: C.accent, italic: true, charSpacing: spc(-210) } },
      { text: "%",  options: { color: C.ink,                  charSpacing: spc(-210) } },
    ],
    { ...TB, x: 11.1362, y: 5.7552, w: 7.842, h: 0.9167, fontSize: fs(6000) }
  );
  s.addText("OPERATING MARGIN · YEAR 2", {
    ...TB, x: 11.1362, y: 6.7135, w: 7.842, h: 0.3333,
    fontSize: fs(1800), color: C.muted, charSpacing: spc(324),
  });

  // 2.4 yr
  s.addText(
    [
      { text: "2.4 ", options: { color: C.accent, italic: true, charSpacing: spc(-210) } },
      { text: "yr",   options: { color: C.ink,                  charSpacing: spc(-210) } },
    ],
    { ...TB, x: 11.1362, y: 7.1719, w: 7.842, h: 0.9167, fontSize: fs(6000) }
  );
  s.addText("PAYBACK ON OPERATOR CAPITAL", {
    ...TB, x: 11.1362, y: 8.1302, w: 7.842, h: 0.3333,
    fontSize: fs(1800), color: C.muted, charSpacing: spc(324),
  });

  addFooter(s, 11.1113, "07 / 09 · ECONOMICS");
}

// ============================================================
// SLIDE 8 — Timeline (5 milestone markers in a row)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addEyebrow(s, "08", "TIMELINE");

  s.addText(
    [
      { text: "From signed LOI to ",      options: { color: C.ink,    charSpacing: spc(-165) } },
      { text: "first day ",                options: { color: C.accent, italic: true, charSpacing: spc(-165) } },
      { text: "in roughly ten months.",    options: { color: C.ink,    charSpacing: spc(-165) } },
    ],
    { ...TB, x: 1.25, y: 1.7396, w: 16.0938, h: 2.0156, fontSize: fs(6600) }
  );

  // Five evenly-spaced milestone columns.
  // In the source, the first dot is solid accent; the others are hollow
  // (ellipse filled with the slide bg so only an outline ring would show —
  // since there's no visible stroke in the source, they appear as faint
  // markers. We emulate this by drawing a thin accent ring on 2–5.)
  const milestones = [
    { x: 1.4583,  period: "MONTH 0 – 1",  title: "Partnership LOI",      body: "Term sheet, operator entity formed, lease assignment, DOHMH pre-application meeting scheduled.", solid: true  },
    { x: 4.9583,  period: "MONTH 2 – 4",  title: "Plan Review",          body: "Architect files Article 47 plans, DOB Letter of No Objection filed, FDNY pre-review.",            solid: false },
    { x: 8.4583,  period: "MONTH 4 – 7",  title: "Build-out",            body: "Interior construction, yard installation, furniture procurement, curriculum selection.",          solid: false },
    { x: 11.9583, period: "MONTH 7 – 9",  title: "Staffing & Enrollment",body: "Director & lead teachers hired, waitlist conversion, parent tours, staff training.",               solid: false },
    { x: 15.4583, period: "MONTH 9 – 10", title: "Permit & Open",        body: "DOHMH inspection, permit issuance, soft opening with founding cohort, public opening.",            solid: false },
  ];
  milestones.forEach(m => {
    if (m.solid) {
      oval(s, m.x, 5.0469, 0.25, 0.25, C.accent);
    } else {
      // Hollow marker: accent ring on bg-filled disc
      s.addShape(pres.shapes.OVAL, {
        x: m.x, y: 5.0469, w: 0.25, h: 0.25,
        fill: { color: C.bg }, line: { color: C.accent, width: 1.25 },
      });
    }
    s.addText(m.period, {
      ...TB, x: m.x, y: 5.526, w: 2.1003, h: 0.3333,
      fontSize: fs(1800), color: C.muted, charSpacing: spc(180),
    });
    s.addText(m.title, {
      ...TB, x: m.x, y: 5.901, w: 3.0, h: 0.3916,
      fontSize: fs(2100), color: C.ink,
    });
    s.addText(m.body, {
      ...TB, x: m.x, y: 6.376, w: 3.1758, h: 1.8,
      fontSize: fs(1800), color: C.inkSoft,
    });
  });

  addFooter(s, 8.2926, "08 / 09 · TIMELINE");
}

// ============================================================
// SLIDE 9 — The Ask / Contact (dark navy background)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.darkBg };

  // Eyebrow (on dark)
  s.addText(
    [
      { text: "09 / 09 ",  options: { color: C.cream,   charSpacing: spc(432) } },
      { text: "THE ASK",   options: { color: C.accentLt, charSpacing: spc(432) } },
    ],
    { ...TB, x: 1.25, y: 1.0417, w: 18.025, h: 0.3646, fontSize: fs(1800) }
  );

  // Headline
  s.addText(
    [
      { text: "We are looking for an operator who can ", options: { color: C.cream,    charSpacing: spc(-165) } },
      { text: "open well ",                              options: { color: C.accentLt, italic: true, charSpacing: spc(-165) } },
      { text: "and stay.",                               options: { color: C.cream,    charSpacing: spc(-165) } },
    ],
    { ...TB, x: 1.25, y: 1.7396, w: 16.0938, h: 2.0156, fontSize: fs(6600) }
  );

  // Three 5.58"-wide cards with thin outlined look
  const cards = [
    { x: 1.25,    lbl: "EXPERIENCE", big: "Licensed operator",         body: "A team with at least one prior Article 47 or OCFS-licensed opening, and a director candidate who meets DOHMH qualifications." },
    { x: 7.2083,  lbl: "CAPITAL",    big: "$400–600k working capital", body: "Sufficient to fund pre-opening payroll, furniture, fixtures, and the first twelve months of operating shortfall during ramp." },
    { x: 13.1667, lbl: "COMMITMENT", big: "10-year operating horizon", body: "Matched to the lease term, with a shared interest in the North Shore community and a willingness to grow a second location by Year 4." },
  ];
  cards.forEach(c => {
    // Card = thin-border cream-outlined panel on dark. The source uses a
    // filled cream rectangle, but for a dark-slide card look we use an
    // outline + subtle fill.
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: 4.1302, w: 5.5833, h: 3.3021,
      fill: { color: C.darkBg },
      line: { color: C.cream, width: 0.75 },
    });
    s.addText(c.lbl, {
      ...TB, x: c.x + 0.3438, y: 4.5156, w: 5.0427, h: 0.3333,
      fontSize: fs(1800), color: C.accentLt, charSpacing: spc(252),
    });
    s.addText(c.big, {
      ...TB, x: c.x + 0.3438, y: 4.9948, w: 5.0427, h: 0.4271,
      fontSize: fs(2400), color: C.cream,
    });
    s.addText(c.body, {
      ...TB, x: c.x + 0.3438, y: 5.5469, w: 5.0427, h: 1.8,
      fontSize: fs(1800), color: C.cream,
    });
  });

  // Thin rule separating cards from footer/contact block
  rect(s, 1.25, 8.0156, 17.5, 0.0104, C.cream);

  // Bottom-left: wordmark
  oval(s, 1.25, 9.2083, 0.2292, 0.2292, C.accent);
  s.addText("Harbor & Oak — Early Learning", {
    ...TB, x: 1.6042, y: 9.1615, w: 5, h: 0.3646,
    fontSize: fs(1950), color: C.cream, charSpacing: spc(-19),
  });

  // Bottom-right: CONTACT / EMAIL / PHONE
  const contactRows = [
    { y: 8.401,  lbl: "CONTACT", val: "[ founder name ]" },
    { y: 8.7969, lbl: "EMAIL",   val: "partners@harborandoak.example" },
    { y: 9.1927, lbl: "PHONE",   val: "(718) 555-0144" },
  ];
  contactRows.forEach(r => {
    s.addText(r.lbl, {
      ...TB, x: 13.2537, y: r.y, w: 1.5181, h: 0.3333,
      fontSize: fs(1800), color: C.cream, charSpacing: spc(252),
    });
    s.addText(r.val, {
      ...TB, x: 15.0218, y: r.y, w: 3.84, h: 0.3333,
      fontSize: fs(1800), color: C.cream,
    });
  });
}

// ---------- Write file ----------
pres.writeFile({ fileName: "Day_Care.pptx" })
  .then(f => console.log("Wrote", f));
