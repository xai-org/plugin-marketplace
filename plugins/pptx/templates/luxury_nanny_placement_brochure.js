// Thoughtful Cares — Private Family Brochure
// Replica built with pptxgenjs
//
// Run:
//   npm install pptxgenjs
//   node build.js
//
// Output: Thoughtful-Cares.pptx

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.author = "Thoughtful Cares";
pres.title = "A Private Family Brochure — Spring 2026";

// Custom layout matches the source deck (20" x 11.25", still 16:9)
pres.defineLayout({ name: "TC_LAYOUT", width: 20, height: 11.25 });
pres.layout = "TC_LAYOUT";

// ---------- Palette ----------
const COLOR = {
  cream:     "F4EFE7", // primary background
  creamDark: "EAE3D6", // right sidebar / image placeholders
  offWhite:  "FBF8F2", // card fill
  ink:       "1E1C19", // near-black text
  inkSoft:   "4A453D", // secondary dark
  muted:     "8A8478", // muted tan labels
  mutedLt:   "C9C1B1", // light tan lines / dividers
  sage:      "5E7560", // sage green accent
  black:     "0F0E0C", // dark panel (slide 8 center, slide 9 right)
};

// ---------- Type ----------
const SANS = "Arial";
const MONO = "JetBrains Mono";

// ---------- Helpers ----------
const LEFT = 1.0;                 // standard left gutter
const RIGHT_EDGE = 20 - 1.0;      // right-edge content boundary

// Top bar (section label left, "Thoughtful Cares" italic right) + page number footer
function chromeTopBottom(slide, {
  sectionRoman,
  sectionName,
  footerLabel,
  pageNum, // e.g., "02 / 09"
  brandColor = COLOR.ink,
  labelColor = COLOR.muted,
  mutedColor = COLOR.muted,
}) {
  // Top-left: "I · OUR PHILOSOPHY"
  slide.addText(`${sectionRoman} · ${sectionName}`, {
    x: LEFT, y: 0.7, w: 10, h: 0.35,
    fontFace: MONO, fontSize: 10, color: labelColor, charSpacing: 4,
    margin: 0, valign: "middle",
  });

  // Top-right: italic "Thoughtful Cares"
  slide.addText("Thoughtful Cares", {
    x: 12.5, y: 0.7, w: 6.5, h: 0.35,
    fontFace: SANS, fontSize: 14, italic: true, color: brandColor,
    align: "right", margin: 0, valign: "middle",
  });

  // Bottom-left: footer label
  if (footerLabel) {
    slide.addText(footerLabel, {
      x: LEFT, y: 10.6, w: 6, h: 0.3,
      fontFace: MONO, fontSize: 9, color: mutedColor, charSpacing: 4,
      margin: 0, valign: "middle",
    });
  }

  // Bottom-right: page count
  if (pageNum) {
    slide.addText(pageNum, {
      x: 13, y: 10.6, w: 6, h: 0.3,
      fontFace: MONO, fontSize: 9, color: mutedColor, charSpacing: 4,
      align: "right", margin: 0, valign: "middle",
    });
  }
}

// Big "display" headline with one word italic in sage
function displayHeadline(slide, { x, y, w, h, parts, fontSize = 88, color = COLOR.ink, accent = COLOR.sage, lineSpacingMultiple = 0.95 }) {
  // parts: array of { text, italic?, color? } joined with breaks/spaces as given
  const runs = parts.map((p, i) => ({
    text: p.text,
    options: {
      italic: !!p.italic,
      color: p.color || (p.italic ? accent : color),
      fontFace: SANS,
      fontSize,
      breakLine: !!p.breakLine,
    },
  }));
  slide.addText(runs, {
    x, y, w, h,
    fontFace: SANS, fontSize, color, bold: false,
    margin: 0, valign: "top",
    lineSpacingMultiple,
  });
}

// =====================================================================
// SLIDE 1 — Cover
// =====================================================================
(function slide1() {
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  // Right sidebar (darker cream) spanning right ~35% of slide
  s.addShape(pres.shapes.RECTANGLE, {
    x: 13, y: 0, w: 7, h: 11.25,
    fill: { color: COLOR.creamDark }, line: { type: "none" },
  });

  // Top row (left side)
  s.addText("THOUGHTFUL CARES", {
    x: LEFT, y: 0.85, w: 5, h: 0.35,
    fontFace: MONO, fontSize: 11, color: COLOR.ink, charSpacing: 6, bold: true,
    margin: 0, valign: "middle",
  });
  s.addText("EST. 2014 · LONDON", {
    x: 6.5, y: 0.85, w: 5, h: 0.35,
    fontFace: MONO, fontSize: 10, color: COLOR.muted, charSpacing: 5,
    align: "center", margin: 0, valign: "middle",
  });

  // Subtitle under THOUGHTFUL CARES
  s.addText("A PRIVATE FAMILY BROCHURE · SPRING 2026", {
    x: LEFT, y: 1.3, w: 8, h: 0.35,
    fontFace: MONO, fontSize: 10, color: COLOR.muted, charSpacing: 5,
    margin: 0, valign: "middle",
  });

  // HEADLINE — "The care of a family, practised as a craft."
  displayHeadline(s, {
    x: LEFT, y: 2.2, w: 11.5, h: 6,
    parts: [
      { text: "The care of a",  breakLine: true },
      { text: "family,",        italic: true, breakLine: true },
      { text: "practised as",   breakLine: true },
      { text: "a craft.",       },
    ],
    fontSize: 96,
    lineSpacingMultiple: 0.98,
  });

  // Body copy under headline
  s.addText(
    "Norland-trained nannies, placed with the world's most considered families. Discreet, deeply skilled, and chosen with the patience they deserve.",
    {
      x: LEFT, y: 8.6, w: 5.8, h: 1.3,
      fontFace: SANS, fontSize: 14, color: COLOR.inkSoft,
      margin: 0, valign: "top", lineSpacingMultiple: 1.4,
    }
  );

  // Bottom-left: FOR PRIVATE REVIEW
  s.addText("FOR PRIVATE REVIEW", {
    x: LEFT, y: 10.3, w: 5, h: 0.3,
    fontFace: MONO, fontSize: 9, color: COLOR.muted, charSpacing: 5,
    margin: 0, valign: "middle",
  });
  // Bottom (center-left): VOL. IX
  s.addText("VOL. IX", {
    x: 7, y: 10.3, w: 3, h: 0.3,
    fontFace: MONO, fontSize: 9, color: COLOR.muted, charSpacing: 5,
    align: "center", margin: 0, valign: "middle",
  });

  // Portrait placeholder caption strip (bottom of right sidebar)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 13.3, y: 10.85, w: 5, h: 0.3,
    fill: { color: COLOR.offWhite }, line: { color: COLOR.mutedLt, width: 0.5 },
  });
  s.addText("PORTRAIT · NANNY WITH CHILD IN GARDEN · B/W EDITORIAL", {
    x: 13.3, y: 10.85, w: 5, h: 0.3,
    fontFace: MONO, fontSize: 8, color: COLOR.muted, charSpacing: 3,
    align: "center", margin: 0, valign: "middle",
  });

  // "Since 2014" circle badge, top-right
  s.addShape(pres.shapes.OVAL, {
    x: 17.5, y: 0.6, w: 1.6, h: 1.6,
    fill: { color: COLOR.mutedLt }, line: { type: "none" },
  });
  s.addText(
    [
      { text: "Since", options: { italic: true, breakLine: true } },
      { text: "2014",  options: { italic: true } },
    ],
    {
      x: 17.5, y: 0.6, w: 1.6, h: 1.6,
      fontFace: SANS, fontSize: 13, color: COLOR.offWhite,
      align: "center", valign: "middle", margin: 0,
    }
  );
})();

// =====================================================================
// SLIDE 2 — Philosophy
// =====================================================================
(function slide2() {
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  chromeTopBottom(s, {
    sectionRoman: "I",
    sectionName: "OUR PHILOSOPHY",
    footerLabel: "PHILOSOPHY",
    pageNum: "02 / 09",
  });

  // Huge pull-quote headline (centered vertically in upper-middle)
  s.addText(
    [
      { text: "PLACEHOLDER", options: { color: COLOR.ink } },
      { text: "same care ", options: { italic: true, color: COLOR.sage } },
      { text: "you'd take choosing family.", options: { color: COLOR.ink } },
    ],
    {
      x: LEFT + 1.2, y: 2.6, w: 17, h: 4.5,
      fontFace: SANS, fontSize: 64, color: COLOR.ink,
      margin: 0, valign: "top", lineSpacingMultiple: 1.1,
    }
  );

  // Small caption beneath, preceded by a short horizontal line
  s.addShape(pres.shapes.LINE, {
    x: LEFT + 1.2, y: 8.35, w: 1.3, h: 0,
    line: { color: COLOR.muted, width: 0.75 },
  });
  s.addText("OUR FOUNDING PRINCIPLE, WRITTEN IN 2014", {
    x: LEFT + 2.7, y: 8.2, w: 10, h: 0.35,
    fontFace: MONO, fontSize: 10, color: COLOR.muted, charSpacing: 4,
    margin: 0, valign: "middle",
  });
})();

// =====================================================================
// SLIDE 3 — The Norland Difference
// =====================================================================
(function slide3() {
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  // Right side darker cream panel (image area)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 9, y: 0, w: 11, h: 11.25,
    fill: { color: COLOR.creamDark }, line: { type: "none" },
  });

  chromeTopBottom(s, {
    sectionRoman: "II",
    sectionName: "THE NORLAND DIFFERENCE",
    footerLabel: "TRAINING",
    pageNum: "03 / 09",
  });

  // Overline
  s.addText("A RARE TRAINING", {
    x: LEFT, y: 1.4, w: 5, h: 0.35,
    fontFace: MONO, fontSize: 10, color: COLOR.muted, charSpacing: 5,
    margin: 0, valign: "middle",
  });

  // Headline: "Schooled where princes are raised."
  displayHeadline(s, {
    x: LEFT, y: 1.9, w: 8, h: 3.2,
    parts: [
      { text: "Schooled where", breakLine: true },
      { text: "princes", italic: true }, { text: " are", breakLine: true },
      { text: "raised.", },
    ],
    fontSize: 64,
    lineSpacingMultiple: 1.02,
  });

  // Body paragraph
  s.addText(
    "Every nanny on our roster has completed the full Norland programme — a three-year degree long regarded as the most thorough training in private childcare anywhere in the world. It is the quiet reason our placements last.",
    {
      x: LEFT, y: 5.5, w: 7, h: 1.5,
      fontFace: SANS, fontSize: 14, color: COLOR.inkSoft,
      margin: 0, valign: "top", lineSpacingMultiple: 1.45,
    }
  );

  // Horizontal divider above stats
  s.addShape(pres.shapes.LINE, {
    x: LEFT, y: 7.2, w: 7.4, h: 0,
    line: { color: COLOR.mutedLt, width: 0.75 },
  });

  // Stats 2x2 grid
  const stats = [
    { big: "3", sup: "yr", label: "DEGREE PROGRAMME", col: 0, row: 0 },
    { big: "<3%", sup: "",  label: "APPLICANT ACCEPTANCE", col: 1, row: 0 },
    { big: "100%", sup: "", label: "OF OUR NANNIES", col: 0, row: 1 },
    { big: "1892", sup: "", label: "FOUNDED", col: 1, row: 1 },
  ];
  const sx = LEFT, sy = 7.6, cw = 3.6, rh = 1.3;
  stats.forEach((st) => {
    const x = sx + st.col * cw;
    const y = sy + st.row * rh;
    const runs = [{ text: st.big, options: { fontSize: 48, color: COLOR.ink } }];
    if (st.sup) runs.push({ text: st.sup, options: { fontSize: 20, color: COLOR.muted } });
    s.addText(runs, {
      x, y, w: cw - 0.1, h: 0.8,
      fontFace: SANS, margin: 0, valign: "bottom",
    });
    s.addText(st.label, {
      x, y: y + 0.8, w: cw - 0.1, h: 0.3,
      fontFace: MONO, fontSize: 9, color: COLOR.muted, charSpacing: 4,
      margin: 0, valign: "top",
    });
  });

  // Right side: quote card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 11.5, y: 7.4, w: 7.5, h: 2.5,
    fill: { color: COLOR.offWhite }, line: { type: "none" },
  });
  // Short sage accent bar on left of card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 11.5, y: 7.8, w: 0.06, h: 1.7,
    fill: { color: COLOR.sage }, line: { type: "none" },
  });
  s.addText(
    '"A Norland nanny isn\'t trained to supervise a child — she\'s trained to shape an environment. Nutrition, early education, boundaries, play. The whole of it."',
    {
      x: 11.8, y: 7.7, w: 7, h: 1.5,
      fontFace: SANS, fontSize: 13, italic: true, color: COLOR.ink,
      margin: 0, valign: "top", lineSpacingMultiple: 1.4,
    }
  );
  s.addText("— ELEANOR HASTINGS, HEAD OF PLACEMENTS", {
    x: 11.8, y: 9.3, w: 7, h: 0.3,
    fontFace: MONO, fontSize: 9, color: COLOR.muted, charSpacing: 4,
    margin: 0, valign: "top",
  });

  // Caption strip at bottom of right panel
  s.addShape(pres.shapes.RECTANGLE, {
    x: 9.3, y: 10.85, w: 6, h: 0.3,
    fill: { color: COLOR.offWhite }, line: { color: COLOR.mutedLt, width: 0.5 },
  });
  s.addText("NORLAND CAMPUS · UNIFORMED TRAINEE · WARM DAYLIGHT", {
    x: 9.3, y: 10.85, w: 6, h: 0.3,
    fontFace: MONO, fontSize: 8, color: COLOR.muted, charSpacing: 3,
    align: "center", margin: 0, valign: "middle",
  });
})();

// =====================================================================
// SLIDE 4 — Meet a Few of our Team
// =====================================================================
(function slide4() {
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  chromeTopBottom(s, {
    sectionRoman: "III",
    sectionName: "MEET A FEW OF OUR TEAM",
    footerLabel: "OUR TEAM",
    pageNum: "04 / 09",
  });

  // Headline (left)
  displayHeadline(s, {
    x: LEFT, y: 1.3, w: 10, h: 2.5,
    parts: [
      { text: "Extraordinary", breakLine: true },
      { text: "people, " }, { text: "patiently", italic: true, breakLine: true },
      { text: "matched." },
    ],
    fontSize: 52,
    lineSpacingMultiple: 1.02,
  });

  // Right side descriptive copy
  s.addText(
    "A representative sample from our current roster of 42 nannies. Full profiles, references, and recorded interviews are shared with families during the matching phase.",
    {
      x: 13.5, y: 1.4, w: 5.5, h: 1.8,
      fontFace: SANS, fontSize: 12, color: COLOR.inkSoft,
      align: "right", margin: 0, valign: "top", lineSpacingMultiple: 1.4,
    }
  );

  // Divider under hero
  s.addShape(pres.shapes.LINE, {
    x: LEFT, y: 3.75, w: 18, h: 0, line: { color: COLOR.mutedLt, width: 0.75 },
  });

  // Three team cards
  const cards = [
    {
      x: LEFT, portraitLabel: "PORTRAIT · SOPHIE",
      name: "Sophie H.", exp: "EXP · 09 YRS",
      rows: [
        ["NORLAND",   "Class of 2017, BA (Hons)"],
        ["SPECIALISM","Newborn & early years"],
        ["LANGUAGES", "English, French, basic Italian"],
        ["NOTABLE",   "Paediatric First Aid · Montessori Cert."],
      ],
    },
    {
      x: 7.2, portraitLabel: "PORTRAIT · ANNA",
      name: "Anna M.", exp: "EXP · 12 YRS",
      rows: [
        ["NORLAND",   "Class of 2014, BA (Hons)"],
        ["SPECIALISM","Multi-sibling households"],
        ["LANGUAGES", "English, Spanish, Portuguese"],
        ["NOTABLE",   "Advanced Driving · Sea Survival"],
      ],
    },
    {
      x: 13.4, portraitLabel: "PORTRAIT · CHARLOTTE",
      name: "Charlotte P.", exp: "EXP · 06 YRS",
      rows: [
        ["NORLAND",   "Class of 2020, BA (Hons)"],
        ["SPECIALISM","Travel & international placements"],
        ["LANGUAGES", "English, Mandarin, German"],
        ["NOTABLE",   "Equestrian · SEN-trained"],
      ],
    },
  ];

  const cardW = 5.6;
  const portraitY = 4.0, portraitH = 4.0;

  cards.forEach((c) => {
    // Portrait placeholder block
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: portraitY, w: cardW, h: portraitH,
      fill: { color: COLOR.creamDark }, line: { type: "none" },
    });
    // Portrait caption chip
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x + 0.2, y: portraitY + portraitH - 0.55, w: 2.4, h: 0.35,
      fill: { color: COLOR.offWhite }, line: { color: COLOR.mutedLt, width: 0.5 },
    });
    s.addText(c.portraitLabel, {
      x: c.x + 0.2, y: portraitY + portraitH - 0.55, w: 2.4, h: 0.35,
      fontFace: MONO, fontSize: 8, color: COLOR.muted, charSpacing: 3,
      align: "center", margin: 0, valign: "middle",
    });

    // Name
    s.addText(c.name, {
      x: c.x, y: portraitY + portraitH + 0.25, w: cardW - 1.5, h: 0.55,
      fontFace: SANS, fontSize: 26, color: COLOR.ink,
      margin: 0, valign: "middle",
    });
    // Experience (right)
    s.addText(c.exp, {
      x: c.x + cardW - 1.6, y: portraitY + portraitH + 0.3, w: 1.6, h: 0.45,
      fontFace: MONO, fontSize: 9, color: COLOR.muted, charSpacing: 4,
      align: "right", margin: 0, valign: "middle",
    });

    // Rows
    let ry = portraitY + portraitH + 1.0;
    c.rows.forEach(([label, value]) => {
      s.addText(label, {
        x: c.x, y: ry, w: 1.5, h: 0.3,
        fontFace: MONO, fontSize: 9, color: COLOR.muted, charSpacing: 4,
        margin: 0, valign: "middle",
      });
      s.addText(value, {
        x: c.x + 1.5, y: ry, w: cardW - 1.5, h: 0.3,
        fontFace: SANS, fontSize: 11, color: COLOR.ink,
        margin: 0, valign: "middle",
      });
      ry += 0.32;
    });
  });
})();

// =====================================================================
// SLIDE 5 — The Services We Offer
// =====================================================================
(function slide5() {
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  chromeTopBottom(s, {
    sectionRoman: "IV",
    sectionName: "THE SERVICES WE OFFER",
    footerLabel: "SERVICES",
    pageNum: "05 / 09",
  });

  // Headline
  displayHeadline(s, {
    x: LEFT, y: 1.4, w: 11, h: 2.5,
    parts: [
      { text: "A single roster, shaped to", breakLine: true },
      { text: "your", italic: true }, { text: " life." },
    ],
    fontSize: 54,
    lineSpacingMultiple: 1.02,
  });

  // Right-side intro
  s.addText(
    "We place for every rhythm a family runs on — from the first night home with a newborn, to the residential nanny who becomes a quiet fixture of the household for a decade.",
    {
      x: 12.5, y: 2.3, w: 6.5, h: 1.7,
      fontFace: SANS, fontSize: 12, color: COLOR.inkSoft,
      margin: 0, valign: "top", lineSpacingMultiple: 1.45,
    }
  );

  // Horizontal divider
  s.addShape(pres.shapes.LINE, {
    x: LEFT, y: 4.2, w: 18, h: 0, line: { color: COLOR.mutedLt, width: 0.75 },
  });

  // Services grid (2 cols x 3 rows)
  const services = [
    { num: "01", title: "Full-time Residential",    body: "A live-in nanny with the household, typically five to six days per week. The deepest form of the bond.", meta: "MINIMUM 12 MONTHS" },
    { num: "02", title: "Part-time & Daily",        body: "Structured daytime care for families who keep a smaller staff, or split arrangements between homes.",     meta: "FROM 3 DAYS / WEEK" },
    { num: "03", title: "Maternity & Night Nurses", body: "The first weeks home, handled by a nurse trained in newborn sleep, feeding, and postnatal recovery.",       meta: "2–16 WEEKS" },
    { num: "04", title: "Travel Nannies",           body: "A trusted hand across seasons and cities — from a Riviera summer to Aspen over the holidays.",              meta: "ENGAGED PER TRIP" },
    { num: "05", title: "Temporary & Emergency",    body: "Discreet, short-notice cover drawn from a vetted reserve team. Often same-day in London.",                   meta: "24 / 7 ON CALL" },
    { num: "06", title: "Governess & Educational",  body: "For older children: a nanny with subject mastery, prep-school experience, and a guiding hand.",             meta: "AGES 6 AND UP" },
  ];

  const colX = [LEFT, 10.5];
  const rowStartY = 4.6;
  const rowH = 1.8;
  const gap = 0;

  services.forEach((item, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = colX[col];
    const y = rowStartY + row * rowH + row * gap;

    // Number (italic)
    s.addText(item.num, {
      x, y, w: 0.9, h: 0.5,
      fontFace: SANS, fontSize: 18, italic: true, color: COLOR.muted,
      margin: 0, valign: "middle",
    });
    // Title
    s.addText(item.title, {
      x: x + 0.9, y, w: 5.2, h: 0.5,
      fontFace: SANS, fontSize: 22, color: COLOR.ink,
      margin: 0, valign: "middle",
    });
    // Meta (right-aligned)
    s.addText(item.meta, {
      x: x + 6.1, y: y + 0.05, w: 2.3, h: 0.4,
      fontFace: MONO, fontSize: 9, color: COLOR.muted, charSpacing: 4,
      align: "right", margin: 0, valign: "middle",
    });
    // Body
    s.addText(item.body, {
      x: x + 0.9, y: y + 0.6, w: 7.5, h: 0.8,
      fontFace: SANS, fontSize: 11, color: COLOR.inkSoft,
      margin: 0, valign: "top", lineSpacingMultiple: 1.4,
    });
    // Divider at bottom of row (full col width)
    s.addShape(pres.shapes.LINE, {
      x, y: y + rowH - 0.1, w: 8.4, h: 0,
      line: { color: COLOR.mutedLt, width: 0.5 },
    });
  });
})();

// =====================================================================
// SLIDE 6 — How We Match
// =====================================================================
(function slide6() {
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  chromeTopBottom(s, {
    sectionRoman: "V",
    sectionName: "HOW WE MATCH",
    footerLabel: "PROCESS",
    pageNum: "06 / 09",
  });

  // Headline
  displayHeadline(s, {
    x: LEFT, y: 1.4, w: 10, h: 2.5,
    parts: [
      { text: "Patience, where others", breakLine: true },
      { text: "hurry.", italic: true },
    ],
    fontSize: 56,
    lineSpacingMultiple: 1.0,
  });

  // Right-side intro
  s.addText(
    "Most agencies can staff a home in a fortnight. We take longer — deliberately. Our vetting is the reason our placements rarely end, and why families refer us without being asked.",
    {
      x: 12.5, y: 2.3, w: 6.5, h: 1.7,
      fontFace: SANS, fontSize: 12, color: COLOR.inkSoft,
      margin: 0, valign: "top", lineSpacingMultiple: 1.45,
    }
  );

  // Five steps
  const steps = [
    { num: "01", label: "STEP ONE",   title: "The Listening Call", body: "A 90-minute conversation at your home or ours. No brief, no form — just understanding the household." },
    { num: "02", label: "STEP TWO",   title: "The Shortlist",      body: "Three to five nannies, hand-selected. Written dossiers, references verified, video introductions." },
    { num: "03", label: "STEP THREE", title: "Meet & Trial",       body: "In-home interviews and a paid trial week with your favoured candidate, before any commitment." },
    { num: "04", label: "STEP FOUR",  title: "Placement",          body: "Contract, handover, and a guided first month with your dedicated family liaison on call." },
    { num: "05", label: "STEP FIVE",  title: "Aftercare",          body: "Quarterly reviews for the life of the placement. Replacement guarantee at any point in year one." },
  ];

  const stepY = 4.6, stepW = 3.5, circD = 0.75;
  steps.forEach((st, i) => {
    const x = LEFT + i * 3.6;
    // Circle with number (italic)
    s.addShape(pres.shapes.OVAL, {
      x, y: stepY, w: circD, h: circD,
      fill: { color: COLOR.cream }, line: { color: COLOR.mutedLt, width: 1 },
    });
    s.addText(st.num, {
      x, y: stepY, w: circD, h: circD,
      fontFace: SANS, fontSize: 13, italic: true, color: COLOR.muted,
      align: "center", valign: "middle", margin: 0,
    });
    // Label
    s.addText(st.label, {
      x, y: stepY + 0.95, w: stepW, h: 0.3,
      fontFace: MONO, fontSize: 9, color: COLOR.muted, charSpacing: 4,
      margin: 0, valign: "middle",
    });
    // Title
    s.addText(st.title, {
      x, y: stepY + 1.25, w: stepW, h: 0.45,
      fontFace: SANS, fontSize: 20, color: COLOR.ink,
      margin: 0, valign: "middle",
    });
    // Body
    s.addText(st.body, {
      x, y: stepY + 1.8, w: stepW, h: 1.3,
      fontFace: SANS, fontSize: 11, color: COLOR.inkSoft,
      margin: 0, valign: "top", lineSpacingMultiple: 1.4,
    });
  });

  // Divider above selectivity block
  s.addShape(pres.shapes.LINE, {
    x: LEFT, y: 8.3, w: 18, h: 0, line: { color: COLOR.mutedLt, width: 0.75 },
  });

  // Selectivity block
  s.addText("SELECTIVITY", {
    x: LEFT, y: 8.6, w: 6, h: 0.35,
    fontFace: MONO, fontSize: 10, color: COLOR.muted, charSpacing: 5,
    margin: 0, valign: "middle",
  });
  s.addText("Of every 100 nannies who apply to join our roster …", {
    x: LEFT, y: 9.0, w: 13, h: 0.7,
    fontFace: SANS, fontSize: 22, italic: true, color: COLOR.ink,
    margin: 0, valign: "middle",
  });

  // Right side: big 4
  s.addText("4", {
    x: 16.8, y: 8.55, w: 2.2, h: 1.1,
    fontFace: SANS, fontSize: 60, color: COLOR.sage,
    align: "right", margin: 0, valign: "middle",
  });
  s.addText("ARE INVITED TO REPRESENT US", {
    x: 13.5, y: 9.55, w: 5.5, h: 0.3,
    fontFace: MONO, fontSize: 9, color: COLOR.muted, charSpacing: 4,
    align: "right", margin: 0, valign: "middle",
  });
})();

// =====================================================================
// SLIDE 7 — What Families Say
// =====================================================================
(function slide7() {
  const s = pres.addSlide();
  s.background = { color: COLOR.creamDark };

  chromeTopBottom(s, {
    sectionRoman: "VI",
    sectionName: "WHAT FAMILIES SAY",
    footerLabel: "PROOF",
    pageNum: "07 / 09",
  });

  // Headline
  displayHeadline(s, {
    x: LEFT, y: 1.4, w: 11, h: 2.2,
    parts: [
      { text: "Spoken, " }, { text: "quietly,", italic: true }, { text: " by", breakLine: true },
      { text: "those we serve." },
    ],
    fontSize: 56,
    lineSpacingMultiple: 1.02,
  });

  // Top-right small note
  s.addText("NAMES ABBREVIATED AT FAMILIES' REQUEST", {
    x: 12, y: 1.9, w: 7, h: 0.35,
    fontFace: MONO, fontSize: 9, color: COLOR.muted, charSpacing: 4,
    align: "right", margin: 0, valign: "middle",
  });

  // Divider
  s.addShape(pres.shapes.LINE, {
    x: LEFT, y: 4.0, w: 18, h: 0, line: { color: COLOR.mutedLt, width: 0.75 },
  });

  // Three testimonials
  const testimonials = [
    {
      quote: "Sophie has been with our family for four years. She is, in every sense that matters, one of us. Thoughtful Cares understood what that word meant before we did.",
      name: "THE H. FAMILY ", where: "MAYFAIR · PLACED 2022",
    },
    {
      quote: "We'd been through three agencies in two years. The difference here is the patience. They took eleven weeks to match us. I would have waited a year.",
      name: "DR. & MRS. C. ", where: "SINGAPORE · PLACED 2024",
    },
    {
      quote: "Our daughter is two and hasn't known a week without Anna. The only agency where the nanny felt as vetted as the family was being.",
      name: "THE R. FAMILY ", where: "GENEVA · PLACED 2023",
    },
  ];

  const tY = 4.4, colW = 6.0;
  const xs = [LEFT, LEFT + 6.2, LEFT + 12.4];

  testimonials.forEach((t, i) => {
    const x = xs[i];
    // Giant curly quote mark
    s.addText("\u201D", {
      x, y: tY, w: 0.8, h: 0.9,
      fontFace: SANS, fontSize: 48, bold: true, color: COLOR.ink,
      margin: 0, valign: "top",
    });
    // Quote
    s.addText(t.quote, {
      x, y: tY + 0.9, w: colW, h: 2.5,
      fontFace: SANS, fontSize: 13, color: COLOR.ink,
      margin: 0, valign: "top", lineSpacingMultiple: 1.5,
    });
    // Small divider under quote
    s.addShape(pres.shapes.LINE, {
      x, y: tY + 3.5, w: colW - 0.5, h: 0,
      line: { color: COLOR.mutedLt, width: 0.5 },
    });
    // Attribution
    s.addText(
      [
        { text: t.name, options: { bold: true } },
        { text: t.where, options: { color: COLOR.muted } },
      ],
      {
        x, y: tY + 3.6, w: colW, h: 0.4,
        fontFace: MONO, fontSize: 9, color: COLOR.ink, charSpacing: 3,
        margin: 0, valign: "middle",
      }
    );
  });

  // Divider above stats
  s.addShape(pres.shapes.LINE, {
    x: LEFT, y: 8.85, w: 18, h: 0, line: { color: COLOR.mutedLt, width: 0.75 },
  });

  // Stat quartet
  const numStats = [
    { big: "94", sup: "%",  label: "PLACEMENTS PASSING YEAR ONE" },
    { big: "6.2", sup: "yr", label: "AVERAGE TENURE OF A LIVE-IN" },
    { big: "81", sup: "%",  label: "NEW FAMILIES FROM REFERRAL" },
    { big: "11", sup: "",   label: "COUNTRIES WE'VE PLACED IN" },
  ];
  numStats.forEach((st, i) => {
    const x = LEFT + i * 4.6;
    const runs = [{ text: st.big, options: { fontSize: 46, color: COLOR.ink } }];
    if (st.sup) runs.push({ text: st.sup, options: { fontSize: 18, color: COLOR.muted } });
    s.addText(runs, {
      x, y: 9.1, w: 4, h: 0.8,
      fontFace: SANS, margin: 0, valign: "bottom",
    });
    s.addText(st.label, {
      x, y: 9.95, w: 4.3, h: 0.3,
      fontFace: MONO, fontSize: 9, color: COLOR.muted, charSpacing: 4,
      margin: 0, valign: "top",
    });
  });
})();

// =====================================================================
// SLIDE 8 — The Investment (pricing tiers)
// =====================================================================
(function slide8() {
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  chromeTopBottom(s, {
    sectionRoman: "VII",
    sectionName: "THE INVESTMENT",
    footerLabel: "INVESTMENT",
    pageNum: "08 / 09",
  });

  // Headline
  displayHeadline(s, {
    x: LEFT, y: 1.4, w: 11, h: 2.5,
    parts: [
      { text: "Honest about the", breakLine: true },
      { text: "numbers.", italic: true },
    ],
    fontSize: 56,
    lineSpacingMultiple: 1.02,
  });

  // Right-side intro
  s.addText(
    "Three engagement tiers, all inclusive of vetting, matching, contract, aftercare, and our one-year replacement guarantee. Salaries paid directly to the nanny are separate and vary by placement.",
    {
      x: 12.5, y: 2.3, w: 6.5, h: 1.8,
      fontFace: SANS, fontSize: 12, color: COLOR.inkSoft,
      margin: 0, valign: "top", lineSpacingMultiple: 1.45,
    }
  );

  // Divider
  s.addShape(pres.shapes.LINE, {
    x: LEFT, y: 4.2, w: 18, h: 0, line: { color: COLOR.mutedLt, width: 0.75 },
  });

  // Three tier cards
  const tiers = [
    {
      label: "TIER ONE", name: "The ", nameItalic: "Introduction",
      price: "£18–28k", priceSub: "ONE-TIME FEE",
      items: [
        "Part-time & daily placements",
        "Shortlist of 3 Norland-trained nannies",
        "Trial week included",
        "6-month replacement guarantee",
        "Standard vetting & references",
      ],
      dark: false, mostChosen: false,
    },
    {
      label: "TIER TWO", name: "The ", nameItalic: "Residence",
      price: "£45–65k", priceSub: "ONE-TIME FEE",
      items: [
        "Full-time live-in & travel nannies",
        "Shortlist of 5, including video dossiers",
        "Two-week paid trial",
        "12-month replacement guarantee",
        "Enhanced vetting, psychometric, medical",
        "Dedicated family liaison for year one",
      ],
      dark: true, mostChosen: true,
    },
    {
      label: "TIER THREE", name: "The ", nameItalic: "Household",
      price: "From £95k", priceSub: "ANNUAL RETAINER",
      items: [
        "Multi-nanny & staffed-household briefs",
        "Governess, maternity, travel, on rotation",
        "Unlimited matches & replacements",
        "Ongoing staff management & reviews",
        "Priority emergency & overnight cover",
        "Private concierge introductions",
      ],
      dark: false, mostChosen: false,
    },
  ];

  const cardY = 4.6, cardH = 5.4, cardW = 5.8;
  const cardsX = [LEFT, LEFT + 6.1, LEFT + 12.2];

  tiers.forEach((t, i) => {
    const x = cardsX[i];
    const bg = t.dark ? COLOR.black : COLOR.offWhite;
    const textColor = t.dark ? "FFFFFF" : COLOR.ink;
    const subColor = t.dark ? "B8B2A5" : COLOR.muted;
    const bodyColor = t.dark ? "D9D4C8" : COLOR.inkSoft;

    // Card
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: cardW, h: cardH,
      fill: { color: bg }, line: { type: "none" },
    });

    // "MOST CHOSEN" chip (top-right of middle card)
    if (t.mostChosen) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: x + cardW - 1.9, y: cardY + 0.3, w: 1.5, h: 0.4,
        fill: { color: COLOR.sage }, line: { type: "none" },
      });
      s.addText("MOST CHOSEN", {
        x: x + cardW - 1.9, y: cardY + 0.3, w: 1.5, h: 0.4,
        fontFace: MONO, fontSize: 8, color: "FFFFFF", charSpacing: 3, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
    }

    // Tier label
    s.addText(t.label, {
      x: x + 0.45, y: cardY + 0.4, w: 3, h: 0.35,
      fontFace: MONO, fontSize: 10, color: subColor, charSpacing: 5,
      margin: 0, valign: "middle",
    });

    // Tier name (with one italic word in sage)
    s.addText(
      [
        { text: t.name, options: { color: textColor } },
        { text: t.nameItalic, options: { italic: true, color: COLOR.sage } },
      ],
      {
        x: x + 0.45, y: cardY + 0.85, w: cardW - 0.9, h: 0.7,
        fontFace: SANS, fontSize: 28, margin: 0, valign: "middle",
      }
    );

    // Price row
    s.addText(t.price, {
      x: x + 0.45, y: cardY + 1.65, w: 3.3, h: 0.7,
      fontFace: SANS, fontSize: 34, color: textColor,
      margin: 0, valign: "middle",
    });
    s.addText(t.priceSub, {
      x: x + 3.75, y: cardY + 1.85, w: 1.95, h: 0.3,
      fontFace: MONO, fontSize: 9, color: subColor, charSpacing: 4,
      margin: 0, valign: "middle",
    });

    // Divider
    s.addShape(pres.shapes.LINE, {
      x: x + 0.45, y: cardY + 2.5, w: cardW - 0.9, h: 0,
      line: { color: t.dark ? "3A362E" : COLOR.mutedLt, width: 0.5 },
    });

    // Items list
    const itemRuns = [];
    t.items.forEach((it, idx) => {
      itemRuns.push({
        text: it,
        options: { breakLine: idx !== t.items.length - 1, color: bodyColor },
      });
    });
    s.addText(itemRuns, {
      x: x + 0.45, y: cardY + 2.7, w: cardW - 0.9, h: cardH - 3,
      fontFace: SANS, fontSize: 12, color: bodyColor,
      margin: 0, valign: "top", paraSpaceAfter: 4,
    });
  });

  // Footnote
  s.addText(
    "All figures exclusive of VAT. Annual salaries for placed nannies typically range £55,000–£130,000 depending on experience, language, and living arrangement. Detailed quotes follow the Listening Call.",
    {
      x: LEFT, y: 10.2, w: 15, h: 0.3,
      fontFace: SANS, fontSize: 9, italic: true, color: COLOR.muted,
      margin: 0, valign: "middle",
    }
  );
})();

// =====================================================================
// SLIDE 9 — Let Us Begin
// =====================================================================
(function slide9() {
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  // Right dark panel
  const rightX = 11.3;
  const rightW = 20 - rightX;
  s.addShape(pres.shapes.RECTANGLE, {
    x: rightX, y: 0, w: rightW, h: 11.25,
    fill: { color: COLOR.black }, line: { type: "none" },
  });

  // Chrome — left side
  s.addText("VIII · LET US BEGIN", {
    x: LEFT, y: 0.7, w: 5, h: 0.35,
    fontFace: MONO, fontSize: 10, color: COLOR.muted, charSpacing: 4,
    margin: 0, valign: "middle",
  });
  s.addText("Thoughtful Cares", {
    x: 7, y: 0.7, w: 4, h: 0.35,
    fontFace: SANS, fontSize: 14, italic: true, color: COLOR.ink,
    align: "right", margin: 0, valign: "middle",
  });

  // Footer (left panel)
  s.addText("CONTACT", {
    x: LEFT, y: 10.6, w: 4, h: 0.3,
    fontFace: MONO, fontSize: 9, color: COLOR.muted, charSpacing: 4,
    margin: 0, valign: "middle",
  });
  s.addText("09 / 09", {
    x: 7.5, y: 10.6, w: 3, h: 0.3,
    fontFace: MONO, fontSize: 9, color: COLOR.muted, charSpacing: 4,
    align: "right", margin: 0, valign: "middle",
  });

  // LEFT side content
  s.addText("BEGIN A CONVERSATION", {
    x: LEFT, y: 1.3, w: 8, h: 0.35,
    fontFace: MONO, fontSize: 10, color: COLOR.muted, charSpacing: 5,
    margin: 0, valign: "middle",
  });

  // Headline
  displayHeadline(s, {
    x: LEFT, y: 1.8, w: 10, h: 3.5,
    parts: [
      { text: "When you're", breakLine: true },
      { text: "ready.", italic: true },
    ],
    fontSize: 76,
    lineSpacingMultiple: 1.0,
  });

  // Body
  s.addText(
    "No forms, no portal, no pitch call. A single email or phone number, answered by someone who will remember it the second time you call.",
    {
      x: LEFT, y: 5.5, w: 6.5, h: 1.3,
      fontFace: SANS, fontSize: 14, color: COLOR.inkSoft,
      margin: 0, valign: "top", lineSpacingMultiple: 1.5,
    }
  );

  // Divider
  s.addShape(pres.shapes.LINE, {
    x: LEFT, y: 7.6, w: rightX - LEFT - 0.5, h: 0,
    line: { color: COLOR.mutedLt, width: 0.75 },
  });

  // Contact grid — 2x2
  const contacts = [
    { label: "WRITE",                    value: "families@thoughtfulcares.co", row: 0, col: 0 },
    { label: "TELEPHONE (UK)",           value: "+44 (0)20 7946 0812",         row: 0, col: 1 },
    { label: "IN PERSON, BY APPOINTMENT",value: "18 Curzon Street, Mayfair W1J",row: 1, col: 0 },
    { label: "PRINCIPAL",                value: "Eleanor Hastings, VP of Placements", row: 1, col: 1 },
  ];
  contacts.forEach((c) => {
    const x = LEFT + c.col * 5.0;
    const y = 7.95 + c.row * 1.2;
    s.addText(c.label, {
      x, y, w: 4.8, h: 0.3,
      fontFace: MONO, fontSize: 9, color: COLOR.muted, charSpacing: 4,
      margin: 0, valign: "middle",
    });
    s.addText(c.value, {
      x, y: y + 0.35, w: 4.8, h: 0.6,
      fontFace: SANS, fontSize: 16, color: COLOR.ink,
      margin: 0, valign: "top", lineSpacingMultiple: 1.3,
    });
  });

  // RIGHT side content
  const rxPad = rightX + 0.7;
  const rInnerW = rightW - 1.4;

  s.addText("WHAT HAPPENS", {
    x: rxPad, y: 0.7, w: 4, h: 0.35,
    fontFace: MONO, fontSize: 10, color: "B8B2A5", charSpacing: 5,
    margin: 0, valign: "middle",
  });

  s.addText(
    "A short reply, usually within the same working day, with a time to speak at length.",
    {
      x: rxPad, y: 1.5, w: rInnerW, h: 2.3,
      fontFace: SANS, fontSize: 32, italic: true, color: "F4EFE7",
      margin: 0, valign: "top", lineSpacingMultiple: 1.15,
    }
  );

  // Three numbered items with divider lines
  const nextSteps = [
    { roman: "i.",   text: "A brief call to understand what you're looking for." },
    { roman: "ii.",  text: "An in-person Listening Call, at your home or ours." },
    { roman: "iii.", text: "Your shortlist, typically within three to four weeks." },
  ];

  let ny = 4.2;
  nextSteps.forEach((st, idx) => {
    // Top divider (only first one gets an upper line)
    if (idx === 0) {
      s.addShape(pres.shapes.LINE, {
        x: rxPad, y: ny, w: rInnerW, h: 0,
        line: { color: "3A362E", width: 0.75 },
      });
    }
    s.addText(st.roman, {
      x: rxPad, y: ny + 0.2, w: 0.7, h: 0.5,
      fontFace: SANS, fontSize: 14, italic: true, color: COLOR.sage,
      margin: 0, valign: "middle",
    });
    s.addText(st.text, {
      x: rxPad + 0.8, y: ny + 0.2, w: rInnerW - 0.8, h: 0.5,
      fontFace: SANS, fontSize: 13, color: "D9D4C8",
      margin: 0, valign: "middle",
    });
    ny += 0.85;
    // Bottom divider
    s.addShape(pres.shapes.LINE, {
      x: rxPad, y: ny, w: rInnerW, h: 0,
      line: { color: "3A362E", width: 0.75 },
    });
  });

  // Sign-off
  s.addText(
    [
      { text: "— ",                        options: { color: "B8B2A5" } },
      { text: "With warmth, ",             options: { italic: true, color: "D9D4C8" } },
      { text: "The Thoughtful Cares team", options: { color: "FFFFFF" } },
    ],
    {
      x: rxPad, y: 10.35, w: rInnerW, h: 0.4,
      fontFace: SANS, fontSize: 14,
      align: "right", margin: 0, valign: "middle",
    }
  );
})();

pres.writeFile({ fileName: "Thoughtful-Cares.pptx" }).then((f) => {
  console.log("Wrote:", f);
});
