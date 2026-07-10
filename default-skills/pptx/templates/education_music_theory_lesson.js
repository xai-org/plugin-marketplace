// Music Theory Presentation - pptxgenjs replica
// Recreates the original Music_Theory.pptx with minor enhancements:
//  - Slide 1: Widened title box so "Introduction" no longer breaks across lines.
//  - Slide 6: Time Signature column reordered so the "Time Signature" label sits
//    at the top with the other column headers (matching Beat / Measure pattern).

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333" x 7.5"
pres.title = "Introduction to Music Theory";
pres.author = "Middle School Music";

// ---- Color palette (sampled from original) ----
const COLOR = {
  navy: "1E2A4A",        // primary deep navy
  cream: "F1ECE0",       // background warm off-white
  coral: "E86A52",       // primary accent / italic words
  gold: "C9974A",        // secondary accent
  muted: "8A8A7A",       // muted footer / labels
  bodyNavy: "1E2A4A",
  white: "FFFFFF",
};

const FONT_HEAD = "Calibri";   // bold sans-ish for headers
const FONT_BODY = "Calibri";
// Use a heavier system font for big titles -- "Calibri" with bold is reliable on most renderers
// We choose Verdana/Calibri combo to mimic the bold geometric sans look of the original.
const FONT_TITLE = "Verdana";

const SLIDE_W = 13.333;
const SLIDE_H = 7.5;

// ---- Reusable helpers ----
function addEyebrow(slide, text, color = COLOR.coral) {
  slide.addText(text, {
    x: 0.7, y: 0.45, w: 8, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true,
    color, charSpacing: 4, margin: 0,
  });
}

function addFooter(slide, pageLabel, sectionLabel, dark = false) {
  const c = dark ? COLOR.cream : COLOR.muted;
  slide.addText(pageLabel, {
    x: 0.7, y: 7.0, w: 3, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, color: c,
    charSpacing: 2, margin: 0, transparency: dark ? 40 : 0,
  });
  slide.addText(sectionLabel, {
    x: SLIDE_W - 3.7, y: 7.0, w: 3, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, color: c,
    charSpacing: 4, align: "right", margin: 0, transparency: dark ? 40 : 0,
  });
}

// =====================================================================
// SLIDE 1 — Title
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.navy };

  // top eyebrow with dot
  s.addShape(pres.shapes.OVAL, {
    x: 0.7, y: 0.62, w: 0.18, h: 0.18,
    fill: { color: COLOR.coral }, line: { color: COLOR.coral },
  });
  s.addText("MUSIC · UNIT 01", {
    x: 1.0, y: 0.5, w: 5, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true,
    color: COLOR.cream, charSpacing: 4, margin: 0,
  });

  // Big title — widened so "Introduction" stays on one line
  s.addText([
    { text: "Introduction to Music ", options: { color: COLOR.cream } },
    { text: "Theory.", options: { color: COLOR.coral, italic: true } },
  ], {
    x: 0.7, y: 1.85, w: 10.5, h: 3.2,
    fontFace: FONT_TITLE, fontSize: 78, bold: true,
    valign: "top", margin: 0,
  });

  // Subtitle
  s.addText("A first look at the language behind every song.", {
    x: 0.7, y: 5.25, w: 9, h: 0.5,
    fontFace: FONT_BODY, fontSize: 18, color: COLOR.gold, margin: 0,
  });

  // Bottom labels
  s.addText("MIDDLE SCHOOL MUSIC", {
    x: 0.7, y: 7.0, w: 5, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 12, bold: true,
    color: COLOR.cream, charSpacing: 4, margin: 0,
  });
  s.addText("LESSON ONE", {
    x: SLIDE_W - 3.5, y: 7.0, w: 2.8, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 12, bold: true,
    color: COLOR.cream, charSpacing: 4, align: "right", margin: 0,
  });

  // Decorative shapes on right (circle + line + square)
  s.addShape(pres.shapes.OVAL, {
    x: 11.2, y: 1.9, w: 1.4, h: 1.4,
    fill: { color: COLOR.coral }, line: { color: COLOR.coral },
  });
  s.addShape(pres.shapes.LINE, {
    x: 11.9, y: 3.4, w: 0, h: 1.2,
    line: { color: COLOR.gold, width: 2 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 11.2, y: 4.7, w: 1.4, h: 1.4,
    fill: { color: COLOR.cream }, line: { color: COLOR.cream },
  });
}

// =====================================================================
// SLIDE 2 — What & Why (3 columns)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  addEyebrow(s, "02 — WHAT & WHY");

  // Title
  s.addText([
    { text: "Music theory is the ", options: { color: COLOR.navy } },
    { text: "how", options: { color: COLOR.coral, italic: true } },
    { text: " and ", options: { color: COLOR.navy } },
    { text: "why", options: { color: COLOR.gold, italic: true } },
    { text: " of music.", options: { color: COLOR.navy } },
  ], {
    x: 0.7, y: 1.0, w: 12, h: 1.8,
    fontFace: FONT_TITLE, fontSize: 42, bold: true,
    valign: "top", margin: 0,
  });

  // 3 columns
  const cols = [
    { num: "1", color: COLOR.navy, head: "Read it",
      body: "Turn the dots and lines on a page into actual sounds." },
    { num: "2", color: COLOR.coral, head: "Talk about it",
      body: "Share ideas with other musicians using the same words." },
    { num: "3", color: COLOR.gold, head: "Make it",
      body: "Write your own songs that sound the way you want." },
  ];

  cols.forEach((c, i) => {
    const x = 0.7 + i * 4.15;
    // numbered circle
    s.addShape(pres.shapes.OVAL, {
      x, y: 3.7, w: 0.7, h: 0.7,
      fill: { color: c.color }, line: { color: c.color },
    });
    s.addText(c.num, {
      x, y: 3.7, w: 0.7, h: 0.7,
      fontFace: FONT_HEAD, fontSize: 18, bold: true,
      color: COLOR.cream, align: "center", valign: "middle", margin: 0,
    });
    // header
    s.addText(c.head, {
      x, y: 4.6, w: 3.8, h: 0.5,
      fontFace: FONT_TITLE, fontSize: 22, bold: true,
      color: COLOR.navy, margin: 0,
    });
    // body
    s.addText(c.body, {
      x, y: 5.2, w: 3.8, h: 1.0,
      fontFace: FONT_BODY, fontSize: 14, color: COLOR.navy, margin: 0,
    });
  });

  addFooter(s, "02 / 08", "FOUNDATIONS");
}

// =====================================================================
// SLIDE 3 — The Music Alphabet
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  addEyebrow(s, "03 — THE MUSIC ALPHABET");

  s.addText("Only seven letters. Then it loops.", {
    x: 0.7, y: 1.0, w: 12, h: 0.9,
    fontFace: FONT_TITLE, fontSize: 36, bold: true,
    color: COLOR.navy, valign: "top", margin: 0,
  });

  // Letter circles A–G then LOOP and A
  const letters = ["A", "B", "C", "D", "E", "F", "G"];
  const startX = 0.7;
  const circleSize = 1.15;
  const gap = 0.18;

  letters.forEach((ltr, i) => {
    const x = startX + i * (circleSize + gap);
    const isC = ltr === "C";
    s.addShape(pres.shapes.OVAL, {
      x, y: 3.0, w: circleSize, h: circleSize,
      fill: { color: isC ? COLOR.coral : COLOR.navy },
      line: { color: isC ? COLOR.coral : COLOR.navy },
    });
    s.addText(ltr, {
      x, y: 3.0, w: circleSize, h: circleSize,
      fontFace: FONT_TITLE, fontSize: 32, bold: true,
      color: COLOR.cream, align: "center", valign: "middle", margin: 0,
    });
  });

  // LOOP marker between G and A
  const loopX = startX + 7 * (circleSize + gap) + 0.05;
  s.addText("LOOP", {
    x: loopX, y: 3.25, w: 0.85, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 11, bold: true,
    color: COLOR.gold, align: "center", charSpacing: 3, margin: 0,
  });
  // small underline under LOOP
  s.addShape(pres.shapes.LINE, {
    x: loopX + 0.18, y: 3.7, w: 0.5, h: 0,
    line: { color: COLOR.gold, width: 2 },
  });

  // Outlined "A" at the end
  const finalX = loopX + 0.95;
  s.addShape(pres.shapes.OVAL, {
    x: finalX, y: 3.0, w: circleSize, h: circleSize,
    fill: { color: COLOR.cream }, line: { color: COLOR.navy, width: 2.5 },
  });
  s.addText("A", {
    x: finalX, y: 3.0, w: circleSize, h: circleSize,
    fontFace: FONT_TITLE, fontSize: 32, bold: true,
    color: COLOR.navy, align: "center", valign: "middle", margin: 0,
  });

  // Caption below
  s.addText([
    { text: "After ", options: { color: COLOR.navy } },
    { text: "G", options: { color: COLOR.coral, bold: true } },
    { text: ", the alphabet starts over at ", options: { color: COLOR.navy } },
    { text: "A", options: { color: COLOR.coral, bold: true } },
    { text: " — but higher in pitch. That repeat is called an ", options: { color: COLOR.navy } },
    { text: "octave", options: { color: COLOR.navy, italic: true } },
    { text: ".", options: { color: COLOR.navy } },
  ], {
    x: 1.5, y: 4.7, w: 10, h: 0.9,
    fontFace: FONT_BODY, fontSize: 16, align: "center", valign: "top", margin: 0,
  });

  addFooter(s, "03 / 08", "PITCH");
}

// =====================================================================
// SLIDE 4 — The Staff & Clefs
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  addEyebrow(s, "04 — THE STAFF & CLEFS");

  s.addText("Five lines. Four spaces. One home for every note.", {
    x: 0.7, y: 1.0, w: 11.5, h: 1.6,
    fontFace: FONT_TITLE, fontSize: 36, bold: true,
    color: COLOR.navy, valign: "top", margin: 0,
  });

  // Staff lines (5 lines)
  const staffX = 0.7, staffY = 3.3, staffW = 6.8;
  const lineGap = 0.45;
  for (let i = 0; i < 5; i++) {
    s.addShape(pres.shapes.LINE, {
      x: staffX, y: staffY + i * lineGap, w: staffW, h: 0,
      line: { color: COLOR.navy, width: 1.5 },
    });
  }

  // Notes (ovals) along the staff
  const notes = [
    { x: staffX + 5.5, y: staffY - 0.13 },         // top line
    { x: staffX + 3.6, y: staffY + 0.5 - 0.13 },   // 2nd from top
    { x: staffX + 1.1, y: staffY + 1.0 - 0.13 },   // middle
    { x: staffX + 2.7, y: staffY + 1.5 - 0.13 },   // 4th
  ];
  notes.forEach((n) => {
    s.addShape(pres.shapes.OVAL, {
      x: n.x, y: n.y, w: 0.5, h: 0.28,
      fill: { color: COLOR.coral }, line: { color: COLOR.coral },
      rotate: -10,
    });
  });

  // "THE STAFF" label
  s.addText("THE STAFF", {
    x: staffX, y: 5.7, w: 3, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 12, bold: true,
    color: COLOR.muted, charSpacing: 4, margin: 0,
  });

  // Right column — Treble & Bass clef cards
  const rightX = 8.2;

  // Treble clef circle + text
  s.addShape(pres.shapes.OVAL, {
    x: rightX, y: 3.1, w: 1.0, h: 1.0,
    fill: { color: COLOR.navy }, line: { color: COLOR.navy },
  });
  s.addText("𝄞", {
    x: rightX, y: 3.05, w: 1.0, h: 1.05,
    fontFace: "DejaVu Serif", fontSize: 36, bold: true,
    color: COLOR.cream, align: "center", valign: "middle", margin: 0,
  });
  s.addText("Treble Clef", {
    x: rightX + 1.25, y: 3.1, w: 4.0, h: 0.45,
    fontFace: FONT_TITLE, fontSize: 20, bold: true,
    color: COLOR.navy, margin: 0,
  });
  s.addText("Higher notes — flute, violin, your right hand on piano.", {
    x: rightX + 1.25, y: 3.55, w: 3.7, h: 0.8,
    fontFace: FONT_BODY, fontSize: 13, color: COLOR.navy, margin: 0,
  });

  // Bass clef circle + text
  s.addShape(pres.shapes.OVAL, {
    x: rightX, y: 4.7, w: 1.0, h: 1.0,
    fill: { color: COLOR.coral }, line: { color: COLOR.coral },
  });
  s.addText("𝄢", {
    x: rightX, y: 4.65, w: 1.0, h: 1.05,
    fontFace: "DejaVu Serif", fontSize: 36, bold: true,
    color: COLOR.cream, align: "center", valign: "middle", margin: 0,
  });
  s.addText("Bass Clef", {
    x: rightX + 1.25, y: 4.7, w: 4.0, h: 0.45,
    fontFace: FONT_TITLE, fontSize: 20, bold: true,
    color: COLOR.navy, margin: 0,
  });
  s.addText("Lower notes — tuba, cello, your left hand on piano.", {
    x: rightX + 1.25, y: 5.15, w: 3.7, h: 0.8,
    fontFace: FONT_BODY, fontSize: 13, color: COLOR.navy, margin: 0,
  });

  addFooter(s, "04 / 08", "NOTATION");
}

// =====================================================================
// SLIDE 5 — Rhythm & Note Values
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  addEyebrow(s, "05 — RHYTHM & NOTE VALUES");

  s.addText("How long should a note last?", {
    x: 0.7, y: 1.0, w: 12, h: 0.9,
    fontFace: FONT_TITLE, fontSize: 36, bold: true,
    color: COLOR.navy, valign: "top", margin: 0,
  });

  // Bars: each row equals the same total width, divided into pieces
  const barX = 3.0;
  const barTotalW = 9.5;
  const barH = 0.55;
  const barGap = 0.15;
  let barY = 2.7;

  const rows = [
    { label: "Whole · 4 beats",   pieces: 1, color: COLOR.navy },
    { label: "Half · 2 beats",    pieces: 2, color: COLOR.navy },
    { label: "Quarter · 1 beat",  pieces: 4, color: COLOR.coral },
    { label: "Eighth · ½ beat",   pieces: 8, color: COLOR.gold },
  ];

  rows.forEach((r) => {
    // label
    s.addText(r.label, {
      x: 0.7, y: barY, w: 2.2, h: barH,
      fontFace: FONT_TITLE, fontSize: 14, bold: true,
      color: COLOR.navy, valign: "middle", margin: 0,
    });
    // pieces
    const pieceGap = 0.05;
    const pieceW = (barTotalW - pieceGap * (r.pieces - 1)) / r.pieces;
    for (let i = 0; i < r.pieces; i++) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: barX + i * (pieceW + pieceGap),
        y: barY,
        w: pieceW,
        h: barH,
        fill: { color: r.color }, line: { color: r.color },
      });
    }
    barY += barH + 0.18;
  });

  // Caption
  s.addText("Each row equals the same total time — just sliced into more pieces.", {
    x: 0.7, y: barY + 0.25, w: 12, h: 0.5,
    fontFace: FONT_BODY, fontSize: 16, color: COLOR.navy, margin: 0,
  });

  addFooter(s, "05 / 08", "TIME");
}

// =====================================================================
// SLIDE 6 — Beats, Measures & Time (dark)
// FIX: "Time Signature" header now at top of column to match Beat / Measure pattern.
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.navy };

  addEyebrow(s, "06 — BEATS, MEASURES & TIME", COLOR.gold);

  s.addText("The pulse, the bar, and the count.", {
    x: 0.7, y: 1.0, w: 12, h: 0.9,
    fontFace: FONT_TITLE, fontSize: 36, bold: true,
    color: COLOR.cream, valign: "top", margin: 0,
  });

  // 3 columns
  const colY = 2.8;

  // ---- Column 1: Beat (3 dots indicating pulse) ----
  const c1x = 0.7;
  // pulse dots
  const dotColors = [COLOR.coral, "8B4A3F", "5A3A3A"];
  dotColors.forEach((c, i) => {
    s.addShape(pres.shapes.OVAL, {
      x: c1x + i * 0.55, y: colY, w: 0.45, h: 0.45,
      fill: { color: c }, line: { color: c },
    });
  });
  s.addText("Beat", {
    x: c1x, y: colY + 0.7, w: 3.5, h: 0.5,
    fontFace: FONT_TITLE, fontSize: 24, bold: true,
    color: COLOR.cream, margin: 0,
  });
  s.addText("The steady pulse you tap your foot to.", {
    x: c1x, y: colY + 1.25, w: 3.5, h: 0.7,
    fontFace: FONT_BODY, fontSize: 14, color: COLOR.gold, margin: 0,
  });

  // ---- Column 2: Measure ----
  const c2x = 4.7;
  // bar line on left
  s.addShape(pres.shapes.LINE, {
    x: c2x, y: colY - 0.05, w: 0, h: 0.6,
    line: { color: COLOR.cream, width: 2 },
  });
  // 4 dots representing beats inside a measure
  for (let i = 0; i < 4; i++) {
    s.addShape(pres.shapes.OVAL, {
      x: c2x + 0.25 + i * 0.45, y: colY + 0.05, w: 0.35, h: 0.35,
      fill: { color: COLOR.cream }, line: { color: COLOR.cream },
    });
  }
  s.addText("Measure", {
    x: c2x, y: colY + 0.7, w: 4.0, h: 0.5,
    fontFace: FONT_TITLE, fontSize: 24, bold: true,
    color: COLOR.cream, margin: 0,
  });
  s.addText("A small group of beats, fenced in by bar lines.", {
    x: c2x, y: colY + 1.25, w: 4.0, h: 0.7,
    fontFace: FONT_BODY, fontSize: 14, color: COLOR.gold, margin: 0,
  });

  // ---- Column 3: Time Signature (FIXED layout: header on top, 4/4 sits in icon position) ----
  const c3x = 9.0;
  // bar line + 4/4 numbers — these occupy the same visual slot as the dots above (icon area)
  s.addShape(pres.shapes.LINE, {
    x: c3x, y: colY - 0.05, w: 0, h: 0.6,
    line: { color: COLOR.cream, width: 2 },
  });
  s.addText("4", {
    x: c3x + 0.15, y: colY - 0.18, w: 0.55, h: 0.4,
    fontFace: FONT_TITLE, fontSize: 22, bold: true,
    color: COLOR.coral, valign: "middle", margin: 0,
  });
  s.addText("4", {
    x: c3x + 0.15, y: colY + 0.18, w: 0.55, h: 0.4,
    fontFace: FONT_TITLE, fontSize: 22, bold: true,
    color: COLOR.coral, valign: "middle", margin: 0,
  });
  // header at top (aligned with Beat / Measure)
  s.addText("Time Signature", {
    x: c3x, y: colY + 0.7, w: 4.0, h: 0.5,
    fontFace: FONT_TITLE, fontSize: 24, bold: true,
    color: COLOR.cream, margin: 0,
  });
  s.addText("Top: beats per measure. Bottom: which note gets one beat.", {
    x: c3x, y: colY + 1.25, w: 4.0, h: 0.9,
    fontFace: FONT_BODY, fontSize: 14, color: COLOR.gold, margin: 0,
  });

  // Footer (lighter on dark bg) — use muted cream color directly, no transparency
  s.addText("06 / 08", {
    x: 0.7, y: 7.0, w: 3, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, color: "8A8FA8",
    charSpacing: 2, margin: 0,
  });
  s.addText("COUNTING", {
    x: SLIDE_W - 3.7, y: 7.0, w: 3, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, color: "8A8FA8",
    charSpacing: 4, align: "right", margin: 0,
  });
}

// =====================================================================
// SLIDE 7 — Melody & Harmony
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  addEyebrow(s, "07 — MELODY & HARMONY");

  s.addText("A tune, and the notes that hug it.", {
    x: 0.7, y: 1.0, w: 12, h: 0.9,
    fontFace: FONT_TITLE, fontSize: 36, bold: true,
    color: COLOR.navy, valign: "top", margin: 0,
  });

  // Two columns: Melody / Harmony
  s.addText("MELODY", {
    x: 0.7, y: 2.4, w: 4, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true,
    color: COLOR.coral, charSpacing: 4, margin: 0,
  });
  s.addText("Notes played one after another — the part you hum.", {
    x: 0.7, y: 2.85, w: 5.5, h: 1.0,
    fontFace: FONT_TITLE, fontSize: 18, bold: true,
    color: COLOR.navy, margin: 0,
  });

  s.addText("HARMONY", {
    x: 6.8, y: 2.4, w: 4, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true,
    color: COLOR.gold, charSpacing: 4, margin: 0,
  });
  s.addText("Notes played at the same time — they support the melody.", {
    x: 6.8, y: 2.85, w: 6, h: 1.0,
    fontFace: FONT_TITLE, fontSize: 18, bold: true,
    color: COLOR.navy, margin: 0,
  });

  // C Major Scale label
  s.addText("THE C MAJOR SCALE", {
    x: 0.7, y: 4.15, w: 4, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 12, bold: true,
    color: COLOR.muted, charSpacing: 4, margin: 0,
  });

  // Ascending bars C D E F G A B C
  const scale = ["C", "D", "E", "F", "G", "A", "B", "C"];
  const baseX = 0.7;
  const barW = 1.45;
  const barGap = 0.08;
  const baselineY = 6.0;
  const minH = 0.4;
  const stepH = 0.2;

  scale.forEach((ltr, i) => {
    const h = minH + i * stepH;
    const isLast = i === scale.length - 1;
    const x = baseX + i * (barW + barGap);
    const y = baselineY - h;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: barW, h,
      fill: { color: isLast ? COLOR.coral : COLOR.navy },
      line: { color: isLast ? COLOR.coral : COLOR.navy },
    });
    s.addText(ltr, {
      x, y: y + h - 0.55, w: barW, h: 0.5,
      fontFace: FONT_TITLE, fontSize: 18, bold: true,
      color: COLOR.cream, align: "center", valign: "middle", margin: 0,
    });
  });

  // Caption below scale
  s.addText("Eight steps. No sharps. No flats. The cleanest scale to start with.", {
    x: 0.7, y: 6.2, w: 12, h: 0.4,
    fontFace: FONT_BODY, fontSize: 14, color: COLOR.navy, margin: 0,
  });

  addFooter(s, "07 / 08", "SOUND");
}

// =====================================================================
// SLIDE 8 — Recap & Next Steps
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.cream };

  addEyebrow(s, "08 — RECAP & NEXT STEPS");

  s.addText([
    { text: "You learned a ", options: { color: COLOR.navy } },
    { text: "lot", options: { color: COLOR.coral, italic: true } },
    { text: " today.", options: { color: COLOR.navy } },
  ], {
    x: 0.7, y: 1.0, w: 12, h: 0.9,
    fontFace: FONT_TITLE, fontSize: 40, bold: true,
    valign: "top", margin: 0,
  });

  // Left column — what we covered
  s.addText("WHAT WE COVERED", {
    x: 0.7, y: 2.5, w: 5, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 12, bold: true,
    color: COLOR.muted, charSpacing: 4, margin: 0,
  });

  s.addText([
    { text: "The music alphabet (A–G)", options: { bullet: { code: "25CF" }, breakLine: true } },
    { text: "The staff and two clefs", options: { bullet: { code: "25CF" }, breakLine: true } },
    { text: "Note values and rhythm", options: { bullet: { code: "25CF" }, breakLine: true } },
    { text: "Beats, measures, time signatures", options: { bullet: { code: "25CF" }, breakLine: true } },
    { text: "Melody, harmony, the C major scale", options: { bullet: { code: "25CF" } } },
  ], {
    x: 0.7, y: 3.05, w: 6, h: 3,
    fontFace: FONT_BODY, fontSize: 16, color: COLOR.navy,
    paraSpaceAfter: 8, margin: 0,
  });

  // Right column — practice card (navy)
  const cardX = 7.3, cardY = 2.5, cardW = 5.4, cardH = 3.6;
  s.addShape(pres.shapes.RECTANGLE, {
    x: cardX, y: cardY, w: cardW, h: cardH,
    fill: { color: COLOR.navy }, line: { color: COLOR.navy },
  });

  s.addText("PRACTICE THIS WEEK", {
    x: cardX + 0.4, y: cardY + 0.35, w: 4.5, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true,
    color: COLOR.gold, charSpacing: 4, margin: 0,
  });

  const tasks = [
    "Recite A–G out loud, then backward.",
    "Tap a steady beat for one full minute.",
    "Sing the C major scale up and back down.",
  ];
  tasks.forEach((t, i) => {
    const y = cardY + 1.0 + i * 0.75;
    s.addShape(pres.shapes.OVAL, {
      x: cardX + 0.4, y, w: 0.55, h: 0.55,
      fill: { color: COLOR.coral }, line: { color: COLOR.coral },
    });
    s.addText(String(i + 1), {
      x: cardX + 0.4, y, w: 0.55, h: 0.55,
      fontFace: FONT_HEAD, fontSize: 14, bold: true,
      color: COLOR.cream, align: "center", valign: "middle", margin: 0,
    });
    s.addText(t, {
      x: cardX + 1.1, y, w: cardW - 1.4, h: 0.55,
      fontFace: FONT_BODY, fontSize: 14, color: COLOR.cream,
      valign: "middle", margin: 0,
    });
  });

  // Bottom "Next up" line
  s.addText([
    { text: "Next up — ", options: { color: COLOR.navy, bold: true } },
    { text: "sharps, flats & intervals.", options: { color: COLOR.coral, bold: true } },
  ], {
    x: 0.7, y: 6.4, w: 9, h: 0.5,
    fontFace: FONT_TITLE, fontSize: 20,
    valign: "middle", margin: 0,
  });

  s.addText("08 / 08 · WRAP-UP", {
    x: SLIDE_W - 3.7, y: 7.0, w: 3, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, color: COLOR.muted,
    charSpacing: 4, align: "right", margin: 0,
  });
}

// ---- Save ----
pres.writeFile({ fileName: "Music_Theory.pptx" })
  .then((f) => console.log("Saved:", f))
  .catch((e) => console.error("Error:", e));
