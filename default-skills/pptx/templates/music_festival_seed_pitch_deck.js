// PLUSH Festival Pitch Deck — recreated with pptxgenjs
// Font: Arial throughout. Orphan words prevented via non-breaking spaces.

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333" x 7.5"
pres.title = "PLUSH Festival — Seed Round 2027";

// ---------- Palette ----------
const C = {
  bg: "0A0A0B",          // near-black
  cream: "F4EFE6",       // soft cream
  pink: "FF1F6B",        // hot pink
  yellow: "E8FF38",      // electric yellow-green
  orange: "FF5A1F",      // orange
  white: "FFFFFF",
  ink: "0A0A0B",
  muted: "8A8A8A",
  mutedInk: "5A5A5A",
  hair: "2A2A2C",
};

const F = "Arial";
const NBSP = "\u00A0";

// Helper: prevent orphan (widow) — join last two words with non-breaking space
function noOrphan(s) {
  if (!s) return s;
  const t = s.replace(/\s+/g, " ").trim();
  const idx = t.lastIndexOf(" ");
  if (idx === -1) return t;
  return t.slice(0, idx) + NBSP + t.slice(idx + 1);
}

// ============================================================
// SLIDE 1 — Cover
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  // Top pink header bar
  s.addShape("rect", { x: 0, y: 0, w: 13.333, h: 0.38, fill: { color: C.pink }, line: { color: C.pink } });
  s.addText(
    [
      { text: "PLUSH FESTIVAL", options: { bold: true, color: C.white } },
      { text: "     ·     ", options: { color: C.white } },
      { text: "PHOENIX, ARIZONA", options: { color: C.white } },
      { text: "     ·     ", options: { color: C.white } },
      { text: "SEED ROUND 2027", options: { color: C.white } },
    ],
    { x: 0, y: 0, w: 13.333, h: 0.38, align: "center", valign: "middle",
      fontFace: F, fontSize: 9, charSpacing: 6, margin: 0 }
  );

  // Bottom yellow bar with genre strip
  s.addShape("rect", { x: 0, y: 7.12, w: 13.333, h: 0.38, fill: { color: C.yellow }, line: { color: C.yellow } });
  s.addText(
    "HOUSE     ·     TECH HOUSE     ·     TRANCE     ·     OPEN FORMAT     ·     SUNSET TO LATE",
    { x: 0, y: 7.12, w: 13.333, h: 0.38, align: "center", valign: "middle",
      fontFace: F, fontSize: 9, bold: true, color: C.ink, charSpacing: 6, margin: 0 }
  );

  // Giant "PLUSH" wordmark — P and H pink, L and S yellow, U orange
  const wm = [
    { ch: "P", color: C.pink },
    { ch: "L", color: C.yellow },
    { ch: "U", color: C.orange },
    { ch: "S", color: C.yellow },
    { ch: "H", color: C.pink },
  ];
  // Layout the wordmark across the slide (tight, single row)
  // Per-letter adjustments:
  //   U has a rounded bottom that's optically drawn taller than flat letters,
  //   so its top overshoots the cap line of P/L/S/H. Nudge it DOWN a hair.
  //   Also widen U's slot slightly so it doesn't kiss the S next to it.
  const wmY = 1.5;
  const wmH = 3.5;
  const letterW = 2.25;
  const uExtraW = 0.15;
  const totalW = letterW * wm.length + uExtraW;
  const wmStartX = (13.333 - totalW) / 2;
  let cursorX = wmStartX;
  wm.forEach((L) => {
    const isU = L.ch === "U";
    const thisW = letterW + (isU ? uExtraW : 0);
    const yOffset = isU ? 0.06 : 0;
    s.addText(L.ch, {
      x: cursorX, y: wmY + yOffset, w: thisW, h: wmH,
      align: "center", valign: "middle",
      fontFace: F, fontSize: 260, bold: true, color: L.color, charSpacing: -10, margin: 0,
    });
    cursorX += thisW;
  });

  // Below wordmark: subtitle and details (left) + date (right)
  s.addText("SEED ROUND · MARCH 2027", {
    x: 0.6, y: 5.35, w: 8, h: 0.35,
    fontFace: F, fontSize: 11, bold: true, color: C.white, charSpacing: 8, margin: 0,
  });

  // Thin divider line
  s.addShape("line", {
    x: 0.6, y: 5.78, w: 12.15, h: 0,
    line: { color: C.hair, width: 0.75 },
  });

  s.addText("A two-day desert dance festival", {
    x: 0.6, y: 5.9, w: 8, h: 0.4,
    fontFace: F, fontSize: 16, color: C.white, bold: true, margin: 0,
  });
  s.addText("Steele Indian School Park  ·  Phoenix, AZ", {
    x: 0.6, y: 6.3, w: 8, h: 0.35,
    fontFace: F, fontSize: 13, color: C.cream, margin: 0,
  });

  // Date block right
  s.addText("MAR 13–14 · 2027", {
    x: 8.5, y: 5.9, w: 4.25, h: 0.7,
    align: "right", valign: "middle",
    fontFace: F, fontSize: 28, bold: true, color: C.yellow, charSpacing: 2, margin: 0,
  });
}

// ============================================================
// Shared helper: content-slide header + footer
// ============================================================
function addHeader(s, eyebrow, onDark = false, colorOverride = null) {
  s.addText(eyebrow, {
    x: 0.6, y: 0.45, w: 10, h: 0.3,
    fontFace: F, fontSize: 10, bold: true,
    color: colorOverride || C.pink,
    charSpacing: 8, margin: 0,
  });
}
function addFooter(s, pageNo, onDark = false, colorOverride = null) {
  const c = colorOverride || (onDark ? C.cream : C.mutedInk);
  s.addText("PLUSH · 2027", {
    x: 0.6, y: 7.05, w: 4, h: 0.3,
    fontFace: F, fontSize: 9, bold: true, color: c, charSpacing: 6, margin: 0,
  });
  s.addText(`${pageNo} / 08`, {
    x: 9.333, y: 7.05, w: 3.4, h: 0.3, align: "right",
    fontFace: F, fontSize: 9, bold: true, color: c, charSpacing: 6, margin: 0,
  });
}

// ============================================================
// SLIDE 2 — The Opportunity
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addHeader(s, "02 / THE OPPORTUNITY");

  s.addText(noOrphan("A dance market without a flagship."), {
    x: 0.6, y: 0.95, w: 12.15, h: 1.4,
    fontFace: F, fontSize: 44, bold: true, color: C.ink,
    charSpacing: -1, margin: 0,
  });
  // Uppercase visual treatment handled via text but we want caps
  // Replace with uppercase while keeping nbsp
  // (Reassign by adding a shape would overwrite; instead we'll set text to uppercase directly)

  // Three big stats
  const stats = [
    { n: "5.1M", d: "Phoenix metro population — 5th largest U.S. metro and the fastest growing." },
    { n: "68%",  d: "Of AZ dance fans currently travel out of state for their primary festival weekend." },
    { n: "1",    d: "Major outdoor house / tech-house festival in the entire Southwest spring window." },
  ];
  const statY = 2.85;
  const statW = 3.85;
  const gap = 0.25;
  const startX = 0.6;
  stats.forEach((st, i) => {
    const x = startX + i * (statW + gap);
    // Number
    s.addText(st.n, {
      x, y: statY, w: statW, h: 1.3,
      fontFace: F, fontSize: 84, bold: true, color: C.pink,
      charSpacing: -2, margin: 0,
    });
    // Divider
    s.addShape("line", {
      x, y: statY + 1.35, w: statW - 0.3, h: 0,
      line: { color: C.ink, width: 0.75 },
    });
    // Description
    s.addText(noOrphan(st.d), {
      x, y: statY + 1.45, w: statW - 0.2, h: 1.2,
      fontFace: F, fontSize: 13, color: C.ink, margin: 0,
      paraSpaceAfter: 0,
    });
  });

  // Bottom paragraph
  s.addText(
    [
      { text: "Phoenix has the audience, the climate, and the infrastructure of a top-five EDM market — but no ", options: { color: C.ink } },
      { text: "house-forward, daylight-into-night", options: { color: C.pink, bold: true } },
      { text: " festival anchored in the city. PLUSH owns that white" + NBSP + "space.", options: { color: C.ink } },
    ],
    {
      x: 0.6, y: 6.0, w: 12.15, h: 0.9,
      fontFace: F, fontSize: 15, margin: 0, paraSpaceAfter: 0,
    }
  );

  addFooter(s, "02");
}

// ============================================================
// SLIDE 3 — The Festival (two-column pink right)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addHeader(s, "03 / THE FESTIVAL", true);

  // Right pink panel
  const panelX = 7.6, panelW = 5.133;
  s.addShape("rect", {
    x: panelX, y: 0, w: panelW, h: 7.5,
    fill: { color: C.pink }, line: { color: C.pink },
  });

  // LEFT — title and body
  s.addText(noOrphan("Two days. Three stages. One desert.").toUpperCase(), {
    x: 0.6, y: 0.95, w: 6.7, h: 1.7,
    fontFace: F, fontSize: 40, bold: true, color: C.white,
    charSpacing: -1, margin: 0,
  });

  s.addText(
    noOrphan("PLUSH is a 2-day, 3-stage outdoor dance festival built for the house, tech-house, and trance communities. Sunset-forward programming that starts with golden-hour grooves and rides the desert night into peak-time mainroom energy."),
    {
      x: 0.6, y: 2.85, w: 6.7, h: 1.6,
      fontFace: F, fontSize: 15, color: C.cream, margin: 0,
    }
  );

  // Spec rows (label / value)
  const specs = [
    ["FORMAT",   "2-DAY OUTDOOR"],
    ["STAGES",   "3 + SILENT DISCO"],
    ["CAPACITY", "8,500 / DAY"],
    ["HOURS",    "2 PM — 12 AM"],
    ["AGE",      "18+"],
  ];
  const specY0 = 4.55;
  const specH = 0.42;
  specs.forEach(([label, value], i) => {
    const y = specY0 + i * specH;
    s.addText(label, {
      x: 0.6, y, w: 2, h: specH,
      fontFace: F, fontSize: 11, bold: true, color: C.muted, charSpacing: 6, margin: 0,
      valign: "middle",
    });
    s.addText(value, {
      x: 2.6, y, w: 4.7, h: specH,
      fontFace: F, fontSize: 12, bold: true, color: C.white, charSpacing: 2, margin: 0,
      valign: "middle",
    });
    s.addShape("line", {
      x: 0.6, y: y + specH - 0.03, w: 6.7, h: 0,
      line: { color: C.hair, width: 0.75 },
    });
  });

  // RIGHT PANEL content
  s.addText("THE PROMISE", {
    x: panelX + 0.45, y: 0.95, w: panelW - 0.8, h: 0.3,
    fontFace: F, fontSize: 10, bold: true, color: C.ink, charSpacing: 8, margin: 0,
  });
  s.addText(
    noOrphan("A festival that feels like the city it's in — warm, late, and a little glamorous.").toUpperCase(),
    {
      x: panelX + 0.45, y: 1.35, w: panelW - 0.8, h: 2.3,
      fontFace: F, fontSize: 26, bold: true, color: C.ink,
      charSpacing: -0.5, margin: 0,
    }
  );

  s.addText("DIFFERENTIATORS", {
    x: panelX + 0.45, y: 4.1, w: panelW - 0.8, h: 0.3,
    fontFace: F, fontSize: 10, bold: true, color: C.ink, charSpacing: 8, margin: 0,
  });

  const diffs = [
    "Curated, no-conflict scheduling — every set matters",
    "Boutique production: design-led stages, real shade, real bars",
    "Local F&B and AZ art collaborations across the grounds",
    "Sundown sets at 6:30 — our signature visual moment",
  ];
  s.addText(
    diffs.map(d => ({ text: noOrphan(d), options: { bullet: { code: "25A0" }, color: C.ink } })),
    {
      x: panelX + 0.45, y: 4.5, w: panelW - 0.8, h: 2.4,
      fontFace: F, fontSize: 13, color: C.ink, margin: 0,
      paraSpaceAfter: 8,
    }
  );

  addFooter(s, "03", true);
}

// ============================================================
// SLIDE 4 — The Location (orange)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.orange };

  addHeader(s, "04 / THE LOCATION", true, C.ink);

  s.addText(noOrphan("Steele Indian School Park.").toUpperCase(), {
    x: 0.6, y: 0.95, w: 12.15, h: 1.4,
    fontFace: F, fontSize: 48, bold: true, color: C.ink,
    charSpacing: -1, margin: 0,
  });

  s.addText(
    noOrphan("75 acres of public parkland in the heart of central Phoenix — the rare urban festival site with desert character, transit access, and a city behind it."),
    {
      x: 0.6, y: 2.5, w: 7, h: 1.2,
      fontFace: F, fontSize: 16, color: C.ink, margin: 0,
    }
  );

  // Map-style dark card (left)
  const mapX = 0.6, mapY = 3.9, mapW = 6.5, mapH = 2.8;
  s.addShape("rect", {
    x: mapX, y: mapY, w: mapW, h: mapH,
    fill: { color: C.ink }, line: { color: C.ink },
  });
  // "N · CENTRAL PHX" label
  s.addText("N · CENTRAL PHX", {
    x: mapX + 0.25, y: mapY + 0.2, w: 2.5, h: 0.3,
    fontFace: F, fontSize: 9, bold: true, color: C.muted, charSpacing: 6, margin: 0,
  });
  // Park name center
  s.addText("STEELE INDIAN SCHOOL PARK", {
    x: mapX, y: mapY + 1.05, w: mapW, h: 0.45,
    align: "center", valign: "middle",
    fontFace: F, fontSize: 16, bold: true, color: C.white, charSpacing: 4, margin: 0,
  });
  // Yellow pin dot
  s.addShape("ellipse", {
    x: mapX + mapW/2 - 0.12, y: mapY + 1.62, w: 0.24, h: 0.24,
    fill: { color: C.yellow }, line: { color: C.yellow },
  });
  // Coordinates at bottom
  s.addText("33.4942° N · 112.0742° W · 75 ACRES", {
    x: mapX, y: mapY + mapH - 0.45, w: mapW, h: 0.3,
    align: "center",
    fontFace: F, fontSize: 10, bold: true, color: C.cream, charSpacing: 4, margin: 0,
  });

  // WHY HERE card (right)
  const whyX = 7.4, whyY = 3.9, whyW = 5.333, whyH = 2.8;
  s.addShape("rect", {
    x: whyX, y: whyY, w: whyW, h: whyH,
    fill: { color: C.ink }, line: { color: C.ink },
  });
  s.addText("WHY HERE", {
    x: whyX + 0.3, y: whyY + 0.2, w: whyW - 0.6, h: 0.3,
    fontFace: F, fontSize: 10, bold: true, color: C.yellow, charSpacing: 8, margin: 0,
  });
  const whyList = [
    "2 mi from Sky Harbor — fly in, festival, fly out",
    "Direct light-rail stop on Central Ave",
    "14,000 hotel rooms within 3 miles",
    "City has hosted major events at this site before",
    "March averages 75°F — the best festival weather in America",
  ];
  s.addText(
    whyList.map(w => ({ text: noOrphan(w), options: { bullet: { code: "25A0" }, color: C.cream } })),
    {
      x: whyX + 0.3, y: whyY + 0.6, w: whyW - 0.6, h: whyH - 0.8,
      fontFace: F, fontSize: 12, color: C.cream, margin: 0,
      paraSpaceAfter: 6,
    }
  );

  addFooter(s, "04", true, C.ink);
}

// ============================================================
// SLIDE 5 — The Lineup Strategy
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addHeader(s, "05 / THE LINEUP STRATEGY", true);

  s.addText(noOrphan("Two headliners. A deep bench.").toUpperCase(), {
    x: 0.6, y: 0.95, w: 8.5, h: 1.3,
    fontFace: F, fontSize: 40, bold: true, color: C.white,
    charSpacing: -1, margin: 0,
  });

  // Right-side meta stats
  s.addText(
    [
      { text: "~40 ARTISTS", options: { bold: true, color: C.white } },
      { text: "   ·   ", options: { color: C.muted } },
      { text: "3 STAGES", options: { bold: true, color: C.white } },
      { text: "\n", options: {} },
      { text: "$1.4M TALENT BUDGET", options: { bold: true, color: C.yellow } },
    ],
    {
      x: 8.0, y: 1.0, w: 4.73, h: 1.2, align: "right",
      fontFace: F, fontSize: 12, charSpacing: 4, margin: 0,
    }
  );

  // Two lineup cards — pink, yellow
  const cardY = 2.75, cardW = 5.95, cardH = 3.3, gapX = 0.25;
  const cards = [
    { x: 0.6, fill: C.pink, fg: C.white, day: "DAY 01 · HOUSE", date: "SAT 03·13·27",
      head: "KAIRO BLOOM",
      tier2: "VELVET HOURS · MILO REIGN · SAINT LUME",
      tier2b: "NOVA DEL RIO · PARK & PINE",
      tier3: "JUNI · ASHA SOL · LOWERCASE TIGER · OBAYO  + 10 RISING / LOCAL",
    },
    { x: 0.6 + cardW + gapX, fill: C.yellow, fg: C.ink, day: "DAY 02 · TRANCE / OF", date: "SUN 03·14·27",
      head: "ATLAS RUNE",
      tier2: "CIELO · HALO MARTIN · RIVER & ROUX",
      tier2b: "NIGHTSHADE B2B SOLA",
      tier3: "MIRA OKO · KOSMO · PALOMA WAVES  + 10 RISING / LOCAL",
    },
  ];
  cards.forEach(c => {
    s.addShape("rect", {
      x: c.x, y: cardY, w: cardW, h: cardH,
      fill: { color: c.fill }, line: { color: c.fill },
    });
    s.addText(c.day, {
      x: c.x + 0.35, y: cardY + 0.25, w: cardW - 3, h: 0.3,
      fontFace: F, fontSize: 10, bold: true, color: c.fg, charSpacing: 6, margin: 0,
    });
    s.addText(c.date, {
      x: c.x + cardW - 2.5, y: cardY + 0.25, w: 2.2, h: 0.3, align: "right",
      fontFace: F, fontSize: 10, bold: true, color: c.fg, charSpacing: 4, margin: 0,
    });
    s.addText(c.head, {
      x: c.x + 0.35, y: cardY + 0.75, w: cardW - 0.7, h: 0.9,
      fontFace: F, fontSize: 38, bold: true, color: c.fg, charSpacing: -1, margin: 0,
    });
    s.addText(c.tier2, {
      x: c.x + 0.35, y: cardY + 1.75, w: cardW - 0.7, h: 0.3,
      fontFace: F, fontSize: 12, bold: true, color: c.fg, charSpacing: 1, margin: 0,
    });
    s.addText(c.tier2b, {
      x: c.x + 0.35, y: cardY + 2.05, w: cardW - 0.7, h: 0.3,
      fontFace: F, fontSize: 12, bold: true, color: c.fg, charSpacing: 1, margin: 0,
    });
    s.addText(c.tier3, {
      x: c.x + 0.35, y: cardY + 2.55, w: cardW - 0.7, h: 0.65,
      fontFace: F, fontSize: 11, color: c.fg, margin: 0,
    });
  });

  // Bottom paragraph
  s.addText(
    [
      { text: "Strategy: ", options: { bold: true, color: C.pink } },
      { text: "One A-list anchor per day to drive ticket sales, a deep tier-2 layer for credibility and breadth, and a meaningful slot for emerging and Phoenix-local talent. Holds and offers are open with all named acts; verbal interest from 4 of the 6 main-tier acts as of Q1" + NBSP + "2026.", options: { color: C.cream } },
    ],
    {
      x: 0.6, y: 6.25, w: 12.15, h: 0.7,
      fontFace: F, fontSize: 12, margin: 0,
    }
  );

  addFooter(s, "05", true);
}

// ============================================================
// SLIDE 6 — The Team
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addHeader(s, "06 / THE TEAM");

  s.addText(noOrphan("We've done this — at scale.").toUpperCase(), {
    x: 0.6, y: 0.95, w: 12.15, h: 1.2,
    fontFace: F, fontSize: 42, bold: true, color: C.ink,
    charSpacing: -1, margin: 0,
  });

  s.addText(
    [
      { text: "The PLUSH team carries ", options: { color: C.ink } },
      { text: "combined production credits across Skyline, Hard Summer, M3F", options: { color: C.pink, bold: true } },
      { text: " and a roster of regional events — over 600,000 attendees produced, with deep promoter, agency, and venue relationships across the West" + NBSP + "Coast.", options: { color: C.ink } },
    ],
    {
      x: 0.6, y: 2.2, w: 12.15, h: 0.9,
      fontFace: F, fontSize: 15, margin: 0,
    }
  );

  // Three team cards
  const team = [
    { initial: "A", name: "ALEX REYES", role: "FOUNDER · FESTIVAL DIRECTOR",
      bullets: [
        "Production lead, Skyline Festival '22–'25",
        "Stage producer, Hard Summer '21–'23",
        "10 yrs booking and ops in West Coast dance",
      ]},
    { initial: "M", name: "MAYA CHEN", role: "HEAD OF TALENT & PROGRAMMING",
      bullets: [
        "Former agent, mid-tier electronic roster",
        "Programmed M3F Phoenix '23 & '24",
        "Direct relationships at WME, UTA, AM Only",
      ]},
    { initial: "J", name: "JORDAN PARK", role: "HEAD OF OPERATIONS & PRODUCTION",
      bullets: [
        "Site & ops lead, four 20k+ cap events",
        "City of Phoenix permitting relationships",
        "Insurance, security, and medical vendor stack in place",
      ]},
  ];
  const tY = 3.4, tH = 3.4, tW = 4.0, tGap = 0.08;
  const tStart = 0.6;
  team.forEach((m, i) => {
    const x = tStart + i * (tW + tGap);
    // Card
    s.addShape("rect", {
      x, y: tY, w: tW, h: tH,
      fill: { color: C.ink }, line: { color: C.ink },
    });
    // Initial block (yellow)
    s.addShape("rect", {
      x, y: tY, w: 1.0, h: 1.0,
      fill: { color: C.yellow }, line: { color: C.yellow },
    });
    s.addText(m.initial, {
      x, y: tY, w: 1.0, h: 1.0,
      align: "center", valign: "middle",
      fontFace: F, fontSize: 48, bold: true, color: C.ink, margin: 0,
    });
    // Name
    s.addText(m.name, {
      x: x + 0.3, y: tY + 1.2, w: tW - 0.6, h: 0.4,
      fontFace: F, fontSize: 16, bold: true, color: C.white, charSpacing: 2, margin: 0,
    });
    // Role
    s.addText(m.role, {
      x: x + 0.3, y: tY + 1.6, w: tW - 0.6, h: 0.3,
      fontFace: F, fontSize: 9, bold: true, color: C.pink, charSpacing: 6, margin: 0,
    });
    // Divider
    s.addShape("line", {
      x: x + 0.3, y: tY + 1.98, w: tW - 0.6, h: 0,
      line: { color: C.hair, width: 0.75 },
    });
    // Bullets
    s.addText(
      m.bullets.map(b => ({ text: noOrphan(b), options: { bullet: { code: "25A0" }, color: C.cream } })),
      {
        x: x + 0.3, y: tY + 2.1, w: tW - 0.6, h: tH - 2.25,
        fontFace: F, fontSize: 11, color: C.cream, margin: 0,
        paraSpaceAfter: 6,
      }
    );
  });

  addFooter(s, "06");
}

// ============================================================
// SLIDE 7 — The Numbers
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addHeader(s, "07 / THE NUMBERS", true);

  s.addText(noOrphan("A model that pencils at 60% sell-through.").toUpperCase(), {
    x: 0.6, y: 0.95, w: 12.15, h: 1.2,
    fontFace: F, fontSize: 34, bold: true, color: C.white,
    charSpacing: -1, margin: 0,
  });

  // LEFT — revenue table
  s.addText("REVENUE MODEL · YEAR 1", {
    x: 0.6, y: 2.25, w: 7.2, h: 0.3,
    fontFace: F, fontSize: 10, bold: true, color: C.pink, charSpacing: 8, margin: 0,
  });

  const tableRows = [
    [{ text: "LINE", options: { bold: true, color: C.muted } },
     { text: "UNITS", options: { bold: true, color: C.muted, align: "right" } },
     { text: "$ / UNIT", options: { bold: true, color: C.muted, align: "right" } },
     { text: "TOTAL", options: { bold: true, color: C.muted, align: "right" } }],
    [{ text: "GA 2-day", options: { color: C.white } },
     { text: "11,000", options: { color: C.white, align: "right" } },
     { text: "$179", options: { color: C.white, align: "right" } },
     { text: "$1.97M", options: { color: C.white, align: "right" } }],
    [{ text: "VIP 2-day", options: { color: C.white } },
     { text: "1,200", options: { color: C.white, align: "right" } },
     { text: "$385", options: { color: C.white, align: "right" } },
     { text: "$0.46M", options: { color: C.white, align: "right" } }],
    [{ text: "Single-day", options: { color: C.white } },
     { text: "2,500", options: { color: C.white, align: "right" } },
     { text: "$109", options: { color: C.white, align: "right" } },
     { text: "$0.27M", options: { color: C.white, align: "right" } }],
    [{ text: "F&B / Bar (net)", options: { color: C.white } },
     { text: "17,000", options: { color: C.white, align: "right" } },
     { text: "$28", options: { color: C.white, align: "right" } },
     { text: "$0.48M", options: { color: C.white, align: "right" } }],
    [{ text: "Sponsorship", options: { color: C.white } },
     { text: "—", options: { color: C.white, align: "right" } },
     { text: "—", options: { color: C.white, align: "right" } },
     { text: "$0.32M", options: { color: C.white, align: "right" } }],
    [{ text: "Gross revenue", options: { bold: true, color: C.yellow } },
     { text: "", options: {} },
     { text: "", options: {} },
     { text: "$3.50M", options: { bold: true, color: C.yellow, align: "right" } }],
  ];
  s.addTable(tableRows, {
    x: 0.6, y: 2.65, w: 7.2,
    colW: [2.7, 1.5, 1.5, 1.5],
    fontFace: F, fontSize: 12, margin: 0.08,
    border: { type: "solid", color: C.hair, pt: 0.5 },
    fill: { color: C.bg },
  });

  // Three big KPI callouts below table
  const kpis = [
    { big: "$3.5M", label: "GROSS Y1", color: C.pink },
    { big: "$2.7M", label: "ALL-IN COST", color: C.white },
    { big: "23%",   label: "EBITDA Y1", color: C.yellow },
  ];
  const kY = 5.55, kW = 2.3;
  kpis.forEach((k, i) => {
    const x = 0.6 + i * (kW + 0.1);
    s.addText(k.big, {
      x, y: kY, w: kW, h: 0.75,
      fontFace: F, fontSize: 32, bold: true, color: k.color,
      charSpacing: -1, margin: 0,
    });
    s.addText(k.label, {
      x, y: kY + 0.75, w: kW, h: 0.3,
      fontFace: F, fontSize: 9, bold: true, color: C.muted, charSpacing: 6, margin: 0,
    });
  });

  // RIGHT — cost structure
  const rX = 8.2, rW = 4.55;
  s.addText("COST STRUCTURE", {
    x: rX, y: 2.25, w: rW, h: 0.3,
    fontFace: F, fontSize: 10, bold: true, color: C.pink, charSpacing: 8, margin: 0,
  });

  const costs = [
    ["Talent",              35, "$945K"],
    ["Production & stages", 25, "$675K"],
    ["Site, security, ops", 20, "$540K"],
    ["Marketing",           12, "$324K"],
    ["G&A + insurance",      8, "$216K"],
  ];
  const cY0 = 2.75, cH = 0.55;
  const maxBarW = rW; // full right column for the bar row
  costs.forEach(([lbl, pct, amt], i) => {
    const y = cY0 + i * cH;
    // Label
    s.addText(lbl, {
      x: rX, y, w: 2.3, h: 0.22,
      fontFace: F, fontSize: 12, color: C.white, margin: 0,
    });
    // Amount + pct on right
    s.addText(`${pct}% · ${amt}`, {
      x: rX + 2.3, y, w: rW - 2.3, h: 0.22, align: "right",
      fontFace: F, fontSize: 12, bold: true, color: C.cream, margin: 0,
    });
    // Bar track
    s.addShape("rect", {
      x: rX, y: y + 0.3, w: maxBarW, h: 0.08,
      fill: { color: C.hair }, line: { color: C.hair },
    });
    // Bar fill (scale to 35% = full)
    const fillW = (pct / 35) * maxBarW;
    s.addShape("rect", {
      x: rX, y: y + 0.3, w: fillW, h: 0.08,
      fill: { color: C.pink }, line: { color: C.pink },
    });
  });

  // Footnote
  s.addText(
    noOrphan("Break-even at 58% capacity. Sensitivity model assumes 0% sponsorship contribution. Y2 projects 1.4× attendance with 18% margin lift."),
    {
      x: 0.6, y: 6.6, w: 12.15, h: 0.4,
      fontFace: F, fontSize: 11, italic: true, color: C.muted, margin: 0,
    }
  );

  addFooter(s, "07", true);
}

// ============================================================
// SLIDE 8 — The Ask (pink)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.pink };

  addHeader(s, "08 / THE ASK", true);
  // On pink, keep eyebrow color white (override by covering)
  s.addShape("rect", {
    x: 0.55, y: 0.4, w: 4, h: 0.38,
    fill: { color: C.pink }, line: { color: C.pink },
  });
  s.addText("08 / THE ASK", {
    x: 0.6, y: 0.45, w: 4, h: 0.3,
    fontFace: F, fontSize: 10, bold: true, color: C.yellow, charSpacing: 8, margin: 0,
  });

  // Huge $450K
  s.addText(
    [
      { text: "$450", options: { color: C.white, bold: true } },
      { text: "K", options: { color: C.yellow, bold: true } },
    ],
    {
      x: 0.6, y: 1.0, w: 12.15, h: 2.6,
      fontFace: F, fontSize: 260, charSpacing: -4, margin: 0,
    }
  );

  // Subhead
  s.addText(
    noOrphan("Seed capital to lock venue, secure two anchor headliner deposits, and run a 6-month brand and ticketing campaign through on-sale."),
    {
      x: 0.6, y: 3.85, w: 10, h: 1.1,
      fontFace: F, fontSize: 18, color: C.white, margin: 0,
    }
  );

  // Use-of-funds row
  const uof = [
    { pct: "45%", label: "TALENT DEPOSITS" },
    { pct: "25%", label: "VENUE + PERMITS" },
    { pct: "20%", label: "BRAND + MARKETING" },
    { pct: "10%", label: "TEAM + WORKING CAPITAL" },
  ];
  const uY = 5.25, uW = 2.95, uH = 1.3;
  uof.forEach((u, i) => {
    const x = 0.6 + i * (uW + 0.1);
    s.addShape("rect", {
      x, y: uY, w: uW, h: uH,
      fill: { color: C.ink }, line: { color: C.ink },
    });
    s.addText(u.pct, {
      x: x + 0.25, y: uY + 0.15, w: uW - 0.5, h: 0.7,
      fontFace: F, fontSize: 36, bold: true, color: C.yellow, charSpacing: -1, margin: 0,
    });
    s.addText(u.label, {
      x: x + 0.25, y: uY + 0.85, w: uW - 0.5, h: 0.35,
      fontFace: F, fontSize: 9, bold: true, color: C.white, charSpacing: 6, margin: 0,
    });
  });

  // Bottom contact row
  s.addText("CONTACT", {
    x: 0.6, y: 6.8, w: 2.5, h: 0.3,
    fontFace: F, fontSize: 9, bold: true, color: C.yellow, charSpacing: 8, margin: 0,
  });
  s.addText("alex@plushfest.co  ·  +1 (602) 555-0142", {
    x: 0.6, y: 7.05, w: 6, h: 0.3,
    fontFace: F, fontSize: 12, bold: true, color: C.white, charSpacing: 2, margin: 0,
  });

  s.addText("CLOSE TARGET", {
    x: 7.0, y: 6.8, w: 5.7, h: 0.3, align: "right",
    fontFace: F, fontSize: 9, bold: true, color: C.yellow, charSpacing: 8, margin: 0,
  });
  s.addText("Q2 2026  ·  LEAD + 3 PARTICIPATING", {
    x: 7.0, y: 7.05, w: 5.7, h: 0.3, align: "right",
    fontFace: F, fontSize: 12, bold: true, color: C.white, charSpacing: 2, margin: 0,
  });
}

// ---------- Save ----------
pres.writeFile({ fileName: "festival.pptx" }).then(fn => {
  console.log("Saved:", fn);
});
