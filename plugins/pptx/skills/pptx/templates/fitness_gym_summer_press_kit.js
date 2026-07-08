// recreate.js — replica of foOk.pptx using pptxgenjs
// Slide size: 20" x 11.25"  (custom wide)
// Palette:
//   BG dark   : 0A0A0A
//   FG cream  : F2EFE8
//   Accent    : FF3B1F  (orange-red)
//   Heat bg   : 3A1A10  (only on slide 5 right-half)
//   Neutral   : 555555  (avatar circles)
//   Photo ph. : FFFFFF  (white drop-photo placeholders on slide 5)
//   Ink black : 000000

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.defineLayout({ name: "AS_WIDE", width: 20, height: 11.25 });
pres.layout = "AS_WIDE";
pres.author = "AS Marketing";
pres.title = "Always Strength — Summer '26 Press Kit";

// ---------- palette ----------
const C = {
  bg:     "0A0A0A",
  cream:  "F2EFE8",
  accent: "FF3B1F",
  heat:   "3A1A10",
  grey:   "555555",
  white:  "FFFFFF",
  black:  "000000",
};
const FONT = "Arial";

// ---------- shared chrome ----------
function addHeader(slide, pageTag, { light = false } = {}) {
  const fg    = light ? C.black : C.cream;
  const mark  = light ? C.black : C.accent;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.75, y: 0.5, w: 0.23, h: 0.23,
    fill: { color: mark }, line: { type: "none" },
  });
  slide.addText("ALWAYS STRENGTH", {
    x: 1.12, y: 0.51, w: 2.5, h: 0.25,
    fontFace: FONT, fontSize: 11.25, bold: true, color: fg,
    charSpacing: 2, margin: 0, valign: "middle",
  });
  slide.addText(pageTag, {
    x: 14.5, y: 0.53, w: 4.83, h: 0.22,
    fontFace: FONT, fontSize: 11.25, color: fg,
    charSpacing: 2, align: "right", margin: 0, valign: "middle",
  });
}

function addFooter(slide, pageNum, { light = false } = {}) {
  const fg = light ? C.black : C.cream;
  slide.addText("AS · SUMMER '26 PRESS KIT", {
    x: 0.75, y: 10.57, w: 4, h: 0.22,
    fontFace: FONT, fontSize: 11.25, color: fg, charSpacing: 2,
    margin: 0, valign: "middle",
  });
  slide.addText(`PG ${pageNum}`, {
    x: 15.33, y: 10.57, w: 4, h: 0.22,
    fontFace: FONT, fontSize: 11.25, color: fg, charSpacing: 2,
    align: "right", margin: 0, valign: "middle",
  });
}

// ================================================================
// SLIDE 1 — cover
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  // giant off-canvas orange circle (bleeds off top-right)
  s.addShape(pres.shapes.OVAL, {
    x: 7.5, y: -1.67, w: 14.58, h: 14.58,
    fill: { color: C.accent }, line: { type: "none" },
  });

  // header mark + wordmark (custom — not shared version because issue line is on row 2)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.75, y: 0.5, w: 0.23, h: 0.23,
    fill: { color: C.accent }, line: { type: "none" },
  });
  s.addText("ALWAYS STRENGTH", {
    x: 1.12, y: 0.51, w: 2.5, h: 0.25,
    fontFace: FONT, fontSize: 11.25, bold: true, color: C.cream,
    charSpacing: 2, margin: 0, valign: "middle",
  });
  s.addText("PRESS KIT · SUMMER '26", {
    x: 14.5, y: 0.53, w: 4.83, h: 0.22,
    fontFace: FONT, fontSize: 11.25, color: C.cream, charSpacing: 2,
    align: "right", margin: 0, valign: "middle",
  });

  // divider rule under header
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.75, y: 1.88, w: 18.5, h: 0.02,
    fill: { color: C.cream }, line: { type: "none" },
  });

  // issue line
  s.addText("SUMMER KICKOFF · ISSUE NO. 07", {
    x: 0.75, y: 1.46, w: 19.05, h: 0.26,
    fontFace: FONT, fontSize: 13.5, color: C.accent, charSpacing: 3,
    margin: 0, valign: "middle",
  });

  // monster title: BUILT FOR / LONG SUMMER.
  s.addText("BUILT FOR", {
    x: 0.75, y: 2.13, w: 12.64, h: 2.06,
    fontFace: FONT, fontSize: 165, bold: true, color: C.cream,
    charSpacing: -6.6, margin: 0, valign: "middle",
  });
  s.addText("LONG", {
    x: 0.75, y: 4.15, w: 7.03, h: 2.06,
    fontFace: FONT, fontSize: 165, bold: true, color: C.accent,
    charSpacing: -6.6, margin: 0, valign: "middle",
  });
  s.addText("SUMMER.", {
    x: 7.99, y: 4.15, w: 11.93, h: 2.06,
    fontFace: FONT, fontSize: 165, bold: true, color: C.black,
    charSpacing: -6.6, margin: 0, valign: "middle",
  });

  // bottom divider rule
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.75, y: 9.7, w: 18.5, h: 0.01,
    fill: { color: C.cream }, line: { type: "none" },
  });

  // 4-col metadata row at bottom
  const meta = [
    ["LOCATION",    "DOWNTOWN · SF",        0.75],
    ["LAUNCH",      "JUNE 01 · 2026",       5.44],
    ["CATEGORY",    "STRENGTH · RECOVERY", 10.12],
    ["PREPARED BY", "AS · MARKETING",      14.81],
  ];
  meta.forEach(([label, value, x]) => {
    s.addText(label, {
      x, y: 10.01, w: 4.57, h: 0.2,
      fontFace: FONT, fontSize: 9.75, color: C.cream, charSpacing: 2,
      margin: 0, valign: "middle",
    });
    s.addText(value, {
      x, y: 10.25, w: 4.57, h: 0.29,
      fontFace: FONT, fontSize: 16.5, bold: true, color: C.cream,
      charSpacing: 1.5, margin: 0, valign: "middle",
    });
  });
}

// ================================================================
// SLIDE 2 — who we are
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addHeader(s, "02 / WHO WE ARE");

  // huge opening quotation mark
  s.addText('"', {
    x: 1.04, y: 3.43, w: 8.69, h: 2.29,
    fontFace: FONT, fontSize: 270, bold: true, color: C.accent,
    margin: 0, valign: "top",
  });

  // pull-quote body — 3 runs, middle one is accent
  s.addText([
    { text: "STRENGTH ISN'T A SEASON. IT'S A ",
      options: { color: C.cream } },
    { text: "STANDARD. ",
      options: { color: C.accent } },
    { text: "WE'RE NOT HERE FOR QUICK WINS — WE'RE HERE FOR THE LONG HAUL.",
      options: { color: C.cream } },
  ], {
    x: 1.04, y: 5.05, w: 8.69, h: 3.23,
    fontFace: FONT, fontSize: 45, bold: true, charSpacing: -1,
    margin: 0, valign: "top",
  });

  // attribution (right column top)
  s.addText("— THE ALWAYS STRENGTH STANDARD", {
    x: 10.52, y: 3.66, w: 8.69, h: 0.21,
    fontFace: FONT, fontSize: 10.5, color: C.cream, charSpacing: 2,
    margin: 0, valign: "middle",
  });

  // paragraph body
  s.addText(
    "Since opening in 2019, Always Strength has grown from a single SoMa garage gym into a four-location franchise serving over 4,200 members across the Bay Area — built on one idea: train like it matters, every day of the year.",
    {
      x: 10.52, y: 4.25, w: 5.89, h: 2.0,
      fontFace: FONT, fontSize: 19.5, color: C.cream,
      margin: 0, valign: "top", paraSpaceAfter: 6,
    },
  );

  // three big stats
  const stats = [
    ["04",   "LOCATIONS",   10.52, C.accent],
    ["4.2K", "MEMBERS",     13.42, C.cream],
    ["24/7", "OPEN ACCESS", 16.31, C.cream],
  ];
  stats.forEach(([num, label, x, col]) => {
    s.addText(num, {
      x, y: 6.96, w: 2.73, h: 0.89,
      fontFace: FONT, fontSize: 72, bold: true, color: col,
      charSpacing: -2, margin: 0, valign: "middle",
    });
    s.addText(label, {
      x, y: 7.81, w: 2.73, h: 0.23,
      fontFace: FONT, fontSize: 12, color: C.cream, charSpacing: 2,
      margin: 0, valign: "middle",
    });
  });

  addFooter(s, "02");
}

// ================================================================
// SLIDE 3 — what's new (summer campaign)
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addHeader(s, "03 / WHAT'S NEW");

  // section label
  s.addText("THE SEASON · JUNE → SEPTEMBER", {
    x: 0.75, y: 1.46, w: 11.8, h: 0.26,
    fontFace: FONT, fontSize: 13.5, color: C.accent, charSpacing: 3,
    margin: 0, valign: "middle",
  });

  // headline — natural wrap (original renders as "THREE MONTHS. ZERO / EXCUSES.")
  s.addText([
    { text: "THREE MONTHS. ", options: { color: C.cream } },
    { text: "ZERO EXCUSES.",  options: { color: C.accent } },
  ], {
    x: 0.75, y: 1.84, w: 11.8, h: 2.14,
    fontFace: FONT, fontSize: 84, bold: true, charSpacing: -2.8,
    margin: 0, valign: "top",
  });

  // sub-paragraph
  s.addText(
    "A three-pillar summer program built around the hottest months of the year — heat training, sunrise strength, and an outdoor rooftop conditioning series.",
    {
      x: 0.75, y: 4.19, w: 7.52, h: 1.4,
      fontFace: FONT, fontSize: 22.5, color: C.cream,
      margin: 0, valign: "top",
    },
  );

  // right-side stamp "S·26"
  s.addText("S·26", {
    x: 14.61, y: 3.02, w: 4.78, h: 1.71,
    fontFace: FONT, fontSize: 150, bold: true, color: C.accent,
    charSpacing: -4, margin: 0, align: "right", valign: "middle",
  });
  s.addText("SUMMER CAMPAIGN", {
    x: 16.82, y: 4.77, w: 2.52, h: 0.26,
    fontFace: FONT, fontSize: 13.5, color: C.cream, charSpacing: 3,
    margin: 0, align: "right", valign: "middle",
  });

  // three pillars
  const pillars = [
    [0.75,  "01 · Pillar", "HEAT BLOCK",
      "A 12-week heat-adaptation protocol pairing sauna contrast with heavy compound lifts. Designed with sports-science consultants from UCSF."],
    [7.06,  "02 · Pillar", "SUNRISE CLUB",
      "5:30 AM strength sessions on the rooftop deck — limited to 14 members a day, coffee and protein shake included."],
    [13.36, "03 · Pillar", "BLOCK PARTY SERIES",
      "Five free outdoor conditioning events across SF, open to members and the public. Partners include Ten Thousand, Momentous, and Equator Coffee."],
  ];
  pillars.forEach(([x, tag, head, body]) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 8.24, w: 5.89, h: 0.02,
      fill: { color: C.cream }, line: { type: "none" },
    });
    s.addText(tag, {
      x, y: 8.55, w: 6.07, h: 0.22,
      fontFace: FONT, fontSize: 11.25, color: C.cream, charSpacing: 2,
      margin: 0, valign: "middle",
    });
    s.addText(head, {
      x, y: 8.89, w: 6.07, h: 0.42,
      fontFace: FONT, fontSize: 27, bold: true, color: C.cream,
      charSpacing: -0.8, margin: 0, valign: "middle",
    });
    s.addText(body, {
      x, y: 9.39, w: 3.63, h: 1.15,
      fontFace: FONT, fontSize: 14.25, color: C.cream,
      margin: 0, valign: "top",
    });
  });

  addFooter(s, "03");
}

// ================================================================
// SLIDE 4 — the floor (light background)
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "04 / THE FLOOR", { light: true });

  // headline
  s.addText([
    { text: "22,000 SQ FT OF ", options: { color: C.black, breakLine: true } },
    { text: "HARDWARE.",        options: { color: C.accent } },
  ], {
    x: 0.75, y: 1.78, w: 8.25, h: 1.84,
    fontFace: FONT, fontSize: 72, bold: true, charSpacing: -2.4,
    margin: 0, valign: "top",
  });

  // right paragraph
  s.addText(
    "Every piece of equipment on the floor is commercial-grade and competition-spec. We don't do plastic. We don't do pulleys that squeak.",
    {
      x: 15.36, y: 1.77, w: 4.01, h: 1.85,
      fontFace: FONT, fontSize: 18, color: C.black,
      margin: 0, valign: "top",
    },
  );

  // big orange hero block
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.75, y: 3.96, w: 9.12, h: 5.67,
    fill: { color: C.accent }, line: { type: "none" },
  });
  s.addText("01 — FEATURE", {
    x: 4.63, y: 4.26, w: 4.2, h: 0.24,
    fontFace: FONT, fontSize: 9.75, color: C.black, charSpacing: 2,
    align: "center", margin: 0, valign: "middle",
  });
  s.addText("↳ DROP PHOTO: POWER RACK HERO SHOT", {
    x: 3.45, y: 5.93, w: 3.73, h: 0.54,
    fontFace: FONT, fontSize: 12, color: C.black,
    align: "center", margin: 0, valign: "middle",
  });
  s.addText("14× COMPETITION POWER RACKS", {
    x: 1.55, y: 7.9, w: 7.53, h: 1.47,
    fontFace: FONT, fontSize: 54, bold: true, color: C.black,
    charSpacing: -1.8, margin: 0, valign: "middle",
  });

  // five dark equipment cards on right / below
  const cards = [
    [10.12, 3.96, "02 — DUMBBELLS", "DUMBBELLS 5–200 LB"],
    [14.81, 3.96, "03 — CARDIO",    "ASSAULT AIRBIKES ×8"],
    [10.12, 6.92, "04 — SLED",      "PROWLER TURF LANE"],
    [14.81, 6.92, "05 — PULL-UP",   "ROGUE RIG (40FT)"],
    [ 0.75, 9.88, "06 — PLATFORMS", "OLYMPIC PLATFORMS ×6"], // last one — slides off bottom in source but retained
  ];
  cards.forEach(([x, y, tag, title]) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.44, h: 2.71,
      fill: { color: C.bg }, line: { type: "none" },
    });
    s.addText(tag, {
      x: x + 0.3, y: y + 0.29, w: 3.97, h: 0.2,
      fontFace: FONT, fontSize: 9.75, color: C.cream, charSpacing: 2,
      margin: 0, valign: "middle",
    });
    s.addText(title, {
      x: x + 0.3, y: y + 1.98, w: 3.97, h: 0.48,
      fontFace: FONT, fontSize: 16.5, bold: true, color: C.cream,
      charSpacing: -0.4, margin: 0, valign: "middle",
    });
  });

  addFooter(s, "04", { light: true });
}

// ================================================================
// SLIDE 5 — recovery: cold / heat split
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  // left half (cold) dark
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 11, h: 11.25,
    fill: { color: C.bg }, line: { type: "none" },
  });
  // right half (heat) deep brown
  s.addShape(pres.shapes.RECTANGLE, {
    x: 11, y: 0, w: 9, h: 11.25,
    fill: { color: C.heat }, line: { type: "none" },
  });

  // ---- LEFT (COLD) ----
  s.addText("05A · COLD", {
    x: 9.14, y: 0.5, w: 1.19, h: 0.21,
    fontFace: FONT, fontSize: 10.5, color: C.cream, charSpacing: 2,
    align: "right", margin: 0, valign: "middle",
  });
  s.addText("RECOVERY FLOOR", {
    x: 0.62, y: 1.15, w: 10.04, h: 0.26,
    fontFace: FONT, fontSize: 13.5, color: C.cream, charSpacing: 3,
    margin: 0, valign: "middle",
  });
  s.addText("COLD PLUNGE.", {
    x: 0.62, y: 1.7, w: 10.04, h: 1.99,
    fontFace: FONT, fontSize: 78, bold: true, color: C.cream,
    charSpacing: -2.6, margin: 0, valign: "top",
  });
  // white photo placeholder
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.98, y: 4.34, w: 7.04, h: 3.35,
    fill: { color: C.white }, line: { type: "none" },
  });
  s.addText("↳ DROP PHOTO: COLD PLUNGE TUB", {
    x: 1.98, y: 5.77, w: 7.04, h: 0.54,
    fontFace: FONT, fontSize: 12, color: C.grey,
    align: "center", margin: 0, valign: "middle",
  });
  // 3 stat rows
  const coldRows = [
    ["TWO 8-PERSON TUBS",              "38°F", 8.63],
    ["MINERAL-FILTERED, OZONE-TREATED","24/7", 9.19],
    ["BUILT-IN SESSION TIMER",         "—",    9.74],
  ];
  coldRows.forEach(([label, val, yRule]) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.62, y: yRule, w: 9.75, h: 0.01,
      fill: { color: C.cream }, line: { type: "none" },
    });
    s.addText(label, {
      x: 0.62, y: yRule + 0.16, w: 7.0, h: 0.29,
      fontFace: FONT, fontSize: 16.5, bold: true, color: C.cream,
      charSpacing: -0.3, margin: 0, valign: "middle",
    });
    s.addText(val, {
      x: 7.7, y: yRule + 0.24, w: 2.76, h: 0.21,
      fontFace: FONT, fontSize: 10.5, color: C.cream, charSpacing: 2,
      align: "right", margin: 0, valign: "middle",
    });
  });

  // ---- RIGHT (HEAT) ----
  s.addText("05B · HEAT", {
    x: 18.16, y: 0.5, w: 1.17, h: 0.21,
    fontFace: FONT, fontSize: 10.5, color: C.cream, charSpacing: 2,
    align: "right", margin: 0, valign: "middle",
  });
  s.addText("RECOVERY FLOOR", {
    x: 11.62, y: 1.15, w: 7.98, h: 0.26,
    fontFace: FONT, fontSize: 13.5, color: C.accent, charSpacing: 3,
    margin: 0, valign: "middle",
  });
  s.addText("CEDAR SAUNA.", {
    x: 11.62, y: 1.7, w: 7.98, h: 1.99,
    fontFace: FONT, fontSize: 78, bold: true, color: C.cream,
    charSpacing: -2.6, margin: 0, valign: "top",
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 12.7, y: 4.34, w: 5.6, h: 3.35,
    fill: { color: C.white }, line: { type: "none" },
  });
  s.addText("↳ DROP PHOTO: CEDAR SAUNA INTERIOR", {
    x: 12.7, y: 5.77, w: 5.6, h: 0.54,
    fontFace: FONT, fontSize: 12, color: C.grey,
    align: "center", margin: 0, valign: "middle",
  });
  const heatRows = [
    ["FINNISH CEDAR, 12-PERSON", "190°F", 8.63],
    ["INFRARED PANEL ROOM",      "140°F", 9.19],
    ["COLD SHOWER CIRCUIT",      "—",     9.74],
  ];
  heatRows.forEach(([label, val, yRule]) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 11.62, y: yRule, w: 7.75, h: 0.01,
      fill: { color: C.cream }, line: { type: "none" },
    });
    s.addText(label, {
      x: 11.62, y: yRule + 0.16, w: 6.0, h: 0.29,
      fontFace: FONT, fontSize: 16.5, bold: true, color: C.cream,
      charSpacing: -0.3, margin: 0, valign: "middle",
    });
    s.addText(val, {
      x: 18.05, y: yRule + 0.24, w: 1.4, h: 0.21,
      fontFace: FONT, fontSize: 10.5, color: C.cream, charSpacing: 2,
      align: "right", margin: 0, valign: "middle",
    });
  });

  // header (over both halves) + footer
  addHeader(s, "05 / RECOVERY");
  addFooter(s, "05");
}

// ================================================================
// SLIDE 6 — membership (three pricing columns)
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addHeader(s, "06 / MEMBERSHIP");

  // eyebrow + headline
  s.addText("SUMMER PRICING · LOCKED THROUGH SEPT 30", {
    x: 0.75, y: 1.04, w: 19.05, h: 0.26,
    fontFace: FONT, fontSize: 13.5, color: C.accent, charSpacing: 3,
    margin: 0, valign: "middle",
  });
  s.addText("THREE WAYS TO TRAIN.", {
    x: 0.75, y: 1.47, w: 19.05, h: 1.84,
    fontFace: FONT, fontSize: 72, bold: true, color: C.cream,
    charSpacing: -2.4, margin: 0, valign: "middle",
  });

  // orange middle card (filled)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.03, y: 3.64, w: 5.94, h: 6.52,
    fill: { color: C.accent }, line: { type: "none" },
  });

  // "MOST POPULAR" ribbon on middle card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 11.05, y: 3.49, w: 1.58, h: 0.31,
    fill: { color: C.bg }, line: { type: "none" },
  });
  s.addText("MOST POPULAR", {
    x: 11.05, y: 3.49, w: 1.58, h: 0.31,
    fontFace: FONT, fontSize: 9, color: C.cream, charSpacing: 2,
    align: "center", margin: 0, valign: "middle",
  });

  // three cards
  const tiers = [
    {
      x: 0.75, name: "CORE", price: "149",
      body: [
        "Unlimited gym-floor access, 5 AM – 11 PM",
        "Cold plunge & cedar sauna included",
        "Two guest passes / month",
        "Locker + towel service",
      ],
      cta: "START HERE",
      fg: C.cream, dim: C.cream,
    },
    {
      x: 7.03, name: "STRENGTH CLUB", price: "229",
      body: [
        "Everything in Core + 24/7 access",
        "4 coached small-group sessions / week",
        "Summer Heat Block program enrollment",
        "InBody scan + quarterly coach check-in",
        "Momentous supplement stack ($80 value)",
      ],
      cta: "BEST FOR SUMMER",
      fg: C.black, dim: C.black,
    },
    {
      x: 13.31, name: "FOUNDER", price: "449",
      body: [
        "Everything in Strength Club",
        "1:1 programming with head coach",
        "Reserved locker + priority booking",
        "Plus-one guest privileges, unlimited",
        "Transferable to all 4 locations",
      ],
      cta: "BY APPLICATION",
      fg: C.cream, dim: C.cream,
    },
  ];

  tiers.forEach(({ x, name, price, body, cta, fg, dim }) => {
    // tier name
    s.addText(name, {
      x: x + 0.32, y: 3.99, w: 5.46, h: 0.48,
      fontFace: FONT, fontSize: 33, bold: true, color: fg, charSpacing: -1,
      margin: 0, valign: "middle",
    });
    // "$" small
    s.addText("$", {
      x: x + 0.32, y: 5.19, w: 0.3, h: 0.23,
      fontFace: FONT, fontSize: 12, color: fg, charSpacing: 1,
      margin: 0, valign: "top",
    });
    // price number big
    s.addText(price, {
      x: x + 0.5, y: 4.61, w: 1.88, h: 0.89,
      fontFace: FONT, fontSize: 67.5, bold: true, color: fg, charSpacing: -2,
      margin: 0, valign: "middle",
    });
    // "/ MONTH"
    s.addText("/ MONTH", {
      x: x + 2.37, y: 5.21, w: 1.5, h: 0.21,
      fontFace: FONT, fontSize: 10.5, color: fg, charSpacing: 2,
      margin: 0, valign: "middle",
    });
    // benefit list (breakLine between items)
    const runs = body.map((line, i) => ({
      text: line, options: i < body.length - 1 ? { breakLine: true } : {},
    }));
    s.addText(runs, {
      x: x + 0.19, y: 5.64, w: 5.51, h: body.length >= 5 ? 1.94 : 1.53,
      fontFace: FONT, fontSize: 13.5, color: fg, paraSpaceAfter: 4,
      margin: 0, valign: "top",
    });
    // divider rule
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.32, y: 9.48, w: 5.3, h: 0.01,
      fill: { color: dim }, line: { type: "none" },
    });
    // CTA
    s.addText(cta, {
      x: x + 0.32, y: 9.65, w: 4.0, h: 0.21,
      fontFace: FONT, fontSize: 10.5, color: fg, charSpacing: 2, bold: true,
      margin: 0, valign: "middle",
    });
    // arrow
    s.addText("→", {
      x: x + 5.0, y: 9.65, w: 0.62, h: 0.21,
      fontFace: FONT, fontSize: 10.5, color: fg,
      align: "right", margin: 0, valign: "middle",
    });
  });

  addFooter(s, "06");
}

// ================================================================
// SLIDE 7 — event calendar / table
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addHeader(s, "07 / SUMMER PROGRAMMING");

  s.addText("THE CALENDAR", {
    x: 0.75, y: 1.46, w: 7.68, h: 0.26,
    fontFace: FONT, fontSize: 13.5, color: C.accent, charSpacing: 3,
    margin: 0, valign: "middle",
  });
  s.addText("SUMMER '26 EVENT SLATE.", {
    x: 0.75, y: 1.84, w: 13, h: 1.84,
    fontFace: FONT, fontSize: 72, bold: true, color: C.cream,
    charSpacing: -2.4, margin: 0, valign: "middle",
  });
  s.addText(
    "Seven flagship events from June to September. Free for members, open to press + public on a first-come basis.",
    {
      x: 14.8, y: 2.56, w: 4.58, h: 1.13,
      fontFace: FONT, fontSize: 18, color: C.cream,
      margin: 0, valign: "top",
    },
  );

  // table header rule + headers
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.75, y: 4.02, w: 18.5, h: 0.02,
    fill: { color: C.cream }, line: { type: "none" },
  });
  const headers = [
    ["DATE",          0.96,  0.92],
    ["EVENT",         2.21, 13.27],
    ["HOST / PARTNER",15.5,  1.96],
    ["STATUS",        17.79, 1.33],
  ];
  headers.forEach(([t, x, w]) => {
    s.addText(t, {
      x, y: 4.21, w, h: 0.21,
      fontFace: FONT, fontSize: 10.5, color: C.cream, charSpacing: 2,
      margin: 0, valign: "middle",
    });
  });

  // rows
  const rows = [
    ["06·14", "SUMMER OPENING BLOCK PARTY",         "Ten Thousand × Equator", "● OPEN",     C.accent],
    ["06·28", "MAX EFFORT FRIDAY — 1RM DAY",        "Coach Theo Park",        "● OPEN",     C.accent],
    ["07·12", "ROOFTOP CONDITIONING SERIES I",      "Hyperice",               "◎ WAITLIST", C.cream ],
    ["07·26", "SAUNA SCIENCE PANEL + SAUNA CEREMONY","Dr. Susanna Soberg",    "● OPEN",     C.accent],
    ["08·16", "STRONGEST IN THE CITY (MEMBER THROWDOWN)","AS Competition Team","● OPEN",    C.accent],
    ["08·30", "LABOR DAY DEADLIFT MARATHON",        "Rogue Fitness",          "● OPEN",     C.accent],
  ];
  const rowYs = [4.7, 5.42, 6.1, 6.79, 7.48, 8.16];
  rows.forEach(([d, ev, host, st, stCol], i) => {
    const y = rowYs[i];
    s.addText(d, {
      x: 0.96, y, w: 0.92, h: 0.46,
      fontFace: FONT, fontSize: 25.5, bold: true, color: C.cream,
      charSpacing: -0.5, margin: 0, valign: "middle",
    });
    s.addText(ev, {
      x: 2.21, y, w: 13.27, h: 0.46,
      fontFace: FONT, fontSize: 19.5, bold: true, color: C.cream,
      charSpacing: -0.3, margin: 0, valign: "middle",
    });
    s.addText(host, {
      x: 15.5, y, w: 1.96, h: 0.46,
      fontFace: FONT, fontSize: 13.5, color: C.cream,
      margin: 0, valign: "middle",
    });
    s.addText(st, {
      x: 17.79, y, w: 1.46, h: 0.46,
      fontFace: FONT, fontSize: 10.5, color: stCol, charSpacing: 2, bold: true,
      margin: 0, valign: "middle",
    });
    // subtle divider under each row
    s.addShape(pres.shapes.LINE, {
      x: 0.75, y: y + 0.56, w: 18.5, h: 0,
      line: { color: "2A2A2A", width: 0.5 },
    });
  });

  addFooter(s, "07");
}

// ================================================================
// SLIDE 8 — the flagship
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addHeader(s, "08 / THE FLAGSHIP");

  s.addText("DOWNTOWN · SAN FRANCISCO", {
    x: 0.75, y: 1.46, w: 9.1, h: 0.26,
    fontFace: FONT, fontSize: 13.5, color: C.accent, charSpacing: 3,
    margin: 0, valign: "middle",
  });

  s.addText("HIT IT ON THE WALK TO WORK.", {
    x: 0.75, y: 1.89, w: 9.1, h: 3.19,
    fontFace: FONT, fontSize: 84, bold: true, color: C.cream,
    charSpacing: -2.8, margin: 0, valign: "top",
  });

  s.addText([
    { text: "388 MARKET ST SAN FRANCISCO · CA 94111", options: { breakLine: true } },
    { text: "OPEN 24/7 · 365" },
  ], {
    x: 0.75, y: 7.15, w: 9.1, h: 1.14,
    fontFace: FONT, fontSize: 16.5, color: C.cream,
    margin: 0, valign: "top", paraSpaceAfter: 4,
  });

  // 2x2 spec grid
  const specs = [
    [0.75, 8.67, "SQUARE FOOTAGE", "22,000 SQ FT"],
    [5.29, 8.67, "NEAREST BART",   "EMBARCADERO · 3 MIN"],
    [0.75, 9.46, "MEMBER PARKING", "GARAGE · VALIDATED"],
    [5.29, 9.46, "OPENED",         "FLAGSHIP · 2022"],
  ];
  specs.forEach(([x, y, label, val]) => {
    s.addText(label, {
      x, y, w: 4.42, h: 0.2,
      fontFace: FONT, fontSize: 9.75, color: C.cream, charSpacing: 2,
      margin: 0, valign: "middle",
    });
    s.addText(val, {
      x, y: y + 0.24, w: 4.42, h: 0.34,
      fontFace: FONT, fontSize: 19.5, bold: true, color: C.cream,
      charSpacing: -0.3, margin: 0, valign: "middle",
    });
  });

  // right-side site plan panel
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.42, y: 1.46, w: 8.83, h: 8.54,
    fill: { color: C.bg }, line: { color: "1F1F1F", width: 1 },
  });
  s.addText("FIG 08.01 — SITE PLAN", {
    x: 10.92, y: 1.96, w: 2.32, h: 0.21,
    fontFace: FONT, fontSize: 10.5, color: C.cream, charSpacing: 2,
    margin: 0, valign: "middle",
  });

  // small orange tag labeled AS · FLAGSHIP
  s.addShape(pres.shapes.RECTANGLE, {
    x: 13.79, y: 6.19, w: 2.09, h: 0.38,
    fill: { color: C.accent }, line: { type: "none" },
  });
  s.addText("AS · FLAGSHIP", {
    x: 13.79, y: 6.19, w: 2.09, h: 0.38,
    fontFace: FONT, fontSize: 16.5, bold: true, color: C.black,
    charSpacing: 0, align: "center", margin: 0, valign: "middle",
  });
  // small orange marker dot
  s.addShape(pres.shapes.OVAL, {
    x: 14.69, y: 6.69, w: 0.29, h: 0.29,
    fill: { color: C.accent }, line: { type: "none" },
  });

  addFooter(s, "08");
}

// ================================================================
// SLIDE 9 — voices / testimonials
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addHeader(s, "09 / VOICES");

  s.addText("MEMBERS · PRESS · PARTNERS", {
    x: 0.75, y: 1.88, w: 19.05, h: 0.26,
    fontFace: FONT, fontSize: 13.5, color: C.accent, charSpacing: 3,
    margin: 0, valign: "middle",
  });
  s.addText([
    { text: "WHAT PEOPLE SAY WHEN THEY ", options: { color: C.cream, breakLine: true } },
    { text: "SHOW UP.",                    options: { color: C.accent } },
  ], {
    x: 0.75, y: 2.30, w: 18, h: 1.84,
    fontFace: FONT, fontSize: 72, bold: true, charSpacing: -2.4,
    margin: 0, valign: "top",
  });

  // three testimonial columns
  const quotes = [
    {
      x: 0.75,
      runs: [
        { text: '"The kind of gym that reminds you why you started lifting in the first place. ', options: { color: C.cream } },
        { text: "Serious iron, serious people, zero nonsense. ", options: { color: C.accent } },
        { text: '"', options: { color: C.cream } },
      ],
      name: "SF CHRONICLE", sub: "BEST GYMS OF 2025",
    },
    {
      x: 7.08,
      runs: [
        { text: '"I came for the sauna. I stayed because they ', options: { color: C.cream } },
        { text: "actually know my name ", options: { color: C.accent } },
        { text: 'and call me out when I skip legs."', options: { color: C.cream } },
      ],
      name: "MAYA R.", sub: "MEMBER · 2 YRS",
    },
    {
      x: 13.42,
      runs: [
        { text: '"This is the ', options: { color: C.cream } },
        { text: "only facility downtown ", options: { color: C.accent } },
        { text: 'with a real platform, a real rack, and a recovery floor that rivals the big wellness clubs at half the price."', options: { color: C.cream } },
      ],
      name: "THE BOLD ITALIC", sub: "CITY GUIDE 2025",
    },
  ];
  quotes.forEach(({ x, runs, name, sub }) => {
    // top rule
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 4.93, w: 5.83, h: 0.02,
      fill: { color: C.cream }, line: { type: "none" },
    });
    s.addText(runs, {
      x, y: 5.33, w: 6.01, h: 1.7,
      fontFace: FONT, fontSize: 22.5, italic: true,
      margin: 0, valign: "top",
    });
    // avatar circle
    s.addShape(pres.shapes.OVAL, {
      x, y: 7.23, w: 0.54, h: 0.54,
      fill: { color: C.grey }, line: { type: "none" },
    });
    s.addText(name, {
      x: x + 0.71, y: 7.23, w: 4.5, h: 0.27,
      fontFace: FONT, fontSize: 13.5, bold: true, color: C.cream,
      charSpacing: 1, margin: 0, valign: "middle",
    });
    s.addText(sub, {
      x: x + 0.71, y: 7.50, w: 4.5, h: 0.22,
      fontFace: FONT, fontSize: 9.75, color: C.cream, charSpacing: 2,
      margin: 0, valign: "middle",
    });
  });

  // AS SEEN IN bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.75, y: 8.6, w: 18.5, h: 0.01,
    fill: { color: C.cream }, line: { type: "none" },
  });
  s.addText("AS SEEN IN", {
    x: 0.75, y: 9.08, w: 2.89, h: 0.2,
    fontFace: FONT, fontSize: 9.75, color: C.cream, charSpacing: 2,
    margin: 0, valign: "middle",
  });
  const pubs = [
    [ 3.89, "SF CHRONICLE",    19.5, true ],
    [ 7.03, "The Bold Italic", 18,   true ],
    [10.17, "MEN'S HEALTH",    18,   true ],
    [13.31, "KQED",            18,   false ],
    [16.44, "SF STANDARD",     16.5, true ],
  ];
  pubs.forEach(([x, name, sz, bold]) => {
    s.addText(name, {
      x, y: 9.0, w: 2.89, h: 0.38,
      fontFace: FONT, fontSize: sz, bold, color: C.cream,
      charSpacing: 1, margin: 0, valign: "middle",
    });
  });

  addFooter(s, "09");
}

// ================================================================
// SLIDE 10 — contact / closing
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  // left orange bleed circle
  s.addShape(pres.shapes.OVAL, {
    x: -3.12, y: -2.08, w: 12.5, h: 12.5,
    fill: { color: C.accent }, line: { type: "none" },
  });

  addHeader(s, "10 / PRESS KIT");

  s.addText("LET'S TALK.", {
    x: 0.75, y: 1.67, w: 19.05, h: 0.26,
    fontFace: FONT, fontSize: 13.5, color: C.accent, charSpacing: 3,
    margin: 0, valign: "middle",
  });

  s.addText([
    { text: "ALWAYS ",    options: { color: C.cream } },
    { text: "STRENGTH. ", options: { color: C.accent } },
    { text: "ALWAYS ON.", options: { color: C.cream } },
  ], {
    x: 0.75, y: 2.38, w: 19.05, h: 2.42,
    fontFace: FONT, fontSize: 97.5, bold: true, charSpacing: -3.2,
    margin: 0, valign: "middle",
  });

  // divider
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.75, y: 8.63, w: 18.5, h: 0.01,
    fill: { color: C.cream }, line: { type: "none" },
  });

  const contacts = [
    [ 0.75, "PRESS INQUIRIES",    "PRESS@ ALWAYSSTRENGTH.CO",  "Maren Okafor · Head of Marketing"],
    [ 7.03, "VISIT THE FLAGSHIP", "388 MARKET ST SF · CA 94111","Tours by appointment · 24/7 member access"],
    [13.31, "PRESS KIT · ASSETS", "ALWAYSSTRENGTH.CO /PRESS",  "Logos · Photography · Fact Sheet · Bios"],
  ];
  contacts.forEach(([x, label, big, sub]) => {
    s.addText(label, {
      x, y: 9.06, w: 6.12, h: 0.21,
      fontFace: FONT, fontSize: 10.5, color: C.cream, charSpacing: 2,
      margin: 0, valign: "middle",
    });
    s.addText(big, {
      x, y: 9.35, w: 6.12, h: 0.78,
      fontFace: FONT, fontSize: 24, bold: true, color: C.cream,
      charSpacing: -0.5, margin: 0, valign: "middle",
    });
    s.addText(sub, {
      x, y: 10.16, w: 6.12, h: 0.29,
      fontFace: FONT, fontSize: 16.5, color: C.cream,
      margin: 0, valign: "middle",
    });
  });
}

// ---------- write ----------
pres.writeFile({ fileName: "foOk_replica.pptx" })
  .then(fn => console.log("wrote", fn));
