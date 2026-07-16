// paragliding.js — Recreates paragliding.pptx with pptxgenjs
// Run: node paragliding.js
const pptxgen = require("pptxgenjs");
const path = require("path");

const IMG_DIR = __dirname; // images alongside this script

// Color palette extracted from original
const CREAM = "F4EFE6";
const NAVY = "0B1E2E";
const NAVY2 = "1A2E40";
const NAVY3 = "22333B";
const AMBER = "D97706";
const GOLD = "E9B949";
const SLATE_BLUE = "3D6B8A";
const LIGHT_CREAM = "EBE3D3";
const BLACK = "000000";

// Font stack
const SERIF = "Georgia";
const SANS = "Helvetica Neue";
const MONO = "Consolas";

// Slide dimensions (custom, matching original: 20" x 11.25")
const SW = 20;
const SH = 11.25;

const pres = new pptxgen();
pres.defineLayout({ name: "CUSTOM", width: SW, height: SH });
pres.layout = "CUSTOM";
pres.author = "Thermal & Co.";
pres.title = "Thermal & Co. — Prospectus";

// ============================================================
// SHARED HELPERS
// ============================================================

// Page chrome shared across interior slides (slides 2-7)
function addTopChrome(slide, chapterRight, darkMode = false) {
  const c = darkMode ? CREAM : NAVY;
  slide.addText("THERMAL & CO.", {
    x: 0.7, y: 0.4, w: 6, h: 0.5,
    fontSize: 14, fontFace: SANS, color: c, charSpacing: 8,
    bold: false, margin: 0,
  });
  if (chapterRight) {
    slide.addText(chapterRight, {
      x: SW - 8.7, y: 0.4, w: 8, h: 0.5,
      fontSize: 14, fontFace: SANS, color: c, charSpacing: 8,
      align: "right", margin: 0,
    });
  }
}

function addBottomChrome(slide, chapterLeft, pageStr, darkMode = false) {
  const c = darkMode ? CREAM : NAVY;
  slide.addText(chapterLeft, {
    x: 0.7, y: SH - 0.7, w: 6, h: 0.4,
    fontSize: 13, fontFace: SANS, color: c, charSpacing: 8,
    margin: 0,
  });
  slide.addText(pageStr, {
    x: SW - 8.7, y: SH - 0.7, w: 8, h: 0.4,
    fontSize: 13, fontFace: SANS, color: c, charSpacing: 8,
    align: "right", margin: 0,
  });
}

// Section label (roman numeral + dot + name) in amber/gold
function addSectionLabel(slide, x, y, w, text, color = AMBER) {
  slide.addText(text, {
    x, y, w, h: 0.5,
    fontSize: 14, fontFace: SANS, color, charSpacing: 8,
    bold: false, margin: 0,
  });
}

// Large serif title with italic accent word support
// parts: array of { text, italic?: bool, color? }
function addSerifTitle(slide, x, y, w, h, parts, sizePt = 64, defaultColor = NAVY) {
  const runs = parts.map((p, i) => ({
    text: p.text,
    options: {
      italic: !!p.italic,
      color: p.color || defaultColor,
      fontSize: sizePt,
      fontFace: SERIF,
      breakLine: !!p.breakLine,
    },
  }));
  slide.addText(runs, {
    x, y, w, h,
    fontFace: SERIF, fontSize: sizePt, color: defaultColor,
    valign: "top", margin: 0, paraSpaceAfter: 0,
  });
}

// ============================================================
// SLIDE 1 — Title: "Above Interlaken."
// ============================================================
{
  const s = pres.addSlide();
  s.background = { path: path.join(IMG_DIR, "image-1-1.jpeg") };

  // Small circle corner markers
  const ring = () => ({ type: "outer", color: BLACK, blur: 0, offset: 0, angle: 0, opacity: 0 });
  s.addShape(pres.shapes.OVAL, { x: 0.45, y: 0.45, w: 0.22, h: 0.22, fill: { type: "none" }, line: { color: CREAM, width: 1 } });
  s.addShape(pres.shapes.OVAL, { x: SW - 0.67, y: 0.45, w: 0.22, h: 0.22, fill: { type: "none" }, line: { color: CREAM, width: 1 } });
  s.addShape(pres.shapes.OVAL, { x: 0.45, y: SH - 0.67, w: 0.22, h: 0.22, fill: { type: "none" }, line: { color: CREAM, width: 1 } });
  s.addShape(pres.shapes.OVAL, { x: SW - 0.67, y: SH - 0.67, w: 0.22, h: 0.22, fill: { type: "none" }, line: { color: CREAM, width: 1 } });

  // Top header row
  s.addText("Thermal & Co.", {
    x: 1.3, y: 0.55, w: 6, h: 0.5,
    fontSize: 20, fontFace: SERIF, color: CREAM, italic: false, margin: 0,
  });
  s.addText([
    { text: "46.6863°N", options: { charSpacing: 8 } },
    { text: "    ", options: {} },
    { text: "7.8632°E", options: { charSpacing: 8 } },
    { text: "    ", options: {} },
    { text: "INTERLAKEN, CH", options: { charSpacing: 8 } },
  ], {
    x: SW - 10, y: 0.6, w: 8.3, h: 0.4,
    fontSize: 12, fontFace: SANS, color: CREAM, align: "right", margin: 0,
  });

  // Horizon/altitude row marker (thin line across)
  s.addShape(pres.shapes.LINE, {
    x: 1.3, y: 3.7, w: SW - 2.6, h: 0,
    line: { color: CREAM, width: 0.5, transparency: 60 },
  });
  s.addText("HORIZON", {
    x: 1.3, y: 3.35, w: 2, h: 0.3,
    fontSize: 10, fontFace: SANS, color: CREAM, charSpacing: 6, margin: 0, transparency: 20,
  });
  s.addText("2,358 M", {
    x: 6.8, y: 3.35, w: 2, h: 0.3,
    fontSize: 10, fontFace: SANS, color: CREAM, charSpacing: 6, margin: 0, align: "center", transparency: 20,
  });
  s.addText("1,950 M", {
    x: 11.3, y: 3.35, w: 2, h: 0.3,
    fontSize: 10, fontFace: SANS, color: CREAM, charSpacing: 6, margin: 0, align: "center", transparency: 20,
  });
  s.addText("GROUND", {
    x: SW - 4.0, y: 3.35, w: 2, h: 0.3,
    fontSize: 10, fontFace: SANS, color: CREAM, charSpacing: 6, margin: 0, align: "right", transparency: 20,
  });

  // School tagline
  s.addText("A PARAGLIDING SCHOOL · EST. 2026", {
    x: 1.3, y: 4.1, w: 8, h: 0.4,
    fontSize: 13, fontFace: SANS, color: AMBER, charSpacing: 10, margin: 0,
  });

  // Hero title: "Above Interlaken."
  s.addText([
    { text: "Above", options: { color: CREAM, fontFace: SERIF, fontSize: 160, breakLine: true } },
    { text: "Interlaken.", options: { color: GOLD, italic: true, fontFace: SERIF, fontSize: 160 } },
  ], {
    x: 1.3, y: 5.0, w: 13, h: 4.8,
    fontFace: SERIF, valign: "top", margin: 0, paraSpaceAfter: 0,
  });

  // Chapter label
  s.addText("CHAPTER 00 — PROSPECTUS", {
    x: SW - 6.7, y: 7.4, w: 6, h: 0.4,
    fontSize: 13, fontFace: SANS, color: AMBER, charSpacing: 10, margin: 0,
  });
  // Body blurb right
  s.addText(
    "Learn to fly from one of the most storied launches in the Alps — with an instructor who has spent fifteen years reading its sky.",
    {
      x: SW - 6.7, y: 7.8, w: 6, h: 1.4,
      fontSize: 16, fontFace: SANS, color: CREAM, margin: 0,
      lineSpacingMultiple: 1.35,
    }
  );

  // Small "T" serif mark bottom-left
  s.addText("T", {
    x: 1.2, y: SH - 0.95, w: 0.5, h: 0.5,
    fontSize: 18, fontFace: SERIF, italic: true, color: CREAM, margin: 0,
  });

  // Bottom row
  s.addText("VOL. 01 / SEASON 2026", {
    x: 1.8, y: SH - 0.85, w: 6, h: 0.4,
    fontSize: 13, fontFace: SANS, color: CREAM, charSpacing: 8, margin: 0,
  });
  s.addText("PROSPECTUS №01 · ISSUED MMXXVI", {
    x: (SW - 8) / 2, y: SH - 0.85, w: 8, h: 0.4,
    fontSize: 13, fontFace: SANS, color: CREAM, charSpacing: 8, align: "center", margin: 0,
  });
  s.addText("PRINTED ON WIND & PAPER", {
    x: SW - 7.3, y: SH - 0.85, w: 6, h: 0.4,
    fontSize: 13, fontFace: SANS, color: CREAM, charSpacing: 8, align: "right", margin: 0,
  });
}

// ============================================================
// SLIDE 2 — "Learning to fly, on foot."
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  addTopChrome(s, null, false);

  // Large right image (coastal paraglider) — half-bleed
  s.addImage({
    path: path.join(IMG_DIR, "image-2-1.jpeg"),
    x: SW / 2, y: 0, w: SW / 2, h: SH,
    sizing: { type: "cover", w: SW / 2, h: SH },
  });

  // Section label
  addSectionLabel(s, 0.7, 1.5, 5, "I  ·  THE INVITATION", AMBER);

  // Big serif title
  s.addText([
    { text: "Learning to", options: { color: NAVY, fontFace: SERIF, fontSize: 76, breakLine: true } },
    { text: "fly, on ", options: { color: NAVY, fontFace: SERIF, fontSize: 76 } },
    { text: "foot.", options: { italic: true, color: AMBER, fontFace: SERIF, fontSize: 76 } },
  ], {
    x: 0.7, y: 2.1, w: 9.3, h: 2.8,
    fontFace: SERIF, valign: "top", margin: 0, paraSpaceAfter: 0,
  });

  // Dropcap "A" in serif (moved lower to clear the 2-line title)
  s.addText("A", {
    x: 0.7, y: 5.4, w: 0.9, h: 1.3,
    fontSize: 72, fontFace: SERIF, color: AMBER, italic: false, margin: 0,
  });
  // Body text wrapping around dropcap
  s.addText(
    "paraglider is the smallest aircraft in the world — a wing you can roll into a backpack and launch with a few running steps. No engine. No runway. Just air, weather, and attention.",
    {
      x: 1.65, y: 5.45, w: 7.3, h: 1.5,
      fontSize: 16, fontFace: SANS, color: NAVY, margin: 0,
      lineSpacingMultiple: 1.4,
    }
  );
  s.addText(
    "Our school is built around one idea: flying well is a skill anyone curious and patient can learn.",
    {
      x: 0.7, y: 7.1, w: 8.3, h: 1.1,
      fontSize: 16, fontFace: SANS, color: NAVY, margin: 0,
      lineSpacingMultiple: 1.4,
    }
  );

  // Divider above stats
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 8.6, w: 8.6, h: 0,
    line: { color: NAVY, width: 0.5, transparency: 60 },
  });

  // Four stat columns
  const stats = [
    { label: "WING AREA", num: "14–28", unit: "m²" },
    { label: "PACK WEIGHT", num: "10–18", unit: "kg" },
    { label: "LAUNCH", num: "Foot", unit: "" },
    { label: "ENGINE", num: "None", unit: "" },
  ];
  stats.forEach((st, i) => {
    const x = 0.7 + i * 2.2;
    s.addText(st.label, {
      x, y: 8.8, w: 2.1, h: 0.3,
      fontSize: 11, fontFace: SANS, color: NAVY, charSpacing: 0, margin: 0, transparency: 30,
    });
    s.addText(
      [
        { text: st.num, options: { color: NAVY, fontFace: SERIF, fontSize: 30 } },
        ...(st.unit ? [{ text: " " + st.unit, options: { color: AMBER, italic: true, fontFace: SERIF, fontSize: 24 } }] : []),
      ],
      {
        x, y: 9.15, w: 2.1, h: 0.7,
        fontFace: SERIF, margin: 0, valign: "top",
      }
    );
  });

  // Image overlay labels (top-right of image)
  s.addText([
    { text: "●  ", options: { color: GOLD } },
    { text: "CANOPY · 26 M²", options: { color: CREAM, charSpacing: 6 } },
  ], {
    x: SW / 2 + 0.6, y: 2.2, w: 4, h: 0.4,
    fontSize: 11, fontFace: SANS, margin: 0,
  });
  s.addText("ASPECT RATIO 5.6", {
    x: SW / 2 + 0.6, y: 2.6, w: 4, h: 0.3,
    fontSize: 10, fontFace: SANS, color: CREAM, charSpacing: 6, margin: 0, transparency: 20,
  });

  s.addText([
    { text: "HARNESS · EN 1651", options: { color: CREAM, charSpacing: 6 } },
    { text: "  ●", options: { color: GOLD } },
  ], {
    x: SW - 5.3, y: 4.3, w: 4.6, h: 0.4,
    fontSize: 11, fontFace: SANS, align: "right", margin: 0,
  });
  s.addText("RESERVE PACKED 06 / 26", {
    x: SW - 5.3, y: 4.7, w: 4.6, h: 0.3,
    fontSize: 10, fontFace: SANS, color: CREAM, charSpacing: 6, align: "right", margin: 0, transparency: 20,
  });

  // Bottom-left label on image
  s.addText("PLATE I · IN FLIGHT", {
    x: SW / 2 + 0.6, y: SH - 1.1, w: 5, h: 0.3,
    fontSize: 11, fontFace: SANS, color: CREAM, charSpacing: 6, margin: 0,
  });
  s.addText("— 35mm", {
    x: SW - 3.3, y: SH - 1.1, w: 2.5, h: 0.3,
    fontSize: 13, fontFace: SERIF, italic: true, color: CREAM, align: "right", margin: 0,
  });

  addBottomChrome(s, "CHAPTER I", "THERMAL & CO. · 02 / 08", false);
}

// ============================================================
// SLIDE 3 — "Fifteen years. Thousands flown." (dark)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  addTopChrome(s, "CHAPTER II · ABOUT THE INSTRUCTOR", true);

  // Section label
  addSectionLabel(s, 0.7, 1.5, 6, "II  ·  THE INSTRUCTOR", GOLD);

  // Big serif title
  s.addText([
    { text: "Fifteen years.", options: { color: CREAM, fontFace: SERIF, fontSize: 96, breakLine: true } },
    { text: "Thousands", options: { italic: true, color: GOLD, fontFace: SERIF, fontSize: 96, breakLine: true } },
    { text: "flown.", options: { italic: true, color: GOLD, fontFace: SERIF, fontSize: 96 } },
  ], {
    x: 0.7, y: 2.0, w: 10, h: 4.8,
    fontFace: SERIF, valign: "top", margin: 0, paraSpaceAfter: 0,
  });

  // Quote
  s.addText(
    "My job is to put enough structure around a student's first flights that joy has room to come through the door.",
    {
      x: 0.7, y: 7.3, w: 9, h: 1.0,
      fontSize: 18, fontFace: SERIF, italic: true, color: CREAM, margin: 0,
      lineSpacingMultiple: 1.4,
    }
  );
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 8.5, w: 0.4, h: 0,
    line: { color: CREAM, width: 0.5 },
  });
  s.addText("— MARCO KELLER, CHIEF INSTRUCTOR", {
    x: 1.2, y: 8.35, w: 9, h: 0.3,
    fontSize: 11, fontFace: SANS, color: CREAM, charSpacing: 1, margin: 0, transparency: 30,
  });

  // Three stat columns
  const stats3 = [
    { big: "15", label: "YEARS INSTRUCTING", note: "Since 2011, year-round in the Bernese Oberland." },
    { big: "4,000+", label: "STUDENTS TAUGHT", note: "From tandem discovery to full P2 certification." },
    { big: "0", label: "SERIOUS INCIDENTS", note: "Across the full history of the school." },
  ];
  stats3.forEach((st, i) => {
    const x = 0.7 + i * 3.3;
    s.addText(st.big, {
      x, y: 8.55, w: 3.2, h: 1.0,
      fontSize: 56, fontFace: SERIF, color: CREAM, margin: 0, valign: "top",
    });
    s.addText(st.label, {
      x, y: 9.65, w: 3.2, h: 0.3,
      fontSize: 10, fontFace: SANS, color: CREAM, charSpacing: 0, margin: 0, transparency: 30,
    });
    s.addText(st.note, {
      x, y: 9.95, w: 3.2, h: 0.5,
      fontSize: 10, fontFace: SANS, color: CREAM, margin: 0, transparency: 40,
      lineSpacingMultiple: 1.3,
    });
  });

  // RIGHT SIDE — Flight Log card
  const boxX = 11.0, boxY = 1.5, boxW = 8.3, boxH = 7.2;
  s.addShape(pres.shapes.RECTANGLE, {
    x: boxX, y: boxY, w: boxW, h: boxH,
    fill: { color: NAVY2 }, line: { color: CREAM, width: 0.5, transparency: 60 },
  });
  // Header
  s.addText("FLIGHT LOG · ABRIDGED", {
    x: boxX + 0.4, y: boxY + 0.3, w: 4, h: 0.4,
    fontSize: 12, fontFace: SANS, color: CREAM, charSpacing: 6, margin: 0,
  });
  s.addText("— selected", {
    x: boxX + boxW - 2.4, y: boxY + 0.3, w: 2, h: 0.4,
    fontSize: 13, fontFace: SERIF, italic: true, color: GOLD, align: "right", margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: boxX + 0.4, y: boxY + 0.85, w: boxW - 0.8, h: 0,
    line: { color: CREAM, width: 0.5, transparency: 70 },
  });

  // Log rows
  const rows = [
    ["2011", "First licence", "Grindelwald", "— P2"],
    ["2013", "Tandem rating", "Beatenberg", "T"],
    ["2016", "School founded", "Interlaken", "§"],
    ["2019", "X-Alps support", "Salzburg → Monaco", "XA"],
    ["2022", "APPI Master", "France · FR", "M"],
    ["2024", "4,000th student", "Niederhorn", "★"],
    ["2026", "Season 16 opens", "Interlaken", "→"],
  ];
  const rowStart = boxY + 1.1;
  const rowH = 0.82;
  rows.forEach((r, i) => {
    const y = rowStart + i * rowH;
    const isLast = i === rows.length - 1;
    const color = isLast ? GOLD : CREAM;
    const italic = isLast;
    s.addText(r[0], {
      x: boxX + 0.4, y: y + 0.18, w: 1.1, h: 0.4,
      fontSize: 12, fontFace: SANS, color: GOLD, charSpacing: 4, margin: 0,
    });
    s.addText(r[1], {
      x: boxX + 1.8, y: y + 0.12, w: 2.8, h: 0.5,
      fontSize: 19, fontFace: SERIF, italic: true, color, margin: 0,
    });
    s.addText(r[2], {
      x: boxX + 4.7, y: y + 0.18, w: 2.3, h: 0.4,
      fontSize: 12, fontFace: SANS, color: CREAM, margin: 0, transparency: 30,
    });
    s.addText(r[3], {
      x: boxX + boxW - 1.3, y: y + 0.18, w: 0.9, h: 0.4,
      fontSize: 12, fontFace: SANS, color: CREAM, align: "right", margin: 0, transparency: 40,
    });
    if (i < rows.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: boxX + 0.4, y: y + rowH, w: boxW - 0.8, h: 0,
        line: { color: CREAM, width: 0.3, transparency: 85 },
      });
    }
  });

  // Circular "SINCE 2011" stamp bottom-right
  s.addShape(pres.shapes.OVAL, {
    x: SW - 2.2, y: SH - 2.2, w: 1.5, h: 1.5,
    fill: { type: "none" }, line: { color: GOLD, width: 1 },
  });
  s.addText("SINCE", {
    x: SW - 2.2, y: SH - 1.9, w: 1.5, h: 0.3,
    fontSize: 9, fontFace: SANS, color: GOLD, align: "center", charSpacing: 6, margin: 0,
  });
  s.addText("2011", {
    x: SW - 2.2, y: SH - 1.6, w: 1.5, h: 0.6,
    fontSize: 24, fontFace: SERIF, color: GOLD, align: "center", margin: 0,
  });
  s.addText("CERTIFIED", {
    x: SW - 2.2, y: SH - 1.0, w: 1.5, h: 0.3,
    fontSize: 8, fontFace: SANS, color: GOLD, align: "center", charSpacing: 4, margin: 0,
  });

  addBottomChrome(s, "CHAPTER II", "THERMAL & CO. · 03 / 08", true);
}

// ============================================================
// SLIDE 4 — "Four beats. One clean arc." (method)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  addTopChrome(s, "CHAPTER III · THE METHOD", false);

  addSectionLabel(s, 0.7, 1.5, 6, "III  ·  THE METHOD", AMBER);

  // Title
  s.addText([
    { text: "Four beats.", options: { color: NAVY, fontFace: SERIF, fontSize: 88, breakLine: true } },
    { text: "One ", options: { color: NAVY, fontFace: SERIF, fontSize: 88 } },
    { text: "clean", options: { italic: true, color: AMBER, fontFace: SERIF, fontSize: 88 } },
    { text: " arc.", options: { color: NAVY, fontFace: SERIF, fontSize: 88 } },
  ], {
    x: 0.7, y: 2.1, w: 12, h: 2.6,
    fontFace: SERIF, valign: "top", margin: 0, paraSpaceAfter: 0,
  });

  // Right-side paragraph
  s.addText(
    "A structured progression, refined across 4,000 students. Each stage has clear criteria — you always know what you're working on, and why.",
    {
      x: SW - 6.5, y: 2.3, w: 5.8, h: 2.0,
      fontSize: 15, fontFace: SANS, color: NAVY, align: "right", margin: 0,
      lineSpacingMultiple: 1.4,
    }
  );

  // Dotted trajectory line across the 4 columns
  // From bottom-left of card 1 upward to top-right of card 4
  s.addShape(pres.shapes.LINE, {
    x: 1.5, y: 9.3, w: 16.8, h: -3.5,
    line: { color: GOLD, width: 1.5, dashType: "dash", transparency: 30 },
  });
  // End dot
  s.addShape(pres.shapes.OVAL, {
    x: 18.2, y: 5.7, w: 0.22, h: 0.22,
    fill: { color: GOLD }, line: { color: GOLD, width: 0 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 18.1, y: 5.6, w: 0.42, h: 0.42,
    fill: { type: "none" }, line: { color: GOLD, width: 1 },
  });

  // Four method cards
  const methods = [
    { num: "01", dur: "02 DAYS · GROUND",  title: "Ground", titleI: "handling.",
      desc: "Before you ever leave the ground, you'll spend hours on a gentle slope, learning to make the wing do exactly what you ask of it.",
      tag: "GRASS, WIND, REPETITION" },
    { num: "02", dur: "03 DAYS · HILL",    title: "First", titleI: "flights.",
      desc: "Low, short, supervised descents off a training hill. Radio in your ear, instructor at launch and landing. No surprises.",
      tag: "30–90 SECONDS ALOFT" },
    { num: "03", dur: "04 DAYS · ALTITUDE", title: "High", titleI: "altitude.",
      desc: "1,000 m+ descents above Interlaken. Turns, speed control, approach patterns. The moment it becomes flying.",
      tag: "NIEDERHORN → HÖHEMATTE" },
    { num: "04", dur: "03 DAYS · P2",       title: "Certification &", titleI: "beyond.",
      desc: "Theory, rescue drills, cross-country basics, and your P2 licence — the international standard for solo flight.",
      tag: "LICENCE IN HAND" },
  ];

  const colW = 4.5;
  const gap = 0.25;
  const startX = 0.7;
  methods.forEach((m, i) => {
    const x = startX + i * (colW + gap);
    // Big italic numeral
    s.addText(m.num, {
      x, y: 5.9, w: colW, h: 1.1,
      fontSize: 72, fontFace: SERIF, italic: true, color: AMBER, margin: 0, valign: "top",
    });
    // Duration label (wider to avoid clipping)
    s.addText(m.dur, {
      x, y: 7.15, w: colW - 0.1, h: 0.3,
      fontSize: 10, fontFace: SANS, color: NAVY, charSpacing: 0, margin: 0, transparency: 40,
    });
    // Title
    s.addText([
      { text: m.title + " ", options: { color: NAVY, fontFace: SERIF, fontSize: 32 } },
      { text: m.titleI, options: { italic: true, color: NAVY, fontFace: SERIF, fontSize: 32 } },
    ], {
      x, y: 7.5, w: colW - 0.1, h: 1.2,
      fontFace: SERIF, valign: "top", margin: 0,
    });
    // Description
    s.addText(m.desc, {
      x, y: 8.8, w: colW - 0.2, h: 1.4,
      fontSize: 12, fontFace: SANS, color: NAVY, margin: 0,
      lineSpacingMultiple: 1.4,
    });
    // Bottom tag (moved up to avoid footer overlap)
    s.addText(m.tag, {
      x, y: 10.15, w: colW, h: 0.3,
      fontSize: 10, fontFace: SANS, color: AMBER, charSpacing: 2, margin: 0,
    });
  });

  addBottomChrome(s, "CHAPTER III", "THERMAL & CO. · 04 / 08", false);
}

// ============================================================
// SLIDE 5 — "A theatre of mountains." (sunset background)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { path: path.join(IMG_DIR, "image-5-1.jpeg") };

  // Dark scrim on left half for text contrast
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: SW * 0.55, h: SH,
    fill: { color: NAVY, transparency: 55 }, line: { color: NAVY, width: 0 },
  });
  // Subtle scrim on bottom-right for launch labels
  s.addShape(pres.shapes.RECTANGLE, {
    x: SW - 7.6, y: 6.9, w: 7.6, h: 3.4,
    fill: { color: NAVY, transparency: 65 }, line: { color: NAVY, width: 0 },
  });

  // Section label
  addSectionLabel(s, 0.7, 1.5, 6, "IV  ·  THE THEATRE", GOLD);

  // Big serif title
  s.addText([
    { text: "A theatre of", options: { color: CREAM, fontFace: SERIF, fontSize: 112, breakLine: true } },
    { text: "mountains.", options: { italic: true, color: GOLD, fontFace: SERIF, fontSize: 112 } },
  ], {
    x: 0.7, y: 2.1, w: 12, h: 3.8,
    fontFace: SERIF, valign: "top", margin: 0, paraSpaceAfter: 0,
  });

  // Paragraph left
  s.addText(
    "Three launches, one valley, and a landing field you can walk to the hotel from. We work between 1,290 and 1,950 metres — the altitudes where the Oberland quiets down and begins to speak.",
    {
      x: 0.7, y: 5.9, w: 8.5, h: 1.5,
      fontSize: 15, fontFace: SANS, color: CREAM, margin: 0,
      lineSpacingMultiple: 1.4,
    }
  );

  // "ALTITUDE · M ASL" label
  s.addText("ALTITUDE · M ASL", {
    x: 0.7, y: 7.15, w: 4, h: 0.3,
    fontSize: 11, fontFace: SANS, color: CREAM, charSpacing: 4, margin: 0, transparency: 30,
  });

  // Altitude bars — bottom-left, 4 columns
  const alts = [
    { v: "1,680", label: "BEATENBERG", h: 2.1 },
    { v: "1,950", label: "NIEDERHORN", h: 2.4 },
    { v: "1,290", label: "AMISBÜHL",   h: 1.7 },
    { v: "570",   label: "HÖHEMATTE",  h: 0.9 },
  ];
  alts.forEach((a, i) => {
    const x = 0.7 + i * 1.85;
    const barBase = 10.0;
    // Thin vertical altitude bar
    s.addShape(pres.shapes.LINE, {
      x: x + 0.05, y: barBase, w: 0, h: -a.h,
      line: { color: CREAM, width: 0.5, transparency: 40 },
    });
    // Value italic
    s.addText(a.v, {
      x, y: barBase - a.h - 0.5, w: 1.7, h: 0.5,
      fontSize: 22, fontFace: SERIF, italic: true, color: GOLD, margin: 0,
    });
    // Label
    s.addText(a.label, {
      x, y: 10.05, w: 1.8, h: 0.3,
      fontSize: 9, fontFace: SANS, color: CREAM, charSpacing: 4, margin: 0,
    });
  });

  // Right-side launch list
  const launches = [
    { title: "LAUNCH · 01", name: "Beatenberg", meta: "1,680 m · Training hill" },
    { title: "LAUNCH · 02", name: "Niederhorn", meta: "1,950 m · High altitude" },
    { title: "LAUNCH · 03", name: "Amisbühl",   meta: "1,290 m · Thermals" },
    { title: "LANDING",     name: "Höhematte",  meta: "570 m · In-town field" },
  ];
  // Arrange in 2x2 grid, right side
  const gridX = SW - 7.5;
  const cellW = 3.5, cellH = 1.6;
  launches.forEach((l, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = gridX + col * cellW;
    const y = 7.3 + row * cellH;
    s.addText(l.title, {
      x, y, w: cellW, h: 0.3,
      fontSize: 11, fontFace: SANS, color: GOLD, charSpacing: 6, margin: 0,
    });
    s.addText(l.name, {
      x, y: y + 0.35, w: cellW, h: 0.7,
      fontSize: 32, fontFace: SERIF, color: CREAM, margin: 0,
    });
    s.addText(l.meta, {
      x, y: y + 1.05, w: cellW, h: 0.3,
      fontSize: 12, fontFace: SANS, color: CREAM, margin: 0, transparency: 30,
    });
  });

  // Little marker top-right with 2,358 M
  s.addText("2,358 M", {
    x: SW - 2.5, y: 4.5, w: 2, h: 0.4,
    fontSize: 12, fontFace: SANS, color: CREAM, charSpacing: 6, margin: 0, transparency: 30,
  });
  s.addShape(pres.shapes.OVAL, {
    x: SW - 2.5, y: 4.95, w: 0.15, h: 0.15,
    fill: { color: GOLD }, line: { color: GOLD, width: 0 },
  });

  addBottomChrome(s, "CHAPTER IV", "THERMAL & CO. · 05 / 08", true);
}

// ============================================================
// SLIDE 6 — "From first flight to P2." (pricing cards)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  addTopChrome(s, "CHAPTER V · COURSES & PRICING", false);

  addSectionLabel(s, 0.7, 1.05, 6, "V  ·  THE COURSES", AMBER);

  // Title
  s.addText([
    { text: "From first flight to ", options: { color: NAVY, fontFace: SERIF, fontSize: 72 } },
    { text: "P2.", options: { italic: true, color: AMBER, fontFace: SERIF, fontSize: 72 } },
  ], {
    x: 0.7, y: 1.4, w: 14, h: 1.4,
    fontFace: SERIF, valign: "top", margin: 0, paraSpaceAfter: 0,
  });

  // Right-side blurb
  s.addText(
    "Three honest ways in. Prices include equipment, licence fees, accident insurance, and the cable car to launch.",
    {
      x: SW - 5.7, y: 1.5, w: 5, h: 1.5,
      fontSize: 14, fontFace: SANS, color: NAVY, align: "right", margin: 0,
      lineSpacingMultiple: 1.4,
    }
  );

  // Three pricing cards
  const cards = [
    {
      num: "01", title: "Discovery", titleI: "tandem.", dark: true,
      desc: "A 20-minute flight with Marco on the wing — the cleanest way to find out whether the sky is for you.",
      feats: ["PRE-FLIGHT BRIEFING", "FULL KIT + HELMET", "PHOTOS OF YOUR FLIGHT"],
      price: "240", dur: "½ DAY", flagship: false,
      img: "image-6-1.png",
    },
    {
      num: "02", title: "P2 solo", titleI: "certificate.", dark: true,
      desc: "Twelve days, ground to licence — the complete progression thousands have taken to first solo flight.",
      feats: ["ALL 4 BEATS OF THE METHOD", "LICENCE + INSURANCE", "P2 LOGBOOK & KIT GUIDE"],
      price: "2,950", dur: "12 DAYS", flagship: true,
      img: "image-6-2.png",
    },
    {
      num: "03", title: "Thermal", titleI: "clinic.", dark: false,
      desc: "For licensed pilots. Three days of coaching on thermalling, cross-country lines, and decision-making.",
      feats: ["PRE-FLIGHT WEATHER READS", "RADIO-COACHED FLIGHTS", "VIDEO DEBRIEF EACH DAY"],
      price: "890", dur: "03 DAYS", flagship: false,
      img: "image-6-3.png",
    },
  ];

  const cardW = 5.9, cardH = 7.3;
  const cardStart = 0.7;
  const cardGap = 0.35;
  cards.forEach((c, i) => {
    const x = cardStart + i * (cardW + cardGap);
    const y = 3.2;

    // Card background — navy for dark, cream-accent for light
    if (c.dark) {
      s.addShape(pres.shapes.RECTANGLE, {
        x, y, w: cardW, h: cardH,
        fill: { color: NAVY }, line: { color: NAVY, width: 0 },
      });
    } else {
      // Light card with subtle gray
      s.addShape(pres.shapes.RECTANGLE, {
        x, y, w: cardW, h: cardH,
        fill: { color: LIGHT_CREAM }, line: { color: LIGHT_CREAM, width: 0 },
      });
    }

    // Card image (top, mini illustration, blue/navy band)
    const imgBg = c.dark ? NAVY : SLATE_BLUE;
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.3, y: y + 0.3, w: cardW - 0.6, h: 2.0,
      fill: { color: imgBg }, line: { color: imgBg, width: 0 },
    });
    // Try to add the actual mini-diagram image on top
    s.addImage({
      path: path.join(IMG_DIR, c.img),
      x: x + 0.3, y: y + 0.3, w: cardW - 0.6, h: 2.0,
      sizing: { type: "cover", w: cardW - 0.6, h: 2.0 },
    });

    const txtColor = c.dark ? CREAM : NAVY;
    const mutedColor = c.dark ? CREAM : NAVY;
    const mutedTrans = c.dark ? 30 : 50;

    // Flagship badge
    if (c.flagship) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: x + cardW - 1.5, y: y - 0.1, w: 1.4, h: 0.4,
        fill: { color: AMBER }, line: { color: AMBER, width: 0 },
      });
      s.addText("FLAGSHIP", {
        x: x + cardW - 1.5, y: y - 0.1, w: 1.4, h: 0.4,
        fontSize: 10, fontFace: SANS, color: CREAM, charSpacing: 6, align: "center", valign: "middle", margin: 0,
      });
    }

    // "OPTION · 0N"
    s.addText(`OPTION · ${c.num}`, {
      x: x + 0.3, y: y + 2.5, w: cardW - 0.6, h: 0.3,
      fontSize: 11, fontFace: SANS, color: AMBER, charSpacing: 6, margin: 0,
    });

    // Title
    s.addText([
      { text: c.title + " ", options: { color: txtColor, fontFace: SERIF, fontSize: 34 } },
      { text: c.titleI, options: { italic: true, color: txtColor, fontFace: SERIF, fontSize: 34 } },
    ], {
      x: x + 0.3, y: y + 2.85, w: cardW - 0.6, h: 1.0,
      fontFace: SERIF, valign: "top", margin: 0,
    });

    // Description
    s.addText(c.desc, {
      x: x + 0.3, y: y + 4.0, w: cardW - 0.6, h: 1.0,
      fontSize: 12, fontFace: SANS, color: txtColor, margin: 0,
      lineSpacingMultiple: 1.4, transparency: c.dark ? 10 : 0,
    });

    // Features list
    c.feats.forEach((f, j) => {
      s.addText(f, {
        x: x + 0.3, y: y + 5.0 + j * 0.3, w: cardW - 0.5, h: 0.3,
        fontSize: 10, fontFace: SANS, color: txtColor, charSpacing: 0, margin: 0, transparency: c.dark ? 20 : 30,
      });
    });

    // Divider before price
    s.addShape(pres.shapes.LINE, {
      x: x + 0.3, y: y + 6.25, w: cardW - 0.6, h: 0,
      line: { color: txtColor, width: 0.3, transparency: 70 },
    });

    // Price row
    s.addText([
      { text: "CHF ", options: { color: txtColor, fontFace: SANS, fontSize: 16 } },
      { text: c.price, options: { color: txtColor, fontFace: SERIF, fontSize: 38 } },
    ], {
      x: x + 0.3, y: y + 6.4, w: cardW - 2, h: 0.8,
      fontFace: SANS, valign: "middle", margin: 0,
    });
    s.addText(c.dur, {
      x: x + cardW - 1.8, y: y + 6.7, w: 1.5, h: 0.3,
      fontSize: 11, fontFace: SANS, italic: true, color: txtColor, align: "right", margin: 0, transparency: 20,
    });
  });

  addBottomChrome(s, "CHAPTER V", "THERMAL & CO. · 06 / 08", false);
}

// ============================================================
// SLIDE 7 — "Earned, not assumed." (safety, dark)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  addTopChrome(s, "CHAPTER VI · SAFETY & STANDARDS", true);

  addSectionLabel(s, 0.7, 1.5, 6, "VI  ·  THE STANDARD", GOLD);

  // Title
  s.addText([
    { text: "Earned, not", options: { color: CREAM, fontFace: SERIF, fontSize: 88, breakLine: true } },
    { text: "assumed.", options: { italic: true, color: GOLD, fontFace: SERIF, fontSize: 88 } },
  ], {
    x: 0.7, y: 2.1, w: 10, h: 2.6,
    fontFace: SERIF, valign: "top", margin: 0, paraSpaceAfter: 0,
  });

  // Intro paragraph
  s.addText(
    "Paragliding is only as safe as the culture around it. Ours is conservative by design — we fly fewer days, in cleaner air, with more eyes on every student.",
    {
      x: 0.7, y: 4.7, w: 8.5, h: 1.4,
      fontSize: 15, fontFace: SANS, color: CREAM, margin: 0,
      lineSpacingMultiple: 1.4,
    }
  );

  // Divider
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 6.3, w: 8.8, h: 0,
    line: { color: CREAM, width: 0.3, transparency: 70 },
  });

  // Three principles
  const principles = [
    { num: "i.", title: "Weather-", titleA: "first", titleB: " flying",
      body: "If conditions aren't right, we don't fly. Full stop — no exceptions for schedules or weekends. Go-days are earned by the sky, not by the calendar." },
    { num: "ii.", title: "One-to-", titleA: "four", titleB: " ratios",
      body: "A maximum of four students per instructor; radios at launch and landing, always. Every student flies within line-of-sight of an instructor." },
    { num: "iii.", title: "Current, ", titleA: "serviced", titleB: " equipment",
      body: "All wings under three years old; harnesses and reserves inspected annually by certified riggers. Your kit on day one is the same standard as Marco's." },
  ];
  const pYStart = 6.5;
  const pRowH = 1.35;
  principles.forEach((p, i) => {
    const y = pYStart + i * pRowH;
    s.addText(p.num, {
      x: 0.7, y, w: 0.9, h: 0.6,
      fontSize: 26, fontFace: SERIF, italic: true, color: GOLD, margin: 0,
    });
    // Title
    s.addText([
      { text: p.title, options: { color: CREAM, fontFace: SERIF, fontSize: 24 } },
      { text: p.titleA, options: { italic: true, color: GOLD, fontFace: SERIF, fontSize: 24 } },
      { text: p.titleB, options: { color: CREAM, fontFace: SERIF, fontSize: 24 } },
    ], {
      x: 1.7, y, w: 7.8, h: 0.5,
      fontFace: SERIF, valign: "top", margin: 0,
    });
    // Body
    s.addText(p.body, {
      x: 1.7, y: y + 0.55, w: 7.7, h: 0.7,
      fontSize: 12, fontFace: SANS, color: CREAM, margin: 0, transparency: 20,
      lineSpacingMultiple: 1.4,
    });
    // Divider below
    if (i < principles.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: 0.7, y: y + pRowH - 0.05, w: 8.8, h: 0,
        line: { color: CREAM, width: 0.3, transparency: 80 },
      });
    }
  });

  // RIGHT: Spec plate card with wing diagram
  const boxX = 11.0, boxY = 1.5, boxW = 8.3, boxH = 7.7;
  s.addShape(pres.shapes.RECTANGLE, {
    x: boxX, y: boxY, w: boxW, h: boxH,
    fill: { color: NAVY2 }, line: { color: CREAM, width: 0.5, transparency: 60 },
  });
  s.addText("SPEC PLATE · EN-B TRAINING WING", {
    x: boxX + 0.4, y: boxY + 0.3, w: 6, h: 0.4,
    fontSize: 12, fontFace: SANS, color: CREAM, charSpacing: 6, margin: 0,
  });
  s.addText("— annotated", {
    x: boxX + boxW - 2.4, y: boxY + 0.3, w: 2, h: 0.4,
    fontSize: 13, fontFace: SERIF, italic: true, color: GOLD, align: "right", margin: 0,
  });

  // Canopy diagram image
  s.addImage({
    path: path.join(IMG_DIR, "image-7-1.png"),
    x: boxX + 0.6, y: boxY + 0.9, w: boxW - 1.2, h: 5.2,
    sizing: { type: "contain", w: boxW - 1.2, h: 5.2 },
  });

  // Four certification chips at bottom of card
  const chips = [
    ["SHV / FSVL", "✓"],
    ["APPI MASTER", "✓"],
    ["FIRST AID · WFR", "✓"],
    ["FULLY INSURED", "✓"],
  ];
  const chipW = (boxW - 0.8 - 0.15) / 2;
  const chipH = 0.55;
  chips.forEach((ch, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx = boxX + 0.4 + col * (chipW + 0.15);
    const cy = boxY + boxH - 1.35 + row * (chipH + 0.15);
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: chipW, h: chipH,
      fill: { type: "none" }, line: { color: CREAM, width: 0.5, transparency: 50 },
    });
    s.addText(ch[0], {
      x: cx + 0.2, y: cy, w: chipW - 0.6, h: chipH,
      fontSize: 11, fontFace: SANS, color: CREAM, charSpacing: 6, valign: "middle", margin: 0,
    });
    s.addText(ch[1], {
      x: cx + chipW - 0.5, y: cy, w: 0.3, h: chipH,
      fontSize: 12, fontFace: SANS, color: GOLD, valign: "middle", align: "right", margin: 0,
    });
  });

  addBottomChrome(s, "CHAPTER VI", "THERMAL & CO. · 07 / 08", true);
}

// ============================================================
// SLIDE 8 — "Your first flight is a phone call away." (closer)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { path: path.join(IMG_DIR, "image-8-1.jpeg") };

  // Corner markers
  s.addShape(pres.shapes.OVAL, { x: 0.45, y: 0.45, w: 0.22, h: 0.22, fill: { type: "none" }, line: { color: CREAM, width: 1 } });
  s.addShape(pres.shapes.OVAL, { x: SW - 0.67, y: 0.45, w: 0.22, h: 0.22, fill: { type: "none" }, line: { color: CREAM, width: 1 } });

  // Section label (explicit so we can boost contrast against bright sunset)
  s.addText("VII  ·  BEGIN", {
    x: 1.3, y: 1.5, w: 6, h: 0.5,
    fontSize: 15, fontFace: SANS, color: GOLD, charSpacing: 8, bold: true, margin: 0,
  });

  // Huge serif title
  s.addText([
    { text: "Your first flight is a", options: { color: CREAM, fontFace: SERIF, fontSize: 108, breakLine: true } },
    { text: "phone call away.", options: { italic: true, color: GOLD, fontFace: SERIF, fontSize: 108 } },
  ], {
    x: 1.3, y: 2.4, w: SW - 2.6, h: 4.6,
    fontFace: SERIF, valign: "top", margin: 0, paraSpaceAfter: 0,
  });

  // Four contact blocks at bottom
  const contacts = [
    { label: "BOOK",   value: "fly.thermalandco",         italic: false, size: 22 },
    { label: "CALL",   value: "+41 33 828 11 40",         italic: false, size: 22 },
    { label: "VISIT",  value: "Höheweg 37, 3800\nInterlaken", italic: false, size: 20 },
    { label: "SEASON", value: "April — October 2026",     italic: true,  size: 22 },
  ];
  const contW = 4.3;
  const contX = 1.3;
  contacts.forEach((c, i) => {
    const x = contX + i * (contW + 0.2);
    s.addText(c.label, {
      x, y: 8.6, w: contW, h: 0.3,
      fontSize: 11, fontFace: SANS, color: GOLD, charSpacing: 6, margin: 0,
    });
    s.addText(c.value, {
      x, y: 8.95, w: contW, h: 1.2,
      fontSize: c.size, fontFace: SERIF, italic: c.italic, color: CREAM, margin: 0,
      lineSpacingMultiple: 1.2,
    });
  });

  // Bottom line: — FIN   Thermal & Co.    MMXXVI
  s.addShape(pres.shapes.LINE, {
    x: 1.3, y: SH - 0.9, w: 0.4, h: 0,
    line: { color: CREAM, width: 0.5 },
  });
  s.addText("FIN", {
    x: 1.8, y: SH - 1.05, w: 1.2, h: 0.35,
    fontSize: 11, fontFace: SANS, color: CREAM, charSpacing: 8, margin: 0,
  });
  s.addText("Thermal & Co.", {
    x: (SW - 4) / 2, y: SH - 1.1, w: 4, h: 0.4,
    fontSize: 18, fontFace: SERIF, italic: true, color: CREAM, align: "center", margin: 0,
  });
  s.addText("MMXXVI", {
    x: SW - 3.3, y: SH - 1.0, w: 2, h: 0.3,
    fontSize: 11, fontFace: SANS, color: CREAM, charSpacing: 8, align: "right", margin: 0,
  });
}

// ============================================================
// WRITE FILE
// ============================================================
pres.writeFile({ fileName: "paragliding_replica.pptx" })
  .then(f => console.log("Wrote:", f))
  .catch(e => { console.error(e); process.exit(1); });
