// plan3.js — Recreates "Plan_3.pptx" using pptxgenjs.
// Run:  node plan3.js   ->  Plan_3.pptx
//
// Custom slide size: 20" × 11.25"  (captured from source presentation.xml).

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.defineLayout({ name: "PLAN3", width: 20, height: 11.25 });
pres.layout = "PLAN3";
pres.title = "Transitions — Admissions & Transition Support";

// ---------- Palette ----------
const C = {
  cream:       "F5EFE6", // slide background (slides 2–9)
  creamDeep:   "F0E5D1", // slide 1 background
  creamLite:   "FAF6EE", // card background
  dark:        "2C3A2E", // primary dark forest green
  body:        "4A5A4C", // secondary text
  muted:       "6E7D70", // caption / label muted
  accent:      "A86647", // terracotta (labels/accents)
  accentLite:  "C17B5C", // lighter terracotta (italic words)
  peach:       "E8B89E", // peach accent (dark slide highlights)
  tan:         "E8DCC6", // tan (on dark card)
  warmGray:    "B8AF9B", // warm gray (on dark card)
};

// ---------- Fonts ----------
const FONT = "Arial";

// ---------- Helpers ----------

// Reusable "Transitions" wordmark + right-side kicker label that appears on
// most content slides. onDark=true switches text to cream for slide 10.
function addHeader(slide, kicker, onDark = false) {
  const brandColor  = onDark ? C.cream : C.dark;
  const kickerColor = onDark ? C.cream : C.muted;
  slide.addText("Transitions", {
    x: 1.25, y: 0.5, w: 3.0, h: 0.5,
    fontFace: FONT, fontSize: 22.5, italic: true,
    color: brandColor, charSpacing: -0.22, margin: 0, valign: "top", align: "left",
  });
  if (kicker) {
    slide.addText(kicker, {
      x: 12.5, y: 0.554, w: 6.35, h: 0.4,
      fontFace: FONT, fontSize: 18, color: kickerColor,
      charSpacing: 3.24, align: "right", valign: "top", margin: 0,
    });
  }
}

// Thin horizontal rule. `transparency` is 0-100 (higher = more transparent).
function rule(slide, x, y, w, color = C.dark, thickness = 0.01, transparency = 0) {
  const fill = transparency > 0 ? { color, transparency } : { color };
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: thickness, fill, line: { type: "none" },
  });
}

// ==================================================================
// SLIDE 1 — Title
// ==================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.creamDeep };

  // Right-side decorative block (placeholder for hero image/photo).
  // Source uses C17B5C at 14% alpha — a very pale peach wash.
  s.addShape(pres.shapes.RECTANGLE, {
    x: 11.174, y: 3.629, w: 5.017, h: 6.683,
    fill: { color: C.accentLite, transparency: 86 }, line: { type: "none" },
  });

  // Wordmark + kicker
  s.addText("Transitions", {
    x: 1.25, y: 0.938, w: 3.0, h: 0.5,
    fontFace: FONT, fontSize: 25.5, italic: true,
    color: C.dark, charSpacing: -0.25, margin: 0,
  });
  s.addText("FOR FAMILIES, FOR NOW & AFTER ADMISSIONS & TRANSITION SUPPORT", {
    x: 12.0, y: 0.938, w: 6.75, h: 0.95,
    fontFace: FONT, fontSize: 18, color: C.body,
    charSpacing: 3.96, align: "right", valign: "top", margin: 0,
  });

  // Hero title
  s.addText(
    [
      { text: "A steady hand, ", options: { color: C.dark } },
      { text: "twice",           options: { color: C.accent, italic: true } },
      { text: ".",               options: { color: C.dark } },
    ],
    {
      x: 1.25, y: 4.6, w: 10.0, h: 3.6,
      fontFace: FONT, fontSize: 126, bold: false,
      charSpacing: -4.41, paraSpaceAfter: 0, lineSpacingMultiple: 0.95,
      valign: "top", align: "left", margin: 0,
    }
  );

  // Divider under title (source: 2C3A2E at 35% alpha)
  rule(s, 1.25, 8.643, 5.833, C.dark, 0.01, 65);

  // Subtitle
  s.addText(
    "Getting in is one journey. Settling in is another. We walk both with your family.",
    {
      x: 1.25, y: 8.9, w: 9.5, h: 1.4,
      fontFace: FONT, fontSize: 25.5, color: C.body,
      lineSpacingMultiple: 1.25, valign: "top", align: "left", margin: 0,
    }
  );
}

// ==================================================================
// SLIDE 2 — Why we exist
// ==================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "WHY WE EXIST");

  s.addText(
    [
      { text: "Getting into college is only ", options: { color: C.dark } },
      { text: "half ",                          options: { color: C.accent, italic: true } },
      { text: "the journey.",                   options: { color: C.dark } },
    ],
    {
      x: 2.0, y: 3.7, w: 16.0, h: 3.0,
      fontFace: FONT, fontSize: 90, charSpacing: -2.7,
      align: "center", valign: "top", margin: 0,
      lineSpacingMultiple: 1.05,
    }
  );

  // Small accent rule
  rule(s, 9.375, 6.85, 1.25, C.accentLite, 0.03);

  s.addText(
    "THE OTHER HALF IS WHAT MOST FAMILIES FACE ALONE",
    {
      x: 4.0, y: 7.35, w: 12.0, h: 0.45,
      fontFace: FONT, fontSize: 19.5, color: C.muted,
      charSpacing: 3.9, align: "center", valign: "top", margin: 0,
    }
  );
}

// ==================================================================
// SLIDE 3 — Our Model (two-card comparison)
// ==================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "OUR MODEL");

  // Big two-line title
  s.addText(
    [
      { text: "Two experts. One family. ", options: { color: C.dark } },
      { text: "Start to finish.",           options: { color: C.accent, italic: true } },
    ],
    {
      x: 1.25, y: 1.3, w: 12.5, h: 1.9,
      fontFace: FONT, fontSize: 57, charSpacing: -1.14,
      align: "left", valign: "top", margin: 0,
      lineSpacingMultiple: 1.05,
    }
  );

  // Right-side supporting note
  s.addText(
    "Most firms stop at the acceptance letter. We begin there, too.",
    {
      x: 14.5, y: 1.85, w: 4.25, h: 1.2,
      fontFace: FONT, fontSize: 18, color: C.muted,
      align: "right", valign: "top", margin: 0,
      lineSpacingMultiple: 1.3, charSpacing: 0.36,
    }
  );

  // ---- Left card: THE ECONOMIST ----
  const cardY = 3.748, cardH = 6.668, cardW = 7.981;
  const leftX = 1.25, rightX = 10.769, midX = 9.231, midW = 1.539;

  s.addShape(pres.shapes.RECTANGLE, {
    x: leftX, y: cardY, w: cardW, h: cardH,
    fill: { color: C.creamLite }, line: { type: "none" },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: midX, y: cardY, w: midW, h: cardH,
    fill: { color: C.cream }, line: { type: "none" },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: rightX, y: cardY, w: cardW, h: cardH,
    fill: { color: C.creamLite }, line: { type: "none" },
  });

  // Central ampersand
  s.addText("&", {
    x: midX, y: cardY, w: midW, h: cardH,
    fontFace: FONT, fontSize: 105, italic: true, color: C.accentLite,
    align: "center", valign: "middle", margin: 0,
  });

  // Helper for each card's inner content
  function modelCard(xOff, label, header, headerItalic, body, items) {
    const ix = xOff + 0.592;          // inner padding
    const iw = cardW - 1.184;

    s.addText(label, {
      x: ix, y: 4.257, w: iw, h: 0.4,
      fontFace: FONT, fontSize: 18, color: C.accent,
      charSpacing: 4.32, margin: 0, valign: "top",
    });

    s.addText(
      [
        { text: header,        options: { color: C.dark } },
        { text: headerItalic,  options: { color: C.accent, italic: true } },
      ],
      {
        x: ix, y: 4.7, w: iw, h: 0.85,
        fontFace: FONT, fontSize: 42, charSpacing: -0.84,
        margin: 0, valign: "top", align: "left",
      }
    );

    s.addText(body, {
      x: ix, y: 5.65, w: iw, h: 1.6,
      fontFace: FONT, fontSize: 19.5, color: C.body,
      lineSpacingMultiple: 1.3, margin: 0, valign: "top",
    });

    // Three list rows with separators (source: 15% alpha dark)
    const rowYs = [7.8, 8.5, 9.2];
    const textYs = [7.954, 8.654, 9.354];
    const romans = ["i.", "ii.", "iii."];

    rowYs.forEach((ry) => rule(s, ix, ry, iw, C.dark, 0.01, 85));
    rule(s, ix, 9.9, iw, C.dark, 0.01, 85); // bottom rule

    items.forEach((it, idx) => {
      s.addText(romans[idx], {
        x: ix, y: textYs[idx], w: 0.6, h: 0.45,
        fontFace: FONT, fontSize: 18, italic: true, color: C.accent,
        margin: 0, valign: "middle",
      });
      s.addText(it, {
        x: ix + 0.55, y: textYs[idx], w: iw - 0.55, h: 0.45,
        fontFace: FONT, fontSize: 18, color: C.dark,
        margin: 0, valign: "middle",
      });
    });
  }

  modelCard(
    leftX,
    "BEFORE — THE APPLICATION",
    "The ",
    "economist",
    "Decision science applied to college fit — school list, essays, and the numbers behind the offer.",
    ["Strategy & fit modeling", "Applications & essays", "Financial aid & ROI"]
  );

  modelCard(
    rightX,
    "AFTER — THE TRANSITION",
    "The ",
    "therapist",
    "Clinical support for the emotional work of leaving home — readiness, first semester, and beyond.",
    ["Pre-college readiness", "First-semester support", "Freshman-year check-ins"]
  );
}

// ==================================================================
// SLIDE 4 — Meet Your Team
// ==================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "MEET YOUR TEAM");

  // Small pre-title label
  s.addText("MEET YOUR TEAM", {
    x: 1.25, y: 1.35, w: 15.0, h: 0.4,
    fontFace: FONT, fontSize: 18, color: C.accent,
    charSpacing: 3.96, margin: 0, valign: "top",
  });

  // Big title
  s.addText(
    [
      { text: "Two practitioners. Deep training. ", options: { color: C.dark } },
      { text: "Warm bedside.",                       options: { color: C.accent, italic: true } },
    ],
    {
      x: 1.25, y: 1.85, w: 18.0, h: 1.85,
      fontFace: FONT, fontSize: 63, charSpacing: -1.26,
      margin: 0, valign: "top", align: "left",
    }
  );

  // Two rows: dark placeholder block + text block
  const teamRows = [
    {
      photoX: 1.25, textX: 4.5,
      label: "THE ECONOMIST",
      degree: "Ph.D., Economics of Education — Columbia University",
      bio: "Builds fit-and-finance models for each student, then coaches the application through submission. The work that used to be guesswork.",
    },
    {
      photoX: 10.375, textX: 13.625,
      label: "THE THERAPIST",
      degree: "M.A., Therapy — Baylor University",
      bio: "Prepares students for the emotional turn of freshman year, and stays in their corner through the homesick weeks and the quiet ones.",
    },
  ];

  teamRows.forEach((r) => {
    // Photo placeholder — source uses 2C3A2E at 9% alpha (a faint wash)
    s.addShape(pres.shapes.RECTANGLE, {
      x: r.photoX, y: 4.072, w: 2.933, h: 3.663,
      fill: { color: C.dark, transparency: 91 }, line: { type: "none" },
    });

    s.addText(r.label, {
      x: r.textX, y: 4.114, w: 5.28, h: 0.4,
      fontFace: FONT, fontSize: 18, color: C.accent,
      charSpacing: 4.32, margin: 0, valign: "top",
    });
    s.addText("[ Name ]", {
      x: r.textX, y: 4.585, w: 5.28, h: 0.7,
      fontFace: FONT, fontSize: 42, color: C.dark, charSpacing: -0.84,
      margin: 0, valign: "top",
    });
    s.addText(r.degree, {
      x: r.textX, y: 5.3, w: 5.28, h: 0.55,
      fontFace: FONT, fontSize: 19.5, italic: true, color: C.body,
      margin: 0, valign: "top",
    });
    s.addText(r.bio, {
      x: r.textX, y: 5.95, w: 5.28, h: 1.75,
      fontFace: FONT, fontSize: 18, color: C.body,
      lineSpacingMultiple: 1.35, margin: 0, valign: "top",
    });
  });
}

// ==================================================================
// SLIDE 5 — BEFORE · With the Economist
// ==================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "BEFORE · WITH THE ECONOMIST");

  // Big roman numeral I.
  s.addText("I.", {
    x: 1.25, y: 1.25, w: 2.0, h: 2.0,
    fontFace: FONT, fontSize: 135, italic: true, color: C.accentLite,
    margin: 0, valign: "top", align: "left",
  });

  // Right-aligned small "BEFORE" kicker
  s.addText("BEFORE", {
    x: 6.95, y: 2.69, w: 11.8, h: 0.4,
    fontFace: FONT, fontSize: 18, color: C.accent,
    charSpacing: 3.96, align: "right", valign: "top", margin: 0,
  });

  // Right-aligned big title
  s.addText(
    [
      { text: "The ",                     options: { color: C.dark } },
      { text: "application ",             options: { color: C.accent, italic: true } },
      { text: ", engineered with care.",  options: { color: C.dark } },
    ],
    {
      x: 6.95, y: 3.15, w: 11.8, h: 1.9,
      fontFace: FONT, fontSize: 57, charSpacing: -1.14,
      align: "right", valign: "top", margin: 0, lineSpacingMultiple: 1.05,
    }
  );

  // Top full-width rule (source: 35% alpha)
  rule(s, 1.25, 5.383, 17.5, C.dark, 0.02, 65);

  // 2x2 grid items
  const items = [
    { col: 0, row: 0, num: "01", title: "School list strategy",
      body: "A ranked list built from admit probability, fit, finances, and the student's own north star — not a template." },
    { col: 1, row: 0, num: "02", title: "Application & essay coaching",
      body: "Line-by-line work on essays and supplementals. The student's voice, held to a rigorous standard." },
    { col: 0, row: 1, num: "03", title: "Financial aid & ROI",
      body: "Net-price modeling, aid appeals, and a clear-eyed look at the return on each offer before you commit." },
    { col: 1, row: 1, num: "04", title: "Parent coaching",
      body: "Weekly calls so parents know where things stand, what to say, and when to step back." },
  ];

  const colXs = [1.25, 10.417];
  const rowYs = [5.83, 7.74];        // number y
  const titleDY = -0.06;              // title baseline vs number row
  const bodyDY = 0.47;
  const dividerYs = [7.296, 9.208];   // divider below each row

  items.forEach((it) => {
    const x = colXs[it.col];
    const y = rowYs[it.row];
    s.addText(it.num, {
      x, y, w: 0.85, h: 0.45,
      fontFace: FONT, fontSize: 24, italic: true, color: C.accent,
      margin: 0, valign: "top",
    });
    s.addText(it.title, {
      x: x + 0.92, y: y + titleDY, w: 7.64, h: 0.55,
      fontFace: FONT, fontSize: 24, color: C.dark,
      margin: 0, valign: "top",
    });
    s.addText(it.body, {
      x: x + 0.92, y: y + bodyDY, w: 7.64, h: 0.9,
      fontFace: FONT, fontSize: 18, color: C.body,
      lineSpacingMultiple: 1.3, margin: 0, valign: "top",
    });
  });

  // Dividers between rows (source: 15% alpha)
  rule(s, 1.25,   dividerYs[0], 8.333, C.dark, 0.01, 85);
  rule(s, 10.417, dividerYs[0], 8.333, C.dark, 0.01, 85);
  rule(s, 1.25,   dividerYs[1], 8.333, C.dark, 0.01, 85);
  rule(s, 10.417, dividerYs[1], 8.333, C.dark, 0.01, 85);
}

// ==================================================================
// SLIDE 6 — AFTER · With the Therapist  (mirror of slide 5)
// ==================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "AFTER · WITH THE THERAPIST");

  s.addText("II.", {
    x: 1.25, y: 1.25, w: 2.5, h: 2.0,
    fontFace: FONT, fontSize: 135, italic: true, color: C.accentLite,
    margin: 0, valign: "top", align: "left",
  });

  s.addText("AFTER", {
    x: 6.95, y: 2.69, w: 11.8, h: 0.4,
    fontFace: FONT, fontSize: 18, color: C.accent,
    charSpacing: 3.96, align: "right", valign: "top", margin: 0,
  });

  s.addText(
    [
      { text: "The ",                 options: { color: C.dark } },
      { text: "transition ",          options: { color: C.accent, italic: true } },
      { text: ", held with care.",    options: { color: C.dark } },
    ],
    {
      x: 6.95, y: 3.15, w: 11.8, h: 1.9,
      fontFace: FONT, fontSize: 57, charSpacing: -1.14,
      align: "right", valign: "top", margin: 0, lineSpacingMultiple: 1.05,
    }
  );

  rule(s, 1.25, 5.383, 17.5, C.dark, 0.02, 65);

  const items = [
    { col: 0, row: 0, num: "01", title: "Pre-college readiness",
      body: "Summer sessions that build the emotional skills — independence, roommates, asking for help — before move-in day." },
    { col: 1, row: 0, num: "02", title: "First-semester support",
      body: "Weekly sessions through the hardest weeks, when everyone else has gone quiet and the novelty wears off." },
    { col: 0, row: 1, num: "03", title: "Homesickness & anxiety coaching",
      body: "Tools for the 2 a.m. calls home — for the student, and a script for the parent on the other end." },
    { col: 1, row: 1, num: "04", title: "Freshman-year check-ins",
      body: "Standing monthly appointments through the full first year. Small nudges, before small things become large." },
  ];

  const colXs = [1.25, 10.417];
  const rowYs = [5.83, 7.74];

  items.forEach((it) => {
    const x = colXs[it.col];
    const y = rowYs[it.row];
    s.addText(it.num, {
      x, y, w: 0.85, h: 0.45,
      fontFace: FONT, fontSize: 24, italic: true, color: C.accent, margin: 0, valign: "top",
    });
    s.addText(it.title, {
      x: x + 0.92, y: y - 0.06, w: 7.64, h: 0.55,
      fontFace: FONT, fontSize: 24, color: C.dark, margin: 0, valign: "top",
    });
    s.addText(it.body, {
      x: x + 0.92, y: y + 0.47, w: 7.64, h: 1.1,
      fontFace: FONT, fontSize: 18, color: C.body,
      lineSpacingMultiple: 1.3, margin: 0, valign: "top",
    });
  });

  rule(s, 1.25,   7.296, 8.333, C.dark, 0.01, 85);
  rule(s, 10.417, 7.296, 8.333, C.dark, 0.01, 85);
  rule(s, 1.25,   9.208, 8.333, C.dark, 0.01, 85);
  rule(s, 10.417, 9.208, 8.333, C.dark, 0.01, 85);
}

// ==================================================================
// SLIDE 7 — How We Work
// ==================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "HOW WE WORK");

  s.addText("HOW WE WORK WITH YOUR FAMILY", {
    x: 1.25, y: 1.35, w: 15.0, h: 0.4,
    fontFace: FONT, fontSize: 18, color: C.accent, charSpacing: 3.96,
    margin: 0, valign: "top",
  });

  s.addText(
    [
      { text: "A year and a half of ",  options: { color: C.dark } },
      { text: "steady ",                options: { color: C.accent, italic: true } },
      { text: "company.",               options: { color: C.dark } },
    ],
    {
      x: 1.25, y: 1.95, w: 17.0, h: 1.9,
      fontFace: FONT, fontSize: 63, charSpacing: -1.26,
      margin: 0, valign: "top", align: "left",
    }
  );

  // Full-width rule under title (source: 35% alpha)
  rule(s, 1.25, 4.947, 17.5, C.dark, 0.02, 65);

  // Role labels
  s.addText("ECONOMIST", {
    x: 1.25, y: 4.135, w: 4.0, h: 0.4,
    fontFace: FONT, fontSize: 18, color: C.accent, charSpacing: 4.32,
    margin: 0, valign: "top",
  });
  s.addText("THERAPIST", {
    x: 11.75, y: 4.135, w: 4.0, h: 0.4,
    fontFace: FONT, fontSize: 18, color: C.accent, charSpacing: 4.32,
    margin: 0, valign: "top",
  });

  // Five timeline columns. The 5th has a 2-line kicker ("FULL FRESHMAN YEAR"),
  // so its title and body sit lower to match the source.
  const steps = [
    { x: 1.25,  num: "01", period: "SPRING, JR. YEAR",   title: "Intake & fit modeling",
      body: "A long conversation, then a ranked list of schools that make sense on paper and in person.",
      periodH: 0.35, titleY: 6.18, bodyY: 7.15 },
    { x: 4.75,  num: "02", period: "SUMMER → FALL",      title: "Applications & essays",
      body: "Weekly coaching through drafts, supplementals, and submissions.",
      periodH: 0.35, titleY: 6.18, bodyY: 7.15 },
    { x: 8.25,  num: "03", period: "WINTER → SPRING",    title: "Decisions & aid",
      body: "Net-price analysis and a calm conversation about the final yes.",
      periodH: 0.35, titleY: 6.18, bodyY: 6.74 },
    { x: 11.75, num: "04", period: "SUMMER BEFORE",      title: "Readiness sessions",
      body: "Emotional and practical prep in the weeks before move-in day.",
      periodH: 0.35, titleY: 6.18, bodyY: 6.74 },
    { x: 15.25, num: "05", period: "FULL FRESHMAN YEAR", title: "Ongoing support",
      body: "Weekly early, monthly later. The check-ins most students quietly need.",
      periodH: 0.65, titleY: 6.49, bodyY: 7.02 },
  ];

  steps.forEach((st) => {
    // Dot on the rule
    s.addShape(pres.shapes.OVAL, {
      x: st.x, y: 4.864, w: 0.208, h: 0.208,
      fill: { color: C.accentLite }, line: { type: "none" },
    });
    // Number
    s.addText(st.num, {
      x: st.x, y: 5.36, w: 3.39, h: 0.4,
      fontFace: FONT, fontSize: 18, italic: true, color: C.accent,
      charSpacing: 0.36, margin: 0, valign: "top",
    });
    // Period label
    s.addText(st.period, {
      x: st.x, y: 5.76, w: 3.39, h: st.periodH,
      fontFace: FONT, fontSize: 18, color: C.muted, charSpacing: 3.6,
      margin: 0, valign: "top",
    });
    // Big title
    s.addText(st.title, {
      x: st.x, y: st.titleY, w: 3.39, h: 0.55,
      fontFace: FONT, fontSize: 25.5, color: C.dark, margin: 0, valign: "top",
    });
    // Body
    s.addText(st.body, {
      x: st.x, y: st.bodyY, w: 3.0, h: 1.7,
      fontFace: FONT, fontSize: 18, color: C.body,
      lineSpacingMultiple: 1.35, margin: 0, valign: "top",
    });
  });
}

// ==================================================================
// SLIDE 8 — Packages
// ==================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "PACKAGES");

  s.addText(
    [
      { text: "Three ways to ",  options: { color: C.dark } },
      { text: "work together.",  options: { color: C.accent, italic: true } },
    ],
    {
      x: 1.25, y: 1.3, w: 12.0, h: 1.9,
      fontFace: FONT, fontSize: 57, charSpacing: -1.14,
      margin: 0, valign: "top", align: "left",
    }
  );

  s.addText(
    "All packages include both practitioners. Scope and cadence adjust to your family's timeline.",
    {
      x: 13.6, y: 1.85, w: 5.25, h: 1.4,
      fontFace: FONT, fontSize: 18, color: C.muted,
      lineSpacingMultiple: 1.35, align: "right", valign: "top", margin: 0,
    }
  );

  // Three package cards
  const cardY = 3.582, cardH = 6.9, cardW = 5.667;
  const cardXs = [1.25, 7.167, 13.083];

  // Foundation (light)
  {
    const x = cardXs[0];
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: cardW, h: cardH,
      fill: { color: C.creamLite }, line: { type: "none" },
    });
    const ix = x + 0.425, iw = cardW - 0.85;
    s.addText("FOUNDATION", {
      x: ix, y: 4.05, w: iw, h: 0.4,
      fontFace: FONT, fontSize: 18, color: C.accent, charSpacing: 4.32,
      margin: 0, valign: "top",
    });
    s.addText("Foundation", {
      x: ix, y: 4.5, w: iw, h: 0.75,
      fontFace: FONT, fontSize: 36, italic: true, color: C.dark,
      charSpacing: -0.54, margin: 0, valign: "top",
    });
    s.addText(
      [
        { text: "$6,500 ",      options: { color: C.body, fontSize: 22.5 } },
        { text: "/ engagement", options: { color: C.muted, fontSize: 18 } },
      ],
      {
        x: ix, y: 5.25, w: iw, h: 0.5,
        fontFace: FONT, margin: 0, valign: "top",
      }
    );
    s.addText(
      [
        { text: "School list & essay coaching",       options: { breakLine: true } },
        { text: "Financial aid review",               options: { breakLine: true } },
        { text: "Pre-college readiness (4 sessions)", options: { breakLine: true } },
        { text: "First-semester check-ins (monthly)" },
      ],
      {
        x: ix, y: 5.95, w: iw, h: 3.2,
        fontFace: FONT, fontSize: 18, color: C.dark,
        lineSpacingMultiple: 1.5, margin: 0, valign: "top",
      }
    );
  }

  // Companion (dark, highlighted)
  {
    const x = cardXs[1];
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: cardW, h: cardH,
      fill: { color: C.dark }, line: { type: "none" },
    });
    const ix = x + 0.425, iw = cardW - 0.85;

    s.addText("FULL JOURNEY", {
      x: ix, y: 4.1, w: 2.8, h: 0.4,
      fontFace: FONT, fontSize: 18, color: C.peach, charSpacing: 4.32,
      margin: 0, valign: "top",
    });

    // "most families" pill
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x + 3.49, y: 4.05, w: 1.75, h: 0.4,
      fill: { color: C.accentLite }, line: { type: "none" }, rectRadius: 0.15,
    });
    s.addText("most families", {
      x: x + 3.49, y: 4.05, w: 1.75, h: 0.4,
      fontFace: FONT, fontSize: 14.5, italic: true, color: C.creamLite,
      align: "center", valign: "middle", margin: 0,
    });

    s.addText("Companion", {
      x: ix, y: 4.6, w: iw, h: 0.75,
      fontFace: FONT, fontSize: 36, italic: true, color: C.cream,
      charSpacing: -0.54, margin: 0, valign: "top",
    });
    s.addText(
      [
        { text: "$12,000 ",     options: { color: C.tan, fontSize: 22.5 } },
        { text: "/ engagement", options: { color: C.warmGray, fontSize: 18 } },
      ],
      {
        x: ix, y: 5.37, w: iw, h: 0.5,
        fontFace: FONT, margin: 0, valign: "top",
      }
    );
    s.addText(
      [
        { text: "Everything in Foundation",              options: { breakLine: true } },
        { text: "Full application coaching & ROI modeling", options: { breakLine: true } },
        { text: "Parent coaching, weekly",                 options: { breakLine: true } },
        { text: "Therapist sessions, weekly Fall semester", options: { breakLine: true } },
        { text: "Freshman-year check-ins, full year" },
      ],
      {
        x: ix, y: 6.05, w: iw, h: 4.2,
        fontFace: FONT, fontSize: 18, color: C.cream,
        lineSpacingMultiple: 1.5, margin: 0, valign: "top",
      }
    );
  }

  // Keepsake (light)
  {
    const x = cardXs[2];
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: cardW, h: cardH,
      fill: { color: C.creamLite }, line: { type: "none" },
    });
    const ix = x + 0.425, iw = cardW - 0.85;
    s.addText("HIGH-TOUCH", {
      x: ix, y: 4.05, w: iw, h: 0.4,
      fontFace: FONT, fontSize: 18, color: C.accent, charSpacing: 4.32,
      margin: 0, valign: "top",
    });
    s.addText("Keepsake", {
      x: ix, y: 4.5, w: iw, h: 0.75,
      fontFace: FONT, fontSize: 36, italic: true, color: C.dark,
      charSpacing: -0.54, margin: 0, valign: "top",
    });
    s.addText(
      [
        { text: "$22,000 ",     options: { color: C.body, fontSize: 22.5 } },
        { text: "/ engagement", options: { color: C.muted, fontSize: 18 } },
      ],
      {
        x: ix, y: 5.25, w: iw, h: 0.5,
        fontFace: FONT, margin: 0, valign: "top",
      }
    );
    s.addText(
      [
        { text: "Everything in Companion",            options: { breakLine: true } },
        { text: "Unlimited sessions, both practitioners", options: { breakLine: true } },
        { text: "Campus visit coordination",           options: { breakLine: true } },
        { text: "On-call through first year",          options: { breakLine: true } },
        { text: "Transition into sophomore year" },
      ],
      {
        x: ix, y: 5.95, w: iw, h: 3.8,
        fontFace: FONT, fontSize: 18, color: C.dark,
        lineSpacingMultiple: 1.5, margin: 0, valign: "top",
      }
    );
  }
}

// ==================================================================
// SLIDE 9 — What Makes Us Different
// ==================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "WHAT MAKES US DIFFERENT");

  s.addText("WHAT MAKES US DIFFERENT", {
    x: 1.25, y: 1.35, w: 15.0, h: 0.4,
    fontFace: FONT, fontSize: 18, color: C.accent, charSpacing: 3.96,
    margin: 0, valign: "top",
  });

  s.addText(
    [
      { text: "Four commitments you ", options: { color: C.dark } },
      { text: "won't ",                 options: { color: C.accent, italic: true } },
      { text: "find elsewhere.",        options: { color: C.dark } },
    ],
    {
      x: 1.25, y: 1.95, w: 17.0, h: 1.9,
      fontFace: FONT, fontSize: 63, charSpacing: -1.26,
      margin: 0, valign: "top", align: "left",
    }
  );

  const cols = [
    { x: 1.25,  num: "i.",   title: "Two practitioners, one plan",
      body: "An economist and a therapist on every engagement. Most firms have neither." },
    { x: 5.75,  num: "ii.",  title: "Past the acceptance letter",
      body: "We keep working through freshman year, when most families feel the quiet." },
    { x: 10.25, num: "iii.", title: "Data-driven college fit",
      body: "Net price, ROI, admit probability — the math most consultants avoid." },
    { x: 14.75, num: "iv.",  title: "Clinical mental-health support",
      body: "A licensed therapist, not a life coach. For the hard weeks, not just the good ones." },
  ];

  cols.forEach((c) => {
    s.addText(c.num, {
      x: c.x, y: 4.42, w: 4.12, h: 1.0,
      fontFace: FONT, fontSize: 54, italic: true, color: C.accentLite,
      margin: 0, valign: "top",
    });
    s.addText(c.title, {
      x: c.x, y: 5.38, w: 3.5, h: 1.35,
      fontFace: FONT, fontSize: 25.5, color: C.dark,
      lineSpacingMultiple: 1.2, margin: 0, valign: "top",
    });
    // small terracotta accent dash
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: 6.85, w: 0.458, h: 0.035,
      fill: { color: C.accentLite }, line: { type: "none" },
    });
    s.addText(c.body, {
      x: c.x, y: 7.05, w: 4.12, h: 1.5,
      fontFace: FONT, fontSize: 18, color: C.body,
      lineSpacingMultiple: 1.35, margin: 0, valign: "top",
    });
  });
}

// ==================================================================
// SLIDE 10 — Let's begin (dark closing)
// ==================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.dark };
  addHeader(s, "LET'S TALK", true);

  // Big "Let's begin."
  s.addText(
    [
      { text: "Let's ", options: { color: C.cream } },
      { text: "begin",  options: { color: C.peach, italic: true } },
      { text: ".",      options: { color: C.cream } },
    ],
    {
      x: 1.25, y: 1.9, w: 10.0, h: 3.6,
      fontFace: FONT, fontSize: 135, charSpacing: -4.72,
      margin: 0, valign: "top", align: "left",
    }
  );

  // Right-side contact block (top rule: source 20% alpha)
  rule(s, 14.375, 1.042, 4.375, C.cream, 0.01, 80);

  const contacts = [
    { y: 1.42, label: "INTRODUCTORY CALL", value: "30 minutes, free" },
    { y: 2.44, label: "EMAIL",             value: "hello@transitions.family" },
    { y: 3.45, label: "SCHEDULE",          value: "transitions.family/intro" },
  ];
  contacts.forEach((c) => {
    s.addText(c.label, {
      x: 14.375, y: c.y, w: 4.5, h: 0.4,
      fontFace: FONT, fontSize: 18, color: C.cream, charSpacing: 4.32,
      margin: 0, valign: "top",
    });
    s.addText(c.value, {
      x: 14.375, y: c.y + 0.35, w: 4.5, h: 0.45,
      fontFace: FONT, fontSize: 24, color: C.cream,
      margin: 0, valign: "top",
    });
  });

  rule(s, 14.375, 5.025, 4.129, C.cream, 0.01, 60);

  // CTA line
  s.addText("Book a 30-minute call", {
    x: 14.375, y: 4.46, w: 3.8, h: 0.55,
    fontFace: FONT, fontSize: 27, italic: true, color: C.cream,
    margin: 0, valign: "top",
  });
  s.addText("→", {
    x: 18.1, y: 4.47, w: 0.6, h: 0.55,
    fontFace: FONT, fontSize: 27, color: C.peach,
    margin: 0, valign: "top",
  });

  // Bottom footer row
  s.addText("TRANSITIONS · ADMISSIONS & TRANSITION SUPPORT", {
    x: 1.25, y: 10.03, w: 12.0, h: 0.4,
    fontFace: FONT, fontSize: 18, color: C.cream, charSpacing: 3.6,
    margin: 0, valign: "top",
  });
  s.addText("THANK YOU", {
    x: 16.5, y: 10.03, w: 2.5, h: 0.4,
    fontFace: FONT, fontSize: 18, color: C.cream, charSpacing: 3.6,
    align: "right", margin: 0, valign: "top",
  });
}

// ---------- Write ----------
pres.writeFile({ fileName: "Plan_3.pptx" })
  .then((p) => console.log("Wrote:", p));
