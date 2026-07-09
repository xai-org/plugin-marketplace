// Plan_5.pptx — Northside FC U10 Training Program
// A faithful pptxgenjs replica of the original dark-themed 10-slide deck.
// Run: `node build.js`  →  outputs ./Plan_5.pptx

const pptxgen = require("pptxgenjs");

// ---------- Design tokens ----------
const C = {
  bg:      "0B0F14",  // page background
  card:    "11161D",  // primary card fill
  card2:   "1A2028",  // secondary / header-row fill
  border:  "232A34",  // hairline divider
  border2: "2E3944",  // softer divider
  text:    "F4F6F8",  // primary text (near-white)
  muted:   "8893A2",  // secondary text (cool gray)
  lime:    "C6FF3D",  // accent
  orange:  "FF5A1F",  // secondary accent
  white:   "FFFFFF",
};

const FONT_H = "Arial";          // headers / titles
const FONT_B = "Calibri";        // body
const FONT_M = "Consolas";       // mono-ish labels (eyebrow / timecodes)

const W = 20;        // slide width  (in)
const H = 11.25;     // slide height (in)
const L = 1.25;      // left margin
const R = 18.75;     // right edge (content)
const CW = R - L;    // content width = 17.50

// ---------- Presentation setup ----------
const pres = new pptxgen();
pres.defineLayout({ name: "CUSTOM_20x11_25", width: W, height: H });
pres.layout = "CUSTOM_20x11_25";
pres.author = "Northside FC";
pres.title  = "U10 Training Program";

// ---------- Helpers ----------
function bg(slide) {
  slide.background = { color: C.bg };
}

function footer(slide, pageNum) {
  // Hairline above footer
  slide.addShape(pres.shapes.RECTANGLE, {
    x: L, y: 10.36, w: CW, h: 0.01,
    fill: { color: C.border }, line: { type: "none" },
  });
  slide.addText("U10 TRAINING PROGRAM", {
    x: L, y: 10.55, w: 6, h: 0.33,
    fontFace: FONT_M, fontSize: 11, color: C.muted,
    charSpacing: 4, bold: false, margin: 0,
  });
  slide.addText(`${String(pageNum).padStart(2, "0")} / 10`, {
    x: R - 2, y: 10.55, w: 2, h: 0.33,
    fontFace: FONT_M, fontSize: 11, color: C.muted,
    align: "right", charSpacing: 4, margin: 0,
  });
}

// Eyebrow + big H1 + intro paragraph (shared by content slides)
function pageHeader(slide, eyebrow, title, intro) {
  slide.addText(eyebrow, {
    x: L, y: 0.94, w: CW, h: 0.38,
    fontFace: FONT_M, fontSize: 13, color: C.lime,
    bold: true, charSpacing: 6, margin: 0,
  });
  slide.addText(title, {
    x: L, y: 1.56, w: CW, h: 0.93,
    fontFace: FONT_H, fontSize: 48, color: C.text,
    bold: true, charSpacing: -1, margin: 0,
  });
  if (intro) {
    slide.addText(intro, {
      x: L, y: 2.70, w: 11.80, h: 0.92,
      fontFace: FONT_B, fontSize: 16, color: C.muted,
      margin: 0,
    });
  }
}

// ====================================================================
// SLIDE 1 — Title / cover
// ====================================================================
function slide1() {
  const s = pres.addSlide();
  bg(s);

  // Vertical divider at ~55% of the slide
  s.addShape(pres.shapes.RECTANGLE, {
    x: 11.11, y: 0, w: 0.01, h: H,
    fill: { color: C.border }, line: { type: "none" },
  });

  // ---- Left column ----

  // Logo mark: diamond (rotated square) with lime star
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.25, y: 1.25, w: 0.53, h: 0.53,
    fill: { color: C.bg }, line: { color: C.lime, width: 1.5 },
    rotate: 45,
  });
  s.addText("★", {
    x: 1.38, y: 1.32, w: 0.35, h: 0.44,
    fontFace: FONT_H, fontSize: 19, color: C.lime,
    align: "center", valign: "middle", margin: 0, bold: true,
  });

  // Club tagline
  s.addText("NORTHSIDE FC · BOYS U10 TRAVEL", {
    x: 1.97, y: 1.30, w: 8.5, h: 0.47,
    fontFace: FONT_M, fontSize: 14, color: C.text,
    charSpacing: 6, valign: "middle", margin: 0, bold: true,
  });

  // Small eyebrow above the big title
  s.addText("2026 SPRING SEASON · PARENT INFO NIGHT", {
    x: 1.25, y: 2.34, w: 8.87, h: 0.38,
    fontFace: FONT_M, fontSize: 12, color: C.lime,
    charSpacing: 4, margin: 0,
  });

  // Huge title — each word on its own line so we stay inside the column
  s.addText("TRAINING", {
    x: 1.25, y: 2.75, w: 8.03, h: 1.95,
    fontFace: FONT_H, fontSize: 110, color: C.text,
    bold: true, charSpacing: -3, margin: 0,
  });
  s.addText("PROGRAM", {
    x: 1.25, y: 4.80, w: 8.87, h: 1.95,
    fontFace: FONT_H, fontSize: 110, color: C.lime,
    bold: true, charSpacing: -3, margin: 0,
  });

  // Description
  s.addText(
    "A weekly development plan built for 9- and 10-year-old competitive players — technical, intentional, and age-appropriate.",
    {
      x: 1.25, y: 7.00, w: 8.80, h: 1.48,
      fontFace: FONT_B, fontSize: 19, color: C.text,
      margin: 0,
    }
  );

  // Metadata row — HEAD COACH / SEASON / PLAYERS
  const meta = [
    { label: "HEAD COACH", value: "COACH RIVERA",   x: 1.25, wv: 2.32 },
    { label: "SEASON",     value: "MAR — JUN 2026", x: 4.16, wv: 2.70 },
    { label: "PLAYERS",    value: "14 ROSTER",      x: 7.44, wv: 1.76 },
  ];
  meta.forEach(m => {
    s.addText(m.label, {
      x: m.x, y: 9.35, w: 2.0, h: 0.32,
      fontFace: FONT_M, fontSize: 12, color: C.muted,
      charSpacing: 4, margin: 0,
    });
    s.addText(m.value, {
      x: m.x, y: 9.71, w: m.wv + 0.5, h: 0.43,
      fontFace: FONT_H, fontSize: 15, color: C.text,
      bold: true, margin: 0,
    });
  });

  // ---- Right column ----

  // Giant "3×"
  s.addText("3×", {
    x: 12.37, y: 5.40, w: 6.57, h: 2.50,
    fontFace: FONT_H, fontSize: 160, color: C.lime,
    bold: true, charSpacing: -4, margin: 0, valign: "middle",
  });

  // Short horizontal rule
  s.addShape(pres.shapes.RECTANGLE, {
    x: 12.37, y: 8.16, w: 0.62, h: 0.03,
    fill: { color: C.text }, line: { type: "none" },
  });

  // Right side caption
  s.addText("Weekly training sessions. One match. Every week. No filler.", {
    x: 12.37, y: 8.49, w: 6.20, h: 0.89,
    fontFace: FONT_B, fontSize: 17, color: C.text,
    margin: 0,
  });
  s.addText("60 MIN · TECHNICAL · TACTICAL · COMPETITIVE", {
    x: 12.37, y: 9.54, w: 6.57, h: 0.61,
    fontFace: FONT_M, fontSize: 14, color: C.muted,
    charSpacing: 4, margin: 0,
  });
}

// ====================================================================
// SLIDE 2 — Weekly rhythm (7 day cards + stats row)
// ====================================================================
function slide2() {
  const s = pres.addSlide();
  bg(s);
  pageHeader(
    s,
    "01 · SCHEDULE",
    "THE WEEKLY RHYTHM",
    "A predictable cadence the players can count on — three focused sessions and one match, spaced for recovery and growth."
  );

  // "WK" label tucked against the first card
  s.addText("WK", {
    x: 1.25, y: 7.44, w: 0.71, h: 0.49,
    fontFace: FONT_M, fontSize: 11, color: C.muted,
    charSpacing: 4, margin: 0,
  });

  // Card definitions
  const days = [
    { x: 2.00, day: "MON", n: "Day 01", tag: "FILM",       tagColor: C.lime,  desc: "Video Review",             active: false },
    { x: 4.41, day: "TUE", n: "Day 02", tag: "SESSION 1",  tagColor: C.lime,  desc: "Ball Mastery & 1v1",        active: true  },
    { x: 6.82, day: "WED", n: "Day 03", tag: "OPTIONAL",   tagColor: C.muted, desc: "Home Skills",              active: false },
    { x: 9.23, day: "THU", n: "Day 04", tag: "SESSION 2",  tagColor: C.lime,  desc: "Passing & Combinations",   active: true  },
    { x: 11.64, day: "FRI", n: "Day 05", tag: "PREP",      tagColor: C.muted, desc: "Rest & Review",            active: false },
    { x: 14.05, day: "SAT", n: "Day 06", tag: "SESSION 3", tagColor: C.lime,  desc: "Finishing & Match Play",   active: true  },
    { x: 16.46, day: "SUN", n: "Day 07", tag: "MATCH DAY", tagColor: C.orange, desc: "League Fixture",          active: false },
  ];

  const cardW = 2.29, cardH = 3.81, cardY = 4.18;

  days.forEach((d, idx) => {
    // Base card
    s.addShape(pres.shapes.RECTANGLE, {
      x: d.x, y: cardY, w: cardW, h: cardH,
      fill: { color: d.active ? C.card : C.card2 },
      line: { color: d.active ? C.lime : C.border2, width: 1 },
    });
    // First card has a lime accent bar on the left edge (first session marker)
    if (idx === 0) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: d.x, y: cardY, w: 0.03, h: cardH,
        fill: { color: C.lime }, line: { type: "none" },
      });
    }

    const tx = d.x + 0.25;
    const tw = cardW - 0.5;

    s.addText(d.day, {
      x: tx, y: cardY + 0.24, w: tw, h: 0.51,
      fontFace: FONT_H, fontSize: 22, color: C.text,
      bold: true, margin: 0,
    });
    s.addText(d.n, {
      x: tx, y: cardY + 0.75, w: tw, h: 0.33,
      fontFace: FONT_B, fontSize: 13, color: C.muted,
      margin: 0,
    });
    s.addText(d.tag, {
      x: tx, y: cardY + 1.85, w: tw, h: 0.33,
      fontFace: FONT_M, fontSize: 13, color: d.tagColor,
      charSpacing: 3, bold: true, margin: 0,
    });
    s.addText(d.desc, {
      x: tx, y: cardY + 2.95, w: tw, h: 0.70,
      fontFace: FONT_B, fontSize: 13, color: C.text,
      margin: 0, valign: "top",
    });
  });

  // Separator line above stats row
  s.addShape(pres.shapes.RECTANGLE, {
    x: L, y: 8.41, w: CW, h: 0.01,
    fill: { color: C.border }, line: { type: "none" },
  });

  // Stats row: 4 big numbers
  const stats = [
    { big: "3",   unit: "sessions", label: "WEEKLY TRAINING" },
    { big: "180", unit: "min",      label: "ON-BALL MINUTES" },
    { big: "1",   unit: "film",     label: "VIDEO REVIEW SESSION" },
    { big: "1",   unit: "match",    label: "COMPETITIVE FIXTURE" },
  ];
  stats.forEach((st, i) => {
    const sx = 1.25 + i * 4.48;
    // Inline "big + unit" arrangement
    s.addText(
      [
        { text: st.big,  options: { fontSize: 48, bold: true, color: C.text } },
        { text: "  " + st.unit, options: { fontSize: 20, color: C.muted } },
      ],
      {
        x: sx, y: 8.71, w: 4.18, h: 0.83,
        fontFace: FONT_H, margin: 0, valign: "middle",
      }
    );
    s.addText(st.label, {
      x: sx, y: 9.65, w: 4.18, h: 0.33,
      fontFace: FONT_M, fontSize: 12, color: C.muted,
      charSpacing: 4, margin: 0,
    });
  });

  footer(s, 2);
}

// ====================================================================
// SLIDE 3 — Session anatomy (5 timeline rows)
// ====================================================================
function slide3() {
  const s = pres.addSlide();
  bg(s);
  pageHeader(
    s,
    "02 · STRUCTURE",
    "SESSION ANATOMY · 60 MINUTES",
    "Every training session follows the same four-block arc — warm-up, technical, tactical, competitive — with intensity climbing to a peak before cool-down."
  );

  const rows = [
    { time: "00:00 – 00:10", mins: "10", title: "ARRIVAL & BALL WARM-UP",    desc: "Every player with a ball. Dynamic mobility, first-touch juggling, rondos in tight squares.",    level: "LOW",    fill: 0.35 },
    { time: "00:10 – 00:25", mins: "15", title: "TECHNICAL BLOCK",           desc: "Isolated skill work with high repetition — dribbling moves, passing patterns, striking the ball.", level: "MEDIUM", fill: 0.55 },
    { time: "00:25 – 00:45", mins: "20", title: "TACTICAL / POSITION PLAY",  desc: "Directional drills, 3v2 / 4v4 shapes, decision-making under controlled pressure.",               level: "HIGH",   fill: 0.80 },
    { time: "00:45 – 00:58", mins: "13", title: "SMALL-SIDED GAME",          desc: "Free scrimmage with session-theme conditions. Full intensity. Coaches quiet, players decide.",   level: "PEAK",   fill: 1.00 },
    { time: "00:58 – 01:00", mins: "2",  title: "HUDDLE & COOL-DOWN",        desc: "Two-minute reflection. One thing learned, one thing to take home. Stretch and release.",         level: "LOW",    fill: 0.30 },
  ];

  const rowH = 1.07, startY = 4.29;
  rows.forEach((r, i) => {
    const y = startY + i * rowH;

    s.addShape(pres.shapes.RECTANGLE, {
      x: L, y, w: CW, h: 0.99,
      fill: { color: C.card }, line: { type: "none" },
    });
    // Vertical dividers at col boundaries
    [3.23, 4.17, 15.62].forEach(cx => {
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx, y: y + 0.01, w: 0.01, h: 0.97,
        fill: { color: C.border }, line: { type: "none" },
      });
    });

    // Time column
    s.addText(r.time, {
      x: 1.49, y: y + 0.13, w: 1.60, h: 0.77,
      fontFace: FONT_M, fontSize: 12, color: C.lime,
      charSpacing: 2, margin: 0, valign: "middle",
    });
    // Minutes column
    s.addText(r.mins, {
      x: 3.36, y: y + 0.11, w: 0.68, h: 0.81,
      fontFace: FONT_H, fontSize: 22, color: C.text,
      bold: true, margin: 0, align: "center", valign: "middle",
    });
    // Title + description column
    s.addText(r.title, {
      x: 4.47, y: y + 0.11, w: 11.18, h: 0.47,
      fontFace: FONT_H, fontSize: 17, color: C.text,
      bold: true, margin: 0,
    });
    s.addText(r.desc, {
      x: 4.47, y: y + 0.56, w: 11.18, h: 0.40,
      fontFace: FONT_B, fontSize: 13, color: C.muted,
      margin: 0,
    });

    // Intensity bar (track + filled bar) + level label
    const trackW = 1.57;
    const barX = 15.88, barY = y + 0.44;
    s.addShape(pres.shapes.RECTANGLE, {
      x: barX, y: barY, w: trackW, h: 0.10,
      fill: { color: C.card2 }, line: { type: "none" },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: barX, y: barY, w: trackW * r.fill, h: 0.10,
      fill: { color: C.lime }, line: { type: "none" },
    });
    s.addText(r.level, {
      x: 17.53, y: y + 0.35, w: 1.15, h: 0.33,
      fontFace: FONT_M, fontSize: 11, color: C.muted,
      charSpacing: 3, margin: 0,
    });
  });

  footer(s, 3);
}

// ====================================================================
// SLIDE 4 — Curriculum (2×3 grid of focus cards)
// ====================================================================
function slide4() {
  const s = pres.addSlide();
  bg(s);
  pageHeader(
    s,
    "03 · CURRICULUM",
    "TECHNICAL FOCUS AREAS",
    "Six skill pillars, weighted by age-appropriate priority. Percentages show share of total on-ball training minutes across the season."
  );

  const cards = [
    { n: "01", pct: "25%", title: "BALL CONTROL & FIRST TOUCH", desc: "Receive with a purpose. Surface selection. Turning out of pressure.",        tag: "CORE SKILL" },
    { n: "02", pct: "20%", title: "DRIBBLING & 1V1",             desc: "Beat defenders with pace and change of direction. Courage on the ball.",      tag: "INDIVIDUAL" },
    { n: "03", pct: "20%", title: "PASSING & RECEIVING",         desc: "Weight, timing, accuracy. Two-touch and one-touch combinations.",             tag: "TEAM" },
    { n: "04", pct: "15%", title: "SHOOTING & FINISHING",        desc: "Instep strikes, placement, follow-up opportunities in tight areas.",          tag: "ATTACKING" },
    { n: "05", pct: "10%", title: "DEFENDING",                   desc: "Body shape, delay, closing angles. Winning the ball cleanly.",                tag: "DEFENSIVE" },
    { n: "06", pct: "10%", title: "ENJOYMENT & COMPETITION",     desc: "Free play, small tournaments, and the reason they fell in love with the game.", tag: "CULTURE" },
  ];

  const cardW = 5.71, cardH = 2.89, gap = 0.19;
  cards.forEach((c, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = L + col * (cardW + gap);
    const y = 4.20 + row * (cardH + gap);

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cardW, h: cardH,
      fill: { color: C.card }, line: { color: C.border, width: 0.75 },
    });
    s.addText(c.n, {
      x: x + 0.32, y: y + 0.30, w: 0.8, h: 0.33,
      fontFace: FONT_M, fontSize: 13, color: C.lime,
      charSpacing: 3, bold: true, margin: 0,
    });
    s.addText(c.pct, {
      x: x + cardW - 1.25, y: y + 0.30, w: 1.0, h: 0.51,
      fontFace: FONT_H, fontSize: 24, color: C.lime,
      bold: true, align: "right", margin: 0,
    });
    s.addText(c.title, {
      x: x + 0.32, y: y + 0.90, w: cardW - 0.50, h: 0.44,
      fontFace: FONT_H, fontSize: 17, color: C.text,
      bold: true, margin: 0,
    });
    s.addText(c.desc, {
      x: x + 0.32, y: y + 1.37, w: cardW - 0.50, h: 0.80,
      fontFace: FONT_B, fontSize: 13, color: C.muted,
      margin: 0,
    });
    s.addText(c.tag, {
      x: x + 0.32, y: y + 2.21, w: cardW - 0.50, h: 0.33,
      fontFace: FONT_M, fontSize: 11, color: C.muted,
      charSpacing: 4, margin: 0,
    });
  });

  footer(s, 4);
}

// ====================================================================
// Session slide helper (used by slides 5, 6, 7, and adapted for 8)
// ====================================================================
function sessionHeader(s, eyebrow, title, right) {
  s.addText(eyebrow, {
    x: L, y: 0.94, w: 10, h: 0.38,
    fontFace: FONT_M, fontSize: 13, color: C.lime,
    bold: true, charSpacing: 6, margin: 0,
  });
  s.addText(title, {
    x: L, y: 1.48, w: 13.15, h: 0.93,
    fontFace: FONT_H, fontSize: 48, color: C.text,
    bold: true, charSpacing: -1, margin: 0,
  });
  s.addText(right, {
    x: 13.90, y: 2.09, w: 5.00, h: 0.33,
    fontFace: FONT_M, fontSize: 13, color: C.lime,
    charSpacing: 4, align: "right", margin: 0, bold: true,
  });
}

function sessionRows(s, rows) {
  // rows: [{ mins, title, desc, tag, h }]  h is row height
  let y = 2.75;
  rows.forEach(r => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: L, y, w: 8.90, h: r.h,
      fill: { color: C.card }, line: { color: C.border, width: 0.75 },
    });
    // Big minute number
    s.addText(r.mins, {
      x: 1.51, y: y + 0.35, w: 0.81, h: 0.42,
      fontFace: FONT_H, fontSize: 22, color: C.lime,
      bold: true, align: "center", margin: 0,
    });
    // Title
    s.addText(r.title, {
      x: 2.45, y: y + 0.19, w: 5.80, h: 0.44,
      fontFace: FONT_H, fontSize: 17, color: C.text,
      bold: true, margin: 0,
    });
    // Description
    s.addText(r.desc, {
      x: 2.45, y: y + 0.61, w: 5.80, h: r.h - 0.72,
      fontFace: FONT_B, fontSize: 13, color: C.muted,
      margin: 0,
    });
    // Tag button (outlined) — Consolas 11pt + charSpacing 4 runs wide,
    // so we over-allocate to keep labels like "EVERY PLAYER A BALL" on one line.
    const tagW = Math.max(1.20, r.tag.length * 0.14 + 0.55);
    const tagX = 10.05 - tagW;
    s.addShape(pres.shapes.RECTANGLE, {
      x: tagX, y: y + 0.51, w: tagW, h: 0.40,
      fill: { color: C.bg }, line: { color: C.border2, width: 0.75 },
    });
    s.addText(r.tag, {
      x: tagX, y: y + 0.51, w: tagW, h: 0.40,
      fontFace: FONT_M, fontSize: 11, color: C.muted,
      charSpacing: 4, align: "center", valign: "middle", margin: 0,
    });

    y += r.h + 0.12;
  });
}

// ====================================================================
// SLIDE 5 — Session 01: Ball Mastery & 1v1
// ====================================================================
function slide5() {
  const s = pres.addSlide();
  bg(s);
  sessionHeader(s, "SESSION 01 · TUESDAY", "BALL MASTERY & 1V1", "60 MIN · TECHNICAL EMPHASIS");

  sessionRows(s, [
    { mins: "10", title: "WARM-UP",   desc: "Ball manipulation circuit · 6 moves, 30s each",       tag: "EVERY PLAYER A BALL", h: 1.44 },
    { mins: "15", title: "TECHNICAL", desc: "Cut-back & step-over patterns through cone channels", tag: "REPETITION",          h: 1.44 },
    { mins: "20", title: "TACTICAL",  desc: "1v1 to goal — see Drill A →",                          tag: "DECISION",            h: 1.12 },
    { mins: "13", title: "SSG",       desc: "4v4 · beat your player to earn goal · no offside",    tag: "COMPETE",             h: 1.12 },
    { mins: "2",  title: "HUDDLE",    desc: "Name one move you used today",                         tag: "CLOSE",               h: 1.12 },
  ]);

  // ---- Right panel: Drill A diagram ----
  const px = 10.65, py = 2.75, pw = 8.10, ph = 7.36;
  s.addShape(pres.shapes.RECTANGLE, {
    x: px, y: py, w: pw, h: ph,
    fill: { color: C.card }, line: { color: C.border, width: 0.75 },
  });
  s.addText("DRILL A · 1V1 GATES", {
    x: px + 0.35, y: py + 0.30, w: 5.00, h: 0.60,
    fontFace: FONT_H, fontSize: 18, color: C.text, bold: true, margin: 0,
  });
  s.addText("20 min", {
    x: px + pw - 1.25, y: py + 0.52, w: 1.10, h: 0.33,
    fontFace: FONT_M, fontSize: 13, color: C.muted,
    align: "right", margin: 0,
  });
  // header underline
  s.addShape(pres.shapes.RECTANGLE, {
    x: px + 0.01, y: py + 1.15, w: pw - 0.02, h: 0.01,
    fill: { color: C.border }, line: { type: "none" },
  });

  // Pitch rectangle
  const pitchX = px + 0.35, pitchY = py + 1.40, pitchW = pw - 0.70, pitchH = ph - 2.80;
  s.addShape(pres.shapes.RECTANGLE, {
    x: pitchX, y: pitchY, w: pitchW, h: pitchH,
    fill: { color: "0E2419" }, line: { color: C.text, width: 1.25 },
  });

  // Gate labels
  s.addText("GATE", {
    x: pitchX + 0.55, y: pitchY + 0.40, w: 1.0, h: 0.30,
    fontFace: FONT_M, fontSize: 11, color: C.muted, charSpacing: 3, margin: 0,
  });
  s.addText("GOAL", {
    x: pitchX + pitchW - 1.2, y: pitchY + 0.55, w: 1.2, h: 0.30,
    fontFace: FONT_M, fontSize: 11, color: C.muted, charSpacing: 3, margin: 0,
  });

  // Cones (4 corners of the work zone)
  const conePts = [
    { x: pitchX + 0.70, y: pitchY + 0.78 },
    { x: pitchX + 0.70, y: pitchY + pitchH - 0.95 },
    { x: pitchX + pitchW - 1.10, y: pitchY + 0.95 },
    { x: pitchX + pitchW - 1.10, y: pitchY + pitchH - 0.95 },
  ];
  conePts.forEach(p => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: p.x, y: p.y, w: 0.17, h: 0.17,
      fill: { color: C.orange }, line: { type: "none" },
    });
  });

  // Movement lines from Attacker to Defender, fanning out
  const atk = { x: pitchX + 1.45, y: pitchY + pitchH / 2 - 0.05 };
  const def = { x: pitchX + pitchW - 1.95, y: pitchY + pitchH / 2 + 0.05 };
  // two angled movement lines
  s.addShape(pres.shapes.LINE, {
    x: atk.x + 0.25, y: atk.y + 0.15, w: def.x - atk.x - 0.25, h: -0.20,
    line: { color: C.lime, width: 1.5 },
  });
  s.addShape(pres.shapes.LINE, {
    x: atk.x + 0.25, y: atk.y + 0.15, w: def.x - atk.x - 0.25, h: 0.45,
    line: { color: C.lime, width: 1.5 },
  });

  // Attacker (green circle w/ "A")
  s.addShape(pres.shapes.OVAL, {
    x: atk.x, y: atk.y, w: 0.40, h: 0.40,
    fill: { color: C.lime }, line: { color: C.bg, width: 1 },
  });
  s.addText("A", {
    x: atk.x, y: atk.y, w: 0.40, h: 0.40,
    fontFace: FONT_H, fontSize: 13, color: C.bg,
    bold: true, align: "center", valign: "middle", margin: 0,
  });
  // Defender (white circle w/ "D")
  s.addShape(pres.shapes.OVAL, {
    x: def.x, y: def.y, w: 0.40, h: 0.40,
    fill: { color: C.text }, line: { color: C.bg, width: 1 },
  });
  s.addText("D", {
    x: def.x, y: def.y, w: 0.40, h: 0.40,
    fontFace: FONT_H, fontSize: 13, color: C.bg,
    bold: true, align: "center", valign: "middle", margin: 0,
  });

  // Goal bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: pitchX + pitchW - 0.55, y: pitchY + pitchH / 2 - 0.40, w: 0.14, h: 0.80,
    fill: { color: C.text }, line: { type: "none" },
  });

  // Legend row below pitch
  const legendY = pitchY + pitchH + 0.28;
  drawLegend(s, px + 0.35, legendY, [
    { kind: "dot",  color: C.lime,   label: "ATTACKER" },
    { kind: "dot",  color: C.text,   label: "DEFENDER" },
    { kind: "sq",   color: C.orange, label: "CONE/GATE" },
  ]);
  drawLegend(s, px + 0.35, legendY + 0.45, [
    { kind: "line", color: C.lime, label: "MOVEMENT" },
  ]);

  footer(s, 5);
}

// Small reusable legend row
function drawLegend(s, x, y, items) {
  let cx = x;
  items.forEach(it => {
    if (it.kind === "dot") {
      s.addShape(pres.shapes.OVAL, { x: cx, y: y + 0.08, w: 0.20, h: 0.20, fill: { color: it.color }, line: { type: "none" } });
    } else if (it.kind === "sq") {
      s.addShape(pres.shapes.RECTANGLE, { x: cx + 0.02, y: y + 0.10, w: 0.16, h: 0.16, fill: { color: it.color }, line: { type: "none" } });
    } else if (it.kind === "line") {
      s.addShape(pres.shapes.RECTANGLE, { x: cx, y: y + 0.17, w: 0.26, h: 0.03, fill: { color: it.color }, line: { type: "none" } });
    }
    s.addText(it.label, {
      x: cx + 0.30, y: y, w: 1.80, h: 0.35,
      fontFace: FONT_M, fontSize: 11, color: C.muted,
      charSpacing: 3, margin: 0, valign: "middle",
    });
    cx += 2.00;
  });
}

// ====================================================================
// SLIDE 6 — Session 02: Passing & Combinations
// ====================================================================
function slide6() {
  const s = pres.addSlide();
  bg(s);
  sessionHeader(s, "SESSION 02 · THURSDAY", "PASSING & COMBINATIONS", "60 MIN · TACTICAL EMPHASIS");

  sessionRows(s, [
    { mins: "10", title: "WARM-UP",   desc: "Rondo 4v1 · two touches max, then one",        tag: "TIGHT SPACE", h: 1.30 },
    { mins: "15", title: "TECHNICAL", desc: "Passing patterns · give-and-go, third-man run", tag: "PATTERN",     h: 1.30 },
    { mins: "20", title: "TACTICAL",  desc: "3v2 transition grid — see Drill B →",           tag: "SHAPE",       h: 1.12 },
    { mins: "13", title: "SSG",       desc: "5v5 · 3-pass rule before shooting",             tag: "COMPETE",     h: 1.12 },
    { mins: "2",  title: "HUDDLE",    desc: "Who made the best assist today?",               tag: "CLOSE",       h: 1.12 },
  ]);

  // Right panel — Drill B
  const px = 10.65, py = 2.75, pw = 8.10, ph = 7.36;
  s.addShape(pres.shapes.RECTANGLE, {
    x: px, y: py, w: pw, h: ph,
    fill: { color: C.card }, line: { color: C.border, width: 0.75 },
  });
  s.addText("DRILL B · 3V2 TO GOAL", {
    x: px + 0.35, y: py + 0.30, w: 5.50, h: 0.60,
    fontFace: FONT_H, fontSize: 18, color: C.text, bold: true, margin: 0,
  });
  s.addText("20 min", {
    x: px + pw - 1.25, y: py + 0.52, w: 1.10, h: 0.33,
    fontFace: FONT_M, fontSize: 13, color: C.muted, align: "right", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: px + 0.01, y: py + 1.15, w: pw - 0.02, h: 0.01,
    fill: { color: C.border }, line: { type: "none" },
  });

  // Pitch
  const pitchX = px + 0.35, pitchY = py + 1.40, pitchW = pw - 0.70, pitchH = ph - 2.80;
  s.addShape(pres.shapes.RECTANGLE, {
    x: pitchX, y: pitchY, w: pitchW, h: pitchH,
    fill: { color: "0E2419" }, line: { color: C.text, width: 1.25 },
  });
  s.addText("3 ATTACKERS", {
    x: pitchX + 0.55, y: pitchY + 0.25, w: 2.0, h: 0.30,
    fontFace: FONT_M, fontSize: 11, color: C.muted, charSpacing: 3, margin: 0,
  });
  s.addText("2 DEFENDERS", {
    x: pitchX + pitchW - 3.10, y: pitchY + 0.25, w: 2.0, h: 0.30,
    fontFace: FONT_M, fontSize: 11, color: C.muted, charSpacing: 3, margin: 0,
  });

  // Players — attackers (green 1, 2, 3)
  const A1 = { x: pitchX + 0.90, y: pitchY + 0.90 };
  const A3 = { x: pitchX + 2.20, y: pitchY + pitchH / 2 - 0.05 };
  const A2 = { x: pitchX + 1.30, y: pitchY + pitchH - 1.00 };
  // Defenders
  const D1 = { x: pitchX + 3.75, y: pitchY + 1.00 };
  const D2 = { x: pitchX + 3.90, y: pitchY + pitchH / 2 + 0.55 };
  // GK
  const GK = { x: pitchX + pitchW - 0.90, y: pitchY + pitchH / 2 - 0.15 };

  // Passing/run lines — A1 → A3 → D area → GK
  s.addShape(pres.shapes.LINE, {
    x: A1.x + 0.18, y: A1.y + 0.30,
    w: A3.x - A1.x - 0.02, h: A3.y - A1.y + 0.05,
    line: { color: C.lime, width: 1.5 },
  });
  s.addShape(pres.shapes.LINE, {
    x: A3.x + 0.35, y: A3.y + 0.20,
    w: D1.x - A3.x - 0.20, h: D1.y - A3.y - 0.05,
    line: { color: C.lime, width: 1.5 },
  });
  s.addShape(pres.shapes.LINE, {
    x: D1.x + 0.35, y: D1.y + 0.20,
    w: GK.x - D1.x - 0.30, h: GK.y - D1.y + 0.05,
    line: { color: C.lime, width: 1.5 },
  });

  function player(p, label, color, textColor) {
    s.addShape(pres.shapes.OVAL, {
      x: p.x, y: p.y, w: 0.40, h: 0.40,
      fill: { color }, line: { color: C.bg, width: 1 },
    });
    s.addText(label, {
      x: p.x, y: p.y, w: 0.40, h: 0.40,
      fontFace: FONT_H, fontSize: 12, color: textColor,
      bold: true, align: "center", valign: "middle", margin: 0,
    });
  }
  player(A1, "1", C.lime, C.bg);
  player(A3, "3", C.lime, C.bg);
  player(A2, "2", C.lime, C.bg);
  player(D1, "D", C.text, C.bg);
  player(D2, "D", C.text, C.bg);
  player(GK, "GK", C.orange, C.white);

  // Goal
  s.addShape(pres.shapes.RECTANGLE, {
    x: pitchX + pitchW - 0.30, y: pitchY + pitchH / 2 - 0.45, w: 0.14, h: 0.90,
    fill: { color: C.text }, line: { type: "none" },
  });

  // Legend
  const legendY = pitchY + pitchH + 0.28;
  drawLegend(s, px + 0.35, legendY, [
    { kind: "dot",  color: C.lime, label: "ATTACKER" },
    { kind: "dot",  color: C.text, label: "DEFENDER" },
    { kind: "line", color: C.lime, label: "PASS" },
    { kind: "line", color: C.lime, label: "RUN" },
  ]);

  footer(s, 6);
}

// ====================================================================
// SLIDE 7 — Session 03: Finishing & Match Play
// ====================================================================
function slide7() {
  const s = pres.addSlide();
  bg(s);
  sessionHeader(s, "SESSION 03 · SATURDAY", "FINISHING & MATCH PLAY", "60 MIN · COMPETITIVE EMPHASIS");

  sessionRows(s, [
    { mins: "10", title: "WARM-UP",   desc: "Shooting ladder · instep strikes from 8m",             tag: "STRIKE CLEAN", h: 1.30 },
    { mins: "15", title: "TECHNICAL", desc: "Finishing lanes · cross-shot, cut-back, 1v1 vs GK",    tag: "FINISH",       h: 1.30 },
    { mins: "20", title: "TACTICAL",  desc: "Finishing zone game — see Drill C →",                   tag: "SCORE",        h: 1.12 },
    { mins: "13", title: "SSG",       desc: "7v7 full-field · no restrictions · match prep",         tag: "COMPETE",      h: 1.12 },
    { mins: "2",  title: "HUDDLE",    desc: "Match-day mindset for tomorrow",                        tag: "CLOSE",        h: 1.12 },
  ]);

  // Right panel — Drill C
  const px = 10.65, py = 2.75, pw = 8.10, ph = 7.36;
  s.addShape(pres.shapes.RECTANGLE, {
    x: px, y: py, w: pw, h: ph,
    fill: { color: C.card }, line: { color: C.border, width: 0.75 },
  });
  s.addText("DRILL C · ZONE FINISHING", {
    x: px + 0.35, y: py + 0.30, w: 5.60, h: 0.60,
    fontFace: FONT_H, fontSize: 18, color: C.text, bold: true, margin: 0,
  });
  s.addText("20 min", {
    x: px + pw - 1.25, y: py + 0.52, w: 1.10, h: 0.33,
    fontFace: FONT_M, fontSize: 13, color: C.muted, align: "right", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: px + 0.01, y: py + 1.15, w: pw - 0.02, h: 0.01,
    fill: { color: C.border }, line: { type: "none" },
  });

  // Pitch
  const pitchX = px + 0.35, pitchY = py + 1.40, pitchW = pw - 0.70, pitchH = ph - 2.80;
  s.addShape(pres.shapes.RECTANGLE, {
    x: pitchX, y: pitchY, w: pitchW, h: pitchH,
    fill: { color: "0E2419" }, line: { color: C.text, width: 1.25 },
  });
  s.addText("WIDE PLAYER", {
    x: pitchX + 0.70, y: pitchY + 0.25, w: 2.0, h: 0.30,
    fontFace: FONT_M, fontSize: 11, color: C.muted, charSpacing: 3, margin: 0,
  });
  s.addText("FINISH ZONE", {
    x: pitchX + pitchW / 2 - 0.20, y: pitchY + 0.25, w: 2.0, h: 0.30,
    fontFace: FONT_M, fontSize: 11, color: C.muted, charSpacing: 3, margin: 0,
  });

  // Cones — zone markers
  const coneTop = { x: pitchX + pitchW / 2 + 0.50, y: pitchY + 0.60 };
  const coneBot = { x: pitchX + pitchW / 2 + 0.50, y: pitchY + pitchH - 0.90 };
  [coneTop, coneBot].forEach(p => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: p.x, y: p.y, w: 0.17, h: 0.17,
      fill: { color: C.orange }, line: { type: "none" },
    });
  });

  // Players
  const W_ = { x: pitchX + 1.00, y: pitchY + 1.10 };      // Wide player
  const A  = { x: pitchX + 2.60, y: pitchY + pitchH / 2 + 0.05 };
  const D  = { x: pitchX + 3.50, y: pitchY + pitchH / 2 - 0.10 };
  const GK = { x: pitchX + pitchW - 0.90, y: pitchY + pitchH / 2 - 0.05 };

  // Lines
  s.addShape(pres.shapes.LINE, {
    x: W_.x + 0.30, y: W_.y + 0.30,
    w: A.x - W_.x - 0.15, h: A.y - W_.y + 0.10,
    line: { color: C.lime, width: 1.5 },
  });
  s.addShape(pres.shapes.LINE, {
    x: A.x + 0.35, y: A.y + 0.20,
    w: GK.x - A.x - 0.30, h: GK.y - A.y,
    line: { color: C.lime, width: 1.5 },
  });

  function player(p, label, color, textColor) {
    s.addShape(pres.shapes.OVAL, {
      x: p.x, y: p.y, w: 0.40, h: 0.40,
      fill: { color }, line: { color: C.bg, width: 1 },
    });
    s.addText(label, {
      x: p.x, y: p.y, w: 0.40, h: 0.40,
      fontFace: FONT_H, fontSize: 12, color: textColor,
      bold: true, align: "center", valign: "middle", margin: 0,
    });
  }
  player(W_, "W", C.lime, C.bg);
  player(A,  "A", C.lime, C.bg);
  player(D,  "D", C.text, C.bg);
  player(GK, "GK", C.orange, C.white);

  // Goal
  s.addShape(pres.shapes.RECTANGLE, {
    x: pitchX + pitchW - 0.30, y: pitchY + pitchH / 2 - 0.45, w: 0.14, h: 0.90,
    fill: { color: C.text }, line: { type: "none" },
  });

  // Legend
  const legendY = pitchY + pitchH + 0.28;
  drawLegend(s, px + 0.35, legendY, [
    { kind: "dot",  color: C.lime,   label: "ATTACKER" },
    { kind: "dot",  color: C.text,   label: "DEFENDER" },
    { kind: "sq",   color: C.orange, label: "ZONE CONE" },
  ]);
  drawLegend(s, px + 0.35, legendY + 0.45, [
    { kind: "line", color: C.lime, label: "PASS / SHOT" },
  ]);

  footer(s, 7);
}

// ====================================================================
// SLIDE 8 — Session 04: Video Review
// ====================================================================
function slide8() {
  const s = pres.addSlide();
  bg(s);
  sessionHeader(s, "SESSION 04 · MONDAY", "VIDEO REVIEW", "20 MIN · CLASSROOM EMPHASIS");

  sessionRows(s, [
    { mins: "3", title: "SET THE FRAME",   desc: "One theme per week: pressing, shape, combinations, or finishing.",      tag: "THEME",    h: 1.44 },
    { mins: "5", title: "MATCH CLIPS",     desc: "4–6 short clips from Sunday's fixture — wins and growth moments.",      tag: "OUR PLAY", h: 1.44 },
    { mins: "5", title: "PRO REFERENCE",   desc: "2–3 clips of the same idea at the top level. Age-appropriate, short.",  tag: "PATTERN",  h: 1.44 },
    { mins: "5", title: "PLAYER VOICE",    desc: "Players call out what they see. Coach asks questions, not answers.",    tag: "DISCUSS",  h: 1.44 },
    { mins: "2", title: "TUESDAY LINK",    desc: "Connect what we saw to tomorrow's Ball Mastery session.",                tag: "CLOSE",    h: 1.32 },
  ]);

  // Right panel — Film Room Principles
  const px = 10.65, py = 2.75, pw = 8.10, ph = 7.69;
  s.addShape(pres.shapes.RECTANGLE, {
    x: px, y: py, w: pw, h: ph,
    fill: { color: C.card }, line: { color: C.border, width: 0.75 },
  });
  s.addText("FILM ROOM\nPRINCIPLES", {
    x: px + 0.35, y: py + 0.25, w: 4.50, h: 0.90,
    fontFace: FONT_H, fontSize: 18, color: C.text,
    bold: true, margin: 0, valign: "top",
  });
  s.addText("Age-Appropriate", {
    x: px + pw - 2.90, y: py + 0.52, w: 2.60, h: 0.33,
    fontFace: FONT_B, fontSize: 14, color: C.lime,
    italic: true, align: "right", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: px + 0.01, y: py + 1.15, w: pw - 0.02, h: 0.01,
    fill: { color: C.border }, line: { type: "none" },
  });

  const principles = [
    { n: "01", title: "SHORT & FOCUSED",   desc: "Never more than 20 minutes. Attention span is the ceiling." },
    { n: "02", title: "NAME NAMES KINDLY", desc: "Praise publicly, critique privately. Clips highlight decisions, not people." },
    { n: "03", title: "ASK, DON'T TELL",   desc: "\u201CWhat do you see?\u201D beats \u201CYou should have…\u201D every single time." },
    { n: "04", title: "LINK TO THE FIELD", desc: "Every clip connects to something we'll drill this week. No loose threads." },
  ];

  const startY = py + 1.45;
  const rowGap = 1.57;
  principles.forEach((p, i) => {
    const ry = startY + i * rowGap;
    s.addText(p.n, {
      x: px + 0.35, y: ry, w: 0.80, h: 0.42,
      fontFace: FONT_H, fontSize: 18, color: C.lime,
      bold: true, margin: 0,
    });
    s.addText(p.title, {
      x: px + 1.12, y: ry, w: 6.84, h: 0.44,
      fontFace: FONT_H, fontSize: 17, color: C.text,
      bold: true, margin: 0,
    });
    s.addText(p.desc, {
      x: px + 1.12, y: ry + 0.48, w: 6.84, h: 0.60,
      fontFace: FONT_B, fontSize: 13, color: C.muted,
      margin: 0,
    });
  });

  footer(s, 8);
}

// ====================================================================
// SLIDE 9 — Progress (3-row milestones table)
// ====================================================================
function slide9() {
  const s = pres.addSlide();
  bg(s);
  pageHeader(
    s,
    "04 · PROGRESS",
    "PLAYER DEVELOPMENT MILESTONES",
    "Three measurable checkpoints across the season — technical, tactical, and personal. Players self-assess alongside coach evaluation."
  );

  // Container
  const tx = 1.25, ty = 4.37, tw = 17.50, th = 4.86;
  s.addShape(pres.shapes.RECTANGLE, {
    x: tx, y: ty, w: tw, h: th,
    fill: { color: C.card }, line: { type: "none" },
  });

  // Column positions
  const colWs = [1.88, 5.20, 5.20, 5.21]; // sums to 17.49
  const colXs = [tx]; 
  for (let i = 1; i < colWs.length; i++) colXs.push(colXs[i-1] + colWs[i-1]);

  // Row heights: header, 3 body rows
  const rowHs = [0.97, 1.29, 1.29, 1.29]; // sums ~4.84
  const rowYs = [ty];
  for (let i = 1; i < rowHs.length; i++) rowYs.push(rowYs[i-1] + rowHs[i-1]);

  // First column background (MEASURE column) — slightly different tone
  for (let r = 0; r < 4; r++) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: colXs[0] + 0.01, y: rowYs[r] + 0.01, w: colWs[0] - 0.02, h: rowHs[r] - 0.02,
      fill: { color: C.card2 }, line: { type: "none" },
    });
  }
  // Header row background on all columns
  for (let c = 1; c < 4; c++) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: colXs[c] + 0.01, y: rowYs[0] + 0.01, w: colWs[c] - 0.02, h: rowHs[0] - 0.02,
      fill: { color: C.card2 }, line: { type: "none" },
    });
  }

  // Horizontal separators
  for (let r = 1; r < 4; r++) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: tx + 0.01, y: rowYs[r], w: tw - 0.02, h: 0.01,
      fill: { color: C.border }, line: { type: "none" },
    });
  }
  // Vertical separators
  for (let c = 1; c < 4; c++) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: colXs[c], y: ty + 0.01, w: 0.01, h: th - 0.02,
      fill: { color: C.border }, line: { type: "none" },
    });
  }

  // Headers
  const headers = ["MEASURE", "MONTH 01", "MONTH 02", "MONTH 03"];
  headers.forEach((h, i) => {
    s.addText(h, {
      x: colXs[i] + 0.28, y: rowYs[0] + 0.26, w: colWs[i] - 0.40, h: 0.42,
      fontFace: FONT_M, fontSize: 13, color: C.lime,
      charSpacing: 4, bold: true, margin: 0, valign: "middle",
    });
  });

  // Data
  const data = [
    ["TECHNICAL", "Execute 4 ball-mastery moves cleanly at walking pace.",         "Complete moves at jogging pace under light pressure.",        "Use the right move at game speed against a live defender."],
    ["TACTICAL",  "Recognize supporting angles in 3v2 situations.",                "Make the third-man run without prompting.",                   "Read and switch play on the second pass."],
    ["PERSONAL",  "Arrive on time with full kit and a positive attitude.",         "Lead a warm-up station and encourage a teammate.",            "Self-reflect after matches — one growth, one win."],
  ];

  data.forEach((row, r) => {
    // row label
    s.addText(row[0], {
      x: colXs[0] + 0.28, y: rowYs[r + 1] + 0.27, w: colWs[0] - 0.40, h: 0.74,
      fontFace: FONT_H, fontSize: 15, color: C.text,
      bold: true, margin: 0, valign: "middle",
    });
    // body cells
    for (let c = 1; c < 4; c++) {
      s.addText(row[c], {
        x: colXs[c] + 0.28, y: rowYs[r + 1] + 0.27, w: colWs[c] - 0.40, h: 0.74,
        fontFace: FONT_B, fontSize: 13, color: C.muted,
        margin: 0, valign: "middle",
      });
    }
  });

  footer(s, 9);
}

// ====================================================================
// SLIDE 10 — Parent Partnership
// ====================================================================
function slide10() {
  const s = pres.addSlide();
  bg(s);
  pageHeader(
    s,
    "05 · TOGETHER",
    "PARENT PARTNERSHIP",
    "Development at this age happens in three places — the training field, the match, and the car ride home. We need you on the team."
  );

  // ---- Left column: HOW YOU CAN HELP ----
  s.addText("HOW YOU CAN HELP", {
    x: L, y: 4.29, w: 9.04, h: 0.57,
    fontFace: FONT_H, fontSize: 20, color: C.text,
    bold: true, margin: 0,
  });

  const helps = [
    "Arrive 10 minutes early with water, shin guards, and the right boots.",
    "Cheer effort and bravery — not just goals and outcomes.",
    "Leave coaching to the coaches during sessions and matches.",
    "Encourage 15 minutes of ball-in-the-yard on non-training days.",
    "Watch the Monday film clip together — 5 minutes, one question afterward.",
    "Ask one question on the ride home: \u201CDid you have fun today?\u201D",
  ];

  let hy = 5.19;
  const hRowH = 0.78;
  helps.forEach((txt, i) => {
    // checkbox outline
    s.addShape(pres.shapes.RECTANGLE, {
      x: L, y: hy, w: 0.41, h: 0.41,
      fill: { color: C.bg }, line: { color: C.lime, width: 1.25 },
    });
    // check mark
    s.addText("✓", {
      x: L, y: hy, w: 0.41, h: 0.41,
      fontFace: FONT_H, fontSize: 15, color: C.lime,
      bold: true, align: "center", valign: "middle", margin: 0,
    });
    // text
    s.addText(txt, {
      x: L + 0.71, y: hy, w: 8.31, h: 0.55,
      fontFace: FONT_B, fontSize: 14, color: C.text,
      margin: 0, valign: "top",
    });
    // divider under each row
    s.addShape(pres.shapes.RECTANGLE, {
      x: L, y: hy + 0.67, w: 8.77, h: 0.01,
      fill: { color: C.border }, line: { type: "none" },
    });
    hy += hRowH;
  });

  // ---- Right column: STAY CONNECTED card ----
  const cx = 10.77, cy = 4.29, cw = 7.98, ch = 5.54;
  s.addShape(pres.shapes.RECTANGLE, {
    x: cx, y: cy, w: cw, h: ch,
    fill: { color: C.card }, line: { color: C.border, width: 0.75 },
  });

  // "STAY CONNECTED" pill (outlined)
  s.addShape(pres.shapes.RECTANGLE, {
    x: cx + 0.47, y: cy + 0.46, w: cw - 0.94, h: 0.47,
    fill: { color: C.bg }, line: { color: C.lime, width: 1 },
  });
  s.addText("STAY CONNECTED", {
    x: cx + 0.47, y: cy + 0.46, w: cw - 0.94, h: 0.47,
    fontFace: FONT_M, fontSize: 14, color: C.lime,
    charSpacing: 4, bold: true, align: "center", valign: "middle", margin: 0,
  });

  const contacts = [
    { label: "HEAD COACH",    value: "Coach M. Rivera",                  valueBold: true },
    { label: "TEAM APP",      value: "TeamSnap · Northside FC U10 Boys", valueBold: false },
    { label: "WEEKLY EMAIL",  value: "Sunday night recap + next-week focus", valueBold: false },
    { label: "OFFICE HOURS",  value: "Tuesday after session, or by appointment", valueBold: false },
  ];
  let cy2 = cy + 1.22;
  const contactGap = 0.92;
  contacts.forEach(c => {
    s.addText(c.label, {
      x: cx + 0.47, y: cy2, w: cw - 0.94, h: 0.33,
      fontFace: FONT_M, fontSize: 12, color: C.muted,
      charSpacing: 4, margin: 0,
    });
    s.addText(c.value, {
      x: cx + 0.47, y: cy2 + 0.35, w: cw - 0.94, h: 0.42,
      fontFace: c.valueBold ? FONT_H : FONT_B,
      fontSize: c.valueBold ? 20 : 15,
      color: C.text,
      bold: c.valueBold, margin: 0,
    });
    cy2 += contactGap + (c.valueBold ? 0.25 : 0);
  });

  footer(s, 10);
}

// ---------- Build ----------
slide1();
slide2();
slide3();
slide4();
slide5();
slide6();
slide7();
slide8();
slide9();
slide10();

pres.writeFile({ fileName: "Plan_5.pptx" })
  .then(name => console.log(`Wrote ${name}`))
  .catch(err => { console.error(err); process.exit(1); });
