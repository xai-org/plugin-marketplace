// Chic Interior · Partnership Deck 2026
// Rebuild using pptxgenjs. Run: node build.js
// Output: Interior_Design.pptx

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";   // 13.333 x 7.5 (matches the 16:9 source rendering)
pres.title  = "Chic Interior · Partnership Deck 2026";
pres.author = "Chic Interior";

// ---------------------------------------------------------------------------
// Design tokens
// ---------------------------------------------------------------------------
const SW = 13.333;   // slide width
const SH = 7.5;      // slide height

const C = {
  bodyLight:   "F4F2EB",   // off-white body background (slides 1-5,7,8)
  bodyWarm:    "E8E5D6",   // warm greige background (slide 4)
  bodyDark:    "141414",   // dark background (slides 6, 9)
  imageBlock:  "DDD8C7",   // placeholder image block tone
  imageBlockDk:"2A2A28",   // image block tone on dark bg (slide 9 not needed)
  captionBg:   "EFEBDE",   // caption overlay on image blocks
  ink:         "141414",   // primary text on light bg
  inkSoft:     "3C3A34",   // secondary dark text
  mute:        "8A8678",   // muted / small caps on light
  muteLight:   "A8A496",   // muted on dark
  rule:        "C9C3B2",   // hairline on light
  ruleDark:    "3A3830",   // hairline on dark
  onDark:      "F4F2EB",   // text on dark
  onDarkMute:  "9A9689",   // muted text on dark
};

const F = {
  head: "Helvetica Neue",  // display / headlines
  body: "Helvetica Neue",  // body
  mono: "Helvetica Neue",  // small caps eyebrows & footers
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Small-caps "eyebrow" label (e.g. "01 · THE STUDIO")
function eyebrow(slide, text, opts = {}) {
  slide.addText(text, {
    x: opts.x ?? 0.7,
    y: opts.y ?? 0.55,
    w: opts.w ?? 8,
    h: 0.35,
    fontFace: F.mono,
    fontSize: opts.fontSize ?? 10,
    color: opts.color ?? C.mute,
    charSpacing: 6,
    bold: false,
    margin: 0,
  });
}

// Running footer: brand + page number
function footer(slide, pageNum, onDark = false) {
  const col = onDark ? C.onDarkMute : C.mute;
  slide.addText("CHIC INTERIOR", {
    x: 0.7, y: SH - 0.5, w: 4, h: 0.3,
    fontFace: F.mono, fontSize: 9, color: col, charSpacing: 5, margin: 0,
  });
  slide.addText(`${String(pageNum).padStart(2, "0")} / 09`, {
    x: SW - 2.0, y: SH - 0.5, w: 1.3, h: 0.3,
    fontFace: F.mono, fontSize: 9, color: col, charSpacing: 5,
    align: "right", margin: 0,
  });
}

// Thin horizontal rule
function rule(slide, x, y, w, color = C.rule) {
  slide.addShape("line", {
    x, y, w, h: 0,
    line: { color, width: 0.5 },
  });
}

// Image placeholder block with a caption strip near the bottom-left
function imageBlock(slide, x, y, w, h, caption, opts = {}) {
  const bg = opts.bg ?? C.imageBlock;
  slide.addShape("rect", {
    x, y, w, h,
    fill: { color: bg },
    line: { color: bg, width: 0 },
  });
  if (caption) {
    const capH = opts.capH ?? 0.5;
    // Caption sits inset from the left edge of the tile.
    // Default width uses most of the tile, bounded to keep the proportion nice.
    const capW = opts.capW ?? Math.min(w - 0.4, 4.2);
    const capX = x + 0.2;
    const capY = y + h - capH - 0.2;
    slide.addShape("rect", {
      x: capX, y: capY, w: capW, h: capH,
      fill: { color: C.captionBg },
      line: { color: C.rule, width: 0.5 },
    });
    slide.addText(caption, {
      x: capX, y: capY, w: capW, h: capH,
      fontFace: F.mono, fontSize: 9, color: C.inkSoft,
      charSpacing: 4, align: "center", valign: "middle",
      margin: 0.05,
    });
  }
}

// ---------------------------------------------------------------------------
// Slide 1 — Title / Cover
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.bodyLight };

  // Right half: full-bleed hero "image"
  const heroX = 6.55;
  const heroW = SW - heroX;
  imageBlock(
    s,
    heroX, 0, heroW, SH,
    "IMG · FULL-BLEED HERO · LIVING ROOM, BEL AIR RESIDENCE",
    { capW: heroW - 0.3, capH: 0.45 }
  );

  // Brand lockup (top-left)
  s.addText("Chic Interior", {
    x: 0.7, y: 0.55, w: 5, h: 0.5,
    fontFace: F.head, fontSize: 18, italic: true, color: C.ink, margin: 0,
  });
  s.addText("LOS ANGELES", {
    x: 0.7, y: 1.0, w: 5, h: 0.3,
    fontFace: F.mono, fontSize: 10, color: C.mute, charSpacing: 6, margin: 0,
  });

  // Eyebrow above headline
  s.addText("PARTNERSHIP DECK  ·  2026", {
    x: 0.7, y: 2.35, w: 6, h: 0.3,
    fontFace: F.mono, fontSize: 11, color: C.mute, charSpacing: 7, margin: 0,
  });

  // Headline
  s.addText(
    [
      { text: "Chic ",      options: { fontFace: F.head, fontSize: 66, color: C.ink } },
      { text: "Interior",   options: { fontFace: F.head, fontSize: 66, color: C.ink, italic: true } },
      { text: ".",          options: { fontFace: F.head, fontSize: 66, color: C.ink } },
    ],
    { x: 0.7, y: 2.8, w: 6, h: 1.4, margin: 0, valign: "top" }
  );

  // Tagline
  s.addText(
    "Furnishing & styling for the luxury\nhomes of Los Angeles County.",
    {
      x: 0.7, y: 5.0, w: 5.6, h: 1.3,
      fontFace: F.head, fontSize: 22, italic: true,
      color: C.inkSoft, lineSpacingMultiple: 1.25, margin: 0,
    }
  );

  // Footnote
  s.addText("Prepared for development & brokerage partners", {
    x: 0.7, y: SH - 0.6, w: 6, h: 0.3,
    fontFace: F.body, fontSize: 10, color: C.mute, margin: 0,
  });
}

// ---------------------------------------------------------------------------
// Slide 2 — The Studio
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.bodyLight };

  // Right half image
  const heroX = 6.55;
  imageBlock(
    s,
    heroX, 0, SW - heroX, SH,
    "IMG · STUDIO PORTRAIT · WARM MATERIAL VIGNETTE",
    { capW: SW - heroX - 0.3, capH: 0.45 }
  );

  eyebrow(s, "01  ·  THE STUDIO");

  // Headline (mixed roman + italic). Render over two explicit lines
  // so we can use a single fitted line-width per line and avoid awkward wrap.
  s.addText(
    [
      { text: "A Los Angeles studio",        options: { fontFace: F.head, fontSize: 34, color: C.ink, breakLine: true } },
      { text: "for ",                         options: { fontFace: F.head, fontSize: 34, color: C.ink } },
      { text: "considered living",            options: { fontFace: F.head, fontSize: 34, color: C.ink, italic: true } },
      { text: ".",                            options: { fontFace: F.head, fontSize: 34, color: C.ink } },
    ],
    { x: 0.7, y: 1.6, w: 5.8, h: 2.0, margin: 0, lineSpacingMultiple: 1.1, valign: "top" }
  );

  // Body paragraphs
  s.addText(
    "Chic Interior is a boutique furnishing and styling practice serving single-family residences, estates, and development projects across Los Angeles County.",
    {
      x: 0.7, y: 3.8, w: 5.5, h: 1.3,
      fontFace: F.body, fontSize: 13, color: C.inkSoft,
      lineSpacingMultiple: 1.45, margin: 0,
    }
  );
  s.addText(
    "We partner with developers and brokerages to deliver finished interiors that photograph beautifully, sell confidently, and live effortlessly.",
    {
      x: 0.7, y: 5.1, w: 5.5, h: 1.3,
      fontFace: F.body, fontSize: 13, color: C.inkSoft,
      lineSpacingMultiple: 1.45, margin: 0,
    }
  );

  // Bottom meta line (inside left column)
  s.addText("Founded 2026  ·  Los Angeles, CA", {
    x: 0.7, y: SH - 0.5, w: 5, h: 0.3,
    fontFace: F.body, fontSize: 10, color: C.mute, margin: 0,
  });
}

// ---------------------------------------------------------------------------
// Slide 3 — Our Discipline (three columns)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.bodyLight };

  eyebrow(s, "02  ·  OUR DISCIPLINE");

  // Big headline
  s.addText("Furnishing & styling, end to end.", {
    x: 0.7, y: 0.95, w: 12, h: 1.0,
    fontFace: F.head, fontSize: 40, color: C.ink, margin: 0,
  });

  // Three-column grid
  const colY = 2.55;
  const colW = 3.9;
  const gap  = 0.2;
  const colX = [0.7, 0.7 + colW + gap, 0.7 + 2 * (colW + gap)];

  const cols = [
    {
      num: "01",
      title: "Furnishing",
      body: "Casegoods, upholstery, lighting, rugs, and objet — specified, procured, and installed. Trade-sourced and bench-made where it matters.",
      list: ["Custom upholstery", "Lighting & window treatments", "Rugs & textiles", "Art & accessories"],
    },
    {
      num: "02",
      title: "Styling",
      body: "Final-layer composition: books, ceramics, linens, florals. The ten-foot read and the three-foot read, both resolved.",
      list: ["Tabletop & pantry", "Bookshelves & vignettes", "Linens & bedding", "Florals & botanicals"],
    },
    {
      num: "03",
      title: "Staging for Sale",
      body: "Market-ready staging for listings above $5M. Installed in days, photographed the same week, de-installed on your timeline.",
      list: ["48-hour install", "Photo-ready on delivery", "Insured transport & storage", "Flexible strike windows"],
    },
  ];

  cols.forEach((c, i) => {
    const x = colX[i];
    // top rule
    rule(s, x, colY, colW);
    // number
    s.addText(c.num, {
      x, y: colY + 0.15, w: colW, h: 0.4,
      fontFace: F.body, fontSize: 14, color: C.mute, margin: 0,
    });
    // title
    s.addText(c.title, {
      x, y: colY + 0.55, w: colW, h: 0.55,
      fontFace: F.head, fontSize: 22, color: C.ink, margin: 0,
    });
    // body
    s.addText(c.body, {
      x, y: colY + 1.2, w: colW, h: 1.45,
      fontFace: F.body, fontSize: 12, color: C.inkSoft,
      lineSpacingMultiple: 1.45, margin: 0,
    });
    // middle rule
    rule(s, x, colY + 2.75, colW);
    // list
    const items = c.list.map((t, j) => ({
      text: `— ${t}`,
      options: { italic: true, breakLine: j < c.list.length - 1 },
    }));
    s.addText(items, {
      x, y: colY + 2.9, w: colW, h: 1.55,
      fontFace: F.body, fontSize: 12, color: C.inkSoft,
      lineSpacingMultiple: 1.4, margin: 0,
    });
  });

  footer(s, 3);
}

// ---------------------------------------------------------------------------
// Slide 4 — Who We Serve (three columns on warm bg)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.bodyWarm };

  eyebrow(s, "03  ·  WHO WE SERVE");

  s.addText("Built for the development partner.", {
    x: 0.7, y: 0.95, w: 12, h: 1.0,
    fontFace: F.head, fontSize: 40, color: C.ink, margin: 0,
  });

  const colY = 2.55;
  const colW = 3.9;
  const gap  = 0.2;
  const colX = [0.7, 0.7 + colW + gap, 0.7 + 2 * (colW + gap)];

  const cols = [
    {
      title: "Luxury Developers",
      body: "Spec homes $5M – $40M. We deliver turnkey furnishing packages that align with your architectural intent and elevate listing performance.",
      list: ["New construction & spec", "Ground-up collaboration", "Fixed-budget packages", "Turnover-ready handoff"],
    },
    {
      title: "Listing Brokerages",
      body: "High-end staging for flagship listings. Reliable timelines, insured transport, white-glove install and strike.",
      list: ["Flagship listing staging", "48-hour install window", "Photography-ready styling", "De-install on your schedule"],
    },
    {
      title: "Private Clients",
      body: "Principal residences and second homes. Long-view furnishing programs built to last beyond the sale cycle.",
      list: ["Principal residences", "Second & vacation homes", "Room-by-room programs", "Long-view curation"],
    },
  ];

  cols.forEach((c, i) => {
    const x = colX[i];
    rule(s, x, colY, colW);
    s.addText(c.title, {
      x, y: colY + 0.2, w: colW, h: 0.6,
      fontFace: F.head, fontSize: 22, color: C.ink, margin: 0,
    });
    s.addText(c.body, {
      x, y: colY + 0.9, w: colW, h: 1.7,
      fontFace: F.body, fontSize: 12, color: C.inkSoft,
      lineSpacingMultiple: 1.45, margin: 0,
    });
    rule(s, x, colY + 2.7, colW);
    const items = c.list.map((t, j) => ({
      text: `— ${t}`,
      options: { italic: true, breakLine: j < c.list.length - 1 },
    }));
    s.addText(items, {
      x, y: colY + 2.85, w: colW, h: 1.55,
      fontFace: F.body, fontSize: 12, color: C.inkSoft,
      lineSpacingMultiple: 1.4, margin: 0,
    });
  });

  footer(s, 4);
}

// ---------------------------------------------------------------------------
// Slide 5 — The Design Principles (2x2 grid)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.bodyLight };

  eyebrow(s, "04  ·  THE DESIGN PRINCIPLES");

  s.addText("Four commitments in every room.", {
    x: 0.7, y: 0.95, w: 12, h: 1.0,
    fontFace: F.head, fontSize: 40, color: C.ink, margin: 0,
  });

  const cellW = 5.9;
  const cellH = 1.75;
  const startY = 2.7;
  const gapX = 0.3;
  const gapY = 0.4;

  const cells = [
    { roman: "I.",   title: "Material honesty",    body: "Stone that reads as stone. Oak that shows its grain. We specify what lasts and age it on purpose." },
    { roman: "II.",  title: "Quiet proportion",    body: "Scale first, ornament last. Rooms are composed around sightlines, ceiling height, and natural light." },
    { roman: "III.", title: "Editorial restraint", body: "Fewer, better pieces. Every object earns its place — nothing added to fill a corner." },
    { roman: "IV.",  title: "Livable luxury",      body: "Fabrics built for a family. Finishes built for a decade. Beauty that survives a Saturday." },
  ];

  cells.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.7 + col * (cellW + gapX);
    const y = startY + row * (cellH + gapY);

    s.addText(c.roman, {
      x, y, w: cellW, h: 0.3,
      fontFace: F.mono, fontSize: 10, color: C.mute, charSpacing: 6, margin: 0,
    });
    s.addText(c.title, {
      x, y: y + 0.35, w: cellW, h: 0.5,
      fontFace: F.head, fontSize: 22, color: C.ink, margin: 0,
    });
    s.addText(c.body, {
      x, y: y + 0.95, w: cellW, h: 1.0,
      fontFace: F.body, fontSize: 13, color: C.inkSoft,
      lineSpacingMultiple: 1.45, margin: 0,
    });
  });

  footer(s, 5);
}

// ---------------------------------------------------------------------------
// Slide 6 — The Process (four columns on dark)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.bodyDark };

  eyebrow(s, "05  ·  THE PROCESS", { color: C.onDarkMute });

  s.addText(
    [
      { text: "From walkthrough to ", options: { fontFace: F.head, fontSize: 40, color: C.onDark } },
      { text: "install day",          options: { fontFace: F.head, fontSize: 40, color: C.onDark, italic: true } },
      { text: ".",                     options: { fontFace: F.head, fontSize: 40, color: C.onDark } },
    ],
    { x: 0.7, y: 0.95, w: 12, h: 1.0, margin: 0 }
  );

  const colY = 2.7;
  const colW = 2.85;
  const gap  = 0.2;
  const colX = [0.7, 0.7 + (colW + gap), 0.7 + 2 * (colW + gap), 0.7 + 3 * (colW + gap)];

  const cols = [
    { roman: "i.",   title: "Walkthrough",    body: "On-site with architect and developer. Scope, sightlines, and schedule captured in a single brief.", time: "WEEK 1" },
    { roman: "ii.",  title: "Concept & Spec", body: "Palette, plan, and a fully-specified furnishing schedule priced to a fixed budget with no surprises.", time: "WEEKS 2–4" },
    { roman: "iii.", title: "Procurement",    body: "Trade sourcing, custom fabrication, and receiving managed through our Los Angeles warehouse.", time: "WEEKS 4–14" },
    { roman: "iv.",  title: "Install & Style", body: "Two to four days on site. Photograph-ready on departure, with a documented styling kit for turnover.", time: "WEEK 15" },
  ];

  cols.forEach((c, i) => {
    const x = colX[i];
    rule(s, x, colY, colW, C.ruleDark);
    s.addText(c.roman, {
      x, y: colY + 0.15, w: colW, h: 0.45,
      fontFace: F.head, fontSize: 18, italic: true, color: C.onDarkMute, margin: 0,
    });
    s.addText(c.title, {
      x, y: colY + 0.6, w: colW, h: 0.55,
      fontFace: F.head, fontSize: 20, color: C.onDark, margin: 0,
    });
    s.addText(c.body, {
      x, y: colY + 1.2, w: colW, h: 1.6,
      fontFace: F.body, fontSize: 12, color: C.onDarkMute,
      lineSpacingMultiple: 1.45, margin: 0,
    });
    rule(s, x, colY + 2.95, colW, C.ruleDark);
    s.addText(c.time, {
      x, y: colY + 3.05, w: colW, h: 0.35,
      fontFace: F.mono, fontSize: 10, color: C.onDarkMute, charSpacing: 6, margin: 0,
    });
  });

  footer(s, 6, true);
}

// ---------------------------------------------------------------------------
// Slide 7 — Portfolio Selects (asymmetric gallery)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.bodyLight };

  eyebrow(s, "06  ·  PORTFOLIO SELECTS");

  s.addText("Recent work, Los Angeles County.", {
    x: 0.7, y: 0.95, w: 12, h: 1.0,
    fontFace: F.head, fontSize: 40, color: C.ink, margin: 0,
  });

  // Layout: big tile on left (full height of gallery), 2x2 grid on right
  const galleryY = 2.6;
  const galleryH = 4.25;
  const galleryX = 0.7;
  const galleryW = SW - 2 * 0.7;  // 11.933

  const bigW = 5.6;
  const gap  = 0.25;
  const smallW = (galleryW - bigW - gap - gap) / 2;  // two small tiles in right column
  const smallH = (galleryH - gap) / 2;

  // Big left tile
  imageBlock(s, galleryX, galleryY, bigW, galleryH, "IMG · BEL AIR · PRIMARY LIVING", { capW: 3.4, capH: 0.5 });

  // Small tiles right (2x2)
  const rightX = galleryX + bigW + gap;
  imageBlock(s, rightX,                 galleryY,             smallW, smallH, "IMG · BRENTWOOD · DINING VIGNETTE",   { capW: smallW - 0.3, capH: 0.5 });
  imageBlock(s, rightX + smallW + gap,  galleryY,             smallW, smallH, "IMG · PACIFIC PALISADES · ENTRY",     { capW: smallW - 0.3, capH: 0.5 });
  imageBlock(s, rightX,                 galleryY + smallH + gap, smallW, smallH, "IMG · BEVERLY HILLS · PRIMARY SUITE", { capW: smallW - 0.3, capH: 0.5 });
  imageBlock(s, rightX + smallW + gap,  galleryY + smallH + gap, smallW, smallH, "IMG · MALIBU · TERRACE LOUNGE",       { capW: smallW - 0.3, capH: 0.5 });
}

// ---------------------------------------------------------------------------
// Slide 8 — Principal (left image, right bio)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.bodyLight };

  eyebrow(s, "07  ·  PRINCIPAL");

  // Left portrait block
  imageBlock(s, 0.7, 1.1, 5.6, 5.55, "IMG · PORTRAIT · JANE DOE, FOUNDER", { capW: 4.2, capH: 0.5 });

  // Right: bio
  s.addText("Jane Doe.", {
    x: 6.8, y: 2.2, w: 5.8, h: 0.9,
    fontFace: F.head, fontSize: 40, color: C.ink, margin: 0,
  });
  s.addText("Founder & Principal Designer", {
    x: 6.8, y: 3.05, w: 5.8, h: 0.5,
    fontFace: F.head, fontSize: 20, italic: true, color: C.inkSoft, margin: 0,
  });
  s.addText(
    "Jane leads every Chic Interior project from concept through install. Her point of view is quiet, material, and unmistakably Californian — grounded in the landscape and edited for the way clients actually live.",
    {
      x: 6.8, y: 3.85, w: 5.8, h: 1.5,
      fontFace: F.body, fontSize: 13, color: C.inkSoft,
      lineSpacingMultiple: 1.45, margin: 0,
    }
  );
  s.addText(
    "She works directly with developers and brokers from the first walkthrough, and remains on-site through the final photograph.",
    {
      x: 6.8, y: 5.45, w: 5.8, h: 1.2,
      fontFace: F.body, fontSize: 13, color: C.inkSoft,
      lineSpacingMultiple: 1.45, margin: 0,
    }
  );

  footer(s, 8);
}

// ---------------------------------------------------------------------------
// Slide 9 — Closing / Contact (dark)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C.bodyDark };

  // Top-left brand
  s.addText("Chic Interior", {
    x: 0.7, y: 0.55, w: 5, h: 0.5,
    fontFace: F.head, fontSize: 18, italic: true, color: C.onDark, margin: 0,
  });
  s.addText("LOS ANGELES", {
    x: 0.7, y: 1.0, w: 5, h: 0.3,
    fontFace: F.mono, fontSize: 10, color: C.onDarkMute, charSpacing: 6, margin: 0,
  });

  // Closing headline
  s.addText("PARTNERSHIP", {
    x: 0.7, y: 3.6, w: 6, h: 0.3,
    fontFace: F.mono, fontSize: 11, color: C.onDarkMute, charSpacing: 7, margin: 0,
  });
  s.addText("Let's furnish the next one together.", {
    x: 0.7, y: 4.0, w: 12, h: 1.1,
    fontFace: F.head, fontSize: 40, italic: true, color: C.onDark, margin: 0,
  });

  // Divider
  rule(s, 0.7, 5.25, SW - 1.4, C.ruleDark);

  // Three contact columns
  const contactY = 5.45;
  const cW = 3.9;
  const cols = [
    {
      label: "PRINCIPAL",
      rich: [
        { text: "Jane Doe",                  options: { fontFace: F.head, fontSize: 15, color: C.onDark, breakLine: true } },
        { text: "Founder & Principal Designer", options: { fontFace: F.head, fontSize: 13, italic: true, color: C.onDarkMute } },
      ],
    },
    {
      label: "STUDIO",
      rich: [
        { text: "Los Angeles County",  options: { fontFace: F.head, fontSize: 15, color: C.onDark, breakLine: true } },
        { text: "By appointment",       options: { fontFace: F.head, fontSize: 13, italic: true, color: C.onDarkMute } },
      ],
    },
    {
      label: "INQUIRIES",
      rich: [
        { text: "hello@chicinterior.co", options: { fontFace: F.head, fontSize: 15, color: C.onDark, breakLine: true } },
        { text: "@chicinterior",          options: { fontFace: F.head, fontSize: 13, italic: true, color: C.onDarkMute } },
      ],
    },
  ];

  cols.forEach((c, i) => {
    const x = 0.7 + i * (cW + 0.2);
    s.addText(c.label, {
      x, y: contactY, w: cW, h: 0.3,
      fontFace: F.mono, fontSize: 10, color: C.onDarkMute, charSpacing: 6, margin: 0,
    });
    s.addText(c.rich, {
      x, y: contactY + 0.4, w: cW, h: 1.1,
      lineSpacingMultiple: 1.3, margin: 0,
    });
  });

  // Bottom footer (brand left, page right)
  s.addText("CHIC INTERIOR  ·  PARTNERSHIP DECK 2026", {
    x: 0.7, y: SH - 0.5, w: 7, h: 0.3,
    fontFace: F.mono, fontSize: 9, color: C.onDarkMute, charSpacing: 5, margin: 0,
  });
  s.addText("09 / 09", {
    x: SW - 2.0, y: SH - 0.5, w: 1.3, h: 0.3,
    fontFace: F.mono, fontSize: 9, color: C.onDarkMute, charSpacing: 5,
    align: "right", margin: 0,
  });
}

// ---------------------------------------------------------------------------
// Write file
// ---------------------------------------------------------------------------
pres.writeFile({ fileName: "Interior_Design.pptx" })
    .then(fn => console.log("Wrote:", fn));
