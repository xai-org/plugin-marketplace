// montenegro_wine_market.js
// Recreates Montenegro_Wine_Market.pptx using pptxgenjs

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();

// Custom layout — source deck is 20" x 11.25" (16:9)
pres.defineLayout({ name: "CUSTOM", width: 20, height: 11.25 });
pres.layout = "CUSTOM";
pres.author = "Wine Montenegro";
pres.title = "Wine Montenegro — Tourism Strategy Brief";

// ===== Palette =====
const C = {
  burgundy: "3A1420",
  cream:    "F3EDE2",
  cream2:   "FAF6EE",
  gold:     "B08A3E",
  ink:      "1A1412",
  wine:     "7A2A3A",
  tan:      "E8DCC4",
  track:    "ECE4D4",
  mute:     "8A7B6B", // muted label / source text on cream
  muteDk:   "8A7566", // muted on burgundy
};

// ===== Fonts =====
const FHEAD = "Georgia";
const FBODY = "Calibri";

// ===== Page dimensions =====
const W = 20;
const H = 11.25;
const MARGIN = 1.2;   // left/right content margin
const TOP_BAR_Y = 0.7;
const FOOT_Y = 10.55;

// Small helpers ---------------------------------------------------------------

// Top chrome: brand left, section label right, separator rule
function addTopBar(slide, sectionLabel, opts = {}) {
  const dark = !!opts.dark;
  const brandColor = dark ? C.cream : C.ink;
  const labelColor = dark ? C.muteDk : C.mute;
  const ruleColor = dark ? "5A3040" : "C9BEA9";

  slide.addText("WINE MONTENEGRO", {
    x: MARGIN, y: TOP_BAR_Y - 0.15, w: 4, h: 0.4,
    fontFace: FBODY, fontSize: 12, bold: true,
    color: brandColor, charSpacing: 4, margin: 0,
    valign: "middle",
  });

  slide.addText(sectionLabel, {
    x: W - MARGIN - 6, y: TOP_BAR_Y - 0.15, w: 6, h: 0.4,
    fontFace: FBODY, fontSize: 12,
    color: labelColor, charSpacing: 4, margin: 0,
    align: "right", valign: "middle",
  });

  // Separator rule between brand and label
  slide.addShape(pres.shapes.LINE, {
    x: MARGIN + 3.6, y: TOP_BAR_Y + 0.05, w: W - 2 * MARGIN - 7.2, h: 0,
    line: { color: ruleColor, width: 0.75 },
  });
}

// Footer: source left, page right
function addFooter(slide, sourceText, pageNum, opts = {}) {
  const dark = !!opts.dark;
  const muted = dark ? C.muteDk : C.mute;

  if (sourceText) {
    slide.addText(sourceText, {
      x: MARGIN, y: FOOT_Y, w: W - 2 * MARGIN - 3, h: 0.4,
      fontFace: FBODY, fontSize: 11,
      color: muted, charSpacing: 3, margin: 0,
      valign: "middle",
    });
  }

  if (pageNum !== null) {
    slide.addText(`${String(pageNum).padStart(2, "0")} / 10`, {
      x: W - MARGIN - 3, y: FOOT_Y, w: 3, h: 0.4,
      fontFace: FBODY, fontSize: 11,
      color: muted, charSpacing: 3, margin: 0,
      align: "right", valign: "middle",
    });
  }
}

// Eyebrow (small gold uppercase label above a section title)
function addEyebrow(slide, text, x, y, w, opts = {}) {
  slide.addText(text, {
    x, y, w, h: 0.5,
    fontFace: FBODY, fontSize: 14, bold: true,
    color: opts.color || C.gold, charSpacing: 6, margin: 0,
    valign: "middle",
  });
}

// =============================================================================
// SLIDE 1 — COVER
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.burgundy };
  addTopBar(s, "TOURISM STRATEGY BRIEF · 2026", { dark: true });

  addEyebrow(s, "A WINE COUNTRY, REINTRODUCED", MARGIN, 1.6, 10);

  // Big title — mixed cream & italic gold
  s.addText(
    [
      { text: "Montenegro — ", options: { color: C.cream, italic: false } },
      { text: "the undiscovered Adriatic vineyard.", options: { color: C.gold, italic: true } },
    ],
    {
      x: MARGIN, y: 2.3, w: 14.5, h: 4.8,
      fontFace: FHEAD, fontSize: 96,
      margin: 0, valign: "top",
    }
  );

  // Body paragraph
  s.addText(
    "2,000 years of winemaking. Two grapes grown almost nowhere else on earth. A 300 km Adriatic coastline two flights from every European capital.",
    {
      x: MARGIN, y: 8.3, w: 11, h: 1.2,
      fontFace: FBODY, fontSize: 18,
      color: C.cream, margin: 0, valign: "top",
    }
  );

  // Prepared-for line
  s.addText("PREPARED FOR THE NATIONAL TOURISM BOARD · PODGORICA", {
    x: MARGIN, y: FOOT_Y, w: 14, h: 0.4,
    fontFace: FBODY, fontSize: 12,
    color: C.muteDk, charSpacing: 4, margin: 0, valign: "middle",
  });

  // "Est. III BC" circle, bottom-right
  s.addShape(pres.shapes.OVAL, {
    x: W - MARGIN - 1.6, y: 9.2, w: 1.4, h: 1.4,
    fill: { color: C.burgundy },
    line: { color: C.cream, width: 0.75 },
  });
  s.addText("Est. III BC", {
    x: W - MARGIN - 1.6, y: 9.2, w: 1.4, h: 1.4,
    fontFace: FHEAD, fontSize: 13, italic: true,
    color: C.cream, align: "center", valign: "middle", margin: 0,
  });
}

// =============================================================================
// SLIDE 2 — HERITAGE IN NUMBERS
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTopBar(s, "02 · HERITAGE IN NUMBERS");

  addEyebrow(s, "THE INDUSTRY AT A GLANCE", MARGIN, 1.5, 10);

  s.addText("Small country. Serious wine.", {
    x: MARGIN, y: 2.1, w: 16, h: 1.2,
    fontFace: FHEAD, fontSize: 56,
    color: C.burgundy, margin: 0, valign: "top",
  });

  s.addText(
    "Montenegro produces ~11 million litres of wine a year from 2,850 hectares — a sector modest in scale but outsized in heritage, quality, and export surplus.",
    {
      x: MARGIN, y: 4.5, w: 12, h: 1.2,
      fontFace: FBODY, fontSize: 15,
      color: C.mute, margin: 0, valign: "top",
    }
  );

  // 4 stat columns
  const stats = [
    {
      num: "2,850", unit: "HA",
      desc: "under vine across coastal and Skadar Lake terroirs.",
      label: "WINE OF MONTENEGRO, 2024",
    },
    {
      num: "113", unit: "",
      desc: "registered wineries, up from just 4 at the time of independence in 2007.",
      label: "REGISTERED PRODUCERS, 2024",
    },
    {
      num: "11", unit: "M L",
      desc: "of wine produced annually, with 6.4 M L exported.",
      label: "ANNUAL PRODUCTION, 2024",
    },
    {
      num: "25.8", unit: "%",
      desc: "of Montenegro's agricultural exports by value — the #1 agri-export.",
      label: "TRADE SURPLUS CATEGORY",
    },
  ];

  const colW = (W - 2 * MARGIN) / 4;
  const baseY = 6.5;

  stats.forEach((st, i) => {
    const x = MARGIN + i * colW;

    // Big number (burgundy)
    s.addText(
      [
        { text: st.num, options: { color: C.burgundy } },
        { text: st.unit ? "  " + st.unit : "", options: { color: C.gold, fontSize: 28 } },
      ],
      {
        x, y: baseY, w: colW - 0.3, h: 1.4,
        fontFace: FHEAD, fontSize: 72,
        margin: 0, valign: "middle",
      }
    );

    // Description
    s.addText(st.desc, {
      x, y: baseY + 1.55, w: colW - 0.3, h: 1.1,
      fontFace: FBODY, fontSize: 14,
      color: C.ink, margin: 0, valign: "top",
    });

    // Label
    s.addText(st.label, {
      x, y: baseY + 2.7, w: colW - 0.3, h: 0.5,
      fontFace: FBODY, fontSize: 11,
      color: C.mute, charSpacing: 4, margin: 0, valign: "top",
    });
  });

  addFooter(s, "SOURCES: WINE OF MONTENEGRO · VINERRA COUNTRY PROFILE", 2);
}

// =============================================================================
// SLIDE 3 — REGIONS & TERROIR
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTopBar(s, "03 · REGIONS & TERROIR");

  addEyebrow(s, "GEOGRAPHY", MARGIN, 1.5, 10);

  s.addText("Two regions, one coast, two climates an hour apart.", {
    x: MARGIN, y: 2.1, w: 17.5, h: 1.2,
    fontFace: FHEAD, fontSize: 52,
    color: C.burgundy, margin: 0, valign: "top",
  });

  // --- Left: stylized map card ---
  const mapX = MARGIN, mapY = 4.3, mapW = 8.4, mapH = 5.6;

  s.addShape(pres.shapes.RECTANGLE, {
    x: mapX, y: mapY, w: mapW, h: mapH,
    fill: { color: C.cream2 },
    line: { color: "D9CEB8", width: 0.5 },
  });

  // Sea (bottom band)
  s.addShape(pres.shapes.RECTANGLE, {
    x: mapX, y: mapY + mapH - 1.8, w: mapW, h: 1.8,
    fill: { color: C.tan, transparency: 40 },
    line: { color: "FFFFFF", width: 0 },
  });

  // Country outline (rough polygon via rounded rectangle)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: mapX + 1.3, y: mapY + 0.9, w: 5.8, h: 3.5,
    fill: { type: "solid", color: C.cream2 },
    line: { color: C.burgundy, width: 1.25 },
    rectRadius: 0.6,
  });

  // Skadar Lake (oval)
  s.addShape(pres.shapes.OVAL, {
    x: mapX + 3.2, y: mapY + 2.7, w: 2.2, h: 1.1,
    fill: { color: C.burgundy, transparency: 70 },
    line: { color: C.burgundy, width: 0.5 },
  });

  // Podgorica dot + ring
  s.addShape(pres.shapes.OVAL, {
    x: mapX + 3.85, y: mapY + 2.55, w: 0.35, h: 0.35,
    fill: { color: C.gold },
    line: { color: C.burgundy, width: 1 },
  });
  s.addText("PODGORICA", {
    x: mapX + 2.7, y: mapY + 2.1, w: 2.8, h: 0.4,
    fontFace: FBODY, fontSize: 13, bold: true,
    color: C.ink, align: "center", charSpacing: 3, margin: 0,
  });

  // Small winery dots
  [
    [mapX + 2.5, mapY + 2.95],
    [mapX + 3.3, mapY + 3.3],
    [mapX + 4.6, mapY + 2.95],
    [mapX + 5.1, mapY + 3.2],
    [mapX + 2.9, mapY + 3.55],
    [mapX + 4.2, mapY + 2.7],
  ].forEach(([dx, dy]) => {
    s.addShape(pres.shapes.OVAL, {
      x: dx, y: dy, w: 0.14, h: 0.14,
      fill: { color: C.burgundy },
      line: { color: C.burgundy, width: 0 },
    });
  });

  // SKADAR label
  s.addText("SKADAR", {
    x: mapX + 4.8, y: mapY + 3.6, w: 2, h: 0.4,
    fontFace: FBODY, fontSize: 12, bold: true,
    color: C.ink, charSpacing: 3, margin: 0,
  });

  // ADRIATIC label
  s.addText("ADRIATIC", {
    x: mapX + 1.4, y: mapY + 4.5, w: 2.2, h: 0.4,
    fontFace: FBODY, fontSize: 13, bold: true,
    color: C.gold, charSpacing: 4, margin: 0,
  });

  // Map caption
  s.addText("SOURCE: VINERRA · DECANTER", {
    x: mapX + 0.3, y: mapY + mapH - 0.5, w: mapW - 0.6, h: 0.35,
    fontFace: FBODY, fontSize: 10,
    color: C.mute, charSpacing: 3, margin: 0,
  });

  // --- Right: two region cards ---
  const rX = mapX + mapW + 0.6;
  const rW = W - MARGIN - rX;

  function regionBlock(y, eyebrow, title, body, climate, grape) {
    // Top rule
    s.addShape(pres.shapes.LINE, {
      x: rX, y, w: rW, h: 0,
      line: { color: "D9CEB8", width: 0.5 },
    });
    s.addText(eyebrow, {
      x: rX, y: y + 0.1, w: rW, h: 0.4,
      fontFace: FBODY, fontSize: 13, bold: true,
      color: C.gold, charSpacing: 5, margin: 0, valign: "middle",
    });
    s.addText(title, {
      x: rX, y: y + 0.5, w: rW, h: 0.8,
      fontFace: FHEAD, fontSize: 32,
      color: C.burgundy, margin: 0, valign: "top",
    });
    s.addText(body, {
      x: rX, y: y + 1.4, w: rW, h: 1.1,
      fontFace: FBODY, fontSize: 14,
      color: C.ink, margin: 0, valign: "top",
    });
    // climate / grape
    s.addText([
      { text: "CLIMATE · ", options: { color: C.mute, charSpacing: 4 } },
      { text: climate, options: { color: C.ink, charSpacing: 4 } },
    ], {
      x: rX, y: y + 2.45, w: rW / 2, h: 0.4,
      fontFace: FBODY, fontSize: 12, bold: true, margin: 0,
    });
    s.addText([
      { text: "GRAPE · ", options: { color: C.mute, charSpacing: 4 } },
      { text: grape, options: { color: C.ink, charSpacing: 4 } },
    ], {
      x: rX + rW / 2, y: y + 2.45, w: rW / 2, h: 0.4,
      fontFace: FBODY, fontSize: 12, bold: true, margin: 0,
    });
  }

  regionBlock(
    4.3, "PRIMORSKA · COASTAL",
    "The Adriatic strip.",
    "Mediterranean climate, limestone karst, sea breeze. Home to Kotor Bay's Savina winery and the Crmnica valley — traditionally a white-wine country.",
    "MED.", "KRSTAČ"
  );
  regionBlock(
    7.2, "SKADAR LAKE · INTERIOR",
    "The warm inland basin.",
    "Hot, humid summers moderated by Europe's largest freshwater lake. Limestone-clay soils, 2,500 hours of sun a year, and Montenegro's engine of red-wine production.",
    "SUB-MED.", "VRANAC"
  );

  addFooter(s, "", 3);
}

// =============================================================================
// SLIDE 4 — INDIGENOUS VARIETIES
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTopBar(s, "04 · INDIGENOUS VARIETIES");

  addEyebrow(s, "THE STORY IN THE GLASS", MARGIN, 1.5, 10);

  s.addText("Grapes you cannot reliably taste anywhere else.", {
    x: MARGIN, y: 2.1, w: 17.5, h: 1.2,
    fontFace: FHEAD, fontSize: 52,
    color: C.burgundy, margin: 0, valign: "top",
  });

  const cards = [
    {
      dark: true, dotColor: C.gold,
      eyebrow: "RED · HERO VARIETY",
      name: "Vranac", tag: "\u201Cthe black stallion\u201D",
      body: "Thick-skinned, deep-coloured, high-tannin red native to Montenegro. Dense, dark-fruited, structured — the centerpiece of every serious tasting in the country.",
      meta: "AGED · BLACKBERRY · MINT · CHERRY",
    },
    {
      dark: false, dotColor: C.tan,
      eyebrow: "WHITE · INDIGENOUS",
      name: "Krstač", tag: "\u201Cthe cross-shape\u201D",
      body: "Montenegro's signature white, named for the cross formed by its bunch. Elegant, mineral-driven, and grown almost exclusively on the Skadar Lake plain.",
      meta: "FRESH · CITRUS · STONE FRUIT",
    },
    {
      dark: false, dotColor: C.wine,
      eyebrow: "RED · HERITAGE",
      name: "Kratošija", tag: "\u201Cthe parent of Zinfandel\u201D",
      body: "DNA-matched ancestor of California Zinfandel, first documented in Budva in the 1400s. Lighter, perfumed, versatile — Montenegro's forgotten export.",
      meta: "DOCUMENTED · 1426 CE · BUDVA",
    },
  ];

  const cardY = 4.3;
  const cardH = 6.0;
  const gap = 0.35;
  const cardW = (W - 2 * MARGIN - 2 * gap) / 3;

  cards.forEach((c, i) => {
    const x = MARGIN + i * (cardW + gap);
    const bg = c.dark ? C.burgundy : C.cream2;
    const txt = c.dark ? C.cream : C.ink;
    const eye = c.dark ? C.muteDk : C.mute;
    const title = c.dark ? C.cream : C.burgundy;
    const tag = c.dark ? C.muteDk : C.mute;
    const rule = c.dark ? "5A3040" : "D9CEB8";

    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: cardW, h: cardH,
      fill: { color: bg },
      line: { color: c.dark ? C.burgundy : "D9CEB8", width: 0.5 },
    });

    // Grape dot
    s.addShape(pres.shapes.OVAL, {
      x: x + 0.5, y: cardY + 0.5, w: 0.8, h: 0.8,
      fill: { color: c.dotColor },
      line: { color: c.dotColor, width: 0 },
    });

    // Eyebrow
    s.addText(c.eyebrow, {
      x: x + 0.5, y: cardY + 1.75, w: cardW - 1, h: 0.4,
      fontFace: FBODY, fontSize: 12, bold: true,
      color: eye, charSpacing: 5, margin: 0, valign: "middle",
    });

    // Name
    s.addText(c.name, {
      x: x + 0.5, y: cardY + 2.15, w: cardW - 1, h: 0.9,
      fontFace: FHEAD, fontSize: 40,
      color: title, margin: 0, valign: "top",
    });

    // Tagline
    s.addText(c.tag, {
      x: x + 0.5, y: cardY + 3.05, w: cardW - 1, h: 0.45,
      fontFace: FHEAD, fontSize: 16, italic: true,
      color: tag, margin: 0, valign: "top",
    });

    // Body
    s.addText(c.body, {
      x: x + 0.5, y: cardY + 3.7, w: cardW - 1, h: 1.6,
      fontFace: FBODY, fontSize: 14,
      color: txt, margin: 0, valign: "top",
    });

    // Divider rule
    s.addShape(pres.shapes.LINE, {
      x: x + 0.5, y: cardY + 5.2, w: cardW - 1, h: 0,
      line: { color: rule, width: 0.5 },
    });

    // Meta
    s.addText(c.meta, {
      x: x + 0.5, y: cardY + 5.35, w: cardW - 1, h: 0.4,
      fontFace: FBODY, fontSize: 11,
      color: eye, charSpacing: 4, margin: 0, valign: "middle",
    });
  });

  addFooter(s, "SOURCES: WINE OF MONTENEGRO · WIKIPEDIA · DECANTER", 4);
}

// =============================================================================
// SLIDE 5 — THE ANCHOR PRODUCER
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTopBar(s, "05 · THE ANCHOR PRODUCER");

  addEyebrow(s, "THE ANCHOR", MARGIN, 1.5, 10);

  s.addText("Plantaže — the largest single vineyard in Europe.", {
    x: MARGIN, y: 2.1, w: 17.5, h: 1.2,
    fontFace: FHEAD, fontSize: 48,
    color: C.burgundy, margin: 0, valign: "top",
  });

  // Left side: huge stat + body
  s.addText(
    [
      { text: "2,310", options: { color: C.burgundy } },
      { text: "  HA", options: { color: C.gold, fontSize: 36 } },
    ],
    {
      x: MARGIN, y: 4.3, w: 8, h: 2,
      fontFace: FHEAD, fontSize: 120,
      margin: 0, valign: "middle",
    }
  );

  s.addText(
    "One unbroken vineyard on the Ćemovsko polje plain — larger than the city of Podgorica that borders it.",
    {
      x: MARGIN, y: 6.5, w: 7.5, h: 1.3,
      fontFace: FHEAD, fontSize: 18, italic: true,
      color: C.ink, margin: 0, valign: "top",
    }
  );

  s.addText(
    "State-founded in 1963, Plantaže accounts for roughly 90% of Montenegro's wine output. Two-thirds of its 11.5 million vines are Vranac — the single most important piece of the national wine story, and the tourism brand ready to export.",
    {
      x: MARGIN, y: 7.9, w: 7.5, h: 2.2,
      fontFace: FBODY, fontSize: 15,
      color: C.ink, margin: 0, valign: "top",
    }
  );

  // Right side: label/value rows
  const tX = MARGIN + 9.3;
  const tW = W - MARGIN - tX;
  const rows = [
    ["VINES", "11.5 million, two-thirds Vranac"],
    ["OUTPUT", "17 million bottles annually"],
    ["REACH", "Distributed to 40+ countries worldwide"],
    ["AWARDS", "800+ international wine competition medals"],
    ["ŠIPČANIK", "Underground cellar in a former Yugoslav Air Force hangar"],
    ["VARIETIES", "28 cultivated — indigenous & international"],
  ];
  const rowStart = 4.3;
  const rowH = 0.95;

  // Top rule
  s.addShape(pres.shapes.LINE, {
    x: tX, y: rowStart, w: tW, h: 0,
    line: { color: "D9CEB8", width: 0.5 },
  });

  rows.forEach((r, i) => {
    const y = rowStart + i * rowH;
    s.addText(r[0], {
      x: tX, y: y + 0.15, w: 2.4, h: rowH - 0.2,
      fontFace: FBODY, fontSize: 13, bold: true,
      color: C.gold, charSpacing: 5, margin: 0, valign: "middle",
    });
    s.addText(r[1], {
      x: tX + 2.6, y: y + 0.15, w: tW - 2.6, h: rowH - 0.2,
      fontFace: FBODY, fontSize: 15,
      color: C.ink, margin: 0, valign: "middle",
    });
    // bottom rule
    s.addShape(pres.shapes.LINE, {
      x: tX, y: y + rowH, w: tW, h: 0,
      line: { color: "D9CEB8", width: 0.5 },
    });
  });

  addFooter(s, "SOURCES: PLANTAŽE · WIKIPEDIA · DECANTER · WINETOURISM.COM", 5);
}

// =============================================================================
// SLIDE 6 — THE BOUTIQUE RENAISSANCE
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTopBar(s, "06 · THE BOUTIQUE RENAISSANCE");

  addEyebrow(s, "A NEW GENERATION", MARGIN, 1.5, 10);

  s.addText("From 4 wineries to 113 in under two decades.", {
    x: MARGIN, y: 2.1, w: 17.5, h: 1.2,
    fontFace: FHEAD, fontSize: 48,
    color: C.burgundy, margin: 0, valign: "top",
  });

  // ---- Left: column chart (native) ----
  s.addText("REGISTERED WINERIES · 2007 → 2024", {
    x: MARGIN, y: 4.2, w: 8.5, h: 0.4,
    fontFace: FBODY, fontSize: 12, bold: true,
    color: C.mute, charSpacing: 5, margin: 0,
  });

  const years = ["2007", "2010", "2014", "2018", "2021", "2024"];
  const counts = [4, 14, 28, 48, 76, 113];

  // Make final bar stand out: use combo with two series trick — simpler: single series, set chartColors sequentially
  s.addChart(
    pres.charts.BAR,
    [{ name: "Wineries", labels: years, values: counts }],
    {
      x: MARGIN, y: 4.7, w: 8.5, h: 5.3,
      barDir: "col",
      chartColors: [C.burgundy, C.burgundy, C.burgundy, C.burgundy, C.burgundy, C.gold],
      chartColorsOpacity: 100,
      chartArea: { fill: { color: C.cream } },
      plotArea: { fill: { color: C.cream } },
      showLegend: false,
      showValue: true,
      dataLabelPosition: "outEnd",
      dataLabelColor: C.ink,
      dataLabelFontSize: 16,
      dataLabelFontFace: FHEAD,
      catAxisLabelColor: C.mute,
      catAxisLabelFontSize: 12,
      catAxisLabelFontFace: FBODY,
      valAxisHidden: true,
      valGridLine: { style: "none" },
      catGridLine: { style: "none" },
      barGapWidthPct: 60,
    }
  );

  s.addText(
    "SOURCE: WINE OF MONTENEGRO — INTERPOLATED BETWEEN 2007 & 2024 BENCHMARKS",
    {
      x: MARGIN, y: 10.05, w: 8.5, h: 0.4,
      fontFace: FBODY, fontSize: 10,
      color: C.mute, charSpacing: 3, margin: 0,
    }
  );

  // ---- Right: paragraph + boutique roster ----
  const rX = MARGIN + 9.2;
  const rW = W - MARGIN - rX;

  s.addText(
    "A 2007 Wine Law and EU wine protocol triggered a boutique boom: family estates in the karst, tasting rooms carved into rock, and a new cohort of single-varietal producers.",
    {
      x: rX, y: 4.2, w: rW, h: 1.8,
      fontFace: FBODY, fontSize: 16,
      color: C.ink, margin: 0, valign: "top",
    }
  );

  const roster = [
    ["Zenta Vučinić", "CRMNICA · 2,500 BOTTLES/YR"],
    ["Savina", "HERCEG NOVI · DWWA SILVER '23"],
    ["Keković Estate", "WINE & OLIVE OIL"],
    ["Monte Grande", "BY APPOINTMENT"],
  ];
  const rowY0 = 6.3;
  const rowStep = 0.95;

  s.addShape(pres.shapes.LINE, {
    x: rX, y: rowY0, w: rW, h: 0,
    line: { color: "D9CEB8", width: 0.5 },
  });

  roster.forEach((r, i) => {
    const y = rowY0 + i * rowStep;
    s.addText(r[0], {
      x: rX, y: y + 0.15, w: rW * 0.5, h: rowStep - 0.2,
      fontFace: FHEAD, fontSize: 22,
      color: C.burgundy, margin: 0, valign: "middle",
    });
    s.addText(r[1], {
      x: rX + rW * 0.5, y: y + 0.15, w: rW * 0.5, h: rowStep - 0.2,
      fontFace: FBODY, fontSize: 12, bold: true,
      color: C.mute, charSpacing: 4, margin: 0, valign: "middle", align: "right",
    });
    s.addShape(pres.shapes.LINE, {
      x: rX, y: y + rowStep, w: rW, h: 0,
      line: { color: "D9CEB8", width: 0.5 },
    });
  });

  addFooter(s, "SOURCES: WINE OF MONTENEGRO", 6);
}

// =============================================================================
// SLIDE 7 — WINE ROUTES
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTopBar(s, "07 · WINE ROUTES");

  addEyebrow(s, "TWO OFFICIAL ITINERARIES", MARGIN, 1.5, 10);

  s.addText("The Crmnica & Ancient Dolcea routes.", {
    x: MARGIN, y: 2.1, w: 17.5, h: 1.2,
    fontFace: FHEAD, fontSize: 48,
    color: C.burgundy, margin: 0, valign: "top",
  });

  function routeCard(x, y, w, h, roman, title, body, stops) {
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h,
      fill: { color: C.cream2 },
      line: { color: "D9CEB8", width: 0.5 },
    });
    // Roman numeral
    s.addText(roman, {
      x: x + 0.55, y: y + 0.4, w: 2, h: 0.9,
      fontFace: FHEAD, fontSize: 40,
      color: C.gold, margin: 0, valign: "top",
    });
    // Title
    s.addText(title, {
      x: x + 0.55, y: y + 1.3, w: w - 1, h: 0.8,
      fontFace: FHEAD, fontSize: 32,
      color: C.burgundy, margin: 0, valign: "top",
    });
    // Body
    s.addText(body, {
      x: x + 0.55, y: y + 2.15, w: w - 1, h: 1.3,
      fontFace: FBODY, fontSize: 14,
      color: C.ink, margin: 0, valign: "top",
    });
    // Divider
    s.addShape(pres.shapes.LINE, {
      x: x + 0.55, y: y + 3.4, w: w - 1, h: 0,
      line: { color: "D9CEB8", width: 0.5 },
    });
    // Stops
    const stopY0 = y + 3.55;
    const stopH = 0.55;
    stops.forEach((st, i) => {
      const sy = stopY0 + i * stopH;
      // Bullet
      s.addShape(pres.shapes.OVAL, {
        x: x + 0.6, y: sy + 0.18, w: 0.15, h: 0.15,
        fill: { color: C.burgundy },
        line: { color: C.burgundy, width: 0 },
      });
      s.addText(st[0], {
        x: x + 0.95, y: sy, w: (w - 1.4) * 0.55, h: stopH,
        fontFace: FHEAD, fontSize: 18,
        color: C.ink, margin: 0, valign: "middle",
      });
      s.addText(st[1], {
        x: x + 0.95 + (w - 1.4) * 0.55, y: sy, w: (w - 1.4) * 0.45, h: stopH,
        fontFace: FBODY, fontSize: 12, bold: true,
        color: C.mute, charSpacing: 4, margin: 0, valign: "middle", align: "right",
      });
      // row line
      s.addShape(pres.shapes.LINE, {
        x: x + 0.55, y: sy + stopH, w: w - 1, h: 0,
        line: { color: "E5D9C2", width: 0.5 },
      });
    });
  }

  const cardW = (W - 2 * MARGIN - 0.6) / 2;
  const cardY = 4.1;
  const cardH = 6.3;

  routeCard(
    MARGIN, cardY, cardW, cardH,
    "I.", "Crmnica Wine Route",
    "The historic red-wine valley south of Lake Skadar — medieval churches, stone villages, and the traditional home of Vranac.",
    [
      ["Virpazar", "START · 0 KM"],
      ["Godinje", "+ 8 KM"],
      ["Limljani", "+ 14 KM"],
      ["Sotonići", "+ 19 KM"],
      ["Ostros", "END · + 28 KM"],
    ]
  );

  routeCard(
    MARGIN + cardW + 0.6, cardY, cardW, cardH,
    "II.", "Ancient Dolcea Route",
    "The coastal spine — from Kotor Bay's hillside vineyards south through Budva's wine archaeology to Ulcinj's Albanian-Adriatic frontier.",
    [
      ["Herceg Novi · Savina", "START · 0 KM"],
      ["Kotor Bay", "+ 22 KM"],
      ["Budva · Necropolis", "+ 58 KM"],
      ["Bar", "+ 94 KM"],
      ["Ulcinj", "END · + 128 KM"],
    ]
  );

  addFooter(s, "SOURCES: WINETOURISM.COM · DECANTER", 7);
}

// =============================================================================
// SLIDE 8 — EXPORT FOOTPRINT
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTopBar(s, "08 · EXPORT FOOTPRINT");

  addEyebrow(s, "MARKET PRESENCE", MARGIN, 1.5, 10);

  s.addText("Already on shelves in 40+ countries.", {
    x: MARGIN, y: 2.1, w: 17.5, h: 1.2,
    fontFace: FHEAD, fontSize: 48,
    color: C.burgundy, margin: 0, valign: "top",
  });

  // Left: export bars
  s.addText("TOP EXPORT MARKETS · RELATIVE SHARE OF MONTENEGRIN WINE EXPORTS", {
    x: MARGIN, y: 4, w: 11.5, h: 0.7,
    fontFace: FBODY, fontSize: 12, bold: true,
    color: C.mute, charSpacing: 4, margin: 0, valign: "top",
  });

  // Top rule
  s.addShape(pres.shapes.LINE, {
    x: MARGIN, y: 4.8, w: 11.5, h: 0,
    line: { color: "D9CEB8", width: 0.5 },
  });

  const markets = [
    ["Serbia",        1.00, "Anchor"],
    ["Croatia",       0.65, "Strong"],
    ["Germany",       0.42, "Growing"],
    ["Switzerland",   0.30, "Premium"],
    ["United States", 0.25, "Emerging"],
    ["Russia & CIS",  0.22, "Legacy"],
  ];

  const mY0 = 4.95;
  const mH  = 0.85;
  const nameW = 2.4;
  const trackX = MARGIN + nameW + 0.3;
  const trackW = 7.5;
  const badgeX = trackX + trackW + 0.2;

  markets.forEach((m, i) => {
    const y = mY0 + i * mH;
    // Name
    s.addText(m[0], {
      x: MARGIN, y: y + 0.05, w: nameW, h: mH - 0.1,
      fontFace: FHEAD, fontSize: 20,
      color: C.burgundy, margin: 0, valign: "middle",
    });
    // Track
    s.addShape(pres.shapes.RECTANGLE, {
      x: trackX, y: y + mH / 2 - 0.04, w: trackW, h: 0.08,
      fill: { color: C.track },
      line: { color: C.track, width: 0 },
    });
    // Filled bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: trackX, y: y + mH / 2 - 0.06, w: trackW * m[1], h: 0.12,
      fill: { color: C.burgundy },
      line: { color: C.burgundy, width: 0 },
    });
    // Badge
    s.addText(m[2], {
      x: badgeX, y: y + 0.05, w: 1.4, h: mH - 0.1,
      fontFace: FBODY, fontSize: 13, italic: true,
      color: C.gold, margin: 0, valign: "middle",
    });
    // row line
    s.addShape(pres.shapes.LINE, {
      x: MARGIN, y: y + mH, w: 11.5, h: 0,
      line: { color: "E5D9C2", width: 0.5 },
    });
  });

  // Right: big stat + paragraph
  const rX = MARGIN + 12.3;
  const rW = W - MARGIN - rX;

  s.addText(
    [
      { text: "6.4", options: { color: C.burgundy } },
      { text: "  M L", options: { color: C.gold, fontSize: 32 } },
    ],
    {
      x: rX, y: 4, w: rW, h: 1.8,
      fontFace: FHEAD, fontSize: 90, margin: 0, valign: "middle",
    }
  );

  s.addText(
    "litres exported in 2024 — roughly 58% of everything produced.",
    {
      x: rX, y: 6, w: rW, h: 1,
      fontFace: FHEAD, fontSize: 16, italic: true,
      color: C.ink, margin: 0, valign: "top",
    }
  );

  s.addText(
    [
      { text: "Wine exports are ", options: { color: C.ink } },
      { text: "worth nearly double", options: { color: C.ink, bold: true } },
      { text: " what Montenegro imports — a rare agri-category where the country runs a structural trade surplus.", options: { color: C.ink } },
    ],
    {
      x: rX, y: 7.2, w: rW, h: 2.5,
      fontFace: FBODY, fontSize: 15, margin: 0, valign: "top",
    }
  );

  addFooter(s, "SOURCES: WINE OF MONTENEGRO · VINERRA COUNTRY PROFILE", 8);
}

// =============================================================================
// SLIDE 9 — THE TOURISM OPPORTUNITY
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTopBar(s, "09 · THE TOURISM OPPORTUNITY");

  addEyebrow(s, "WHERE THE VALUE IS UNLOCKED", MARGIN, 1.5, 10);

  s.addText("Three levers turn coastal tourists into wine tourists.", {
    x: MARGIN, y: 2.1, w: 17.5, h: 1.2,
    fontFace: FHEAD, fontSize: 48,
    color: C.burgundy, margin: 0, valign: "top",
  });

  const levers = [
    {
      eyebrow: "LEVER 01 · SEASON",
      title: "Extend shoulders to May & October.",
      body: "Wine tourism peaks when beach tourism cannot. Harvest in September, early-spring cellar visits, and temperate vineyard weather move visitors out of the crowded Jul–Aug window.",
      meta: "Target · + 2 weeks average stay",
    },
    {
      eyebrow: "LEVER 02 · SPEND",
      title: "Upgrade the coastal day-trip.",
      body: "A Plantaže cellar visit currently runs €20–30 per guest. Premiumise with food pairings, Šipčanik tunnel dinners, and overnight agrotourism stays that capture hotel-grade margins.",
      meta: "Benchmark · €75–150 per cover",
    },
    {
      eyebrow: "LEVER 03 · STORY",
      title: "Own the indigenous grape narrative.",
      body: "Vranac and Krstač are not grown seriously anywhere else. That is Montenegro's single most defensible wine-tourism claim — and the anchor of a national brand that competes with Istria and Slovenia on authenticity, not scale.",
      meta: "Claim · Only home of Vranac",
    },
  ];

  const cY = 4.3;
  const cH = 5.7;
  const gap = 0.35;
  const cW = (W - 2 * MARGIN - 2 * gap) / 3;

  levers.forEach((lv, i) => {
    const x = MARGIN + i * (cW + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cY, w: cW, h: cH,
      fill: { color: C.cream2 },
      line: { color: "D9CEB8", width: 0.5 },
    });
    s.addText(lv.eyebrow, {
      x: x + 0.55, y: cY + 0.55, w: cW - 1.1, h: 0.4,
      fontFace: FBODY, fontSize: 13, bold: true,
      color: C.gold, charSpacing: 5, margin: 0, valign: "middle",
    });
    s.addText(lv.title, {
      x: x + 0.55, y: cY + 1.05, w: cW - 1.1, h: 1.5,
      fontFace: FHEAD, fontSize: 28,
      color: C.burgundy, margin: 0, valign: "top",
    });
    s.addText(lv.body, {
      x: x + 0.55, y: cY + 2.7, w: cW - 1.1, h: 2,
      fontFace: FBODY, fontSize: 14,
      color: C.ink, margin: 0, valign: "top",
    });
    s.addShape(pres.shapes.LINE, {
      x: x + 0.55, y: cY + cH - 0.9, w: cW - 1.1, h: 0,
      line: { color: "D9CEB8", width: 0.5 },
    });
    s.addText(lv.meta, {
      x: x + 0.55, y: cY + cH - 0.75, w: cW - 1.1, h: 0.5,
      fontFace: FHEAD, fontSize: 14, italic: true,
      color: C.mute, margin: 0, valign: "middle",
    });
  });

  addFooter(s, "STRATEGY FRAMING · TOURISM BOARD WORKING BRIEF", 9);
}

// =============================================================================
// SLIDE 10 — NEXT STEPS
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.burgundy };
  addTopBar(s, "10 · NEXT STEPS", { dark: true });

  addEyebrow(s, "THE ASK", MARGIN, 1.5, 10, { color: C.gold });

  s.addText(
    [
      { text: "From ", options: { color: C.cream } },
      { text: "undiscovered", options: { color: C.gold, italic: true } },
      { text: " to indispensable.", options: { color: C.cream } },
    ],
    {
      x: MARGIN, y: 2.1, w: 17.5, h: 2.8,
      fontFace: FHEAD, fontSize: 96,
      margin: 0, valign: "top",
    }
  );

  s.addText(
    "A three-pillar national wine-tourism program, stood up over the next 18 months.",
    {
      x: MARGIN, y: 6.8, w: 15, h: 0.8,
      fontFace: FBODY, fontSize: 18,
      color: C.cream, margin: 0, valign: "top",
    }
  );

  const pillars = [
    { num: "01 —", title: "Certify the routes.", body: "Sign the Crmnica and Dolcea routes end-to-end with consistent wayfinding; publish an official digital passport." },
    { num: "02 —", title: "Fund the boutique layer.", body: "Co-invested grants for the 100+ small wineries to upgrade tasting rooms, reservations, and agrotourism beds." },
    { num: "03 —", title: "Export the story.", body: "Lead with Vranac and Krstač at DWWA, Prowein, and Vinitaly — turn the indigenous grape claim into an international press cycle." },
  ];

  const pY = 7.9;
  const gap = 0.4;
  const pW = (W - 2 * MARGIN - 2 * gap) / 3;

  pillars.forEach((p, i) => {
    const x = MARGIN + i * (pW + gap);
    // Top rule
    s.addShape(pres.shapes.LINE, {
      x, y: pY, w: pW, h: 0,
      line: { color: "5A3040", width: 0.75 },
    });
    s.addText(p.num, {
      x, y: pY + 0.15, w: pW, h: 0.6,
      fontFace: FHEAD, fontSize: 22, italic: true,
      color: C.gold, margin: 0, valign: "middle",
    });
    s.addText(p.title, {
      x, y: pY + 0.85, w: pW, h: 0.6,
      fontFace: FHEAD, fontSize: 22,
      color: C.cream, margin: 0, valign: "middle",
    });
    s.addText(p.body, {
      x, y: pY + 1.55, w: pW, h: 1.6,
      fontFace: FBODY, fontSize: 14,
      color: C.cream, margin: 0, valign: "top",
    });
  });

  addFooter(s, "PREPARED FOR THE NATIONAL TOURISM BOARD", 10, { dark: true });
}

// =============================================================================
pres.writeFile({ fileName: "Montenegro_Wine_Market.pptx" })
  .then((name) => console.log("Wrote:", name));
