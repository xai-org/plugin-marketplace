// Harbor & Hearth — Investor Pitch Replica
// Built with pptxgenjs
const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333" x 7.5"
pres.author = "Harbor & Hearth";
pres.title = "Harbor & Hearth — Investor Pitch";

// ─── Palette ──────────────────────────────────────────────────────────────
const NAVY = "0F2A3A";        // primary dark background
const CREAM = "F0E3C7";       // primary light background / light text on dark
const AMBER = "D48A3A";       // accent
const DARK_MUTED = "6E8594";  // muted blue-gray body text on cream
const LIGHT_MUTED = "8FA3B0"; // muted text on navy
const LINE_DARK = "2B4050";   // subtle divider on navy
const LINE_LIGHT = "C9BFA3";  // subtle divider on cream

// ─── Layout constants ────────────────────────────────────────────────────
const SW = 13.333;
const SH = 7.5;
const MARGIN = 0.66;

// ─── Helpers ─────────────────────────────────────────────────────────────
function addLogoMark(slide, onDark) {
  const ringColor = onDark ? CREAM : NAVY;
  const dotColor = AMBER;
  const textColor = onDark ? CREAM : NAVY;
  // Ring
  slide.addShape(pres.shapes.OVAL, {
    x: MARGIN, y: 0.57, w: 0.3, h: 0.3,
    fill: { type: "solid", color: onDark ? NAVY : CREAM },
    line: { color: ringColor, width: 1.25 },
  });
  // Center dot
  slide.addShape(pres.shapes.OVAL, {
    x: MARGIN + 0.105, y: 0.675, w: 0.09, h: 0.09,
    fill: { color: dotColor }, line: { color: dotColor, width: 0 },
  });
  slide.addText("HARBOR & HEARTH", {
    x: MARGIN + 0.42, y: 0.55, w: 3, h: 0.35,
    fontFace: "Arial", fontSize: 10.5, bold: true, color: textColor,
    charSpacing: 3, valign: "middle", margin: 0,
  });
}

function addTopRight(slide, text, onDark) {
  slide.addText(text, {
    x: SW - MARGIN - 4.5, y: 0.55, w: 4.5, h: 0.35,
    fontFace: "Arial", fontSize: 10.5, color: onDark ? LIGHT_MUTED : DARK_MUTED,
    charSpacing: 3, align: "right", valign: "middle", margin: 0,
  });
}

function addFooter(slide, rightLabel, onDark) {
  const color = onDark ? LIGHT_MUTED : DARK_MUTED;
  slide.addText("HARBOR & HEARTH", {
    x: MARGIN, y: SH - 0.62, w: 4, h: 0.3,
    fontFace: "Arial", fontSize: 10.5, color,
    charSpacing: 3, valign: "middle", margin: 0,
  });
  slide.addText(rightLabel, {
    x: SW - MARGIN - 5, y: SH - 0.62, w: 5, h: 0.3,
    fontFace: "Arial", fontSize: 10.5, color,
    charSpacing: 3, align: "right", valign: "middle", margin: 0,
  });
}

// ═════════════════════════════════════════════════════════════════════════
// SLIDE 1 — Title
// ═════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  addLogoMark(s, true);
  addTopRight(s, "INVESTOR PITCH / SPRING 2026", true);

  // Small amber horizontal bar above title
  s.addShape(pres.shapes.RECTANGLE, {
    x: MARGIN, y: 3.24, w: 0.42, h: 0.035,
    fill: { color: AMBER }, line: { color: AMBER, width: 0 },
  });

  // Title
  s.addText("Harbor &\nHearth.", {
    x: MARGIN, y: 3.4, w: 8.5, h: 2.75,
    fontFace: "Georgia", fontSize: 84, color: CREAM,
    bold: false, valign: "top", margin: 0, lineSpacingMultiple: 1.0,
  });

  // Subtitle (italic)
  s.addText(
    "A market-to-table seafood experience for travelers in Boston's Seaport.",
    {
      x: MARGIN, y: 6.18, w: 7.5, h: 0.7,
      fontFace: "Georgia", fontSize: 16, italic: true, color: CREAM,
      valign: "top", margin: 0,
    }
  );

  // Bottom-right confidential stack
  s.addText(
    [
      { text: "BOSTON, MA SEAPORT", options: { breakLine: true } },
      { text: "DISTRICT SERIES SEED ·", options: { breakLine: true } },
      { text: "CONFIDENTIAL" },
    ],
    {
      x: SW - MARGIN - 3, y: 6.1, w: 3, h: 0.95,
      fontFace: "Arial", fontSize: 10.5, color: LIGHT_MUTED,
      charSpacing: 3, align: "right", valign: "top", margin: 0,
    }
  );
}

// ═════════════════════════════════════════════════════════════════════════
// SLIDE 2 — The Opportunity (cream bg, 2-col with stats)
// ═════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  // Eyebrow top-left
  s.addText("01 / THE OPPORTUNITY", {
    x: MARGIN, y: 0.55, w: 5, h: 0.35,
    fontFace: "Arial", fontSize: 10.5, color: DARK_MUTED,
    charSpacing: 3, valign: "middle", margin: 0,
  });
  // Page number top-right
  s.addText("02 / 08", {
    x: SW - MARGIN - 2, y: 0.55, w: 2, h: 0.35,
    fontFace: "Arial", fontSize: 10.5, color: DARK_MUTED,
    charSpacing: 3, align: "right", valign: "middle", margin: 0,
  });

  // Vertical divider
  s.addShape(pres.shapes.LINE, {
    x: 6.55, y: 1.3, w: 0, h: 5.4,
    line: { color: LINE_LIGHT, width: 0.75 },
  });

  // LEFT: headline with amber accent words
  s.addText(
    [
      { text: "Boston draws millions of visitors who crave ", options: { color: NAVY } },
      { text: "seafood and story", options: { color: AMBER } },
      { text: " —and are routinely served neither well.", options: { color: NAVY } },
    ],
    {
      x: MARGIN, y: 1.85, w: 5.7, h: 2.7,
      fontFace: "Georgia", fontSize: 30, valign: "top", margin: 0,
      lineSpacingMultiple: 1.15,
    }
  );

  // LEFT: supporting paragraph
  s.addText(
    "Tourists come for the harbor, the history, and the lobster. Most leave with a paper-napkin roll from a chain counter. The premium, hands-on, genuinely local food experience is underbuilt.",
    {
      x: MARGIN, y: 4.8, w: 5.6, h: 1.6,
      fontFace: "Arial", fontSize: 13, color: DARK_MUTED,
      valign: "top", margin: 0, lineSpacingMultiple: 1.35,
    }
  );

  // RIGHT: stat stack
  const statX = 6.95;
  const statW = 5.7;

  // Stat 1
  s.addText(
    [
      { text: "22.7", options: { color: NAVY, fontSize: 54 } },
      { text: "M", options: { color: AMBER, fontSize: 32 } },
    ],
    {
      x: statX, y: 1.3, w: statW, h: 0.9,
      fontFace: "Georgia", valign: "top", margin: 0,
    }
  );
  s.addText(
    "annual visitors to Greater Boston, a record share traveling for food & culture.",
    {
      x: statX, y: 2.3, w: statW, h: 0.7,
      fontFace: "Arial", fontSize: 13, color: DARK_MUTED,
      valign: "top", margin: 0, lineSpacingMultiple: 1.3,
    }
  );
  s.addText("SOURCE / MEET BOSTON 2024", {
    x: statX, y: 3.0, w: statW, h: 0.3,
    fontFace: "Arial", fontSize: 10, color: DARK_MUTED,
    charSpacing: 3, valign: "top", margin: 0,
  });

  // Stat 2
  s.addText(
    [
      { text: "$9.3", options: { color: NAVY, fontSize: 54 } },
      { text: "B", options: { color: AMBER, fontSize: 32 } },
    ],
    {
      x: statX, y: 3.35, w: statW, h: 0.9,
      fontFace: "Georgia", valign: "top", margin: 0,
    }
  );
  s.addText(
    "U.S. culinary-tourism spend, growing ~12% year over year.",
    {
      x: statX, y: 4.35, w: statW, h: 0.7,
      fontFace: "Arial", fontSize: 13, color: DARK_MUTED,
      valign: "top", margin: 0, lineSpacingMultiple: 1.3,
    }
  );
  s.addText("SOURCE / WFTA INDUSTRY REPORT", {
    x: statX, y: 5.05, w: statW, h: 0.3,
    fontFace: "Arial", fontSize: 10, color: DARK_MUTED,
    charSpacing: 3, valign: "top", margin: 0,
  });

  // Stat 3
  s.addText(
    [
      { text: "1", options: { color: NAVY, fontSize: 54 } },
      { text: "of 0", options: { color: AMBER, fontSize: 32 } },
    ],
    {
      x: statX, y: 5.45, w: statW, h: 0.85,
      fontFace: "Georgia", valign: "top", margin: 0,
    }
  );
  s.addText(
    "dedicated market-to-table seafood cooking experiences in the Seaport today.",
    {
      x: statX, y: 6.3, w: statW, h: 0.5,
      fontFace: "Arial", fontSize: 12, color: DARK_MUTED,
      valign: "top", margin: 0, lineSpacingMultiple: 1.3,
    }
  );
  s.addText("SOURCE / INTERNAL SCAN, Q1 2026", {
    x: statX, y: 6.8, w: statW, h: 0.3,
    fontFace: "Arial", fontSize: 10, color: DARK_MUTED,
    charSpacing: 3, valign: "top", margin: 0,
  });

  addFooter(s, "THE OPPORTUNITY", false);
}

// ═════════════════════════════════════════════════════════════════════════
// SLIDE 3 — The Experience (dark bg, left image placeholder, right text)
// ═════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  // Full-bleed photography placeholder label (top-left)
  s.addText("[ FULL-BLEED PHOTOGRAPHY · chef at Seaport fish market at dawn ]", {
    x: MARGIN, y: 0.35, w: 7, h: 0.4,
    fontFace: "Arial", fontSize: 10.5, italic: true, color: LIGHT_MUTED,
    charSpacing: 2, valign: "middle", margin: 0,
  });

  // Page number top-right
  s.addText("03 / 08", {
    x: SW - MARGIN - 2, y: 0.85, w: 2, h: 0.35,
    fontFace: "Arial", fontSize: 10.5, color: LIGHT_MUTED,
    charSpacing: 3, align: "right", valign: "middle", margin: 0,
  });

  // Eyebrow
  s.addText("02 / THE EXPERIENCE", {
    x: 7.2, y: 1.3, w: 5, h: 0.35,
    fontFace: "Arial", fontSize: 10.5, color: LIGHT_MUTED,
    charSpacing: 3, valign: "middle", margin: 0,
  });

  // Big title
  s.addText("Shop the pier. Cook the catch. Share the table.", {
    x: 7.2, y: 1.75, w: 5.5, h: 2.3,
    fontFace: "Georgia", fontSize: 38, color: CREAM,
    valign: "top", margin: 0, lineSpacingMultiple: 1.1,
  });

  // Italic lede
  s.addText(
    "A four-hour seafood experience beginning at a working fish pier and ending at a communal table.",
    {
      x: 7.2, y: 4.2, w: 5.3, h: 1.1,
      fontFace: "Georgia", fontSize: 16, italic: true, color: LIGHT_MUTED,
      valign: "top", margin: 0, lineSpacingMultiple: 1.35,
    }
  );

  // Body paragraph
  s.addText(
    "Guests meet their chef at the Boston Fish Pier at dawn, shop alongside wholesale buyers, then return to our Seaport studio to break down, cook, and plate the morning's catch—centered on the perfect New England lobster roll.",
    {
      x: 7.2, y: 5.4, w: 5.3, h: 1.6,
      fontFace: "Arial", fontSize: 12.5, color: CREAM,
      valign: "top", margin: 0, lineSpacingMultiple: 1.4,
    }
  );

  addFooter(s, "THE EXPERIENCE", true);
}

// ═════════════════════════════════════════════════════════════════════════
// SLIDE 4 — Guest Journey (cream, 4-column acts)
// ═════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  s.addText("03 / GUEST JOURNEY", {
    x: MARGIN, y: 0.55, w: 5, h: 0.35,
    fontFace: "Arial", fontSize: 10.5, color: DARK_MUTED,
    charSpacing: 3, valign: "middle", margin: 0,
  });
  s.addText("04 / 08", {
    x: SW - MARGIN - 2, y: 0.55, w: 2, h: 0.35,
    fontFace: "Arial", fontSize: 10.5, color: DARK_MUTED,
    charSpacing: 3, align: "right", valign: "middle", margin: 0,
  });

  // Headline
  s.addText(
    "Four hours, four acts—purpose-built for a traveler's single best morning in Boston.",
    {
      x: MARGIN, y: 1.15, w: 12, h: 1.4,
      fontFace: "Georgia", fontSize: 30, color: NAVY,
      valign: "top", margin: 0, lineSpacingMultiple: 1.1,
    }
  );

  // 4 columns
  const acts = [
    { num: "ACT I",   time: "7:00 AM",  name: "The Pier",   body: "Coffee and pastries at Boston Fish Pier. Meet the chef, meet the buyers, learn how the boats come in." },
    { num: "ACT II",  time: "8:15 AM",  name: "The Market", body: "Shop live lobster, day-boat cod, and shellfish with the chef. Guests choose the lobsters they'll cook." },
    { num: "ACT III", time: "9:00 AM",  name: "The Studio", body: "A harborside kitchen. Hands-on breakdown, butter poaching, bun toasting—and the history behind every step." },
    { num: "ACT IV",  time: "10:30 AM", name: "The Table",  body: "Communal lunch with wine pairings, a take-home recipe card, and a signed pier map." },
  ];

  const colTop = 3.2;
  const colGap = 0.25;
  const available = SW - 2 * MARGIN;
  const colW = (available - colGap * 3) / 4;

  acts.forEach((act, i) => {
    const x = MARGIN + i * (colW + colGap);
    // top divider line
    s.addShape(pres.shapes.LINE, {
      x, y: colTop, w: colW - 0.2, h: 0,
      line: { color: NAVY, width: 0.75 },
    });
    // act num (amber)
    s.addText(act.num, {
      x, y: colTop + 0.12, w: colW, h: 0.3,
      fontFace: "Arial", fontSize: 10.5, color: AMBER,
      charSpacing: 3, valign: "top", margin: 0,
    });
    // time
    s.addText(act.time, {
      x, y: colTop + 0.5, w: colW, h: 0.55,
      fontFace: "Georgia", fontSize: 22, color: NAVY,
      valign: "top", margin: 0,
    });
    // location
    s.addText(act.name, {
      x, y: colTop + 1.15, w: colW, h: 0.45,
      fontFace: "Georgia", fontSize: 18, color: NAVY,
      valign: "top", margin: 0,
    });
    // body
    s.addText(act.body, {
      x, y: colTop + 1.8, w: colW - 0.15, h: 2.2,
      fontFace: "Arial", fontSize: 12, color: DARK_MUTED,
      valign: "top", margin: 0, lineSpacingMultiple: 1.4,
    });
  });

  addFooter(s, "GUEST JOURNEY", false);
}

// ═════════════════════════════════════════════════════════════════════════
// SLIDE 5 — The Menu (dark, numbered rows with right-aligned italic desc)
// ═════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  s.addText("04 / THE MENU", {
    x: MARGIN, y: 0.55, w: 5, h: 0.35,
    fontFace: "Arial", fontSize: 10.5, color: LIGHT_MUTED,
    charSpacing: 3, valign: "middle", margin: 0,
  });
  s.addText("05 / 08", {
    x: SW - MARGIN - 2, y: 0.55, w: 2, h: 0.35,
    fontFace: "Arial", fontSize: 10.5, color: LIGHT_MUTED,
    charSpacing: 3, align: "right", valign: "middle", margin: 0,
  });

  s.addText(
    "One canonical dish, prepared properly, surrounded by the coast that makes it possible.",
    {
      x: MARGIN, y: 1.0, w: 12, h: 1.3,
      fontFace: "Georgia", fontSize: 30, color: CREAM,
      valign: "top", margin: 0, lineSpacingMultiple: 1.1,
    }
  );

  const items = [
    { n: "01", t: "Raw bar welcome",               d: "Island Creek oysters, mignonette, lemon" },
    { n: "02", t: "The Harbor & Hearth lobster roll", d: "Warm, butter-poached, split-top brioche" },
    { n: "03", t: "Sides from the pier",           d: "Salt-&-vinegar kettle chips, fennel slaw" },
    { n: "04", t: "Pairing",                       d: "Sancerre or a local pilsner, served family style" },
    { n: "05", t: "Close",                         d: "Blueberry grunt, crème fraîche" },
  ];

  const rowTop = 2.55;
  const rowH = 0.82;
  const menuLeft = MARGIN;
  const menuRight = SW - MARGIN;

  // top divider
  s.addShape(pres.shapes.LINE, {
    x: menuLeft, y: rowTop, w: menuRight - menuLeft, h: 0,
    line: { color: LINE_DARK, width: 0.75 },
  });

  items.forEach((it, i) => {
    const y = rowTop + i * rowH;
    // row number
    s.addText(it.n, {
      x: menuLeft, y: y + 0.18, w: 0.6, h: 0.4,
      fontFace: "Arial", fontSize: 11, color: AMBER,
      charSpacing: 3, valign: "middle", margin: 0,
    });
    // title
    s.addText(it.t, {
      x: menuLeft + 0.9, y: y + 0.12, w: 7, h: 0.55,
      fontFace: "Georgia", fontSize: 20, color: CREAM,
      valign: "middle", margin: 0,
    });
    // italic description
    s.addText(it.d, {
      x: menuRight - 4, y: y + 0.12, w: 4, h: 0.55,
      fontFace: "Georgia", fontSize: 13, italic: true, color: LIGHT_MUTED,
      align: "right", valign: "middle", margin: 0,
    });
    // bottom divider
    s.addShape(pres.shapes.LINE, {
      x: menuLeft, y: y + rowH, w: menuRight - menuLeft, h: 0,
      line: { color: LINE_DARK, width: 0.75 },
    });
  });

  // Footnote
  s.addText(
    "Sourcing partners: Red's Best, Island Creek Oysters, Iggy's Bread. Menu rotates with catch and season; the lobster roll is the through-line.",
    {
      x: MARGIN, y: 6.75, w: 11, h: 0.4,
      fontFace: "Arial", fontSize: 11, color: LIGHT_MUTED,
      valign: "top", margin: 0,
    }
  );

  addFooter(s, "THE MENU", true);
}

// ═════════════════════════════════════════════════════════════════════════
// SLIDE 6 — Market Position (cream, comparison table)
// ═════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  s.addText("05 / MARKET POSITION", {
    x: MARGIN, y: 0.55, w: 5, h: 0.35,
    fontFace: "Arial", fontSize: 10.5, color: DARK_MUTED,
    charSpacing: 3, valign: "middle", margin: 0,
  });
  s.addText("06 / 08", {
    x: SW - MARGIN - 2, y: 0.55, w: 2, h: 0.35,
    fontFace: "Arial", fontSize: 10.5, color: DARK_MUTED,
    charSpacing: 3, align: "right", valign: "middle", margin: 0,
  });

  s.addText(
    "Existing options force a trade-off between souvenir and substance. We deliver both.",
    {
      x: MARGIN, y: 1.1, w: 12, h: 1.4,
      fontFace: "Georgia", fontSize: 30, color: NAVY,
      valign: "top", margin: 0, lineSpacingMultiple: 1.1,
    }
  );

  // Table – use pptxgenjs addTable
  const headerStyle = {
    fontFace: "Arial", fontSize: 10.5, color: DARK_MUTED, bold: false,
    charSpacing: 3, valign: "middle",
  };
  const cellDashStyle = { fontFace: "Arial", fontSize: 16, color: LIGHT_MUTED, valign: "middle", align: "center" };
  const cellCheckStyle = { fontFace: "Arial", fontSize: 16, color: AMBER, valign: "middle", align: "center", bold: false };
  const cellNameStyle = { fontFace: "Arial", fontSize: 14, color: NAVY, valign: "middle" };
  const cellPriceStyle = { fontFace: "Arial", fontSize: 14, color: NAVY, valign: "middle" };
  const cellTastingStyle = { fontFace: "Arial", fontSize: 13, color: LIGHT_MUTED, valign: "middle", align: "center", italic: false };

  const rows = [
    // Header
    [
      { text: "FORMAT", options: { ...headerStyle, align: "left" } },
      { text: "HANDS-ON\nCOOKING", options: { ...headerStyle, align: "left" } },
      { text: "WORKING MARKET\nACCESS", options: { ...headerStyle, align: "left" } },
      { text: "SEATED\nMEAL", options: { ...headerStyle, align: "left" } },
      { text: "PRICE / GUEST", options: { ...headerStyle, align: "left" } },
    ],
    [
      { text: "Walking food tour", options: cellNameStyle },
      { text: "—", options: cellDashStyle },
      { text: "—", options: cellDashStyle },
      { text: "Tastings only", options: cellTastingStyle },
      { text: "$85 – 110", options: cellPriceStyle },
    ],
    [
      { text: "Hotel cooking class", options: cellNameStyle },
      { text: "✓", options: cellCheckStyle },
      { text: "—", options: cellDashStyle },
      { text: "✓", options: cellCheckStyle },
      { text: "$125 – 175", options: cellPriceStyle },
    ],
    [
      { text: "Harbor cruise + dinner", options: cellNameStyle },
      { text: "—", options: cellDashStyle },
      { text: "—", options: cellDashStyle },
      { text: "✓", options: cellCheckStyle },
      { text: "$140 – 220", options: cellPriceStyle },
    ],
    [
      { text: "Harbor & Hearth", options: { ...cellNameStyle, bold: true, fill: { color: "F5E6CF" } } },
      { text: "✓", options: { ...cellCheckStyle, fill: { color: "F5E6CF" } } },
      { text: "✓", options: { ...cellCheckStyle, fill: { color: "F5E6CF" } } },
      { text: "✓", options: { ...cellCheckStyle, fill: { color: "F5E6CF" } } },
      { text: "$195", options: { ...cellPriceStyle, bold: true, fill: { color: "F5E6CF" } } },
    ],
  ];

  s.addTable(rows, {
    x: MARGIN, y: 3.05, w: SW - 2 * MARGIN,
    colW: [3.2, 2.2, 2.6, 1.7, 2.31],
    rowH: [0.6, 0.55, 0.55, 0.55, 0.65],
    border: { type: "solid", pt: 0.5, color: LINE_LIGHT },
    fontFace: "Arial",
  });

  // Amber left bar on highlight row
  s.addShape(pres.shapes.RECTANGLE, {
    x: MARGIN, y: 3.05 + 0.6 + 0.55 * 3, w: 0.05, h: 0.65,
    fill: { color: AMBER }, line: { color: AMBER, width: 0 },
  });

  // Bottom takeaway
  s.addText(
    "We are the only premium offering that pairs a working-pier market visit with a hands-on cook and a seated meal—the full arc from catch to plate.",
    {
      x: MARGIN, y: 6.0, w: 11, h: 0.75,
      fontFace: "Arial", fontSize: 13, italic: false, color: DARK_MUTED,
      valign: "top", margin: 0, lineSpacingMultiple: 1.4,
    }
  );

  addFooter(s, "MARKET POSITION", false);
}

// ═════════════════════════════════════════════════════════════════════════
// SLIDE 7 — Unit Economics (cream, two-column)
// ═════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  s.addText("06 / UNIT ECONOMICS", {
    x: MARGIN, y: 0.55, w: 5, h: 0.35,
    fontFace: "Arial", fontSize: 10.5, color: DARK_MUTED,
    charSpacing: 3, valign: "middle", margin: 0,
  });
  s.addText("07 / 08", {
    x: SW - MARGIN - 2, y: 0.55, w: 2, h: 0.35,
    fontFace: "Arial", fontSize: 10.5, color: DARK_MUTED,
    charSpacing: 3, align: "right", valign: "middle", margin: 0,
  });

  s.addText(
    "Per-session economics scale from launch to steady state.",
    {
      x: MARGIN, y: 1.1, w: 12, h: 1.4,
      fontFace: "Georgia", fontSize: 30, color: NAVY,
      valign: "top", margin: 0, lineSpacingMultiple: 1.1,
    }
  );

  // LEFT column — Per session table (custom rows)
  const leftX = MARGIN;
  const leftW = 5.9;
  const sectionTop = 2.9;

  s.addText("PER SESSION · 12 GUESTS · 4 HRS", {
    x: leftX, y: sectionTop, w: leftW, h: 0.35,
    fontFace: "Arial", fontSize: 10.5, color: DARK_MUTED,
    charSpacing: 3, valign: "middle", margin: 0,
  });

  // Rows: [label, value, bold?, lineAbove?, lineBelow?, amberValue?]
  const econRows = [
    { label: "Ticket price",                value: "$195",   bold: false, lineBelow: false },
    { label: "Guests per session",          value: "12",     bold: false, lineBelow: true,  lineColor: NAVY },
    { label: "Session revenue",             value: "$2,340", bold: true,  lineBelow: false },
    { label: "Seafood & groceries",         value: "($540)", bold: false, lineBelow: false, muted: true },
    { label: "Beverage & pairings",         value: "($180)", bold: false, lineBelow: false, muted: true },
    { label: "Chef + assistant labor",      value: "($420)", bold: false, lineBelow: false, muted: true },
    { label: "Studio, insurance, consumables", value: "($220)", bold: false, lineBelow: true, lineColor: NAVY, muted: true },
    { label: "Session contribution",        value: "$980",   bold: true,  lineBelow: false },
    { label: "Contribution margin",         value: "~42%",   bold: true,  lineBelow: false, amberValue: true, boldLabel: true },
  ];

  const econRowH = 0.38;
  let rowY = sectionTop + 0.55;
  econRows.forEach((r) => {
    s.addText(r.label, {
      x: leftX, y: rowY, w: leftW - 1.5, h: econRowH,
      fontFace: "Arial", fontSize: 13,
      color: r.muted ? DARK_MUTED : NAVY,
      bold: r.boldLabel || r.bold,
      valign: "middle", margin: 0,
    });
    s.addText(r.value, {
      x: leftX + leftW - 2, y: rowY, w: 2, h: econRowH,
      fontFace: "Arial", fontSize: 13,
      color: r.amberValue ? AMBER : (r.muted ? DARK_MUTED : NAVY),
      bold: r.bold, align: "right", valign: "middle", margin: 0,
    });
    if (r.lineBelow) {
      s.addShape(pres.shapes.LINE, {
        x: leftX, y: rowY + econRowH, w: leftW, h: 0,
        line: { color: r.lineColor || LINE_LIGHT, width: 0.75 },
      });
    } else {
      s.addShape(pres.shapes.LINE, {
        x: leftX, y: rowY + econRowH, w: leftW, h: 0,
        line: { color: LINE_LIGHT, width: 0.5 },
      });
    }
    rowY += econRowH;
  });

  // RIGHT column — navy card
  const cardX = 7.6;
  const cardY = 2.9;
  const cardW = SW - MARGIN - cardX;
  const cardH = 4.1;
  s.addShape(pres.shapes.RECTANGLE, {
    x: cardX, y: cardY, w: cardW, h: cardH,
    fill: { color: NAVY }, line: { color: NAVY, width: 0 },
  });

  s.addText("YEAR-ONE TARGET", {
    x: cardX + 0.4, y: cardY + 0.35, w: cardW - 0.8, h: 0.3,
    fontFace: "Arial", fontSize: 10.5, color: AMBER,
    charSpacing: 3, valign: "middle", margin: 0,
  });
  s.addText("$1.4M", {
    x: cardX + 0.4, y: cardY + 0.7, w: cardW - 0.8, h: 0.85,
    fontFace: "Georgia", fontSize: 44, color: CREAM,
    valign: "middle", margin: 0,
  });
  s.addText(
    "Revenue at 6 sessions/wk · 48 wks · 85% sell-through.",
    {
      x: cardX + 0.4, y: cardY + 1.6, w: cardW - 0.8, h: 0.45,
      fontFace: "Arial", fontSize: 12, color: LIGHT_MUTED,
      valign: "middle", margin: 0,
    }
  );
  // Divider inside card
  s.addShape(pres.shapes.LINE, {
    x: cardX + 0.4, y: cardY + 2.15, w: cardW - 0.8, h: 0,
    line: { color: LINE_DARK, width: 0.75 },
  });

  s.addText("OPERATING ASSUMPTIONS", {
    x: cardX + 0.4, y: cardY + 2.3, w: cardW - 0.8, h: 0.3,
    fontFace: "Arial", fontSize: 10.5, color: AMBER,
    charSpacing: 3, valign: "middle", margin: 0,
  });

  const assumptions = [
    "Direct-booked & OTA channel mix (70/30).",
    "Hotel concierge partnerships across 14 Seaport properties.",
    "Private buyouts priced at $2,800 floor.",
    "Studio lease signed; capex complete in month 3.",
  ];
  assumptions.forEach((line, i) => {
    const yy = cardY + 2.7 + i * 0.28;
    s.addText("—", {
      x: cardX + 0.4, y: yy, w: 0.3, h: 0.28,
      fontFace: "Arial", fontSize: 10.5, color: AMBER,
      valign: "top", margin: 0,
    });
    s.addText(line, {
      x: cardX + 0.8, y: yy, w: cardW - 1.1, h: 0.28,
      fontFace: "Arial", fontSize: 10.5, color: CREAM,
      valign: "top", margin: 0,
    });
  });

  addFooter(s, "UNIT ECONOMICS", false);
}

// ═════════════════════════════════════════════════════════════════════════
// SLIDE 8 — The Ask (dark, large headline + 3-col detail)
// ═════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  s.addText("08 / 08", {
    x: SW - MARGIN - 2, y: 0.55, w: 2, h: 0.35,
    fontFace: "Arial", fontSize: 10.5, color: LIGHT_MUTED,
    charSpacing: 3, align: "right", valign: "middle", margin: 0,
  });

  s.addText("07 / THE ASK", {
    x: MARGIN, y: 1.35, w: 5, h: 0.35,
    fontFace: "Arial", fontSize: 10.5, color: AMBER,
    charSpacing: 3, valign: "middle", margin: 0,
  });

  // Big headline with amber "$850K" and "October 2026"
  s.addText(
    [
      { text: "We are raising ", options: { color: CREAM } },
      { text: "$850K", options: { color: AMBER } },
      { text: " to open Harbor & Hearth in the Seaport this fall.", options: { color: CREAM } },
    ],
    {
      x: MARGIN, y: 1.85, w: 12, h: 2.75,
      fontFace: "Georgia", fontSize: 48,
      valign: "top", margin: 0, lineSpacingMultiple: 1.08,
    }
  );

  // Amber accent bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: MARGIN, y: 4.85, w: 0.42, h: 0.035,
    fill: { color: AMBER }, line: { color: AMBER, width: 0 },
  });

  // Three columns
  const colW3 = 3.8;
  const gap3 = 0.3;
  const col3Y = 4.95;
  const cols = [
    {
      header: "USE OF FUNDS",
      body: "Studio build-out, lease deposit, chef hire, launch marketing.",
      rich: null,
    },
    {
      header: "MILESTONE",
      body: null,
      rich: [
        { text: "First paid session by ", options: { color: CREAM } },
        { text: "October 2026", options: { color: AMBER } },
        { text: " , breakeven month 11.", options: { color: CREAM } },
      ],
    },
    {
      header: "WHAT WE NEED FROM YOU",
      body: "Capital, a Seaport real-estate intro, and two hospitality-operator advisors.",
      rich: null,
    },
  ];

  cols.forEach((c, i) => {
    const x = MARGIN + i * (colW3 + gap3);
    s.addText(c.header, {
      x, y: col3Y, w: colW3, h: 0.35,
      fontFace: "Arial", fontSize: 10.5, color: LIGHT_MUTED,
      charSpacing: 3, valign: "middle", margin: 0,
    });
    if (c.rich) {
      s.addText(c.rich, {
        x, y: col3Y + 0.45, w: colW3, h: 1.3,
        fontFace: "Georgia", fontSize: 16,
        valign: "top", margin: 0, lineSpacingMultiple: 1.3,
      });
    } else {
      s.addText(c.body, {
        x, y: col3Y + 0.45, w: colW3, h: 1.3,
        fontFace: "Georgia", fontSize: 16, color: CREAM,
        valign: "top", margin: 0, lineSpacingMultiple: 1.3,
      });
    }
  });

  // Contact block bottom-left
  s.addText(
    [
      { text: "HARBOR & HEARTH", options: { color: CREAM, breakLine: true } },
      { text: "HELLO@HARBORANDHEARTH.CO", options: { color: LIGHT_MUTED, breakLine: true } },
      { text: "BOSTON · SEAPORT DISTRICT", options: { color: LIGHT_MUTED } },
    ],
    {
      x: MARGIN, y: SH - 0.9, w: 5, h: 0.85,
      fontFace: "Arial", fontSize: 10, charSpacing: 3,
      valign: "top", margin: 0, paraSpaceAfter: 2,
    }
  );
}

// ─── Write ───────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "cooking_experience_replica.pptx" })
  .then((name) => console.log("Wrote:", name));
