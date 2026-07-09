// battery_paintball.js
// Recreates Battery_Paintball.pptx using pptxgenjs.
// Run: node battery_paintball.js
// Requires: npm install -g pptxgenjs (or add locally)

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();

// ---------- Layout ----------
// Original deck is 20" x 11.25" (16:9 widescreen, oversized).
pres.defineLayout({ name: "BATTERY_WIDE", width: 20, height: 11.25 });
pres.layout = "BATTERY_WIDE";
pres.title = "Battery Paintball";
pres.author = "Battery";

const SW = 20;      // slide width
const SH = 11.25;   // slide height

// ---------- Palette ----------
const BG      = "0F0F0F"; // near-black background
const YELLOW  = "F5C518"; // Battery yellow
const CREAM   = "EDE7D8"; // off-white body text
const DIM     = "9A9A9A"; // muted gray
const MUTED   = "6B6B6B"; // darker muted (faded "MANHATTAN")
const LINE    = "3A3A3A"; // thin divider line
const ORANGE  = "E2661E"; // ARENA 02 tag

// Fonts
const HEAD = "Arial Black";
const BODY = "Arial";

// ---------- Small helpers ----------
function addHeaderBar(slide, fileNum, rightLabel, topLabel) {
  // Top-left: "▸  FILE xx / 10" and (optional) secondary line below
  slide.addText("▸", {
    x: 0.6, y: 0.45, w: 0.3, h: 0.35,
    fontFace: BODY, fontSize: 12, color: YELLOW, bold: true, valign: "middle",
  });
  slide.addText(`FILE ${fileNum} / 10`, {
    x: 0.95, y: 0.4, w: 3.5, h: 0.4,
    fontFace: BODY, fontSize: 13, color: DIM, charSpacing: 4, valign: "middle", margin: 0,
  });
  if (topLabel) {
    slide.addText(topLabel, {
      x: 0.95, y: 0.75, w: 4, h: 0.4,
      fontFace: BODY, fontSize: 13, color: YELLOW, charSpacing: 4, valign: "middle", margin: 0,
    });
  }
  // Top-right label
  slide.addText(rightLabel, {
    x: SW - 5.5, y: 0.4, w: 5, h: 0.4,
    fontFace: BODY, fontSize: 13, color: DIM, charSpacing: 4,
    align: "right", valign: "middle", margin: 0,
  });
}

function addFooter(slide, left, right) {
  if (left) {
    slide.addText(left, {
      x: 0.6, y: SH - 0.7, w: 5, h: 0.4,
      fontFace: BODY, fontSize: 12, color: DIM, charSpacing: 4,
      align: "left", valign: "middle", margin: 0,
    });
  }
  if (right) {
    slide.addText(right, {
      x: SW - 6.1, y: SH - 0.7, w: 5.5, h: 0.4,
      fontFace: BODY, fontSize: 12, color: DIM, charSpacing: 4,
      align: "right", valign: "middle", margin: 0,
    });
  }
}

// =============================================================
// SLIDE 1 — Title
// =============================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };

  // Top yellow band
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: SW, h: 0.45, fill: { color: YELLOW }, line: { color: YELLOW },
  });
  // Bottom yellow band
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: SH - 0.45, w: SW, h: 0.45, fill: { color: YELLOW }, line: { color: YELLOW },
  });

  // Top-left circle + FILE 01 / 10
  s.addShape(pres.shapes.OVAL, {
    x: 0.85, y: 1.0, w: 0.4, h: 0.4,
    fill: { type: "solid", color: BG }, line: { color: YELLOW, width: 1.25 },
  });
  s.addText("FILE 01 / 10", {
    x: 1.45, y: 1.0, w: 3, h: 0.4,
    fontFace: BODY, fontSize: 14, color: YELLOW, charSpacing: 5, valign: "middle", margin: 0,
  });

  // Top-right tag
  s.addText("BATTERY // CHELSEA // 2026", {
    x: SW - 6.6, y: 1.0, w: 6, h: 0.4,
    fontFace: BODY, fontSize: 14, color: YELLOW, charSpacing: 5,
    align: "right", valign: "middle", margin: 0,
  });

  // Massive BATTERY wordmark — split into 3 runs so the T is yellow.
  s.addText(
    [
      { text: "BAT",    options: { color: CREAM  } },
      { text: "T",      options: { color: YELLOW } },
      { text: "ERY.",   options: { color: CREAM  } },
    ],
    {
      x: 0.8, y: 3.0, w: SW - 1.6, h: 3.8,
      fontFace: HEAD, fontSize: 240, bold: true,
      align: "left", valign: "middle", margin: 0, charSpacing: -6,
      wrap: false,
    }
  );

  // Tagline bottom-left
  s.addText(
    [
      { text: "Manhattan's first and only ", options: { color: CREAM } },
      { text: "paintball arena.",            options: { color: YELLOW } },
    ],
    {
      x: 0.85, y: SH - 1.6, w: 10, h: 0.6,
      fontFace: BODY, fontSize: 22, align: "left", valign: "middle", margin: 0,
    }
  );

  // Bottom-right credit block (three stacked lines)
  s.addText(
    [
      { text: "CHAMBER OF COMMERCE", options: { breakLine: true } },
      { text: "INVESTOR PREVIEW APR", options: { breakLine: true } },
      { text: "2026" },
    ],
    {
      x: SW - 5.5, y: SH - 2.6, w: 4.7, h: 1.5,
      fontFace: BODY, fontSize: 13, color: DIM, charSpacing: 4,
      align: "right", valign: "middle", margin: 0, paraSpaceAfter: 2,
    }
  );
}

// =============================================================
// SLIDE 2 — THE PROBLEM
// =============================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };

  addHeaderBar(s, "02", "THE GAP", "THE PROBLEM");

  // Headline — 3 lines, middle line is muted ("MANHATTAN"), rest split CREAM/YELLOW.
  // Line 1: PAINTBALL IN (cream)
  s.addText("PAINTBALL IN", {
    x: 0.6, y: 1.5, w: SW - 1.2, h: 1.8,
    fontFace: HEAD, fontSize: 125, bold: true, color: CREAM,
    align: "left", valign: "top", margin: 0, charSpacing: -4, wrap: false,
  });
  // Line 2: MANHATTAN (muted) + DIDN'T (yellow) — use one text box with two runs
  s.addText(
    [
      { text: "MANHATTAN ", options: { color: MUTED  } },
      { text: "DIDN'T",     options: { color: YELLOW } },
    ],
    {
      x: 0.6, y: 3.2, w: SW - 1.2, h: 1.9,
      fontFace: HEAD, fontSize: 125, bold: true,
      align: "left", valign: "top", margin: 0, charSpacing: -4, wrap: false,
    }
  );
  // Line 3: EXIST.
  s.addText("EXIST.", {
    x: 0.6, y: 4.9, w: SW - 1.2, h: 1.9,
    fontFace: HEAD, fontSize: 125, bold: true, color: YELLOW,
    align: "left", valign: "top", margin: 0, charSpacing: -4, wrap: false,
  });

  // Divider line above the three stats
  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: 8.25, w: SW - 1.2, h: 0,
    line: { color: LINE, width: 0.75 },
  });

  // Three stat blocks
  const statY = 8.5;
  const stats = [
    { num: "0",      label: "PAINTBALL ARENAS IN MANHATTAN TODAY" },
    { num: "90 min", label: "NEAREST FIELD — IN NEW JERSEY" },
    { num: "1.6M",   label: "MANHATTAN RESIDENTS WITHIN 4 SUBWAY STOPS" },
  ];
  const colW = (SW - 1.2) / 3;
  stats.forEach((st, i) => {
    const x = 0.6 + i * colW;
    s.addText(st.num, {
      x, y: statY, w: colW - 0.3, h: 0.9,
      fontFace: HEAD, fontSize: 52, bold: true, color: YELLOW,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(st.label, {
      x, y: statY + 0.95, w: colW - 0.3, h: 0.9,
      fontFace: BODY, fontSize: 13, color: DIM, charSpacing: 3,
      align: "left", valign: "top", margin: 0,
    });
  });

  // Footer
  addFooter(s, "BATTERY", "THE GAP IN THE MARKET");
}

// =============================================================
// SLIDE 3 — THE VENUE
// =============================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };

  // Vertical yellow divider line at ~55% width
  const vx = 10.8;
  s.addShape(pres.shapes.LINE, {
    x: vx, y: 0.6, w: 0, h: SH - 1.2,
    line: { color: YELLOW, width: 1.25 },
  });

  // Left column: eyebrow + big headline
  s.addText("THE VENUE", {
    x: 0.9, y: 1.2, w: 8, h: 0.5,
    fontFace: BODY, fontSize: 16, color: YELLOW, charSpacing: 5, valign: "middle", margin: 0,
  });
  s.addText(
    [
      { text: "28,000 SQ FT IN",  options: { color: CREAM, breakLine: true } },
      { text: "CHELSEA.",          options: { color: YELLOW } },
    ],
    {
      x: 0.9, y: 1.8, w: 9.5, h: 2.6,
      fontFace: HEAD, fontSize: 74, bold: true,
      align: "left", valign: "top", margin: 0, charSpacing: -2,
    }
  );

  // Body copy (two paragraphs)
  s.addText(
    [
      {
        text: "A raw industrial shell one block from the High Line — steel columns, 22-foot ceilings, a loading dock wide enough for teams to roll in helmets-on.",
        options: { breakLine: true },
      },
      { text: " ", options: { breakLine: true } },
      {
        text: "Built from concrete up for one thing: getting ten thousand New Yorkers a year into gear and onto a field.",
      },
    ],
    {
      x: 0.9, y: 4.6, w: 8.8, h: 2.6,
      fontFace: BODY, fontSize: 17, color: CREAM,
      align: "left", valign: "top", margin: 0, paraSpaceAfter: 6,
    }
  );

  // 2x2 stat grid bottom-left
  const grid = [
    { num: "28,000", label: "SQUARE FEET" },
    { num: "22 ft",  label: "CEILING CLEARANCE" },
    { num: "2",      label: "DEDICATED ARENAS" },
    { num: "150",    label: "PLAYER CAPACITY" },
  ];
  const gx = 0.9, gy = 7.6, gw = 4.3, gh = 1.4;
  grid.forEach((g, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = gx + col * gw;
    const y = gy + row * gh;
    // short yellow rule above each stat
    s.addShape(pres.shapes.LINE, {
      x, y: y - 0.05, w: gw - 0.3, h: 0,
      line: { color: YELLOW, width: 0.75 },
    });
    s.addText(g.num, {
      x, y: y + 0.05, w: gw - 0.3, h: 0.7,
      fontFace: HEAD, fontSize: 32, bold: true, color: CREAM,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(g.label, {
      x, y: y + 0.75, w: gw - 0.3, h: 0.5,
      fontFace: BODY, fontSize: 12, color: DIM, charSpacing: 4,
      align: "left", valign: "top", margin: 0,
    });
  });

  // Right column caption (bottom)
  s.addText("INTERIOR — MAIN HANGAR, LOOKING NORTH", {
    x: vx + 0.4, y: SH - 1.1, w: SW - vx - 1, h: 0.4,
    fontFace: BODY, fontSize: 14, color: YELLOW, charSpacing: 5,
    align: "right", valign: "middle", margin: 0,
  });
}

// =============================================================
// SLIDE 4 — THE FIELDS (two arenas)
// =============================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };

  addHeaderBar(s, "04", "THE FIELDS", null);

  // Eyebrow + headline (left)
  s.addText("TWO ARENAS", {
    x: 0.6, y: 1.3, w: 8, h: 0.45,
    fontFace: BODY, fontSize: 16, color: YELLOW, charSpacing: 5, valign: "middle", margin: 0,
  });
  s.addText(
    [
      { text: "PICK YOUR ",  options: { color: CREAM  } },
      { text: "FIELD.",      options: { color: YELLOW } },
    ],
    {
      x: 0.6, y: 1.8, w: 13, h: 1.7,
      fontFace: HEAD, fontSize: 90, bold: true,
      align: "left", valign: "top", margin: 0, charSpacing: -2,
    }
  );

  // Big "02" top-right
  s.addText("02", {
    x: SW - 3.5, y: 0.9, w: 3, h: 2.5,
    fontFace: HEAD, fontSize: 140, bold: true, color: YELLOW,
    align: "right", valign: "top", margin: 0,
  });

  // Two arena cards
  const cardY = 4.1, cardH = 6.4;
  const cardW = (SW - 0.6 * 2 - 0.4) / 2; // ~9.3"
  const cards = [
    {
      x: 0.6, tag: "ARENA 01", tagColor: YELLOW,
      sub: "URBAN — RUINED STOREFRONTS & STAIRWELLS",
      title: "THE BLOCK",
      body: "A two-story urban ruin: brick facades, fire escapes, blown-out storefronts, and sightlines that turn every corner into a reset. Built for close-quarters firefights.",
      stats: "10,000 SQ FT    2 LEVELS    24 PLAYERS",
    },
    {
      x: 0.6 + cardW + 0.4, tag: "ARENA 02", tagColor: ORANGE,
      sub: "MILITARY — BUNKERS, NETTING & OPEN GROUND",
      title: "THE YARD",
      body: "A military-inspired open field: sandbag bunkers, camo netting, raised platforms, and long lanes for flanking. Built for objective play and larger squads.",
      stats: "14,000 SQ FT    1 LEVEL    40 PLAYERS",
    },
  ];

  cards.forEach((c) => {
    // Outline card
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: cardY, w: cardW, h: cardH,
      fill: { color: BG }, line: { color: LINE, width: 0.75 },
    });
    // Colored tag pill
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x + 0.4, y: cardY + 0.4, w: 1.7, h: 0.55,
      fill: { color: c.tagColor }, line: { color: c.tagColor },
    });
    s.addText(c.tag, {
      x: c.x + 0.4, y: cardY + 0.4, w: 1.7, h: 0.55,
      fontFace: BODY, fontSize: 13, bold: true, color: BG, charSpacing: 4,
      align: "center", valign: "middle", margin: 0,
    });
    // Subline near bottom of top area
    s.addText(c.sub, {
      x: c.x + 0.4, y: cardY + 2.3, w: cardW - 0.8, h: 0.4,
      fontFace: BODY, fontSize: 13, color: DIM, charSpacing: 4,
      align: "left", valign: "middle", margin: 0,
    });
    // Yellow divider
    s.addShape(pres.shapes.LINE, {
      x: c.x + 0.4, y: cardY + 2.75, w: cardW - 0.8, h: 0,
      line: { color: YELLOW, width: 0.75 },
    });
    // Title
    s.addText(c.title, {
      x: c.x + 0.4, y: cardY + 2.95, w: cardW - 0.8, h: 0.9,
      fontFace: HEAD, fontSize: 42, bold: true, color: CREAM,
      align: "left", valign: "top", margin: 0,
    });
    // Body
    s.addText(c.body, {
      x: c.x + 0.4, y: cardY + 4.1, w: cardW - 0.8, h: 1.4,
      fontFace: BODY, fontSize: 15, color: CREAM,
      align: "left", valign: "top", margin: 0,
    });
    // Stats
    s.addText(c.stats, {
      x: c.x + 0.4, y: cardY + 5.65, w: cardW - 0.8, h: 0.5,
      fontFace: BODY, fontSize: 14, bold: true, color: YELLOW, charSpacing: 3,
      align: "left", valign: "middle", margin: 0,
    });
  });

  addFooter(s, "BATTERY", "2 ARENAS / 1 BUILDING");
}

// =============================================================
// SLIDE 5 — THE FORMATS
// =============================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };

  addHeaderBar(s, "05", "THE FORMATS", null);

  s.addText("WHAT YOU PLAY", {
    x: 0.6, y: 1.1, w: 8, h: 0.45,
    fontFace: BODY, fontSize: 16, color: YELLOW, charSpacing: 5, valign: "middle", margin: 0,
  });
  s.addText(
    [
      { text: "TWO FORMATS. ONE ", options: { color: CREAM, breakLine: true } },
      { text: "BUILDING.",           options: { color: YELLOW } },
    ],
    {
      x: 0.6, y: 1.65, w: SW - 1.2, h: 3.1,
      fontFace: HEAD, fontSize: 100, bold: true,
      align: "left", valign: "top", margin: 0, charSpacing: -2,
    }
  );

  // Two format cards
  const cardY = 5.1, cardH = 5.4;
  const cardW = (SW - 0.6 * 2 - 0.4) / 2;
  const formats = [
    {
      x: 0.6,
      eyebrow: "FMT-01 // PAINTBALL",
      title: "PAINTBALL",
      body: "Traditional .68 caliber on both arenas. Low-impact equipment available for kids and first-timers — same rules, softer sting.",
      specs: [
        ["CALIBER",      ".68 / .50 LI"],
        ["AGE MINIMUM",  "8+"],
        ["MATCH LENGTH", "20 MIN"],
      ],
    },
    {
      x: 0.6 + cardW + 0.4,
      eyebrow: "FMT-02 // AIRSOFT",
      title: "AIRSOFT",
      body: "6mm BB, FPS-capped replica rifles for players who want milsim realism. Dedicated Thursday and Sunday nights for league play.",
      specs: [
        ["CALIBER",     "6 MM"],
        ["AGE MINIMUM", "14+"],
        ["FPS CAP",     "350 FPS"],
      ],
    },
  ];

  formats.forEach((f) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: f.x, y: cardY, w: cardW, h: cardH,
      fill: { color: BG }, line: { color: LINE, width: 0.75 },
    });
    s.addText(f.eyebrow, {
      x: f.x + 0.5, y: cardY + 0.4, w: cardW - 1, h: 0.5,
      fontFace: BODY, fontSize: 15, color: DIM, charSpacing: 5,
      align: "left", valign: "middle", margin: 0,
    });
    s.addText(f.title, {
      x: f.x + 0.5, y: cardY + 0.95, w: cardW - 1, h: 1.2,
      fontFace: HEAD, fontSize: 54, bold: true, color: CREAM,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(f.body, {
      x: f.x + 0.5, y: cardY + 2.3, w: cardW - 1, h: 1.3,
      fontFace: BODY, fontSize: 15, color: CREAM,
      align: "left", valign: "top", margin: 0,
    });

    // Spec rows
    const rowY0 = cardY + 3.7;
    const rowH = 0.55;
    f.specs.forEach((sp, i) => {
      const ry = rowY0 + i * rowH;
      // divider line above each row
      s.addShape(pres.shapes.LINE, {
        x: f.x + 0.5, y: ry, w: cardW - 1, h: 0,
        line: { color: LINE, width: 0.5 },
      });
      s.addText(sp[0], {
        x: f.x + 0.5, y: ry + 0.05, w: (cardW - 1) / 2, h: rowH - 0.1,
        fontFace: BODY, fontSize: 13, color: DIM, charSpacing: 4,
        align: "left", valign: "middle", margin: 0,
      });
      s.addText(sp[1], {
        x: f.x + 0.5 + (cardW - 1) / 2, y: ry + 0.05, w: (cardW - 1) / 2, h: rowH - 0.1,
        fontFace: BODY, fontSize: 14, bold: true, color: YELLOW, charSpacing: 3,
        align: "right", valign: "middle", margin: 0,
      });
    });
    // bottom divider under last row
    s.addShape(pres.shapes.LINE, {
      x: f.x + 0.5, y: rowY0 + f.specs.length * rowH, w: cardW - 1, h: 0,
      line: { color: LINE, width: 0.5 },
    });
  });

  addFooter(s, "BATTERY", "PAINTBALL + AIRSOFT");
}

// =============================================================
// SLIDE 6 — WHO IT'S FOR (light mode)
// =============================================================
{
  const s = pres.addSlide();
  const SAND = "EAE5DB";
  const INK  = "0F0F0F";
  s.background = { color: SAND };

  // Eyebrow + headline (dark)
  s.addText("WHO IT'S FOR", {
    x: 0.9, y: 0.8, w: 10, h: 0.5,
    fontFace: BODY, fontSize: 16, color: INK, charSpacing: 5, valign: "middle", margin: 0,
  });
  s.addText(
    [
      { text: "EVERYONE GETS A", options: { breakLine: true } },
      { text: "TURN." },
    ],
    {
      x: 0.9, y: 1.35, w: SW - 1.8, h: 3.8,
      fontFace: HEAD, fontSize: 120, bold: true, color: INK,
      align: "left", valign: "top", margin: 0, charSpacing: -2,
    }
  );

  // 3x2 grid of tiles; tiles 2 (TEENS) and 4 (CORPORATE) are yellow.
  const tiles = [
    { tag: "01 — FAMILIES",      title: "BIRTHDAY PARTIES",      body: "Low-impact paintball for ages 8+. Private arena, party room, cake in the lounge." },
    { tag: "02 — TEENS",         title: "AFTER SCHOOL & WEEKENDS", body: "Student pricing Tue–Thu, 3–6pm. Gear rental included, ID required.", hi: true },
    { tag: "03 — COLLEGE",       title: "INTRAMURAL NIGHTS",     body: "NYU, Columbia, FIT, Hunter — bring a team of six, play as a house." },
    { tag: "04 — CORPORATE",     title: "TEAM BUILDING",         body: "Private buyouts weekdays. Briefing room, catering, and bar add-ons.", hi: true },
    { tag: "05 — CELEBRATIONS",  title: "BACHELOR & BACHELORETTE", body: "Packages with pregame cocktails, custom jerseys, and a two-hour buyout." },
    { tag: "06 — LEAGUES",       title: "SERIOUS PLAYERS",       body: "Weekly speedball and milsim leagues, ranked ladder, and pro-shop pricing on gear." },
  ];

  const gx = 0.9, gy = 5.4;
  const gw = (SW - 1.8) / 3;
  const gh = (SH - gy - 0.6) / 2;

  tiles.forEach((t, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = gx + col * gw;
    const y = gy + row * gh;

    // Tile background: highlighted = yellow, else sand
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: gw, h: gh,
      fill: { color: t.hi ? YELLOW : SAND },
      line: { color: INK, width: 0.75 },
    });

    s.addText(t.tag, {
      x: x + 0.35, y: y + 0.3, w: gw - 0.7, h: 0.45,
      fontFace: BODY, fontSize: 13, color: INK, charSpacing: 5,
      align: "left", valign: "middle", margin: 0,
    });
    s.addText(t.title, {
      x: x + 0.35, y: y + 0.75, w: gw - 0.7, h: 1.2,
      fontFace: HEAD, fontSize: 28, bold: true, color: INK,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(t.body, {
      x: x + 0.35, y: y + 2.1, w: gw - 0.7, h: gh - 2.3,
      fontFace: BODY, fontSize: 13, color: INK,
      align: "left", valign: "top", margin: 0,
    });
  });
}

// =============================================================
// SLIDE 7 — AMENITIES
// =============================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };

  addHeaderBar(s, "07", "AMENITIES", null);

  s.addText("UNDER ONE ROOF", {
    x: 0.6, y: 1.2, w: 10, h: 0.45,
    fontFace: BODY, fontSize: 16, color: YELLOW, charSpacing: 5, valign: "middle", margin: 0,
  });
  s.addText(
    [
      { text: "EVERYTHING ON ", options: { color: CREAM  } },
      { text: "SITE.",           options: { color: YELLOW } },
    ],
    {
      x: 0.6, y: 1.75, w: SW - 1.2, h: 1.8,
      fontFace: HEAD, fontSize: 96, bold: true,
      align: "left", valign: "top", margin: 0, charSpacing: -2,
    }
  );

  // Amenity rows: 2 columns x 4 rows, each row has [##] [TITLE] [detail]
  const amenities = [
    ["01", "THE BAR",       "DRAFT BEER · 21+"],
    ["02", "LOUNGE",        "COUCHES · SCREENS · FOOD"],
    ["03", "PRO SHOP",      "MARKERS · JERSEYS · MASKS"],
    ["04", "PARTY ROOMS",   "3 PRIVATE · UP TO 30 GUESTS"],
    ["05", "LOCKERS",       "200 DAY-USE · CODED"],
    ["06", "KITCHEN",       "PIZZA · WINGS · SALADS"],
    ["07", "BRIEFING ROOM", "CORPORATE BOOKINGS"],
    ["08", "SPECTATOR DECK","WATCH MATCHES LIVE"],
  ];

  const listTop = 4.0, rowH = 1.35;
  const listW = SW - 1.2;
  const colW = listW / 2;

  // top divider
  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: listTop, w: listW, h: 0,
    line: { color: LINE, width: 0.5 },
  });

  amenities.forEach((a, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x0 = 0.6 + col * colW;
    const y  = listTop + 0.15 + row * rowH;

    // Number
    s.addText(a[0], {
      x: x0, y, w: 0.9, h: 0.9,
      fontFace: BODY, fontSize: 16, color: YELLOW, charSpacing: 3,
      align: "left", valign: "top", margin: 0,
    });
    // Title
    s.addText(a[1], {
      x: x0 + 1.0, y, w: 3.4, h: 1.0,
      fontFace: HEAD, fontSize: 22, bold: true, color: CREAM,
      align: "left", valign: "top", margin: 0,
    });
    // Detail right-aligned within column; stop well before the next column's number slot
    s.addText(a[2], {
      x: x0 + 4.4, y: y + 0.1, w: colW - 5.0, h: 0.6,
      fontFace: BODY, fontSize: 13, color: DIM, charSpacing: 4,
      align: "right", valign: "top", margin: 0,
    });

    // Row divider under each pair of rows (every 2 items drawn once per row)
    if (col === 0) {
      s.addShape(pres.shapes.LINE, {
        x: 0.6, y: y + rowH - 0.15, w: listW, h: 0,
        line: { color: LINE, width: 0.5 },
      });
    }
  });

  addFooter(s, "BATTERY", "8 AMENITIES / 1 BUILDING");
}

// =============================================================
// SLIDE 8 — THE FLOW + PRICING (split: left dark, right yellow)
// =============================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };

  // Yellow right panel
  const splitX = 11.0;
  s.addShape(pres.shapes.RECTANGLE, {
    x: splitX, y: 0, w: SW - splitX, h: SH,
    fill: { color: YELLOW }, line: { color: YELLOW },
  });

  // ---- LEFT (THE FLOW) ----
  s.addText("THE FLOW", {
    x: 0.8, y: 0.9, w: 8, h: 0.45,
    fontFace: BODY, fontSize: 16, color: YELLOW, charSpacing: 5, valign: "middle", margin: 0,
  });
  s.addText(
    [
      { text: "WALK IN. GEAR UP.", options: { color: CREAM, breakLine: true } },
      { text: "PLAY.",             options: { color: YELLOW } },
    ],
    {
      x: 0.8, y: 1.45, w: splitX - 1.4, h: 2.6,
      fontFace: HEAD, fontSize: 58, bold: true,
      align: "left", valign: "top", margin: 0, charSpacing: -2,
    }
  );

  const steps = [
    ["01", "CHECK IN",  "Waiver on the tablet, wristband, locker code. Two minutes."],
    ["02", "GEAR UP",   "Mask, jersey, marker, and paint — fitted by staff in the equipment room."],
    ["03", "BRIEFING",  "Five-minute safety and rules walkthrough at the briefing board."],
    ["04", "PLAY",      "Three 20-minute matches, swapping arenas halfway through the session."],
    ["05", "COOL DOWN", "Drinks, food, and replays on the lounge screens."],
  ];

  const stepY0 = 4.6;
  const stepH  = 1.15;
  // top divider
  s.addShape(pres.shapes.LINE, {
    x: 0.8, y: stepY0 - 0.1, w: splitX - 1.6, h: 0,
    line: { color: LINE, width: 0.5 },
  });
  steps.forEach((st, i) => {
    const y = stepY0 + i * stepH;
    s.addText(st[0], {
      x: 0.8, y, w: 0.9, h: 0.5,
      fontFace: HEAD, fontSize: 15, bold: true, color: YELLOW, charSpacing: 3,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(st[1], {
      x: 1.8, y, w: 4.5, h: 0.55,
      fontFace: HEAD, fontSize: 20, bold: true, color: CREAM, charSpacing: 2,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(st[2], {
      x: 1.8, y: y + 0.55, w: splitX - 2.6, h: 0.5,
      fontFace: BODY, fontSize: 13, color: DIM,
      align: "left", valign: "top", margin: 0,
    });
    // divider under row
    s.addShape(pres.shapes.LINE, {
      x: 0.8, y: y + stepH - 0.1, w: splitX - 1.6, h: 0,
      line: { color: LINE, width: 0.5 },
    });
  });

  // ---- RIGHT (PRICING) ----
  s.addText("PRICING", {
    x: splitX + 0.5, y: 1.5, w: 7, h: 0.45,
    fontFace: BODY, fontSize: 15, color: BG, charSpacing: 5, valign: "middle", margin: 0,
  });
  s.addText("WHAT YOU PAY.", {
    x: splitX + 0.5, y: 2.0, w: SW - splitX - 1.0, h: 1.3,
    fontFace: HEAD, fontSize: 52, bold: true, color: BG,
    align: "left", valign: "top", margin: 0, charSpacing: -1,
  });

  const prices = [
    ["WALK-IN SESSION",    "90 MIN · GEAR INCL.",      "$55"],
    ["STUDENT / UNDER 18", "TUE–THU 3–6PM",            "$35"],
    ["BIRTHDAY PARTY",     "10 PLAYERS · ROOM · CAKE", "$650"],
    ["CORPORATE BUYOUT",   "2 HRS · PRIVATE · CATERING","$2.5K"],
  ];

  const pY0 = 4.2, pH = 1.35;
  const pDarkLine = "2A2A2A";
  // top divider
  s.addShape(pres.shapes.LINE, {
    x: splitX + 0.5, y: pY0 - 0.1, w: SW - splitX - 1.0, h: 0,
    line: { color: pDarkLine, width: 0.5 },
  });
  prices.forEach((p, i) => {
    const y = pY0 + i * pH;
    s.addText(p[0], {
      x: splitX + 0.5, y, w: 5.0, h: 0.55,
      fontFace: HEAD, fontSize: 18, bold: true, color: BG, charSpacing: 2,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(p[1], {
      x: splitX + 0.5, y: y + 0.55, w: 6.0, h: 0.45,
      fontFace: BODY, fontSize: 12, color: "5E5A2E", charSpacing: 4,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(p[2], {
      x: SW - 3.5, y: y - 0.02, w: 2.8, h: 0.9,
      fontFace: HEAD, fontSize: 38, bold: true, color: BG,
      align: "right", valign: "top", margin: 0,
    });
    // divider
    s.addShape(pres.shapes.LINE, {
      x: splitX + 0.5, y: y + pH - 0.1, w: SW - splitX - 1.0, h: 0,
      line: { color: pDarkLine, width: 0.5 },
    });
  });
}

// =============================================================
// SLIDE 9 — THE ADDRESS
// =============================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };

  // Right side: simple intersection map (grid lines)
  const mapX0 = 11.2, mapY0 = 0.6, mapW = SW - mapX0 - 0.6, mapH = SH - 1.2;
  // horizontal grid lines
  [0.35, 0.62].forEach((f) => {
    s.addShape(pres.shapes.LINE, {
      x: mapX0, y: mapY0 + mapH * f, w: mapW, h: 0,
      line: { color: "B8B29E", width: 0.75 },
    });
  });
  // vertical grid lines
  [0.28, 0.55, 0.80].forEach((f) => {
    s.addShape(pres.shapes.LINE, {
      x: mapX0 + mapW * f, y: mapY0, w: 0, h: mapH,
      line: { color: "B8B29E", width: 0.75 },
    });
  });
  // Battery marker (yellow dot)
  const dotX = mapX0 + mapW * 0.55, dotY = mapY0 + mapH * 0.4;
  s.addShape(pres.shapes.OVAL, {
    x: dotX - 0.18, y: dotY - 0.18, w: 0.36, h: 0.36,
    fill: { color: YELLOW }, line: { color: YELLOW },
  });
  // BATTERY pill below dot
  s.addShape(pres.shapes.RECTANGLE, {
    x: dotX - 0.8, y: dotY + 0.3, w: 1.6, h: 0.5,
    fill: { color: YELLOW }, line: { color: YELLOW },
  });
  s.addText("BATTERY", {
    x: dotX - 0.8, y: dotY + 0.3, w: 1.6, h: 0.5,
    fontFace: BODY, fontSize: 13, bold: true, color: BG, charSpacing: 3,
    align: "center", valign: "middle", margin: 0,
  });

  // Map captions (bottom)
  s.addText("W 27TH ST × 11TH AVE", {
    x: mapX0, y: SH - 0.9, w: mapW / 2, h: 0.4,
    fontFace: BODY, fontSize: 13, color: DIM, charSpacing: 4,
    align: "left", valign: "middle", margin: 0,
  });
  s.addText("CHELSEA · NYC", {
    x: mapX0 + mapW / 2, y: SH - 0.9, w: mapW / 2, h: 0.4,
    fontFace: BODY, fontSize: 13, color: DIM, charSpacing: 4,
    align: "right", valign: "middle", margin: 0,
  });

  // ---- LEFT column ----
  s.addText("THE ADDRESS", {
    x: 0.9, y: 1.4, w: 9, h: 0.5,
    fontFace: BODY, fontSize: 16, color: YELLOW, charSpacing: 5, valign: "middle", margin: 0,
  });
  s.addText(
    [
      { text: "CHELSEA. ", options: { color: CREAM } },
      { text: "FOUR",      options: { color: YELLOW, breakLine: true } },
      { text: "TRAINS.",   options: { color: YELLOW } },
    ],
    {
      x: 0.9, y: 2.0, w: 10, h: 2.7,
      fontFace: HEAD, fontSize: 80, bold: true,
      align: "left", valign: "top", margin: 0, charSpacing: -2,
    }
  );
  s.addText("548 West 27th Street New York, NY 10001", {
    x: 0.9, y: 4.9, w: 10, h: 0.5,
    fontFace: BODY, fontSize: 20, color: CREAM,
    align: "left", valign: "middle", margin: 0,
  });

  // Info rows
  const rows = [
    ["SUBWAY",    "A · C · E · 1 · 7"],
    ["WALK TIME", "6 MIN FROM PENN STATION"],
    ["HOURS",     "TUE–SUN · 11AM – 11PM"],
    ["PARKING",   "LOT ON 11TH · 120 SPOTS"],
    ["OPENS",     "LABOR DAY WEEKEND 2026"],
  ];
  const rY0 = 6.1, rH = 0.7;
  // top divider
  s.addShape(pres.shapes.LINE, {
    x: 0.9, y: rY0 - 0.05, w: 9.5, h: 0, line: { color: LINE, width: 0.5 },
  });
  rows.forEach((r, i) => {
    const y = rY0 + i * rH;
    s.addText(r[0], {
      x: 0.9, y: y + 0.05, w: 2.3, h: rH - 0.1,
      fontFace: BODY, fontSize: 14, bold: true, color: YELLOW, charSpacing: 4,
      align: "left", valign: "middle", margin: 0,
    });
    s.addText(r[1], {
      x: 3.3, y: y + 0.05, w: 7.1, h: rH - 0.1,
      fontFace: BODY, fontSize: 14, color: CREAM, charSpacing: 3,
      align: "left", valign: "middle", margin: 0,
    });
    s.addShape(pres.shapes.LINE, {
      x: 0.9, y: y + rH - 0.05, w: 9.5, h: 0,
      line: { color: LINE, width: 0.5 },
    });
  });
}

// =============================================================
// SLIDE 10 — LOCK & LOAD (closing)
// =============================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };

  // Yellow top & bottom bands
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: SW, h: 0.45, fill: { color: YELLOW }, line: { color: YELLOW },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: SH - 0.45, w: SW, h: 0.45, fill: { color: YELLOW }, line: { color: YELLOW },
  });

  // Eyebrow
  s.addText("OPEN FOR BUSINESS", {
    x: 0, y: 3.2, w: SW, h: 0.6,
    fontFace: BODY, fontSize: 18, color: YELLOW, charSpacing: 5,
    align: "center", valign: "middle", margin: 0,
  });

  // Big headline
  s.addText(
    [
      { text: "LOCK & ", options: { color: CREAM  } },
      { text: "LOAD.",   options: { color: YELLOW } },
    ],
    {
      x: 0, y: 3.9, w: SW, h: 2.5,
      fontFace: HEAD, fontSize: 180, bold: true,
      align: "center", valign: "middle", margin: 0, charSpacing: -4,
    }
  );

  // Doors open line
  s.addText("DOORS OPEN · LABOR DAY WEEKEND · 2026", {
    x: 0, y: 6.5, w: SW, h: 0.6,
    fontFace: BODY, fontSize: 22, color: CREAM, charSpacing: 5,
    align: "center", valign: "middle", margin: 0,
  });

  // Contact line (three segments)
  s.addText(
    [
      { text: "WEB ",    options: { color: YELLOW, bold: true } },
      { text: "PLAYBATTERY.NYC     ", options: { color: CREAM  } },
      { text: "IG ",     options: { color: YELLOW, bold: true } },
      { text: "@BATTERY.NYC     ", options: { color: CREAM  } },
      { text: "BOOK ",   options: { color: YELLOW, bold: true } },
      { text: "(212) 555-0199",      options: { color: CREAM  } },
    ],
    {
      x: 0, y: 7.4, w: SW, h: 0.6,
      fontFace: BODY, fontSize: 20, charSpacing: 3,
      align: "center", valign: "middle", margin: 0,
    }
  );
}

// ---------- Write ----------
pres.writeFile({ fileName: "Battery_Paintball.pptx" })
  .then((f) => console.log("Wrote:", f));
