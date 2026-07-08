// build_deck.js
// Replica of Lunar_Family_Offices.pptx using pptxgenjs.
// Run: node build_deck.js
// Output: Lunar_Family_Offices.pptx in the current working directory.

const pptxgen = require("pptxgenjs");

// ---------------------------------------------------------------------------
// Design tokens
// ---------------------------------------------------------------------------
const COLOR = {
  darkBg:     "0D0C0A",   // near-black for body slides
  taupeBg:    "B8B2A0",   // warm taupe for title slide
  creamBg:    "EDE7D6",   // cream for slides 6 & 10
  ink:        "0D0C0A",   // dark body text on cream
  cream:      "EDE7D6",   // cream text / moon
  white:      "F2EEE2",   // warm off-white for headline text on dark
  amber:      "C89A2E",   // primary gold accent
  amberDim:   "8A6A1F",
  mutedOnDark:    "6A6558",  // low-contrast mono labels on dark
  mutedOnCream:   "7A7566",  // low-contrast mono labels on cream
  bodyOnDark:     "BCB7A8",  // body copy on dark
  bodyOnCream:    "3E3A30",  // body copy on cream
  rule:           "2A2720",  // subtle rule line on dark
  ruleCream:      "C9C2AF",  // subtle rule line on cream
};

const F = {
  serif:  "Georgia",
  mono:   "Consolas",
};

// Slide dimensions (LAYOUT_WIDE: 13.333 x 7.5)
const W = 13.333;
const H = 7.5;

// Margins
const MARGIN_L = 0.6;
const MARGIN_R = 0.6;
const MARGIN_T = 0.45;
const MARGIN_B = 0.45;

// Helpers ------------------------------------------------------------------

// Small mono uppercase label (spaced out), used for eyebrow/footer text
function monoLabel(slide, text, opts) {
  slide.addText(text, {
    fontFace: F.mono,
    fontSize: opts.fontSize || 9,
    color: opts.color || COLOR.mutedOnDark,
    bold: false,
    charSpacing: opts.charSpacing != null ? opts.charSpacing : 6,
    align: opts.align || "left",
    valign: opts.valign || "top",
    margin: 0,
    x: opts.x, y: opts.y, w: opts.w, h: opts.h,
  });
}

function headerEyebrow(slide, category, roman, onCream = false) {
  const mutedCol = onCream ? COLOR.mutedOnCream : COLOR.mutedOnDark;
  // Left: category
  monoLabel(slide, category.toUpperCase(), {
    x: MARGIN_L, y: MARGIN_T, w: 8, h: 0.3,
    color: mutedCol, fontSize: 9, charSpacing: 6,
  });
  // Right: roman numeral
  monoLabel(slide, roman, {
    x: W - MARGIN_R - 1.5, y: MARGIN_T, w: 1.5, h: 0.3,
    color: mutedCol, fontSize: 9, charSpacing: 8, align: "right",
  });
}

function sectionTag(slide, tag, y, onCream = false) {
  monoLabel(slide, tag.toUpperCase(), {
    x: MARGIN_L, y: y, w: 6, h: 0.3,
    color: COLOR.amber, fontSize: 9, charSpacing: 6,
  });
}

function pageFooter(slide, page, onCream = false) {
  const mutedCol = onCream ? COLOR.mutedOnCream : COLOR.mutedOnDark;
  // Left: brand
  monoLabel(slide, "SATURN  HOUSE  CAPITAL", {
    x: MARGIN_L, y: H - MARGIN_B - 0.3, w: 5, h: 0.3,
    color: mutedCol, fontSize: 8.5, charSpacing: 4,
  });
  // Right: page counter
  monoLabel(slide, `${String(page).padStart(2, "0")}  /  10`, {
    x: W - MARGIN_R - 2, y: H - MARGIN_B - 0.3, w: 2, h: 0.3,
    color: mutedCol, fontSize: 8.5, charSpacing: 6, align: "right",
  });
}

function ruleLine(slide, x, y, w, color = COLOR.rule, thickness = 0.75) {
  slide.addShape("line", {
    x: x, y: y, w: w, h: 0,
    line: { color: color, width: thickness },
  });
}

// ---------------------------------------------------------------------------
// Build presentation
// ---------------------------------------------------------------------------
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Saturn House Capital";
pres.title  = "Moonlaunch FreightCo — Investment Memo";

// =========================================================================
// SLIDE 1 — Title / cover
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.taupeBg };

  // Top-left eyebrow
  monoLabel(s, "SATURN  HOUSE  CAPITAL  ·  PRIVATE  MARKETS", {
    x: MARGIN_L, y: MARGIN_T, w: 7, h: 0.3,
    color: "5A5648", fontSize: 9.5, charSpacing: 5,
  });
  // Top-right confidentiality
  monoLabel(s, "CONFIDENTIAL  /  FOR  DISCUSSION", {
    x: W - MARGIN_R - 5, y: MARGIN_T, w: 5, h: 0.3,
    color: "5A5648", fontSize: 9.5, charSpacing: 5, align: "right",
  });

  // Moon (cream circle, upper right)
  s.addShape("ellipse", {
    x: 9.3, y: 1.0, w: 2.6, h: 2.6,
    fill: { color: COLOR.cream },
    line: { color: COLOR.cream, width: 0 },
  });

  // Amber "INVESTMENT MEMO — SERIES B LEAD"
  monoLabel(s, "INVESTMENT  MEMO  —  SERIES  B  LEAD", {
    x: MARGIN_L, y: 3.55, w: 8, h: 0.35,
    color: COLOR.amber, fontSize: 10.5, charSpacing: 5,
  });

  // Big title with mixed serif + amber italic
  s.addText(
    [
      { text: "Moonlaunch ",  options: { fontFace: F.serif, fontSize: 66, color: COLOR.white, italic: false } },
      { text: "FreightCo.",   options: { fontFace: F.serif, fontSize: 66, color: COLOR.amber, italic: true } },
    ],
    {
      x: MARGIN_L, y: 3.95, w: 12.2, h: 1.25,
      valign: "top", margin: 0,
    }
  );

  // Subheading
  s.addText(
    "The first institutional-grade logistics operator for the cislunar economy.",
    {
      x: MARGIN_L, y: 5.55, w: 10, h: 0.9,
      fontFace: F.serif, italic: true, fontSize: 18,
      color: "6A6656", margin: 0, valign: "top",
    }
  );

  // Footer row (three columns)
  const footerY = H - MARGIN_B - 0.3;
  monoLabel(s, "APRIL  2026", {
    x: MARGIN_L, y: footerY, w: 3, h: 0.3,
    color: "4E4A3D", fontSize: 9.5, charSpacing: 5,
  });
  monoLabel(s, "PREPARED  FOR  THE  PRINCIPAL", {
    x: (W - 6) / 2, y: footerY, w: 6, h: 0.3,
    color: "4E4A3D", fontSize: 9.5, charSpacing: 5, align: "center",
  });
  monoLabel(s, "01  /  10", {
    x: W - MARGIN_R - 2, y: footerY, w: 2, h: 0.3,
    color: "4E4A3D", fontSize: 9.5, charSpacing: 6, align: "right",
  });
}

// =========================================================================
// SLIDE 2 — Thesis in one page
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.darkBg };

  headerEyebrow(s, "THE  THESIS  IN  ONE  PAGE", "II");
  sectionTag(s, "THESIS", 0.9);

  // Big pull quote with mixed runs (amber italics on phrases)
  s.addText(
    [
      { text: "Once a generation, the world gets a ",          options: { color: COLOR.white } },
      { text: "new frontier for freight",                      options: { color: COLOR.amber, italic: true } },
      { text: " . Moonlaunch is building the ",                options: { color: COLOR.white } },
      { text: "dockyard, wire, and grid",                      options: { color: COLOR.amber, italic: true } },
      { text: " for the next one — before the cargo shows up.", options: { color: COLOR.white } },
    ],
    {
      x: MARGIN_L, y: 1.45, w: 12.2, h: 3.5,
      fontFace: F.serif, fontSize: 36,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    }
  );

  // Three columns at the bottom
  const cols = [
    { r: "I.",   t: "Anchor demand is already funded — a sovereign customer with a multi-decade program." },
    { r: "II.",  t: "Launch has been commoditized. The surface has not. Margin moves downrange." },
    { r: "III.", t: "Infrastructure compounds. First operator of record writes the standards, and the tariffs." },
  ];
  const colW = (W - MARGIN_L - MARGIN_R - 0.6) / 3; // small gutters
  const colTop = 5.55;
  cols.forEach((c, i) => {
    const x = MARGIN_L + i * (colW + 0.3);
    monoLabel(s, c.r, {
      x: x, y: colTop, w: colW, h: 0.3,
      color: COLOR.amber, fontSize: 10, charSpacing: 4,
    });
    s.addText(c.t, {
      x: x, y: colTop + 0.35, w: colW, h: 1.3,
      fontFace: F.serif, fontSize: 13.5, color: COLOR.white,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    });
  });

  pageFooter(s, 2);
}

// =========================================================================
// SLIDE 3 — Historical precedent
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.darkBg };

  headerEyebrow(s, "HISTORICAL  PRECEDENT", "III");
  sectionTag(s, "ANALOGY", 0.9);

  // Left column headline
  s.addText(
    [
      { text: "Earth built its empires on ", options: { color: COLOR.white } },
      { text: "freight",                     options: { color: COLOR.amber, italic: true } },
      { text: ". Each new medium followed the same pattern — a sovereign anchor, a private network, a century of compounding rent.",
        options: { color: COLOR.white } },
    ],
    {
      x: MARGIN_L, y: 1.4, w: 5.5, h: 4.5,
      fontFace: F.serif, fontSize: 26,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    }
  );

  // Right column: three rows
  const rightX    = 6.8;
  const rightW    = W - MARGIN_R - rightX;
  const labelW    = 1.75;
  const bodyX     = rightX + labelW + 0.25;
  const bodyW     = W - MARGIN_R - bodyX;

  const rows = [
    {
      lbl: "SHIPPING  ·\n1600–1750",
      head: "Chartered fleets moved the spice, then wrote the rules of the sea.",
      body: "Royal charters and naval escort underwrote the first liners. Private operators inherited the shipping lanes.",
    },
    {
      lbl: "TELECOMS  ·\n1860–1920",
      head: "Transatlantic cable was a government project that became a monopoly.",
      body: "Subsidized capex, commercial traffic. A single operator's protocols outlived the empire that paid for them.",
    },
    {
      lbl: "ENERGY  ·\n1900–1950",
      head: "Pipelines and the grid were built on 40-year contracts, not customers.",
      body: "Standard Oil and the early utilities earned infrastructure multiples because the moat was physical, not commercial.",
    },
  ];

  let rowY = 1.4;
  const rowH = 1.75;

  rows.forEach((r, i) => {
    // Top rule for each row
    ruleLine(s, rightX, rowY, rightW);

    // Mono label (two lines)
    s.addText(r.lbl, {
      x: rightX, y: rowY + 0.18, w: labelW, h: 0.9,
      fontFace: F.mono, fontSize: 9.5, color: COLOR.amber,
      charSpacing: 4, margin: 0, valign: "top",
    });

    // Headline
    s.addText(r.head, {
      x: bodyX, y: rowY + 0.1, w: bodyW, h: 0.75,
      fontFace: F.serif, fontSize: 15.5, color: COLOR.white,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    });

    // Body
    s.addText(r.body, {
      x: bodyX, y: rowY + 0.92, w: bodyW, h: 0.75,
      fontFace: F.serif, fontSize: 11, color: COLOR.bodyOnDark,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    });

    rowY += rowH;
  });

  pageFooter(s, 3);
}

// =========================================================================
// SLIDE 4 — Destination
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.darkBg };

  headerEyebrow(s, "SHIFT  IN  GRAVITY  OF  THE  SPACE  ECONOMY", "IV");
  sectionTag(s, "DESTINATION", 0.9);

  // Big orbit circle on the right
  // Outer orbit (thin ring) — use ellipse with no fill, just line
  s.addShape("ellipse", {
    x: 6.4, y: 0.9, w: 6.6, h: 6.6,
    fill: { color: COLOR.darkBg },
    line: { color: COLOR.rule, width: 0.75 },
  });
  // Inner orbit
  s.addShape("ellipse", {
    x: 7.8, y: 2.05, w: 4.0, h: 4.0,
    fill: { color: COLOR.darkBg },
    line: { color: COLOR.rule, width: 0.75 },
  });
  // Moon (cream disc) in the inner orbit center
  s.addShape("ellipse", {
    x: 8.9, y: 3.15, w: 1.8, h: 1.8,
    fill: { color: COLOR.cream },
    line: { color: COLOR.cream, width: 0 },
  });

  // Small LEO dot on the outer orbit (top-left area of the ring)
  s.addShape("ellipse", {
    x: 6.25, y: 3.8, w: 0.45, h: 0.45,
    fill: { color: "3D4858" },
    line: { color: "3D4858", width: 0 },
  });

  // Headline (left)
  s.addText(
    [
      { text: "The moon is becoming a\n", options: { color: COLOR.white } },
      { text: "destination",                options: { color: COLOR.amber, italic: true } },
      { text: ", not a visit.",             options: { color: COLOR.white } },
    ],
    {
      x: MARGIN_L, y: 1.4, w: 5.6, h: 1.9,
      fontFace: F.serif, fontSize: 32,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    }
  );

  // Body paragraph
  s.addText(
    "For six decades, cislunar space was a photo opportunity. Artemis, CLPS, and an emergent Chinese program have re-coded it as a persistent theater — with habitats, power, and commerce on the manifest.",
    {
      x: MARGIN_L, y: 3.3, w: 5.6, h: 1.5,
      fontFace: F.serif, fontSize: 12.5, color: COLOR.bodyOnDark,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    }
  );

  // LEO label (next to dot)
  monoLabel(s, "LEO  —  COMMODITIZED", {
    x: MARGIN_L, y: 4.9, w: 3.5, h: 0.3,
    color: COLOR.mutedOnDark, fontSize: 9.5, charSpacing: 4,
  });

  // Lunar surface label (under moon)
  monoLabel(s, "LUNAR  SURFACE  —  CONTESTED", {
    x: 7.8, y: 5.25, w: 4.0, h: 0.3,
    color: COLOR.amber, fontSize: 9.5, charSpacing: 4, align: "center",
  });

  // Three stat columns at bottom-left
  const stats = [
    { lbl: "BY  2030  [EST.]",       v: "6–9 crewed surface missions on the books" },
    { lbl: "BY  2035  [EST.]",       v: "Persistent human presence, rotational" },
    { lbl: "CARGO DEMAND [EST.]",    v: "~$14B cumulative payload-to-surface spend" },
  ];
  const statW = 1.9;
  const statsY = 5.85;
  stats.forEach((st, i) => {
    const x = MARGIN_L + i * (statW + 0.15);
    monoLabel(s, st.lbl, {
      x: x, y: statsY, w: statW + 0.2, h: 0.3,
      color: COLOR.amber, fontSize: 8.5, charSpacing: 2,
    });
    s.addText(st.v, {
      x: x, y: statsY + 0.3, w: statW, h: 1.0,
      fontFace: F.serif, fontSize: 11.5, color: COLOR.white,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    });
  });

  pageFooter(s, 4);
}

// =========================================================================
// SLIDE 5 — Infrastructure roadmap
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.darkBg };

  headerEyebrow(s, "INFRASTRUCTURE  ROADMAP", "V");
  sectionTag(s, "INFRASTRUCTURE", 0.9);

  // Lead paragraph full width
  s.addText(
    "Moonlaunch is building the three pieces the surface economy can't exist without — and owning the right-of-way for the next operator.",
    {
      x: MARGIN_L, y: 1.25, w: 12.2, h: 1.1,
      fontFace: F.serif, fontSize: 21, color: COLOR.white,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    }
  );

  // Top rule above the three columns
  ruleLine(s, MARGIN_L, 2.85, W - MARGIN_L - MARGIN_R);

  // Three columns
  const phases = [
    {
      tag:  "PHASE  I  ·  2027–2029",
      head: "Power.",
      body: "Deployable solar arrays and regolith-tolerant storage rated for 14-day lunar night. The grid precedes the settlement.",
      kicker: "→  50 kW pilot on LS-2",
    },
    {
      tag:  "PHASE  II  ·  2028–2030",
      head: "Comms & PNT.",
      body: "A relay constellation of four lunar-orbit craft carrying position, navigation, and timing for every subsequent lander — ours or otherwise.",
      kicker: "→  Sovereign-grade, commercially leased",
    },
    {
      tag:  "PHASE  III  ·  2030+",
      head: "Landing pads.",
      body: "Sintered regolith pads and beaconed approach corridors. Every commercial lander after ours pays to use them, or lands dirty.",
      kicker: "→  Tariff asset, 30-yr life",
    },
  ];

  const totalW = W - MARGIN_L - MARGIN_R;
  const colW2  = (totalW - 0.4) / 3;   // 0.2" gap between columns
  const colTop = 3.05;
  const colBottom = H - MARGIN_B - 0.55; // leave room for footer

  phases.forEach((p, i) => {
    const x = MARGIN_L + i * (colW2 + 0.2);

    // Vertical dividers between columns (not before the first)
    if (i > 0) {
      s.addShape("line", {
        x: x - 0.1, y: colTop, w: 0, h: colBottom - colTop,
        line: { color: COLOR.rule, width: 0.75 },
      });
    }

    // Simple mono icon glyph drawn with basic shapes? We'll use a small
    // monospace symbol instead of an external icon asset to keep this
    // script self-contained.
    let glyph = "";
    if (i === 0) glyph = "☼";   // sun
    if (i === 1) glyph = "ʘ";   // relay
    if (i === 2) glyph = "△";   // pad
    s.addText(glyph, {
      x: x, y: colTop + 0.1, w: 0.9, h: 0.7,
      fontFace: F.serif, fontSize: 34, color: COLOR.bodyOnDark,
      margin: 0, valign: "top",
    });

    // Phase tag
    monoLabel(s, p.tag, {
      x: x, y: colTop + 1.0, w: colW2, h: 0.3,
      color: COLOR.mutedOnDark, fontSize: 9.5, charSpacing: 4,
    });

    // Headline
    s.addText(p.head, {
      x: x, y: colTop + 1.35, w: colW2, h: 0.55,
      fontFace: F.serif, fontSize: 24, color: COLOR.white,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    });

    // Body
    s.addText(p.body, {
      x: x, y: colTop + 1.95, w: colW2, h: 1.7,
      fontFace: F.serif, fontSize: 12, color: COLOR.bodyOnDark,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    });

    // Kicker (near bottom of column)
    monoLabel(s, p.kicker, {
      x: x, y: colBottom - 0.4, w: colW2, h: 0.3,
      color: COLOR.amber, fontSize: 10, charSpacing: 2,
    });
  });

  pageFooter(s, 5);
}

// =========================================================================
// SLIDE 6 — Anchor customer (cream background)
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.creamBg };

  headerEyebrow(s, "ANCHOR  CUSTOMER", "VI", true);
  sectionTag(s, "GOVERNMENT  DEMAND", 0.9, true);

  // Big headline
  s.addText(
    [
      { text: "The anchor customer is a ", options: { color: COLOR.ink } },
      { text: "government",                options: { color: COLOR.amberDim, italic: true } },
      { text: " , again.",                 options: { color: COLOR.ink } },
    ],
    {
      x: MARGIN_L, y: 1.3, w: 12.2, h: 1.9,
      fontFace: F.serif, fontSize: 42,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    }
  );

  // Pull quote with left accent bar
  s.addShape("rect", {
    x: MARGIN_L, y: 3.55, w: 0.04, h: 1.15,
    fill: { color: COLOR.amberDim },
    line: { color: COLOR.amberDim, width: 0 },
  });
  s.addText(
    '"Every mature freight system was financed by a sovereign that needed it first. The private operators came later and kept the right-of-way." — the recurring pattern.',
    {
      x: MARGIN_L + 0.25, y: 3.5, w: 8.0, h: 1.3,
      fontFace: F.serif, italic: true, fontSize: 15,
      color: COLOR.bodyOnCream, valign: "top",
      margin: 0, paraSpaceAfter: 0,
    }
  );

  // Four columns along the bottom
  const progs = [
    {
      tag: "NASA  ·  CLPS",
      body: "Commercial lunar payload delivery IDIQ — multi-vendor, task-order",
      kicker: "~$2.6B ceiling [est.]",
    },
    {
      tag: "NASA  ·  ARTEMIS",
      body: "Surface infrastructure & logistics for crewed missions III → VI",
      kicker: "Multi-decade program",
    },
    {
      tag: "DOD  ·  DARPA  LUNA-10",
      body: "Cislunar architecture study & follow-on ops contracts",
      kicker: "$10M study → $B ops [est.]",
    },
    {
      tag: "USSF  ·  CISLUNAR  HWY",
      body: "Sovereign domain awareness + PNT beyond GEO",
      kicker: "Classified program budget",
    },
  ];

  const totW = W - MARGIN_L - MARGIN_R;
  const colW3 = (totW - 0.6) / 4; // 0.2" gutters
  const rowY = 4.9;

  progs.forEach((p, i) => {
    const x = MARGIN_L + i * (colW3 + 0.2);
    // Top rule
    ruleLine(s, x, rowY, colW3, COLOR.ruleCream);
    // Tag
    monoLabel(s, p.tag, {
      x: x, y: rowY + 0.15, w: colW3, h: 0.3,
      color: COLOR.mutedOnCream, fontSize: 9, charSpacing: 4,
    });
    // Body
    s.addText(p.body, {
      x: x, y: rowY + 0.5, w: colW3, h: 0.95,
      fontFace: F.serif, fontSize: 12, color: COLOR.ink,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    });
    // Kicker
    s.addText(p.kicker, {
      x: x, y: rowY + 1.55, w: colW3, h: 0.35,
      fontFace: F.mono, fontSize: 9.5, color: COLOR.amberDim,
      valign: "top", margin: 0, charSpacing: 2,
    });
  });

  pageFooter(s, 6, true);
}

// =========================================================================
// SLIDE 7 — Commercial flywheel
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.darkBg };

  headerEyebrow(s, "COMMERCIAL  FLYWHEEL", "VII");
  sectionTag(s, "PARTNERSHIPS", 0.9);

  // Headline (left)
  s.addText(
    [
      { text: "The commercial flywheel is\n", options: { color: COLOR.white } },
      { text: "already turning",               options: { color: COLOR.amber, italic: true } },
      { text: ".",                             options: { color: COLOR.white } },
    ],
    {
      x: MARGIN_L, y: 1.3, w: 7.5, h: 1.8,
      fontFace: F.serif, fontSize: 34,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    }
  );

  // Body paragraph (right)
  s.addText(
    "Launch is now a line item. Primes need a surface partner to close their own bids. Moonlaunch is the neutral operator every one of them can sell alongside without competing with.",
    {
      x: 8.3, y: 1.35, w: 4.4, h: 1.75,
      fontFace: F.serif, fontSize: 12.5, color: COLOR.bodyOnDark,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    }
  );

  // Top rule above the 4 columns
  const rowY = 4.15;
  ruleLine(s, MARGIN_L, rowY, W - MARGIN_L - MARGIN_R);

  const parts = [
    { tag: "HEAVY  LIFT",   head: "Commercial launch providers",   body: "Dedicated Starship & New Glenn manifests; Moonlaunch buys capacity by the ton, not the mission." },
    { tag: "PRIMES",        head: "Traditional defense & space",   body: "Subcontracted surface logistics on their Artemis & sovereign bids. We are the neutral last mile." },
    { tag: "SCIENCE",       head: "Agency & university payloads",  body: "Rack-space on every lander; a ride-share model with forward contracts out to 2032 [est.]." },
    { tag: "INDUSTRY",      head: "Resource & manufacturing",      body: "Early-stage ISRU, pharma, and optics experiments. Cargo today; tenancy tomorrow." },
  ];

  const totW = W - MARGIN_L - MARGIN_R;
  const colW4 = (totW - 0.6) / 4;
  const colBottom = H - MARGIN_B - 0.55;

  parts.forEach((p, i) => {
    const x = MARGIN_L + i * (colW4 + 0.2);

    if (i > 0) {
      s.addShape("line", {
        x: x - 0.1, y: rowY + 0.1, w: 0, h: colBottom - rowY - 0.1,
        line: { color: COLOR.rule, width: 0.75 },
      });
    }

    monoLabel(s, p.tag, {
      x: x, y: rowY + 0.22, w: colW4, h: 0.3,
      color: COLOR.amber, fontSize: 9.5, charSpacing: 4,
    });
    s.addText(p.head, {
      x: x, y: rowY + 0.6, w: colW4, h: 0.95,
      fontFace: F.serif, fontSize: 17, color: COLOR.white,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    });
    s.addText(p.body, {
      x: x, y: rowY + 1.6, w: colW4, h: 1.4,
      fontFace: F.serif, fontSize: 11.5, color: COLOR.bodyOnDark,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    });
  });

  pageFooter(s, 7);
}

// =========================================================================
// SLIDE 8 — Unit economics
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.darkBg };

  headerEyebrow(s, "UNIT  ECONOMICS", "VIII");
  sectionTag(s, "$  /  KG  TO  SURFACE", 0.9);

  // Headline
  s.addText(
    [
      { text: "The curve is ",      options: { color: COLOR.white } },
      { text: "bending faster",     options: { color: COLOR.amber, italic: true } },
      { text: " than the market has priced.", options: { color: COLOR.white } },
    ],
    {
      x: MARGIN_L, y: 1.3, w: 9.5, h: 1.85,
      fontFace: F.serif, fontSize: 34,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    }
  );

  // Left table -- three rows
  const tblX = MARGIN_L;
  const tblY = 3.35;
  const tblW = 7.3;
  const colLabelW = 1.7;
  const colDescX  = tblX + colLabelW + 0.1;
  const colDescW  = 3.65;
  const colValX   = tblX + colLabelW + colDescW + 0.15;
  const colValW   = tblW - colLabelW - colDescW - 0.25;
  const rowStep = 1.0;

  // Top rule
  ruleLine(s, tblX, tblY, tblW);

  const items = [
    { lbl: "TODAY  [EST.]",  desc: "Bespoke lander, one-off mission profile, no surface assets", val: "~$1.2M / kg" },
    { lbl: "2029  [EST.]",   desc: "Shared manifest, reusable transfer stage, in-house PNT",     val: "~$380k / kg" },
    { lbl: "2033  [EST.]",   desc: "Pad-landed, propellant-staged, tariffed access to grid & comms", val: "~$95k / kg" },
  ];

  items.forEach((it, i) => {
    const y = tblY + 0.15 + i * rowStep;
    monoLabel(s, it.lbl, {
      x: tblX, y: y, w: colLabelW, h: 0.3,
      color: COLOR.mutedOnDark, fontSize: 9.5, charSpacing: 4,
    });
    s.addText(it.desc, {
      x: colDescX, y: y - 0.04, w: colDescW, h: 0.8,
      fontFace: F.serif, fontSize: 13, color: COLOR.white,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    });
    s.addText(it.val, {
      x: colValX, y: y - 0.04, w: colValW, h: 0.8,
      fontFace: F.mono, fontSize: 12, color: COLOR.amber,
      valign: "top", align: "right", margin: 0, charSpacing: 1,
    });
    // Divider rule at bottom of each row
    ruleLine(s, tblX, tblY + (i + 1) * rowStep, tblW);
  });

  // Right-side chart showing the curve
  // We use a native line chart so PowerPoint keeps it editable.
  const chartData = [
    {
      name: "$/kg",
      labels: ["2024", "2026", "2028", "2030", "2032"],
      values: [1200, 800, 380, 180, 95],
    },
  ];
  s.addChart(pres.charts.LINE, chartData, {
    x: 8.0, y: 3.3, w: 4.4, h: 3.2,
    chartColors: [COLOR.amber],
    chartArea: { fill: { color: COLOR.darkBg }, border: { pt: 0, color: COLOR.darkBg } },
    plotArea:  { fill: { color: COLOR.darkBg }, border: { pt: 0, color: COLOR.darkBg } },
    lineSize: 2.5,
    lineSmooth: true,
    lineDataSymbol: "circle",
    lineDataSymbolSize: 6,
    lineDataSymbolLineColor: COLOR.amber,
    lineDataSymbolFillColor: COLOR.amber,
    showLegend: false,
    showTitle: false,
    catAxisLabelColor: COLOR.mutedOnDark,
    catAxisLabelFontFace: F.mono,
    catAxisLabelFontSize: 9,
    valAxisLabelColor: COLOR.mutedOnDark,
    valAxisLabelFontFace: F.mono,
    valAxisLabelFontSize: 9,
    valGridLine: { style: "none" },
    catGridLine: { style: "none" },
    valAxisLineColor: COLOR.rule,
    catAxisLineColor: COLOR.rule,
  });

  // Chart annotations (italic serif)
  s.addText("Today — bespoke lander", {
    x: 8.75, y: 3.3, w: 2.6, h: 0.35,
    fontFace: F.serif, italic: true, fontSize: 10.5, color: COLOR.bodyOnDark,
    margin: 0, valign: "top",
  });
  s.addText("At scale — shared manifests", {
    x: 9.9, y: 4.75, w: 2.5, h: 0.35,
    fontFace: F.serif, italic: true, fontSize: 10.5, color: COLOR.bodyOnDark,
    margin: 0, valign: "top",
  });
  s.addText("Infrastructure-enabled", {
    x: 10.5, y: 5.85, w: 2.0, h: 0.35,
    fontFace: F.serif, italic: true, fontSize: 10.5, color: COLOR.bodyOnDark,
    margin: 0, valign: "top",
  });

  // Disclaimer line above footer
  monoLabel(s, "ILLUSTRATIVE  ·  FIGURES  MARKED  [EST.]  ·  MODEL  ON  REQUEST", {
    x: MARGIN_L, y: H - MARGIN_B - 0.55, w: 8, h: 0.3,
    color: COLOR.mutedOnDark, fontSize: 8.5, charSpacing: 4,
  });

  pageFooter(s, 8);
}

// =========================================================================
// SLIDE 9 — Team
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.darkBg };

  headerEyebrow(s, "FOUNDERS  &  OPERATORS", "IX");
  sectionTag(s, "TEAM", 0.9);

  // Headline
  s.addText(
    [
      { text: "Operators, not ", options: { color: COLOR.white } },
      { text: "enthusiasts",     options: { color: COLOR.amber, italic: true } },
      { text: ".",               options: { color: COLOR.white } },
    ],
    {
      x: MARGIN_L, y: 1.2, w: 12.2, h: 0.9,
      fontFace: F.serif, fontSize: 34,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    }
  );

  // Three portrait cards
  const members = [
    { role: "CO-FOUNDER  &  CEO", name: "[ Name Placeholder ]",
      bio: "Prior: VP Mission Systems at a top-3 launch company. Shipped 40+ missions to LEO. Led the first commercial lunar lander critical design review." },
    { role: "CO-FOUNDER  &  CTO", name: "[ Name Placeholder ]",
      bio: "Prior: Chief Engineer, crewed-rated propulsion program. 15 years at a national lab on in-situ resource utilization. PhD, aerospace." },
    { role: "PRESIDENT  &  COO", name: "[ Name Placeholder ]",
      bio: "Prior: Program Executive, Artemis supply chain. Two decades at a prime; closed $3B+ of sovereign contracts. USAF, ret." },
  ];

  const totW = W - MARGIN_L - MARGIN_R;
  const colW5 = (totW - 0.6) / 3;   // 0.3" gutter
  const topY = 2.2;
  const portraitH = 2.2;

  members.forEach((m, i) => {
    const x = MARGIN_L + i * (colW5 + 0.3);

    // Top rule
    ruleLine(s, x, topY, colW5);

    // Portrait placeholder box
    s.addShape("rect", {
      x: x, y: topY + 0.18, w: colW5, h: portraitH,
      fill: { color: "1C1B17" },
      line: { color: "1C1B17", width: 0 },
    });
    monoLabel(s, "[  PORTRAIT  ]", {
      x: x + 0.15, y: topY + portraitH - 0.15, w: colW5 - 0.3, h: 0.3,
      color: COLOR.mutedOnDark, fontSize: 9, charSpacing: 4,
    });

    // Role
    monoLabel(s, m.role, {
      x: x, y: topY + portraitH + 0.35, w: colW5, h: 0.3,
      color: COLOR.amber, fontSize: 10, charSpacing: 4,
    });

    // Name
    s.addText(m.name, {
      x: x, y: topY + portraitH + 0.6, w: colW5, h: 0.5,
      fontFace: F.serif, fontSize: 19, color: COLOR.white,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    });

    // Bio
    s.addText(m.bio, {
      x: x, y: topY + portraitH + 1.15, w: colW5, h: 1.3,
      fontFace: F.serif, fontSize: 11, color: COLOR.bodyOnDark,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    });
  });

  pageFooter(s, 9);
}

// =========================================================================
// SLIDE 10 — The Ask (cream background)
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.creamBg };

  headerEyebrow(s, "THE  ASK", "X", true);
  sectionTag(s, "PROPOSED  TERMS", 0.9, true);

  // Headline
  s.addText(
    [
      { text: "$250M ",     options: { color: COLOR.ink } },
      { text: "Series B.",  options: { color: COLOR.amberDim, italic: true } },
      { text: " We're seeking a $50M lead.", options: { color: COLOR.ink } },
    ],
    {
      x: MARGIN_L, y: 1.25, w: 12.2, h: 1.7,
      fontFace: F.serif, fontSize: 40,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    }
  );

  // Huge $50M display
  s.addText("$50M", {
    x: MARGIN_L, y: 3.15, w: 6, h: 1.15,
    fontFace: F.serif, italic: true, fontSize: 72,
    color: COLOR.amberDim, bold: false,
    valign: "top", margin: 0, paraSpaceAfter: 0,
  });

  // Sub-caption
  monoLabel(s, "LEAD  TICKET  ·  BOARD  SEAT  ·  PRO-RATA  TO  SERIES  C", {
    x: MARGIN_L, y: 4.4, w: 10, h: 0.3,
    color: COLOR.mutedOnCream, fontSize: 10, charSpacing: 5,
  });

  // Top rule above breakdown
  ruleLine(s, MARGIN_L, 4.85, W - MARGIN_L - MARGIN_R, COLOR.ruleCream);

  // Four use-of-funds columns
  const uses = [
    { pct: "44%", head: "Phase I hardware",         body: "Power array build, first two landers, qualification." },
    { pct: "28%", head: "Comms & PNT constellation", body: "Long-lead satellite bus, launch deposits." },
    { pct: "18%", head: "Government capture",        body: "Program office, classified-ready facility, bid desk." },
    { pct: "10%", head: "Reserve & working capital", body: "18-month runway to first surface revenue." },
  ];

  const totW = W - MARGIN_L - MARGIN_R;
  const colW6 = (totW - 0.6) / 4;
  const rowY = 5.05;

  uses.forEach((u, i) => {
    const x = MARGIN_L + i * (colW6 + 0.2);
    s.addText(u.pct, {
      x: x, y: rowY, w: colW6, h: 0.75,
      fontFace: F.serif, fontSize: 30, color: COLOR.amberDim,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    });
    s.addText(u.head, {
      x: x, y: rowY + 0.75, w: colW6, h: 0.4,
      fontFace: F.serif, fontSize: 12.5, color: COLOR.ink, bold: true,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    });
    s.addText(u.body, {
      x: x, y: rowY + 1.15, w: colW6, h: 1.0,
      fontFace: F.serif, fontSize: 10.5, color: COLOR.bodyOnCream,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    });
  });

  // Footer with custom brand string
  const footerY = H - MARGIN_B - 0.3;
  monoLabel(s, "SATURN  HOUSE  CAPITAL  ·  MOONLAUNCH  FREIGHTCO.", {
    x: MARGIN_L, y: footerY, w: 8, h: 0.3,
    color: COLOR.mutedOnCream, fontSize: 8.5, charSpacing: 4,
  });
  monoLabel(s, "10  /  10", {
    x: W - MARGIN_R - 2, y: footerY, w: 2, h: 0.3,
    color: COLOR.mutedOnCream, fontSize: 8.5, charSpacing: 6, align: "right",
  });
}

// ---------------------------------------------------------------------------
// Write file
// ---------------------------------------------------------------------------
pres.writeFile({ fileName: "Lunar_Family_Offices.pptx" })
  .then(fn => console.log("Wrote:", fn))
  .catch(err => { console.error(err); process.exit(1); });
