// heliomachy.js — recreates the Heliomachy pitch deck.
// Run: `node heliomachy.js` from a folder where ./media/ contains the source PNGs.

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.defineLayout({ name: "HM_WIDE", width: 20, height: 11.25 });
pres.layout = "HM_WIDE";
pres.author = "Téa Kovalenko";
pres.title = "Heliomachy — Pitch Deck";

// --------------------------------------------------------------------------
// Palette (taken from slide 6 swatch row)
// --------------------------------------------------------------------------
const COLOR = {
  void:   "07060A",
  bone:   "EFE7D6",
  ember:  "FF7A1A",
  glow:   "FFB763",
  cobalt: "5A7DFF",
  gold:   "C9A35A",
  // muted neutrals / surfaces used across slides
  parchment: "DAD2C0",     // slide 1 + 8 warm-stone background
  surface:   "8C8782",     // slide 3 + 4 warm-grey surface
  ink:       "1B1B22",     // off-black darker than void for type contrast
  dim:       "5A554F",     // muted text on parchment
  faint:     "9C9690",     // very muted text
};

const SERIF = "Georgia";
const MONO  = "Consolas";

// Tiny helpers ------------------------------------------------------------
const corner = (slide, x, y, dir, color = COLOR.bone, len = 0.35, w = 0.02) => {
  // dir: "tl" | "tr" | "bl" | "br"
  const horizX = dir.includes("l") ? x : x - len;
  const vertY  = dir.includes("t") ? y : y - len;
  const horizY = y;
  const vertX  = x;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: horizX, y: horizY, w: len, h: w, fill: { color }, line: { color, width: 0 },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: vertX, y: vertY, w, h: len, fill: { color }, line: { color, width: 0 },
  });
};

const frameCorners = (slide, x, y, w, h, color = COLOR.bone) => {
  corner(slide, x,       y,       "tl", color);
  corner(slide, x + w,   y,       "tr", color);
  corner(slide, x,       y + h,   "bl", color);
  corner(slide, x + w,   y + h,   "br", color);
};

// =========================================================================
// SLIDE 1 — Title
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.parchment };

  // Decorative concentric circles (using OVAL outlines)
  const cx = 10, cy = 5.5;
  [9.6, 7.8, 5.6, 3.4].forEach((d, i) => {
    s.addShape(pres.shapes.OVAL, {
      x: cx - d / 2, y: cy - d / 2, w: d, h: d,
      fill: { type: "solid", color: COLOR.parchment, transparency: 100 },
      line: { color: COLOR.glow, width: 0.5, transparency: i === 0 ? 70 : 50 },
    });
  });

  // Sun emblem at top
  s.addImage({ path: "./media/image-1-1.png", x: cx - 0.4, y: 0.85, w: 0.8, h: 0.8 });

  // Top corner brackets (small)
  corner(s, 0.4, 0.4, "tl", COLOR.faint, 0.3, 0.015);
  corner(s, 19.6, 0.4, "tr", COLOR.faint, 0.3, 0.015);
  corner(s, 0.4, 10.85, "bl", COLOR.faint, 0.3, 0.015);
  corner(s, 19.6, 10.85, "br", COLOR.faint, 0.3, 0.015);

  // Top tagline
  s.addText("A FEATURE IN DEVELOPMENT 2027", {
    x: 5, y: 1.85, w: 10, h: 0.4, align: "center", margin: 0,
    fontFace: MONO, fontSize: 16, color: COLOR.ember, charSpacing: 8, bold: true,
  });

  // HELIOMACHY title — huge serif, letterspaced
  s.addText("HELIOMACHY", {
    x: 0.5, y: 3.1, w: 19, h: 1.9, align: "center", valign: "middle", margin: 0,
    fontFace: SERIF, fontSize: 130, color: COLOR.bone, charSpacing: 30,
  });

  // Subtitle
  s.addText("— an original space epic in three acts —", {
    x: 4, y: 5.4, w: 12, h: 0.6, align: "center", margin: 0,
    fontFace: SERIF, fontSize: 26, italic: true, color: COLOR.dim,
  });

  // Three credits row
  const credits = [
    { label: "WRITTEN BY",    name: "Téa Kovalenko" },
    { label: "CO-WRITTEN BY", name: "Idris Mwangi"  },
    { label: "DIRECTED BY",   name: "Téa Kovalenko" },
  ];
  credits.forEach((c, i) => {
    const cx2 = 4 + i * 4;
    s.addText(c.label, {
      x: cx2, y: 8.6, w: 4, h: 0.3, align: "center", margin: 0,
      fontFace: MONO, fontSize: 10, color: COLOR.dim, charSpacing: 6,
    });
    s.addText(c.name, {
      x: cx2, y: 8.95, w: 4, h: 0.5, align: "center", margin: 0,
      fontFace: SERIF, fontSize: 22, italic: true, color: COLOR.gold,
    });
  });

  // Top row meta
  s.addText("FILM № 001 · PITCH", {
    x: 0.7, y: 0.55, w: 5, h: 0.3, margin: 0,
    fontFace: MONO, fontSize: 11, color: COLOR.dim, charSpacing: 6,
  });
  s.addText("CONFIDENTIAL", {
    x: 14.3, y: 0.55, w: 5, h: 0.3, align: "right", margin: 0,
    fontFace: MONO, fontSize: 11, color: COLOR.dim, charSpacing: 6,
  });

  // Bottom row meta
  s.addText("DRAFT IV · APRIL MMXXVI", {
    x: 0.7, y: 10.55, w: 6, h: 0.3, margin: 0,
    fontFace: MONO, fontSize: 11, color: COLOR.dim, charSpacing: 6,
  });
  s.addText("PROJECT : HM—001", {
    x: 13.3, y: 10.55, w: 6, h: 0.3, align: "right", margin: 0,
    fontFace: MONO, fontSize: 11, color: COLOR.dim, charSpacing: 6,
  });
}

// =========================================================================
// SLIDE 2 — The Logline (dark)
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.void };

  // Frame brackets
  frameCorners(s, 0.5, 0.5, 19, 10.25, COLOR.bone);

  // Top right slug
  s.addText("02 · LOGLINE", {
    x: 14, y: 0.55, w: 5.4, h: 0.35, align: "right", margin: 0,
    fontFace: MONO, fontSize: 12, color: COLOR.faint, charSpacing: 6,
  });

  // Sun image top-right
  s.addImage({ path: "./media/image-2-1.png", x: 17, y: 1.2, w: 1.8, h: 1.8 });

  // Big "02" + accent
  s.addText("02", {
    x: 1.2, y: 1.0, w: 2.5, h: 1.6, margin: 0,
    fontFace: SERIF, fontSize: 90, italic: true, color: COLOR.ember,
  });
  // underline accent
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.4, y: 2.55, w: 1.2, h: 0.025,
    fill: { color: COLOR.ember }, line: { color: COLOR.ember, width: 0 },
  });
  s.addText("THE LOGLINE", {
    x: 1.4, y: 2.65, w: 3.5, h: 0.35, margin: 0,
    fontFace: MONO, fontSize: 12, color: COLOR.bone, charSpacing: 8, bold: true,
  });

  // Pause symbol
  s.addText("II", {
    x: 4.3, y: 1.3, w: 0.7, h: 0.9, margin: 0,
    fontFace: SERIF, fontSize: 38, color: COLOR.gold, italic: true,
  });

  // Big quote — using rich text so the drop-cap O is huge orange
  s.addText([
    { text: "“", options: { fontSize: 110, color: COLOR.ember, italic: true } },
    { text: "On the eve of their ", options: { fontSize: 46, color: COLOR.bone } },
    { text: "sun’s collapse", options: { fontSize: 46, color: COLOR.glow, italic: true } },
    { text: ", two siblings — one an ", options: { fontSize: 46, color: COLOR.bone } },
    { text: "imperial astronomer", options: { fontSize: 46, color: COLOR.glow, italic: true } },
    { text: ", the other a ", options: { fontSize: 46, color: COLOR.bone } },
    { text: "heretic pilot", options: { fontSize: 46, color: COLOR.cobalt, italic: true } },
    { text: " — must choose between saving the empire that raised them, or the people it has burned.", options: { fontSize: 46, color: COLOR.bone } },
  ], {
    x: 5.0, y: 2.6, w: 13.6, h: 5.2,
    fontFace: SERIF, valign: "top", margin: 0, paraSpaceAfter: 0,
  });

  // Attribution
  s.addText("— from the treatment, page i —", {
    x: 11, y: 8.4, w: 7.6, h: 0.5, align: "right", margin: 0,
    fontFace: SERIF, fontSize: 22, italic: true, color: COLOR.bone,
  });
  s.addText("HELIOMACHY · 138 PAGES · THIRD DRAFT", {
    x: 11, y: 8.9, w: 7.6, h: 0.35, align: "right", margin: 0,
    fontFace: MONO, fontSize: 11, color: COLOR.faint, charSpacing: 6,
  });

  // Bottom meta strip
  const metaY = 9.85;
  const metas = [
    { label: "GENRE",   value: "SCI-FI EPIC" },
    { label: "RUNTIME", value: "~138 MIN"    },
    { label: "FORMAT",  value: "2.39 : 1"    },
    { label: "RATING",  value: "PG-13"       },
    { label: "BUDGET",  value: "$72M TARGET" },
  ];
  metas.forEach((m, i) => {
    const mx = 1.2 + i * 2.2;
    s.addText(m.label, {
      x: mx, y: metaY, w: 2.0, h: 0.3, margin: 0,
      fontFace: MONO, fontSize: 10, color: COLOR.faint, charSpacing: 5,
    });
    s.addText(m.value, {
      x: mx, y: metaY + 0.3, w: 2.0, h: 0.35, margin: 0,
      fontFace: MONO, fontSize: 11, color: COLOR.bone, charSpacing: 5, bold: true,
    });
  });
}

// =========================================================================
// SLIDE 3 — Worldbuilding (warm grey + ember disk)
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.surface };

  // Massive ember sun on the right (extends off the slide on right side)
  s.addShape(pres.shapes.OVAL, {
    x: 9.5, y: -1.5, w: 14, h: 14,
    fill: { color: COLOR.ember }, line: { color: COLOR.ember, width: 0 },
  });

  // Frame corners (faint)
  frameCorners(s, 0.5, 0.5, 19, 10.25, COLOR.faint);

  // Top slug
  s.addText("03 · WORLDBUILDING", {
    x: 1.0, y: 0.7, w: 6, h: 0.35, margin: 0,
    fontFace: MONO, fontSize: 12, color: COLOR.faint, charSpacing: 6,
  });
  s.addText("SECTOR · CORE / AETHEON", {
    x: 13, y: 10.4, w: 6.4, h: 0.35, align: "right", margin: 0,
    fontFace: MONO, fontSize: 11, color: COLOR.bone, transparency: 30, charSpacing: 6,
  });

  // Star chart inset (top-right, sits on the orange disk)
  s.addImage({ path: "./media/image-3-1.png", x: 15.5, y: 1.0, w: 3.4, h: 3.4 });

  // Section header
  s.addText("THE WORLD · SETTING", {
    x: 1.0, y: 2.0, w: 8, h: 0.4, margin: 0,
    fontFace: MONO, fontSize: 14, color: COLOR.cobalt, charSpacing: 8, bold: true,
  });

  // Big serif headline (rich-text with italic gold "called")
  s.addText([
    { text: "A dying star", options: { color: COLOR.bone, breakLine: true } },
    { text: "called",       options: { color: COLOR.glow, italic: true, breakLine: true } },
    { text: "Aetheon.",     options: { color: COLOR.bone } },
  ], {
    x: 1.0, y: 2.6, w: 9, h: 3.9, margin: 0,
    fontFace: SERIF, fontSize: 76, valign: "top",
  });

  // Body paragraph
  s.addText([
    { text: "The ", options: { color: COLOR.bone } },
    { text: "Solari Hegemony", options: { color: COLOR.bone, italic: true, bold: true } },
    { text: " has built its civilization in the warmth of a single sun. For nine centuries it has ruled forty worlds. Now Aetheon is failing — and only the empire’s astronomers know.", options: { color: COLOR.bone } },
  ], {
    x: 1.0, y: 6.6, w: 8.5, h: 1.8, margin: 0,
    fontFace: SERIF, fontSize: 18, valign: "top",
  });

  // Bottom stats row
  const statsY = 9.0;
  const stats = [
    { label: "STAR TYPE", value: "G2 V · DYING"  },
    { label: "WORLDS",    value: "40 · SOLARI"   },
    { label: "ERA",       value: "YEAR 902 P.A." },
    { label: "FORECAST",  value: "12 YEARS"      },
    { label: "POPULATION",value: "2.1 BILLION"   },
  ];
  const statW = 2.55;
  stats.forEach((m, i) => {
    const mx = 1.0 + i * (statW + 0.15);
    // top tick line
    s.addShape(pres.shapes.RECTANGLE, {
      x: mx, y: statsY, w: statW, h: 0.015,
      fill: { color: COLOR.bone }, line: { color: COLOR.bone, width: 0 },
    });
    s.addText(m.label, {
      x: mx, y: statsY + 0.12, w: statW + 0.5, h: 0.3, margin: 0,
      fontFace: MONO, fontSize: 11, color: COLOR.bone, charSpacing: 6,
    });
    s.addText(m.value, {
      x: mx, y: statsY + 0.5, w: statW + 0.5, h: 0.45, margin: 0,
      fontFace: MONO, fontSize: 16, color: COLOR.bone, charSpacing: 4, bold: true,
    });
  });
}

// =========================================================================
// SLIDE 4 — Dramatis Personae (two character cards)
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.surface };
  frameCorners(s, 0.5, 0.5, 19, 10.25, COLOR.faint);

  // Top slugs
  s.addText("04 · DRAMATIS PERSONAE", {
    x: 1.0, y: 0.7, w: 8, h: 0.35, margin: 0,
    fontFace: MONO, fontSize: 12, color: COLOR.faint, charSpacing: 6,
  });
  s.addText("02 · 02", {
    x: 16, y: 0.7, w: 3.4, h: 0.35, align: "right", margin: 0,
    fontFace: MONO, fontSize: 12, color: COLOR.faint, charSpacing: 6,
  });

  // Section + headline
  s.addText("04 · Two Siblings, Two Heresies", {
    x: 1, y: 1.4, w: 18, h: 0.45, align: "center", margin: 0,
    fontFace: MONO, fontSize: 15, color: COLOR.ember, charSpacing: 6, bold: true,
  });
  s.addText("The blood at the center.", {
    x: 1, y: 1.85, w: 18, h: 0.85, align: "center", margin: 0,
    fontFace: SERIF, fontSize: 40, italic: true, color: COLOR.bone,
  });

  // Two cards side by side
  const cards = [
    {
      x: 1.2,
      img: "./media/image-4-1.png",
      subj: "SUBJ · 01",
      file: "FILE / KAEL.V",
      house: "HOUSE VIRE · THE ASTRONOMER",
      houseColor: COLOR.ember,
      name: "Kael Vire",
      role: "elder son · imperial astronomer · age 34",
      bio: "Brilliant, bound by oath. Has spent ten years calculating the exact hour the sun will die — and lying about it to the council that raised him.",
      allegiance: "SOLARI COUNCIL",
      trait: "LOYALTY AS INHERITANCE",
    },
    {
      x: 10.4,
      img: "./media/image-4-2.png",
      subj: "SUBJ · 02",
      file: "FILE / MIRA.V",
      house: "HOUSE VIRE (EXILED) · THE HERETIC",
      houseColor: COLOR.cobalt,
      name: "Mira Vire",
      role: "younger sister · pilot, exile · age 29",
      bio: "Disowned at twenty for flying refugees off a burning colony. Now leads a fleet the empire calls pirates, and the outer worlds call something closer to a saint.",
      allegiance: "THE OUTER FORTY",
      trait: "MERCY AS REBELLION",
    },
  ];

  cards.forEach(c => {
    // Image card
    s.addImage({ path: c.img, x: c.x, y: 3.0, w: 8.4, h: 3.5 });
    // Inner frame brackets on image
    frameCorners(s, c.x + 0.05, 3.05, 8.3, 3.4, COLOR.bone);
    // Bottom strip on image
    s.addText(c.subj, {
      x: c.x + 0.15, y: 6.05, w: 3, h: 0.35, margin: 0,
      fontFace: MONO, fontSize: 11, color: COLOR.bone, charSpacing: 6,
    });
    s.addText(c.file, {
      x: c.x + 5.2, y: 6.05, w: 3.1, h: 0.35, align: "right", margin: 0,
      fontFace: MONO, fontSize: 11, color: COLOR.bone, charSpacing: 6,
    });

    // House line
    s.addText(c.house, {
      x: c.x, y: 6.7, w: 8.4, h: 0.35, margin: 0,
      fontFace: MONO, fontSize: 12, color: c.houseColor, charSpacing: 6, bold: true,
    });
    // Name
    s.addText(c.name, {
      x: c.x, y: 7.1, w: 8.4, h: 0.6, margin: 0,
      fontFace: SERIF, fontSize: 36, color: COLOR.bone,
    });
    // Role
    s.addText(c.role, {
      x: c.x, y: 7.75, w: 8.4, h: 0.4, margin: 0,
      fontFace: SERIF, fontSize: 16, italic: true, color: COLOR.bone,
    });
    // Bio
    s.addText(c.bio, {
      x: c.x, y: 8.25, w: 8.4, h: 1.1, margin: 0,
      fontFace: SERIF, fontSize: 14, color: COLOR.bone,
    });
    // Allegiance + trait row
    s.addText("ALLEGIANCE", {
      x: c.x, y: 9.55, w: 3, h: 0.3, margin: 0,
      fontFace: MONO, fontSize: 9, color: COLOR.faint, charSpacing: 5,
    });
    s.addText("DEFINING TRAIT", {
      x: c.x + 3.5, y: 9.55, w: 4, h: 0.3, margin: 0,
      fontFace: MONO, fontSize: 9, color: COLOR.faint, charSpacing: 5,
    });
    s.addText(c.allegiance, {
      x: c.x, y: 9.85, w: 3.5, h: 0.35, margin: 0,
      fontFace: MONO, fontSize: 11, color: COLOR.bone, charSpacing: 5, bold: true,
    });
    s.addText(c.trait, {
      x: c.x + 3.5, y: 9.85, w: 5, h: 0.35, margin: 0,
      fontFace: MONO, fontSize: 11, color: COLOR.bone, charSpacing: 5, bold: true,
    });
  });
}

// =========================================================================
// SLIDE 5 — Three Acts structure (dark)
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.void };
  frameCorners(s, 0.5, 0.5, 19, 10.25, COLOR.bone);

  // Top slug
  s.addText("05 · STRUCTURE", {
    x: 1.0, y: 0.7, w: 6, h: 0.35, margin: 0,
    fontFace: MONO, fontSize: 12, color: COLOR.faint, charSpacing: 6,
  });
  s.addText("3-ACT · 138 PAGES", {
    x: 14, y: 0.7, w: 5.4, h: 0.35, align: "right", margin: 0,
    fontFace: MONO, fontSize: 12, color: COLOR.faint, charSpacing: 6,
  });

  // Bottom corner labels
  s.addText("DRAFT IV", {
    x: 1.0, y: 10.5, w: 4, h: 0.3, margin: 0,
    fontFace: MONO, fontSize: 11, color: COLOR.faint, charSpacing: 6,
  });
  s.addText("RUNTIME · 138 MIN", {
    x: 14, y: 10.5, w: 5.4, h: 0.3, align: "right", margin: 0,
    fontFace: MONO, fontSize: 11, color: COLOR.faint, charSpacing: 6,
  });

  // Section + headline
  s.addText("05 · Three Acts", {
    x: 1.0, y: 1.4, w: 8, h: 0.45, margin: 0,
    fontFace: MONO, fontSize: 15, color: COLOR.ember, charSpacing: 6, bold: true,
  });
  s.addText([
    { text: "The shape of ", options: { color: COLOR.bone } },
    { text: "the story",     options: { color: COLOR.glow, italic: true } },
    { text: ".",              options: { color: COLOR.bone } },
  ], {
    x: 1.0, y: 1.95, w: 18, h: 1.1, margin: 0,
    fontFace: SERIF, fontSize: 60,
  });

  // Timeline ticks + labels
  const tlY = 3.5;
  const tlX0 = 1.0, tlX1 = 19.0;
  // The three break points (page numbers) divide the timeline at 1, 38, 96, 138
  const total = 138;
  const tlPts = [0, 38, 96, 138];
  const tlLabels = ["P. 1", "P. 38", "P. 96", "P. 138"];
  // page-number labels above
  tlPts.forEach((p, i) => {
    const px = tlX0 + ((tlX1 - tlX0) * p) / total;
    const align = i === 0 ? "left" : (i === tlPts.length - 1 ? "right" : "left");
    const lx = i === tlPts.length - 1 ? px - 1.2 : px - 0.05;
    s.addText(tlLabels[i], {
      x: lx, y: tlY, w: 1.4, h: 0.3, margin: 0, align,
      fontFace: MONO, fontSize: 11, color: COLOR.bone, charSpacing: 6, bold: true,
    });
  });
  // horizontal line
  s.addShape(pres.shapes.RECTANGLE, {
    x: tlX0, y: tlY + 0.5, w: tlX1 - tlX0, h: 0.015,
    fill: { color: COLOR.faint }, line: { color: COLOR.faint, width: 0 },
  });
  // tick marks
  tlPts.forEach((p) => {
    const px = tlX0 + ((tlX1 - tlX0) * p) / total;
    s.addShape(pres.shapes.RECTANGLE, {
      x: px - 0.01, y: tlY + 0.4, w: 0.02, h: 0.22,
      fill: { color: COLOR.bone }, line: { color: COLOR.bone, width: 0 },
    });
  });

  // Three columns
  const acts = [
    {
      n: "I", label: "Act One", title: "The Lie",
      h: "A truth too large to be told.",
      body: "Kael finishes his calculations. The council orders silence and a war on the outer colonies — to consolidate the empire before the sun fails. He obeys. Mira intercepts a coded transmission.",
      meta: "PAGES 1 — 38 · 28 MINUTES",
    },
    {
      n: "II", label: "Act Two", title: "The Crossing",
      h: "A sister, a fleet, a heresy.",
      body: "Mira returns to the capital after nine years to abduct her brother and the truth. They cross seven worlds at sublight, hunted by the empire and the cult that has begun to worship the dying star.",
      meta: "PAGES 39 — 96 · 60 MINUTES",
    },
    {
      n: "III", label: "Act Three", title: "The Witness",
      h: "What an empire owes the dark.",
      body: "At Aetheon’s last solstice, the siblings broadcast the calculations to all forty worlds. The empire cannot answer the truth with violence fast enough. The sun goes out on a civilization that finally knows.",
      meta: "PAGES 97 — 138 · 50 MINUTES",
    },
  ];

  const colW = 5.7;
  const gutter = 0.5;
  const startX = 1.0;
  const colY = 4.5;

  acts.forEach((a, i) => {
    const cx = startX + i * (colW + gutter);

    // Roman numeral
    s.addText(a.n, {
      x: cx, y: colY, w: 1.3, h: 0.9, margin: 0,
      fontFace: SERIF, fontSize: 50, italic: true, color: COLOR.ember,
    });
    // "Act One" small
    s.addText(a.label, {
      x: cx + 0.95, y: colY + 0.15, w: 3, h: 0.3, margin: 0,
      fontFace: MONO, fontSize: 11, color: COLOR.ember, charSpacing: 6, bold: true,
    });
    // The Lie
    s.addText(a.title, {
      x: cx + 0.95, y: colY + 0.45, w: 3.5, h: 0.35, margin: 0,
      fontFace: SERIF, fontSize: 16, italic: true, color: COLOR.bone,
    });

    // Divider
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: colY + 1.15, w: colW, h: 0.015,
      fill: { color: COLOR.faint }, line: { color: COLOR.faint, width: 0 },
    });

    // Headline
    s.addText(a.h, {
      x: cx, y: colY + 1.3, w: colW, h: 1.0, margin: 0,
      fontFace: SERIF, fontSize: 24, italic: true, color: COLOR.bone,
    });

    // Body
    s.addText(a.body, {
      x: cx, y: colY + 2.45, w: colW, h: 2.4, margin: 0,
      fontFace: SERIF, fontSize: 14, color: COLOR.bone,
    });

    // Meta divider + label
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: colY + 4.95, w: colW, h: 0.015,
      fill: { color: COLOR.faint }, line: { color: COLOR.faint, width: 0 },
    });
    s.addText(a.meta, {
      x: cx, y: colY + 5.05, w: colW, h: 0.3, margin: 0,
      fontFace: MONO, fontSize: 11, color: COLOR.ember, charSpacing: 6, bold: true,
    });
  });
}

// =========================================================================
// SLIDE 6 — Tone Board (dark, 6 frames)
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.void };
  frameCorners(s, 0.5, 0.5, 19, 10.25, COLOR.bone);

  // Top headline
  s.addText([
    { text: "A visual language for a sun in ", options: { color: COLOR.bone } },
    { text: "slow collapse", options: { color: COLOR.glow, italic: true } },
    { text: ".",              options: { color: COLOR.bone } },
  ], {
    x: 1.0, y: 0.65, w: 12, h: 0.7, margin: 0,
    fontFace: SERIF, fontSize: 30, italic: true,
  });

  // Top right slug
  s.addText("06 · TONE BOARD", {
    x: 14, y: 0.7, w: 5.4, h: 0.35, align: "right", margin: 0,
    fontFace: MONO, fontSize: 13, color: COLOR.ember, charSpacing: 6, bold: true,
  });
  s.addText("six frames · one palette", {
    x: 14, y: 1.05, w: 5.4, h: 0.3, align: "right", margin: 0,
    fontFace: SERIF, fontSize: 13, italic: true, color: COLOR.faint,
  });

  // 6 tone frames laid out as: big left (2x1), 2 stacked center, big right + bottom
  // Left big (Aetheon hour zero)  +  bottom-left big (Deep-space rendezvous)
  // Center top + center bottom (Observatory + Outer worlds)
  // Right top + right bottom (Capital corridor + Last solstice)
  const frames = [
    { x: 1.0,  y: 1.85, w: 8.5, h: 3.6, fill: COLOR.ember, img: "./media/image-6-1.png",
      caption: "Aetheon, hour zero",  pl: "PL · 001",
      tag: "SOLAR FLARE · THE SUN CLOSE ENOUGH TO TOUCH", lightCaption: false },
    { x: 1.0,  y: 5.6,  w: 8.5, h: 3.6, fill: "121420", img: "./media/image-6-4.png",
      caption: "Deep-space rendezvous", pl: "PL · 004",
      tag: "MIRA’S FLEET · EMBER MEETING COBALT", lightCaption: true },
    { x: 9.7,  y: 1.85, w: 4.4, h: 3.6, fill: "0F1018", img: "./media/image-6-2.png",
      caption: "Observatory, night", pl: "PL · 002",
      tag: "THE CAPITAL · MARBLE & INSTRUMENTATION", lightCaption: true },
    { x: 9.7,  y: 5.6,  w: 4.4, h: 3.6, fill: "8C8782", img: "./media/image-6-5.png",
      caption: "Outer worlds", pl: "PL · 005",
      tag: "DUST COLONY · THE BURNED PERIPHERY", lightCaption: true },
    { x: 14.3, y: 1.85, w: 4.4, h: 3.6, fill: "1A2342", img: "./media/image-6-3.png",
      caption: "Capital corridor", pl: "PL · 003",
      tag: "COBALT GEOMETRY · SEAT OF THE HEGEMONY", lightCaption: true },
    { x: 14.3, y: 5.6,  w: 4.4, h: 3.6, fill: "C84D2E", img: "./media/image-6-6.png",
      caption: "Last solstice", pl: "PL · 006",
      tag: "ECLIPSE · THE BROADCAST OF THE TRUTH", lightCaption: false },
  ];

  frames.forEach(f => {
    // Background panel
    s.addShape(pres.shapes.RECTANGLE, {
      x: f.x, y: f.y, w: f.w, h: f.h,
      fill: { color: f.fill }, line: { color: f.fill, width: 0 },
    });
    // Image (sized to cover panel)
    s.addImage({ path: f.img, x: f.x, y: f.y, w: f.w, h: f.h, sizing: { type: "cover", w: f.w, h: f.h } });
    // Caption (top-left, italic serif)
    const capColor = f.lightCaption ? COLOR.bone : COLOR.bone;
    s.addText(f.caption, {
      x: f.x + 0.15, y: f.y + 0.1, w: f.w - 0.3, h: 0.35, margin: 0,
      fontFace: SERIF, fontSize: 13, italic: true, color: capColor,
    });
    // Plate number (top-right)
    s.addText(f.pl, {
      x: f.x, y: f.y + 0.1, w: f.w - 0.15, h: 0.3, align: "right", margin: 0,
      fontFace: MONO, fontSize: 10, color: COLOR.bone, charSpacing: 5,
    });
    // Tag (bottom)
    s.addText(f.tag, {
      x: f.x + 0.15, y: f.y + f.h - 0.55, w: f.w - 0.3, h: 0.45, margin: 0,
      fontFace: MONO, fontSize: 10, color: COLOR.bone, charSpacing: 5, bold: true,
    });
  });

  // Palette swatch row (bottom)
  const palY = 9.5;
  s.addText("PALETTE", {
    x: 1.0, y: palY + 0.1, w: 1.5, h: 0.4, margin: 0,
    fontFace: MONO, fontSize: 11, color: COLOR.faint, charSpacing: 6,
  });
  const pal = [
    { c: COLOR.void,   label: "VOID",   hex: "07060A" },
    { c: COLOR.bone,   label: "BONE",   hex: "EFE7D6" },
    { c: COLOR.ember,  label: "EMBER",  hex: "FF7A1A" },
    { c: COLOR.glow,   label: "GLOW",   hex: "FFB763" },
    { c: COLOR.cobalt, label: "COBALT", hex: "5A7DFF" },
    { c: COLOR.gold,   label: "GOLD",   hex: "C9A35A" },
  ];
  pal.forEach((p, i) => {
    const px = 2.6 + i * 2.7;
    s.addShape(pres.shapes.RECTANGLE, {
      x: px, y: palY + 0.1, w: 0.5, h: 0.4,
      fill: { color: p.c }, line: { color: COLOR.faint, width: 0.5 },
    });
    s.addText(`${p.label} · ${p.hex}`, {
      x: px + 0.6, y: palY + 0.15, w: 2.2, h: 0.35, margin: 0,
      fontFace: MONO, fontSize: 10, color: COLOR.bone, charSpacing: 4,
    });
  });
}

// =========================================================================
// SLIDE 7 — Market Comparables (dark, 4-up grid)
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.void };
  frameCorners(s, 0.5, 0.5, 19, 10.25, COLOR.bone);

  // Section
  s.addText("07 · Market Comparables", {
    x: 1.0, y: 0.95, w: 10, h: 0.45, margin: 0,
    fontFace: MONO, fontSize: 16, color: COLOR.cobalt, charSpacing: 6, bold: true,
  });
  // Headline
  s.addText([
    { text: "In ",            options: { color: COLOR.bone } },
    { text: "conversation",   options: { color: COLOR.glow, italic: true } },
    { text: " with\nthe canon.", options: { color: COLOR.bone } },
  ], {
    x: 1.0, y: 1.55, w: 12, h: 2.0, margin: 0,
    fontFace: SERIF, fontSize: 54, italic: false,
  });
  // Right small caption
  s.addText("A SELECTED FOUR\nAGAINST WHICH\nHELIOMACHY MEASURES\nITS AMBITION", {
    x: 14.5, y: 2.7, w: 5, h: 1.5, align: "right", margin: 0,
    fontFace: MONO, fontSize: 10, color: COLOR.faint, charSpacing: 6,
  });

  // Divider lines top of grid (left and right)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.0, y: 4.5, w: 8.7, h: 0.012,
    fill: { color: COLOR.faint }, line: { color: COLOR.faint, width: 0 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.3, y: 4.5, w: 8.7, h: 0.012,
    fill: { color: COLOR.faint }, line: { color: COLOR.faint, width: 0 },
  });

  // 4 entries: 2 columns × 2 rows
  const comps = [
    {
      x: 1.0, y: 4.7, img: "./media/image-7-1.png", year: "2021 · VILLENEUVE",
      title: "Dune",
      blurb: "Operatic scale, sand-and-sun austerity, a dynastic family at the center of a galactic crisis.",
      stat: "$402M · THEATRICAL · 6 OSCARS",
    },
    {
      x: 10.3, y: 4.7, img: "./media/image-7-2.png", year: "2016 · VILLENEUVE",
      title: "Arrival",
      blurb: "Science as moral crisis. A protagonist who knows what is coming and must decide what to do with it.",
      stat: "$203M · 8 NOMINATIONS",
    },
    {
      x: 1.0, y: 7.6, img: "./media/image-7-3.png", year: "2006 · CUARÓN",
      title: "Children of Men",
      blurb: "An empire in slow collapse. Long-take craft, lived-in worldbuilding, a chase across a fracturing world.",
      stat: "$70M · CULT CANON",
    },
    {
      x: 10.3, y: 7.6, img: "./media/image-7-4.png", year: "2018 · GARLAND",
      title: "Annihilation",
      blurb: "A rhythm of grief and discovery, scored with dread and the sublime — and a sister at the center.",
      stat: "$43M · AUTEUR",
    },
  ];

  comps.forEach(c => {
    // Image left
    s.addImage({ path: c.img, x: c.x, y: c.y, w: 2.1, h: 1.4 });
    // Year tag
    s.addText(c.year, {
      x: c.x + 2.3, y: c.y, w: 6.0, h: 0.3, margin: 0,
      fontFace: MONO, fontSize: 10, color: COLOR.ember, charSpacing: 6, bold: true,
    });
    // Title
    s.addText(c.title, {
      x: c.x + 2.3, y: c.y + 0.25, w: 6.5, h: 0.5, margin: 0,
      fontFace: SERIF, fontSize: 26, italic: true, color: COLOR.bone,
    });
    // Blurb
    s.addText(c.blurb, {
      x: c.x + 2.3, y: c.y + 0.85, w: 6.4, h: 0.9, margin: 0,
      fontFace: SERIF, fontSize: 13, color: COLOR.bone,
    });
    // Stat tag (boxed)
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x + 2.3, y: c.y + 1.85, w: 3.6, h: 0.36,
      fill: { color: COLOR.void }, line: { color: COLOR.faint, width: 0.5 },
    });
    s.addText(c.stat, {
      x: c.x + 2.3, y: c.y + 1.86, w: 3.6, h: 0.34, align: "center", margin: 0,
      fontFace: MONO, fontSize: 10, color: COLOR.bone, charSpacing: 5, bold: true,
    });
  });

  // Bottom-right combined stats
  s.addText("$718M", {
    x: 12.5, y: 10.0, w: 3.5, h: 0.7, align: "right", margin: 0,
    fontFace: SERIF, fontSize: 40, italic: true, color: COLOR.glow,
  });
  s.addText("11", {
    x: 17, y: 10.0, w: 2, h: 0.7, align: "right", margin: 0,
    fontFace: SERIF, fontSize: 40, italic: true, color: COLOR.glow,
  });
  s.addText("COMBINED BOX OFFICE", {
    x: 12.5, y: 10.6, w: 3.5, h: 0.3, align: "right", margin: 0,
    fontFace: MONO, fontSize: 9, color: COLOR.faint, charSpacing: 6,
  });
  s.addText("ACADEMY AWARDS", {
    x: 17, y: 10.6, w: 2, h: 0.3, align: "right", margin: 0,
    fontFace: MONO, fontSize: 9, color: COLOR.faint, charSpacing: 6,
  });
}

// =========================================================================
// SLIDE 8 — End / Quote
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.parchment };
  frameCorners(s, 0.5, 0.5, 19, 10.25, COLOR.faint);

  // Top slug
  s.addText("08 · END", {
    x: 1.0, y: 0.7, w: 4, h: 0.35, margin: 0,
    fontFace: MONO, fontSize: 12, color: COLOR.dim, charSpacing: 6,
  });
  s.addText("— FIN —", {
    x: 15, y: 0.7, w: 4, h: 0.35, align: "right", margin: 0,
    fontFace: MONO, fontSize: 12, color: COLOR.dim, charSpacing: 6,
  });

  // Eclipse image at top center
  s.addImage({ path: "./media/image-8-1.png", x: 8.6, y: 1.1, w: 2.8, h: 2.8 });

  // Big quote
  s.addText([
    { text: "“We were given ", options: { color: COLOR.ink } },
    { text: "a sun",            options: { color: COLOR.glow, italic: true } },
    { text: ", and\nwe mistook it for ", options: { color: COLOR.ink } },
    { text: "forever",          options: { color: COLOR.glow, italic: true } },
    { text: ".”",                options: { color: COLOR.ink } },
  ], {
    x: 1.5, y: 4.2, w: 17, h: 1.6, align: "center", margin: 0,
    fontFace: SERIF, fontSize: 42, italic: true,
  });

  // Attribution lines
  s.addText("— Kael Vire, the final broadcast —", {
    x: 1.5, y: 6.1, w: 17, h: 0.5, align: "center", margin: 0,
    fontFace: SERIF, fontSize: 18, italic: true, color: COLOR.dim,
  });
  s.addText("HELIOMACHY · ACT III · SCENE XXIX", {
    x: 1.5, y: 6.65, w: 17, h: 0.4, align: "center", margin: 0,
    fontFace: MONO, fontSize: 12, color: COLOR.dim, charSpacing: 6,
  });

  // Three diamond accents
  const diaY = 8.4;
  [9.3, 10.0, 10.7].forEach(dx => {
    s.addShape(pres.shapes.DIAMOND, {
      x: dx, y: diaY, w: 0.18, h: 0.18,
      fill: { color: COLOR.ember }, line: { color: COLOR.ember, width: 0 },
    });
  });

  // Bottom 3 columns
  const bottomY = 9.3;
  const bcols = [
    { label: "WRITTEN BY",  value: "Kovalenko & Mwangi" },
    { label: "ANTICIPATED", value: "MMXXVII" },
    { label: "CONTACT",     value: "heliomachy@studio.film" },
  ];
  bcols.forEach((b, i) => {
    const bx = 2.2 + i * 5.4;
    s.addText(b.label, {
      x: bx, y: bottomY, w: 4.8, h: 0.3, align: "center", margin: 0,
      fontFace: MONO, fontSize: 11, color: COLOR.ember, charSpacing: 6, bold: true,
    });
    s.addText(b.value, {
      x: bx, y: bottomY + 0.4, w: 4.8, h: 0.5, align: "center", margin: 0,
      fontFace: SERIF, fontSize: 22, italic: true, color: COLOR.ink,
    });
  });
}

// --------------------------------------------------------------------------
pres.writeFile({ fileName: "heliomachy.pptx" })
  .then(f => console.log("Wrote", f));
