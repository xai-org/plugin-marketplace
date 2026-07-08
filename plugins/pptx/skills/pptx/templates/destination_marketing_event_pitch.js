/**
 * Go Durham — Destination Services
 * PptxGenJS replica of "Go Durham - Tourist Destination.pptx"
 *
 * Run:
 *   npm install pptxgenjs
 *   node generate.js
 * Outputs: Go_Durham_-_Tourist_Destination.pptx
 */

const pptxgen = require("pptxgenjs");

// ---------- Palette ----------
const CREAM = "F4EFE6";       // primary background / text on green slides
const GREEN = "1A3D2E";       // dark green (section accents + text)
const ORANGE = "D85A3A";      // accent / italics
const BLACK = "1C1C1A";       // near-black body text
const GRAY = "4A4A45";        // muted gray
const DIVIDER = "C9BFA8";     // tan hairline divider
const ARIAL = "Arial";

// Helper to convert OOXML spc (1/100 pt) to pptxgenjs charSpacing (pt)
const SP = (ooxmlSpc) => ooxmlSpc / 100;

const pres = new pptxgen();
pres.author = "Go Durham";
pres.title = "Go Durham — Destination Services";
pres.company = "Go Durham";

// Custom 20" x 11.25" layout (matches original EMU 18288000 x 10287000)
pres.defineLayout({ name: "GO_DURHAM", width: 20, height: 11.25 });
pres.layout = "GO_DURHAM";

// ==================================================================
// Reusable helpers
// ==================================================================

/** Divider hairline */
function hr(slide, x, y, w, color = DIVIDER) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: 0.01, fill: { color }, line: { type: "none" },
  });
}

/** Vertical divider */
function vr(slide, x, y, h, color = DIVIDER) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.01, h, fill: { color }, line: { type: "none" },
  });
}

/** Orange dot used as masthead mark on slides 1 & 10 */
function brandDot(slide, x = 1.25, y = 0.906) {
  slide.addShape(pres.shapes.OVAL, {
    x, y, w: 0.146, h: 0.146,
    fill: { color: ORANGE }, line: { type: "none" },
  });
}

/** Page-number chip top-right ("02 / 10" etc.) */
function pageNumber(slide, n, total = 10, color = BLACK) {
  slide.addText(`${String(n).padStart(2, "0")} / ${total}`, {
    x: 17.723, y: 0.95, w: 1.111, h: 0.333,
    fontFace: ARIAL, fontSize: 18, color, charSpacing: SP(270),
    align: "left", margin: 0,
  });
}

/** Top-of-slide small orange eyebrow (e.g. "02 — WHY DURHAM") */
function eyebrow(slide, text, w = 8) {
  slide.addText(text, {
    x: 1.25, y: 0.938, w, h: 0.365,
    fontFace: ARIAL, fontSize: 18, bold: false, color: ORANGE,
    charSpacing: SP(396), align: "left", margin: 0,
  });
}

/** Large headline: two-tone. leadText in dark, italicText in orange italic */
function headline(slide, leadText, italicText, opts = {}) {
  const {
    x = 1.25, y = 1.531, w = 14, h = 1.767,
    size = 63, leadColor = BLACK, spc = -126,
  } = opts;
  slide.addText(
    [
      { text: leadText, options: { color: leadColor, charSpacing: SP(spc) } },
      { text: italicText, options: { color: ORANGE, italic: true, charSpacing: SP(spc) } },
    ],
    { x, y, w, h, fontFace: ARIAL, fontSize: size, align: "left", margin: 0 },
  );
}

/** Footer with left brand line & right section label */
function footer(slide, rightLabel, color = GRAY, rightW = 3.5) {
  slide.addText("GO DURHAM · DESTINATION BRIEFING", {
    x: 1.25, y: 10.438, w: 6.858, h: 0.333,
    fontFace: ARIAL, fontSize: 18, color,
    charSpacing: SP(396), align: "left", margin: 0,
  });
  slide.addText(rightLabel, {
    x: 20 - 1.25 - rightW, y: 10.438, w: rightW, h: 0.333,
    fontFace: ARIAL, fontSize: 18, color,
    charSpacing: SP(396), align: "right", margin: 0,
  });
}

// ==================================================================
// Slide 1 — Cover
// ==================================================================
function slide1() {
  const s = pres.addSlide();
  s.background = { color: CREAM };

  brandDot(s);
  s.addText("GO DURHAM · DESTINATION SERVICES", {
    x: 1.542, y: 0.833, w: 6.981, h: 0.333,
    fontFace: ARIAL, fontSize: 18, color: BLACK,
    charSpacing: SP(396), align: "left", margin: 0,
  });
  s.addText("CONFERENCE & EVENTS BRIEFING 2026 PLANNER FORUM", {
    x: 12.873, y: 0.833, w: 5.877, h: 0.941,
    fontFace: ARIAL, fontSize: 18, color: GRAY,
    charSpacing: SP(360), align: "right", margin: 0,
    paraSpaceAfter: 0,
  });

  s.addText("DURHAM, NORTH CAROLINA", {
    x: 1.25, y: 2.713, w: 18.025, h: 0.365,
    fontFace: ARIAL, fontSize: 19.5, color: ORANGE,
    charSpacing: SP(585), align: "left", margin: 0,
  });

  // Hero headline — two text boxes, one per line, so we control vertical rhythm exactly
  s.addText("A city that", {
    x: 1.25, y: 3.15, w: 18.025, h: 2.2,
    fontFace: ARIAL, fontSize: 165, bold: true, color: GREEN,
    charSpacing: SP(-577), align: "left", margin: 0,
  });
  s.addText(
    [
      { text: "convenes ", options: { color: ORANGE, bold: true, italic: true, charSpacing: SP(-577) } },
      { text: "well.", options: { color: GREEN, bold: true, charSpacing: SP(-577) } },
    ],
    {
      x: 1.25, y: 5.4, w: 18.025, h: 2.2,
      fontFace: ARIAL, fontSize: 165, align: "left", margin: 0,
    },
  );

  s.addText(
    "A destination briefing on the venues, infrastructure, and community that make Durham an unusually good host for your next conference.",
    {
      x: 1.25, y: 7.996, w: 13.948, h: 1.191,
      fontFace: ARIAL, fontSize: 36, italic: true, color: BLACK,
      align: "left", margin: 0,
    },
  );

  s.addText("PREPARED BY GO DURHAM", {
    x: 1.25, y: 10.125, w: 4.563, h: 0.333,
    fontFace: ARIAL, fontSize: 18, color: GRAY,
    charSpacing: SP(360), align: "left", margin: 0,
  });
  s.addText("15-MINUTE BRIEFING · 10 SLIDES", {
    x: 12.982, y: 10.125, w: 5.941, h: 0.333,
    fontFace: ARIAL, fontSize: 18, color: GRAY,
    charSpacing: SP(360), align: "left", margin: 0,
  });
}

// ==================================================================
// Slide 2 — Why Durham (three columns)
// ==================================================================
function slide2() {
  const s = pres.addSlide();
  s.background = { color: CREAM };

  eyebrow(s, "02 — WHY DURHAM", 14);
  headline(s, "A mid-sized city with ", "big-city range.", { w: 16, h: 2.5 });
  pageNumber(s, 2);

  // Horizontal divider
  hr(s, 1.25, 4.048, 17.5);

  // Column 1
  vr(s, 7.073, 4.059, 5.733);
  s.addText("01", {
    x: 1.25, y: 4.559, w: 5.568, h: 0.333,
    fontFace: ARIAL, fontSize: 18, color: ORANGE, charSpacing: SP(360),
    align: "left", margin: 0,
  });
  s.addText("Walkable by design", {
    x: 1.25, y: 5.059, w: 5.568, h: 0.625,
    fontFace: ARIAL, fontSize: 42, color: GREEN, align: "left", margin: 0,
  });
  s.addText(
    "Downtown Durham fits 40+ restaurants, three hotels, the performing arts center, and the convention district inside a ten-minute walk — attendees rarely need a taxi.",
    {
      x: 1.25, y: 5.85, w: 5.568, h: 1.612,
      fontFace: ARIAL, fontSize: 19.5, color: GRAY, align: "left", margin: 0,
    },
  );

  // Column 2
  vr(s, 12.906, 4.059, 5.733);
  s.addText("02", {
    x: 7.5, y: 4.559, w: 5.139, h: 0.333,
    fontFace: ARIAL, fontSize: 18, color: ORANGE, charSpacing: SP(360),
    align: "left", margin: 0,
  });
  s.addText("Anchored by a research triangle", {
    x: 7.5, y: 5.059, w: 5.139, h: 1.208,
    fontFace: ARIAL, fontSize: 42, color: GREEN, align: "left", margin: 0,
  });
  s.addText(
    "Home to Duke University and part of the Research Triangle with NC State and UNC — a dense, walkable ecosystem of academia, medicine, and tech-sector talent.",
    {
      x: 7.5, y: 6.434, w: 5.139, h: 2.005,
      fontFace: ARIAL, fontSize: 19.5, color: GRAY, align: "left", margin: 0,
    },
  );

  // Column 3
  s.addText("03", {
    x: 13.333, y: 4.559, w: 5.579, h: 0.333,
    fontFace: ARIAL, fontSize: 18, color: ORANGE, charSpacing: SP(360),
    align: "left", margin: 0,
  });
  s.addText("Character, not chain", {
    x: 13.333, y: 5.059, w: 5.579, h: 0.625,
    fontFace: ARIAL, fontSize: 42, color: GREEN, align: "left", margin: 0,
  });
  s.addText(
    "Tobacco-warehouse venues, independent chef-driven kitchens, and a live music calendar that gives a conference somewhere to actually go after 6pm.",
    {
      x: 13.333, y: 5.85, w: 5.579, h: 1.612,
      fontFace: ARIAL, fontSize: 19.5, color: GRAY, align: "left", margin: 0,
    },
  );

  footer(s, "WHY DURHAM", GRAY, 2.4);
}

// ==================================================================
// Slide 3 — Facilities (dark green)
// ==================================================================
function slide3() {
  const s = pres.addSlide();
  s.background = { color: GREEN };

  eyebrow(s, "03 — FACILITIES", 14);
  headline(s, "Built for ", "convening.", { w: 9, h: 2.5, leadColor: CREAM });
  pageNumber(s, 3, 10, CREAM);

  // Left narrative
  s.addText(
    [
      { text: "From a ", options: { color: CREAM, charSpacing: SP(-72) } },
      { text: "44,000 sq ft ballroom ", options: { color: ORANGE, italic: true, charSpacing: SP(-72) } },
      { text: "to a restored tobacco warehouse that seats 300 for dinner — Durham supports a single track of 2,700 attendees, or twelve break-outs running in parallel, without ever leaving the downtown core.",
        options: { color: CREAM, charSpacing: SP(-72) } },
    ],
    { x: 1.25, y: 3.79, w: 9.067, h: 5.801, fontFace: ARIAL, fontSize: 48, align: "left", margin: 0 },
  );

  // Right: three stats stacked, separated by hairlines
  const statRow = (y, big, label, bigW = 2.792, labelX = 14.095, labelW = 3.039) => {
    hr(s, 11.095, y, 7.655, CREAM);
    s.addText(big, {
      x: 11.095, y: y + 0.239, w: bigW, h: 1.167,
      fontFace: ARIAL, fontSize: 90, color: ORANGE, align: "left", margin: 0,
    });
    s.addText(label, {
      x: labelX, y: y + 0.969, w: labelW, h: 0.773,
      fontFace: ARIAL, fontSize: 19.5, color: CREAM, align: "left", margin: 0,
    });
  };
  statRow(3.662, "44K", "sq ft of flexible ballroom & exhibit space", 2.792, 14.095, 3.039);
  statRow(5.82,  "2,700", "seated plenary capacity at the performing arts center", 3.222, 14.515, 3.504);
  statRow(7.978, "18+",  "unique event venues within the walkable core", 2.792, 14.095, 2.962);

  footer(s, "FACILITIES OVERVIEW", CREAM, 3.9);
}

// ==================================================================
// Slide 4 — Venues table
// ==================================================================
function slide4() {
  const s = pres.addSlide();
  s.background = { color: CREAM };

  eyebrow(s, "04 — VENUES AT A GLANCE", 14);
  headline(s, "Nine anchor venues. ", "One walkable district.", { w: 16, h: 2.5 });
  pageNumber(s, 4);

  // Column x positions (match source)
  const COL = [
    { x: 1.25,   w: 5.939, labelW: 5.766 },   // VENUE
    { x: 7.433,  w: 2.704, labelW: 2.621 },   // CAPACITY
    { x: 10.47,  w: 2.704, labelW: 2.621 },   // TYPE
    { x: 13.508, w: 5.399, labelW: 5.242 },   // BEST SUITED FOR
  ];

  // Header row
  const headerY = 4.069;
  const headerLine = 4.548;
  const headers = ["VENUE", "CAPACITY", "TYPE", "BEST SUITED FOR"];
  headers.forEach((t, i) => {
    s.addText(t, {
      x: COL[i].x, y: headerY, w: COL[i].w, h: 0.333,
      fontFace: ARIAL, fontSize: 18, color: GRAY, charSpacing: SP(360),
      align: "left", margin: 0,
    });
    hr(s, COL[i].x, headerLine, COL[i].labelW);
  });

  // Rows
  const rows = [
    { y: 4.829, hLine: 5.729, name: "Durham Convention Center",       cap: "2,500", type: "Purpose-built",    use: "Multi-day conferences, exhibit halls, general sessions", nameH: 0.691 },
    { y: 6.01,  hLine: 6.676, name: "Durham Performing Arts Center",  cap: "2,712", type: "Theater",           use: "Keynotes, industry plenaries, awards evenings", nameH: 0.457 },
    { y: 6.957, hLine: 7.857, name: "Carolina Theatre",                cap: "1,000", type: "Historic theater",  use: "Film programs, panel discussions, signature keynotes", nameH: 0.691 },
    { y: 8.138, hLine: 9.038, name: "21c Museum Hotel ballroom",       cap: "350",   type: "Hotel + gallery",   use: "Executive summits, donor dinners, product launches", nameH: 0.691 },
    { y: 9.319, hLine: 10.219, name: "American Tobacco Campus",        cap: "5,000", type: "Adaptive-reuse",    use: "Outdoor receptions, festivals, experiential activations", nameH: 0.691 },
  ];

  rows.forEach((r) => {
    // Venue name (dark green, 28.5pt)
    s.addText(r.name, {
      x: COL[0].x, y: r.y, w: COL[0].w, h: r.nameH,
      fontFace: ARIAL, fontSize: 28.5, color: GREEN, align: "left", margin: 0,
    });
    // Capacity
    s.addText(r.cap, {
      x: COL[1].x, y: r.y, w: COL[1].w, h: 0.691,
      fontFace: ARIAL, fontSize: 18, color: BLACK, align: "left", margin: 0,
    });
    // Type
    s.addText(r.type, {
      x: COL[2].x, y: r.y, w: COL[2].w, h: 0.691,
      fontFace: ARIAL, fontSize: 18, color: BLACK, align: "left", margin: 0,
    });
    // Best for
    s.addText(r.use, {
      x: COL[3].x, y: r.y, w: COL[3].w, h: 0.691,
      fontFace: ARIAL, fontSize: 18, color: GRAY, align: "left", margin: 0,
    });
    // Row separators
    COL.forEach((c) => hr(s, c.x, r.hLine, c.labelW));
  });

  footer(s, "VENUES AT A GLANCE", GRAY, 3.8);
}

// ==================================================================
// Slide 5 — Getting Here (dark green, four cards)
// ==================================================================
function slide5() {
  const s = pres.addSlide();
  s.background = { color: GREEN };

  eyebrow(s, "05 — GETTING HERE", 14);
  headline(s, "Easy to reach. ", "Easier to get around.", { w: 16, h: 2.5, leadColor: CREAM });
  pageNumber(s, 5, 10, CREAM);

  const cards = [
    { x: 1.25,   label: "AIR",            big: "15 ", unit: "min", heading: "RDU International",
      body: "Non-stop service to 70+ destinations including London, Paris, and most major US hubs.",
      bodyY: 8.019, bodyH: 1.492 },
    { x: 5.729,  label: "ROAD",           big: "2 ",  unit: "hrs", heading: "To the coast or mountains",
      body: "Interstate access via I-40, I-85, and I-885 puts half the US East Coast inside a day's drive.",
      bodyY: 8.381, bodyH: 1.129 },
    { x: 10.208, label: "RAIL & TRANSIT", big: "6",   unit: "",    heading: "Amtrak departures daily",
      body: "Plus a free downtown Bull City Connector and an on-demand microtransit zone covering the convention district.",
      bodyY: 8.019, bodyH: 1.492 },
    { x: 14.688, label: "ON THE GROUND",  big: "10 ", unit: "min", heading: "Hotel-to-venue walk",
      body: "Every headquarters hotel sits inside a compact downtown grid — a genuine walking conference, not a shuttle one.",
      bodyY: 8.019, bodyH: 1.492 },
  ];

  cards.forEach((c) => {
    // Card: thin outline (cream hairline frame via single thin rect stroke)
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: 3.965, w: 4.062, h: 5.827,
      fill: { color: GREEN },
      line: { color: CREAM, width: 0.75 },
    });
    s.addText(c.label, {
      x: c.x + 0.281, y: 4.288, w: 3.605, h: 0.333,
      fontFace: ARIAL, fontSize: 18, color: ORANGE, charSpacing: SP(432),
      align: "left", margin: 0,
    });
    // Big number + inline unit
    const runs = [{ text: c.big, options: { color: CREAM, charSpacing: SP(-120), fontSize: 60 } }];
    if (c.unit) runs.push({ text: c.unit, options: { color: CREAM, charSpacing: SP(-120), fontSize: 21 } });
    s.addText(runs, {
      x: c.x + 0.281, y: 4.725, w: 3.605, h: 0.808,
      fontFace: ARIAL, align: "left", margin: 0,
    });
    s.addText(c.heading, {
      x: c.x + 0.281, y: 5.638, w: 3.605, h: 0.362,
      fontFace: ARIAL, fontSize: 21, color: CREAM, align: "left", margin: 0,
    });
    s.addText(c.body, {
      x: c.x + 0.281, y: c.bodyY, w: 3.605, h: c.bodyH,
      fontFace: ARIAL, fontSize: 18, color: CREAM, align: "left", margin: 0,
    });
  });

  footer(s, "INFRASTRUCTURE", CREAM, 3.2);
}

// ==================================================================
// Slide 6 — Stay, Dine, Explore
// ==================================================================
function slide6() {
  const s = pres.addSlide();
  s.background = { color: CREAM };

  eyebrow(s, "06 — STAY, DINE, EXPLORE", 14);
  headline(s, "An after-hours program ", "that writes itself.", { w: 16, h: 2.5 });
  pageNumber(s, 6);

  // Left column — big-number rows
  const leftRows = [
    { y: 3.798, yTop: 3.996, yHead: 4.309, yBody: 4.872, num: "8,400",
      heading: "Hotel rooms countywide",
      body: "Roughly 1,900 of them downtown, anchored by three HQ-grade properties within a five-minute walk of the convention center.",
      bodyH: 1.091 },
    { y: 6.172, yTop: 6.37, yHead: 6.682, yBody: 7.246, num: "250+",
      heading: "Chef-driven restaurants",
      body: "Durham has produced more James Beard nominees per capita than almost any city in the South over the past decade.",
      bodyH: 1.091 },
    { y: 8.546, yTop: 8.743, yHead: 9.056, yBody: 9.619, num: "40",
      heading: "Independent bars & music rooms",
      body: "Live jazz, listening rooms, craft cocktail, and a craft-brew corridor attendees actually want to stay out for.",
      bodyH: 0.742 },
  ];

  leftRows.forEach((r) => {
    hr(s, 1.25, r.y, 9.42);
    s.addText(r.num, {
      x: 1.25, y: r.yTop, w: 2.583, h: 0.829,
      fontFace: ARIAL, fontSize: 63, color: ORANGE, align: "left", margin: 0,
    });
    s.addText(r.heading, {
      x: 4.083, y: r.yHead, w: 6.785, h: 0.501,
      fontFace: ARIAL, fontSize: 31.5, color: GREEN, align: "left", margin: 0,
    });
    s.addText(r.body, {
      x: 4.083, y: r.yBody, w: 6.785, h: r.bodyH,
      fontFace: ARIAL, fontSize: 18, color: GRAY, align: "left", margin: 0,
    });
  });

  // Vertical separator
  vr(s, 11.504, 3.798, 6.938);

  // Right column: signature off-sites
  s.addText("SIGNATURE OFF-SITES", {
    x: 12.139, y: 3.798, w: 6.809, h: 0.365,
    fontFace: ARIAL, fontSize: 18, bold: true, color: GRAY,
    charSpacing: SP(396), align: "left", margin: 0,
  });

  s.addText(
    [
      { text: "Duke Gardens Sarah P. Duke ", options: { color: GREEN, fontSize: 27, breakLine: false } },
      { text: "— 55 landscaped acres", options: { color: GRAY, fontSize: 19.5, breakLine: true } },
      { text: " ", options: { breakLine: true } },
      { text: "The Nasher Museum ", options: { color: GREEN, fontSize: 27, breakLine: false } },
      { text: "Private after-hours gallery buyouts", options: { color: GRAY, fontSize: 19.5, breakLine: true } },
      { text: " ", options: { breakLine: true } },
      { text: "Durham Bulls Ballpark ", options: { color: GREEN, fontSize: 27, breakLine: false } },
      { text: "A classic American night out", options: { color: GRAY, fontSize: 19.5 } },
    ],
    {
      x: 12.139, y: 4.454, w: 6.809, h: 5.701,
      fontFace: ARIAL, align: "left", margin: 0, paraSpaceAfter: 6,
    },
  );

  footer(s, "STAY · DINE · EXPLORE", GRAY, 4.2);
}

// ==================================================================
// Slide 7 — The People (demographics)
// ==================================================================
function slide7() {
  const s = pres.addSlide();
  s.background = { color: CREAM };

  eyebrow(s, "07 — THE PEOPLE", 14);
  headline(s, "Who your attendees ", "actually meet here.", { w: 16, h: 2.5 });
  pageNumber(s, 7);

  // Intro paragraph — widened to match source's effective rendered width
  s.addText(
    [
      { text: "Durham is one of the ", options: { color: GREEN, charSpacing: SP(-67) } },
      { text: "youngest, most educated, and most diverse ", options: { color: ORANGE, italic: true, charSpacing: SP(-67) } },
      { text: "cities of its size in the American South — a meaningful backdrop for any event that cares about the audience it's speaking to.",
        options: { color: GREEN, charSpacing: SP(-67) } },
    ],
    { x: 1.25, y: 4.3, w: 17.5, h: 3.3, fontFace: ARIAL, fontSize: 36, align: "left", margin: 0 },
  );

  // Stats row
  hr(s, 1.25, 7.798, 17.5);
  vr(s, 5.615, 7.809, 2.787);
  vr(s, 9.99,  7.809, 2.787);
  vr(s, 14.365, 7.809, 2.787);

  const stats = [
    { x: 1.25,   big: "296K", unitRun: null, label: "CITY POPULATION",       body: "680K across the county-and-metro footprint", labelW: 4.238, labelH: 0.333 },
    { x: 5.875,  big: "34",   unitRun: "yrs", label: "MEDIAN AGE",           body: "Five years younger than the US median",       labelW: 3.981, labelH: 0.333 },
    { x: 10.25,  big: "52%",  unitRun: null, label: "BACHELOR'S OR HIGHER", body: "Among the highest-attainment cities of its size", labelW: 3.981, labelH: 0.625 },
    { x: 14.625, big: "58%",  unitRun: null, label: "PEOPLE OF COLOR",      body: "A genuinely majority-minority city",          labelW: 3.991, labelH: 0.333 },
  ];

  stats.forEach((st) => {
    const runs = [{ text: st.big, options: { color: GREEN, charSpacing: SP(-216), fontSize: 72 } }];
    if (st.unitRun) runs.push({ text: st.unitRun, options: { color: ORANGE, charSpacing: SP(-216), fontSize: 33 } });
    s.addText(runs, {
      x: st.x, y: 8.1, w: st.labelW, h: 0.942,
      fontFace: ARIAL, align: "left", margin: 0,
    });
    s.addText(st.label, {
      x: st.x, y: 9.125, w: st.labelW, h: st.labelH,
      fontFace: ARIAL, fontSize: 18, color: GRAY, charSpacing: SP(360),
      align: "left", margin: 0,
    });
    s.addText(st.body, {
      x: st.x, y: st.label === "BACHELOR'S OR HIGHER" ? 9.896 : 9.604,
      w: st.labelW, h: 0.742,
      fontFace: ARIAL, fontSize: 18, color: BLACK, align: "left", margin: 0,
    });
  });

  footer(s, "DEMOGRAPHICS", GRAY, 2.8);
}

// ==================================================================
// Slide 8 — Region (dark green, 2-column)
// ==================================================================
function slide8() {
  const s = pres.addSlide();
  s.background = { color: GREEN };

  eyebrow(s, "08 — A REGION THAT WORKS", 14);
  headline(s, "Convene where the ", "industry lives.", { w: 16, h: 2.5, leadColor: CREAM });
  pageNumber(s, 8, 10, CREAM);

  // Left big sentence
  s.addText(
    [
      { text: "Biotech, health systems, climate tech, and enterprise software aren't visitors here — ",
        options: { color: CREAM } },
      { text: "they're neighbors.", options: { color: ORANGE, italic: true } },
    ],
    { x: 1.25, y: 3.882, w: 8.476, h: 2.761, fontFace: ARIAL, fontSize: 48, align: "left", margin: 0 },
  );

  // Supporting paragraph
  s.addText(
    "The Research Triangle region hosts nearly 300 life-science companies and one of the densest concentrations of PhDs in the country. For industry events, that means the speakers, exhibitors, and candidates you want are already inside a ten-mile radius of your registration desk.",
    {
      x: 1.25, y: 7.018, w: 6.867, h: 2.56,
      fontFace: ARIAL, fontSize: 19.5, color: CREAM, align: "left", margin: 0,
    },
  );

  // Right column
  vr(s, 10.521, 3.882, 6.689, CREAM);

  const rstats = [
    { y: 4.173, num: "#1",    h1: "Best Place to Live, Southeast",         h2: "U.S. News & World Report, recurring ranking" },
    { y: 5.848, num: "300",   h1: "Life-science companies in the region",  h2: "Anchored by Research Triangle Park" },
    { y: 7.523, num: "$2.4B", h1: "Annual visitor economy",                h2: "Supporting 22,000 local hospitality jobs" },
    { y: 9.198, num: "3",     h1: "Tier-1 research universities within 30 minutes", h2: "Duke, UNC, NC State" },
  ];

  // Horizontal hairlines (cream)
  [5.546, 7.221, 8.896].forEach((y) => hr(s, 11.156, y, 7.594, CREAM));

  rstats.forEach((r) => {
    s.addText(r.num, {
      x: 11.156, y: r.y, w: 2.167, h: 0.754,
      fontFace: ARIAL, fontSize: 54, color: ORANGE, align: "left", margin: 0,
    });
    s.addText(r.h1, {
      x: 13.49, y: r.y + 0.386, w: 5.418, h: 0.323,
      fontFace: ARIAL, fontSize: 18, color: CREAM, align: "left", margin: 0,
    });
    s.addText(r.h2, {
      x: 13.49, y: r.y + 0.744, w: 5.418, h: 0.379,
      fontFace: ARIAL, fontSize: 18, color: CREAM, align: "left", margin: 0,
    });
  });

  footer(s, "ECONOMY & TALENT", CREAM, 3.6);
}

// ==================================================================
// Slide 9 — Pull quote (dark green)
// ==================================================================
function slide9() {
  const s = pres.addSlide();
  s.background = { color: GREEN };

  // Big decorative quote mark
  s.addText("\u201C", {
    x: 1.667, y: 2.662, w: 17.167, h: 1.792,
    fontFace: ARIAL, fontSize: 210, italic: true, color: ORANGE,
    align: "left", margin: 0,
  });

  // Quote body — cream with orange italic accents
  s.addText(
    [
      { text: "Durham is the rare host city where the ", options: { color: CREAM, charSpacing: SP(-81) } },
      { text: "program on stage ", options: { color: ORANGE, italic: true, charSpacing: SP(-81) } },
      { text: "and the ", options: { color: CREAM, charSpacing: SP(-81) } },
      { text: "program after 6pm ", options: { color: ORANGE, italic: true, charSpacing: SP(-81) } },
      { text: "feel like they were planned by the same person.", options: { color: CREAM, charSpacing: SP(-81) } },
    ],
    { x: 1.667, y: 4.62, w: 16.094, h: 2.717, fontFace: ARIAL, fontSize: 54, align: "left", margin: 0 },
  );

  // Small orange divider tick before attribution
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.667, y: 8.02, w: 0.625, h: 0.02,
    fill: { color: ORANGE }, line: { type: "none" },
  });

  s.addText("DIRECTOR OF EVENTS · NATIONAL BIOTECH ASSOCIATION", {
    x: 2.5, y: 7.879, w: 10.143, h: 0.333,
    fontFace: ARIAL, fontSize: 18, color: CREAM, charSpacing: SP(360),
    align: "left", margin: 0,
  });
}

// ==================================================================
// Slide 10 — Call to action
// ==================================================================
function slide10() {
  const s = pres.addSlide();
  s.background = { color: CREAM };

  brandDot(s);
  s.addText("GO DURHAM · LET'S BUILD YOUR EVENT", {
    x: 1.542, y: 0.833, w: 7.278, h: 0.333,
    fontFace: ARIAL, fontSize: 18, color: BLACK, charSpacing: SP(396),
    align: "left", margin: 0,
  });
  s.addText("10 / 10", {
    x: 17.985, y: 0.833, w: 0.848, h: 0.333,
    fontFace: ARIAL, fontSize: 18, color: BLACK, align: "left", margin: 0,
  });

  s.addText("THE INVITATION", {
    x: 1.25, y: 1.919, w: 18.025, h: 0.365,
    fontFace: ARIAL, fontSize: 19.5, color: ORANGE, charSpacing: SP(585),
    align: "left", margin: 0,
  });

  // Giant headline — split so the two lines don't collide
  s.addText("Let's host you in", {
    x: 1.25, y: 2.3, w: 18.025, h: 2.1,
    fontFace: ARIAL, fontSize: 150, color: GREEN,
    charSpacing: SP(-525), align: "left", margin: 0,
  });
  s.addText("Durham.", {
    x: 1.25, y: 4.35, w: 18.025, h: 2.1,
    fontFace: ARIAL, fontSize: 150, italic: true, color: ORANGE,
    charSpacing: SP(-525), align: "left", margin: 0,
  });

  s.addText(
    "We'll assemble your venue short-list, broker hotel blocks, and open doors with the institutions and neighborhoods your program should meet. One contact. No booking fees.",
    {
      x: 1.25, y: 6.627, w: 12.875, h: 1.692,
      fontFace: ARIAL, fontSize: 33, italic: true, color: BLACK,
      align: "left", margin: 0,
    },
  );

  hr(s, 1.25, 9.071, 17.5);

  // Three contact columns
  const contacts = [
    { x: 1.25,  label: "TALK TO US",     runs: [
        { text: "meetings@", options: { color: ORANGE } },
        { text: "godurham.travel", options: { color: GREEN } },
      ] },
    { x: 7.292, label: "CALL DIRECT",    runs: [
        { text: "919 · 687 · 0288", options: { color: GREEN } },
      ] },
    { x: 13.333, label: "PLAN A SITE VISIT", runs: [
        { text: "godurham.travel", options: { color: GREEN } },
        { text: "/visit", options: { color: ORANGE } },
      ] },
  ];

  contacts.forEach((c) => {
    s.addText(c.label, {
      x: c.x, y: 9.498, w: 5.579, h: 0.333,
      fontFace: ARIAL, fontSize: 18, color: GRAY, charSpacing: SP(396),
      align: "left", margin: 0,
    });
    s.addText(c.runs, {
      x: c.x, y: 9.936, w: 5.579, h: 0.523,
      fontFace: ARIAL, fontSize: 31.5, align: "left", margin: 0,
    });
  });
}

// ==================================================================
// Build deck
// ==================================================================
slide1();
slide2();
slide3();
slide4();
slide5();
slide6();
slide7();
slide8();
slide9();
slide10();

pres.writeFile({ fileName: "Go_Durham_-_Tourist_Destination.pptx" })
  .then((fn) => console.log(`Wrote: ${fn}`));
